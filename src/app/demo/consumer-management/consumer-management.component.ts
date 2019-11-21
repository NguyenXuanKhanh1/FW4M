import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnInit,
  Input,
  TemplateRef
} from "@angular/core";
import {
  ValidationService,
  ValidationOption,
  ClientValidator,
  CustomValidationRule,
  RequiredValidationRule,
  ValidationRuleResponse
} from "ngx-fw4c";
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
import { ConsumerManagementService } from "./consumer-management.service";
import { AddConsumerComponent } from "./add-consumer/add-consumer.component";
import { EditConsumerComponent } from "./edit-consumer/edit-consumer.component";
import { HttpClient } from "@angular/common/http";
import { AddConsumerService } from "./add-consumer/add-consumer.service";
import { of } from 'rxjs';
@Component({
  selector: "app-consumer-management",
  templateUrl: "./consumer-management.component.html",
  styleUrls: ["./consumer-management.component.scss"]
})
export class ConsumerManagementComponent implements OnInit {
  public option: TableOption;
  @ViewChild("tableTemplate", { static: true })
  public tableTemplate: TableComponent;

  constructor(
    private _modalService: ModalService,
    private _dataService: DataService,
    private _addConsumerService: AddConsumerService,
    private _consumerManagementService: ConsumerManagementService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.initTable();
  }

  

  private initTable() {
    var data = [];
    this._consumerManagementService.readData().subscribe(res => {
      console.log(res.totalRecords)
      for (let index = 0; index < res.totalRecords; index++) {
        data.push({
          custom_id: res.items[index].custom_id,
          id: res.items[index].id,
          tags: res.items[index].tags,
          username: res.items[index].username,
          created_at_2: res.items[index].created_at_2
        });        
      }
      this.tableTemplate.reload();
    });
    this.option = new TableOption({
      localData: () =>{
        return data
      },

      inlineEdit: false,
      mode: TableMode.full,
      searchFields: ["tags"],
      displayText: {},
      topButtons: [
        {
          icon: "fa fa-plus",
          customClass: "primary",
          title: () => "New",
          executeAsync: item => {
            this._modalService.showTemplateDialog(
              new TemplateViewModel({
                template: AddConsumerComponent,
                validationKey: "AddConsumerComponent",
                customSize: "modal-lg",
                title: "Add New Consumer",
                btnAcceptTitle: "Add",
                data: {
                  reload: () => {
                    this.tableTemplate.reload().subscribe();
                  }
                },
                acceptCallback: (
                  response,
                  close,
                  provider: AddConsumerComponent
                ) => {
                  debugger;
                  item = provider.item;
                  this._addConsumerService.postData(item).subscribe(() => {
                    this.tableTemplate.reload().subscribe();
                  });
                }
              })
            );
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
          executeAsync: consumer => {
            this._modalService.showTemplateDialog(
              new TemplateViewModel({
                validationKey: "EditConsumerComponent",
                template: EditConsumerComponent,
                customSize: "modal-lg",
                title: "Edit Consumer",
                btnAcceptTitle: "Edit",
                data: {
                  reload: () => {
                    this.tableTemplate.reload().subscribe();
                  },
                  item: consumer
                },
                cancelCallback: () => {
                  this.tableTemplate.reload();
                },
                acceptCallback: (response, close) => {
                  this.tableTemplate.reload();
                }
              })
            );
          }
        },
        {
          icon: "fa fa-remove",
          executeAsync: consumer => {
            this._modalService.showConfirmDialog(
              new ConfirmViewModel({
                btnAcceptTitle: "Delete",
                message: "Are you sure to delete this consumer?",
                acceptCallback: () => {
                  this._consumerManagementService
                    .deleteData(consumer.id)
                    .subscribe(() => {
                      this.tableTemplate.reload();
                    });
                }
              })
            );
          }
        }
      ],
      mainColumns: [
        {
          type: TableColumnType.String,
          title: () => "Username",
          valueRef: () => "username",
          // direction: 'DESC',
          // defaultSorter: false,
          // order: 1,
          width: 300,
          allowFilter: true
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
          valueRef: () => "created_at_2",
          allowFilter: false
        }
      ],

      serviceProvider: {
        // searchAsync: request => {
        //   // console.log(request);
        //   // this.tableTemplate.setFilter('tags', request.searchText)
        //   return this._consumerManagementService.readData(request);
        // }
        searchAsync: () => {
          // console.log(request);
          // this.tableTemplate.setFilter('tags', request.searchText)
          return of(true);
        }
      }
    });
  }
}
