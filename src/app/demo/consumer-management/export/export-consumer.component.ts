import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ValidationService, ClientValidator } from 'ngx-fw4c';
import { Observable, of } from 'rxjs';
import { ConsumerConstant } from '../consumer.const';

@Component({
  selector: 'app-export-consumer',
  templateUrl: './export-consumer.component.html',
  styleUrls: ['./export-consumer.component.scss']
})
export class ExportConsumerComponent implements OnInit {

  public fileUploaded: File;
  public data: any;
  public fileName: string
	public arrayBuffer: any;
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
  
  ngOnInit(): void {
    this.data = ConsumerConstant.CSV
  }

	public isValid(): boolean {
		return this._validationService.isValid(true, true);
  }

  public callback(): Observable<any> {
    return of(this.data);
  }
  
  public getValidator(): ValidationService {
		return this._validationService;
  }
  
  public getSelection(input: any): void {
    this.data = input.target.value
  }

}
