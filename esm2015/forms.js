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
import { deepCopy, coerceBooleanProperty } from '@ajf/core/utils';
import { Subscription, ReplaySubject, Subject, BehaviorSubject, Observable, timer } from 'rxjs';
import { AjfJsonSerializable, AjfError, AjfCondition, AjfFormula, AjfValidatedProperty } from '@ajf/core/models';
import { Pipe, EventEmitter, Injectable, NgModule } from '@angular/core';
import { withLatestFrom, filter, map, publishReplay, refCount, startWith, scan, share, pairwise, debounceTime, delayWhen } from 'rxjs/operators';
import * as esprima from 'esprima';
import esprima__default, {  } from 'esprima';
import { FormGroup, FormControl } from '@angular/forms';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
 * This class will define an ajf attachment
 * @template T
 */
class AjfAttachment {
    /**
     * @param {?=} obj
     */
    constructor(obj) {
        this._label = obj && obj.label || null;
        this._value = obj && obj.value || null;
        this._type = obj && obj.type || null;
    }
    /**
     * @return {?}
     */
    get label() { return this._label; }
    /**
     * @return {?}
     */
    get value() { return this._value; }
    /**
     * @return {?}
     */
    get type() { return this._type; }
}
/**
 * This class will define an ajf attachments orgin
 * @abstract
 */
class AjfAttachmentsOrigin {
    /**
     * this static method will create attachment
     * @param {?} obj : any - object attachment
     * @return {?} AjfAttachment
     */
    static create(obj) {
        /** @type {?} */
        let attachments = [];
        if (obj.attachments instanceof Array) {
            for (let i = 0; i < obj.attachments.length; i++) {
                /** @type {?} */
                let att = obj.attachments[i];
                switch (att.type) {
                    case AjfAttachmentsType.Link:
                        attachments.push(new AjfAttachment(att));
                        break;
                    case AjfAttachmentsType.Pdf:
                        attachments.push(new AjfAttachment(att));
                        break;
                    default:
                        throw new Error('Invalid attachment type');
                }
            }
        }
        obj.attachments = attachments;
        return new AjfAttachmentsFixedOrigin(obj);
    }
    /**
     * this static method will load an AjfAttachmentsOrigin from json
     * @param {?} obj : any - object Attachments
     * @return {?} AjfAttachmentsOrigin
     */
    static fromJson(obj) {
        obj = deepCopy(obj);
        /** @type {?} */
        let keys = Object.keys(obj);
        if (keys.indexOf('type') === -1) {
            throw new Error('Attachments origin type missing type');
        }
        /** @type {?} */
        let type = obj.type;
        delete obj.type;
        switch (type) {
            case 'fixed':
                return AjfAttachmentsFixedOrigin.create(obj);
            default:
                throw new Error('Invalid attachment origin type');
        }
    }
    /**
     * @return {?}
     */
    getName() { return this._name; }
    /**
     * @param {?=} obj
     */
    constructor(obj) { this._name = obj && obj.name || null; }
}
/**
 * This class will define an ajf attachments fixed origin
 */
