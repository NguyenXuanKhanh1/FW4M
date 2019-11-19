/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationLoginRequest, AuthenticationLoginResponse, UserViewModel } from './auth.model';
import { AuthenticationService } from './auth.service';
import { AuthConst } from './auth.const';
import { CacheService } from '../shared/services/cache.service';
import { DataService } from '../shared/services/data.service';
import { ValidationService, ValidationOption, RequiredValidationRule, ClientValidator } from '../shared/validation';
import { fadeInOut } from '../shared/triggers';
import { BaseTemplate } from '../shared/models/base.model';
import { AggregatorService } from '../shared/services/aggregator.service';
import { KeyConst } from '../shared/constants/key.const';
var AuthComponent = /** @class */ (function () {
    function AuthComponent(route, _router, _cacheService, _authenticationService, _validationService, _dataService, _aggregatorService) {
        this.route = route;
        this._router = _router;
        this._cacheService = _cacheService;
        this._authenticationService = _authenticationService;
        this._validationService = _validationService;
        this._dataService = _dataService;
        this._aggregatorService = _aggregatorService;
        this.title = 'Đăng nhập';
        this.api = 'v1/authentications/search';
        this.success = true;
        this.completed = new EventEmitter();
        this.request = new AuthenticationLoginRequest();
    }
    /**
     * @return {?}
     */
    AuthComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.route.data.subscribe((/**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            if (data) {
                if (data.succeedPath)
                    _this.succeedPath = (/** @type {?} */ (data.succeedPath));
                if (data.api)
                    _this.api = (/** @type {?} */ (data.api));
                if (data.success != undefined)
                    _this.success = (/** @type {?} */ (data.success));
                _this._authenticationService.api = _this.api;
            }
        }));
    };
    /**
     * @return {?}
     */
    AuthComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this.initValidations();
    };
    /**
     * @return {?}
     */
    AuthComponent.prototype.login = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this._validationService.isValid())
            return;
        this.request.mockData = new AuthenticationLoginResponse({
            success: this.success,
            message: "Status: " + this.success,
            token: this._dataService.newGuid(),
            code: this.success ? 200 : 500,
            user: new UserViewModel({
                id: this._dataService.newGuid(),
                fullName: this.request.payload.userName,
                email: this.request.payload.userName + '@test.com',
                dateOfBirth: new Date(),
                userName: this.request.payload.userName,
                image: {
                    src: 'https://img.icons8.com/cotton/64/000000/user-female--v3.png'
                }
            })
        });
        this._authenticationService.login(this.request).subscribe((/**
         * @param {?} response
         * @return {?}
         */
        function (response) {
            if (response.success) {
                _this._cacheService.set(AuthConst.User, response.user);
                _this.completed.emit(response);
                if (_this.succeedPath)
                    _this._router.navigate([_this.succeedPath]);
                _this._aggregatorService.publish(KeyConst.LoggedIn, response);
            }
            else {
                _this._cacheService.remove(AuthConst.User);
                _this.completed.emit(response);
                _this.errorMessage = response.message;
            }
        }));
    };
    /**
     * @private
     * @return {?}
     */
    AuthComponent.prototype.initValidations = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.formRef)
            throw new Error('formRef is null');
        /** @type {?} */
        var options = [
            new ValidationOption({
                validationName: 'UserName',
                valueResolver: (/**
                 * @return {?}
                 */
                function () { return _this.request.payload.userName; }),
                rules: [new RequiredValidationRule()]
            }),
            new ValidationOption({
                validationName: 'Password',
                valueResolver: (/**
                 * @return {?}
                 */
                function () { return _this.request.payload.password; }),
                rules: [new RequiredValidationRule()]
            })
        ];
        /** @type {?} */
        var validator = new ClientValidator({
            formRef: this.formRef,
            options: options,
            payloadRef: (/**
             * @template THIS
             * @this {THIS}
             * @return {THIS}
             */
            function () { return _this; })
        });
        this._validationService.init({
            validator: this.validator ? this.validator : validator
        });
    };
    AuthComponent.decorators = [
        { type: Component, args: [{
                    selector: 'katana-auth',
                    template: "<div #formRef>\r\n    <ng-container *ngIf=\"!template then default; else custom\">\r\n    </ng-container>\r\n</div>\r\n\r\n<ng-template #custom>\r\n    <katana-loader *ngIf=\"template\" [data]=\"template?.data\" [template]=\"template?.template\"></katana-loader>\r\n</ng-template>\r\n\r\n<ng-template #default>\r\n    <div class=\"col-xs-12 col-sm-6 col-md-3\" style=\"margin: 25px auto; min-height: 550px;\">\r\n        <h2 style=\"text-align: center;\">{{title}}</h2>\r\n        <div class=\"col-xs-12\">\r\n            <katana-textbox [placeholder]=\"'Nh\u1EADp user name...'\" [title]=\"'User Name'\"\r\n                [(model)]=\"request.payload.userName\" [validationName]=\"'UserName'\"></katana-textbox>\r\n            <katana-textbox [placeholder]=\"'Nh\u1EADp password...'\" [title]=\"'Password'\" [(model)]=\"request.payload.password\"\r\n                [validationName]=\"'Password'\"></katana-textbox>\r\n            <ul *ngIf=\"errorMessage\" class=\"col-xs-12\">\r\n                <li class=\"text-danger\">{{errorMessage}}</li>\r\n            </ul>\r\n            <katana-button style=\"width: 100%;\" [icon]=\"'fa fa-sign-in'\" [customClass]=\"'primary full'\"\r\n                (execute)=\"login()\" [title]=\"'Login'\">\r\n            </katana-button>\r\n        </div>\r\n    </div>\r\n</ng-template>",
                    animations: [fadeInOut],
                    styles: ["input[type=password],input[type=text]{width:100%;padding:12px 20px;margin:5px 0;display:inline-block;box-sizing:border-box}button{background-color:#007bff;color:#fff;padding:14px 20px;margin:8px 0;border:none;cursor:pointer;width:100%}button:hover{opacity:.8}.cancelbtn{width:auto;padding:10px 18px;background-color:#d61e00}.imgcontainer{text-align:center;margin:24px 0 12px}img.avatar{width:40%;border-radius:50%}.container{padding:16px}span.psw{float:right;padding-top:16px}@media screen and (max-width:300px){span.psw{display:block;float:none}.cancelbtn{width:100%}}katana-button .fa-check{color:#6fbb35}katana-button .fa-check:hover{color:#519121}.ng-invalid{border:1px solid #ee4930}.full{width:100%}.background{background:url(https://www.bigboss-financial.com/resources_v2/images/bbslider/bg06.png)}"]
                }] }
    ];
    /** @nocollapse */
    AuthComponent.ctorParameters = function () { return [
        { type: ActivatedRoute },
        { type: Router },
        { type: CacheService },
        { type: AuthenticationService },
        { type: ValidationService },
        { type: DataService },
        { type: AggregatorService }
    ]; };
    AuthComponent.propDecorators = {
        title: [{ type: Input }],
        validator: [{ type: Input }],
        succeedPath: [{ type: Input }],
        template: [{ type: Input }],
        api: [{ type: Input }],
        success: [{ type: Input }],
        completed: [{ type: Output }],
        formRef: [{ type: ViewChild, args: ['formRef', { static: true },] }]
    };
    return AuthComponent;
}());
export { AuthComponent };
if (false) {
    /** @type {?} */
    AuthComponent.prototype.title;
    /** @type {?} */
    AuthComponent.prototype.validator;
    /** @type {?} */
    AuthComponent.prototype.succeedPath;
    /** @type {?} */
    AuthComponent.prototype.template;
    /** @type {?} */
    AuthComponent.prototype.api;
    /** @type {?} */
    AuthComponent.prototype.success;
    /** @type {?} */
    AuthComponent.prototype.completed;
    /** @type {?} */
    AuthComponent.prototype.formRef;
    /** @type {?} */
    AuthComponent.prototype.request;
    /** @type {?} */
    AuthComponent.prototype.errorMessage;
    /** @type {?} */
    AuthComponent.prototype.route;
    /**
     * @type {?}
     * @private
     */
    AuthComponent.prototype._router;
    /**
     * @type {?}
     * @private
     */
    AuthComponent.prototype._cacheService;
    /**
     * @type {?}
     * @private
     */
    AuthComponent.prototype._authenticationService;
    /**
     * @type {?}
     * @private
     */
    AuthComponent.prototype._validationService;
    /**
     * @type {?}
     * @private
     */
    AuthComponent.prototype._dataService;
    /**
     * @type {?}
     * @private
     */
    AuthComponent.prototype._aggregatorService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZnc0Yy8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2F1dGgvYXV0aC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBaUIsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDckgsT0FBTyxFQUFFLE1BQU0sRUFBRSxjQUFjLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsMkJBQTJCLEVBQUUsYUFBYSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3RHLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUM5RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsZ0JBQWdCLEVBQUUsc0JBQXNCLEVBQUUsZUFBZSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDcEgsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUMxRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFFekQ7SUFtQkUsdUJBQ1MsS0FBcUIsRUFDcEIsT0FBZSxFQUNmLGFBQTJCLEVBQzNCLHNCQUE2QyxFQUM3QyxrQkFBcUMsRUFDckMsWUFBeUIsRUFDekIsa0JBQXFDO1FBTnRDLFVBQUssR0FBTCxLQUFL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IjpbImltcG9ydCB7IENvbXBvbmVudCwgVmlld0NoaWxkLCBFbGVtZW50UmVmLCBBZnRlclZpZXdJbml0LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSb3V0ZXIsIEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgQXV0aGVudGljYXRpb25Mb2dpblJlcXVlc3QsIEF1dGhlbnRpY2F0aW9uTG9naW5SZXNwb25zZSwgVXNlclZpZXdNb2RlbCB9IGZyb20gJy4vYXV0aC5tb2RlbCc7XHJcbmltcG9ydCB7IEF1dGhlbnRpY2F0aW9uU2VydmljZSB9IGZyb20gJy4vYXV0aC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQXV0aENvbnN0IH0gZnJvbSAnLi9hdXRoLmNvbnN0JztcclxuaW1wb3J0IHsgQ2FjaGVTZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL3NlcnZpY2VzL2NhY2hlLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBEYXRhU2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9zZXJ2aWNlcy9kYXRhLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBWYWxpZGF0aW9uU2VydmljZSwgVmFsaWRhdGlvbk9wdGlvbiwgUmVxdWlyZWRWYWxpZGF0aW9uUnVsZSwgQ2xpZW50VmFsaWRhdG9yIH0gZnJvbSAnLi4vc2hhcmVkL3ZhbGlkYXRpb24nO1xyXG5pbXBvcnQgeyBmYWRlSW5PdXQgfSBmcm9tICcuLi9zaGFyZWQvdHJpZ2dlcnMnO1xyXG5pbXBvcnQgeyBCYXNlVGVtcGxhdGUgfSBmcm9tICcuLi9zaGFyZWQvbW9kZWxzL2Jhc2UubW9kZWwnO1xyXG5pbXBvcnQgeyBBZ2dyZWdhdG9yU2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9zZXJ2aWNlcy9hZ2dyZWdhdG9yLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBLZXlDb25zdCB9IGZyb20gJy4uL3NoYXJlZC9jb25zdGFudHMva2V5LmNvbnN0JztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAna2F0YW5hLWF1dGgnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9hdXRoLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9hdXRoLmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgYW5pbWF0aW9uczogW2ZhZGVJbk91dF1cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBBdXRoQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0IHtcclxuICBASW5wdXQoKSBwdWJsaWMgdGl0bGU6IHN0cmluZyA9ICfEkMSDbmcgbmjhuq1wJztcclxuICBASW5wdXQoKSBwdWJsaWMgdmFsaWRhdG9yOiBDbGllbnRWYWxpZGF0b3I7XHJcbiAgQElucHV0KCkgcHVibGljIHN1Y2NlZWRQYXRoOiBzdHJpbmc7XHJcbiAgQElucHV0KCkgcHVibGljIHRlbXBsYXRlOiBCYXNlVGVtcGxhdGU7XHJcbiAgQElucHV0KCkgcHVibGljIGFwaTogc3RyaW5nID0gJ3YxL2F1dGhlbnRpY2F0aW9ucy9zZWFyY2gnO1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBzdWNjZXNzOiBib29sZWFuID0gdHJ1ZTtcclxuICBAT3V0cHV0KCkgcHVibGljIGNvbXBsZXRlZCA9IG5ldyBFdmVudEVtaXR0ZXI8QXV0aGVudGljYXRpb25Mb2dpblJlc3BvbnNlPigpO1xyXG4gIEBWaWV3Q2hpbGQoJ2Zvcm1SZWYnLCB7IHN0YXRpYzogdHJ1ZSB9KSBwdWJsaWMgZm9ybVJlZjogRWxlbWVudFJlZjtcclxuICBwdWJsaWMgcmVxdWVzdDogQXV0aGVudGljYXRpb25Mb2dpblJlcXVlc3QgPSBuZXcgQXV0aGVudGljYXRpb25Mb2dpblJlcXVlc3QoKTtcclxuICBwdWJsaWMgZXJyb3JNZXNzYWdlOiBzdHJpbmc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHVibGljIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcclxuICAgIHByaXZhdGUgX3JvdXRlcjogUm91dGVyLFxyXG4gICAgcHJpdmF0ZSBfY2FjaGVTZXJ2aWNlOiBDYWNoZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIF9hdXRoZW50aWNhdGlvblNlcnZpY2U6IEF1dGhlbnRpY2F0aW9uU2VydmljZSxcclxuICAgIHByaXZhdGUgX3ZhbGlkYXRpb25TZXJ2aWNlOiBWYWxpZGF0aW9uU2VydmljZSxcclxuICAgIHByaXZhdGUgX2RhdGFTZXJ2aWNlOiBEYXRhU2VydmljZSxcclxuICAgIHByaXZhdGUgX2FnZ3JlZ2F0b3JTZXJ2aWNlOiBBZ2dyZWdhdG9yU2VydmljZVxyXG4gICkgeyB9XHJcblxyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5yb3V0ZS5kYXRhLnN1YnNjcmliZShkYXRhID0+IHtcclxuICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICBpZiAoZGF0YS5zdWNjZWVkUGF0aCkgdGhpcy5zdWNjZWVkUGF0aCA9IDxzdHJpbmc+ZGF0YS5zdWNjZWVkUGF0aDtcclxuICAgICAgICBpZiAoZGF0YS5hcGkpIHRoaXMuYXBpID0gPHN0cmluZz5kYXRhLmFwaTtcclxuICAgICAgICBpZiAoZGF0YS5zdWNjZXNzICE9IHVuZGVmaW5lZCkgdGhpcy5zdWNjZXNzID0gPGJvb2xlYW4+ZGF0YS5zdWNjZXNzO1xyXG4gICAgICAgIHRoaXMuX2F1dGhlbnRpY2F0aW9uU2VydmljZS5hcGkgPSB0aGlzLmFwaTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLmluaXRWYWxpZGF0aW9ucygpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGxvZ2luKCk6IHZvaWQge1xyXG4gICAgaWYgKCF0aGlzLl92YWxpZGF0aW9uU2VydmljZS5pc1ZhbGlkKCkpIHJldHVybjtcclxuICAgIHRoaXMucmVxdWVzdC5tb2NrRGF0YSA9IG5ldyBBdXRoZW50aWNhdGlvbkxvZ2luUmVzcG9uc2Uoe1xyXG4gICAgICBzdWNjZXNzOiB0aGlzLnN1Y2Nlc3MsXHJcbiAgICAgIG1lc3NhZ2U6IGBTdGF0dXM6ICR7dGhpcy5zdWNjZXNzfWAsXHJcbiAgICAgIHRva2VuOiB0aGlzLl9kYXRhU2VydmljZS5uZXdHdWlkKCksXHJcbiAgICAgIGNvZGU6IHRoaXMuc3VjY2VzcyA/IDIwMCA6IDUwMCxcclxuICAgICAgdXNlcjogbmV3IFVzZXJWaWV3TW9kZWwoe1xyXG4gICAgICAgIGlkOiB0aGlzLl9kYXRhU2VydmljZS5uZXdHdWlkKCksXHJcbiAgICAgICAgZnVsbE5hbWU6IHRoaXMucmVxdWVzdC5wYXlsb2FkLnVzZXJOYW1lLFxyXG4gICAgICAgIGVtYWlsOiB0aGlzLnJlcXVlc3QucGF5bG9hZC51c2VyTmFtZSArICdAdGVzdC5jb20nLFxyXG4gICAgICAgIGRhdGVPZkJpcnRoOiBuZXcgRGF0ZSgpLFxyXG4gICAgICAgIHVzZXJOYW1lOiB0aGlzLnJlcXVlc3QucGF5bG9hZC51c2VyTmFtZSxcclxuICAgICAgICBpbWFnZToge1xyXG4gICAgICAgICAgc3JjOiAnaHR0cHM6Ly9pbWcuaWNvbnM4LmNvbS9jb3R0b24vNjQvMDAwMDAwL3VzZXItZmVtYWxlLS12My5wbmcnXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfSk7XHJcbiAgICB0aGlzLl9hdXRoZW50aWNhdGlvblNlcnZpY2UubG9naW4odGhpcy5yZXF1ZXN0KS5zdWJzY3JpYmUoKHJlc3BvbnNlOiBBdXRoZW50aWNhdGlvbkxvZ2luUmVzcG9uc2UpID0+IHtcclxuICAgICAgaWYgKHJlc3BvbnNlLnN1Y2Nlc3MpIHtcclxuICAgICAgICB0aGlzLl9jYWNoZVNlcnZpY2Uuc2V0KEF1dGhDb25zdC5Vc2VyLCByZXNwb25zZS51c2VyKTtcclxuICAgICAgICB0aGlzLmNvbXBsZXRlZC5lbWl0KHJlc3BvbnNlKTtcclxuICAgICAgICBpZiAodGhpcy5zdWNjZWVkUGF0aCkgdGhpcy5fcm91dGVyLm5hdmlnYXRlKFt0aGlzLnN1Y2NlZWRQYXRoXSk7XHJcbiAgICAgICAgdGhpcy5fYWdncmVnYXRvclNlcnZpY2UucHVibGlzaChLZXlDb25zdC5Mb2dnZWRJbiwgcmVzcG9uc2UpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuX2NhY2hlU2VydmljZS5yZW1vdmUoQXV0aENvbnN0LlVzZXIpO1xyXG4gICAgICAgIHRoaXMuY29tcGxldGVkLmVtaXQocmVzcG9uc2UpO1xyXG4gICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlID0gcmVzcG9uc2UubWVzc2FnZTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGluaXRWYWxpZGF0aW9ucygpOiB2b2lkIHtcclxuICAgIGlmICghdGhpcy5mb3JtUmVmKSB0aHJvdyBuZXcgRXJyb3IoJ2Zvcm1SZWYgaXMgbnVsbCcpO1xyXG4gICAgdmFyIG9wdGlvbnM6IFZhbGlkYXRpb25PcHRpb25bXSA9IFtcclxuICAgICAgbmV3IFZhbGlkYXRpb25PcHRpb24oe1xyXG4gICAgICAgIHZhbGlkYXRpb25OYW1lOiAnVXNlck5hbWUnLFxyXG4gICAgICAgIHZhbHVlUmVzb2x2ZXI6ICgpID0+IHRoaXMucmVxdWVzdC5wYXlsb2FkLnVzZXJOYW1lLFxyXG4gICAgICAgIHJ1bGVzOiBbbmV3IFJlcXVpcmVkVmFsaWRhdGlvblJ1bGUoKV1cclxuICAgICAgfSksXHJcbiAgICAgIG5ldyBWYWxpZGF0aW9uT3B0aW9uKHtcclxuICAgICAgICB2YWxpZGF0aW9uTmFtZTogJ1Bhc3N3b3JkJyxcclxuICAgICAgICB2YWx1ZVJlc29sdmVyOiAoKSA9PiB0aGlzLnJlcXVlc3QucGF5bG9hZC5wYXNzd29yZCxcclxuICAgICAgICBydWxlczogW25ldyBSZXF1aXJlZFZhbGlkYXRpb25SdWxlKCldXHJcbiAgICAgIH0pXHJcbiAgICBdO1xyXG5cclxuICAgIHZhciB2YWxpZGF0b3IgPSBuZXcgQ2xpZW50VmFsaWRhdG9yKHtcclxuICAgICAgZm9ybVJlZjogdGhpcy5mb3JtUmVmLFxyXG4gICAgICBvcHRpb25zOiBvcHRpb25zLFxyXG4gICAgICBwYXlsb2FkUmVmOiAoKSA9PiB0aGlzXHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLl92YWxpZGF0aW9uU2VydmljZS5pbml0KHtcclxuICAgICAgdmFsaWRhdG9yOiB0aGlzLnZhbGlkYXRvciA/IHRoaXMudmFsaWRhdG9yIDogdmFsaWRhdG9yXHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIl19