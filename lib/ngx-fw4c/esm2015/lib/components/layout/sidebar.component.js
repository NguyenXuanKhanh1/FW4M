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
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZWJhci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZnc0Yy8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2xheW91dC9zaWRlYmFyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLFlBQVksRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUMxRixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUU5RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFRbEUsTUFBTSxPQUFPLHVCQUF1Qjs7Ozs7Ozs7SUFrQmxDLFlBQ1Msc0JBQTRDLEVBQ3pDLEtBQXFCLEVBQ3JCLE1BQWMsRUFDZCxXQUF3QixFQUN4QixhQUE0QjtRQUovQiwyQkFBc0IsR0FBdEIsc0JBQXNCLENBQXNCO1FBQ3pDLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQ3JCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQXRCeEIsYUFBUSxHQUFjLEVBQUUsQ0FBQztRQUt4QixXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQWdCLENBQUM7UUFFcEQsY0FBUyxHQUE0QixFQUFFLENBQUM7UUFFeEMsbUJBQWMsR0FBNEIsRUFBRSxDQUFDO1FBQzdDLGVBQVUsR0FBRyxLQUFLLENBQUM7UUFDbkIsU0FBSSxHQUFzRCxFQUFFLENBQUM7UUFFN0QsZUFBVSxHQUFZLEtBQUssQ0FBQztJQVUvQixDQUFDOzs7O0lBRUwsV0FBVztRQUNULElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWTs7O1FB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Q3pDLDZDQUFtRTs7SUFDbkUsc0NBQWdEOztJQUNoRCwyQ0FBaUM7O0lBQ2pDLDRDQUFtQzs7SUFDbkMseUNBQTJEOztJQUMzRCw2Q0FBMEI7O0lBQzFCLDRDQUErQzs7SUFDL0MscURBQWtDOztJQUNsQyxpREFBb0Q7O0lBQ3BELDZDQUEwQjs7SUFDMUIsdUNBQW9FOztJQUNwRSwrQ0FBeUI7O0lBQ3pCLDZDQUFtQzs7SUFDbkMsMkNBQXlCOztJQUN6QiwwQ0FBd0I7O0lBR3RCLHlEQUFtRDs7Ozs7SUFDbkQsd0NBQStCOzs7OztJQUMvQix5Q0FBd0I7Ozs7O0lBQ3hCLDhDQUFrQzs7Ozs7SUFDbEMsZ0RBQXNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgT25DaGFuZ2VzIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IERlZmF1bHRMYXlvdXRTZXJ2aWNlIH0gZnJvbSAnLi9sYXlvdXQuc2VydmljZSc7XHJcbmltcG9ydCB7IE1lbnVTZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL3NlcnZpY2VzL21lbnUuc2VydmljZSc7XHJcbmltcG9ydCB7IEV4dGVuZGVkTWFpbk1lbnVHcm91cCwgTWVudVRhYiwgTWVudUl0ZW0sIEJyZWFkY3J1bWIgfSBmcm9tICcuLi9zaGFyZWQvbW9kZWxzL2Jhc2UubW9kZWwnO1xyXG5pbXBvcnQgeyBBY3Rpb25TZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL3NlcnZpY2VzL2FjdGlvbi5zZXJ2aWNlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnZGVmYXVsdC1zaWRlYmFyJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vc2lkZWJhci5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vc2lkZWJhci5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgRGVmYXVsdFNpZGViYXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XHJcbiAgQElucHV0KCkgcHVibGljIG1lbnVUYWJzOiBNZW51VGFiW10gPSBbXTtcclxuICBASW5wdXQoKSBwdWJsaWMgbmF2aWdhdGVUbzogKG1lbnU6IHN0cmluZywgcm91dGVyOiBSb3V0ZXIpID0+IHZvaWQ7XHJcbiAgQElucHV0KCkgcHVibGljIHNldDogKHJvbGU6IHN0cmluZykgPT4gTWVudUl0ZW07XHJcbiAgQElucHV0KCkgcHVibGljIG1lbnVUeXBlOiBzdHJpbmc7XHJcbiAgQElucHV0KCkgcHVibGljIHNldEFjdGl2ZTogYm9vbGVhbjtcclxuICBAT3V0cHV0KCkgcHVibGljIGNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8QnJlYWRjcnVtYltdPigpO1xyXG4gIHB1YmxpYyBjdXJyZW50VXJsOiBzdHJpbmc7XHJcbiAgcHVibGljIG1lbnVJdGVtczogRXh0ZW5kZWRNYWluTWVudUdyb3VwW10gPSBbXTtcclxuICBwdWJsaWMgaXNDb2xsYXBzZWRTaWRlQmFyOiBzdHJpbmc7XHJcbiAgcHVibGljIGNvbGxhcHNlZEl0ZW1zOiBFeHRlbmRlZE1haW5NZW51R3JvdXBbXSA9IFtdO1xyXG4gIHB1YmxpYyBpc1N1cHBsaWVyID0gZmFsc2U7XHJcbiAgcHVibGljIHRhYnM6IHsgbmFtZTogc3RyaW5nLCBtZW51OiBzdHJpbmcsIHN1Yk5hbWU6IHN0cmluZyB9W10gPSBbXTtcclxuICBwdWJsaWMgY2Fyb3VzZWxUaWxlOiBhbnk7XHJcbiAgcHVibGljIGlzUGFnZUxvYWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBwdWJsaWMgaXNNb2JpbGU6IGJvb2xlYW47XHJcbiAgcHVibGljIGNsaWNrZWQ6IGJvb2xlYW47XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHVibGljIHdvcmtzcGFjZUxheW91dFNlcnZpY2U6IERlZmF1bHRMYXlvdXRTZXJ2aWNlLFxyXG4gICAgcHJvdGVjdGVkIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcclxuICAgIHByb3RlY3RlZCByb3V0ZXI6IFJvdXRlcixcclxuICAgIHByb3RlY3RlZCBtZW51U2VydmljZTogTWVudVNlcnZpY2UsXHJcbiAgICBwcm90ZWN0ZWQgYWN0aW9uU2VydmljZTogQWN0aW9uU2VydmljZVxyXG4gICkgeyB9XHJcblxyXG4gIG5nT25DaGFuZ2VzKCk6IHZvaWQge1xyXG4gICAgdGhpcy5hY3Rpb25TZXJ2aWNlLmV4ZWN1dGVBc3luYygoKSA9PiB7XHJcbiAgICAgIHRoaXMubWVudVNlcnZpY2UuaW5pdCh0aGlzLm1lbnVUYWJzLCAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy50YWJzID0gdGhpcy5tZW51U2VydmljZS5nZXRUYWJzKCk7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50VXJsID0gdGhpcy50YWJzWzBdLm1lbnU7XHJcbiAgICAgICAgdGhpcy5tZW51SXRlbXMgPSB0aGlzLm1lbnVTZXJ2aWNlLmxvYWRGaXJzdFRhYkl0ZW1zKHRoaXMuY3VycmVudFVybCk7XHJcbiAgICAgICAgdGhpcy5hY3Rpb25TZXJ2aWNlLmV4ZWN1dGVBc3luYygoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmlzQ29sbGFwc2VkU2lkZUJhciA9ICduby1ibG9jayc7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKHRoaXMubWVudUl0ZW1zKSB7XHJcbiAgICAgICAgICB2YXIgdXJsID0gdGhpcy5yb3V0ZXIudXJsO1xyXG4gICAgICAgICAgdGhpcy5tZW51SXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoaXRlbS5jaGlsZHJlbikge1xyXG4gICAgICAgICAgICAgIGl0ZW0uY2hpbGRyZW4uZm9yRWFjaCgoa2lkKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3RhdGUgPSBraWQubWFpblN0YXRlID8ga2lkLm1haW5TdGF0ZSA6IGtpZC5zdGF0ZTtcclxuICAgICAgICAgICAgICAgIGlmICh1cmwuaW5kZXhPZihzdGF0ZSkgPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLmFjdGlvblNlcnZpY2UuZXhlY3V0ZUFzeW5jKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnBjb2RlZC1uYXZpZ2F0aW8tbGF2ZWxcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW1zICYmIGl0ZW1zLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaHJlZiA9ICg8YW55Pml0ZW1zW2ldKS5ocmVmO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaHJlZiAmJiBocmVmLnRvU3RyaW5nKCkuaW5kZXhPZihzdGF0ZSkgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RJdGVtKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldDogaXRlbXNbaV1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBraWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LCB0aGlzLnNldCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgaWYgKCF0aGlzLm5hdmlnYXRlVG8pIHtcclxuICAgICAgdGhpcy5uYXZpZ2F0ZVRvID0gKG1lbnU6IHN0cmluZywgcm91dGVyOiBSb3V0ZXIpID0+IHtcclxuICAgICAgICByb3V0ZXIubmF2aWdhdGUoWycvJywgbWVudSwgJ2Rhc2hib2FyZCddKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy5pc01vYmlsZSA9IHRoaXMuYWN0aW9uU2VydmljZS5pc01vYmlsZSgpO1xyXG4gICAgaWYgKHRoaXMuaXNNb2JpbGUpIHtcclxuICAgICAgaWYgKHRoaXMud29ya3NwYWNlTGF5b3V0U2VydmljZS52ZXJ0aWNhbEVmZmVjdCA9PSAnb3ZlcmxheScpIHtcclxuICAgICAgICB0aGlzLndvcmtzcGFjZUxheW91dFNlcnZpY2UudmVydGljYWxFZmZlY3QgPSAnc2hyaW5rJztcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLndvcmtzcGFjZUxheW91dFNlcnZpY2UudmVydGljYWxFZmZlY3QgPSAnb3ZlcmxheSc7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyB0b2dnbGVNZW51KCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuaXNNb2JpbGUgJiYgdGhpcy5tZW51VHlwZSA9PSAnTEVGVCcpIHtcclxuICAgICAgaWYgKHRoaXMud29ya3NwYWNlTGF5b3V0U2VydmljZS52ZXJ0aWNhbEVmZmVjdCA9PSAnb3ZlcmxheScpIHtcclxuICAgICAgICB0aGlzLndvcmtzcGFjZUxheW91dFNlcnZpY2UudmVydGljYWxFZmZlY3QgPSAnc2hyaW5rJztcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLndvcmtzcGFjZUxheW91dFNlcnZpY2UudmVydGljYWxFZmZlY3QgPSAnb3ZlcmxheSc7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyByZW1vdmVBY3RpdmVTdGF0ZU5hdmlnYXRpb25NZW51KCk6IHZvaWQge1xyXG4gICAgbGV0IG5hdmlnYXRpb25MZXZlbEFyciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucGNvZGVkLWxlZnQtaXRlbS0td3JhcHBlciAucGNvZGVkLW5hdmlnYXRpby1sYXZlbFwiKTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmF2aWdhdGlvbkxldmVsQXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIG5hdmlnYXRpb25MZXZlbEFycltpXS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgfVxyXG4gICAgbGV0IHN1Yk1lbnVMZXZlbEFyciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucGNvZGVkLWxlZnQtaXRlbS0td3JhcHBlciAucGNvZGVkLWxlZnQtaXRlbVwiKTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3ViTWVudUxldmVsQXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIHN1Yk1lbnVMZXZlbEFycltpXS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgfVxyXG4gICAgbGV0IG1haW5Db250ZW50V3JhcHBlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGNvZGVkLW1haW4tY29udGFpbmVyIC5wY29kZWQtY29udGVudFwiKTtcclxuICAgIG1haW5Db250ZW50V3JhcHBlci5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHRvZ2dsZUdyb3VwKGdyb3VwOiBFeHRlbmRlZE1haW5NZW51R3JvdXAsICRldmVudDogYW55KTogdm9pZCB7XHJcbiAgICBpZiAoZXZlbnQgIT0gbnVsbCB8fCBldmVudCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgbGV0IHRhcmdldCA9ICRldmVudC50YXJnZXQgfHwgJGV2ZW50LnNyY0VsZW1lbnQgfHwgJGV2ZW50LmN1cnJlbnRUYXJnZXQ7XHJcbiAgICAgIGxldCBjdXJOYXZpZ2F0aW9uTGV2ZWwgPSB0YXJnZXQuY2xvc2VzdChcIi5wY29kZWQtbmF2aWdhdGlvLWxhdmVsXCIpO1xyXG4gICAgICBpZiAoY3VyTmF2aWdhdGlvbkxldmVsLmNsYXNzTGlzdC5jb250YWlucyhcImFjdGl2ZVwiKSkge1xyXG4gICAgICAgIHRoaXMucmVtb3ZlQWN0aXZlU3RhdGVOYXZpZ2F0aW9uTWVudSgpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMucmVtb3ZlQWN0aXZlU3RhdGVOYXZpZ2F0aW9uTWVudSgpO1xyXG4gICAgICAgIGxldCBsaXN0Q2hpbGRyZW5JdGVtSW5UYXJnZXQgPSB0YXJnZXQuY2xvc2VzdChcIi5wY29kZWQtbGVmdC1pdGVtLS13cmFwcGVyXCIpLmNoaWxkcmVuO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGlzdENoaWxkcmVuSXRlbUluVGFyZ2V0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICBpZiAobGlzdENoaWxkcmVuSXRlbUluVGFyZ2V0W2ldLmNsYXNzTGlzdC5jb250YWlucyhcInBjb2RlZC1sZWZ0LWl0ZW1cIikpIHtcclxuICAgICAgICAgICAgbGlzdENoaWxkcmVuSXRlbUluVGFyZ2V0W2ldLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRhcmdldC5jbG9zZXN0KFwiLnBjb2RlZC1uYXZpZ2F0aW8tbGF2ZWxcIikuY2xhc3NMaXN0LnRvZ2dsZShcImFjdGl2ZVwiKTtcclxuICAgICAgICBsZXQgbWFpbkNvbnRlbnRXcmFwcGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wY29kZWQtbWFpbi1jb250YWluZXIgLnBjb2RlZC1jb250ZW50XCIpO1xyXG4gICAgICAgIG1haW5Db250ZW50V3JhcHBlci5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuY29sbGFwc2VkSXRlbXMuaW5kZXhPZihncm91cCk7XHJcbiAgICBpZiAoaW5kZXggPj0gMCkge1xyXG4gICAgICB0aGlzLmNvbGxhcHNlZEl0ZW1zLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmNvbGxhcHNlZEl0ZW1zLnB1c2goZ3JvdXApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGlzR3JvdXBDb2xsYXBzZWQoZ3JvdXA6IEV4dGVuZGVkTWFpbk1lbnVHcm91cCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuY29sbGFwc2VkSXRlbXMuaW5kZXhPZihncm91cCkgPj0gMDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyB0b2dnbGVPcGVuZWRTaWRlYmFyKCkge1xyXG4gICAgdGhpcy5pc0NvbGxhcHNlZFNpZGVCYXIgPSB0aGlzLmlzQ29sbGFwc2VkU2lkZUJhciA9PT0gJ3llcy1ibG9jaycgPyAnbm8tYmxvY2snIDogJ3llcy1ibG9jayc7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbG9hZE1lbnUobWVudTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICB0aGlzLm1lbnVJdGVtcyA9IHRoaXMubWVudVNlcnZpY2UubG9hZE1lbnVJdGVtcyhtZW51KTtcclxuICAgIHRoaXMuY3VycmVudFVybCA9IG1lbnUudG9Mb2NhbGVMb3dlckNhc2UoKTtcclxuICAgIHRoaXMubmF2aWdhdGVUbyh0aGlzLmN1cnJlbnRVcmwsIHRoaXMucm91dGVyKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZWxlY3RJdGVtKCRldmVudDogYW55LCBpdGVtOiBhbnkpOiB2b2lkIHtcclxuICAgIGxldCBuYXZpTGV2ZWxBbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnBjb2RlZC1uYXZpZ2F0aW8tbGF2ZWxcIik7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5hdmlMZXZlbEFsbC5sZW5ndGg7IGkrKykge1xyXG4gICAgICBuYXZpTGV2ZWxBbGxbaV0uY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgdGFyZ2V0ID0gJGV2ZW50LnRhcmdldCB8fCAkZXZlbnQuc3JjRWxlbWVudCB8fCAkZXZlbnQuY3VycmVudFRhcmdldDtcclxuICAgIHRhcmdldC5jbG9zZXN0KFwiLnBjb2RlZC1sZWZ0LWl0ZW0tLXdyYXBwZXJcIikuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgIGxldCBsaXN0Q2hpbGRyZW5JdGVtSW5UYXJnZXQgPSB0YXJnZXQuY2xvc2VzdChcIi5wY29kZWQtbGVmdC1pdGVtLS13cmFwcGVyXCIpLmNoaWxkcmVuO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGlzdENoaWxkcmVuSXRlbUluVGFyZ2V0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGlmIChsaXN0Q2hpbGRyZW5JdGVtSW5UYXJnZXRbaV0uY2xhc3NMaXN0LmNvbnRhaW5zKFwicGNvZGVkLW5hdmlnYXRpby1sYXZlbFwiKSkge1xyXG4gICAgICAgIGxpc3RDaGlsZHJlbkl0ZW1JblRhcmdldFtpXS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5jaGFuZ2VJdGVtKGl0ZW0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGNoYW5nZUl0ZW0oaXRlbTogYW55KTogdm9pZCB7XHJcbiAgICB0aGlzLmFjdGlvblNlcnZpY2UuY2hhbmdlSXRlbShpdGVtLCB0aGlzLm1lbnVUYWJzLCAoaXRlbXM6IEJyZWFkY3J1bWJbXSkgPT4ge1xyXG4gICAgICB0aGlzLmNoYW5nZS5lbWl0KGl0ZW1zKTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=