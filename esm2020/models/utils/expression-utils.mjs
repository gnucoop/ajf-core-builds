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
import { parseScript } from 'meriyah';
import * as numbroMod from 'numbro';
let execContext = {};
const numbro = numbroMod.default || numbroMod;
function allReps(form) {
    if (form.reps == null) {
        return [];
    }
    const reps = [];
    for (const key in form.reps) {
        const r = form.reps[key];
        reps.push(...r);
    }
    return reps;
}
const MAX_REPS = 30;
export const getCodeIdentifiers = (source, includeDollarValue = false) => {
    const identifiers = [];
    try {
        parseScript(source.toString(), {
            onToken: (token, start, end) => {
                if (token == 'Identifier') {
                    const identifier = source.toString().substring(start, end);
                    if (includeDollarValue || identifier !== '$value') {
                        identifiers.push(identifier);
                    }
                }
            },
        });
    }
    catch (e) {
        console.log(source);
        console.log(e);
    }
    return identifiers.sort((i1, i2) => i2.localeCompare(i1));
};
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
    isBefore: dateFns.isBefore,
};
export class AjfExpressionUtils {
}
// TODO what is it for
AjfExpressionUtils.UTIL_FUNCTIONS = '';
/**
 * It is a key-value dictionary, that mapping all Ajf validation functions.
 */
AjfExpressionUtils.utils = {
    alert: { fn: alert },
    buildAlignedDataset: { fn: buildAlignedDataset },
    buildAlignedFormDataset: { fn: buildAlignedFormDataset },
    buildDataset: { fn: buildDataset },
    buildFormDataset: { fn: buildFormDataset },
    buildWidgetDataset: { fn: buildWidgetDataset },
    buildWidgetDatasetWithDialog: { fn: buildWidgetDatasetWithDialog },
    calculateAvgProperty: { fn: calculateAvgProperty },
    calculateAvgPropertyArray: { fn: calculateAvgPropertyArray },
    calculateTrendByProperties: { fn: calculateTrendByProperties },
    calculateTrendProperty: { fn: calculateTrendProperty },
    dateOperations: { fn: dateOperations },
    decimalCount: { fn: decimalCount },
    digitCount: { fn: digitCount },
    drawThreshold: { fn: drawThreshold },
    extractArray: { fn: extractArray },
    extractArraySum: { fn: extractArraySum },
    extractDates: { fn: extractDates },
    extractSum: { fn: extractSum },
    formatDate: { fn: formatDate },
    formatNumber: { fn: formatNumber },
    getCoordinate: { fn: getCoordinate },
    isInt: { fn: isInt },
    isoMonth: { fn: isoMonth },
    lastProperty: { fn: lastProperty },
    notEmpty: { fn: notEmpty },
    parseDate: { fn: dateUtils.parse },
    plainArray: { fn: plainArray },
    round: { fn: round },
    scanGroupField: { fn: scanGroupField },
    sum: { fn: sum },
    sumLastProperties: { fn: sumLastProperties },
    valueInChoice: { fn: valueInChoice },
    ADD_DAYS: { fn: ADD_DAYS },
    ALL_VALUES_OF: { fn: ALL_VALUES_OF },
    APPLY_LABELS: { fn: APPLY_LABELS },
    APPLY: { fn: APPLY },
    BUILD_DATASET: { fn: BUILD_DATASET },
    COMPARE_DATE: { fn: COMPARE_DATE },
    CONCAT: { fn: CONCAT },
    CONSOLE_LOG: { fn: CONSOLE_LOG },
    COUNT_FORMS_UNIQUE: { fn: COUNT_FORMS_UNIQUE },
    COUNT_FORMS: { fn: COUNT_FORMS },
    COUNT_REPS: { fn: COUNT_REPS },
    DAYS_DIFF: { fn: DAYS_DIFF },
    EVALUATE: { fn: EVALUATE },
    FILTER_BY_VARS: { fn: FILTER_BY_VARS },
    FILTER_BY: { fn: FILTER_BY },
    FIRST: { fn: FIRST },
    FROM_REPS: { fn: FROM_REPS },
    GET_AGE: { fn: GET_AGE },
    GET_LABELS: { fn: GET_LABELS },
    INCLUDES: { fn: INCLUDES },
    IS_AFTER: { fn: IS_AFTER },
    IS_BEFORE: { fn: IS_BEFORE },
    IS_WITHIN_INTERVAL: { fn: IS_WITHIN_INTERVAL },
    ISIN: { fn: ISIN },
    JOIN_FORMS: { fn: JOIN_FORMS },
    JOIN_REPEATING_SLIDES: { fn: JOIN_REPEATING_SLIDES },
    LAST: { fn: LAST },
    LEN: { fn: LEN },
    MAP: { fn: MAP },
    MAX: { fn: MAX },
    MEAN: { fn: MEAN },
    MEDIAN: { fn: MEDIAN },
    MODE: { fn: MODE },
    OP: { fn: OP },
    PERCENT: { fn: PERCENT },
    REMOVE_DUPLICATES: { fn: REMOVE_DUPLICATES },
    REPEAT: { fn: REPEAT },
    ROUND: { fn: ROUND },
    SUM: { fn: SUM },
    TODAY: { fn: TODAY },
};
/**
 * UTILITY FUNCION
 * This function provide a deep copy builder of array of main forms.
 * That's a custom function related to mainforms that can be able to increase copy performance.
 *
 * @param {MainForm[]} forms
 * @return {*}  {MainForm[]}
 */
function cloneMainForms(forms) {
    let res = [];
    for (const form of forms) {
        if (form == null) {
            res.push(form);
            continue;
        }
        let reps = {};
        if (form.reps != null) {
            for (const key in form.reps) {
                reps[key] = [...form.reps[key]];
            }
        }
        res.push({ ...form, reps });
    }
    return res;
}
export function evaluateExpression(expression, context) {
    return createFunction(expression)(context);
}
const globals = [
    'this', 'true', 'false', 'null', 'undefined', 'Infinity', 'NaN', 'isNaN', 'isFinite',
    'Object', 'String', 'Array', 'Set', 'Map', 'Number', 'Date', 'Math', 'parseInt', 'parseFloat',
];
export function createFunction(expression) {
    if (expression == null) {
        return _ => null;
    }
    expression = String(expression);
    if (expression === 'true') {
        return _ => true;
    }
    if (expression === 'false') {
        return _ => false;
    }
    if (/^[a-zA-Z_$][\w$]*$/.test(expression)) { // expression is an identifier
        return c => c == null || c[expression] === undefined ? null : c[expression];
    }
    if (/^"[^"]*"$/.test(expression) || /^'[^']*'$/.test(expression)) {
        let str = expression.slice(1, -1);
        return _ => str;
    }
    const identifiers = new Set(getCodeIdentifiers(expression, true)).add('execContext');
    for (const ide of globals) {
        identifiers.delete(ide);
    }
    const argNames = [...identifiers];
    let func;
    try {
        func = new Function(...argNames, 'return ' + expression);
    }
    catch {
        return _ => false;
    }
    return context => {
        const argValues = argNames.map(name => {
            if (context != null && context[name] !== undefined) {
                return context[name];
            }
            if (AjfExpressionUtils.utils[name] !== undefined) {
                return AjfExpressionUtils.utils[name].fn;
            }
            if (name === 'execContext') {
                return execContext;
            }
            return null;
        });
        try {
            return func(...argValues);
        }
        catch {
            return false;
        }
    };
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
 * Fixed decimals for floating number
 * Resolve float sum problems like this: 0.1 + 0.2 = 0.30000000000000004
 * @param num
 * @returns
 */
function truncate10(num) {
    return parseFloat(num.toFixed(10));
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
    source = (source || []).filter((f) => f != null);
    const res = [];
    for (const s of source) {
        if (s[property] != null && property2 != null && s[property2] != null) {
            res.push(Number(s[property]) + Number(s[property2]));
        }
        else if (s[property] != null) {
            res.push(s[property]);
        }
    }
    return res;
}
/**
 * It returns the sum of all defined properties of each element of source.
 */
