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
                        this.selectMenu();
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
    removeActiveStateNavigationMenu() {
        /** @type {?} */
        let navigationLevelArr = document.querySelectorAll(".pcoded-left-item--wrapper .pcoded-navigatio-lavel");
        for (let i = 0; i < navigationLevelArr.length; i++) {
            navigationLevelArr[i].classList.remove("active");
        }
        /** @type {?} */
        let subMenuLevelArr = document.querySelectorAll(".pcoded-left-item--wrapper .pcoded-left-item");
        for (let i = 0; i < subMenuLevelArr.length; i++) {
            subMenuLevelArr[i].classList.remove("active");
        }
        /** @type {?} */
        let mainContentWrapper = document.querySelector(".pcoded-main-container .pcoded-content");
        mainContentWrapper.classList.remove("active");
    }
    /**
     * @param {?} group
     * @param {?} $event
     * @return {?}
     */
    toggleGroup(group, $event) {
        if (event != null || event != undefined) {
            /** @type {?} */
            let target = $event.target || $event.srcElement || $event.currentTarget;
            /** @type {?} */
            let curNavigationLevel = target.closest(".pcoded-navigatio-lavel");
            if (curNavigationLevel.classList.contains("active")) {
                this.removeActiveStateNavigationMenu();
            }
            else {
                this.removeActiveStateNavigationMenu();
                /** @type {?} */
                let listChildrenItemInTarget = target.closest(".pcoded-left-item--wrapper").children;
                for (let i = 0; i < listChildrenItemInTarget.length; i++) {
                    if (listChildrenItemInTarget[i].classList.contains("pcoded-left-item")) {
                        listChildrenItemInTarget[i].classList.add("active");
                    }
                }
                target.closest(".pcoded-navigatio-lavel").classList.toggle("active");
                /** @type {?} */
                let mainContentWrapper = document.querySelector(".pcoded-main-container .pcoded-content");
                mainContentWrapper.classList.add("active");
            }
        }
        /** @type {?} */
        const index = this.collapsedItems.indexOf(group);
        if (index >= 0) {
            this.collapsedItems.splice(index, 1);
        }
        else {
            this.collapsedItems.push(group);
        }
    }
    /**
     * @param {?} group
     * @return {?}
     */
    isGroupCollapsed(group) {
        return this.collapsedItems.indexOf(group) >= 0;
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
        this.changeItem(item);
    }
    /**
     * @param {?} item
     * @return {?}
     */
    changeItem(item) {
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
                template: "<nav id=\"main_navbar\" class=\"pcoded-navbar workspace-side-bar\"\r\n    (clickOutside)=\"workspaceLayoutService.onClickedOutside($event)\" [exclude]=\"'#mobile-collapse'\"\r\n    [attr.pcoded-header-position]=\"workspaceLayoutService.pcodedHeaderPosition\"\r\n    [attr.navbar-theme]=\"workspaceLayoutService.navBarTheme\"\r\n    [attr.active-item-theme]=\"workspaceLayoutService.activeItemTheme\" sub-item-theme=\"theme2\" active-item-style=\"style0\"\r\n    [attr.pcoded-navbar-position]=\"workspaceLayoutService.pcodedSidebarPosition\">\r\n    <div class=\"pcoded-inner-navbar main-menu o-hidden pcoded-inner-navbar-workspace\" cAccordion>\r\n        <div width=\"100%\" height=\"calc(100% - 40px)\" size=\"4px\" color=\"#fff\" opacity=\"0.3\" allowPageScroll=\"false\">\r\n            <ul class=\"nav\">\r\n                <li class=\"nav-item\" *ngFor=\"let item of tabs; index as i\"\r\n                    [ngClass]=\"this.currentUrl.toLowerCase() === item.menu.toLowerCase() ? 'active-menu':''\">\r\n                    <a class=\"nav-link\" href=\"javascript:void(0);\" (click)=\"loadMenu(item.menu)\">\r\n                        <span>{{item.subName}}</span>\r\n                    </a>\r\n                </li>\r\n            </ul>\r\n            <div (mouseover)=\"clicked = false\" *ngFor=\"let asideItems of menuItems ; index as i\"\r\n                [ngStyle]=\"{'margin-top': i == 0 ? '1rem': '0'}\" class=\"d-color pcoded-left-item--wrapper\">\r\n                <a class=\"pcoded-navigatio-lavel d-flex align-items-center\" menu-title-theme=\"theme5\"\r\n                    href=\"javascript:void(0)\"\r\n                    routerLink=\"/{{asideItems?.children[0]?.mainState}}/{{asideItems?.children[0]?.state}}\"\r\n                    (click)=\"selectItem(asideItems?.children[0])\"\r\n                    *ngIf=\"asideItems.label || menuItems.length > 0\">\r\n                    <span class=\"pcoded-micon\" title=\"{{asideItems.label}}\">\r\n                        <i class=\"{{ asideItems.icon }}\"></i>\r\n                    </span>\r\n                    <span>{{asideItems.label}}</span>\r\n                    <i [hidden]=\"asideItems.children.length == 1\" class=\"show-sub icofont-thin-right icofont\"></i>\r\n                </a>\r\n                <ul *ngIf=\"asideItems.children.length > 1\" (mouseup)=\"clicked = true\" [hidden]=\"clicked\"\r\n                    class=\"pcoded-item pcoded-left-item\" item-border=\"true\" item-border-style=\"none\"\r\n                    subitem-border=\"true\" katanaAccordionLink>\r\n                    <ng-template ngFor let-asideItem [ngForOf]=\"asideItems.children\">\r\n                        <li [routerLinkActive]=\"['active']\" *ngIf=\"asideItem.type === 'link'\" katanaAccordionLink\r\n                            group=\"{{asideItem.state}}\" class=\"pcoded-left-item-child li-{{asideItems.label}}\" (click)=\"toggleMenu()\">\r\n                            <a class=\"{{asideItems.label}}\" routerLink=\"/{{asideItem.mainState}}/{{asideItem.state}}\"\r\n                                target=\"{{asideItem.target ? '_blank' : '_self'}}\" katanaAccordionToggle\r\n                                *ngIf=\"asideItem.mainState; else mainContent\"\r\n                                (click)=\"selectItem(asideItem)\">\r\n                                <span class=\"pcoded-micon\">\r\n                                    <i class=\"{{ asideItem.icon }}\"></i>\r\n                                    <b>{{ asideItem.shortLabel }}</b>\r\n                                </span>\r\n                                <span class=\"pcoded-mtext\">{{ asideItem.name }}</span>\r\n                            </a>\r\n                            <ng-template #mainContent>\r\n                                <a [routerLink]=\"[asideItem.state]\" target=\"{{asideItem.target ? '_blank' : '_self'}}\"\r\n                                    cAccordionToggle>\r\n                                    <span class=\"pcoded-micon\">\r\n                                        <i class=\"{{ asideItem.icon }}\"></i>\r\n                                        <b>{{ asideItem.shortLabel }}</b>\r\n                                    </span>\r\n                                    <span class=\"pcoded-mtext\">{{ asideItem.name }}</span>\r\n                                    <span *ngFor=\"let asideBadge of asideItem.badge\"\r\n                                        class=\"pcoded-badge label label-{{ asideBadge.type }}\">{{asideBadge.value}}</span>\r\n                                    <span class=\"pcoded-mcaret\"></span>\r\n                                </a>\r\n                            </ng-template>\r\n                        </li>\r\n                    </ng-template>\r\n                </ul>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</nav>\r\n<div class=\"back-drop\" (click)=\"toggleMenu()\"></div>",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZWJhci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZnc0Yy8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2xheW91dC9zaWRlYmFyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLFlBQVksRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUMxRixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sRUFBRSxhQUFhLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN4RSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFFOUQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBUTFFLE1BQU0sT0FBTyx1QkFBdUI7Ozs7Ozs7OztJQWtCbEMsWUFDUyxzQkFBNEMsRUFDekMsS0FBcUIsRUFDckIsTUFBYyxFQUNkLFdBQXdCLEVBQ3hCLGFBQTRCLEVBQzVCLGlCQUFvQztRQUx2QywyQkFBc0IsR0FBdEIsc0JBQXNCLENBQXNCO1FBQ3pDLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQ3JCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBdkJoQyxhQUFRLEdBQWMsRUFBRSxDQUFDO1FBS3hCLFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBZ0IsQ0FBQztRQUVwRCxjQUFTLEdBQTRCLEVBQUUsQ0FBQztRQUV4QyxtQkFBYyxHQUE0QixFQUFFLENBQUM7UUFDN0MsZUFBVSxHQUFHLEtBQUssQ0FBQztRQUNuQixTQUFJ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LHlEQUFtRDs7Ozs7SUFDbkQsd0NBQStCOzs7OztJQUMvQix5Q0FBd0I7Ozs7O0lBQ3hCLDhDQUFrQzs7Ozs7SUFDbEMsZ0RBQXNDOzs7OztJQUN0QyxvREFBOEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBPbkNoYW5nZXMgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSwgUm91dGVyLCBOYXZpZ2F0aW9uRW5kIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgRGVmYXVsdExheW91dFNlcnZpY2UgfSBmcm9tICcuL2xheW91dC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTWVudVNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQvc2VydmljZXMvbWVudS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgRXh0ZW5kZWRNYWluTWVudUdyb3VwLCBNZW51VGFiLCBNZW51SXRlbSwgQnJlYWRjcnVtYiB9IGZyb20gJy4uL3NoYXJlZC9tb2RlbHMvYmFzZS5tb2RlbCc7XHJcbmltcG9ydCB7IEFjdGlvblNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQvc2VydmljZXMvYWN0aW9uLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBBZ2dyZWdhdG9yU2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9zZXJ2aWNlcy9hZ2dyZWdhdG9yLnNlcnZpY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdkZWZhdWx0LXNpZGViYXInLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9zaWRlYmFyLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9zaWRlYmFyLmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBEZWZhdWx0U2lkZWJhckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcclxuICBASW5wdXQoKSBwdWJsaWMgbWVudVRhYnM6IE1lbnVUYWJbXSA9IFtdO1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBuYXZpZ2F0ZVRvOiAobWVudTogc3RyaW5nLCByb3V0ZXI6IFJvdXRlcikgPT4gdm9pZDtcclxuICBASW5wdXQoKSBwdWJsaWMgc2V0OiAocm9sZTogc3RyaW5nKSA9PiBNZW51SXRlbTtcclxuICBASW5wdXQoKSBwdWJsaWMgbWVudVR5cGU6IHN0cmluZztcclxuICBASW5wdXQoKSBwdWJsaWMgc2V0QWN0aXZlOiBib29sZWFuO1xyXG4gIEBPdXRwdXQoKSBwdWJsaWMgY2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxCcmVhZGNydW1iW10+KCk7XHJcbiAgcHVibGljIGN1cnJlbnRVcmw6IHN0cmluZztcclxuICBwdWJsaWMgbWVudUl0ZW1zOiBFeHRlbmRlZE1haW5NZW51R3JvdXBbXSA9IFtdO1xyXG4gIHB1YmxpYyBpc0NvbGxhcHNlZFNpZGVCYXI6IHN0cmluZztcclxuICBwdWJsaWMgY29sbGFwc2VkSXRlbXM6IEV4dGVuZGVkTWFpbk1lbnVHcm91cFtdID0gW107XHJcbiAgcHVibGljIGlzU3VwcGxpZXIgPSBmYWxzZTtcclxuICBwdWJsaWMgdGFiczogeyBuYW1lOiBzdHJpbmcsIG1lbnU6IHN0cmluZywgc3ViTmFtZTogc3RyaW5nIH1bXSA9IFtdO1xyXG4gIHB1YmxpYyBjYXJvdXNlbFRpbGU6IGFueTtcclxuICBwdWJsaWMgaXNQYWdlTG9hZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIHB1YmxpYyBpc01vYmlsZTogYm9vbGVhbjtcclxuICBwdWJsaWMgY2xpY2tlZDogYm9vbGVhbjtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwdWJsaWMgd29ya3NwYWNlTGF5b3V0U2VydmljZTogRGVmYXVsdExheW91dFNlcnZpY2UsXHJcbiAgICBwcm90ZWN0ZWQgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxyXG4gICAgcHJvdGVjdGVkIHJvdXRlcjogUm91dGVyLFxyXG4gICAgcHJvdGVjdGVkIG1lbnVTZXJ2aWNlOiBNZW51U2VydmljZSxcclxuICAgIHByb3RlY3RlZCBhY3Rpb25TZXJ2aWNlOiBBY3Rpb25TZXJ2aWNlLFxyXG4gICAgcHJvdGVjdGVkIGFnZ3JlZ2F0b3JTZXJ2aWNlOiBBZ2dyZWdhdG9yU2VydmljZVxyXG4gICkge1xyXG4gIH1cclxuXHJcbiAgbmdPbkNoYW5nZXMoKTogdm9pZCB7XHJcbiAgICB0aGlzLmFjdGlvblNlcnZpY2UuZXhlY3V0ZUFzeW5jKCgpID0+IHtcclxuICAgICAgdGhpcy5tZW51U2VydmljZS5pbml0KHRoaXMubWVudVRhYnMsICgpID0+IHtcclxuICAgICAgICB0aGlzLnRhYnMgPSB0aGlzLm1lbnVTZXJ2aWNlLmdldFRhYnMoKTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRVcmwgPSB0aGlzLnRhYnNbMF0ubWVudTtcclxuICAgICAgICB0aGlzLm1lbnVJdGVtcyA9IHRoaXMubWVudVNlcnZpY2UubG9hZEZpcnN0VGFiSXRlbXModGhpcy5jdXJyZW50VXJsKTtcclxuICAgICAgICB0aGlzLmFjdGlvblNlcnZpY2UuZXhlY3V0ZUFzeW5jKCgpID0+IHtcclxuICAgICAgICAgIHRoaXMuaXNDb2xsYXBzZWRTaWRlQmFyID0gJ25vLWJsb2NrJztcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmFjdGlvblNlcnZpY2UuZXhlY3V0ZUFzeW5jKCgpID0+IHtcclxuICAgICAgICAgIHRoaXMuc2VsZWN0TWVudSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMucm91dGVyLmV2ZW50cy5zdWJzY3JpYmUoKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICBpZiAoZXZlbnQgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRW5kKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0TWVudSgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9LCB0aGlzLnNldCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgaWYgKCF0aGlzLm5hdmlnYXRlVG8pIHtcclxuICAgICAgdGhpcy5uYXZpZ2F0ZVRvID0gKG1lbnU6IHN0cmluZywgcm91dGVyOiBSb3V0ZXIpID0+IHtcclxuICAgICAgICByb3V0ZXIubmF2aWdhdGUoWycvJywgbWVudSwgJ2Rhc2hib2FyZCddKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy5pc01vYmlsZSA9IHRoaXMuYWN0aW9uU2VydmljZS5pc01vYmlsZSgpO1xyXG4gICAgaWYgKHRoaXMuaXNNb2JpbGUpIHtcclxuICAgICAgaWYgKHRoaXMud29ya3NwYWNlTGF5b3V0U2VydmljZS52ZXJ0aWNhbEVmZmVjdCA9PSAnb3ZlcmxheScpIHtcclxuICAgICAgICB0aGlzLndvcmtzcGFjZUxheW91dFNlcnZpY2UudmVydGljYWxFZmZlY3QgPSAnc2hyaW5rJztcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLndvcmtzcGFjZUxheW91dFNlcnZpY2UudmVydGljYWxFZmZlY3QgPSAnb3ZlcmxheSc7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyB0b2dnbGVNZW51KCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuaXNNb2JpbGUgJiYgdGhpcy5tZW51VHlwZSA9PSAnTEVGVCcpIHtcclxuICAgICAgaWYgKHRoaXMud29ya3NwYWNlTGF5b3V0U2VydmljZS52ZXJ0aWNhbEVmZmVjdCA9PSAnb3ZlcmxheScpIHtcclxuICAgICAgICB0aGlzLndvcmtzcGFjZUxheW91dFNlcnZpY2UudmVydGljYWxFZmZlY3QgPSAnc2hyaW5rJztcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLndvcmtzcGFjZUxheW91dFNlcnZpY2UudmVydGljYWxFZmZlY3QgPSAnb3ZlcmxheSc7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyByZW1vdmVBY3RpdmVTdGF0ZU5hdmlnYXRpb25NZW51KCk6IHZvaWQge1xyXG4gICAgbGV0IG5hdmlnYXRpb25MZXZlbEFyciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucGNvZGVkLWxlZnQtaXRlbS0td3JhcHBlciAucGNvZGVkLW5hdmlnYXRpby1sYXZlbFwiKTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmF2aWdhdGlvbkxldmVsQXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIG5hdmlnYXRpb25MZXZlbEFycltpXS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgfVxyXG4gICAgbGV0IHN1Yk1lbnVMZXZlbEFyciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucGNvZGVkLWxlZnQtaXRlbS0td3JhcHBlciAucGNvZGVkLWxlZnQtaXRlbVwiKTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3ViTWVudUxldmVsQXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIHN1Yk1lbnVMZXZlbEFycltpXS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgfVxyXG4gICAgbGV0IG1haW5Db250ZW50V3JhcHBlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGNvZGVkLW1haW4tY29udGFpbmVyIC5wY29kZWQtY29udGVudFwiKTtcclxuICAgIG1haW5Db250ZW50V3JhcHBlci5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHRvZ2dsZUdyb3VwKGdyb3VwOiBFeHRlbmRlZE1haW5NZW51R3JvdXAsICRldmVudDogYW55KTogdm9pZCB7XHJcbiAgICBpZiAoZXZlbnQgIT0gbnVsbCB8fCBldmVudCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgbGV0IHRhcmdldCA9ICRldmVudC50YXJnZXQgfHwgJGV2ZW50LnNyY0VsZW1lbnQgfHwgJGV2ZW50LmN1cnJlbnRUYXJnZXQ7XHJcbiAgICAgIGxldCBjdXJOYXZpZ2F0aW9uTGV2ZWwgPSB0YXJnZXQuY2xvc2VzdChcIi5wY29kZWQtbmF2aWdhdGlvLWxhdmVsXCIpO1xyXG4gICAgICBpZiAoY3VyTmF2aWdhdGlvbkxldmVsLmNsYXNzTGlzdC5jb250YWlucyhcImFjdGl2ZVwiKSkge1xyXG4gICAgICAgIHRoaXMucmVtb3ZlQWN0aXZlU3RhdGVOYXZpZ2F0aW9uTWVudSgpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMucmVtb3ZlQWN0aXZlU3RhdGVOYXZpZ2F0aW9uTWVudSgpO1xyXG4gICAgICAgIGxldCBsaXN0Q2hpbGRyZW5JdGVtSW5UYXJnZXQgPSB0YXJnZXQuY2xvc2VzdChcIi5wY29kZWQtbGVmdC1pdGVtLS13cmFwcGVyXCIpLmNoaWxkcmVuO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGlzdENoaWxkcmVuSXRlbUluVGFyZ2V0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICBpZiAobGlzdENoaWxkcmVuSXRlbUluVGFyZ2V0W2ldLmNsYXNzTGlzdC5jb250YWlucyhcInBjb2RlZC1sZWZ0LWl0ZW1cIikpIHtcclxuICAgICAgICAgICAgbGlzdENoaWxkcmVuSXRlbUluVGFyZ2V0W2ldLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRhcmdldC5jbG9zZXN0KFwiLnBjb2RlZC1uYXZpZ2F0aW8tbGF2ZWxcIikuY2xhc3NMaXN0LnRvZ2dsZShcImFjdGl2ZVwiKTtcclxuICAgICAgICBsZXQgbWFpbkNvbnRlbnRXcmFwcGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wY29kZWQtbWFpbi1jb250YWluZXIgLnBjb2RlZC1jb250ZW50XCIpO1xyXG4gICAgICAgIG1haW5Db250ZW50V3JhcHBlci5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuY29sbGFwc2VkSXRlbXMuaW5kZXhPZihncm91cCk7XHJcbiAgICBpZiAoaW5kZXggPj0gMCkge1xyXG4gICAgICB0aGlzLmNvbGxhcHNlZEl0ZW1zLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmNvbGxhcHNlZEl0ZW1zLnB1c2goZ3JvdXApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGlzR3JvdXBDb2xsYXBzZWQoZ3JvdXA6IEV4dGVuZGVkTWFpbk1lbnVHcm91cCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuY29sbGFwc2VkSXRlbXMuaW5kZXhPZihncm91cCkgPj0gMDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyB0b2dnbGVPcGVuZWRTaWRlYmFyKCkge1xyXG4gICAgdGhpcy5pc0NvbGxhcHNlZFNpZGVCYXIgPSB0aGlzLmlzQ29sbGFwc2VkU2lkZUJhciA9PT0gJ3llcy1ibG9jaycgPyAnbm8tYmxvY2snIDogJ3llcy1ibG9jayc7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbG9hZE1lbnUobWVudTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICB0aGlzLm1lbnVJdGVtcyA9IHRoaXMubWVudVNlcnZpY2UubG9hZE1lbnVJdGVtcyhtZW51KTtcclxuICAgIHRoaXMuY3VycmVudFVybCA9IG1lbnUudG9Mb2NhbGVMb3dlckNhc2UoKTtcclxuICAgIHRoaXMubmF2aWdhdGVUbyh0aGlzLmN1cnJlbnRVcmwsIHRoaXMucm91dGVyKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZWxlY3RJdGVtKGl0ZW06IGFueSk6IHZvaWQge1xyXG4gICAgdGhpcy5jaGFuZ2VJdGVtKGl0ZW0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGNoYW5nZUl0ZW0oaXRlbTogYW55KTogdm9pZCB7XHJcbiAgICB0aGlzLmFjdGlvblNlcnZpY2UuY2hhbmdlSXRlbShpdGVtLCB0aGlzLm1lbnVUYWJzLCAoaXRlbXM6IEJyZWFkY3J1bWJbXSkgPT4ge1xyXG4gICAgICB0aGlzLmNoYW5nZS5lbWl0KGl0ZW1zKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzZWxlY3RNZW51KCk6IHZvaWQge1xyXG4gICAgdmFyIHVybCA9IHRoaXMucm91dGVyLnVybDtcclxuICAgIHZhciBtZW51SXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucGNvZGVkLW5hdmlnYXRpby1sYXZlbCcpO1xyXG4gICAgaWYgKG1lbnVJdGVtcyAmJiBtZW51SXRlbXMubGVuZ3RoID4gMCkge1xyXG4gICAgICBtZW51SXRlbXMuZm9yRWFjaCgobWVudTogYW55KSA9PiB7XHJcbiAgICAgICAgbWVudS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuICAgICAgICB2YXIgY2hpbGRyZW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAuJHttZW51LnRleHR9YCk7XHJcbiAgICAgICAgaWYgKGNoaWxkcmVuICYmIGNoaWxkcmVuLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgIGNoaWxkcmVuLmZvckVhY2goKGNoaWxkKSA9PiB7XHJcbiAgICAgICAgICAgIGNoaWxkLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChtZW51LmhyZWYgJiYgbWVudS5ocmVmLmluZGV4T2YodXJsKSA+IC0xKSB7XHJcbiAgICAgICAgICBtZW51LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBpZiAoY2hpbGRyZW4gJiYgY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBjaGlsZHJlbi5mb3JFYWNoKChjaGlsZDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgaWYgKGNoaWxkLmhyZWYgJiYgY2hpbGQuaHJlZi5pbmRleE9mKHVybCkgPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgY2hpbGQuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICBtZW51LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19