/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable, RendererFactory2, EventEmitter, Output } from '@angular/core';
import { ValidationConstant, ChangedItem } from './validation.model';
import { Subscription, forkJoin, merge, of } from 'rxjs';
import { map, defaultIfEmpty, take } from 'rxjs/operators';
import { DataService } from '../services/data.service';
import { ValidationProvider } from './validation.provider';
import { ActionService } from '../services/action.service';
import { AggregatorService } from '../services/aggregator.service';
import * as i0 from "@angular/core";
import * as i1 from "./validation.provider";
import * as i2 from "../services/data.service";
import * as i3 from "../services/action.service";
import * as i4 from "../services/aggregator.service";
var ValidationService = /** @class */ (function () {
    function ValidationService(rendererFactory, validationProvider, _dataService, _actionService, _aggregatorService) {
        this.rendererFactory = rendererFactory;
        this.validationProvider = validationProvider;
        this._dataService = _dataService;
        this._actionService = _actionService;
        this._aggregatorService = _aggregatorService;
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
     * @param {?} key
     * @return {?}
     */
    ValidationService.prototype.setKey = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        if (!this.key)
            this.key = key;
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
                _this._aggregatorService.publish(_this.key, errors);
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
                /** @type {?} */
                var payload = _this.validator.payloadRef();
                /** @type {?} */
                var fieldValue = option.valueResolver ? option.valueResolver(payload) : null;
                if (option.rules) {
                    option.rules.forEach((/**
                     * @param {?} action
                     * @return {?}
                     */
                    function (action) {
                        if (action.isValid != true) {
                            if (action.isValid == false) {
                                valid = false;
                            }
                            else {
                                if (fieldValue)
                                    valid = false;
                            }
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
                    if (!all && !action.required) {
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
                    if (elementOption && elementOption.rules) {
                        elementOption.rules.forEach((/**
                         * @param {?} rule
                         * @return {?}
                         */
                        function (rule) {
                            rule.isValid = false;
                        }));
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
        { type: ActionService },
        { type: AggregatorService }
    ]; };
    ValidationService.propDecorators = {
        onDestroy: [{ type: Output }]
    };
    /** @nocollapse */ ValidationService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function ValidationService_Factory() { return new ValidationService(i0.ɵɵinject(i0.RendererFactory2), i0.ɵɵinject(i1.ValidationProvider), i0.ɵɵinject(i2.DataService), i0.ɵɵinject(i3.ActionService), i0.ɵɵinject(i4.AggregatorService)); }, token: ValidationService, providedIn: "root" });
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
     * @private
     */
    ValidationService.prototype.key;
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
    /**
     * @type {?}
     * @private
     */
    ValidationService.prototype._aggregatorService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWZ3NGMvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9zaGFyZWQvdmFsaWRhdGlvbi92YWxpZGF0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQWEsVUFBVSxFQUFFLGdCQUFnQixFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDOUYsT0FBTyxFQUFxQyxrQkFBa0IsRUFBZ0MsV0FBVyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDdEksT0FBTyxFQUFFLFlBQVksRUFBYyxRQUFRLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNyRSxPQUFPLEVBQUUsR0FBRyxFQUFFLGNBQWMsRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzNELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDOzs7Ozs7QUFFbkU7SUFlSSwyQkFDYyxlQUFpQyxFQUNqQyxrQkFBc0MsRUFDeEMsWUFBeUIsRUFDekIsY0FBNkIsRUFDN0Isa0JBQXFDO1FBSm5DLG9CQUFlLEdBQWYsZUFBZSxDQUFrQjtRQUNqQyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBQ3hDLGlCQUFZLEdBQVosWUFBWSxDQUFhO1FBQ3pCLG1CQUFjLEdBQWQsY0FBYyxDQUFlO1FBQzdCLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBbUI7UUFsQmhDLGNBQVMsR0FBdUIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUM1RCxhQUFRLEdBQWMsRUFBRSxDQUFDO1FB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QUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUEzQyxDQUEyQyxFQUFDLENBQUM7WUFDNUcsQ0FBQyxFQUFDO1FBRkYsQ0FFRSxFQUFDLENBQUM7UUFDUixDQUFBLEtBQUEsSUFBSSxDQUFDLGdCQUFnQixDQUFBLENBQUMsSUFBSSw0QkFBSSxZQUFZLEdBQUU7SUFDaEQsQ0FBQzs7Z0JBbGVKLFVBQVUsU0FBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUU7Ozs7Z0JBVEYsZ0JBQWdCO2dCQUt2QyxrQkFBa0I7Z0JBRGxCLFdBQVc7Z0JBRVgsYUFBYTtnQkFDYixpQkFBaUI7Ozs0QkFJckIsTUFBTTs7OzRCQVhYO0NBNGVDLEFBbmVELElBbWVDO1NBbGVZLGlCQUFpQjs7O0lBQzFCLHNDQUFvRTs7Ozs7SUFDcEUscUNBQWlDOzs7OztJQUNqQyxzQ0FBbUM7Ozs7O0lBQ25DLHFDQUFnRTs7Ozs7SUFDaEUsbUNBQStEOzs7OztJQUMvRCwwQ0FBaUU7Ozs7O0lBQ2pFLHFDQUE0Qjs7Ozs7SUFDNUIsNkNBQW1EOzs7OztJQUNuRCwwQ0FBeUQ7Ozs7O0lBQ3pELHFEQUEwRDs7Ozs7SUFDMUQseUNBQXlDOzs7OztJQUN6QyxnQ0FBb0I7Ozs7O0lBR2hCLDRDQUEyQzs7Ozs7SUFDM0MsK0NBQWdEOzs7OztJQUNoRCx5Q0FBaUM7Ozs7O0lBQ2pDLDJDQUFxQzs7Ozs7SUFDckMsK0NBQTZDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVuZGVyZXIyLCBJbmplY3RhYmxlLCBSZW5kZXJlckZhY3RvcnkyLCBFdmVudEVtaXR0ZXIsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBWYWxpZGF0aW9uT3B0aW9uLCBDbGllbnRWYWxpZGF0b3IsIFZhbGlkYXRpb25Db25zdGFudCwgU3VtbWFyeUVycm9yLCBWYWxpZGF0aW9uUnVsZSwgQ2hhbmdlZEl0ZW0gfSBmcm9tICcuL3ZhbGlkYXRpb24ubW9kZWwnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24sIE9ic2VydmFibGUsIGZvcmtKb2luLCBtZXJnZSwgb2YgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgbWFwLCBkZWZhdWx0SWZFbXB0eSwgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgRGF0YVNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9kYXRhLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBWYWxpZGF0aW9uUHJvdmlkZXIgfSBmcm9tICcuL3ZhbGlkYXRpb24ucHJvdmlkZXInO1xyXG5pbXBvcnQgeyBBY3Rpb25TZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvYWN0aW9uLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBBZ2dyZWdhdG9yU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2FnZ3JlZ2F0b3Iuc2VydmljZSc7XHJcblxyXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxyXG5leHBvcnQgY2xhc3MgVmFsaWRhdGlvblNlcnZpY2Uge1xyXG4gICAgQE91dHB1dCgpIHB1YmxpYyBvbkRlc3Ryb3k6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIHByaXZhdGUgZWxlbWVudHM6IEVsZW1lbnRbXSA9IFtdO1xyXG4gICAgcHJpdmF0ZSB2YWxpZGF0b3I6IENsaWVudFZhbGlkYXRvcjtcclxuICAgIHByaXZhdGUgZXJyQ2xhc3M6IHN0cmluZyA9IFZhbGlkYXRpb25Db25zdGFudC5EZWZhdWx0RXJyb3JDbGFzcztcclxuICAgIHByaXZhdGUgc3R5bGVzOiBzdHJpbmcgPSBWYWxpZGF0aW9uQ29uc3RhbnQuRGVmYXVsdEVycm9yU3R5bGVzO1xyXG4gICAgcHJpdmF0ZSBhdHRyaWJ1dGVOYW1lOiBzdHJpbmcgPSBWYWxpZGF0aW9uQ29uc3RhbnQuQXR0cmlidXRlTmFtZTtcclxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMjtcclxuICAgIHByaXZhdGUgcmVsYXRlZFByb3ZpZGVyczogVmFsaWRhdGlvblNlcnZpY2VbXSA9IFtdO1xyXG4gICAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKCk7XHJcbiAgICBwcml2YXRlIHZpcnR1YWxWYWxpZGF0aW9uT3B0aW9uczogVmFsaWRhdGlvbk9wdGlvbltdID0gW107XHJcbiAgICBwcml2YXRlIGNoYW5nZWRJdGVtczogQ2hhbmdlZEl0ZW1bXSA9IFtdO1xyXG4gICAgcHJpdmF0ZSBrZXk6IHN0cmluZztcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcm90ZWN0ZWQgcmVuZGVyZXJGYWN0b3J5OiBSZW5kZXJlckZhY3RvcnkyLFxyXG4gICAgICAgIHByb3RlY3RlZCB2YWxpZGF0aW9uUHJvdmlkZXI6IFZhbGlkYXRpb25Qcm92aWRlcixcclxuICAgICAgICBwcml2YXRlIF9kYXRhU2VydmljZTogRGF0YVNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBfYWN0aW9uU2VydmljZTogQWN0aW9uU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIF9hZ2dyZWdhdG9yU2VydmljZTogQWdncmVnYXRvclNlcnZpY2VcclxuICAgICkge1xyXG4gICAgICAgIHRoaXMucmVuZGVyZXIgPSByZW5kZXJlckZhY3RvcnkuY3JlYXRlUmVuZGVyZXIobnVsbCwgbnVsbCk7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLnVuc3Vic2NyaWJlKCk7XHJcbiAgICAgICAgdGhpcy5vbkRlc3Ryb3kuZW1pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpbml0KG1vZGVsOiB7IHZhbGlkYXRvcjogQ2xpZW50VmFsaWRhdG9yIH0pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnZhbGlkYXRvciA9IG1vZGVsLnZhbGlkYXRvcjtcclxuICAgICAgICBpZiAoIXRoaXMudmFsaWRhdG9yLnBheWxvYWRSZWYpIHRoaXMudmFsaWRhdG9yLnBheWxvYWRSZWYgPSAoKSA9PiB7IHJldHVybiB7fSB9O1xyXG5cclxuICAgICAgICBpZiAodGhpcy52YWxpZGF0b3IucmVsYXRlZFZhbGlkYXRpb25Qcm92aWRlcnMpIHtcclxuICAgICAgICAgICAgdGhpcy5hZGRSZWxhdGVkUHJvdmlkZXJzKHRoaXMudmFsaWRhdG9yLnJlbGF0ZWRWYWxpZGF0aW9uUHJvdmlkZXJzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMudmFsaWRhdG9yLm9wdGlvbnMuZm9yRWFjaChvcHRpb24gPT4ge1xyXG4gICAgICAgICAgICBpZiAoIW9wdGlvbi5kaXNwbGF5VGV4dCkgb3B0aW9uLmRpc3BsYXlUZXh0ID0gb3B0aW9uLnZhbGlkYXRpb25OYW1lO1xyXG4gICAgICAgICAgICBpZiAoIW9wdGlvbi5wYXlsb2FkUmVmKSBvcHRpb24ucGF5bG9hZFJlZiA9IHRoaXMudmFsaWRhdG9yLnBheWxvYWRSZWY7XHJcbiAgICAgICAgICAgIG9wdGlvbi5ydWxlcy5mb3JFYWNoKGFjdGlvbiA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWFjdGlvbi5pZCkgYWN0aW9uLmlkID0gdGhpcy5fZGF0YVNlcnZpY2UubmV3R3VpZCgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFhY3Rpb24uZXJyb3JNZXNzYWdlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChhY3Rpb24ua2V5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgVmFsaWRhdGlvbkNvbnN0YW50LlJlcXVpcmVkOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb24uZXJyb3JNZXNzYWdlID0gKGVsZW1lbnQ6IEVsZW1lbnQsIHJvd0luZGV4OiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkaXNwbGF5aW5nUm93SW5kZXggPSAoK3Jvd0luZGV4ICsgMSkudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYCR7b3B0aW9uLmRpc3BsYXlUZXh0fSR7b3B0aW9uLmR5bmFtaWMgPyAnIFsnICsgZGlzcGxheWluZ1Jvd0luZGV4ICsgJ10nIDogJyd9ICR7dGhpcy52YWxpZGF0b3IucmVxdWlyZWRNZXNzYWdlfWA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uLmVycm9yTWVzc2FnZSA9ICgpID0+IGAke29wdGlvbi5kaXNwbGF5VGV4dH0gJHt0aGlzLnZhbGlkYXRvci5pbnZhbGlkTWVzc2FnZX1gO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMudmlydHVhbFZhbGlkYXRpb25PcHRpb25zID0gdGhpcy52YWxpZGF0b3Iub3B0aW9ucy5maWx0ZXIoeCA9PiB4LmR5bmFtaWMpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlQXN5bmMoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0S2V5KGtleTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmtleSkgdGhpcy5rZXkgPSBrZXk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZUFzeW5jKHJlbGF0ZWRQcm92aWRlcnNUb1JlZ2lzdGVyPzogVmFsaWRhdGlvblNlcnZpY2VbXSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2FjdGlvblNlcnZpY2UuZXhlY3V0ZUFzeW5jKCgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHJlbGF0ZWRQcm92aWRlcnNUb1JlZ2lzdGVyICYmIHJlbGF0ZWRQcm92aWRlcnNUb1JlZ2lzdGVyLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRSZWxhdGVkUHJvdmlkZXJzKHJlbGF0ZWRQcm92aWRlcnNUb1JlZ2lzdGVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnJlZ2lzdGVyRWxlbWVudHMoKTtcclxuICAgICAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50cygpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBleGVjdXRlQXN5bmModmFsaWRDYWxsYmFjazogKGVycm9ycz86IFN1bW1hcnlFcnJvcltdKSA9PiBhbnksIGludmFsaWRDYWxsYmFjaz86IChlcnJvcnM/OiBTdW1tYXJ5RXJyb3JbXSkgPT4gYW55KTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XHJcbiAgICAgICAgdGhpcy5yZXRyaWV2ZVN1bW1hcnlFcnJvcnMoKS5zdWJzY3JpYmUoKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2UubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgICAgIGlmICh2YWxpZENhbGxiYWNrKSB2YWxpZENhbGxiYWNrKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBvZih0cnVlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmIChpbnZhbGlkQ2FsbGJhY2spIGludmFsaWRDYWxsYmFjayhyZXNwb25zZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gb2YodHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGlzVmFsaWQoc2hvdzogYm9vbGVhbiA9IHRydWUsIGZvY3VzOiBib29sZWFuID0gdHJ1ZSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmIChzaG93KSB7XHJcbiAgICAgICAgICAgIHRoaXMucmV0cmlldmVTdW1tYXJ5RXJyb3JzKCkuc3Vic2NyaWJlKChlcnJvcnM6IFN1bW1hcnlFcnJvcltdKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9hZ2dyZWdhdG9yU2VydmljZS5wdWJsaXNoKHRoaXMua2V5LCBlcnJvcnMpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGZvY3VzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9ycyAmJiBlcnJvcnMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZm9jdXNFbGVtZW50ID0gZXJyb3JzWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZWwgPSA8YW55PmZvY3VzRWxlbWVudC5lbGVtZW50O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2FjdGlvblNlcnZpY2UuZXhlY3V0ZUFzeW5jKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbC5mb2N1cygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHZhbGlkID0gdHJ1ZTtcclxuICAgICAgICBpZiAodGhpcy52YWxpZGF0b3Iub3B0aW9ucykge1xyXG4gICAgICAgICAgICB0aGlzLnZhbGlkYXRvci5vcHRpb25zLmZvckVhY2goKG9wdGlvbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcGF5bG9hZCA9IHRoaXMudmFsaWRhdG9yLnBheWxvYWRSZWYoKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGZpZWxkVmFsdWUgPSBvcHRpb24udmFsdWVSZXNvbHZlciA/IG9wdGlvbi52YWx1ZVJlc29sdmVyKHBheWxvYWQpIDogbnVsbDtcclxuICAgICAgICAgICAgICAgIGlmIChvcHRpb24ucnVsZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBvcHRpb24ucnVsZXMuZm9yRWFjaCgoYWN0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhY3Rpb24uaXNWYWxpZCAhPSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYWN0aW9uLmlzVmFsaWQgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmllbGRWYWx1ZSkgdmFsaWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHZhbGlkO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBoYW5kbGVFcnJvcnMoY2FsbGJhY2s/OiAocmVzcG9uc2U6IFN1bW1hcnlFcnJvcltdKSA9PiB2b2lkKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5yZXRyaWV2ZVN1bW1hcnlFcnJvcnMoKS5zdWJzY3JpYmUoKHJlcykgPT4ge1xyXG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrKHJlcyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNvbW1pdChjYWxsYmFjaz86IEZ1bmN0aW9uKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmV0cmlldmVTdW1tYXJ5RXJyb3JzKCkucGlwZShcclxuICAgICAgICAgICAgbWFwKGVycm9ycyA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrKGVycm9ycyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3JzLmxlbmd0aCA9PSAwKSByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfSksIHRha2UoMSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRFbGVtZW50RXJyb3IoZWxlbWVudDogRWxlbWVudCwgYWN0aW9uOiBWYWxpZGF0aW9uUnVsZSwgb3B0aW9uOiBWYWxpZGF0aW9uT3B0aW9uKTogc3RyaW5nIHtcclxuICAgICAgICBpZiAoIWVsZW1lbnQpIHJldHVybjtcclxuICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKGVsZW1lbnQsIFZhbGlkYXRpb25Db25zdGFudC5TdWNjZXNzRWxlbWVudENsYXNzKTtcclxuICAgICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGVsZW1lbnQsIG9wdGlvbi5lcnJvckVsZW1lbnRDbGFzcyk7XHJcbiAgICAgICAgbGV0IGVycm9yRWxlbWVudCA9IHRoaXMuZmluZEVycm9yRWxlbWVudChlbGVtZW50KTtcclxuICAgICAgICBpZiAoIWVycm9yRWxlbWVudCkge1xyXG4gICAgICAgICAgICBlcnJvckVsZW1lbnQgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKGVycm9yRWxlbWVudCwgVmFsaWRhdGlvbkNvbnN0YW50LkVSUk9SX0VMRU1FTlRfSUQsIGAke3RoaXMuX2RhdGFTZXJ2aWNlLm5ld0d1aWQoKX1gKTtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUoZXJyb3JFbGVtZW50LCAnc3R5bGUnLCB0aGlzLnN0eWxlcyk7XHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoZXJyb3JFbGVtZW50LCB0aGlzLmVyckNsYXNzKTtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhlcnJvckVsZW1lbnQsIG9wdGlvbi5lcnJvck1lc3NhZ2VDbGFzcyk7XHJcbiAgICAgICAgICAgIGNvbnN0IHBhcmVudEVsZW1lbnQgPSB0aGlzLnJlbmRlcmVyLnBhcmVudE5vZGUoZWxlbWVudCk7XHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQocGFyZW50RWxlbWVudCwgZXJyb3JFbGVtZW50KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGVycm9ySXRlbUVsZW1lbnRLZXk6IHN0cmluZyA9IGAke2FjdGlvbi5pZH1gO1xyXG4gICAgICAgIGxldCBlcnJvckl0ZW1FbGVtZW50ID0gdGhpcy5maW5kRXJyb3JJdGVtRWxlbWVudChlcnJvckVsZW1lbnQsIGVycm9ySXRlbUVsZW1lbnRLZXkpO1xyXG4gICAgICAgIGNvbnN0IGR5bmFtaWNTZXF1ZW5jZUlkID0gdGhpcy5maW5kRHluYW1pY1NlcXVlbmNlSWQoZWxlbWVudCk7XHJcbiAgICAgICAgY29uc3QgZXJyb3JNZXNzYWdlID0gYWN0aW9uLmVycm9yTWVzc2FnZShlbGVtZW50LCBkeW5hbWljU2VxdWVuY2VJZCk7XHJcblxyXG4gICAgICAgIGlmICghZXJyb3JJdGVtRWxlbWVudCkge1xyXG4gICAgICAgICAgICBlcnJvckl0ZW1FbGVtZW50ID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdsaScpO1xyXG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZShlcnJvckl0ZW1FbGVtZW50LCBWYWxpZGF0aW9uQ29uc3RhbnQuRVJST1JfSVRFTV9FTEVNRU5UX0lELCBlcnJvckl0ZW1FbGVtZW50S2V5KTtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChlcnJvckl0ZW1FbGVtZW50LCB0aGlzLnJlbmRlcmVyLmNyZWF0ZVRleHQoZXJyb3JNZXNzYWdlKSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKGVycm9yRWxlbWVudCwgZXJyb3JJdGVtRWxlbWVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBlcnJvck1lc3NhZ2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsZWFyRXJyb3JJdGVtRWxlbWVudChlbGVtZW50OiBhbnksIGFjdGlvbjogVmFsaWRhdGlvblJ1bGUpIHtcclxuICAgICAgICBsZXQgZXJyb3JFbGVtZW50ID0gdGhpcy5maW5kRXJyb3JFbGVtZW50KGVsZW1lbnQpO1xyXG4gICAgICAgIGlmICghZXJyb3JFbGVtZW50KSByZXR1cm47XHJcblxyXG4gICAgICAgIGNvbnN0IGVycm9ySXRlbUVsZW1lbnRLZXk6IHN0cmluZyA9IGAke2FjdGlvbi5pZH1gO1xyXG4gICAgICAgIGxldCBlcnJvckl0ZW1FbGVtZW50ID0gdGhpcy5maW5kRXJyb3JJdGVtRWxlbWVudChlcnJvckVsZW1lbnQsIGVycm9ySXRlbUVsZW1lbnRLZXkpO1xyXG4gICAgICAgIGlmICghZXJyb3JJdGVtRWxlbWVudCkgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2hpbGQoZXJyb3JFbGVtZW50LCBlcnJvckl0ZW1FbGVtZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaXNEaXJ0eShjYWxsYmFjaz86IChpdGVtczogQ2hhbmdlZEl0ZW1bXSkgPT4gdm9pZCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmICghdGhpcy5jaGFuZ2VkSXRlbXMgfHwgdGhpcy5jaGFuZ2VkSXRlbXMubGVuZ3RoID09IDApIHJldHVybiBmYWxzZTtcclxuICAgICAgICB2YXIgcmVzcG9uc2UgPSB0aGlzLmNoYW5nZWRJdGVtcy5maWx0ZXIocyA9PiBzLmNoYW5nZSk7XHJcbiAgICAgICAgaWYgKGNhbGxiYWNrKSBjYWxsYmFjayhyZXNwb25zZSk7XHJcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmxlbmd0aCA+IDA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHZhbGlkYXRlRWxlbWVudChlbGVtZW50OiBhbnksIG9wdGlvbjogVmFsaWRhdGlvbk9wdGlvbiwgYWxsOiBib29sZWFuID0gZmFsc2UpOiBPYnNlcnZhYmxlPFZhbGlkYXRpb25PcHRpb24+IHtcclxuICAgICAgICBjb25zdCBwYXlsb2FkID0gdGhpcy52YWxpZGF0b3IucGF5bG9hZFJlZigpO1xyXG4gICAgICAgIGNvbnN0IGZpZWxkVmFsdWUgPSBvcHRpb24udmFsdWVSZXNvbHZlciA/IG9wdGlvbi52YWx1ZVJlc29sdmVyKHBheWxvYWQpIDogbnVsbDtcclxuICAgICAgICBjb25zdCB2YWxpZGF0ZWRBY3Rpb25zJCA9IG9wdGlvbi5ydWxlcy5tYXAoYWN0aW9uID0+IHtcclxuICAgICAgICAgICAgc3dpdGNoIChhY3Rpb24ua2V5KSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFZhbGlkYXRpb25Db25zdGFudC5SZXF1aXJlZDoge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRpb25Qcm92aWRlci5yZXF1aXJlZChmaWVsZFZhbHVlKS5waXBlKG1hcChpc1ZhbGlkID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uLmlzVmFsaWQgPSBpc1ZhbGlkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWN0aW9uO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNhc2UgVmFsaWRhdGlvbkNvbnN0YW50LkVtYWlsOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudmFsaWRhdGlvblByb3ZpZGVyLmVtYWlsKGZpZWxkVmFsdWUpLnBpcGUobWFwKGlzVmFsaWQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb24uaXNWYWxpZCA9IGlzVmFsaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhY3Rpb247XHJcbiAgICAgICAgICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2FzZSBWYWxpZGF0aW9uQ29uc3RhbnQuUGhvbmU6IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy52YWxpZGF0aW9uUHJvdmlkZXIucGhvbmUoZmllbGRWYWx1ZSkucGlwZShtYXAoaXNWYWxpZCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbi5pc1ZhbGlkID0gaXNWYWxpZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFjdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjYXNlIFZhbGlkYXRpb25Db25zdGFudC5DdXN0b206IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWFjdGlvbi5leGVjdXRlKSB0aHJvdyBuZXcgRXJyb3IoJyFhY3Rpb24uZXhlY3V0ZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghYWxsICYmICFhY3Rpb24ucmVxdWlyZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFmaWVsZFZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb24uaXNWYWxpZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2YoYWN0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXF1aXJlZFJ1bGUgPSBvcHRpb24ucnVsZXMuZmluZChzID0+IHMua2V5ID09IFZhbGlkYXRpb25Db25zdGFudC5SZXF1aXJlZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVxdWlyZWRSdWxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWRSdWxlLmlzVmFsaWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNlcXVlbmNlSWQgPSB0aGlzLmZpbmREeW5hbWljU2VxdWVuY2VJZChlbGVtZW50KTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWN0aW9uLmV4ZWN1dGUoZmllbGRWYWx1ZSwgcGF5bG9hZCwgK3NlcXVlbmNlSWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5waXBlKG1hcChyZXNwb25zZSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb24uaXNWYWxpZCA9IHJlc3BvbnNlLnN0YXR1cztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UubWVzc2FnZSkgYWN0aW9uLmVycm9yTWVzc2FnZSA9ICgpID0+IHsgcmV0dXJuIHJlc3BvbnNlLm1lc3NhZ2U7IH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWN0aW9uO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OiB0aHJvdyBuZXcgRXJyb3IoYFVuaGFuZGxlZCBhY3Rpb246ICR7YWN0aW9uLmtleX1gKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gZm9ya0pvaW4odmFsaWRhdGVkQWN0aW9ucyQpLnBpcGUoXHJcbiAgICAgICAgICAgIHRha2UoMSksXHJcbiAgICAgICAgICAgIG1hcCh2YWxpZGF0ZWRBY3Rpb25zID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChvcHRpb24ucmVsZXZhbnRGaWVsZHMpIHRoaXMudmFsaWRhdGVSZWxldmFudEZpZWxkcyhvcHRpb24ucmVsZXZhbnRGaWVsZHMocGF5bG9hZCkpO1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uLnJ1bGVzID0gdmFsaWRhdGVkQWN0aW9ucztcclxuICAgICAgICAgICAgICAgIHJldHVybiBvcHRpb247XHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB2YWxpZGF0ZVJlbGV2YW50RmllbGRzKHJlbGV2YW50RmllbGRzPzogc3RyaW5nW10pOiB2b2lkIHtcclxuICAgICAgICBpZiAoIXJlbGV2YW50RmllbGRzIHx8IHJlbGV2YW50RmllbGRzLmxlbmd0aCA9PSAwKSByZXR1cm47XHJcbiAgICAgICAgaWYgKHJlbGV2YW50RmllbGRzICYmIHJlbGV2YW50RmllbGRzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgcmVsZXZhbnRGaWVsZHMuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5lbGVtZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBhdHRyaWJ1dGVzID0gdGhpcy5lbGVtZW50c1tpXS5hdHRyaWJ1dGVzO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhdHRyaWJ1dGVzICYmIGF0dHJpYnV0ZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYXR0cmlidXRlc1t0aGlzLmF0dHJpYnV0ZU5hbWVdLnZhbHVlID09IGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvcHRpb24gPSB0aGlzLmZpbmRFbGVtZW50T3B0aW9uKHRoaXMuZWxlbWVudHNbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudmFsaWRhdGVFbGVtZW50KHRoaXMuZWxlbWVudHNbaV0sIG9wdGlvbiwgdHJ1ZSkucGlwZShcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFwKG5ld09wdGlvbiA9PiBvcHRpb24gPSBuZXdPcHRpb24pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXAob3B0aW9uID0+IHRoaXMuc3luY0Vycm9yTWVzc2FnZXModGhpcy5lbGVtZW50c1tpXSwgb3B0aW9uKSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKS5zdWJzY3JpYmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZXRyaWV2ZVN1bW1hcnlFcnJvcnMoKTogT2JzZXJ2YWJsZTxTdW1tYXJ5RXJyb3JbXT4ge1xyXG4gICAgICAgIGNvbnN0IGVycm9ycyQgPSB0aGlzLmVsZW1lbnRzLm1hcChlbGVtZW50ID0+IHtcclxuICAgICAgICAgICAgbGV0IHZhbGlkYXRpb25PcHRpb24gPSB0aGlzLmZpbmRFbGVtZW50T3B0aW9uKGVsZW1lbnQpO1xyXG4gICAgICAgICAgICBpZiAoIXZhbGlkYXRpb25PcHRpb24pIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRlRWxlbWVudChlbGVtZW50LCB2YWxpZGF0aW9uT3B0aW9uKS5waXBlKFxyXG4gICAgICAgICAgICAgICAgbWFwKG5ld09wdGlvbiA9PiB2YWxpZGF0aW9uT3B0aW9uID0gbmV3T3B0aW9uKSxcclxuICAgICAgICAgICAgICAgIG1hcChvcHRpb24gPT4gdGhpcy5zeW5jRXJyb3JNZXNzYWdlcyhlbGVtZW50LCBvcHRpb24pKSxcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29uc3QgZXJyb3JCYXRjaCA9IGZvcmtKb2luKGVycm9ycyQpO1xyXG4gICAgICAgIGNvbnN0IHJlbGF0ZWRFcnJvcnMgPSA8T2JzZXJ2YWJsZTxTdW1tYXJ5RXJyb3JbXT4+dGhpcy5yZWxhdGVkUHJvdmlkZXJzLnJlZHVjZSgocHJldmlvdXM6IE9ic2VydmFibGU8U3VtbWFyeUVycm9yW10+LCBwcm92aWRlcjogVmFsaWRhdGlvblNlcnZpY2UpID0+IHtcclxuICAgICAgICAgICAgY29uc3Qgc3ViRXJyb3JzJCA9IHByb3ZpZGVyLnJldHJpZXZlU3VtbWFyeUVycm9ycygpO1xyXG4gICAgICAgICAgICByZXR1cm4gbWVyZ2UocHJldmlvdXMsIHN1YkVycm9ycyQpO1xyXG4gICAgICAgIH0sIG9mKFtdKSk7XHJcblxyXG4gICAgICAgIHJldHVybiBmb3JrSm9pbihlcnJvckJhdGNoLCByZWxhdGVkRXJyb3JzKS5waXBlKFxyXG4gICAgICAgICAgICBkZWZhdWx0SWZFbXB0eShbW10sIFtdXSksXHJcbiAgICAgICAgICAgIG1hcCh2YWx1ZSA9PiBbLi4udmFsdWVbMF0sIC4uLnZhbHVlWzFdXSksXHJcbiAgICAgICAgICAgIG1hcChyZXN1bHQgPT4gW10uY29uY2F0KHJlc3VsdC5maWx0ZXIoZXJyb3IgPT4gZXJyb3IpKSksXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGZpbmRFbGVtZW50T3B0aW9uKGVsZW1lbnQ6IEVsZW1lbnQpOiBWYWxpZGF0aW9uT3B0aW9uIHwgbnVsbCB7XHJcbiAgICAgICAgY29uc3QgdmFsaWRhdGlvbklkQXR0cmlidXRlID0gZWxlbWVudC5hdHRyaWJ1dGVzW1ZhbGlkYXRpb25Db25zdGFudC5WQUxJREFUSU9OX0lEXTtcclxuICAgICAgICBpZiAoIXZhbGlkYXRpb25JZEF0dHJpYnV0ZSkgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgICAgIGNvbnN0IHZhbGlkYXRpb25JZCA9IHZhbGlkYXRpb25JZEF0dHJpYnV0ZS52YWx1ZTtcclxuICAgICAgICBpZiAoIXZhbGlkYXRpb25JZCkgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsaWRhdG9yLm9wdGlvbnMuZmluZChvcHRpb24gPT4gb3B0aW9uLnZhbGlkYXRpb25JZCA9PT0gdmFsaWRhdGlvbklkKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGZpbmRFcnJvckl0ZW1FbGVtZW50KGVycm9yRWxlbWVudDogYW55LCBrZXk6IHN0cmluZyk6IGFueSB8IG51bGwge1xyXG4gICAgICAgIGNvbnN0IGNoaWxkcmVuID0gPEVsZW1lbnRbXT5BcnJheS5mcm9tKGVycm9yRWxlbWVudC5jaGlsZHJlbik7XHJcbiAgICAgICAgcmV0dXJuIGNoaWxkcmVuXHJcbiAgICAgICAgICAgIC5maWx0ZXIoeCA9PiB4LmF0dHJpYnV0ZXNbVmFsaWRhdGlvbkNvbnN0YW50LkVSUk9SX0lURU1fRUxFTUVOVF9JRF0pXHJcbiAgICAgICAgICAgIC5maW5kKHggPT4geC5hdHRyaWJ1dGVzW1ZhbGlkYXRpb25Db25zdGFudC5FUlJPUl9JVEVNX0VMRU1FTlRfSURdLnZhbHVlID09PSBrZXkpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZmluZER5bmFtaWNTZXF1ZW5jZUlkKGVsZW1lbnQ6IEVsZW1lbnQpOiBzdHJpbmcgfCBudWxsIHtcclxuICAgICAgICBjb25zdCBzZXF1ZW5jZUlkQXR0cmlidXRlID0gZWxlbWVudC5hdHRyaWJ1dGVzW1ZhbGlkYXRpb25Db25zdGFudC5BUlJBWV9TRVFVRU5DRV9JRF07XHJcbiAgICAgICAgaWYgKCFzZXF1ZW5jZUlkQXR0cmlidXRlKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgICAgICAgY29uc3Qgc2VxdWVuY2VJZCA9IHNlcXVlbmNlSWRBdHRyaWJ1dGUudmFsdWU7XHJcbiAgICAgICAgaWYgKCFzZXF1ZW5jZUlkKSByZXR1cm4gbnVsbDtcclxuICAgICAgICByZXR1cm4gc2VxdWVuY2VJZDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGZpbmRFcnJvckVsZW1lbnQoZWxlbWVudDogRWxlbWVudCk6IEVsZW1lbnQge1xyXG4gICAgICAgIGlmIChlbGVtZW50LnBhcmVudEVsZW1lbnQgJiYgZWxlbWVudC5wYXJlbnRFbGVtZW50LmNoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNsaWJpbmdzID0gPEVsZW1lbnRbXT5BcnJheS5mcm9tKGVsZW1lbnQucGFyZW50RWxlbWVudC5jaGlsZHJlbik7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSBzbGliaW5ncy5maWx0ZXIoeCA9PiB4LmF0dHJpYnV0ZXMpLmZpbmQoeCA9PiB4LmF0dHJpYnV0ZXNbVmFsaWRhdGlvbkNvbnN0YW50LkVSUk9SX0VMRU1FTlRfSURdKTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZWdpc3RlckVsZW1lbnRzKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IG5vbkR5bmFtaWNPcHRpb25zID0gdGhpcy52YWxpZGF0b3Iub3B0aW9ucy5maWx0ZXIoeCA9PiAheC5keW5hbWljKTtcclxuICAgICAgICBjb25zdCBub25EeW5hbWljRWxlbWVudHMgPSBub25EeW5hbWljT3B0aW9ucy5yZWR1Y2UoKHByZXZpb3VzOiBFbGVtZW50W10sIGN1cnJlbnQ6IFZhbGlkYXRpb25PcHRpb24pID0+IHtcclxuICAgICAgICAgICAgbGV0IHF1ZXJ5ID0gYCpbJHt0aGlzLmF0dHJpYnV0ZU5hbWV9PVwiJHtjdXJyZW50LnZhbGlkYXRpb25OYW1lfVwiXWA7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnZhbGlkYXRvci5zY29wZSkge1xyXG4gICAgICAgICAgICAgICAgcXVlcnkgKz0gYFtzY29wZT1cIiR7dGhpcy52YWxpZGF0b3Iuc2NvcGV9XCJdYDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCBlbGVtZW50cyA9IDxFbGVtZW50W10+QXJyYXkuZnJvbSh0aGlzLnZhbGlkYXRvci5mb3JtUmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChxdWVyeSkpO1xyXG4gICAgICAgICAgICBlbGVtZW50cy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdmFsaWRhdGlvbklkID0gdGhpcy5fZGF0YVNlcnZpY2UubmV3R3VpZCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUoZWxlbWVudCwgVmFsaWRhdGlvbkNvbnN0YW50LlZBTElEQVRJT05fSUQsIHZhbGlkYXRpb25JZCk7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50LnZhbGlkYXRpb25JZCA9IHZhbGlkYXRpb25JZDtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBwcmV2aW91cy5jb25jYXQoZWxlbWVudHMpO1xyXG4gICAgICAgIH0sIFtdKTtcclxuXHJcbiAgICAgICAgbGV0IGdlbmVyYXRlZER5bmFtaWNPcHRpb25zID0gW107XHJcbiAgICAgICAgbGV0IGR5bmFtaWNFbGVtZW50cyA9IFtdO1xyXG4gICAgICAgIHRoaXMudmFsaWRhdG9yLm9wdGlvbnMgPSB0aGlzLnZhbGlkYXRvci5vcHRpb25zLmZpbHRlcih4ID0+ICF4LmR5bmFtaWMpO1xyXG4gICAgICAgIHRoaXMudmlydHVhbFZhbGlkYXRpb25PcHRpb25zLmZvckVhY2goKGN1cnJlbnQ6IFZhbGlkYXRpb25PcHRpb24pID0+IHtcclxuICAgICAgICAgICAgbGV0IHF1ZXJ5ID0gYCpbJHt0aGlzLmF0dHJpYnV0ZU5hbWV9PVwiJHtjdXJyZW50LnZhbGlkYXRpb25OYW1lfVwiXWA7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnZhbGlkYXRvci5zY29wZSkge1xyXG4gICAgICAgICAgICAgICAgcXVlcnkgKz0gYFtzY29wZT1cIiR7dGhpcy52YWxpZGF0b3Iuc2NvcGV9XCJdYDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCBlbGVtZW50cyA9IEFycmF5LmZyb20odGhpcy52YWxpZGF0b3IuZm9ybVJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwocXVlcnkpKTtcclxuICAgICAgICAgICAgY29uc3QgY2xvbmVkT3B0aW9ucyA9IGVsZW1lbnRzLm1hcCgoZWxlbWVudCwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHZhbGlkYXRpb25JZCA9IHRoaXMuX2RhdGFTZXJ2aWNlLm5ld0d1aWQoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKGVsZW1lbnQsIFZhbGlkYXRpb25Db25zdGFudC5WQUxJREFUSU9OX0lELCB2YWxpZGF0aW9uSWQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUoZWxlbWVudCwgVmFsaWRhdGlvbkNvbnN0YW50LkFSUkFZX1NFUVVFTkNFX0lELCBpbmRleC50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLi4uY3VycmVudCxcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uSWQ6IHZhbGlkYXRpb25JZCxcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZVJlc29sdmVyOiBjdXJyZW50LnZhbHVlUmVzb2x2ZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgPyAocGF5bG9hZDogYW55KSA9PiBjdXJyZW50LnZhbHVlUmVzb2x2ZXIocGF5bG9hZCwgaW5kZXgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDogKCkgPT4geyByZXR1cm4gKDxhbnk+ZWxlbWVudCkudmFsdWU7IH1cclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBkeW5hbWljRWxlbWVudHMucHVzaCguLi5lbGVtZW50cyk7XHJcbiAgICAgICAgICAgIGdlbmVyYXRlZER5bmFtaWNPcHRpb25zLnB1c2goLi4uY2xvbmVkT3B0aW9ucyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMudmFsaWRhdG9yLm9wdGlvbnMgPSBub25EeW5hbWljT3B0aW9ucy5jb25jYXQoZ2VuZXJhdGVkRHluYW1pY09wdGlvbnMpO1xyXG4gICAgICAgIHRoaXMuZWxlbWVudHMgPSBub25EeW5hbWljRWxlbWVudHMuY29uY2F0KGR5bmFtaWNFbGVtZW50cyk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmVsZW1lbnRzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlZEl0ZW1zID0gW107XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudHMuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcGF5bG9hZCA9IHRoaXMudmFsaWRhdG9yLnBheWxvYWRSZWYoKTtcclxuICAgICAgICAgICAgICAgIGxldCBlbGVtZW50T3B0aW9uID0gdGhpcy5maW5kRWxlbWVudE9wdGlvbihlbGVtZW50KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlZEl0ZW1zLnB1c2gobmV3IENoYW5nZWRJdGVtKHtcclxuICAgICAgICAgICAgICAgICAgICBpZDogZWxlbWVudE9wdGlvbi52YWxpZGF0aW9uSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGQ6IGVsZW1lbnRPcHRpb24udmFsaWRhdGlvbk5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgb2xkVmFsdWU6IGVsZW1lbnRPcHRpb24udmFsdWVSZXNvbHZlciA/IGVsZW1lbnRPcHRpb24udmFsdWVSZXNvbHZlcihwYXlsb2FkKSA6IG51bGxcclxuICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVnaXN0ZXJFdmVudHMoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50cy5maWx0ZXIoZWxlbWVudCA9PiBlbGVtZW50LmF0dHJpYnV0ZXNbdGhpcy5hdHRyaWJ1dGVOYW1lXSkuZm9yRWFjaCgoZWxlbWVudDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghZWxlbWVudC5mb2N1c291dExpc3RlbmVyKSB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LmZvY3Vzb3V0TGlzdGVuZXIgPSB0aGlzLnJlbmRlcmVyLmxpc3RlbihlbGVtZW50LCAnZm9jdXNvdXQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVCbHVyRXZlbnQoZWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQuZm9jdXNvdXRMaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKGVsZW1lbnQsICdjaGFuZ2UnLCAoJGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGF5bG9hZCA9IHRoaXMudmFsaWRhdG9yLnBheWxvYWRSZWYoKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZWxlbWVudE9wdGlvbiA9IHRoaXMuZmluZEVsZW1lbnRPcHRpb24oZWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gZWxlbWVudE9wdGlvbi52YWx1ZVJlc29sdmVyID8gZWxlbWVudE9wdGlvbi52YWx1ZVJlc29sdmVyKHBheWxvYWQpIDogbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZWxlbWVudE9wdGlvbiAmJiBlbGVtZW50T3B0aW9uLmRpcnR5Q2hlY2spIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGN1cnJlbnRJdGVtID0gdGhpcy5jaGFuZ2VkSXRlbXMuZmluZChzID0+IHMuaWQgPT0gZWxlbWVudE9wdGlvbi52YWxpZGF0aW9uSWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWN1cnJlbnRJdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZWRJdGVtcy5wdXNoKG5ldyBDaGFuZ2VkSXRlbSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IGVsZW1lbnRPcHRpb24udmFsaWRhdGlvbklkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkOiBlbGVtZW50T3B0aW9uLnZhbGlkYXRpb25OYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB2YWx1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRJdGVtLnZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudEl0ZW0ub2xkVmFsdWUgPT0gdW5kZWZpbmVkIHx8IGN1cnJlbnRJdGVtLm9sZFZhbHVlID09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlID09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PSAnJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50SXRlbS5jaGFuZ2UgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50SXRlbS5jaGFuZ2UgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlID09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PSAnJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50SXRlbS5jaGFuZ2UgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50SXRlbS5vbGRWYWx1ZS50b1N0cmluZygpICE9IGN1cnJlbnRJdGVtLnZhbHVlLnRvU3RyaW5nKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRJdGVtLmNoYW5nZSA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudEl0ZW0uY2hhbmdlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVsZW1lbnRPcHRpb24gJiYgZWxlbWVudE9wdGlvbi5ydWxlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50T3B0aW9uLnJ1bGVzLmZvckVhY2goKHJ1bGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJ1bGUuaXNWYWxpZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaGFuZGxlQmx1ckV2ZW50KGVsZW1lbnQ6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIGxldCBlbGVtZW50T3B0aW9uID0gdGhpcy5maW5kRWxlbWVudE9wdGlvbihlbGVtZW50KTtcclxuICAgICAgICBpZiAoIWVsZW1lbnRPcHRpb24pIHRocm93IG5ldyBFcnJvcignIWVsZW1lbnRPcHRpb24nKTtcclxuXHJcbiAgICAgICAgdGhpcy52YWxpZGF0ZUVsZW1lbnQoZWxlbWVudCwgZWxlbWVudE9wdGlvbikucGlwZSh0YWtlKDEpKS5zdWJzY3JpYmUobmV3T3B0aW9uID0+IHtcclxuICAgICAgICAgICAgZWxlbWVudE9wdGlvbiA9IG5ld09wdGlvbjtcclxuICAgICAgICAgICAgdGhpcy5zeW5jRXJyb3JNZXNzYWdlcyhlbGVtZW50LCBlbGVtZW50T3B0aW9uKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN5bmNFcnJvck1lc3NhZ2VzKGVsZW1lbnQ6IGFueSwgb3B0aW9uOiBWYWxpZGF0aW9uT3B0aW9uKTogU3VtbWFyeUVycm9yIHwgbnVsbCB7XHJcbiAgICAgICAgbGV0IGVycm9yTWVzc2FnZXM6IHN0cmluZ1tdID0gW107XHJcbiAgICAgICAgb3B0aW9uLnJ1bGVzLmZvckVhY2goYWN0aW9uID0+IHtcclxuICAgICAgICAgICAgaWYgKGFjdGlvbi5pc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsZWFyRXJyb3JJdGVtRWxlbWVudChlbGVtZW50LCBhY3Rpb24pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZXJyb3JNZXNzYWdlID0gdGhpcy5zZXRFbGVtZW50RXJyb3IoZWxlbWVudCwgYWN0aW9uLCBvcHRpb24pO1xyXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlcy5wdXNoKGVycm9yTWVzc2FnZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29uc3QgaW52YWxpZEFjdGlvbnMgPSBvcHRpb24ucnVsZXMuZmlsdGVyKHggPT4gIXguaXNWYWxpZCk7XHJcbiAgICAgICAgaWYgKGludmFsaWRBY3Rpb25zLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKGVsZW1lbnQsIG9wdGlvbi5lcnJvckVsZW1lbnRDbGFzcyk7XHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3MoZWxlbWVudCwgb3B0aW9uLnN1Y2Nlc3NFbGVtZW50Q2xhc3MpO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQ6IGVsZW1lbnQsXHJcbiAgICAgICAgICAgIG1lc3NhZ2VzOiBlcnJvck1lc3NhZ2VzXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYWRkUmVsYXRlZFByb3ZpZGVycyhwcm92aWRlcnM6IFZhbGlkYXRpb25TZXJ2aWNlW10pOiB2b2lkIHtcclxuICAgICAgICBsZXQgbmV3UHJvdmlkZXJzID0gcHJvdmlkZXJzLmZpbHRlcih4ID0+IHRoaXMucmVsYXRlZFByb3ZpZGVycy5pbmRleE9mKHgpIDwgMCk7XHJcbiAgICAgICAgbmV3UHJvdmlkZXJzLmZvckVhY2gocHJvdmlkZXIgPT5cclxuICAgICAgICAgICAgcHJvdmlkZXIub25EZXN0cm95LnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbGF0ZWRQcm92aWRlcnMgPSB0aGlzLnJlbGF0ZWRQcm92aWRlcnMuZmlsdGVyKCgpID0+IHRoaXMucmVsYXRlZFByb3ZpZGVycy5pbmRleE9mKHByb3ZpZGVyKSA8IDApO1xyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgdGhpcy5yZWxhdGVkUHJvdmlkZXJzLnB1c2goLi4ubmV3UHJvdmlkZXJzKTtcclxuICAgIH1cclxufSJdfQ==