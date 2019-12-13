import { Component, ElementRef, ViewChild, Input, AfterViewInit } from "@angular/core";
import { ConsumerViewModel } from "../consumer.model";
import { Observable, of } from "rxjs";
import { ValidationOption, ClientValidator, ValidationService, CustomValidationRule, ValidationRuleResponse } from "ngx-fw4c";
import { ConsumerConstant } from '../consumer.const';
import { ValidateConsumer } from '../../shared/validate';
import { HttpClient } from '@angular/common/http';

@Component({
	selector: "app-edit-consumer",
	templateUrl: "./edit-consumer.component.html",
	styleUrls: ["./edit-consumer.component.scss"]
})

export class EditConsumerComponent implements AfterViewInit {
	@ViewChild("formRef", { static: true }) public formRef: ElementRef;
	@Input() public item = new ConsumerViewModel();
	@Input() public reload: () => any;

	public username: any;
	public customId: any;

	protected api: string = 'http://13.251.173.60:8001/consumers';

	public label = {
		username: ConsumerConstant.UserNameLabel,
		custom_id: ConsumerConstant.Custom_IdLabel,
		tags: ConsumerConstant.TagsLabel
	};

	constructor(
		private _validationService: ValidationService,
		private _validate: ValidateConsumer,
		private _http: HttpClient
	) { }

	ngAfterViewInit(): void {
		this.getUsername();
		this.getCustomId();
		this.initValidations();
	}

	public getUsername(): void {
		this.username = [];
		this._http.get(this.api).subscribe((res: any) => {
			for (let index = 0; index < res.data.length; index++) { 
				if (res.data[index].username === this.item.username) {
					continue;
				}
				this.username.push(res.data[index].username);
			}
		});
	}

	public getCustomId(): void {
		this.customId = [];
		this._http.get(this.api).subscribe((res: any) => {
			for (let index = 0; index < res.data.length; index++) { 
				if (res.data[index].custom_id === this.item.customId) {
					continue;
				}
				this.customId.push(res.data[index].custom_id);
			}
		});
	}

	public initValidations(): void {
		var options = [
			new ValidationOption({
				validationName: 'Username',
				valueResolver: () => this.item.username,
				relevantFields: () => ['Custom_id'],
				rules: [
					new CustomValidationRule(() => {
						return of(new ValidationRuleResponse({
							message: ConsumerConstant.MessageValidationEmpty,
							status: this.item.username != undefined || this.item.customId != undefined
						}));
					}, true),
					new CustomValidationRule(value => {
						return this._validate.validateString(value);
					}),
					new CustomValidationRule(value => {
						return this._validate.validateUnique(value, this.username);
					}),
				]
			}),
			new ValidationOption({
				validationName: 'Custom_id',
				valueResolver: () => this.item.customId,
				rules: [
					new CustomValidationRule(() => {
						return of(new ValidationRuleResponse({
							message: ConsumerConstant.MessageValidationEmpty,
							status: this.item.username != undefined || this.item.customId != undefined
						}));
					}),
					new CustomValidationRule(value => {
						return this._validate.validateString(value);
					}),
					new CustomValidationRule(value => {
						return this._validate.validateUnique(value, this.customId);
					}),
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