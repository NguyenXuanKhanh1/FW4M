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

  public readData(request: ConsumerRequest): Observable<ConsumerResponse> {
    return this.http.get(this._system.apiURL + this._system.consumers).pipe(
      map((res: any) => {
        for (let i = 0; i < res.data.length; i++) {
          var value = new Date(res.data[i].created_at * 1000);
          res.data[i].created_at = value;
        }
        var response = {
          status: true,
          totalRecords: res.data.length,
          items: res.data
        };
        return response;
      })
    );
  }

  public deleteData(id: string) {
    return this.http.delete(
      this._system.apiURL + this._system.consumers + "/" + id
    );
  }
}
