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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZWJhci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZnc0Yy8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2xheW91dC9zaWRlYmFyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLFlBQVksRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUMxRixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUU5RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFFbEU7SUF1QkUsaUNBQ1Msc0JBQTRDLEVBQ3pDLEtBQXFCLEVBQ3JCLE1BQWMsRUFDZCxXQUF3QixFQUN4QixhQUE0QjtRQUovQiwyQkFBc0IsR0FBdEIsc0JBQXNCLENBQXNCO1FBQ3pDLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQ3JCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQXJCeEIsYUFBUSxHQUFjLEVBQUUsQ0FBQztRQUl4QixXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQWdCLENBQUM7UUFFcEQsY0FBUyxHQUE0QixFQUFFLENBQUM7UUFFeEMsbUJBQWMsR0FBNEIsRUFBRSxDQUFDO1FBQzdDLGVBQVUsR0FBRyxLQUFLLENBQUM7UUFDbkIsU0FBSSxHQUFzRCxFQUFFLENBQUM7UUFFN0QsZUFBVSxHQUFZLEtBQUssQ0FBQztJQVUvQixDQUFDOzs7O0lBRUwsNkNBQVc7OztJQUFYO1FBQUEsaUJBcUNDO1FBcENDLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWTs7O1FBQUM7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QXVCOzs7SUFDbEMsMkNBQXlDOztJQUN6Qyw2Q0FBbUU7O0lBQ25FLHNDQUFnRDs7SUFDaEQsNENBQW1DOztJQUNuQyx5Q0FBMkQ7O0lBQzNELDZDQUEwQjs7SUFDMUIsNENBQStDOztJQUMvQyxxREFBa0M7O0lBQ2xDLGlEQUFvRDs7SUFDcEQsNkNBQTBCOztJQUMxQix1Q0FBb0U7O0lBQ3BFLCtDQUF5Qjs7SUFDekIsNkNBQW1DOztJQUNuQywyQ0FBeUI7O0lBQ3pCLDBDQUF3Qjs7SUFHdEIseURBQW1EOzs7OztJQUNuRCx3Q0FBK0I7Ozs7O0lBQy9CLHlDQUF3Qjs7Ozs7SUFDeEIsOENBQWtDOzs7OztJQUNsQyxnREFBc0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBPbkNoYW5nZXMgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSwgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgRGVmYXVsdExheW91dFNlcnZpY2UgfSBmcm9tICcuL2xheW91dC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTWVudVNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQvc2VydmljZXMvbWVudS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgRXh0ZW5kZWRNYWluTWVudUdyb3VwLCBNZW51VGFiLCBNZW51SXRlbSwgQnJlYWRjcnVtYiB9IGZyb20gJy4uL3NoYXJlZC9tb2RlbHMvYmFzZS5tb2RlbCc7XHJcbmltcG9ydCB7IEFjdGlvblNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQvc2VydmljZXMvYWN0aW9uLnNlcnZpY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdkZWZhdWx0LXNpZGViYXInLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9zaWRlYmFyLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9zaWRlYmFyLmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBEZWZhdWx0U2lkZWJhckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcclxuICBASW5wdXQoKSBwdWJsaWMgbWVudVRhYnM6IE1lbnVUYWJbXSA9IFtdO1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBuYXZpZ2F0ZVRvOiAobWVudTogc3RyaW5nLCByb3V0ZXI6IFJvdXRlcikgPT4gdm9pZDtcclxuICBASW5wdXQoKSBwdWJsaWMgc2V0OiAocm9sZTogc3RyaW5nKSA9PiBNZW51SXRlbTtcclxuICBASW5wdXQoKSBwdWJsaWMgc2V0QWN0aXZlOiBib29sZWFuO1xyXG4gIEBPdXRwdXQoKSBwdWJsaWMgY2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxCcmVhZGNydW1iW10+KCk7XHJcbiAgcHVibGljIGN1cnJlbnRVcmw6IHN0cmluZztcclxuICBwdWJsaWMgbWVudUl0ZW1zOiBFeHRlbmRlZE1haW5NZW51R3JvdXBbXSA9IFtdO1xyXG4gIHB1YmxpYyBpc0NvbGxhcHNlZFNpZGVCYXI6IHN0cmluZztcclxuICBwdWJsaWMgY29sbGFwc2VkSXRlbXM6IEV4dGVuZGVkTWFpbk1lbnVHcm91cFtdID0gW107XHJcbiAgcHVibGljIGlzU3VwcGxpZXIgPSBmYWxzZTtcclxuICBwdWJsaWMgdGFiczogeyBuYW1lOiBzdHJpbmcsIG1lbnU6IHN0cmluZywgc3ViTmFtZTogc3RyaW5nIH1bXSA9IFtdO1xyXG4gIHB1YmxpYyBjYXJvdXNlbFRpbGU6IGFueTtcclxuICBwdWJsaWMgaXNQYWdlTG9hZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIHB1YmxpYyBpc01vYmlsZTogYm9vbGVhbjtcclxuICBwdWJsaWMgY2xpY2tlZDogYm9vbGVhbjtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwdWJsaWMgd29ya3NwYWNlTGF5b3V0U2VydmljZTogRGVmYXVsdExheW91dFNlcnZpY2UsXHJcbiAgICBwcm90ZWN0ZWQgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxyXG4gICAgcHJvdGVjdGVkIHJvdXRlcjogUm91dGVyLFxyXG4gICAgcHJvdGVjdGVkIG1lbnVTZXJ2aWNlOiBNZW51U2VydmljZSxcclxuICAgIHByb3RlY3RlZCBhY3Rpb25TZXJ2aWNlOiBBY3Rpb25TZXJ2aWNlXHJcbiAgKSB7IH1cclxuXHJcbiAgbmdPbkNoYW5nZXMoKTogdm9pZCB7XHJcbiAgICB0aGlzLmFjdGlvblNlcnZpY2UuZXhlY3V0ZUFzeW5jKCgpID0+IHtcclxuICAgICAgdGhpcy5tZW51U2VydmljZS5pbml0KHRoaXMubWVudVRhYnMsICgpID0+IHtcclxuICAgICAgICB0aGlzLnRhYnMgPSB0aGlzLm1lbnVTZXJ2aWNlLmdldFRhYnMoKTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRVcmwgPSB0aGlzLnRhYnNbMF0ubWVudTtcclxuICAgICAgICB0aGlzLm1lbnVJdGVtcyA9IHRoaXMubWVudVNlcnZpY2UubG9hZEZpcnN0VGFiSXRlbXModGhpcy5jdXJyZW50VXJsKTtcclxuICAgICAgICB0aGlzLmFjdGlvblNlcnZpY2UuZXhlY3V0ZUFzeW5jKCgpID0+IHtcclxuICAgICAgICAgIHRoaXMuaXNDb2xsYXBzZWRTaWRlQmFyID0gJ25vLWJsb2NrJztcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAodGhpcy5tZW51SXRlbXMpIHtcclxuICAgICAgICAgIHZhciB1cmwgPSB0aGlzLnJvdXRlci51cmw7XHJcbiAgICAgICAgICB0aGlzLm1lbnVJdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChpdGVtLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgICAgaXRlbS5jaGlsZHJlbi5mb3JFYWNoKChraWQpID0+IHtcclxuICAgICAgICAgICAgICAgIHZhciBzdGF0ZSA9IGtpZC5tYWluU3RhdGUgPyBraWQubWFpblN0YXRlIDoga2lkLnN0YXRlO1xyXG4gICAgICAgICAgICAgICAgaWYgKHVybC5pbmRleE9mKHN0YXRlKSA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9uU2VydmljZS5leGVjdXRlQXN5bmMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucGNvZGVkLW5hdmlnYXRpby1sYXZlbFwiKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbXMgJiYgaXRlbXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBocmVmID0gKDxhbnk+aXRlbXNbaV0pLmhyZWY7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChocmVmICYmIGhyZWYudG9TdHJpbmcoKS5pbmRleE9mKHN0YXRlKSA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdEl0ZW0oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0OiBpdGVtc1tpXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGtpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0sIHRoaXMuc2V0KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICBpZiAoIXRoaXMubmF2aWdhdGVUbykge1xyXG4gICAgICB0aGlzLm5hdmlnYXRlVG8gPSAobWVudTogc3RyaW5nLCByb3V0ZXI6IFJvdXRlcikgPT4ge1xyXG4gICAgICAgIHJvdXRlci5uYXZpZ2F0ZShbJy8nLCBtZW51LCAnZGFzaGJvYXJkJ10pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGlzLmlzTW9iaWxlID0gdGhpcy5hY3Rpb25TZXJ2aWNlLmlzTW9iaWxlKCk7XHJcbiAgICBpZiAodGhpcy5pc01vYmlsZSkge1xyXG4gICAgICBpZiAodGhpcy53b3Jrc3BhY2VMYXlvdXRTZXJ2aWNlLnZlcnRpY2FsRWZmZWN0ID09ICdvdmVybGF5Jykge1xyXG4gICAgICAgIHRoaXMud29ya3NwYWNlTGF5b3V0U2VydmljZS52ZXJ0aWNhbEVmZmVjdCA9ICdzaHJpbmsnO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMud29ya3NwYWNlTGF5b3V0U2VydmljZS52ZXJ0aWNhbEVmZmVjdCA9ICdvdmVybGF5JztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIHRvZ2dsZU1lbnUoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5pc01vYmlsZSkge1xyXG4gICAgICBpZiAodGhpcy53b3Jrc3BhY2VMYXlvdXRTZXJ2aWNlLnZlcnRpY2FsRWZmZWN0ID09ICdvdmVybGF5Jykge1xyXG4gICAgICAgIHRoaXMud29ya3NwYWNlTGF5b3V0U2VydmljZS52ZXJ0aWNhbEVmZmVjdCA9ICdzaHJpbmsnO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMud29ya3NwYWNlTGF5b3V0U2VydmljZS52ZXJ0aWNhbEVmZmVjdCA9ICdvdmVybGF5JztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIHJlbW92ZUFjdGl2ZVN0YXRlTmF2aWdhdGlvbk1lbnUoKTogdm9pZCB7XHJcbiAgICBsZXQgbmF2aWdhdGlvbkxldmVsQXJyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wY29kZWQtbGVmdC1pdGVtLS13cmFwcGVyIC5wY29kZWQtbmF2aWdhdGlvLWxhdmVsXCIpO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuYXZpZ2F0aW9uTGV2ZWxBcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgbmF2aWdhdGlvbkxldmVsQXJyW2ldLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICB9XHJcbiAgICBsZXQgc3ViTWVudUxldmVsQXJyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wY29kZWQtbGVmdC1pdGVtLS13cmFwcGVyIC5wY29kZWQtbGVmdC1pdGVtXCIpO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdWJNZW51TGV2ZWxBcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgc3ViTWVudUxldmVsQXJyW2ldLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICB9XHJcbiAgICBsZXQgbWFpbkNvbnRlbnRXcmFwcGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wY29kZWQtbWFpbi1jb250YWluZXIgLnBjb2RlZC1jb250ZW50XCIpO1xyXG4gICAgbWFpbkNvbnRlbnRXcmFwcGVyLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgdG9nZ2xlR3JvdXAoZ3JvdXA6IEV4dGVuZGVkTWFpbk1lbnVHcm91cCwgJGV2ZW50OiBhbnkpOiB2b2lkIHtcclxuICAgIGlmIChldmVudCAhPSBudWxsIHx8IGV2ZW50ICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICBsZXQgdGFyZ2V0ID0gJGV2ZW50LnRhcmdldCB8fCAkZXZlbnQuc3JjRWxlbWVudCB8fCAkZXZlbnQuY3VycmVudFRhcmdldDtcclxuICAgICAgbGV0IGN1ck5hdmlnYXRpb25MZXZlbCA9IHRhcmdldC5jbG9zZXN0KFwiLnBjb2RlZC1uYXZpZ2F0aW8tbGF2ZWxcIik7XHJcbiAgICAgIGlmIChjdXJOYXZpZ2F0aW9uTGV2ZWwuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYWN0aXZlXCIpKSB7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVBY3RpdmVTdGF0ZU5hdmlnYXRpb25NZW51KCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVBY3RpdmVTdGF0ZU5hdmlnYXRpb25NZW51KCk7XHJcbiAgICAgICAgbGV0IGxpc3RDaGlsZHJlbkl0ZW1JblRhcmdldCA9IHRhcmdldC5jbG9zZXN0KFwiLnBjb2RlZC1sZWZ0LWl0ZW0tLXdyYXBwZXJcIikuY2hpbGRyZW47XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaXN0Q2hpbGRyZW5JdGVtSW5UYXJnZXQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgIGlmIChsaXN0Q2hpbGRyZW5JdGVtSW5UYXJnZXRbaV0uY2xhc3NMaXN0LmNvbnRhaW5zKFwicGNvZGVkLWxlZnQtaXRlbVwiKSkge1xyXG4gICAgICAgICAgICBsaXN0Q2hpbGRyZW5JdGVtSW5UYXJnZXRbaV0uY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGFyZ2V0LmNsb3Nlc3QoXCIucGNvZGVkLW5hdmlnYXRpby1sYXZlbFwiKS5jbGFzc0xpc3QudG9nZ2xlKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgIGxldCBtYWluQ29udGVudFdyYXBwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBjb2RlZC1tYWluLWNvbnRhaW5lciAucGNvZGVkLWNvbnRlbnRcIik7XHJcbiAgICAgICAgbWFpbkNvbnRlbnRXcmFwcGVyLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5jb2xsYXBzZWRJdGVtcy5pbmRleE9mKGdyb3VwKTtcclxuICAgIGlmIChpbmRleCA+PSAwKSB7XHJcbiAgICAgIHRoaXMuY29sbGFwc2VkSXRlbXMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuY29sbGFwc2VkSXRlbXMucHVzaChncm91cCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgaXNHcm91cENvbGxhcHNlZChncm91cDogRXh0ZW5kZWRNYWluTWVudUdyb3VwKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5jb2xsYXBzZWRJdGVtcy5pbmRleE9mKGdyb3VwKSA+PSAwO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHRvZ2dsZU9wZW5lZFNpZGViYXIoKSB7XHJcbiAgICB0aGlzLmlzQ29sbGFwc2VkU2lkZUJhciA9IHRoaXMuaXNDb2xsYXBzZWRTaWRlQmFyID09PSAneWVzLWJsb2NrJyA/ICduby1ibG9jaycgOiAneWVzLWJsb2NrJztcclxuICB9XHJcblxyXG4gIHB1YmxpYyBsb2FkTWVudShtZW51OiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIHRoaXMubWVudUl0ZW1zID0gdGhpcy5tZW51U2VydmljZS5sb2FkTWVudUl0ZW1zKG1lbnUpO1xyXG4gICAgdGhpcy5jdXJyZW50VXJsID0gbWVudS50b0xvY2FsZUxvd2VyQ2FzZSgpO1xyXG4gICAgdGhpcy5uYXZpZ2F0ZVRvKHRoaXMuY3VycmVudFVybCwgdGhpcy5yb3V0ZXIpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNlbGVjdEl0ZW0oJGV2ZW50OiBhbnksIGl0ZW06IGFueSk6IHZvaWQge1xyXG4gICAgbGV0IG5hdmlMZXZlbEFsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucGNvZGVkLW5hdmlnYXRpby1sYXZlbFwiKTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmF2aUxldmVsQWxsLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIG5hdmlMZXZlbEFsbFtpXS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCB0YXJnZXQgPSAkZXZlbnQudGFyZ2V0IHx8ICRldmVudC5zcmNFbGVtZW50IHx8ICRldmVudC5jdXJyZW50VGFyZ2V0O1xyXG4gICAgdGFyZ2V0LmNsb3Nlc3QoXCIucGNvZGVkLWxlZnQtaXRlbS0td3JhcHBlclwiKS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgbGV0IGxpc3RDaGlsZHJlbkl0ZW1JblRhcmdldCA9IHRhcmdldC5jbG9zZXN0KFwiLnBjb2RlZC1sZWZ0LWl0ZW0tLXdyYXBwZXJcIikuY2hpbGRyZW47XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaXN0Q2hpbGRyZW5JdGVtSW5UYXJnZXQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgaWYgKGxpc3RDaGlsZHJlbkl0ZW1JblRhcmdldFtpXS5jbGFzc0xpc3QuY29udGFpbnMoXCJwY29kZWQtbmF2aWdhdGlvLWxhdmVsXCIpKSB7XHJcbiAgICAgICAgbGlzdENoaWxkcmVuSXRlbUluVGFyZ2V0W2ldLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmNoYW5nZUl0ZW0oaXRlbSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgY2hhbmdlSXRlbShpdGVtOiBhbnkpOiB2b2lkIHtcclxuICAgIHRoaXMuYWN0aW9uU2VydmljZS5jaGFuZ2VJdGVtKGl0ZW0sIHRoaXMubWVudVRhYnMsIChpdGVtczogQnJlYWRjcnVtYltdKSA9PiB7XHJcbiAgICAgIHRoaXMuY2hhbmdlLmVtaXQoaXRlbXMpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==