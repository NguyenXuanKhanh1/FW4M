import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BasicAuthSearchRequest, BasicAuthRequest, BasicAuthResponse, BasicAuthDeleteRequest, BasicAuthDeleteResponse } from '../basicAuth-management/basicAuth.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const header = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class ApiKeyManagementService {

  protected api: string = 'http://13.251.173.60:8001/consumers';

	constructor(private _http: HttpClient) { }

	public search(consumerId: string, request: BasicAuthSearchRequest): Observable<any> {
		return this._http.get<any>(`${this.api}/${consumerId}/key-auth`, { params: request as any }).pipe(map(s => {
			var response = {
				status: true,
				totalRecords: s.data.length,
				items: s.data
			};
			return response;
		}));
	}

	public createApiKey(consumerId: string, body: any, request: BasicAuthRequest): Observable<BasicAuthResponse> {
		return this._http.post<any>(`${this.api}/${consumerId}/key-auth`, body, header);
	}

	public updateApiKey(consumerId: string , id: string, body: any, request: BasicAuthRequest): Observable<BasicAuthResponse> {
		return this._http.patch<any>(`${this.api}/${consumerId}/key-auth/${id}`, body, header);
  }
  
	public deleteApiKey(consumerId: string, id: string, request: BasicAuthDeleteRequest): Observable<BasicAuthDeleteResponse> {
		return this._http.delete(`${this.api}/${consumerId}//${id}`);
	}
}
