import { Observable, of } from "rxjs";
import { ValidationRuleResponse } from "ngx-fw4c";
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: "root"
})

export class ValidateConsumer {
	public validateString(string: string): Observable<ValidationRuleResponse> {
		let regex = /[<>:"\/\\|?*\.\s)]/;
		return of(new ValidationRuleResponse({
			status: !regex.test(string),
			message: "Can't contain any of the following characters: \\ / : * ? \" < > |"
		}));
	}

	public validateTags(tags: string[]): Observable<ValidationRuleResponse> {
		let regex = /^[A-Za-z0-9\.\-\_]+$/i;
		let isFail = true;
		if (tags.length > 0) {
			for (let index = 0; index < tags.length; index++) {
				const element = tags[index];
				if (regex.test(element)) {
					continue;
				} else {
					isFail = false;
					break;
				}
			}
			return of(new ValidationRuleResponse({
				status: isFail,
				message: "Invalid value. Can only contain following characters: alphabet characters, numeric characters, ., -, _"
			}));
		}
		else {
			return of(new ValidationRuleResponse({
				status: true
			}));
		}		
	}

	public validateUnique(name: string, data): Observable<ValidationRuleResponse> {
		var item = data.find(x => x == name);
		return of(new ValidationRuleResponse({
			status: !item,
			message: 'This field must be unique'
		}));
	}
}
