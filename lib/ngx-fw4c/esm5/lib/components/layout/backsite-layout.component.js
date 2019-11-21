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
                    template: "<div class=\"pcoded\" [attr.nav-type]=\"workspaceLayoutService.navType\"\r\n  [attr.theme-layout]=\"workspaceLayoutService.themeLayout\" [attr.layout-type]=\"workspaceLayoutService.layoutType\"\r\n  [attr.vertical-placement]=\"workspaceLayoutService.verticalPlacement\"\r\n  [attr.vertical-layout]=\"workspaceLayoutService.verticalLayout\"\r\n  [attr.pcoded-device-type]=\"workspaceLayoutService.deviceType\"\r\n  [attr.vertical-nav-type]=\"workspaceLayoutService.verticalNavType\"\r\n  [attr.vertical-effect]=\"authenticationService.currentUser ? workspaceLayoutService.verticalEffect: 'shink'\"\r\n  [attr.vnavigation-view]=\"workspaceLayoutService.vNavigationView\"\r\n  (window:resize)=\"workspaceLayoutService.onResize($event)\">\r\n  <div class=\"pcoded-overlay-box\"></div>\r\n  <div class=\"img-viewer-container\">\r\n    <div (click)=\"closeImage()\" [class.show-now]=\"isModalShow\" class=\"modal\">\r\n      <div class=\"view-wrapper modal-content\">\r\n        <div class=\"adv-popup\">\r\n          <img *ngIf=\"modalImageSrc\" [src]=\"modalImageSrc\">\r\n          <button class=\"btn-close-image\"><i class=\"fa fa-close-line\"></i></button>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"pcoded-container navbar-wrapper\">\r\n    <default-header [menuType]=\"menuType\" [menuTabs]=\"menuTabs\" [notifications]=\"notifications\" [logo]=\"logo\"\r\n      [title]=\"title\"></default-header>\r\n    <div class=\"pcoded-main-container\" [style.margin-top]=\"workspaceLayoutService.headerFixedMargin\">\r\n      <div class=\"pcoded-wrapper\">\r\n        <default-sidebar *ngIf=\"menuTabs && authenticationService?.currentUser && (menuType == 'LEFT' || isMobile)\"\r\n          [setActive]=\"setActive\" (change)=\"changeMenu($event)\" [menuTabs]=\"menuTabs\"></default-sidebar>\r\n        <div class=\"pcoded-content\" [ngClass]=\"{'content-left': menuType == 'TOP'}\">\r\n          <div class=\"pcoded-inner-content\">\r\n            <default-navbar *ngIf=\"authenticationService?.currentUser && menuType != 'TOP'\" [url]=\"url\"\r\n              [breadcrumb]=\"breadcrumb\" [menuTabs]=\"menuTabs\" [items]=\"breadcrumbs\">\r\n            </default-navbar>\r\n            <div class=\"main-body\" [ngClass]=\"{'main-top': menuType == 'TOP'}\">\r\n              <div class=\"page-wrapper\">\r\n                <div class=\"page-body\">\r\n                  <katana-card>\r\n                    <router-outlet>\r\n                      <katana-spinner></katana-spinner>\r\n                    </router-outlet>\r\n                  </katana-card>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <default-toolbar></default-toolbar>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <default-footer></default-footer>\r\n  </div>\r\n</div>",
                    styles: [".main-top{margin-top:30px}.content-left{margin-left:0!important}"]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja3NpdGUtbGF5b3V0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1mdzRjLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvbGF5b3V0L2JhY2tzaXRlLWxheW91dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQXlCLE1BQU0sZUFBZSxDQUFDO0FBQ2pFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3hFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUV6RCxPQUFPLEVBQVcsVUFBVSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRTdELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUVoRTtJQXFCSSw4QkFDVyxzQkFBNEMsRUFDNUMsS0FBcUIsRUFDckIscUJBQTRDLEVBQ3pDLE1BQWMsRUFDZCxhQUE0QixFQUM1QixpQkFBb0MsRUFDcEMsWUFBMEI7UUFON0IsMkJBQXNCLEdBQXRCLHNCQUFzQixDQUFzQjtRQUM1QyxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUNyQiwwQkFBcUIsR0FBckIscUJBQXFCLENBQXVCO1FBQ3pDLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ3BDLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBdEJqQyxrQkFBYSxHQUF5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dUNBQWlDOztJQUNqQyx5Q0FBa0M7O0lBQ2xDLHdDQUFnQzs7SUFDaEMsd0NBQXlCOztJQUdyQixzREFBbUQ7O0lBQ25ELHFDQUE0Qjs7SUFDNUIscURBQW1EOzs7OztJQUNuRCxzQ0FBd0I7Ozs7O0lBQ3hCLDZDQUFzQzs7Ozs7SUFDdEMsaURBQThDOzs7OztJQUM5Qyw0Q0FBb0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IERlZmF1bHRMYXlvdXRTZXJ2aWNlIH0gZnJvbSAnLi9sYXlvdXQuc2VydmljZSc7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBSb3V0ZXIsIE5hdmlnYXRpb25FbmQgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBBZ2dyZWdhdG9yU2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9zZXJ2aWNlcy9hZ2dyZWdhdG9yLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBLZXlDb25zdCB9IGZyb20gJy4uL3NoYXJlZC9jb25zdGFudHMva2V5LmNvbnN0JztcclxuaW1wb3J0IHsgTm90aWZpY2F0aW9uRGV0YWlsIH0gZnJvbSAnLi4vc2hhcmVkL21vZGVscy9ub3RpZmljYXRpb24ubW9kZWwnO1xyXG5pbXBvcnQgeyBNZW51VGFiLCBCcmVhZGNydW1iIH0gZnJvbSAnLi4vc2hhcmVkL21vZGVscy9iYXNlLm1vZGVsJztcclxuaW1wb3J0IHsgQWN0aW9uU2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9zZXJ2aWNlcy9hY3Rpb24uc2VydmljZSc7XHJcbmltcG9ydCB7IEF1dGhlbnRpY2F0aW9uU2VydmljZSB9IGZyb20gJy4uL2F1dGgvYXV0aC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQXV0aGVudGljYXRpb25Mb2dpblJlc3BvbnNlIH0gZnJvbSAnLi4vYXV0aC9hdXRoLm1vZGVsJztcclxuaW1wb3J0IHsgQ2FjaGVTZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL3NlcnZpY2VzL2NhY2hlLnNlcnZpY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICB0ZW1wbGF0ZVVybDogJy4vYmFja3NpdGUtbGF5b3V0LmNvbXBvbmVudC5odG1sJyxcclxuICAgIHN0eWxlVXJsczpbJy4vYmFja3NpdGUtbGF5b3V0LmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBBZG1pbkxheW91dENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCB7XHJcbiAgICBwdWJsaWMgbm90aWZpY2F0aW9uczogTm90aWZpY2F0aW9uRGV0YWlsW10gPSBbXTtcclxuICAgIHB1YmxpYyBsb2dvOiBzdHJpbmcgPSAnaHR0cHM6Ly9jbWNnbG9iYWwuY29tLnZuL2Nzcy9pbWFnZS1jb21tb24vQ29tYmluZWQlMjBTaGFwZS5zdmcnO1xyXG4gICAgcHVibGljIHRpdGxlOiBzdHJpbmcgPSAnQ01DIEdsb2JhbCAtIEFzcGlyZSB0byBpbnNwaXJlIHRoZSBEaWdpdGFsIFdvcmxkJzs7XHJcbiAgICBwdWJsaWMgbWVudVRhYnM6IE1lbnVUYWJbXTtcclxuICAgIHB1YmxpYyBpc01vZGFsU2hvdzogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHVibGljIG1vZGFsSW1hZ2VTcmM6IHN0cmluZyA9ICcnO1xyXG4gICAgcHVibGljIGltYWdlQWx0VGV4dDogc3RyaW5nID0gJyc7XHJcbiAgICBwdWJsaWMgYnJlYWRjcnVtYnM6IEJyZWFkY3J1bWJbXSA9IFtdO1xyXG4gICAgcHVibGljIGJyZWFkY3J1bWI6IEJyZWFkY3J1bWI7XHJcbiAgICBwdWJsaWMgdXJsOiBzdHJpbmcgPSAnL2Rhc2hib2FyZCc7XHJcbiAgICBwdWJsaWMgYXV0aFVybDogc3RyaW5nID0gJy9hdXRoJztcclxuICAgIHB1YmxpYyBzZXRBY3RpdmU6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHB1YmxpYyBtZW51VHlwZTogc3RyaW5nID0gJ1RPUCc7XHJcbiAgICBwdWJsaWMgaXNNb2JpbGU6IGJvb2xlYW47XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHVibGljIHdvcmtzcGFjZUxheW91dFNlcnZpY2U6IERlZmF1bHRMYXlvdXRTZXJ2aWNlLFxyXG4gICAgICAgIHB1YmxpYyByb3V0ZTogQWN0aXZhdGVkUm91dGUsXHJcbiAgICAgICAgcHVibGljIGF1dGhlbnRpY2F0aW9uU2VydmljZTogQXV0aGVudGljYXRpb25TZXJ2aWNlLFxyXG4gICAgICAgIHByb3RlY3RlZCByb3V0ZXI6IFJvdXRlcixcclxuICAgICAgICBwcm90ZWN0ZWQgYWN0aW9uU2VydmljZTogQWN0aW9uU2VydmljZSxcclxuICAgICAgICBwcm90ZWN0ZWQgYWdncmVnYXRvclNlcnZpY2U6IEFnZ3JlZ2F0b3JTZXJ2aWNlLFxyXG4gICAgICAgIHByb3RlY3RlZCBjYWNoZVNlcnZpY2U6IENhY2hlU2VydmljZVxyXG4gICAgKSB7XHJcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50cygpO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaXNNb2JpbGUgPSB0aGlzLmFjdGlvblNlcnZpY2UuaXNNb2JpbGUoKTtcclxuICAgICAgICBpZiAodGhpcy5pc01vYmlsZSkgdGhpcy5tZW51VHlwZSA9ICdMRUZUJztcclxuICAgICAgICB0aGlzLmFnZ3JlZ2F0b3JTZXJ2aWNlLnN1YnNjcmliZShLZXlDb25zdC5WaWV3SW1hZ2UsIChpbWFnZTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNNb2RhbFNob3cgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLm1vZGFsSW1hZ2VTcmMgPSBpbWFnZS5zcmM7XHJcbiAgICAgICAgICAgIHRoaXMuaW1hZ2VBbHRUZXh0ID0gaW1hZ2UuYWx0VGV4dDtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5yb3V0ZS5kYXRhLnN1YnNjcmliZShkYXRhID0+IHtcclxuICAgICAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLm1lbnVUYWJzKSB0aGlzLm1lbnVUYWJzID0gPE1lbnVUYWJbXT5kYXRhLm1lbnVUYWJzO1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLm1lbnVUYWJzIHx8IHRoaXMubWVudVRhYnMubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1lbnVUYWJzID0gdGhpcy5jYWNoZVNlcnZpY2UuZ2V0KEtleUNvbnN0Lk1lbnUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEubWVudVR5cGUpIHRoaXMubWVudVR5cGUgPSA8c3RyaW5nPmRhdGEubWVudVR5cGU7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5sb2dvKSB0aGlzLmxvZ28gPSA8c3RyaW5nPmRhdGEubG9nbztcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLnRpdGxlKTxzdHJpbmc+ZGF0YS50aXRsZTtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLnVybCkgdGhpcy51cmwgPSA8c3RyaW5nPmRhdGEudXJsO1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuYXV0aFVybCkgdGhpcy5hdXRoVXJsID0gPHN0cmluZz5kYXRhLmF1dGhVcmw7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5icmVhZGNydW1iKSB0aGlzLmJyZWFkY3J1bWIgPSA8QnJlYWRjcnVtYj5kYXRhLmJyZWFkY3J1bWI7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuYnJlYWRjcnVtYikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnJlYWRjcnVtYiA9IG5ldyBCcmVhZGNydW1iKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6ICdIb21lJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiB0aGlzLnVybFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJyZWFkY3J1bWIudXJsID0gdGhpcy51cmw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5yb3V0ZXIudXJsID09ICcvJykgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW3RoaXMudXJsXSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuYXV0aGVudGljYXRpb25TZXJ2aWNlLmN1cnJlbnRVc2VyKSB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbdGhpcy5hdXRoVXJsXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIuZXZlbnRzLnN1YnNjcmliZSgoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgaWYgKGV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvbkVuZCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucm91dGVyLnVybCA9PSAnLycpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbdGhpcy51cmxdKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEFjdGl2ZSA9ICF0aGlzLnNldEFjdGl2ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbG9zZUltYWdlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaXNNb2RhbFNob3cgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2hhbmdlTWVudShpdGVtczogQnJlYWRjcnVtYltdKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5icmVhZGNydW1icyA9IGl0ZW1zO1xyXG4gICAgICAgIHRoaXMuYnJlYWRjcnVtYnMuc3BsaWNlKDAsIDAsIHRoaXMuYnJlYWRjcnVtYik7XHJcbiAgICAgICAgdGhpcy5hZ2dyZWdhdG9yU2VydmljZS5wdWJsaXNoKEtleUNvbnN0Lk1lbnVDaGFuZ2VkLCB0aGlzLmJyZWFkY3J1bWJzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlZ2lzdGVyRXZlbnRzKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuYWdncmVnYXRvclNlcnZpY2Uuc3Vic2NyaWJlKEtleUNvbnN0LkxvZ2dlZEluLCAocmVzcG9uc2U6IEF1dGhlbnRpY2F0aW9uTG9naW5SZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIXJlc3BvbnNlKSByZXR1cm47XHJcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5tZW51VGFicykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tZW51VGFicyA9IHJlc3BvbnNlLm1lbnVUYWJzO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYWNoZVNlcnZpY2Uuc2V0KEtleUNvbnN0Lk1lbnUsIHRoaXMubWVudVRhYnMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuYXV0aGVudGljYXRpb25TZXJ2aWNlLmN1cnJlbnRVc2VyID0gcmVzcG9uc2UudXNlcjtcclxuICAgICAgICAgICAgdGhpcy53b3Jrc3BhY2VMYXlvdXRTZXJ2aWNlLnZlcnRpY2FsRWZmZWN0ID0gdGhpcy5tZW51VHlwZSA9PSAnTEVGVCcgPyAnb3ZlcmxheScgOiAnc2hyaW5rJztcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25TZXJ2aWNlLmV4ZWN1dGVBc3luYygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldEFjdGl2ZSA9ICF0aGlzLnNldEFjdGl2ZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuIl19