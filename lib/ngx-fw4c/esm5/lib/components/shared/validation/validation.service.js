/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable, RendererFactory2, EventEmitter, Output } from '@angular/core';
import { ValidationConstant, ChangedItem } from './validation.model';
import { Subscription, forkJoin, merge, of } from 'rxjs';
import { map, defaultIfEmpty, take } from 'rxjs/operators';
import { DataService, ActionService } from '../services';
import { ValidationProvider } from './validation.provider';
import * as i0 from "@angular/core";
import * as i1 from "./validation.provider";
import * as i2 from "../services/data.service";
import * as i3 from "../services/action.service";
var ValidationService = /** @class */ (function () {
    function ValidationService(rendererFactory, validationProvider, _dataService, _actionService) {
        this.rendererFactory = rendererFactory;
        this.validationProvider = validationProvider;
        this._dataService = _dataService;
        this._actionService = _actionService;
        this.onDestroy = new EventEmitter();
        this.elements = [];
        this.errClass = ValidationConstant.DefaultErrorClass;
        this.styles = ValidationConstant.DefaultErrorStyles;
        this.attributeName = ValidationConstant.AttributeName;
        this.relatedProviders = [];
        this.subscriptions = new Subscription();
        this.virtualValidationOptions = [];
        this.changedItems = [];
        this.renderer = rendererFactory.createRenderer(null, null);
    }
    /**
     * @return {?}
     */
    ValidationService.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.subscriptions.unsubscribe();
        this.onDestroy.emit();
    };
    /**
     * @param {?} model
     * @return {?}
     */
    ValidationService.prototype.init = /**
     * @param {?} model
     * @return {?}
     */
    function (model) {
        var _this = this;
        this.validator = model.validator;
        if (!this.validator.payloadRef)
            this.validator.payloadRef = (/**
             * @return {?}
             */
            function () { return {}; });
        if (this.validator.relatedValidationProviders) {
            this.addRelatedProviders(this.validator.relatedValidationProviders);
        }
        this.validator.options.forEach((/**
         * @param {?} option
         * @return {?}
         */
        function (option) {
            if (!option.displayText)
                option.displayText = option.validationName;
            if (!option.payloadRef)
                option.payloadRef = _this.validator.payloadRef;
            option.rules.forEach((/**
             * @param {?} action
             * @return {?}
             */
            function (action) {
                if (!action.id)
                    action.id = _this._dataService.newGuid();
                if (!action.errorMessage) {
                    switch (action.key) {
                        case ValidationConstant.Required: {
                            action.errorMessage = (/**
                             * @param {?} element
                             * @param {?} rowIndex
                             * @return {?}
                             */
                            function (element, rowIndex) {
                                /** @type {?} */
                                var displayingRowIndex = (+rowIndex + 1).toString();
                                return "" + option.displayText + (option.dynamic ? ' [' + displayingRowIndex + ']' : '') + " " + _this.validator.requiredMessage;
                            });
                            break;
                        }
                        default: {
                            action.errorMessage = (/**
                             * @return {?}
                             */
                            function () { return option.displayText + " " + _this.validator.invalidMessage; });
                            break;
                        }
                    }
                }
            }));
        }));
        this.virtualValidationOptions = this.validator.options.filter((/**
         * @param {?} x
         * @return {?}
         */
        function (x) { return x.dynamic; }));
        this.updateAsync();
    };
    /**
     * @param {?=} relatedProvidersToRegister
     * @return {?}
     */
    ValidationService.prototype.updateAsync = /**
     * @param {?=} relatedProvidersToRegister
     * @return {?}
     */
    function (relatedProvidersToRegister) {
        var _this = this;
        this._actionService.executeAsync((/**
         * @return {?}
         */
        function () {
            if (relatedProvidersToRegister && relatedProvidersToRegister.length) {
                _this.addRelatedProviders(relatedProvidersToRegister);
            }
            _this.registerElements();
            _this.registerEvents();
        }));
    };
    /**
     * @param {?} validCallback
     * @param {?=} invalidCallback
     * @return {?}
     */
    ValidationService.prototype.executeAsync = /**
     * @param {?} validCallback
     * @param {?=} invalidCallback
     * @return {?}
     */
    function (validCallback, invalidCallback) {
        this.retrieveSummaryErrors().subscribe((/**
         * @param {?} response
         * @return {?}
         */
        function (response) {
            if (!response || response.length == 0) {
                if (validCallback)
                    validCallback(response);
                return of(true);
            }
            else {
                if (invalidCallback)
                    invalidCallback(response);
            }
        }));
        return of(true);
    };
    /**
     * @param {?=} show
     * @param {?=} focus
     * @return {?}
     */
    ValidationService.prototype.isValid = /**
     * @param {?=} show
     * @param {?=} focus
     * @return {?}
     */
    function (show, focus) {
        var _this = this;
        if (show === void 0) { show = true; }
        if (focus === void 0) { focus = true; }
        if (show) {
            this.retrieveSummaryErrors().subscribe((/**
             * @param {?} errors
             * @return {?}
             */
            function (errors) {
                if (focus) {
                    if (errors && errors.length > 0) {
                        /** @type {?} */
                        var focusElement = errors[0];
                        /** @type {?} */
                        var el = (/** @type {?} */ (focusElement.element));
                        if (el) {
                            _this._actionService.executeAsync((/**
                             * @return {?}
                             */
                            function () {
                                el.focus();
                            }));
                        }
                    }
                }
            }));
        }
        /** @type {?} */
        var valid = true;
        if (this.validator.options) {
            this.validator.options.forEach((/**
             * @param {?} option
             * @return {?}
             */
            function (option) {
                if (option.rules) {
                    option.rules.forEach((/**
                     * @param {?} action
                     * @return {?}
                     */
                    function (action) {
                        if (!action.isValid) {
                            valid = false;
                        }
                    }));
                }
            }));
        }
        return valid;
    };
    /**
     * @param {?=} callback
     * @return {?}
     */
    ValidationService.prototype.handleErrors = /**
     * @param {?=} callback
     * @return {?}
     */
    function (callback) {
        this.retrieveSummaryErrors().subscribe((/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            if (callback)
                callback(res);
        }));
    };
    /**
     * @param {?=} callback
     * @return {?}
     */
    ValidationService.prototype.commit = /**
     * @param {?=} callback
     * @return {?}
     */
    function (callback) {
        return this.retrieveSummaryErrors().pipe(map((/**
         * @param {?} errors
         * @return {?}
         */
        function (errors) {
            if (callback)
                callback(errors);
            if (errors.length == 0)
                return true;
            return false;
        })), take(1));
    };
    /**
     * @param {?} element
     * @param {?} action
     * @param {?} option
     * @return {?}
     */
    ValidationService.prototype.setElementError = /**
     * @param {?} element
     * @param {?} action
     * @param {?} option
     * @return {?}
     */
    function (element, action, option) {
        if (!element)
            return;
        this.renderer.removeClass(element, ValidationConstant.SuccessElementClass);
        this.renderer.addClass(element, option.errorElementClass);
        /** @type {?} */
        var errorElement = this.findErrorElement(element);
        if (!errorElement) {
            errorElement = this.renderer.createElement('ul');
            this.renderer.setAttribute(errorElement, ValidationConstant.ERROR_ELEMENT_ID, "" + this._dataService.newGuid());
            this.renderer.setAttribute(errorElement, 'style', this.styles);
            this.renderer.addClass(errorElement, this.errClass);
            this.renderer.addClass(errorElement, option.errorMessageClass);
            /** @type {?} */
            var parentElement = this.renderer.parentNode(element);
            this.renderer.appendChild(parentElement, errorElement);
        }
        /** @type {?} */
        var errorItemElementKey = "" + action.id;
        /** @type {?} */
        var errorItemElement = this.findErrorItemElement(errorElement, errorItemElementKey);
        /** @type {?} */
        var dynamicSequenceId = this.findDynamicSequenceId(element);
        /** @type {?} */
        var errorMessage = action.errorMessage(element, dynamicSequenceId);
        if (!errorItemElement) {
            errorItemElement = this.renderer.createElement('li');
            this.renderer.setAttribute(errorItemElement, ValidationConstant.ERROR_ITEM_ELEMENT_ID, errorItemElementKey);
            this.renderer.appendChild(errorItemElement, this.renderer.createText(errorMessage));
            this.renderer.appendChild(errorElement, errorItemElement);
        }
        return errorMessage;
    };
    /**
     * @param {?} element
     * @param {?} action
     * @return {?}
     */
    ValidationService.prototype.clearErrorItemElement = /**
     * @param {?} element
     * @param {?} action
     * @return {?}
     */
    function (element, action) {
        /** @type {?} */
        var errorElement = this.findErrorElement(element);
        if (!errorElement)
            return;
        /** @type {?} */
        var errorItemElementKey = "" + action.id;
        /** @type {?} */
        var errorItemElement = this.findErrorItemElement(errorElement, errorItemElementKey);
        if (!errorItemElement)
            return;
        this.renderer.removeChild(errorElement, errorItemElement);
    };
    /**
     * @param {?=} callback
     * @return {?}
     */
    ValidationService.prototype.isDirty = /**
     * @param {?=} callback
     * @return {?}
     */
    function (callback) {
        if (!this.changedItems || this.changedItems.length == 0)
            return false;
        /** @type {?} */
        var response = this.changedItems.filter((/**
         * @param {?} s
         * @return {?}
         */
        function (s) { return s.change; }));
        if (callback)
            callback(response);
        return response.length > 0;
    };
    /**
     * @param {?} element
     * @param {?} option
     * @param {?=} all
     * @return {?}
     */
    ValidationService.prototype.validateElement = /**
     * @param {?} element
     * @param {?} option
     * @param {?=} all
     * @return {?}
     */
    function (element, option, all) {
        var _this = this;
        if (all === void 0) { all = false; }
        /** @type {?} */
        var payload = this.validator.payloadRef();
        /** @type {?} */
        var fieldValue = option.valueResolver ? option.valueResolver(payload) : null;
        /** @type {?} */
        var validatedActions$ = option.rules.map((/**
         * @param {?} action
         * @return {?}
         */
        function (action) {
            switch (action.key) {
                case ValidationConstant.Required: {
                    return _this.validationProvider.required(fieldValue).pipe(map((/**
                     * @param {?} isValid
                     * @return {?}
                     */
                    function (isValid) {
                        action.isValid = isValid;
                        return action;
                    })));
                }
                case ValidationConstant.Email: {
                    return _this.validationProvider.email(fieldValue).pipe(map((/**
                     * @param {?} isValid
                     * @return {?}
                     */
                    function (isValid) {
                        action.isValid = isValid;
                        return action;
                    })));
                }
                case ValidationConstant.Phone: {
                    return _this.validationProvider.phone(fieldValue).pipe(map((/**
                     * @param {?} isValid
                     * @return {?}
                     */
                    function (isValid) {
                        action.isValid = isValid;
                        return action;
                    })));
                }
                case ValidationConstant.Custom: {
                    if (!action.execute)
                        throw new Error('!action.execute');
                    if (!all) {
                        if (!fieldValue) {
                            action.isValid = true;
                            return of(action);
                        }
                        else {
                            /** @type {?} */
                            var requiredRule = option.rules.find((/**
                             * @param {?} s
                             * @return {?}
                             */
                            function (s) { return s.key == ValidationConstant.Required; }));
                            if (requiredRule) {
                                requiredRule.isValid = true;
                            }
                        }
                    }
                    /** @type {?} */
                    var sequenceId = _this.findDynamicSequenceId(element);
                    return action.execute(fieldValue, payload, +sequenceId)
                        .pipe(map((/**
                     * @param {?} response
                     * @return {?}
                     */
                    function (response) {
                        if (response) {
                            action.isValid = response.status;
                            if (response.message)
                                action.errorMessage = (/**
                                 * @return {?}
                                 */
                                function () { return response.message; });
                        }
                        return action;
                    })));
                }
                default: throw new Error("Unhandled action: " + action.key);
            }
        }));
        return forkJoin(validatedActions$).pipe(take(1), map((/**
         * @param {?} validatedActions
         * @return {?}
         */
        function (validatedActions) {
            if (option.relevantFields)
                _this.validateRelevantFields(option.relevantFields(payload));
            option.rules = validatedActions;
            return option;
        })));
    };
    /**
     * @private
     * @param {?=} relevantFields
     * @return {?}
     */
    ValidationService.prototype.validateRelevantFields = /**
     * @private
     * @param {?=} relevantFields
     * @return {?}
     */
    function (relevantFields) {
        var _this = this;
        if (!relevantFields || relevantFields.length == 0)
            return;
        if (relevantFields && relevantFields.length > 0) {
            relevantFields.forEach((/**
             * @param {?} item
             * @return {?}
             */
            function (item) {
                var _loop_1 = function (i) {
                    attributes = _this.elements[i].attributes;
                    if (attributes && attributes.length > 0) {
                        if (attributes[_this.attributeName].value == item) {
                            option = _this.findElementOption(_this.elements[i]);
                            if (option) {
                                _this.validateElement(_this.elements[i], option, true).pipe(map((/**
                                 * @param {?} newOption
                                 * @return {?}
                                 */
                                function (newOption) { return option = newOption; })), map((/**
                                 * @param {?} option
                                 * @return {?}
                                 */
                                function (option) { return _this.syncErrorMessages(_this.elements[i], option); }))).subscribe();
                            }
                            return "break";
                        }
                    }
                };
                var attributes, option;
                for (var i = 0; i < _this.elements.length; i++) {
                    var state_1 = _loop_1(i);
                    if (state_1 === "break")
                        break;
                }
            }));
        }
    };
    /**
     * @private
     * @return {?}
     */
    ValidationService.prototype.retrieveSummaryErrors = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var errors$ = this.elements.map((/**
         * @param {?} element
         * @return {?}
         */
        function (element) {
            /** @type {?} */
            var validationOption = _this.findElementOption(element);
            if (!validationOption)
                return;
            return _this.validateElement(element, validationOption).pipe(map((/**
             * @param {?} newOption
             * @return {?}
             */
            function (newOption) { return validationOption = newOption; })), map((/**
             * @param {?} option
             * @return {?}
             */
            function (option) { return _this.syncErrorMessages(element, option); })));
        }));
        /** @type {?} */
        var errorBatch = forkJoin(errors$);
        /** @type {?} */
        var relatedErrors = (/** @type {?} */ (this.relatedProviders.reduce((/**
         * @param {?} previous
         * @param {?} provider
         * @return {?}
         */
        function (previous, provider) {
            /** @type {?} */
            var subErrors$ = provider.retrieveSummaryErrors();
            return merge(previous, subErrors$);
        }), of([]))));
        return forkJoin(errorBatch, relatedErrors).pipe(defaultIfEmpty([[], []]), map((/**
         * @param {?} value
         * @return {?}
         */
        function (value) { return tslib_1.__spread(value[0], value[1]); })), map((/**
         * @param {?} result
         * @return {?}
         */
        function (result) { return [].concat(result.filter((/**
         * @param {?} error
         * @return {?}
         */
        function (error) { return error; }))); })));
    };
    /**
     * @private
     * @param {?} element
     * @return {?}
     */
    ValidationService.prototype.findElementOption = /**
     * @private
     * @param {?} element
     * @return {?}
     */
    function (element) {
        /** @type {?} */
        var validationIdAttribute = element.attributes[ValidationConstant.VALIDATION_ID];
        if (!validationIdAttribute)
            return null;
        /** @type {?} */
        var validationId = validationIdAttribute.value;
        if (!validationId)
            return null;
        return this.validator.options.find((/**
         * @param {?} option
         * @return {?}
         */
        function (option) { return option.validationId === validationId; }));
    };
    /**
     * @private
     * @param {?} errorElement
     * @param {?} key
     * @return {?}
     */
    ValidationService.prototype.findErrorItemElement = /**
     * @private
     * @param {?} errorElement
     * @param {?} key
     * @return {?}
     */
    function (errorElement, key) {
        /** @type {?} */
        var children = (/** @type {?} */ (Array.from(errorElement.children)));
        return children
            .filter((/**
         * @param {?} x
         * @return {?}
         */
        function (x) { return x.attributes[ValidationConstant.ERROR_ITEM_ELEMENT_ID]; }))
            .find((/**
         * @param {?} x
         * @return {?}
         */
        function (x) { return x.attributes[ValidationConstant.ERROR_ITEM_ELEMENT_ID].value === key; }));
    };
    /**
     * @private
     * @param {?} element
     * @return {?}
     */
    ValidationService.prototype.findDynamicSequenceId = /**
     * @private
     * @param {?} element
     * @return {?}
     */
    function (element) {
        /** @type {?} */
        var sequenceIdAttribute = element.attributes[ValidationConstant.ARRAY_SEQUENCE_ID];
        if (!sequenceIdAttribute)
            return null;
        /** @type {?} */
        var sequenceId = sequenceIdAttribute.value;
        if (!sequenceId)
            return null;
        return sequenceId;
    };
    /**
     * @private
     * @param {?} element
     * @return {?}
     */
    ValidationService.prototype.findErrorElement = /**
     * @private
     * @param {?} element
     * @return {?}
     */
    function (element) {
        if (element.parentElement && element.parentElement.children) {
            /** @type {?} */
            var slibings = (/** @type {?} */ (Array.from(element.parentElement.children)));
            /** @type {?} */
            var result = slibings.filter((/**
             * @param {?} x
             * @return {?}
             */
            function (x) { return x.attributes; })).find((/**
             * @param {?} x
             * @return {?}
             */
            function (x) { return x.attributes[ValidationConstant.ERROR_ELEMENT_ID]; }));
            return result;
        }
        return null;
    };
    /**
     * @private
     * @return {?}
     */
    ValidationService.prototype.registerElements = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var nonDynamicOptions = this.validator.options.filter((/**
         * @param {?} x
         * @return {?}
         */
        function (x) { return !x.dynamic; }));
        /** @type {?} */
        var nonDynamicElements = nonDynamicOptions.reduce((/**
         * @param {?} previous
         * @param {?} current
         * @return {?}
         */
        function (previous, current) {
            /** @type {?} */
            var query = "*[" + _this.attributeName + "=\"" + current.validationName + "\"]";
            if (_this.validator.scope) {
                query += "[scope=\"" + _this.validator.scope + "\"]";
            }
            /** @type {?} */
            var elements = (/** @type {?} */ (Array.from(_this.validator.formRef.nativeElement.querySelectorAll(query))));
            elements.forEach((/**
             * @param {?} element
             * @return {?}
             */
            function (element) {
                /** @type {?} */
                var validationId = _this._dataService.newGuid();
                _this.renderer.setAttribute(element, ValidationConstant.VALIDATION_ID, validationId);
                current.validationId = validationId;
            }));
            return previous.concat(elements);
        }), []);
        /** @type {?} */
        var generatedDynamicOptions = [];
        /** @type {?} */
        var dynamicElements = [];
        this.validator.options = this.validator.options.filter((/**
         * @param {?} x
         * @return {?}
         */
        function (x) { return !x.dynamic; }));
        this.virtualValidationOptions.forEach((/**
         * @param {?} current
         * @return {?}
         */
        function (current) {
            /** @type {?} */
            var query = "*[" + _this.attributeName + "=\"" + current.validationName + "\"]";
            if (_this.validator.scope) {
                query += "[scope=\"" + _this.validator.scope + "\"]";
            }
            /** @type {?} */
            var elements = Array.from(_this.validator.formRef.nativeElement.querySelectorAll(query));
            /** @type {?} */
            var clonedOptions = elements.map((/**
             * @param {?} element
             * @param {?} index
             * @return {?}
             */
            function (element, index) {
                /** @type {?} */
                var validationId = _this._dataService.newGuid();
                _this.renderer.setAttribute(element, ValidationConstant.VALIDATION_ID, validationId);
                _this.renderer.setAttribute(element, ValidationConstant.ARRAY_SEQUENCE_ID, index.toString());
                return tslib_1.__assign({}, current, { validationId: validationId, valueResolver: current.valueResolver
                        ? (/**
                         * @param {?} payload
                         * @return {?}
                         */
                        function (payload) { return current.valueResolver(payload, index); })
                        : (/**
                         * @return {?}
                         */
                        function () { return ((/** @type {?} */ (element))).value; }) });
            }));
            dynamicElements.push.apply(dynamicElements, tslib_1.__spread(elements));
            generatedDynamicOptions.push.apply(generatedDynamicOptions, tslib_1.__spread(clonedOptions));
        }));
        this.validator.options = nonDynamicOptions.concat(generatedDynamicOptions);
        this.elements = nonDynamicElements.concat(dynamicElements);
        if (this.elements) {
            this.changedItems = [];
            this.elements.forEach((/**
             * @param {?} element
             * @return {?}
             */
            function (element) {
                /** @type {?} */
                var payload = _this.validator.payloadRef();
                /** @type {?} */
                var elementOption = _this.findElementOption(element);
                _this.changedItems.push(new ChangedItem({
                    id: elementOption.validationId,
                    field: elementOption.validationName,
                    oldValue: elementOption.valueResolver ? elementOption.valueResolver(payload) : null
                }));
            }));
        }
    };
    /**
     * @private
     * @return {?}
     */
    ValidationService.prototype.registerEvents = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.elements.filter((/**
         * @param {?} element
         * @return {?}
         */
        function (element) { return element.attributes[_this.attributeName]; })).forEach((/**
         * @param {?} element
         * @return {?}
         */
        function (element) {
            if (!element.focusoutListener) {
                element.focusoutListener = _this.renderer.listen(element, 'focusout', (/**
                 * @return {?}
                 */
                function () {
                    _this.handleBlurEvent(element);
                }));
                element.focusoutListener = _this.renderer.listen(element, 'change', (/**
                 * @param {?} $event
                 * @return {?}
                 */
                function ($event) {
                    /** @type {?} */
                    var payload = _this.validator.payloadRef();
                    /** @type {?} */
                    var elementOption = _this.findElementOption(element);
                    /** @type {?} */
                    var value = elementOption.valueResolver ? elementOption.valueResolver(payload) : null;
                    if (elementOption && elementOption.dirtyCheck) {
                        /** @type {?} */
                        var currentItem = _this.changedItems.find((/**
                         * @param {?} s
                         * @return {?}
                         */
                        function (s) { return s.id == elementOption.validationId; }));
                        if (!currentItem) {
                            _this.changedItems.push(new ChangedItem({
                                id: elementOption.validationId,
                                field: elementOption.validationName,
                                value: value,
                                change: true
                            }));
                        }
                        else {
                            currentItem.value = value;
                            if (currentItem.oldValue == undefined || currentItem.oldValue == '') {
                                if (value == undefined || value == '') {
                                    currentItem.change = false;
                                }
                                else {
                                    currentItem.change = true;
                                }
                            }
                            else {
                                if (value == undefined || value == '') {
                                    currentItem.change = true;
                                }
                                else {
                                    if (currentItem.oldValue.toString() != currentItem.value.toString()) {
                                        currentItem.change = true;
                                    }
                                    else {
                                        currentItem.change = false;
                                    }
                                }
                            }
                        }
                    }
                }));
            }
        }));
    };
    /**
     * @private
     * @param {?} element
     * @return {?}
     */
    ValidationService.prototype.handleBlurEvent = /**
     * @private
     * @param {?} element
     * @return {?}
     */
    function (element) {
        var _this = this;
        /** @type {?} */
        var elementOption = this.findElementOption(element);
        if (!elementOption)
            throw new Error('!elementOption');
        this.validateElement(element, elementOption).pipe(take(1)).subscribe((/**
         * @param {?} newOption
         * @return {?}
         */
        function (newOption) {
            elementOption = newOption;
            _this.syncErrorMessages(element, elementOption);
        }));
    };
    /**
     * @private
     * @param {?} element
     * @param {?} option
     * @return {?}
     */
    ValidationService.prototype.syncErrorMessages = /**
     * @private
     * @param {?} element
     * @param {?} option
     * @return {?}
     */
    function (element, option) {
        var _this = this;
        /** @type {?} */
        var errorMessages = [];
        option.rules.forEach((/**
         * @param {?} action
         * @return {?}
         */
        function (action) {
            if (action.isValid) {
                _this.clearErrorItemElement(element, action);
            }
            else {
                /** @type {?} */
                var errorMessage = _this.setElementError(element, action, option);
                errorMessages.push(errorMessage);
            }
        }));
        /** @type {?} */
        var invalidActions = option.rules.filter((/**
         * @param {?} x
         * @return {?}
         */
        function (x) { return !x.isValid; }));
        if (invalidActions.length === 0) {
            this.renderer.removeClass(element, option.errorElementClass);
            this.renderer.removeClass(element, option.successElementClass);
            return null;
        }
        return {
            element: element,
            messages: errorMessages
        };
    };
    /**
     * @private
     * @param {?} providers
     * @return {?}
     */
    ValidationService.prototype.addRelatedProviders = /**
     * @private
     * @param {?} providers
     * @return {?}
     */
    function (providers) {
        var _a;
        var _this = this;
        /** @type {?} */
        var newProviders = providers.filter((/**
         * @param {?} x
         * @return {?}
         */
        function (x) { return _this.relatedProviders.indexOf(x) < 0; }));
        newProviders.forEach((/**
         * @param {?} provider
         * @return {?}
         */
        function (provider) {
            return provider.onDestroy.subscribe((/**
             * @return {?}
             */
            function () {
                _this.relatedProviders = _this.relatedProviders.filter((/**
                 * @return {?}
                 */
                function () { return _this.relatedProviders.indexOf(provider) < 0; }));
            }));
        }));
        (_a = this.relatedProviders).push.apply(_a, tslib_1.__spread(newProviders));
    };
    ValidationService.decorators = [
        { type: Injectable, args: [{ providedIn: 'root' },] }
    ];
    /** @nocollapse */
    ValidationService.ctorParameters = function () { return [
        { type: RendererFactory2 },
        { type: ValidationProvider },
        { type: DataService },
        { type: ActionService }
    ]; };
    ValidationService.propDecorators = {
        onDestroy: [{ type: Output }]
    };
    /** @nocollapse */ ValidationService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function ValidationService_Factory() { return new ValidationService(i0.ɵɵinject(i0.RendererFactory2), i0.ɵɵinject(i1.ValidationProvider), i0.ɵɵinject(i2.DataService), i0.ɵɵinject(i3.ActionService)); }, token: ValidationService, providedIn: "root" });
    return ValidationService;
}());
export { ValidationService };
if (false) {
    /** @type {?} */
    ValidationService.prototype.onDestroy;
    /**
     * @type {?}
     * @private
     */
    ValidationService.prototype.elements;
    /**
     * @type {?}
     * @private
     */
    ValidationService.prototype.validator;
    /**
     * @type {?}
     * @private
     */
    ValidationService.prototype.errClass;
    /**
     * @type {?}
     * @private
     */
    ValidationService.prototype.styles;
    /**
     * @type {?}
     * @private
     */
    ValidationService.prototype.attributeName;
    /**
     * @type {?}
     * @private
     */
    ValidationService.prototype.renderer;
    /**
     * @type {?}
     * @private
     */
    ValidationService.prototype.relatedProviders;
    /**
     * @type {?}
     * @private
     */
    ValidationService.prototype.subscriptions;
    /**
     * @type {?}
     * @private
     */
    ValidationService.prototype.virtualValidationOptions;
    /**
     * @type {?}
     * @private
     */
    ValidationService.prototype.changedItems;
    /**
     * @type {?}
     * @protected
     */
    ValidationService.prototype.rendererFactory;
    /**
     * @type {?}
     * @protected
     */
    ValidationService.prototype.validationProvider;
    /**
     * @type {?}
     * @private
     */
    ValidationService.prototype._dataService;
    /**
     * @type {?}
     * @private
     */
    ValidationService.prototype._actionService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWZ3NGMvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9zaGFyZWQvdmFsaWRhdGlvbi92YWxpZGF0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQWEsVUFBVSxFQUFFLGdCQUFnQixFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDOUYsT0FBTyxFQUFxQyxrQkFBa0IsRUFBZ0MsV0FBVyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDdEksT0FBTyxFQUFFLFlBQVksRUFBYyxRQUFRLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNyRSxPQUFPLEVBQUUsR0FBRyxFQUFFLGNBQWMsRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzRCxPQUFPLEVBQUUsV0FBVyxFQUFFLGFBQWEsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUN6RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQzs7Ozs7QUFFM0Q7SUFjSSwyQkFDYyxlQUFpQyxFQUNqQyxrQkFBc0MsRUFDeEMsWUFBeUIsRUFDekIsY0FBNkI7UUFIM0Isb0JBQWUsR0FBZixlQUFlLENBQWtCO1FBQ2pDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFDeEMsaUJBQVksR0FBWixZQUFZLENBQWE7UUFDekIsbUJBQWMsR0FBZCxjQUFjLENBQWU7UUFoQnhCLGNBQVMsR0FBdUIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUM1RCxhQUFRLEdBQWMsRUFBRSxDQUFDO1FBRXpCLGFBQVEsR0FBVyxrQkFBa0IsQ0FBQyxpQkFBaUIsQ0FBQztRQUN4RCxXQUFNLEdBQVcsa0JBQWtCLENBQUMsa0JBQWtCLENBQUM7UUFDdkQsa0JBQWEsR0FBVyxrQkFBa0IsQ0FBQyxhQUFhLENBQUM7UUFFekQscUJB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LFlBQVksQ0FBQyxPQUFPOzs7O1FBQUMsVUFBQSxRQUFRO1lBQ3pCLE9BQUEsUUFBUSxDQUFDLFNBQVMsQ0FBQyxTQUFTOzs7WUFBQztnQkFDekIsS0FBSSxDQUFDLGdCQUFnQixHQUFHLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNOzs7Z0JBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUEzQyxDQUEyQyxFQUFDLENBQUM7WUFDNUcsQ0FBQyxFQUFDO1FBRkYsQ0FFRSxFQUFDLENBQUM7UUFDUixDQUFBLEtBQUEsSUFBSSxDQUFDLGdCQUFnQixDQUFBLENBQUMsSUFBSSw0QkFBSSxZQUFZLEdBQUU7SUFDaEQsQ0FBQzs7Z0JBaGRKLFVBQVUsU0FBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUU7Ozs7Z0JBUEYsZ0JBQWdCO2dCQUt2QyxrQkFBa0I7Z0JBRGxCLFdBQVc7Z0JBQUUsYUFBYTs7OzRCQUs5QixNQUFNOzs7NEJBVFg7Q0F3ZEMsQUFqZEQsSUFpZEM7U0FoZFksaUJBQWlCOzs7SUFDMUIsc0NBQW9FOzs7OztJQUNwRSxxQ0FBaUM7Ozs7O0lBQ2pDLHNDQUFtQzs7Ozs7SUFDbkMscUNBQWdFOzs7OztJQUNoRSxtQ0FBK0Q7Ozs7O0lBQy9ELDBDQUFpRTs7Ozs7SUFDakUscUNBQTRCOzs7OztJQUM1Qiw2Q0FBbUQ7Ozs7O0lBQ25ELDBDQUF5RDs7Ozs7SUFDekQscURBQTBEOzs7OztJQUMxRCx5Q0FBeUM7Ozs7O0lBR3JDLDRDQUEyQzs7Ozs7SUFDM0MsK0NBQWdEOzs7OztJQUNoRCx5Q0FBaUM7Ozs7O0lBQ2pDLDJDQUFxQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlbmRlcmVyMiwgSW5qZWN0YWJsZSwgUmVuZGVyZXJGYWN0b3J5MiwgRXZlbnRFbWl0dGVyLCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgVmFsaWRhdGlvbk9wdGlvbiwgQ2xpZW50VmFsaWRhdG9yLCBWYWxpZGF0aW9uQ29uc3RhbnQsIFN1bW1hcnlFcnJvciwgVmFsaWRhdGlvblJ1bGUsIENoYW5nZWRJdGVtIH0gZnJvbSAnLi92YWxpZGF0aW9uLm1vZGVsJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCBPYnNlcnZhYmxlLCBmb3JrSm9pbiwgbWVyZ2UsIG9mIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IG1hcCwgZGVmYXVsdElmRW1wdHksIHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IERhdGFTZXJ2aWNlLCBBY3Rpb25TZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMnO1xyXG5pbXBvcnQgeyBWYWxpZGF0aW9uUHJvdmlkZXIgfSBmcm9tICcuL3ZhbGlkYXRpb24ucHJvdmlkZXInO1xyXG5cclxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcclxuZXhwb3J0IGNsYXNzIFZhbGlkYXRpb25TZXJ2aWNlIHtcclxuICAgIEBPdXRwdXQoKSBwdWJsaWMgb25EZXN0cm95OiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICBwcml2YXRlIGVsZW1lbnRzOiBFbGVtZW50W10gPSBbXTtcclxuICAgIHByaXZhdGUgdmFsaWRhdG9yOiBDbGllbnRWYWxpZGF0b3I7XHJcbiAgICBwcml2YXRlIGVyckNsYXNzOiBzdHJpbmcgPSBWYWxpZGF0aW9uQ29uc3RhbnQuRGVmYXVsdEVycm9yQ2xhc3M7XHJcbiAgICBwcml2YXRlIHN0eWxlczogc3RyaW5nID0gVmFsaWRhdGlvbkNvbnN0YW50LkRlZmF1bHRFcnJvclN0eWxlcztcclxuICAgIHByaXZhdGUgYXR0cmlidXRlTmFtZTogc3RyaW5nID0gVmFsaWRhdGlvbkNvbnN0YW50LkF0dHJpYnV0ZU5hbWU7XHJcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjI7XHJcbiAgICBwcml2YXRlIHJlbGF0ZWRQcm92aWRlcnM6IFZhbGlkYXRpb25TZXJ2aWNlW10gPSBbXTtcclxuICAgIHByaXZhdGUgc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpO1xyXG4gICAgcHJpdmF0ZSB2aXJ0dWFsVmFsaWRhdGlvbk9wdGlvbnM6IFZhbGlkYXRpb25PcHRpb25bXSA9IFtdO1xyXG4gICAgcHJpdmF0ZSBjaGFuZ2VkSXRlbXM6IENoYW5nZWRJdGVtW10gPSBbXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcm90ZWN0ZWQgcmVuZGVyZXJGYWN0b3J5OiBSZW5kZXJlckZhY3RvcnkyLFxyXG4gICAgICAgIHByb3RlY3RlZCB2YWxpZGF0aW9uUHJvdmlkZXI6IFZhbGlkYXRpb25Qcm92aWRlcixcclxuICAgICAgICBwcml2YXRlIF9kYXRhU2VydmljZTogRGF0YVNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBfYWN0aW9uU2VydmljZTogQWN0aW9uU2VydmljZVxyXG4gICAgKSB7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlciA9IHJlbmRlcmVyRmFjdG9yeS5jcmVhdGVSZW5kZXJlcihudWxsLCBudWxsKTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uRGVzdHJveSgpIHtcclxuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMudW5zdWJzY3JpYmUoKTtcclxuICAgICAgICB0aGlzLm9uRGVzdHJveS5lbWl0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGluaXQobW9kZWw6IHsgdmFsaWRhdG9yOiBDbGllbnRWYWxpZGF0b3IgfSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMudmFsaWRhdG9yID0gbW9kZWwudmFsaWRhdG9yO1xyXG4gICAgICAgIGlmICghdGhpcy52YWxpZGF0b3IucGF5bG9hZFJlZikgdGhpcy52YWxpZGF0b3IucGF5bG9hZFJlZiA9ICgpID0+IHsgcmV0dXJuIHt9IH07XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnZhbGlkYXRvci5yZWxhdGVkVmFsaWRhdGlvblByb3ZpZGVycykge1xyXG4gICAgICAgICAgICB0aGlzLmFkZFJlbGF0ZWRQcm92aWRlcnModGhpcy52YWxpZGF0b3IucmVsYXRlZFZhbGlkYXRpb25Qcm92aWRlcnMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy52YWxpZGF0b3Iub3B0aW9ucy5mb3JFYWNoKG9wdGlvbiA9PiB7XHJcbiAgICAgICAgICAgIGlmICghb3B0aW9uLmRpc3BsYXlUZXh0KSBvcHRpb24uZGlzcGxheVRleHQgPSBvcHRpb24udmFsaWRhdGlvbk5hbWU7XHJcbiAgICAgICAgICAgIGlmICghb3B0aW9uLnBheWxvYWRSZWYpIG9wdGlvbi5wYXlsb2FkUmVmID0gdGhpcy52YWxpZGF0b3IucGF5bG9hZFJlZjtcclxuICAgICAgICAgICAgb3B0aW9uLnJ1bGVzLmZvckVhY2goYWN0aW9uID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghYWN0aW9uLmlkKSBhY3Rpb24uaWQgPSB0aGlzLl9kYXRhU2VydmljZS5uZXdHdWlkKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWFjdGlvbi5lcnJvck1lc3NhZ2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGFjdGlvbi5rZXkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBWYWxpZGF0aW9uQ29uc3RhbnQuUmVxdWlyZWQ6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbi5lcnJvck1lc3NhZ2UgPSAoZWxlbWVudDogRWxlbWVudCwgcm93SW5kZXg6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRpc3BsYXlpbmdSb3dJbmRleCA9ICgrcm93SW5kZXggKyAxKS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBgJHtvcHRpb24uZGlzcGxheVRleHR9JHtvcHRpb24uZHluYW1pYyA/ICcgWycgKyBkaXNwbGF5aW5nUm93SW5kZXggKyAnXScgOiAnJ30gJHt0aGlzLnZhbGlkYXRvci5yZXF1aXJlZE1lc3NhZ2V9YDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb24uZXJyb3JNZXNzYWdlID0gKCkgPT4gYCR7b3B0aW9uLmRpc3BsYXlUZXh0fSAke3RoaXMudmFsaWRhdG9yLmludmFsaWRNZXNzYWdlfWA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy52aXJ0dWFsVmFsaWRhdGlvbk9wdGlvbnMgPSB0aGlzLnZhbGlkYXRvci5vcHRpb25zLmZpbHRlcih4ID0+IHguZHluYW1pYyk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVBc3luYygpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGVBc3luYyhyZWxhdGVkUHJvdmlkZXJzVG9SZWdpc3Rlcj86IFZhbGlkYXRpb25TZXJ2aWNlW10pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9hY3Rpb25TZXJ2aWNlLmV4ZWN1dGVBc3luYygoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChyZWxhdGVkUHJvdmlkZXJzVG9SZWdpc3RlciAmJiByZWxhdGVkUHJvdmlkZXJzVG9SZWdpc3Rlci5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkUmVsYXRlZFByb3ZpZGVycyhyZWxhdGVkUHJvdmlkZXJzVG9SZWdpc3Rlcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5yZWdpc3RlckVsZW1lbnRzKCk7XHJcbiAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudHMoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZXhlY3V0ZUFzeW5jKHZhbGlkQ2FsbGJhY2s6IChlcnJvcnM/OiBTdW1tYXJ5RXJyb3JbXSkgPT4gYW55LCBpbnZhbGlkQ2FsbGJhY2s/OiAoZXJyb3JzPzogU3VtbWFyeUVycm9yW10pID0+IGFueSk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xyXG4gICAgICAgIHRoaXMucmV0cmlldmVTdW1tYXJ5RXJyb3JzKCkuc3Vic2NyaWJlKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodmFsaWRDYWxsYmFjaykgdmFsaWRDYWxsYmFjayhyZXNwb25zZSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb2YodHJ1ZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW52YWxpZENhbGxiYWNrKSBpbnZhbGlkQ2FsbGJhY2socmVzcG9uc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIG9mKHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpc1ZhbGlkKHNob3c6IGJvb2xlYW4gPSB0cnVlLCBmb2N1czogYm9vbGVhbiA9IHRydWUpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAoc2hvdykge1xyXG4gICAgICAgICAgICB0aGlzLnJldHJpZXZlU3VtbWFyeUVycm9ycygpLnN1YnNjcmliZSgoZXJyb3JzOiBTdW1tYXJ5RXJyb3JbXSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGZvY3VzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9ycyAmJiBlcnJvcnMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZm9jdXNFbGVtZW50ID0gZXJyb3JzWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZWwgPSA8YW55PmZvY3VzRWxlbWVudC5lbGVtZW50O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2FjdGlvblNlcnZpY2UuZXhlY3V0ZUFzeW5jKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbC5mb2N1cygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHZhbGlkID0gdHJ1ZTtcclxuICAgICAgICBpZiAodGhpcy52YWxpZGF0b3Iub3B0aW9ucykge1xyXG4gICAgICAgICAgICB0aGlzLnZhbGlkYXRvci5vcHRpb25zLmZvckVhY2goKG9wdGlvbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbi5ydWxlcykge1xyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbi5ydWxlcy5mb3JFYWNoKChhY3Rpb24pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFhY3Rpb24uaXNWYWxpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHZhbGlkO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBoYW5kbGVFcnJvcnMoY2FsbGJhY2s/OiAocmVzcG9uc2U6IFN1bW1hcnlFcnJvcltdKSA9PiB2b2lkKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5yZXRyaWV2ZVN1bW1hcnlFcnJvcnMoKS5zdWJzY3JpYmUoKHJlcykgPT4ge1xyXG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrKHJlcyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNvbW1pdChjYWxsYmFjaz86IEZ1bmN0aW9uKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmV0cmlldmVTdW1tYXJ5RXJyb3JzKCkucGlwZShcclxuICAgICAgICAgICAgbWFwKGVycm9ycyA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrKGVycm9ycyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3JzLmxlbmd0aCA9PSAwKSByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfSksIHRha2UoMSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRFbGVtZW50RXJyb3IoZWxlbWVudDogRWxlbWVudCwgYWN0aW9uOiBWYWxpZGF0aW9uUnVsZSwgb3B0aW9uOiBWYWxpZGF0aW9uT3B0aW9uKTogc3RyaW5nIHtcclxuICAgICAgICBpZiAoIWVsZW1lbnQpIHJldHVybjtcclxuICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKGVsZW1lbnQsIFZhbGlkYXRpb25Db25zdGFudC5TdWNjZXNzRWxlbWVudENsYXNzKTtcclxuICAgICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGVsZW1lbnQsIG9wdGlvbi5lcnJvckVsZW1lbnRDbGFzcyk7XHJcbiAgICAgICAgbGV0IGVycm9yRWxlbWVudCA9IHRoaXMuZmluZEVycm9yRWxlbWVudChlbGVtZW50KTtcclxuICAgICAgICBpZiAoIWVycm9yRWxlbWVudCkge1xyXG4gICAgICAgICAgICBlcnJvckVsZW1lbnQgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKGVycm9yRWxlbWVudCwgVmFsaWRhdGlvbkNvbnN0YW50LkVSUk9SX0VMRU1FTlRfSUQsIGAke3RoaXMuX2RhdGFTZXJ2aWNlLm5ld0d1aWQoKX1gKTtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUoZXJyb3JFbGVtZW50LCAnc3R5bGUnLCB0aGlzLnN0eWxlcyk7XHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoZXJyb3JFbGVtZW50LCB0aGlzLmVyckNsYXNzKTtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhlcnJvckVsZW1lbnQsIG9wdGlvbi5lcnJvck1lc3NhZ2VDbGFzcyk7XHJcbiAgICAgICAgICAgIGNvbnN0IHBhcmVudEVsZW1lbnQgPSB0aGlzLnJlbmRlcmVyLnBhcmVudE5vZGUoZWxlbWVudCk7XHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQocGFyZW50RWxlbWVudCwgZXJyb3JFbGVtZW50KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGVycm9ySXRlbUVsZW1lbnRLZXk6IHN0cmluZyA9IGAke2FjdGlvbi5pZH1gO1xyXG4gICAgICAgIGxldCBlcnJvckl0ZW1FbGVtZW50ID0gdGhpcy5maW5kRXJyb3JJdGVtRWxlbWVudChlcnJvckVsZW1lbnQsIGVycm9ySXRlbUVsZW1lbnRLZXkpO1xyXG4gICAgICAgIGNvbnN0IGR5bmFtaWNTZXF1ZW5jZUlkID0gdGhpcy5maW5kRHluYW1pY1NlcXVlbmNlSWQoZWxlbWVudCk7XHJcbiAgICAgICAgY29uc3QgZXJyb3JNZXNzYWdlID0gYWN0aW9uLmVycm9yTWVzc2FnZShlbGVtZW50LCBkeW5hbWljU2VxdWVuY2VJZCk7XHJcblxyXG4gICAgICAgIGlmICghZXJyb3JJdGVtRWxlbWVudCkge1xyXG4gICAgICAgICAgICBlcnJvckl0ZW1FbGVtZW50ID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdsaScpO1xyXG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZShlcnJvckl0ZW1FbGVtZW50LCBWYWxpZGF0aW9uQ29uc3RhbnQuRVJST1JfSVRFTV9FTEVNRU5UX0lELCBlcnJvckl0ZW1FbGVtZW50S2V5KTtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChlcnJvckl0ZW1FbGVtZW50LCB0aGlzLnJlbmRlcmVyLmNyZWF0ZVRleHQoZXJyb3JNZXNzYWdlKSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKGVycm9yRWxlbWVudCwgZXJyb3JJdGVtRWxlbWVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBlcnJvck1lc3NhZ2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsZWFyRXJyb3JJdGVtRWxlbWVudChlbGVtZW50OiBhbnksIGFjdGlvbjogVmFsaWRhdGlvblJ1bGUpIHtcclxuICAgICAgICBsZXQgZXJyb3JFbGVtZW50ID0gdGhpcy5maW5kRXJyb3JFbGVtZW50KGVsZW1lbnQpO1xyXG4gICAgICAgIGlmICghZXJyb3JFbGVtZW50KSByZXR1cm47XHJcblxyXG4gICAgICAgIGNvbnN0IGVycm9ySXRlbUVsZW1lbnRLZXk6IHN0cmluZyA9IGAke2FjdGlvbi5pZH1gO1xyXG4gICAgICAgIGxldCBlcnJvckl0ZW1FbGVtZW50ID0gdGhpcy5maW5kRXJyb3JJdGVtRWxlbWVudChlcnJvckVsZW1lbnQsIGVycm9ySXRlbUVsZW1lbnRLZXkpO1xyXG4gICAgICAgIGlmICghZXJyb3JJdGVtRWxlbWVudCkgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2hpbGQoZXJyb3JFbGVtZW50LCBlcnJvckl0ZW1FbGVtZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaXNEaXJ0eShjYWxsYmFjaz86IChpdGVtczogQ2hhbmdlZEl0ZW1bXSkgPT4gdm9pZCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmICghdGhpcy5jaGFuZ2VkSXRlbXMgfHwgdGhpcy5jaGFuZ2VkSXRlbXMubGVuZ3RoID09IDApIHJldHVybiBmYWxzZTtcclxuICAgICAgICB2YXIgcmVzcG9uc2UgPSB0aGlzLmNoYW5nZWRJdGVtcy5maWx0ZXIocyA9PiBzLmNoYW5nZSk7XHJcbiAgICAgICAgaWYgKGNhbGxiYWNrKSBjYWxsYmFjayhyZXNwb25zZSk7XHJcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmxlbmd0aCA+IDA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHZhbGlkYXRlRWxlbWVudChlbGVtZW50OiBhbnksIG9wdGlvbjogVmFsaWRhdGlvbk9wdGlvbiwgYWxsOiBib29sZWFuID0gZmFsc2UpOiBPYnNlcnZhYmxlPFZhbGlkYXRpb25PcHRpb24+IHtcclxuICAgICAgICBjb25zdCBwYXlsb2FkID0gdGhpcy52YWxpZGF0b3IucGF5bG9hZFJlZigpO1xyXG4gICAgICAgIGNvbnN0IGZpZWxkVmFsdWUgPSBvcHRpb24udmFsdWVSZXNvbHZlciA/IG9wdGlvbi52YWx1ZVJlc29sdmVyKHBheWxvYWQpIDogbnVsbDtcclxuICAgICAgICBjb25zdCB2YWxpZGF0ZWRBY3Rpb25zJCA9IG9wdGlvbi5ydWxlcy5tYXAoYWN0aW9uID0+IHtcclxuICAgICAgICAgICAgc3dpdGNoIChhY3Rpb24ua2V5KSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFZhbGlkYXRpb25Db25zdGFudC5SZXF1aXJlZDoge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRpb25Qcm92aWRlci5yZXF1aXJlZChmaWVsZFZhbHVlKS5waXBlKG1hcChpc1ZhbGlkID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uLmlzVmFsaWQgPSBpc1ZhbGlkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWN0aW9uO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNhc2UgVmFsaWRhdGlvbkNvbnN0YW50LkVtYWlsOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudmFsaWRhdGlvblByb3ZpZGVyLmVtYWlsKGZpZWxkVmFsdWUpLnBpcGUobWFwKGlzVmFsaWQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb24uaXNWYWxpZCA9IGlzVmFsaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhY3Rpb247XHJcbiAgICAgICAgICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2FzZSBWYWxpZGF0aW9uQ29uc3RhbnQuUGhvbmU6IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy52YWxpZGF0aW9uUHJvdmlkZXIucGhvbmUoZmllbGRWYWx1ZSkucGlwZShtYXAoaXNWYWxpZCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbi5pc1ZhbGlkID0gaXNWYWxpZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFjdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjYXNlIFZhbGlkYXRpb25Db25zdGFudC5DdXN0b206IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWFjdGlvbi5leGVjdXRlKSB0aHJvdyBuZXcgRXJyb3IoJyFhY3Rpb24uZXhlY3V0ZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghYWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZmllbGRWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uLmlzVmFsaWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9mKGFjdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVxdWlyZWRSdWxlID0gb3B0aW9uLnJ1bGVzLmZpbmQocyA9PiBzLmtleSA9PSBWYWxpZGF0aW9uQ29uc3RhbnQuUmVxdWlyZWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcXVpcmVkUnVsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVpcmVkUnVsZS5pc1ZhbGlkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzZXF1ZW5jZUlkID0gdGhpcy5maW5kRHluYW1pY1NlcXVlbmNlSWQoZWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFjdGlvbi5leGVjdXRlKGZpZWxkVmFsdWUsIHBheWxvYWQsICtzZXF1ZW5jZUlkKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucGlwZShtYXAocmVzcG9uc2UgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uLmlzVmFsaWQgPSByZXNwb25zZS5zdGF0dXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLm1lc3NhZ2UpIGFjdGlvbi5lcnJvck1lc3NhZ2UgPSAoKSA9PiB7IHJldHVybiByZXNwb25zZS5tZXNzYWdlOyB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFjdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDogdGhyb3cgbmV3IEVycm9yKGBVbmhhbmRsZWQgYWN0aW9uOiAke2FjdGlvbi5rZXl9YCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGZvcmtKb2luKHZhbGlkYXRlZEFjdGlvbnMkKS5waXBlKFxyXG4gICAgICAgICAgICB0YWtlKDEpLFxyXG4gICAgICAgICAgICBtYXAodmFsaWRhdGVkQWN0aW9ucyA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAob3B0aW9uLnJlbGV2YW50RmllbGRzKSB0aGlzLnZhbGlkYXRlUmVsZXZhbnRGaWVsZHMob3B0aW9uLnJlbGV2YW50RmllbGRzKHBheWxvYWQpKTtcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5ydWxlcyA9IHZhbGlkYXRlZEFjdGlvbnM7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb3B0aW9uO1xyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdmFsaWRhdGVSZWxldmFudEZpZWxkcyhyZWxldmFudEZpZWxkcz86IHN0cmluZ1tdKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCFyZWxldmFudEZpZWxkcyB8fCByZWxldmFudEZpZWxkcy5sZW5ndGggPT0gMCkgcmV0dXJuO1xyXG4gICAgICAgIGlmIChyZWxldmFudEZpZWxkcyAmJiByZWxldmFudEZpZWxkcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHJlbGV2YW50RmllbGRzLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgYXR0cmlidXRlcyA9IHRoaXMuZWxlbWVudHNbaV0uYXR0cmlidXRlcztcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYXR0cmlidXRlcyAmJiBhdHRyaWJ1dGVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGF0dHJpYnV0ZXNbdGhpcy5hdHRyaWJ1dGVOYW1lXS52YWx1ZSA9PSBpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgb3B0aW9uID0gdGhpcy5maW5kRWxlbWVudE9wdGlvbih0aGlzLmVsZW1lbnRzW2ldKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnZhbGlkYXRlRWxlbWVudCh0aGlzLmVsZW1lbnRzW2ldLCBvcHRpb24sIHRydWUpLnBpcGUoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcChuZXdPcHRpb24gPT4gb3B0aW9uID0gbmV3T3B0aW9uKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFwKG9wdGlvbiA9PiB0aGlzLnN5bmNFcnJvck1lc3NhZ2VzKHRoaXMuZWxlbWVudHNbaV0sIG9wdGlvbikpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkuc3Vic2NyaWJlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmV0cmlldmVTdW1tYXJ5RXJyb3JzKCk6IE9ic2VydmFibGU8U3VtbWFyeUVycm9yW10+IHtcclxuICAgICAgICBjb25zdCBlcnJvcnMkID0gdGhpcy5lbGVtZW50cy5tYXAoZWxlbWVudCA9PiB7XHJcbiAgICAgICAgICAgIGxldCB2YWxpZGF0aW9uT3B0aW9uID0gdGhpcy5maW5kRWxlbWVudE9wdGlvbihlbGVtZW50KTtcclxuICAgICAgICAgICAgaWYgKCF2YWxpZGF0aW9uT3B0aW9uKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy52YWxpZGF0ZUVsZW1lbnQoZWxlbWVudCwgdmFsaWRhdGlvbk9wdGlvbikucGlwZShcclxuICAgICAgICAgICAgICAgIG1hcChuZXdPcHRpb24gPT4gdmFsaWRhdGlvbk9wdGlvbiA9IG5ld09wdGlvbiksXHJcbiAgICAgICAgICAgICAgICBtYXAob3B0aW9uID0+IHRoaXMuc3luY0Vycm9yTWVzc2FnZXMoZWxlbWVudCwgb3B0aW9uKSksXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGVycm9yQmF0Y2ggPSBmb3JrSm9pbihlcnJvcnMkKTtcclxuICAgICAgICBjb25zdCByZWxhdGVkRXJyb3JzID0gPE9ic2VydmFibGU8U3VtbWFyeUVycm9yW10+PnRoaXMucmVsYXRlZFByb3ZpZGVycy5yZWR1Y2UoKHByZXZpb3VzOiBPYnNlcnZhYmxlPFN1bW1hcnlFcnJvcltdPiwgcHJvdmlkZXI6IFZhbGlkYXRpb25TZXJ2aWNlKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHN1YkVycm9ycyQgPSBwcm92aWRlci5yZXRyaWV2ZVN1bW1hcnlFcnJvcnMoKTtcclxuICAgICAgICAgICAgcmV0dXJuIG1lcmdlKHByZXZpb3VzLCBzdWJFcnJvcnMkKTtcclxuICAgICAgICB9LCBvZihbXSkpO1xyXG5cclxuICAgICAgICByZXR1cm4gZm9ya0pvaW4oZXJyb3JCYXRjaCwgcmVsYXRlZEVycm9ycykucGlwZShcclxuICAgICAgICAgICAgZGVmYXVsdElmRW1wdHkoW1tdLCBbXV0pLFxyXG4gICAgICAgICAgICBtYXAodmFsdWUgPT4gWy4uLnZhbHVlWzBdLCAuLi52YWx1ZVsxXV0pLFxyXG4gICAgICAgICAgICBtYXAocmVzdWx0ID0+IFtdLmNvbmNhdChyZXN1bHQuZmlsdGVyKGVycm9yID0+IGVycm9yKSkpLFxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBmaW5kRWxlbWVudE9wdGlvbihlbGVtZW50OiBFbGVtZW50KTogVmFsaWRhdGlvbk9wdGlvbiB8IG51bGwge1xyXG4gICAgICAgIGNvbnN0IHZhbGlkYXRpb25JZEF0dHJpYnV0ZSA9IGVsZW1lbnQuYXR0cmlidXRlc1tWYWxpZGF0aW9uQ29uc3RhbnQuVkFMSURBVElPTl9JRF07XHJcbiAgICAgICAgaWYgKCF2YWxpZGF0aW9uSWRBdHRyaWJ1dGUpIHJldHVybiBudWxsO1xyXG5cclxuICAgICAgICBjb25zdCB2YWxpZGF0aW9uSWQgPSB2YWxpZGF0aW9uSWRBdHRyaWJ1dGUudmFsdWU7XHJcbiAgICAgICAgaWYgKCF2YWxpZGF0aW9uSWQpIHJldHVybiBudWxsO1xyXG4gICAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRvci5vcHRpb25zLmZpbmQob3B0aW9uID0+IG9wdGlvbi52YWxpZGF0aW9uSWQgPT09IHZhbGlkYXRpb25JZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBmaW5kRXJyb3JJdGVtRWxlbWVudChlcnJvckVsZW1lbnQ6IGFueSwga2V5OiBzdHJpbmcpOiBhbnkgfCBudWxsIHtcclxuICAgICAgICBjb25zdCBjaGlsZHJlbiA9IDxFbGVtZW50W10+QXJyYXkuZnJvbShlcnJvckVsZW1lbnQuY2hpbGRyZW4pO1xyXG4gICAgICAgIHJldHVybiBjaGlsZHJlblxyXG4gICAgICAgICAgICAuZmlsdGVyKHggPT4geC5hdHRyaWJ1dGVzW1ZhbGlkYXRpb25Db25zdGFudC5FUlJPUl9JVEVNX0VMRU1FTlRfSURdKVxyXG4gICAgICAgICAgICAuZmluZCh4ID0+IHguYXR0cmlidXRlc1tWYWxpZGF0aW9uQ29uc3RhbnQuRVJST1JfSVRFTV9FTEVNRU5UX0lEXS52YWx1ZSA9PT0ga2V5KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGZpbmREeW5hbWljU2VxdWVuY2VJZChlbGVtZW50OiBFbGVtZW50KTogc3RyaW5nIHwgbnVsbCB7XHJcbiAgICAgICAgY29uc3Qgc2VxdWVuY2VJZEF0dHJpYnV0ZSA9IGVsZW1lbnQuYXR0cmlidXRlc1tWYWxpZGF0aW9uQ29uc3RhbnQuQVJSQVlfU0VRVUVOQ0VfSURdO1xyXG4gICAgICAgIGlmICghc2VxdWVuY2VJZEF0dHJpYnV0ZSkgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgICAgIGNvbnN0IHNlcXVlbmNlSWQgPSBzZXF1ZW5jZUlkQXR0cmlidXRlLnZhbHVlO1xyXG4gICAgICAgIGlmICghc2VxdWVuY2VJZCkgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgcmV0dXJuIHNlcXVlbmNlSWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBmaW5kRXJyb3JFbGVtZW50KGVsZW1lbnQ6IEVsZW1lbnQpOiBFbGVtZW50IHtcclxuICAgICAgICBpZiAoZWxlbWVudC5wYXJlbnRFbGVtZW50ICYmIGVsZW1lbnQucGFyZW50RWxlbWVudC5jaGlsZHJlbikge1xyXG4gICAgICAgICAgICBjb25zdCBzbGliaW5ncyA9IDxFbGVtZW50W10+QXJyYXkuZnJvbShlbGVtZW50LnBhcmVudEVsZW1lbnQuY2hpbGRyZW4pO1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gc2xpYmluZ3MuZmlsdGVyKHggPT4geC5hdHRyaWJ1dGVzKS5maW5kKHggPT4geC5hdHRyaWJ1dGVzW1ZhbGlkYXRpb25Db25zdGFudC5FUlJPUl9FTEVNRU5UX0lEXSk7XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVnaXN0ZXJFbGVtZW50cygpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBub25EeW5hbWljT3B0aW9ucyA9IHRoaXMudmFsaWRhdG9yLm9wdGlvbnMuZmlsdGVyKHggPT4gIXguZHluYW1pYyk7XHJcbiAgICAgICAgY29uc3Qgbm9uRHluYW1pY0VsZW1lbnRzID0gbm9uRHluYW1pY09wdGlvbnMucmVkdWNlKChwcmV2aW91czogRWxlbWVudFtdLCBjdXJyZW50OiBWYWxpZGF0aW9uT3B0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBxdWVyeSA9IGAqWyR7dGhpcy5hdHRyaWJ1dGVOYW1lfT1cIiR7Y3VycmVudC52YWxpZGF0aW9uTmFtZX1cIl1gO1xyXG4gICAgICAgICAgICBpZiAodGhpcy52YWxpZGF0b3Iuc2NvcGUpIHtcclxuICAgICAgICAgICAgICAgIHF1ZXJ5ICs9IGBbc2NvcGU9XCIke3RoaXMudmFsaWRhdG9yLnNjb3BlfVwiXWA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3QgZWxlbWVudHMgPSA8RWxlbWVudFtdPkFycmF5LmZyb20odGhpcy52YWxpZGF0b3IuZm9ybVJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwocXVlcnkpKTtcclxuICAgICAgICAgICAgZWxlbWVudHMuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHZhbGlkYXRpb25JZCA9IHRoaXMuX2RhdGFTZXJ2aWNlLm5ld0d1aWQoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKGVsZW1lbnQsIFZhbGlkYXRpb25Db25zdGFudC5WQUxJREFUSU9OX0lELCB2YWxpZGF0aW9uSWQpO1xyXG4gICAgICAgICAgICAgICAgY3VycmVudC52YWxpZGF0aW9uSWQgPSB2YWxpZGF0aW9uSWQ7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gcHJldmlvdXMuY29uY2F0KGVsZW1lbnRzKTtcclxuICAgICAgICB9LCBbXSk7XHJcblxyXG4gICAgICAgIGxldCBnZW5lcmF0ZWREeW5hbWljT3B0aW9ucyA9IFtdO1xyXG4gICAgICAgIGxldCBkeW5hbWljRWxlbWVudHMgPSBbXTtcclxuICAgICAgICB0aGlzLnZhbGlkYXRvci5vcHRpb25zID0gdGhpcy52YWxpZGF0b3Iub3B0aW9ucy5maWx0ZXIoeCA9PiAheC5keW5hbWljKTtcclxuICAgICAgICB0aGlzLnZpcnR1YWxWYWxpZGF0aW9uT3B0aW9ucy5mb3JFYWNoKChjdXJyZW50OiBWYWxpZGF0aW9uT3B0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBxdWVyeSA9IGAqWyR7dGhpcy5hdHRyaWJ1dGVOYW1lfT1cIiR7Y3VycmVudC52YWxpZGF0aW9uTmFtZX1cIl1gO1xyXG4gICAgICAgICAgICBpZiAodGhpcy52YWxpZGF0b3Iuc2NvcGUpIHtcclxuICAgICAgICAgICAgICAgIHF1ZXJ5ICs9IGBbc2NvcGU9XCIke3RoaXMudmFsaWRhdG9yLnNjb3BlfVwiXWA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3QgZWxlbWVudHMgPSBBcnJheS5mcm9tKHRoaXMudmFsaWRhdG9yLmZvcm1SZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKHF1ZXJ5KSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGNsb25lZE9wdGlvbnMgPSBlbGVtZW50cy5tYXAoKGVsZW1lbnQsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB2YWxpZGF0aW9uSWQgPSB0aGlzLl9kYXRhU2VydmljZS5uZXdHdWlkKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZShlbGVtZW50LCBWYWxpZGF0aW9uQ29uc3RhbnQuVkFMSURBVElPTl9JRCwgdmFsaWRhdGlvbklkKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKGVsZW1lbnQsIFZhbGlkYXRpb25Db25zdGFudC5BUlJBWV9TRVFVRU5DRV9JRCwgaW5kZXgudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC4uLmN1cnJlbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvbklkOiB2YWxpZGF0aW9uSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVSZXNvbHZlcjogY3VycmVudC52YWx1ZVJlc29sdmVyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgID8gKHBheWxvYWQ6IGFueSkgPT4gY3VycmVudC52YWx1ZVJlc29sdmVyKHBheWxvYWQsIGluZGV4KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA6ICgpID0+IHsgcmV0dXJuICg8YW55PmVsZW1lbnQpLnZhbHVlOyB9XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgZHluYW1pY0VsZW1lbnRzLnB1c2goLi4uZWxlbWVudHMpO1xyXG4gICAgICAgICAgICBnZW5lcmF0ZWREeW5hbWljT3B0aW9ucy5wdXNoKC4uLmNsb25lZE9wdGlvbnMpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnZhbGlkYXRvci5vcHRpb25zID0gbm9uRHluYW1pY09wdGlvbnMuY29uY2F0KGdlbmVyYXRlZER5bmFtaWNPcHRpb25zKTtcclxuICAgICAgICB0aGlzLmVsZW1lbnRzID0gbm9uRHluYW1pY0VsZW1lbnRzLmNvbmNhdChkeW5hbWljRWxlbWVudHMpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5lbGVtZW50cykge1xyXG4gICAgICAgICAgICB0aGlzLmNoYW5nZWRJdGVtcyA9IFtdO1xyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnRzLmZvckVhY2goKGVsZW1lbnQpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHBheWxvYWQgPSB0aGlzLnZhbGlkYXRvci5wYXlsb2FkUmVmKCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgZWxlbWVudE9wdGlvbiA9IHRoaXMuZmluZEVsZW1lbnRPcHRpb24oZWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZWRJdGVtcy5wdXNoKG5ldyBDaGFuZ2VkSXRlbSh7XHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6IGVsZW1lbnRPcHRpb24udmFsaWRhdGlvbklkLFxyXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkOiBlbGVtZW50T3B0aW9uLnZhbGlkYXRpb25OYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIG9sZFZhbHVlOiBlbGVtZW50T3B0aW9uLnZhbHVlUmVzb2x2ZXIgPyBlbGVtZW50T3B0aW9uLnZhbHVlUmVzb2x2ZXIocGF5bG9hZCkgOiBudWxsXHJcbiAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlZ2lzdGVyRXZlbnRzKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZWxlbWVudHMuZmlsdGVyKGVsZW1lbnQgPT4gZWxlbWVudC5hdHRyaWJ1dGVzW3RoaXMuYXR0cmlidXRlTmFtZV0pLmZvckVhY2goKGVsZW1lbnQ6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIWVsZW1lbnQuZm9jdXNvdXRMaXN0ZW5lcikge1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5mb2N1c291dExpc3RlbmVyID0gdGhpcy5yZW5kZXJlci5saXN0ZW4oZWxlbWVudCwgJ2ZvY3Vzb3V0JywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlQmx1ckV2ZW50KGVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LmZvY3Vzb3V0TGlzdGVuZXIgPSB0aGlzLnJlbmRlcmVyLmxpc3RlbihlbGVtZW50LCAnY2hhbmdlJywgKCRldmVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBheWxvYWQgPSB0aGlzLnZhbGlkYXRvci5wYXlsb2FkUmVmKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGVsZW1lbnRPcHRpb24gPSB0aGlzLmZpbmRFbGVtZW50T3B0aW9uKGVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IGVsZW1lbnRPcHRpb24udmFsdWVSZXNvbHZlciA/IGVsZW1lbnRPcHRpb24udmFsdWVSZXNvbHZlcihwYXlsb2FkKSA6IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVsZW1lbnRPcHRpb24gJiYgZWxlbWVudE9wdGlvbi5kaXJ0eUNoZWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjdXJyZW50SXRlbSA9IHRoaXMuY2hhbmdlZEl0ZW1zLmZpbmQocyA9PiBzLmlkID09IGVsZW1lbnRPcHRpb24udmFsaWRhdGlvbklkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFjdXJyZW50SXRlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VkSXRlbXMucHVzaChuZXcgQ2hhbmdlZEl0ZW0oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBlbGVtZW50T3B0aW9uLnZhbGlkYXRpb25JZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWVsZDogZWxlbWVudE9wdGlvbi52YWxpZGF0aW9uTmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdmFsdWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50SXRlbS52YWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRJdGVtLm9sZFZhbHVlID09IHVuZGVmaW5lZCB8fCBjdXJyZW50SXRlbS5vbGRWYWx1ZSA9PSAnJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PSB1bmRlZmluZWQgfHwgdmFsdWUgPT0gJycpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudEl0ZW0uY2hhbmdlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudEl0ZW0uY2hhbmdlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PSB1bmRlZmluZWQgfHwgdmFsdWUgPT0gJycpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudEl0ZW0uY2hhbmdlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudEl0ZW0ub2xkVmFsdWUudG9TdHJpbmcoKSAhPSBjdXJyZW50SXRlbS52YWx1ZS50b1N0cmluZygpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50SXRlbS5jaGFuZ2UgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRJdGVtLmNoYW5nZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGhhbmRsZUJsdXJFdmVudChlbGVtZW50OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBsZXQgZWxlbWVudE9wdGlvbiA9IHRoaXMuZmluZEVsZW1lbnRPcHRpb24oZWxlbWVudCk7XHJcbiAgICAgICAgaWYgKCFlbGVtZW50T3B0aW9uKSB0aHJvdyBuZXcgRXJyb3IoJyFlbGVtZW50T3B0aW9uJyk7XHJcblxyXG4gICAgICAgIHRoaXMudmFsaWRhdGVFbGVtZW50KGVsZW1lbnQsIGVsZW1lbnRPcHRpb24pLnBpcGUodGFrZSgxKSkuc3Vic2NyaWJlKG5ld09wdGlvbiA9PiB7XHJcbiAgICAgICAgICAgIGVsZW1lbnRPcHRpb24gPSBuZXdPcHRpb247XHJcbiAgICAgICAgICAgIHRoaXMuc3luY0Vycm9yTWVzc2FnZXMoZWxlbWVudCwgZWxlbWVudE9wdGlvbik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzeW5jRXJyb3JNZXNzYWdlcyhlbGVtZW50OiBhbnksIG9wdGlvbjogVmFsaWRhdGlvbk9wdGlvbik6IFN1bW1hcnlFcnJvciB8IG51bGwge1xyXG4gICAgICAgIGxldCBlcnJvck1lc3NhZ2VzOiBzdHJpbmdbXSA9IFtdO1xyXG4gICAgICAgIG9wdGlvbi5ydWxlcy5mb3JFYWNoKGFjdGlvbiA9PiB7XHJcbiAgICAgICAgICAgIGlmIChhY3Rpb24uaXNWYWxpZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbGVhckVycm9ySXRlbUVsZW1lbnQoZWxlbWVudCwgYWN0aW9uKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGVycm9yTWVzc2FnZSA9IHRoaXMuc2V0RWxlbWVudEVycm9yKGVsZW1lbnQsIGFjdGlvbiwgb3B0aW9uKTtcclxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZXMucHVzaChlcnJvck1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGludmFsaWRBY3Rpb25zID0gb3B0aW9uLnJ1bGVzLmZpbHRlcih4ID0+ICF4LmlzVmFsaWQpO1xyXG4gICAgICAgIGlmIChpbnZhbGlkQWN0aW9ucy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyhlbGVtZW50LCBvcHRpb24uZXJyb3JFbGVtZW50Q2xhc3MpO1xyXG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKGVsZW1lbnQsIG9wdGlvbi5zdWNjZXNzRWxlbWVudENsYXNzKTtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBlbGVtZW50OiBlbGVtZW50LFxyXG4gICAgICAgICAgICBtZXNzYWdlczogZXJyb3JNZXNzYWdlc1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFkZFJlbGF0ZWRQcm92aWRlcnMocHJvdmlkZXJzOiBWYWxpZGF0aW9uU2VydmljZVtdKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IG5ld1Byb3ZpZGVycyA9IHByb3ZpZGVycy5maWx0ZXIoeCA9PiB0aGlzLnJlbGF0ZWRQcm92aWRlcnMuaW5kZXhPZih4KSA8IDApO1xyXG4gICAgICAgIG5ld1Byb3ZpZGVycy5mb3JFYWNoKHByb3ZpZGVyID0+XHJcbiAgICAgICAgICAgIHByb3ZpZGVyLm9uRGVzdHJveS5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZWxhdGVkUHJvdmlkZXJzID0gdGhpcy5yZWxhdGVkUHJvdmlkZXJzLmZpbHRlcigoKSA9PiB0aGlzLnJlbGF0ZWRQcm92aWRlcnMuaW5kZXhPZihwcm92aWRlcikgPCAwKTtcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgIHRoaXMucmVsYXRlZFByb3ZpZGVycy5wdXNoKC4uLm5ld1Byb3ZpZGVycyk7XHJcbiAgICB9XHJcbn0iXX0=