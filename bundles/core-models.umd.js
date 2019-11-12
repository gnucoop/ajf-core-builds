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
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('debug'), require('esprima'), require('date-fns'), require('numeral')) :
    typeof define === 'function' && define.amd ? define('@ajf/core/models', ['exports', 'debug', 'esprima', 'date-fns', 'numeral'], factory) :
    (global = global || self, factory((global.ajf = global.ajf || {}, global.ajf.core = global.ajf.core || {}, global.ajf.core.models = {}), global.debug, global.esprima, global.dateFns, global.numeral));
}(this, function (exports, debug__default, esprima__default, dateFns, numeral__default) { 'use strict';

    var debug__default__default = 'default' in debug__default ? debug__default['default'] : debug__default;
    var esprima__default__default = 'default' in esprima__default ? esprima__default['default'] : esprima__default;
    var numeral__default__default = 'default' in numeral__default ? numeral__default['default'] : numeral__default;

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    var AjfError = /** @class */ (function (_super) {
        __extends(AjfError, _super);
        /**
         * this constructor will init the message error
         */
        function AjfError(message) {
            var _this = _super.call(this, message) || this;
            // Set the prototype explicitly. Workaround needed in TS >= 2.1 when extending built-ins
            // See: https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md
            Object.setPrototypeOf(_this, AjfError.prototype);
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
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @param {?=} condition
     * @return {?}
     */
    function createCondition(condition) {
        if (condition === void 0) { condition = {}; }
        return { condition: condition.condition || '' };
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var AjfConditionSerializer = /** @class */ (function () {
        function AjfConditionSerializer() {
        }
        /**
         * @param {?} json
         * @return {?}
         */
        AjfConditionSerializer.fromJson = /**
         * @param {?} json
         * @return {?}
         */
        function (json) {
            return createCondition(json);
        };
        return AjfConditionSerializer;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @param {?=} formula
     * @return {?}
     */
    function createFormula(formula) {
        if (formula === void 0) { formula = {}; }
        return { formula: formula.formula || '' };
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var AjfFormulaSerializer = /** @class */ (function () {
        function AjfFormulaSerializer() {
        }
        /**
         * @param {?} json
         * @return {?}
         */
        AjfFormulaSerializer.fromJson = /**
         * @param {?} json
         * @return {?}
         */
        function (json) {
            return createFormula(json);
        };
        return AjfFormulaSerializer;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @return {?}
     */
    function alwaysCondition() {
        return createCondition({ condition: 'true' });
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var debugConstructor = debug__default__default || debug__default;
    /** @type {?} */
    var dbg = debugConstructor('ajf:models:validated-property');

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var numeralConstructor = numeral__default__default || numeral__default;
    /** @type {?} */
    var dateUtils = {
        addDays: dateFns.addDays,
        addMonths: dateFns.addMonths,
        addYears: dateFns.addYears,
        endOfISOWeek: dateFns.endOfISOWeek,
        format: dateFns.format,
        getDay: dateFns.getDay,
        parse: dateFns.parse,
        startOfMonth: dateFns.startOfMonth,
        startOfISOWeek: dateFns.startOfISOWeek
    };
    /**
     * @param {?} x
     * @return {?}
     */
    function digitCount(x) {
        if (isNaN(x) || typeof (x) !== 'number') {
            return 0;
        }
        if (!isFinite(x)) {
            return Infinity;
        }
        return x.toString().replace(/[^0-9]/g, '').length;
    }
    /**
     * @param {?} x
     * @return {?}
     */
    function decimalCount(x) {
        if (typeof x === 'string') {
            x = parseFloat(x);
        }
        if (typeof x !== 'number' || isNaN(x)) {
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
        if (typeof (x) === 'string') {
            return /^-?\d+$/.test(x);
        }
        if (typeof (x) === 'number') {
            return Math.round(x) === x;
        }
        return false;
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
            catch (e) {
            }
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
                res.push(Number(source[i][property]) + Number(source[i][property2]));
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
                if (!isNaN(Number(array[j]))) {
                    sumVal += Number(array[j]);
                }
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
                    sumVal = sumVal + Number(arrays[propI][weekI]);
                }
                res.push(sumVal);
            }
        }
        return res;
    }
    /**
     * @param {?} source
     * @param {?} property
     * @param {?} threshold
     * @return {?}
     */
    function drawThreshold(source, property, threshold) {
        source = (source || []).slice(0);
        threshold = threshold || [0];
        if (!(threshold instanceof Array)) {
            threshold = [threshold];
        }
        /** @type {?} */
        var l = source.length;
        /** @type {?} */
        var res = [];
        /** @type {?} */
        var count = 0;
        for (var i = 0; i < l; i++) {
            if (source[i][property] != null) {
                if (threshold.length > count) {
                    res.push(threshold[count]);
                }
                else {
                    res.push(threshold[0]);
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
                        res.push(prefix + formatDate(source[i]['date_start'], fmt));
                        break;
                    case 'MM':
                        prefix = 'M';
                        res.push(prefix + isoMonth(source[i]['date_start'], fmt));
                        break;
                    default:
                        prefix = '';
                        res.push(prefix + formatDate(source[i]['date_start'], fmt));
                }
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
        /** @type {?} */
        var val = 0;
        for (var i = 0; i < properties.length; i++) {
            val = Number(lastProperty(source, properties[i]));
            if (!isNaN(val)) {
                sumVal += val;
            }
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
                res += Number(source[l - 1][property]);
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
            var sourceArr = properties.length > 1 ? extractArraySum(source, properties) :
                extractArray(source, properties[0]);
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
                        res += Number(val);
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
     * @param {?} threshold
     * @return {?}
     */
    function alert(source, property, threshold) {
        source = (source || []).slice(0);
        if (lastProperty(source, property) > threshold) {
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
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var AjfExpressionUtils = /** @class */ (function () {
        function AjfExpressionUtils() {
        }
        AjfExpressionUtils.UTIL_FUNCTIONS = '';
        AjfExpressionUtils.utils = {
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
        return AjfExpressionUtils;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var esprimaMod = esprima__default__default || esprima__default;
    var tokenize = esprimaMod.tokenize;
    /** @type {?} */
    var execContext = {};
    /**
     * @param {?} expression
     * @param {?=} context
     * @param {?=} forceFormula
     * @return {?}
     */
    function evaluateExpression(expression, context, forceFormula) {
        /** @type {?} */
        var formula = forceFormula || expression || '';
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
        var identifiers = tokenize(formula).filter((/**
         * @param {?} t
         * @return {?}
         */
        function (t) { return t.type === 'Identifier'; })).map((/**
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
            else if (AjfExpressionUtils.utils[key] !== undefined) {
                /** @type {?} */
                var util = AjfExpressionUtils.utils[key];
                val = util.fn;
            }
            ctx.push(val);
        }));
        identifiers.push('execContext');
        ctx.push(execContext);
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
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?=} context
     * @return {?}
     */
    function getContextString(context) {
        /** @type {?} */
        var fstr = AjfExpressionUtils.UTIL_FUNCTIONS;
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
                if (val == null || isNaN(Number(val)) || val === '' || val instanceof Array) {
                    if (val instanceof Array) {
                        for (var i = 0; i < val.length; i++) {
                            val[i] =
                                (val == null || isNaN(Number(val[i])) || val[i] === '') && val[i] || Number(val[i]);
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
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @return {?}
     */
    function neverCondition() {
        return createCondition({ condition: 'false' });
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var esprimaMod$1 = esprima__default__default || esprima__default;
    var tokenize$1 = esprimaMod$1.tokenize;
    /**
     * @param {?} formula
     * @param {?} ancestorsNames
     * @param {?} prefix
     * @return {?}
     */
    function normalizeExpression(formula, ancestorsNames, prefix) {
        /** @type {?} */
        var ancestorsNameStrings = Object.keys(ancestorsNames);
        /** @type {?} */
        var tokens = tokenize$1(formula)
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
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var cachedContext = {};
    /** @type {?} */
    var cachedContextString = '{}';
    /**
     * @param {?} str
     * @param {?=} context
     * @return {?}
     */
    function validateExpression(str, context) {
        if (context === cachedContext) {
            console.log('cache hit');
        }
        else {
            cachedContext = context;
            cachedContextString = getContextString(context);
        }
        /** @type {?} */
        var ctx = cachedContextString;
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
    }

    exports.AjfConditionSerializer = AjfConditionSerializer;
    exports.AjfError = AjfError;
    exports.AjfExpressionUtils = AjfExpressionUtils;
    exports.AjfFormulaSerializer = AjfFormulaSerializer;
    exports.alert = alert;
    exports.alwaysCondition = alwaysCondition;
    exports.calculateAvgProperty = calculateAvgProperty;
    exports.calculateAvgPropertyArray = calculateAvgPropertyArray;
    exports.calculateTrendByProperties = calculateTrendByProperties;
    exports.calculateTrendProperty = calculateTrendProperty;
    exports.createCondition = createCondition;
    exports.createFormula = createFormula;
    exports.dateOperations = dateOperations;
    exports.dateUtils = dateUtils;
    exports.dbg = dbg;
    exports.decimalCount = decimalCount;
    exports.digitCount = digitCount;
    exports.drawThreshold = drawThreshold;
    exports.evaluateExpression = evaluateExpression;
    exports.extractArray = extractArray;
    exports.extractArraySum = extractArraySum;
    exports.extractDates = extractDates;
    exports.extractSum = extractSum;
    exports.formatDate = formatDate;
    exports.formatNumber = formatNumber;
    exports.getContextString = getContextString;
    exports.getCoordinate = getCoordinate;
    exports.isInt = isInt;
    exports.isoMonth = isoMonth;
    exports.lastProperty = lastProperty;
    exports.neverCondition = neverCondition;
    exports.normalizeExpression = normalizeExpression;
    exports.notEmpty = notEmpty;
    exports.round = round;
    exports.scanGroupField = scanGroupField;
    exports.sum = sum;
    exports.sumLastProperties = sumLastProperties;
    exports.validateExpression = validateExpression;
    exports.valueInChoice = valueInChoice;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=core-models.umd.js.map
