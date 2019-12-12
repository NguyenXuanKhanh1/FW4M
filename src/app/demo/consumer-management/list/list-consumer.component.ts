import { Component, ViewChild, OnInit } from "@angular/core";
import {
	TableOption, ModalService, DataService, TemplateViewModel, TableComponent, ConfirmViewModel,
	TableConstant, TableMode, TableColumnType, CustomValidationRule, ValidationOption, AggregatorService, KeyConst
} from "ngx-fw4c";
import { ConsumerManagementService } from "../consumer-management.service";
import { IgxExcelExporterService, IgxExcelExporterOptions } from 'igniteui-angular';
import { ExportConsumerComponent } from '../export/export-consumer.component';
import { ConsumerRequest, ConsumerViewModel, ConsumerKongModel, ConsumerDeleteRequest } from '../consumer.model';
import { map } from 'rxjs/operators';
import { ConsumerConstant } from '../consumer.const';
import { EditConsumerComponent } from '../edit';
import { ImportConsumerComponent } from '../import';
import { ExportFile } from '../../shared/export';
import { ValidateConsumer } from '../../shared/validate';
import { ListGroupComponent } from '../optional/group-management/list-group';
import { OptionalConsumerComponent } from '../optional';
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
		private _validateConsumer: ValidateConsumer,
		private _agregatorService: AggregatorService,
	) { }

	ngOnInit() {
		this.registerEvents()
		this.initTable();
	}

	private initTable() {
		this.option = new TableOption({
			localData: () => {
				var consumers = [];
				return this._consumerService.search(new ConsumerRequest({})).pipe(map(s => {
					for (let index = 0; index < s.items.length; index++) {
						let consumer = new ConsumerViewModel(s.items[index].id, s.items[index].custom_id, s.items[index].tags, s.items[index].username, s.items[index].created_at * 1000);
						consumers.push(consumer);
					}
					return consumers;
				}));
			},
			inlineEdit: true,
			mode: TableMode.full,
			searchFields: ["username", "tags", "customId"],
			topButtons: [
				{
					icon: "fa fa-plus",
					customClass: "primary",
					title: () => ConsumerConstant.New,
					executeAsync: item => {
						this._modalService.showTemplateDialog(
							new TemplateViewModel({
								template: EditConsumerComponent,
								validationKey: "EditConsumerComponent",
								customSize: "modal-lg",
								title: ConsumerConstant.MessageAdd,
								icon: "fa fa-plus",
								btnAcceptTitle: ConsumerConstant.Add,
								acceptCallback: (response, close, provider: EditConsumerComponent) => {
									var consumer = new ConsumerKongModel(provider.item.customId, provider.item.tags, provider.item.username)
									this._consumerService.createConsumer(consumer, new ConsumerRequest({})).subscribe(() => {
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
								title: ConsumerConstant.Export,
								btnAcceptTitle: ConsumerConstant.Export,
								acceptCallback: data => {
									for (let index = 0; index < this.tableTemplate.items.length; index++) {
										const element = this.tableTemplate.items[index];
										element.tags = element.tags ? element.tags.toString() : null;
									}
									if (data === ConsumerConstant.CSV) {
										this._exportFile.exportToCSV(this.tableTemplate.items, 'FW4C')
									}
									if (data === ConsumerConstant.XLSX) {
										this._excelExportService.exportData(this.tableTemplate.items, new IgxExcelExporterOptions("FW4C_export_" + new Date().getTime()));
									}
									if (data === ConsumerConstant.PDF) {
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
					title: () => ConsumerConstant.Download,
					executeAsync: () => {
						var data = [
							{
								custom_id: '',
								username: '',
								tags: ['']
							}
						];
						this._excelExportService.exportData(data, new IgxExcelExporterOptions("template" + new Date().getTime()));
					}
				},
				{
					icon: "fa fa-upload",
					customClass: "success",
					title: () => ConsumerConstant.Import,
					executeAsync: () => {
						this._modalService.showTemplateDialog(new TemplateViewModel({
							template: ImportConsumerComponent,
							validationKey: "ImportConsumerComponent",
							title: ConsumerConstant.MessageImport,
							icon: 'fa fa-download',
							btnAcceptTitle: ConsumerConstant.Import,
							acceptCallback: (response) => {
								for (let index = 0; index < response.length; index++) {
									delete response[index].createdAt
									delete response[index].customId
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
					title: () => ConsumerConstant.Save,
					hide: () => {
						if (this.tableTemplate.changedRows.length > 0) {
							return false;
						}
						else return true;
					},
					executeAsync: () => {
						let editLine = this.tableTemplate.changedRows;
						for (let index = 0; index < editLine.length; index++) {
							const element = editLine[index].currentItem;
							var consumer = new ConsumerKongModel(element.customId, element.tags, element.username)
							this._consumerService.updateConsumer(element.id, consumer, new ConsumerRequest({})).subscribe(() => {
								this.tableTemplate.changedRows = [];
							})
						}
					}
				}
			],
			actions: [
				{
					icon: "fa fa-info",
					customClass: "info",
					executeAsync: consumer => {
						this._modalService.showTemplateDialog(
							new TemplateViewModel({
								template: OptionalConsumerComponent,
								customSize: "modal-lg",
								icon: 'fa fa-info-circle',
								title: ConsumerConstant.OptionalLabel,
								btnAcceptTitle: 'Done' ,
								data: {
									item: this._dataService.cloneItem(consumer)
								},
								cancelCallback: () => {
									this.tableTemplate.reload();
								},
								acceptCallback: () => {
									this.tableTemplate.reload();
								}
							})
						);
					}
				},
				{
					icon: "fa fa-edit",
					customClass: "info",
					executeAsync: consumer => {
						this._modalService.showTemplateDialog(
							new TemplateViewModel({
								validationKey: "EditConsumerComponent",
								template: EditConsumerComponent,
								customSize: "modal-lg",
								title: ConsumerConstant.MessageEdit,
								btnAcceptTitle: ConsumerConstant.Edit,
								data: {
									item: this._dataService.cloneItem(consumer)
								},
								cancelCallback: () => {
									this.tableTemplate.reload();
								},
								acceptCallback: (response, close, provider) => {
									var consumer = new ConsumerKongModel(provider.item.customId, provider.item.tags, provider.item.username);
									this._consumerService.updateConsumer(provider.item.id, consumer, new ConsumerRequest({})).subscribe(() => {
										this.tableTemplate.reload()
									});

								}
							})
						);
					}
				},
				{
					icon: "fa fa-trash",
					customClass: "danger",
					executeAsync: consumer => {
						this._modalService.showConfirmDialog(
							new ConfirmViewModel({
								btnAcceptTitle: ConsumerConstant.Delete,
								message: ConsumerConstant.MessageDelete,
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
					title: () => ConsumerConstant.Remove,
					executeAsync: (item, element, provider: TableComponent) => {
						let select = this.tableTemplate.selectedItems;
						for (let index = 0; index < select.length; index++) {
							this._consumerService.deleteConsumer(select[index].id, new ConsumerDeleteRequest).subscribe(() => {
								if (index == select.length - 1) {
									this.tableTemplate.reload();
								}
							});
						}
					}
				},
				{
					type: TableConstant.ActionType.Toolbar,
					customClass: 'success',
					icon: "fa fa-clone",
					title: () => ConsumerConstant.Copy,
					executeAsync: () => {
						var itemCopy = this._dataService.cloneItems(this.tableTemplate.selectedItems);
						for (let index = 0; index < itemCopy.length; index++) {
							var element = itemCopy[index];
							if (element.username) {
								var checkCopy = this.data.filter(s => s.username && s.username.includes(element.username + '_copy') && s.username.length >= element.username.length + 5 && s.username.length <= element.username.length + 10);
							} else {
								var checkCopy = this.data.filter(s => s.username && s.username.includes('_copy') && s.username.length >= 5 && s.username.length <= 10);
							}
							if (element.username !== null) {
								if (element.customId !== null) {
									element.username = element.username ? element.username + '_copy' + (checkCopy.length + 1) : '_copy' + (checkCopy.length + 1);
									element.customId = element.customId ? element.customId + '_copy' + (checkCopy.length + 1) : '_copy' + (checkCopy.length + 1);
								}
								else if (element.customId === null) {
									element.username = element.username ? element.username + '_copy' + (checkCopy.length + 1) : '_copy' + (checkCopy.length + 1);
								}
							}
							if (element.customId !== null) {
								if (element.username === null) {
									element.customId = element.customId ? element.customId + '_copy' + (checkCopy.length + 1) : '_copy' + (checkCopy.length + 1);
								}
							}
							var currentItem = new ConsumerKongModel();
							currentItem.username = element.username;
							currentItem.tags = element.tags;
							currentItem.custom_id = element.customId;
							this.data.push(element);
							this._consumerService.createConsumer(currentItem, new ConsumerRequest({})).subscribe(res => {
								if (index == itemCopy.length - 1) {
									this.tableTemplate.reload();
								}
							});
						}
					}
				}
			],
			mainColumns: [
				{
					type: TableColumnType.String,
					title: () => ConsumerConstant.UserName,
					valueRef: () => "username",
					allowFilter: true,
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
					title: () => ConsumerConstant.Custom_Id,
					valueRef: () => "customId",
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
					width: 200,
					title: () => ConsumerConstant.Tags,
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
					width: 200,
					title: () => ConsumerConstant.Created_At,
					valueRef: () => "createdAt",
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

	private registerEvents(): void {
		this._agregatorService.subscribe(KeyConst.Search, (response: any) => {
			var filter = response.keyword;
			this.tableTemplate.setFilter('searchText', filter);
			this.tableTemplate.reload(true).subscribe();
		});

		this._agregatorService.subscribe(KeyConst.KeywordChanged, (response: any) => {
			var filter = response.keyword;
			this.tableTemplate.setFilter('searchText', filter);
			this.tableTemplate.reload(true).subscribe();

		});
	}
}
