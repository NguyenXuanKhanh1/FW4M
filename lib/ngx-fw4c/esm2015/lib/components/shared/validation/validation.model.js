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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGlvbi5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1mdzRjLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvc2hhcmVkL3ZhbGlkYXRpb24vdmFsaWRhdGlvbi5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBSUEsaUNBR0M7Ozs7O0lBRkcsaURBQTRCOzs7O0lBQzVCLGtEQUF3Qzs7QUFHNUMsTUFBTSxPQUFPLFlBQVk7Ozs7SUFHckIsWUFBWSxJQUE0QjtRQUNwQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM5QixDQUFDO0NBQ0o7OztJQUxHLCtCQUFvQjs7SUFDcEIsZ0NBQW1COztBQU12QixNQUFNLE9BQU8sc0JBQXNCOzs7O0lBRy9CLFlBQVksSUFBc0M7UUFDOUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDOUIsQ0FBQztDQUNKOzs7SUFMRyx3Q0FBaUI7O0lBQ2pCLHlDQUFpQjs7Ozs7QUFNckIsTUFBTSxPQUFnQixjQUFjOzs7O0lBT2hDLFlBQVkscUJBQW9FO1FBRTVFLElBQUksQ0FBQyxZQUFZLEdBQUcscUJBQXFCLENBQUM7SUFDOUMsQ0FBQztDQUNKOzs7SUFWRyw2QkFBWTs7SUFDWixpQ0FBK0Y7O0lBQy9GLHNDQUEyRDs7SUFDM0QsNEJBQVk7O0lBQ1osaUNBQWtCOztJQUNsQixrQ0FBbUI7O0FBT3ZCLE1BQU0sT0FBTyxzQkFBdUIsU0FBUSxjQUFjOzs7O0lBQ3RELFlBQ0kscUJBQW9FO1FBRXBFLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxHQUFHLEdBQUcsa0JBQWtCLENBQUMsUUFBUSxDQUFDO0lBQzNDLENBQUM7Q0FDSjtBQUVELE1BQU0sT0FBTyxtQkFBb0IsU0FBUSxjQUFjOzs7O0lBQ25ELFlBQVkscUJBQW9FO1FBRTVFLEtBQUssQ0FBQyxxQkFBcUIsQ0FB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dUVBQXVFLENBQUM7QUFDckcsb0NBQWlCLEdBQVcsa0JBQWtCLENBQUM7QUFDL0MsZ0NBQWEsR0FBVyxpQkFBaUIsQ0FBQztBQUMxQyxzQ0FBbUIsR0FBVyxnQkFBZ0IsQ0FBQztBQUMvQyx1Q0FBb0IsR0FBVyxvQkFBb0IsQ0FBQztBQUNwRCxnQ0FBYSxHQUFXLGlCQUFpQixDQUFDO0FBQzFDLHdDQUFxQixHQUFXLHlCQUF5QixDQUFDO0FBQzFELG1DQUFnQixHQUFHLGtCQUFrQixDQUFDO0FBQ3RDLHdDQUFxQixHQUFHLHVCQUF1QixDQUFDO0FBQ2hELGdDQUFhLEdBQUcsZUFBZSxDQUFDO0FBQ2hDLG9DQUFpQixHQUFHLG1CQUFtQixDQUFDO0FBQ3hDLGtDQUFlLEdBQVcsYUFBYSxDQUFDO0FBQ3hDLGlDQUFjLEdBQVcsY0FBYyxDQUFDOzs7SUFwQnRELDRCQUE0Qzs7SUFDNUMseUJBQXNDOztJQUN0Qyx5QkFBc0M7O0lBQ3RDLDBCQUF3Qzs7SUFDeEMsZ0NBQXNFOztJQUN0RSxxQ0FBdUQ7O0lBQ3ZELHVDQUF1RDs7SUFDdkQscUNBQXdEOztJQUN4RCxzQ0FBbUg7O0lBQ25ILHFDQUE2RDs7SUFDN0QsaUNBQXdEOztJQUN4RCx1Q0FBNkQ7O0lBQzdELHdDQUFrRTs7SUFDbEUsaUNBQXdEOztJQUN4RCx5Q0FBd0U7O0lBQ3hFLG9DQUFvRDs7SUFDcEQseUNBQThEOztJQUM5RCxpQ0FBOEM7O0lBQzlDLHFDQUFzRDs7SUFDdEQsbUNBQXNEOztJQUN0RCxrQ0FBc0Q7O0FBQ3pELENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgVmFsaWRhdGlvblNlcnZpY2UgfSBmcm9tICcuL3ZhbGlkYXRpb24uc2VydmljZSc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElWYWxpZGF0aW9uIHtcclxuICAgIGNhbGxiYWNrKCk6IE9ic2VydmFibGU8YW55PjtcclxuICAgIGdldEVycm9ycygpOiBPYnNlcnZhYmxlPFN1bW1hcnlFcnJvcltdPjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFN1bW1hcnlFcnJvciB7XHJcbiAgICBlbGVtZW50OiBFbGVtZW50UmVmO1xyXG4gICAgbWVzc2FnZXM6IHN0cmluZ1tdO1xyXG4gICAgY29uc3RydWN0b3IoaW5pdD86IFBhcnRpYWw8U3VtbWFyeUVycm9yPikge1xyXG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgaW5pdCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBWYWxpZGF0aW9uUnVsZVJlc3BvbnNlIHtcclxuICAgIHN0YXR1cz86IGJvb2xlYW47XHJcbiAgICBtZXNzYWdlPzogc3RyaW5nO1xyXG4gICAgY29uc3RydWN0b3IoaW5pdD86IFBhcnRpYWw8VmFsaWRhdGlvblJ1bGVSZXNwb25zZT4pIHtcclxuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIGluaXQpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgVmFsaWRhdGlvblJ1bGUge1xyXG4gICAga2V5OiBzdHJpbmc7XHJcbiAgICBleGVjdXRlOiAodmFsdWU/OiBhbnksIHBheWxvYWQ/OiBhbnksIHJvd0luZGV4PzogbnVtYmVyKSA9PiBPYnNlcnZhYmxlPFZhbGlkYXRpb25SdWxlUmVzcG9uc2U+O1xyXG4gICAgZXJyb3JNZXNzYWdlOiAoZWxlbWVudD86IGFueSwgcm93SW5kZXg/OiBzdHJpbmcpID0+IHN0cmluZztcclxuICAgIGlkPzogc3RyaW5nO1xyXG4gICAgaXNWYWxpZD86IGJvb2xlYW47XHJcbiAgICByZXF1aXJlZD86IGJvb2xlYW47XHJcbiAgICBjb25zdHJ1Y3RvcihvdmVycmlkZW5FcnJvck1lc3NhZ2U/OiAoZWxlbWVudD86IGFueSwgcm93SW5kZXg/OiBzdHJpbmcpID0+IHN0cmluZ1xyXG4gICAgKSB7XHJcbiAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2UgPSBvdmVycmlkZW5FcnJvck1lc3NhZ2U7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBSZXF1aXJlZFZhbGlkYXRpb25SdWxlIGV4dGVuZHMgVmFsaWRhdGlvblJ1bGUge1xyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgb3ZlcnJpZGVuRXJyb3JNZXNzYWdlPzogKGVsZW1lbnQ/OiBhbnksIHJvd0luZGV4Pzogc3RyaW5nKSA9PiBzdHJpbmdcclxuICAgICkge1xyXG4gICAgICAgIHN1cGVyKG92ZXJyaWRlbkVycm9yTWVzc2FnZSk7XHJcbiAgICAgICAgdGhpcy5rZXkgPSBWYWxpZGF0aW9uQ29uc3RhbnQuUmVxdWlyZWQ7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBFbWFpbFZhbGlkYXRpb25SdWxlIGV4dGVuZHMgVmFsaWRhdGlvblJ1bGUge1xyXG4gICAgY29uc3RydWN0b3Iob3ZlcnJpZGVuRXJyb3JNZXNzYWdlPzogKGVsZW1lbnQ/OiBhbnksIHJvd0luZGV4Pzogc3RyaW5nKSA9PiBzdHJpbmdcclxuICAgICkge1xyXG4gICAgICAgIHN1cGVyKG92ZXJyaWRlbkVycm9yTWVzc2FnZSk7XHJcbiAgICAgICAgdGhpcy5rZXkgPSBWYWxpZGF0aW9uQ29uc3RhbnQuRW1haWw7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBQaG9uZVZhbGlkYXRpb25SdWxlIGV4dGVuZHMgVmFsaWRhdGlvblJ1bGUge1xyXG4gICAgY29uc3RydWN0b3Iob3ZlcnJpZGVuRXJyb3JNZXNzYWdlPzogKGVsZW1lbnQ/OiBhbnksIHJvd0luZGV4Pzogc3RyaW5nKSA9PiBzdHJpbmdcclxuICAgICkge1xyXG4gICAgICAgIHN1cGVyKG92ZXJyaWRlbkVycm9yTWVzc2FnZSk7XHJcbiAgICAgICAgdGhpcy5rZXkgPSBWYWxpZGF0aW9uQ29uc3RhbnQuUGhvbmU7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBDdXN0b21WYWxpZGF0aW9uUnVsZSBleHRlbmRzIFZhbGlkYXRpb25SdWxlIHtcclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIGV4ZWN1dGU6ICh2YWx1ZT86IGFueSwgcGF5bG9hZD86IGFueSwgcm93SW5kZXg/OiBudW1iZXIpID0+IE9ic2VydmFibGU8VmFsaWRhdGlvblJ1bGVSZXNwb25zZT4sXHJcbiAgICAgICAgcmVxdWlyZWQ/OiBib29sZWFuLFxyXG4gICAgICAgIG92ZXJyaWRlbkVycm9yTWVzc2FnZT86IChlbGVtZW50PzogYW55LCByb3dJbmRleD86IHN0cmluZykgPT4gc3RyaW5nLFxyXG4gICAgICAgIGlzVmFsaWQ/OiBib29sZWFuXHJcbiAgICApIHtcclxuICAgICAgICBzdXBlcihvdmVycmlkZW5FcnJvck1lc3NhZ2UpO1xyXG4gICAgICAgIHRoaXMuZXhlY3V0ZSA9IGV4ZWN1dGU7XHJcbiAgICAgICAgdGhpcy5rZXkgPSBWYWxpZGF0aW9uQ29uc3RhbnQuQ3VzdG9tO1xyXG4gICAgICAgIHRoaXMuaXNWYWxpZCA9IGlzVmFsaWQ7XHJcbiAgICAgICAgdGhpcy5yZXF1aXJlZCA9IHJlcXVpcmVkO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVmFsaWRhdGlvbk9wdGlvbiB7XHJcbiAgICB2YWxpZGF0aW9uTmFtZTogc3RyaW5nO1xyXG4gICAgcnVsZXM6IFZhbGlkYXRpb25SdWxlW10gPSBbXTtcclxuICAgIHZhbHVlUmVzb2x2ZXI6IChwYXlsb2FkOiBhbnksIHJvd0luZGV4PzogbnVtYmVyKSA9PiBhbnkgfCBhbnlbXTtcclxuICAgIGRpc3BsYXlUZXh0Pzogc3RyaW5nO1xyXG4gICAgdmFsaWRhdGlvbklkPzogc3RyaW5nO1xyXG4gICAgcGF5bG9hZFJlZj86ICgpID0+IGFueTtcclxuICAgIHJlbGV2YW50RmllbGRzOiAocGF5bG9hZDogYW55KSA9PiBzdHJpbmdbXTtcclxuICAgIGR5bmFtaWM/OiBib29sZWFuO1xyXG4gICAgZGlydHlDaGVjazogYm9vbGVhbiA9IHRydWU7XHJcbiAgICBzY29wZT86IHN0cmluZztcclxuICAgIGVycm9yVGFyZ2V0SWQ/OiBzdHJpbmc7XHJcbiAgICBlcnJvck1lc3NhZ2VDbGFzcz86IHN0cmluZyA9IFZhbGlkYXRpb25Db25zdGFudC5FcnJvck1lc3NhZ2VDbGFzcztcclxuICAgIGVycm9yRWxlbWVudENsYXNzPzogc3RyaW5nID0gVmFsaWRhdGlvbkNvbnN0YW50LkVycm9yRWxlbWVudENsYXNzO1xyXG4gICAgc3VjY2Vzc0VsZW1lbnRDbGFzcz86IHN0cmluZyA9IFZhbGlkYXRpb25Db25zdGFudC5TdWNjZXNzRWxlbWVudENsYXNzO1xyXG4gICAgY29uc3RydWN0b3IoaW5pdD86IFBhcnRpYWw8VmFsaWRhdGlvbk9wdGlvbj4pIHtcclxuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIGluaXQpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQ2xpZW50VmFsaWRhdG9yIHtcclxuICAgIGZvcm1SZWY6IEVsZW1lbnRSZWY7XHJcbiAgICBvcHRpb25zOiBWYWxpZGF0aW9uT3B0aW9uW10gPSBbXTtcclxuICAgIHBheWxvYWRSZWY/OiAoKSA9PiBhbnk7XHJcbiAgICBzY29wZT86IHN0cmluZztcclxuICAgIHJlbGF0ZWRWYWxpZGF0aW9uUHJvdmlkZXJzPzogVmFsaWRhdGlvblNlcnZpY2VbXSA9IFtdO1xyXG4gICAgcmVxdWlyZWRNZXNzYWdlOiBzdHJpbmcgPSBWYWxpZGF0aW9uQ29uc3RhbnQucmVxdWlyZWRNZXNzYWdlO1xyXG4gICAgaW52YWxpZE1lc3NhZ2U6IHN0cmluZyA9IFZhbGlkYXRpb25Db25zdGFudC5pbnZhbGlkTWVzc2FnZTtcclxuICAgIGNvbnN0cnVjdG9yKGluaXQ/OiBQYXJ0aWFsPENsaWVudFZhbGlkYXRvcj4pIHtcclxuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIGluaXQpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQ2hhbmdlZEl0ZW0ge1xyXG4gICAgaWQ/OiBzdHJpbmc7XHJcbiAgICBvbGRWYWx1ZT86IGFueTtcclxuICAgIHZhbHVlPzogYW55O1xyXG4gICAgZmllbGQ/OiBzdHJpbmc7XHJcbiAgICBjaGFuZ2U6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIGNvbnN0cnVjdG9yKGluaXQ/OiBQYXJ0aWFsPENoYW5nZWRJdGVtPikge1xyXG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgaW5pdCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBWYWxpZGF0aW9uQ29uc3RhbnQge1xyXG4gICAgcHVibGljIHN0YXRpYyBSZXF1aXJlZDogc3RyaW5nID0gJ1JlcXVpcmVkJztcclxuICAgIHB1YmxpYyBzdGF0aWMgRW1haWw6IHN0cmluZyA9ICdFbWFpbCc7XHJcbiAgICBwdWJsaWMgc3RhdGljIFBob25lOiBzdHJpbmcgPSAnUGhvbmUnO1xyXG4gICAgcHVibGljIHN0YXRpYyBDdXN0b206IHN0cmluZyA9ICdDdXN0b20nO1xyXG4gICAgcHVibGljIHN0YXRpYyBFcnJvck1lc3NhZ2U6IHN0cmluZyA9ICdLaMO0bmcgaOG7o3AgbOG7hyB2dWkgbMOybmcgdGjhu60gbOG6oWkuJztcclxuICAgIHB1YmxpYyBzdGF0aWMgRXJyb3JFbGVtZW50Q2xhc3M6IHN0cmluZyA9ICduZy1pbnZhbGlkJztcclxuICAgIHB1YmxpYyBzdGF0aWMgU3VjY2Vzc0VsZW1lbnRDbGFzczogc3RyaW5nID0gJ25nLXZhbGlkJztcclxuICAgIHB1YmxpYyBzdGF0aWMgRXJyb3JNZXNzYWdlQ2xhc3M6IHN0cmluZyA9ICd0ZXh0LWRhbmdlcic7XHJcbiAgICBwdWJsaWMgc3RhdGljIERlZmF1bHRFcnJvclN0eWxlczogc3RyaW5nID0gJ3BhZGRpbmc6MDtsaXN0LXN0eWxlOm5vbmU7Zm9udC13ZWlnaHQ6NDAwO2ZvbnQtc2l6ZToxM3B4OyB3aWR0aDogMTAwJSc7XHJcbiAgICBwdWJsaWMgc3RhdGljIERlZmF1bHRFcnJvckNsYXNzOiBzdHJpbmcgPSAndmFsaWRhdGlvbi1lcnJvcic7XHJcbiAgICBwdWJsaWMgc3RhdGljIEF0dHJpYnV0ZU5hbWU6IHN0cmluZyA9ICd2YWxpZGF0aW9uLW5hbWUnO1xyXG4gICAgcHVibGljIHN0YXRpYyBBdHRyaWJ1dGVPcHRpb25OYW1lOiBzdHJpbmcgPSAnZHluYW1pYy1vcHRpb24nO1xyXG4gICAgcHVibGljIHN0YXRpYyBBdHRyaWJ1dGVEeW5hbWljTmFtZTogc3RyaW5nID0gJ2R5bmFtaWMtdmFsaWRhdGlvbic7XHJcbiAgICBwdWJsaWMgc3RhdGljIEVycm9yVGFyZ2V0SWQ6IHN0cmluZyA9ICdlcnJvci10YXJnZXQtaWQnO1xyXG4gICAgcHVibGljIHN0YXRpYyBEeW5hbWljRXJyb3JBdHRyaWJ1dGU6IHN0cmluZyA9ICdkeW5hbWljLWVycm9yLWF0dHJpYnV0ZSc7XHJcbiAgICBwdWJsaWMgc3RhdGljIEVSUk9SX0VMRU1FTlRfSUQgPSAnZXJyb3ItZWxlbWVudC1pZCc7XHJcbiAgICBwdWJsaWMgc3RhdGljIEVSUk9SX0lURU1fRUxFTUVOVF9JRCA9ICdlcnJvci1pdGVtLWVsZW1lbnQtaWQnO1xyXG4gICAgcHVibGljIHN0YXRpYyBWQUxJREFUSU9OX0lEID0gJ3ZhbGlkYXRpb24taWQnO1xyXG4gICAgcHVibGljIHN0YXRpYyBBUlJBWV9TRVFVRU5DRV9JRCA9ICdhcnJheS1zZXF1ZW5jZS1pZCc7XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlcXVpcmVkTWVzc2FnZTogc3RyaW5nID0gJ2zDoCBi4bqvdCBideG7mWMnO1xyXG4gICAgcHVibGljIHN0YXRpYyBpbnZhbGlkTWVzc2FnZTogc3RyaW5nID0gJ2tow7RuZyBo4bujcCBs4buHJztcclxufTtcclxuIl19