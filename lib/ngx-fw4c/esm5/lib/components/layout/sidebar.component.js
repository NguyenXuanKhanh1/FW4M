/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from "@angular/core";
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { DefaultLayoutService } from './layout.service';
import { MenuService } from '../shared/services/menu.service';
import { ActionService } from '../shared/services/action.service';
import { AggregatorService } from '../shared/services/aggregator.service';
var DefaultSidebarComponent = /** @class */ (function () {
    function DefaultSidebarComponent(workspaceLayoutService, route, router, menuService, actionService, aggregatorService) {
        this.workspaceLayoutService = workspaceLayoutService;
        this.route = route;
        this.router = router;
        this.menuService = menuService;
        this.actionService = actionService;
        this.aggregatorService = aggregatorService;
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
                _this.actionService.executeAsync((/**
                 * @return {?}
                 */
                function () {
                    _this.selectMenu();
                }));
                _this.router.events.subscribe((/**
                 * @param {?} event
                 * @return {?}
                 */
                function (event) {
                    if (event instanceof NavigationEnd) {
                        _this.selectMenu();
                    }
                }));
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
     * @param {?} item
     * @return {?}
     */
    DefaultSidebarComponent.prototype.selectItem = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
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
    /**
     * @private
     * @return {?}
     */
    DefaultSidebarComponent.prototype.selectMenu = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var url = this.router.url;
        /** @type {?} */
        var menuItems = document.querySelectorAll('.pcoded-navigatio-lavel');
        if (menuItems && menuItems.length > 0) {
            menuItems.forEach((/**
             * @param {?} menu
             * @return {?}
             */
            function (menu) {
                menu.classList.remove('active');
                /** @type {?} */
                var children = document.querySelectorAll("." + menu.text);
                if (children && children.length > 0) {
                    children.forEach((/**
                     * @param {?} child
                     * @return {?}
                     */
                    function (child) {
                        child.classList.remove('active');
                    }));
                }
                if (menu.href && menu.href.indexOf(url) > -1) {
                    menu.classList.add('active');
                }
                else {
                    if (children && children.length > 0) {
                        children.forEach((/**
                         * @param {?} child
                         * @return {?}
                         */
                        function (child) {
                            if (child.href && child.href.indexOf(url) > -1) {
                                child.classList.add('active');
                                menu.classList.add('active');
                            }
                        }));
                    }
                }
            }));
        }
    };
    DefaultSidebarComponent.decorators = [
        { type: Component, args: [{
                    selector: 'default-sidebar',
                    template: "<nav id=\"main_navbar\" class=\"pcoded-navbar workspace-side-bar\"\r\n    (clickOutside)=\"workspaceLayoutService.onClickedOutside($event)\" [exclude]=\"'#mobile-collapse'\"\r\n    [attr.pcoded-header-position]=\"workspaceLayoutService.pcodedHeaderPosition\"\r\n    [attr.navbar-theme]=\"workspaceLayoutService.navBarTheme\"\r\n    [attr.active-item-theme]=\"workspaceLayoutService.activeItemTheme\" sub-item-theme=\"theme2\" active-item-style=\"style0\"\r\n    [attr.pcoded-navbar-position]=\"workspaceLayoutService.pcodedSidebarPosition\">\r\n    <div class=\"pcoded-inner-navbar main-menu o-hidden pcoded-inner-navbar-workspace\" cAccordion>\r\n        <div width=\"100%\" height=\"calc(100% - 40px)\" size=\"4px\" color=\"#fff\" opacity=\"0.3\" allowPageScroll=\"false\">\r\n            <ul class=\"nav\">\r\n                <li class=\"nav-item\" *ngFor=\"let item of tabs; index as i\"\r\n                    [ngClass]=\"this.currentUrl.toLowerCase() === item.menu.toLowerCase() ? 'active-menu':''\">\r\n                    <a class=\"nav-link\" href=\"javascript:void(0);\" (click)=\"loadMenu(item.menu)\">\r\n                        <span>{{item.subName}}</span>\r\n                    </a>\r\n                </li>\r\n            </ul>\r\n            <div (mouseover)=\"clicked = false\" *ngFor=\"let asideItems of menuItems ; index as i\"\r\n                [ngStyle]=\"{'margin-top': i == 0 ? '1rem': '0'}\" class=\"d-color pcoded-left-item--wrapper\">\r\n                <a class=\"pcoded-navigatio-lavel d-flex align-items-center\" menu-title-theme=\"theme5\"\r\n                    href=\"javascript:void(0)\"\r\n                    routerLink=\"/{{asideItems?.children[0]?.mainState}}/{{asideItems?.children[0]?.state}}\"\r\n                    (click)=\"selectItem(asideItems?.children[0])\"\r\n                    *ngIf=\"asideItems.label || menuItems.length > 0\">\r\n                    <span class=\"pcoded-micon\" title=\"{{asideItems.label}}\">\r\n                        <i class=\"{{ asideItems.icon }}\"></i>\r\n                    </span>\r\n                    <span>{{asideItems.label}}</span>\r\n                    <i [hidden]=\"asideItems.children.length == 1\" class=\"show-sub icofont-thin-right icofont\"></i>\r\n                </a>\r\n                <ul *ngIf=\"asideItems.children.length > 1\" (mouseup)=\"clicked = true\" [hidden]=\"clicked\"\r\n                    class=\"pcoded-item pcoded-left-item\" item-border=\"true\" item-border-style=\"none\"\r\n                    subitem-border=\"true\" katanaAccordionLink>\r\n                    <ng-template ngFor let-asideItem [ngForOf]=\"asideItems.children\">\r\n                        <li [routerLinkActive]=\"['active']\" *ngIf=\"asideItem.type === 'link'\" katanaAccordionLink\r\n                            group=\"{{asideItem.state}}\" class=\"pcoded-left-item-child li-{{asideItems.label}}\" (click)=\"toggleMenu()\">\r\n                            <a class=\"{{asideItems.label}}\" routerLink=\"/{{asideItem.mainState}}/{{asideItem.state}}\"\r\n                                target=\"{{asideItem.target ? '_blank' : '_self'}}\" katanaAccordionToggle\r\n                                *ngIf=\"asideItem.mainState; else mainContent\"\r\n                                (click)=\"selectItem(asideItem)\">\r\n                                <span class=\"pcoded-micon\">\r\n                                    <i class=\"{{ asideItem.icon }}\"></i>\r\n                                    <b>{{ asideItem.shortLabel }}</b>\r\n                                </span>\r\n                                <span class=\"pcoded-mtext\">{{ asideItem.name }}</span>\r\n                            </a>\r\n                            <ng-template #mainContent>\r\n                                <a [routerLink]=\"[asideItem.state]\" target=\"{{asideItem.target ? '_blank' : '_self'}}\"\r\n                                    cAccordionToggle>\r\n                                    <span class=\"pcoded-micon\">\r\n                                        <i class=\"{{ asideItem.icon }}\"></i>\r\n                                        <b>{{ asideItem.shortLabel }}</b>\r\n                                    </span>\r\n                                    <span class=\"pcoded-mtext\">{{ asideItem.name }}</span>\r\n                                    <span *ngFor=\"let asideBadge of asideItem.badge\"\r\n                                        class=\"pcoded-badge label label-{{ asideBadge.type }}\">{{asideBadge.value}}</span>\r\n                                    <span class=\"pcoded-mcaret\"></span>\r\n                                </a>\r\n                            </ng-template>\r\n                        </li>\r\n                    </ng-template>\r\n                </ul>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</nav>\r\n<div class=\"back-drop\" (click)=\"toggleMenu()\"></div>",
                    styles: [".back-drop{display:none}@media (max-width:1024px){.back-drop{background:#000;opacity:.2;position:fixed;width:100%;height:100%;z-index:9}}"]
                }] }
    ];
    /** @nocollapse */
    DefaultSidebarComponent.ctorParameters = function () { return [
        { type: DefaultLayoutService },
        { type: ActivatedRoute },
        { type: Router },
        { type: MenuService },
        { type: ActionService },
        { type: AggregatorService }
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
    /**
     * @type {?}
     * @protected
     */
    DefaultSidebarComponent.prototype.aggregatorService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZWJhci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZnc0Yy8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2xheW91dC9zaWRlYmFyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLFlBQVksRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUMxRixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sRUFBRSxhQUFhLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN4RSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFFOUQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBRTFFO0lBd0JFLGlDQUNTLHNCQUE0QyxFQUN6QyxLQUFxQixFQUNyQixNQUFjLEVBQ2QsV0FBd0IsRUFDeEIsYUFBNEIsRUFDNUIsaUJBQW9DO1FBTHZDLDJCQUFzQixHQUF0QixzQkFBc0IsQ0FBc0I7UUFDekMsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFDckIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzVCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUF2QmhDLGFBQVEsR0FBYyxFQUFFLENBQUM7UUFLeEIsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFnQixDQUFDO1FBRXBELGNBQVMsR0FBNEIsRUFBRSxDQUFDO1FBRXhDLG1CQUFjLEdBQTRCLEVBQUUsQ0FBQztRQUM3QyxlQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ25CLFNBQUksR0FBc0QsRUFBRSxDQUFDO1FBRTdELGVB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SUFDekIsNkNBQW1DOztJQUNuQywyQ0FBeUI7O0lBQ3pCLDBDQUF3Qjs7SUFHdEIseURBQW1EOzs7OztJQUNuRCx3Q0FBK0I7Ozs7O0lBQy9CLHlDQUF3Qjs7Ozs7SUFDeEIsOENBQWtDOzs7OztJQUNsQyxnREFBc0M7Ozs7O0lBQ3RDLG9EQUE4QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIE9uQ2hhbmdlcyB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBSb3V0ZXIsIE5hdmlnYXRpb25FbmQgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBEZWZhdWx0TGF5b3V0U2VydmljZSB9IGZyb20gJy4vbGF5b3V0LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBNZW51U2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9zZXJ2aWNlcy9tZW51LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBFeHRlbmRlZE1haW5NZW51R3JvdXAsIE1lbnVUYWIsIE1lbnVJdGVtLCBCcmVhZGNydW1iIH0gZnJvbSAnLi4vc2hhcmVkL21vZGVscy9iYXNlLm1vZGVsJztcclxuaW1wb3J0IHsgQWN0aW9uU2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9zZXJ2aWNlcy9hY3Rpb24uc2VydmljZSc7XHJcbmltcG9ydCB7IEFnZ3JlZ2F0b3JTZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL3NlcnZpY2VzL2FnZ3JlZ2F0b3Iuc2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2RlZmF1bHQtc2lkZWJhcicsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3NpZGViYXIuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3NpZGViYXIuY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIERlZmF1bHRTaWRlYmFyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBtZW51VGFiczogTWVudVRhYltdID0gW107XHJcbiAgQElucHV0KCkgcHVibGljIG5hdmlnYXRlVG86IChtZW51OiBzdHJpbmcsIHJvdXRlcjogUm91dGVyKSA9PiB2b2lkO1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBzZXQ6IChyb2xlOiBzdHJpbmcpID0+IE1lbnVJdGVtO1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBtZW51VHlwZTogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBzZXRBY3RpdmU6IGJvb2xlYW47XHJcbiAgQE91dHB1dCgpIHB1YmxpYyBjaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPEJyZWFkY3J1bWJbXT4oKTtcclxuICBwdWJsaWMgY3VycmVudFVybDogc3RyaW5nO1xyXG4gIHB1YmxpYyBtZW51SXRlbXM6IEV4dGVuZGVkTWFpbk1lbnVHcm91cFtdID0gW107XHJcbiAgcHVibGljIGlzQ29sbGFwc2VkU2lkZUJhcjogc3RyaW5nO1xyXG4gIHB1YmxpYyBjb2xsYXBzZWRJdGVtczogRXh0ZW5kZWRNYWluTWVudUdyb3VwW10gPSBbXTtcclxuICBwdWJsaWMgaXNTdXBwbGllciA9IGZhbHNlO1xyXG4gIHB1YmxpYyB0YWJzOiB7IG5hbWU6IHN0cmluZywgbWVudTogc3RyaW5nLCBzdWJOYW1lOiBzdHJpbmcgfVtdID0gW107XHJcbiAgcHVibGljIGNhcm91c2VsVGlsZTogYW55O1xyXG4gIHB1YmxpYyBpc1BhZ2VMb2FkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgcHVibGljIGlzTW9iaWxlOiBib29sZWFuO1xyXG4gIHB1YmxpYyBjbGlja2VkOiBib29sZWFuO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHB1YmxpYyB3b3Jrc3BhY2VMYXlvdXRTZXJ2aWNlOiBEZWZhdWx0TGF5b3V0U2VydmljZSxcclxuICAgIHByb3RlY3RlZCByb3V0ZTogQWN0aXZhdGVkUm91dGUsXHJcbiAgICBwcm90ZWN0ZWQgcm91dGVyOiBSb3V0ZXIsXHJcbiAgICBwcm90ZWN0ZWQgbWVudVNlcnZpY2U6IE1lbnVTZXJ2aWNlLFxyXG4gICAgcHJvdGVjdGVkIGFjdGlvblNlcnZpY2U6IEFjdGlvblNlcnZpY2UsXHJcbiAgICBwcm90ZWN0ZWQgYWdncmVnYXRvclNlcnZpY2U6IEFnZ3JlZ2F0b3JTZXJ2aWNlXHJcbiAgKSB7XHJcbiAgfVxyXG5cclxuICBuZ09uQ2hhbmdlcygpOiB2b2lkIHtcclxuICAgIHRoaXMuYWN0aW9uU2VydmljZS5leGVjdXRlQXN5bmMoKCkgPT4ge1xyXG4gICAgICB0aGlzLm1lbnVTZXJ2aWNlLmluaXQodGhpcy5tZW51VGFicywgKCkgPT4ge1xyXG4gICAgICAgIHRoaXMudGFicyA9IHRoaXMubWVudVNlcnZpY2UuZ2V0VGFicygpO1xyXG4gICAgICAgIHRoaXMuY3VycmVudFVybCA9IHRoaXMudGFic1swXS5tZW51O1xyXG4gICAgICAgIHRoaXMubWVudUl0ZW1zID0gdGhpcy5tZW51U2VydmljZS5sb2FkRmlyc3RUYWJJdGVtcyh0aGlzLmN1cnJlbnRVcmwpO1xyXG4gICAgICAgIHRoaXMuYWN0aW9uU2VydmljZS5leGVjdXRlQXN5bmMoKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5pc0NvbGxhcHNlZFNpZGVCYXIgPSAnbm8tYmxvY2snO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuYWN0aW9uU2VydmljZS5leGVjdXRlQXN5bmMoKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5zZWxlY3RNZW51KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIuZXZlbnRzLnN1YnNjcmliZSgoZXZlbnQpID0+IHtcclxuICAgICAgICAgIGlmIChldmVudCBpbnN0YW5jZW9mIE5hdmlnYXRpb25FbmQpIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RNZW51KCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0sIHRoaXMuc2V0KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICBpZiAoIXRoaXMubmF2aWdhdGVUbykge1xyXG4gICAgICB0aGlzLm5hdmlnYXRlVG8gPSAobWVudTogc3RyaW5nLCByb3V0ZXI6IFJvdXRlcikgPT4ge1xyXG4gICAgICAgIHJvdXRlci5uYXZpZ2F0ZShbJy8nLCBtZW51LCAnZGFzaGJvYXJkJ10pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGlzLmlzTW9iaWxlID0gdGhpcy5hY3Rpb25TZXJ2aWNlLmlzTW9iaWxlKCk7XHJcbiAgICBpZiAodGhpcy5pc01vYmlsZSkge1xyXG4gICAgICBpZiAodGhpcy53b3Jrc3BhY2VMYXlvdXRTZXJ2aWNlLnZlcnRpY2FsRWZmZWN0ID09ICdvdmVybGF5Jykge1xyXG4gICAgICAgIHRoaXMud29ya3NwYWNlTGF5b3V0U2VydmljZS52ZXJ0aWNhbEVmZmVjdCA9ICdzaHJpbmsnO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMud29ya3NwYWNlTGF5b3V0U2VydmljZS52ZXJ0aWNhbEVmZmVjdCA9ICdvdmVybGF5JztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIHRvZ2dsZU1lbnUoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5pc01vYmlsZSAmJiB0aGlzLm1lbnVUeXBlID09ICdMRUZUJykge1xyXG4gICAgICBpZiAodGhpcy53b3Jrc3BhY2VMYXlvdXRTZXJ2aWNlLnZlcnRpY2FsRWZmZWN0ID09ICdvdmVybGF5Jykge1xyXG4gICAgICAgIHRoaXMud29ya3NwYWNlTGF5b3V0U2VydmljZS52ZXJ0aWNhbEVmZmVjdCA9ICdzaHJpbmsnO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMud29ya3NwYWNlTGF5b3V0U2VydmljZS52ZXJ0aWNhbEVmZmVjdCA9ICdvdmVybGF5JztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIHJlbW92ZUFjdGl2ZVN0YXRlTmF2aWdhdGlvbk1lbnUoKTogdm9pZCB7XHJcbiAgICBsZXQgbmF2aWdhdGlvbkxldmVsQXJyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wY29kZWQtbGVmdC1pdGVtLS13cmFwcGVyIC5wY29kZWQtbmF2aWdhdGlvLWxhdmVsXCIpO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuYXZpZ2F0aW9uTGV2ZWxBcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgbmF2aWdhdGlvbkxldmVsQXJyW2ldLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICB9XHJcbiAgICBsZXQgc3ViTWVudUxldmVsQXJyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wY29kZWQtbGVmdC1pdGVtLS13cmFwcGVyIC5wY29kZWQtbGVmdC1pdGVtXCIpO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdWJNZW51TGV2ZWxBcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgc3ViTWVudUxldmVsQXJyW2ldLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICB9XHJcbiAgICBsZXQgbWFpbkNvbnRlbnRXcmFwcGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wY29kZWQtbWFpbi1jb250YWluZXIgLnBjb2RlZC1jb250ZW50XCIpO1xyXG4gICAgbWFpbkNvbnRlbnRXcmFwcGVyLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgdG9nZ2xlR3JvdXAoZ3JvdXA6IEV4dGVuZGVkTWFpbk1lbnVHcm91cCwgJGV2ZW50OiBhbnkpOiB2b2lkIHtcclxuICAgIGlmIChldmVudCAhPSBudWxsIHx8IGV2ZW50ICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICBsZXQgdGFyZ2V0ID0gJGV2ZW50LnRhcmdldCB8fCAkZXZlbnQuc3JjRWxlbWVudCB8fCAkZXZlbnQuY3VycmVudFRhcmdldDtcclxuICAgICAgbGV0IGN1ck5hdmlnYXRpb25MZXZlbCA9IHRhcmdldC5jbG9zZXN0KFwiLnBjb2RlZC1uYXZpZ2F0aW8tbGF2ZWxcIik7XHJcbiAgICAgIGlmIChjdXJOYXZpZ2F0aW9uTGV2ZWwuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYWN0aXZlXCIpKSB7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVBY3RpdmVTdGF0ZU5hdmlnYXRpb25NZW51KCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVBY3RpdmVTdGF0ZU5hdmlnYXRpb25NZW51KCk7XHJcbiAgICAgICAgbGV0IGxpc3RDaGlsZHJlbkl0ZW1JblRhcmdldCA9IHRhcmdldC5jbG9zZXN0KFwiLnBjb2RlZC1sZWZ0LWl0ZW0tLXdyYXBwZXJcIikuY2hpbGRyZW47XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaXN0Q2hpbGRyZW5JdGVtSW5UYXJnZXQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgIGlmIChsaXN0Q2hpbGRyZW5JdGVtSW5UYXJnZXRbaV0uY2xhc3NMaXN0LmNvbnRhaW5zKFwicGNvZGVkLWxlZnQtaXRlbVwiKSkge1xyXG4gICAgICAgICAgICBsaXN0Q2hpbGRyZW5JdGVtSW5UYXJnZXRbaV0uY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGFyZ2V0LmNsb3Nlc3QoXCIucGNvZGVkLW5hdmlnYXRpby1sYXZlbFwiKS5jbGFzc0xpc3QudG9nZ2xlKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgIGxldCBtYWluQ29udGVudFdyYXBwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBjb2RlZC1tYWluLWNvbnRhaW5lciAucGNvZGVkLWNvbnRlbnRcIik7XHJcbiAgICAgICAgbWFpbkNvbnRlbnRXcmFwcGVyLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5jb2xsYXBzZWRJdGVtcy5pbmRleE9mKGdyb3VwKTtcclxuICAgIGlmIChpbmRleCA+PSAwKSB7XHJcbiAgICAgIHRoaXMuY29sbGFwc2VkSXRlbXMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuY29sbGFwc2VkSXRlbXMucHVzaChncm91cCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgaXNHcm91cENvbGxhcHNlZChncm91cDogRXh0ZW5kZWRNYWluTWVudUdyb3VwKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5jb2xsYXBzZWRJdGVtcy5pbmRleE9mKGdyb3VwKSA+PSAwO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHRvZ2dsZU9wZW5lZFNpZGViYXIoKSB7XHJcbiAgICB0aGlzLmlzQ29sbGFwc2VkU2lkZUJhciA9IHRoaXMuaXNDb2xsYXBzZWRTaWRlQmFyID09PSAneWVzLWJsb2NrJyA/ICduby1ibG9jaycgOiAneWVzLWJsb2NrJztcclxuICB9XHJcblxyXG4gIHB1YmxpYyBsb2FkTWVudShtZW51OiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIHRoaXMubWVudUl0ZW1zID0gdGhpcy5tZW51U2VydmljZS5sb2FkTWVudUl0ZW1zKG1lbnUpO1xyXG4gICAgdGhpcy5jdXJyZW50VXJsID0gbWVudS50b0xvY2FsZUxvd2VyQ2FzZSgpO1xyXG4gICAgdGhpcy5uYXZpZ2F0ZVRvKHRoaXMuY3VycmVudFVybCwgdGhpcy5yb3V0ZXIpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNlbGVjdEl0ZW0oaXRlbTogYW55KTogdm9pZCB7XHJcbiAgICB0aGlzLmNoYW5nZUl0ZW0oaXRlbSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgY2hhbmdlSXRlbShpdGVtOiBhbnkpOiB2b2lkIHtcclxuICAgIHRoaXMuYWN0aW9uU2VydmljZS5jaGFuZ2VJdGVtKGl0ZW0sIHRoaXMubWVudVRhYnMsIChpdGVtczogQnJlYWRjcnVtYltdKSA9PiB7XHJcbiAgICAgIHRoaXMuY2hhbmdlLmVtaXQoaXRlbXMpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHNlbGVjdE1lbnUoKTogdm9pZCB7XHJcbiAgICB2YXIgdXJsID0gdGhpcy5yb3V0ZXIudXJsO1xyXG4gICAgdmFyIG1lbnVJdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wY29kZWQtbmF2aWdhdGlvLWxhdmVsJyk7XHJcbiAgICBpZiAobWVudUl0ZW1zICYmIG1lbnVJdGVtcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIG1lbnVJdGVtcy5mb3JFYWNoKChtZW51OiBhbnkpID0+IHtcclxuICAgICAgICBtZW51LmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG4gICAgICAgIHZhciBjaGlsZHJlbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC4ke21lbnUudGV4dH1gKTtcclxuICAgICAgICBpZiAoY2hpbGRyZW4gJiYgY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQpID0+IHtcclxuICAgICAgICAgICAgY2hpbGQuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG1lbnUuaHJlZiAmJiBtZW51LmhyZWYuaW5kZXhPZih1cmwpID4gLTEpIHtcclxuICAgICAgICAgIG1lbnUuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGlmIChjaGlsZHJlbiAmJiBjaGlsZHJlbi5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGNoaWxkcmVuLmZvckVhY2goKGNoaWxkOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICBpZiAoY2hpbGQuaHJlZiAmJiBjaGlsZC5ocmVmLmluZGV4T2YodXJsKSA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICBjaGlsZC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgIG1lbnUuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=