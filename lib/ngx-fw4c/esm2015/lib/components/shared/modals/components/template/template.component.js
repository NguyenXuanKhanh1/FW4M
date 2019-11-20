/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BsModalRef } from 'ngx-bootstrap';
import { LoaderComponent } from '../../../loader/loader.component';
import { AggregatorService } from '../../../services/aggregator.service';
export class TemplateComponent {
    /**
     * @param {?} _sanitizationService
     * @param {?} _aggregatorService
     * @param {?} _modalRef
     */
    constructor(_sanitizationService, _aggregatorService, _modalRef) {
        this._sanitizationService = _sanitizationService;
        this._aggregatorService = _aggregatorService;
        this._modalRef = _modalRef;
    }
    /**
     * @param {?} html
     * @return {?}
     */
    bypassSecurityTrustHtml(html) {
        return this._sanitizationService.bypassSecurityTrustHtml(html);
    }
    /**
     * @return {?}
     */
    cancel() {
        if (this.data.cancelCallback) {
            this.data.cancelCallback(null, (/**
             * @return {?}
             */
            () => {
                this._modalRef.hide();
            }), this.loader.componentRef.instance);
        }
        else {
            this._modalRef.hide();
        }
        if (this.data.autoClose != false) {
            this._modalRef.hide();
        }
    }
    /**
     * @param {?} close
     * @return {?}
     */
    accept(close) {
        this.close = close;
        this.setKey((/**
         * @return {?}
         */
        () => {
            this.isValid();
        }));
    }
    /**
     * @return {?}
     */
    show() {
        if (this.loader && this.loader.componentRef && this.loader.componentRef.instance) {
            return this.loader.componentRef.instance.show();
        }
        else {
            return false;
        }
    }
    /**
     * @return {?}
     */
    isValid() {
        if (this.loader && this.loader.componentRef && this.loader.componentRef.instance && this.loader.componentRef.instance.isValid) {
            return this.loader.componentRef.instance.isValid();
        }
        else {
            return false;
        }
    }
    /**
     * @param {?} callback
     * @return {?}
     */
    setKey(callback) {
        if (this.loader && this.loader.componentRef && this.loader.componentRef.instance && this.loader.componentRef.instance.getValidator) {
            /** @type {?} */
            var validator = (/** @type {?} */ (this.loader.componentRef.instance.getValidator()));
            this.key = this.data.validationKey;
            if (validator)
                validator.setKey(this.key);
            this._aggregatorService.subscribe(this.key, (/**
             * @param {?} errors
             * @return {?}
             */
            (errors) => {
                this.close();
                if (!errors || errors.length == 0) {
                    if (this.data.acceptCallback) {
                        this._modalRef.hide();
                        this.loader.componentRef.instance.callback(this.data.mode).subscribe((/**
                         * @param {?} response
                         * @return {?}
                         */
                        (response) => {
                            this.data.acceptCallback(response, (/**
                             * @return {?}
                             */
                            () => {
                                this._modalRef.hide();
                            }), this.loader.componentRef.instance);
                        }));
                    }
                    else {
                        this._modalRef.hide();
                    }
                    if (this.data.autoClose != false) {
                        this._modalRef.hide();
                    }
                }
            }));
            if (callback)
                callback();
        }
    }
}
TemplateComponent.decorators = [
    { type: Component, args: [{
                selector: 'katana-template',
                template: "<div class=\"modal-header\">\r\n  <h4 class=\"modal-title\"><span class=\"{{data?.icon ? data?.icon : 'fa fa-twitter'}}\" style=\"font-size: 30px;\"></span>\r\n    <span style=\"position: absolute;margin: 4px 0px 0px 10px;\">{{data?.title ? data?.title : 'Template'}}</span></h4>\r\n</div>\r\n<div class=\"modal-body\">\r\n  <katana-loader #loader [data]=\"data?.data\" [template]=\"data?.template\"></katana-loader>\r\n</div>\r\n<div class=\"modal-footer\">\r\n  <katana-button (execute)=\"cancel()\" [customClass]=\"'default'\"\r\n    title=\"{{data?.btnCancelTitle ? data?.btnCancelTitle : 'Cancel'}}\"></katana-button>\r\n  <katana-button [lazyload]=\"true\" (execute)=\"accept($event)\" [customClass]=\"'primary'\"\r\n    title=\"{{data?.btnAcceptTitle ? data?.btnAcceptTitle : 'Accept'}}\"></katana-button>\r\n</div>",
                encapsulation: ViewEncapsulation.None,
                styles: [".modal-title{font-size:16px;text-transform:uppercase}.modal-content{border:none!important}"]
            }] }
];
/** @nocollapse */
TemplateComponent.ctorParameters = () => [
    { type: DomSanitizer },
    { type: AggregatorService },
    { type: BsModalRef }
];
TemplateComponent.propDecorators = {
    loader: [{ type: ViewChild, args: ['loader', { static: false },] }]
};
if (false) {
    /** @type {?} */
    TemplateComponent.prototype.loader;
    /** @type {?} */
    TemplateComponent.prototype.data;
    /**
     * @type {?}
     * @protected
     */
    TemplateComponent.prototype.close;
    /**
     * @type {?}
     * @protected
     */
    TemplateComponent.prototype.key;
    /**
     * @type {?}
     * @private
     */
    TemplateComponent.prototype._sanitizationService;
    /**
     * @type {?}
     * @private
     */
    TemplateComponent.prototype._aggregatorService;
    /** @type {?} */
    TemplateComponent.prototype._modalRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWZ3NGMvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9zaGFyZWQvbW9kYWxzL2NvbXBvbmVudHMvdGVtcGxhdGUvdGVtcGxhdGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN4RSxPQUFPLEVBQUUsWUFBWSxFQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDbkUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDbkUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFXekUsTUFBTSxPQUFPLGlCQUFpQjs7Ozs7O0lBTTFCLFlBQ1ksb0JBQWtDLEVBQ2xDLGtCQUFxQyxFQUN0QyxTQUFxQjtRQUZwQix5QkFBb0IsR0FBcEIsb0JBQW9CLENBQWM7UUFDbEMsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFtQjtRQUN0QyxjQUFTLEdBQVQsU0FBUyxDQUFZO0lBQ2hDLENBQUM7Ozs7O0lBRU0sdUJBQXVCLENBQUMsSUFBWTtRQUN2QyxPQUFPLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNuRSxDQUFDOzs7O0lBRU0sTUFBTTtRQUNULElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUU7WUFDMUIsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSTs7O1lBQUUsR0FBRyxFQUFFO2dCQUNoQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQzFCLENBQUMsR0FBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FB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QUFTLENBQUMsSUFBSSxFQUFFLENBQUM7cUJBQ3pCO29CQUNELElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUksS0FBSyxFQUFFO3dCQUM5QixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO3FCQUN6QjtpQkFDSjtZQUNMLENBQUMsRUFBQyxDQUFDO1lBQ0gsSUFBSSxRQUFRO2dCQUFFLFFBQVEsRUFBRSxDQUFDO1NBQzVCO0lBQ0wsQ0FBQzs7O1lBcEZKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsaUJBQWlCO2dCQUMzQixrMEJBQXdDO2dCQUV4QyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTs7YUFDeEM7Ozs7WUFiUSxZQUFZO1lBSVosaUJBQWlCO1lBSGpCLFVBQVU7OztxQkFlZCxTQUFTLFNBQUMsUUFBUSxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTs7OztJQUF0QyxtQ0FBdUU7O0lBQ3ZFLGlDQUErQjs7Ozs7SUFDL0Isa0NBQTBCOzs7OztJQUMxQixnQ0FBc0I7Ozs7O0lBR2xCLGlEQUEwQzs7Ozs7SUFDMUMsK0NBQTZDOztJQUM3QyxzQ0FBNEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIFZpZXdFbmNhcHN1bGF0aW9uLCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRG9tU2FuaXRpemVyLCBTYWZlSHRtbCB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xyXG5pbXBvcnQgeyBCc01vZGFsUmVmIH0gZnJvbSAnbmd4LWJvb3RzdHJhcCc7XHJcbmltcG9ydCB7IFRlbXBsYXRlVmlld01vZGVsIH0gZnJvbSAnLi4vLi4vbW9kYWwubW9kZWwnO1xyXG5pbXBvcnQgeyBMb2FkZXJDb21wb25lbnQgfSBmcm9tICcuLi8uLi8uLi9sb2FkZXIvbG9hZGVyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEFnZ3JlZ2F0b3JTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2VydmljZXMvYWdncmVnYXRvci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgVmFsaWRhdGlvblNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi92YWxpZGF0aW9uL3ZhbGlkYXRpb24uc2VydmljZSc7XHJcbmltcG9ydCB7IFN1bW1hcnlFcnJvciB9IGZyb20gJy4uLy4uLy4uL3ZhbGlkYXRpb24vdmFsaWRhdGlvbi5tb2RlbCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAna2F0YW5hLXRlbXBsYXRlJyxcclxuICAgIHRlbXBsYXRlVXJsOiAnLi90ZW1wbGF0ZS5jb21wb25lbnQuaHRtbCcsXHJcbiAgICBzdHlsZVVybHM6IFsnLi90ZW1wbGF0ZS5jb21wb25lbnQuc2NzcyddLFxyXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIFRlbXBsYXRlQ29tcG9uZW50IHtcclxuICAgIEBWaWV3Q2hpbGQoJ2xvYWRlcicsIHsgc3RhdGljOiBmYWxzZSB9KSBwdWJsaWMgbG9hZGVyOiBMb2FkZXJDb21wb25lbnQ7XHJcbiAgICBwdWJsaWMgZGF0YTogVGVtcGxhdGVWaWV3TW9kZWw7XHJcbiAgICBwcm90ZWN0ZWQgY2xvc2U6IEZ1bmN0aW9uO1xyXG4gICAgcHJvdGVjdGVkIGtleTogc3RyaW5nO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgX3Nhbml0aXphdGlvblNlcnZpY2U6IERvbVNhbml0aXplcixcclxuICAgICAgICBwcml2YXRlIF9hZ2dyZWdhdG9yU2VydmljZTogQWdncmVnYXRvclNlcnZpY2UsXHJcbiAgICAgICAgcHVibGljIF9tb2RhbFJlZjogQnNNb2RhbFJlZikge1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBieXBhc3NTZWN1cml0eVRydXN0SHRtbChodG1sOiBzdHJpbmcpOiBTYWZlSHRtbCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Nhbml0aXphdGlvblNlcnZpY2UuYnlwYXNzU2VjdXJpdHlUcnVzdEh0bWwoaHRtbCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNhbmNlbCgpIHtcclxuICAgICAgICBpZiAodGhpcy5kYXRhLmNhbmNlbENhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YS5jYW5jZWxDYWxsYmFjayhudWxsLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9tb2RhbFJlZi5oaWRlKCk7XHJcbiAgICAgICAgICAgIH0sIHRoaXMubG9hZGVyLmNvbXBvbmVudFJlZi5pbnN0YW5jZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fbW9kYWxSZWYuaGlkZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5kYXRhLmF1dG9DbG9zZSAhPSBmYWxzZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9tb2RhbFJlZi5oaWRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhY2NlcHQoY2xvc2UpIHtcclxuICAgICAgICB0aGlzLmNsb3NlID0gY2xvc2U7XHJcbiAgICAgICAgdGhpcy5zZXRLZXkoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmlzVmFsaWQoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvdygpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAodGhpcy5sb2FkZXIgJiYgdGhpcy5sb2FkZXIuY29tcG9uZW50UmVmICYmIHRoaXMubG9hZGVyLmNvbXBvbmVudFJlZi5pbnN0YW5jZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5sb2FkZXIuY29tcG9uZW50UmVmLmluc3RhbmNlLnNob3coKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpc1ZhbGlkKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmICh0aGlzLmxvYWRlciAmJiB0aGlzLmxvYWRlci5jb21wb25lbnRSZWYgJiYgdGhpcy5sb2FkZXIuY29tcG9uZW50UmVmLmluc3RhbmNlICYmIHRoaXMubG9hZGVyLmNvbXBvbmVudFJlZi5pbnN0YW5jZS5pc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxvYWRlci5jb21wb25lbnRSZWYuaW5zdGFuY2UuaXNWYWxpZCgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldEtleShjYWxsYmFjazogKCkgPT4gYW55KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMubG9hZGVyICYmIHRoaXMubG9hZGVyLmNvbXBvbmVudFJlZiAmJiB0aGlzLmxvYWRlci5jb21wb25lbnRSZWYuaW5zdGFuY2UgJiYgdGhpcy5sb2FkZXIuY29tcG9uZW50UmVmLmluc3RhbmNlLmdldFZhbGlkYXRvcikge1xyXG4gICAgICAgICAgICB2YXIgdmFsaWRhdG9yID0gPFZhbGlkYXRpb25TZXJ2aWNlPnRoaXMubG9hZGVyLmNvbXBvbmVudFJlZi5pbnN0YW5jZS5nZXRWYWxpZGF0b3IoKTtcclxuICAgICAgICAgICAgdGhpcy5rZXkgPSB0aGlzLmRhdGEudmFsaWRhdGlvbktleTtcclxuICAgICAgICAgICAgaWYgKHZhbGlkYXRvcikgdmFsaWRhdG9yLnNldEtleSh0aGlzLmtleSk7XHJcbiAgICAgICAgICAgIHRoaXMuX2FnZ3JlZ2F0b3JTZXJ2aWNlLnN1YnNjcmliZSh0aGlzLmtleSwgKGVycm9yczogU3VtbWFyeUVycm9yW10pID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcclxuICAgICAgICAgICAgICAgIGlmICghZXJyb3JzIHx8IGVycm9ycy5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmRhdGEuYWNjZXB0Q2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbW9kYWxSZWYuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRlci5jb21wb25lbnRSZWYuaW5zdGFuY2UuY2FsbGJhY2sodGhpcy5kYXRhLm1vZGUpLnN1YnNjcmliZSgocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5hY2NlcHRDYWxsYmFjayhyZXNwb25zZSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX21vZGFsUmVmLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHRoaXMubG9hZGVyLmNvbXBvbmVudFJlZi5pbnN0YW5jZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX21vZGFsUmVmLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZGF0YS5hdXRvQ2xvc2UgIT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbW9kYWxSZWYuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2soKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19