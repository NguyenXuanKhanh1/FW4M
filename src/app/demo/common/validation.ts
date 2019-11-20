import { Observable, of } from "rxjs";
import { ValidationRuleResponse } from "ngx-fw4c";

export class Validation {
  public validateString(string: string): Observable<ValidationRuleResponse> {
    let regex = /[A-Za-z0-9]/;
    return of(
      new ValidationRuleResponse({
        status: regex.test(string) && string !== "",
        message: "Please input right format"
      })
    );
  }
}
