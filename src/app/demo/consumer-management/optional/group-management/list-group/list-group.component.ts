import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { TableComponent, ModalService, AggregatorService, KeyConst, TableOption, TableMode, TemplateViewModel, ConfirmViewModel, TableConstant, TableColumnType, ValidationOption, CustomValidationRule, ListComponent } from 'ngx-fw4c';
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
	@Input() public consumerViewModel = new ConsumerViewModel();

	constructor(
		private _modalService: ModalService,
		private _groupService: GroupManagementService,
		private _agregatorService: AggregatorService,
	) { }

	ngOnInit() {
		this.initTable();
	}

	private initTable() {
		this.option = new TableOption({
			localData: () => {
				var groups = [];
				return this._groupService.search(this.consumerViewModel.id, new GroupRequest({})).pipe(map(s => {
					for (let index = 0; index < s.items.length; index++) {
						let group = new GroupViewModel(s.items[index].id, s.items[index].group, s.items[index].created_at * 1000);
						groups.push(group);
					}
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
								validationKey: 'AddGroupComponent',
								customSize: "modal-lg",
								title: ConsumerConstant.MessageAddGroup,
								icon: "fa fa-plus",
								data: {
									item: this.consumerViewModel
								},
								btnAcceptTitle: ConsumerConstant.Add,
								acceptCallback: (response, close, provider: AddGroupComponent) => {
									this._groupService.createGroup(this.consumerViewModel.id, provider.groupViewModel, new GroupRequest({})).subscribe(() => {
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
								message: ConsumerConstant.MessageDeleteGroup,
								acceptCallback: () => {
									this._groupService.deleteGroup(this.consumerViewModel.id, consumer.id, new GroupDeleteRequest).subscribe(() => {
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
							this._groupService.deleteGroup(this.consumerViewModel.id, select[index].id, new GroupDeleteRequest).subscribe(() => {
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
					valueRef: () => "group",
					width: 300,
					allowFilter: true
				},
				{
					type: TableColumnType.DateTime,
					title: () => ConsumerConstant.Created_At,
					valueRef: () => "createdAt",
				}
			],
			serviceProvider: {
				searchAsync: (request) => {
					return this._groupService.search(this.consumerViewModel.id, request);
				}
			}
		});
	}
}
