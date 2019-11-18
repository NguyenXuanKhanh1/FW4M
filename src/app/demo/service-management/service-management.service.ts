import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceManagementService {

  public totalRecords: number = 0;
  public items = [];
  public apiUrl = 'http://192.168.66.49:8001/services'
  constructor(private http: HttpClient) {

  }

  public reload = false;
  public getData() {
    this.http.get(this.apiUrl).subscribe((res: any)=> {
      this.totalRecords = res.data.length;
      this.items = res.data;
    })
    return of({
      "status": true,
      "totalRecords": this.totalRecords,
      "items": this.items
    })
    // return this.http.get(this.apiUrl);
  }

  public deleteData(item) {
    return this.http.delete(this.apiUrl + '/' + item).subscribe();
  }
}
