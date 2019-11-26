import {
	Component,
	ViewChild,
	ElementRef,
	AfterViewInit,
	OnInit,
	Input,
	TemplateRef
} from "@angular/core";
import {
	ValidationService,
	ValidationOption,
	ClientValidator,
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
					created_at_2: res.items[index].created_at_2
				});
			}
			this.tableTemplate.reload();
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
								icon: "fa fa-plus",
								btnAcceptTitle: "Add",
								data: {
									reload: () => {
										this.tableTemplate.reload().subscribe();
									}
								},
								acceptCallback: (
									response,
									close,
									provider: AddConsumerComponent
								) => {
									item = provider.item;
									this._addConsumerService
										.createConsumer(item)
										.subscribe(() => {
											this.getData();
										});
								}
							})
						);
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
							acceptCallback: (response, close, provider: ImportConsumerComponent) => {
								
							}
						}));
					}
				}
			],
			actions: [
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
					executeAsync: () => {
						console.log(this.tableTemplate.selectedItems);
						let select = this.tableTemplate.selectedItems;
						for (let index = 0; index < select.length; index++) {
							this._consumerManagementService.deleteConsumer(select[index].id).subscribe();
							this.data.splice(this.data.indexOf(select[index]), 1)
						}
						console.log(this.data);
						this.tableTemplate.reload();

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
