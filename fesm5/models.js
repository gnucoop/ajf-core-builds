import { __extends, __spread } from 'tslib';
import * as debug from 'debug';
import debug__default from 'debug';
import * as esprima from 'esprima';
import esprima__default from 'esprima';
import { addDays, addMonths, addYears, endOfISOWeek, format, getDay, parseISO, startOfMonth, startOfISOWeek } from 'date-fns';
import * as numeral from 'numeral';
import numeral__default from 'numeral';

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
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
        get: function () { return 'AjfError'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfError.prototype, "message", {
        get: function () { return this._message; },
        enumerable: true,
        configurable: true
    });
    return AjfError;
}(Error));

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
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
function createCondition(condition) {
    if (condition === void 0) { condition = {}; }
    return { condition: condition.condition || '' };
}

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
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
var AjfConditionSerializer = /** @class */ (function () {
    function AjfConditionSerializer() {
    }
    AjfConditionSerializer.fromJson = function (json) {
        return createCondition(json);
    };
    return AjfConditionSerializer;
}());

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
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
function createFormula(formula) {
    if (formula === void 0) { formula = {}; }
    return { formula: formula.formula || '' };
}

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
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
var AjfFormulaSerializer = /** @class */ (function () {
    function AjfFormulaSerializer() {
    }
    AjfFormulaSerializer.fromJson = function (json) {
        return createFormula(json);
    };
    return AjfFormulaSerializer;
}());

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
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
function alwaysCondition() {
    return createCondition({ condition: 'true' });
}

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
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
var debugConstructor = debug__default || debug;
var dbg = debugConstructor('ajf:models:validated-property');

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
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
var numeralConstructor = numeral__default || numeral;
var dateUtils = {
    addDays: addDays,
    addMonths: addMonths,
    addYears: addYears,
    endOfISOWeek: endOfISOWeek,
    format: format,
    getDay: getDay,
    parse: parseISO,
    startOfMonth: startOfMonth,
    startOfISOWeek: startOfISOWeek
};
function digitCount(x) {
    if (isNaN(x) || typeof (x) !== 'number') {
        return 0;
    }
    if (!isFinite(x)) {
        return Infinity;
    }
    return x.toString().replace(/[^0-9]/g, '').length;
}
function decimalCount(x) {
    if (typeof x === 'string') {
        x = parseFloat(x);
    }
    if (typeof x !== 'number' || isNaN(x)) {
        return 0;
    }
    var parts = x.toString().split('.');
    return parts.length > 1 ? parts[1].length : 0;
}
function isInt(x) {
    if (typeof (x) === 'string') {
        return /^-?\d+$/.test(x);
    }
    if (typeof (x) === 'number') {
        return Math.round(x) === x;
    }
    return false;
}
function notEmpty(x) {
    return (typeof x !== 'undefined' && x !== null ? x.toString().length > 0 : false);
}
function valueInChoice(array, x) {
    return (array || []).indexOf(x) > -1 || array === x;
}
function scanGroupField(reps, acc, callback) {
    for (var i = 0; i < reps; i++) {
        acc = callback(acc, i);
    }
    return acc;
}
function sum(array) {
    return array.reduce(function (a, b) { return a + b; }, 0);
}
function dateOperations(dString, period, operation, v) {
    var fmt = 'mm/dd/yyyy';
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
            return '';
    }
    return dateUtils.format(dateOp(d, v), fmt);
}
function round(num, digits) {
    digits = digits || 0;
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
    var m = Math.pow(10, digits);
    return Math.round(f * m) / m;
}
function extractArray(source, property, property2) {
    source = (source || []).slice(0);
    var l = source.length;
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
function extractSum(source, properties) {
    var sumVal = 0;
    properties = (properties || []).slice(0);
    var l = properties.length;
    for (var i = 0; i < l; i++) {
        var array = extractArray(source, properties[i]);
        var leng = array.length;
        for (var j = 0; j < leng; j++) {
            if (!isNaN(Number(array[j]))) {
                sumVal += Number(array[j]);
            }
        }
    }
    return sumVal;
}
function extractArraySum(source, properties) {
    var arrays = [];
    properties = (properties || []).slice(0);
    for (var i = 0; i < properties.length; i++) {
        var array = extractArray(source, properties[i]);
        arrays.push(array);
    }
    var res = [];
    if (arrays.length > 0) {
        for (var weekI = 0; weekI < arrays[0].length; weekI++) {
            var sumVal = 0;
            for (var propI = 0; propI < properties.length; propI++) {
                sumVal = sumVal + Number(arrays[propI][weekI]);
            }
            res.push(sumVal);
        }
    }
    return res;
}
function drawThreshold(source, property, threshold) {
    source = (source || []).slice(0);
    threshold = threshold || [0];
    if (!(threshold instanceof Array)) {
        threshold = [threshold];
    }
    var l = source.length;
    var res = [];
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
function extractDates(source, property, fmt) {
    source = (source || []).slice(0);
    var l = source.length;
    var res = [];
    var prefix = '';
    for (var i = 0; i < l; i++) {
        if (source[i][property] != null) {
            switch (fmt) {
                case 'WW':
                case 'ww':
                    prefix = 'W';
                    res.push(prefix + formatDate(source[i]['date_start'], fmt));
                    break;
                case 'MM':
                case 'mm':
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
function lastProperty(source, property) {
    source = (source || []).slice(0);
    var l = source.length - 1;
    while (l >= 0 && source[l][property] == null) {
        l--;
        if (l < 0) {
            return '';
        }
    }
    return l >= 0 ? source[l][property] : '';
}
function sumLastProperties(source, properties) {
    source = (source || []).slice(0);
    var sumVal = 0;
    var val = 0;
    for (var i = 0; i < properties.length; i++) {
        val = Number(lastProperty(source, properties[i]));
        if (!isNaN(val)) {
            sumVal += val;
        }
    }
    return sumVal;
}
function calculateTrendProperty(source, property) {
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
    var lastProp = source[last] ? (source[last][property] || 0) : 0;
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
function calculateTrendByProperties(source, properties) {
    var arraysum = extractArraySum(source, properties);
    var lastProp = arraysum.length > 0 ? (arraysum[arraysum.length - 1] || 0) : 0;
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
function calculateAvgProperty(source, property, range, coefficient) {
    source = (source || []).slice(0);
    coefficient = coefficient || 1;
    range = range || 12;
    var l = source.length;
    var res = 0;
    var counter = 0;
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
function calculateAvgPropertyArray(source, properties, range, coefficient) {
    source = (source || []).slice(0);
    var resArr = [];
    if (properties && properties.length > 0) {
        var avg = 0;
        coefficient = coefficient || 1;
        range = range || 12;
        var sourceArr = properties.length > 1 ? extractArraySum(source, properties) :
            extractArray(source, properties[0]);
        var l = sourceArr.length;
        for (var len = l; len > 0; len--) {
            var res = 0;
            var counter = 0;
            var noZero = 0;
            if (len < range) {
                range = len;
            }
            for (var r = 1; r <= range; r++) {
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
function alert(source, property, threshold) {
    source = (source || []).slice(0);
    if (lastProperty(source, property) > threshold) {
        return '<p><i class="material-icons" style="color:red">warning</i></p>';
    }
    else {
        return '<p></p>';
    }
}
function formatNumber(num, fmt) {
    fmt = fmt || '0,0[.]0';
    return numeralConstructor(num).format(fmt);
}
function formatDate(date, fmt) {
    fmt = fmt || 'mm-dd-yyyy';
    return dateUtils.format(date, fmt);
}
function isoMonth(date, fmt) {
    fmt = fmt || 'mm';
    var du = dateUtils;
    return du.format(du.addDays(du.startOfISOWeek(date), 3), fmt);
}
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
 * @license
 * Copyright (C) Gnucoop soc. coop.
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
 * @license
 * Copyright (C) Gnucoop soc. coop.
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
var esprimaMod = esprima__default || esprima;
var tokenize = esprimaMod.tokenize;
var execContext = {};
function evaluateExpression(expression, context, forceFormula) {
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
    var identifiers = tokenize(formula).filter(function (t) { return t.type === 'Identifier'; }).map(function (t) { return t.value; });
    var ctx = [];
    identifiers.forEach(function (key) {
        var val = null;
        if (context != null && context[key] !== undefined) {
            val = context[key];
        }
        else if (AjfExpressionUtils.utils[key] !== undefined) {
            var util = AjfExpressionUtils.utils[key];
            val = util.fn;
        }
        ctx.push(val);
    });
    identifiers.push('execContext');
    ctx.push(execContext);
    try {
        if (dbg.enabled) {
            dbg("evaluating formula %s using context %j", formula, ctx);
        }
        var f = new (Function.bind.apply(Function, __spread([void 0], identifiers, ["return " + formula])))();
        var res = f.apply(void 0, __spread(ctx));
        if (dbg.enabled) {
            dbg("formula %s evaluated: result %s", formula, res);
        }
        f = null;
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
 * @license
 * Copyright (C) Gnucoop soc. coop.
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
function getContextString(context) {
    var fstr = AjfExpressionUtils.UTIL_FUNCTIONS;
    if (context instanceof Array) {
        for (var i = 0; i < context.length; i++) {
            fstr = fstr + "var " + context[i] + " = true;";
        }
    }
    else if (context != null) {
        Object.keys(context).forEach(function (x) {
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
        });
    }
    return fstr;
}

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
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
function neverCondition() {
    return createCondition({ condition: 'false' });
}

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
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
var esprimaMod$1 = esprima__default || esprima;
var tokenize$1 = esprimaMod$1.tokenize;
function normalizeExpression(formula, ancestorsNames, prefix) {
    var ancestorsNameStrings = Object.keys(ancestorsNames);
    var tokens = tokenize$1(formula)
        .filter(function (token) { return token.type == 'Identifier' && token.value != '$value'; })
        .map(function (token) { return token.value; });
    tokens.forEach(function (t) {
        if (ancestorsNameStrings.indexOf(t) > -1) {
            formula = formula.replace(new RegExp("\\b" + t + "\\b", 'g'), t + "__" + prefix.slice(ancestorsNames[t]).join('__'));
        }
    });
    return formula;
}

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
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
var cachedContext = {};
var cachedContextString = '{}';
function validateExpression(str, context) {
    if (context === cachedContext) {
        console.log('cache hit');
    }
    else {
        cachedContext = context;
        cachedContextString = getContextString(context);
    }
    var ctx = cachedContextString;
    try {
        var f = new Function("" + ctx + str);
        dbg("validating formula %s using context %j", str, ctx);
        f();
        dbg("formula %s validated", str);
        f = null;
        return true;
    }
    catch (e) {
        dbg("formula %s not validated: error %j", str, e);
        return false;
    }
}

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
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

/**
 * Generated bundle index. Do not edit.
 */

export { AjfConditionSerializer, AjfError, AjfExpressionUtils, AjfFormulaSerializer, alert, alwaysCondition, calculateAvgProperty, calculateAvgPropertyArray, calculateTrendByProperties, calculateTrendProperty, createCondition, createFormula, dateOperations, dateUtils, dbg, decimalCount, digitCount, drawThreshold, evaluateExpression, extractArray, extractArraySum, extractDates, extractSum, formatDate, formatNumber, getContextString, getCoordinate, isInt, isoMonth, lastProperty, neverCondition, normalizeExpression, notEmpty, round, scanGroupField, sum, sumLastProperties, validateExpression, valueInChoice };
//# sourceMappingURL=models.js.map
