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
import * as dateFns from 'date-fns';
import { tokenize } from 'esprima';
import * as numbroMod from 'numbro';
let execContext = {};
const numbro = numbroMod.default || numbroMod;
const MAX_REPS = 30;
export const dateUtils = {
    addDays: dateFns.addDays,
    addMonths: dateFns.addMonths,
    addYears: dateFns.addYears,
    endOfISOWeek: dateFns.endOfISOWeek,
    format: dateFns.format,
    getDay: dateFns.getDay,
    parse: dateFns.parseISO,
    startOfMonth: dateFns.startOfMonth,
    startOfISOWeek: dateFns.startOfISOWeek,
};
export class AjfExpressionUtils {
}
// TODO what is it for
AjfExpressionUtils.UTIL_FUNCTIONS = '';
/**
 * It is a key-value dictionary, that mapping all Ajf validation functions.
 */
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
    Date: { fn: Date },
    COUNTFORMS: { fn: COUNTFORMS },
    COUNTFORMS_UNIQUE: { fn: COUNTFORMS_UNIQUE },
    SUM: { fn: SUM },
    MEAN: { fn: MEAN },
    PERCENT: { fn: PERCENT },
    LAST: { fn: LAST },
    MAX: { fn: MAX },
    MEDIAN: { fn: MEDIAN },
    MODE: { fn: MODE },
};
export function evaluateExpression(expression, context, forceFormula) {
    let formula = forceFormula || expression || '';
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
    const identifiers = tokenize(formula)
        .filter((t) => t.type === 'Identifier')
        .map((t) => t.value);
    const ctx = [];
    identifiers.forEach((key) => {
        let val = null;
        if (context != null && context[key] !== undefined) {
            val = context[key];
        }
        else if (AjfExpressionUtils.utils[key] !== undefined) {
            const util = AjfExpressionUtils.utils[key];
            val = util.fn;
        }
        ctx.push(val);
    });
    identifiers.push('execContext');
    ctx.push(execContext);
    try {
        let f = new Function(...identifiers, `return ${formula}`);
        const res = f(...ctx);
        f = null;
        return res;
    }
    catch (e) {
        return false;
    }
}
/**
 * It returns the count of digit inside x.
 */
export function digitCount(x) {
    if (isNaN(x) || typeof x !== 'number') {
        return 0;
    }
    if (!isFinite(x)) {
        return Infinity;
    }
    return x.toString().replace(/[^0-9]/g, '').length;
}
/**
 * It is count the count of decimal digit inside s.
 */
export function decimalCount(x) {
    if (typeof x === 'string') {
        x = parseFloat(x);
    }
    if (typeof x !== 'number' || isNaN(x)) {
        return 0;
    }
    const parts = x.toString().split('.');
    return parts.length > 1 ? parts[1].length : 0;
}
/**
 * It is true if x is an integer.
 */
export function isInt(x) {
    if (typeof x === 'string') {
        return /^-?\d+$/.test(x);
    }
    if (typeof x === 'number') {
        return Math.round(x) === x;
    }
    return false;
}
/**
 * It is true if x is not empty.
 */
export function notEmpty(x) {
    return typeof x !== 'undefined' && x !== null ? x.toString().length > 0 : false;
}
/**
 * It is true if array contains x or array is equal to x.
 */
export function valueInChoice(array, x) {
    return (array || []).indexOf(x) > -1 || array === x;
}
/**
 * It applies callback for reps times and accumulate the result in acc.
 */
export function scanGroupField(reps, acc, callback) {
    for (let i = 0; i < reps; i++) {
        acc = callback(acc, i);
    }
    return acc;
}
/**
 * It returns the sum of the array values.
 */
export function sum(array) {
    return array.reduce((a, b) => a + b, 0);
}
/**
 * It applies add/remove(operation) v (day/month/year)period to dstring and return new format date.
 */
