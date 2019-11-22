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
export class AdminLayoutComponent {
    /**
     * @param {?} workspaceLayoutService
     * @param {?} route
     * @param {?} authenticationService
     * @param {?} router
     * @param {?} actionService
     * @param {?} aggregatorService
     * @param {?} cacheService
     */
    constructor(workspaceLayoutService, route, authenticationService, router, actionService, aggregatorService, cacheService) {
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
    ngOnInit() {
        this.isMobile = this.actionService.isMobile();
        if (this.isMobile)
            this.menuType = 'LEFT';
        this.aggregatorService.subscribe(KeyConst.ViewImage, (/**
         * @param {?} image
         * @return {?}
         */
        (image) => {
            this.isModalShow = true;
            this.modalImageSrc = image.src;
            this.imageAltText = image.altText;
        }));
        this.route.data.subscribe((/**
         * @param {?} data
         * @return {?}
         */
        data => {
            if (data) {
                if (data.menuTabs)
                    this.menuTabs = (/** @type {?} */ (data.menuTabs));
                if (!this.menuTabs || this.menuTabs.length == 0) {
                    this.menuTabs = this.cacheService.get(KeyConst.Menu);
                }
                if (data.menuType)
                    this.menuType = (/** @type {?} */ (data.menuType));
                if (data.logo)
                    this.logo = (/** @type {?} */ (data.logo));
                if (data.title)
                    (/** @type {?} */ (data.title));
                if (data.url)
                    this.url = (/** @type {?} */ (data.url));
                if (data.authUrl)
                    this.authUrl = (/** @type {?} */ (data.authUrl));
                if (data.breadcrumb)
                    this.breadcrumb = (/** @type {?} */ (data.breadcrumb));
                if (!this.breadcrumb) {
                    this.breadcrumb = new Breadcrumb({
                        label: 'Home',
                        url: this.url
                    });
                }
                else {
                    this.breadcrumb.url = this.url;
                }
                if (this.router.url == '/')
                    this.router.navigate([this.url]);
                if (!this.authenticationService.currentUser)
                    this.router.navigate([this.authUrl]);
            }
        }));
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.router.events.subscribe((/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            if (event instanceof NavigationEnd) {
                if (this.router.url == '/') {
                    this.router.navigate([this.url]);
                    this.setActive = !this.setActive;
                }
            }
        }));
    }
    /**
     * @return {?}
     */
    closeImage() {
        this.isModalShow = false;
    }
    /**
     * @param {?} items
     * @return {?}
     */
    changeMenu(items) {
        this.breadcrumbs = items;
        this.breadcrumbs.splice(0, 0, this.breadcrumb);
        this.aggregatorService.publish(KeyConst.MenuChanged, this.breadcrumbs);
    }
    /**
     * @private
     * @return {?}
     */
    registerEvents() {
        this.aggregatorService.subscribe(KeyConst.LoggedIn, (/**
         * @param {?} response
         * @return {?}
         */
        (response) => {
            if (!response)
                return;
            if (response.menuTabs) {
                this.menuTabs = response.menuTabs;
                this.cacheService.set(KeyConst.Menu, this.menuTabs);
            }
            this.authenticationService.currentUser = response.user;
            this.workspaceLayoutService.verticalEffect = this.menuType == 'LEFT' ? 'overlay' : 'shrink';
            this.actionService.executeAsync((/**
             * @return {?}
             */
            () => {
                this.setActive = !this.setActive;
            }));
        }));
    }
}
AdminLayoutComponent.decorators = [
    { type: Component, args: [{
                template: "<div class=\"pcoded\" [attr.nav-type]=\"workspaceLayoutService.navType\"\r\n  [attr.theme-layout]=\"workspaceLayoutService.themeLayout\" [attr.layout-type]=\"workspaceLayoutService.layoutType\"\r\n  [attr.vertical-placement]=\"workspaceLayoutService.verticalPlacement\"\r\n  [attr.vertical-layout]=\"workspaceLayoutService.verticalLayout\"\r\n  [attr.pcoded-device-type]=\"workspaceLayoutService.deviceType\"\r\n  [attr.vertical-nav-type]=\"workspaceLayoutService.verticalNavType\"\r\n  [attr.vertical-effect]=\"authenticationService.currentUser ? workspaceLayoutService.verticalEffect: 'shink'\"\r\n  [attr.vnavigation-view]=\"workspaceLayoutService.vNavigationView\"\r\n  (window:resize)=\"workspaceLayoutService.onResize($event)\">\r\n  <div class=\"pcoded-overlay-box\"></div>\r\n  <div class=\"img-viewer-container\">\r\n    <div (click)=\"closeImage()\" [class.show-now]=\"isModalShow\" class=\"modal\">\r\n      <div class=\"view-wrapper modal-content\">\r\n        <div class=\"adv-popup\">\r\n          <img *ngIf=\"modalImageSrc\" [src]=\"modalImageSrc\">\r\n          <button class=\"btn-close-image\"><i class=\"fa fa-close-line\"></i></button>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"pcoded-container navbar-wrapper\">\r\n    <default-header [menuType]=\"menuType\" [menuTabs]=\"menuTabs\" [notifications]=\"notifications\" [logo]=\"logo\"\r\n      [title]=\"title\"></default-header>\r\n    <div class=\"pcoded-main-container\" [style.margin-top]=\"workspaceLayoutService.headerFixedMargin\">\r\n      <div class=\"pcoded-wrapper\">\r\n        <default-sidebar *ngIf=\"menuTabs && authenticationService?.currentUser && (menuType == 'LEFT' || isMobile)\"\r\n          [setActive]=\"setActive\" (change)=\"changeMenu($event)\" [menuTabs]=\"menuTabs\"></default-sidebar>\r\n        <div class=\"pcoded-content\" [ngClass]=\"{'content-left': menuType == 'TOP'}\">\r\n          <div class=\"pcoded-inner-content\">\r\n            <default-navbar *ngIf=\"authenticationService?.currentUser && menuType != 'TOP'\" [url]=\"url\"\r\n              [breadcrumb]=\"breadcrumb\" [menuTabs]=\"menuTabs\" [items]=\"breadcrumbs\">\r\n            </default-navbar>\r\n            <div class=\"main-body\" [ngClass]=\"{'main-top': menuType == 'TOP'}\">\r\n              <div class=\"page-wrapper\">\r\n                <div class=\"page-body\">\r\n                  <katana-card>\r\n                    <router-outlet>\r\n                      <katana-spinner></katana-spinner>\r\n                    </router-outlet>\r\n                  </katana-card>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <default-toolbar></default-toolbar>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <default-footer></default-footer>\r\n  </div>\r\n</div>",
                styles: [".main-top{margin-top:30px}.content-left{margin-left:0!important}"]
            }] }
];
/** @nocollapse */
AdminLayoutComponent.ctorParameters = () => [
    { type: DefaultLayoutService },
    { type: ActivatedRoute },
    { type: AuthenticationService },
    { type: Router },
    { type: ActionService },
    { type: AggregatorService },
    { type: CacheService }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja3NpdGUtbGF5b3V0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1mdzRjLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvbGF5b3V0L2JhY2tzaXRlLWxheW91dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQXlCLE1BQU0sZUFBZSxDQUFDO0FBQ2pFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3hFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUV6RCxPQUFPLEVBQVcsVUFBVSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRTdELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQU9oRSxNQUFNLE9BQU8sb0JBQW9COzs7Ozs7Ozs7O0lBZ0I3QixZQUNXLHNCQUE0QyxFQUM1QyxLQUFxQixFQUNyQixxQkFBNEMsRUFDekMsTUFBYyxFQUNkLGFBQTRCLEVBQzVCLGlCQUFvQyxFQUNwQyxZQUEwQjtRQU43QiwyQkFBc0IsR0FBdEIsc0JBQXNCLENBQXNCO1FBQzVDLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQ3JCLDBCQUFxQixHQUFyQixxQkFBcUIsQ0FBdUI7UUFDekMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzVCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDcEMsaUJBQVksR0FBWixZ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bUQ7O0lBQ25ELHFDQUE0Qjs7SUFDNUIscURBQW1EOzs7OztJQUNuRCxzQ0FBd0I7Ozs7O0lBQ3hCLDZDQUFzQzs7Ozs7SUFDdEMsaURBQThDOzs7OztJQUM5Qyw0Q0FBb0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IERlZmF1bHRMYXlvdXRTZXJ2aWNlIH0gZnJvbSAnLi9sYXlvdXQuc2VydmljZSc7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBSb3V0ZXIsIE5hdmlnYXRpb25FbmQgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBBZ2dyZWdhdG9yU2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9zZXJ2aWNlcy9hZ2dyZWdhdG9yLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBLZXlDb25zdCB9IGZyb20gJy4uL3NoYXJlZC9jb25zdGFudHMva2V5LmNvbnN0JztcclxuaW1wb3J0IHsgTm90aWZpY2F0aW9uRGV0YWlsIH0gZnJvbSAnLi4vc2hhcmVkL21vZGVscy9ub3RpZmljYXRpb24ubW9kZWwnO1xyXG5pbXBvcnQgeyBNZW51VGFiLCBCcmVhZGNydW1iIH0gZnJvbSAnLi4vc2hhcmVkL21vZGVscy9iYXNlLm1vZGVsJztcclxuaW1wb3J0IHsgQWN0aW9uU2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9zZXJ2aWNlcy9hY3Rpb24uc2VydmljZSc7XHJcbmltcG9ydCB7IEF1dGhlbnRpY2F0aW9uU2VydmljZSB9IGZyb20gJy4uL2F1dGgvYXV0aC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQXV0aGVudGljYXRpb25Mb2dpblJlc3BvbnNlIH0gZnJvbSAnLi4vYXV0aC9hdXRoLm1vZGVsJztcclxuaW1wb3J0IHsgQ2FjaGVTZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL3NlcnZpY2VzL2NhY2hlLnNlcnZpY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICB0ZW1wbGF0ZVVybDogJy4vYmFja3NpdGUtbGF5b3V0LmNvbXBvbmVudC5odG1sJyxcclxuICAgIHN0eWxlVXJsczpbJy4vYmFja3NpdGUtbGF5b3V0LmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBBZG1pbkxheW91dENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCB7XHJcbiAgICBwdWJsaWMgbm90aWZpY2F0aW9uczogTm90aWZpY2F0aW9uRGV0YWlsW10gPSBbXTtcclxuICAgIHB1YmxpYyBsb2dvOiBzdHJpbmcgPSAnaHR0cHM6Ly9jbWNnbG9iYWwuY29tLnZuL2Nzcy9pbWFnZS1jb21tb24vQ29tYmluZWQlMjBTaGFwZS5zdmcnO1xyXG4gICAgcHVibGljIHRpdGxlOiBzdHJpbmcgPSAnQ01DIEdsb2JhbCAtIEFzcGlyZSB0byBpbnNwaXJlIHRoZSBEaWdpdGFsIFdvcmxkJzs7XHJcbiAgICBwdWJsaWMgbWVudVRhYnM6IE1lbnVUYWJbXTtcclxuICAgIHB1YmxpYyBpc01vZGFsU2hvdzogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHVibGljIG1vZGFsSW1hZ2VTcmM6IHN0cmluZyA9ICcnO1xyXG4gICAgcHVibGljIGltYWdlQWx0VGV4dDogc3RyaW5nID0gJyc7XHJcbiAgICBwdWJsaWMgYnJlYWRjcnVtYnM6IEJyZWFkY3J1bWJbXSA9IFtdO1xyXG4gICAgcHVibGljIGJyZWFkY3J1bWI6IEJyZWFkY3J1bWI7XHJcbiAgICBwdWJsaWMgdXJsOiBzdHJpbmcgPSAnL2Rhc2hib2FyZCc7XHJcbiAgICBwdWJsaWMgYXV0aFVybDogc3RyaW5nID0gJy9hdXRoJztcclxuICAgIHB1YmxpYyBzZXRBY3RpdmU6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHB1YmxpYyBtZW51VHlwZTogc3RyaW5nID0gJ1RPUCc7XHJcbiAgICBwdWJsaWMgaXNNb2JpbGU6IGJvb2xlYW47XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHVibGljIHdvcmtzcGFjZUxheW91dFNlcnZpY2U6IERlZmF1bHRMYXlvdXRTZXJ2aWNlLFxyXG4gICAgICAgIHB1YmxpYyByb3V0ZTogQWN0aXZhdGVkUm91dGUsXHJcbiAgICAgICAgcHVibGljIGF1dGhlbnRpY2F0aW9uU2VydmljZTogQXV0aGVudGljYXRpb25TZXJ2aWNlLFxyXG4gICAgICAgIHByb3RlY3RlZCByb3V0ZXI6IFJvdXRlcixcclxuICAgICAgICBwcm90ZWN0ZWQgYWN0aW9uU2VydmljZTogQWN0aW9uU2VydmljZSxcclxuICAgICAgICBwcm90ZWN0ZWQgYWdncmVnYXRvclNlcnZpY2U6IEFnZ3JlZ2F0b3JTZXJ2aWNlLFxyXG4gICAgICAgIHByb3RlY3RlZCBjYWNoZVNlcnZpY2U6IENhY2hlU2VydmljZVxyXG4gICAgKSB7XHJcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50cygpO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaXNNb2JpbGUgPSB0aGlzLmFjdGlvblNlcnZpY2UuaXNNb2JpbGUoKTtcclxuICAgICAgICBpZiAodGhpcy5pc01vYmlsZSkgdGhpcy5tZW51VHlwZSA9ICdMRUZUJztcclxuICAgICAgICB0aGlzLmFnZ3JlZ2F0b3JTZXJ2aWNlLnN1YnNjcmliZShLZXlDb25zdC5WaWV3SW1hZ2UsIChpbWFnZTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNNb2RhbFNob3cgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLm1vZGFsSW1hZ2VTcmMgPSBpbWFnZS5zcmM7XHJcbiAgICAgICAgICAgIHRoaXMuaW1hZ2VBbHRUZXh0ID0gaW1hZ2UuYWx0VGV4dDtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5yb3V0ZS5kYXRhLnN1YnNjcmliZShkYXRhID0+IHtcclxuICAgICAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLm1lbnVUYWJzKSB0aGlzLm1lbnVUYWJzID0gPE1lbnVUYWJbXT5kYXRhLm1lbnVUYWJzO1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLm1lbnVUYWJzIHx8IHRoaXMubWVudVRhYnMubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1lbnVUYWJzID0gdGhpcy5jYWNoZVNlcnZpY2UuZ2V0KEtleUNvbnN0Lk1lbnUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEubWVudVR5cGUpIHRoaXMubWVudVR5cGUgPSA8c3RyaW5nPmRhdGEubWVudVR5cGU7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5sb2dvKSB0aGlzLmxvZ28gPSA8c3RyaW5nPmRhdGEubG9nbztcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLnRpdGxlKTxzdHJpbmc+ZGF0YS50aXRsZTtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLnVybCkgdGhpcy51cmwgPSA8c3RyaW5nPmRhdGEudXJsO1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuYXV0aFVybCkgdGhpcy5hdXRoVXJsID0gPHN0cmluZz5kYXRhLmF1dGhVcmw7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5icmVhZGNydW1iKSB0aGlzLmJyZWFkY3J1bWIgPSA8QnJlYWRjcnVtYj5kYXRhLmJyZWFkY3J1bWI7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuYnJlYWRjcnVtYikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnJlYWRjcnVtYiA9IG5ldyBCcmVhZGNydW1iKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6ICdIb21lJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiB0aGlzLnVybFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJyZWFkY3J1bWIudXJsID0gdGhpcy51cmw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5yb3V0ZXIudXJsID09ICcvJykgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW3RoaXMudXJsXSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuYXV0aGVudGljYXRpb25TZXJ2aWNlLmN1cnJlbnRVc2VyKSB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbdGhpcy5hdXRoVXJsXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIuZXZlbnRzLnN1YnNjcmliZSgoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgaWYgKGV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvbkVuZCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucm91dGVyLnVybCA9PSAnLycpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbdGhpcy51cmxdKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEFjdGl2ZSA9ICF0aGlzLnNldEFjdGl2ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbG9zZUltYWdlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaXNNb2RhbFNob3cgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2hhbmdlTWVudShpdGVtczogQnJlYWRjcnVtYltdKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5icmVhZGNydW1icyA9IGl0ZW1zO1xyXG4gICAgICAgIHRoaXMuYnJlYWRjcnVtYnMuc3BsaWNlKDAsIDAsIHRoaXMuYnJlYWRjcnVtYik7XHJcbiAgICAgICAgdGhpcy5hZ2dyZWdhdG9yU2VydmljZS5wdWJsaXNoKEtleUNvbnN0Lk1lbnVDaGFuZ2VkLCB0aGlzLmJyZWFkY3J1bWJzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlZ2lzdGVyRXZlbnRzKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuYWdncmVnYXRvclNlcnZpY2Uuc3Vic2NyaWJlKEtleUNvbnN0LkxvZ2dlZEluLCAocmVzcG9uc2U6IEF1dGhlbnRpY2F0aW9uTG9naW5SZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIXJlc3BvbnNlKSByZXR1cm47XHJcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5tZW51VGFicykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tZW51VGFicyA9IHJlc3BvbnNlLm1lbnVUYWJzO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYWNoZVNlcnZpY2Uuc2V0KEtleUNvbnN0Lk1lbnUsIHRoaXMubWVudVRhYnMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuYXV0aGVudGljYXRpb25TZXJ2aWNlLmN1cnJlbnRVc2VyID0gcmVzcG9uc2UudXNlcjtcclxuICAgICAgICAgICAgdGhpcy53b3Jrc3BhY2VMYXlvdXRTZXJ2aWNlLnZlcnRpY2FsRWZmZWN0ID0gdGhpcy5tZW51VHlwZSA9PSAnTEVGVCcgPyAnb3ZlcmxheScgOiAnc2hyaW5rJztcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25TZXJ2aWNlLmV4ZWN1dGVBc3luYygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldEFjdGl2ZSA9ICF0aGlzLnNldEFjdGl2ZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuIl19