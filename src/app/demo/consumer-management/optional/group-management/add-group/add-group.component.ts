import { Component, ViewChild, Input, ElementRef } from '@angular/core';
import { ValidationService, ClientValidator, ValidationOption, RequiredValidationRule, CustomValidationRule } from 'ngx-fw4c';
import { Observable, of } from 'rxjs';
import { ConsumerConstant } from '../../../consumer.const';
import { HttpClient } from '@angular/common/http';
import { GroupViewModel, ConsumerViewModel } from '../../../consumer.model';
import { ValidateConsumer } from 'src/app/demo/shared/validate';

@Component({
	selector: 'app-group',
	templateUrl: './add-group.component.html',
	styleUrls: ['./add-group.component.scss']
})
export class AddGroupComponent {

	@ViewChild("formRef", { static: true }) public formRef: ElementRef;
	@Input() public reload: () => any;
	@Input() public groupViewModel = new GroupViewModel();
	@Input() public item = new ConsumerViewModel();

	protected api: string = 'http://13.251.173.60:8001/consumers';

	public groupName: any;
	public label = {
		name: ConsumerConstant.GroupLabel
	};

	constructor(
		private _validationService: ValidationService,
		private _http: HttpClient,
		private _validate: ValidateConsumer
	) { }

	ngAfterViewInit(): void {
		this.getName();
		this.initValidations();
	}

	public getName(): void {
		this.groupName = [];
		this._http.get(`${this.api}/${this.item.id}/acls`).subscribe((res: any) => {
			for (let index = 0; index < res.data.length; index++) {
				if (res.data[index].group === this.groupViewModel.group) {
					continue;
				}
				this.groupName.push(res.data[index].group);
			}
		});
	}

	public initValidations(): void {
		var options = [
			new ValidationOption({
				validationName: 'Name',
				valueResolver: () => this.groupViewModel.group,
				rules: [
					new RequiredValidationRule(),
					new CustomValidationRule(value => {
						return this._validate.validateUnique(value, this.groupName);
					}),
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
