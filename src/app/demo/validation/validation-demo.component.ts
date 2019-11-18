import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnInit,
  Input
} from "@angular/core";
import {
  ValidationService,
  ValidationOption,
  ClientValidator,
  CustomValidationRule,
  RequiredValidationRule,
  ValidationRuleResponse
} from "ngx-fw4c";
import { of } from "rxjs";
import {
  TableOption,
  ModalService,
  DataService,
  TemplateViewModel,
  TableComponent,
  ConfirmViewModel,
  TableConstant,
  TableMode,
  TableColumnType
} from "ngx-fw4c";
import { ValidationDemoService } from "./validation-demo.service";

@Component({
  selector: "validation-demo",
  templateUrl: "./validation-demo.component.html"
})
export class ValidationDemoComponent implements OnInit, AfterViewInit {
  @ViewChild("formRef", { static: true }) public formRef: ElementRef;
  @ViewChild("tableTemplate", { static: true })
  public tableTemplate: TableComponent;
  public option: TableOption;
  public isEmpty: boolean;
  public items = [""];

  constructor(
    private _modalService: ModalService,
    private _validationService: ValidationService,
    private _validationDemoService: ValidationDemoService
  ) { }

  ngOnInit() {
    this.initTable();
  }
  ngAfterViewInit(): void {
    this.initValidations();
  }

  private initValidations(): void {
    var options = [
      new ValidationOption({
        validationName: "Email",
        dynamic: true,
        rules: [
          new RequiredValidationRule(),
          new CustomValidationRule(
            (value, payload) => {
              return of(
                new ValidationRuleResponse({
                  status: this._validationDemoService.validateEmail(value)
                })
              );
            },
            () => "Giá trị nhập vào phải là email"
          )
        ]
      }),
      new ValidationOption({
        validationName: "tableUser",
        valueResolver: () => this.tableTemplate.selectedItems,
        rules: [
          new CustomValidationRule(
            (value, payload) => {
              return of(
                new ValidationRuleResponse({
                  status: value.length > 0
                })
              );
            },
            () => "Please choose an item"
          )
        ]
      })
    ];

    var validator = new ClientValidator({
      formRef: this.formRef,
      options: options
    });

    this._validationService.init({ validator });
  }

  private initTable() {
    this.option = new TableOption({
      inlineEdit: true,
      mode: TableMode.full,
      searchFields: ["username", "email"],
      mainColumns: [
        {
          type: TableColumnType.String,
          title: () => "Username",
          valueRef: () => "username",
          width: 500,
          allowFilter: false
        },
        {
          type: TableColumnType.String,
          title: () => "Email",
          valueRef: () => "email",
          allowFilter: false
        }
      ],
      serviceProvider: {
        searchAsync: request => {
          // debugger
          return this._validationDemoService.getData();
        }
      }
    });
  }
  public validate() {
    if (this._validationService.isValid()) {
      console.log("ok");
    } else {
      console.log("not ok");
    }
  }

  public add() {
    this.items.push("");
    this._validationService.updateAsync();
  }
}
