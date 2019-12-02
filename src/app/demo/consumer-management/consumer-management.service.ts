import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { ConsumerResponse, ConsumerRequest } from "../common/consumer.model";
import { SystemConstant } from "../common/system-constant";
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';


const EXCEL_TYPE = 'text/csv;charset=utf-8';
const EXCEL_EXTENSION = '.csv';

@Injectable({
	providedIn: "root"
})

export class ConsumerManagementService {
	constructor(private http: HttpClient, private _system: SystemConstant) { }
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

	public exportToExcel(data: any[], excelFileName: string): void {
		if (!data || !data.length) {
			return;
		}
		const separator = ',';
		const keys = Object.keys(data[0]);
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
		const blob = new Blob([excel], { type: EXCEL_TYPE });
		FileSaver.saveAs(blob, excelFileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
	}
}