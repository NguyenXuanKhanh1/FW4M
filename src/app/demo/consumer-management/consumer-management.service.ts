import { Injectable, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { ConsumerResponse, ConsumerRequest, ConsumerViewModel } from "../common/consumer.model";
import { SystemConstant } from "../common/system-constant";
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

import { IgxExcelExporterService } from 'igniteui-angular';


const CSV_TYPE = 'text/csv;charset=utf-8';
const CSV_EXTENSION = '.csv';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENTION = '.xlsx';

@Injectable({
  providedIn: "root"
})

export class ConsumerManagementService {
  constructor(private http: HttpClient, 
    private _system: SystemConstant) { }
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
      element.tags = element.tags? element.tags.toString():null;
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
      element.tags = element.tags? element.tags.toString():null;
      data.push(element);
    }
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    
  
    var range = XLSX.utils.decode_range(worksheet['!ref']);
    let R = range.s.r
    // for(var R = range.s.r; R <= range.e.r; ++R) {
    for(var C = range.s.c; C <= range.e.c; ++C) {
       var cell_address = {c:C, r:R};
       const headerCell = worksheet[XLSX.utils.encode_cell(cell_address)];
       headerCell.s =  "FFFFAA00" ;
    }
    console.log(worksheet);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet },     SheetNames: ['data'] };
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
    const wb: XLSX.WorkBook = { Sheets: { 'data': ws }, SheetNames: ['data'] };     
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    this.saveExcelFile(excelBuffer, fileName);
  } 

  private saveExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
    FileSaver.saveAs(data, fileName + EXCEL_EXTENTION);
  }

}