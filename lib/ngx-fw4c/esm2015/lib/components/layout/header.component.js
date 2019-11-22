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
                this.setMenu();
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
            this.setMenu();
        }), this.set);
    }
    /**
     * @private
     * @return {?}
     */
    setMenu() {
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
                                            /** @type {?} */
                                            var data = url.split('/');
                                            if (data && data.length > 0 && this.selectedMenu.children) {
                                                /** @type {?} */
                                                var currentChild = this.selectedMenu.children.find((/**
                                                 * @param {?} s
                                                 * @return {?}
                                                 */
                                                s => s.state == data[data.length - 1]));
                                                if (currentChild)
                                                    currentChild.selected = true;
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
    }
}
DefaultHeaderComponent.decorators = [
    { type: Component, args: [{
                selector: 'default-header',
                template: "<nav class=\"navbar header-navbar pcoded-header header-workspace\"\r\n  [attr.pcoded-header-position]=\"layoutService.pcodedHeaderPosition\" [attr.header-theme]=\"layoutService.headerTheme\">\r\n  <div class=\"navbar-wrapper\">\r\n    <div class=\"navbar-container-right\">\r\n      <a *ngIf=\"user && (menuType == 'LEFT' || isMobile)\" #menu class=\"btn-show-hide-menu ml-1\" (click)=\"toggleMenu()\"\r\n        href=\"javascript:;\"><i class=\"fa fa-bars\" aria-hidden=\"true\"></i>\r\n      </a>\r\n    </div>\r\n    <div class=\"navbar-logo\" [attr.logo-theme]=\"layoutService.logoTheme\">\r\n      <a class=\"logo--wrapper\" [routerLink]=\"['/']\">\r\n        <ng-container *ngIf=\"logo\">\r\n          <img class=\"text-logo\" [src]=\"logo\" alt=\"\" [title]=\"title\">\r\n        </ng-container>\r\n      </a>\r\n    </div>\r\n    <ng-container *ngIf=\"!isMobile; else mobileActions\">\r\n      <div *ngIf=\"menuType == 'TOP' && user\" class=\"navbar-container menu-top\">\r\n        <ul class=\"nav-left\">\r\n          <li (click)=\"selectItem(menuItem)\" *ngFor=\"let menuItem of menuItems\">\r\n            <a class=\"top-item\" [ngClass]=\"{'active-menu': menuItem.selected}\"\r\n              [routerLink]=\"getParentLink(menuItem)\"><span class=\"{{menuItem?.icon}}\"></span> {{menuItem?.label}}</a>\r\n          </li>\r\n        </ul>\r\n      </div>\r\n      <div class=\"navbar-container ml-auto\">\r\n        <ul class=\"nav-left\">\r\n        </ul>\r\n        <ul class=\"nav-right\" [ngClass]=\"layoutService.isCollapsedMobile\">\r\n          <li *ngIf=\"user\">\r\n            <div class=\"row form search-bar form-inline\">\r\n              <div class=\"flex-custom\">\r\n                <div class=\"form-group search-input-wrapper\">\r\n                  <span class=\"search-icon\">\r\n                    <i class=\"fa fa-search\"></i>\r\n                  </span>\r\n                  <input spellcheck=\"false\" [(ngModel)]=\"filter\" type=\"text\" class=\"form-control search-input\"\r\n                    [placeholder]=\"'T\u00ECm ki\u1EBFm...'\">\r\n                  <span class=\"search-reset\" *ngIf=\"filter\">\r\n                    <i *ngIf=\"loading\" class=\"fa fa-spinner rotate-refresh\"></i>\r\n                    <i *ngIf=\"!loading\" class=\"fa fa-times-circle\" (click)=\"filter= ''\"></i>\r\n                  </span>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </li>\r\n          <li *ngIf=\"user\" class=\"header-notification\">\r\n            <a href=\"javascript:;\">\r\n              <i class=\"fa fa-bell bell icon-noti\"></i>\r\n              <span class=\"badge\">1</span>\r\n            </a>\r\n            <div class=\"notify--wrapper\">\r\n              <h6 class=\"m-b-0 text-font-13\">\r\n                <a href=\"javascript:;\" class=\"text-primary text-font-13\">Ch\u1EE9c n\u0103ng \u0111ang ho\u00E0n thi\u1EC7n...</a>\r\n              </h6>\r\n              <ul class=\"list-unstyled\">\r\n                <li class=\"w-100\" *ngFor=\"let notification of notifications\">\r\n                  <a href=\"javascript:;\">\r\n                    <p class=\"text-bold mb-1\">FW4C</p>\r\n                    <p class=\"time m-0\">\r\n                      <i class=\"icofont icofont-clock-time\"></i>25/10/2019\r\n                    </p>\r\n                  </a>\r\n                </li>\r\n              </ul>\r\n              <h6 class=\"text-center p-2 view-all-noti m-0\">\r\n                <a href=\"javascript:;\" class=\"text-primary text-font-13 link-view-more\">\r\n                  Xem t\u1EA5t c\u1EA3\r\n                </a>\r\n              </h6>\r\n            </div>\r\n          </li>\r\n          <li class=\"user-profile header-notification\" *ngIf=\"user\">\r\n            <a [routerLink]=\"['/']\">\r\n              <img [hidden]=\"!user?.image?.src\" [src]=\"user?.image?.src\" alt=\"\" srcset=\"\"\r\n                style=\"border: 2px solid #ffffff; background: #f8f8f8; width: auto; height: 25px; width: 25px; border-radius: 50%;\">\r\n              <span [hidden]=\"user?.image?.src\" class=\"ava\"\r\n                [attr.data-letters]=\"(user.lastName | slice:0:1) + (user.firstName | slice:0:1)\"></span>\r\n              <span style=\"font-weight: normal;\">{{user.fullName}}</span>\r\n              <i class=\"ti-angle-down\"></i>\r\n            </a>\r\n            <div class=\"user-list-option--wrapper\">\r\n              <ul class=\"show-notification profile-notification\">\r\n                <li class=\"p-0\">\r\n                  <a href=\"javascript:void(0)\"><i></i>T\u00E0i kho\u1EA3n</a>\r\n                </li>\r\n                <li class=\"p-0\" (click)=\"logout()\">\r\n                  <a href=\"javascript:void(0)\"><i></i>Tho\u00E1t</a>\r\n                </li>\r\n              </ul>\r\n            </div>\r\n          </li>\r\n        </ul>\r\n      </div>\r\n    </ng-container>\r\n  </div>\r\n  <div *ngIf=\"menuType == 'TOP' && !isMobile && user\" class=\"sub-top\">\r\n    <ul class=\"sub-items\">\r\n      <li style=\"padding: 10px;\">\r\n        <a [ngClass]=\"{'active-menu': child.selected}\" (click)=\"selectSubMenu(child)\"\r\n          *ngFor=\"let child of selectedMenu?.children\" [routerLink]=\"getChildLink(child)\"><span\r\n            class=\"{{child?.icon}}\"></span> {{child?.name}}</a>\r\n      </li>\r\n    </ul>\r\n  </div>\r\n</nav>\r\n<ng-template #mobileActions>\r\n  <div class=\"navbar-container-mobile ml-auto\">\r\n    <div class=\"header-notification d-flex align-items-center\">\r\n      <img [hidden]=\"!user?.image?.src\" [src]=\"user?.image?.src\" alt=\"\" srcset=\"\"\r\n        style=\" width:32px; border: 2px solid #ffffff; border-radius: 50%; background: #f8f8f8;\">\r\n      <span [hidden]=\"user?.image?.src\" class=\"ava\"\r\n        [attr.data-letters]=\"(user.lastName | slice:0:1) + (user.firstName | slice:0:1)\"></span>\r\n      <i class=\"text-white ti-angle-down\"></i>\r\n      <div class=\"user-list-option--wrapper\">\r\n        <ul class=\"show-notification profile-notification m-0\">\r\n          <li><a class=\"p-0\" [routerLink]=\"['/user-profile']\">H\u1ED3 s\u01A1 c\u00E1 nh\u00E2n</a></li>\r\n          <li><a href=\"javascript:void(0)\" (click)=\"logout()\"><i class=\"ti-layout-sidebar-left\"></i>Tho\u00E1t</a></li>\r\n        </ul>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</ng-template>",
                styles: ["a{text-decoration:none}.header-notification .text-white{overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:1;-webkit-box-orient:vertical;white-space:normal}.header-notification .text-white.ti-angle-down{padding:0 8px;line-height:40px}span.ava[data-letters]:before{content:attr(data-letters);display:inline-block;font-size:1em;width:35px;height:35px;line-height:35px;text-align:center;border-radius:50%;background:#f8f8f8;vertical-align:middle;margin-right:.3em;color:#a9a9a9}.menu-top{margin-left:60px}.menu-top ul li a{font-weight:500;text-transform:uppercase;font-size:12px;border-bottom:3px solid #007bff;padding-left:0;padding-right:0}.menu-top ul li a:hover{border-bottom:3px solid #ff9500}.active-menu{border-bottom:3px solid #ff9500!important}.sub-top{background-color:#fff;min-height:32px;width:100%}.sub-items{text-align:center;margin-bottom:0}.sub-items li{font-size:12px;font-weight:500}.sub-items li a{padding:0;margin-right:15px;border-bottom:3px solid transparent}"]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1mdzRjLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvbGF5b3V0L2hlYWRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDeEUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDeEQsT0FBTyxFQUFFLE1BQU0sRUFBRSxjQUFjLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFHbEUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDMUUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDN0QsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBRXpELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQVE5RCxNQUFNLE9BQU8sc0JBQXNCOzs7Ozs7Ozs7OztJQW1CL0IsWUFDVyxhQUFtQyxFQUNoQyxNQUFjLEVBQ2QsS0FBcUIsRUFDckIsYUFBNEIsRUFDNUIsaUJBQW9DLEVBQ3BDLHFCQUE0QyxFQUM1QyxXQUF3QixFQUMxQixrQkFBcUM7UUFQdEMsa0JBQWEsR0FBYixhQUFhLENBQXNCO1FBQ2hDLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUNyQixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ3BDLDBCQUFxQixHQUFyQixxQkFBcUIsQ0FBdUI7UUFDNUMsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDMUIsdUJBQWtCLEdBQWxCLGtCQUFr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V0FBVztZQUpYLGlCQUFpQjs7OzRCQWFyQixLQUFLO21CQUNMLEtBQUs7b0JBQ0wsS0FBSzt1QkFDTCxLQUFLO2tCQUNMLEtBQUs7dUJBQ0wsS0FBSzttQkFDTCxTQUFTLFNBQUMsTUFBTSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTs7OztJQU5uQywrQ0FBeUQ7O0lBQ3pELHNDQUE2Qjs7SUFDN0IsdUNBQThCOztJQUM5QiwwQ0FBaUM7O0lBQ2pDLHFDQUFnRDs7SUFDaEQsMENBQXlDOztJQUN6QyxzQ0FBNkQ7O0lBQzdELHlDQUFnQzs7SUFDaEMsd0NBQXNCOztJQUN0QixzQ0FBMkI7O0lBQzNCLDBDQUF5Qjs7SUFDekIsNENBQTBCOztJQUMxQiwyQ0FBK0M7O0lBQy9DLG9EQUFrQzs7SUFDbEMsNENBQTBCOztJQUMxQixzQ0FBb0U7O0lBQ3BFLDhDQUEyQzs7SUFHdkMsK0NBQTBDOzs7OztJQUMxQyx3Q0FBd0I7Ozs7O0lBQ3hCLHVDQUErQjs7Ozs7SUFDL0IsK0NBQXNDOzs7OztJQUN0QyxtREFBOEM7Ozs7O0lBQzlDLHVEQUFzRDs7Ozs7SUFDdEQsNkNBQWtDOzs7OztJQUNsQyxvREFBNkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBEZWZhdWx0TGF5b3V0U2VydmljZSB9IGZyb20gJy4vbGF5b3V0LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBSb3V0ZXIsIEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgQWN0aW9uU2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9zZXJ2aWNlcy9hY3Rpb24uc2VydmljZSc7XHJcbmltcG9ydCB7IE5vdGlmaWNhdGlvbkRldGFpbCB9IGZyb20gJy4uL3NoYXJlZC9tb2RlbHMvbm90aWZpY2F0aW9uLm1vZGVsJztcclxuaW1wb3J0IHsgVXNlclZpZXdNb2RlbCwgQXV0aGVudGljYXRpb25Mb2dpblJlc3BvbnNlIH0gZnJvbSAnLi4vYXV0aC9hdXRoLm1vZGVsJztcclxuaW1wb3J0IHsgQWdncmVnYXRvclNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQvc2VydmljZXMvYWdncmVnYXRvci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQXV0aGVudGljYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vYXV0aC9hdXRoLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBLZXlDb25zdCB9IGZyb20gJy4uL3NoYXJlZC9jb25zdGFudHMva2V5LmNvbnN0JztcclxuaW1wb3J0IHsgTWVudVRhYiwgRXh0ZW5kZWRNYWluTWVudUdyb3VwLCBNZW51SXRlbSB9IGZyb20gJy4uL3NoYXJlZC9tb2RlbHMvYmFzZS5tb2RlbCc7XHJcbmltcG9ydCB7IE1lbnVTZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL3NlcnZpY2VzL21lbnUuc2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnZGVmYXVsdC1oZWFkZXInLFxyXG4gICAgdGVtcGxhdGVVcmw6ICcuL2hlYWRlci5jb21wb25lbnQuaHRtbCcsXHJcbiAgICBzdHlsZVVybHM6IFsnLi9oZWFkZXIuY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIERlZmF1bHRIZWFkZXJDb21wb25lbnQge1xyXG4gICAgQElucHV0KCkgcHVibGljIG5vdGlmaWNhdGlvbnM6IE5vdGlmaWNhdGlvbkRldGFpbFtdID0gW107XHJcbiAgICBASW5wdXQoKSBwdWJsaWMgbG9nbzogc3RyaW5nO1xyXG4gICAgQElucHV0KCkgcHVibGljIHRpdGxlOiBzdHJpbmc7XHJcbiAgICBASW5wdXQoKSBwdWJsaWMgbWVudVR5cGU6IHN0cmluZztcclxuICAgIEBJbnB1dCgpIHB1YmxpYyBzZXQ6IChyb2xlOiBzdHJpbmcpID0+IE1lbnVJdGVtO1xyXG4gICAgQElucHV0KCkgcHVibGljIG1lbnVUYWJzOiBNZW51VGFiW10gPSBbXTtcclxuICAgIEBWaWV3Q2hpbGQoJ21lbnUnLCB7IHN0YXRpYzogdHJ1ZSB9KSBwdWJsaWMgbWVudTogRWxlbWVudFJlZjtcclxuICAgIHB1YmxpYyBsb2FkaW5nOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgZmlsdGVyOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgdXNlcjogVXNlclZpZXdNb2RlbDtcclxuICAgIHB1YmxpYyBpc01vYmlsZTogYm9vbGVhbjtcclxuICAgIHB1YmxpYyBjdXJyZW50VXJsOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgbWVudUl0ZW1zOiBFeHRlbmRlZE1haW5NZW51R3JvdXBbXSA9IFtdO1xyXG4gICAgcHVibGljIGlzQ29sbGFwc2VkU2lkZUJhcjogc3RyaW5nO1xyXG4gICAgcHVibGljIGlzU3VwcGxpZXIgPSBmYWxzZTtcclxuICAgIHB1YmxpYyB0YWJzOiB7IG5hbWU6IHN0cmluZywgbWVudTogc3RyaW5nLCBzdWJOYW1lOiBzdHJpbmcgfVtdID0gW107XHJcbiAgICBwdWJsaWMgc2VsZWN0ZWRNZW51OiBFeHRlbmRlZE1haW5NZW51R3JvdXA7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHVibGljIGxheW91dFNlcnZpY2U6IERlZmF1bHRMYXlvdXRTZXJ2aWNlLFxyXG4gICAgICAgIHByb3RlY3RlZCByb3V0ZXI6IFJvdXRlcixcclxuICAgICAgICBwcm90ZWN0ZWQgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxyXG4gICAgICAgIHByb3RlY3RlZCBhY3Rpb25TZXJ2aWNlOiBBY3Rpb25TZXJ2aWNlLFxyXG4gICAgICAgIHByb3RlY3RlZCBhZ2dyZWdhdG9yU2VydmljZTogQWdncmVnYXRvclNlcnZpY2UsXHJcbiAgICAgICAgcHJvdGVjdGVkIGF1dGhlbnRpY2F0aW9uU2VydmljZTogQXV0aGVudGljYXRpb25TZXJ2aWNlLFxyXG4gICAgICAgIHByb3RlY3RlZCBtZW51U2VydmljZTogTWVudVNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBfYWdncmVnYXRvclNlcnZpY2U6IEFnZ3JlZ2F0b3JTZXJ2aWNlXHJcbiAgICApIHsgfVxyXG5cclxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaXNNb2JpbGUgPSB0aGlzLmFjdGlvblNlcnZpY2UuaXNNb2JpbGUoKTtcclxuICAgICAgICBpZiAodGhpcy5pc01vYmlsZSkge1xyXG4gICAgICAgICAgICB0aGlzLnRvZ2dsZU1lbnUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCF0aGlzLmF1dGhlbnRpY2F0aW9uU2VydmljZS5jdXJyZW50VXNlcikge1xyXG4gICAgICAgICAgICB0aGlzLnRvZ2dsZU1lbnUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMudXNlciA9IHRoaXMuYXV0aGVudGljYXRpb25TZXJ2aWNlLmN1cnJlbnRVc2VyO1xyXG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudHMoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdG9nZ2xlTWVudSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5sYXlvdXRTZXJ2aWNlLnZlcnRpY2FsRWZmZWN0ID09ICdvdmVybGF5Jykge1xyXG4gICAgICAgICAgICB0aGlzLmxheW91dFNlcnZpY2UudmVydGljYWxFZmZlY3QgPSAnc2hyaW5rJztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmxheW91dFNlcnZpY2UudmVydGljYWxFZmZlY3QgPSAnb3ZlcmxheSc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsb2dvdXQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5hdXRoZW50aWNhdGlvblNlcnZpY2UubG9nb3V0KG51bGwsIHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZWxlY3RJdGVtKGl0ZW06IEV4dGVuZGVkTWFpbk1lbnVHcm91cCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLm1lbnVJdGVtcykge1xyXG4gICAgICAgICAgICB0aGlzLm1lbnVJdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpdGVtLnNlbGVjdGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpdGVtLnNlbGVjdGVkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkTWVudSA9IGl0ZW07XHJcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRNZW51LmNoaWxkcmVuICYmIHRoaXMuc2VsZWN0ZWRNZW51LmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZE1lbnUuY2hpbGRyZW4uZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaXRlbS5zZWxlY3RlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZE1lbnUuY2hpbGRyZW5bMF0uc2VsZWN0ZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0UGFyZW50TGluayhpdGVtOiBFeHRlbmRlZE1haW5NZW51R3JvdXApOiBzdHJpbmcge1xyXG4gICAgICAgIGlmICghaXRlbS5jaGlsZHJlbiB8fCBpdGVtLmNoaWxkcmVuLmxlbmd0aCA9PSAwKSByZXR1cm4gJ2phdmFzY3JpcHQ6Oyc7XHJcbiAgICAgICAgdmFyIGN1cnJlbnRJdGVtID0gaXRlbS5jaGlsZHJlblswXTtcclxuICAgICAgICByZXR1cm4gY3VycmVudEl0ZW0ubWFpblN0YXRlID8gYC8ke2N1cnJlbnRJdGVtLm1haW5TdGF0ZX0vJHtjdXJyZW50SXRlbS5zdGF0ZX1gIDogYC8ke2N1cnJlbnRJdGVtLnN0YXRlfWA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldENoaWxkTGluayhpdGVtOiBhbnkpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBpdGVtLm1haW5TdGF0ZSA/IGAvJHtpdGVtLm1haW5TdGF0ZX0vJHtpdGVtLnN0YXRlfWAgOiBgLyR7aXRlbS5zdGF0ZX1gO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZWxlY3RTdWJNZW51KGNoaWxkOiBNZW51SXRlbSk6IHZvaWQge1xyXG4gICAgICAgIGlmICghdGhpcy5zZWxlY3RlZE1lbnUpIHJldHVybjtcclxuICAgICAgICBpZiAodGhpcy5zZWxlY3RlZE1lbnUuY2hpbGRyZW4pIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZE1lbnUuY2hpbGRyZW4uZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaXRlbS5zZWxlY3RlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2hpbGQuc2VsZWN0ZWQgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVnaXN0ZXJFdmVudHMoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5pbml0TWVudSgpO1xyXG4gICAgICAgIHRoaXMuX2FnZ3JlZ2F0b3JTZXJ2aWNlLnN1YnNjcmliZShLZXlDb25zdC5Mb2dnZWRJbiwgKHJlc3BvbnNlOiBBdXRoZW50aWNhdGlvbkxvZ2luUmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5hdXRoZW50aWNhdGlvblNlcnZpY2UuY3VycmVudFVzZXIgPSByZXNwb25zZS51c2VyO1xyXG4gICAgICAgICAgICB0aGlzLnVzZXIgPSB0aGlzLmF1dGhlbnRpY2F0aW9uU2VydmljZS5jdXJyZW50VXNlcjtcclxuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLm1lbnVUYWJzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1lbnVUYWJzID0gcmVzcG9uc2UubWVudVRhYnM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25TZXJ2aWNlLmV4ZWN1dGVBc3luYygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvZ2dsZU1lbnUoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0TWVudSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGluaXRNZW51KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubWVudVNlcnZpY2UuaW5pdCh0aGlzLm1lbnVUYWJzLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMudGFicyA9IHRoaXMubWVudVNlcnZpY2UuZ2V0VGFicygpO1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRVcmwgPSB0aGlzLnRhYnNbMF0ubWVudTtcclxuICAgICAgICAgICAgdGhpcy5tZW51SXRlbXMgPSB0aGlzLm1lbnVTZXJ2aWNlLmxvYWRGaXJzdFRhYkl0ZW1zKHRoaXMuY3VycmVudFVybCk7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9uU2VydmljZS5leGVjdXRlQXN5bmMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc0NvbGxhcHNlZFNpZGVCYXIgPSAnbm8tYmxvY2snO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5zZXRNZW51KCk7XHJcbiAgICAgICAgfSwgdGhpcy5zZXQpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0TWVudSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5tZW51SXRlbXMpIHtcclxuICAgICAgICAgICAgdmFyIHVybCA9IHRoaXMucm91dGVyLnVybDtcclxuICAgICAgICAgICAgdGhpcy5tZW51SXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uY2hpbGRyZW4pIHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLmNoaWxkcmVuLmZvckVhY2goKGtpZCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3RhdGUgPSBraWQubWFpblN0YXRlID8ga2lkLm1haW5TdGF0ZSA6IGtpZC5zdGF0ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHVybC5pbmRleE9mKHN0YXRlKSA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGlvblNlcnZpY2UuZXhlY3V0ZUFzeW5jKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgaXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnRvcC1pdGVtXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtcyAmJiBpdGVtcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGhyZWYgPSAoPGFueT5pdGVtc1tpXSkuaHJlZjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChocmVmICYmIGhyZWYudG9TdHJpbmcoKS5pbmRleE9mKHN0YXRlKSA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLnNlbGVjdGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkTWVudSA9IGl0ZW07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRhdGEgPSB1cmwuc3BsaXQoJy8nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YSAmJiBkYXRhLmxlbmd0aCA+IDAgJiYgdGhpcy5zZWxlY3RlZE1lbnUuY2hpbGRyZW4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGN1cnJlbnRDaGlsZCA9IHRoaXMuc2VsZWN0ZWRNZW51LmNoaWxkcmVuLmZpbmQocyA9PiBzLnN0YXRlID09IGRhdGFbZGF0YS5sZW5ndGggLSAxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50Q2hpbGQpIGN1cnJlbnRDaGlsZC5zZWxlY3RlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==