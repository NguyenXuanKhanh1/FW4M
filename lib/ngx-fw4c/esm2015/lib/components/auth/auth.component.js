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
export class AuthComponent {
    /**
     * @param {?} route
     * @param {?} _router
     * @param {?} _cacheService
     * @param {?} _authenticationService
     * @param {?} _validationService
     * @param {?} _dataService
     * @param {?} _aggregatorService
     */
    constructor(route, _router, _cacheService, _authenticationService, _validationService, _dataService, _aggregatorService) {
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
    ngOnInit() {
        this.route.data.subscribe((/**
         * @param {?} data
         * @return {?}
         */
        data => {
            if (data) {
                if (data.succeedPath)
                    this.succeedPath = (/** @type {?} */ (data.succeedPath));
                if (data.api)
                    this.api = (/** @type {?} */ (data.api));
                if (data.success != undefined)
                    this.success = (/** @type {?} */ (data.success));
                this._authenticationService.api = this.api;
            }
        }));
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.initValidations();
    }
    /**
     * @return {?}
     */
    login() {
        if (!this._validationService.isValid())
            return;
        this.request.mockData = new AuthenticationLoginResponse({
            success: this.success,
            message: `Status: ${this.success}`,
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
        (response) => {
            if (response.success) {
                this._cacheService.set(AuthConst.User, response.user);
                this.completed.emit(response);
                if (this.succeedPath)
                    this._router.navigate([this.succeedPath]);
                this._aggregatorService.publish(KeyConst.LoggedIn, response);
            }
            else {
                this._cacheService.remove(AuthConst.User);
                this.completed.emit(response);
                this.errorMessage = response.message;
            }
        }));
    }
    /**
     * @private
     * @return {?}
     */
    initValidations() {
        if (!this.formRef)
            throw new Error('formRef is null');
        /** @type {?} */
        var options = [
            new ValidationOption({
                validationName: 'UserName',
                valueResolver: (/**
                 * @return {?}
                 */
                () => this.request.payload.userName),
                rules: [new RequiredValidationRule()]
            }),
            new ValidationOption({
                validationName: 'Password',
                valueResolver: (/**
                 * @return {?}
                 */
                () => this.request.payload.password),
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
            () => this)
        });
        this._validationService.init({
            validator: this.validator ? this.validator : validator
        });
    }
}
AuthComponent.decorators = [
    { type: Component, args: [{
                selector: 'katana-auth',
                template: "<div #formRef>\r\n    <ng-container *ngIf=\"!template then default; else custom\">\r\n    </ng-container>\r\n</div>\r\n\r\n<ng-template #custom>\r\n    <katana-loader *ngIf=\"template\" [data]=\"template?.data\" [template]=\"template?.template\"></katana-loader>\r\n</ng-template>\r\n\r\n<ng-template #default>\r\n    <div class=\"col-xs-12 col-sm-6 col-md-3\" style=\"margin: 25px auto; min-height: 550px;\">\r\n        <h2 style=\"text-align: center;\">{{title}}</h2>\r\n        <div class=\"col-xs-12\">\r\n            <katana-textbox [placeholder]=\"'Nh\u1EADp user name...'\" [title]=\"'User Name'\"\r\n                [(model)]=\"request.payload.userName\" [validationName]=\"'UserName'\"></katana-textbox>\r\n            <katana-textbox [placeholder]=\"'Nh\u1EADp password...'\" [title]=\"'Password'\" [(model)]=\"request.payload.password\"\r\n                [validationName]=\"'Password'\"></katana-textbox>\r\n            <ul *ngIf=\"errorMessage\" class=\"col-xs-12\">\r\n                <li class=\"text-danger\">{{errorMessage}}</li>\r\n            </ul>\r\n            <katana-button style=\"width: 100%;\" [icon]=\"'fa fa-sign-in'\" [customClass]=\"'primary full'\"\r\n                (execute)=\"login()\" [title]=\"'Login'\">\r\n            </katana-button>\r\n        </div>\r\n    </div>\r\n</ng-template>",
                animations: [fadeInOut],
                styles: ["input[type=password],input[type=text]{width:100%;padding:12px 20px;margin:5px 0;display:inline-block;box-sizing:border-box}button{background-color:#007bff;color:#fff;padding:14px 20px;margin:8px 0;border:none;cursor:pointer;width:100%}button:hover{opacity:.8}.cancelbtn{width:auto;padding:10px 18px;background-color:#d61e00}.imgcontainer{text-align:center;margin:24px 0 12px}img.avatar{width:40%;border-radius:50%}.container{padding:16px}span.psw{float:right;padding-top:16px}@media screen and (max-width:300px){span.psw{display:block;float:none}.cancelbtn{width:100%}}katana-button .fa-check{color:#6fbb35}katana-button .fa-check:hover{color:#519121}.ng-invalid{border:1px solid #ee4930}.full{width:100%}.background{background:url(https://www.bigboss-financial.com/resources_v2/images/bbslider/bg06.png)}"]
            }] }
];
/** @nocollapse */
AuthComponent.ctorParameters = () => [
    { type: ActivatedRoute },
    { type: Router },
    { type: CacheService },
    { type: AuthenticationService },
    { type: ValidationService },
    { type: DataService },
    { type: AggregatorService }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZnc0Yy8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2F1dGgvYXV0aC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBaUIsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDckgsT0FBTyxFQUFFLE1BQU0sRUFBRSxjQUFjLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsMkJBQTJCLEVBQUUsYUFBYSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3RHLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUM5RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsZ0JBQWdCLEVBQUUsc0JBQXNCLEVBQUUsZUFBZSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDcEgsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUMxRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFTekQsTUFBTSxPQUFPLGFBQWE7Ozs7Ozs7Ozs7SUFZeEIsWUFDUyxLQUFxQixFQUNwQixPQUFlLEVBQ2YsYUFBMkIsRUFDM0Isc0JBQTZDLEVBQzdDLGtCQUFxQyxFQUNyQyxZQUF5QixFQUN6QixrQkFB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TztZQUNyQixPQUFPLEVBQUUsT0FBTztZQUNoQixVQUFVOzs7OztZQUFFLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQTtTQUN2QixDQUFDO1FBRUYsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQztZQUMzQixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsU0FBUztTQUN2RCxDQUFDLENBQUM7SUFDTCxDQUFDOzs7WUFwR0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxhQUFhO2dCQUN2Qix3ekNBQW9DO2dCQUVwQyxVQUFVLEVBQUUsQ0FBQyxTQUFTLENBQUM7O2FBQ3hCOzs7O1lBakJnQixjQUFjO1lBQXRCLE1BQU07WUFJTixZQUFZO1lBRloscUJBQXFCO1lBSXJCLGlCQUFpQjtZQURqQixXQUFXO1lBSVgsaUJBQWlCOzs7b0JBV3ZCLEtBQUs7d0JBQ0wsS0FBSzswQkFDTCxLQUFLO3VCQUNMLEtBQUs7a0JBQ0wsS0FBSztzQkFDTCxLQUFLO3dCQUNMLE1BQU07c0JBQ04sU0FBUyxTQUFDLFNBQVMsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7Ozs7SUFQdEMsOEJBQTRDOztJQUM1QyxrQ0FBMkM7O0lBQzNDLG9DQUFvQzs7SUFDcEMsaUNBQXVDOztJQUN2Qyw0QkFBMEQ7O0lBQzFELGdDQUF3Qzs7SUFDeEMsa0NBQTZFOztJQUM3RSxnQ0FBbUU7O0lBQ25FLGdDQUE4RTs7SUFDOUUscUNBQTRCOztJQUcxQiw4QkFBNEI7Ozs7O0lBQzVCLGdDQUF1Qjs7Ozs7SUFDdkIsc0NBQW1DOzs7OztJQUNuQywrQ0FBcUQ7Ozs7O0lBQ3JELDJDQUE2Qzs7Ozs7SUFDN0MscUNBQWlDOzs7OztJQUNqQywyQ0FBNkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiwgQWZ0ZXJWaWV3SW5pdCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyLCBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IEF1dGhlbnRpY2F0aW9uTG9naW5SZXF1ZXN0LCBBdXRoZW50aWNhdGlvbkxvZ2luUmVzcG9uc2UsIFVzZXJWaWV3TW9kZWwgfSBmcm9tICcuL2F1dGgubW9kZWwnO1xyXG5pbXBvcnQgeyBBdXRoZW50aWNhdGlvblNlcnZpY2UgfSBmcm9tICcuL2F1dGguc2VydmljZSc7XHJcbmltcG9ydCB7IEF1dGhDb25zdCB9IGZyb20gJy4vYXV0aC5jb25zdCc7XHJcbmltcG9ydCB7IENhY2hlU2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9zZXJ2aWNlcy9jYWNoZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgRGF0YVNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQvc2VydmljZXMvZGF0YS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgVmFsaWRhdGlvblNlcnZpY2UsIFZhbGlkYXRpb25PcHRpb24sIFJlcXVpcmVkVmFsaWRhdGlvblJ1bGUsIENsaWVudFZhbGlkYXRvciB9IGZyb20gJy4uL3NoYXJlZC92YWxpZGF0aW9uJztcclxuaW1wb3J0IHsgZmFkZUluT3V0IH0gZnJvbSAnLi4vc2hhcmVkL3RyaWdnZXJzJztcclxuaW1wb3J0IHsgQmFzZVRlbXBsYXRlIH0gZnJvbSAnLi4vc2hhcmVkL21vZGVscy9iYXNlLm1vZGVsJztcclxuaW1wb3J0IHsgQWdncmVnYXRvclNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQvc2VydmljZXMvYWdncmVnYXRvci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgS2V5Q29uc3QgfSBmcm9tICcuLi9zaGFyZWQvY29uc3RhbnRzL2tleS5jb25zdCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2thdGFuYS1hdXRoJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vYXV0aC5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vYXV0aC5jb21wb25lbnQuc2NzcyddLFxyXG4gIGFuaW1hdGlvbnM6IFtmYWRlSW5PdXRdXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgQXV0aENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCB7XHJcbiAgQElucHV0KCkgcHVibGljIHRpdGxlOiBzdHJpbmcgPSAnxJDEg25nIG5o4bqtcCc7XHJcbiAgQElucHV0KCkgcHVibGljIHZhbGlkYXRvcjogQ2xpZW50VmFsaWRhdG9yO1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBzdWNjZWVkUGF0aDogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIHB1YmxpYyB0ZW1wbGF0ZTogQmFzZVRlbXBsYXRlO1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBhcGk6IHN0cmluZyA9ICd2MS9hdXRoZW50aWNhdGlvbnMvc2VhcmNoJztcclxuICBASW5wdXQoKSBwdWJsaWMgc3VjY2VzczogYm9vbGVhbiA9IHRydWU7XHJcbiAgQE91dHB1dCgpIHB1YmxpYyBjb21wbGV0ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPEF1dGhlbnRpY2F0aW9uTG9naW5SZXNwb25zZT4oKTtcclxuICBAVmlld0NoaWxkKCdmb3JtUmVmJywgeyBzdGF0aWM6IHRydWUgfSkgcHVibGljIGZvcm1SZWY6IEVsZW1lbnRSZWY7XHJcbiAgcHVibGljIHJlcXVlc3Q6IEF1dGhlbnRpY2F0aW9uTG9naW5SZXF1ZXN0ID0gbmV3IEF1dGhlbnRpY2F0aW9uTG9naW5SZXF1ZXN0KCk7XHJcbiAgcHVibGljIGVycm9yTWVzc2FnZTogc3RyaW5nO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHB1YmxpYyByb3V0ZTogQWN0aXZhdGVkUm91dGUsXHJcbiAgICBwcml2YXRlIF9yb3V0ZXI6IFJvdXRlcixcclxuICAgIHByaXZhdGUgX2NhY2hlU2VydmljZTogQ2FjaGVTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBfYXV0aGVudGljYXRpb25TZXJ2aWNlOiBBdXRoZW50aWNhdGlvblNlcnZpY2UsXHJcbiAgICBwcml2YXRlIF92YWxpZGF0aW9uU2VydmljZTogVmFsaWRhdGlvblNlcnZpY2UsXHJcbiAgICBwcml2YXRlIF9kYXRhU2VydmljZTogRGF0YVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIF9hZ2dyZWdhdG9yU2VydmljZTogQWdncmVnYXRvclNlcnZpY2VcclxuICApIHsgfVxyXG5cclxuICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIHRoaXMucm91dGUuZGF0YS5zdWJzY3JpYmUoZGF0YSA9PiB7XHJcbiAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgaWYgKGRhdGEuc3VjY2VlZFBhdGgpIHRoaXMuc3VjY2VlZFBhdGggPSA8c3RyaW5nPmRhdGEuc3VjY2VlZFBhdGg7XHJcbiAgICAgICAgaWYgKGRhdGEuYXBpKSB0aGlzLmFwaSA9IDxzdHJpbmc+ZGF0YS5hcGk7XHJcbiAgICAgICAgaWYgKGRhdGEuc3VjY2VzcyAhPSB1bmRlZmluZWQpIHRoaXMuc3VjY2VzcyA9IDxib29sZWFuPmRhdGEuc3VjY2VzcztcclxuICAgICAgICB0aGlzLl9hdXRoZW50aWNhdGlvblNlcnZpY2UuYXBpID0gdGhpcy5hcGk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5pbml0VmFsaWRhdGlvbnMoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBsb2dpbigpOiB2b2lkIHtcclxuICAgIGlmICghdGhpcy5fdmFsaWRhdGlvblNlcnZpY2UuaXNWYWxpZCgpKSByZXR1cm47XHJcbiAgICB0aGlzLnJlcXVlc3QubW9ja0RhdGEgPSBuZXcgQXV0aGVudGljYXRpb25Mb2dpblJlc3BvbnNlKHtcclxuICAgICAgc3VjY2VzczogdGhpcy5zdWNjZXNzLFxyXG4gICAgICBtZXNzYWdlOiBgU3RhdHVzOiAke3RoaXMuc3VjY2Vzc31gLFxyXG4gICAgICB0b2tlbjogdGhpcy5fZGF0YVNlcnZpY2UubmV3R3VpZCgpLFxyXG4gICAgICBjb2RlOiB0aGlzLnN1Y2Nlc3MgPyAyMDAgOiA1MDAsXHJcbiAgICAgIHVzZXI6IG5ldyBVc2VyVmlld01vZGVsKHtcclxuICAgICAgICBpZDogdGhpcy5fZGF0YVNlcnZpY2UubmV3R3VpZCgpLFxyXG4gICAgICAgIGZ1bGxOYW1lOiB0aGlzLnJlcXVlc3QucGF5bG9hZC51c2VyTmFtZSxcclxuICAgICAgICBlbWFpbDogdGhpcy5yZXF1ZXN0LnBheWxvYWQudXNlck5hbWUgKyAnQHRlc3QuY29tJyxcclxuICAgICAgICBkYXRlT2ZCaXJ0aDogbmV3IERhdGUoKSxcclxuICAgICAgICB1c2VyTmFtZTogdGhpcy5yZXF1ZXN0LnBheWxvYWQudXNlck5hbWUsXHJcbiAgICAgICAgaW1hZ2U6IHtcclxuICAgICAgICAgIHNyYzogJ2h0dHBzOi8vaW1nLmljb25zOC5jb20vY290dG9uLzY0LzAwMDAwMC91c2VyLWZlbWFsZS0tdjMucG5nJ1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH0pO1xyXG4gICAgdGhpcy5fYXV0aGVudGljYXRpb25TZXJ2aWNlLmxvZ2luKHRoaXMucmVxdWVzdCkuc3Vic2NyaWJlKChyZXNwb25zZTogQXV0aGVudGljYXRpb25Mb2dpblJlc3BvbnNlKSA9PiB7XHJcbiAgICAgIGlmIChyZXNwb25zZS5zdWNjZXNzKSB7XHJcbiAgICAgICAgdGhpcy5fY2FjaGVTZXJ2aWNlLnNldChBdXRoQ29uc3QuVXNlciwgcmVzcG9uc2UudXNlcik7XHJcbiAgICAgICAgdGhpcy5jb21wbGV0ZWQuZW1pdChyZXNwb25zZSk7XHJcbiAgICAgICAgaWYgKHRoaXMuc3VjY2VlZFBhdGgpIHRoaXMuX3JvdXRlci5uYXZpZ2F0ZShbdGhpcy5zdWNjZWVkUGF0aF0pO1xyXG4gICAgICAgIHRoaXMuX2FnZ3JlZ2F0b3JTZXJ2aWNlLnB1Ymxpc2goS2V5Q29uc3QuTG9nZ2VkSW4sIHJlc3BvbnNlKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLl9jYWNoZVNlcnZpY2UucmVtb3ZlKEF1dGhDb25zdC5Vc2VyKTtcclxuICAgICAgICB0aGlzLmNvbXBsZXRlZC5lbWl0KHJlc3BvbnNlKTtcclxuICAgICAgICB0aGlzLmVycm9yTWVzc2FnZSA9IHJlc3BvbnNlLm1lc3NhZ2U7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpbml0VmFsaWRhdGlvbnMoKTogdm9pZCB7XHJcbiAgICBpZiAoIXRoaXMuZm9ybVJlZikgdGhyb3cgbmV3IEVycm9yKCdmb3JtUmVmIGlzIG51bGwnKTtcclxuICAgIHZhciBvcHRpb25zOiBWYWxpZGF0aW9uT3B0aW9uW10gPSBbXHJcbiAgICAgIG5ldyBWYWxpZGF0aW9uT3B0aW9uKHtcclxuICAgICAgICB2YWxpZGF0aW9uTmFtZTogJ1VzZXJOYW1lJyxcclxuICAgICAgICB2YWx1ZVJlc29sdmVyOiAoKSA9PiB0aGlzLnJlcXVlc3QucGF5bG9hZC51c2VyTmFtZSxcclxuICAgICAgICBydWxlczogW25ldyBSZXF1aXJlZFZhbGlkYXRpb25SdWxlKCldXHJcbiAgICAgIH0pLFxyXG4gICAgICBuZXcgVmFsaWRhdGlvbk9wdGlvbih7XHJcbiAgICAgICAgdmFsaWRhdGlvbk5hbWU6ICdQYXNzd29yZCcsXHJcbiAgICAgICAgdmFsdWVSZXNvbHZlcjogKCkgPT4gdGhpcy5yZXF1ZXN0LnBheWxvYWQucGFzc3dvcmQsXHJcbiAgICAgICAgcnVsZXM6IFtuZXcgUmVxdWlyZWRWYWxpZGF0aW9uUnVsZSgpXVxyXG4gICAgICB9KVxyXG4gICAgXTtcclxuXHJcbiAgICB2YXIgdmFsaWRhdG9yID0gbmV3IENsaWVudFZhbGlkYXRvcih7XHJcbiAgICAgIGZvcm1SZWY6IHRoaXMuZm9ybVJlZixcclxuICAgICAgb3B0aW9uczogb3B0aW9ucyxcclxuICAgICAgcGF5bG9hZFJlZjogKCkgPT4gdGhpc1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5fdmFsaWRhdGlvblNlcnZpY2UuaW5pdCh7XHJcbiAgICAgIHZhbGlkYXRvcjogdGhpcy52YWxpZGF0b3IgPyB0aGlzLnZhbGlkYXRvciA6IHZhbGlkYXRvclxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==