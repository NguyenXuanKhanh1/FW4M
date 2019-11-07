import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DashboardDemoService {

  constructor(private http: HttpClient) { }

  apiUrl = "http://localhost:3000/champion";
  items = [];
  totalRecords: number;

  getData(): Observable<any> {
    this.items = [];
    this.http.get(this.apiUrl).subscribe((res: any) => {
      this.totalRecords = res.length;
      for (let index = 0; index < res.length; index++) {
        this.items.push({
          id: res[index].id,
          name: res[index].name,
          title: res[index].title,
          image: res[index].icon,
          role1: res[index].tags[0],
          role2: res[index].tags[1],
          description: res[index].description,
          active: true,
        });
      }
    });
    console.log('aaaaaaaaaa');
    
    return of({
      success: true,
      totalRecords: this.totalRecords,
      items: this.items
    })
  }
}
