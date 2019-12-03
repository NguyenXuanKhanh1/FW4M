import { Component, ViewChild, OnInit } from "@angular/core";
import { TableOption, ModalService, DataService, TemplateViewModel, TableComponent, ConfirmViewModel, TableConstant, TableMode, TableColumnType, ValidationOption, CustomValidationRule } from "ngx-fw4c";
import { ConsumerManagementService } from "../consumer-management.service";
import { EditConsumerComponent } from "../edit/edit-consumer.component";
import { ConsumerViewModel, ConsumerDeleteRequest } from '../consumer.model';
import { ImportConsumerComponent } from '../import/import-consumer.component';
import { IgxExcelExporterService, IgxExcelExporterOptions } from 'igniteui-angular';
import { ExportConsumerComponent } from '../export/export-consumer.component';
import { ConsumerRequest } from '../consumer.model';
import { map } from 'rxjs/operators';
import { ExportFile } from '../../shared/export';
import { ValidateConsumer } from '../../shared/validate';
@Component({
	selector: "app-consumer-management",
	templateUrl: "./list-consumer.component.html",
	styleUrls: ["./list-consumer.component.scss"]
})

export class ListConsumerComponent implements OnInit {
	public option: TableOption;
	public data = [];
	@ViewChild("tableTemplate", { static: true }) public tableTemplate: TableComponent;

	constructor(
		private _modalService: ModalService,
		private _dataService: DataService,
		private _consumerService: ConsumerManagementService,
		private _excelExportService: IgxExcelExporterService,
		private _exportFile: ExportFile,
		private _validateConsumer: ValidateConsumer
	) { }

	ngOnInit() {
		this.initTable();
	}

