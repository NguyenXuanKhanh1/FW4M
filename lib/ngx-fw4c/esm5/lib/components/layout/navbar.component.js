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
var DefaultNavBarComponent = /** @class */ (function () {
    function DefaultNavBarComponent(_actionService, _router, aggregatorService) {
        this._actionService = _actionService;
        this._router = _router;
        this.aggregatorService = aggregatorService;
        this.hideBreadcrumbsSection = false;
        this.menuTabs = [];
    }
    /**
     * @return {?}
     */
    DefaultNavBarComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
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
                        function (items) {
                            _this.items = items;
                            _this.items.splice(0, 0, _this.breadcrumb);
                        }));
                    }
                }
            }
        }
    };
    /**
     * @return {?}
     */
    DefaultNavBarComponent.prototype.ngOnChanges = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.aggregatorService.subscribe(KeyConst.MenuChanged, (/**
         * @param {?} items
         * @return {?}
         */
        function (items) {
            _this.items = items;
        }));
    };
    /**
     * @return {?}
     */
    DefaultNavBarComponent.prototype.retrieveCurrentItem = /**
     * @return {?}
     */
    function () {
        if (!this.items || this.items.length == 0)
            return null;
        return this.items[this.items.length - 1];
    };
    DefaultNavBarComponent.decorators = [
        { type: Component, args: [{
                    selector: 'default-navbar',
                    template: "<div *ngIf=\"!hideBreadcrumbsSection\" class=\"d-flex align-items-center breadcrumbs-wrapper\">\r\n  <div class=\"d-none d-sm-block\">\r\n    <h5 class=\"m-0 784title text-uppercase\">{{retrieveCurrentItem()?.label}}</h5>\r\n  </div>\r\n  <div class=\"ml-auto d-flex align-items-center\">\r\n    <i class=\"icofont icofont-home mr-1 text-primary f-16\"></i>\r\n    <default-breadcrumbs [menuTabs]=\"menuTabs\" [items]=\"items\"></default-breadcrumbs>\r\n  </div>\r\n</div>"
                }] }
    ];
    /** @nocollapse */
    DefaultNavBarComponent.ctorParameters = function () { return [
        { type: ActionService },
        { type: Router },
        { type: AggregatorService }
    ]; };
    DefaultNavBarComponent.propDecorators = {
        hideBreadcrumbsSection: [{ type: Input }],
        items: [{ type: Input }],
        menuTabs: [{ type: Input }],
        url: [{ type: Input }],
        breadcrumb: [{ type: Input }]
    };
    return DefaultNavBarComponent;
}());
export { DefaultNavBarComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2YmFyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1mdzRjLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvbGF5b3V0L25hdmJhci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFxQixNQUFNLGVBQWUsQ0FBQztBQUNwRSxPQUFPLEVBQUUsVUFBVSxFQUFXLE1BQU0sNkJBQTZCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUMxRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFFekQ7SUFZSSxnQ0FDWSxjQUE2QixFQUM3QixPQUFlLEVBQ2IsaUJBQW9DO1FBRnRDLG1CQUFjLEdBQWQsY0FBYyxDQUFlO1FBQzdCLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFDYixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBVGxDLDJCQUFzQixHQUFZLEtBQUssQ0FBQztRQUV4QyxhQUFRLEdBQWMsRUFBRSxDQUFDO0lBUXJDLENBQUM7Ozs7SUFFTCx5Q0FBUTs7O0lBQVI7UUFBQSxpQkFzQkM7UUFyQkcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO1lBQ3ZDLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7O29CQUN2QyxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHOztvQkFDdkIsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO2dCQUM1QixJQUFJLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFOzt3QkFDZixLQUFLLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO29CQUNyQyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxHQUFHLEVBQUU7d0JBQ3BCLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO3dCQUNoQixNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDekIsS0FBSyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO3FCQUNyQztvQkFDRCxJQUFJLEtBQUssRUFBRTs7NEJBQ0gsSUFBSSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsaUJBQWlCLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUM7d0JBQ3RFLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsSUFBSSxDQUFDLFFBQVE7Ozs7d0JBQUUsVUFBQyxLQUFLOzRCQUM5RSxLQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQzs0QkFDbkIsS0FBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7d0JBQzdDLENBQUMsRUFBQyxDQUFDO3FCQUNOO2lCQUNKO2FBQ0o7U0FDSjtJQUNMLENBQUM7Ozs7SUFFRCw0Q0FBVzs7O0lBQVg7UUFBQSxpQkFJQztRQUhHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFdBQVc7Ozs7UUFBRSxVQUFDLEtBQW1CO1lBQ3ZFLEtBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLENBQUMsRUFBQyxDQUFDO0lBQ1AsQ0FBQzs7OztJQUVNLG9EQUFtQjs7O0lBQTFCO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUksQ0FBQztZQUFFLE9BQU8sSUFBSSxDQUFDO1FBQ3ZELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztJQUM3QyxDQUFDOztnQkFuREosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxnQkFBZ0I7b0JBQzFCLG9lQUFzQztpQkFDekM7Ozs7Z0JBUlEsYUFBYTtnQkFDYixNQUFNO2dCQUNOLGlCQUFpQjs7O3lDQVNyQixLQUFLO3dCQUNMLEtBQUs7MkJBQ0wsS0FBSztzQkFDTCxLQUFLOzZCQUNMLEtBQUs7O0lBMENWLDZCQUFDO0NBQUEsQUFwREQsSUFvREM7U0EvQ1ksc0JBQXNCOzs7SUFDL0Isd0RBQXdEOztJQUN4RCx1Q0FBb0M7O0lBQ3BDLDBDQUF5Qzs7SUFDekMscUNBQTRCOztJQUM1Qiw0Q0FBdUM7Ozs7O0lBR25DLGdEQUFxQzs7Ozs7SUFDckMseUNBQXVCOzs7OztJQUN2QixtREFBOEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQsIE9uQ2hhbmdlcyB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IEJyZWFkY3J1bWIsIE1lbnVUYWIgfSBmcm9tICcuLi9zaGFyZWQvbW9kZWxzL2Jhc2UubW9kZWwnO1xyXG5pbXBvcnQgeyBBY3Rpb25TZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL3NlcnZpY2VzL2FjdGlvbi5zZXJ2aWNlJztcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgQWdncmVnYXRvclNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQvc2VydmljZXMvYWdncmVnYXRvci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgS2V5Q29uc3QgfSBmcm9tICcuLi9zaGFyZWQvY29uc3RhbnRzL2tleS5jb25zdCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnZGVmYXVsdC1uYXZiYXInLFxyXG4gICAgdGVtcGxhdGVVcmw6ICcuL25hdmJhci5jb21wb25lbnQuaHRtbCdcclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBEZWZhdWx0TmF2QmFyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xyXG4gICAgQElucHV0KCkgcHVibGljIGhpZGVCcmVhZGNydW1ic1NlY3Rpb246IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIEBJbnB1dCgpIHB1YmxpYyBpdGVtczogQnJlYWRjcnVtYltdO1xyXG4gICAgQElucHV0KCkgcHVibGljIG1lbnVUYWJzOiBNZW51VGFiW10gPSBbXTtcclxuICAgIEBJbnB1dCgpIHB1YmxpYyB1cmw6IHN0cmluZztcclxuICAgIEBJbnB1dCgpIHB1YmxpYyBicmVhZGNydW1iOiBCcmVhZGNydW1iO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgX2FjdGlvblNlcnZpY2U6IEFjdGlvblNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBfcm91dGVyOiBSb3V0ZXIsXHJcbiAgICAgICAgcHJvdGVjdGVkIGFnZ3JlZ2F0b3JTZXJ2aWNlOiBBZ2dyZWdhdG9yU2VydmljZVxyXG4gICAgKSB7IH1cclxuXHJcbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIXRoaXMuaXRlbXMgfHwgdGhpcy5pdGVtcy5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5tZW51VGFicyAmJiB0aGlzLm1lbnVUYWJzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIHZhciBkYXRhID0gdGhpcy5fcm91dGVyLnVybDtcclxuICAgICAgICAgICAgICAgIHZhciBzdGF0ZXMgPSBkYXRhLnNwbGl0KCcvJyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3RhdGVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc3RhdGUgPSBzdGF0ZXNbc3RhdGVzLmxlbmd0aCAtIDFdO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghc3RhdGUgJiYgdGhpcy51cmwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YSA9IHRoaXMudXJsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZXMgPSBkYXRhLnNwbGl0KCcvJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlID0gc3RhdGVzW3N0YXRlcy5sZW5ndGggLSAxXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuYW1lID0gdGhpcy5fYWN0aW9uU2VydmljZS5yZXRyaWV2ZVN0YXRlTmFtZShzdGF0ZSwgdGhpcy5tZW51VGFicyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2FjdGlvblNlcnZpY2UuY2hhbmdlSXRlbSh7IHN0YXRlOiBzdGF0ZSwgbmFtZTogbmFtZSB9LCB0aGlzLm1lbnVUYWJzLCAoaXRlbXMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXRlbXMgPSBpdGVtcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXRlbXMuc3BsaWNlKDAsIDAsIHRoaXMuYnJlYWRjcnVtYik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBuZ09uQ2hhbmdlcygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmFnZ3JlZ2F0b3JTZXJ2aWNlLnN1YnNjcmliZShLZXlDb25zdC5NZW51Q2hhbmdlZCwgKGl0ZW1zOiBCcmVhZGNydW1iW10pID0+IHtcclxuICAgICAgICAgICAgdGhpcy5pdGVtcyA9IGl0ZW1zO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXRyaWV2ZUN1cnJlbnRJdGVtKCk6IEJyZWFkY3J1bWIge1xyXG4gICAgICAgIGlmICghdGhpcy5pdGVtcyB8fCB0aGlzLml0ZW1zLmxlbmd0aCA9PSAwKSByZXR1cm4gbnVsbDtcclxuICAgICAgICByZXR1cm4gdGhpcy5pdGVtc1t0aGlzLml0ZW1zLmxlbmd0aCAtIDFdO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==