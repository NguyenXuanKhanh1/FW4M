import { Component, OnInit, ViewChild, TemplateRef, Input } from '@angular/core';
import { TableComponent, TableOption, ModalService, DataService, TableMode, TemplateViewModel, ConfirmViewModel, TableColumnType } from 'ngx-fw4c';
import { ConsumerManagementService } from 'src/app/demo/consumer-management/consumer-management.service';
import { BasicAuthDeleteRequest } from '../../basicAuth-management/basicAuth.model';
import { map } from 'rxjs/operators';
import { ConsumerConstant } from 'src/app/demo/consumer-management/consumer.const';
import { ConsumerViewModel } from 'src/app/demo/consumer-management/consumer.model';
import { ApiKeyManagementService } from '../api-key-management.service';
import { ApiKeySearchRequest, ApiKeyViewModel, ApiKeyKongModel, ApiKeyRequest } from '../apiKey.model';
import { EditApiKeyComponent } from '../edit-api-key';

@Component({
	selector: 'app-list-api-key',
	templateUrl: './list-api-key.component.html',
	styleUrls: ['./list-api-key.component.scss']
})
export class ListApiKeyComponent implements OnInit {

	@ViewChild("tableTemplate", { static: true }) public tableTemplate: TableComponent;
	@ViewChild("detailTemplate", { static: true }) public datailTemplate: TemplateRef<any>;

	@Input() public consumerViewModel = new ConsumerViewModel();

	public option: TableOption;
	public data = [];

	constructor(
		private _modalService: ModalService,
		private _dataService: DataService,
		private _apiKeyService: ApiKeyManagementService,
		private _consumerService: ConsumerManagementService,
	) { }

	ngOnInit() {
		this.initTable();
	}

	private initTable() {
		this.option = new TableOption({
			localData: () => {
				var consumers = [];
				return this._apiKeyService.search(this.consumerViewModel.id, new ApiKeySearchRequest({})).pipe(map(s => {
					for (let index = 0; index < s.items.length; index++) {
						let consumer = new ApiKeyViewModel(s.items[index].id, s.items[index].tags, s.items[index].key, s.items[index].created_at * 1000);
						consumers.push(consumer);
					}
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
					executeAsync: (consumerViewModel) => {
						this._modalService.showTemplateDialog(
							new TemplateViewModel({
								template: EditApiKeyComponent,
								validationKey: "EditApiKeyComponent",
								customSize: "modal-lg",
								title: ConsumerConstant.MessageAddApiKey,
								icon: "fa fa-plus",
								data: {
									consumerViewModel: this.consumerViewModel
								},
								btnAcceptTitle: ConsumerConstant.Add,
								acceptCallback: (response, close, provider: EditApiKeyComponent) => {
									var apiKey = new ApiKeyKongModel(provider.item.key, provider.item.tags)
									this._apiKeyService.createApiKey(this.consumerViewModel.id, apiKey, new ApiKeyRequest({})).subscribe(() => {
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
									this._apiKeyService.updateApiKey(this.consumerViewModel.id, provider.item.id, apiKey, new ApiKeyRequest({})).subscribe(() => {
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
									this._apiKeyService.deleteApiKey(this.consumerViewModel.id, apiKey.id, new BasicAuthDeleteRequest).subscribe(() => {
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
					title: () => ConsumerConstant.Key,
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
					type: TableColumnType.Date,
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