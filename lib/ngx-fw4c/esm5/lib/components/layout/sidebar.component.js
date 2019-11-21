/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultLayoutService } from './layout.service';
import { MenuService } from '../shared/services/menu.service';
import { ActionService } from '../shared/services/action.service';
var DefaultSidebarComponent = /** @class */ (function () {
    function DefaultSidebarComponent(workspaceLayoutService, route, router, menuService, actionService) {
        this.workspaceLayoutService = workspaceLayoutService;
        this.route = route;
        this.router = router;
        this.menuService = menuService;
        this.actionService = actionService;
        this.menuTabs = [];
        this.change = new EventEmitter();
        this.menuItems = [];
        this.collapsedItems = [];
        this.isSupplier = false;
        this.tabs = [];
        this.isPageLoad = false;
    }
    /**
     * @return {?}
     */
    DefaultSidebarComponent.prototype.ngOnChanges = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.actionService.executeAsync((/**
         * @return {?}
         */
        function () {
            _this.menuService.init(_this.menuTabs, (/**
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
                if (_this.menuItems) {
                    /** @type {?} */
                    var url = _this.router.url;
                    _this.menuItems.forEach((/**
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
                                        var items = document.querySelectorAll(".pcoded-navigatio-lavel");
                                        if (items && items.length > 0) {
                                            for (var i = 0; i < items.length; i++) {
                                                /** @type {?} */
                                                var href = ((/** @type {?} */ (items[i]))).href;
                                                if (href && href.toString().indexOf(state) > 0) {
                                                    _this.selectItem({
                                                        target: items[i]
                                                    }, kid);
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
            }), _this.set);
        }));
    };
    /**
     * @return {?}
     */
    DefaultSidebarComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (!this.navigateTo) {
            this.navigateTo = (/**
             * @param {?} menu
             * @param {?} router
             * @return {?}
             */
            function (menu, router) {
                router.navigate(['/', menu, 'dashboard']);
            });
        }
        this.isMobile = this.actionService.isMobile();
        if (this.isMobile) {
            if (this.workspaceLayoutService.verticalEffect == 'overlay') {
                this.workspaceLayoutService.verticalEffect = 'shrink';
            }
            else {
                this.workspaceLayoutService.verticalEffect = 'overlay';
            }
        }
    };
    /**
     * @return {?}
     */
    DefaultSidebarComponent.prototype.toggleMenu = /**
     * @return {?}
     */
    function () {
        if (this.isMobile && this.menuType == 'LEFT') {
            if (this.workspaceLayoutService.verticalEffect == 'overlay') {
                this.workspaceLayoutService.verticalEffect = 'shrink';
            }
            else {
                this.workspaceLayoutService.verticalEffect = 'overlay';
            }
        }
    };
    /**
     * @return {?}
     */
    DefaultSidebarComponent.prototype.removeActiveStateNavigationMenu = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var navigationLevelArr = document.querySelectorAll(".pcoded-left-item--wrapper .pcoded-navigatio-lavel");
        for (var i = 0; i < navigationLevelArr.length; i++) {
            navigationLevelArr[i].classList.remove("active");
        }
        /** @type {?} */
        var subMenuLevelArr = document.querySelectorAll(".pcoded-left-item--wrapper .pcoded-left-item");
        for (var i = 0; i < subMenuLevelArr.length; i++) {
            subMenuLevelArr[i].classList.remove("active");
        }
        /** @type {?} */
        var mainContentWrapper = document.querySelector(".pcoded-main-container .pcoded-content");
        mainContentWrapper.classList.remove("active");
    };
    /**
     * @param {?} group
     * @param {?} $event
     * @return {?}
     */
    DefaultSidebarComponent.prototype.toggleGroup = /**
     * @param {?} group
     * @param {?} $event
     * @return {?}
     */
    function (group, $event) {
        if (event != null || event != undefined) {
            /** @type {?} */
            var target = $event.target || $event.srcElement || $event.currentTarget;
            /** @type {?} */
            var curNavigationLevel = target.closest(".pcoded-navigatio-lavel");
            if (curNavigationLevel.classList.contains("active")) {
                this.removeActiveStateNavigationMenu();
            }
            else {
                this.removeActiveStateNavigationMenu();
                /** @type {?} */
                var listChildrenItemInTarget = target.closest(".pcoded-left-item--wrapper").children;
                for (var i = 0; i < listChildrenItemInTarget.length; i++) {
                    if (listChildrenItemInTarget[i].classList.contains("pcoded-left-item")) {
                        listChildrenItemInTarget[i].classList.add("active");
                    }
                }
                target.closest(".pcoded-navigatio-lavel").classList.toggle("active");
                /** @type {?} */
                var mainContentWrapper = document.querySelector(".pcoded-main-container .pcoded-content");
                mainContentWrapper.classList.add("active");
            }
        }
        /** @type {?} */
        var index = this.collapsedItems.indexOf(group);
        if (index >= 0) {
            this.collapsedItems.splice(index, 1);
        }
        else {
            this.collapsedItems.push(group);
        }
    };
    /**
     * @param {?} group
     * @return {?}
     */
    DefaultSidebarComponent.prototype.isGroupCollapsed = /**
     * @param {?} group
     * @return {?}
     */
    function (group) {
        return this.collapsedItems.indexOf(group) >= 0;
    };
    /**
     * @return {?}
     */
    DefaultSidebarComponent.prototype.toggleOpenedSidebar = /**
     * @return {?}
     */
    function () {
        this.isCollapsedSideBar = this.isCollapsedSideBar === 'yes-block' ? 'no-block' : 'yes-block';
    };
    /**
     * @param {?} menu
     * @return {?}
     */
    DefaultSidebarComponent.prototype.loadMenu = /**
     * @param {?} menu
     * @return {?}
     */
    function (menu) {
        this.menuItems = this.menuService.loadMenuItems(menu);
        this.currentUrl = menu.toLocaleLowerCase();
        this.navigateTo(this.currentUrl, this.router);
    };
    /**
     * @param {?} $event
     * @param {?} item
     * @return {?}
     */
    DefaultSidebarComponent.prototype.selectItem = /**
     * @param {?} $event
     * @param {?} item
     * @return {?}
     */
    function ($event, item) {
        /** @type {?} */
        var naviLevelAll = document.querySelectorAll(".pcoded-navigatio-lavel");
        for (var i = 0; i < naviLevelAll.length; i++) {
            naviLevelAll[i].classList.remove("active");
        }
        /** @type {?} */
        var target = $event.target || $event.srcElement || $event.currentTarget;
        target.closest(".pcoded-left-item--wrapper").classList.add("active");
        /** @type {?} */
        var listChildrenItemInTarget = target.closest(".pcoded-left-item--wrapper").children;
        for (var i = 0; i < listChildrenItemInTarget.length; i++) {
            if (listChildrenItemInTarget[i].classList.contains("pcoded-navigatio-lavel")) {
                listChildrenItemInTarget[i].classList.add("active");
            }
        }
        this.changeItem(item);
    };
    /**
     * @param {?} item
     * @return {?}
     */
    DefaultSidebarComponent.prototype.changeItem = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        var _this = this;
        this.actionService.changeItem(item, this.menuTabs, (/**
         * @param {?} items
         * @return {?}
         */
        function (items) {
            _this.change.emit(items);
        }));
    };
    DefaultSidebarComponent.decorators = [
        { type: Component, args: [{
                    selector: 'default-sidebar',
                    template: "<nav id=\"main_navbar\" class=\"pcoded-navbar workspace-side-bar\"\r\n    (clickOutside)=\"workspaceLayoutService.onClickedOutside($event)\" [exclude]=\"'#mobile-collapse'\"\r\n    [attr.pcoded-header-position]=\"workspaceLayoutService.pcodedHeaderPosition\"\r\n    [attr.navbar-theme]=\"workspaceLayoutService.navBarTheme\"\r\n    [attr.active-item-theme]=\"workspaceLayoutService.activeItemTheme\" sub-item-theme=\"theme2\" active-item-style=\"style0\"\r\n    [attr.pcoded-navbar-position]=\"workspaceLayoutService.pcodedSidebarPosition\">\r\n    <div class=\"pcoded-inner-navbar main-menu o-hidden pcoded-inner-navbar-workspace\" cAccordion>\r\n        <div width=\"100%\" height=\"calc(100% - 40px)\" size=\"4px\" color=\"#fff\" opacity=\"0.3\" allowPageScroll=\"false\">\r\n            <ul class=\"nav\">\r\n                <li class=\"nav-item\" *ngFor=\"let item of tabs; index as i\"\r\n                    [ngClass]=\"this.currentUrl.toLowerCase() === item.menu.toLowerCase() ? 'active-menu':''\">\r\n                    <a class=\"nav-link\" href=\"javascript:void(0);\" (click)=\"loadMenu(item.menu)\">\r\n                        <span>{{item.subName}}</span>\r\n                    </a>\r\n                </li>\r\n            </ul>\r\n            <div (mouseover)=\"clicked = false\" *ngFor=\"let asideItems of menuItems ; index as i\"\r\n                [ngStyle]=\"{'margin-top': i == 0 ? '1rem': '0'}\" class=\"d-color pcoded-left-item--wrapper\">\r\n                <a class=\"pcoded-navigatio-lavel d-flex align-items-center\" menu-title-theme=\"theme5\"\r\n                    href=\"javascript:void(0)\"\r\n                    routerLink=\"/{{asideItems?.children[0]?.mainState}}/{{asideItems?.children[0]?.state}}\"\r\n                    (click)=\"selectItem($event, asideItems?.children[0])\"\r\n                    *ngIf=\"asideItems.label || menuItems.length > 0\">\r\n                    <span class=\"pcoded-micon\" title=\"{{asideItems.label}}\">\r\n                        <i class=\"{{ asideItems.icon }}\"></i>\r\n                    </span>\r\n                    <span>{{asideItems.label}}</span>\r\n                    <i [hidden]=\"asideItems.children.length == 1\" class=\"show-sub icofont-thin-right icofont\"></i>\r\n                </a>\r\n                <ul *ngIf=\"asideItems.children.length > 1\" (mouseup)=\"clicked = true\" [hidden]=\"clicked\"\r\n                    class=\"pcoded-item pcoded-left-item\" item-border=\"true\" item-border-style=\"none\"\r\n                    subitem-border=\"true\" katanaAccordionLink>\r\n                    <ng-template ngFor let-asideItem [ngForOf]=\"asideItems.children\">\r\n                        <li [routerLinkActive]=\"['active']\" *ngIf=\"asideItem.type === 'link'\" katanaAccordionLink\r\n                            group=\"{{asideItem.state}}\" class=\"pcoded-left-item-child\" (click)=\"toggleMenu()\">\r\n                            <a routerLink=\"/{{asideItem.mainState}}/{{asideItem.state}}\"\r\n                                target=\"{{asideItem.target ? '_blank' : '_self'}}\" katanaAccordionToggle\r\n                                *ngIf=\"asideItem.mainState; else mainContent\"\r\n                                (click)=\"selectItem($event, asideItem)\">\r\n                                <span class=\"pcoded-micon\">\r\n                                    <i class=\"{{ asideItem.icon }}\"></i>\r\n                                    <b>{{ asideItem.shortLabel }}</b>\r\n                                </span>\r\n                                <span class=\"pcoded-mtext\">{{ asideItem.name }}</span>\r\n                            </a>\r\n                            <ng-template #mainContent>\r\n                                <a [routerLink]=\"[asideItem.state]\" target=\"{{asideItem.target ? '_blank' : '_self'}}\"\r\n                                    cAccordionToggle>\r\n                                    <span class=\"pcoded-micon\">\r\n                                        <i class=\"{{ asideItem.icon }}\"></i>\r\n                                        <b>{{ asideItem.shortLabel }}</b>\r\n                                    </span>\r\n                                    <span class=\"pcoded-mtext\">{{ asideItem.name }}</span>\r\n                                    <span *ngFor=\"let asideBadge of asideItem.badge\"\r\n                                        class=\"pcoded-badge label label-{{ asideBadge.type }}\">{{asideBadge.value}}</span>\r\n                                    <span class=\"pcoded-mcaret\"></span>\r\n                                </a>\r\n                            </ng-template>\r\n                        </li>\r\n                    </ng-template>\r\n                </ul>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</nav>\r\n<div class=\"back-drop\" (click)=\"toggleMenu()\"></div>",
                    styles: [".back-drop{display:none}@media (max-width:1024px){.back-drop{background:#000;opacity:.2;position:fixed;width:100%;height:100%;z-index:9}}"]
                }] }
    ];
    /** @nocollapse */
    DefaultSidebarComponent.ctorParameters = function () { return [
        { type: DefaultLayoutService },
        { type: ActivatedRoute },
        { type: Router },
        { type: MenuService },
        { type: ActionService }
    ]; };
    DefaultSidebarComponent.propDecorators = {
        menuTabs: [{ type: Input }],
        navigateTo: [{ type: Input }],
        set: [{ type: Input }],
        menuType: [{ type: Input }],
        setActive: [{ type: Input }],
        change: [{ type: Output }]
    };
    return DefaultSidebarComponent;
}());
export { DefaultSidebarComponent };
if (false) {
    /** @type {?} */
    DefaultSidebarComponent.prototype.menuTabs;
    /** @type {?} */
    DefaultSidebarComponent.prototype.navigateTo;
    /** @type {?} */
    DefaultSidebarComponent.prototype.set;
    /** @type {?} */
    DefaultSidebarComponent.prototype.menuType;
    /** @type {?} */
    DefaultSidebarComponent.prototype.setActive;
    /** @type {?} */
    DefaultSidebarComponent.prototype.change;
    /** @type {?} */
    DefaultSidebarComponent.prototype.currentUrl;
    /** @type {?} */
    DefaultSidebarComponent.prototype.menuItems;
    /** @type {?} */
    DefaultSidebarComponent.prototype.isCollapsedSideBar;
    /** @type {?} */
    DefaultSidebarComponent.prototype.collapsedItems;
    /** @type {?} */
    DefaultSidebarComponent.prototype.isSupplier;
    /** @type {?} */
    DefaultSidebarComponent.prototype.tabs;
    /** @type {?} */
    DefaultSidebarComponent.prototype.carouselTile;
    /** @type {?} */
    DefaultSidebarComponent.prototype.isPageLoad;
    /** @type {?} */
    DefaultSidebarComponent.prototype.isMobile;
    /** @type {?} */
    DefaultSidebarComponent.prototype.clicked;
    /** @type {?} */
    DefaultSidebarComponent.prototype.workspaceLayoutService;
    /**
     * @type {?}
     * @protected
     */
    DefaultSidebarComponent.prototype.route;
    /**
     * @type {?}
     * @protected
     */
    DefaultSidebarComponent.prototype.router;
    /**
     * @type {?}
     * @protected
     */
    DefaultSidebarComponent.prototype.menuService;
    /**
     * @type {?}
     * @protected
     */
    DefaultSidebarComponent.prototype.actionService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZWJhci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZnc0Yy8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2xheW91dC9zaWRlYmFyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLFlBQVksRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUMxRixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUU5RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFFbEU7SUF3QkUsaUNBQ1Msc0JBQTRDLEVBQ3pDLEtBQXFCLEVBQ3JCLE1BQWMsRUFDZCxXQUF3QixFQUN4QixhQUE0QjtRQUovQiwyQkFBc0IsR0FBdEIsc0JBQXNCLENBQXNCO1FBQ3pDLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQ3JCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQXRCeEIsYUFBUSxHQUFjLEVBQUUsQ0FBQztRQUt4QixXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQWdCLENBQUM7UUFFcEQsY0FBUyxHQUE0QixFQUFFLENBQUM7UUFFeEMsbUJBQWMsR0FBNEIsRUFBRSxDQUFDO1FBQzdDLGVBQVUsR0FBRyxLQUFLLENBQUM7UUFDbkIsU0FBSSxHQUFzRCxFQUFFLENBQUM7UUFFN0QsZUFBVSxHQUFZLEtBQUssQ0FBQztJQVUvQixDQUFDOzs7O0lBRUwsNkNBQVc7OztJQUFYO1FBQUEsaUJBcUNDO1FBcENDLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWTs7O1FBQUM7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TTs7SUFtS1QsOEJBQUM7Q0FBQSxBQS9LRCxJQStLQztTQXpLWSx1QkFBdUI7OztJQUNsQywyQ0FBeUM7O0lBQ3pDLDZDQUFtRTs7SUFDbkUsc0NBQWdEOztJQUNoRCwyQ0FBaUM7O0lBQ2pDLDRDQUFtQzs7SUFDbkMseUNBQTJEOztJQUMzRCw2Q0FBMEI7O0lBQzFCLDRDQUErQzs7SUFDL0MscURBQWtDOztJQUNsQyxpREFBb0Q7O0lBQ3BELDZDQUEwQjs7SUFDMUIsdUNBQW9FOztJQUNwRSwrQ0FBeUI7O0lBQ3pCLDZDQUFtQzs7SUFDbkMsMkNBQXlCOztJQUN6QiwwQ0FBd0I7O0lBR3RCLHlEQUFtRDs7Ozs7SUFDbkQsd0NBQStCOzs7OztJQUMvQix5Q0FBd0I7Ozs7O0lBQ3hCLDhDQUFrQzs7Ozs7SUFDbEMsZ0RBQXNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgT25DaGFuZ2VzIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IERlZmF1bHRMYXlvdXRTZXJ2aWNlIH0gZnJvbSAnLi9sYXlvdXQuc2VydmljZSc7XHJcbmltcG9ydCB7IE1lbnVTZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL3NlcnZpY2VzL21lbnUuc2VydmljZSc7XHJcbmltcG9ydCB7IEV4dGVuZGVkTWFpbk1lbnVHcm91cCwgTWVudVRhYiwgTWVudUl0ZW0sIEJyZWFkY3J1bWIgfSBmcm9tICcuLi9zaGFyZWQvbW9kZWxzL2Jhc2UubW9kZWwnO1xyXG5pbXBvcnQgeyBBY3Rpb25TZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL3NlcnZpY2VzL2FjdGlvbi5zZXJ2aWNlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnZGVmYXVsdC1zaWRlYmFyJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vc2lkZWJhci5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vc2lkZWJhci5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgRGVmYXVsdFNpZGViYXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XHJcbiAgQElucHV0KCkgcHVibGljIG1lbnVUYWJzOiBNZW51VGFiW10gPSBbXTtcclxuICBASW5wdXQoKSBwdWJsaWMgbmF2aWdhdGVUbzogKG1lbnU6IHN0cmluZywgcm91dGVyOiBSb3V0ZXIpID0+IHZvaWQ7XHJcbiAgQElucHV0KCkgcHVibGljIHNldDogKHJvbGU6IHN0cmluZykgPT4gTWVudUl0ZW07XHJcbiAgQElucHV0KCkgcHVibGljIG1lbnVUeXBlOiBzdHJpbmc7XHJcbiAgQElucHV0KCkgcHVibGljIHNldEFjdGl2ZTogYm9vbGVhbjtcclxuICBAT3V0cHV0KCkgcHVibGljIGNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8QnJlYWRjcnVtYltdPigpO1xyXG4gIHB1YmxpYyBjdXJyZW50VXJsOiBzdHJpbmc7XHJcbiAgcHVibGljIG1lbnVJdGVtczogRXh0ZW5kZWRNYWluTWVudUdyb3VwW10gPSBbXTtcclxuICBwdWJsaWMgaXNDb2xsYXBzZWRTaWRlQmFyOiBzdHJpbmc7XHJcbiAgcHVibGljIGNvbGxhcHNlZEl0ZW1zOiBFeHRlbmRlZE1haW5NZW51R3JvdXBbXSA9IFtdO1xyXG4gIHB1YmxpYyBpc1N1cHBsaWVyID0gZmFsc2U7XHJcbiAgcHVibGljIHRhYnM6IHsgbmFtZTogc3RyaW5nLCBtZW51OiBzdHJpbmcsIHN1Yk5hbWU6IHN0cmluZyB9W10gPSBbXTtcclxuICBwdWJsaWMgY2Fyb3VzZWxUaWxlOiBhbnk7XHJcbiAgcHVibGljIGlzUGFnZUxvYWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBwdWJsaWMgaXNNb2JpbGU6IGJvb2xlYW47XHJcbiAgcHVibGljIGNsaWNrZWQ6IGJvb2xlYW47XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHVibGljIHdvcmtzcGFjZUxheW91dFNlcnZpY2U6IERlZmF1bHRMYXlvdXRTZXJ2aWNlLFxyXG4gICAgcHJvdGVjdGVkIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcclxuICAgIHByb3RlY3RlZCByb3V0ZXI6IFJvdXRlcixcclxuICAgIHByb3RlY3RlZCBtZW51U2VydmljZTogTWVudVNlcnZpY2UsXHJcbiAgICBwcm90ZWN0ZWQgYWN0aW9uU2VydmljZTogQWN0aW9uU2VydmljZVxyXG4gICkgeyB9XHJcblxyXG4gIG5nT25DaGFuZ2VzKCk6IHZvaWQge1xyXG4gICAgdGhpcy5hY3Rpb25TZXJ2aWNlLmV4ZWN1dGVBc3luYygoKSA9PiB7XHJcbiAgICAgIHRoaXMubWVudVNlcnZpY2UuaW5pdCh0aGlzLm1lbnVUYWJzLCAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy50YWJzID0gdGhpcy5tZW51U2VydmljZS5nZXRUYWJzKCk7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50VXJsID0gdGhpcy50YWJzWzBdLm1lbnU7XHJcbiAgICAgICAgdGhpcy5tZW51SXRlbXMgPSB0aGlzLm1lbnVTZXJ2aWNlLmxvYWRGaXJzdFRhYkl0ZW1zKHRoaXMuY3VycmVudFVybCk7XHJcbiAgICAgICAgdGhpcy5hY3Rpb25TZXJ2aWNlLmV4ZWN1dGVBc3luYygoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmlzQ29sbGFwc2VkU2lkZUJhciA9ICduby1ibG9jayc7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKHRoaXMubWVudUl0ZW1zKSB7XHJcbiAgICAgICAgICB2YXIgdXJsID0gdGhpcy5yb3V0ZXIudXJsO1xyXG4gICAgICAgICAgdGhpcy5tZW51SXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoaXRlbS5jaGlsZHJlbikge1xyXG4gICAgICAgICAgICAgIGl0ZW0uY2hpbGRyZW4uZm9yRWFjaCgoa2lkKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3RhdGUgPSBraWQubWFpblN0YXRlID8ga2lkLm1haW5TdGF0ZSA6IGtpZC5zdGF0ZTtcclxuICAgICAgICAgICAgICAgIGlmICh1cmwuaW5kZXhPZihzdGF0ZSkgPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLmFjdGlvblNlcnZpY2UuZXhlY3V0ZUFzeW5jKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnBjb2RlZC1uYXZpZ2F0aW8tbGF2ZWxcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW1zICYmIGl0ZW1zLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaHJlZiA9ICg8YW55Pml0ZW1zW2ldKS5ocmVmO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaHJlZiAmJiBocmVmLnRvU3RyaW5nKCkuaW5kZXhPZihzdGF0ZSkgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RJdGVtKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldDogaXRlbXNbaV1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBraWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LCB0aGlzLnNldCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgaWYgKCF0aGlzLm5hdmlnYXRlVG8pIHtcclxuICAgICAgdGhpcy5uYXZpZ2F0ZVRvID0gKG1lbnU6IHN0cmluZywgcm91dGVyOiBSb3V0ZXIpID0+IHtcclxuICAgICAgICByb3V0ZXIubmF2aWdhdGUoWycvJywgbWVudSwgJ2Rhc2hib2FyZCddKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy5pc01vYmlsZSA9IHRoaXMuYWN0aW9uU2VydmljZS5pc01vYmlsZSgpO1xyXG4gICAgaWYgKHRoaXMuaXNNb2JpbGUpIHtcclxuICAgICAgaWYgKHRoaXMud29ya3NwYWNlTGF5b3V0U2VydmljZS52ZXJ0aWNhbEVmZmVjdCA9PSAnb3ZlcmxheScpIHtcclxuICAgICAgICB0aGlzLndvcmtzcGFjZUxheW91dFNlcnZpY2UudmVydGljYWxFZmZlY3QgPSAnc2hyaW5rJztcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLndvcmtzcGFjZUxheW91dFNlcnZpY2UudmVydGljYWxFZmZlY3QgPSAnb3ZlcmxheSc7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyB0b2dnbGVNZW51KCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuaXNNb2JpbGUgJiYgdGhpcy5tZW51VHlwZSA9PSAnTEVGVCcpIHtcclxuICAgICAgaWYgKHRoaXMud29ya3NwYWNlTGF5b3V0U2VydmljZS52ZXJ0aWNhbEVmZmVjdCA9PSAnb3ZlcmxheScpIHtcclxuICAgICAgICB0aGlzLndvcmtzcGFjZUxheW91dFNlcnZpY2UudmVydGljYWxFZmZlY3QgPSAnc2hyaW5rJztcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLndvcmtzcGFjZUxheW91dFNlcnZpY2UudmVydGljYWxFZmZlY3QgPSAnb3ZlcmxheSc7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyByZW1vdmVBY3RpdmVTdGF0ZU5hdmlnYXRpb25NZW51KCk6IHZvaWQge1xyXG4gICAgbGV0IG5hdmlnYXRpb25MZXZlbEFyciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucGNvZGVkLWxlZnQtaXRlbS0td3JhcHBlciAucGNvZGVkLW5hdmlnYXRpby1sYXZlbFwiKTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmF2aWdhdGlvbkxldmVsQXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIG5hdmlnYXRpb25MZXZlbEFycltpXS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgfVxyXG4gICAgbGV0IHN1Yk1lbnVMZXZlbEFyciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucGNvZGVkLWxlZnQtaXRlbS0td3JhcHBlciAucGNvZGVkLWxlZnQtaXRlbVwiKTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3ViTWVudUxldmVsQXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIHN1Yk1lbnVMZXZlbEFycltpXS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgfVxyXG4gICAgbGV0IG1haW5Db250ZW50V3JhcHBlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGNvZGVkLW1haW4tY29udGFpbmVyIC5wY29kZWQtY29udGVudFwiKTtcclxuICAgIG1haW5Db250ZW50V3JhcHBlci5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHRvZ2dsZUdyb3VwKGdyb3VwOiBFeHRlbmRlZE1haW5NZW51R3JvdXAsICRldmVudDogYW55KTogdm9pZCB7XHJcbiAgICBpZiAoZXZlbnQgIT0gbnVsbCB8fCBldmVudCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgbGV0IHRhcmdldCA9ICRldmVudC50YXJnZXQgfHwgJGV2ZW50LnNyY0VsZW1lbnQgfHwgJGV2ZW50LmN1cnJlbnRUYXJnZXQ7XHJcbiAgICAgIGxldCBjdXJOYXZpZ2F0aW9uTGV2ZWwgPSB0YXJnZXQuY2xvc2VzdChcIi5wY29kZWQtbmF2aWdhdGlvLWxhdmVsXCIpO1xyXG4gICAgICBpZiAoY3VyTmF2aWdhdGlvbkxldmVsLmNsYXNzTGlzdC5jb250YWlucyhcImFjdGl2ZVwiKSkge1xyXG4gICAgICAgIHRoaXMucmVtb3ZlQWN0aXZlU3RhdGVOYXZpZ2F0aW9uTWVudSgpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMucmVtb3ZlQWN0aXZlU3RhdGVOYXZpZ2F0aW9uTWVudSgpO1xyXG4gICAgICAgIGxldCBsaXN0Q2hpbGRyZW5JdGVtSW5UYXJnZXQgPSB0YXJnZXQuY2xvc2VzdChcIi5wY29kZWQtbGVmdC1pdGVtLS13cmFwcGVyXCIpLmNoaWxkcmVuO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGlzdENoaWxkcmVuSXRlbUluVGFyZ2V0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICBpZiAobGlzdENoaWxkcmVuSXRlbUluVGFyZ2V0W2ldLmNsYXNzTGlzdC5jb250YWlucyhcInBjb2RlZC1sZWZ0LWl0ZW1cIikpIHtcclxuICAgICAgICAgICAgbGlzdENoaWxkcmVuSXRlbUluVGFyZ2V0W2ldLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRhcmdldC5jbG9zZXN0KFwiLnBjb2RlZC1uYXZpZ2F0aW8tbGF2ZWxcIikuY2xhc3NMaXN0LnRvZ2dsZShcImFjdGl2ZVwiKTtcclxuICAgICAgICBsZXQgbWFpbkNvbnRlbnRXcmFwcGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wY29kZWQtbWFpbi1jb250YWluZXIgLnBjb2RlZC1jb250ZW50XCIpO1xyXG4gICAgICAgIG1haW5Db250ZW50V3JhcHBlci5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuY29sbGFwc2VkSXRlbXMuaW5kZXhPZihncm91cCk7XHJcbiAgICBpZiAoaW5kZXggPj0gMCkge1xyXG4gICAgICB0aGlzLmNvbGxhcHNlZEl0ZW1zLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmNvbGxhcHNlZEl0ZW1zLnB1c2goZ3JvdXApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGlzR3JvdXBDb2xsYXBzZWQoZ3JvdXA6IEV4dGVuZGVkTWFpbk1lbnVHcm91cCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuY29sbGFwc2VkSXRlbXMuaW5kZXhPZihncm91cCkgPj0gMDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyB0b2dnbGVPcGVuZWRTaWRlYmFyKCkge1xyXG4gICAgdGhpcy5pc0NvbGxhcHNlZFNpZGVCYXIgPSB0aGlzLmlzQ29sbGFwc2VkU2lkZUJhciA9PT0gJ3llcy1ibG9jaycgPyAnbm8tYmxvY2snIDogJ3llcy1ibG9jayc7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbG9hZE1lbnUobWVudTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICB0aGlzLm1lbnVJdGVtcyA9IHRoaXMubWVudVNlcnZpY2UubG9hZE1lbnVJdGVtcyhtZW51KTtcclxuICAgIHRoaXMuY3VycmVudFVybCA9IG1lbnUudG9Mb2NhbGVMb3dlckNhc2UoKTtcclxuICAgIHRoaXMubmF2aWdhdGVUbyh0aGlzLmN1cnJlbnRVcmwsIHRoaXMucm91dGVyKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZWxlY3RJdGVtKCRldmVudDogYW55LCBpdGVtOiBhbnkpOiB2b2lkIHtcclxuICAgIGxldCBuYXZpTGV2ZWxBbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnBjb2RlZC1uYXZpZ2F0aW8tbGF2ZWxcIik7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5hdmlMZXZlbEFsbC5sZW5ndGg7IGkrKykge1xyXG4gICAgICBuYXZpTGV2ZWxBbGxbaV0uY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgdGFyZ2V0ID0gJGV2ZW50LnRhcmdldCB8fCAkZXZlbnQuc3JjRWxlbWVudCB8fCAkZXZlbnQuY3VycmVudFRhcmdldDtcclxuICAgIHRhcmdldC5jbG9zZXN0KFwiLnBjb2RlZC1sZWZ0LWl0ZW0tLXdyYXBwZXJcIikuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgIGxldCBsaXN0Q2hpbGRyZW5JdGVtSW5UYXJnZXQgPSB0YXJnZXQuY2xvc2VzdChcIi5wY29kZWQtbGVmdC1pdGVtLS13cmFwcGVyXCIpLmNoaWxkcmVuO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGlzdENoaWxkcmVuSXRlbUluVGFyZ2V0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGlmIChsaXN0Q2hpbGRyZW5JdGVtSW5UYXJnZXRbaV0uY2xhc3NMaXN0LmNvbnRhaW5zKFwicGNvZGVkLW5hdmlnYXRpby1sYXZlbFwiKSkge1xyXG4gICAgICAgIGxpc3RDaGlsZHJlbkl0ZW1JblRhcmdldFtpXS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5jaGFuZ2VJdGVtKGl0ZW0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGNoYW5nZUl0ZW0oaXRlbTogYW55KTogdm9pZCB7XHJcbiAgICB0aGlzLmFjdGlvblNlcnZpY2UuY2hhbmdlSXRlbShpdGVtLCB0aGlzLm1lbnVUYWJzLCAoaXRlbXM6IEJyZWFkY3J1bWJbXSkgPT4ge1xyXG4gICAgICB0aGlzLmNoYW5nZS5lbWl0KGl0ZW1zKTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=