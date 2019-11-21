/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
var SummaryError = /** @class */ (function () {
    function SummaryError(init) {
        Object.assign(this, init);
    }
    return SummaryError;
}());
export { SummaryError };
if (false) {
    /** @type {?} */
    SummaryError.prototype.element;
    /** @type {?} */
    SummaryError.prototype.messages;
}
var ValidationRuleResponse = /** @class */ (function () {
    function ValidationRuleResponse(init) {
        Object.assign(this, init);
    }
    return ValidationRuleResponse;
}());
export { ValidationRuleResponse };
if (false) {
    /** @type {?} */
    ValidationRuleResponse.prototype.status;
    /** @type {?} */
    ValidationRuleResponse.prototype.message;
}
/**
 * @abstract
 */
var /**
 * @abstract
 */
ValidationRule = /** @class */ (function () {
    function ValidationRule(overridenErrorMessage) {
        this.errorMessage = overridenErrorMessage;
    }
    return ValidationRule;
}());
/**
 * @abstract
 */
export { ValidationRule };
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
var RequiredValidationRule = /** @class */ (function (_super) {
    tslib_1.__extends(RequiredValidationRule, _super);
    function RequiredValidationRule(overridenErrorMessage) {
        var _this = _super.call(this, overridenErrorMessage) || this;
        _this.key = ValidationConstant.Required;
        return _this;
    }
    return RequiredValidationRule;
}(ValidationRule));
export { RequiredValidationRule };
var EmailValidationRule = /** @class */ (function (_super) {
    tslib_1.__extends(EmailValidationRule, _super);
    function EmailValidationRule(overridenErrorMessage) {
        var _this = _super.call(this, overridenErrorMessage) || this;
        _this.key = ValidationConstant.Email;
        return _this;
    }
    return EmailValidationRule;
}(ValidationRule));
export { EmailValidationRule };
var PhoneValidationRule = /** @class */ (function (_super) {
    tslib_1.__extends(PhoneValidationRule, _super);
    function PhoneValidationRule(overridenErrorMessage) {
        var _this = _super.call(this, overridenErrorMessage) || this;
        _this.key = ValidationConstant.Phone;
        return _this;
    }
    return PhoneValidationRule;
}(ValidationRule));
export { PhoneValidationRule };
var CustomValidationRule = /** @class */ (function (_super) {
    tslib_1.__extends(CustomValidationRule, _super);
    function CustomValidationRule(execute, required, overridenErrorMessage, isValid) {
        var _this = _super.call(this, overridenErrorMessage) || this;
        _this.execute = execute;
        _this.key = ValidationConstant.Custom;
        _this.isValid = isValid;
        _this.required = required;
        return _this;
    }
    return CustomValidationRule;
}(ValidationRule));
export { CustomValidationRule };
var ValidationOption = /** @class */ (function () {
    function ValidationOption(init) {
        this.rules = [];
        this.dirtyCheck = true;
        this.errorMessageClass = ValidationConstant.ErrorMessageClass;
        this.errorElementClass = ValidationConstant.ErrorElementClass;
        this.successElementClass = ValidationConstant.SuccessElementClass;
        Object.assign(this, init);
    }
    return ValidationOption;
}());
export { ValidationOption };
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
var ClientValidator = /** @class */ (function () {
    function ClientValidator(init) {
        this.options = [];
        this.relatedValidationProviders = [];
        this.requiredMessage = ValidationConstant.requiredMessage;
        this.invalidMessage = ValidationConstant.invalidMessage;
        Object.assign(this, init);
    }
    return ClientValidator;
}());
export { ClientValidator };
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
var ChangedItem = /** @class */ (function () {
    function ChangedItem(init) {
        this.change = false;
        Object.assign(this, init);
    }
    return ChangedItem;
}());
export { ChangedItem };
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
var ValidationConstant = /** @class */ (function () {
    function ValidationConstant() {
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
    return ValidationConstant;
}());
export { ValidationConstant };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGlvbi5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1mdzRjLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvc2hhcmVkL3ZhbGlkYXRpb24vdmFsaWRhdGlvbi5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUlBLGlDQUdDOzs7OztJQUZHLGlEQUE0Qjs7OztJQUM1QixrREFBd0M7O0FBRzVDO0lBR0ksc0JBQVksSUFBNEI7UUFDcEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUNMLG1CQUFDO0FBQUQsQ0FBQyxBQU5ELElBTUM7Ozs7SUFMRywrQkFBb0I7O0lBQ3BCLGdDQUFtQjs7QUFNdkI7SUFHSSxnQ0FBWSxJQUFzQztRQUM5QyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBQ0wsNkJBQUM7QUFBRCxDQUFDLEFBTkQsSUFNQzs7OztJQUxHLHdDQUFpQjs7SUFDakIseUNBQWlCOzs7OztBQU1yQjs7OztJQU9JLHdCQUFZLHFCQUFvRTtRQUU1RSxJQUFJLENBQUMsWUFBWSxHQUFHLHFCQUFxQixDQUFDO0lBQzlDLENBQUM7SUFDTCxxQkFBQztBQUFELENBQUMsQUFYRCxJQVdDOzs7Ozs7O0lBVkcsNkJBQVk7O0lBQ1osaUNBQStGOztJQUMvRixzQ0FBMkQ7O0lBQzNELDRCQUFZOztJQUNaLGlDQUFrQjs7SUFDbEIsa0NBQW1COztBQU92QjtJQUE0QyxrREFBYztJQUN0RCxnQ0FDSSxxQkFBb0U7UUFEeEUsWUFHSSxrQkFBTSxxQkFBcUIsQ0FBQyxTQUUvQjtRQURHLEtBQUksQ0FBQyxHQUFHLEdBQUcsa0JBQWtCLENBQUMsUUFBUSxDQUFDOztJQUMzQyxDQUFDO0lBQ0wsNkJBQUM7QUFBRCxDQUFDLEFBUEQsQ0FBNEMsY0FBYyxHQU96RDs7QUFFRDtJQUF5QywrQ0FBYztJQUNuRCw2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IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgVmFsaWRhdGlvblNlcnZpY2UgfSBmcm9tICcuL3ZhbGlkYXRpb24uc2VydmljZSc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElWYWxpZGF0aW9uIHtcclxuICAgIGNhbGxiYWNrKCk6IE9ic2VydmFibGU8YW55PjtcclxuICAgIGdldEVycm9ycygpOiBPYnNlcnZhYmxlPFN1bW1hcnlFcnJvcltdPjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFN1bW1hcnlFcnJvciB7XHJcbiAgICBlbGVtZW50OiBFbGVtZW50UmVmO1xyXG4gICAgbWVzc2FnZXM6IHN0cmluZ1tdO1xyXG4gICAgY29uc3RydWN0b3IoaW5pdD86IFBhcnRpYWw8U3VtbWFyeUVycm9yPikge1xyXG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgaW5pdCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBWYWxpZGF0aW9uUnVsZVJlc3BvbnNlIHtcclxuICAgIHN0YXR1cz86IGJvb2xlYW47XHJcbiAgICBtZXNzYWdlPzogc3RyaW5nO1xyXG4gICAgY29uc3RydWN0b3IoaW5pdD86IFBhcnRpYWw8VmFsaWRhdGlvblJ1bGVSZXNwb25zZT4pIHtcclxuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIGluaXQpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgVmFsaWRhdGlvblJ1bGUge1xyXG4gICAga2V5OiBzdHJpbmc7XHJcbiAgICBleGVjdXRlOiAodmFsdWU/OiBhbnksIHBheWxvYWQ/OiBhbnksIHJvd0luZGV4PzogbnVtYmVyKSA9PiBPYnNlcnZhYmxlPFZhbGlkYXRpb25SdWxlUmVzcG9uc2U+O1xyXG4gICAgZXJyb3JNZXNzYWdlOiAoZWxlbWVudD86IGFueSwgcm93SW5kZXg/OiBzdHJpbmcpID0+IHN0cmluZztcclxuICAgIGlkPzogc3RyaW5nO1xyXG4gICAgaXNWYWxpZD86IGJvb2xlYW47XHJcbiAgICByZXF1aXJlZD86IGJvb2xlYW47XHJcbiAgICBjb25zdHJ1Y3RvcihvdmVycmlkZW5FcnJvck1lc3NhZ2U/OiAoZWxlbWVudD86IGFueSwgcm93SW5kZXg/OiBzdHJpbmcpID0+IHN0cmluZ1xyXG4gICAgKSB7XHJcbiAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2UgPSBvdmVycmlkZW5FcnJvck1lc3NhZ2U7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBSZXF1aXJlZFZhbGlkYXRpb25SdWxlIGV4dGVuZHMgVmFsaWRhdGlvblJ1bGUge1xyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgb3ZlcnJpZGVuRXJyb3JNZXNzYWdlPzogKGVsZW1lbnQ/OiBhbnksIHJvd0luZGV4Pzogc3RyaW5nKSA9PiBzdHJpbmdcclxuICAgICkge1xyXG4gICAgICAgIHN1cGVyKG92ZXJyaWRlbkVycm9yTWVzc2FnZSk7XHJcbiAgICAgICAgdGhpcy5rZXkgPSBWYWxpZGF0aW9uQ29uc3RhbnQuUmVxdWlyZWQ7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBFbWFpbFZhbGlkYXRpb25SdWxlIGV4dGVuZHMgVmFsaWRhdGlvblJ1bGUge1xyXG4gICAgY29uc3RydWN0b3Iob3ZlcnJpZGVuRXJyb3JNZXNzYWdlPzogKGVsZW1lbnQ/OiBhbnksIHJvd0luZGV4Pzogc3RyaW5nKSA9PiBzdHJpbmdcclxuICAgICkge1xyXG4gICAgICAgIHN1cGVyKG92ZXJyaWRlbkVycm9yTWVzc2FnZSk7XHJcbiAgICAgICAgdGhpcy5rZXkgPSBWYWxpZGF0aW9uQ29uc3RhbnQuRW1haWw7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBQaG9uZVZhbGlkYXRpb25SdWxlIGV4dGVuZHMgVmFsaWRhdGlvblJ1bGUge1xyXG4gICAgY29uc3RydWN0b3Iob3ZlcnJpZGVuRXJyb3JNZXNzYWdlPzogKGVsZW1lbnQ/OiBhbnksIHJvd0luZGV4Pzogc3RyaW5nKSA9PiBzdHJpbmdcclxuICAgICkge1xyXG4gICAgICAgIHN1cGVyKG92ZXJyaWRlbkVycm9yTWVzc2FnZSk7XHJcbiAgICAgICAgdGhpcy5rZXkgPSBWYWxpZGF0aW9uQ29uc3RhbnQuUGhvbmU7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBDdXN0b21WYWxpZGF0aW9uUnVsZSBleHRlbmRzIFZhbGlkYXRpb25SdWxlIHtcclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIGV4ZWN1dGU6ICh2YWx1ZT86IGFueSwgcGF5bG9hZD86IGFueSwgcm93SW5kZXg/OiBudW1iZXIpID0+IE9ic2VydmFibGU8VmFsaWRhdGlvblJ1bGVSZXNwb25zZT4sXHJcbiAgICAgICAgcmVxdWlyZWQ/OiBib29sZWFuLFxyXG4gICAgICAgIG92ZXJyaWRlbkVycm9yTWVzc2FnZT86IChlbGVtZW50PzogYW55LCByb3dJbmRleD86IHN0cmluZykgPT4gc3RyaW5nLFxyXG4gICAgICAgIGlzVmFsaWQ/OiBib29sZWFuXHJcbiAgICApIHtcclxuICAgICAgICBzdXBlcihvdmVycmlkZW5FcnJvck1lc3NhZ2UpO1xyXG4gICAgICAgIHRoaXMuZXhlY3V0ZSA9IGV4ZWN1dGU7XHJcbiAgICAgICAgdGhpcy5rZXkgPSBWYWxpZGF0aW9uQ29uc3RhbnQuQ3VzdG9tO1xyXG4gICAgICAgIHRoaXMuaXNWYWxpZCA9IGlzVmFsaWQ7XHJcbiAgICAgICAgdGhpcy5yZXF1aXJlZCA9IHJlcXVpcmVkO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVmFsaWRhdGlvbk9wdGlvbiB7XHJcbiAgICB2YWxpZGF0aW9uTmFtZTogc3RyaW5nO1xyXG4gICAgcnVsZXM6IFZhbGlkYXRpb25SdWxlW10gPSBbXTtcclxuICAgIHZhbHVlUmVzb2x2ZXI6IChwYXlsb2FkOiBhbnksIHJvd0luZGV4PzogbnVtYmVyKSA9PiBhbnkgfCBhbnlbXTtcclxuICAgIGRpc3BsYXlUZXh0Pzogc3RyaW5nO1xyXG4gICAgdmFsaWRhdGlvbklkPzogc3RyaW5nO1xyXG4gICAgcGF5bG9hZFJlZj86ICgpID0+IGFueTtcclxuICAgIHJlbGV2YW50RmllbGRzOiAocGF5bG9hZDogYW55KSA9PiBzdHJpbmdbXTtcclxuICAgIGR5bmFtaWM/OiBib29sZWFuO1xyXG4gICAgZGlydHlDaGVjazogYm9vbGVhbiA9IHRydWU7XHJcbiAgICBzY29wZT86IHN0cmluZztcclxuICAgIGVycm9yVGFyZ2V0SWQ/OiBzdHJpbmc7XHJcbiAgICBlcnJvck1lc3NhZ2VDbGFzcz86IHN0cmluZyA9IFZhbGlkYXRpb25Db25zdGFudC5FcnJvck1lc3NhZ2VDbGFzcztcclxuICAgIGVycm9yRWxlbWVudENsYXNzPzogc3RyaW5nID0gVmFsaWRhdGlvbkNvbnN0YW50LkVycm9yRWxlbWVudENsYXNzO1xyXG4gICAgc3VjY2Vzc0VsZW1lbnRDbGFzcz86IHN0cmluZyA9IFZhbGlkYXRpb25Db25zdGFudC5TdWNjZXNzRWxlbWVudENsYXNzO1xyXG4gICAgY29uc3RydWN0b3IoaW5pdD86IFBhcnRpYWw8VmFsaWRhdGlvbk9wdGlvbj4pIHtcclxuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIGluaXQpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQ2xpZW50VmFsaWRhdG9yIHtcclxuICAgIGZvcm1SZWY6IEVsZW1lbnRSZWY7XHJcbiAgICBvcHRpb25zOiBWYWxpZGF0aW9uT3B0aW9uW10gPSBbXTtcclxuICAgIHBheWxvYWRSZWY/OiAoKSA9PiBhbnk7XHJcbiAgICBzY29wZT86IHN0cmluZztcclxuICAgIHJlbGF0ZWRWYWxpZGF0aW9uUHJvdmlkZXJzPzogVmFsaWRhdGlvblNlcnZpY2VbXSA9IFtdO1xyXG4gICAgcmVxdWlyZWRNZXNzYWdlOiBzdHJpbmcgPSBWYWxpZGF0aW9uQ29uc3RhbnQucmVxdWlyZWRNZXNzYWdlO1xyXG4gICAgaW52YWxpZE1lc3NhZ2U6IHN0cmluZyA9IFZhbGlkYXRpb25Db25zdGFudC5pbnZhbGlkTWVzc2FnZTtcclxuICAgIGNvbnN0cnVjdG9yKGluaXQ/OiBQYXJ0aWFsPENsaWVudFZhbGlkYXRvcj4pIHtcclxuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIGluaXQpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQ2hhbmdlZEl0ZW0ge1xyXG4gICAgaWQ/OiBzdHJpbmc7XHJcbiAgICBvbGRWYWx1ZT86IGFueTtcclxuICAgIHZhbHVlPzogYW55O1xyXG4gICAgZmllbGQ/OiBzdHJpbmc7XHJcbiAgICBjaGFuZ2U6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIGNvbnN0cnVjdG9yKGluaXQ/OiBQYXJ0aWFsPENoYW5nZWRJdGVtPikge1xyXG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgaW5pdCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBWYWxpZGF0aW9uQ29uc3RhbnQge1xyXG4gICAgcHVibGljIHN0YXRpYyBSZXF1aXJlZDogc3RyaW5nID0gJ1JlcXVpcmVkJztcclxuICAgIHB1YmxpYyBzdGF0aWMgRW1haWw6IHN0cmluZyA9ICdFbWFpbCc7XHJcbiAgICBwdWJsaWMgc3RhdGljIFBob25lOiBzdHJpbmcgPSAnUGhvbmUnO1xyXG4gICAgcHVibGljIHN0YXRpYyBDdXN0b206IHN0cmluZyA9ICdDdXN0b20nO1xyXG4gICAgcHVibGljIHN0YXRpYyBFcnJvck1lc3NhZ2U6IHN0cmluZyA9ICdLaMO0bmcgaOG7o3AgbOG7hyB2dWkgbMOybmcgdGjhu60gbOG6oWkuJztcclxuICAgIHB1YmxpYyBzdGF0aWMgRXJyb3JFbGVtZW50Q2xhc3M6IHN0cmluZyA9ICduZy1pbnZhbGlkJztcclxuICAgIHB1YmxpYyBzdGF0aWMgU3VjY2Vzc0VsZW1lbnRDbGFzczogc3RyaW5nID0gJ25nLXZhbGlkJztcclxuICAgIHB1YmxpYyBzdGF0aWMgRXJyb3JNZXNzYWdlQ2xhc3M6IHN0cmluZyA9ICd0ZXh0LWRhbmdlcic7XHJcbiAgICBwdWJsaWMgc3RhdGljIERlZmF1bHRFcnJvclN0eWxlczogc3RyaW5nID0gJ3BhZGRpbmc6MDtsaXN0LXN0eWxlOm5vbmU7Zm9udC13ZWlnaHQ6NDAwO2ZvbnQtc2l6ZToxM3B4OyB3aWR0aDogMTAwJSc7XHJcbiAgICBwdWJsaWMgc3RhdGljIERlZmF1bHRFcnJvckNsYXNzOiBzdHJpbmcgPSAndmFsaWRhdGlvbi1lcnJvcic7XHJcbiAgICBwdWJsaWMgc3RhdGljIEF0dHJpYnV0ZU5hbWU6IHN0cmluZyA9ICd2YWxpZGF0aW9uLW5hbWUnO1xyXG4gICAgcHVibGljIHN0YXRpYyBBdHRyaWJ1dGVPcHRpb25OYW1lOiBzdHJpbmcgPSAnZHluYW1pYy1vcHRpb24nO1xyXG4gICAgcHVibGljIHN0YXRpYyBBdHRyaWJ1dGVEeW5hbWljTmFtZTogc3RyaW5nID0gJ2R5bmFtaWMtdmFsaWRhdGlvbic7XHJcbiAgICBwdWJsaWMgc3RhdGljIEVycm9yVGFyZ2V0SWQ6IHN0cmluZyA9ICdlcnJvci10YXJnZXQtaWQnO1xyXG4gICAgcHVibGljIHN0YXRpYyBEeW5hbWljRXJyb3JBdHRyaWJ1dGU6IHN0cmluZyA9ICdkeW5hbWljLWVycm9yLWF0dHJpYnV0ZSc7XHJcbiAgICBwdWJsaWMgc3RhdGljIEVSUk9SX0VMRU1FTlRfSUQgPSAnZXJyb3ItZWxlbWVudC1pZCc7XHJcbiAgICBwdWJsaWMgc3RhdGljIEVSUk9SX0lURU1fRUxFTUVOVF9JRCA9ICdlcnJvci1pdGVtLWVsZW1lbnQtaWQnO1xyXG4gICAgcHVibGljIHN0YXRpYyBWQUxJREFUSU9OX0lEID0gJ3ZhbGlkYXRpb24taWQnO1xyXG4gICAgcHVibGljIHN0YXRpYyBBUlJBWV9TRVFVRU5DRV9JRCA9ICdhcnJheS1zZXF1ZW5jZS1pZCc7XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlcXVpcmVkTWVzc2FnZTogc3RyaW5nID0gJ2zDoCBi4bqvdCBideG7mWMnO1xyXG4gICAgcHVibGljIHN0YXRpYyBpbnZhbGlkTWVzc2FnZTogc3RyaW5nID0gJ2tow7RuZyBo4bujcCBs4buHJztcclxufTtcclxuIl19