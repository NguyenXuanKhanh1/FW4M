import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ValidationService, ClientValidator } from 'ngx-fw4c';
import { Observable, of } from 'rxjs';
import * as XLSX from 'xlsx';

@Component({
	selector: 'app-import-consumer',
	templateUrl: './import-consumer.component.html',
	styleUrls: ['./import-consumer.component.scss']
})
export class ImportConsumerComponent implements AfterViewInit {
	public fileUploaded: File;
	public data: any = [];
	public arrayBuffer: any;
	public fileType: string = ".csv";
	@ViewChild('formRef', { static: true }) public formRef: ElementRef;

	constructor(
		private _validationService: ValidationService
	) { }

	ngAfterViewInit(): void {
		var validator = new ClientValidator({
			formRef: this.formRef,
			options: []
		});
		this._validationService.init({ validator });
	}

	public isValid(): boolean {
		return this._validationService.isValid(true, true);
	}

	public uploadFile(event): void {
		this.fileUploaded = event.target.files[0];
		this.upload();
	}

	public callback(): Observable<any> {
		return of(this.data);
	}

	public getValidator(): ValidationService {
		return this._validationService;
	}

	public upload(): void {
		let fileReader = new FileReader();
		fileReader.onload = () => {
			this.arrayBuffer = fileReader.result;
			var data = new Uint8Array(this.arrayBuffer);
			var arr = new Array();
			for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
			var bstr = arr.join("");
			var workbook = XLSX.read(bstr, { type: "binary" });
			var first_sheet_name = workbook.SheetNames[0];
			var worksheet = workbook.Sheets[first_sheet_name];
			var element = XLSX.utils.sheet_to_json(worksheet, { raw: true });
			this.data = element;
		}
		fileReader.readAsArrayBuffer(this.fileUploaded);
	}
}