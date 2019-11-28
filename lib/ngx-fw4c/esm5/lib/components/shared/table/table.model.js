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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUubW9kZWwuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZnc0Yy8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL3NoYXJlZC90YWJsZS90YWJsZS5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBS0EscUNBS0M7OztJQUpDLGtDQUFrQjs7SUFDbEIscUNBQXFCOztJQUNyQixzQ0FBNkM7O0lBQzdDLHNDQUFtRTs7Ozs7QUFHckUsK0JBR0M7OztJQUZDLHlCQUFXOztJQUNYLDJCQUFxQjs7QUFHdkI7SUE0QkUscUJBQVksSUFBMkI7UUFDckMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUNILGtCQUFDO0FBQUQsQ0FBQyxBQS9CRCxJQStCQzs7OztJQTlCQyw0QkFBcUI7O0lBQ3JCLCtCQUFxQjs7SUFDckIscUNBQXFEOztJQUNyRCxnQ0FBbUI7O0lBQ25CLGdDQUFvQjs7SUFDcEIsa0NBQXNCOztJQUN0Qiw0QkFBZTs7SUFDZixrQ0FBcUI7O0lBQ3JCLG9DQUF3Qjs7SUFDeEIsNEJBQWU7O0lBQ2YsZ0NBQW1COztJQUNuQiwyQkFBdUI7O0lBQ3ZCLGtDQUFzQjs7SUFDdEIsaUNBQXFCOztJQUNyQix1Q0FBb0M7O0lBQ3BDLCtCQUFrRjs7SUFDbEYscUNBQXdDOztJQUN4QywyQkFBcUI7O0lBQ3JCLDRDQUtFOztJQUNGLHlCQUFZOztJQUNaLHFDQUF3Qzs7QUFPMUM7SUFBQTtJQUlBLENBQUM7SUFBRCxrQkFBQztBQUFELENBQUMsQUFKRCxJQUlDOzs7O0lBSEMsZ0NBQW1COztJQUNuQiw4QkFBaUI7O0lBQ2pCLDRCQUFlOztBQUdqQjtJQVdFLHFCQUFZLElBQTJCO1FBTnZDLFNBQUksR0FBWSxhQUFhLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQztRQU85QyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM1QixDQUFDO0lB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QUN4QixJQUFJLEVBQUUsTUFBTTtRQUNaLEtBQUssRUFBRSxPQUFPO1FBQ2QsTUFBTSxFQUFFLFFBQVE7S0FDakIsQ0FBQztJQUVZLG9CQUFNLEdBQUc7UUFDckIsSUFBSSxFQUFFLE1BQU07UUFDWixNQUFNLEVBQUUsUUFBUTtRQUNoQixNQUFNLEVBQUUsUUFBUTtLQUNqQixDQUFBO0lBQ2Esd0JBQVUsR0FBRztRQUN6QixJQUFJLEVBQUUsTUFBTTtRQUNaLE9BQU8sRUFBRSxTQUFTO1FBQ2xCLE1BQU0sRUFBRSxRQUFRO0tBQ2pCLENBQUE7SUFDSCxvQkFBQztDQUFBLEFBekRELElBeURDO1NBekRZLGFBQWE7OztJQUN4Qiw2QkFBaUQ7O0lBQ2pELGtCQUFtQzs7SUFDbkMsNkJBQStDOztJQUMvQyx3QkFBd0Q7O0lBQ3hELHNCQVVFOztJQUVGLDBCQWlCRTs7SUFFRix3QkFHRTs7SUFFRix3QkFJRTs7SUFFRixxQkFJQzs7SUFDRCx5QkFJQzs7QUFDRixDQUFDOzs7SUFHQSxRQUFTLFFBQVE7SUFDakIsUUFBUyxRQUFRO0lBQ2pCLE1BQU8sTUFBTTtJQUNiLFVBQVcsVUFBVTtJQUNyQixXQUFZLFdBQVc7SUFDdkIsZUFBZ0IsZUFBZTtJQUMvQixNQUFPLE1BQU07SUFDYixXQUFZLFdBQVc7SUFDdkIsU0FBVSxTQUFTO0lBQ25CLGFBQWMsYUFBYTtJQUMzQixVQUFXLFVBQVU7SUFDckIsVUFBVyxVQUFVO0lBQ3JCLFFBQVMsUUFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgVGFibGVDb21wb25lbnQgfSBmcm9tICcuL3RhYmxlLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFRlbXBsYXRlUmVmLCBFbGVtZW50UmVmLCBUeXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFZhbGlkYXRpb25PcHRpb24gfSBmcm9tICcuLi92YWxpZGF0aW9uL3ZhbGlkYXRpb24ubW9kZWwnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBUYWJsZUVkaXRJbmxpbmUge1xyXG4gIGVuYWJsZWQ/OiBib29sZWFuO1xyXG4gIGF1dG9Db21taXQ/OiBib29sZWFuO1xyXG4gIGNyZWF0ZUFzeW5jPzogKGl0ZW06IGFueSkgPT4gT2JzZXJ2YWJsZTxhbnk+O1xyXG4gIHVwZGF0ZUFzeW5jPzogKGl0ZW06IGFueSwgY29sdW1uPzogVGFibGVDb2x1bW4pID0+IE9ic2VydmFibGU8YW55PjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBUYWJsZUNlbGwge1xyXG4gIGl0ZW0/OiBhbnk7XHJcbiAgY29sdW1uPzogVGFibGVDb2x1bW47XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBUYWJsZUNvbHVtbiB7XHJcbiAgdGl0bGU/OiAoKSA9PiBzdHJpbmc7XHJcbiAgdmFsdWVSZWY/OiAoKSA9PiBhbnk7XHJcbiAgaW5saW5lQ2FsbGJhY2s/OiAoaXRlbT86IGFueSwgZmllbGQ/OiBzdHJpbmcpID0+IGFueTtcclxuICBkaXJlY3Rpb24/OiBzdHJpbmc7XHJcbiAgYWxsb3dTb3J0PzogYm9vbGVhbjtcclxuICBhbGxvd0ZpbHRlcj86IGJvb2xlYW47XHJcbiAgb3JkZXI/OiBudW1iZXI7XHJcbiAgY3VzdG9tQ2xhc3M/OiBzdHJpbmc7XHJcbiAgZGVmYXVsdFNvcnRlcj86IGJvb2xlYW47XHJcbiAgd2lkdGg/OiBudW1iZXI7XHJcbiAgdGV4dEFsaWduPzogc3RyaW5nO1xyXG4gIHR5cGU/OiBUYWJsZUNvbHVtblR5cGU7XHJcbiAgc2hvd1Rvb2x0aXA/OiBib29sZWFuO1xyXG4gIGVkaXRJbmxpbmU/OiBib29sZWFuO1xyXG4gIHZhbGlkYXRpb25PcHRpb24/OiBWYWxpZGF0aW9uT3B0aW9uO1xyXG4gIGNhbGxiYWNrPzogKHByb3ZpZGVyPzogVGFibGVDb21wb25lbnQsIGVsZW1lbnQ/OiBFbGVtZW50UmVmLCAkZXZlbnQ/OiBhbnkpID0+IGFueTtcclxuICBjdXN0b21UZW1wbGF0ZT86ICgpID0+IFRlbXBsYXRlUmVmPGFueT47XHJcbiAgaGlkZT86ICgpID0+IGJvb2xlYW47XHJcbiAgZHJvcGRvd25Db25maWd1cmF0aW9uPzoge1xyXG4gICAgc2VhcmNoRnVuY3Rpb246ICh0ZXh0OiBzdHJpbmcsIGluZGV4OiBudW1iZXIsIGN1cnJlbnRQYWdlOiBudW1iZXIsIHBhZ2VTaXplOiBudW1iZXIpID0+IE9ic2VydmFibGU8eyBpdGVtczogYW55W10sIHRvdGFsUmVjb3JkczogbnVtYmVyIH0+LFxyXG4gICAgbXVsdGlwbGU/OiBib29sZWFuLFxyXG4gICAgYmluZExhYmVsOiBzdHJpbmcsXHJcbiAgICBiaW5kVmFsdWU6IHN0cmluZyxcclxuICB9O1xyXG4gIGlkPzogc3RyaW5nO1xyXG4gIGZpbHRlclRlbXBsYXRlPzogKCkgPT4gVGVtcGxhdGVSZWY8YW55PjtcclxuXHJcbiAgY29uc3RydWN0b3IoaW5pdD86IFBhcnRpYWw8VGFibGVDb2x1bW4+KSB7XHJcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIGluaXQpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFRhYmxlU29ydGVyIHtcclxuICBkaXJlY3Rpb24/OiBzdHJpbmc7XHJcbiAgb3JkZXJCeT86IHN0cmluZztcclxuICBvcmRlcj86IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFRhYmxlQWN0aW9uIHtcclxuICBpZD86IHN0cmluZztcclxuICB0aXRsZT86ICgpID0+IHN0cmluZztcclxuICB0b29sdGlwPzogKCkgPT4gc3RyaW5nO1xyXG4gIGljb24/OiBzdHJpbmc7XHJcbiAgdHlwZT86IHN0cmluZyA9IFRhYmxlQ29uc3RhbnQuQWN0aW9uVHlwZS5JbmxpbmU7XHJcbiAgY3VzdG9tQ2xhc3M/OiBzdHJpbmc7XHJcbiAgZXhlY3V0ZUFzeW5jPzogKGl0ZW0/OiBhbnksIGVsZW1lbnQ/OiBFbGVtZW50UmVmLCBwcm92aWRlcj86IGFueSwgaW5kZXg/OiBudW1iZXIsIGxvYWRlZENhbGxiYWNrPzogRnVuY3Rpb24pID0+IGFueTtcclxuICBkaXNhYmxlZD86IGJvb2xlYW47XHJcbiAgaGlkZT86IChpdGVtPzogYW55KSA9PiBib29sZWFuO1xyXG4gIGxhenlsb2FkPzogYm9vbGVhbjtcclxuICBjb25zdHJ1Y3Rvcihpbml0PzogUGFydGlhbDxUYWJsZUFjdGlvbj4pIHtcclxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgaW5pdCk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFRhYmxlUmVxdWVzdCB7XHJcbiAgc2VhcmNoVGV4dD86IHN0cmluZztcclxuICBwYWdlU2l6ZT86IG51bWJlcjtcclxuICBwYWdlSW5kZXg/OiBudW1iZXI7XHJcbiAgc29ydGVycz86IFRhYmxlU29ydGVyW107XHJcbiAgZGF0YT86IGFueTtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFRhYmxlVGV4dCB7XHJcbiAgcGxhY2Vob2xkZXJTZWFyY2g/OiBzdHJpbmcgPSBUYWJsZUNvbnN0YW50LkRpc3BsYXlUZXh0LlBsYWNlaG9sZGVyU2VhcmNoO1xyXG4gIGJ0blNlYXJjaD86IHN0cmluZyA9IFRhYmxlQ29uc3RhbnQuRGlzcGxheVRleHQuQnRuU2VhcmNoO1xyXG4gIGJ0blJlc2V0Pzogc3RyaW5nID0gVGFibGVDb25zdGFudC5EaXNwbGF5VGV4dC5CdG5SZXNldDtcclxuICBhY3Rpb24/OiBzdHJpbmcgPSBUYWJsZUNvbnN0YW50LkRpc3BsYXlUZXh0LkFjdGlvbjtcclxuICBzZWxlY3RQYWdlU2l6ZT86IHN0cmluZyA9IFRhYmxlQ29uc3RhbnQuRGlzcGxheVRleHQuU2VsZWN0UGFnZVNpemU7XHJcbiAgZGVsZXRlVGl0bGU/OiBzdHJpbmcgPSBUYWJsZUNvbnN0YW50LkRpc3BsYXlUZXh0LkRlbGV0ZVRpdGxlO1xyXG4gIGJ0bkFjY2VwdFRpdGxlPzogc3RyaW5nID0gVGFibGVDb25zdGFudC5EaXNwbGF5VGV4dC5CdG5BY2NlcHRUaXRsZTtcclxuICBidG5DYW5jZWxUaXRsZT86IHN0cmluZyA9IFRhYmxlQ29uc3RhbnQuRGlzcGxheVRleHQuQnRuQ2FuY2VsVGl0bGVcclxuICBmaWx0ZXJUaXRsZT86IHN0cmluZyA9IFRhYmxlQ29uc3RhbnQuRGlzcGxheVRleHQuRmlsdGVyVGl0bGU7XHJcbiAgYXBwbHlGaWx0ZXI/OiBzdHJpbmcgPSBUYWJsZUNvbnN0YW50LkRpc3BsYXlUZXh0LkFwcGx5RmlsdGVyO1xyXG4gIGRldGFpbFRpdGxlPzogc3RyaW5nID0gVGFibGVDb25zdGFudC5EaXNwbGF5VGV4dC5EZXRhaWxUaXRsZTtcclxuICBwYWdlVGl0bGU/OiBzdHJpbmcgPSBUYWJsZUNvbnN0YW50LkRpc3BsYXlUZXh0LlBhZ2VUaXRsZTtcclxuICBhZHZhbmNlZFNlYXJjaFRpdGxlPzogc3RyaW5nID0gVGFibGVDb25zdGFudC5EaXNwbGF5VGV4dC5BZHZhbmNlZFNlYXJjaFRpdGxlO1xyXG4gIGFkdmFuY2VkQnRuVGl0bGU/OiBzdHJpbmcgPSBUYWJsZUNvbnN0YW50LkRpc3BsYXlUZXh0LkFkdmFuY2VkQnRuVGl0bGU7XHJcbiAgYWR2YW5jZWRCdG5DYW5jZWxUaXRsZT86IHN0cmluZyA9IFRhYmxlQ29uc3RhbnQuRGlzcGxheVRleHQuQWR2YW5jZWRCdG5DYW5jZWxUaXRsZTtcclxuICBhbGxUaXRsZT86IHN0cmluZyA9IFRhYmxlQ29uc3RhbnQuRGlzcGxheVRleHQuQWxsVGl0bGU7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBUYWJsZU1lc3NhZ2Uge1xyXG4gIG5vdEZvdW5kTWVzc2FnZT86IHN0cmluZyA9IFRhYmxlQ29uc3RhbnQuTWVzc2FnZS5Ob3RGb3VuZE1lc3NhZ2U7XHJcbiAgZm91bmRNZXNzYWdlPzogc3RyaW5nID0gVGFibGVDb25zdGFudC5NZXNzYWdlLkZvdW5kTWVzc2FnZTtcclxuICBpbnZhbGlkRm9ybWF0TWVzc2FnZT86IHN0cmluZyA9IFRhYmxlQ29uc3RhbnQuTWVzc2FnZS5JbnZhbGlkRm9ybWF0TWVzc2FnZTtcclxuICBzZWxlY3RlZEl0ZW1zTWVzc2FnZT86IHN0cmluZyA9IFRhYmxlQ29uc3RhbnQuTWVzc2FnZS5TZWxlY3RlZEl0ZW1zTWVzc2FnZTtcclxuICBjb25maXJtU2VsZWN0QWxsUmVjb3Jkc01lc3NhZ2U/OiBzdHJpbmcgPSBUYWJsZUNvbnN0YW50Lk1lc3NhZ2UuQ29uZmlybVNlbGVjdEFsbFJlY29yZHNNZXNzYWdlO1xyXG4gIGNvbmZpcm1DbGVhckFsbFJlY29yZHNNZXNzYWdlPzogc3RyaW5nID0gVGFibGVDb25zdGFudC5NZXNzYWdlLkNvbmZpcm1DbGVhckFsbFJlY29yZHNNZXNzYWdlO1xyXG4gIGRlbGV0ZU1lc3NhZ2U/OiBzdHJpbmcgPSBUYWJsZUNvbnN0YW50Lk1lc3NhZ2UuRGVsZXRlTWVzc2FnZTtcclxuICBsb2FkaW5nTWVzc2FnZT86IHN0cmluZyA9IFRhYmxlQ29uc3RhbnQuTWVzc2FnZS5Mb2FkaW5nTWVzc2FnZTtcclxuICByZWZNZXNzYWdlPzogc3RyaW5nID0gVGFibGVDb25zdGFudC5NZXNzYWdlLlJlZk1lc3NhZ2U7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgVGFibGVSZXNwb25zZTxUPiB7XHJcbiAgdG90YWxSZWNvcmRzPzogbnVtYmVyO1xyXG4gIGl0ZW1zPzogVFtdO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFRhYmxlU2VydmljZVByb3ZpZGVyIHtcclxuICBzZWFyY2hBc3luYz86IChyZXF1ZXN0PzogYW55KSA9PiBPYnNlcnZhYmxlPGFueT47XHJcbiAgY3JlYXRlQXN5bmM/OiAoaXRlbTogYW55KSA9PiBPYnNlcnZhYmxlPGFueT47XHJcbiAgdXBkYXRlQXN5bmM/OiAoaXRlbTogYW55KSA9PiBPYnNlcnZhYmxlPGFueT47XHJcbiAgZGVsZXRlQXN5bmM/OiAoaWRzOiBzdHJpbmcsIGFsbD86IGJvb2xlYW4pID0+IE9ic2VydmFibGU8YW55PjtcclxuICBleHBvcnRBc3luYz86IChyZXF1ZXN0PzogYW55KSA9PiBPYnNlcnZhYmxlPGFueT47XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBUYWJsZURhdGV0aW1lRm9ybWF0IHtcclxuICBmb3JtYXQ6IHN0cmluZyA9ICdNTS9kZC95eXl5JztcclxuICBmdWxsOiBib29sZWFuID0gdHJ1ZTtcclxuICBjb25zdHJ1Y3Rvcihpbml0OiBQYXJ0aWFsPFRhYmxlRGF0ZXRpbWVGb3JtYXQ+KSB7XHJcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIGluaXQpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEVkaXR0ZWRGaWVsZCB7XHJcbiAgaXRlbT86IGFueTtcclxuICBmaWVsZD86IHN0cmluZztcclxuICBpbmRleD86IG51bWJlcjtcclxuICBjb25zdHJ1Y3Rvcihpbml0OiBQYXJ0aWFsPEVkaXR0ZWRGaWVsZD4pIHtcclxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgaW5pdCk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQ2hhbmdlZENlbGwge1xyXG4gIG9sZFZhbHVlPzogYW55O1xyXG4gIGZpZWxkPzogc3RyaW5nO1xyXG4gIGN1cnJlbnRWYWx1ZT86IGFueTtcclxuICBjb25zdHJ1Y3Rvcihpbml0OiBQYXJ0aWFsPENoYW5nZWRDZWxsPikge1xyXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBpbml0KTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBDaGFuZ2VkUm93IHtcclxuICBjdXJyZW50SXRlbT86IGFueTtcclxuICBvbGRJdGVtPzogYW55O1xyXG4gIGNlbGxzPzogQ2hhbmdlZENlbGxbXTtcclxuICBjb25zdHJ1Y3Rvcihpbml0OiBQYXJ0aWFsPENoYW5nZWRSb3c+KSB7XHJcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIGluaXQpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFRhYmxlT3B0aW9uIHtcclxuICBzb3J0PzogKGE6IGFueSwgYjogYW55LCBvcmRlckJ5OiBzdHJpbmcpID0+IG51bWJlcjtcclxuICBtdWx0aXBsZT86IGJvb2xlYW4gPSB0cnVlO1xyXG4gIGRhdGV0aW1lRm9ybWF0PzogVGFibGVEYXRldGltZUZvcm1hdCA9IG5ldyBUYWJsZURhdGV0aW1lRm9ybWF0KHt9KTtcclxuICBwYWdpbmc/OiBib29sZWFuO1xyXG4gIHNlbGVjdGVkSXRlbXM/OiBhbnlbXTtcclxuICBzZXJ2aWNlUHJvdmlkZXI/OiBUYWJsZVNlcnZpY2VQcm92aWRlcjtcclxuICBsb2NhbERhdGE/OiAoKSA9PiBPYnNlcnZhYmxlPGFueVtdPjtcclxuICByZXF1ZXN0PzogVGFibGVSZXF1ZXN0O1xyXG4gIG1haW5Db2x1bW5zOiBUYWJsZUNvbHVtbltdID0gW107XHJcbiAgZGlzcGxheVRleHQ/OiBUYWJsZVRleHQ7XHJcbiAgbWVzc2FnZT86IFRhYmxlTWVzc2FnZTtcclxuICBjb21wb25lbnRDbGFzcz86IHN0cmluZztcclxuICBhY3Rpb25zPzogVGFibGVBY3Rpb25bXSA9IFtdO1xyXG4gIHRvcEJ1dHRvbnM/OiBUYWJsZUFjdGlvbltdID0gW107XHJcbiAgcm93RGV0YWlsVGVtcGxhdGU/OiBUeXBlPGFueT47XHJcbiAgZXhwYW5kRmlsdGVyQXJlYT86IGJvb2xlYW47XHJcbiAgcGFnZVNpemVzPzogbnVtYmVyW107XHJcbiAgZGVmYXVsdFBhZ2VTaXplPzogbnVtYmVyID0gNTtcclxuICB0b3RhbFRvb2xiYXJJdGVtPzogbnVtYmVyID0gNTtcclxuICBtYXhQYWdlPzogbnVtYmVyO1xyXG4gIGtleT86IHN0cmluZztcclxuICB0aXRsZT86IHN0cmluZztcclxuICBtYXhMZW5naHRleHQ/OiBudW1iZXI7XHJcbiAgbW9kZTogVGFibGVNb2RlID0gVGFibGVNb2RlLmZ1bGw7XHJcbiAgaGlkZVNlcXVlbmNlQ29sdW1uPzogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIGhpZGVDaGVja2JveENvbHVtbj86IGJvb2xlYW4gPSBmYWxzZTtcclxuICBkaXNwbGF5TW9kZT86ICdsaXN0JyB8ICdmdWxsJztcclxuICBkZWZhdWx0T3JkZXJCeT86IHN0cmluZztcclxuICBkZWZhdXRPcmRlckRpcmVjdGlvbj86IHN0cmluZztcclxuICBpbmxpbmVFZGl0PzogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIHNlYXJjaEZpZWxkcz86IHN0cmluZ1tdO1xyXG4gIGNvbnN0cnVjdG9yKGluaXQ6IFBhcnRpYWw8VGFibGVPcHRpb24+KSB7XHJcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIGluaXQpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGVudW0gVGFibGVNb2RlIHtcclxuICBjb21wYWN0ID0gJ2NvbXBhY3QnLFxyXG4gIGZ1bGwgPSAnZnVsbCdcclxufVxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBUYWJsZUNvbnN0YW50IHtcclxuICBwdWJsaWMgc3RhdGljIENvbXBvbmVudENsYXNzOiBzdHJpbmcgPSAncHJpbWFyeSc7XHJcbiAgcHVibGljIHN0YXRpYyBLZXk6IHN0cmluZyA9ICduYW1lJztcclxuICBwdWJsaWMgc3RhdGljIERhdGV0aW1lTG9jYXRlOiBzdHJpbmcgPSAndmktVk4nO1xyXG4gIHB1YmxpYyBzdGF0aWMgUGFnZVNpemVzOiBudW1iZXJbXSA9IFs1LCAxMCwgMTUsIDIwLCA1MF07XHJcbiAgcHVibGljIHN0YXRpYyBNZXNzYWdlID0ge1xyXG4gICAgTm90Rm91bmRNZXNzYWdlOiAnQ2jGsGEgY8OzIHRow7RuZyB0aW4nLFxyXG4gICAgSW52YWxpZEZvcm1hdE1lc3NhZ2U6ICdraMO0bmcgaOG7o3AgbOG7hy4nLFxyXG4gICAgRm91bmRNZXNzYWdlOiAnVMOsbSB0aOG6pXkgPHNwYW4gY2xhc3M9XCJjb25maXJtLWhpZ2hsaWdodFwiPlswXTwvc3Bhbj4ga+G6v3QgcXXhuqMuJyxcclxuICAgIFNlbGVjdGVkSXRlbXNNZXNzYWdlOiAnxJDDoyBjaOG7jW4gPHNwYW4gY2xhc3M9XCJoaWdobGlnaHRcIj5bMF08L3NwYW4+IGLhuqNuIGdoaS4nLFxyXG4gICAgQ29uZmlybVNlbGVjdEFsbFJlY29yZHNNZXNzYWdlOiAnPHNwYW4gY2xhc3M9XCJjb25maXJtLWhpZ2hsaWdodFwiPkNo4buNbiB04bqldCBj4bqjIGvhur90IHF14bqjPzwvc3Bhbj4nLFxyXG4gICAgQ29uZmlybUNsZWFyQWxsUmVjb3Jkc01lc3NhZ2U6ICc8c3BhbiBjbGFzcz1cImNvbmZpcm0taGlnaGxpZ2h0IHRleHQtZGFuZ2VyXCI+QuG7jyBjaOG7jW4gdOG6pXQgY+G6oyA8L3NwYW4+PycsXHJcbiAgICBEZWxldGVNZXNzYWdlOiAnQuG6oW4gY8OzIGNo4bqvYyBjaOG6r24gbXXhu5FuIHjDs2EgPHNwYW4gY2xhc3M9XCJjb25maXJtLWhpZ2hsaWdodCB0ZXh0LWRhbmdlclwiPlswXTwvc3Bhbj4ga2jDtG5nPycsXHJcbiAgICBMb2FkaW5nTWVzc2FnZTogJ8SQYW5nIHThuqNpIGThu68gbGnhu4d1Li4uJyxcclxuICAgIFJlZk1lc3NhZ2U6ICdsacOqbiBxdWFuIHThu5tpJ1xyXG4gIH07XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgRGlzcGxheVRleHQgPSB7XHJcbiAgICBQbGFjZWhvbGRlclNlYXJjaDogJ05o4bqtcCB04burIGtow7NhIHTDrG0ga2nhur9tLi4uJyxcclxuICAgIEJ0blJlc2V0OiAnS2jDtGkgcGjhu6VjJyxcclxuICAgIEJ0blNlYXJjaDogJ1TDrG0ga2nhur9tJyxcclxuICAgIEFjdGlvbjogJ0jDoG5oIMSR4buZbmcnLFxyXG4gICAgU2VsZWN0UGFnZVNpemU6ICdIaeG7g24gdGjhu4snLFxyXG4gICAgRGVsZXRlVGl0bGU6ICdYw7NhJyxcclxuICAgIEJ0bkFjY2VwdFRpdGxlOiAnxJDhu5NuZyDDvScsXHJcbiAgICBCdG5DYW5jZWxUaXRsZTogJ8SQw7NuZycsXHJcbiAgICBGaWx0ZXJUaXRsZTogJ1TDrG0ga2nhur9tIHRoZW8nLFxyXG4gICAgQXBwbHlGaWx0ZXI6ICfDgXAgZOG7pW5nIGzhu41jJyxcclxuICAgIERldGFpbFRpdGxlOiAnVGjDtG5nIHRpbiBjaGkgdGnhur90JyxcclxuICAgIFBhZ2VUaXRsZTogJ1RyYW5nJyxcclxuICAgIEFkdmFuY2VkU2VhcmNoVGl0bGU6ICdUw6xtIGtp4bq/bSBuw6JuZyBjYW8nLFxyXG4gICAgQWR2YW5jZWRCdG5UaXRsZTogJ1TDrG0ga2nhur9tJyxcclxuICAgIEFkdmFuY2VkQnRuQ2FuY2VsVGl0bGU6ICdI4buneSBi4buPJyxcclxuICAgIEFsbFRpdGxlOiAnVOG6pXQgY+G6oydcclxuICB9O1xyXG5cclxuICBwdWJsaWMgc3RhdGljIERpcmVjdGlvbiA9IHtcclxuICAgIEFTQzogJ2FzYycsXHJcbiAgICBERVNDOiAnZGVzYydcclxuICB9O1xyXG5cclxuICBwdWJsaWMgc3RhdGljIFRleHRBbGlnbiA9IHtcclxuICAgIExlZnQ6ICdsZWZ0JyxcclxuICAgIFJpZ2h0OiAncmlnaHQnLFxyXG4gICAgQ2VudGVyOiAnY2VudGVyJ1xyXG4gIH07XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgQWN0aW9uID0ge1xyXG4gICAgRWRpdDogJ2VkaXQnLFxyXG4gICAgRGVsZXRlOiAnZGVsZXRlJyxcclxuICAgIEN1c3RvbTogJ0N1c3RvbSdcclxuICB9XHJcbiAgcHVibGljIHN0YXRpYyBBY3Rpb25UeXBlID0ge1xyXG4gICAgQm90aDogJ2JvdGgnLFxyXG4gICAgVG9vbGJhcjogJ3Rvb2xiYXInLFxyXG4gICAgSW5saW5lOiAnaW5saW5lJ1xyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydCBlbnVtIFRhYmxlQ29sdW1uVHlwZSB7XHJcbiAgTnVtYmVyID0gJ251bWJlcicsXHJcbiAgU3RyaW5nID0gJ3N0cmluZycsXHJcbiAgRGF0ZSA9ICdkYXRlJyxcclxuICBEYXRlVGltZSA9ICdkYXRldGltZScsXHJcbiAgRGF0ZVJhbmdlID0gJ2RhdGVyYW5nZScsXHJcbiAgRGF0ZVRpbWVSYW5nZSA9ICdkYXRldGltZXJhbmdlJyxcclxuICBUaW1lID0gJ3RpbWUnLFxyXG4gIFRpbWVSYW5nZSA9ICd0aW1lcmFuZ2UnLFxyXG4gIEJvb2xlYW4gPSAnYm9vbGVhbicsXHJcbiAgRGVzY3JpcHRpb24gPSAnZGVzY3JpcHRpb24nLFxyXG4gIEN1cnJlbmN5ID0gJ2N1cnJlbmN5JyxcclxuICBEcm9wZG93biA9ICdkcm9wZG93bicsXHJcbiAgQ3VzdG9tID0gJ2N1c3RvbScsXHJcbn0iXX0=