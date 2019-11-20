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
import { KeyConst } from '../shared/constants/key.const';
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
        _this.menuTabs = [
            {
                role: 'SA',
                items: [
                    {
                        label: 'Dashboard',
                        icon: 'fa fa-pie-chart ',
                        children: [
                            { state: 'dashboard', name: 'Dashboard', type: 'link', icon: 'fa fa-pie' }
                        ]
                    }
                ]
            }
        ];
        /** @type {?} */
        var user = (/** @type {?} */ (_this._cacheService.get(AuthConst.User)));
        _this._cacheService.set(AuthConst.User, user);
        _this.currentUser = user;
        return _this;
    }
    /**
     * @param {?} url
     * @return {?}
     */
    AuthenticationService.prototype.setApi = /**
     * @param {?} url
     * @return {?}
     */
    function (url) {
        this._cacheService.set(KeyConst.AuthApi, url);
    };
    /**
     * @return {?}
     */
    AuthenticationService.prototype.getApi = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var url = this._cacheService.get(KeyConst.AuthApi);
        if (!url)
            url = 'v1/authentications';
        return url;
    };
    /**
     * @param {?} request
     * @return {?}
     */
    AuthenticationService.prototype.search = /**
     * @param {?} request
     * @return {?}
     */
    function (request) {
        return this.verify(this.httpClient.get(this.getApi() + "/search", { params: (/** @type {?} */ (request)) }), request.mockData);
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
        return this.verify(this.httpClient.get(this.getApi() + "/" + request.payload.userName), request.mockData);
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
        if (request.mockData && !request.mockData.menuTabs || ((/** @type {?} */ (request.mockData.menuTabs))).length == 0)
            request.mockData.menuTabs = this.menuTabs;
        return this.verify(this.httpClient.post(this.getApi() + "/login", request), request.mockData);
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
        return this.verify(this.httpClient.post(this.getApi() + "/", request), request.mockData);
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
        return this.verify(this.httpClient.put(this.getApi() + "/", request), request.mockData);
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
        return this.verify(this.httpClient.delete(this.getApi() + "?ids=" + request.ids), request.mockData);
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
        this._cacheService.remove(KeyConst.Menu);
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
    /**
     * @type {?}
     * @protected
     */
    AuthenticationService.prototype.menuTabs;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWZ3NGMvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9hdXRoL2F1dGguc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBaUJsRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDaEUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN6QyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDekMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBRTlELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQzs7Ozs7QUFFekQ7SUFDMkMsaURBQVc7SUFpQnBELCtCQUNZLFVBQXNCLEVBQ3hCLGFBQTJCLEVBQzNCLE9BQWU7UUFIekIsWUFLRSxpQkFBTyxTQUlSO1FBUlcsZ0JBQVUsR0FBVixVQUFVLENBQVk7UUFDeEIsbUJBQWEsR0FBYixhQUFhLENBQWM7UUFDM0IsYUFBTyxHQUFQLE9BQU8sQ0FBUTtRQWxCZixjQUFRLEdBQWM7WUFDOUI7Z0JBQ0UsSUFBSSxFQUFFLElBQUk7Z0JBQ1YsS0FBSyxFQUFFO29CQUNMO3dCQUNFLEtBQUssRUFBRSxXQUFXO3dCQUNsQixJQUFJLEVBQUUsa0JBQWtCO3dCQUN4QixRQUFRLEVBQUU7NEJBQ1IsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFO3lCQUMzRTtxQkFDRjtpQkFDRjthQUNGO1NBQ0YsQ0FBQzs7WUFRSSxJQUFJLEdBQUcsbUJBQWUsS0FBSSxDQUFDLGFBQWEsQ0FB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QSxVQUFrQjtRQUFFLHdCQUFBLEVBQUEsZUFBd0I7UUFDeEQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzFDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6QyxJQUFJLElBQUk7WUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDeEMsSUFBSSxPQUFPO1lBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7SUFDM0QsQ0FBQzs7Z0JBckVGLFVBQVUsU0FBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUU7Ozs7Z0JBeEJ6QixVQUFVO2dCQWlCVixZQUFZO2dCQUVaLE1BQU07OztnQ0FwQmY7Q0ErRkMsQUF0RUQsQ0FDMkMsV0FBVyxHQXFFckQ7U0FyRVkscUJBQXFCOzs7SUFDaEMsNENBQWtDOzs7OztJQUNsQyx5Q0FhRTs7Ozs7SUFHQSwyQ0FBZ0M7Ozs7O0lBQ2hDLDhDQUFtQzs7Ozs7SUFDbkMsd0NBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7XHJcbiAgQXV0aGVudGljYXRpb25Mb2dpblJlcXVlc3QsXHJcbiAgQXV0aGVudGljYXRpb25Mb2dpblJlc3BvbnNlLFxyXG4gIFVzZXJWaWV3TW9kZWwsXHJcbiAgQXV0aGVudGljYXRpb25TZWFyY2hSZXF1ZXN0LFxyXG4gIEF1dGhlbnRpY2F0aW9uU2VhcmNoUmVzcG9uc2UsXHJcbiAgQXV0aGVudGljYXRpb25SZXRyaWV2ZVJlcXVlc3QsXHJcbiAgQXV0aGVudGljYXRpb25SZXRyaWV2ZVJlc3BvbnNlLFxyXG4gIEF1dGhlbnRpY2F0aW9uQ3JlYXRlUmVxdWVzdCxcclxuICBBdXRoZW50aWNhdGlvbkNyZWF0ZVJlc3BvbnNlLFxyXG4gIEF1dGhlbnRpY2F0aW9uVXBkYXRlUmVxdWVzdCxcclxuICBBdXRoZW50aWNhdGlvblVwZGF0ZVJlc3BvbnNlLFxyXG4gIEF1dGhlbnRpY2F0aW9uRGVsZXRlUmVxdWVzdCxcclxuICBBdXRoZW50aWNhdGlvbkRlbGV0ZVJlc3BvbnNlXHJcbn0gZnJvbSAnLi9hdXRoLm1vZGVsJztcclxuaW1wb3J0IHsgQ2FjaGVTZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL3NlcnZpY2VzL2NhY2hlLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBBdXRoQ29uc3QgfSBmcm9tICcuL2F1dGguY29uc3QnO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBNb2NrU2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9zZXJ2aWNlcy9tb2NrLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBNZW51VGFiIH0gZnJvbSAnLi4vc2hhcmVkL21vZGVscy9iYXNlLm1vZGVsJztcclxuaW1wb3J0IHsgS2V5Q29uc3QgfSBmcm9tICcuLi9zaGFyZWQvY29uc3RhbnRzL2tleS5jb25zdCc7XHJcblxyXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxyXG5leHBvcnQgY2xhc3MgQXV0aGVudGljYXRpb25TZXJ2aWNlIGV4dGVuZHMgTW9ja1NlcnZpY2Uge1xyXG4gIHB1YmxpYyBjdXJyZW50VXNlcjogVXNlclZpZXdNb2RlbDtcclxuICBwcm90ZWN0ZWQgbWVudVRhYnM6IE1lbnVUYWJbXSA9IFtcclxuICAgIHtcclxuICAgICAgcm9sZTogJ1NBJyxcclxuICAgICAgaXRlbXM6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBsYWJlbDogJ0Rhc2hib2FyZCcsXHJcbiAgICAgICAgICBpY29uOiAnZmEgZmEtcGllLWNoYXJ0ICcsXHJcbiAgICAgICAgICBjaGlsZHJlbjogW1xyXG4gICAgICAgICAgICB7IHN0YXRlOiAnZGFzaGJvYXJkJywgbmFtZTogJ0Rhc2hib2FyZCcsIHR5cGU6ICdsaW5rJywgaWNvbjogJ2ZhIGZhLXBpZScgfVxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH1cclxuICAgICAgXVxyXG4gICAgfVxyXG4gIF07XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJvdGVjdGVkIGh0dHBDbGllbnQ6IEh0dHBDbGllbnQsXHJcbiAgICBwcml2YXRlIF9jYWNoZVNlcnZpY2U6IENhY2hlU2VydmljZSxcclxuICAgIHByaXZhdGUgX3JvdXRlcjogUm91dGVyXHJcbiAgKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgdmFyIHVzZXIgPSA8VXNlclZpZXdNb2RlbD50aGlzLl9jYWNoZVNlcnZpY2UuZ2V0KEF1dGhDb25zdC5Vc2VyKTtcclxuICAgIHRoaXMuX2NhY2hlU2VydmljZS5zZXQoQXV0aENvbnN0LlVzZXIsIHVzZXIpO1xyXG4gICAgdGhpcy5jdXJyZW50VXNlciA9IHVzZXI7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2V0QXBpKHVybDogc3RyaW5nKTogdm9pZCB7XHJcbiAgICB0aGlzLl9jYWNoZVNlcnZpY2Uuc2V0KEtleUNvbnN0LkF1dGhBcGksIHVybCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0QXBpKCk6IHN0cmluZyB7XHJcbiAgICB2YXIgdXJsID0gdGhpcy5fY2FjaGVTZXJ2aWNlLmdldChLZXlDb25zdC5BdXRoQXBpKTtcclxuICAgIGlmICghdXJsKSB1cmwgPSAndjEvYXV0aGVudGljYXRpb25zJztcclxuICAgIHJldHVybiB1cmw7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2VhcmNoKHJlcXVlc3Q6IEF1dGhlbnRpY2F0aW9uU2VhcmNoUmVxdWVzdCk6IE9ic2VydmFibGU8QXV0aGVudGljYXRpb25TZWFyY2hSZXNwb25zZT4ge1xyXG4gICAgcmV0dXJuIHRoaXMudmVyaWZ5KHRoaXMuaHR0cENsaWVudC5nZXQ8QXV0aGVudGljYXRpb25TZWFyY2hSZXNwb25zZT4oYCR7dGhpcy5nZXRBcGkoKX0vc2VhcmNoYCwgeyBwYXJhbXM6IHJlcXVlc3QgYXMgYW55IH0pLCByZXF1ZXN0Lm1vY2tEYXRhKVxyXG4gIH1cclxuXHJcbiAgcHVibGljIHJldHJpZXZlKHJlcXVlc3Q6IEF1dGhlbnRpY2F0aW9uUmV0cmlldmVSZXF1ZXN0KTogT2JzZXJ2YWJsZTxBdXRoZW50aWNhdGlvblJldHJpZXZlUmVzcG9uc2U+IHtcclxuICAgIHJldHVybiB0aGlzLnZlcmlmeSh0aGlzLmh0dHBDbGllbnQuZ2V0PEF1dGhlbnRpY2F0aW9uUmV0cmlldmVSZXNwb25zZT4oYCR7dGhpcy5nZXRBcGkoKX0vJHtyZXF1ZXN0LnBheWxvYWQudXNlck5hbWV9YCksIHJlcXVlc3QubW9ja0RhdGEpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGxvZ2luKHJlcXVlc3Q6IEF1dGhlbnRpY2F0aW9uTG9naW5SZXF1ZXN0KTogT2JzZXJ2YWJsZTxBdXRoZW50aWNhdGlvbkxvZ2luUmVzcG9uc2U+IHtcclxuICAgIGlmIChyZXF1ZXN0Lm1vY2tEYXRhICYmICFyZXF1ZXN0Lm1vY2tEYXRhLm1lbnVUYWJzIHx8ICg8YW55W10+cmVxdWVzdC5tb2NrRGF0YS5tZW51VGFicykubGVuZ3RoID09IDApIHJlcXVlc3QubW9ja0RhdGEubWVudVRhYnMgPSB0aGlzLm1lbnVUYWJzO1xyXG4gICAgcmV0dXJuIHRoaXMudmVyaWZ5KHRoaXMuaHR0cENsaWVudC5wb3N0PEF1dGhlbnRpY2F0aW9uTG9naW5SZXNwb25zZT4oYCR7dGhpcy5nZXRBcGkoKX0vbG9naW5gLCByZXF1ZXN0KSwgcmVxdWVzdC5tb2NrRGF0YSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgY3JlYXRlKHJlcXVlc3Q6IEF1dGhlbnRpY2F0aW9uQ3JlYXRlUmVxdWVzdCk6IE9ic2VydmFibGU8QXV0aGVudGljYXRpb25DcmVhdGVSZXNwb25zZT4ge1xyXG4gICAgcmV0dXJuIHRoaXMudmVyaWZ5KHRoaXMuaHR0cENsaWVudC5wb3N0PEF1dGhlbnRpY2F0aW9uQ3JlYXRlUmVzcG9uc2U+KGAke3RoaXMuZ2V0QXBpKCl9L2AsIHJlcXVlc3QpLCByZXF1ZXN0Lm1vY2tEYXRhKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyB1cGRhdGUocmVxdWVzdDogQXV0aGVudGljYXRpb25VcGRhdGVSZXF1ZXN0KTogT2JzZXJ2YWJsZTxBdXRoZW50aWNhdGlvblVwZGF0ZVJlc3BvbnNlPiB7XHJcbiAgICByZXR1cm4gdGhpcy52ZXJpZnkodGhpcy5odHRwQ2xpZW50LnB1dDxBdXRoZW50aWNhdGlvblVwZGF0ZVJlc3BvbnNlPihgJHt0aGlzLmdldEFwaSgpfS9gLCByZXF1ZXN0KSwgcmVxdWVzdC5tb2NrRGF0YSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZGVsZXRlKHJlcXVlc3Q6IEF1dGhlbnRpY2F0aW9uRGVsZXRlUmVxdWVzdCk6IE9ic2VydmFibGU8QXV0aGVudGljYXRpb25EZWxldGVSZXNwb25zZT4ge1xyXG4gICAgcmV0dXJuIHRoaXMudmVyaWZ5KHRoaXMuaHR0cENsaWVudC5kZWxldGU8QXV0aGVudGljYXRpb25EZWxldGVSZXNwb25zZT4oYCR7dGhpcy5nZXRBcGkoKX0/aWRzPSR7cmVxdWVzdC5pZHN9YCksIHJlcXVlc3QubW9ja0RhdGEpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGxvZ291dChwYXRoOiBzdHJpbmcgPSAnLycsIHJlZnJlc2g6IGJvb2xlYW4gPSBmYWxzZSk6IHZvaWQge1xyXG4gICAgdGhpcy5fY2FjaGVTZXJ2aWNlLnJlbW92ZShBdXRoQ29uc3QuVXNlcik7XHJcbiAgICB0aGlzLl9jYWNoZVNlcnZpY2UucmVtb3ZlKEtleUNvbnN0Lk1lbnUpO1xyXG4gICAgaWYgKHBhdGgpIHRoaXMuX3JvdXRlci5uYXZpZ2F0ZShbcGF0aF0pO1xyXG4gICAgaWYgKHJlZnJlc2gpIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XHJcbiAgfVxyXG59Il19