import { Component, OnInit, ViewChild, TemplateRef, Input } from '@angular/core';
import { TableComponent, TableOption, ModalService, DataService, TableMode, TemplateViewModel, ConfirmViewModel, TableConstant, TableColumnType } from 'ngx-fw4c';
import { ConsumerManagementService } from 'src/app/demo/consumer-management/consumer-management.service';
import { BasicAuthRequest, BasicAuthViewModel, BasicAuthKongModel, BasicAuthDeleteRequest, BasicAuthSearchRequest } from '../basicAuth.model';
import { map } from 'rxjs/operators';
import { ConsumerConstant } from 'src/app/demo/consumer-management/consumer.const';
import { ConsumerDeleteRequest, ConsumerKongModel, ConsumerRequest, ConsumerViewModel } from 'src/app/demo/consumer-management/consumer.model';
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
    private _consumerService: ConsumerManagementService,
    private _basicAuthService: BasicAuthManagementService,
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
								template: EditBasicAuthComponent,
								validationKey: "EditBasicAuthComponent",
								customSize: "modal-lg",
								title: ConsumerConstant.MessageAdd,
								icon: "fa fa-plus",
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
					return this._consumerService.search(request);
				}
			}
		});
	}
}