export function extractSum(source, properties) {
    properties = [...(properties || [])];
    let sumVal = 0;
    for (const prop of properties) {
        const array = extractArray(source, prop);
        for (const a of array) {
            if (!isNaN(Number(a))) {
                sumVal += Number(a);
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
    properties = [...(properties || [])];
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
    source = (source || []).filter((f) => f != null);
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
    source = (source || []).filter((f) => f != null);
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
    source = (source || []).filter((f) => f != null);
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
    source = (source || []).filter((f) => f != null);
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
    source = (source || []).filter((f) => f != null);
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
    source = (source || []).filter((f) => f != null);
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
    source = (source || []).filter((f) => f != null);
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
    source = [...(source || [])];
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
 * Returns an array containing all the values that the specified field takes in the forms.
 * The values are converted to strings.
 */
export function ALL_VALUES_OF(forms, field, filter = 'true') {
    forms = (forms || []).filter(f => f != null);
    if (typeof (filter) === 'string') {
        filter = createFunction(filter);
    }
    let values = [];
    for (const form of forms) {
        if (form[field] != null && filter(form)) {
            values.push(String(form[field]));
        }
        for (const rep of allReps(form)) {
            if (rep[field] != null && filter({ ...form, ...rep })) {
                values.push(String(rep[field]));
            }
        }
    }
    return [...new Set(values)];
}
export function plainArray(params) {
    const res = [];
    for (const param of params) {
        if (Array.isArray(param)) {
            res.push(...param);
        }
        else {
            res.push(param);
        }
    }
    return res;
}
/**
 * Returns the number of forms for which filter evaluates to true,
 * for the form itself or for any of its repetitions.
 */
export function COUNT_FORMS(forms, filter = 'true') {
    forms = (forms || []).filter(f => f != null);
    if (filter === 'true') {
        return forms.length;
    }
    if (typeof (filter) === 'string') {
        filter = createFunction(filter);
    }
    let count = 0;
    for (const form of forms) {
        if (filter(form)) {
            count++;
            continue;
        }
        for (const rep of allReps(form)) {
            if (filter({ ...form, ...rep })) {
                count++;
                break;
            }
        }
    }
    return count;
}
/**
 * Counts the forms and all of their repetitions for which filter evaluates to true.
 */
export function COUNT_REPS(forms, filter = 'true') {
    forms = (forms || []).filter(f => f != null);
    if (typeof (filter) === 'string') {
        filter = createFunction(filter);
    }
    let count = 0;
    for (const form of forms) {
        if (filter(form)) {
            count++;
        }
        for (const rep of allReps(form)) {
            if (filter({ ...form, ...rep })) {
                count++;
            }
        }
    }
    return count;
}
/**
 * Deprecated. Use LEN(ALL_VALUES_OF)
 */
export function COUNT_FORMS_UNIQUE(forms, field, filter = 'true') {
    return ALL_VALUES_OF(forms, field, filter).length;
}
function getNumericValues(forms, field, filter = 'true') {
    forms = (forms || []).filter(f => f != null);
    if (typeof (filter) === 'string') {
        filter = createFunction(filter);
    }
    let values = [];
    for (const form of forms) {
        const val = form[field];
        if (val != null && !isNaN(Number(val)) && filter(form)) {
            values.push(Number(val));
        }
        for (const rep of allReps(form)) {
            const val = rep[field];
            if (val != null && !isNaN(Number(val)) && filter({ ...form, ...rep })) {
                values.push(Number(val));
            }
        }
    }
    return values;
}
/**
 * Aggregates and sums the values of the specified field.
 * An optional expression can be added to filter which forms to take for the sum.
 */
export function SUM(forms, field, filter = 'true') {
    const values = getNumericValues(forms, field, filter);
    let sum = 0;
    for (const val of values) {
        sum += val;
    }
    return truncate10(sum);
}
/**
 * Computes the mean of the values of the specified field.
 * An optional expression can be added to filter which forms to take for the sum.
 */
export function MEAN(forms, field, filter = 'true') {
    const values = getNumericValues(forms, field, filter);
    let sum = 0;
    for (const val of values) {
        sum += val;
    }
    return truncate10(sum / values.length);
}
/**
 * Calculates the % between two members.
 */
export function PERCENT(value1, value2) {
    const res = (+value1 * 100) / +value2;
    return Number.isFinite(res) ? Math.round(res) + '%' : 'infinite';
}
/**
 * Evaluates the expression in the first form by date.
 */
export function FIRST(forms, expression, date = 'created_at') {
    if (typeof (expression) === 'string') {
        expression = createFunction(expression);
    }
    forms = (forms || []).filter(f => f != null && f[date] != null);
    if (forms.length === 0) {
        return undefined;
    }
    let form = forms[0];
    let minDate = form[date];
    for (let i = 1; i < forms.length; i++) {
        if (forms[i][date] < minDate) {
            form = forms[i];
            minDate = form[date];
        }
    }
    return expression(form);
}
/**
 * Evaluates the expression in the last form by date.
 */
export function LAST(forms, expression, date = 'created_at') {
    if (typeof (expression) === 'string') {
        expression = createFunction(expression);
    }
    forms = (forms || []).filter(f => f != null && f[date] != null);
    if (forms.length === 0) {
        return undefined;
    }
    let form = forms[forms.length - 1];
    let maxDate = form[date];
    for (let i = forms.length - 2; i >= 0; i--) {
        if (forms[i][date] > maxDate) {
            form = forms[i];
            maxDate = form[date];
        }
    }
    return expression(form);
}
/**
 * Computes the max value of the field.
 */
export function MAX(forms, field, filter = 'true') {
    const values = getNumericValues(forms, field, filter);
    let max = -Infinity;
    for (const val of values) {
        if (val > max) {
            max = val;
        }
    }
    return max;
}
/**
 * Computes the median value of the field.
 */
export function MEDIAN(forms, field, filter = 'true') {
    const values = getNumericValues(forms, field, filter).sort();
    if (values.length === 0) {
        return NaN;
    }
    return values[Math.floor(values.length / 2)];
}
/**
 * Computes the mode value of the field.
 */
export function MODE(forms, field, filter = 'true') {
    const values = getNumericValues(forms, field, filter);
    const counters = {};
    for (const val of values) {
        if (counters[val] == null) {
            counters[val] = 1;
        }
        else {
            counters[val]++;
        }
    }
    let maxCount = 0;
    for (const val in counters) {
        if (counters[val] > maxCount) {
            maxCount = counters[val];
        }
    }
    for (const val in counters) {
        if (counters[val] === maxCount) {
            return Number(val);
        }
    }
    return NaN;
}
export function buildDataset(dataset, colspans) {
    return buildAlignedDataset(dataset, colspans, []);
}
/**
 * Build a dataset for ajf dynamic table
 * @param dataset the dataset for the table
 * @param colspans colspan for each value in the dataset
 * @param textAlign alignment for each value in the dataset
 * @returns An AjfTableCell list
 */
export function buildAlignedDataset(dataset, colspans, textAlign) {
    const res = [];
    const normalizeDataset = [];
    dataset.forEach((row, indexRow) => {
        row = Array.isArray(row) ? row : [row];
        normalizeDataset[indexRow % colspans.length] =
            normalizeDataset[indexRow % colspans.length] != null
                ? [...normalizeDataset[indexRow % colspans.length], ...row]
                : [...row];
    });
    const transpose = normalizeDataset[0].map((_, colIndex) => normalizeDataset.map((row) => row[colIndex]));
    transpose.forEach((data, index) => {
        const row = [];
        data.forEach((cellValue, cellIndex) => {
            row.push({
                value: cellValue,
                colspan: colspans[cellIndex],
                rowspan: 1,
                style: {
                    textAlign: textAlign[cellIndex] ? textAlign[cellIndex] : 'center',
                    color: 'black',
                    backgroundColor: index % 2 === 0 ? 'white' : '#ddd',
                },
            });
        });
        res.push(row);
    });
    return res;
}
/**
 * Build a dataset based on a list of Forms, for ajf dynamic table
 * @param dataset the dataset for the table
 * @param fields the list of fields name for each row
 * @param rowLink the http link for the row, with the form field name with the link value and the column position for the link.
 * ie: {'link': 'home_link', 'position': 0}
 * @param backgroundColorA the first backgroud color
 * @param backgroundColorB the second backgroud color
 * @returns An AjfTableCell list
 */
export function buildFormDataset(dataset, fields, rowLink, _backgroundColorA, _backgroundColorB) {
    return buildAlignedFormDataset(dataset, fields, [], [], rowLink, [], []);
}
/**
 * Build a dataset based on a list of Forms, for ajf dynamic table
 * @param dataset the dataset for the table
 * @param fields the list of fields name for each row
 * @param colspans colspan for each value in the dataset
 * @param textAlign alignment for each value in the dataset
 * @param rowLink the http link for the row, with the form field name with the link value and the column position for the link.
 * ie: {'link': 'home_link', 'position': 0}
 * @returns An AjfTableCell list
 */
export function buildAlignedFormDataset(dataset, fields, colspans, textAlign, rowLink, dialogFields, dialogLabelFields) {
    const res = [];
    const backgroundColorA = 'white';
    const backgroundColorB = '#ddd';
    if (dataset) {
        let index = 0;
        dataset.forEach((data) => {
            if (data) {
                index++;
                const row = [];
                fields.forEach((field, cellIdx) => {
                    let cellValue = data[field] || '';
                    if (rowLink != null && cellIdx === rowLink['position']) {
                        cellValue = `<a href='${data[rowLink['link']]}'> ${data[field]}</a>`;
                    }
                    row.push({
                        value: cellValue,
                        colspan: colspans[cellIdx] && colspans[cellIdx] > 0 ? colspans[cellIdx] : 1,
                        rowspan: 1,
                        style: {
                            textAlign: textAlign[cellIdx] ? textAlign[cellIdx] : 'center',
                            color: 'black',
                            backgroundColor: index % 2 === 0 ? backgroundColorA : backgroundColorB,
                        },
                    });
                });
                if (dialogFields && dialogFields.length) {
                    let dialogHtml = [];
                    dialogFields.forEach((field, cellIdx) => {
                        let fieldValue = '""';
                        if (data[field] != null) {
                            fieldValue =
                                "<p class='dialog-item'><b>" +
                                    dialogLabelFields[cellIdx].replace(/['\"]+/g, '') +
                                    '</b> <span>' +
                                    data[field] +
                                    '</span></p>';
                            dialogHtml.push(fieldValue);
                        }
                    });
                    row.push({
                        value: '<div class="read_more_cell"><p class="read_more_text">Read more</p><b class="material-icons">add_circle_outline</b></div>',
                        dialogHtml: dialogHtml.join(' '),
                        colspan: 1,
                        rowspan: 1,
                        style: {
                            textAlign: 'center',
                            color: 'black',
                            backgroundColor: index % 2 === 0 ? backgroundColorA : backgroundColorB,
                        },
                    });
                }
                res.push(row);
            }
        });
    }
    return res;
}
/**
 * create a widget dataset into a content list, based on a list of Forms, for paginated widget
 *
 * @param dataset the dataset for the widgets
 * @param fields the list of fields name for each row
 * @param rowLink the http link for the row, with the form field name with the link value and the column position for the link.
 * ie: {'link': 'home_link', 'position': 0}
 * @param cellStyles css styles for cells
 * @param rowStyle css styles for rows
 * @param percWidth an array with the same length of fields param, with the width for the columns.
 * ie: ['10%', '30%', '10%', '25%', '15%', '10%']
 * @param backgroundColorA the first backgroud color
 * @param backgroundColorB the second backgroud color
 * @returns An AjfTableWidget list
 */
export function buildWidgetDataset(dataset, fields, rowLink, cellStyles, rowStyle, percWidth, backgroundColorA, backgroundColorB) {
    const res = [];
    if (backgroundColorA == null) {
        backgroundColorA = 'white';
    }
    if (backgroundColorB == null) {
        backgroundColorB = '#ddd';
    }
    if (rowStyle == null) {
        rowStyle = {
            'text-align': 'right',
            'margin-bottom': 0,
            'border-collapse': 'collapse',
        };
    }
    if (cellStyles == null) {
        cellStyles = {
            textAlign: 'center',
            color: 'black',
        };
    }
    if (percWidth == null || percWidth.length !== fields.length) {
        const cellWidth = 100 / fields.length + '%';
        percWidth = [];
        fields.forEach(_ => percWidth.push(cellWidth));
    }
    if (dataset) {
        let index = 0;
        dataset.forEach((data) => {
            if (data) {
                index++;
                // Row is an AjfTableWidget
                const row = {
                    styles: {
                        'text-align': 'right',
                        'margin-bottom': 0,
                        'border-collapse': 'collapse',
                        ...rowStyle,
                    },
                    visibility: { condition: 'true' },
                    widgetType: 5,
                    dataset: [[]],
                    cellStyles: { 'border-top': '1px solid grey' },
                };
                fields.forEach((field, cellIdx) => {
                    let formulaCell = '""';
                    if (data[field] != null) {
                        formulaCell = '"' + data[field] + '"';
                        if (rowLink != null && cellIdx === rowLink['position']) {
                            formulaCell = `"<a href='${data[rowLink['link']]}'> ${data[field]}</a>"`;
                        }
                    }
                    row['dataset'][0].push({
                        label: '',
                        style: {
                            textAlign: 'center',
                            color: 'black',
                            backgroundColor: index % 2 === 0 ? backgroundColorA : backgroundColorB,
                            ...cellStyles,
                            width: percWidth[cellIdx],
                        },
                        formula: {
                            formula: formulaCell,
                        },
                        colspan: 1,
                        rowspan: 1,
                        aggregation: {
                            aggregation: 0,
                        },
                    });
                });
                res.push(row);
            }
        });
    }
    return res;
}
/**
 * create a widget dataset into a content list, based on a list of Forms, for paginated widget.
 * Each row is a AjfDialogWidget and, on click, open a dialog.
 *
 * @param dataset the dataset for the widgets
 * @param fields the list of fields name for each row
 * @param dialogFields the list of fields name to show in the dialog
 * @param dialogLabelFields the list of labels for each dialogFields
 * @param rowLink the http link for the row, with the form field name with the link value and the column position for the link.
 * ie: {'link': 'home_link', 'position': 0}
 * @param cellStyles css styles for cells
 * @param rowStyle css styles for rows
 * @param percWidth an array with the same length of fields param, with the width for the columns.
 * ie: ['10%', '30%', '10%', '25%', '15%', '10%']
 * @param backgroundColorA the first backgroud color
 * @param backgroundColorB the second backgroud color
 * @returns An AjfDialogWidget list
 */
export function buildWidgetDatasetWithDialog(dataset, fields, dialogFields, dialogLabelFields, cellStyles, rowStyle, percWidth, backgroundColorA, backgroundColorB) {
    const res = [];
    if (backgroundColorA == null) {
        backgroundColorA = 'white';
    }
    if (backgroundColorB == null) {
        backgroundColorB = '#ddd';
    }
    if (rowStyle == null) {
        rowStyle = {
            'text-align': 'right',
            'margin-bottom': 0,
            'border-collapse': 'collapse',
        };
    }
    if (cellStyles == null) {
        cellStyles = {
            textAlign: 'center',
            color: 'black',
        };
    }
    if (percWidth == null || percWidth.length !== fields.length) {
        const cellWidth = 100 / fields.length + '%';
        percWidth = [];
        fields.forEach(_ => percWidth.push(cellWidth));
    }
    if (dataset) {
        let index = 0;
        dataset.forEach((data) => {
            if (data) {
                index++;
                // Row is an AjfTableWidget
                const row = {
                    styles: {
                        'text-align': 'right',
                        'margin-bottom': 0,
                        'border-collapse': 'collapse',
                        ...rowStyle,
                    },
                    visibility: { condition: 'true' },
                    widgetType: 5,
                    dataset: [[]],
                    cellStyles: { 'border-top': '1px solid grey' },
                };
                fields.forEach((field, cellIdx) => {
                    let formulaCell = '""';
                    if (data[field] != null) {
                        formulaCell = '"' + data[field] + '"';
                    }
                    row['dataset'][0].push({
                        label: '',
                        style: {
                            textAlign: 'center',
                            color: 'black',
                            backgroundColor: index % 2 === 0 ? backgroundColorA : backgroundColorB,
                            ...cellStyles,
                            width: percWidth[cellIdx],
                        },
                        formula: {
                            formula: formulaCell,
                        },
                        colspan: 1,
                        rowspan: 1,
                        aggregation: {
                            aggregation: 0,
                        },
                    });
                });
                let htmlDialog = [];
                dialogFields.forEach((field, cellIdx) => {
                    let fieldValue = '""';
                    if (data[field] != null) {
                        fieldValue =
                            "<p class='dialog-item'><b>" +
                                dialogLabelFields[cellIdx] +
                                '</b> <span>' +
                                data[field] +
                                '</span></p>';
                        htmlDialog.push(fieldValue);
                    }
                });
                const dialogContent = {
                    widgetType: 3,
                    styles: {
                        'margin': '0 1em',
                        'padding': '5px 10px',
                        'max-height': '360px',
                    },
                    visibility: { condition: 'true' },
                    htmlText: htmlDialog.join(' '),
                };
                // This is a Dialog Widget, added as comtainer for each table widget
                const dialogRow = {
                    widgetType: 13,
                    styles: {
                        'margin': '0',
                    },
                    visibility: { condition: 'true' },
                    toggle: row,
                    content: [dialogContent],
                };
                res.push(dialogRow);
            }
        });
    }
    return res;
}
/**
 * Deprecated. Use MAP
 */
export function REPEAT(forms, array, fn, arg1, arg2 = 'true') {
    return array.map(v => {
        const s = JSON.stringify(v);
        const current1 = arg1.replaceAll('current', s);
        const current2 = arg2.replaceAll('current', s);
        return fn(forms, current1, current2);
    });
}
/**
 * Maps func to the elements of array.
 */
export function MAP(array, func) {
    return array.map(func);
}
/**
 * For each form in forms, the specified field is set with the value given by expression.
 * The form's fields can be used inside expression.
 */
export function APPLY(forms, field, expression) {
    forms = cloneMainForms(forms);
    if (typeof (expression) === 'string') {
        expression = createFunction(expression);
    }
    for (const form of forms) {
        if (form != null) {
            form[field] = expression(form);
        }
    }
    return forms;
}
/**
 * Rounds num to the specified number of digits after the point (or zero).
 */
export function ROUND(num, digits) {
    return round(num, digits);
}
/**
 * Deprecated. Use IF
 */
export function EVALUATE(condition, branch1, branch2) {
    if (evaluateExpression(condition)) {
        return branch1;
    }
    else {
        return branch2;
    }
}
/**
 * Tells if arr includes elem
 */
export function INCLUDES(arr, elem) {
    if (!Array.isArray(arr) && typeof (arr) !== 'string') {
        return false;
    }
    return arr.includes(elem);
}
/**
 * This function builds a data structure that allows the use of the hindikit formulas
 * for every forms with repeating slides.
 * In particular, it builds a main data form with all the data relating to the slides and
 * a dictionary with the name reps thus made instance slideName forms.
 * Where a form is associated with each instance of the repeating slide.
 * example:
 * simple form:
 *  {
 *    $value: "AGO"
 *    cittadinanza__0: "AGO"
 *    codice_fiscale__0: "jdfljglòkòkò"
 *    country__0: "AGO"
 *    date_end: "2021-01-10"
 *    date_start: "2021-01-10"
 *    dob__0: "2021-03-11"
 *    first_name__0: "pippo"
 *    gender__0: "f"
 *    id_family: "3bef3a3f-d95d-4a09-8df4-e812c55c61c6"
 *    istruzione__0: null
 *    last_name__0: "pippo"
 *    permesso_soggiorno__0: "no"
 *    relazione__0: "genitore"
 *    solidando: "solidando1"
 *    stato_civile__0: null
 *  }
 * after BUILD_DATASET
 * MainForm:
 * {
 *    $value: "AGO"
 *    ajf_form_id: 0 ** added atribute that rappresent the index position insides input form list.
 *    ajf_family_component_count: 1** added atribute that rappresent the instance number of famili_component repeating slides.
 *    date_end: "2021-01-10"
 *    date_start: "2021-01-10"
 *    id_family: "3bef3a3f-d95d-4a09-8df4-e812c55c61c6"
 *    reps: {
 *      family_component: [
 *        {
 *          ajf_family_component_rep: 0 ** added atribute that rappresent the order instance of family_component repeating slide.
 *          cittadinanza: "AGO"
 *          codice_fiscale: "jdfljglòkòkò"
 *          country: "AGO"
 *          dob: "2021-03-11"
 *          first_name: "pippo"
 *          gender: "f"
 *          istruzione: null
 *          last_name: "pippo"
 *          permesso_soggiorno: "no"
 *          relazione: "genitore"
 *          stato_civile: null
 *        }
 *      ]
 *    }
 * }
 *
 * @param {Form[]} forms
 * @param {*} [schema] if schema is provided the instances inside the reps match with effective
 * slide name. Otherwise all repeating slides are associates to generic slide name "rep".
 * @return {*}  {MainForm[]}
 */
export function BUILD_DATASET(forms, schema) {
    const res = [];
    const generateMetadata = (slideName, slideInstance) => {
        const resg = {};
        resg[`ajf_${slideName}_rep`] = slideInstance;
        return resg;
    };
    forms = [...(forms || [])];
    if (schema != null) {
        const repeatingSlides = schema.nodes.filter((node) => node.nodeType === 4);
        const obj = {};
        repeatingSlides.forEach(slide => {
            let nodeFields = slide.nodes.map((n) => n.name);
            nodeFields.forEach((nodeField) => {
                obj[nodeField] = slide.name;
            });
        });
        forms.forEach((f, formIdx) => {
            const mainForm = { reps: {} };
            const fKeys = Object.keys(f);
            const instances = {};
            fKeys.forEach(fkey => {
                const splittedKey = fkey.split('__');
                const splittedLength = splittedKey.length;
                const fieldName = splittedKey[0];
                const slideInstance = splittedKey[1] != null && Number.isInteger(+splittedKey[1]) ? +splittedKey[1] : null;
                const slideName = obj[fieldName];
                if (splittedLength === 2 && slideInstance != null && slideName != null) {
                    instances[slideName] = instances[slideName] != null ? instances[slideName] : [];
                    instances[slideName][slideInstance] =
                        instances[slideName][slideInstance] != null
                            ? instances[slideName][slideInstance]
                            : generateMetadata(slideName, slideInstance);
                    instances[slideName][slideInstance][fieldName] = f[fkey];
                }
                else {
                    mainForm[fkey] = f[fkey];
                }
            });
            mainForm[`ajf_form_id`] = formIdx;
            const instanceKeys = Object.keys(instances);
            instanceKeys.forEach(instanceKey => {
                mainForm[`ajf_${instanceKey}_count`] = instances[instanceKey].length;
            });
            mainForm.reps = instances;
            res.push(mainForm);
        });
        return res;
    }
    else {
        forms.forEach(form => {
            const fKeys = Object.keys(form);
            const noRepeatingFields = fKeys.filter(fkey => {
                const splittedKey = fkey.split('__');
                if (splittedKey.length === 2) {
                    return false;
                }
                return true;
            });
            const noRepForm = {};
            noRepeatingFields.forEach(field => {
                noRepForm[field] = form[field];
            });
            const mainForm = { ...noRepForm, reps: { slide: [] } };
            for (let i = 0; i <= MAX_REPS; i++) {
                const currentSlide = {};
                const onlyCurrentInstanceKeys = fKeys.filter(fkey => {
                    const splittedKey = fkey.split('__');
                    if (splittedKey.length === 2) {
                        return fkey.indexOf(`__${i}`) > -1;
                    }
                    return false;
                });
                // se il numero di attributi coincide il form data non ha repeatingslides
                if (onlyCurrentInstanceKeys.length === 0) {
                    mainForm['ajf_rep_count'] = i;
                    break;
                }
                onlyCurrentInstanceKeys.forEach(key => {
                    const splittedKey = key.split('__');
                    const fieldName = splittedKey[0];
                    const slideInstance = splittedKey[1] != null ? +splittedKey[1] : null;
                    currentSlide[fieldName] = form[key];
                    currentSlide['ajf_rep'] = slideInstance != null ? slideInstance : currentSlide['ajf_rep'];
                });
                if (onlyCurrentInstanceKeys.length != 0) {
                    mainForm.reps['slide'].push(currentSlide);
                }
                else {
                    mainForm.reps = undefined;
                }
            }
            res.push(mainForm);
        });
        return res;
    }
}
/**
 * UTILITY FUNCION
 * This function take an ajf schema as input and extract a
 * dict that match each choice value (also with choicesOrigin name prefix) with its label
 * @param schema the ajf schema
 * @returns A dict with:
 *  {[choicesOriginName_choiceValue: string]: [choiceLabel: string]}
 *  {[choiceValue: string]: [choiceLabel: string]}
 */
function extractLabelsBySchemaChoices(schema) {
    const choiceLabels = {};
    if (schema && schema.choicesOrigins != null) {
        schema.choicesOrigins.forEach(choicesOrigin => {
            if (choicesOrigin != null && choicesOrigin.choices != null) {
                choicesOrigin.choices.forEach(choice => {
                    choiceLabels[choicesOrigin.name + '_' + choice.value] = choice.label;
                    choiceLabels[choice.value] = choice.label;
                });
            }
        });
    }
    return choiceLabels;
}
/**
 * UTILITY FUNCION
 * This function take an ajf schema as input and extract a one
 * dimensional array of AjfNode for each slide's field
 *
 * @param schema the ajf schema
 * @returns An object with all fields:
 *  {[fieldName: string]: ajf field}
 */
function extractFlattenNodes(schema) {
    const fieldNodes = {};
    if (schema && schema.nodes) {
        const slides = schema.nodes.filter((node) => node.nodeType === 3 || node.nodeType === 4);
        slides.forEach(slide => {
            slide.nodes
                .filter((node) => node.nodeType === 0)
                .forEach((fieldNode) => {
                fieldNodes[fieldNode.name] = fieldNode;
            });
        });
    }
    return fieldNodes;
}
/**
 * Returns a clone of forms, where the specified fields are replaced by the corresponding labels,
 * as defined by the choice origins in schema.
 *
 * @param {MainForm[]} formList
 * @param {*} schema the ajf schema
 * @param {string[]} fieldNames
 * @return {*}  {MainForm[]}
 */
export function APPLY_LABELS(formList, schema, fieldNames) {
    formList = cloneMainForms(formList);
    const choiceLabels = extractLabelsBySchemaChoices(schema);
    const flattenNodes = extractFlattenNodes(schema);
    for (let i = 0; i < formList.length; i++) {
        if (formList[i] == null) {
            continue;
        }
        if (formList[i].reps != null) {
            const f = formList[i];
            const fKeys = Object.keys(f);
            fKeys.forEach(fkey => {
                const fieldNode = flattenNodes[fkey];
                const choiceOriginNamePrefix = fieldNode && fieldNode.choicesOriginRef ? fieldNode.choicesOriginRef + '_' : '';
                if (fieldNames.includes(fkey) && f[fkey] !== null) {
                    let choiceValue = [];
                    if (Array.isArray(f[fkey])) {
                        choiceValue = f[fkey];
                    }
                    else {
                        const multipleVals = f[fkey].split(',').map(v => v.trim());
                        if (multipleVals.length > 1) {
                            choiceValue = multipleVals;
                        }
                        else {
                            choiceValue = [f[fkey]];
                        }
                    }
                    if (choiceValue != null) {
                        const labels = choiceValue.map(val => {
                            const valWithPrefix = choiceOriginNamePrefix + val;
                            return choiceLabels[valWithPrefix] != null
                                ? choiceLabels[valWithPrefix]
                                : choiceLabels[val] != null
                                    ? choiceLabels[val]
                                    : val;
                        });
                        if (labels && labels.length) {
                            const labelFieldName = fkey + '_choicesLabel';
                            formList[i][labelFieldName] = labels.length > 1 ? labels.join(', ') : labels[0];
                        }
                    }
                }
            });
        }
    }
    return formList;
}
/**
 * Deprecated. Use FILTER_BY
 */
export function FILTER_BY_VARS(formList, expression) {
    return FILTER_BY(formList, expression);
}
/**
 * Returns a copy of forms and its repetitions, keeping only the ones for which expression evaluates to true.
 */
export function FILTER_BY(forms, expression) {
    forms = forms || [];
    if (expression === 'true') {
        return cloneMainForms(forms);
    }
    if (typeof (expression) === 'string') {
        expression = createFunction(expression);
    }
    const res = [];
    for (let form of forms.filter(f => f != null)) {
        form = { ...form };
        const filteredReps = {};
        let someReps = false;
        if (form.reps != null) {
            for (const key in form.reps) {
                filteredReps[key] = form.reps[key].filter(rep => expression({ ...form, ...rep }));
                form[`ajf_${key}_count`] = filteredReps[key].length;
                someReps || (someReps = filteredReps[key].length > 0);
            }
        }
        if (someReps || expression(form)) {
            form.reps = filteredReps;
            res.push(form);
        }
    }
    return res;
}
/**
 * Returns today's date.
 *
 * @export
 * @return {*}  {string}
 */
export function TODAY() {
    return new Date().toJSON().slice(0, 10);
}
/**
 * Logs val to the console.
 *
 * @export
 * @param {*} val
 */
export function CONSOLE_LOG(val) {
    console.log(val);
    return val;
}
/**
 * Computes the current age in years, given the date of birth.
 *
 * @export
 * @param {(string | null)} dob
 * @param {(string | undefined)} when
 * @return {*}  {number}
 */
export function GET_AGE(dob, when) {
    if (dob == null) {
        return NaN;
    }
    if (when == null) {
        when = TODAY();
    }
    let yearsDiff = Number(when.slice(0, 4)) - Number(dob.slice(0, 4));
    if (when.slice(5) < dob.slice(5)) { // birthday not reached yet in current year
        yearsDiff--;
    }
    return yearsDiff;
}
/**
 * If data is a form with repetitions, returns the number of repetitions;
 * If data is an array, returns its length;
 * Otherwise returns 0.
 *
 * @export
 * @param {(MainForm | any[])} dataset
 * @return {*}  {number}
 */
export function LEN(dataset) {
    if (dataset == null) {
        return 0;
    }
    const form = dataset;
    if (form.reps != null) {
        return allReps(form).length;
    }
    return dataset.length || 0;
}
/**
 * Array concatenation.
 *
 * @export
 * @param {any[]} a
 * @param {any[]} b
 * @return {*}  {any[]}
 */
export function CONCAT(a, b) {
    return a.concat(b);
}
/**
 * Removes duplicate elements from an array.
 *
 * @export
 * @param {any[]} arr
 * @return {*}  {any[]}
 */
export function REMOVE_DUPLICATES(arr) {
    return [...new Map(arr.map(v => [JSON.stringify(v), v])).values()];
}
// Returns the date obtained by adding days to date.
export function ADD_DAYS(date, days) {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    return d.toJSON().slice(0, 10);
}
// Returns the difference in days (a - b) between the two dates.
export function DAYS_DIFF(a, b) {
    const dateA = new Date(a);
    const dateB = new Date(b);
    // UTC avoids bugs with daylight saving time.
    const utcA = Date.UTC(dateA.getFullYear(), dateA.getMonth(), dateA.getDate());
    const utcB = Date.UTC(dateB.getFullYear(), dateB.getMonth(), dateB.getDate());
    const millisPerDay = 1000 * 60 * 60 * 24;
    return Math.floor((utcA - utcB) / millisPerDay);
}
/**
 * Returns true if date is before dateToCompare.
 *
 * @export
 * @param {string} date
 * @param {string} dateToCompare
 * @return {*}  {boolean}
 */
export function IS_BEFORE(date, dateToCompare) {
    return date < dateToCompare;
}
/**
 * Returns true if date is after dateToCompare.
 *
 * @export
 * @param {string} date
 * @param {string} dateToCompare
 * @return {*}  {boolean}
 */
export function IS_AFTER(date, dateToCompare) {
    return date > dateToCompare;
}
/**
 * Returns true if date is between dateStart and dateEnd.
 *
 * @export
 * @param {string} date
 * @param {string} dateStart
 * @param {string} dateEnd
 * @return {*}  {boolean}
 */
export function IS_WITHIN_INTERVAL(date, dateStart, dateEnd) {
    return date >= dateStart && date <= dateEnd;
}
/**
 * Compares date with an interval.
 * Returns '-1' (or the first element of labels) if date is before dateStart,
 * '0' (or the second element) if date is between dateStart and dateEnd,
 * '1' (or the third element) if date is after dateEnd.
 *
 * @export
 * @param {string} date
 * @param {string} dateStart
 * @param {string} dateEnd
 * @param {string[]} labels an optional array of string for the output values
 * @return {*}  {string}
 */
export function COMPARE_DATE(date, dateStart, dateEnd, labels) {
    if (labels == null) {
        labels = ['-1', '0', '1'];
    }
    if (IS_BEFORE(date, dateStart)) {
        return labels[0];
    }
    if (IS_WITHIN_INTERVAL(date, dateStart, dateEnd)) {
        return labels[1];
    }
    if (IS_AFTER(date, dateEnd)) {
        return labels[2];
    }
    return '';
}
/**
 * Performs a left join of formsA and formsB.
 */
export function JOIN_FORMS(formsA, formsB, keyA, keyB) {
    return JOIN_REPEATING_SLIDES(formsA, formsB, keyA, keyB, null);
}
/**
 * Performs a left join of formsA and formsB, like JOIN_FORMS.
 * In addition, for each matching pair of formA and formB, their repeating slides are also joined.
 */
export function JOIN_REPEATING_SLIDES(formsA, formsB, keyA, keyB, subkeyA, subkeyB) {
    formsA = cloneMainForms(formsA || []);
    formsB = cloneMainForms(formsB || []);
    if (keyB == null) {
        keyB = keyA;
    }
    if (subkeyB == null) {
        subkeyB = subkeyA;
    }
    const indexB = {};
    for (let i = formsB.length - 1; i >= 0; i--) {
        const val = formsB[i] && formsB[i][keyB];
        if (val != null) {
            indexB[String(val)] = formsB[i];
        }
    }
    const res = [];
    for (const formA of formsA) {
        const val = formA && formA[keyA];
        const formB = indexB[String(val)];
        if (val == null || formB == null) {
            res.push(formA);
            continue;
        }
        const repsA = formA.reps || {};
        const repsB = formB.reps || {};
        if (subkeyA != null) {
            const allRepsB = allReps(formB);
            for (const k in repsA) {
                repsA[k] = JOIN_FORMS(repsA[k], allRepsB, subkeyA, subkeyB);
                formA[`ajf_${k}_count`] = repsA[k].length;
            }
        }
        res.push({ ...formB, ...formA, reps: { ...repsB, ...repsA } });
    }
    return res;
}
/**
 * Returns the array obtained by evaluating expression for every repetition of form.
 *
 * @export
 * @param {MainForm} form
 * @param {string} expression
 * @return {*}  {any[]}
 */
export function FROM_REPS(form, expression) {
    if (typeof (expression) === 'string') {
        expression = createFunction(expression);
    }
    return allReps(form || {}).map(rep => expression({ ...form, ...rep }));
}
/**
 * Deprecated. Use INCLUDES
 */
export function ISIN(dataset, value) {
    if (dataset == null || value == null) {
        return false;
    }
    return dataset.indexOf(value) >= 0;
}
/**
 * Applies the operator to every pair of elements (arrayA[i], arrayB[i]),
 * returning the array of results.
 */
export function OP(arrayA, arrayB, operator) {
    if (typeof (operator) === 'string') {
        const func = createFunction(operator);
        operator = (elemA, elemB) => func({ elemA, elemB });
    }
    const res = [];
    for (let i = 0; i < Math.min(arrayA.length, arrayB.length); i++) {
        const val = operator(arrayA[i], arrayB[i]);
        res.push(val);
    }
    return res;
}
/**
 * Given an array of values, returns the corresponding array of labels,
 * as specified by the choices origin in schema.
 *
 * @export
 * @param {*} schema
 * @param {string[]} values
 * @return {*}  {string[]}
 */
export function GET_LABELS(schema, values) {
    const choiceLabels = extractLabelsBySchemaChoices(schema);
    return values.map(val => choiceLabels[val] != null ? choiceLabels[val] : val);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwcmVzc2lvbi11dGlscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvbW9kZWxzL3NyYy91dGlscy9leHByZXNzaW9uLXV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUdILE9BQU8sS0FBSyxPQUFPLE1BQU0sVUFBVSxDQUFDO0FBQ3BDLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxTQUFTLENBQUM7QUFDcEMsT0FBTyxLQUFLLFNBQVMsTUFBTSxRQUFRLENBQUM7QUFJcEMsSUFBSSxXQUFXLEdBQVEsRUFBRSxDQUFDO0FBRTFCLE1BQU0sTUFBTSxHQUFHLFNBQVMsQ0FBQyxPQUFPLElBQUksU0FBUyxDQUFDO0FBWTlDLFNBQVMsT0FBTyxDQUFDLElBQWM7SUFDN0IsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksRUFBRTtRQUNyQixPQUFPLEVBQUUsQ0FBQztLQUNYO0lBQ0QsTUFBTSxJQUFJLEdBQVcsRUFBRSxDQUFDO0lBQ3hCLEtBQUssTUFBTSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtRQUMzQixNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztLQUNqQjtJQUNELE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQztBQUVELE1BQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQztBQUVwQixNQUFNLENBQUMsTUFBTSxrQkFBa0IsR0FBRyxDQUNoQyxNQUFjLEVBQ2QscUJBQThCLEtBQUssRUFDekIsRUFBRTtJQUNaLE1BQU0sV0FBVyxHQUFHLEVBQWMsQ0FBQztJQUNuQyxJQUFJO1FBQ0YsV0FBVyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsRUFBRTtZQUM3QixPQUFPLEVBQUUsQ0FBQyxLQUFL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Q0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQy9ELE1BQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0MsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUNmO0lBQ0QsT0FBTyxHQUFHLENBQUM7QUFDYixDQUFDO0FBRUQ7Ozs7Ozs7O0dBUUc7QUFDSCxNQUFNLFVBQVUsVUFBVSxDQUFDLE1BQVcsRUFBRSxNQUFnQjtJQUN0RCxNQUFNLFlBQVksR0FBRyw0QkFBNEIsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMxRCxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2hGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmQ29udGV4dH0gZnJvbSAnQGFqZi9jb3JlL2NvbW1vbic7XG5pbXBvcnQgKiBhcyBkYXRlRm5zIGZyb20gJ2RhdGUtZm5zJztcbmltcG9ydCB7cGFyc2VTY3JpcHR9IGZyb20gJ21lcml5YWgnO1xuaW1wb3J0ICogYXMgbnVtYnJvTW9kIGZyb20gJ251bWJybyc7XG5pbXBvcnQge0FqZlRhYmxlQ2VsbH0gZnJvbSAnQGFqZi9jb3JlL3RhYmxlJztcbmltcG9ydCB7QWpmVmFsaWRhdGlvbkZufSBmcm9tICcuLi9pbnRlcmZhY2UvdmFsaWRhdGlvbi1mdW5jdGlvbic7XG5cbmxldCBleGVjQ29udGV4dDogYW55ID0ge307XG5cbmNvbnN0IG51bWJybyA9IG51bWJyb01vZC5kZWZhdWx0IHx8IG51bWJyb01vZDtcbmV4cG9ydCBpbnRlcmZhY2UgRm9ybSB7XG4gIFtrZXk6IHN0cmluZ106IHN0cmluZyB8IG51bWJlciB8IG51bGw7XG59XG5leHBvcnQgaW50ZXJmYWNlIEluc3RhbmNlcyB7XG4gIFtpbnN0YW5jZTogc3RyaW5nXTogRm9ybVtdO1xufVxuZXhwb3J0IGludGVyZmFjZSBNYWluRm9ybSB7XG4gIFtrZXk6IHN0cmluZ106IHN0cmluZyB8IG51bWJlciB8IGJvb2xlYW4gfCBudWxsIHwgSW5zdGFuY2VzIHwgdW5kZWZpbmVkIHwgbnVsbDtcbiAgcmVwcz86IEluc3RhbmNlcztcbn1cblxuZnVuY3Rpb24gYWxsUmVwcyhmb3JtOiBNYWluRm9ybSk6IEZvcm1bXSB7XG4gIGlmIChmb3JtLnJlcHMgPT0gbnVsbCkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuICBjb25zdCByZXBzOiBGb3JtW10gPSBbXTtcbiAgZm9yIChjb25zdCBrZXkgaW4gZm9ybS5yZXBzKSB7XG4gICAgY29uc3QgciA9IGZvcm0ucmVwc1trZXldO1xuICAgIHJlcHMucHVzaCguLi5yKTtcbiAgfVxuICByZXR1cm4gcmVwcztcbn1cblxuY29uc3QgTUFYX1JFUFMgPSAzMDtcblxuZXhwb3J0IGNvbnN0IGdldENvZGVJZGVudGlmaWVycyA9IChcbiAgc291cmNlOiBzdHJpbmcsXG4gIGluY2x1ZGVEb2xsYXJWYWx1ZTogYm9vbGVhbiA9IGZhbHNlLFxuKTogc3RyaW5nW10gPT4ge1xuICBjb25zdCBpZGVudGlmaWVycyA9IFtdIGFzIHN0cmluZ1tdO1xuICB0cnkge1xuICAgIHBhcnNlU2NyaXB0KHNvdXJjZS50b1N0cmluZygpLCB7XG4gICAgICBvblRva2VuOiAodG9rZW4sIHN0YXJ0LCBlbmQpID0+IHtcbiAgICAgICAgaWYgKHRva2VuID09ICdJZGVudGlmaWVyJykge1xuICAgICAgICAgIGNvbnN0IGlkZW50aWZpZXIgPSBzb3VyY2UudG9TdHJpbmcoKS5zdWJzdHJpbmcoc3RhcnQsIGVuZCk7XG4gICAgICAgICAgaWYgKGluY2x1ZGVEb2xsYXJWYWx1ZSB8fCBpZGVudGlmaWVyICE9PSAnJHZhbHVlJykge1xuICAgICAgICAgICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgfSk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBjb25zb2xlLmxvZyhzb3VyY2UpO1xuICAgIGNvbnNvbGUubG9nKGUpO1xuICB9XG4gIHJldHVybiBpZGVudGlmaWVycy5zb3J0KChpMSwgaTIpID0+IGkyLmxvY2FsZUNvbXBhcmUoaTEpKTtcbn07XG5cbmV4cG9ydCBjb25zdCBkYXRlVXRpbHMgPSB7XG4gIGFkZERheXM6IGRhdGVGbnMuYWRkRGF5cyxcbiAgYWRkTW9udGhzOiBkYXRlRm5zLmFkZE1vbnRocyxcbiAgYWRkWWVhcnM6IGRhdGVGbnMuYWRkWWVhcnMsXG4gIGVuZE9mSVNPV2VlazogZGF0ZUZucy5lbmRPZklTT1dlZWssXG4gIGZvcm1hdDogZGF0ZUZucy5mb3JtYXQsXG4gIGdldERheTogZGF0ZUZucy5nZXREYXksXG4gIHBhcnNlOiBkYXRlRm5zLnBhcnNlSVNPLFxuICBzdGFydE9mTW9udGg6IGRhdGVGbnMuc3RhcnRPZk1vbnRoLFxuICBzdGFydE9mSVNPV2VlazogZGF0ZUZucy5zdGFydE9mSVNPV2VlayxcbiAgaXNCZWZvcmU6IGRhdGVGbnMuaXNCZWZvcmUsXG59O1xuXG5leHBvcnQgY2xhc3MgQWpmRXhwcmVzc2lvblV0aWxzIHtcbiAgLy8gVE9ETyB3aGF0IGlzIGl0IGZvclxuICBzdGF0aWMgVVRJTF9GVU5DVElPTlMgPSAnJztcbiAgLyoqXG4gICAqIEl0IGlzIGEga2V5LXZhbHVlIGRpY3Rpb25hcnksIHRoYXQgbWFwcGluZyBhbGwgQWpmIHZhbGlkYXRpb24gZnVuY3Rpb25zLlxuICAgKi9cbiAgc3RhdGljIHV0aWxzOiB7W25hbWU6IHN0cmluZ106IEFqZlZhbGlkYXRpb25Gbn0gPSB7XG4gICAgYWxlcnQ6IHtmbjogYWxlcnR9LFxuICAgIGJ1aWxkQWxpZ25lZERhdGFzZXQ6IHtmbjogYnVpbGRBbGlnbmVkRGF0YXNldH0sXG4gICAgYnVpbGRBbGlnbmVkRm9ybURhdGFzZXQ6IHtmbjogYnVpbGRBbGlnbmVkRm9ybURhdGFzZXR9LFxuICAgIGJ1aWxkRGF0YXNldDoge2ZuOiBidWlsZERhdGFzZXR9LFxuICAgIGJ1aWxkRm9ybURhdGFzZXQ6IHtmbjogYnVpbGRGb3JtRGF0YXNldH0sXG4gICAgYnVpbGRXaWRnZXREYXRhc2V0OiB7Zm46IGJ1aWxkV2lkZ2V0RGF0YXNldH0sXG4gICAgYnVpbGRXaWRnZXREYXRhc2V0V2l0aERpYWxvZzoge2ZuOiBidWlsZFdpZGdldERhdGFzZXRXaXRoRGlhbG9nfSxcbiAgICBjYWxjdWxhdGVBdmdQcm9wZXJ0eToge2ZuOiBjYWxjdWxhdGVBdmdQcm9wZXJ0eX0sXG4gICAgY2FsY3VsYXRlQXZnUHJvcGVydHlBcnJheToge2ZuOiBjYWxjdWxhdGVBdmdQcm9wZXJ0eUFycmF5fSxcbiAgICBjYWxjdWxhdGVUcmVuZEJ5UHJvcGVydGllczoge2ZuOiBjYWxjdWxhdGVUcmVuZEJ5UHJvcGVydGllc30sXG4gICAgY2FsY3VsYXRlVHJlbmRQcm9wZXJ0eToge2ZuOiBjYWxjdWxhdGVUcmVuZFByb3BlcnR5fSxcbiAgICBkYXRlT3BlcmF0aW9uczoge2ZuOiBkYXRlT3BlcmF0aW9uc30sXG4gICAgZGVjaW1hbENvdW50OiB7Zm46IGRlY2ltYWxDb3VudH0sXG4gICAgZGlnaXRDb3VudDoge2ZuOiBkaWdpdENvdW50fSxcbiAgICBkcmF3VGhyZXNob2xkOiB7Zm46IGRyYXdUaHJlc2hvbGR9LFxuICAgIGV4dHJhY3RBcnJheToge2ZuOiBleHRyYWN0QXJyYXl9LFxuICAgIGV4dHJhY3RBcnJheVN1bToge2ZuOiBleHRyYWN0QXJyYXlTdW19LFxuICAgIGV4dHJhY3REYXRlczoge2ZuOiBleHRyYWN0RGF0ZXN9LFxuICAgIGV4dHJhY3RTdW06IHtmbjogZXh0cmFjdFN1bX0sXG4gICAgZm9ybWF0RGF0ZToge2ZuOiBmb3JtYXREYXRlfSxcbiAgICBmb3JtYXROdW1iZXI6IHtmbjogZm9ybWF0TnVtYmVyfSxcbiAgICBnZXRDb29yZGluYXRlOiB7Zm46IGdldENvb3JkaW5hdGV9LFxuICAgIGlzSW50OiB7Zm46IGlzSW50fSxcbiAgICBpc29Nb250aDoge2ZuOiBpc29Nb250aH0sXG4gICAgbGFzdFByb3BlcnR5OiB7Zm46IGxhc3RQcm9wZXJ0eX0sXG4gICAgbm90RW1wdHk6IHtmbjogbm90RW1wdHl9LFxuICAgIHBhcnNlRGF0ZToge2ZuOiBkYXRlVXRpbHMucGFyc2V9LFxuICAgIHBsYWluQXJyYXk6IHtmbjogcGxhaW5BcnJheX0sXG4gICAgcm91bmQ6IHtmbjogcm91bmR9LFxuICAgIHNjYW5Hcm91cEZpZWxkOiB7Zm46IHNjYW5Hcm91cEZpZWxkfSxcbiAgICBzdW06IHtmbjogc3VtfSxcbiAgICBzdW1MYXN0UHJvcGVydGllczoge2ZuOiBzdW1MYXN0UHJvcGVydGllc30sXG4gICAgdmFsdWVJbkNob2ljZToge2ZuOiB2YWx1ZUluQ2hvaWNlfSxcbiAgICBBRERfREFZUzoge2ZuOiBBRERfREFZU30sXG4gICAgQUxMX1ZBTFVFU19PRjoge2ZuOiBBTExfVkFMVUVTX09GfSxcbiAgICBBUFBMWV9MQUJFTFM6IHtmbjogQVBQTFlfTEFCRUxTfSxcbiAgICBBUFBMWToge2ZuOiBBUFBMWX0sXG4gICAgQlVJTERfREFUQVNFVDoge2ZuOiBCVUlMRF9EQVRBU0VUfSxcbiAgICBDT01QQVJFX0RBVEU6IHtmbjogQ09NUEFSRV9EQVRFfSxcbiAgICBDT05DQVQ6IHtmbjogQ09OQ0FUfSxcbiAgICBDT05TT0xFX0xPRzoge2ZuOiBDT05TT0xFX0xPR30sXG4gICAgQ09VTlRfRk9STVNfVU5JUVVFOiB7Zm46IENPVU5UX0ZPUk1TX1VOSVFVRX0sXG4gICAgQ09VTlRfRk9STVM6IHtmbjogQ09VTlRfRk9STVN9LFxuICAgIENPVU5UX1JFUFM6IHtmbjogQ09VTlRfUkVQU30sXG4gICAgREFZU19ESUZGOiB7Zm46IERBWVNfRElGRn0sXG4gICAgRVZBTFVBVEU6IHtmbjogRVZBTFVBVEV9LFxuICAgIEZJTFRFUl9CWV9WQVJTOiB7Zm46IEZJTFRFUl9CWV9WQVJTfSxcbiAgICBGSUxURVJfQlk6IHtmbjogRklMVEVSX0JZfSxcbiAgICBGSVJTVDoge2ZuOiBGSVJTVH0sXG4gICAgRlJPTV9SRVBTOiB7Zm46IEZST01fUkVQU30sXG4gICAgR0VUX0FHRToge2ZuOiBHRVRfQUdFfSxcbiAgICBHRVRfTEFCRUxTOiB7Zm46IEdFVF9MQUJFTFN9LFxuICAgIElOQ0xVREVTOiB7Zm46IElOQ0xVREVTfSxcbiAgICBJU19BRlRFUjoge2ZuOiBJU19BRlRFUn0sXG4gICAgSVNfQkVGT1JFOiB7Zm46IElTX0JFRk9SRX0sXG4gICAgSVNfV0lUSElOX0lOVEVSVkFMOiB7Zm46IElTX1dJVEhJTl9JTlRFUlZBTH0sXG4gICAgSVNJTjoge2ZuOiBJU0lOfSxcbiAgICBKT0lOX0ZPUk1TOiB7Zm46IEpPSU5fRk9STVN9LFxuICAgIEpPSU5fUkVQRUFUSU5HX1NMSURFUzoge2ZuOiBKT0lOX1JFUEVBVElOR19TTElERVN9LFxuICAgIExBU1Q6IHtmbjogTEFTVH0sXG4gICAgTEVOOiB7Zm46IExFTn0sXG4gICAgTUFQOiB7Zm46IE1BUH0sXG4gICAgTUFYOiB7Zm46IE1BWH0sXG4gICAgTUVBTjoge2ZuOiBNRUFOfSxcbiAgICBNRURJQU46IHtmbjogTUVESUFOfSxcbiAgICBNT0RFOiB7Zm46IE1PREV9LFxuICAgIE9QOiB7Zm46IE9QfSxcbiAgICBQRVJDRU5UOiB7Zm46IFBFUkNFTlR9LFxuICAgIFJFTU9WRV9EVVBMSUNBVEVTOiB7Zm46IFJFTU9WRV9EVVBMSUNBVEVTfSxcbiAgICBSRVBFQVQ6IHtmbjogUkVQRUFUfSxcbiAgICBST1VORDoge2ZuOiBST1VORH0sXG4gICAgU1VNOiB7Zm46IFNVTX0sXG4gICAgVE9EQVk6IHtmbjogVE9EQVl9LFxuICB9O1xufVxuXG4vKipcbiAqIFVUSUxJVFkgRlVOQ0lPTlxuICogVGhpcyBmdW5jdGlvbiBwcm92aWRlIGEgZGVlcCBjb3B5IGJ1aWxkZXIgb2YgYXJyYXkgb2YgbWFpbiBmb3Jtcy5cbiAqIFRoYXQncyBhIGN1c3RvbSBmdW5jdGlvbiByZWxhdGVkIHRvIG1haW5mb3JtcyB0aGF0IGNhbiBiZSBhYmxlIHRvIGluY3JlYXNlIGNvcHkgcGVyZm9ybWFuY2UuXG4gKlxuICogQHBhcmFtIHtNYWluRm9ybVtdfSBmb3Jtc1xuICogQHJldHVybiB7Kn0gIHtNYWluRm9ybVtdfVxuICovXG5mdW5jdGlvbiBjbG9uZU1haW5Gb3Jtcyhmb3JtczogTWFpbkZvcm1bXSk6IE1haW5Gb3JtW10ge1xuICBsZXQgcmVzOiBNYWluRm9ybVtdID0gW107XG4gIGZvciAoY29uc3QgZm9ybSBvZiBmb3Jtcykge1xuICAgIGlmIChmb3JtID09IG51bGwpIHtcbiAgICAgIHJlcy5wdXNoKGZvcm0pO1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGxldCByZXBzOiBJbnN0YW5jZXMgPSB7fTtcbiAgICBpZiAoZm9ybS5yZXBzICE9IG51bGwpIHtcbiAgICAgIGZvciAoY29uc3Qga2V5IGluIGZvcm0ucmVwcykge1xuICAgICAgICByZXBzW2tleV0gPSBbLi4uZm9ybS5yZXBzW2tleV1dO1xuICAgICAgfVxuICAgIH1cbiAgICByZXMucHVzaCh7Li4uZm9ybSwgcmVwc30pO1xuICB9XG4gIHJldHVybiByZXM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBldmFsdWF0ZUV4cHJlc3Npb24oZXhwcmVzc2lvbjogc3RyaW5nLCBjb250ZXh0PzogQWpmQ29udGV4dCk6IGFueSB7XG4gIHJldHVybiBjcmVhdGVGdW5jdGlvbihleHByZXNzaW9uKShjb250ZXh0KTtcbn1cblxuY29uc3QgZ2xvYmFscyA9IFtcbiAgJ3RoaXMnLCAndHJ1ZScsICdmYWxzZScsICdudWxsJywgJ3VuZGVmaW5lZCcsICdJbmZpbml0eScsICdOYU4nLCAnaXNOYU4nLCAnaXNGaW5pdGUnLFxuICAnT2JqZWN0JywgJ1N0cmluZycsICdBcnJheScsICdTZXQnLCAnTWFwJywgJ051bWJlcicsICdEYXRlJywgJ01hdGgnLCAncGFyc2VJbnQnLCAncGFyc2VGbG9hdCcsXG5dO1xuXG50eXBlIEZ1bmMgPSAoYz86IEFqZkNvbnRleHQpID0+IGFueTtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUZ1bmN0aW9uKGV4cHJlc3Npb246IHN0cmluZyk6IEZ1bmMge1xuICBpZiAoZXhwcmVzc2lvbiA9PSBudWxsKSB7XG4gICAgcmV0dXJuIF8gPT4gbnVsbDtcbiAgfVxuICBleHByZXNzaW9uID0gU3RyaW5nKGV4cHJlc3Npb24pO1xuICBpZiAoZXhwcmVzc2lvbiA9PT0gJ3RydWUnKSB7XG4gICAgcmV0dXJuIF8gPT4gdHJ1ZTtcbiAgfVxuICBpZiAoZXhwcmVzc2lvbiA9PT0gJ2ZhbHNlJykge1xuICAgIHJldHVybiBfID0+IGZhbHNlO1xuICB9XG4gIGlmICgvXlthLXpBLVpfJF1bXFx3JF0qJC8udGVzdChleHByZXNzaW9uKSkgeyAvLyBleHByZXNzaW9uIGlzIGFuIGlkZW50aWZpZXJcbiAgICByZXR1cm4gYyA9PiBjID09IG51bGwgfHwgY1tleHByZXNzaW9uXSA9PT0gdW5kZWZpbmVkID8gbnVsbCA6IGNbZXhwcmVzc2lvbl07XG4gIH1cbiAgaWYgKC9eXCJbXlwiXSpcIiQvLnRlc3QoZXhwcmVzc2lvbikgfHwgL14nW14nXSonJC8udGVzdChleHByZXNzaW9uKSkge1xuICAgIGxldCBzdHIgPSBleHByZXNzaW9uLnNsaWNlKDEsIC0xKTtcbiAgICByZXR1cm4gXyA9PiBzdHI7XG4gIH1cblxuICBjb25zdCBpZGVudGlmaWVycyA9IG5ldyBTZXQoZ2V0Q29kZUlkZW50aWZpZXJzKGV4cHJlc3Npb24sIHRydWUpKS5hZGQoJ2V4ZWNDb250ZXh0Jyk7XG4gIGZvciAoY29uc3QgaWRlIG9mIGdsb2JhbHMpIHtcbiAgICBpZGVudGlmaWVycy5kZWxldGUoaWRlKTtcbiAgfVxuICBjb25zdCBhcmdOYW1lcyA9IFsuLi5pZGVudGlmaWVyc107XG4gIGxldCBmdW5jOiBGdW5jdGlvbjtcbiAgdHJ5IHtcbiAgICBmdW5jID0gbmV3IEZ1bmN0aW9uKC4uLmFyZ05hbWVzLCAncmV0dXJuICcgKyBleHByZXNzaW9uKTtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIF8gPT4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIGNvbnRleHQgPT4ge1xuICAgIGNvbnN0IGFyZ1ZhbHVlcyA9IGFyZ05hbWVzLm1hcChuYW1lID0+IHtcbiAgICAgIGlmIChjb250ZXh0ICE9IG51bGwgJiYgY29udGV4dFtuYW1lXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBjb250ZXh0W25hbWVdO1xuICAgICAgfVxuICAgICAgaWYgKEFqZkV4cHJlc3Npb25VdGlscy51dGlsc1tuYW1lXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBBamZFeHByZXNzaW9uVXRpbHMudXRpbHNbbmFtZV0uZm47XG4gICAgICB9XG4gICAgICBpZiAobmFtZSA9PT0gJ2V4ZWNDb250ZXh0Jykge1xuICAgICAgICByZXR1cm4gZXhlY0NvbnRleHQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9KTtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIGZ1bmMoLi4uYXJnVmFsdWVzKTtcbiAgICB9IGNhdGNoIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH07XG59XG5cbi8qKlxuICogSXQgcmV0dXJucyB0aGUgY291bnQgb2YgZGlnaXQgaW5zaWRlIHguXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkaWdpdENvdW50KHg6IG51bWJlcik6IG51bWJlciB7XG4gIGlmIChpc05hTih4KSB8fCB0eXBlb2YgeCAhPT0gJ251bWJlcicpIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuICBpZiAoIWlzRmluaXRlKHgpKSB7XG4gICAgcmV0dXJuIEluZmluaXR5O1xuICB9XG4gIHJldHVybiB4LnRvU3RyaW5nKCkucmVwbGFjZSgvW14wLTldL2csICcnKS5sZW5ndGg7XG59XG4vKipcbiAqIEl0IGlzIGNvdW50IHRoZSBjb3VudCBvZiBkZWNpbWFsIGRpZ2l0IGluc2lkZSBzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZGVjaW1hbENvdW50KHg6IHN0cmluZyB8IG51bWJlcik6IG51bWJlciB7XG4gIGlmICh0eXBlb2YgeCA9PT0gJ3N0cmluZycpIHtcbiAgICB4ID0gcGFyc2VGbG9hdCh4KTtcbiAgfVxuICBpZiAodHlwZW9mIHggIT09ICdudW1iZXInIHx8IGlzTmFOKHgpKSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cbiAgY29uc3QgcGFydHMgPSB4LnRvU3RyaW5nKCkuc3BsaXQoJy4nKTtcbiAgcmV0dXJuIHBhcnRzLmxlbmd0aCA+IDEgPyBwYXJ0c1sxXS5sZW5ndGggOiAwO1xufVxuLyoqXG4gKiBJdCBpcyB0cnVlIGlmIHggaXMgYW4gaW50ZWdlci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzSW50KHg6IHN0cmluZyB8IG51bWJlcik6IGJvb2xlYW4ge1xuICBpZiAodHlwZW9mIHggPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIC9eLT9cXGQrJC8udGVzdCh4KTtcbiAgfVxuICBpZiAodHlwZW9mIHggPT09ICdudW1iZXInKSB7XG4gICAgcmV0dXJuIE1hdGgucm91bmQoeCkgPT09IHg7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuLyoqXG4gKiBJdCBpcyB0cnVlIGlmIHggaXMgbm90IGVtcHR5LlxuICovXG5leHBvcnQgZnVuY3Rpb24gbm90RW1wdHkoeDogYW55KTogYm9vbGVhbiB7XG4gIHJldHVybiB0eXBlb2YgeCAhPT0gJ3VuZGVmaW5lZCcgJiYgeCAhPT0gbnVsbCA/IHgudG9TdHJpbmcoKS5sZW5ndGggPiAwIDogZmFsc2U7XG59XG4vKipcbiAqIEl0IGlzIHRydWUgaWYgYXJyYXkgY29udGFpbnMgeCBvciBhcnJheSBpcyBlcXVhbCB0byB4LlxuICovXG5leHBvcnQgZnVuY3Rpb24gdmFsdWVJbkNob2ljZShhcnJheTogYW55W10sIHg6IGFueSk6IGJvb2xlYW4ge1xuICByZXR1cm4gKGFycmF5IHx8IFtdKS5pbmRleE9mKHgpID4gLTEgfHwgYXJyYXkgPT09IHg7XG59XG4vKipcbiAqIEl0IGFwcGxpZXMgY2FsbGJhY2sgZm9yIHJlcHMgdGltZXMgYW5kIGFjY3VtdWxhdGUgdGhlIHJlc3VsdCBpbiBhY2MuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzY2FuR3JvdXBGaWVsZChyZXBzOiBudW1iZXIsIGFjYzogYW55LCBjYWxsYmFjazogYW55KTogYW55IHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXBzOyBpKyspIHtcbiAgICBhY2MgPSBjYWxsYmFjayhhY2MsIGkpO1xuICB9XG4gIHJldHVybiBhY2M7XG59XG4vKipcbiAqIEl0IHJldHVybnMgdGhlIHN1bSBvZiB0aGUgYXJyYXkgdmFsdWVzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gc3VtKGFycmF5OiBhbnlbXSk6IGFueSB7XG4gIHJldHVybiBhcnJheS5yZWR1Y2UoKGEsIGIpID0+IGEgKyBiLCAwKTtcbn1cbi8qKlxuICogSXQgYXBwbGllcyBhZGQvcmVtb3ZlKG9wZXJhdGlvbikgdiAoZGF5L21vbnRoL3llYXIpcGVyaW9kIHRvIGRzdHJpbmcgYW5kIHJldHVybiBuZXcgZm9ybWF0IGRhdGUuXG4gKi9cbi8vIFRPRE8gY2hlY2sgaWYgZGVwcmVjYXRlZCBpbnN0ZWFkIHJlZmFjb3RvcmluZyBwYXJhbWV0ZXIgdHlwZVxuLy8gVE9ETyAoZFN0cmluZzogc3RyaW5nfG51bGwsIHBlcmlvZDonZGF5J3wnbW9udGgnfCd5ZWFyJyxcbi8vIFRPRE8gb3BlcmF0aW9uOiAnYWRkL3JlbW92ZScgPSAnYWRkJywgdjpudW1iZXIpXG5leHBvcnQgZnVuY3Rpb24gZGF0ZU9wZXJhdGlvbnMoZFN0cmluZzogc3RyaW5nLCBwZXJpb2Q6IHN0cmluZywgb3BlcmF0aW9uOiBzdHJpbmcsIHY6IGFueSk6IHN0cmluZyB7XG4gIGNvbnN0IGZtdCA9ICdtbS9kZC95eXl5JztcbiAgbGV0IGQgPSB0eXBlb2YgZFN0cmluZyAhPT0gJ3VuZGVmaW5lZCcgPyBkYXRlVXRpbHMucGFyc2UoZFN0cmluZykgOiBuZXcgRGF0ZSgpO1xuICBpZiAob3BlcmF0aW9uID09ICdyZW1vdmUnKSB7XG4gICAgdiA9IC12O1xuICB9XG4gIGxldCBkYXRlT3A7XG4gIHN3aXRjaCAocGVyaW9kKSB7XG4gICAgY2FzZSAnZGF5JzpcbiAgICAgIGRhdGVPcCA9IGRhdGVVdGlscy5hZGREYXlzO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnbW9udGgnOlxuICAgICAgZGF0ZU9wID0gZGF0ZVV0aWxzLmFkZE1vbnRocztcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3llYXInOlxuICAgICAgZGF0ZU9wID0gZGF0ZVV0aWxzLmFkZFllYXJzO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiAnJztcbiAgfVxuICByZXR1cm4gZGF0ZVV0aWxzLmZvcm1hdChkYXRlT3AoZCwgdiksIGZtdCk7XG59XG5cbi8qKlxuICogRml4ZWQgZGVjaW1hbHMgZm9yIGZsb2F0aW5nIG51bWJlclxuICogUmVzb2x2ZSBmbG9hdCBzdW0gcHJvYmxlbXMgbGlrZSB0aGlzOiAwLjEgKyAwLjIgPSAwLjMwMDAwMDAwMDAwMDAwMDA0XG4gKiBAcGFyYW0gbnVtXG4gKiBAcmV0dXJuc1xuICovXG5mdW5jdGlvbiB0cnVuY2F0ZTEwKG51bTogbnVtYmVyKSB7XG4gIHJldHVybiBwYXJzZUZsb2F0KG51bS50b0ZpeGVkKDEwKSk7XG59XG5cbi8qKlxuICogSXQgcm91bmRzIHRoZSBudW0gd2l0aCB0aGUgdmFsdWUgb2YgZGlnaXRzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByb3VuZChudW06IG51bWJlciB8IHN0cmluZywgZGlnaXRzPzogbnVtYmVyKTogbnVtYmVyIHtcbiAgZGlnaXRzID0gZGlnaXRzIHx8IDA7XG4gIGxldCBmO1xuICBpZiAodHlwZW9mIG51bSAhPT0gJ251bWJlcicpIHtcbiAgICB0cnkge1xuICAgICAgZiA9IHBhcnNlRmxvYXQobnVtKTtcbiAgICB9IGNhdGNoIChlKSB7fVxuICB9IGVsc2Uge1xuICAgIGYgPSBudW07XG4gIH1cbiAgaWYgKGYgPT0gbnVsbCB8fCBpc05hTihmKSkge1xuICAgIGYgPSAwO1xuICB9XG4gIGNvbnN0IG0gPSBNYXRoLnBvdygxMCwgZGlnaXRzKTtcbiAgcmV0dXJuIE1hdGgucm91bmQoZiAqIG0pIC8gbTtcbn1cbi8qKlxuICogSXQgZXh0cmFjdHMgcHJvcGVydHkgZnJvbSBzb3VyY2UuXG4gKiBmb3IgZXZlcnkgZWxlbWVudCBvZiBzb3VyY2UgaWYgcHJvcGVydHkgYW5kIHByb3BlcnR5MiBhcmUgZGVmaW5lZCByZXR1cm4gdGhlIHN1bVxuICogZWxzZSBpZiBvbmx5IHByb3BlcnR5IGlzIGRlZmluZWQgcmV0dXJuIGhpbS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGV4dHJhY3RBcnJheShzb3VyY2U6IGFueVtdLCBwcm9wZXJ0eTogc3RyaW5nLCBwcm9wZXJ0eTI/OiBzdHJpbmcpOiBhbnlbXSB7XG4gIHNvdXJjZSA9IChzb3VyY2UgfHwgW10pLmZpbHRlcigoZjogYW55KSA9PiBmICE9IG51bGwpO1xuICBjb25zdCByZXM6IGFueVtdID0gW107XG4gIGZvciAoY29uc3QgcyBvZiBzb3VyY2UpIHtcbiAgICBpZiAoc1twcm9wZXJ0eV0gIT0gbnVsbCAmJiBwcm9wZXJ0eTIgIT0gbnVsbCAmJiBzW3Byb3BlcnR5Ml0gIT0gbnVsbCkge1xuICAgICAgcmVzLnB1c2goTnVtYmVyKHNbcHJvcGVydHldKSArIE51bWJlcihzW3Byb3BlcnR5Ml0pKTtcbiAgICB9IGVsc2UgaWYgKHNbcHJvcGVydHldICE9IG51bGwpIHtcbiAgICAgIHJlcy5wdXNoKHNbcHJvcGVydHldKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cbi8qKlxuICogSXQgcmV0dXJucyB0aGUgc3VtIG9mIGFsbCBkZWZpbmVkIHByb3BlcnRpZXMgb2YgZWFjaCBlbGVtZW50IG9mIHNvdXJjZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGV4dHJhY3RTdW0oc291cmNlOiBhbnlbXSwgcHJvcGVydGllczogc3RyaW5nW10pOiBudW1iZXIge1xuICBwcm9wZXJ0aWVzID0gWy4uLihwcm9wZXJ0aWVzIHx8IFtdKV07XG5cbiAgbGV0IHN1bVZhbCA9IDA7XG4gIGZvciAoY29uc3QgcHJvcCBvZiBwcm9wZXJ0aWVzKSB7XG4gICAgY29uc3QgYXJyYXkgPSBleHRyYWN0QXJyYXkoc291cmNlLCBwcm9wKTtcbiAgICBmb3IgKGNvbnN0IGEgb2YgYXJyYXkpIHtcbiAgICAgIGlmICghaXNOYU4oTnVtYmVyKGEpKSkge1xuICAgICAgICBzdW1WYWwgKz0gTnVtYmVyKGEpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gc3VtVmFsO1xufVxuLyoqXG4gKiBJdCByZXR1cm5zIGEgbnVtYmVyIGFycmF5IHRoYXQgY29udGFpbnMgdGhlIHN1bSBvZiBwcm9wZXJ0aWVzIHZhbHVlIGluc2lkZSB0aGUgc291cmNlLlxuICogZXh0cmFjdEFycmF5U3VtKFt7YTogNX0sIHtiOiAxfSwge2E6IDUsIGI6IDF9XSwgWydhJywgJ2InXSk7ID0mZ3Q7IFs2LDZdXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBleHRyYWN0QXJyYXlTdW0oc291cmNlOiBhbnlbXSwgcHJvcGVydGllczogc3RyaW5nW10pOiBhbnlbXSB7XG4gIGNvbnN0IGFycmF5czogYW55W10gPSBbXTtcbiAgcHJvcGVydGllcyA9IFsuLi4ocHJvcGVydGllcyB8fCBbXSldO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvcGVydGllcy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGFycmF5ID0gZXh0cmFjdEFycmF5KHNvdXJjZSwgcHJvcGVydGllc1tpXSk7XG4gICAgYXJyYXlzLnB1c2goYXJyYXkpO1xuICB9XG5cbiAgY29uc3QgcmVzOiBhbnlbXSA9IFtdO1xuICBpZiAoYXJyYXlzLmxlbmd0aCA+IDApIHtcbiAgICBmb3IgKGxldCB3ZWVrSSA9IDA7IHdlZWtJIDwgYXJyYXlzWzBdLmxlbmd0aDsgd2Vla0krKykge1xuICAgICAgbGV0IHN1bVZhbCA9IDA7XG4gICAgICBmb3IgKGxldCBwcm9wSSA9IDA7IHByb3BJIDwgcHJvcGVydGllcy5sZW5ndGg7IHByb3BJKyspIHtcbiAgICAgICAgc3VtVmFsID0gc3VtVmFsICsgTnVtYmVyKGFycmF5c1twcm9wSV1bd2Vla0ldKTtcbiAgICAgIH1cbiAgICAgIHJlcy5wdXNoKHN1bVZhbCk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXM7XG59XG4vKipcbiAqIERyYXcgYSB0aHJlc2hvbGQgbGluZSBvbiBjaGFydCByZWxhdGVkIHRvIHRoZSBwcm9wZXJ0eS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRyYXdUaHJlc2hvbGQoc291cmNlOiBhbnlbXSwgcHJvcGVydHk6IHN0cmluZywgdGhyZXNob2xkOiBhbnlbXSk6IGFueVtdIHtcbiAgc291cmNlID0gKHNvdXJjZSB8fCBbXSkuZmlsdGVyKChmOiBhbnkpID0+IGYgIT0gbnVsbCk7XG4gIHRocmVzaG9sZCA9IHRocmVzaG9sZCB8fCBbMF07XG4gIGlmICghKHRocmVzaG9sZCBpbnN0YW5jZW9mIEFycmF5KSkge1xuICAgIHRocmVzaG9sZCA9IFt0aHJlc2hvbGRdO1xuICB9XG4gIGNvbnN0IGwgPSBzb3VyY2UubGVuZ3RoO1xuICBjb25zdCByZXM6IGFueVtdID0gW107XG4gIGxldCBjb3VudCA9IDA7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbDsgaSsrKSB7XG4gICAgaWYgKHNvdXJjZVtpXVtwcm9wZXJ0eV0gIT0gbnVsbCkge1xuICAgICAgaWYgKHRocmVzaG9sZC5sZW5ndGggPiBjb3VudCkge1xuICAgICAgICByZXMucHVzaCh0aHJlc2hvbGRbY291bnRdKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlcy5wdXNoKHRocmVzaG9sZFswXSk7XG4gICAgICB9XG4gICAgICBjb3VudCsrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzO1xufVxuLyoqXG4gKiBFeHRyYWN0IHRoZSBkYXRlcyBvZiB0aGUgc291cmNlIG9iamVjdCB3aXRoIHByb3BlcnR5ICE9IG51bGxcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGV4dHJhY3REYXRlcyhzb3VyY2U6IGFueVtdLCBwcm9wZXJ0eTogc3RyaW5nLCBmbXQ6IHN0cmluZyk6IHN0cmluZ1tdIHtcbiAgc291cmNlID0gKHNvdXJjZSB8fCBbXSkuZmlsdGVyKChmOiBhbnkpID0+IGYgIT0gbnVsbCk7XG4gIGNvbnN0IGwgPSBzb3VyY2UubGVuZ3RoO1xuICBjb25zdCByZXM6IGFueSA9IFtdO1xuICBsZXQgcHJlZml4ID0gJyc7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbDsgaSsrKSB7XG4gICAgaWYgKHNvdXJjZVtpXVtwcm9wZXJ0eV0gIT0gbnVsbCkge1xuICAgICAgc3dpdGNoIChmbXQpIHtcbiAgICAgICAgY2FzZSAnV1cnOlxuICAgICAgICBjYXNlICd3dyc6XG4gICAgICAgICAgcHJlZml4ID0gJ1cnO1xuICAgICAgICAgIHJlcy5wdXNoKHByZWZpeCArIGZvcm1hdERhdGUoc291cmNlW2ldWydkYXRlX3N0YXJ0J10sIGZtdCkpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdNTSc6XG4gICAgICAgIGNhc2UgJ21tJzpcbiAgICAgICAgICBwcmVmaXggPSAnTSc7XG4gICAgICAgICAgcmVzLnB1c2gocHJlZml4ICsgaXNvTW9udGgoc291cmNlW2ldWydkYXRlX3N0YXJ0J10sIGZtdCkpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHByZWZpeCA9ICcnO1xuICAgICAgICAgIHJlcy5wdXNoKHByZWZpeCArIGZvcm1hdERhdGUoc291cmNlW2ldWydkYXRlX3N0YXJ0J10sIGZtdCkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzO1xufVxuLyoqXG4gKiBFeHRyYWN0IHRoZSBsYXN0IHByb3BlcnR5IGNvbnRhaW5zIGluIHNvdXJjZSAhPSBudWxsXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBsYXN0UHJvcGVydHkoc291cmNlOiBhbnksIHByb3BlcnR5OiBzdHJpbmcpOiBhbnkge1xuICBzb3VyY2UgPSAoc291cmNlIHx8IFtdKS5maWx0ZXIoKGY6IGFueSkgPT4gZiAhPSBudWxsKTtcbiAgbGV0IGwgPSBzb3VyY2UubGVuZ3RoIC0gMTtcblxuICB3aGlsZSAobCA+PSAwICYmIHNvdXJjZVtsXVtwcm9wZXJ0eV0gPT0gbnVsbCkge1xuICAgIGwtLTtcbiAgICBpZiAobCA8IDApIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGwgPj0gMCA/IHNvdXJjZVtsXVtwcm9wZXJ0eV0gOiAnJztcbn1cbi8qKlxuICogSXQgc3VtIHRoZSBMQXN0IHByb3BlcnRpZXMgb2Ygc291cmNlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gc3VtTGFzdFByb3BlcnRpZXMoc291cmNlOiBhbnlbXSwgcHJvcGVydGllczogc3RyaW5nW10pOiBudW1iZXIge1xuICBzb3VyY2UgPSAoc291cmNlIHx8IFtdKS5maWx0ZXIoKGY6IGFueSkgPT4gZiAhPSBudWxsKTtcbiAgbGV0IHN1bVZhbCA9IDA7XG4gIGxldCB2YWwgPSAwO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHByb3BlcnRpZXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YWwgPSBOdW1iZXIobGFzdFByb3BlcnR5KHNvdXJjZSwgcHJvcGVydGllc1tpXSkpO1xuICAgIGlmICghaXNOYU4odmFsKSkge1xuICAgICAgc3VtVmFsICs9IHZhbDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHN1bVZhbDtcbn1cbi8qKlxuICogQ29tcHV0ZSB0aGUgdHJlbmQgb2YgdGhlIHByb3BlcnR5IGNvbnRhaW5lZCBvbiB0aGUgc291cmNlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gY2FsY3VsYXRlVHJlbmRQcm9wZXJ0eShzb3VyY2U6IGFueVtdLCBwcm9wZXJ0eTogc3RyaW5nKTogc3RyaW5nIHtcbiAgc291cmNlID0gKHNvdXJjZSB8fCBbXSkuZmlsdGVyKChmOiBhbnkpID0+IGYgIT0gbnVsbCk7XG4gIGxldCBsYXN0ID0gc291cmNlLmxlbmd0aCAtIDE7XG4gIHdoaWxlIChzb3VyY2VbbGFzdF1bcHJvcGVydHldID09IG51bGwpIHtcbiAgICBpZiAobGFzdCA9PSAwKSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgbGFzdC0tO1xuICB9XG4gIGxldCBsYXN0TGFzdCA9IGxhc3QgLSAxO1xuICBpZiAobGFzdCA9PSAwKSB7XG4gICAgbGFzdExhc3QgPSBsYXN0O1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzb3VyY2VbbGFzdExhc3RdW3Byb3BlcnR5XSA9PSBudWxsKSB7XG4gICAgICBpZiAobGFzdExhc3QgPT0gMCkge1xuICAgICAgICBsYXN0TGFzdCA9IGxhc3Q7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgbGFzdExhc3QtLTtcbiAgICB9XG4gIH1cblxuICBjb25zdCBsYXN0UHJvcCA9IHNvdXJjZVtsYXN0XSA/IHNvdXJjZVtsYXN0XVtwcm9wZXJ0eV0gfHwgMCA6IDA7XG4gIGNvbnN0IGxhc3RMYXN0UHJvcCA9IHNvdXJjZVtsYXN0TGFzdF0gPyBzb3VyY2VbbGFzdExhc3RdW3Byb3BlcnR5XSB8fCAwIDogMDtcblxuICBpZiAobGFzdFByb3AgPT0gbGFzdExhc3RQcm9wKSB7XG4gICAgcmV0dXJuICc8cD48aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCIgc3R5bGU9XCJjb2xvcjpibHVlXCI+dHJlbmRpbmdfZmxhdDwvaT48L3A+JztcbiAgfSBlbHNlIGlmIChsYXN0UHJvcCA+IGxhc3RMYXN0UHJvcCkge1xuICAgIHJldHVybiAnPHA+PGkgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiIHN0eWxlPVwiY29sb3I6Z3JlZW5cIj50cmVuZGluZ191cDwvaT48L3A+JztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gJzxwPjxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIiBzdHlsZT1cImNvbG9yOnJlZFwiPnRyZW5kaW5nX2Rvd248L2k+PC9wPic7XG4gIH1cbn1cbi8qKlxuICogQ29tcHV0ZSB0aGUgYXZlcmFnZSB2YWx1ZSBvZiB0aGUgcHJvcGVydHkgY29udGFpbmVkIG9uIHRoZSBzb3VyY2UuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjYWxjdWxhdGVUcmVuZEJ5UHJvcGVydGllcyhzb3VyY2U6IGFueVtdLCBwcm9wZXJ0aWVzOiBzdHJpbmdbXSk6IHN0cmluZyB7XG4gIGNvbnN0IGFycmF5c3VtID0gZXh0cmFjdEFycmF5U3VtKHNvdXJjZSwgcHJvcGVydGllcyk7XG5cbiAgY29uc3QgbGFzdFByb3AgPSBhcnJheXN1bS5sZW5ndGggPiAwID8gYXJyYXlzdW1bYXJyYXlzdW0ubGVuZ3RoIC0gMV0gfHwgMCA6IDA7XG4gIGNvbnN0IGxhc3RMYXN0UHJvcCA9IGFycmF5c3VtLmxlbmd0aCA+IDEgPyBhcnJheXN1bVthcnJheXN1bS5sZW5ndGggLSAyXSB8fCAwIDogbGFzdFByb3A7XG5cbiAgaWYgKGxhc3RQcm9wID09IGxhc3RMYXN0UHJvcCkge1xuICAgIHJldHVybiAnPHA+PGkgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiIHN0eWxlPVwiY29sb3I6Ymx1ZVwiPnRyZW5kaW5nX2ZsYXQ8L2k+PC9wPic7XG4gIH0gZWxzZSBpZiAobGFzdFByb3AgPiBsYXN0TGFzdFByb3ApIHtcbiAgICByZXR1cm4gJzxwPjxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIiBzdHlsZT1cImNvbG9yOmdyZWVuXCI+dHJlbmRpbmdfdXA8L2k+PC9wPic7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuICc8cD48aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCIgc3R5bGU9XCJjb2xvcjpyZWRcIj50cmVuZGluZ19kb3duPC9pPjwvcD4nO1xuICB9XG59XG4vKipcbiAqXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjYWxjdWxhdGVBdmdQcm9wZXJ0eShcbiAgc291cmNlOiBhbnlbXSxcbiAgcHJvcGVydHk6IHN0cmluZyxcbiAgcmFuZ2U6IG51bWJlcixcbiAgY29lZmZpY2llbnQ6IG51bWJlcixcbik6IG51bWJlciB7XG4gIHNvdXJjZSA9IChzb3VyY2UgfHwgW10pLmZpbHRlcigoZjogYW55KSA9PiBmICE9IG51bGwpO1xuXG4gIGNvZWZmaWNpZW50ID0gY29lZmZpY2llbnQgfHwgMTtcbiAgcmFuZ2UgPSByYW5nZSB8fCAxMjtcblxuICBsZXQgbCA9IHNvdXJjZS5sZW5ndGg7XG4gIGxldCByZXMgPSAwO1xuICBsZXQgY291bnRlciA9IDA7XG4gIGxldCBub1plcm8gPSAwO1xuXG4gIGlmIChsIDwgcmFuZ2UpIHtcbiAgICByYW5nZSA9IGw7XG4gIH1cblxuICB3aGlsZSAocmFuZ2UgIT0gMCkge1xuICAgIGlmIChzb3VyY2VbbCAtIDFdW3Byb3BlcnR5XSAhPSBudWxsKSB7XG4gICAgICBjb3VudGVyKys7XG4gICAgICByZXMgKz0gTnVtYmVyKHNvdXJjZVtsIC0gMV1bcHJvcGVydHldKTtcblxuICAgICAgaWYgKHNvdXJjZVtsIC0gMV1bcHJvcGVydHldID4gMCkge1xuICAgICAgICBub1plcm8rKztcbiAgICAgIH1cbiAgICB9XG4gICAgbC0tO1xuICAgIHJhbmdlLS07XG4gIH1cblxuICBpZiAoY29lZmZpY2llbnQgPT0gMCkge1xuICAgIHJldHVybiBub1plcm87XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHJvdW5kKChyZXMgLyBjb3VudGVyKSAqIGNvZWZmaWNpZW50LCAyKSB8fCAwO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjYWxjdWxhdGVBdmdQcm9wZXJ0eUFycmF5KFxuICBzb3VyY2U6IGFueVtdLFxuICBwcm9wZXJ0aWVzOiBzdHJpbmdbXSxcbiAgcmFuZ2U6IG51bWJlcixcbiAgY29lZmZpY2llbnQ6IG51bWJlcixcbik6IG51bWJlcltdIHtcbiAgc291cmNlID0gKHNvdXJjZSB8fCBbXSkuZmlsdGVyKChmOiBhbnkpID0+IGYgIT0gbnVsbCk7XG4gIGNvbnN0IHJlc0FycjogYW55W10gPSBbXTtcblxuICBpZiAocHJvcGVydGllcyAmJiBwcm9wZXJ0aWVzLmxlbmd0aCA+IDApIHtcbiAgICBsZXQgYXZnID0gMDtcblxuICAgIGNvZWZmaWNpZW50ID0gY29lZmZpY2llbnQgfHwgMTtcbiAgICByYW5nZSA9IHJhbmdlIHx8IDEyO1xuXG4gICAgY29uc3Qgc291cmNlQXJyID1cbiAgICAgIHByb3BlcnRpZXMubGVuZ3RoID4gMVxuICAgICAgICA/IGV4dHJhY3RBcnJheVN1bShzb3VyY2UsIHByb3BlcnRpZXMpXG4gICAgICAgIDogZXh0cmFjdEFycmF5KHNvdXJjZSwgcHJvcGVydGllc1swXSk7XG5cbiAgICBsZXQgbCA9IHNvdXJjZUFyci5sZW5ndGg7XG5cbiAgICBmb3IgKGxldCBsZW4gPSBsOyBsZW4gPiAwOyBsZW4tLSkge1xuICAgICAgbGV0IHJlcyA9IDA7XG4gICAgICBsZXQgY291bnRlciA9IDA7XG4gICAgICBsZXQgbm9aZXJvID0gMDtcblxuICAgICAgaWYgKGxlbiA8IHJhbmdlKSB7XG4gICAgICAgIHJhbmdlID0gbGVuO1xuICAgICAgfVxuXG4gICAgICBmb3IgKGxldCByID0gMTsgciA8PSByYW5nZTsgcisrKSB7XG4gICAgICAgIGxldCB2YWwgPSBzb3VyY2VBcnJbbGVuIC0gcl07XG4gICAgICAgIGlmICh2YWwgIT0gbnVsbCkge1xuICAgICAgICAgIGNvdW50ZXIrKztcbiAgICAgICAgICByZXMgKz0gTnVtYmVyKHZhbCk7XG4gICAgICAgICAgaWYgKHZhbCA+IDApIHtcbiAgICAgICAgICAgIG5vWmVybysrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoY291bnRlciA+IDApIHtcbiAgICAgICAgaWYgKGNvZWZmaWNpZW50ID09IDApIHtcbiAgICAgICAgICBhdmcgPSBub1plcm87XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYXZnID0gKHJlcyAvIGNvdW50ZXIpICogY29lZmZpY2llbnQgfHwgMDtcbiAgICAgICAgfVxuICAgICAgICByZXNBcnIucHVzaChyb3VuZChhdmcsIDIpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc0Fyci5yZXZlcnNlKCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhbGVydChzb3VyY2U6IGFueVtdLCBwcm9wZXJ0eTogc3RyaW5nLCB0aHJlc2hvbGQ6IG51bWJlcik6IHN0cmluZyB7XG4gIHNvdXJjZSA9IFsuLi4oc291cmNlIHx8IFtdKV07XG5cbiAgaWYgKGxhc3RQcm9wZXJ0eShzb3VyY2UsIHByb3BlcnR5KSA+IHRocmVzaG9sZCkge1xuICAgIHJldHVybiAnPHA+PGkgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiIHN0eWxlPVwiY29sb3I6cmVkXCI+d2FybmluZzwvaT48L3A+JztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gJzxwPjwvcD4nO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXROdW1iZXIobnVtOiBudW1iZXIsIGZtdD86IHN0cmluZyk6IHN0cmluZyB7XG4gIGZtdCA9IGZtdCB8fCAnMCwwWy5dMCc7XG4gIHJldHVybiBudW1icm8obnVtKS5mb3JtYXQoZm10KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdERhdGUoZGF0ZTogRGF0ZSB8IHN0cmluZywgZm10Pzogc3RyaW5nKTogc3RyaW5nIHtcbiAgZm10ID0gZm10IHx8ICdtbS1ERC15eXl5JztcbiAgcmV0dXJuIGRhdGVVdGlscy5mb3JtYXQodHlwZW9mIGRhdGUgPT09ICdzdHJpbmcnID8gZGF0ZVV0aWxzLnBhcnNlKGRhdGUpIDogZGF0ZSwgZm10KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzb01vbnRoKGRhdGU6IERhdGUsIGZtdD86IHN0cmluZyk6IHN0cmluZyB7XG4gIGZtdCA9IGZtdCB8fCAnbW0nO1xuICBjb25zdCBkdSA9IGRhdGVVdGlscztcbiAgcmV0dXJuIGR1LmZvcm1hdChkdS5hZGREYXlzKGR1LnN0YXJ0T2ZJU09XZWVrKGRhdGUpLCAzKSwgZm10KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldENvb3JkaW5hdGUoc291cmNlOiBhbnksIHpvb20/OiBudW1iZXIpOiBbbnVtYmVyLCBudW1iZXIsIG51bWJlcl0ge1xuICB6b29tID0gem9vbSB8fCA2O1xuICBpZiAoc291cmNlID09IG51bGwpIHtcbiAgICByZXR1cm4gWzUxLjUwNSwgLTAuMDksIHpvb21dO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBbc291cmNlWzBdLCBzb3VyY2VbMV0sIHpvb21dO1xuICB9XG59XG5cbi8qKlxuICogUmV0dXJucyBhbiBhcnJheSBjb250YWluaW5nIGFsbCB0aGUgdmFsdWVzIHRoYXQgdGhlIHNwZWNpZmllZCBmaWVsZCB0YWtlcyBpbiB0aGUgZm9ybXMuXG4gKiBUaGUgdmFsdWVzIGFyZSBjb252ZXJ0ZWQgdG8gc3RyaW5ncy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIEFMTF9WQUxVRVNfT0YoZm9ybXM6IE1haW5Gb3JtW10sIGZpZWxkOiBzdHJpbmcsIGZpbHRlcjogRnVuY3xzdHJpbmcgPSAndHJ1ZScpOiBzdHJpbmdbXSB7XG4gIGZvcm1zID0gKGZvcm1zIHx8IFtdKS5maWx0ZXIoZiA9PiBmICE9IG51bGwpO1xuICBpZiAodHlwZW9mKGZpbHRlcikgPT09ICdzdHJpbmcnKSB7XG4gICAgZmlsdGVyID0gY3JlYXRlRnVuY3Rpb24oZmlsdGVyKTtcbiAgfVxuICBsZXQgdmFsdWVzOiBzdHJpbmdbXSA9IFtdO1xuICBmb3IgKGNvbnN0IGZvcm0gb2YgZm9ybXMpIHtcbiAgICBpZiAoZm9ybVtmaWVsZF0gIT0gbnVsbCAmJiBmaWx0ZXIoZm9ybSkpIHtcbiAgICAgIHZhbHVlcy5wdXNoKFN0cmluZyhmb3JtW2ZpZWxkXSkpO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IHJlcCBvZiBhbGxSZXBzKGZvcm0pKSB7XG4gICAgICBpZiAocmVwW2ZpZWxkXSAhPSBudWxsICYmIGZpbHRlcih7Li4uZm9ybSwgLi4ucmVwfSkpIHtcbiAgICAgICAgdmFsdWVzLnB1c2goU3RyaW5nKHJlcFtmaWVsZF0pKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIFsuLi5uZXcgU2V0KHZhbHVlcyldO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcGxhaW5BcnJheShwYXJhbXM6IGFueVtdKTogYW55W10ge1xuICBjb25zdCByZXM6IGFueVtdID0gW107XG4gIGZvciAoY29uc3QgcGFyYW0gb2YgcGFyYW1zKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkocGFyYW0pKSB7XG4gICAgICByZXMucHVzaCguLi5wYXJhbSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlcy5wdXNoKHBhcmFtKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBudW1iZXIgb2YgZm9ybXMgZm9yIHdoaWNoIGZpbHRlciBldmFsdWF0ZXMgdG8gdHJ1ZSxcbiAqIGZvciB0aGUgZm9ybSBpdHNlbGYgb3IgZm9yIGFueSBvZiBpdHMgcmVwZXRpdGlvbnMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBDT1VOVF9GT1JNUyhmb3JtczogTWFpbkZvcm1bXSwgZmlsdGVyOiBGdW5jfHN0cmluZyA9ICd0cnVlJyk6IG51bWJlciB7XG4gIGZvcm1zID0gKGZvcm1zIHx8IFtdKS5maWx0ZXIoZiA9PiBmICE9IG51bGwpO1xuICBpZiAoZmlsdGVyID09PSAndHJ1ZScpIHtcbiAgICByZXR1cm4gZm9ybXMubGVuZ3RoO1xuICB9XG4gIGlmICh0eXBlb2YoZmlsdGVyKSA9PT0gJ3N0cmluZycpIHtcbiAgICBmaWx0ZXIgPSBjcmVhdGVGdW5jdGlvbihmaWx0ZXIpO1xuICB9XG4gIGxldCBjb3VudCA9IDA7XG4gIGZvciAoY29uc3QgZm9ybSBvZiBmb3Jtcykge1xuICAgIGlmIChmaWx0ZXIoZm9ybSkpIHtcbiAgICAgIGNvdW50Kys7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgZm9yIChjb25zdCByZXAgb2YgYWxsUmVwcyhmb3JtKSkge1xuICAgICAgaWYgKGZpbHRlcih7Li4uZm9ybSwgLi4ucmVwfSkpIHtcbiAgICAgICAgY291bnQrKztcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBjb3VudDtcbn1cblxuLyoqXG4gKiBDb3VudHMgdGhlIGZvcm1zIGFuZCBhbGwgb2YgdGhlaXIgcmVwZXRpdGlvbnMgZm9yIHdoaWNoIGZpbHRlciBldmFsdWF0ZXMgdG8gdHJ1ZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIENPVU5UX1JFUFMoZm9ybXM6IE1haW5Gb3JtW10sIGZpbHRlcjogRnVuY3xzdHJpbmcgPSAndHJ1ZScpOiBudW1iZXIge1xuICBmb3JtcyA9IChmb3JtcyB8fCBbXSkuZmlsdGVyKGYgPT4gZiAhPSBudWxsKTtcbiAgaWYgKHR5cGVvZihmaWx0ZXIpID09PSAnc3RyaW5nJykge1xuICAgIGZpbHRlciA9IGNyZWF0ZUZ1bmN0aW9uKGZpbHRlcik7XG4gIH1cbiAgbGV0IGNvdW50ID0gMDtcbiAgZm9yIChjb25zdCBmb3JtIG9mIGZvcm1zKSB7XG4gICAgaWYgKGZpbHRlcihmb3JtKSkge1xuICAgICAgY291bnQrKztcbiAgICB9XG4gICAgZm9yIChjb25zdCByZXAgb2YgYWxsUmVwcyhmb3JtKSkge1xuICAgICAgaWYgKGZpbHRlcih7Li4uZm9ybSwgLi4ucmVwfSkpIHtcbiAgICAgICAgY291bnQrKztcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIGNvdW50O1xufVxuXG4vKipcbiAqIERlcHJlY2F0ZWQuIFVzZSBMRU4oQUxMX1ZBTFVFU19PRilcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIENPVU5UX0ZPUk1TX1VOSVFVRShmb3JtczogTWFpbkZvcm1bXSwgZmllbGQ6IHN0cmluZywgZmlsdGVyOiBGdW5jfHN0cmluZyA9ICd0cnVlJyk6IG51bWJlciB7XG4gIHJldHVybiBBTExfVkFMVUVTX09GKGZvcm1zLCBmaWVsZCwgZmlsdGVyKS5sZW5ndGg7XG59XG5cbmZ1bmN0aW9uIGdldE51bWVyaWNWYWx1ZXMoZm9ybXM6IChNYWluRm9ybSB8IEZvcm0pW10sIGZpZWxkOiBzdHJpbmcsIGZpbHRlcjogRnVuY3xzdHJpbmcgPSAndHJ1ZScpOiBudW1iZXJbXSB7XG4gIGZvcm1zID0gKGZvcm1zIHx8IFtdKS5maWx0ZXIoZiA9PiBmICE9IG51bGwpO1xuICBpZiAodHlwZW9mKGZpbHRlcikgPT09ICdzdHJpbmcnKSB7XG4gICAgZmlsdGVyID0gY3JlYXRlRnVuY3Rpb24oZmlsdGVyKTtcbiAgfVxuICBsZXQgdmFsdWVzOiBudW1iZXJbXSA9IFtdO1xuICBmb3IgKGNvbnN0IGZvcm0gb2YgZm9ybXMpIHtcbiAgICBjb25zdCB2YWwgPSBmb3JtW2ZpZWxkXTtcbiAgICBpZiAodmFsICE9IG51bGwgJiYgIWlzTmFOKE51bWJlcih2YWwpKSAmJiBmaWx0ZXIoZm9ybSkpIHtcbiAgICAgIHZhbHVlcy5wdXNoKE51bWJlcih2YWwpKTtcbiAgICB9XG4gICAgZm9yIChjb25zdCByZXAgb2YgYWxsUmVwcyhmb3JtKSkge1xuICAgICAgY29uc3QgdmFsID0gcmVwW2ZpZWxkXTtcbiAgICAgIGlmICh2YWwgIT0gbnVsbCAmJiAhaXNOYU4oTnVtYmVyKHZhbCkpICYmIGZpbHRlcih7Li4uZm9ybSwgLi4ucmVwfSkpIHtcbiAgICAgICAgdmFsdWVzLnB1c2goTnVtYmVyKHZhbCkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gdmFsdWVzO1xufVxuXG4vKipcbiAqIEFnZ3JlZ2F0ZXMgYW5kIHN1bXMgdGhlIHZhbHVlcyBvZiB0aGUgc3BlY2lmaWVkIGZpZWxkLlxuICogQW4gb3B0aW9uYWwgZXhwcmVzc2lvbiBjYW4gYmUgYWRkZWQgdG8gZmlsdGVyIHdoaWNoIGZvcm1zIHRvIHRha2UgZm9yIHRoZSBzdW0uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBTVU0oZm9ybXM6IChNYWluRm9ybSB8IEZvcm0pW10sIGZpZWxkOiBzdHJpbmcsIGZpbHRlcjogRnVuY3xzdHJpbmcgPSAndHJ1ZScpOiBudW1iZXIge1xuICBjb25zdCB2YWx1ZXMgPSBnZXROdW1lcmljVmFsdWVzKGZvcm1zLCBmaWVsZCwgZmlsdGVyKTtcbiAgbGV0IHN1bSA9IDA7XG4gIGZvciAoY29uc3QgdmFsIG9mIHZhbHVlcykge1xuICAgIHN1bSArPSB2YWw7XG4gIH1cbiAgcmV0dXJuIHRydW5jYXRlMTAoc3VtKTtcbn1cblxuLyoqXG4gKiBDb21wdXRlcyB0aGUgbWVhbiBvZiB0aGUgdmFsdWVzIG9mIHRoZSBzcGVjaWZpZWQgZmllbGQuXG4gKiBBbiBvcHRpb25hbCBleHByZXNzaW9uIGNhbiBiZSBhZGRlZCB0byBmaWx0ZXIgd2hpY2ggZm9ybXMgdG8gdGFrZSBmb3IgdGhlIHN1bS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIE1FQU4oZm9ybXM6IChGb3JtIHwgTWFpbkZvcm0pW10sIGZpZWxkOiBzdHJpbmcsIGZpbHRlcjogRnVuY3xzdHJpbmcgPSAndHJ1ZScpOiBudW1iZXIge1xuICBjb25zdCB2YWx1ZXMgPSBnZXROdW1lcmljVmFsdWVzKGZvcm1zLCBmaWVsZCwgZmlsdGVyKTtcbiAgbGV0IHN1bSA9IDA7XG4gIGZvciAoY29uc3QgdmFsIG9mIHZhbHVlcykge1xuICAgIHN1bSArPSB2YWw7XG4gIH1cbiAgcmV0dXJuIHRydW5jYXRlMTAoc3VtIC8gdmFsdWVzLmxlbmd0aCk7XG59XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgJSBiZXR3ZWVuIHR3byBtZW1iZXJzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gUEVSQ0VOVCh2YWx1ZTE6IG51bWJlciwgdmFsdWUyOiBudW1iZXIpOiBzdHJpbmcge1xuICBjb25zdCByZXMgPSAoK3ZhbHVlMSAqIDEwMCkgLyArdmFsdWUyO1xuICByZXR1cm4gTnVtYmVyLmlzRmluaXRlKHJlcykgPyBNYXRoLnJvdW5kKHJlcykrJyUnIDogJ2luZmluaXRlJztcbn1cblxuLyoqXG4gKiBFdmFsdWF0ZXMgdGhlIGV4cHJlc3Npb24gaW4gdGhlIGZpcnN0IGZvcm0gYnkgZGF0ZS5cbiAqL1xuIGV4cG9ydCBmdW5jdGlvbiBGSVJTVChmb3JtczogKEZvcm0gfCBNYWluRm9ybSlbXSwgZXhwcmVzc2lvbjogRnVuY3xzdHJpbmcsIGRhdGUgPSAnY3JlYXRlZF9hdCcpOiBhbnkge1xuICBpZiAodHlwZW9mKGV4cHJlc3Npb24pID09PSAnc3RyaW5nJykge1xuICAgIGV4cHJlc3Npb24gPSBjcmVhdGVGdW5jdGlvbihleHByZXNzaW9uKTtcbiAgfVxuICBmb3JtcyA9IChmb3JtcyB8fCBbXSkuZmlsdGVyKGYgPT4gZiAhPSBudWxsICYmIGZbZGF0ZV0gIT0gbnVsbCk7XG4gIGlmIChmb3Jtcy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG4gIGxldCBmb3JtID0gZm9ybXNbMF07XG4gIGxldCBtaW5EYXRlID0gZm9ybVtkYXRlXSBhcyBzdHJpbmc7XG4gIGZvciAobGV0IGkgPSAxOyBpIDwgZm9ybXMubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoZm9ybXNbaV1bZGF0ZV0gYXMgc3RyaW5nIDwgbWluRGF0ZSkge1xuICAgICAgZm9ybSA9IGZvcm1zW2ldO1xuICAgICAgbWluRGF0ZSA9IGZvcm1bZGF0ZV0gYXMgc3RyaW5nO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZXhwcmVzc2lvbihmb3JtKTtcbn1cblxuLyoqXG4gKiBFdmFsdWF0ZXMgdGhlIGV4cHJlc3Npb24gaW4gdGhlIGxhc3QgZm9ybSBieSBkYXRlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gTEFTVChmb3JtczogKEZvcm0gfCBNYWluRm9ybSlbXSwgZXhwcmVzc2lvbjogRnVuY3xzdHJpbmcsIGRhdGUgPSAnY3JlYXRlZF9hdCcpOiBhbnkge1xuICBpZiAodHlwZW9mKGV4cHJlc3Npb24pID09PSAnc3RyaW5nJykge1xuICAgIGV4cHJlc3Npb24gPSBjcmVhdGVGdW5jdGlvbihleHByZXNzaW9uKTtcbiAgfVxuICBmb3JtcyA9IChmb3JtcyB8fCBbXSkuZmlsdGVyKGYgPT4gZiAhPSBudWxsICYmIGZbZGF0ZV0gIT0gbnVsbCk7XG4gIGlmIChmb3Jtcy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG4gIGxldCBmb3JtID0gZm9ybXNbZm9ybXMubGVuZ3RoIC0gMV07XG4gIGxldCBtYXhEYXRlID0gZm9ybVtkYXRlXSBhcyBzdHJpbmc7XG4gIGZvciAobGV0IGkgPSBmb3Jtcy5sZW5ndGggLSAyOyBpID49IDA7IGktLSkge1xuICAgIGlmIChmb3Jtc1tpXVtkYXRlXSBhcyBzdHJpbmcgPiBtYXhEYXRlKSB7XG4gICAgICBmb3JtID0gZm9ybXNbaV07XG4gICAgICBtYXhEYXRlID0gZm9ybVtkYXRlXSBhcyBzdHJpbmc7XG4gICAgfVxuICB9XG4gIHJldHVybiBleHByZXNzaW9uKGZvcm0pO1xufVxuXG4vKipcbiAqIENvbXB1dGVzIHRoZSBtYXggdmFsdWUgb2YgdGhlIGZpZWxkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gTUFYKGZvcm1zOiAoRm9ybSB8IE1haW5Gb3JtKVtdLCBmaWVsZDogc3RyaW5nLCBmaWx0ZXI6IEZ1bmN8c3RyaW5nID0gJ3RydWUnKTogbnVtYmVyIHtcbiAgY29uc3QgdmFsdWVzID0gZ2V0TnVtZXJpY1ZhbHVlcyhmb3JtcywgZmllbGQsIGZpbHRlcik7XG4gIGxldCBtYXggPSAtSW5maW5pdHk7XG4gIGZvciAoY29uc3QgdmFsIG9mIHZhbHVlcykge1xuICAgIGlmICh2YWwgPiBtYXgpIHtcbiAgICAgIG1heCA9IHZhbDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG1heDtcbn1cblxuLyoqXG4gKiBDb21wdXRlcyB0aGUgbWVkaWFuIHZhbHVlIG9mIHRoZSBmaWVsZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIE1FRElBTihmb3JtczogKEZvcm0gfCBNYWluRm9ybSlbXSwgZmllbGQ6IHN0cmluZywgZmlsdGVyOiBGdW5jfHN0cmluZyA9ICd0cnVlJyk6IG51bWJlciB7XG4gIGNvbnN0IHZhbHVlcyA9IGdldE51bWVyaWNWYWx1ZXMoZm9ybXMsIGZpZWxkLCBmaWx0ZXIpLnNvcnQoKTtcbiAgaWYgKHZhbHVlcy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gTmFOO1xuICB9XG4gIHJldHVybiB2YWx1ZXNbTWF0aC5mbG9vcih2YWx1ZXMubGVuZ3RoIC8gMildO1xufVxuXG4vKipcbiAqIENvbXB1dGVzIHRoZSBtb2RlIHZhbHVlIG9mIHRoZSBmaWVsZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIE1PREUoZm9ybXM6IChGb3JtIHwgTWFpbkZvcm0pW10sIGZpZWxkOiBzdHJpbmcsIGZpbHRlcjogRnVuY3xzdHJpbmcgPSAndHJ1ZScpOiBudW1iZXIge1xuICBjb25zdCB2YWx1ZXMgPSBnZXROdW1lcmljVmFsdWVzKGZvcm1zLCBmaWVsZCwgZmlsdGVyKTtcbiAgY29uc3QgY291bnRlcnM6IHtbdmFsOiBudW1iZXJdOiBudW1iZXJ9ID0ge307XG4gIGZvciAoY29uc3QgdmFsIG9mIHZhbHVlcykge1xuICAgIGlmIChjb3VudGVyc1t2YWxdID09IG51bGwpIHtcbiAgICAgIGNvdW50ZXJzW3ZhbF0gPSAxO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb3VudGVyc1t2YWxdKys7XG4gICAgfVxuICB9XG4gIGxldCBtYXhDb3VudCA9IDA7XG4gIGZvciAoY29uc3QgdmFsIGluIGNvdW50ZXJzKSB7XG4gICAgaWYgKGNvdW50ZXJzW3ZhbF0gPiBtYXhDb3VudCkge1xuICAgICAgbWF4Q291bnQgPSBjb3VudGVyc1t2YWxdO1xuICAgIH1cbiAgfVxuICBmb3IgKGNvbnN0IHZhbCBpbiBjb3VudGVycykge1xuICAgIGlmIChjb3VudGVyc1t2YWxdID09PSBtYXhDb3VudCkge1xuICAgICAgcmV0dXJuIE51bWJlcih2YWwpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gTmFOO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYnVpbGREYXRhc2V0KFxuICBkYXRhc2V0OiAoc3RyaW5nIHwgbnVtYmVyIHwgc3RyaW5nW10gfCBudW1iZXJbXSlbXSxcbiAgY29sc3BhbnM6IG51bWJlcltdLFxuKTogQWpmVGFibGVDZWxsW11bXSB7XG4gIHJldHVybiBidWlsZEFsaWduZWREYXRhc2V0KGRhdGFzZXQsIGNvbHNwYW5zLCBbXSk7XG59XG5cbi8qKlxuICogQnVpbGQgYSBkYXRhc2V0IGZvciBhamYgZHluYW1pYyB0YWJsZVxuICogQHBhcmFtIGRhdGFzZXQgdGhlIGRhdGFzZXQgZm9yIHRoZSB0YWJsZVxuICogQHBhcmFtIGNvbHNwYW5zIGNvbHNwYW4gZm9yIGVhY2ggdmFsdWUgaW4gdGhlIGRhdGFzZXRcbiAqIEBwYXJhbSB0ZXh0QWxpZ24gYWxpZ25tZW50IGZvciBlYWNoIHZhbHVlIGluIHRoZSBkYXRhc2V0XG4gKiBAcmV0dXJucyBBbiBBamZUYWJsZUNlbGwgbGlzdFxuICovXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRBbGlnbmVkRGF0YXNldChcbiAgZGF0YXNldDogKHN0cmluZyB8IG51bWJlciB8IHN0cmluZ1tdIHwgbnVtYmVyW10pW10sXG4gIGNvbHNwYW5zOiBudW1iZXJbXSxcbiAgdGV4dEFsaWduOiBzdHJpbmdbXSxcbik6IEFqZlRhYmxlQ2VsbFtdW10ge1xuICBjb25zdCByZXM6IEFqZlRhYmxlQ2VsbFtdW10gPSBbXTtcbiAgY29uc3Qgbm9ybWFsaXplRGF0YXNldDogYW55W11bXSA9IFtdO1xuICBkYXRhc2V0LmZvckVhY2goKHJvdzogYW55LCBpbmRleFJvdzogbnVtYmVyKSA9PiB7XG4gICAgcm93ID0gQXJyYXkuaXNBcnJheShyb3cpID8gcm93IDogW3Jvd107XG4gICAgbm9ybWFsaXplRGF0YXNldFtpbmRleFJvdyAlIGNvbHNwYW5zLmxlbmd0aF0gPVxuICAgICAgbm9ybWFsaXplRGF0YXNldFtpbmRleFJvdyAlIGNvbHNwYW5zLmxlbmd0aF0gIT0gbnVsbFxuICAgICAgICA/IFsuLi5ub3JtYWxpemVEYXRhc2V0W2luZGV4Um93ICUgY29sc3BhbnMubGVuZ3RoXSwgLi4ucm93XVxuICAgICAgICA6IFsuLi5yb3ddO1xuICB9KTtcbiAgY29uc3QgdHJhbnNwb3NlID0gbm9ybWFsaXplRGF0YXNldFswXS5tYXAoKF86IGFueSwgY29sSW5kZXg6IG51bWJlcikgPT5cbiAgICBub3JtYWxpemVEYXRhc2V0Lm1hcCgocm93OiBhbnkpID0+IHJvd1tjb2xJbmRleF0pLFxuICApO1xuICB0cmFuc3Bvc2UuZm9yRWFjaCgoZGF0YTogYW55W10sIGluZGV4OiBudW1iZXIpID0+IHtcbiAgICBjb25zdCByb3c6IEFqZlRhYmxlQ2VsbFtdID0gW107XG4gICAgZGF0YS5mb3JFYWNoKChjZWxsVmFsdWU6IHN0cmluZyB8IG51bWJlciwgY2VsbEluZGV4OiBudW1iZXIpID0+IHtcbiAgICAgIHJvdy5wdXNoKHtcbiAgICAgICAgdmFsdWU6IGNlbGxWYWx1ZSxcbiAgICAgICAgY29sc3BhbjogY29sc3BhbnNbY2VsbEluZGV4XSxcbiAgICAgICAgcm93c3BhbjogMSxcbiAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICB0ZXh0QWxpZ246IHRleHRBbGlnbltjZWxsSW5kZXhdID8gdGV4dEFsaWduW2NlbGxJbmRleF0gOiAnY2VudGVyJyxcbiAgICAgICAgICBjb2xvcjogJ2JsYWNrJyxcbiAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IGluZGV4ICUgMiA9PT0gMCA/ICd3aGl0ZScgOiAnI2RkZCcsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9KTtcbiAgICByZXMucHVzaChyb3cpO1xuICB9KTtcbiAgcmV0dXJuIHJlcztcbn1cblxuLyoqXG4gKiBCdWlsZCBhIGRhdGFzZXQgYmFzZWQgb24gYSBsaXN0IG9mIEZvcm1zLCBmb3IgYWpmIGR5bmFtaWMgdGFibGVcbiAqIEBwYXJhbSBkYXRhc2V0IHRoZSBkYXRhc2V0IGZvciB0aGUgdGFibGVcbiAqIEBwYXJhbSBmaWVsZHMgdGhlIGxpc3Qgb2YgZmllbGRzIG5hbWUgZm9yIGVhY2ggcm93XG4gKiBAcGFyYW0gcm93TGluayB0aGUgaHR0cCBsaW5rIGZvciB0aGUgcm93LCB3aXRoIHRoZSBmb3JtIGZpZWxkIG5hbWUgd2l0aCB0aGUgbGluayB2YWx1ZSBhbmQgdGhlIGNvbHVtbiBwb3NpdGlvbiBmb3IgdGhlIGxpbmsuXG4gKiBpZTogeydsaW5rJzogJ2hvbWVfbGluaycsICdwb3NpdGlvbic6IDB9XG4gKiBAcGFyYW0gYmFja2dyb3VuZENvbG9yQSB0aGUgZmlyc3QgYmFja2dyb3VkIGNvbG9yXG4gKiBAcGFyYW0gYmFja2dyb3VuZENvbG9yQiB0aGUgc2Vjb25kIGJhY2tncm91ZCBjb2xvclxuICogQHJldHVybnMgQW4gQWpmVGFibGVDZWxsIGxpc3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkRm9ybURhdGFzZXQoXG4gIGRhdGFzZXQ6IE1haW5Gb3JtW10sXG4gIGZpZWxkczogc3RyaW5nW10sXG4gIHJvd0xpbms6IHtsaW5rOiBzdHJpbmc7IHBvc2l0aW9uOiBudW1iZXJ9IHwgbnVsbCxcbiAgX2JhY2tncm91bmRDb2xvckE/OiBzdHJpbmcsXG4gIF9iYWNrZ3JvdW5kQ29sb3JCPzogc3RyaW5nLFxuKTogQWpmVGFibGVDZWxsW11bXSB7XG4gIHJldHVybiBidWlsZEFsaWduZWRGb3JtRGF0YXNldChkYXRhc2V0LCBmaWVsZHMsIFtdLCBbXSwgcm93TGluaywgW10sIFtdKTtcbn1cblxuLyoqXG4gKiBCdWlsZCBhIGRhdGFzZXQgYmFzZWQgb24gYSBsaXN0IG9mIEZvcm1zLCBmb3IgYWpmIGR5bmFtaWMgdGFibGVcbiAqIEBwYXJhbSBkYXRhc2V0IHRoZSBkYXRhc2V0IGZvciB0aGUgdGFibGVcbiAqIEBwYXJhbSBmaWVsZHMgdGhlIGxpc3Qgb2YgZmllbGRzIG5hbWUgZm9yIGVhY2ggcm93XG4gKiBAcGFyYW0gY29sc3BhbnMgY29sc3BhbiBmb3IgZWFjaCB2YWx1ZSBpbiB0aGUgZGF0YXNldFxuICogQHBhcmFtIHRleHRBbGlnbiBhbGlnbm1lbnQgZm9yIGVhY2ggdmFsdWUgaW4gdGhlIGRhdGFzZXRcbiAqIEBwYXJhbSByb3dMaW5rIHRoZSBodHRwIGxpbmsgZm9yIHRoZSByb3csIHdpdGggdGhlIGZvcm0gZmllbGQgbmFtZSB3aXRoIHRoZSBsaW5rIHZhbHVlIGFuZCB0aGUgY29sdW1uIHBvc2l0aW9uIGZvciB0aGUgbGluay5cbiAqIGllOiB7J2xpbmsnOiAnaG9tZV9saW5rJywgJ3Bvc2l0aW9uJzogMH1cbiAqIEByZXR1cm5zIEFuIEFqZlRhYmxlQ2VsbCBsaXN0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBidWlsZEFsaWduZWRGb3JtRGF0YXNldChcbiAgZGF0YXNldDogTWFpbkZvcm1bXSxcbiAgZmllbGRzOiBzdHJpbmdbXSxcbiAgY29sc3BhbnM6IG51bWJlcltdLFxuICB0ZXh0QWxpZ246IHN0cmluZ1tdLFxuICByb3dMaW5rOiB7bGluazogc3RyaW5nOyBwb3NpdGlvbjogbnVtYmVyfSB8IG51bGwsXG4gIGRpYWxvZ0ZpZWxkczogc3RyaW5nW10sXG4gIGRpYWxvZ0xhYmVsRmllbGRzOiBzdHJpbmdbXSxcbik6IEFqZlRhYmxlQ2VsbFtdW10ge1xuICBjb25zdCByZXM6IEFqZlRhYmxlQ2VsbFtdW10gPSBbXTtcblxuICBjb25zdCBiYWNrZ3JvdW5kQ29sb3JBID0gJ3doaXRlJztcbiAgY29uc3QgYmFja2dyb3VuZENvbG9yQiA9ICcjZGRkJztcbiAgaWYgKGRhdGFzZXQpIHtcbiAgICBsZXQgaW5kZXg6IG51bWJlciA9IDA7XG4gICAgZGF0YXNldC5mb3JFYWNoKChkYXRhOiBNYWluRm9ybSkgPT4ge1xuICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgaW5kZXgrKztcbiAgICAgICAgY29uc3Qgcm93OiBBamZUYWJsZUNlbGxbXSA9IFtdO1xuICAgICAgICBmaWVsZHMuZm9yRWFjaCgoZmllbGQ6IHN0cmluZywgY2VsbElkeDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgbGV0IGNlbGxWYWx1ZSA9IGRhdGFbZmllbGRdIHx8ICcnO1xuICAgICAgICAgIGlmIChyb3dMaW5rICE9IG51bGwgJiYgY2VsbElkeCA9PT0gcm93TGlua1sncG9zaXRpb24nXSkge1xuICAgICAgICAgICAgY2VsbFZhbHVlID0gYDxhIGhyZWY9JyR7ZGF0YVtyb3dMaW5rWydsaW5rJ11dfSc+ICR7ZGF0YVtmaWVsZF19PC9hPmA7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJvdy5wdXNoKHtcbiAgICAgICAgICAgIHZhbHVlOiBjZWxsVmFsdWUsXG4gICAgICAgICAgICBjb2xzcGFuOiBjb2xzcGFuc1tjZWxsSWR4XSAmJiBjb2xzcGFuc1tjZWxsSWR4XSA+IDAgPyBjb2xzcGFuc1tjZWxsSWR4XSA6IDEsXG4gICAgICAgICAgICByb3dzcGFuOiAxLFxuICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgdGV4dEFsaWduOiB0ZXh0QWxpZ25bY2VsbElkeF0gPyB0ZXh0QWxpZ25bY2VsbElkeF0gOiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgY29sb3I6ICdibGFjaycsXG4gICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogaW5kZXggJSAyID09PSAwID8gYmFja2dyb3VuZENvbG9yQSA6IGJhY2tncm91bmRDb2xvckIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoZGlhbG9nRmllbGRzICYmIGRpYWxvZ0ZpZWxkcy5sZW5ndGgpIHtcbiAgICAgICAgICBsZXQgZGlhbG9nSHRtbDogc3RyaW5nW10gPSBbXTtcbiAgICAgICAgICBkaWFsb2dGaWVsZHMuZm9yRWFjaCgoZmllbGQ6IHN0cmluZywgY2VsbElkeDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICBsZXQgZmllbGRWYWx1ZSA9ICdcIlwiJztcbiAgICAgICAgICAgIGlmIChkYXRhW2ZpZWxkXSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgIGZpZWxkVmFsdWUgPVxuICAgICAgICAgICAgICAgIFwiPHAgY2xhc3M9J2RpYWxvZy1pdGVtJz48Yj5cIiArXG4gICAgICAgICAgICAgICAgZGlhbG9nTGFiZWxGaWVsZHNbY2VsbElkeF0ucmVwbGFjZSgvWydcXFwiXSsvZywgJycpICtcbiAgICAgICAgICAgICAgICAnPC9iPiA8c3Bhbj4nICtcbiAgICAgICAgICAgICAgICBkYXRhW2ZpZWxkXSArXG4gICAgICAgICAgICAgICAgJzwvc3Bhbj48L3A+JztcbiAgICAgICAgICAgICAgZGlhbG9nSHRtbC5wdXNoKGZpZWxkVmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgcm93LnB1c2goe1xuICAgICAgICAgICAgdmFsdWU6XG4gICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwicmVhZF9tb3JlX2NlbGxcIj48cCBjbGFzcz1cInJlYWRfbW9yZV90ZXh0XCI+UmVhZCBtb3JlPC9wPjxiIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIj5hZGRfY2lyY2xlX291dGxpbmU8L2I+PC9kaXY+JyxcbiAgICAgICAgICAgIGRpYWxvZ0h0bWw6IGRpYWxvZ0h0bWwuam9pbignICcpLFxuICAgICAgICAgICAgY29sc3BhbjogMSxcbiAgICAgICAgICAgIHJvd3NwYW46IDEsXG4gICAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxuICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJyxcbiAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBpbmRleCAlIDIgPT09IDAgPyBiYWNrZ3JvdW5kQ29sb3JBIDogYmFja2dyb3VuZENvbG9yQixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmVzLnB1c2gocm93KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICByZXR1cm4gcmVzO1xufVxuXG4vKipcbiAqIGNyZWF0ZSBhIHdpZGdldCBkYXRhc2V0IGludG8gYSBjb250ZW50IGxpc3QsIGJhc2VkIG9uIGEgbGlzdCBvZiBGb3JtcywgZm9yIHBhZ2luYXRlZCB3aWRnZXRcbiAqXG4gKiBAcGFyYW0gZGF0YXNldCB0aGUgZGF0YXNldCBmb3IgdGhlIHdpZGdldHNcbiAqIEBwYXJhbSBmaWVsZHMgdGhlIGxpc3Qgb2YgZmllbGRzIG5hbWUgZm9yIGVhY2ggcm93XG4gKiBAcGFyYW0gcm93TGluayB0aGUgaHR0cCBsaW5rIGZvciB0aGUgcm93LCB3aXRoIHRoZSBmb3JtIGZpZWxkIG5hbWUgd2l0aCB0aGUgbGluayB2YWx1ZSBhbmQgdGhlIGNvbHVtbiBwb3NpdGlvbiBmb3IgdGhlIGxpbmsuXG4gKiBpZTogeydsaW5rJzogJ2hvbWVfbGluaycsICdwb3NpdGlvbic6IDB9XG4gKiBAcGFyYW0gY2VsbFN0eWxlcyBjc3Mgc3R5bGVzIGZvciBjZWxsc1xuICogQHBhcmFtIHJvd1N0eWxlIGNzcyBzdHlsZXMgZm9yIHJvd3NcbiAqIEBwYXJhbSBwZXJjV2lkdGggYW4gYXJyYXkgd2l0aCB0aGUgc2FtZSBsZW5ndGggb2YgZmllbGRzIHBhcmFtLCB3aXRoIHRoZSB3aWR0aCBmb3IgdGhlIGNvbHVtbnMuXG4gKiBpZTogWycxMCUnLCAnMzAlJywgJzEwJScsICcyNSUnLCAnMTUlJywgJzEwJSddXG4gKiBAcGFyYW0gYmFja2dyb3VuZENvbG9yQSB0aGUgZmlyc3QgYmFja2dyb3VkIGNvbG9yXG4gKiBAcGFyYW0gYmFja2dyb3VuZENvbG9yQiB0aGUgc2Vjb25kIGJhY2tncm91ZCBjb2xvclxuICogQHJldHVybnMgQW4gQWpmVGFibGVXaWRnZXQgbGlzdFxuICovXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRXaWRnZXREYXRhc2V0KFxuICBkYXRhc2V0OiBNYWluRm9ybVtdLFxuICBmaWVsZHM6IHN0cmluZ1tdLFxuICByb3dMaW5rOiB7bGluazogc3RyaW5nOyBwb3NpdGlvbjogbnVtYmVyfSB8IG51bGwsXG4gIGNlbGxTdHlsZXM6IHtba2V5OiBzdHJpbmddOiBhbnl9IHwgbnVsbCxcbiAgcm93U3R5bGU6IHtba2V5OiBzdHJpbmddOiBhbnl9IHwgbnVsbCxcbiAgcGVyY1dpZHRoOiBzdHJpbmdbXSxcbiAgYmFja2dyb3VuZENvbG9yQT86IHN0cmluZyxcbiAgYmFja2dyb3VuZENvbG9yQj86IHN0cmluZyxcbik6IGFueVtdIHtcbiAgY29uc3QgcmVzOiB7W2tleTogc3RyaW5nXTogYW55fVtdID0gW107XG4gIGlmIChiYWNrZ3JvdW5kQ29sb3JBID09IG51bGwpIHtcbiAgICBiYWNrZ3JvdW5kQ29sb3JBID0gJ3doaXRlJztcbiAgfVxuICBpZiAoYmFja2dyb3VuZENvbG9yQiA9PSBudWxsKSB7XG4gICAgYmFja2dyb3VuZENvbG9yQiA9ICcjZGRkJztcbiAgfVxuICBpZiAocm93U3R5bGUgPT0gbnVsbCkge1xuICAgIHJvd1N0eWxlID0ge1xuICAgICAgJ3RleHQtYWxpZ24nOiAncmlnaHQnLFxuICAgICAgJ21hcmdpbi1ib3R0b20nOiAwLFxuICAgICAgJ2JvcmRlci1jb2xsYXBzZSc6ICdjb2xsYXBzZScsXG4gICAgfTtcbiAgfVxuICBpZiAoY2VsbFN0eWxlcyA9PSBudWxsKSB7XG4gICAgY2VsbFN0eWxlcyA9IHtcbiAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXG4gICAgICBjb2xvcjogJ2JsYWNrJyxcbiAgICB9O1xuICB9XG4gIGlmIChwZXJjV2lkdGggPT0gbnVsbCB8fCBwZXJjV2lkdGgubGVuZ3RoICE9PSBmaWVsZHMubGVuZ3RoKSB7XG4gICAgY29uc3QgY2VsbFdpZHRoID0gMTAwIC8gZmllbGRzLmxlbmd0aCArICclJztcbiAgICBwZXJjV2lkdGggPSBbXTtcbiAgICBmaWVsZHMuZm9yRWFjaChfID0+IHBlcmNXaWR0aC5wdXNoKGNlbGxXaWR0aCkpO1xuICB9XG5cbiAgaWYgKGRhdGFzZXQpIHtcbiAgICBsZXQgaW5kZXg6IG51bWJlciA9IDA7XG4gICAgZGF0YXNldC5mb3JFYWNoKChkYXRhOiBNYWluRm9ybSkgPT4ge1xuICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgaW5kZXgrKztcbiAgICAgICAgLy8gUm93IGlzIGFuIEFqZlRhYmxlV2lkZ2V0XG4gICAgICAgIGNvbnN0IHJvdzoge1trZXk6IHN0cmluZ106IGFueX0gPSB7XG4gICAgICAgICAgc3R5bGVzOiB7XG4gICAgICAgICAgICAndGV4dC1hbGlnbic6ICdyaWdodCcsXG4gICAgICAgICAgICAnbWFyZ2luLWJvdHRvbSc6IDAsXG4gICAgICAgICAgICAnYm9yZGVyLWNvbGxhcHNlJzogJ2NvbGxhcHNlJyxcbiAgICAgICAgICAgIC4uLnJvd1N0eWxlLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgdmlzaWJpbGl0eToge2NvbmRpdGlvbjogJ3RydWUnfSxcbiAgICAgICAgICB3aWRnZXRUeXBlOiA1LFxuICAgICAgICAgIGRhdGFzZXQ6IFtbXV0gYXMgYW55W11bXSxcbiAgICAgICAgICBjZWxsU3R5bGVzOiB7J2JvcmRlci10b3AnOiAnMXB4IHNvbGlkIGdyZXknfSxcbiAgICAgICAgfTtcblxuICAgICAgICBmaWVsZHMuZm9yRWFjaCgoZmllbGQ6IHN0cmluZywgY2VsbElkeDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgbGV0IGZvcm11bGFDZWxsID0gJ1wiXCInO1xuICAgICAgICAgIGlmIChkYXRhW2ZpZWxkXSAhPSBudWxsKSB7XG4gICAgICAgICAgICBmb3JtdWxhQ2VsbCA9ICdcIicgKyBkYXRhW2ZpZWxkXSArICdcIic7XG4gICAgICAgICAgICBpZiAocm93TGluayAhPSBudWxsICYmIGNlbGxJZHggPT09IHJvd0xpbmtbJ3Bvc2l0aW9uJ10pIHtcbiAgICAgICAgICAgICAgZm9ybXVsYUNlbGwgPSBgXCI8YSBocmVmPScke2RhdGFbcm93TGlua1snbGluayddXX0nPiAke2RhdGFbZmllbGRdfTwvYT5cImA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcm93WydkYXRhc2V0J11bMF0ucHVzaCh7XG4gICAgICAgICAgICBsYWJlbDogJycsXG4gICAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxuICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJyxcbiAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBpbmRleCAlIDIgPT09IDAgPyBiYWNrZ3JvdW5kQ29sb3JBIDogYmFja2dyb3VuZENvbG9yQixcbiAgICAgICAgICAgICAgLi4uY2VsbFN0eWxlcyxcbiAgICAgICAgICAgICAgd2lkdGg6IHBlcmNXaWR0aFtjZWxsSWR4XSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmb3JtdWxhOiB7XG4gICAgICAgICAgICAgIGZvcm11bGE6IGZvcm11bGFDZWxsLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNvbHNwYW46IDEsXG4gICAgICAgICAgICByb3dzcGFuOiAxLFxuICAgICAgICAgICAgYWdncmVnYXRpb246IHtcbiAgICAgICAgICAgICAgYWdncmVnYXRpb246IDAsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgcmVzLnB1c2gocm93KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICByZXR1cm4gcmVzO1xufVxuXG4vKipcbiAqIGNyZWF0ZSBhIHdpZGdldCBkYXRhc2V0IGludG8gYSBjb250ZW50IGxpc3QsIGJhc2VkIG9uIGEgbGlzdCBvZiBGb3JtcywgZm9yIHBhZ2luYXRlZCB3aWRnZXQuXG4gKiBFYWNoIHJvdyBpcyBhIEFqZkRpYWxvZ1dpZGdldCBhbmQsIG9uIGNsaWNrLCBvcGVuIGEgZGlhbG9nLlxuICpcbiAqIEBwYXJhbSBkYXRhc2V0IHRoZSBkYXRhc2V0IGZvciB0aGUgd2lkZ2V0c1xuICogQHBhcmFtIGZpZWxkcyB0aGUgbGlzdCBvZiBmaWVsZHMgbmFtZSBmb3IgZWFjaCByb3dcbiAqIEBwYXJhbSBkaWFsb2dGaWVsZHMgdGhlIGxpc3Qgb2YgZmllbGRzIG5hbWUgdG8gc2hvdyBpbiB0aGUgZGlhbG9nXG4gKiBAcGFyYW0gZGlhbG9nTGFiZWxGaWVsZHMgdGhlIGxpc3Qgb2YgbGFiZWxzIGZvciBlYWNoIGRpYWxvZ0ZpZWxkc1xuICogQHBhcmFtIHJvd0xpbmsgdGhlIGh0dHAgbGluayBmb3IgdGhlIHJvdywgd2l0aCB0aGUgZm9ybSBmaWVsZCBuYW1lIHdpdGggdGhlIGxpbmsgdmFsdWUgYW5kIHRoZSBjb2x1bW4gcG9zaXRpb24gZm9yIHRoZSBsaW5rLlxuICogaWU6IHsnbGluayc6ICdob21lX2xpbmsnLCAncG9zaXRpb24nOiAwfVxuICogQHBhcmFtIGNlbGxTdHlsZXMgY3NzIHN0eWxlcyBmb3IgY2VsbHNcbiAqIEBwYXJhbSByb3dTdHlsZSBjc3Mgc3R5bGVzIGZvciByb3dzXG4gKiBAcGFyYW0gcGVyY1dpZHRoIGFuIGFycmF5IHdpdGggdGhlIHNhbWUgbGVuZ3RoIG9mIGZpZWxkcyBwYXJhbSwgd2l0aCB0aGUgd2lkdGggZm9yIHRoZSBjb2x1bW5zLlxuICogaWU6IFsnMTAlJywgJzMwJScsICcxMCUnLCAnMjUlJywgJzE1JScsICcxMCUnXVxuICogQHBhcmFtIGJhY2tncm91bmRDb2xvckEgdGhlIGZpcnN0IGJhY2tncm91ZCBjb2xvclxuICogQHBhcmFtIGJhY2tncm91bmRDb2xvckIgdGhlIHNlY29uZCBiYWNrZ3JvdWQgY29sb3JcbiAqIEByZXR1cm5zIEFuIEFqZkRpYWxvZ1dpZGdldCBsaXN0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBidWlsZFdpZGdldERhdGFzZXRXaXRoRGlhbG9nKFxuICBkYXRhc2V0OiBNYWluRm9ybVtdLFxuICBmaWVsZHM6IHN0cmluZ1tdLFxuICBkaWFsb2dGaWVsZHM6IHN0cmluZ1tdLFxuICBkaWFsb2dMYWJlbEZpZWxkczogc3RyaW5nW10sXG4gIGNlbGxTdHlsZXM6IHtba2V5OiBzdHJpbmddOiBhbnl9IHwgbnVsbCxcbiAgcm93U3R5bGU6IHtba2V5OiBzdHJpbmddOiBhbnl9IHwgbnVsbCxcbiAgcGVyY1dpZHRoOiBzdHJpbmdbXSxcbiAgYmFja2dyb3VuZENvbG9yQT86IHN0cmluZyxcbiAgYmFja2dyb3VuZENvbG9yQj86IHN0cmluZyxcbik6IGFueVtdIHtcbiAgY29uc3QgcmVzOiB7W2tleTogc3RyaW5nXTogYW55fVtdID0gW107XG4gIGlmIChiYWNrZ3JvdW5kQ29sb3JBID09IG51bGwpIHtcbiAgICBiYWNrZ3JvdW5kQ29sb3JBID0gJ3doaXRlJztcbiAgfVxuICBpZiAoYmFja2dyb3VuZENvbG9yQiA9PSBudWxsKSB7XG4gICAgYmFja2dyb3VuZENvbG9yQiA9ICcjZGRkJztcbiAgfVxuICBpZiAocm93U3R5bGUgPT0gbnVsbCkge1xuICAgIHJvd1N0eWxlID0ge1xuICAgICAgJ3RleHQtYWxpZ24nOiAncmlnaHQnLFxuICAgICAgJ21hcmdpbi1ib3R0b20nOiAwLFxuICAgICAgJ2JvcmRlci1jb2xsYXBzZSc6ICdjb2xsYXBzZScsXG4gICAgfTtcbiAgfVxuICBpZiAoY2VsbFN0eWxlcyA9PSBudWxsKSB7XG4gICAgY2VsbFN0eWxlcyA9IHtcbiAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXG4gICAgICBjb2xvcjogJ2JsYWNrJyxcbiAgICB9O1xuICB9XG4gIGlmIChwZXJjV2lkdGggPT0gbnVsbCB8fCBwZXJjV2lkdGgubGVuZ3RoICE9PSBmaWVsZHMubGVuZ3RoKSB7XG4gICAgY29uc3QgY2VsbFdpZHRoID0gMTAwIC8gZmllbGRzLmxlbmd0aCArICclJztcbiAgICBwZXJjV2lkdGggPSBbXTtcbiAgICBmaWVsZHMuZm9yRWFjaChfID0+IHBlcmNXaWR0aC5wdXNoKGNlbGxXaWR0aCkpO1xuICB9XG5cbiAgaWYgKGRhdGFzZXQpIHtcbiAgICBsZXQgaW5kZXg6IG51bWJlciA9IDA7XG4gICAgZGF0YXNldC5mb3JFYWNoKChkYXRhOiBNYWluRm9ybSkgPT4ge1xuICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgaW5kZXgrKztcbiAgICAgICAgLy8gUm93IGlzIGFuIEFqZlRhYmxlV2lkZ2V0XG4gICAgICAgIGNvbnN0IHJvdzoge1trZXk6IHN0cmluZ106IGFueX0gPSB7XG4gICAgICAgICAgc3R5bGVzOiB7XG4gICAgICAgICAgICAndGV4dC1hbGlnbic6ICdyaWdodCcsXG4gICAgICAgICAgICAnbWFyZ2luLWJvdHRvbSc6IDAsXG4gICAgICAgICAgICAnYm9yZGVyLWNvbGxhcHNlJzogJ2NvbGxhcHNlJyxcbiAgICAgICAgICAgIC4uLnJvd1N0eWxlLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgdmlzaWJpbGl0eToge2NvbmRpdGlvbjogJ3RydWUnfSxcbiAgICAgICAgICB3aWRnZXRUeXBlOiA1LFxuICAgICAgICAgIGRhdGFzZXQ6IFtbXV0gYXMgYW55W11bXSxcbiAgICAgICAgICBjZWxsU3R5bGVzOiB7J2JvcmRlci10b3AnOiAnMXB4IHNvbGlkIGdyZXknfSxcbiAgICAgICAgfTtcblxuICAgICAgICBmaWVsZHMuZm9yRWFjaCgoZmllbGQ6IHN0cmluZywgY2VsbElkeDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgbGV0IGZvcm11bGFDZWxsID0gJ1wiXCInO1xuICAgICAgICAgIGlmIChkYXRhW2ZpZWxkXSAhPSBudWxsKSB7XG4gICAgICAgICAgICBmb3JtdWxhQ2VsbCA9ICdcIicgKyBkYXRhW2ZpZWxkXSArICdcIic7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcm93WydkYXRhc2V0J11bMF0ucHVzaCh7XG4gICAgICAgICAgICBsYWJlbDogJycsXG4gICAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxuICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJyxcbiAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBpbmRleCAlIDIgPT09IDAgPyBiYWNrZ3JvdW5kQ29sb3JBIDogYmFja2dyb3VuZENvbG9yQixcbiAgICAgICAgICAgICAgLi4uY2VsbFN0eWxlcyxcbiAgICAgICAgICAgICAgd2lkdGg6IHBlcmNXaWR0aFtjZWxsSWR4XSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmb3JtdWxhOiB7XG4gICAgICAgICAgICAgIGZvcm11bGE6IGZvcm11bGFDZWxsLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNvbHNwYW46IDEsXG4gICAgICAgICAgICByb3dzcGFuOiAxLFxuICAgICAgICAgICAgYWdncmVnYXRpb246IHtcbiAgICAgICAgICAgICAgYWdncmVnYXRpb246IDAsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBsZXQgaHRtbERpYWxvZzogc3RyaW5nW10gPSBbXTtcbiAgICAgICAgZGlhbG9nRmllbGRzLmZvckVhY2goKGZpZWxkOiBzdHJpbmcsIGNlbGxJZHg6IG51bWJlcikgPT4ge1xuICAgICAgICAgIGxldCBmaWVsZFZhbHVlID0gJ1wiXCInO1xuICAgICAgICAgIGlmIChkYXRhW2ZpZWxkXSAhPSBudWxsKSB7XG4gICAgICAgICAgICBmaWVsZFZhbHVlID1cbiAgICAgICAgICAgICAgXCI8cCBjbGFzcz0nZGlhbG9nLWl0ZW0nPjxiPlwiICtcbiAgICAgICAgICAgICAgZGlhbG9nTGFiZWxGaWVsZHNbY2VsbElkeF0gK1xuICAgICAgICAgICAgICAnPC9iPiA8c3Bhbj4nICtcbiAgICAgICAgICAgICAgZGF0YVtmaWVsZF0gK1xuICAgICAgICAgICAgICAnPC9zcGFuPjwvcD4nO1xuICAgICAgICAgICAgaHRtbERpYWxvZy5wdXNoKGZpZWxkVmFsdWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgZGlhbG9nQ29udGVudDoge1trZXk6IHN0cmluZ106IGFueX0gPSB7XG4gICAgICAgICAgd2lkZ2V0VHlwZTogMyxcbiAgICAgICAgICBzdHlsZXM6IHtcbiAgICAgICAgICAgICdtYXJnaW4nOiAnMCAxZW0nLFxuICAgICAgICAgICAgJ3BhZGRpbmcnOiAnNXB4IDEwcHgnLFxuICAgICAgICAgICAgJ21heC1oZWlnaHQnOiAnMzYwcHgnLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgdmlzaWJpbGl0eToge2NvbmRpdGlvbjogJ3RydWUnfSxcbiAgICAgICAgICBodG1sVGV4dDogaHRtbERpYWxvZy5qb2luKCcgJyksXG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gVGhpcyBpcyBhIERpYWxvZyBXaWRnZXQsIGFkZGVkIGFzIGNvbXRhaW5lciBmb3IgZWFjaCB0YWJsZSB3aWRnZXRcbiAgICAgICAgY29uc3QgZGlhbG9nUm93OiB7W2tleTogc3RyaW5nXTogYW55fSA9IHtcbiAgICAgICAgICB3aWRnZXRUeXBlOiAxMyxcbiAgICAgICAgICBzdHlsZXM6IHtcbiAgICAgICAgICAgICdtYXJnaW4nOiAnMCcsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB2aXNpYmlsaXR5OiB7Y29uZGl0aW9uOiAndHJ1ZSd9LFxuICAgICAgICAgIHRvZ2dsZTogcm93LFxuICAgICAgICAgIGNvbnRlbnQ6IFtkaWFsb2dDb250ZW50XSxcbiAgICAgICAgfTtcbiAgICAgICAgcmVzLnB1c2goZGlhbG9nUm93KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICByZXR1cm4gcmVzO1xufVxuXG4vKipcbiAqIERlcHJlY2F0ZWQuIFVzZSBNQVBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIFJFUEVBVChcbiAgZm9ybXM6IE1haW5Gb3JtW10sXG4gIGFycmF5OiBzdHJpbmdbXSxcbiAgZm46IGFueSxcbiAgYXJnMTogc3RyaW5nLFxuICBhcmcyOiBzdHJpbmcgPSAndHJ1ZScsXG4pOiBhbnlbXSB7XG4gIHJldHVybiBhcnJheS5tYXAodiA9PiB7XG4gICAgY29uc3QgcyA9IEpTT04uc3RyaW5naWZ5KHYpO1xuICAgIGNvbnN0IGN1cnJlbnQxID0gKGFyZzEgYXMgYW55KS5yZXBsYWNlQWxsKCdjdXJyZW50Jywgcyk7XG4gICAgY29uc3QgY3VycmVudDIgPSAoYXJnMiBhcyBhbnkpLnJlcGxhY2VBbGwoJ2N1cnJlbnQnLCBzKTtcbiAgICByZXR1cm4gZm4oZm9ybXMsIGN1cnJlbnQxLCBjdXJyZW50Mik7XG4gIH0pO1xufVxuXG4vKipcbiAqIE1hcHMgZnVuYyB0byB0aGUgZWxlbWVudHMgb2YgYXJyYXkuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBNQVAoYXJyYXk6IGFueVtdLCBmdW5jOiAoYTogYW55KSA9PiBhbnkpOiBhbnlbXSB7XG4gIHJldHVybiBhcnJheS5tYXAoZnVuYyk7XG59XG5cbi8qKlxuICogRm9yIGVhY2ggZm9ybSBpbiBmb3JtcywgdGhlIHNwZWNpZmllZCBmaWVsZCBpcyBzZXQgd2l0aCB0aGUgdmFsdWUgZ2l2ZW4gYnkgZXhwcmVzc2lvbi5cbiAqIFRoZSBmb3JtJ3MgZmllbGRzIGNhbiBiZSB1c2VkIGluc2lkZSBleHByZXNzaW9uLlxuICovXG5leHBvcnQgZnVuY3Rpb24gQVBQTFkoZm9ybXM6IE1haW5Gb3JtW10sIGZpZWxkOiBzdHJpbmcsIGV4cHJlc3Npb246IEZ1bmN8c3RyaW5nKTogTWFpbkZvcm1bXSB7XG4gIGZvcm1zID0gY2xvbmVNYWluRm9ybXMoZm9ybXMpO1xuICBpZiAodHlwZW9mKGV4cHJlc3Npb24pID09PSAnc3RyaW5nJykge1xuICAgIGV4cHJlc3Npb24gPSBjcmVhdGVGdW5jdGlvbihleHByZXNzaW9uKTtcbiAgfVxuICBmb3IgKGNvbnN0IGZvcm0gb2YgZm9ybXMpIHtcbiAgICBpZiAoZm9ybSAhPSBudWxsKSB7XG4gICAgICBmb3JtW2ZpZWxkXSA9IGV4cHJlc3Npb24oZm9ybSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBmb3Jtcztcbn1cblxuLyoqXG4gKiBSb3VuZHMgbnVtIHRvIHRoZSBzcGVjaWZpZWQgbnVtYmVyIG9mIGRpZ2l0cyBhZnRlciB0aGUgcG9pbnQgKG9yIHplcm8pLlxuICovXG5leHBvcnQgZnVuY3Rpb24gUk9VTkQobnVtOiBudW1iZXIgfCBzdHJpbmcsIGRpZ2l0cz86IG51bWJlcik6IG51bWJlciB7XG4gIHJldHVybiByb3VuZChudW0sIGRpZ2l0cyk7XG59XG5cbi8qKlxuICogRGVwcmVjYXRlZC4gVXNlIElGXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBFVkFMVUFURShjb25kaXRpb246IHN0cmluZywgYnJhbmNoMTogYW55LCBicmFuY2gyOiBhbnkpOiBhbnkge1xuICBpZiAoZXZhbHVhdGVFeHByZXNzaW9uKGNvbmRpdGlvbikpIHtcbiAgICByZXR1cm4gYnJhbmNoMTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gYnJhbmNoMjtcbiAgfVxufVxuXG4vKipcbiAqIFRlbGxzIGlmIGFyciBpbmNsdWRlcyBlbGVtXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBJTkNMVURFUyhhcnI6IChhbnlbXSl8c3RyaW5nLCBlbGVtOiBhbnkpOiBib29sZWFuIHtcbiAgaWYgKCFBcnJheS5pc0FycmF5KGFycikgJiYgdHlwZW9mKGFycikgIT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiBhcnIuaW5jbHVkZXMoZWxlbSk7XG59XG5cbi8qKlxuICogVGhpcyBmdW5jdGlvbiBidWlsZHMgYSBkYXRhIHN0cnVjdHVyZSB0aGF0IGFsbG93cyB0aGUgdXNlIG9mIHRoZSBoaW5kaWtpdCBmb3JtdWxhc1xuICogZm9yIGV2ZXJ5IGZvcm1zIHdpdGggcmVwZWF0aW5nIHNsaWRlcy5cbiAqIEluIHBhcnRpY3VsYXIsIGl0IGJ1aWxkcyBhIG1haW4gZGF0YSBmb3JtIHdpdGggYWxsIHRoZSBkYXRhIHJlbGF0aW5nIHRvIHRoZSBzbGlkZXMgYW5kXG4gKiBhIGRpY3Rpb25hcnkgd2l0aCB0aGUgbmFtZSByZXBzIHRodXMgbWFkZSBpbnN0YW5jZSBzbGlkZU5hbWUgZm9ybXMuXG4gKiBXaGVyZSBhIGZvcm0gaXMgYXNzb2NpYXRlZCB3aXRoIGVhY2ggaW5zdGFuY2Ugb2YgdGhlIHJlcGVhdGluZyBzbGlkZS5cbiAqIGV4YW1wbGU6XG4gKiBzaW1wbGUgZm9ybTpcbiAqICB7XG4gKiAgICAkdmFsdWU6IFwiQUdPXCJcbiAqICAgIGNpdHRhZGluYW56YV9fMDogXCJBR09cIlxuICogICAgY29kaWNlX2Zpc2NhbGVfXzA6IFwiamRmbGpnbMOya8Oya8OyXCJcbiAqICAgIGNvdW50cnlfXzA6IFwiQUdPXCJcbiAqICAgIGRhdGVfZW5kOiBcIjIwMjEtMDEtMTBcIlxuICogICAgZGF0ZV9zdGFydDogXCIyMDIxLTAxLTEwXCJcbiAqICAgIGRvYl9fMDogXCIyMDIxLTAzLTExXCJcbiAqICAgIGZpcnN0X25hbWVfXzA6IFwicGlwcG9cIlxuICogICAgZ2VuZGVyX18wOiBcImZcIlxuICogICAgaWRfZmFtaWx5OiBcIjNiZWYzYTNmLWQ5NWQtNGEwOS04ZGY0LWU4MTJjNTVjNjFjNlwiXG4gKiAgICBpc3RydXppb25lX18wOiBudWxsXG4gKiAgICBsYXN0X25hbWVfXzA6IFwicGlwcG9cIlxuICogICAgcGVybWVzc29fc29nZ2lvcm5vX18wOiBcIm5vXCJcbiAqICAgIHJlbGF6aW9uZV9fMDogXCJnZW5pdG9yZVwiXG4gKiAgICBzb2xpZGFuZG86IFwic29saWRhbmRvMVwiXG4gKiAgICBzdGF0b19jaXZpbGVfXzA6IG51bGxcbiAqICB9XG4gKiBhZnRlciBCVUlMRF9EQVRBU0VUXG4gKiBNYWluRm9ybTpcbiAqIHtcbiAqICAgICR2YWx1ZTogXCJBR09cIlxuICogICAgYWpmX2Zvcm1faWQ6IDAgKiogYWRkZWQgYXRyaWJ1dGUgdGhhdCByYXBwcmVzZW50IHRoZSBpbmRleCBwb3NpdGlvbiBpbnNpZGVzIGlucHV0IGZvcm0gbGlzdC5cbiAqICAgIGFqZl9mYW1pbHlfY29tcG9uZW50X2NvdW50OiAxKiogYWRkZWQgYXRyaWJ1dGUgdGhhdCByYXBwcmVzZW50IHRoZSBpbnN0YW5jZSBudW1iZXIgb2YgZmFtaWxpX2NvbXBvbmVudCByZXBlYXRpbmcgc2xpZGVzLlxuICogICAgZGF0ZV9lbmQ6IFwiMjAyMS0wMS0xMFwiXG4gKiAgICBkYXRlX3N0YXJ0OiBcIjIwMjEtMDEtMTBcIlxuICogICAgaWRfZmFtaWx5OiBcIjNiZWYzYTNmLWQ5NWQtNGEwOS04ZGY0LWU4MTJjNTVjNjFjNlwiXG4gKiAgICByZXBzOiB7XG4gKiAgICAgIGZhbWlseV9jb21wb25lbnQ6IFtcbiAqICAgICAgICB7XG4gKiAgICAgICAgICBhamZfZmFtaWx5X2NvbXBvbmVudF9yZXA6IDAgKiogYWRkZWQgYXRyaWJ1dGUgdGhhdCByYXBwcmVzZW50IHRoZSBvcmRlciBpbnN0YW5jZSBvZiBmYW1pbHlfY29tcG9uZW50IHJlcGVhdGluZyBzbGlkZS5cbiAqICAgICAgICAgIGNpdHRhZGluYW56YTogXCJBR09cIlxuICogICAgICAgICAgY29kaWNlX2Zpc2NhbGU6IFwiamRmbGpnbMOya8Oya8OyXCJcbiAqICAgICAgICAgIGNvdW50cnk6IFwiQUdPXCJcbiAqICAgICAgICAgIGRvYjogXCIyMDIxLTAzLTExXCJcbiAqICAgICAgICAgIGZpcnN0X25hbWU6IFwicGlwcG9cIlxuICogICAgICAgICAgZ2VuZGVyOiBcImZcIlxuICogICAgICAgICAgaXN0cnV6aW9uZTogbnVsbFxuICogICAgICAgICAgbGFzdF9uYW1lOiBcInBpcHBvXCJcbiAqICAgICAgICAgIHBlcm1lc3NvX3NvZ2dpb3JubzogXCJub1wiXG4gKiAgICAgICAgICByZWxhemlvbmU6IFwiZ2VuaXRvcmVcIlxuICogICAgICAgICAgc3RhdG9fY2l2aWxlOiBudWxsXG4gKiAgICAgICAgfVxuICogICAgICBdXG4gKiAgICB9XG4gKiB9XG4gKlxuICogQHBhcmFtIHtGb3JtW119IGZvcm1zXG4gKiBAcGFyYW0geyp9IFtzY2hlbWFdIGlmIHNjaGVtYSBpcyBwcm92aWRlZCB0aGUgaW5zdGFuY2VzIGluc2lkZSB0aGUgcmVwcyBtYXRjaCB3aXRoIGVmZmVjdGl2ZVxuICogc2xpZGUgbmFtZS4gT3RoZXJ3aXNlIGFsbCByZXBlYXRpbmcgc2xpZGVzIGFyZSBhc3NvY2lhdGVzIHRvIGdlbmVyaWMgc2xpZGUgbmFtZSBcInJlcFwiLlxuICogQHJldHVybiB7Kn0gIHtNYWluRm9ybVtdfVxuICovXG5leHBvcnQgZnVuY3Rpb24gQlVJTERfREFUQVNFVChmb3JtczogRm9ybVtdLCBzY2hlbWE/OiBhbnkpOiBNYWluRm9ybVtdIHtcbiAgY29uc3QgcmVzOiBNYWluRm9ybVtdID0gW107XG4gIGNvbnN0IGdlbmVyYXRlTWV0YWRhdGEgPSAoc2xpZGVOYW1lOiBzdHJpbmcsIHNsaWRlSW5zdGFuY2U6IG51bWJlcikgPT4ge1xuICAgIGNvbnN0IHJlc2c6IHtbc25hbWU6IHN0cmluZ106IGFueX0gPSB7fTtcbiAgICByZXNnW2BhamZfJHtzbGlkZU5hbWV9X3JlcGBdID0gc2xpZGVJbnN0YW5jZTtcbiAgICByZXR1cm4gcmVzZztcbiAgfTtcblxuICBmb3JtcyA9IFsuLi4oZm9ybXMgfHwgW10pXTtcblxuICBpZiAoc2NoZW1hICE9IG51bGwpIHtcbiAgICBjb25zdCByZXBlYXRpbmdTbGlkZXM6IGFueVtdID0gc2NoZW1hLm5vZGVzLmZpbHRlcigobm9kZTogYW55KSA9PiBub2RlLm5vZGVUeXBlID09PSA0KTtcbiAgICBjb25zdCBvYmo6IHtbZmllbGROYW1lOiBzdHJpbmddOiBzdHJpbmd9ID0ge307XG4gICAgcmVwZWF0aW5nU2xpZGVzLmZvckVhY2goc2xpZGUgPT4ge1xuICAgICAgbGV0IG5vZGVGaWVsZHMgPSBzbGlkZS5ub2Rlcy5tYXAoKG46IGFueSkgPT4gbi5uYW1lKTtcbiAgICAgIG5vZGVGaWVsZHMuZm9yRWFjaCgobm9kZUZpZWxkOiBzdHJpbmcpID0+IHtcbiAgICAgICAgb2JqW25vZGVGaWVsZF0gPSBzbGlkZS5uYW1lO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBmb3Jtcy5mb3JFYWNoKChmLCBmb3JtSWR4KSA9PiB7XG4gICAgICBjb25zdCBtYWluRm9ybTogTWFpbkZvcm0gPSB7cmVwczoge319O1xuICAgICAgY29uc3QgZktleXM6IHN0cmluZ1tdID0gT2JqZWN0LmtleXMoZik7XG4gICAgICBjb25zdCBpbnN0YW5jZXM6IHtbc2xpZGVOYW1lOiBzdHJpbmddOiBhbnl9ID0ge307XG5cbiAgICAgIGZLZXlzLmZvckVhY2goZmtleSA9PiB7XG4gICAgICAgIGNvbnN0IHNwbGl0dGVkS2V5OiBzdHJpbmdbXSA9IGZrZXkuc3BsaXQoJ19fJyk7XG4gICAgICAgIGNvbnN0IHNwbGl0dGVkTGVuZ3RoOiBudW1iZXIgPSBzcGxpdHRlZEtleS5sZW5ndGg7XG4gICAgICAgIGNvbnN0IGZpZWxkTmFtZSA9IHNwbGl0dGVkS2V5WzBdO1xuICAgICAgICBjb25zdCBzbGlkZUluc3RhbmNlID1cbiAgICAgICAgICBzcGxpdHRlZEtleVsxXSAhPSBudWxsICYmIE51bWJlci5pc0ludGVnZXIoK3NwbGl0dGVkS2V5WzFdKSA/ICtzcGxpdHRlZEtleVsxXSA6IG51bGw7XG4gICAgICAgIGNvbnN0IHNsaWRlTmFtZSA9IG9ialtmaWVsZE5hbWVdO1xuICAgICAgICBpZiAoc3BsaXR0ZWRMZW5ndGggPT09IDIgJiYgc2xpZGVJbnN0YW5jZSAhPSBudWxsICYmIHNsaWRlTmFtZSAhPSBudWxsKSB7XG4gICAgICAgICAgaW5zdGFuY2VzW3NsaWRlTmFtZV0gPSBpbnN0YW5jZXNbc2xpZGVOYW1lXSAhPSBudWxsID8gaW5zdGFuY2VzW3NsaWRlTmFtZV0gOiBbXTtcbiAgICAgICAgICBpbnN0YW5jZXNbc2xpZGVOYW1lXVtzbGlkZUluc3RhbmNlXSA9XG4gICAgICAgICAgICBpbnN0YW5jZXNbc2xpZGVOYW1lXVtzbGlkZUluc3RhbmNlXSAhPSBudWxsXG4gICAgICAgICAgICAgID8gaW5zdGFuY2VzW3NsaWRlTmFtZV1bc2xpZGVJbnN0YW5jZV1cbiAgICAgICAgICAgICAgOiBnZW5lcmF0ZU1ldGFkYXRhKHNsaWRlTmFtZSwgc2xpZGVJbnN0YW5jZSk7XG4gICAgICAgICAgaW5zdGFuY2VzW3NsaWRlTmFtZV1bc2xpZGVJbnN0YW5jZV1bZmllbGROYW1lXSA9IGZbZmtleV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbWFpbkZvcm1bZmtleV0gPSBmW2ZrZXldO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIG1haW5Gb3JtW2BhamZfZm9ybV9pZGBdID0gZm9ybUlkeDtcbiAgICAgIGNvbnN0IGluc3RhbmNlS2V5cyA9IE9iamVjdC5rZXlzKGluc3RhbmNlcyk7XG4gICAgICBpbnN0YW5jZUtleXMuZm9yRWFjaChpbnN0YW5jZUtleSA9PiB7XG4gICAgICAgIG1haW5Gb3JtW2BhamZfJHtpbnN0YW5jZUtleX1fY291bnRgXSA9IGluc3RhbmNlc1tpbnN0YW5jZUtleV0ubGVuZ3RoO1xuICAgICAgfSk7XG4gICAgICBtYWluRm9ybS5yZXBzID0gaW5zdGFuY2VzO1xuICAgICAgcmVzLnB1c2gobWFpbkZvcm0pO1xuICAgIH0pO1xuICAgIHJldHVybiByZXM7XG4gIH0gZWxzZSB7XG4gICAgZm9ybXMuZm9yRWFjaChmb3JtID0+IHtcbiAgICAgIGNvbnN0IGZLZXlzOiBzdHJpbmdbXSA9IE9iamVjdC5rZXlzKGZvcm0pO1xuICAgICAgY29uc3Qgbm9SZXBlYXRpbmdGaWVsZHM6IHN0cmluZ1tdID0gZktleXMuZmlsdGVyKGZrZXkgPT4ge1xuICAgICAgICBjb25zdCBzcGxpdHRlZEtleTogc3RyaW5nW10gPSBma2V5LnNwbGl0KCdfXycpO1xuICAgICAgICBpZiAoc3BsaXR0ZWRLZXkubGVuZ3RoID09PSAyKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSk7XG4gICAgICBjb25zdCBub1JlcEZvcm06IEZvcm0gPSB7fTtcblxuICAgICAgbm9SZXBlYXRpbmdGaWVsZHMuZm9yRWFjaChmaWVsZCA9PiB7XG4gICAgICAgIG5vUmVwRm9ybVtmaWVsZF0gPSBmb3JtW2ZpZWxkXTtcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBtYWluRm9ybTogTWFpbkZvcm0gPSB7Li4ubm9SZXBGb3JtLCByZXBzOiB7c2xpZGU6IFtdfX07XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IE1BWF9SRVBTOyBpKyspIHtcbiAgICAgICAgY29uc3QgY3VycmVudFNsaWRlOiBGb3JtID0ge307XG4gICAgICAgIGNvbnN0IG9ubHlDdXJyZW50SW5zdGFuY2VLZXlzOiBzdHJpbmdbXSA9IGZLZXlzLmZpbHRlcihma2V5ID0+IHtcbiAgICAgICAgICBjb25zdCBzcGxpdHRlZEtleTogc3RyaW5nW10gPSBma2V5LnNwbGl0KCdfXycpO1xuICAgICAgICAgIGlmIChzcGxpdHRlZEtleS5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgICAgIHJldHVybiBma2V5LmluZGV4T2YoYF9fJHtpfWApID4gLTE7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIHNlIGlsIG51bWVybyBkaSBhdHRyaWJ1dGkgY29pbmNpZGUgaWwgZm9ybSBkYXRhIG5vbiBoYSByZXBlYXRpbmdzbGlkZXNcbiAgICAgICAgaWYgKG9ubHlDdXJyZW50SW5zdGFuY2VLZXlzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIG1haW5Gb3JtWydhamZfcmVwX2NvdW50J10gPSBpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIG9ubHlDdXJyZW50SW5zdGFuY2VLZXlzLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgICBjb25zdCBzcGxpdHRlZEtleSA9IGtleS5zcGxpdCgnX18nKTtcbiAgICAgICAgICBjb25zdCBmaWVsZE5hbWUgPSBzcGxpdHRlZEtleVswXTtcbiAgICAgICAgICBjb25zdCBzbGlkZUluc3RhbmNlID0gc3BsaXR0ZWRLZXlbMV0gIT0gbnVsbCA/ICtzcGxpdHRlZEtleVsxXSA6IG51bGw7XG4gICAgICAgICAgY3VycmVudFNsaWRlW2ZpZWxkTmFtZV0gPSBmb3JtW2tleV07XG4gICAgICAgICAgY3VycmVudFNsaWRlWydhamZfcmVwJ10gPSBzbGlkZUluc3RhbmNlICE9IG51bGwgPyBzbGlkZUluc3RhbmNlIDogY3VycmVudFNsaWRlWydhamZfcmVwJ107XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAob25seUN1cnJlbnRJbnN0YW5jZUtleXMubGVuZ3RoICE9IDApIHtcbiAgICAgICAgICBtYWluRm9ybS5yZXBzIVsnc2xpZGUnXS5wdXNoKGN1cnJlbnRTbGlkZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbWFpbkZvcm0ucmVwcyA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmVzLnB1c2gobWFpbkZvcm0pO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHJlcztcbiAgfVxufVxuXG4vKipcbiAqIFVUSUxJVFkgRlVOQ0lPTlxuICogVGhpcyBmdW5jdGlvbiB0YWtlIGFuIGFqZiBzY2hlbWEgYXMgaW5wdXQgYW5kIGV4dHJhY3QgYVxuICogZGljdCB0aGF0IG1hdGNoIGVhY2ggY2hvaWNlIHZhbHVlIChhbHNvIHdpdGggY2hvaWNlc09yaWdpbiBuYW1lIHByZWZpeCkgd2l0aCBpdHMgbGFiZWxcbiAqIEBwYXJhbSBzY2hlbWEgdGhlIGFqZiBzY2hlbWFcbiAqIEByZXR1cm5zIEEgZGljdCB3aXRoOlxuICogIHtbY2hvaWNlc09yaWdpbk5hbWVfY2hvaWNlVmFsdWU6IHN0cmluZ106IFtjaG9pY2VMYWJlbDogc3RyaW5nXX1cbiAqICB7W2Nob2ljZVZhbHVlOiBzdHJpbmddOiBbY2hvaWNlTGFiZWw6IHN0cmluZ119XG4gKi9cbmZ1bmN0aW9uIGV4dHJhY3RMYWJlbHNCeVNjaGVtYUNob2ljZXMoc2NoZW1hOiBhbnkpOiB7W2Nob2ljZVZhbHVlOiBzdHJpbmddOiBzdHJpbmd9IHtcbiAgY29uc3QgY2hvaWNlTGFiZWxzOiB7W2Nob2ljZVZhbHVlOiBzdHJpbmddOiBzdHJpbmd9ID0ge307XG4gIGlmIChzY2hlbWEgJiYgc2NoZW1hLmNob2ljZXNPcmlnaW5zICE9IG51bGwpIHtcbiAgICAoc2NoZW1hLmNob2ljZXNPcmlnaW5zIGFzIGFueVtdKS5mb3JFYWNoKGNob2ljZXNPcmlnaW4gPT4ge1xuICAgICAgaWYgKGNob2ljZXNPcmlnaW4gIT0gbnVsbCAmJiBjaG9pY2VzT3JpZ2luLmNob2ljZXMgIT0gbnVsbCkge1xuICAgICAgICAoY2hvaWNlc09yaWdpbi5jaG9pY2VzIGFzIGFueVtdKS5mb3JFYWNoKGNob2ljZSA9PiB7XG4gICAgICAgICAgY2hvaWNlTGFiZWxzW2Nob2ljZXNPcmlnaW4ubmFtZSArICdfJyArIGNob2ljZS52YWx1ZV0gPSBjaG9pY2UubGFiZWw7XG4gICAgICAgICAgY2hvaWNlTGFiZWxzW2Nob2ljZS52YWx1ZV0gPSBjaG9pY2UubGFiZWw7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIHJldHVybiBjaG9pY2VMYWJlbHM7XG59XG5cbi8qKlxuICogVVRJTElUWSBGVU5DSU9OXG4gKiBUaGlzIGZ1bmN0aW9uIHRha2UgYW4gYWpmIHNjaGVtYSBhcyBpbnB1dCBhbmQgZXh0cmFjdCBhIG9uZVxuICogZGltZW5zaW9uYWwgYXJyYXkgb2YgQWpmTm9kZSBmb3IgZWFjaCBzbGlkZSdzIGZpZWxkXG4gKlxuICogQHBhcmFtIHNjaGVtYSB0aGUgYWpmIHNjaGVtYVxuICogQHJldHVybnMgQW4gb2JqZWN0IHdpdGggYWxsIGZpZWxkczpcbiAqICB7W2ZpZWxkTmFtZTogc3RyaW5nXTogYWpmIGZpZWxkfVxuICovXG5mdW5jdGlvbiBleHRyYWN0RmxhdHRlbk5vZGVzKHNjaGVtYTogYW55KToge1tmaWVsZDogc3RyaW5nXTogYW55fSB7XG4gIGNvbnN0IGZpZWxkTm9kZXM6IHtbZmllbGQ6IHN0cmluZ106IGFueX0gPSB7fTtcbiAgaWYgKHNjaGVtYSAmJiBzY2hlbWEubm9kZXMpIHtcbiAgICBjb25zdCBzbGlkZXM6IGFueVtdID0gc2NoZW1hLm5vZGVzLmZpbHRlcihcbiAgICAgIChub2RlOiBhbnkpID0+IG5vZGUubm9kZVR5cGUgPT09IDMgfHwgbm9kZS5ub2RlVHlwZSA9PT0gNCxcbiAgICApO1xuICAgIHNsaWRlcy5mb3JFYWNoKHNsaWRlID0+IHtcbiAgICAgIHNsaWRlLm5vZGVzXG4gICAgICAgIC5maWx0ZXIoKG5vZGU6IGFueSkgPT4gbm9kZS5ub2RlVHlwZSA9PT0gMClcbiAgICAgICAgLmZvckVhY2goKGZpZWxkTm9kZTogYW55KSA9PiB7XG4gICAgICAgICAgZmllbGROb2Rlc1tmaWVsZE5vZGUubmFtZV0gPSBmaWVsZE5vZGU7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9XG4gIHJldHVybiBmaWVsZE5vZGVzO1xufVxuXG4vKipcbiAqIFJldHVybnMgYSBjbG9uZSBvZiBmb3Jtcywgd2hlcmUgdGhlIHNwZWNpZmllZCBmaWVsZHMgYXJlIHJlcGxhY2VkIGJ5IHRoZSBjb3JyZXNwb25kaW5nIGxhYmVscyxcbiAqIGFzIGRlZmluZWQgYnkgdGhlIGNob2ljZSBvcmlnaW5zIGluIHNjaGVtYS5cbiAqXG4gKiBAcGFyYW0ge01haW5Gb3JtW119IGZvcm1MaXN0XG4gKiBAcGFyYW0geyp9IHNjaGVtYSB0aGUgYWpmIHNjaGVtYVxuICogQHBhcmFtIHtzdHJpbmdbXX0gZmllbGROYW1lc1xuICogQHJldHVybiB7Kn0gIHtNYWluRm9ybVtdfVxuICovXG5leHBvcnQgZnVuY3Rpb24gQVBQTFlfTEFCRUxTKGZvcm1MaXN0OiBNYWluRm9ybVtdLCBzY2hlbWE6IGFueSwgZmllbGROYW1lczogc3RyaW5nW10pOiBNYWluRm9ybVtdIHtcbiAgZm9ybUxpc3QgPSBjbG9uZU1haW5Gb3Jtcyhmb3JtTGlzdCk7XG4gIGNvbnN0IGNob2ljZUxhYmVsczoge1tmaWVsZE5hbWU6IHN0cmluZ106IHN0cmluZ30gPSBleHRyYWN0TGFiZWxzQnlTY2hlbWFDaG9pY2VzKHNjaGVtYSk7XG4gIGNvbnN0IGZsYXR0ZW5Ob2RlcyA9IGV4dHJhY3RGbGF0dGVuTm9kZXMoc2NoZW1hKTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGZvcm1MaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGZvcm1MaXN0W2ldID09IG51bGwpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBpZiAoZm9ybUxpc3RbaV0ucmVwcyAhPSBudWxsKSB7XG4gICAgICBjb25zdCBmID0gZm9ybUxpc3RbaV07XG4gICAgICBjb25zdCBmS2V5czogc3RyaW5nW10gPSBPYmplY3Qua2V5cyhmKTtcbiAgICAgIGZLZXlzLmZvckVhY2goZmtleSA9PiB7XG4gICAgICAgIGNvbnN0IGZpZWxkTm9kZSA9IGZsYXR0ZW5Ob2Rlc1tma2V5XTtcbiAgICAgICAgY29uc3QgY2hvaWNlT3JpZ2luTmFtZVByZWZpeCA9XG4gICAgICAgICAgZmllbGROb2RlICYmIGZpZWxkTm9kZS5jaG9pY2VzT3JpZ2luUmVmID8gZmllbGROb2RlLmNob2ljZXNPcmlnaW5SZWYgKyAnXycgOiAnJztcblxuICAgICAgICBpZiAoZmllbGROYW1lcy5pbmNsdWRlcyhma2V5KSAmJiBmW2ZrZXldICE9PSBudWxsKSB7XG4gICAgICAgICAgbGV0IGNob2ljZVZhbHVlOiBzdHJpbmdbXSA9IFtdO1xuICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGZbZmtleV0pKSB7XG4gICAgICAgICAgICBjaG9pY2VWYWx1ZSA9IGZbZmtleV0gYXMgdW5rbm93biBhcyBzdHJpbmdbXTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgbXVsdGlwbGVWYWxzID0gKGZbZmtleV0gYXMgc3RyaW5nKS5zcGxpdCgnLCcpLm1hcCh2ID0+IHYudHJpbSgpKTtcbiAgICAgICAgICAgIGlmIChtdWx0aXBsZVZhbHMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICBjaG9pY2VWYWx1ZSA9IG11bHRpcGxlVmFscztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGNob2ljZVZhbHVlID0gW2ZbZmtleV0gYXMgc3RyaW5nXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGNob2ljZVZhbHVlICE9IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnN0IGxhYmVscyA9IGNob2ljZVZhbHVlLm1hcCh2YWwgPT4ge1xuICAgICAgICAgICAgICBjb25zdCB2YWxXaXRoUHJlZml4ID0gY2hvaWNlT3JpZ2luTmFtZVByZWZpeCArIHZhbDtcbiAgICAgICAgICAgICAgcmV0dXJuIGNob2ljZUxhYmVsc1t2YWxXaXRoUHJlZml4XSAhPSBudWxsXG4gICAgICAgICAgICAgICAgPyBjaG9pY2VMYWJlbHNbdmFsV2l0aFByZWZpeF1cbiAgICAgICAgICAgICAgICA6IGNob2ljZUxhYmVsc1t2YWxdICE9IG51bGxcbiAgICAgICAgICAgICAgICA/IGNob2ljZUxhYmVsc1t2YWxdXG4gICAgICAgICAgICAgICAgOiB2YWw7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChsYWJlbHMgJiYgbGFiZWxzLmxlbmd0aCkge1xuICAgICAgICAgICAgICBjb25zdCBsYWJlbEZpZWxkTmFtZSA9IGZrZXkgKyAnX2Nob2ljZXNMYWJlbCc7XG4gICAgICAgICAgICAgIGZvcm1MaXN0W2ldW2xhYmVsRmllbGROYW1lXSA9IGxhYmVscy5sZW5ndGggPiAxID8gbGFiZWxzLmpvaW4oJywgJykgOiBsYWJlbHNbMF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZvcm1MaXN0O1xufVxuXG4vKipcbiAqIERlcHJlY2F0ZWQuIFVzZSBGSUxURVJfQllcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIEZJTFRFUl9CWV9WQVJTKGZvcm1MaXN0OiBNYWluRm9ybVtdLCBleHByZXNzaW9uOiBzdHJpbmcpOiBNYWluRm9ybVtdIHtcbiAgcmV0dXJuIEZJTFRFUl9CWShmb3JtTGlzdCwgZXhwcmVzc2lvbik7XG59XG5cbi8qKlxuICogUmV0dXJucyBhIGNvcHkgb2YgZm9ybXMgYW5kIGl0cyByZXBldGl0aW9ucywga2VlcGluZyBvbmx5IHRoZSBvbmVzIGZvciB3aGljaCBleHByZXNzaW9uIGV2YWx1YXRlcyB0byB0cnVlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gRklMVEVSX0JZKGZvcm1zOiBNYWluRm9ybVtdLCBleHByZXNzaW9uOiBGdW5jfHN0cmluZyk6IE1haW5Gb3JtW10ge1xuICBmb3JtcyA9IGZvcm1zIHx8IFtdO1xuICBpZiAoZXhwcmVzc2lvbiA9PT0gJ3RydWUnKSB7XG4gICAgcmV0dXJuIGNsb25lTWFpbkZvcm1zKGZvcm1zKTtcbiAgfVxuICBpZiAodHlwZW9mKGV4cHJlc3Npb24pID09PSAnc3RyaW5nJykge1xuICAgIGV4cHJlc3Npb24gPSBjcmVhdGVGdW5jdGlvbihleHByZXNzaW9uKTtcbiAgfVxuICBjb25zdCByZXM6IE1haW5Gb3JtW10gPSBbXTtcbiAgZm9yIChsZXQgZm9ybSBvZiBmb3Jtcy5maWx0ZXIoZiA9PiBmICE9IG51bGwpKSB7XG4gICAgZm9ybSA9IHsuLi5mb3JtfTtcbiAgICBjb25zdCBmaWx0ZXJlZFJlcHM6IEluc3RhbmNlcyA9IHt9O1xuICAgIGxldCBzb21lUmVwcyA9IGZhbHNlO1xuICAgIGlmIChmb3JtLnJlcHMgIT0gbnVsbCkge1xuICAgICAgZm9yIChjb25zdCBrZXkgaW4gZm9ybS5yZXBzKSB7XG4gICAgICAgIGZpbHRlcmVkUmVwc1trZXldID0gZm9ybS5yZXBzW2tleV0uZmlsdGVyKHJlcCA9PlxuICAgICAgICAgIChleHByZXNzaW9uIGFzIEZ1bmMpKHsuLi5mb3JtLCAuLi5yZXB9KVxuICAgICAgICApO1xuICAgICAgICBmb3JtW2BhamZfJHtrZXl9X2NvdW50YF0gPSBmaWx0ZXJlZFJlcHNba2V5XS5sZW5ndGg7XG4gICAgICAgIHNvbWVSZXBzIHx8PSBmaWx0ZXJlZFJlcHNba2V5XS5sZW5ndGggPiAwO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoc29tZVJlcHMgfHwgZXhwcmVzc2lvbihmb3JtKSkge1xuICAgICAgZm9ybS5yZXBzID0gZmlsdGVyZWRSZXBzO1xuICAgICAgcmVzLnB1c2goZm9ybSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXM7XG59XG5cbi8qKlxuICogUmV0dXJucyB0b2RheSdzIGRhdGUuXG4gKlxuICogQGV4cG9ydFxuICogQHJldHVybiB7Kn0gIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBUT0RBWSgpOiBzdHJpbmcge1xuICByZXR1cm4gbmV3IERhdGUoKS50b0pTT04oKS5zbGljZSgwLCAxMCk7XG59XG5cbi8qKlxuICogTG9ncyB2YWwgdG8gdGhlIGNvbnNvbGUuXG4gKiBcbiAqIEBleHBvcnRcbiAqIEBwYXJhbSB7Kn0gdmFsXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBDT05TT0xFX0xPRyh2YWw6IGFueSk6IGFueSB7XG4gIGNvbnNvbGUubG9nKHZhbCk7XG4gIHJldHVybiB2YWw7XG59XG5cbi8qKlxuICogQ29tcHV0ZXMgdGhlIGN1cnJlbnQgYWdlIGluIHllYXJzLCBnaXZlbiB0aGUgZGF0ZSBvZiBiaXJ0aC5cbiAqXG4gKiBAZXhwb3J0XG4gKiBAcGFyYW0geyhzdHJpbmcgfCBudWxsKX0gZG9iXG4gKiBAcGFyYW0geyhzdHJpbmcgfCB1bmRlZmluZWQpfSB3aGVuXG4gKiBAcmV0dXJuIHsqfSAge251bWJlcn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIEdFVF9BR0UoZG9iOiBzdHJpbmd8bnVsbCwgd2hlbj86IHN0cmluZyk6IG51bWJlciB7XG4gIGlmIChkb2IgPT0gbnVsbCkge1xuICAgIHJldHVybiBOYU47XG4gIH1cbiAgaWYgKHdoZW4gPT0gbnVsbCkge1xuICAgIHdoZW4gPSBUT0RBWSgpO1xuICB9XG4gIGxldCB5ZWFyc0RpZmYgPSBOdW1iZXIod2hlbi5zbGljZSgwLCA0KSkgLSBOdW1iZXIoZG9iLnNsaWNlKDAsIDQpKTtcbiAgaWYgKHdoZW4uc2xpY2UoNSkgPCBkb2Iuc2xpY2UoNSkpIHsgLy8gYmlydGhkYXkgbm90IHJlYWNoZWQgeWV0IGluIGN1cnJlbnQgeWVhclxuICAgIHllYXJzRGlmZi0tO1xuICB9XG4gIHJldHVybiB5ZWFyc0RpZmY7XG59XG5cbi8qKlxuICogSWYgZGF0YSBpcyBhIGZvcm0gd2l0aCByZXBldGl0aW9ucywgcmV0dXJucyB0aGUgbnVtYmVyIG9mIHJlcGV0aXRpb25zO1xuICogSWYgZGF0YSBpcyBhbiBhcnJheSwgcmV0dXJucyBpdHMgbGVuZ3RoO1xuICogT3RoZXJ3aXNlIHJldHVybnMgMC5cbiAqXG4gKiBAZXhwb3J0XG4gKiBAcGFyYW0geyhNYWluRm9ybSB8IGFueVtdKX0gZGF0YXNldFxuICogQHJldHVybiB7Kn0gIHtudW1iZXJ9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBMRU4oZGF0YXNldDogTWFpbkZvcm0gfCBhbnlbXSk6IG51bWJlciB7XG4gIGlmIChkYXRhc2V0ID09IG51bGwpIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuICBjb25zdCBmb3JtID0gZGF0YXNldCBhcyBNYWluRm9ybTtcbiAgaWYgKGZvcm0ucmVwcyAhPSBudWxsKSB7XG4gICAgcmV0dXJuIGFsbFJlcHMoZm9ybSkubGVuZ3RoO1xuICB9XG4gIHJldHVybiAoZGF0YXNldCBhcyBhbnlbXSkubGVuZ3RoIHx8IDA7XG59XG5cbi8qKlxuICogQXJyYXkgY29uY2F0ZW5hdGlvbi5cbiAqXG4gKiBAZXhwb3J0XG4gKiBAcGFyYW0ge2FueVtdfSBhXG4gKiBAcGFyYW0ge2FueVtdfSBiXG4gKiBAcmV0dXJuIHsqfSAge2FueVtdfVxuICovXG5leHBvcnQgZnVuY3Rpb24gQ09OQ0FUKGE6IGFueVtdLCBiOiBhbnlbXSk6IGFueVtdIHtcbiAgcmV0dXJuIGEuY29uY2F0KGIpO1xufVxuXG4vKipcbiAqIFJlbW92ZXMgZHVwbGljYXRlIGVsZW1lbnRzIGZyb20gYW4gYXJyYXkuXG4gKlxuICogQGV4cG9ydFxuICogQHBhcmFtIHthbnlbXX0gYXJyXG4gKiBAcmV0dXJuIHsqfSAge2FueVtdfVxuICovXG5leHBvcnQgZnVuY3Rpb24gUkVNT1ZFX0RVUExJQ0FURVMoYXJyOiBhbnlbXSk6IGFueVtdIHtcbiAgcmV0dXJuIFsuLi5uZXcgTWFwKGFyci5tYXAodiA9PiBbSlNPTi5zdHJpbmdpZnkodiksIHZdKSkudmFsdWVzKCldO1xufVxuXG4vLyBSZXR1cm5zIHRoZSBkYXRlIG9idGFpbmVkIGJ5IGFkZGluZyBkYXlzIHRvIGRhdGUuXG5leHBvcnQgZnVuY3Rpb24gQUREX0RBWVMoZGF0ZTogc3RyaW5nLCBkYXlzOiBudW1iZXIpOiBzdHJpbmcge1xuICBjb25zdCBkID0gbmV3IERhdGUoZGF0ZSk7XG4gIGQuc2V0RGF0ZShkLmdldERhdGUoKSArIGRheXMpO1xuICByZXR1cm4gZC50b0pTT04oKS5zbGljZSgwLCAxMCk7XG59XG5cbi8vIFJldHVybnMgdGhlIGRpZmZlcmVuY2UgaW4gZGF5cyAoYSAtIGIpIGJldHdlZW4gdGhlIHR3byBkYXRlcy5cbmV4cG9ydCBmdW5jdGlvbiBEQVlTX0RJRkYoYTogc3RyaW5nLCBiOiBzdHJpbmcpOiBudW1iZXIge1xuICBjb25zdCBkYXRlQSA9IG5ldyBEYXRlKGEpO1xuICBjb25zdCBkYXRlQiA9IG5ldyBEYXRlKGIpO1xuICAvLyBVVEMgYXZvaWRzIGJ1Z3Mgd2l0aCBkYXlsaWdodCBzYXZpbmcgdGltZS5cbiAgY29uc3QgdXRjQSA9IERhdGUuVVRDKGRhdGVBLmdldEZ1bGxZZWFyKCksIGRhdGVBLmdldE1vbnRoKCksIGRhdGVBLmdldERhdGUoKSk7XG4gIGNvbnN0IHV0Y0IgPSBEYXRlLlVUQyhkYXRlQi5nZXRGdWxsWWVhcigpLCBkYXRlQi5nZXRNb250aCgpLCBkYXRlQi5nZXREYXRlKCkpO1xuXG4gIGNvbnN0IG1pbGxpc1BlckRheSA9IDEwMDAgKiA2MCAqIDYwICogMjQ7XG4gIHJldHVybiBNYXRoLmZsb29yKCh1dGNBIC0gdXRjQikgLyBtaWxsaXNQZXJEYXkpO1xufVxuXG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiBkYXRlIGlzIGJlZm9yZSBkYXRlVG9Db21wYXJlLlxuICpcbiAqIEBleHBvcnRcbiAqIEBwYXJhbSB7c3RyaW5nfSBkYXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gZGF0ZVRvQ29tcGFyZVxuICogQHJldHVybiB7Kn0gIHtib29sZWFufVxuICovXG5leHBvcnQgZnVuY3Rpb24gSVNfQkVGT1JFKGRhdGU6IHN0cmluZywgZGF0ZVRvQ29tcGFyZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gIHJldHVybiBkYXRlIDwgZGF0ZVRvQ29tcGFyZTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgZGF0ZSBpcyBhZnRlciBkYXRlVG9Db21wYXJlLlxuICpcbiAqIEBleHBvcnRcbiAqIEBwYXJhbSB7c3RyaW5nfSBkYXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gZGF0ZVRvQ29tcGFyZVxuICogQHJldHVybiB7Kn0gIHtib29sZWFufVxuICovXG5leHBvcnQgZnVuY3Rpb24gSVNfQUZURVIoZGF0ZTogc3RyaW5nLCBkYXRlVG9Db21wYXJlOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgcmV0dXJuIGRhdGUgPiBkYXRlVG9Db21wYXJlO1xufVxuXG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiBkYXRlIGlzIGJldHdlZW4gZGF0ZVN0YXJ0IGFuZCBkYXRlRW5kLlxuICpcbiAqIEBleHBvcnRcbiAqIEBwYXJhbSB7c3RyaW5nfSBkYXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gZGF0ZVN0YXJ0XG4gKiBAcGFyYW0ge3N0cmluZ30gZGF0ZUVuZFxuICogQHJldHVybiB7Kn0gIHtib29sZWFufVxuICovXG5leHBvcnQgZnVuY3Rpb24gSVNfV0lUSElOX0lOVEVSVkFMKGRhdGU6IHN0cmluZywgZGF0ZVN0YXJ0OiBzdHJpbmcsIGRhdGVFbmQ6IHN0cmluZyk6IGJvb2xlYW4ge1xuICByZXR1cm4gZGF0ZSA+PSBkYXRlU3RhcnQgJiYgZGF0ZSA8PSBkYXRlRW5kO1xufVxuXG4vKipcbiAqIENvbXBhcmVzIGRhdGUgd2l0aCBhbiBpbnRlcnZhbC5cbiAqIFJldHVybnMgJy0xJyAob3IgdGhlIGZpcnN0IGVsZW1lbnQgb2YgbGFiZWxzKSBpZiBkYXRlIGlzIGJlZm9yZSBkYXRlU3RhcnQsXG4gKiAnMCcgKG9yIHRoZSBzZWNvbmQgZWxlbWVudCkgaWYgZGF0ZSBpcyBiZXR3ZWVuIGRhdGVTdGFydCBhbmQgZGF0ZUVuZCxcbiAqICcxJyAob3IgdGhlIHRoaXJkIGVsZW1lbnQpIGlmIGRhdGUgaXMgYWZ0ZXIgZGF0ZUVuZC5cbiAqXG4gKiBAZXhwb3J0XG4gKiBAcGFyYW0ge3N0cmluZ30gZGF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IGRhdGVTdGFydFxuICogQHBhcmFtIHtzdHJpbmd9IGRhdGVFbmRcbiAqIEBwYXJhbSB7c3RyaW5nW119IGxhYmVscyBhbiBvcHRpb25hbCBhcnJheSBvZiBzdHJpbmcgZm9yIHRoZSBvdXRwdXQgdmFsdWVzXG4gKiBAcmV0dXJuIHsqfSAge3N0cmluZ31cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIENPTVBBUkVfREFURShcbiAgZGF0ZTogc3RyaW5nLFxuICBkYXRlU3RhcnQ6IHN0cmluZyxcbiAgZGF0ZUVuZDogc3RyaW5nLFxuICBsYWJlbHM/OiBzdHJpbmdbXSxcbik6IHN0cmluZyB7XG4gIGlmIChsYWJlbHMgPT0gbnVsbCkge1xuICAgIGxhYmVscyA9IFsnLTEnLCAnMCcsICcxJ107XG4gIH1cbiAgaWYgKElTX0JFRk9SRShkYXRlLCBkYXRlU3RhcnQpKSB7XG4gICAgcmV0dXJuIGxhYmVsc1swXTtcbiAgfVxuICBpZiAoSVNfV0lUSElOX0lOVEVSVkFMKGRhdGUsIGRhdGVTdGFydCwgZGF0ZUVuZCkpIHtcbiAgICByZXR1cm4gbGFiZWxzWzFdO1xuICB9XG4gIGlmIChJU19BRlRFUihkYXRlLCBkYXRlRW5kKSkge1xuICAgIHJldHVybiBsYWJlbHNbMl07XG4gIH1cbiAgcmV0dXJuICcnO1xufVxuXG4vKipcbiAqIFBlcmZvcm1zIGEgbGVmdCBqb2luIG9mIGZvcm1zQSBhbmQgZm9ybXNCLlxuICovXG5leHBvcnQgZnVuY3Rpb24gSk9JTl9GT1JNUyhcbiAgZm9ybXNBOiAoTWFpbkZvcm0gfCBGb3JtKVtdLFxuICBmb3Jtc0I6IChNYWluRm9ybSB8IEZvcm0pW10sXG4gIGtleUE6IHN0cmluZyxcbiAga2V5Qj86IHN0cmluZyxcbik6IChNYWluRm9ybSB8IEZvcm0pW10ge1xuICByZXR1cm4gSk9JTl9SRVBFQVRJTkdfU0xJREVTKGZvcm1zQSwgZm9ybXNCLCBrZXlBLCBrZXlCIGFzIGFueSwgbnVsbCBhcyBhbnkpO1xufVxuXG4vKipcbiAqIFBlcmZvcm1zIGEgbGVmdCBqb2luIG9mIGZvcm1zQSBhbmQgZm9ybXNCLCBsaWtlIEpPSU5fRk9STVMuXG4gKiBJbiBhZGRpdGlvbiwgZm9yIGVhY2ggbWF0Y2hpbmcgcGFpciBvZiBmb3JtQSBhbmQgZm9ybUIsIHRoZWlyIHJlcGVhdGluZyBzbGlkZXMgYXJlIGFsc28gam9pbmVkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gSk9JTl9SRVBFQVRJTkdfU0xJREVTKFxuICBmb3Jtc0E6IE1haW5Gb3JtW10sXG4gIGZvcm1zQjogTWFpbkZvcm1bXSxcbiAga2V5QTogc3RyaW5nLFxuICBrZXlCOiBzdHJpbmcsXG4gIHN1YmtleUE6IHN0cmluZyxcbiAgc3Via2V5Qj86IHN0cmluZyxcbik6IE1haW5Gb3JtW10ge1xuICBmb3Jtc0EgPSBjbG9uZU1haW5Gb3Jtcyhmb3Jtc0EgfHwgW10pO1xuICBmb3Jtc0IgPSBjbG9uZU1haW5Gb3Jtcyhmb3Jtc0IgfHwgW10pO1xuICBpZiAoa2V5QiA9PSBudWxsKSB7XG4gICAga2V5QiA9IGtleUE7XG4gIH1cbiAgaWYgKHN1YmtleUIgPT0gbnVsbCkge1xuICAgIHN1YmtleUIgPSBzdWJrZXlBO1xuICB9XG4gIGNvbnN0IGluZGV4Qjoge1t2YWw6IHN0cmluZ106IE1haW5Gb3JtfSA9IHt9O1xuICBmb3IgKGxldCBpID0gZm9ybXNCLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgY29uc3QgdmFsID0gZm9ybXNCW2ldICYmIGZvcm1zQltpXVtrZXlCXTtcbiAgICBpZiAodmFsICE9IG51bGwpIHtcbiAgICAgIGluZGV4QltTdHJpbmcodmFsKV0gPSBmb3Jtc0JbaV07XG4gICAgfVxuICB9XG4gIGNvbnN0IHJlczogTWFpbkZvcm1bXSA9IFtdO1xuICBmb3IgKGNvbnN0IGZvcm1BIG9mIGZvcm1zQSkge1xuICAgIGNvbnN0IHZhbCA9IGZvcm1BICYmIGZvcm1BW2tleUFdO1xuICAgIGNvbnN0IGZvcm1CID0gaW5kZXhCW1N0cmluZyh2YWwpXTtcbiAgICBpZiAodmFsID09IG51bGwgfHwgZm9ybUIgPT0gbnVsbCkge1xuICAgICAgcmVzLnB1c2goZm9ybUEpO1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGNvbnN0IHJlcHNBID0gZm9ybUEucmVwcyB8fCB7fTtcbiAgICBjb25zdCByZXBzQiA9IGZvcm1CLnJlcHMgfHwge307XG4gICAgaWYgKHN1YmtleUEgIT0gbnVsbCkge1xuICAgICAgY29uc3QgYWxsUmVwc0IgPSBhbGxSZXBzKGZvcm1CKTtcbiAgICAgIGZvciAoY29uc3QgayBpbiByZXBzQSkge1xuICAgICAgICByZXBzQVtrXSA9IEpPSU5fRk9STVMocmVwc0Fba10sIGFsbFJlcHNCLCBzdWJrZXlBLCBzdWJrZXlCKSBhcyBGb3JtW107XG4gICAgICAgIGZvcm1BW2BhamZfJHtrfV9jb3VudGBdID0gcmVwc0Fba10ubGVuZ3RoO1xuICAgICAgfVxuICAgIH1cbiAgICByZXMucHVzaCh7Li4uZm9ybUIsIC4uLmZvcm1BLCByZXBzOiB7Li4ucmVwc0IsIC4uLnJlcHNBfX0pO1xuICB9XG4gIHJldHVybiByZXM7XG59XG5cbi8qKlxuICogUmV0dXJucyB0aGUgYXJyYXkgb2J0YWluZWQgYnkgZXZhbHVhdGluZyBleHByZXNzaW9uIGZvciBldmVyeSByZXBldGl0aW9uIG9mIGZvcm0uXG4gKlxuICogQGV4cG9ydFxuICogQHBhcmFtIHtNYWluRm9ybX0gZm9ybVxuICogQHBhcmFtIHtzdHJpbmd9IGV4cHJlc3Npb25cbiAqIEByZXR1cm4geyp9ICB7YW55W119XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBGUk9NX1JFUFMoZm9ybTogTWFpbkZvcm0sIGV4cHJlc3Npb246IEZ1bmN8c3RyaW5nKTogYW55W10ge1xuICBpZiAodHlwZW9mKGV4cHJlc3Npb24pID09PSAnc3RyaW5nJykge1xuICAgIGV4cHJlc3Npb24gPSBjcmVhdGVGdW5jdGlvbihleHByZXNzaW9uKTtcbiAgfVxuICByZXR1cm4gYWxsUmVwcyhmb3JtIHx8IHt9KS5tYXAocmVwID0+XG4gICAgKGV4cHJlc3Npb24gYXMgRnVuYykoey4uLmZvcm0sIC4uLnJlcH0pXG4gICk7XG59XG5cbi8qKlxuICogRGVwcmVjYXRlZC4gVXNlIElOQ0xVREVTXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBJU0lOKGRhdGFzZXQ6IGFueVtdLCB2YWx1ZTogYW55KTogYm9vbGVhbiB7XG4gIGlmIChkYXRhc2V0ID09IG51bGwgfHwgdmFsdWUgPT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gZGF0YXNldC5pbmRleE9mKHZhbHVlKSA+PSAwO1xufVxuXG4vKipcbiAqIEFwcGxpZXMgdGhlIG9wZXJhdG9yIHRvIGV2ZXJ5IHBhaXIgb2YgZWxlbWVudHMgKGFycmF5QVtpXSwgYXJyYXlCW2ldKSxcbiAqIHJldHVybmluZyB0aGUgYXJyYXkgb2YgcmVzdWx0cy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIE9QKGFycmF5QTogYW55W10sIGFycmF5QjogYW55W10sIG9wZXJhdG9yOiAoKGE6IGFueSwgYjogYW55KSA9PiBhbnkpfHN0cmluZyk6IGFueVtdIHtcbiAgaWYgKHR5cGVvZihvcGVyYXRvcikgPT09ICdzdHJpbmcnKSB7XG4gICAgY29uc3QgZnVuYyA9IGNyZWF0ZUZ1bmN0aW9uKG9wZXJhdG9yKTtcbiAgICBvcGVyYXRvciA9IChlbGVtQSwgZWxlbUIpID0+IGZ1bmMoe2VsZW1BLCBlbGVtQn0pO1xuICB9XG4gIGNvbnN0IHJlczogYW55W10gPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBNYXRoLm1pbihhcnJheUEubGVuZ3RoLCBhcnJheUIubGVuZ3RoKTsgaSsrKSB7XG4gICAgY29uc3QgdmFsID0gb3BlcmF0b3IoYXJyYXlBW2ldLCBhcnJheUJbaV0pO1xuICAgIHJlcy5wdXNoKHZhbCk7XG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cblxuLyoqXG4gKiBHaXZlbiBhbiBhcnJheSBvZiB2YWx1ZXMsIHJldHVybnMgdGhlIGNvcnJlc3BvbmRpbmcgYXJyYXkgb2YgbGFiZWxzLFxuICogYXMgc3BlY2lmaWVkIGJ5IHRoZSBjaG9pY2VzIG9yaWdpbiBpbiBzY2hlbWEuXG4gKlxuICogQGV4cG9ydFxuICogQHBhcmFtIHsqfSBzY2hlbWFcbiAqIEBwYXJhbSB7c3RyaW5nW119IHZhbHVlc1xuICogQHJldHVybiB7Kn0gIHtzdHJpbmdbXX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIEdFVF9MQUJFTFMoc2NoZW1hOiBhbnksIHZhbHVlczogc3RyaW5nW10pOiBzdHJpbmdbXSB7XG4gIGNvbnN0IGNob2ljZUxhYmVscyA9IGV4dHJhY3RMYWJlbHNCeVNjaGVtYUNob2ljZXMoc2NoZW1hKTtcbiAgcmV0dXJuIHZhbHVlcy5tYXAodmFsID0+IGNob2ljZUxhYmVsc1t2YWxdICE9IG51bGwgPyBjaG9pY2VMYWJlbHNbdmFsXSA6IHZhbCk7XG59XG4iXX0=