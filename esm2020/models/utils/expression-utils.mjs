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
    startOfISOWeek: dateFns.startOfISOWeek
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
    const identifiers = tokenize(formula).filter((t) => t.type === 'Identifier').map((t) => t.value);
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
    if (isNaN(x) || typeof (x) !== 'number') {
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
    if (typeof (x) === 'string') {
        return /^-?\d+$/.test(x);
    }
    if (typeof (x) === 'number') {
        return Math.round(x) === x;
    }
    return false;
}
/**
 * It is true if x is not empty.
 */
export function notEmpty(x) {
    return (typeof x !== 'undefined' && x !== null ? x.toString().length > 0 : false);
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
    let d = (typeof dString !== 'undefined') ? dateUtils.parse(dString) : new Date();
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
        catch (e) {
        }
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
    const lastProp = source[last] ? (source[last][property] || 0) : 0;
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
 * Compute the average value of the property contained on the source.
 */
export function calculateTrendByProperties(source, properties) {
    const arraysum = extractArraySum(source, properties);
    const lastProp = arraysum.length > 0 ? (arraysum[arraysum.length - 1] || 0) : 0;
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
        const sourceArr = properties.length > 1 ? extractArraySum(source, properties) :
            extractArray(source, properties[0]);
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
                if (evaluateExpression(expression.replace('__', `__${i}`)), f) {
                    count++;
                }
            }
        });
        return count;
    }
    else {
        return forms.filter((f) => evaluateExpression(expression, f)).length;
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
        forms = forms.filter((f) => evaluateExpression(condition, f));
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
        forms.forEach((f) => acc += evaluateExpression(expression, f));
    }
    return acc;
}
/**
 * Calculates the mean of a simple or derived value. An optional condition can be added to
 * discriminate which forms to take for the sum.
 */
