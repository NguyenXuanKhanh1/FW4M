import { Injectable, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { SystemConstant } from "../common/system-constant";
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { MockService } from 'ngx-fw4c';
import { ConsumerRequest, ConsumerSearchRequest, ConsumerSearchResponse } from './consumer.model';
import { ConsumerResponse } from '../common/consumer.model';

const CSV_TYPE = 'text/csv;charset=utf-8';
const CSV_EXTENSION = '.csv';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENTION = '.xlsx';

@Injectable({
  providedIn: "root"
})

export class ConsumerManagementService extends MockService {
  protected api: string = 'http://192.168.35.108:8001/consumers';

  constructor(
    private http: HttpClient,
    private _system: SystemConstant) {
    super();
  }

  public search(request: ConsumerSearchRequest): Observable<ConsumerSearchResponse> {
    return this.http.get<any>(`${this.api}`, { params: request as any }).pipe(map(s => new ConsumerSearchResponse({ items: s.data })));
  }

  public createConsumer(body: any): Observable<any> {
    return this.http.post(this._system.apiURL + this._system.consumers, body, this._system.header);
  }

  public updateConsumer(id: string, body: any) {    
    return this.http.put(this._system.apiURL + this._system.consumers + '/' + id, body, this._system.header);
  }

  public readConsumer(): Observable<ConsumerResponse> {
    return this.http.get(this._system.apiURL + this._system.consumers).pipe(
      map((res: any) => {
        for (let i = 0; i < res.data.length; i++) {
          res.data[i].created_at_2 = res.data[i].created_at * 1000;
        }
        var response = {
          status: true,
          totalRecords: res.data.length,
          items: res.data,
        };
        return response;
      })
    )
  }

  public deleteConsumer(id: string) {
    return this.http.delete(
      this._system.apiURL + this._system.consumers + "/" + id
    );
  }

  public exportToCSV(data: any[], excelFileName: string): void {
    if (!data || !data.length) {
      return;
    }
    const separator = ',';
    const keys = Object.keys(data[0]);
    console.log('keys: ', keys);
    const excel =
      keys.join(separator) +
      '\n' +
      data.map(row => {
        return keys.map(k => {
          let cell = row[k] === null || row[k] === undefined ? '' : row[k];
          cell = cell instanceof Date
            ? cell.toLocaleString()
            : cell.toString().replace(/"/g, '""');
          if (cell.search(/("|,|\n)/g) >= 0) {
            cell = `"${cell}"`;
          }
          return cell;
        }).join(separator);
      }).join('\n');
    const blob = new Blob([excel], { type: CSV_TYPE });
    FileSaver.saveAs(blob, excelFileName + '_export_' + new Date().getTime() + CSV_EXTENSION);
  }

  public exportToExcel(jsonData: any[], fileName: string): void {
    var data = [];
    for (let index = 0; index < jsonData.length; index++) {
      const element = jsonData[index];
      element.tags = element.tags ? element.tags.toString() : null;
      data.push(element);
    }
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    console.log('ws: ', ws)
    const wb: XLSX.WorkBook = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    this.saveExcelFile(excelBuffer, fileName);
  }

  public exportToExcelWithHeader(jsonData: any[], fileName: string): void {
    var data = [];
    for (let index = 0; index < jsonData.length; index++) {
      const element = jsonData[index];
      element.tags = element.tags ? element.tags.toString() : null;
      data.push(element);
    }
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    var range = XLSX.utils.decode_range(worksheet['!ref']);
    let R = range.s.r
    // for(var R = range.s.r; R <= range.e.r; ++R) {
    for (var C = range.s.c; C <= range.e.c; ++C) {
      var cell_address = { c: C, r: R };
      const headerCell = worksheet[XLSX.utils.encode_cell(cell_address)];
      headerCell.s = { rgb: "#FFFFFF" };
    }
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveExcelFile(excelBuffer, 'test');
  }

  public downloadTemplate(fileName: string): void {
    var data = [
      {
        custom_id: '',
        id: '',
        username: '',
        tags: '',
        created_at: ''
      }
    ];
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    var range = XLSX.utils.decode_range(ws['!ref']);
    let R = range.s.r
    // for(var R = range.s.r; R <= range.e.r; ++R) {
    for (var C = range.s.c; C <= range.e.c; ++C) {
      var cell_address = { c: C, r: R };
      const headerCell = ws[XLSX.utils.encode_cell(cell_address)];
      headerCell.s = { font: { color: { rgb: "FFFFAA00" } } };
      console.log(headerCell);
    }
    const wb: XLSX.WorkBook = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    this.saveExcelFile(excelBuffer, fileName);
  }

  private saveExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, fileName + EXCEL_EXTENTION);
  }

  public exportToPdf(data: any[], fileName: string) {
    var dd = {
      content: [
        { text: 'Consumers', style: 'header' },
        {
          table: {
            headerRows: 1,
            body: [
              [{ text: 'custom_id', style: 'tableHeader', color: 'white', bold: true },
              { text: 'id', style: 'tableHeader', color: 'white', bold: true },
              { text: 'tags', style: 'tableHeader', color: 'white', bold: true },
              { text: 'username', style: 'tableHeader', color: 'white', bold: true },
              { text: 'created', style: 'tableHeader', color: 'white', bold: true }]
            ]
          },
          layout: {
            fillColor: function (rowIndex, node, columnIndex) {
              return (rowIndex % 2 === 0 && rowIndex != 0) ? '#FFFFFF' : (rowIndex === 0) ? '#5D9AD2' : '#DAECF9';
            }
          }
        }
      ]
    }
    for (let index = 0; index < data.length; index++) {
      dd.content[1].table.body.push([data[index].custom_id, data[index].id, data[index].tags, data[index].username, data[index].created_at])
    }
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    pdfMake.createPdf(dd).download(fileName);
  }
}