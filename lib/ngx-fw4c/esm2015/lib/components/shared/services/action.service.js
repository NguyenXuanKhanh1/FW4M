/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { SettingService } from './setting.service';
import { Breadcrumb } from '../models/base.model';
import * as i0 from "@angular/core";
import * as i1 from "./setting.service";
export class ActionService {
    /**
     * @param {?} _settingService
     */
    constructor(_settingService) {
        this._settingService = _settingService;
    }
    /**
     * @param {?} callback
     * @param {?=} timeout
     * @return {?}
     */
    executeAsync(callback, timeout = 50) {
        setTimeout((/**
         * @return {?}
         */
        () => {
            if (callback)
                callback();
        }), timeout);
    }
    /**
     * @return {?}
     */
    scrollTop() {
        window.scrollTo(0, 0);
    }
    /**
     * @return {?}
     */
    isMobile() {
        /** @type {?} */
        const userAgent = navigator.userAgent;
        return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(userAgent));
    }
    /**
     * @template T
     * @param {?} callback
     * @return {?}
     */
    verify(callback) {
        /** @type {?} */
        var mock = this._settingService.useMock();
        if (mock)
            return of((/** @type {?} */ ({})));
        return callback;
    }
    /**
     * @param {?} item
     * @param {?} menuTabs
     * @param {?=} callback
     * @return {?}
     */
    changeItem(item, menuTabs, callback) {
        /** @type {?} */
        var items = [];
        /** @type {?} */
        var parent = (/** @type {?} */ (this.retrieveParent(item.state, menuTabs)));
        if (parent != null) {
            items.push(parent);
        }
        if (!items.find((/**
         * @param {?} s
         * @return {?}
         */
        s => s.label == item.name))) {
            items.push(new Breadcrumb({
                label: item.name,
                url: item.mainState ? `/${item.mainState}/${item.state}` : `${item.state}`
            }));
        }
        if (callback)
            callback(items);
        return items;
    }
    /**
     * @param {?} state
     * @param {?} menuTabs
     * @return {?}
     */
    retrieveParent(state, menuTabs) {
        if (!menuTabs || menuTabs.length == 0)
            return;
        for (let i = 0; i < menuTabs.length; i++) {
            /** @type {?} */
            var items = menuTabs[i].items;
            if (!items || items.length == 0)
                continue;
            for (let j = 0; j < items.length; j++) {
                /** @type {?} */
                var children = items[j].children;
                if (!children || children.length == 0)
                    return;
                for (let k = 0; k < children.length; k++) {
                    if (children[k].state == state)
                        return new Breadcrumb({
                            label: items[j].label,
                            state: children[k].mainState,
                            url: children[k].mainState ? `/${children[k].mainState}/${children[0].state}` : `${children[0].state}`
                        });
                }
            }
        }
        return null;
    }
    /**
     * @param {?} state
     * @param {?} menuTabs
     * @return {?}
     */
    retrieveChild(state, menuTabs) {
        if (!menuTabs || menuTabs.length == 0)
            return;
        for (let i = 0; i < menuTabs.length; i++) {
            /** @type {?} */
            var items = menuTabs[i].items;
            if (!items || items.length == 0)
                continue;
            for (let j = 0; j < items.length; j++) {
                /** @type {?} */
                var children = items[j].children;
                if (!children || children.length == 0)
                    return;
                for (let k = 0; k < children.length; k++) {
                    if (children[k].mainState == state) {
                        return new Breadcrumb({
                            state: children[k].mainState,
                            label: children[k].name,
                            url: children[k].mainState
                                ? `/${children[k].mainState}/${children[0].state}`
                                : `/${children[0].state}`
                        });
                    }
                }
            }
        }
        return null;
    }
    /**
     * @param {?} state
     * @param {?} menuTabs
     * @return {?}
     */
    retrieveStateName(state, menuTabs) {
        if (!menuTabs || menuTabs.length == 0)
            return;
        for (let i = 0; i < menuTabs.length; i++) {
            /** @type {?} */
            var items = menuTabs[i].items;
            if (!items || items.length == 0)
                continue;
            for (let j = 0; j < items.length; j++) {
                /** @type {?} */
                var children = items[j].children;
                if (!children || children.length == 0)
                    return;
                for (let k = 0; k < children.length; k++) {
                    if (children[k].state == state)
                        return children[k].name;
                }
            }
        }
        return null;
    }
}
ActionService.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */
ActionService.ctorParameters = () => [
    { type: SettingService }
];
/** @nocollapse */ ActionService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function ActionService_Factory() { return new ActionService(i0.ɵɵinject(i1.SettingService)); }, token: ActionService, providedIn: "root" });
if (false) {
    /**
     * @type {?}
     * @private
     */
    ActionService.prototype._settingService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZnc0Yy8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL3NoYXJlZC9zZXJ2aWNlcy9hY3Rpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQWMsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsVUFBVSxFQUFXLE1BQU0sc0JBQXNCLENBQUM7OztBQUczRCxNQUFNLE9BQU8sYUFBYTs7OztJQUN0QixZQUNZLGVBQStCO1FBQS9CLG9CQUFlLEdBQWYsZUFBZSxDQUFnQjtJQUN2QyxDQUFDOzs7Ozs7SUFFRSxZQUFZLENBQUMsUUFBbUIsRUFBRSxVQUFrQixFQUFFO1FBQ3pELFVBQVU7OztRQUFDLEdBQUcsRUFBRTtZQUNaLElBQUksUUFBUTtnQkFBRSxRQUFRLEVBQUUsQ0FBQztRQUM3QixDQUFDLEdBQUUsT0FBTyxDQUFDLENBQUM7SUFDaEIsQ0FBQzs7OztJQUVNLFNBQVM7UUFDWixNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUMxQixDQUFDOzs7O0lBRU0sUUFBUTs7Y0FDTCxTQUFTLEdBQUcsU0FBUyxDQUFDLFNBQVM7UUFDckMsT0FBTyxDQUFDLG9GQUFvRixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBQ2xILENBQUM7Ozs7OztJQUVNLE1BQU0sQ0FBSSxRQUF1Qjs7WUFDaEMsSUFBSSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFO1FBQ3pDLElBQUksSUFBSTtZQUFFLE9BQU8sRUFBRSxDQUFDLG1CQUFBLEVBQUUsRUFBSyxDQUFDLENBQUM7UUFDN0IsT0FBTyxRQUFRLENBQUM7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QUFRLElBQUksUUFBUSxDQUFDLE1BQU0sSUFBSSxDQUFDO1lBQUUsT0FBTztRQUM5QyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTs7Z0JBQ2xDLEtBQUssR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSztZQUM3QixJQUFJLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxNQUFNLElBQUksQ0FBQztnQkFBRSxTQUFTO1lBQzFDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFOztvQkFDL0IsUUFBUSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRO2dCQUNoQyxJQUFJLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxNQUFNLElBQUksQ0FBQztvQkFBRSxPQUFPO2dCQUM5QyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtvQkFDdEMsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLEtBQUs7d0JBQUUsT0FBTyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO2lCQUMzRDthQUNKO1NBQ0o7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDOzs7WUFyR0osVUFBVSxTQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRTs7OztZQUh6QixjQUFjOzs7Ozs7OztJQU1mLHdDQUF1QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgU2V0dGluZ1NlcnZpY2UgfSBmcm9tICcuL3NldHRpbmcuc2VydmljZSc7XHJcbmltcG9ydCB7IEJyZWFkY3J1bWIsIE1lbnVUYWIgfSBmcm9tICcuLi9tb2RlbHMvYmFzZS5tb2RlbCc7XHJcblxyXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxyXG5leHBvcnQgY2xhc3MgQWN0aW9uU2VydmljZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIF9zZXR0aW5nU2VydmljZTogU2V0dGluZ1NlcnZpY2VcclxuICAgICkgeyB9XHJcblxyXG4gICAgcHVibGljIGV4ZWN1dGVBc3luYyhjYWxsYmFjazogKCkgPT4gYW55LCB0aW1lb3V0OiBudW1iZXIgPSA1MCk6IHZvaWQge1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrKCk7XHJcbiAgICAgICAgfSwgdGltZW91dCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNjcm9sbFRvcCgpOiB2b2lkIHtcclxuICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgMCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGlzTW9iaWxlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGNvbnN0IHVzZXJBZ2VudCA9IG5hdmlnYXRvci51c2VyQWdlbnQ7XHJcbiAgICAgICAgcmV0dXJuICgvQW5kcm9pZHx3ZWJPU3xpUGhvbmV8aVBhZHxpUG9kfEJsYWNrQmVycnl8SUVNb2JpbGV8T3BlcmEgTWluaXxNb2JpbGV8bW9iaWxlfENyaU9TL2kudGVzdCh1c2VyQWdlbnQpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdmVyaWZ5PFQ+KGNhbGxiYWNrOiBPYnNlcnZhYmxlPFQ+KTogT2JzZXJ2YWJsZTxUPiB7XHJcbiAgICAgICAgdmFyIG1vY2sgPSB0aGlzLl9zZXR0aW5nU2VydmljZS51c2VNb2NrKCk7XHJcbiAgICAgICAgaWYgKG1vY2spIHJldHVybiBvZih7fSBhcyBUKTtcclxuICAgICAgICByZXR1cm4gY2FsbGJhY2s7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNoYW5nZUl0ZW0oaXRlbTogYW55LCBtZW51VGFiczogTWVudVRhYltdLCBjYWxsYmFjaz86IChicmVhZENydW1iczogQnJlYWRjcnVtYltdKSA9PiBhbnkpOiBCcmVhZGNydW1iW10ge1xyXG4gICAgICAgIHZhciBpdGVtczogQnJlYWRjcnVtYltdID0gW107XHJcbiAgICAgICAgdmFyIHBhcmVudCA9IDxCcmVhZGNydW1iPnRoaXMucmV0cmlldmVQYXJlbnQoaXRlbS5zdGF0ZSwgbWVudVRhYnMpO1xyXG4gICAgICAgIGlmIChwYXJlbnQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBpdGVtcy5wdXNoKHBhcmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghaXRlbXMuZmluZChzID0+IHMubGFiZWwgPT0gaXRlbS5uYW1lKSkge1xyXG4gICAgICAgICAgICBpdGVtcy5wdXNoKG5ldyBCcmVhZGNydW1iKHtcclxuICAgICAgICAgICAgICAgIGxhYmVsOiBpdGVtLm5hbWUsXHJcbiAgICAgICAgICAgICAgICB1cmw6IGl0ZW0ubWFpblN0YXRlID8gYC8ke2l0ZW0ubWFpblN0YXRlfS8ke2l0ZW0uc3RhdGV9YCA6IGAke2l0ZW0uc3RhdGV9YFxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2soaXRlbXMpO1xyXG4gICAgICAgIHJldHVybiBpdGVtcztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmV0cmlldmVQYXJlbnQoc3RhdGU6IHN0cmluZywgbWVudVRhYnM6IE1lbnVUYWJbXSk6IEJyZWFkY3J1bWIge1xyXG4gICAgICAgIGlmICghbWVudVRhYnMgfHwgbWVudVRhYnMubGVuZ3RoID09IDApIHJldHVybjtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1lbnVUYWJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBpdGVtcyA9IG1lbnVUYWJzW2ldLml0ZW1zO1xyXG4gICAgICAgICAgICBpZiAoIWl0ZW1zIHx8IGl0ZW1zLmxlbmd0aCA9PSAwKSBjb250aW51ZTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBpdGVtcy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNoaWxkcmVuID0gaXRlbXNbal0uY2hpbGRyZW47XHJcbiAgICAgICAgICAgICAgICBpZiAoIWNoaWxkcmVuIHx8IGNoaWxkcmVuLmxlbmd0aCA9PSAwKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IGNoaWxkcmVuLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNoaWxkcmVuW2tdLnN0YXRlID09IHN0YXRlKSByZXR1cm4gbmV3IEJyZWFkY3J1bWIoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogaXRlbXNbal0ubGFiZWwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlOiBjaGlsZHJlbltrXS5tYWluU3RhdGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogY2hpbGRyZW5ba10ubWFpblN0YXRlID8gYC8ke2NoaWxkcmVuW2tdLm1haW5TdGF0ZX0vJHtjaGlsZHJlblswXS5zdGF0ZX1gIDogYCR7Y2hpbGRyZW5bMF0uc3RhdGV9YFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXRyaWV2ZUNoaWxkKHN0YXRlOiBzdHJpbmcsIG1lbnVUYWJzOiBNZW51VGFiW10pOiBCcmVhZGNydW1iIHtcclxuICAgICAgICBpZiAoIW1lbnVUYWJzIHx8IG1lbnVUYWJzLmxlbmd0aCA9PSAwKSByZXR1cm47XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtZW51VGFicy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgaXRlbXMgPSBtZW51VGFic1tpXS5pdGVtcztcclxuICAgICAgICAgICAgaWYgKCFpdGVtcyB8fCBpdGVtcy5sZW5ndGggPT0gMCkgY29udGludWU7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgaXRlbXMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIHZhciBjaGlsZHJlbiA9IGl0ZW1zW2pdLmNoaWxkcmVuO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFjaGlsZHJlbiB8fCBjaGlsZHJlbi5sZW5ndGggPT0gMCkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCBjaGlsZHJlbi5sZW5ndGg7IGsrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjaGlsZHJlbltrXS5tYWluU3RhdGUgPT0gc3RhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBCcmVhZGNydW1iKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlOiBjaGlsZHJlbltrXS5tYWluU3RhdGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogY2hpbGRyZW5ba10ubmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogY2hpbGRyZW5ba10ubWFpblN0YXRlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBgLyR7Y2hpbGRyZW5ba10ubWFpblN0YXRlfS8ke2NoaWxkcmVuWzBdLnN0YXRlfWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGAvJHtjaGlsZHJlblswXS5zdGF0ZX1gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmV0cmlldmVTdGF0ZU5hbWUoc3RhdGU6IHN0cmluZywgbWVudVRhYnM6IE1lbnVUYWJbXSk6IHN0cmluZyB7XHJcbiAgICAgICAgaWYgKCFtZW51VGFicyB8fCBtZW51VGFicy5sZW5ndGggPT0gMCkgcmV0dXJuO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWVudVRhYnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIGl0ZW1zID0gbWVudVRhYnNbaV0uaXRlbXM7XHJcbiAgICAgICAgICAgIGlmICghaXRlbXMgfHwgaXRlbXMubGVuZ3RoID09IDApIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGl0ZW1zLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY2hpbGRyZW4gPSBpdGVtc1tqXS5jaGlsZHJlbjtcclxuICAgICAgICAgICAgICAgIGlmICghY2hpbGRyZW4gfHwgY2hpbGRyZW4ubGVuZ3RoID09IDApIHJldHVybjtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgY2hpbGRyZW4ubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2hpbGRyZW5ba10uc3RhdGUgPT0gc3RhdGUpIHJldHVybiBjaGlsZHJlbltrXS5uYW1lO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==