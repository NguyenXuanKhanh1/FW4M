/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from "@angular/core";
import { Breadcrumb } from '../shared/models/base.model';
import { ActionService } from '../shared/services/action.service';
import { Router } from '@angular/router';
import { AggregatorService } from '../shared/services/aggregator.service';
import { KeyConst } from '../shared/constants/key.const';
export class DefaultNavBarComponent {
    /**
     * @param {?} _actionService
     * @param {?} _router
     * @param {?} aggregatorService
     */
    constructor(_actionService, _router, aggregatorService) {
        this._actionService = _actionService;
        this._router = _router;
        this.aggregatorService = aggregatorService;
        this.hideBreadcrumbsSection = false;
        this.menuTabs = [];
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (!this.items || this.items.length == 0) {
            if (this.menuTabs && this.menuTabs.length > 0) {
                /** @type {?} */
                var data = this._router.url;
                /** @type {?} */
                var states = data.split('/');
                if (states.length > 0) {
                    /** @type {?} */
                    var state = states[states.length - 1];
                    if (!state && this.url) {
                        data = this.url;
                        states = data.split('/');
                        state = states[states.length - 1];
                    }
                    if (state) {
                        /** @type {?} */
                        var name = this._actionService.retrieveStateName(state, this.menuTabs);
                        this._actionService.changeItem({ state: state, name: name }, this.menuTabs, (/**
                         * @param {?} items
                         * @return {?}
                         */
                        (items) => {
                            this.items = items;
                            this.items.splice(0, 0, this.breadcrumb);
                        }));
                    }
                }
            }
        }
    }
    /**
     * @return {?}
     */
    ngOnChanges() {
        this.aggregatorService.subscribe(KeyConst.MenuChanged, (/**
         * @param {?} items
         * @return {?}
         */
        (items) => {
            this.items = items;
        }));
    }
    /**
     * @return {?}
     */
    retrieveCurrentItem() {
        if (!this.items || this.items.length == 0)
            return null;
        return this.items[this.items.length - 1];
    }
}
DefaultNavBarComponent.decorators = [
    { type: Component, args: [{
                selector: 'default-navbar',
                template: "<div *ngIf=\"!hideBreadcrumbsSection\" class=\"d-flex align-items-center breadcrumbs-wrapper\">\r\n  <div class=\"d-none d-sm-block\">\r\n    <h5 class=\"m-0 784title text-uppercase\">{{retrieveCurrentItem()?.label}}</h5>\r\n  </div>\r\n  <div class=\"ml-auto d-flex align-items-center\">\r\n    <i class=\"icofont icofont-home mr-1 text-primary f-16\"></i>\r\n    <default-breadcrumbs [menuTabs]=\"menuTabs\" [items]=\"items\"></default-breadcrumbs>\r\n  </div>\r\n</div>"
            }] }
];
/** @nocollapse */
DefaultNavBarComponent.ctorParameters = () => [
    { type: ActionService },
    { type: Router },
    { type: AggregatorService }
];
DefaultNavBarComponent.propDecorators = {
    hideBreadcrumbsSection: [{ type: Input }],
    items: [{ type: Input }],
    menuTabs: [{ type: Input }],
    url: [{ type: Input }],
    breadcrumb: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    DefaultNavBarComponent.prototype.hideBreadcrumbsSection;
    /** @type {?} */
    DefaultNavBarComponent.prototype.items;
    /** @type {?} */
    DefaultNavBarComponent.prototype.menuTabs;
    /** @type {?} */
    DefaultNavBarComponent.prototype.url;
    /** @type {?} */
    DefaultNavBarComponent.prototype.breadcrumb;
    /**
     * @type {?}
     * @private
     */
    DefaultNavBarComponent.prototype._actionService;
    /**
     * @type {?}
     * @private
     */
    DefaultNavBarComponent.prototype._router;
    /**
     * @type {?}
     * @protected
     */
    DefaultNavBarComponent.prototype.aggregatorService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2YmFyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1mdzRjLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvbGF5b3V0L25hdmJhci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFxQixNQUFNLGVBQWUsQ0FBQztBQUNwRSxPQUFPLEVBQUUsVUFBVSxFQUFXLE1BQU0sNkJBQTZCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUMxRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFPekQsTUFBTSxPQUFPLHNCQUFzQjs7Ozs7O0lBTy9CLFlBQ1ksY0FBNkIsRUFDN0IsT0FBZSxFQUNiLGlCQUFvQztRQUZ0QyxtQkFBYyxHQUFkLGNBQWMsQ0FBZTtRQUM3QixZQUFPLEdBQVAsT0FBTyxDQUFRO1FBQ2Isc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQVRsQywyQkFBc0IsR0FBWSxLQUFLLENBQUM7UUFFeEMsYUFBUSxHQUFjLEVBQUUsQ0FBQztJQVFyQyxDQUFDOzs7O0lBRUwsUUFBUTtRQUNKLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtZQUN2QyxJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFOztvQkFDdkMsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRzs7b0JBQ3ZCLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztnQkFDNUIsSUFBSSxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTs7d0JBQ2YsS0FBSyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztvQkFDckMsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsR0FBRyxFQUFFO3dCQUNwQixJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQzt3QkFDaEIsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQ3pCLEtBQUssR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztxQkFDckM7b0JBQ0QsSUFBSSxLQUFLLEVBQUU7OzRCQUNILElBQUksR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLGlCQUFpQixDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDO3dCQUN0RSxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLElBQUksQ0FBQyxRQUFROzs7O3dCQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7NEJBQ2xGLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDOzRCQUNuQixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQzt3QkFDN0MsQ0FBQyxFQUFDLENBQUM7cUJBQ047aUJBQ0o7YUFDSjtTQUNKO0lBQ0wsQ0FBQzs7OztJQUVELFdBQVc7UUFDUCxJQUFJLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxXQUFXOzs7O1FBQUUsQ0FBQyxLQUFtQixFQUFFLEVBQUU7WUFDM0UsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDdkIsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDOzs7O0lBRU0sbUJBQW1CO1FBQ3RCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFJLENBQUM7WUFBRSxPQUFPLElBQUksQ0FBQztRQUN2RCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDN0MsQ0FBQzs7O1lBbkRKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsZ0JBQWdCO2dCQUMxQixvZUFBc0M7YUFDekM7Ozs7WUFSUSxhQUFhO1lBQ2IsTUFBTTtZQUNOLGlCQUFpQjs7O3FDQVNyQixLQUFLO29CQUNMLEtBQUs7dUJBQ0wsS0FBSztrQkFDTCxLQUFLO3lCQUNMLEtBQUs7Ozs7SUFKTix3REFBd0Q7O0lBQ3hELHVDQUFvQzs7SUFDcEMsMENBQXlDOztJQUN6QyxxQ0FBNEI7O0lBQzVCLDRDQUF1Qzs7Ozs7SUFHbkMsZ0RBQXFDOzs7OztJQUNyQyx5Q0FBdUI7Ozs7O0lBQ3ZCLG1EQUE4QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgT25DaGFuZ2VzIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgQnJlYWRjcnVtYiwgTWVudVRhYiB9IGZyb20gJy4uL3NoYXJlZC9tb2RlbHMvYmFzZS5tb2RlbCc7XHJcbmltcG9ydCB7IEFjdGlvblNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQvc2VydmljZXMvYWN0aW9uLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBBZ2dyZWdhdG9yU2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9zZXJ2aWNlcy9hZ2dyZWdhdG9yLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBLZXlDb25zdCB9IGZyb20gJy4uL3NoYXJlZC9jb25zdGFudHMva2V5LmNvbnN0JztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdkZWZhdWx0LW5hdmJhcicsXHJcbiAgICB0ZW1wbGF0ZVVybDogJy4vbmF2YmFyLmNvbXBvbmVudC5odG1sJ1xyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIERlZmF1bHROYXZCYXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XHJcbiAgICBASW5wdXQoKSBwdWJsaWMgaGlkZUJyZWFkY3J1bWJzU2VjdGlvbjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgQElucHV0KCkgcHVibGljIGl0ZW1zOiBCcmVhZGNydW1iW107XHJcbiAgICBASW5wdXQoKSBwdWJsaWMgbWVudVRhYnM6IE1lbnVUYWJbXSA9IFtdO1xyXG4gICAgQElucHV0KCkgcHVibGljIHVybDogc3RyaW5nO1xyXG4gICAgQElucHV0KCkgcHVibGljIGJyZWFkY3J1bWI6IEJyZWFkY3J1bWI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSBfYWN0aW9uU2VydmljZTogQWN0aW9uU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIF9yb3V0ZXI6IFJvdXRlcixcclxuICAgICAgICBwcm90ZWN0ZWQgYWdncmVnYXRvclNlcnZpY2U6IEFnZ3JlZ2F0b3JTZXJ2aWNlXHJcbiAgICApIHsgfVxyXG5cclxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgICAgIGlmICghdGhpcy5pdGVtcyB8fCB0aGlzLml0ZW1zLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm1lbnVUYWJzICYmIHRoaXMubWVudVRhYnMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGRhdGEgPSB0aGlzLl9yb3V0ZXIudXJsO1xyXG4gICAgICAgICAgICAgICAgdmFyIHN0YXRlcyA9IGRhdGEuc3BsaXQoJy8nKTtcclxuICAgICAgICAgICAgICAgIGlmIChzdGF0ZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdGF0ZSA9IHN0YXRlc1tzdGF0ZXMubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFzdGF0ZSAmJiB0aGlzLnVybCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhID0gdGhpcy51cmw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlcyA9IGRhdGEuc3BsaXQoJy8nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGUgPSBzdGF0ZXNbc3RhdGVzLmxlbmd0aCAtIDFdO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3RhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5hbWUgPSB0aGlzLl9hY3Rpb25TZXJ2aWNlLnJldHJpZXZlU3RhdGVOYW1lKHN0YXRlLCB0aGlzLm1lbnVUYWJzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fYWN0aW9uU2VydmljZS5jaGFuZ2VJdGVtKHsgc3RhdGU6IHN0YXRlLCBuYW1lOiBuYW1lIH0sIHRoaXMubWVudVRhYnMsIChpdGVtcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtcyA9IGl0ZW1zO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtcy5zcGxpY2UoMCwgMCwgdGhpcy5icmVhZGNydW1iKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG5nT25DaGFuZ2VzKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuYWdncmVnYXRvclNlcnZpY2Uuc3Vic2NyaWJlKEtleUNvbnN0Lk1lbnVDaGFuZ2VkLCAoaXRlbXM6IEJyZWFkY3J1bWJbXSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLml0ZW1zID0gaXRlbXM7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJldHJpZXZlQ3VycmVudEl0ZW0oKTogQnJlYWRjcnVtYiB7XHJcbiAgICAgICAgaWYgKCF0aGlzLml0ZW1zIHx8IHRoaXMuaXRlbXMubGVuZ3RoID09IDApIHJldHVybiBudWxsO1xyXG4gICAgICAgIHJldHVybiB0aGlzLml0ZW1zW3RoaXMuaXRlbXMubGVuZ3RoIC0gMV07XHJcbiAgICB9XHJcbn1cclxuIl19