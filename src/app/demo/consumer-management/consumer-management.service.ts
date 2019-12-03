import { Injectable, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { MockService } from 'ngx-fw4c';
import { ConsumerRequest, ConsumerSearchRequest, ConsumerSearchResponse, ConsumerDeleteRequest, ConsumerDeleteResponse } from './consumer.model';
import { ConsumerResponse } from './consumer.model';

const CSV_TYPE = 'text/csv;charset=utf-8';
const CSV_EXTENSION = '.csv';
const header = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: "root"
})

export class ConsumerManagementService extends MockService {
  protected api: string = 'http://192.168.35.108:8001/consumers';

  constructor(
    private http: HttpClient) {
    super();
  }

  public search(request: ConsumerSearchRequest): Observable<ConsumerSearchResponse> {
    return this.http.get<any>(`${this.api}`, { params: request as any }).pipe(map(s => 
      {
        for (let i = 0; i < s.data.length; i++) {
          s.data[i].createdAtText = s.data[i].created_at * 1000;
        }
        var response = {
          status: true,
          totalRecords: s.data.length,
          items: s.data,
        };
        return response;
      }
    ));
  }

  public createConsumer(body: any, request: ConsumerRequest): Observable<ConsumerResponse> {
    return this.http.post<any>(`${this.api}`, body, header);
  }

  public updateConsumer(id: string, body: any, request: ConsumerRequest): Observable<ConsumerResponse> {    
    return this.http.put<any>(`${this.api}/${id}`, body, header);
  }

  public deleteConsumer(id: string, request: ConsumerDeleteRequest): Observable<ConsumerDeleteResponse> {
    return this.http.delete<any>(`${this.api}/${id}`);
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

}