	private initTable() {
		this.option = new TableOption({
			localData: () => {
				return this._consumerService.search(new ConsumerRequest({})).pipe(map(s => s.items));
			},
			inlineEdit: true,
			mode: TableMode.full,
			searchFields: ["username", "tags", "custom_id"],
			topButtons: [
				{
					icon: "fa fa-refresh",
					customClass: "primary",
					title: () => "Reload",
					executeAsync: () => {
						this.tableTemplate.reload();
					}
				},
				{
					icon: "fa fa-plus",
					customClass: "primary",
					title: () => "New",
					executeAsync: item => {
						this._modalService.showTemplateDialog(
							new TemplateViewModel({
								template: EditConsumerComponent,
								validationKey: "EditConsumerComponent",
								customSize: "modal-lg",
								title: "Add New Consumer",
								icon: "fa fa-plus",
								btnAcceptTitle: "Add",
								acceptCallback: (response, close, provider: EditConsumerComponent) => {
									item = provider.item;
									this._consumerService.createConsumer(item, new ConsumerRequest({})).subscribe(() => {
										this.tableTemplate.reload();
									});
								}
							})
						);
					}
				},
				{
					icon: "fa fa-print",
					customClass: "success",
					title: () => "Export",
					executeAsync: () => {
						this._modalService.showTemplateDialog(
							new TemplateViewModel({
								template: ExportConsumerComponent,
								validationKey: "ExportConsumerComponent",
								title: "Export",
								btnAcceptTitle: "Export",
								acceptCallback: data => {
									for (let index = 0; index < this.tableTemplate.items.length; index++) {
										const element = this.tableTemplate.items[index];
										element.tags = element.tags ? element.tags.toString() : null;
										delete element.created_at_2
									}
									if (data === 'CSV') {
										this._exportFile.exportToCSV(this.tableTemplate.items, 'FW4C')
									}
									if (data === 'Excel') {
										this.tableTemplate.exportToExcel("FW4C_export_" + new Date().getTime());
									}
									if (data === 'PDF') {
										this._exportFile.exportToPdf(this.tableTemplate.items, "FW4C_export_" + new Date().getTime());
									}
								}
							})
						);
					}
				},
				{
					icon: 'fa fa-download',
					customClass: 'info',
					title: () => 'Download',
					executeAsync: () => {
						var data = [
							{
								custom_id: this.option.mainColumns,
								id: '',
								username: '',
								tags: '',
								created_at: ''
							}
						];
						this._excelExportService.exportData(data, new IgxExcelExporterOptions("template" + new Date().getTime()));
					}
				},
				{
					icon: "fa fa-download",
					customClass: "success",
					title: () => "Import",
					executeAsync: () => {
						this._modalService.showTemplateDialog(new TemplateViewModel({
							template: ImportConsumerComponent,
							validationKey: "ImportConsumerComponent",
							title: "Import Consumer",
							icon: 'fa fa-download',
							data: {
								reload: () => {
									this.tableTemplate.reload().subscribe();
								}
							},
							acceptCallback: (response) => {
								for (let index = 0; index < response.length; index++) {
									delete response[index].id;
									delete response[index].created_at;
									if (response[index].tags !== undefined) {
										let tags = response[index].tags.split(',');
										delete response[index].tags;
										response[index].tags = tags;
									}
									this._consumerService.createConsumer(response[index], new ConsumerRequest({})).subscribe(() => {
										this.tableTemplate.reload();
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
					executeAsync: () => {
						let editLine = this.tableTemplate.changedRows;
						for (let index = 0; index < editLine.length; index++) {
							const element = editLine[index];
							delete element.currentItem.created_at_2;
							this._consumerService.updateConsumer(element.currentItem.id, element.currentItem, new ConsumerRequest).subscribe(() => {
								this.tableTemplate.changedRows = [];
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
								message: "Are you sure to copy this consumer?",
								acceptCallback: () => {
									this.tableTemplate.copy(consumer, true, (cloneItem: ConsumerViewModel) => {
										delete cloneItem.createdAtText;
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
											let checkCustom_id = cloneItem.custom_id && this.data.filter((x: any) => x.customId && x.customId.includes(cloneItem.custom_id)
												&& x.customId.length >= cloneItem.custom_id.length + 6 && x.customId.length <= cloneItem.custom_id.length + 10)
											if (checkCustom_id) {
												cloneItem.custom_id = cloneItem.custom_id + '_copy' + (checkCustom_id.length + 1);
											}
										}
										this._consumerService.createConsumer(cloneItem, new ConsumerRequest({})).subscribe(() => {
											this.tableTemplate.reload();
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
								data: {
									reload: () => {
										this.tableTemplate.reload().subscribe();
									},
									item: this._dataService.cloneItem(consumer)
								},
								cancelCallback: () => {
									this.tableTemplate.reload();
								},
								acceptCallback: (response, close, provider) => {
									this._consumerService.updateConsumer(provider.item.id, provider.item, new ConsumerRequest).subscribe(() => {
										this.tableTemplate.reload()
									});

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
								message: "Are you sure to delete this consumer?",
								acceptCallback: () => {
									this._consumerService.deleteConsumer(consumer.id, new ConsumerDeleteRequest).subscribe(() => {
										this.tableTemplate.reload();
									});
								}
							})
						);
					}
				},
				{
					type: TableConstant.ActionType.Toolbar,
					customClass: 'danger',
					lazyload: true,
					icon: "fa fa-trash-o",
					title: () => "Remove",
					executeAsync: () => {
						let select = this.tableTemplate.selectedItems;
						for (let index = 0; index < select.length; index++) {
							this._consumerService.deleteConsumer(select[index].id, new ConsumerDeleteRequest).subscribe(() => { });
						}
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
							delete element.createdAtText;
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
							this._consumerService.createConsumer(element, new ConsumerRequest({})).subscribe(() => {
								this.tableTemplate.reload();
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
					validationOption: new ValidationOption({
						rules: [
							new CustomValidationRule(value => {
								return this._validateConsumer.validateString(value);
							})
						]
					})
				},
				{
					type: TableColumnType.String,
					title: () => "Custom_ID",
					valueRef: () => "custom_id",
					allowFilter: true,
					validationOption: new ValidationOption({
						rules: [
							new CustomValidationRule(value => {
								return this._validateConsumer.validateString(value);
							})
						]
					})
				},
				{
					type: TableColumnType.String,
					title: () => "Tags",
					valueRef: () => "tags",
					allowFilter: true,
					validationOption: new ValidationOption({
						rules: [
							new CustomValidationRule(value => {
								return this._validateConsumer.validateTags(value);
							})
						]
					})
				},
				{
					type: TableColumnType.DateTime,
					title: () => "Created",
					valueRef: () => "createdAtText",
					allowFilter: true
				}
			],
			serviceProvider: {
				searchAsync: (request) => {
					return this._consumerService.search(request);
				}
			}
		});
	}
}
