import { Component, OnInit, ElementRef, ViewChild, Input, AfterViewInit } from '@angular/core';
import { Consumer } from '../../common/consumer.model';
import { Observable, of } from 'rxjs';
import { ValidationOption, RequiredValidationRule, ClientValidator, ValidationService, CustomValidationRule, ValidationRuleResponse } from 'ngx-fw4c';
import { EditConsumerService } from './edit-consumer.service';
import { LanguageEN, LanguageVN } from '../../common/language.model';

@Component({
	selector: 'app-edit-consumer',
	templateUrl: './edit-consumer.component.html',
	styleUrls: ['./edit-consumer.component.scss']
})
export class EditConsumerComponent implements AfterViewInit {

	@ViewChild("formRef", { static: true }) public formRef: ElementRef;
	@Input() public item = new Consumer;

	@Input() public reload: () => any;

	public label = {
		username: "Username",
		custom_id: "Custom ID",
		tags: "Tags",
	}

	constructor(
		private _validationService: ValidationService,
		private _editConsumerService: EditConsumerService
	) { }

	ngAfterViewInit(): void {
		this.initValidations();
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
					}, true)
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
		return (this._editConsumerService.updateData(this.item.id, this.item));
	}

	public getValidator(): ValidationService {
		return this._validationService;
	}
}
