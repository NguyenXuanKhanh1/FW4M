/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
export class ValidationService {
    /**
     * @param {?} rendererFactory
     * @param {?} validationProvider
     * @param {?} _dataService
     * @param {?} _actionService
     * @param {?} _aggregatorService
     */
    constructor(rendererFactory, validationProvider, _dataService, _actionService, _aggregatorService) {
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
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
        this.onDestroy.emit();
    }
    /**
     * @param {?} model
     * @return {?}
     */
    init(model) {
        this.validator = model.validator;
        if (!this.validator.payloadRef)
            this.validator.payloadRef = (/**
             * @return {?}
             */
            () => { return {}; });
        if (this.validator.relatedValidationProviders) {
            this.addRelatedProviders(this.validator.relatedValidationProviders);
        }
        this.validator.options.forEach((/**
         * @param {?} option
         * @return {?}
         */
        option => {
            if (!option.displayText)
                option.displayText = option.validationName;
            if (!option.payloadRef)
                option.payloadRef = this.validator.payloadRef;
            option.rules.forEach((/**
             * @param {?} action
             * @return {?}
             */
            action => {
                if (!action.id)
                    action.id = this._dataService.newGuid();
                if (!action.errorMessage) {
                    switch (action.key) {
                        case ValidationConstant.Required: {
                            action.errorMessage = (/**
                             * @param {?} element
                             * @param {?} rowIndex
                             * @return {?}
                             */
                            (element, rowIndex) => {
                                /** @type {?} */
                                const displayingRowIndex = (+rowIndex + 1).toString();
                                return `${option.displayText}${option.dynamic ? ' [' + displayingRowIndex + ']' : ''} ${this.validator.requiredMessage}`;
                            });
                            break;
                        }
                        default: {
                            action.errorMessage = (/**
                             * @return {?}
                             */
                            () => `${option.displayText} ${this.validator.invalidMessage}`);
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
        x => x.dynamic));
        this.updateAsync();
    }
    /**
     * @param {?} key
     * @return {?}
     */
    setKey(key) {
        if (!this.key)
            this.key = key;
    }
    /**
     * @param {?=} relatedProvidersToRegister
     * @param {?=} item
     * @return {?}
     */
    updateAsync(relatedProvidersToRegister, item) {
        this._actionService.executeAsync((/**
         * @return {?}
         */
        () => {
            if (relatedProvidersToRegister && relatedProvidersToRegister.length) {
                this.addRelatedProviders(relatedProvidersToRegister);
            }
            this.registerElements(item);
            this.registerEvents();
        }));
    }
    /**
     * @param {?} validCallback
     * @param {?=} invalidCallback
     * @return {?}
     */
    executeAsync(validCallback, invalidCallback) {
        this.retrieveSummaryErrors().subscribe((/**
         * @param {?} response
         * @return {?}
         */
        (response) => {
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
    }
    /**
     * @param {?=} show
     * @param {?=} focus
     * @return {?}
     */
    isValid(show = true, focus = true) {
        if (show) {
            this.retrieveSummaryErrors().subscribe((/**
             * @param {?} errors
             * @return {?}
             */
            (errors) => {
                this._aggregatorService.publish(this.key, errors);
                if (focus) {
                    if (errors && errors.length > 0) {
                        /** @type {?} */
                        var focusElement = errors[0];
                        /** @type {?} */
                        var el = (/** @type {?} */ (focusElement.element));
                        if (el) {
                            this._actionService.executeAsync((/**
                             * @return {?}
                             */
                            () => {
                                el.focus();
                            }));
                        }
                    }
                }
            }));
        }
        /** @type {?} */
        let valid = true;
        if (this.validator.options) {
            this.validator.options.forEach((/**
             * @param {?} option
             * @return {?}
             */
            (option) => {
                /** @type {?} */
                const payload = this.validator.payloadRef();
                /** @type {?} */
                const fieldValue = option.valueResolver ? option.valueResolver(null, payload) : null;
                if (option.rules) {
                    option.rules.forEach((/**
                     * @param {?} action
                     * @return {?}
                     */
                    (action) => {
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
    }
    /**
     * @param {?=} callback
     * @return {?}
     */
    handleErrors(callback) {
        this.retrieveSummaryErrors().subscribe((/**
         * @param {?} res
         * @return {?}
         */
        (res) => {
            if (callback)
                callback(res);
        }));
    }
    /**
     * @param {?=} callback
     * @return {?}
     */
    commit(callback) {
        return this.retrieveSummaryErrors().pipe(map((/**
         * @param {?} errors
         * @return {?}
         */
        errors => {
            if (callback)
                callback(errors);
            if (errors.length == 0)
                return true;
            return false;
        })), take(1));
    }
    /**
     * @param {?} element
     * @param {?} action
     * @param {?} option
     * @return {?}
     */
    setElementError(element, action, option) {
        if (!element)
            return;
        this.renderer.removeClass(element, ValidationConstant.SuccessElementClass);
        this.renderer.addClass(element, option.errorElementClass);
        /** @type {?} */
        let errorElement = this.findErrorElement(element);
        if (!errorElement) {
            errorElement = this.renderer.createElement('ul');
            this.renderer.setAttribute(errorElement, ValidationConstant.ERROR_ELEMENT_ID, `${this._dataService.newGuid()}`);
            this.renderer.setAttribute(errorElement, 'style', this.styles);
            this.renderer.addClass(errorElement, this.errClass);
            this.renderer.addClass(errorElement, option.errorMessageClass);
            /** @type {?} */
            const parentElement = this.renderer.parentNode(element);
            this.renderer.appendChild(parentElement, errorElement);
        }
        /** @type {?} */
        const errorItemElementKey = `${action.id}`;
        /** @type {?} */
        let errorItemElement = this.findErrorItemElement(errorElement, errorItemElementKey);
        /** @type {?} */
        const dynamicSequenceId = this.findDynamicSequenceId(element);
        /** @type {?} */
        const errorMessage = action.errorMessage(element, dynamicSequenceId);
        if (!errorItemElement) {
            errorItemElement = this.renderer.createElement('li');
            this.renderer.setAttribute(errorItemElement, ValidationConstant.ERROR_ITEM_ELEMENT_ID, errorItemElementKey);
            this.renderer.appendChild(errorItemElement, this.renderer.createText(errorMessage));
            this.renderer.appendChild(errorElement, errorItemElement);
        }
        return errorMessage;
    }
    /**
     * @param {?} element
     * @param {?} action
     * @return {?}
     */
    clearErrorItemElement(element, action) {
        /** @type {?} */
        let errorElement = this.findErrorElement(element);
        if (!errorElement)
            return;
        /** @type {?} */
        const errorItemElementKey = `${action.id}`;
        /** @type {?} */
        let errorItemElement = this.findErrorItemElement(errorElement, errorItemElementKey);
        if (!errorItemElement)
            return;
        this.renderer.removeChild(errorElement, errorItemElement);
    }
    /**
     * @param {?=} callback
     * @return {?}
     */
    isDirty(callback) {
        if (!this.changedItems || this.changedItems.length == 0)
            return false;
        /** @type {?} */
        var response = this.changedItems.filter((/**
         * @param {?} s
         * @return {?}
         */
        s => s.change));
        if (callback)
            callback(response);
        return response.length > 0;
    }
    /**
     * @param {?} element
     * @param {?} option
     * @return {?}
     */
    syncErrorMessages(element, option) {
        /** @type {?} */
        let errorMessages = [];
        option.rules.forEach((/**
         * @param {?} action
         * @return {?}
         */
        action => {
            if (action.isValid) {
                this.clearErrorItemElement(element, action);
            }
            else {
                /** @type {?} */
                const errorMessage = this.setElementError(element, action, option);
                errorMessages.push(errorMessage);
            }
        }));
        /** @type {?} */
        const invalidActions = option.rules.filter((/**
         * @param {?} x
         * @return {?}
         */
        x => !x.isValid));
        if (invalidActions.length === 0) {
            this.renderer.removeClass(element, option.errorElementClass);
            this.renderer.removeClass(element, option.successElementClass);
            return null;
        }
        return {
            element: element,
            messages: errorMessages
        };
    }
    /**
     * @param {?} element
     * @param {?} option
     * @return {?}
     */
    validateElementAsync(element, option) {
        /** @type {?} */
        const errors$ = [this.validateElement(element, option).pipe(map((/**
             * @param {?} newOption
             * @return {?}
             */
            newOption => option = newOption)), map((/**
             * @param {?} option
             * @return {?}
             */
            option => this.syncErrorMessages(element, option))))];
        /** @type {?} */
        const errorBatch = forkJoin(errors$);
        /** @type {?} */
        const relatedErrors = (/** @type {?} */ (this.relatedProviders.reduce((/**
         * @param {?} previous
         * @param {?} provider
         * @return {?}
         */
        (previous, provider) => {
            /** @type {?} */
            const subErrors$ = provider.retrieveSummaryErrors();
            return merge(previous, subErrors$);
        }), of([]))));
        return forkJoin(errorBatch, relatedErrors).pipe(defaultIfEmpty([[], []]), map((/**
         * @param {?} value
         * @return {?}
         */
        value => [...value[0], ...value[1]])), map((/**
         * @param {?} result
         * @return {?}
         */
        result => [].concat(result.filter((/**
         * @param {?} error
         * @return {?}
         */
        error => error))))));
    }
    /**
     * @param {?} element
     * @param {?} option
     * @param {?=} all
     * @return {?}
     */
    validateElement(element, option, all = false) {
        /** @type {?} */
        const payload = this.validator.payloadRef();
        /** @type {?} */
        const fieldValue = option.valueResolver ? option.valueResolver(option.itemRef, payload) : null;
        /** @type {?} */
        const validatedActions$ = option.rules.map((/**
         * @param {?} action
         * @return {?}
         */
        action => {
            switch (action.key) {
                case ValidationConstant.Required: {
                    return this.validationProvider.required(fieldValue).pipe(map((/**
                     * @param {?} isValid
                     * @return {?}
                     */
                    isValid => {
                        action.isValid = isValid;
                        return action;
                    })));
                }
                case ValidationConstant.Email: {
                    return this.validationProvider.email(fieldValue).pipe(map((/**
                     * @param {?} isValid
                     * @return {?}
                     */
                    isValid => {
                        action.isValid = isValid;
                        return action;
                    })));
                }
                case ValidationConstant.Phone: {
                    return this.validationProvider.phone(fieldValue).pipe(map((/**
                     * @param {?} isValid
                     * @return {?}
                     */
                    isValid => {
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
                            s => s.key == ValidationConstant.Required));
                            if (requiredRule) {
                                requiredRule.isValid = true;
                            }
                        }
                    }
                    /** @type {?} */
                    const sequenceId = this.findDynamicSequenceId(element);
                    return action.execute(fieldValue, payload, +sequenceId)
                        .pipe(map((/**
                     * @param {?} response
                     * @return {?}
                     */
                    response => {
                        if (response) {
                            action.isValid = response.status;
                            if (response.message)
                                action.errorMessage = (/**
                                 * @return {?}
                                 */
                                () => { return response.message; });
                        }
                        return action;
                    })));
                }
                default: throw new Error(`Unhandled action: ${action.key}`);
            }
        }));
        return forkJoin(validatedActions$).pipe(take(1), map((/**
         * @param {?} validatedActions
         * @return {?}
         */
        validatedActions => {
            if (option.relevantFields)
                this.validateRelevantFields(option.relevantFields(payload));
            option.rules = validatedActions;
            return option;
        })));
    }
    /**
     * @private
     * @param {?=} relevantFields
     * @return {?}
     */
    validateRelevantFields(relevantFields) {
        if (!relevantFields || relevantFields.length == 0)
            return;
        if (relevantFields && relevantFields.length > 0) {
            relevantFields.forEach((/**
             * @param {?} item
             * @return {?}
             */
            item => {
                for (let i = 0; i < this.elements.length; i++) {
                    /** @type {?} */
                    var attributes = this.elements[i].attributes;
                    if (attributes && attributes.length > 0) {
                        if (attributes[this.attributeName].value == item) {
                            /** @type {?} */
                            var option = this.findElementOption(this.elements[i]);
                            if (option) {
                                this.validateElement(this.elements[i], option, true).pipe(map((/**
                                 * @param {?} newOption
                                 * @return {?}
                                 */
                                newOption => option = newOption)), map((/**
                                 * @param {?} option
                                 * @return {?}
                                 */
                                option => this.syncErrorMessages(this.elements[i], option)))).subscribe();
                            }
                            break;
                        }
                    }
                }
            }));
        }
    }
    /**
     * @private
     * @return {?}
     */
    retrieveSummaryErrors() {
        /** @type {?} */
        const errors$ = this.elements.map((/**
         * @param {?} element
         * @return {?}
         */
        element => {
            /** @type {?} */
            let validationOption = this.findElementOption(element);
            if (!validationOption)
                return;
            return this.validateElement(element, validationOption).pipe(map((/**
             * @param {?} newOption
             * @return {?}
             */
            newOption => validationOption = newOption)), map((/**
             * @param {?} option
             * @return {?}
             */
            option => this.syncErrorMessages(element, option))));
        }));
        /** @type {?} */
        const errorBatch = forkJoin(errors$);
        /** @type {?} */
        const relatedErrors = (/** @type {?} */ (this.relatedProviders.reduce((/**
         * @param {?} previous
         * @param {?} provider
         * @return {?}
         */
        (previous, provider) => {
            /** @type {?} */
            const subErrors$ = provider.retrieveSummaryErrors();
            return merge(previous, subErrors$);
        }), of([]))));
        return forkJoin(errorBatch, relatedErrors).pipe(defaultIfEmpty([[], []]), map((/**
         * @param {?} value
         * @return {?}
         */
        value => [...value[0], ...value[1]])), map((/**
         * @param {?} result
         * @return {?}
         */
        result => [].concat(result.filter((/**
         * @param {?} error
         * @return {?}
         */
        error => error))))));
    }
    /**
     * @private
     * @param {?} element
     * @return {?}
     */
    findElementOption(element) {
        /** @type {?} */
        const validationIdAttribute = element.attributes[ValidationConstant.VALIDATION_ID];
        if (!validationIdAttribute)
            return null;
        /** @type {?} */
        const validationId = validationIdAttribute.value;
        if (!validationId)
            return null;
        return this.validator.options.find((/**
         * @param {?} option
         * @return {?}
         */
        option => option.validationId === validationId));
    }
    /**
     * @private
     * @param {?} errorElement
     * @param {?} key
     * @return {?}
     */
    findErrorItemElement(errorElement, key) {
        /** @type {?} */
        const children = (/** @type {?} */ (Array.from(errorElement.children)));
        return children
            .filter((/**
         * @param {?} x
         * @return {?}
         */
        x => x.attributes[ValidationConstant.ERROR_ITEM_ELEMENT_ID]))
            .find((/**
         * @param {?} x
         * @return {?}
         */
        x => x.attributes[ValidationConstant.ERROR_ITEM_ELEMENT_ID].value === key));
    }
    /**
     * @private
     * @param {?} element
     * @return {?}
     */
    findDynamicSequenceId(element) {
        /** @type {?} */
        const sequenceIdAttribute = element.attributes[ValidationConstant.ARRAY_SEQUENCE_ID];
        if (!sequenceIdAttribute)
            return null;
        /** @type {?} */
        const sequenceId = sequenceIdAttribute.value;
        if (!sequenceId)
            return null;
        return sequenceId;
    }
    /**
     * @private
     * @param {?} element
     * @return {?}
     */
    findErrorElement(element) {
        if (element.parentElement && element.parentElement.children) {
            /** @type {?} */
            const slibings = (/** @type {?} */ (Array.from(element.parentElement.children)));
            /** @type {?} */
            let result = slibings.filter((/**
             * @param {?} x
             * @return {?}
             */
            x => x.attributes)).find((/**
             * @param {?} x
             * @return {?}
             */
            x => x.attributes[ValidationConstant.ERROR_ELEMENT_ID]));
            return result;
        }
        return null;
    }
    /**
     * @private
     * @param {?=} item
     * @return {?}
     */
    registerElements(item) {
        /** @type {?} */
        const nonDynamicOptions = this.validator.options.filter((/**
         * @param {?} x
         * @return {?}
         */
        x => !x.dynamic));
        /** @type {?} */
        const nonDynamicElements = nonDynamicOptions.reduce((/**
         * @param {?} previous
         * @param {?} current
         * @return {?}
         */
        (previous, current) => {
            /** @type {?} */
            let query = `*[${this.attributeName}="${current.validationName}"]`;
            if (this.validator.scope) {
                query += `[scope="${this.validator.scope}"]`;
            }
            /** @type {?} */
            const elements = (/** @type {?} */ (Array.from(this.validator.formRef.nativeElement.querySelectorAll(query))));
            elements.forEach((/**
             * @param {?} element
             * @return {?}
             */
            element => {
                /** @type {?} */
                const validationId = this._dataService.newGuid();
                this.renderer.setAttribute(element, ValidationConstant.VALIDATION_ID, validationId);
                current.validationId = validationId;
            }));
            return previous.concat(elements);
        }), []);
        /** @type {?} */
        let generatedDynamicOptions = [];
        /** @type {?} */
        let dynamicElements = [];
        this.validator.options = this.validator.options.filter((/**
         * @param {?} x
         * @return {?}
         */
        x => !x.dynamic));
        this.virtualValidationOptions.forEach((/**
         * @param {?} current
         * @return {?}
         */
        (current) => {
            /** @type {?} */
            let query = `*[${this.attributeName}="${current.validationName}"]`;
            if (this.validator.scope) {
                query += `[scope="${this.validator.scope}"]`;
            }
            /** @type {?} */
            const elements = Array.from(this.validator.formRef.nativeElement.querySelectorAll(query));
            /** @type {?} */
            const clonedOptions = elements.map((/**
             * @param {?} element
             * @param {?} index
             * @return {?}
             */
            (element, index) => {
                /** @type {?} */
                const validationId = this._dataService.newGuid();
                this.renderer.setAttribute(element, ValidationConstant.VALIDATION_ID, validationId);
                this.renderer.setAttribute(element, ValidationConstant.ARRAY_SEQUENCE_ID, index.toString());
                return Object.assign({}, current, { validationId: validationId, itemRef: item, valueResolver: current.valueResolver
                        ? (/**
                         * @param {?} payload
                         * @return {?}
                         */
                        (payload) => current.valueResolver(item, payload, index))
                        : (/**
                         * @return {?}
                         */
                        () => { return ((/** @type {?} */ (element))).value; }) });
            }));
            dynamicElements.push(...elements);
            generatedDynamicOptions.push(...clonedOptions);
        }));
        this.validator.options = nonDynamicOptions.concat(generatedDynamicOptions);
        this.elements = nonDynamicElements.concat(dynamicElements);
        if (this.elements) {
            this.changedItems = [];
            this.elements.forEach((/**
             * @param {?} element
             * @return {?}
             */
            (element) => {
                /** @type {?} */
                const payload = this.validator.payloadRef();
                /** @type {?} */
                let elementOption = this.findElementOption(element);
                this.changedItems.push(new ChangedItem({
                    id: elementOption.validationId,
                    field: elementOption.validationName,
                    oldValue: elementOption.valueResolver ? elementOption.valueResolver(null, payload) : null
                }));
            }));
        }
    }
    /**
     * @private
     * @return {?}
     */
    registerEvents() {
        this.elements.filter((/**
         * @param {?} element
         * @return {?}
         */
        element => element.attributes[this.attributeName])).forEach((/**
         * @param {?} element
         * @return {?}
         */
        (element) => {
            if (!element.focusoutListener) {
                element.focusoutListener = this.renderer.listen(element, 'focusout', (/**
                 * @return {?}
                 */
                () => {
                    this.handleBlurEvent(element);
                }));
                element.focusoutListener = this.renderer.listen(element, 'change', (/**
                 * @param {?} $event
                 * @return {?}
                 */
                ($event) => {
                    /** @type {?} */
                    const payload = this.validator.payloadRef();
                    /** @type {?} */
                    let elementOption = this.findElementOption(element);
                    /** @type {?} */
                    var value = elementOption.valueResolver ? elementOption.valueResolver(null, payload) : null;
                    if (elementOption && elementOption.dirtyCheck) {
                        /** @type {?} */
                        var currentItem = this.changedItems.find((/**
                         * @param {?} s
                         * @return {?}
                         */
                        s => s.id == elementOption.validationId));
                        if (!currentItem) {
                            this.changedItems.push(new ChangedItem({
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
                        (rule) => {
                            rule.isValid = false;
                        }));
                    }
                }));
            }
        }));
    }
    /**
     * @private
     * @param {?} element
     * @return {?}
     */
    handleBlurEvent(element) {
        /** @type {?} */
        let elementOption = this.findElementOption(element);
        if (!elementOption)
            throw new Error('!elementOption');
        this.validateElement(element, elementOption).pipe(take(1)).subscribe((/**
         * @param {?} newOption
         * @return {?}
         */
        newOption => {
            elementOption = newOption;
            this.syncErrorMessages(element, elementOption);
        }));
    }
    /**
     * @private
     * @param {?} providers
     * @return {?}
     */
    addRelatedProviders(providers) {
        /** @type {?} */
        let newProviders = providers.filter((/**
         * @param {?} x
         * @return {?}
         */
        x => this.relatedProviders.indexOf(x) < 0));
        newProviders.forEach((/**
         * @param {?} provider
         * @return {?}
         */
        provider => provider.onDestroy.subscribe((/**
         * @return {?}
         */
        () => {
            this.relatedProviders = this.relatedProviders.filter((/**
             * @return {?}
             */
            () => this.relatedProviders.indexOf(provider) < 0));
        }))));
        this.relatedProviders.push(...newProviders);
    }
}
ValidationService.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */
ValidationService.ctorParameters = () => [
    { type: RendererFactory2 },
    { type: ValidationProvider },
    { type: DataService },
    { type: ActionService },
    { type: AggregatorService }
];
ValidationService.propDecorators = {
    onDestroy: [{ type: Output }]
};
/** @nocollapse */ ValidationService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function ValidationService_Factory() { return new ValidationService(i0.ɵɵinject(i0.RendererFactory2), i0.ɵɵinject(i1.ValidationProvider), i0.ɵɵinject(i2.DataService), i0.ɵɵinject(i3.ActionService), i0.ɵɵinject(i4.AggregatorService)); }, token: ValidationService, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWZ3NGMvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9zaGFyZWQvdmFsaWRhdGlvbi92YWxpZGF0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBYSxVQUFVLEVBQUUsZ0JBQWdCLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RixPQUFPLEVBQXFDLGtCQUFrQixFQUFnQyxXQUFXLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN0SSxPQUFPLEVBQUUsWUFBWSxFQUFjLFFBQVEsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxHQUFHLEVBQUUsY0FBYyxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzNELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7Ozs7OztBQUduRSxNQUFNLE9BQU8saUJBQWlCOzs7Ozs7OztJQWMxQixZQUNjLGVBQWlDLEVBQ2pDLGtCQUFzQyxFQUN4QyxZQUF5QixFQUN6QixjQUE2QixFQUM3QixrQkFBcUM7UUFKbkMsb0JBQWUsR0FBZixlQUFlLENBQWtCO1FBQ2pDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFDeEMsaUJBQVksR0FBWixZQUFZLENBQWE7UUFDekIsbUJBQWMsR0FBZCxjQUFjLENBQWU7UUFDN0IsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFtQjtRQWxCaEMsY0FBUyxHQUF1QixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzVE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SUFBUCxzQ0FBb0U7Ozs7O0lBQ3BFLHFDQUFpQzs7Ozs7SUFDakMsc0NBQW1DOzs7OztJQUNuQyxxQ0FBZ0U7Ozs7O0lBQ2hFLG1DQUErRDs7Ozs7SUFDL0QsMENBQWlFOzs7OztJQUNqRSxxQ0FBNEI7Ozs7O0lBQzVCLDZDQUFtRDs7Ozs7SUFDbkQsMENBQXlEOzs7OztJQUN6RCxxREFBMEQ7Ozs7O0lBQzFELHlDQUF5Qzs7Ozs7SUFDekMsZ0NBQW9COzs7OztJQUdoQiw0Q0FBMkM7Ozs7O0lBQzNDLCtDQUFnRDs7Ozs7SUFDaEQseUNBQWlDOzs7OztJQUNqQywyQ0FBcUM7Ozs7O0lBQ3JDLCtDQUE2QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlbmRlcmVyMiwgSW5qZWN0YWJsZSwgUmVuZGVyZXJGYWN0b3J5MiwgRXZlbnRFbWl0dGVyLCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgVmFsaWRhdGlvbk9wdGlvbiwgQ2xpZW50VmFsaWRhdG9yLCBWYWxpZGF0aW9uQ29uc3RhbnQsIFN1bW1hcnlFcnJvciwgVmFsaWRhdGlvblJ1bGUsIENoYW5nZWRJdGVtIH0gZnJvbSAnLi92YWxpZGF0aW9uLm1vZGVsJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCBPYnNlcnZhYmxlLCBmb3JrSm9pbiwgbWVyZ2UsIG9mIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IG1hcCwgZGVmYXVsdElmRW1wdHksIHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IERhdGFTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvZGF0YS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgVmFsaWRhdGlvblByb3ZpZGVyIH0gZnJvbSAnLi92YWxpZGF0aW9uLnByb3ZpZGVyJztcclxuaW1wb3J0IHsgQWN0aW9uU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2FjdGlvbi5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQWdncmVnYXRvclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9hZ2dyZWdhdG9yLnNlcnZpY2UnO1xyXG5cclxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcclxuZXhwb3J0IGNsYXNzIFZhbGlkYXRpb25TZXJ2aWNlIHtcclxuICAgIEBPdXRwdXQoKSBwdWJsaWMgb25EZXN0cm95OiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICBwcml2YXRlIGVsZW1lbnRzOiBFbGVtZW50W10gPSBbXTtcclxuICAgIHByaXZhdGUgdmFsaWRhdG9yOiBDbGllbnRWYWxpZGF0b3I7XHJcbiAgICBwcml2YXRlIGVyckNsYXNzOiBzdHJpbmcgPSBWYWxpZGF0aW9uQ29uc3RhbnQuRGVmYXVsdEVycm9yQ2xhc3M7XHJcbiAgICBwcml2YXRlIHN0eWxlczogc3RyaW5nID0gVmFsaWRhdGlvbkNvbnN0YW50LkRlZmF1bHRFcnJvclN0eWxlcztcclxuICAgIHByaXZhdGUgYXR0cmlidXRlTmFtZTogc3RyaW5nID0gVmFsaWRhdGlvbkNvbnN0YW50LkF0dHJpYnV0ZU5hbWU7XHJcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjI7XHJcbiAgICBwcml2YXRlIHJlbGF0ZWRQcm92aWRlcnM6IFZhbGlkYXRpb25TZXJ2aWNlW10gPSBbXTtcclxuICAgIHByaXZhdGUgc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpO1xyXG4gICAgcHJpdmF0ZSB2aXJ0dWFsVmFsaWRhdGlvbk9wdGlvbnM6IFZhbGlkYXRpb25PcHRpb25bXSA9IFtdO1xyXG4gICAgcHJpdmF0ZSBjaGFuZ2VkSXRlbXM6IENoYW5nZWRJdGVtW10gPSBbXTtcclxuICAgIHByaXZhdGUga2V5OiBzdHJpbmc7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJvdGVjdGVkIHJlbmRlcmVyRmFjdG9yeTogUmVuZGVyZXJGYWN0b3J5MixcclxuICAgICAgICBwcm90ZWN0ZWQgdmFsaWRhdGlvblByb3ZpZGVyOiBWYWxpZGF0aW9uUHJvdmlkZXIsXHJcbiAgICAgICAgcHJpdmF0ZSBfZGF0YVNlcnZpY2U6IERhdGFTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgX2FjdGlvblNlcnZpY2U6IEFjdGlvblNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBfYWdncmVnYXRvclNlcnZpY2U6IEFnZ3JlZ2F0b3JTZXJ2aWNlXHJcbiAgICApIHtcclxuICAgICAgICB0aGlzLnJlbmRlcmVyID0gcmVuZGVyZXJGYWN0b3J5LmNyZWF0ZVJlbmRlcmVyKG51bGwsIG51bGwpO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25EZXN0cm95KCkge1xyXG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy51bnN1YnNjcmliZSgpO1xyXG4gICAgICAgIHRoaXMub25EZXN0cm95LmVtaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaW5pdChtb2RlbDogeyB2YWxpZGF0b3I6IENsaWVudFZhbGlkYXRvciB9KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy52YWxpZGF0b3IgPSBtb2RlbC52YWxpZGF0b3I7XHJcbiAgICAgICAgaWYgKCF0aGlzLnZhbGlkYXRvci5wYXlsb2FkUmVmKSB0aGlzLnZhbGlkYXRvci5wYXlsb2FkUmVmID0gKCkgPT4geyByZXR1cm4ge30gfTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMudmFsaWRhdG9yLnJlbGF0ZWRWYWxpZGF0aW9uUHJvdmlkZXJzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkUmVsYXRlZFByb3ZpZGVycyh0aGlzLnZhbGlkYXRvci5yZWxhdGVkVmFsaWRhdGlvblByb3ZpZGVycyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnZhbGlkYXRvci5vcHRpb25zLmZvckVhY2gob3B0aW9uID0+IHtcclxuICAgICAgICAgICAgaWYgKCFvcHRpb24uZGlzcGxheVRleHQpIG9wdGlvbi5kaXNwbGF5VGV4dCA9IG9wdGlvbi52YWxpZGF0aW9uTmFtZTtcclxuICAgICAgICAgICAgaWYgKCFvcHRpb24ucGF5bG9hZFJlZikgb3B0aW9uLnBheWxvYWRSZWYgPSB0aGlzLnZhbGlkYXRvci5wYXlsb2FkUmVmO1xyXG4gICAgICAgICAgICBvcHRpb24ucnVsZXMuZm9yRWFjaChhY3Rpb24gPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFhY3Rpb24uaWQpIGFjdGlvbi5pZCA9IHRoaXMuX2RhdGFTZXJ2aWNlLm5ld0d1aWQoKTtcclxuICAgICAgICAgICAgICAgIGlmICghYWN0aW9uLmVycm9yTWVzc2FnZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoYWN0aW9uLmtleSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFZhbGlkYXRpb25Db25zdGFudC5SZXF1aXJlZDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uLmVycm9yTWVzc2FnZSA9IChlbGVtZW50OiBFbGVtZW50LCByb3dJbmRleDogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZGlzcGxheWluZ1Jvd0luZGV4ID0gKCtyb3dJbmRleCArIDEpLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGAke29wdGlvbi5kaXNwbGF5VGV4dH0ke29wdGlvbi5keW5hbWljID8gJyBbJyArIGRpc3BsYXlpbmdSb3dJbmRleCArICddJyA6ICcnfSAke3RoaXMudmFsaWRhdG9yLnJlcXVpcmVkTWVzc2FnZX1gO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbi5lcnJvck1lc3NhZ2UgPSAoKSA9PiBgJHtvcHRpb24uZGlzcGxheVRleHR9ICR7dGhpcy52YWxpZGF0b3IuaW52YWxpZE1lc3NhZ2V9YDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnZpcnR1YWxWYWxpZGF0aW9uT3B0aW9ucyA9IHRoaXMudmFsaWRhdG9yLm9wdGlvbnMuZmlsdGVyKHggPT4geC5keW5hbWljKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZUFzeW5jKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldEtleShrZXk6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIGlmICghdGhpcy5rZXkpIHRoaXMua2V5ID0ga2V5O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGVBc3luYyhyZWxhdGVkUHJvdmlkZXJzVG9SZWdpc3Rlcj86IFZhbGlkYXRpb25TZXJ2aWNlW10sIGl0ZW0/OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9hY3Rpb25TZXJ2aWNlLmV4ZWN1dGVBc3luYygoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChyZWxhdGVkUHJvdmlkZXJzVG9SZWdpc3RlciAmJiByZWxhdGVkUHJvdmlkZXJzVG9SZWdpc3Rlci5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkUmVsYXRlZFByb3ZpZGVycyhyZWxhdGVkUHJvdmlkZXJzVG9SZWdpc3Rlcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5yZWdpc3RlckVsZW1lbnRzKGl0ZW0pO1xyXG4gICAgICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnRzKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGV4ZWN1dGVBc3luYyh2YWxpZENhbGxiYWNrOiAoZXJyb3JzPzogU3VtbWFyeUVycm9yW10pID0+IGFueSwgaW52YWxpZENhbGxiYWNrPzogKGVycm9ycz86IFN1bW1hcnlFcnJvcltdKSA9PiBhbnkpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcclxuICAgICAgICB0aGlzLnJldHJpZXZlU3VtbWFyeUVycm9ycygpLnN1YnNjcmliZSgocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHZhbGlkQ2FsbGJhY2spIHZhbGlkQ2FsbGJhY2socmVzcG9uc2UpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG9mKHRydWUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKGludmFsaWRDYWxsYmFjaykgaW52YWxpZENhbGxiYWNrKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBvZih0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaXNWYWxpZChzaG93OiBib29sZWFuID0gdHJ1ZSwgZm9jdXM6IGJvb2xlYW4gPSB0cnVlKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKHNob3cpIHtcclxuICAgICAgICAgICAgdGhpcy5yZXRyaWV2ZVN1bW1hcnlFcnJvcnMoKS5zdWJzY3JpYmUoKGVycm9yczogU3VtbWFyeUVycm9yW10pID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2FnZ3JlZ2F0b3JTZXJ2aWNlLnB1Ymxpc2godGhpcy5rZXksIGVycm9ycyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZm9jdXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3JzICYmIGVycm9ycy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmb2N1c0VsZW1lbnQgPSBlcnJvcnNbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlbCA9IDxhbnk+Zm9jdXNFbGVtZW50LmVsZW1lbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fYWN0aW9uU2VydmljZS5leGVjdXRlQXN5bmMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsLmZvY3VzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgdmFsaWQgPSB0cnVlO1xyXG4gICAgICAgIGlmICh0aGlzLnZhbGlkYXRvci5vcHRpb25zKSB7XHJcbiAgICAgICAgICAgIHRoaXMudmFsaWRhdG9yLm9wdGlvbnMuZm9yRWFjaCgob3B0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwYXlsb2FkID0gdGhpcy52YWxpZGF0b3IucGF5bG9hZFJlZigpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZmllbGRWYWx1ZSA9IG9wdGlvbi52YWx1ZVJlc29sdmVyID8gb3B0aW9uLnZhbHVlUmVzb2x2ZXIobnVsbCwgcGF5bG9hZCkgOiBudWxsO1xyXG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbi5ydWxlcykge1xyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbi5ydWxlcy5mb3JFYWNoKChhY3Rpb24pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFjdGlvbi5pc1ZhbGlkICE9IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhY3Rpb24uaXNWYWxpZCA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmaWVsZFZhbHVlKSB2YWxpZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdmFsaWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGhhbmRsZUVycm9ycyhjYWxsYmFjaz86IChyZXNwb25zZTogU3VtbWFyeUVycm9yW10pID0+IHZvaWQpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnJldHJpZXZlU3VtbWFyeUVycm9ycygpLnN1YnNjcmliZSgocmVzKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2socmVzKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY29tbWl0KGNhbGxiYWNrPzogRnVuY3Rpb24pOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yZXRyaWV2ZVN1bW1hcnlFcnJvcnMoKS5waXBlKFxyXG4gICAgICAgICAgICBtYXAoZXJyb3JzID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2soZXJyb3JzKTtcclxuICAgICAgICAgICAgICAgIGlmIChlcnJvcnMubGVuZ3RoID09IDApIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9KSwgdGFrZSgxKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldEVsZW1lbnRFcnJvcihlbGVtZW50OiBFbGVtZW50LCBhY3Rpb246IFZhbGlkYXRpb25SdWxlLCBvcHRpb246IFZhbGlkYXRpb25PcHRpb24pOiBzdHJpbmcge1xyXG4gICAgICAgIGlmICghZWxlbWVudCkgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3MoZWxlbWVudCwgVmFsaWRhdGlvbkNvbnN0YW50LlN1Y2Nlc3NFbGVtZW50Q2xhc3MpO1xyXG4gICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoZWxlbWVudCwgb3B0aW9uLmVycm9yRWxlbWVudENsYXNzKTtcclxuICAgICAgICBsZXQgZXJyb3JFbGVtZW50ID0gdGhpcy5maW5kRXJyb3JFbGVtZW50KGVsZW1lbnQpO1xyXG4gICAgICAgIGlmICghZXJyb3JFbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGVycm9yRWxlbWVudCA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudCgndWwnKTtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUoZXJyb3JFbGVtZW50LCBWYWxpZGF0aW9uQ29uc3RhbnQuRVJST1JfRUxFTUVOVF9JRCwgYCR7dGhpcy5fZGF0YVNlcnZpY2UubmV3R3VpZCgpfWApO1xyXG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZShlcnJvckVsZW1lbnQsICdzdHlsZScsIHRoaXMuc3R5bGVzKTtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhlcnJvckVsZW1lbnQsIHRoaXMuZXJyQ2xhc3MpO1xyXG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGVycm9yRWxlbWVudCwgb3B0aW9uLmVycm9yTWVzc2FnZUNsYXNzKTtcclxuICAgICAgICAgICAgY29uc3QgcGFyZW50RWxlbWVudCA9IHRoaXMucmVuZGVyZXIucGFyZW50Tm9kZShlbGVtZW50KTtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChwYXJlbnRFbGVtZW50LCBlcnJvckVsZW1lbnQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgZXJyb3JJdGVtRWxlbWVudEtleTogc3RyaW5nID0gYCR7YWN0aW9uLmlkfWA7XHJcbiAgICAgICAgbGV0IGVycm9ySXRlbUVsZW1lbnQgPSB0aGlzLmZpbmRFcnJvckl0ZW1FbGVtZW50KGVycm9yRWxlbWVudCwgZXJyb3JJdGVtRWxlbWVudEtleSk7XHJcbiAgICAgICAgY29uc3QgZHluYW1pY1NlcXVlbmNlSWQgPSB0aGlzLmZpbmREeW5hbWljU2VxdWVuY2VJZChlbGVtZW50KTtcclxuICAgICAgICBjb25zdCBlcnJvck1lc3NhZ2UgPSBhY3Rpb24uZXJyb3JNZXNzYWdlKGVsZW1lbnQsIGR5bmFtaWNTZXF1ZW5jZUlkKTtcclxuXHJcbiAgICAgICAgaWYgKCFlcnJvckl0ZW1FbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGVycm9ySXRlbUVsZW1lbnQgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKGVycm9ySXRlbUVsZW1lbnQsIFZhbGlkYXRpb25Db25zdGFudC5FUlJPUl9JVEVNX0VMRU1FTlRfSUQsIGVycm9ySXRlbUVsZW1lbnRLZXkpO1xyXG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKGVycm9ySXRlbUVsZW1lbnQsIHRoaXMucmVuZGVyZXIuY3JlYXRlVGV4dChlcnJvck1lc3NhZ2UpKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQoZXJyb3JFbGVtZW50LCBlcnJvckl0ZW1FbGVtZW50KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGVycm9yTWVzc2FnZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xlYXJFcnJvckl0ZW1FbGVtZW50KGVsZW1lbnQ6IGFueSwgYWN0aW9uOiBWYWxpZGF0aW9uUnVsZSkge1xyXG4gICAgICAgIGxldCBlcnJvckVsZW1lbnQgPSB0aGlzLmZpbmRFcnJvckVsZW1lbnQoZWxlbWVudCk7XHJcbiAgICAgICAgaWYgKCFlcnJvckVsZW1lbnQpIHJldHVybjtcclxuXHJcbiAgICAgICAgY29uc3QgZXJyb3JJdGVtRWxlbWVudEtleTogc3RyaW5nID0gYCR7YWN0aW9uLmlkfWA7XHJcbiAgICAgICAgbGV0IGVycm9ySXRlbUVsZW1lbnQgPSB0aGlzLmZpbmRFcnJvckl0ZW1FbGVtZW50KGVycm9yRWxlbWVudCwgZXJyb3JJdGVtRWxlbWVudEtleSk7XHJcbiAgICAgICAgaWYgKCFlcnJvckl0ZW1FbGVtZW50KSByZXR1cm47XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDaGlsZChlcnJvckVsZW1lbnQsIGVycm9ySXRlbUVsZW1lbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpc0RpcnR5KGNhbGxiYWNrPzogKGl0ZW1zOiBDaGFuZ2VkSXRlbVtdKSA9PiB2b2lkKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmNoYW5nZWRJdGVtcyB8fCB0aGlzLmNoYW5nZWRJdGVtcy5sZW5ndGggPT0gMCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIHZhciByZXNwb25zZSA9IHRoaXMuY2hhbmdlZEl0ZW1zLmZpbHRlcihzID0+IHMuY2hhbmdlKTtcclxuICAgICAgICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrKHJlc3BvbnNlKTtcclxuICAgICAgICByZXR1cm4gcmVzcG9uc2UubGVuZ3RoID4gMDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3luY0Vycm9yTWVzc2FnZXMoZWxlbWVudDogYW55LCBvcHRpb246IFZhbGlkYXRpb25PcHRpb24pOiBTdW1tYXJ5RXJyb3IgfCBudWxsIHtcclxuICAgICAgICBsZXQgZXJyb3JNZXNzYWdlczogc3RyaW5nW10gPSBbXTtcclxuICAgICAgICBvcHRpb24ucnVsZXMuZm9yRWFjaChhY3Rpb24gPT4ge1xyXG4gICAgICAgICAgICBpZiAoYWN0aW9uLmlzVmFsaWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJFcnJvckl0ZW1FbGVtZW50KGVsZW1lbnQsIGFjdGlvbik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBlcnJvck1lc3NhZ2UgPSB0aGlzLnNldEVsZW1lbnRFcnJvcihlbGVtZW50LCBhY3Rpb24sIG9wdGlvbik7XHJcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2VzLnB1c2goZXJyb3JNZXNzYWdlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zdCBpbnZhbGlkQWN0aW9ucyA9IG9wdGlvbi5ydWxlcy5maWx0ZXIoeCA9PiAheC5pc1ZhbGlkKTtcclxuICAgICAgICBpZiAoaW52YWxpZEFjdGlvbnMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3MoZWxlbWVudCwgb3B0aW9uLmVycm9yRWxlbWVudENsYXNzKTtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyhlbGVtZW50LCBvcHRpb24uc3VjY2Vzc0VsZW1lbnRDbGFzcyk7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZWxlbWVudDogZWxlbWVudCxcclxuICAgICAgICAgICAgbWVzc2FnZXM6IGVycm9yTWVzc2FnZXNcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHZhbGlkYXRlRWxlbWVudEFzeW5jKGVsZW1lbnQ6IGFueSwgb3B0aW9uOiBWYWxpZGF0aW9uT3B0aW9uKTogT2JzZXJ2YWJsZTxTdW1tYXJ5RXJyb3JbXT4ge1xyXG4gICAgICAgIGNvbnN0IGVycm9ycyQgPSBbdGhpcy52YWxpZGF0ZUVsZW1lbnQoZWxlbWVudCwgb3B0aW9uKS5waXBlKFxyXG4gICAgICAgICAgICBtYXAobmV3T3B0aW9uID0+IG9wdGlvbiA9IG5ld09wdGlvbiksXHJcbiAgICAgICAgICAgIG1hcChvcHRpb24gPT4gdGhpcy5zeW5jRXJyb3JNZXNzYWdlcyhlbGVtZW50LCBvcHRpb24pKSxcclxuICAgICAgICApXTtcclxuXHJcbiAgICAgICAgY29uc3QgZXJyb3JCYXRjaCA9IGZvcmtKb2luKGVycm9ycyQpO1xyXG4gICAgICAgIGNvbnN0IHJlbGF0ZWRFcnJvcnMgPSA8T2JzZXJ2YWJsZTxTdW1tYXJ5RXJyb3JbXT4+dGhpcy5yZWxhdGVkUHJvdmlkZXJzLnJlZHVjZSgocHJldmlvdXM6IE9ic2VydmFibGU8U3VtbWFyeUVycm9yW10+LCBwcm92aWRlcjogVmFsaWRhdGlvblNlcnZpY2UpID0+IHtcclxuICAgICAgICAgICAgY29uc3Qgc3ViRXJyb3JzJCA9IHByb3ZpZGVyLnJldHJpZXZlU3VtbWFyeUVycm9ycygpO1xyXG4gICAgICAgICAgICByZXR1cm4gbWVyZ2UocHJldmlvdXMsIHN1YkVycm9ycyQpO1xyXG4gICAgICAgIH0sIG9mKFtdKSk7XHJcblxyXG4gICAgICAgIHJldHVybiBmb3JrSm9pbihlcnJvckJhdGNoLCByZWxhdGVkRXJyb3JzKS5waXBlKFxyXG4gICAgICAgICAgICBkZWZhdWx0SWZFbXB0eShbW10sIFtdXSksXHJcbiAgICAgICAgICAgIG1hcCh2YWx1ZSA9PiBbLi4udmFsdWVbMF0sIC4uLnZhbHVlWzFdXSksXHJcbiAgICAgICAgICAgIG1hcChyZXN1bHQgPT4gW10uY29uY2F0KHJlc3VsdC5maWx0ZXIoZXJyb3IgPT4gZXJyb3IpKSksXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdmFsaWRhdGVFbGVtZW50KGVsZW1lbnQ6IGFueSwgb3B0aW9uOiBWYWxpZGF0aW9uT3B0aW9uLCBhbGw6IGJvb2xlYW4gPSBmYWxzZSk6IE9ic2VydmFibGU8VmFsaWRhdGlvbk9wdGlvbj4ge1xyXG4gICAgICAgIGNvbnN0IHBheWxvYWQgPSB0aGlzLnZhbGlkYXRvci5wYXlsb2FkUmVmKCk7XHJcbiAgICAgICAgY29uc3QgZmllbGRWYWx1ZSA9IG9wdGlvbi52YWx1ZVJlc29sdmVyID8gb3B0aW9uLnZhbHVlUmVzb2x2ZXIob3B0aW9uLml0ZW1SZWYsIHBheWxvYWQpIDogbnVsbDtcclxuICAgICAgICBjb25zdCB2YWxpZGF0ZWRBY3Rpb25zJCA9IG9wdGlvbi5ydWxlcy5tYXAoYWN0aW9uID0+IHtcclxuICAgICAgICAgICAgc3dpdGNoIChhY3Rpb24ua2V5KSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFZhbGlkYXRpb25Db25zdGFudC5SZXF1aXJlZDoge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRpb25Qcm92aWRlci5yZXF1aXJlZChmaWVsZFZhbHVlKS5waXBlKG1hcChpc1ZhbGlkID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uLmlzVmFsaWQgPSBpc1ZhbGlkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWN0aW9uO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNhc2UgVmFsaWRhdGlvbkNvbnN0YW50LkVtYWlsOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudmFsaWRhdGlvblByb3ZpZGVyLmVtYWlsKGZpZWxkVmFsdWUpLnBpcGUobWFwKGlzVmFsaWQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb24uaXNWYWxpZCA9IGlzVmFsaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhY3Rpb247XHJcbiAgICAgICAgICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2FzZSBWYWxpZGF0aW9uQ29uc3RhbnQuUGhvbmU6IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy52YWxpZGF0aW9uUHJvdmlkZXIucGhvbmUoZmllbGRWYWx1ZSkucGlwZShtYXAoaXNWYWxpZCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbi5pc1ZhbGlkID0gaXNWYWxpZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFjdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjYXNlIFZhbGlkYXRpb25Db25zdGFudC5DdXN0b206IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWFjdGlvbi5leGVjdXRlKSB0aHJvdyBuZXcgRXJyb3IoJyFhY3Rpb24uZXhlY3V0ZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghYWxsICYmICFhY3Rpb24ucmVxdWlyZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFmaWVsZFZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb24uaXNWYWxpZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2YoYWN0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXF1aXJlZFJ1bGUgPSBvcHRpb24ucnVsZXMuZmluZChzID0+IHMua2V5ID09IFZhbGlkYXRpb25Db25zdGFudC5SZXF1aXJlZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVxdWlyZWRSdWxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWRSdWxlLmlzVmFsaWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNlcXVlbmNlSWQgPSB0aGlzLmZpbmREeW5hbWljU2VxdWVuY2VJZChlbGVtZW50KTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWN0aW9uLmV4ZWN1dGUoZmllbGRWYWx1ZSwgcGF5bG9hZCwgK3NlcXVlbmNlSWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5waXBlKG1hcChyZXNwb25zZSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb24uaXNWYWxpZCA9IHJlc3BvbnNlLnN0YXR1cztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UubWVzc2FnZSkgYWN0aW9uLmVycm9yTWVzc2FnZSA9ICgpID0+IHsgcmV0dXJuIHJlc3BvbnNlLm1lc3NhZ2U7IH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWN0aW9uO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OiB0aHJvdyBuZXcgRXJyb3IoYFVuaGFuZGxlZCBhY3Rpb246ICR7YWN0aW9uLmtleX1gKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gZm9ya0pvaW4odmFsaWRhdGVkQWN0aW9ucyQpLnBpcGUoXHJcbiAgICAgICAgICAgIHRha2UoMSksXHJcbiAgICAgICAgICAgIG1hcCh2YWxpZGF0ZWRBY3Rpb25zID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChvcHRpb24ucmVsZXZhbnRGaWVsZHMpIHRoaXMudmFsaWRhdGVSZWxldmFudEZpZWxkcyhvcHRpb24ucmVsZXZhbnRGaWVsZHMocGF5bG9hZCkpO1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uLnJ1bGVzID0gdmFsaWRhdGVkQWN0aW9ucztcclxuICAgICAgICAgICAgICAgIHJldHVybiBvcHRpb247XHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB2YWxpZGF0ZVJlbGV2YW50RmllbGRzKHJlbGV2YW50RmllbGRzPzogc3RyaW5nW10pOiB2b2lkIHtcclxuICAgICAgICBpZiAoIXJlbGV2YW50RmllbGRzIHx8IHJlbGV2YW50RmllbGRzLmxlbmd0aCA9PSAwKSByZXR1cm47XHJcbiAgICAgICAgaWYgKHJlbGV2YW50RmllbGRzICYmIHJlbGV2YW50RmllbGRzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgcmVsZXZhbnRGaWVsZHMuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5lbGVtZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBhdHRyaWJ1dGVzID0gdGhpcy5lbGVtZW50c1tpXS5hdHRyaWJ1dGVzO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhdHRyaWJ1dGVzICYmIGF0dHJpYnV0ZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYXR0cmlidXRlc1t0aGlzLmF0dHJpYnV0ZU5hbWVdLnZhbHVlID09IGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvcHRpb24gPSB0aGlzLmZpbmRFbGVtZW50T3B0aW9uKHRoaXMuZWxlbWVudHNbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudmFsaWRhdGVFbGVtZW50KHRoaXMuZWxlbWVudHNbaV0sIG9wdGlvbiwgdHJ1ZSkucGlwZShcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFwKG5ld09wdGlvbiA9PiBvcHRpb24gPSBuZXdPcHRpb24pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXAob3B0aW9uID0+IHRoaXMuc3luY0Vycm9yTWVzc2FnZXModGhpcy5lbGVtZW50c1tpXSwgb3B0aW9uKSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKS5zdWJzY3JpYmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZXRyaWV2ZVN1bW1hcnlFcnJvcnMoKTogT2JzZXJ2YWJsZTxTdW1tYXJ5RXJyb3JbXT4ge1xyXG4gICAgICAgIGNvbnN0IGVycm9ycyQgPSB0aGlzLmVsZW1lbnRzLm1hcChlbGVtZW50ID0+IHtcclxuICAgICAgICAgICAgbGV0IHZhbGlkYXRpb25PcHRpb24gPSB0aGlzLmZpbmRFbGVtZW50T3B0aW9uKGVsZW1lbnQpO1xyXG4gICAgICAgICAgICBpZiAoIXZhbGlkYXRpb25PcHRpb24pIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRlRWxlbWVudChlbGVtZW50LCB2YWxpZGF0aW9uT3B0aW9uKS5waXBlKFxyXG4gICAgICAgICAgICAgICAgbWFwKG5ld09wdGlvbiA9PiB2YWxpZGF0aW9uT3B0aW9uID0gbmV3T3B0aW9uKSxcclxuICAgICAgICAgICAgICAgIG1hcChvcHRpb24gPT4gdGhpcy5zeW5jRXJyb3JNZXNzYWdlcyhlbGVtZW50LCBvcHRpb24pKSxcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29uc3QgZXJyb3JCYXRjaCA9IGZvcmtKb2luKGVycm9ycyQpO1xyXG4gICAgICAgIGNvbnN0IHJlbGF0ZWRFcnJvcnMgPSA8T2JzZXJ2YWJsZTxTdW1tYXJ5RXJyb3JbXT4+dGhpcy5yZWxhdGVkUHJvdmlkZXJzLnJlZHVjZSgocHJldmlvdXM6IE9ic2VydmFibGU8U3VtbWFyeUVycm9yW10+LCBwcm92aWRlcjogVmFsaWRhdGlvblNlcnZpY2UpID0+IHtcclxuICAgICAgICAgICAgY29uc3Qgc3ViRXJyb3JzJCA9IHByb3ZpZGVyLnJldHJpZXZlU3VtbWFyeUVycm9ycygpO1xyXG4gICAgICAgICAgICByZXR1cm4gbWVyZ2UocHJldmlvdXMsIHN1YkVycm9ycyQpO1xyXG4gICAgICAgIH0sIG9mKFtdKSk7XHJcblxyXG4gICAgICAgIHJldHVybiBmb3JrSm9pbihlcnJvckJhdGNoLCByZWxhdGVkRXJyb3JzKS5waXBlKFxyXG4gICAgICAgICAgICBkZWZhdWx0SWZFbXB0eShbW10sIFtdXSksXHJcbiAgICAgICAgICAgIG1hcCh2YWx1ZSA9PiBbLi4udmFsdWVbMF0sIC4uLnZhbHVlWzFdXSksXHJcbiAgICAgICAgICAgIG1hcChyZXN1bHQgPT4gW10uY29uY2F0KHJlc3VsdC5maWx0ZXIoZXJyb3IgPT4gZXJyb3IpKSksXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGZpbmRFbGVtZW50T3B0aW9uKGVsZW1lbnQ6IEVsZW1lbnQpOiBWYWxpZGF0aW9uT3B0aW9uIHwgbnVsbCB7XHJcbiAgICAgICAgY29uc3QgdmFsaWRhdGlvbklkQXR0cmlidXRlID0gZWxlbWVudC5hdHRyaWJ1dGVzW1ZhbGlkYXRpb25Db25zdGFudC5WQUxJREFUSU9OX0lEXTtcclxuICAgICAgICBpZiAoIXZhbGlkYXRpb25JZEF0dHJpYnV0ZSkgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgICAgIGNvbnN0IHZhbGlkYXRpb25JZCA9IHZhbGlkYXRpb25JZEF0dHJpYnV0ZS52YWx1ZTtcclxuICAgICAgICBpZiAoIXZhbGlkYXRpb25JZCkgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsaWRhdG9yLm9wdGlvbnMuZmluZChvcHRpb24gPT4gb3B0aW9uLnZhbGlkYXRpb25JZCA9PT0gdmFsaWRhdGlvbklkKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGZpbmRFcnJvckl0ZW1FbGVtZW50KGVycm9yRWxlbWVudDogYW55LCBrZXk6IHN0cmluZyk6IGFueSB8IG51bGwge1xyXG4gICAgICAgIGNvbnN0IGNoaWxkcmVuID0gPEVsZW1lbnRbXT5BcnJheS5mcm9tKGVycm9yRWxlbWVudC5jaGlsZHJlbik7XHJcbiAgICAgICAgcmV0dXJuIGNoaWxkcmVuXHJcbiAgICAgICAgICAgIC5maWx0ZXIoeCA9PiB4LmF0dHJpYnV0ZXNbVmFsaWRhdGlvbkNvbnN0YW50LkVSUk9SX0lURU1fRUxFTUVOVF9JRF0pXHJcbiAgICAgICAgICAgIC5maW5kKHggPT4geC5hdHRyaWJ1dGVzW1ZhbGlkYXRpb25Db25zdGFudC5FUlJPUl9JVEVNX0VMRU1FTlRfSURdLnZhbHVlID09PSBrZXkpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZmluZER5bmFtaWNTZXF1ZW5jZUlkKGVsZW1lbnQ6IEVsZW1lbnQpOiBzdHJpbmcgfCBudWxsIHtcclxuICAgICAgICBjb25zdCBzZXF1ZW5jZUlkQXR0cmlidXRlID0gZWxlbWVudC5hdHRyaWJ1dGVzW1ZhbGlkYXRpb25Db25zdGFudC5BUlJBWV9TRVFVRU5DRV9JRF07XHJcbiAgICAgICAgaWYgKCFzZXF1ZW5jZUlkQXR0cmlidXRlKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgICAgICAgY29uc3Qgc2VxdWVuY2VJZCA9IHNlcXVlbmNlSWRBdHRyaWJ1dGUudmFsdWU7XHJcbiAgICAgICAgaWYgKCFzZXF1ZW5jZUlkKSByZXR1cm4gbnVsbDtcclxuICAgICAgICByZXR1cm4gc2VxdWVuY2VJZDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGZpbmRFcnJvckVsZW1lbnQoZWxlbWVudDogRWxlbWVudCk6IEVsZW1lbnQge1xyXG4gICAgICAgIGlmIChlbGVtZW50LnBhcmVudEVsZW1lbnQgJiYgZWxlbWVudC5wYXJlbnRFbGVtZW50LmNoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNsaWJpbmdzID0gPEVsZW1lbnRbXT5BcnJheS5mcm9tKGVsZW1lbnQucGFyZW50RWxlbWVudC5jaGlsZHJlbik7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSBzbGliaW5ncy5maWx0ZXIoeCA9PiB4LmF0dHJpYnV0ZXMpLmZpbmQoeCA9PiB4LmF0dHJpYnV0ZXNbVmFsaWRhdGlvbkNvbnN0YW50LkVSUk9SX0VMRU1FTlRfSURdKTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZWdpc3RlckVsZW1lbnRzKGl0ZW0/OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBub25EeW5hbWljT3B0aW9ucyA9IHRoaXMudmFsaWRhdG9yLm9wdGlvbnMuZmlsdGVyKHggPT4gIXguZHluYW1pYyk7XHJcbiAgICAgICAgY29uc3Qgbm9uRHluYW1pY0VsZW1lbnRzID0gbm9uRHluYW1pY09wdGlvbnMucmVkdWNlKChwcmV2aW91czogRWxlbWVudFtdLCBjdXJyZW50OiBWYWxpZGF0aW9uT3B0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBxdWVyeSA9IGAqWyR7dGhpcy5hdHRyaWJ1dGVOYW1lfT1cIiR7Y3VycmVudC52YWxpZGF0aW9uTmFtZX1cIl1gO1xyXG4gICAgICAgICAgICBpZiAodGhpcy52YWxpZGF0b3Iuc2NvcGUpIHtcclxuICAgICAgICAgICAgICAgIHF1ZXJ5ICs9IGBbc2NvcGU9XCIke3RoaXMudmFsaWRhdG9yLnNjb3BlfVwiXWA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3QgZWxlbWVudHMgPSA8RWxlbWVudFtdPkFycmF5LmZyb20odGhpcy52YWxpZGF0b3IuZm9ybVJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwocXVlcnkpKTtcclxuICAgICAgICAgICAgZWxlbWVudHMuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHZhbGlkYXRpb25JZCA9IHRoaXMuX2RhdGFTZXJ2aWNlLm5ld0d1aWQoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKGVsZW1lbnQsIFZhbGlkYXRpb25Db25zdGFudC5WQUxJREFUSU9OX0lELCB2YWxpZGF0aW9uSWQpO1xyXG4gICAgICAgICAgICAgICAgY3VycmVudC52YWxpZGF0aW9uSWQgPSB2YWxpZGF0aW9uSWQ7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gcHJldmlvdXMuY29uY2F0KGVsZW1lbnRzKTtcclxuICAgICAgICB9LCBbXSk7XHJcblxyXG4gICAgICAgIGxldCBnZW5lcmF0ZWREeW5hbWljT3B0aW9ucyA9IFtdO1xyXG4gICAgICAgIGxldCBkeW5hbWljRWxlbWVudHMgPSBbXTtcclxuICAgICAgICB0aGlzLnZhbGlkYXRvci5vcHRpb25zID0gdGhpcy52YWxpZGF0b3Iub3B0aW9ucy5maWx0ZXIoeCA9PiAheC5keW5hbWljKTtcclxuICAgICAgICB0aGlzLnZpcnR1YWxWYWxpZGF0aW9uT3B0aW9ucy5mb3JFYWNoKChjdXJyZW50OiBWYWxpZGF0aW9uT3B0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBxdWVyeSA9IGAqWyR7dGhpcy5hdHRyaWJ1dGVOYW1lfT1cIiR7Y3VycmVudC52YWxpZGF0aW9uTmFtZX1cIl1gO1xyXG4gICAgICAgICAgICBpZiAodGhpcy52YWxpZGF0b3Iuc2NvcGUpIHtcclxuICAgICAgICAgICAgICAgIHF1ZXJ5ICs9IGBbc2NvcGU9XCIke3RoaXMudmFsaWRhdG9yLnNjb3BlfVwiXWA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3QgZWxlbWVudHMgPSBBcnJheS5mcm9tKHRoaXMudmFsaWRhdG9yLmZvcm1SZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKHF1ZXJ5KSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGNsb25lZE9wdGlvbnMgPSBlbGVtZW50cy5tYXAoKGVsZW1lbnQsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB2YWxpZGF0aW9uSWQgPSB0aGlzLl9kYXRhU2VydmljZS5uZXdHdWlkKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZShlbGVtZW50LCBWYWxpZGF0aW9uQ29uc3RhbnQuVkFMSURBVElPTl9JRCwgdmFsaWRhdGlvbklkKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKGVsZW1lbnQsIFZhbGlkYXRpb25Db25zdGFudC5BUlJBWV9TRVFVRU5DRV9JRCwgaW5kZXgudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC4uLmN1cnJlbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvbklkOiB2YWxpZGF0aW9uSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbVJlZjogaXRlbSxcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZVJlc29sdmVyOiBjdXJyZW50LnZhbHVlUmVzb2x2ZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgPyAocGF5bG9hZDogYW55KSA9PiBjdXJyZW50LnZhbHVlUmVzb2x2ZXIoaXRlbSwgcGF5bG9hZCwgaW5kZXgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDogKCkgPT4geyByZXR1cm4gKDxhbnk+ZWxlbWVudCkudmFsdWU7IH1cclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBkeW5hbWljRWxlbWVudHMucHVzaCguLi5lbGVtZW50cyk7XHJcbiAgICAgICAgICAgIGdlbmVyYXRlZER5bmFtaWNPcHRpb25zLnB1c2goLi4uY2xvbmVkT3B0aW9ucyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMudmFsaWRhdG9yLm9wdGlvbnMgPSBub25EeW5hbWljT3B0aW9ucy5jb25jYXQoZ2VuZXJhdGVkRHluYW1pY09wdGlvbnMpO1xyXG4gICAgICAgIHRoaXMuZWxlbWVudHMgPSBub25EeW5hbWljRWxlbWVudHMuY29uY2F0KGR5bmFtaWNFbGVtZW50cyk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmVsZW1lbnRzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlZEl0ZW1zID0gW107XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudHMuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcGF5bG9hZCA9IHRoaXMudmFsaWRhdG9yLnBheWxvYWRSZWYoKTtcclxuICAgICAgICAgICAgICAgIGxldCBlbGVtZW50T3B0aW9uID0gdGhpcy5maW5kRWxlbWVudE9wdGlvbihlbGVtZW50KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlZEl0ZW1zLnB1c2gobmV3IENoYW5nZWRJdGVtKHtcclxuICAgICAgICAgICAgICAgICAgICBpZDogZWxlbWVudE9wdGlvbi52YWxpZGF0aW9uSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGQ6IGVsZW1lbnRPcHRpb24udmFsaWRhdGlvbk5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgb2xkVmFsdWU6IGVsZW1lbnRPcHRpb24udmFsdWVSZXNvbHZlciA/IGVsZW1lbnRPcHRpb24udmFsdWVSZXNvbHZlcihudWxsLCBwYXlsb2FkKSA6IG51bGxcclxuICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVnaXN0ZXJFdmVudHMoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50cy5maWx0ZXIoZWxlbWVudCA9PiBlbGVtZW50LmF0dHJpYnV0ZXNbdGhpcy5hdHRyaWJ1dGVOYW1lXSkuZm9yRWFjaCgoZWxlbWVudDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghZWxlbWVudC5mb2N1c291dExpc3RlbmVyKSB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LmZvY3Vzb3V0TGlzdGVuZXIgPSB0aGlzLnJlbmRlcmVyLmxpc3RlbihlbGVtZW50LCAnZm9jdXNvdXQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVCbHVyRXZlbnQoZWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQuZm9jdXNvdXRMaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKGVsZW1lbnQsICdjaGFuZ2UnLCAoJGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGF5bG9hZCA9IHRoaXMudmFsaWRhdG9yLnBheWxvYWRSZWYoKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZWxlbWVudE9wdGlvbiA9IHRoaXMuZmluZEVsZW1lbnRPcHRpb24oZWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gZWxlbWVudE9wdGlvbi52YWx1ZVJlc29sdmVyID8gZWxlbWVudE9wdGlvbi52YWx1ZVJlc29sdmVyKG51bGwsIHBheWxvYWQpIDogbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZWxlbWVudE9wdGlvbiAmJiBlbGVtZW50T3B0aW9uLmRpcnR5Q2hlY2spIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGN1cnJlbnRJdGVtID0gdGhpcy5jaGFuZ2VkSXRlbXMuZmluZChzID0+IHMuaWQgPT0gZWxlbWVudE9wdGlvbi52YWxpZGF0aW9uSWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWN1cnJlbnRJdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZWRJdGVtcy5wdXNoKG5ldyBDaGFuZ2VkSXRlbSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IGVsZW1lbnRPcHRpb24udmFsaWRhdGlvbklkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkOiBlbGVtZW50T3B0aW9uLnZhbGlkYXRpb25OYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB2YWx1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRJdGVtLnZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudEl0ZW0ub2xkVmFsdWUgPT0gdW5kZWZpbmVkIHx8IGN1cnJlbnRJdGVtLm9sZFZhbHVlID09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlID09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PSAnJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50SXRlbS5jaGFuZ2UgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50SXRlbS5jaGFuZ2UgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlID09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PSAnJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50SXRlbS5jaGFuZ2UgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50SXRlbS5vbGRWYWx1ZS50b1N0cmluZygpICE9IGN1cnJlbnRJdGVtLnZhbHVlLnRvU3RyaW5nKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRJdGVtLmNoYW5nZSA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudEl0ZW0uY2hhbmdlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVsZW1lbnRPcHRpb24gJiYgZWxlbWVudE9wdGlvbi5ydWxlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50T3B0aW9uLnJ1bGVzLmZvckVhY2goKHJ1bGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJ1bGUuaXNWYWxpZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaGFuZGxlQmx1ckV2ZW50KGVsZW1lbnQ6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIGxldCBlbGVtZW50T3B0aW9uID0gdGhpcy5maW5kRWxlbWVudE9wdGlvbihlbGVtZW50KTtcclxuICAgICAgICBpZiAoIWVsZW1lbnRPcHRpb24pIHRocm93IG5ldyBFcnJvcignIWVsZW1lbnRPcHRpb24nKTtcclxuXHJcbiAgICAgICAgdGhpcy52YWxpZGF0ZUVsZW1lbnQoZWxlbWVudCwgZWxlbWVudE9wdGlvbikucGlwZSh0YWtlKDEpKS5zdWJzY3JpYmUobmV3T3B0aW9uID0+IHtcclxuICAgICAgICAgICAgZWxlbWVudE9wdGlvbiA9IG5ld09wdGlvbjtcclxuICAgICAgICAgICAgdGhpcy5zeW5jRXJyb3JNZXNzYWdlcyhlbGVtZW50LCBlbGVtZW50T3B0aW9uKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFkZFJlbGF0ZWRQcm92aWRlcnMocHJvdmlkZXJzOiBWYWxpZGF0aW9uU2VydmljZVtdKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IG5ld1Byb3ZpZGVycyA9IHByb3ZpZGVycy5maWx0ZXIoeCA9PiB0aGlzLnJlbGF0ZWRQcm92aWRlcnMuaW5kZXhPZih4KSA8IDApO1xyXG4gICAgICAgIG5ld1Byb3ZpZGVycy5mb3JFYWNoKHByb3ZpZGVyID0+XHJcbiAgICAgICAgICAgIHByb3ZpZGVyLm9uRGVzdHJveS5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZWxhdGVkUHJvdmlkZXJzID0gdGhpcy5yZWxhdGVkUHJvdmlkZXJzLmZpbHRlcigoKSA9PiB0aGlzLnJlbGF0ZWRQcm92aWRlcnMuaW5kZXhPZihwcm92aWRlcikgPCAwKTtcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgIHRoaXMucmVsYXRlZFByb3ZpZGVycy5wdXNoKC4uLm5ld1Byb3ZpZGVycyk7XHJcbiAgICB9XHJcbn0iXX0=