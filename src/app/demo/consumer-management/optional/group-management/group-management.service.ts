import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GroupResponse, GroupDeleteRequest, GroupDeleteResponse, GroupSearchRequest, GroupRequest } from '../../consumer.model';
import { map } from 'rxjs/operators';

const header = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
	providedIn: 'root'
})
export class GroupManagementService {
	protected api: string = 'http://13.251.173.60:8001/consumers';
	// protected api: string = 'http://192.168.110.61:8001/consumers';

	constructor(private http: HttpClient) { }

	public search(consumerId: string, request: GroupSearchRequest): Observable<any> {
		return this.http.get<any>(`${this.api}/${consumerId}/acls`).pipe(map(s => {
			var response = {
				status: true,
				totalRecords: s.data.length,
				items: s.data
			};
			return response;
		}));
	}

	public createGroup(consumerId: string, body: any, request: GroupRequest): Observable<GroupResponse> {
		return this.http.post<any>(`${this.api}/${consumerId}/acls`, body, header);
	}

	public deleteGroup(consumerId: string, id: string, request: GroupDeleteRequest): Observable<GroupDeleteResponse> {
		return this.http.delete(`${this.api}/${consumerId}/acls/${id}`);
	}
}
