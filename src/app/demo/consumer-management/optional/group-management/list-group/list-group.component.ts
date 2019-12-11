import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { TableComponent, ModalService, AggregatorService, KeyConst, TableOption, TableMode, TemplateViewModel, ConfirmViewModel, TableConstant, TableColumnType, ValidationOption, CustomValidationRule } from 'ngx-fw4c';
import { GroupManagementService } from '../group-management.service';
import { GroupRequest, GroupDeleteRequest, GroupViewModel, ConsumerViewModel } from '../../../consumer.model';
import { map } from 'rxjs/operators';
import { ConsumerConstant } from '../../../consumer.const';
import { AddGroupComponent } from '../add-group';

@Component({
	selector: 'app-list-group',
	templateUrl: './list-group.component.html',
	styleUrls: ['./list-group.component.scss']
})
export class ListGroupComponent implements OnInit {

	public option: TableOption;
	public data = [];
	@ViewChild("tableTemplate", { static: true }) public tableTemplate: TableComponent;
	@Input() public item = new ConsumerViewModel();

	constructor(
		private _modalService: ModalService,
		private _groupService: GroupManagementService,
		private _agregatorService: AggregatorService,
	) { }

	ngOnInit() {
		console.log(this.item);
		this.registerEvents()
		this.initTable();
	}

	private initTable() {
		this.option = new TableOption({
			localData: () => {
				var groups = [];
				return this._groupService.search(this.item.id, new GroupRequest({})).pipe(map(s => {
					for (let index = 0; index < s.items.length; index++) {
						let group = new GroupViewModel(s.items[index].id, s.items[index].group, s.items[index].created_at * 1000);
						groups.push(group);
					}
					console.log(groups);
					return groups;
				}));
			},
			inlineEdit: true,
			mode: TableMode.full,
			searchFields: ["name"],
			topButtons: [
				{
					icon: "fa fa-plus",
					customClass: "primary",
					title: () => ConsumerConstant.New,
					executeAsync: item => {
						this._modalService.showTemplateDialog(
							new TemplateViewModel({
								template: AddGroupComponent,
								validationKey: "AddGroupComponent",
								customSize: "modal-lg",
								title: ConsumerConstant.MessageAdd,
								icon: "fa fa-plus",
								btnAcceptTitle: ConsumerConstant.Add,
								acceptCallback: (response, close, provider: AddGroupComponent) => {
									this._groupService.createGroup(this.item.id, item, new GroupRequest({})).subscribe(() => {
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
					icon: "fa fa-trash",
					customClass: "danger",
					executeAsync: consumer => {
						this._modalService.showConfirmDialog(
							new ConfirmViewModel({
								btnAcceptTitle: ConsumerConstant.Delete,
								message: ConsumerConstant.MessageDelete,
								acceptCallback: () => {
									this._groupService.deleteGroup(this.item.id, consumer.id, new GroupDeleteRequest).subscribe(() => {
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
							this._groupService.deleteGroup(this.item.id, select[index].id, new GroupDeleteRequest).subscribe(() => {
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
					title: () => ConsumerConstant.GroupName,
					valueRef: () => "name",
					width: 300,
					allowFilter: true
				},
				{
					type: TableColumnType.DateTime,
					title: () => ConsumerConstant.Created_At,
					valueRef: () => "createdAt",
					// width: 300,
				}
			],
			serviceProvider: {
				searchAsync: (request) => {
					return this._groupService.search(this.item.id, request);
				}
			}
		});
	}

	private registerEvents(): void {
		console.log('abc: ', KeyConst.Search);
		this._agregatorService.subscribe(KeyConst.Search, (response: any) => {
			var filter = response.keyword;
			console.log('xyz: ', response.keyword)
			this.tableTemplate.setFilter('searchText', filter);
			this.tableTemplate.reload(true).subscribe();
		});
	}
}
