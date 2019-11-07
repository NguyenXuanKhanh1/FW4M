import { Component, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { ButtonDemoComponent } from '../button';
import { of } from 'rxjs';
import { TableOption, ModalService, DataService, TemplateViewModel, TableComponent, ConfirmViewModel, TableConstant, TableMode, TableColumnType } from 'ngx-fw4c';
import { HttpClient } from '@angular/common/http';
import { resolve } from 'q';
import { DashboardDemoService } from './dashboard-demo.service';

@Component({
  selector: 'dashboard-demo',
  templateUrl: './dashboard-demo.component.html'
})

export class DashboardDemoComponent implements OnInit {
  @ViewChild('imageTemplate', { static: true }) public imageTemplate: TemplateRef<any>;
  @ViewChild('tableTemplate', { static: true }) public tableTemplate: TableComponent;
  public option: TableOption;

  constructor(
    private _modalService: ModalService,
    private _dataService: DashboardDemoService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.initTable();
  }


  private initTable() {
    this.option = new TableOption({
      // localData: () => {
      //   return this.data;
      // },
      topButtons: [
        {
          icon: 'fa fa-plus',
          customClass: 'primary',
          title: () => 'New',
          executeAsync: (item) => {

          }
        },
        {
          icon: 'fa fa-edit',
          customClass: 'danger',
          title: () => 'Test',
          executeAsync: (item) => {
            this._modalService.showTemplateDialog(new TemplateViewModel({
              template: ButtonDemoComponent,
              data: item
            }));
          }
        }
      ],
      actions: [
        {
          icon: 'fa fa-edit',
          executeAsync: () => {
            //call other api....
          }
        },
        {
          icon: 'fa fa-remove',
          executeAsync: (item) => {

          }
        },
        {
          icon: 'fa fa-copy',
          executeAsync: (item, e, provider: TableComponent) => {
            provider.copy(item);
            console.log(item);
            
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
          icon: 'fa fa-refresh',
          title: () => 'Refresh',
          executeAsync: () => {
          }
        },
      ],
      inlineEdit: true,
      mode: TableMode.full,
      searchFields: ['name', 'title'],
      mainColumns: [
        {
          title: () => 'Image',
          width: 100,
          customTemplate: () => this.imageTemplate
        },
        {
          type: TableColumnType.String,
          title: () => 'Name',
          valueRef: () => 'name',
          allowFilter: false
        },
        {
          type: TableColumnType.String,
          title: () => 'Title',
          valueRef: () => 'title',
          allowFilter: false
        },
        {
          type: TableColumnType.String,
          title: () => 'Main Role',
          valueRef: () => 'role1',
          allowFilter: true
        },
        {
          type: TableColumnType.String,
          title: () => 'Secondary Role',
          valueRef: () => 'role2',
          allowFilter: false
        },
        {
          type: TableColumnType.Description,
          title: () => 'Description',
          valueRef: () => 'description',
          width: 400,
          allowFilter: false,
        },
      ],
      serviceProvider: {
        searchAsync: () => {
          return this._dataService.getData();
        }
      } 
    });
  }
}
