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
export class AdminLayoutComponent {
    /**
     * @param {?} workspaceLayoutService
     * @param {?} route
     * @param {?} authenticationService
     * @param {?} router
     * @param {?} actionService
     * @param {?} aggregatorService
     */
    constructor(workspaceLayoutService, route, authenticationService, router, actionService, aggregatorService) {
        this.workspaceLayoutService = workspaceLayoutService;
        this.route = route;
        this.authenticationService = authenticationService;
        this.router = router;
        this.actionService = actionService;
        this.aggregatorService = aggregatorService;
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
                this.menuTabs = (/** @type {?} */ (data.menuTabs));
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
                this.breadcrumb = new Breadcrumb({
                    label: 'Home',
                    url: this.url
                });
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
    { type: AggregatorService }
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
    /* Skipping unhandled member: ;*/
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja3NpdGUtbGF5b3V0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1mdzRjLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvbGF5b3V0L2JhY2tzaXRlLWxheW91dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQXlCLE1BQU0sZUFBZSxDQUFDO0FBQ2pFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3hFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUV6RCxPQUFPLEVBQVcsVUFBVSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBTzdELE1BQU0sT0FBTyxvQkFBb0I7Ozs7Ozs7OztJQWM3QixZQUNXLHNCQUE0QyxFQUM1QyxLQUFxQixFQUNyQixxQkFBNEMsRUFDekMsTUFBYyxFQUNkLGFBQTRCLEVBQzVCLGlCQUFvQztRQUx2QywyQkFBc0IsR0FBdEIsc0JBQXNCLENBQXNCO1FBQzVDLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQ3JCLDBCQUFxQixHQUFyQixxQkFBcUIsQ0FBdUI7UUFDekMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzVCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFuQjNDLGtCQUFhLEdBQXlCLEVBQUUsQ0FBQztRQUN6QyxTQUFJLEdBQVcsZ0VBQWdFLENBQUM7UUFDaEYsVUFBSyxHQUFXLGtE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OztJQUM1QixxREFBbUQ7Ozs7O0lBQ25ELHNDQUF3Qjs7Ozs7SUFDeEIsNkNBQXNDOzs7OztJQUN0QyxpREFBOEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IERlZmF1bHRMYXlvdXRTZXJ2aWNlIH0gZnJvbSAnLi9sYXlvdXQuc2VydmljZSc7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBSb3V0ZXIsIE5hdmlnYXRpb25FbmQgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBBZ2dyZWdhdG9yU2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9zZXJ2aWNlcy9hZ2dyZWdhdG9yLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBLZXlDb25zdCB9IGZyb20gJy4uL3NoYXJlZC9jb25zdGFudHMva2V5LmNvbnN0JztcclxuaW1wb3J0IHsgTm90aWZpY2F0aW9uRGV0YWlsIH0gZnJvbSAnLi4vc2hhcmVkL21vZGVscy9ub3RpZmljYXRpb24ubW9kZWwnO1xyXG5pbXBvcnQgeyBNZW51VGFiLCBCcmVhZGNydW1iIH0gZnJvbSAnLi4vc2hhcmVkL21vZGVscy9iYXNlLm1vZGVsJztcclxuaW1wb3J0IHsgQWN0aW9uU2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9zZXJ2aWNlcy9hY3Rpb24uc2VydmljZSc7XHJcbmltcG9ydCB7IEF1dGhlbnRpY2F0aW9uU2VydmljZSB9IGZyb20gJy4uL2F1dGgvYXV0aC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQXV0aGVudGljYXRpb25Mb2dpblJlc3BvbnNlIH0gZnJvbSAnLi4vYXV0aC9hdXRoLm1vZGVsJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgdGVtcGxhdGVVcmw6ICcuL2JhY2tzaXRlLWxheW91dC5jb21wb25lbnQuaHRtbCcsXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgQWRtaW5MYXlvdXRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQge1xyXG4gICAgcHVibGljIG5vdGlmaWNhdGlvbnM6IE5vdGlmaWNhdGlvbkRldGFpbFtdID0gW107XHJcbiAgICBwdWJsaWMgbG9nbzogc3RyaW5nID0gJ2h0dHBzOi8vY21jZ2xvYmFsLmNvbS52bi9jc3MvaW1hZ2UtY29tbW9uL0NvbWJpbmVkJTIwU2hhcGUuc3ZnJztcclxuICAgIHB1YmxpYyB0aXRsZTogc3RyaW5nID0gJ0NNQyBHbG9iYWwgLSBBc3BpcmUgdG8gaW5zcGlyZSB0aGUgRGlnaXRhbCBXb3JsZCc7O1xyXG4gICAgcHVibGljIG1lbnVUYWJzOiBNZW51VGFiW107XHJcbiAgICBwdWJsaWMgaXNNb2RhbFNob3c6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHB1YmxpYyBtb2RhbEltYWdlU3JjOiBzdHJpbmcgPSAnJztcclxuICAgIHB1YmxpYyBpbWFnZUFsdFRleHQ6IHN0cmluZyA9ICcnO1xyXG4gICAgcHVibGljIGJyZWFkY3J1bWJzOiBCcmVhZGNydW1iW10gPSBbXTtcclxuICAgIHB1YmxpYyBicmVhZGNydW1iOiBCcmVhZGNydW1iO1xyXG4gICAgcHVibGljIHVybDogc3RyaW5nID0gJy9kYXNoYm9hcmQnO1xyXG4gICAgcHVibGljIGF1dGhVcmw6IHN0cmluZyA9ICcvYXV0aCc7XHJcbiAgICBwdWJsaWMgc2V0QWN0aXZlOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHVibGljIHdvcmtzcGFjZUxheW91dFNlcnZpY2U6IERlZmF1bHRMYXlvdXRTZXJ2aWNlLFxyXG4gICAgICAgIHB1YmxpYyByb3V0ZTogQWN0aXZhdGVkUm91dGUsXHJcbiAgICAgICAgcHVibGljIGF1dGhlbnRpY2F0aW9uU2VydmljZTogQXV0aGVudGljYXRpb25TZXJ2aWNlLFxyXG4gICAgICAgIHByb3RlY3RlZCByb3V0ZXI6IFJvdXRlcixcclxuICAgICAgICBwcm90ZWN0ZWQgYWN0aW9uU2VydmljZTogQWN0aW9uU2VydmljZSxcclxuICAgICAgICBwcm90ZWN0ZWQgYWdncmVnYXRvclNlcnZpY2U6IEFnZ3JlZ2F0b3JTZXJ2aWNlXHJcbiAgICApIHtcclxuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnRzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5hZ2dyZWdhdG9yU2VydmljZS5zdWJzY3JpYmUoS2V5Q29uc3QuVmlld0ltYWdlLCAoaW1hZ2U6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmlzTW9kYWxTaG93ID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5tb2RhbEltYWdlU3JjID0gaW1hZ2Uuc3JjO1xyXG4gICAgICAgICAgICB0aGlzLmltYWdlQWx0VGV4dCA9IGltYWdlLmFsdFRleHQ7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMucm91dGUuZGF0YS5zdWJzY3JpYmUoZGF0YSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1lbnVUYWJzID0gPE1lbnVUYWJbXT5kYXRhLm1lbnVUYWJzO1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEubG9nbykgdGhpcy5sb2dvID0gPHN0cmluZz5kYXRhLmxvZ287XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS50aXRsZSk8c3RyaW5nPmRhdGEudGl0bGU7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS51cmwpIHRoaXMudXJsID0gPHN0cmluZz5kYXRhLnVybDtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLmF1dGhVcmwpIHRoaXMuYXV0aFVybCA9IDxzdHJpbmc+ZGF0YS5hdXRoVXJsO1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuYnJlYWRjcnVtYikgdGhpcy5icmVhZGNydW1iID0gPEJyZWFkY3J1bWI+ZGF0YS5icmVhZGNydW1iO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5icmVhZGNydW1iID0gbmV3IEJyZWFkY3J1bWIoe1xyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiAnSG9tZScsXHJcbiAgICAgICAgICAgICAgICAgICAgdXJsOiB0aGlzLnVybFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5yb3V0ZXIudXJsID09ICcvJykgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW3RoaXMudXJsXSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuYXV0aGVudGljYXRpb25TZXJ2aWNlLmN1cnJlbnRVc2VyKSB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbdGhpcy5hdXRoVXJsXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIuZXZlbnRzLnN1YnNjcmliZSgoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgaWYgKGV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvbkVuZCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucm91dGVyLnVybCA9PSAnLycpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbdGhpcy51cmxdKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEFjdGl2ZSA9ICF0aGlzLnNldEFjdGl2ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbG9zZUltYWdlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaXNNb2RhbFNob3cgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2hhbmdlTWVudShpdGVtczogQnJlYWRjcnVtYltdKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5icmVhZGNydW1icyA9IGl0ZW1zO1xyXG4gICAgICAgIHRoaXMuYnJlYWRjcnVtYnMuc3BsaWNlKDAsIDAsIHRoaXMuYnJlYWRjcnVtYik7XHJcbiAgICAgICAgdGhpcy5hZ2dyZWdhdG9yU2VydmljZS5wdWJsaXNoKEtleUNvbnN0Lk1lbnVDaGFuZ2VkLCB0aGlzLmJyZWFkY3J1bWJzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlZ2lzdGVyRXZlbnRzKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuYWdncmVnYXRvclNlcnZpY2Uuc3Vic2NyaWJlKEtleUNvbnN0LkxvZ2dlZEluLCAocmVzcG9uc2U6IEF1dGhlbnRpY2F0aW9uTG9naW5SZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmF1dGhlbnRpY2F0aW9uU2VydmljZS5jdXJyZW50VXNlciA9IHJlc3BvbnNlLnVzZXI7XHJcbiAgICAgICAgICAgIHRoaXMud29ya3NwYWNlTGF5b3V0U2VydmljZS52ZXJ0aWNhbEVmZmVjdCA9ICdvdmVybGF5JztcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25TZXJ2aWNlLmV4ZWN1dGVBc3luYygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldEFjdGl2ZSA9ICF0aGlzLnNldEFjdGl2ZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuIl19