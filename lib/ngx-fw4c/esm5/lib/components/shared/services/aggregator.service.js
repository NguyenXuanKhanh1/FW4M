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
        var index = this.emitters.findIndex((/**
         * @param {?} s
         * @return {?}
         */
        function (s) { return s.key == key; }));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWdncmVnYXRvci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWZ3NGMvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9zaGFyZWQvc2VydmljZXMvYWdncmVnYXRvci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7QUFFM0Q7SUFBQTtRQUVjLGFBQVEsR0FBMEIsRUFBRSxDQUFDO0tBdUNsRDs7Ozs7OztJQXJDVSxtQ0FBTzs7Ozs7O0lBQWQsVUFBa0IsR0FBVyxFQUFFLEtBQVM7UUFDcEMsSUFBSSxDQUFDLEdBQUc7WUFBRSxPQUFPOztZQUNiLGNBQWMsR0FBRyxtQkFBcUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJOzs7O1FBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsR0FBRyxJQUFJLEdBQUcsRUFBWixDQUFZLEVBQUMsRUFBQTtRQUMvRSxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQ2pCLGNBQWMsR0FBRyxJQUFJLG1CQUFtQixDQUFDO2dCQUNyQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUM7YUFDNUIsQ0FBQyxDQUFDO1NBQ047UUFDRCxjQUFjLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNyQyxDQUFDOzs7Ozs7O0lBRU0scUNBQVM7Ozs7OztJQUFoQixVQUFvQixHQUFXLEVBQUUsUUFBK0I7UUFDNUQsSUFBSSxDQUFDLEdBQUc7WUFBRSxPQUFPOztZQUNiLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVM7Ozs7UUFBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxHQUFHLElBQUksR0FBRyxFQUFaLENBQVksRUFBQztRQUN0RCxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsRUFBRTtZQUNaLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztTQUNsQzs7WUFDRyxjQUFjLEdBQUcsSUFBSSxtQkFBbUIsQ0FBQztZQUN6QyxLQUFLLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUM7U0FDNUIsQ0FBQztRQUNGLGNBQWMsQ0FBQyxLQUFLLENBQUMsU0FBUzs7OztRQUFDLFVBQUMsUUFBVztZQUN2QyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdkIsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDOzs7OztJQUVNLGtDQUFNOzs7O0lBQWIsVUFBYyxHQUFXO1FBQ3JCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTOzs7O1FBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsR0FBRyxJQUFJLEdBQUcsRUFBWixDQUFZLEVBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUMzRCxDQUFDOzs7Ozs7SUFFTyxvQ0FBUTs7Ozs7SUFBaEIsVUFBaUIsR0FBVzs7WUFDcEIsT0FBTyxHQUFHLElBQUksbUJBQW1CLENBQUM7WUFDbEMsR0FBRyxFQUFFLEdBQUc7WUFDUixLQUFLLEVBQUUsSUFBSSxZQUFZLEVBQU87U0FDakMsQ0FBQztRQUNGLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzVCLE9BQU8sT0FBTyxDQUFDLEtBQUssQ0FBQztJQUN6QixDQUFDOztnQkF4Q0osVUFBVSxTQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRTs7OzRCQUhsQztDQTRDQyxBQXpDRCxJQXlDQztTQXhDWSxpQkFBaUI7Ozs7OztJQUMxQixxQ0FBK0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQWdncmVnYXRvclZpZXdNb2RlbCB9IGZyb20gJy4uL21vZGVscy9iYXNlLm1vZGVsJztcclxuXHJcbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXHJcbmV4cG9ydCBjbGFzcyBBZ2dyZWdhdG9yU2VydmljZSB7XHJcbiAgICBwcm90ZWN0ZWQgZW1pdHRlcnM6IEFnZ3JlZ2F0b3JWaWV3TW9kZWxbXSA9IFtdO1xyXG5cclxuICAgIHB1YmxpYyBwdWJsaXNoPFQ+KGtleTogc3RyaW5nLCB2YWx1ZT86IFQpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIWtleSkgcmV0dXJuO1xyXG4gICAgICAgIGxldCBjdXJyZW50RW1pdHRlciA9IDxBZ2dyZWdhdG9yVmlld01vZGVsPnRoaXMuZW1pdHRlcnMuZmluZChzID0+IHMua2V5ID09IGtleSk7XHJcbiAgICAgICAgaWYgKCFjdXJyZW50RW1pdHRlcikge1xyXG4gICAgICAgICAgICBjdXJyZW50RW1pdHRlciA9IG5ldyBBZ2dyZWdhdG9yVmlld01vZGVsKHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLnJlZ2lzdGVyKGtleSlcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGN1cnJlbnRFbWl0dGVyLnZhbHVlLmVtaXQodmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdWJzY3JpYmU8VD4oa2V5OiBzdHJpbmcsIGNhbGxiYWNrOiAocmVzcG9uc2U6IFQpID0+IHZvaWQpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIWtleSkgcmV0dXJuO1xyXG4gICAgICAgIGxldCBpbmRleCA9IHRoaXMuZW1pdHRlcnMuZmluZEluZGV4KHMgPT4gcy5rZXkgPT0ga2V5KTtcclxuICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xyXG4gICAgICAgICAgICB0aGlzLmVtaXR0ZXJzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBjdXJyZW50RW1pdHRlciA9IG5ldyBBZ2dyZWdhdG9yVmlld01vZGVsKHtcclxuICAgICAgICAgICAgdmFsdWU6IHRoaXMucmVnaXN0ZXIoa2V5KVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGN1cnJlbnRFbWl0dGVyLnZhbHVlLnN1YnNjcmliZSgocmVzcG9uc2U6IFQpID0+IHtcclxuICAgICAgICAgICAgY2FsbGJhY2socmVzcG9uc2UpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBoYXNLZXkoa2V5OiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5lbWl0dGVycy5maW5kSW5kZXgocyA9PiBzLmtleSA9PSBrZXkpID4gLTE7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZWdpc3RlcihrZXk6IHN0cmluZyk6IEV2ZW50RW1pdHRlcjxhbnk+IHtcclxuICAgICAgICB2YXIgZW1pdHRlciA9IG5ldyBBZ2dyZWdhdG9yVmlld01vZGVsKHtcclxuICAgICAgICAgICAga2V5OiBrZXksXHJcbiAgICAgICAgICAgIHZhbHVlOiBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuZW1pdHRlcnMucHVzaChlbWl0dGVyKTtcclxuICAgICAgICByZXR1cm4gZW1pdHRlci52YWx1ZTtcclxuICAgIH1cclxufVxyXG4iXX0=