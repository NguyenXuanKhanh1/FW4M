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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2YmFyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1mdzRjLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvbGF5b3V0L25hdmJhci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQ3pELE9BQU8sRUFBRSxVQUFVLEVBQVcsTUFBTSw2QkFBNkIsQ0FBQztBQUNsRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDbEUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQU96RCxNQUFNLE9BQU8sc0JBQXNCOzs7Ozs7SUFPL0IsWUFDWSxjQUE2QixFQUM3QixPQUFlLEVBQ2IsaUJBQW9DO1FBRnRDLG1CQUFjLEdBQWQsY0FBYyxDQUFlO1FBQzdCLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFDYixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBVGxDLDJCQUFzQixHQUFZLEtBQUssQ0FBQztRQUV4QyxhQUFRLEdBQWMsRUFBRSxDQUFDO0lBUXJDLENBQUM7Ozs7SUFFTCxRQUFRO1FBQ0osSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO1lBQ3ZDLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7O29CQUN2QyxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHOztvQkFDdkIsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO2dCQUM1QixJQUFJLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFOzt3QkFDZixLQUFLLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO29CQUNyQyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxHQUFHLEVBQUU7d0JBQ3BCLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO3dCQUNoQixNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDekIsS0FBSyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO3FCQUNyQztvQkFDRCxJQUFJLEtBQUssRUFBRTs7NEJBQ0gsSUFBSSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsaUJBQWlCLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUM7d0JBQ3RFLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsSUFBSSxDQUFDLFFBQVE7Ozs7d0JBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTs0QkFDbEYsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7NEJBQ25CLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO3dCQUM3QyxDQUFDLEVBQUMsQ0FBQztxQkFDTjtpQkFDSjthQUNKO1NBQ0o7UUFFRCxJQUFJLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxXQUFXOzs7O1FBQUUsQ0FBQyxLQUFtQixFQUFFLEVBQUU7WUFDM0UsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDdkIsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDOzs7O0lBRU0sbUJBQW1CO1FBQ3RCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFJLENBQUM7WUFBRSxPQUFPLElBQUksQ0FBQztRQUN2RCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDN0MsQ0FBQzs7O1lBakRKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsZ0JBQWdCO2dCQUMxQixvZUFBc0M7YUFDekM7Ozs7WUFSUSxhQUFhO1lBQ2IsTUFBTTtZQUNOLGlCQUFpQjs7O3FDQVNyQixLQUFLO29CQUNMLEtBQUs7dUJBQ0wsS0FBSztrQkFDTCxLQUFLO3lCQUNMLEtBQUs7Ozs7SUFKTix3REFBd0Q7O0lBQ3hELHVDQUFvQzs7SUFDcEMsMENBQXlDOztJQUN6QyxxQ0FBNEI7O0lBQzVCLDRDQUF1Qzs7Ozs7SUFHbkMsZ0RBQXFDOzs7OztJQUNyQyx5Q0FBdUI7Ozs7O0lBQ3ZCLG1EQUE4QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IEJyZWFkY3J1bWIsIE1lbnVUYWIgfSBmcm9tICcuLi9zaGFyZWQvbW9kZWxzL2Jhc2UubW9kZWwnO1xyXG5pbXBvcnQgeyBBY3Rpb25TZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL3NlcnZpY2VzL2FjdGlvbi5zZXJ2aWNlJztcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgQWdncmVnYXRvclNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQvc2VydmljZXMvYWdncmVnYXRvci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgS2V5Q29uc3QgfSBmcm9tICcuLi9zaGFyZWQvY29uc3RhbnRzL2tleS5jb25zdCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnZGVmYXVsdC1uYXZiYXInLFxyXG4gICAgdGVtcGxhdGVVcmw6ICcuL25hdmJhci5jb21wb25lbnQuaHRtbCdcclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBEZWZhdWx0TmF2QmFyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIEBJbnB1dCgpIHB1YmxpYyBoaWRlQnJlYWRjcnVtYnNTZWN0aW9uOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBASW5wdXQoKSBwdWJsaWMgaXRlbXM6IEJyZWFkY3J1bWJbXTtcclxuICAgIEBJbnB1dCgpIHB1YmxpYyBtZW51VGFiczogTWVudVRhYltdID0gW107XHJcbiAgICBASW5wdXQoKSBwdWJsaWMgdXJsOiBzdHJpbmc7XHJcbiAgICBASW5wdXQoKSBwdWJsaWMgYnJlYWRjcnVtYjogQnJlYWRjcnVtYjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIF9hY3Rpb25TZXJ2aWNlOiBBY3Rpb25TZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgX3JvdXRlcjogUm91dGVyLFxyXG4gICAgICAgIHByb3RlY3RlZCBhZ2dyZWdhdG9yU2VydmljZTogQWdncmVnYXRvclNlcnZpY2VcclxuICAgICkgeyB9XHJcblxyXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCF0aGlzLml0ZW1zIHx8IHRoaXMuaXRlbXMubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMubWVudVRhYnMgJiYgdGhpcy5tZW51VGFicy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IHRoaXMuX3JvdXRlci51cmw7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3RhdGVzID0gZGF0YS5zcGxpdCgnLycpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHN0YXRlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN0YXRlID0gc3RhdGVzW3N0YXRlcy5sZW5ndGggLSAxXTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXN0YXRlICYmIHRoaXMudXJsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEgPSB0aGlzLnVybDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGVzID0gZGF0YS5zcGxpdCgnLycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZSA9IHN0YXRlc1tzdGF0ZXMubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbmFtZSA9IHRoaXMuX2FjdGlvblNlcnZpY2UucmV0cmlldmVTdGF0ZU5hbWUoc3RhdGUsIHRoaXMubWVudVRhYnMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9hY3Rpb25TZXJ2aWNlLmNoYW5nZUl0ZW0oeyBzdGF0ZTogc3RhdGUsIG5hbWU6IG5hbWUgfSwgdGhpcy5tZW51VGFicywgKGl0ZW1zKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLml0ZW1zID0gaXRlbXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLml0ZW1zLnNwbGljZSgwLCAwLCB0aGlzLmJyZWFkY3J1bWIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuYWdncmVnYXRvclNlcnZpY2Uuc3Vic2NyaWJlKEtleUNvbnN0Lk1lbnVDaGFuZ2VkLCAoaXRlbXM6IEJyZWFkY3J1bWJbXSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLml0ZW1zID0gaXRlbXM7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJldHJpZXZlQ3VycmVudEl0ZW0oKTogQnJlYWRjcnVtYiB7XHJcbiAgICAgICAgaWYgKCF0aGlzLml0ZW1zIHx8IHRoaXMuaXRlbXMubGVuZ3RoID09IDApIHJldHVybiBudWxsO1xyXG4gICAgICAgIHJldHVybiB0aGlzLml0ZW1zW3RoaXMuaXRlbXMubGVuZ3RoIC0gMV07XHJcbiAgICB9XHJcbn1cclxuIl19