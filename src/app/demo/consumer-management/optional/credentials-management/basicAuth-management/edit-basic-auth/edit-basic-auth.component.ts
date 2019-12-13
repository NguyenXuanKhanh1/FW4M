import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Input } from '@angular/core';
import { BasicAuthViewModel } from '../basicAuth.model';
import { ValidationService, ValidationOption, RequiredValidationRule, CustomValidationRule, ClientValidator } from 'ngx-fw4c';
import { ValidateConsumer } from 'src/app/demo/shared/validate';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ConsumerViewModel } from 'src/app/demo/consumer-management/consumer.model';
import { debug } from 'util';

@Component({
  selector: 'app-edit-basic-auth',
  templateUrl: './edit-basic-auth.component.html',
  styleUrls: ['./edit-basic-auth.component.scss']
})
export class EditBasicAuthComponent implements AfterViewInit {

  @ViewChild("formRef", { static: true }) public formRef: ElementRef;
  @Input() public item = new BasicAuthViewModel();
  @Input() public reload: () => any;
  @Input() public consumerViewModel = new ConsumerViewModel();

  public username: any;

  protected api: string = 'http://13.251.173.60:8001/consumers';

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
    this._http.get(`${this.api}/${this.consumerViewModel.id}/basic-auth`).subscribe((res: any) => {
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