/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
/**
 * @template T
 */
var /**
 * @template T
 */
MockData = /** @class */ (function () {
    function MockData(init) {
        Object.assign(this, init);
    }
    ;
    return MockData;
}());
/**
 * @template T
 */
export { MockData };
if (false) {
    /** @type {?} */
    MockData.prototype.mockData;
    /* Skipping unhandled member: ;*/
}
/**
 * @template T
 */
var /**
 * @template T
 */
BaseRequest = /** @class */ (function (_super) {
    tslib_1.__extends(BaseRequest, _super);
    function BaseRequest(init) {
        var _this = _super.call(this) || this;
        Object.assign(_this, init);
        return _this;
    }
    ;
    return BaseRequest;
}(MockData));
/**
 * @template T
 */
export { BaseRequest };
if (false) {
    /** @type {?} */
    BaseRequest.prototype.payload;
    /* Skipping unhandled member: ;*/
}
/**
 * @template T
 */
var /**
 * @template T
 */
BaseResponse = /** @class */ (function () {
    function BaseResponse(init) {
        Object.assign(this, init);
    }
    ;
    return BaseResponse;
}());
/**
 * @template T
 */
export { BaseResponse };
if (false) {
    /** @type {?} */
    BaseResponse.prototype.data;
    /** @type {?} */
    BaseResponse.prototype.success;
    /** @type {?} */
    BaseResponse.prototype.code;
    /** @type {?} */
    BaseResponse.prototype.message;
    /* Skipping unhandled member: ;*/
}
var SearchBaseRequest = /** @class */ (function (_super) {
    tslib_1.__extends(SearchBaseRequest, _super);
    function SearchBaseRequest(init) {
        var _this = _super.call(this) || this;
        Object.assign(_this, init);
        return _this;
    }
    ;
    return SearchBaseRequest;
}(MockData));
export { SearchBaseRequest };
if (false) {
    /** @type {?} */
    SearchBaseRequest.prototype.searchText;
    /** @type {?} */
    SearchBaseRequest.prototype.pageIndex;
    /** @type {?} */
    SearchBaseRequest.prototype.pageSize;
    /** @type {?} */
    SearchBaseRequest.prototype.direction;
    /** @type {?} */
    SearchBaseRequest.prototype.orderBy;
    /** @type {?} */
    SearchBaseRequest.prototype.all;
    /* Skipping unhandled member: ;*/
}
/**
 * @template T
 */
var /**
 * @template T
 */
SearchBaseResponse = /** @class */ (function () {
    function SearchBaseResponse(init) {
        Object.assign(this, init);
    }
    ;
    return SearchBaseResponse;
}());
/**
 * @template T
 */
