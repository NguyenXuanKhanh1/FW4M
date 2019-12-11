import { Component, OnInit, ViewChild, ElementRef, Input, AfterViewInit } from '@angular/core';
import { ConsumerViewModel } from '../../consumer.model';
import { ConsumerConstant } from '../../consumer.const';
import { ValidationService, ValidationOption, CustomValidationRule, ValidationRuleResponse, ClientValidator, RequiredValidationRule } from 'ngx-fw4c';
import { ValidateConsumer } from 'src/app/demo/shared/validate';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { BasicAuthViewModel } from '../../basic-auth.model';

@Component({
  selector: 'app-edit-credential',
  templateUrl: './edit-credential.component.html',
  styleUrls: ['./edit-credential.component.scss']
})
export class EditCredentialComponent implements AfterViewInit {

  @ViewChild("formRef", { static: true }) public formRef: ElementRef;
	@Input() public item = new BasicAuthViewModel();
	@Input() public reload: () => any;

	public username: any;

	protected api: string = 'http://13.251.173.60:8001/consumers/4ce5ba52-782d-4563-8c88-11bed2184679/basic-auth';

	constructor(
		private _validationService: ValidationService,
		private _validate: ValidateConsumer,
		private _http: HttpClient
	) { }

	ngAfterViewInit(): void {
		this.getUsername();
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

	public initValidations(): void {
		var options = [
			new ValidationOption({
				validationName: 'Username',
				valueResolver: () => this.item.username,
				rules: [
					new RequiredValidationRule(),
					new CustomValidationRule(value => {
						return this._validate.validateString(value);
					}),
					new CustomValidationRule(value => {
						return this._validate.validateUnique(value, this.username);
					}),
				]
			}),
			new ValidationOption({
				validationName: 'Password',
				valueResolver: () => this.item.password,
				rules: [
					new RequiredValidationRule(),
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