class AjfAttachmentsFixedOrigin extends AjfAttachmentsOrigin {
    /**
     * @param {?=} obj
     */
    constructor(obj) {
        super(obj);
        this._attachments = obj && obj.attachments || [];
    }
    /**
     * @return {?}
     */
    getAttachments() { return this._attachments; }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
 * @template T
 */
class AjfChoice extends AjfJsonSerializable {
    /**
     * @param {?=} obj
     */
    constructor(obj) {
        super(obj);
        this.label = obj && obj.label || '';
        this.value = obj && obj.value || null;
    }
}
/**
 * @abstract
 * @template T
 */
class AjfChoicesOrigin extends AjfJsonSerializable {
    /**
     * @param {?=} obj
     */
    constructor(obj) {
        super();
        this.jsonExportedMembers = this.jsonExportedMembers.concat(['type', 'name', 'label', 'choicesType']);
        this._name = obj && obj.name || null;
        this._label = obj && obj.label || null;
        this._choicesType = obj && obj.choicesType || null;
    }
    /**
     * @param {?} type
     * @param {?=} obj
     * @return {?}
     */
    static create(type, obj) {
        switch (type) {
            case 'string':
                return new AjfChoicesFixedOrigin(obj);
            case 'number':
                return new AjfChoicesFixedOrigin(obj);
            default:
                return null;
        }
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    static fromJson(obj) {
        obj = deepCopy(obj);
        /** @type {?} */
        let keys = Object.keys(obj);
        if (keys.indexOf('type') === -1) {
            throw new Error('Choices origin type missing type');
        }
        /** @type {?} */
        let type = obj.type;
        delete obj.type;
        switch (type) {
            case 'fixed':
                return new AjfChoicesFixedOrigin(obj);
            case 'function':
                return new AjfChoicesFunctionOrigin(obj);
            case 'observable':
                return new AjfChoicesObservableOrigin(obj);
            case 'observableArray':
                return new AjfChoicesObservableArrayOrigin(obj);
            case 'promise':
                return new AjfChoicesObservableOrigin(obj);
            default:
                throw new Error('Invalid choices origin type');
        }
    }
    /**
     * @return {?}
     */
    getName() { return this._name; }
    /**
     * @return {?}
     */
    getLabel() { return this._label; }
    /**
     * @param {?} name
     * @return {?}
     */
    setName(name) { this._name = name; }
    /**
     * @param {?} label
     * @return {?}
     */
    setLabel(label) { this._label = label; }
    /**
     * @return {?}
     */
    getChoicesType() {
        return this._choicesType || this._guessChoicesType();
    }
    /**
     * @private
     * @return {?}
     */
    _guessChoicesType() {
        /** @type {?} */
        let cs = this.getChoices();
        if (cs && cs.length > 0) {
            this._choicesType = getTypeName(cs[0].value);
        }
        return this._choicesType;
    }
}
/**
 * @template T
 */
class AjfChoicesFixedOrigin extends AjfChoicesOrigin {
    /**
     * @param {?=} obj
     */
    constructor(obj) {
        super(obj);
        this.jsonExportedMembers = this.jsonExportedMembers.concat('choices');
        this._choices = obj && (/** @type {?} */ (obj.choices)) || [];
    }
    /**
     * @return {?}
     */
    getType() { return 'fixed'; }
    /**
     * @return {?}
     */
    getChoices() { return this._choices; }
    /**
     * @param {?} choices
     * @return {?}
     */
    setChoices(choices) { this._choices = choices.slice(0); }
}
/**
 * @template T
 */
class AjfChoicesFunctionOrigin extends AjfChoicesOrigin {
    /**
     * @param {?} generator
     * @param {?=} obj
     */
    constructor(generator, obj) {
        super(obj);
        this.jsonExportedMembers = this.jsonExportedMembers.concat('generator');
        this._generator = generator;
    }
    /**
     * @return {?}
     */
    get generator() { return this._generator; }
    /**
     * @return {?}
     */
    getType() { return 'function'; }
    /**
     * @return {?}
     */
    getChoices() { return this._generator(); }
}
/**
 * @template T
 */
class AjfChoicesObservableOrigin extends AjfChoicesOrigin {
    /**
     * @param {?} _observable
     * @param {?=} obj
     */
    constructor(_observable, obj) {
        super(obj);
        this._observable = _observable;
        this._currentChoices = [];
        this._subscription = Subscription.EMPTY;
        this.jsonExportedMembers = this.jsonExportedMembers.concat('observable');
        /** @type {?} */
        let self = this;
        this._subscription = _observable.subscribe((/**
         * @param {?} x
         * @return {?}
         */
        (x) => self._currentChoices.push(x)));
    }
    /**
     * @return {?}
     */
    get observable() {
        return this._observable;
    }
    /**
     * @return {?}
     */
    getType() { return 'observable'; }
    /**
     * @return {?}
     */
    getChoices() { return this._currentChoices.splice(0); }
    /**
     * @return {?}
     */
    destroy() {
        this._subscription.unsubscribe();
    }
}
/**
 * @template T
 */
class AjfChoicesObservableArrayOrigin extends AjfChoicesOrigin {
    /**
     * @param {?} _observable
     * @param {?=} obj
     */
    constructor(_observable, obj) {
        super(obj);
        this._observable = _observable;
        this._currentChoices = [];
        this._subscription = Subscription.EMPTY;
        this.jsonExportedMembers = this.jsonExportedMembers.concat('observable');
        /** @type {?} */
        let self = this;
        this._subscription = _observable.subscribe((/**
         * @param {?} x
         * @return {?}
         */
        (x) => self._currentChoices = x.splice(0)));
    }
    /**
     * @return {?}
     */
    get observable() {
        return this._observable;
    }
    /**
     * @return {?}
     */
    getType() { return 'observableArray'; }
    /**
     * @return {?}
     */
    getChoices() { return this._currentChoices.splice(0); }
    /**
     * @return {?}
     */
    destroy() {
        this._subscription.unsubscribe();
    }
}
/**
 * @template T
 */
class AjfChoicesPromiseOrigin extends AjfChoicesOrigin {
    /**
     * @param {?} promise
     * @param {?=} obj
     */
    constructor(promise, obj) {
        super(obj);
        this._choices = [];
        this.jsonExportedMembers = this.jsonExportedMembers.concat('promise');
        promise.then((/**
         * @param {?} x
         * @return {?}
         */
        (x) => { this._choices = x.splice(0); }));
    }
    /**
     * @return {?}
     */
    getType() { return 'promise'; }
    /**
     * @return {?}
     */
    getChoices() { return this._choices.splice(0); }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @param {?} n
 * @return {?}
 */
function factorial(n) {
    /** @type {?} */
    let f = 1;
    for (let i = n; i > 1; i--) {
        f = f * i;
    }
    return f;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfValidationResult {
    /**
     * this constructor will assign the parameters value to a class variables
     * \@cVal : boolean
     * @param {?} res : boolean
     * @param {?} err : string
     * @param {?} cVal
     */
    constructor(res, err, cVal) {
        this.result = res;
        this.error = err;
        this.clientValidation = cVal;
    }
}
/**
 * This class will define an ajf validation
 */
class AjfValidation extends AjfCondition {
    /**
     * this static method will load an AjfValidation from json
     * @param {?} obj  : any - object validation
     * @return {?} AjfValidation
     */
    static fromJson(obj) {
        obj = deepCopy(obj);
        return new AjfValidation(obj);
    }
    /**
     * this static method will get an ajfValidation with maxValue setted
     * @param {?} maxValue : number - max value
     * @return {?} AjfValidation
     */
    static getMaxCondition(maxValue) {
        return new AjfValidation({
            condition: '$value <= ' + maxValue.toString(),
            errorMessage: 'Value must be <= ' + maxValue.toString()
        });
    }
    /**
     * this static method will get an ajfValidation with minValue setted
     * @param {?} minValue : number - min value
     * @return {?} AjfValidation
     */
    static getMinCondition(minValue) {
        return new AjfValidation({
            condition: '$value >= ' + minValue.toString(),
            errorMessage: 'Value must be >= ' + minValue.toString()
        });
    }
    /**
     * this static method will get an ajfValidation with notEmpty setted
     * @return {?} AjfValidation
     */
    static getNotEmptyCondition() {
        return new AjfValidation({
            condition: `notEmpty($value)`,
            errorMessage: `Value must not be empty`
        });
    }
    /**
     * this static method will get an ajfValidation with maxDigit setted
     * @param {?} maxValue
     * @return {?} AjfValidation
     */
    static getMaxDigitsCondition(maxValue) {
        return new AjfValidation({
            condition: `$value ? $value.toString().length <= ${maxValue.toString()} : false`,
            errorMessage: 'Digits count must be <= ' + maxValue.toString()
        });
    }
    /**
     * this static method will get an ajfValidation with minDigit setted
     * @param {?} minValue
     * @return {?} AjfValidation
     */
    static getMinDigitsCondition(minValue) {
        return new AjfValidation({
            condition: `$value ? $value.toString().length >= ${minValue.toString()} : false`,
            errorMessage: 'Digits count must be >= ' + minValue.toString()
        });
    }
    /**
     * this constructor will assign the obj value to a class variables and call
     * super()
     * @param {?=} obj
     */
    constructor(obj) {
        super(obj);
        this.clientValidation = obj && obj.clientValidation || false;
        this.errorMessage = obj && obj.errorMessage || 'Undefined Error';
        this.jsonExportedMembers = this.jsonExportedMembers
            .concat(['clientValidation', 'errorMessage']);
    }
    /**
     * this public method will evaluate context or forceFormula
     * @param {?=} context      : any - context
     * @param {?=} forceFormula : string - formula
     * @return {?} AjfValidationResult
     */
    evaluate(context, forceFormula) {
        return new AjfValidationResult(super.evaluate(context, forceFormula), this.errorMessage, this.clientValidation);
    }
}
/**
 * This class will define an ajf validation group
 */
class AjfValidationGroup extends AjfJsonSerializable {
    /**
     * this static method will load an AjfValidationGroup from json
     * @param {?} obj  : any - object validationGroup
     * @return {?} AjfValidationGroup
     */
    static fromJson(obj) {
        /** @type {?} */
        let keys = Object.keys(obj);
        if (keys.indexOf('maxValue') > -1 && typeof obj.maxValue === 'number') {
            obj.maxValue = AjfValidation.getMaxCondition(obj.maxValue);
        }
        if (keys.indexOf('minValue') > -1 && typeof obj.minValue === 'number') {
            obj.minValue = AjfValidation.getMinCondition(obj.minValue);
        }
        if (keys.indexOf('notEmpty') > -1) {
            obj.notEmpty = AjfValidation.getNotEmptyCondition();
        }
        if (keys.indexOf('forceValue') > -1) {
            obj.forceValue = AjfCondition.fromJson(obj.forceValue);
        }
        if (keys.indexOf('maxDigits') > -1 && typeof obj.maxDigits === 'number') {
            obj.maxDigits = AjfValidation.getMaxDigitsCondition(obj.maxDigits);
        }
        if (keys.indexOf('minDigits') > -1 && typeof obj.minDigits === 'number') {
            obj.minDigits = AjfValidation.getMinDigitsCondition(obj.minDigits);
        }
        if (keys.indexOf('conditions') > -1 && obj.conditions instanceof Array) {
            /** @type {?} */
            let conditions = [];
            for (let c of obj.conditions) {
                conditions.push(AjfValidation.fromJson(c));
            }
            obj.conditions = conditions;
        }
        return new AjfValidationGroup(obj);
    }
    /**
     * this constructor will assign the obj value to a class variables
     * @param {?=} obj : any
     */
    constructor(obj) {
        super(obj);
        this.forceValue = obj && obj.forceValue || null;
        this.maxValue = obj && obj.maxValue || null;
        this.minValue = obj && obj.minValue || null;
        this.notEmpty = obj && obj.notEmpty || null;
        this.maxDigits = obj && obj.maxDigits || null;
        this.minDigits = obj && obj.minDigits || null;
        this.conditions = obj && obj.conditions || [];
        this.jsonExportedMembers = this.jsonExportedMembers
            .concat([
            'forceValue', 'maxValue', 'minValue', 'notEmpty',
            'maxDigits', 'minDigits', 'conditions'
        ]);
    }
    /**
     * @return {?}
     */
    toJson() {
        /** @type {?} */
        const json = {};
        if (this.forceValue != null) {
            json['forceValue'] = true;
        }
        if (this.maxValue != null) {
            json['maxValue'] = this.maxValue.condition.replace('$value <= ', '');
        }
        if (this.minValue != null) {
            json['minValue'] = this.minValue.condition.replace('$value >= ', '');
        }
        if (this.notEmpty != null) {
            json['notEmpty'] = true;
        }
        if (this.maxDigits != null) {
            json['maxDigits'] = this.maxDigits.condition.replace('$value ? $value.toString().length <=  : false', '');
        }
        if (this.minDigits != null) {
            json['minDigits'] = this.minDigits.condition.replace('$value ? $value.toString().length >=  : false', '');
        }
        if (this.conditions != null) {
            json['conditions'] = this.conditions.map((/**
             * @param {?} c
             * @return {?}
             */
            c => c.toJson()));
        }
        return json;
    }
    /**
     * this protected method evaluate max value
     * @protected
     * @param {?} value : any
     * @return {?} AjfValidationResult
     */
    _evaluateMaxValue(value) {
        if (this.maxValue == null) {
            return null;
        }
        return this.maxValue.evaluate({ '$value': value });
    }
    /**
     * this protected method evaluate min value
     * @protected
     * @param {?} value : any
     * @return {?} AjfValidationResult
     */
    _evaluateMinvalue(value) {
        if (this.minValue == null) {
            return null;
        }
        return this.minValue.evaluate({ '$value': value });
    }
    /**
     * this protected method evaluate not empty value
     * @protected
     * @param {?} value : any
     * @return {?} AjfValidationResult
     */
    _evaluateNotEmpty(value) {
        if (this.notEmpty == null) {
            return null;
        }
        return this.notEmpty.evaluate({ '$value': value });
    }
    /**
     * this protected method evaluate conditions
     * @protected
     * @param {?} context : any
     * @return {?} AjfValidationResult[]
     */
    _evaluateConditions(context) {
        /** @type {?} */
        let res = [];
        this.conditions.forEach((/**
         * @param {?} cond
         * @return {?}
         */
        (cond) => {
            res.push(cond.evaluate(context));
        }));
        return res;
    }
    /**
     * this public method evaluate
     * @param {?} value   : any
     * @param {?=} context : any
     * @return {?} AjfValidationResult[]
     */
    evaluate(value, context) {
        /** @type {?} */
        let res = [];
        /** @type {?} */
        let ctx = deepCopy(context);
        ctx['$value'] = value;
        res = this._evaluateConditions(ctx);
        if (this.maxValue) {
            /** @type {?} */
            const maxValue = this._evaluateMaxValue(value);
            if (maxValue != null) {
                res.push();
            }
        }
        if (this.minValue) {
            /** @type {?} */
            const minValue = this._evaluateMinvalue(value);
            if (minValue != null) {
                res.push(minValue);
            }
        }
        if (this.notEmpty) {
            /** @type {?} */
            const notEmpty = this._evaluateNotEmpty(value);
            if (notEmpty != null) {
                res.push(notEmpty);
            }
        }
        if (this.maxDigits) {
            res.push(this.maxDigits.evaluate({ '$value': value }));
        }
        if (this.minDigits) {
            res.push(this.minDigits.evaluate({ '$value': value }));
        }
        return res;
    }
    /**
     * this public method evaluate force value
     * @param {?} context : any
     * @return {?} string
     */
    evaluateForceValue(context) {
        return this.forceValue.evaluate(context);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * This class will define an ajf warning result
 */
class AjfWarningResult {
    /**
     * this constructor will assign the parameters value to a class variables
     * @param {?} res : boolean
     * @param {?} wrn : string
     */
    constructor(res, wrn) {
        this.result = res;
        this.warning = wrn;
    }
}
/**
 * This class will define an ajf warning
 */
class AjfWarning extends AjfCondition {
    /**
     * this static method will load an AjfWarning from json
     * @param {?} obj  : any - object warning
     * @return {?} AjfWarning
     */
    static fromJson(obj) { return new AjfWarning(obj); }
    /**
     * @return {?}
     */
    static getNotEmptyWarning() {
        return new AjfWarning({
            condition: `notEmpty($value)`,
            warningMessage: `Value must not be empty`
        });
    }
    /**
     * this constructor will assign the obj value to a class variables and call
     * super()
     * @param {?=} obj
     */
    constructor(obj) {
        super(obj);
        this.warningMessage = obj && obj.warningMessage || 'Undefined Error';
        this.jsonExportedMembers = this.jsonExportedMembers
            .concat(['warningMessage']);
    }
    /**
     * this public method will evaluate context or forceFormula
     * @param {?=} context      : any - context
     * @param {?=} forceFormula : string - formula
     * @return {?} AjfWarningResult
     */
    evaluate(context, forceFormula) {
        return new AjfWarningResult(super.evaluate(context, forceFormula), this.warningMessage);
    }
}
/**
 * This class will define an ajf warning group
 */
class AjfWarningGroup extends AjfJsonSerializable {
    /**
     * this static method will load an AjfWarningGroup from json
     * @param {?} obj  : any - object warningGroup
     * @return {?} AjfValidationGroup
     */
    static fromJson(obj) {
        /** @type {?} */
        let keys = Object.keys(obj);
        if (keys.indexOf('notEmpty') > -1) {
            obj.notEmpty = AjfWarning.getNotEmptyWarning();
        }
        if (keys.indexOf('conditions') > -1 && obj.conditions instanceof Array) {
            /** @type {?} */
            let conditions = [];
            for (let c of obj.conditions) {
                conditions.push(AjfWarning.fromJson(c));
            }
            obj.conditions = conditions;
        }
        return new AjfWarningGroup(obj);
    }
    /**
     * this constructor will assign the obj value to a class variables
     * @param {?=} obj : any
     */
    constructor(obj) {
        super(obj);
        this.notEmpty = obj && obj.notEmpty || null;
        this.conditions = obj && obj.conditions || null;
        this.jsonExportedMembers = this.jsonExportedMembers
            .concat(['notEmpty', 'conditions']);
    }
    /**
     * this protected method evaluate conditions
     * @protected
     * @param {?} context : any
     * @return {?} AjfWarningResult[]
     */
    _evaluateConditions(context) {
        /** @type {?} */
        let res = [];
        this.conditions.forEach((/**
         * @param {?} cond
         * @return {?}
         */
        (cond) => {
            res.push(cond.evaluate(context));
        }));
        return res;
    }
    /**
     * this public method evaluate
     * @param {?=} context : any
     * @return {?} AjfWarningResult[]
     */
    evaluate(context) {
        /** @type {?} */
        let res = this._evaluateConditions(context);
        return res;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
 * This class will define an ajf node
 */
class AjfNode extends AjfJsonSerializable {
    /**
     * @return {?}
     */
    get id() { return this._id; }
    /**
     * @param {?} id
     * @return {?}
     */
    set id(id) { this._id = id; }
    /**
     * @return {?}
     */
    get parent() { return this._parent; }
    /**
     * @param {?} parent
     * @return {?}
     */
    set parent(parent) { this._parent = parent; }
    /**
     * @return {?}
     */
    get parentNode() { return this._parentNode; }
    /**
     * @param {?} parentNode
     * @return {?}
     */
    set parentNode(parentNode) { this._parentNode = parentNode; }
    /**
     * this method will get the conditionalBranches of the field
     * @return {?} : _conditionalBranches
     */
    get conditionalBranches() {
        return this._conditionalBranches;
    }
    /**
     * this method will set the conditionalBranches of the field
     * @param {?} conditionalBranches : AjfCondition[] - the new conditionalBranches
     * @return {?}
     */
    set conditionalBranches(conditionalBranches) {
        this._conditionalBranches = conditionalBranches;
    }
    /**
     * this method will get the current name of field
     * @return {?} : _name
     */
    get name() {
        return this._name;
    }
    /**
     * this method will set the current name of field
     * @param {?} name : string - the new name
     * @return {?}
     */
    set name(name) {
        this._name = name;
    }
    /**
     * this method will get the label of the field
     * @return {?} : _label
     */
    get label() {
        return this._label;
    }
    /**
     * this method will set the label of the field
     * @param {?} label : string - the new label
     * @return {?}
     */
    set label(label) {
        this._label = label;
    }
    /**
     * this method will get the visibility of the field
     * @return {?} : _visibility
     */
    get visibility() {
        return this._visibility;
    }
    /**
     * this method will set the visibility of the field
     * @param {?} visibility : AjfCondition - the new visibility
     * @return {?}
     */
    set visibility(visibility) {
        this._visibility = visibility;
    }
    /**
     * this method will load an AjfNode from json
     * @param {?} obj                : any - object node
     * @param {?=} choicesOrigins     : any[] - array of choicesOrigins
     * @param {?=} attachmentsOrigins : any[] - array of attachmentsOrigins
     * @param {?=} context
     * @return {?} AjfNode
     */
    static fromJson(obj, choicesOrigins, attachmentsOrigins, context) {
        // array of string:  contains a keys Object
        // example:
        // ["id", "name", "label", "visibility", "hasChoices", "parent",
        //  "parentNode", "nodeType", "conditionalBranches", "fieldType", "nodes"]
        obj = deepCopy(obj);
        if (context) {
            context = deepCopy(context);
        }
        /** @type {?} */
        let keys = Object.keys(obj);
        if (keys.indexOf('nodeType') === -1) {
            throw new Error('Node type missing type');
        }
        /** @type {?} */
        let nodeType = obj.nodeType;
        delete obj.nodeType;
        if (AjfNodeType[nodeType] == null) {
            throw new Error('Invalid node type');
        }
        if (keys.indexOf('visibility') > -1) {
            obj.visibility = AjfCondition.fromJson(obj.visibility);
        }
        if (keys.indexOf('conditionalBranches') > -1 && obj.conditionalBranches instanceof Array) {
            /** @type {?} */
            let cbs = [];
            for (let i = 0; i < obj.conditionalBranches.length; i++) {
                cbs.push(AjfCondition.fromJson(obj.conditionalBranches[i]));
            }
            if (cbs.length == 0) {
                cbs.push(AjfCondition.alwaysCondition());
            }
            obj.conditionalBranches = cbs;
        }
        return AjfNode.createNode(nodeType, obj, choicesOrigins, attachmentsOrigins, context);
    }
    /**
     * this method will create an AjfNode
     * @param {?} nodeType           : identified a type of node (nodeGroup or nodeField)
     * @param {?=} obj                : any - object node
     * @param {?=} choicesOrigins     : any[] - array of choicesOrigins
     * @param {?=} attachmentsOrigins : any[] - array of attachmentsOrigins
     * @param {?=} context
     * @return {?} AjfNode
     */
    static createNode(nodeType, obj, choicesOrigins, attachmentsOrigins, context) {
        choicesOrigins = choicesOrigins || [];
        attachmentsOrigins = attachmentsOrigins || [];
        switch (nodeType) {
            case AjfNodeType.AjfNodeGroup:
                return AjfNodeGroup.fromJson(obj, choicesOrigins, attachmentsOrigins, context);
            case AjfNodeType.AjfField:
                return AjfField.fromJson(obj, choicesOrigins, attachmentsOrigins, context);
            case AjfNodeType.AjfRepeatingSlide:
                return AjfRepeatingSlide.fromJson(obj, choicesOrigins, attachmentsOrigins, context);
            case AjfNodeType.AjfSlide:
                return AjfSlide.fromJson(obj, choicesOrigins, attachmentsOrigins, context);
            default:
                throw new Error('Invalid node type');
        }
    }
    /**
     * this method get the nodeType
     * @return {?} AjfNodeType
     */
    get nodeType() {
        /** @type {?} */
        const thisObj = this;
        if (thisObj instanceof AjfField) {
            return AjfNodeType.AjfField;
        }
        if (thisObj instanceof AjfFieldNodeLink) {
            return AjfNodeType.AjfFieldNodeLink;
        }
        if (thisObj instanceof AjfNodeGroup) {
            return AjfNodeType.AjfNodeGroup;
        }
        if (thisObj instanceof AjfRepeatingSlide) {
            return AjfNodeType.AjfRepeatingSlide;
        }
        if (thisObj instanceof AjfSlide) {
            return AjfNodeType.AjfSlide;
        }
        throw new Error('Invalid node type');
    }
    /**
     * this constructor will assign the obj value to a class variables
     * @param {?=} obj
     */
    constructor(obj) {
        super();
        this.jsonExportedMembers = this.jsonExportedMembers.concat([
            'id', 'nodeType', 'parent', 'parentNode', 'visibility', 'name', 'label',
            'conditionalBranches'
        ]);
        this._id = obj && obj.id || null;
        this._parent = obj && obj.parent || null;
        this._parentNode = obj && obj.parentNode || 0;
        this._visibility = obj && obj.visibility || AjfCondition.alwaysCondition();
        this._name = obj && obj.name || null;
        this._label = obj && obj.label || null;
        this._conditionalBranches = obj && obj.conditionalBranches || [AjfCondition.alwaysCondition()];
    }
    /**
     * this method will set the conditiona branch number of the field
     * @param {?} cbn : number
     * @return {?}
     */
    setConditionalBranchesNum(cbn) {
        if (this.getMaxConditionalBranches() >= 0) {
            cbn = Math.min(cbn, this.getMaxConditionalBranches());
        }
        if (cbn < this.conditionalBranches.length) {
            this.conditionalBranches = this.conditionalBranches.slice(0, cbn);
        }
        else if (cbn > this.conditionalBranches.length) {
            for (let i = this.conditionalBranches.length; i < cbn; i++) {
                this.conditionalBranches.push(AjfCondition.alwaysCondition());
            }
        }
    }
    /**
     * this method will get the max xonditional branches of the field
     * @return {?} number
     */
    getMaxConditionalBranches() {
        return -1;
    }
}
class AjfFieldNodeLink extends AjfNode {
}
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
    LENGTH: 12,
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
AjfFieldType[AjfFieldType.LENGTH] = 'LENGTH';
/**
 * This class will define an ajf node group
 */
class AjfNodeGroup extends AjfNode {
    /**
     * @return {?}
     */
    get nodes() { return this._nodes; }
    /**
     * @param {?} nodes
     * @return {?}
     */
    set nodes(nodes) { this._nodes = nodes; }
    /**
     * @return {?}
     */
    get formulaReps() { return this._formulaReps; }
    /**
     * @param {?} formulaReps
     * @return {?}
     */
    set formulaReps(formulaReps) { this._formulaReps = formulaReps; }
    /**
     * @return {?}
     */
    get maxReps() { return this._maxReps; }
    /**
     * @param {?} maxReps
     * @return {?}
     */
    set maxReps(maxReps) { this._maxReps = maxReps; }
    /**
     * @return {?}
     */
    get minReps() { return this._minReps; }
    /**
     * @param {?} minReps
     * @return {?}
     */
    set minReps(minReps) { this._minReps = minReps; }
    /**
     * this method will load an AjfNodeGroup from json
     * @param {?} obj                : any - object node
     * @param {?} choicesOrigins     : any[] - array of choicesOrigins
     * @param {?} attachmentsOrigins : any[] - array of attachmentsOrigins
     * @param {?} context
     * @return {?} AjfNodeGroup
     */
    static fromJson(obj, choicesOrigins, attachmentsOrigins, context) {
        // array of string:  contains a keys Object
        // example:
        // ["id", "parent", "parentNode", "formulaReps", "nodes"]
        obj = deepCopy(obj);
        if (context) {
            context = deepCopy(context);
        }
        /** @type {?} */
        let keys = Object.keys(obj);
        if (keys.indexOf('nodes') > -1 && obj.nodes instanceof Array) {
            /** @type {?} */
            let nodes = [];
            for (let i = 0; i < obj.nodes.length; i++) {
                nodes.push(AjfNode.fromJson(obj.nodes[i], choicesOrigins, attachmentsOrigins));
            }
            obj.nodes = nodes;
        }
        if (keys.indexOf('formulaReps') > -1 && obj.formulaReps != null) {
            obj.formulaReps = AjfFormula.fromJson(obj.formulaReps);
        }
        if (keys.indexOf('visibility') > -1 && obj.visibility != null) {
            obj.visibility = AjfCondition.fromJson(obj.visibility);
        }
        if (keys.indexOf('conditionalBranches') > -1 && obj.conditionalBranches instanceof Array) {
            /** @type {?} */
            let cbs = [];
            for (let i = 0; i < obj.conditionalBranches.length; i++) {
                cbs.push(AjfCondition.fromJson(obj.conditionalBranches[i]));
            }
            obj.conditionalBranches = cbs;
        }
        /** @type {?} */
        let ret = new AjfNodeGroup(obj);
        return ret;
    }
    /**
     * this constructor will assign the obj value to a class variables
     * @param {?=} obj
     */
    constructor(obj) {
        super(obj);
        this.jsonExportedMembers = this.jsonExportedMembers.concat([
            'formulaReps', 'minReps', 'maxReps', 'nodes'
        ]);
        this.nodes = obj && obj.nodes || [];
        this.formulaReps = obj && obj.formulaReps || null;
        this.maxReps = obj && obj.maxReps || null;
        this.minReps = obj && obj.minReps || null;
    }
}
/**
 * Represents a form slide.
 * Slides are specialized node groups used to layout the form.
 * They must be at the root level of the form
 *
 * @export
 */
class AjfSlide extends AjfNode {
    /**
     * @return {?}
     */
    get nodes() { return this._nodes.slice(0); }
    /**
     * @param {?} nodes
     * @return {?}
     */
    set nodes(nodes) { this._nodes = nodes.slice(0); }
    /**
     * @param {?} obj
     * @param {?} choicesOrigins
     * @param {?} attachmentsOrigins
     * @param {?} context
     * @return {?}
     */
    static fromJson(obj, choicesOrigins, attachmentsOrigins, context) {
        obj = deepCopy(obj);
        if (context) {
            context = deepCopy(context);
        }
        /** @type {?} */
        let keys = Object.keys(obj);
        if (keys.indexOf('visibility') > -1 && obj.visibility != null) {
            obj.visibility = AjfCondition.fromJson(obj.visibility);
        }
        if (keys.indexOf('nodes') > -1 && obj.nodes instanceof Array) {
            /** @type {?} */
            let nodes = [];
            for (let i = 0; i < obj.nodes.length; i++) {
                nodes.push(AjfNode.fromJson(obj.nodes[i], choicesOrigins, attachmentsOrigins));
            }
            obj.nodes = nodes;
        }
        if (keys.indexOf('conditionalBranches') > -1 && obj.conditionalBranches instanceof Array) {
            /** @type {?} */
            let cbs = [];
            for (let i = 0; i < obj.conditionalBranches.length; i++) {
                cbs.push(AjfCondition.fromJson(obj.conditionalBranches[i]));
            }
            obj.conditionalBranches = cbs;
        }
        return new AjfSlide(obj);
    }
    /**
     * @param {?=} obj
     */
    constructor(obj) {
        super(obj);
        this.jsonExportedMembers = this.jsonExportedMembers.concat(['nodes']);
        this._nodes = obj && obj.nodes || [];
    }
}
class AjfRepeatingSlide extends AjfSlide {
    /**
     * @return {?}
     */
    get formulaReps() { return this._formulaReps; }
    /**
     * @param {?} formulaReps
     * @return {?}
     */
    set formulaReps(formulaReps) { this._formulaReps = formulaReps; }
    /**
     * @return {?}
     */
    get maxReps() { return this._maxReps; }
    /**
     * @param {?} maxReps
     * @return {?}
     */
    set maxReps(maxReps) { this._maxReps = maxReps; }
    /**
     * @return {?}
     */
    get minReps() { return this._minReps; }
    /**
     * @param {?} minReps
     * @return {?}
     */
    set minReps(minReps) { this._minReps = minReps; }
    /**
     * @param {?} obj
     * @param {?} choicesOrigins
     * @param {?} attachmentsOrigins
     * @param {?} context
     * @return {?}
     */
    static fromJson(obj, choicesOrigins, attachmentsOrigins, context) {
        obj = deepCopy(obj);
        if (context) {
            context = deepCopy(context);
        }
        /** @type {?} */
        let keys = Object.keys(obj);
        if (keys.indexOf('visibility') > -1 && obj.visibility != null) {
            obj.visibility = AjfCondition.fromJson(obj.visibility);
        }
        if (keys.indexOf('nodes') > -1 && obj.nodes instanceof Array) {
            /** @type {?} */
            let nodes = [];
            for (let i = 0; i < obj.nodes.length; i++) {
                nodes.push(AjfNode.fromJson(obj.nodes[i], choicesOrigins, attachmentsOrigins));
            }
            obj.nodes = nodes;
        }
        if (keys.indexOf('formulaReps') > -1 && obj.formulaReps != null) {
            obj.formulaReps = AjfFormula.fromJson(obj.formulaReps);
        }
        if (keys.indexOf('conditionalBranches') > -1 && obj.conditionalBranches instanceof Array) {
            /** @type {?} */
            let cbs = [];
            for (let i = 0; i < obj.conditionalBranches.length; i++) {
                cbs.push(AjfCondition.fromJson(obj.conditionalBranches[i]));
            }
            obj.conditionalBranches = cbs;
        }
        return new AjfRepeatingSlide(obj);
    }
    /**
     * @param {?=} obj
     */
    constructor(obj) {
        super(obj);
        this.jsonExportedMembers = this.jsonExportedMembers.concat([
            'nodes', 'formulaReps', 'minReps', 'maxReps'
        ]);
        this.formulaReps = obj && obj.formulaReps || null;
        this.nodes = obj && obj.nodes || [];
        this.minReps = obj && obj.minReps || 1;
        this.maxReps = obj && obj.maxReps || 0;
    }
}
/**
 * This class will define an ajf Field
 * @abstract
 */
class AjfField extends AjfNode {
    /**
     * this constructor will assign the obj value to a class variables
     * @param {?=} obj
     */
    constructor(obj) {
        super(obj);
        // a boolean to identify if the field have choices
        this._hasChoices = false;
        //  a boolean to identify if field has attachments
        this._hasAttachments = false;
        this.jsonExportedMembers = this.jsonExportedMembers.concat([
            'fieldType', 'description',
            'editable', 'formula', 'validation', 'warning', 'hasChoices', 'defaultValue', 'size',
            'nextSlideCondition'
        ]);
        this._description = obj && obj.description || null;
        this._formula = obj && obj.formula || null;
        this._validation = obj && obj.validation || null;
        this._warning = obj && obj.warning || null;
        this._attachmentsOrigin = obj && obj.attachmentsOrigin || null;
        this.defaultValue = obj && obj.defaultValue != null ? obj.defaultValue : null;
        this._size = obj && obj.size || 'normal';
        this._nextSlideCondition = obj && obj.nextSlideCondition || null;
        this.setHasAttachments(this._attachmentsOrigin && true || false);
        this._hasChoices = false;
        this.setEditable();
    }
    /**
     * this method will get the description of the field
     * @return {?} : _description
     */
    get description() {
        return this._description;
    }
    /**
     * this method will set the description of the field
     * @param {?} description : string - the new description
     * @return {?}
     */
    set description(description) {
        this._description = description;
    }
    /**
     * this method will get the editable status  of the field
     * @return {?} : _editable
     */
    get editable() {
        return this._editable;
    }
    /**
     * this method will get the formula of the field
     * @return {?} : _formula
     */
    get formula() {
        return this._formula;
    }
    /**
     * @param {?} formula
     * @return {?}
     */
    set formula(formula) {
        this._formula = formula;
    }
    /**
     * this method will get the hasChoices status of the field
     * @return {?} : _hasChoices
     */
    get hasChoices() {
        return this._hasChoices;
    }
    /**
     * this method will get the default value of the field
     * @return {?} : _defaultValue
     */
    get defaultValue() {
        return this._defaultValue;
    }
    /**
     * this method will set the defaultValue of the field
     * @param {?} defaultValue : any - the new defaultValue
     * @return {?}
     */
    set defaultValue(defaultValue) {
        if (defaultValue == null || this.validateValue(defaultValue)) {
            this._defaultValue = defaultValue;
        }
        else {
            throw new AjfInvalidFieldDefinitionError('The default value is not valid for this field type');
        }
    }
    /**
     * @return {?}
     */
    get size() {
        return this._size;
    }
    /**
     * @param {?} size
     * @return {?}
     */
    set size(size) {
        this._size = size;
    }
    /**
     * this method will get the validation value of the field
     * @return {?} : _validation
     */
    get validation() {
        return this._validation;
    }
    /**
     * @param {?} validation
     * @return {?}
     */
    set validation(validation) {
        this._validation = validation;
    }
    /**
     * this method will get the warning value of the field
     * @return {?} : _warning
     */
    get warning() {
        return this._warning;
    }
    /**
     * @param {?} warning
     * @return {?}
     */
    set warning(warning) {
        this._warning = warning;
    }
    /**
     * this method will get the hasAttachments status of the field
     * @return {?} : _hasAttachments
     */
    get hasAttachments() { return this._hasAttachments; }
    /**
     * this method will get the attachmentsOrigin of the field
     * @return {?} : AjfAttachmentsOrigin
     */
    get attachmentsOrigin() {
        return this.hasAttachments && this._attachmentsOrigin || null;
    }
    /**
     * this method will get the attachments of the field
     * @return {?} : any the attachments
     */
    get attachments() {
        return this.hasAttachments &&
            this._attachmentsOrigin.getAttachments() || [];
    }
    /**
     * @return {?}
     */
    get nextSlideCondition() {
        return this._nextSlideCondition;
    }
    /**
     * @param {?} condition
     * @return {?}
     */
    set nextSlideCondition(condition) {
        this._nextSlideCondition = condition;
    }
    /**
     * @return {?}
     */
    get nextSlide() {
        return this._nextSlide;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set nextSlide(val) {
        this._nextSlide = val;
    }
    /**
     * this method will get the field type
     * @return {?} : AjfFieldType
     */
    get fieldType() {
        /** @type {?} */
        const thisObj = this;
        if (thisObj instanceof AjfFormulaField) {
            return AjfFieldType.Formula;
        }
        if (thisObj instanceof AjfMultipleChoiceField) {
            return AjfFieldType.MultipleChoice;
        }
        if (thisObj instanceof AjfSingleChoiceField) {
            return AjfFieldType.SingleChoice;
        }
        if (thisObj instanceof AjfBooleanField) {
            return AjfFieldType.Boolean;
        }
        if (thisObj instanceof AjfNumberField) {
            return AjfFieldType.Number;
        }
        if (thisObj instanceof AjfTextField) {
            return AjfFieldType.Text;
        }
        if (thisObj instanceof AjfStringField) {
            return AjfFieldType.String;
        }
        if (thisObj instanceof AjfDateField) {
            return AjfFieldType.Date;
        }
        if (thisObj instanceof AjfDateInputField) {
            return AjfFieldType.DateInput;
        }
        if (thisObj instanceof AjfTableField) {
            return AjfFieldType.Table;
        }
        if (thisObj instanceof AjfTimeField) {
            return AjfFieldType.Time;
        }
        return AjfFieldType.Empty;
    }
    /**
     * this method will get the node type of the field
     * @return {?} : AjfFieldType
     */
    get nodeType() { return AjfNodeType.AjfField; }
    /**
     * this method will create new field
     * @param {?} fieldType
     * @param {?=} obj
     * @return {?} : ajfField
     */
    static create(fieldType, obj) {
        /** @type {?} */
        let ret;
        switch (fieldType) {
            case AjfFieldType.String:
                ret = new AjfStringField(obj);
                break;
            case AjfFieldType.Text:
                ret = new AjfTextField(obj);
                break;
            case AjfFieldType.Number:
                ret = new AjfNumberField(obj);
                break;
            case AjfFieldType.Boolean:
                ret = new AjfBooleanField(obj);
                break;
            case AjfFieldType.SingleChoice:
                ret = new AjfSingleChoiceField(obj);
                break;
            case AjfFieldType.MultipleChoice:
                ret = new AjfMultipleChoiceField(obj);
                break;
            case AjfFieldType.Formula:
                ret = new AjfFormulaField(obj);
                break;
            case AjfFieldType.Empty:
                ret = new AjfEmptyField(obj);
                break;
            case AjfFieldType.Date:
                ret = new AjfDateField(obj);
                break;
            case AjfFieldType.DateInput:
                ret = new AjfDateInputField(obj);
                break;
            case AjfFieldType.Time:
                ret = new AjfTimeField(obj);
                break;
            case AjfFieldType.Table:
                ret = new AjfTableField(obj);
                break;
            default:
                throw new Error('Invalid field type');
        }
        return ret;
    }
    /**
     * this method will load an AjfField from json
     * @param {?} obj                : any - object node
     * @param {?} choicesOrigins     : any[] - array of choicesOrigins
     * @param {?} attachmentsOrigins : any[] - array of attachmentsOrigins
     * @param {?} context
     * @return {?} AjfNode
     */
    static fromJson(obj, choicesOrigins, attachmentsOrigins, context) {
        // array of string: contains a keys object
        // example:
        // ["id", "name", "label", "visibility", "hasChoices", "parent",
        // "parentNode", "conditionalBranches", "fieldType", "nodes"]
        obj = deepCopy(obj);
        if (context) {
            context = deepCopy(context);
        }
        /** @type {?} */
        let keys = Object.keys(obj);
        if (keys.indexOf('fieldType') === -1) {
            throw new Error('Field type missing type');
        }
        /** @type {?} */
        let fieldType = obj.fieldType;
        delete obj.fieldType;
        if (AjfFieldType[fieldType] == null) {
            throw new Error('Invalid field type');
        }
        if (keys.indexOf('visibility') > -1 && obj.visibility != null) {
            obj.visibility = AjfCondition.fromJson(obj.visibility);
        }
        if (keys.indexOf('formula') > -1 && obj.formula != null) {
            obj.formula = AjfFormula.fromJson(obj.formula);
        }
        if (keys.indexOf('choicesFilter') > -1 && obj.choicesFilter != null) {
            obj.choicesFilter = AjfFormula.fromJson(obj.choicesFilter);
        }
        if (keys.indexOf('validation') > -1 && obj.validation != null) {
            obj.validation = AjfValidationGroup.fromJson(obj.validation);
        }
        if (keys.indexOf('warning') > -1 && obj.warning != null) {
            obj.warning = AjfWarningGroup.fromJson(obj.warning);
        }
        if (keys.indexOf('choicesOriginRef') > -1) {
            /** @type {?} */
            let origins = choicesOrigins.filter((/**
             * @param {?} x
             * @return {?}
             */
            x => x.getName() === obj.choicesOriginRef));
            obj.choicesOrigin = origins.length > 0 ? origins[0] : null;
        }
        if (keys.indexOf('attachmentsOriginRef') > -1) {
            /** @type {?} */
            let origins = attachmentsOrigins.filter((/**
             * @param {?} x
             * @return {?}
             */
            x => x.getName() === obj.attachmentsOriginRef));
            obj.attachmentsOrigin = origins.length > 0 ? origins[0] : null;
        }
        if (keys.indexOf('triggerConditions') > -1 &&
            obj.triggerConditions != null &&
            obj.triggerConditions.length > 0) {
            obj.triggerConditions = obj.triggerConditions
                .map((/**
             * @param {?} t
             * @return {?}
             */
            (t) => {
                return AjfCondition.fromJson(t);
            }));
        }
        if (keys.indexOf('nodes') > -1 && obj.nodes instanceof Array) {
            /** @type {?} */
            let nodes = [];
            for (let i = 0; i < obj.nodes.length; i++) {
                /** @type {?} */
                let childNode = obj.nodes[i];
                childNode.parentField = obj.id;
                nodes.push(AjfNode.fromJson(childNode, choicesOrigins, attachmentsOrigins, context));
            }
            obj.nodes = nodes;
        }
        if (keys.indexOf('nextSlideCondition') > -1 && obj.nextSlideCondition != null) {
            obj.nextSlideCondition = AjfCondition.fromJson(obj.nextSlideCondition);
        }
        if (keys.indexOf('conditionalBranches') > -1 && obj.conditionalBranches instanceof Array) {
            /** @type {?} */
            let cbs = [];
            for (let i = 0; i < obj.conditionalBranches.length; i++) {
                cbs.push(AjfCondition.fromJson(obj.conditionalBranches[i]));
            }
            obj.conditionalBranches = cbs;
        }
        return AjfField.create(fieldType, obj);
    }
    /**
     * this method will set the editable value of the field
     * @protected
     * @param {?=} editable : boolean
     * @return {?}
     */
    setEditable(editable = true) {
        this._editable = editable;
    }
    /**
     * this method will set the HasChoices value of the field
     * @protected
     * @param {?} hasChoices : boolean
     * @return {?}
     */
    setHasChoices(hasChoices) {
        this._hasChoices = hasChoices;
    }
    /**
     * this method will set the hasAttachments value of the field
     * @protected
     * @param {?} hasAttachments : boolean
     * @return {?}
     */
    setHasAttachments(hasAttachments) {
        this._hasAttachments = hasAttachments;
    }
}
/**
 * This class will define an ajf empty field
 */
class AjfEmptyField extends AjfField {
    /**
     * @param {?} _
     * @return {?}
     */
    validateValue(_) {
        return true;
    }
    /**
     * @param {?=} obj
     */
    constructor(obj) {
        super(obj);
        this.jsonExportedMembers = this.jsonExportedMembers.concat([
            'HTML'
        ]);
        this.HTML = obj && obj.HTML || null;
    }
}
/**
 * This class will define an ajf string field
 */
class AjfStringField extends AjfField {
    /**
     * @param {?} value
     * @return {?}
     */
    validateValue(value) {
        return value === value.toString();
    }
}
/**
 * This class will define an ajf text field
 */
class AjfTextField extends AjfStringField {
}
/**
 * This class will define an ajf number field
 */
class AjfNumberField extends AjfField {
    /**
     * @param {?} value
     * @return {?}
     */
    validateValue(value) {
        return value === parseInt(value, 10) || value === parseFloat(value);
    }
}
/**
 * This class will define an ajf boolean field
 */
class AjfBooleanField extends AjfField {
    /**
     * @param {?} value
     * @return {?}
     */
    validateValue(value) {
        return value === !!value;
    }
    /**
     * @return {?}
     */
    getMaxConditionalBranches() {
        return 2;
    }
}
/**
 * This class will define an ajf field with choices
 */
class AjfFieldWithChoices extends AjfField {
    /**
     * @return {?}
     */
    get choices() {
        return this.choicesOrigin && this.choicesOrigin.getChoices() || [];
    }
    /**
     * @return {?}
     */
    get choicesOriginRef() {
        return this.choicesOrigin.getName();
    }
    /**
     * @param {?} _
     * @return {?}
     */
    validateValue(_) {
        return true;
    }
    /**
     * @param {?=} obj
     */
    constructor(obj) {
        super(obj);
        this.jsonExportedMembers = this.jsonExportedMembers
            .concat([
            'choicesOriginRef', 'choicesFilter',
            'forceExpanded', 'forceNarrow', 'triggerConditions'
        ]);
        this.choicesOrigin = obj && obj.choicesOrigin || null;
        this.choicesFilter = obj && obj.choicesFilter || null;
        this.forceExpanded = obj && obj.forceExpanded || false;
        this.forceNarrow = obj && obj.forceNarrow || false;
        this.triggerConditions = obj && obj.triggerConditions || null;
        this.setHasChoices(true);
    }
}
/**
 * This class will define an ajf field with SingleChoice
 */
class AjfSingleChoiceField extends AjfFieldWithChoices {
    /**
     * @param {?=} obj
     */
    constructor(obj) {
        super(obj);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    validateValue(value) {
        return value == null || this.choices.filter((/**
         * @param {?} x
         * @return {?}
         */
        x => x === value)).length > 0;
    }
    /**
     * @return {?}
     */
    getMaxConditionalBranches() {
        return Math.max(1, this.choices.length + 1);
    }
}
/**
 * This class will define an ajf field with MultipleChoice
 */
class AjfMultipleChoiceField extends AjfSingleChoiceField {
    /**
     * @param {?=} obj
     */
    constructor(obj) {
        /** @type {?} */
        let defaultValue = obj && obj.defaultValue || [];
        obj = Object.assign({}, obj || {}, { defaultValue });
        super(obj);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    validateValue(value) {
        if (value instanceof Array) {
            /** @type {?} */
            let i = 0;
            /** @type {?} */
            let l = value.length;
            /** @type {?} */
            let good = true;
            while (good && i < l) {
                good = super.validateValue(value[i++]);
            }
            return good;
        }
        else {
            return super.validateValue(value);
        }
    }
    /**
     * @return {?}
     */
    getMaxConditionalBranches() {
        /** @type {?} */
        let total = 0;
        /** @type {?} */
        let l = this.choices.length;
        /** @type {?} */
        let f = [1];
        for (let i = 1; i <= l; i++) {
            f.push(factorial(i));
        }
        for (let i = 1; i <= l; i++) {
            total += f[l] / (f[i] * f[l - i]);
        }
        return total;
    }
}
/**
 * This class will define an formula field
 */
class AjfFormulaField extends AjfNumberField {
    /**
     * @param {?=} obj
     */
    constructor(obj) {
        super(obj);
        this.setEditable(false);
    }
}
/**
 * This class will define an ajf date field
 */
class AjfDateField extends AjfField {
    /**
     * @param {?=} obj
     */
    constructor(obj) {
        super(obj);
        this.jsonExportedMembers = this.jsonExportedMembers
            .concat(['maxDate', 'minDate']);
        this.minDate = obj && obj.minDate || null;
        this.maxDate = obj && obj.maxDate || null;
        this.minDateValue = this.minDate === 'today' ? new Date() : (/** @type {?} */ (this.minDate));
        this.maxDateValue = this.maxDate === 'today' ? new Date() : (/** @type {?} */ (this.maxDate));
    }
    /**
     * @param {?} value
     * @return {?}
     */
    validateValue(value) {
        return value === value.toString();
    }
}
class AjfDateInputField extends AjfField {
    /**
     * @param {?=} obj
     */
    constructor(obj) {
        super(obj);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    validateValue(value) {
        return value === value.toString();
    }
}
class AjfTimeField extends AjfField {
    /**
     * @param {?=} obj
     */
    constructor(obj) {
        super(obj);
        this.jsonExportedMembers = this.jsonExportedMembers
            .concat([]);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    validateValue(value) {
        return value === value.toString();
    }
}
class AjfTableField extends AjfField {
    /**
     * @param {?=} obj
     */
    constructor(obj) {
        super(obj);
        this.columnLabels = [];
        this.rowLabels = [];
        this.hideEmptyRows = false;
        this.setEditable(obj && obj.editable || false);
        this.jsonExportedMembers = this.jsonExportedMembers.concat(['rows', 'columnLabels', 'rowLabels']);
        this.rows = obj && obj.rows || [];
        this.columnLabels = obj && obj.columnLabels || [];
        this.rowLabels = obj && obj.rowLabels || [];
        this.hideEmptyRows = obj && obj.hideEmptyRows || false;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    validateValue(value) { return value === value.toString(); }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} type
 * @return {?}
 */
function fieldIconName(type) {
    return `ajf-icon-field-${AjfFieldType[type].toLowerCase()}`;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class FieldIconPipe {
    /**
     * @param {?} field
     * @return {?}
     */
    transform(field) {
        return fieldIconName(field instanceof AjfField ? field.fieldType : field);
    }
}
FieldIconPipe.decorators = [
    { type: Pipe, args: [{ name: 'fieldIcon' },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfNodeInstance {
    /**
     * @param {?} params
     * @param {?=} _context
     */
    constructor(params, _context) {
        this._updatedEvt = new EventEmitter();
        this._updated = this._updatedEvt.asObservable();
        this._node = params.node;
        this._prefix = params.prefix != null ? params.prefix.slice(0) : [];
        this._visible = params.visible != null ? params.visible : true;
    }
    /**
     * @return {?}
     */
    get updated() { return this._updated; }
    /**
     * @return {?}
     */
    get node() { return this._node; }
    /**
     * @return {?}
     */
    get prefix() { return this._prefix.slice(0); }
    /**
     * @return {?}
     */
    get visible() { return this._visible; }
    /**
     * @return {?}
     */
    get suffix() {
        if (this.prefix == null || this.prefix.length == 0) {
            return '';
        }
        return `__${this.prefix.join('__')}`;
    }
    /**
     * this method will get the complete name of the field
     * @return {?} : string
     */
    get completeName() {
        return `${this.node.name}${this.suffix}`;
    }
    /**
     * @protected
     * @param {?} node
     * @return {?}
     */
    setNode(node) { this._node = node; }
    /**
     * @return {?}
     */
    triggerUpdate() {
        this._updatedEvt.emit();
    }
    /**
     * Update nodes visibility based on context value.
     * Returns true if the visibility has changes
     *
     * \@memberOf AjfNodeInstance
     * @param {?} context Context value
     * @param {?=} branchVisibility
     *
     * @return {?}
     */
    updateVisibility(context, branchVisibility = true) {
        if (this.visibility == null) {
            return false;
        }
        /** @type {?} */
        const visibility = this.visibility;
        /** @type {?} */
        const oldVisibility = this.visible;
        /** @type {?} */
        let newVisibility = branchVisibility && visibility.evaluate(context);
        if (newVisibility !== this.visible) {
            this._visible = newVisibility;
        }
        return oldVisibility !== newVisibility;
    }
    /**
     * @param {?} context
     * @return {?}
     */
    updateConditionalBranches(context) {
        /** @type {?} */
        const conditionalBranches = this.conditionalBranches;
        if (conditionalBranches != null) {
            /** @type {?} */
            const oldBranch = this.verifiedBranch;
            /** @type {?} */
            let idx = 0;
            /** @type {?} */
            let found = false;
            while (idx < conditionalBranches.length && !found) {
                /** @type {?} */
                let verified = conditionalBranches[idx].evaluate(context);
                if (verified) {
                    found = true;
                    if (idx !== this.verifiedBranch) {
                        this.verifiedBranch = idx;
                    }
                }
                idx++;
            }
            if (oldBranch !== this.verifiedBranch) {
                return true;
            }
        }
        return false;
    }
}
class AjfFieldInstance extends AjfNodeInstance {
    /**
     * @param {?} params
     * @param {?=} context
     */
    constructor(params, context) {
        super(params, context);
        // number of repetitions
        this.reps = 0;
        // an array of AjfValidationResult
        this._validationResults = [];
        // an array of AjfWarningResult
        this._warningResults = [];
        this._defaultValue = null;
        this._triggerWarning = new ReplaySubject(1);
        if (this.node != null && context != null) {
            if (context[this.node.name] != null) {
                this.value = context[this.node.name];
            }
            else if (context[this.completeName] != null) {
                this.value = context[this.completeName];
            }
            else {
                this.value = null;
            }
        }
        /** @type {?} */
        const defVal = ((/** @type {?} */ (this.node))).defaultValue;
        this._defaultValue = this.node && defVal != null ? defVal : null;
    }
    /**
     * @return {?}
     */
    get field() { return (/** @type {?} */ (this.node)); }
    /**
     * @param {?} field
     * @return {?}
     */
    set field(field) { this.setNode(field); }
    // the value of field
    /**
     * @return {?}
     */
    get value() { return this._value != null && this._value || this._defaultValue; }
    /**
     * @param {?} value
     * @return {?}
     */
    set value(value) { this._value = value; }
    /**
     * @return {?}
     */
    get triggerWarning() { return this._triggerWarning.asObservable(); }
    /**
     * this method will get the validationResults value of the field
     * @return {?} : _validationResults
     */
    get validationResults() {
        return this._validationResults;
    }
    /**
     * this method will get the warningResults value of the field
     * @return {?} : _warningResults
     */
    get warningResults() {
        return this._warningResults;
    }
    /**
     * @param {?} context
     * @return {?}
     */
    updateFormula(context) {
        /** @type {?} */
        const formula = this.formula;
        /** @type {?} */
        const editable = this.field.editable;
        if (formula != null && this.visible && (!editable || (editable && this.value == null))) {
            /** @type {?} */
            let newValue = formula.evaluate(context);
            /** @type {?} */
            const oldValue = this.value;
            if (newValue !== this.value) {
                this.value = newValue;
                context[this.completeName] = this.value;
                context.$value = this.value;
            }
            return {
                changed: newValue !== oldValue,
                value: newValue
            };
        }
        return { changed: false, value: this.value };
    }
    /**
     * @private
     * @param {?} context
     * @param {?} supplementaryInformations
     * @return {?}
     */
    _makeSupplementaryContext(context, supplementaryInformations) {
        Object.keys(supplementaryInformations).forEach((/**
         * @param {?} key
         * @return {?}
         */
        (key) => {
            context[`__supplementary__${key}__`] = supplementaryInformations[key];
        }));
        return context;
    }
    /**
     * @param {?} context
     * @param {?=} supplementaryInformations
     * @return {?}
     */
    updateValidation(context, supplementaryInformations) {
        /** @type {?} */
        const validation = this.validation;
        if (validation == null) {
            return;
        }
        if (supplementaryInformations) {
            this._makeSupplementaryContext(context, supplementaryInformations);
        }
        if (context[this.completeName] != null && validation && validation.forceValue) {
            this.value = validation.evaluateForceValue(context);
            context[this.completeName] = this.value;
            context.$value = this.value;
        }
        if (validation != null) {
            this._validationResults = validation.evaluate(context[this.completeName], context);
            this.valid = this.validationResults
                .reduce((/**
             * @param {?} prev
             * @param {?} x
             * @return {?}
             */
            (prev, x) => prev && x.result), true);
        }
        else {
            this.valid = true;
        }
    }
    /**
     * @param {?} context
     * @return {?}
     */
    updateWarning(context) {
        /** @type {?} */
        const warning = this.warning;
        if (context[this.completeName] != null && warning) {
            this._warningResults = warning.evaluate(context);
        }
    }
    /**
     * @param {?} context
     * @return {?}
     */
    updateNextSlideCondition(context) {
        if (this.nextSlideCondition != null) {
            return this.nextSlideCondition.evaluate(context);
        }
        return false;
    }
    /**
     * this method will update the state of the field
     * @param {?} context         : any - the context of the field to update
     * @param {?=} branchVisibility
     * @return {?}
     */
    updateFieldState(context, branchVisibility = true) {
        this.updateVisibility(context, branchVisibility);
        this.updateConditionalBranches(context);
        this.updateFormula(context);
        this.updateValidation(context);
        this.updateWarning(context);
        this.updateNextSlideCondition(context);
    }
    /**
     * @return {?}
     */
    emitTriggerWarning() {
        this._triggerWarning.next();
    }
}
class AjfFieldWithChoicesInstance extends AjfFieldInstance {
    /**
     * @param {?} params
     * @param {?=} context
     */
    constructor(params, context) {
        super(params, context);
        this._triggerSelection = new ReplaySubject(1);
        this._firstTriggerConditionDone = {};
        this.filteredChoices = this.field.choices.slice(0);
    }
    /**
     * @return {?}
     */
    get field() { return (/** @type {?} */ (this.node)); }
    /**
     * @param {?} field
     * @return {?}
     */
    set field(field) { this.setNode(field); }
    /**
     * @return {?}
     */
    get triggerSelection() { return this._triggerSelection.asObservable(); }
    /**
     * @param {?} context
     * @return {?}
     */
    updateFilteredChoices(context) {
        if (this.choicesFilter != null) {
            this.filteredChoices = this.field.choicesOrigin
                .getChoices()
                .filter((/**
             * @param {?} c
             * @return {?}
             */
            c => {
                context.$choiceValue = c.value;
                return this.choicesFilter.evaluate(context);
            }));
        }
        else {
            this.filteredChoices = this.field.choicesOrigin
                .getChoices();
        }
    }
    /**
     * @param {?} context
     * @return {?}
     */
    updateTriggerConditions(context) {
        if (this._firstTriggerConditionDone[this.completeName]) {
            return false;
        }
        /** @type {?} */
        let found = false;
        /** @type {?} */
        const conditionsNum = this.triggerConditions.length;
        for (let i = 0; i < conditionsNum; i++) {
            if (this.triggerConditions[i].evaluate(context)) {
                found = true;
                break;
            }
        }
        this._firstTriggerConditionDone[this.completeName] = found;
        return found;
    }
    /**
     * @return {?}
     */
    emitTriggerSelection() {
        this._triggerSelection.next(null);
    }
}
class AjfNodeGroupInstance extends AjfNodeInstance {
    /**
     * @return {?}
     */
    get reps() { return this._reps; }
    /**
     * @param {?} reps
     * @return {?}
     */
    set reps(reps) {
        this._reps = reps;
        this._repsArr = new Array(reps);
    }
    /**
     * @return {?}
     */
    get repsArr() { return this._repsArr; }
    /**
     * @return {?}
     */
    get valid() {
        return this.nodes.map((/**
         * @param {?} n
         * @return {?}
         */
        n => {
            if (Object.keys(n).indexOf('valid') > -1) {
                return ((/** @type {?} */ (n))).valid;
            }
            return true;
        })).reduce((/**
         * @param {?} v1
         * @param {?} v2
         * @return {?}
         */
        (v1, v2) => v1 && v2));
    }
    /**
     * @return {?}
     */
    get nodeGroup() { return (/** @type {?} */ (this.node)); }
    /**
     * @protected
     * @param {?} nodeGroup
     * @return {?}
     */
    setNodeGroup(nodeGroup) { this.setNode(nodeGroup); }
    /**
     * @param {?} params
     * @param {?=} context
     */
    constructor(params, context) {
        super(params, context);
    }
    /**
     * @param {?} context
     * @return {?}
     */
    updateRepsNum(context) {
        /** @type {?} */
        const oldReps = this.reps || 0;
        if (this.nodeGroup.formulaReps == null) {
            /** @type {?} */
            const ctxReps = context[this.completeName];
            if (ctxReps != null) {
                this.reps = ctxReps;
            }
            else if (oldReps == 0) {
                this.reps = 1;
            }
        }
        else {
            /** @type {?} */
            let newReps = this.nodeGroup.formulaReps.evaluate(context);
            if (newReps !== oldReps) {
                this.reps = newReps;
            }
        }
        return oldReps;
    }
}
class AjfSlideInstance extends AjfNodeInstance {
    constructor() {
        super(...arguments);
        this.nodes = [];
        this.flatNodes = [];
    }
    /**
     * @return {?}
     */
    get valid() {
        return this.flatNodes.map((/**
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
    /**
     * @return {?}
     */
    get slide() { return (/** @type {?} */ (this.node)); }
    /**
     * @protected
     * @param {?} slide
     * @return {?}
     */
    setSlide(slide) { this.setNode(slide); }
}
class AjfRepeatingSlideInstance extends AjfSlideInstance {
    /**
     * @return {?}
     */
    get reps() { return this._reps; }
    /**
     * @param {?} reps
     * @return {?}
     */
    set reps(reps) {
        this._reps = reps;
        this.canRemoveGroup = this.slide.minReps === 0 || reps > this.slide.minReps;
        this.canAddGroup = this.slide.maxReps === 0 || reps < this.slide.maxReps;
        this._repsArr = new Array(reps);
    }
    /**
     * @return {?}
     */
    get repsArr() { return this._repsArr; }
    /**
     * @return {?}
     */
    get slide() { return (/** @type {?} */ (this.node)); }
    /**
     * @return {?}
     */
    get nodesPerSlide() {
        return this.nodes != null ? this.nodes.length / this.reps : 0;
    }
    /**
     * @protected
     * @param {?} slide
     * @return {?}
     */
    setSlide(slide) { this.setNode(slide); }
    /**
     * @param {?} params
     * @param {?=} context
     */
    constructor(params, context) {
        super(params, context);
    }
    /**
     * @param {?} idx
     * @return {?}
     */
    validSlide(idx) {
        if (idx >= this.slideNodes.length) {
            return true;
        }
        return this.slideNodes[idx]
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
    /**
     * @param {?} idx
     * @return {?}
     */
    slidePosition(idx) {
        return this.position + idx;
    }
    /**
     * @param {?} context
     * @return {?}
     */
    updateRepsNum(context) {
        /** @type {?} */
        const oldReps = this.reps || 0;
        if (this.slide.formulaReps == null) {
            /** @type {?} */
            const ctxReps = context[this.completeName];
            if (ctxReps != null) {
                this.reps = ctxReps;
            }
            else if (oldReps == 0) {
                this.reps = 1;
            }
        }
        else {
            /** @type {?} */
            let newReps = this.slide.formulaReps.evaluate(context);
            if (newReps !== oldReps) {
                this.reps = newReps;
            }
        }
        return oldReps;
    }
}
class AjfTableFieldInstance extends AjfFieldInstance {
    /**
     * @param {?} params
     * @param {?=} context
     */
    constructor(params, context) {
        super(params, context);
        this._context = {};
        this.setValue(context);
        this._hideEmptyRows = ((/** @type {?} */ (this.node))).hideEmptyRows;
    }
    /**
     * @return {?}
     */
    get hideEmptyRows() {
        return this._hideEmptyRows;
    }
    /**
     * @return {?}
     */
    get controls() {
        return this._matrixFormControl;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set controls(v) {
        this._matrixFormControl = v;
        this._matrixFormControlWithLabels = this._controlsWithLabels();
    }
    /**
     * @return {?}
     */
    get controlsWithLabels() {
        return this._matrixFormControlWithLabels;
    }
    /**
     * @private
     * @return {?}
     */
    _controlsWithLabels() {
        /** @type {?} */
        let node = (/** @type {?} */ (this.node));
        /** @type {?} */
        let ret = [];
        /** @type {?} */
        let i = 0;
        for (let rowLabel of (/** @type {?} */ ((node.rowLabels)))) {
            ret.push([rowLabel].concat((/** @type {?} */ (this._matrixFormControl[i]))));
            i = i + 1;
        }
        ret.unshift([node.label].concat(node.columnLabels));
        return ret;
    }
    /**
     * @return {?}
     */
    get value() {
        /** @type {?} */
        let node = (/** @type {?} */ (this.node));
        if (node.editable) {
            return this._matrixFormControl;
        }
        return this._matrixValue;
    }
    /**
     * @param {?} _v
     * @return {?}
     */
    set value(_v) { }
    /**
     * @return {?}
     */
    get context() {
        return this._context;
    }
    /**
     * @param {?} context
     * @return {?}
     */
    setValue(context) {
        /** @type {?} */
        let node = (/** @type {?} */ (this.node));
        if (!node.editable) {
            /** @type {?} */
            let value = [];
            /** @type {?} */
            let rowIndex = 0;
            node.rows.forEach((/**
             * @param {?} row
             * @return {?}
             */
            (row) => {
                row.forEach((/**
                 * @param {?} k
                 * @return {?}
                 */
                (k) => {
                    this._context[k] = context[k];
                }));
                value[rowIndex] = [node.rowLabels[rowIndex]]
                    .concat(row.map((/**
                 * @param {?} k
                 * @return {?}
                 */
                k => context[k])));
                rowIndex += 1;
            }));
            value.unshift([node.label].concat(node.columnLabels));
            this._matrixValue = value;
        }
        else {
            this._context = context;
        }
    }
    /**
     * @return {?}
     */
    get visibleColumns() {
        if (this.hideEmptyRows) {
            return this.value
                .filter((/**
             * @param {?} column
             * @return {?}
             */
            (column) => column
                .slice(1)
                .reduce((/**
             * @param {?} a
             * @param {?} b
             * @return {?}
             */
            (a, b) => {
                return a || (b != null && b !== '' && b !== 0 && b !== '0');
            }), false)));
        }
        return this.value;
    }
}
class AjfDateFieldInstance extends AjfFieldInstance {
    /**
     * @return {?}
     */
    get field() { return this.field; }
    /**
     * @param {?} field
     * @return {?}
     */
    set field(field) { this.setNode(field); }
}
class AjfEmptyFieldInstance extends AjfFieldInstance {
    /**
     * @return {?}
     */
    get field() { return this.field; }
    /**
     * @param {?} field
     * @return {?}
     */
    set field(field) { this.setNode(field); }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfFormFieldValueChanged {
}
/**
 * @abstract
 */
class AjfFormField {
    /**
     * this constructor will init _rendererService _changeDetectionRef _alertCtrl
     * and init the messagesWarning subscription
     * @param {?} _rendererService
     * @param {?} _changeDetectionRef
     */
    constructor(_rendererService, _changeDetectionRef) {
        this._rendererService = _rendererService;
        this._changeDetectionRef = _changeDetectionRef;
        // AjfFieldType obj implement the type of field
        // ( String, Text, Number, Boolean, SingleChoice, MultipleChoice,
        // Formula, Empty, Composed )
        this.ajfFieldTypes = AjfFieldType;
        // this private AjfFieldValueChanged event emitter emit an event when the
        // field value is changed
        this._valueChanged = new EventEmitter();
        this._triggerSelectionSubscription = Subscription.EMPTY;
        this._triggerWarningSubscription = Subscription.EMPTY;
        this._fieldUpdateSubscription = Subscription.EMPTY;
    }
    /**
     * @return {?}
     */
    get fieldInstance() { return this._fieldInstance; }
    /**
     * @param {?} fieldInstance
     * @return {?}
     */
    set fieldInstance(fieldInstance) {
        this._fieldInstance = fieldInstance;
        this._fieldUpdateSubscription.unsubscribe();
        this._fieldUpdateSubscription = fieldInstance.updated.subscribe((/**
         * @return {?}
         */
        () => {
            if (this._changeDetectionRef) {
                try {
                    this._changeDetectionRef.detectChanges();
                }
                catch (e) { }
            }
        }));
    }
    /**
     * @return {?}
     */
    get fwcInst() {
        return (/** @type {?} */ (this._fieldInstance));
    }
    /**
     * @return {?}
     */
    get fwc() { return (/** @type {?} */ (this._fieldInstance.field)); }
    /**
     * @return {?}
     */
    get datefInst() { return (/** @type {?} */ (this._fieldInstance)); }
    /**
     * @return {?}
     */
    get tablefInst() { return (/** @type {?} */ (this._fieldInstance)); }
    /**
     * @return {?}
     */
    get emptyfInst() { return (/** @type {?} */ (this._fieldInstance)); }
    // this @output expose the value changed like an observable
    /**
     * @return {?}
     */
    get valueChanged() {
        return this._valueChanged.asObservable();
    }
    /**
     * this method will init the control, the filtere choices and the change
     * detection reference
     * @return {?}
     */
    ngOnInit() {
        this.control = this._rendererService.getControl(this.fieldInstance);
        this._triggerWarningSubscription = this.fieldInstance.triggerWarning
            .pipe(withLatestFrom(this.control), filter((/**
         * @param {?} v
         * @return {?}
         */
        v => v[1] != null)))
            .subscribe((/**
         * @param {?} v
         * @return {?}
         */
        (v) => {
            /** @type {?} */
            const control = v[1];
            /** @type {?} */
            const s = this.showWarningAlertPrompt(this.fieldInstance.warningResults.filter((/**
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
    ngAfterViewInit() {
        if (this.fieldInstance instanceof AjfFieldWithChoicesInstance) {
            this._triggerSelectionSubscription = this.fieldInstance.triggerSelection
                .subscribe((/**
             * @return {?}
             */
            () => {
                this._triggerSelection();
            }));
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._triggerSelectionSubscription.unsubscribe();
        this._triggerWarningSubscription.unsubscribe();
        this._fieldUpdateSubscription.unsubscribe();
    }
    /**
     * @private
     * @return {?}
     */
    _triggerSelection() {
        if (this.singleChoiceSelect != null && !this.singleChoiceSelect._isOpen) {
            this.singleChoiceSelect.open();
        }
        else if (this.multipleChoiceSelect != null &&
            !this.multipleChoiceSelect._isOpen) {
            this.multipleChoiceSelect.open();
        }
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const esprimaMod = esprima__default || esprima;
const { tokenize } = esprimaMod;
/**
 * @param {?} nodes
 * @param {?} parent
 * @return {?}
 */
function orderedNodes(nodes, parent) {
    /** @type {?} */
    let newNodes = [];
    nodes.filter((/**
     * @param {?} n
     * @return {?}
     */
    (n) => n.parent == parent))
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
 * @param {?} node
 * @return {?}
 */
function isRepeatingNode(node) {
    return node != null && (node instanceof AjfRepeatingSlide ||
        node instanceof AjfNodeGroup);
}
/**
 * @param {?} node
 * @return {?}
 */
function isContainerNode(node) {
    return node != null && (node instanceof AjfSlide ||
        node instanceof AjfRepeatingSlide ||
        node instanceof AjfNodeGroup);
}
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
        if (node instanceof AjfNodeGroup ||
            node instanceof AjfSlide ||
            node instanceof AjfRepeatingSlide) {
            flatNodes = flatNodes.concat(flattenNodes(node.nodes));
        }
    }));
    return flatNodes;
}
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
        if (nodeInstance instanceof AjfFieldInstance) {
            flatNodes.push(nodeInstance);
        }
        // @TODO missing composed fields
        if (nodeInstance instanceof AjfNodeGroupInstance ||
            nodeInstance instanceof AjfSlideInstance ||
            nodeInstance instanceof AjfRepeatingSlideInstance) {
            if (includeGroups) {
                flatNodes.push(nodeInstance);
            }
            flatNodes = flatNodes.concat(flattenNodesInstances(nodeInstance.nodes, includeGroups));
        }
    }));
    return flatNodes;
}
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
        node = ((/** @type {?} */ (allNodes))).find((/**
         * @param {?} n
         * @return {?}
         */
        (n) => {
            return n instanceof AjfNode ? n.id == curParent : n.node.id == curParent;
        }));
        if (node instanceof AjfNodeInstance) {
            node = node.node;
        }
        if (isRepeatingNode(node)) {
            nodeGroups.push(node);
        }
        curParent = node != null ? node.parent : null;
    }
    return nodeGroups;
}
/**
 * @param {?} allNodes
 * @param {?} node
 * @return {?}
 */
function getAncestorRepeatingNodesNames(allNodes, node) {
    /** @type {?} */
    let names = {};
    getAncestorRepeatingNodes(allNodes, node)
        .forEach((/**
     * @param {?} n
     * @param {?} idx
     * @return {?}
     */
    (n, idx) => {
        (((/** @type {?} */ (n))).nodes || [])
            .forEach((/**
         * @param {?} sn
         * @return {?}
         */
        (sn) => {
            if (sn instanceof AjfField) {
                names[sn.name] = idx;
            }
        }));
    }));
    return names;
}
/**
 * @param {?} nodes
 * @return {?}
 */
function flattenNodesTree(nodes) {
    /** @type {?} */
    let flatTree = [];
    nodes
        .forEach((/**
     * @param {?} nodeInstance
     * @return {?}
     */
    (nodeInstance) => {
        if (nodeInstance instanceof AjfSlideInstance ||
            nodeInstance instanceof AjfRepeatingSlideInstance) {
            flatTree.push(nodeInstance);
            nodeInstance.flatNodes = flattenNodesInstances(nodeInstance.nodes);
        }
    }));
    return flatTree;
}
/**
 * @param {?} formula
 * @param {?} ancestorsNames
 * @param {?} prefix
 * @return {?}
 */
function normalizeFormula(formula, ancestorsNames, prefix) {
    /** @type {?} */
    const ancestorsNameStrings = Object.keys(ancestorsNames);
    /** @type {?} */
    const tokens = tokenize(formula)
        .filter((/**
     * @param {?} token
     * @return {?}
     */
    (token) => token.type == 'Identifier' && token.value != '$value'))
        .map((/**
     * @param {?} token
     * @return {?}
     */
    (token) => token.value));
    tokens.forEach((/**
     * @param {?} t
     * @return {?}
     */
    (t) => {
        if (ancestorsNameStrings.indexOf(t) > -1) {
            formula = formula.replace(new RegExp(`\\b${t}\\b`, 'g'), `${t}__${prefix.slice(ancestorsNames[t]).join('__')}`);
        }
    }));
    return formula;
}
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
    let newCondition = normalizeFormula(oldCondition, ancestorsNames, prefix);
    if (newCondition === oldCondition) {
        return condition;
    }
    return new AjfCondition({ condition: newCondition });
}
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
    let newFormula = normalizeFormula(oldFormula, ancestorsNames, prefix);
    if (newFormula === oldFormula) {
        return formula;
    }
    return new AjfFormula({ formula: newFormula });
}
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
 * @param {?} validation
 * @param {?} ancestorsNames
 * @param {?} prefix
 * @return {?}
 */
function getInstanceValidation(validation, ancestorsNames, prefix) {
    /** @type {?} */
    const oldValidation = validation.condition;
    /** @type {?} */
    let newValidation = normalizeFormula(oldValidation, ancestorsNames, prefix);
    if (newValidation === oldValidation) {
        return validation;
    }
    return new AjfValidation({ condition: newValidation });
}
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
 * @param {?} warning
 * @param {?} ancestorsNames
 * @param {?} prefix
 * @return {?}
 */
function getInstanceWarning(warning, ancestorsNames, prefix) {
    /** @type {?} */
    const oldWarning = warning.condition;
    /** @type {?} */
    let newWarning = normalizeFormula(oldWarning, ancestorsNames, prefix);
    if (newWarning === oldWarning) {
        return warning;
    }
    return new AjfWarning({ condition: newWarning });
}
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
 * @param {?} allNodes
 * @param {?} node
 * @param {?} prefix
 * @param {?} context
 * @return {?}
 */
function nodeToNodeInstance(allNodes, node, prefix, context) {
    /** @type {?} */
    let instance = null;
    if (node instanceof AjfFieldWithChoices) {
        instance = new AjfFieldWithChoicesInstance({ node: node, prefix: prefix }, context);
    }
    else if (node instanceof AjfTableField) {
        instance = new AjfTableFieldInstance({ node: node, prefix: prefix }, context);
    }
    else if (node instanceof AjfField) {
        instance = new AjfFieldInstance({ node: node, prefix: prefix }, context);
    }
    else if (node instanceof AjfNodeGroup) {
        instance = new AjfNodeGroupInstance({ node: node, prefix: prefix }, context);
    }
    else if (node instanceof AjfRepeatingSlide) {
        instance = new AjfRepeatingSlideInstance({ node: node, prefix: prefix }, context);
    }
    else if (node instanceof AjfSlide) {
        instance = new AjfSlideInstance({ node: node, prefix: prefix }, context);
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
                const newVisibility = normalizeFormula(oldVisibility, ancestorsNames, prefix);
                instance.visibility = newVisibility !== oldVisibility ? new AjfCondition({
                    condition: newVisibility
                }) : node.visibility;
            }
            instance.conditionalBranches = getInstanceConditions(instance.node.conditionalBranches, ancestorsNames, prefix);
            if (instance instanceof AjfNodeGroupInstance || instance instanceof AjfRepeatingSlideInstance) {
                /** @type {?} */
                const formulaReps = instance instanceof AjfNodeGroupInstance ?
                    instance.nodeGroup.formulaReps :
                    instance.slide.formulaReps;
                if (formulaReps != null) {
                    /** @type {?} */
                    const oldFormula = formulaReps.formula;
                    /** @type {?} */
                    let newFormula = normalizeFormula(oldFormula, ancestorsNames, prefix);
                    instance.formulaReps = newFormula !== oldFormula ?
                        new AjfFormula({ formula: newFormula }) : formulaReps;
                }
            }
            else if (instance instanceof AjfFieldInstance) {
                if (instance.field.formula != null) {
                    instance.formula = getInstanceFormula(instance.field.formula, ancestorsNames, prefix);
                }
                if (instance.field.validation != null) {
                    /** @type {?} */
                    const newConditions = getInstanceValidations(instance.field.validation.conditions, ancestorsNames, prefix);
                    if (newConditions !== instance.field.validation.conditions) {
                        instance.validation = new AjfValidationGroup(instance.field.validation);
                        instance.validation.conditions = newConditions;
                    }
                    else {
                        instance.validation = instance.field.validation;
                    }
                }
                if (instance.field.warning != null) {
                    /** @type {?} */
                    const newWarnings = getInstanceWarnings(instance.field.warning.conditions, ancestorsNames, prefix);
                    if (newWarnings !== instance.field.warning.conditions) {
                        instance.warning = new AjfWarningGroup(instance.field.warning);
                        instance.warning.conditions = newWarnings;
                    }
                    else {
                        instance.warning = instance.field.warning;
                    }
                }
                if (instance.field.nextSlideCondition != null) {
                    instance.nextSlideCondition = getInstanceCondition(instance.field.nextSlideCondition, ancestorsNames, prefix);
                }
                if (instance instanceof AjfFieldWithChoicesInstance) {
                    if (instance.field.choicesFilter != null) {
                        instance.choicesFilter = getInstanceFormula(instance.field.choicesFilter, ancestorsNames, prefix);
                    }
                    if (instance.field.triggerConditions != null) {
                        instance.triggerConditions = getInstanceConditions(instance.field.triggerConditions, ancestorsNames, prefix);
                    }
                }
            }
        }
        else {
            instance.visibility = instance.node.visibility;
            instance.conditionalBranches = instance.node.conditionalBranches;
            if (instance instanceof AjfNodeGroupInstance || instance instanceof AjfRepeatingSlideInstance) {
                instance.formulaReps = (instance instanceof AjfNodeGroupInstance ?
                    instance.nodeGroup : instance.slide).formulaReps;
            }
            else if (instance instanceof AjfFieldInstance) {
                instance.formula = instance.field.formula;
                instance.validation = instance.field.validation;
                instance.warning = instance.field.warning;
                instance.nextSlideCondition = instance.field.nextSlideCondition;
                if (instance instanceof AjfFieldWithChoicesInstance) {
                    instance.choicesFilter = instance.field.choicesFilter;
                    instance.triggerConditions = instance.field.triggerConditions;
                }
            }
        }
    }
    return instance;
}
/**
 * @param {?} nodes
 * @param {?} node
 * @return {?}
 */
function findNodeInstanceInTree(nodes, node) {
    /** @type {?} */
    const index = nodes.indexOf(node);
    if (index > -1) {
        return { container: nodes, index: index };
    }
    /** @type {?} */
    const groups = nodes.filter((/**
     * @param {?} n
     * @return {?}
     */
    n => isContainerNodeInstance(n)));
    /** @type {?} */
    let i = 0;
    /** @type {?} */
    const len = groups.length;
    while (i < len) {
        /** @type {?} */
        const res = findNodeInstanceInTree(((/** @type {?} */ (groups[i]))).node.nodes, node);
        if (res.index > -1) {
            return res;
        }
        i++;
    }
    return {
        container: [],
        index: -1
    };
}
/**
 * @param {?=} nodes
 * @return {?}
 */
function flattenNodeInstances(nodes = []) {
    /** @type {?} */
    let flatNodes = [];
    nodes.forEach((/**
     * @param {?} nodeInstance
     * @return {?}
     */
    (nodeInstance) => {
        flatNodes.push(nodeInstance);
        if (nodeInstance instanceof AjfNodeGroupInstance ||
            nodeInstance instanceof AjfSlideInstance ||
            nodeInstance instanceof AjfRepeatingSlideInstance) {
            flatNodes = flatNodes.concat(flattenNodeInstances(nodeInstance.nodes));
        }
    }));
    return flatNodes;
}
/**
 * @param {?} node
 * @return {?}
 */
function isContainerNodeInstance(node) {
    return node != null && (node instanceof AjfSlideInstance ||
        node instanceof AjfRepeatingSlideInstance ||
        node instanceof AjfNodeGroupInstance);
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
      var drawThreshold = function(source, property, treshold) {
        source = (source || []).slice(0);
        var l = source.length;
        var res = [];
        for (var i = 0; i < l ; i++) {
          if (source[i][property] != null) {
            res.push(treshold);
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
        * @param  coefficent the coefficent used for calculate the treshold
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
          var treshold = (res/counter)*coefficient || 0;
          return treshold;
        }
      }`,
            `var alert = function(source, property, treshold, fmt) {
        source = (source || []).slice(0);
        var l = source.length;

        if ( lastProperty(source, property)  > treshold ) {
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
        if (AjfValidatedProperty.utils[name] === undefined) {
            AjfValidatedProperty.utils[name] = { fn };
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
        AjfValidatedProperty.UTIL_FUNCTIONS = this._functionsStr;
    }
}
AjfValidationService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
AjfValidationService.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const esprimaMod$1 = esprima__default || esprima;
const { tokenize: tokenize$1 } = esprimaMod$1;
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
    get nodesTree() { return this._flatNodesTree; }
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
            Object.keys(form.initContext).length > 0) {
            context = form.initContext;
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
            const maxReps = group instanceof AjfNodeGroupInstance ?
                group.nodeGroup.maxReps : group.slide.maxReps;
            if (maxReps > 0 && group.reps + 1 > maxReps) {
                subscriber.next(false);
                subscriber.complete();
                return;
            }
            /** @type {?} */
            const oldReps = group.reps;
            group.reps = group.reps + 1;
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
            const minReps = group instanceof AjfNodeGroupInstance ?
                group.nodeGroup.minReps : group.slide.minReps;
            if (group.reps - 1 < minReps) {
                subscriber.next(false);
                subscriber.complete();
                return;
            }
            /** @type {?} */
            const oldReps = group.reps;
            group.reps = group.reps - 1;
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
            const fieldName = field.completeName;
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
                if (node instanceof AjfRepeatingSlideInstance) {
                    for (let i = 0; i < node.reps; i++) {
                        if (node.visible) {
                            currentPosition++;
                            if (i == 0) {
                                node.position = currentPosition;
                            }
                            if (!node.validSlide(i)) {
                                errors.push(currentPosition);
                            }
                        }
                    }
                }
                else if (node instanceof AjfSlideInstance) {
                    if (node.visible) {
                        currentPosition++;
                        node.position = currentPosition;
                        if (!node.valid) {
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
            ((/** @type {?} */ (this._visibilityNodesMapUpdates))).pipe(scan((/**
             * @param {?} rmap
             * @param {?} op
             * @return {?}
             */
            (rmap, op) => {
                return op(rmap);
            }), {}), startWith({}), share());
        this._repetitionNodesMap =
            ((/** @type {?} */ (this._repetitionNodesMapUpdates))).pipe(scan((/**
             * @param {?} rmap
             * @param {?} op
             * @return {?}
             */
            (rmap, op) => {
                return op(rmap);
            }), {}), startWith({}), share());
        this._conditionalBranchNodesMap =
            ((/** @type {?} */ (this._conditionalBranchNodesMapUpdates))).pipe(scan((/**
             * @param {?} rmap
             * @param {?} op
             * @return {?}
             */
            (rmap, op) => {
                return op(rmap);
            }), {}), startWith({}), share());
        this._formulaNodesMap =
            ((/** @type {?} */ (this._formulaNodesMapUpdates))).pipe(scan((/**
             * @param {?} rmap
             * @param {?} op
             * @return {?}
             */
            (rmap, op) => {
                return op(rmap);
            }), {}), startWith({}), share());
        this._validationNodesMap =
            ((/** @type {?} */ (this._validationNodesMapUpdates))).pipe(scan((/**
             * @param {?} rmap
             * @param {?} op
             * @return {?}
             */
            (rmap, op) => {
                return op(rmap);
            }), {}), startWith({}), share());
        this._warningNodesMap =
            ((/** @type {?} */ (this._warningNodesMapUpdates))).pipe(scan((/**
             * @param {?} rmap
             * @param {?} op
             * @return {?}
             */
            (rmap, op) => {
                return op(rmap);
            }), {}), startWith({}), share());
        this._filteredChoicesNodesMap =
            ((/** @type {?} */ (this._filteredChoicesNodesMapUpdates))).pipe(scan((/**
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
            ((/** @type {?} */ (this._nextSlideConditionsNodesMapUpdates))).pipe(scan((/**
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
                    this._orderedNodesInstancesTree(flattenNodes(form.form.nodes), form.form.nodes, undefined, [], form.context) : [];
                /** @type {?} */
                let currentPosition = 0;
                nodes.forEach((/**
                 * @param {?} node
                 * @return {?}
                 */
                (node) => {
                    if (node instanceof AjfRepeatingSlideInstance) {
                        for (let i = 0; i < node.reps; i++) {
                            if (node.visible) {
                                currentPosition++;
                                if (i == 0) {
                                    node.position = currentPosition;
                                }
                            }
                        }
                    }
                    else if (node instanceof AjfSlideInstance) {
                        if (node.visible) {
                            currentPosition++;
                            node.position = currentPosition;
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
            if (instance instanceof AjfNodeGroupInstance ||
                instance instanceof AjfRepeatingSlideInstance) {
                this._explodeRepeatingNode(allNodes, instance, context);
            }
            else if (instance instanceof AjfSlideInstance) {
                instance.nodes = this._orderedNodesInstancesTree(allNodes, instance.slide.nodes, instance.slide.id, prefix, context);
            }
            instance.updateVisibility(context, branchVisibility);
            instance.updateConditionalBranches(context);
            if (instance instanceof AjfFieldWithChoicesInstance) {
                instance.updateFilteredChoices(context);
            }
            else if (instance instanceof AjfFieldInstance) {
                instance.value = context[instance.completeName];
                instance.updateFieldState(context);
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
            if (instance instanceof AjfNodeGroupInstance) {
                /** @type {?} */
                const node = new AjfEmptyField({
                    'label': instance.node.label
                });
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
                const group = instance instanceof AjfNodeGroupInstance ?
                    instance.nodeGroup : instance.slide;
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
            if (instance instanceof AjfNodeGroupInstance) {
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
            if (fg != null && fg.contains(instance.completeName)) {
                fg.controls[instance.completeName].setValue(instance.reps);
            }
        }
        instance.flatNodes = flattenNodesInstances(instance.nodes);
        if (instance instanceof AjfRepeatingSlideInstance) {
            /** @type {?} */
            const slideNodes = [];
            /** @type {?} */
            const nodesPerSlide = instance.nodesPerSlide;
            for (let i = 0; i < instance.reps; i++) {
                /** @type {?} */
                const startNode = i * nodesPerSlide;
                slideNodes.push(instance.nodes.slice(startNode, startNode + nodesPerSlide));
            }
            instance.slideNodes = slideNodes;
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
        const oldReps = instance.updateRepsNum(context);
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
        orderedNodes(nodes, parent)
            .forEach((/**
         * @param {?} node
         * @return {?}
         */
        (node) => {
            /** @type {?} */
            const parentNodeInstance = nodesInstances.find((/**
             * @param {?} ni
             * @return {?}
             */
            ni => ni.node.id == node.parent && ni.suffix == curSuffix));
            /** @type {?} */
            const branchVisibility = parentNodeInstance != null ?
                parentNodeInstance.verifiedBranch != null &&
                    parentNodeInstance.verifiedBranch == node.parentNode : true;
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
        this._formGroupSubscription = formGroup.valueChanges.pipe(startWith({}), pairwise(), debounceTime(200), withLatestFrom(...(this._nodesMaps), this._flatNodes)).subscribe((/**
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
                n => n.completeName === fieldName)));
                if (visibilityMap[fieldName] != null) {
                    visibilityMap[fieldName].forEach((/**
                     * @param {?} nodeInstance
                     * @return {?}
                     */
                    nodeInstance => {
                        /** @type {?} */
                        const visibilityChanged = nodeInstance.updateVisibility(newFormValue);
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
                                    fg.controls[nodeInstance.completeName].setValue(null);
                                }));
                            }
                            if (nodeInstance instanceof AjfFieldInstance) {
                                ((/** @type {?} */ (nodeInstance))).value = null;
                            }
                        }
                        else if (visibilityChanged && nodeInstance.visible &&
                            nodeInstance instanceof AjfFieldInstance) {
                            /** @type {?} */
                            const fg = this._formGroup.getValue();
                            /** @type {?} */
                            const res = ((/** @type {?} */ (nodeInstance))).updateFormula(newFormValue);
                            if (fg != null && res.changed) {
                                fg.controls[nodeInstance.completeName].setValue(res.value);
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
                        if (nodeInstance instanceof AjfNodeGroupInstance ||
                            nodeInstance instanceof AjfRepeatingSlideInstance) {
                            /** @type {?} */
                            const oldReps = nodeInstance.updateRepsNum(newFormValue);
                            if (oldReps !== nodeInstance.reps) {
                                this._adjustReps(nodes, nodeInstance, oldReps, newFormValue);
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
                        nodeInstance.updateConditionalBranches(newFormValue);
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
                        if (nodeInstance instanceof AjfFieldInstance) {
                            /** @type {?} */
                            const res = nodeInstance.updateFormula(newFormValue);
                            /** @type {?} */
                            const fg = this._formGroup.getValue();
                            if (fg != null && res.changed) {
                                nodeInstance.updateValidation(newFormValue);
                                fg.controls[nodeInstance.completeName].setValue(res.value);
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
                        if (nodeInstance instanceof AjfFieldInstance) {
                            newFormValue.$value = newFormValue[nodeInstance.completeName];
                            nodeInstance.updateValidation(newFormValue, this.currentSupplementaryInformations);
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
                        if (nodeInstance instanceof AjfFieldInstance) {
                            nodeInstance.updateWarning(newFormValue);
                            if (nodeInstance.warningResults.filter((/**
                             * @param {?} warning
                             * @return {?}
                             */
                            warning => warning.result)).length > 0) {
                                nodeInstance.emitTriggerWarning();
                            }
                        }
                        if (updatedNodes.indexOf(nodeInstance) === -1) {
                            updatedNodes.push(nodeInstance);
                        }
                    }));
                }
                if (deltaLen == 1 && nextSlideConditionsMap[fieldName] != null) {
                    if (nextSlideConditionsMap[fieldName].filter((/**
                     * @param {?} nodeInstance
                     * @return {?}
                     */
                    (nodeInstance) => {
                        if (nodeInstance instanceof AjfFieldInstance) {
                            return nodeInstance.updateNextSlideCondition(newFormValue);
                        }
                        return false;
                    })).length == 1) {
                        this._nextSlideTrigger.emit();
                    }
                }
                if (filteredChoicesMap[fieldName] != null) {
                    filteredChoicesMap[fieldName].forEach((/**
                     * @param {?} nodeInstance
                     * @return {?}
                     */
                    (nodeInstance) => {
                        if (nodeInstance instanceof AjfFieldWithChoicesInstance) {
                            nodeInstance.updateFilteredChoices(newFormValue);
                        }
                        if (updatedNodes.indexOf(nodeInstance) === -1) {
                            updatedNodes.push(nodeInstance);
                        }
                    }));
                }
                if (deltaLen == 1 && triggerConditionsMap[fieldName] != null) {
                    /** @type {?} */
                    const res = triggerConditionsMap[fieldName]
                        .filter((/**
                     * @param {?} nodeInstance
                     * @return {?}
                     */
                    (nodeInstance) => {
                        return nodeInstance instanceof AjfFieldWithChoicesInstance &&
                            nodeInstance.updateTriggerConditions(newFormValue);
                    }));
                    if (res.length == 1) {
                        ((/** @type {?} */ (res[0]))).emitTriggerSelection();
                    }
                }
            }));
            updatedNodes.forEach((/**
             * @param {?} n
             * @return {?}
             */
            n => n.triggerUpdate()));
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
        if (branch != null) {
            subNodes = nodes.filter((/**
             * @param {?} n
             * @return {?}
             */
            n => {
                return n.suffix == node.suffix && n.node.parent == node.node.id &&
                    n.node.parentNode == branch;
            }));
        }
        else {
            subNodes = nodes.filter((/**
             * @param {?} n
             * @return {?}
             */
            n => n.suffix == node.suffix && n.node.parent == node.node.id));
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
                n.updateVisibility(context, visible);
                if (n instanceof AjfFieldInstance) {
                    ((/** @type {?} */ (n))).updateFormula(context);
                }
                this._updateSubtreeVisibility(context, nodes, n, visible);
            }
        }));
    }
    /**
     * @private
     * @return {?}
     */
    _initNodesStreams() {
        this._nodes = this._nodesUpdates.pipe(scan((/**
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
        nodes => flattenNodesTree(nodes))), share());
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
        const nodeName = nodeInstance.completeName;
        this._removeNodesVisibilityMapIndex(nodeName);
        this._removeNodesRepetitionMapIndex(nodeName);
        this._removeNodesConditionalBranchMapIndex(nodeName);
        this._removeNodesFormulaMapIndex(nodeName);
        this._removeNodesValidationMapIndex(nodeName);
        this._removeNodesWarningMapIndex(nodeName);
        this._removeNodesNextSlideConditionsMapIndex(nodeName);
        this._removeNodesFilteredChoicesMapIndex(nodeName);
        this._removeNodesTriggerConditionsMapIndex(nodeName);
        if (nodeInstance instanceof AjfSlideInstance) {
            return this._removeSlideInstance(nodeInstance);
        }
        else if (isRepeatingNode(nodeInstance.node)) {
            this._removeNodeGroupInstance((/** @type {?} */ (nodeInstance)));
        }
        else if (nodeInstance instanceof AjfFieldInstance) {
            this._removeFieldInstance(nodeInstance);
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
        const slide = slideInstance.slide;
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
        const nodeGroup = nodeGroupInstance instanceof AjfNodeGroupInstance ?
            nodeGroupInstance.nodeGroup : nodeGroupInstance.slide;
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
        const fieldInstanceName = fieldInstance.completeName;
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
        if (fieldInstance.formula != null) {
            this._removeFromNodesFormulaMap(fieldInstance, fieldInstance.formula.formula);
        }
        if (fieldInstance instanceof AjfNodeGroupInstance) {
            if (fieldInstance.formulaReps != null) {
                this._removeFromNodesRepetitionMap(fieldInstance, fieldInstance.formulaReps.formula);
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
        if (fieldInstance instanceof AjfFieldWithChoicesInstance && fieldInstance.choicesFilter != null) {
            this._removeFromNodesFilteredChoicesMap(fieldInstance, fieldInstance.choicesFilter.formula);
            if (fieldInstance.triggerConditions != null) {
                fieldInstance.triggerConditions.forEach((/**
                 * @param {?} condition
                 * @return {?}
                 */
                (condition) => {
                    this._removeFromNodesTriggerConditionsMap(fieldInstance, condition.condition);
                }));
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
        if (nodeInstance instanceof AjfRepeatingSlideInstance ||
            nodeInstance instanceof AjfNodeGroupInstance) {
            return this._addNodeGroupInstance(nodeInstance);
        }
        else if (nodeInstance instanceof AjfSlideInstance) {
            return this._addSlideInstance(nodeInstance);
        }
        else if (nodeInstance instanceof AjfFieldInstance) {
            return this._addFieldInstance(nodeInstance);
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
        const fieldInstanceName = fieldInstance.completeName;
        if (formGroup != null && !formGroup.contains(fieldInstanceName)) {
            /** @type {?} */
            const control = new FormControl();
            control.setValue(fieldInstance.value);
            formGroup.registerControl(fieldInstanceName, control);
        }
        if (formGroup != null && fieldInstance instanceof AjfTableFieldInstance
            && ((/** @type {?} */ (fieldInstance.node))).editable) {
            /** @type {?} */
            let node = (/** @type {?} */ (fieldInstance.node));
            /** @type {?} */
            let value = [];
            node.rows.forEach((/**
             * @param {?} row
             * @return {?}
             */
            (row) => {
                /** @type {?} */
                let r = [];
                row.forEach((/**
                 * @param {?} k
                 * @return {?}
                 */
                (k) => {
                    /** @type {?} */
                    const control = new FormControl();
                    control.setValue(fieldInstance.context[k]);
                    (/** @type {?} */ (formGroup)).registerControl(k, control);
                    r.push(control);
                }));
                value.push(r);
            }));
            fieldInstance.controls = value;
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
        if (fieldInstance.formula != null) {
            this._addToNodesFormulaMap(fieldInstance, fieldInstance.formula.formula);
        }
        if (fieldInstance instanceof AjfNodeGroupInstance) {
            if (fieldInstance.formulaReps != null) {
                this._addToNodesRepetitionMap(fieldInstance, fieldInstance.formulaReps.formula);
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
        if (fieldInstance instanceof AjfFieldWithChoicesInstance) {
            if (fieldInstance.choicesFilter != null) {
                this._addToNodesFilteredChoicesMap(fieldInstance, fieldInstance.choicesFilter.formula);
            }
            if (fieldInstance.triggerConditions != null) {
                fieldInstance.triggerConditions.forEach((/**
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
        const slide = slideInstance.slide;
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
        const nodeGroup = nodeGroupInstance instanceof AjfNodeGroupInstance ?
            nodeGroupInstance.nodeGroup : nodeGroupInstance.slide;
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
            let nodeGroupInstanceName = nodeGroupInstance.completeName;
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
        let tokens = tokenize$1(formula)
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
        let tokens = tokenize$1(formula)
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
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
     * @param {?} slide
     * @return {?}
     */
    isRepeatingSlide(slide) {
        return slide instanceof AjfRepeatingSlideInstance;
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
        return node.completeName;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class BoolToIntPipe {
    /**
     * @param {?} value
     * @return {?}
     */
    transform(value) {
        return value ? 1 : 0;
    }
}
BoolToIntPipe.decorators = [
    { type: Pipe, args: [{ name: 'boolToInt' },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfFieldIsValidPipe {
    /**
     * @param {?} fieldInstance
     * @return {?}
     */
    transform(fieldInstance) {
        if (fieldInstance &&
            fieldInstance.validationResults &&
            fieldInstance.validationResults.length === 0) {
            return true;
        }
        else {
            return false;
        }
    }
}
AjfFieldIsValidPipe.decorators = [
    { type: Pipe, args: [{ name: 'ajfFieldIsValid' },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class TableRowClass {
    /**
     * @param {?} value
     * @return {?}
     */
    transform(value) {
        return value % 2 == 0 ? 'ajf-row-even' : 'ajf-row-odd';
    }
}
TableRowClass.decorators = [
    { type: Pipe, args: [{ name: 'tableRowClass' },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfFormsModule {
}
AjfFormsModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    AjfFieldIsValidPipe,
                    BoolToIntPipe,
                    FieldIconPipe,
                    TableRowClass,
                ],
                exports: [
                    AjfFieldIsValidPipe,
                    BoolToIntPipe,
                    FieldIconPipe,
                    TableRowClass,
                ],
                providers: [
                    AjfFormRendererService,
                    AjfValidationService
                ]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfForm extends AjfJsonSerializable {
    /**
     * @param {?=} obj
     */
    constructor(obj) {
        super();
        this.valid = true;
        this.lastSelectedLocation = true;
        this.jsonExportedMembers = this.jsonExportedMembers.concat(['nodes', 'choicesOrigins', 'stringIdentifier', 'topBar']);
        this.nodes = obj && obj.nodes || [];
        this.choicesOrigins = obj && obj.choicesOrigins || [];
        this.attachmentsOrigins = obj && obj.attachmentsOrigins || [];
        this.initContext = obj && obj.initContext || {};
        this.stringIdentifier = obj && obj.stringIdentifier || [];
        this.lastSelectedLocation = obj && obj.lastSelectedLocation == false ? false : true;
        this.supplementaryInformations = obj && obj.supplementaryInformations || null;
    }
    /**
     * this method will load an AjfForm from json
     * @param {?} obj : any - object form
     * @param {?=} context
     * @return {?} AjfForm
     */
    static fromJson(obj, context) {
        obj = deepCopy(obj);
        if (context) {
            context = deepCopy(context);
            obj.initContext = context;
        }
        /** @type {?} */
        let keys = Object.keys(obj);
        if (keys.indexOf('choicesOrigins') > -1 &&
            obj.choicesOrigins instanceof Array) {
            /** @type {?} */
            let cos = [];
            for (let i = 0; i < obj.choicesOrigins.length; i++) {
                cos.push(AjfChoicesOrigin.fromJson(obj.choicesOrigins[i]));
            }
            obj.choicesOrigins = cos;
        }
        if (keys.indexOf('attachmentsOrigins') > -1 &&
            obj.attachmentsOrigins instanceof Array) {
            /** @type {?} */
            let cos = [];
            for (let i = 0; i < obj.attachmentsOrigins.length; i++) {
                cos.push(AjfAttachmentsOrigin.fromJson(obj.attachmentsOrigins[i]));
            }
            obj.attachmentsOrigins = cos;
        }
        if (keys.indexOf('nodes') > -1 && obj.nodes instanceof Array) {
            /** @type {?} */
            let fs = [];
            for (let i = 0; i < obj.nodes.length; i++) {
                /** @type {?} */
                let nodeObj = obj.nodes[i];
                /** @type {?} */
                let node;
                node = AjfNode.fromJson(nodeObj, obj.choicesOrigins, obj.attachmentsOrigins, context);
                fs.push(node);
            }
            obj.nodes = fs;
        }
        return new AjfForm(obj);
    }
    /**
     * @param {?} schema
     * @param {?} json
     * @param {?=} emptyString
     * @return {?}
     */
    static toString(schema, json, emptyString = '') {
        if (schema.stringIdentifier != null && schema.stringIdentifier.length > 0) {
            /** @type {?} */
            let str = schema.stringIdentifier.map((/**
             * @param {?} s
             * @return {?}
             */
            (s) => {
                /** @type {?} */
                let values = [];
                if (s.value != null && s.value.length > 0) {
                    s.value.forEach((/**
                     * @param {?} curValue
                     * @return {?}
                     */
                    (curValue) => {
                        /** @type {?} */
                        let val;
                        /** @type {?} */
                        let vp = curValue.split('.');
                        /** @type {?} */
                        let cp = json;
                        vp.forEach((/**
                         * @param {?} k
                         * @return {?}
                         */
                        k => {
                            if (Object.keys(cp).indexOf(k) > -1) {
                                val = cp[k];
                                cp = cp[k];
                            }
                        }));
                        if (val instanceof Array && val.length > 0) {
                            val = val.join(', ');
                        }
                        if (val != null) {
                            values.push(`${val}`);
                        }
                    }));
                }
                return `${s.label}: ${values.length > 0 ? values.join(', ')
                    : emptyString}`;
            }));
            return str.join(' - ');
        }
        return null;
    }
    /**
     * this method will get child nodes from ajfNode
     * @param {?} node : AjfNode
     * @return {?} ajfNode[] - the child og AjfNode
     */
    getChildNodes(node) {
        return this.nodes.filter((/**
         * @param {?} n
         * @return {?}
         */
        n => n.parent === node.id)).sort((/**
         * @param {?} n
         * @return {?}
         */
        n => n.parentNode));
    }
    /**
     * this method will get root node
     * @return {?} ajfNode - the root node
     */
    getRootNode() {
        if (this.nodes == null || this.nodes.length === 0) {
            return null;
        }
        /** @type {?} */
        let ns = this.nodes.filter((/**
         * @param {?} n
         * @return {?}
         */
        n => n.parent == null));
        return ns.length === 1 ? ns[0] : null;
    }
}

export { AjfAttachment, AjfAttachmentsFixedOrigin, AjfAttachmentsOrigin, AjfAttachmentsType, AjfBooleanField, AjfChoice, AjfChoicesFixedOrigin, AjfChoicesFunctionOrigin, AjfChoicesObservableArrayOrigin, AjfChoicesObservableOrigin, AjfChoicesOrigin, AjfChoicesPromiseOrigin, AjfChoicesType, AjfDateField, AjfDateFieldInstance, AjfDateInputField, AjfEmptyField, AjfEmptyFieldInstance, AjfField, AjfFieldInstance, AjfFieldNodeLink, AjfFieldType, AjfFieldWithChoices, AjfFieldWithChoicesInstance, AjfForm, AjfFormActionEvent, AjfFormField, AjfFormFieldValueChanged, AjfFormInitStatus, AjfFormRenderer, AjfFormRendererService, AjfFormsModule, AjfFormulaField, AjfInvalidFieldDefinitionError, AjfMultipleChoiceField, AjfNode, AjfNodeGroup, AjfNodeGroupInstance, AjfNodeInstance, AjfNodeType, AjfNumberField, AjfRepeatingSlide, AjfRepeatingSlideInstance, AjfSingleChoiceField, AjfSlide, AjfSlideInstance, AjfStringField, AjfTableField, AjfTableFieldInstance, AjfTextField, AjfTimeField, AjfValidation, AjfValidationGroup, AjfValidationResult, AjfValidationService, AjfWarning, AjfWarningGroup, AjfWarningResult, FieldIconPipe, fieldIconName, findNodeInstanceInTree, flattenNodeInstances, flattenNodes, flattenNodesInstances, flattenNodesTree, getAncestorRepeatingNodes, getAncestorRepeatingNodesNames, getTypeName, isContainerNode, isContainerNodeInstance, isRepeatingNode, nodeToNodeInstance, normalizeFormula, orderedNodes, AjfFieldIsValidPipe as ɵa, BoolToIntPipe as ɵb, TableRowClass as ɵc };
//# sourceMappingURL=forms.js.map
