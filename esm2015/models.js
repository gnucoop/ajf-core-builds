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
import * as debug from 'debug';
import debug__default, {  } from 'debug';
import { tokenize } from 'esprima';
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
class AjfJsonSerializable {
    /**
     * @param {?=} _
     */
    constructor(_) {
        this._jsonExportedMembers = [];
    }
    /**
     * @param {?} _
     * @return {?}
     */
    static fromJson(_) {
        throw new Error('Not implemented');
    }
    /**
     * @private
     * @param {?} val
     * @return {?}
     */
    static _valueToJson(val) {
        if (val instanceof Array) {
            val = val.map((/**
             * @param {?} v
             * @return {?}
             */
            (v) => AjfJsonSerializable._valueToJson(v)));
        }
        return val instanceof AjfJsonSerializable ? val.toJson() : val;
    }
    /**
     * this private static method will get property to json
     * @private
     * @param {?} obj  : any - object json
     * @param {?} prop : string - property
     * @return {?} any
     */
    static _propertyToJson(obj, prop) {
        /** @type {?} */
        let val;
        /** @type {?} */
        let getter = `get${prop.toLocaleUpperCase().substr(0, 1)}${prop.substr(1)}`;
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
    }
    /**
     * this protected method will get json exported members
     * @protected
     * @return {?} string[] - json exported members
     */
    get jsonExportedMembers() {
        return this._jsonExportedMembers;
    }
    /**
     * this protected method will set json exported members
     * @protected
     * @param {?} members
     * @return {?}
     */
    set jsonExportedMembers(members) {
        this._jsonExportedMembers = members;
    }
    /**
     * this method will load json
     * @return {?} any - json
     */
    toJson() {
        /** @type {?} */
        let json = {};
        this._jsonExportedMembers.forEach((/**
         * @param {?} m
         * @return {?}
         */
        (m) => { json[m] = AjfJsonSerializable._propertyToJson(this, m); }));
        return json;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

class AjfError extends Error {
    /**
     * @return {?}
     */
    get name() { return 'AjfError'; }
    /**
     * @return {?}
     */
    get message() { return this._message; }
    /**
     * this constructor will init the message error
     * @param {?=} message
     */
    constructor(message) {
        super(message);
        this._message = message || '';
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const dateUtils = {
    addDays, addMonths, addYears, endOfISOWeek, format, getDay, parse, startOfMonth, startOfISOWeek
};
/** @type {?} */
const numeralConstructor = numeral__default || numeral;
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
    const parts = x.toString().split('.');
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
    for (let i = 0; i < reps; i++) {
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
    (a, b) => a + b), 0);
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
    const fmt = 'MM/DD/YYYY';
    /** @type {?} */
    let d = (typeof dString !== 'undefined') ? dateUtils.parse(dString) : new Date();
    if (operation == 'remove') {
        v = -v;
    }
    /** @type {?} */
    let dateOp;
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
    let f;
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
    const m = Math.pow(10, digits);
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
    const l = source.length;
    /** @type {?} */
    const res = [];
    for (let i = 0; i < l; i++) {
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
    let sumVal = 0;
    properties = (properties || []).slice(0);
    /** @type {?} */
    const l = properties.length;
    for (let i = 0; i < l; i++) {
        /** @type {?} */
        const array = extractArray(source, properties[i]);
        /** @type {?} */
        const leng = array.length;
        for (let j = 0; j < leng; j++) {
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
    const arrays = [];
    properties = (properties || []).slice(0);
    for (let i = 0; i < properties.length; i++) {
        /** @type {?} */
        const array = extractArray(source, properties[i]);
        arrays.push(array);
    }
    /** @type {?} */
    const res = [];
    if (arrays.length > 0) {
        for (let weekI = 0; weekI < arrays[0].length; weekI++) {
            /** @type {?} */
            let sumVal = 0;
            for (let propI = 0; propI < properties.length; propI++) {
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
    const l = source.length;
    /** @type {?} */
    const res = [];
    /** @type {?} */
    let count = 0;
    for (let i = 0; i < l; i++) {
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
    const l = source.length;
    /** @type {?} */
    const res = [];
    /** @type {?} */
    let prefix = '';
    for (let i = 0; i < l; i++) {
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
    let l = source.length - 1;
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
    let sumVal = 0;
    for (let i = 0; i < properties.length; i++) {
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
    let last = source.length - 1;
    while (source[last][property] == null) {
        if (last == 0) {
            break;
        }
        last--;
    }
    /** @type {?} */
    let lastLast = last - 1;
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
    const lastProp = source[last] ? (source[last][property] || 0) : 0;
    /** @type {?} */
    const lastLastProp = source[lastLast] ? (source[lastLast][property] || 0) : 0;
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
    const arraysum = extractArraySum(source, properties);
    /** @type {?} */
    const lastProp = arraysum.length > 0 ? (arraysum[arraysum.length - 1] || 0) : 0;
    /** @type {?} */
    const lastLastProp = arraysum.length > 1 ? (arraysum[arraysum.length - 2] || 0) : lastProp;
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
    let l = source.length;
    /** @type {?} */
    let res = 0;
    /** @type {?} */
    let counter = 0;
    /** @type {?} */
    let noZero = 0;
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
    const resArr = [];
    if (properties && properties.length > 0) {
        /** @type {?} */
        let avg = 0;
        coefficient = coefficient || 1;
        range = range || 12;
        /** @type {?} */
        const sourceArr = properties.length > 1
            ? extractArraySum(source, properties)
            : extractArray(source, properties[0]);
        /** @type {?} */
        let l = sourceArr.length;
        for (let len = l; len > 0; len--) {
            /** @type {?} */
            let res = 0;
            /** @type {?} */
            let counter = 0;
            /** @type {?} */
            let noZero = 0;
            if (len < range) {
                range = len;
            }
            for (let r = 1; r <= range; r++) {
                /** @type {?} */
                let val = sourceArr[len - r];
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
    const du = dateUtils;
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
const debugConstructor = debug__default || debug;
/** @type {?} */
const dbg = debugConstructor('ajf:models:validated-property');
/**
 * This abstract class will define an ajf validated property
 * @abstract
 */
class AjfValidatedProperty extends AjfJsonSerializable {
    /**
     * this method will load an AjfNode from json
     * @param {?} str
     * @param {?=} context
     * @return {?} AjfNode
     */
    static validate(str, context) {
        if (context === this._cachedContext) {
            console.log('cache hit');
        }
        else {
            this._cachedContext = context;
            this._cachedContextString = AjfValidatedProperty.getContextString(context);
        }
        /** @type {?} */
        let ctx = this._cachedContextString;
        try {
            /** @type {?} */
            let f = new Function(`${ctx}${str}`);
            dbg((/** @type {?} */ (`validating formula %s using context %j`)), str, ctx);
            f();
            dbg(`formula %s validated`, str);
            f = (/** @type {?} */ (null));
            return true;
        }
        catch (e) {
            dbg(`formula %s not validated: error %j`, str, e);
            return false;
        }
    }
    /**
     * this public static method will get context string
     * @param {?=} context : any - context
     * @return {?} string
     */
    static getContextString(context) {
        /** @type {?} */
        let fstr = AjfValidatedProperty.UTIL_FUNCTIONS;
        if (context instanceof Array) {
            for (let i = 0; i < context.length; i++) {
                fstr = `${fstr}var ${context[i]} = true;`;
            }
        }
        else if (context != null) {
            Object.keys(context).forEach((/**
             * @param {?} x
             * @return {?}
             */
            x => {
                /** @type {?} */
                let val = context[x];
                if (val == null || isNaN(Number(val)) || val === '' ||
                    val instanceof Array) {
                    if (val instanceof Array) {
                        for (let i = 0; i < val.length; i++) {
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
                fstr = `${fstr}var ${x} = ${val}; `;
            }));
        }
        return fstr;
    }
    /**
     * this public method will evaluate context or forceFormula
     * @param {?=} context      : any - context
     * @param {?=} forceFormula : string - formula
     * @return {?} string
     */
    evaluate(context, forceFormula) {
        /** @type {?} */
        let formula = forceFormula || this.getValidationFormula() || '';
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
        const identifiers = tokenize(formula)
            .filter((/**
         * @param {?} t
         * @return {?}
         */
        t => t.type === 'Identifier'))
            .map((/**
         * @param {?} t
         * @return {?}
         */
        t => t.value));
        /** @type {?} */
        const ctx = [];
        identifiers.forEach((/**
         * @param {?} key
         * @return {?}
         */
        key => {
            /** @type {?} */
            let val = null;
            if (context != null && context[key] !== undefined) {
                val = context[key];
            }
            else if (AjfValidatedProperty.utils[key] !== undefined) {
                /** @type {?} */
                const util = AjfValidatedProperty.utils[key];
                val = util.fn;
            }
            ctx.push(val);
        }));
        identifiers.push('execContext');
        ctx.push(AjfValidatedProperty._execContext);
        try {
            if (dbg.enabled) {
                dbg(`evaluating formula %s using context %j`, formula, ctx);
            }
            /** @type {?} */
            let f = new Function(...identifiers, `return ${formula}`);
            /** @type {?} */
            const res = f(...ctx);
            if (dbg.enabled) {
                dbg(`formula %s evaluated: result %s`, formula, res);
            }
            f = (/** @type {?} */ (null));
            return res;
        }
        catch (e) {
            console.log(e);
            if (dbg.enabled) {
                dbg(`formula %s not evaluated: error %j`, formula, e.message);
            }
            return false;
        }
    }
    /**
     * @param {?} counterName
     * @param {?} firstValue
     * @return {?}
     */
    static nextCounterValue(counterName, firstValue) {
        firstValue = firstValue != null ? firstValue : 0;
        if (this._execContext['$$' + counterName] == null) {
            this._execContext['$$' + counterName] = firstValue;
        }
        else {
            this._execContext['$$' + counterName]++;
        }
        return this._execContext['$$' + counterName];
    }
}
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * This class will define an Ajf condition
 */
class AjfCondition extends AjfValidatedProperty {
    /**
     * this method will get true condition
     * @return {?} AjCondition
     */
    static alwaysCondition() {
        return new AjfCondition({ condition: 'true' });
    }
    /**
     * this method will get false condition
     * @return {?} AjCondition
     */
    static neverCondition() {
        return new AjfCondition({ condition: 'false' });
    }
    /**
     * this method will load an AjfCondition from json
     * @param {?} obj : any - object condition
     * @return {?} AjfCondition
     */
    static fromJson(obj) {
        obj = deepCopy(obj);
        return new AjfCondition(obj);
    }
    /**
     * @param {?=} obj
     */
    constructor(obj) {
        super(obj);
        this.jsonExportedMembers = ['condition'];
        this.condition = obj && obj.condition || '';
    }
    /**
     * @return {?}
     */
    getValidationFormula() { return this.condition; }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfFormula extends AjfValidatedProperty {
    /**
     * this static method will load an AjfFormula from json
     * @param {?} obj : any - object formula
     * @return {?} AjfFormula
     */
    static fromJson(obj) {
        obj = deepCopy(obj);
        return new AjfFormula(obj);
    }
    /**
     *
     * @param {?=} obj
     */
    constructor(obj) {
        super();
        this.jsonExportedMembers = ['formula'];
        this.formula = obj && obj.formula || null;
    }
    /**
     * this method will get validation formula
     * @return {?} string - a validation formula
     */
    getValidationFormula() { return this.formula; }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { AjfJsonSerializable, AjfError, AjfValidatedProperty, AjfCondition, AjfFormula };
//# sourceMappingURL=models.js.map
