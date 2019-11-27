/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DataService } from '../services/data.service';
import { ValidationService } from '../validation/validation.service';
var ChipComponent = /** @class */ (function () {
    function ChipComponent(dataService) {
        this.dataService = dataService;
        this.placeholder = 'Nhập thông tin';
        this.emitNullOnDestroy = false;
        this.modelChange = new EventEmitter();
        this.onAdd = new EventEmitter();
        this.onRemove = new EventEmitter();
        this.onBlur = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ChipComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this.emitNullOnDestroy === true)
            this.modelChange.emit([]);
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    ChipComponent.prototype.handleBlur = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        this.onBlur.emit($event);
    };
    ChipComponent.decorators = [
        { type: Component, args: [{
                    selector: 'katana-chips',
                    template: "<div class=\"form-group\">\r\n  <label *ngIf=\"title\">{{title}}</label>\r\n  <div [attr.validation-name]=\"validationName\" [attr.scope]=\"validationScope ? validationScope : null\">\r\n    <tag-input (onBlur)=\"handleBlur($event)\" [disable]=\"disabled\" [ngModel]=\"model\"\r\n      (ngModelChange)=\"modelChange.emit($event)\" [modelAsStrings]=\"true\" ngClass=\"tag-select\" theme=\"minimal\"\r\n      [maxItems]=\"maxItems\" [placeholder]=\"placeholder\" [secondaryPlaceholder]=\"placeholder\"\r\n      (onAdd)=\"onAdd.emit($event)\" (onRemove)=\"onRemove.emit($event)\" [addOnBlur]=\"false\">\r\n    </tag-input>\r\n  </div>\r\n</div>",
                    styles: [":host /deep/ tag-input{overflow:hidden}:host /deep/ tag-input .tag-wrapper div{text-overflow:initial}:host /deep/ tag-input .tag-select{border:1px solid #e6e6e6}:host /deep/ tag-input tag-input-form input{width:300%}"]
                }] }
    ];
    /** @nocollapse */
    ChipComponent.ctorParameters = function () { return [
        { type: DataService }
    ]; };
    ChipComponent.propDecorators = {
        title: [{ type: Input }],
        model: [{ type: Input }],
        placeholder: [{ type: Input }],
        maxItems: [{ type: Input }],
        disabled: [{ type: Input }],
        validationName: [{ type: Input }],
        validationScope: [{ type: Input }],
        emitNullOnDestroy: [{ type: Input }],
        validationService: [{ type: Input }],
        modelChange: [{ type: Output }],
        onAdd: [{ type: Output }],
        onRemove: [{ type: Output }],
        onBlur: [{ type: Output }]
    };
    return ChipComponent;
}());
export { ChipComponent };
if (false) {
    /** @type {?} */
    ChipComponent.prototype.title;
    /** @type {?} */
    ChipComponent.prototype.model;
    /** @type {?} */
    ChipComponent.prototype.placeholder;
    /** @type {?} */
    ChipComponent.prototype.maxItems;
    /** @type {?} */
    ChipComponent.prototype.disabled;
    /** @type {?} */
    ChipComponent.prototype.validationName;
    /** @type {?} */
    ChipComponent.prototype.validationScope;
    /** @type {?} */
    ChipComponent.prototype.emitNullOnDestroy;
    /** @type {?} */
    ChipComponent.prototype.validationService;
    /** @type {?} */
    ChipComponent.prototype.modelChange;
    /** @type {?} */
    ChipComponent.prototype.onAdd;
    /** @type {?} */
    ChipComponent.prototype.onRemove;
    /** @type {?} */
    ChipComponent.prototype.onBlur;
    /**
     * @type {?}
     * @protected
     */
    ChipComponent.prototype.dataService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpcC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZnc0Yy8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL3NoYXJlZC9jaGlwL2NoaXAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFhLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUVyRTtJQXFCRSx1QkFBc0IsV0FBd0I7UUFBeEIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFaOUIsZ0JBQVcsR0FBVyxnQkFBZ0IsQ0FBQztRQUs5QyxzQkFBaUIsR0FBWSxLQUFLLENBQUM7UUFFM0IsZ0JBQVcsR0FBMkIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUN6RCxVQUFLLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDOUMsYUFBUSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ2pELFdBQU0sR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUVkLENBQUM7Ozs7SUFFbkQsbUNBQVc7OztJQUFYO1FBQ0UsSUFBSSxJQUFJLENBQUMsaUJBQWlCLEtBQUssSUFBSTtZQUNqQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM5QixDQUFDOzs7OztJQUVNLGtDQUFVOzs7O0lBQWpCLFVBQWtCLE1BQU07UUFDdEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDM0IsQ0FBQzs7Z0JBOUJGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsY0FBYztvQkFDeEIsNm9CQUFvQzs7aUJBRXJDOzs7O2dCQVBRLFdBQVc7Ozt3QkFVakIsS0FBSzt3QkFDTCxLQUFLOzhCQUNMLEtBQUs7MkJBQ0wsS0FBSzsyQkFDTCxLQUFLO2lDQUNMLEtBQUs7a0NBQ0wsS0FBSztvQ0FDTCxLQUFLO29DQUNMLEtBQUs7OEJBQ0wsTUFBTTt3QkFDTixNQUFNOzJCQUNOLE1BQU07eUJBQ04sTUFBTTs7SUFZVCxvQkFBQztDQUFBLEFBL0JELElBK0JDO1NBekJZLGFBQWE7OztJQUN4Qiw4QkFBOEI7O0lBQzlCLDhCQUFnQzs7SUFDaEMsb0NBQXVEOztJQUN2RCxpQ0FBaUM7O0lBQ2pDLGlDQUFrQzs7SUFDbEMsdUNBQXVDOztJQUN2Qyx3Q0FBd0M7O0lBQ3hDLDBDQUE0Qzs7SUFDNUMsMENBQThDOztJQUM5QyxvQ0FBMEU7O0lBQzFFLDhCQUErRDs7SUFDL0QsaUNBQWtFOztJQUNsRSwrQkFBZ0U7Ozs7O0lBRXBELG9DQUFrQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25EZXN0cm95LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRGF0YVNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9kYXRhLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBWYWxpZGF0aW9uU2VydmljZSB9IGZyb20gJy4uL3ZhbGlkYXRpb24vdmFsaWRhdGlvbi5zZXJ2aWNlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAna2F0YW5hLWNoaXBzJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vY2hpcC5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vY2hpcC5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgQ2hpcENvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XHJcbiAgQElucHV0KCkgcHVibGljIHRpdGxlOiBzdHJpbmc7XHJcbiAgQElucHV0KCkgcHVibGljIG1vZGVsOiBzdHJpbmdbXTtcclxuICBASW5wdXQoKSBwdWJsaWMgcGxhY2Vob2xkZXI6IHN0cmluZyA9ICdOaOG6rXAgdGjDtG5nIHRpbic7XHJcbiAgQElucHV0KCkgcHVibGljIG1heEl0ZW1zOiBudW1iZXI7XHJcbiAgQElucHV0KCkgcHVibGljIGRpc2FibGVkOiBib29sZWFuO1xyXG4gIEBJbnB1dCgpIHB1YmxpYyB2YWxpZGF0aW9uTmFtZTogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIHB1YmxpYyB2YWxpZGF0aW9uU2NvcGU6IHN0cmluZztcclxuICBASW5wdXQoKSBlbWl0TnVsbE9uRGVzdHJveTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIHZhbGlkYXRpb25TZXJ2aWNlOiBWYWxpZGF0aW9uU2VydmljZTtcclxuICBAT3V0cHV0KCkgcHVibGljIG1vZGVsQ2hhbmdlOiBFdmVudEVtaXR0ZXI8c3RyaW5nW10+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBPdXRwdXQoKSBwdWJsaWMgb25BZGQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBPdXRwdXQoKSBwdWJsaWMgb25SZW1vdmU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBPdXRwdXQoKSBwdWJsaWMgb25CbHVyOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIGRhdGFTZXJ2aWNlOiBEYXRhU2VydmljZSkgeyB9XHJcblxyXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuZW1pdE51bGxPbkRlc3Ryb3kgPT09IHRydWUpXHJcbiAgICAgIHRoaXMubW9kZWxDaGFuZ2UuZW1pdChbXSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgaGFuZGxlQmx1cigkZXZlbnQpOiB2b2lkIHtcclxuICAgIHRoaXMub25CbHVyLmVtaXQoJGV2ZW50KTtcclxuICB9XHJcbn1cclxuIl19