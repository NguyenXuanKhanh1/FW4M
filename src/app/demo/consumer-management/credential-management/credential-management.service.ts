import { Injectable } from '@angular/core';
import { BasicAuthRequest, BasicAuthViewModel, BasicAuthResponse, BasicAuthDeleteRequest, BasicAuthDeleteResponse } from '../basic-auth.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiKeySearchRequest, ApiKeyRequest, ApiKeyResponse, ApiKeyDeleteRequest, ApiKeyDeleteResponse } from '../api-key.model';
// import { ConsumerRequest, ConsumerResponse, ConsumerDeleteRequest } from '../consumer.model';

const header = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
	providedIn: 'root'
})
export class CredentialManagementService {

	protected api: string = 'http://13.251.173.60:8001/consumers/4ce5ba52-782d-4563-8c88-11bed2184679/basic-auth';
	protected id = '4ce5ba52-782d-4563-8c88-11bed2184679';

	constructor(private _http: HttpClient) { }

	public search(request: BasicAuthRequest): Observable<any> {
		return this._http.get<any>(`${this.api}`, { params: request as any }).pipe(map(s => {
			var response = {
				status: true,
				totalRecords: s.data.length,
				items: s.data
			};
			return response;
		}));
	}

	public createBasicAuth(body: any, request: BasicAuthRequest): Observable<BasicAuthResponse> {
		return this._http.post<any>(`${this.api}`, body, header);
	}

	public updateBasicAuth(id: string, body: any, request: BasicAuthRequest): Observable<BasicAuthResponse> {
		return this._http.patch<any>(`${this.api}/${id}`, body, header);
	}
	public deleteBasicAuth(id: string, request: BasicAuthDeleteRequest): Observable<BasicAuthDeleteResponse> {
		return this._http.delete(`${this.api}/${id}`);
	}

	public searchApiKey(request: ApiKeySearchRequest): Observable<any> {
		return this._http.get<any>(`${this.api}`, { params: request as any }).pipe(map(s => {
			var response = {
				status: true,
				totalRecords: s.data.length,
				items: s.data
			};
			return response;
		}));
	}

	public createApiKey(body: any, request: ApiKeyRequest): Observable<ApiKeyResponse> {
		return this._http.post<any>(`${this.api}`, body, header);
	}

	public updateApiKey(id: string, body: any, request: ApiKeyRequest): Observable<ApiKeyResponse> {
		return this._http.patch<any>(`${this.api}/${id}`, body, header);
	}
	public deleteApiKey(id: string, request: ApiKeyDeleteRequest): Observable<ApiKeyDeleteResponse> {
		return this._http.delete(`${this.api}/${id}`);
	}
}
