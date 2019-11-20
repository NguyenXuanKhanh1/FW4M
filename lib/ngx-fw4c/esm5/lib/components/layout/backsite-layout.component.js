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
            _this.workspaceLayoutService.verticalEffect = 'overlay';
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
                    template: "<div class=\"pcoded\" [attr.nav-type]=\"workspaceLayoutService.navType\"\r\n  [attr.theme-layout]=\"workspaceLayoutService.themeLayout\" [attr.layout-type]=\"workspaceLayoutService.layoutType\"\r\n  [attr.vertical-placement]=\"workspaceLayoutService.verticalPlacement\"\r\n  [attr.vertical-layout]=\"workspaceLayoutService.verticalLayout\"\r\n  [attr.pcoded-device-type]=\"workspaceLayoutService.deviceType\"\r\n  [attr.vertical-nav-type]=\"workspaceLayoutService.verticalNavType\"\r\n  [attr.vertical-effect]=\"authenticationService.currentUser ? workspaceLayoutService.verticalEffect: 'shink'\"\r\n  [attr.vnavigation-view]=\"workspaceLayoutService.vNavigationView\"\r\n  (window:resize)=\"workspaceLayoutService.onResize($event)\">\r\n  <div class=\"pcoded-overlay-box\"></div>\r\n  <div class=\"img-viewer-container\">\r\n    <div (click)=\"closeImage()\" [class.show-now]=\"isModalShow\" class=\"modal\">\r\n      <div class=\"view-wrapper modal-content\">\r\n        <div class=\"adv-popup\">\r\n          <img *ngIf=\"modalImageSrc\" [src]=\"modalImageSrc\">\r\n          <button class=\"btn-close-image\"><i class=\"fa fa-close-line\"></i></button>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"pcoded-container navbar-wrapper\">\r\n    <default-header [notifications]=\"notifications\" [logo]=\"logo\" [title]=\"title\"></default-header>\r\n    <div class=\"pcoded-main-container\" [style.margin-top]=\"workspaceLayoutService.headerFixedMargin\">\r\n      <div class=\"pcoded-wrapper\">\r\n        <default-sidebar *ngIf=\"menuTabs && authenticationService?.currentUser\" [setActive]=\"setActive\" (change)=\"changeMenu($event)\" [menuTabs]=\"menuTabs\"></default-sidebar>\r\n        <div class=\"pcoded-content\">\r\n          <div class=\"pcoded-inner-content\">\r\n            <default-navbar *ngIf=\"authenticationService?.currentUser\" [url]=\"url\" [breadcrumb]=\"breadcrumb\" [menuTabs]=\"menuTabs\" [items]=\"breadcrumbs\">\r\n            </default-navbar>\r\n            <div class=\"main-body\">\r\n              <div class=\"page-wrapper\">\r\n                <div class=\"page-body\">\r\n                  <katana-card>\r\n                    <router-outlet>\r\n                      <katana-spinner></katana-spinner>\r\n                    </router-outlet>\r\n                  </katana-card>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <default-toolbar></default-toolbar>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <default-footer></default-footer>\r\n  </div>\r\n</div>"
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja3NpdGUtbGF5b3V0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1mdzRjLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvbGF5b3V0L2JhY2tzaXRlLWxheW91dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQXlCLE1BQU0sZUFBZSxDQUFDO0FBQ2pFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3hFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUV6RCxPQUFPLEVBQVcsVUFBVSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRTdELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUVoRTtJQWtCSSw4QkFDVyxzQkFBNEMsRUFDNUMsS0FBcUIsRUFDckIscUJBQTRDLEVBQ3pDLE1BQWMsRUFDZCxhQUE0QixFQUM1QixpQkFBb0MsRUFDcEMsWUFBMEI7UUFON0IsMkJBQXNCLEdBQXRCLHNCQUFzQixDQUFzQjtRQUM1QyxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUNyQiwwQkFBcUIsR0FBckIscUJBQXFCLENBQXVCO1FBQ3pDLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ3BDLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBcEJqQyxrQkFBYSxHQUF5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SUFBSSxFQUFFLEtBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUN2RDtZQUNELEtBQUksQ0FBQyxxQkFBcUIsQ0FBQyxXQUFXLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQztZQUN2RCxLQUFJLENBQUMsc0JBQXNCLENBQUMsY0FBYyxHQUFHLFNBQVMsQ0FBQztZQUN2RCxLQUFJLENBQUMsYUFBYSxDQUFDLFlBQVk7OztZQUFDO2dCQUM1QixLQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsS0FBSSxDQUFDLFNBQVMsQ0FBQztZQUNyQyxDQUFDLEVBQUMsQ0FBQztRQUNQLENBQUMsRUFBQyxDQUFDO0lBQ1AsQ0FBQzs7Z0JBaEdKLFNBQVMsU0FBQztvQkFDUCxvakZBQStDO2lCQUNsRDs7OztnQkFiUSxvQkFBb0I7Z0JBQ3BCLGNBQWM7Z0JBTWQscUJBQXFCO2dCQU5MLE1BQU07Z0JBS3RCLGFBQWE7Z0JBSmIsaUJBQWlCO2dCQU9qQixZQUFZOztJQW1HckIsMkJBQUM7Q0FBQSxBQWpHRCxJQWlHQztTQTdGWSxvQkFBb0I7OztJQUM3Qiw2Q0FBZ0Q7O0lBQ2hELG9DQUF1Rjs7SUFDdkYscUNBQTBFOztJQUMxRSx3Q0FBMkI7O0lBQzNCLDJDQUFvQzs7SUFDcEMsNkNBQWtDOztJQUNsQyw0Q0FBaUM7O0lBQ2pDLDJDQUFzQzs7SUFDdEMsMENBQThCOztJQUM5QixtQ0FBa0M7O0lBQ2xDLHVDQUFpQzs7SUFDakMseUNBQWtDOztJQUc5QixzREFBbUQ7O0lBQ25ELHFDQUE0Qjs7SUFDNUIscURBQW1EOzs7OztJQUNuRCxzQ0FBd0I7Ozs7O0lBQ3hCLDZDQUFzQzs7Ozs7SUFDdEMsaURBQThDOzs7OztJQUM5Qyw0Q0FBb0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IERlZmF1bHRMYXlvdXRTZXJ2aWNlIH0gZnJvbSAnLi9sYXlvdXQuc2VydmljZSc7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBSb3V0ZXIsIE5hdmlnYXRpb25FbmQgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBBZ2dyZWdhdG9yU2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9zZXJ2aWNlcy9hZ2dyZWdhdG9yLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBLZXlDb25zdCB9IGZyb20gJy4uL3NoYXJlZC9jb25zdGFudHMva2V5LmNvbnN0JztcclxuaW1wb3J0IHsgTm90aWZpY2F0aW9uRGV0YWlsIH0gZnJvbSAnLi4vc2hhcmVkL21vZGVscy9ub3RpZmljYXRpb24ubW9kZWwnO1xyXG5pbXBvcnQgeyBNZW51VGFiLCBCcmVhZGNydW1iIH0gZnJvbSAnLi4vc2hhcmVkL21vZGVscy9iYXNlLm1vZGVsJztcclxuaW1wb3J0IHsgQWN0aW9uU2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9zZXJ2aWNlcy9hY3Rpb24uc2VydmljZSc7XHJcbmltcG9ydCB7IEF1dGhlbnRpY2F0aW9uU2VydmljZSB9IGZyb20gJy4uL2F1dGgvYXV0aC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQXV0aGVudGljYXRpb25Mb2dpblJlc3BvbnNlIH0gZnJvbSAnLi4vYXV0aC9hdXRoLm1vZGVsJztcclxuaW1wb3J0IHsgQ2FjaGVTZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL3NlcnZpY2VzL2NhY2hlLnNlcnZpY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICB0ZW1wbGF0ZVVybDogJy4vYmFja3NpdGUtbGF5b3V0LmNvbXBvbmVudC5odG1sJyxcclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBBZG1pbkxheW91dENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCB7XHJcbiAgICBwdWJsaWMgbm90aWZpY2F0aW9uczogTm90aWZpY2F0aW9uRGV0YWlsW10gPSBbXTtcclxuICAgIHB1YmxpYyBsb2dvOiBzdHJpbmcgPSAnaHR0cHM6Ly9jbWNnbG9iYWwuY29tLnZuL2Nzcy9pbWFnZS1jb21tb24vQ29tYmluZWQlMjBTaGFwZS5zdmcnO1xyXG4gICAgcHVibGljIHRpdGxlOiBzdHJpbmcgPSAnQ01DIEdsb2JhbCAtIEFzcGlyZSB0byBpbnNwaXJlIHRoZSBEaWdpdGFsIFdvcmxkJzs7XHJcbiAgICBwdWJsaWMgbWVudVRhYnM6IE1lbnVUYWJbXTtcclxuICAgIHB1YmxpYyBpc01vZGFsU2hvdzogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHVibGljIG1vZGFsSW1hZ2VTcmM6IHN0cmluZyA9ICcnO1xyXG4gICAgcHVibGljIGltYWdlQWx0VGV4dDogc3RyaW5nID0gJyc7XHJcbiAgICBwdWJsaWMgYnJlYWRjcnVtYnM6IEJyZWFkY3J1bWJbXSA9IFtdO1xyXG4gICAgcHVibGljIGJyZWFkY3J1bWI6IEJyZWFkY3J1bWI7XHJcbiAgICBwdWJsaWMgdXJsOiBzdHJpbmcgPSAnL2Rhc2hib2FyZCc7XHJcbiAgICBwdWJsaWMgYXV0aFVybDogc3RyaW5nID0gJy9hdXRoJztcclxuICAgIHB1YmxpYyBzZXRBY3RpdmU6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwdWJsaWMgd29ya3NwYWNlTGF5b3V0U2VydmljZTogRGVmYXVsdExheW91dFNlcnZpY2UsXHJcbiAgICAgICAgcHVibGljIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcclxuICAgICAgICBwdWJsaWMgYXV0aGVudGljYXRpb25TZXJ2aWNlOiBBdXRoZW50aWNhdGlvblNlcnZpY2UsXHJcbiAgICAgICAgcHJvdGVjdGVkIHJvdXRlcjogUm91dGVyLFxyXG4gICAgICAgIHByb3RlY3RlZCBhY3Rpb25TZXJ2aWNlOiBBY3Rpb25TZXJ2aWNlLFxyXG4gICAgICAgIHByb3RlY3RlZCBhZ2dyZWdhdG9yU2VydmljZTogQWdncmVnYXRvclNlcnZpY2UsXHJcbiAgICAgICAgcHJvdGVjdGVkIGNhY2hlU2VydmljZTogQ2FjaGVTZXJ2aWNlXHJcbiAgICApIHtcclxuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnRzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5hZ2dyZWdhdG9yU2VydmljZS5zdWJzY3JpYmUoS2V5Q29uc3QuVmlld0ltYWdlLCAoaW1hZ2U6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmlzTW9kYWxTaG93ID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5tb2RhbEltYWdlU3JjID0gaW1hZ2Uuc3JjO1xyXG4gICAgICAgICAgICB0aGlzLmltYWdlQWx0VGV4dCA9IGltYWdlLmFsdFRleHQ7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMucm91dGUuZGF0YS5zdWJzY3JpYmUoZGF0YSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5tZW51VGFicykgdGhpcy5tZW51VGFicyA9IDxNZW51VGFiW10+ZGF0YS5tZW51VGFicztcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5tZW51VGFicyB8fCB0aGlzLm1lbnVUYWJzLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tZW51VGFicyA9IHRoaXMuY2FjaGVTZXJ2aWNlLmdldChLZXlDb25zdC5NZW51KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLmxvZ28pIHRoaXMubG9nbyA9IDxzdHJpbmc+ZGF0YS5sb2dvO1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEudGl0bGUpPHN0cmluZz5kYXRhLnRpdGxlO1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEudXJsKSB0aGlzLnVybCA9IDxzdHJpbmc+ZGF0YS51cmw7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5hdXRoVXJsKSB0aGlzLmF1dGhVcmwgPSA8c3RyaW5nPmRhdGEuYXV0aFVybDtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLmJyZWFkY3J1bWIpIHRoaXMuYnJlYWRjcnVtYiA9IDxCcmVhZGNydW1iPmRhdGEuYnJlYWRjcnVtYjtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5icmVhZGNydW1iKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5icmVhZGNydW1iID0gbmV3IEJyZWFkY3J1bWIoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogJ0hvbWUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6IHRoaXMudXJsXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnJlYWRjcnVtYi51cmwgPSB0aGlzLnVybDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnJvdXRlci51cmwgPT0gJy8nKSB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbdGhpcy51cmxdKTtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5hdXRoZW50aWNhdGlvblNlcnZpY2UuY3VycmVudFVzZXIpIHRoaXMucm91dGVyLm5hdmlnYXRlKFt0aGlzLmF1dGhVcmxdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnJvdXRlci5ldmVudHMuc3Vic2NyaWJlKChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZXZlbnQgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRW5kKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5yb3V0ZXIudXJsID09ICcvJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFt0aGlzLnVybF0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0QWN0aXZlID0gIXRoaXMuc2V0QWN0aXZlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsb3NlSW1hZ2UoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5pc01vZGFsU2hvdyA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjaGFuZ2VNZW51KGl0ZW1zOiBCcmVhZGNydW1iW10pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmJyZWFkY3J1bWJzID0gaXRlbXM7XHJcbiAgICAgICAgdGhpcy5icmVhZGNydW1icy5zcGxpY2UoMCwgMCwgdGhpcy5icmVhZGNydW1iKTtcclxuICAgICAgICB0aGlzLmFnZ3JlZ2F0b3JTZXJ2aWNlLnB1Ymxpc2goS2V5Q29uc3QuTWVudUNoYW5nZWQsIHRoaXMuYnJlYWRjcnVtYnMpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVnaXN0ZXJFdmVudHMoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5hZ2dyZWdhdG9yU2VydmljZS5zdWJzY3JpYmUoS2V5Q29uc3QuTG9nZ2VkSW4sIChyZXNwb25zZTogQXV0aGVudGljYXRpb25Mb2dpblJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghcmVzcG9uc2UpIHJldHVybjtcclxuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLm1lbnVUYWJzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1lbnVUYWJzID0gcmVzcG9uc2UubWVudVRhYnM7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhY2hlU2VydmljZS5zZXQoS2V5Q29uc3QuTWVudSwgdGhpcy5tZW51VGFicyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5hdXRoZW50aWNhdGlvblNlcnZpY2UuY3VycmVudFVzZXIgPSByZXNwb25zZS51c2VyO1xyXG4gICAgICAgICAgICB0aGlzLndvcmtzcGFjZUxheW91dFNlcnZpY2UudmVydGljYWxFZmZlY3QgPSAnb3ZlcmxheSc7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9uU2VydmljZS5leGVjdXRlQXN5bmMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRBY3RpdmUgPSAhdGhpcy5zZXRBY3RpdmU7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==