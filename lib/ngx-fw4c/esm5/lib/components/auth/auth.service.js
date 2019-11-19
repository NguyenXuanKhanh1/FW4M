/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CacheService } from '../shared/services/cache.service';
import { AuthConst } from './auth.const';
import { Router } from '@angular/router';
import { MockService } from '../shared/services/mock.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "../shared/services/cache.service";
import * as i3 from "@angular/router";
var AuthenticationService = /** @class */ (function (_super) {
    tslib_1.__extends(AuthenticationService, _super);
    function AuthenticationService(httpClient, _cacheService, _router) {
        var _this = _super.call(this) || this;
        _this.httpClient = httpClient;
        _this._cacheService = _cacheService;
        _this._router = _router;
        _this.api = 'v1/authentications/search';
        /** @type {?} */
        var user = (/** @type {?} */ (_this._cacheService.get(AuthConst.User)));
        _this._cacheService.set(AuthConst.User, user);
        _this.currentUser = user;
        return _this;
    }
    /**
     * @param {?} request
     * @return {?}
     */
    AuthenticationService.prototype.search = /**
     * @param {?} request
     * @return {?}
     */
    function (request) {
        return this.verify(this.httpClient.get(this.api + "/search", { params: (/** @type {?} */ (request)) }), request.mockData);
    };
    /**
     * @param {?} request
     * @return {?}
     */
    AuthenticationService.prototype.retrieve = /**
     * @param {?} request
     * @return {?}
     */
    function (request) {
        return this.verify(this.httpClient.get(this.api + "/" + request.payload.userName), request.mockData);
    };
    /**
     * @param {?} request
     * @return {?}
     */
    AuthenticationService.prototype.login = /**
     * @param {?} request
     * @return {?}
     */
    function (request) {
        return this.verify(this.httpClient.post(this.api + "/login", request), request.mockData);
    };
    /**
     * @param {?} request
     * @return {?}
     */
    AuthenticationService.prototype.create = /**
     * @param {?} request
     * @return {?}
     */
    function (request) {
        return this.verify(this.httpClient.post(this.api + "/", request), request.mockData);
    };
    /**
     * @param {?} request
     * @return {?}
     */
    AuthenticationService.prototype.update = /**
     * @param {?} request
     * @return {?}
     */
    function (request) {
        return this.verify(this.httpClient.put(this.api + "/", request), request.mockData);
    };
    /**
     * @param {?} request
     * @return {?}
     */
    AuthenticationService.prototype.delete = /**
     * @param {?} request
     * @return {?}
     */
    function (request) {
        return this.verify(this.httpClient.delete(this.api + "?ids=" + request.ids), request.mockData);
    };
    /**
     * @param {?=} path
     * @param {?=} refresh
     * @return {?}
     */
    AuthenticationService.prototype.logout = /**
     * @param {?=} path
     * @param {?=} refresh
     * @return {?}
     */
    function (path, refresh) {
        if (path === void 0) { path = '/'; }
        if (refresh === void 0) { refresh = false; }
        this._cacheService.remove(AuthConst.User);
        if (path)
            this._router.navigate([path]);
        if (refresh)
            window.location.href = window.location.href;
    };
    AuthenticationService.decorators = [
        { type: Injectable, args: [{ providedIn: 'root' },] }
    ];
    /** @nocollapse */
    AuthenticationService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: CacheService },
        { type: Router }
    ]; };
    /** @nocollapse */ AuthenticationService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function AuthenticationService_Factory() { return new AuthenticationService(i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject(i2.CacheService), i0.ɵɵinject(i3.Router)); }, token: AuthenticationService, providedIn: "root" });
    return AuthenticationService;
}(MockService));
export { AuthenticationService };
if (false) {
    /** @type {?} */
    AuthenticationService.prototype.currentUser;
    /** @type {?} */
    AuthenticationService.prototype.api;
    /**
     * @type {?}
     * @protected
     */
    AuthenticationService.prototype.httpClient;
    /**
     * @type {?}
     * @private
     */
    AuthenticationService.prototype._cacheService;
    /**
     * @type {?}
     * @private
     */
    AuthenticationService.prototype._router;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWZ3NGMvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9hdXRoL2F1dGguc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBaUJsRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDaEUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN6QyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDekMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGlDQUFpQyxDQUFDOzs7OztBQUU5RDtJQUMyQyxpREFBVztJQUlwRCwrQkFDWSxVQUFzQixFQUN4QixhQUEyQixFQUMzQixPQUFlO1FBSHpCLFlBS0UsaUJBQU8sU0FJUjtRQVJXLGdCQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3hCLG1CQUFhLEdBQWIsYUFBYSxDQUFjO1FBQzNCLGFBQU8sR0FBUCxPQUFPLENBQVE7UUFMbEIsU0FBRyxHQUFXLDJCQUEyQixDQUFDOztZQVEzQyxJQUFJLEdBQUcsbUJBQWUsS0FBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFBO1FBQ2hFLEtBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDN0MsS0FBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7O0lBQzFCLENBQUM7Ozs7O0lBRU0sc0NBQU07Ozs7SUFBYixVQUFjLE9BQW9DO1FBQ2hELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBa0MsSUFBSSxDQUFDLEdBQUcsWUFBUyxFQUFFLEVBQUUsTUFBTSxFQUFFLG1CQUFBLE9BQU8sRUFBTyxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDM0ksQ0FBQzs7Ozs7SUFFTSx3Q0FBUTs7OztJQUFmLFVBQWdCLE9BQXNDO1FBQ3BELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBb0MsSUFBSSxDQUFDLEdBQUcsU0FBSSxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN2SSxDQUFDOzs7OztJQUVNLHFDQUFLOzs7O0lBQVosVUFBYSxPQUFtQztRQUM5QyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQWlDLElBQUksQ0FBQyxHQUFHLFdBQVEsRUFBRSxPQUFPLENBQUMsRUFBRSxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDeEgsQ0FBQzs7Ozs7SUFFTSxzQ0FBTTs7OztJQUFiLFVBQWMsT0FBb0M7UUFDaEQsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFrQyxJQUFJLENBQUMsR0FBRyxNQUFHLEVBQUUsT0FBTyxDQUFDLEVBQUUsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3BILENBQUM7Ozs7O0lBRU0sc0NBQU07Ozs7SUFBYixVQUFjLE9BQW9DO1FBQ2hELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBa0MsSUFBSSxDQUFDLEdBQUcsTUFBRyxFQUFFLE9BQU8sQ0FBQyxFQUFFLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNuSCxDQUFDOzs7OztJQUVNLHNDQUFNOzs7O0lBQWIsVUFBYyxPQUFvQztRQUNoRCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQWtDLElBQUksQ0FBQyxHQUFHLGFBQVEsT0FBTyxDQUFDLEdBQUssQ0FBQyxFQUFFLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMvSCxDQUFDOzs7Ozs7SUFFTSxzQ0FBTTs7Ozs7SUFBYixVQUFjLElBQWtCLEVBQUUsT0FBd0I7UUFBNUMscUJBQUEsRUFBQSxVQUFrQjtRQUFFLHdCQUFBLEVBQUEsZUFBd0I7UUFDeEQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzFDLElBQUksSUFBSTtZQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUN4QyxJQUFJLE9BQU87WUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztJQUMzRCxDQUFDOztnQkE1Q0YsVUFBVSxTQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRTs7OztnQkF0QnpCLFVBQVU7Z0JBaUJWLFlBQVk7Z0JBRVosTUFBTTs7O2dDQXBCZjtDQW9FQyxBQTdDRCxDQUMyQyxXQUFXLEdBNENyRDtTQTVDWSxxQkFBcUI7OztJQUNoQyw0Q0FBa0M7O0lBQ2xDLG9DQUFpRDs7Ozs7SUFHL0MsMkNBQWdDOzs7OztJQUNoQyw4Q0FBbUM7Ozs7O0lBQ25DLHdDQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQge1xyXG4gIEF1dGhlbnRpY2F0aW9uTG9naW5SZXF1ZXN0LFxyXG4gIEF1dGhlbnRpY2F0aW9uTG9naW5SZXNwb25zZSxcclxuICBVc2VyVmlld01vZGVsLFxyXG4gIEF1dGhlbnRpY2F0aW9uU2VhcmNoUmVxdWVzdCxcclxuICBBdXRoZW50aWNhdGlvblNlYXJjaFJlc3BvbnNlLFxyXG4gIEF1dGhlbnRpY2F0aW9uUmV0cmlldmVSZXF1ZXN0LFxyXG4gIEF1dGhlbnRpY2F0aW9uUmV0cmlldmVSZXNwb25zZSxcclxuICBBdXRoZW50aWNhdGlvbkNyZWF0ZVJlcXVlc3QsXHJcbiAgQXV0aGVudGljYXRpb25DcmVhdGVSZXNwb25zZSxcclxuICBBdXRoZW50aWNhdGlvblVwZGF0ZVJlcXVlc3QsXHJcbiAgQXV0aGVudGljYXRpb25VcGRhdGVSZXNwb25zZSxcclxuICBBdXRoZW50aWNhdGlvbkRlbGV0ZVJlcXVlc3QsXHJcbiAgQXV0aGVudGljYXRpb25EZWxldGVSZXNwb25zZVxyXG59IGZyb20gJy4vYXV0aC5tb2RlbCc7XHJcbmltcG9ydCB7IENhY2hlU2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9zZXJ2aWNlcy9jYWNoZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQXV0aENvbnN0IH0gZnJvbSAnLi9hdXRoLmNvbnN0JztcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgTW9ja1NlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQvc2VydmljZXMvbW9jay5zZXJ2aWNlJztcclxuXHJcbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXHJcbmV4cG9ydCBjbGFzcyBBdXRoZW50aWNhdGlvblNlcnZpY2UgZXh0ZW5kcyBNb2NrU2VydmljZSB7XHJcbiAgcHVibGljIGN1cnJlbnRVc2VyOiBVc2VyVmlld01vZGVsO1xyXG4gIHB1YmxpYyBhcGk6IHN0cmluZyA9ICd2MS9hdXRoZW50aWNhdGlvbnMvc2VhcmNoJztcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcm90ZWN0ZWQgaHR0cENsaWVudDogSHR0cENsaWVudCxcclxuICAgIHByaXZhdGUgX2NhY2hlU2VydmljZTogQ2FjaGVTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBfcm91dGVyOiBSb3V0ZXJcclxuICApIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgICB2YXIgdXNlciA9IDxVc2VyVmlld01vZGVsPnRoaXMuX2NhY2hlU2VydmljZS5nZXQoQXV0aENvbnN0LlVzZXIpO1xyXG4gICAgdGhpcy5fY2FjaGVTZXJ2aWNlLnNldChBdXRoQ29uc3QuVXNlciwgdXNlcik7XHJcbiAgICB0aGlzLmN1cnJlbnRVc2VyID0gdXNlcjtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZWFyY2gocmVxdWVzdDogQXV0aGVudGljYXRpb25TZWFyY2hSZXF1ZXN0KTogT2JzZXJ2YWJsZTxBdXRoZW50aWNhdGlvblNlYXJjaFJlc3BvbnNlPiB7XHJcbiAgICByZXR1cm4gdGhpcy52ZXJpZnkodGhpcy5odHRwQ2xpZW50LmdldDxBdXRoZW50aWNhdGlvblNlYXJjaFJlc3BvbnNlPihgJHt0aGlzLmFwaX0vc2VhcmNoYCwgeyBwYXJhbXM6IHJlcXVlc3QgYXMgYW55IH0pLCByZXF1ZXN0Lm1vY2tEYXRhKVxyXG4gIH1cclxuXHJcbiAgcHVibGljIHJldHJpZXZlKHJlcXVlc3Q6IEF1dGhlbnRpY2F0aW9uUmV0cmlldmVSZXF1ZXN0KTogT2JzZXJ2YWJsZTxBdXRoZW50aWNhdGlvblJldHJpZXZlUmVzcG9uc2U+IHtcclxuICAgIHJldHVybiB0aGlzLnZlcmlmeSh0aGlzLmh0dHBDbGllbnQuZ2V0PEF1dGhlbnRpY2F0aW9uUmV0cmlldmVSZXNwb25zZT4oYCR7dGhpcy5hcGl9LyR7cmVxdWVzdC5wYXlsb2FkLnVzZXJOYW1lfWApLCByZXF1ZXN0Lm1vY2tEYXRhKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBsb2dpbihyZXF1ZXN0OiBBdXRoZW50aWNhdGlvbkxvZ2luUmVxdWVzdCk6IE9ic2VydmFibGU8QXV0aGVudGljYXRpb25Mb2dpblJlc3BvbnNlPiB7XHJcbiAgICByZXR1cm4gdGhpcy52ZXJpZnkodGhpcy5odHRwQ2xpZW50LnBvc3Q8QXV0aGVudGljYXRpb25Mb2dpblJlc3BvbnNlPihgJHt0aGlzLmFwaX0vbG9naW5gLCByZXF1ZXN0KSwgcmVxdWVzdC5tb2NrRGF0YSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgY3JlYXRlKHJlcXVlc3Q6IEF1dGhlbnRpY2F0aW9uQ3JlYXRlUmVxdWVzdCk6IE9ic2VydmFibGU8QXV0aGVudGljYXRpb25DcmVhdGVSZXNwb25zZT4ge1xyXG4gICAgcmV0dXJuIHRoaXMudmVyaWZ5KHRoaXMuaHR0cENsaWVudC5wb3N0PEF1dGhlbnRpY2F0aW9uQ3JlYXRlUmVzcG9uc2U+KGAke3RoaXMuYXBpfS9gLCByZXF1ZXN0KSwgcmVxdWVzdC5tb2NrRGF0YSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgdXBkYXRlKHJlcXVlc3Q6IEF1dGhlbnRpY2F0aW9uVXBkYXRlUmVxdWVzdCk6IE9ic2VydmFibGU8QXV0aGVudGljYXRpb25VcGRhdGVSZXNwb25zZT4ge1xyXG4gICAgcmV0dXJuIHRoaXMudmVyaWZ5KHRoaXMuaHR0cENsaWVudC5wdXQ8QXV0aGVudGljYXRpb25VcGRhdGVSZXNwb25zZT4oYCR7dGhpcy5hcGl9L2AsIHJlcXVlc3QpLCByZXF1ZXN0Lm1vY2tEYXRhKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBkZWxldGUocmVxdWVzdDogQXV0aGVudGljYXRpb25EZWxldGVSZXF1ZXN0KTogT2JzZXJ2YWJsZTxBdXRoZW50aWNhdGlvbkRlbGV0ZVJlc3BvbnNlPiB7XHJcbiAgICByZXR1cm4gdGhpcy52ZXJpZnkodGhpcy5odHRwQ2xpZW50LmRlbGV0ZTxBdXRoZW50aWNhdGlvbkRlbGV0ZVJlc3BvbnNlPihgJHt0aGlzLmFwaX0/aWRzPSR7cmVxdWVzdC5pZHN9YCksIHJlcXVlc3QubW9ja0RhdGEpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGxvZ291dChwYXRoOiBzdHJpbmcgPSAnLycsIHJlZnJlc2g6IGJvb2xlYW4gPSBmYWxzZSk6IHZvaWQge1xyXG4gICAgdGhpcy5fY2FjaGVTZXJ2aWNlLnJlbW92ZShBdXRoQ29uc3QuVXNlcik7XHJcbiAgICBpZiAocGF0aCkgdGhpcy5fcm91dGVyLm5hdmlnYXRlKFtwYXRoXSk7XHJcbiAgICBpZiAocmVmcmVzaCkgd2luZG93LmxvY2F0aW9uLmhyZWYgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcclxuICB9XHJcbn0iXX0=