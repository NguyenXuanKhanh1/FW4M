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
export class TableColumn {
    /**
     * @param {?=} init
     */
    constructor(init) {
        Object.assign(this, init);
    }
}
if (false) {
    /** @type {?} */
    TableColumn.prototype.title;
    /** @type {?} */
    TableColumn.prototype.valueRef;
    /** @type {?} */
    TableColumn.prototype.inlineCallback;
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
    TableColumn.prototype.validationOption;
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
export class TableSorter {
}
if (false) {
    /** @type {?} */
    TableSorter.prototype.direction;
    /** @type {?} */
    TableSorter.prototype.orderBy;
    /** @type {?} */
    TableSorter.prototype.order;
}
export class TableAction {
    /**
     * @param {?=} init
     */
    constructor(init) {
        this.type = TableConstant.ActionType.Inline;
        Object.assign(this, init);
    }
}
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
export class TableText {
    constructor() {
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
}
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
export class TableMessage {
    constructor() {
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
}
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
export class TableDatetimeFormat {
    /**
     * @param {?} init
     */
    constructor(init) {
        this.format = 'MM/dd/yyyy';
        this.full = true;
        Object.assign(this, init);
    }
}
if (false) {
    /** @type {?} */
    TableDatetimeFormat.prototype.format;
    /** @type {?} */
    TableDatetimeFormat.prototype.full;
}
export class EdittedField {
    /**
     * @param {?} init
     */
    constructor(init) {
        Object.assign(this, init);
    }
}
if (false) {
    /** @type {?} */
    EdittedField.prototype.item;
    /** @type {?} */
    EdittedField.prototype.field;
    /** @type {?} */
    EdittedField.prototype.index;
}
export class ChangedCell {
    /**
     * @param {?} init
     */
    constructor(init) {
        Object.assign(this, init);
    }
}
if (false) {
    /** @type {?} */
    ChangedCell.prototype.oldValue;
    /** @type {?} */
    ChangedCell.prototype.field;
    /** @type {?} */
    ChangedCell.prototype.currentValue;
}
export class ChangedRow {
    /**
     * @param {?} init
     */
    constructor(init) {
        Object.assign(this, init);
    }
}
if (false) {
    /** @type {?} */
    ChangedRow.prototype.currentItem;
    /** @type {?} */
    ChangedRow.prototype.oldItem;
    /** @type {?} */
    ChangedRow.prototype.cells;
}
export class TableOption {
    /**
     * @param {?} init
     */
    constructor(init) {
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
}
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
const TableMode = {
    compact: 'compact',
    full: 'full',
};
export { TableMode };
export class TableConstant {
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
const TableColumnType = {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUubW9kZWwuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZnc0Yy8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL3NoYXJlZC90YWJsZS90YWJsZS5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBS0EscUNBS0M7OztJQUpDLGtDQUFrQjs7SUFDbEIscUNBQXFCOztJQUNyQixzQ0FBNkM7O0lBQzdDLHNDQUFtRTs7Ozs7QUFHckUsK0JBR0M7OztJQUZDLHlCQUFXOztJQUNYLDJCQUFxQjs7QUFHdkIsTUFBTSxPQUFPLFdBQVc7Ozs7SUE0QnRCLFlBQVksSUFBMkI7UUFDckMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDNUIsQ0FBQztDQUNGOzs7SUE5QkMsNEJBQXFCOztJQUNyQiwrQkFBcUI7O0lBQ3JCLHFDQUFxRDs7SUFDckQsZ0NBQW1COztJQUNuQixnQ0FBb0I7O0lBQ3BCLGtDQUFzQjs7SUFDdEIsNEJBQWU7O0lBQ2Ysa0NBQXFCOztJQUNyQixvQ0FBd0I7O0lBQ3hCLDRCQUFlOztJQUNmLGdDQUFtQjs7SUFDbkIsMkJBQXVCOztJQUN2QixrQ0FBc0I7O0lBQ3RCLGlDQUFxQjs7SUFDckIsdUNBQW9DOztJQUNwQywrQkFBa0Y7O0lBQ2xGLHFDQUF3Qzs7SUFDeEMsMkJBQXFCOztJQUNyQiw0Q0FLRTs7SUFDRix5QkFBWTs7SUFDWixxQ0FBd0M7O0FBTzFDLE1BQU0sT0FBTyxXQUFXO0NBSXZCOzs7SUFIQyxnQ0FBbUI7O0lBQ25CLDhCQUFpQjs7SUFDakIsNEJBQWU7O0FBR2pCLE1BQU0sT0FBTyxXQUFXOzs7O0lBV3RCLFlBQVksSUFBMkI7UUFOdkMsU0FBSSxHQUFZLGFBQWEsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDO1FBTzlDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzVCLENBQUM7Q0FDRjs7O0lBYkMseUJBQVk7O0lB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TSxFQUFFLFFBQVE7SUFDaEIsTUFBTSxFQUFFLFFBQVE7Q0FDakIsQ0FBQTtBQUNhLHdCQUFVLEdBQUc7SUFDekIsSUFBSSxFQUFFLE1BQU07SUFDWixPQUFPLEVBQUUsU0FBUztJQUNsQixNQUFNLEVBQUUsUUFBUTtDQUNqQixDQUFBOzs7SUF2REQsNkJBQWlEOztJQUNqRCxrQkFBbUM7O0lBQ25DLDZCQUErQzs7SUFDL0Msd0JBQXdEOztJQUN4RCxzQkFVRTs7SUFFRiwwQkFpQkU7O0lBRUYsd0JBR0U7O0lBRUYsd0JBSUU7O0lBRUYscUJBSUM7O0lBQ0QseUJBSUM7O0FBQ0YsQ0FBQzs7O0lBR0EsUUFBUyxRQUFRO0lBQ2pCLFFBQVMsUUFBUTtJQUNqQixNQUFPLE1BQU07SUFDYixVQUFXLFVBQVU7SUFDckIsV0FBWSxXQUFXO0lBQ3ZCLGVBQWdCLGVBQWU7SUFDL0IsTUFBTyxNQUFNO0lBQ2IsV0FBWSxXQUFXO0lBQ3ZCLFNBQVUsU0FBUztJQUNuQixhQUFjLGFBQWE7SUFDM0IsVUFBVyxVQUFVO0lBQ3JCLFVBQVcsVUFBVTtJQUNyQixRQUFTLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IFRhYmxlQ29tcG9uZW50IH0gZnJvbSAnLi90YWJsZS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBUZW1wbGF0ZVJlZiwgRWxlbWVudFJlZiwgVHlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBWYWxpZGF0aW9uT3B0aW9uIH0gZnJvbSAnLi4vdmFsaWRhdGlvbi92YWxpZGF0aW9uLm1vZGVsJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgVGFibGVFZGl0SW5saW5lIHtcclxuICBlbmFibGVkPzogYm9vbGVhbjtcclxuICBhdXRvQ29tbWl0PzogYm9vbGVhbjtcclxuICBjcmVhdGVBc3luYz86IChpdGVtOiBhbnkpID0+IE9ic2VydmFibGU8YW55PjtcclxuICB1cGRhdGVBc3luYz86IChpdGVtOiBhbnksIGNvbHVtbj86IFRhYmxlQ29sdW1uKSA9PiBPYnNlcnZhYmxlPGFueT47XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgVGFibGVDZWxsIHtcclxuICBpdGVtPzogYW55O1xyXG4gIGNvbHVtbj86IFRhYmxlQ29sdW1uO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVGFibGVDb2x1bW4ge1xyXG4gIHRpdGxlPzogKCkgPT4gc3RyaW5nO1xyXG4gIHZhbHVlUmVmPzogKCkgPT4gYW55O1xyXG4gIGlubGluZUNhbGxiYWNrPzogKGl0ZW0/OiBhbnksIGZpZWxkPzogc3RyaW5nKSA9PiBhbnk7XHJcbiAgZGlyZWN0aW9uPzogc3RyaW5nO1xyXG4gIGFsbG93U29ydD86IGJvb2xlYW47XHJcbiAgYWxsb3dGaWx0ZXI/OiBib29sZWFuO1xyXG4gIG9yZGVyPzogbnVtYmVyO1xyXG4gIGN1c3RvbUNsYXNzPzogc3RyaW5nO1xyXG4gIGRlZmF1bHRTb3J0ZXI/OiBib29sZWFuO1xyXG4gIHdpZHRoPzogbnVtYmVyO1xyXG4gIHRleHRBbGlnbj86IHN0cmluZztcclxuICB0eXBlPzogVGFibGVDb2x1bW5UeXBlO1xyXG4gIHNob3dUb29sdGlwPzogYm9vbGVhbjtcclxuICBlZGl0SW5saW5lPzogYm9vbGVhbjtcclxuICB2YWxpZGF0aW9uT3B0aW9uPzogVmFsaWRhdGlvbk9wdGlvbjtcclxuICBjYWxsYmFjaz86IChwcm92aWRlcj86IFRhYmxlQ29tcG9uZW50LCBlbGVtZW50PzogRWxlbWVudFJlZiwgJGV2ZW50PzogYW55KSA9PiBhbnk7XHJcbiAgY3VzdG9tVGVtcGxhdGU/OiAoKSA9PiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG4gIGhpZGU/OiAoKSA9PiBib29sZWFuO1xyXG4gIGRyb3Bkb3duQ29uZmlndXJhdGlvbj86IHtcclxuICAgIHNlYXJjaEZ1bmN0aW9uOiAodGV4dDogc3RyaW5nLCBpbmRleDogbnVtYmVyLCBjdXJyZW50UGFnZTogbnVtYmVyLCBwYWdlU2l6ZTogbnVtYmVyKSA9PiBPYnNlcnZhYmxlPHsgaXRlbXM6IGFueVtdLCB0b3RhbFJlY29yZHM6IG51bWJlciB9PixcclxuICAgIG11bHRpcGxlPzogYm9vbGVhbixcclxuICAgIGJpbmRMYWJlbDogc3RyaW5nLFxyXG4gICAgYmluZFZhbHVlOiBzdHJpbmcsXHJcbiAgfTtcclxuICBpZD86IHN0cmluZztcclxuICBmaWx0ZXJUZW1wbGF0ZT86ICgpID0+IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gIGNvbnN0cnVjdG9yKGluaXQ/OiBQYXJ0aWFsPFRhYmxlQ29sdW1uPikge1xyXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBpbml0KTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBUYWJsZVNvcnRlciB7XHJcbiAgZGlyZWN0aW9uPzogc3RyaW5nO1xyXG4gIG9yZGVyQnk/OiBzdHJpbmc7XHJcbiAgb3JkZXI/OiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBUYWJsZUFjdGlvbiB7XHJcbiAgaWQ/OiBzdHJpbmc7XHJcbiAgdGl0bGU/OiAoKSA9PiBzdHJpbmc7XHJcbiAgdG9vbHRpcD86ICgpID0+IHN0cmluZztcclxuICBpY29uPzogc3RyaW5nO1xyXG4gIHR5cGU/OiBzdHJpbmcgPSBUYWJsZUNvbnN0YW50LkFjdGlvblR5cGUuSW5saW5lO1xyXG4gIGN1c3RvbUNsYXNzPzogc3RyaW5nO1xyXG4gIGV4ZWN1dGVBc3luYz86IChpdGVtPzogYW55LCBlbGVtZW50PzogRWxlbWVudFJlZiwgcHJvdmlkZXI/OiBhbnksIGluZGV4PzogbnVtYmVyLCBsb2FkZWRDYWxsYmFjaz86IEZ1bmN0aW9uKSA9PiBhbnk7XHJcbiAgZGlzYWJsZWQ/OiBib29sZWFuO1xyXG4gIGhpZGU/OiAoaXRlbT86IGFueSkgPT4gYm9vbGVhbjtcclxuICBsYXp5bG9hZD86IGJvb2xlYW47XHJcbiAgY29uc3RydWN0b3IoaW5pdD86IFBhcnRpYWw8VGFibGVBY3Rpb24+KSB7XHJcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIGluaXQpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBUYWJsZVJlcXVlc3Qge1xyXG4gIHNlYXJjaFRleHQ/OiBzdHJpbmc7XHJcbiAgcGFnZVNpemU/OiBudW1iZXI7XHJcbiAgcGFnZUluZGV4PzogbnVtYmVyO1xyXG4gIHNvcnRlcnM/OiBUYWJsZVNvcnRlcltdO1xyXG4gIGRhdGE/OiBhbnk7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBUYWJsZVRleHQge1xyXG4gIHBsYWNlaG9sZGVyU2VhcmNoPzogc3RyaW5nID0gVGFibGVDb25zdGFudC5EaXNwbGF5VGV4dC5QbGFjZWhvbGRlclNlYXJjaDtcclxuICBidG5TZWFyY2g/OiBzdHJpbmcgPSBUYWJsZUNvbnN0YW50LkRpc3BsYXlUZXh0LkJ0blNlYXJjaDtcclxuICBidG5SZXNldD86IHN0cmluZyA9IFRhYmxlQ29uc3RhbnQuRGlzcGxheVRleHQuQnRuUmVzZXQ7XHJcbiAgYWN0aW9uPzogc3RyaW5nID0gVGFibGVDb25zdGFudC5EaXNwbGF5VGV4dC5BY3Rpb247XHJcbiAgc2VsZWN0UGFnZVNpemU/OiBzdHJpbmcgPSBUYWJsZUNvbnN0YW50LkRpc3BsYXlUZXh0LlNlbGVjdFBhZ2VTaXplO1xyXG4gIGRlbGV0ZVRpdGxlPzogc3RyaW5nID0gVGFibGVDb25zdGFudC5EaXNwbGF5VGV4dC5EZWxldGVUaXRsZTtcclxuICBidG5BY2NlcHRUaXRsZT86IHN0cmluZyA9IFRhYmxlQ29uc3RhbnQuRGlzcGxheVRleHQuQnRuQWNjZXB0VGl0bGU7XHJcbiAgYnRuQ2FuY2VsVGl0bGU/OiBzdHJpbmcgPSBUYWJsZUNvbnN0YW50LkRpc3BsYXlUZXh0LkJ0bkNhbmNlbFRpdGxlXHJcbiAgZmlsdGVyVGl0bGU/OiBzdHJpbmcgPSBUYWJsZUNvbnN0YW50LkRpc3BsYXlUZXh0LkZpbHRlclRpdGxlO1xyXG4gIGFwcGx5RmlsdGVyPzogc3RyaW5nID0gVGFibGVDb25zdGFudC5EaXNwbGF5VGV4dC5BcHBseUZpbHRlcjtcclxuICBkZXRhaWxUaXRsZT86IHN0cmluZyA9IFRhYmxlQ29uc3RhbnQuRGlzcGxheVRleHQuRGV0YWlsVGl0bGU7XHJcbiAgcGFnZVRpdGxlPzogc3RyaW5nID0gVGFibGVDb25zdGFudC5EaXNwbGF5VGV4dC5QYWdlVGl0bGU7XHJcbiAgYWR2YW5jZWRTZWFyY2hUaXRsZT86IHN0cmluZyA9IFRhYmxlQ29uc3RhbnQuRGlzcGxheVRleHQuQWR2YW5jZWRTZWFyY2hUaXRsZTtcclxuICBhZHZhbmNlZEJ0blRpdGxlPzogc3RyaW5nID0gVGFibGVDb25zdGFudC5EaXNwbGF5VGV4dC5BZHZhbmNlZEJ0blRpdGxlO1xyXG4gIGFkdmFuY2VkQnRuQ2FuY2VsVGl0bGU/OiBzdHJpbmcgPSBUYWJsZUNvbnN0YW50LkRpc3BsYXlUZXh0LkFkdmFuY2VkQnRuQ2FuY2VsVGl0bGU7XHJcbiAgYWxsVGl0bGU/OiBzdHJpbmcgPSBUYWJsZUNvbnN0YW50LkRpc3BsYXlUZXh0LkFsbFRpdGxlO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVGFibGVNZXNzYWdlIHtcclxuICBub3RGb3VuZE1lc3NhZ2U/OiBzdHJpbmcgPSBUYWJsZUNvbnN0YW50Lk1lc3NhZ2UuTm90Rm91bmRNZXNzYWdlO1xyXG4gIGZvdW5kTWVzc2FnZT86IHN0cmluZyA9IFRhYmxlQ29uc3RhbnQuTWVzc2FnZS5Gb3VuZE1lc3NhZ2U7XHJcbiAgaW52YWxpZEZvcm1hdE1lc3NhZ2U/OiBzdHJpbmcgPSBUYWJsZUNvbnN0YW50Lk1lc3NhZ2UuSW52YWxpZEZvcm1hdE1lc3NhZ2U7XHJcbiAgc2VsZWN0ZWRJdGVtc01lc3NhZ2U/OiBzdHJpbmcgPSBUYWJsZUNvbnN0YW50Lk1lc3NhZ2UuU2VsZWN0ZWRJdGVtc01lc3NhZ2U7XHJcbiAgY29uZmlybVNlbGVjdEFsbFJlY29yZHNNZXNzYWdlPzogc3RyaW5nID0gVGFibGVDb25zdGFudC5NZXNzYWdlLkNvbmZpcm1TZWxlY3RBbGxSZWNvcmRzTWVzc2FnZTtcclxuICBjb25maXJtQ2xlYXJBbGxSZWNvcmRzTWVzc2FnZT86IHN0cmluZyA9IFRhYmxlQ29uc3RhbnQuTWVzc2FnZS5Db25maXJtQ2xlYXJBbGxSZWNvcmRzTWVzc2FnZTtcclxuICBkZWxldGVNZXNzYWdlPzogc3RyaW5nID0gVGFibGVDb25zdGFudC5NZXNzYWdlLkRlbGV0ZU1lc3NhZ2U7XHJcbiAgbG9hZGluZ01lc3NhZ2U/OiBzdHJpbmcgPSBUYWJsZUNvbnN0YW50Lk1lc3NhZ2UuTG9hZGluZ01lc3NhZ2U7XHJcbiAgcmVmTWVzc2FnZT86IHN0cmluZyA9IFRhYmxlQ29uc3RhbnQuTWVzc2FnZS5SZWZNZXNzYWdlO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFRhYmxlUmVzcG9uc2U8VD4ge1xyXG4gIHRvdGFsUmVjb3Jkcz86IG51bWJlcjtcclxuICBpdGVtcz86IFRbXTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBUYWJsZVNlcnZpY2VQcm92aWRlciB7XHJcbiAgc2VhcmNoQXN5bmM/OiAocmVxdWVzdD86IGFueSkgPT4gT2JzZXJ2YWJsZTxhbnk+O1xyXG4gIGNyZWF0ZUFzeW5jPzogKGl0ZW06IGFueSkgPT4gT2JzZXJ2YWJsZTxhbnk+O1xyXG4gIHVwZGF0ZUFzeW5jPzogKGl0ZW06IGFueSkgPT4gT2JzZXJ2YWJsZTxhbnk+O1xyXG4gIGRlbGV0ZUFzeW5jPzogKGlkczogc3RyaW5nLCBhbGw/OiBib29sZWFuKSA9PiBPYnNlcnZhYmxlPGFueT47XHJcbiAgZXhwb3J0QXN5bmM/OiAocmVxdWVzdD86IGFueSkgPT4gT2JzZXJ2YWJsZTxhbnk+O1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVGFibGVEYXRldGltZUZvcm1hdCB7XHJcbiAgZm9ybWF0OiBzdHJpbmcgPSAnTU0vZGQveXl5eSc7XHJcbiAgZnVsbDogYm9vbGVhbiA9IHRydWU7XHJcbiAgY29uc3RydWN0b3IoaW5pdDogUGFydGlhbDxUYWJsZURhdGV0aW1lRm9ybWF0Pikge1xyXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBpbml0KTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBFZGl0dGVkRmllbGQge1xyXG4gIGl0ZW0/OiBhbnk7XHJcbiAgZmllbGQ/OiBzdHJpbmc7XHJcbiAgaW5kZXg/OiBudW1iZXI7XHJcbiAgY29uc3RydWN0b3IoaW5pdDogUGFydGlhbDxFZGl0dGVkRmllbGQ+KSB7XHJcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIGluaXQpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIENoYW5nZWRDZWxsIHtcclxuICBvbGRWYWx1ZT86IGFueTtcclxuICBmaWVsZD86IHN0cmluZztcclxuICBjdXJyZW50VmFsdWU/OiBhbnk7XHJcbiAgY29uc3RydWN0b3IoaW5pdDogUGFydGlhbDxDaGFuZ2VkQ2VsbD4pIHtcclxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgaW5pdCk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQ2hhbmdlZFJvdyB7XHJcbiAgY3VycmVudEl0ZW0/OiBhbnk7XHJcbiAgb2xkSXRlbT86IGFueTtcclxuICBjZWxscz86IENoYW5nZWRDZWxsW107XHJcbiAgY29uc3RydWN0b3IoaW5pdDogUGFydGlhbDxDaGFuZ2VkUm93Pikge1xyXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBpbml0KTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBUYWJsZU9wdGlvbiB7XHJcbiAgc29ydD86IChhOiBhbnksIGI6IGFueSwgb3JkZXJCeTogc3RyaW5nKSA9PiBudW1iZXI7XHJcbiAgbXVsdGlwbGU/OiBib29sZWFuID0gdHJ1ZTtcclxuICBkYXRldGltZUZvcm1hdD86IFRhYmxlRGF0ZXRpbWVGb3JtYXQgPSBuZXcgVGFibGVEYXRldGltZUZvcm1hdCh7fSk7XHJcbiAgcGFnaW5nPzogYm9vbGVhbjtcclxuICBzZWxlY3RlZEl0ZW1zPzogYW55W107XHJcbiAgc2VydmljZVByb3ZpZGVyPzogVGFibGVTZXJ2aWNlUHJvdmlkZXI7XHJcbiAgbG9jYWxEYXRhPzogKCkgPT4gT2JzZXJ2YWJsZTxhbnlbXT47XHJcbiAgcmVxdWVzdD86IFRhYmxlUmVxdWVzdDtcclxuICBtYWluQ29sdW1uczogVGFibGVDb2x1bW5bXSA9IFtdO1xyXG4gIGRpc3BsYXlUZXh0PzogVGFibGVUZXh0O1xyXG4gIG1lc3NhZ2U/OiBUYWJsZU1lc3NhZ2U7XHJcbiAgY29tcG9uZW50Q2xhc3M/OiBzdHJpbmc7XHJcbiAgYWN0aW9ucz86IFRhYmxlQWN0aW9uW10gPSBbXTtcclxuICB0b3BCdXR0b25zPzogVGFibGVBY3Rpb25bXSA9IFtdO1xyXG4gIHJvd0RldGFpbFRlbXBsYXRlPzogVHlwZTxhbnk+O1xyXG4gIGV4cGFuZEZpbHRlckFyZWE/OiBib29sZWFuO1xyXG4gIHBhZ2VTaXplcz86IG51bWJlcltdO1xyXG4gIGRlZmF1bHRQYWdlU2l6ZT86IG51bWJlciA9IDU7XHJcbiAgdG90YWxUb29sYmFySXRlbT86IG51bWJlciA9IDU7XHJcbiAgbWF4UGFnZT86IG51bWJlcjtcclxuICBrZXk/OiBzdHJpbmc7XHJcbiAgdGl0bGU/OiBzdHJpbmc7XHJcbiAgbWF4TGVuZ2h0ZXh0PzogbnVtYmVyO1xyXG4gIG1vZGU6IFRhYmxlTW9kZSA9IFRhYmxlTW9kZS5mdWxsO1xyXG4gIGhpZGVTZXF1ZW5jZUNvbHVtbj86IGJvb2xlYW4gPSBmYWxzZTtcclxuICBoaWRlQ2hlY2tib3hDb2x1bW4/OiBib29sZWFuID0gZmFsc2U7XHJcbiAgZGlzcGxheU1vZGU/OiAnbGlzdCcgfCAnZnVsbCc7XHJcbiAgZGVmYXVsdE9yZGVyQnk/OiBzdHJpbmc7XHJcbiAgZGVmYXV0T3JkZXJEaXJlY3Rpb24/OiBzdHJpbmc7XHJcbiAgaW5saW5lRWRpdD86IGJvb2xlYW4gPSBmYWxzZTtcclxuICBzZWFyY2hGaWVsZHM/OiBzdHJpbmdbXTtcclxuICBjb25zdHJ1Y3Rvcihpbml0OiBQYXJ0aWFsPFRhYmxlT3B0aW9uPikge1xyXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBpbml0KTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIFRhYmxlTW9kZSB7XHJcbiAgY29tcGFjdCA9ICdjb21wYWN0JyxcclxuICBmdWxsID0gJ2Z1bGwnXHJcbn1cclxuXHJcblxyXG5leHBvcnQgY2xhc3MgVGFibGVDb25zdGFudCB7XHJcbiAgcHVibGljIHN0YXRpYyBDb21wb25lbnRDbGFzczogc3RyaW5nID0gJ3ByaW1hcnknO1xyXG4gIHB1YmxpYyBzdGF0aWMgS2V5OiBzdHJpbmcgPSAnbmFtZSc7XHJcbiAgcHVibGljIHN0YXRpYyBEYXRldGltZUxvY2F0ZTogc3RyaW5nID0gJ3ZpLVZOJztcclxuICBwdWJsaWMgc3RhdGljIFBhZ2VTaXplczogbnVtYmVyW10gPSBbNSwgMTAsIDE1LCAyMCwgNTBdO1xyXG4gIHB1YmxpYyBzdGF0aWMgTWVzc2FnZSA9IHtcclxuICAgIE5vdEZvdW5kTWVzc2FnZTogJ0NoxrBhIGPDsyB0aMO0bmcgdGluJyxcclxuICAgIEludmFsaWRGb3JtYXRNZXNzYWdlOiAna2jDtG5nIGjhu6NwIGzhu4cuJyxcclxuICAgIEZvdW5kTWVzc2FnZTogJ1TDrG0gdGjhuqV5IDxzcGFuIGNsYXNzPVwiY29uZmlybS1oaWdobGlnaHRcIj5bMF08L3NwYW4+IGvhur90IHF14bqjLicsXHJcbiAgICBTZWxlY3RlZEl0ZW1zTWVzc2FnZTogJ8SQw6MgY2jhu41uIDxzcGFuIGNsYXNzPVwiaGlnaGxpZ2h0XCI+WzBdPC9zcGFuPiBi4bqjbiBnaGkuJyxcclxuICAgIENvbmZpcm1TZWxlY3RBbGxSZWNvcmRzTWVzc2FnZTogJzxzcGFuIGNsYXNzPVwiY29uZmlybS1oaWdobGlnaHRcIj5DaOG7jW4gdOG6pXQgY+G6oyBr4bq/dCBxdeG6oz88L3NwYW4+JyxcclxuICAgIENvbmZpcm1DbGVhckFsbFJlY29yZHNNZXNzYWdlOiAnPHNwYW4gY2xhc3M9XCJjb25maXJtLWhpZ2hsaWdodCB0ZXh0LWRhbmdlclwiPkLhu48gY2jhu41uIHThuqV0IGPhuqMgPC9zcGFuPj8nLFxyXG4gICAgRGVsZXRlTWVzc2FnZTogJ0LhuqFuIGPDsyBjaOG6r2MgY2jhuq9uIG114buRbiB4w7NhIDxzcGFuIGNsYXNzPVwiY29uZmlybS1oaWdobGlnaHQgdGV4dC1kYW5nZXJcIj5bMF08L3NwYW4+IGtow7RuZz8nLFxyXG4gICAgTG9hZGluZ01lc3NhZ2U6ICfEkGFuZyB04bqjaSBk4buvIGxp4buHdS4uLicsXHJcbiAgICBSZWZNZXNzYWdlOiAnbGnDqm4gcXVhbiB04bubaSdcclxuICB9O1xyXG5cclxuICBwdWJsaWMgc3RhdGljIERpc3BsYXlUZXh0ID0ge1xyXG4gICAgUGxhY2Vob2xkZXJTZWFyY2g6ICdOaOG6rXAgdOG7qyBraMOzYSB0w6xtIGtp4bq/bS4uLicsXHJcbiAgICBCdG5SZXNldDogJ0tow7RpIHBo4bulYycsXHJcbiAgICBCdG5TZWFyY2g6ICdUw6xtIGtp4bq/bScsXHJcbiAgICBBY3Rpb246ICdIw6BuaCDEkeG7mW5nJyxcclxuICAgIFNlbGVjdFBhZ2VTaXplOiAnSGnhu4NuIHRo4buLJyxcclxuICAgIERlbGV0ZVRpdGxlOiAnWMOzYScsXHJcbiAgICBCdG5BY2NlcHRUaXRsZTogJ8SQ4buTbmcgw70nLFxyXG4gICAgQnRuQ2FuY2VsVGl0bGU6ICfEkMOzbmcnLFxyXG4gICAgRmlsdGVyVGl0bGU6ICdUw6xtIGtp4bq/bSB0aGVvJyxcclxuICAgIEFwcGx5RmlsdGVyOiAnw4FwIGThu6VuZyBs4buNYycsXHJcbiAgICBEZXRhaWxUaXRsZTogJ1Row7RuZyB0aW4gY2hpIHRp4bq/dCcsXHJcbiAgICBQYWdlVGl0bGU6ICdUcmFuZycsXHJcbiAgICBBZHZhbmNlZFNlYXJjaFRpdGxlOiAnVMOsbSBraeG6v20gbsOibmcgY2FvJyxcclxuICAgIEFkdmFuY2VkQnRuVGl0bGU6ICdUw6xtIGtp4bq/bScsXHJcbiAgICBBZHZhbmNlZEJ0bkNhbmNlbFRpdGxlOiAnSOG7p3kgYuG7jycsXHJcbiAgICBBbGxUaXRsZTogJ1ThuqV0IGPhuqMnXHJcbiAgfTtcclxuXHJcbiAgcHVibGljIHN0YXRpYyBEaXJlY3Rpb24gPSB7XHJcbiAgICBBU0M6ICdhc2MnLFxyXG4gICAgREVTQzogJ2Rlc2MnXHJcbiAgfTtcclxuXHJcbiAgcHVibGljIHN0YXRpYyBUZXh0QWxpZ24gPSB7XHJcbiAgICBMZWZ0OiAnbGVmdCcsXHJcbiAgICBSaWdodDogJ3JpZ2h0JyxcclxuICAgIENlbnRlcjogJ2NlbnRlcidcclxuICB9O1xyXG5cclxuICBwdWJsaWMgc3RhdGljIEFjdGlvbiA9IHtcclxuICAgIEVkaXQ6ICdlZGl0JyxcclxuICAgIERlbGV0ZTogJ2RlbGV0ZScsXHJcbiAgICBDdXN0b206ICdDdXN0b20nXHJcbiAgfVxyXG4gIHB1YmxpYyBzdGF0aWMgQWN0aW9uVHlwZSA9IHtcclxuICAgIEJvdGg6ICdib3RoJyxcclxuICAgIFRvb2xiYXI6ICd0b29sYmFyJyxcclxuICAgIElubGluZTogJ2lubGluZSdcclxuICB9XHJcbn07XHJcblxyXG5leHBvcnQgZW51bSBUYWJsZUNvbHVtblR5cGUge1xyXG4gIE51bWJlciA9ICdudW1iZXInLFxyXG4gIFN0cmluZyA9ICdzdHJpbmcnLFxyXG4gIERhdGUgPSAnZGF0ZScsXHJcbiAgRGF0ZVRpbWUgPSAnZGF0ZXRpbWUnLFxyXG4gIERhdGVSYW5nZSA9ICdkYXRlcmFuZ2UnLFxyXG4gIERhdGVUaW1lUmFuZ2UgPSAnZGF0ZXRpbWVyYW5nZScsXHJcbiAgVGltZSA9ICd0aW1lJyxcclxuICBUaW1lUmFuZ2UgPSAndGltZXJhbmdlJyxcclxuICBCb29sZWFuID0gJ2Jvb2xlYW4nLFxyXG4gIERlc2NyaXB0aW9uID0gJ2Rlc2NyaXB0aW9uJyxcclxuICBDdXJyZW5jeSA9ICdjdXJyZW5jeScsXHJcbiAgRHJvcGRvd24gPSAnZHJvcGRvd24nLFxyXG4gIEN1c3RvbSA9ICdjdXN0b20nLFxyXG59Il19