// TODO check if deprecated instead refacotoring parameter type
// TODO (dString: string|null, period:'day'|'month'|'year',
// TODO operation: 'add/remove' = 'add', v:number)
export function dateOperations(dString, period, operation, v) {
    const fmt = 'mm/dd/yyyy';
    let d = typeof dString !== 'undefined' ? dateUtils.parse(dString) : new Date();
    if (operation == 'remove') {
        v = -v;
    }
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
 * It rounds the num with the value of digits
 */
export function round(num, digits) {
    digits = digits || 0;
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
    const m = Math.pow(10, digits);
    return Math.round(f * m) / m;
}
/**
 * It extracts property from source.
 * for every element of source if property and property2 are defined return the sum
 * else if only property is defined return him.
 */
export function extractArray(source, property, property2) {
    source = (source || []).slice(0);
    const l = source.length;
    const res = [];
    for (let i = 0; i < l; i++) {
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
 * It returns the sum of all defined properties of each element of source.
 */
export function extractSum(source, properties) {
    let sumVal = 0;
    properties = (properties || []).slice(0);
    const l = properties.length;
    for (let i = 0; i < l; i++) {
        const array = extractArray(source, properties[i]);
        const leng = array.length;
        for (let j = 0; j < leng; j++) {
            if (!isNaN(Number(array[j]))) {
                sumVal += Number(array[j]);
            }
        }
    }
    return sumVal;
}
/**
 * It returns a number array that contains the sum of properties value inside the source.
 * extractArraySum([{a: 5}, {b: 1}, {a: 5, b: 1}], ['a', 'b']); =&gt; [6,6]
 */
export function extractArraySum(source, properties) {
    const arrays = [];
    properties = (properties || []).slice(0);
    for (let i = 0; i < properties.length; i++) {
        const array = extractArray(source, properties[i]);
        arrays.push(array);
    }
    const res = [];
    if (arrays.length > 0) {
        for (let weekI = 0; weekI < arrays[0].length; weekI++) {
            let sumVal = 0;
            for (let propI = 0; propI < properties.length; propI++) {
                sumVal = sumVal + Number(arrays[propI][weekI]);
            }
            res.push(sumVal);
        }
    }
    return res;
}
/**
 * Draw a threshold line on chart related to the property.
 */
export function drawThreshold(source, property, threshold) {
    source = (source || []).slice(0);
    threshold = threshold || [0];
    if (!(threshold instanceof Array)) {
        threshold = [threshold];
    }
    const l = source.length;
    const res = [];
    let count = 0;
    for (let i = 0; i < l; i++) {
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
 * Extract the dates of the source object with property != null
 */
export function extractDates(source, property, fmt) {
    source = (source || []).slice(0);
    const l = source.length;
    const res = [];
    let prefix = '';
    for (let i = 0; i < l; i++) {
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
/**
 * Extract the last property contains in source != null
 */
export function lastProperty(source, property) {
    source = (source || []).slice(0);
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
 * It sum the LAst properties of source.
 */
export function sumLastProperties(source, properties) {
    source = (source || []).slice(0);
    let sumVal = 0;
    let val = 0;
    for (let i = 0; i < properties.length; i++) {
        val = Number(lastProperty(source, properties[i]));
        if (!isNaN(val)) {
            sumVal += val;
        }
    }
    return sumVal;
}
/**
 * Compute the trend of the property contained on the source.
 */
export function calculateTrendProperty(source, property) {
    source = (source || []).slice(0);
    let last = source.length - 1;
    while (source[last][property] == null) {
        if (last == 0) {
            break;
        }
        last--;
    }
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
    const lastProp = source[last] ? source[last][property] || 0 : 0;
    const lastLastProp = source[lastLast] ? source[lastLast][property] || 0 : 0;
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
 * Compute the average value of the property contained on the source.
 */
export function calculateTrendByProperties(source, properties) {
    const arraysum = extractArraySum(source, properties);
    const lastProp = arraysum.length > 0 ? arraysum[arraysum.length - 1] || 0 : 0;
    const lastLastProp = arraysum.length > 1 ? arraysum[arraysum.length - 2] || 0 : lastProp;
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
 *
 */
export function calculateAvgProperty(source, property, range, coefficient) {
    source = (source || []).slice(0);
    coefficient = coefficient || 1;
    range = range || 12;
    let l = source.length;
    let res = 0;
    let counter = 0;
    let noZero = 0;
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
export function calculateAvgPropertyArray(source, properties, range, coefficient) {
    source = (source || []).slice(0);
    const resArr = [];
    if (properties && properties.length > 0) {
        let avg = 0;
        coefficient = coefficient || 1;
        range = range || 12;
        const sourceArr = properties.length > 1
            ? extractArraySum(source, properties)
            : extractArray(source, properties[0]);
        let l = sourceArr.length;
        for (let len = l; len > 0; len--) {
            let res = 0;
            let counter = 0;
            let noZero = 0;
            if (len < range) {
                range = len;
            }
            for (let r = 1; r <= range; r++) {
                let val = sourceArr[len - r];
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
export function alert(source, property, threshold) {
    source = (source || []).slice(0);
    if (lastProperty(source, property) > threshold) {
        return '<p><i class="material-icons" style="color:red">warning</i></p>';
    }
    else {
        return '<p></p>';
    }
}
export function formatNumber(num, fmt) {
    fmt = fmt || '0,0[.]0';
    return numbro(num).format(fmt);
}
export function formatDate(date, fmt) {
    fmt = fmt || 'mm-DD-yyyy';
    return dateUtils.format(typeof date === 'string' ? dateUtils.parse(date) : date, fmt);
}
export function isoMonth(date, fmt) {
    fmt = fmt || 'mm';
    const du = dateUtils;
    return du.format(du.addDays(du.startOfISOWeek(date), 3), fmt);
}
export function getCoordinate(source, zoom) {
    zoom = zoom || 6;
    if (source == null) {
        return [51.505, -0.09, zoom];
    }
    else {
        return [source[0], source[1], zoom];
    }
}
/**
 * Counts the collected forms. The form name must be specified. An optional condition can be added
 * to discriminate which forms to count in.
 */
export function COUNTFORMS(forms, expression = 'true') {
    forms = (forms || []).slice(0);
    if (expression === 'true') {
        return forms.length;
    }
    if (forms.length === 0) {
        return 0;
    }
    const isInRepeatingSlide = expression.includes(`__`);
    if (isInRepeatingSlide) {
        let count = 0;
        forms.forEach(f => {
            for (let i = 0; i <= MAX_REPS; i++) {
                if (Object.keys(f).filter(key => key.includes(`__${i}`)).length === 0) {
                    break;
                }
                if ((evaluateExpression(expression.replace('__', `__${i}`)), f)) {
                    count++;
                }
            }
        });
        return count;
    }
    else {
        return forms.filter(f => evaluateExpression(expression, f)).length;
    }
}
/**
 * Counts the amount of unique form values for a specific field. The form name must be specified. An
 * optional condition can be added to discriminate which forms to count in
 */
export function COUNTFORMS_UNIQUE(forms, fieldName, expression) {
    forms = (forms || []).slice(0);
    const values = [];
    if (expression != null) {
        forms = forms.filter(f => evaluateExpression(expression, f));
    }
    forms.forEach(f => {
        values.push(evaluateExpression(fieldName, f));
    });
    return Array.from(new Set(values)).length;
}
/**
 * Aggregates and sums the values of one or more. An optional condition can be added to discriminate
 * which forms to take for the sum.
 */
export function SUM(forms, expression, condition) {
    let acc = 0;
    forms = (forms || []).slice(0);
    if (expression == null) {
        return 0;
    }
    if (condition != null) {
        forms = forms.filter(f => evaluateExpression(condition, f));
    }
    const isInRepeatingSlide = expression.includes(`__`);
    if (isInRepeatingSlide) {
        forms.forEach(f => {
            for (let i = 0; i <= MAX_REPS; i++) {
                if (Object.keys(f).filter(key => key.includes(`__${i}`)).length === 0) {
                    break;
                }
                const evaluatedExpression = evaluateExpression(expression.replace('__', `__${i}`), f);
                if (Number.isFinite(evaluateExpression)) {
                    acc += evaluatedExpression;
                }
            }
        });
    }
    else {
        forms.forEach(f => (acc += evaluateExpression(expression, f)));
    }
    return acc;
}
/**
 * Calculates the mean of a simple or derived value. An optional condition can be added to
 * discriminate which forms to take for the sum.
 */
export function MEAN(forms, expression) {
    forms = (forms || []).slice(0);
    expression = expression || '';
    const length = forms.length;
    if (length === 0) {
        return 0;
    }
    let acc = 0;
    forms.forEach(f => {
        acc += evaluateExpression(expression, f);
    });
    return Math.trunc(acc / length);
}
/**
 * Calculates the % between two members.
 */
export function PERCENT(value1, value2) {
    const res = +value1 / +value2;
    return Number.isFinite(res) ? `${res}%` : 'err';
}
/**
 * Calculates the expression in the last form by date.
 */
export function LAST(forms, expression, date = 'date_end') {
    forms = (forms || []).slice(0).sort((a, b) => {
        const dateA = new Date(b[date]).getTime();
        const dateB = new Date(a[date]).getTime();
        return dateA - dateB;
    });
    if (forms.length > 0 && expression != null) {
        const lastForm = forms[forms.length - 1] || [];
        return evaluateExpression(expression, lastForm);
    }
    return 0;
}
/**
 * Calculates the max value of the field.
 */
export function MAX(forms, fieldName) {
    forms = (forms || []).slice(0);
    let max = 0;
    forms.forEach(form => {
        if (form[fieldName] != null &&
            !isNaN(form[fieldName]) &&
            form[fieldName] > max) {
            max = form[fieldName];
        }
    });
    return max;
}
/**
 * Calculates the median value of the field.
 */
export function MEDIAN(forms, fieldName) {
    forms = (forms || []).slice(0);
    const numbers = forms
        .filter(f => f[fieldName] != null && !isNaN(f[fieldName]))
        .map(f => f[fieldName])
        .sort((a, b) => a - b)
        .filter((item, pos, self) => self.indexOf(item) == pos);
    return Number.isInteger(numbers.length / 2)
        ? numbers[numbers.length / 2]
        : (numbers[+parseInt(`${numbers.length - 1 / 2}`) / 2] +
            numbers[+parseInt(`${numbers.length - 1 / 2}`) / 2 + 1]) /
            2;
}
/**
 * Calculates the mode value of the field.
 */
export function MODE(forms, fieldName) {
    forms = (forms || []).slice(0);
    let maxCount = 0;
    const map = {};
    forms.forEach(f => {
        const value = f[fieldName];
        if (value != null) {
            map[value] = map[value] != null ? map[value] + 1 : 1;
        }
        if (map[value] > maxCount) {
            maxCount = map[value];
        }
    });
    return Object.keys(map)
        .filter(v => map[+v] === maxCount)
        .map(v => +v);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwcmVzc2lvbi11dGlscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL21vZGVscy91dGlscy9leHByZXNzaW9uLXV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUdILE9BQU8sS0FBSyxPQUFPLE1BQU0sVUFBVSxDQUFDO0FBQ3BDLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxTQUFTLENBQUM7QUFDakMsT0FBTyxLQUFLLFNBQVMsTUFBTSxRQUFRLENBQUM7QUFJcEMsSUFBSSxXQUFXLEdBQVEsRUFBRSxDQUFDO0FBRTFCLE1BQU0sTUFBTSxHQUFHLFNBQVMsQ0FBQyxPQUFPLElBQUksU0FBUyxDQUFDO0FBSzlDLE1BQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQztBQUVwQixNQUFNLENBQUMsTUFBTSxTQUFTLEdBQUc7SUFDdkIsT0FBTyxFQUFFLE9BQU8sQ0FBQyxPQUFPO0lBQ3hCLFNBQVMsRUFBRSxPQUFPLENBQUMsU0FBUztJQUM1QixRQUFRLEVBQUUsT0FBTyxDQUFDLFFBQVE7SUFDMUIsWUFBWSxFQUFFLE9BQU8sQ0FBQyxZQUFZO0lBQ2xDLE1BQU0sRUFBRSxPQUFPLENBQUMsTUFBTTtJQUN0QixNQUFNLEVBQUUsT0FBTyxDQUFDLE1BQU07SUFDdEIsS0FBSyxFQUFFLE9BQU8sQ0FBQyxRQUFRO0lBQ3ZCLFlBQVksRUFBRSxPQUFPLENBQUMsWUFBWTtJQUNsQyxjQUFjLEVBQUUsT0FBTyxDQUFDLGNBQWM7Q0FDdkMsQ0FBQztBQUVGLE1BQU0sT0FBTyxrQkFBa0I7O0FBQzdCLHNCQUFzQjtBQUNmLGlDQUFjLEdBQUcsRUFBRSxDQUFDO0FBQzNCOztHQUVHO0FBQ0ksd0JBQUssR0FBc0M7SUFDaEQsVUFBVSxFQUFFLEVBQUMsRUFBRSxFQUFFLFVBQVUsRUFBQztJQUM1QixZQUFZLEVBQUUsRUFBQyxFQUFFLEVBQUUsWUFB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QUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDL0IsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDO0lBQ2pCLE1BQU0sR0FBRyxHQUE0QixFQUFFLENBQUM7SUFDeEMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTtRQUNoQixNQUFNLEtBQUssR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFXLENBQUM7UUFDckMsSUFBSSxLQUFLLElBQUksSUFBSSxFQUFFO1lBQ2pCLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDdEQ7UUFDRCxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxRQUFRLEVBQUU7WUFDekIsUUFBUSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUN2QjtJQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztTQUNwQixNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxRQUFRLENBQUM7U0FDakMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNsQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkNvbnRleHR9IGZyb20gJ0BhamYvY29yZS9jb21tb24nO1xuaW1wb3J0ICogYXMgZGF0ZUZucyBmcm9tICdkYXRlLWZucyc7XG5pbXBvcnQge3Rva2VuaXplfSBmcm9tICdlc3ByaW1hJztcbmltcG9ydCAqIGFzIG51bWJyb01vZCBmcm9tICdudW1icm8nO1xuXG5pbXBvcnQge0FqZlZhbGlkYXRpb25Gbn0gZnJvbSAnLi4vaW50ZXJmYWNlL3ZhbGlkYXRpb24tZnVuY3Rpb24nO1xuXG5sZXQgZXhlY0NvbnRleHQ6IGFueSA9IHt9O1xuXG5jb25zdCBudW1icm8gPSBudW1icm9Nb2QuZGVmYXVsdCB8fCBudW1icm9Nb2Q7XG5leHBvcnQgaW50ZXJmYWNlIEZvcm0ge1xuICBba2V5OiBzdHJpbmddOiBzdHJpbmcgfCBudW1iZXIgfCBudWxsO1xufVxuXG5jb25zdCBNQVhfUkVQUyA9IDMwO1xuXG5leHBvcnQgY29uc3QgZGF0ZVV0aWxzID0ge1xuICBhZGREYXlzOiBkYXRlRm5zLmFkZERheXMsXG4gIGFkZE1vbnRoczogZGF0ZUZucy5hZGRNb250aHMsXG4gIGFkZFllYXJzOiBkYXRlRm5zLmFkZFllYXJzLFxuICBlbmRPZklTT1dlZWs6IGRhdGVGbnMuZW5kT2ZJU09XZWVrLFxuICBmb3JtYXQ6IGRhdGVGbnMuZm9ybWF0LFxuICBnZXREYXk6IGRhdGVGbnMuZ2V0RGF5LFxuICBwYXJzZTogZGF0ZUZucy5wYXJzZUlTTyxcbiAgc3RhcnRPZk1vbnRoOiBkYXRlRm5zLnN0YXJ0T2ZNb250aCxcbiAgc3RhcnRPZklTT1dlZWs6IGRhdGVGbnMuc3RhcnRPZklTT1dlZWssXG59O1xuXG5leHBvcnQgY2xhc3MgQWpmRXhwcmVzc2lvblV0aWxzIHtcbiAgLy8gVE9ETyB3aGF0IGlzIGl0IGZvclxuICBzdGF0aWMgVVRJTF9GVU5DVElPTlMgPSAnJztcbiAgLyoqXG4gICAqIEl0IGlzIGEga2V5LXZhbHVlIGRpY3Rpb25hcnksIHRoYXQgbWFwcGluZyBhbGwgQWpmIHZhbGlkYXRpb24gZnVuY3Rpb25zLlxuICAgKi9cbiAgc3RhdGljIHV0aWxzOiB7W25hbWU6IHN0cmluZ106IEFqZlZhbGlkYXRpb25Gbn0gPSB7XG4gICAgZGlnaXRDb3VudDoge2ZuOiBkaWdpdENvdW50fSxcbiAgICBkZWNpbWFsQ291bnQ6IHtmbjogZGVjaW1hbENvdW50fSxcbiAgICBpc0ludDoge2ZuOiBpc0ludH0sXG4gICAgbm90RW1wdHk6IHtmbjogbm90RW1wdHl9LFxuICAgIHZhbHVlSW5DaG9pY2U6IHtmbjogdmFsdWVJbkNob2ljZX0sXG4gICAgc2Nhbkdyb3VwRmllbGQ6IHtmbjogc2Nhbkdyb3VwRmllbGR9LFxuICAgIHN1bToge2ZuOiBzdW19LFxuICAgIGRhdGVPcGVyYXRpb25zOiB7Zm46IGRhdGVPcGVyYXRpb25zfSxcbiAgICByb3VuZDoge2ZuOiByb3VuZH0sXG4gICAgZXh0cmFjdEFycmF5OiB7Zm46IGV4dHJhY3RBcnJheX0sXG4gICAgZXh0cmFjdFN1bToge2ZuOiBleHRyYWN0U3VtfSxcbiAgICBleHRyYWN0QXJyYXlTdW06IHtmbjogZXh0cmFjdEFycmF5U3VtfSxcbiAgICBkcmF3VGhyZXNob2xkOiB7Zm46IGRyYXdUaHJlc2hvbGR9LFxuICAgIGV4dHJhY3REYXRlczoge2ZuOiBleHRyYWN0RGF0ZXN9LFxuICAgIGxhc3RQcm9wZXJ0eToge2ZuOiBsYXN0UHJvcGVydHl9LFxuICAgIHN1bUxhc3RQcm9wZXJ0aWVzOiB7Zm46IHN1bUxhc3RQcm9wZXJ0aWVzfSxcbiAgICBjYWxjdWxhdGVUcmVuZFByb3BlcnR5OiB7Zm46IGNhbGN1bGF0ZVRyZW5kUHJvcGVydHl9LFxuICAgIGNhbGN1bGF0ZVRyZW5kQnlQcm9wZXJ0aWVzOiB7Zm46IGNhbGN1bGF0ZVRyZW5kQnlQcm9wZXJ0aWVzfSxcbiAgICBjYWxjdWxhdGVBdmdQcm9wZXJ0eToge2ZuOiBjYWxjdWxhdGVBdmdQcm9wZXJ0eX0sXG4gICAgY2FsY3VsYXRlQXZnUHJvcGVydHlBcnJheToge2ZuOiBjYWxjdWxhdGVBdmdQcm9wZXJ0eUFycmF5fSxcbiAgICBhbGVydDoge2ZuOiBhbGVydH0sXG4gICAgZm9ybWF0TnVtYmVyOiB7Zm46IGZvcm1hdE51bWJlcn0sXG4gICAgZm9ybWF0RGF0ZToge2ZuOiBmb3JtYXREYXRlfSxcbiAgICBpc29Nb250aDoge2ZuOiBpc29Nb250aH0sXG4gICAgZ2V0Q29vcmRpbmF0ZToge2ZuOiBnZXRDb29yZGluYXRlfSxcbiAgICBNYXRoOiB7Zm46IE1hdGh9LFxuICAgIHBhcnNlSW50OiB7Zm46IHBhcnNlSW50fSxcbiAgICBwYXJzZUZsb2F0OiB7Zm46IHBhcnNlRmxvYXR9LFxuICAgIHBhcnNlRGF0ZToge2ZuOiBkYXRlVXRpbHMucGFyc2V9LFxuICAgIERhdGU6IHtmbjogRGF0ZX0sXG4gICAgQ09VTlRGT1JNUzoge2ZuOiBDT1VOVEZPUk1TfSxcbiAgICBDT1VOVEZPUk1TX1VOSVFVRToge2ZuOiBDT1VOVEZPUk1TX1VOSVFVRX0sXG4gICAgU1VNOiB7Zm46IFNVTX0sXG4gICAgTUVBTjoge2ZuOiBNRUFOfSxcbiAgICBQRVJDRU5UOiB7Zm46IFBFUkNFTlR9LFxuICAgIExBU1Q6IHtmbjogTEFTVH0sXG4gICAgTUFYOiB7Zm46IE1BWH0sXG4gICAgTUVESUFOOiB7Zm46IE1FRElBTn0sXG4gICAgTU9ERToge2ZuOiBNT0RFfSxcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGV2YWx1YXRlRXhwcmVzc2lvbihcbiAgZXhwcmVzc2lvbjogc3RyaW5nLFxuICBjb250ZXh0PzogQWpmQ29udGV4dCxcbiAgZm9yY2VGb3JtdWxhPzogc3RyaW5nLFxuKTogYW55IHtcbiAgbGV0IGZvcm11bGEgPSBmb3JjZUZvcm11bGEgfHwgZXhwcmVzc2lvbiB8fCAnJztcbiAgaWYgKGZvcm11bGEgPT09ICcnKSB7XG4gICAgcmV0dXJuICcnO1xuICB9XG4gIGlmIChmb3JtdWxhID09PSAndHJ1ZScpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBpZiAoZm9ybXVsYSA9PT0gJ2ZhbHNlJykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpZiAoY29udGV4dCAhPSBudWxsICYmIGNvbnRleHRbZm9ybXVsYV0gIT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBjb250ZXh0W2Zvcm11bGFdO1xuICB9XG4gIGlmICgvXlwiW15cIl0qXCIkLy50ZXN0KGZvcm11bGEpKSB7XG4gICAgcmV0dXJuIGZvcm11bGEucmVwbGFjZSgvXlwiK3xcIiskL2csICcnKTtcbiAgfVxuICBjb25zdCBpZGVudGlmaWVycyA9IHRva2VuaXplKGZvcm11bGEpXG4gICAgLmZpbHRlcigodDogYW55KSA9PiB0LnR5cGUgPT09ICdJZGVudGlmaWVyJylcbiAgICAubWFwKCh0OiBhbnkpID0+IHQudmFsdWUpO1xuICBjb25zdCBjdHg6IGFueVtdID0gW107XG4gIGlkZW50aWZpZXJzLmZvckVhY2goKGtleTogc3RyaW5nKSA9PiB7XG4gICAgbGV0IHZhbDogYW55ID0gbnVsbDtcbiAgICBpZiAoY29udGV4dCAhPSBudWxsICYmIGNvbnRleHRba2V5XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB2YWwgPSBjb250ZXh0W2tleV07XG4gICAgfSBlbHNlIGlmIChBamZFeHByZXNzaW9uVXRpbHMudXRpbHNba2V5XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb25zdCB1dGlsID0gQWpmRXhwcmVzc2lvblV0aWxzLnV0aWxzW2tleV07XG4gICAgICB2YWwgPSB1dGlsLmZuO1xuICAgIH1cbiAgICBjdHgucHVzaCh2YWwpO1xuICB9KTtcbiAgaWRlbnRpZmllcnMucHVzaCgnZXhlY0NvbnRleHQnKTtcbiAgY3R4LnB1c2goZXhlY0NvbnRleHQpO1xuXG4gIHRyeSB7XG4gICAgbGV0IGYgPSBuZXcgRnVuY3Rpb24oLi4uaWRlbnRpZmllcnMsIGByZXR1cm4gJHtmb3JtdWxhfWApO1xuICAgIGNvbnN0IHJlcyA9IGYoLi4uY3R4KTtcbiAgICBmID0gPGFueT5udWxsO1xuICAgIHJldHVybiByZXM7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cbi8qKlxuICogSXQgcmV0dXJucyB0aGUgY291bnQgb2YgZGlnaXQgaW5zaWRlIHguXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkaWdpdENvdW50KHg6IG51bWJlcik6IG51bWJlciB7XG4gIGlmIChpc05hTih4KSB8fCB0eXBlb2YgeCAhPT0gJ251bWJlcicpIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuICBpZiAoIWlzRmluaXRlKHgpKSB7XG4gICAgcmV0dXJuIEluZmluaXR5O1xuICB9XG4gIHJldHVybiB4LnRvU3RyaW5nKCkucmVwbGFjZSgvW14wLTldL2csICcnKS5sZW5ndGg7XG59XG4vKipcbiAqIEl0IGlzIGNvdW50IHRoZSBjb3VudCBvZiBkZWNpbWFsIGRpZ2l0IGluc2lkZSBzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZGVjaW1hbENvdW50KHg6IHN0cmluZyB8IG51bWJlcik6IG51bWJlciB7XG4gIGlmICh0eXBlb2YgeCA9PT0gJ3N0cmluZycpIHtcbiAgICB4ID0gcGFyc2VGbG9hdCh4KTtcbiAgfVxuICBpZiAodHlwZW9mIHggIT09ICdudW1iZXInIHx8IGlzTmFOKHgpKSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cbiAgY29uc3QgcGFydHMgPSB4LnRvU3RyaW5nKCkuc3BsaXQoJy4nKTtcbiAgcmV0dXJuIHBhcnRzLmxlbmd0aCA+IDEgPyBwYXJ0c1sxXS5sZW5ndGggOiAwO1xufVxuLyoqXG4gKiBJdCBpcyB0cnVlIGlmIHggaXMgYW4gaW50ZWdlci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzSW50KHg6IHN0cmluZyB8IG51bWJlcik6IGJvb2xlYW4ge1xuICBpZiAodHlwZW9mIHggPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIC9eLT9cXGQrJC8udGVzdCh4KTtcbiAgfVxuICBpZiAodHlwZW9mIHggPT09ICdudW1iZXInKSB7XG4gICAgcmV0dXJuIE1hdGgucm91bmQoeCkgPT09IHg7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuLyoqXG4gKiBJdCBpcyB0cnVlIGlmIHggaXMgbm90IGVtcHR5LlxuICovXG5leHBvcnQgZnVuY3Rpb24gbm90RW1wdHkoeDogYW55KTogYm9vbGVhbiB7XG4gIHJldHVybiB0eXBlb2YgeCAhPT0gJ3VuZGVmaW5lZCcgJiYgeCAhPT0gbnVsbCA/IHgudG9TdHJpbmcoKS5sZW5ndGggPiAwIDogZmFsc2U7XG59XG4vKipcbiAqIEl0IGlzIHRydWUgaWYgYXJyYXkgY29udGFpbnMgeCBvciBhcnJheSBpcyBlcXVhbCB0byB4LlxuICovXG5leHBvcnQgZnVuY3Rpb24gdmFsdWVJbkNob2ljZShhcnJheTogYW55W10sIHg6IGFueSk6IGJvb2xlYW4ge1xuICByZXR1cm4gKGFycmF5IHx8IFtdKS5pbmRleE9mKHgpID4gLTEgfHwgYXJyYXkgPT09IHg7XG59XG4vKipcbiAqIEl0IGFwcGxpZXMgY2FsbGJhY2sgZm9yIHJlcHMgdGltZXMgYW5kIGFjY3VtdWxhdGUgdGhlIHJlc3VsdCBpbiBhY2MuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzY2FuR3JvdXBGaWVsZChyZXBzOiBudW1iZXIsIGFjYzogYW55LCBjYWxsYmFjazogYW55KTogYW55IHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXBzOyBpKyspIHtcbiAgICBhY2MgPSBjYWxsYmFjayhhY2MsIGkpO1xuICB9XG4gIHJldHVybiBhY2M7XG59XG4vKipcbiAqIEl0IHJldHVybnMgdGhlIHN1bSBvZiB0aGUgYXJyYXkgdmFsdWVzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gc3VtKGFycmF5OiBhbnlbXSk6IGFueSB7XG4gIHJldHVybiBhcnJheS5yZWR1Y2UoKGEsIGIpID0+IGEgKyBiLCAwKTtcbn1cbi8qKlxuICogSXQgYXBwbGllcyBhZGQvcmVtb3ZlKG9wZXJhdGlvbikgdiAoZGF5L21vbnRoL3llYXIpcGVyaW9kIHRvIGRzdHJpbmcgYW5kIHJldHVybiBuZXcgZm9ybWF0IGRhdGUuXG4gKi9cbi8vIFRPRE8gY2hlY2sgaWYgZGVwcmVjYXRlZCBpbnN0ZWFkIHJlZmFjb3RvcmluZyBwYXJhbWV0ZXIgdHlwZVxuLy8gVE9ETyAoZFN0cmluZzogc3RyaW5nfG51bGwsIHBlcmlvZDonZGF5J3wnbW9udGgnfCd5ZWFyJyxcbi8vIFRPRE8gb3BlcmF0aW9uOiAnYWRkL3JlbW92ZScgPSAnYWRkJywgdjpudW1iZXIpXG5leHBvcnQgZnVuY3Rpb24gZGF0ZU9wZXJhdGlvbnMoZFN0cmluZzogc3RyaW5nLCBwZXJpb2Q6IHN0cmluZywgb3BlcmF0aW9uOiBzdHJpbmcsIHY6IGFueSk6IHN0cmluZyB7XG4gIGNvbnN0IGZtdCA9ICdtbS9kZC95eXl5JztcbiAgbGV0IGQgPSB0eXBlb2YgZFN0cmluZyAhPT0gJ3VuZGVmaW5lZCcgPyBkYXRlVXRpbHMucGFyc2UoZFN0cmluZykgOiBuZXcgRGF0ZSgpO1xuICBpZiAob3BlcmF0aW9uID09ICdyZW1vdmUnKSB7XG4gICAgdiA9IC12O1xuICB9XG4gIGxldCBkYXRlT3A7XG4gIHN3aXRjaCAocGVyaW9kKSB7XG4gICAgY2FzZSAnZGF5JzpcbiAgICAgIGRhdGVPcCA9IGRhdGVVdGlscy5hZGREYXlzO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnbW9udGgnOlxuICAgICAgZGF0ZU9wID0gZGF0ZVV0aWxzLmFkZE1vbnRocztcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3llYXInOlxuICAgICAgZGF0ZU9wID0gZGF0ZVV0aWxzLmFkZFllYXJzO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiAnJztcbiAgfVxuICByZXR1cm4gZGF0ZVV0aWxzLmZvcm1hdChkYXRlT3AoZCwgdiksIGZtdCk7XG59XG4vKipcbiAqIEl0IHJvdW5kcyB0aGUgbnVtIHdpdGggdGhlIHZhbHVlIG9mIGRpZ2l0c1xuICovXG5leHBvcnQgZnVuY3Rpb24gcm91bmQobnVtOiBudW1iZXIgfCBzdHJpbmcsIGRpZ2l0czogbnVtYmVyKTogbnVtYmVyIHtcbiAgZGlnaXRzID0gZGlnaXRzIHx8IDA7XG4gIGxldCBmO1xuICBpZiAodHlwZW9mIG51bSAhPT0gJ251bWJlcicpIHtcbiAgICB0cnkge1xuICAgICAgZiA9IHBhcnNlRmxvYXQobnVtKTtcbiAgICB9IGNhdGNoIChlKSB7fVxuICB9IGVsc2Uge1xuICAgIGYgPSBudW07XG4gIH1cbiAgaWYgKGYgPT0gbnVsbCB8fCBpc05hTihmKSkge1xuICAgIGYgPSAwO1xuICB9XG4gIGNvbnN0IG0gPSBNYXRoLnBvdygxMCwgZGlnaXRzKTtcbiAgcmV0dXJuIE1hdGgucm91bmQoZiAqIG0pIC8gbTtcbn1cbi8qKlxuICogSXQgZXh0cmFjdHMgcHJvcGVydHkgZnJvbSBzb3VyY2UuXG4gKiBmb3IgZXZlcnkgZWxlbWVudCBvZiBzb3VyY2UgaWYgcHJvcGVydHkgYW5kIHByb3BlcnR5MiBhcmUgZGVmaW5lZCByZXR1cm4gdGhlIHN1bVxuICogZWxzZSBpZiBvbmx5IHByb3BlcnR5IGlzIGRlZmluZWQgcmV0dXJuIGhpbS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGV4dHJhY3RBcnJheShzb3VyY2U6IGFueVtdLCBwcm9wZXJ0eTogc3RyaW5nLCBwcm9wZXJ0eTI/OiBzdHJpbmcpOiBhbnlbXSB7XG4gIHNvdXJjZSA9IChzb3VyY2UgfHwgW10pLnNsaWNlKDApO1xuICBjb25zdCBsID0gc291cmNlLmxlbmd0aDtcbiAgY29uc3QgcmVzOiBhbnlbXSA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGw7IGkrKykge1xuICAgIGlmIChzb3VyY2VbaV1bcHJvcGVydHldICE9IG51bGwgJiYgcHJvcGVydHkyICE9IG51bGwgJiYgc291cmNlW2ldW3Byb3BlcnR5Ml0gIT0gbnVsbCkge1xuICAgICAgcmVzLnB1c2goTnVtYmVyKHNvdXJjZVtpXVtwcm9wZXJ0eV0pICsgTnVtYmVyKHNvdXJjZVtpXVtwcm9wZXJ0eTJdKSk7XG4gICAgfSBlbHNlIGlmIChzb3VyY2VbaV1bcHJvcGVydHldICE9IG51bGwpIHtcbiAgICAgIHJlcy5wdXNoKHNvdXJjZVtpXVtwcm9wZXJ0eV0pO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzO1xufVxuLyoqXG4gKiBJdCByZXR1cm5zIHRoZSBzdW0gb2YgYWxsIGRlZmluZWQgcHJvcGVydGllcyBvZiBlYWNoIGVsZW1lbnQgb2Ygc291cmNlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZXh0cmFjdFN1bShzb3VyY2U6IGFueVtdLCBwcm9wZXJ0aWVzOiBzdHJpbmdbXSk6IG51bWJlciB7XG4gIGxldCBzdW1WYWwgPSAwO1xuICBwcm9wZXJ0aWVzID0gKHByb3BlcnRpZXMgfHwgW10pLnNsaWNlKDApO1xuICBjb25zdCBsID0gcHJvcGVydGllcy5sZW5ndGg7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsOyBpKyspIHtcbiAgICBjb25zdCBhcnJheSA9IGV4dHJhY3RBcnJheShzb3VyY2UsIHByb3BlcnRpZXNbaV0pO1xuICAgIGNvbnN0IGxlbmcgPSBhcnJheS5sZW5ndGg7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBsZW5nOyBqKyspIHtcbiAgICAgIGlmICghaXNOYU4oTnVtYmVyKGFycmF5W2pdKSkpIHtcbiAgICAgICAgc3VtVmFsICs9IE51bWJlcihhcnJheVtqXSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBzdW1WYWw7XG59XG4vKipcbiAqIEl0IHJldHVybnMgYSBudW1iZXIgYXJyYXkgdGhhdCBjb250YWlucyB0aGUgc3VtIG9mIHByb3BlcnRpZXMgdmFsdWUgaW5zaWRlIHRoZSBzb3VyY2UuXG4gKiBleHRyYWN0QXJyYXlTdW0oW3thOiA1fSwge2I6IDF9LCB7YTogNSwgYjogMX1dLCBbJ2EnLCAnYiddKTsgPSZndDsgWzYsNl1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGV4dHJhY3RBcnJheVN1bShzb3VyY2U6IGFueVtdLCBwcm9wZXJ0aWVzOiBzdHJpbmdbXSk6IGFueVtdIHtcbiAgY29uc3QgYXJyYXlzOiBhbnlbXSA9IFtdO1xuICBwcm9wZXJ0aWVzID0gKHByb3BlcnRpZXMgfHwgW10pLnNsaWNlKDApO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvcGVydGllcy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGFycmF5ID0gZXh0cmFjdEFycmF5KHNvdXJjZSwgcHJvcGVydGllc1tpXSk7XG4gICAgYXJyYXlzLnB1c2goYXJyYXkpO1xuICB9XG5cbiAgY29uc3QgcmVzOiBhbnlbXSA9IFtdO1xuICBpZiAoYXJyYXlzLmxlbmd0aCA+IDApIHtcbiAgICBmb3IgKGxldCB3ZWVrSSA9IDA7IHdlZWtJIDwgYXJyYXlzWzBdLmxlbmd0aDsgd2Vla0krKykge1xuICAgICAgbGV0IHN1bVZhbCA9IDA7XG4gICAgICBmb3IgKGxldCBwcm9wSSA9IDA7IHByb3BJIDwgcHJvcGVydGllcy5sZW5ndGg7IHByb3BJKyspIHtcbiAgICAgICAgc3VtVmFsID0gc3VtVmFsICsgTnVtYmVyKGFycmF5c1twcm9wSV1bd2Vla0ldKTtcbiAgICAgIH1cbiAgICAgIHJlcy5wdXNoKHN1bVZhbCk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXM7XG59XG4vKipcbiAqIERyYXcgYSB0aHJlc2hvbGQgbGluZSBvbiBjaGFydCByZWxhdGVkIHRvIHRoZSBwcm9wZXJ0eS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRyYXdUaHJlc2hvbGQoc291cmNlOiBhbnlbXSwgcHJvcGVydHk6IHN0cmluZywgdGhyZXNob2xkOiBhbnlbXSk6IGFueVtdIHtcbiAgc291cmNlID0gKHNvdXJjZSB8fCBbXSkuc2xpY2UoMCk7XG4gIHRocmVzaG9sZCA9IHRocmVzaG9sZCB8fCBbMF07XG4gIGlmICghKHRocmVzaG9sZCBpbnN0YW5jZW9mIEFycmF5KSkge1xuICAgIHRocmVzaG9sZCA9IFt0aHJlc2hvbGRdO1xuICB9XG4gIGNvbnN0IGwgPSBzb3VyY2UubGVuZ3RoO1xuICBjb25zdCByZXM6IGFueVtdID0gW107XG4gIGxldCBjb3VudCA9IDA7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbDsgaSsrKSB7XG4gICAgaWYgKHNvdXJjZVtpXVtwcm9wZXJ0eV0gIT0gbnVsbCkge1xuICAgICAgaWYgKHRocmVzaG9sZC5sZW5ndGggPiBjb3VudCkge1xuICAgICAgICByZXMucHVzaCh0aHJlc2hvbGRbY291bnRdKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlcy5wdXNoKHRocmVzaG9sZFswXSk7XG4gICAgICB9XG4gICAgICBjb3VudCsrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzO1xufVxuLyoqXG4gKiBFeHRyYWN0IHRoZSBkYXRlcyBvZiB0aGUgc291cmNlIG9iamVjdCB3aXRoIHByb3BlcnR5ICE9IG51bGxcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGV4dHJhY3REYXRlcyhzb3VyY2U6IGFueVtdLCBwcm9wZXJ0eTogc3RyaW5nLCBmbXQ6IHN0cmluZyk6IHN0cmluZ1tdIHtcbiAgc291cmNlID0gKHNvdXJjZSB8fCBbXSkuc2xpY2UoMCk7XG4gIGNvbnN0IGwgPSBzb3VyY2UubGVuZ3RoO1xuICBjb25zdCByZXM6IGFueSA9IFtdO1xuICBsZXQgcHJlZml4ID0gJyc7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbDsgaSsrKSB7XG4gICAgaWYgKHNvdXJjZVtpXVtwcm9wZXJ0eV0gIT0gbnVsbCkge1xuICAgICAgc3dpdGNoIChmbXQpIHtcbiAgICAgICAgY2FzZSAnV1cnOlxuICAgICAgICBjYXNlICd3dyc6XG4gICAgICAgICAgcHJlZml4ID0gJ1cnO1xuICAgICAgICAgIHJlcy5wdXNoKHByZWZpeCArIGZvcm1hdERhdGUoc291cmNlW2ldWydkYXRlX3N0YXJ0J10sIGZtdCkpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdNTSc6XG4gICAgICAgIGNhc2UgJ21tJzpcbiAgICAgICAgICBwcmVmaXggPSAnTSc7XG4gICAgICAgICAgcmVzLnB1c2gocHJlZml4ICsgaXNvTW9udGgoc291cmNlW2ldWydkYXRlX3N0YXJ0J10sIGZtdCkpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHByZWZpeCA9ICcnO1xuICAgICAgICAgIHJlcy5wdXNoKHByZWZpeCArIGZvcm1hdERhdGUoc291cmNlW2ldWydkYXRlX3N0YXJ0J10sIGZtdCkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzO1xufVxuLyoqXG4gKiBFeHRyYWN0IHRoZSBsYXN0IHByb3BlcnR5IGNvbnRhaW5zIGluIHNvdXJjZSAhPSBudWxsXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBsYXN0UHJvcGVydHkoc291cmNlOiBhbnksIHByb3BlcnR5OiBzdHJpbmcpOiBhbnkge1xuICBzb3VyY2UgPSAoc291cmNlIHx8IFtdKS5zbGljZSgwKTtcbiAgbGV0IGwgPSBzb3VyY2UubGVuZ3RoIC0gMTtcblxuICB3aGlsZSAobCA+PSAwICYmIHNvdXJjZVtsXVtwcm9wZXJ0eV0gPT0gbnVsbCkge1xuICAgIGwtLTtcbiAgICBpZiAobCA8IDApIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGwgPj0gMCA/IHNvdXJjZVtsXVtwcm9wZXJ0eV0gOiAnJztcbn1cbi8qKlxuICogSXQgc3VtIHRoZSBMQXN0IHByb3BlcnRpZXMgb2Ygc291cmNlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gc3VtTGFzdFByb3BlcnRpZXMoc291cmNlOiBhbnlbXSwgcHJvcGVydGllczogc3RyaW5nW10pOiBudW1iZXIge1xuICBzb3VyY2UgPSAoc291cmNlIHx8IFtdKS5zbGljZSgwKTtcbiAgbGV0IHN1bVZhbCA9IDA7XG4gIGxldCB2YWwgPSAwO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHByb3BlcnRpZXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YWwgPSBOdW1iZXIobGFzdFByb3BlcnR5KHNvdXJjZSwgcHJvcGVydGllc1tpXSkpO1xuICAgIGlmICghaXNOYU4odmFsKSkge1xuICAgICAgc3VtVmFsICs9IHZhbDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHN1bVZhbDtcbn1cbi8qKlxuICogQ29tcHV0ZSB0aGUgdHJlbmQgb2YgdGhlIHByb3BlcnR5IGNvbnRhaW5lZCBvbiB0aGUgc291cmNlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gY2FsY3VsYXRlVHJlbmRQcm9wZXJ0eShzb3VyY2U6IGFueVtdLCBwcm9wZXJ0eTogc3RyaW5nKTogc3RyaW5nIHtcbiAgc291cmNlID0gKHNvdXJjZSB8fCBbXSkuc2xpY2UoMCk7XG4gIGxldCBsYXN0ID0gc291cmNlLmxlbmd0aCAtIDE7XG4gIHdoaWxlIChzb3VyY2VbbGFzdF1bcHJvcGVydHldID09IG51bGwpIHtcbiAgICBpZiAobGFzdCA9PSAwKSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgbGFzdC0tO1xuICB9XG4gIGxldCBsYXN0TGFzdCA9IGxhc3QgLSAxO1xuICBpZiAobGFzdCA9PSAwKSB7XG4gICAgbGFzdExhc3QgPSBsYXN0O1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzb3VyY2VbbGFzdExhc3RdW3Byb3BlcnR5XSA9PSBudWxsKSB7XG4gICAgICBpZiAobGFzdExhc3QgPT0gMCkge1xuICAgICAgICBsYXN0TGFzdCA9IGxhc3Q7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgbGFzdExhc3QtLTtcbiAgICB9XG4gIH1cblxuICBjb25zdCBsYXN0UHJvcCA9IHNvdXJjZVtsYXN0XSA/IHNvdXJjZVtsYXN0XVtwcm9wZXJ0eV0gfHwgMCA6IDA7XG4gIGNvbnN0IGxhc3RMYXN0UHJvcCA9IHNvdXJjZVtsYXN0TGFzdF0gPyBzb3VyY2VbbGFzdExhc3RdW3Byb3BlcnR5XSB8fCAwIDogMDtcblxuICBpZiAobGFzdFByb3AgPT0gbGFzdExhc3RQcm9wKSB7XG4gICAgcmV0dXJuICc8cD48aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCIgc3R5bGU9XCJjb2xvcjpibHVlXCI+dHJlbmRpbmdfZmxhdDwvaT48L3A+JztcbiAgfSBlbHNlIGlmIChsYXN0UHJvcCA+IGxhc3RMYXN0UHJvcCkge1xuICAgIHJldHVybiAnPHA+PGkgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiIHN0eWxlPVwiY29sb3I6Z3JlZW5cIj50cmVuZGluZ191cDwvaT48L3A+JztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gJzxwPjxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIiBzdHlsZT1cImNvbG9yOnJlZFwiPnRyZW5kaW5nX2Rvd248L2k+PC9wPic7XG4gIH1cbn1cbi8qKlxuICogQ29tcHV0ZSB0aGUgYXZlcmFnZSB2YWx1ZSBvZiB0aGUgcHJvcGVydHkgY29udGFpbmVkIG9uIHRoZSBzb3VyY2UuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjYWxjdWxhdGVUcmVuZEJ5UHJvcGVydGllcyhzb3VyY2U6IGFueVtdLCBwcm9wZXJ0aWVzOiBzdHJpbmdbXSk6IHN0cmluZyB7XG4gIGNvbnN0IGFycmF5c3VtID0gZXh0cmFjdEFycmF5U3VtKHNvdXJjZSwgcHJvcGVydGllcyk7XG5cbiAgY29uc3QgbGFzdFByb3AgPSBhcnJheXN1bS5sZW5ndGggPiAwID8gYXJyYXlzdW1bYXJyYXlzdW0ubGVuZ3RoIC0gMV0gfHwgMCA6IDA7XG4gIGNvbnN0IGxhc3RMYXN0UHJvcCA9IGFycmF5c3VtLmxlbmd0aCA+IDEgPyBhcnJheXN1bVthcnJheXN1bS5sZW5ndGggLSAyXSB8fCAwIDogbGFzdFByb3A7XG5cbiAgaWYgKGxhc3RQcm9wID09IGxhc3RMYXN0UHJvcCkge1xuICAgIHJldHVybiAnPHA+PGkgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiIHN0eWxlPVwiY29sb3I6Ymx1ZVwiPnRyZW5kaW5nX2ZsYXQ8L2k+PC9wPic7XG4gIH0gZWxzZSBpZiAobGFzdFByb3AgPiBsYXN0TGFzdFByb3ApIHtcbiAgICByZXR1cm4gJzxwPjxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIiBzdHlsZT1cImNvbG9yOmdyZWVuXCI+dHJlbmRpbmdfdXA8L2k+PC9wPic7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuICc8cD48aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCIgc3R5bGU9XCJjb2xvcjpyZWRcIj50cmVuZGluZ19kb3duPC9pPjwvcD4nO1xuICB9XG59XG4vKipcbiAqXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjYWxjdWxhdGVBdmdQcm9wZXJ0eShcbiAgc291cmNlOiBhbnlbXSxcbiAgcHJvcGVydHk6IHN0cmluZyxcbiAgcmFuZ2U6IG51bWJlcixcbiAgY29lZmZpY2llbnQ6IG51bWJlcixcbik6IG51bWJlciB7XG4gIHNvdXJjZSA9IChzb3VyY2UgfHwgW10pLnNsaWNlKDApO1xuXG4gIGNvZWZmaWNpZW50ID0gY29lZmZpY2llbnQgfHwgMTtcbiAgcmFuZ2UgPSByYW5nZSB8fCAxMjtcblxuICBsZXQgbCA9IHNvdXJjZS5sZW5ndGg7XG4gIGxldCByZXMgPSAwO1xuICBsZXQgY291bnRlciA9IDA7XG4gIGxldCBub1plcm8gPSAwO1xuXG4gIGlmIChsIDwgcmFuZ2UpIHtcbiAgICByYW5nZSA9IGw7XG4gIH1cblxuICB3aGlsZSAocmFuZ2UgIT0gMCkge1xuICAgIGlmIChzb3VyY2VbbCAtIDFdW3Byb3BlcnR5XSAhPSBudWxsKSB7XG4gICAgICBjb3VudGVyKys7XG4gICAgICByZXMgKz0gTnVtYmVyKHNvdXJjZVtsIC0gMV1bcHJvcGVydHldKTtcblxuICAgICAgaWYgKHNvdXJjZVtsIC0gMV1bcHJvcGVydHldID4gMCkge1xuICAgICAgICBub1plcm8rKztcbiAgICAgIH1cbiAgICB9XG4gICAgbC0tO1xuICAgIHJhbmdlLS07XG4gIH1cblxuICBpZiAoY29lZmZpY2llbnQgPT0gMCkge1xuICAgIHJldHVybiBub1plcm87XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHJvdW5kKChyZXMgLyBjb3VudGVyKSAqIGNvZWZmaWNpZW50LCAyKSB8fCAwO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjYWxjdWxhdGVBdmdQcm9wZXJ0eUFycmF5KFxuICBzb3VyY2U6IGFueVtdLFxuICBwcm9wZXJ0aWVzOiBzdHJpbmdbXSxcbiAgcmFuZ2U6IG51bWJlcixcbiAgY29lZmZpY2llbnQ6IG51bWJlcixcbik6IG51bWJlcltdIHtcbiAgc291cmNlID0gKHNvdXJjZSB8fCBbXSkuc2xpY2UoMCk7XG4gIGNvbnN0IHJlc0FycjogYW55W10gPSBbXTtcblxuICBpZiAocHJvcGVydGllcyAmJiBwcm9wZXJ0aWVzLmxlbmd0aCA+IDApIHtcbiAgICBsZXQgYXZnID0gMDtcblxuICAgIGNvZWZmaWNpZW50ID0gY29lZmZpY2llbnQgfHwgMTtcbiAgICByYW5nZSA9IHJhbmdlIHx8IDEyO1xuXG4gICAgY29uc3Qgc291cmNlQXJyID1cbiAgICAgIHByb3BlcnRpZXMubGVuZ3RoID4gMVxuICAgICAgICA/IGV4dHJhY3RBcnJheVN1bShzb3VyY2UsIHByb3BlcnRpZXMpXG4gICAgICAgIDogZXh0cmFjdEFycmF5KHNvdXJjZSwgcHJvcGVydGllc1swXSk7XG5cbiAgICBsZXQgbCA9IHNvdXJjZUFyci5sZW5ndGg7XG5cbiAgICBmb3IgKGxldCBsZW4gPSBsOyBsZW4gPiAwOyBsZW4tLSkge1xuICAgICAgbGV0IHJlcyA9IDA7XG4gICAgICBsZXQgY291bnRlciA9IDA7XG4gICAgICBsZXQgbm9aZXJvID0gMDtcblxuICAgICAgaWYgKGxlbiA8IHJhbmdlKSB7XG4gICAgICAgIHJhbmdlID0gbGVuO1xuICAgICAgfVxuXG4gICAgICBmb3IgKGxldCByID0gMTsgciA8PSByYW5nZTsgcisrKSB7XG4gICAgICAgIGxldCB2YWwgPSBzb3VyY2VBcnJbbGVuIC0gcl07XG4gICAgICAgIGlmICh2YWwgIT0gbnVsbCkge1xuICAgICAgICAgIGNvdW50ZXIrKztcbiAgICAgICAgICByZXMgKz0gTnVtYmVyKHZhbCk7XG4gICAgICAgICAgaWYgKHZhbCA+IDApIHtcbiAgICAgICAgICAgIG5vWmVybysrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoY291bnRlciA+IDApIHtcbiAgICAgICAgaWYgKGNvZWZmaWNpZW50ID09IDApIHtcbiAgICAgICAgICBhdmcgPSBub1plcm87XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYXZnID0gKHJlcyAvIGNvdW50ZXIpICogY29lZmZpY2llbnQgfHwgMDtcbiAgICAgICAgfVxuICAgICAgICByZXNBcnIucHVzaChyb3VuZChhdmcsIDIpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc0Fyci5yZXZlcnNlKCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhbGVydChzb3VyY2U6IGFueVtdLCBwcm9wZXJ0eTogc3RyaW5nLCB0aHJlc2hvbGQ6IG51bWJlcik6IHN0cmluZyB7XG4gIHNvdXJjZSA9IChzb3VyY2UgfHwgW10pLnNsaWNlKDApO1xuXG4gIGlmIChsYXN0UHJvcGVydHkoc291cmNlLCBwcm9wZXJ0eSkgPiB0aHJlc2hvbGQpIHtcbiAgICByZXR1cm4gJzxwPjxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIiBzdHlsZT1cImNvbG9yOnJlZFwiPndhcm5pbmc8L2k+PC9wPic7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuICc8cD48L3A+JztcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0TnVtYmVyKG51bTogbnVtYmVyLCBmbXQ/OiBzdHJpbmcpOiBzdHJpbmcge1xuICBmbXQgPSBmbXQgfHwgJzAsMFsuXTAnO1xuICByZXR1cm4gbnVtYnJvKG51bSkuZm9ybWF0KGZtdCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXREYXRlKGRhdGU6IERhdGUgfCBzdHJpbmcsIGZtdD86IHN0cmluZyk6IHN0cmluZyB7XG4gIGZtdCA9IGZtdCB8fCAnbW0tREQteXl5eSc7XG4gIHJldHVybiBkYXRlVXRpbHMuZm9ybWF0KHR5cGVvZiBkYXRlID09PSAnc3RyaW5nJyA/IGRhdGVVdGlscy5wYXJzZShkYXRlKSA6IGRhdGUsIGZtdCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc29Nb250aChkYXRlOiBEYXRlLCBmbXQ/OiBzdHJpbmcpOiBzdHJpbmcge1xuICBmbXQgPSBmbXQgfHwgJ21tJztcbiAgY29uc3QgZHUgPSBkYXRlVXRpbHM7XG4gIHJldHVybiBkdS5mb3JtYXQoZHUuYWRkRGF5cyhkdS5zdGFydE9mSVNPV2VlayhkYXRlKSwgMyksIGZtdCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRDb29yZGluYXRlKHNvdXJjZTogYW55LCB6b29tPzogbnVtYmVyKTogW251bWJlciwgbnVtYmVyLCBudW1iZXJdIHtcbiAgem9vbSA9IHpvb20gfHwgNjtcbiAgaWYgKHNvdXJjZSA9PSBudWxsKSB7XG4gICAgcmV0dXJuIFs1MS41MDUsIC0wLjA5LCB6b29tXTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gW3NvdXJjZVswXSwgc291cmNlWzFdLCB6b29tXTtcbiAgfVxufVxuXG4vKipcbiAqIENvdW50cyB0aGUgY29sbGVjdGVkIGZvcm1zLiBUaGUgZm9ybSBuYW1lIG11c3QgYmUgc3BlY2lmaWVkLiBBbiBvcHRpb25hbCBjb25kaXRpb24gY2FuIGJlIGFkZGVkXG4gKiB0byBkaXNjcmltaW5hdGUgd2hpY2ggZm9ybXMgdG8gY291bnQgaW4uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBDT1VOVEZPUk1TKGZvcm1zOiBGb3JtW10sIGV4cHJlc3Npb246IHN0cmluZyA9ICd0cnVlJyk6IG51bWJlciB7XG4gIGZvcm1zID0gKGZvcm1zIHx8IFtdKS5zbGljZSgwKTtcbiAgaWYgKGV4cHJlc3Npb24gPT09ICd0cnVlJykge1xuICAgIHJldHVybiBmb3Jtcy5sZW5ndGg7XG4gIH1cbiAgaWYgKGZvcm1zLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiAwO1xuICB9XG4gIGNvbnN0IGlzSW5SZXBlYXRpbmdTbGlkZSA9IGV4cHJlc3Npb24uaW5jbHVkZXMoYF9fYCk7XG4gIGlmIChpc0luUmVwZWF0aW5nU2xpZGUpIHtcbiAgICBsZXQgY291bnQgPSAwO1xuXG4gICAgZm9ybXMuZm9yRWFjaChmID0+IHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IE1BWF9SRVBTOyBpKyspIHtcbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKGYpLmZpbHRlcihrZXkgPT4ga2V5LmluY2x1ZGVzKGBfXyR7aX1gKSkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKChldmFsdWF0ZUV4cHJlc3Npb24oZXhwcmVzc2lvbi5yZXBsYWNlKCdfXycsIGBfXyR7aX1gKSksIGYpKSB7XG4gICAgICAgICAgY291bnQrKztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGNvdW50O1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBmb3Jtcy5maWx0ZXIoZiA9PiBldmFsdWF0ZUV4cHJlc3Npb24oZXhwcmVzc2lvbiwgZikpLmxlbmd0aDtcbiAgfVxufVxuXG4vKipcbiAqIENvdW50cyB0aGUgYW1vdW50IG9mIHVuaXF1ZSBmb3JtIHZhbHVlcyBmb3IgYSBzcGVjaWZpYyBmaWVsZC4gVGhlIGZvcm0gbmFtZSBtdXN0IGJlIHNwZWNpZmllZC4gQW5cbiAqIG9wdGlvbmFsIGNvbmRpdGlvbiBjYW4gYmUgYWRkZWQgdG8gZGlzY3JpbWluYXRlIHdoaWNoIGZvcm1zIHRvIGNvdW50IGluXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBDT1VOVEZPUk1TX1VOSVFVRShmb3JtczogRm9ybVtdLCBmaWVsZE5hbWU6IHN0cmluZywgZXhwcmVzc2lvbj86IHN0cmluZyk6IG51bWJlciB7XG4gIGZvcm1zID0gKGZvcm1zIHx8IFtdKS5zbGljZSgwKTtcbiAgY29uc3QgdmFsdWVzOiBzdHJpbmcgfCBudW1iZXJbXSA9IFtdO1xuXG4gIGlmIChleHByZXNzaW9uICE9IG51bGwpIHtcbiAgICBmb3JtcyA9IGZvcm1zLmZpbHRlcihmID0+IGV2YWx1YXRlRXhwcmVzc2lvbihleHByZXNzaW9uIGFzIHN0cmluZywgZikpO1xuICB9XG5cbiAgZm9ybXMuZm9yRWFjaChmID0+IHtcbiAgICB2YWx1ZXMucHVzaChldmFsdWF0ZUV4cHJlc3Npb24oZmllbGROYW1lLCBmKSk7XG4gIH0pO1xuXG4gIHJldHVybiBBcnJheS5mcm9tKG5ldyBTZXQodmFsdWVzKSkubGVuZ3RoO1xufVxuXG4vKipcbiAqIEFnZ3JlZ2F0ZXMgYW5kIHN1bXMgdGhlIHZhbHVlcyBvZiBvbmUgb3IgbW9yZS4gQW4gb3B0aW9uYWwgY29uZGl0aW9uIGNhbiBiZSBhZGRlZCB0byBkaXNjcmltaW5hdGVcbiAqIHdoaWNoIGZvcm1zIHRvIHRha2UgZm9yIHRoZSBzdW0uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBTVU0oZm9ybXM6IEZvcm1bXSwgZXhwcmVzc2lvbjogc3RyaW5nLCBjb25kaXRpb24/OiBzdHJpbmcpOiBudW1iZXIge1xuICBsZXQgYWNjID0gMDtcbiAgZm9ybXMgPSAoZm9ybXMgfHwgW10pLnNsaWNlKDApO1xuXG4gIGlmIChleHByZXNzaW9uID09IG51bGwpIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuICBpZiAoY29uZGl0aW9uICE9IG51bGwpIHtcbiAgICBmb3JtcyA9IGZvcm1zLmZpbHRlcihmID0+IGV2YWx1YXRlRXhwcmVzc2lvbihjb25kaXRpb24sIGYpKTtcbiAgfVxuICBjb25zdCBpc0luUmVwZWF0aW5nU2xpZGUgPSBleHByZXNzaW9uLmluY2x1ZGVzKGBfX2ApO1xuICBpZiAoaXNJblJlcGVhdGluZ1NsaWRlKSB7XG4gICAgZm9ybXMuZm9yRWFjaChmID0+IHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IE1BWF9SRVBTOyBpKyspIHtcbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKGYpLmZpbHRlcihrZXkgPT4ga2V5LmluY2x1ZGVzKGBfXyR7aX1gKSkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZXZhbHVhdGVkRXhwcmVzc2lvbiA9IGV2YWx1YXRlRXhwcmVzc2lvbihleHByZXNzaW9uLnJlcGxhY2UoJ19fJywgYF9fJHtpfWApLCBmKTtcbiAgICAgICAgaWYgKE51bWJlci5pc0Zpbml0ZShldmFsdWF0ZUV4cHJlc3Npb24pKSB7XG4gICAgICAgICAgYWNjICs9IGV2YWx1YXRlZEV4cHJlc3Npb247XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBmb3Jtcy5mb3JFYWNoKGYgPT4gKGFjYyArPSBldmFsdWF0ZUV4cHJlc3Npb24oZXhwcmVzc2lvbiwgZikpKTtcbiAgfVxuXG4gIHJldHVybiBhY2M7XG59XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgbWVhbiBvZiBhIHNpbXBsZSBvciBkZXJpdmVkIHZhbHVlLiBBbiBvcHRpb25hbCBjb25kaXRpb24gY2FuIGJlIGFkZGVkIHRvXG4gKiBkaXNjcmltaW5hdGUgd2hpY2ggZm9ybXMgdG8gdGFrZSBmb3IgdGhlIHN1bS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIE1FQU4oZm9ybXM6IEZvcm1bXSwgZXhwcmVzc2lvbjogc3RyaW5nKTogbnVtYmVyIHtcbiAgZm9ybXMgPSAoZm9ybXMgfHwgW10pLnNsaWNlKDApO1xuICBleHByZXNzaW9uID0gZXhwcmVzc2lvbiB8fCAnJztcbiAgY29uc3QgbGVuZ3RoID0gZm9ybXMubGVuZ3RoO1xuICBpZiAobGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cbiAgbGV0IGFjYyA9IDA7XG4gIGZvcm1zLmZvckVhY2goZiA9PiB7XG4gICAgYWNjICs9IGV2YWx1YXRlRXhwcmVzc2lvbihleHByZXNzaW9uLCBmKTtcbiAgfSk7XG4gIHJldHVybiBNYXRoLnRydW5jKGFjYyAvIGxlbmd0aCk7XG59XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgJSBiZXR3ZWVuIHR3byBtZW1iZXJzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gUEVSQ0VOVCh2YWx1ZTE6IG51bWJlciwgdmFsdWUyOiBudW1iZXIpOiBzdHJpbmcge1xuICBjb25zdCByZXMgPSArdmFsdWUxIC8gK3ZhbHVlMjtcblxuICByZXR1cm4gTnVtYmVyLmlzRmluaXRlKHJlcykgPyBgJHtyZXN9JWAgOiAnZXJyJztcbn1cblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBleHByZXNzaW9uIGluIHRoZSBsYXN0IGZvcm0gYnkgZGF0ZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIExBU1QoZm9ybXM6IEZvcm1bXSwgZXhwcmVzc2lvbjogc3RyaW5nLCBkYXRlID0gJ2RhdGVfZW5kJyk6IG51bWJlciB7XG4gIGZvcm1zID0gKGZvcm1zIHx8IFtdKS5zbGljZSgwKS5zb3J0KChhLCBiKSA9PiB7XG4gICAgY29uc3QgZGF0ZUEgPSBuZXcgRGF0ZShiW2RhdGVdIGFzIHN0cmluZykuZ2V0VGltZSgpO1xuICAgIGNvbnN0IGRhdGVCID0gbmV3IERhdGUoYVtkYXRlXSBhcyBzdHJpbmcpLmdldFRpbWUoKTtcbiAgICByZXR1cm4gZGF0ZUEgLSBkYXRlQjtcbiAgfSk7XG4gIGlmIChmb3Jtcy5sZW5ndGggPiAwICYmIGV4cHJlc3Npb24gIT0gbnVsbCkge1xuICAgIGNvbnN0IGxhc3RGb3JtID0gZm9ybXNbZm9ybXMubGVuZ3RoIC0gMV0gfHwgW107XG4gICAgcmV0dXJuIGV2YWx1YXRlRXhwcmVzc2lvbihleHByZXNzaW9uLCBsYXN0Rm9ybSk7XG4gIH1cbiAgcmV0dXJuIDA7XG59XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgbWF4IHZhbHVlIG9mIHRoZSBmaWVsZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIE1BWChmb3JtczogRm9ybVtdLCBmaWVsZE5hbWU6IHN0cmluZyk6IG51bWJlciB7XG4gIGZvcm1zID0gKGZvcm1zIHx8IFtdKS5zbGljZSgwKTtcbiAgbGV0IG1heCA9IDA7XG4gIGZvcm1zLmZvckVhY2goZm9ybSA9PiB7XG4gICAgaWYgKFxuICAgICAgZm9ybVtmaWVsZE5hbWVdICE9IG51bGwgJiZcbiAgICAgICFpc05hTihmb3JtW2ZpZWxkTmFtZV0gYXMgbnVtYmVyKSAmJlxuICAgICAgKGZvcm1bZmllbGROYW1lXSBhcyBudW1iZXIpID4gbWF4XG4gICAgKSB7XG4gICAgICBtYXggPSBmb3JtW2ZpZWxkTmFtZV0gYXMgbnVtYmVyO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBtYXg7XG59XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgbWVkaWFuIHZhbHVlIG9mIHRoZSBmaWVsZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIE1FRElBTihmb3JtczogRm9ybVtdLCBmaWVsZE5hbWU6IHN0cmluZyk6IG51bWJlciB7XG4gIGZvcm1zID0gKGZvcm1zIHx8IFtdKS5zbGljZSgwKTtcbiAgY29uc3QgbnVtYmVyczogbnVtYmVyW10gPSBmb3Jtc1xuICAgIC5maWx0ZXIoZiA9PiBmW2ZpZWxkTmFtZV0gIT0gbnVsbCAmJiAhaXNOYU4oZltmaWVsZE5hbWVdIGFzIG51bWJlcikpXG4gICAgLm1hcChmID0+IGZbZmllbGROYW1lXSBhcyBudW1iZXIpXG4gICAgLnNvcnQoKGEsIGIpID0+IGEgLSBiKVxuICAgIC5maWx0ZXIoKGl0ZW0sIHBvcywgc2VsZikgPT4gc2VsZi5pbmRleE9mKGl0ZW0pID09IHBvcyk7XG5cbiAgcmV0dXJuIE51bWJlci5pc0ludGVnZXIobnVtYmVycy5sZW5ndGggLyAyKVxuICAgID8gbnVtYmVyc1tudW1iZXJzLmxlbmd0aCAvIDJdXG4gICAgOiAobnVtYmVyc1srcGFyc2VJbnQoYCR7bnVtYmVycy5sZW5ndGggLSAxIC8gMn1gKSAvIDJdICtcbiAgICAgICAgbnVtYmVyc1srcGFyc2VJbnQoYCR7bnVtYmVycy5sZW5ndGggLSAxIC8gMn1gKSAvIDIgKyAxXSkgL1xuICAgICAgICAyO1xufVxuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIG1vZGUgdmFsdWUgb2YgdGhlIGZpZWxkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gTU9ERShmb3JtczogRm9ybVtdLCBmaWVsZE5hbWU6IHN0cmluZyk6IG51bWJlcltdIHtcbiAgZm9ybXMgPSAoZm9ybXMgfHwgW10pLnNsaWNlKDApO1xuICBsZXQgbWF4Q291bnQgPSAwO1xuICBjb25zdCBtYXA6IHtba2V5OiBudW1iZXJdOiBudW1iZXJ9ID0ge307XG4gIGZvcm1zLmZvckVhY2goZiA9PiB7XG4gICAgY29uc3QgdmFsdWUgPSBmW2ZpZWxkTmFtZV0gYXMgbnVtYmVyO1xuICAgIGlmICh2YWx1ZSAhPSBudWxsKSB7XG4gICAgICBtYXBbdmFsdWVdID0gbWFwW3ZhbHVlXSAhPSBudWxsID8gbWFwW3ZhbHVlXSArIDEgOiAxO1xuICAgIH1cbiAgICBpZiAobWFwW3ZhbHVlXSA+IG1heENvdW50KSB7XG4gICAgICBtYXhDb3VudCA9IG1hcFt2YWx1ZV07XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIE9iamVjdC5rZXlzKG1hcClcbiAgICAuZmlsdGVyKHYgPT4gbWFwWyt2XSA9PT0gbWF4Q291bnQpXG4gICAgLm1hcCh2ID0+ICt2KTtcbn1cbiJdfQ==