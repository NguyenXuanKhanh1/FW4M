/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ViewChild, ElementRef } from "@angular/core";
import { DefaultLayoutService } from './layout.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ActionService } from '../shared/services/action.service';
import { AggregatorService } from '../shared/services/aggregator.service';
import { AuthenticationService } from '../auth/auth.service';
import { KeyConst } from '../shared/constants/key.const';
import { MenuService } from '../shared/services/menu.service';
export class DefaultHeaderComponent {
    /**
     * @param {?} layoutService
     * @param {?} router
     * @param {?} route
     * @param {?} actionService
     * @param {?} aggregatorService
     * @param {?} authenticationService
     * @param {?} menuService
     * @param {?} _aggregatorService
     */
    constructor(layoutService, router, route, actionService, aggregatorService, authenticationService, menuService, _aggregatorService) {
        this.layoutService = layoutService;
        this.router = router;
        this.route = route;
        this.actionService = actionService;
        this.aggregatorService = aggregatorService;
        this.authenticationService = authenticationService;
        this.menuService = menuService;
        this._aggregatorService = _aggregatorService;
        this.notifications = [];
        this.menuTabs = [];
        this.loading = false;
        this.menuItems = [];
        this.isSupplier = false;
        this.tabs = [];
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.isMobile = this.actionService.isMobile();
        if (this.isMobile) {
            this.toggleMenu();
        }
        if (!this.authenticationService.currentUser) {
            this.toggleMenu();
        }
        this.user = this.authenticationService.currentUser;
        this.registerEvents();
    }
    /**
     * @return {?}
     */
    toggleMenu() {
        if (this.layoutService.verticalEffect == 'overlay') {
            this.layoutService.verticalEffect = 'shrink';
        }
        else {
            this.layoutService.verticalEffect = 'overlay';
        }
    }
    /**
     * @return {?}
     */
    logout() {
        this.authenticationService.logout(null, true);
    }
    /**
     * @param {?} item
     * @return {?}
     */
    selectItem(item) {
        if (this.menuItems) {
            this.menuItems.forEach((/**
             * @param {?} item
             * @return {?}
             */
            (item) => {
                item.selected = false;
            }));
        }
        item.selected = true;
        this.selectedMenu = item;
        if (this.selectedMenu.children && this.selectedMenu.children.length > 0) {
            this.selectedMenu.children.forEach((/**
             * @param {?} item
             * @return {?}
             */
            (item) => {
                item.selected = false;
            }));
            this.selectedMenu.children[0].selected = true;
        }
    }
    /**
     * @param {?} item
     * @return {?}
     */
    getParentLink(item) {
        if (!item.children || item.children.length == 0)
            return 'javascript:;';
        /** @type {?} */
        var currentItem = item.children[0];
        return currentItem.mainState ? `/${currentItem.mainState}/${currentItem.state}` : `/${currentItem.state}`;
    }
    /**
     * @param {?} item
     * @return {?}
     */
    getChildLink(item) {
        return item.mainState ? `/${item.mainState}/${item.state}` : `/${item.state}`;
    }
    /**
     * @param {?} child
     * @return {?}
     */
    selectSubMenu(child) {
        if (!this.selectedMenu)
            return;
        if (this.selectedMenu.children) {
            this.selectedMenu.children.forEach((/**
             * @param {?} item
             * @return {?}
             */
            (item) => {
                item.selected = false;
            }));
        }
        child.selected = true;
    }
    /**
     * @private
     * @return {?}
     */
    registerEvents() {
        this.initMenu();
        this._aggregatorService.subscribe(KeyConst.LoggedIn, (/**
         * @param {?} response
         * @return {?}
         */
        (response) => {
            this.authenticationService.currentUser = response.user;
            this.user = this.authenticationService.currentUser;
            if (response.menuTabs) {
                this.menuTabs = response.menuTabs;
            }
            this.actionService.executeAsync((/**
             * @return {?}
             */
            () => {
                this.toggleMenu();
            }));
        }));
    }
    /**
     * @private
     * @return {?}
     */
    initMenu() {
        this.menuService.init(this.menuTabs, (/**
         * @return {?}
         */
        () => {
            this.tabs = this.menuService.getTabs();
            this.currentUrl = this.tabs[0].menu;
            this.menuItems = this.menuService.loadFirstTabItems(this.currentUrl);
            this.actionService.executeAsync((/**
             * @return {?}
             */
            () => {
                this.isCollapsedSideBar = 'no-block';
            }));
            if (this.menuItems) {
                /** @type {?} */
                var url = this.router.url;
                this.menuItems.forEach((/**
                 * @param {?} item
                 * @return {?}
                 */
                (item) => {
                    if (item.children) {
                        item.children.forEach((/**
                         * @param {?} kid
                         * @return {?}
                         */
                        (kid) => {
                            /** @type {?} */
                            var state = kid.mainState ? kid.mainState : kid.state;
                            if (url.indexOf(state) > -1) {
                                this.actionService.executeAsync((/**
                                 * @return {?}
                                 */
                                () => {
                                    /** @type {?} */
                                    let items = document.querySelectorAll(".top-item");
                                    if (items && items.length > 0) {
                                        for (let i = 0; i < items.length; i++) {
                                            /** @type {?} */
                                            const href = ((/** @type {?} */ (items[i]))).href;
                                            if (href && href.toString().indexOf(state) > 0) {
                                                item.selected = true;
                                                this.selectedMenu = item;
                                                if (this.selectedMenu.children && this.selectedMenu.children.length > 0) {
                                                    this.selectedMenu.children[0].selected = true;
                                                }
                                                break;
                                            }
                                        }
                                    }
                                }));
                            }
                        }));
                    }
                }));
            }
        }), this.set);
    }
}
DefaultHeaderComponent.decorators = [
    { type: Component, args: [{
                selector: 'default-header',
                template: "<nav class=\"navbar header-navbar pcoded-header header-workspace\"\r\n  [attr.pcoded-header-position]=\"layoutService.pcodedHeaderPosition\" [attr.header-theme]=\"layoutService.headerTheme\">\r\n  <div class=\"navbar-wrapper\">\r\n    <div class=\"navbar-container-right\">\r\n      <a *ngIf=\"user && (menuType == 'LEFT' || isMobile)\" #menu class=\"btn-show-hide-menu ml-1\" (click)=\"toggleMenu()\"\r\n        href=\"javascript:;\"><i class=\"fa fa-bars\" aria-hidden=\"true\"></i>\r\n      </a>\r\n    </div>\r\n    <div class=\"navbar-logo\" [attr.logo-theme]=\"layoutService.logoTheme\">\r\n      <a class=\"logo--wrapper\" [routerLink]=\"['/']\">\r\n        <ng-container *ngIf=\"logo\">\r\n          <img class=\"text-logo\" [src]=\"logo\" alt=\"\" [title]=\"title\">\r\n        </ng-container>\r\n      </a>\r\n    </div>\r\n    <ng-container *ngIf=\"!isMobile; else mobileActions\">\r\n      <div *ngIf=\"menuType == 'TOP'\" class=\"navbar-container menu-top\">\r\n        <ul class=\"nav-left\">\r\n          <li (click)=\"selectItem(menuItem)\" *ngFor=\"let menuItem of menuItems\">\r\n            <a class=\"top-item\" [ngClass]=\"{'active-menu': menuItem.selected}\"\r\n              [routerLink]=\"getParentLink(menuItem)\"><span class=\"{{menuItem?.icon}}\"></span> {{menuItem?.label}}</a>\r\n          </li>\r\n        </ul>\r\n      </div>\r\n      <div class=\"navbar-container ml-auto\">\r\n        <ul class=\"nav-left\">\r\n        </ul>\r\n        <ul class=\"nav-right\" [ngClass]=\"layoutService.isCollapsedMobile\">\r\n          <li *ngIf=\"user\">\r\n            <div class=\"row form search-bar form-inline\">\r\n              <div class=\"flex-custom\">\r\n                <div class=\"form-group search-input-wrapper\">\r\n                  <span class=\"search-icon\">\r\n                    <i class=\"fa fa-search\"></i>\r\n                  </span>\r\n                  <input spellcheck=\"false\" [(ngModel)]=\"filter\" type=\"text\" class=\"form-control search-input\"\r\n                    [placeholder]=\"'T\u00ECm ki\u1EBFm...'\">\r\n                  <span class=\"search-reset\" *ngIf=\"filter\">\r\n                    <i *ngIf=\"loading\" class=\"fa fa-spinner rotate-refresh\"></i>\r\n                    <i *ngIf=\"!loading\" class=\"fa fa-times-circle\" (click)=\"filter= ''\"></i>\r\n                  </span>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </li>\r\n          <li *ngIf=\"user\" class=\"header-notification\">\r\n            <a href=\"javascript:;\">\r\n              <i class=\"fa fa-bell bell icon-noti\"></i>\r\n              <span class=\"badge\">1</span>\r\n            </a>\r\n            <div class=\"notify--wrapper\">\r\n              <h6 class=\"m-b-0 text-font-13\">\r\n                <a href=\"javascript:;\" class=\"text-primary text-font-13\">Ch\u1EE9c n\u0103ng \u0111ang ho\u00E0n thi\u1EC7n...</a>\r\n              </h6>\r\n              <ul class=\"list-unstyled\">\r\n                <li class=\"w-100\" *ngFor=\"let notification of notifications\">\r\n                  <a href=\"javascript:;\">\r\n                    <p class=\"text-bold mb-1\">FW4C</p>\r\n                    <p class=\"time m-0\">\r\n                      <i class=\"icofont icofont-clock-time\"></i>25/10/2019\r\n                    </p>\r\n                  </a>\r\n                </li>\r\n              </ul>\r\n              <h6 class=\"text-center p-2 view-all-noti m-0\">\r\n                <a href=\"javascript:;\" class=\"text-primary text-font-13 link-view-more\">\r\n                  Xem t\u1EA5t c\u1EA3\r\n                </a>\r\n              </h6>\r\n            </div>\r\n          </li>\r\n          <li class=\"user-profile header-notification\" *ngIf=\"user\">\r\n            <a [routerLink]=\"['/']\">\r\n              <img [hidden]=\"!user?.image?.src\" [src]=\"user?.image?.src\" alt=\"\" srcset=\"\"\r\n                style=\"border: 2px solid #ffffff; background: #f8f8f8; width: auto; height: 25px; width: 25px; border-radius: 50%;\">\r\n              <span [hidden]=\"user?.image?.src\" class=\"ava\"\r\n                [attr.data-letters]=\"(user.lastName | slice:0:1) + (user.firstName | slice:0:1)\"></span>\r\n              <span style=\"font-weight: normal;\">{{user.fullName}}</span>\r\n              <i class=\"ti-angle-down\"></i>\r\n            </a>\r\n            <div class=\"user-list-option--wrapper\">\r\n              <ul class=\"show-notification profile-notification\">\r\n                <li class=\"p-0\">\r\n                  <a href=\"javascript:void(0)\"><i></i>T\u00E0i kho\u1EA3n</a>\r\n                </li>\r\n                <li class=\"p-0\" (click)=\"logout()\">\r\n                  <a href=\"javascript:void(0)\"><i></i>Tho\u00E1t</a>\r\n                </li>\r\n              </ul>\r\n            </div>\r\n          </li>\r\n        </ul>\r\n      </div>\r\n    </ng-container>\r\n  </div>\r\n  <div *ngIf=\"menuType == 'TOP' && !isMobile\" class=\"sub-top\">\r\n    <ul class=\"sub-items\">\r\n      <li style=\"padding: 10px;\">\r\n        <a [ngClass]=\"{'active-menu': child.selected}\" (click)=\"selectSubMenu(child)\"\r\n          *ngFor=\"let child of selectedMenu?.children\" [routerLink]=\"getChildLink(child)\"><span\r\n            class=\"{{child?.icon}}\"></span> {{child?.name}}</a>\r\n      </li>\r\n    </ul>\r\n  </div>\r\n</nav>\r\n<ng-template #mobileActions>\r\n  <div class=\"navbar-container-mobile ml-auto\">\r\n    <div class=\"header-notification d-flex align-items-center\">\r\n      <img [hidden]=\"!user?.image?.src\" [src]=\"user?.image?.src\" alt=\"\" srcset=\"\"\r\n        style=\" width:32px; border: 2px solid #ffffff; border-radius: 50%; background: #f8f8f8;\">\r\n      <span [hidden]=\"user?.image?.src\" class=\"ava\"\r\n        [attr.data-letters]=\"(user.lastName | slice:0:1) + (user.firstName | slice:0:1)\"></span>\r\n      <i class=\"text-white ti-angle-down\"></i>\r\n      <div class=\"user-list-option--wrapper\">\r\n        <ul class=\"show-notification profile-notification m-0\">\r\n          <li><a class=\"p-0\" [routerLink]=\"['/user-profile']\">H\u1ED3 s\u01A1 c\u00E1 nh\u00E2n</a></li>\r\n          <li><a href=\"javascript:void(0)\" (click)=\"logout()\"><i class=\"ti-layout-sidebar-left\"></i>Tho\u00E1t</a></li>\r\n        </ul>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</ng-template>",
                styles: ["a{text-decoration:none}.header-notification .text-white{overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:1;-webkit-box-orient:vertical;white-space:normal}.header-notification .text-white.ti-angle-down{padding:0 8px;line-height:40px}span.ava[data-letters]:before{content:attr(data-letters);display:inline-block;font-size:1em;width:35px;height:35px;line-height:35px;text-align:center;border-radius:50%;background:#f8f8f8;vertical-align:middle;margin-right:.3em;color:#a9a9a9}.menu-top{margin-left:60px}.menu-top ul li a{font-weight:500;text-transform:uppercase;font-size:12px;border-bottom:2px solid #007bff}.menu-top ul li a:hover{border-bottom:2px solid #ff9500}.active-menu{border-bottom:2px solid #ff9500!important}.sub-top{background-color:#fff;min-height:32px;width:100%}.sub-items{text-align:center;margin-bottom:0}.sub-items li{font-size:12px;font-weight:500}.sub-items li a{padding:0 10px;border-bottom:2px solid transparent}"]
            }] }
];
/** @nocollapse */
DefaultHeaderComponent.ctorParameters = () => [
    { type: DefaultLayoutService },
    { type: Router },
    { type: ActivatedRoute },
    { type: ActionService },
    { type: AggregatorService },
    { type: AuthenticationService },
    { type: MenuService },
    { type: AggregatorService }
];
DefaultHeaderComponent.propDecorators = {
    notifications: [{ type: Input }],
    logo: [{ type: Input }],
    title: [{ type: Input }],
    menuType: [{ type: Input }],
    set: [{ type: Input }],
    menuTabs: [{ type: Input }],
    menu: [{ type: ViewChild, args: ['menu', { static: true },] }]
};
if (false) {
    /** @type {?} */
    DefaultHeaderComponent.prototype.notifications;
    /** @type {?} */
    DefaultHeaderComponent.prototype.logo;
    /** @type {?} */
    DefaultHeaderComponent.prototype.title;
    /** @type {?} */
    DefaultHeaderComponent.prototype.menuType;
    /** @type {?} */
    DefaultHeaderComponent.prototype.set;
    /** @type {?} */
    DefaultHeaderComponent.prototype.menuTabs;
    /** @type {?} */
    DefaultHeaderComponent.prototype.menu;
    /** @type {?} */
    DefaultHeaderComponent.prototype.loading;
    /** @type {?} */
    DefaultHeaderComponent.prototype.filter;
    /** @type {?} */
    DefaultHeaderComponent.prototype.user;
    /** @type {?} */
    DefaultHeaderComponent.prototype.isMobile;
    /** @type {?} */
    DefaultHeaderComponent.prototype.currentUrl;
    /** @type {?} */
    DefaultHeaderComponent.prototype.menuItems;
    /** @type {?} */
    DefaultHeaderComponent.prototype.isCollapsedSideBar;
    /** @type {?} */
    DefaultHeaderComponent.prototype.isSupplier;
    /** @type {?} */
    DefaultHeaderComponent.prototype.tabs;
    /** @type {?} */
    DefaultHeaderComponent.prototype.selectedMenu;
    /** @type {?} */
    DefaultHeaderComponent.prototype.layoutService;
    /**
     * @type {?}
     * @protected
     */
    DefaultHeaderComponent.prototype.router;
    /**
     * @type {?}
     * @protected
     */
    DefaultHeaderComponent.prototype.route;
    /**
     * @type {?}
     * @protected
     */
    DefaultHeaderComponent.prototype.actionService;
    /**
     * @type {?}
     * @protected
     */
    DefaultHeaderComponent.prototype.aggregatorService;
    /**
     * @type {?}
     * @protected
     */
    DefaultHeaderComponent.prototype.authenticationService;
    /**
     * @type {?}
     * @protected
     */
    DefaultHeaderComponent.prototype.menuService;
    /**
     * @type {?}
     * @private
     */
    DefaultHeaderComponent.prototype._aggregatorService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1mdzRjLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvbGF5b3V0L2hlYWRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDeEUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDeEQsT0FBTyxFQUFFLE1BQU0sRUFBRSxjQUFjLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFHbEUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDMUUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDN0QsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBRXpELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQVE5RCxNQUFNLE9BQU8sc0JBQXNCOzs7Ozs7Ozs7OztJQW1CL0IsWUFDVyxhQUFtQyxFQUNoQyxNQUFjLEVBQ2QsS0FBcUIsRUFDckIsYUFBNEIsRUFDNUIsaUJBQW9DLEVBQ3BDLHFCQUE0QyxFQUM1QyxXQUF3QixFQUMxQixrQkFBcUM7UUFQdEMsa0JBQWEsR0FBYixhQUFhLENBQXNCO1FBQ2hDLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUNyQixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ3BDLDBCQUFxQixHQUFyQixxQkFBcUIsQ0FBdUI7UUFDNUMsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDMUIsdUJBQWtCLEdBQWxCLGtCQUFr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OztJQUNoQyx3Q0FBc0I7O0lBQ3RCLHNDQUEyQjs7SUFDM0IsMENBQXlCOztJQUN6Qiw0Q0FBMEI7O0lBQzFCLDJDQUErQzs7SUFDL0Msb0RBQWtDOztJQUNsQyw0Q0FBMEI7O0lBQzFCLHNDQUFvRTs7SUFDcEUsOENBQTJDOztJQUd2QywrQ0FBMEM7Ozs7O0lBQzFDLHdDQUF3Qjs7Ozs7SUFDeEIsdUNBQStCOzs7OztJQUMvQiwrQ0FBc0M7Ozs7O0lBQ3RDLG1EQUE4Qzs7Ozs7SUFDOUMsdURBQXNEOzs7OztJQUN0RCw2Q0FBa0M7Ozs7O0lBQ2xDLG9EQUE2QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IERlZmF1bHRMYXlvdXRTZXJ2aWNlIH0gZnJvbSAnLi9sYXlvdXQuc2VydmljZSc7XHJcbmltcG9ydCB7IFJvdXRlciwgQWN0aXZhdGVkUm91dGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBBY3Rpb25TZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL3NlcnZpY2VzL2FjdGlvbi5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTm90aWZpY2F0aW9uRGV0YWlsIH0gZnJvbSAnLi4vc2hhcmVkL21vZGVscy9ub3RpZmljYXRpb24ubW9kZWwnO1xyXG5pbXBvcnQgeyBVc2VyVmlld01vZGVsLCBBdXRoZW50aWNhdGlvbkxvZ2luUmVzcG9uc2UgfSBmcm9tICcuLi9hdXRoL2F1dGgubW9kZWwnO1xyXG5pbXBvcnQgeyBBZ2dyZWdhdG9yU2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9zZXJ2aWNlcy9hZ2dyZWdhdG9yLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBBdXRoZW50aWNhdGlvblNlcnZpY2UgfSBmcm9tICcuLi9hdXRoL2F1dGguc2VydmljZSc7XHJcbmltcG9ydCB7IEtleUNvbnN0IH0gZnJvbSAnLi4vc2hhcmVkL2NvbnN0YW50cy9rZXkuY29uc3QnO1xyXG5pbXBvcnQgeyBNZW51VGFiLCBFeHRlbmRlZE1haW5NZW51R3JvdXAsIE1lbnVJdGVtIH0gZnJvbSAnLi4vc2hhcmVkL21vZGVscy9iYXNlLm1vZGVsJztcclxuaW1wb3J0IHsgTWVudVNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQvc2VydmljZXMvbWVudS5zZXJ2aWNlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdkZWZhdWx0LWhlYWRlcicsXHJcbiAgICB0ZW1wbGF0ZVVybDogJy4vaGVhZGVyLmNvbXBvbmVudC5odG1sJyxcclxuICAgIHN0eWxlVXJsczogWycuL2hlYWRlci5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgRGVmYXVsdEhlYWRlckNvbXBvbmVudCB7XHJcbiAgICBASW5wdXQoKSBwdWJsaWMgbm90aWZpY2F0aW9uczogTm90aWZpY2F0aW9uRGV0YWlsW10gPSBbXTtcclxuICAgIEBJbnB1dCgpIHB1YmxpYyBsb2dvOiBzdHJpbmc7XHJcbiAgICBASW5wdXQoKSBwdWJsaWMgdGl0bGU6IHN0cmluZztcclxuICAgIEBJbnB1dCgpIHB1YmxpYyBtZW51VHlwZTogc3RyaW5nO1xyXG4gICAgQElucHV0KCkgcHVibGljIHNldDogKHJvbGU6IHN0cmluZykgPT4gTWVudUl0ZW07XHJcbiAgICBASW5wdXQoKSBwdWJsaWMgbWVudVRhYnM6IE1lbnVUYWJbXSA9IFtdO1xyXG4gICAgQFZpZXdDaGlsZCgnbWVudScsIHsgc3RhdGljOiB0cnVlIH0pIHB1YmxpYyBtZW51OiBFbGVtZW50UmVmO1xyXG4gICAgcHVibGljIGxvYWRpbmc6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHB1YmxpYyBmaWx0ZXI6IHN0cmluZztcclxuICAgIHB1YmxpYyB1c2VyOiBVc2VyVmlld01vZGVsO1xyXG4gICAgcHVibGljIGlzTW9iaWxlOiBib29sZWFuO1xyXG4gICAgcHVibGljIGN1cnJlbnRVcmw6IHN0cmluZztcclxuICAgIHB1YmxpYyBtZW51SXRlbXM6IEV4dGVuZGVkTWFpbk1lbnVHcm91cFtdID0gW107XHJcbiAgICBwdWJsaWMgaXNDb2xsYXBzZWRTaWRlQmFyOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgaXNTdXBwbGllciA9IGZhbHNlO1xyXG4gICAgcHVibGljIHRhYnM6IHsgbmFtZTogc3RyaW5nLCBtZW51OiBzdHJpbmcsIHN1Yk5hbWU6IHN0cmluZyB9W10gPSBbXTtcclxuICAgIHB1YmxpYyBzZWxlY3RlZE1lbnU6IEV4dGVuZGVkTWFpbk1lbnVHcm91cDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwdWJsaWMgbGF5b3V0U2VydmljZTogRGVmYXVsdExheW91dFNlcnZpY2UsXHJcbiAgICAgICAgcHJvdGVjdGVkIHJvdXRlcjogUm91dGVyLFxyXG4gICAgICAgIHByb3RlY3RlZCByb3V0ZTogQWN0aXZhdGVkUm91dGUsXHJcbiAgICAgICAgcHJvdGVjdGVkIGFjdGlvblNlcnZpY2U6IEFjdGlvblNlcnZpY2UsXHJcbiAgICAgICAgcHJvdGVjdGVkIGFnZ3JlZ2F0b3JTZXJ2aWNlOiBBZ2dyZWdhdG9yU2VydmljZSxcclxuICAgICAgICBwcm90ZWN0ZWQgYXV0aGVudGljYXRpb25TZXJ2aWNlOiBBdXRoZW50aWNhdGlvblNlcnZpY2UsXHJcbiAgICAgICAgcHJvdGVjdGVkIG1lbnVTZXJ2aWNlOiBNZW51U2VydmljZSxcclxuICAgICAgICBwcml2YXRlIF9hZ2dyZWdhdG9yU2VydmljZTogQWdncmVnYXRvclNlcnZpY2VcclxuICAgICkgeyB9XHJcblxyXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5pc01vYmlsZSA9IHRoaXMuYWN0aW9uU2VydmljZS5pc01vYmlsZSgpO1xyXG4gICAgICAgIGlmICh0aGlzLmlzTW9iaWxlKSB7XHJcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlTWVudSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXRoaXMuYXV0aGVudGljYXRpb25TZXJ2aWNlLmN1cnJlbnRVc2VyKSB7XHJcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlTWVudSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy51c2VyID0gdGhpcy5hdXRoZW50aWNhdGlvblNlcnZpY2UuY3VycmVudFVzZXI7XHJcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50cygpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB0b2dnbGVNZW51KCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLmxheW91dFNlcnZpY2UudmVydGljYWxFZmZlY3QgPT0gJ292ZXJsYXknKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGF5b3V0U2VydmljZS52ZXJ0aWNhbEVmZmVjdCA9ICdzaHJpbmsnO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubGF5b3V0U2VydmljZS52ZXJ0aWNhbEVmZmVjdCA9ICdvdmVybGF5JztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGxvZ291dCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmF1dGhlbnRpY2F0aW9uU2VydmljZS5sb2dvdXQobnVsbCwgdHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNlbGVjdEl0ZW0oaXRlbTogRXh0ZW5kZWRNYWluTWVudUdyb3VwKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMubWVudUl0ZW1zKSB7XHJcbiAgICAgICAgICAgIHRoaXMubWVudUl0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgICAgIGl0ZW0uc2VsZWN0ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGl0ZW0uc2VsZWN0ZWQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRNZW51ID0gaXRlbTtcclxuICAgICAgICBpZiAodGhpcy5zZWxlY3RlZE1lbnUuY2hpbGRyZW4gJiYgdGhpcy5zZWxlY3RlZE1lbnUuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkTWVudS5jaGlsZHJlbi5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpdGVtLnNlbGVjdGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkTWVudS5jaGlsZHJlblswXS5zZWxlY3RlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRQYXJlbnRMaW5rKGl0ZW06IEV4dGVuZGVkTWFpbk1lbnVHcm91cCk6IHN0cmluZyB7XHJcbiAgICAgICAgaWYgKCFpdGVtLmNoaWxkcmVuIHx8IGl0ZW0uY2hpbGRyZW4ubGVuZ3RoID09IDApIHJldHVybiAnamF2YXNjcmlwdDo7JztcclxuICAgICAgICB2YXIgY3VycmVudEl0ZW0gPSBpdGVtLmNoaWxkcmVuWzBdO1xyXG4gICAgICAgIHJldHVybiBjdXJyZW50SXRlbS5tYWluU3RhdGUgPyBgLyR7Y3VycmVudEl0ZW0ubWFpblN0YXRlfS8ke2N1cnJlbnRJdGVtLnN0YXRlfWAgOiBgLyR7Y3VycmVudEl0ZW0uc3RhdGV9YDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0Q2hpbGRMaW5rKGl0ZW06IGFueSk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIGl0ZW0ubWFpblN0YXRlID8gYC8ke2l0ZW0ubWFpblN0YXRlfS8ke2l0ZW0uc3RhdGV9YCA6IGAvJHtpdGVtLnN0YXRlfWA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNlbGVjdFN1Yk1lbnUoY2hpbGQ6IE1lbnVJdGVtKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnNlbGVjdGVkTWVudSkgcmV0dXJuO1xyXG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkTWVudS5jaGlsZHJlbikge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkTWVudS5jaGlsZHJlbi5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpdGVtLnNlbGVjdGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjaGlsZC5zZWxlY3RlZCA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZWdpc3RlckV2ZW50cygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmluaXRNZW51KCk7XHJcbiAgICAgICAgdGhpcy5fYWdncmVnYXRvclNlcnZpY2Uuc3Vic2NyaWJlKEtleUNvbnN0LkxvZ2dlZEluLCAocmVzcG9uc2U6IEF1dGhlbnRpY2F0aW9uTG9naW5SZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmF1dGhlbnRpY2F0aW9uU2VydmljZS5jdXJyZW50VXNlciA9IHJlc3BvbnNlLnVzZXI7XHJcbiAgICAgICAgICAgIHRoaXMudXNlciA9IHRoaXMuYXV0aGVudGljYXRpb25TZXJ2aWNlLmN1cnJlbnRVc2VyO1xyXG4gICAgICAgICAgICBpZiAocmVzcG9uc2UubWVudVRhYnMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubWVudVRhYnMgPSByZXNwb25zZS5tZW51VGFicztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmFjdGlvblNlcnZpY2UuZXhlY3V0ZUFzeW5jKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMudG9nZ2xlTWVudSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGluaXRNZW51KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubWVudVNlcnZpY2UuaW5pdCh0aGlzLm1lbnVUYWJzLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMudGFicyA9IHRoaXMubWVudVNlcnZpY2UuZ2V0VGFicygpO1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRVcmwgPSB0aGlzLnRhYnNbMF0ubWVudTtcclxuICAgICAgICAgICAgdGhpcy5tZW51SXRlbXMgPSB0aGlzLm1lbnVTZXJ2aWNlLmxvYWRGaXJzdFRhYkl0ZW1zKHRoaXMuY3VycmVudFVybCk7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9uU2VydmljZS5leGVjdXRlQXN5bmMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc0NvbGxhcHNlZFNpZGVCYXIgPSAnbm8tYmxvY2snO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYgKHRoaXMubWVudUl0ZW1zKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdXJsID0gdGhpcy5yb3V0ZXIudXJsO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tZW51SXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uY2hpbGRyZW4uZm9yRWFjaCgoa2lkKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3RhdGUgPSBraWQubWFpblN0YXRlID8ga2lkLm1haW5TdGF0ZSA6IGtpZC5zdGF0ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh1cmwuaW5kZXhPZihzdGF0ZSkgPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9uU2VydmljZS5leGVjdXRlQXN5bmMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgaXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnRvcC1pdGVtXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbXMgJiYgaXRlbXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGhyZWYgPSAoPGFueT5pdGVtc1tpXSkuaHJlZjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaHJlZiAmJiBocmVmLnRvU3RyaW5nKCkuaW5kZXhPZihzdGF0ZSkgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uc2VsZWN0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkTWVudSA9IGl0ZW07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGVkTWVudS5jaGlsZHJlbiAmJiB0aGlzLnNlbGVjdGVkTWVudS5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkTWVudS5jaGlsZHJlblswXS5zZWxlY3RlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgdGhpcy5zZXQpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==