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
	protected api: string = 'http://192.168.110.61:8001/consumers';

	constructor(
		private http: HttpClient,
		private _system: SystemConstant) {
		super();
	}

	public search(request: ConsumerSearchRequest): Observable<ConsumerSearchResponse> {
		// return this.http.get<any>(`${this.api}`, { params: request as any }).pipe(map(s => new ConsumerSearchResponse({ items: s.data })));
		return this.http.get<any>(`${this.api}`, { params: request as any }).pipe(map(s => {
			for (let i = 0; i < s.data.length; i++) {
				s.data[i].created_at_2 = s.data[i].created_at * 1000;
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

}