import { Component, ElementRef, ViewChild, Input, AfterViewInit } from "@angular/core";
import { ConsumerViewModel } from "../consumer.model";
import { Observable, of } from "rxjs";
import { ValidationOption, RequiredValidationRule, ClientValidator, ValidationService, CustomValidationRule, ValidationRuleResponse } from "ngx-fw4c";
import { ConsumerConstant } from '../consumer.const';
import { ValidateConsumer } from '../../shared/validate';

@Component({
	selector: "app-edit-consumer",
	templateUrl: "./edit-consumer.component.html",
	styleUrls: ["./edit-consumer.component.scss"]
})

export class EditConsumerComponent implements AfterViewInit {
	@ViewChild("formRef", { static: true }) public formRef: ElementRef;
	@Input() public item = new ConsumerViewModel();
	@Input() public reload: () => any;

	public label = {
		username: ConsumerConstant.UserName,
		custom_id: ConsumerConstant.Custom_Id,
		tags: ConsumerConstant.Tags
	};

	constructor(
		private _validationService: ValidationService,
		private _validate: ValidateConsumer
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
							message: ConsumerConstant.MessageValidationEmpty,
							status: this.item.username != undefined || this.item.customId != undefined
						}));
					}, true),
					new CustomValidationRule(value => {
						return this._validate.validateString(value);
					})
				]
			}),
			new ValidationOption({
				validationName: 'Custom_id',
				valueResolver: () => this.item.customId,
				rules: [
					new CustomValidationRule(value => {
						return of(new ValidationRuleResponse({
							message: ConsumerConstant.MessageValidationEmpty,
							status: this.item.username != undefined || this.item.customId != undefined
						}));
					}),
					new CustomValidationRule(value => {
						return this._validate.validateString(value);
					})
				]
			}),
			new ValidationOption({
				validationName: 'Tags',
				valueResolver: () => this.item.tags,
				rules: [
					new CustomValidationRule(value => {
						return this._validate.validateTags(value);
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
		return of(true)
	}

	public getValidator(): ValidationService {
		return this._validationService;
	}
}