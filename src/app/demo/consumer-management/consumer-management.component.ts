import { Component, ViewChild, ElementRef, AfterViewInit, OnInit, Input, TemplateRef } from "@angular/core";
import { ValidationService, ValidationOption, ClientValidator, CustomValidationRule, RequiredValidationRule, ValidationRuleResponse } from "ngx-fw4c";
import { TableOption, ModalService, DataService, TemplateViewModel, TableComponent, ConfirmViewModel, TableConstant, TableMode, TableColumnType } from "ngx-fw4c";
import { ConsumerManagementService } from './consumer-management.service';
import { AddConsumerComponent } from './add-consumer/add-consumer.component';
import { EditConsumerComponent } from './edit-consumer/edit-consumer.component';
@Component({
  selector: 'app-consumer-management',
  templateUrl: './consumer-management.component.html',
  styleUrls: ['./consumer-management.component.scss']
})
export class ConsumerManagementComponent implements OnInit {
  public option: TableOption;
  @ViewChild("tableTemplate", { static: true }) public tableTemplate: TableComponent;

  constructor(
    private _modalService: ModalService,
    private _consumerManagementService: ConsumerManagementService
  ) { }

  ngOnInit() {
    this.initTable();
  }

  private initTable() {
    this.option = new TableOption({
      inlineEdit: false,
      mode: TableMode.full,
      searchFields: ['username', 'custom_id'],
      topButtons: [
        {
          icon: "fa fa-plus",
          customClass: "primary",
          title: () => "New",
          executeAsync: item => {
            this._modalService.showTemplateDialog(new TemplateViewModel({
              template: AddConsumerComponent,
              customSize: 'modal-lg',
              title: 'Add New Consumer',
              btnAcceptTitle: 'Add',
              acceptCallback: () => {
                this.tableTemplate.reload().subscribe();
              }
            }));
          }
        },
        {
          icon: "fa fa-refresh",
          title: () => "Reload",
          executeAsync: () => {
            this.tableTemplate.reload();
          }
        }
      ],
      actions: [
        {
          icon: "fa fa-edit",
          executeAsync: (consumer) => {
            this._modalService.showTemplateDialog(new TemplateViewModel({
              template: EditConsumerComponent,
              customSize: 'modal-lg',
              title: 'Edit Consumer',
              btnAcceptTitle: 'Edit',
              data: {
                item: consumer
              },
              cancelCallback: () => {
                this.tableTemplate.reload();
              },
              acceptCallback: item => {
                this.tableTemplate.reload();
              }
            }))
          }
        },
        {
          icon: "fa fa-remove",
          executeAsync: (consumer) => {
            this._modalService.showConfirmDialog(new ConfirmViewModel({
              btnAcceptTitle: 'Delete',
              message: 'Are you sure to delete this consumer?',
              acceptCallback: () => {
                this._consumerManagementService.deleteData(consumer.id).subscribe(() => {
                  this.tableTemplate.reload();
                })
              }
            }))
          }
        }
      ],
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
          title: () => "Custom_ID",
          valueRef: () => "custom_id",
          allowFilter: false
        },
        {
          type: TableColumnType.String,
          title: () => "Tags",
          valueRef: () => "tags",
          allowFilter: false
        },
        {
          type: TableColumnType.DateTime,
          title: () => "Created",
          valueRef: () => "created_at",
          allowFilter: false
        }
      ],
      serviceProvider: {
        searchAsync: request => {
          return this._consumerManagementService.readData(request);
        }
      }
    });
  }

}