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
     * @return {?}
     */
    updateAsync(relatedProvidersToRegister) {
        this._actionService.executeAsync((/**
         * @return {?}
         */
        () => {
            if (relatedProvidersToRegister && relatedProvidersToRegister.length) {
                this.addRelatedProviders(relatedProvidersToRegister);
            }
            this.registerElements();
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
                const fieldValue = option.valueResolver ? option.valueResolver(payload) : null;
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
     * @param {?=} all
     * @return {?}
     */
    validateElement(element, option, all = false) {
        /** @type {?} */
        const payload = this.validator.payloadRef();
        /** @type {?} */
        const fieldValue = option.valueResolver ? option.valueResolver(payload) : null;
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
     * @return {?}
     */
    registerElements() {
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
                return Object.assign({}, current, { validationId: validationId, valueResolver: current.valueResolver
                        ? (/**
                         * @param {?} payload
                         * @return {?}
                         */
                        (payload) => current.valueResolver(payload, index))
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
                    oldValue: elementOption.valueResolver ? elementOption.valueResolver(payload) : null
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
                    var value = elementOption.valueResolver ? elementOption.valueResolver(payload) : null;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWZ3NGMvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9zaGFyZWQvdmFsaWRhdGlvbi92YWxpZGF0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBYSxVQUFVLEVBQUUsZ0JBQWdCLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RixPQUFPLEVBQXFDLGtCQUFrQixFQUFnQyxXQUFXLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN0SSxPQUFPLEVBQUUsWUFBWSxFQUFjLFFBQVEsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxHQUFHLEVBQUUsY0FBYyxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzNELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7Ozs7OztBQUduRSxNQUFNLE9BQU8saUJBQWlCOzs7Ozs7OztJQWMxQixZQUNjLGVBQWlDLEVBQ2pDLGtCQUFzQyxFQUN4QyxZQUF5QixFQUN6QixjQUE2QixFQUM3QixrQkFBcUM7UUFKbkMsb0JBQWUsR0FBZixlQUFlLENBQWtCO1FBQ2pDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFDeEMsaUJBQVksR0FBWixZQUFZLENBQWE7UUFDekIsbUJBQWMsR0FBZCxjQUFjLENBQWU7UUFDN0IsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFtQjtRQWxCaEMsY0FBUyxHQUF1QixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzVE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Qy9ELDBDQUFpRTs7Ozs7SUFDakUscUNBQTRCOzs7OztJQUM1Qiw2Q0FBbUQ7Ozs7O0lBQ25ELDBDQUF5RDs7Ozs7SUFDekQscURBQTBEOzs7OztJQUMxRCx5Q0FBeUM7Ozs7O0lBQ3pDLGdDQUFvQjs7Ozs7SUFHaEIsNENBQTJDOzs7OztJQUMzQywrQ0FBZ0Q7Ozs7O0lBQ2hELHlDQUFpQzs7Ozs7SUFDakMsMkNBQXFDOzs7OztJQUNyQywrQ0FBNkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZW5kZXJlcjIsIEluamVjdGFibGUsIFJlbmRlcmVyRmFjdG9yeTIsIEV2ZW50RW1pdHRlciwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFZhbGlkYXRpb25PcHRpb24sIENsaWVudFZhbGlkYXRvciwgVmFsaWRhdGlvbkNvbnN0YW50LCBTdW1tYXJ5RXJyb3IsIFZhbGlkYXRpb25SdWxlLCBDaGFuZ2VkSXRlbSB9IGZyb20gJy4vdmFsaWRhdGlvbi5tb2RlbCc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgT2JzZXJ2YWJsZSwgZm9ya0pvaW4sIG1lcmdlLCBvZiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBtYXAsIGRlZmF1bHRJZkVtcHR5LCB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBEYXRhU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2RhdGEuc2VydmljZSc7XHJcbmltcG9ydCB7IFZhbGlkYXRpb25Qcm92aWRlciB9IGZyb20gJy4vdmFsaWRhdGlvbi5wcm92aWRlcic7XHJcbmltcG9ydCB7IEFjdGlvblNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9hY3Rpb24uc2VydmljZSc7XHJcbmltcG9ydCB7IEFnZ3JlZ2F0b3JTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvYWdncmVnYXRvci5zZXJ2aWNlJztcclxuXHJcbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXHJcbmV4cG9ydCBjbGFzcyBWYWxpZGF0aW9uU2VydmljZSB7XHJcbiAgICBAT3V0cHV0KCkgcHVibGljIG9uRGVzdHJveTogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgcHJpdmF0ZSBlbGVtZW50czogRWxlbWVudFtdID0gW107XHJcbiAgICBwcml2YXRlIHZhbGlkYXRvcjogQ2xpZW50VmFsaWRhdG9yO1xyXG4gICAgcHJpdmF0ZSBlcnJDbGFzczogc3RyaW5nID0gVmFsaWRhdGlvbkNvbnN0YW50LkRlZmF1bHRFcnJvckNsYXNzO1xyXG4gICAgcHJpdmF0ZSBzdHlsZXM6IHN0cmluZyA9IFZhbGlkYXRpb25Db25zdGFudC5EZWZhdWx0RXJyb3JTdHlsZXM7XHJcbiAgICBwcml2YXRlIGF0dHJpYnV0ZU5hbWU6IHN0cmluZyA9IFZhbGlkYXRpb25Db25zdGFudC5BdHRyaWJ1dGVOYW1lO1xyXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyO1xyXG4gICAgcHJpdmF0ZSByZWxhdGVkUHJvdmlkZXJzOiBWYWxpZGF0aW9uU2VydmljZVtdID0gW107XHJcbiAgICBwcml2YXRlIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcclxuICAgIHByaXZhdGUgdmlydHVhbFZhbGlkYXRpb25PcHRpb25zOiBWYWxpZGF0aW9uT3B0aW9uW10gPSBbXTtcclxuICAgIHByaXZhdGUgY2hhbmdlZEl0ZW1zOiBDaGFuZ2VkSXRlbVtdID0gW107XHJcbiAgICBwcml2YXRlIGtleTogc3RyaW5nO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByb3RlY3RlZCByZW5kZXJlckZhY3Rvcnk6IFJlbmRlcmVyRmFjdG9yeTIsXHJcbiAgICAgICAgcHJvdGVjdGVkIHZhbGlkYXRpb25Qcm92aWRlcjogVmFsaWRhdGlvblByb3ZpZGVyLFxyXG4gICAgICAgIHByaXZhdGUgX2RhdGFTZXJ2aWNlOiBEYXRhU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIF9hY3Rpb25TZXJ2aWNlOiBBY3Rpb25TZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgX2FnZ3JlZ2F0b3JTZXJ2aWNlOiBBZ2dyZWdhdG9yU2VydmljZVxyXG4gICAgKSB7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlciA9IHJlbmRlcmVyRmFjdG9yeS5jcmVhdGVSZW5kZXJlcihudWxsLCBudWxsKTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uRGVzdHJveSgpIHtcclxuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMudW5zdWJzY3JpYmUoKTtcclxuICAgICAgICB0aGlzLm9uRGVzdHJveS5lbWl0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGluaXQobW9kZWw6IHsgdmFsaWRhdG9yOiBDbGllbnRWYWxpZGF0b3IgfSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMudmFsaWRhdG9yID0gbW9kZWwudmFsaWRhdG9yO1xyXG4gICAgICAgIGlmICghdGhpcy52YWxpZGF0b3IucGF5bG9hZFJlZikgdGhpcy52YWxpZGF0b3IucGF5bG9hZFJlZiA9ICgpID0+IHsgcmV0dXJuIHt9IH07XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnZhbGlkYXRvci5yZWxhdGVkVmFsaWRhdGlvblByb3ZpZGVycykge1xyXG4gICAgICAgICAgICB0aGlzLmFkZFJlbGF0ZWRQcm92aWRlcnModGhpcy52YWxpZGF0b3IucmVsYXRlZFZhbGlkYXRpb25Qcm92aWRlcnMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy52YWxpZGF0b3Iub3B0aW9ucy5mb3JFYWNoKG9wdGlvbiA9PiB7XHJcbiAgICAgICAgICAgIGlmICghb3B0aW9uLmRpc3BsYXlUZXh0KSBvcHRpb24uZGlzcGxheVRleHQgPSBvcHRpb24udmFsaWRhdGlvbk5hbWU7XHJcbiAgICAgICAgICAgIGlmICghb3B0aW9uLnBheWxvYWRSZWYpIG9wdGlvbi5wYXlsb2FkUmVmID0gdGhpcy52YWxpZGF0b3IucGF5bG9hZFJlZjtcclxuICAgICAgICAgICAgb3B0aW9uLnJ1bGVzLmZvckVhY2goYWN0aW9uID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghYWN0aW9uLmlkKSBhY3Rpb24uaWQgPSB0aGlzLl9kYXRhU2VydmljZS5uZXdHdWlkKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWFjdGlvbi5lcnJvck1lc3NhZ2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGFjdGlvbi5rZXkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBWYWxpZGF0aW9uQ29uc3RhbnQuUmVxdWlyZWQ6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbi5lcnJvck1lc3NhZ2UgPSAoZWxlbWVudDogRWxlbWVudCwgcm93SW5kZXg6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRpc3BsYXlpbmdSb3dJbmRleCA9ICgrcm93SW5kZXggKyAxKS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBgJHtvcHRpb24uZGlzcGxheVRleHR9JHtvcHRpb24uZHluYW1pYyA/ICcgWycgKyBkaXNwbGF5aW5nUm93SW5kZXggKyAnXScgOiAnJ30gJHt0aGlzLnZhbGlkYXRvci5yZXF1aXJlZE1lc3NhZ2V9YDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb24uZXJyb3JNZXNzYWdlID0gKCkgPT4gYCR7b3B0aW9uLmRpc3BsYXlUZXh0fSAke3RoaXMudmFsaWRhdG9yLmludmFsaWRNZXNzYWdlfWA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy52aXJ0dWFsVmFsaWRhdGlvbk9wdGlvbnMgPSB0aGlzLnZhbGlkYXRvci5vcHRpb25zLmZpbHRlcih4ID0+IHguZHluYW1pYyk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVBc3luYygpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRLZXkoa2V5OiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIXRoaXMua2V5KSB0aGlzLmtleSA9IGtleTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlQXN5bmMocmVsYXRlZFByb3ZpZGVyc1RvUmVnaXN0ZXI/OiBWYWxpZGF0aW9uU2VydmljZVtdKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fYWN0aW9uU2VydmljZS5leGVjdXRlQXN5bmMoKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAocmVsYXRlZFByb3ZpZGVyc1RvUmVnaXN0ZXIgJiYgcmVsYXRlZFByb3ZpZGVyc1RvUmVnaXN0ZXIubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZFJlbGF0ZWRQcm92aWRlcnMocmVsYXRlZFByb3ZpZGVyc1RvUmVnaXN0ZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJFbGVtZW50cygpO1xyXG4gICAgICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnRzKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGV4ZWN1dGVBc3luYyh2YWxpZENhbGxiYWNrOiAoZXJyb3JzPzogU3VtbWFyeUVycm9yW10pID0+IGFueSwgaW52YWxpZENhbGxiYWNrPzogKGVycm9ycz86IFN1bW1hcnlFcnJvcltdKSA9PiBhbnkpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcclxuICAgICAgICB0aGlzLnJldHJpZXZlU3VtbWFyeUVycm9ycygpLnN1YnNjcmliZSgocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHZhbGlkQ2FsbGJhY2spIHZhbGlkQ2FsbGJhY2socmVzcG9uc2UpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG9mKHRydWUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKGludmFsaWRDYWxsYmFjaykgaW52YWxpZENhbGxiYWNrKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBvZih0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaXNWYWxpZChzaG93OiBib29sZWFuID0gdHJ1ZSwgZm9jdXM6IGJvb2xlYW4gPSB0cnVlKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKHNob3cpIHtcclxuICAgICAgICAgICAgdGhpcy5yZXRyaWV2ZVN1bW1hcnlFcnJvcnMoKS5zdWJzY3JpYmUoKGVycm9yczogU3VtbWFyeUVycm9yW10pID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2FnZ3JlZ2F0b3JTZXJ2aWNlLnB1Ymxpc2godGhpcy5rZXksIGVycm9ycyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZm9jdXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3JzICYmIGVycm9ycy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmb2N1c0VsZW1lbnQgPSBlcnJvcnNbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlbCA9IDxhbnk+Zm9jdXNFbGVtZW50LmVsZW1lbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fYWN0aW9uU2VydmljZS5leGVjdXRlQXN5bmMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsLmZvY3VzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgdmFsaWQgPSB0cnVlO1xyXG4gICAgICAgIGlmICh0aGlzLnZhbGlkYXRvci5vcHRpb25zKSB7XHJcbiAgICAgICAgICAgIHRoaXMudmFsaWRhdG9yLm9wdGlvbnMuZm9yRWFjaCgob3B0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwYXlsb2FkID0gdGhpcy52YWxpZGF0b3IucGF5bG9hZFJlZigpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZmllbGRWYWx1ZSA9IG9wdGlvbi52YWx1ZVJlc29sdmVyID8gb3B0aW9uLnZhbHVlUmVzb2x2ZXIocGF5bG9hZCkgOiBudWxsO1xyXG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbi5ydWxlcykge1xyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbi5ydWxlcy5mb3JFYWNoKChhY3Rpb24pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFjdGlvbi5pc1ZhbGlkICE9IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhY3Rpb24uaXNWYWxpZCA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmaWVsZFZhbHVlKSB2YWxpZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdmFsaWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGhhbmRsZUVycm9ycyhjYWxsYmFjaz86IChyZXNwb25zZTogU3VtbWFyeUVycm9yW10pID0+IHZvaWQpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnJldHJpZXZlU3VtbWFyeUVycm9ycygpLnN1YnNjcmliZSgocmVzKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2socmVzKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY29tbWl0KGNhbGxiYWNrPzogRnVuY3Rpb24pOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yZXRyaWV2ZVN1bW1hcnlFcnJvcnMoKS5waXBlKFxyXG4gICAgICAgICAgICBtYXAoZXJyb3JzID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2soZXJyb3JzKTtcclxuICAgICAgICAgICAgICAgIGlmIChlcnJvcnMubGVuZ3RoID09IDApIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9KSwgdGFrZSgxKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldEVsZW1lbnRFcnJvcihlbGVtZW50OiBFbGVtZW50LCBhY3Rpb246IFZhbGlkYXRpb25SdWxlLCBvcHRpb246IFZhbGlkYXRpb25PcHRpb24pOiBzdHJpbmcge1xyXG4gICAgICAgIGlmICghZWxlbWVudCkgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3MoZWxlbWVudCwgVmFsaWRhdGlvbkNvbnN0YW50LlN1Y2Nlc3NFbGVtZW50Q2xhc3MpO1xyXG4gICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoZWxlbWVudCwgb3B0aW9uLmVycm9yRWxlbWVudENsYXNzKTtcclxuICAgICAgICBsZXQgZXJyb3JFbGVtZW50ID0gdGhpcy5maW5kRXJyb3JFbGVtZW50KGVsZW1lbnQpO1xyXG4gICAgICAgIGlmICghZXJyb3JFbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGVycm9yRWxlbWVudCA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudCgndWwnKTtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUoZXJyb3JFbGVtZW50LCBWYWxpZGF0aW9uQ29uc3RhbnQuRVJST1JfRUxFTUVOVF9JRCwgYCR7dGhpcy5fZGF0YVNlcnZpY2UubmV3R3VpZCgpfWApO1xyXG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZShlcnJvckVsZW1lbnQsICdzdHlsZScsIHRoaXMuc3R5bGVzKTtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhlcnJvckVsZW1lbnQsIHRoaXMuZXJyQ2xhc3MpO1xyXG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGVycm9yRWxlbWVudCwgb3B0aW9uLmVycm9yTWVzc2FnZUNsYXNzKTtcclxuICAgICAgICAgICAgY29uc3QgcGFyZW50RWxlbWVudCA9IHRoaXMucmVuZGVyZXIucGFyZW50Tm9kZShlbGVtZW50KTtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChwYXJlbnRFbGVtZW50LCBlcnJvckVsZW1lbnQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgZXJyb3JJdGVtRWxlbWVudEtleTogc3RyaW5nID0gYCR7YWN0aW9uLmlkfWA7XHJcbiAgICAgICAgbGV0IGVycm9ySXRlbUVsZW1lbnQgPSB0aGlzLmZpbmRFcnJvckl0ZW1FbGVtZW50KGVycm9yRWxlbWVudCwgZXJyb3JJdGVtRWxlbWVudEtleSk7XHJcbiAgICAgICAgY29uc3QgZHluYW1pY1NlcXVlbmNlSWQgPSB0aGlzLmZpbmREeW5hbWljU2VxdWVuY2VJZChlbGVtZW50KTtcclxuICAgICAgICBjb25zdCBlcnJvck1lc3NhZ2UgPSBhY3Rpb24uZXJyb3JNZXNzYWdlKGVsZW1lbnQsIGR5bmFtaWNTZXF1ZW5jZUlkKTtcclxuXHJcbiAgICAgICAgaWYgKCFlcnJvckl0ZW1FbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGVycm9ySXRlbUVsZW1lbnQgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKGVycm9ySXRlbUVsZW1lbnQsIFZhbGlkYXRpb25Db25zdGFudC5FUlJPUl9JVEVNX0VMRU1FTlRfSUQsIGVycm9ySXRlbUVsZW1lbnRLZXkpO1xyXG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKGVycm9ySXRlbUVsZW1lbnQsIHRoaXMucmVuZGVyZXIuY3JlYXRlVGV4dChlcnJvck1lc3NhZ2UpKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQoZXJyb3JFbGVtZW50LCBlcnJvckl0ZW1FbGVtZW50KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGVycm9yTWVzc2FnZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xlYXJFcnJvckl0ZW1FbGVtZW50KGVsZW1lbnQ6IGFueSwgYWN0aW9uOiBWYWxpZGF0aW9uUnVsZSkge1xyXG4gICAgICAgIGxldCBlcnJvckVsZW1lbnQgPSB0aGlzLmZpbmRFcnJvckVsZW1lbnQoZWxlbWVudCk7XHJcbiAgICAgICAgaWYgKCFlcnJvckVsZW1lbnQpIHJldHVybjtcclxuXHJcbiAgICAgICAgY29uc3QgZXJyb3JJdGVtRWxlbWVudEtleTogc3RyaW5nID0gYCR7YWN0aW9uLmlkfWA7XHJcbiAgICAgICAgbGV0IGVycm9ySXRlbUVsZW1lbnQgPSB0aGlzLmZpbmRFcnJvckl0ZW1FbGVtZW50KGVycm9yRWxlbWVudCwgZXJyb3JJdGVtRWxlbWVudEtleSk7XHJcbiAgICAgICAgaWYgKCFlcnJvckl0ZW1FbGVtZW50KSByZXR1cm47XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDaGlsZChlcnJvckVsZW1lbnQsIGVycm9ySXRlbUVsZW1lbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpc0RpcnR5KGNhbGxiYWNrPzogKGl0ZW1zOiBDaGFuZ2VkSXRlbVtdKSA9PiB2b2lkKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmNoYW5nZWRJdGVtcyB8fCB0aGlzLmNoYW5nZWRJdGVtcy5sZW5ndGggPT0gMCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIHZhciByZXNwb25zZSA9IHRoaXMuY2hhbmdlZEl0ZW1zLmZpbHRlcihzID0+IHMuY2hhbmdlKTtcclxuICAgICAgICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrKHJlc3BvbnNlKTtcclxuICAgICAgICByZXR1cm4gcmVzcG9uc2UubGVuZ3RoID4gMDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdmFsaWRhdGVFbGVtZW50KGVsZW1lbnQ6IGFueSwgb3B0aW9uOiBWYWxpZGF0aW9uT3B0aW9uLCBhbGw6IGJvb2xlYW4gPSBmYWxzZSk6IE9ic2VydmFibGU8VmFsaWRhdGlvbk9wdGlvbj4ge1xyXG4gICAgICAgIGNvbnN0IHBheWxvYWQgPSB0aGlzLnZhbGlkYXRvci5wYXlsb2FkUmVmKCk7XHJcbiAgICAgICAgY29uc3QgZmllbGRWYWx1ZSA9IG9wdGlvbi52YWx1ZVJlc29sdmVyID8gb3B0aW9uLnZhbHVlUmVzb2x2ZXIocGF5bG9hZCkgOiBudWxsO1xyXG4gICAgICAgIGNvbnN0IHZhbGlkYXRlZEFjdGlvbnMkID0gb3B0aW9uLnJ1bGVzLm1hcChhY3Rpb24gPT4ge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKGFjdGlvbi5rZXkpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgVmFsaWRhdGlvbkNvbnN0YW50LlJlcXVpcmVkOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudmFsaWRhdGlvblByb3ZpZGVyLnJlcXVpcmVkKGZpZWxkVmFsdWUpLnBpcGUobWFwKGlzVmFsaWQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb24uaXNWYWxpZCA9IGlzVmFsaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhY3Rpb247XHJcbiAgICAgICAgICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2FzZSBWYWxpZGF0aW9uQ29uc3RhbnQuRW1haWw6IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy52YWxpZGF0aW9uUHJvdmlkZXIuZW1haWwoZmllbGRWYWx1ZSkucGlwZShtYXAoaXNWYWxpZCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbi5pc1ZhbGlkID0gaXNWYWxpZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFjdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjYXNlIFZhbGlkYXRpb25Db25zdGFudC5QaG9uZToge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRpb25Qcm92aWRlci5waG9uZShmaWVsZFZhbHVlKS5waXBlKG1hcChpc1ZhbGlkID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uLmlzVmFsaWQgPSBpc1ZhbGlkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWN0aW9uO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNhc2UgVmFsaWRhdGlvbkNvbnN0YW50LkN1c3RvbToge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghYWN0aW9uLmV4ZWN1dGUpIHRocm93IG5ldyBFcnJvcignIWFjdGlvbi5leGVjdXRlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFhbGwgJiYgIWFjdGlvbi5yZXF1aXJlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWZpZWxkVmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbi5pc1ZhbGlkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvZihhY3Rpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlcXVpcmVkUnVsZSA9IG9wdGlvbi5ydWxlcy5maW5kKHMgPT4gcy5rZXkgPT0gVmFsaWRhdGlvbkNvbnN0YW50LlJlcXVpcmVkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXF1aXJlZFJ1bGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXF1aXJlZFJ1bGUuaXNWYWxpZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2VxdWVuY2VJZCA9IHRoaXMuZmluZER5bmFtaWNTZXF1ZW5jZUlkKGVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhY3Rpb24uZXhlY3V0ZShmaWVsZFZhbHVlLCBwYXlsb2FkLCArc2VxdWVuY2VJZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnBpcGUobWFwKHJlc3BvbnNlID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbi5pc1ZhbGlkID0gcmVzcG9uc2Uuc3RhdHVzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5tZXNzYWdlKSBhY3Rpb24uZXJyb3JNZXNzYWdlID0gKCkgPT4geyByZXR1cm4gcmVzcG9uc2UubWVzc2FnZTsgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhY3Rpb247XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6IHRocm93IG5ldyBFcnJvcihgVW5oYW5kbGVkIGFjdGlvbjogJHthY3Rpb24ua2V5fWApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBmb3JrSm9pbih2YWxpZGF0ZWRBY3Rpb25zJCkucGlwZShcclxuICAgICAgICAgICAgdGFrZSgxKSxcclxuICAgICAgICAgICAgbWFwKHZhbGlkYXRlZEFjdGlvbnMgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbi5yZWxldmFudEZpZWxkcykgdGhpcy52YWxpZGF0ZVJlbGV2YW50RmllbGRzKG9wdGlvbi5yZWxldmFudEZpZWxkcyhwYXlsb2FkKSk7XHJcbiAgICAgICAgICAgICAgICBvcHRpb24ucnVsZXMgPSB2YWxpZGF0ZWRBY3Rpb25zO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG9wdGlvbjtcclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHZhbGlkYXRlUmVsZXZhbnRGaWVsZHMocmVsZXZhbnRGaWVsZHM/OiBzdHJpbmdbXSk6IHZvaWQge1xyXG4gICAgICAgIGlmICghcmVsZXZhbnRGaWVsZHMgfHwgcmVsZXZhbnRGaWVsZHMubGVuZ3RoID09IDApIHJldHVybjtcclxuICAgICAgICBpZiAocmVsZXZhbnRGaWVsZHMgJiYgcmVsZXZhbnRGaWVsZHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICByZWxldmFudEZpZWxkcy5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGF0dHJpYnV0ZXMgPSB0aGlzLmVsZW1lbnRzW2ldLmF0dHJpYnV0ZXM7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGF0dHJpYnV0ZXMgJiYgYXR0cmlidXRlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhdHRyaWJ1dGVzW3RoaXMuYXR0cmlidXRlTmFtZV0udmFsdWUgPT0gaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9wdGlvbiA9IHRoaXMuZmluZEVsZW1lbnRPcHRpb24odGhpcy5lbGVtZW50c1tpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy52YWxpZGF0ZUVsZW1lbnQodGhpcy5lbGVtZW50c1tpXSwgb3B0aW9uLCB0cnVlKS5waXBlKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXAobmV3T3B0aW9uID0+IG9wdGlvbiA9IG5ld09wdGlvbiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcChvcHRpb24gPT4gdGhpcy5zeW5jRXJyb3JNZXNzYWdlcyh0aGlzLmVsZW1lbnRzW2ldLCBvcHRpb24pKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLnN1YnNjcmliZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJldHJpZXZlU3VtbWFyeUVycm9ycygpOiBPYnNlcnZhYmxlPFN1bW1hcnlFcnJvcltdPiB7XHJcbiAgICAgICAgY29uc3QgZXJyb3JzJCA9IHRoaXMuZWxlbWVudHMubWFwKGVsZW1lbnQgPT4ge1xyXG4gICAgICAgICAgICBsZXQgdmFsaWRhdGlvbk9wdGlvbiA9IHRoaXMuZmluZEVsZW1lbnRPcHRpb24oZWxlbWVudCk7XHJcbiAgICAgICAgICAgIGlmICghdmFsaWRhdGlvbk9wdGlvbikgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudmFsaWRhdGVFbGVtZW50KGVsZW1lbnQsIHZhbGlkYXRpb25PcHRpb24pLnBpcGUoXHJcbiAgICAgICAgICAgICAgICBtYXAobmV3T3B0aW9uID0+IHZhbGlkYXRpb25PcHRpb24gPSBuZXdPcHRpb24pLFxyXG4gICAgICAgICAgICAgICAgbWFwKG9wdGlvbiA9PiB0aGlzLnN5bmNFcnJvck1lc3NhZ2VzKGVsZW1lbnQsIG9wdGlvbikpLFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zdCBlcnJvckJhdGNoID0gZm9ya0pvaW4oZXJyb3JzJCk7XHJcbiAgICAgICAgY29uc3QgcmVsYXRlZEVycm9ycyA9IDxPYnNlcnZhYmxlPFN1bW1hcnlFcnJvcltdPj50aGlzLnJlbGF0ZWRQcm92aWRlcnMucmVkdWNlKChwcmV2aW91czogT2JzZXJ2YWJsZTxTdW1tYXJ5RXJyb3JbXT4sIHByb3ZpZGVyOiBWYWxpZGF0aW9uU2VydmljZSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBzdWJFcnJvcnMkID0gcHJvdmlkZXIucmV0cmlldmVTdW1tYXJ5RXJyb3JzKCk7XHJcbiAgICAgICAgICAgIHJldHVybiBtZXJnZShwcmV2aW91cywgc3ViRXJyb3JzJCk7XHJcbiAgICAgICAgfSwgb2YoW10pKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGZvcmtKb2luKGVycm9yQmF0Y2gsIHJlbGF0ZWRFcnJvcnMpLnBpcGUoXHJcbiAgICAgICAgICAgIGRlZmF1bHRJZkVtcHR5KFtbXSwgW11dKSxcclxuICAgICAgICAgICAgbWFwKHZhbHVlID0+IFsuLi52YWx1ZVswXSwgLi4udmFsdWVbMV1dKSxcclxuICAgICAgICAgICAgbWFwKHJlc3VsdCA9PiBbXS5jb25jYXQocmVzdWx0LmZpbHRlcihlcnJvciA9PiBlcnJvcikpKSxcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZmluZEVsZW1lbnRPcHRpb24oZWxlbWVudDogRWxlbWVudCk6IFZhbGlkYXRpb25PcHRpb24gfCBudWxsIHtcclxuICAgICAgICBjb25zdCB2YWxpZGF0aW9uSWRBdHRyaWJ1dGUgPSBlbGVtZW50LmF0dHJpYnV0ZXNbVmFsaWRhdGlvbkNvbnN0YW50LlZBTElEQVRJT05fSURdO1xyXG4gICAgICAgIGlmICghdmFsaWRhdGlvbklkQXR0cmlidXRlKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgICAgICAgY29uc3QgdmFsaWRhdGlvbklkID0gdmFsaWRhdGlvbklkQXR0cmlidXRlLnZhbHVlO1xyXG4gICAgICAgIGlmICghdmFsaWRhdGlvbklkKSByZXR1cm4gbnVsbDtcclxuICAgICAgICByZXR1cm4gdGhpcy52YWxpZGF0b3Iub3B0aW9ucy5maW5kKG9wdGlvbiA9PiBvcHRpb24udmFsaWRhdGlvbklkID09PSB2YWxpZGF0aW9uSWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZmluZEVycm9ySXRlbUVsZW1lbnQoZXJyb3JFbGVtZW50OiBhbnksIGtleTogc3RyaW5nKTogYW55IHwgbnVsbCB7XHJcbiAgICAgICAgY29uc3QgY2hpbGRyZW4gPSA8RWxlbWVudFtdPkFycmF5LmZyb20oZXJyb3JFbGVtZW50LmNoaWxkcmVuKTtcclxuICAgICAgICByZXR1cm4gY2hpbGRyZW5cclxuICAgICAgICAgICAgLmZpbHRlcih4ID0+IHguYXR0cmlidXRlc1tWYWxpZGF0aW9uQ29uc3RhbnQuRVJST1JfSVRFTV9FTEVNRU5UX0lEXSlcclxuICAgICAgICAgICAgLmZpbmQoeCA9PiB4LmF0dHJpYnV0ZXNbVmFsaWRhdGlvbkNvbnN0YW50LkVSUk9SX0lURU1fRUxFTUVOVF9JRF0udmFsdWUgPT09IGtleSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBmaW5kRHluYW1pY1NlcXVlbmNlSWQoZWxlbWVudDogRWxlbWVudCk6IHN0cmluZyB8IG51bGwge1xyXG4gICAgICAgIGNvbnN0IHNlcXVlbmNlSWRBdHRyaWJ1dGUgPSBlbGVtZW50LmF0dHJpYnV0ZXNbVmFsaWRhdGlvbkNvbnN0YW50LkFSUkFZX1NFUVVFTkNFX0lEXTtcclxuICAgICAgICBpZiAoIXNlcXVlbmNlSWRBdHRyaWJ1dGUpIHJldHVybiBudWxsO1xyXG5cclxuICAgICAgICBjb25zdCBzZXF1ZW5jZUlkID0gc2VxdWVuY2VJZEF0dHJpYnV0ZS52YWx1ZTtcclxuICAgICAgICBpZiAoIXNlcXVlbmNlSWQpIHJldHVybiBudWxsO1xyXG4gICAgICAgIHJldHVybiBzZXF1ZW5jZUlkO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZmluZEVycm9yRWxlbWVudChlbGVtZW50OiBFbGVtZW50KTogRWxlbWVudCB7XHJcbiAgICAgICAgaWYgKGVsZW1lbnQucGFyZW50RWxlbWVudCAmJiBlbGVtZW50LnBhcmVudEVsZW1lbnQuY2hpbGRyZW4pIHtcclxuICAgICAgICAgICAgY29uc3Qgc2xpYmluZ3MgPSA8RWxlbWVudFtdPkFycmF5LmZyb20oZWxlbWVudC5wYXJlbnRFbGVtZW50LmNoaWxkcmVuKTtcclxuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHNsaWJpbmdzLmZpbHRlcih4ID0+IHguYXR0cmlidXRlcykuZmluZCh4ID0+IHguYXR0cmlidXRlc1tWYWxpZGF0aW9uQ29uc3RhbnQuRVJST1JfRUxFTUVOVF9JRF0pO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlZ2lzdGVyRWxlbWVudHMoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3Qgbm9uRHluYW1pY09wdGlvbnMgPSB0aGlzLnZhbGlkYXRvci5vcHRpb25zLmZpbHRlcih4ID0+ICF4LmR5bmFtaWMpO1xyXG4gICAgICAgIGNvbnN0IG5vbkR5bmFtaWNFbGVtZW50cyA9IG5vbkR5bmFtaWNPcHRpb25zLnJlZHVjZSgocHJldmlvdXM6IEVsZW1lbnRbXSwgY3VycmVudDogVmFsaWRhdGlvbk9wdGlvbikgPT4ge1xyXG4gICAgICAgICAgICBsZXQgcXVlcnkgPSBgKlske3RoaXMuYXR0cmlidXRlTmFtZX09XCIke2N1cnJlbnQudmFsaWRhdGlvbk5hbWV9XCJdYDtcclxuICAgICAgICAgICAgaWYgKHRoaXMudmFsaWRhdG9yLnNjb3BlKSB7XHJcbiAgICAgICAgICAgICAgICBxdWVyeSArPSBgW3Njb3BlPVwiJHt0aGlzLnZhbGlkYXRvci5zY29wZX1cIl1gO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnRzID0gPEVsZW1lbnRbXT5BcnJheS5mcm9tKHRoaXMudmFsaWRhdG9yLmZvcm1SZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKHF1ZXJ5KSk7XHJcbiAgICAgICAgICAgIGVsZW1lbnRzLmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB2YWxpZGF0aW9uSWQgPSB0aGlzLl9kYXRhU2VydmljZS5uZXdHdWlkKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZShlbGVtZW50LCBWYWxpZGF0aW9uQ29uc3RhbnQuVkFMSURBVElPTl9JRCwgdmFsaWRhdGlvbklkKTtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnQudmFsaWRhdGlvbklkID0gdmFsaWRhdGlvbklkO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIHByZXZpb3VzLmNvbmNhdChlbGVtZW50cyk7XHJcbiAgICAgICAgfSwgW10pO1xyXG5cclxuICAgICAgICBsZXQgZ2VuZXJhdGVkRHluYW1pY09wdGlvbnMgPSBbXTtcclxuICAgICAgICBsZXQgZHluYW1pY0VsZW1lbnRzID0gW107XHJcbiAgICAgICAgdGhpcy52YWxpZGF0b3Iub3B0aW9ucyA9IHRoaXMudmFsaWRhdG9yLm9wdGlvbnMuZmlsdGVyKHggPT4gIXguZHluYW1pYyk7XHJcbiAgICAgICAgdGhpcy52aXJ0dWFsVmFsaWRhdGlvbk9wdGlvbnMuZm9yRWFjaCgoY3VycmVudDogVmFsaWRhdGlvbk9wdGlvbikgPT4ge1xyXG4gICAgICAgICAgICBsZXQgcXVlcnkgPSBgKlske3RoaXMuYXR0cmlidXRlTmFtZX09XCIke2N1cnJlbnQudmFsaWRhdGlvbk5hbWV9XCJdYDtcclxuICAgICAgICAgICAgaWYgKHRoaXMudmFsaWRhdG9yLnNjb3BlKSB7XHJcbiAgICAgICAgICAgICAgICBxdWVyeSArPSBgW3Njb3BlPVwiJHt0aGlzLnZhbGlkYXRvci5zY29wZX1cIl1gO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnRzID0gQXJyYXkuZnJvbSh0aGlzLnZhbGlkYXRvci5mb3JtUmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChxdWVyeSkpO1xyXG4gICAgICAgICAgICBjb25zdCBjbG9uZWRPcHRpb25zID0gZWxlbWVudHMubWFwKChlbGVtZW50LCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdmFsaWRhdGlvbklkID0gdGhpcy5fZGF0YVNlcnZpY2UubmV3R3VpZCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUoZWxlbWVudCwgVmFsaWRhdGlvbkNvbnN0YW50LlZBTElEQVRJT05fSUQsIHZhbGlkYXRpb25JZCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZShlbGVtZW50LCBWYWxpZGF0aW9uQ29uc3RhbnQuQVJSQVlfU0VRVUVOQ0VfSUQsIGluZGV4LnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAuLi5jdXJyZW50LFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb25JZDogdmFsaWRhdGlvbklkLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlUmVzb2x2ZXI6IGN1cnJlbnQudmFsdWVSZXNvbHZlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICA/IChwYXlsb2FkOiBhbnkpID0+IGN1cnJlbnQudmFsdWVSZXNvbHZlcihwYXlsb2FkLCBpbmRleClcclxuICAgICAgICAgICAgICAgICAgICAgICAgOiAoKSA9PiB7IHJldHVybiAoPGFueT5lbGVtZW50KS52YWx1ZTsgfVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGR5bmFtaWNFbGVtZW50cy5wdXNoKC4uLmVsZW1lbnRzKTtcclxuICAgICAgICAgICAgZ2VuZXJhdGVkRHluYW1pY09wdGlvbnMucHVzaCguLi5jbG9uZWRPcHRpb25zKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy52YWxpZGF0b3Iub3B0aW9ucyA9IG5vbkR5bmFtaWNPcHRpb25zLmNvbmNhdChnZW5lcmF0ZWREeW5hbWljT3B0aW9ucyk7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50cyA9IG5vbkR5bmFtaWNFbGVtZW50cy5jb25jYXQoZHluYW1pY0VsZW1lbnRzKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZWxlbWVudHMpIHtcclxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VkSXRlbXMgPSBbXTtcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50cy5mb3JFYWNoKChlbGVtZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwYXlsb2FkID0gdGhpcy52YWxpZGF0b3IucGF5bG9hZFJlZigpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGVsZW1lbnRPcHRpb24gPSB0aGlzLmZpbmRFbGVtZW50T3B0aW9uKGVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VkSXRlbXMucHVzaChuZXcgQ2hhbmdlZEl0ZW0oe1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiBlbGVtZW50T3B0aW9uLnZhbGlkYXRpb25JZCxcclxuICAgICAgICAgICAgICAgICAgICBmaWVsZDogZWxlbWVudE9wdGlvbi52YWxpZGF0aW9uTmFtZSxcclxuICAgICAgICAgICAgICAgICAgICBvbGRWYWx1ZTogZWxlbWVudE9wdGlvbi52YWx1ZVJlc29sdmVyID8gZWxlbWVudE9wdGlvbi52YWx1ZVJlc29sdmVyKHBheWxvYWQpIDogbnVsbFxyXG4gICAgICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZWdpc3RlckV2ZW50cygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmVsZW1lbnRzLmZpbHRlcihlbGVtZW50ID0+IGVsZW1lbnQuYXR0cmlidXRlc1t0aGlzLmF0dHJpYnV0ZU5hbWVdKS5mb3JFYWNoKChlbGVtZW50OiBhbnkpID0+IHtcclxuICAgICAgICAgICAgaWYgKCFlbGVtZW50LmZvY3Vzb3V0TGlzdGVuZXIpIHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQuZm9jdXNvdXRMaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKGVsZW1lbnQsICdmb2N1c291dCcsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZUJsdXJFdmVudChlbGVtZW50KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5mb2N1c291dExpc3RlbmVyID0gdGhpcy5yZW5kZXJlci5saXN0ZW4oZWxlbWVudCwgJ2NoYW5nZScsICgkZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwYXlsb2FkID0gdGhpcy52YWxpZGF0b3IucGF5bG9hZFJlZigpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBlbGVtZW50T3B0aW9uID0gdGhpcy5maW5kRWxlbWVudE9wdGlvbihlbGVtZW50KTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSBlbGVtZW50T3B0aW9uLnZhbHVlUmVzb2x2ZXIgPyBlbGVtZW50T3B0aW9uLnZhbHVlUmVzb2x2ZXIocGF5bG9hZCkgOiBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlbGVtZW50T3B0aW9uICYmIGVsZW1lbnRPcHRpb24uZGlydHlDaGVjaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY3VycmVudEl0ZW0gPSB0aGlzLmNoYW5nZWRJdGVtcy5maW5kKHMgPT4gcy5pZCA9PSBlbGVtZW50T3B0aW9uLnZhbGlkYXRpb25JZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghY3VycmVudEl0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlZEl0ZW1zLnB1c2gobmV3IENoYW5nZWRJdGVtKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogZWxlbWVudE9wdGlvbi52YWxpZGF0aW9uSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmllbGQ6IGVsZW1lbnRPcHRpb24udmFsaWRhdGlvbk5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHZhbHVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZTogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudEl0ZW0udmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50SXRlbS5vbGRWYWx1ZSA9PSB1bmRlZmluZWQgfHwgY3VycmVudEl0ZW0ub2xkVmFsdWUgPT0gJycpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT0gdW5kZWZpbmVkIHx8IHZhbHVlID09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRJdGVtLmNoYW5nZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRJdGVtLmNoYW5nZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT0gdW5kZWZpbmVkIHx8IHZhbHVlID09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRJdGVtLmNoYW5nZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRJdGVtLm9sZFZhbHVlLnRvU3RyaW5nKCkgIT0gY3VycmVudEl0ZW0udmFsdWUudG9TdHJpbmcoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudEl0ZW0uY2hhbmdlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50SXRlbS5jaGFuZ2UgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoZWxlbWVudE9wdGlvbiAmJiBlbGVtZW50T3B0aW9uLnJ1bGVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnRPcHRpb24ucnVsZXMuZm9yRWFjaCgocnVsZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcnVsZS5pc1ZhbGlkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBoYW5kbGVCbHVyRXZlbnQoZWxlbWVudDogYW55KTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGVsZW1lbnRPcHRpb24gPSB0aGlzLmZpbmRFbGVtZW50T3B0aW9uKGVsZW1lbnQpO1xyXG4gICAgICAgIGlmICghZWxlbWVudE9wdGlvbikgdGhyb3cgbmV3IEVycm9yKCchZWxlbWVudE9wdGlvbicpO1xyXG5cclxuICAgICAgICB0aGlzLnZhbGlkYXRlRWxlbWVudChlbGVtZW50LCBlbGVtZW50T3B0aW9uKS5waXBlKHRha2UoMSkpLnN1YnNjcmliZShuZXdPcHRpb24gPT4ge1xyXG4gICAgICAgICAgICBlbGVtZW50T3B0aW9uID0gbmV3T3B0aW9uO1xyXG4gICAgICAgICAgICB0aGlzLnN5bmNFcnJvck1lc3NhZ2VzKGVsZW1lbnQsIGVsZW1lbnRPcHRpb24pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3luY0Vycm9yTWVzc2FnZXMoZWxlbWVudDogYW55LCBvcHRpb246IFZhbGlkYXRpb25PcHRpb24pOiBTdW1tYXJ5RXJyb3IgfCBudWxsIHtcclxuICAgICAgICBsZXQgZXJyb3JNZXNzYWdlczogc3RyaW5nW10gPSBbXTtcclxuICAgICAgICBvcHRpb24ucnVsZXMuZm9yRWFjaChhY3Rpb24gPT4ge1xyXG4gICAgICAgICAgICBpZiAoYWN0aW9uLmlzVmFsaWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJFcnJvckl0ZW1FbGVtZW50KGVsZW1lbnQsIGFjdGlvbik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBlcnJvck1lc3NhZ2UgPSB0aGlzLnNldEVsZW1lbnRFcnJvcihlbGVtZW50LCBhY3Rpb24sIG9wdGlvbik7XHJcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2VzLnB1c2goZXJyb3JNZXNzYWdlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zdCBpbnZhbGlkQWN0aW9ucyA9IG9wdGlvbi5ydWxlcy5maWx0ZXIoeCA9PiAheC5pc1ZhbGlkKTtcclxuICAgICAgICBpZiAoaW52YWxpZEFjdGlvbnMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3MoZWxlbWVudCwgb3B0aW9uLmVycm9yRWxlbWVudENsYXNzKTtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyhlbGVtZW50LCBvcHRpb24uc3VjY2Vzc0VsZW1lbnRDbGFzcyk7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZWxlbWVudDogZWxlbWVudCxcclxuICAgICAgICAgICAgbWVzc2FnZXM6IGVycm9yTWVzc2FnZXNcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhZGRSZWxhdGVkUHJvdmlkZXJzKHByb3ZpZGVyczogVmFsaWRhdGlvblNlcnZpY2VbXSk6IHZvaWQge1xyXG4gICAgICAgIGxldCBuZXdQcm92aWRlcnMgPSBwcm92aWRlcnMuZmlsdGVyKHggPT4gdGhpcy5yZWxhdGVkUHJvdmlkZXJzLmluZGV4T2YoeCkgPCAwKTtcclxuICAgICAgICBuZXdQcm92aWRlcnMuZm9yRWFjaChwcm92aWRlciA9PlxyXG4gICAgICAgICAgICBwcm92aWRlci5vbkRlc3Ryb3kuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVsYXRlZFByb3ZpZGVycyA9IHRoaXMucmVsYXRlZFByb3ZpZGVycy5maWx0ZXIoKCkgPT4gdGhpcy5yZWxhdGVkUHJvdmlkZXJzLmluZGV4T2YocHJvdmlkZXIpIDwgMCk7XHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICB0aGlzLnJlbGF0ZWRQcm92aWRlcnMucHVzaCguLi5uZXdQcm92aWRlcnMpO1xyXG4gICAgfVxyXG59Il19