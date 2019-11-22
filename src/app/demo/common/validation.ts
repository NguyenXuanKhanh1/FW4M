import { Observable, of } from "rxjs";
import { ValidationRuleResponse } from "ngx-fw4c";

export class Validation {
	public validateString(string: string): Observable<ValidationRuleResponse> {
		let regex = /[<>:"\/\\|?*\.\s)]/;
		return of(new ValidationRuleResponse({
			status: !regex.test(string),
			message: "Can't contain any of the following characters: \\ / : * ? \" < > |"
		}));
	}
}
