import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { TableOption, TableComponent, ModalService, DataService, TableMode, TemplateViewModel, ConfirmViewModel, TableConstant, TableColumnType } from 'ngx-fw4c';
import { ConsumerManagementService } from '../../consumer-management.service';
import { ConsumerRequest, ConsumerKongModel, ConsumerDeleteRequest } from '../../consumer.model';
import { map } from 'rxjs/operators';
import { ConsumerConstant } from '../../consumer.const';
import { BasicAuthRequest, BasicAuthViewModel, BasicAuthKongModel, BasicAuthDeleteRequest } from '../../basic-auth.model';
import { CredentialManagementService } from '../credential-management.service';
import { EditCredentialComponent } from '../edit';

@Component({
	selector: 'app-credential',
	templateUrl: './credential.component.html',
	styleUrls: ['./credential.component.scss']
})
export class CredentialComponent implements OnInit {

	@ViewChild("tableTemplate", { static: true }) public tableTemplate: TableComponent;
	@ViewChild("detailTemplate", { static: true }) public datailTemplate: TemplateRef<any>;

	public option: TableOption;
	public data = [];
	public id = '4ce5ba52-782d-4563-8c88-11bed2184679';

	constructor(
		private _modalService: ModalService,
		private _dataService: DataService,
		private _credentialService: CredentialManagementService,
		private _consumerService: ConsumerManagementService,
	) { }

	ngOnInit() {
		this.initTable();
	}

	private initTable() {
		this.option = new TableOption({
			localData: () => {
				var consumers = [];
				return this._credentialService.search(new BasicAuthRequest({})).pipe(map(s => {
					for (let index = 0; index < s.items.length; index++) {
						let consumer = new BasicAuthViewModel(s.items[index].id, s.items[index].tags, s.items[index].username, s.items[index].password, s.items[index].created_at * 1000);
						consumers.push(consumer);
					}
					console.log(consumers)
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
					executeAsync: () => {
						this._modalService.showTemplateDialog(
							new TemplateViewModel({
								template: EditCredentialComponent,
								validationKey: "EditCredentialComponent",
								customSize: "modal-lg",
								title: ConsumerConstant.MessageAdd,
								icon: "fa fa-plus",
								btnAcceptTitle: ConsumerConstant.Add,
								acceptCallback: (response, close, provider: EditCredentialComponent) => {
									var basicAuth = new BasicAuthKongModel(provider.item.username, provider.item.password, provider.item.tags)
									this._credentialService.createBasicAuth(basicAuth, new BasicAuthRequest({})).subscribe(() => {
										this.tableTemplate.reload();
									});
								}
							})
						);
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
							var consumer = new ConsumerKongModel(element.customId, element.tags, element.username);
							this._consumerService.updateConsumer(element.id, consumer, new ConsumerRequest({})).subscribe(() => {
								this.tableTemplate.resetChanges();
							})
						}
					}
				}
			],
			actions: [
				{
					icon: "fa fa-edit",
					customClass: "info",
					executeAsync: basicAuth => {
						this._modalService.showTemplateDialog(
							new TemplateViewModel({
								validationKey: "EditCredentialComponent",
								template: EditCredentialComponent,
								customSize: "modal-lg",
								title: ConsumerConstant.MessageEdit,
								btnAcceptTitle: ConsumerConstant.Edit,
								data: {
									item: this._dataService.cloneItem(basicAuth)									
								},
								cancelCallback: () => {
									this.tableTemplate.reload();
								},							

								acceptCallback: (response, close, provider: EditCredentialComponent) => {
									var basicAuth = new BasicAuthKongModel(provider.item.username, provider.item.password, provider.item.tags)
									this._credentialService.createBasicAuth(basicAuth, new BasicAuthRequest({})).subscribe(() => {
										this.tableTemplate.reload();
									});
								}
							})
						);
					}
				},
				{
					icon: "fa fa-trash",
					customClass: "danger",
					executeAsync: basicAuth => {
						this._modalService.showConfirmDialog(
							new ConfirmViewModel({
								btnAcceptTitle: ConsumerConstant.Delete,
								message: ConsumerConstant.MessageDelete,
								acceptCallback: () => {
									this._credentialService.deleteBasicAuth(basicAuth.id, new BasicAuthDeleteRequest).subscribe(() => {
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
					executeAsync: () => {
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
							this._consumerService.createConsumer(currentItem, new ConsumerRequest({})).subscribe(() => {
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
					editInline: true
				},
				{
					type: TableColumnType.String,
					title: () => ConsumerConstant.UserName,
					valueRef: () => "password",
					allowFilter: true,
					editInline: true
				},
				{
					type: TableColumnType.String,
					width: 200,
					title: () => ConsumerConstant.Tags,
					valueRef: () => "tags",
					allowFilter: true,
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
}
