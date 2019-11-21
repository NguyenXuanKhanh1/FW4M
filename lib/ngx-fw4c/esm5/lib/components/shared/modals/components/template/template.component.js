/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BsModalRef } from 'ngx-bootstrap';
import { LoaderComponent } from '../../../loader/loader.component';
import { AggregatorService } from '../../../services/aggregator.service';
var TemplateComponent = /** @class */ (function () {
    function TemplateComponent(_sanitizationService, _aggregatorService, _modalRef) {
        this._sanitizationService = _sanitizationService;
        this._aggregatorService = _aggregatorService;
        this._modalRef = _modalRef;
    }
    /**
     * @param {?} html
     * @return {?}
     */
    TemplateComponent.prototype.bypassSecurityTrustHtml = /**
     * @param {?} html
     * @return {?}
     */
    function (html) {
        return this._sanitizationService.bypassSecurityTrustHtml(html);
    };
    /**
     * @return {?}
     */
    TemplateComponent.prototype.cancel = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.data.cancelCallback) {
            this.data.cancelCallback(null, (/**
             * @return {?}
             */
            function () {
                _this._modalRef.hide();
            }), this.loader.componentRef.instance);
        }
        else {
            this._modalRef.hide();
        }
        if (this.data.autoClose != false) {
            this._modalRef.hide();
        }
    };
    /**
     * @param {?} close
     * @return {?}
     */
    TemplateComponent.prototype.accept = /**
     * @param {?} close
     * @return {?}
     */
    function (close) {
        var _this = this;
        this.close = close;
        this.setKey((/**
         * @return {?}
         */
        function () {
            _this.isValid();
        }));
    };
    /**
     * @return {?}
     */
    TemplateComponent.prototype.show = /**
     * @return {?}
     */
    function () {
        if (this.loader && this.loader.componentRef && this.loader.componentRef.instance) {
            return this.loader.componentRef.instance.show();
        }
        else {
            return false;
        }
    };
    /**
     * @return {?}
     */
    TemplateComponent.prototype.isValid = /**
     * @return {?}
     */
    function () {
        if (this.loader && this.loader.componentRef && this.loader.componentRef.instance && this.loader.componentRef.instance.isValid) {
            return this.loader.componentRef.instance.isValid();
        }
        else {
            return false;
        }
    };
    /**
     * @param {?} callback
     * @return {?}
     */
    TemplateComponent.prototype.setKey = /**
     * @param {?} callback
     * @return {?}
     */
    function (callback) {
        var _this = this;
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
            function (errors) {
                _this.close();
                if (!errors || errors.length == 0) {
                    if (_this.data.acceptCallback) {
                        _this._modalRef.hide();
                        _this.loader.componentRef.instance.callback(_this.data.mode).subscribe((/**
                         * @param {?} response
                         * @return {?}
                         */
                        function (response) {
                            _this.data.acceptCallback(response, (/**
                             * @return {?}
                             */
                            function () {
                                _this._modalRef.hide();
                            }), _this.loader.componentRef.instance);
                        }));
                    }
                    else {
                        _this._modalRef.hide();
                    }
                    if (_this.data.autoClose != false) {
                        _this._modalRef.hide();
                    }
                }
            }));
            if (callback)
                callback();
        }
    };
    TemplateComponent.decorators = [
        { type: Component, args: [{
                    selector: 'katana-template',
                    template: "<div class=\"modal-header\">\r\n  <h4 class=\"modal-title\"><span class=\"{{data?.icon ? data?.icon : 'fa fa-twitter'}}\" style=\"font-size: 30px;\"></span>\r\n    <span style=\"position: absolute;margin: 4px 0px 0px 10px;\">{{data?.title ? data?.title : 'Template'}}</span></h4>\r\n</div>\r\n<div class=\"modal-body test\">\r\n  <katana-loader #loader [data]=\"data?.data\" [template]=\"data?.template\"></katana-loader>\r\n</div>\r\n<div class=\"modal-footer\">\r\n  <katana-button (execute)=\"cancel()\" [customClass]=\"'default'\"\r\n    title=\"{{data?.btnCancelTitle ? data?.btnCancelTitle : 'Cancel'}}\"></katana-button>\r\n  <katana-button [lazyload]=\"true\" (execute)=\"accept($event)\" [customClass]=\"'primary'\"\r\n    title=\"{{data?.btnAcceptTitle ? data?.btnAcceptTitle : 'Accept'}}\"></katana-button>\r\n</div>",
                    encapsulation: ViewEncapsulation.None,
                    styles: [".modal-title{font-size:16px;text-transform:uppercase}.modal-content{border:none!important}"]
                }] }
    ];
    /** @nocollapse */
    TemplateComponent.ctorParameters = function () { return [
        { type: DomSanitizer },
        { type: AggregatorService },
        { type: BsModalRef }
    ]; };
    TemplateComponent.propDecorators = {
        loader: [{ type: ViewChild, args: ['loader', { static: false },] }]
    };
    return TemplateComponent;
}());
export { TemplateComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWZ3NGMvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9zaGFyZWQvbW9kYWxzL2NvbXBvbmVudHMvdGVtcGxhdGUvdGVtcGxhdGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN4RSxPQUFPLEVBQUUsWUFBWSxFQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDbkUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDbkUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFJekU7SUFhSSwyQkFDWSxvQkFBa0MsRUFDbEMsa0JBQXFDLEVBQ3RDLFNBQXFCO1FBRnBCLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBYztRQUNsQyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW1CO1FBQ3RDLGNBQVMsR0FBVCxTQUFTLENBQVk7SUFDaEMsQ0FBQzs7Ozs7SUFFTSxtREFBdUI7Ozs7SUFBOUIsVUFBK0IsSUFBWTtRQUN2QyxPQUFPLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNuRSxDQUFDOzs7O0lBRU0sa0NBQU07OztJQUFiO1FBQUEsaUJBV0M7UUFWRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQzFCLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUk7OztZQUFFO2dCQUMzQixLQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQzFCLENBQUMsR0FBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztT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QkFDSCxLQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO3FCQUN6QjtvQkFDRCxJQUFJLEtBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUFJLEtBQUssRUFBRTt3QkFDOUIsS0FBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztxQkFDekI7aUJBQ0o7WUFDTCxDQUFDLEVBQUMsQ0FBQztZQUNILElBQUksUUFBUTtnQkFBRSxRQUFRLEVBQUUsQ0FBQztTQUM1QjtJQUNMLENBQUM7O2dCQXBGSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLGlCQUFpQjtvQkFDM0IsdTBCQUF3QztvQkFFeEMsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7O2lCQUN4Qzs7OztnQkFiUSxZQUFZO2dCQUlaLGlCQUFpQjtnQkFIakIsVUFBVTs7O3lCQWVkLFNBQVMsU0FBQyxRQUFRLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFOztJQTZFMUMsd0JBQUM7Q0FBQSxBQXJGRCxJQXFGQztTQTlFWSxpQkFBaUI7OztJQUMxQixtQ0FBdUU7O0lBQ3ZFLGlDQUErQjs7Ozs7SUFDL0Isa0NBQTBCOzs7OztJQUMxQixnQ0FBc0I7Ozs7O0lBR2xCLGlEQUEwQzs7Ozs7SUFDMUMsK0NBQTZDOztJQUM3QyxzQ0FBNEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIFZpZXdFbmNhcHN1bGF0aW9uLCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRG9tU2FuaXRpemVyLCBTYWZlSHRtbCB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xyXG5pbXBvcnQgeyBCc01vZGFsUmVmIH0gZnJvbSAnbmd4LWJvb3RzdHJhcCc7XHJcbmltcG9ydCB7IFRlbXBsYXRlVmlld01vZGVsIH0gZnJvbSAnLi4vLi4vbW9kYWwubW9kZWwnO1xyXG5pbXBvcnQgeyBMb2FkZXJDb21wb25lbnQgfSBmcm9tICcuLi8uLi8uLi9sb2FkZXIvbG9hZGVyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEFnZ3JlZ2F0b3JTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2VydmljZXMvYWdncmVnYXRvci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgVmFsaWRhdGlvblNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi92YWxpZGF0aW9uL3ZhbGlkYXRpb24uc2VydmljZSc7XHJcbmltcG9ydCB7IFN1bW1hcnlFcnJvciB9IGZyb20gJy4uLy4uLy4uL3ZhbGlkYXRpb24vdmFsaWRhdGlvbi5tb2RlbCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAna2F0YW5hLXRlbXBsYXRlJyxcclxuICAgIHRlbXBsYXRlVXJsOiAnLi90ZW1wbGF0ZS5jb21wb25lbnQuaHRtbCcsXHJcbiAgICBzdHlsZVVybHM6IFsnLi90ZW1wbGF0ZS5jb21wb25lbnQuc2NzcyddLFxyXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIFRlbXBsYXRlQ29tcG9uZW50IHtcclxuICAgIEBWaWV3Q2hpbGQoJ2xvYWRlcicsIHsgc3RhdGljOiBmYWxzZSB9KSBwdWJsaWMgbG9hZGVyOiBMb2FkZXJDb21wb25lbnQ7XHJcbiAgICBwdWJsaWMgZGF0YTogVGVtcGxhdGVWaWV3TW9kZWw7XHJcbiAgICBwcm90ZWN0ZWQgY2xvc2U6IEZ1bmN0aW9uO1xyXG4gICAgcHJvdGVjdGVkIGtleTogc3RyaW5nO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgX3Nhbml0aXphdGlvblNlcnZpY2U6IERvbVNhbml0aXplcixcclxuICAgICAgICBwcml2YXRlIF9hZ2dyZWdhdG9yU2VydmljZTogQWdncmVnYXRvclNlcnZpY2UsXHJcbiAgICAgICAgcHVibGljIF9tb2RhbFJlZjogQnNNb2RhbFJlZikge1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBieXBhc3NTZWN1cml0eVRydXN0SHRtbChodG1sOiBzdHJpbmcpOiBTYWZlSHRtbCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Nhbml0aXphdGlvblNlcnZpY2UuYnlwYXNzU2VjdXJpdHlUcnVzdEh0bWwoaHRtbCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNhbmNlbCgpIHtcclxuICAgICAgICBpZiAodGhpcy5kYXRhLmNhbmNlbENhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YS5jYW5jZWxDYWxsYmFjayhudWxsLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9tb2RhbFJlZi5oaWRlKCk7XHJcbiAgICAgICAgICAgIH0sIHRoaXMubG9hZGVyLmNvbXBvbmVudFJlZi5pbnN0YW5jZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fbW9kYWxSZWYuaGlkZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5kYXRhLmF1dG9DbG9zZSAhPSBmYWxzZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9tb2RhbFJlZi5oaWRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhY2NlcHQoY2xvc2UpIHtcclxuICAgICAgICB0aGlzLmNsb3NlID0gY2xvc2U7XHJcbiAgICAgICAgdGhpcy5zZXRLZXkoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmlzVmFsaWQoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvdygpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAodGhpcy5sb2FkZXIgJiYgdGhpcy5sb2FkZXIuY29tcG9uZW50UmVmICYmIHRoaXMubG9hZGVyLmNvbXBvbmVudFJlZi5pbnN0YW5jZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5sb2FkZXIuY29tcG9uZW50UmVmLmluc3RhbmNlLnNob3coKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpc1ZhbGlkKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmICh0aGlzLmxvYWRlciAmJiB0aGlzLmxvYWRlci5jb21wb25lbnRSZWYgJiYgdGhpcy5sb2FkZXIuY29tcG9uZW50UmVmLmluc3RhbmNlICYmIHRoaXMubG9hZGVyLmNvbXBvbmVudFJlZi5pbnN0YW5jZS5pc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxvYWRlci5jb21wb25lbnRSZWYuaW5zdGFuY2UuaXNWYWxpZCgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldEtleShjYWxsYmFjazogKCkgPT4gYW55KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMubG9hZGVyICYmIHRoaXMubG9hZGVyLmNvbXBvbmVudFJlZiAmJiB0aGlzLmxvYWRlci5jb21wb25lbnRSZWYuaW5zdGFuY2UgJiYgdGhpcy5sb2FkZXIuY29tcG9uZW50UmVmLmluc3RhbmNlLmdldFZhbGlkYXRvcikge1xyXG4gICAgICAgICAgICB2YXIgdmFsaWRhdG9yID0gPFZhbGlkYXRpb25TZXJ2aWNlPnRoaXMubG9hZGVyLmNvbXBvbmVudFJlZi5pbnN0YW5jZS5nZXRWYWxpZGF0b3IoKTtcclxuICAgICAgICAgICAgdGhpcy5rZXkgPSB0aGlzLmRhdGEudmFsaWRhdGlvbktleTtcclxuICAgICAgICAgICAgaWYgKHZhbGlkYXRvcikgdmFsaWRhdG9yLnNldEtleSh0aGlzLmtleSk7XHJcbiAgICAgICAgICAgIHRoaXMuX2FnZ3JlZ2F0b3JTZXJ2aWNlLnN1YnNjcmliZSh0aGlzLmtleSwgKGVycm9yczogU3VtbWFyeUVycm9yW10pID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcclxuICAgICAgICAgICAgICAgIGlmICghZXJyb3JzIHx8IGVycm9ycy5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmRhdGEuYWNjZXB0Q2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbW9kYWxSZWYuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRlci5jb21wb25lbnRSZWYuaW5zdGFuY2UuY2FsbGJhY2sodGhpcy5kYXRhLm1vZGUpLnN1YnNjcmliZSgocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5hY2NlcHRDYWxsYmFjayhyZXNwb25zZSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX21vZGFsUmVmLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHRoaXMubG9hZGVyLmNvbXBvbmVudFJlZi5pbnN0YW5jZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX21vZGFsUmVmLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZGF0YS5hdXRvQ2xvc2UgIT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbW9kYWxSZWYuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2soKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19