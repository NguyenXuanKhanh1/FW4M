import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { ConsumerResponse, ConsumerRequest } from './consumer.model';
import { Consumer } from './consumer';

@Injectable({
  providedIn: 'root'
})
export class ConsumerManagementService {

  public apiUrl = 'http://192.168.35.108:8001/consumers'
  public header = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  constructor(private http: HttpClient) { }

  public readData(request: ConsumerRequest): Observable<ConsumerResponse> {
    return this.http.get(this.apiUrl).pipe(map((res: any) => {
      for (let i = 0; i < res.data.length; i++) {
        res.data[i].created_at = res.data[i].created_at * 1000;        
      }
      var response = ({
        status: true,
        totalRecords: res.data.length,
        items: res.data
      });
      return response;
    }));
  }

  public deleteData(id: string) {
    return this.http.delete(this.apiUrl + '/' + id);
  }
}