/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DataService } from '../services/data.service';
import { ValidationService } from '../validation/validation.service';
export class ChipComponent {
    /**
     * @param {?} dataService
     */
    constructor(dataService) {
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
    ngOnDestroy() {
        if (this.emitNullOnDestroy === true)
            this.modelChange.emit([]);
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    handleBlur($event) {
        this.onBlur.emit($event);
    }
}
ChipComponent.decorators = [
    { type: Component, args: [{
                selector: 'katana-chips',
                template: "<div class=\"form-group\">\r\n  <label *ngIf=\"title\">{{title}}</label>\r\n  <div [attr.validation-name]=\"validationName\" [attr.scope]=\"validationScope ? validationScope : null\">\r\n    <tag-input (onBlur)=\"handleBlur($event)\" [disable]=\"disabled\" [ngModel]=\"model\"\r\n      (ngModelChange)=\"modelChange.emit($event)\" [modelAsStrings]=\"true\" ngClass=\"tag-select\" theme=\"minimal\"\r\n      [maxItems]=\"maxItems\" [placeholder]=\"placeholder\" [secondaryPlaceholder]=\"placeholder\"\r\n      (onAdd)=\"onAdd.emit($event)\" (onRemove)=\"onRemove.emit($event)\" [addOnBlur]=\"false\">\r\n    </tag-input>\r\n  </div>\r\n</div>",
                styles: [":host /deep/ tag-input{overflow:hidden}:host /deep/ tag-input .tag-wrapper div{text-overflow:initial}:host /deep/ tag-input .tag-select{border:1px solid #e6e6e6}:host /deep/ tag-input tag-input-form input{width:300%}"]
            }] }
];
/** @nocollapse */
ChipComponent.ctorParameters = () => [
    { type: DataService }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpcC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZnc0Yy8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL3NoYXJlZC9jaGlwL2NoaXAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFhLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQVFyRSxNQUFNLE9BQU8sYUFBYTs7OztJQWV4QixZQUFzQixXQUF3QjtRQUF4QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQVo5QixnQkFBVyxHQUFXLGdCQUFnQixDQUFDO1FBSzlDLHNCQUFpQixHQUFZLEtBQUssQ0FBQztRQUUzQixnQkFBVyxHQUEyQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3pELFVBQUssR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUM5QyxhQUFRLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDakQsV0FBTSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO0lBRWQsQ0FBQzs7OztJQUVuRCxXQUFXO1FBQ1QsSUFBSSxJQUFJLENBQUMsaUJBQWlCLEtBQUssSUFBSTtZQUNqQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM5QixDQUFDOzs7OztJQUVNLFVBQVUsQ0FBQyxNQUFNO1FBQ3RCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzNCLENBQUM7OztZQTlCRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGNBQWM7Z0JBQ3hCLDZvQkFBb0M7O2FBRXJDOzs7O1lBUFEsV0FBVzs7O29CQVVqQixLQUFLO29CQUNMLEtBQUs7MEJBQ0wsS0FBSzt1QkFDTCxLQUFLO3VCQUNMLEtBQUs7NkJBQ0wsS0FBSzs4QkFDTCxLQUFLO2dDQUNMLEtBQUs7Z0NBQ0wsS0FBSzswQkFDTCxNQUFNO29CQUNOLE1BQU07dUJBQ04sTUFBTTtxQkFDTixNQUFNOzs7O0lBWlAsOEJBQThCOztJQUM5Qiw4QkFBZ0M7O0lBQ2hDLG9DQUF1RDs7SUFDdkQsaUNBQWlDOztJQUNqQyxpQ0FBa0M7O0lBQ2xDLHVDQUF1Qzs7SUFDdkMsd0NBQXdDOztJQUN4QywwQ0FBNEM7O0lBQzVDLDBDQUE4Qzs7SUFDOUMsb0NBQTBFOztJQUMxRSw4QkFBK0Q7O0lBQy9ELGlDQUFrRTs7SUFDbEUsK0JBQWdFOzs7OztJQUVwRCxvQ0FBa0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uRGVzdHJveSwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IERhdGFTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvZGF0YS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgVmFsaWRhdGlvblNlcnZpY2UgfSBmcm9tICcuLi92YWxpZGF0aW9uL3ZhbGlkYXRpb24uc2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2thdGFuYS1jaGlwcycsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2NoaXAuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2NoaXAuY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIENoaXBDb21wb25lbnQgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xyXG4gIEBJbnB1dCgpIHB1YmxpYyB0aXRsZTogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBtb2RlbDogc3RyaW5nW107XHJcbiAgQElucHV0KCkgcHVibGljIHBsYWNlaG9sZGVyOiBzdHJpbmcgPSAnTmjhuq1wIHRow7RuZyB0aW4nO1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBtYXhJdGVtczogbnVtYmVyO1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBkaXNhYmxlZDogYm9vbGVhbjtcclxuICBASW5wdXQoKSBwdWJsaWMgdmFsaWRhdGlvbk5hbWU6IHN0cmluZztcclxuICBASW5wdXQoKSBwdWJsaWMgdmFsaWRhdGlvblNjb3BlOiBzdHJpbmc7XHJcbiAgQElucHV0KCkgZW1pdE51bGxPbkRlc3Ryb3k6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBASW5wdXQoKSB2YWxpZGF0aW9uU2VydmljZTogVmFsaWRhdGlvblNlcnZpY2U7XHJcbiAgQE91dHB1dCgpIHB1YmxpYyBtb2RlbENoYW5nZTogRXZlbnRFbWl0dGVyPHN0cmluZ1tdPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBAT3V0cHV0KCkgcHVibGljIG9uQWRkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBAT3V0cHV0KCkgcHVibGljIG9uUmVtb3ZlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBAT3V0cHV0KCkgcHVibGljIG9uQmx1cjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBkYXRhU2VydmljZTogRGF0YVNlcnZpY2UpIHsgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLmVtaXROdWxsT25EZXN0cm95ID09PSB0cnVlKVxyXG4gICAgICB0aGlzLm1vZGVsQ2hhbmdlLmVtaXQoW10pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGhhbmRsZUJsdXIoJGV2ZW50KTogdm9pZCB7XHJcbiAgICB0aGlzLm9uQmx1ci5lbWl0KCRldmVudCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==