export function MEAN(forms, expression) {
    forms = (forms || []).slice(0);
    expression = (expression || '');
    const length = forms.length;
    if (length === 0) {
        return 0;
    }
    let acc = 0;
    forms.forEach((f) => {
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
        if (form[fieldName] != null && !isNaN(form[fieldName]) &&
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
    const numbers = forms.filter(f => f[fieldName] != null && !isNaN(f[fieldName]))
        .map(f => f[fieldName])
        .sort((a, b) => a - b)
        .filter((item, pos, self) => self.indexOf(item) == pos);
    return Number.isInteger(numbers.length / 2) ?
        numbers[numbers.length / 2] :
        (numbers[+parseInt(`${numbers.length - 1 / 2}`) / 2] +
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
    return Object.keys(map).filter(v => map[+v] === maxCount).map(v => +v);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwcmVzc2lvbi11dGlscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL21vZGVscy91dGlscy9leHByZXNzaW9uLXV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUdILE9BQU8sS0FBSyxPQUFPLE1BQU0sVUFBVSxDQUFDO0FBQ3BDLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxTQUFTLENBQUM7QUFDakMsT0FBTyxLQUFLLFNBQVMsTUFBTSxRQUFRLENBQUM7QUFJcEMsSUFBSSxXQUFXLEdBQVEsRUFBRSxDQUFDO0FBRTFCLE1BQU0sTUFBTSxHQUFHLFNBQVMsQ0FBQyxPQUFPLElBQUksU0FBUyxDQUFDO0FBSzlDLE1BQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQztBQUVwQixNQUFNLENBQUMsTUFBTSxTQUFTLEdBQUc7SUFDdkIsT0FBTyxFQUFFLE9BQU8sQ0FBQyxPQUFPO0lBQ3hCLFNBQVMsRUFBRSxPQUFPLENBQUMsU0FBUztJQUM1QixRQUFRLEVBQUUsT0FBTyxDQUFDLFFBQVE7SUFDMUIsWUFBWSxFQUFFLE9BQU8sQ0FBQyxZQUFZO0lBQ2xDLE1BQU0sRUFBRSxPQUFPLENBQUMsTUFBTTtJQUN0QixNQUFNLEVBQUUsT0FBTyxDQUFDLE1BQU07SUFDdEIsS0FBSyxFQUFFLE9BQU8sQ0FBQyxRQUFRO0lBQ3ZCLFlBQVksRUFBRSxPQUFPLENBQUMsWUFBWTtJQUNsQyxjQUFjLEVBQUUsT0FBTyxDQUFDLGNBQWM7Q0FDdkMsQ0FBQztBQUVGLE1BQU0sT0FBTyxrQkFBa0I7O0FBQzdCLHNCQUFzQjtBQUNmLGlDQUFjLEdBQUcsRUFBRSxDQUFDO0FBQzNCOztHQUVHO0FBQ0ksd0JBQUssR0FBc0M7SUFDaEQsVUFBVSxFQUFFLEVBQUMsRUFBRSxFQUFFLFVBQVUsRUFBQztJQUM1QixZQUFZLEVBQUUsRUFBQyxFQUFFLEVBQUUsWUFB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O0FBRUQ7O0dBRUc7QUFDSCxNQUFNLFVBQVUsSUFBSSxDQUFDLEtBQWEsRUFBRSxTQUFpQjtJQUNuRCxLQUFLLEdBQUcsQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQy9CLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQztJQUNqQixNQUFNLEdBQUcsR0FBNEIsRUFBRSxDQUFDO0lBQ3hDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUU7UUFDaEIsTUFBTSxLQUFLLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBVyxDQUFDO1FBQ3JDLElBQUksS0FBSyxJQUFJLElBQUksRUFBRTtZQUNqQixHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3REO1FBQ0QsSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsUUFBUSxFQUFFO1lBQ3pCLFFBQVEsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDdkI7SUFDSCxDQUFDLENBQUMsQ0FBQztJQUNILE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3pFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmQ29udGV4dH0gZnJvbSAnQGFqZi9jb3JlL2NvbW1vbic7XG5pbXBvcnQgKiBhcyBkYXRlRm5zIGZyb20gJ2RhdGUtZm5zJztcbmltcG9ydCB7dG9rZW5pemV9IGZyb20gJ2VzcHJpbWEnO1xuaW1wb3J0ICogYXMgbnVtYnJvTW9kIGZyb20gJ251bWJybyc7XG5cbmltcG9ydCB7QWpmVmFsaWRhdGlvbkZufSBmcm9tICcuLi9pbnRlcmZhY2UvdmFsaWRhdGlvbi1mdW5jdGlvbic7XG5cbmxldCBleGVjQ29udGV4dDogYW55ID0ge307XG5cbmNvbnN0IG51bWJybyA9IG51bWJyb01vZC5kZWZhdWx0IHx8IG51bWJyb01vZDtcbmV4cG9ydCBpbnRlcmZhY2UgRm9ybSB7XG4gIFtrZXk6IHN0cmluZ106IHN0cmluZ3xudW1iZXJ8bnVsbDtcbn1cblxuY29uc3QgTUFYX1JFUFMgPSAzMDtcblxuZXhwb3J0IGNvbnN0IGRhdGVVdGlscyA9IHtcbiAgYWRkRGF5czogZGF0ZUZucy5hZGREYXlzLFxuICBhZGRNb250aHM6IGRhdGVGbnMuYWRkTW9udGhzLFxuICBhZGRZZWFyczogZGF0ZUZucy5hZGRZZWFycyxcbiAgZW5kT2ZJU09XZWVrOiBkYXRlRm5zLmVuZE9mSVNPV2VlayxcbiAgZm9ybWF0OiBkYXRlRm5zLmZvcm1hdCxcbiAgZ2V0RGF5OiBkYXRlRm5zLmdldERheSxcbiAgcGFyc2U6IGRhdGVGbnMucGFyc2VJU08sXG4gIHN0YXJ0T2ZNb250aDogZGF0ZUZucy5zdGFydE9mTW9udGgsXG4gIHN0YXJ0T2ZJU09XZWVrOiBkYXRlRm5zLnN0YXJ0T2ZJU09XZWVrXG59O1xuXG5leHBvcnQgY2xhc3MgQWpmRXhwcmVzc2lvblV0aWxzIHtcbiAgLy8gVE9ETyB3aGF0IGlzIGl0IGZvclxuICBzdGF0aWMgVVRJTF9GVU5DVElPTlMgPSAnJztcbiAgLyoqXG4gICAqIEl0IGlzIGEga2V5LXZhbHVlIGRpY3Rpb25hcnksIHRoYXQgbWFwcGluZyBhbGwgQWpmIHZhbGlkYXRpb24gZnVuY3Rpb25zLlxuICAgKi9cbiAgc3RhdGljIHV0aWxzOiB7W25hbWU6IHN0cmluZ106IEFqZlZhbGlkYXRpb25Gbn0gPSB7XG4gICAgZGlnaXRDb3VudDoge2ZuOiBkaWdpdENvdW50fSxcbiAgICBkZWNpbWFsQ291bnQ6IHtmbjogZGVjaW1hbENvdW50fSxcbiAgICBpc0ludDoge2ZuOiBpc0ludH0sXG4gICAgbm90RW1wdHk6IHtmbjogbm90RW1wdHl9LFxuICAgIHZhbHVlSW5DaG9pY2U6IHtmbjogdmFsdWVJbkNob2ljZX0sXG4gICAgc2Nhbkdyb3VwRmllbGQ6IHtmbjogc2Nhbkdyb3VwRmllbGR9LFxuICAgIHN1bToge2ZuOiBzdW19LFxuICAgIGRhdGVPcGVyYXRpb25zOiB7Zm46IGRhdGVPcGVyYXRpb25zfSxcbiAgICByb3VuZDoge2ZuOiByb3VuZH0sXG4gICAgZXh0cmFjdEFycmF5OiB7Zm46IGV4dHJhY3RBcnJheX0sXG4gICAgZXh0cmFjdFN1bToge2ZuOiBleHRyYWN0U3VtfSxcbiAgICBleHRyYWN0QXJyYXlTdW06IHtmbjogZXh0cmFjdEFycmF5U3VtfSxcbiAgICBkcmF3VGhyZXNob2xkOiB7Zm46IGRyYXdUaHJlc2hvbGR9LFxuICAgIGV4dHJhY3REYXRlczoge2ZuOiBleHRyYWN0RGF0ZXN9LFxuICAgIGxhc3RQcm9wZXJ0eToge2ZuOiBsYXN0UHJvcGVydHl9LFxuICAgIHN1bUxhc3RQcm9wZXJ0aWVzOiB7Zm46IHN1bUxhc3RQcm9wZXJ0aWVzfSxcbiAgICBjYWxjdWxhdGVUcmVuZFByb3BlcnR5OiB7Zm46IGNhbGN1bGF0ZVRyZW5kUHJvcGVydHl9LFxuICAgIGNhbGN1bGF0ZVRyZW5kQnlQcm9wZXJ0aWVzOiB7Zm46IGNhbGN1bGF0ZVRyZW5kQnlQcm9wZXJ0aWVzfSxcbiAgICBjYWxjdWxhdGVBdmdQcm9wZXJ0eToge2ZuOiBjYWxjdWxhdGVBdmdQcm9wZXJ0eX0sXG4gICAgY2FsY3VsYXRlQXZnUHJvcGVydHlBcnJheToge2ZuOiBjYWxjdWxhdGVBdmdQcm9wZXJ0eUFycmF5fSxcbiAgICBhbGVydDoge2ZuOiBhbGVydH0sXG4gICAgZm9ybWF0TnVtYmVyOiB7Zm46IGZvcm1hdE51bWJlcn0sXG4gICAgZm9ybWF0RGF0ZToge2ZuOiBmb3JtYXREYXRlfSxcbiAgICBpc29Nb250aDoge2ZuOiBpc29Nb250aH0sXG4gICAgZ2V0Q29vcmRpbmF0ZToge2ZuOiBnZXRDb29yZGluYXRlfSxcbiAgICBNYXRoOiB7Zm46IE1hdGh9LFxuICAgIHBhcnNlSW50OiB7Zm46IHBhcnNlSW50fSxcbiAgICBwYXJzZUZsb2F0OiB7Zm46IHBhcnNlRmxvYXR9LFxuICAgIHBhcnNlRGF0ZToge2ZuOiBkYXRlVXRpbHMucGFyc2V9LFxuICAgIERhdGU6IHtmbjogRGF0ZX0sXG4gICAgQ09VTlRGT1JNUzoge2ZuOiBDT1VOVEZPUk1TfSxcbiAgICBDT1VOVEZPUk1TX1VOSVFVRToge2ZuOiBDT1VOVEZPUk1TX1VOSVFVRX0sXG4gICAgU1VNOiB7Zm46IFNVTX0sXG4gICAgTUVBTjoge2ZuOiBNRUFOfSxcbiAgICBQRVJDRU5UOiB7Zm46IFBFUkNFTlR9LFxuICAgIExBU1Q6IHtmbjogTEFTVH0sXG4gICAgTUFYOiB7Zm46IE1BWH0sXG4gICAgTUVESUFOOiB7Zm46IE1FRElBTn0sXG4gICAgTU9ERToge2ZuOiBNT0RFfSxcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGV2YWx1YXRlRXhwcmVzc2lvbihcbiAgICBleHByZXNzaW9uOiBzdHJpbmcsIGNvbnRleHQ/OiBBamZDb250ZXh0LCBmb3JjZUZvcm11bGE/OiBzdHJpbmcpOiBhbnkge1xuICBsZXQgZm9ybXVsYSA9IGZvcmNlRm9ybXVsYSB8fCBleHByZXNzaW9uIHx8ICcnO1xuICBpZiAoZm9ybXVsYSA9PT0gJycpIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cbiAgaWYgKGZvcm11bGEgPT09ICd0cnVlJykge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGlmIChmb3JtdWxhID09PSAnZmFsc2UnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmIChjb250ZXh0ICE9IG51bGwgJiYgY29udGV4dFtmb3JtdWxhXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIGNvbnRleHRbZm9ybXVsYV07XG4gIH1cbiAgaWYgKC9eXCJbXlwiXSpcIiQvLnRlc3QoZm9ybXVsYSkpIHtcbiAgICByZXR1cm4gZm9ybXVsYS5yZXBsYWNlKC9eXCIrfFwiKyQvZywgJycpO1xuICB9XG4gIGNvbnN0IGlkZW50aWZpZXJzID1cbiAgICAgIHRva2VuaXplKGZvcm11bGEpLmZpbHRlcigodDogYW55KSA9PiB0LnR5cGUgPT09ICdJZGVudGlmaWVyJykubWFwKCh0OiBhbnkpID0+IHQudmFsdWUpO1xuICBjb25zdCBjdHg6IGFueVtdID0gW107XG4gIGlkZW50aWZpZXJzLmZvckVhY2goKGtleTogc3RyaW5nKSA9PiB7XG4gICAgbGV0IHZhbDogYW55ID0gbnVsbDtcbiAgICBpZiAoY29udGV4dCAhPSBudWxsICYmIGNvbnRleHRba2V5XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB2YWwgPSBjb250ZXh0W2tleV07XG4gICAgfSBlbHNlIGlmIChBamZFeHByZXNzaW9uVXRpbHMudXRpbHNba2V5XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb25zdCB1dGlsID0gQWpmRXhwcmVzc2lvblV0aWxzLnV0aWxzW2tleV07XG4gICAgICB2YWwgPSB1dGlsLmZuO1xuICAgIH1cbiAgICBjdHgucHVzaCh2YWwpO1xuICB9KTtcbiAgaWRlbnRpZmllcnMucHVzaCgnZXhlY0NvbnRleHQnKTtcbiAgY3R4LnB1c2goZXhlY0NvbnRleHQpO1xuXG4gIHRyeSB7XG4gICAgbGV0IGYgPSBuZXcgRnVuY3Rpb24oLi4uaWRlbnRpZmllcnMsIGByZXR1cm4gJHtmb3JtdWxhfWApO1xuICAgIGNvbnN0IHJlcyA9IGYoLi4uY3R4KTtcbiAgICBmID0gPGFueT5udWxsO1xuICAgIHJldHVybiByZXM7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cbi8qKlxuICogSXQgcmV0dXJucyB0aGUgY291bnQgb2YgZGlnaXQgaW5zaWRlIHguXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkaWdpdENvdW50KHg6IG51bWJlcik6IG51bWJlciB7XG4gIGlmIChpc05hTih4KSB8fCB0eXBlb2YgKHgpICE9PSAnbnVtYmVyJykge1xuICAgIHJldHVybiAwO1xuICB9XG4gIGlmICghaXNGaW5pdGUoeCkpIHtcbiAgICByZXR1cm4gSW5maW5pdHk7XG4gIH1cbiAgcmV0dXJuIHgudG9TdHJpbmcoKS5yZXBsYWNlKC9bXjAtOV0vZywgJycpLmxlbmd0aDtcbn1cbi8qKlxuICogSXQgaXMgY291bnQgdGhlIGNvdW50IG9mIGRlY2ltYWwgZGlnaXQgaW5zaWRlIHMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZWNpbWFsQ291bnQoeDogc3RyaW5nfG51bWJlcik6IG51bWJlciB7XG4gIGlmICh0eXBlb2YgeCA9PT0gJ3N0cmluZycpIHtcbiAgICB4ID0gcGFyc2VGbG9hdCh4KTtcbiAgfVxuICBpZiAodHlwZW9mIHggIT09ICdudW1iZXInIHx8IGlzTmFOKHgpKSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cbiAgY29uc3QgcGFydHMgPSB4LnRvU3RyaW5nKCkuc3BsaXQoJy4nKTtcbiAgcmV0dXJuIHBhcnRzLmxlbmd0aCA+IDEgPyBwYXJ0c1sxXS5sZW5ndGggOiAwO1xufVxuLyoqXG4gKiBJdCBpcyB0cnVlIGlmIHggaXMgYW4gaW50ZWdlci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzSW50KHg6IHN0cmluZ3xudW1iZXIpOiBib29sZWFuIHtcbiAgaWYgKHR5cGVvZiAoeCkgPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIC9eLT9cXGQrJC8udGVzdCh4KTtcbiAgfVxuICBpZiAodHlwZW9mICh4KSA9PT0gJ251bWJlcicpIHtcbiAgICByZXR1cm4gTWF0aC5yb3VuZCh4KSA9PT0geDtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG4vKipcbiAqIEl0IGlzIHRydWUgaWYgeCBpcyBub3QgZW1wdHkuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBub3RFbXB0eSh4OiBhbnkpOiBib29sZWFuIHtcbiAgcmV0dXJuICh0eXBlb2YgeCAhPT0gJ3VuZGVmaW5lZCcgJiYgeCAhPT0gbnVsbCA/IHgudG9TdHJpbmcoKS5sZW5ndGggPiAwIDogZmFsc2UpO1xufVxuLyoqXG4gKiBJdCBpcyB0cnVlIGlmIGFycmF5IGNvbnRhaW5zIHggb3IgYXJyYXkgaXMgZXF1YWwgdG8geC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHZhbHVlSW5DaG9pY2UoYXJyYXk6IGFueVtdLCB4OiBhbnkpOiBib29sZWFuIHtcbiAgcmV0dXJuIChhcnJheSB8fCBbXSkuaW5kZXhPZih4KSA+IC0xIHx8IGFycmF5ID09PSB4O1xufVxuLyoqXG4gKiBJdCBhcHBsaWVzIGNhbGxiYWNrIGZvciByZXBzIHRpbWVzIGFuZCBhY2N1bXVsYXRlIHRoZSByZXN1bHQgaW4gYWNjLlxuICovXG5leHBvcnQgZnVuY3Rpb24gc2Nhbkdyb3VwRmllbGQocmVwczogbnVtYmVyLCBhY2M6IGFueSwgY2FsbGJhY2s6IGFueSk6IGFueSB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcmVwczsgaSsrKSB7XG4gICAgYWNjID0gY2FsbGJhY2soYWNjLCBpKTtcbiAgfVxuICByZXR1cm4gYWNjO1xufVxuLyoqXG4gKiBJdCByZXR1cm5zIHRoZSBzdW0gb2YgdGhlIGFycmF5IHZhbHVlcy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHN1bShhcnJheTogYW55W10pOiBhbnkge1xuICByZXR1cm4gYXJyYXkucmVkdWNlKChhLCBiKSA9PiBhICsgYiwgMCk7XG59XG4vKipcbiAqIEl0IGFwcGxpZXMgYWRkL3JlbW92ZShvcGVyYXRpb24pIHYgKGRheS9tb250aC95ZWFyKXBlcmlvZCB0byBkc3RyaW5nIGFuZCByZXR1cm4gbmV3IGZvcm1hdCBkYXRlLlxuICovXG4vLyBUT0RPIGNoZWNrIGlmIGRlcHJlY2F0ZWQgaW5zdGVhZCByZWZhY290b3JpbmcgcGFyYW1ldGVyIHR5cGVcbi8vIFRPRE8gKGRTdHJpbmc6IHN0cmluZ3xudWxsLCBwZXJpb2Q6J2RheSd8J21vbnRoJ3wneWVhcicsXG4vLyBUT0RPIG9wZXJhdGlvbjogJ2FkZC9yZW1vdmUnID0gJ2FkZCcsIHY6bnVtYmVyKVxuZXhwb3J0IGZ1bmN0aW9uIGRhdGVPcGVyYXRpb25zKGRTdHJpbmc6IHN0cmluZywgcGVyaW9kOiBzdHJpbmcsIG9wZXJhdGlvbjogc3RyaW5nLCB2OiBhbnkpOiBzdHJpbmcge1xuICBjb25zdCBmbXQgPSAnbW0vZGQveXl5eSc7XG4gIGxldCBkID0gKHR5cGVvZiBkU3RyaW5nICE9PSAndW5kZWZpbmVkJykgPyBkYXRlVXRpbHMucGFyc2UoZFN0cmluZykgOiBuZXcgRGF0ZSgpO1xuICBpZiAob3BlcmF0aW9uID09ICdyZW1vdmUnKSB7XG4gICAgdiA9IC12O1xuICB9XG4gIGxldCBkYXRlT3A7XG4gIHN3aXRjaCAocGVyaW9kKSB7XG4gICAgY2FzZSAnZGF5JzpcbiAgICAgIGRhdGVPcCA9IGRhdGVVdGlscy5hZGREYXlzO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnbW9udGgnOlxuICAgICAgZGF0ZU9wID0gZGF0ZVV0aWxzLmFkZE1vbnRocztcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3llYXInOlxuICAgICAgZGF0ZU9wID0gZGF0ZVV0aWxzLmFkZFllYXJzO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiAnJztcbiAgfVxuICByZXR1cm4gZGF0ZVV0aWxzLmZvcm1hdChkYXRlT3AoZCwgdiksIGZtdCk7XG59XG4vKipcbiAqIEl0IHJvdW5kcyB0aGUgbnVtIHdpdGggdGhlIHZhbHVlIG9mIGRpZ2l0c1xuICovXG5leHBvcnQgZnVuY3Rpb24gcm91bmQobnVtOiBudW1iZXJ8c3RyaW5nLCBkaWdpdHM6IG51bWJlcik6IG51bWJlciB7XG4gIGRpZ2l0cyA9IGRpZ2l0cyB8fCAwO1xuICBsZXQgZjtcbiAgaWYgKHR5cGVvZiBudW0gIT09ICdudW1iZXInKSB7XG4gICAgdHJ5IHtcbiAgICAgIGYgPSBwYXJzZUZsb2F0KG51bSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBmID0gbnVtO1xuICB9XG4gIGlmIChmID09IG51bGwgfHwgaXNOYU4oZikpIHtcbiAgICBmID0gMDtcbiAgfVxuICBjb25zdCBtID0gTWF0aC5wb3coMTAsIGRpZ2l0cyk7XG4gIHJldHVybiBNYXRoLnJvdW5kKGYgKiBtKSAvIG07XG59XG4vKipcbiAqIEl0IGV4dHJhY3RzIHByb3BlcnR5IGZyb20gc291cmNlLlxuICogZm9yIGV2ZXJ5IGVsZW1lbnQgb2Ygc291cmNlIGlmIHByb3BlcnR5IGFuZCBwcm9wZXJ0eTIgYXJlIGRlZmluZWQgcmV0dXJuIHRoZSBzdW1cbiAqIGVsc2UgaWYgb25seSBwcm9wZXJ0eSBpcyBkZWZpbmVkIHJldHVybiBoaW0uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBleHRyYWN0QXJyYXkoc291cmNlOiBhbnlbXSwgcHJvcGVydHk6IHN0cmluZywgcHJvcGVydHkyPzogc3RyaW5nKTogYW55W10ge1xuICBzb3VyY2UgPSAoc291cmNlIHx8IFtdKS5zbGljZSgwKTtcbiAgY29uc3QgbCA9IHNvdXJjZS5sZW5ndGg7XG4gIGNvbnN0IHJlczogYW55W10gPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsOyBpKyspIHtcbiAgICBpZiAoc291cmNlW2ldW3Byb3BlcnR5XSAhPSBudWxsICYmIHByb3BlcnR5MiAhPSBudWxsICYmIHNvdXJjZVtpXVtwcm9wZXJ0eTJdICE9IG51bGwpIHtcbiAgICAgIHJlcy5wdXNoKE51bWJlcihzb3VyY2VbaV1bcHJvcGVydHldKSArIE51bWJlcihzb3VyY2VbaV1bcHJvcGVydHkyXSkpO1xuICAgIH0gZWxzZSBpZiAoc291cmNlW2ldW3Byb3BlcnR5XSAhPSBudWxsKSB7XG4gICAgICByZXMucHVzaChzb3VyY2VbaV1bcHJvcGVydHldKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cbi8qKlxuICogSXQgcmV0dXJucyB0aGUgc3VtIG9mIGFsbCBkZWZpbmVkIHByb3BlcnRpZXMgb2YgZWFjaCBlbGVtZW50IG9mIHNvdXJjZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGV4dHJhY3RTdW0oc291cmNlOiBhbnlbXSwgcHJvcGVydGllczogc3RyaW5nW10pOiBudW1iZXIge1xuICBsZXQgc3VtVmFsID0gMDtcbiAgcHJvcGVydGllcyA9IChwcm9wZXJ0aWVzIHx8IFtdKS5zbGljZSgwKTtcbiAgY29uc3QgbCA9IHByb3BlcnRpZXMubGVuZ3RoO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbDsgaSsrKSB7XG4gICAgY29uc3QgYXJyYXkgPSBleHRyYWN0QXJyYXkoc291cmNlLCBwcm9wZXJ0aWVzW2ldKTtcbiAgICBjb25zdCBsZW5nID0gYXJyYXkubGVuZ3RoO1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgbGVuZzsgaisrKSB7XG4gICAgICBpZiAoIWlzTmFOKE51bWJlcihhcnJheVtqXSkpKSB7XG4gICAgICAgIHN1bVZhbCArPSBOdW1iZXIoYXJyYXlbal0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gc3VtVmFsO1xufVxuLyoqXG4gKiBJdCByZXR1cm5zIGEgbnVtYmVyIGFycmF5IHRoYXQgY29udGFpbnMgdGhlIHN1bSBvZiBwcm9wZXJ0aWVzIHZhbHVlIGluc2lkZSB0aGUgc291cmNlLlxuICogZXh0cmFjdEFycmF5U3VtKFt7YTogNX0sIHtiOiAxfSwge2E6IDUsIGI6IDF9XSwgWydhJywgJ2InXSk7ID0mZ3Q7IFs2LDZdXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBleHRyYWN0QXJyYXlTdW0oc291cmNlOiBhbnlbXSwgcHJvcGVydGllczogc3RyaW5nW10pOiBhbnlbXSB7XG4gIGNvbnN0IGFycmF5czogYW55W10gPSBbXTtcbiAgcHJvcGVydGllcyA9IChwcm9wZXJ0aWVzIHx8IFtdKS5zbGljZSgwKTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IHByb3BlcnRpZXMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBhcnJheSA9IGV4dHJhY3RBcnJheShzb3VyY2UsIHByb3BlcnRpZXNbaV0pO1xuICAgIGFycmF5cy5wdXNoKGFycmF5KTtcbiAgfVxuXG4gIGNvbnN0IHJlczogYW55W10gPSBbXTtcbiAgaWYgKGFycmF5cy5sZW5ndGggPiAwKSB7XG4gICAgZm9yIChsZXQgd2Vla0kgPSAwOyB3ZWVrSSA8IGFycmF5c1swXS5sZW5ndGg7IHdlZWtJKyspIHtcbiAgICAgIGxldCBzdW1WYWwgPSAwO1xuICAgICAgZm9yIChsZXQgcHJvcEkgPSAwOyBwcm9wSSA8IHByb3BlcnRpZXMubGVuZ3RoOyBwcm9wSSsrKSB7XG4gICAgICAgIHN1bVZhbCA9IHN1bVZhbCArIE51bWJlcihhcnJheXNbcHJvcEldW3dlZWtJXSk7XG4gICAgICB9XG4gICAgICByZXMucHVzaChzdW1WYWwpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzO1xufVxuLyoqXG4gKiBEcmF3IGEgdGhyZXNob2xkIGxpbmUgb24gY2hhcnQgcmVsYXRlZCB0byB0aGUgcHJvcGVydHkuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkcmF3VGhyZXNob2xkKHNvdXJjZTogYW55W10sIHByb3BlcnR5OiBzdHJpbmcsIHRocmVzaG9sZDogYW55W10pOiBhbnlbXSB7XG4gIHNvdXJjZSA9IChzb3VyY2UgfHwgW10pLnNsaWNlKDApO1xuICB0aHJlc2hvbGQgPSB0aHJlc2hvbGQgfHwgWzBdO1xuICBpZiAoISh0aHJlc2hvbGQgaW5zdGFuY2VvZiBBcnJheSkpIHtcbiAgICB0aHJlc2hvbGQgPSBbdGhyZXNob2xkXTtcbiAgfVxuICBjb25zdCBsID0gc291cmNlLmxlbmd0aDtcbiAgY29uc3QgcmVzOiBhbnlbXSA9IFtdO1xuICBsZXQgY291bnQgPSAwO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGw7IGkrKykge1xuICAgIGlmIChzb3VyY2VbaV1bcHJvcGVydHldICE9IG51bGwpIHtcbiAgICAgIGlmICh0aHJlc2hvbGQubGVuZ3RoID4gY291bnQpIHtcbiAgICAgICAgcmVzLnB1c2godGhyZXNob2xkW2NvdW50XSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXMucHVzaCh0aHJlc2hvbGRbMF0pO1xuICAgICAgfVxuICAgICAgY291bnQrKztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cbi8qKlxuICogRXh0cmFjdCB0aGUgZGF0ZXMgb2YgdGhlIHNvdXJjZSBvYmplY3Qgd2l0aCBwcm9wZXJ0eSAhPSBudWxsXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBleHRyYWN0RGF0ZXMoc291cmNlOiBhbnlbXSwgcHJvcGVydHk6IHN0cmluZywgZm10OiBzdHJpbmcpOiBzdHJpbmdbXSB7XG4gIHNvdXJjZSA9IChzb3VyY2UgfHwgW10pLnNsaWNlKDApO1xuICBjb25zdCBsID0gc291cmNlLmxlbmd0aDtcbiAgY29uc3QgcmVzOiBhbnkgPSBbXTtcbiAgbGV0IHByZWZpeCA9ICcnO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGw7IGkrKykge1xuICAgIGlmIChzb3VyY2VbaV1bcHJvcGVydHldICE9IG51bGwpIHtcbiAgICAgIHN3aXRjaCAoZm10KSB7XG4gICAgICAgIGNhc2UgJ1dXJzpcbiAgICAgICAgY2FzZSAnd3cnOlxuICAgICAgICAgIHByZWZpeCA9ICdXJztcbiAgICAgICAgICByZXMucHVzaChwcmVmaXggKyBmb3JtYXREYXRlKHNvdXJjZVtpXVsnZGF0ZV9zdGFydCddLCBmbXQpKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnTU0nOlxuICAgICAgICBjYXNlICdtbSc6XG4gICAgICAgICAgcHJlZml4ID0gJ00nO1xuICAgICAgICAgIHJlcy5wdXNoKHByZWZpeCArIGlzb01vbnRoKHNvdXJjZVtpXVsnZGF0ZV9zdGFydCddLCBmbXQpKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBwcmVmaXggPSAnJztcbiAgICAgICAgICByZXMucHVzaChwcmVmaXggKyBmb3JtYXREYXRlKHNvdXJjZVtpXVsnZGF0ZV9zdGFydCddLCBmbXQpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cbi8qKlxuICogRXh0cmFjdCB0aGUgbGFzdCBwcm9wZXJ0eSBjb250YWlucyBpbiBzb3VyY2UgIT0gbnVsbFxuICovXG5leHBvcnQgZnVuY3Rpb24gbGFzdFByb3BlcnR5KHNvdXJjZTogYW55LCBwcm9wZXJ0eTogc3RyaW5nKTogYW55IHtcbiAgc291cmNlID0gKHNvdXJjZSB8fCBbXSkuc2xpY2UoMCk7XG4gIGxldCBsID0gc291cmNlLmxlbmd0aCAtIDE7XG5cbiAgd2hpbGUgKGwgPj0gMCAmJiBzb3VyY2VbbF1bcHJvcGVydHldID09IG51bGwpIHtcbiAgICBsLS07XG4gICAgaWYgKGwgPCAwKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICB9XG4gIHJldHVybiBsID49IDAgPyBzb3VyY2VbbF1bcHJvcGVydHldIDogJyc7XG59XG4vKipcbiAqIEl0IHN1bSB0aGUgTEFzdCBwcm9wZXJ0aWVzIG9mIHNvdXJjZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHN1bUxhc3RQcm9wZXJ0aWVzKHNvdXJjZTogYW55W10sIHByb3BlcnRpZXM6IHN0cmluZ1tdKTogbnVtYmVyIHtcbiAgc291cmNlID0gKHNvdXJjZSB8fCBbXSkuc2xpY2UoMCk7XG4gIGxldCBzdW1WYWwgPSAwO1xuICBsZXQgdmFsID0gMDtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9wZXJ0aWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFsID0gTnVtYmVyKGxhc3RQcm9wZXJ0eShzb3VyY2UsIHByb3BlcnRpZXNbaV0pKTtcbiAgICBpZiAoIWlzTmFOKHZhbCkpIHtcbiAgICAgIHN1bVZhbCArPSB2YWw7XG4gICAgfVxuICB9XG4gIHJldHVybiBzdW1WYWw7XG59XG4vKipcbiAqIENvbXB1dGUgdGhlIHRyZW5kIG9mIHRoZSBwcm9wZXJ0eSBjb250YWluZWQgb24gdGhlIHNvdXJjZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNhbGN1bGF0ZVRyZW5kUHJvcGVydHkoc291cmNlOiBhbnlbXSwgcHJvcGVydHk6IHN0cmluZyk6IHN0cmluZyB7XG4gIHNvdXJjZSA9IChzb3VyY2UgfHwgW10pLnNsaWNlKDApO1xuICBsZXQgbGFzdCA9IHNvdXJjZS5sZW5ndGggLSAxO1xuICB3aGlsZSAoc291cmNlW2xhc3RdW3Byb3BlcnR5XSA9PSBudWxsKSB7XG4gICAgaWYgKGxhc3QgPT0gMCkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGxhc3QtLTtcbiAgfVxuICBsZXQgbGFzdExhc3QgPSBsYXN0IC0gMTtcbiAgaWYgKGxhc3QgPT0gMCkge1xuICAgIGxhc3RMYXN0ID0gbGFzdDtcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc291cmNlW2xhc3RMYXN0XVtwcm9wZXJ0eV0gPT0gbnVsbCkge1xuICAgICAgaWYgKGxhc3RMYXN0ID09IDApIHtcbiAgICAgICAgbGFzdExhc3QgPSBsYXN0O1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGxhc3RMYXN0LS07XG4gICAgfVxuICB9XG5cbiAgY29uc3QgbGFzdFByb3AgPSBzb3VyY2VbbGFzdF0gPyAoc291cmNlW2xhc3RdW3Byb3BlcnR5XSB8fCAwKSA6IDA7XG4gIGNvbnN0IGxhc3RMYXN0UHJvcCA9IHNvdXJjZVtsYXN0TGFzdF0gPyAoc291cmNlW2xhc3RMYXN0XVtwcm9wZXJ0eV0gfHwgMCkgOiAwO1xuXG4gIGlmIChsYXN0UHJvcCA9PSBsYXN0TGFzdFByb3ApIHtcbiAgICByZXR1cm4gJzxwPjxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIiBzdHlsZT1cImNvbG9yOmJsdWVcIj50cmVuZGluZ19mbGF0PC9pPjwvcD4nO1xuICB9IGVsc2UgaWYgKGxhc3RQcm9wID4gbGFzdExhc3RQcm9wKSB7XG4gICAgcmV0dXJuICc8cD48aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCIgc3R5bGU9XCJjb2xvcjpncmVlblwiPnRyZW5kaW5nX3VwPC9pPjwvcD4nO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAnPHA+PGkgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiIHN0eWxlPVwiY29sb3I6cmVkXCI+dHJlbmRpbmdfZG93bjwvaT48L3A+JztcbiAgfVxufVxuLyoqXG4gKiBDb21wdXRlIHRoZSBhdmVyYWdlIHZhbHVlIG9mIHRoZSBwcm9wZXJ0eSBjb250YWluZWQgb24gdGhlIHNvdXJjZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNhbGN1bGF0ZVRyZW5kQnlQcm9wZXJ0aWVzKHNvdXJjZTogYW55W10sIHByb3BlcnRpZXM6IHN0cmluZ1tdKTogc3RyaW5nIHtcbiAgY29uc3QgYXJyYXlzdW0gPSBleHRyYWN0QXJyYXlTdW0oc291cmNlLCBwcm9wZXJ0aWVzKTtcblxuICBjb25zdCBsYXN0UHJvcCA9IGFycmF5c3VtLmxlbmd0aCA+IDAgPyAoYXJyYXlzdW1bYXJyYXlzdW0ubGVuZ3RoIC0gMV0gfHwgMCkgOiAwO1xuICBjb25zdCBsYXN0TGFzdFByb3AgPSBhcnJheXN1bS5sZW5ndGggPiAxID8gKGFycmF5c3VtW2FycmF5c3VtLmxlbmd0aCAtIDJdIHx8IDApIDogbGFzdFByb3A7XG5cbiAgaWYgKGxhc3RQcm9wID09IGxhc3RMYXN0UHJvcCkge1xuICAgIHJldHVybiAnPHA+PGkgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiIHN0eWxlPVwiY29sb3I6Ymx1ZVwiPnRyZW5kaW5nX2ZsYXQ8L2k+PC9wPic7XG4gIH0gZWxzZSBpZiAobGFzdFByb3AgPiBsYXN0TGFzdFByb3ApIHtcbiAgICByZXR1cm4gJzxwPjxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIiBzdHlsZT1cImNvbG9yOmdyZWVuXCI+dHJlbmRpbmdfdXA8L2k+PC9wPic7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuICc8cD48aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCIgc3R5bGU9XCJjb2xvcjpyZWRcIj50cmVuZGluZ19kb3duPC9pPjwvcD4nO1xuICB9XG59XG4vKipcbiAqXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjYWxjdWxhdGVBdmdQcm9wZXJ0eShcbiAgICBzb3VyY2U6IGFueVtdLCBwcm9wZXJ0eTogc3RyaW5nLCByYW5nZTogbnVtYmVyLCBjb2VmZmljaWVudDogbnVtYmVyKTogbnVtYmVyIHtcbiAgc291cmNlID0gKHNvdXJjZSB8fCBbXSkuc2xpY2UoMCk7XG5cbiAgY29lZmZpY2llbnQgPSBjb2VmZmljaWVudCB8fCAxO1xuICByYW5nZSA9IHJhbmdlIHx8IDEyO1xuXG4gIGxldCBsID0gc291cmNlLmxlbmd0aDtcbiAgbGV0IHJlcyA9IDA7XG4gIGxldCBjb3VudGVyID0gMDtcbiAgbGV0IG5vWmVybyA9IDA7XG5cbiAgaWYgKGwgPCByYW5nZSkge1xuICAgIHJhbmdlID0gbDtcbiAgfVxuXG4gIHdoaWxlIChyYW5nZSAhPSAwKSB7XG4gICAgaWYgKHNvdXJjZVtsIC0gMV1bcHJvcGVydHldICE9IG51bGwpIHtcbiAgICAgIGNvdW50ZXIrKztcbiAgICAgIHJlcyArPSBOdW1iZXIoc291cmNlW2wgLSAxXVtwcm9wZXJ0eV0pO1xuXG4gICAgICBpZiAoc291cmNlW2wgLSAxXVtwcm9wZXJ0eV0gPiAwKSB7XG4gICAgICAgIG5vWmVybysrO1xuICAgICAgfVxuICAgIH1cbiAgICBsLS07XG4gICAgcmFuZ2UtLTtcbiAgfVxuXG4gIGlmIChjb2VmZmljaWVudCA9PSAwKSB7XG4gICAgcmV0dXJuIG5vWmVybztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gcm91bmQoKHJlcyAvIGNvdW50ZXIpICogY29lZmZpY2llbnQsIDIpIHx8IDA7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNhbGN1bGF0ZUF2Z1Byb3BlcnR5QXJyYXkoXG4gICAgc291cmNlOiBhbnlbXSwgcHJvcGVydGllczogc3RyaW5nW10sIHJhbmdlOiBudW1iZXIsIGNvZWZmaWNpZW50OiBudW1iZXIpOiBudW1iZXJbXSB7XG4gIHNvdXJjZSA9IChzb3VyY2UgfHwgW10pLnNsaWNlKDApO1xuICBjb25zdCByZXNBcnI6IGFueVtdID0gW107XG5cbiAgaWYgKHByb3BlcnRpZXMgJiYgcHJvcGVydGllcy5sZW5ndGggPiAwKSB7XG4gICAgbGV0IGF2ZyA9IDA7XG5cbiAgICBjb2VmZmljaWVudCA9IGNvZWZmaWNpZW50IHx8IDE7XG4gICAgcmFuZ2UgPSByYW5nZSB8fCAxMjtcblxuICAgIGNvbnN0IHNvdXJjZUFyciA9IHByb3BlcnRpZXMubGVuZ3RoID4gMSA/IGV4dHJhY3RBcnJheVN1bShzb3VyY2UsIHByb3BlcnRpZXMpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHRyYWN0QXJyYXkoc291cmNlLCBwcm9wZXJ0aWVzWzBdKTtcblxuICAgIGxldCBsID0gc291cmNlQXJyLmxlbmd0aDtcblxuICAgIGZvciAobGV0IGxlbiA9IGw7IGxlbiA+IDA7IGxlbi0tKSB7XG4gICAgICBsZXQgcmVzID0gMDtcbiAgICAgIGxldCBjb3VudGVyID0gMDtcbiAgICAgIGxldCBub1plcm8gPSAwO1xuXG4gICAgICBpZiAobGVuIDwgcmFuZ2UpIHtcbiAgICAgICAgcmFuZ2UgPSBsZW47XG4gICAgICB9XG5cbiAgICAgIGZvciAobGV0IHIgPSAxOyByIDw9IHJhbmdlOyByKyspIHtcbiAgICAgICAgbGV0IHZhbCA9IHNvdXJjZUFycltsZW4gLSByXTtcbiAgICAgICAgaWYgKHZhbCAhPSBudWxsKSB7XG4gICAgICAgICAgY291bnRlcisrO1xuICAgICAgICAgIHJlcyArPSBOdW1iZXIodmFsKTtcbiAgICAgICAgICBpZiAodmFsID4gMCkge1xuICAgICAgICAgICAgbm9aZXJvKys7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChjb3VudGVyID4gMCkge1xuICAgICAgICBpZiAoY29lZmZpY2llbnQgPT0gMCkge1xuICAgICAgICAgIGF2ZyA9IG5vWmVybztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhdmcgPSAocmVzIC8gY291bnRlcikgKiBjb2VmZmljaWVudCB8fCAwO1xuICAgICAgICB9XG4gICAgICAgIHJlc0Fyci5wdXNoKHJvdW5kKGF2ZywgMikpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzQXJyLnJldmVyc2UoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFsZXJ0KHNvdXJjZTogYW55W10sIHByb3BlcnR5OiBzdHJpbmcsIHRocmVzaG9sZDogbnVtYmVyKTogc3RyaW5nIHtcbiAgc291cmNlID0gKHNvdXJjZSB8fCBbXSkuc2xpY2UoMCk7XG5cbiAgaWYgKGxhc3RQcm9wZXJ0eShzb3VyY2UsIHByb3BlcnR5KSA+IHRocmVzaG9sZCkge1xuICAgIHJldHVybiAnPHA+PGkgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiIHN0eWxlPVwiY29sb3I6cmVkXCI+d2FybmluZzwvaT48L3A+JztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gJzxwPjwvcD4nO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXROdW1iZXIobnVtOiBudW1iZXIsIGZtdD86IHN0cmluZyk6IHN0cmluZyB7XG4gIGZtdCA9IGZtdCB8fCAnMCwwWy5dMCc7XG4gIHJldHVybiBudW1icm8obnVtKS5mb3JtYXQoZm10KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdERhdGUoZGF0ZTogRGF0ZXxzdHJpbmcsIGZtdD86IHN0cmluZyk6IHN0cmluZyB7XG4gIGZtdCA9IGZtdCB8fCAnbW0tREQteXl5eSc7XG4gIHJldHVybiBkYXRlVXRpbHMuZm9ybWF0KHR5cGVvZiBkYXRlID09PSAnc3RyaW5nJyA/IGRhdGVVdGlscy5wYXJzZShkYXRlKSA6IGRhdGUsIGZtdCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc29Nb250aChkYXRlOiBEYXRlLCBmbXQ/OiBzdHJpbmcpOiBzdHJpbmcge1xuICBmbXQgPSBmbXQgfHwgJ21tJztcbiAgY29uc3QgZHUgPSBkYXRlVXRpbHM7XG4gIHJldHVybiBkdS5mb3JtYXQoZHUuYWRkRGF5cyhkdS5zdGFydE9mSVNPV2VlayhkYXRlKSwgMyksIGZtdCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRDb29yZGluYXRlKHNvdXJjZTogYW55LCB6b29tPzogbnVtYmVyKTogW251bWJlciwgbnVtYmVyLCBudW1iZXJdIHtcbiAgem9vbSA9IHpvb20gfHwgNjtcbiAgaWYgKHNvdXJjZSA9PSBudWxsKSB7XG4gICAgcmV0dXJuIFs1MS41MDUsIC0wLjA5LCB6b29tXTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gW3NvdXJjZVswXSwgc291cmNlWzFdLCB6b29tXTtcbiAgfVxufVxuXG4vKipcbiAqIENvdW50cyB0aGUgY29sbGVjdGVkIGZvcm1zLiBUaGUgZm9ybSBuYW1lIG11c3QgYmUgc3BlY2lmaWVkLiBBbiBvcHRpb25hbCBjb25kaXRpb24gY2FuIGJlIGFkZGVkXG4gKiB0byBkaXNjcmltaW5hdGUgd2hpY2ggZm9ybXMgdG8gY291bnQgaW4uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBDT1VOVEZPUk1TKGZvcm1zOiBGb3JtW10sIGV4cHJlc3Npb246IHN0cmluZyA9ICd0cnVlJyk6IG51bWJlciB7XG4gIGZvcm1zID0gKGZvcm1zIHx8IFtdKS5zbGljZSgwKTtcbiAgaWYgKGV4cHJlc3Npb24gPT09ICd0cnVlJykge1xuICAgIHJldHVybiBmb3Jtcy5sZW5ndGg7XG4gIH1cbiAgaWYgKGZvcm1zLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiAwO1xuICB9XG4gIGNvbnN0IGlzSW5SZXBlYXRpbmdTbGlkZSA9IGV4cHJlc3Npb24uaW5jbHVkZXMoYF9fYCk7XG4gIGlmIChpc0luUmVwZWF0aW5nU2xpZGUpIHtcbiAgICBsZXQgY291bnQgPSAwO1xuXG4gICAgZm9ybXMuZm9yRWFjaChmID0+IHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IE1BWF9SRVBTOyBpKyspIHtcbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKGYpLmZpbHRlcihrZXkgPT4ga2V5LmluY2x1ZGVzKGBfXyR7aX1gKSkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGV2YWx1YXRlRXhwcmVzc2lvbihleHByZXNzaW9uLnJlcGxhY2UoJ19fJywgYF9fJHtpfWApKSwgZikge1xuICAgICAgICAgIGNvdW50Kys7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBjb3VudDtcblxuICB9IGVsc2Uge1xuICAgIHJldHVybiBmb3Jtcy5maWx0ZXIoKGYpID0+IGV2YWx1YXRlRXhwcmVzc2lvbihleHByZXNzaW9uLCBmKSkubGVuZ3RoO1xuICB9XG59XG5cbi8qKlxuICogQ291bnRzIHRoZSBhbW91bnQgb2YgdW5pcXVlIGZvcm0gdmFsdWVzIGZvciBhIHNwZWNpZmljIGZpZWxkLiBUaGUgZm9ybSBuYW1lIG11c3QgYmUgc3BlY2lmaWVkLiBBblxuICogb3B0aW9uYWwgY29uZGl0aW9uIGNhbiBiZSBhZGRlZCB0byBkaXNjcmltaW5hdGUgd2hpY2ggZm9ybXMgdG8gY291bnQgaW5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIENPVU5URk9STVNfVU5JUVVFKGZvcm1zOiBGb3JtW10sIGZpZWxkTmFtZTogc3RyaW5nLCBleHByZXNzaW9uPzogc3RyaW5nKTogbnVtYmVyIHtcbiAgZm9ybXMgPSAoZm9ybXMgfHwgW10pLnNsaWNlKDApO1xuICBjb25zdCB2YWx1ZXM6IHN0cmluZ3xudW1iZXJbXSA9IFtdO1xuXG4gIGlmIChleHByZXNzaW9uICE9IG51bGwpIHtcbiAgICBmb3JtcyA9IGZvcm1zLmZpbHRlcihmID0+IGV2YWx1YXRlRXhwcmVzc2lvbihleHByZXNzaW9uIGFzIHN0cmluZywgZikpO1xuICB9XG5cbiAgZm9ybXMuZm9yRWFjaChmID0+IHtcbiAgICB2YWx1ZXMucHVzaChldmFsdWF0ZUV4cHJlc3Npb24oZmllbGROYW1lLCBmKSk7XG4gIH0pO1xuXG4gIHJldHVybiBBcnJheS5mcm9tKG5ldyBTZXQodmFsdWVzKSkubGVuZ3RoO1xufVxuXG4vKipcbiAqIEFnZ3JlZ2F0ZXMgYW5kIHN1bXMgdGhlIHZhbHVlcyBvZiBvbmUgb3IgbW9yZS4gQW4gb3B0aW9uYWwgY29uZGl0aW9uIGNhbiBiZSBhZGRlZCB0byBkaXNjcmltaW5hdGVcbiAqIHdoaWNoIGZvcm1zIHRvIHRha2UgZm9yIHRoZSBzdW0uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBTVU0oZm9ybXM6IEZvcm1bXSwgZXhwcmVzc2lvbjogc3RyaW5nLCBjb25kaXRpb24/OiBzdHJpbmcpOiBudW1iZXIge1xuICBsZXQgYWNjID0gMDtcbiAgZm9ybXMgPSAoZm9ybXMgfHwgW10pLnNsaWNlKDApO1xuXG4gIGlmIChleHByZXNzaW9uID09IG51bGwpIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuICBpZiAoY29uZGl0aW9uICE9IG51bGwpIHtcbiAgICBmb3JtcyA9IGZvcm1zLmZpbHRlcigoZikgPT4gZXZhbHVhdGVFeHByZXNzaW9uKGNvbmRpdGlvbiwgZikpO1xuICB9XG4gIGNvbnN0IGlzSW5SZXBlYXRpbmdTbGlkZSA9IGV4cHJlc3Npb24uaW5jbHVkZXMoYF9fYCk7XG4gIGlmIChpc0luUmVwZWF0aW5nU2xpZGUpIHtcbiAgICBmb3Jtcy5mb3JFYWNoKGYgPT4ge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gTUFYX1JFUFM7IGkrKykge1xuICAgICAgICBpZiAoT2JqZWN0LmtleXMoZikuZmlsdGVyKGtleSA9PiBrZXkuaW5jbHVkZXMoYF9fJHtpfWApKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBldmFsdWF0ZWRFeHByZXNzaW9uID0gZXZhbHVhdGVFeHByZXNzaW9uKGV4cHJlc3Npb24ucmVwbGFjZSgnX18nLCBgX18ke2l9YCksIGYpO1xuICAgICAgICBpZiAoTnVtYmVyLmlzRmluaXRlKGV2YWx1YXRlRXhwcmVzc2lvbikpIHtcbiAgICAgICAgICBhY2MgKz0gZXZhbHVhdGVkRXhwcmVzc2lvbjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIGZvcm1zLmZvckVhY2goKGYpID0+IGFjYyArPSBldmFsdWF0ZUV4cHJlc3Npb24oZXhwcmVzc2lvbiwgZikpO1xuICB9XG5cbiAgcmV0dXJuIGFjYztcbn1cblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBtZWFuIG9mIGEgc2ltcGxlIG9yIGRlcml2ZWQgdmFsdWUuIEFuIG9wdGlvbmFsIGNvbmRpdGlvbiBjYW4gYmUgYWRkZWQgdG9cbiAqIGRpc2NyaW1pbmF0ZSB3aGljaCBmb3JtcyB0byB0YWtlIGZvciB0aGUgc3VtLlxuICovXG5leHBvcnQgZnVuY3Rpb24gTUVBTihmb3JtczogRm9ybVtdLCBleHByZXNzaW9uOiBzdHJpbmcpOiBudW1iZXIge1xuICBmb3JtcyA9IChmb3JtcyB8fCBbXSkuc2xpY2UoMCk7XG4gIGV4cHJlc3Npb24gPSAoZXhwcmVzc2lvbiB8fCAnJyk7XG4gIGNvbnN0IGxlbmd0aCA9IGZvcm1zLmxlbmd0aDtcbiAgaWYgKGxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiAwO1xuICB9XG4gIGxldCBhY2MgPSAwO1xuICBmb3Jtcy5mb3JFYWNoKChmKSA9PiB7XG4gICAgYWNjICs9IGV2YWx1YXRlRXhwcmVzc2lvbihleHByZXNzaW9uLCBmKTtcbiAgfSk7XG4gIHJldHVybiBNYXRoLnRydW5jKGFjYyAvIGxlbmd0aCk7XG59XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgJSBiZXR3ZWVuIHR3byBtZW1iZXJzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gUEVSQ0VOVCh2YWx1ZTE6IG51bWJlciwgdmFsdWUyOiBudW1iZXIpOiBzdHJpbmcge1xuICBjb25zdCByZXMgPSArdmFsdWUxIC8gK3ZhbHVlMjtcblxuICByZXR1cm4gTnVtYmVyLmlzRmluaXRlKHJlcykgPyBgJHtyZXN9JWAgOiAnZXJyJztcbn1cblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBleHByZXNzaW9uIGluIHRoZSBsYXN0IGZvcm0gYnkgZGF0ZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIExBU1QoZm9ybXM6IEZvcm1bXSwgZXhwcmVzc2lvbjogc3RyaW5nLCBkYXRlID0gJ2RhdGVfZW5kJyk6IG51bWJlciB7XG4gIGZvcm1zID0gKGZvcm1zIHx8IFtdKS5zbGljZSgwKS5zb3J0KChhLCBiKSA9PiB7XG4gICAgY29uc3QgZGF0ZUEgPSBuZXcgRGF0ZShiW2RhdGVdIGFzIHN0cmluZykuZ2V0VGltZSgpO1xuICAgIGNvbnN0IGRhdGVCID0gbmV3IERhdGUoYVtkYXRlXSBhcyBzdHJpbmcpLmdldFRpbWUoKTtcbiAgICByZXR1cm4gZGF0ZUEgLSBkYXRlQjtcbiAgfSk7XG4gIGlmIChmb3Jtcy5sZW5ndGggPiAwICYmIGV4cHJlc3Npb24gIT0gbnVsbCkge1xuICAgIGNvbnN0IGxhc3RGb3JtID0gZm9ybXNbZm9ybXMubGVuZ3RoIC0gMV0gfHwgW107XG4gICAgcmV0dXJuIGV2YWx1YXRlRXhwcmVzc2lvbihleHByZXNzaW9uLCBsYXN0Rm9ybSk7XG4gIH1cbiAgcmV0dXJuIDA7XG59XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgbWF4IHZhbHVlIG9mIHRoZSBmaWVsZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIE1BWChmb3JtczogRm9ybVtdLCBmaWVsZE5hbWU6IHN0cmluZyk6IG51bWJlciB7XG4gIGZvcm1zID0gKGZvcm1zIHx8IFtdKS5zbGljZSgwKTtcbiAgbGV0IG1heCA9IDA7XG4gIGZvcm1zLmZvckVhY2goZm9ybSA9PiB7XG4gICAgaWYgKGZvcm1bZmllbGROYW1lXSAhPSBudWxsICYmICFpc05hTihmb3JtW2ZpZWxkTmFtZV0gYXMgbnVtYmVyKSAmJlxuICAgICAgICAoZm9ybVtmaWVsZE5hbWVdIGFzIG51bWJlcikgPiBtYXgpIHtcbiAgICAgIG1heCA9IGZvcm1bZmllbGROYW1lXSBhcyBudW1iZXI7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIG1heDtcbn1cblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBtZWRpYW4gdmFsdWUgb2YgdGhlIGZpZWxkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gTUVESUFOKGZvcm1zOiBGb3JtW10sIGZpZWxkTmFtZTogc3RyaW5nKTogbnVtYmVyIHtcbiAgZm9ybXMgPSAoZm9ybXMgfHwgW10pLnNsaWNlKDApO1xuICBjb25zdCBudW1iZXJzOiBudW1iZXJbXSA9XG4gICAgICBmb3Jtcy5maWx0ZXIoZiA9PiBmW2ZpZWxkTmFtZV0gIT0gbnVsbCAmJiAhaXNOYU4oZltmaWVsZE5hbWVdIGFzIG51bWJlcikpXG4gICAgICAgICAgLm1hcChmID0+IGZbZmllbGROYW1lXSBhcyBudW1iZXIpXG4gICAgICAgICAgLnNvcnQoKGEsIGIpID0+IGEgLSBiKVxuICAgICAgICAgIC5maWx0ZXIoKGl0ZW0sIHBvcywgc2VsZikgPT4gc2VsZi5pbmRleE9mKGl0ZW0pID09IHBvcyk7XG5cbiAgcmV0dXJuIE51bWJlci5pc0ludGVnZXIobnVtYmVycy5sZW5ndGggLyAyKSA/XG4gICAgICBudW1iZXJzW251bWJlcnMubGVuZ3RoIC8gMl0gOlxuICAgICAgKG51bWJlcnNbK3BhcnNlSW50KGAke251bWJlcnMubGVuZ3RoIC0gMSAvIDJ9YCkgLyAyXSArXG4gICAgICAgbnVtYmVyc1srcGFyc2VJbnQoYCR7bnVtYmVycy5sZW5ndGggLSAxIC8gMn1gKSAvIDIgKyAxXSkgL1xuICAgICAgICAgIDI7XG59XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgbW9kZSB2YWx1ZSBvZiB0aGUgZmllbGQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBNT0RFKGZvcm1zOiBGb3JtW10sIGZpZWxkTmFtZTogc3RyaW5nKTogbnVtYmVyW10ge1xuICBmb3JtcyA9IChmb3JtcyB8fCBbXSkuc2xpY2UoMCk7XG4gIGxldCBtYXhDb3VudCA9IDA7XG4gIGNvbnN0IG1hcDoge1trZXk6IG51bWJlcl06IG51bWJlcn0gPSB7fTtcbiAgZm9ybXMuZm9yRWFjaChmID0+IHtcbiAgICBjb25zdCB2YWx1ZSA9IGZbZmllbGROYW1lXSBhcyBudW1iZXI7XG4gICAgaWYgKHZhbHVlICE9IG51bGwpIHtcbiAgICAgIG1hcFt2YWx1ZV0gPSBtYXBbdmFsdWVdICE9IG51bGwgPyBtYXBbdmFsdWVdICsgMSA6IDE7XG4gICAgfVxuICAgIGlmIChtYXBbdmFsdWVdID4gbWF4Q291bnQpIHtcbiAgICAgIG1heENvdW50ID0gbWFwW3ZhbHVlXTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gT2JqZWN0LmtleXMobWFwKS5maWx0ZXIodiA9PiBtYXBbK3ZdID09PSBtYXhDb3VudCkubWFwKHYgPT4gK3YpO1xufVxuIl19