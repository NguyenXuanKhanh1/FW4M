import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { SystemConstant } from '../../common/system-constant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddConsumerService {
  
  constructor(private http: HttpClient,
    private _system: SystemConstant) { }

  public postData(body: any): Observable<any> {
    return this.http.post(this._system.apiURL + this._system.consumers, body, this._system.header);
  }
}
