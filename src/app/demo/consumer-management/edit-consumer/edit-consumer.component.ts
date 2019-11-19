import { Component, OnInit, ElementRef, ViewChild, Input, AfterViewInit } from '@angular/core';
import { Consumer } from '../consumer';
import { Observable, of } from 'rxjs';
import { ValidationOption, RequiredValidationRule, ClientValidator, ValidationService } from 'ngx-fw4c';
import { EditConsumerService } from './edit-consumer.service';

@Component({
  selector: 'app-edit-consumer',
  templateUrl: './edit-consumer.component.html',
  styleUrls: ['./edit-consumer.component.scss']
})
export class EditConsumerComponent implements AfterViewInit{

  @ViewChild("formRef", { static: true }) public formRef: ElementRef;
  @Input() public item = new Consumer;
  public body: string;

  public label = {
    username: "Username",
    custom_id: "Custom ID",
    tags: "Tags"
  }

  constructor(
    private _validationService: ValidationService,
    private _editConsumerService :EditConsumerService
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
    return true;
  }

  public callback(): Observable<Consumer> {
    this.body = JSON.stringify(this.item);
    return this._editConsumerService.updateData(this.item.id, this.body);
  }
}