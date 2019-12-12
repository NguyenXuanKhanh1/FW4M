import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BasicAuthRequest, BasicAuthResponse, BasicAuthDeleteRequest, BasicAuthDeleteResponse, BasicAuthSearchRequest } from './basicAuth.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const header = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class BasicAuthManagementService {

  protected api: string = 'http://13.251.173.60:8001/consumers';

	constructor(private _http: HttpClient) { }

	public search(customId: string, request: BasicAuthSearchRequest): Observable<any> {
		return this._http.get<any>(`${this.api}/${customId}/basic-auth`, { params: request as any }).pipe(map(s => {
			var response = {
				status: true,
				totalRecords: s.data.length,
				items: s.data
			};
			return response;
		}));
	}

	public createBasicAuth(customId: string, body: any, request: BasicAuthRequest): Observable<BasicAuthResponse> {
		return this._http.post<any>(`${this.api}/${customId}/basic-auth`, body, header);
	}

	public updateBasicAuth(customId: string , id: string, body: any, request: BasicAuthRequest): Observable<BasicAuthResponse> {
		return this._http.patch<any>(`${this.api}/${customId}/basic-auth/${id}`, body, header);
  }
  
	public deleteBasicAuth(customId: string, id: string, request: BasicAuthDeleteRequest): Observable<BasicAuthDeleteResponse> {
		return this._http.delete(`${this.api}/${customId}/basic-auth/${id}`);
	}
}
