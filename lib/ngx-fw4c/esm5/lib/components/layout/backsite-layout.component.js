/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component } from "@angular/core";
import { DefaultLayoutService } from './layout.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { AggregatorService } from '../shared/services/aggregator.service';
import { KeyConst } from '../shared/constants/key.const';
import { Breadcrumb } from '../shared/models/base.model';
import { ActionService } from '../shared/services/action.service';
import { AuthenticationService } from '../auth/auth.service';
import { CacheService } from '../shared/services/cache.service';
var AdminLayoutComponent = /** @class */ (function () {
    function AdminLayoutComponent(workspaceLayoutService, route, authenticationService, router, actionService, aggregatorService, cacheService) {
        this.workspaceLayoutService = workspaceLayoutService;
        this.route = route;
        this.authenticationService = authenticationService;
        this.router = router;
        this.actionService = actionService;
        this.aggregatorService = aggregatorService;
        this.cacheService = cacheService;
        this.notifications = [];
        this.logo = 'https://cmcglobal.com.vn/css/image-common/Combined%20Shape.svg';
        this.title = 'CMC Global - Aspire to inspire the Digital World';
        this.isModalShow = false;
        this.modalImageSrc = '';
        this.imageAltText = '';
        this.breadcrumbs = [];
        this.url = '/dashboard';
        this.authUrl = '/auth';
        this.setActive = false;
        this.menuType = 'TOP';
        this.registerEvents();
    }
    ;
    /**
     * @return {?}
     */
    AdminLayoutComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.isMobile = this.actionService.isMobile();
        if (this.isMobile)
            this.menuType = 'LEFT';
        this.aggregatorService.subscribe(KeyConst.ViewImage, (/**
         * @param {?} image
         * @return {?}
         */
        function (image) {
            _this.isModalShow = true;
            _this.modalImageSrc = image.src;
            _this.imageAltText = image.altText;
        }));
        this.route.data.subscribe((/**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            if (data) {
                if (data.menuTabs)
                    _this.menuTabs = (/** @type {?} */ (data.menuTabs));
                if (!_this.menuTabs || _this.menuTabs.length == 0) {
                    _this.menuTabs = _this.cacheService.get(KeyConst.Menu);
                }
                if (data.menuType)
                    _this.menuType = (/** @type {?} */ (data.menuType));
                if (data.logo)
                    _this.logo = (/** @type {?} */ (data.logo));
                if (data.title)
                    (/** @type {?} */ (data.title));
                if (data.url)
                    _this.url = (/** @type {?} */ (data.url));
                if (data.authUrl)
                    _this.authUrl = (/** @type {?} */ (data.authUrl));
                if (data.breadcrumb)
                    _this.breadcrumb = (/** @type {?} */ (data.breadcrumb));
                if (!_this.breadcrumb) {
                    _this.breadcrumb = new Breadcrumb({
                        label: 'Home',
                        url: _this.url
                    });
                }
                else {
                    _this.breadcrumb.url = _this.url;
                }
                if (_this.router.url == '/')
                    _this.router.navigate([_this.url]);
                if (!_this.authenticationService.currentUser)
                    _this.router.navigate([_this.authUrl]);
            }
        }));
    };
    /**
     * @return {?}
     */
    AdminLayoutComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.router.events.subscribe((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            if (event instanceof NavigationEnd) {
                if (_this.router.url == '/') {
                    _this.router.navigate([_this.url]);
                    _this.setActive = !_this.setActive;
                }
            }
        }));
    };
    /**
     * @return {?}
     */
    AdminLayoutComponent.prototype.closeImage = /**
     * @return {?}
     */
    function () {
        this.isModalShow = false;
    };
    /**
     * @param {?} items
     * @return {?}
     */
    AdminLayoutComponent.prototype.changeMenu = /**
     * @param {?} items
     * @return {?}
     */
    function (items) {
        this.breadcrumbs = items;
        this.breadcrumbs.splice(0, 0, this.breadcrumb);
        this.aggregatorService.publish(KeyConst.MenuChanged, this.breadcrumbs);
    };
    /**
     * @private
     * @return {?}
     */
    AdminLayoutComponent.prototype.registerEvents = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.aggregatorService.subscribe(KeyConst.LoggedIn, (/**
         * @param {?} response
         * @return {?}
         */
        function (response) {
            if (!response)
                return;
            if (response.menuTabs) {
                _this.menuTabs = response.menuTabs;
                _this.cacheService.set(KeyConst.Menu, _this.menuTabs);
            }
            _this.authenticationService.currentUser = response.user;
            _this.workspaceLayoutService.verticalEffect = _this.menuType == 'LEFT' ? 'overlay' : 'shrink';
            _this.actionService.executeAsync((/**
             * @return {?}
             */
            function () {
                _this.setActive = !_this.setActive;
            }));
        }));
    };
    AdminLayoutComponent.decorators = [
        { type: Component, args: [{
                    template: "<div class=\"pcoded\" [attr.nav-type]=\"workspaceLayoutService.navType\"\r\n  [attr.theme-layout]=\"workspaceLayoutService.themeLayout\" [attr.layout-type]=\"workspaceLayoutService.layoutType\"\r\n  [attr.vertical-placement]=\"workspaceLayoutService.verticalPlacement\"\r\n  [attr.vertical-layout]=\"workspaceLayoutService.verticalLayout\"\r\n  [attr.pcoded-device-type]=\"workspaceLayoutService.deviceType\"\r\n  [attr.vertical-nav-type]=\"workspaceLayoutService.verticalNavType\"\r\n  [attr.vertical-effect]=\"authenticationService.currentUser ? workspaceLayoutService.verticalEffect: 'shink'\"\r\n  [attr.vnavigation-view]=\"workspaceLayoutService.vNavigationView\"\r\n  (window:resize)=\"workspaceLayoutService.onResize($event)\">\r\n  <div class=\"pcoded-overlay-box\"></div>\r\n  <div class=\"img-viewer-container\">\r\n    <div (click)=\"closeImage()\" [class.show-now]=\"isModalShow\" class=\"modal\">\r\n      <div class=\"view-wrapper modal-content\">\r\n        <div class=\"adv-popup\">\r\n          <img *ngIf=\"modalImageSrc\" [src]=\"modalImageSrc\">\r\n          <button class=\"btn-close-image\"><i class=\"fa fa-close-line\"></i></button>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"pcoded-container navbar-wrapper\">\r\n    <default-header [menuType]=\"menuType\" [menuTabs]=\"menuTabs\" [notifications]=\"notifications\" [logo]=\"logo\"\r\n      [title]=\"title\"></default-header>\r\n    <div class=\"pcoded-main-container\" [style.margin-top]=\"workspaceLayoutService.headerFixedMargin\">\r\n      <div class=\"pcoded-wrapper\">\r\n        <default-sidebar *ngIf=\"menuTabs && authenticationService?.currentUser && (menuType == 'LEFT' || isMobile)\"\r\n          [setActive]=\"setActive\" (change)=\"changeMenu($event)\" [menuTabs]=\"menuTabs\"></default-sidebar>\r\n        <div class=\"pcoded-content\" [ngClass]=\"{'content-left': menuType == 'TOP'}\">\r\n          <div class=\"pcoded-inner-content\" [ngClass]=\"{'content-top': !authenticationService.currentUser}\">\r\n            <default-navbar *ngIf=\"authenticationService?.currentUser && menuType != 'TOP'\" [url]=\"url\"\r\n              [breadcrumb]=\"breadcrumb\" [menuTabs]=\"menuTabs\" [items]=\"breadcrumbs\">\r\n            </default-navbar>\r\n            <div class=\"main-body\" [ngClass]=\"{'main-top': menuType == 'TOP'}\">\r\n              <div class=\"page-wrapper\">\r\n                <div class=\"page-body\">\r\n                  <katana-card>\r\n                    <router-outlet>\r\n                      <katana-spinner></katana-spinner>\r\n                    </router-outlet>\r\n                  </katana-card>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <default-toolbar></default-toolbar>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <default-footer></default-footer>\r\n  </div>\r\n</div>",
                    styles: [".main-top{margin-top:30px}.content-left{margin-left:0!important}.content-top{padding-top:0!important}"]
                }] }
    ];
    /** @nocollapse */
    AdminLayoutComponent.ctorParameters = function () { return [
        { type: DefaultLayoutService },
        { type: ActivatedRoute },
        { type: AuthenticationService },
        { type: Router },
        { type: ActionService },
        { type: AggregatorService },
        { type: CacheService }
    ]; };
    return AdminLayoutComponent;
}());
export { AdminLayoutComponent };
if (false) {
    /** @type {?} */
    AdminLayoutComponent.prototype.notifications;
    /** @type {?} */
    AdminLayoutComponent.prototype.logo;
    /** @type {?} */
    AdminLayoutComponent.prototype.title;
    /** @type {?} */
    AdminLayoutComponent.prototype.menuTabs;
    /** @type {?} */
    AdminLayoutComponent.prototype.isModalShow;
    /** @type {?} */
    AdminLayoutComponent.prototype.modalImageSrc;
    /** @type {?} */
    AdminLayoutComponent.prototype.imageAltText;
    /** @type {?} */
    AdminLayoutComponent.prototype.breadcrumbs;
    /** @type {?} */
    AdminLayoutComponent.prototype.breadcrumb;
    /** @type {?} */
    AdminLayoutComponent.prototype.url;
    /** @type {?} */
    AdminLayoutComponent.prototype.authUrl;
    /** @type {?} */
    AdminLayoutComponent.prototype.setActive;
    /** @type {?} */
    AdminLayoutComponent.prototype.menuType;
    /** @type {?} */
    AdminLayoutComponent.prototype.isMobile;
    /** @type {?} */
    AdminLayoutComponent.prototype.workspaceLayoutService;
    /** @type {?} */
    AdminLayoutComponent.prototype.route;
    /** @type {?} */
    AdminLayoutComponent.prototype.authenticationService;
    /**
     * @type {?}
     * @protected
     */
    AdminLayoutComponent.prototype.router;
    /**
     * @type {?}
     * @protected
     */
    AdminLayoutComponent.prototype.actionService;
    /**
     * @type {?}
     * @protected
     */
    AdminLayoutComponent.prototype.aggregatorService;
    /**
     * @type {?}
     * @protected
     */
    AdminLayoutComponent.prototype.cacheService;
    /* Skipping unhandled member: ;*/
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja3NpdGUtbGF5b3V0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1mdzRjLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvbGF5b3V0L2JhY2tzaXRlLWxheW91dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQXlCLE1BQU0sZUFBZSxDQUFDO0FBQ2pFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3hFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUV6RCxPQUFPLEVBQVcsVUFBVSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRTdELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUVoRTtJQXFCSSw4QkFDVyxzQkFBNEMsRUFDNUMsS0FBcUIsRUFDckIscUJBQTRDLEVBQ3pDLE1BQWMsRUFDZCxhQUE0QixFQUM1QixpQkFBb0MsRUFDcEMsWUFBMEI7UUFON0IsMkJBQXNCLEdBQXRCLHNCQUFzQixDQUFzQjtRQUM1QyxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUNyQiwwQkFBcUIsR0FBckIscUJBQXFCLENBQXVCO1FBQ3pDLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ3BDLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBdEJqQyxrQkFBYSxHQUF5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dUNBQWlDOztJQUNqQyx5Q0FBa0M7O0lBQ2xDLHdDQUFnQzs7SUFDaEMsd0NBQXlCOztJQUdyQixzREFBbUQ7O0lBQ25ELHFDQUE0Qjs7SUFDNUIscURBQW1EOzs7OztJQUNuRCxzQ0FBd0I7Ozs7O0lBQ3hCLDZDQUFzQzs7Ozs7SUFDdEMsaURBQThDOzs7OztJQUM5Qyw0Q0FBb0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IERlZmF1bHRMYXlvdXRTZXJ2aWNlIH0gZnJvbSAnLi9sYXlvdXQuc2VydmljZSc7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBSb3V0ZXIsIE5hdmlnYXRpb25FbmQgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBBZ2dyZWdhdG9yU2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9zZXJ2aWNlcy9hZ2dyZWdhdG9yLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBLZXlDb25zdCB9IGZyb20gJy4uL3NoYXJlZC9jb25zdGFudHMva2V5LmNvbnN0JztcclxuaW1wb3J0IHsgTm90aWZpY2F0aW9uRGV0YWlsIH0gZnJvbSAnLi4vc2hhcmVkL21vZGVscy9ub3RpZmljYXRpb24ubW9kZWwnO1xyXG5pbXBvcnQgeyBNZW51VGFiLCBCcmVhZGNydW1iIH0gZnJvbSAnLi4vc2hhcmVkL21vZGVscy9iYXNlLm1vZGVsJztcclxuaW1wb3J0IHsgQWN0aW9uU2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9zZXJ2aWNlcy9hY3Rpb24uc2VydmljZSc7XHJcbmltcG9ydCB7IEF1dGhlbnRpY2F0aW9uU2VydmljZSB9IGZyb20gJy4uL2F1dGgvYXV0aC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQXV0aGVudGljYXRpb25Mb2dpblJlc3BvbnNlIH0gZnJvbSAnLi4vYXV0aC9hdXRoLm1vZGVsJztcclxuaW1wb3J0IHsgQ2FjaGVTZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL3NlcnZpY2VzL2NhY2hlLnNlcnZpY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICB0ZW1wbGF0ZVVybDogJy4vYmFja3NpdGUtbGF5b3V0LmNvbXBvbmVudC5odG1sJyxcclxuICAgIHN0eWxlVXJsczogWycuL2JhY2tzaXRlLWxheW91dC5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgQWRtaW5MYXlvdXRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQge1xyXG4gICAgcHVibGljIG5vdGlmaWNhdGlvbnM6IE5vdGlmaWNhdGlvbkRldGFpbFtdID0gW107XHJcbiAgICBwdWJsaWMgbG9nbzogc3RyaW5nID0gJ2h0dHBzOi8vY21jZ2xvYmFsLmNvbS52bi9jc3MvaW1hZ2UtY29tbW9uL0NvbWJpbmVkJTIwU2hhcGUuc3ZnJztcclxuICAgIHB1YmxpYyB0aXRsZTogc3RyaW5nID0gJ0NNQyBHbG9iYWwgLSBBc3BpcmUgdG8gaW5zcGlyZSB0aGUgRGlnaXRhbCBXb3JsZCc7O1xyXG4gICAgcHVibGljIG1lbnVUYWJzOiBNZW51VGFiW107XHJcbiAgICBwdWJsaWMgaXNNb2RhbFNob3c6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHB1YmxpYyBtb2RhbEltYWdlU3JjOiBzdHJpbmcgPSAnJztcclxuICAgIHB1YmxpYyBpbWFnZUFsdFRleHQ6IHN0cmluZyA9ICcnO1xyXG4gICAgcHVibGljIGJyZWFkY3J1bWJzOiBCcmVhZGNydW1iW10gPSBbXTtcclxuICAgIHB1YmxpYyBicmVhZGNydW1iOiBCcmVhZGNydW1iO1xyXG4gICAgcHVibGljIHVybDogc3RyaW5nID0gJy9kYXNoYm9hcmQnO1xyXG4gICAgcHVibGljIGF1dGhVcmw6IHN0cmluZyA9ICcvYXV0aCc7XHJcbiAgICBwdWJsaWMgc2V0QWN0aXZlOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgbWVudVR5cGU6IHN0cmluZyA9ICdUT1AnO1xyXG4gICAgcHVibGljIGlzTW9iaWxlOiBib29sZWFuO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHB1YmxpYyB3b3Jrc3BhY2VMYXlvdXRTZXJ2aWNlOiBEZWZhdWx0TGF5b3V0U2VydmljZSxcclxuICAgICAgICBwdWJsaWMgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxyXG4gICAgICAgIHB1YmxpYyBhdXRoZW50aWNhdGlvblNlcnZpY2U6IEF1dGhlbnRpY2F0aW9uU2VydmljZSxcclxuICAgICAgICBwcm90ZWN0ZWQgcm91dGVyOiBSb3V0ZXIsXHJcbiAgICAgICAgcHJvdGVjdGVkIGFjdGlvblNlcnZpY2U6IEFjdGlvblNlcnZpY2UsXHJcbiAgICAgICAgcHJvdGVjdGVkIGFnZ3JlZ2F0b3JTZXJ2aWNlOiBBZ2dyZWdhdG9yU2VydmljZSxcclxuICAgICAgICBwcm90ZWN0ZWQgY2FjaGVTZXJ2aWNlOiBDYWNoZVNlcnZpY2VcclxuICAgICkge1xyXG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudHMoKTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmlzTW9iaWxlID0gdGhpcy5hY3Rpb25TZXJ2aWNlLmlzTW9iaWxlKCk7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNNb2JpbGUpIHRoaXMubWVudVR5cGUgPSAnTEVGVCc7XHJcbiAgICAgICAgdGhpcy5hZ2dyZWdhdG9yU2VydmljZS5zdWJzY3JpYmUoS2V5Q29uc3QuVmlld0ltYWdlLCAoaW1hZ2U6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmlzTW9kYWxTaG93ID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5tb2RhbEltYWdlU3JjID0gaW1hZ2Uuc3JjO1xyXG4gICAgICAgICAgICB0aGlzLmltYWdlQWx0VGV4dCA9IGltYWdlLmFsdFRleHQ7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMucm91dGUuZGF0YS5zdWJzY3JpYmUoZGF0YSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5tZW51VGFicykgdGhpcy5tZW51VGFicyA9IDxNZW51VGFiW10+ZGF0YS5tZW51VGFicztcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5tZW51VGFicyB8fCB0aGlzLm1lbnVUYWJzLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tZW51VGFicyA9IHRoaXMuY2FjaGVTZXJ2aWNlLmdldChLZXlDb25zdC5NZW51KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLm1lbnVUeXBlKSB0aGlzLm1lbnVUeXBlID0gPHN0cmluZz5kYXRhLm1lbnVUeXBlO1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEubG9nbykgdGhpcy5sb2dvID0gPHN0cmluZz5kYXRhLmxvZ287XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS50aXRsZSk8c3RyaW5nPmRhdGEudGl0bGU7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS51cmwpIHRoaXMudXJsID0gPHN0cmluZz5kYXRhLnVybDtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLmF1dGhVcmwpIHRoaXMuYXV0aFVybCA9IDxzdHJpbmc+ZGF0YS5hdXRoVXJsO1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuYnJlYWRjcnVtYikgdGhpcy5icmVhZGNydW1iID0gPEJyZWFkY3J1bWI+ZGF0YS5icmVhZGNydW1iO1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmJyZWFkY3J1bWIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJyZWFkY3J1bWIgPSBuZXcgQnJlYWRjcnVtYih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiAnSG9tZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogdGhpcy51cmxcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5icmVhZGNydW1iLnVybCA9IHRoaXMudXJsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucm91dGVyLnVybCA9PSAnLycpIHRoaXMucm91dGVyLm5hdmlnYXRlKFt0aGlzLnVybF0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmF1dGhlbnRpY2F0aW9uU2VydmljZS5jdXJyZW50VXNlcikgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW3RoaXMuYXV0aFVybF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucm91dGVyLmV2ZW50cy5zdWJzY3JpYmUoKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChldmVudCBpbnN0YW5jZW9mIE5hdmlnYXRpb25FbmQpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnJvdXRlci51cmwgPT0gJy8nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW3RoaXMudXJsXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRBY3RpdmUgPSAhdGhpcy5zZXRBY3RpdmU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xvc2VJbWFnZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmlzTW9kYWxTaG93ID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNoYW5nZU1lbnUoaXRlbXM6IEJyZWFkY3J1bWJbXSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuYnJlYWRjcnVtYnMgPSBpdGVtcztcclxuICAgICAgICB0aGlzLmJyZWFkY3J1bWJzLnNwbGljZSgwLCAwLCB0aGlzLmJyZWFkY3J1bWIpO1xyXG4gICAgICAgIHRoaXMuYWdncmVnYXRvclNlcnZpY2UucHVibGlzaChLZXlDb25zdC5NZW51Q2hhbmdlZCwgdGhpcy5icmVhZGNydW1icyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZWdpc3RlckV2ZW50cygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmFnZ3JlZ2F0b3JTZXJ2aWNlLnN1YnNjcmliZShLZXlDb25zdC5Mb2dnZWRJbiwgKHJlc3BvbnNlOiBBdXRoZW50aWNhdGlvbkxvZ2luUmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgaWYgKCFyZXNwb25zZSkgcmV0dXJuO1xyXG4gICAgICAgICAgICBpZiAocmVzcG9uc2UubWVudVRhYnMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubWVudVRhYnMgPSByZXNwb25zZS5tZW51VGFicztcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FjaGVTZXJ2aWNlLnNldChLZXlDb25zdC5NZW51LCB0aGlzLm1lbnVUYWJzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmF1dGhlbnRpY2F0aW9uU2VydmljZS5jdXJyZW50VXNlciA9IHJlc3BvbnNlLnVzZXI7XHJcbiAgICAgICAgICAgIHRoaXMud29ya3NwYWNlTGF5b3V0U2VydmljZS52ZXJ0aWNhbEVmZmVjdCA9IHRoaXMubWVudVR5cGUgPT0gJ0xFRlQnID8gJ292ZXJsYXknIDogJ3Nocmluayc7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9uU2VydmljZS5leGVjdXRlQXN5bmMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRBY3RpdmUgPSAhdGhpcy5zZXRBY3RpdmU7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==