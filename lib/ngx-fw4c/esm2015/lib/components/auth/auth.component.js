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
                this._authenticationService.setApi(this.api);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZnc0Yy8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2F1dGgvYXV0aC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBaUIsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDckgsT0FBTyxFQUFFLE1BQU0sRUFBRSxjQUFjLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsMkJBQTJCLEVBQUUsYUFBYSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3RHLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUM5RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsZ0JBQWdCLEVBQUUsc0JBQXNCLEVBQUUsZUFBZSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDcEgsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUMxRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFTekQsTUFBTSxPQUFPLGFBQWE7Ozs7Ozs7Ozs7SUFZeEIsWUFDUyxLQUFxQixFQUNwQixPQUFlLEVBQ2YsYUFBMkIsRUFDM0Isc0JBQTZDLEVBQzdDLGtCQUFxQyxFQUNyQyxZQUF5QixFQUN6QixrQkFBcUM7UUFOdEMsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFDcEIsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUNmLGtCQUFhLEdBQWIsYUFBYSxDQUFjO1FBQzNCLDJCQUFzQixHQUF0QixzQkFBc0IsQ0FBdUI7UUFDN0MsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFtQjtRQUNyQyxpQkFBWSxHQUFaLFlBQVksQ0FBYTtRQUN6Qix1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW1CO1FBbEIvQixVQUFLLEdBQVcsV0FBVyxDQUFDO1FBSTVCLFFBQUcsR0FBVywyQkFBMkIsQ0FBQztRQUMxQyxZQUFPLEdBQVksSUFBSSxDQUFDO1FBQ3ZCLGNBQVMsR0FBRyxJQUFJLFlBQVksRUFBK0IsQ0FBQztRQUV0RSxZQUFPLEdBQStCLElBQUksMEJBQTBCLEVBQUUsQ0FBQztJQVcxRSxDQUFDOzs7O0lBRUwsUUFBUTtRQUNOLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVM7Ozs7UUFBQyxJQUFJLENBQUMsRUFBRTtZQUMvQixJQUFJLElBQUksRUFBRTtnQkFDUixJQUFJLElBQUksQ0FBQyxXQUFXO29CQUFFLElBQUksQ0FBQyxXQUFXLEdBQUcsbUJBQVEsSUFBSSxDQUFDLFdBQVcsRUFBQSxDQUFDO2dCQUNsRSxJQUFJLElBQUksQ0FBQyxHQUFHO29CQUFFLElBQUksQ0FBQyxHQUFHLEdBQUcsbUJBQVEsSUFBSSxDQUFDLEdBQUcsRUFBQSxDQUFDO2dCQUMxQyxJQUFJLElBQUksQ0FBQyxPQUFPLElBQUksU0FBUztvQkFBRSxJQUFJLENBQUMsT0FBTyxHQUFHLG1CQUFTLElBQUksQ0FBQyxPQUFPLEVBQUEsQ0FBQztnQkFDcEUsSUFBSSxDQUFDLHNCQUFzQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDOUM7UUFDSCxDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7Ozs7SUFFRCxlQUFlO1FBQ2IsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQ3pCLENBQUM7Ozs7SUFFTSxLQUFLO1FBQ1YsSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLEVBQUU7WUFBRSxPQUFPO1FBQy9DLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFHLElBQUksMkJBQTJCLENBQUM7WUFDdEQsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO1lBQ3JCLE9BQU8sRUFBRSxXQUFXLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDbEMsS0FBSyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFO1lBQ2xDLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUc7WUFDOUIsSUFBSSxFQUFFLElBQUksYUFBYSxDQUFDO2dCQUN0QixFQUFFLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUU7Z0JBQy9CLFFBQVEsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRO2dCQUN2QyxLQUFLLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFHLFdBQVc7Z0JBQ2xELFdBQVcsRUFBRSxJQUFJLElBQUksRUFBRTtnQkFDdkIsUUFBUSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVE7Z0JBQ3ZDLEtBQUssRUFBRTtvQkFDTCxHQUFHLEVBQUUsNkRBQTZEO2lCQUNuRTthQUNGLENBQUM7U0FDSCxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsc0JBQXNCLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTOzs7O1FBQUMsQ0FBQyxRQUFxQyxFQUFFLEVBQUU7WUFDbEcsSUFBSSxRQUFRLENBQUMsT0FBTyxFQUFFO2dCQUNwQixJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDdEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQzlCLElBQUksSUFBSSxDQUFDLFdBQVc7b0JBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztnQkFDaEUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO2FBQzlEO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDMUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQzlCLElBQUksQ0FBQyxZQUFZLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQzthQUN0QztRQUNILENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7SUFFTyxlQUFlO1FBQ3JCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTztZQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQzs7WUFDbEQsT0FBTyxHQUF1QjtZQUNoQyxJQUFJLGdCQUFnQixDQUFDO2dCQUNuQixjQUFjLEVBQUUsVUFBVTtnQkFDMUIsYUFBYTs7O2dCQUFFLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQTtnQkFDbEQsS0FBSyxFQUFFLENBQUMsSUFBSSxzQkFBc0IsRUFBRSxDQUFDO2FBQ3RDLENBQUM7WUFDRixJQUFJLGdCQUFnQixDQUFDO2dCQUNuQixjQUFjLEVBQUUsVUFBVTtnQkFDMUIsYUFBYTs7O2dCQUFFLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQTtnQkFDbEQsS0FBSyxFQUFFLENBQUMsSUFBSSxzQkFBc0IsRUFBRSxDQUFDO2FBQ3RDLENBQUM7U0FDSDs7WUFFRyxTQUFTLEdBQUcsSUFBSSxlQUFlLENBQUM7WUFDbEMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO1lBQ3JCLE9BQU8sRUFBRSxPQUFPO1lBQ2hCLFVBQVU7Ozs7O1lBQUUsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFBO1NBQ3ZCLENBQUM7UUFFRixJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDO1lBQzNCLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxTQUFTO1NBQ3ZELENBQUMsQ0FBQztJQUNMLENBQUM7OztZQXBHRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGFBQWE7Z0JBQ3ZCLHd6Q0FBb0M7Z0JBRXBDLFVBQVUsRUFBRSxDQUFDLFNBQVMsQ0FBQzs7YUFDeEI7Ozs7WUFqQmdCLGNBQWM7WUFBdEIsTUFBTTtZQUlOLFlBQVk7WUFGWixxQkFBcUI7WUFJckIsaUJBQWlCO1lBRGpCLFdBQVc7WUFJWCxpQkFBaUI7OztvQkFXdkIsS0FBSzt3QkFDTCxLQUFLOzBCQUNMLEtBQUs7dUJBQ0wsS0FBSztrQkFDTCxLQUFLO3NCQUNMLEtBQUs7d0JBQ0wsTUFBTTtzQkFDTixTQUFTLFNBQUMsU0FBUyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTs7OztJQVB0Qyw4QkFBNEM7O0lBQzVDLGtDQUEyQzs7SUFDM0Msb0NBQW9DOztJQUNwQyxpQ0FBdUM7O0lBQ3ZDLDRCQUEwRDs7SUFDMUQsZ0NBQXdDOztJQUN4QyxrQ0FBNkU7O0lBQzdFLGdDQUFtRTs7SUFDbkUsZ0NBQThFOztJQUM5RSxxQ0FBNEI7O0lBRzFCLDhCQUE0Qjs7Ozs7SUFDNUIsZ0NBQXVCOzs7OztJQUN2QixzQ0FBbUM7Ozs7O0lBQ25DLCtDQUFxRDs7Ozs7SUFDckQsMkNBQTZDOzs7OztJQUM3QyxxQ0FBaUM7Ozs7O0lBQ2pDLDJDQUE2QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgVmlld0NoaWxkLCBFbGVtZW50UmVmLCBBZnRlclZpZXdJbml0LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSb3V0ZXIsIEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgQXV0aGVudGljYXRpb25Mb2dpblJlcXVlc3QsIEF1dGhlbnRpY2F0aW9uTG9naW5SZXNwb25zZSwgVXNlclZpZXdNb2RlbCB9IGZyb20gJy4vYXV0aC5tb2RlbCc7XHJcbmltcG9ydCB7IEF1dGhlbnRpY2F0aW9uU2VydmljZSB9IGZyb20gJy4vYXV0aC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQXV0aENvbnN0IH0gZnJvbSAnLi9hdXRoLmNvbnN0JztcclxuaW1wb3J0IHsgQ2FjaGVTZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL3NlcnZpY2VzL2NhY2hlLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBEYXRhU2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9zZXJ2aWNlcy9kYXRhLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBWYWxpZGF0aW9uU2VydmljZSwgVmFsaWRhdGlvbk9wdGlvbiwgUmVxdWlyZWRWYWxpZGF0aW9uUnVsZSwgQ2xpZW50VmFsaWRhdG9yIH0gZnJvbSAnLi4vc2hhcmVkL3ZhbGlkYXRpb24nO1xyXG5pbXBvcnQgeyBmYWRlSW5PdXQgfSBmcm9tICcuLi9zaGFyZWQvdHJpZ2dlcnMnO1xyXG5pbXBvcnQgeyBCYXNlVGVtcGxhdGUgfSBmcm9tICcuLi9zaGFyZWQvbW9kZWxzL2Jhc2UubW9kZWwnO1xyXG5pbXBvcnQgeyBBZ2dyZWdhdG9yU2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9zZXJ2aWNlcy9hZ2dyZWdhdG9yLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBLZXlDb25zdCB9IGZyb20gJy4uL3NoYXJlZC9jb25zdGFudHMva2V5LmNvbnN0JztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAna2F0YW5hLWF1dGgnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9hdXRoLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9hdXRoLmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgYW5pbWF0aW9uczogW2ZhZGVJbk91dF1cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBBdXRoQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0IHtcclxuICBASW5wdXQoKSBwdWJsaWMgdGl0bGU6IHN0cmluZyA9ICfEkMSDbmcgbmjhuq1wJztcclxuICBASW5wdXQoKSBwdWJsaWMgdmFsaWRhdG9yOiBDbGllbnRWYWxpZGF0b3I7XHJcbiAgQElucHV0KCkgcHVibGljIHN1Y2NlZWRQYXRoOiBzdHJpbmc7XHJcbiAgQElucHV0KCkgcHVibGljIHRlbXBsYXRlOiBCYXNlVGVtcGxhdGU7XHJcbiAgQElucHV0KCkgcHVibGljIGFwaTogc3RyaW5nID0gJ3YxL2F1dGhlbnRpY2F0aW9ucy9zZWFyY2gnO1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBzdWNjZXNzOiBib29sZWFuID0gdHJ1ZTtcclxuICBAT3V0cHV0KCkgcHVibGljIGNvbXBsZXRlZCA9IG5ldyBFdmVudEVtaXR0ZXI8QXV0aGVudGljYXRpb25Mb2dpblJlc3BvbnNlPigpO1xyXG4gIEBWaWV3Q2hpbGQoJ2Zvcm1SZWYnLCB7IHN0YXRpYzogdHJ1ZSB9KSBwdWJsaWMgZm9ybVJlZjogRWxlbWVudFJlZjtcclxuICBwdWJsaWMgcmVxdWVzdDogQXV0aGVudGljYXRpb25Mb2dpblJlcXVlc3QgPSBuZXcgQXV0aGVudGljYXRpb25Mb2dpblJlcXVlc3QoKTtcclxuICBwdWJsaWMgZXJyb3JNZXNzYWdlOiBzdHJpbmc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHVibGljIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcclxuICAgIHByaXZhdGUgX3JvdXRlcjogUm91dGVyLFxyXG4gICAgcHJpdmF0ZSBfY2FjaGVTZXJ2aWNlOiBDYWNoZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIF9hdXRoZW50aWNhdGlvblNlcnZpY2U6IEF1dGhlbnRpY2F0aW9uU2VydmljZSxcclxuICAgIHByaXZhdGUgX3ZhbGlkYXRpb25TZXJ2aWNlOiBWYWxpZGF0aW9uU2VydmljZSxcclxuICAgIHByaXZhdGUgX2RhdGFTZXJ2aWNlOiBEYXRhU2VydmljZSxcclxuICAgIHByaXZhdGUgX2FnZ3JlZ2F0b3JTZXJ2aWNlOiBBZ2dyZWdhdG9yU2VydmljZVxyXG4gICkgeyB9XHJcblxyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5yb3V0ZS5kYXRhLnN1YnNjcmliZShkYXRhID0+IHtcclxuICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICBpZiAoZGF0YS5zdWNjZWVkUGF0aCkgdGhpcy5zdWNjZWVkUGF0aCA9IDxzdHJpbmc+ZGF0YS5zdWNjZWVkUGF0aDtcclxuICAgICAgICBpZiAoZGF0YS5hcGkpIHRoaXMuYXBpID0gPHN0cmluZz5kYXRhLmFwaTtcclxuICAgICAgICBpZiAoZGF0YS5zdWNjZXNzICE9IHVuZGVmaW5lZCkgdGhpcy5zdWNjZXNzID0gPGJvb2xlYW4+ZGF0YS5zdWNjZXNzO1xyXG4gICAgICAgIHRoaXMuX2F1dGhlbnRpY2F0aW9uU2VydmljZS5zZXRBcGkodGhpcy5hcGkpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcclxuICAgIHRoaXMuaW5pdFZhbGlkYXRpb25zKCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbG9naW4oKTogdm9pZCB7XHJcbiAgICBpZiAoIXRoaXMuX3ZhbGlkYXRpb25TZXJ2aWNlLmlzVmFsaWQoKSkgcmV0dXJuO1xyXG4gICAgdGhpcy5yZXF1ZXN0Lm1vY2tEYXRhID0gbmV3IEF1dGhlbnRpY2F0aW9uTG9naW5SZXNwb25zZSh7XHJcbiAgICAgIHN1Y2Nlc3M6IHRoaXMuc3VjY2VzcyxcclxuICAgICAgbWVzc2FnZTogYFN0YXR1czogJHt0aGlzLnN1Y2Nlc3N9YCxcclxuICAgICAgdG9rZW46IHRoaXMuX2RhdGFTZXJ2aWNlLm5ld0d1aWQoKSxcclxuICAgICAgY29kZTogdGhpcy5zdWNjZXNzID8gMjAwIDogNTAwLFxyXG4gICAgICB1c2VyOiBuZXcgVXNlclZpZXdNb2RlbCh7XHJcbiAgICAgICAgaWQ6IHRoaXMuX2RhdGFTZXJ2aWNlLm5ld0d1aWQoKSxcclxuICAgICAgICBmdWxsTmFtZTogdGhpcy5yZXF1ZXN0LnBheWxvYWQudXNlck5hbWUsXHJcbiAgICAgICAgZW1haWw6IHRoaXMucmVxdWVzdC5wYXlsb2FkLnVzZXJOYW1lICsgJ0B0ZXN0LmNvbScsXHJcbiAgICAgICAgZGF0ZU9mQmlydGg6IG5ldyBEYXRlKCksXHJcbiAgICAgICAgdXNlck5hbWU6IHRoaXMucmVxdWVzdC5wYXlsb2FkLnVzZXJOYW1lLFxyXG4gICAgICAgIGltYWdlOiB7XHJcbiAgICAgICAgICBzcmM6ICdodHRwczovL2ltZy5pY29uczguY29tL2NvdHRvbi82NC8wMDAwMDAvdXNlci1mZW1hbGUtLXYzLnBuZydcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9KTtcclxuICAgIHRoaXMuX2F1dGhlbnRpY2F0aW9uU2VydmljZS5sb2dpbih0aGlzLnJlcXVlc3QpLnN1YnNjcmliZSgocmVzcG9uc2U6IEF1dGhlbnRpY2F0aW9uTG9naW5SZXNwb25zZSkgPT4ge1xyXG4gICAgICBpZiAocmVzcG9uc2Uuc3VjY2Vzcykge1xyXG4gICAgICAgIHRoaXMuX2NhY2hlU2VydmljZS5zZXQoQXV0aENvbnN0LlVzZXIsIHJlc3BvbnNlLnVzZXIpO1xyXG4gICAgICAgIHRoaXMuY29tcGxldGVkLmVtaXQocmVzcG9uc2UpO1xyXG4gICAgICAgIGlmICh0aGlzLnN1Y2NlZWRQYXRoKSB0aGlzLl9yb3V0ZXIubmF2aWdhdGUoW3RoaXMuc3VjY2VlZFBhdGhdKTtcclxuICAgICAgICB0aGlzLl9hZ2dyZWdhdG9yU2VydmljZS5wdWJsaXNoKEtleUNvbnN0LkxvZ2dlZEluLCByZXNwb25zZSk7ICAgICAgXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5fY2FjaGVTZXJ2aWNlLnJlbW92ZShBdXRoQ29uc3QuVXNlcik7XHJcbiAgICAgICAgdGhpcy5jb21wbGV0ZWQuZW1pdChyZXNwb25zZSk7XHJcbiAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2UgPSByZXNwb25zZS5tZXNzYWdlO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaW5pdFZhbGlkYXRpb25zKCk6IHZvaWQge1xyXG4gICAgaWYgKCF0aGlzLmZvcm1SZWYpIHRocm93IG5ldyBFcnJvcignZm9ybVJlZiBpcyBudWxsJyk7XHJcbiAgICB2YXIgb3B0aW9uczogVmFsaWRhdGlvbk9wdGlvbltdID0gW1xyXG4gICAgICBuZXcgVmFsaWRhdGlvbk9wdGlvbih7XHJcbiAgICAgICAgdmFsaWRhdGlvbk5hbWU6ICdVc2VyTmFtZScsXHJcbiAgICAgICAgdmFsdWVSZXNvbHZlcjogKCkgPT4gdGhpcy5yZXF1ZXN0LnBheWxvYWQudXNlck5hbWUsXHJcbiAgICAgICAgcnVsZXM6IFtuZXcgUmVxdWlyZWRWYWxpZGF0aW9uUnVsZSgpXVxyXG4gICAgICB9KSxcclxuICAgICAgbmV3IFZhbGlkYXRpb25PcHRpb24oe1xyXG4gICAgICAgIHZhbGlkYXRpb25OYW1lOiAnUGFzc3dvcmQnLFxyXG4gICAgICAgIHZhbHVlUmVzb2x2ZXI6ICgpID0+IHRoaXMucmVxdWVzdC5wYXlsb2FkLnBhc3N3b3JkLFxyXG4gICAgICAgIHJ1bGVzOiBbbmV3IFJlcXVpcmVkVmFsaWRhdGlvblJ1bGUoKV1cclxuICAgICAgfSlcclxuICAgIF07XHJcblxyXG4gICAgdmFyIHZhbGlkYXRvciA9IG5ldyBDbGllbnRWYWxpZGF0b3Ioe1xyXG4gICAgICBmb3JtUmVmOiB0aGlzLmZvcm1SZWYsXHJcbiAgICAgIG9wdGlvbnM6IG9wdGlvbnMsXHJcbiAgICAgIHBheWxvYWRSZWY6ICgpID0+IHRoaXNcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuX3ZhbGlkYXRpb25TZXJ2aWNlLmluaXQoe1xyXG4gICAgICB2YWxpZGF0b3I6IHRoaXMudmFsaWRhdG9yID8gdGhpcy52YWxpZGF0b3IgOiB2YWxpZGF0b3JcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=