/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
export class MockService {
    /**
     * @template T
     * @param {?} callback
     * @param {?=} response
     * @return {?}
     */
    verify(callback, response) {
        /** @type {?} */
        var mock = this.useMock();
        if (mock)
            return of(response ? response : (/** @type {?} */ ({}))).pipe(delay(500));
        return callback;
    }
    /**
     * @private
     * @return {?}
     */
    useMock() {
        /** @type {?} */
        var currentValue = JSON.parse(window.localStorage.getItem('mock'));
        if (!currentValue)
            return false;
        return currentValue;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9jay5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWZ3NGMvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9zaGFyZWQvc2VydmljZXMvbW9jay5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQWMsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV2QyxNQUFNLE9BQU8sV0FBVzs7Ozs7OztJQUNiLE1BQU0sQ0FBSSxRQUF1QixFQUFFLFFBQVk7O1lBQzlDLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFO1FBQ3pCLElBQUksSUFBSTtZQUFFLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxtQkFBQSxFQUFFLEVBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNwRSxPQUFPLFFBQVEsQ0FBQztJQUNwQixDQUFDOzs7OztJQUVPLE9BQU87O1lBQ1AsWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbEUsSUFBSSxDQUFDLFlBQVk7WUFBRSxPQUFPLEtBQUssQ0FBQztRQUNoQyxPQUFPLFlBQVksQ0FBQztJQUN4QixDQUFDO0NBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBkZWxheSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBNb2NrU2VydmljZSB7XHJcbiAgICBwdWJsaWMgdmVyaWZ5PFQ+KGNhbGxiYWNrOiBPYnNlcnZhYmxlPFQ+LCByZXNwb25zZT86IFQpOiBPYnNlcnZhYmxlPFQ+IHtcclxuICAgICAgICB2YXIgbW9jayA9IHRoaXMudXNlTW9jaygpO1xyXG4gICAgICAgIGlmIChtb2NrKSByZXR1cm4gb2YocmVzcG9uc2UgPyByZXNwb25zZSA6IHt9IGFzIFQpLnBpcGUoZGVsYXkoNTAwKSk7XHJcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdXNlTW9jaygpOiBib29sZWFuIHtcclxuICAgICAgICB2YXIgY3VycmVudFZhbHVlID0gSlNPTi5wYXJzZSh3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ21vY2snKSk7XHJcbiAgICAgICAgaWYgKCFjdXJyZW50VmFsdWUpIHJldHVybiBmYWxzZTtcclxuICAgICAgICByZXR1cm4gY3VycmVudFZhbHVlO1xyXG4gICAgfVxyXG59Il19