/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
export function IValidation() { }
if (false) {
    /**
     * @return {?}
     */
    IValidation.prototype.callback = function () { };
    /**
     * @return {?}
     */
    IValidation.prototype.getErrors = function () { };
}
export class SummaryError {
    /**
     * @param {?=} init
     */
    constructor(init) {
        Object.assign(this, init);
    }
}
if (false) {
    /** @type {?} */
    SummaryError.prototype.element;
    /** @type {?} */
    SummaryError.prototype.messages;
}
export class ValidationRuleResponse {
    /**
     * @param {?=} init
     */
    constructor(init) {
        Object.assign(this, init);
    }
}
if (false) {
    /** @type {?} */
    ValidationRuleResponse.prototype.status;
    /** @type {?} */
    ValidationRuleResponse.prototype.message;
}
/**
 * @abstract
 */
export class ValidationRule {
    /**
     * @param {?=} overridenErrorMessage
     */
    constructor(overridenErrorMessage) {
        this.errorMessage = overridenErrorMessage;
    }
}
if (false) {
    /** @type {?} */
    ValidationRule.prototype.key;
    /** @type {?} */
    ValidationRule.prototype.execute;
    /** @type {?} */
    ValidationRule.prototype.errorMessage;
    /** @type {?} */
    ValidationRule.prototype.id;
    /** @type {?} */
    ValidationRule.prototype.isValid;
    /** @type {?} */
    ValidationRule.prototype.required;
}
export class RequiredValidationRule extends ValidationRule {
    /**
     * @param {?=} overridenErrorMessage
     */
    constructor(overridenErrorMessage) {
        super(overridenErrorMessage);
        this.key = ValidationConstant.Required;
    }
}
export class EmailValidationRule extends ValidationRule {
    /**
     * @param {?=} overridenErrorMessage
     */
    constructor(overridenErrorMessage) {
        super(overridenErrorMessage);
        this.key = ValidationConstant.Email;
    }
}
export class PhoneValidationRule extends ValidationRule {
    /**
     * @param {?=} overridenErrorMessage
     */
    constructor(overridenErrorMessage) {
        super(overridenErrorMessage);
        this.key = ValidationConstant.Phone;
    }
}
export class CustomValidationRule extends ValidationRule {
    /**
     * @param {?} execute
     * @param {?=} required
     * @param {?=} overridenErrorMessage
     * @param {?=} isValid
     */
    constructor(execute, required, overridenErrorMessage, isValid) {
        super(overridenErrorMessage);
        this.execute = execute;
        this.key = ValidationConstant.Custom;
        this.isValid = isValid;
        this.required = required;
    }
}
export class ValidationOption {
    /**
     * @param {?=} init
     */
    constructor(init) {
        this.rules = [];
        this.dirtyCheck = true;
        this.errorMessageClass = ValidationConstant.ErrorMessageClass;
        this.errorElementClass = ValidationConstant.ErrorElementClass;
        this.successElementClass = ValidationConstant.SuccessElementClass;
        Object.assign(this, init);
    }
}
if (false) {
    /** @type {?} */
    ValidationOption.prototype.validationName;
    /** @type {?} */
    ValidationOption.prototype.rules;
    /** @type {?} */
    ValidationOption.prototype.valueResolver;
    /** @type {?} */
    ValidationOption.prototype.itemRef;
    /** @type {?} */
    ValidationOption.prototype.displayText;
    /** @type {?} */
    ValidationOption.prototype.validationId;
    /** @type {?} */
    ValidationOption.prototype.payloadRef;
    /** @type {?} */
    ValidationOption.prototype.relevantFields;
    /** @type {?} */
    ValidationOption.prototype.dynamic;
    /** @type {?} */
    ValidationOption.prototype.dirtyCheck;
    /** @type {?} */
    ValidationOption.prototype.scope;
    /** @type {?} */
    ValidationOption.prototype.errorTargetId;
    /** @type {?} */
    ValidationOption.prototype.errorMessageClass;
    /** @type {?} */
    ValidationOption.prototype.errorElementClass;
    /** @type {?} */
    ValidationOption.prototype.successElementClass;
}
export class ClientValidator {
    /**
     * @param {?=} init
     */
    constructor(init) {
        this.options = [];
        this.relatedValidationProviders = [];
        this.requiredMessage = ValidationConstant.requiredMessage;
        this.invalidMessage = ValidationConstant.invalidMessage;
        Object.assign(this, init);
    }
}
if (false) {
    /** @type {?} */
    ClientValidator.prototype.formRef;
    /** @type {?} */
    ClientValidator.prototype.options;
    /** @type {?} */
    ClientValidator.prototype.payloadRef;
    /** @type {?} */
    ClientValidator.prototype.scope;
    /** @type {?} */
    ClientValidator.prototype.relatedValidationProviders;
    /** @type {?} */
    ClientValidator.prototype.requiredMessage;
    /** @type {?} */
    ClientValidator.prototype.invalidMessage;
}
export class ChangedItem {
    /**
     * @param {?=} init
     */
    constructor(init) {
        this.change = false;
        Object.assign(this, init);
    }
}
if (false) {
    /** @type {?} */
    ChangedItem.prototype.id;
    /** @type {?} */
    ChangedItem.prototype.oldValue;
    /** @type {?} */
    ChangedItem.prototype.value;
    /** @type {?} */
    ChangedItem.prototype.field;
    /** @type {?} */
    ChangedItem.prototype.change;
}
export class ValidationConstant {
}
ValidationConstant.Required = 'Required';
ValidationConstant.Email = 'Email';
ValidationConstant.Phone = 'Phone';
ValidationConstant.Custom = 'Custom';
ValidationConstant.ErrorMessage = 'Không hợp lệ vui lòng thử lại.';
ValidationConstant.ErrorElementClass = 'ng-invalid';
ValidationConstant.SuccessElementClass = 'ng-valid';
ValidationConstant.ErrorMessageClass = 'text-danger';
ValidationConstant.DefaultErrorStyles = 'padding:0;list-style:none;font-weight:400;font-size:13px; width: 100%';
ValidationConstant.DefaultErrorClass = 'validation-error';
ValidationConstant.AttributeName = 'validation-name';
ValidationConstant.AttributeOptionName = 'dynamic-option';
ValidationConstant.AttributeDynamicName = 'dynamic-validation';
ValidationConstant.ErrorTargetId = 'error-target-id';
ValidationConstant.DynamicErrorAttribute = 'dynamic-error-attribute';
ValidationConstant.ERROR_ELEMENT_ID = 'error-element-id';
ValidationConstant.ERROR_ITEM_ELEMENT_ID = 'error-item-element-id';
ValidationConstant.VALIDATION_ID = 'validation-id';
ValidationConstant.ARRAY_SEQUENCE_ID = 'array-sequence-id';
ValidationConstant.requiredMessage = 'là bắt buộc';
ValidationConstant.invalidMessage = 'không hợp lệ';
if (false) {
    /** @type {?} */
    ValidationConstant.Required;
    /** @type {?} */
    ValidationConstant.Email;
    /** @type {?} */
    ValidationConstant.Phone;
    /** @type {?} */
    ValidationConstant.Custom;
    /** @type {?} */
    ValidationConstant.ErrorMessage;
    /** @type {?} */
    ValidationConstant.ErrorElementClass;
    /** @type {?} */
    ValidationConstant.SuccessElementClass;
    /** @type {?} */
    ValidationConstant.ErrorMessageClass;
    /** @type {?} */
    ValidationConstant.DefaultErrorStyles;
    /** @type {?} */
    ValidationConstant.DefaultErrorClass;
    /** @type {?} */
    ValidationConstant.AttributeName;
    /** @type {?} */
    ValidationConstant.AttributeOptionName;
    /** @type {?} */
    ValidationConstant.AttributeDynamicName;
    /** @type {?} */
    ValidationConstant.ErrorTargetId;
    /** @type {?} */
    ValidationConstant.DynamicErrorAttribute;
    /** @type {?} */
    ValidationConstant.ERROR_ELEMENT_ID;
    /** @type {?} */
    ValidationConstant.ERROR_ITEM_ELEMENT_ID;
    /** @type {?} */
    ValidationConstant.VALIDATION_ID;
    /** @type {?} */
    ValidationConstant.ARRAY_SEQUENCE_ID;
    /** @type {?} */
    ValidationConstant.requiredMessage;
    /** @type {?} */
    ValidationConstant.invalidMessage;
}
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGlvbi5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1mdzRjLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvc2hhcmVkL3ZhbGlkYXRpb24vdmFsaWRhdGlvbi5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBSUEsaUNBR0M7Ozs7O0lBRkcsaURBQTRCOzs7O0lBQzVCLGtEQUF3Qzs7QUFHNUMsTUFBTSxPQUFPLFlBQVk7Ozs7SUFHckIsWUFBWSxJQUE0QjtRQUNwQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM5QixDQUFDO0NBQ0o7OztJQUxHLCtCQUFvQjs7SUFDcEIsZ0NBQW1COztBQU12QixNQUFNLE9BQU8sc0JBQXNCOzs7O0lBRy9CLFlBQVksSUFBc0M7UUFDOUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDOUIsQ0FBQztDQUNKOzs7SUFMRyx3Q0FBaUI7O0lBQ2pCLHlDQUFpQjs7Ozs7QUFNckIsTUFBTSxPQUFnQixjQUFjOzs7O0lBT2hDLFlBQVkscUJBQW9FO1FBRTVFLElBQUksQ0FBQyxZQUFZLEdBQUcscUJBQXFCLENBQUM7SUFDOUMsQ0FBQztDQUNKOzs7SUFWRyw2QkFBWTs7SUFDWixpQ0FBK0Y7O0lBQy9GLHNDQUEyRDs7SUFDM0QsNEJBQVk7O0lBQ1osaUNBQWtCOztJQUNsQixrQ0FBbUI7O0FBT3ZCLE1BQU0sT0FBTyxzQkFBdUIsU0FBUSxjQUFjOzs7O0lBQ3RELFlBQ0kscUJBQW9FO1FBRXBFLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxHQUFHLEdBQUcsa0JBQWtCLENBQUMsUUFBUSxDQUFDO0lBQzNDLENBQUM7Q0FDSjtBQUVELE1BQU0sT0FBTyxtQkFBb0IsU0FBUSxjQUFjOzs7O0lBQ25ELFlBQVkscUJBQW9FO1FBRTVFLEtBQUssQ0FBQyxxQkFBcUIsQ0FB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LHFDQUFrQixHQUFXLHVFQUF1RSxDQUFDO0FBQ3JHLG9DQUFpQixHQUFXLGtCQUFrQixDQUFDO0FBQy9DLGdDQUFhLEdBQVcsaUJBQWlCLENBQUM7QUFDMUMsc0NBQW1CLEdBQVcsZ0JBQWdCLENBQUM7QUFDL0MsdUNBQW9CLEdBQVcsb0JBQW9CLENBQUM7QUFDcEQsZ0NBQWEsR0FBVyxpQkFBaUIsQ0FBQztBQUMxQyx3Q0FBcUIsR0FBVyx5QkFBeUIsQ0FBQztBQUMxRCxtQ0FBZ0IsR0FBRyxrQkFBa0IsQ0FBQztBQUN0Qyx3Q0FBcUIsR0FBRyx1QkFBdUIsQ0FBQztBQUNoRCxnQ0FBYSxHQUFHLGVBQWUsQ0FBQztBQUNoQyxvQ0FBaUIsR0FBRyxtQkFBbUIsQ0FBQztBQUN4QyxrQ0FBZSxHQUFXLGFBQWEsQ0FBQztBQUN4QyxpQ0FBYyxHQUFXLGNBQWMsQ0FBQzs7O0lBcEJ0RCw0QkFBNEM7O0lBQzVDLHlCQUFzQzs7SUFDdEMseUJBQXNDOztJQUN0QywwQkFBd0M7O0lBQ3hDLGdDQUFzRTs7SUFDdEUscUNBQXVEOztJQUN2RCx1Q0FBdUQ7O0lBQ3ZELHFDQUF3RDs7SUFDeEQsc0NBQW1IOztJQUNuSCxxQ0FBNkQ7O0lBQzdELGlDQUF3RDs7SUFDeEQsdUNBQTZEOztJQUM3RCx3Q0FBa0U7O0lBQ2xFLGlDQUF3RDs7SUFDeEQseUNBQXdFOztJQUN4RSxvQ0FBb0Q7O0lBQ3BELHlDQUE4RDs7SUFDOUQsaUNBQThDOztJQUM5QyxxQ0FBc0Q7O0lBQ3RELG1DQUFzRDs7SUFDdEQsa0NBQXNEOztBQUN6RCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IFZhbGlkYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi92YWxpZGF0aW9uLnNlcnZpY2UnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJVmFsaWRhdGlvbiB7XHJcbiAgICBjYWxsYmFjaygpOiBPYnNlcnZhYmxlPGFueT47XHJcbiAgICBnZXRFcnJvcnMoKTogT2JzZXJ2YWJsZTxTdW1tYXJ5RXJyb3JbXT47XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBTdW1tYXJ5RXJyb3Ige1xyXG4gICAgZWxlbWVudDogRWxlbWVudFJlZjtcclxuICAgIG1lc3NhZ2VzOiBzdHJpbmdbXTtcclxuICAgIGNvbnN0cnVjdG9yKGluaXQ/OiBQYXJ0aWFsPFN1bW1hcnlFcnJvcj4pIHtcclxuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIGluaXQpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVmFsaWRhdGlvblJ1bGVSZXNwb25zZSB7XHJcbiAgICBzdGF0dXM/OiBib29sZWFuO1xyXG4gICAgbWVzc2FnZT86IHN0cmluZztcclxuICAgIGNvbnN0cnVjdG9yKGluaXQ/OiBQYXJ0aWFsPFZhbGlkYXRpb25SdWxlUmVzcG9uc2U+KSB7XHJcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCBpbml0KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFZhbGlkYXRpb25SdWxlIHtcclxuICAgIGtleTogc3RyaW5nO1xyXG4gICAgZXhlY3V0ZTogKHZhbHVlPzogYW55LCBwYXlsb2FkPzogYW55LCByb3dJbmRleD86IG51bWJlcikgPT4gT2JzZXJ2YWJsZTxWYWxpZGF0aW9uUnVsZVJlc3BvbnNlPjtcclxuICAgIGVycm9yTWVzc2FnZTogKGVsZW1lbnQ/OiBhbnksIHJvd0luZGV4Pzogc3RyaW5nKSA9PiBzdHJpbmc7XHJcbiAgICBpZD86IHN0cmluZztcclxuICAgIGlzVmFsaWQ/OiBib29sZWFuO1xyXG4gICAgcmVxdWlyZWQ/OiBib29sZWFuO1xyXG4gICAgY29uc3RydWN0b3Iob3ZlcnJpZGVuRXJyb3JNZXNzYWdlPzogKGVsZW1lbnQ/OiBhbnksIHJvd0luZGV4Pzogc3RyaW5nKSA9PiBzdHJpbmdcclxuICAgICkge1xyXG4gICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlID0gb3ZlcnJpZGVuRXJyb3JNZXNzYWdlO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUmVxdWlyZWRWYWxpZGF0aW9uUnVsZSBleHRlbmRzIFZhbGlkYXRpb25SdWxlIHtcclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIG92ZXJyaWRlbkVycm9yTWVzc2FnZT86IChlbGVtZW50PzogYW55LCByb3dJbmRleD86IHN0cmluZykgPT4gc3RyaW5nXHJcbiAgICApIHtcclxuICAgICAgICBzdXBlcihvdmVycmlkZW5FcnJvck1lc3NhZ2UpO1xyXG4gICAgICAgIHRoaXMua2V5ID0gVmFsaWRhdGlvbkNvbnN0YW50LlJlcXVpcmVkO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRW1haWxWYWxpZGF0aW9uUnVsZSBleHRlbmRzIFZhbGlkYXRpb25SdWxlIHtcclxuICAgIGNvbnN0cnVjdG9yKG92ZXJyaWRlbkVycm9yTWVzc2FnZT86IChlbGVtZW50PzogYW55LCByb3dJbmRleD86IHN0cmluZykgPT4gc3RyaW5nXHJcbiAgICApIHtcclxuICAgICAgICBzdXBlcihvdmVycmlkZW5FcnJvck1lc3NhZ2UpO1xyXG4gICAgICAgIHRoaXMua2V5ID0gVmFsaWRhdGlvbkNvbnN0YW50LkVtYWlsO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUGhvbmVWYWxpZGF0aW9uUnVsZSBleHRlbmRzIFZhbGlkYXRpb25SdWxlIHtcclxuICAgIGNvbnN0cnVjdG9yKG92ZXJyaWRlbkVycm9yTWVzc2FnZT86IChlbGVtZW50PzogYW55LCByb3dJbmRleD86IHN0cmluZykgPT4gc3RyaW5nXHJcbiAgICApIHtcclxuICAgICAgICBzdXBlcihvdmVycmlkZW5FcnJvck1lc3NhZ2UpO1xyXG4gICAgICAgIHRoaXMua2V5ID0gVmFsaWRhdGlvbkNvbnN0YW50LlBob25lO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQ3VzdG9tVmFsaWRhdGlvblJ1bGUgZXh0ZW5kcyBWYWxpZGF0aW9uUnVsZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBleGVjdXRlOiAodmFsdWU/OiBhbnksIHBheWxvYWQ/OiBhbnksIHJvd0luZGV4PzogbnVtYmVyKSA9PiBPYnNlcnZhYmxlPFZhbGlkYXRpb25SdWxlUmVzcG9uc2U+LFxyXG4gICAgICAgIHJlcXVpcmVkPzogYm9vbGVhbixcclxuICAgICAgICBvdmVycmlkZW5FcnJvck1lc3NhZ2U/OiAoZWxlbWVudD86IGFueSwgcm93SW5kZXg/OiBzdHJpbmcpID0+IHN0cmluZyxcclxuICAgICAgICBpc1ZhbGlkPzogYm9vbGVhblxyXG4gICAgKSB7XHJcbiAgICAgICAgc3VwZXIob3ZlcnJpZGVuRXJyb3JNZXNzYWdlKTtcclxuICAgICAgICB0aGlzLmV4ZWN1dGUgPSBleGVjdXRlO1xyXG4gICAgICAgIHRoaXMua2V5ID0gVmFsaWRhdGlvbkNvbnN0YW50LkN1c3RvbTtcclxuICAgICAgICB0aGlzLmlzVmFsaWQgPSBpc1ZhbGlkO1xyXG4gICAgICAgIHRoaXMucmVxdWlyZWQgPSByZXF1aXJlZDtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFZhbGlkYXRpb25PcHRpb24ge1xyXG4gICAgdmFsaWRhdGlvbk5hbWU6IHN0cmluZztcclxuICAgIHJ1bGVzOiBWYWxpZGF0aW9uUnVsZVtdID0gW107XHJcbiAgICB2YWx1ZVJlc29sdmVyOiAoaXRlbTogYW55LCBwYXlsb2FkOiBhbnksIHJvd0luZGV4PzogbnVtYmVyKSA9PiBhbnkgfCBhbnlbXTtcclxuICAgIGl0ZW1SZWY/OiBhbnk7XHJcbiAgICBkaXNwbGF5VGV4dD86IHN0cmluZztcclxuICAgIHZhbGlkYXRpb25JZD86IHN0cmluZztcclxuICAgIHBheWxvYWRSZWY/OiAoKSA9PiBhbnk7XHJcbiAgICByZWxldmFudEZpZWxkczogKHBheWxvYWQ6IGFueSkgPT4gc3RyaW5nW107XHJcbiAgICBkeW5hbWljPzogYm9vbGVhbjtcclxuICAgIGRpcnR5Q2hlY2s6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgc2NvcGU/OiBzdHJpbmc7XHJcbiAgICBlcnJvclRhcmdldElkPzogc3RyaW5nO1xyXG4gICAgZXJyb3JNZXNzYWdlQ2xhc3M/OiBzdHJpbmcgPSBWYWxpZGF0aW9uQ29uc3RhbnQuRXJyb3JNZXNzYWdlQ2xhc3M7XHJcbiAgICBlcnJvckVsZW1lbnRDbGFzcz86IHN0cmluZyA9IFZhbGlkYXRpb25Db25zdGFudC5FcnJvckVsZW1lbnRDbGFzcztcclxuICAgIHN1Y2Nlc3NFbGVtZW50Q2xhc3M/OiBzdHJpbmcgPSBWYWxpZGF0aW9uQ29uc3RhbnQuU3VjY2Vzc0VsZW1lbnRDbGFzcztcclxuICAgIGNvbnN0cnVjdG9yKGluaXQ/OiBQYXJ0aWFsPFZhbGlkYXRpb25PcHRpb24+KSB7XHJcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCBpbml0KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIENsaWVudFZhbGlkYXRvciB7XHJcbiAgICBmb3JtUmVmOiBFbGVtZW50UmVmO1xyXG4gICAgb3B0aW9uczogVmFsaWRhdGlvbk9wdGlvbltdID0gW107XHJcbiAgICBwYXlsb2FkUmVmPzogKCkgPT4gYW55O1xyXG4gICAgc2NvcGU/OiBzdHJpbmc7XHJcbiAgICByZWxhdGVkVmFsaWRhdGlvblByb3ZpZGVycz86IFZhbGlkYXRpb25TZXJ2aWNlW10gPSBbXTtcclxuICAgIHJlcXVpcmVkTWVzc2FnZTogc3RyaW5nID0gVmFsaWRhdGlvbkNvbnN0YW50LnJlcXVpcmVkTWVzc2FnZTtcclxuICAgIGludmFsaWRNZXNzYWdlOiBzdHJpbmcgPSBWYWxpZGF0aW9uQ29uc3RhbnQuaW52YWxpZE1lc3NhZ2U7XHJcbiAgICBjb25zdHJ1Y3Rvcihpbml0PzogUGFydGlhbDxDbGllbnRWYWxpZGF0b3I+KSB7XHJcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCBpbml0KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIENoYW5nZWRJdGVtIHtcclxuICAgIGlkPzogc3RyaW5nO1xyXG4gICAgb2xkVmFsdWU/OiBhbnk7XHJcbiAgICB2YWx1ZT86IGFueTtcclxuICAgIGZpZWxkPzogc3RyaW5nO1xyXG4gICAgY2hhbmdlOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBjb25zdHJ1Y3Rvcihpbml0PzogUGFydGlhbDxDaGFuZ2VkSXRlbT4pIHtcclxuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIGluaXQpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVmFsaWRhdGlvbkNvbnN0YW50IHtcclxuICAgIHB1YmxpYyBzdGF0aWMgUmVxdWlyZWQ6IHN0cmluZyA9ICdSZXF1aXJlZCc7XHJcbiAgICBwdWJsaWMgc3RhdGljIEVtYWlsOiBzdHJpbmcgPSAnRW1haWwnO1xyXG4gICAgcHVibGljIHN0YXRpYyBQaG9uZTogc3RyaW5nID0gJ1Bob25lJztcclxuICAgIHB1YmxpYyBzdGF0aWMgQ3VzdG9tOiBzdHJpbmcgPSAnQ3VzdG9tJztcclxuICAgIHB1YmxpYyBzdGF0aWMgRXJyb3JNZXNzYWdlOiBzdHJpbmcgPSAnS2jDtG5nIGjhu6NwIGzhu4cgdnVpIGzDsm5nIHRo4butIGzhuqFpLic7XHJcbiAgICBwdWJsaWMgc3RhdGljIEVycm9yRWxlbWVudENsYXNzOiBzdHJpbmcgPSAnbmctaW52YWxpZCc7XHJcbiAgICBwdWJsaWMgc3RhdGljIFN1Y2Nlc3NFbGVtZW50Q2xhc3M6IHN0cmluZyA9ICduZy12YWxpZCc7XHJcbiAgICBwdWJsaWMgc3RhdGljIEVycm9yTWVzc2FnZUNsYXNzOiBzdHJpbmcgPSAndGV4dC1kYW5nZXInO1xyXG4gICAgcHVibGljIHN0YXRpYyBEZWZhdWx0RXJyb3JTdHlsZXM6IHN0cmluZyA9ICdwYWRkaW5nOjA7bGlzdC1zdHlsZTpub25lO2ZvbnQtd2VpZ2h0OjQwMDtmb250LXNpemU6MTNweDsgd2lkdGg6IDEwMCUnO1xyXG4gICAgcHVibGljIHN0YXRpYyBEZWZhdWx0RXJyb3JDbGFzczogc3RyaW5nID0gJ3ZhbGlkYXRpb24tZXJyb3InO1xyXG4gICAgcHVibGljIHN0YXRpYyBBdHRyaWJ1dGVOYW1lOiBzdHJpbmcgPSAndmFsaWRhdGlvbi1uYW1lJztcclxuICAgIHB1YmxpYyBzdGF0aWMgQXR0cmlidXRlT3B0aW9uTmFtZTogc3RyaW5nID0gJ2R5bmFtaWMtb3B0aW9uJztcclxuICAgIHB1YmxpYyBzdGF0aWMgQXR0cmlidXRlRHluYW1pY05hbWU6IHN0cmluZyA9ICdkeW5hbWljLXZhbGlkYXRpb24nO1xyXG4gICAgcHVibGljIHN0YXRpYyBFcnJvclRhcmdldElkOiBzdHJpbmcgPSAnZXJyb3ItdGFyZ2V0LWlkJztcclxuICAgIHB1YmxpYyBzdGF0aWMgRHluYW1pY0Vycm9yQXR0cmlidXRlOiBzdHJpbmcgPSAnZHluYW1pYy1lcnJvci1hdHRyaWJ1dGUnO1xyXG4gICAgcHVibGljIHN0YXRpYyBFUlJPUl9FTEVNRU5UX0lEID0gJ2Vycm9yLWVsZW1lbnQtaWQnO1xyXG4gICAgcHVibGljIHN0YXRpYyBFUlJPUl9JVEVNX0VMRU1FTlRfSUQgPSAnZXJyb3ItaXRlbS1lbGVtZW50LWlkJztcclxuICAgIHB1YmxpYyBzdGF0aWMgVkFMSURBVElPTl9JRCA9ICd2YWxpZGF0aW9uLWlkJztcclxuICAgIHB1YmxpYyBzdGF0aWMgQVJSQVlfU0VRVUVOQ0VfSUQgPSAnYXJyYXktc2VxdWVuY2UtaWQnO1xyXG4gICAgcHVibGljIHN0YXRpYyByZXF1aXJlZE1lc3NhZ2U6IHN0cmluZyA9ICdsw6AgYuG6r3QgYnXhu5ljJztcclxuICAgIHB1YmxpYyBzdGF0aWMgaW52YWxpZE1lc3NhZ2U6IHN0cmluZyA9ICdraMO0bmcgaOG7o3AgbOG7hyc7XHJcbn07XHJcbiJdfQ==