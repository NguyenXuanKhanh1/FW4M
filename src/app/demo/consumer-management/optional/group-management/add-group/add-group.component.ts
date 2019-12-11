import { Component, ViewChild, Input, ElementRef } from '@angular/core';
import { ValidationService, ClientValidator, ValidationOption, RequiredValidationRule } from 'ngx-fw4c';
import { Observable, of } from 'rxjs';
import { ConsumerConstant } from '../../../consumer.const';
import { HttpClient } from '@angular/common/http';

@Component({
	selector: 'app-group',
	templateUrl: './add-group.component.html',
	styleUrls: ['./add-group.component.scss']
})
export class AddGroupComponent {

	@ViewChild("formRef", { static: true }) public formRef: ElementRef;
	@Input() public reload: () => any;

	public name: any;
	public username: any;
	public customId: any;

	protected api: string = 'http://192.168.110.61:8001/consumers';

	public label = {
		name: ConsumerConstant.GroupLabel
	};

	constructor(
		private _validationService: ValidationService,
		private _http: HttpClient
	) { }

	ngAfterViewInit(): void {
		this.getName();
		this.initValidations();
	}

	public getName(): void {
		this.username = [];
		this._http.get(this.api).subscribe((res: any) => {
			for (let index = 0; index < res.data.length; index++) {
				if (res.data[index].username === this.name) {
					continue;
				}
				this.username.push(res.data[index].username);
			}
		});
	}

	public initValidations(): void {
		var options = [
			new ValidationOption({
				validationName: 'Name',
				valueResolver: () => this.name,
				rules: [
					new RequiredValidationRule()
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
