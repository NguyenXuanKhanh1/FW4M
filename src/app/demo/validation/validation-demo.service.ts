import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { ValidationRuleResponse } from 'ngx-fw4c';

@Injectable({
  providedIn: "root"
})
export class ValidationDemoService {
  constructor(private http: HttpClient) {}
  apiUrl = "http://www.mocky.io/v2/5dc5338c32000082007697ce";

  getData(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
    // return of(
    //   new ValidationRuleResponse({
    //     status: re.test(String(email).toLowerCase())
    //   })
    // )
  }

}
