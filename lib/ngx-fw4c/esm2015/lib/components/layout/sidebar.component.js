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
export class DefaultSidebarComponent {
    /**
     * @param {?} workspaceLayoutService
     * @param {?} route
     * @param {?} router
     * @param {?} menuService
     * @param {?} actionService
     * @param {?} aggregatorService
     */
    constructor(workspaceLayoutService, route, router, menuService, actionService, aggregatorService) {
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
    ngOnChanges() {
        this.actionService.executeAsync((/**
         * @return {?}
         */
        () => {
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
                this.actionService.executeAsync((/**
                 * @return {?}
                 */
                () => {
                    this.selectMenu();
                }));
                this.router.events.subscribe((/**
                 * @param {?} event
                 * @return {?}
                 */
                (event) => {
                    if (event instanceof NavigationEnd) {
                        this.actionService.executeAsync((/**
                         * @return {?}
                         */
                        () => {
                            this.selectMenu();
                        }));
                    }
                }));
            }), this.set);
        }));
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (!this.navigateTo) {
            this.navigateTo = (/**
             * @param {?} menu
             * @param {?} router
             * @return {?}
             */
            (menu, router) => {
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
    }
    /**
     * @return {?}
     */
    toggleMenu() {
        if (this.isMobile && this.menuType == 'LEFT') {
            if (this.workspaceLayoutService.verticalEffect == 'overlay') {
                this.workspaceLayoutService.verticalEffect = 'shrink';
            }
            else {
                this.workspaceLayoutService.verticalEffect = 'overlay';
            }
        }
    }
    /**
     * @return {?}
     */
    toggleOpenedSidebar() {
        this.isCollapsedSideBar = this.isCollapsedSideBar === 'yes-block' ? 'no-block' : 'yes-block';
    }
    /**
     * @param {?} menu
     * @return {?}
     */
    loadMenu(menu) {
        this.menuItems = this.menuService.loadMenuItems(menu);
        this.currentUrl = menu.toLocaleLowerCase();
        this.navigateTo(this.currentUrl, this.router);
    }
    /**
     * @param {?} item
     * @return {?}
     */
    selectItem(item) {
        this.actionService.changeItem(item, this.menuTabs, (/**
         * @param {?} items
         * @return {?}
         */
        (items) => {
            this.change.emit(items);
        }));
    }
    /**
     * @private
     * @return {?}
     */
    selectMenu() {
        /** @type {?} */
        var url = this.router.url;
        /** @type {?} */
        var menuItems = document.querySelectorAll('.pcoded-navigatio-lavel');
        if (menuItems && menuItems.length > 0) {
            menuItems.forEach((/**
             * @param {?} menu
             * @return {?}
             */
            (menu) => {
                menu.classList.remove('active');
                /** @type {?} */
                var children = document.querySelectorAll(`.${menu.text}`);
                if (children && children.length > 0) {
                    children.forEach((/**
                     * @param {?} child
                     * @return {?}
                     */
                    (child) => {
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
                        (child) => {
                            if (child.href && child.href.indexOf(url) > -1) {
                                child.classList.add('active');
                                menu.classList.add('active');
                            }
                        }));
                    }
                }
            }));
        }
    }
}
DefaultSidebarComponent.decorators = [
    { type: Component, args: [{
                selector: 'default-sidebar',
                template: "<nav id=\"main_navbar\" class=\"pcoded-navbar workspace-side-bar\"\r\n    (clickOutside)=\"workspaceLayoutService.onClickedOutside($event)\" [exclude]=\"'#mobile-collapse'\"\r\n    [attr.pcoded-header-position]=\"workspaceLayoutService.pcodedHeaderPosition\"\r\n    [attr.navbar-theme]=\"workspaceLayoutService.navBarTheme\"\r\n    [attr.active-item-theme]=\"workspaceLayoutService.activeItemTheme\" sub-item-theme=\"theme2\" active-item-style=\"style0\"\r\n    [attr.pcoded-navbar-position]=\"workspaceLayoutService.pcodedSidebarPosition\">\r\n    <div class=\"pcoded-inner-navbar main-menu o-hidden pcoded-inner-navbar-workspace\" cAccordion>\r\n        <div width=\"100%\" height=\"calc(100% - 40px)\" size=\"4px\" color=\"#fff\" opacity=\"0.3\" allowPageScroll=\"false\">\r\n            <ul class=\"nav\">\r\n                <li class=\"nav-item\" *ngFor=\"let item of tabs; index as i\"\r\n                    [ngClass]=\"this.currentUrl.toLowerCase() === item.menu.toLowerCase() ? 'active-menu':''\">\r\n                    <a class=\"nav-link\" href=\"javascript:void(0);\" (click)=\"loadMenu(item.menu)\">\r\n                        <span>{{item.subName}}</span>\r\n                    </a>\r\n                </li>\r\n            </ul>\r\n            <div (mouseover)=\"clicked = false\" *ngFor=\"let asideItems of menuItems ; index as i\"\r\n                [ngStyle]=\"{'margin-top': i == 0 ? '1rem': '0'}\" class=\"d-color pcoded-left-item--wrapper\">\r\n                <a class=\"pcoded-navigatio-lavel d-flex align-items-center\" menu-title-theme=\"theme5\"\r\n                    href=\"javascript:void(0)\"\r\n                    routerLink=\"/{{asideItems?.children[0]?.mainState}}/{{asideItems?.children[0]?.state}}\"\r\n                    (click)=\"selectItem(asideItems?.children[0])\" *ngIf=\"asideItems.label || menuItems.length > 0\">\r\n                    <span class=\"pcoded-micon\" title=\"{{asideItems.label}}\">\r\n                        <i class=\"{{ asideItems.icon }}\"></i>\r\n                    </span>\r\n                    <span>{{asideItems.label}}</span>\r\n                    <i [hidden]=\"asideItems.children.length == 1\" class=\"show-sub icofont-thin-right icofont\"></i>\r\n                </a>\r\n                <ul *ngIf=\"asideItems.children.length > 1\" (mouseup)=\"clicked = true\" [hidden]=\"clicked\"\r\n                    class=\"pcoded-item pcoded-left-item\" item-border=\"true\" item-border-style=\"none\"\r\n                    subitem-border=\"true\" katanaAccordionLink>\r\n                    <ng-template ngFor let-asideItem [ngForOf]=\"asideItems.children\">\r\n                        <li [routerLinkActive]=\"['active']\" *ngIf=\"asideItem.type === 'link'\" katanaAccordionLink\r\n                            group=\"{{asideItem.state}}\" class=\"pcoded-left-item-child\" (click)=\"toggleMenu()\">\r\n                            <a class=\"{{asideItems.label}}\" routerLink=\"/{{asideItem.mainState}}/{{asideItem.state}}\"\r\n                                target=\"{{asideItem.target ? '_blank' : '_self'}}\" katanaAccordionToggle\r\n                                *ngIf=\"asideItem.mainState; else mainContent\" (click)=\"selectItem(asideItem)\">\r\n                                <span class=\"pcoded-micon\">\r\n                                    <i class=\"{{ asideItem.icon }}\"></i>\r\n                                    <b>{{ asideItem.shortLabel }}</b>\r\n                                </span>\r\n                                <span class=\"pcoded-mtext\">{{ asideItem.name }}</span>\r\n                            </a>\r\n                            <ng-template #mainContent>\r\n                                <a [routerLink]=\"[asideItem.state]\" target=\"{{asideItem.target ? '_blank' : '_self'}}\"\r\n                                    cAccordionToggle>\r\n                                    <span class=\"pcoded-micon\">\r\n                                        <i class=\"{{ asideItem.icon }}\"></i>\r\n                                        <b>{{ asideItem.shortLabel }}</b>\r\n                                    </span>\r\n                                    <span class=\"pcoded-mtext\">{{ asideItem.name }}</span>\r\n                                    <span *ngFor=\"let asideBadge of asideItem.badge\"\r\n                                        class=\"pcoded-badge label label-{{ asideBadge.type }}\">{{asideBadge.value}}</span>\r\n                                    <span class=\"pcoded-mcaret\"></span>\r\n                                </a>\r\n                            </ng-template>\r\n                        </li>\r\n                    </ng-template>\r\n                </ul>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</nav>\r\n<div class=\"back-drop\" (click)=\"toggleMenu()\"></div>",
                styles: [".back-drop{display:none}@media (max-width:1024px){.back-drop{background:#000;opacity:.2;position:fixed;width:100%;height:100%;z-index:9}}"]
            }] }
];
/** @nocollapse */
DefaultSidebarComponent.ctorParameters = () => [
    { type: DefaultLayoutService },
    { type: ActivatedRoute },
    { type: Router },
    { type: MenuService },
    { type: ActionService },
    { type: AggregatorService }
];
DefaultSidebarComponent.propDecorators = {
    menuTabs: [{ type: Input }],
    navigateTo: [{ type: Input }],
    set: [{ type: Input }],
    menuType: [{ type: Input }],
    setActive: [{ type: Input }],
    change: [{ type: Output }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZWJhci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZnc0Yy8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2xheW91dC9zaWRlYmFyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLFlBQVksRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUMxRixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sRUFBRSxhQUFhLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN4RSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFFOUQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBUTFFLE1BQU0sT0FBTyx1QkFBdUI7Ozs7Ozs7OztJQWtCbEMsWUFDUyxzQkFBNEMsRUFDekMsS0FBcUIsRUFDckIsTUFBYyxFQUNkLFdBQXdCLEVBQ3hCLGFBQTRCLEVBQzVCLGlCQUFvQztRQUx2QywyQkFBc0IsR0FBdEIsc0JBQXNCLENBQXNCO1FBQ3pDLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQ3JCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBdkJoQyxhQUFRLEdBQWMsRUFBRSxDQUFDO1FBS3hCLFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBZ0IsQ0FBQztRQUVwRCxjQUFTLEdBQTRCLEVBQUUsQ0FBQztRQUV4QyxtQkFBYyxHQUE0QixFQUFFLENBQUM7UUFDN0MsZUFBVSxHQUFHLEtBQUssQ0FBQztRQUNuQixTQUFJ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OztJQUMxQix1Q0FBb0U7O0lBQ3BFLCtDQUF5Qjs7SUFDekIsNkNBQW1DOztJQUNuQywyQ0FBeUI7O0lBQ3pCLDBDQUF3Qjs7SUFHdEIseURBQW1EOzs7OztJQUNuRCx3Q0FBK0I7Ozs7O0lBQy9CLHlDQUF3Qjs7Ozs7SUFDeEIsOENBQWtDOzs7OztJQUNsQyxnREFBc0M7Ozs7O0lBQ3RDLG9EQUE4QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIE9uQ2hhbmdlcyB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBSb3V0ZXIsIE5hdmlnYXRpb25FbmQgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBEZWZhdWx0TGF5b3V0U2VydmljZSB9IGZyb20gJy4vbGF5b3V0LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBNZW51U2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9zZXJ2aWNlcy9tZW51LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBFeHRlbmRlZE1haW5NZW51R3JvdXAsIE1lbnVUYWIsIE1lbnVJdGVtLCBCcmVhZGNydW1iIH0gZnJvbSAnLi4vc2hhcmVkL21vZGVscy9iYXNlLm1vZGVsJztcclxuaW1wb3J0IHsgQWN0aW9uU2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9zZXJ2aWNlcy9hY3Rpb24uc2VydmljZSc7XHJcbmltcG9ydCB7IEFnZ3JlZ2F0b3JTZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL3NlcnZpY2VzL2FnZ3JlZ2F0b3Iuc2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2RlZmF1bHQtc2lkZWJhcicsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3NpZGViYXIuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3NpZGViYXIuY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIERlZmF1bHRTaWRlYmFyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBtZW51VGFiczogTWVudVRhYltdID0gW107XHJcbiAgQElucHV0KCkgcHVibGljIG5hdmlnYXRlVG86IChtZW51OiBzdHJpbmcsIHJvdXRlcjogUm91dGVyKSA9PiB2b2lkO1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBzZXQ6IChyb2xlOiBzdHJpbmcpID0+IE1lbnVJdGVtO1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBtZW51VHlwZTogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBzZXRBY3RpdmU6IGJvb2xlYW47XHJcbiAgQE91dHB1dCgpIHB1YmxpYyBjaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPEJyZWFkY3J1bWJbXT4oKTtcclxuICBwdWJsaWMgY3VycmVudFVybDogc3RyaW5nO1xyXG4gIHB1YmxpYyBtZW51SXRlbXM6IEV4dGVuZGVkTWFpbk1lbnVHcm91cFtdID0gW107XHJcbiAgcHVibGljIGlzQ29sbGFwc2VkU2lkZUJhcjogc3RyaW5nO1xyXG4gIHB1YmxpYyBjb2xsYXBzZWRJdGVtczogRXh0ZW5kZWRNYWluTWVudUdyb3VwW10gPSBbXTtcclxuICBwdWJsaWMgaXNTdXBwbGllciA9IGZhbHNlO1xyXG4gIHB1YmxpYyB0YWJzOiB7IG5hbWU6IHN0cmluZywgbWVudTogc3RyaW5nLCBzdWJOYW1lOiBzdHJpbmcgfVtdID0gW107XHJcbiAgcHVibGljIGNhcm91c2VsVGlsZTogYW55O1xyXG4gIHB1YmxpYyBpc1BhZ2VMb2FkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgcHVibGljIGlzTW9iaWxlOiBib29sZWFuO1xyXG4gIHB1YmxpYyBjbGlja2VkOiBib29sZWFuO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHB1YmxpYyB3b3Jrc3BhY2VMYXlvdXRTZXJ2aWNlOiBEZWZhdWx0TGF5b3V0U2VydmljZSxcclxuICAgIHByb3RlY3RlZCByb3V0ZTogQWN0aXZhdGVkUm91dGUsXHJcbiAgICBwcm90ZWN0ZWQgcm91dGVyOiBSb3V0ZXIsXHJcbiAgICBwcm90ZWN0ZWQgbWVudVNlcnZpY2U6IE1lbnVTZXJ2aWNlLFxyXG4gICAgcHJvdGVjdGVkIGFjdGlvblNlcnZpY2U6IEFjdGlvblNlcnZpY2UsXHJcbiAgICBwcm90ZWN0ZWQgYWdncmVnYXRvclNlcnZpY2U6IEFnZ3JlZ2F0b3JTZXJ2aWNlXHJcbiAgKSB7XHJcbiAgfVxyXG5cclxuICBuZ09uQ2hhbmdlcygpOiB2b2lkIHtcclxuICAgIHRoaXMuYWN0aW9uU2VydmljZS5leGVjdXRlQXN5bmMoKCkgPT4ge1xyXG4gICAgICB0aGlzLm1lbnVTZXJ2aWNlLmluaXQodGhpcy5tZW51VGFicywgKCkgPT4ge1xyXG4gICAgICAgIHRoaXMudGFicyA9IHRoaXMubWVudVNlcnZpY2UuZ2V0VGFicygpO1xyXG4gICAgICAgIHRoaXMuY3VycmVudFVybCA9IHRoaXMudGFic1swXS5tZW51O1xyXG4gICAgICAgIHRoaXMubWVudUl0ZW1zID0gdGhpcy5tZW51U2VydmljZS5sb2FkRmlyc3RUYWJJdGVtcyh0aGlzLmN1cnJlbnRVcmwpO1xyXG4gICAgICAgIHRoaXMuYWN0aW9uU2VydmljZS5leGVjdXRlQXN5bmMoKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5pc0NvbGxhcHNlZFNpZGVCYXIgPSAnbm8tYmxvY2snO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuYWN0aW9uU2VydmljZS5leGVjdXRlQXN5bmMoKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5zZWxlY3RNZW51KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIuZXZlbnRzLnN1YnNjcmliZSgoZXZlbnQpID0+IHtcclxuICAgICAgICAgIGlmIChldmVudCBpbnN0YW5jZW9mIE5hdmlnYXRpb25FbmQpIHtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25TZXJ2aWNlLmV4ZWN1dGVBc3luYygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgdGhpcy5zZWxlY3RNZW51KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9LCB0aGlzLnNldCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgaWYgKCF0aGlzLm5hdmlnYXRlVG8pIHtcclxuICAgICAgdGhpcy5uYXZpZ2F0ZVRvID0gKG1lbnU6IHN0cmluZywgcm91dGVyOiBSb3V0ZXIpID0+IHtcclxuICAgICAgICByb3V0ZXIubmF2aWdhdGUoWycvJywgbWVudSwgJ2Rhc2hib2FyZCddKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy5pc01vYmlsZSA9IHRoaXMuYWN0aW9uU2VydmljZS5pc01vYmlsZSgpO1xyXG4gICAgaWYgKHRoaXMuaXNNb2JpbGUpIHtcclxuICAgICAgaWYgKHRoaXMud29ya3NwYWNlTGF5b3V0U2VydmljZS52ZXJ0aWNhbEVmZmVjdCA9PSAnb3ZlcmxheScpIHtcclxuICAgICAgICB0aGlzLndvcmtzcGFjZUxheW91dFNlcnZpY2UudmVydGljYWxFZmZlY3QgPSAnc2hyaW5rJztcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLndvcmtzcGFjZUxheW91dFNlcnZpY2UudmVydGljYWxFZmZlY3QgPSAnb3ZlcmxheSc7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyB0b2dnbGVNZW51KCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuaXNNb2JpbGUgJiYgdGhpcy5tZW51VHlwZSA9PSAnTEVGVCcpIHtcclxuICAgICAgaWYgKHRoaXMud29ya3NwYWNlTGF5b3V0U2VydmljZS52ZXJ0aWNhbEVmZmVjdCA9PSAnb3ZlcmxheScpIHtcclxuICAgICAgICB0aGlzLndvcmtzcGFjZUxheW91dFNlcnZpY2UudmVydGljYWxFZmZlY3QgPSAnc2hyaW5rJztcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLndvcmtzcGFjZUxheW91dFNlcnZpY2UudmVydGljYWxFZmZlY3QgPSAnb3ZlcmxheSc7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyB0b2dnbGVPcGVuZWRTaWRlYmFyKCkge1xyXG4gICAgdGhpcy5pc0NvbGxhcHNlZFNpZGVCYXIgPSB0aGlzLmlzQ29sbGFwc2VkU2lkZUJhciA9PT0gJ3llcy1ibG9jaycgPyAnbm8tYmxvY2snIDogJ3llcy1ibG9jayc7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbG9hZE1lbnUobWVudTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICB0aGlzLm1lbnVJdGVtcyA9IHRoaXMubWVudVNlcnZpY2UubG9hZE1lbnVJdGVtcyhtZW51KTtcclxuICAgIHRoaXMuY3VycmVudFVybCA9IG1lbnUudG9Mb2NhbGVMb3dlckNhc2UoKTtcclxuICAgIHRoaXMubmF2aWdhdGVUbyh0aGlzLmN1cnJlbnRVcmwsIHRoaXMucm91dGVyKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZWxlY3RJdGVtKGl0ZW06IGFueSk6IHZvaWQge1xyXG4gICAgdGhpcy5hY3Rpb25TZXJ2aWNlLmNoYW5nZUl0ZW0oaXRlbSwgdGhpcy5tZW51VGFicywgKGl0ZW1zOiBCcmVhZGNydW1iW10pID0+IHtcclxuICAgICAgdGhpcy5jaGFuZ2UuZW1pdChpdGVtcyk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgc2VsZWN0TWVudSgpOiB2b2lkIHtcclxuICAgIHZhciB1cmwgPSB0aGlzLnJvdXRlci51cmw7XHJcbiAgICB2YXIgbWVudUl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBjb2RlZC1uYXZpZ2F0aW8tbGF2ZWwnKTtcclxuICAgIGlmIChtZW51SXRlbXMgJiYgbWVudUl0ZW1zLmxlbmd0aCA+IDApIHtcclxuICAgICAgbWVudUl0ZW1zLmZvckVhY2goKG1lbnU6IGFueSkgPT4ge1xyXG4gICAgICAgIG1lbnUuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICAgICAgdmFyIGNoaWxkcmVuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLiR7bWVudS50ZXh0fWApO1xyXG4gICAgICAgIGlmIChjaGlsZHJlbiAmJiBjaGlsZHJlbi5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICBjaGlsZHJlbi5mb3JFYWNoKChjaGlsZCkgPT4ge1xyXG4gICAgICAgICAgICBjaGlsZC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobWVudS5ocmVmICYmIG1lbnUuaHJlZi5pbmRleE9mKHVybCkgPiAtMSkge1xyXG4gICAgICAgICAgbWVudS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgaWYgKGNoaWxkcmVuICYmIGNoaWxkcmVuLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQ6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgIGlmIChjaGlsZC5ocmVmICYmIGNoaWxkLmhyZWYuaW5kZXhPZih1cmwpID4gLTEpIHtcclxuICAgICAgICAgICAgICAgIGNoaWxkLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgbWVudS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==