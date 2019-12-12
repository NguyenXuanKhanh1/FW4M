import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { TableComponent, TableOption, ModalService, DataService, TableMode, TemplateViewModel, ConfirmViewModel, TableConstant, TableColumnType } from 'ngx-fw4c';
import { CredentialManagementService } from '../../credential-management.service';
import { ConsumerManagementService } from '../../../consumer-management.service';
import { BasicAuthRequest, BasicAuthViewModel, BasicAuthKongModel, BasicAuthDeleteRequest } from '../../../basic-auth.model';
import { map } from 'rxjs/operators';
import { ConsumerConstant } from '../../../consumer.const';
import { EditCredentialComponent } from '../../edit';
import { ConsumerKongModel, ConsumerRequest, ConsumerDeleteRequest } from '../../../consumer.model';
import { ApiKeySearchRequest, ApiKeyViewModel, ApiKeyKongModel, ApiKeyRequest } from '../../../api-key.model';
import { EditApiKeyComponent } from '../edit-api-key/edit-api-key.component';

@Component({
  selector: 'app-api-key-management',
  templateUrl: './api-key-management.component.html',
  styleUrls: ['./api-key-management.component.scss']
})
export class ApiKeyManagementComponent implements OnInit {

	@ViewChild("tableTemplate", { static: true }) public tableTemplate: TableComponent;
	@ViewChild("detailTemplate", { static: true }) public datailTemplate: TemplateRef<any>;

	public option: TableOption;
	public data = [];
	public id = 'c098faac-ee27-4ab1-a309-8169b69736c9';

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
				return this._credentialService.searchApiKey(new ApiKeySearchRequest({})).pipe(map(s => {
					for (let index = 0; index < s.items.length; index++) {
						let consumer = new ApiKeyViewModel(s.items[index].id, s.items[index].tags, s.items[index].key, s.items[index].created_at * 1000);
						consumers.push(consumer);
					}
					console.log(consumers)
					return consumers;
				}));
			},
			inlineEdit: true,
			mode: TableMode.full,
			searchFields: ["key", "tags"],
			topButtons: [
				{
					icon: "fa fa-plus",
					customClass: "primary",
					title: () => ConsumerConstant.New,
					executeAsync: () => {
						this._modalService.showTemplateDialog(
							new TemplateViewModel({
								template: EditApiKeyComponent,
								validationKey: "EditApiKeyComponent",
								customSize: "modal-lg",
								title: ConsumerConstant.MessageAdd,
								icon: "fa fa-plus",
								btnAcceptTitle: ConsumerConstant.Add,
								acceptCallback: (response, close, provider: EditApiKeyComponent) => {
									var apiKey = new ApiKeyKongModel(provider.item.key, provider.item.tags)
									this._credentialService.createBasicAuth(apiKey, new ApiKeyRequest({})).subscribe(() => {
										this.tableTemplate.reload();
									});
								}
							})
						);
					}
				}
			],
			actions: [
				{
					icon: "fa fa-edit",
					customClass: "info",
					executeAsync: apiKey => {
						this._modalService.showTemplateDialog(
							new TemplateViewModel({
								validationKey: "EditApiKeyComponent",
								template: EditApiKeyComponent,
								customSize: "modal-lg",
								title: ConsumerConstant.MessageEdit,
								btnAcceptTitle: ConsumerConstant.Edit,
								data: {
									item: this._dataService.cloneItem(apiKey)									
								},
								cancelCallback: () => {
									this.tableTemplate.reload();
								},							

								acceptCallback: (response, close, provider: EditApiKeyComponent) => {
									var apiKey = new ApiKeyKongModel(provider.item.key, provider.item.tags)
									this._credentialService.updateApiKey(provider.item.id , apiKey, new ApiKeyRequest({})).subscribe(() => {
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
					executeAsync: apiKey => {
						this._modalService.showConfirmDialog(
							new ConfirmViewModel({
								btnAcceptTitle: ConsumerConstant.Delete,
								message: ConsumerConstant.MessageDelete,
								acceptCallback: () => {
									this._credentialService.deleteApiKey(apiKey.id, new BasicAuthDeleteRequest).subscribe(() => {
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
					title: () => ConsumerConstant.UserName,
					valueRef: () => "key",
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

