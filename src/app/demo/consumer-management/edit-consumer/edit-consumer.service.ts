import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { SystemConstant } from '../../common/system-constant';

@Injectable({
  providedIn: 'root'
})
export class EditConsumerService {

  constructor(private http: HttpClient,
    private _system: SystemConstant) { }
  
  public updateConsumer(id: string, body: any) {    
    return this.http.patch(this._system.apiURL + this._system.consumers + '/' + id, body, this._system.header);
  }

}
