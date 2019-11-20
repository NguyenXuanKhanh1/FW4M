/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
var MockService = /** @class */ (function () {
    function MockService() {
    }
    /**
     * @template T
     * @param {?} callback
     * @param {?=} response
     * @return {?}
     */
    MockService.prototype.verify = /**
     * @template T
     * @param {?} callback
     * @param {?=} response
     * @return {?}
     */
    function (callback, response) {
        /** @type {?} */
        var mock = this.useMock();
        if (mock)
            return of(response ? response : (/** @type {?} */ ({}))).pipe(delay(500));
        return callback;
    };
    /**
     * @private
     * @return {?}
     */
    MockService.prototype.useMock = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var currentValue = JSON.parse(window.localStorage.getItem('mock'));
        if (!currentValue)
            return false;
        return currentValue;
    };
    return MockService;
}());
export { MockService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9jay5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWZ3NGMvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9zaGFyZWQvc2VydmljZXMvbW9jay5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQWMsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV2QztJQUFBO0lBWUEsQ0FBQzs7Ozs7OztJQVhVLDRCQUFNOzs7Ozs7SUFBYixVQUFpQixRQUF1QixFQUFFLFFBQVk7O1lBQzlDLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFO1FBQ3pCLElBQUksSUFBSTtZQUFFLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxtQkFBQSxFQUFFLEVBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNwRSxPQUFPLFFBQVEsQ0FBQztJQUNwQixDQUFDOzs7OztJQUVPLDZCQUFPOzs7O0lBQWY7O1lBQ1EsWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbEUsSUFBSSxDQUFDLFlBQVk7WUFBRSxPQUFPLEtBQUssQ0FBQztRQUNoQyxPQUFPLFlBQVksQ0FBQztJQUN4QixDQUFDO0lBQ0wsa0JBQUM7QUFBRCxDQUFDLEFBWkQsSUFZQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IGRlbGF5IH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIE1vY2tTZXJ2aWNlIHtcclxuICAgIHB1YmxpYyB2ZXJpZnk8VD4oY2FsbGJhY2s6IE9ic2VydmFibGU8VD4sIHJlc3BvbnNlPzogVCk6IE9ic2VydmFibGU8VD4ge1xyXG4gICAgICAgIHZhciBtb2NrID0gdGhpcy51c2VNb2NrKCk7XHJcbiAgICAgICAgaWYgKG1vY2spIHJldHVybiBvZihyZXNwb25zZSA/IHJlc3BvbnNlIDoge30gYXMgVCkucGlwZShkZWxheSg1MDApKTtcclxuICAgICAgICByZXR1cm4gY2FsbGJhY2s7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB1c2VNb2NrKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHZhciBjdXJyZW50VmFsdWUgPSBKU09OLnBhcnNlKHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbW9jaycpKTtcclxuICAgICAgICBpZiAoIWN1cnJlbnRWYWx1ZSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIHJldHVybiBjdXJyZW50VmFsdWU7XHJcbiAgICB9XHJcbn0iXX0=