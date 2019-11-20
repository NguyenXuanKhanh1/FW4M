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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWZ3NGMvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9zaGFyZWQvdmFsaWRhdGlvbi92YWxpZGF0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBYSxVQUFVLEVBQUUsZ0JBQWdCLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RixPQUFPLEVBQXFDLGtCQUFrQixFQUFnQyxXQUFXLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN0SSxPQUFPLEVBQUUsWUFBWSxFQUFjLFFBQVEsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxHQUFHLEVBQUUsY0FBYyxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzNELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7Ozs7OztBQUduRSxNQUFNLE9BQU8saUJBQWlCOzs7Ozs7OztJQWMxQixZQUNjLGVBQWlDLEVBQ2pDLGtCQUFzQyxFQUN4QyxZQUF5QixFQUN6QixjQUE2QixFQUM3QixrQkFBcUM7UUFKbkMsb0JBQWUsR0FBZixlQUFlLENBQWtCO1FBQ2pDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFDeEMsaUJBQVksR0FBWixZQUFZLENBQWE7UUFDekIsbUJBQWMsR0FBZCxjQUFjLENBQWU7UUFDN0IsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFtQjtRQWxCaEMsY0FBUyxHQUF1QixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzVELGFBQVEsR0FBYyxFQUFFLENBQUM7UUFFekIsYUFBUSxHQUFXLGtCQUFrQixDQUFDLGlCQUFpQixDQUFDO1FBQ3hELFdBQU0sR0FBVyxrQkFBa0IsQ0FBQyxrQkFBa0IsQ0FBQztRQUN2RCxrQkFBYSxHQUFXLGtCQUFrQixDQUFDLGFBQWEsQ0FBQztRQUV6RCxxQkFBZ0IsR0FBd0IsRUFBRSxDQUFDO1FBQzNDLGtCQUFhLEdBQWlCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDakQsNkJBQXdCLEdBQXVCLEVBQUUsQ0FBQztRQUNsRCxpQkFBWSxHQUFrQixFQUFFLENBQUM7UUFVckMsSUFBSSxDQUFDLFFBQVEsR0FBRyxlQUFlLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMvRCxDQUFDOzs7O0lBRUQsV0FBVztRQUNQLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDakMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUMxQixDQUFDOzs7OztJQUVNLElBQUksQ0FBQyxLQUFxQztRQUM3QyxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUM7UUFDakMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVTtZQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVTs7O1lBQUcsR0FBRyxFQUFFLEdBQUcsT0FBTyxFQUFFLENBQUEsQ0FBQyxDQUFDLENBQUEsQ0FBQztRQUVoRixJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsMEJBQTBCLEVBQUU7WUFDM0MsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsMEJBQTBCLENBQUMsQ0FBQztTQUN2RTtRQUVELElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLE9BQU87Ozs7UUFBQyxNQUFNLENBQUMsRUFBRTtZQUNwQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVc7Z0JBQUUsTUFBTSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDO1lBQ3BFLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVTtnQkFBRSxNQUFNLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDO1lBQ3RFLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTzs7OztZQUFDLE1BQU0sQ0FBQyxFQUFFO2dCQUMxQixJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUU7b0JBQUUsTUFBTSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUN4RCxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRTtvQkFDdEIsUUFBUSxNQUFNLENBQUMsR0FBRyxFQUFFO3dCQUNoQixLQUFLLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxDQUFDOzRCQUM5QixNQUFNLENBQUMsWUFBWTs7Ozs7NEJBQUcsQ0FBQyxPQUFnQixFQUFFLFFBQWdCLEVBQUUsRUFBRTs7c0NBQ25ELGtCQUFrQixHQUFHLENBQUMsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFO2dDQUNyRCxPQUFPLEdBQUcsTUFBTSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsa0JBQWtCLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLEVBQUUsQ0FBQzs0QkFDN0gsQ0FBQyxDQUFBLENBQUM7NEJBQ0YsTUFBTTt5QkFDVDt3QkFDRCxPQUFPLENBQUMsQ0FBQzs0QkFDTCxNQUFNLENBQUMsWUFBWTs7OzRCQUFHLEdBQUcsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsRUFBRSxDQUFBLENBQUM7NEJBQ3JGLE1BQU07eUJBQ1Q7cUJBQ0o7aUJBQ0o7WUFDTCxDQUFDLEVBQUMsQ0FBQztRQUNQLENBQUMsRUFBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLHdCQUF3QixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLE1BQU07Ozs7UUFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUMsQ0FBQztRQUM5RSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdkIsQ0FBQzs7Ozs7SUFFTSxNQUFNLENBQUMsR0FBVztRQUNyQixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUc7WUFBRSxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztJQUNsQyxDQUFDOzs7OztJQUVNLFdBQVcsQ0FBQywwQkFBZ0Q7UUFDL0QsSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZOzs7UUFBQyxHQUFHLEVBQUU7WUFDbEMsSUFBSSwwQkFBMEIsSUFBSSwwQkFBMEIsQ0FBQyxNQUFNLEVBQUU7Z0JBQ2pFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO2FBQ3hEO1lBQ0QsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFDeEIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQzFCLENBQUMsRUFBQyxDQUFDO0lBQ1AsQ0FBQzs7Ozs7O0lBRU0sWUFBWSxDQUFDLGFBQStDLEVBQUUsZUFBa0Q7UUFDbkgsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUMsU0FBUzs7OztRQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7WUFDaEQsSUFBSSxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtnQkFDbkMsSUFBSSxhQUFhO29CQUFFLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDM0MsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDbkI7aUJBQU07Z0JBQ0gsSUFBSSxlQUFlO29CQUFFLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUNsRDtRQUNMLENBQUMsRUFBQyxDQUFDO1FBQ0gsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEIsQ0FBQzs7Ozs7O0lBRU0sT0FBTyxDQUFDLE9BQWdCLElBQUksRUFBRSxRQUFpQixJQUFJO1FBQ3RELElBQUksSUFBSSxFQUFFO1lBQ04sSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUMsU0FBUzs7OztZQUFDLENBQUMsTUFBc0IsRUFBRSxFQUFFO2dCQUM5RCxJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0JBQ2xELElBQUksS0FBSyxFQUFFO29CQUNQLElBQUksTUFBTSxJQUFJLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFOzs0QkFDekIsWUFBWSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUM7OzRCQUN4QixFQUFFLEdBQUcsbUJBQUssWUFBWSxDQUFDLE9BQU8sRUFBQTt3QkFDbEMsSUFBSSxFQUFFLEVBQUU7NEJBQ0osSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZOzs7NEJBQUMsR0FBRyxFQUFFO2dDQUNsQyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7NEJBQ2YsQ0FBQyxFQUFDLENBQUM7eUJBQ047cUJBQ0o7aUJBQ0o7WUFDTCxDQUFDLEVBQUMsQ0FBQztTQUNOOztZQUVHLEtBQUssR0FBRyxJQUFJO1FBQ2hCLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUU7WUFDeEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsT0FBTzs7OztZQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7O3NCQUNoQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUU7O3NCQUNyQyxVQUFVLEdBQUcsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSTtnQkFDOUUsSUFBSSxNQUFNLENBQUMsS0FBSyxFQUFFO29CQUNkLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTzs7OztvQkFBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO3dCQUM1QixJQUFJLE1BQU0sQ0FBQyxPQUFPLElBQUksSUFBSSxFQUFFOzRCQUN4QixJQUFJLE1BQU0sQ0FBQyxPQUFPLElBQUksS0FBSyxFQUFFO2dDQUN6QixLQUFLLEdBQUcsS0FBSyxDQUFDOzZCQUNqQjtpQ0FBTTtnQ0FDSCxJQUFJLFVBQVU7b0NBQUUsS0FBSyxHQUFHLEtBQUssQ0FBQzs2QkFDakM7eUJBQ0o7b0JBQ0wsQ0FBQyxFQUFDLENBQUM7aUJBQ047WUFDTCxDQUFDLEVBQUMsQ0FBQztTQUNOO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQzs7Ozs7SUFFTSxZQUFZLENBQUMsUUFBNkM7UUFDN0QsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUMsU0FBUzs7OztRQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7WUFDM0MsSUFBSSxRQUFRO2dCQUFFLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNoQyxDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7Ozs7O0lBRU0sTUFBTSxDQUFDLFFBQW1CO1FBQzdCLE9BQU8sSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUMsSUFBSSxDQUNwQyxHQUFHOzs7O1FBQUMsTUFBTSxDQUFDLEVBQUU7WUFDVCxJQUFJLFFBQVE7Z0JBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQy9CLElBQUksTUFBTSxDQUFDLE1BQU0sSUFBSSxDQUFDO2dCQUFFLE9BQU8sSUFBSSxDQUFDO1lBQ3BDLE9BQU8sS0FBSyxDQUFDO1FBQ2pCLENBQUMsRUFBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JCLENBQUM7Ozs7Ozs7SUFFTSxlQUFlLENBQUMsT0FBZ0IsRUFBRSxNQUFzQixFQUFFLE1BQXdCO1FBQ3JGLElBQUksQ0FBQyxPQUFPO1lBQUUsT0FBTztRQUNyQixJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsa0JBQWtCLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUMzRSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUM7O1lBQ3RELFlBQVksR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDO1FBQ2pELElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDZixZQUFZLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDakQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFLGtCQUFrQixDQUFDLGdCQUFnQixFQUFFLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDaEgsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDL0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNwRCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUM7O2tCQUN6RCxhQUFhLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDO1lBQ3ZELElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxZQUFZLENBQUMsQ0FBQztTQUMxRDs7Y0FFSyxtQkFBbUIsR0FBVyxHQUFHLE1BQU0sQ0FBQyxFQUFFLEVBQUU7O1lBQzlDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxZQUFZLEVBQUUsbUJBQW1CLENBQUM7O2NBQzdFLGlCQUFpQixHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxPQUFPLENBQUM7O2NBQ3ZELFlBQVksR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxpQkFBaUIsQ0FBQztRQUVwRSxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7WUFDbkIsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDckQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLEVBQUUsa0JBQWtCLENBQUMscUJBQXFCLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztZQUM1RyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBRXBGLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1NBQzdEO1FBQ0QsT0FBTyxZQUFZLENBQUM7SUFDeEIsQ0FBQzs7Ozs7O0lBRU0scUJBQXFCLENBQUMsT0FBWSxFQUFFLE1BQXNCOztZQUN6RCxZQUFZLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQztRQUNqRCxJQUFJLENBQUMsWUFBWTtZQUFFLE9BQU87O2NBRXBCLG1CQUFtQixHQUFXLEdBQUcsTUFBTSxDQUFDLEVBQUUsRUFBRTs7WUFDOUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFlBQVksRUFBRSxtQkFBbUIsQ0FBQztRQUNuRixJQUFJLENBQUMsZ0JBQWdCO1lBQUUsT0FBTztRQUM5QixJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztJQUM5RCxDQUFDOzs7OztJQUVNLE9BQU8sQ0FBQyxRQUF5QztRQUNwRCxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sSUFBSSxDQUFDO1lBQUUsT0FBTyxLQUFLLENBQUM7O1lBQ2xFLFFBQVEsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU07Ozs7UUFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUM7UUFDdEQsSUFBSSxRQUFRO1lBQUUsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2pDLE9BQU8sUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7SUFDL0IsQ0FBQzs7Ozs7OztJQUVNLGVBQWUsQ0FBQyxPQUFZLEVBQUUsTUFBd0IsRUFBRSxNQUFlLEtBQUs7O2NBQ3pFLE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRTs7Y0FDckMsVUFBVSxHQUFHLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUk7O2NBQ3hFLGlCQUFpQixHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRzs7OztRQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ2hELFFBQVEsTUFBTSxDQUFDLEdBQUcsRUFBRTtnQkFDaEIsS0FBSyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDOUIsT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHOzs7O29CQUFDLE9BQU8sQ0FBQyxFQUFFO3dCQUNuRSxNQUFNLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQzt3QkFDekIsT0FBTyxNQUFNLENBQUM7b0JBQ2xCLENBQUMsRUFBQyxDQUFDLENBQUM7aUJBQ1A7Z0JBQ0QsS0FBSyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDM0IsT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHOzs7O29CQUFDLE9BQU8sQ0FBQyxFQUFFO3dCQUNoRSxNQUFNLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQzt3QkFDekIsT0FBTyxNQUFNLENBQUM7b0JBQ2xCLENBQUMsRUFBQyxDQUFDLENBQUM7aUJBQ1A7Z0JBQ0QsS0FBSyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDM0IsT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHOzs7O29CQUFDLE9BQU8sQ0FBQyxFQUFFO3dCQUNoRSxNQUFNLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQzt3QkFDekIsT0FBTyxNQUFNLENBQUM7b0JBQ2xCLENBQUMsRUFBQyxDQUFDLENBQUM7aUJBQ1A7Z0JBQ0QsS0FBSyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDNUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPO3dCQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQztvQkFDeEQsSUFBSSxDQUFDLEdBQUcsRUFBRTt3QkFDTixJQUFJLENBQUMsVUFBVSxFQUFFOzRCQUNiLE1BQU0sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDOzRCQUN0QixPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQzt5QkFDckI7NkJBQU07O2dDQUNDLFlBQVksR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUk7Ozs7NEJBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLGtCQUFrQixDQUFDLFFBQVEsRUFBQzs0QkFDL0UsSUFBSSxZQUFZLEVBQUU7Z0NBQ2QsWUFBWSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7NkJBQy9CO3lCQUNKO3FCQUNKOzswQkFDSyxVQUFVLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDLE9BQU8sQ0FBQztvQkFDdEQsT0FBTyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxPQUFPLEVBQUUsQ0FBQyxVQUFVLENBQUM7eUJBQ2xELElBQUksQ0FBQyxHQUFHOzs7O29CQUFDLFFBQVEsQ0FBQyxFQUFFO3dCQUNqQixJQUFJLFFBQVEsRUFBRTs0QkFDVixNQUFNLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUM7NEJBQ2pDLElBQUksUUFBUSxDQUFDLE9BQU87Z0NBQUUsTUFBTSxDQUFDLFlBQVk7OztnQ0FBRyxHQUFHLEVBQUUsR0FBRyxPQUFPLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQzt5QkFDbEY7d0JBQ0QsT0FBTyxNQUFNLENBQUM7b0JBQ2xCLENBQUMsRUFBQyxDQUFDLENBQUM7aUJBQ1g7Z0JBQ0QsT0FBTyxDQUFDLENBQUMsTUFBTSxJQUFJLEtBQUssQ0FBQyxxQkFBcUIsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7YUFDL0Q7UUFDTCxDQUFDLEVBQUM7UUFFRixPQUFPLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLElBQUksQ0FDbkMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUNQLEdBQUc7Ozs7UUFBQyxnQkFBZ0IsQ0FBQyxFQUFFO1lBQ25CLElBQUksTUFBTSxDQUFDLGNBQWM7Z0JBQUUsSUFBSSxDQUFDLHNCQUFzQixDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUN2RixNQUFNLENBQUMsS0FBSyxHQUFHLGdCQUFnQixDQUFDO1lBQ2hDLE9BQU8sTUFBTSxDQUFDO1FBQ2xCLENBQUMsRUFBQyxDQUNMLENBQUM7SUFDTixDQUFDOzs7Ozs7SUFFTyxzQkFBc0IsQ0FBQyxjQUF5QjtRQUNwRCxJQUFJLENBQUMsY0FBYyxJQUFJLGNBQWMsQ0FBQyxNQUFNLElBQUksQ0FBQztZQUFFLE9BQU87UUFDMUQsSUFBSSxjQUFjLElBQUksY0FBYyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDN0MsY0FBYyxDQUFDLE9BQU87Ozs7WUFBQyxJQUFJLENBQUMsRUFBRTtnQkFDMUIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFOzt3QkFDdkMsVUFBVSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVTtvQkFDNUMsSUFBSSxVQUFVLElBQUksVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7d0JBQ3JDLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxLQUFLLElBQUksSUFBSSxFQUFFOztnQ0FDMUMsTUFBTSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUNyRCxJQUFJLE1BQU0sRUFBRTtnQ0FDUixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDLElBQUksQ0FDckQsR0FBRzs7OztnQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLE1BQU0sR0FBRyxTQUFTLEVBQUMsRUFDcEMsR0FBRzs7OztnQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxFQUFDLENBQ2xFLENBQUMsU0FBUyxFQUFFLENBQUM7NkJBQ2pCOzRCQUNELE1BQU07eUJBQ1Q7cUJBQ0o7aUJBQ0o7WUFDTCxDQUFDLEVBQUMsQ0FBQztTQUNOO0lBQ0wsQ0FBQzs7Ozs7SUFFTyxxQkFBcUI7O2NBQ25CLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUc7Ozs7UUFBQyxPQUFPLENBQUMsRUFBRTs7Z0JBQ3BDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUM7WUFDdEQsSUFBSSxDQUFDLGdCQUFnQjtnQkFBRSxPQUFPO1lBRTlCLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQyxJQUFJLENBQ3ZELEdBQUc7Ozs7WUFBQyxTQUFTLENBQUMsRUFBRSxDQUFDLGdCQUFnQixHQUFHLFNBQVMsRUFBQyxFQUM5QyxHQUFHOzs7O1lBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxFQUFDLENBQ3pELENBQUM7UUFDTixDQUFDLEVBQUM7O2NBRUksVUFBVSxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUM7O2NBQzlCLGFBQWEsR0FBRyxtQkFBNEIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU07Ozs7O1FBQUMsQ0FBQyxRQUFvQyxFQUFFLFFBQTJCLEVBQUUsRUFBRTs7a0JBQzNJLFVBQVUsR0FBRyxRQUFRLENBQUMscUJBQXFCLEVBQUU7WUFDbkQsT0FBTyxLQUFLLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ3ZDLENBQUMsR0FBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBQTtRQUVWLE9BQU8sUUFBUSxDQUFDLFVBQVUsRUFBRSxhQUFhLENBQUMsQ0FBQyxJQUFJLENBQzNDLGNBQWMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUN4QixHQUFHOzs7O1FBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsRUFDeEMsR0FBRzs7OztRQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTTs7OztRQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFDLENBQUMsRUFBQyxDQUMxRCxDQUFDO0lBQ04sQ0FBQzs7Ozs7O0lBRU8saUJBQWlCLENBQUMsT0FBZ0I7O2NBQ2hDLHFCQUFxQixHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsa0JBQWtCLENBQUMsYUFBYSxDQUFDO1FBQ2xGLElBQUksQ0FBQyxxQkFBcUI7WUFBRSxPQUFPLElBQUksQ0FBQzs7Y0FFbEMsWUFBWSxHQUFHLHFCQUFxQixDQUFDLEtBQUs7UUFDaEQsSUFBSSxDQUFDLFlBQVk7WUFBRSxPQUFPLElBQUksQ0FBQztRQUMvQixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUk7Ozs7UUFBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEtBQUssWUFBWSxFQUFDLENBQUM7SUFDdkYsQ0FBQzs7Ozs7OztJQUVPLG9CQUFvQixDQUFDLFlBQWlCLEVBQUUsR0FBVzs7Y0FDakQsUUFBUSxHQUFHLG1CQUFXLEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxFQUFBO1FBQzdELE9BQU8sUUFBUTthQUNWLE1BQU07Ozs7UUFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsa0JBQWtCLENBQUMscUJBQXFCLENBQUMsRUFBQzthQUNuRSxJQUFJOzs7O1FBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLGtCQUFrQixDQUFDLHFCQUFxQixDQUFDLENBQUMsS0FBSyxLQUFLLEdBQUcsRUFBQyxDQUFDO0lBQ3pGLENBQUM7Ozs7OztJQUVPLHFCQUFxQixDQUFDLE9BQWdCOztjQUNwQyxtQkFBbUIsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLGtCQUFrQixDQUFDLGlCQUFpQixDQUFDO1FBQ3BGLElBQUksQ0FBQyxtQkFBbUI7WUFBRSxPQUFPLElBQUksQ0FBQzs7Y0FFaEMsVUFBVSxHQUFHLG1CQUFtQixDQUFDLEtBQUs7UUFDNUMsSUFBSSxDQUFDLFVBQVU7WUFBRSxPQUFPLElBQUksQ0FBQztRQUM3QixPQUFPLFVBQVUsQ0FBQztJQUN0QixDQUFDOzs7Ozs7SUFFTyxnQkFBZ0IsQ0FBQyxPQUFnQjtRQUNyQyxJQUFJLE9BQU8sQ0FBQyxhQUFhLElBQUksT0FBTyxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUU7O2tCQUNuRCxRQUFRLEdBQUcsbUJBQVcsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxFQUFBOztnQkFDbEUsTUFBTSxHQUFHLFFBQVEsQ0FBQyxNQUFNOzs7O1lBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxFQUFDLENBQUMsSUFBSTs7OztZQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFDO1lBQzVHLE9BQU8sTUFBTSxDQUFDO1NBQ2pCO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQzs7Ozs7SUFFTyxnQkFBZ0I7O2NBQ2QsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsTUFBTTs7OztRQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFDOztjQUNsRSxrQkFBa0IsR0FBRyxpQkFBaUIsQ0FBQyxNQUFNOzs7OztRQUFDLENBQUMsUUFBbUIsRUFBRSxPQUF5QixFQUFFLEVBQUU7O2dCQUMvRixLQUFLLEdBQUcsS0FBSyxJQUFJLENBQUMsYUFBYSxLQUFLLE9BQU8sQ0FBQyxjQUFjLElBQUk7WUFDbEUsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRTtnQkFDdEIsS0FBSyxJQUFJLFdBQVcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLElBQUksQ0FBQzthQUNoRDs7a0JBQ0ssUUFBUSxHQUFHLG1CQUFXLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUE7WUFDcEcsUUFBUSxDQUFDLE9BQU87Ozs7WUFBQyxPQUFPLENBQUMsRUFBRTs7c0JBQ2pCLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRTtnQkFDaEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLGtCQUFrQixDQUFDLGFBQWEsRUFBRSxZQUFZLENBQUMsQ0FBQztnQkFDcEYsT0FBTyxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7WUFDeEMsQ0FBQyxFQUFDLENBQUM7WUFDSCxPQUFPLFFBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDckMsQ0FBQyxHQUFFLEVBQUUsQ0FBQzs7WUFFRix1QkFBdUIsR0FBRyxFQUFFOztZQUM1QixlQUFlLEdBQUcsRUFBRTtRQUN4QixJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxNQUFNOzs7O1FBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUMsQ0FBQztRQUN4RSxJQUFJLENBQUMsd0JBQXdCLENBQUMsT0FBTzs7OztRQUFDLENBQUMsT0FBeUIsRUFBRSxFQUFFOztnQkFDNUQsS0FBSyxHQUFHLEtBQUssSUFBSSxDQUFDLGFBQWEsS0FBSyxPQUFPLENBQUMsY0FBYyxJQUFJO1lBQ2xFLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUU7Z0JBQ3RCLEtBQUssSUFBSSxXQUFXLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxJQUFJLENBQUM7YUFDaEQ7O2tCQUNLLFFBQVEsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7a0JBQ25GLGFBQWEsR0FBRyxRQUFRLENBQUMsR0FBRzs7Ozs7WUFBQyxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsRUFBRTs7c0JBQzVDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRTtnQkFDaEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLGtCQUFrQixDQUFDLGFBQWEsRUFBRSxZQUFZLENBQUMsQ0FBQztnQkFDcEYsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLGtCQUFrQixDQUFDLGlCQUFpQixFQUFFLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO2dCQUM1Rix5QkFDTyxPQUFPLElBQ1YsWUFBWSxFQUFFLFlBQVksRUFDMUIsYUFBYSxFQUFFLE9BQU8sQ0FBQyxhQUFhO3dCQUNoQyxDQUFDOzs7O3dCQUFDLENBQUMsT0FBWSxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUM7d0JBQ3pELENBQUM7Ozt3QkFBQyxHQUFHLEVBQUUsR0FBRyxPQUFPLENBQUMsbUJBQUssT0FBTyxFQUFBLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUEsSUFDOUM7WUFDTixDQUFDLEVBQUM7WUFDRixlQUFlLENBQUMsSUFBSSxDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUM7WUFDbEMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLEdBQUcsYUFBYSxDQUFDLENBQUM7UUFDbkQsQ0FBQyxFQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sR0FBRyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUMzRSxJQUFJLENBQUMsUUFBUSxHQUFHLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUUzRCxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDZixJQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQztZQUN2QixJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU87Ozs7WUFBQyxDQUFDLE9BQU8sRUFBRSxFQUFFOztzQkFDeEIsT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFOztvQkFDdkMsYUFBYSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUM7Z0JBQ25ELElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksV0FBVyxDQUFDO29CQUNuQyxFQUFFLEVBQUUsYUFBYSxDQUFDLFlBQVk7b0JBQzlCLEtBQUssRUFBRSxhQUFhLENBQUMsY0FBYztvQkFDbkMsUUFBUSxFQUFFLGFBQWEsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUk7aUJBQ3RGLENBQUMsQ0FBQyxDQUFDO1lBQ1IsQ0FBQyxFQUFDLENBQUM7U0FDTjtJQUNMLENBQUM7Ozs7O0lBRU8sY0FBYztRQUNsQixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU07Ozs7UUFBQyxPQUFPLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFDLENBQUMsT0FBTzs7OztRQUFDLENBQUMsT0FBWSxFQUFFLEVBQUU7WUFDN0YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRTtnQkFDM0IsT0FBTyxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxVQUFVOzs7Z0JBQUUsR0FBRyxFQUFFO29CQUN0RSxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUNsQyxDQUFDLEVBQUMsQ0FBQztnQkFDSCxPQUFPLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLFFBQVE7Ozs7Z0JBQUUsQ0FBQyxNQUFNLEVBQUUsRUFBRTs7MEJBQ3BFLE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRTs7d0JBQ3ZDLGFBQWEsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDOzt3QkFDL0MsS0FBSyxHQUFHLGFBQWEsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUk7b0JBQ3JGLElBQUksYUFBYSxJQUFJLGFBQWEsQ0FBQyxVQUFVLEVBQUU7OzRCQUN2QyxXQUFXLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJOzs7O3dCQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxhQUFhLENBQUMsWUFBWSxFQUFDO3dCQUNqRixJQUFJLENBQUMsV0FBVyxFQUFFOzRCQUNkLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksV0FBVyxDQUFDO2dDQUNuQyxFQUFFLEVBQUUsYUFBYSxDQUFDLFlBQVk7Z0NBQzlCLEtBQUssRUFBRSxhQUFhLENBQUMsY0FBYztnQ0FDbkMsS0FBSyxFQUFFLEtBQUs7Z0NBQ1osTUFBTSxFQUFFLElBQUk7NkJBQ2YsQ0FBQyxDQUFDLENBQUM7eUJBQ1A7NkJBQU07NEJBQ0gsV0FBVyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7NEJBQzFCLElBQUksV0FBVyxDQUFDLFFBQVEsSUFBSSxTQUFTLElBQUksV0FBVyxDQUFDLFFBQVEsSUFBSSxFQUFFLEVBQUU7Z0NBQ2pFLElBQUksS0FBSyxJQUFJLFNBQVMsSUFBSSxLQUFLLElBQUksRUFBRSxFQUFFO29DQUNuQyxXQUFXLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztpQ0FDOUI7cUNBQU07b0NBQ0gsV0FBVyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7aUNBQzdCOzZCQUNKO2lDQUFNO2dDQUNILElBQUksS0FBSyxJQUFJLFNBQVMsSUFBSSxLQUFLLElBQUksRUFBRSxFQUFFO29DQUNuQyxXQUFXLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztpQ0FDN0I7cUNBQU07b0NBQ0gsSUFBSSxXQUFXLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLEVBQUU7d0NBQ2pFLFdBQVcsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO3FDQUU3Qjt5Q0FBTTt3Q0FDSCxXQUFXLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztxQ0FDOUI7aUNBQ0o7NkJBQ0o7eUJBQ0o7cUJBQ0o7b0JBQ0QsSUFBSSxhQUFhLElBQUksYUFBYSxDQUFDLEtBQUssRUFBRTt3QkFDdEMsYUFBYSxDQUFDLEtBQUssQ0FBQyxPQUFPOzs7O3dCQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7NEJBQ2pDLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO3dCQUN6QixDQUFDLEVBQUMsQ0FBQztxQkFDTjtnQkFDTCxDQUFDLEVBQUMsQ0FBQzthQUNOO1FBQ0wsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDOzs7Ozs7SUFFTyxlQUFlLENBQUMsT0FBWTs7WUFDNUIsYUFBYSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUM7UUFDbkQsSUFBSSxDQUFDLGFBQWE7WUFBRSxNQUFNLElBQUksS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFFdEQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsYUFBYSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVM7Ozs7UUFBQyxTQUFTLENBQUMsRUFBRTtZQUM3RSxhQUFhLEdBQUcsU0FBUyxDQUFDO1lBQzFCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFDbkQsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDOzs7Ozs7O0lBRU8saUJBQWlCLENBQUMsT0FBWSxFQUFFLE1BQXdCOztZQUN4RCxhQUFhLEdBQWEsRUFBRTtRQUNoQyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU87Ozs7UUFBQyxNQUFNLENBQUMsRUFBRTtZQUMxQixJQUFJLE1BQU0sQ0FBQyxPQUFPLEVBQUU7Z0JBQ2hCLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7YUFDL0M7aUJBQU07O3NCQUNHLFlBQVksR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDO2dCQUNsRSxhQUFhLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO2FBQ3BDO1FBQ0wsQ0FBQyxFQUFDLENBQUM7O2NBRUcsY0FBYyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTTs7OztRQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFDO1FBQzNELElBQUksY0FBYyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDN0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1lBQzdELElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUMvRCxPQUFPLElBQUksQ0FBQztTQUNmO1FBRUQsT0FBTztZQUNILE9BQU8sRUFBRSxPQUFPO1lBQ2hCLFFBQVEsRUFBRSxhQUFhO1NBQzFCLENBQUE7SUFDTCxDQUFDOzs7Ozs7SUFFTyxtQkFBbUIsQ0FBQyxTQUE4Qjs7WUFDbEQsWUFBWSxHQUFHLFNBQVMsQ0FBQyxNQUFNOzs7O1FBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBQztRQUM5RSxZQUFZLENBQUMsT0FBTzs7OztRQUFDLFFBQVEsQ0FBQyxFQUFFLENBQzVCLFFBQVEsQ0FBQyxTQUFTLENBQUMsU0FBUzs7O1FBQUMsR0FBRyxFQUFFO1lBQzlCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTTs7O1lBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQztRQUM1RyxDQUFDLEVBQUMsRUFBQyxDQUFDO1FBQ1IsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxHQUFHLFlBQVksQ0FBQyxDQUFDO0lBQ2hELENBQUM7OztZQWxlSixVQUFVLFNBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFOzs7O1lBVEYsZ0JBQWdCO1lBS3ZDLGtCQUFrQjtZQURsQixXQUFXO1lBRVgsYUFBYTtZQUNiLGlCQUFpQjs7O3dCQUlyQixNQUFNOzs7OztJQUFQLHNDQUFvRTs7Ozs7SUFDcEUscUNBQWlDOzs7OztJQUNqQyxzQ0FBbUM7Ozs7O0lBQ25DLHFDQUFnRTs7Ozs7SUFDaEUsbUNBQStEOzs7OztJQUMvRCwwQ0FBaUU7Ozs7O0lBQ2pFLHFDQUE0Qjs7Ozs7SUFDNUIsNkNBQW1EOzs7OztJQUNuRCwwQ0FBeUQ7Ozs7O0lBQ3pELHFEQUEwRDs7Ozs7SUFDMUQseUNBQXlDOzs7OztJQUN6QyxnQ0FBb0I7Ozs7O0lBR2hCLDRDQUEyQzs7Ozs7SUFDM0MsK0NBQWdEOzs7OztJQUNoRCx5Q0FBaUM7Ozs7O0lBQ2pDLDJDQUFxQzs7Ozs7SUFDckMsK0NBQTZDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVuZGVyZXIyLCBJbmplY3RhYmxlLCBSZW5kZXJlckZhY3RvcnkyLCBFdmVudEVtaXR0ZXIsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBWYWxpZGF0aW9uT3B0aW9uLCBDbGllbnRWYWxpZGF0b3IsIFZhbGlkYXRpb25Db25zdGFudCwgU3VtbWFyeUVycm9yLCBWYWxpZGF0aW9uUnVsZSwgQ2hhbmdlZEl0ZW0gfSBmcm9tICcuL3ZhbGlkYXRpb24ubW9kZWwnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24sIE9ic2VydmFibGUsIGZvcmtKb2luLCBtZXJnZSwgb2YgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgbWFwLCBkZWZhdWx0SWZFbXB0eSwgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgRGF0YVNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9kYXRhLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBWYWxpZGF0aW9uUHJvdmlkZXIgfSBmcm9tICcuL3ZhbGlkYXRpb24ucHJvdmlkZXInO1xyXG5pbXBvcnQgeyBBY3Rpb25TZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvYWN0aW9uLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBBZ2dyZWdhdG9yU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2FnZ3JlZ2F0b3Iuc2VydmljZSc7XHJcblxyXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxyXG5leHBvcnQgY2xhc3MgVmFsaWRhdGlvblNlcnZpY2Uge1xyXG4gICAgQE91dHB1dCgpIHB1YmxpYyBvbkRlc3Ryb3k6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIHByaXZhdGUgZWxlbWVudHM6IEVsZW1lbnRbXSA9IFtdO1xyXG4gICAgcHJpdmF0ZSB2YWxpZGF0b3I6IENsaWVudFZhbGlkYXRvcjtcclxuICAgIHByaXZhdGUgZXJyQ2xhc3M6IHN0cmluZyA9IFZhbGlkYXRpb25Db25zdGFudC5EZWZhdWx0RXJyb3JDbGFzcztcclxuICAgIHByaXZhdGUgc3R5bGVzOiBzdHJpbmcgPSBWYWxpZGF0aW9uQ29uc3RhbnQuRGVmYXVsdEVycm9yU3R5bGVzO1xyXG4gICAgcHJpdmF0ZSBhdHRyaWJ1dGVOYW1lOiBzdHJpbmcgPSBWYWxpZGF0aW9uQ29uc3RhbnQuQXR0cmlidXRlTmFtZTtcclxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMjtcclxuICAgIHByaXZhdGUgcmVsYXRlZFByb3ZpZGVyczogVmFsaWRhdGlvblNlcnZpY2VbXSA9IFtdO1xyXG4gICAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKCk7XHJcbiAgICBwcml2YXRlIHZpcnR1YWxWYWxpZGF0aW9uT3B0aW9uczogVmFsaWRhdGlvbk9wdGlvbltdID0gW107XHJcbiAgICBwcml2YXRlIGNoYW5nZWRJdGVtczogQ2hhbmdlZEl0ZW1bXSA9IFtdO1xyXG4gICAgcHJpdmF0ZSBrZXk6IHN0cmluZztcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcm90ZWN0ZWQgcmVuZGVyZXJGYWN0b3J5OiBSZW5kZXJlckZhY3RvcnkyLFxyXG4gICAgICAgIHByb3RlY3RlZCB2YWxpZGF0aW9uUHJvdmlkZXI6IFZhbGlkYXRpb25Qcm92aWRlcixcclxuICAgICAgICBwcml2YXRlIF9kYXRhU2VydmljZTogRGF0YVNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBfYWN0aW9uU2VydmljZTogQWN0aW9uU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIF9hZ2dyZWdhdG9yU2VydmljZTogQWdncmVnYXRvclNlcnZpY2VcclxuICAgICkge1xyXG4gICAgICAgIHRoaXMucmVuZGVyZXIgPSByZW5kZXJlckZhY3RvcnkuY3JlYXRlUmVuZGVyZXIobnVsbCwgbnVsbCk7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLnVuc3Vic2NyaWJlKCk7XHJcbiAgICAgICAgdGhpcy5vbkRlc3Ryb3kuZW1pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpbml0KG1vZGVsOiB7IHZhbGlkYXRvcjogQ2xpZW50VmFsaWRhdG9yIH0pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnZhbGlkYXRvciA9IG1vZGVsLnZhbGlkYXRvcjtcclxuICAgICAgICBpZiAoIXRoaXMudmFsaWRhdG9yLnBheWxvYWRSZWYpIHRoaXMudmFsaWRhdG9yLnBheWxvYWRSZWYgPSAoKSA9PiB7IHJldHVybiB7fSB9O1xyXG5cclxuICAgICAgICBpZiAodGhpcy52YWxpZGF0b3IucmVsYXRlZFZhbGlkYXRpb25Qcm92aWRlcnMpIHtcclxuICAgICAgICAgICAgdGhpcy5hZGRSZWxhdGVkUHJvdmlkZXJzKHRoaXMudmFsaWRhdG9yLnJlbGF0ZWRWYWxpZGF0aW9uUHJvdmlkZXJzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMudmFsaWRhdG9yLm9wdGlvbnMuZm9yRWFjaChvcHRpb24gPT4ge1xyXG4gICAgICAgICAgICBpZiAoIW9wdGlvbi5kaXNwbGF5VGV4dCkgb3B0aW9uLmRpc3BsYXlUZXh0ID0gb3B0aW9uLnZhbGlkYXRpb25OYW1lO1xyXG4gICAgICAgICAgICBpZiAoIW9wdGlvbi5wYXlsb2FkUmVmKSBvcHRpb24ucGF5bG9hZFJlZiA9IHRoaXMudmFsaWRhdG9yLnBheWxvYWRSZWY7XHJcbiAgICAgICAgICAgIG9wdGlvbi5ydWxlcy5mb3JFYWNoKGFjdGlvbiA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWFjdGlvbi5pZCkgYWN0aW9uLmlkID0gdGhpcy5fZGF0YVNlcnZpY2UubmV3R3VpZCgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFhY3Rpb24uZXJyb3JNZXNzYWdlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChhY3Rpb24ua2V5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgVmFsaWRhdGlvbkNvbnN0YW50LlJlcXVpcmVkOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb24uZXJyb3JNZXNzYWdlID0gKGVsZW1lbnQ6IEVsZW1lbnQsIHJvd0luZGV4OiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkaXNwbGF5aW5nUm93SW5kZXggPSAoK3Jvd0luZGV4ICsgMSkudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYCR7b3B0aW9uLmRpc3BsYXlUZXh0fSR7b3B0aW9uLmR5bmFtaWMgPyAnIFsnICsgZGlzcGxheWluZ1Jvd0luZGV4ICsgJ10nIDogJyd9ICR7dGhpcy52YWxpZGF0b3IucmVxdWlyZWRNZXNzYWdlfWA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uLmVycm9yTWVzc2FnZSA9ICgpID0+IGAke29wdGlvbi5kaXNwbGF5VGV4dH0gJHt0aGlzLnZhbGlkYXRvci5pbnZhbGlkTWVzc2FnZX1gO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMudmlydHVhbFZhbGlkYXRpb25PcHRpb25zID0gdGhpcy52YWxpZGF0b3Iub3B0aW9ucy5maWx0ZXIoeCA9PiB4LmR5bmFtaWMpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlQXN5bmMoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0S2V5KGtleTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmtleSkgdGhpcy5rZXkgPSBrZXk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZUFzeW5jKHJlbGF0ZWRQcm92aWRlcnNUb1JlZ2lzdGVyPzogVmFsaWRhdGlvblNlcnZpY2VbXSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2FjdGlvblNlcnZpY2UuZXhlY3V0ZUFzeW5jKCgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHJlbGF0ZWRQcm92aWRlcnNUb1JlZ2lzdGVyICYmIHJlbGF0ZWRQcm92aWRlcnNUb1JlZ2lzdGVyLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRSZWxhdGVkUHJvdmlkZXJzKHJlbGF0ZWRQcm92aWRlcnNUb1JlZ2lzdGVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnJlZ2lzdGVyRWxlbWVudHMoKTtcclxuICAgICAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50cygpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBleGVjdXRlQXN5bmModmFsaWRDYWxsYmFjazogKGVycm9ycz86IFN1bW1hcnlFcnJvcltdKSA9PiBhbnksIGludmFsaWRDYWxsYmFjaz86IChlcnJvcnM/OiBTdW1tYXJ5RXJyb3JbXSkgPT4gYW55KTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XHJcbiAgICAgICAgdGhpcy5yZXRyaWV2ZVN1bW1hcnlFcnJvcnMoKS5zdWJzY3JpYmUoKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2UubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgICAgIGlmICh2YWxpZENhbGxiYWNrKSB2YWxpZENhbGxiYWNrKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBvZih0cnVlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmIChpbnZhbGlkQ2FsbGJhY2spIGludmFsaWRDYWxsYmFjayhyZXNwb25zZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gb2YodHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGlzVmFsaWQoc2hvdzogYm9vbGVhbiA9IHRydWUsIGZvY3VzOiBib29sZWFuID0gdHJ1ZSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmIChzaG93KSB7XHJcbiAgICAgICAgICAgIHRoaXMucmV0cmlldmVTdW1tYXJ5RXJyb3JzKCkuc3Vic2NyaWJlKChlcnJvcnM6IFN1bW1hcnlFcnJvcltdKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9hZ2dyZWdhdG9yU2VydmljZS5wdWJsaXNoKHRoaXMua2V5LCBlcnJvcnMpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGZvY3VzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9ycyAmJiBlcnJvcnMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZm9jdXNFbGVtZW50ID0gZXJyb3JzWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZWwgPSA8YW55PmZvY3VzRWxlbWVudC5lbGVtZW50O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2FjdGlvblNlcnZpY2UuZXhlY3V0ZUFzeW5jKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbC5mb2N1cygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHZhbGlkID0gdHJ1ZTtcclxuICAgICAgICBpZiAodGhpcy52YWxpZGF0b3Iub3B0aW9ucykge1xyXG4gICAgICAgICAgICB0aGlzLnZhbGlkYXRvci5vcHRpb25zLmZvckVhY2goKG9wdGlvbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcGF5bG9hZCA9IHRoaXMudmFsaWRhdG9yLnBheWxvYWRSZWYoKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGZpZWxkVmFsdWUgPSBvcHRpb24udmFsdWVSZXNvbHZlciA/IG9wdGlvbi52YWx1ZVJlc29sdmVyKHBheWxvYWQpIDogbnVsbDtcclxuICAgICAgICAgICAgICAgIGlmIChvcHRpb24ucnVsZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBvcHRpb24ucnVsZXMuZm9yRWFjaCgoYWN0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhY3Rpb24uaXNWYWxpZCAhPSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYWN0aW9uLmlzVmFsaWQgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmllbGRWYWx1ZSkgdmFsaWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHZhbGlkO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBoYW5kbGVFcnJvcnMoY2FsbGJhY2s/OiAocmVzcG9uc2U6IFN1bW1hcnlFcnJvcltdKSA9PiB2b2lkKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5yZXRyaWV2ZVN1bW1hcnlFcnJvcnMoKS5zdWJzY3JpYmUoKHJlcykgPT4ge1xyXG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrKHJlcyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNvbW1pdChjYWxsYmFjaz86IEZ1bmN0aW9uKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmV0cmlldmVTdW1tYXJ5RXJyb3JzKCkucGlwZShcclxuICAgICAgICAgICAgbWFwKGVycm9ycyA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrKGVycm9ycyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3JzLmxlbmd0aCA9PSAwKSByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfSksIHRha2UoMSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRFbGVtZW50RXJyb3IoZWxlbWVudDogRWxlbWVudCwgYWN0aW9uOiBWYWxpZGF0aW9uUnVsZSwgb3B0aW9uOiBWYWxpZGF0aW9uT3B0aW9uKTogc3RyaW5nIHtcclxuICAgICAgICBpZiAoIWVsZW1lbnQpIHJldHVybjtcclxuICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKGVsZW1lbnQsIFZhbGlkYXRpb25Db25zdGFudC5TdWNjZXNzRWxlbWVudENsYXNzKTtcclxuICAgICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGVsZW1lbnQsIG9wdGlvbi5lcnJvckVsZW1lbnRDbGFzcyk7XHJcbiAgICAgICAgbGV0IGVycm9yRWxlbWVudCA9IHRoaXMuZmluZEVycm9yRWxlbWVudChlbGVtZW50KTtcclxuICAgICAgICBpZiAoIWVycm9yRWxlbWVudCkge1xyXG4gICAgICAgICAgICBlcnJvckVsZW1lbnQgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKGVycm9yRWxlbWVudCwgVmFsaWRhdGlvbkNvbnN0YW50LkVSUk9SX0VMRU1FTlRfSUQsIGAke3RoaXMuX2RhdGFTZXJ2aWNlLm5ld0d1aWQoKX1gKTtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUoZXJyb3JFbGVtZW50LCAnc3R5bGUnLCB0aGlzLnN0eWxlcyk7XHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoZXJyb3JFbGVtZW50LCB0aGlzLmVyckNsYXNzKTtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhlcnJvckVsZW1lbnQsIG9wdGlvbi5lcnJvck1lc3NhZ2VDbGFzcyk7XHJcbiAgICAgICAgICAgIGNvbnN0IHBhcmVudEVsZW1lbnQgPSB0aGlzLnJlbmRlcmVyLnBhcmVudE5vZGUoZWxlbWVudCk7XHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQocGFyZW50RWxlbWVudCwgZXJyb3JFbGVtZW50KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGVycm9ySXRlbUVsZW1lbnRLZXk6IHN0cmluZyA9IGAke2FjdGlvbi5pZH1gO1xyXG4gICAgICAgIGxldCBlcnJvckl0ZW1FbGVtZW50ID0gdGhpcy5maW5kRXJyb3JJdGVtRWxlbWVudChlcnJvckVsZW1lbnQsIGVycm9ySXRlbUVsZW1lbnRLZXkpO1xyXG4gICAgICAgIGNvbnN0IGR5bmFtaWNTZXF1ZW5jZUlkID0gdGhpcy5maW5kRHluYW1pY1NlcXVlbmNlSWQoZWxlbWVudCk7XHJcbiAgICAgICAgY29uc3QgZXJyb3JNZXNzYWdlID0gYWN0aW9uLmVycm9yTWVzc2FnZShlbGVtZW50LCBkeW5hbWljU2VxdWVuY2VJZCk7XHJcblxyXG4gICAgICAgIGlmICghZXJyb3JJdGVtRWxlbWVudCkge1xyXG4gICAgICAgICAgICBlcnJvckl0ZW1FbGVtZW50ID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdsaScpO1xyXG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZShlcnJvckl0ZW1FbGVtZW50LCBWYWxpZGF0aW9uQ29uc3RhbnQuRVJST1JfSVRFTV9FTEVNRU5UX0lELCBlcnJvckl0ZW1FbGVtZW50S2V5KTtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChlcnJvckl0ZW1FbGVtZW50LCB0aGlzLnJlbmRlcmVyLmNyZWF0ZVRleHQoZXJyb3JNZXNzYWdlKSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKGVycm9yRWxlbWVudCwgZXJyb3JJdGVtRWxlbWVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBlcnJvck1lc3NhZ2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsZWFyRXJyb3JJdGVtRWxlbWVudChlbGVtZW50OiBhbnksIGFjdGlvbjogVmFsaWRhdGlvblJ1bGUpIHtcclxuICAgICAgICBsZXQgZXJyb3JFbGVtZW50ID0gdGhpcy5maW5kRXJyb3JFbGVtZW50KGVsZW1lbnQpO1xyXG4gICAgICAgIGlmICghZXJyb3JFbGVtZW50KSByZXR1cm47XHJcblxyXG4gICAgICAgIGNvbnN0IGVycm9ySXRlbUVsZW1lbnRLZXk6IHN0cmluZyA9IGAke2FjdGlvbi5pZH1gO1xyXG4gICAgICAgIGxldCBlcnJvckl0ZW1FbGVtZW50ID0gdGhpcy5maW5kRXJyb3JJdGVtRWxlbWVudChlcnJvckVsZW1lbnQsIGVycm9ySXRlbUVsZW1lbnRLZXkpO1xyXG4gICAgICAgIGlmICghZXJyb3JJdGVtRWxlbWVudCkgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2hpbGQoZXJyb3JFbGVtZW50LCBlcnJvckl0ZW1FbGVtZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaXNEaXJ0eShjYWxsYmFjaz86IChpdGVtczogQ2hhbmdlZEl0ZW1bXSkgPT4gdm9pZCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmICghdGhpcy5jaGFuZ2VkSXRlbXMgfHwgdGhpcy5jaGFuZ2VkSXRlbXMubGVuZ3RoID09IDApIHJldHVybiBmYWxzZTtcclxuICAgICAgICB2YXIgcmVzcG9uc2UgPSB0aGlzLmNoYW5nZWRJdGVtcy5maWx0ZXIocyA9PiBzLmNoYW5nZSk7XHJcbiAgICAgICAgaWYgKGNhbGxiYWNrKSBjYWxsYmFjayhyZXNwb25zZSk7XHJcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmxlbmd0aCA+IDA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHZhbGlkYXRlRWxlbWVudChlbGVtZW50OiBhbnksIG9wdGlvbjogVmFsaWRhdGlvbk9wdGlvbiwgYWxsOiBib29sZWFuID0gZmFsc2UpOiBPYnNlcnZhYmxlPFZhbGlkYXRpb25PcHRpb24+IHtcclxuICAgICAgICBjb25zdCBwYXlsb2FkID0gdGhpcy52YWxpZGF0b3IucGF5bG9hZFJlZigpO1xyXG4gICAgICAgIGNvbnN0IGZpZWxkVmFsdWUgPSBvcHRpb24udmFsdWVSZXNvbHZlciA/IG9wdGlvbi52YWx1ZVJlc29sdmVyKHBheWxvYWQpIDogbnVsbDtcclxuICAgICAgICBjb25zdCB2YWxpZGF0ZWRBY3Rpb25zJCA9IG9wdGlvbi5ydWxlcy5tYXAoYWN0aW9uID0+IHtcclxuICAgICAgICAgICAgc3dpdGNoIChhY3Rpb24ua2V5KSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFZhbGlkYXRpb25Db25zdGFudC5SZXF1aXJlZDoge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRpb25Qcm92aWRlci5yZXF1aXJlZChmaWVsZFZhbHVlKS5waXBlKG1hcChpc1ZhbGlkID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uLmlzVmFsaWQgPSBpc1ZhbGlkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWN0aW9uO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNhc2UgVmFsaWRhdGlvbkNvbnN0YW50LkVtYWlsOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudmFsaWRhdGlvblByb3ZpZGVyLmVtYWlsKGZpZWxkVmFsdWUpLnBpcGUobWFwKGlzVmFsaWQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb24uaXNWYWxpZCA9IGlzVmFsaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhY3Rpb247XHJcbiAgICAgICAgICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2FzZSBWYWxpZGF0aW9uQ29uc3RhbnQuUGhvbmU6IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy52YWxpZGF0aW9uUHJvdmlkZXIucGhvbmUoZmllbGRWYWx1ZSkucGlwZShtYXAoaXNWYWxpZCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbi5pc1ZhbGlkID0gaXNWYWxpZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFjdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjYXNlIFZhbGlkYXRpb25Db25zdGFudC5DdXN0b206IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWFjdGlvbi5leGVjdXRlKSB0aHJvdyBuZXcgRXJyb3IoJyFhY3Rpb24uZXhlY3V0ZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghYWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZmllbGRWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uLmlzVmFsaWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9mKGFjdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVxdWlyZWRSdWxlID0gb3B0aW9uLnJ1bGVzLmZpbmQocyA9PiBzLmtleSA9PSBWYWxpZGF0aW9uQ29uc3RhbnQuUmVxdWlyZWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcXVpcmVkUnVsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVpcmVkUnVsZS5pc1ZhbGlkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzZXF1ZW5jZUlkID0gdGhpcy5maW5kRHluYW1pY1NlcXVlbmNlSWQoZWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFjdGlvbi5leGVjdXRlKGZpZWxkVmFsdWUsIHBheWxvYWQsICtzZXF1ZW5jZUlkKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucGlwZShtYXAocmVzcG9uc2UgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uLmlzVmFsaWQgPSByZXNwb25zZS5zdGF0dXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLm1lc3NhZ2UpIGFjdGlvbi5lcnJvck1lc3NhZ2UgPSAoKSA9PiB7IHJldHVybiByZXNwb25zZS5tZXNzYWdlOyB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFjdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDogdGhyb3cgbmV3IEVycm9yKGBVbmhhbmRsZWQgYWN0aW9uOiAke2FjdGlvbi5rZXl9YCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGZvcmtKb2luKHZhbGlkYXRlZEFjdGlvbnMkKS5waXBlKFxyXG4gICAgICAgICAgICB0YWtlKDEpLFxyXG4gICAgICAgICAgICBtYXAodmFsaWRhdGVkQWN0aW9ucyA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAob3B0aW9uLnJlbGV2YW50RmllbGRzKSB0aGlzLnZhbGlkYXRlUmVsZXZhbnRGaWVsZHMob3B0aW9uLnJlbGV2YW50RmllbGRzKHBheWxvYWQpKTtcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5ydWxlcyA9IHZhbGlkYXRlZEFjdGlvbnM7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb3B0aW9uO1xyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdmFsaWRhdGVSZWxldmFudEZpZWxkcyhyZWxldmFudEZpZWxkcz86IHN0cmluZ1tdKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCFyZWxldmFudEZpZWxkcyB8fCByZWxldmFudEZpZWxkcy5sZW5ndGggPT0gMCkgcmV0dXJuO1xyXG4gICAgICAgIGlmIChyZWxldmFudEZpZWxkcyAmJiByZWxldmFudEZpZWxkcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHJlbGV2YW50RmllbGRzLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgYXR0cmlidXRlcyA9IHRoaXMuZWxlbWVudHNbaV0uYXR0cmlidXRlcztcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYXR0cmlidXRlcyAmJiBhdHRyaWJ1dGVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGF0dHJpYnV0ZXNbdGhpcy5hdHRyaWJ1dGVOYW1lXS52YWx1ZSA9PSBpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgb3B0aW9uID0gdGhpcy5maW5kRWxlbWVudE9wdGlvbih0aGlzLmVsZW1lbnRzW2ldKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnZhbGlkYXRlRWxlbWVudCh0aGlzLmVsZW1lbnRzW2ldLCBvcHRpb24sIHRydWUpLnBpcGUoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcChuZXdPcHRpb24gPT4gb3B0aW9uID0gbmV3T3B0aW9uKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFwKG9wdGlvbiA9PiB0aGlzLnN5bmNFcnJvck1lc3NhZ2VzKHRoaXMuZWxlbWVudHNbaV0sIG9wdGlvbikpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkuc3Vic2NyaWJlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmV0cmlldmVTdW1tYXJ5RXJyb3JzKCk6IE9ic2VydmFibGU8U3VtbWFyeUVycm9yW10+IHtcclxuICAgICAgICBjb25zdCBlcnJvcnMkID0gdGhpcy5lbGVtZW50cy5tYXAoZWxlbWVudCA9PiB7XHJcbiAgICAgICAgICAgIGxldCB2YWxpZGF0aW9uT3B0aW9uID0gdGhpcy5maW5kRWxlbWVudE9wdGlvbihlbGVtZW50KTtcclxuICAgICAgICAgICAgaWYgKCF2YWxpZGF0aW9uT3B0aW9uKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy52YWxpZGF0ZUVsZW1lbnQoZWxlbWVudCwgdmFsaWRhdGlvbk9wdGlvbikucGlwZShcclxuICAgICAgICAgICAgICAgIG1hcChuZXdPcHRpb24gPT4gdmFsaWRhdGlvbk9wdGlvbiA9IG5ld09wdGlvbiksXHJcbiAgICAgICAgICAgICAgICBtYXAob3B0aW9uID0+IHRoaXMuc3luY0Vycm9yTWVzc2FnZXMoZWxlbWVudCwgb3B0aW9uKSksXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGVycm9yQmF0Y2ggPSBmb3JrSm9pbihlcnJvcnMkKTtcclxuICAgICAgICBjb25zdCByZWxhdGVkRXJyb3JzID0gPE9ic2VydmFibGU8U3VtbWFyeUVycm9yW10+PnRoaXMucmVsYXRlZFByb3ZpZGVycy5yZWR1Y2UoKHByZXZpb3VzOiBPYnNlcnZhYmxlPFN1bW1hcnlFcnJvcltdPiwgcHJvdmlkZXI6IFZhbGlkYXRpb25TZXJ2aWNlKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHN1YkVycm9ycyQgPSBwcm92aWRlci5yZXRyaWV2ZVN1bW1hcnlFcnJvcnMoKTtcclxuICAgICAgICAgICAgcmV0dXJuIG1lcmdlKHByZXZpb3VzLCBzdWJFcnJvcnMkKTtcclxuICAgICAgICB9LCBvZihbXSkpO1xyXG5cclxuICAgICAgICByZXR1cm4gZm9ya0pvaW4oZXJyb3JCYXRjaCwgcmVsYXRlZEVycm9ycykucGlwZShcclxuICAgICAgICAgICAgZGVmYXVsdElmRW1wdHkoW1tdLCBbXV0pLFxyXG4gICAgICAgICAgICBtYXAodmFsdWUgPT4gWy4uLnZhbHVlWzBdLCAuLi52YWx1ZVsxXV0pLFxyXG4gICAgICAgICAgICBtYXAocmVzdWx0ID0+IFtdLmNvbmNhdChyZXN1bHQuZmlsdGVyKGVycm9yID0+IGVycm9yKSkpLFxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBmaW5kRWxlbWVudE9wdGlvbihlbGVtZW50OiBFbGVtZW50KTogVmFsaWRhdGlvbk9wdGlvbiB8IG51bGwge1xyXG4gICAgICAgIGNvbnN0IHZhbGlkYXRpb25JZEF0dHJpYnV0ZSA9IGVsZW1lbnQuYXR0cmlidXRlc1tWYWxpZGF0aW9uQ29uc3RhbnQuVkFMSURBVElPTl9JRF07XHJcbiAgICAgICAgaWYgKCF2YWxpZGF0aW9uSWRBdHRyaWJ1dGUpIHJldHVybiBudWxsO1xyXG5cclxuICAgICAgICBjb25zdCB2YWxpZGF0aW9uSWQgPSB2YWxpZGF0aW9uSWRBdHRyaWJ1dGUudmFsdWU7XHJcbiAgICAgICAgaWYgKCF2YWxpZGF0aW9uSWQpIHJldHVybiBudWxsO1xyXG4gICAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRvci5vcHRpb25zLmZpbmQob3B0aW9uID0+IG9wdGlvbi52YWxpZGF0aW9uSWQgPT09IHZhbGlkYXRpb25JZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBmaW5kRXJyb3JJdGVtRWxlbWVudChlcnJvckVsZW1lbnQ6IGFueSwga2V5OiBzdHJpbmcpOiBhbnkgfCBudWxsIHtcclxuICAgICAgICBjb25zdCBjaGlsZHJlbiA9IDxFbGVtZW50W10+QXJyYXkuZnJvbShlcnJvckVsZW1lbnQuY2hpbGRyZW4pO1xyXG4gICAgICAgIHJldHVybiBjaGlsZHJlblxyXG4gICAgICAgICAgICAuZmlsdGVyKHggPT4geC5hdHRyaWJ1dGVzW1ZhbGlkYXRpb25Db25zdGFudC5FUlJPUl9JVEVNX0VMRU1FTlRfSURdKVxyXG4gICAgICAgICAgICAuZmluZCh4ID0+IHguYXR0cmlidXRlc1tWYWxpZGF0aW9uQ29uc3RhbnQuRVJST1JfSVRFTV9FTEVNRU5UX0lEXS52YWx1ZSA9PT0ga2V5KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGZpbmREeW5hbWljU2VxdWVuY2VJZChlbGVtZW50OiBFbGVtZW50KTogc3RyaW5nIHwgbnVsbCB7XHJcbiAgICAgICAgY29uc3Qgc2VxdWVuY2VJZEF0dHJpYnV0ZSA9IGVsZW1lbnQuYXR0cmlidXRlc1tWYWxpZGF0aW9uQ29uc3RhbnQuQVJSQVlfU0VRVUVOQ0VfSURdO1xyXG4gICAgICAgIGlmICghc2VxdWVuY2VJZEF0dHJpYnV0ZSkgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgICAgIGNvbnN0IHNlcXVlbmNlSWQgPSBzZXF1ZW5jZUlkQXR0cmlidXRlLnZhbHVlO1xyXG4gICAgICAgIGlmICghc2VxdWVuY2VJZCkgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgcmV0dXJuIHNlcXVlbmNlSWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBmaW5kRXJyb3JFbGVtZW50KGVsZW1lbnQ6IEVsZW1lbnQpOiBFbGVtZW50IHtcclxuICAgICAgICBpZiAoZWxlbWVudC5wYXJlbnRFbGVtZW50ICYmIGVsZW1lbnQucGFyZW50RWxlbWVudC5jaGlsZHJlbikge1xyXG4gICAgICAgICAgICBjb25zdCBzbGliaW5ncyA9IDxFbGVtZW50W10+QXJyYXkuZnJvbShlbGVtZW50LnBhcmVudEVsZW1lbnQuY2hpbGRyZW4pO1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gc2xpYmluZ3MuZmlsdGVyKHggPT4geC5hdHRyaWJ1dGVzKS5maW5kKHggPT4geC5hdHRyaWJ1dGVzW1ZhbGlkYXRpb25Db25zdGFudC5FUlJPUl9FTEVNRU5UX0lEXSk7XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVnaXN0ZXJFbGVtZW50cygpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBub25EeW5hbWljT3B0aW9ucyA9IHRoaXMudmFsaWRhdG9yLm9wdGlvbnMuZmlsdGVyKHggPT4gIXguZHluYW1pYyk7XHJcbiAgICAgICAgY29uc3Qgbm9uRHluYW1pY0VsZW1lbnRzID0gbm9uRHluYW1pY09wdGlvbnMucmVkdWNlKChwcmV2aW91czogRWxlbWVudFtdLCBjdXJyZW50OiBWYWxpZGF0aW9uT3B0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBxdWVyeSA9IGAqWyR7dGhpcy5hdHRyaWJ1dGVOYW1lfT1cIiR7Y3VycmVudC52YWxpZGF0aW9uTmFtZX1cIl1gO1xyXG4gICAgICAgICAgICBpZiAodGhpcy52YWxpZGF0b3Iuc2NvcGUpIHtcclxuICAgICAgICAgICAgICAgIHF1ZXJ5ICs9IGBbc2NvcGU9XCIke3RoaXMudmFsaWRhdG9yLnNjb3BlfVwiXWA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3QgZWxlbWVudHMgPSA8RWxlbWVudFtdPkFycmF5LmZyb20odGhpcy52YWxpZGF0b3IuZm9ybVJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwocXVlcnkpKTtcclxuICAgICAgICAgICAgZWxlbWVudHMuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHZhbGlkYXRpb25JZCA9IHRoaXMuX2RhdGFTZXJ2aWNlLm5ld0d1aWQoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKGVsZW1lbnQsIFZhbGlkYXRpb25Db25zdGFudC5WQUxJREFUSU9OX0lELCB2YWxpZGF0aW9uSWQpO1xyXG4gICAgICAgICAgICAgICAgY3VycmVudC52YWxpZGF0aW9uSWQgPSB2YWxpZGF0aW9uSWQ7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gcHJldmlvdXMuY29uY2F0KGVsZW1lbnRzKTtcclxuICAgICAgICB9LCBbXSk7XHJcblxyXG4gICAgICAgIGxldCBnZW5lcmF0ZWREeW5hbWljT3B0aW9ucyA9IFtdO1xyXG4gICAgICAgIGxldCBkeW5hbWljRWxlbWVudHMgPSBbXTtcclxuICAgICAgICB0aGlzLnZhbGlkYXRvci5vcHRpb25zID0gdGhpcy52YWxpZGF0b3Iub3B0aW9ucy5maWx0ZXIoeCA9PiAheC5keW5hbWljKTtcclxuICAgICAgICB0aGlzLnZpcnR1YWxWYWxpZGF0aW9uT3B0aW9ucy5mb3JFYWNoKChjdXJyZW50OiBWYWxpZGF0aW9uT3B0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBxdWVyeSA9IGAqWyR7dGhpcy5hdHRyaWJ1dGVOYW1lfT1cIiR7Y3VycmVudC52YWxpZGF0aW9uTmFtZX1cIl1gO1xyXG4gICAgICAgICAgICBpZiAodGhpcy52YWxpZGF0b3Iuc2NvcGUpIHtcclxuICAgICAgICAgICAgICAgIHF1ZXJ5ICs9IGBbc2NvcGU9XCIke3RoaXMudmFsaWRhdG9yLnNjb3BlfVwiXWA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3QgZWxlbWVudHMgPSBBcnJheS5mcm9tKHRoaXMudmFsaWRhdG9yLmZvcm1SZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKHF1ZXJ5KSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGNsb25lZE9wdGlvbnMgPSBlbGVtZW50cy5tYXAoKGVsZW1lbnQsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB2YWxpZGF0aW9uSWQgPSB0aGlzLl9kYXRhU2VydmljZS5uZXdHdWlkKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZShlbGVtZW50LCBWYWxpZGF0aW9uQ29uc3RhbnQuVkFMSURBVElPTl9JRCwgdmFsaWRhdGlvbklkKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKGVsZW1lbnQsIFZhbGlkYXRpb25Db25zdGFudC5BUlJBWV9TRVFVRU5DRV9JRCwgaW5kZXgudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC4uLmN1cnJlbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvbklkOiB2YWxpZGF0aW9uSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVSZXNvbHZlcjogY3VycmVudC52YWx1ZVJlc29sdmVyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgID8gKHBheWxvYWQ6IGFueSkgPT4gY3VycmVudC52YWx1ZVJlc29sdmVyKHBheWxvYWQsIGluZGV4KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA6ICgpID0+IHsgcmV0dXJuICg8YW55PmVsZW1lbnQpLnZhbHVlOyB9XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgZHluYW1pY0VsZW1lbnRzLnB1c2goLi4uZWxlbWVudHMpO1xyXG4gICAgICAgICAgICBnZW5lcmF0ZWREeW5hbWljT3B0aW9ucy5wdXNoKC4uLmNsb25lZE9wdGlvbnMpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnZhbGlkYXRvci5vcHRpb25zID0gbm9uRHluYW1pY09wdGlvbnMuY29uY2F0KGdlbmVyYXRlZER5bmFtaWNPcHRpb25zKTtcclxuICAgICAgICB0aGlzLmVsZW1lbnRzID0gbm9uRHluYW1pY0VsZW1lbnRzLmNvbmNhdChkeW5hbWljRWxlbWVudHMpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5lbGVtZW50cykge1xyXG4gICAgICAgICAgICB0aGlzLmNoYW5nZWRJdGVtcyA9IFtdO1xyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnRzLmZvckVhY2goKGVsZW1lbnQpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHBheWxvYWQgPSB0aGlzLnZhbGlkYXRvci5wYXlsb2FkUmVmKCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgZWxlbWVudE9wdGlvbiA9IHRoaXMuZmluZEVsZW1lbnRPcHRpb24oZWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZWRJdGVtcy5wdXNoKG5ldyBDaGFuZ2VkSXRlbSh7XHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6IGVsZW1lbnRPcHRpb24udmFsaWRhdGlvbklkLFxyXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkOiBlbGVtZW50T3B0aW9uLnZhbGlkYXRpb25OYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIG9sZFZhbHVlOiBlbGVtZW50T3B0aW9uLnZhbHVlUmVzb2x2ZXIgPyBlbGVtZW50T3B0aW9uLnZhbHVlUmVzb2x2ZXIocGF5bG9hZCkgOiBudWxsXHJcbiAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlZ2lzdGVyRXZlbnRzKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZWxlbWVudHMuZmlsdGVyKGVsZW1lbnQgPT4gZWxlbWVudC5hdHRyaWJ1dGVzW3RoaXMuYXR0cmlidXRlTmFtZV0pLmZvckVhY2goKGVsZW1lbnQ6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIWVsZW1lbnQuZm9jdXNvdXRMaXN0ZW5lcikge1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5mb2N1c291dExpc3RlbmVyID0gdGhpcy5yZW5kZXJlci5saXN0ZW4oZWxlbWVudCwgJ2ZvY3Vzb3V0JywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlQmx1ckV2ZW50KGVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LmZvY3Vzb3V0TGlzdGVuZXIgPSB0aGlzLnJlbmRlcmVyLmxpc3RlbihlbGVtZW50LCAnY2hhbmdlJywgKCRldmVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBheWxvYWQgPSB0aGlzLnZhbGlkYXRvci5wYXlsb2FkUmVmKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGVsZW1lbnRPcHRpb24gPSB0aGlzLmZpbmRFbGVtZW50T3B0aW9uKGVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IGVsZW1lbnRPcHRpb24udmFsdWVSZXNvbHZlciA/IGVsZW1lbnRPcHRpb24udmFsdWVSZXNvbHZlcihwYXlsb2FkKSA6IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVsZW1lbnRPcHRpb24gJiYgZWxlbWVudE9wdGlvbi5kaXJ0eUNoZWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjdXJyZW50SXRlbSA9IHRoaXMuY2hhbmdlZEl0ZW1zLmZpbmQocyA9PiBzLmlkID09IGVsZW1lbnRPcHRpb24udmFsaWRhdGlvbklkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFjdXJyZW50SXRlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VkSXRlbXMucHVzaChuZXcgQ2hhbmdlZEl0ZW0oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBlbGVtZW50T3B0aW9uLnZhbGlkYXRpb25JZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWVsZDogZWxlbWVudE9wdGlvbi52YWxpZGF0aW9uTmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdmFsdWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50SXRlbS52YWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRJdGVtLm9sZFZhbHVlID09IHVuZGVmaW5lZCB8fCBjdXJyZW50SXRlbS5vbGRWYWx1ZSA9PSAnJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PSB1bmRlZmluZWQgfHwgdmFsdWUgPT0gJycpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudEl0ZW0uY2hhbmdlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudEl0ZW0uY2hhbmdlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PSB1bmRlZmluZWQgfHwgdmFsdWUgPT0gJycpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudEl0ZW0uY2hhbmdlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudEl0ZW0ub2xkVmFsdWUudG9TdHJpbmcoKSAhPSBjdXJyZW50SXRlbS52YWx1ZS50b1N0cmluZygpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50SXRlbS5jaGFuZ2UgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRJdGVtLmNoYW5nZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlbGVtZW50T3B0aW9uICYmIGVsZW1lbnRPcHRpb24ucnVsZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudE9wdGlvbi5ydWxlcy5mb3JFYWNoKChydWxlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBydWxlLmlzVmFsaWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGhhbmRsZUJsdXJFdmVudChlbGVtZW50OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBsZXQgZWxlbWVudE9wdGlvbiA9IHRoaXMuZmluZEVsZW1lbnRPcHRpb24oZWxlbWVudCk7XHJcbiAgICAgICAgaWYgKCFlbGVtZW50T3B0aW9uKSB0aHJvdyBuZXcgRXJyb3IoJyFlbGVtZW50T3B0aW9uJyk7XHJcblxyXG4gICAgICAgIHRoaXMudmFsaWRhdGVFbGVtZW50KGVsZW1lbnQsIGVsZW1lbnRPcHRpb24pLnBpcGUodGFrZSgxKSkuc3Vic2NyaWJlKG5ld09wdGlvbiA9PiB7XHJcbiAgICAgICAgICAgIGVsZW1lbnRPcHRpb24gPSBuZXdPcHRpb247XHJcbiAgICAgICAgICAgIHRoaXMuc3luY0Vycm9yTWVzc2FnZXMoZWxlbWVudCwgZWxlbWVudE9wdGlvbik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzeW5jRXJyb3JNZXNzYWdlcyhlbGVtZW50OiBhbnksIG9wdGlvbjogVmFsaWRhdGlvbk9wdGlvbik6IFN1bW1hcnlFcnJvciB8IG51bGwge1xyXG4gICAgICAgIGxldCBlcnJvck1lc3NhZ2VzOiBzdHJpbmdbXSA9IFtdO1xyXG4gICAgICAgIG9wdGlvbi5ydWxlcy5mb3JFYWNoKGFjdGlvbiA9PiB7XHJcbiAgICAgICAgICAgIGlmIChhY3Rpb24uaXNWYWxpZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbGVhckVycm9ySXRlbUVsZW1lbnQoZWxlbWVudCwgYWN0aW9uKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGVycm9yTWVzc2FnZSA9IHRoaXMuc2V0RWxlbWVudEVycm9yKGVsZW1lbnQsIGFjdGlvbiwgb3B0aW9uKTtcclxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZXMucHVzaChlcnJvck1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGludmFsaWRBY3Rpb25zID0gb3B0aW9uLnJ1bGVzLmZpbHRlcih4ID0+ICF4LmlzVmFsaWQpO1xyXG4gICAgICAgIGlmIChpbnZhbGlkQWN0aW9ucy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyhlbGVtZW50LCBvcHRpb24uZXJyb3JFbGVtZW50Q2xhc3MpO1xyXG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKGVsZW1lbnQsIG9wdGlvbi5zdWNjZXNzRWxlbWVudENsYXNzKTtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBlbGVtZW50OiBlbGVtZW50LFxyXG4gICAgICAgICAgICBtZXNzYWdlczogZXJyb3JNZXNzYWdlc1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFkZFJlbGF0ZWRQcm92aWRlcnMocHJvdmlkZXJzOiBWYWxpZGF0aW9uU2VydmljZVtdKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IG5ld1Byb3ZpZGVycyA9IHByb3ZpZGVycy5maWx0ZXIoeCA9PiB0aGlzLnJlbGF0ZWRQcm92aWRlcnMuaW5kZXhPZih4KSA8IDApO1xyXG4gICAgICAgIG5ld1Byb3ZpZGVycy5mb3JFYWNoKHByb3ZpZGVyID0+XHJcbiAgICAgICAgICAgIHByb3ZpZGVyLm9uRGVzdHJveS5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZWxhdGVkUHJvdmlkZXJzID0gdGhpcy5yZWxhdGVkUHJvdmlkZXJzLmZpbHRlcigoKSA9PiB0aGlzLnJlbGF0ZWRQcm92aWRlcnMuaW5kZXhPZihwcm92aWRlcikgPCAwKTtcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgIHRoaXMucmVsYXRlZFByb3ZpZGVycy5wdXNoKC4uLm5ld1Byb3ZpZGVycyk7XHJcbiAgICB9XHJcbn0iXX0=