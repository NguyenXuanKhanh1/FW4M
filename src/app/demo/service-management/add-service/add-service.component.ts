import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { Service } from '../service';
import { ValidationOption, RequiredValidationRule, ClientValidator, ValidationService } from 'ngx-fw4c';


@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.scss']
})
export class AddServiceComponent implements OnInit, AfterViewInit {
  @ViewChild("formRef", { static: true }) public formRef: ElementRef;
  label = {
    name: 'asdas'
  }
  public item = new Service;
  public apiUrl = "http://192.168.110.112:8001/services";
  public body: any;
  public header = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  constructor(
    private http: HttpClient,
    private _validationService: ValidationService
  ) { }

  ngAfterViewInit(): void {
    this.initValidations();
  }

  initValidations(): void {
    var options = [
      new ValidationOption({
        validationName: "Name",
        valueResolver: () => this.item.name,
        rules: [
          new RequiredValidationRule()
        ]
      }),
      new ValidationOption({
        validationName: "Host",
        valueResolver: () => this.item.host,
        rules: [
          new RequiredValidationRule()
        ]
      }),
      new ValidationOption({
        validationName: "Port",
        valueResolver: () => this.item.port,
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

  ngOnInit() {
    this.loadDefaultValue();
    
  }

  loadDefaultValue(): void {
    this.item.retries = 5;
    this.item.connect_timeout = 60000;
    this.item.write_timeout = 60000;
    this.item.read_timeout = 60000;
  }

  isValid(): boolean {
    return this._validationService.isValid(false);
  }

  callback(): Observable<any> {
    this.body = JSON.stringify(this.item);
    console.log(this.item);
    return of(this.postData())
  }

  postData():void {
    this.http.post(this.apiUrl, this.body, this.header).subscribe(()=> {
    });
  }

}
