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
import { __extends } from 'tslib';
import * as debug from 'debug';
import debug__default, {  } from 'debug';
import * as esprima from 'esprima';
import esprima__default, {  } from 'esprima';
import { addDays, addMonths, addYears, endOfISOWeek, format, getDay, parse, startOfMonth, startOfISOWeek } from 'date-fns';
import * as numeral from 'numeral';
import numeral__default, {  } from 'numeral';
import { deepCopy } from '@ajf/core/utils';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @abstract
 */
var  /**
 * @abstract
 */
AjfJsonSerializable = /** @class */ (function () {
    function AjfJsonSerializable(_) {
        this._jsonExportedMembers = [];
    }
    /**
     * @param {?} _
     * @return {?}
     */
    AjfJsonSerializable.fromJson = /**
     * @param {?} _
     * @return {?}
     */
    function (_) {
        throw new Error('Not implemented');
    };
    /**
     * @private
     * @param {?} val
     * @return {?}
     */
    AjfJsonSerializable._valueToJson = /**
     * @private
     * @param {?} val
     * @return {?}
     */
    function (val) {
        if (val instanceof Array) {
            val = val.map((/**
             * @param {?} v
             * @return {?}
             */
            function (v) { return AjfJsonSerializable._valueToJson(v); }));
        }
        return val instanceof AjfJsonSerializable ? val.toJson() : val;
    };
    /**
     * this private static method will get property to json
     * @param obj  : any - object json
     * @param prop : string - property
     * @return any
     */
    /**
     * this private static method will get property to json
     * @private
     * @param {?} obj  : any - object json
     * @param {?} prop : string - property
     * @return {?} any
     */
    AjfJsonSerializable._propertyToJson = /**
     * this private static method will get property to json
     * @private
     * @param {?} obj  : any - object json
     * @param {?} prop : string - property
     * @return {?} any
     */
    function (obj, prop) {
        /** @type {?} */
        var val;
        /** @type {?} */
        var getter = "get" + prop.toLocaleUpperCase().substr(0, 1) + prop.substr(1);
        if (obj.hasOwnProperty(prop)) {
            val = obj[prop];
        }
        else if (typeof obj[getter] === 'function') {
            val = obj[getter]();
        }
        else {
            val = obj[prop];
        }
        return AjfJsonSerializable._valueToJson(val);
    };
    Object.defineProperty(AjfJsonSerializable.prototype, "jsonExportedMembers", {
        /**
         * this protected method will get json exported members
         * @return string[] - json exported members
         */
        get: /**
         * this protected method will get json exported members
         * @protected
         * @return {?} string[] - json exported members
         */
        function () {
            return this._jsonExportedMembers;
        },
        /**
         * this protected method will set json exported members
         * @param string[] - json exported members
         */
        set: /**
         * this protected method will set json exported members
         * @protected
         * @param {?} members
         * @return {?}
         */
        function (members) {
            this._jsonExportedMembers = members;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * this method will load json
     * @return any - json
     */
    /**
     * this method will load json
     * @return {?} any - json
     */
    AjfJsonSerializable.prototype.toJson = /**
     * this method will load json
     * @return {?} any - json
     */
    function () {
        var _this = this;
        /** @type {?} */
        var json = {};
        this._jsonExportedMembers.forEach((/**
         * @param {?} m
         * @return {?}
         */
        function (m) { json[m] = AjfJsonSerializable._propertyToJson(_this, m); }));
        return json;
    };
    return AjfJsonSerializable;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

var AjfError = /** @class */ (function (_super) {
    __extends(AjfError, _super);
    /**
     * this constructor will init the message error
     */
    function AjfError(message) {
        var _this = _super.call(this, message) || this;
        _this._message = message || '';
        return _this;
    }
    Object.defineProperty(AjfError.prototype, "name", {
        get: /**
         * @return {?}
         */
        function () { return 'AjfError'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfError.prototype, "message", {
        get: /**
         * @return {?}
         */
        function () { return this._message; },
        enumerable: true,
        configurable: true
    });
    return AjfError;
}(Error));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var dateUtils = {
    addDays: addDays, addMonths: addMonths, addYears: addYears, endOfISOWeek: endOfISOWeek, format: format, getDay: getDay, parse: parse, startOfMonth: startOfMonth, startOfISOWeek: startOfISOWeek
};
/** @type {?} */
var numeralConstructor = numeral__default || numeral;
/**
 * @param {?} x
 * @return {?}
 */
function digitCount(x) {
    if (x == null) {
        return 0;
    }
    return x.toString().length;
}
/**
 * @param {?} x
 * @return {?}
 */
function decimalCount(x) {
    if (x == null) {
        return 0;
    }
    if (typeof x === 'string') {
        x = parseFloat(x);
    }
    if (isNaN(x)) {
        return 0;
    }
    /** @type {?} */
    var parts = x.toString().split('.');
    return parts.length > 1 ? parts[1].length : 0;
}
/**
 * @param {?} x
 * @return {?}
 */
function isInt(x) {
    return !/[,.]/.test(x);
}
/**
 * @param {?} x
 * @return {?}
 */
function notEmpty(x) {
    return (typeof x !== 'undefined' && x !== null ? x.toString().length > 0 : false);
}
/**
 * @param {?} array
 * @param {?} x
 * @return {?}
 */
function valueInChoice(array, x) {
    return (array || []).indexOf(x) > -1 || array === x;
}
/**
 * @param {?} reps
 * @param {?} acc
 * @param {?} callback
 * @return {?}
 */
function scanGroupField(reps, acc, callback) {
    for (var i = 0; i < reps; i++) {
        acc = callback(acc, i);
    }
    return acc;
}
/**
 * @param {?} array
 * @return {?}
 */
function sum(array) {
    return array.reduce((/**
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    function (a, b) { return a + b; }), 0);
}
/**
 * @param {?} dString
 * @param {?} period
 * @param {?} operation
 * @param {?} v
 * @return {?}
 */
function dateOperations(dString, period, operation, v) {
    /** @type {?} */
    var fmt = 'MM/DD/YYYY';
    /** @type {?} */
    var d = (typeof dString !== 'undefined') ? dateUtils.parse(dString) : new Date();
    if (operation == 'remove') {
        v = -v;
    }
    /** @type {?} */
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
            return '';
    }
    return dateUtils.format(dateOp(d, v), fmt);
}
/**
 * @param {?} num
 * @param {?} digits
 * @return {?}
 */
function round(num, digits) {
    digits = digits || 0;
    /** @type {?} */
    var f;
    if (typeof num !== 'number') {
        try {
            f = parseFloat(num);
        }
        catch (e) { }
    }
    else {
        f = num;
    }
    if (f == null || isNaN(f)) {
        f = 0;
    }
    /** @type {?} */
    var m = Math.pow(10, digits);
    return Math.round(f * m) / m;
}
/**
 * @param {?} source
 * @param {?} property
 * @param {?=} property2
 * @return {?}
 */
function extractArray(source, property, property2) {
    source = (source || []).slice(0);
    /** @type {?} */
    var l = source.length;
    /** @type {?} */
    var res = [];
    for (var i = 0; i < l; i++) {
        if (source[i][property] != null && property2 != null && source[i][property2] != null) {
            res.push(source[i][property] + source[i][property2]);
        }
        else if (source[i][property] != null) {
            res.push(source[i][property]);
        }
    }
    return res;
}
/**
 * @param {?} source
 * @param {?} properties
 * @return {?}
 */
function extractSum(source, properties) {
    /** @type {?} */
    var sumVal = 0;
    properties = (properties || []).slice(0);
    /** @type {?} */
    var l = properties.length;
    for (var i = 0; i < l; i++) {
        /** @type {?} */
        var array = extractArray(source, properties[i]);
        /** @type {?} */
        var leng = array.length;
        for (var j = 0; j < leng; j++) {
            sumVal += array[j];
        }
    }
    return sumVal;
}
/**
 * @param {?} source
 * @param {?} properties
 * @return {?}
 */
function extractArraySum(source, properties) {
    /** @type {?} */
    var arrays = [];
    properties = (properties || []).slice(0);
    for (var i = 0; i < properties.length; i++) {
        /** @type {?} */
        var array = extractArray(source, properties[i]);
        arrays.push(array);
    }
    /** @type {?} */
    var res = [];
    if (arrays.length > 0) {
        for (var weekI = 0; weekI < arrays[0].length; weekI++) {
            /** @type {?} */
            var sumVal = 0;
            for (var propI = 0; propI < properties.length; propI++) {
                sumVal = sumVal + arrays[propI][weekI];
            }
            res.push(sumVal);
        }
    }
    return res;
}
/**
 * @param {?} source
 * @param {?} property
 * @param {?} treshold
 * @return {?}
 */
function drawThreshold(source, property, treshold) {
    source = (source || []).slice(0);
    treshold = treshold || [0];
    if (!(treshold instanceof Array)) {
        treshold = [treshold];
    }
    /** @type {?} */
    var l = source.length;
    /** @type {?} */
    var res = [];
    /** @type {?} */
    var count = 0;
    for (var i = 0; i < l; i++) {
        if (source[i][property] != null) {
            if (treshold.length > count) {
                res.push(treshold[count]);
            }
            else {
                res.push(treshold[0]);
            }
            count++;
        }
    }
    return res;
}
/**
 * @param {?} source
 * @param {?} property
 * @param {?} fmt
 * @return {?}
 */
function extractDates(source, property, fmt) {
    source = (source || []).slice(0);
    /** @type {?} */
    var l = source.length;
    /** @type {?} */
    var res = [];
    /** @type {?} */
    var prefix = '';
    for (var i = 0; i < l; i++) {
        if (source[i][property] != null) {
            switch (fmt) {
                case 'WW':
                    prefix = 'W';
                    break;
                case 'MM':
                    prefix = 'M';
                    break;
                default:
                    prefix = '';
            }
            res.push(prefix + formatDate(source[i]['date_start'], fmt));
        }
    }
    return res;
}
/**
 * @param {?} source
 * @param {?} property
 * @return {?}
 */
function lastProperty(source, property) {
    source = (source || []).slice(0);
    /** @type {?} */
    var l = source.length - 1;
    while (l >= 0 && source[l][property] == null) {
        l--;
        if (l < 0) {
            return '';
        }
    }
    return l >= 0 ? source[l][property] : '';
}
/**
 * @param {?} source
 * @param {?} properties
 * @return {?}
 */
function sumLastProperties(source, properties) {
    source = (source || []).slice(0);
    /** @type {?} */
    var sumVal = 0;
    for (var i = 0; i < properties.length; i++) {
        sumVal += lastProperty(source, properties[i]);
    }
    return sumVal;
}
/**
 * @param {?} source
 * @param {?} property
 * @return {?}
 */
function calculateTrendProperty(source, property) {
    source = (source || []).slice(0);
    /** @type {?} */
    var last = source.length - 1;
    while (source[last][property] == null) {
        if (last == 0) {
            break;
        }
        last--;
    }
    /** @type {?} */
    var lastLast = last - 1;
    if (last == 0) {
        lastLast = last;
    }
    else {
        while (source[lastLast][property] == null) {
            if (lastLast == 0) {
                lastLast = last;
                break;
            }
            lastLast--;
        }
    }
    /** @type {?} */
    var lastProp = source[last] ? (source[last][property] || 0) : 0;
    /** @type {?} */
    var lastLastProp = source[lastLast] ? (source[lastLast][property] || 0) : 0;
    if (lastProp == lastLastProp) {
        return '<p><i class="material-icons" style="color:blue">trending_flat</i></p>';
    }
    else if (lastProp > lastLastProp) {
        return '<p><i class="material-icons" style="color:green">trending_up</i></p>';
    }
    else {
        return '<p><i class="material-icons" style="color:red">trending_down</i></p>';
    }
}
/**
 * @param {?} source
 * @param {?} properties
 * @return {?}
 */
function calculateTrendByProperties(source, properties) {
    /** @type {?} */
    var arraysum = extractArraySum(source, properties);
    /** @type {?} */
    var lastProp = arraysum.length > 0 ? (arraysum[arraysum.length - 1] || 0) : 0;
    /** @type {?} */
    var lastLastProp = arraysum.length > 1 ? (arraysum[arraysum.length - 2] || 0) : lastProp;
    if (lastProp == lastLastProp) {
        return '<p><i class="material-icons" style="color:blue">trending_flat</i></p>';
    }
    else if (lastProp > lastLastProp) {
        return '<p><i class="material-icons" style="color:green">trending_up</i></p>';
    }
    else {
        return '<p><i class="material-icons" style="color:red">trending_down</i></p>';
    }
}
/**
 * @param {?} source
 * @param {?} property
 * @param {?} range
 * @param {?} coefficient
 * @return {?}
 */
function calculateAvgProperty(source, property, range, coefficient) {
    source = (source || []).slice(0);
    coefficient = coefficient || 1;
    range = range || 12;
    /** @type {?} */
    var l = source.length;
    /** @type {?} */
    var res = 0;
    /** @type {?} */
    var counter = 0;
    /** @type {?} */
    var noZero = 0;
    if (l < range) {
        range = l;
    }
    while (range != 0) {
        if (source[l - 1][property] != null) {
            counter++;
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
    }
    else {
        return round((res / counter) * coefficient, 2) || 0;
    }
}
/**
 * @param {?} source
 * @param {?} properties
 * @param {?} range
 * @param {?} coefficient
 * @return {?}
 */
function calculateAvgPropertyArray(source, properties, range, coefficient) {
    source = (source || []).slice(0);
    /** @type {?} */
    var resArr = [];
    if (properties && properties.length > 0) {
        /** @type {?} */
        var avg = 0;
        coefficient = coefficient || 1;
        range = range || 12;
        /** @type {?} */
        var sourceArr = properties.length > 1
            ? extractArraySum(source, properties)
            : extractArray(source, properties[0]);
        /** @type {?} */
        var l = sourceArr.length;
        for (var len = l; len > 0; len--) {
            /** @type {?} */
            var res = 0;
            /** @type {?} */
            var counter = 0;
            /** @type {?} */
            var noZero = 0;
            if (len < range) {
                range = len;
            }
            for (var r = 1; r <= range; r++) {
                /** @type {?} */
                var val = sourceArr[len - r];
                if (val != null) {
                    counter++;
                    res += val;
                    if (val > 0) {
                        noZero++;
                    }
                }
            }
            if (counter > 0) {
                if (coefficient == 0) {
                    avg = noZero;
                }
                else {
                    avg = (res / counter) * coefficient || 0;
                }
                resArr.push(round(avg, 2));
            }
        }
    }
    return resArr.reverse();
}
/**
 * @param {?} source
 * @param {?} property
 * @param {?} treshold
 * @return {?}
 */
function alert(source, property, treshold) {
    source = (source || []).slice(0);
    if (lastProperty(source, property) > treshold) {
        return '<p><i class="material-icons" style="color:red">warning</i></p>';
    }
    else {
        return '<p></p>';
    }
}
/**
 * @param {?} num
 * @param {?=} fmt
 * @return {?}
 */
function formatNumber(num, fmt) {
    fmt = fmt || '0,0[.]0';
    return numeralConstructor(num).format(fmt);
}
/**
 * @param {?} date
 * @param {?=} fmt
 * @return {?}
 */
function formatDate(date, fmt) {
    fmt = fmt || 'MM-DD-YYYY';
    return dateUtils.format(date, fmt);
}
/**
 * @param {?} date
 * @param {?=} fmt
 * @return {?}
 */
function isoMonth(date, fmt) {
    fmt = fmt || 'MM';
    /** @type {?} */
    var du = dateUtils;
    return du.format(du.addDays(du.startOfISOWeek(date), 3), fmt);
}
/**
 * @param {?} source
 * @param {?=} zoom
 * @return {?}
 */
function getCoordinate(source, zoom) {
    zoom = zoom || 6;
    if (source == null) {
        return [51.505, -0.09, zoom];
    }
    else {
        return [source[0], source[1], zoom];
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var esprimaMod = esprima__default || esprima;
var tokenize = esprimaMod.tokenize;
/** @type {?} */
var debugConstructor = debug__default || debug;
/** @type {?} */
var dbg = debugConstructor('ajf:models:validated-property');
/**
 * This abstract class will define an ajf validated property
 * @abstract
 */
var AjfValidatedProperty = /** @class */ (function (_super) {
    __extends(AjfValidatedProperty, _super);
    function AjfValidatedProperty() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * this method will load an AjfNode from json
     * @param obj                : any - object node
     * @param choicesOrigins     : any[] - array of choicesOrigins
     * @param attachmentsOrigins : any[] - array of attachmentsOrigins
     * @return AjfNode
     */
    /**
     * this method will load an AjfNode from json
     * @param {?} str
     * @param {?=} context
     * @return {?} AjfNode
     */
    AjfValidatedProperty.validate = /**
     * this method will load an AjfNode from json
     * @param {?} str
     * @param {?=} context
     * @return {?} AjfNode
     */
    function (str, context) {
        if (context === this._cachedContext) {
            console.log('cache hit');
        }
        else {
            this._cachedContext = context;
            this._cachedContextString = AjfValidatedProperty.getContextString(context);
        }
        /** @type {?} */
        var ctx = this._cachedContextString;
        try {
            /** @type {?} */
            var f = new Function("" + ctx + str);
            dbg((/** @type {?} */ ("validating formula %s using context %j")), str, ctx);
            f();
            dbg("formula %s validated", str);
            f = (/** @type {?} */ (null));
            return true;
        }
        catch (e) {
            dbg("formula %s not validated: error %j", str, e);
            return false;
        }
    };
    /**
     * this public static method will get context string
     * @param context : any - context
     * @return string
     */
    /**
     * this public static method will get context string
     * @param {?=} context : any - context
     * @return {?} string
     */
    AjfValidatedProperty.getContextString = /**
     * this public static method will get context string
     * @param {?=} context : any - context
     * @return {?} string
     */
    function (context) {
        /** @type {?} */
        var fstr = AjfValidatedProperty.UTIL_FUNCTIONS;
        if (context instanceof Array) {
            for (var i = 0; i < context.length; i++) {
                fstr = fstr + "var " + context[i] + " = true;";
            }
        }
        else if (context != null) {
            Object.keys(context).forEach((/**
             * @param {?} x
             * @return {?}
             */
            function (x) {
                /** @type {?} */
                var val = context[x];
                if (val == null || isNaN(Number(val)) || val === '' ||
                    val instanceof Array) {
                    if (val instanceof Array) {
                        for (var i = 0; i < val.length; i++) {
                            val[i] =
                                (val == null || isNaN(Number(val[i])) || val[i] === '') &&
                                    val[i] ||
                                    Number(val[i]);
                        }
                    }
                    val = JSON.stringify(val);
                }
                else {
                    val = Number(val);
                }
                fstr = fstr + "var " + x + " = " + val + "; ";
            }));
        }
        return fstr;
    };
    /**
     * this public method will evaluate context or forceFormula
     * @param context      : any - context
     * @param forceFormula : string - formula
     * @return string
     */
    /**
     * this public method will evaluate context or forceFormula
     * @param {?=} context      : any - context
     * @param {?=} forceFormula : string - formula
     * @return {?} string
     */
    AjfValidatedProperty.prototype.evaluate = /**
     * this public method will evaluate context or forceFormula
     * @param {?=} context      : any - context
     * @param {?=} forceFormula : string - formula
     * @return {?} string
     */
    function (context, forceFormula) {
        /** @type {?} */
        var formula = forceFormula || this.getValidationFormula() || '';
        if (formula === '') {
            return '';
        }
        if (formula === 'true') {
            return true;
        }
        if (formula === 'false') {
            return false;
        }
        if (context != null && context[formula] !== undefined) {
            return context[formula];
        }
        if (/^"[^"]*"$/.test(formula)) {
            return formula.replace(/^"+|"+$/g, '');
        }
        /** @type {?} */
        var identifiers = tokenize(formula)
            .filter((/**
         * @param {?} t
         * @return {?}
         */
        function (t) { return t.type === 'Identifier'; }))
            .map((/**
         * @param {?} t
         * @return {?}
         */
        function (t) { return t.value; }));
        /** @type {?} */
        var ctx = [];
        identifiers.forEach((/**
         * @param {?} key
         * @return {?}
         */
        function (key) {
            /** @type {?} */
            var val = null;
            if (context != null && context[key] !== undefined) {
                val = context[key];
            }
            else if (AjfValidatedProperty.utils[key] !== undefined) {
                /** @type {?} */
                var util = AjfValidatedProperty.utils[key];
                val = util.fn;
            }
            ctx.push(val);
        }));
        identifiers.push('execContext');
        ctx.push(AjfValidatedProperty._execContext);
        try {
            if (dbg.enabled) {
                dbg("evaluating formula %s using context %j", formula, ctx);
            }
            /** @type {?} */
            var f = new (Function.bind.apply(Function, [void 0].concat(identifiers, ["return " + formula])))();
            /** @type {?} */
            var res = f.apply(void 0, ctx);
            if (dbg.enabled) {
                dbg("formula %s evaluated: result %s", formula, res);
            }
            f = (/** @type {?} */ (null));
            return res;
        }
        catch (e) {
            console.log(e);
            if (dbg.enabled) {
                dbg("formula %s not evaluated: error %j", formula, e.message);
            }
            return false;
        }
    };
    /**
     * @param {?} counterName
     * @param {?} firstValue
     * @return {?}
     */
    AjfValidatedProperty.nextCounterValue = /**
     * @param {?} counterName
     * @param {?} firstValue
     * @return {?}
     */
    function (counterName, firstValue) {
        firstValue = firstValue != null ? firstValue : 0;
        if (this._execContext['$$' + counterName] == null) {
            this._execContext['$$' + counterName] = firstValue;
        }
        else {
            this._execContext['$$' + counterName]++;
        }
        return this._execContext['$$' + counterName];
    };
    AjfValidatedProperty.UTIL_FUNCTIONS = '';
    AjfValidatedProperty._execContext = {};
    AjfValidatedProperty._cachedContext = {};
    AjfValidatedProperty._cachedContextString = '';
    AjfValidatedProperty.utils = {
        digitCount: { fn: digitCount },
        decimalCount: { fn: decimalCount },
        isInt: { fn: isInt },
        notEmpty: { fn: notEmpty },
        valueInChoice: { fn: valueInChoice },
        scanGroupField: { fn: scanGroupField },
        sum: { fn: sum },
        dateOperations: { fn: dateOperations },
        round: { fn: round },
        extractArray: { fn: extractArray },
        extractSum: { fn: extractSum },
        extractArraySum: { fn: extractArraySum },
        drawThreshold: { fn: drawThreshold },
        extractDates: { fn: extractDates },
        lastProperty: { fn: lastProperty },
        sumLastProperties: { fn: sumLastProperties },
        calculateTrendProperty: { fn: calculateTrendProperty },
        calculateTrendByProperties: { fn: calculateTrendByProperties },
        calculateAvgProperty: { fn: calculateAvgProperty },
        calculateAvgPropertyArray: { fn: calculateAvgPropertyArray },
        alert: { fn: alert },
        formatNumber: { fn: formatNumber },
        formatDate: { fn: formatDate },
        isoMonth: { fn: isoMonth },
        getCoordinate: { fn: getCoordinate },
        Math: { fn: Math },
        parseInt: { fn: parseInt },
        parseFloat: { fn: parseFloat },
        parseDate: { fn: dateUtils.parse },
        Date: { fn: Date }
    };
    return AjfValidatedProperty;
}(AjfJsonSerializable));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * This class will define an Ajf condition
 */
var  /**
 * This class will define an Ajf condition
 */
AjfCondition = /** @class */ (function (_super) {
    __extends(AjfCondition, _super);
    function AjfCondition(obj) {
        var _this = _super.call(this, obj) || this;
        _this.jsonExportedMembers = ['condition'];
        _this.condition = obj && obj.condition || '';
        return _this;
    }
    /**
     * this method will get true condition
     * @return AjCondition
     */
    /**
     * this method will get true condition
     * @return {?} AjCondition
     */
    AjfCondition.alwaysCondition = /**
     * this method will get true condition
     * @return {?} AjCondition
     */
    function () {
        return new AjfCondition({ condition: 'true' });
    };
    /**
     * this method will get false condition
     * @return AjCondition
     */
    /**
     * this method will get false condition
     * @return {?} AjCondition
     */
    AjfCondition.neverCondition = /**
     * this method will get false condition
     * @return {?} AjCondition
     */
    function () {
        return new AjfCondition({ condition: 'false' });
    };
    /**
     * this method will load an AjfCondition from json
     * @param obj : any - object condition
     * @return AjfCondition
     */
    /**
     * this method will load an AjfCondition from json
     * @param {?} obj : any - object condition
     * @return {?} AjfCondition
     */
    AjfCondition.fromJson = /**
     * this method will load an AjfCondition from json
     * @param {?} obj : any - object condition
     * @return {?} AjfCondition
     */
    function (obj) {
        obj = deepCopy(obj);
        return new AjfCondition(obj);
    };
    /**
     * @return {?}
     */
    AjfCondition.prototype.getValidationFormula = /**
     * @return {?}
     */
    function () { return this.condition; };
    return AjfCondition;
}(AjfValidatedProperty));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AjfFormula = /** @class */ (function (_super) {
    __extends(AjfFormula, _super);
    /**
     *
     * @param obj
     */
    function AjfFormula(obj) {
        var _this = _super.call(this) || this;
        _this.jsonExportedMembers = ['formula'];
        _this.formula = obj && obj.formula || null;
        return _this;
    }
    /**
     * this static method will load an AjfFormula from json
     * @param obj : any - object formula
     * @return AjfFormula
     */
    /**
     * this static method will load an AjfFormula from json
     * @param {?} obj : any - object formula
     * @return {?} AjfFormula
     */
    AjfFormula.fromJson = /**
     * this static method will load an AjfFormula from json
     * @param {?} obj : any - object formula
     * @return {?} AjfFormula
     */
    function (obj) {
        obj = deepCopy(obj);
        return new AjfFormula(obj);
    };
    /**
     * this method will get validation formula
     * @return string - a validation formula
     */
    /**
     * this method will get validation formula
     * @return {?} string - a validation formula
     */
    AjfFormula.prototype.getValidationFormula = /**
     * this method will get validation formula
     * @return {?} string - a validation formula
     */
    function () { return this.formula; };
    return AjfFormula;
}(AjfValidatedProperty));

export { AjfCondition, AjfError, AjfFormula, AjfJsonSerializable, AjfValidatedProperty };
//# sourceMappingURL=models.es5.js.map
