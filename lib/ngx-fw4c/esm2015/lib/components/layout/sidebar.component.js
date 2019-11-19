/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultLayoutService } from './layout.service';
import { MenuService } from '../shared/services/menu.service';
import { ActionService } from '../shared/services/action.service';
export class DefaultSidebarComponent {
    /**
     * @param {?} workspaceLayoutService
     * @param {?} route
     * @param {?} router
     * @param {?} menuService
     * @param {?} actionService
     */
    constructor(workspaceLayoutService, route, router, menuService, actionService) {
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
                                        let items = document.querySelectorAll(".pcoded-navigatio-lavel");
                                        if (items && items.length > 0) {
                                            for (let i = 0; i < items.length; i++) {
                                                /** @type {?} */
                                                const href = ((/** @type {?} */ (items[i]))).href;
                                                if (href && href.toString().indexOf(state) > 0) {
                                                    this.selectItem({
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
     * @param {?} $event
     * @param {?} item
     * @return {?}
     */
    selectItem($event, item) {
        /** @type {?} */
        let naviLevelAll = document.querySelectorAll(".pcoded-navigatio-lavel");
        for (let i = 0; i < naviLevelAll.length; i++) {
            naviLevelAll[i].classList.remove("active");
        }
        /** @type {?} */
        let target = $event.target || $event.srcElement || $event.currentTarget;
        target.closest(".pcoded-left-item--wrapper").classList.add("active");
        /** @type {?} */
        let listChildrenItemInTarget = target.closest(".pcoded-left-item--wrapper").children;
        for (let i = 0; i < listChildrenItemInTarget.length; i++) {
            if (listChildrenItemInTarget[i].classList.contains("pcoded-navigatio-lavel")) {
                listChildrenItemInTarget[i].classList.add("active");
            }
        }
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
}
DefaultSidebarComponent.decorators = [
    { type: Component, args: [{
                selector: 'default-sidebar',
                template: "<nav id=\"main_navbar\" class=\"pcoded-navbar workspace-side-bar\"\r\n    (clickOutside)=\"workspaceLayoutService.onClickedOutside($event)\" [exclude]=\"'#mobile-collapse'\"\r\n    [attr.pcoded-header-position]=\"workspaceLayoutService.pcodedHeaderPosition\"\r\n    [attr.navbar-theme]=\"workspaceLayoutService.navBarTheme\"\r\n    [attr.active-item-theme]=\"workspaceLayoutService.activeItemTheme\" sub-item-theme=\"theme2\" active-item-style=\"style0\"\r\n    [attr.pcoded-navbar-position]=\"workspaceLayoutService.pcodedSidebarPosition\">\r\n    <div class=\"pcoded-inner-navbar main-menu o-hidden pcoded-inner-navbar-workspace\" cAccordion>\r\n        <div width=\"100%\" height=\"calc(100% - 40px)\" size=\"4px\" color=\"#fff\" opacity=\"0.3\" allowPageScroll=\"false\">\r\n            <ul class=\"nav\">\r\n                <li class=\"nav-item\" *ngFor=\"let item of tabs; index as i\"\r\n                    [ngClass]=\"this.currentUrl.toLowerCase() === item.menu.toLowerCase() ? 'active-menu':''\">\r\n                    <a class=\"nav-link\" href=\"javascript:void(0);\" (click)=\"loadMenu(item.menu)\">\r\n                        <span>{{item.subName}}</span>\r\n                    </a>\r\n                </li>\r\n            </ul>\r\n            <div (mouseover)=\"clicked = false\" *ngFor=\"let asideItems of menuItems ; index as i\"\r\n                [ngStyle]=\"{'margin-top': i == 0 ? '1rem': '0'}\" class=\"d-color pcoded-left-item--wrapper\">\r\n                <a class=\"pcoded-navigatio-lavel d-flex align-items-center\" menu-title-theme=\"theme5\"\r\n                    href=\"javascript:void(0)\"\r\n                    routerLink=\"/{{asideItems?.children[0]?.mainState}}/{{asideItems?.children[0]?.state}}\"\r\n                    (click)=\"selectItem($event, asideItems?.children[0])\"\r\n                    *ngIf=\"asideItems.label || menuItems.length > 0\">\r\n                    <span class=\"pcoded-micon\" title=\"{{asideItems.label}}\">\r\n                        <i class=\"{{ asideItems.icon }}\"></i>\r\n                    </span>\r\n                    <span>{{asideItems.label}}</span>\r\n                    <i [hidden]=\"asideItems.children.length == 1\" class=\"show-sub icofont-thin-right icofont\"></i>\r\n                </a>\r\n                <ul *ngIf=\"asideItems.children.length > 1\" (mouseup)=\"clicked = true\" [hidden]=\"clicked\"\r\n                    class=\"pcoded-item pcoded-left-item\" item-border=\"true\" item-border-style=\"none\"\r\n                    subitem-border=\"true\" katanaAccordionLink>\r\n                    <ng-template ngFor let-asideItem [ngForOf]=\"asideItems.children\">\r\n                        <li [routerLinkActive]=\"['active']\" *ngIf=\"asideItem.type === 'link'\" katanaAccordionLink\r\n                            group=\"{{asideItem.state}}\" class=\"pcoded-left-item-child\" (click)=\"toggleMenu()\">\r\n                            <a routerLink=\"/{{asideItem.mainState}}/{{asideItem.state}}\"\r\n                                target=\"{{asideItem.target ? '_blank' : '_self'}}\" katanaAccordionToggle\r\n                                *ngIf=\"asideItem.mainState; else mainContent\"\r\n                                (click)=\"selectItem($event, asideItem)\">\r\n                                <span class=\"pcoded-micon\">\r\n                                    <i class=\"{{ asideItem.icon }}\"></i>\r\n                                    <b>{{ asideItem.shortLabel }}</b>\r\n                                </span>\r\n                                <span class=\"pcoded-mtext\">{{ asideItem.name }}</span>\r\n                            </a>\r\n                            <ng-template #mainContent>\r\n                                <a [routerLink]=\"[asideItem.state]\" target=\"{{asideItem.target ? '_blank' : '_self'}}\"\r\n                                    cAccordionToggle>\r\n                                    <span class=\"pcoded-micon\">\r\n                                        <i class=\"{{ asideItem.icon }}\"></i>\r\n                                        <b>{{ asideItem.shortLabel }}</b>\r\n                                    </span>\r\n                                    <span class=\"pcoded-mtext\">{{ asideItem.name }}</span>\r\n                                    <span *ngFor=\"let asideBadge of asideItem.badge\"\r\n                                        class=\"pcoded-badge label label-{{ asideBadge.type }}\">{{asideBadge.value}}</span>\r\n                                    <span class=\"pcoded-mcaret\"></span>\r\n                                </a>\r\n                            </ng-template>\r\n                        </li>\r\n                    </ng-template>\r\n                </ul>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</nav>\r\n<div class=\"back-drop\" (click)=\"toggleMenu()\"></div>",
                styles: [".back-drop{display:none}@media (max-width:1024px){.back-drop{background:#000;opacity:.2;position:fixed;width:100%;height:100%;z-index:9}}"]
            }] }
];
/** @nocollapse */
DefaultSidebarComponent.ctorParameters = () => [
    { type: DefaultLayoutService },
    { type: ActivatedRoute },
    { type: Router },
    { type: MenuService },
    { type: ActionService }
];
DefaultSidebarComponent.propDecorators = {
    menuTabs: [{ type: Input }],
    navigateTo: [{ type: Input }],
    set: [{ type: Input }],
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZWJhci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZnc0Yy8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2xheW91dC9zaWRlYmFyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLFlBQVksRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUMxRixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUU5RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFRbEUsTUFBTSxPQUFPLHVCQUF1Qjs7Ozs7Ozs7SUFpQmxDLFlBQ1Msc0JBQTRDLEVBQ3pDLEtBQXFCLEVBQ3JCLE1BQWMsRUFDZCxXQUF3QixFQUN4QixhQUE0QjtRQUovQiwyQkFBc0IsR0FBdEIsc0JBQXNCLENBQXNCO1FBQ3pDLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQ3JCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQXJCeEIsYUFBUSxHQUFjLEVBQUUsQ0FBQztRQUl4QixXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQWdCLENBQUM7UUFFcEQsY0FBUyxHQUE0QixFQUFFLENBQUM7UUFFeEMsbUJBQWMsR0FBNEIsRUFBRSxDQUFDO1FBQzdDLGVBQVUsR0FBRyxLQUFLLENBQUM7UUFDbkIsU0FBSSxHQUFzRCxFQUFFLENBQUM7UUFFN0QsZUFBVSxHQUFZLEtBQUssQ0FBQztJQVUvQixDQUFDOzs7O0lBRUwsV0FBVztRQUNULElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWTs7O1FB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QUNuQyx5Q0FBMkQ7O0lBQzNELDZDQUEwQjs7SUFDMUIsNENBQStDOztJQUMvQyxxREFBa0M7O0lBQ2xDLGlEQUFvRDs7SUFDcEQsNkNBQTBCOztJQUMxQix1Q0FBb0U7O0lBQ3BFLCtDQUF5Qjs7SUFDekIsNkNBQW1DOztJQUNuQywyQ0FBeUI7O0lBQ3pCLDBDQUF3Qjs7SUFHdEIseURBQW1EOzs7OztJQUNuRCx3Q0FBK0I7Ozs7O0lBQy9CLHlDQUF3Qjs7Ozs7SUFDeEIsOENBQWtDOzs7OztJQUNsQyxnREFBc0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBPbkNoYW5nZXMgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSwgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgRGVmYXVsdExheW91dFNlcnZpY2UgfSBmcm9tICcuL2xheW91dC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTWVudVNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQvc2VydmljZXMvbWVudS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgRXh0ZW5kZWRNYWluTWVudUdyb3VwLCBNZW51VGFiLCBNZW51SXRlbSwgQnJlYWRjcnVtYiB9IGZyb20gJy4uL3NoYXJlZC9tb2RlbHMvYmFzZS5tb2RlbCc7XHJcbmltcG9ydCB7IEFjdGlvblNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQvc2VydmljZXMvYWN0aW9uLnNlcnZpY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdkZWZhdWx0LXNpZGViYXInLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9zaWRlYmFyLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9zaWRlYmFyLmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBEZWZhdWx0U2lkZWJhckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcclxuICBASW5wdXQoKSBwdWJsaWMgbWVudVRhYnM6IE1lbnVUYWJbXSA9IFtdO1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBuYXZpZ2F0ZVRvOiAobWVudTogc3RyaW5nLCByb3V0ZXI6IFJvdXRlcikgPT4gdm9pZDtcclxuICBASW5wdXQoKSBwdWJsaWMgc2V0OiAocm9sZTogc3RyaW5nKSA9PiBNZW51SXRlbTtcclxuICBASW5wdXQoKSBwdWJsaWMgc2V0QWN0aXZlOiBib29sZWFuO1xyXG4gIEBPdXRwdXQoKSBwdWJsaWMgY2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxCcmVhZGNydW1iW10+KCk7XHJcbiAgcHVibGljIGN1cnJlbnRVcmw6IHN0cmluZztcclxuICBwdWJsaWMgbWVudUl0ZW1zOiBFeHRlbmRlZE1haW5NZW51R3JvdXBbXSA9IFtdO1xyXG4gIHB1YmxpYyBpc0NvbGxhcHNlZFNpZGVCYXI6IHN0cmluZztcclxuICBwdWJsaWMgY29sbGFwc2VkSXRlbXM6IEV4dGVuZGVkTWFpbk1lbnVHcm91cFtdID0gW107XHJcbiAgcHVibGljIGlzU3VwcGxpZXIgPSBmYWxzZTtcclxuICBwdWJsaWMgdGFiczogeyBuYW1lOiBzdHJpbmcsIG1lbnU6IHN0cmluZywgc3ViTmFtZTogc3RyaW5nIH1bXSA9IFtdO1xyXG4gIHB1YmxpYyBjYXJvdXNlbFRpbGU6IGFueTtcclxuICBwdWJsaWMgaXNQYWdlTG9hZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIHB1YmxpYyBpc01vYmlsZTogYm9vbGVhbjtcclxuICBwdWJsaWMgY2xpY2tlZDogYm9vbGVhbjtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwdWJsaWMgd29ya3NwYWNlTGF5b3V0U2VydmljZTogRGVmYXVsdExheW91dFNlcnZpY2UsXHJcbiAgICBwcm90ZWN0ZWQgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxyXG4gICAgcHJvdGVjdGVkIHJvdXRlcjogUm91dGVyLFxyXG4gICAgcHJvdGVjdGVkIG1lbnVTZXJ2aWNlOiBNZW51U2VydmljZSxcclxuICAgIHByb3RlY3RlZCBhY3Rpb25TZXJ2aWNlOiBBY3Rpb25TZXJ2aWNlXHJcbiAgKSB7IH1cclxuXHJcbiAgbmdPbkNoYW5nZXMoKTogdm9pZCB7XHJcbiAgICB0aGlzLmFjdGlvblNlcnZpY2UuZXhlY3V0ZUFzeW5jKCgpID0+IHtcclxuICAgICAgdGhpcy5tZW51U2VydmljZS5pbml0KHRoaXMubWVudVRhYnMsICgpID0+IHtcclxuICAgICAgICB0aGlzLnRhYnMgPSB0aGlzLm1lbnVTZXJ2aWNlLmdldFRhYnMoKTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRVcmwgPSB0aGlzLnRhYnNbMF0ubWVudTtcclxuICAgICAgICB0aGlzLm1lbnVJdGVtcyA9IHRoaXMubWVudVNlcnZpY2UubG9hZEZpcnN0VGFiSXRlbXModGhpcy5jdXJyZW50VXJsKTtcclxuICAgICAgICB0aGlzLmFjdGlvblNlcnZpY2UuZXhlY3V0ZUFzeW5jKCgpID0+IHtcclxuICAgICAgICAgIHRoaXMuaXNDb2xsYXBzZWRTaWRlQmFyID0gJ25vLWJsb2NrJztcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAodGhpcy5tZW51SXRlbXMpIHtcclxuICAgICAgICAgIHZhciB1cmwgPSB0aGlzLnJvdXRlci51cmw7XHJcbiAgICAgICAgICB0aGlzLm1lbnVJdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChpdGVtLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgICAgaXRlbS5jaGlsZHJlbi5mb3JFYWNoKChraWQpID0+IHtcclxuICAgICAgICAgICAgICAgIHZhciBzdGF0ZSA9IGtpZC5tYWluU3RhdGUgPyBraWQubWFpblN0YXRlIDoga2lkLnN0YXRlO1xyXG4gICAgICAgICAgICAgICAgaWYgKHVybC5pbmRleE9mKHN0YXRlKSA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9uU2VydmljZS5leGVjdXRlQXN5bmMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucGNvZGVkLW5hdmlnYXRpby1sYXZlbFwiKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbXMgJiYgaXRlbXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBocmVmID0gKDxhbnk+aXRlbXNbaV0pLmhyZWY7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChocmVmICYmIGhyZWYudG9TdHJpbmcoKS5pbmRleE9mKHN0YXRlKSA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdEl0ZW0oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0OiBpdGVtc1tpXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGtpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0sIHRoaXMuc2V0KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICBpZiAoIXRoaXMubmF2aWdhdGVUbykge1xyXG4gICAgICB0aGlzLm5hdmlnYXRlVG8gPSAobWVudTogc3RyaW5nLCByb3V0ZXI6IFJvdXRlcikgPT4ge1xyXG4gICAgICAgIHJvdXRlci5uYXZpZ2F0ZShbJy8nLCBtZW51LCAnZGFzaGJvYXJkJ10pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGlzLmlzTW9iaWxlID0gdGhpcy5hY3Rpb25TZXJ2aWNlLmlzTW9iaWxlKCk7XHJcbiAgICBpZiAodGhpcy5pc01vYmlsZSkge1xyXG4gICAgICBpZiAodGhpcy53b3Jrc3BhY2VMYXlvdXRTZXJ2aWNlLnZlcnRpY2FsRWZmZWN0ID09ICdvdmVybGF5Jykge1xyXG4gICAgICAgIHRoaXMud29ya3NwYWNlTGF5b3V0U2VydmljZS52ZXJ0aWNhbEVmZmVjdCA9ICdzaHJpbmsnO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMud29ya3NwYWNlTGF5b3V0U2VydmljZS52ZXJ0aWNhbEVmZmVjdCA9ICdvdmVybGF5JztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIHRvZ2dsZU1lbnUoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5pc01vYmlsZSkge1xyXG4gICAgICBpZiAodGhpcy53b3Jrc3BhY2VMYXlvdXRTZXJ2aWNlLnZlcnRpY2FsRWZmZWN0ID09ICdvdmVybGF5Jykge1xyXG4gICAgICAgIHRoaXMud29ya3NwYWNlTGF5b3V0U2VydmljZS52ZXJ0aWNhbEVmZmVjdCA9ICdzaHJpbmsnO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMud29ya3NwYWNlTGF5b3V0U2VydmljZS52ZXJ0aWNhbEVmZmVjdCA9ICdvdmVybGF5JztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIHJlbW92ZUFjdGl2ZVN0YXRlTmF2aWdhdGlvbk1lbnUoKTogdm9pZCB7XHJcbiAgICBsZXQgbmF2aWdhdGlvbkxldmVsQXJyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wY29kZWQtbGVmdC1pdGVtLS13cmFwcGVyIC5wY29kZWQtbmF2aWdhdGlvLWxhdmVsXCIpO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuYXZpZ2F0aW9uTGV2ZWxBcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgbmF2aWdhdGlvbkxldmVsQXJyW2ldLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICB9XHJcbiAgICBsZXQgc3ViTWVudUxldmVsQXJyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wY29kZWQtbGVmdC1pdGVtLS13cmFwcGVyIC5wY29kZWQtbGVmdC1pdGVtXCIpO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdWJNZW51TGV2ZWxBcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgc3ViTWVudUxldmVsQXJyW2ldLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICB9XHJcbiAgICBsZXQgbWFpbkNvbnRlbnRXcmFwcGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wY29kZWQtbWFpbi1jb250YWluZXIgLnBjb2RlZC1jb250ZW50XCIpO1xyXG4gICAgbWFpbkNvbnRlbnRXcmFwcGVyLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgdG9nZ2xlR3JvdXAoZ3JvdXA6IEV4dGVuZGVkTWFpbk1lbnVHcm91cCwgJGV2ZW50OiBhbnkpOiB2b2lkIHtcclxuICAgIGlmIChldmVudCAhPSBudWxsIHx8IGV2ZW50ICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICBsZXQgdGFyZ2V0ID0gJGV2ZW50LnRhcmdldCB8fCAkZXZlbnQuc3JjRWxlbWVudCB8fCAkZXZlbnQuY3VycmVudFRhcmdldDtcclxuICAgICAgbGV0IGN1ck5hdmlnYXRpb25MZXZlbCA9IHRhcmdldC5jbG9zZXN0KFwiLnBjb2RlZC1uYXZpZ2F0aW8tbGF2ZWxcIik7XHJcbiAgICAgIGlmIChjdXJOYXZpZ2F0aW9uTGV2ZWwuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYWN0aXZlXCIpKSB7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVBY3RpdmVTdGF0ZU5hdmlnYXRpb25NZW51KCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVBY3RpdmVTdGF0ZU5hdmlnYXRpb25NZW51KCk7XHJcbiAgICAgICAgbGV0IGxpc3RDaGlsZHJlbkl0ZW1JblRhcmdldCA9IHRhcmdldC5jbG9zZXN0KFwiLnBjb2RlZC1sZWZ0LWl0ZW0tLXdyYXBwZXJcIikuY2hpbGRyZW47XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaXN0Q2hpbGRyZW5JdGVtSW5UYXJnZXQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgIGlmIChsaXN0Q2hpbGRyZW5JdGVtSW5UYXJnZXRbaV0uY2xhc3NMaXN0LmNvbnRhaW5zKFwicGNvZGVkLWxlZnQtaXRlbVwiKSkge1xyXG4gICAgICAgICAgICBsaXN0Q2hpbGRyZW5JdGVtSW5UYXJnZXRbaV0uY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGFyZ2V0LmNsb3Nlc3QoXCIucGNvZGVkLW5hdmlnYXRpby1sYXZlbFwiKS5jbGFzc0xpc3QudG9nZ2xlKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgIGxldCBtYWluQ29udGVudFdyYXBwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBjb2RlZC1tYWluLWNvbnRhaW5lciAucGNvZGVkLWNvbnRlbnRcIik7XHJcbiAgICAgICAgbWFpbkNvbnRlbnRXcmFwcGVyLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5jb2xsYXBzZWRJdGVtcy5pbmRleE9mKGdyb3VwKTtcclxuICAgIGlmIChpbmRleCA+PSAwKSB7XHJcbiAgICAgIHRoaXMuY29sbGFwc2VkSXRlbXMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuY29sbGFwc2VkSXRlbXMucHVzaChncm91cCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgaXNHcm91cENvbGxhcHNlZChncm91cDogRXh0ZW5kZWRNYWluTWVudUdyb3VwKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5jb2xsYXBzZWRJdGVtcy5pbmRleE9mKGdyb3VwKSA+PSAwO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHRvZ2dsZU9wZW5lZFNpZGViYXIoKSB7XHJcbiAgICB0aGlzLmlzQ29sbGFwc2VkU2lkZUJhciA9IHRoaXMuaXNDb2xsYXBzZWRTaWRlQmFyID09PSAneWVzLWJsb2NrJyA/ICduby1ibG9jaycgOiAneWVzLWJsb2NrJztcclxuICB9XHJcblxyXG4gIHB1YmxpYyBsb2FkTWVudShtZW51OiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIHRoaXMubWVudUl0ZW1zID0gdGhpcy5tZW51U2VydmljZS5sb2FkTWVudUl0ZW1zKG1lbnUpO1xyXG4gICAgdGhpcy5jdXJyZW50VXJsID0gbWVudS50b0xvY2FsZUxvd2VyQ2FzZSgpO1xyXG4gICAgdGhpcy5uYXZpZ2F0ZVRvKHRoaXMuY3VycmVudFVybCwgdGhpcy5yb3V0ZXIpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNlbGVjdEl0ZW0oJGV2ZW50OiBhbnksIGl0ZW06IGFueSk6IHZvaWQge1xyXG4gICAgbGV0IG5hdmlMZXZlbEFsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucGNvZGVkLW5hdmlnYXRpby1sYXZlbFwiKTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmF2aUxldmVsQWxsLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIG5hdmlMZXZlbEFsbFtpXS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCB0YXJnZXQgPSAkZXZlbnQudGFyZ2V0IHx8ICRldmVudC5zcmNFbGVtZW50IHx8ICRldmVudC5jdXJyZW50VGFyZ2V0O1xyXG4gICAgdGFyZ2V0LmNsb3Nlc3QoXCIucGNvZGVkLWxlZnQtaXRlbS0td3JhcHBlclwiKS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgbGV0IGxpc3RDaGlsZHJlbkl0ZW1JblRhcmdldCA9IHRhcmdldC5jbG9zZXN0KFwiLnBjb2RlZC1sZWZ0LWl0ZW0tLXdyYXBwZXJcIikuY2hpbGRyZW47XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaXN0Q2hpbGRyZW5JdGVtSW5UYXJnZXQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgaWYgKGxpc3RDaGlsZHJlbkl0ZW1JblRhcmdldFtpXS5jbGFzc0xpc3QuY29udGFpbnMoXCJwY29kZWQtbmF2aWdhdGlvLWxhdmVsXCIpKSB7XHJcbiAgICAgICAgbGlzdENoaWxkcmVuSXRlbUluVGFyZ2V0W2ldLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmNoYW5nZUl0ZW0oaXRlbSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgY2hhbmdlSXRlbShpdGVtOiBhbnkpOiB2b2lkIHtcclxuICAgIHRoaXMuYWN0aW9uU2VydmljZS5jaGFuZ2VJdGVtKGl0ZW0sIHRoaXMubWVudVRhYnMsIChpdGVtczogQnJlYWRjcnVtYltdKSA9PiB7XHJcbiAgICAgIHRoaXMuY2hhbmdlLmVtaXQoaXRlbXMpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==