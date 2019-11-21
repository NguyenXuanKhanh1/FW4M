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
        let index = this.emitters.findIndex((/**
         * @param {?} s
         * @return {?}
         */
        s => s.key == key));
        if (index > -1) {
            this.emitters.splice(index, 1);
        }
        /** @type {?} */
        var currentEmitter = new AggregatorViewModel({
            value: this.register(key)
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWdncmVnYXRvci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWZ3NGMvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9zaGFyZWQvc2VydmljZXMvYWdncmVnYXRvci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7QUFHM0QsTUFBTSxPQUFPLGlCQUFpQjtJQUQ5QjtRQUVjLGFBQVEsR0FBMEIsRUFBRSxDQUFDO0tBdUNsRDs7Ozs7OztJQXJDVSxPQUFPLENBQUksR0FBVyxFQUFFLEtBQVM7UUFDcEMsSUFBSSxDQUFDLEdBQUc7WUFBRSxPQUFPOztZQUNiLGNBQWMsR0FBRyxtQkFBcUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJOzs7O1FBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLEdBQUcsRUFBQyxFQUFBO1FBQy9FLElBQUksQ0FBQyxjQUFjLEVBQUU7WUFDakIsY0FBYyxHQUFHLElBQUksbUJBQW1CLENBQUM7Z0JBQ3JDLEtBQUssRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQzthQUM1QixDQUFDLENBQUM7U0FDTjtRQUNELGNBQWMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3JDLENBQUM7Ozs7Ozs7SUFFTSxTQUFTLENBQUksR0FBVyxFQUFFLFFBQStCO1FBQzVELElBQUksQ0FBQyxHQUFHO1lBQUUsT0FBTzs7WUFDYixLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTOzs7O1FBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLEdBQUcsRUFBQztRQUN0RCxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsRUFBRTtZQUNaLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztTQUNsQzs7WUFDRyxjQUFjLEdBQUcsSUFBSSxtQkFBbUIsQ0FBQztZQUN6QyxLQUFLLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUM7U0FDNUIsQ0FBQztRQUNGLGNBQWMsQ0FBQyxLQUFLLENBQUMsU0FBUzs7OztRQUFDLENBQUMsUUFBVyxFQUFFLEVBQUU7WUFDM0MsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3ZCLENBQUMsRUFBQyxDQUFDO0lBQ1AsQ0FBQzs7Ozs7SUFFTSxNQUFNLENBQUMsR0FBVztRQUNyQixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUzs7OztRQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxHQUFHLEVBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUMzRCxDQUFDOzs7Ozs7SUFFTyxRQUFRLENBQUMsR0FBVzs7WUFDcEIsT0FBTyxHQUFHLElBQUksbUJBQW1CLENBQUM7WUFDbEMsR0FBRyxFQUFFLEdBQUc7WUFDUixLQUFLLEVBQUUsSUFBSSxZQUFZLEVBQU87U0FDakMsQ0FBQztRQUNGLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzVCLE9BQU8sT0FBTyxDQUFDLEtBQUssQ0FBQztJQUN6QixDQUFDOzs7WUF4Q0osVUFBVSxTQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRTs7Ozs7Ozs7SUFFOUIscUNBQStDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEFnZ3JlZ2F0b3JWaWV3TW9kZWwgfSBmcm9tICcuLi9tb2RlbHMvYmFzZS5tb2RlbCc7XHJcblxyXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxyXG5leHBvcnQgY2xhc3MgQWdncmVnYXRvclNlcnZpY2Uge1xyXG4gICAgcHJvdGVjdGVkIGVtaXR0ZXJzOiBBZ2dyZWdhdG9yVmlld01vZGVsW10gPSBbXTtcclxuXHJcbiAgICBwdWJsaWMgcHVibGlzaDxUPihrZXk6IHN0cmluZywgdmFsdWU/OiBUKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCFrZXkpIHJldHVybjtcclxuICAgICAgICBsZXQgY3VycmVudEVtaXR0ZXIgPSA8QWdncmVnYXRvclZpZXdNb2RlbD50aGlzLmVtaXR0ZXJzLmZpbmQocyA9PiBzLmtleSA9PSBrZXkpO1xyXG4gICAgICAgIGlmICghY3VycmVudEVtaXR0ZXIpIHtcclxuICAgICAgICAgICAgY3VycmVudEVtaXR0ZXIgPSBuZXcgQWdncmVnYXRvclZpZXdNb2RlbCh7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5yZWdpc3RlcihrZXkpXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjdXJyZW50RW1pdHRlci52YWx1ZS5lbWl0KHZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3Vic2NyaWJlPFQ+KGtleTogc3RyaW5nLCBjYWxsYmFjazogKHJlc3BvbnNlOiBUKSA9PiB2b2lkKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCFrZXkpIHJldHVybjtcclxuICAgICAgICBsZXQgaW5kZXggPSB0aGlzLmVtaXR0ZXJzLmZpbmRJbmRleChzID0+IHMua2V5ID09IGtleSk7XHJcbiAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcclxuICAgICAgICAgICAgdGhpcy5lbWl0dGVycy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgY3VycmVudEVtaXR0ZXIgPSBuZXcgQWdncmVnYXRvclZpZXdNb2RlbCh7XHJcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLnJlZ2lzdGVyKGtleSlcclxuICAgICAgICB9KTtcclxuICAgICAgICBjdXJyZW50RW1pdHRlci52YWx1ZS5zdWJzY3JpYmUoKHJlc3BvbnNlOiBUKSA9PiB7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKHJlc3BvbnNlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaGFzS2V5KGtleTogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZW1pdHRlcnMuZmluZEluZGV4KHMgPT4gcy5rZXkgPT0ga2V5KSA+IC0xO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVnaXN0ZXIoa2V5OiBzdHJpbmcpOiBFdmVudEVtaXR0ZXI8YW55PiB7XHJcbiAgICAgICAgdmFyIGVtaXR0ZXIgPSBuZXcgQWdncmVnYXRvclZpZXdNb2RlbCh7XHJcbiAgICAgICAgICAgIGtleToga2V5LFxyXG4gICAgICAgICAgICB2YWx1ZTogbmV3IEV2ZW50RW1pdHRlcjxhbnk+KClcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmVtaXR0ZXJzLnB1c2goZW1pdHRlcik7XHJcbiAgICAgICAgcmV0dXJuIGVtaXR0ZXIudmFsdWU7XHJcbiAgICB9XHJcbn1cclxuIl19