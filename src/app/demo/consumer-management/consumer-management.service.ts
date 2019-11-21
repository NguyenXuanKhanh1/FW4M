import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { ConsumerResponse, ConsumerRequest } from "../common/consumer.model";
import { SystemConstant } from "../common/system-constant";

@Injectable({
  providedIn: "root"
})
export class ConsumerManagementService {
  constructor(private http: HttpClient, private _system: SystemConstant) {}

  public offset: string = "";
  public pageSize = 2;

  // public readData(request: ConsumerRequest): Observable<ConsumerResponse> {    
  //     return this.http.get(this._system.apiURL + this._system.consumers).pipe(
  //     map((res: any) => {
  //       for (let i = 0; i < res.data.length; i++) {
  //         res.data[i].created_at_2 = res.data[i].created_at * 1000;
  //       }         
  //       var response = {
  //         status: true,
  //         totalRecords: res.data.length,
  //         items: res.data,
  //       };
  //       return response;
  //     })
  //   )
  // }

  public readData(): Observable<ConsumerResponse> {    
    return this.http.get(this._system.apiURL + this._system.consumers).pipe(
      map((res: any) => {
        for (let i = 0; i < res.data.length; i++) {
          res.data[i].created_at_2 = res.data[i].created_at * 1000;
        }         
        var response = {
          status: true,
          totalRecords: res.data.length,
          items: res.data,
        };
        return response;
      })
    )
  }

  // public getService(request): Observable<any> {
  //   return this.http.get(this.urlGet+'?size='+request.pageSize+this.offset).pipe(map((res: any) => {
  //     // this.http.get(this.urlGet).p
  //     var response = ({
  //       status: true,
  //       totalRecords: 10,
  //       items: res.data,
  //       offset:res.offset
  //     });
  //     if(res.offset!=null){
  //       this.offset='&offset='+res.offset;
  //       console.log(this.offset);
  //     }
  //     return response;
  //   }));
  // }

  // public readData(request: ConsumerRequest): Observable<ConsumerResponse> {
    
  //     return this.http.get('http://192.168.35.108:8001/consumers?tags='+request.searchText).pipe(
  //     map((res: any) => {
  //       for (let i = 0; i < res.data.length -1; i++) {
  //         res.data[i].created_at_2 = res.data[i].created_at * 1000;
  //       }         
  //       var response = {
  //         status: true,
  //         totalRecords: res.data.length,
  //         // items: res.data.filter(event => event => request.searchText),
  //         items: res.data,
  //       };
  //       return response;
  //     })
  //   )
  // }

  public deleteData(id: string) {
    return this.http.delete(
      this._system.apiURL + this._system.consumers + "/" + id
    );
  }
}
