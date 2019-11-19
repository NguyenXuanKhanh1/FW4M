/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
export class AuthenticationService extends MockService {
    /**
     * @param {?} httpClient
     * @param {?} _cacheService
     * @param {?} _router
     */
    constructor(httpClient, _cacheService, _router) {
        super();
        this.httpClient = httpClient;
        this._cacheService = _cacheService;
        this._router = _router;
        this.api = 'v1/authentications/search';
        /** @type {?} */
        var user = (/** @type {?} */ (this._cacheService.get(AuthConst.User)));
        this._cacheService.set(AuthConst.User, user);
        this.currentUser = user;
    }
    /**
     * @param {?} request
     * @return {?}
     */
    search(request) {
        return this.verify(this.httpClient.get(`${this.api}/search`, { params: (/** @type {?} */ (request)) }), request.mockData);
    }
    /**
     * @param {?} request
     * @return {?}
     */
    retrieve(request) {
        return this.verify(this.httpClient.get(`${this.api}/${request.payload.userName}`), request.mockData);
    }
    /**
     * @param {?} request
     * @return {?}
     */
    login(request) {
        return this.verify(this.httpClient.post(`${this.api}/login`, request), request.mockData);
    }
    /**
     * @param {?} request
     * @return {?}
     */
    create(request) {
        return this.verify(this.httpClient.post(`${this.api}/`, request), request.mockData);
    }
    /**
     * @param {?} request
     * @return {?}
     */
    update(request) {
        return this.verify(this.httpClient.put(`${this.api}/`, request), request.mockData);
    }
    /**
     * @param {?} request
     * @return {?}
     */
    delete(request) {
        return this.verify(this.httpClient.delete(`${this.api}?ids=${request.ids}`), request.mockData);
    }
    /**
     * @param {?=} path
     * @param {?=} refresh
     * @return {?}
     */
    logout(path = '/', refresh = false) {
        this._cacheService.remove(AuthConst.User);
        if (path)
            this._router.navigate([path]);
        if (refresh)
            window.location.href = window.location.href;
    }
}
AuthenticationService.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */
AuthenticationService.ctorParameters = () => [
    { type: HttpClient },
    { type: CacheService },
    { type: Router }
];
/** @nocollapse */ AuthenticationService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function AuthenticationService_Factory() { return new AuthenticationService(i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject(i2.CacheService), i0.ɵɵinject(i3.Router)); }, token: AuthenticationService, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWZ3NGMvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9hdXRoL2F1dGguc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFpQmxELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNoRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0saUNBQWlDLENBQUM7Ozs7O0FBRzlELE1BQU0sT0FBTyxxQkFBc0IsU0FBUSxXQUFXOzs7Ozs7SUFJcEQsWUFDWSxVQUFzQixFQUN4QixhQUEyQixFQUMzQixPQUFlO1FBRXZCLEtBQUssRUFBRSxDQUFDO1FBSkUsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN4QixrQkFBYSxHQUFiLGFBQWEsQ0FBYztRQUMzQixZQUFPLEdBQVAsT0FBTyxDQUFRO1FBTGxCLFFBQUcsR0FBVywyQkFBMkIsQ0FBQzs7WUFRM0MsSUFBSSxHQUFHLG1CQUFlLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBQTtRQUNoRSxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO0lBQzFCLENBQUM7Ozs7O0lBRU0sTUFBTSxDQUFDLE9BQW9DO1FBQ2hELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBK0IsR0FBRyxJQUFJLENBQUMsR0FBRyxTQUFTLEVBQUUsRUFBRSxNQUFNLEVBQUUsbUJBQUEsT0FBTyxFQUFPLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUMzSSxDQUFDOzs7OztJQUVNLFFBQVEsQ0FBQyxPQUFzQztRQUNwRCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQWlDLEdBQUcsSUFBSSxDQUFDLEdBQUcsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3ZJLENBQUM7Ozs7O0lBRU0sS0FBSyxDQUFDLE9BQW1DO1FBQzlDLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBOEIsR0FBRyxJQUFJLENBQUMsR0FBRyxRQUFRLEVBQUUsT0FBTyxDQUFDLEVBQUUsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3hILENBQUM7Ozs7O0lBRU0sTUFBTSxDQUFDLE9BQW9DO1FBQ2hELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBK0IsR0FBRyxJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsT0FBTyxDQUFDLEVBQUUsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3BILENBQUM7Ozs7O0lBRU0sTUFBTSxDQUFDLE9BQW9DO1FBQ2hELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBK0IsR0FBRyxJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsT0FBTyxDQUFDLEVBQUUsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ25ILENBQUM7Ozs7O0lBRU0sTUFBTSxDQUFDLE9BQW9DO1FBQ2hELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBK0IsR0FBRyxJQUFJLENBQUMsR0FBRyxRQUFRLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMvSCxDQUFDOzs7Ozs7SUFFTSxNQUFNLENBQUMsT0FBZSxHQUFHLEVBQUUsVUFBbUIsS0FBSztRQUN4RCxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDMUMsSUFBSSxJQUFJO1lBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3hDLElBQUksT0FBTztZQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO0lBQzNELENBQUM7OztZQTVDRixVQUFVLFNBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFOzs7O1lBdEJ6QixVQUFVO1lBaUJWLFlBQVk7WUFFWixNQUFNOzs7OztJQUtiLDRDQUFrQzs7SUFDbEMsb0NBQWlEOzs7OztJQUcvQywyQ0FBZ0M7Ozs7O0lBQ2hDLDhDQUFtQzs7Ozs7SUFDbkMsd0NBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7XHJcbiAgQXV0aGVudGljYXRpb25Mb2dpblJlcXVlc3QsXHJcbiAgQXV0aGVudGljYXRpb25Mb2dpblJlc3BvbnNlLFxyXG4gIFVzZXJWaWV3TW9kZWwsXHJcbiAgQXV0aGVudGljYXRpb25TZWFyY2hSZXF1ZXN0LFxyXG4gIEF1dGhlbnRpY2F0aW9uU2VhcmNoUmVzcG9uc2UsXHJcbiAgQXV0aGVudGljYXRpb25SZXRyaWV2ZVJlcXVlc3QsXHJcbiAgQXV0aGVudGljYXRpb25SZXRyaWV2ZVJlc3BvbnNlLFxyXG4gIEF1dGhlbnRpY2F0aW9uQ3JlYXRlUmVxdWVzdCxcclxuICBBdXRoZW50aWNhdGlvbkNyZWF0ZVJlc3BvbnNlLFxyXG4gIEF1dGhlbnRpY2F0aW9uVXBkYXRlUmVxdWVzdCxcclxuICBBdXRoZW50aWNhdGlvblVwZGF0ZVJlc3BvbnNlLFxyXG4gIEF1dGhlbnRpY2F0aW9uRGVsZXRlUmVxdWVzdCxcclxuICBBdXRoZW50aWNhdGlvbkRlbGV0ZVJlc3BvbnNlXHJcbn0gZnJvbSAnLi9hdXRoLm1vZGVsJztcclxuaW1wb3J0IHsgQ2FjaGVTZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL3NlcnZpY2VzL2NhY2hlLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBBdXRoQ29uc3QgfSBmcm9tICcuL2F1dGguY29uc3QnO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBNb2NrU2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9zZXJ2aWNlcy9tb2NrLnNlcnZpY2UnO1xyXG5cclxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcclxuZXhwb3J0IGNsYXNzIEF1dGhlbnRpY2F0aW9uU2VydmljZSBleHRlbmRzIE1vY2tTZXJ2aWNlIHtcclxuICBwdWJsaWMgY3VycmVudFVzZXI6IFVzZXJWaWV3TW9kZWw7XHJcbiAgcHVibGljIGFwaTogc3RyaW5nID0gJ3YxL2F1dGhlbnRpY2F0aW9ucy9zZWFyY2gnO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByb3RlY3RlZCBodHRwQ2xpZW50OiBIdHRwQ2xpZW50LFxyXG4gICAgcHJpdmF0ZSBfY2FjaGVTZXJ2aWNlOiBDYWNoZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIF9yb3V0ZXI6IFJvdXRlclxyXG4gICkge1xyXG4gICAgc3VwZXIoKTtcclxuICAgIHZhciB1c2VyID0gPFVzZXJWaWV3TW9kZWw+dGhpcy5fY2FjaGVTZXJ2aWNlLmdldChBdXRoQ29uc3QuVXNlcik7XHJcbiAgICB0aGlzLl9jYWNoZVNlcnZpY2Uuc2V0KEF1dGhDb25zdC5Vc2VyLCB1c2VyKTtcclxuICAgIHRoaXMuY3VycmVudFVzZXIgPSB1c2VyO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNlYXJjaChyZXF1ZXN0OiBBdXRoZW50aWNhdGlvblNlYXJjaFJlcXVlc3QpOiBPYnNlcnZhYmxlPEF1dGhlbnRpY2F0aW9uU2VhcmNoUmVzcG9uc2U+IHtcclxuICAgIHJldHVybiB0aGlzLnZlcmlmeSh0aGlzLmh0dHBDbGllbnQuZ2V0PEF1dGhlbnRpY2F0aW9uU2VhcmNoUmVzcG9uc2U+KGAke3RoaXMuYXBpfS9zZWFyY2hgLCB7IHBhcmFtczogcmVxdWVzdCBhcyBhbnkgfSksIHJlcXVlc3QubW9ja0RhdGEpXHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmV0cmlldmUocmVxdWVzdDogQXV0aGVudGljYXRpb25SZXRyaWV2ZVJlcXVlc3QpOiBPYnNlcnZhYmxlPEF1dGhlbnRpY2F0aW9uUmV0cmlldmVSZXNwb25zZT4ge1xyXG4gICAgcmV0dXJuIHRoaXMudmVyaWZ5KHRoaXMuaHR0cENsaWVudC5nZXQ8QXV0aGVudGljYXRpb25SZXRyaWV2ZVJlc3BvbnNlPihgJHt0aGlzLmFwaX0vJHtyZXF1ZXN0LnBheWxvYWQudXNlck5hbWV9YCksIHJlcXVlc3QubW9ja0RhdGEpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGxvZ2luKHJlcXVlc3Q6IEF1dGhlbnRpY2F0aW9uTG9naW5SZXF1ZXN0KTogT2JzZXJ2YWJsZTxBdXRoZW50aWNhdGlvbkxvZ2luUmVzcG9uc2U+IHtcclxuICAgIHJldHVybiB0aGlzLnZlcmlmeSh0aGlzLmh0dHBDbGllbnQucG9zdDxBdXRoZW50aWNhdGlvbkxvZ2luUmVzcG9uc2U+KGAke3RoaXMuYXBpfS9sb2dpbmAsIHJlcXVlc3QpLCByZXF1ZXN0Lm1vY2tEYXRhKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBjcmVhdGUocmVxdWVzdDogQXV0aGVudGljYXRpb25DcmVhdGVSZXF1ZXN0KTogT2JzZXJ2YWJsZTxBdXRoZW50aWNhdGlvbkNyZWF0ZVJlc3BvbnNlPiB7XHJcbiAgICByZXR1cm4gdGhpcy52ZXJpZnkodGhpcy5odHRwQ2xpZW50LnBvc3Q8QXV0aGVudGljYXRpb25DcmVhdGVSZXNwb25zZT4oYCR7dGhpcy5hcGl9L2AsIHJlcXVlc3QpLCByZXF1ZXN0Lm1vY2tEYXRhKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyB1cGRhdGUocmVxdWVzdDogQXV0aGVudGljYXRpb25VcGRhdGVSZXF1ZXN0KTogT2JzZXJ2YWJsZTxBdXRoZW50aWNhdGlvblVwZGF0ZVJlc3BvbnNlPiB7XHJcbiAgICByZXR1cm4gdGhpcy52ZXJpZnkodGhpcy5odHRwQ2xpZW50LnB1dDxBdXRoZW50aWNhdGlvblVwZGF0ZVJlc3BvbnNlPihgJHt0aGlzLmFwaX0vYCwgcmVxdWVzdCksIHJlcXVlc3QubW9ja0RhdGEpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGRlbGV0ZShyZXF1ZXN0OiBBdXRoZW50aWNhdGlvbkRlbGV0ZVJlcXVlc3QpOiBPYnNlcnZhYmxlPEF1dGhlbnRpY2F0aW9uRGVsZXRlUmVzcG9uc2U+IHtcclxuICAgIHJldHVybiB0aGlzLnZlcmlmeSh0aGlzLmh0dHBDbGllbnQuZGVsZXRlPEF1dGhlbnRpY2F0aW9uRGVsZXRlUmVzcG9uc2U+KGAke3RoaXMuYXBpfT9pZHM9JHtyZXF1ZXN0Lmlkc31gKSwgcmVxdWVzdC5tb2NrRGF0YSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbG9nb3V0KHBhdGg6IHN0cmluZyA9ICcvJywgcmVmcmVzaDogYm9vbGVhbiA9IGZhbHNlKTogdm9pZCB7XHJcbiAgICB0aGlzLl9jYWNoZVNlcnZpY2UucmVtb3ZlKEF1dGhDb25zdC5Vc2VyKTtcclxuICAgIGlmIChwYXRoKSB0aGlzLl9yb3V0ZXIubmF2aWdhdGUoW3BhdGhdKTtcclxuICAgIGlmIChyZWZyZXNoKSB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xyXG4gIH1cclxufSJdfQ==