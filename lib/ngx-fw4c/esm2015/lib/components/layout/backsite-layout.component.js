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
        this.registerEvents();
    }
    ;
    /**
     * @return {?}
     */
    ngOnInit() {
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
            this.workspaceLayoutService.verticalEffect = 'overlay';
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
                template: "<div class=\"pcoded\" [attr.nav-type]=\"workspaceLayoutService.navType\"\r\n  [attr.theme-layout]=\"workspaceLayoutService.themeLayout\" [attr.layout-type]=\"workspaceLayoutService.layoutType\"\r\n  [attr.vertical-placement]=\"workspaceLayoutService.verticalPlacement\"\r\n  [attr.vertical-layout]=\"workspaceLayoutService.verticalLayout\"\r\n  [attr.pcoded-device-type]=\"workspaceLayoutService.deviceType\"\r\n  [attr.vertical-nav-type]=\"workspaceLayoutService.verticalNavType\"\r\n  [attr.vertical-effect]=\"authenticationService.currentUser ? workspaceLayoutService.verticalEffect: 'shink'\"\r\n  [attr.vnavigation-view]=\"workspaceLayoutService.vNavigationView\"\r\n  (window:resize)=\"workspaceLayoutService.onResize($event)\">\r\n  <div class=\"pcoded-overlay-box\"></div>\r\n  <div class=\"img-viewer-container\">\r\n    <div (click)=\"closeImage()\" [class.show-now]=\"isModalShow\" class=\"modal\">\r\n      <div class=\"view-wrapper modal-content\">\r\n        <div class=\"adv-popup\">\r\n          <img *ngIf=\"modalImageSrc\" [src]=\"modalImageSrc\">\r\n          <button class=\"btn-close-image\"><i class=\"fa fa-close-line\"></i></button>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"pcoded-container navbar-wrapper\">\r\n    <default-header [notifications]=\"notifications\" [logo]=\"logo\" [title]=\"title\"></default-header>\r\n    <div class=\"pcoded-main-container\" [style.margin-top]=\"workspaceLayoutService.headerFixedMargin\">\r\n      <div class=\"pcoded-wrapper\">\r\n        <default-sidebar *ngIf=\"menuTabs && authenticationService?.currentUser\" [setActive]=\"setActive\" (change)=\"changeMenu($event)\" [menuTabs]=\"menuTabs\"></default-sidebar>\r\n        <div class=\"pcoded-content\">\r\n          <div class=\"pcoded-inner-content\">\r\n            <default-navbar *ngIf=\"authenticationService?.currentUser\" [url]=\"url\" [breadcrumb]=\"breadcrumb\" [menuTabs]=\"menuTabs\" [items]=\"breadcrumbs\">\r\n            </default-navbar>\r\n            <div class=\"main-body\">\r\n              <div class=\"page-wrapper\">\r\n                <div class=\"page-body\">\r\n                  <katana-card>\r\n                    <router-outlet>\r\n                      <katana-spinner></katana-spinner>\r\n                    </router-outlet>\r\n                  </katana-card>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <default-toolbar></default-toolbar>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <default-footer></default-footer>\r\n  </div>\r\n</div>"
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja3NpdGUtbGF5b3V0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1mdzRjLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvbGF5b3V0L2JhY2tzaXRlLWxheW91dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQXlCLE1BQU0sZUFBZSxDQUFDO0FBQ2pFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3hFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUV6RCxPQUFPLEVBQVcsVUFBVSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRTdELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQU1oRSxNQUFNLE9BQU8sb0JBQW9COzs7Ozs7Ozs7O0lBYzdCLFlBQ1csc0JBQTRDLEVBQzVDLEtBQXFCLEVBQ3JCLHFCQUE0QyxFQUN6QyxNQUFjLEVBQ2QsYUFBNEIsRUFDNUIsaUJBQW9DLEVBQ3BDLFlBQTBCO1FBTjdCLDJCQUFzQixHQUF0QixzQkFBc0IsQ0FBc0I7UUFDNUMsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFDckIsMEJBQXFCLEdBQXJCLHFCQUFxQixDQUF1QjtRQUN6QyxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2Qsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNwQyxpQkFBWSxHQUFaLFlB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UUFBUSxDQUFDLENBQUM7YUFDdkQ7WUFDRCxJQUFJLENBQUMscUJBQXFCLENBQUMsV0FBVyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUM7WUFDdkQsSUFBSSxDQUFDLHNCQUFzQixDQUFDLGNBQWMsR0FBRyxTQUFTLENBQUM7WUFDdkQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZOzs7WUFBQyxHQUFHLEVBQUU7Z0JBQ2pDLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQ3JDLENBQUMsRUFBQyxDQUFDO1FBQ1AsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDOzs7WUFoR0osU0FBUyxTQUFDO2dCQUNQLG9qRkFBK0M7YUFDbEQ7Ozs7WUFiUSxvQkFBb0I7WUFDcEIsY0FBYztZQU1kLHFCQUFxQjtZQU5MLE1BQU07WUFLdEIsYUFBYTtZQUpiLGlCQUFpQjtZQU9qQixZQUFZOzs7O0lBT2pCLDZDQUFnRDs7SUFDaEQsb0NBQXVGOztJQUN2RixxQ0FBMEU7O0lBQzFFLHdDQUEyQjs7SUFDM0IsMkNBQW9DOztJQUNwQyw2Q0FBa0M7O0lBQ2xDLDRDQUFpQzs7SUFDakMsMkNBQXNDOztJQUN0QywwQ0FBOEI7O0lBQzlCLG1DQUFrQzs7SUFDbEMsdUNBQWlDOztJQUNqQyx5Q0FBa0M7O0lBRzlCLHNEQUFtRDs7SUFDbkQscUNBQTRCOztJQUM1QixxREFBbUQ7Ozs7O0lBQ25ELHNDQUF3Qjs7Ozs7SUFDeEIsNkNBQXNDOzs7OztJQUN0QyxpREFBOEM7Ozs7O0lBQzlDLDRDQUFvQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBBZnRlclZpZXdJbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgRGVmYXVsdExheW91dFNlcnZpY2UgfSBmcm9tICcuL2xheW91dC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFJvdXRlciwgTmF2aWdhdGlvbkVuZCB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IEFnZ3JlZ2F0b3JTZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL3NlcnZpY2VzL2FnZ3JlZ2F0b3Iuc2VydmljZSc7XHJcbmltcG9ydCB7IEtleUNvbnN0IH0gZnJvbSAnLi4vc2hhcmVkL2NvbnN0YW50cy9rZXkuY29uc3QnO1xyXG5pbXBvcnQgeyBOb3RpZmljYXRpb25EZXRhaWwgfSBmcm9tICcuLi9zaGFyZWQvbW9kZWxzL25vdGlmaWNhdGlvbi5tb2RlbCc7XHJcbmltcG9ydCB7IE1lbnVUYWIsIEJyZWFkY3J1bWIgfSBmcm9tICcuLi9zaGFyZWQvbW9kZWxzL2Jhc2UubW9kZWwnO1xyXG5pbXBvcnQgeyBBY3Rpb25TZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL3NlcnZpY2VzL2FjdGlvbi5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQXV0aGVudGljYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vYXV0aC9hdXRoLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBBdXRoZW50aWNhdGlvbkxvZ2luUmVzcG9uc2UgfSBmcm9tICcuLi9hdXRoL2F1dGgubW9kZWwnO1xyXG5pbXBvcnQgeyBDYWNoZVNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQvc2VydmljZXMvY2FjaGUuc2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHRlbXBsYXRlVXJsOiAnLi9iYWNrc2l0ZS1sYXlvdXQuY29tcG9uZW50Lmh0bWwnLFxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIEFkbWluTGF5b3V0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0IHtcclxuICAgIHB1YmxpYyBub3RpZmljYXRpb25zOiBOb3RpZmljYXRpb25EZXRhaWxbXSA9IFtdO1xyXG4gICAgcHVibGljIGxvZ286IHN0cmluZyA9ICdodHRwczovL2NtY2dsb2JhbC5jb20udm4vY3NzL2ltYWdlLWNvbW1vbi9Db21iaW5lZCUyMFNoYXBlLnN2Zyc7XHJcbiAgICBwdWJsaWMgdGl0bGU6IHN0cmluZyA9ICdDTUMgR2xvYmFsIC0gQXNwaXJlIHRvIGluc3BpcmUgdGhlIERpZ2l0YWwgV29ybGQnOztcclxuICAgIHB1YmxpYyBtZW51VGFiczogTWVudVRhYltdO1xyXG4gICAgcHVibGljIGlzTW9kYWxTaG93OiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgbW9kYWxJbWFnZVNyYzogc3RyaW5nID0gJyc7XHJcbiAgICBwdWJsaWMgaW1hZ2VBbHRUZXh0OiBzdHJpbmcgPSAnJztcclxuICAgIHB1YmxpYyBicmVhZGNydW1iczogQnJlYWRjcnVtYltdID0gW107XHJcbiAgICBwdWJsaWMgYnJlYWRjcnVtYjogQnJlYWRjcnVtYjtcclxuICAgIHB1YmxpYyB1cmw6IHN0cmluZyA9ICcvZGFzaGJvYXJkJztcclxuICAgIHB1YmxpYyBhdXRoVXJsOiBzdHJpbmcgPSAnL2F1dGgnO1xyXG4gICAgcHVibGljIHNldEFjdGl2ZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHB1YmxpYyB3b3Jrc3BhY2VMYXlvdXRTZXJ2aWNlOiBEZWZhdWx0TGF5b3V0U2VydmljZSxcclxuICAgICAgICBwdWJsaWMgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxyXG4gICAgICAgIHB1YmxpYyBhdXRoZW50aWNhdGlvblNlcnZpY2U6IEF1dGhlbnRpY2F0aW9uU2VydmljZSxcclxuICAgICAgICBwcm90ZWN0ZWQgcm91dGVyOiBSb3V0ZXIsXHJcbiAgICAgICAgcHJvdGVjdGVkIGFjdGlvblNlcnZpY2U6IEFjdGlvblNlcnZpY2UsXHJcbiAgICAgICAgcHJvdGVjdGVkIGFnZ3JlZ2F0b3JTZXJ2aWNlOiBBZ2dyZWdhdG9yU2VydmljZSxcclxuICAgICAgICBwcm90ZWN0ZWQgY2FjaGVTZXJ2aWNlOiBDYWNoZVNlcnZpY2VcclxuICAgICkge1xyXG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudHMoKTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmFnZ3JlZ2F0b3JTZXJ2aWNlLnN1YnNjcmliZShLZXlDb25zdC5WaWV3SW1hZ2UsIChpbWFnZTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNNb2RhbFNob3cgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLm1vZGFsSW1hZ2VTcmMgPSBpbWFnZS5zcmM7XHJcbiAgICAgICAgICAgIHRoaXMuaW1hZ2VBbHRUZXh0ID0gaW1hZ2UuYWx0VGV4dDtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5yb3V0ZS5kYXRhLnN1YnNjcmliZShkYXRhID0+IHtcclxuICAgICAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLm1lbnVUYWJzKSB0aGlzLm1lbnVUYWJzID0gPE1lbnVUYWJbXT5kYXRhLm1lbnVUYWJzO1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLm1lbnVUYWJzIHx8IHRoaXMubWVudVRhYnMubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1lbnVUYWJzID0gdGhpcy5jYWNoZVNlcnZpY2UuZ2V0KEtleUNvbnN0Lk1lbnUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEubG9nbykgdGhpcy5sb2dvID0gPHN0cmluZz5kYXRhLmxvZ287XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS50aXRsZSk8c3RyaW5nPmRhdGEudGl0bGU7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS51cmwpIHRoaXMudXJsID0gPHN0cmluZz5kYXRhLnVybDtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLmF1dGhVcmwpIHRoaXMuYXV0aFVybCA9IDxzdHJpbmc+ZGF0YS5hdXRoVXJsO1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuYnJlYWRjcnVtYikgdGhpcy5icmVhZGNydW1iID0gPEJyZWFkY3J1bWI+ZGF0YS5icmVhZGNydW1iO1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmJyZWFkY3J1bWIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJyZWFkY3J1bWIgPSBuZXcgQnJlYWRjcnVtYih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiAnSG9tZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogdGhpcy51cmxcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5icmVhZGNydW1iLnVybCA9IHRoaXMudXJsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucm91dGVyLnVybCA9PSAnLycpIHRoaXMucm91dGVyLm5hdmlnYXRlKFt0aGlzLnVybF0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmF1dGhlbnRpY2F0aW9uU2VydmljZS5jdXJyZW50VXNlcikgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW3RoaXMuYXV0aFVybF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucm91dGVyLmV2ZW50cy5zdWJzY3JpYmUoKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChldmVudCBpbnN0YW5jZW9mIE5hdmlnYXRpb25FbmQpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnJvdXRlci51cmwgPT0gJy8nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW3RoaXMudXJsXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRBY3RpdmUgPSAhdGhpcy5zZXRBY3RpdmU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xvc2VJbWFnZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmlzTW9kYWxTaG93ID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNoYW5nZU1lbnUoaXRlbXM6IEJyZWFkY3J1bWJbXSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuYnJlYWRjcnVtYnMgPSBpdGVtcztcclxuICAgICAgICB0aGlzLmJyZWFkY3J1bWJzLnNwbGljZSgwLCAwLCB0aGlzLmJyZWFkY3J1bWIpO1xyXG4gICAgICAgIHRoaXMuYWdncmVnYXRvclNlcnZpY2UucHVibGlzaChLZXlDb25zdC5NZW51Q2hhbmdlZCwgdGhpcy5icmVhZGNydW1icyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZWdpc3RlckV2ZW50cygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmFnZ3JlZ2F0b3JTZXJ2aWNlLnN1YnNjcmliZShLZXlDb25zdC5Mb2dnZWRJbiwgKHJlc3BvbnNlOiBBdXRoZW50aWNhdGlvbkxvZ2luUmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgaWYgKCFyZXNwb25zZSkgcmV0dXJuO1xyXG4gICAgICAgICAgICBpZiAocmVzcG9uc2UubWVudVRhYnMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubWVudVRhYnMgPSByZXNwb25zZS5tZW51VGFicztcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FjaGVTZXJ2aWNlLnNldChLZXlDb25zdC5NZW51LCB0aGlzLm1lbnVUYWJzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmF1dGhlbnRpY2F0aW9uU2VydmljZS5jdXJyZW50VXNlciA9IHJlc3BvbnNlLnVzZXI7XHJcbiAgICAgICAgICAgIHRoaXMud29ya3NwYWNlTGF5b3V0U2VydmljZS52ZXJ0aWNhbEVmZmVjdCA9ICdvdmVybGF5JztcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25TZXJ2aWNlLmV4ZWN1dGVBc3luYygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldEFjdGl2ZSA9ICF0aGlzLnNldEFjdGl2ZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuIl19