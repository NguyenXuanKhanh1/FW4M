import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Input, OnChanges } from '@angular/core';
import { ConsumerViewModel } from '../../common/consumer.model';
import { ValidationService, ValidationOption, RequiredValidationRule, ClientValidator, CustomValidationRule, ValidationRuleResponse } from 'ngx-fw4c';
import { of, Observable } from 'rxjs';
import { AddConsumerService } from './add-consumer.service';
import { LanguageEN } from '../../common/language.model';
import { Validation } from '../../common/validation';

@Component({
	selector: 'app-add-consumer',
	templateUrl: './add-consumer.component.html',
	styleUrls: ['./add-consumer.component.scss']
})
export class AddConsumerComponent implements AfterViewInit, OnChanges {
	@Input() public item = new ConsumerViewModel();
	@Input() public reload: () => void;
	@ViewChild('formRef', { static: true }) public formRef: ElementRef;
	public label = {
		username: "Username",
		custom_id: "Custom ID",
		tags: "Tags",
	}

	constructor(
		private _validationService: ValidationService,
		private _addConsumerService: AddConsumerService,
		private validation: Validation
	) { }

	ngAfterViewInit(): void {
		this.initValidations();
	}

	ngOnChanges(): void {
		var test = this.item;
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
							message: "At least one of these fields must be non-empty: 'custom_id', 'username'",
							status: this.item.username != undefined || this.item.custom_id != undefined
						}));
					}, true),
					new CustomValidationRule(value => {
						return this.validation.validateString(value);
					})
				]
			}),
			new ValidationOption({
				validationName: 'Custom_id',
				valueResolver: () => this.item.custom_id,
				rules: [
					new CustomValidationRule(value => {
						return of(new ValidationRuleResponse({
							message: "At least one of these fields must be non-empty: 'custom_id', 'username'",
							status: this.item.username != undefined || this.item.custom_id != undefined
						}));
					}),
					new CustomValidationRule(value => {
						return this.validation.validateString(value);
					})
				]
			}),
			new ValidationOption({
				validationName: 'Tags',
				valueResolver: () => this.item.tags,
				rules: [
					new CustomValidationRule(value => {
						return this.validation.validateString(value);
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

	public isValid(): boolean {
		return this._validationService.isValid(true, false);
	}

  public callback(): Observable<any> {
    delete this.item.created_at_2;
    return of(true);
  }

	public getValidator(): ValidationService {
		return this._validationService;
	}

}
