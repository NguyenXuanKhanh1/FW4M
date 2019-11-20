import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Consumer } from '../../common/consumer.model';
import { ValidationService, ValidationOption, RequiredValidationRule, ClientValidator, CustomValidationRule } from 'ngx-fw4c';
import { of, Observable } from 'rxjs';
import { AddConsumerService } from './add-consumer.service';
import { LanguageEN } from '../../common/language.model';

@Component({
  selector: 'app-add-consumer',
  templateUrl: './add-consumer.component.html',
  styleUrls: ['./add-consumer.component.scss']
})
export class AddConsumerComponent implements AfterViewInit {
  @Input() public item: Consumer = new Consumer();
  @ViewChild('formRef', { static: true }) public formRef: ElementRef;
  public label = new LanguageEN;

  constructor(
    private _validationService: ValidationService,
    private _addConsumerService: AddConsumerService
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
          new RequiredValidationRule()
        ]
      }),
      new ValidationOption({
        validationName: 'Custom_id',
        valueResolver: () => this.item.custom_id,
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
    return this._validationService.isValid(false);
  }

  public callback(): Observable<Consumer> {
    return this._addConsumerService.postData(JSON.stringify(this.item));
  }

}
