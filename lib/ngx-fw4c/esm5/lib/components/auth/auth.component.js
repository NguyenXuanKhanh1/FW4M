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
                _this._authenticationService.setApi(_this.api);
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
                    template: "<div #formRef>\r\n    <ng-container *ngIf=\"!template then default; else custom\">\r\n    </ng-container>\r\n</div>\r\n\r\n<ng-template #custom>\r\n    <katana-loader *ngIf=\"template\" [data]=\"template?.data\" [template]=\"template?.template\"></katana-loader>\r\n</ng-template>\r\n\r\n<ng-template #default>\r\n    <div class=\"col-xs-12 col-sm-6 col-md-3\" style=\"margin: 25px auto; min-height: 550px;\">\r\n        <h2 style=\"text-align: center;\">{{title}}</h2>\r\n        <div class=\"col-xs-12\">\r\n            <katana-textbox [placeholder]=\"'Nh\u1EADp user name...'\" [title]=\"'User Name'\"\r\n                [(model)]=\"request.payload.userName\" [validationName]=\"'UserName'\"></katana-textbox>\r\n            <katana-textbox [type]=\"'password'\" [placeholder]=\"'Nh\u1EADp password...'\" [title]=\"'Password'\" [(model)]=\"request.payload.password\"\r\n                [validationName]=\"'Password'\"></katana-textbox>\r\n            <ul *ngIf=\"errorMessage\" class=\"col-xs-12\">\r\n                <li class=\"text-danger\">{{errorMessage}}</li>\r\n            </ul>\r\n            <katana-button style=\"width: 100%;\" [icon]=\"'fa fa-sign-in'\" [customClass]=\"'primary full'\"\r\n                (execute)=\"login()\" [title]=\"'Login'\">\r\n            </katana-button>\r\n        </div>\r\n    </div>\r\n</ng-template>",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZnc0Yy8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2F1dGgvYXV0aC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBaUIsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDckgsT0FBTyxFQUFFLE1BQU0sRUFBRSxjQUFjLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsMkJBQTJCLEVBQUUsYUFBYSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3RHLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUM5RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsZ0JBQWdCLEVBQUUsc0JBQXNCLEVBQUUsZUFBZSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDcEgsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUMxRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFFekQ7SUFtQkUsdUJBQ1MsS0FBcUIsRUFDcEIsT0FBZSxFQUNmLGFBQTJCLEVBQzNCLHNCQUE2QyxFQUM3QyxrQkFBcUMsRUFDckMsWUFBeUIsRUFDekIsa0JBQXFDO1FBTnRDLFVBQUssR0FBTCxLQUFL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bnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYsIEFmdGVyVmlld0luaXQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlciwgQWN0aXZhdGVkUm91dGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBBdXRoZW50aWNhdGlvbkxvZ2luUmVxdWVzdCwgQXV0aGVudGljYXRpb25Mb2dpblJlc3BvbnNlLCBVc2VyVmlld01vZGVsIH0gZnJvbSAnLi9hdXRoLm1vZGVsJztcclxuaW1wb3J0IHsgQXV0aGVudGljYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi9hdXRoLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBBdXRoQ29uc3QgfSBmcm9tICcuL2F1dGguY29uc3QnO1xyXG5pbXBvcnQgeyBDYWNoZVNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQvc2VydmljZXMvY2FjaGUuc2VydmljZSc7XHJcbmltcG9ydCB7IERhdGFTZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL3NlcnZpY2VzL2RhdGEuc2VydmljZSc7XHJcbmltcG9ydCB7IFZhbGlkYXRpb25TZXJ2aWNlLCBWYWxpZGF0aW9uT3B0aW9uLCBSZXF1aXJlZFZhbGlkYXRpb25SdWxlLCBDbGllbnRWYWxpZGF0b3IgfSBmcm9tICcuLi9zaGFyZWQvdmFsaWRhdGlvbic7XHJcbmltcG9ydCB7IGZhZGVJbk91dCB9IGZyb20gJy4uL3NoYXJlZC90cmlnZ2Vycyc7XHJcbmltcG9ydCB7IEJhc2VUZW1wbGF0ZSB9IGZyb20gJy4uL3NoYXJlZC9tb2RlbHMvYmFzZS5tb2RlbCc7XHJcbmltcG9ydCB7IEFnZ3JlZ2F0b3JTZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL3NlcnZpY2VzL2FnZ3JlZ2F0b3Iuc2VydmljZSc7XHJcbmltcG9ydCB7IEtleUNvbnN0IH0gZnJvbSAnLi4vc2hhcmVkL2NvbnN0YW50cy9rZXkuY29uc3QnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdrYXRhbmEtYXV0aCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2F1dGguY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2F1dGguY29tcG9uZW50LnNjc3MnXSxcclxuICBhbmltYXRpb25zOiBbZmFkZUluT3V0XVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIEF1dGhDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQge1xyXG4gIEBJbnB1dCgpIHB1YmxpYyB0aXRsZTogc3RyaW5nID0gJ8SQxINuZyBuaOG6rXAnO1xyXG4gIEBJbnB1dCgpIHB1YmxpYyB2YWxpZGF0b3I6IENsaWVudFZhbGlkYXRvcjtcclxuICBASW5wdXQoKSBwdWJsaWMgc3VjY2VlZFBhdGg6IHN0cmluZztcclxuICBASW5wdXQoKSBwdWJsaWMgdGVtcGxhdGU6IEJhc2VUZW1wbGF0ZTtcclxuICBASW5wdXQoKSBwdWJsaWMgYXBpOiBzdHJpbmcgPSAndjEvYXV0aGVudGljYXRpb25zL3NlYXJjaCc7XHJcbiAgQElucHV0KCkgcHVibGljIHN1Y2Nlc3M6IGJvb2xlYW4gPSB0cnVlO1xyXG4gIEBPdXRwdXQoKSBwdWJsaWMgY29tcGxldGVkID0gbmV3IEV2ZW50RW1pdHRlcjxBdXRoZW50aWNhdGlvbkxvZ2luUmVzcG9uc2U+KCk7XHJcbiAgQFZpZXdDaGlsZCgnZm9ybVJlZicsIHsgc3RhdGljOiB0cnVlIH0pIHB1YmxpYyBmb3JtUmVmOiBFbGVtZW50UmVmO1xyXG4gIHB1YmxpYyByZXF1ZXN0OiBBdXRoZW50aWNhdGlvbkxvZ2luUmVxdWVzdCA9IG5ldyBBdXRoZW50aWNhdGlvbkxvZ2luUmVxdWVzdCgpO1xyXG4gIHB1YmxpYyBlcnJvck1lc3NhZ2U6IHN0cmluZztcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwdWJsaWMgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxyXG4gICAgcHJpdmF0ZSBfcm91dGVyOiBSb3V0ZXIsXHJcbiAgICBwcml2YXRlIF9jYWNoZVNlcnZpY2U6IENhY2hlU2VydmljZSxcclxuICAgIHByaXZhdGUgX2F1dGhlbnRpY2F0aW9uU2VydmljZTogQXV0aGVudGljYXRpb25TZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBfdmFsaWRhdGlvblNlcnZpY2U6IFZhbGlkYXRpb25TZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBfZGF0YVNlcnZpY2U6IERhdGFTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBfYWdncmVnYXRvclNlcnZpY2U6IEFnZ3JlZ2F0b3JTZXJ2aWNlXHJcbiAgKSB7IH1cclxuXHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLnJvdXRlLmRhdGEuc3Vic2NyaWJlKGRhdGEgPT4ge1xyXG4gICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgIGlmIChkYXRhLnN1Y2NlZWRQYXRoKSB0aGlzLnN1Y2NlZWRQYXRoID0gPHN0cmluZz5kYXRhLnN1Y2NlZWRQYXRoO1xyXG4gICAgICAgIGlmIChkYXRhLmFwaSkgdGhpcy5hcGkgPSA8c3RyaW5nPmRhdGEuYXBpO1xyXG4gICAgICAgIGlmIChkYXRhLnN1Y2Nlc3MgIT0gdW5kZWZpbmVkKSB0aGlzLnN1Y2Nlc3MgPSA8Ym9vbGVhbj5kYXRhLnN1Y2Nlc3M7XHJcbiAgICAgICAgdGhpcy5fYXV0aGVudGljYXRpb25TZXJ2aWNlLnNldEFwaSh0aGlzLmFwaSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5pbml0VmFsaWRhdGlvbnMoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBsb2dpbigpOiB2b2lkIHtcclxuICAgIGlmICghdGhpcy5fdmFsaWRhdGlvblNlcnZpY2UuaXNWYWxpZCgpKSByZXR1cm47XHJcbiAgICB0aGlzLnJlcXVlc3QubW9ja0RhdGEgPSBuZXcgQXV0aGVudGljYXRpb25Mb2dpblJlc3BvbnNlKHtcclxuICAgICAgc3VjY2VzczogdGhpcy5zdWNjZXNzLFxyXG4gICAgICBtZXNzYWdlOiBgU3RhdHVzOiAke3RoaXMuc3VjY2Vzc31gLFxyXG4gICAgICB0b2tlbjogdGhpcy5fZGF0YVNlcnZpY2UubmV3R3VpZCgpLFxyXG4gICAgICBjb2RlOiB0aGlzLnN1Y2Nlc3MgPyAyMDAgOiA1MDAsXHJcbiAgICAgIHVzZXI6IG5ldyBVc2VyVmlld01vZGVsKHtcclxuICAgICAgICBpZDogdGhpcy5fZGF0YVNlcnZpY2UubmV3R3VpZCgpLFxyXG4gICAgICAgIGZ1bGxOYW1lOiB0aGlzLnJlcXVlc3QucGF5bG9hZC51c2VyTmFtZSxcclxuICAgICAgICBlbWFpbDogdGhpcy5yZXF1ZXN0LnBheWxvYWQudXNlck5hbWUgKyAnQHRlc3QuY29tJyxcclxuICAgICAgICBkYXRlT2ZCaXJ0aDogbmV3IERhdGUoKSxcclxuICAgICAgICB1c2VyTmFtZTogdGhpcy5yZXF1ZXN0LnBheWxvYWQudXNlck5hbWUsXHJcbiAgICAgICAgaW1hZ2U6IHtcclxuICAgICAgICAgIHNyYzogJ2h0dHBzOi8vaW1nLmljb25zOC5jb20vY290dG9uLzY0LzAwMDAwMC91c2VyLWZlbWFsZS0tdjMucG5nJ1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH0pO1xyXG4gICAgdGhpcy5fYXV0aGVudGljYXRpb25TZXJ2aWNlLmxvZ2luKHRoaXMucmVxdWVzdCkuc3Vic2NyaWJlKChyZXNwb25zZTogQXV0aGVudGljYXRpb25Mb2dpblJlc3BvbnNlKSA9PiB7XHJcbiAgICAgIGlmIChyZXNwb25zZS5zdWNjZXNzKSB7XHJcbiAgICAgICAgdGhpcy5fY2FjaGVTZXJ2aWNlLnNldChBdXRoQ29uc3QuVXNlciwgcmVzcG9uc2UudXNlcik7XHJcbiAgICAgICAgdGhpcy5jb21wbGV0ZWQuZW1pdChyZXNwb25zZSk7XHJcbiAgICAgICAgaWYgKHRoaXMuc3VjY2VlZFBhdGgpIHRoaXMuX3JvdXRlci5uYXZpZ2F0ZShbdGhpcy5zdWNjZWVkUGF0aF0pO1xyXG4gICAgICAgIHRoaXMuX2FnZ3JlZ2F0b3JTZXJ2aWNlLnB1Ymxpc2goS2V5Q29uc3QuTG9nZ2VkSW4sIHJlc3BvbnNlKTsgICAgICBcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLl9jYWNoZVNlcnZpY2UucmVtb3ZlKEF1dGhDb25zdC5Vc2VyKTtcclxuICAgICAgICB0aGlzLmNvbXBsZXRlZC5lbWl0KHJlc3BvbnNlKTtcclxuICAgICAgICB0aGlzLmVycm9yTWVzc2FnZSA9IHJlc3BvbnNlLm1lc3NhZ2U7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpbml0VmFsaWRhdGlvbnMoKTogdm9pZCB7XHJcbiAgICBpZiAoIXRoaXMuZm9ybVJlZikgdGhyb3cgbmV3IEVycm9yKCdmb3JtUmVmIGlzIG51bGwnKTtcclxuICAgIHZhciBvcHRpb25zOiBWYWxpZGF0aW9uT3B0aW9uW10gPSBbXHJcbiAgICAgIG5ldyBWYWxpZGF0aW9uT3B0aW9uKHtcclxuICAgICAgICB2YWxpZGF0aW9uTmFtZTogJ1VzZXJOYW1lJyxcclxuICAgICAgICB2YWx1ZVJlc29sdmVyOiAoKSA9PiB0aGlzLnJlcXVlc3QucGF5bG9hZC51c2VyTmFtZSxcclxuICAgICAgICBydWxlczogW25ldyBSZXF1aXJlZFZhbGlkYXRpb25SdWxlKCldXHJcbiAgICAgIH0pLFxyXG4gICAgICBuZXcgVmFsaWRhdGlvbk9wdGlvbih7XHJcbiAgICAgICAgdmFsaWRhdGlvbk5hbWU6ICdQYXNzd29yZCcsXHJcbiAgICAgICAgdmFsdWVSZXNvbHZlcjogKCkgPT4gdGhpcy5yZXF1ZXN0LnBheWxvYWQucGFzc3dvcmQsXHJcbiAgICAgICAgcnVsZXM6IFtuZXcgUmVxdWlyZWRWYWxpZGF0aW9uUnVsZSgpXVxyXG4gICAgICB9KVxyXG4gICAgXTtcclxuXHJcbiAgICB2YXIgdmFsaWRhdG9yID0gbmV3IENsaWVudFZhbGlkYXRvcih7XHJcbiAgICAgIGZvcm1SZWY6IHRoaXMuZm9ybVJlZixcclxuICAgICAgb3B0aW9uczogb3B0aW9ucyxcclxuICAgICAgcGF5bG9hZFJlZjogKCkgPT4gdGhpc1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5fdmFsaWRhdGlvblNlcnZpY2UuaW5pdCh7XHJcbiAgICAgIHZhbGlkYXRvcjogdGhpcy52YWxpZGF0b3IgPyB0aGlzLnZhbGlkYXRvciA6IHZhbGlkYXRvclxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==