export { SearchBaseResponse };
if (false) {
    /** @type {?} */
    SearchBaseResponse.prototype.items;
    /** @type {?} */
    SearchBaseResponse.prototype.success;
    /** @type {?} */
    SearchBaseResponse.prototype.code;
    /** @type {?} */
    SearchBaseResponse.prototype.message;
    /* Skipping unhandled member: ;*/
}
var BaseTemplate = /** @class */ (function () {
    function BaseTemplate(init) {
        Object.assign(this, init);
    }
    ;
    return BaseTemplate;
}());
export { BaseTemplate };
if (false) {
    /** @type {?} */
    BaseTemplate.prototype.data;
    /** @type {?} */
    BaseTemplate.prototype.validationKey;
    /** @type {?} */
    BaseTemplate.prototype.template;
    /* Skipping unhandled member: ;*/
}
var AggregatorViewModel = /** @class */ (function () {
    function AggregatorViewModel(init) {
        Object.assign(this, init);
    }
    ;
    return AggregatorViewModel;
}());
export { AggregatorViewModel };
if (false) {
    /** @type {?} */
    AggregatorViewModel.prototype.value;
    /** @type {?} */
    AggregatorViewModel.prototype.key;
    /** @type {?} */
    AggregatorViewModel.prototype.currentEmitter;
    /* Skipping unhandled member: ;*/
}
var ButtonDefinition = /** @class */ (function () {
    function ButtonDefinition(init) {
        this.style = 'default';
        Object.assign(this, init);
    }
    return ButtonDefinition;
}());
export { ButtonDefinition };
if (false) {
    /** @type {?} */
    ButtonDefinition.prototype.action;
    /** @type {?} */
    ButtonDefinition.prototype.title;
    /** @type {?} */
    ButtonDefinition.prototype.icon;
    /** @type {?} */
    ButtonDefinition.prototype.hide;
    /** @type {?} */
    ButtonDefinition.prototype.disabled;
    /** @type {?} */
    ButtonDefinition.prototype.lazyload;
    /** @type {?} */
    ButtonDefinition.prototype.style;
}
var ToolbarActionPayload = /** @class */ (function () {
    function ToolbarActionPayload(init) {
        Object.assign(this, init);
    }
    return ToolbarActionPayload;
}());
export { ToolbarActionPayload };
if (false) {
    /** @type {?} */
    ToolbarActionPayload.prototype.loadedCallback;
    /** @type {?} */
    ToolbarActionPayload.prototype.action;
    /** @type {?} */
    ToolbarActionPayload.prototype.callback;
}
var ObjectChange = /** @class */ (function () {
    function ObjectChange(init) {
        Object.assign(this, init);
    }
    return ObjectChange;
}());
export { ObjectChange };
if (false) {
    /** @type {?} */
    ObjectChange.prototype.propertyName;
    /** @type {?} */
    ObjectChange.prototype.oldValue;
    /** @type {?} */
    ObjectChange.prototype.newValue;
    /** @type {?} */
    ObjectChange.prototype.changeType;
}
var LookupItem = /** @class */ (function () {
    function LookupItem(init) {
        Object.assign(this, init);
    }
    return LookupItem;
}());
export { LookupItem };
if (false) {
    /** @type {?} */
    LookupItem.prototype.name;
    /** @type {?} */
    LookupItem.prototype.key;
}
var ExtendedMainMenuGroup = /** @class */ (function () {
    function ExtendedMainMenuGroup(init) {
        Object.assign(this, init);
    }
    return ExtendedMainMenuGroup;
}());
export { ExtendedMainMenuGroup };
if (false) {
    /** @type {?} */
    ExtendedMainMenuGroup.prototype.label;
    /** @type {?} */
    ExtendedMainMenuGroup.prototype.children;
    /** @type {?} */
    ExtendedMainMenuGroup.prototype.icon;
}
var KeyValueItem = /** @class */ (function () {
    function KeyValueItem(init) {
        Object.assign(this, init);
    }
    return KeyValueItem;
}());
export { KeyValueItem };
if (false) {
    /** @type {?} */
    KeyValueItem.prototype.key;
    /** @type {?} */
    KeyValueItem.prototype.value;
}
var BreadCrumbItem = /** @class */ (function () {
    function BreadCrumbItem(init) {
        Object.assign(this, init);
    }
    return BreadCrumbItem;
}());
export { BreadCrumbItem };
if (false) {
    /** @type {?} */
    BreadCrumbItem.prototype.label;
    /** @type {?} */
    BreadCrumbItem.prototype.url;
}
var ControlType = /** @class */ (function () {
    function ControlType(init) {
        Object.assign(this, init);
    }
    ControlType.Textbox = 'Textbox';
    ControlType.Dropdown = 'Dropdown';
    ControlType.Button = 'Button';
    return ControlType;
}());
export { ControlType };
if (false) {
    /** @type {?} */
    ControlType.Textbox;
    /** @type {?} */
    ControlType.Dropdown;
    /** @type {?} */
    ControlType.Button;
}
var MenuTab = /** @class */ (function () {
    function MenuTab(init) {
        Object.assign(this, init);
    }
    return MenuTab;
}());
export { MenuTab };
if (false) {
    /** @type {?} */
    MenuTab.prototype.role;
    /** @type {?} */
    MenuTab.prototype.items;
}
var MenuItem = /** @class */ (function () {
    function MenuItem(init) {
        Object.assign(this, init);
    }
    return MenuItem;
}());
export { MenuItem };
if (false) {
    /** @type {?} */
    MenuItem.prototype.menu;
    /** @type {?} */
    MenuItem.prototype.items;
    /** @type {?} */
    MenuItem.prototype.subName;
    /** @type {?} */
    MenuItem.prototype.name;
}
var Breadcrumb = /** @class */ (function () {
    function Breadcrumb(init) {
        Object.assign(this, init);
    }
    return Breadcrumb;
}());
export { Breadcrumb };
if (false) {
    /** @type {?} */
    Breadcrumb.prototype.label;
    /** @type {?} */
    Breadcrumb.prototype.url;
    /** @type {?} */
    Breadcrumb.prototype.state;
}
var MediaItem = /** @class */ (function () {
    function MediaItem(init) {
        Object.assign(this, init);
    }
    return MediaItem;
}());
export { MediaItem };
if (false) {
    /** @type {?} */
    MediaItem.prototype.src;
    /** @type {?} */
    MediaItem.prototype.name;
    /** @type {?} */
    MediaItem.prototype.fullSrc;
}
var Audit = /** @class */ (function () {
    function Audit(init) {
        Object.assign(this, init);
    }
    return Audit;
}());
export { Audit };
if (false) {
    /** @type {?} */
    Audit.prototype.createdDate;
    /** @type {?} */
    Audit.prototype.createdBy;
    /** @type {?} */
    Audit.prototype.lastModifiedDate;
    /** @type {?} */
    Audit.prototype.lastModifiedBy;
}
var TrackingGroup = /** @class */ (function () {
    function TrackingGroup(init) {
        Object.assign(this, init);
    }
    return TrackingGroup;
}());
export { TrackingGroup };
if (false) {
    /** @type {?} */
    TrackingGroup.prototype.date;
    /** @type {?} */
    TrackingGroup.prototype.details;
}
var TrackingDetail = /** @class */ (function () {
    function TrackingDetail(init) {
        Object.assign(this, init);
    }
    return TrackingDetail;
}());
export { TrackingDetail };
if (false) {
    /** @type {?} */
    TrackingDetail.prototype.description;
    /** @type {?} */
    TrackingDetail.prototype.time;
}
var RecommendationResponse = /** @class */ (function () {
    function RecommendationResponse(init) {
        Object.assign(this, init);
    }
    return RecommendationResponse;
}());
export { RecommendationResponse };
if (false) {
    /** @type {?} */
    RecommendationResponse.prototype.keywords;
    /** @type {?} */
    RecommendationResponse.prototype.adwords;
    /** @type {?} */
    RecommendationResponse.prototype.historyKeywords;
    /** @type {?} */
    RecommendationResponse.prototype.categories;
    /** @type {?} */
    RecommendationResponse.prototype.products;
    /** @type {?} */
    RecommendationResponse.prototype.tags;
    /** @type {?} */
    RecommendationResponse.prototype.keyword;
}
/**
 * @record
 * @template T
 */
