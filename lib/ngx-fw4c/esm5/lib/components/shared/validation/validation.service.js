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
        this.key = key;
    };
    /**
     * @param {?=} relatedProvidersToRegister
     * @param {?=} item
     * @return {?}
     */
    ValidationService.prototype.updateAsync = /**
     * @param {?=} relatedProvidersToRegister
     * @param {?=} item
     * @return {?}
     */
    function (relatedProvidersToRegister, item) {
        var _this = this;
        this._actionService.executeAsync((/**
         * @return {?}
         */
        function () {
            if (relatedProvidersToRegister && relatedProvidersToRegister.length) {
                _this.addRelatedProviders(relatedProvidersToRegister);
            }
            _this.registerElements(item);
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
                var fieldValue = option.valueResolver ? option.valueResolver(null, payload) : null;
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
     * @return {?}
     */
    ValidationService.prototype.syncErrorMessages = /**
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
     * @param {?} element
     * @param {?} option
     * @return {?}
     */
    ValidationService.prototype.validateElementAsync = /**
     * @param {?} element
     * @param {?} option
     * @return {?}
     */
    function (element, option) {
        var _this = this;
        /** @type {?} */
        var errors$ = [this.validateElement(element, option).pipe(map((/**
             * @param {?} newOption
             * @return {?}
             */
            function (newOption) { return option = newOption; })), map((/**
             * @param {?} option
             * @return {?}
             */
            function (option) { return _this.syncErrorMessages(element, option); })))];
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
        var fieldValue = option.valueResolver ? option.valueResolver(option.itemRef, payload) : null;
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
     * @param {?=} item
     * @return {?}
     */
    ValidationService.prototype.registerElements = /**
     * @private
     * @param {?=} item
     * @return {?}
     */
    function (item) {
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
                return tslib_1.__assign({}, current, { validationId: validationId, itemRef: item, valueResolver: current.valueResolver
                        ? (/**
                         * @param {?} payload
                         * @return {?}
                         */
                        function (payload) { return current.valueResolver(item, payload, index); })
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
                    oldValue: elementOption.valueResolver ? elementOption.valueResolver(null, payload) : null
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
                    var value = elementOption.valueResolver ? elementOption.valueResolver(null, payload) : null;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWZ3NGMvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9zaGFyZWQvdmFsaWRhdGlvbi92YWxpZGF0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQWEsVUFBVSxFQUFFLGdCQUFnQixFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDOUYsT0FBTyxFQUFxQyxrQkFBa0IsRUFBZ0MsV0FBVyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDdEksT0FBTyxFQUFFLFlBQVksRUFBYyxRQUFRLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNyRSxPQUFPLEVBQUUsR0FBRyxFQUFFLGNBQWMsRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzNELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDOzs7Ozs7QUFFbkU7SUFlSSwyQkFDYyxlQUFpQyxFQUNqQyxrQkFBc0MsRUFDeEMsWUFBeUIsRUFDekIsY0FBNkIsRUFDN0Isa0JBQXFDO1FBSm5DLG9CQUFlLEdBQWYsZUFBZSxDQUFrQjtRQUNqQyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBQ3hDLGlCQUFZLEdBQVosWUFBWSxDQUFhO1FBQ3pCLG1CQUFjLEdBQWQsY0FBYyxDQUFlO1FBQzdCLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBbUI7UUFsQmhDLGNBQVMsR0FBdUIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUM1RCxhQUFRLEdBQWMsRUFBRSxDQUFDO1FB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QUEsUUFBUSxDQUFDLFNBQVMsQ0FBQyxTQUFTOzs7WUFBQztnQkFDekIsS0FBSSxDQUFDLGdCQUFnQixHQUFHLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNOzs7Z0JBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUEzQyxDQUEyQyxFQUFDLENBQUM7WUFDNUcsQ0FBQyxFQUFDO1FBRkYsQ0FFRSxFQUFDLENBQUM7UUFDUixDQUFBLEtBQUEsSUFBSSxDQUFDLGdCQUFnQixDQUFBLENBQUMsSUFBSSw0QkFBSSxZQUFZLEdBQUU7SUFDaEQsQ0FBQzs7Z0JBdGZKLFVBQVUsU0FBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUU7Ozs7Z0JBVEYsZ0JBQWdCO2dCQUt2QyxrQkFBa0I7Z0JBRGxCLFdBQVc7Z0JBRVgsYUFBYTtnQkFDYixpQkFBaUI7Ozs0QkFJckIsTUFBTTs7OzRCQVhYO0NBZ2dCQyxBQXZmRCxJQXVmQztTQXRmWSxpQkFBaUI7OztJQUMxQixzQ0FBb0U7Ozs7O0lBQ3BFLHFDQUFpQzs7Ozs7SUFDakMsc0NBQW1DOzs7OztJQUNuQyxxQ0FBZ0U7Ozs7O0lBQ2hFLG1DQUErRDs7Ozs7SUFDL0QsMENBQWlFOzs7OztJQUNqRSxxQ0FBNEI7Ozs7O0lBQzVCLDZDQUFtRDs7Ozs7SUFDbkQsMENBQXlEOzs7OztJQUN6RCxxREFBMEQ7Ozs7O0lBQzFELHlDQUF5Qzs7Ozs7SUFDekMsZ0NBQW9COzs7OztJQUdoQiw0Q0FBMkM7Ozs7O0lBQzNDLCtDQUFnRDs7Ozs7SUFDaEQseUNBQWlDOzs7OztJQUNqQywyQ0FBcUM7Ozs7O0lBQ3JDLCtDQUE2QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlbmRlcmVyMiwgSW5qZWN0YWJsZSwgUmVuZGVyZXJGYWN0b3J5MiwgRXZlbnRFbWl0dGVyLCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgVmFsaWRhdGlvbk9wdGlvbiwgQ2xpZW50VmFsaWRhdG9yLCBWYWxpZGF0aW9uQ29uc3RhbnQsIFN1bW1hcnlFcnJvciwgVmFsaWRhdGlvblJ1bGUsIENoYW5nZWRJdGVtIH0gZnJvbSAnLi92YWxpZGF0aW9uLm1vZGVsJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCBPYnNlcnZhYmxlLCBmb3JrSm9pbiwgbWVyZ2UsIG9mIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IG1hcCwgZGVmYXVsdElmRW1wdHksIHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IERhdGFTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvZGF0YS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgVmFsaWRhdGlvblByb3ZpZGVyIH0gZnJvbSAnLi92YWxpZGF0aW9uLnByb3ZpZGVyJztcclxuaW1wb3J0IHsgQWN0aW9uU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2FjdGlvbi5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQWdncmVnYXRvclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9hZ2dyZWdhdG9yLnNlcnZpY2UnO1xyXG5cclxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcclxuZXhwb3J0IGNsYXNzIFZhbGlkYXRpb25TZXJ2aWNlIHtcclxuICAgIEBPdXRwdXQoKSBwdWJsaWMgb25EZXN0cm95OiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICBwcml2YXRlIGVsZW1lbnRzOiBFbGVtZW50W10gPSBbXTtcclxuICAgIHByaXZhdGUgdmFsaWRhdG9yOiBDbGllbnRWYWxpZGF0b3I7XHJcbiAgICBwcml2YXRlIGVyckNsYXNzOiBzdHJpbmcgPSBWYWxpZGF0aW9uQ29uc3RhbnQuRGVmYXVsdEVycm9yQ2xhc3M7XHJcbiAgICBwcml2YXRlIHN0eWxlczogc3RyaW5nID0gVmFsaWRhdGlvbkNvbnN0YW50LkRlZmF1bHRFcnJvclN0eWxlcztcclxuICAgIHByaXZhdGUgYXR0cmlidXRlTmFtZTogc3RyaW5nID0gVmFsaWRhdGlvbkNvbnN0YW50LkF0dHJpYnV0ZU5hbWU7XHJcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjI7XHJcbiAgICBwcml2YXRlIHJlbGF0ZWRQcm92aWRlcnM6IFZhbGlkYXRpb25TZXJ2aWNlW10gPSBbXTtcclxuICAgIHByaXZhdGUgc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpO1xyXG4gICAgcHJpdmF0ZSB2aXJ0dWFsVmFsaWRhdGlvbk9wdGlvbnM6IFZhbGlkYXRpb25PcHRpb25bXSA9IFtdO1xyXG4gICAgcHJpdmF0ZSBjaGFuZ2VkSXRlbXM6IENoYW5nZWRJdGVtW10gPSBbXTtcclxuICAgIHByaXZhdGUga2V5OiBzdHJpbmc7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJvdGVjdGVkIHJlbmRlcmVyRmFjdG9yeTogUmVuZGVyZXJGYWN0b3J5MixcclxuICAgICAgICBwcm90ZWN0ZWQgdmFsaWRhdGlvblByb3ZpZGVyOiBWYWxpZGF0aW9uUHJvdmlkZXIsXHJcbiAgICAgICAgcHJpdmF0ZSBfZGF0YVNlcnZpY2U6IERhdGFTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgX2FjdGlvblNlcnZpY2U6IEFjdGlvblNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBfYWdncmVnYXRvclNlcnZpY2U6IEFnZ3JlZ2F0b3JTZXJ2aWNlXHJcbiAgICApIHtcclxuICAgICAgICB0aGlzLnJlbmRlcmVyID0gcmVuZGVyZXJGYWN0b3J5LmNyZWF0ZVJlbmRlcmVyKG51bGwsIG51bGwpO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25EZXN0cm95KCkge1xyXG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy51bnN1YnNjcmliZSgpO1xyXG4gICAgICAgIHRoaXMub25EZXN0cm95LmVtaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaW5pdChtb2RlbDogeyB2YWxpZGF0b3I6IENsaWVudFZhbGlkYXRvciB9KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy52YWxpZGF0b3IgPSBtb2RlbC52YWxpZGF0b3I7XHJcbiAgICAgICAgaWYgKCF0aGlzLnZhbGlkYXRvci5wYXlsb2FkUmVmKSB0aGlzLnZhbGlkYXRvci5wYXlsb2FkUmVmID0gKCkgPT4geyByZXR1cm4ge30gfTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMudmFsaWRhdG9yLnJlbGF0ZWRWYWxpZGF0aW9uUHJvdmlkZXJzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkUmVsYXRlZFByb3ZpZGVycyh0aGlzLnZhbGlkYXRvci5yZWxhdGVkVmFsaWRhdGlvblByb3ZpZGVycyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnZhbGlkYXRvci5vcHRpb25zLmZvckVhY2gob3B0aW9uID0+IHtcclxuICAgICAgICAgICAgaWYgKCFvcHRpb24uZGlzcGxheVRleHQpIG9wdGlvbi5kaXNwbGF5VGV4dCA9IG9wdGlvbi52YWxpZGF0aW9uTmFtZTtcclxuICAgICAgICAgICAgaWYgKCFvcHRpb24ucGF5bG9hZFJlZikgb3B0aW9uLnBheWxvYWRSZWYgPSB0aGlzLnZhbGlkYXRvci5wYXlsb2FkUmVmO1xyXG4gICAgICAgICAgICBvcHRpb24ucnVsZXMuZm9yRWFjaChhY3Rpb24gPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFhY3Rpb24uaWQpIGFjdGlvbi5pZCA9IHRoaXMuX2RhdGFTZXJ2aWNlLm5ld0d1aWQoKTtcclxuICAgICAgICAgICAgICAgIGlmICghYWN0aW9uLmVycm9yTWVzc2FnZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoYWN0aW9uLmtleSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFZhbGlkYXRpb25Db25zdGFudC5SZXF1aXJlZDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uLmVycm9yTWVzc2FnZSA9IChlbGVtZW50OiBFbGVtZW50LCByb3dJbmRleDogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZGlzcGxheWluZ1Jvd0luZGV4ID0gKCtyb3dJbmRleCArIDEpLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGAke29wdGlvbi5kaXNwbGF5VGV4dH0ke29wdGlvbi5keW5hbWljID8gJyBbJyArIGRpc3BsYXlpbmdSb3dJbmRleCArICddJyA6ICcnfSAke3RoaXMudmFsaWRhdG9yLnJlcXVpcmVkTWVzc2FnZX1gO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbi5lcnJvck1lc3NhZ2UgPSAoKSA9PiBgJHtvcHRpb24uZGlzcGxheVRleHR9ICR7dGhpcy52YWxpZGF0b3IuaW52YWxpZE1lc3NhZ2V9YDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnZpcnR1YWxWYWxpZGF0aW9uT3B0aW9ucyA9IHRoaXMudmFsaWRhdG9yLm9wdGlvbnMuZmlsdGVyKHggPT4geC5keW5hbWljKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZUFzeW5jKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldEtleShrZXk6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMua2V5ID0ga2V5O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGVBc3luYyhyZWxhdGVkUHJvdmlkZXJzVG9SZWdpc3Rlcj86IFZhbGlkYXRpb25TZXJ2aWNlW10sIGl0ZW0/OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9hY3Rpb25TZXJ2aWNlLmV4ZWN1dGVBc3luYygoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChyZWxhdGVkUHJvdmlkZXJzVG9SZWdpc3RlciAmJiByZWxhdGVkUHJvdmlkZXJzVG9SZWdpc3Rlci5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkUmVsYXRlZFByb3ZpZGVycyhyZWxhdGVkUHJvdmlkZXJzVG9SZWdpc3Rlcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5yZWdpc3RlckVsZW1lbnRzKGl0ZW0pO1xyXG4gICAgICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnRzKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGV4ZWN1dGVBc3luYyh2YWxpZENhbGxiYWNrOiAoZXJyb3JzPzogU3VtbWFyeUVycm9yW10pID0+IGFueSwgaW52YWxpZENhbGxiYWNrPzogKGVycm9ycz86IFN1bW1hcnlFcnJvcltdKSA9PiBhbnkpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcclxuICAgICAgICB0aGlzLnJldHJpZXZlU3VtbWFyeUVycm9ycygpLnN1YnNjcmliZSgocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHZhbGlkQ2FsbGJhY2spIHZhbGlkQ2FsbGJhY2socmVzcG9uc2UpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG9mKHRydWUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKGludmFsaWRDYWxsYmFjaykgaW52YWxpZENhbGxiYWNrKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBvZih0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaXNWYWxpZChzaG93OiBib29sZWFuID0gdHJ1ZSwgZm9jdXM6IGJvb2xlYW4gPSB0cnVlKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKHNob3cpIHtcclxuICAgICAgICAgICAgdGhpcy5yZXRyaWV2ZVN1bW1hcnlFcnJvcnMoKS5zdWJzY3JpYmUoKGVycm9yczogU3VtbWFyeUVycm9yW10pID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2FnZ3JlZ2F0b3JTZXJ2aWNlLnB1Ymxpc2godGhpcy5rZXksIGVycm9ycyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZm9jdXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3JzICYmIGVycm9ycy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmb2N1c0VsZW1lbnQgPSBlcnJvcnNbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlbCA9IDxhbnk+Zm9jdXNFbGVtZW50LmVsZW1lbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fYWN0aW9uU2VydmljZS5leGVjdXRlQXN5bmMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsLmZvY3VzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgdmFsaWQgPSB0cnVlO1xyXG4gICAgICAgIGlmICh0aGlzLnZhbGlkYXRvci5vcHRpb25zKSB7XHJcbiAgICAgICAgICAgIHRoaXMudmFsaWRhdG9yLm9wdGlvbnMuZm9yRWFjaCgob3B0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwYXlsb2FkID0gdGhpcy52YWxpZGF0b3IucGF5bG9hZFJlZigpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZmllbGRWYWx1ZSA9IG9wdGlvbi52YWx1ZVJlc29sdmVyID8gb3B0aW9uLnZhbHVlUmVzb2x2ZXIobnVsbCwgcGF5bG9hZCkgOiBudWxsO1xyXG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbi5ydWxlcykge1xyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbi5ydWxlcy5mb3JFYWNoKChhY3Rpb24pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFjdGlvbi5pc1ZhbGlkICE9IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhY3Rpb24uaXNWYWxpZCA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmaWVsZFZhbHVlKSB2YWxpZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdmFsaWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGhhbmRsZUVycm9ycyhjYWxsYmFjaz86IChyZXNwb25zZTogU3VtbWFyeUVycm9yW10pID0+IHZvaWQpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnJldHJpZXZlU3VtbWFyeUVycm9ycygpLnN1YnNjcmliZSgocmVzKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2socmVzKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY29tbWl0KGNhbGxiYWNrPzogRnVuY3Rpb24pOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yZXRyaWV2ZVN1bW1hcnlFcnJvcnMoKS5waXBlKFxyXG4gICAgICAgICAgICBtYXAoZXJyb3JzID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2soZXJyb3JzKTtcclxuICAgICAgICAgICAgICAgIGlmIChlcnJvcnMubGVuZ3RoID09IDApIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9KSwgdGFrZSgxKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldEVsZW1lbnRFcnJvcihlbGVtZW50OiBFbGVtZW50LCBhY3Rpb246IFZhbGlkYXRpb25SdWxlLCBvcHRpb246IFZhbGlkYXRpb25PcHRpb24pOiBzdHJpbmcge1xyXG4gICAgICAgIGlmICghZWxlbWVudCkgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3MoZWxlbWVudCwgVmFsaWRhdGlvbkNvbnN0YW50LlN1Y2Nlc3NFbGVtZW50Q2xhc3MpO1xyXG4gICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoZWxlbWVudCwgb3B0aW9uLmVycm9yRWxlbWVudENsYXNzKTtcclxuICAgICAgICBsZXQgZXJyb3JFbGVtZW50ID0gdGhpcy5maW5kRXJyb3JFbGVtZW50KGVsZW1lbnQpO1xyXG4gICAgICAgIGlmICghZXJyb3JFbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGVycm9yRWxlbWVudCA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudCgndWwnKTtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUoZXJyb3JFbGVtZW50LCBWYWxpZGF0aW9uQ29uc3RhbnQuRVJST1JfRUxFTUVOVF9JRCwgYCR7dGhpcy5fZGF0YVNlcnZpY2UubmV3R3VpZCgpfWApO1xyXG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZShlcnJvckVsZW1lbnQsICdzdHlsZScsIHRoaXMuc3R5bGVzKTtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhlcnJvckVsZW1lbnQsIHRoaXMuZXJyQ2xhc3MpO1xyXG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGVycm9yRWxlbWVudCwgb3B0aW9uLmVycm9yTWVzc2FnZUNsYXNzKTtcclxuICAgICAgICAgICAgY29uc3QgcGFyZW50RWxlbWVudCA9IHRoaXMucmVuZGVyZXIucGFyZW50Tm9kZShlbGVtZW50KTtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChwYXJlbnRFbGVtZW50LCBlcnJvckVsZW1lbnQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgZXJyb3JJdGVtRWxlbWVudEtleTogc3RyaW5nID0gYCR7YWN0aW9uLmlkfWA7XHJcbiAgICAgICAgbGV0IGVycm9ySXRlbUVsZW1lbnQgPSB0aGlzLmZpbmRFcnJvckl0ZW1FbGVtZW50KGVycm9yRWxlbWVudCwgZXJyb3JJdGVtRWxlbWVudEtleSk7XHJcbiAgICAgICAgY29uc3QgZHluYW1pY1NlcXVlbmNlSWQgPSB0aGlzLmZpbmREeW5hbWljU2VxdWVuY2VJZChlbGVtZW50KTtcclxuICAgICAgICBjb25zdCBlcnJvck1lc3NhZ2UgPSBhY3Rpb24uZXJyb3JNZXNzYWdlKGVsZW1lbnQsIGR5bmFtaWNTZXF1ZW5jZUlkKTtcclxuXHJcbiAgICAgICAgaWYgKCFlcnJvckl0ZW1FbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGVycm9ySXRlbUVsZW1lbnQgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKGVycm9ySXRlbUVsZW1lbnQsIFZhbGlkYXRpb25Db25zdGFudC5FUlJPUl9JVEVNX0VMRU1FTlRfSUQsIGVycm9ySXRlbUVsZW1lbnRLZXkpO1xyXG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKGVycm9ySXRlbUVsZW1lbnQsIHRoaXMucmVuZGVyZXIuY3JlYXRlVGV4dChlcnJvck1lc3NhZ2UpKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQoZXJyb3JFbGVtZW50LCBlcnJvckl0ZW1FbGVtZW50KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGVycm9yTWVzc2FnZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xlYXJFcnJvckl0ZW1FbGVtZW50KGVsZW1lbnQ6IGFueSwgYWN0aW9uOiBWYWxpZGF0aW9uUnVsZSkge1xyXG4gICAgICAgIGxldCBlcnJvckVsZW1lbnQgPSB0aGlzLmZpbmRFcnJvckVsZW1lbnQoZWxlbWVudCk7XHJcbiAgICAgICAgaWYgKCFlcnJvckVsZW1lbnQpIHJldHVybjtcclxuXHJcbiAgICAgICAgY29uc3QgZXJyb3JJdGVtRWxlbWVudEtleTogc3RyaW5nID0gYCR7YWN0aW9uLmlkfWA7XHJcbiAgICAgICAgbGV0IGVycm9ySXRlbUVsZW1lbnQgPSB0aGlzLmZpbmRFcnJvckl0ZW1FbGVtZW50KGVycm9yRWxlbWVudCwgZXJyb3JJdGVtRWxlbWVudEtleSk7XHJcbiAgICAgICAgaWYgKCFlcnJvckl0ZW1FbGVtZW50KSByZXR1cm47XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDaGlsZChlcnJvckVsZW1lbnQsIGVycm9ySXRlbUVsZW1lbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpc0RpcnR5KGNhbGxiYWNrPzogKGl0ZW1zOiBDaGFuZ2VkSXRlbVtdKSA9PiB2b2lkKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmNoYW5nZWRJdGVtcyB8fCB0aGlzLmNoYW5nZWRJdGVtcy5sZW5ndGggPT0gMCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIHZhciByZXNwb25zZSA9IHRoaXMuY2hhbmdlZEl0ZW1zLmZpbHRlcihzID0+IHMuY2hhbmdlKTtcclxuICAgICAgICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrKHJlc3BvbnNlKTtcclxuICAgICAgICByZXR1cm4gcmVzcG9uc2UubGVuZ3RoID4gMDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3luY0Vycm9yTWVzc2FnZXMoZWxlbWVudDogYW55LCBvcHRpb246IFZhbGlkYXRpb25PcHRpb24pOiBTdW1tYXJ5RXJyb3IgfCBudWxsIHtcclxuICAgICAgICBsZXQgZXJyb3JNZXNzYWdlczogc3RyaW5nW10gPSBbXTtcclxuICAgICAgICBvcHRpb24ucnVsZXMuZm9yRWFjaChhY3Rpb24gPT4ge1xyXG4gICAgICAgICAgICBpZiAoYWN0aW9uLmlzVmFsaWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJFcnJvckl0ZW1FbGVtZW50KGVsZW1lbnQsIGFjdGlvbik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBlcnJvck1lc3NhZ2UgPSB0aGlzLnNldEVsZW1lbnRFcnJvcihlbGVtZW50LCBhY3Rpb24sIG9wdGlvbik7XHJcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2VzLnB1c2goZXJyb3JNZXNzYWdlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zdCBpbnZhbGlkQWN0aW9ucyA9IG9wdGlvbi5ydWxlcy5maWx0ZXIoeCA9PiAheC5pc1ZhbGlkKTtcclxuICAgICAgICBpZiAoaW52YWxpZEFjdGlvbnMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3MoZWxlbWVudCwgb3B0aW9uLmVycm9yRWxlbWVudENsYXNzKTtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyhlbGVtZW50LCBvcHRpb24uc3VjY2Vzc0VsZW1lbnRDbGFzcyk7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZWxlbWVudDogZWxlbWVudCxcclxuICAgICAgICAgICAgbWVzc2FnZXM6IGVycm9yTWVzc2FnZXNcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHZhbGlkYXRlRWxlbWVudEFzeW5jKGVsZW1lbnQ6IGFueSwgb3B0aW9uOiBWYWxpZGF0aW9uT3B0aW9uKTogT2JzZXJ2YWJsZTxTdW1tYXJ5RXJyb3JbXT4ge1xyXG4gICAgICAgIGNvbnN0IGVycm9ycyQgPSBbdGhpcy52YWxpZGF0ZUVsZW1lbnQoZWxlbWVudCwgb3B0aW9uKS5waXBlKFxyXG4gICAgICAgICAgICBtYXAobmV3T3B0aW9uID0+IG9wdGlvbiA9IG5ld09wdGlvbiksXHJcbiAgICAgICAgICAgIG1hcChvcHRpb24gPT4gdGhpcy5zeW5jRXJyb3JNZXNzYWdlcyhlbGVtZW50LCBvcHRpb24pKSxcclxuICAgICAgICApXTtcclxuXHJcbiAgICAgICAgY29uc3QgZXJyb3JCYXRjaCA9IGZvcmtKb2luKGVycm9ycyQpO1xyXG4gICAgICAgIGNvbnN0IHJlbGF0ZWRFcnJvcnMgPSA8T2JzZXJ2YWJsZTxTdW1tYXJ5RXJyb3JbXT4+dGhpcy5yZWxhdGVkUHJvdmlkZXJzLnJlZHVjZSgocHJldmlvdXM6IE9ic2VydmFibGU8U3VtbWFyeUVycm9yW10+LCBwcm92aWRlcjogVmFsaWRhdGlvblNlcnZpY2UpID0+IHtcclxuICAgICAgICAgICAgY29uc3Qgc3ViRXJyb3JzJCA9IHByb3ZpZGVyLnJldHJpZXZlU3VtbWFyeUVycm9ycygpO1xyXG4gICAgICAgICAgICByZXR1cm4gbWVyZ2UocHJldmlvdXMsIHN1YkVycm9ycyQpO1xyXG4gICAgICAgIH0sIG9mKFtdKSk7XHJcblxyXG4gICAgICAgIHJldHVybiBmb3JrSm9pbihlcnJvckJhdGNoLCByZWxhdGVkRXJyb3JzKS5waXBlKFxyXG4gICAgICAgICAgICBkZWZhdWx0SWZFbXB0eShbW10sIFtdXSksXHJcbiAgICAgICAgICAgIG1hcCh2YWx1ZSA9PiBbLi4udmFsdWVbMF0sIC4uLnZhbHVlWzFdXSksXHJcbiAgICAgICAgICAgIG1hcChyZXN1bHQgPT4gW10uY29uY2F0KHJlc3VsdC5maWx0ZXIoZXJyb3IgPT4gZXJyb3IpKSksXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdmFsaWRhdGVFbGVtZW50KGVsZW1lbnQ6IGFueSwgb3B0aW9uOiBWYWxpZGF0aW9uT3B0aW9uLCBhbGw6IGJvb2xlYW4gPSBmYWxzZSk6IE9ic2VydmFibGU8VmFsaWRhdGlvbk9wdGlvbj4ge1xyXG4gICAgICAgIGNvbnN0IHBheWxvYWQgPSB0aGlzLnZhbGlkYXRvci5wYXlsb2FkUmVmKCk7XHJcbiAgICAgICAgY29uc3QgZmllbGRWYWx1ZSA9IG9wdGlvbi52YWx1ZVJlc29sdmVyID8gb3B0aW9uLnZhbHVlUmVzb2x2ZXIob3B0aW9uLml0ZW1SZWYsIHBheWxvYWQpIDogbnVsbDtcclxuICAgICAgICBjb25zdCB2YWxpZGF0ZWRBY3Rpb25zJCA9IG9wdGlvbi5ydWxlcy5tYXAoYWN0aW9uID0+IHtcclxuICAgICAgICAgICAgc3dpdGNoIChhY3Rpb24ua2V5KSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFZhbGlkYXRpb25Db25zdGFudC5SZXF1aXJlZDoge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRpb25Qcm92aWRlci5yZXF1aXJlZChmaWVsZFZhbHVlKS5waXBlKG1hcChpc1ZhbGlkID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uLmlzVmFsaWQgPSBpc1ZhbGlkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWN0aW9uO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNhc2UgVmFsaWRhdGlvbkNvbnN0YW50LkVtYWlsOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudmFsaWRhdGlvblByb3ZpZGVyLmVtYWlsKGZpZWxkVmFsdWUpLnBpcGUobWFwKGlzVmFsaWQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb24uaXNWYWxpZCA9IGlzVmFsaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhY3Rpb247XHJcbiAgICAgICAgICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2FzZSBWYWxpZGF0aW9uQ29uc3RhbnQuUGhvbmU6IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy52YWxpZGF0aW9uUHJvdmlkZXIucGhvbmUoZmllbGRWYWx1ZSkucGlwZShtYXAoaXNWYWxpZCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbi5pc1ZhbGlkID0gaXNWYWxpZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFjdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjYXNlIFZhbGlkYXRpb25Db25zdGFudC5DdXN0b206IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWFjdGlvbi5leGVjdXRlKSB0aHJvdyBuZXcgRXJyb3IoJyFhY3Rpb24uZXhlY3V0ZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghYWxsICYmICFhY3Rpb24ucmVxdWlyZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFmaWVsZFZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb24uaXNWYWxpZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2YoYWN0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXF1aXJlZFJ1bGUgPSBvcHRpb24ucnVsZXMuZmluZChzID0+IHMua2V5ID09IFZhbGlkYXRpb25Db25zdGFudC5SZXF1aXJlZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVxdWlyZWRSdWxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWRSdWxlLmlzVmFsaWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNlcXVlbmNlSWQgPSB0aGlzLmZpbmREeW5hbWljU2VxdWVuY2VJZChlbGVtZW50KTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWN0aW9uLmV4ZWN1dGUoZmllbGRWYWx1ZSwgcGF5bG9hZCwgK3NlcXVlbmNlSWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5waXBlKG1hcChyZXNwb25zZSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb24uaXNWYWxpZCA9IHJlc3BvbnNlLnN0YXR1cztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UubWVzc2FnZSkgYWN0aW9uLmVycm9yTWVzc2FnZSA9ICgpID0+IHsgcmV0dXJuIHJlc3BvbnNlLm1lc3NhZ2U7IH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWN0aW9uO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OiB0aHJvdyBuZXcgRXJyb3IoYFVuaGFuZGxlZCBhY3Rpb246ICR7YWN0aW9uLmtleX1gKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gZm9ya0pvaW4odmFsaWRhdGVkQWN0aW9ucyQpLnBpcGUoXHJcbiAgICAgICAgICAgIHRha2UoMSksXHJcbiAgICAgICAgICAgIG1hcCh2YWxpZGF0ZWRBY3Rpb25zID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChvcHRpb24ucmVsZXZhbnRGaWVsZHMpIHRoaXMudmFsaWRhdGVSZWxldmFudEZpZWxkcyhvcHRpb24ucmVsZXZhbnRGaWVsZHMocGF5bG9hZCkpO1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uLnJ1bGVzID0gdmFsaWRhdGVkQWN0aW9ucztcclxuICAgICAgICAgICAgICAgIHJldHVybiBvcHRpb247XHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB2YWxpZGF0ZVJlbGV2YW50RmllbGRzKHJlbGV2YW50RmllbGRzPzogc3RyaW5nW10pOiB2b2lkIHtcclxuICAgICAgICBpZiAoIXJlbGV2YW50RmllbGRzIHx8IHJlbGV2YW50RmllbGRzLmxlbmd0aCA9PSAwKSByZXR1cm47XHJcbiAgICAgICAgaWYgKHJlbGV2YW50RmllbGRzICYmIHJlbGV2YW50RmllbGRzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgcmVsZXZhbnRGaWVsZHMuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5lbGVtZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBhdHRyaWJ1dGVzID0gdGhpcy5lbGVtZW50c1tpXS5hdHRyaWJ1dGVzO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhdHRyaWJ1dGVzICYmIGF0dHJpYnV0ZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYXR0cmlidXRlc1t0aGlzLmF0dHJpYnV0ZU5hbWVdLnZhbHVlID09IGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvcHRpb24gPSB0aGlzLmZpbmRFbGVtZW50T3B0aW9uKHRoaXMuZWxlbWVudHNbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudmFsaWRhdGVFbGVtZW50KHRoaXMuZWxlbWVudHNbaV0sIG9wdGlvbiwgdHJ1ZSkucGlwZShcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFwKG5ld09wdGlvbiA9PiBvcHRpb24gPSBuZXdPcHRpb24pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXAob3B0aW9uID0+IHRoaXMuc3luY0Vycm9yTWVzc2FnZXModGhpcy5lbGVtZW50c1tpXSwgb3B0aW9uKSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKS5zdWJzY3JpYmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZXRyaWV2ZVN1bW1hcnlFcnJvcnMoKTogT2JzZXJ2YWJsZTxTdW1tYXJ5RXJyb3JbXT4ge1xyXG4gICAgICAgIGNvbnN0IGVycm9ycyQgPSB0aGlzLmVsZW1lbnRzLm1hcChlbGVtZW50ID0+IHtcclxuICAgICAgICAgICAgbGV0IHZhbGlkYXRpb25PcHRpb24gPSB0aGlzLmZpbmRFbGVtZW50T3B0aW9uKGVsZW1lbnQpO1xyXG4gICAgICAgICAgICBpZiAoIXZhbGlkYXRpb25PcHRpb24pIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRlRWxlbWVudChlbGVtZW50LCB2YWxpZGF0aW9uT3B0aW9uKS5waXBlKFxyXG4gICAgICAgICAgICAgICAgbWFwKG5ld09wdGlvbiA9PiB2YWxpZGF0aW9uT3B0aW9uID0gbmV3T3B0aW9uKSxcclxuICAgICAgICAgICAgICAgIG1hcChvcHRpb24gPT4gdGhpcy5zeW5jRXJyb3JNZXNzYWdlcyhlbGVtZW50LCBvcHRpb24pKSxcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29uc3QgZXJyb3JCYXRjaCA9IGZvcmtKb2luKGVycm9ycyQpO1xyXG4gICAgICAgIGNvbnN0IHJlbGF0ZWRFcnJvcnMgPSA8T2JzZXJ2YWJsZTxTdW1tYXJ5RXJyb3JbXT4+dGhpcy5yZWxhdGVkUHJvdmlkZXJzLnJlZHVjZSgocHJldmlvdXM6IE9ic2VydmFibGU8U3VtbWFyeUVycm9yW10+LCBwcm92aWRlcjogVmFsaWRhdGlvblNlcnZpY2UpID0+IHtcclxuICAgICAgICAgICAgY29uc3Qgc3ViRXJyb3JzJCA9IHByb3ZpZGVyLnJldHJpZXZlU3VtbWFyeUVycm9ycygpO1xyXG4gICAgICAgICAgICByZXR1cm4gbWVyZ2UocHJldmlvdXMsIHN1YkVycm9ycyQpO1xyXG4gICAgICAgIH0sIG9mKFtdKSk7XHJcblxyXG4gICAgICAgIHJldHVybiBmb3JrSm9pbihlcnJvckJhdGNoLCByZWxhdGVkRXJyb3JzKS5waXBlKFxyXG4gICAgICAgICAgICBkZWZhdWx0SWZFbXB0eShbW10sIFtdXSksXHJcbiAgICAgICAgICAgIG1hcCh2YWx1ZSA9PiBbLi4udmFsdWVbMF0sIC4uLnZhbHVlWzFdXSksXHJcbiAgICAgICAgICAgIG1hcChyZXN1bHQgPT4gW10uY29uY2F0KHJlc3VsdC5maWx0ZXIoZXJyb3IgPT4gZXJyb3IpKSksXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGZpbmRFbGVtZW50T3B0aW9uKGVsZW1lbnQ6IEVsZW1lbnQpOiBWYWxpZGF0aW9uT3B0aW9uIHwgbnVsbCB7XHJcbiAgICAgICAgY29uc3QgdmFsaWRhdGlvbklkQXR0cmlidXRlID0gZWxlbWVudC5hdHRyaWJ1dGVzW1ZhbGlkYXRpb25Db25zdGFudC5WQUxJREFUSU9OX0lEXTtcclxuICAgICAgICBpZiAoIXZhbGlkYXRpb25JZEF0dHJpYnV0ZSkgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgICAgIGNvbnN0IHZhbGlkYXRpb25JZCA9IHZhbGlkYXRpb25JZEF0dHJpYnV0ZS52YWx1ZTtcclxuICAgICAgICBpZiAoIXZhbGlkYXRpb25JZCkgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsaWRhdG9yLm9wdGlvbnMuZmluZChvcHRpb24gPT4gb3B0aW9uLnZhbGlkYXRpb25JZCA9PT0gdmFsaWRhdGlvbklkKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGZpbmRFcnJvckl0ZW1FbGVtZW50KGVycm9yRWxlbWVudDogYW55LCBrZXk6IHN0cmluZyk6IGFueSB8IG51bGwge1xyXG4gICAgICAgIGNvbnN0IGNoaWxkcmVuID0gPEVsZW1lbnRbXT5BcnJheS5mcm9tKGVycm9yRWxlbWVudC5jaGlsZHJlbik7XHJcbiAgICAgICAgcmV0dXJuIGNoaWxkcmVuXHJcbiAgICAgICAgICAgIC5maWx0ZXIoeCA9PiB4LmF0dHJpYnV0ZXNbVmFsaWRhdGlvbkNvbnN0YW50LkVSUk9SX0lURU1fRUxFTUVOVF9JRF0pXHJcbiAgICAgICAgICAgIC5maW5kKHggPT4geC5hdHRyaWJ1dGVzW1ZhbGlkYXRpb25Db25zdGFudC5FUlJPUl9JVEVNX0VMRU1FTlRfSURdLnZhbHVlID09PSBrZXkpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZmluZER5bmFtaWNTZXF1ZW5jZUlkKGVsZW1lbnQ6IEVsZW1lbnQpOiBzdHJpbmcgfCBudWxsIHtcclxuICAgICAgICBjb25zdCBzZXF1ZW5jZUlkQXR0cmlidXRlID0gZWxlbWVudC5hdHRyaWJ1dGVzW1ZhbGlkYXRpb25Db25zdGFudC5BUlJBWV9TRVFVRU5DRV9JRF07XHJcbiAgICAgICAgaWYgKCFzZXF1ZW5jZUlkQXR0cmlidXRlKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgICAgICAgY29uc3Qgc2VxdWVuY2VJZCA9IHNlcXVlbmNlSWRBdHRyaWJ1dGUudmFsdWU7XHJcbiAgICAgICAgaWYgKCFzZXF1ZW5jZUlkKSByZXR1cm4gbnVsbDtcclxuICAgICAgICByZXR1cm4gc2VxdWVuY2VJZDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGZpbmRFcnJvckVsZW1lbnQoZWxlbWVudDogRWxlbWVudCk6IEVsZW1lbnQge1xyXG4gICAgICAgIGlmIChlbGVtZW50LnBhcmVudEVsZW1lbnQgJiYgZWxlbWVudC5wYXJlbnRFbGVtZW50LmNoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNsaWJpbmdzID0gPEVsZW1lbnRbXT5BcnJheS5mcm9tKGVsZW1lbnQucGFyZW50RWxlbWVudC5jaGlsZHJlbik7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSBzbGliaW5ncy5maWx0ZXIoeCA9PiB4LmF0dHJpYnV0ZXMpLmZpbmQoeCA9PiB4LmF0dHJpYnV0ZXNbVmFsaWRhdGlvbkNvbnN0YW50LkVSUk9SX0VMRU1FTlRfSURdKTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZWdpc3RlckVsZW1lbnRzKGl0ZW0/OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBub25EeW5hbWljT3B0aW9ucyA9IHRoaXMudmFsaWRhdG9yLm9wdGlvbnMuZmlsdGVyKHggPT4gIXguZHluYW1pYyk7XHJcbiAgICAgICAgY29uc3Qgbm9uRHluYW1pY0VsZW1lbnRzID0gbm9uRHluYW1pY09wdGlvbnMucmVkdWNlKChwcmV2aW91czogRWxlbWVudFtdLCBjdXJyZW50OiBWYWxpZGF0aW9uT3B0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBxdWVyeSA9IGAqWyR7dGhpcy5hdHRyaWJ1dGVOYW1lfT1cIiR7Y3VycmVudC52YWxpZGF0aW9uTmFtZX1cIl1gO1xyXG4gICAgICAgICAgICBpZiAodGhpcy52YWxpZGF0b3Iuc2NvcGUpIHtcclxuICAgICAgICAgICAgICAgIHF1ZXJ5ICs9IGBbc2NvcGU9XCIke3RoaXMudmFsaWRhdG9yLnNjb3BlfVwiXWA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3QgZWxlbWVudHMgPSA8RWxlbWVudFtdPkFycmF5LmZyb20odGhpcy52YWxpZGF0b3IuZm9ybVJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwocXVlcnkpKTtcclxuICAgICAgICAgICAgZWxlbWVudHMuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHZhbGlkYXRpb25JZCA9IHRoaXMuX2RhdGFTZXJ2aWNlLm5ld0d1aWQoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKGVsZW1lbnQsIFZhbGlkYXRpb25Db25zdGFudC5WQUxJREFUSU9OX0lELCB2YWxpZGF0aW9uSWQpO1xyXG4gICAgICAgICAgICAgICAgY3VycmVudC52YWxpZGF0aW9uSWQgPSB2YWxpZGF0aW9uSWQ7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gcHJldmlvdXMuY29uY2F0KGVsZW1lbnRzKTtcclxuICAgICAgICB9LCBbXSk7XHJcblxyXG4gICAgICAgIGxldCBnZW5lcmF0ZWREeW5hbWljT3B0aW9ucyA9IFtdO1xyXG4gICAgICAgIGxldCBkeW5hbWljRWxlbWVudHMgPSBbXTtcclxuICAgICAgICB0aGlzLnZhbGlkYXRvci5vcHRpb25zID0gdGhpcy52YWxpZGF0b3Iub3B0aW9ucy5maWx0ZXIoeCA9PiAheC5keW5hbWljKTtcclxuICAgICAgICB0aGlzLnZpcnR1YWxWYWxpZGF0aW9uT3B0aW9ucy5mb3JFYWNoKChjdXJyZW50OiBWYWxpZGF0aW9uT3B0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBxdWVyeSA9IGAqWyR7dGhpcy5hdHRyaWJ1dGVOYW1lfT1cIiR7Y3VycmVudC52YWxpZGF0aW9uTmFtZX1cIl1gO1xyXG4gICAgICAgICAgICBpZiAodGhpcy52YWxpZGF0b3Iuc2NvcGUpIHtcclxuICAgICAgICAgICAgICAgIHF1ZXJ5ICs9IGBbc2NvcGU9XCIke3RoaXMudmFsaWRhdG9yLnNjb3BlfVwiXWA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3QgZWxlbWVudHMgPSBBcnJheS5mcm9tKHRoaXMudmFsaWRhdG9yLmZvcm1SZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKHF1ZXJ5KSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGNsb25lZE9wdGlvbnMgPSBlbGVtZW50cy5tYXAoKGVsZW1lbnQsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB2YWxpZGF0aW9uSWQgPSB0aGlzLl9kYXRhU2VydmljZS5uZXdHdWlkKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZShlbGVtZW50LCBWYWxpZGF0aW9uQ29uc3RhbnQuVkFMSURBVElPTl9JRCwgdmFsaWRhdGlvbklkKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKGVsZW1lbnQsIFZhbGlkYXRpb25Db25zdGFudC5BUlJBWV9TRVFVRU5DRV9JRCwgaW5kZXgudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC4uLmN1cnJlbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvbklkOiB2YWxpZGF0aW9uSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbVJlZjogaXRlbSxcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZVJlc29sdmVyOiBjdXJyZW50LnZhbHVlUmVzb2x2ZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgPyAocGF5bG9hZDogYW55KSA9PiBjdXJyZW50LnZhbHVlUmVzb2x2ZXIoaXRlbSwgcGF5bG9hZCwgaW5kZXgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDogKCkgPT4geyByZXR1cm4gKDxhbnk+ZWxlbWVudCkudmFsdWU7IH1cclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBkeW5hbWljRWxlbWVudHMucHVzaCguLi5lbGVtZW50cyk7XHJcbiAgICAgICAgICAgIGdlbmVyYXRlZER5bmFtaWNPcHRpb25zLnB1c2goLi4uY2xvbmVkT3B0aW9ucyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMudmFsaWRhdG9yLm9wdGlvbnMgPSBub25EeW5hbWljT3B0aW9ucy5jb25jYXQoZ2VuZXJhdGVkRHluYW1pY09wdGlvbnMpO1xyXG4gICAgICAgIHRoaXMuZWxlbWVudHMgPSBub25EeW5hbWljRWxlbWVudHMuY29uY2F0KGR5bmFtaWNFbGVtZW50cyk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmVsZW1lbnRzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlZEl0ZW1zID0gW107XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudHMuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcGF5bG9hZCA9IHRoaXMudmFsaWRhdG9yLnBheWxvYWRSZWYoKTtcclxuICAgICAgICAgICAgICAgIGxldCBlbGVtZW50T3B0aW9uID0gdGhpcy5maW5kRWxlbWVudE9wdGlvbihlbGVtZW50KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlZEl0ZW1zLnB1c2gobmV3IENoYW5nZWRJdGVtKHtcclxuICAgICAgICAgICAgICAgICAgICBpZDogZWxlbWVudE9wdGlvbi52YWxpZGF0aW9uSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGQ6IGVsZW1lbnRPcHRpb24udmFsaWRhdGlvbk5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgb2xkVmFsdWU6IGVsZW1lbnRPcHRpb24udmFsdWVSZXNvbHZlciA/IGVsZW1lbnRPcHRpb24udmFsdWVSZXNvbHZlcihudWxsLCBwYXlsb2FkKSA6IG51bGxcclxuICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVnaXN0ZXJFdmVudHMoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50cy5maWx0ZXIoZWxlbWVudCA9PiBlbGVtZW50LmF0dHJpYnV0ZXNbdGhpcy5hdHRyaWJ1dGVOYW1lXSkuZm9yRWFjaCgoZWxlbWVudDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghZWxlbWVudC5mb2N1c291dExpc3RlbmVyKSB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LmZvY3Vzb3V0TGlzdGVuZXIgPSB0aGlzLnJlbmRlcmVyLmxpc3RlbihlbGVtZW50LCAnZm9jdXNvdXQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVCbHVyRXZlbnQoZWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQuZm9jdXNvdXRMaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKGVsZW1lbnQsICdjaGFuZ2UnLCAoJGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGF5bG9hZCA9IHRoaXMudmFsaWRhdG9yLnBheWxvYWRSZWYoKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZWxlbWVudE9wdGlvbiA9IHRoaXMuZmluZEVsZW1lbnRPcHRpb24oZWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gZWxlbWVudE9wdGlvbi52YWx1ZVJlc29sdmVyID8gZWxlbWVudE9wdGlvbi52YWx1ZVJlc29sdmVyKG51bGwsIHBheWxvYWQpIDogbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZWxlbWVudE9wdGlvbiAmJiBlbGVtZW50T3B0aW9uLmRpcnR5Q2hlY2spIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGN1cnJlbnRJdGVtID0gdGhpcy5jaGFuZ2VkSXRlbXMuZmluZChzID0+IHMuaWQgPT0gZWxlbWVudE9wdGlvbi52YWxpZGF0aW9uSWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWN1cnJlbnRJdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZWRJdGVtcy5wdXNoKG5ldyBDaGFuZ2VkSXRlbSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IGVsZW1lbnRPcHRpb24udmFsaWRhdGlvbklkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkOiBlbGVtZW50T3B0aW9uLnZhbGlkYXRpb25OYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB2YWx1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRJdGVtLnZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudEl0ZW0ub2xkVmFsdWUgPT0gdW5kZWZpbmVkIHx8IGN1cnJlbnRJdGVtLm9sZFZhbHVlID09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlID09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PSAnJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50SXRlbS5jaGFuZ2UgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50SXRlbS5jaGFuZ2UgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlID09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PSAnJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50SXRlbS5jaGFuZ2UgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50SXRlbS5vbGRWYWx1ZS50b1N0cmluZygpICE9IGN1cnJlbnRJdGVtLnZhbHVlLnRvU3RyaW5nKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRJdGVtLmNoYW5nZSA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudEl0ZW0uY2hhbmdlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVsZW1lbnRPcHRpb24gJiYgZWxlbWVudE9wdGlvbi5ydWxlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50T3B0aW9uLnJ1bGVzLmZvckVhY2goKHJ1bGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJ1bGUuaXNWYWxpZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaGFuZGxlQmx1ckV2ZW50KGVsZW1lbnQ6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIGxldCBlbGVtZW50T3B0aW9uID0gdGhpcy5maW5kRWxlbWVudE9wdGlvbihlbGVtZW50KTtcclxuICAgICAgICBpZiAoIWVsZW1lbnRPcHRpb24pIHRocm93IG5ldyBFcnJvcignIWVsZW1lbnRPcHRpb24nKTtcclxuXHJcbiAgICAgICAgdGhpcy52YWxpZGF0ZUVsZW1lbnQoZWxlbWVudCwgZWxlbWVudE9wdGlvbikucGlwZSh0YWtlKDEpKS5zdWJzY3JpYmUobmV3T3B0aW9uID0+IHtcclxuICAgICAgICAgICAgZWxlbWVudE9wdGlvbiA9IG5ld09wdGlvbjtcclxuICAgICAgICAgICAgdGhpcy5zeW5jRXJyb3JNZXNzYWdlcyhlbGVtZW50LCBlbGVtZW50T3B0aW9uKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFkZFJlbGF0ZWRQcm92aWRlcnMocHJvdmlkZXJzOiBWYWxpZGF0aW9uU2VydmljZVtdKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IG5ld1Byb3ZpZGVycyA9IHByb3ZpZGVycy5maWx0ZXIoeCA9PiB0aGlzLnJlbGF0ZWRQcm92aWRlcnMuaW5kZXhPZih4KSA8IDApO1xyXG4gICAgICAgIG5ld1Byb3ZpZGVycy5mb3JFYWNoKHByb3ZpZGVyID0+XHJcbiAgICAgICAgICAgIHByb3ZpZGVyLm9uRGVzdHJveS5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZWxhdGVkUHJvdmlkZXJzID0gdGhpcy5yZWxhdGVkUHJvdmlkZXJzLmZpbHRlcigoKSA9PiB0aGlzLnJlbGF0ZWRQcm92aWRlcnMuaW5kZXhPZihwcm92aWRlcikgPCAwKTtcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgIHRoaXMucmVsYXRlZFByb3ZpZGVycy5wdXNoKC4uLm5ld1Byb3ZpZGVycyk7XHJcbiAgICB9XHJcbn0iXX0=