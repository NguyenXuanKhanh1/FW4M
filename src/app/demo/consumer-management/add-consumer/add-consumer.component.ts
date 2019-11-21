import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Input, OnChanges } from '@angular/core';
import { Consumer } from '../../common/consumer.model';
import { ValidationService, ValidationOption, RequiredValidationRule, ClientValidator, CustomValidationRule, ValidationRuleResponse } from 'ngx-fw4c';
import { of, Observable } from 'rxjs';
import { AddConsumerService } from './add-consumer.service';
import { LanguageEN } from '../../common/language.model';

@Component({
  selector: 'app-add-consumer',
  templateUrl: './add-consumer.component.html',
  styleUrls: ['./add-consumer.component.scss']
})
export class AddConsumerComponent implements AfterViewInit, OnChanges {
  @Input() public item: Consumer = new Consumer();
  @Input() public reload: () => void;
  @ViewChild('formRef', { static: true }) public formRef: ElementRef;
  public label = {
    username: "Username",
    custom_id: "Custom ID",
    tags: "Tags",
  }

  constructor(
    private _validationService: ValidationService,
    private _addConsumerService: AddConsumerService
  ) { }

  ngAfterViewInit(): void {
    this.initValidations();
  }
  
  ngOnChanges(): void {
    var test = this.item;
    debugger
  }

  public initValidations(): void {
		var options = [
			new ValidationOption({
				validationName: 'Username',
				valueResolver: () => this.item.username,
				relevantFields: () => ['Custom_id'],
				rules: [
					new CustomValidationRule(value => {
						return of(new ValidationRuleResponse({
							message: 'test',
							status: this.item.username != undefined || this.item.custom_id != undefined
						}));
					}, true)
				]
			}),
			new ValidationOption({
				validationName: 'Custom_id',
				valueResolver: () => this.item.custom_id,
				rules: [
					new CustomValidationRule(value => {
						return of(new ValidationRuleResponse({
							message: 'test',
							status: this.item.username != undefined || this.item.custom_id != undefined
						}));
					})
				]
			})
		]
		var validator = new ClientValidator({
			formRef: this.formRef,
			options: options
		});
		this._validationService.init({ validator });
	}

  // public isValid(): boolean {
  //   return this._validationService.isValid(false);
  // }

  // public callback(): Observable<Consumer> {
  //   return this._addConsumerService.postData(JSON.stringify(this.item));
  // }

  public isValid(): boolean {
    return this._validationService.isValid(true, false);
  }
  

  public callback(): Observable<any> {
    return of(true);
  }

  public getValidator(): ValidationService {
    return this._validationService;
  }

}