export function ICallback() { }
if (false) {
    /** @type {?} */
    ICallback.prototype.isValid;
    /** @type {?} */
    ICallback.prototype.callback;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1mdzRjLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvc2hhcmVkL21vZGVscy9iYXNlLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBSUE7Ozs7SUFFSSxrQkFBWSxJQUEyQjtRQUNuQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBQUEsQ0FBQztJQUNOLGVBQUM7QUFBRCxDQUFDLEFBTEQsSUFLQzs7Ozs7OztJQUpHLDRCQUFlOzs7Ozs7QUFNbkI7Ozs7SUFBb0MsdUNBQVc7SUFFM0MscUJBQVksSUFBOEI7UUFBMUMsWUFDSSxpQkFBTyxTQUVWO1FBREcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7O0lBQzlCLENBQUM7SUFBQSxDQUFDO0lBQ04sa0JBQUM7QUFBRCxDQUFDLEFBTkQsQ0FBb0MsUUFBUSxHQU0zQzs7Ozs7OztJQUxHLDhCQUFZOzs7Ozs7QUFPaEI7Ozs7SUFLSSxzQkFBWSxJQUErQjtRQUN2QyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBQUEsQ0FBQztJQUNOLG1CQUFDO0FBQUQsQ0FBQyxBQVJELElBUUM7Ozs7Ozs7SUFQRyw0QkFBUzs7SUFDVCwrQkFBa0I7O0lBQ2xCLDRCQUFjOztJQUNkLCtCQUFpQjs7O0FBTXJCO0lBQXVDLDZDQUFhO0lBT2hELDJCQUFZLElBQWlDO1FBQTdDLFlBQ0ksaUJBQU8sU0FFVjtRQURHLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSSxFQUFFLElBQUksQ0FBQyxDQUFDOztJQUM5QixDQUFDO0lBQUEsQ0FBQztJQUNOLHdCQUFDO0FBQUQsQ0FBQyxBQVhELENBQXVDLFFBQVEsR0FXOUM7Ozs7SUFWRyx1Q0FBb0I7O0lBQ3BCLHNDQUFtQjs7SUFDbkIscUNB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UkQsSUFRQzs7OztJQVBHLDRCQUFtQjs7SUFDbkIsMEJBQW1COztJQUNuQixpQ0FBd0I7O0lBQ3hCLCtCQUF3Qjs7QUFNNUI7SUFHSSx1QkFBWSxJQUE2QjtRQUNyQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBQ0wsb0JBQUM7QUFBRCxDQUFDLEFBTkQsSUFNQzs7OztJQUxHLDZCQUFXOztJQUNYLGdDQUEwQjs7QUFNOUI7SUFHSSx3QkFBWSxJQUE4QjtRQUN0QyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBQ0wscUJBQUM7QUFBRCxDQUFDLEFBTkQsSUFNQzs7OztJQUxHLHFDQUFvQjs7SUFDcEIsOEJBQVc7O0FBTWY7SUFRSSxnQ0FBWSxJQUFzQztRQUM5QyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBQ0wsNkJBQUM7QUFBRCxDQUFDLEFBWEQsSUFXQzs7OztJQVZHLDBDQUFvQjs7SUFDcEIseUNBQWdCOztJQUNoQixpREFBMkI7O0lBQzNCLDRDQUFtQjs7SUFDbkIsMENBQWlCOztJQUNqQixzQ0FBZ0I7O0lBQ2hCLHlDQUFpQjs7Ozs7O0FBTXJCLCtCQUdDOzs7SUFGRyw0QkFBdUI7O0lBQ3ZCLDZCQUF3QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFR5cGUsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDaGFuZ2VUeXBlIH0gZnJvbSAnLi4vZW51bXMvYmFzZS5lbnVtJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIE1vY2tEYXRhPFQ+IHtcclxuICAgIG1vY2tEYXRhPzogYW55O1xyXG4gICAgY29uc3RydWN0b3IoaW5pdD86IFBhcnRpYWw8TW9ja0RhdGE8VD4+KSB7XHJcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCBpbml0KTtcclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBCYXNlUmVxdWVzdDxUPiBleHRlbmRzIE1vY2tEYXRhPFQ+IHtcclxuICAgIHBheWxvYWQ/OiBUO1xyXG4gICAgY29uc3RydWN0b3IoaW5pdD86IFBhcnRpYWw8QmFzZVJlcXVlc3Q8VD4+KSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIGluaXQpO1xyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEJhc2VSZXNwb25zZTxUPiB7XHJcbiAgICBkYXRhPzogVDtcclxuICAgIHN1Y2Nlc3M/OiBib29sZWFuO1xyXG4gICAgY29kZT86IG51bWJlcjtcclxuICAgIG1lc3NhZ2U/OiBzdHJpbmc7XHJcbiAgICBjb25zdHJ1Y3Rvcihpbml0PzogUGFydGlhbDxCYXNlUmVzcG9uc2U8VD4+KSB7XHJcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCBpbml0KTtcclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBTZWFyY2hCYXNlUmVxdWVzdCBleHRlbmRzIE1vY2tEYXRhPGFueT4ge1xyXG4gICAgc2VhcmNoVGV4dD86IHN0cmluZztcclxuICAgIHBhZ2VJbmRleD86IG51bWJlcjtcclxuICAgIHBhZ2VTaXplPzogbnVtYmVyO1xyXG4gICAgZGlyZWN0aW9uPzogc3RyaW5nO1xyXG4gICAgb3JkZXJCeT86IHN0cmluZztcclxuICAgIGFsbD86IGJvb2xlYW47XHJcbiAgICBjb25zdHJ1Y3Rvcihpbml0PzogUGFydGlhbDxTZWFyY2hCYXNlUmVxdWVzdD4pIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgaW5pdCk7XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU2VhcmNoQmFzZVJlc3BvbnNlPFQ+IHtcclxuICAgIGl0ZW1zPzogVFtdO1xyXG4gICAgc3VjY2Vzcz86IGJvb2xlYW47XHJcbiAgICBjb2RlPzogbnVtYmVyO1xyXG4gICAgbWVzc2FnZT86IHN0cmluZztcclxuICAgIGNvbnN0cnVjdG9yKGluaXQ/OiBQYXJ0aWFsPFNlYXJjaEJhc2VSZXNwb25zZTxUPj4pIHtcclxuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIGluaXQpO1xyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEJhc2VUZW1wbGF0ZSB7XHJcbiAgICBkYXRhPzogYW55O1xyXG4gICAgdmFsaWRhdGlvbktleT86IHN0cmluZztcclxuICAgIHRlbXBsYXRlPzogVHlwZTxhbnk+O1xyXG4gICAgY29uc3RydWN0b3IoaW5pdD86IFBhcnRpYWw8QmFzZVRlbXBsYXRlPikge1xyXG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgaW5pdCk7XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQWdncmVnYXRvclZpZXdNb2RlbCB7XHJcbiAgICB2YWx1ZT86IEV2ZW50RW1pdHRlcjxhbnk+O1xyXG4gICAga2V5Pzogc3RyaW5nO1xyXG4gICAgY3VycmVudEVtaXR0ZXI6IGFueTtcclxuICAgIGNvbnN0cnVjdG9yKGluaXQ/OiBQYXJ0aWFsPEFnZ3JlZ2F0b3JWaWV3TW9kZWw+KSB7XHJcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCBpbml0KTtcclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBCdXR0b25EZWZpbml0aW9uIHtcclxuICAgIGFjdGlvbjogc3RyaW5nO1xyXG4gICAgdGl0bGU6IHN0cmluZztcclxuICAgIGljb246IHN0cmluZztcclxuICAgIGhpZGU6IGJvb2xlYW47XHJcbiAgICBkaXNhYmxlZDogYm9vbGVhbjtcclxuICAgIGxhenlsb2FkOiBib29sZWFuO1xyXG4gICAgc3R5bGU6ICdkZWZhdWx0JyB8ICdzdWNjZXNzJyB8ICd3YXJuaW5nJyB8ICdkYW5nZXInIHwgJ2xpbmsnIHwgJ2luZm8nIHwgJ2ludmVyc2UnIHwgJ3ByaW1hcnknIHwgJ291dGxpbmUtcHJpbWFyeScgfCAnb3V0bGluZS1pbnZlcnNlJyA9ICdkZWZhdWx0JztcclxuICAgIGNvbnN0cnVjdG9yKGluaXQ/OiBQYXJ0aWFsPEJ1dHRvbkRlZmluaXRpb24+KSB7XHJcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCBpbml0KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFRvb2xiYXJBY3Rpb25QYXlsb2FkIHtcclxuICAgIGxvYWRlZENhbGxiYWNrOiBGdW5jdGlvbjtcclxuICAgIGFjdGlvbjogc3RyaW5nO1xyXG4gICAgY2FsbGJhY2s6IEZ1bmN0aW9uO1xyXG4gICAgY29uc3RydWN0b3IoaW5pdD86IFBhcnRpYWw8VG9vbGJhckFjdGlvblBheWxvYWQ+KSB7XHJcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCBpbml0KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE9iamVjdENoYW5nZSB7XHJcbiAgICBwcm9wZXJ0eU5hbWU6IHN0cmluZztcclxuICAgIG9sZFZhbHVlOiBhbnk7XHJcbiAgICBuZXdWYWx1ZTogYW55O1xyXG4gICAgY2hhbmdlVHlwZTogQ2hhbmdlVHlwZTtcclxuICAgIGNvbnN0cnVjdG9yKGluaXQ/OiBQYXJ0aWFsPE9iamVjdENoYW5nZT4pIHtcclxuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIGluaXQpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTG9va3VwSXRlbSB7XHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICBrZXk/OiBzdHJpbmc7XHJcbiAgICBjb25zdHJ1Y3Rvcihpbml0PzogUGFydGlhbDxMb29rdXBJdGVtPikge1xyXG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgaW5pdCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBFeHRlbmRlZE1haW5NZW51R3JvdXAge1xyXG4gICAgbGFiZWw6IHN0cmluZztcclxuICAgIGNoaWxkcmVuOiBhbnlbXTtcclxuICAgIGljb246IHN0cmluZztcclxuICAgIGNvbnN0cnVjdG9yKGluaXQ/OiBQYXJ0aWFsPEV4dGVuZGVkTWFpbk1lbnVHcm91cD4pIHtcclxuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIGluaXQpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgS2V5VmFsdWVJdGVtIHtcclxuICAgIGtleTogc3RyaW5nO1xyXG4gICAgdmFsdWU6IHN0cmluZztcclxuICAgIGNvbnN0cnVjdG9yKGluaXQ/OiBQYXJ0aWFsPEtleVZhbHVlSXRlbT4pIHtcclxuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIGluaXQpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQnJlYWRDcnVtYkl0ZW0ge1xyXG4gICAgbGFiZWw6IHN0cmluZztcclxuICAgIHVybDogc3RyaW5nO1xyXG4gICAgY29uc3RydWN0b3IoaW5pdD86IFBhcnRpYWw8QnJlYWRDcnVtYkl0ZW0+KSB7XHJcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCBpbml0KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIENvbnRyb2xUeXBlIHtcclxuICAgIHN0YXRpYyBUZXh0Ym94OiBzdHJpbmcgPSAnVGV4dGJveCc7XHJcbiAgICBzdGF0aWMgRHJvcGRvd246IHN0cmluZyA9ICdEcm9wZG93bic7XHJcbiAgICBzdGF0aWMgQnV0dG9uOiBzdHJpbmcgPSAnQnV0dG9uJztcclxuICAgIGNvbnN0cnVjdG9yKGluaXQ/OiBQYXJ0aWFsPENvbnRyb2xUeXBlPikge1xyXG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgaW5pdCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBNZW51VGFiIHtcclxuICAgIHJvbGU6IHN0cmluZztcclxuICAgIGl0ZW1zOiBFeHRlbmRlZE1haW5NZW51R3JvdXBbXTtcclxuICAgIGNvbnN0cnVjdG9yKGluaXQ/OiBQYXJ0aWFsPE1lbnVUYWI+KSB7XHJcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCBpbml0KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE1lbnVJdGVtIHtcclxuICAgIG1lbnU6IHN0cmluZztcclxuICAgIGl0ZW1zOiBFeHRlbmRlZE1haW5NZW51R3JvdXBbXTtcclxuICAgIHN1Yk5hbWU6IHN0cmluZztcclxuICAgIG5hbWU/OiBzdHJpbmc7XHJcbiAgICBjb25zdHJ1Y3Rvcihpbml0PzogUGFydGlhbDxNZW51SXRlbT4pIHtcclxuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIGluaXQpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQnJlYWRjcnVtYiB7XHJcbiAgICBsYWJlbDogc3RyaW5nO1xyXG4gICAgdXJsOiBzdHJpbmc7XHJcbiAgICBzdGF0ZT86IHN0cmluZztcclxuICAgIGNvbnN0cnVjdG9yKGluaXQ/OiBQYXJ0aWFsPEJyZWFkY3J1bWI+KSB7XHJcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCBpbml0KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE1lZGlhSXRlbSB7XHJcbiAgICBzcmM6IHN0cmluZztcclxuICAgIG5hbWU6IHN0cmluZztcclxuICAgIGZ1bGxTcmM6IHN0cmluZztcclxuICAgIGNvbnN0cnVjdG9yKGluaXQ/OiBQYXJ0aWFsPE1lZGlhSXRlbT4pIHtcclxuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIGluaXQpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQXVkaXQge1xyXG4gICAgY3JlYXRlZERhdGU/OiBEYXRlO1xyXG4gICAgY3JlYXRlZEJ5Pzogc3RyaW5nO1xyXG4gICAgbGFzdE1vZGlmaWVkRGF0ZT86IERhdGU7XHJcbiAgICBsYXN0TW9kaWZpZWRCeT86IHN0cmluZztcclxuICAgIGNvbnN0cnVjdG9yKGluaXQ/OiBQYXJ0aWFsPEF1ZGl0Pikge1xyXG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgaW5pdCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBUcmFja2luZ0dyb3VwIHtcclxuICAgIGRhdGU6IERhdGU7XHJcbiAgICBkZXRhaWxzOiBUcmFja2luZ0RldGFpbFtdO1xyXG4gICAgY29uc3RydWN0b3IoaW5pdD86IFBhcnRpYWw8VHJhY2tpbmdHcm91cD4pIHtcclxuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIGluaXQpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVHJhY2tpbmdEZXRhaWwge1xyXG4gICAgZGVzY3JpcHRpb246IHN0cmluZztcclxuICAgIHRpbWU6IERhdGU7XHJcbiAgICBjb25zdHJ1Y3Rvcihpbml0PzogUGFydGlhbDxUcmFja2luZ0RldGFpbD4pIHtcclxuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIGluaXQpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUmVjb21tZW5kYXRpb25SZXNwb25zZSB7XHJcbiAgICBrZXl3b3Jkcz86IHN0cmluZ1tdO1xyXG4gICAgYWR3b3Jkcz86IGFueVtdO1xyXG4gICAgaGlzdG9yeUtleXdvcmRzPzogc3RyaW5nW107XHJcbiAgICBjYXRlZ29yaWVzPzogYW55W107XHJcbiAgICBwcm9kdWN0cz86IGFueVtdO1xyXG4gICAgdGFncz86IHN0cmluZ1tdO1xyXG4gICAga2V5d29yZD86IHN0cmluZztcclxuICAgIGNvbnN0cnVjdG9yKGluaXQ/OiBQYXJ0aWFsPFJlY29tbWVuZGF0aW9uUmVzcG9uc2U+KSB7XHJcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCBpbml0KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQ2FsbGJhY2s8VD4ge1xyXG4gICAgaXNWYWxpZDogKCkgPT4gYm9vbGVhbjtcclxuICAgIGNhbGxiYWNrOiAodmFsdWU6IGFueSkgPT4gT2JzZXJ2YWJsZTxUPjtcclxufSJdfQ==