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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGlvbi5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1mdzRjLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvc2hhcmVkL3ZhbGlkYXRpb24vdmFsaWRhdGlvbi5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUlBLGlDQUdDOzs7OztJQUZHLGlEQUE0Qjs7OztJQUM1QixrREFBd0M7O0FBRzVDO0lBR0ksc0JBQVksSUFBNEI7UUFDcEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUNMLG1CQUFDO0FBQUQsQ0FBQyxBQU5ELElBTUM7Ozs7SUFMRywrQkFBb0I7O0lBQ3BCLGdDQUFtQjs7QUFNdkI7SUFHSSxnQ0FBWSxJQUFzQztRQUM5QyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBQ0wsNkJBQUM7QUFBRCxDQUFDLEFBTkQsSUFNQzs7OztJQUxHLHdDQUFpQjs7SUFDakIseUNBQWlCOzs7OztBQU1yQjs7OztJQU9JLHdCQUFZLHFCQUFvRTtRQUU1RSxJQUFJLENBQUMsWUFBWSxHQUFHLHFCQUFxQixDQUFDO0lBQzlDLENBQUM7SUFDTCxxQkFBQztBQUFELENBQUMsQUFYRCxJQVdDOzs7Ozs7O0lBVkcsNkJBQVk7O0lBQ1osaUNBQStGOztJQUMvRixzQ0FBMkQ7O0lBQzNELDRCQUFZOztJQUNaLGlDQUFrQjs7SUFDbEIsa0NBQW1COztBQU92QjtJQUE0QyxrREFBYztJQUN0RCxnQ0FDSSxxQkFBb0U7UUFEeEUsWUFHSSxrQkFBTSxxQkFBcUIsQ0FBQyxTQUUvQjtRQURHLEtBQUksQ0FBQyxHQUFHLEdBQUcsa0JBQWtCLENBQUMsUUFBUSxDQUFDOztJQUMzQyxDQUFDO0lBQ0wsNkJBQUM7QUFBRCxDQUFDLEFBUEQsQ0FBNEMsY0FBYyxHQU96RDs7QUFFRDtJQUF5QywrQ0FBYztJQUNuRCw2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IHsgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IFZhbGlkYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi92YWxpZGF0aW9uLnNlcnZpY2UnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJVmFsaWRhdGlvbiB7XHJcbiAgICBjYWxsYmFjaygpOiBPYnNlcnZhYmxlPGFueT47XHJcbiAgICBnZXRFcnJvcnMoKTogT2JzZXJ2YWJsZTxTdW1tYXJ5RXJyb3JbXT47XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBTdW1tYXJ5RXJyb3Ige1xyXG4gICAgZWxlbWVudDogRWxlbWVudFJlZjtcclxuICAgIG1lc3NhZ2VzOiBzdHJpbmdbXTtcclxuICAgIGNvbnN0cnVjdG9yKGluaXQ/OiBQYXJ0aWFsPFN1bW1hcnlFcnJvcj4pIHtcclxuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIGluaXQpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVmFsaWRhdGlvblJ1bGVSZXNwb25zZSB7XHJcbiAgICBzdGF0dXM/OiBib29sZWFuO1xyXG4gICAgbWVzc2FnZT86IHN0cmluZztcclxuICAgIGNvbnN0cnVjdG9yKGluaXQ/OiBQYXJ0aWFsPFZhbGlkYXRpb25SdWxlUmVzcG9uc2U+KSB7XHJcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCBpbml0KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFZhbGlkYXRpb25SdWxlIHtcclxuICAgIGtleTogc3RyaW5nO1xyXG4gICAgZXhlY3V0ZTogKHZhbHVlPzogYW55LCBwYXlsb2FkPzogYW55LCByb3dJbmRleD86IG51bWJlcikgPT4gT2JzZXJ2YWJsZTxWYWxpZGF0aW9uUnVsZVJlc3BvbnNlPjtcclxuICAgIGVycm9yTWVzc2FnZTogKGVsZW1lbnQ/OiBhbnksIHJvd0luZGV4Pzogc3RyaW5nKSA9PiBzdHJpbmc7XHJcbiAgICBpZD86IHN0cmluZztcclxuICAgIGlzVmFsaWQ/OiBib29sZWFuO1xyXG4gICAgcmVxdWlyZWQ/OiBib29sZWFuO1xyXG4gICAgY29uc3RydWN0b3Iob3ZlcnJpZGVuRXJyb3JNZXNzYWdlPzogKGVsZW1lbnQ/OiBhbnksIHJvd0luZGV4Pzogc3RyaW5nKSA9PiBzdHJpbmdcclxuICAgICkge1xyXG4gICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlID0gb3ZlcnJpZGVuRXJyb3JNZXNzYWdlO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUmVxdWlyZWRWYWxpZGF0aW9uUnVsZSBleHRlbmRzIFZhbGlkYXRpb25SdWxlIHtcclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIG92ZXJyaWRlbkVycm9yTWVzc2FnZT86IChlbGVtZW50PzogYW55LCByb3dJbmRleD86IHN0cmluZykgPT4gc3RyaW5nXHJcbiAgICApIHtcclxuICAgICAgICBzdXBlcihvdmVycmlkZW5FcnJvck1lc3NhZ2UpO1xyXG4gICAgICAgIHRoaXMua2V5ID0gVmFsaWRhdGlvbkNvbnN0YW50LlJlcXVpcmVkO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRW1haWxWYWxpZGF0aW9uUnVsZSBleHRlbmRzIFZhbGlkYXRpb25SdWxlIHtcclxuICAgIGNvbnN0cnVjdG9yKG92ZXJyaWRlbkVycm9yTWVzc2FnZT86IChlbGVtZW50PzogYW55LCByb3dJbmRleD86IHN0cmluZykgPT4gc3RyaW5nXHJcbiAgICApIHtcclxuICAgICAgICBzdXBlcihvdmVycmlkZW5FcnJvck1lc3NhZ2UpO1xyXG4gICAgICAgIHRoaXMua2V5ID0gVmFsaWRhdGlvbkNvbnN0YW50LkVtYWlsO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUGhvbmVWYWxpZGF0aW9uUnVsZSBleHRlbmRzIFZhbGlkYXRpb25SdWxlIHtcclxuICAgIGNvbnN0cnVjdG9yKG92ZXJyaWRlbkVycm9yTWVzc2FnZT86IChlbGVtZW50PzogYW55LCByb3dJbmRleD86IHN0cmluZykgPT4gc3RyaW5nXHJcbiAgICApIHtcclxuICAgICAgICBzdXBlcihvdmVycmlkZW5FcnJvck1lc3NhZ2UpO1xyXG4gICAgICAgIHRoaXMua2V5ID0gVmFsaWRhdGlvbkNvbnN0YW50LlBob25lO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQ3VzdG9tVmFsaWRhdGlvblJ1bGUgZXh0ZW5kcyBWYWxpZGF0aW9uUnVsZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBleGVjdXRlOiAodmFsdWU/OiBhbnksIHBheWxvYWQ/OiBhbnksIHJvd0luZGV4PzogbnVtYmVyKSA9PiBPYnNlcnZhYmxlPFZhbGlkYXRpb25SdWxlUmVzcG9uc2U+LFxyXG4gICAgICAgIHJlcXVpcmVkPzogYm9vbGVhbixcclxuICAgICAgICBvdmVycmlkZW5FcnJvck1lc3NhZ2U/OiAoZWxlbWVudD86IGFueSwgcm93SW5kZXg/OiBzdHJpbmcpID0+IHN0cmluZyxcclxuICAgICAgICBpc1ZhbGlkPzogYm9vbGVhblxyXG4gICAgKSB7XHJcbiAgICAgICAgc3VwZXIob3ZlcnJpZGVuRXJyb3JNZXNzYWdlKTtcclxuICAgICAgICB0aGlzLmV4ZWN1dGUgPSBleGVjdXRlO1xyXG4gICAgICAgIHRoaXMua2V5ID0gVmFsaWRhdGlvbkNvbnN0YW50LkN1c3RvbTtcclxuICAgICAgICB0aGlzLmlzVmFsaWQgPSBpc1ZhbGlkO1xyXG4gICAgICAgIHRoaXMucmVxdWlyZWQgPSByZXF1aXJlZDtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFZhbGlkYXRpb25PcHRpb24ge1xyXG4gICAgdmFsaWRhdGlvbk5hbWU6IHN0cmluZztcclxuICAgIHJ1bGVzOiBWYWxpZGF0aW9uUnVsZVtdID0gW107XHJcbiAgICB2YWx1ZVJlc29sdmVyOiAoaXRlbTogYW55LCBwYXlsb2FkOiBhbnksIHJvd0luZGV4PzogbnVtYmVyKSA9PiBhbnkgfCBhbnlbXTtcclxuICAgIGl0ZW1SZWY/OiBhbnk7XHJcbiAgICBkaXNwbGF5VGV4dD86IHN0cmluZztcclxuICAgIHZhbGlkYXRpb25JZD86IHN0cmluZztcclxuICAgIHBheWxvYWRSZWY/OiAoKSA9PiBhbnk7XHJcbiAgICByZWxldmFudEZpZWxkczogKHBheWxvYWQ6IGFueSkgPT4gc3RyaW5nW107XHJcbiAgICBkeW5hbWljPzogYm9vbGVhbjtcclxuICAgIGRpcnR5Q2hlY2s6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgc2NvcGU/OiBzdHJpbmc7XHJcbiAgICBlcnJvclRhcmdldElkPzogc3RyaW5nO1xyXG4gICAgZXJyb3JNZXNzYWdlQ2xhc3M/OiBzdHJpbmcgPSBWYWxpZGF0aW9uQ29uc3RhbnQuRXJyb3JNZXNzYWdlQ2xhc3M7XHJcbiAgICBlcnJvckVsZW1lbnRDbGFzcz86IHN0cmluZyA9IFZhbGlkYXRpb25Db25zdGFudC5FcnJvckVsZW1lbnRDbGFzcztcclxuICAgIHN1Y2Nlc3NFbGVtZW50Q2xhc3M/OiBzdHJpbmcgPSBWYWxpZGF0aW9uQ29uc3RhbnQuU3VjY2Vzc0VsZW1lbnRDbGFzcztcclxuICAgIGNvbnN0cnVjdG9yKGluaXQ/OiBQYXJ0aWFsPFZhbGlkYXRpb25PcHRpb24+KSB7XHJcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCBpbml0KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIENsaWVudFZhbGlkYXRvciB7XHJcbiAgICBmb3JtUmVmOiBFbGVtZW50UmVmO1xyXG4gICAgb3B0aW9uczogVmFsaWRhdGlvbk9wdGlvbltdID0gW107XHJcbiAgICBwYXlsb2FkUmVmPzogKCkgPT4gYW55O1xyXG4gICAgc2NvcGU/OiBzdHJpbmc7XHJcbiAgICByZWxhdGVkVmFsaWRhdGlvblByb3ZpZGVycz86IFZhbGlkYXRpb25TZXJ2aWNlW10gPSBbXTtcclxuICAgIHJlcXVpcmVkTWVzc2FnZTogc3RyaW5nID0gVmFsaWRhdGlvbkNvbnN0YW50LnJlcXVpcmVkTWVzc2FnZTtcclxuICAgIGludmFsaWRNZXNzYWdlOiBzdHJpbmcgPSBWYWxpZGF0aW9uQ29uc3RhbnQuaW52YWxpZE1lc3NhZ2U7XHJcbiAgICBjb25zdHJ1Y3Rvcihpbml0PzogUGFydGlhbDxDbGllbnRWYWxpZGF0b3I+KSB7XHJcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCBpbml0KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIENoYW5nZWRJdGVtIHtcclxuICAgIGlkPzogc3RyaW5nO1xyXG4gICAgb2xkVmFsdWU/OiBhbnk7XHJcbiAgICB2YWx1ZT86IGFueTtcclxuICAgIGZpZWxkPzogc3RyaW5nO1xyXG4gICAgY2hhbmdlOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBjb25zdHJ1Y3Rvcihpbml0PzogUGFydGlhbDxDaGFuZ2VkSXRlbT4pIHtcclxuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIGluaXQpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVmFsaWRhdGlvbkNvbnN0YW50IHtcclxuICAgIHB1YmxpYyBzdGF0aWMgUmVxdWlyZWQ6IHN0cmluZyA9ICdSZXF1aXJlZCc7XHJcbiAgICBwdWJsaWMgc3RhdGljIEVtYWlsOiBzdHJpbmcgPSAnRW1haWwnO1xyXG4gICAgcHVibGljIHN0YXRpYyBQaG9uZTogc3RyaW5nID0gJ1Bob25lJztcclxuICAgIHB1YmxpYyBzdGF0aWMgQ3VzdG9tOiBzdHJpbmcgPSAnQ3VzdG9tJztcclxuICAgIHB1YmxpYyBzdGF0aWMgRXJyb3JNZXNzYWdlOiBzdHJpbmcgPSAnS2jDtG5nIGjhu6NwIGzhu4cgdnVpIGzDsm5nIHRo4butIGzhuqFpLic7XHJcbiAgICBwdWJsaWMgc3RhdGljIEVycm9yRWxlbWVudENsYXNzOiBzdHJpbmcgPSAnbmctaW52YWxpZCc7XHJcbiAgICBwdWJsaWMgc3RhdGljIFN1Y2Nlc3NFbGVtZW50Q2xhc3M6IHN0cmluZyA9ICduZy12YWxpZCc7XHJcbiAgICBwdWJsaWMgc3RhdGljIEVycm9yTWVzc2FnZUNsYXNzOiBzdHJpbmcgPSAndGV4dC1kYW5nZXInO1xyXG4gICAgcHVibGljIHN0YXRpYyBEZWZhdWx0RXJyb3JTdHlsZXM6IHN0cmluZyA9ICdwYWRkaW5nOjA7bGlzdC1zdHlsZTpub25lO2ZvbnQtd2VpZ2h0OjQwMDtmb250LXNpemU6MTNweDsgd2lkdGg6IDEwMCUnO1xyXG4gICAgcHVibGljIHN0YXRpYyBEZWZhdWx0RXJyb3JDbGFzczogc3RyaW5nID0gJ3ZhbGlkYXRpb24tZXJyb3InO1xyXG4gICAgcHVibGljIHN0YXRpYyBBdHRyaWJ1dGVOYW1lOiBzdHJpbmcgPSAndmFsaWRhdGlvbi1uYW1lJztcclxuICAgIHB1YmxpYyBzdGF0aWMgQXR0cmlidXRlT3B0aW9uTmFtZTogc3RyaW5nID0gJ2R5bmFtaWMtb3B0aW9uJztcclxuICAgIHB1YmxpYyBzdGF0aWMgQXR0cmlidXRlRHluYW1pY05hbWU6IHN0cmluZyA9ICdkeW5hbWljLXZhbGlkYXRpb24nO1xyXG4gICAgcHVibGljIHN0YXRpYyBFcnJvclRhcmdldElkOiBzdHJpbmcgPSAnZXJyb3ItdGFyZ2V0LWlkJztcclxuICAgIHB1YmxpYyBzdGF0aWMgRHluYW1pY0Vycm9yQXR0cmlidXRlOiBzdHJpbmcgPSAnZHluYW1pYy1lcnJvci1hdHRyaWJ1dGUnO1xyXG4gICAgcHVibGljIHN0YXRpYyBFUlJPUl9FTEVNRU5UX0lEID0gJ2Vycm9yLWVsZW1lbnQtaWQnO1xyXG4gICAgcHVibGljIHN0YXRpYyBFUlJPUl9JVEVNX0VMRU1FTlRfSUQgPSAnZXJyb3ItaXRlbS1lbGVtZW50LWlkJztcclxuICAgIHB1YmxpYyBzdGF0aWMgVkFMSURBVElPTl9JRCA9ICd2YWxpZGF0aW9uLWlkJztcclxuICAgIHB1YmxpYyBzdGF0aWMgQVJSQVlfU0VRVUVOQ0VfSUQgPSAnYXJyYXktc2VxdWVuY2UtaWQnO1xyXG4gICAgcHVibGljIHN0YXRpYyByZXF1aXJlZE1lc3NhZ2U6IHN0cmluZyA9ICdsw6AgYuG6r3QgYnXhu5ljJztcclxuICAgIHB1YmxpYyBzdGF0aWMgaW52YWxpZE1lc3NhZ2U6IHN0cmluZyA9ICdraMO0bmcgaOG7o3AgbOG7hyc7XHJcbn07XHJcbiJdfQ==