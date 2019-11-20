import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { SystemConstant } from '../../common/system-constant';

@Injectable({
  providedIn: 'root'
})
export class AddConsumerService {
  
  constructor(private http: HttpClient,
    private _system: SystemConstant) { }

  public postData(body: any){
    body.created_at =  (body.created_at / 1000) as number;
    return this.http.post(this._system.apiURL + this._system.consumers, body, this._system.header);
  }
}
