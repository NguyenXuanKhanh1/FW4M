import { Component, ViewChild, ElementRef, AfterViewInit, OnInit, Input, TemplateRef } from "@angular/core";
import {
	ValidationService,
	ValidationOption, ClientValidator,
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
import { of } from "rxjs";
import { EditConsumerService } from './edit-consumer/edit-consumer.service';
import { ConsumerViewModel } from '../common/consumer.model';
import { TabComponent } from 'ngx-fw4c/lib/components/shared/tab/tab.component';
import { DateFormatter } from 'ngx-bootstrap';
import { del } from 'selenium-webdriver/http';
import { debug } from 'util';
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
		private _editConsumerService: EditConsumerService,
		private http: HttpClient
	) { }

	ngOnInit() {
		this.getData();
		this.initTable();
	}
	public data = [];
	private getData(): void {
		this.data = [];
		this._consumerManagementService.readConsumer().subscribe(res => {
			for (let index = 0; index < res.totalRecords; index++) {
				this.data.push({
					custom_id: res.items[index].custom_id,
					id: res.items[index].id,
					tags: res.items[index].tags,
					username: res.items[index].username,
					created_at_2: res.items[index].created_at_2,
					created_at: res.items[index].created_at
				});
			}
			this.tableTemplate.reload(true);
		});
	}

	private initTable() {
		this.option = new TableOption({
			localData: () => {
				return of(this.data);
			},
			inlineEdit: false,
			mode: TableMode.full,
			searchFields: ["username", "tags", "custom_id"],
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
								acceptCallback: (response, close, provider: AddConsumerComponent) => {
									item = provider.item;
									this._addConsumerService.createConsumer(item).subscribe(() => {
										this.getData();
									});
								}
							})
						);
					}
				},
				{
					icon: 'fa fa-get-pocket',
					customClass: 'success',
					title: () => 'Export',
					executeAsync: (item, element, provider: TableComponent) => {
						for (let index = 0; index < this.data.length; index++) {
							const element = this.data[index];
							delete element.created_at_2;							
						}
						this._consumerManagementService.exportToExcel(this.data,'nxkhanh')
					}
				}
			],
			actions: [
				{
					icon: "fa fa-copy",
					executeAsync: (consumer) => {
						this._modalService.showConfirmDialog(
							new ConfirmViewModel({
								btnAcceptTitle: "Copy",
								message: "Are you sure to copy this consumer?",
								acceptCallback: () => {
									this.tableTemplate.copy(consumer, true, (cloneItem: ConsumerViewModel) => {
										delete cloneItem.created_at_2;
										let string = cloneItem.username.split('_copy');
										let checkUsername = this.data.filter((x: any) => x.username.includes(string[0]))
										if (checkUsername && checkUsername.filter((x: any) => x.username.includes('_copy'))) {
											cloneItem.username = cloneItem.username == null ? 'copy' : string[0] + '_copy' + checkUsername.length;
										} else {
											cloneItem.username = cloneItem.username == null ? 'copy' : string[0] + '_copy' + (checkUsername.length);
										}
										this._addConsumerService.createConsumer(cloneItem).subscribe(() => {								
											this.getData();
										});
									})
								}
							})
						);
					}
				},
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
									item: this._dataService.cloneItem(consumer)
								},
								cancelCallback: () => {
									this.tableTemplate.reload();
								},
								acceptCallback: (response, close) => {
									this.getData();
									// this.tableTemplate.changedRows
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
										.deleteConsumer(consumer.id)
										.subscribe(() => {
											this.getData();
										});
								}
							})
						);
					}
				},
				{
					type: TableConstant.ActionType.Toolbar,
					customClass: 'danger',
					icon: "fa fa-trash-o",
					title: () => "Remove",
					executeAsync: (item, element, provider: TableComponent) => {
						console.log(provider.selectedItems);
						let select = this.tableTemplate.selectedItems;
						for (let index = 0; index < select.length; index++) {
							this._consumerManagementService.deleteConsumer(select[index].id).subscribe();
							this.data.splice(this.data.indexOf(select[index]), 1)
						}
						console.log(this.data);
						this.tableTemplate.reload();
					}
				},
				{
					type: TableConstant.ActionType.Toolbar,
					customClass: 'success',
					icon: "fa fa-copyright",
					title: () => "Copy",
					executeAsync: () => {
						let select = this._dataService.cloneItems(this.tableTemplate.selectedItems);
						for (let index = 0; index < select.length; index++) {
							let element = select[index];
							delete element.created_at_2;
							let string = select[index].username.split('_copy');
							let checkUsername = this.data.filter((x: any) => x.username.includes(element.username))							
							if (checkUsername ) {
								element.username = element.username + '_copy' + (checkUsername.length);
							}
							this.data.push(element)
							this._addConsumerService.createConsumer(element).subscribe(() => {
								if (index == select.length - 1) {
									this.getData()
								}
							});
						}
					}
				}
			],
			mainColumns: [
				{
					type: TableColumnType.String,
					title: () => "Username",
					valueRef: () => "username",
					width: 300,
					allowFilter: false
				},
				{
					type: TableColumnType.String,
					title: () => "Custom_ID",
					valueRef: () => "custom_id",
					allowFilter: true
				},
				{
					type: TableColumnType.String,
					title: () => "Tags",
					valueRef: () => "tags",
					allowFilter: true
				},
				{
					type: TableColumnType.DateTime,
					title: () => "Created",
					valueRef: () => "created_at_2",
					allowFilter: true
				}
			],

			serviceProvider: {
				searchAsync: () => {
					return of(true);
				}
			}
		});
	}
}
