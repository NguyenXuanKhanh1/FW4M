import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { ConsumerRequest, ConsumerSearchRequest, ConsumerDeleteRequest, ConsumerDeleteResponse } from './consumer.model';
import { ConsumerResponse } from './consumer.model';
import { SystemConstant } from '../common/system-constant';

const header = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
	providedIn: "root"
})

export class ConsumerManagementService {
	protected api: string = 'http://13.251.173.60:8001/consumers';
	// protected api: string = 'http://192.168.110.61:8001/consumers';

	constructor(private http: HttpClient, private _system: SystemConstant) { }
	
	public search(request: ConsumerSearchRequest): Observable<any> {
		return this.http.get<any>(`${this.api}`, { params: request as any }).pipe(map(s => {
			var response = {
				status: true,
				totalRecords: s.data.length,
				items: s.data
			};
			return response;
		}));
	}

	public createConsumer(body: any, request: ConsumerRequest): Observable<ConsumerResponse> {
		return this.http.post<any>(`${this.api}`, body, header);
	}

	public updateConsumer(id: string, body: any, request: ConsumerRequest): Observable<ConsumerResponse> {
		return this.http.patch<any>(`${this.api}/${id}`, body, header);
	}
	public deleteConsumer(id: string, request: ConsumerDeleteRequest): Observable<ConsumerDeleteResponse> {
		return this.http.delete(`${this.api}/${id}`);
	}
}