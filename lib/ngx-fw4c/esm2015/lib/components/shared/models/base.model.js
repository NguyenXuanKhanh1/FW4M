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
    /** @type {?} */
    ExtendedMainMenuGroup.prototype.selected;
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
    /** @type {?} */
    MenuItem.prototype.selected;
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
        this.show = false;
        this.label = 'Kết quả gợi ý';
        this.deboundTime = 500;
        this.all = false;
        Object.assign(this, init);
    }
}
if (false) {
    /** @type {?} */
    RecommendationResponse.prototype.selectedMenu;
    /** @type {?} */
    RecommendationResponse.prototype.keyword;
    /** @type {?} */
    RecommendationResponse.prototype.show;
    /** @type {?} */
    RecommendationResponse.prototype.searchPath;
    /** @type {?} */
    RecommendationResponse.prototype.template;
    /** @type {?} */
    RecommendationResponse.prototype.label;
    /** @type {?} */
    RecommendationResponse.prototype.deboundTime;
    /** @type {?} */
    RecommendationResponse.prototype.all;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1mdzRjLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvc2hhcmVkL21vZGVscy9iYXNlLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFJQSxNQUFNLE9BQU8sUUFBUTs7OztJQUVqQixZQUFZLElBQTJCO1FBQ25DLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFBQSxDQUFDO0NBQ0w7OztJQUpHLDRCQUFlOzs7Ozs7QUFNbkIsTUFBTSxPQUFPLFdBQWUsU0FBUSxRQUFXOzs7O0lBRTNDLFlBQVksSUFBOEI7UUFDdEMsS0FBSyxFQUFFLENBQUM7UUFDUixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBQUEsQ0FBQztDQUNMOzs7SUFMRyw4QkFBWTs7Ozs7O0FBT2hCLE1BQU0sT0FBTyxZQUFZOzs7O0lBS3JCLFlBQVksSUFBK0I7UUFDdkMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUFBLENBQUM7Q0FDTDs7O0lBUEcsNEJBQVM7O0lBQ1QsK0JBQWtCOztJQUNsQiw0QkFBYzs7SUFDZCwrQkFBaUI7OztBQU1yQixNQUFNLE9BQU8saUJBQWtCLFNBQVEsUUFBYTs7OztJQU9oRCxZQUFZLElBQWlDO1FBQ3pDLEtBQUssRUFBRSxDQUFDO1FBQ1IsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUFBLENBQUM7Q0FDTDs7O0lBVkcsdUNBQW9COztJQUNwQixzQ0FBbUI7O0lBQ25CLHFDQUFrQjs7SUFDbEIsc0NBQW1COztJQUNuQixvQ0FBaUI7O0lBQ2pCLGdDQUFjOzs7Ozs7QUFPbEIsTUFBTSxPQUFPLGtCQUFrQjs7OztJQUszQixZQUFZLElBQXFDO1FBQzdDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFBQSxDQUFDO0NBQ0w7OztJQVBHLG1DQUFZOztJQUNaLHFDQUFrQjs7SUFDbEIsa0NBQWM7O0lBQ2QscUNBQWlCOzs7QUFNckIsTUFBTSxPQUFPLFlBQVk7Ozs7SUFJckIsWUFBWSxJQUE0QjtRQUNwQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBQUEsQ0FBQztDQUNMOzs7SUFORyw0QkFBVzs7SUFDWCxxQ0FBdUI7O0lBQ3ZCLGdDQUFxQjs7O0FBTXpCLE1BQU0sT0FBTyxtQkFBbUI7Ozs7SUFJNUIsWUFBWSxJQUFtQztRQUMzQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBQUEsQ0FBQztDQUNMOzs7SUFORyxvQ0FBMEI7O0lBQzFCLGtDQUFhOztJQUNiLDZDQUFvQjs7O0FBTXhCLE1BQU0sT0FBTyxnQkFBZ0I7Ozs7SUFRekIsWUFBWSxJQUFnQztRQUQ1QyxVQUFLLEdBQW1JLFNBQVMsQ0FBQztRQUU5SSxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM5QixDQUFDO0NBQ0o7OztJQVZHLGtDQUFlOztJQUNmLGlDQUFjOztJQUNkLGdDQUFhOztJQUNiLGdDQUFjOztJQUNkLG9DQUFrQjs7SUFDbEIsb0NBQWtCOztJQUNsQixpQ0FBa0o7O0FBTXRKLE1BQU0sT0FBTyxvQkFBb0I7Ozs7SUFJN0IsWUFBWSxJQUFvQztRQUM1QyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM5QixDQUFDO0NBQ0o7OztJQU5HLDhDQUF5Qjs7SUFDekIsc0NBQWU7O0lBQ2Ysd0NBQW1COztBQU12QixNQUFNLE9BQU8sWUFBWTs7OztJQUtyQixZQUFZLElBQTRCO1FBQ3BDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzlCLENBQUM7Q0FDSjs7O0lBUEcsb0NBQXFCOztJQUNyQixnQ0FBYzs7SUFDZCxnQ0FBYzs7SUFDZCxrQ0FBdUI7O0FBTTNCLE1BQU0sT0FBTyxVQUFVOzs7O0lBR25CLFlBQVksSUFBMEI7UUFDbEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDOUIsQ0FBQztDQUNKOzs7SUFMRywwQkFBYTs7SUFDYix5QkFBYTs7QUFNakIsTUFBTSxPQUFPLHFCQUFxQjs7OztJQUs5QixZQUFZLElBQXFDO1FBQzdDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzlCLENBQUM7Q0FDSjs7O0lBUEcsc0NBQWM7O0lBQ2QseUNBQWdCOztJQUNoQixxQ0FBYTs7SUFDYix5Q0FBbUI7O0FBTXZCLE1BQU0sT0FBTyxZQUFZOzs7O0lBR3JCLFlBQVksSUFBNEI7UUFDcEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDOUIsQ0FBQztDQUNKOzs7SUFMRywyQkFBWTs7SUFDWiw2QkFBYzs7QUFNbEIsTUFBTSxPQUFPLGNBQWM7Ozs7SUFHdkIsWUFBWSxJQUE4QjtRQUN0QyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM5QixDQUFDO0NBQ0o7OztJQUxHLCtCQUFjOztJQUNkLDZCQUFZOztBQU1oQixNQUFNLE9BQU8sV0FBVzs7OztJQUlwQixZQUFZLElBQTJCO1FBQ25DLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzlCLENBQUM7O0FBTE0sbUJBQU8sR0FBVyxTQUFTLENBQUM7QUFDNUIsb0JBQVEsR0FBVyxVQUFVLENBQUM7QUFDOUIsa0JBQU0sR0FBVyxRQUFRLENBQUM7OztJQUZqQyxvQkFBbUM7O0lBQ25DLHFCQUFxQzs7SUFDckMsbUJBQWlDOztBQU1yQyxNQUFNLE9BQU8sT0FBTzs7OztJQUdoQixZQUFZLElBQXVCO1FBQy9CLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzlCLENBQUM7Q0FDSjs7O0lBTEcsdUJBQWE7O0lBQ2Isd0JBQStCOztBQU1uQyxNQUFNLE9BQU8sUUFBUTs7OztJQU1qQixZQUFZLElBQXdCO1FBQ2hDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzlCLENBQUM7Q0FDSjs7O0lBUkcsd0JBQWE7O0lBQ2IseUJBQStCOztJQUMvQiwyQkFBZ0I7O0lBQ2hCLHdCQUFjOztJQUNkLDRCQUFtQjs7QUFNdkIsTUFBTSxPQUFPLFVBQVU7Ozs7SUFJbkIsWUFBWSxJQUEwQjtRQUNsQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM5QixDQUFDO0NBQ0o7OztJQU5HLDJCQUFjOztJQUNkLHlCQUFZOztJQUNaLDJCQUFlOztBQU1uQixNQUFNLE9BQU8sU0FBUzs7OztJQUlsQixZQUFZLElBQXlCO1FBQ2pDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzlCLENBQUM7Q0FDSjs7O0lBTkcsd0JBQVk7O0lBQ1oseUJBQWE7O0lBQ2IsNEJBQWdCOztBQU1wQixNQUFNLE9BQU8sS0FBSzs7OztJQUtkLFlBQVksSUFBcUI7UUFDN0IsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDOUIsQ0FBQztDQUNKOzs7SUFQRyw0QkFBbUI7O0lBQ25CLDBCQUFtQjs7SUFDbkIsaUNBQXdCOztJQUN4QiwrQkFBd0I7O0FBTTVCLE1BQU0sT0FBTyxhQUFhOzs7O0lBR3RCLFlBQVksSUFBNkI7UUFDckMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDOUIsQ0FBQztDQUNKOzs7SUFMRyw2QkFBVzs7SUFDWCxnQ0FBMEI7O0FBTTlCLE1BQU0sT0FBTyxjQUFjOzs7O0lBR3ZCLFlBQVksSUFBOEI7UUFDdEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDOUIsQ0FBQztDQUNKOzs7SUFMRyxxQ0FBb0I7O0lBQ3BCLDhCQUFXOztBQU1mLE1BQU0sT0FBTyxzQkFBc0I7Ozs7SUFTL0IsWUFBWSxJQUFzQztRQU5sRCxTQUFJLEdBQVksS0FBSyxDQUFDO1FBR3RCLFVBQUssR0FBVyxlQUFlLENBQUM7UUFDaEMsZ0JBQVcsR0FBVyxHQUFHLENBQUM7UUFDMUIsUUFBRyxHQUFZLEtBQUssQ0FBQztRQUVqQixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM5QixDQUFDO0NBQ0o7OztJQVhHLDhDQUFzQjs7SUFDdEIseUNBQWlCOztJQUNqQixzQ0FBc0I7O0lBQ3RCLDRDQUFvQjs7SUFDcEIsMENBQXFCOztJQUNyQix1Q0FBZ0M7O0lBQ2hDLDZDQUEwQjs7SUFDMUIscUNBQXFCOzs7Ozs7QUFNekIsK0JBR0M7OztJQUZHLDRCQUF1Qjs7SUFDdkIsNkJBQXdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVHlwZSwgRXZlbnRFbWl0dGVyLCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDaGFuZ2VUeXBlIH0gZnJvbSAnLi4vZW51bXMvYmFzZS5lbnVtJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIE1vY2tEYXRhPFQ+IHtcclxuICAgIG1vY2tEYXRhPzogYW55O1xyXG4gICAgY29uc3RydWN0b3IoaW5pdD86IFBhcnRpYWw8TW9ja0RhdGE8VD4+KSB7XHJcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCBpbml0KTtcclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBCYXNlUmVxdWVzdDxUPiBleHRlbmRzIE1vY2tEYXRhPFQ+IHtcclxuICAgIHBheWxvYWQ/OiBUO1xyXG4gICAgY29uc3RydWN0b3IoaW5pdD86IFBhcnRpYWw8QmFzZVJlcXVlc3Q8VD4+KSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIGluaXQpO1xyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEJhc2VSZXNwb25zZTxUPiB7XHJcbiAgICBkYXRhPzogVDtcclxuICAgIHN1Y2Nlc3M/OiBib29sZWFuO1xyXG4gICAgY29kZT86IG51bWJlcjtcclxuICAgIG1lc3NhZ2U/OiBzdHJpbmc7XHJcbiAgICBjb25zdHJ1Y3Rvcihpbml0PzogUGFydGlhbDxCYXNlUmVzcG9uc2U8VD4+KSB7XHJcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCBpbml0KTtcclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBTZWFyY2hCYXNlUmVxdWVzdCBleHRlbmRzIE1vY2tEYXRhPGFueT4ge1xyXG4gICAgc2VhcmNoVGV4dD86IHN0cmluZztcclxuICAgIHBhZ2VJbmRleD86IG51bWJlcjtcclxuICAgIHBhZ2VTaXplPzogbnVtYmVyO1xyXG4gICAgZGlyZWN0aW9uPzogc3RyaW5nO1xyXG4gICAgb3JkZXJCeT86IHN0cmluZztcclxuICAgIGFsbD86IGJvb2xlYW47XHJcbiAgICBjb25zdHJ1Y3Rvcihpbml0PzogUGFydGlhbDxTZWFyY2hCYXNlUmVxdWVzdD4pIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgaW5pdCk7XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU2VhcmNoQmFzZVJlc3BvbnNlPFQ+IHtcclxuICAgIGl0ZW1zPzogVFtdO1xyXG4gICAgc3VjY2Vzcz86IGJvb2xlYW47XHJcbiAgICBjb2RlPzogbnVtYmVyO1xyXG4gICAgbWVzc2FnZT86IHN0cmluZztcclxuICAgIGNvbnN0cnVjdG9yKGluaXQ/OiBQYXJ0aWFsPFNlYXJjaEJhc2VSZXNwb25zZTxUPj4pIHtcclxuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIGluaXQpO1xyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEJhc2VUZW1wbGF0ZSB7XHJcbiAgICBkYXRhPzogYW55O1xyXG4gICAgdmFsaWRhdGlvbktleT86IHN0cmluZztcclxuICAgIHRlbXBsYXRlPzogVHlwZTxhbnk+O1xyXG4gICAgY29uc3RydWN0b3IoaW5pdD86IFBhcnRpYWw8QmFzZVRlbXBsYXRlPikge1xyXG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgaW5pdCk7XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQWdncmVnYXRvclZpZXdNb2RlbCB7XHJcbiAgICB2YWx1ZT86IEV2ZW50RW1pdHRlcjxhbnk+O1xyXG4gICAga2V5Pzogc3RyaW5nO1xyXG4gICAgY3VycmVudEVtaXR0ZXI6IGFueTtcclxuICAgIGNvbnN0cnVjdG9yKGluaXQ/OiBQYXJ0aWFsPEFnZ3JlZ2F0b3JWaWV3TW9kZWw+KSB7XHJcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCBpbml0KTtcclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBCdXR0b25EZWZpbml0aW9uIHtcclxuICAgIGFjdGlvbjogc3RyaW5nO1xyXG4gICAgdGl0bGU6IHN0cmluZztcclxuICAgIGljb246IHN0cmluZztcclxuICAgIGhpZGU6IGJvb2xlYW47XHJcbiAgICBkaXNhYmxlZDogYm9vbGVhbjtcclxuICAgIGxhenlsb2FkOiBib29sZWFuO1xyXG4gICAgc3R5bGU6ICdkZWZhdWx0JyB8ICdzdWNjZXNzJyB8ICd3YXJuaW5nJyB8ICdkYW5nZXInIHwgJ2xpbmsnIHwgJ2luZm8nIHwgJ2ludmVyc2UnIHwgJ3ByaW1hcnknIHwgJ291dGxpbmUtcHJpbWFyeScgfCAnb3V0bGluZS1pbnZlcnNlJyA9ICdkZWZhdWx0JztcclxuICAgIGNvbnN0cnVjdG9yKGluaXQ/OiBQYXJ0aWFsPEJ1dHRvbkRlZmluaXRpb24+KSB7XHJcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCBpbml0KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFRvb2xiYXJBY3Rpb25QYXlsb2FkIHtcclxuICAgIGxvYWRlZENhbGxiYWNrOiBGdW5jdGlvbjtcclxuICAgIGFjdGlvbjogc3RyaW5nO1xyXG4gICAgY2FsbGJhY2s6IEZ1bmN0aW9uO1xyXG4gICAgY29uc3RydWN0b3IoaW5pdD86IFBhcnRpYWw8VG9vbGJhckFjdGlvblBheWxvYWQ+KSB7XHJcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCBpbml0KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE9iamVjdENoYW5nZSB7XHJcbiAgICBwcm9wZXJ0eU5hbWU6IHN0cmluZztcclxuICAgIG9sZFZhbHVlOiBhbnk7XHJcbiAgICBuZXdWYWx1ZTogYW55O1xyXG4gICAgY2hhbmdlVHlwZTogQ2hhbmdlVHlwZTtcclxuICAgIGNvbnN0cnVjdG9yKGluaXQ/OiBQYXJ0aWFsPE9iamVjdENoYW5nZT4pIHtcclxuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIGluaXQpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTG9va3VwSXRlbSB7XHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICBrZXk/OiBzdHJpbmc7XHJcbiAgICBjb25zdHJ1Y3Rvcihpbml0PzogUGFydGlhbDxMb29rdXBJdGVtPikge1xyXG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgaW5pdCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBFeHRlbmRlZE1haW5NZW51R3JvdXAge1xyXG4gICAgbGFiZWw6IHN0cmluZztcclxuICAgIGNoaWxkcmVuOiBhbnlbXTtcclxuICAgIGljb246IHN0cmluZztcclxuICAgIHNlbGVjdGVkPzogYm9vbGVhbjtcclxuICAgIGNvbnN0cnVjdG9yKGluaXQ/OiBQYXJ0aWFsPEV4dGVuZGVkTWFpbk1lbnVHcm91cD4pIHtcclxuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIGluaXQpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgS2V5VmFsdWVJdGVtIHtcclxuICAgIGtleTogc3RyaW5nO1xyXG4gICAgdmFsdWU6IHN0cmluZztcclxuICAgIGNvbnN0cnVjdG9yKGluaXQ/OiBQYXJ0aWFsPEtleVZhbHVlSXRlbT4pIHtcclxuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIGluaXQpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQnJlYWRDcnVtYkl0ZW0ge1xyXG4gICAgbGFiZWw6IHN0cmluZztcclxuICAgIHVybDogc3RyaW5nO1xyXG4gICAgY29uc3RydWN0b3IoaW5pdD86IFBhcnRpYWw8QnJlYWRDcnVtYkl0ZW0+KSB7XHJcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCBpbml0KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIENvbnRyb2xUeXBlIHtcclxuICAgIHN0YXRpYyBUZXh0Ym94OiBzdHJpbmcgPSAnVGV4dGJveCc7XHJcbiAgICBzdGF0aWMgRHJvcGRvd246IHN0cmluZyA9ICdEcm9wZG93bic7XHJcbiAgICBzdGF0aWMgQnV0dG9uOiBzdHJpbmcgPSAnQnV0dG9uJztcclxuICAgIGNvbnN0cnVjdG9yKGluaXQ/OiBQYXJ0aWFsPENvbnRyb2xUeXBlPikge1xyXG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgaW5pdCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBNZW51VGFiIHtcclxuICAgIHJvbGU6IHN0cmluZztcclxuICAgIGl0ZW1zOiBFeHRlbmRlZE1haW5NZW51R3JvdXBbXTtcclxuICAgIGNvbnN0cnVjdG9yKGluaXQ/OiBQYXJ0aWFsPE1lbnVUYWI+KSB7XHJcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCBpbml0KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE1lbnVJdGVtIHtcclxuICAgIG1lbnU6IHN0cmluZztcclxuICAgIGl0ZW1zOiBFeHRlbmRlZE1haW5NZW51R3JvdXBbXTtcclxuICAgIHN1Yk5hbWU6IHN0cmluZztcclxuICAgIG5hbWU/OiBzdHJpbmc7XHJcbiAgICBzZWxlY3RlZD86IGJvb2xlYW47XHJcbiAgICBjb25zdHJ1Y3Rvcihpbml0PzogUGFydGlhbDxNZW51SXRlbT4pIHtcclxuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIGluaXQpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQnJlYWRjcnVtYiB7XHJcbiAgICBsYWJlbDogc3RyaW5nO1xyXG4gICAgdXJsOiBzdHJpbmc7XHJcbiAgICBzdGF0ZT86IHN0cmluZztcclxuICAgIGNvbnN0cnVjdG9yKGluaXQ/OiBQYXJ0aWFsPEJyZWFkY3J1bWI+KSB7XHJcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCBpbml0KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE1lZGlhSXRlbSB7XHJcbiAgICBzcmM6IHN0cmluZztcclxuICAgIG5hbWU6IHN0cmluZztcclxuICAgIGZ1bGxTcmM6IHN0cmluZztcclxuICAgIGNvbnN0cnVjdG9yKGluaXQ/OiBQYXJ0aWFsPE1lZGlhSXRlbT4pIHtcclxuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIGluaXQpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQXVkaXQge1xyXG4gICAgY3JlYXRlZERhdGU/OiBEYXRlO1xyXG4gICAgY3JlYXRlZEJ5Pzogc3RyaW5nO1xyXG4gICAgbGFzdE1vZGlmaWVkRGF0ZT86IERhdGU7XHJcbiAgICBsYXN0TW9kaWZpZWRCeT86IHN0cmluZztcclxuICAgIGNvbnN0cnVjdG9yKGluaXQ/OiBQYXJ0aWFsPEF1ZGl0Pikge1xyXG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgaW5pdCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBUcmFja2luZ0dyb3VwIHtcclxuICAgIGRhdGU6IERhdGU7XHJcbiAgICBkZXRhaWxzOiBUcmFja2luZ0RldGFpbFtdO1xyXG4gICAgY29uc3RydWN0b3IoaW5pdD86IFBhcnRpYWw8VHJhY2tpbmdHcm91cD4pIHtcclxuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIGluaXQpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVHJhY2tpbmdEZXRhaWwge1xyXG4gICAgZGVzY3JpcHRpb246IHN0cmluZztcclxuICAgIHRpbWU6IERhdGU7XHJcbiAgICBjb25zdHJ1Y3Rvcihpbml0PzogUGFydGlhbDxUcmFja2luZ0RldGFpbD4pIHtcclxuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIGluaXQpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUmVjb21tZW5kYXRpb25SZXNwb25zZSB7XHJcbiAgICBzZWxlY3RlZE1lbnU/OiBzdHJpbmc7XHJcbiAgICBrZXl3b3JkPzogc3RyaW5nO1xyXG4gICAgc2hvdzogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgc2VhcmNoUGF0aD86IHN0cmluZztcclxuICAgIHRlbXBsYXRlPzogVHlwZTxhbnk+O1xyXG4gICAgbGFiZWw6IHN0cmluZyA9ICdL4bq/dCBxdeG6oyBn4bujaSDDvSc7XHJcbiAgICBkZWJvdW5kVGltZTogbnVtYmVyID0gNTAwO1xyXG4gICAgYWxsOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBjb25zdHJ1Y3Rvcihpbml0PzogUGFydGlhbDxSZWNvbW1lbmRhdGlvblJlc3BvbnNlPikge1xyXG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgaW5pdCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUNhbGxiYWNrPFQ+IHtcclxuICAgIGlzVmFsaWQ6ICgpID0+IGJvb2xlYW47XHJcbiAgICBjYWxsYmFjazogKHZhbHVlOiBhbnkpID0+IE9ic2VydmFibGU8VD47XHJcbn0iXX0=