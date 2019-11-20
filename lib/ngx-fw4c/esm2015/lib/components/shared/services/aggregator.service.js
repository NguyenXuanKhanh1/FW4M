/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, EventEmitter } from '@angular/core';
import { AggregatorViewModel } from '../models/base.model';
import * as i0 from "@angular/core";
export class AggregatorService {
    constructor() {
        this.emitters = [];
    }
    /**
     * @template T
     * @param {?} key
     * @param {?=} value
     * @return {?}
     */
    publish(key, value) {
        if (!key)
            return;
        /** @type {?} */
        let currentEmitter = (/** @type {?} */ (this.emitters.find((/**
         * @param {?} s
         * @return {?}
         */
        s => s.key == key))));
        if (!currentEmitter) {
            currentEmitter = new AggregatorViewModel({
                value: this.register(key)
            });
        }
        currentEmitter.value.emit(value);
    }
    /**
     * @template T
     * @param {?} key
     * @param {?} callback
     * @return {?}
     */
    subscribe(key, callback) {
        if (!key)
            return;
        /** @type {?} */
        let currentEmitter = (/** @type {?} */ (this.emitters.find((/**
         * @param {?} s
         * @return {?}
         */
        s => s.key == key))));
        if (!currentEmitter) {
            currentEmitter = new AggregatorViewModel({
                value: this.register(key)
            });
        }
        currentEmitter.value.subscribe((/**
         * @param {?} response
         * @return {?}
         */
        (response) => {
            callback(response);
        }));
    }
    /**
     * @param {?} key
     * @return {?}
     */
    hasKey(key) {
        return this.emitters.findIndex((/**
         * @param {?} s
         * @return {?}
         */
        s => s.key == key)) > -1;
    }
    /**
     * @private
     * @param {?} key
     * @return {?}
     */
    register(key) {
        /** @type {?} */
        var emitter = new AggregatorViewModel({
            key: key,
            value: new EventEmitter()
        });
        this.emitters.push(emitter);
        return emitter.value;
    }
}
AggregatorService.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */ AggregatorService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function AggregatorService_Factory() { return new AggregatorService(); }, token: AggregatorService, providedIn: "root" });
if (false) {
    /**
     * @type {?}
     * @protected
     */
    AggregatorService.prototype.emitters;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWdncmVnYXRvci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWZ3NGMvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9zaGFyZWQvc2VydmljZXMvYWdncmVnYXRvci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7QUFHM0QsTUFBTSxPQUFPLGlCQUFpQjtJQUQ5QjtRQUVjLGFBQVEsR0FBMEIsRUFBRSxDQUFDO0tBdUNsRDs7Ozs7OztJQXJDVSxPQUFPLENBQUksR0FBVyxFQUFFLEtBQVM7UUFDcEMsSUFBSSxDQUFDLEdBQUc7WUFBRSxPQUFPOztZQUNiLGNBQWMsR0FBRyxtQkFBcUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJOzs7O1FBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLEdBQUcsRUFBQyxFQUFBO1FBQy9FLElBQUksQ0FBQyxjQUFjLEVBQUU7WUFDakIsY0FBYyxHQUFHLElBQUksbUJBQW1CLENBQUM7Z0JBQ3JDLEtBQUssRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQzthQUM1QixDQUFDLENBQUM7U0FDTjtRQUNELGNBQWMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3JDLENBQUM7Ozs7Ozs7SUFFTSxTQUFTLENBQUksR0FBVyxFQUFFLFFBQStCO1FBQzVELElBQUksQ0FBQyxHQUFHO1lBQUUsT0FBTzs7WUFDYixjQUFjLEdBQUcsbUJBQXFCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSTs7OztRQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxHQUFHLEVBQUMsRUFBQTtRQUMvRSxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQ2pCLGNBQWMsR0FBRyxJQUFJLG1CQUFtQixDQUFDO2dCQUNyQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUM7YUFDNUIsQ0FBQyxDQUFDO1NBQ047UUFFRCxjQUFjLENBQUMsS0FBSyxDQUFDLFNBQVM7Ozs7UUFBQyxDQUFDLFFBQVcsRUFBRSxFQUFFO1lBQzNDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN2QixDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7Ozs7O0lBRU0sTUFBTSxDQUFDLEdBQVc7UUFDckIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVM7Ozs7UUFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksR0FBRyxFQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDM0QsQ0FBQzs7Ozs7O0lBRU8sUUFBUSxDQUFDLEdBQVc7O1lBQ3BCLE9BQU8sR0FBRyxJQUFJLG1CQUFtQixDQUFDO1lBQ2xDLEdBQUcsRUFBRSxHQUFHO1lBQ1IsS0FBSyxFQUFFLElBQUksWUFBWSxFQUFPO1NBQ2pDLENBQUM7UUFDRixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM1QixPQUFPLE9BQU8sQ0FBQyxLQUFLLENBQUM7SUFDekIsQ0FBQzs7O1lBeENKLFVBQVUsU0FBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUU7Ozs7Ozs7O0lBRTlCLHFDQUErQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBBZ2dyZWdhdG9yVmlld01vZGVsIH0gZnJvbSAnLi4vbW9kZWxzL2Jhc2UubW9kZWwnO1xyXG5cclxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcclxuZXhwb3J0IGNsYXNzIEFnZ3JlZ2F0b3JTZXJ2aWNlIHtcclxuICAgIHByb3RlY3RlZCBlbWl0dGVyczogQWdncmVnYXRvclZpZXdNb2RlbFtdID0gW107XHJcblxyXG4gICAgcHVibGljIHB1Ymxpc2g8VD4oa2V5OiBzdHJpbmcsIHZhbHVlPzogVCk6IHZvaWQge1xyXG4gICAgICAgIGlmICgha2V5KSByZXR1cm47XHJcbiAgICAgICAgbGV0IGN1cnJlbnRFbWl0dGVyID0gPEFnZ3JlZ2F0b3JWaWV3TW9kZWw+dGhpcy5lbWl0dGVycy5maW5kKHMgPT4gcy5rZXkgPT0ga2V5KTtcclxuICAgICAgICBpZiAoIWN1cnJlbnRFbWl0dGVyKSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnRFbWl0dGVyID0gbmV3IEFnZ3JlZ2F0b3JWaWV3TW9kZWwoe1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMucmVnaXN0ZXIoa2V5KVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY3VycmVudEVtaXR0ZXIudmFsdWUuZW1pdCh2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN1YnNjcmliZTxUPihrZXk6IHN0cmluZywgY2FsbGJhY2s6IChyZXNwb25zZTogVCkgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgICAgIGlmICgha2V5KSByZXR1cm47XHJcbiAgICAgICAgbGV0IGN1cnJlbnRFbWl0dGVyID0gPEFnZ3JlZ2F0b3JWaWV3TW9kZWw+dGhpcy5lbWl0dGVycy5maW5kKHMgPT4gcy5rZXkgPT0ga2V5KTtcclxuICAgICAgICBpZiAoIWN1cnJlbnRFbWl0dGVyKSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnRFbWl0dGVyID0gbmV3IEFnZ3JlZ2F0b3JWaWV3TW9kZWwoe1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMucmVnaXN0ZXIoa2V5KVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGN1cnJlbnRFbWl0dGVyLnZhbHVlLnN1YnNjcmliZSgocmVzcG9uc2U6IFQpID0+IHtcclxuICAgICAgICAgICAgY2FsbGJhY2socmVzcG9uc2UpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBoYXNLZXkoa2V5OiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5lbWl0dGVycy5maW5kSW5kZXgocyA9PiBzLmtleSA9PSBrZXkpID4gLTE7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZWdpc3RlcihrZXk6IHN0cmluZyk6IEV2ZW50RW1pdHRlcjxhbnk+IHtcclxuICAgICAgICB2YXIgZW1pdHRlciA9IG5ldyBBZ2dyZWdhdG9yVmlld01vZGVsKHtcclxuICAgICAgICAgICAga2V5OiBrZXksXHJcbiAgICAgICAgICAgIHZhbHVlOiBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuZW1pdHRlcnMucHVzaChlbWl0dGVyKTtcclxuICAgICAgICByZXR1cm4gZW1pdHRlci52YWx1ZTtcclxuICAgIH1cclxufVxyXG4iXX0=