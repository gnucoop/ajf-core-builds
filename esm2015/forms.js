/**
 * @license
 * Copyright (C) 2018 Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */
import { coerceBooleanProperty, deepCopy } from '@ajf/core/utils';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription, defer, Subject, BehaviorSubject, Observable, timer } from 'rxjs';
import { map, withLatestFrom, filter, publishReplay, refCount, startWith, scan, share, pairwise, debounceTime, delayWhen } from 'rxjs/operators';
import { Pipe, Injectable, Directive, ViewContainerRef, EventEmitter, NgModule, InjectionToken } from '@angular/core';
import { format } from 'date-fns';
import { AjfError, evaluateExpression, alwaysCondition, normalizeExpression, createCondition, createFormula, AjfExpressionUtils, AjfConditionSerializer, AjfFormulaSerializer } from '@ajf/core/models';
import * as esprima from 'esprima';
import esprima__default, {  } from 'esprima';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 * @template T
 */
class AjfBaseFieldComponent {
    /**
     * @param {?} _changeDetectorRef
     * @param {?} _service
     * @param {?} _warningAlertService
     */
    constructor(_changeDetectorRef, _service, _warningAlertService) {
        this._changeDetectorRef = _changeDetectorRef;
        this._service = _service;
        this._warningAlertService = _warningAlertService;
        this._warningTriggerSub = Subscription.EMPTY;
        this._instanceUpdateSub = Subscription.EMPTY;
        this._control = defer((/**
         * @return {?}
         */
        () => this._service.getControl(this.instance).pipe(map((/**
         * @param {?} ctrl
         * @return {?}
         */
        ctrl => ctrl || new FormControl())))));
    }
    /**
     * @return {?}
     */
    get instance() { return this._instance; }
    /**
     * @param {?} instance
     * @return {?}
     */
    set instance(instance) {
        if (instance !== this._instance) {
            this._instance = instance;
            this._setUpInstanceUpdate();
            this._onInstanceChange();
        }
    }
    /**
     * @return {?}
     */
    get readonly() { return this._readonly; }
    /**
     * @param {?} readonly
     * @return {?}
     */
    set readonly(readonly) {
        this._readonly = coerceBooleanProperty(readonly);
        this._changeDetectorRef.markForCheck();
    }
    /**
     * @return {?}
     */
    get control() { return this._control; }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._warningTriggerSub = this.instance.warningTrigger.pipe(withLatestFrom(this.control), filter((/**
         * @param {?} v
         * @return {?}
         */
        v => v[1] != null))).subscribe((/**
         * @param {?} v
         * @return {?}
         */
        (v) => {
            if (this.instance.warningResults == null) {
                return;
            }
            /** @type {?} */
            const control = v[1];
            /** @type {?} */
            const s = this._warningAlertService.showWarningAlertPrompt(this.instance.warningResults.filter((/**
             * @param {?} w
             * @return {?}
             */
            w => w.result)).map((/**
             * @param {?} w
             * @return {?}
             */
            w => w.warning))).subscribe((/**
             * @param {?} r
             * @return {?}
             */
            (r) => {
                if (r.result) {
                    (/** @type {?} */ (control)).setValue(null);
                }
            }), (/**
             * @param {?} _e
             * @return {?}
             */
            (_e) => { if (s) {
                s.unsubscribe();
            } }), (/**
             * @return {?}
             */
            () => { if (s) {
                s.unsubscribe();
            } }));
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._warningTriggerSub.unsubscribe();
        this._instanceUpdateSub.unsubscribe();
    }
    /**
     * @protected
     * @return {?}
     */
    _onInstanceChange() { }
    /**
     * @private
     * @return {?}
     */
    _setUpInstanceUpdate() {
        this._instanceUpdateSub.unsubscribe();
        if (this._instance != null) {
            this._instanceUpdateSub = this._instance.updated.subscribe((/**
             * @return {?}
             */
            () => {
                if (this._changeDetectorRef) {
                    try {
                        this._changeDetectorRef.detectChanges();
                    }
                    catch (e) { }
                }
            }));
        }
        else {
            this._instanceUpdateSub = Subscription.EMPTY;
        }
        this._changeDetectorRef.detectChanges();
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfDateValuePipe {
    /**
     * @param {?} date
     * @return {?}
     */
    transform(date) {
        if (date == null) {
            return undefined;
        }
        return date === 'today' ? new Date() : (/** @type {?} */ (date));
    }
}
AjfDateValuePipe.decorators = [
    { type: Pipe, args: [{ name: 'ajfDateValue' },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfDateValueStringPipe {
    /**
     * @param {?} date
     * @return {?}
     */
    transform(date) {
        if (date == null) {
            return undefined;
        }
        /** @type {?} */
        const dateObj = date === 'today' ? new Date() : date;
        return format(dateObj, 'YYYY-MM-DD');
    }
}
AjfDateValueStringPipe.decorators = [
    { type: Injectable },
    { type: Pipe, args: [{ name: 'ajfDateValueString' },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * This class will define an Ajf invalid field definition error
 */
class AjfInvalidFieldDefinitionError extends AjfError {
    /**
     * @return {?}
     */
    get name() { return 'AjfInvalidFieldDefinitionError'; }
    /**
     * @param {?=} message
     */
    constructor(message) {
        super(message);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/** @enum {number} */
const AjfFieldType = {
    String: 0,
    Text: 1,
    Number: 2,
    Boolean: 3,
    SingleChoice: 4,
    MultipleChoice: 5,
    Formula: 6,
    Empty: 7,
    Date: 8,
    DateInput: 9,
    Time: 10,
    Table: 11,
    Geolocation: 12,
    Barcode: 13,
    LENGTH: 14,
};
AjfFieldType[AjfFieldType.String] = 'String';
AjfFieldType[AjfFieldType.Text] = 'Text';
AjfFieldType[AjfFieldType.Number] = 'Number';
AjfFieldType[AjfFieldType.Boolean] = 'Boolean';
AjfFieldType[AjfFieldType.SingleChoice] = 'SingleChoice';
AjfFieldType[AjfFieldType.MultipleChoice] = 'MultipleChoice';
AjfFieldType[AjfFieldType.Formula] = 'Formula';
AjfFieldType[AjfFieldType.Empty] = 'Empty';
AjfFieldType[AjfFieldType.Date] = 'Date';
AjfFieldType[AjfFieldType.DateInput] = 'DateInput';
AjfFieldType[AjfFieldType.Time] = 'Time';
AjfFieldType[AjfFieldType.Table] = 'Table';
AjfFieldType[AjfFieldType.Geolocation] = 'Geolocation';
AjfFieldType[AjfFieldType.Barcode] = 'Barcode';
AjfFieldType[AjfFieldType.LENGTH] = 'LENGTH';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} type
 * @return {?}
 */
function fieldIconName(type) {
    return `ajf-icon-field-${typeof AjfFieldType[type] === 'string'
        ? AjfFieldType[type].toLowerCase()
        : type}`;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfFieldIconPipe {
    /**
     * @param {?} field
     * @return {?}
     */
    transform(field) {
        return fieldIconName(((/** @type {?} */ (field))).fieldType ? ((/** @type {?} */ (field))).fieldType : (/** @type {?} */ (field)));
    }
}
AjfFieldIconPipe.decorators = [
    { type: Pipe, args: [{ name: 'ajfFieldIcon' },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfFieldIsValidPipe {
    /**
     * @param {?=} validationResults
     * @return {?}
     */
    transform(validationResults) {
        return validationResults != null
            && validationResults.filter((/**
             * @param {?} f
             * @return {?}
             */
            (f) => !f.result)).length === 0;
    }
}
AjfFieldIsValidPipe.decorators = [
    { type: Pipe, args: [{ name: 'ajfFieldIsValid' },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
class AjfFormField {
    /**
     * @param {?} _cdr
     * @param {?} _cfr
     */
    constructor(_cdr, _cfr) {
        this._cdr = _cdr;
        this._cfr = _cfr;
        this._updatedSub = Subscription.EMPTY;
    }
    /**
     * @return {?}
     */
    get instance() { return this._instance; }
    /**
     * @param {?} instance
     * @return {?}
     */
    set instance(instance) {
        if (this._instance !== instance) {
            this._instance = instance;
            this._loadComponent();
        }
    }
    /**
     * @return {?}
     */
    get readonly() { return this._readonly; }
    /**
     * @param {?} readonly
     * @return {?}
     */
    set readonly(readonly) {
        this._readonly = coerceBooleanProperty(readonly);
        this._componentInstance.readonly = this._readonly;
        this._cdr.markForCheck();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._updatedSub.unsubscribe();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._loadComponent();
    }
    /**
     * @private
     * @return {?}
     */
    _loadComponent() {
        this._updatedSub.unsubscribe();
        this._updatedSub = Subscription.EMPTY;
        if (this._instance == null || this.fieldHost == null) {
            return;
        }
        /** @type {?} */
        const vcr = this.fieldHost.viewContainerRef;
        vcr.clear();
        /** @type {?} */
        const componentDef = this.componentsMap[this._instance.node.fieldType];
        if (componentDef == null) {
            return;
        }
        /** @type {?} */
        const component = componentDef.component;
        try {
            /** @type {?} */
            const componentFactory = this._cfr.resolveComponentFactory(component);
            /** @type {?} */
            const componentRef = vcr.createComponent(componentFactory);
            this._componentInstance = componentRef.instance;
            this._componentInstance.instance = this._instance;
            this._componentInstance.readonly = this._readonly;
            if (componentDef.inputs) {
                Object.keys(componentDef.inputs).forEach((/**
                 * @param {?} key
                 * @return {?}
                 */
                key => {
                    if (key in this._componentInstance) {
                        ((/** @type {?} */ (this._componentInstance)))[key] = (/** @type {?} */ (componentDef.inputs))[key];
                    }
                }));
            }
            this._updatedSub = this._instance.updatedEvt.subscribe((/**
             * @return {?}
             */
            () => this._cdr.markForCheck()));
        }
        catch (e) { }
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfFieldHost {
    /**
     * @param {?} viewContainerRef
     */
    constructor(viewContainerRef) {
        this.viewContainerRef = viewContainerRef;
    }
}
AjfFieldHost.decorators = [
    { type: Directive, args: [{ selector: '[ajf-field-host]' },] },
];
/** @nocollapse */
AjfFieldHost.ctorParameters = () => [
    { type: ViewContainerRef }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/** @type {?} */
const componentsMap = {};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
class AjfFieldService {
    constructor() {
        this.componentsMap = componentsMap;
    }
    /**
     * @param {?} field
     * @return {?}
     */
    registerCustomField(field) {
        const { fieldType, component } = field;
        if (fieldType < 100) {
            throw new Error('Invalid custom field type, it must be greater than 100');
        }
        if (component == null) {
            throw new Error('Invalid custom field component');
        }
        this.componentsMap[fieldType] = field;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 * @template T
 */
class AjfFieldWithChoicesComponent extends AjfBaseFieldComponent {
    /**
     * @param {?} cdr
     * @param {?} service
     * @param {?} warningAlertService
     * @param {?} searchThreshold
     */
    constructor(cdr, service, warningAlertService, searchThreshold) {
        super(cdr, service, warningAlertService);
        this._searchThreshold = 6;
        if (searchThreshold != null) {
            this._searchThreshold = searchThreshold;
        }
    }
    /**
     * @return {?}
     */
    get searchThreshold() { return this._searchThreshold; }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/** @enum {number} */
const AjfNodeType = {
    AjfField: 0,
    AjfFieldNodeLink: 1,
    AjfNodeGroup: 2,
    AjfSlide: 3,
    AjfRepeatingSlide: 4,
    LENGTH: 5,
};
AjfNodeType[AjfNodeType.AjfField] = 'AjfField';
AjfNodeType[AjfNodeType.AjfFieldNodeLink] = 'AjfFieldNodeLink';
AjfNodeType[AjfNodeType.AjfNodeGroup] = 'AjfNodeGroup';
AjfNodeType[AjfNodeType.AjfSlide] = 'AjfSlide';
AjfNodeType[AjfNodeType.AjfRepeatingSlide] = 'AjfRepeatingSlide';
AjfNodeType[AjfNodeType.LENGTH] = 'LENGTH';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} field
 * @return {?}
 */
function isCustomFieldWithChoices(field) {
    return field.fieldType > 100
        && componentsMap[field.fieldType] != null
        && componentsMap[field.fieldType].isFieldWithChoice === true;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} field
 * @return {?}
 */
function isFieldWithChoices(field) {
    return field.fieldType === AjfFieldType.SingleChoice ||
        field.fieldType === AjfFieldType.MultipleChoice;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} node
 * @return {?}
 */
function isField(node) {
    return node != null && node.nodeType === AjfNodeType.AjfField;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} nodeInstance
 * @return {?}
 */
function isFieldInstance(nodeInstance) {
    return nodeInstance != null && nodeInstance.node != null && isField(nodeInstance.node);
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} nodeInstance
 * @return {?}
 */
function isFieldWithChoicesInstance(nodeInstance) {
    return nodeInstance != null && isFieldInstance(nodeInstance) &&
        isFieldWithChoices(((/** @type {?} */ (nodeInstance))).node);
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} field
 * @return {?}
 */
function isTableField(field) {
    return field.fieldType === AjfFieldType.Table;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} nodeInstance
 * @return {?}
 */
function isTableFieldInstance(nodeInstance) {
    return nodeInstance != null && isFieldInstance(nodeInstance) &&
        isTableField(((/** @type {?} */ (nodeInstance))).node);
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} instance
 * @param {?} context
 * @return {?}
 */
function updateConditionalBranches(instance, context) {
    /** @type {?} */
    const conditionalBranches = instance.conditionalBranches;
    if (conditionalBranches != null) {
        /** @type {?} */
        const oldBranch = instance.verifiedBranch;
        /** @type {?} */
        let idx = 0;
        /** @type {?} */
        let found = false;
        while (idx < conditionalBranches.length && !found) {
            /** @type {?} */
            let verified = evaluateExpression(conditionalBranches[idx].condition, context);
            if (verified) {
                found = true;
                if (idx !== instance.verifiedBranch) {
                    instance.verifiedBranch = idx;
                }
            }
            idx++;
        }
        if (oldBranch !== instance.verifiedBranch) {
            return true;
        }
    }
    return false;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} instance
 * @param {?} context
 * @param {?=} branchVisibility
 * @return {?}
 */
function updateVisibility(instance, context, branchVisibility = true) {
    if (instance.visibility == null) {
        instance.visible = false;
        return false;
    }
    /** @type {?} */
    const visibility = instance.visibility;
    /** @type {?} */
    const oldVisibility = instance.visible;
    /** @type {?} */
    let newVisibility = branchVisibility && evaluateExpression(visibility.condition, context);
    if (newVisibility !== instance.visible) {
        instance.visible = newVisibility;
    }
    return oldVisibility !== newVisibility;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @param {?} instance
 * @return {?}
 */
function nodeInstanceSuffix(instance) {
    if (instance.prefix == null || instance.prefix.length == 0) {
        return '';
    }
    return `__${instance.prefix.join('__')}`;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} instance
 * @return {?}
 */
function nodeInstanceCompleteName(instance) {
    return instance != null && instance.node != null
        ? `${instance.node.name}${nodeInstanceSuffix(instance)}`
        : '';
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} instance
 * @param {?} context
 * @return {?}
 */
function updateFormula(instance, context) {
    /** @type {?} */
    const formula = instance.formula;
    /** @type {?} */
    const editable = instance.node.editable;
    if (formula != null && instance.visible && (!editable || (editable && instance.value == null))) {
        /** @type {?} */
        let newValue = evaluateExpression(formula.formula, context);
        /** @type {?} */
        const oldValue = instance.value;
        if (newValue !== instance.value) {
            instance.value = newValue;
            context[nodeInstanceCompleteName(instance)] = instance.value;
            context.$value = instance.value;
        }
        return { changed: newValue !== oldValue, value: newValue };
    }
    return { changed: false, value: instance.value };
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} instance
 * @param {?} context
 * @return {?}
 */
function updateNextSlideCondition(instance, context) {
    if (instance.nextSlideCondition != null) {
        return evaluateExpression(instance.nextSlideCondition.condition, context);
    }
    return false;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} validation
 * @param {?=} context
 * @param {?=} forceFormula
 * @return {?}
 */
function evaluateValidation(validation, context, forceFormula) {
    return {
        result: evaluateExpression(validation.condition, context, forceFormula),
        error: validation.errorMessage,
        clientValidation: validation.clientValidation,
    };
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} validation
 * @param {?=} context
 * @return {?}
 */
function evaluateValidationConditions(validation, context) {
    /** @type {?} */
    let res = [];
    validation.conditions.forEach((/**
     * @param {?} cond
     * @return {?}
     */
    (cond) => {
        res.push(evaluateValidation(cond, context));
    }));
    return res;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} validation
 * @param {?} value
 * @return {?}
 */
function evaluateValidationMaxDigits(validation, value) {
    if (validation.maxDigits == null) {
        return null;
    }
    /** @type {?} */
    const ctx = { '$value': value };
    if (typeof validation.maxDigits === 'number') {
        return {
            result: evaluateExpression(`$value.toString().length <= ${validation.maxDigits}`, ctx),
            error: `Digits count must be <= ${validation.maxDigits}`,
            clientValidation: false
        };
    }
    return evaluateValidation(validation.maxDigits, ctx);
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} validation
 * @param {?} value
 * @return {?}
 */
function evaluateValidationMaxValue(validation, value) {
    if (validation.maxValue == null) {
        return null;
    }
    /** @type {?} */
    const ctx = { '$value': value };
    if (typeof validation.maxValue === 'number') {
        return {
            result: evaluateExpression(`$value.length <= ${validation.maxValue}`, ctx),
            error: `Value must be <= ${validation.minValue}`,
            clientValidation: false
        };
    }
    return evaluateValidation(validation.maxValue, { '$value': value });
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} validation
 * @param {?} value
 * @return {?}
 */
function evaluateValidationMinDigits(validation, value) {
    if (validation.minDigits == null) {
        return null;
    }
    /** @type {?} */
    const ctx = { '$value': value };
    if (typeof validation.minDigits === 'number') {
        return {
            result: evaluateExpression(`$value.toString().length >= ${validation.minDigits}`, ctx),
            error: `Digits count must be >= ${validation.minValue}`,
            clientValidation: false
        };
    }
    return evaluateValidation(validation.minDigits, ctx);
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} validation
 * @param {?} value
 * @return {?}
 */
function evaluateValidationMinValue(validation, value) {
    if (validation.minValue == null) {
        return null;
    }
    /** @type {?} */
    const ctx = { '$value': value };
    if (typeof validation.minValue === 'number') {
        return {
            result: evaluateExpression(`$value.length <= ${validation.minValue}`, ctx),
            error: `Value must be >= ${validation.minValue}`,
            clientValidation: false
        };
    }
    return evaluateValidation(validation.minValue, { '$value': value });
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} validation
 * @param {?} value
 * @return {?}
 */
function evaluateValidationNotEmpty(validation, value) {
    if (validation.notEmpty == null) {
        return null;
    }
    /** @type {?} */
    const ctx = { '$value': value };
    if (typeof validation.notEmpty === 'boolean') {
        return {
            result: evaluateExpression(`($value != null) === ${validation.notEmpty}`, ctx),
            error: 'Value must not be empty',
            clientValidation: false
        };
    }
    return evaluateValidation(validation.notEmpty, ctx);
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} validation
 * @param {?} value
 * @param {?=} context
 * @return {?}
 */
function evaluateValidationGroup(validation, value, context) {
    /** @type {?} */
    let res = [];
    /** @type {?} */
    let ctx = deepCopy(context);
    ctx['$value'] = value;
    res = evaluateValidationConditions(validation, ctx);
    if (validation.maxValue) {
        /** @type {?} */
        const maxValue = evaluateValidationMaxValue(validation, value);
        if (maxValue != null) {
            res.push(maxValue);
        }
    }
    if (validation.minValue) {
        /** @type {?} */
        const minValue = evaluateValidationMinValue(validation, value);
        if (minValue != null) {
            res.push(minValue);
        }
    }
    if (validation.notEmpty) {
        /** @type {?} */
        const notEmpty = evaluateValidationNotEmpty(validation, value);
        if (notEmpty != null) {
            res.push(notEmpty);
        }
    }
    if (validation.maxDigits) {
        /** @type {?} */
        const maxDigits = evaluateValidationMaxDigits(validation, value);
        if (maxDigits != null) {
            res.push(maxDigits);
        }
    }
    if (validation.minDigits) {
        /** @type {?} */
        const minDigits = evaluateValidationMinDigits(validation, value);
        if (minDigits != null) {
            res.push(minDigits);
        }
    }
    return res;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} instance
 * @param {?} context
 * @param {?=} supplementaryInformations
 * @return {?}
 */
function updateValidation(instance, context, supplementaryInformations) {
    /** @type {?} */
    const validation = instance.validation;
    if (validation == null) {
        instance.valid = true;
        return;
    }
    if (supplementaryInformations) {
        Object.keys(supplementaryInformations).forEach((/**
         * @param {?} key
         * @return {?}
         */
        (key) => {
            context[`__supplementary__${key}__`] = supplementaryInformations[key];
        }));
    }
    /** @type {?} */
    const completeName = nodeInstanceCompleteName(instance);
    if (context[completeName] != null && validation && validation.forceValue) {
        instance.value = evaluateExpression(validation.forceValue.condition, context);
        context[completeName] = instance.value;
        context.$value = instance.value;
    }
    instance.validationResults =
        evaluateValidationGroup(validation, context[completeName], context);
    instance.valid = instance.validationResults.reduce((/**
     * @param {?} prev
     * @param {?} x
     * @return {?}
     */
    (prev, x) => prev && x.result), true);
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} warning
 * @param {?=} context
 * @param {?=} forceFormula
 * @return {?}
 */
function evaluateWarning(warning, context, forceFormula) {
    return {
        result: evaluateExpression(warning.condition, context, forceFormula),
        warning: warning.warningMessage,
    };
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} warning
 * @param {?=} context
 * @return {?}
 */
function evaluateWarningConditions(warning, context) {
    return warning.conditions.map((/**
     * @param {?} cond
     * @return {?}
     */
    cond => evaluateWarning(cond, context)));
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} warning
 * @param {?=} context
 * @return {?}
 */
function evaluateWarningGroup(warning, context) {
    return evaluateWarningConditions(warning, context);
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} instance
 * @param {?} context
 * @return {?}
 */
function updateWarning(instance, context) {
    /** @type {?} */
    const warning = instance.warning;
    if (warning == null) {
        return;
    }
    /** @type {?} */
    const completeName = nodeInstanceCompleteName(instance);
    if (context[completeName] != null && warning) {
        instance.warningResults = evaluateWarningGroup(warning, context);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} instance
 * @param {?} context
 * @param {?=} branchVisibility
 * @return {?}
 */
function updateFieldInstanceState(instance, context, branchVisibility = true) {
    updateVisibility(instance, context, branchVisibility);
    updateConditionalBranches(instance, context);
    updateFormula((/** @type {?} */ (instance)), context);
    updateValidation(instance, context);
    updateWarning(instance, context);
    updateNextSlideCondition(instance, context);
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} instance
 * @param {?} context
 * @return {?}
 */
function updateFilteredChoices(instance, context) {
    if (instance.choicesFilter != null) {
        instance.filteredChoices = instance.node.choicesOrigin.choices.filter((/**
         * @param {?} c
         * @return {?}
         */
        c => {
            context.$choiceValue = c.value;
            return evaluateExpression((/** @type {?} */ (instance.choicesFilter)).formula, context);
        }));
    }
    else {
        instance.filteredChoices = instance.node.choicesOrigin.choices;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} instance
 * @param {?} context
 * @return {?}
 */
function updateTriggerConditions(instance, context) {
    if (instance.triggerConditions == null) {
        return false;
    }
    /** @type {?} */
    const completeName = nodeInstanceCompleteName(instance);
    if (instance.firstTriggerConditionDone[completeName]) {
        return false;
    }
    /** @type {?} */
    let found = false;
    /** @type {?} */
    const conditionsNum = instance.triggerConditions.length;
    for (let i = 0; i < conditionsNum; i++) {
        if (evaluateExpression(instance.triggerConditions[i].condition, context)) {
            found = true;
            break;
        }
    }
    instance.firstTriggerConditionDone[completeName] = found;
    return found;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} node
 * @return {?}
 */
function createNode(node) {
    /** @type {?} */
    const conditionalBranches = node.conditionalBranches != null && node.conditionalBranches.length > 0 ?
        node.conditionalBranches :
        [alwaysCondition()];
    return Object.assign({}, node, { parentNode: node.parentNode != null ? node.parentNode : 0, label: node.label || '', visibility: node.visibility || alwaysCondition(), conditionalBranches });
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} field
 * @return {?}
 */
function createField(field) {
    /** @type {?} */
    const node = createNode(Object.assign({}, field, { nodeType: AjfNodeType.AjfField }));
    /** @type {?} */
    const editable = field.editable != null ?
        field.editable :
        field.fieldType !== AjfFieldType.Formula && field.fieldType !== AjfFieldType.Table;
    return Object.assign({}, node, field, { nodeType: AjfNodeType.AjfField, editable, defaultValue: field.defaultValue != null ? field.defaultValue : null, size: field.size || 'normal' });
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} node
 * @return {?}
 */
function isSlidesNode(node) {
    return node != null &&
        (node.nodeType === AjfNodeType.AjfRepeatingSlide || node.nodeType === AjfNodeType.AjfSlide);
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} node
 * @return {?}
 */
function isContainerNode(node) {
    return node != null && (node.nodeType === AjfNodeType.AjfNodeGroup || isSlidesNode(node));
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} nodeInstance
 * @return {?}
 */
function isContainerNodeInstance(nodeInstance) {
    return nodeInstance != null && nodeInstance.node != null && isContainerNode(nodeInstance.node);
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} nodes
 * @param {?=} includeGroups
 * @return {?}
 */
function flattenNodesInstances(nodes, includeGroups = false) {
    /** @type {?} */
    let flatNodes = [];
    nodes.forEach((/**
     * @param {?} nodeInstance
     * @return {?}
     */
    (nodeInstance) => {
        if (isFieldInstance(nodeInstance)) {
            flatNodes.push(nodeInstance);
        }
        if (isContainerNodeInstance(nodeInstance)) {
            if (includeGroups) {
                flatNodes.push(nodeInstance);
            }
            flatNodes = flatNodes.concat(flattenNodesInstances(((/** @type {?} */ (nodeInstance))).nodes, includeGroups));
        }
    }));
    return flatNodes;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} nodeInstance
 * @return {?}
 */
function isSlidesInstance(nodeInstance) {
    return nodeInstance != null && nodeInstance.node != null && isSlidesNode(nodeInstance.node);
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} nodes
 * @return {?}
 */
function flattenNodesInstancesTree(nodes) {
    /** @type {?} */
    let flatTree = [];
    nodes.forEach((/**
     * @param {?} nodeInstance
     * @return {?}
     */
    (nodeInstance) => {
        if (isSlidesInstance(nodeInstance)) {
            /** @type {?} */
            const ni = (/** @type {?} */ (nodeInstance));
            flatTree.push(ni);
            ni.flatNodes = flattenNodesInstances(ni.nodes);
        }
    }));
    return flatTree;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} node
 * @return {?}
 */
function isNodeGroup(node) {
    return node != null && node.nodeType === AjfNodeType.AjfNodeGroup;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} nodeInstance
 * @return {?}
 */
function isNodeGroupInstance(nodeInstance) {
    return nodeInstance != null && nodeInstance.node != null && isNodeGroup(nodeInstance.node);
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} node
 * @return {?}
 */
function isSlideNode(node) {
    return node != null && node.nodeType === AjfNodeType.AjfSlide;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} nodeInstance
 * @return {?}
 */
function isSlideInstance(nodeInstance) {
    return nodeInstance != null && nodeInstance.node != null && isSlideNode(nodeInstance.node);
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} instance
 * @return {?}
 */
function createNodeInstance(instance) {
    return {
        node: instance.node,
        prefix: instance.prefix ? [...instance.prefix] : [],
        visible: instance.visible != null ? instance.visible : true,
        conditionalBranches: [],
        updatedEvt: new EventEmitter()
    };
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} instance
 * @param {?} context
 * @return {?}
 */
function createFieldInstance(instance, context) {
    /** @type {?} */
    const nodeInstance = createNodeInstance(instance);
    /** @type {?} */
    let value = null;
    if (nodeInstance.node != null && context != null) {
        /** @type {?} */
        const completeName = nodeInstanceCompleteName(nodeInstance);
        if (context[nodeInstance.node.name] != null) {
            value = context[nodeInstance.node.name];
        }
        else if (context[completeName] != null) {
            value = context[completeName];
        }
    }
    return Object.assign({}, nodeInstance, { node: instance.node, value, valid: false, defaultValue: instance.defaultValue != null ? instance.defaultValue : null, validationResults: instance.validationResults || [], warningResults: instance.warningResults || [], warningTrigger: new EventEmitter(), updated: new EventEmitter() });
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 * @param {?} instance
 * @param {?} context
 * @return {?}
 */
function createFieldWithChoicesInstance(instance, context) {
    /** @type {?} */
    const fieldInstance = createFieldInstance(instance, context);
    return Object.assign({}, fieldInstance, { node: instance.node, filteredChoices: [...instance.node.choices], firstTriggerConditionDone: {}, selectionTrigger: new EventEmitter() });
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} instance
 * @param {?} context
 * @return {?}
 */
function createTableFieldInstance(instance, context) {
    /** @type {?} */
    const fieldInstance = createFieldInstance(instance, context);
    return Object.assign({}, fieldInstance, { node: instance.node, context, hideEmptyRows: instance.hideEmptyRows || false, controls: [] });
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} instance
 * @return {?}
 */
function createNodeGroupInstance(instance) {
    /** @type {?} */
    const nodeInstance = createNodeInstance(instance);
    return Object.assign({}, nodeInstance, { node: instance.node, formulaReps: instance.formulaReps, reps: 0, nodes: [], flatNodes: [] });
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} instance
 * @return {?}
 */
function createSlideInstance(instance) {
    /** @type {?} */
    const nodeInstance = createNodeInstance(instance);
    return Object.assign({}, nodeInstance, { node: instance.node, nodes: [], slideNodes: [], flatNodes: [], valid: false, position: 0 });
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} instance
 * @return {?}
 */
function createRepeatingSlideInstance(instance) {
    /** @type {?} */
    const slideInstance = createSlideInstance(instance);
    return Object.assign({}, slideInstance, { node: instance.node, slideNodes: [], formulaReps: instance.formulaReps, reps: 0, nodes: [], flatNodes: [] });
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @param {?} group
 * @return {?}
 */
function createValidationGroup(group) {
    return Object.assign({}, group, { conditions: group.conditions || [] });
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @param {?} group
 * @return {?}
 */
function createWarningGroup(group) {
    return Object.assign({}, group, { conditions: group.conditions || [] });
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} node
 * @return {?}
 */
function isRepeatingContainerNode(node) {
    return node != null &&
        (node.nodeType === AjfNodeType.AjfNodeGroup ||
            node.nodeType === AjfNodeType.AjfRepeatingSlide);
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} allNodes
 * @param {?} node
 * @return {?}
 */
function getAncestorRepeatingNodes(allNodes, node) {
    /** @type {?} */
    let nodeGroups = [];
    /** @type {?} */
    let curParent = node.parent;
    while (curParent != null) {
        /** @type {?} */
        const curNode = allNodes.map((/**
         * @param {?} n
         * @return {?}
         */
        (n) => ((/** @type {?} */ (n))).node || (/** @type {?} */ (n))))
            .find((/**
         * @param {?} n
         * @return {?}
         */
        n => n.id == curParent));
        if (curNode) {
            if (isRepeatingContainerNode(curNode)) {
                nodeGroups.push(curNode);
            }
        }
        curParent = curNode != null ? curNode.parent : null;
    }
    return nodeGroups;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} allNodes
 * @param {?} node
 * @return {?}
 */
function getAncestorRepeatingNodesNames(allNodes, node) {
    /** @type {?} */
    let names = {};
    /** @type {?} */
    const nodeGroups = (/** @type {?} */ (getAncestorRepeatingNodes(allNodes, node)));
    nodeGroups.forEach((/**
     * @param {?} n
     * @param {?} idx
     * @return {?}
     */
    (n, idx) => (n.nodes || []).forEach((/**
     * @param {?} sn
     * @return {?}
     */
    (sn) => {
        if (isField(sn)) {
            names[sn.name] = idx;
        }
    }))));
    return names;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} condition
 * @param {?} ancestorsNames
 * @param {?} prefix
 * @return {?}
 */
function getInstanceCondition(condition, ancestorsNames, prefix) {
    /** @type {?} */
    const oldCondition = condition.condition;
    /** @type {?} */
    let newCondition = normalizeExpression(oldCondition, ancestorsNames, prefix);
    if (newCondition === oldCondition) {
        return condition;
    }
    return { condition: newCondition };
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} conditions
 * @param {?} ancestorsNames
 * @param {?} prefix
 * @return {?}
 */
function getInstanceConditions(conditions, ancestorsNames, prefix) {
    /** @type {?} */
    let changed = false;
    /** @type {?} */
    const newConditions = conditions.map((/**
     * @param {?} condition
     * @return {?}
     */
    (condition) => {
        /** @type {?} */
        const newCondition = getInstanceCondition(condition, ancestorsNames, prefix);
        if (newCondition !== condition) {
            changed = true;
        }
        return newCondition;
    }));
    return changed ? newConditions : conditions;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} formula
 * @param {?} ancestorsNames
 * @param {?} prefix
 * @return {?}
 */
function getInstanceFormula(formula, ancestorsNames, prefix) {
    /** @type {?} */
    const oldFormula = formula.formula;
    /** @type {?} */
    let newFormula = normalizeExpression(oldFormula, ancestorsNames, prefix);
    if (newFormula === oldFormula) {
        return formula;
    }
    return { formula: newFormula };
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @param {?} validation
 * @return {?}
 */
function createValidation(validation) {
    return Object.assign({}, validation, { clientValidation: validation.clientValidation || false, errorMessage: validation.errorMessage || 'Undefined Error' });
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} validation
 * @param {?} ancestorsNames
 * @param {?} prefix
 * @return {?}
 */
function getInstanceValidation(validation, ancestorsNames, prefix) {
    /** @type {?} */
    const oldValidation = validation.condition;
    /** @type {?} */
    let newValidation = normalizeExpression(oldValidation, ancestorsNames, prefix);
    if (newValidation === oldValidation) {
        return validation;
    }
    return createValidation({ condition: newValidation });
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} validations
 * @param {?} ancestorsNames
 * @param {?} prefix
 * @return {?}
 */
function getInstanceValidations(validations, ancestorsNames, prefix) {
    /** @type {?} */
    let changed = false;
    /** @type {?} */
    const newValidations = validations.map((/**
     * @param {?} validation
     * @return {?}
     */
    (validation) => {
        /** @type {?} */
        const newValidation = getInstanceValidation(validation, ancestorsNames, prefix);
        if (newValidation !== validation) {
            changed = true;
        }
        return newValidation;
    }));
    return changed ? newValidations : validations;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @param {?} warning
 * @return {?}
 */
function createWarning(warning) {
    return Object.assign({}, warning, { warningMessage: warning.warningMessage || 'Undefined Warning' });
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} warning
 * @param {?} ancestorsNames
 * @param {?} prefix
 * @return {?}
 */
function getInstanceWarning(warning, ancestorsNames, prefix) {
    /** @type {?} */
    const oldWarning = warning.condition;
    /** @type {?} */
    let newWarning = normalizeExpression(oldWarning, ancestorsNames, prefix);
    if (newWarning === oldWarning) {
        return warning;
    }
    return createWarning({ condition: newWarning });
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} warnings
 * @param {?} ancestorsNames
 * @param {?} prefix
 * @return {?}
 */
function getInstanceWarnings(warnings, ancestorsNames, prefix) {
    /** @type {?} */
    let changed = false;
    /** @type {?} */
    const newWarnings = warnings.map((/**
     * @param {?} warning
     * @return {?}
     */
    (warning) => {
        /** @type {?} */
        const newWarning = getInstanceWarning(warning, ancestorsNames, prefix);
        if (newWarning !== warning) {
            changed = true;
        }
        return newWarning;
    }));
    return changed ? newWarnings : warnings;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} node
 * @return {?}
 */
function isRepeatingSlide(node) {
    return node != null && node.nodeType === AjfNodeType.AjfRepeatingSlide;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} nodeInstance
 * @return {?}
 */
function isRepeatingSlideInstance(nodeInstance) {
    return nodeInstance != null && nodeInstance.node != null && isSlidesInstance(nodeInstance) &&
        isRepeatingSlide(nodeInstance.node);
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} allNodes
 * @param {?} node
 * @param {?} prefix
 * @param {?} context
 * @return {?}
 */
function nodeToNodeInstance(allNodes, node, prefix, context) {
    /** @type {?} */
    let instance = null;
    /** @type {?} */
    const nodeType = node.nodeType;
    switch (nodeType) {
        case AjfNodeType.AjfField:
            /** @type {?} */
            const field = (/** @type {?} */ (node));
            if (field.fieldType > 100) {
                if (componentsMap[field.fieldType] != null
                    && componentsMap[field.fieldType].createInstance != null) {
                    instance = (/** @type {?} */ (componentsMap[field.fieldType].createInstance))({ node: (/** @type {?} */ (node)), prefix }, context);
                }
                else {
                    instance = createFieldInstance({ node: (/** @type {?} */ (node)), prefix }, context);
                }
            }
            else {
                switch (field.fieldType) {
                    case AjfFieldType.SingleChoice:
                    case AjfFieldType.MultipleChoice:
                        instance = createFieldWithChoicesInstance({ node: (/** @type {?} */ (node)), prefix }, context);
                        break;
                    case AjfFieldType.Table:
                        instance = createTableFieldInstance({ node: (/** @type {?} */ (node)), prefix }, context);
                        break;
                    default:
                        instance = createFieldInstance({ node: (/** @type {?} */ (node)), prefix }, context);
                        break;
                }
            }
            break;
        case AjfNodeType.AjfNodeGroup:
            instance = createNodeGroupInstance({ node: (/** @type {?} */ (node)), prefix });
            break;
        case AjfNodeType.AjfRepeatingSlide:
            instance = createRepeatingSlideInstance({ node: (/** @type {?} */ (node)), prefix });
            break;
        case AjfNodeType.AjfSlide:
            instance = createSlideInstance({ node: (/** @type {?} */ (node)), prefix });
            break;
    }
    if (instance != null) {
        /** @type {?} */
        const hasPrefix = prefix != null && prefix.length > 0;
        if (hasPrefix) {
            /** @type {?} */
            const ancestorsNames = getAncestorRepeatingNodesNames(allNodes, node);
            if (node.visibility != null) {
                /** @type {?} */
                const oldVisibility = node.visibility.condition;
                /** @type {?} */
                const newVisibility = normalizeExpression(oldVisibility, ancestorsNames, prefix);
                instance.visibility = newVisibility !== oldVisibility ?
                    createCondition({ condition: newVisibility }) :
                    node.visibility;
            }
            /** @type {?} */
            const conditionalBranches = instance.node.conditionalBranches != null
                && instance.node.conditionalBranches.length > 0
                ? instance.node.conditionalBranches
                : [alwaysCondition()];
            instance.conditionalBranches = getInstanceConditions(conditionalBranches, ancestorsNames, prefix);
            if (nodeType === AjfNodeType.AjfNodeGroup || nodeType === AjfNodeType.AjfRepeatingSlide) {
                /** @type {?} */
                const ngInstance = (/** @type {?} */ (instance));
                /** @type {?} */
                const formulaReps = ngInstance.node.formulaReps;
                if (formulaReps != null) {
                    /** @type {?} */
                    const oldFormula = formulaReps.formula;
                    /** @type {?} */
                    let newFormula = normalizeExpression(oldFormula, ancestorsNames, prefix);
                    ngInstance.formulaReps =
                        newFormula !== oldFormula ? createFormula({ formula: newFormula }) : formulaReps;
                }
            }
            else if (nodeType === AjfNodeType.AjfField) {
                /** @type {?} */
                const fInstance = (/** @type {?} */ (instance));
                /** @type {?} */
                const fNode = fInstance.node;
                if (fNode.formula) {
                    fInstance.formula = getInstanceFormula(fNode.formula, ancestorsNames, prefix);
                }
                if (fNode.validation != null) {
                    /** @type {?} */
                    const newConditions = getInstanceValidations(fNode.validation.conditions, ancestorsNames, prefix);
                    if (newConditions !== fNode.validation.conditions) {
                        fInstance.validation = createValidationGroup(fNode.validation);
                        fInstance.validation.conditions = newConditions;
                    }
                    else {
                        fInstance.validation = fNode.validation;
                    }
                }
                if (fNode.warning != null) {
                    /** @type {?} */
                    const newWarnings = getInstanceWarnings(fNode.warning.conditions, ancestorsNames, prefix);
                    if (newWarnings !== fNode.warning.conditions) {
                        fInstance.warning = createWarningGroup(fNode.warning);
                        fInstance.warning.conditions = newWarnings;
                    }
                    else {
                        fInstance.warning = fNode.warning;
                    }
                }
                if (fNode.nextSlideCondition != null) {
                    fInstance.nextSlideCondition =
                        getInstanceCondition(fNode.nextSlideCondition, ancestorsNames, prefix);
                }
                if (isFieldWithChoices(fNode)) {
                    /** @type {?} */
                    const fwcInstance = (/** @type {?} */ (instance));
                    /** @type {?} */
                    const fwcNode = fwcInstance.node;
                    if (fwcNode.choicesFilter != null) {
                        fwcInstance.choicesFilter =
                            getInstanceFormula(fwcNode.choicesFilter, ancestorsNames, prefix);
                    }
                    if (fwcNode.triggerConditions != null) {
                        fwcInstance.triggerConditions =
                            getInstanceConditions(fwcNode.triggerConditions, ancestorsNames, prefix);
                    }
                }
            }
        }
        else {
            instance.visibility = instance.node.visibility;
            /** @type {?} */
            const conditionalBranches = instance.node.conditionalBranches != null
                && instance.node.conditionalBranches.length > 0
                ? instance.node.conditionalBranches
                : [alwaysCondition()];
            instance.conditionalBranches = conditionalBranches;
            if (isNodeGroupInstance(instance) || isRepeatingSlideInstance(instance)) {
                /** @type {?} */
                const rgInstance = (/** @type {?} */ (instance));
                rgInstance.formulaReps = rgInstance.node.formulaReps;
            }
            else if (isFieldInstance(instance)) {
                /** @type {?} */
                const fInstance = (/** @type {?} */ (instance));
                fInstance.validation = fInstance.node.validation;
                fInstance.warning = fInstance.node.warning;
                fInstance.nextSlideCondition = fInstance.node.nextSlideCondition;
                if (isFieldWithChoicesInstance(instance)) {
                    /** @type {?} */
                    const fwcInstance = (/** @type {?} */ (instance));
                    fwcInstance.choicesFilter = fwcInstance.node.choicesFilter;
                    fwcInstance.triggerConditions = fwcInstance.node.triggerConditions;
                }
                fInstance.formula = fInstance.node.formula;
            }
        }
    }
    return instance;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} nodes
 * @return {?}
 */
function flattenNodes(nodes) {
    /** @type {?} */
    let flatNodes = [];
    nodes.forEach((/**
     * @param {?} node
     * @return {?}
     */
    (node) => {
        flatNodes.push(node);
        if (isContainerNode(node)) {
            flatNodes = flatNodes.concat(flattenNodes(((/** @type {?} */ (node))).nodes));
        }
    }));
    return flatNodes;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @param {?} nodes
 * @param {?} parent
 * @return {?}
 */
function orderedNodes(nodes, parent) {
    /** @type {?} */
    let newNodes = [];
    nodes
        .filter((/**
     * @param {?} n
     * @return {?}
     */
    (n) => parent != null ? n.parent == parent : n.parent == null || n.parent === 0))
        .sort((/**
     * @param {?} n1
     * @param {?} n2
     * @return {?}
     */
    (n1, n2) => n1.parentNode - n2.parentNode))
        .forEach((/**
     * @param {?} n
     * @return {?}
     */
    (n) => {
        newNodes.push(n);
        newNodes = newNodes.concat(orderedNodes(nodes, n.id));
    }));
    return newNodes;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} instance
 * @param {?=} context
 * @return {?}
 */
function updateRepsNum(instance, context) {
    /** @type {?} */
    const oldReps = instance.reps || 0;
    context = context || {};
    if (instance.node.formulaReps == null) {
        /** @type {?} */
        const ctxReps = context[nodeInstanceCompleteName(instance)];
        if (ctxReps != null) {
            instance.reps = ctxReps;
        }
        else if (oldReps == 0) {
            instance.reps = 1;
        }
    }
    else {
        /** @type {?} */
        let newReps = evaluateExpression(instance.node.formulaReps.formula, context);
        if (newReps !== oldReps) {
            instance.reps = newReps;
        }
    }
    instance.canAdd = instance.node.maxReps === 0 || instance.reps < instance.node.maxReps;
    instance.canRemove = instance.node.minReps === 0 || instance.reps > instance.node.minReps;
    return oldReps;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @param {?} slide
 * @param {?} idx
 * @return {?}
 */
function validSlide(slide, idx) {
    if (idx >= slide.slideNodes.length) {
        return true;
    }
    return slide.slideNodes[idx]
        .map((/**
     * @param {?} n
     * @return {?}
     */
    n => {
        if (n.visible && Object.keys(n).indexOf('valid') > -1) {
            return ((/** @type {?} */ (n))).valid;
        }
        return true;
    }))
        .reduce((/**
     * @param {?} v1
     * @param {?} v2
     * @return {?}
     */
    (v1, v2) => v1 && v2), true);
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfValidationService {
    constructor() {
        this._baseUtilFunctions = [
            `/**
        * count the number of digit contained on x.
        * @param  x the value used for digit count
        * @return the count of the digit
      */
    var digitCount = function(x) { return x.toString().length; }`,
            `/**
        * count the number of decimal contained on x.
        * @param  x the value used for decimal count
        * @return the count of the decimal
      */
    var decimalCount = function(x) {
      return (parseFloat(x).toString().split('.')[1] || []).length;
    }`,
            `/**
        * check if x is integer
        * @param  x the value used for check
        * @return true if x is a number
      */
    var isInt = function(x) { return !/[,.]/.test(x); }`,
            `/**
        * check if x is not empity
        * @param  x the value used for check
        * @return true if x defined and not null and the number of digit is > 0
      */
    var notEmpty = function (x) {
      return (typeof x !== 'undefined' && x !== null ? x.toString().length > 0 : false);
    }`,
            `/**
        * check if x is contained on array
        * @param  x the value used for check
        * @return the position of x on array or if array === x
      */
    var valueInChoice = function(array, x) { return array.indexOf(x) > -1 || array === x; }`,
            `var scanGroupField = function(reps, acc, callback) {
        for (var i = 0; i < reps; i++) {
            acc = callback(acc, i);
        }
        return acc;
    }`,
            `/**
        * sum the value contained on array
        * @param  x the array
        * @return the sum
      */
    var sum = function(array) {return array.reduce(function(a, b){ return a + b; }, 0); }`,
            `var dateOperations = function(dString, period, operation, v) {
        fmt = 'MM/DD/YYYY';
        var d = (typeof dString !== 'undefined') ? dateUtils.parse(dString) : new Date();
        if (operation == 'remove') {
          v = -v;
        }
        var dateOp;
        switch (period) {
          case 'day':
            dateOp = dateUtils.addDays;
            break;
          case 'month':
            dateOp = dateUtils.addMonths;
            break;
          case 'year':
            dateOp = dateUtils.addYears;
            break;
          default:
            return -1;
        }
        return dateUtils.format(dateOp(d, v), fmt);
      }`,
            `/**
        * round the num
        * @param  num the value to round
        * @param  digits how many digit
        * @return num rounded
      */
      var round = function(num, digits) {
        digits = digits || 0;
        var f = 0;
        try { f = parseFloat(num); } catch (e) { }
        var m = Math.pow(10, digits);
        return Math.round(f * m) / m;
      }`,
            `/**
        * extract the property of the source object with property != null
        * @param  source array of object wich contains property
        * @param  property the property on wich we want filter
        * @return array of dates
      */
      var extractArray = function(source, property, property2) {
        source = (source || []).slice(0);
        var l = source.length;
        var res = [];
        for (var i = 0; i < l ; i++) {
          if (source[i][property] != null && source[i][property2] != null) {
            res.push(source[i][property] + source[i][property2]);
          }
          else if (source[i][property] != null) {
            res.push(source[i][property]);
          }
        }
        return res;
      }`,
            `/**
        * extract the property of the source object with property != null
        * @param  source array of object wich contains property
        * @param  propertues string array the properties to sum
        * @return the sum
      */
      var extractSum = function(source, properties) {
        var sum = 0;
        properties = (properties || []).slice(0);
        var l = properties.length;

        for (var i = 0; i < l ; i++) {
          var array = extractArray(source, properties[i]);
          var leng = array.length;
          for(var j = 0; j < leng; i++) {
            sum += array[j];
          }
        }
        return sum;
      }`,
            `/**
        * extract the array of sum for each week != null
        * @param  source array of object wich contains property
        * @param  propertues string array the properties to sum
        * @return the sum
      */
      var extractArraySum = function(source, properties) {
        var arrays = [];
        properties = (properties || []).slice(0);

        for (var propI = 0; propI < properties.length ; propI++) {
          var array = extractArray(source, properties[propI]);
          arrays.push(array);
        }

        var res = [];
        for (var weekI = 0; weekI < array.length; weekI ++ ) {
          var sum = 0;
          for (var propI = 0; propI < properties.length ; propI++) {
            sum = sum + arrays[propI][weekI]
          }
          res.push(sum);
        }
        return res;
      }`,
            `/**
        * draw a threshold line on chart related to the property
        * @param  source array of object wich contains property
        * @param  property the property on wich we want filter
        * @return array of dates
      */
      var drawThreshold = function(source, property, threshold) {
        source = (source || []).slice(0);
        var l = source.length;
        var res = [];
        for (var i = 0; i < l ; i++) {
          if (source[i][property] != null) {
            res.push(threshold);
          }
        }
        return res;
      }`,
            `/**
        * extract the dates of the source object with property != null
        * @param  source array of object wich contains property and date_start
        * @param  property the property on wich we want to calculate dates
        * @param  format the format of the date
        * @return array of dates
      */
      var extractDates = function(source, property, format) {
        source = (source || []).slice(0);
        var l = source.length;
        var res = [];
        var prefix = '';
        for (var i = 0; i < l ; i++) {
          if (source[i][property] != null) {
            switch(format) {
              case "WW":
                prefix = "W";
                break;
              case "MM":
                prefix = "M";
                break;
              default:
                prefix = "";
            }
            res.push(prefix + formatDate(source[i]["date_start"], format));
          }
        }
        return res;
      }`,
            `/**
        * extract the last property contains in source != null
        * @param  source array of object wich contains property and date_start
        * @param  property the property to find
        * @return the last property != null
      */
      var lastProperty = function(source, property) {
        source = (source || []).slice(0);
        var l = source.length -1;

        while (l >= 0 && source[l][property] == null) {
          l--;
          if (l < 0) return 0;
        }
        return l >= 0 ? source[l][property] : 0;
      }`,
            `var sumLastProperties = function(source, properties) {
        source = (source || []).slice(0);
        var sum = 0;
        for (var i = 0; i < properties.length; i++) {
          sum += lastProperty(source, properties[i]);
        }

        return sum;
      }`,
            `/**
        * compute the trend of the property contained on the source.
        * @param  source array of object wich contains property
        * @param  property the property on wich we want to calculate the trend
        * @return an html icon that identifies the trend
      */
      var calculateTrendProperty = function(source, property) {
        source = (source || []).slice(0);
        var last = source.length - 1;
        while (source[last][property] == null) {
          if (last == 0) {
            break;
          }
          last--;
        }
        var lastLast = last - 1;
        if (last == 0) {
          lastLast = last;
        } else {
          while (source[lastLast][property] == null) {
            if (lastLast == 0) {
              lastLast = last;
              break;
            }
            lastLast--;
          }
        }

        var lastProperty = source[last]?(source[last][property] || 0): 0;
        var lastLastProperty = source[lastLast]?(source[lastLast][property] || 0): 0;

        if (lastProperty == lastLastProperty) {
          return '<p><i class="material-icons" style="color:blue">trending_flat</i></p>';
        } else if (lastProperty > lastLastProperty) {
          return '<p><i class="material-icons" style="color:green">trending_up</i></p>';
        } else {
          return '<p><i class="material-icons" style="color:red">trending_down</i></p>';
        }
      }`,
            `/**
        * compute the average value of the property contained on the source.
        * @param  source array of object wich contains property
        * @param  property the property on wich we want to calculate the average
        * @param  range the range on wich we want to calculate the average
        * @param  coefficent the coefficent used for calculate the threshold
                  if coefficent is 0 mean return the count of property > 0
        * @return the average value || the count of property > 0
      */
      var calculateAvgProperty = function(source, property, range, coefficient) {
        source = (source || []).slice(0);

        source.pop();

        coefficient = coefficient || 1;
        range = range || 12;

        var l = source.length;
        var res = 0;
        var counter = 0;
        var noZero = 0;

        if(l < range) {
          range = l;
        }

        while (range != 0) {
          counter++;
          if (source[l - 1][property] != null) {
            res += source[l - 1][property];

            if (source[l - 1][property] > 0) {
              noZero++;
            }
          }
          l--;
          range--;
        }

        if (coefficient == 0) {
          return noZero;
        } else {
          var threshold = (res/counter)*coefficient || 0;
          return threshold;
        }
      }`,
            `var alert = function(source, property, threshold, fmt) {
        source = (source || []).slice(0);
        var l = source.length;

        if ( lastProperty(source, property)  > threshold ) {
          return '<p><i class="material-icons" style="color:red">warning</i></p>';
          } else {
            return '<p></p>';
          }
      }`,
            `var formatNumber = function(num, fmt) {
        fmt = fmt || '0,0[.]0';
        return numeral(num).format(fmt);
      }`,
            `var formatDate = function(date, fmt) {
        fmt = fmt || 'MM-DD-YYYY';
        return dateUtils.format(date, fmt);
      }`,
            `var isoMonth = function(date, fmt) {
        fmt = fmt || 'MM';
        var du = dateUtils;
        return du.format(du.addDays(du.startOfMonth(date), 4),fmt)
      }`,
            `var nextCounterValue = function(counterName, firstValue) {
        firstValue = firstValue != null ? firstValue : 0;
        if (execContext['$$'+counterName] == null) {
          execContext['$$'+counterName] = firstValue;
        } else {
          execContext['$$'+counterName]++;
        }
        return execContext['$$'+counterName];
      }`,
            `var getCoordinate = function(source, zoom) {
        zoom = zoom || 6;
        if(source == null) {
          return [51.505,-0.09, zoom];
        } else {
          return [source[0], source[1], zoom];
        }
      }`
        ];
        this._functions = [];
        this._functionsStr = '';
        this._initFunctions();
    }
    /**
     * @param {?} f
     * @return {?}
     */
    addFunction(f) {
        this._functions.push(f);
        this._initFunctions();
    }
    /**
     * @param {?} name
     * @param {?} fn
     * @return {?}
     */
    addFunctionHandler(name, fn) {
        if (AjfExpressionUtils.utils[name] === undefined) {
            AjfExpressionUtils.utils[name] = { fn };
        }
    }
    /**
     * @private
     * @return {?}
     */
    _initFunctions() {
        /** @type {?} */
        const functionsStr = this._functions
            .map((/**
         * @param {?} f
         * @return {?}
         */
        f => typeof f === 'string' ? f : f.toString()))
            .join('; ');
        this._functionsStr = `${this._baseUtilFunctions.join('; ')}; ${functionsStr}`;
        AjfExpressionUtils.UTIL_FUNCTIONS = this._functionsStr;
    }
}
AjfValidationService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
AjfValidationService.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const esprimaMod = esprima__default || esprima;
const { tokenize } = esprimaMod;
/** @enum {number} */
const AjfFormInitStatus = {
    Initializing: 0,
    Complete: 1,
};
AjfFormInitStatus[AjfFormInitStatus.Initializing] = 'Initializing';
AjfFormInitStatus[AjfFormInitStatus.Complete] = 'Complete';
class AjfFormRendererService {
    /**
     * @param {?} _
     */
    constructor(_) {
        this._visibilityNodesMapUpdates = new Subject();
        this._repetitionNodesMapUpdates = new Subject();
        this._conditionalBranchNodesMapUpdates = new Subject();
        this._formulaNodesMapUpdates = new Subject();
        this._validationNodesMapUpdates = new Subject();
        this._warningNodesMapUpdates = new Subject();
        this._filteredChoicesNodesMapUpdates = new Subject();
        this._triggerConditionsNodesMapUpdates = new Subject();
        this._nextSlideConditionsNodesMapUpdates = new Subject();
        this._formInitEvent = new EventEmitter();
        this.formInitEvent = this._formInitEvent.asObservable();
        this._formGroup = new BehaviorSubject(null);
        this.formGroup = this._formGroup.asObservable();
        this._form = new BehaviorSubject(null);
        this._nodesUpdates = new Subject();
        this._formGroupSubscription = Subscription.EMPTY;
        this._valueChanged = new Subject();
        this._nextSlideTrigger = new EventEmitter();
        this.nextSlideTrigger = this._nextSlideTrigger.asObservable();
        this._slidesNum = new BehaviorSubject(0);
        this.slidesNum = this._slidesNum.asObservable();
        this._initUpdateMapStreams();
        this._initNodesStreams();
        this._initErrorsStreams();
        this._initFormStreams();
        this._updateFormValueAndValidity();
    }
    /**
     * @return {?}
     */
    get nodesTree() {
        return this._flatNodesTree;
    }
    /**
     * @return {?}
     */
    get errorPositions() { return this._errorPositions; }
    /**
     * @return {?}
     */
    get errors() { return this._errors; }
    /**
     * @return {?}
     */
    get currentSupplementaryInformations() {
        /** @type {?} */
        const form = this._form.getValue();
        return form != null && form.form != null ? form.form.supplementaryInformations : null;
    }
    /**
     * @param {?} form
     * @param {?=} context
     * @return {?}
     */
    setForm(form, context = {}) {
        this._initUpdateMapStreams();
        if (form != null && Object.keys(context).length === 0 &&
            Object.keys(form.initContext || {}).length > 0) {
            context = form.initContext || {};
        }
        /** @type {?} */
        const currentForm = this._form.getValue();
        if ((currentForm == null && form != null) ||
            (currentForm != null && form !== currentForm.form)) {
            this._form.next({ form: form, context: context });
        }
    }
    /**
     * @return {?}
     */
    getFormValue() {
        /** @type {?} */
        const formGroup = this._formGroup.getValue();
        if (formGroup == null) {
            return {};
        }
        /** @type {?} */
        let res = deepCopy(formGroup.value);
        return res;
    }
    /**
     * @param {?} group
     * @return {?}
     */
    addGroup(group) {
        return new Observable((/**
         * @param {?} subscriber
         * @return {?}
         */
        (subscriber) => {
            if (group.formulaReps != null) {
                subscriber.next(false);
                subscriber.complete();
                return;
            }
            /** @type {?} */
            const maxReps = group.node.maxReps;
            if (maxReps > 0 && group.reps + 1 > maxReps) {
                subscriber.next(false);
                subscriber.complete();
                return;
            }
            /** @type {?} */
            const oldReps = group.reps;
            group.reps = group.reps + 1;
            group.canAdd = group.node.maxReps === 0 || group.reps < group.node.maxReps;
            group.canRemove = group.node.minReps === 0 || group.reps > group.node.minReps;
            this._nodesUpdates.next((/**
             * @param {?} nodes
             * @return {?}
             */
            (nodes) => {
                /** @type {?} */
                const flatNodes = flattenNodesInstances(nodes, true);
                this._adjustReps(flatNodes, group, oldReps, this.getFormValue());
                subscriber.next(true);
                subscriber.complete();
                return nodes;
            }));
        }));
    }
    /**
     * @param {?} group
     * @return {?}
     */
    removeGroup(group) {
        return new Observable((/**
         * @param {?} subscriber
         * @return {?}
         */
        (subscriber) => {
            if (group.formulaReps != null) {
                subscriber.next(false);
                subscriber.complete();
                return;
            }
            /** @type {?} */
            const minReps = group.node.minReps;
            if (group.reps - 1 < minReps) {
                subscriber.next(false);
                subscriber.complete();
                return;
            }
            /** @type {?} */
            const oldReps = group.reps;
            group.reps = group.reps - 1;
            group.canAdd = group.node.maxReps === 0 || group.reps < group.node.maxReps;
            group.canRemove = group.node.minReps === 0 || group.reps > group.node.minReps;
            this._nodesUpdates.next((/**
             * @param {?} nodes
             * @return {?}
             */
            (nodes) => {
                this._adjustReps(nodes, group, oldReps, this.getFormValue());
                subscriber.next(true);
                subscriber.complete();
                return nodes;
            }));
        }));
    }
    /**
     * @param {?} field
     * @return {?}
     */
    getControl(field) {
        return this.formGroup.pipe(map((/**
         * @param {?} f
         * @return {?}
         */
        (f) => {
            /** @type {?} */
            const fieldName = nodeInstanceCompleteName(field);
            return f != null && f.contains(fieldName) ? f.controls[fieldName] : null;
        })));
    }
    /**
     * @private
     * @return {?}
     */
    _initErrorsStreams() {
        this._errorPositions = this._valueChanged.pipe(withLatestFrom(this._nodes, this._form), filter((/**
         * @param {?} v
         * @return {?}
         */
        v => v[2] != null && v[2].form != null)), map((/**
         * @param {?} v
         * @return {?}
         */
        (v) => {
            /** @type {?} */
            const nodes = v[1];
            /** @type {?} */
            const form = (/** @type {?} */ ((/** @type {?} */ (v[2])).form));
            /** @type {?} */
            let currentPosition = 0;
            /** @type {?} */
            const errors = [];
            nodes.forEach((/**
             * @param {?} node
             * @return {?}
             */
            (node) => {
                if (node.node.nodeType === AjfNodeType.AjfRepeatingSlide) {
                    /** @type {?} */
                    const rsNode = (/** @type {?} */ (node));
                    for (let i = 0; i < rsNode.reps; i++) {
                        if (node.visible) {
                            currentPosition++;
                            if (i == 0) {
                                rsNode.position = currentPosition;
                            }
                            if (!validSlide(rsNode, i)) {
                                errors.push(currentPosition);
                            }
                        }
                    }
                }
                else if (node.node.nodeType === AjfNodeType.AjfSlide) {
                    /** @type {?} */
                    const sNode = (/** @type {?} */ (node));
                    if (sNode.visible) {
                        currentPosition++;
                        sNode.position = currentPosition;
                        if (!sNode.valid) {
                            errors.push(currentPosition);
                        }
                    }
                }
            }));
            form.valid = errors.length == 0;
            this._slidesNum.next(currentPosition);
            return errors;
        })), publishReplay(), refCount());
        this._errors = this._errorPositions.pipe(map((/**
         * @param {?} e
         * @return {?}
         */
        e => e != null ? e.length : 0)), startWith(0), publishReplay(), refCount());
    }
    /**
     * @private
     * @return {?}
     */
    _initUpdateMapStreams() {
        this._visibilityNodesMap =
            ((/** @type {?} */ (this._visibilityNodesMapUpdates)))
                .pipe(scan((/**
             * @param {?} rmap
             * @param {?} op
             * @return {?}
             */
            (rmap, op) => {
                return op(rmap);
            }), {}), startWith({}), share());
        this._repetitionNodesMap =
            ((/** @type {?} */ (this._repetitionNodesMapUpdates)))
                .pipe(scan((/**
             * @param {?} rmap
             * @param {?} op
             * @return {?}
             */
            (rmap, op) => {
                return op(rmap);
            }), {}), startWith({}), share());
        this._conditionalBranchNodesMap =
            ((/** @type {?} */ (this._conditionalBranchNodesMapUpdates)))
                .pipe(scan((/**
             * @param {?} rmap
             * @param {?} op
             * @return {?}
             */
            (rmap, op) => {
                return op(rmap);
            }), {}), startWith({}), share());
        this._formulaNodesMap =
            ((/** @type {?} */ (this._formulaNodesMapUpdates)))
                .pipe(scan((/**
             * @param {?} rmap
             * @param {?} op
             * @return {?}
             */
            (rmap, op) => {
                return op(rmap);
            }), {}), startWith({}), share());
        this._validationNodesMap =
            ((/** @type {?} */ (this._validationNodesMapUpdates)))
                .pipe(scan((/**
             * @param {?} rmap
             * @param {?} op
             * @return {?}
             */
            (rmap, op) => {
                return op(rmap);
            }), {}), startWith({}), share());
        this._warningNodesMap =
            ((/** @type {?} */ (this._warningNodesMapUpdates)))
                .pipe(scan((/**
             * @param {?} rmap
             * @param {?} op
             * @return {?}
             */
            (rmap, op) => {
                return op(rmap);
            }), {}), startWith({}), share());
        this._filteredChoicesNodesMap =
            ((/** @type {?} */ (this._filteredChoicesNodesMapUpdates)))
                .pipe(scan((/**
             * @param {?} rmap
             * @param {?} op
             * @return {?}
             */
            (rmap, op) => {
                return op(rmap);
            }), {}), startWith({}), share());
        this._triggerConditionsNodesMap =
            ((/** @type {?} */ (this._triggerConditionsNodesMapUpdates)))
                .pipe(scan((/**
             * @param {?} rmap
             * @param {?} op
             * @return {?}
             */
            (rmap, op) => {
                return op(rmap);
            }), {}), startWith({}), share());
        this._nextSlideConditionsNodesMap =
            ((/** @type {?} */ (this._nextSlideConditionsNodesMapUpdates)))
                .pipe(scan((/**
             * @param {?} rmap
             * @param {?} op
             * @return {?}
             */
            (rmap, op) => {
                return op(rmap);
            }), {}), startWith({}), share());
        this._nodesMaps = [
            this._visibilityNodesMap,
            this._repetitionNodesMap,
            this._conditionalBranchNodesMap,
            this._formulaNodesMap,
            this._validationNodesMap,
            this._warningNodesMap,
            this._nextSlideConditionsNodesMap,
            this._filteredChoicesNodesMap,
            this._triggerConditionsNodesMap
        ];
    }
    /**
     * @private
     * @return {?}
     */
    _initFormStreams() {
        /** @type {?} */
        const formObs = (/** @type {?} */ (this._form));
        formObs
            .pipe(map((/**
         * @param {?} _form
         * @return {?}
         */
        (_form) => {
            return this._initFormGroupStreams(new FormGroup({}));
        })))
            .subscribe(this._formGroup);
        formObs
            .pipe(map((/**
         * @param {?} form
         * @return {?}
         */
        (form) => {
            return (/**
             * @param {?} _nodesInstances
             * @return {?}
             */
            (_nodesInstances) => {
                /** @type {?} */
                const nodes = form != null && form.form != null ?
                    this._orderedNodesInstancesTree(flattenNodes(form.form.nodes), form.form.nodes, undefined, [], form.context || {}) :
                    [];
                /** @type {?} */
                let currentPosition = 0;
                nodes.forEach((/**
                 * @param {?} node
                 * @return {?}
                 */
                (node) => {
                    if (node.node.nodeType === AjfNodeType.AjfRepeatingSlide) {
                        /** @type {?} */
                        const rsNode = (/** @type {?} */ (node));
                        for (let i = 0; i < rsNode.reps; i++) {
                            if (node.visible) {
                                currentPosition++;
                                if (i == 0) {
                                    rsNode.position = currentPosition;
                                }
                            }
                        }
                    }
                    else if (node.node.nodeType === AjfNodeType.AjfSlide) {
                        /** @type {?} */
                        const sNode = (/** @type {?} */ (node));
                        if (sNode.visible) {
                            currentPosition++;
                            sNode.position = currentPosition;
                        }
                    }
                }));
                return nodes;
            });
        })))
            .subscribe(this._nodesUpdates);
    }
    /**
     * @private
     * @param {?} allNodes
     * @param {?} node
     * @param {?} prefix
     * @param {?} context
     * @param {?=} branchVisibility
     * @return {?}
     */
    _initNodeInstance(allNodes, node, prefix, context, branchVisibility = true) {
        /** @type {?} */
        let instance = nodeToNodeInstance(allNodes, node, prefix, context);
        if (instance != null) {
            /** @type {?} */
            const nodeType = instance.node.nodeType;
            if (nodeType === AjfNodeType.AjfNodeGroup || nodeType === AjfNodeType.AjfRepeatingSlide) {
                this._explodeRepeatingNode(allNodes, (/** @type {?} */ (instance)), context);
            }
            else if (nodeType === AjfNodeType.AjfSlide) {
                /** @type {?} */
                const sInstance = (/** @type {?} */ (instance));
                sInstance.nodes = this._orderedNodesInstancesTree(allNodes, sInstance.node.nodes, sInstance.node.id, prefix, context);
            }
            updateVisibility(instance, context, branchVisibility);
            updateConditionalBranches(instance, context);
            if (nodeType === AjfNodeType.AjfField) {
                /** @type {?} */
                const fInstance = (/** @type {?} */ (instance));
                if (isCustomFieldWithChoices(fInstance.node) || isFieldWithChoices(fInstance.node)) {
                    updateFilteredChoices((/** @type {?} */ (fInstance)), context);
                }
                else {
                    if (isTableFieldInstance(fInstance)) {
                        /** @type {?} */
                        const tfInstance = (/** @type {?} */ (fInstance));
                        /** @type {?} */
                        const tNode = tfInstance.node;
                        tfInstance.context = context[nodeInstanceCompleteName(tfInstance)] || context;
                        if (!tNode.editable) {
                            /** @type {?} */
                            const value = [];
                            value.push([tNode.label, tNode.columnLabels]);
                            tNode.rows.forEach((/**
                             * @param {?} row
                             * @param {?} rowIndex
                             * @return {?}
                             */
                            (row, rowIndex) => {
                                value.push([tNode.rowLabels[rowIndex], row.map((/**
                                     * @param {?} k
                                     * @return {?}
                                     */
                                    k => {
                                        tfInstance.context[k] = context[k];
                                        return context[k];
                                    }))]);
                            }));
                            tfInstance.value = value;
                        }
                        else {
                            /** @type {?} */
                            const formGroup = this._formGroup.getValue();
                            /** @type {?} */
                            let controlsWithLabels = [];
                            controlsWithLabels.push([node.label, tNode.columnLabels]);
                            tNode.rows.forEach((/**
                             * @param {?} row
                             * @param {?} idx
                             * @return {?}
                             */
                            (row, idx) => {
                                /** @type {?} */
                                let r = [];
                                row.forEach((/**
                                 * @param {?} k
                                 * @return {?}
                                 */
                                (k) => {
                                    /** @type {?} */
                                    const control = new FormControl();
                                    control.setValue(tfInstance.context[k]);
                                    if (formGroup != null) {
                                        formGroup.registerControl(k, control);
                                    }
                                    r.push(control);
                                }));
                                controlsWithLabels.push([tNode.rowLabels[idx], r]);
                            }));
                            tfInstance.controls = controlsWithLabels;
                        }
                    }
                    else {
                        fInstance.value = context[nodeInstanceCompleteName(instance)];
                    }
                    updateFieldInstanceState(fInstance, context);
                }
            }
            this._addNodeInstance(instance);
        }
        return instance;
    }
    /**
     * @private
     * @param {?} allNodes
     * @param {?} instance
     * @param {?} oldReps
     * @param {?} context
     * @return {?}
     */
    _adjustReps(allNodes, instance, oldReps, context) {
        /** @type {?} */
        const newReps = instance.reps;
        /** @type {?} */
        const result = {
            added: null,
            removed: null
        };
        if (oldReps < newReps) {
            /** @type {?} */
            const newNodes = [];
            if (instance.nodes == null) {
                instance.nodes = [];
            }
            if (instance.node.nodeType === AjfNodeType.AjfNodeGroup) {
                /** @type {?} */
                const node = (/** @type {?} */ (createField({
                    id: 999,
                    name: '',
                    parent: -1,
                    fieldType: AjfFieldType.Empty,
                    label: instance.node.label
                })));
                /** @type {?} */
                const newInstance = this._initNodeInstance(allNodes, node, instance.prefix.slice(0), context);
                if (newInstance != null) {
                    instance.nodes.push(newInstance);
                }
            }
            for (let i = oldReps; i < newReps; i++) {
                /** @type {?} */
                const prefix = instance.prefix.slice(0);
                /** @type {?} */
                const group = instance.node;
                prefix.push(i);
                orderedNodes(group.nodes, instance.node.id)
                    .forEach((/**
                 * @param {?} n
                 * @return {?}
                 */
                (n) => {
                    /** @type {?} */
                    const newInstance = this._initNodeInstance(allNodes, n, prefix, context);
                    if (newInstance != null) {
                        newNodes.push(newInstance);
                        instance.nodes.push(newInstance);
                    }
                }));
                this._addNodeInstance(instance);
            }
            result.added = newNodes;
        }
        else if (oldReps > newReps) {
            /** @type {?} */
            let nodesNum = instance.nodes.length / oldReps;
            if (instance.node.nodeType === AjfNodeType.AjfNodeGroup) {
                nodesNum++;
            }
            result.removed = instance.nodes.splice(newReps * nodesNum, nodesNum);
            result.removed.forEach(((/**
             * @param {?} n
             * @return {?}
             */
            n => {
                this._removeNodeInstance(n);
            })));
        }
        if (oldReps != newReps && instance.formulaReps == null) {
            /** @type {?} */
            const fg = this._formGroup.getValue();
            /** @type {?} */
            const completeName = nodeInstanceCompleteName(instance);
            if (fg != null && fg.contains(completeName)) {
                fg.controls[completeName].setValue(instance.reps);
            }
        }
        instance.flatNodes = flattenNodesInstances(instance.nodes);
        if (instance.node.nodeType === AjfNodeType.AjfRepeatingSlide) {
            /** @type {?} */
            const rsInstance = (/** @type {?} */ (instance));
            /** @type {?} */
            const slideNodes = [];
            /** @type {?} */
            const nodesPerSlide = rsInstance.nodes != null ? rsInstance.nodes.length / rsInstance.reps : 0;
            for (let i = 0; i < instance.reps; i++) {
                /** @type {?} */
                const startNode = i * nodesPerSlide;
                slideNodes.push(instance.nodes.slice(startNode, startNode + nodesPerSlide));
            }
            rsInstance.slideNodes = slideNodes;
        }
        return result;
    }
    /**
     * @private
     * @return {?}
     */
    _updateFormValueAndValidity() {
        this._nodesUpdates.asObservable()
            .pipe(withLatestFrom(this._formGroup), filter((/**
         * @param {?} values
         * @return {?}
         */
        (values) => values[1] !== null)))
            .subscribe((/**
         * @param {?} values
         * @return {?}
         */
        (values) => {
            /** @type {?} */
            const form = (/** @type {?} */ (values[1]));
            form.updateValueAndValidity();
        }));
    }
    /**
     * @private
     * @param {?} allNodes
     * @param {?} instance
     * @param {?} context
     * @return {?}
     */
    _explodeRepeatingNode(allNodes, instance, context) {
        /** @type {?} */
        const oldReps = updateRepsNum(instance, context);
        if (oldReps !== instance.reps) {
            this._adjustReps(allNodes, instance, oldReps, context);
        }
    }
    /**
     * @private
     * @param {?} allNodes
     * @param {?} nodes
     * @param {?=} parent
     * @param {?=} prefix
     * @param {?=} context
     * @return {?}
     */
    _orderedNodesInstancesTree(allNodes, nodes, parent = null, prefix = [], context) {
        /** @type {?} */
        let nodesInstances = [];
        /** @type {?} */
        const curSuffix = prefix.length > 0 ? '__' + prefix.join('__') : '';
        orderedNodes(nodes, parent).forEach((/**
         * @param {?} node
         * @return {?}
         */
        (node) => {
            /** @type {?} */
            const parentNodeInstance = nodesInstances.find((/**
             * @param {?} ni
             * @return {?}
             */
            ni => ni.node.id == node.parent && nodeInstanceSuffix(ni) == curSuffix));
            /** @type {?} */
            const branchVisibility = parentNodeInstance != null ?
                parentNodeInstance.verifiedBranch != null &&
                    parentNodeInstance.verifiedBranch == node.parentNode :
                true;
            /** @type {?} */
            const nni = this._initNodeInstance(allNodes, node, prefix, context, branchVisibility);
            if (nni != null) {
                nodesInstances.push(nni);
            }
        }));
        return nodesInstances;
    }
    /**
     * @private
     * @param {?} oldValue
     * @param {?} newValue
     * @return {?}
     */
    _formValueDelta(oldValue, newValue) {
        return Object.keys(newValue)
            .filter((/**
         * @param {?} k
         * @return {?}
         */
        (k) => oldValue[k] !== newValue[k]));
    }
    /**
     * @private
     * @param {?} formGroup
     * @return {?}
     */
    _initFormGroupStreams(formGroup) {
        this._formGroupSubscription.unsubscribe();
        /** @type {?} */
        let init = true;
        /** @type {?} */
        let initForm = true;
        this._formInitEvent.emit(AjfFormInitStatus.Initializing);
        this._formGroupSubscription =
            formGroup.valueChanges
                .pipe(startWith({}), pairwise(), debounceTime(200), withLatestFrom(...(this._nodesMaps), this._flatNodes))
                .subscribe((/**
             * @param {?} v
             * @return {?}
             */
            (v) => {
                /** @type {?} */
                const oldFormValue = init && {} || v[0][0];
                init = false;
                /** @type {?} */
                const newFormValue = v[0][1];
                /** @type {?} */
                const visibilityMap = v[1];
                /** @type {?} */
                const repetitionMap = v[2];
                /** @type {?} */
                const conditionalBranchesMap = v[3];
                /** @type {?} */
                const formulaMap = v[4];
                /** @type {?} */
                const validationMap = v[5];
                /** @type {?} */
                const warningMap = v[6];
                /** @type {?} */
                const nextSlideConditionsMap = v[7];
                /** @type {?} */
                const filteredChoicesMap = v[8];
                /** @type {?} */
                const triggerConditionsMap = v[9];
                /** @type {?} */
                const nodes = v[10];
                /** @type {?} */
                const delta = this._formValueDelta(oldFormValue, newFormValue);
                /** @type {?} */
                const deltaLen = delta.length;
                /** @type {?} */
                let updatedNodes = [];
                delta.forEach((/**
                 * @param {?} fieldName
                 * @return {?}
                 */
                (fieldName) => {
                    updatedNodes = updatedNodes.concat(nodes.filter((/**
                     * @param {?} n
                     * @return {?}
                     */
                    n => nodeInstanceCompleteName(n) === fieldName)));
                    if (visibilityMap[fieldName] != null) {
                        visibilityMap[fieldName].forEach((/**
                         * @param {?} nodeInstance
                         * @return {?}
                         */
                        nodeInstance => {
                            /** @type {?} */
                            const completeName = nodeInstanceCompleteName(nodeInstance);
                            /** @type {?} */
                            const visibilityChanged = updateVisibility(nodeInstance, newFormValue);
                            /** @type {?} */
                            const isField = isFieldInstance(nodeInstance);
                            if (visibilityChanged && !nodeInstance.visible) {
                                /** @type {?} */
                                const fg = this._formGroup.getValue();
                                if (fg != null) {
                                    /** @type {?} */
                                    const s = timer(200).subscribe((/**
                                     * @return {?}
                                     */
                                    () => {
                                        if (s && !s.closed) {
                                            s.unsubscribe();
                                        }
                                        fg.controls[completeName].setValue(null);
                                    }));
                                }
                                if (isField) {
                                    ((/** @type {?} */ (nodeInstance))).value = null;
                                }
                            }
                            else if (visibilityChanged && nodeInstance.visible && isField) {
                                /** @type {?} */
                                const fg = this._formGroup.getValue();
                                /** @type {?} */
                                const res = updateFormula((/** @type {?} */ (nodeInstance)), newFormValue);
                                if (fg != null && res.changed) {
                                    fg.controls[completeName].setValue(res.value);
                                }
                            }
                            if (updatedNodes.indexOf(nodeInstance) === -1) {
                                updatedNodes.push(nodeInstance);
                            }
                        }));
                    }
                    if (repetitionMap[fieldName] != null) {
                        repetitionMap[fieldName].forEach((/**
                         * @param {?} nodeInstance
                         * @return {?}
                         */
                        nodeInstance => {
                            if (isRepeatingContainerNode(nodeInstance.node)) {
                                /** @type {?} */
                                const rnInstance = (/** @type {?} */ (nodeInstance));
                                /** @type {?} */
                                const oldReps = updateRepsNum(rnInstance, newFormValue);
                                if (oldReps !== rnInstance.reps) {
                                    this._adjustReps(nodes, rnInstance, oldReps, newFormValue);
                                }
                            }
                            if (updatedNodes.indexOf(nodeInstance) === -1) {
                                updatedNodes.push(nodeInstance);
                            }
                        }));
                    }
                    if (conditionalBranchesMap[fieldName] != null) {
                        conditionalBranchesMap[fieldName].forEach((/**
                         * @param {?} nodeInstance
                         * @return {?}
                         */
                        (nodeInstance) => {
                            // const branchChanged = nodeInstance.updateConditionalBranches(newFormValue);
                            updateConditionalBranches(nodeInstance, newFormValue);
                            // if (branchChanged) {
                            /** @type {?} */
                            const verifiedBranch = nodeInstance.verifiedBranch;
                            nodeInstance.conditionalBranches.forEach((/**
                             * @param {?} _condition
                             * @param {?} idx
                             * @return {?}
                             */
                            (_condition, idx) => {
                                if (idx == verifiedBranch) {
                                    this._showSubtree(newFormValue, nodes, nodeInstance, idx);
                                }
                                else {
                                    this._hideSubtree(newFormValue, nodes, nodeInstance, idx);
                                }
                            }));
                            // }
                            if (updatedNodes.indexOf(nodeInstance) === -1) {
                                updatedNodes.push(nodeInstance);
                            }
                        }));
                    }
                    if (formulaMap[fieldName] != null) {
                        formulaMap[fieldName].forEach((/**
                         * @param {?} nodeInstance
                         * @return {?}
                         */
                        (nodeInstance) => {
                            if (isFieldInstance(nodeInstance)) {
                                /** @type {?} */
                                const fInstance = (/** @type {?} */ (nodeInstance));
                                /** @type {?} */
                                const res = updateFormula(fInstance, newFormValue);
                                /** @type {?} */
                                const fg = this._formGroup.getValue();
                                if (fg != null && res.changed) {
                                    updateValidation(fInstance, newFormValue);
                                    fg.controls[nodeInstanceCompleteName(nodeInstance)].setValue(res.value);
                                }
                            }
                            if (updatedNodes.indexOf(nodeInstance) === -1) {
                                updatedNodes.push(nodeInstance);
                            }
                        }));
                    }
                    if (validationMap[fieldName] != null) {
                        validationMap[fieldName].forEach((/**
                         * @param {?} nodeInstance
                         * @return {?}
                         */
                        (nodeInstance) => {
                            if (isFieldInstance(nodeInstance)) {
                                /** @type {?} */
                                const fInstance = (/** @type {?} */ (nodeInstance));
                                newFormValue.$value = newFormValue[nodeInstanceCompleteName(nodeInstance)];
                                updateValidation(fInstance, newFormValue, this.currentSupplementaryInformations);
                            }
                            if (updatedNodes.indexOf(nodeInstance) === -1) {
                                updatedNodes.push(nodeInstance);
                            }
                        }));
                    }
                    if (warningMap[fieldName] != null) {
                        warningMap[fieldName].forEach((/**
                         * @param {?} nodeInstance
                         * @return {?}
                         */
                        (nodeInstance) => {
                            if (isFieldInstance(nodeInstance)) {
                                /** @type {?} */
                                const fInstance = (/** @type {?} */ (nodeInstance));
                                updateWarning(fInstance, newFormValue);
                                if (fInstance.warningResults != null &&
                                    fInstance.warningResults.filter((/**
                                     * @param {?} warning
                                     * @return {?}
                                     */
                                    warning => warning.result)).length > 0) {
                                    fInstance.warningTrigger.emit();
                                }
                            }
                            if (updatedNodes.indexOf(nodeInstance) === -1) {
                                updatedNodes.push(nodeInstance);
                            }
                        }));
                    }
                    if (deltaLen == 1 && nextSlideConditionsMap[fieldName] != null) {
                        if (nextSlideConditionsMap[fieldName]
                            .filter((/**
                         * @param {?} nodeInstance
                         * @return {?}
                         */
                        (nodeInstance) => {
                            if (isFieldInstance(nodeInstance)) {
                                /** @type {?} */
                                const fInstance = (/** @type {?} */ (nodeInstance));
                                return updateNextSlideCondition(fInstance, newFormValue);
                            }
                            return false;
                        }))
                            .length == 1) {
                            this._nextSlideTrigger.emit();
                        }
                    }
                    if (filteredChoicesMap[fieldName] != null) {
                        filteredChoicesMap[fieldName].forEach((/**
                         * @param {?} nodeInstance
                         * @return {?}
                         */
                        (nodeInstance) => {
                            if (isFieldInstance(nodeInstance)) {
                                /** @type {?} */
                                const fInstance = (/** @type {?} */ (nodeInstance));
                                if (isFieldWithChoices(fInstance.node)) {
                                    updateFilteredChoices((/** @type {?} */ (fInstance)), newFormValue);
                                }
                            }
                            if (updatedNodes.indexOf(nodeInstance) === -1) {
                                updatedNodes.push(nodeInstance);
                            }
                        }));
                    }
                    if (deltaLen == 1 && triggerConditionsMap[fieldName] != null) {
                        /** @type {?} */
                        const res = triggerConditionsMap[fieldName].filter((/**
                         * @param {?} nodeInstance
                         * @return {?}
                         */
                        (nodeInstance) => {
                            if (!isFieldInstance(nodeInstance)) {
                                return false;
                            }
                            /** @type {?} */
                            const fInstance = (/** @type {?} */ (nodeInstance));
                            if (!isFieldWithChoices(fInstance.node)) {
                                return false;
                            }
                            return updateTriggerConditions((/** @type {?} */ (fInstance)), newFormValue);
                        }));
                        if (res.length == 1) {
                            ((/** @type {?} */ (res[0]))).selectionTrigger.emit();
                        }
                    }
                }));
                updatedNodes.forEach((/**
                 * @param {?} n
                 * @return {?}
                 */
                n => {
                    /** @type {?} */
                    const nodeIdx = nodes.indexOf(n);
                    /** @type {?} */
                    let idx = nodeIdx - 1;
                    while (idx >= 0) {
                        /** @type {?} */
                        const curNode = nodes[idx];
                        if (isSlidesInstance(curNode)) {
                            /** @type {?} */
                            const slide = (/** @type {?} */ (curNode));
                            /** @type {?} */
                            const subNodesNum = slide.flatNodes.length;
                            /** @type {?} */
                            let valid = true;
                            for (let i = 0; i < subNodesNum; i++) {
                                /** @type {?} */
                                const subNode = slide.flatNodes[i];
                                if (subNode.visible && isFieldInstance(subNode)
                                    && !((/** @type {?} */ (subNode))).valid) {
                                    valid = false;
                                    break;
                                }
                            }
                            if (slide.valid !== valid) {
                                slide.valid = valid;
                            }
                            slide.updatedEvt.emit();
                        }
                        idx--;
                    }
                    n.updatedEvt.emit();
                }));
                if (initForm) {
                    initForm = false;
                    this._formInitEvent.emit(AjfFormInitStatus.Complete);
                }
                this._valueChanged.next();
            }));
        return formGroup;
    }
    /**
     * @private
     * @param {?} context
     * @param {?} nodes
     * @param {?} node
     * @param {?=} branch
     * @return {?}
     */
    _showSubtree(context, nodes, node, branch) {
        this._updateSubtreeVisibility(context, nodes, node, true, branch);
    }
    /**
     * @private
     * @param {?} context
     * @param {?} nodes
     * @param {?} node
     * @param {?=} branch
     * @return {?}
     */
    _hideSubtree(context, nodes, node, branch) {
        this._updateSubtreeVisibility(context, nodes, node, false, branch);
    }
    /**
     * @private
     * @param {?} context
     * @param {?} nodes
     * @param {?} node
     * @param {?} visible
     * @param {?=} branch
     * @return {?}
     */
    _updateSubtreeVisibility(context, nodes, node, visible, branch) {
        /** @type {?} */
        let subNodes;
        /** @type {?} */
        const nodeSuffix = nodeInstanceSuffix(node);
        if (branch != null) {
            subNodes = nodes.filter((/**
             * @param {?} n
             * @return {?}
             */
            n => {
                /** @type {?} */
                const suffix = nodeInstanceSuffix(n);
                return suffix == nodeSuffix && n.node.parent == node.node.id && n.node.parentNode == branch;
            }));
        }
        else {
            subNodes = nodes.filter((/**
             * @param {?} n
             * @return {?}
             */
            n => {
                /** @type {?} */
                const suffix = nodeInstanceSuffix(n);
                return suffix == nodeSuffix && n.node.parent == node.node.id;
            }));
        }
        /** @type {?} */
        const isContainer = isContainerNode(node.node);
        subNodes.forEach((/**
         * @param {?} n
         * @return {?}
         */
        (n) => {
            if (!isContainer ||
                (isContainer && ((/** @type {?} */ (node.node))).nodes.find((/**
                 * @param {?} cn
                 * @return {?}
                 */
                cn => cn.id == n.node.id)) == null)) {
                updateVisibility(n, context, visible);
                updateFormula((/** @type {?} */ (n)), context);
                this._updateSubtreeVisibility(context, nodes, n, visible);
            }
        }));
    }
    /**
     * @private
     * @return {?}
     */
    _initNodesStreams() {
        this._nodes =
            this._nodesUpdates.pipe(scan((/**
             * @param {?} nodes
             * @param {?} op
             * @return {?}
             */
            (nodes, op) => {
                return op(nodes);
            }), []), share());
        this._flatNodesTree = this._nodes.pipe(map((/**
         * @param {?} nodes
         * @return {?}
         */
        nodes => flattenNodesInstancesTree(nodes))), share());
        this._flatNodes = this._flatNodesTree.pipe(map((/**
         * @param {?} slides
         * @return {?}
         */
        slides => {
            /** @type {?} */
            let nodes = [];
            slides.forEach((/**
             * @param {?} s
             * @return {?}
             */
            s => {
                nodes.push(s);
                nodes = nodes.concat(s.flatNodes);
            }));
            return nodes;
        })), share());
    }
    /**
     * @private
     * @param {?} nodeInstance
     * @return {?}
     */
    _removeNodeInstance(nodeInstance) {
        /** @type {?} */
        const nodeName = nodeInstanceCompleteName(nodeInstance);
        this._removeNodesVisibilityMapIndex(nodeName);
        this._removeNodesRepetitionMapIndex(nodeName);
        this._removeNodesConditionalBranchMapIndex(nodeName);
        this._removeNodesFormulaMapIndex(nodeName);
        this._removeNodesValidationMapIndex(nodeName);
        this._removeNodesWarningMapIndex(nodeName);
        this._removeNodesNextSlideConditionsMapIndex(nodeName);
        this._removeNodesFilteredChoicesMapIndex(nodeName);
        this._removeNodesTriggerConditionsMapIndex(nodeName);
        if (isSlidesInstance(nodeInstance)) {
            return this._removeSlideInstance((/** @type {?} */ (nodeInstance)));
        }
        else if (isRepeatingContainerNode(nodeInstance.node)) {
            this._removeNodeGroupInstance((/** @type {?} */ (nodeInstance)));
        }
        else if (isFieldInstance(nodeInstance)) {
            this._removeFieldInstance((/** @type {?} */ (nodeInstance)));
        }
        return nodeInstance;
    }
    /**
     * @private
     * @param {?} slideInstance
     * @return {?}
     */
    _removeSlideInstance(slideInstance) {
        /** @type {?} */
        const slide = slideInstance.node;
        if (slide.visibility != null) {
            this._removeFromNodesVisibilityMap(slideInstance, slide.visibility.condition);
        }
        slideInstance.conditionalBranches.forEach((/**
         * @param {?} conditionalBranch
         * @return {?}
         */
        (conditionalBranch) => {
            this._removeFromNodesConditionalBranchMap(slideInstance, conditionalBranch.condition);
        }));
        return slideInstance;
    }
    /**
     * @private
     * @param {?} nodeGroupInstance
     * @return {?}
     */
    _removeNodeGroupInstance(nodeGroupInstance) {
        /** @type {?} */
        const nodeGroup = nodeGroupInstance.node;
        if (nodeGroup.visibility != null) {
            this._removeFromNodesVisibilityMap(nodeGroupInstance, nodeGroup.visibility.condition);
        }
        if (nodeGroupInstance.formulaReps != null && nodeGroup.formulaReps != null) {
            this._removeFromNodesRepetitionMap(nodeGroupInstance, nodeGroup.formulaReps.formula);
        }
        return nodeGroupInstance;
    }
    /**
     * @private
     * @param {?} fieldInstance
     * @return {?}
     */
    _removeFieldInstance(fieldInstance) {
        /** @type {?} */
        const formGroup = this._formGroup.getValue();
        /** @type {?} */
        const fieldInstanceName = nodeInstanceCompleteName(fieldInstance);
        if (formGroup != null && formGroup.contains(fieldInstanceName)) {
            formGroup.removeControl(fieldInstanceName);
        }
        if (fieldInstance.validation != null) {
            this._validationNodesMapUpdates.next((/**
             * @param {?} vmap
             * @return {?}
             */
            (vmap) => {
                if (vmap[fieldInstanceName] == null) {
                    delete vmap[fieldInstanceName];
                }
                return vmap;
            }));
        }
        if (fieldInstance.visibility != null) {
            this._removeFromNodesVisibilityMap(fieldInstance, fieldInstance.visibility.condition);
        }
        fieldInstance.conditionalBranches.forEach((/**
         * @param {?} conditionalBranch
         * @return {?}
         */
        (conditionalBranch) => {
            this._removeFromNodesConditionalBranchMap(fieldInstance, conditionalBranch.condition);
        }));
        if (fieldInstance.formula) {
            this._removeFromNodesFormulaMap(fieldInstance, fieldInstance.formula.formula);
        }
        // TODO: check this, probably is never verified
        if (isRepeatingContainerNode(fieldInstance.node)) {
            /** @type {?} */
            const rcInstance = ((/** @type {?} */ ((/** @type {?} */ (fieldInstance)))));
            if (rcInstance.formulaReps != null) {
                this._removeFromNodesRepetitionMap(fieldInstance, rcInstance.formulaReps.formula);
            }
        }
        if (fieldInstance.validation != null && fieldInstance.validation.conditions != null) {
            fieldInstance.validation.conditions.forEach((/**
             * @param {?} condition
             * @return {?}
             */
            (condition) => {
                this._removeFromNodesValidationMap(fieldInstance, condition.condition);
            }));
        }
        if (fieldInstance.warning != null) {
            fieldInstance.warning.conditions.forEach((/**
             * @param {?} condition
             * @return {?}
             */
            (condition) => {
                this._removeFromNodesWarningMap(fieldInstance, condition.condition);
            }));
        }
        if (fieldInstance.nextSlideCondition != null) {
            this._removeFromNodesNextSlideConditionsMap(fieldInstance, fieldInstance.nextSlideCondition.condition);
        }
        if (isFieldWithChoices(fieldInstance.node)) {
            /** @type {?} */
            const fwcInstance = (/** @type {?} */ (fieldInstance));
            if (fwcInstance.choicesFilter != null) {
                this._removeFromNodesFilteredChoicesMap(fieldInstance, fwcInstance.choicesFilter.formula);
                if (fwcInstance.triggerConditions != null) {
                    fwcInstance.triggerConditions.forEach((/**
                     * @param {?} condition
                     * @return {?}
                     */
                    (condition) => {
                        this._removeFromNodesTriggerConditionsMap(fieldInstance, condition.condition);
                    }));
                }
            }
        }
        return fieldInstance;
    }
    /**
     * @private
     * @param {?} nodeInstance
     * @return {?}
     */
    _addNodeInstance(nodeInstance) {
        if (isRepeatingContainerNode(nodeInstance.node)) {
            return this._addNodeGroupInstance((/** @type {?} */ (nodeInstance)));
        }
        else if (isSlideInstance(nodeInstance)) {
            return this._addSlideInstance((/** @type {?} */ (nodeInstance)));
        }
        else if (isFieldInstance(nodeInstance)) {
            return this._addFieldInstance((/** @type {?} */ (nodeInstance)));
        }
        return nodeInstance;
    }
    /**
     * @private
     * @param {?} fieldInstance
     * @return {?}
     */
    _addFieldInstance(fieldInstance) {
        /** @type {?} */
        const formGroup = this._formGroup.getValue();
        /** @type {?} */
        const fieldInstanceName = nodeInstanceCompleteName(fieldInstance);
        if (formGroup != null && !formGroup.contains(fieldInstanceName)) {
            /** @type {?} */
            const control = new FormControl();
            control.setValue(fieldInstance.value);
            formGroup.registerControl(fieldInstanceName, control);
        }
        if (fieldInstance.validation != null) {
            this._validationNodesMapUpdates.next((/**
             * @param {?} vmap
             * @return {?}
             */
            (vmap) => {
                if (vmap[fieldInstanceName] == null) {
                    vmap[fieldInstanceName] = [];
                }
                if (vmap[fieldInstanceName].indexOf(fieldInstance) == -1) {
                    vmap[fieldInstanceName].push(fieldInstance);
                }
                return vmap;
            }));
        }
        if (fieldInstance.visibility != null) {
            this._addToNodesVisibilityMap(fieldInstance, fieldInstance.visibility.condition);
        }
        fieldInstance.conditionalBranches.forEach((/**
         * @param {?} conditionalBranch
         * @return {?}
         */
        (conditionalBranch) => {
            this._addToNodesConditionalBranchMap(fieldInstance, conditionalBranch.condition);
        }));
        if (fieldInstance.formula) {
            this._addToNodesFormulaMap(fieldInstance, fieldInstance.formula.formula);
        }
        if (isNodeGroupInstance(fieldInstance)) {
            /** @type {?} */
            const ngInstance = (/** @type {?} */ ((/** @type {?} */ (fieldInstance))));
            if (ngInstance.formulaReps != null) {
                this._addToNodesRepetitionMap(fieldInstance, ngInstance.formulaReps.formula);
            }
        }
        if (fieldInstance.validation != null && fieldInstance.validation.conditions != null) {
            fieldInstance.validation.conditions.forEach((/**
             * @param {?} condition
             * @return {?}
             */
            (condition) => {
                this._addToNodesValidationMap(fieldInstance, condition.condition);
            }));
        }
        if (fieldInstance.warning != null) {
            fieldInstance.warning.conditions.forEach((/**
             * @param {?} condition
             * @return {?}
             */
            (condition) => {
                this._addToNodesWarningMap(fieldInstance, condition.condition);
            }));
        }
        if (fieldInstance.nextSlideCondition != null) {
            this._addToNodesNextSlideConditionsMap(fieldInstance, fieldInstance.nextSlideCondition.condition);
        }
        if (isCustomFieldWithChoices(fieldInstance.node) || isFieldWithChoicesInstance(fieldInstance)) {
            /** @type {?} */
            const fwcInstance = (/** @type {?} */ (fieldInstance));
            if (fwcInstance.choicesFilter != null) {
                this._addToNodesFilteredChoicesMap(fieldInstance, fwcInstance.choicesFilter.formula);
            }
            if (fwcInstance.triggerConditions != null) {
                fwcInstance.triggerConditions.forEach((/**
                 * @param {?} condition
                 * @return {?}
                 */
                (condition) => {
                    this._addToNodesTriggerConditionsMap(fieldInstance, condition.condition);
                }));
            }
        }
        return fieldInstance;
    }
    /**
     * @private
     * @param {?} slideInstance
     * @return {?}
     */
    _addSlideInstance(slideInstance) {
        /** @type {?} */
        const slide = slideInstance.node;
        if (slide.visibility != null) {
            this._addToNodesVisibilityMap(slideInstance, slide.visibility.condition);
        }
        slideInstance.conditionalBranches.forEach((/**
         * @param {?} conditionalBranch
         * @return {?}
         */
        (conditionalBranch) => {
            this._addToNodesConditionalBranchMap(slideInstance, conditionalBranch.condition);
        }));
        return slideInstance;
    }
    /**
     * @private
     * @param {?} nodeGroupInstance
     * @return {?}
     */
    _addNodeGroupInstance(nodeGroupInstance) {
        /** @type {?} */
        const nodeGroup = nodeGroupInstance.node;
        if (nodeGroup.visibility != null) {
            this._addToNodesVisibilityMap(nodeGroupInstance, nodeGroup.visibility.condition);
        }
        nodeGroupInstance.conditionalBranches.forEach((/**
         * @param {?} conditionalBranch
         * @return {?}
         */
        (conditionalBranch) => {
            this._addToNodesConditionalBranchMap(nodeGroupInstance, conditionalBranch.condition);
        }));
        if (nodeGroupInstance.formulaReps != null) {
            if (nodeGroup.formulaReps != null) {
                this._addToNodesRepetitionMap(nodeGroupInstance, nodeGroup.formulaReps.formula);
            }
        }
        else {
            /** @type {?} */
            let formGroup = this._formGroup.getValue();
            /** @type {?} */
            let nodeGroupInstanceName = nodeInstanceCompleteName(nodeGroupInstance);
            if (formGroup != null && !formGroup.contains(nodeGroupInstanceName)) {
                /** @type {?} */
                const control = new FormControl();
                control.setValue(nodeGroupInstance.reps);
                formGroup.registerControl(nodeGroupInstanceName, control);
            }
        }
        return nodeGroupInstance;
    }
    /**
     * @private
     * @param {?} index
     * @return {?}
     */
    _removeNodesVisibilityMapIndex(index) {
        this._removeNodesMapIndex(this._visibilityNodesMapUpdates, index);
    }
    /**
     * @private
     * @param {?} index
     * @return {?}
     */
    _removeNodesRepetitionMapIndex(index) {
        this._removeNodesMapIndex(this._repetitionNodesMapUpdates, index);
    }
    /**
     * @private
     * @param {?} index
     * @return {?}
     */
    _removeNodesConditionalBranchMapIndex(index) {
        this._removeNodesMapIndex(this._conditionalBranchNodesMapUpdates, index);
    }
    /**
     * @private
     * @param {?} index
     * @return {?}
     */
    _removeNodesFormulaMapIndex(index) {
        this._removeNodesMapIndex(this._formulaNodesMapUpdates, index);
    }
    /**
     * @private
     * @param {?} index
     * @return {?}
     */
    _removeNodesValidationMapIndex(index) {
        this._removeNodesMapIndex(this._validationNodesMapUpdates, index);
    }
    /**
     * @private
     * @param {?} index
     * @return {?}
     */
    _removeNodesWarningMapIndex(index) {
        this._removeNodesMapIndex(this._warningNodesMapUpdates, index);
    }
    /**
     * @private
     * @param {?} index
     * @return {?}
     */
    _removeNodesFilteredChoicesMapIndex(index) {
        this._removeNodesMapIndex(this._filteredChoicesNodesMapUpdates, index);
    }
    /**
     * @private
     * @param {?} index
     * @return {?}
     */
    _removeNodesTriggerConditionsMapIndex(index) {
        this._removeNodesMapIndex(this._triggerConditionsNodesMapUpdates, index);
    }
    /**
     * @private
     * @param {?} index
     * @return {?}
     */
    _removeNodesNextSlideConditionsMapIndex(index) {
        this._removeNodesMapIndex(this._nextSlideConditionsNodesMapUpdates, index);
    }
    /**
     * @private
     * @param {?} nodesMap
     * @param {?} index
     * @return {?}
     */
    _removeNodesMapIndex(nodesMap, index) {
        nodesMap.next((/**
         * @param {?} vmap
         * @return {?}
         */
        (vmap) => {
            if (Object.keys(vmap).indexOf(index) > -1) {
                delete vmap[index];
            }
            return vmap;
        }));
    }
    /**
     * @private
     * @param {?} nodeInstance
     * @param {?} formula
     * @return {?}
     */
    _removeFromNodesVisibilityMap(nodeInstance, formula) {
        this._removeFromNodesMap(this._visibilityNodesMapUpdates, nodeInstance, formula);
    }
    /**
     * @private
     * @param {?} nodeInstance
     * @param {?} formula
     * @return {?}
     */
    _removeFromNodesRepetitionMap(nodeInstance, formula) {
        this._removeFromNodesMap(this._repetitionNodesMapUpdates, nodeInstance, formula);
    }
    /**
     * @private
     * @param {?} nodeInstance
     * @param {?} formula
     * @return {?}
     */
    _removeFromNodesConditionalBranchMap(nodeInstance, formula) {
        this._removeFromNodesMap(this._conditionalBranchNodesMapUpdates, nodeInstance, formula);
    }
    /**
     * @private
     * @param {?} nodeInstance
     * @param {?} formula
     * @return {?}
     */
    _removeFromNodesFormulaMap(nodeInstance, formula) {
        this._removeFromNodesMap(this._formulaNodesMapUpdates, nodeInstance, formula);
    }
    /**
     * @private
     * @param {?} nodeInstance
     * @param {?} formula
     * @return {?}
     */
    _removeFromNodesValidationMap(nodeInstance, formula) {
        this._removeFromNodesMap(this._validationNodesMapUpdates, nodeInstance, formula);
    }
    /**
     * @private
     * @param {?} nodeInstance
     * @param {?} formula
     * @return {?}
     */
    _removeFromNodesWarningMap(nodeInstance, formula) {
        this._removeFromNodesMap(this._warningNodesMapUpdates, nodeInstance, formula);
    }
    /**
     * @private
     * @param {?} nodeInstance
     * @param {?} formula
     * @return {?}
     */
    _removeFromNodesFilteredChoicesMap(nodeInstance, formula) {
        this._removeFromNodesMap(this._filteredChoicesNodesMapUpdates, nodeInstance, formula);
    }
    /**
     * @private
     * @param {?} nodeInstance
     * @param {?} formula
     * @return {?}
     */
    _removeFromNodesTriggerConditionsMap(nodeInstance, formula) {
        this._removeFromNodesMap(this._filteredChoicesNodesMapUpdates, nodeInstance, formula);
    }
    /**
     * @private
     * @param {?} nodeInstance
     * @param {?} formula
     * @return {?}
     */
    _removeFromNodesNextSlideConditionsMap(nodeInstance, formula) {
        this._removeFromNodesMap(this._nextSlideConditionsNodesMapUpdates, nodeInstance, formula);
    }
    /**
     * @private
     * @param {?} nodesMap
     * @param {?} nodeInstance
     * @param {?} formula
     * @return {?}
     */
    _removeFromNodesMap(nodesMap, nodeInstance, formula) {
        /** @type {?} */
        let tokens = tokenize(formula)
            .filter((/**
         * @param {?} token
         * @return {?}
         */
        (token) => token.type == 'Identifier' && token.value != '$value'));
        if (tokens.length > 0) {
            nodesMap.next((/**
             * @param {?} vmap
             * @return {?}
             */
            (vmap) => {
                tokens.forEach((/**
                 * @param {?} token
                 * @return {?}
                 */
                (token) => {
                    /** @type {?} */
                    let tokenName = token.value;
                    if (vmap[tokenName] != null) {
                        /** @type {?} */
                        const idx = vmap[tokenName].indexOf(nodeInstance);
                        if (idx > -1) {
                            vmap[tokenName].splice(idx, 1);
                            if (vmap[tokenName].length == 0) {
                                delete vmap[tokenName];
                            }
                        }
                    }
                }));
                return vmap;
            }));
        }
    }
    /**
     * @private
     * @param {?} nodeInstance
     * @param {?} formula
     * @return {?}
     */
    _addToNodesVisibilityMap(nodeInstance, formula) {
        this._addToNodesMap(this._visibilityNodesMapUpdates, nodeInstance, formula);
    }
    /**
     * @private
     * @param {?} nodeInstance
     * @param {?} formula
     * @return {?}
     */
    _addToNodesRepetitionMap(nodeInstance, formula) {
        this._addToNodesMap(this._repetitionNodesMapUpdates, nodeInstance, formula);
    }
    /**
     * @private
     * @param {?} nodeInstance
     * @param {?} formula
     * @return {?}
     */
    _addToNodesConditionalBranchMap(nodeInstance, formula) {
        this._addToNodesMap(this._conditionalBranchNodesMapUpdates, nodeInstance, formula);
    }
    /**
     * @private
     * @param {?} nodeInstance
     * @param {?} formula
     * @return {?}
     */
    _addToNodesFormulaMap(nodeInstance, formula) {
        this._addToNodesMap(this._formulaNodesMapUpdates, nodeInstance, formula);
    }
    /**
     * @private
     * @param {?} nodeInstance
     * @param {?} formula
     * @return {?}
     */
    _addToNodesValidationMap(nodeInstance, formula) {
        this._addToNodesMap(this._validationNodesMapUpdates, nodeInstance, formula);
    }
    /**
     * @private
     * @param {?} nodeInstance
     * @param {?} formula
     * @return {?}
     */
    _addToNodesWarningMap(nodeInstance, formula) {
        this._addToNodesMap(this._warningNodesMapUpdates, nodeInstance, formula);
    }
    /**
     * @private
     * @param {?} nodeInstance
     * @param {?} formula
     * @return {?}
     */
    _addToNodesFilteredChoicesMap(nodeInstance, formula) {
        this._addToNodesMap(this._filteredChoicesNodesMapUpdates, nodeInstance, formula);
    }
    /**
     * @private
     * @param {?} nodeInstance
     * @param {?} formula
     * @return {?}
     */
    _addToNodesTriggerConditionsMap(nodeInstance, formula) {
        this._addToNodesMap(this._triggerConditionsNodesMapUpdates, nodeInstance, formula);
    }
    /**
     * @private
     * @param {?} nodeInstance
     * @param {?} formula
     * @return {?}
     */
    _addToNodesNextSlideConditionsMap(nodeInstance, formula) {
        this._addToNodesMap(this._nextSlideConditionsNodesMapUpdates, nodeInstance, formula);
    }
    /**
     * @private
     * @param {?} nodesMap
     * @param {?} nodeInstance
     * @param {?} formula
     * @return {?}
     */
    _addToNodesMap(nodesMap, nodeInstance, formula) {
        /** @type {?} */
        let tokens = tokenize(formula)
            .filter((/**
         * @param {?} token
         * @return {?}
         */
        (token) => token.type == 'Identifier' && token.value != '$value'));
        if (tokens.length > 0) {
            nodesMap.next((/**
             * @param {?} vmap
             * @return {?}
             */
            (vmap) => {
                tokens.forEach((/**
                 * @param {?} token
                 * @return {?}
                 */
                (token) => {
                    /** @type {?} */
                    let tokenName = token.value;
                    if (vmap[tokenName] == null) {
                        vmap[tokenName] = [];
                    }
                    if (vmap[tokenName].indexOf(nodeInstance) === -1) {
                        vmap[tokenName].push(nodeInstance);
                    }
                }));
                return vmap;
            }));
        }
    }
}
AjfFormRendererService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
AjfFormRendererService.ctorParameters = () => [
    { type: AjfValidationService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfFormActionEvent {
}
/**
 * @abstract
 */
class AjfFormRenderer {
    /**
     * this constructor will init current formula by ajfBuilderService
     * @param {?} _rendererService
     * @param {?} _changeDetectorRef
     */
    constructor(_rendererService, _changeDetectorRef) {
        this._rendererService = _rendererService;
        this._changeDetectorRef = _changeDetectorRef;
        // ajfFieldTypes [ Text, Number, Boolean, SingleChoice, MultipleChoice,
        // Formula, Empty, Composed, LENGTH ]
        this.ajfFieldTypes = AjfFieldType;
        this._orientationChange = new EventEmitter();
        this.orientationChange = this._orientationChange.asObservable();
        this._saveDisabled = false;
        this._hasStartMessage = false;
        this._hasEndMessage = false;
        this._hideTopToolbar = false;
        this._hideBottomToolbar = false;
        this._hideNavigationButtons = false;
        this._fixedOrientation = false;
        this._readonly = false;
        this._orientation = 'horizontal';
        this._errorMoveEvent = new EventEmitter();
        // _init is a private boolean
        this._init = false;
        this._nextSlideSubscription = Subscription.EMPTY;
        this._errorMoveSubscription = Subscription.EMPTY;
        this._formAction = new EventEmitter();
        this.formAction = this._formAction.asObservable();
        this.formGroup = _rendererService.formGroup;
        this.slides = _rendererService.nodesTree;
        this._errorPositions = _rendererService.errorPositions;
        this.errors = _rendererService.errors;
        this.slidesNum = _rendererService.slidesNum;
        this.formIsInit = _rendererService.formInitEvent.pipe(map((/**
         * @param {?} e
         * @return {?}
         */
        e => e === AjfFormInitStatus.Complete)));
    }
    /**
     * @return {?}
     */
    get saveDisabled() { return this._saveDisabled; }
    /**
     * @param {?} saveDisabled
     * @return {?}
     */
    set saveDisabled(saveDisabled) {
        this._saveDisabled = coerceBooleanProperty(saveDisabled);
        this._changeDetectorRef.markForCheck();
    }
    /**
     * @return {?}
     */
    get hasStartMessage() { return this._hasStartMessage; }
    /**
     * @param {?} hasStartMessage
     * @return {?}
     */
    set hasStartMessage(hasStartMessage) {
        this._hasStartMessage = coerceBooleanProperty(hasStartMessage);
        this._changeDetectorRef.markForCheck();
    }
    /**
     * @return {?}
     */
    get hasEndMessage() { return this._hasEndMessage; }
    /**
     * @param {?} hasEndMessage
     * @return {?}
     */
    set hasEndMessage(hasEndMessage) {
        this._hasEndMessage = coerceBooleanProperty(hasEndMessage);
        this._changeDetectorRef.markForCheck();
    }
    /**
     * @return {?}
     */
    get hideTopToolbar() { return this._hideTopToolbar; }
    /**
     * @param {?} hideTopToolbar
     * @return {?}
     */
    set hideTopToolbar(hideTopToolbar) {
        this._hideTopToolbar = coerceBooleanProperty(hideTopToolbar);
        this._changeDetectorRef.markForCheck();
    }
    /**
     * @return {?}
     */
    get hideBottompToolbar() { return this._hideBottomToolbar; }
    /**
     * @param {?} hideBottomToolbar
     * @return {?}
     */
    set hideBottomToolbar(hideBottomToolbar) {
        this._hideBottomToolbar = coerceBooleanProperty(hideBottomToolbar);
        this._changeDetectorRef.markForCheck();
    }
    /**
     * @return {?}
     */
    get hideNavigationButtons() { return this._hideNavigationButtons; }
    /**
     * @param {?} hideNavigationButtons
     * @return {?}
     */
    set hideNavigationButtons(hideNavigationButtons) {
        this._hideNavigationButtons = coerceBooleanProperty(hideNavigationButtons);
        this._changeDetectorRef.markForCheck();
    }
    /**
     * @return {?}
     */
    get fixedOrientation() { return this._fixedOrientation; }
    /**
     * @param {?} fixedOrientation
     * @return {?}
     */
    set fixedOrientation(fixedOrientation) {
        this._fixedOrientation = coerceBooleanProperty(fixedOrientation);
        this._changeDetectorRef.markForCheck();
    }
    /**
     * @return {?}
     */
    get readonly() { return this._readonly; }
    /**
     * @param {?} readonly
     * @return {?}
     */
    set readonly(readonly) {
        this._readonly = coerceBooleanProperty(readonly);
        this._changeDetectorRef.markForCheck();
    }
    /**
     * @return {?}
     */
    get orientation() { return this._orientation; }
    /**
     * @param {?} orientation
     * @return {?}
     */
    set orientation(orientation) {
        if (orientation !== 'horizontal' && orientation !== 'vertical') {
            return;
        }
        if (orientation !== this._orientation) {
            this._orientation = orientation;
            this._changeDetectorRef.markForCheck();
            this._orientationChange.emit(this._orientation);
        }
    }
    /**
     * @param {?} form
     * @return {?}
     */
    set form(form) {
        this._form = form;
        if (this._init) {
            this._rendererService.setForm(this._form);
        }
    }
    /**
     * this method will scroll to next error received by subscribe
     * @return {?}
     */
    goToNextError() { this._errorMoveEvent.emit(true); }
    /**
     * this method will scroll to prev error received by subscribe
     * @return {?}
     */
    goToPrevError() { this._errorMoveEvent.emit(false); }
    /**
     * this method will add group
     * @param {?} nodeGroup
     * @return {?}
     */
    addGroup(nodeGroup) {
        /** @type {?} */
        let s = this._rendererService.addGroup(nodeGroup).pipe(delayWhen((/**
         * @return {?}
         */
        () => this.formSlider.pageScrollFinish))).subscribe((/**
         * @param {?} r
         * @return {?}
         */
        (r) => { if (r && this.formSlider != null) {
            this.formSlider.slide({ dir: 'down' });
        } }), (/**
         * @param {?} _e
         * @return {?}
         */
        (_e) => { if (s) {
            s.unsubscribe();
        } }), (/**
         * @return {?}
         */
        () => { if (s) {
            s.unsubscribe();
        } }));
    }
    /**
     * this method will remove group
     * @param {?} nodeGroup
     * @return {?}
     */
    removeGroup(nodeGroup) {
        /** @type {?} */
        let s = this._rendererService.removeGroup(nodeGroup).pipe(delayWhen((/**
         * @return {?}
         */
        () => this.formSlider.pageScrollFinish))).subscribe((/**
         * @param {?} r
         * @return {?}
         */
        (r) => { if (r && this.formSlider != null) {
            this.formSlider.slide({ dir: 'up' });
        } }), (/**
         * @param {?} _e
         * @return {?}
         */
        (_e) => { if (s) {
            s.unsubscribe();
        } }), (/**
         * @return {?}
         */
        () => { if (s) {
            s.unsubscribe();
        } }));
    }
    /**
     * @param {?} _evt
     * @return {?}
     */
    onSave(_evt) {
        this._formAction.emit({
            source: this,
            action: 'save',
            value: this._rendererService.getFormValue()
        });
    }
    /**
     * @param {?} _evt
     * @param {?} action
     * @return {?}
     */
    onFormAction(_evt, action) {
        this._formAction.emit({
            source: this,
            value: this._rendererService.getFormValue(),
            action: action
        });
    }
    /**
     * this method will set current form in rederer service when init form
     * @return {?}
     */
    ngAfterViewInit() {
        if (this._form != null) {
            this._rendererService.setForm(this._form);
            this._changeDetectorRef.detectChanges();
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewChecked() {
        if (!this._init && this.formSlider != null) {
            this._init = true;
            this._errorMoveSubscription = ((/** @type {?} */ (this._errorMoveEvent))).pipe(withLatestFrom(this._errorPositions)).subscribe((/**
             * @param {?} v
             * @return {?}
             */
            (v) => {
                /** @type {?} */
                const move = v[0];
                /** @type {?} */
                const currentPosition = this.formSlider.currentPage - (+this.hasStartMessage) + 1;
                /** @type {?} */
                const errors = v[1];
                if (errors == null) {
                    return;
                }
                /** @type {?} */
                let found = false;
                /** @type {?} */
                let prevIdx = -1;
                /** @type {?} */
                let nextIdx = -1;
                /** @type {?} */
                let idx = 0;
                /** @type {?} */
                let errorsLen = errors.length;
                while (!found && idx < errorsLen) {
                    if (errors[idx] == currentPosition) {
                        found = true;
                        prevIdx = idx > 0 ? idx - 1 : errorsLen - 1;
                        nextIdx = idx < errorsLen - 1 ? idx + 1 : 0;
                    }
                    else if (errors[idx] > currentPosition) {
                        found = true;
                        prevIdx = idx > 0 ? idx - 1 : errorsLen - 1;
                        nextIdx = idx;
                    }
                    idx++;
                }
                if (!found) {
                    prevIdx = errorsLen - 1;
                    nextIdx = 0;
                }
                this.formSlider.slide({ to: move ? errors[nextIdx] - 1 : errors[prevIdx] - 1 });
                this._changeDetectorRef.detectChanges();
            }));
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._nextSlideSubscription.unsubscribe();
        this._errorMoveSubscription.unsubscribe();
        this._orientationChange.complete();
        this._errorMoveEvent.complete();
        this._formAction.complete();
    }
    /**
     * @param {?} orientation
     * @return {?}
     */
    orientationChangeHandler(orientation) {
        this.orientation = orientation;
    }
    /**
     * @param {?} _
     * @param {?} node
     * @return {?}
     */
    trackNodeById(_, node) {
        return nodeInstanceCompleteName(node);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfBoolToIntPipe {
    /**
     * @param {?} value
     * @return {?}
     */
    transform(value) {
        return value ? 1 : 0;
    }
}
AjfBoolToIntPipe.decorators = [
    { type: Pipe, args: [{ name: 'ajfBoolToInt' },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfExpandFieldWithChoicesPipe {
    /**
     * @param {?} instance
     * @param {?} threshold
     * @return {?}
     */
    transform(instance, threshold) {
        return !instance.node.forceNarrow && (instance.node.forceExpanded
            || (instance.filteredChoices && instance.filteredChoices.length <= threshold));
    }
}
AjfExpandFieldWithChoicesPipe.decorators = [
    { type: Pipe, args: [{ name: 'ajfExpandFieldWithChoices' },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfIncrementPipe {
    /**
     * @param {?} value
     * @param {?=} increment
     * @return {?}
     */
    transform(value, increment = 1) {
        return value + increment;
    }
}
AjfIncrementPipe.decorators = [
    { type: Pipe, args: [{ name: 'ajfIncrement' },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfIsRepeatingSlideInstancePipe {
    /**
     * @param {?} instance
     * @return {?}
     */
    transform(instance) {
        return isRepeatingSlideInstance(instance);
    }
}
AjfIsRepeatingSlideInstancePipe.decorators = [
    { type: Pipe, args: [{ name: 'ajfIsRepeatingSlideInstance' },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfNodeCompleteNamePipe {
    /**
     * @param {?} instance
     * @return {?}
     */
    transform(instance) {
        return instance ? nodeInstanceCompleteName(instance) : '';
    }
}
AjfNodeCompleteNamePipe.decorators = [
    { type: Pipe, args: [{ name: 'ajfNodeCompleteName' },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfRangePipe {
    /**
     * @param {?=} size
     * @param {?=} start
     * @param {?=} step
     * @return {?}
     */
    transform(size = 0, start = 1, step = 1) {
        /** @type {?} */
        const range = [];
        for (let length = 0; length < size; ++length) {
            range.push(start);
            start += step;
        }
        return range;
    }
}
AjfRangePipe.decorators = [
    { type: Pipe, args: [{ name: 'ajfRange' },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfTableRowClass {
    /**
     * @param {?} value
     * @return {?}
     */
    transform(value) {
        return value % 2 == 0 ? 'ajf-row-even' : 'ajf-row-odd';
    }
}
AjfTableRowClass.decorators = [
    { type: Pipe, args: [{ name: 'ajfTableRowClass' },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfTableVisibleColumnsPipe {
    /**
     * @param {?} instance
     * @return {?}
     */
    transform(instance) {
        if (!instance.node.editable) {
            return instance.hideEmptyRows
                ? (instance.value || []).filter((/**
                 * @param {?} col
                 * @return {?}
                 */
                col => col[1].reduce((/**
                 * @param {?} prev
                 * @param {?} cur
                 * @return {?}
                 */
                (prev, cur) => {
                    return prev || (cur != null && cur !== '' && cur !== 0 && cur !== '0');
                }), false))).map((/**
                 * @param {?} v
                 * @return {?}
                 */
                v => [v[0], ...v[1]]))
                : instance.value.map((/**
                 * @param {?} v
                 * @return {?}
                 */
                v => [v[0], ...v[1]]));
        }
        return (instance.controls || []).map((/**
         * @param {?} v
         * @return {?}
         */
        v => [v[0], ...v[1]]));
    }
}
AjfTableVisibleColumnsPipe.decorators = [
    { type: Pipe, args: [{ name: 'ajfTableVisibleColumns' },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfValidSlidePipe {
    /**
     * @param {?} slide
     * @param {?} idx
     * @return {?}
     */
    transform(slide, idx) {
        if (idx == null || typeof idx !== 'number') {
            return false;
        }
        if (idx >= slide.slideNodes.length) {
            return true;
        }
        return slide.slideNodes[idx]
            .map((/**
         * @param {?} n
         * @return {?}
         */
        n => {
            if (n.visible && Object.keys(n).indexOf('valid') > -1) {
                return ((/** @type {?} */ (n))).valid;
            }
            return true;
        })).reduce((/**
         * @param {?} v1
         * @param {?} v2
         * @return {?}
         */
        (v1, v2) => v1 && v2), true);
    }
}
AjfValidSlidePipe.decorators = [
    { type: Pipe, args: [{ name: 'ajfValidSlide', pure: false },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfFormsModule {
}
AjfFormsModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    AjfBoolToIntPipe,
                    AjfDateValuePipe,
                    AjfDateValueStringPipe,
                    AjfExpandFieldWithChoicesPipe,
                    AjfFieldHost,
                    AjfFieldIconPipe,
                    AjfFieldIsValidPipe,
                    AjfIncrementPipe,
                    AjfIsRepeatingSlideInstancePipe,
                    AjfNodeCompleteNamePipe,
                    AjfRangePipe,
                    AjfTableRowClass,
                    AjfTableVisibleColumnsPipe,
                    AjfValidSlidePipe,
                ],
                exports: [
                    AjfBoolToIntPipe,
                    AjfDateValuePipe,
                    AjfDateValueStringPipe,
                    AjfExpandFieldWithChoicesPipe,
                    AjfFieldHost,
                    AjfFieldIconPipe,
                    AjfFieldIsValidPipe,
                    AjfIncrementPipe,
                    AjfIsRepeatingSlideInstancePipe,
                    AjfNodeCompleteNamePipe,
                    AjfRangePipe,
                    AjfTableRowClass,
                    AjfTableVisibleColumnsPipe,
                    AjfValidSlidePipe,
                ],
                providers: [AjfDateValueStringPipe, AjfFormRendererService, AjfValidationService]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @param {?} v
 * @return {?}
 */
function getTypeName(v) {
    /** @type {?} */
    let typeStr = typeof v;
    return typeStr === 'object'
        ? v.constructor.toString().match(/\w+/g)[1]
        : typeStr;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
class AjfInputFieldComponent extends AjfBaseFieldComponent {
    constructor() {
        super(...arguments);
        this.type = 'text';
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const AJF_SEARCH_ALERT_THRESHOLD = new InjectionToken('AJF_SEARCH_ALERT_THRESHOLD');

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @template T
 * @param {?} origin
 * @return {?}
 */
function createAttachmentsOrigin(origin) {
    return Object.assign({}, origin, { attachments: origin.attachments || [] });
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfAttachmentsOriginSerializer {
    /**
     * @param {?} origin
     * @return {?}
     */
    static fromJson(origin) {
        if (origin.name == null) {
            throw new Error('Malformed attachments origin');
        }
        return createAttachmentsOrigin((/** @type {?} */ (origin)));
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @template T
 * @param {?} origin
 * @return {?}
 */
function createChoicesOrigin(origin) {
    return Object.assign({}, origin, { type: origin.type, label: origin.label || '', choices: origin.choices || [] });
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfChoicesOriginSerializer {
    /**
     * @param {?} origin
     * @return {?}
     */
    static fromJson(origin) {
        return createChoicesOrigin((/** @type {?} */ (Object.assign({}, origin, { type: origin.type || 'fixed', name: origin.name || '' }))));
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 * @param {?} field
 * @return {?}
 */
function createFieldWithChoices(field) {
    /** @type {?} */
    const node = createField(Object.assign({}, field));
    return Object.assign({}, node, field, { choices: field.choices || [], forceExpanded: field.forceExpanded || false, forceNarrow: field.forceNarrow || false });
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} containerNode
 * @return {?}
 */
function createContainerNode(containerNode) {
    /** @type {?} */
    const node = createNode(containerNode);
    return Object.assign({}, node, { nodes: containerNode.nodes || [] });
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} repeatingNode
 * @return {?}
 */
function createRepeatingNode(repeatingNode) {
    /** @type {?} */
    const node = createNode(repeatingNode);
    return Object.assign({}, repeatingNode, node, { minReps: repeatingNode.minReps != null ? repeatingNode.minReps : 1, maxReps: repeatingNode.maxReps != null ? repeatingNode.maxReps : 0 });
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} nodeGroup
 * @return {?}
 */
function createNodeGroup(nodeGroup) {
    return Object.assign({}, createContainerNode(nodeGroup), createRepeatingNode(nodeGroup), { nodeType: AjfNodeType.AjfNodeGroup });
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} nodeGroup
 * @return {?}
 */
function createRepeatingSlide(nodeGroup) {
    return Object.assign({}, createContainerNode(nodeGroup), createRepeatingNode(nodeGroup), { nodeType: AjfNodeType.AjfRepeatingSlide });
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} nodeGroup
 * @return {?}
 */
function createSlide(nodeGroup) {
    return Object.assign({}, createContainerNode(nodeGroup), { nodeType: AjfNodeType.AjfSlide });
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfValidationGroupSerializer {
    /**
     * @param {?} group
     * @return {?}
     */
    static fromJson(group) {
        return createValidationGroup(group);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfWarningGroupSerializer {
    /**
     * @param {?} group
     * @return {?}
     */
    static fromJson(group) {
        return createWarningGroup(group);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfNodeSerializer {
    /**
     * @param {?} json
     * @param {?=} choicesOrigins
     * @param {?=} attachmentsOrigins
     * @return {?}
     */
    static fromJson(json, choicesOrigins, attachmentsOrigins) {
        /** @type {?} */
        const err = 'Malformed node';
        json.name = json.name || '';
        if (json.id == null || json.parent == null || json.nodeType == null) {
            throw new Error(err);
        }
        /** @type {?} */
        const obj = (/** @type {?} */ (json));
        if (obj.visibility) {
            obj.visibility = AjfConditionSerializer.fromJson(obj.visibility);
        }
        obj.conditionalBranches =
            (obj.conditionalBranches || []).map((/**
             * @param {?} c
             * @return {?}
             */
            c => AjfConditionSerializer.fromJson(c)));
        switch (obj.nodeType) {
            case AjfNodeType.AjfField:
                return AjfNodeSerializer._fieldFromJson((/** @type {?} */ (obj)), choicesOrigins, attachmentsOrigins);
            case AjfNodeType.AjfFieldNodeLink:
                return AjfNodeSerializer._fieldNodeLinkFromJson((/** @type {?} */ (obj)));
            case AjfNodeType.AjfNodeGroup:
                return AjfNodeSerializer._nodeGroupFromJson((/** @type {?} */ (obj)), choicesOrigins, attachmentsOrigins);
            case AjfNodeType.AjfRepeatingSlide:
                return AjfNodeSerializer._repeatingSlideFromJson((/** @type {?} */ (obj)), choicesOrigins, attachmentsOrigins);
            case AjfNodeType.AjfSlide:
                return AjfNodeSerializer._slideFromJson((/** @type {?} */ (obj)), choicesOrigins, attachmentsOrigins);
        }
        throw new Error(err);
    }
    /**
     * @private
     * @param {?} json
     * @param {?=} choicesOrigins
     * @param {?=} attachmentsOrigins
     * @return {?}
     */
    static _containerNodeFromJson(json, choicesOrigins, attachmentsOrigins) {
        json.nodes = (json.nodes ||
            []).map((/**
         * @param {?} n
         * @return {?}
         */
        n => AjfNodeSerializer.fromJson(n, choicesOrigins, attachmentsOrigins)));
        return createContainerNode(json);
    }
    /**
     * @private
     * @param {?} json
     * @param {?=} choicesOrigins
     * @param {?=} attachmentsOrigins
     * @return {?}
     */
    static _fieldFromJson(json, choicesOrigins, attachmentsOrigins) {
        if (json.fieldType == null) {
            throw new Error('Malformed field');
        }
        /** @type {?} */
        const obj = (/** @type {?} */ (json));
        if (obj.validation) {
            obj.validation = AjfValidationGroupSerializer.fromJson(obj.validation);
        }
        if (obj.warning) {
            obj.warning = AjfWarningGroupSerializer.fromJson(obj.warning);
        }
        if (json.attachmentsOriginRef) {
            obj.attachmentOrigin =
                (attachmentsOrigins || []).find((/**
                 * @param {?} a
                 * @return {?}
                 */
                a => a.name === json.attachmentsOriginRef));
        }
        if (obj.nextSlideCondition) {
            obj.nextSlideCondition = AjfConditionSerializer.fromJson(obj.nextSlideCondition);
        }
        /** @type {?} */
        const isCustomFieldWithChoice = obj.fieldType > 100
            && componentsMap[obj.fieldType] != null
            && componentsMap[obj.fieldType].isFieldWithChoice === true;
        if (obj.fieldType > 100) {
            console.log(obj);
            console.log(componentsMap[obj.fieldType]);
        }
        if (isCustomFieldWithChoice) {
            return AjfNodeSerializer._fieldWithChoicesFromJson((/** @type {?} */ (json)), choicesOrigins);
        }
        switch (obj.fieldType) {
            case AjfFieldType.Formula:
                return AjfNodeSerializer._formulaFieldFromJson((/** @type {?} */ (json)));
            case AjfFieldType.MultipleChoice:
            case AjfFieldType.SingleChoice:
                return AjfNodeSerializer._fieldWithChoicesFromJson((/** @type {?} */ (json)), choicesOrigins);
        }
        return createField(obj);
    }
    /**
     * @private
     * @param {?} json
     * @return {?}
     */
    static _fieldNodeLinkFromJson(json) {
        return Object.assign({}, createNode(json), { nodeType: AjfNodeType.AjfFieldNodeLink });
    }
    /**
     * @private
     * @param {?} json
     * @param {?=} choicesOrigins
     * @return {?}
     */
    static _fieldWithChoicesFromJson(json, choicesOrigins) {
        /** @type {?} */
        const err = 'Malformed field with choices';
        if (json.choicesOriginRef == null) {
            throw new Error(err);
        }
        /** @type {?} */
        const choicesOrigin = (choicesOrigins || []).find((/**
         * @param {?} c
         * @return {?}
         */
        c => c.name === json.choicesOriginRef));
        if (choicesOrigin == null) {
            throw new Error(err);
        }
        if (json.choicesFilter) {
            json.choicesFilter = AjfFormulaSerializer.fromJson(json.choicesFilter);
        }
        if (json.triggerConditions) {
            json.triggerConditions = json.triggerConditions.map((/**
             * @param {?} t
             * @return {?}
             */
            t => AjfConditionSerializer.fromJson(t)));
        }
        return createFieldWithChoices(Object.assign({}, json, { choicesOrigin }));
    }
    /**
     * @private
     * @param {?} json
     * @return {?}
     */
    static _formulaFieldFromJson(json) {
        if (json.formula) {
            json.formula = AjfFormulaSerializer.fromJson(json.formula);
        }
        return Object.assign({}, createField(json), { fieldType: AjfFieldType.Formula });
    }
    /**
     * @private
     * @param {?} json
     * @param {?=} choicesOrigins
     * @param {?=} attachmentsOrigins
     * @return {?}
     */
    static _nodeGroupFromJson(json, choicesOrigins, attachmentsOrigins) {
        return createNodeGroup(Object.assign({}, AjfNodeSerializer._containerNodeFromJson(json, choicesOrigins, attachmentsOrigins), AjfNodeSerializer._repeatingNodeFromJson(json)));
    }
    /**
     * @private
     * @param {?} json
     * @return {?}
     */
    static _repeatingNodeFromJson(json) {
        if (json.formulaReps) {
            json.formulaReps = AjfFormulaSerializer.fromJson(json.formulaReps);
        }
        return createRepeatingNode(json);
    }
    /**
     * @private
     * @param {?} json
     * @param {?=} choicesOrigins
     * @param {?=} attachmentsOrigins
     * @return {?}
     */
    static _repeatingSlideFromJson(json, choicesOrigins, attachmentsOrigins) {
        return createRepeatingSlide(Object.assign({}, AjfNodeSerializer._containerNodeFromJson(json, choicesOrigins, attachmentsOrigins), AjfNodeSerializer._repeatingNodeFromJson(json)));
    }
    /**
     * @private
     * @param {?} json
     * @param {?=} choicesOrigins
     * @param {?=} attachmentsOrigins
     * @return {?}
     */
    static _slideFromJson(json, choicesOrigins, attachmentsOrigins) {
        return createSlide(AjfNodeSerializer._containerNodeFromJson(json, choicesOrigins, attachmentsOrigins));
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfFormSerializer {
    /**
     * @param {?} form
     * @param {?=} context
     * @return {?}
     */
    static fromJson(form, context) {
        /** @type {?} */
        const choicesOrigins = (form.choicesOrigins || []).map((/**
         * @param {?} c
         * @return {?}
         */
        c => AjfChoicesOriginSerializer.fromJson(c)));
        /** @type {?} */
        const attachmentsOrigins = (form.attachmentsOrigins || []).map((/**
         * @param {?} a
         * @return {?}
         */
        a => AjfAttachmentsOriginSerializer.fromJson(a)));
        /** @type {?} */
        const nodes = (/** @type {?} */ ((form.nodes || [])
            .map((/**
         * @param {?} n
         * @return {?}
         */
        n => AjfNodeSerializer.fromJson(n, choicesOrigins, attachmentsOrigins)))));
        return Object.assign({}, form, { choicesOrigins,
            attachmentsOrigins,
            nodes, stringIdentifier: form.stringIdentifier || [], initContext: deepCopy(context || {}) });
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/** @enum {number} */
const AjfAttachmentsType = {
    Link: 0,
    Pdf: 1,
    LENGTH: 2,
};
AjfAttachmentsType[AjfAttachmentsType.Link] = 'Link';
AjfAttachmentsType[AjfAttachmentsType.Pdf] = 'Pdf';
AjfAttachmentsType[AjfAttachmentsType.LENGTH] = 'LENGTH';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/** @enum {number} */
const AjfChoicesType = {
    String: 0,
    Number: 1,
    LENGTH: 2,
};
AjfChoicesType[AjfChoicesType.String] = 'String';
AjfChoicesType[AjfChoicesType.Number] = 'Number';
AjfChoicesType[AjfChoicesType.LENGTH] = 'LENGTH';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 * @param {?} origin
 * @return {?}
 */
function createChoicesFixedOrigin(origin) {
    /** @type {?} */
    const type = 'fixed';
    return Object.assign({}, createChoicesOrigin(Object.assign({}, origin, { type })), { type });
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @template T
 * @param {?} origin
 * @return {?}
 */
function createChoicesFunctionOrigin(origin) {
    return Object.assign({}, origin, { type: 'function', label: origin.label || '', choices: origin.choices || [] });
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @template T
 * @param {?} origin
 * @return {?}
 */
function createChoicesObservableArrayOrigin(origin) {
    return Object.assign({}, origin, { type: 'observableArray', label: origin.label || '', choices: origin.choices || [] });
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @template T
 * @param {?} origin
 * @return {?}
 */
function createChoicesObservableOrigin(origin) {
    return Object.assign({}, origin, { type: 'observable', label: origin.label || '', choices: origin.choices || [] });
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @template T
 * @param {?} origin
 * @return {?}
 */
function createChoicesPromiseOrigin(origin) {
    return Object.assign({}, origin, { type: 'promise', label: origin.label || '', choices: origin.choices || [] });
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @param {?} origin
 * @return {?}
 */
function initChoicesOrigin(origin) {
    if (origin.type === 'fixed') {
        return Promise.resolve();
    }
    if (origin.type === 'function') {
        /** @type {?} */
        const fo = (/** @type {?} */ (origin));
        fo.choices = fo.generator();
        return Promise.resolve();
    }
    if (origin.type === 'promise') {
        /** @type {?} */
        const po = (/** @type {?} */ (origin));
        return po.generator.then((/**
         * @param {?} choices
         * @return {?}
         */
        choices => po.choices = choices)).then();
    }
    if (origin.type === 'observable') {
        /** @type {?} */
        const obso = (/** @type {?} */ (origin));
        if (obso.generator != null) {
            obso.choices = [];
            return new Promise((/**
             * @param {?} res
             * @return {?}
             */
            res => {
                obso.generator.subscribe((/**
                 * @param {?} c
                 * @return {?}
                 */
                c => obso.choices.push(c)), (/**
                 * @return {?}
                 */
                () => { }), (/**
                 * @return {?}
                 */
                () => res()));
            }));
        }
    }
    if (origin.type === 'observableArray') {
        /** @type {?} */
        const aoo = (/** @type {?} */ (origin));
        if (aoo.generator != null) {
            aoo.choices = [];
            return new Promise((/**
             * @param {?} res
             * @return {?}
             */
            res => {
                aoo.generator.subscribe((/**
                 * @param {?} choices
                 * @return {?}
                 */
                choices => {
                    aoo.choices = choices;
                    res();
                }));
            }));
        }
    }
    return Promise.resolve();
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @param {?} co
 * @return {?}
 */
function isChoicesOrigin(co) {
    return co != null
        && typeof co === 'object'
        && co.name != null
        && typeof co.name === 'string'
        && co.label != null
        && typeof co.label === 'string'
        && ['fixed', 'promise', 'observable', 'observableArray', 'function'].indexOf(co.type) > -1
        && co.choices instanceof Array;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} origin
 * @return {?}
 */
function isChoicesFixedOrigin(origin) {
    return isChoicesOrigin(origin) && origin.type === 'fixed';
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} field
 * @return {?}
 */
function isNumberField(field) {
    return field.fieldType === AjfFieldType.Number;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @param {?=} form
 * @return {?}
 */
function createForm(form = {}) {
    return {
        nodes: form.nodes || [],
        choicesOrigins: form.choicesOrigins || [],
        attachmentsOrigins: form.attachmentsOrigins || [],
        initContext: form.initContext || {},
        stringIdentifier: form.stringIdentifier || (/** @type {?} */ ([])),
        supplementaryInformations: form.supplementaryInformations,
    };
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} maxValue
 * @return {?}
 */
function maxDigitsValidation(maxValue) {
    return createValidation({
        condition: `$value ? $value.toString().length >= ${maxValue.toString()} : false`,
        errorMessage: 'Digits count must be >= ' + maxValue.toString()
    });
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} maxValue
 * @return {?}
 */
function maxValidation(maxValue) {
    return createValidation({
        condition: '$value >= ' + maxValue.toString(),
        errorMessage: 'Value must be >= ' + maxValue.toString()
    });
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} minValue
 * @return {?}
 */
function minDigitsValidation(minValue) {
    return createValidation({
        condition: `$value ? $value.toString().length >= ${minValue.toString()} : false`,
        errorMessage: 'Digits count must be >= ' + minValue.toString()
    });
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} minValue
 * @return {?}
 */
function minValidation(minValue) {
    return createValidation({
        condition: '$value >= ' + minValue.toString(),
        errorMessage: 'Value must be >= ' + minValue.toString()
    });
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @return {?}
 */
function notEmptyValidation() {
    return createValidation({ condition: `notEmpty($value)`, errorMessage: `Value must not be empty` });
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @return {?}
 */
function notEmptyWarning() {
    return createWarning({ condition: 'notEmpty($value)', warningMessage: 'Value must not be empty' });
}

export { AJF_SEARCH_ALERT_THRESHOLD, AjfAttachmentsOriginSerializer, AjfAttachmentsType, AjfBaseFieldComponent, AjfChoicesOriginSerializer, AjfChoicesType, AjfDateValuePipe, AjfDateValueStringPipe, AjfFieldHost, AjfFieldIconPipe, AjfFieldIsValidPipe, AjfFieldService, AjfFieldType, AjfFieldWithChoicesComponent, AjfFormActionEvent, AjfFormField, AjfFormInitStatus, AjfFormRenderer, AjfFormRendererService, AjfFormSerializer, AjfFormsModule, AjfInputFieldComponent, AjfInvalidFieldDefinitionError, AjfNodeCompleteNamePipe, AjfNodeSerializer, AjfNodeType, AjfTableRowClass, AjfTableVisibleColumnsPipe, AjfValidationGroupSerializer, AjfValidationService, AjfWarningGroupSerializer, createChoicesFixedOrigin, createChoicesFunctionOrigin, createChoicesObservableArrayOrigin, createChoicesObservableOrigin, createChoicesOrigin, createChoicesPromiseOrigin, createField, createFieldInstance, createFieldWithChoicesInstance, createForm, createNode, createNodeInstance, createValidation, createValidationGroup, createWarning, createWarningGroup, fieldIconName, flattenNodes, getTypeName, initChoicesOrigin, isChoicesFixedOrigin, isChoicesOrigin, isContainerNode, isCustomFieldWithChoices, isField, isFieldWithChoices, isNumberField, isRepeatingContainerNode, isSlidesNode, maxDigitsValidation, maxValidation, minDigitsValidation, minValidation, notEmptyValidation, notEmptyWarning, AjfBoolToIntPipe as ɵa, AjfExpandFieldWithChoicesPipe as ɵb, AjfIncrementPipe as ɵc, AjfIsRepeatingSlideInstancePipe as ɵd, AjfRangePipe as ɵe, AjfValidSlidePipe as ɵf, createNodeGroup as ɵg, createRepeatingSlide as ɵh, createSlide as ɵi, componentsMap as ɵj };
//# sourceMappingURL=forms.js.map
