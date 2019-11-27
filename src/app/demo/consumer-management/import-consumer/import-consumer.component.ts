import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
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
	public storeData: any;
	public worksheet: any;
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

	public callback(): Observable<any> {
		this.fileUploaded = this.formRef.nativeElement.files[0];
		this.readExcel();
		return of(this.formRef);
	}

	public getValidator(): ValidationService {
		return this._validationService;
	}

	public readExcel() {
		let readFile = new FileReader();
		readFile.onload = event => {
			const data = readFile.result;
			this.worksheet = XLSX.read(data, { type: "binary" });
			this.storeData = this.worksheet.SheetNames.reduce((initial, name) => {
				const sheet = this.worksheet.Sheets[name];
				initial[name] = XLSX.utils.sheet_to_json(sheet);
				return initial;
			}, {});
		};
		readFile.readAsBinaryString(this.fileUploaded);
	}
}
