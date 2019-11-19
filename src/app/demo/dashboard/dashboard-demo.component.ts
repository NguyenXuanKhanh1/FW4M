import { Component, ViewChild, TemplateRef, OnInit } from "@angular/core";
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
import { HttpClient } from "@angular/common/http";
import { resolve } from "q";
import { DashboardDemoService } from "./dashboard-demo.service";

@Component({
  selector: "dashboard-demo",
  templateUrl: "./dashboard-demo.component.html"
})
export class DashboardDemoComponent implements OnInit {
  @ViewChild("imageTemplate", { static: true })
  public imageTemplate: TemplateRef<any>;
  @ViewChild("tableTemplate", { static: true })
  public tableTemplate: TableComponent;
  public option: TableOption;
  public items = [];
  public apiUrl = "http://localhost:3000/champion";

  constructor(
    private _modalService: ModalService,
    private _dataService: DashboardDemoService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.initTable();
  }

  // private getData() {
  //   this.items = [];
  //   console.log('aaaaaaaaaa');
  //   this.http.get(this.apiUrl).subscribe((res: any) => {
  //     for (let index = 0; index < res.length; index++) {
  //       this.items.push({
  //         id: res[index].id,
  //         name: res[index].name,
  //         title: res[index].title,
  //         image: res[index].icon,
  //         role1: res[index].tags[0],
  //         role2: res[index].tags[1],
  //         description: res[index].description
  //       });
  //     }
  //     this.tableTemplate.reload();
  //   });
  // }

  private initTable() {
    this.option = new TableOption({
      localData: () => {
        return this.items;
      },
      topButtons: [
        {
          icon: "fa fa-plus",
          customClass: "primary",
          title: () => "New",
          executeAsync: item => {}
        },
        {
          icon: "fa fa-copy",
          customClass: "danger",
          title: () => "Copy",
          executeAsync: (item, e, provider: TableComponent) => {
            provider.selectedItems.forEach(e => {
              provider.items.unshift(e);
            });
          }
        }
      ],
      actions: [
        {
          icon: "fa fa-edit",
          executeAsync: () => {
            //call other api....
          }
        },
        {
          icon: "fa fa-remove",
          executeAsync: (item, e, provider: TableComponent) => {
            // provider.items.slice(provider.items.indexOf(item), 1)
            console.log(provider.items);
            console.log(provider.items.indexOf(item));
          }
        },
        {
          icon: "fa fa-copy",
          executeAsync: (item, e, provider: TableComponent) => {
            // this._modalService.showConfirmDialog(new ConfirmViewModel({
            //   title: 'Test',
            //   message: 'abc?',
            //   btnAcceptTitle: 'changed',
            //   acceptCallback: () => {
            //   }
            // }));
          }
        },
        {
          type: TableConstant.ActionType.Toolbar,
          icon: "fa fa-refresh",
          title: () => "Refresh",
          executeAsync: () => {}
        }
      ],
      inlineEdit: true,
      mode: TableMode.full,
      searchFields: ["name", "title"],
      mainColumns: [
        {
          title: () => "Image",
          width: 100,
          customTemplate: () => this.imageTemplate
        },
        {
          type: TableColumnType.String,
          title: () => "Name",
          valueRef: () => "name",
          allowFilter: false
        },
        {
          type: TableColumnType.String,
          title: () => "Title",
          valueRef: () => "title",
          allowFilter: false
        },
        {
          type: TableColumnType.String,
          title: () => "Main Role",
          valueRef: () => "tags",
          allowFilter: true
        },
        {
          type: TableColumnType.String,
          title: () => "Secondary Role",
          valueRef: () => "tags",
          allowFilter: false
        },
        {
          type: TableColumnType.Description,
          title: () => "Description",
          valueRef: () => "description",
          width: 400,
          allowFilter: false
        }
      ],
      serviceProvider: {
        searchAsync: request => {
          // debugger
          console.log(request);
          // return this._dataService.getData(request);
          return of(true)
        }
      }
    });
  }
}
