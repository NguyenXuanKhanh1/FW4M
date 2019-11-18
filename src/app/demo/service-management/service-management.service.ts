import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ServiceRequest, ServiceResponse } from './service.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceManagementService {

  public totalRecords: number = 0;
  public items = [];
  public apiUrl = 'http://192.168.110.112:8001/services'
  constructor(private http: HttpClient) {

  }

  public getData(request: ServiceRequest): Observable<ServiceResponse> {
    // this.http.get(this.apiUrl).subscribe((res: any)=> {
    //   this.totalRecords = res.data.length;
    //   this.items = res.data;
    // })
    // return of({
    //   "status": true,
    //   "totalRecords": this.totalRecords,
    //   "items": this.items
    // })
    return this.http.get(this.apiUrl).pipe(map((res: any) => {
      var response = ({
        status: true,
        totalRecords: res.data.length,
        items: res.data
      });
      return response;
    }));
  }

  public deleteData(id) {
    return this.http.delete(this.apiUrl + '/' + id).subscribe();
  }
}
