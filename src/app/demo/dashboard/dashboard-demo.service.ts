import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DashboardDemoService {

  constructor(private http: HttpClient) { }

  apiUrl = "";
  totalRecords: number;

  getData(request): Observable<any> {
    return this.http.get(this.apiUrl, {params: request as any});
  }

}
