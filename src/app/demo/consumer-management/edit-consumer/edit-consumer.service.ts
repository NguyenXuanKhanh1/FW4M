import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { SystemConstant } from '../../common/system-constant';

@Injectable({
  providedIn: 'root'
})
export class EditConsumerService {

  constructor(private http: HttpClient,
    private _system: SystemConstant) { }
  
  public updateData(id: string, body: any) {
    
    //body.created_at =  (body.created_at / 1000) as number;
    //const value = ((<Date>body.created_at).getTime())/1000;
    //body.created_at =  value;
    
    return this.http.patch(this._system.apiURL + this._system.consumers + '/' + id, body, this._system.header);
  }

}
