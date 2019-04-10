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
import { __extends, __assign } from 'tslib';
import { deepCopy, coerceBooleanProperty } from '@ajf/core/utils';
import { Subscription, ReplaySubject, Observable, timer, Subject, BehaviorSubject } from 'rxjs';
import { AjfJsonSerializable, AjfError, AjfCondition, AjfFormula, AjfValidatedProperty } from '@ajf/core/models';
import { Pipe, EventEmitter, Injectable, NgModule } from '@angular/core';
import { withLatestFrom, filter, map, publishReplay, refCount, startWith, scan, share, pairwise, debounceTime, delayWhen } from 'rxjs/operators';
import { tokenize } from 'esprima';
import { FormGroup, FormControl } from '@angular/forms';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {number} */
var AjfAttachmentsType = {
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
var  /**
 * This class will define an ajf attachment
 * @template T
 */
AjfAttachment = /** @class */ (function () {
    function AjfAttachment(obj) {
        this._label = obj && obj.label || null;
        this._value = obj && obj.value || null;
        this._type = obj && obj.type || null;
    }
    Object.defineProperty(AjfAttachment.prototype, "label", {
        get: /**
         * @return {?}
         */
        function () { return this._label; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfAttachment.prototype, "value", {
        get: /**
         * @return {?}
         */
        function () { return this._value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfAttachment.prototype, "type", {
        get: /**
         * @return {?}
         */
        function () { return this._type; },
        enumerable: true,
        configurable: true
    });
    return AjfAttachment;
}());
/**
 * This class will define an ajf attachments orgin
 * @abstract
 */
var  /**
 * This class will define an ajf attachments orgin
 * @abstract
 */
AjfAttachmentsOrigin = /** @class */ (function () {
    function AjfAttachmentsOrigin(obj) {
        this._name = obj && obj.name || null;
    }
    /**
     * this static method will create attachment
     * @param obj : any - object attachment
     * @return AjfAttachment
     */
    /**
     * this static method will create attachment
     * @param {?} obj : any - object attachment
     * @return {?} AjfAttachment
     */
    AjfAttachmentsOrigin.create = /**
     * this static method will create attachment
     * @param {?} obj : any - object attachment
     * @return {?} AjfAttachment
     */
    function (obj) {
        /** @type {?} */
        var attachments = [];
        if (obj.attachments instanceof Array) {
            for (var i = 0; i < obj.attachments.length; i++) {
                /** @type {?} */
                var att = obj.attachments[i];
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
    };
    /**
     * this static method will load an AjfAttachmentsOrigin from json
     * @param obj : any - object Attachments
     * @return AjfAttachmentsOrigin
     */
    /**
     * this static method will load an AjfAttachmentsOrigin from json
     * @param {?} obj : any - object Attachments
     * @return {?} AjfAttachmentsOrigin
     */
    AjfAttachmentsOrigin.fromJson = /**
     * this static method will load an AjfAttachmentsOrigin from json
     * @param {?} obj : any - object Attachments
     * @return {?} AjfAttachmentsOrigin
     */
    function (obj) {
        obj = deepCopy(obj);
        /** @type {?} */
        var keys = Object.keys(obj);
        if (keys.indexOf('type') === -1) {
            throw new Error('Attachments origin type missing type');
        }
        /** @type {?} */
        var type = obj.type;
        delete obj.type;
        switch (type) {
            case 'fixed':
                return AjfAttachmentsFixedOrigin.create(obj);
            default:
                throw new Error('Invalid attachment origin type');
        }
    };
    /**
     * @return {?}
     */
    AjfAttachmentsOrigin.prototype.getName = /**
     * @return {?}
     */
    function () { return this._name; };
    return AjfAttachmentsOrigin;
}());
/**
 * This class will define an ajf attachments fixed origin
 */
var  /**
 * This class will define an ajf attachments fixed origin
 */
AjfAttachmentsFixedOrigin = /** @class */ (function (_super) {
    __extends(AjfAttachmentsFixedOrigin, _super);
    function AjfAttachmentsFixedOrigin(obj) {
        var _this = _super.call(this, obj) || this;
        _this._attachments = obj && obj.attachments || [];
        return _this;
    }
    /**
     * @return {?}
     */
    AjfAttachmentsFixedOrigin.prototype.getAttachments = /**
     * @return {?}
     */
    function () { return this._attachments; };
    return AjfAttachmentsFixedOrigin;
}(AjfAttachmentsOrigin));

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
    var typeStr = typeof v;
    return typeStr === 'object'
        ? v.constructor.toString().match(/\w+/g)[1]
        : typeStr;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {number} */
var AjfChoicesType = {
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
var  /**
 * @template T
 */
AjfChoice = /** @class */ (function (_super) {
    __extends(AjfChoice, _super);
    function AjfChoice(obj) {
        var _this = _super.call(this, obj) || this;
        _this.label = obj && obj.label || '';
        _this.value = obj && obj.value || null;
        return _this;
    }
    return AjfChoice;
}(AjfJsonSerializable));
/**
 * @abstract
 * @template T
 */
var  /**
 * @abstract
 * @template T
 */
AjfChoicesOrigin = /** @class */ (function (_super) {
    __extends(AjfChoicesOrigin, _super);
    function AjfChoicesOrigin(obj) {
        var _this = _super.call(this) || this;
        _this.jsonExportedMembers = _this.jsonExportedMembers.concat(['type', 'name', 'label', 'choicesType']);
        _this._name = obj && obj.name || null;
        _this._label = obj && obj.label || null;
        _this._choicesType = obj && obj.choicesType || null;
        return _this;
    }
    /**
     * @param {?} type
     * @param {?=} obj
     * @return {?}
     */
    AjfChoicesOrigin.create = /**
     * @param {?} type
     * @param {?=} obj
     * @return {?}
     */
    function (type, obj) {
        switch (type) {
            case 'string':
                return new AjfChoicesFixedOrigin(obj);
            case 'number':
                return new AjfChoicesFixedOrigin(obj);
            default:
                return null;
        }
    };
    /**
     * @param {?} obj
     * @return {?}
     */
    AjfChoicesOrigin.fromJson = /**
     * @param {?} obj
     * @return {?}
     */
    function (obj) {
        obj = deepCopy(obj);
        /** @type {?} */
        var keys = Object.keys(obj);
        if (keys.indexOf('type') === -1) {
            throw new Error('Choices origin type missing type');
        }
        /** @type {?} */
        var type = obj.type;
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
    };
    /**
     * @return {?}
     */
    AjfChoicesOrigin.prototype.getName = /**
     * @return {?}
     */
    function () { return this._name; };
    /**
     * @return {?}
     */
    AjfChoicesOrigin.prototype.getLabel = /**
     * @return {?}
     */
    function () { return this._label; };
    /**
     * @param {?} name
     * @return {?}
     */
    AjfChoicesOrigin.prototype.setName = /**
     * @param {?} name
     * @return {?}
     */
    function (name) { this._name = name; };
    /**
     * @param {?} label
     * @return {?}
     */
    AjfChoicesOrigin.prototype.setLabel = /**
     * @param {?} label
     * @return {?}
     */
    function (label) { this._label = label; };
    /**
     * @return {?}
     */
    AjfChoicesOrigin.prototype.getChoicesType = /**
     * @return {?}
     */
    function () {
        return this._choicesType || this.guessChoicesType();
    };
    /**
     * @private
     * @return {?}
     */
    AjfChoicesOrigin.prototype.guessChoicesType = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var cs = this.getChoices();
        if (cs && cs.length > 0) {
            this._choicesType = getTypeName(cs[0].value);
        }
        return this._choicesType;
    };
    return AjfChoicesOrigin;
}(AjfJsonSerializable));
/**
 * @template T
 */
var  /**
 * @template T
 */
AjfChoicesFixedOrigin = /** @class */ (function (_super) {
    __extends(AjfChoicesFixedOrigin, _super);
    function AjfChoicesFixedOrigin(obj) {
        var _this = _super.call(this, obj) || this;
        _this.jsonExportedMembers = _this.jsonExportedMembers.concat('choices');
        _this._choices = obj && (/** @type {?} */ (obj.choices)) || [];
        return _this;
    }
    /**
     * @return {?}
     */
    AjfChoicesFixedOrigin.prototype.getType = /**
     * @return {?}
     */
    function () { return 'fixed'; };
    /**
     * @return {?}
     */
    AjfChoicesFixedOrigin.prototype.getChoices = /**
     * @return {?}
     */
    function () { return this._choices; };
    /**
     * @param {?} choices
     * @return {?}
     */
    AjfChoicesFixedOrigin.prototype.setChoices = /**
     * @param {?} choices
     * @return {?}
     */
    function (choices) { this._choices = choices.slice(0); };
    return AjfChoicesFixedOrigin;
}(AjfChoicesOrigin));
/**
 * @template T
 */
var  /**
 * @template T
 */
AjfChoicesFunctionOrigin = /** @class */ (function (_super) {
    __extends(AjfChoicesFunctionOrigin, _super);
    function AjfChoicesFunctionOrigin(generator, obj) {
        var _this = _super.call(this, obj) || this;
        _this.jsonExportedMembers = _this.jsonExportedMembers.concat('generator');
        _this._generator = generator;
        return _this;
    }
    Object.defineProperty(AjfChoicesFunctionOrigin.prototype, "generator", {
        get: /**
         * @return {?}
         */
        function () { return this._generator; },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    AjfChoicesFunctionOrigin.prototype.getType = /**
     * @return {?}
     */
    function () { return 'function'; };
    /**
     * @return {?}
     */
    AjfChoicesFunctionOrigin.prototype.getChoices = /**
     * @return {?}
     */
    function () { return this._generator(); };
    return AjfChoicesFunctionOrigin;
}(AjfChoicesOrigin));
/**
 * @template T
 */
var  /**
 * @template T
 */
AjfChoicesObservableOrigin = /** @class */ (function (_super) {
    __extends(AjfChoicesObservableOrigin, _super);
    function AjfChoicesObservableOrigin(_observable, obj) {
        var _this = _super.call(this, obj) || this;
        _this._observable = _observable;
        _this._currentChoices = [];
        _this._subscription = Subscription.EMPTY;
        _this.jsonExportedMembers = _this.jsonExportedMembers.concat('observable');
        /** @type {?} */
        var self = _this;
        _this._subscription = _observable.subscribe((/**
         * @param {?} x
         * @return {?}
         */
        function (x) { return self._currentChoices.push(x); }));
        return _this;
    }
    Object.defineProperty(AjfChoicesObservableOrigin.prototype, "observable", {
        get: /**
         * @return {?}
         */
        function () {
            return this._observable;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    AjfChoicesObservableOrigin.prototype.getType = /**
     * @return {?}
     */
    function () { return 'observable'; };
    /**
     * @return {?}
     */
    AjfChoicesObservableOrigin.prototype.getChoices = /**
     * @return {?}
     */
    function () { return this._currentChoices.splice(0); };
    /**
     * @return {?}
     */
    AjfChoicesObservableOrigin.prototype.destroy = /**
     * @return {?}
     */
    function () {
        this._subscription.unsubscribe();
    };
    return AjfChoicesObservableOrigin;
}(AjfChoicesOrigin));
/**
 * @template T
 */
var  /**
 * @template T
 */
AjfChoicesObservableArrayOrigin = /** @class */ (function (_super) {
    __extends(AjfChoicesObservableArrayOrigin, _super);
    function AjfChoicesObservableArrayOrigin(_observable, obj) {
        var _this = _super.call(this, obj) || this;
        _this._observable = _observable;
        _this._currentChoices = [];
        _this._subscription = Subscription.EMPTY;
        _this.jsonExportedMembers = _this.jsonExportedMembers.concat('observable');
        /** @type {?} */
        var self = _this;
        _this._subscription = _observable.subscribe((/**
         * @param {?} x
         * @return {?}
         */
        function (x) { return self._currentChoices = x.splice(0); }));
        return _this;
    }
    Object.defineProperty(AjfChoicesObservableArrayOrigin.prototype, "observable", {
        get: /**
         * @return {?}
         */
        function () {
            return this._observable;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    AjfChoicesObservableArrayOrigin.prototype.getType = /**
     * @return {?}
     */
    function () { return 'observableArray'; };
    /**
     * @return {?}
     */
    AjfChoicesObservableArrayOrigin.prototype.getChoices = /**
     * @return {?}
     */
    function () { return this._currentChoices.splice(0); };
    /**
     * @return {?}
     */
    AjfChoicesObservableArrayOrigin.prototype.destroy = /**
     * @return {?}
     */
    function () {
        this._subscription.unsubscribe();
    };
    return AjfChoicesObservableArrayOrigin;
}(AjfChoicesOrigin));
/**
 * @template T
 */
var  /**
 * @template T
 */
AjfChoicesPromiseOrigin = /** @class */ (function (_super) {
    __extends(AjfChoicesPromiseOrigin, _super);
    function AjfChoicesPromiseOrigin(promise, obj) {
        var _this = _super.call(this, obj) || this;
        _this._choices = [];
        _this.jsonExportedMembers = _this.jsonExportedMembers.concat('promise');
        promise.then((/**
         * @param {?} x
         * @return {?}
         */
        function (x) { _this._choices = x.splice(0); }));
        return _this;
    }
    /**
     * @return {?}
     */
    AjfChoicesPromiseOrigin.prototype.getType = /**
     * @return {?}
     */
    function () { return 'promise'; };
    /**
     * @return {?}
     */
    AjfChoicesPromiseOrigin.prototype.getChoices = /**
     * @return {?}
     */
    function () { return this._choices.splice(0); };
    return AjfChoicesPromiseOrigin;
}(AjfChoicesOrigin));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * This class will define an Ajf invalid field definition error
 */
var  /**
 * This class will define an Ajf invalid field definition error
 */
AjfInvalidFieldDefinitionError = /** @class */ (function (_super) {
    __extends(AjfInvalidFieldDefinitionError, _super);
    function AjfInvalidFieldDefinitionError(message) {
        return _super.call(this, message) || this;
    }
    Object.defineProperty(AjfInvalidFieldDefinitionError.prototype, "name", {
        get: /**
         * @return {?}
         */
        function () { return 'AjfInvalidFieldDefinitionError'; },
        enumerable: true,
        configurable: true
    });
    return AjfInvalidFieldDefinitionError;
}(AjfError));

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
    var f = 1;
    for (var i = n; i > 1; i--) {
        f = f * i;
    }
    return f;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AjfValidationResult = /** @class */ (function () {
    /**
     * this constructor will assign the parameters value to a class variables
     * @param res : boolean
     * @param err : string
     * @cVal : boolean
     */
    function AjfValidationResult(res, err, cVal) {
        this.result = res;
        this.error = err;
        this.clientValidation = cVal;
    }
    return AjfValidationResult;
}());
/**
 * This class will define an ajf validation
 */
var  /**
 * This class will define an ajf validation
 */
AjfValidation = /** @class */ (function (_super) {
    __extends(AjfValidation, _super);
    /**
     * this constructor will assign the obj value to a class variables and call
     * super()
     */
    function AjfValidation(obj) {
        var _this = _super.call(this, obj) || this;
        _this.clientValidation = obj && obj.clientValidation || false;
        _this.errorMessage = obj && obj.errorMessage || 'Undefined Error';
        _this.jsonExportedMembers = _this.jsonExportedMembers
            .concat(['clientValidation', 'errorMessage']);
        return _this;
    }
    /**
     * this static method will load an AjfValidation from json
     * @param obj  : any - object validation
     * @return AjfValidation
     */
    /**
     * this static method will load an AjfValidation from json
     * @param {?} obj  : any - object validation
     * @return {?} AjfValidation
     */
    AjfValidation.fromJson = /**
     * this static method will load an AjfValidation from json
     * @param {?} obj  : any - object validation
     * @return {?} AjfValidation
     */
    function (obj) {
        obj = deepCopy(obj);
        return new AjfValidation(obj);
    };
    /**
     * this static method will get an ajfValidation with maxValue setted
     * @param maxValue : number - max value
     * @return AjfValidation
     */
    /**
     * this static method will get an ajfValidation with maxValue setted
     * @param {?} maxValue : number - max value
     * @return {?} AjfValidation
     */
    AjfValidation.getMaxCondition = /**
     * this static method will get an ajfValidation with maxValue setted
     * @param {?} maxValue : number - max value
     * @return {?} AjfValidation
     */
    function (maxValue) {
        return new AjfValidation({
            condition: '$value <= ' + maxValue.toString(),
            errorMessage: 'Value must be <= ' + maxValue.toString()
        });
    };
    /**
     * this static method will get an ajfValidation with minValue setted
     * @param minValue : number - min value
     * @return AjfValidation
     */
    /**
     * this static method will get an ajfValidation with minValue setted
     * @param {?} minValue : number - min value
     * @return {?} AjfValidation
     */
    AjfValidation.getMinCondition = /**
     * this static method will get an ajfValidation with minValue setted
     * @param {?} minValue : number - min value
     * @return {?} AjfValidation
     */
    function (minValue) {
        return new AjfValidation({
            condition: '$value >= ' + minValue.toString(),
            errorMessage: 'Value must be >= ' + minValue.toString()
        });
    };
    /**
     * this static method will get an ajfValidation with notEmpty setted
     * @return AjfValidation
     */
    /**
     * this static method will get an ajfValidation with notEmpty setted
     * @return {?} AjfValidation
     */
    AjfValidation.getNotEmptyCondition = /**
     * this static method will get an ajfValidation with notEmpty setted
     * @return {?} AjfValidation
     */
    function () {
        return new AjfValidation({
            condition: "notEmpty($value)",
            errorMessage: "Value must not be empty"
        });
    };
    /**
     * this static method will get an ajfValidation with maxDigit setted
     * @return AjfValidation
     */
    /**
     * this static method will get an ajfValidation with maxDigit setted
     * @param {?} maxValue
     * @return {?} AjfValidation
     */
    AjfValidation.getMaxDigitsCondition = /**
     * this static method will get an ajfValidation with maxDigit setted
     * @param {?} maxValue
     * @return {?} AjfValidation
     */
    function (maxValue) {
        return new AjfValidation({
            condition: "$value ? $value.toString().length <= " + maxValue.toString() + " : false",
            errorMessage: 'Digits count must be <= ' + maxValue.toString()
        });
    };
    /**
     * this static method will get an ajfValidation with minDigit setted
     * @return AjfValidation
     */
    /**
     * this static method will get an ajfValidation with minDigit setted
     * @param {?} minValue
     * @return {?} AjfValidation
     */
    AjfValidation.getMinDigitsCondition = /**
     * this static method will get an ajfValidation with minDigit setted
     * @param {?} minValue
     * @return {?} AjfValidation
     */
    function (minValue) {
        return new AjfValidation({
            condition: "$value ? $value.toString().length >= " + minValue.toString() + " : false",
            errorMessage: 'Digits count must be >= ' + minValue.toString()
        });
    };
    /**
     * this public method will evaluate context or forceFormula
     * @param context      : any - context
     * @param forceFormula : string - formula
     * @return AjfValidationResult
     */
    /**
     * this public method will evaluate context or forceFormula
     * @param {?=} context      : any - context
     * @param {?=} forceFormula : string - formula
     * @return {?} AjfValidationResult
     */
    AjfValidation.prototype.evaluate = /**
     * this public method will evaluate context or forceFormula
     * @param {?=} context      : any - context
     * @param {?=} forceFormula : string - formula
     * @return {?} AjfValidationResult
     */
    function (context, forceFormula) {
        return new AjfValidationResult(_super.prototype.evaluate.call(this, context, forceFormula), this.errorMessage, this.clientValidation);
    };
    return AjfValidation;
}(AjfCondition));
/**
 * This class will define an ajf validation group
 */
var  /**
 * This class will define an ajf validation group
 */
AjfValidationGroup = /** @class */ (function (_super) {
    __extends(AjfValidationGroup, _super);
    /**
     * this constructor will assign the obj value to a class variables
     * @param obj : any
     */
    function AjfValidationGroup(obj) {
        var _this = _super.call(this, obj) || this;
        _this.forceValue = obj && obj.forceValue || null;
        _this.maxValue = obj && obj.maxValue || null;
        _this.minValue = obj && obj.minValue || null;
        _this.notEmpty = obj && obj.notEmpty || null;
        _this.maxDigits = obj && obj.maxDigits || null;
        _this.minDigits = obj && obj.minDigits || null;
        _this.conditions = obj && obj.conditions || [];
        _this.jsonExportedMembers = _this.jsonExportedMembers
            .concat([
            'forceValue', 'maxValue', 'minValue', 'notEmpty',
            'maxDigits', 'minDigits', 'conditions'
        ]);
        return _this;
    }
    /**
     * this static method will load an AjfValidationGroup from json
     * @param obj  : any - object validationGroup
     * @return AjfValidationGroup
     */
    /**
     * this static method will load an AjfValidationGroup from json
     * @param {?} obj  : any - object validationGroup
     * @return {?} AjfValidationGroup
     */
    AjfValidationGroup.fromJson = /**
     * this static method will load an AjfValidationGroup from json
     * @param {?} obj  : any - object validationGroup
     * @return {?} AjfValidationGroup
     */
    function (obj) {
        /** @type {?} */
        var keys = Object.keys(obj);
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
            var conditions = [];
            for (var _i = 0, _a = obj.conditions; _i < _a.length; _i++) {
                var c = _a[_i];
                conditions.push(AjfValidation.fromJson(c));
            }
            obj.conditions = conditions;
        }
        return new AjfValidationGroup(obj);
    };
    /**
     * @return {?}
     */
    AjfValidationGroup.prototype.toJson = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var json = {};
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
            function (c) { return c.toJson(); }));
        }
        return json;
    };
    /**
     * this protected method evaluate max value
     * @param value : any
     * @return AjfValidationResult
     */
    /**
     * this protected method evaluate max value
     * @protected
     * @param {?} value : any
     * @return {?} AjfValidationResult
     */
    AjfValidationGroup.prototype._evaluateMaxValue = /**
     * this protected method evaluate max value
     * @protected
     * @param {?} value : any
     * @return {?} AjfValidationResult
     */
    function (value) {
        if (this.maxValue == null) {
            return null;
        }
        return this.maxValue.evaluate({ '$value': value });
    };
    /**
     * this protected method evaluate min value
     * @param value : any
     * @return AjfValidationResult
     */
    /**
     * this protected method evaluate min value
     * @protected
     * @param {?} value : any
     * @return {?} AjfValidationResult
     */
    AjfValidationGroup.prototype._evaluateMinvalue = /**
     * this protected method evaluate min value
     * @protected
     * @param {?} value : any
     * @return {?} AjfValidationResult
     */
    function (value) {
        if (this.minValue == null) {
            return null;
        }
        return this.minValue.evaluate({ '$value': value });
    };
    /**
     * this protected method evaluate not empty value
     * @param value : any
     * @return AjfValidationResult
     */
    /**
     * this protected method evaluate not empty value
     * @protected
     * @param {?} value : any
     * @return {?} AjfValidationResult
     */
    AjfValidationGroup.prototype._evaluateNotEmpty = /**
     * this protected method evaluate not empty value
     * @protected
     * @param {?} value : any
     * @return {?} AjfValidationResult
     */
    function (value) {
        if (this.notEmpty == null) {
            return null;
        }
        return this.notEmpty.evaluate({ '$value': value });
    };
    /**
     * this protected method evaluate conditions
     * @param context : any
     * @return AjfValidationResult[]
     */
    /**
     * this protected method evaluate conditions
     * @protected
     * @param {?} context : any
     * @return {?} AjfValidationResult[]
     */
    AjfValidationGroup.prototype._evaluateConditions = /**
     * this protected method evaluate conditions
     * @protected
     * @param {?} context : any
     * @return {?} AjfValidationResult[]
     */
    function (context) {
        /** @type {?} */
        var res = [];
        this.conditions.forEach((/**
         * @param {?} cond
         * @return {?}
         */
        function (cond) {
            res.push(cond.evaluate(context));
        }));
        return res;
    };
    /**
     * this public method evaluate
     * @param value   : any
     * @param context : any
     * @return AjfValidationResult[]
     */
    /**
     * this public method evaluate
     * @param {?} value   : any
     * @param {?=} context : any
     * @return {?} AjfValidationResult[]
     */
    AjfValidationGroup.prototype.evaluate = /**
     * this public method evaluate
     * @param {?} value   : any
     * @param {?=} context : any
     * @return {?} AjfValidationResult[]
     */
    function (value, context) {
        /** @type {?} */
        var res = [];
        /** @type {?} */
        var ctx = deepCopy(context);
        ctx['$value'] = value;
        res = this._evaluateConditions(ctx);
        if (this.maxValue) {
            /** @type {?} */
            var maxValue = this._evaluateMaxValue(value);
            if (maxValue != null) {
                res.push();
            }
        }
        if (this.minValue) {
            /** @type {?} */
            var minValue = this._evaluateMinvalue(value);
            if (minValue != null) {
                res.push(minValue);
            }
        }
        if (this.notEmpty) {
            /** @type {?} */
            var notEmpty = this._evaluateNotEmpty(value);
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
    };
    /**
     * this public method evaluate force value
     * @param context : any
     * @return string
     */
    /**
     * this public method evaluate force value
     * @param {?} context : any
     * @return {?} string
     */
    AjfValidationGroup.prototype.evaluateForceValue = /**
     * this public method evaluate force value
     * @param {?} context : any
     * @return {?} string
     */
    function (context) {
        return this.forceValue.evaluate(context);
    };
    return AjfValidationGroup;
}(AjfJsonSerializable));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * This class will define an ajf warning result
 */
var  /**
 * This class will define an ajf warning result
 */
AjfWarningResult = /** @class */ (function () {
    /**
     * this constructor will assign the parameters value to a class variables
     * @param res : boolean
     * @param wrn : string
     */
    function AjfWarningResult(res, wrn) {
        this.result = res;
        this.warning = wrn;
    }
    return AjfWarningResult;
}());
/**
 * This class will define an ajf warning
 */
var  /**
 * This class will define an ajf warning
 */
AjfWarning = /** @class */ (function (_super) {
    __extends(AjfWarning, _super);
    /**
     * this constructor will assign the obj value to a class variables and call
     * super()
     */
    function AjfWarning(obj) {
        var _this = _super.call(this, obj) || this;
        _this.warningMessage = obj && obj.warningMessage || 'Undefined Error';
        _this.jsonExportedMembers = _this.jsonExportedMembers
            .concat(['warningMessage']);
        return _this;
    }
    /**
     * this static method will load an AjfWarning from json
     * @param obj  : any - object warning
     * @return AjfWarning
     */
    /**
     * this static method will load an AjfWarning from json
     * @param {?} obj  : any - object warning
     * @return {?} AjfWarning
     */
    AjfWarning.fromJson = /**
     * this static method will load an AjfWarning from json
     * @param {?} obj  : any - object warning
     * @return {?} AjfWarning
     */
    function (obj) { return new AjfWarning(obj); };
    /**
     * @return {?}
     */
    AjfWarning.getNotEmptyWarning = /**
     * @return {?}
     */
    function () {
        return new AjfWarning({
            condition: "notEmpty($value)",
            warningMessage: "Value must not be empty"
        });
    };
    /**
     * this public method will evaluate context or forceFormula
     * @param context      : any - context
     * @param forceFormula : string - formula
     * @return AjfWarningResult
     */
    /**
     * this public method will evaluate context or forceFormula
     * @param {?=} context      : any - context
     * @param {?=} forceFormula : string - formula
     * @return {?} AjfWarningResult
     */
    AjfWarning.prototype.evaluate = /**
     * this public method will evaluate context or forceFormula
     * @param {?=} context      : any - context
     * @param {?=} forceFormula : string - formula
     * @return {?} AjfWarningResult
     */
    function (context, forceFormula) {
        return new AjfWarningResult(_super.prototype.evaluate.call(this, context, forceFormula), this.warningMessage);
    };
    return AjfWarning;
}(AjfCondition));
/**
 * This class will define an ajf warning group
 */
var  /**
 * This class will define an ajf warning group
 */
AjfWarningGroup = /** @class */ (function (_super) {
    __extends(AjfWarningGroup, _super);
    /**
     * this constructor will assign the obj value to a class variables
     * @param obj : any
     */
    function AjfWarningGroup(obj) {
        var _this = _super.call(this, obj) || this;
        _this.notEmpty = obj && obj.notEmpty || null;
        _this.conditions = obj && obj.conditions || null;
        _this.jsonExportedMembers = _this.jsonExportedMembers
            .concat(['notEmpty', 'conditions']);
        return _this;
    }
    /**
     * this static method will load an AjfWarningGroup from json
     * @param obj  : any - object warningGroup
     * @return AjfValidationGroup
     */
    /**
     * this static method will load an AjfWarningGroup from json
     * @param {?} obj  : any - object warningGroup
     * @return {?} AjfValidationGroup
     */
    AjfWarningGroup.fromJson = /**
     * this static method will load an AjfWarningGroup from json
     * @param {?} obj  : any - object warningGroup
     * @return {?} AjfValidationGroup
     */
    function (obj) {
        /** @type {?} */
        var keys = Object.keys(obj);
        if (keys.indexOf('notEmpty') > -1) {
            obj.notEmpty = AjfWarning.getNotEmptyWarning();
        }
        if (keys.indexOf('conditions') > -1 && obj.conditions instanceof Array) {
            /** @type {?} */
            var conditions = [];
            for (var _i = 0, _a = obj.conditions; _i < _a.length; _i++) {
                var c = _a[_i];
                conditions.push(AjfWarning.fromJson(c));
            }
            obj.conditions = conditions;
        }
        return new AjfWarningGroup(obj);
    };
    /**
     * this protected method evaluate conditions
     * @param context : any
     * @return AjfWarningResult[]
     */
    /**
     * this protected method evaluate conditions
     * @protected
     * @param {?} context : any
     * @return {?} AjfWarningResult[]
     */
    AjfWarningGroup.prototype._evaluateConditions = /**
     * this protected method evaluate conditions
     * @protected
     * @param {?} context : any
     * @return {?} AjfWarningResult[]
     */
    function (context) {
        /** @type {?} */
        var res = [];
        this.conditions.forEach((/**
         * @param {?} cond
         * @return {?}
         */
        function (cond) {
            res.push(cond.evaluate(context));
        }));
        return res;
    };
    /**
     * this public method evaluate
     * @param value   : any
     * @param context : any
     * @return AjfWarningResult[]
     */
    /**
     * this public method evaluate
     * @param {?=} context : any
     * @return {?} AjfWarningResult[]
     */
    AjfWarningGroup.prototype.evaluate = /**
     * this public method evaluate
     * @param {?=} context : any
     * @return {?} AjfWarningResult[]
     */
    function (context) {
        /** @type {?} */
        var res = this._evaluateConditions(context);
        return res;
    };
    return AjfWarningGroup;
}(AjfJsonSerializable));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {number} */
var AjfNodeType = {
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
var  /**
 * This class will define an ajf node
 */
AjfNode = /** @class */ (function (_super) {
    __extends(AjfNode, _super);
    /**
     * this constructor will assign the obj value to a class variables
     */
    function AjfNode(obj) {
        var _this = _super.call(this) || this;
        _this.jsonExportedMembers = _this.jsonExportedMembers.concat([
            'id', 'nodeType', 'parent', 'parentNode', 'visibility', 'name', 'label',
            'conditionalBranches'
        ]);
        _this._id = obj && obj.id || null;
        _this._parent = obj && obj.parent || null;
        _this._parentNode = obj && obj.parentNode || 0;
        _this._visibility = obj && obj.visibility || AjfCondition.alwaysCondition();
        _this._name = obj && obj.name || null;
        _this._label = obj && obj.label || null;
        _this._conditionalBranches = obj && obj.conditionalBranches || [AjfCondition.alwaysCondition()];
        return _this;
    }
    Object.defineProperty(AjfNode.prototype, "id", {
        get: /**
         * @return {?}
         */
        function () { return this._id; },
        set: /**
         * @param {?} id
         * @return {?}
         */
        function (id) { this._id = id; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfNode.prototype, "parent", {
        get: /**
         * @return {?}
         */
        function () { return this._parent; },
        set: /**
         * @param {?} parent
         * @return {?}
         */
        function (parent) { this._parent = parent; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfNode.prototype, "parentNode", {
        get: /**
         * @return {?}
         */
        function () { return this._parentNode; },
        set: /**
         * @param {?} parentNode
         * @return {?}
         */
        function (parentNode) { this._parentNode = parentNode; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfNode.prototype, "conditionalBranches", {
        /**
         * this method will get the conditionalBranches of the field
         * @return : _conditionalBranches
         */
        get: /**
         * this method will get the conditionalBranches of the field
         * @return {?} : _conditionalBranches
         */
        function () {
            return this._conditionalBranches;
        },
        /**
         * this method will set the conditionalBranches of the field
         * @param conditionalBranches : AjfCondition[] - the new conditionalBranches
         */
        set: /**
         * this method will set the conditionalBranches of the field
         * @param {?} conditionalBranches : AjfCondition[] - the new conditionalBranches
         * @return {?}
         */
        function (conditionalBranches) {
            this._conditionalBranches = conditionalBranches;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfNode.prototype, "name", {
        /**
         * this method will get the current name of field
         * @return : _name
         */
        get: /**
         * this method will get the current name of field
         * @return {?} : _name
         */
        function () {
            return this._name;
        },
        /**
         * this method will set the current name of field
         * @param name : string - the new name
         */
        set: /**
         * this method will set the current name of field
         * @param {?} name : string - the new name
         * @return {?}
         */
        function (name) {
            this._name = name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfNode.prototype, "label", {
        /**
         * this method will get the label of the field
         * @return : _label
         */
        get: /**
         * this method will get the label of the field
         * @return {?} : _label
         */
        function () {
            return this._label;
        },
        /**
         * this method will set the label of the field
         * @param label : string - the new label
         */
        set: /**
         * this method will set the label of the field
         * @param {?} label : string - the new label
         * @return {?}
         */
        function (label) {
            this._label = label;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfNode.prototype, "visibility", {
        /**
         * this method will get the visibility of the field
         * @return : _visibility
         */
        get: /**
         * this method will get the visibility of the field
         * @return {?} : _visibility
         */
        function () {
            return this._visibility;
        },
        /**
         * this method will set the visibility of the field
         * @param visibility : AjfCondition - the new visibility
         */
        set: /**
         * this method will set the visibility of the field
         * @param {?} visibility : AjfCondition - the new visibility
         * @return {?}
         */
        function (visibility) {
            this._visibility = visibility;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * this method will load an AjfNode from json
     * @param obj                : any - object node
     * @param choicesOrigins     : any[] - array of choicesOrigins
     * @param attachmentsOrigins : any[] - array of attachmentsOrigins
     * @return AjfNode
     */
    /**
     * this method will load an AjfNode from json
     * @param {?} obj                : any - object node
     * @param {?=} choicesOrigins     : any[] - array of choicesOrigins
     * @param {?=} attachmentsOrigins : any[] - array of attachmentsOrigins
     * @param {?=} context
     * @return {?} AjfNode
     */
    AjfNode.fromJson = /**
     * this method will load an AjfNode from json
     * @param {?} obj                : any - object node
     * @param {?=} choicesOrigins     : any[] - array of choicesOrigins
     * @param {?=} attachmentsOrigins : any[] - array of attachmentsOrigins
     * @param {?=} context
     * @return {?} AjfNode
     */
    function (obj, choicesOrigins, attachmentsOrigins, context) {
        // array of string:  contains a keys Object
        // example:
        // ["id", "name", "label", "visibility", "hasChoices", "parent",
        //  "parentNode", "nodeType", "conditionalBranches", "fieldType", "nodes"]
        obj = deepCopy(obj);
        if (context) {
            context = deepCopy(context);
        }
        /** @type {?} */
        var keys = Object.keys(obj);
        if (keys.indexOf('nodeType') === -1) {
            throw new Error('Node type missing type');
        }
        /** @type {?} */
        var nodeType = obj.nodeType;
        delete obj.nodeType;
        if (AjfNodeType[nodeType] == null) {
            throw new Error('Invalid node type');
        }
        if (keys.indexOf('visibility') > -1) {
            obj.visibility = AjfCondition.fromJson(obj.visibility);
        }
        if (keys.indexOf('conditionalBranches') > -1 && obj.conditionalBranches instanceof Array) {
            /** @type {?} */
            var cbs = [];
            for (var i = 0; i < obj.conditionalBranches.length; i++) {
                cbs.push(AjfCondition.fromJson(obj.conditionalBranches[i]));
            }
            if (cbs.length == 0) {
                cbs.push(AjfCondition.alwaysCondition());
            }
            obj.conditionalBranches = cbs;
        }
        return AjfNode.createNode(nodeType, obj, choicesOrigins, attachmentsOrigins, context);
    };
    /**
     * this method will create an AjfNode
     * @param nodeType           : identified a type of node (nodeGroup or nodeField)
     * @param obj                : any - object node
     * @param choicesOrigins     : any[] - array of choicesOrigins
     * @param attachmentsOrigins : any[] - array of attachmentsOrigins
     * @return AjfNode
     */
    /**
     * this method will create an AjfNode
     * @param {?} nodeType           : identified a type of node (nodeGroup or nodeField)
     * @param {?=} obj                : any - object node
     * @param {?=} choicesOrigins     : any[] - array of choicesOrigins
     * @param {?=} attachmentsOrigins : any[] - array of attachmentsOrigins
     * @param {?=} context
     * @return {?} AjfNode
     */
    AjfNode.createNode = /**
     * this method will create an AjfNode
     * @param {?} nodeType           : identified a type of node (nodeGroup or nodeField)
     * @param {?=} obj                : any - object node
     * @param {?=} choicesOrigins     : any[] - array of choicesOrigins
     * @param {?=} attachmentsOrigins : any[] - array of attachmentsOrigins
     * @param {?=} context
     * @return {?} AjfNode
     */
    function (nodeType, obj, choicesOrigins, attachmentsOrigins, context) {
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
    };
    Object.defineProperty(AjfNode.prototype, "nodeType", {
        /**
         * this method get the nodeType
         * @return AjfNodeType
         */
        get: /**
         * this method get the nodeType
         * @return {?} AjfNodeType
         */
        function () {
            /** @type {?} */
            var thisObj = this;
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
        },
        enumerable: true,
        configurable: true
    });
    /**
     * this method will set the conditiona branch number of the field
     * @param cbn : number
     */
    /**
     * this method will set the conditiona branch number of the field
     * @param {?} cbn : number
     * @return {?}
     */
    AjfNode.prototype.setConditionalBranchesNum = /**
     * this method will set the conditiona branch number of the field
     * @param {?} cbn : number
     * @return {?}
     */
    function (cbn) {
        if (this.getMaxConditionalBranches() >= 0) {
            cbn = Math.min(cbn, this.getMaxConditionalBranches());
        }
        if (cbn < this.conditionalBranches.length) {
            this.conditionalBranches = this.conditionalBranches.slice(0, cbn);
        }
        else if (cbn > this.conditionalBranches.length) {
            for (var i = this.conditionalBranches.length; i < cbn; i++) {
                this.conditionalBranches.push(AjfCondition.alwaysCondition());
            }
        }
    };
    /**
     * this method will get the max xonditional branches of the field
     * @return number
     */
    /**
     * this method will get the max xonditional branches of the field
     * @return {?} number
     */
    AjfNode.prototype.getMaxConditionalBranches = /**
     * this method will get the max xonditional branches of the field
     * @return {?} number
     */
    function () {
        return -1;
    };
    return AjfNode;
}(AjfJsonSerializable));
var AjfFieldNodeLink = /** @class */ (function (_super) {
    __extends(AjfFieldNodeLink, _super);
    function AjfFieldNodeLink() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return AjfFieldNodeLink;
}(AjfNode));
/** @enum {number} */
var AjfFieldType = {
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
var  /**
 * This class will define an ajf node group
 */
AjfNodeGroup = /** @class */ (function (_super) {
    __extends(AjfNodeGroup, _super);
    /**
     * this constructor will assign the obj value to a class variables
     */
    function AjfNodeGroup(obj) {
        var _this = _super.call(this, obj) || this;
        _this.jsonExportedMembers = _this.jsonExportedMembers.concat([
            'formulaReps', 'minReps', 'maxReps', 'nodes'
        ]);
        _this.nodes = obj && obj.nodes || [];
        _this.formulaReps = obj && obj.formulaReps || null;
        _this.maxReps = obj && obj.maxReps || null;
        _this.minReps = obj && obj.minReps || null;
        return _this;
    }
    Object.defineProperty(AjfNodeGroup.prototype, "nodes", {
        get: /**
         * @return {?}
         */
        function () { return this._nodes; },
        set: /**
         * @param {?} nodes
         * @return {?}
         */
        function (nodes) { this._nodes = nodes; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfNodeGroup.prototype, "formulaReps", {
        get: /**
         * @return {?}
         */
        function () { return this._formulaReps; },
        set: /**
         * @param {?} formulaReps
         * @return {?}
         */
        function (formulaReps) { this._formulaReps = formulaReps; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfNodeGroup.prototype, "maxReps", {
        get: /**
         * @return {?}
         */
        function () { return this._maxReps; },
        set: /**
         * @param {?} maxReps
         * @return {?}
         */
        function (maxReps) { this._maxReps = maxReps; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfNodeGroup.prototype, "minReps", {
        get: /**
         * @return {?}
         */
        function () { return this._minReps; },
        set: /**
         * @param {?} minReps
         * @return {?}
         */
        function (minReps) { this._minReps = minReps; },
        enumerable: true,
        configurable: true
    });
    /**
     * this method will load an AjfNodeGroup from json
     * @param obj                : any - object node
     * @param choicesOrigins     : any[] - array of choicesOrigins
     * @param attachmentsOrigins : any[] - array of attachmentsOrigins
     * @return AjfNodeGroup
     */
    /**
     * this method will load an AjfNodeGroup from json
     * @param {?} obj                : any - object node
     * @param {?} choicesOrigins     : any[] - array of choicesOrigins
     * @param {?} attachmentsOrigins : any[] - array of attachmentsOrigins
     * @param {?} context
     * @return {?} AjfNodeGroup
     */
    AjfNodeGroup.fromJson = /**
     * this method will load an AjfNodeGroup from json
     * @param {?} obj                : any - object node
     * @param {?} choicesOrigins     : any[] - array of choicesOrigins
     * @param {?} attachmentsOrigins : any[] - array of attachmentsOrigins
     * @param {?} context
     * @return {?} AjfNodeGroup
     */
    function (obj, choicesOrigins, attachmentsOrigins, context) {
        // array of string:  contains a keys Object
        // example:
        // ["id", "parent", "parentNode", "formulaReps", "nodes"]
        obj = deepCopy(obj);
        if (context) {
            context = deepCopy(context);
        }
        /** @type {?} */
        var keys = Object.keys(obj);
        if (keys.indexOf('nodes') > -1 && obj.nodes instanceof Array) {
            /** @type {?} */
            var nodes = [];
            for (var i = 0; i < obj.nodes.length; i++) {
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
            var cbs = [];
            for (var i = 0; i < obj.conditionalBranches.length; i++) {
                cbs.push(AjfCondition.fromJson(obj.conditionalBranches[i]));
            }
            obj.conditionalBranches = cbs;
        }
        /** @type {?} */
        var ret = new AjfNodeGroup(obj);
        return ret;
    };
    return AjfNodeGroup;
}(AjfNode));
/**
 * Represents a form slide.
 * Slides are specialized node groups used to layout the form.
 * They must be at the root level of the form
 *
 * @export
 */
var  /**
 * Represents a form slide.
 * Slides are specialized node groups used to layout the form.
 * They must be at the root level of the form
 *
 * @export
 */
AjfSlide = /** @class */ (function (_super) {
    __extends(AjfSlide, _super);
    function AjfSlide(obj) {
        var _this = _super.call(this, obj) || this;
        _this.jsonExportedMembers = _this.jsonExportedMembers.concat(['nodes']);
        _this._nodes = obj && obj.nodes || [];
        return _this;
    }
    Object.defineProperty(AjfSlide.prototype, "nodes", {
        get: /**
         * @return {?}
         */
        function () { return this._nodes.slice(0); },
        set: /**
         * @param {?} nodes
         * @return {?}
         */
        function (nodes) { this._nodes = nodes.slice(0); },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} obj
     * @param {?} choicesOrigins
     * @param {?} attachmentsOrigins
     * @param {?} context
     * @return {?}
     */
    AjfSlide.fromJson = /**
     * @param {?} obj
     * @param {?} choicesOrigins
     * @param {?} attachmentsOrigins
     * @param {?} context
     * @return {?}
     */
    function (obj, choicesOrigins, attachmentsOrigins, context) {
        obj = deepCopy(obj);
        if (context) {
            context = deepCopy(context);
        }
        /** @type {?} */
        var keys = Object.keys(obj);
        if (keys.indexOf('visibility') > -1 && obj.visibility != null) {
            obj.visibility = AjfCondition.fromJson(obj.visibility);
        }
        if (keys.indexOf('nodes') > -1 && obj.nodes instanceof Array) {
            /** @type {?} */
            var nodes = [];
            for (var i = 0; i < obj.nodes.length; i++) {
                nodes.push(AjfNode.fromJson(obj.nodes[i], choicesOrigins, attachmentsOrigins));
            }
            obj.nodes = nodes;
        }
        if (keys.indexOf('conditionalBranches') > -1 && obj.conditionalBranches instanceof Array) {
            /** @type {?} */
            var cbs = [];
            for (var i = 0; i < obj.conditionalBranches.length; i++) {
                cbs.push(AjfCondition.fromJson(obj.conditionalBranches[i]));
            }
            obj.conditionalBranches = cbs;
        }
        return new AjfSlide(obj);
    };
    return AjfSlide;
}(AjfNode));
var AjfRepeatingSlide = /** @class */ (function (_super) {
    __extends(AjfRepeatingSlide, _super);
    function AjfRepeatingSlide(obj) {
        var _this = _super.call(this, obj) || this;
        _this.jsonExportedMembers = _this.jsonExportedMembers.concat([
            'nodes', 'formulaReps', 'minReps', 'maxReps'
        ]);
        _this.formulaReps = obj && obj.formulaReps || null;
        _this.nodes = obj && obj.nodes || [];
        _this.minReps = obj && obj.minReps || 1;
        _this.maxReps = obj && obj.maxReps || 0;
        return _this;
    }
    Object.defineProperty(AjfRepeatingSlide.prototype, "formulaReps", {
        get: /**
         * @return {?}
         */
        function () { return this._formulaReps; },
        set: /**
         * @param {?} formulaReps
         * @return {?}
         */
        function (formulaReps) { this._formulaReps = formulaReps; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfRepeatingSlide.prototype, "maxReps", {
        get: /**
         * @return {?}
         */
        function () { return this._maxReps; },
        set: /**
         * @param {?} maxReps
         * @return {?}
         */
        function (maxReps) { this._maxReps = maxReps; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfRepeatingSlide.prototype, "minReps", {
        get: /**
         * @return {?}
         */
        function () { return this._minReps; },
        set: /**
         * @param {?} minReps
         * @return {?}
         */
        function (minReps) { this._minReps = minReps; },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} obj
     * @param {?} choicesOrigins
     * @param {?} attachmentsOrigins
     * @param {?} context
     * @return {?}
     */
    AjfRepeatingSlide.fromJson = /**
     * @param {?} obj
     * @param {?} choicesOrigins
     * @param {?} attachmentsOrigins
     * @param {?} context
     * @return {?}
     */
    function (obj, choicesOrigins, attachmentsOrigins, context) {
        obj = deepCopy(obj);
        if (context) {
            context = deepCopy(context);
        }
        /** @type {?} */
        var keys = Object.keys(obj);
        if (keys.indexOf('visibility') > -1 && obj.visibility != null) {
            obj.visibility = AjfCondition.fromJson(obj.visibility);
        }
        if (keys.indexOf('nodes') > -1 && obj.nodes instanceof Array) {
            /** @type {?} */
            var nodes = [];
            for (var i = 0; i < obj.nodes.length; i++) {
                nodes.push(AjfNode.fromJson(obj.nodes[i], choicesOrigins, attachmentsOrigins));
            }
            obj.nodes = nodes;
        }
        if (keys.indexOf('formulaReps') > -1 && obj.formulaReps != null) {
            obj.formulaReps = AjfFormula.fromJson(obj.formulaReps);
        }
        if (keys.indexOf('conditionalBranches') > -1 && obj.conditionalBranches instanceof Array) {
            /** @type {?} */
            var cbs = [];
            for (var i = 0; i < obj.conditionalBranches.length; i++) {
                cbs.push(AjfCondition.fromJson(obj.conditionalBranches[i]));
            }
            obj.conditionalBranches = cbs;
        }
        return new AjfRepeatingSlide(obj);
    };
    return AjfRepeatingSlide;
}(AjfSlide));
/**
 * This class will define an ajf Field
 * @abstract
 */
var  /**
 * This class will define an ajf Field
 * @abstract
 */
AjfField = /** @class */ (function (_super) {
    __extends(AjfField, _super);
    /**
     * this constructor will assign the obj value to a class variables
     */
    function AjfField(obj) {
        var _this = _super.call(this, obj) || this;
        // a boolean to identify if the field have choices
        _this._hasChoices = false;
        //  a boolean to identify if field has attachments
        _this._hasAttachments = false;
        _this.jsonExportedMembers = _this.jsonExportedMembers.concat([
            'fieldType', 'description',
            'editable', 'formula', 'validation', 'warning', 'hasChoices', 'defaultValue', 'size',
            'nextSlideCondition'
        ]);
        _this._description = obj && obj.description || null;
        _this._formula = obj && obj.formula || null;
        _this._validation = obj && obj.validation || null;
        _this._warning = obj && obj.warning || null;
        _this._attachmentsOrigin = obj && obj.attachmentsOrigin || null;
        _this.defaultValue = obj && obj.defaultValue != null ? obj.defaultValue : null;
        _this._size = obj && obj.size || 'normal';
        _this._nextSlideCondition = obj && obj.nextSlideCondition || null;
        _this.setHasAttachments(_this._attachmentsOrigin && true || false);
        _this._hasChoices = false;
        _this.setEditable();
        return _this;
    }
    Object.defineProperty(AjfField.prototype, "description", {
        /**
         * this method will get the description of the field
         * @return : _description
         */
        get: /**
         * this method will get the description of the field
         * @return {?} : _description
         */
        function () {
            return this._description;
        },
        /**
         * this method will set the description of the field
         * @param description : string - the new description
         */
        set: /**
         * this method will set the description of the field
         * @param {?} description : string - the new description
         * @return {?}
         */
        function (description) {
            this._description = description;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfField.prototype, "editable", {
        /**
         * this method will get the editable status  of the field
         * @return : _editable
         */
        get: /**
         * this method will get the editable status  of the field
         * @return {?} : _editable
         */
        function () {
            return this._editable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfField.prototype, "formula", {
        /**
         * this method will get the formula of the field
         * @return : _formula
         */
        get: /**
         * this method will get the formula of the field
         * @return {?} : _formula
         */
        function () {
            return this._formula;
        },
        set: /**
         * @param {?} formula
         * @return {?}
         */
        function (formula) {
            this._formula = formula;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfField.prototype, "hasChoices", {
        /**
         * this method will get the hasChoices status of the field
         * @return : _hasChoices
         */
        get: /**
         * this method will get the hasChoices status of the field
         * @return {?} : _hasChoices
         */
        function () {
            return this._hasChoices;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfField.prototype, "defaultValue", {
        /**
         * this method will get the default value of the field
         * @return : _defaultValue
         */
        get: /**
         * this method will get the default value of the field
         * @return {?} : _defaultValue
         */
        function () {
            return this._defaultValue;
        },
        /**
         * this method will set the defaultValue of the field
         * @param defaultValue : any - the new defaultValue
         */
        set: /**
         * this method will set the defaultValue of the field
         * @param {?} defaultValue : any - the new defaultValue
         * @return {?}
         */
        function (defaultValue) {
            if (defaultValue == null || this.validateValue(defaultValue)) {
                this._defaultValue = defaultValue;
            }
            else {
                throw new AjfInvalidFieldDefinitionError('The default value is not valid for this field type');
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfField.prototype, "size", {
        get: /**
         * @return {?}
         */
        function () {
            return this._size;
        },
        set: /**
         * @param {?} size
         * @return {?}
         */
        function (size) {
            this._size = size;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfField.prototype, "validation", {
        /**
         * this method will get the validation value of the field
         * @return : _validation
         */
        get: /**
         * this method will get the validation value of the field
         * @return {?} : _validation
         */
        function () {
            return this._validation;
        },
        set: /**
         * @param {?} validation
         * @return {?}
         */
        function (validation) {
            this._validation = validation;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfField.prototype, "warning", {
        /**
         * this method will get the warning value of the field
         * @return : _warning
         */
        get: /**
         * this method will get the warning value of the field
         * @return {?} : _warning
         */
        function () {
            return this._warning;
        },
        set: /**
         * @param {?} warning
         * @return {?}
         */
        function (warning) {
            this._warning = warning;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfField.prototype, "hasAttachments", {
        /**
         * this method will get the hasAttachments status of the field
         * @return : _hasAttachments
         */
        get: /**
         * this method will get the hasAttachments status of the field
         * @return {?} : _hasAttachments
         */
        function () { return this._hasAttachments; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfField.prototype, "attachmentsOrigin", {
        /**
         * this method will get the attachmentsOrigin of the field
         * @return : AjfAttachmentsOrigin
         */
        get: /**
         * this method will get the attachmentsOrigin of the field
         * @return {?} : AjfAttachmentsOrigin
         */
        function () {
            return this.hasAttachments && this._attachmentsOrigin || null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfField.prototype, "attachments", {
        /**
         * this method will get the attachments of the field
         * @return : any the attachments
         */
        get: /**
         * this method will get the attachments of the field
         * @return {?} : any the attachments
         */
        function () {
            return this.hasAttachments &&
                this._attachmentsOrigin.getAttachments() || [];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfField.prototype, "nextSlideCondition", {
        get: /**
         * @return {?}
         */
        function () {
            return this._nextSlideCondition;
        },
        set: /**
         * @param {?} condition
         * @return {?}
         */
        function (condition) {
            this._nextSlideCondition = condition;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfField.prototype, "nextSlide", {
        get: /**
         * @return {?}
         */
        function () {
            return this._nextSlide;
        },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            this._nextSlide = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfField.prototype, "fieldType", {
        /**
         * this method will get the field type
         * @return : AjfFieldType
         */
        get: /**
         * this method will get the field type
         * @return {?} : AjfFieldType
         */
        function () {
            /** @type {?} */
            var thisObj = this;
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfField.prototype, "nodeType", {
        /**
         * this method will get the node type of the field
         * @return : AjfFieldType
         */
        get: /**
         * this method will get the node type of the field
         * @return {?} : AjfFieldType
         */
        function () { return AjfNodeType.AjfField; },
        enumerable: true,
        configurable: true
    });
    /**
     * this method will create new field
     * @return : ajfField
     */
    /**
     * this method will create new field
     * @param {?} fieldType
     * @param {?=} obj
     * @return {?} : ajfField
     */
    AjfField.create = /**
     * this method will create new field
     * @param {?} fieldType
     * @param {?=} obj
     * @return {?} : ajfField
     */
    function (fieldType, obj) {
        /** @type {?} */
        var ret;
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
    };
    /**
     * this method will load an AjfField from json
     * @param obj                : any - object node
     * @param choicesOrigins     : any[] - array of choicesOrigins
     * @param attachmentsOrigins : any[] - array of attachmentsOrigins
     * @return AjfNode
     */
    /**
     * this method will load an AjfField from json
     * @param {?} obj                : any - object node
     * @param {?} choicesOrigins     : any[] - array of choicesOrigins
     * @param {?} attachmentsOrigins : any[] - array of attachmentsOrigins
     * @param {?} context
     * @return {?} AjfNode
     */
    AjfField.fromJson = /**
     * this method will load an AjfField from json
     * @param {?} obj                : any - object node
     * @param {?} choicesOrigins     : any[] - array of choicesOrigins
     * @param {?} attachmentsOrigins : any[] - array of attachmentsOrigins
     * @param {?} context
     * @return {?} AjfNode
     */
    function (obj, choicesOrigins, attachmentsOrigins, context) {
        // array of string: contains a keys object
        // example:
        // ["id", "name", "label", "visibility", "hasChoices", "parent",
        // "parentNode", "conditionalBranches", "fieldType", "nodes"]
        obj = deepCopy(obj);
        if (context) {
            context = deepCopy(context);
        }
        /** @type {?} */
        var keys = Object.keys(obj);
        if (keys.indexOf('fieldType') === -1) {
            throw new Error('Field type missing type');
        }
        /** @type {?} */
        var fieldType = obj.fieldType;
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
            var origins = choicesOrigins.filter((/**
             * @param {?} x
             * @return {?}
             */
            function (x) { return x.getName() === obj.choicesOriginRef; }));
            obj.choicesOrigin = origins.length > 0 ? origins[0] : null;
        }
        if (keys.indexOf('attachmentsOriginRef') > -1) {
            /** @type {?} */
            var origins = attachmentsOrigins.filter((/**
             * @param {?} x
             * @return {?}
             */
            function (x) { return x.getName() === obj.attachmentsOriginRef; }));
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
            function (t) {
                return AjfCondition.fromJson(t);
            }));
        }
        if (keys.indexOf('nodes') > -1 && obj.nodes instanceof Array) {
            /** @type {?} */
            var nodes = [];
            for (var i = 0; i < obj.nodes.length; i++) {
                /** @type {?} */
                var childNode = obj.nodes[i];
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
            var cbs = [];
            for (var i = 0; i < obj.conditionalBranches.length; i++) {
                cbs.push(AjfCondition.fromJson(obj.conditionalBranches[i]));
            }
            obj.conditionalBranches = cbs;
        }
        return AjfField.create(fieldType, obj);
    };
    /**
     * this method will set the editable value of the field
     * @param editable : boolean
     */
    /**
     * this method will set the editable value of the field
     * @protected
     * @param {?=} editable : boolean
     * @return {?}
     */
    AjfField.prototype.setEditable = /**
     * this method will set the editable value of the field
     * @protected
     * @param {?=} editable : boolean
     * @return {?}
     */
    function (editable) {
        if (editable === void 0) { editable = true; }
        this._editable = editable;
    };
    /**
     * this method will set the HasChoices value of the field
     * @param hasChoices : boolean
     */
    /**
     * this method will set the HasChoices value of the field
     * @protected
     * @param {?} hasChoices : boolean
     * @return {?}
     */
    AjfField.prototype.setHasChoices = /**
     * this method will set the HasChoices value of the field
     * @protected
     * @param {?} hasChoices : boolean
     * @return {?}
     */
    function (hasChoices) {
        this._hasChoices = hasChoices;
    };
    /**
     * this method will set the hasAttachments value of the field
     * @param hasAttachments : boolean
     */
    /**
     * this method will set the hasAttachments value of the field
     * @protected
     * @param {?} hasAttachments : boolean
     * @return {?}
     */
    AjfField.prototype.setHasAttachments = /**
     * this method will set the hasAttachments value of the field
     * @protected
     * @param {?} hasAttachments : boolean
     * @return {?}
     */
    function (hasAttachments) {
        this._hasAttachments = hasAttachments;
    };
    return AjfField;
}(AjfNode));
/**
 * This class will define an ajf empty field
 */
var  /**
 * This class will define an ajf empty field
 */
AjfEmptyField = /** @class */ (function (_super) {
    __extends(AjfEmptyField, _super);
    function AjfEmptyField(obj) {
        var _this = _super.call(this, obj) || this;
        _this.jsonExportedMembers = _this.jsonExportedMembers.concat([
            'HTML'
        ]);
        _this.HTML = obj && obj.HTML || null;
        return _this;
    }
    /**
     * @param {?} _
     * @return {?}
     */
    AjfEmptyField.prototype.validateValue = /**
     * @param {?} _
     * @return {?}
     */
    function (_) {
        return true;
    };
    return AjfEmptyField;
}(AjfField));
/**
 * This class will define an ajf string field
 */
var  /**
 * This class will define an ajf string field
 */
AjfStringField = /** @class */ (function (_super) {
    __extends(AjfStringField, _super);
    function AjfStringField() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    AjfStringField.prototype.validateValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return value === value.toString();
    };
    return AjfStringField;
}(AjfField));
/**
 * This class will define an ajf text field
 */
var  /**
 * This class will define an ajf text field
 */
AjfTextField = /** @class */ (function (_super) {
    __extends(AjfTextField, _super);
    function AjfTextField() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return AjfTextField;
}(AjfStringField));
/**
 * This class will define an ajf number field
 */
var  /**
 * This class will define an ajf number field
 */
AjfNumberField = /** @class */ (function (_super) {
    __extends(AjfNumberField, _super);
    function AjfNumberField() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    AjfNumberField.prototype.validateValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return value === parseInt(value, 10) || value === parseFloat(value);
    };
    return AjfNumberField;
}(AjfField));
/**
 * This class will define an ajf boolean field
 */
var  /**
 * This class will define an ajf boolean field
 */
AjfBooleanField = /** @class */ (function (_super) {
    __extends(AjfBooleanField, _super);
    function AjfBooleanField() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    AjfBooleanField.prototype.validateValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return value === !!value;
    };
    /**
     * @return {?}
     */
    AjfBooleanField.prototype.getMaxConditionalBranches = /**
     * @return {?}
     */
    function () {
        return 2;
    };
    return AjfBooleanField;
}(AjfField));
/**
 * This class will define an ajf field with choices
 */
var  /**
 * This class will define an ajf field with choices
 */
AjfFieldWithChoices = /** @class */ (function (_super) {
    __extends(AjfFieldWithChoices, _super);
    function AjfFieldWithChoices(obj) {
        var _this = _super.call(this, obj) || this;
        _this.jsonExportedMembers = _this.jsonExportedMembers
            .concat([
            'choicesOriginRef', 'choicesFilter',
            'forceExpanded', 'forceNarrow', 'triggerConditions'
        ]);
        _this.choicesOrigin = obj && obj.choicesOrigin || null;
        _this.choicesFilter = obj && obj.choicesFilter || null;
        _this.forceExpanded = obj && obj.forceExpanded || false;
        _this.forceNarrow = obj && obj.forceNarrow || false;
        _this.triggerConditions = obj && obj.triggerConditions || null;
        _this.setHasChoices(true);
        return _this;
    }
    Object.defineProperty(AjfFieldWithChoices.prototype, "choices", {
        get: /**
         * @return {?}
         */
        function () {
            return this.choicesOrigin && this.choicesOrigin.getChoices() || [];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFieldWithChoices.prototype, "choicesOriginRef", {
        get: /**
         * @return {?}
         */
        function () {
            return this.choicesOrigin.getName();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} _
     * @return {?}
     */
    AjfFieldWithChoices.prototype.validateValue = /**
     * @param {?} _
     * @return {?}
     */
    function (_) {
        return true;
    };
    return AjfFieldWithChoices;
}(AjfField));
/**
 * This class will define an ajf field with SingleChoice
 */
var  /**
 * This class will define an ajf field with SingleChoice
 */
AjfSingleChoiceField = /** @class */ (function (_super) {
    __extends(AjfSingleChoiceField, _super);
    function AjfSingleChoiceField(obj) {
        return _super.call(this, obj) || this;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    AjfSingleChoiceField.prototype.validateValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return value == null || this.choices.filter((/**
         * @param {?} x
         * @return {?}
         */
        function (x) { return x === value; })).length > 0;
    };
    /**
     * @return {?}
     */
    AjfSingleChoiceField.prototype.getMaxConditionalBranches = /**
     * @return {?}
     */
    function () {
        return Math.max(1, this.choices.length + 1);
    };
    return AjfSingleChoiceField;
}(AjfFieldWithChoices));
/**
 * This class will define an ajf field with MultipleChoice
 */
var  /**
 * This class will define an ajf field with MultipleChoice
 */
AjfMultipleChoiceField = /** @class */ (function (_super) {
    __extends(AjfMultipleChoiceField, _super);
    function AjfMultipleChoiceField(obj) {
        var _this = this;
        /** @type {?} */
        var defaultValue = obj && obj.defaultValue || [];
        obj = __assign({}, obj || {}, { defaultValue: defaultValue });
        _this = _super.call(this, obj) || this;
        return _this;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    AjfMultipleChoiceField.prototype.validateValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (value instanceof Array) {
            /** @type {?} */
            var i = 0;
            /** @type {?} */
            var l = value.length;
            /** @type {?} */
            var good = true;
            while (good && i < l) {
                good = _super.prototype.validateValue.call(this, value[i++]);
            }
            return good;
        }
        else {
            return _super.prototype.validateValue.call(this, value);
        }
    };
    /**
     * @return {?}
     */
    AjfMultipleChoiceField.prototype.getMaxConditionalBranches = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var total = 0;
        /** @type {?} */
        var l = this.choices.length;
        /** @type {?} */
        var f = [1];
        for (var i = 1; i <= l; i++) {
            f.push(factorial(i));
        }
        for (var i = 1; i <= l; i++) {
            total += f[l] / (f[i] * f[l - i]);
        }
        return total;
    };
    return AjfMultipleChoiceField;
}(AjfSingleChoiceField));
/**
 * This class will define an formula field
 */
var  /**
 * This class will define an formula field
 */
AjfFormulaField = /** @class */ (function (_super) {
    __extends(AjfFormulaField, _super);
    function AjfFormulaField(obj) {
        var _this = _super.call(this, obj) || this;
        _this.setEditable(false);
        return _this;
    }
    return AjfFormulaField;
}(AjfNumberField));
/**
 * This class will define an ajf date field
 */
var  /**
 * This class will define an ajf date field
 */
AjfDateField = /** @class */ (function (_super) {
    __extends(AjfDateField, _super);
    function AjfDateField(obj) {
        var _this = _super.call(this, obj) || this;
        _this.jsonExportedMembers = _this.jsonExportedMembers
            .concat(['maxDate', 'minDate']);
        _this.minDate = obj && obj.minDate || null;
        _this.maxDate = obj && obj.maxDate || null;
        _this.minDateValue = _this.minDate === 'today' ? new Date() : (/** @type {?} */ (_this.minDate));
        _this.maxDateValue = _this.maxDate === 'today' ? new Date() : (/** @type {?} */ (_this.maxDate));
        return _this;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    AjfDateField.prototype.validateValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return value === value.toString();
    };
    return AjfDateField;
}(AjfField));
var AjfDateInputField = /** @class */ (function (_super) {
    __extends(AjfDateInputField, _super);
    function AjfDateInputField(obj) {
        return _super.call(this, obj) || this;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    AjfDateInputField.prototype.validateValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return value === value.toString();
    };
    return AjfDateInputField;
}(AjfField));
var AjfTimeField = /** @class */ (function (_super) {
    __extends(AjfTimeField, _super);
    function AjfTimeField(obj) {
        var _this = _super.call(this, obj) || this;
        _this.jsonExportedMembers = _this.jsonExportedMembers
            .concat([]);
        return _this;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    AjfTimeField.prototype.validateValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return value === value.toString();
    };
    return AjfTimeField;
}(AjfField));
var AjfTableField = /** @class */ (function (_super) {
    __extends(AjfTableField, _super);
    function AjfTableField(obj) {
        var _this = _super.call(this, obj) || this;
        _this.columnLabels = [];
        _this.rowLabels = [];
        _this.hideEmptyRows = false;
        _this.setEditable(obj && obj.editable || false);
        _this.jsonExportedMembers = _this.jsonExportedMembers.concat(['rows', 'columnLabels', 'rowLabels']);
        _this.rows = obj && obj.rows || [];
        _this.columnLabels = obj && obj.columnLabels || [];
        _this.rowLabels = obj && obj.rowLabels || [];
        _this.hideEmptyRows = obj && obj.hideEmptyRows || false;
        return _this;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    AjfTableField.prototype.validateValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) { return value === value.toString(); };
    return AjfTableField;
}(AjfField));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} type
 * @return {?}
 */
function fieldIconName(type) {
    return "ajf-icon-field-" + AjfFieldType[type].toLowerCase();
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var FieldIconPipe = /** @class */ (function () {
    function FieldIconPipe() {
    }
    /**
     * @param {?} field
     * @return {?}
     */
    FieldIconPipe.prototype.transform = /**
     * @param {?} field
     * @return {?}
     */
    function (field) {
        return fieldIconName(field instanceof AjfField ? field.fieldType : field);
    };
    FieldIconPipe.decorators = [
        { type: Pipe, args: [{ name: 'fieldIcon' },] },
    ];
    return FieldIconPipe;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AjfNodeInstance = /** @class */ (function () {
    function AjfNodeInstance(params, _context) {
        this._updatedEvt = new EventEmitter();
        this._updated = this._updatedEvt.asObservable();
        this._node = params.node;
        this._prefix = params.prefix != null ? params.prefix.slice(0) : [];
        this._visible = params.visible != null ? params.visible : true;
    }
    Object.defineProperty(AjfNodeInstance.prototype, "updated", {
        get: /**
         * @return {?}
         */
        function () { return this._updated; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfNodeInstance.prototype, "node", {
        get: /**
         * @return {?}
         */
        function () { return this._node; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfNodeInstance.prototype, "prefix", {
        get: /**
         * @return {?}
         */
        function () { return this._prefix.slice(0); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfNodeInstance.prototype, "visible", {
        get: /**
         * @return {?}
         */
        function () { return this._visible; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfNodeInstance.prototype, "suffix", {
        get: /**
         * @return {?}
         */
        function () {
            if (this.prefix == null || this.prefix.length == 0) {
                return '';
            }
            return "__" + this.prefix.join('__');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfNodeInstance.prototype, "completeName", {
        /**
         * this method will get the complete name of the field
         * @return : string
         */
        get: /**
         * this method will get the complete name of the field
         * @return {?} : string
         */
        function () {
            return "" + this.node.name + this.suffix;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @protected
     * @param {?} node
     * @return {?}
     */
    AjfNodeInstance.prototype.setNode = /**
     * @protected
     * @param {?} node
     * @return {?}
     */
    function (node) { this._node = node; };
    /**
     * @return {?}
     */
    AjfNodeInstance.prototype.triggerUpdate = /**
     * @return {?}
     */
    function () {
        this._updatedEvt.emit();
    };
    /**
     * Update nodes visibility based on context value.
     * Returns true if the visibility has changes
     *
     * @param context Context value
     * @param branchVisibility
     *
     * @memberOf AjfNodeInstance
     */
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
    AjfNodeInstance.prototype.updateVisibility = /**
     * Update nodes visibility based on context value.
     * Returns true if the visibility has changes
     *
     * \@memberOf AjfNodeInstance
     * @param {?} context Context value
     * @param {?=} branchVisibility
     *
     * @return {?}
     */
    function (context, branchVisibility) {
        if (branchVisibility === void 0) { branchVisibility = true; }
        if (this.visibility == null) {
            return false;
        }
        /** @type {?} */
        var visibility = this.visibility;
        /** @type {?} */
        var oldVisibility = this.visible;
        /** @type {?} */
        var newVisibility = branchVisibility && visibility.evaluate(context);
        if (newVisibility !== this.visible) {
            this._visible = newVisibility;
        }
        return oldVisibility !== newVisibility;
    };
    /**
     * @param {?} context
     * @return {?}
     */
    AjfNodeInstance.prototype.updateConditionalBranches = /**
     * @param {?} context
     * @return {?}
     */
    function (context) {
        /** @type {?} */
        var conditionalBranches = this.conditionalBranches;
        if (conditionalBranches != null) {
            /** @type {?} */
            var oldBranch = this.verifiedBranch;
            /** @type {?} */
            var idx = 0;
            /** @type {?} */
            var found = false;
            while (idx < conditionalBranches.length && !found) {
                /** @type {?} */
                var verified = conditionalBranches[idx].evaluate(context);
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
    };
    return AjfNodeInstance;
}());
var AjfFieldInstance = /** @class */ (function (_super) {
    __extends(AjfFieldInstance, _super);
    function AjfFieldInstance(params, context) {
        var _this = _super.call(this, params, context) || this;
        // number of repetitions
        _this.reps = 0;
        // an array of AjfValidationResult
        _this._validationResults = [];
        // an array of AjfWarningResult
        _this._warningResults = [];
        _this._defaultValue = null;
        _this._triggerWarning = new ReplaySubject(1);
        if (_this.node != null && context != null) {
            if (context[_this.node.name] != null) {
                _this.value = context[_this.node.name];
            }
            else if (context[_this.completeName] != null) {
                _this.value = context[_this.completeName];
            }
            else {
                _this.value = null;
            }
        }
        /** @type {?} */
        var defVal = ((/** @type {?} */ (_this.node))).defaultValue;
        _this._defaultValue = _this.node && defVal != null ? defVal : null;
        return _this;
    }
    Object.defineProperty(AjfFieldInstance.prototype, "field", {
        get: /**
         * @return {?}
         */
        function () { return (/** @type {?} */ (this.node)); },
        set: /**
         * @param {?} field
         * @return {?}
         */
        function (field) { this.setNode(field); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFieldInstance.prototype, "value", {
        // the value of field
        get: 
        // the value of field
        /**
         * @return {?}
         */
        function () { return this._value != null && this._value || this._defaultValue; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this._value = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFieldInstance.prototype, "triggerWarning", {
        get: /**
         * @return {?}
         */
        function () { return this._triggerWarning.asObservable(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFieldInstance.prototype, "validationResults", {
        /**
         * this method will get the validationResults value of the field
         * @return : _validationResults
         */
        get: /**
         * this method will get the validationResults value of the field
         * @return {?} : _validationResults
         */
        function () {
            return this._validationResults;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFieldInstance.prototype, "warningResults", {
        /**
         * this method will get the warningResults value of the field
         * @return : _warningResults
         */
        get: /**
         * this method will get the warningResults value of the field
         * @return {?} : _warningResults
         */
        function () {
            return this._warningResults;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} context
     * @return {?}
     */
    AjfFieldInstance.prototype.updateFormula = /**
     * @param {?} context
     * @return {?}
     */
    function (context) {
        /** @type {?} */
        var formula = this.formula;
        /** @type {?} */
        var editable = this.field.editable;
        if (formula != null && this.visible && (!editable || (editable && this.value == null))) {
            /** @type {?} */
            var newValue = formula.evaluate(context);
            /** @type {?} */
            var oldValue = this.value;
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
    };
    /**
     * @private
     * @param {?} context
     * @param {?} supplementaryInformations
     * @return {?}
     */
    AjfFieldInstance.prototype._makeSupplementaryContext = /**
     * @private
     * @param {?} context
     * @param {?} supplementaryInformations
     * @return {?}
     */
    function (context, supplementaryInformations) {
        Object.keys(supplementaryInformations).forEach((/**
         * @param {?} key
         * @return {?}
         */
        function (key) {
            context["__supplementary__" + key + "__"] = supplementaryInformations[key];
        }));
        return context;
    };
    /**
     * @param {?} context
     * @param {?=} supplementaryInformations
     * @return {?}
     */
    AjfFieldInstance.prototype.updateValidation = /**
     * @param {?} context
     * @param {?=} supplementaryInformations
     * @return {?}
     */
    function (context, supplementaryInformations) {
        /** @type {?} */
        var validation = this.validation;
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
            function (prev, x) { return prev && x.result; }), true);
        }
        else {
            this.valid = true;
        }
    };
    /**
     * @param {?} context
     * @return {?}
     */
    AjfFieldInstance.prototype.updateWarning = /**
     * @param {?} context
     * @return {?}
     */
    function (context) {
        /** @type {?} */
        var warning = this.warning;
        if (context[this.completeName] != null && warning) {
            this._warningResults = warning.evaluate(context);
        }
    };
    /**
     * @param {?} context
     * @return {?}
     */
    AjfFieldInstance.prototype.updateNextSlideCondition = /**
     * @param {?} context
     * @return {?}
     */
    function (context) {
        if (this.nextSlideCondition != null) {
            return this.nextSlideCondition.evaluate(context);
        }
        return false;
    };
    /**
     * this method will update the state of the field
     * @param   context         : any - the context of the field to update
     * @param   branchVisibility: boolean
     */
    /**
     * this method will update the state of the field
     * @param {?} context         : any - the context of the field to update
     * @param {?=} branchVisibility
     * @return {?}
     */
    AjfFieldInstance.prototype.updateFieldState = /**
     * this method will update the state of the field
     * @param {?} context         : any - the context of the field to update
     * @param {?=} branchVisibility
     * @return {?}
     */
    function (context, branchVisibility) {
        if (branchVisibility === void 0) { branchVisibility = true; }
        this.updateVisibility(context, branchVisibility);
        this.updateConditionalBranches(context);
        this.updateFormula(context);
        this.updateValidation(context);
        this.updateWarning(context);
        this.updateNextSlideCondition(context);
    };
    /**
     * @return {?}
     */
    AjfFieldInstance.prototype.emitTriggerWarning = /**
     * @return {?}
     */
    function () {
        this._triggerWarning.next();
    };
    return AjfFieldInstance;
}(AjfNodeInstance));
var AjfFieldWithChoicesInstance = /** @class */ (function (_super) {
    __extends(AjfFieldWithChoicesInstance, _super);
    function AjfFieldWithChoicesInstance(params, context) {
        var _this = _super.call(this, params, context) || this;
        _this._triggerSelection = new ReplaySubject(1);
        _this._firstTriggerConditionDone = {};
        _this.filteredChoices = _this.field.choices.slice(0);
        return _this;
    }
    Object.defineProperty(AjfFieldWithChoicesInstance.prototype, "field", {
        get: /**
         * @return {?}
         */
        function () { return (/** @type {?} */ (this.node)); },
        set: /**
         * @param {?} field
         * @return {?}
         */
        function (field) { this.setNode(field); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFieldWithChoicesInstance.prototype, "triggerSelection", {
        get: /**
         * @return {?}
         */
        function () { return this._triggerSelection.asObservable(); },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} context
     * @return {?}
     */
    AjfFieldWithChoicesInstance.prototype.updateFilteredChoices = /**
     * @param {?} context
     * @return {?}
     */
    function (context) {
        var _this = this;
        if (this.choicesFilter != null) {
            this.filteredChoices = this.field.choicesOrigin
                .getChoices()
                .filter((/**
             * @param {?} c
             * @return {?}
             */
            function (c) {
                context.$choiceValue = c.value;
                return _this.choicesFilter.evaluate(context);
            }));
        }
        else {
            this.filteredChoices = this.field.choicesOrigin
                .getChoices();
        }
    };
    /**
     * @param {?} context
     * @return {?}
     */
    AjfFieldWithChoicesInstance.prototype.updateTriggerConditions = /**
     * @param {?} context
     * @return {?}
     */
    function (context) {
        if (this._firstTriggerConditionDone[this.completeName]) {
            return false;
        }
        /** @type {?} */
        var found = false;
        /** @type {?} */
        var conditionsNum = this.triggerConditions.length;
        for (var i = 0; i < conditionsNum; i++) {
            if (this.triggerConditions[i].evaluate(context)) {
                found = true;
                break;
            }
        }
        this._firstTriggerConditionDone[this.completeName] = found;
        return found;
    };
    /**
     * @return {?}
     */
    AjfFieldWithChoicesInstance.prototype.emitTriggerSelection = /**
     * @return {?}
     */
    function () {
        this._triggerSelection.next(null);
    };
    return AjfFieldWithChoicesInstance;
}(AjfFieldInstance));
var AjfNodeGroupInstance = /** @class */ (function (_super) {
    __extends(AjfNodeGroupInstance, _super);
    function AjfNodeGroupInstance(params, context) {
        return _super.call(this, params, context) || this;
    }
    Object.defineProperty(AjfNodeGroupInstance.prototype, "reps", {
        get: /**
         * @return {?}
         */
        function () { return this._reps; },
        set: /**
         * @param {?} reps
         * @return {?}
         */
        function (reps) {
            this._reps = reps;
            this._repsArr = new Array(reps);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfNodeGroupInstance.prototype, "repsArr", {
        get: /**
         * @return {?}
         */
        function () { return this._repsArr; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfNodeGroupInstance.prototype, "valid", {
        get: /**
         * @return {?}
         */
        function () {
            return this.nodes.map((/**
             * @param {?} n
             * @return {?}
             */
            function (n) {
                if (Object.keys(n).indexOf('valid') > -1) {
                    return ((/** @type {?} */ (n))).valid;
                }
                return true;
            })).reduce((/**
             * @param {?} v1
             * @param {?} v2
             * @return {?}
             */
            function (v1, v2) { return v1 && v2; }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfNodeGroupInstance.prototype, "nodeGroup", {
        get: /**
         * @return {?}
         */
        function () { return (/** @type {?} */ (this.node)); },
        enumerable: true,
        configurable: true
    });
    /**
     * @protected
     * @param {?} nodeGroup
     * @return {?}
     */
    AjfNodeGroupInstance.prototype.setNodeGroup = /**
     * @protected
     * @param {?} nodeGroup
     * @return {?}
     */
    function (nodeGroup) { this.setNode(nodeGroup); };
    /**
     * @param {?} context
     * @return {?}
     */
    AjfNodeGroupInstance.prototype.updateRepsNum = /**
     * @param {?} context
     * @return {?}
     */
    function (context) {
        /** @type {?} */
        var oldReps = this.reps || 0;
        if (this.nodeGroup.formulaReps == null) {
            /** @type {?} */
            var ctxReps = context[this.completeName];
            if (ctxReps != null) {
                this.reps = ctxReps;
            }
            else if (oldReps == 0) {
                this.reps = 1;
            }
        }
        else {
            /** @type {?} */
            var newReps = this.nodeGroup.formulaReps.evaluate(context);
            if (newReps !== oldReps) {
                this.reps = newReps;
            }
        }
        return oldReps;
    };
    return AjfNodeGroupInstance;
}(AjfNodeInstance));
var AjfSlideInstance = /** @class */ (function (_super) {
    __extends(AjfSlideInstance, _super);
    function AjfSlideInstance() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.nodes = [];
        _this.flatNodes = [];
        return _this;
    }
    Object.defineProperty(AjfSlideInstance.prototype, "valid", {
        get: /**
         * @return {?}
         */
        function () {
            return this.flatNodes.map((/**
             * @param {?} n
             * @return {?}
             */
            function (n) {
                if (n.visible && Object.keys(n).indexOf('valid') > -1) {
                    return ((/** @type {?} */ (n))).valid;
                }
                return true;
            })).reduce((/**
             * @param {?} v1
             * @param {?} v2
             * @return {?}
             */
            function (v1, v2) { return v1 && v2; }), true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfSlideInstance.prototype, "slide", {
        get: /**
         * @return {?}
         */
        function () { return (/** @type {?} */ (this.node)); },
        enumerable: true,
        configurable: true
    });
    /**
     * @protected
     * @param {?} slide
     * @return {?}
     */
    AjfSlideInstance.prototype.setSlide = /**
     * @protected
     * @param {?} slide
     * @return {?}
     */
    function (slide) { this.setNode(slide); };
    return AjfSlideInstance;
}(AjfNodeInstance));
var AjfRepeatingSlideInstance = /** @class */ (function (_super) {
    __extends(AjfRepeatingSlideInstance, _super);
    function AjfRepeatingSlideInstance(params, context) {
        return _super.call(this, params, context) || this;
    }
    Object.defineProperty(AjfRepeatingSlideInstance.prototype, "reps", {
        get: /**
         * @return {?}
         */
        function () { return this._reps; },
        set: /**
         * @param {?} reps
         * @return {?}
         */
        function (reps) {
            this._reps = reps;
            this.canRemoveGroup = this.slide.minReps === 0 || reps > this.slide.minReps;
            this.canAddGroup = this.slide.maxReps === 0 || reps < this.slide.maxReps;
            this._repsArr = new Array(reps);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfRepeatingSlideInstance.prototype, "repsArr", {
        get: /**
         * @return {?}
         */
        function () { return this._repsArr; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfRepeatingSlideInstance.prototype, "slide", {
        get: /**
         * @return {?}
         */
        function () { return (/** @type {?} */ (this.node)); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfRepeatingSlideInstance.prototype, "nodesPerSlide", {
        get: /**
         * @return {?}
         */
        function () {
            return this.nodes != null ? this.nodes.length / this.reps : 0;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @protected
     * @param {?} slide
     * @return {?}
     */
    AjfRepeatingSlideInstance.prototype.setSlide = /**
     * @protected
     * @param {?} slide
     * @return {?}
     */
    function (slide) { this.setNode(slide); };
    /**
     * @param {?} idx
     * @return {?}
     */
    AjfRepeatingSlideInstance.prototype.validSlide = /**
     * @param {?} idx
     * @return {?}
     */
    function (idx) {
        if (idx >= this.slideNodes.length) {
            return true;
        }
        return this.slideNodes[idx]
            .map((/**
         * @param {?} n
         * @return {?}
         */
        function (n) {
            if (n.visible && Object.keys(n).indexOf('valid') > -1) {
                return ((/** @type {?} */ (n))).valid;
            }
            return true;
        })).reduce((/**
         * @param {?} v1
         * @param {?} v2
         * @return {?}
         */
        function (v1, v2) { return v1 && v2; }), true);
    };
    /**
     * @param {?} idx
     * @return {?}
     */
    AjfRepeatingSlideInstance.prototype.slidePosition = /**
     * @param {?} idx
     * @return {?}
     */
    function (idx) {
        return this.position + idx;
    };
    /**
     * @param {?} context
     * @return {?}
     */
    AjfRepeatingSlideInstance.prototype.updateRepsNum = /**
     * @param {?} context
     * @return {?}
     */
    function (context) {
        /** @type {?} */
        var oldReps = this.reps || 0;
        if (this.slide.formulaReps == null) {
            /** @type {?} */
            var ctxReps = context[this.completeName];
            if (ctxReps != null) {
                this.reps = ctxReps;
            }
            else if (oldReps == 0) {
                this.reps = 1;
            }
        }
        else {
            /** @type {?} */
            var newReps = this.slide.formulaReps.evaluate(context);
            if (newReps !== oldReps) {
                this.reps = newReps;
            }
        }
        return oldReps;
    };
    return AjfRepeatingSlideInstance;
}(AjfSlideInstance));
var AjfTableFieldInstance = /** @class */ (function (_super) {
    __extends(AjfTableFieldInstance, _super);
    function AjfTableFieldInstance(params, context) {
        var _this = _super.call(this, params, context) || this;
        _this._context = {};
        _this.setValue(context);
        _this._hideEmptyRows = ((/** @type {?} */ (_this.node))).hideEmptyRows;
        return _this;
    }
    Object.defineProperty(AjfTableFieldInstance.prototype, "hideEmptyRows", {
        get: /**
         * @return {?}
         */
        function () {
            return this._hideEmptyRows;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfTableFieldInstance.prototype, "controls", {
        get: /**
         * @return {?}
         */
        function () {
            return this._matrixFormControl;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            this._matrixFormControl = v;
            this._matrixFormControlWithLabels = this._controlsWithLabels();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfTableFieldInstance.prototype, "controlsWithLabels", {
        get: /**
         * @return {?}
         */
        function () {
            return this._matrixFormControlWithLabels;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     * @return {?}
     */
    AjfTableFieldInstance.prototype._controlsWithLabels = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var node = (/** @type {?} */ (this.node));
        /** @type {?} */
        var ret = [];
        /** @type {?} */
        var i = 0;
        for (var _i = 0, _a = (/** @type {?} */ ((node.rowLabels))); _i < _a.length; _i++) {
            var rowLabel = _a[_i];
            ret.push([rowLabel].concat((/** @type {?} */ (this._matrixFormControl[i]))));
            i = i + 1;
        }
        ret.unshift([node.label].concat(node.columnLabels));
        return ret;
    };
    Object.defineProperty(AjfTableFieldInstance.prototype, "value", {
        get: /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var node = (/** @type {?} */ (this.node));
            if (node.editable) {
                return this._matrixFormControl;
            }
            return this._matrixValue;
        },
        set: /**
         * @param {?} _v
         * @return {?}
         */
        function (_v) { },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfTableFieldInstance.prototype, "context", {
        get: /**
         * @return {?}
         */
        function () {
            return this._context;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} context
     * @return {?}
     */
    AjfTableFieldInstance.prototype.setValue = /**
     * @param {?} context
     * @return {?}
     */
    function (context) {
        var _this = this;
        /** @type {?} */
        var node = (/** @type {?} */ (this.node));
        if (!node.editable) {
            /** @type {?} */
            var value_1 = [];
            /** @type {?} */
            var rowIndex_1 = 0;
            node.rows.forEach((/**
             * @param {?} row
             * @return {?}
             */
            function (row) {
                row.forEach((/**
                 * @param {?} k
                 * @return {?}
                 */
                function (k) {
                    _this._context[k] = context[k];
                }));
                value_1[rowIndex_1] = [node.rowLabels[rowIndex_1]]
                    .concat(row.map((/**
                 * @param {?} k
                 * @return {?}
                 */
                function (k) { return context[k]; })));
                rowIndex_1 += 1;
            }));
            value_1.unshift([node.label].concat(node.columnLabels));
            this._matrixValue = value_1;
        }
        else {
            this._context = context;
        }
    };
    Object.defineProperty(AjfTableFieldInstance.prototype, "visibleColumns", {
        get: /**
         * @return {?}
         */
        function () {
            if (this.hideEmptyRows) {
                return this.value
                    .filter((/**
                 * @param {?} column
                 * @return {?}
                 */
                function (column) {
                    return column
                        .slice(1)
                        .reduce((/**
                     * @param {?} a
                     * @param {?} b
                     * @return {?}
                     */
                    function (a, b) {
                        return a || (b != null && b !== '' && b !== 0 && b !== '0');
                    }), false);
                }));
            }
            return this.value;
        },
        enumerable: true,
        configurable: true
    });
    return AjfTableFieldInstance;
}(AjfFieldInstance));
var AjfDateFieldInstance = /** @class */ (function (_super) {
    __extends(AjfDateFieldInstance, _super);
    function AjfDateFieldInstance() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(AjfDateFieldInstance.prototype, "field", {
        get: /**
         * @return {?}
         */
        function () { return this.field; },
        set: /**
         * @param {?} field
         * @return {?}
         */
        function (field) { this.setNode(field); },
        enumerable: true,
        configurable: true
    });
    return AjfDateFieldInstance;
}(AjfFieldInstance));
var AjfEmptyFieldInstance = /** @class */ (function (_super) {
    __extends(AjfEmptyFieldInstance, _super);
    function AjfEmptyFieldInstance() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(AjfEmptyFieldInstance.prototype, "field", {
        get: /**
         * @return {?}
         */
        function () { return this.field; },
        set: /**
         * @param {?} field
         * @return {?}
         */
        function (field) { this.setNode(field); },
        enumerable: true,
        configurable: true
    });
    return AjfEmptyFieldInstance;
}(AjfFieldInstance));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AjfFormFieldValueChanged = /** @class */ (function () {
    function AjfFormFieldValueChanged() {
    }
    return AjfFormFieldValueChanged;
}());
/**
 * @abstract
 */
var  /**
 * @abstract
 */
AjfFormField = /** @class */ (function () {
    /**
     * this constructor will init _rendererService _changeDetectionRef _alertCtrl
     * and init the messagesWarning subscription
     */
    function AjfFormField(_rendererService, _changeDetectionRef) {
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
    Object.defineProperty(AjfFormField.prototype, "fieldInstance", {
        get: /**
         * @return {?}
         */
        function () { return this._fieldInstance; },
        set: /**
         * @param {?} fieldInstance
         * @return {?}
         */
        function (fieldInstance) {
            var _this = this;
            this._fieldInstance = fieldInstance;
            this._fieldUpdateSubscription.unsubscribe();
            this._fieldUpdateSubscription = fieldInstance.updated.subscribe((/**
             * @return {?}
             */
            function () {
                if (_this._changeDetectionRef) {
                    try {
                        _this._changeDetectionRef.detectChanges();
                    }
                    catch (e) { }
                }
            }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFormField.prototype, "fwcInst", {
        get: /**
         * @return {?}
         */
        function () {
            return (/** @type {?} */ (this._fieldInstance));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFormField.prototype, "fwc", {
        get: /**
         * @return {?}
         */
        function () { return (/** @type {?} */ (this._fieldInstance.field)); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFormField.prototype, "datefInst", {
        get: /**
         * @return {?}
         */
        function () { return (/** @type {?} */ (this._fieldInstance)); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFormField.prototype, "tablefInst", {
        get: /**
         * @return {?}
         */
        function () { return (/** @type {?} */ (this._fieldInstance)); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFormField.prototype, "emptyfInst", {
        get: /**
         * @return {?}
         */
        function () { return (/** @type {?} */ (this._fieldInstance)); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFormField.prototype, "valueChanged", {
        // this @output expose the value changed like an observable
        get: 
        // this @output expose the value changed like an observable
        /**
         * @return {?}
         */
        function () {
            return this._valueChanged.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * this method will init the control, the filtere choices and the change
     * detection reference
     */
    /**
     * this method will init the control, the filtere choices and the change
     * detection reference
     * @return {?}
     */
    AjfFormField.prototype.ngOnInit = /**
     * this method will init the control, the filtere choices and the change
     * detection reference
     * @return {?}
     */
    function () {
        var _this = this;
        this.control = this._rendererService.getControl(this.fieldInstance);
        this._triggerWarningSubscription = this.fieldInstance.triggerWarning
            .pipe(withLatestFrom(this.control), filter((/**
         * @param {?} v
         * @return {?}
         */
        function (v) { return v[1] != null; })))
            .subscribe((/**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            /** @type {?} */
            var control = v[1];
            /** @type {?} */
            var s = _this.showWarningAlertPrompt(_this.fieldInstance.warningResults.filter((/**
             * @param {?} w
             * @return {?}
             */
            function (w) { return w.result; })).map((/**
             * @param {?} w
             * @return {?}
             */
            function (w) { return w.warning; }))).subscribe((/**
             * @param {?} r
             * @return {?}
             */
            function (r) {
                if (r.result) {
                    (/** @type {?} */ (control)).setValue(null);
                }
            }), (/**
             * @param {?} _e
             * @return {?}
             */
            function (_e) { if (s) {
                s.unsubscribe();
            } }), (/**
             * @return {?}
             */
            function () { if (s) {
                s.unsubscribe();
            } }));
        }));
    };
    /**
     * @return {?}
     */
    AjfFormField.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.fieldInstance instanceof AjfFieldWithChoicesInstance) {
            this._triggerSelectionSubscription = this.fieldInstance.triggerSelection
                .subscribe((/**
             * @return {?}
             */
            function () {
                _this._triggerSelection();
            }));
        }
    };
    /**
     * @return {?}
     */
    AjfFormField.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._triggerSelectionSubscription.unsubscribe();
        this._triggerWarningSubscription.unsubscribe();
        this._fieldUpdateSubscription.unsubscribe();
    };
    /**
     * @private
     * @return {?}
     */
    AjfFormField.prototype._triggerSelection = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.singleChoiceSelect != null && !this.singleChoiceSelect._isOpen) {
            this.singleChoiceSelect.open();
        }
        else if (this.multipleChoiceSelect != null &&
            !this.multipleChoiceSelect._isOpen) {
            this.multipleChoiceSelect.open();
        }
    };
    return AjfFormField;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} nodes
 * @param {?} parent
 * @return {?}
 */
function orderedNodes(nodes, parent) {
    /** @type {?} */
    var newNodes = [];
    nodes.filter((/**
     * @param {?} n
     * @return {?}
     */
    function (n) { return n.parent == parent; }))
        .sort((/**
     * @param {?} n1
     * @param {?} n2
     * @return {?}
     */
    function (n1, n2) { return n1.parentNode - n2.parentNode; }))
        .forEach((/**
     * @param {?} n
     * @return {?}
     */
    function (n) {
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
    var flatNodes = [];
    nodes.forEach((/**
     * @param {?} node
     * @return {?}
     */
    function (node) {
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
function flattenNodesInstances(nodes, includeGroups) {
    if (includeGroups === void 0) { includeGroups = false; }
    /** @type {?} */
    var flatNodes = [];
    nodes.forEach((/**
     * @param {?} nodeInstance
     * @return {?}
     */
    function (nodeInstance) {
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
    var nodeGroups = [];
    /** @type {?} */
    var curParent = node.parent;
    while (curParent != null) {
        node = ((/** @type {?} */ (allNodes))).find((/**
         * @param {?} n
         * @return {?}
         */
        function (n) {
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
    var names = {};
    getAncestorRepeatingNodes(allNodes, node)
        .forEach((/**
     * @param {?} n
     * @param {?} idx
     * @return {?}
     */
    function (n, idx) {
        (((/** @type {?} */ (n))).nodes || [])
            .forEach((/**
         * @param {?} sn
         * @return {?}
         */
        function (sn) {
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
    var flatTree = [];
    nodes
        .forEach((/**
     * @param {?} nodeInstance
     * @return {?}
     */
    function (nodeInstance) {
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
    var ancestorsNameStrings = Object.keys(ancestorsNames);
    /** @type {?} */
    var tokens = tokenize(formula)
        .filter((/**
     * @param {?} token
     * @return {?}
     */
    function (token) { return token.type == 'Identifier' && token.value != '$value'; }))
        .map((/**
     * @param {?} token
     * @return {?}
     */
    function (token) { return token.value; }));
    tokens.forEach((/**
     * @param {?} t
     * @return {?}
     */
    function (t) {
        if (ancestorsNameStrings.indexOf(t) > -1) {
            formula = formula.replace(new RegExp("\\b" + t + "\\b", 'g'), t + "__" + prefix.slice(ancestorsNames[t]).join('__'));
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
    var oldCondition = condition.condition;
    /** @type {?} */
    var newCondition = normalizeFormula(oldCondition, ancestorsNames, prefix);
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
    var oldFormula = formula.formula;
    /** @type {?} */
    var newFormula = normalizeFormula(oldFormula, ancestorsNames, prefix);
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
    var changed = false;
    /** @type {?} */
    var newConditions = conditions.map((/**
     * @param {?} condition
     * @return {?}
     */
    function (condition) {
        /** @type {?} */
        var newCondition = getInstanceCondition(condition, ancestorsNames, prefix);
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
    var oldValidation = validation.condition;
    /** @type {?} */
    var newValidation = normalizeFormula(oldValidation, ancestorsNames, prefix);
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
    var changed = false;
    /** @type {?} */
    var newValidations = validations.map((/**
     * @param {?} validation
     * @return {?}
     */
    function (validation) {
        /** @type {?} */
        var newValidation = getInstanceValidation(validation, ancestorsNames, prefix);
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
    var oldWarning = warning.condition;
    /** @type {?} */
    var newWarning = normalizeFormula(oldWarning, ancestorsNames, prefix);
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
    var changed = false;
    /** @type {?} */
    var newWarnings = warnings.map((/**
     * @param {?} warning
     * @return {?}
     */
    function (warning) {
        /** @type {?} */
        var newWarning = getInstanceWarning(warning, ancestorsNames, prefix);
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
    var instance = null;
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
        var hasPrefix = prefix != null && prefix.length > 0;
        if (hasPrefix) {
            /** @type {?} */
            var ancestorsNames = getAncestorRepeatingNodesNames(allNodes, node);
            if (node.visibility != null) {
                /** @type {?} */
                var oldVisibility = node.visibility.condition;
                /** @type {?} */
                var newVisibility = normalizeFormula(oldVisibility, ancestorsNames, prefix);
                instance.visibility = newVisibility !== oldVisibility ? new AjfCondition({
                    condition: newVisibility
                }) : node.visibility;
            }
            instance.conditionalBranches = getInstanceConditions(instance.node.conditionalBranches, ancestorsNames, prefix);
            if (instance instanceof AjfNodeGroupInstance || instance instanceof AjfRepeatingSlideInstance) {
                /** @type {?} */
                var formulaReps = instance instanceof AjfNodeGroupInstance ?
                    instance.nodeGroup.formulaReps :
                    instance.slide.formulaReps;
                if (formulaReps != null) {
                    /** @type {?} */
                    var oldFormula = formulaReps.formula;
                    /** @type {?} */
                    var newFormula = normalizeFormula(oldFormula, ancestorsNames, prefix);
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
                    var newConditions = getInstanceValidations(instance.field.validation.conditions, ancestorsNames, prefix);
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
                    var newWarnings = getInstanceWarnings(instance.field.warning.conditions, ancestorsNames, prefix);
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
    var index = nodes.indexOf(node);
    if (index > -1) {
        return { container: nodes, index: index };
    }
    /** @type {?} */
    var groups = nodes.filter((/**
     * @param {?} n
     * @return {?}
     */
    function (n) { return isContainerNodeInstance(n); }));
    /** @type {?} */
    var i = 0;
    /** @type {?} */
    var len = groups.length;
    while (i < len) {
        /** @type {?} */
        var res = findNodeInstanceInTree(((/** @type {?} */ (groups[i]))).node.nodes, node);
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
function flattenNodeInstances(nodes) {
    if (nodes === void 0) { nodes = []; }
    /** @type {?} */
    var flatNodes = [];
    nodes.forEach((/**
     * @param {?} nodeInstance
     * @return {?}
     */
    function (nodeInstance) {
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
var AjfValidationService = /** @class */ (function () {
    function AjfValidationService() {
        this._baseUtilFunctions = [
            "/**\n        * count the number of digit contained on x.\n        * @param  x the value used for digit count\n        * @return the count of the digit\n      */\n    var digitCount = function(x) { return x.toString().length; }",
            "/**\n        * count the number of decimal contained on x.\n        * @param  x the value used for decimal count\n        * @return the count of the decimal\n      */\n    var decimalCount = function(x) {\n      return (parseFloat(x).toString().split('.')[1] || []).length;\n    }",
            "/**\n        * check if x is integer\n        * @param  x the value used for check\n        * @return true if x is a number\n      */\n    var isInt = function(x) { return !/[,.]/.test(x); }",
            "/**\n        * check if x is not empity\n        * @param  x the value used for check\n        * @return true if x defined and not null and the number of digit is > 0\n      */\n    var notEmpty = function (x) {\n      return (typeof x !== 'undefined' && x !== null ? x.toString().length > 0 : false);\n    }",
            "/**\n        * check if x is contained on array\n        * @param  x the value used for check\n        * @return the position of x on array or if array === x\n      */\n    var valueInChoice = function(array, x) { return array.indexOf(x) > -1 || array === x; }",
            "var scanGroupField = function(reps, acc, callback) {\n        for (var i = 0; i < reps; i++) {\n            acc = callback(acc, i);\n        }\n        return acc;\n    }",
            "/**\n        * sum the value contained on array\n        * @param  x the array\n        * @return the sum\n      */\n    var sum = function(array) {return array.reduce(function(a, b){ return a + b; }, 0); }",
            "var dateOperations = function(dString, period, operation, v) {\n        fmt = 'MM/DD/YYYY';\n        var d = (typeof dString !== 'undefined') ? dateUtils.parse(dString) : new Date();\n        if (operation == 'remove') {\n          v = -v;\n        }\n        var dateOp;\n        switch (period) {\n          case 'day':\n            dateOp = dateUtils.addDays;\n            break;\n          case 'month':\n            dateOp = dateUtils.addMonths;\n            break;\n          case 'year':\n            dateOp = dateUtils.addYears;\n            break;\n          default:\n            return -1;\n        }\n        return dateUtils.format(dateOp(d, v), fmt);\n      }",
            "/**\n        * round the num\n        * @param  num the value to round\n        * @param  digits how many digit\n        * @return num rounded\n      */\n      var round = function(num, digits) {\n        digits = digits || 0;\n        var f = 0;\n        try { f = parseFloat(num); } catch (e) { }\n        var m = Math.pow(10, digits);\n        return Math.round(f * m) / m;\n      }",
            "/**\n        * extract the property of the source object with property != null\n        * @param  source array of object wich contains property\n        * @param  property the property on wich we want filter\n        * @return array of dates\n      */\n      var extractArray = function(source, property, property2) {\n        source = (source || []).slice(0);\n        var l = source.length;\n        var res = [];\n        for (var i = 0; i < l ; i++) {\n          if (source[i][property] != null && source[i][property2] != null) {\n            res.push(source[i][property] + source[i][property2]);\n          }\n          else if (source[i][property] != null) {\n            res.push(source[i][property]);\n          }\n        }\n        return res;\n      }",
            "/**\n        * extract the property of the source object with property != null\n        * @param  source array of object wich contains property\n        * @param  propertues string array the properties to sum\n        * @return the sum\n      */\n      var extractSum = function(source, properties) {\n        var sum = 0;\n        properties = (properties || []).slice(0);\n        var l = properties.length;\n\n        for (var i = 0; i < l ; i++) {\n          var array = extractArray(source, properties[i]);\n          var leng = array.length;\n          for(var j = 0; j < leng; i++) {\n            sum += array[j];\n          }\n        }\n        return sum;\n      }",
            "/**\n        * extract the array of sum for each week != null\n        * @param  source array of object wich contains property\n        * @param  propertues string array the properties to sum\n        * @return the sum\n      */\n      var extractArraySum = function(source, properties) {\n        var arrays = [];\n        properties = (properties || []).slice(0);\n\n        for (var propI = 0; propI < properties.length ; propI++) {\n          var array = extractArray(source, properties[propI]);\n          arrays.push(array);\n        }\n\n        var res = [];\n        for (var weekI = 0; weekI < array.length; weekI ++ ) {\n          var sum = 0;\n          for (var propI = 0; propI < properties.length ; propI++) {\n            sum = sum + arrays[propI][weekI]\n          }\n          res.push(sum);\n        }\n        return res;\n      }",
            "/**\n        * draw a threshold line on chart related to the property\n        * @param  source array of object wich contains property\n        * @param  property the property on wich we want filter\n        * @return array of dates\n      */\n      var drawThreshold = function(source, property, treshold) {\n        source = (source || []).slice(0);\n        var l = source.length;\n        var res = [];\n        for (var i = 0; i < l ; i++) {\n          if (source[i][property] != null) {\n            res.push(treshold);\n          }\n        }\n        return res;\n      }",
            "/**\n        * extract the dates of the source object with property != null\n        * @param  source array of object wich contains property and date_start\n        * @param  property the property on wich we want to calculate dates\n        * @param  format the format of the date\n        * @return array of dates\n      */\n      var extractDates = function(source, property, format) {\n        source = (source || []).slice(0);\n        var l = source.length;\n        var res = [];\n        var prefix = '';\n        for (var i = 0; i < l ; i++) {\n          if (source[i][property] != null) {\n            switch(format) {\n              case \"WW\":\n                prefix = \"W\";\n                break;\n              case \"MM\":\n                prefix = \"M\";\n                break;\n              default:\n                prefix = \"\";\n            }\n            res.push(prefix + formatDate(source[i][\"date_start\"], format));\n          }\n        }\n        return res;\n      }",
            "/**\n        * extract the last property contains in source != null\n        * @param  source array of object wich contains property and date_start\n        * @param  property the property to find\n        * @return the last property != null\n      */\n      var lastProperty = function(source, property) {\n        source = (source || []).slice(0);\n        var l = source.length -1;\n\n        while (l >= 0 && source[l][property] == null) {\n          l--;\n          if (l < 0) return 0;\n        }\n        return l >= 0 ? source[l][property] : 0;\n      }",
            "var sumLastProperties = function(source, properties) {\n        source = (source || []).slice(0);\n        var sum = 0;\n        for (var i = 0; i < properties.length; i++) {\n          sum += lastProperty(source, properties[i]);\n        }\n\n        return sum;\n      }",
            "/**\n        * compute the trend of the property contained on the source.\n        * @param  source array of object wich contains property\n        * @param  property the property on wich we want to calculate the trend\n        * @return an html icon that identifies the trend\n      */\n      var calculateTrendProperty = function(source, property) {\n        source = (source || []).slice(0);\n        var last = source.length - 1;\n        while (source[last][property] == null) {\n          if (last == 0) {\n            break;\n          }\n          last--;\n        }\n        var lastLast = last - 1;\n        if (last == 0) {\n          lastLast = last;\n        } else {\n          while (source[lastLast][property] == null) {\n            if (lastLast == 0) {\n              lastLast = last;\n              break;\n            }\n            lastLast--;\n          }\n        }\n\n        var lastProperty = source[last]?(source[last][property] || 0): 0;\n        var lastLastProperty = source[lastLast]?(source[lastLast][property] || 0): 0;\n\n        if (lastProperty == lastLastProperty) {\n          return '<p><i class=\"material-icons\" style=\"color:blue\">trending_flat</i></p>';\n        } else if (lastProperty > lastLastProperty) {\n          return '<p><i class=\"material-icons\" style=\"color:green\">trending_up</i></p>';\n        } else {\n          return '<p><i class=\"material-icons\" style=\"color:red\">trending_down</i></p>';\n        }\n      }",
            "/**\n        * compute the average value of the property contained on the source.\n        * @param  source array of object wich contains property\n        * @param  property the property on wich we want to calculate the average\n        * @param  range the range on wich we want to calculate the average\n        * @param  coefficent the coefficent used for calculate the treshold\n                  if coefficent is 0 mean return the count of property > 0\n        * @return the average value || the count of property > 0\n      */\n      var calculateAvgProperty = function(source, property, range, coefficient) {\n        source = (source || []).slice(0);\n\n        source.pop();\n\n        coefficient = coefficient || 1;\n        range = range || 12;\n\n        var l = source.length;\n        var res = 0;\n        var counter = 0;\n        var noZero = 0;\n\n        if(l < range) {\n          range = l;\n        }\n\n        while (range != 0) {\n          counter++;\n          if (source[l - 1][property] != null) {\n            res += source[l - 1][property];\n\n            if (source[l - 1][property] > 0) {\n              noZero++;\n            }\n          }\n          l--;\n          range--;\n        }\n\n        if (coefficient == 0) {\n          return noZero;\n        } else {\n          var treshold = (res/counter)*coefficient || 0;\n          return treshold;\n        }\n      }",
            "var alert = function(source, property, treshold, fmt) {\n        source = (source || []).slice(0);\n        var l = source.length;\n\n        if ( lastProperty(source, property)  > treshold ) {\n          return '<p><i class=\"material-icons\" style=\"color:red\">warning</i></p>';\n          } else {\n            return '<p></p>';\n          }\n      }",
            "var formatNumber = function(num, fmt) {\n        fmt = fmt || '0,0[.]0';\n        return numeral(num).format(fmt);\n      }",
            "var formatDate = function(date, fmt) {\n        fmt = fmt || 'MM-DD-YYYY';\n        return dateUtils.format(date, fmt);\n      }",
            "var isoMonth = function(date, fmt) {\n        fmt = fmt || 'MM';\n        var du = dateUtils;\n        return du.format(du.addDays(du.startOfMonth(date), 4),fmt)\n      }",
            "var nextCounterValue = function(counterName, firstValue) {\n        firstValue = firstValue != null ? firstValue : 0;\n        if (execContext['$$'+counterName] == null) {\n          execContext['$$'+counterName] = firstValue;\n        } else {\n          execContext['$$'+counterName]++;\n        }\n        return execContext['$$'+counterName];\n      }",
            "var getCoordinate = function(source, zoom) {\n        zoom = zoom || 6;\n        if(source == null) {\n          return [51.505,-0.09, zoom];\n        } else {\n          return [source[0], source[1], zoom];\n        }\n      }"
        ];
        this._functions = [];
        this._functionsStr = '';
        this._initFunctions();
    }
    /**
     * @param {?} f
     * @return {?}
     */
    AjfValidationService.prototype.addFunction = /**
     * @param {?} f
     * @return {?}
     */
    function (f) {
        this._functions.push(f);
        this._initFunctions();
    };
    /**
     * @param {?} name
     * @param {?} fn
     * @return {?}
     */
    AjfValidationService.prototype.addFunctionHandler = /**
     * @param {?} name
     * @param {?} fn
     * @return {?}
     */
    function (name, fn) {
        if (AjfValidatedProperty.utils[name] === undefined) {
            AjfValidatedProperty.utils[name] = { fn: fn };
        }
    };
    /**
     * @private
     * @return {?}
     */
    AjfValidationService.prototype._initFunctions = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var functionsStr = this._functions
            .map((/**
         * @param {?} f
         * @return {?}
         */
        function (f) { return typeof f === 'string' ? f : f.toString(); }))
            .join('; ');
        this._functionsStr = this._baseUtilFunctions.join('; ') + "; " + functionsStr;
        AjfValidatedProperty.UTIL_FUNCTIONS = this._functionsStr;
    };
    AjfValidationService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    AjfValidationService.ctorParameters = function () { return []; };
    return AjfValidationService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {number} */
var AjfFormInitStatus = {
    Initializing: 0,
    Complete: 1,
};
AjfFormInitStatus[AjfFormInitStatus.Initializing] = 'Initializing';
AjfFormInitStatus[AjfFormInitStatus.Complete] = 'Complete';
var AjfFormRendererService = /** @class */ (function () {
    function AjfFormRendererService(_) {
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
    Object.defineProperty(AjfFormRendererService.prototype, "nodesTree", {
        get: /**
         * @return {?}
         */
        function () { return this._flatNodesTree; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFormRendererService.prototype, "errorPositions", {
        get: /**
         * @return {?}
         */
        function () { return this._errorPositions; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFormRendererService.prototype, "errors", {
        get: /**
         * @return {?}
         */
        function () { return this._errors; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFormRendererService.prototype, "currentSupplementaryInformations", {
        get: /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var form = this._form.getValue();
            return form != null && form.form != null ? form.form.supplementaryInformations : null;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} form
     * @param {?=} context
     * @return {?}
     */
    AjfFormRendererService.prototype.setForm = /**
     * @param {?} form
     * @param {?=} context
     * @return {?}
     */
    function (form, context) {
        if (context === void 0) { context = {}; }
        this._initUpdateMapStreams();
        if (form != null && Object.keys(context).length === 0 &&
            Object.keys(form.initContext).length > 0) {
            context = form.initContext;
        }
        /** @type {?} */
        var currentForm = this._form.getValue();
        if ((currentForm == null && form != null) ||
            (currentForm != null && form !== currentForm.form)) {
            this._form.next({ form: form, context: context });
        }
    };
    /**
     * @return {?}
     */
    AjfFormRendererService.prototype.getFormValue = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var formGroup = this._formGroup.getValue();
        if (formGroup == null) {
            return {};
        }
        /** @type {?} */
        var res = deepCopy(formGroup.value);
        return res;
    };
    /**
     * @param {?} group
     * @return {?}
     */
    AjfFormRendererService.prototype.addGroup = /**
     * @param {?} group
     * @return {?}
     */
    function (group) {
        var _this = this;
        return new Observable((/**
         * @param {?} subscriber
         * @return {?}
         */
        function (subscriber) {
            if (group.formulaReps != null) {
                subscriber.next(false);
                subscriber.complete();
                return;
            }
            /** @type {?} */
            var maxReps = group instanceof AjfNodeGroupInstance ?
                group.nodeGroup.maxReps : group.slide.maxReps;
            if (maxReps > 0 && group.reps + 1 > maxReps) {
                subscriber.next(false);
                subscriber.complete();
                return;
            }
            /** @type {?} */
            var oldReps = group.reps;
            group.reps = group.reps + 1;
            _this._nodesUpdates.next((/**
             * @param {?} nodes
             * @return {?}
             */
            function (nodes) {
                /** @type {?} */
                var flatNodes = flattenNodesInstances(nodes, true);
                _this._adjustReps(flatNodes, group, oldReps, _this.getFormValue());
                subscriber.next(true);
                subscriber.complete();
                return nodes;
            }));
        }));
    };
    /**
     * @param {?} group
     * @return {?}
     */
    AjfFormRendererService.prototype.removeGroup = /**
     * @param {?} group
     * @return {?}
     */
    function (group) {
        var _this = this;
        return new Observable((/**
         * @param {?} subscriber
         * @return {?}
         */
        function (subscriber) {
            if (group.formulaReps != null) {
                subscriber.next(false);
                subscriber.complete();
                return;
            }
            /** @type {?} */
            var minReps = group instanceof AjfNodeGroupInstance ?
                group.nodeGroup.minReps : group.slide.minReps;
            if (group.reps - 1 < minReps) {
                subscriber.next(false);
                subscriber.complete();
                return;
            }
            /** @type {?} */
            var oldReps = group.reps;
            group.reps = group.reps - 1;
            _this._nodesUpdates.next((/**
             * @param {?} nodes
             * @return {?}
             */
            function (nodes) {
                _this._adjustReps(nodes, group, oldReps, _this.getFormValue());
                subscriber.next(true);
                subscriber.complete();
                return nodes;
            }));
        }));
    };
    /**
     * @param {?} field
     * @return {?}
     */
    AjfFormRendererService.prototype.getControl = /**
     * @param {?} field
     * @return {?}
     */
    function (field) {
        return this.formGroup.pipe(map((/**
         * @param {?} f
         * @return {?}
         */
        function (f) {
            /** @type {?} */
            var fieldName = field.completeName;
            return f != null && f.contains(fieldName) ? f.controls[fieldName] : null;
        })));
    };
    /**
     * @private
     * @return {?}
     */
    AjfFormRendererService.prototype._initErrorsStreams = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this._errorPositions = this._valueChanged.pipe(withLatestFrom(this._nodes, this._form), filter((/**
         * @param {?} v
         * @return {?}
         */
        function (v) { return v[2] != null && v[2].form != null; })), map((/**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            /** @type {?} */
            var nodes = v[1];
            /** @type {?} */
            var form = (/** @type {?} */ ((/** @type {?} */ (v[2])).form));
            /** @type {?} */
            var currentPosition = 0;
            /** @type {?} */
            var errors = [];
            nodes.forEach((/**
             * @param {?} node
             * @return {?}
             */
            function (node) {
                if (node instanceof AjfRepeatingSlideInstance) {
                    for (var i = 0; i < node.reps; i++) {
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
            _this._slidesNum.next(currentPosition);
            return errors;
        })), publishReplay(), refCount());
        this._errors = this._errorPositions.pipe(map((/**
         * @param {?} e
         * @return {?}
         */
        function (e) { return e != null ? e.length : 0; })), startWith(0), publishReplay(), refCount());
    };
    /**
     * @private
     * @return {?}
     */
    AjfFormRendererService.prototype._initUpdateMapStreams = /**
     * @private
     * @return {?}
     */
    function () {
        this._visibilityNodesMap =
            ((/** @type {?} */ (this._visibilityNodesMapUpdates))).pipe(scan((/**
             * @param {?} rmap
             * @param {?} op
             * @return {?}
             */
            function (rmap, op) {
                return op(rmap);
            }), {}), startWith({}), share());
        this._repetitionNodesMap =
            ((/** @type {?} */ (this._repetitionNodesMapUpdates))).pipe(scan((/**
             * @param {?} rmap
             * @param {?} op
             * @return {?}
             */
            function (rmap, op) {
                return op(rmap);
            }), {}), startWith({}), share());
        this._conditionalBranchNodesMap =
            ((/** @type {?} */ (this._conditionalBranchNodesMapUpdates))).pipe(scan((/**
             * @param {?} rmap
             * @param {?} op
             * @return {?}
             */
            function (rmap, op) {
                return op(rmap);
            }), {}), startWith({}), share());
        this._formulaNodesMap =
            ((/** @type {?} */ (this._formulaNodesMapUpdates))).pipe(scan((/**
             * @param {?} rmap
             * @param {?} op
             * @return {?}
             */
            function (rmap, op) {
                return op(rmap);
            }), {}), startWith({}), share());
        this._validationNodesMap =
            ((/** @type {?} */ (this._validationNodesMapUpdates))).pipe(scan((/**
             * @param {?} rmap
             * @param {?} op
             * @return {?}
             */
            function (rmap, op) {
                return op(rmap);
            }), {}), startWith({}), share());
        this._warningNodesMap =
            ((/** @type {?} */ (this._warningNodesMapUpdates))).pipe(scan((/**
             * @param {?} rmap
             * @param {?} op
             * @return {?}
             */
            function (rmap, op) {
                return op(rmap);
            }), {}), startWith({}), share());
        this._filteredChoicesNodesMap =
            ((/** @type {?} */ (this._filteredChoicesNodesMapUpdates))).pipe(scan((/**
             * @param {?} rmap
             * @param {?} op
             * @return {?}
             */
            function (rmap, op) {
                return op(rmap);
            }), {}), startWith({}), share());
        this._triggerConditionsNodesMap =
            ((/** @type {?} */ (this._triggerConditionsNodesMapUpdates)))
                .pipe(scan((/**
             * @param {?} rmap
             * @param {?} op
             * @return {?}
             */
            function (rmap, op) {
                return op(rmap);
            }), {}), startWith({}), share());
        this._nextSlideConditionsNodesMap =
            ((/** @type {?} */ (this._nextSlideConditionsNodesMapUpdates))).pipe(scan((/**
             * @param {?} rmap
             * @param {?} op
             * @return {?}
             */
            function (rmap, op) {
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
    };
    /**
     * @private
     * @return {?}
     */
    AjfFormRendererService.prototype._initFormStreams = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var formObs = (/** @type {?} */ (this._form));
        formObs
            .pipe(map((/**
         * @param {?} _form
         * @return {?}
         */
        function (_form) {
            return _this._initFormGroupStreams(new FormGroup({}));
        })))
            .subscribe(this._formGroup);
        formObs
            .pipe(map((/**
         * @param {?} form
         * @return {?}
         */
        function (form) {
            return (/**
             * @param {?} _nodesInstances
             * @return {?}
             */
            function (_nodesInstances) {
                /** @type {?} */
                var nodes = form != null && form.form != null ?
                    _this._orderedNodesInstancesTree(flattenNodes(form.form.nodes), form.form.nodes, undefined, [], form.context) : [];
                /** @type {?} */
                var currentPosition = 0;
                nodes.forEach((/**
                 * @param {?} node
                 * @return {?}
                 */
                function (node) {
                    if (node instanceof AjfRepeatingSlideInstance) {
                        for (var i = 0; i < node.reps; i++) {
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
    };
    /**
     * @private
     * @param {?} allNodes
     * @param {?} node
     * @param {?} prefix
     * @param {?} context
     * @param {?=} branchVisibility
     * @return {?}
     */
    AjfFormRendererService.prototype._initNodeInstance = /**
     * @private
     * @param {?} allNodes
     * @param {?} node
     * @param {?} prefix
     * @param {?} context
     * @param {?=} branchVisibility
     * @return {?}
     */
    function (allNodes, node, prefix, context, branchVisibility) {
        if (branchVisibility === void 0) { branchVisibility = true; }
        /** @type {?} */
        var instance = nodeToNodeInstance(allNodes, node, prefix, context);
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
    };
    /**
     * @private
     * @param {?} allNodes
     * @param {?} instance
     * @param {?} oldReps
     * @param {?} context
     * @return {?}
     */
    AjfFormRendererService.prototype._adjustReps = /**
     * @private
     * @param {?} allNodes
     * @param {?} instance
     * @param {?} oldReps
     * @param {?} context
     * @return {?}
     */
    function (allNodes, instance, oldReps, context) {
        var _this = this;
        /** @type {?} */
        var newReps = instance.reps;
        /** @type {?} */
        var result = {
            added: null,
            removed: null
        };
        if (oldReps < newReps) {
            /** @type {?} */
            var newNodes_1 = [];
            if (instance.nodes == null) {
                instance.nodes = [];
            }
            if (instance instanceof AjfNodeGroupInstance) {
                /** @type {?} */
                var node = new AjfEmptyField({
                    'label': instance.node.label
                });
                /** @type {?} */
                var newInstance = this._initNodeInstance(allNodes, node, instance.prefix.slice(0), context);
                if (newInstance != null) {
                    instance.nodes.push(newInstance);
                }
            }
            var _loop_1 = function (i) {
                /** @type {?} */
                var prefix = instance.prefix.slice(0);
                /** @type {?} */
                var group = instance instanceof AjfNodeGroupInstance ?
                    instance.nodeGroup : instance.slide;
                prefix.push(i);
                orderedNodes(group.nodes, instance.node.id)
                    .forEach((/**
                 * @param {?} n
                 * @return {?}
                 */
                function (n) {
                    /** @type {?} */
                    var newInstance = _this._initNodeInstance(allNodes, n, prefix, context);
                    if (newInstance != null) {
                        newNodes_1.push(newInstance);
                        instance.nodes.push(newInstance);
                    }
                }));
                this_1._addNodeInstance(instance);
            };
            var this_1 = this;
            for (var i = oldReps; i < newReps; i++) {
                _loop_1(i);
            }
            result.added = newNodes_1;
        }
        else if (oldReps > newReps) {
            /** @type {?} */
            var nodesNum = instance.nodes.length / oldReps;
            if (instance instanceof AjfNodeGroupInstance) {
                nodesNum++;
            }
            result.removed = instance.nodes.splice(newReps * nodesNum, nodesNum);
            result.removed.forEach(((/**
             * @param {?} n
             * @return {?}
             */
            function (n) {
                _this._removeNodeInstance(n);
            })));
        }
        if (oldReps != newReps && instance.formulaReps == null) {
            /** @type {?} */
            var fg = this._formGroup.getValue();
            if (fg != null && fg.contains(instance.completeName)) {
                fg.controls[instance.completeName].setValue(instance.reps);
            }
        }
        instance.flatNodes = flattenNodesInstances(instance.nodes);
        if (instance instanceof AjfRepeatingSlideInstance) {
            /** @type {?} */
            var slideNodes = [];
            /** @type {?} */
            var nodesPerSlide = instance.nodesPerSlide;
            for (var i = 0; i < instance.reps; i++) {
                /** @type {?} */
                var startNode = i * nodesPerSlide;
                slideNodes.push(instance.nodes.slice(startNode, startNode + nodesPerSlide));
            }
            instance.slideNodes = slideNodes;
        }
        return result;
    };
    /**
     * @private
     * @return {?}
     */
    AjfFormRendererService.prototype._updateFormValueAndValidity = /**
     * @private
     * @return {?}
     */
    function () {
        this._nodesUpdates.asObservable()
            .pipe(withLatestFrom(this._formGroup), filter((/**
         * @param {?} values
         * @return {?}
         */
        function (values) { return values[1] !== null; })))
            .subscribe((/**
         * @param {?} values
         * @return {?}
         */
        function (values) {
            /** @type {?} */
            var form = (/** @type {?} */ (values[1]));
            form.updateValueAndValidity();
        }));
    };
    /**
     * @private
     * @param {?} allNodes
     * @param {?} instance
     * @param {?} context
     * @return {?}
     */
    AjfFormRendererService.prototype._explodeRepeatingNode = /**
     * @private
     * @param {?} allNodes
     * @param {?} instance
     * @param {?} context
     * @return {?}
     */
    function (allNodes, instance, context) {
        /** @type {?} */
        var oldReps = instance.updateRepsNum(context);
        if (oldReps !== instance.reps) {
            this._adjustReps(allNodes, instance, oldReps, context);
        }
    };
    /**
     * @private
     * @param {?} allNodes
     * @param {?} nodes
     * @param {?=} parent
     * @param {?=} prefix
     * @param {?=} context
     * @return {?}
     */
    AjfFormRendererService.prototype._orderedNodesInstancesTree = /**
     * @private
     * @param {?} allNodes
     * @param {?} nodes
     * @param {?=} parent
     * @param {?=} prefix
     * @param {?=} context
     * @return {?}
     */
    function (allNodes, nodes, parent, prefix, context) {
        var _this = this;
        if (parent === void 0) { parent = null; }
        if (prefix === void 0) { prefix = []; }
        /** @type {?} */
        var nodesInstances = [];
        /** @type {?} */
        var curSuffix = prefix.length > 0 ? '__' + prefix.join('__') : '';
        orderedNodes(nodes, parent)
            .forEach((/**
         * @param {?} node
         * @return {?}
         */
        function (node) {
            /** @type {?} */
            var parentNodeInstance = nodesInstances.find((/**
             * @param {?} ni
             * @return {?}
             */
            function (ni) { return ni.node.id == node.parent && ni.suffix == curSuffix; }));
            /** @type {?} */
            var branchVisibility = parentNodeInstance != null ?
                parentNodeInstance.verifiedBranch != null &&
                    parentNodeInstance.verifiedBranch == node.parentNode : true;
            /** @type {?} */
            var nni = _this._initNodeInstance(allNodes, node, prefix, context, branchVisibility);
            if (nni != null) {
                nodesInstances.push(nni);
            }
        }));
        return nodesInstances;
    };
    /**
     * @private
     * @param {?} oldValue
     * @param {?} newValue
     * @return {?}
     */
    AjfFormRendererService.prototype._formValueDelta = /**
     * @private
     * @param {?} oldValue
     * @param {?} newValue
     * @return {?}
     */
    function (oldValue, newValue) {
        return Object.keys(newValue)
            .filter((/**
         * @param {?} k
         * @return {?}
         */
        function (k) { return oldValue[k] !== newValue[k]; }));
    };
    /**
     * @private
     * @param {?} formGroup
     * @return {?}
     */
    AjfFormRendererService.prototype._initFormGroupStreams = /**
     * @private
     * @param {?} formGroup
     * @return {?}
     */
    function (formGroup) {
        var _this = this;
        this._formGroupSubscription.unsubscribe();
        /** @type {?} */
        var init = true;
        /** @type {?} */
        var initForm = true;
        this._formInitEvent.emit(AjfFormInitStatus.Initializing);
        this._formGroupSubscription = formGroup.valueChanges.pipe(startWith({}), pairwise(), debounceTime(200), withLatestFrom.apply(void 0, (this._nodesMaps).concat([this._flatNodes]))).subscribe((/**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            /** @type {?} */
            var oldFormValue = init && {} || v[0][0];
            init = false;
            /** @type {?} */
            var newFormValue = v[0][1];
            /** @type {?} */
            var visibilityMap = v[1];
            /** @type {?} */
            var repetitionMap = v[2];
            /** @type {?} */
            var conditionalBranchesMap = v[3];
            /** @type {?} */
            var formulaMap = v[4];
            /** @type {?} */
            var validationMap = v[5];
            /** @type {?} */
            var warningMap = v[6];
            /** @type {?} */
            var nextSlideConditionsMap = v[7];
            /** @type {?} */
            var filteredChoicesMap = v[8];
            /** @type {?} */
            var triggerConditionsMap = v[9];
            /** @type {?} */
            var nodes = v[10];
            /** @type {?} */
            var delta = _this._formValueDelta(oldFormValue, newFormValue);
            /** @type {?} */
            var deltaLen = delta.length;
            /** @type {?} */
            var updatedNodes = [];
            delta.forEach((/**
             * @param {?} fieldName
             * @return {?}
             */
            function (fieldName) {
                updatedNodes = updatedNodes.concat(nodes.filter((/**
                 * @param {?} n
                 * @return {?}
                 */
                function (n) { return n.completeName === fieldName; })));
                if (visibilityMap[fieldName] != null) {
                    visibilityMap[fieldName].forEach((/**
                     * @param {?} nodeInstance
                     * @return {?}
                     */
                    function (nodeInstance) {
                        /** @type {?} */
                        var visibilityChanged = nodeInstance.updateVisibility(newFormValue);
                        if (visibilityChanged && !nodeInstance.visible) {
                            /** @type {?} */
                            var fg_1 = _this._formGroup.getValue();
                            if (fg_1 != null) {
                                /** @type {?} */
                                var s_1 = timer(200).subscribe((/**
                                 * @return {?}
                                 */
                                function () {
                                    if (s_1 && !s_1.closed) {
                                        s_1.unsubscribe();
                                    }
                                    fg_1.controls[nodeInstance.completeName].setValue(null);
                                }));
                            }
                            if (nodeInstance instanceof AjfFieldInstance) {
                                ((/** @type {?} */ (nodeInstance))).value = null;
                            }
                        }
                        else if (visibilityChanged && nodeInstance.visible &&
                            nodeInstance instanceof AjfFieldInstance) {
                            /** @type {?} */
                            var fg = _this._formGroup.getValue();
                            /** @type {?} */
                            var res = ((/** @type {?} */ (nodeInstance))).updateFormula(newFormValue);
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
                    function (nodeInstance) {
                        if (nodeInstance instanceof AjfNodeGroupInstance ||
                            nodeInstance instanceof AjfRepeatingSlideInstance) {
                            /** @type {?} */
                            var oldReps = nodeInstance.updateRepsNum(newFormValue);
                            if (oldReps !== nodeInstance.reps) {
                                _this._adjustReps(nodes, nodeInstance, oldReps, newFormValue);
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
                    function (nodeInstance) {
                        // const branchChanged = nodeInstance.updateConditionalBranches(newFormValue);
                        nodeInstance.updateConditionalBranches(newFormValue);
                        // if (branchChanged) {
                        /** @type {?} */
                        var verifiedBranch = nodeInstance.verifiedBranch;
                        nodeInstance.conditionalBranches.forEach((/**
                         * @param {?} _condition
                         * @param {?} idx
                         * @return {?}
                         */
                        function (_condition, idx) {
                            if (idx == verifiedBranch) {
                                _this._showSubtree(newFormValue, nodes, nodeInstance, idx);
                            }
                            else {
                                _this._hideSubtree(newFormValue, nodes, nodeInstance, idx);
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
                    function (nodeInstance) {
                        if (nodeInstance instanceof AjfFieldInstance) {
                            /** @type {?} */
                            var res = nodeInstance.updateFormula(newFormValue);
                            /** @type {?} */
                            var fg = _this._formGroup.getValue();
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
                    function (nodeInstance) {
                        if (nodeInstance instanceof AjfFieldInstance) {
                            newFormValue.$value = newFormValue[nodeInstance.completeName];
                            nodeInstance.updateValidation(newFormValue, _this.currentSupplementaryInformations);
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
                    function (nodeInstance) {
                        if (nodeInstance instanceof AjfFieldInstance) {
                            nodeInstance.updateWarning(newFormValue);
                            if (nodeInstance.warningResults.filter((/**
                             * @param {?} warning
                             * @return {?}
                             */
                            function (warning) { return warning.result; })).length > 0) {
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
                    function (nodeInstance) {
                        if (nodeInstance instanceof AjfFieldInstance) {
                            return nodeInstance.updateNextSlideCondition(newFormValue);
                        }
                        return false;
                    })).length == 1) {
                        _this._nextSlideTrigger.emit();
                    }
                }
                if (filteredChoicesMap[fieldName] != null) {
                    filteredChoicesMap[fieldName].forEach((/**
                     * @param {?} nodeInstance
                     * @return {?}
                     */
                    function (nodeInstance) {
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
                    var res = triggerConditionsMap[fieldName]
                        .filter((/**
                     * @param {?} nodeInstance
                     * @return {?}
                     */
                    function (nodeInstance) {
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
            function (n) { return n.triggerUpdate(); }));
            if (initForm) {
                initForm = false;
                _this._formInitEvent.emit(AjfFormInitStatus.Complete);
            }
            _this._valueChanged.next();
        }));
        return formGroup;
    };
    /**
     * @private
     * @param {?} context
     * @param {?} nodes
     * @param {?} node
     * @param {?=} branch
     * @return {?}
     */
    AjfFormRendererService.prototype._showSubtree = /**
     * @private
     * @param {?} context
     * @param {?} nodes
     * @param {?} node
     * @param {?=} branch
     * @return {?}
     */
    function (context, nodes, node, branch) {
        this._updateSubtreeVisibility(context, nodes, node, true, branch);
    };
    /**
     * @private
     * @param {?} context
     * @param {?} nodes
     * @param {?} node
     * @param {?=} branch
     * @return {?}
     */
    AjfFormRendererService.prototype._hideSubtree = /**
     * @private
     * @param {?} context
     * @param {?} nodes
     * @param {?} node
     * @param {?=} branch
     * @return {?}
     */
    function (context, nodes, node, branch) {
        this._updateSubtreeVisibility(context, nodes, node, false, branch);
    };
    /**
     * @private
     * @param {?} context
     * @param {?} nodes
     * @param {?} node
     * @param {?} visible
     * @param {?=} branch
     * @return {?}
     */
    AjfFormRendererService.prototype._updateSubtreeVisibility = /**
     * @private
     * @param {?} context
     * @param {?} nodes
     * @param {?} node
     * @param {?} visible
     * @param {?=} branch
     * @return {?}
     */
    function (context, nodes, node, visible, branch) {
        var _this = this;
        /** @type {?} */
        var subNodes;
        if (branch != null) {
            subNodes = nodes.filter((/**
             * @param {?} n
             * @return {?}
             */
            function (n) {
                return n.suffix == node.suffix && n.node.parent == node.node.id &&
                    n.node.parentNode == branch;
            }));
        }
        else {
            subNodes = nodes.filter((/**
             * @param {?} n
             * @return {?}
             */
            function (n) { return n.suffix == node.suffix && n.node.parent == node.node.id; }));
        }
        /** @type {?} */
        var isContainer = isContainerNode(node.node);
        subNodes.forEach((/**
         * @param {?} n
         * @return {?}
         */
        function (n) {
            if (!isContainer ||
                (isContainer && ((/** @type {?} */ (node.node))).nodes.find((/**
                 * @param {?} cn
                 * @return {?}
                 */
                function (cn) { return cn.id == n.node.id; })) == null)) {
                n.updateVisibility(context, visible);
                if (n instanceof AjfFieldInstance) {
                    ((/** @type {?} */ (n))).updateFormula(context);
                }
                _this._updateSubtreeVisibility(context, nodes, n, visible);
            }
        }));
    };
    /**
     * @private
     * @return {?}
     */
    AjfFormRendererService.prototype._initNodesStreams = /**
     * @private
     * @return {?}
     */
    function () {
        this._nodes = this._nodesUpdates.pipe(scan((/**
         * @param {?} nodes
         * @param {?} op
         * @return {?}
         */
        function (nodes, op) {
            return op(nodes);
        }), []), share());
        this._flatNodesTree = this._nodes.pipe(map((/**
         * @param {?} nodes
         * @return {?}
         */
        function (nodes) { return flattenNodesTree(nodes); })), share());
        this._flatNodes = this._flatNodesTree.pipe(map((/**
         * @param {?} slides
         * @return {?}
         */
        function (slides) {
            /** @type {?} */
            var nodes = [];
            slides.forEach((/**
             * @param {?} s
             * @return {?}
             */
            function (s) {
                nodes.push(s);
                nodes = nodes.concat(s.flatNodes);
            }));
            return nodes;
        })), share());
    };
    /**
     * @private
     * @param {?} nodeInstance
     * @return {?}
     */
    AjfFormRendererService.prototype._removeNodeInstance = /**
     * @private
     * @param {?} nodeInstance
     * @return {?}
     */
    function (nodeInstance) {
        /** @type {?} */
        var nodeName = nodeInstance.completeName;
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
    };
    /**
     * @private
     * @param {?} slideInstance
     * @return {?}
     */
    AjfFormRendererService.prototype._removeSlideInstance = /**
     * @private
     * @param {?} slideInstance
     * @return {?}
     */
    function (slideInstance) {
        var _this = this;
        /** @type {?} */
        var slide = slideInstance.slide;
        if (slide.visibility != null) {
            this._removeFromNodesVisibilityMap(slideInstance, slide.visibility.condition);
        }
        slideInstance.conditionalBranches.forEach((/**
         * @param {?} conditionalBranch
         * @return {?}
         */
        function (conditionalBranch) {
            _this._removeFromNodesConditionalBranchMap(slideInstance, conditionalBranch.condition);
        }));
        return slideInstance;
    };
    /**
     * @private
     * @param {?} nodeGroupInstance
     * @return {?}
     */
    AjfFormRendererService.prototype._removeNodeGroupInstance = /**
     * @private
     * @param {?} nodeGroupInstance
     * @return {?}
     */
    function (nodeGroupInstance) {
        /** @type {?} */
        var nodeGroup = nodeGroupInstance instanceof AjfNodeGroupInstance ?
            nodeGroupInstance.nodeGroup : nodeGroupInstance.slide;
        if (nodeGroup.visibility != null) {
            this._removeFromNodesVisibilityMap(nodeGroupInstance, nodeGroup.visibility.condition);
        }
        if (nodeGroupInstance.formulaReps != null && nodeGroup.formulaReps != null) {
            this._removeFromNodesRepetitionMap(nodeGroupInstance, nodeGroup.formulaReps.formula);
        }
        return nodeGroupInstance;
    };
    /**
     * @private
     * @param {?} fieldInstance
     * @return {?}
     */
    AjfFormRendererService.prototype._removeFieldInstance = /**
     * @private
     * @param {?} fieldInstance
     * @return {?}
     */
    function (fieldInstance) {
        var _this = this;
        /** @type {?} */
        var formGroup = this._formGroup.getValue();
        /** @type {?} */
        var fieldInstanceName = fieldInstance.completeName;
        if (formGroup != null && formGroup.contains(fieldInstanceName)) {
            formGroup.removeControl(fieldInstanceName);
        }
        if (fieldInstance.validation != null) {
            this._validationNodesMapUpdates.next((/**
             * @param {?} vmap
             * @return {?}
             */
            function (vmap) {
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
        function (conditionalBranch) {
            _this._removeFromNodesConditionalBranchMap(fieldInstance, conditionalBranch.condition);
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
            function (condition) {
                _this._removeFromNodesValidationMap(fieldInstance, condition.condition);
            }));
        }
        if (fieldInstance.warning != null) {
            fieldInstance.warning.conditions.forEach((/**
             * @param {?} condition
             * @return {?}
             */
            function (condition) {
                _this._removeFromNodesWarningMap(fieldInstance, condition.condition);
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
                function (condition) {
                    _this._removeFromNodesTriggerConditionsMap(fieldInstance, condition.condition);
                }));
            }
        }
        return fieldInstance;
    };
    /**
     * @private
     * @param {?} nodeInstance
     * @return {?}
     */
    AjfFormRendererService.prototype._addNodeInstance = /**
     * @private
     * @param {?} nodeInstance
     * @return {?}
     */
    function (nodeInstance) {
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
    };
    /**
     * @private
     * @param {?} fieldInstance
     * @return {?}
     */
    AjfFormRendererService.prototype._addFieldInstance = /**
     * @private
     * @param {?} fieldInstance
     * @return {?}
     */
    function (fieldInstance) {
        var _this = this;
        /** @type {?} */
        var formGroup = this._formGroup.getValue();
        /** @type {?} */
        var fieldInstanceName = fieldInstance.completeName;
        if (formGroup != null && !formGroup.contains(fieldInstanceName)) {
            /** @type {?} */
            var control = new FormControl();
            control.setValue(fieldInstance.value);
            formGroup.registerControl(fieldInstanceName, control);
        }
        if (formGroup != null && fieldInstance instanceof AjfTableFieldInstance
            && ((/** @type {?} */ (fieldInstance.node))).editable) {
            /** @type {?} */
            var node = (/** @type {?} */ (fieldInstance.node));
            /** @type {?} */
            var value_1 = [];
            node.rows.forEach((/**
             * @param {?} row
             * @return {?}
             */
            function (row) {
                /** @type {?} */
                var r = [];
                row.forEach((/**
                 * @param {?} k
                 * @return {?}
                 */
                function (k) {
                    /** @type {?} */
                    var control = new FormControl();
                    control.setValue(fieldInstance.context[k]);
                    (/** @type {?} */ (formGroup)).registerControl(k, control);
                    r.push(control);
                }));
                value_1.push(r);
            }));
            fieldInstance.controls = value_1;
        }
        if (fieldInstance.validation != null) {
            this._validationNodesMapUpdates.next((/**
             * @param {?} vmap
             * @return {?}
             */
            function (vmap) {
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
        function (conditionalBranch) {
            _this._addToNodesConditionalBranchMap(fieldInstance, conditionalBranch.condition);
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
            function (condition) {
                _this._addToNodesValidationMap(fieldInstance, condition.condition);
            }));
        }
        if (fieldInstance.warning != null) {
            fieldInstance.warning.conditions.forEach((/**
             * @param {?} condition
             * @return {?}
             */
            function (condition) {
                _this._addToNodesWarningMap(fieldInstance, condition.condition);
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
                function (condition) {
                    _this._addToNodesTriggerConditionsMap(fieldInstance, condition.condition);
                }));
            }
        }
        return fieldInstance;
    };
    /**
     * @private
     * @param {?} slideInstance
     * @return {?}
     */
    AjfFormRendererService.prototype._addSlideInstance = /**
     * @private
     * @param {?} slideInstance
     * @return {?}
     */
    function (slideInstance) {
        var _this = this;
        /** @type {?} */
        var slide = slideInstance.slide;
        if (slide.visibility != null) {
            this._addToNodesVisibilityMap(slideInstance, slide.visibility.condition);
        }
        slideInstance.conditionalBranches.forEach((/**
         * @param {?} conditionalBranch
         * @return {?}
         */
        function (conditionalBranch) {
            _this._addToNodesConditionalBranchMap(slideInstance, conditionalBranch.condition);
        }));
        return slideInstance;
    };
    /**
     * @private
     * @param {?} nodeGroupInstance
     * @return {?}
     */
    AjfFormRendererService.prototype._addNodeGroupInstance = /**
     * @private
     * @param {?} nodeGroupInstance
     * @return {?}
     */
    function (nodeGroupInstance) {
        var _this = this;
        /** @type {?} */
        var nodeGroup = nodeGroupInstance instanceof AjfNodeGroupInstance ?
            nodeGroupInstance.nodeGroup : nodeGroupInstance.slide;
        if (nodeGroup.visibility != null) {
            this._addToNodesVisibilityMap(nodeGroupInstance, nodeGroup.visibility.condition);
        }
        nodeGroupInstance.conditionalBranches.forEach((/**
         * @param {?} conditionalBranch
         * @return {?}
         */
        function (conditionalBranch) {
            _this._addToNodesConditionalBranchMap(nodeGroupInstance, conditionalBranch.condition);
        }));
        if (nodeGroupInstance.formulaReps != null) {
            if (nodeGroup.formulaReps != null) {
                this._addToNodesRepetitionMap(nodeGroupInstance, nodeGroup.formulaReps.formula);
            }
        }
        else {
            /** @type {?} */
            var formGroup = this._formGroup.getValue();
            /** @type {?} */
            var nodeGroupInstanceName = nodeGroupInstance.completeName;
            if (formGroup != null && !formGroup.contains(nodeGroupInstanceName)) {
                /** @type {?} */
                var control = new FormControl();
                control.setValue(nodeGroupInstance.reps);
                formGroup.registerControl(nodeGroupInstanceName, control);
            }
        }
        return nodeGroupInstance;
    };
    /**
     * @private
     * @param {?} index
     * @return {?}
     */
    AjfFormRendererService.prototype._removeNodesVisibilityMapIndex = /**
     * @private
     * @param {?} index
     * @return {?}
     */
    function (index) {
        this._removeNodesMapIndex(this._visibilityNodesMapUpdates, index);
    };
    /**
     * @private
     * @param {?} index
     * @return {?}
     */
    AjfFormRendererService.prototype._removeNodesRepetitionMapIndex = /**
     * @private
     * @param {?} index
     * @return {?}
     */
    function (index) {
        this._removeNodesMapIndex(this._repetitionNodesMapUpdates, index);
    };
    /**
     * @private
     * @param {?} index
     * @return {?}
     */
    AjfFormRendererService.prototype._removeNodesConditionalBranchMapIndex = /**
     * @private
     * @param {?} index
     * @return {?}
     */
    function (index) {
        this._removeNodesMapIndex(this._conditionalBranchNodesMapUpdates, index);
    };
    /**
     * @private
     * @param {?} index
     * @return {?}
     */
    AjfFormRendererService.prototype._removeNodesFormulaMapIndex = /**
     * @private
     * @param {?} index
     * @return {?}
     */
    function (index) {
        this._removeNodesMapIndex(this._formulaNodesMapUpdates, index);
    };
    /**
     * @private
     * @param {?} index
     * @return {?}
     */
    AjfFormRendererService.prototype._removeNodesValidationMapIndex = /**
     * @private
     * @param {?} index
     * @return {?}
     */
    function (index) {
        this._removeNodesMapIndex(this._validationNodesMapUpdates, index);
    };
    /**
     * @private
     * @param {?} index
     * @return {?}
     */
    AjfFormRendererService.prototype._removeNodesWarningMapIndex = /**
     * @private
     * @param {?} index
     * @return {?}
     */
    function (index) {
        this._removeNodesMapIndex(this._warningNodesMapUpdates, index);
    };
    /**
     * @private
     * @param {?} index
     * @return {?}
     */
    AjfFormRendererService.prototype._removeNodesFilteredChoicesMapIndex = /**
     * @private
     * @param {?} index
     * @return {?}
     */
    function (index) {
        this._removeNodesMapIndex(this._filteredChoicesNodesMapUpdates, index);
    };
    /**
     * @private
     * @param {?} index
     * @return {?}
     */
    AjfFormRendererService.prototype._removeNodesTriggerConditionsMapIndex = /**
     * @private
     * @param {?} index
     * @return {?}
     */
    function (index) {
        this._removeNodesMapIndex(this._triggerConditionsNodesMapUpdates, index);
    };
    /**
     * @private
     * @param {?} index
     * @return {?}
     */
    AjfFormRendererService.prototype._removeNodesNextSlideConditionsMapIndex = /**
     * @private
     * @param {?} index
     * @return {?}
     */
    function (index) {
        this._removeNodesMapIndex(this._nextSlideConditionsNodesMapUpdates, index);
    };
    /**
     * @private
     * @param {?} nodesMap
     * @param {?} index
     * @return {?}
     */
    AjfFormRendererService.prototype._removeNodesMapIndex = /**
     * @private
     * @param {?} nodesMap
     * @param {?} index
     * @return {?}
     */
    function (nodesMap, index) {
        nodesMap.next((/**
         * @param {?} vmap
         * @return {?}
         */
        function (vmap) {
            if (Object.keys(vmap).indexOf(index) > -1) {
                delete vmap[index];
            }
            return vmap;
        }));
    };
    /**
     * @private
     * @param {?} nodeInstance
     * @param {?} formula
     * @return {?}
     */
    AjfFormRendererService.prototype._removeFromNodesVisibilityMap = /**
     * @private
     * @param {?} nodeInstance
     * @param {?} formula
     * @return {?}
     */
    function (nodeInstance, formula) {
        this._removeFromNodesMap(this._visibilityNodesMapUpdates, nodeInstance, formula);
    };
    /**
     * @private
     * @param {?} nodeInstance
     * @param {?} formula
     * @return {?}
     */
    AjfFormRendererService.prototype._removeFromNodesRepetitionMap = /**
     * @private
     * @param {?} nodeInstance
     * @param {?} formula
     * @return {?}
     */
    function (nodeInstance, formula) {
        this._removeFromNodesMap(this._repetitionNodesMapUpdates, nodeInstance, formula);
    };
    /**
     * @private
     * @param {?} nodeInstance
     * @param {?} formula
     * @return {?}
     */
    AjfFormRendererService.prototype._removeFromNodesConditionalBranchMap = /**
     * @private
     * @param {?} nodeInstance
     * @param {?} formula
     * @return {?}
     */
    function (nodeInstance, formula) {
        this._removeFromNodesMap(this._conditionalBranchNodesMapUpdates, nodeInstance, formula);
    };
    /**
     * @private
     * @param {?} nodeInstance
     * @param {?} formula
     * @return {?}
     */
    AjfFormRendererService.prototype._removeFromNodesFormulaMap = /**
     * @private
     * @param {?} nodeInstance
     * @param {?} formula
     * @return {?}
     */
    function (nodeInstance, formula) {
        this._removeFromNodesMap(this._formulaNodesMapUpdates, nodeInstance, formula);
    };
    /**
     * @private
     * @param {?} nodeInstance
     * @param {?} formula
     * @return {?}
     */
    AjfFormRendererService.prototype._removeFromNodesValidationMap = /**
     * @private
     * @param {?} nodeInstance
     * @param {?} formula
     * @return {?}
     */
    function (nodeInstance, formula) {
        this._removeFromNodesMap(this._validationNodesMapUpdates, nodeInstance, formula);
    };
    /**
     * @private
     * @param {?} nodeInstance
     * @param {?} formula
     * @return {?}
     */
    AjfFormRendererService.prototype._removeFromNodesWarningMap = /**
     * @private
     * @param {?} nodeInstance
     * @param {?} formula
     * @return {?}
     */
    function (nodeInstance, formula) {
        this._removeFromNodesMap(this._warningNodesMapUpdates, nodeInstance, formula);
    };
    /**
     * @private
     * @param {?} nodeInstance
     * @param {?} formula
     * @return {?}
     */
    AjfFormRendererService.prototype._removeFromNodesFilteredChoicesMap = /**
     * @private
     * @param {?} nodeInstance
     * @param {?} formula
     * @return {?}
     */
    function (nodeInstance, formula) {
        this._removeFromNodesMap(this._filteredChoicesNodesMapUpdates, nodeInstance, formula);
    };
    /**
     * @private
     * @param {?} nodeInstance
     * @param {?} formula
     * @return {?}
     */
    AjfFormRendererService.prototype._removeFromNodesTriggerConditionsMap = /**
     * @private
     * @param {?} nodeInstance
     * @param {?} formula
     * @return {?}
     */
    function (nodeInstance, formula) {
        this._removeFromNodesMap(this._filteredChoicesNodesMapUpdates, nodeInstance, formula);
    };
    /**
     * @private
     * @param {?} nodeInstance
     * @param {?} formula
     * @return {?}
     */
    AjfFormRendererService.prototype._removeFromNodesNextSlideConditionsMap = /**
     * @private
     * @param {?} nodeInstance
     * @param {?} formula
     * @return {?}
     */
    function (nodeInstance, formula) {
        this._removeFromNodesMap(this._nextSlideConditionsNodesMapUpdates, nodeInstance, formula);
    };
    /**
     * @private
     * @param {?} nodesMap
     * @param {?} nodeInstance
     * @param {?} formula
     * @return {?}
     */
    AjfFormRendererService.prototype._removeFromNodesMap = /**
     * @private
     * @param {?} nodesMap
     * @param {?} nodeInstance
     * @param {?} formula
     * @return {?}
     */
    function (nodesMap, nodeInstance, formula) {
        /** @type {?} */
        var tokens = tokenize(formula)
            .filter((/**
         * @param {?} token
         * @return {?}
         */
        function (token) { return token.type == 'Identifier' && token.value != '$value'; }));
        if (tokens.length > 0) {
            nodesMap.next((/**
             * @param {?} vmap
             * @return {?}
             */
            function (vmap) {
                tokens.forEach((/**
                 * @param {?} token
                 * @return {?}
                 */
                function (token) {
                    /** @type {?} */
                    var tokenName = token.value;
                    if (vmap[tokenName] != null) {
                        /** @type {?} */
                        var idx = vmap[tokenName].indexOf(nodeInstance);
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
    };
    /**
     * @private
     * @param {?} nodeInstance
     * @param {?} formula
     * @return {?}
     */
    AjfFormRendererService.prototype._addToNodesVisibilityMap = /**
     * @private
     * @param {?} nodeInstance
     * @param {?} formula
     * @return {?}
     */
    function (nodeInstance, formula) {
        this._addToNodesMap(this._visibilityNodesMapUpdates, nodeInstance, formula);
    };
    /**
     * @private
     * @param {?} nodeInstance
     * @param {?} formula
     * @return {?}
     */
    AjfFormRendererService.prototype._addToNodesRepetitionMap = /**
     * @private
     * @param {?} nodeInstance
     * @param {?} formula
     * @return {?}
     */
    function (nodeInstance, formula) {
        this._addToNodesMap(this._repetitionNodesMapUpdates, nodeInstance, formula);
    };
    /**
     * @private
     * @param {?} nodeInstance
     * @param {?} formula
     * @return {?}
     */
    AjfFormRendererService.prototype._addToNodesConditionalBranchMap = /**
     * @private
     * @param {?} nodeInstance
     * @param {?} formula
     * @return {?}
     */
    function (nodeInstance, formula) {
        this._addToNodesMap(this._conditionalBranchNodesMapUpdates, nodeInstance, formula);
    };
    /**
     * @private
     * @param {?} nodeInstance
     * @param {?} formula
     * @return {?}
     */
    AjfFormRendererService.prototype._addToNodesFormulaMap = /**
     * @private
     * @param {?} nodeInstance
     * @param {?} formula
     * @return {?}
     */
    function (nodeInstance, formula) {
        this._addToNodesMap(this._formulaNodesMapUpdates, nodeInstance, formula);
    };
    /**
     * @private
     * @param {?} nodeInstance
     * @param {?} formula
     * @return {?}
     */
    AjfFormRendererService.prototype._addToNodesValidationMap = /**
     * @private
     * @param {?} nodeInstance
     * @param {?} formula
     * @return {?}
     */
    function (nodeInstance, formula) {
        this._addToNodesMap(this._validationNodesMapUpdates, nodeInstance, formula);
    };
    /**
     * @private
     * @param {?} nodeInstance
     * @param {?} formula
     * @return {?}
     */
    AjfFormRendererService.prototype._addToNodesWarningMap = /**
     * @private
     * @param {?} nodeInstance
     * @param {?} formula
     * @return {?}
     */
    function (nodeInstance, formula) {
        this._addToNodesMap(this._warningNodesMapUpdates, nodeInstance, formula);
    };
    /**
     * @private
     * @param {?} nodeInstance
     * @param {?} formula
     * @return {?}
     */
    AjfFormRendererService.prototype._addToNodesFilteredChoicesMap = /**
     * @private
     * @param {?} nodeInstance
     * @param {?} formula
     * @return {?}
     */
    function (nodeInstance, formula) {
        this._addToNodesMap(this._filteredChoicesNodesMapUpdates, nodeInstance, formula);
    };
    /**
     * @private
     * @param {?} nodeInstance
     * @param {?} formula
     * @return {?}
     */
    AjfFormRendererService.prototype._addToNodesTriggerConditionsMap = /**
     * @private
     * @param {?} nodeInstance
     * @param {?} formula
     * @return {?}
     */
    function (nodeInstance, formula) {
        this._addToNodesMap(this._triggerConditionsNodesMapUpdates, nodeInstance, formula);
    };
    /**
     * @private
     * @param {?} nodeInstance
     * @param {?} formula
     * @return {?}
     */
    AjfFormRendererService.prototype._addToNodesNextSlideConditionsMap = /**
     * @private
     * @param {?} nodeInstance
     * @param {?} formula
     * @return {?}
     */
    function (nodeInstance, formula) {
        this._addToNodesMap(this._nextSlideConditionsNodesMapUpdates, nodeInstance, formula);
    };
    /**
     * @private
     * @param {?} nodesMap
     * @param {?} nodeInstance
     * @param {?} formula
     * @return {?}
     */
    AjfFormRendererService.prototype._addToNodesMap = /**
     * @private
     * @param {?} nodesMap
     * @param {?} nodeInstance
     * @param {?} formula
     * @return {?}
     */
    function (nodesMap, nodeInstance, formula) {
        /** @type {?} */
        var tokens = tokenize(formula)
            .filter((/**
         * @param {?} token
         * @return {?}
         */
        function (token) { return token.type == 'Identifier' && token.value != '$value'; }));
        if (tokens.length > 0) {
            nodesMap.next((/**
             * @param {?} vmap
             * @return {?}
             */
            function (vmap) {
                tokens.forEach((/**
                 * @param {?} token
                 * @return {?}
                 */
                function (token) {
                    /** @type {?} */
                    var tokenName = token.value;
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
    };
    AjfFormRendererService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    AjfFormRendererService.ctorParameters = function () { return [
        { type: AjfValidationService }
    ]; };
    return AjfFormRendererService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AjfFormActionEvent = /** @class */ (function () {
    function AjfFormActionEvent() {
    }
    return AjfFormActionEvent;
}());
/**
 * @abstract
 */
var  /**
 * @abstract
 */
AjfFormRenderer = /** @class */ (function () {
    /**
     * this constructor will init current formula by ajfBuilderService
     */
    function AjfFormRenderer(_rendererService, _changeDetectorRef) {
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
        function (e) { return e === AjfFormInitStatus.Complete; })));
    }
    Object.defineProperty(AjfFormRenderer.prototype, "saveDisabled", {
        get: /**
         * @return {?}
         */
        function () { return this._saveDisabled; },
        set: /**
         * @param {?} saveDisabled
         * @return {?}
         */
        function (saveDisabled) {
            this._saveDisabled = coerceBooleanProperty(saveDisabled);
            this._changeDetectorRef.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFormRenderer.prototype, "hasStartMessage", {
        get: /**
         * @return {?}
         */
        function () { return this._hasStartMessage; },
        set: /**
         * @param {?} hasStartMessage
         * @return {?}
         */
        function (hasStartMessage) {
            this._hasStartMessage = coerceBooleanProperty(hasStartMessage);
            this._changeDetectorRef.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFormRenderer.prototype, "hasEndMessage", {
        get: /**
         * @return {?}
         */
        function () { return this._hasEndMessage; },
        set: /**
         * @param {?} hasEndMessage
         * @return {?}
         */
        function (hasEndMessage) {
            this._hasEndMessage = coerceBooleanProperty(hasEndMessage);
            this._changeDetectorRef.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFormRenderer.prototype, "hideTopToolbar", {
        get: /**
         * @return {?}
         */
        function () { return this._hideTopToolbar; },
        set: /**
         * @param {?} hideTopToolbar
         * @return {?}
         */
        function (hideTopToolbar) {
            this._hideTopToolbar = coerceBooleanProperty(hideTopToolbar);
            this._changeDetectorRef.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFormRenderer.prototype, "hideBottompToolbar", {
        get: /**
         * @return {?}
         */
        function () { return this._hideBottomToolbar; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFormRenderer.prototype, "hideBottomToolbar", {
        set: /**
         * @param {?} hideBottomToolbar
         * @return {?}
         */
        function (hideBottomToolbar) {
            this._hideBottomToolbar = coerceBooleanProperty(hideBottomToolbar);
            this._changeDetectorRef.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFormRenderer.prototype, "hideNavigationButtons", {
        get: /**
         * @return {?}
         */
        function () { return this._hideNavigationButtons; },
        set: /**
         * @param {?} hideNavigationButtons
         * @return {?}
         */
        function (hideNavigationButtons) {
            this._hideNavigationButtons = coerceBooleanProperty(hideNavigationButtons);
            this._changeDetectorRef.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFormRenderer.prototype, "fixedOrientation", {
        get: /**
         * @return {?}
         */
        function () { return this._fixedOrientation; },
        set: /**
         * @param {?} fixedOrientation
         * @return {?}
         */
        function (fixedOrientation) {
            this._fixedOrientation = coerceBooleanProperty(fixedOrientation);
            this._changeDetectorRef.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFormRenderer.prototype, "orientation", {
        get: /**
         * @return {?}
         */
        function () { return this._orientation; },
        set: /**
         * @param {?} orientation
         * @return {?}
         */
        function (orientation) {
            if (orientation !== 'horizontal' && orientation !== 'vertical') {
                return;
            }
            if (orientation !== this._orientation) {
                this._orientation = orientation;
                this._changeDetectorRef.markForCheck();
                this._orientationChange.emit(this._orientation);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFormRenderer.prototype, "form", {
        set: /**
         * @param {?} form
         * @return {?}
         */
        function (form) {
            this._form = form;
            if (this._init) {
                this._rendererService.setForm(this._form);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} slide
     * @return {?}
     */
    AjfFormRenderer.prototype.isRepeatingSlide = /**
     * @param {?} slide
     * @return {?}
     */
    function (slide) {
        return slide instanceof AjfRepeatingSlideInstance;
    };
    /**
     * this method will scroll to next error received by subscribe
     */
    /**
     * this method will scroll to next error received by subscribe
     * @return {?}
     */
    AjfFormRenderer.prototype.goToNextError = /**
     * this method will scroll to next error received by subscribe
     * @return {?}
     */
    function () { this._errorMoveEvent.emit(true); };
    /**
     * this method will scroll to prev error received by subscribe
     */
    /**
     * this method will scroll to prev error received by subscribe
     * @return {?}
     */
    AjfFormRenderer.prototype.goToPrevError = /**
     * this method will scroll to prev error received by subscribe
     * @return {?}
     */
    function () { this._errorMoveEvent.emit(false); };
    /**
     * this method will add group
     */
    /**
     * this method will add group
     * @param {?} nodeGroup
     * @return {?}
     */
    AjfFormRenderer.prototype.addGroup = /**
     * this method will add group
     * @param {?} nodeGroup
     * @return {?}
     */
    function (nodeGroup) {
        var _this = this;
        /** @type {?} */
        var s = this._rendererService.addGroup(nodeGroup).pipe(delayWhen((/**
         * @return {?}
         */
        function () { return _this.formSlider.pageScrollFinish; }))).subscribe((/**
         * @param {?} r
         * @return {?}
         */
        function (r) { if (r && _this.formSlider != null) {
            _this.formSlider.slide({ dir: 'down' });
        } }), (/**
         * @param {?} _e
         * @return {?}
         */
        function (_e) { if (s) {
            s.unsubscribe();
        } }), (/**
         * @return {?}
         */
        function () { if (s) {
            s.unsubscribe();
        } }));
    };
    /**
     * this method will remove group
     */
    /**
     * this method will remove group
     * @param {?} nodeGroup
     * @return {?}
     */
    AjfFormRenderer.prototype.removeGroup = /**
     * this method will remove group
     * @param {?} nodeGroup
     * @return {?}
     */
    function (nodeGroup) {
        var _this = this;
        /** @type {?} */
        var s = this._rendererService.removeGroup(nodeGroup).pipe(delayWhen((/**
         * @return {?}
         */
        function () { return _this.formSlider.pageScrollFinish; }))).subscribe((/**
         * @param {?} r
         * @return {?}
         */
        function (r) { if (r && _this.formSlider != null) {
            _this.formSlider.slide({ dir: 'up' });
        } }), (/**
         * @param {?} _e
         * @return {?}
         */
        function (_e) { if (s) {
            s.unsubscribe();
        } }), (/**
         * @return {?}
         */
        function () { if (s) {
            s.unsubscribe();
        } }));
    };
    /**
     * @param {?} _evt
     * @return {?}
     */
    AjfFormRenderer.prototype.onSave = /**
     * @param {?} _evt
     * @return {?}
     */
    function (_evt) {
        this._formAction.emit({
            source: this,
            action: 'save',
            value: this._rendererService.getFormValue()
        });
    };
    /**
     * @param {?} _evt
     * @param {?} action
     * @return {?}
     */
    AjfFormRenderer.prototype.onFormAction = /**
     * @param {?} _evt
     * @param {?} action
     * @return {?}
     */
    function (_evt, action) {
        this._formAction.emit({
            source: this,
            value: this._rendererService.getFormValue(),
            action: action
        });
    };
    /**
     * this method will set current form in rederer service when init form
     */
    /**
     * this method will set current form in rederer service when init form
     * @return {?}
     */
    AjfFormRenderer.prototype.ngAfterViewInit = /**
     * this method will set current form in rederer service when init form
     * @return {?}
     */
    function () {
        if (this._form != null) {
            this._rendererService.setForm(this._form);
            this._changeDetectorRef.detectChanges();
        }
    };
    /**
     * @return {?}
     */
    AjfFormRenderer.prototype.ngAfterViewChecked = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this._init && this.formSlider != null) {
            this._init = true;
            this._errorMoveSubscription = ((/** @type {?} */ (this._errorMoveEvent))).pipe(withLatestFrom(this._errorPositions)).subscribe((/**
             * @param {?} v
             * @return {?}
             */
            function (v) {
                /** @type {?} */
                var move = v[0];
                /** @type {?} */
                var currentPosition = _this.formSlider.currentPage - (+_this.hasStartMessage) + 1;
                /** @type {?} */
                var errors = v[1];
                if (errors == null) {
                    return;
                }
                /** @type {?} */
                var found = false;
                /** @type {?} */
                var prevIdx = -1;
                /** @type {?} */
                var nextIdx = -1;
                /** @type {?} */
                var idx = 0;
                /** @type {?} */
                var errorsLen = errors.length;
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
                _this.formSlider.slide({ to: move ? errors[nextIdx] - 1 : errors[prevIdx] - 1 });
                _this._changeDetectorRef.detectChanges();
            }));
        }
    };
    /**
     * @return {?}
     */
    AjfFormRenderer.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._nextSlideSubscription.unsubscribe();
        this._errorMoveSubscription.unsubscribe();
        this._orientationChange.complete();
        this._errorMoveEvent.complete();
        this._formAction.complete();
    };
    /**
     * @param {?} orientation
     * @return {?}
     */
    AjfFormRenderer.prototype.orientationChangeHandler = /**
     * @param {?} orientation
     * @return {?}
     */
    function (orientation) {
        this.orientation = orientation;
    };
    /**
     * @param {?} _
     * @param {?} node
     * @return {?}
     */
    AjfFormRenderer.prototype.trackNodeById = /**
     * @param {?} _
     * @param {?} node
     * @return {?}
     */
    function (_, node) {
        return node.completeName;
    };
    return AjfFormRenderer;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var BoolToIntPipe = /** @class */ (function () {
    function BoolToIntPipe() {
    }
    /**
     * @param {?} value
     * @return {?}
     */
    BoolToIntPipe.prototype.transform = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return value ? 1 : 0;
    };
    BoolToIntPipe.decorators = [
        { type: Pipe, args: [{ name: 'boolToInt' },] },
    ];
    return BoolToIntPipe;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var TableRowClass = /** @class */ (function () {
    function TableRowClass() {
    }
    /**
     * @param {?} value
     * @return {?}
     */
    TableRowClass.prototype.transform = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return value % 2 == 0 ? 'ajf-row-even' : 'ajf-row-odd';
    };
    TableRowClass.decorators = [
        { type: Pipe, args: [{ name: 'tableRowClass' },] },
    ];
    return TableRowClass;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AjfFormsModule = /** @class */ (function () {
    function AjfFormsModule() {
    }
    AjfFormsModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        BoolToIntPipe,
                        FieldIconPipe,
                        TableRowClass
                    ],
                    exports: [
                        BoolToIntPipe,
                        FieldIconPipe,
                        TableRowClass
                    ],
                    providers: [
                        AjfFormRendererService,
                        AjfValidationService
                    ]
                },] },
    ];
    return AjfFormsModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AjfForm = /** @class */ (function (_super) {
    __extends(AjfForm, _super);
    function AjfForm(obj) {
        var _this = _super.call(this) || this;
        _this.valid = true;
        _this.lastSelectedLocation = true;
        _this.jsonExportedMembers = _this.jsonExportedMembers.concat(['nodes', 'choicesOrigins', 'stringIdentifier', 'topBar']);
        _this.nodes = obj && obj.nodes || [];
        _this.choicesOrigins = obj && obj.choicesOrigins || [];
        _this.attachmentsOrigins = obj && obj.attachmentsOrigins || [];
        _this.initContext = obj && obj.initContext || {};
        _this.stringIdentifier = obj && obj.stringIdentifier || [];
        _this.lastSelectedLocation = obj && obj.lastSelectedLocation == false ? false : true;
        _this.supplementaryInformations = obj && obj.supplementaryInformations || null;
        return _this;
    }
    /**
     * this method will load an AjfForm from json
     * @param obj : any - object form
     * @return AjfForm
     */
    /**
     * this method will load an AjfForm from json
     * @param {?} obj : any - object form
     * @param {?=} context
     * @return {?} AjfForm
     */
    AjfForm.fromJson = /**
     * this method will load an AjfForm from json
     * @param {?} obj : any - object form
     * @param {?=} context
     * @return {?} AjfForm
     */
    function (obj, context) {
        obj = deepCopy(obj);
        if (context) {
            context = deepCopy(context);
            obj.initContext = context;
        }
        /** @type {?} */
        var keys = Object.keys(obj);
        if (keys.indexOf('choicesOrigins') > -1 &&
            obj.choicesOrigins instanceof Array) {
            /** @type {?} */
            var cos = [];
            for (var i = 0; i < obj.choicesOrigins.length; i++) {
                cos.push(AjfChoicesOrigin.fromJson(obj.choicesOrigins[i]));
            }
            obj.choicesOrigins = cos;
        }
        if (keys.indexOf('attachmentsOrigins') > -1 &&
            obj.attachmentsOrigins instanceof Array) {
            /** @type {?} */
            var cos = [];
            for (var i = 0; i < obj.attachmentsOrigins.length; i++) {
                cos.push(AjfAttachmentsOrigin.fromJson(obj.attachmentsOrigins[i]));
            }
            obj.attachmentsOrigins = cos;
        }
        if (keys.indexOf('nodes') > -1 && obj.nodes instanceof Array) {
            /** @type {?} */
            var fs = [];
            for (var i = 0; i < obj.nodes.length; i++) {
                /** @type {?} */
                var nodeObj = obj.nodes[i];
                /** @type {?} */
                var node = void 0;
                node = AjfNode.fromJson(nodeObj, obj.choicesOrigins, obj.attachmentsOrigins, context);
                fs.push(node);
            }
            obj.nodes = fs;
        }
        return new AjfForm(obj);
    };
    /**
     * @param {?} schema
     * @param {?} json
     * @param {?=} emptyString
     * @return {?}
     */
    AjfForm.toString = /**
     * @param {?} schema
     * @param {?} json
     * @param {?=} emptyString
     * @return {?}
     */
    function (schema, json, emptyString) {
        if (emptyString === void 0) { emptyString = ''; }
        if (schema.stringIdentifier != null && schema.stringIdentifier.length > 0) {
            /** @type {?} */
            var str = schema.stringIdentifier.map((/**
             * @param {?} s
             * @return {?}
             */
            function (s) {
                /** @type {?} */
                var values = [];
                if (s.value != null && s.value.length > 0) {
                    s.value.forEach((/**
                     * @param {?} curValue
                     * @return {?}
                     */
                    function (curValue) {
                        /** @type {?} */
                        var val;
                        /** @type {?} */
                        var vp = curValue.split('.');
                        /** @type {?} */
                        var cp = json;
                        vp.forEach((/**
                         * @param {?} k
                         * @return {?}
                         */
                        function (k) {
                            if (Object.keys(cp).indexOf(k) > -1) {
                                val = cp[k];
                                cp = cp[k];
                            }
                        }));
                        if (val instanceof Array && val.length > 0) {
                            val = val.join(', ');
                        }
                        if (typeof (val) === 'string' && val != null) {
                            values.push(val);
                        }
                    }));
                }
                return s.label + ": " + (values.length > 0 ? values.join(', ')
                    : emptyString);
            }));
            return str.join(' - ');
        }
        return null;
    };
    /**
     * this method will get child nodes from ajfNode
     * @param   node : AjfNode
     * @return ajfNode[] - the child og AjfNode
     */
    /**
     * this method will get child nodes from ajfNode
     * @param {?} node : AjfNode
     * @return {?} ajfNode[] - the child og AjfNode
     */
    AjfForm.prototype.getChildNodes = /**
     * this method will get child nodes from ajfNode
     * @param {?} node : AjfNode
     * @return {?} ajfNode[] - the child og AjfNode
     */
    function (node) {
        return this.nodes.filter((/**
         * @param {?} n
         * @return {?}
         */
        function (n) { return n.parent === node.id; })).sort((/**
         * @param {?} n
         * @return {?}
         */
        function (n) { return n.parentNode; }));
    };
    /**
     * this method will get root node
     * @return ajfNode - the root node
     */
    /**
     * this method will get root node
     * @return {?} ajfNode - the root node
     */
    AjfForm.prototype.getRootNode = /**
     * this method will get root node
     * @return {?} ajfNode - the root node
     */
    function () {
        if (this.nodes == null || this.nodes.length === 0) {
            return null;
        }
        /** @type {?} */
        var ns = this.nodes.filter((/**
         * @param {?} n
         * @return {?}
         */
        function (n) { return n.parent == null; }));
        return ns.length === 1 ? ns[0] : null;
    };
    return AjfForm;
}(AjfJsonSerializable));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { AjfAttachmentsType, AjfAttachment, AjfAttachmentsOrigin, AjfAttachmentsFixedOrigin, AjfChoicesType, AjfChoice, AjfChoicesOrigin, AjfChoicesFixedOrigin, AjfChoicesFunctionOrigin, AjfChoicesObservableOrigin, AjfChoicesObservableArrayOrigin, AjfChoicesPromiseOrigin, AjfInvalidFieldDefinitionError, FieldIconPipe, fieldIconName, AjfFormFieldValueChanged, AjfFormField, orderedNodes, isRepeatingNode, isContainerNode, flattenNodes, flattenNodesInstances, getAncestorRepeatingNodes, getAncestorRepeatingNodesNames, flattenNodesTree, normalizeFormula, nodeToNodeInstance, findNodeInstanceInTree, flattenNodeInstances, isContainerNodeInstance, AjfFormInitStatus, AjfFormRendererService, AjfFormActionEvent, AjfFormRenderer, AjfFormsModule, AjfForm, getTypeName, AjfNodeInstance, AjfFieldInstance, AjfFieldWithChoicesInstance, AjfNodeGroupInstance, AjfSlideInstance, AjfRepeatingSlideInstance, AjfTableFieldInstance, AjfDateFieldInstance, AjfEmptyFieldInstance, AjfNodeType, AjfNode, AjfFieldNodeLink, AjfFieldType, AjfNodeGroup, AjfSlide, AjfRepeatingSlide, AjfField, AjfEmptyField, AjfStringField, AjfTextField, AjfNumberField, AjfBooleanField, AjfFieldWithChoices, AjfSingleChoiceField, AjfMultipleChoiceField, AjfFormulaField, AjfDateField, AjfDateInputField, AjfTimeField, AjfTableField, AjfValidationService, AjfValidationResult, AjfValidation, AjfValidationGroup, AjfWarningResult, AjfWarning, AjfWarningGroup, BoolToIntPipe as ɵa, TableRowClass as ɵb };
//# sourceMappingURL=forms.es5.js.map
