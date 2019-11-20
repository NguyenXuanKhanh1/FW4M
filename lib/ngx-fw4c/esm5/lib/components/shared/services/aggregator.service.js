/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, EventEmitter } from '@angular/core';
import { AggregatorViewModel } from '../models/base.model';
import * as i0 from "@angular/core";
var AggregatorService = /** @class */ (function () {
    function AggregatorService() {
        this.emitters = [];
    }
    /**
     * @template T
     * @param {?} key
     * @param {?=} value
     * @return {?}
     */
    AggregatorService.prototype.publish = /**
     * @template T
     * @param {?} key
     * @param {?=} value
     * @return {?}
     */
    function (key, value) {
        if (!key)
            return;
        /** @type {?} */
        var currentEmitter = (/** @type {?} */ (this.emitters.find((/**
         * @param {?} s
         * @return {?}
         */
        function (s) { return s.key == key; }))));
        if (!currentEmitter) {
            currentEmitter = new AggregatorViewModel({
                value: this.register(key)
            });
        }
        currentEmitter.value.emit(value);
    };
    /**
     * @template T
     * @param {?} key
     * @param {?} callback
     * @return {?}
     */
    AggregatorService.prototype.subscribe = /**
     * @template T
     * @param {?} key
     * @param {?} callback
     * @return {?}
     */
    function (key, callback) {
        if (!key)
            return;
        /** @type {?} */
        var currentEmitter = (/** @type {?} */ (this.emitters.find((/**
         * @param {?} s
         * @return {?}
         */
        function (s) { return s.key == key; }))));
        if (!currentEmitter) {
            currentEmitter = new AggregatorViewModel({
                value: this.register(key)
            });
        }
        currentEmitter.value.subscribe((/**
         * @param {?} response
         * @return {?}
         */
        function (response) {
            callback(response);
        }));
    };
    /**
     * @param {?} key
     * @return {?}
     */
    AggregatorService.prototype.hasKey = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        return this.emitters.findIndex((/**
         * @param {?} s
         * @return {?}
         */
        function (s) { return s.key == key; })) > -1;
    };
    /**
     * @private
     * @param {?} key
     * @return {?}
     */
    AggregatorService.prototype.register = /**
     * @private
     * @param {?} key
     * @return {?}
     */
    function (key) {
        /** @type {?} */
        var emitter = new AggregatorViewModel({
            key: key,
            value: new EventEmitter()
        });
        this.emitters.push(emitter);
        return emitter.value;
    };
    AggregatorService.decorators = [
        { type: Injectable, args: [{ providedIn: 'root' },] }
    ];
    /** @nocollapse */ AggregatorService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function AggregatorService_Factory() { return new AggregatorService(); }, token: AggregatorService, providedIn: "root" });
    return AggregatorService;
}());
export { AggregatorService };
if (false) {
    /**
     * @type {?}
     * @protected
     */
    AggregatorService.prototype.emitters;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWdncmVnYXRvci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWZ3NGMvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9zaGFyZWQvc2VydmljZXMvYWdncmVnYXRvci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7QUFFM0Q7SUFBQTtRQUVjLGFBQVEsR0FBMEIsRUFBRSxDQUFDO0tBdUNsRDs7Ozs7OztJQXJDVSxtQ0FBTzs7Ozs7O0lBQWQsVUFBa0IsR0FBVyxFQUFFLEtBQVM7UUFDcEMsSUFBSSxDQUFDLEdBQUc7WUFBRSxPQUFPOztZQUNiLGNBQWMsR0FBRyxtQkFBcUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJOzs7O1FBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsR0FBRyxJQUFJLEdBQUcsRUFBWixDQUFZLEVBQUMsRUFBQTtRQUMvRSxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQ2pCLGNBQWMsR0FBRyxJQUFJLG1CQUFtQixDQUFDO2dCQUNyQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUM7YUFDNUIsQ0FBQyxDQUFDO1NBQ047UUFDRCxjQUFjLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNyQyxDQUFDOzs7Ozs7O0lBRU0scUNBQVM7Ozs7OztJQUFoQixVQUFvQixHQUFXLEVBQUUsUUFBK0I7UUFDNUQsSUFBSSxDQUFDLEdBQUc7WUFBRSxPQUFPOztZQUNiLGNBQWMsR0FBRyxtQkFBcUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJOzs7O1FBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsR0FBRyxJQUFJLEdBQUcsRUFBWixDQUFZLEVBQUMsRUFBQTtRQUMvRSxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQ2pCLGNBQWMsR0FBRyxJQUFJLG1CQUFtQixDQUFDO2dCQUNyQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUM7YUFDNUIsQ0FBQyxDQUFDO1NBQ047UUFFRCxjQUFjLENBQUMsS0FBSyxDQUFDLFNBQVM7Ozs7UUFBQyxVQUFDLFFBQVc7WUFDdkMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3ZCLENBQUMsRUFBQyxDQUFDO0lBQ1AsQ0FBQzs7Ozs7SUFFTSxrQ0FBTTs7OztJQUFiLFVBQWMsR0FBVztRQUNyQixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUzs7OztRQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLEdBQUcsSUFBSSxHQUFHLEVBQVosQ0FBWSxFQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDM0QsQ0FBQzs7Ozs7O0lBRU8sb0NBQVE7Ozs7O0lBQWhCLFVBQWlCLEdBQVc7O1lBQ3BCLE9BQU8sR0FBRyxJQUFJLG1CQUFtQixDQUFDO1lBQ2xDLEdBQUcsRUFBRSxHQUFHO1lBQ1IsS0FBSyxFQUFFLElBQUksWUFBWSxFQUFPO1NBQ2pDLENBQUM7UUFDRixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM1QixPQUFPLE9BQU8sQ0FBQyxLQUFLLENBQUM7SUFDekIsQ0FBQzs7Z0JBeENKLFVBQVUsU0FBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUU7Ozs0QkFIbEM7Q0E0Q0MsQUF6Q0QsSUF5Q0M7U0F4Q1ksaUJBQWlCOzs7Ozs7SUFDMUIscUNBQStDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEFnZ3JlZ2F0b3JWaWV3TW9kZWwgfSBmcm9tICcuLi9tb2RlbHMvYmFzZS5tb2RlbCc7XHJcblxyXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxyXG5leHBvcnQgY2xhc3MgQWdncmVnYXRvclNlcnZpY2Uge1xyXG4gICAgcHJvdGVjdGVkIGVtaXR0ZXJzOiBBZ2dyZWdhdG9yVmlld01vZGVsW10gPSBbXTtcclxuXHJcbiAgICBwdWJsaWMgcHVibGlzaDxUPihrZXk6IHN0cmluZywgdmFsdWU/OiBUKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCFrZXkpIHJldHVybjtcclxuICAgICAgICBsZXQgY3VycmVudEVtaXR0ZXIgPSA8QWdncmVnYXRvclZpZXdNb2RlbD50aGlzLmVtaXR0ZXJzLmZpbmQocyA9PiBzLmtleSA9PSBrZXkpO1xyXG4gICAgICAgIGlmICghY3VycmVudEVtaXR0ZXIpIHtcclxuICAgICAgICAgICAgY3VycmVudEVtaXR0ZXIgPSBuZXcgQWdncmVnYXRvclZpZXdNb2RlbCh7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5yZWdpc3RlcihrZXkpXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjdXJyZW50RW1pdHRlci52YWx1ZS5lbWl0KHZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3Vic2NyaWJlPFQ+KGtleTogc3RyaW5nLCBjYWxsYmFjazogKHJlc3BvbnNlOiBUKSA9PiB2b2lkKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCFrZXkpIHJldHVybjtcclxuICAgICAgICBsZXQgY3VycmVudEVtaXR0ZXIgPSA8QWdncmVnYXRvclZpZXdNb2RlbD50aGlzLmVtaXR0ZXJzLmZpbmQocyA9PiBzLmtleSA9PSBrZXkpO1xyXG4gICAgICAgIGlmICghY3VycmVudEVtaXR0ZXIpIHtcclxuICAgICAgICAgICAgY3VycmVudEVtaXR0ZXIgPSBuZXcgQWdncmVnYXRvclZpZXdNb2RlbCh7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5yZWdpc3RlcihrZXkpXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY3VycmVudEVtaXR0ZXIudmFsdWUuc3Vic2NyaWJlKChyZXNwb25zZTogVCkgPT4ge1xyXG4gICAgICAgICAgICBjYWxsYmFjayhyZXNwb25zZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGhhc0tleShrZXk6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmVtaXR0ZXJzLmZpbmRJbmRleChzID0+IHMua2V5ID09IGtleSkgPiAtMTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlZ2lzdGVyKGtleTogc3RyaW5nKTogRXZlbnRFbWl0dGVyPGFueT4ge1xyXG4gICAgICAgIHZhciBlbWl0dGVyID0gbmV3IEFnZ3JlZ2F0b3JWaWV3TW9kZWwoe1xyXG4gICAgICAgICAgICBrZXk6IGtleSxcclxuICAgICAgICAgICAgdmFsdWU6IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5lbWl0dGVycy5wdXNoKGVtaXR0ZXIpO1xyXG4gICAgICAgIHJldHVybiBlbWl0dGVyLnZhbHVlO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==