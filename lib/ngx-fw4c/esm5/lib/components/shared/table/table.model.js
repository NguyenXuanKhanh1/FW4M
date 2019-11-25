/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
export function TableEditInline() { }
if (false) {
    /** @type {?|undefined} */
    TableEditInline.prototype.enabled;
    /** @type {?|undefined} */
    TableEditInline.prototype.autoCommit;
    /** @type {?|undefined} */
    TableEditInline.prototype.createAsync;
    /** @type {?|undefined} */
    TableEditInline.prototype.updateAsync;
}
/**
 * @record
 */
export function TableCell() { }
if (false) {
    /** @type {?|undefined} */
    TableCell.prototype.item;
    /** @type {?|undefined} */
    TableCell.prototype.column;
}
var TableColumn = /** @class */ (function () {
    function TableColumn(init) {
        Object.assign(this, init);
    }
    return TableColumn;
}());
export { TableColumn };
if (false) {
    /** @type {?} */
    TableColumn.prototype.title;
    /** @type {?} */
    TableColumn.prototype.valueRef;
    /** @type {?} */
    TableColumn.prototype.direction;
    /** @type {?} */
    TableColumn.prototype.allowSort;
    /** @type {?} */
    TableColumn.prototype.allowFilter;
    /** @type {?} */
    TableColumn.prototype.order;
    /** @type {?} */
    TableColumn.prototype.customClass;
    /** @type {?} */
    TableColumn.prototype.defaultSorter;
    /** @type {?} */
    TableColumn.prototype.width;
    /** @type {?} */
    TableColumn.prototype.textAlign;
    /** @type {?} */
    TableColumn.prototype.type;
    /** @type {?} */
    TableColumn.prototype.showTooltip;
    /** @type {?} */
    TableColumn.prototype.editInline;
    /** @type {?} */
    TableColumn.prototype.callback;
    /** @type {?} */
    TableColumn.prototype.customTemplate;
    /** @type {?} */
    TableColumn.prototype.hide;
    /** @type {?} */
    TableColumn.prototype.dropdownConfiguration;
    /** @type {?} */
    TableColumn.prototype.id;
    /** @type {?} */
    TableColumn.prototype.filterTemplate;
}
var TableSorter = /** @class */ (function () {
    function TableSorter() {
    }
    return TableSorter;
}());
export { TableSorter };
if (false) {
    /** @type {?} */
    TableSorter.prototype.direction;
    /** @type {?} */
    TableSorter.prototype.orderBy;
    /** @type {?} */
    TableSorter.prototype.order;
}
var TableAction = /** @class */ (function () {
    function TableAction(init) {
        this.type = TableConstant.ActionType.Inline;
        Object.assign(this, init);
    }
    return TableAction;
}());
export { TableAction };
if (false) {
    /** @type {?} */
    TableAction.prototype.id;
    /** @type {?} */
    TableAction.prototype.title;
    /** @type {?} */
    TableAction.prototype.tooltip;
    /** @type {?} */
    TableAction.prototype.icon;
    /** @type {?} */
    TableAction.prototype.type;
    /** @type {?} */
    TableAction.prototype.customClass;
    /** @type {?} */
    TableAction.prototype.executeAsync;
    /** @type {?} */
    TableAction.prototype.disabled;
    /** @type {?} */
    TableAction.prototype.hide;
    /** @type {?} */
    TableAction.prototype.lazyload;
}
/**
 * @record
 */
export function TableRequest() { }
if (false) {
    /** @type {?|undefined} */
    TableRequest.prototype.searchText;
    /** @type {?|undefined} */
    TableRequest.prototype.pageSize;
    /** @type {?|undefined} */
    TableRequest.prototype.pageIndex;
    /** @type {?|undefined} */
    TableRequest.prototype.sorters;
    /** @type {?|undefined} */
    TableRequest.prototype.data;
}
var TableText = /** @class */ (function () {
    function TableText() {
        this.placeholderSearch = TableConstant.DisplayText.PlaceholderSearch;
        this.btnSearch = TableConstant.DisplayText.BtnSearch;
        this.btnReset = TableConstant.DisplayText.BtnReset;
        this.action = TableConstant.DisplayText.Action;
        this.selectPageSize = TableConstant.DisplayText.SelectPageSize;
        this.deleteTitle = TableConstant.DisplayText.DeleteTitle;
        this.btnAcceptTitle = TableConstant.DisplayText.BtnAcceptTitle;
        this.btnCancelTitle = TableConstant.DisplayText.BtnCancelTitle;
        this.filterTitle = TableConstant.DisplayText.FilterTitle;
        this.applyFilter = TableConstant.DisplayText.ApplyFilter;
        this.detailTitle = TableConstant.DisplayText.DetailTitle;
        this.pageTitle = TableConstant.DisplayText.PageTitle;
        this.advancedSearchTitle = TableConstant.DisplayText.AdvancedSearchTitle;
        this.advancedBtnTitle = TableConstant.DisplayText.AdvancedBtnTitle;
        this.advancedBtnCancelTitle = TableConstant.DisplayText.AdvancedBtnCancelTitle;
        this.allTitle = TableConstant.DisplayText.AllTitle;
    }
    return TableText;
}());
export { TableText };
if (false) {
    /** @type {?} */
    TableText.prototype.placeholderSearch;
    /** @type {?} */
    TableText.prototype.btnSearch;
    /** @type {?} */
    TableText.prototype.btnReset;
    /** @type {?} */
    TableText.prototype.action;
    /** @type {?} */
    TableText.prototype.selectPageSize;
    /** @type {?} */
    TableText.prototype.deleteTitle;
    /** @type {?} */
    TableText.prototype.btnAcceptTitle;
    /** @type {?} */
    TableText.prototype.btnCancelTitle;
    /** @type {?} */
    TableText.prototype.filterTitle;
    /** @type {?} */
    TableText.prototype.applyFilter;
    /** @type {?} */
    TableText.prototype.detailTitle;
    /** @type {?} */
    TableText.prototype.pageTitle;
    /** @type {?} */
    TableText.prototype.advancedSearchTitle;
    /** @type {?} */
    TableText.prototype.advancedBtnTitle;
    /** @type {?} */
    TableText.prototype.advancedBtnCancelTitle;
    /** @type {?} */
    TableText.prototype.allTitle;
}
var TableMessage = /** @class */ (function () {
    function TableMessage() {
        this.notFoundMessage = TableConstant.Message.NotFoundMessage;
        this.foundMessage = TableConstant.Message.FoundMessage;
        this.invalidFormatMessage = TableConstant.Message.InvalidFormatMessage;
        this.selectedItemsMessage = TableConstant.Message.SelectedItemsMessage;
        this.confirmSelectAllRecordsMessage = TableConstant.Message.ConfirmSelectAllRecordsMessage;
        this.confirmClearAllRecordsMessage = TableConstant.Message.ConfirmClearAllRecordsMessage;
        this.deleteMessage = TableConstant.Message.DeleteMessage;
        this.loadingMessage = TableConstant.Message.LoadingMessage;
        this.refMessage = TableConstant.Message.RefMessage;
    }
    return TableMessage;
}());
export { TableMessage };
if (false) {
    /** @type {?} */
    TableMessage.prototype.notFoundMessage;
    /** @type {?} */
    TableMessage.prototype.foundMessage;
    /** @type {?} */
    TableMessage.prototype.invalidFormatMessage;
    /** @type {?} */
    TableMessage.prototype.selectedItemsMessage;
    /** @type {?} */
    TableMessage.prototype.confirmSelectAllRecordsMessage;
    /** @type {?} */
    TableMessage.prototype.confirmClearAllRecordsMessage;
    /** @type {?} */
    TableMessage.prototype.deleteMessage;
    /** @type {?} */
    TableMessage.prototype.loadingMessage;
    /** @type {?} */
    TableMessage.prototype.refMessage;
}
/**
 * @record
 * @template T
 */
