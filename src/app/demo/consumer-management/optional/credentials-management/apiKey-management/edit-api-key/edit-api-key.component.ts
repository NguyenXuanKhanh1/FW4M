import { Component, AfterViewInit, ViewChild, ElementRef, Input } from '@angular/core';
import { ApiKeyViewModel } from '../apiKey.model';
import { ValidationService, ValidationOption, CustomValidationRule, ClientValidator } from 'ngx-fw4c';
import { ValidateConsumer } from 'src/app/demo/shared/validate';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ConsumerViewModel } from 'src/app/demo/consumer-management/consumer.model';

@Component({
	selector: 'app-edit-api-key',
	templateUrl: './edit-api-key.component.html',
	styleUrls: ['./edit-api-key.component.scss']
})
export class EditApiKeyComponent implements AfterViewInit {
	@ViewChild("formRef", { static: true }) public formRef: ElementRef;
	@Input() public item = new ApiKeyViewModel();
	@Input() public reload: () => any;
	@Input() public consumerViewModel = new ConsumerViewModel();

	public key: any;

	protected api: string = 'http://13.251.173.60:8001/consumers';

	constructor(
		private _validationService: ValidationService,
		private _validate: ValidateConsumer,
		private _http: HttpClient
	) { }

	ngAfterViewInit(): void {
		this.getKey();
		this.initValidations();
	}

	public getKey(): void {
		this.key = [];
		this._http.get(`${this.api}/${this.consumerViewModel.id}/key-auth`).subscribe((res: any) => {
			for (let index = 0; index < res.data.length; index++) {
				if (res.data[index].key === this.item.key) {
					continue;
				}
				this.key.push(res.data[index].key);
			}
		});
	}

	public initValidations(): void {
		var options = [
			new ValidationOption({
				validationName: 'Key',
				valueResolver: () => this.item.key,
				rules: [
					new CustomValidationRule(value => {
						return this._validate.validateUnique(value, this.key);
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

