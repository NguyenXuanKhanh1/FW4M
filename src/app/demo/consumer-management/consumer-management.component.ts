import { Component, ViewChild, OnInit } from "@angular/core";
import { TableOption, ModalService,	DataService, TemplateViewModel, TableComponent, ConfirmViewModel, TableConstant, TableMode,	TableColumnType } from "ngx-fw4c";
import { ConsumerManagementService } from "./consumer-management.service";
import { AddConsumerComponent } from "./add-consumer/add-consumer.component";
import { EditConsumerComponent } from "./edit-consumer/edit-consumer.component";
import { HttpClient } from "@angular/common/http";
import { AddConsumerService } from "./add-consumer/add-consumer.service";
import { of } from "rxjs";
import { EditConsumerService } from './edit-consumer/edit-consumer.service';
import { ConsumerViewModel } from '../common/consumer.model';
import { ImportConsumerComponent } from './import-consumer/import-consumer.component';
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
			inlineEdit: true,
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
								icon: "fa fa-plus",
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
					icon: 'fa fa-print',
					customClass: 'success',
					title: () => 'Export',
					executeAsync: () => {
						for (let index = 0; index < this.data.length; index++) {
							const element = this.data[index];
							delete element.created_at_2;
						}
						this._consumerManagementService.exportToExcel(this.data, 'nxkhanh')
					}
				},
				{

					icon: "fa fa-download",
					customClass: "success",
					title: () => "Import",
					executeAsync: item => {
						this._modalService.showTemplateDialog(new TemplateViewModel({
							template: ImportConsumerComponent,
							validationKey: "ImportConsumerComponent",
							title: "Import Consumer",
							icon: 'fa fa-download',
							btnAcceptTitle: "Import",
							data: {
								reload: () => {
									this.tableTemplate.reload().subscribe();
								}
							},
							acceptCallback: (response, close, provider: ImportConsumerComponent) => {
								for (let index = 0; index < response.length; index++) {
									delete response[index].id;
									delete response[index].created_at;
									this._addConsumerService.createConsumer(response[index])
										.subscribe(() => {
											if(index == response.length -1){
												this.getData()
											}
										});
									
								}
							}
						}));
					}
				},
					{
					icon: 'fa fa-save',
					customClass: 'warning',
					title: () => 'Save',
					hide: () => {
						if (this.tableTemplate.changedRows.length > 0) {
							return false;
						}
						else return true;
					},					
					executeAsync: (consumer, element, provider: TableComponent) => {
						let editLine = this.tableTemplate.changedRows;
						for (let index = 0; index < editLine.length; index++) {
							const element = editLine[index];
							delete element.currentItem.created_at_2;
							console.log(element.currentItem.created_at)
							this._editConsumerService.updateConsumer(element.currentItem.id, element.currentItem).subscribe(() => {
								this.tableTemplate.changedRows = [];
								this.getData();
							})
						}						

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
										if (cloneItem.username !== null) {
											let checkUsername = cloneItem.username && this.data.filter((x: any) => x.username && x.username.includes(cloneItem.username)
												&& x.username.length >= cloneItem.username.length + 6 && x.username.length <= cloneItem.username.length + 10)
											if (checkUsername) {
												if (cloneItem.custom_id !== null) {
													cloneItem.username = cloneItem.username + '_copy' + (checkUsername.length + 1);
													cloneItem.custom_id = cloneItem.custom_id + '_copy' + (checkUsername.length + 1)
												}
												else {
													cloneItem.username = cloneItem.username + '_copy' + (checkUsername.length + 1);
												}
											}
										}
										if (cloneItem.username === null) {
											let checkCustom_id = cloneItem.custom_id && this.data.filter((x: any) => x.custom_id && x.custom_id.includes(cloneItem.custom_id)
												&& x.custom_id.length >= cloneItem.custom_id.length + 6 && x.custom_id.length <= cloneItem.custom_id.length + 10)
											if (checkCustom_id) {
												cloneItem.custom_id = cloneItem.custom_id + '_copy' + (checkCustom_id.length + 1);
											}
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
							this._consumerManagementService.deleteConsumer(select[index].id).subscribe(() => {
								if (index == select.length - 1) {
									this.getData()
								}
							});
							
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
							if (element.username !== null) {
								let checkUsername = element.username && this.data.filter((x: any) => x.username && x.username.includes(element.username)
									&& x.username.length >= element.username.length + 5 && x.username.length <= element.username.length + 7)
								if (checkUsername) {
									if (element.custom_id !== null) {
										element.username = element.username + '_copy' + (checkUsername.length + 1);
										element.custom_id = element.custom_id + '_copy' + (checkUsername.length + 1)
									}
									else {
										element.username = element.username + '_copy' + (checkUsername.length + 1);
									}
								}
							}
							if (element.username === null) {
								let checkCustom_id = element.custom_id && this.data.filter((x: any) => x.custom_id && x.custom_id.includes(element.custom_id)
									&& x.custom_id.length >= element.custom_id.length + 5 && x.custom_id.length <= element.custom_id.length + 7)
								if (checkCustom_id) {
									element.custom_id = element.custom_id + '_copy' + (checkCustom_id.length + 1);
								}
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
					allowFilter: false,
					editInline: true,
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
