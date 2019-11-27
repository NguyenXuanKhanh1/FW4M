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
import { RecommendationResponse } from '../shared/models/base.model';
import { MenuService } from '../shared/services/menu.service';
import { DataService } from '../shared/services/data.service';
var DefaultHeaderComponent = /** @class */ (function () {
    function DefaultHeaderComponent(layoutService, router, route, actionService, dataService, aggregatorService, authenticationService, menuService) {
        this.layoutService = layoutService;
        this.router = router;
        this.route = route;
        this.actionService = actionService;
        this.dataService = dataService;
        this.aggregatorService = aggregatorService;
        this.authenticationService = authenticationService;
        this.menuService = menuService;
        this.notifications = [];
        this.menuTabs = [];
        this.data = new RecommendationResponse();
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
        this.debound = this.dataService.initDebounceTime(this.data.deboundTime);
        this.registerEvents();
    };
    /**
     * @return {?}
     */
    DefaultHeaderComponent.prototype.search = /**
     * @return {?}
     */
    function () {
        this.data.show = false;
        this.data.all = false;
        this.aggregatorService.publish(KeyConst.Search, this.data);
    };
    /**
     * @return {?}
     */
    DefaultHeaderComponent.prototype.clear = /**
     * @return {?}
     */
    function () {
        this.data.keyword = '';
        this.data.show = false;
    };
    /**
     * @return {?}
     */
    DefaultHeaderComponent.prototype.focus = /**
     * @return {?}
     */
    function () {
        this.setTemplate();
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    DefaultHeaderComponent.prototype.setCommendation = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        if ($event.which == 13) {
            this.search();
        }
        else {
            this.setTemplate();
        }
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
        this.data.selectedMenu = this.selectedMenu.label;
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
        this.data.selectedMenu = child.name;
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
        this.aggregatorService.subscribe(KeyConst.LoggedIn, (/**
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
    DefaultHeaderComponent.prototype.setTemplate = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.data.keyword && this.data.keyword != '' && this.data.keyword != null) {
            this.data.show = true;
            this.debound.next((/**
             * @return {?}
             */
            function () { return _this.aggregatorService.publish(KeyConst.KeywordChanged, _this.data); }));
        }
        else
            this.data.show = false;
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
                                            _this.data.selectedMenu = item.label;
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
                                                if (currentChild) {
                                                    currentChild.selected = true;
                                                    _this.data.selectedMenu = currentChild.name;
                                                }
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
                    template: "<nav class=\"navbar header-navbar pcoded-header header-workspace\"\r\n  [attr.pcoded-header-position]=\"layoutService.pcodedHeaderPosition\" [attr.header-theme]=\"layoutService.headerTheme\">\r\n  <div class=\"navbar-wrapper\">\r\n    <div class=\"navbar-container-right\">\r\n      <a *ngIf=\"user && (menuType == 'LEFT' || isMobile)\" #menu class=\"btn-show-hide-menu ml-1\" (click)=\"toggleMenu()\"\r\n        href=\"javascript:;\"><i class=\"fa fa-bars\" aria-hidden=\"true\"></i>\r\n      </a>\r\n    </div>\r\n    <div class=\"navbar-logo\" [attr.logo-theme]=\"layoutService.logoTheme\">\r\n      <a class=\"logo--wrapper\" [routerLink]=\"['/']\">\r\n        <ng-container *ngIf=\"logo\">\r\n          <img class=\"text-logo\" [src]=\"logo\" alt=\"\" [title]=\"title\">\r\n        </ng-container>\r\n      </a>\r\n    </div>\r\n    <ng-container *ngIf=\"!isMobile; else mobileActions\">\r\n      <div *ngIf=\"menuType == 'TOP' && user\" class=\"navbar-container menu-top\">\r\n        <ul class=\"nav-left\">\r\n          <li (click)=\"selectItem(menuItem)\" *ngFor=\"let menuItem of menuItems\">\r\n            <a class=\"top-item\" [ngClass]=\"{'active-menu': menuItem.selected}\"\r\n              [routerLink]=\"getParentLink(menuItem)\"><span class=\"{{menuItem?.icon}}\"></span> {{menuItem?.label}}</a>\r\n          </li>\r\n        </ul>\r\n      </div>\r\n      <div class=\"navbar-container ml-auto\">\r\n        <ul class=\"nav-left\">\r\n        </ul>\r\n        <ul class=\"nav-right\" [ngClass]=\"layoutService.isCollapsedMobile\">\r\n          <li *ngIf=\"user\">\r\n            <div class=\"row form search-bar form-inline\">\r\n              <div class=\"flex-custom\">\r\n                <div class=\"form-group search-input-wrapper\">\r\n                  <span (click)=\"search()\" class=\"search-icon\">\r\n                    <i class=\"fa fa-search\"></i>\r\n                  </span>\r\n                  <input spellcheck=\"false\" (click)=\"focus()\" [(ngModel)]=\"data.keyword\"\r\n                    (keypress)=\"setCommendation($event)\" type=\"text\" class=\"form-control search-input\"\r\n                    [placeholder]=\"'T\u00ECm ki\u1EBFm...'\">\r\n                  <span class=\"search-reset\" *ngIf=\"data.keyword\">\r\n                    <i *ngIf=\"loading\" class=\"fa fa-spinner rotate-refresh\"></i>\r\n                    <i *ngIf=\"!loading\" class=\"fa fa-times-circle\" (click)=\"clear()\"></i>\r\n                  </span>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </li>\r\n          <li *ngIf=\"user\" class=\"header-notification\">\r\n            <a href=\"javascript:;\">\r\n              <i class=\"fa fa-bell bell icon-noti\"></i>\r\n              <span class=\"badge\">1</span>\r\n            </a>\r\n            <div class=\"notify--wrapper\">\r\n              <h6 class=\"m-b-0 text-font-13\">\r\n                <a href=\"javascript:;\" class=\"text-primary text-font-13\">Ch\u1EE9c n\u0103ng \u0111ang ho\u00E0n thi\u1EC7n...</a>\r\n              </h6>\r\n              <ul class=\"list-unstyled\">\r\n                <li class=\"w-100\" *ngFor=\"let notification of notifications\">\r\n                  <a href=\"javascript:;\">\r\n                    <p class=\"text-bold mb-1\">FW4C</p>\r\n                    <p class=\"time m-0\">\r\n                      <i class=\"icofont icofont-clock-time\"></i>25/10/2019\r\n                    </p>\r\n                  </a>\r\n                </li>\r\n              </ul>\r\n              <h6 class=\"text-center p-2 view-all-noti m-0\">\r\n                <a href=\"javascript:;\" class=\"text-primary text-font-13 link-view-more\">\r\n                  Xem t\u1EA5t c\u1EA3\r\n                </a>\r\n              </h6>\r\n            </div>\r\n          </li>\r\n          <li class=\"user-profile header-notification\" *ngIf=\"user\">\r\n            <a [routerLink]=\"['/']\">\r\n              <img [hidden]=\"!user?.image?.src\" [src]=\"user?.image?.src\" alt=\"\" srcset=\"\"\r\n                style=\"border: 2px solid #ffffff; background: #f8f8f8; width: auto; height: 25px; width: 25px; border-radius: 50%;\">\r\n              <span [hidden]=\"user?.image?.src\" class=\"ava\"\r\n                [attr.data-letters]=\"(user.lastName | slice:0:1) + (user.firstName | slice:0:1)\"></span>\r\n              <span style=\"font-weight: normal;\">{{user.fullName}}</span>\r\n              <i class=\"ti-angle-down\"></i>\r\n            </a>\r\n            <div class=\"user-list-option--wrapper\">\r\n              <ul class=\"show-notification profile-notification\">\r\n                <li class=\"p-0\">\r\n                  <a href=\"javascript:void(0)\"><i></i>T\u00E0i kho\u1EA3n</a>\r\n                </li>\r\n                <li class=\"p-0\" (click)=\"logout()\">\r\n                  <a href=\"javascript:void(0)\"><i></i>Tho\u00E1t</a>\r\n                </li>\r\n              </ul>\r\n            </div>\r\n          </li>\r\n        </ul>\r\n      </div>\r\n    </ng-container>\r\n  </div>\r\n  <div *ngIf=\"menuType == 'TOP' && !isMobile && user && !data.show\" class=\"sub-top\">\r\n    <ul class=\"sub-items\">\r\n      <li style=\"padding: 10px;\">\r\n        <a [ngClass]=\"{'active-menu': child.selected}\" (click)=\"selectSubMenu(child)\"\r\n          *ngFor=\"let child of selectedMenu?.children\" [routerLink]=\"getChildLink(child)\"><span\r\n            class=\"{{child?.icon}}\"></span> {{child?.name}}</a>\r\n      </li>\r\n    </ul>\r\n  </div>\r\n  <katana-recommendation [data]=\"data\"></katana-recommendation>\r\n</nav>\r\n<ng-template #mobileActions>\r\n  <div class=\"navbar-container-mobile ml-auto\">\r\n    <div class=\"header-notification d-flex align-items-center\">\r\n      <img [hidden]=\"!user?.image?.src\" [src]=\"user?.image?.src\" alt=\"\" srcset=\"\"\r\n        style=\" width:32px; border: 2px solid #ffffff; border-radius: 50%; background: #f8f8f8;\">\r\n      <span [hidden]=\"user?.image?.src\" class=\"ava\"\r\n        [attr.data-letters]=\"(user.lastName | slice:0:1) + (user.firstName | slice:0:1)\"></span>\r\n      <i class=\"text-white ti-angle-down\"></i>\r\n      <div class=\"user-list-option--wrapper\">\r\n        <ul class=\"show-notification profile-notification m-0\">\r\n          <li><a class=\"p-0\" [routerLink]=\"['/user-profile']\">H\u1ED3 s\u01A1 c\u00E1 nh\u00E2n</a></li>\r\n          <li><a href=\"javascript:void(0)\" (click)=\"logout()\"><i class=\"ti-layout-sidebar-left\"></i>Tho\u00E1t</a></li>\r\n        </ul>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</ng-template>",
                    styles: ["a{text-decoration:none}.header-notification .text-white{overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:1;-webkit-box-orient:vertical;white-space:normal}.header-notification .text-white.ti-angle-down{padding:0 8px;line-height:40px}span.ava[data-letters]:before{content:attr(data-letters);display:inline-block;font-size:1em;width:35px;height:35px;line-height:35px;text-align:center;border-radius:50%;background:#f8f8f8;vertical-align:middle;margin-right:.3em;color:#a9a9a9}.menu-top{margin-left:60px}.menu-top ul li a{font-weight:500;text-transform:uppercase;font-size:12px;border-bottom:2px solid #007bff;padding-left:0;padding-right:0}.menu-top ul li a:hover{border-bottom:2px solid #ff9500}.active-menu{border-bottom:2px solid #ff9500!important}.sub-top{background-color:#fff;min-height:32px;width:100%}.sub-items{text-align:center;margin-bottom:0}.sub-items li{font-size:12px;font-weight:500}.sub-items li a{padding:0;margin-right:15px;border-bottom:2px solid transparent}"]
                }] }
    ];
    /** @nocollapse */
    DefaultHeaderComponent.ctorParameters = function () { return [
        { type: DefaultLayoutService },
        { type: Router },
        { type: ActivatedRoute },
        { type: ActionService },
        { type: DataService },
        { type: AggregatorService },
        { type: AuthenticationService },
        { type: MenuService }
    ]; };
    DefaultHeaderComponent.propDecorators = {
        notifications: [{ type: Input }],
        logo: [{ type: Input }],
        title: [{ type: Input }],
        menuType: [{ type: Input }],
        set: [{ type: Input }],
        menuTabs: [{ type: Input }],
        data: [{ type: Input }],
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
    DefaultHeaderComponent.prototype.data;
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
    /**
     * @type {?}
     * @protected
     */
    DefaultHeaderComponent.prototype.debound;
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
    DefaultHeaderComponent.prototype.dataService;
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
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1mdzRjLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvbGF5b3V0L2hlYWRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDeEUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDeEQsT0FBTyxFQUFFLE1BQU0sRUFBRSxjQUFjLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFHbEUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDMUUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDN0QsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ3pELE9BQU8sRUFBNEMsc0JBQXNCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUMvRyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDOUQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBRzlEO0lBMkJJLGdDQUNXLGFBQW1DLEVBQ2hDLE1BQWMsRUFDZCxLQUFxQixFQUNyQixhQUE0QixFQUM1QixXQUF3QixFQUN4QixpQkFBb0MsRUFDcEMscUJBQTRDLEVBQzVDLFdBQXdCO1FBUDNCLGtCQUFhLEdBQWIsYUFBYSxDQUFzQjtRQUNoQyxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFDckIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsc0JBQWlCLEdBQWpCLGlCQUFpQixD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OztJQUMxQiwyQ0FBK0M7O0lBQy9DLG9EQUFrQzs7SUFDbEMsNENBQTBCOztJQUMxQixzQ0FBb0U7O0lBQ3BFLDhDQUEyQzs7Ozs7SUFDM0MseUNBQWdDOztJQUc1QiwrQ0FBMEM7Ozs7O0lBQzFDLHdDQUF3Qjs7Ozs7SUFDeEIsdUNBQStCOzs7OztJQUMvQiwrQ0FBc0M7Ozs7O0lBQ3RDLDZDQUFrQzs7Ozs7SUFDbEMsbURBQThDOzs7OztJQUM5Qyx1REFBc0Q7Ozs7O0lBQ3RELDZDQUFrQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IERlZmF1bHRMYXlvdXRTZXJ2aWNlIH0gZnJvbSAnLi9sYXlvdXQuc2VydmljZSc7XHJcbmltcG9ydCB7IFJvdXRlciwgQWN0aXZhdGVkUm91dGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBBY3Rpb25TZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL3NlcnZpY2VzL2FjdGlvbi5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTm90aWZpY2F0aW9uRGV0YWlsIH0gZnJvbSAnLi4vc2hhcmVkL21vZGVscy9ub3RpZmljYXRpb24ubW9kZWwnO1xyXG5pbXBvcnQgeyBVc2VyVmlld01vZGVsLCBBdXRoZW50aWNhdGlvbkxvZ2luUmVzcG9uc2UgfSBmcm9tICcuLi9hdXRoL2F1dGgubW9kZWwnO1xyXG5pbXBvcnQgeyBBZ2dyZWdhdG9yU2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9zZXJ2aWNlcy9hZ2dyZWdhdG9yLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBBdXRoZW50aWNhdGlvblNlcnZpY2UgfSBmcm9tICcuLi9hdXRoL2F1dGguc2VydmljZSc7XHJcbmltcG9ydCB7IEtleUNvbnN0IH0gZnJvbSAnLi4vc2hhcmVkL2NvbnN0YW50cy9rZXkuY29uc3QnO1xyXG5pbXBvcnQgeyBNZW51VGFiLCBFeHRlbmRlZE1haW5NZW51R3JvdXAsIE1lbnVJdGVtLCBSZWNvbW1lbmRhdGlvblJlc3BvbnNlIH0gZnJvbSAnLi4vc2hhcmVkL21vZGVscy9iYXNlLm1vZGVsJztcclxuaW1wb3J0IHsgTWVudVNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQvc2VydmljZXMvbWVudS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgRGF0YVNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQvc2VydmljZXMvZGF0YS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ2RlZmF1bHQtaGVhZGVyJyxcclxuICAgIHRlbXBsYXRlVXJsOiAnLi9oZWFkZXIuY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgc3R5bGVVcmxzOiBbJy4vaGVhZGVyLmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBEZWZhdWx0SGVhZGVyQ29tcG9uZW50IHtcclxuICAgIEBJbnB1dCgpIHB1YmxpYyBub3RpZmljYXRpb25zOiBOb3RpZmljYXRpb25EZXRhaWxbXSA9IFtdO1xyXG4gICAgQElucHV0KCkgcHVibGljIGxvZ286IHN0cmluZztcclxuICAgIEBJbnB1dCgpIHB1YmxpYyB0aXRsZTogc3RyaW5nO1xyXG4gICAgQElucHV0KCkgcHVibGljIG1lbnVUeXBlOiBzdHJpbmc7XHJcbiAgICBASW5wdXQoKSBwdWJsaWMgc2V0OiAocm9sZTogc3RyaW5nKSA9PiBNZW51SXRlbTtcclxuICAgIEBJbnB1dCgpIHB1YmxpYyBtZW51VGFiczogTWVudVRhYltdID0gW107XHJcbiAgICBASW5wdXQoKSBwdWJsaWMgZGF0YSA9IG5ldyBSZWNvbW1lbmRhdGlvblJlc3BvbnNlKCk7XHJcbiAgICBAVmlld0NoaWxkKCdtZW51JywgeyBzdGF0aWM6IHRydWUgfSkgcHVibGljIG1lbnU6IEVsZW1lbnRSZWY7XHJcbiAgICBwdWJsaWMgbG9hZGluZzogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHVibGljIGZpbHRlcjogc3RyaW5nO1xyXG4gICAgcHVibGljIHVzZXI6IFVzZXJWaWV3TW9kZWw7XHJcbiAgICBwdWJsaWMgaXNNb2JpbGU6IGJvb2xlYW47XHJcbiAgICBwdWJsaWMgY3VycmVudFVybDogc3RyaW5nO1xyXG4gICAgcHVibGljIG1lbnVJdGVtczogRXh0ZW5kZWRNYWluTWVudUdyb3VwW10gPSBbXTtcclxuICAgIHB1YmxpYyBpc0NvbGxhcHNlZFNpZGVCYXI6IHN0cmluZztcclxuICAgIHB1YmxpYyBpc1N1cHBsaWVyID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgdGFiczogeyBuYW1lOiBzdHJpbmcsIG1lbnU6IHN0cmluZywgc3ViTmFtZTogc3RyaW5nIH1bXSA9IFtdO1xyXG4gICAgcHVibGljIHNlbGVjdGVkTWVudTogRXh0ZW5kZWRNYWluTWVudUdyb3VwO1xyXG4gICAgcHJvdGVjdGVkIGRlYm91bmQ6IFN1YmplY3Q8YW55PjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwdWJsaWMgbGF5b3V0U2VydmljZTogRGVmYXVsdExheW91dFNlcnZpY2UsXHJcbiAgICAgICAgcHJvdGVjdGVkIHJvdXRlcjogUm91dGVyLFxyXG4gICAgICAgIHByb3RlY3RlZCByb3V0ZTogQWN0aXZhdGVkUm91dGUsXHJcbiAgICAgICAgcHJvdGVjdGVkIGFjdGlvblNlcnZpY2U6IEFjdGlvblNlcnZpY2UsXHJcbiAgICAgICAgcHJvdGVjdGVkIGRhdGFTZXJ2aWNlOiBEYXRhU2VydmljZSxcclxuICAgICAgICBwcm90ZWN0ZWQgYWdncmVnYXRvclNlcnZpY2U6IEFnZ3JlZ2F0b3JTZXJ2aWNlLFxyXG4gICAgICAgIHByb3RlY3RlZCBhdXRoZW50aWNhdGlvblNlcnZpY2U6IEF1dGhlbnRpY2F0aW9uU2VydmljZSxcclxuICAgICAgICBwcm90ZWN0ZWQgbWVudVNlcnZpY2U6IE1lbnVTZXJ2aWNlXHJcbiAgICApIHsgfVxyXG5cclxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaXNNb2JpbGUgPSB0aGlzLmFjdGlvblNlcnZpY2UuaXNNb2JpbGUoKTtcclxuICAgICAgICBpZiAodGhpcy5pc01vYmlsZSkge1xyXG4gICAgICAgICAgICB0aGlzLnRvZ2dsZU1lbnUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCF0aGlzLmF1dGhlbnRpY2F0aW9uU2VydmljZS5jdXJyZW50VXNlcikge1xyXG4gICAgICAgICAgICB0aGlzLnRvZ2dsZU1lbnUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMudXNlciA9IHRoaXMuYXV0aGVudGljYXRpb25TZXJ2aWNlLmN1cnJlbnRVc2VyO1xyXG4gICAgICAgIHRoaXMuZGVib3VuZCA9IHRoaXMuZGF0YVNlcnZpY2UuaW5pdERlYm91bmNlVGltZSh0aGlzLmRhdGEuZGVib3VuZFRpbWUpO1xyXG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudHMoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2VhcmNoKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZGF0YS5zaG93ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5kYXRhLmFsbCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuYWdncmVnYXRvclNlcnZpY2UucHVibGlzaChLZXlDb25zdC5TZWFyY2gsIHRoaXMuZGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsZWFyKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZGF0YS5rZXl3b3JkID0gJyc7XHJcbiAgICAgICAgdGhpcy5kYXRhLnNob3cgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZm9jdXMoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zZXRUZW1wbGF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRDb21tZW5kYXRpb24oJGV2ZW50KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCRldmVudC53aGljaCA9PSAxMykge1xyXG4gICAgICAgICAgICB0aGlzLnNlYXJjaCgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0VGVtcGxhdGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHRvZ2dsZU1lbnUoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMubGF5b3V0U2VydmljZS52ZXJ0aWNhbEVmZmVjdCA9PSAnb3ZlcmxheScpIHtcclxuICAgICAgICAgICAgdGhpcy5sYXlvdXRTZXJ2aWNlLnZlcnRpY2FsRWZmZWN0ID0gJ3Nocmluayc7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5sYXlvdXRTZXJ2aWNlLnZlcnRpY2FsRWZmZWN0ID0gJ292ZXJsYXknO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbG9nb3V0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuYXV0aGVudGljYXRpb25TZXJ2aWNlLmxvZ291dChudWxsLCB0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2VsZWN0SXRlbShpdGVtOiBFeHRlbmRlZE1haW5NZW51R3JvdXApOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5tZW51SXRlbXMpIHtcclxuICAgICAgICAgICAgdGhpcy5tZW51SXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaXRlbS5zZWxlY3RlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaXRlbS5zZWxlY3RlZCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZE1lbnUgPSBpdGVtO1xyXG4gICAgICAgIHRoaXMuZGF0YS5zZWxlY3RlZE1lbnUgPSB0aGlzLnNlbGVjdGVkTWVudS5sYWJlbDtcclxuICAgICAgICBpZiAodGhpcy5zZWxlY3RlZE1lbnUuY2hpbGRyZW4gJiYgdGhpcy5zZWxlY3RlZE1lbnUuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkTWVudS5jaGlsZHJlbi5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpdGVtLnNlbGVjdGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkTWVudS5jaGlsZHJlblswXS5zZWxlY3RlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRQYXJlbnRMaW5rKGl0ZW06IEV4dGVuZGVkTWFpbk1lbnVHcm91cCk6IHN0cmluZyB7XHJcbiAgICAgICAgaWYgKCFpdGVtLmNoaWxkcmVuIHx8IGl0ZW0uY2hpbGRyZW4ubGVuZ3RoID09IDApIHJldHVybiAnamF2YXNjcmlwdDo7JztcclxuICAgICAgICB2YXIgY3VycmVudEl0ZW0gPSBpdGVtLmNoaWxkcmVuWzBdO1xyXG4gICAgICAgIHJldHVybiBjdXJyZW50SXRlbS5tYWluU3RhdGUgPyBgLyR7Y3VycmVudEl0ZW0ubWFpblN0YXRlfS8ke2N1cnJlbnRJdGVtLnN0YXRlfWAgOiBgLyR7Y3VycmVudEl0ZW0uc3RhdGV9YDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0Q2hpbGRMaW5rKGl0ZW06IGFueSk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIGl0ZW0ubWFpblN0YXRlID8gYC8ke2l0ZW0ubWFpblN0YXRlfS8ke2l0ZW0uc3RhdGV9YCA6IGAvJHtpdGVtLnN0YXRlfWA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNlbGVjdFN1Yk1lbnUoY2hpbGQ6IE1lbnVJdGVtKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnNlbGVjdGVkTWVudSkgcmV0dXJuO1xyXG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkTWVudS5jaGlsZHJlbikge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkTWVudS5jaGlsZHJlbi5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpdGVtLnNlbGVjdGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjaGlsZC5zZWxlY3RlZCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5kYXRhLnNlbGVjdGVkTWVudSA9IGNoaWxkLm5hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZWdpc3RlckV2ZW50cygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmluaXRNZW51KCk7XHJcbiAgICAgICAgdGhpcy5hZ2dyZWdhdG9yU2VydmljZS5zdWJzY3JpYmUoS2V5Q29uc3QuTG9nZ2VkSW4sIChyZXNwb25zZTogQXV0aGVudGljYXRpb25Mb2dpblJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuYXV0aGVudGljYXRpb25TZXJ2aWNlLmN1cnJlbnRVc2VyID0gcmVzcG9uc2UudXNlcjtcclxuICAgICAgICAgICAgdGhpcy51c2VyID0gdGhpcy5hdXRoZW50aWNhdGlvblNlcnZpY2UuY3VycmVudFVzZXI7XHJcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5tZW51VGFicykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tZW51VGFicyA9IHJlc3BvbnNlLm1lbnVUYWJzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9uU2VydmljZS5leGVjdXRlQXN5bmMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50b2dnbGVNZW51KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldE1lbnUoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpbml0TWVudSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm1lbnVTZXJ2aWNlLmluaXQodGhpcy5tZW51VGFicywgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnRhYnMgPSB0aGlzLm1lbnVTZXJ2aWNlLmdldFRhYnMoKTtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50VXJsID0gdGhpcy50YWJzWzBdLm1lbnU7XHJcbiAgICAgICAgICAgIHRoaXMubWVudUl0ZW1zID0gdGhpcy5tZW51U2VydmljZS5sb2FkRmlyc3RUYWJJdGVtcyh0aGlzLmN1cnJlbnRVcmwpO1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvblNlcnZpY2UuZXhlY3V0ZUFzeW5jKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNDb2xsYXBzZWRTaWRlQmFyID0gJ25vLWJsb2NrJztcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0TWVudSgpO1xyXG4gICAgICAgIH0sIHRoaXMuc2V0KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldFRlbXBsYXRlKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLmRhdGEua2V5d29yZCAmJiB0aGlzLmRhdGEua2V5d29yZCAhPSAnJyAmJiB0aGlzLmRhdGEua2V5d29yZCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YS5zaG93ID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5kZWJvdW5kLm5leHQoKCkgPT4gdGhpcy5hZ2dyZWdhdG9yU2VydmljZS5wdWJsaXNoKEtleUNvbnN0LktleXdvcmRDaGFuZ2VkLCB0aGlzLmRhdGEpKTtcclxuICAgICAgICB9IGVsc2UgdGhpcy5kYXRhLnNob3cgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldE1lbnUoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMubWVudUl0ZW1zKSB7XHJcbiAgICAgICAgICAgIHZhciB1cmwgPSB0aGlzLnJvdXRlci51cmw7XHJcbiAgICAgICAgICAgIHRoaXMubWVudUl0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5jaGlsZHJlbi5mb3JFYWNoKChraWQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN0YXRlID0ga2lkLm1haW5TdGF0ZSA/IGtpZC5tYWluU3RhdGUgOiBraWQuc3RhdGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh1cmwuaW5kZXhPZihzdGF0ZSkgPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25TZXJ2aWNlLmV4ZWN1dGVBc3luYygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi50b3AtaXRlbVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbXMgJiYgaXRlbXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGl0ZW1zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBocmVmID0gKDxhbnk+aXRlbXNbaV0pLmhyZWY7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaHJlZiAmJiBocmVmLnRvU3RyaW5nKCkuaW5kZXhPZihzdGF0ZSkgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5zZWxlY3RlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhLnNlbGVjdGVkTWVudSA9IGl0ZW0ubGFiZWw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZE1lbnUgPSBpdGVtO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkYXRhID0gdXJsLnNwbGl0KCcvJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEgJiYgZGF0YS5sZW5ndGggPiAwICYmIHRoaXMuc2VsZWN0ZWRNZW51LmNoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjdXJyZW50Q2hpbGQgPSB0aGlzLnNlbGVjdGVkTWVudS5jaGlsZHJlbi5maW5kKHMgPT4gcy5zdGF0ZSA9PSBkYXRhW2RhdGEubGVuZ3RoIC0gMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudENoaWxkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50Q2hpbGQuc2VsZWN0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhLnNlbGVjdGVkTWVudSA9IGN1cnJlbnRDaGlsZC5uYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==