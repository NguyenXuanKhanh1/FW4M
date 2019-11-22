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
var DefaultHeaderComponent = /** @class */ (function () {
    function DefaultHeaderComponent(layoutService, router, route, actionService, aggregatorService, authenticationService, menuService, _aggregatorService) {
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
    DefaultHeaderComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.isMobile = this.actionService.isMobile();
        if (this.isMobile) {
            this.toggleMenu();
        }
        if (!this.authenticationService.currentUser) {
            this.toggleMenu();
        }
        this.user = this.authenticationService.currentUser;
        this.registerEvents();
    };
    /**
     * @return {?}
     */
    DefaultHeaderComponent.prototype.toggleMenu = /**
     * @return {?}
     */
    function () {
        if (this.layoutService.verticalEffect == 'overlay') {
            this.layoutService.verticalEffect = 'shrink';
        }
        else {
            this.layoutService.verticalEffect = 'overlay';
        }
    };
    /**
     * @return {?}
     */
    DefaultHeaderComponent.prototype.logout = /**
     * @return {?}
     */
    function () {
        this.authenticationService.logout(null, true);
    };
    /**
     * @param {?} item
     * @return {?}
     */
    DefaultHeaderComponent.prototype.selectItem = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        if (this.menuItems) {
            this.menuItems.forEach((/**
             * @param {?} item
             * @return {?}
             */
            function (item) {
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
            function (item) {
                item.selected = false;
            }));
            this.selectedMenu.children[0].selected = true;
        }
    };
    /**
     * @param {?} item
     * @return {?}
     */
    DefaultHeaderComponent.prototype.getParentLink = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        if (!item.children || item.children.length == 0)
            return 'javascript:;';
        /** @type {?} */
        var currentItem = item.children[0];
        return currentItem.mainState ? "/" + currentItem.mainState + "/" + currentItem.state : "/" + currentItem.state;
    };
    /**
     * @param {?} item
     * @return {?}
     */
    DefaultHeaderComponent.prototype.getChildLink = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        return item.mainState ? "/" + item.mainState + "/" + item.state : "/" + item.state;
    };
    /**
     * @param {?} child
     * @return {?}
     */
    DefaultHeaderComponent.prototype.selectSubMenu = /**
     * @param {?} child
     * @return {?}
     */
    function (child) {
        if (!this.selectedMenu)
            return;
        if (this.selectedMenu.children) {
            this.selectedMenu.children.forEach((/**
             * @param {?} item
             * @return {?}
             */
            function (item) {
                item.selected = false;
            }));
        }
        child.selected = true;
    };
    /**
     * @private
     * @return {?}
     */
    DefaultHeaderComponent.prototype.registerEvents = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.initMenu();
        this._aggregatorService.subscribe(KeyConst.LoggedIn, (/**
         * @param {?} response
         * @return {?}
         */
        function (response) {
            _this.authenticationService.currentUser = response.user;
            _this.user = _this.authenticationService.currentUser;
            if (response.menuTabs) {
                _this.menuTabs = response.menuTabs;
            }
            _this.actionService.executeAsync((/**
             * @return {?}
             */
            function () {
                _this.toggleMenu();
                _this.setMenu();
            }));
        }));
    };
    /**
     * @private
     * @return {?}
     */
    DefaultHeaderComponent.prototype.initMenu = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.menuService.init(this.menuTabs, (/**
         * @return {?}
         */
        function () {
            _this.tabs = _this.menuService.getTabs();
            _this.currentUrl = _this.tabs[0].menu;
            _this.menuItems = _this.menuService.loadFirstTabItems(_this.currentUrl);
            _this.actionService.executeAsync((/**
             * @return {?}
             */
            function () {
                _this.isCollapsedSideBar = 'no-block';
            }));
            _this.setMenu();
        }), this.set);
    };
    /**
     * @private
     * @return {?}
     */
    DefaultHeaderComponent.prototype.setMenu = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.menuItems) {
            /** @type {?} */
            var url = this.router.url;
            this.menuItems.forEach((/**
             * @param {?} item
             * @return {?}
             */
            function (item) {
                if (item.children) {
                    item.children.forEach((/**
                     * @param {?} kid
                     * @return {?}
                     */
                    function (kid) {
                        /** @type {?} */
                        var state = kid.mainState ? kid.mainState : kid.state;
                        if (url.indexOf(state) > -1) {
                            _this.actionService.executeAsync((/**
                             * @return {?}
                             */
                            function () {
                                /** @type {?} */
                                var items = document.querySelectorAll(".top-item");
                                if (items && items.length > 0) {
                                    for (var i = 0; i < items.length; i++) {
                                        /** @type {?} */
                                        var href = ((/** @type {?} */ (items[i]))).href;
                                        if (href && href.toString().indexOf(state) > 0) {
                                            item.selected = true;
                                            _this.selectedMenu = item;
                                            /** @type {?} */
                                            var data = url.split('/');
                                            if (data && data.length > 0 && _this.selectedMenu.children) {
                                                /** @type {?} */
                                                var currentChild = _this.selectedMenu.children.find((/**
                                                 * @param {?} s
                                                 * @return {?}
                                                 */
                                                function (s) { return s.state == data[data.length - 1]; }));
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
    };
    DefaultHeaderComponent.decorators = [
        { type: Component, args: [{
                    selector: 'default-header',
                    template: "<nav class=\"navbar header-navbar pcoded-header header-workspace\"\r\n  [attr.pcoded-header-position]=\"layoutService.pcodedHeaderPosition\" [attr.header-theme]=\"layoutService.headerTheme\">\r\n  <div class=\"navbar-wrapper\">\r\n    <div class=\"navbar-container-right\">\r\n      <a *ngIf=\"user && (menuType == 'LEFT' || isMobile)\" #menu class=\"btn-show-hide-menu ml-1\" (click)=\"toggleMenu()\"\r\n        href=\"javascript:;\"><i class=\"fa fa-bars\" aria-hidden=\"true\"></i>\r\n      </a>\r\n    </div>\r\n    <div class=\"navbar-logo\" [attr.logo-theme]=\"layoutService.logoTheme\">\r\n      <a class=\"logo--wrapper\" [routerLink]=\"['/']\">\r\n        <ng-container *ngIf=\"logo\">\r\n          <img class=\"text-logo\" [src]=\"logo\" alt=\"\" [title]=\"title\">\r\n        </ng-container>\r\n      </a>\r\n    </div>\r\n    <ng-container *ngIf=\"!isMobile; else mobileActions\">\r\n      <div *ngIf=\"menuType == 'TOP' && user\" class=\"navbar-container menu-top\">\r\n        <ul class=\"nav-left\">\r\n          <li (click)=\"selectItem(menuItem)\" *ngFor=\"let menuItem of menuItems\">\r\n            <a class=\"top-item\" [ngClass]=\"{'active-menu': menuItem.selected}\"\r\n              [routerLink]=\"getParentLink(menuItem)\"><span class=\"{{menuItem?.icon}}\"></span> {{menuItem?.label}}</a>\r\n          </li>\r\n        </ul>\r\n      </div>\r\n      <div class=\"navbar-container ml-auto\">\r\n        <ul class=\"nav-left\">\r\n        </ul>\r\n        <ul class=\"nav-right\" [ngClass]=\"layoutService.isCollapsedMobile\">\r\n          <li *ngIf=\"user\">\r\n            <div class=\"row form search-bar form-inline\">\r\n              <div class=\"flex-custom\">\r\n                <div class=\"form-group search-input-wrapper\">\r\n                  <span class=\"search-icon\">\r\n                    <i class=\"fa fa-search\"></i>\r\n                  </span>\r\n                  <input spellcheck=\"false\" [(ngModel)]=\"filter\" type=\"text\" class=\"form-control search-input\"\r\n                    [placeholder]=\"'T\u00ECm ki\u1EBFm...'\">\r\n                  <span class=\"search-reset\" *ngIf=\"filter\">\r\n                    <i *ngIf=\"loading\" class=\"fa fa-spinner rotate-refresh\"></i>\r\n                    <i *ngIf=\"!loading\" class=\"fa fa-times-circle\" (click)=\"filter= ''\"></i>\r\n                  </span>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </li>\r\n          <li *ngIf=\"user\" class=\"header-notification\">\r\n            <a href=\"javascript:;\">\r\n              <i class=\"fa fa-bell bell icon-noti\"></i>\r\n              <span class=\"badge\">1</span>\r\n            </a>\r\n            <div class=\"notify--wrapper\">\r\n              <h6 class=\"m-b-0 text-font-13\">\r\n                <a href=\"javascript:;\" class=\"text-primary text-font-13\">Ch\u1EE9c n\u0103ng \u0111ang ho\u00E0n thi\u1EC7n...</a>\r\n              </h6>\r\n              <ul class=\"list-unstyled\">\r\n                <li class=\"w-100\" *ngFor=\"let notification of notifications\">\r\n                  <a href=\"javascript:;\">\r\n                    <p class=\"text-bold mb-1\">FW4C</p>\r\n                    <p class=\"time m-0\">\r\n                      <i class=\"icofont icofont-clock-time\"></i>25/10/2019\r\n                    </p>\r\n                  </a>\r\n                </li>\r\n              </ul>\r\n              <h6 class=\"text-center p-2 view-all-noti m-0\">\r\n                <a href=\"javascript:;\" class=\"text-primary text-font-13 link-view-more\">\r\n                  Xem t\u1EA5t c\u1EA3\r\n                </a>\r\n              </h6>\r\n            </div>\r\n          </li>\r\n          <li class=\"user-profile header-notification\" *ngIf=\"user\">\r\n            <a [routerLink]=\"['/']\">\r\n              <img [hidden]=\"!user?.image?.src\" [src]=\"user?.image?.src\" alt=\"\" srcset=\"\"\r\n                style=\"border: 2px solid #ffffff; background: #f8f8f8; width: auto; height: 25px; width: 25px; border-radius: 50%;\">\r\n              <span [hidden]=\"user?.image?.src\" class=\"ava\"\r\n                [attr.data-letters]=\"(user.lastName | slice:0:1) + (user.firstName | slice:0:1)\"></span>\r\n              <span style=\"font-weight: normal;\">{{user.fullName}}</span>\r\n              <i class=\"ti-angle-down\"></i>\r\n            </a>\r\n            <div class=\"user-list-option--wrapper\">\r\n              <ul class=\"show-notification profile-notification\">\r\n                <li class=\"p-0\">\r\n                  <a href=\"javascript:void(0)\"><i></i>T\u00E0i kho\u1EA3n</a>\r\n                </li>\r\n                <li class=\"p-0\" (click)=\"logout()\">\r\n                  <a href=\"javascript:void(0)\"><i></i>Tho\u00E1t</a>\r\n                </li>\r\n              </ul>\r\n            </div>\r\n          </li>\r\n        </ul>\r\n      </div>\r\n    </ng-container>\r\n  </div>\r\n  <div *ngIf=\"menuType == 'TOP' && !isMobile && user\" class=\"sub-top\">\r\n    <ul class=\"sub-items\">\r\n      <li style=\"padding: 10px;\">\r\n        <a [ngClass]=\"{'active-menu': child.selected}\" (click)=\"selectSubMenu(child)\"\r\n          *ngFor=\"let child of selectedMenu?.children\" [routerLink]=\"getChildLink(child)\"><span\r\n            class=\"{{child?.icon}}\"></span> {{child?.name}}</a>\r\n      </li>\r\n    </ul>\r\n  </div>\r\n</nav>\r\n<ng-template #mobileActions>\r\n  <div class=\"navbar-container-mobile ml-auto\">\r\n    <div class=\"header-notification d-flex align-items-center\">\r\n      <img [hidden]=\"!user?.image?.src\" [src]=\"user?.image?.src\" alt=\"\" srcset=\"\"\r\n        style=\" width:32px; border: 2px solid #ffffff; border-radius: 50%; background: #f8f8f8;\">\r\n      <span [hidden]=\"user?.image?.src\" class=\"ava\"\r\n        [attr.data-letters]=\"(user.lastName | slice:0:1) + (user.firstName | slice:0:1)\"></span>\r\n      <i class=\"text-white ti-angle-down\"></i>\r\n      <div class=\"user-list-option--wrapper\">\r\n        <ul class=\"show-notification profile-notification m-0\">\r\n          <li><a class=\"p-0\" [routerLink]=\"['/user-profile']\">H\u1ED3 s\u01A1 c\u00E1 nh\u00E2n</a></li>\r\n          <li><a href=\"javascript:void(0)\" (click)=\"logout()\"><i class=\"ti-layout-sidebar-left\"></i>Tho\u00E1t</a></li>\r\n        </ul>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</ng-template>",
                    styles: ["a{text-decoration:none}.header-notification .text-white{overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:1;-webkit-box-orient:vertical;white-space:normal}.header-notification .text-white.ti-angle-down{padding:0 8px;line-height:40px}span.ava[data-letters]:before{content:attr(data-letters);display:inline-block;font-size:1em;width:35px;height:35px;line-height:35px;text-align:center;border-radius:50%;background:#f8f8f8;vertical-align:middle;margin-right:.3em;color:#a9a9a9}.menu-top{margin-left:60px}.menu-top ul li a{font-weight:500;text-transform:uppercase;font-size:12px;border-bottom:3px solid #007bff;padding-left:0;padding-right:0}.menu-top ul li a:hover{border-bottom:3px solid #ff9500}.active-menu{border-bottom:3px solid #ff9500!important}.sub-top{background-color:#fff;min-height:32px;width:100%}.sub-items{text-align:center;margin-bottom:0}.sub-items li{font-size:12px;font-weight:500}.sub-items li a{padding:0;margin-right:15px;border-bottom:3px solid transparent}"]
                }] }
    ];
    /** @nocollapse */
    DefaultHeaderComponent.ctorParameters = function () { return [
        { type: DefaultLayoutService },
        { type: Router },
        { type: ActivatedRoute },
        { type: ActionService },
        { type: AggregatorService },
        { type: AuthenticationService },
        { type: MenuService },
        { type: AggregatorService }
    ]; };
    DefaultHeaderComponent.propDecorators = {
        notifications: [{ type: Input }],
        logo: [{ type: Input }],
        title: [{ type: Input }],
        menuType: [{ type: Input }],
        set: [{ type: Input }],
        menuTabs: [{ type: Input }],
        menu: [{ type: ViewChild, args: ['menu', { static: true },] }]
    };
    return DefaultHeaderComponent;
}());
export { DefaultHeaderComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1mdzRjLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvbGF5b3V0L2hlYWRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDeEUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDeEQsT0FBTyxFQUFFLE1BQU0sRUFBRSxjQUFjLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFHbEUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDMUUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDN0QsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBRXpELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUU5RDtJQXlCSSxnQ0FDVyxhQUFtQyxFQUNoQyxNQUFjLEVBQ2QsS0FBcUIsRUFDckIsYUFBNEIsRUFDNUIsaUJBQW9DLEVBQ3BDLHFCQUE0QyxFQUM1QyxXQUF3QixFQUMxQixrQkFBcUM7UUFQdEMsa0JBQWEsR0FBYixhQUFhLENBQXNCO1FBQ2hDLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUNyQixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ3BDLDBCQUFxQixHQUFyQixxQkFBcUIsQ0FBdUI7UUFDNUMsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDMUIsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFtQjtRQTFCakMsa0JBQWEsR0FBeUIs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QUdyQixXQUFXO2dCQUpYLGlCQUFpQjs7O2dDQWFyQixLQUFLO3VCQUNMLEtBQUs7d0JBQ0wsS0FBSzsyQkFDTCxLQUFLO3NCQUNMLEtBQUs7MkJBQ0wsS0FBSzt1QkFDTCxTQUFTLFNBQUMsTUFBTSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTs7SUErSXZDLDZCQUFDO0NBQUEsQUE1SkQsSUE0SkM7U0F0Slksc0JBQXNCOzs7SUFDL0IsK0NBQXlEOztJQUN6RCxzQ0FBNkI7O0lBQzdCLHVDQUE4Qjs7SUFDOUIsMENBQWlDOztJQUNqQyxxQ0FBZ0Q7O0lBQ2hELDBDQUF5Qzs7SUFDekMsc0NBQTZEOztJQUM3RCx5Q0FBZ0M7O0lBQ2hDLHdDQUFzQjs7SUFDdEIsc0NBQTJCOztJQUMzQiwwQ0FBeUI7O0lBQ3pCLDRDQUEwQjs7SUFDMUIsMkNBQStDOztJQUMvQyxvREFBa0M7O0lBQ2xDLDRDQUEwQjs7SUFDMUIsc0NBQW9FOztJQUNwRSw4Q0FBMkM7O0lBR3ZDLCtDQUEwQzs7Ozs7SUFDMUMsd0NBQXdCOzs7OztJQUN4Qix1Q0FBK0I7Ozs7O0lBQy9CLCtDQUFzQzs7Ozs7SUFDdEMsbURBQThDOzs7OztJQUM5Qyx1REFBc0Q7Ozs7O0lBQ3RELDZDQUFrQzs7Ozs7SUFDbEMsb0RBQTZDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgVmlld0NoaWxkLCBFbGVtZW50UmVmIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgRGVmYXVsdExheW91dFNlcnZpY2UgfSBmcm9tICcuL2xheW91dC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgUm91dGVyLCBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IEFjdGlvblNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQvc2VydmljZXMvYWN0aW9uLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBOb3RpZmljYXRpb25EZXRhaWwgfSBmcm9tICcuLi9zaGFyZWQvbW9kZWxzL25vdGlmaWNhdGlvbi5tb2RlbCc7XHJcbmltcG9ydCB7IFVzZXJWaWV3TW9kZWwsIEF1dGhlbnRpY2F0aW9uTG9naW5SZXNwb25zZSB9IGZyb20gJy4uL2F1dGgvYXV0aC5tb2RlbCc7XHJcbmltcG9ydCB7IEFnZ3JlZ2F0b3JTZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL3NlcnZpY2VzL2FnZ3JlZ2F0b3Iuc2VydmljZSc7XHJcbmltcG9ydCB7IEF1dGhlbnRpY2F0aW9uU2VydmljZSB9IGZyb20gJy4uL2F1dGgvYXV0aC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgS2V5Q29uc3QgfSBmcm9tICcuLi9zaGFyZWQvY29uc3RhbnRzL2tleS5jb25zdCc7XHJcbmltcG9ydCB7IE1lbnVUYWIsIEV4dGVuZGVkTWFpbk1lbnVHcm91cCwgTWVudUl0ZW0gfSBmcm9tICcuLi9zaGFyZWQvbW9kZWxzL2Jhc2UubW9kZWwnO1xyXG5pbXBvcnQgeyBNZW51U2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9zZXJ2aWNlcy9tZW51LnNlcnZpY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ2RlZmF1bHQtaGVhZGVyJyxcclxuICAgIHRlbXBsYXRlVXJsOiAnLi9oZWFkZXIuY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgc3R5bGVVcmxzOiBbJy4vaGVhZGVyLmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBEZWZhdWx0SGVhZGVyQ29tcG9uZW50IHtcclxuICAgIEBJbnB1dCgpIHB1YmxpYyBub3RpZmljYXRpb25zOiBOb3RpZmljYXRpb25EZXRhaWxbXSA9IFtdO1xyXG4gICAgQElucHV0KCkgcHVibGljIGxvZ286IHN0cmluZztcclxuICAgIEBJbnB1dCgpIHB1YmxpYyB0aXRsZTogc3RyaW5nO1xyXG4gICAgQElucHV0KCkgcHVibGljIG1lbnVUeXBlOiBzdHJpbmc7XHJcbiAgICBASW5wdXQoKSBwdWJsaWMgc2V0OiAocm9sZTogc3RyaW5nKSA9PiBNZW51SXRlbTtcclxuICAgIEBJbnB1dCgpIHB1YmxpYyBtZW51VGFiczogTWVudVRhYltdID0gW107XHJcbiAgICBAVmlld0NoaWxkKCdtZW51JywgeyBzdGF0aWM6IHRydWUgfSkgcHVibGljIG1lbnU6IEVsZW1lbnRSZWY7XHJcbiAgICBwdWJsaWMgbG9hZGluZzogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHVibGljIGZpbHRlcjogc3RyaW5nO1xyXG4gICAgcHVibGljIHVzZXI6IFVzZXJWaWV3TW9kZWw7XHJcbiAgICBwdWJsaWMgaXNNb2JpbGU6IGJvb2xlYW47XHJcbiAgICBwdWJsaWMgY3VycmVudFVybDogc3RyaW5nO1xyXG4gICAgcHVibGljIG1lbnVJdGVtczogRXh0ZW5kZWRNYWluTWVudUdyb3VwW10gPSBbXTtcclxuICAgIHB1YmxpYyBpc0NvbGxhcHNlZFNpZGVCYXI6IHN0cmluZztcclxuICAgIHB1YmxpYyBpc1N1cHBsaWVyID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgdGFiczogeyBuYW1lOiBzdHJpbmcsIG1lbnU6IHN0cmluZywgc3ViTmFtZTogc3RyaW5nIH1bXSA9IFtdO1xyXG4gICAgcHVibGljIHNlbGVjdGVkTWVudTogRXh0ZW5kZWRNYWluTWVudUdyb3VwO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHB1YmxpYyBsYXlvdXRTZXJ2aWNlOiBEZWZhdWx0TGF5b3V0U2VydmljZSxcclxuICAgICAgICBwcm90ZWN0ZWQgcm91dGVyOiBSb3V0ZXIsXHJcbiAgICAgICAgcHJvdGVjdGVkIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcclxuICAgICAgICBwcm90ZWN0ZWQgYWN0aW9uU2VydmljZTogQWN0aW9uU2VydmljZSxcclxuICAgICAgICBwcm90ZWN0ZWQgYWdncmVnYXRvclNlcnZpY2U6IEFnZ3JlZ2F0b3JTZXJ2aWNlLFxyXG4gICAgICAgIHByb3RlY3RlZCBhdXRoZW50aWNhdGlvblNlcnZpY2U6IEF1dGhlbnRpY2F0aW9uU2VydmljZSxcclxuICAgICAgICBwcm90ZWN0ZWQgbWVudVNlcnZpY2U6IE1lbnVTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgX2FnZ3JlZ2F0b3JTZXJ2aWNlOiBBZ2dyZWdhdG9yU2VydmljZVxyXG4gICAgKSB7IH1cclxuXHJcbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmlzTW9iaWxlID0gdGhpcy5hY3Rpb25TZXJ2aWNlLmlzTW9iaWxlKCk7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNNb2JpbGUpIHtcclxuICAgICAgICAgICAgdGhpcy50b2dnbGVNZW51KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghdGhpcy5hdXRoZW50aWNhdGlvblNlcnZpY2UuY3VycmVudFVzZXIpIHtcclxuICAgICAgICAgICAgdGhpcy50b2dnbGVNZW51KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnVzZXIgPSB0aGlzLmF1dGhlbnRpY2F0aW9uU2VydmljZS5jdXJyZW50VXNlcjtcclxuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnRzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHRvZ2dsZU1lbnUoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMubGF5b3V0U2VydmljZS52ZXJ0aWNhbEVmZmVjdCA9PSAnb3ZlcmxheScpIHtcclxuICAgICAgICAgICAgdGhpcy5sYXlvdXRTZXJ2aWNlLnZlcnRpY2FsRWZmZWN0ID0gJ3Nocmluayc7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5sYXlvdXRTZXJ2aWNlLnZlcnRpY2FsRWZmZWN0ID0gJ292ZXJsYXknO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbG9nb3V0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuYXV0aGVudGljYXRpb25TZXJ2aWNlLmxvZ291dChudWxsLCB0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2VsZWN0SXRlbShpdGVtOiBFeHRlbmRlZE1haW5NZW51R3JvdXApOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5tZW51SXRlbXMpIHtcclxuICAgICAgICAgICAgdGhpcy5tZW51SXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaXRlbS5zZWxlY3RlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaXRlbS5zZWxlY3RlZCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZE1lbnUgPSBpdGVtO1xyXG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkTWVudS5jaGlsZHJlbiAmJiB0aGlzLnNlbGVjdGVkTWVudS5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRNZW51LmNoaWxkcmVuLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgICAgIGl0ZW0uc2VsZWN0ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRNZW51LmNoaWxkcmVuWzBdLnNlbGVjdGVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFBhcmVudExpbmsoaXRlbTogRXh0ZW5kZWRNYWluTWVudUdyb3VwKTogc3RyaW5nIHtcclxuICAgICAgICBpZiAoIWl0ZW0uY2hpbGRyZW4gfHwgaXRlbS5jaGlsZHJlbi5sZW5ndGggPT0gMCkgcmV0dXJuICdqYXZhc2NyaXB0OjsnO1xyXG4gICAgICAgIHZhciBjdXJyZW50SXRlbSA9IGl0ZW0uY2hpbGRyZW5bMF07XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRJdGVtLm1haW5TdGF0ZSA/IGAvJHtjdXJyZW50SXRlbS5tYWluU3RhdGV9LyR7Y3VycmVudEl0ZW0uc3RhdGV9YCA6IGAvJHtjdXJyZW50SXRlbS5zdGF0ZX1gO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRDaGlsZExpbmsoaXRlbTogYW55KTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gaXRlbS5tYWluU3RhdGUgPyBgLyR7aXRlbS5tYWluU3RhdGV9LyR7aXRlbS5zdGF0ZX1gIDogYC8ke2l0ZW0uc3RhdGV9YDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2VsZWN0U3ViTWVudShjaGlsZDogTWVudUl0ZW0pOiB2b2lkIHtcclxuICAgICAgICBpZiAoIXRoaXMuc2VsZWN0ZWRNZW51KSByZXR1cm47XHJcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRNZW51LmNoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRNZW51LmNoaWxkcmVuLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgICAgIGl0ZW0uc2VsZWN0ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNoaWxkLnNlbGVjdGVkID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlZ2lzdGVyRXZlbnRzKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaW5pdE1lbnUoKTtcclxuICAgICAgICB0aGlzLl9hZ2dyZWdhdG9yU2VydmljZS5zdWJzY3JpYmUoS2V5Q29uc3QuTG9nZ2VkSW4sIChyZXNwb25zZTogQXV0aGVudGljYXRpb25Mb2dpblJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuYXV0aGVudGljYXRpb25TZXJ2aWNlLmN1cnJlbnRVc2VyID0gcmVzcG9uc2UudXNlcjtcclxuICAgICAgICAgICAgdGhpcy51c2VyID0gdGhpcy5hdXRoZW50aWNhdGlvblNlcnZpY2UuY3VycmVudFVzZXI7XHJcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5tZW51VGFicykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tZW51VGFicyA9IHJlc3BvbnNlLm1lbnVUYWJzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9uU2VydmljZS5leGVjdXRlQXN5bmMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50b2dnbGVNZW51KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldE1lbnUoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpbml0TWVudSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm1lbnVTZXJ2aWNlLmluaXQodGhpcy5tZW51VGFicywgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnRhYnMgPSB0aGlzLm1lbnVTZXJ2aWNlLmdldFRhYnMoKTtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50VXJsID0gdGhpcy50YWJzWzBdLm1lbnU7XHJcbiAgICAgICAgICAgIHRoaXMubWVudUl0ZW1zID0gdGhpcy5tZW51U2VydmljZS5sb2FkRmlyc3RUYWJJdGVtcyh0aGlzLmN1cnJlbnRVcmwpO1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvblNlcnZpY2UuZXhlY3V0ZUFzeW5jKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNDb2xsYXBzZWRTaWRlQmFyID0gJ25vLWJsb2NrJztcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0TWVudSgpO1xyXG4gICAgICAgIH0sIHRoaXMuc2V0KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldE1lbnUoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMubWVudUl0ZW1zKSB7XHJcbiAgICAgICAgICAgIHZhciB1cmwgPSB0aGlzLnJvdXRlci51cmw7XHJcbiAgICAgICAgICAgIHRoaXMubWVudUl0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5jaGlsZHJlbi5mb3JFYWNoKChraWQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN0YXRlID0ga2lkLm1haW5TdGF0ZSA/IGtpZC5tYWluU3RhdGUgOiBraWQuc3RhdGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh1cmwuaW5kZXhPZihzdGF0ZSkgPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25TZXJ2aWNlLmV4ZWN1dGVBc3luYygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi50b3AtaXRlbVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbXMgJiYgaXRlbXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGl0ZW1zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBocmVmID0gKDxhbnk+aXRlbXNbaV0pLmhyZWY7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaHJlZiAmJiBocmVmLnRvU3RyaW5nKCkuaW5kZXhPZihzdGF0ZSkgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5zZWxlY3RlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZE1lbnUgPSBpdGVtO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkYXRhID0gdXJsLnNwbGl0KCcvJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEgJiYgZGF0YS5sZW5ndGggPiAwICYmIHRoaXMuc2VsZWN0ZWRNZW51LmNoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjdXJyZW50Q2hpbGQgPSB0aGlzLnNlbGVjdGVkTWVudS5jaGlsZHJlbi5maW5kKHMgPT4gcy5zdGF0ZSA9PSBkYXRhW2RhdGEubGVuZ3RoIC0gMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudENoaWxkKSBjdXJyZW50Q2hpbGQuc2VsZWN0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=