export function TableResponse() { }
if (false) {
    /** @type {?|undefined} */
    TableResponse.prototype.totalRecords;
    /** @type {?|undefined} */
    TableResponse.prototype.items;
}
/**
 * @record
 */
export function TableServiceProvider() { }
if (false) {
    /** @type {?|undefined} */
    TableServiceProvider.prototype.searchAsync;
    /** @type {?|undefined} */
    TableServiceProvider.prototype.createAsync;
    /** @type {?|undefined} */
    TableServiceProvider.prototype.updateAsync;
    /** @type {?|undefined} */
    TableServiceProvider.prototype.deleteAsync;
    /** @type {?|undefined} */
    TableServiceProvider.prototype.exportAsync;
}
var TableDatetimeFormat = /** @class */ (function () {
    function TableDatetimeFormat(init) {
        this.format = 'MM/dd/yyyy';
        this.full = true;
        Object.assign(this, init);
    }
    return TableDatetimeFormat;
}());
export { TableDatetimeFormat };
if (false) {
    /** @type {?} */
    TableDatetimeFormat.prototype.format;
    /** @type {?} */
    TableDatetimeFormat.prototype.full;
}
var EdittedField = /** @class */ (function () {
    function EdittedField(init) {
        Object.assign(this, init);
    }
    return EdittedField;
}());
export { EdittedField };
if (false) {
    /** @type {?} */
    EdittedField.prototype.item;
    /** @type {?} */
    EdittedField.prototype.field;
    /** @type {?} */
    EdittedField.prototype.index;
}
var ChangedCell = /** @class */ (function () {
    function ChangedCell(init) {
        Object.assign(this, init);
    }
    return ChangedCell;
}());
export { ChangedCell };
if (false) {
    /** @type {?} */
    ChangedCell.prototype.oldValue;
    /** @type {?} */
    ChangedCell.prototype.field;
    /** @type {?} */
    ChangedCell.prototype.currentValue;
}
var ChangedRow = /** @class */ (function () {
    function ChangedRow(init) {
        Object.assign(this, init);
    }
    return ChangedRow;
}());
export { ChangedRow };
if (false) {
    /** @type {?} */
    ChangedRow.prototype.currentItem;
    /** @type {?} */
    ChangedRow.prototype.oldItem;
    /** @type {?} */
    ChangedRow.prototype.cells;
}
var TableOption = /** @class */ (function () {
    function TableOption(init) {
        this.multiple = true;
        this.datetimeFormat = new TableDatetimeFormat({});
        this.mainColumns = [];
        this.actions = [];
        this.topButtons = [];
        this.defaultPageSize = 5;
        this.totalToolbarItem = 5;
        this.mode = TableMode.full;
        this.hideSequenceColumn = false;
        this.hideCheckboxColumn = false;
        this.inlineEdit = false;
        Object.assign(this, init);
    }
    return TableOption;
}());
export { TableOption };
if (false) {
    /** @type {?} */
    TableOption.prototype.sort;
    /** @type {?} */
    TableOption.prototype.multiple;
    /** @type {?} */
    TableOption.prototype.datetimeFormat;
    /** @type {?} */
    TableOption.prototype.paging;
    /** @type {?} */
    TableOption.prototype.selectedItems;
    /** @type {?} */
    TableOption.prototype.serviceProvider;
    /** @type {?} */
    TableOption.prototype.localData;
    /** @type {?} */
    TableOption.prototype.request;
    /** @type {?} */
    TableOption.prototype.mainColumns;
    /** @type {?} */
    TableOption.prototype.displayText;
    /** @type {?} */
    TableOption.prototype.message;
    /** @type {?} */
    TableOption.prototype.componentClass;
    /** @type {?} */
    TableOption.prototype.actions;
    /** @type {?} */
    TableOption.prototype.topButtons;
    /** @type {?} */
    TableOption.prototype.rowDetailTemplate;
    /** @type {?} */
    TableOption.prototype.expandFilterArea;
    /** @type {?} */
    TableOption.prototype.pageSizes;
    /** @type {?} */
    TableOption.prototype.defaultPageSize;
    /** @type {?} */
    TableOption.prototype.totalToolbarItem;
    /** @type {?} */
    TableOption.prototype.maxPage;
    /** @type {?} */
    TableOption.prototype.key;
    /** @type {?} */
    TableOption.prototype.title;
    /** @type {?} */
    TableOption.prototype.maxLenghtext;
    /** @type {?} */
    TableOption.prototype.mode;
    /** @type {?} */
    TableOption.prototype.hideSequenceColumn;
    /** @type {?} */
    TableOption.prototype.hideCheckboxColumn;
    /** @type {?} */
    TableOption.prototype.displayMode;
    /** @type {?} */
    TableOption.prototype.defaultOrderBy;
    /** @type {?} */
    TableOption.prototype.defautOrderDirection;
    /** @type {?} */
    TableOption.prototype.inlineEdit;
    /** @type {?} */
    TableOption.prototype.searchFields;
}
/** @enum {string} */
var TableMode = {
    compact: 'compact',
    full: 'full',
};
export { TableMode };
var TableConstant = /** @class */ (function () {
    function TableConstant() {
    }
    TableConstant.ComponentClass = 'primary';
    TableConstant.Key = 'name';
    TableConstant.DatetimeLocate = 'vi-VN';
    TableConstant.PageSizes = [5, 10, 15, 20, 50];
    TableConstant.Message = {
        NotFoundMessage: 'Chưa có thông tin',
        InvalidFormatMessage: 'không hợp lệ.',
        FoundMessage: 'Tìm thấy <span class="confirm-highlight">[0]</span> kết quả.',
        SelectedItemsMessage: 'Đã chọn <span class="highlight">[0]</span> bản ghi.',
        ConfirmSelectAllRecordsMessage: '<span class="confirm-highlight">Chọn tất cả kết quả?</span>',
        ConfirmClearAllRecordsMessage: '<span class="confirm-highlight text-danger">Bỏ chọn tất cả </span>?',
        DeleteMessage: 'Bạn có chắc chắn muốn xóa <span class="confirm-highlight text-danger">[0]</span> không?',
        LoadingMessage: 'Đang tải dữ liệu...',
        RefMessage: 'liên quan tới'
    };
    TableConstant.DisplayText = {
        PlaceholderSearch: 'Nhập từ khóa tìm kiếm...',
        BtnReset: 'Khôi phục',
        BtnSearch: 'Tìm kiếm',
        Action: 'Hành động',
        SelectPageSize: 'Hiển thị',
        DeleteTitle: 'Xóa',
        BtnAcceptTitle: 'Đồng ý',
        BtnCancelTitle: 'Đóng',
        FilterTitle: 'Tìm kiếm theo',
        ApplyFilter: 'Áp dụng lọc',
        DetailTitle: 'Thông tin chi tiết',
        PageTitle: 'Trang',
        AdvancedSearchTitle: 'Tìm kiếm nâng cao',
        AdvancedBtnTitle: 'Tìm kiếm',
        AdvancedBtnCancelTitle: 'Hủy bỏ',
        AllTitle: 'Tất cả'
    };
    TableConstant.Direction = {
        ASC: 'asc',
        DESC: 'desc'
    };
    TableConstant.TextAlign = {
        Left: 'left',
        Right: 'right',
        Center: 'center'
    };
    TableConstant.Action = {
        Edit: 'edit',
        Delete: 'delete',
        Custom: 'Custom'
    };
    TableConstant.ActionType = {
        Both: 'both',
        Toolbar: 'toolbar',
        Inline: 'inline'
    };
    return TableConstant;
}());
export { TableConstant };
if (false) {
    /** @type {?} */
    TableConstant.ComponentClass;
    /** @type {?} */
    TableConstant.Key;
    /** @type {?} */
    TableConstant.DatetimeLocate;
    /** @type {?} */
    TableConstant.PageSizes;
    /** @type {?} */
    TableConstant.Message;
    /** @type {?} */
    TableConstant.DisplayText;
    /** @type {?} */
    TableConstant.Direction;
    /** @type {?} */
    TableConstant.TextAlign;
    /** @type {?} */
    TableConstant.Action;
    /** @type {?} */
    TableConstant.ActionType;
}
;
/** @enum {string} */
var TableColumnType = {
    Number: 'number',
    String: 'string',
    Date: 'date',
    DateTime: 'datetime',
    DateRange: 'daterange',
    DateTimeRange: 'datetimerange',
    Time: 'time',
    TimeRange: 'timerange',
    Boolean: 'boolean',
    Description: 'description',
    Currency: 'currency',
    Dropdown: 'dropdown',
    Custom: 'custom',
};
export { TableColumnType };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUubW9kZWwuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZnc0Yy8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL3NoYXJlZC90YWJsZS90YWJsZS5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBSUEscUNBS0M7OztJQUpDLGtDQUFrQjs7SUFDbEIscUNBQXFCOztJQUNyQixzQ0FBNkM7O0lBQzdDLHNDQUFtRTs7Ozs7QUFHckUsK0JBR0M7OztJQUZDLHlCQUFXOztJQUNYLDJCQUFxQjs7QUFHdkI7SUEwQkUscUJBQVksSUFBMkI7UUFDckMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUNILGtCQUFDO0FBQUQsQ0FBQyxBQTdCRCxJQTZCQzs7OztJQTVCQyw0QkFBcUI7O0lBQ3JCLCtCQUFxQjs7SUFDckIsZ0NBQW1COztJQUNuQixnQ0FBb0I7O0lBQ3BCLGtDQUFzQjs7SUFDdEIsNEJBQWU7O0lBQ2Ysa0NBQXFCOztJQUNyQixvQ0FBd0I7O0lBQ3hCLDRCQUFlOztJQUNmLGdDQUFtQjs7SUFDbkIsMkJBQXVCOztJQUN2QixrQ0FBc0I7O0lBQ3RCLGlDQUFxQjs7SUFDckIsK0JBQWtGOztJQUNsRixxQ0FBd0M7O0lBQ3hDLDJCQUFxQjs7SUFDckIsNENBS0U7O0lBQ0YseUJBQVk7O0lBQ1oscUNBQXdDOztBQU8xQztJQUFBO0lBSUEsQ0FBQztJQUFELGtCQUFDO0FBQUQsQ0FBQyxBQUpELElBSUM7Ozs7SUFIQyxnQ0FBbUI7O0lBQ25CLDhCQUFpQjs7SUFDakIsNEJBQWU7O0FBR2pCO0lBV0UscUJBQVksSUFBMkI7UUFOdkMsU0FBSSxHQUFZLGFBQWEsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDO1FBTzlDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFDSCxrQkFBQztBQUFELENBQUMsQUFkRCxJQWNDOzs7O0lBYkMseUJBQVk7O0lBQ1osNEJBQXFCOztJQUNyQiw4QkFBdUI7O0lBQ3ZCLDJCQUFjOztJQUNkLDJCQUFnRDs7SUFDaEQsa0NBQXFCOztJQUNyQixtQ0FBb0g7O0lBQ3BILCtCQUFtQjs7SUFDbkIsMkJBQStCOztJQUMvQiwrQkFBbUI7Ozs7O0FBTXJCLGtDQU1DOzs7SUFMQyxrQ0FBb0I7O0lBQ3BCLGdDQUFrQjs7SUFDbEIsaUNBQW1COztJQUNuQiwrQkFBd0I7O0lBQ3hCLDRCQUFXOztBQUdiO0lBQUE7UUFDRSxzQkFBaUIsR0FBWSxhQUFhLENBQUMsV0FBVyxDQUFDLGlCQUFpQixDQUFDO1FBQ3pFLGNBQVMsR0FBWSxhQUFhLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQztRQUN6RCxhQUFRLEdBQVksYUFBYSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUM7UUFDdkQsV0FBTSxHQUFZLGFBQWEsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDO1FBQ25ELG1CQUFjLEdBQVksYUFBYSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUM7UUFDbkUsZ0JBQVcsR0FBWSxhQUFhLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQztRQUM3RCxtQkFBYyxHQUFZLGFBQWEsQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDO1FBQ25FLG1CQUFjLEdBQVksYUFBYSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUE7UUFDbEUsZ0JBQVcsR0FBWSxhQUFhLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQztRQUM3RCxnQkFBVyxHQUFZLGFBQWEsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDO1FBQzdELGdCQUFXLEdBQVksYUFBYSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUM7UUFDN0QsY0FBUyxHQUFZLGFBQWEsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDO1FBQ3pELHdCQUFtQixHQUFZLGFBQWEsQ0FBQyxXQUFXLENBQUMsbUJBQW1CLENBQUM7UUFDN0UscUJBQWdCLEdBQVksYUFBYSxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQztRQUN2RSwyQkFBc0IsR0FBWSxhQUFhLENBQUMsV0FBVyxDQUFDLHNCQUFzQixDQUFDO1FBQ25GLGFBQVEsR0FBWSxhQUFhLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQztJQUN6RCxDQUFDO0lBQUQsZ0JBQUM7QUFBRCxDQUFDLEFBakJELElBaUJDOzs7O0lBaEJDLHNDQUF5RTs7SUFDekUsOEJBQXlEOztJQUN6RCw2QkFBdUQ7O0lBQ3ZELDJCQUFtRDs7SUFDbkQsbUNBQW1FOztJQUNuRSxnQ0FBNkQ7O0lBQzdELG1DQUFtRTs7SUFDbkUsbUNBQWtFOztJQUNsRSxnQ0FBNkQ7O0lBQzdELGdDQUE2RDs7SUFDN0QsZ0NBQTZEOztJQUM3RCw4QkFBeUQ7O0lBQ3pELHdDQUE2RTs7SUFDN0UscUNBQXVFOztJQUN2RSwyQ0FBbUY7O0lBQ25GLDZCQUF1RDs7QUFHekQ7SUFBQTtRQUNFLG9CQUFlLEdBQVksYUFBYSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUM7UUFDakUsaUJBQVksR0FBWSxhQUFhLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQztRQUMzRCx5QkFBb0IsR0FBWSxhQUFhLENBQUMsT0FBTyxDQUFDLG9CQUFvQixDQUFDO1FBQzNFLHlCQUFvQixHQUFZLGFBQWEsQ0FBQyxPQUFPLENBQUMsb0JBQW9CLENBQUM7UUFDM0UsbUNBQThCLEdBQVksYUFBYSxDQUFDLE9BQU8sQ0FBQyw4QkFBOEIsQ0FBQztRQUMvRixrQ0FBNkIsR0FBWSxhQUFhLENBQUMsT0FBTyxDQUFDLDZCQUE2QixDQUFDO1FBQzdGLGtCQUFhLEdBQVksYUFBYSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUM7UUFDN0QsbUJBQWMsR0FBWSxhQUFhLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQztRQUMvRCxlQUFVLEdBQVksYUFBYSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUM7SUFDekQsQ0FBQztJQUFELG1CQUFDO0FBQUQsQ0FBQyxBQVZELElBVUM7Ozs7SUFUQyx1Q0FBaUU7O0lBQ2pFLG9DQUEyRDs7SUFDM0QsNENBQTJFOztJQUMzRSw0Q0FBMkU7O0lBQzNFLHNEQUErRjs7SUFDL0YscURBQTZGOztJQUM3RixxQ0FBNkQ7O0lBQzdELHNDQUErRDs7SUFDL0Qsa0NBQXVEOzs7Ozs7QUFHekQsbUNBR0M7OztJQUZDLHFDQUFzQjs7SUFDdEIsOEJBQVk7Ozs7O0FBR2QsMENBTUM7OztJQUxDLDJDQUFpRDs7SUFDakQsMkNBQTZDOztJQUM3QywyQ0FBNkM7O0lBQzdDLDJDQUE4RDs7SUFDOUQsMkNBQWlEOztBQUduRDtJQUdFLDZCQUFZLElBQWtDO1FBRjlDLFdBQU0sR0FBVyxZQUFZLENBQUM7UUFDOUIsU0FBSSxHQUFZLElBQUksQ0FBQztRQUVuQixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBQ0gsMEJBQUM7QUFBRCxDQUFDLEFBTkQsSUFNQzs7OztJQUxDLHFDQUE4Qjs7SUFDOUIsbUNBQXFCOztBQU12QjtJQUlFLHNCQUFZLElBQTJCO1FBQ3JDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFDSCxtQkFBQztBQUFELENBQUMsQUFQRCxJQU9DOzs7O0lBTkMsNEJBQVc7O0lBQ1gsNkJBQWU7O0lBQ2YsNkJBQWU7O0FBTWpCO0lBSUUscUJBQVksSUFBMEI7UUFDcEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUNILGtCQUFDO0FBQUQsQ0FBQyxBQVBELElBT0M7Ozs7SUFOQywrQkFBZTs7SUFDZiw0QkFBZTs7SUFDZixtQ0FBbUI7O0FBTXJCO0lBSUUsb0JBQVksSUFBeUI7UUFDbkMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUNILGlCQUFDO0FBQUQsQ0FBQyxBQVBELElBT0M7Ozs7SUFOQyxpQ0FBa0I7O0lBQ2xCLDZCQUFjOztJQUNkLDJCQUFzQjs7QUFNeEI7SUFnQ0UscUJBQVksSUFBMEI7UUE5QnRDLGFBQVEsR0FBYSxJQUFJLENBQUM7UUFDMUIsbUJBQWMsR0FBeUIsSUFBSSxtQkFBbUIsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQU1uRSxnQkFBVyxHQUFrQixFQUFFLENBQUM7UUFJaEMsWUFBTyxHQUFtQixFQUFFLENBQUM7UUFDN0IsZUFBVSxHQUFtQixFQUFFLENBQUM7UUFJaEMsb0JBQWUsR0FBWSxDQUFDLENBQUM7UUFDN0IscUJBQWdCLEdBQVksQ0FBQyxDQUFDO1FBSzlCLFNBQUksR0FBYyxTQUFTLENBQUMsSUFBSSxDQUFDO1FBQ2pDLHVCQUFrQixHQUFhLEtBQUssQ0FBQztRQUNyQyx1QkFBa0IsR0FBYSxLQUFLLENBQUM7UUFJckMsZUFBVSxHQUFhLEtBQUssQ0FBQztRQUczQixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBQ0gsa0JBQUM7QUFBRCxDQUFDLEFBbkNELElBbUNDOzs7O0lBbENDLDJCQUFtRDs7SUFDbkQsK0JBQTBCOztJQUMxQixxQ0FBbUU7O0lBQ25FLDZCQUFpQjs7SUFDakIsb0NBQXNCOztJQUN0QixzQ0FBdUM7O0lBQ3ZDLGdDQUFvQzs7SUFDcEMsOEJBQXVCOztJQUN2QixrQ0FBZ0M7O0lBQ2hDLGtDQUF3Qjs7SUFDeEIsOEJBQXVCOztJQUN2QixxQ0FBd0I7O0lBQ3hCLDhCQUE2Qjs7SUFDN0IsaUNBQWdDOztJQUNoQyx3Q0FBOEI7O0lBQzlCLHVDQUEyQjs7SUFDM0IsZ0NBQXFCOztJQUNyQixzQ0FBNkI7O0lBQzdCLHVDQUE4Qjs7SUFDOUIsOEJBQWlCOztJQUNqQiwwQkFBYTs7SUFDYiw0QkFBZTs7SUFDZixtQ0FBc0I7O0lBQ3RCLDJCQUFpQzs7SUFDakMseUNBQXFDOztJQUNyQyx5Q0FBcUM7O0lBQ3JDLGtDQUE4Qjs7SUFDOUIscUNBQXdCOztJQUN4QiwyQ0FBOEI7O0lBQzlCLGlDQUE2Qjs7SUFDN0IsbUNBQXdCOzs7O0lBT3hCLFNBQVUsU0FBUztJQUNuQixNQUFPLE1BQU07OztBQUlmO0lBQUE7SUF5REEsQ0FBQztJQXhEZSw0QkFBYyxHQUFXLFNBQVMsQ0FBQztJQUNuQyxpQkFBRyxHQUFXLE1BQU0sQ0FBQztJQUNyQiw0QkFBYyxHQUFXLE9BQU8sQ0FBQztJQUNqQyx1QkFBUyxHQUFhLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQzFDLHFCQUFPLEdBQUc7UUFDdEIsZUFBZSxFQUFFLG1CQUFtQjtRQUNwQyxvQkFBb0IsRUFBRSxlQUFlO1FBQ3JDLFlBQVksRUFBRSw4REFBOEQ7UUFDNUUsb0JBQW9CLEVBQUUscURBQXFEO1FBQzNFLDhCQUE4QixFQUFFLDZEQUE2RDtRQUM3Riw2QkFBNkIsRUFBRSxxRUFBcUU7UUFDcEcsYUFBYSxFQUFFLHlGQUF5RjtRQUN4RyxjQUFjLEVBQUUscUJBQXFCO1FBQ3JDLFVBQVUsRUFBRSxlQUFlO0tBQzVCLENBQUM7SUFFWSx5QkFBVyxHQUFHO1FBQzFCLGlCQUFpQixFQUFFLDBCQUEwQjtRQUM3QyxRQUFRLEVBQUUsV0FBVztRQUNyQixTQUFTLEVBQUUsVUFBVTtRQUNyQixNQUFNLEVBQUUsV0FBVztRQUNuQixjQUFjLEVBQUUsVUFBVTtRQUMxQixXQUFXLEVBQUUsS0FBSztRQUNsQixjQUFjLEVBQUUsUUFBUTtRQUN4QixjQUFjLEVBQUUsTUFBTTtRQUN0QixXQUFXLEVBQUUsZUFBZTtRQUM1QixXQUFXLEVBQUUsYUFBYTtRQUMxQixXQUFXLEVBQUUsb0JBQW9CO1FBQ2pDLFNBQVMsRUFBRSxPQUFPO1FBQ2xCLG1CQUFtQixFQUFFLG1CQUFtQjtRQUN4QyxnQkFBZ0IsRUFBRSxVQUFVO1FBQzVCLHNCQUFzQixFQUFFLFFBQVE7UUFDaEMsUUFBUSxFQUFFLFFBQVE7S0FDbkIsQ0FBQztJQUVZLHVCQUFTLEdBQUc7UUFDeEIsR0FBRyxFQUFFLEtBQUs7UUFDVixJQUFJLEVBQUUsTUFBTTtLQUNiLENBQUM7SUFFWSx1QkFBUyxHQUFHO1FBQ3hCLElBQUksRUFBRSxNQUFNO1FBQ1osS0FBSyxFQUFFLE9BQU87UUFDZCxNQUFNLEVBQUUsUUFBUTtLQUNqQixDQUFDO0lBRVksb0JBQU0sR0FBRztRQUNyQixJQUFJLEVBQUUsTUFBTTtRQUNaLE1BQU0sRUFBRSxRQUFRO1FBQ2hCLE1BQU0sRUFBRSxRQUFRO0tBQ2pCLENBQUE7SUFDYSx3QkFBVSxHQUFHO1FBQ3pCLElBQUksRUFBRSxNQUFNO1FBQ1osT0FBTyxFQUFFLFNBQVM7UUFDbEIsTUFBTSxFQUFFLFFBQVE7S0FDakIsQ0FBQTtJQUNILG9CQUFDO0NBQUEsQUF6REQsSUF5REM7U0F6RFksYUFBYTs7O0lBQ3hCLDZCQUFpRDs7SUFDakQsa0JBQW1DOztJQUNuQyw2QkFBK0M7O0lBQy9DLHdCQUF3RDs7SUFDeEQsc0JBVUU7O0lBRUYsMEJBaUJFOztJQUVGLHdCQUdFOztJQUVGLHdCQUlFOztJQUVGLHFCQUlDOztJQUNELHlCQUlDOztBQUNGLENBQUM7OztJQUdBLFFBQVMsUUFBUTtJQUNqQixRQUFTLFFBQVE7SUFDakIsTUFBTyxNQUFNO0lBQ2IsVUFBVyxVQUFVO0lBQ3JCLFdBQVksV0FBVztJQUN2QixlQUFnQixlQUFlO0lBQy9CLE1BQU8sTUFBTTtJQUNiLFdBQVksV0FBVztJQUN2QixTQUFVLFNBQVM7SUFDbkIsYUFBYyxhQUFhO0lBQzNCLFVBQVcsVUFBVTtJQUNyQixVQUFXLFVBQVU7SUFDckIsUUFBUyxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBUYWJsZUNvbXBvbmVudCB9IGZyb20gJy4vdGFibGUuY29tcG9uZW50JztcclxuaW1wb3J0IHsgVGVtcGxhdGVSZWYsIEVsZW1lbnRSZWYsIFR5cGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgVGFibGVFZGl0SW5saW5lIHtcclxuICBlbmFibGVkPzogYm9vbGVhbjtcclxuICBhdXRvQ29tbWl0PzogYm9vbGVhbjtcclxuICBjcmVhdGVBc3luYz86IChpdGVtOiBhbnkpID0+IE9ic2VydmFibGU8YW55PjtcclxuICB1cGRhdGVBc3luYz86IChpdGVtOiBhbnksIGNvbHVtbj86IFRhYmxlQ29sdW1uKSA9PiBPYnNlcnZhYmxlPGFueT47XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgVGFibGVDZWxsIHtcclxuICBpdGVtPzogYW55O1xyXG4gIGNvbHVtbj86IFRhYmxlQ29sdW1uO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVGFibGVDb2x1bW4ge1xyXG4gIHRpdGxlPzogKCkgPT4gc3RyaW5nO1xyXG4gIHZhbHVlUmVmPzogKCkgPT4gYW55O1xyXG4gIGRpcmVjdGlvbj86IHN0cmluZztcclxuICBhbGxvd1NvcnQ/OiBib29sZWFuO1xyXG4gIGFsbG93RmlsdGVyPzogYm9vbGVhbjtcclxuICBvcmRlcj86IG51bWJlcjtcclxuICBjdXN0b21DbGFzcz86IHN0cmluZztcclxuICBkZWZhdWx0U29ydGVyPzogYm9vbGVhbjtcclxuICB3aWR0aD86IG51bWJlcjtcclxuICB0ZXh0QWxpZ24/OiBzdHJpbmc7XHJcbiAgdHlwZT86IFRhYmxlQ29sdW1uVHlwZTtcclxuICBzaG93VG9vbHRpcD86IGJvb2xlYW47XHJcbiAgZWRpdElubGluZT86IGJvb2xlYW47XHJcbiAgY2FsbGJhY2s/OiAocHJvdmlkZXI/OiBUYWJsZUNvbXBvbmVudCwgZWxlbWVudD86IEVsZW1lbnRSZWYsICRldmVudD86IGFueSkgPT4gYW55O1xyXG4gIGN1c3RvbVRlbXBsYXRlPzogKCkgPT4gVGVtcGxhdGVSZWY8YW55PjtcclxuICBoaWRlPzogKCkgPT4gYm9vbGVhbjtcclxuICBkcm9wZG93bkNvbmZpZ3VyYXRpb24/OiB7XHJcbiAgICBzZWFyY2hGdW5jdGlvbjogKHRleHQ6IHN0cmluZywgaW5kZXg6IG51bWJlciwgY3VycmVudFBhZ2U6IG51bWJlciwgcGFnZVNpemU6IG51bWJlcikgPT4gT2JzZXJ2YWJsZTx7IGl0ZW1zOiBhbnlbXSwgdG90YWxSZWNvcmRzOiBudW1iZXIgfT4sXHJcbiAgICBtdWx0aXBsZT86IGJvb2xlYW4sXHJcbiAgICBiaW5kTGFiZWw6IHN0cmluZyxcclxuICAgIGJpbmRWYWx1ZTogc3RyaW5nLFxyXG4gIH07XHJcbiAgaWQ/OiBzdHJpbmc7XHJcbiAgZmlsdGVyVGVtcGxhdGU/OiAoKSA9PiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG5cclxuICBjb25zdHJ1Y3Rvcihpbml0PzogUGFydGlhbDxUYWJsZUNvbHVtbj4pIHtcclxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgaW5pdCk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVGFibGVTb3J0ZXIge1xyXG4gIGRpcmVjdGlvbj86IHN0cmluZztcclxuICBvcmRlckJ5Pzogc3RyaW5nO1xyXG4gIG9yZGVyPzogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVGFibGVBY3Rpb24ge1xyXG4gIGlkPzogc3RyaW5nO1xyXG4gIHRpdGxlPzogKCkgPT4gc3RyaW5nO1xyXG4gIHRvb2x0aXA/OiAoKSA9PiBzdHJpbmc7XHJcbiAgaWNvbj86IHN0cmluZztcclxuICB0eXBlPzogc3RyaW5nID0gVGFibGVDb25zdGFudC5BY3Rpb25UeXBlLklubGluZTtcclxuICBjdXN0b21DbGFzcz86IHN0cmluZztcclxuICBleGVjdXRlQXN5bmM/OiAoaXRlbT86IGFueSwgZWxlbWVudD86IEVsZW1lbnRSZWYsIHByb3ZpZGVyPzogYW55LCBpbmRleD86IG51bWJlciwgbG9hZGVkQ2FsbGJhY2s/OiBGdW5jdGlvbikgPT4gYW55O1xyXG4gIGRpc2FibGVkPzogYm9vbGVhbjtcclxuICBoaWRlPzogKGl0ZW0/OiBhbnkpID0+IGJvb2xlYW47XHJcbiAgbGF6eWxvYWQ/OiBib29sZWFuO1xyXG4gIGNvbnN0cnVjdG9yKGluaXQ/OiBQYXJ0aWFsPFRhYmxlQWN0aW9uPikge1xyXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBpbml0KTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgVGFibGVSZXF1ZXN0IHtcclxuICBzZWFyY2hUZXh0Pzogc3RyaW5nO1xyXG4gIHBhZ2VTaXplPzogbnVtYmVyO1xyXG4gIHBhZ2VJbmRleD86IG51bWJlcjtcclxuICBzb3J0ZXJzPzogVGFibGVTb3J0ZXJbXTtcclxuICBkYXRhPzogYW55O1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVGFibGVUZXh0IHtcclxuICBwbGFjZWhvbGRlclNlYXJjaD86IHN0cmluZyA9IFRhYmxlQ29uc3RhbnQuRGlzcGxheVRleHQuUGxhY2Vob2xkZXJTZWFyY2g7XHJcbiAgYnRuU2VhcmNoPzogc3RyaW5nID0gVGFibGVDb25zdGFudC5EaXNwbGF5VGV4dC5CdG5TZWFyY2g7XHJcbiAgYnRuUmVzZXQ/OiBzdHJpbmcgPSBUYWJsZUNvbnN0YW50LkRpc3BsYXlUZXh0LkJ0blJlc2V0O1xyXG4gIGFjdGlvbj86IHN0cmluZyA9IFRhYmxlQ29uc3RhbnQuRGlzcGxheVRleHQuQWN0aW9uO1xyXG4gIHNlbGVjdFBhZ2VTaXplPzogc3RyaW5nID0gVGFibGVDb25zdGFudC5EaXNwbGF5VGV4dC5TZWxlY3RQYWdlU2l6ZTtcclxuICBkZWxldGVUaXRsZT86IHN0cmluZyA9IFRhYmxlQ29uc3RhbnQuRGlzcGxheVRleHQuRGVsZXRlVGl0bGU7XHJcbiAgYnRuQWNjZXB0VGl0bGU/OiBzdHJpbmcgPSBUYWJsZUNvbnN0YW50LkRpc3BsYXlUZXh0LkJ0bkFjY2VwdFRpdGxlO1xyXG4gIGJ0bkNhbmNlbFRpdGxlPzogc3RyaW5nID0gVGFibGVDb25zdGFudC5EaXNwbGF5VGV4dC5CdG5DYW5jZWxUaXRsZVxyXG4gIGZpbHRlclRpdGxlPzogc3RyaW5nID0gVGFibGVDb25zdGFudC5EaXNwbGF5VGV4dC5GaWx0ZXJUaXRsZTtcclxuICBhcHBseUZpbHRlcj86IHN0cmluZyA9IFRhYmxlQ29uc3RhbnQuRGlzcGxheVRleHQuQXBwbHlGaWx0ZXI7XHJcbiAgZGV0YWlsVGl0bGU/OiBzdHJpbmcgPSBUYWJsZUNvbnN0YW50LkRpc3BsYXlUZXh0LkRldGFpbFRpdGxlO1xyXG4gIHBhZ2VUaXRsZT86IHN0cmluZyA9IFRhYmxlQ29uc3RhbnQuRGlzcGxheVRleHQuUGFnZVRpdGxlO1xyXG4gIGFkdmFuY2VkU2VhcmNoVGl0bGU/OiBzdHJpbmcgPSBUYWJsZUNvbnN0YW50LkRpc3BsYXlUZXh0LkFkdmFuY2VkU2VhcmNoVGl0bGU7XHJcbiAgYWR2YW5jZWRCdG5UaXRsZT86IHN0cmluZyA9IFRhYmxlQ29uc3RhbnQuRGlzcGxheVRleHQuQWR2YW5jZWRCdG5UaXRsZTtcclxuICBhZHZhbmNlZEJ0bkNhbmNlbFRpdGxlPzogc3RyaW5nID0gVGFibGVDb25zdGFudC5EaXNwbGF5VGV4dC5BZHZhbmNlZEJ0bkNhbmNlbFRpdGxlO1xyXG4gIGFsbFRpdGxlPzogc3RyaW5nID0gVGFibGVDb25zdGFudC5EaXNwbGF5VGV4dC5BbGxUaXRsZTtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFRhYmxlTWVzc2FnZSB7XHJcbiAgbm90Rm91bmRNZXNzYWdlPzogc3RyaW5nID0gVGFibGVDb25zdGFudC5NZXNzYWdlLk5vdEZvdW5kTWVzc2FnZTtcclxuICBmb3VuZE1lc3NhZ2U/OiBzdHJpbmcgPSBUYWJsZUNvbnN0YW50Lk1lc3NhZ2UuRm91bmRNZXNzYWdlO1xyXG4gIGludmFsaWRGb3JtYXRNZXNzYWdlPzogc3RyaW5nID0gVGFibGVDb25zdGFudC5NZXNzYWdlLkludmFsaWRGb3JtYXRNZXNzYWdlO1xyXG4gIHNlbGVjdGVkSXRlbXNNZXNzYWdlPzogc3RyaW5nID0gVGFibGVDb25zdGFudC5NZXNzYWdlLlNlbGVjdGVkSXRlbXNNZXNzYWdlO1xyXG4gIGNvbmZpcm1TZWxlY3RBbGxSZWNvcmRzTWVzc2FnZT86IHN0cmluZyA9IFRhYmxlQ29uc3RhbnQuTWVzc2FnZS5Db25maXJtU2VsZWN0QWxsUmVjb3Jkc01lc3NhZ2U7XHJcbiAgY29uZmlybUNsZWFyQWxsUmVjb3Jkc01lc3NhZ2U/OiBzdHJpbmcgPSBUYWJsZUNvbnN0YW50Lk1lc3NhZ2UuQ29uZmlybUNsZWFyQWxsUmVjb3Jkc01lc3NhZ2U7XHJcbiAgZGVsZXRlTWVzc2FnZT86IHN0cmluZyA9IFRhYmxlQ29uc3RhbnQuTWVzc2FnZS5EZWxldGVNZXNzYWdlO1xyXG4gIGxvYWRpbmdNZXNzYWdlPzogc3RyaW5nID0gVGFibGVDb25zdGFudC5NZXNzYWdlLkxvYWRpbmdNZXNzYWdlO1xyXG4gIHJlZk1lc3NhZ2U/OiBzdHJpbmcgPSBUYWJsZUNvbnN0YW50Lk1lc3NhZ2UuUmVmTWVzc2FnZTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBUYWJsZVJlc3BvbnNlPFQ+IHtcclxuICB0b3RhbFJlY29yZHM/OiBudW1iZXI7XHJcbiAgaXRlbXM/OiBUW107XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgVGFibGVTZXJ2aWNlUHJvdmlkZXIge1xyXG4gIHNlYXJjaEFzeW5jPzogKHJlcXVlc3Q/OiBhbnkpID0+IE9ic2VydmFibGU8YW55PjtcclxuICBjcmVhdGVBc3luYz86IChpdGVtOiBhbnkpID0+IE9ic2VydmFibGU8YW55PjtcclxuICB1cGRhdGVBc3luYz86IChpdGVtOiBhbnkpID0+IE9ic2VydmFibGU8YW55PjtcclxuICBkZWxldGVBc3luYz86IChpZHM6IHN0cmluZywgYWxsPzogYm9vbGVhbikgPT4gT2JzZXJ2YWJsZTxhbnk+O1xyXG4gIGV4cG9ydEFzeW5jPzogKHJlcXVlc3Q/OiBhbnkpID0+IE9ic2VydmFibGU8YW55PjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFRhYmxlRGF0ZXRpbWVGb3JtYXQge1xyXG4gIGZvcm1hdDogc3RyaW5nID0gJ01NL2RkL3l5eXknO1xyXG4gIGZ1bGw6IGJvb2xlYW4gPSB0cnVlO1xyXG4gIGNvbnN0cnVjdG9yKGluaXQ6IFBhcnRpYWw8VGFibGVEYXRldGltZUZvcm1hdD4pIHtcclxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgaW5pdCk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRWRpdHRlZEZpZWxkIHtcclxuICBpdGVtPzogYW55O1xyXG4gIGZpZWxkPzogc3RyaW5nO1xyXG4gIGluZGV4PzogbnVtYmVyO1xyXG4gIGNvbnN0cnVjdG9yKGluaXQ6IFBhcnRpYWw8RWRpdHRlZEZpZWxkPikge1xyXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBpbml0KTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBDaGFuZ2VkQ2VsbCB7XHJcbiAgb2xkVmFsdWU/OiBhbnk7XHJcbiAgZmllbGQ/OiBzdHJpbmc7XHJcbiAgY3VycmVudFZhbHVlPzogYW55O1xyXG4gIGNvbnN0cnVjdG9yKGluaXQ6IFBhcnRpYWw8Q2hhbmdlZENlbGw+KSB7XHJcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIGluaXQpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIENoYW5nZWRSb3cge1xyXG4gIGN1cnJlbnRJdGVtPzogYW55O1xyXG4gIG9sZEl0ZW0/OiBhbnk7XHJcbiAgY2VsbHM/OiBDaGFuZ2VkQ2VsbFtdO1xyXG4gIGNvbnN0cnVjdG9yKGluaXQ6IFBhcnRpYWw8Q2hhbmdlZFJvdz4pIHtcclxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgaW5pdCk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVGFibGVPcHRpb24ge1xyXG4gIHNvcnQ/OiAoYTogYW55LCBiOiBhbnksIG9yZGVyQnk6IHN0cmluZykgPT4gbnVtYmVyO1xyXG4gIG11bHRpcGxlPzogYm9vbGVhbiA9IHRydWU7XHJcbiAgZGF0ZXRpbWVGb3JtYXQ/OiBUYWJsZURhdGV0aW1lRm9ybWF0ID0gbmV3IFRhYmxlRGF0ZXRpbWVGb3JtYXQoe30pO1xyXG4gIHBhZ2luZz86IGJvb2xlYW47XHJcbiAgc2VsZWN0ZWRJdGVtcz86IGFueVtdO1xyXG4gIHNlcnZpY2VQcm92aWRlcj86IFRhYmxlU2VydmljZVByb3ZpZGVyO1xyXG4gIGxvY2FsRGF0YT86ICgpID0+IE9ic2VydmFibGU8YW55W10+O1xyXG4gIHJlcXVlc3Q/OiBUYWJsZVJlcXVlc3Q7XHJcbiAgbWFpbkNvbHVtbnM6IFRhYmxlQ29sdW1uW10gPSBbXTtcclxuICBkaXNwbGF5VGV4dD86IFRhYmxlVGV4dDtcclxuICBtZXNzYWdlPzogVGFibGVNZXNzYWdlO1xyXG4gIGNvbXBvbmVudENsYXNzPzogc3RyaW5nO1xyXG4gIGFjdGlvbnM/OiBUYWJsZUFjdGlvbltdID0gW107XHJcbiAgdG9wQnV0dG9ucz86IFRhYmxlQWN0aW9uW10gPSBbXTtcclxuICByb3dEZXRhaWxUZW1wbGF0ZT86IFR5cGU8YW55PjtcclxuICBleHBhbmRGaWx0ZXJBcmVhPzogYm9vbGVhbjtcclxuICBwYWdlU2l6ZXM/OiBudW1iZXJbXTtcclxuICBkZWZhdWx0UGFnZVNpemU/OiBudW1iZXIgPSA1O1xyXG4gIHRvdGFsVG9vbGJhckl0ZW0/OiBudW1iZXIgPSA1O1xyXG4gIG1heFBhZ2U/OiBudW1iZXI7XHJcbiAga2V5Pzogc3RyaW5nO1xyXG4gIHRpdGxlPzogc3RyaW5nO1xyXG4gIG1heExlbmdodGV4dD86IG51bWJlcjtcclxuICBtb2RlOiBUYWJsZU1vZGUgPSBUYWJsZU1vZGUuZnVsbDtcclxuICBoaWRlU2VxdWVuY2VDb2x1bW4/OiBib29sZWFuID0gZmFsc2U7XHJcbiAgaGlkZUNoZWNrYm94Q29sdW1uPzogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIGRpc3BsYXlNb2RlPzogJ2xpc3QnIHwgJ2Z1bGwnO1xyXG4gIGRlZmF1bHRPcmRlckJ5Pzogc3RyaW5nO1xyXG4gIGRlZmF1dE9yZGVyRGlyZWN0aW9uPzogc3RyaW5nO1xyXG4gIGlubGluZUVkaXQ/OiBib29sZWFuID0gZmFsc2U7XHJcbiAgc2VhcmNoRmllbGRzPzogc3RyaW5nW107XHJcbiAgY29uc3RydWN0b3IoaW5pdDogUGFydGlhbDxUYWJsZU9wdGlvbj4pIHtcclxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgaW5pdCk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZW51bSBUYWJsZU1vZGUge1xyXG4gIGNvbXBhY3QgPSAnY29tcGFjdCcsXHJcbiAgZnVsbCA9ICdmdWxsJ1xyXG59XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIFRhYmxlQ29uc3RhbnQge1xyXG4gIHB1YmxpYyBzdGF0aWMgQ29tcG9uZW50Q2xhc3M6IHN0cmluZyA9ICdwcmltYXJ5JztcclxuICBwdWJsaWMgc3RhdGljIEtleTogc3RyaW5nID0gJ25hbWUnO1xyXG4gIHB1YmxpYyBzdGF0aWMgRGF0ZXRpbWVMb2NhdGU6IHN0cmluZyA9ICd2aS1WTic7XHJcbiAgcHVibGljIHN0YXRpYyBQYWdlU2l6ZXM6IG51bWJlcltdID0gWzUsIDEwLCAxNSwgMjAsIDUwXTtcclxuICBwdWJsaWMgc3RhdGljIE1lc3NhZ2UgPSB7XHJcbiAgICBOb3RGb3VuZE1lc3NhZ2U6ICdDaMawYSBjw7MgdGjDtG5nIHRpbicsXHJcbiAgICBJbnZhbGlkRm9ybWF0TWVzc2FnZTogJ2tow7RuZyBo4bujcCBs4buHLicsXHJcbiAgICBGb3VuZE1lc3NhZ2U6ICdUw6xtIHRo4bqleSA8c3BhbiBjbGFzcz1cImNvbmZpcm0taGlnaGxpZ2h0XCI+WzBdPC9zcGFuPiBr4bq/dCBxdeG6oy4nLFxyXG4gICAgU2VsZWN0ZWRJdGVtc01lc3NhZ2U6ICfEkMOjIGNo4buNbiA8c3BhbiBjbGFzcz1cImhpZ2hsaWdodFwiPlswXTwvc3Bhbj4gYuG6o24gZ2hpLicsXHJcbiAgICBDb25maXJtU2VsZWN0QWxsUmVjb3Jkc01lc3NhZ2U6ICc8c3BhbiBjbGFzcz1cImNvbmZpcm0taGlnaGxpZ2h0XCI+Q2jhu41uIHThuqV0IGPhuqMga+G6v3QgcXXhuqM/PC9zcGFuPicsXHJcbiAgICBDb25maXJtQ2xlYXJBbGxSZWNvcmRzTWVzc2FnZTogJzxzcGFuIGNsYXNzPVwiY29uZmlybS1oaWdobGlnaHQgdGV4dC1kYW5nZXJcIj5C4buPIGNo4buNbiB04bqldCBj4bqjIDwvc3Bhbj4/JyxcclxuICAgIERlbGV0ZU1lc3NhZ2U6ICdC4bqhbiBjw7MgY2jhuq9jIGNo4bqvbiBtdeG7kW4geMOzYSA8c3BhbiBjbGFzcz1cImNvbmZpcm0taGlnaGxpZ2h0IHRleHQtZGFuZ2VyXCI+WzBdPC9zcGFuPiBraMO0bmc/JyxcclxuICAgIExvYWRpbmdNZXNzYWdlOiAnxJBhbmcgdOG6o2kgZOG7ryBsaeG7h3UuLi4nLFxyXG4gICAgUmVmTWVzc2FnZTogJ2xpw6puIHF1YW4gdOG7m2knXHJcbiAgfTtcclxuXHJcbiAgcHVibGljIHN0YXRpYyBEaXNwbGF5VGV4dCA9IHtcclxuICAgIFBsYWNlaG9sZGVyU2VhcmNoOiAnTmjhuq1wIHThu6sga2jDs2EgdMOsbSBraeG6v20uLi4nLFxyXG4gICAgQnRuUmVzZXQ6ICdLaMO0aSBwaOG7pWMnLFxyXG4gICAgQnRuU2VhcmNoOiAnVMOsbSBraeG6v20nLFxyXG4gICAgQWN0aW9uOiAnSMOgbmggxJHhu5luZycsXHJcbiAgICBTZWxlY3RQYWdlU2l6ZTogJ0hp4buDbiB0aOG7iycsXHJcbiAgICBEZWxldGVUaXRsZTogJ1jDs2EnLFxyXG4gICAgQnRuQWNjZXB0VGl0bGU6ICfEkOG7k25nIMO9JyxcclxuICAgIEJ0bkNhbmNlbFRpdGxlOiAnxJDDs25nJyxcclxuICAgIEZpbHRlclRpdGxlOiAnVMOsbSBraeG6v20gdGhlbycsXHJcbiAgICBBcHBseUZpbHRlcjogJ8OBcCBk4bulbmcgbOG7jWMnLFxyXG4gICAgRGV0YWlsVGl0bGU6ICdUaMO0bmcgdGluIGNoaSB0aeG6v3QnLFxyXG4gICAgUGFnZVRpdGxlOiAnVHJhbmcnLFxyXG4gICAgQWR2YW5jZWRTZWFyY2hUaXRsZTogJ1TDrG0ga2nhur9tIG7Dom5nIGNhbycsXHJcbiAgICBBZHZhbmNlZEJ0blRpdGxlOiAnVMOsbSBraeG6v20nLFxyXG4gICAgQWR2YW5jZWRCdG5DYW5jZWxUaXRsZTogJ0jhu6d5IGLhu48nLFxyXG4gICAgQWxsVGl0bGU6ICdU4bqldCBj4bqjJ1xyXG4gIH07XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgRGlyZWN0aW9uID0ge1xyXG4gICAgQVNDOiAnYXNjJyxcclxuICAgIERFU0M6ICdkZXNjJ1xyXG4gIH07XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgVGV4dEFsaWduID0ge1xyXG4gICAgTGVmdDogJ2xlZnQnLFxyXG4gICAgUmlnaHQ6ICdyaWdodCcsXHJcbiAgICBDZW50ZXI6ICdjZW50ZXInXHJcbiAgfTtcclxuXHJcbiAgcHVibGljIHN0YXRpYyBBY3Rpb24gPSB7XHJcbiAgICBFZGl0OiAnZWRpdCcsXHJcbiAgICBEZWxldGU6ICdkZWxldGUnLFxyXG4gICAgQ3VzdG9tOiAnQ3VzdG9tJ1xyXG4gIH1cclxuICBwdWJsaWMgc3RhdGljIEFjdGlvblR5cGUgPSB7XHJcbiAgICBCb3RoOiAnYm90aCcsXHJcbiAgICBUb29sYmFyOiAndG9vbGJhcicsXHJcbiAgICBJbmxpbmU6ICdpbmxpbmUnXHJcbiAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGVudW0gVGFibGVDb2x1bW5UeXBlIHtcclxuICBOdW1iZXIgPSAnbnVtYmVyJyxcclxuICBTdHJpbmcgPSAnc3RyaW5nJyxcclxuICBEYXRlID0gJ2RhdGUnLFxyXG4gIERhdGVUaW1lID0gJ2RhdGV0aW1lJyxcclxuICBEYXRlUmFuZ2UgPSAnZGF0ZXJhbmdlJyxcclxuICBEYXRlVGltZVJhbmdlID0gJ2RhdGV0aW1lcmFuZ2UnLFxyXG4gIFRpbWUgPSAndGltZScsXHJcbiAgVGltZVJhbmdlID0gJ3RpbWVyYW5nZScsXHJcbiAgQm9vbGVhbiA9ICdib29sZWFuJyxcclxuICBEZXNjcmlwdGlvbiA9ICdkZXNjcmlwdGlvbicsXHJcbiAgQ3VycmVuY3kgPSAnY3VycmVuY3knLFxyXG4gIERyb3Bkb3duID0gJ2Ryb3Bkb3duJyxcclxuICBDdXN0b20gPSAnY3VzdG9tJyxcclxufSJdfQ==