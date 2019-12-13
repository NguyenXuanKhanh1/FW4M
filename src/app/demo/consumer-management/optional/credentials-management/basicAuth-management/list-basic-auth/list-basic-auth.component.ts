import { Component, OnInit, ViewChild, TemplateRef, Input } from '@angular/core';
import { TableComponent, TableOption, ModalService, DataService, TableMode, TemplateViewModel, ConfirmViewModel, TableConstant, TableColumnType, AggregatorService, KeyConst } from 'ngx-fw4c';
import { BasicAuthRequest, BasicAuthViewModel, BasicAuthKongModel, BasicAuthDeleteRequest, BasicAuthSearchRequest } from '../basicAuth.model';
import { map } from 'rxjs/operators';
import { ConsumerConstant } from 'src/app/demo/consumer-management/consumer.const';
import { ConsumerViewModel } from 'src/app/demo/consumer-management/consumer.model';
import { BasicAuthManagementService } from '../basic-auth-management.service';
import { EditBasicAuthComponent } from '../edit-basic-auth';

@Component({
	selector: 'app-list-basic-auth',
	templateUrl: './list-basic-auth.component.html',
	styleUrls: ['./list-basic-auth.component.scss']
})
export class ListBasicAuthComponent implements OnInit {

	@ViewChild("tableTemplate", { static: true }) public tableTemplate: TableComponent;
	@ViewChild("detailTemplate", { static: true }) public datailTemplate: TemplateRef<any>;
	@Input() public consumerViewModel = new ConsumerViewModel();

	public option: TableOption;
	public data = [];

	constructor(
		private _modalService: ModalService,
		private _dataService: DataService,
		private _basicAuthService: BasicAuthManagementService,
		private _agregatorService: AggregatorService,
	) { }

	ngOnInit() {
		this.initTable();
	}

	private initTable() {
		this.option = new TableOption({
			localData: () => {
				var consumers = [];
				return this._basicAuthService.search(this.consumerViewModel.id, new BasicAuthSearchRequest({})).pipe(map(s => {
					for (let index = 0; index < s.items.length; index++) {
						let consumer = new BasicAuthViewModel(s.items[index].id, s.items[index].tags, s.items[index].username, s.items[index].password, s.items[index].created_at * 1000);
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
					executeAsync: (consumerViewModel) => {
						this._modalService.showTemplateDialog(
							new TemplateViewModel({
								template: EditBasicAuthComponent,
								validationKey: "EditBasicAuthComponent",
								customSize: "modal-lg",
								title: ConsumerConstant.MessageAddBasicAuth,
								icon: "fa fa-plus",
								data: {
									consumerViewModel: this.consumerViewModel
								},
								btnAcceptTitle: ConsumerConstant.Add,
								acceptCallback: (response, close, provider: EditBasicAuthComponent) => {
									var basicAuth = new BasicAuthKongModel(provider.item.username, provider.item.password, provider.item.tags)
									this._basicAuthService.createBasicAuth(this.consumerViewModel.id, basicAuth, new BasicAuthRequest({})).subscribe(() => {
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
							var basicAuth = new BasicAuthKongModel(element.username, element.password, element.tags)
							this._basicAuthService.updateBasicAuth(this.consumerViewModel.id, element.id, basicAuth, new BasicAuthRequest({})).subscribe(() => {
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
								validationKey: "EditBasicAuthComponent",
								template: EditBasicAuthComponent,
								customSize: "modal-lg",
								title: ConsumerConstant.MessageEdit,
								btnAcceptTitle: ConsumerConstant.Edit,
								data: {
									item: this._dataService.cloneItem(basicAuth)
								},
								cancelCallback: () => {
									this.tableTemplate.reload();
								},
								acceptCallback: (response, close, provider: EditBasicAuthComponent) => {
									var basicAuth = new BasicAuthKongModel(provider.item.username, provider.item.password, provider.item.tags)
									this._basicAuthService.createBasicAuth(this.consumerViewModel.id, basicAuth, new BasicAuthRequest({})).subscribe(() => {
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
									this._basicAuthService.deleteBasicAuth(this.consumerViewModel.id, basicAuth.id, new BasicAuthDeleteRequest).subscribe(() => {
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
							this._basicAuthService.deleteBasicAuth(this.consumerViewModel.id, select[index].id, new BasicAuthDeleteRequest).subscribe(() => {
								if (index == select.length - 1) {
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
					title: () => ConsumerConstant.Password,
					valueRef: () => "password",
					allowFilter: true,
					editInline: true
				},
				{
					type: TableColumnType.String,
					title: () => ConsumerConstant.Tags,
					valueRef: () => "tags",
					allowFilter: true,
				},
				{
					type: TableColumnType.Date,
					title: () => ConsumerConstant.Created_At,
					valueRef: () => "createdAt",
					allowFilter: true
				}
			],
			serviceProvider: {
				searchAsync: (request) => {
					return this._basicAuthService.search(this.consumerViewModel.id, request);
				}
			}
		});
	}
}
