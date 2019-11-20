/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 */
export class MockData {
    /**
     * @param {?=} init
     */
    constructor(init) {
        Object.assign(this, init);
    }
    ;
}
if (false) {
    /** @type {?} */
    MockData.prototype.mockData;
    /* Skipping unhandled member: ;*/
}
/**
 * @template T
 */
export class BaseRequest extends MockData {
    /**
     * @param {?=} init
     */
    constructor(init) {
        super();
        Object.assign(this, init);
    }
    ;
}
if (false) {
    /** @type {?} */
    BaseRequest.prototype.payload;
    /* Skipping unhandled member: ;*/
}
/**
 * @template T
 */
export class BaseResponse {
    /**
     * @param {?=} init
     */
    constructor(init) {
        Object.assign(this, init);
    }
    ;
}
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
export class SearchBaseRequest extends MockData {
    /**
     * @param {?=} init
     */
    constructor(init) {
        super();
        Object.assign(this, init);
    }
    ;
}
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
export class SearchBaseResponse {
    /**
     * @param {?=} init
     */
    constructor(init) {
        Object.assign(this, init);
    }
    ;
}
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
export class BaseTemplate {
    /**
     * @param {?=} init
     */
    constructor(init) {
        Object.assign(this, init);
    }
    ;
}
if (false) {
    /** @type {?} */
    BaseTemplate.prototype.data;
    /** @type {?} */
    BaseTemplate.prototype.validationKey;
    /** @type {?} */
    BaseTemplate.prototype.template;
    /* Skipping unhandled member: ;*/
}
export class AggregatorViewModel {
    /**
     * @param {?=} init
     */
    constructor(init) {
        Object.assign(this, init);
    }
    ;
}
if (false) {
    /** @type {?} */
    AggregatorViewModel.prototype.value;
    /** @type {?} */
    AggregatorViewModel.prototype.key;
    /** @type {?} */
    AggregatorViewModel.prototype.currentEmitter;
    /* Skipping unhandled member: ;*/
}
export class ButtonDefinition {
    /**
     * @param {?=} init
     */
    constructor(init) {
        this.style = 'default';
        Object.assign(this, init);
    }
}
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
export class ToolbarActionPayload {
    /**
     * @param {?=} init
     */
    constructor(init) {
        Object.assign(this, init);
    }
}
if (false) {
    /** @type {?} */
    ToolbarActionPayload.prototype.loadedCallback;
    /** @type {?} */
    ToolbarActionPayload.prototype.action;
    /** @type {?} */
    ToolbarActionPayload.prototype.callback;
}
export class ObjectChange {
    /**
     * @param {?=} init
     */
    constructor(init) {
        Object.assign(this, init);
    }
}
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
export class LookupItem {
    /**
     * @param {?=} init
     */
    constructor(init) {
        Object.assign(this, init);
    }
}
if (false) {
    /** @type {?} */
    LookupItem.prototype.name;
    /** @type {?} */
    LookupItem.prototype.key;
}
export class ExtendedMainMenuGroup {
    /**
     * @param {?=} init
     */
    constructor(init) {
        Object.assign(this, init);
    }
}
if (false) {
    /** @type {?} */
    ExtendedMainMenuGroup.prototype.label;
    /** @type {?} */
    ExtendedMainMenuGroup.prototype.children;
    /** @type {?} */
    ExtendedMainMenuGroup.prototype.icon;
}
export class KeyValueItem {
    /**
     * @param {?=} init
     */
    constructor(init) {
        Object.assign(this, init);
    }
}
if (false) {
    /** @type {?} */
    KeyValueItem.prototype.key;
    /** @type {?} */
    KeyValueItem.prototype.value;
}
export class BreadCrumbItem {
    /**
     * @param {?=} init
     */
    constructor(init) {
        Object.assign(this, init);
    }
}
if (false) {
    /** @type {?} */
    BreadCrumbItem.prototype.label;
    /** @type {?} */
    BreadCrumbItem.prototype.url;
}
export class ControlType {
    /**
     * @param {?=} init
     */
    constructor(init) {
        Object.assign(this, init);
    }
}
ControlType.Textbox = 'Textbox';
ControlType.Dropdown = 'Dropdown';
ControlType.Button = 'Button';
if (false) {
    /** @type {?} */
    ControlType.Textbox;
    /** @type {?} */
    ControlType.Dropdown;
    /** @type {?} */
    ControlType.Button;
}
export class MenuTab {
    /**
     * @param {?=} init
     */
    constructor(init) {
        Object.assign(this, init);
    }
}
if (false) {
    /** @type {?} */
    MenuTab.prototype.role;
    /** @type {?} */
    MenuTab.prototype.items;
}
export class MenuItem {
    /**
     * @param {?=} init
     */
    constructor(init) {
        Object.assign(this, init);
    }
}
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
export class Breadcrumb {
    /**
     * @param {?=} init
     */
    constructor(init) {
        Object.assign(this, init);
    }
}
if (false) {
    /** @type {?} */
    Breadcrumb.prototype.label;
    /** @type {?} */
    Breadcrumb.prototype.url;
    /** @type {?} */
    Breadcrumb.prototype.state;
}
export class MediaItem {
    /**
     * @param {?=} init
     */
    constructor(init) {
        Object.assign(this, init);
    }
}
if (false) {
    /** @type {?} */
    MediaItem.prototype.src;
    /** @type {?} */
    MediaItem.prototype.name;
    /** @type {?} */
    MediaItem.prototype.fullSrc;
}
export class Audit {
    /**
     * @param {?=} init
     */
    constructor(init) {
        Object.assign(this, init);
    }
}
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
export class TrackingGroup {
    /**
     * @param {?=} init
     */
    constructor(init) {
        Object.assign(this, init);
    }
}
if (false) {
    /** @type {?} */
    TrackingGroup.prototype.date;
    /** @type {?} */
    TrackingGroup.prototype.details;
}
export class TrackingDetail {
    /**
     * @param {?=} init
     */
    constructor(init) {
        Object.assign(this, init);
    }
}
if (false) {
    /** @type {?} */
    TrackingDetail.prototype.description;
    /** @type {?} */
    TrackingDetail.prototype.time;
}
export class RecommendationResponse {
    /**
     * @param {?=} init
     */
    constructor(init) {
        Object.assign(this, init);
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1mdzRjLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvc2hhcmVkL21vZGVscy9iYXNlLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFJQSxNQUFNLE9BQU8sUUFBUTs7OztJQUVqQixZQUFZLElBQTJCO1FBQ25DLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFBQSxDQUFDO0NBQ0w7OztJQUpHLDRCQUFlOzs7Ozs7QUFNbkIsTUFBTSxPQUFPLFdBQWUsU0FBUSxRQUFXOzs7O0lBRTNDLFlBQVksSUFBOEI7UUFDdEMsS0FBSyxFQUFFLENBQUM7UUFDUixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBQUEsQ0FBQztDQUNMOzs7SUFMRyw4QkFBWTs7Ozs7O0FBT2hCLE1BQU0sT0FBTyxZQUFZOzs7O0lBS3JCLFlBQVksSUFBK0I7UUFDdkMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUFBLENBQUM7Q0FDTDs7O0lBUEcsNEJBQVM7O0lBQ1QsK0JBQWtCOztJQUNsQiw0QkFBYzs7SUFDZCwrQkFBaUI7OztBQU1yQixNQUFNLE9BQU8saUJBQWtCLFNBQVEsUUFBYTs7OztJQU9oRCxZQUFZLElBQWlDO1FBQ3pDLEtBQUssRUFBRSxDQUFDO1FBQ1IsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUFBLENBQUM7Q0FDTDs7O0lBVkcsdUNBQW9COztJQUNwQixzQ0FBbUI7O0lBQ25CLHFDQUFrQjs7SUFDbEIsc0NBQW1COztJQUNuQixvQ0FBaUI7O0lBQ2pCLGdDQUFjOzs7Ozs7QUFPbEIsTUFBTSxPQUFPLGtCQUFrQjs7OztJQUszQixZQUFZLElBQXFDO1FBQzdDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFBQSxDQUFDO0NBQ0w7OztJQVBHLG1DQUFZOztJQUNaLHFDQUFrQjs7SUFDbEIsa0NBQWM7O0lBQ2QscUNBQWlCOzs7QUFNckIsTUFBTSxPQUFPLFlBQVk7Ozs7SUFJckIsWUFBWSxJQUE0QjtRQUNwQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBQUEsQ0FBQztDQUNMOzs7SUFORyw0QkFBVzs7SUFDWCxxQ0FBdUI7O0lBQ3ZCLGdDQUFxQjs7O0FBTXpCLE1BQU0sT0FBTyxtQkFBbUI7Ozs7SUFJNUIsWUFBWSxJQUFtQztRQUMzQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBQUEsQ0FBQztDQUNMOzs7SUFORyxvQ0FBMEI7O0lBQzFCLGtDQUFhOztJQUNiLDZDQUFvQjs7O0FBTXhCLE1BQU0sT0FBTyxnQkFBZ0I7Ozs7SUFRekIsWUFBWSxJQUFnQztRQUQ1QyxVQUFLLEdBQW1JLFNBQVMsQ0FBQztRQUU5SSxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM5QixDQUFDO0NBQ0o7OztJQVZHLGtDQUFlOztJQUNmLGlDQUFjOztJQUNkLGdDQUFhOztJQUNiLGdDQUFjOztJQUNkLG9DQUFrQjs7SUFDbEIsb0NBQWtCOztJQUNsQixpQ0FBa0o7O0FBTXRKLE1BQU0sT0FBTyxvQkFBb0I7Ozs7SUFJN0IsWUFBWSxJQUFvQztRQUM1QyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM5QixDQUFDO0NBQ0o7OztJQU5HLDhDQUF5Qjs7SUFDekIsc0NBQWU7O0lBQ2Ysd0NBQW1COztBQU12QixNQUFNLE9BQU8sWUFBWTs7OztJQUtyQixZQUFZLElBQTRCO1FBQ3BDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzlCLENBQUM7Q0FDSjs7O0lBUEcsb0NBQXFCOztJQUNyQixnQ0FBYzs7SUFDZCxnQ0FBYzs7SUFDZCxrQ0FBdUI7O0FBTTNCLE1BQU0sT0FBTyxVQUFVOzs7O0lBR25CLFlBQVksSUFBMEI7UUFDbEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDOUIsQ0FBQztDQUNKOzs7SUFMRywwQkFBYTs7SUFDYix5QkFBYTs7QUFNakIsTUFBTSxPQUFPLHFCQUFxQjs7OztJQUk5QixZQUFZLElBQXFDO1FBQzdDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzlCLENBQUM7Q0FDSjs7O0lBTkcsc0NBQWM7O0lBQ2QseUNBQWdCOztJQUNoQixxQ0FBYTs7QUFNakIsTUFBTSxPQUFPLFlBQVk7Ozs7SUFHckIsWUFBWSxJQUE0QjtRQUNwQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM5QixDQUFDO0NBQ0o7OztJQUxHLDJCQUFZOztJQUNaLDZCQUFjOztBQU1sQixNQUFNLE9BQU8sY0FBYzs7OztJQUd2QixZQUFZLElBQThCO1FBQ3RDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzlCLENBQUM7Q0FDSjs7O0lBTEcsK0JBQWM7O0lBQ2QsNkJBQVk7O0FBTWhCLE1BQU0sT0FBTyxXQUFXOzs7O0lBSXBCLFlBQVksSUFBMkI7UUFDbkMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDOUIsQ0FBQzs7QUFMTSxtQkFBTyxHQUFXLFNBQVMsQ0FBQztBQUM1QixvQkFBUSxHQUFXLFVBQVUsQ0FBQztBQUM5QixrQkFBTSxHQUFXLFFBQVEsQ0FBQzs7O0lBRmpDLG9CQUFtQzs7SUFDbkMscUJBQXFDOztJQUNyQyxtQkFBaUM7O0FBTXJDLE1BQU0sT0FBTyxPQUFPOzs7O0lBR2hCLFlBQVksSUFBdUI7UUFDL0IsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDOUIsQ0FBQztDQUNKOzs7SUFMRyx1QkFBYTs7SUFDYix3QkFBK0I7O0FBTW5DLE1BQU0sT0FBTyxRQUFROzs7O0lBS2pCLFlBQVksSUFBd0I7UUFDaEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDOUIsQ0FBQztDQUNKOzs7SUFQRyx3QkFBYTs7SUFDYix5QkFBK0I7O0lBQy9CLDJCQUFnQjs7SUFDaEIsd0JBQWM7O0FBTWxCLE1BQU0sT0FBTyxVQUFVOzs7O0lBSW5CLFlBQVksSUFBMEI7UUFDbEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDOUIsQ0FBQztDQUNKOzs7SUFORywyQkFBYzs7SUFDZCx5QkFBWTs7SUFDWiwyQkFBZTs7QUFNbkIsTUFBTSxPQUFPLFNBQVM7Ozs7SUFJbEIsWUFBWSxJQUF5QjtRQUNqQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM5QixDQUFDO0NBQ0o7OztJQU5HLHdCQUFZOztJQUNaLHlCQUFhOztJQUNiLDRCQUFnQjs7QUFNcEIsTUFBTSxPQUFPLEtBQUs7Ozs7SUFLZCxZQUFZLElBQXFCO1FBQzdCLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzlCLENBQUM7Q0FDSjs7O0lBUEcsNEJBQW1COztJQUNuQiwwQkFBbUI7O0lBQ25CLGlDQUF3Qjs7SUFDeEIsK0JBQXdCOztBQU01QixNQUFNLE9BQU8sYUFBYTs7OztJQUd0QixZQUFZLElBQTZCO1FBQ3JDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzlCLENBQUM7Q0FDSjs7O0lBTEcsNkJBQVc7O0lBQ1gsZ0NBQTBCOztBQU05QixNQUFNLE9BQU8sY0FBYzs7OztJQUd2QixZQUFZLElBQThCO1FBQ3RDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzlCLENBQUM7Q0FDSjs7O0lBTEcscUNBQW9COztJQUNwQiw4QkFBVzs7QUFNZixNQUFNLE9BQU8sc0JBQXNCOzs7O0lBUS9CLFlBQVksSUFBc0M7UUFDOUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDOUIsQ0FBQztDQUNKOzs7SUFWRywwQ0FBb0I7O0lBQ3BCLHlDQUFnQjs7SUFDaEIsaURBQTJCOztJQUMzQiw0Q0FBbUI7O0lBQ25CLDBDQUFpQjs7SUFDakIsc0NBQWdCOztJQUNoQix5Q0FBaUI7Ozs7OztBQU1yQiwrQkFHQzs7O0lBRkcsNEJBQXVCOztJQUN2Qiw2QkFBd0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUeXBlLCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ2hhbmdlVHlwZSB9IGZyb20gJy4uL2VudW1zL2Jhc2UuZW51bSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBNb2NrRGF0YTxUPiB7XHJcbiAgICBtb2NrRGF0YT86IGFueTtcclxuICAgIGNvbnN0cnVjdG9yKGluaXQ/OiBQYXJ0aWFsPE1vY2tEYXRhPFQ+Pikge1xyXG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgaW5pdCk7XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQmFzZVJlcXVlc3Q8VD4gZXh0ZW5kcyBNb2NrRGF0YTxUPiB7XHJcbiAgICBwYXlsb2FkPzogVDtcclxuICAgIGNvbnN0cnVjdG9yKGluaXQ/OiBQYXJ0aWFsPEJhc2VSZXF1ZXN0PFQ+Pikge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCBpbml0KTtcclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBCYXNlUmVzcG9uc2U8VD4ge1xyXG4gICAgZGF0YT86IFQ7XHJcbiAgICBzdWNjZXNzPzogYm9vbGVhbjtcclxuICAgIGNvZGU/OiBudW1iZXI7XHJcbiAgICBtZXNzYWdlPzogc3RyaW5nO1xyXG4gICAgY29uc3RydWN0b3IoaW5pdD86IFBhcnRpYWw8QmFzZVJlc3BvbnNlPFQ+Pikge1xyXG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgaW5pdCk7XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU2VhcmNoQmFzZVJlcXVlc3QgZXh0ZW5kcyBNb2NrRGF0YTxhbnk+IHtcclxuICAgIHNlYXJjaFRleHQ/OiBzdHJpbmc7XHJcbiAgICBwYWdlSW5kZXg/OiBudW1iZXI7XHJcbiAgICBwYWdlU2l6ZT86IG51bWJlcjtcclxuICAgIGRpcmVjdGlvbj86IHN0cmluZztcclxuICAgIG9yZGVyQnk/OiBzdHJpbmc7XHJcbiAgICBhbGw/OiBib29sZWFuO1xyXG4gICAgY29uc3RydWN0b3IoaW5pdD86IFBhcnRpYWw8U2VhcmNoQmFzZVJlcXVlc3Q+KSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIGluaXQpO1xyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFNlYXJjaEJhc2VSZXNwb25zZTxUPiB7XHJcbiAgICBpdGVtcz86IFRbXTtcclxuICAgIHN1Y2Nlc3M/OiBib29sZWFuO1xyXG4gICAgY29kZT86IG51bWJlcjtcclxuICAgIG1lc3NhZ2U/OiBzdHJpbmc7XHJcbiAgICBjb25zdHJ1Y3Rvcihpbml0PzogUGFydGlhbDxTZWFyY2hCYXNlUmVzcG9uc2U8VD4+KSB7XHJcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCBpbml0KTtcclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBCYXNlVGVtcGxhdGUge1xyXG4gICAgZGF0YT86IGFueTtcclxuICAgIHZhbGlkYXRpb25LZXk/OiBzdHJpbmc7XHJcbiAgICB0ZW1wbGF0ZT86IFR5cGU8YW55PjtcclxuICAgIGNvbnN0cnVjdG9yKGluaXQ/OiBQYXJ0aWFsPEJhc2VUZW1wbGF0ZT4pIHtcclxuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIGluaXQpO1xyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEFnZ3JlZ2F0b3JWaWV3TW9kZWwge1xyXG4gICAgdmFsdWU/OiBFdmVudEVtaXR0ZXI8YW55PjtcclxuICAgIGtleT86IHN0cmluZztcclxuICAgIGN1cnJlbnRFbWl0dGVyOiBhbnk7XHJcbiAgICBjb25zdHJ1Y3Rvcihpbml0PzogUGFydGlhbDxBZ2dyZWdhdG9yVmlld01vZGVsPikge1xyXG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgaW5pdCk7XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQnV0dG9uRGVmaW5pdGlvbiB7XHJcbiAgICBhY3Rpb246IHN0cmluZztcclxuICAgIHRpdGxlOiBzdHJpbmc7XHJcbiAgICBpY29uOiBzdHJpbmc7XHJcbiAgICBoaWRlOiBib29sZWFuO1xyXG4gICAgZGlzYWJsZWQ6IGJvb2xlYW47XHJcbiAgICBsYXp5bG9hZDogYm9vbGVhbjtcclxuICAgIHN0eWxlOiAnZGVmYXVsdCcgfCAnc3VjY2VzcycgfCAnd2FybmluZycgfCAnZGFuZ2VyJyB8ICdsaW5rJyB8ICdpbmZvJyB8ICdpbnZlcnNlJyB8ICdwcmltYXJ5JyB8ICdvdXRsaW5lLXByaW1hcnknIHwgJ291dGxpbmUtaW52ZXJzZScgPSAnZGVmYXVsdCc7XHJcbiAgICBjb25zdHJ1Y3Rvcihpbml0PzogUGFydGlhbDxCdXR0b25EZWZpbml0aW9uPikge1xyXG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgaW5pdCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBUb29sYmFyQWN0aW9uUGF5bG9hZCB7XHJcbiAgICBsb2FkZWRDYWxsYmFjazogRnVuY3Rpb247XHJcbiAgICBhY3Rpb246IHN0cmluZztcclxuICAgIGNhbGxiYWNrOiBGdW5jdGlvbjtcclxuICAgIGNvbnN0cnVjdG9yKGluaXQ/OiBQYXJ0aWFsPFRvb2xiYXJBY3Rpb25QYXlsb2FkPikge1xyXG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgaW5pdCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBPYmplY3RDaGFuZ2Uge1xyXG4gICAgcHJvcGVydHlOYW1lOiBzdHJpbmc7XHJcbiAgICBvbGRWYWx1ZTogYW55O1xyXG4gICAgbmV3VmFsdWU6IGFueTtcclxuICAgIGNoYW5nZVR5cGU6IENoYW5nZVR5cGU7XHJcbiAgICBjb25zdHJ1Y3Rvcihpbml0PzogUGFydGlhbDxPYmplY3RDaGFuZ2U+KSB7XHJcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCBpbml0KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIExvb2t1cEl0ZW0ge1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAga2V5Pzogc3RyaW5nO1xyXG4gICAgY29uc3RydWN0b3IoaW5pdD86IFBhcnRpYWw8TG9va3VwSXRlbT4pIHtcclxuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIGluaXQpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRXh0ZW5kZWRNYWluTWVudUdyb3VwIHtcclxuICAgIGxhYmVsOiBzdHJpbmc7XHJcbiAgICBjaGlsZHJlbjogYW55W107XHJcbiAgICBpY29uOiBzdHJpbmc7XHJcbiAgICBjb25zdHJ1Y3Rvcihpbml0PzogUGFydGlhbDxFeHRlbmRlZE1haW5NZW51R3JvdXA+KSB7XHJcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCBpbml0KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEtleVZhbHVlSXRlbSB7XHJcbiAgICBrZXk6IHN0cmluZztcclxuICAgIHZhbHVlOiBzdHJpbmc7XHJcbiAgICBjb25zdHJ1Y3Rvcihpbml0PzogUGFydGlhbDxLZXlWYWx1ZUl0ZW0+KSB7XHJcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCBpbml0KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEJyZWFkQ3J1bWJJdGVtIHtcclxuICAgIGxhYmVsOiBzdHJpbmc7XHJcbiAgICB1cmw6IHN0cmluZztcclxuICAgIGNvbnN0cnVjdG9yKGluaXQ/OiBQYXJ0aWFsPEJyZWFkQ3J1bWJJdGVtPikge1xyXG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgaW5pdCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBDb250cm9sVHlwZSB7XHJcbiAgICBzdGF0aWMgVGV4dGJveDogc3RyaW5nID0gJ1RleHRib3gnO1xyXG4gICAgc3RhdGljIERyb3Bkb3duOiBzdHJpbmcgPSAnRHJvcGRvd24nO1xyXG4gICAgc3RhdGljIEJ1dHRvbjogc3RyaW5nID0gJ0J1dHRvbic7XHJcbiAgICBjb25zdHJ1Y3Rvcihpbml0PzogUGFydGlhbDxDb250cm9sVHlwZT4pIHtcclxuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIGluaXQpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTWVudVRhYiB7XHJcbiAgICByb2xlOiBzdHJpbmc7XHJcbiAgICBpdGVtczogRXh0ZW5kZWRNYWluTWVudUdyb3VwW107XHJcbiAgICBjb25zdHJ1Y3Rvcihpbml0PzogUGFydGlhbDxNZW51VGFiPikge1xyXG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgaW5pdCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBNZW51SXRlbSB7XHJcbiAgICBtZW51OiBzdHJpbmc7XHJcbiAgICBpdGVtczogRXh0ZW5kZWRNYWluTWVudUdyb3VwW107XHJcbiAgICBzdWJOYW1lOiBzdHJpbmc7XHJcbiAgICBuYW1lPzogc3RyaW5nO1xyXG4gICAgY29uc3RydWN0b3IoaW5pdD86IFBhcnRpYWw8TWVudUl0ZW0+KSB7XHJcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCBpbml0KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEJyZWFkY3J1bWIge1xyXG4gICAgbGFiZWw6IHN0cmluZztcclxuICAgIHVybDogc3RyaW5nO1xyXG4gICAgc3RhdGU/OiBzdHJpbmc7XHJcbiAgICBjb25zdHJ1Y3Rvcihpbml0PzogUGFydGlhbDxCcmVhZGNydW1iPikge1xyXG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgaW5pdCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBNZWRpYUl0ZW0ge1xyXG4gICAgc3JjOiBzdHJpbmc7XHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICBmdWxsU3JjOiBzdHJpbmc7XHJcbiAgICBjb25zdHJ1Y3Rvcihpbml0PzogUGFydGlhbDxNZWRpYUl0ZW0+KSB7XHJcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCBpbml0KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEF1ZGl0IHtcclxuICAgIGNyZWF0ZWREYXRlPzogRGF0ZTtcclxuICAgIGNyZWF0ZWRCeT86IHN0cmluZztcclxuICAgIGxhc3RNb2RpZmllZERhdGU/OiBEYXRlO1xyXG4gICAgbGFzdE1vZGlmaWVkQnk/OiBzdHJpbmc7XHJcbiAgICBjb25zdHJ1Y3Rvcihpbml0PzogUGFydGlhbDxBdWRpdD4pIHtcclxuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIGluaXQpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVHJhY2tpbmdHcm91cCB7XHJcbiAgICBkYXRlOiBEYXRlO1xyXG4gICAgZGV0YWlsczogVHJhY2tpbmdEZXRhaWxbXTtcclxuICAgIGNvbnN0cnVjdG9yKGluaXQ/OiBQYXJ0aWFsPFRyYWNraW5nR3JvdXA+KSB7XHJcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCBpbml0KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFRyYWNraW5nRGV0YWlsIHtcclxuICAgIGRlc2NyaXB0aW9uOiBzdHJpbmc7XHJcbiAgICB0aW1lOiBEYXRlO1xyXG4gICAgY29uc3RydWN0b3IoaW5pdD86IFBhcnRpYWw8VHJhY2tpbmdEZXRhaWw+KSB7XHJcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCBpbml0KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFJlY29tbWVuZGF0aW9uUmVzcG9uc2Uge1xyXG4gICAga2V5d29yZHM/OiBzdHJpbmdbXTtcclxuICAgIGFkd29yZHM/OiBhbnlbXTtcclxuICAgIGhpc3RvcnlLZXl3b3Jkcz86IHN0cmluZ1tdO1xyXG4gICAgY2F0ZWdvcmllcz86IGFueVtdO1xyXG4gICAgcHJvZHVjdHM/OiBhbnlbXTtcclxuICAgIHRhZ3M/OiBzdHJpbmdbXTtcclxuICAgIGtleXdvcmQ/OiBzdHJpbmc7XHJcbiAgICBjb25zdHJ1Y3Rvcihpbml0PzogUGFydGlhbDxSZWNvbW1lbmRhdGlvblJlc3BvbnNlPikge1xyXG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgaW5pdCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUNhbGxiYWNrPFQ+IHtcclxuICAgIGlzVmFsaWQ6ICgpID0+IGJvb2xlYW47XHJcbiAgICBjYWxsYmFjazogKHZhbHVlOiBhbnkpID0+IE9ic2VydmFibGU8VD47XHJcbn0iXX0=