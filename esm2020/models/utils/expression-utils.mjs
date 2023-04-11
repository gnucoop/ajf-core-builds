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
    plainArray: { fn: plainArray },
    COUNT_FORMS: { fn: COUNT_FORMS },
    COUNT_FORMS_UNIQUE: { fn: COUNT_FORMS_UNIQUE },
    COUNT_REPS: { fn: COUNT_REPS },
    SUM: { fn: SUM },
    MEAN: { fn: MEAN },
    PERCENT: { fn: PERCENT },
    LAST: { fn: LAST },
    FIRST: { fn: FIRST },
    MAX: { fn: MAX },
    MEDIAN: { fn: MEDIAN },
    MODE: { fn: MODE },
    ALL_VALUES_OF: { fn: ALL_VALUES_OF },
    REPEAT: { fn: REPEAT },
    EVALUATE: { fn: EVALUATE },
    INCLUDES: { fn: INCLUDES },
    buildDataset: { fn: buildDataset },
    buildAlignedDataset: { fn: buildAlignedDataset },
    buildFormDataset: { fn: buildFormDataset },
    buildAlignedFormDataset: { fn: buildAlignedFormDataset },
    buildWidgetDataset: { fn: buildWidgetDataset },
    buildWidgetDatasetWithDialog: { fn: buildWidgetDatasetWithDialog },
    FILTER_BY_VARS: { fn: FILTER_BY_VARS },
    FILTER_BY: { fn: FILTER_BY },
    ADD_DAYS: { fn: ADD_DAYS },
    DAYS_DIFF: { fn: DAYS_DIFF },
    IS_BEFORE: { fn: IS_BEFORE },
    IS_AFTER: { fn: IS_AFTER },
    IS_WITHIN_INTERVAL: { fn: IS_WITHIN_INTERVAL },
    COMPARE_DATE: { fn: COMPARE_DATE },
    APPLY: { fn: APPLY },
    TODAY: { fn: TODAY },
    GET_AGE: { fn: GET_AGE },
    BUILD_DATASET: { fn: BUILD_DATASET },
    JOIN_FORMS: { fn: JOIN_FORMS },
    LEN: { fn: LEN },
    CONCAT: { fn: CONCAT },
    REMOVE_DUPLICATES: { fn: REMOVE_DUPLICATES },
    JOIN_REPEATING_SLIDES: { fn: JOIN_REPEATING_SLIDES },
    FROM_REPS: { fn: FROM_REPS },
    ISIN: { fn: ISIN },
    MAP: { fn: MAP },
    OP: { fn: OP },
    GET_LABELS: { fn: GET_LABELS },
    APPLY_LABELS: { fn: APPLY_LABELS },
    ROUND: { fn: ROUND },
    CONSOLE_LOG: { fn: CONSOLE_LOG },
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
    const argNames = [...new Set(getCodeIdentifiers(expression, true)).add('execContext')];
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
    forms = (forms || []).filter(f => f != null).sort((a, b) => {
        const dateA = new Date(b[date]).getTime();
        const dateB = new Date(a[date]).getTime();
        return dateA - dateB;
    });
    if (forms.length === 0) {
        return undefined;
    }
    return expression(forms[0]);
}
/**
 * Evaluates the expression in the last form by date.
 */
export function LAST(forms, expression, date = 'created_at') {
    if (typeof (expression) === 'string') {
        expression = createFunction(expression);
    }
    forms = (forms || []).filter(f => f != null).sort((a, b) => {
        const dateA = new Date(b[date]).getTime();
        const dateB = new Date(a[date]).getTime();
        return dateA - dateB;
    });
    if (forms.length === 0) {
        return undefined;
    }
    return expression(forms[forms.length - 1]);
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
 * @param {string} [format='yyyy-MM-dd']
 * @return {*}  {string}
 */
export function TODAY(format = 'yyyy-MM-dd') {
    return dateFns.format(new Date(), format);
}
/**
 * Logs val to the console.
 *
 * @export
 * @param {*} val
 */
export function CONSOLE_LOG(val) {
    console.log(val);
}
/**
 * Computes the current age in years, given the date of birth.
 *
 * @export
 * @param {(string | null)} dob
 * @return {*}  {number}
 */
export function GET_AGE(dob) {
    if (dob == null) {
        return NaN;
    }
    return dateFns.differenceInYears(new Date(), new Date(dob));
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
    const dateA = dateFns.parseISO(date);
    const dateB = dateFns.parseISO(dateToCompare);
    return dateFns.isBefore(dateA, dateB);
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
    const dateA = dateFns.parseISO(date);
    const dateB = dateFns.parseISO(dateToCompare);
    return dateFns.isAfter(dateA, dateB);
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
    const dateToCompare = dateFns.parseISO(date);
    const interval = {
        start: dateFns.parseISO(dateStart),
        end: dateFns.parseISO(dateEnd),
    };
    return dateFns.isWithinInterval(dateToCompare, interval);
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
    const dateToCompare = dateFns.parseISO(date);
    const dateA = dateFns.parseISO(dateStart);
    const dateB = dateFns.parseISO(dateEnd);
    const interval = {
        start: dateA,
        end: dateB,
    };
    if (labels == null) {
        labels = ['-1', '0', '1'];
    }
    if (dateFns.isBefore(dateToCompare, dateA)) {
        return labels[0];
    }
    if (dateFns.isWithinInterval(dateToCompare, interval)) {
        return labels[1];
    }
    if (dateFns.isAfter(dateToCompare, dateB)) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwcmVzc2lvbi11dGlscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvbW9kZWxzL3NyYy91dGlscy9leHByZXNzaW9uLXV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUdILE9BQU8sS0FBSyxPQUFPLE1BQU0sVUFBVSxDQUFDO0FBQ3BDLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxTQUFTLENBQUM7QUFDcEMsT0FBTyxLQUFLLFNBQVMsTUFBTSxRQUFRLENBQUM7QUFJcEMsSUFBSSxXQUFXLEdBQVEsRUFBRSxDQUFDO0FBRTFCLE1BQU0sTUFBTSxHQUFHLFNBQVMsQ0FBQyxPQUFPLElBQUksU0FBUyxDQUFDO0FBWTlDLFNBQVMsT0FBTyxDQUFDLElBQWM7SUFDN0IsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksRUFBRTtRQUNyQixPQUFPLEVBQUUsQ0FBQztLQUNYO0lBQ0QsTUFBTSxJQUFJLEdBQVcsRUFBRSxDQUFDO0lBQ3hCLEtBQUssTUFBTSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtRQUMzQixNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztLQUNqQjtJQUNELE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQztBQUVELE1BQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQztBQUVwQixNQUFNLENBQUMsTUFBTSxrQkFBa0IsR0FBRyxDQUNoQyxNQUFjLEVBQ2QscUJBQThCLEtBQUssRUFDekIsRUFBRTtJQUNaLE1BQU0sV0FBVyxHQUFHLEVBQWMsQ0FBQztJQUNuQyxJQUFJO1FBQ0YsV0FBVyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsRUFBRTtZQUM3QixPQUFPLEVBQUUsQ0FBQyxLQUFL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QUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDL0QsTUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ2Y7SUFDRCxPQUFPLEdBQUcsQ0FBQztBQUNiLENBQUM7QUFFRDs7Ozs7Ozs7R0FRRztBQUNILE1BQU0sVUFBVSxVQUFVLENBQUMsTUFBVyxFQUFFLE1BQWdCO0lBQ3RELE1BQU0sWUFBWSxHQUFHLDRCQUE0QixDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzFELE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDaEYsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZDb250ZXh0fSBmcm9tICdAYWpmL2NvcmUvY29tbW9uJztcbmltcG9ydCAqIGFzIGRhdGVGbnMgZnJvbSAnZGF0ZS1mbnMnO1xuaW1wb3J0IHtwYXJzZVNjcmlwdH0gZnJvbSAnbWVyaXlhaCc7XG5pbXBvcnQgKiBhcyBudW1icm9Nb2QgZnJvbSAnbnVtYnJvJztcbmltcG9ydCB7QWpmVGFibGVDZWxsfSBmcm9tICdAYWpmL2NvcmUvdGFibGUnO1xuaW1wb3J0IHtBamZWYWxpZGF0aW9uRm59IGZyb20gJy4uL2ludGVyZmFjZS92YWxpZGF0aW9uLWZ1bmN0aW9uJztcblxubGV0IGV4ZWNDb250ZXh0OiBhbnkgPSB7fTtcblxuY29uc3QgbnVtYnJvID0gbnVtYnJvTW9kLmRlZmF1bHQgfHwgbnVtYnJvTW9kO1xuZXhwb3J0IGludGVyZmFjZSBGb3JtIHtcbiAgW2tleTogc3RyaW5nXTogc3RyaW5nIHwgbnVtYmVyIHwgbnVsbDtcbn1cbmV4cG9ydCBpbnRlcmZhY2UgSW5zdGFuY2VzIHtcbiAgW2luc3RhbmNlOiBzdHJpbmddOiBGb3JtW107XG59XG5leHBvcnQgaW50ZXJmYWNlIE1haW5Gb3JtIHtcbiAgW2tleTogc3RyaW5nXTogc3RyaW5nIHwgbnVtYmVyIHwgYm9vbGVhbiB8IG51bGwgfCBJbnN0YW5jZXMgfCB1bmRlZmluZWQgfCBudWxsO1xuICByZXBzPzogSW5zdGFuY2VzO1xufVxuXG5mdW5jdGlvbiBhbGxSZXBzKGZvcm06IE1haW5Gb3JtKTogRm9ybVtdIHtcbiAgaWYgKGZvcm0ucmVwcyA9PSBudWxsKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG4gIGNvbnN0IHJlcHM6IEZvcm1bXSA9IFtdO1xuICBmb3IgKGNvbnN0IGtleSBpbiBmb3JtLnJlcHMpIHtcbiAgICBjb25zdCByID0gZm9ybS5yZXBzW2tleV07XG4gICAgcmVwcy5wdXNoKC4uLnIpO1xuICB9XG4gIHJldHVybiByZXBzO1xufVxuXG5jb25zdCBNQVhfUkVQUyA9IDMwO1xuXG5leHBvcnQgY29uc3QgZ2V0Q29kZUlkZW50aWZpZXJzID0gKFxuICBzb3VyY2U6IHN0cmluZyxcbiAgaW5jbHVkZURvbGxhclZhbHVlOiBib29sZWFuID0gZmFsc2UsXG4pOiBzdHJpbmdbXSA9PiB7XG4gIGNvbnN0IGlkZW50aWZpZXJzID0gW10gYXMgc3RyaW5nW107XG4gIHRyeSB7XG4gICAgcGFyc2VTY3JpcHQoc291cmNlLnRvU3RyaW5nKCksIHtcbiAgICAgIG9uVG9rZW46ICh0b2tlbiwgc3RhcnQsIGVuZCkgPT4ge1xuICAgICAgICBpZiAodG9rZW4gPT0gJ0lkZW50aWZpZXInKSB7XG4gICAgICAgICAgY29uc3QgaWRlbnRpZmllciA9IHNvdXJjZS50b1N0cmluZygpLnN1YnN0cmluZyhzdGFydCwgZW5kKTtcbiAgICAgICAgICBpZiAoaW5jbHVkZURvbGxhclZhbHVlIHx8IGlkZW50aWZpZXIgIT09ICckdmFsdWUnKSB7XG4gICAgICAgICAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICB9KTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGNvbnNvbGUubG9nKHNvdXJjZSk7XG4gICAgY29uc29sZS5sb2coZSk7XG4gIH1cbiAgcmV0dXJuIGlkZW50aWZpZXJzLnNvcnQoKGkxLCBpMikgPT4gaTIubG9jYWxlQ29tcGFyZShpMSkpO1xufTtcblxuZXhwb3J0IGNvbnN0IGRhdGVVdGlscyA9IHtcbiAgYWRkRGF5czogZGF0ZUZucy5hZGREYXlzLFxuICBhZGRNb250aHM6IGRhdGVGbnMuYWRkTW9udGhzLFxuICBhZGRZZWFyczogZGF0ZUZucy5hZGRZZWFycyxcbiAgZW5kT2ZJU09XZWVrOiBkYXRlRm5zLmVuZE9mSVNPV2VlayxcbiAgZm9ybWF0OiBkYXRlRm5zLmZvcm1hdCxcbiAgZ2V0RGF5OiBkYXRlRm5zLmdldERheSxcbiAgcGFyc2U6IGRhdGVGbnMucGFyc2VJU08sXG4gIHN0YXJ0T2ZNb250aDogZGF0ZUZucy5zdGFydE9mTW9udGgsXG4gIHN0YXJ0T2ZJU09XZWVrOiBkYXRlRm5zLnN0YXJ0T2ZJU09XZWVrLFxuICBpc0JlZm9yZTogZGF0ZUZucy5pc0JlZm9yZSxcbn07XG5cbmV4cG9ydCBjbGFzcyBBamZFeHByZXNzaW9uVXRpbHMge1xuICAvLyBUT0RPIHdoYXQgaXMgaXQgZm9yXG4gIHN0YXRpYyBVVElMX0ZVTkNUSU9OUyA9ICcnO1xuICAvKipcbiAgICogSXQgaXMgYSBrZXktdmFsdWUgZGljdGlvbmFyeSwgdGhhdCBtYXBwaW5nIGFsbCBBamYgdmFsaWRhdGlvbiBmdW5jdGlvbnMuXG4gICAqL1xuICBzdGF0aWMgdXRpbHM6IHtbbmFtZTogc3RyaW5nXTogQWpmVmFsaWRhdGlvbkZufSA9IHtcbiAgICBkaWdpdENvdW50OiB7Zm46IGRpZ2l0Q291bnR9LFxuICAgIGRlY2ltYWxDb3VudDoge2ZuOiBkZWNpbWFsQ291bnR9LFxuICAgIGlzSW50OiB7Zm46IGlzSW50fSxcbiAgICBub3RFbXB0eToge2ZuOiBub3RFbXB0eX0sXG4gICAgdmFsdWVJbkNob2ljZToge2ZuOiB2YWx1ZUluQ2hvaWNlfSxcbiAgICBzY2FuR3JvdXBGaWVsZDoge2ZuOiBzY2FuR3JvdXBGaWVsZH0sXG4gICAgc3VtOiB7Zm46IHN1bX0sXG4gICAgZGF0ZU9wZXJhdGlvbnM6IHtmbjogZGF0ZU9wZXJhdGlvbnN9LFxuICAgIHJvdW5kOiB7Zm46IHJvdW5kfSxcbiAgICBleHRyYWN0QXJyYXk6IHtmbjogZXh0cmFjdEFycmF5fSxcbiAgICBleHRyYWN0U3VtOiB7Zm46IGV4dHJhY3RTdW19LFxuICAgIGV4dHJhY3RBcnJheVN1bToge2ZuOiBleHRyYWN0QXJyYXlTdW19LFxuICAgIGRyYXdUaHJlc2hvbGQ6IHtmbjogZHJhd1RocmVzaG9sZH0sXG4gICAgZXh0cmFjdERhdGVzOiB7Zm46IGV4dHJhY3REYXRlc30sXG4gICAgbGFzdFByb3BlcnR5OiB7Zm46IGxhc3RQcm9wZXJ0eX0sXG4gICAgc3VtTGFzdFByb3BlcnRpZXM6IHtmbjogc3VtTGFzdFByb3BlcnRpZXN9LFxuICAgIGNhbGN1bGF0ZVRyZW5kUHJvcGVydHk6IHtmbjogY2FsY3VsYXRlVHJlbmRQcm9wZXJ0eX0sXG4gICAgY2FsY3VsYXRlVHJlbmRCeVByb3BlcnRpZXM6IHtmbjogY2FsY3VsYXRlVHJlbmRCeVByb3BlcnRpZXN9LFxuICAgIGNhbGN1bGF0ZUF2Z1Byb3BlcnR5OiB7Zm46IGNhbGN1bGF0ZUF2Z1Byb3BlcnR5fSxcbiAgICBjYWxjdWxhdGVBdmdQcm9wZXJ0eUFycmF5OiB7Zm46IGNhbGN1bGF0ZUF2Z1Byb3BlcnR5QXJyYXl9LFxuICAgIGFsZXJ0OiB7Zm46IGFsZXJ0fSxcbiAgICBmb3JtYXROdW1iZXI6IHtmbjogZm9ybWF0TnVtYmVyfSxcbiAgICBmb3JtYXREYXRlOiB7Zm46IGZvcm1hdERhdGV9LFxuICAgIGlzb01vbnRoOiB7Zm46IGlzb01vbnRofSxcbiAgICBnZXRDb29yZGluYXRlOiB7Zm46IGdldENvb3JkaW5hdGV9LFxuICAgIE1hdGg6IHtmbjogTWF0aH0sXG4gICAgcGFyc2VJbnQ6IHtmbjogcGFyc2VJbnR9LFxuICAgIHBhcnNlRmxvYXQ6IHtmbjogcGFyc2VGbG9hdH0sXG4gICAgcGFyc2VEYXRlOiB7Zm46IGRhdGVVdGlscy5wYXJzZX0sXG4gICAgRGF0ZToge2ZuOiBEYXRlfSxcbiAgICBwbGFpbkFycmF5OiB7Zm46IHBsYWluQXJyYXl9LFxuICAgIENPVU5UX0ZPUk1TOiB7Zm46IENPVU5UX0ZPUk1TfSxcbiAgICBDT1VOVF9GT1JNU19VTklRVUU6IHtmbjogQ09VTlRfRk9STVNfVU5JUVVFfSxcbiAgICBDT1VOVF9SRVBTOiB7Zm46IENPVU5UX1JFUFN9LFxuICAgIFNVTToge2ZuOiBTVU19LFxuICAgIE1FQU46IHtmbjogTUVBTn0sXG4gICAgUEVSQ0VOVDoge2ZuOiBQRVJDRU5UfSxcbiAgICBMQVNUOiB7Zm46IExBU1R9LFxuICAgIEZJUlNUOiB7Zm46IEZJUlNUfSxcbiAgICBNQVg6IHtmbjogTUFYfSxcbiAgICBNRURJQU46IHtmbjogTUVESUFOfSxcbiAgICBNT0RFOiB7Zm46IE1PREV9LFxuICAgIEFMTF9WQUxVRVNfT0Y6IHtmbjogQUxMX1ZBTFVFU19PRn0sXG4gICAgUkVQRUFUOiB7Zm46IFJFUEVBVH0sXG4gICAgRVZBTFVBVEU6IHtmbjogRVZBTFVBVEV9LFxuICAgIElOQ0xVREVTOiB7Zm46IElOQ0xVREVTfSxcbiAgICBidWlsZERhdGFzZXQ6IHtmbjogYnVpbGREYXRhc2V0fSxcbiAgICBidWlsZEFsaWduZWREYXRhc2V0OiB7Zm46IGJ1aWxkQWxpZ25lZERhdGFzZXR9LFxuICAgIGJ1aWxkRm9ybURhdGFzZXQ6IHtmbjogYnVpbGRGb3JtRGF0YXNldH0sXG4gICAgYnVpbGRBbGlnbmVkRm9ybURhdGFzZXQ6IHtmbjogYnVpbGRBbGlnbmVkRm9ybURhdGFzZXR9LFxuICAgIGJ1aWxkV2lkZ2V0RGF0YXNldDoge2ZuOiBidWlsZFdpZGdldERhdGFzZXR9LFxuICAgIGJ1aWxkV2lkZ2V0RGF0YXNldFdpdGhEaWFsb2c6IHtmbjogYnVpbGRXaWRnZXREYXRhc2V0V2l0aERpYWxvZ30sXG4gICAgRklMVEVSX0JZX1ZBUlM6IHtmbjogRklMVEVSX0JZX1ZBUlN9LFxuICAgIEZJTFRFUl9CWToge2ZuOiBGSUxURVJfQll9LFxuICAgIEFERF9EQVlTOiB7Zm46IEFERF9EQVlTfSxcbiAgICBEQVlTX0RJRkY6IHtmbjogREFZU19ESUZGfSxcbiAgICBJU19CRUZPUkU6IHtmbjogSVNfQkVGT1JFfSxcbiAgICBJU19BRlRFUjoge2ZuOiBJU19BRlRFUn0sXG4gICAgSVNfV0lUSElOX0lOVEVSVkFMOiB7Zm46IElTX1dJVEhJTl9JTlRFUlZBTH0sXG4gICAgQ09NUEFSRV9EQVRFOiB7Zm46IENPTVBBUkVfREFURX0sXG4gICAgQVBQTFk6IHtmbjogQVBQTFl9LFxuICAgIFRPREFZOiB7Zm46IFRPREFZfSxcbiAgICBHRVRfQUdFOiB7Zm46IEdFVF9BR0V9LFxuICAgIEJVSUxEX0RBVEFTRVQ6IHtmbjogQlVJTERfREFUQVNFVH0sXG4gICAgSk9JTl9GT1JNUzoge2ZuOiBKT0lOX0ZPUk1TfSxcbiAgICBMRU46IHtmbjogTEVOfSxcbiAgICBDT05DQVQ6IHtmbjogQ09OQ0FUfSxcbiAgICBSRU1PVkVfRFVQTElDQVRFUzoge2ZuOiBSRU1PVkVfRFVQTElDQVRFU30sXG4gICAgSk9JTl9SRVBFQVRJTkdfU0xJREVTOiB7Zm46IEpPSU5fUkVQRUFUSU5HX1NMSURFU30sXG4gICAgRlJPTV9SRVBTOiB7Zm46IEZST01fUkVQU30sXG4gICAgSVNJTjoge2ZuOiBJU0lOfSxcbiAgICBNQVA6IHtmbjogTUFQfSxcbiAgICBPUDoge2ZuOiBPUH0sXG4gICAgR0VUX0xBQkVMUzoge2ZuOiBHRVRfTEFCRUxTfSxcbiAgICBBUFBMWV9MQUJFTFM6IHtmbjogQVBQTFlfTEFCRUxTfSxcbiAgICBST1VORDoge2ZuOiBST1VORH0sXG4gICAgQ09OU09MRV9MT0c6IHtmbjogQ09OU09MRV9MT0d9LFxuICB9O1xufVxuXG4vKipcbiAqIFVUSUxJVFkgRlVOQ0lPTlxuICogVGhpcyBmdW5jdGlvbiBwcm92aWRlIGEgZGVlcCBjb3B5IGJ1aWxkZXIgb2YgYXJyYXkgb2YgbWFpbiBmb3Jtcy5cbiAqIFRoYXQncyBhIGN1c3RvbSBmdW5jdGlvbiByZWxhdGVkIHRvIG1haW5mb3JtcyB0aGF0IGNhbiBiZSBhYmxlIHRvIGluY3JlYXNlIGNvcHkgcGVyZm9ybWFuY2UuXG4gKlxuICogQHBhcmFtIHtNYWluRm9ybVtdfSBmb3Jtc1xuICogQHJldHVybiB7Kn0gIHtNYWluRm9ybVtdfVxuICovXG5mdW5jdGlvbiBjbG9uZU1haW5Gb3Jtcyhmb3JtczogTWFpbkZvcm1bXSk6IE1haW5Gb3JtW10ge1xuICBsZXQgcmVzOiBNYWluRm9ybVtdID0gW107XG4gIGZvciAoY29uc3QgZm9ybSBvZiBmb3Jtcykge1xuICAgIGlmIChmb3JtID09IG51bGwpIHtcbiAgICAgIHJlcy5wdXNoKGZvcm0pO1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGxldCByZXBzOiBJbnN0YW5jZXMgPSB7fTtcbiAgICBpZiAoZm9ybS5yZXBzICE9IG51bGwpIHtcbiAgICAgIGZvciAoY29uc3Qga2V5IGluIGZvcm0ucmVwcykge1xuICAgICAgICByZXBzW2tleV0gPSBbLi4uZm9ybS5yZXBzW2tleV1dO1xuICAgICAgfVxuICAgIH1cbiAgICByZXMucHVzaCh7Li4uZm9ybSwgcmVwc30pO1xuICB9XG4gIHJldHVybiByZXM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBldmFsdWF0ZUV4cHJlc3Npb24oZXhwcmVzc2lvbjogc3RyaW5nLCBjb250ZXh0PzogQWpmQ29udGV4dCk6IGFueSB7XG4gIHJldHVybiBjcmVhdGVGdW5jdGlvbihleHByZXNzaW9uKShjb250ZXh0KTtcbn1cblxudHlwZSBGdW5jID0gKGM/OiBBamZDb250ZXh0KSA9PiBhbnk7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVGdW5jdGlvbihleHByZXNzaW9uOiBzdHJpbmcpOiBGdW5jIHtcbiAgaWYgKGV4cHJlc3Npb24gPT0gbnVsbCkge1xuICAgIHJldHVybiBfID0+IG51bGw7XG4gIH1cbiAgZXhwcmVzc2lvbiA9IFN0cmluZyhleHByZXNzaW9uKTtcbiAgaWYgKGV4cHJlc3Npb24gPT09ICd0cnVlJykge1xuICAgIHJldHVybiBfID0+IHRydWU7XG4gIH1cbiAgaWYgKGV4cHJlc3Npb24gPT09ICdmYWxzZScpIHtcbiAgICByZXR1cm4gXyA9PiBmYWxzZTtcbiAgfVxuICBpZiAoL15bYS16QS1aXyRdW1xcdyRdKiQvLnRlc3QoZXhwcmVzc2lvbikpIHsgLy8gZXhwcmVzc2lvbiBpcyBhbiBpZGVudGlmaWVyXG4gICAgcmV0dXJuIGMgPT4gYyA9PSBudWxsIHx8IGNbZXhwcmVzc2lvbl0gPT09IHVuZGVmaW5lZCA/IG51bGwgOiBjW2V4cHJlc3Npb25dO1xuICB9XG4gIGlmICgvXlwiW15cIl0qXCIkLy50ZXN0KGV4cHJlc3Npb24pIHx8IC9eJ1teJ10qJyQvLnRlc3QoZXhwcmVzc2lvbikpIHtcbiAgICBsZXQgc3RyID0gZXhwcmVzc2lvbi5zbGljZSgxLCAtMSk7XG4gICAgcmV0dXJuIF8gPT4gc3RyO1xuICB9XG5cbiAgY29uc3QgYXJnTmFtZXMgPSBbLi4ubmV3IFNldChnZXRDb2RlSWRlbnRpZmllcnMoZXhwcmVzc2lvbiwgdHJ1ZSkpLmFkZCgnZXhlY0NvbnRleHQnKV07XG4gIGxldCBmdW5jOiBGdW5jdGlvbjtcbiAgdHJ5IHtcbiAgICBmdW5jID0gbmV3IEZ1bmN0aW9uKC4uLmFyZ05hbWVzLCAncmV0dXJuICcgKyBleHByZXNzaW9uKTtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIF8gPT4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIGNvbnRleHQgPT4ge1xuICAgIGNvbnN0IGFyZ1ZhbHVlcyA9IGFyZ05hbWVzLm1hcChuYW1lID0+IHtcbiAgICAgIGlmIChjb250ZXh0ICE9IG51bGwgJiYgY29udGV4dFtuYW1lXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBjb250ZXh0W25hbWVdO1xuICAgICAgfVxuICAgICAgaWYgKEFqZkV4cHJlc3Npb25VdGlscy51dGlsc1tuYW1lXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBBamZFeHByZXNzaW9uVXRpbHMudXRpbHNbbmFtZV0uZm47XG4gICAgICB9XG4gICAgICBpZiAobmFtZSA9PT0gJ2V4ZWNDb250ZXh0Jykge1xuICAgICAgICByZXR1cm4gZXhlY0NvbnRleHQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9KTtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIGZ1bmMoLi4uYXJnVmFsdWVzKTtcbiAgICB9IGNhdGNoIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH07XG59XG5cbi8qKlxuICogSXQgcmV0dXJucyB0aGUgY291bnQgb2YgZGlnaXQgaW5zaWRlIHguXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkaWdpdENvdW50KHg6IG51bWJlcik6IG51bWJlciB7XG4gIGlmIChpc05hTih4KSB8fCB0eXBlb2YgeCAhPT0gJ251bWJlcicpIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuICBpZiAoIWlzRmluaXRlKHgpKSB7XG4gICAgcmV0dXJuIEluZmluaXR5O1xuICB9XG4gIHJldHVybiB4LnRvU3RyaW5nKCkucmVwbGFjZSgvW14wLTldL2csICcnKS5sZW5ndGg7XG59XG4vKipcbiAqIEl0IGlzIGNvdW50IHRoZSBjb3VudCBvZiBkZWNpbWFsIGRpZ2l0IGluc2lkZSBzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZGVjaW1hbENvdW50KHg6IHN0cmluZyB8IG51bWJlcik6IG51bWJlciB7XG4gIGlmICh0eXBlb2YgeCA9PT0gJ3N0cmluZycpIHtcbiAgICB4ID0gcGFyc2VGbG9hdCh4KTtcbiAgfVxuICBpZiAodHlwZW9mIHggIT09ICdudW1iZXInIHx8IGlzTmFOKHgpKSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cbiAgY29uc3QgcGFydHMgPSB4LnRvU3RyaW5nKCkuc3BsaXQoJy4nKTtcbiAgcmV0dXJuIHBhcnRzLmxlbmd0aCA+IDEgPyBwYXJ0c1sxXS5sZW5ndGggOiAwO1xufVxuLyoqXG4gKiBJdCBpcyB0cnVlIGlmIHggaXMgYW4gaW50ZWdlci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzSW50KHg6IHN0cmluZyB8IG51bWJlcik6IGJvb2xlYW4ge1xuICBpZiAodHlwZW9mIHggPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIC9eLT9cXGQrJC8udGVzdCh4KTtcbiAgfVxuICBpZiAodHlwZW9mIHggPT09ICdudW1iZXInKSB7XG4gICAgcmV0dXJuIE1hdGgucm91bmQoeCkgPT09IHg7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuLyoqXG4gKiBJdCBpcyB0cnVlIGlmIHggaXMgbm90IGVtcHR5LlxuICovXG5leHBvcnQgZnVuY3Rpb24gbm90RW1wdHkoeDogYW55KTogYm9vbGVhbiB7XG4gIHJldHVybiB0eXBlb2YgeCAhPT0gJ3VuZGVmaW5lZCcgJiYgeCAhPT0gbnVsbCA/IHgudG9TdHJpbmcoKS5sZW5ndGggPiAwIDogZmFsc2U7XG59XG4vKipcbiAqIEl0IGlzIHRydWUgaWYgYXJyYXkgY29udGFpbnMgeCBvciBhcnJheSBpcyBlcXVhbCB0byB4LlxuICovXG5leHBvcnQgZnVuY3Rpb24gdmFsdWVJbkNob2ljZShhcnJheTogYW55W10sIHg6IGFueSk6IGJvb2xlYW4ge1xuICByZXR1cm4gKGFycmF5IHx8IFtdKS5pbmRleE9mKHgpID4gLTEgfHwgYXJyYXkgPT09IHg7XG59XG4vKipcbiAqIEl0IGFwcGxpZXMgY2FsbGJhY2sgZm9yIHJlcHMgdGltZXMgYW5kIGFjY3VtdWxhdGUgdGhlIHJlc3VsdCBpbiBhY2MuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzY2FuR3JvdXBGaWVsZChyZXBzOiBudW1iZXIsIGFjYzogYW55LCBjYWxsYmFjazogYW55KTogYW55IHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXBzOyBpKyspIHtcbiAgICBhY2MgPSBjYWxsYmFjayhhY2MsIGkpO1xuICB9XG4gIHJldHVybiBhY2M7XG59XG4vKipcbiAqIEl0IHJldHVybnMgdGhlIHN1bSBvZiB0aGUgYXJyYXkgdmFsdWVzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gc3VtKGFycmF5OiBhbnlbXSk6IGFueSB7XG4gIHJldHVybiBhcnJheS5yZWR1Y2UoKGEsIGIpID0+IGEgKyBiLCAwKTtcbn1cbi8qKlxuICogSXQgYXBwbGllcyBhZGQvcmVtb3ZlKG9wZXJhdGlvbikgdiAoZGF5L21vbnRoL3llYXIpcGVyaW9kIHRvIGRzdHJpbmcgYW5kIHJldHVybiBuZXcgZm9ybWF0IGRhdGUuXG4gKi9cbi8vIFRPRE8gY2hlY2sgaWYgZGVwcmVjYXRlZCBpbnN0ZWFkIHJlZmFjb3RvcmluZyBwYXJhbWV0ZXIgdHlwZVxuLy8gVE9ETyAoZFN0cmluZzogc3RyaW5nfG51bGwsIHBlcmlvZDonZGF5J3wnbW9udGgnfCd5ZWFyJyxcbi8vIFRPRE8gb3BlcmF0aW9uOiAnYWRkL3JlbW92ZScgPSAnYWRkJywgdjpudW1iZXIpXG5leHBvcnQgZnVuY3Rpb24gZGF0ZU9wZXJhdGlvbnMoZFN0cmluZzogc3RyaW5nLCBwZXJpb2Q6IHN0cmluZywgb3BlcmF0aW9uOiBzdHJpbmcsIHY6IGFueSk6IHN0cmluZyB7XG4gIGNvbnN0IGZtdCA9ICdtbS9kZC95eXl5JztcbiAgbGV0IGQgPSB0eXBlb2YgZFN0cmluZyAhPT0gJ3VuZGVmaW5lZCcgPyBkYXRlVXRpbHMucGFyc2UoZFN0cmluZykgOiBuZXcgRGF0ZSgpO1xuICBpZiAob3BlcmF0aW9uID09ICdyZW1vdmUnKSB7XG4gICAgdiA9IC12O1xuICB9XG4gIGxldCBkYXRlT3A7XG4gIHN3aXRjaCAocGVyaW9kKSB7XG4gICAgY2FzZSAnZGF5JzpcbiAgICAgIGRhdGVPcCA9IGRhdGVVdGlscy5hZGREYXlzO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnbW9udGgnOlxuICAgICAgZGF0ZU9wID0gZGF0ZVV0aWxzLmFkZE1vbnRocztcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3llYXInOlxuICAgICAgZGF0ZU9wID0gZGF0ZVV0aWxzLmFkZFllYXJzO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiAnJztcbiAgfVxuICByZXR1cm4gZGF0ZVV0aWxzLmZvcm1hdChkYXRlT3AoZCwgdiksIGZtdCk7XG59XG5cbi8qKlxuICogRml4ZWQgZGVjaW1hbHMgZm9yIGZsb2F0aW5nIG51bWJlclxuICogUmVzb2x2ZSBmbG9hdCBzdW0gcHJvYmxlbXMgbGlrZSB0aGlzOiAwLjEgKyAwLjIgPSAwLjMwMDAwMDAwMDAwMDAwMDA0XG4gKiBAcGFyYW0gbnVtXG4gKiBAcmV0dXJuc1xuICovXG5mdW5jdGlvbiB0cnVuY2F0ZTEwKG51bTogbnVtYmVyKSB7XG4gIHJldHVybiBwYXJzZUZsb2F0KG51bS50b0ZpeGVkKDEwKSk7XG59XG5cbi8qKlxuICogSXQgcm91bmRzIHRoZSBudW0gd2l0aCB0aGUgdmFsdWUgb2YgZGlnaXRzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByb3VuZChudW06IG51bWJlciB8IHN0cmluZywgZGlnaXRzPzogbnVtYmVyKTogbnVtYmVyIHtcbiAgZGlnaXRzID0gZGlnaXRzIHx8IDA7XG4gIGxldCBmO1xuICBpZiAodHlwZW9mIG51bSAhPT0gJ251bWJlcicpIHtcbiAgICB0cnkge1xuICAgICAgZiA9IHBhcnNlRmxvYXQobnVtKTtcbiAgICB9IGNhdGNoIChlKSB7fVxuICB9IGVsc2Uge1xuICAgIGYgPSBudW07XG4gIH1cbiAgaWYgKGYgPT0gbnVsbCB8fCBpc05hTihmKSkge1xuICAgIGYgPSAwO1xuICB9XG4gIGNvbnN0IG0gPSBNYXRoLnBvdygxMCwgZGlnaXRzKTtcbiAgcmV0dXJuIE1hdGgucm91bmQoZiAqIG0pIC8gbTtcbn1cbi8qKlxuICogSXQgZXh0cmFjdHMgcHJvcGVydHkgZnJvbSBzb3VyY2UuXG4gKiBmb3IgZXZlcnkgZWxlbWVudCBvZiBzb3VyY2UgaWYgcHJvcGVydHkgYW5kIHByb3BlcnR5MiBhcmUgZGVmaW5lZCByZXR1cm4gdGhlIHN1bVxuICogZWxzZSBpZiBvbmx5IHByb3BlcnR5IGlzIGRlZmluZWQgcmV0dXJuIGhpbS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGV4dHJhY3RBcnJheShzb3VyY2U6IGFueVtdLCBwcm9wZXJ0eTogc3RyaW5nLCBwcm9wZXJ0eTI/OiBzdHJpbmcpOiBhbnlbXSB7XG4gIHNvdXJjZSA9IChzb3VyY2UgfHwgW10pLmZpbHRlcigoZjogYW55KSA9PiBmICE9IG51bGwpO1xuICBjb25zdCByZXM6IGFueVtdID0gW107XG4gIGZvciAoY29uc3QgcyBvZiBzb3VyY2UpIHtcbiAgICBpZiAoc1twcm9wZXJ0eV0gIT0gbnVsbCAmJiBwcm9wZXJ0eTIgIT0gbnVsbCAmJiBzW3Byb3BlcnR5Ml0gIT0gbnVsbCkge1xuICAgICAgcmVzLnB1c2goTnVtYmVyKHNbcHJvcGVydHldKSArIE51bWJlcihzW3Byb3BlcnR5Ml0pKTtcbiAgICB9IGVsc2UgaWYgKHNbcHJvcGVydHldICE9IG51bGwpIHtcbiAgICAgIHJlcy5wdXNoKHNbcHJvcGVydHldKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cbi8qKlxuICogSXQgcmV0dXJucyB0aGUgc3VtIG9mIGFsbCBkZWZpbmVkIHByb3BlcnRpZXMgb2YgZWFjaCBlbGVtZW50IG9mIHNvdXJjZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGV4dHJhY3RTdW0oc291cmNlOiBhbnlbXSwgcHJvcGVydGllczogc3RyaW5nW10pOiBudW1iZXIge1xuICBwcm9wZXJ0aWVzID0gWy4uLihwcm9wZXJ0aWVzIHx8IFtdKV07XG5cbiAgbGV0IHN1bVZhbCA9IDA7XG4gIGZvciAoY29uc3QgcHJvcCBvZiBwcm9wZXJ0aWVzKSB7XG4gICAgY29uc3QgYXJyYXkgPSBleHRyYWN0QXJyYXkoc291cmNlLCBwcm9wKTtcbiAgICBmb3IgKGNvbnN0IGEgb2YgYXJyYXkpIHtcbiAgICAgIGlmICghaXNOYU4oTnVtYmVyKGEpKSkge1xuICAgICAgICBzdW1WYWwgKz0gTnVtYmVyKGEpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gc3VtVmFsO1xufVxuLyoqXG4gKiBJdCByZXR1cm5zIGEgbnVtYmVyIGFycmF5IHRoYXQgY29udGFpbnMgdGhlIHN1bSBvZiBwcm9wZXJ0aWVzIHZhbHVlIGluc2lkZSB0aGUgc291cmNlLlxuICogZXh0cmFjdEFycmF5U3VtKFt7YTogNX0sIHtiOiAxfSwge2E6IDUsIGI6IDF9XSwgWydhJywgJ2InXSk7ID0mZ3Q7IFs2LDZdXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBleHRyYWN0QXJyYXlTdW0oc291cmNlOiBhbnlbXSwgcHJvcGVydGllczogc3RyaW5nW10pOiBhbnlbXSB7XG4gIGNvbnN0IGFycmF5czogYW55W10gPSBbXTtcbiAgcHJvcGVydGllcyA9IFsuLi4ocHJvcGVydGllcyB8fCBbXSldO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvcGVydGllcy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGFycmF5ID0gZXh0cmFjdEFycmF5KHNvdXJjZSwgcHJvcGVydGllc1tpXSk7XG4gICAgYXJyYXlzLnB1c2goYXJyYXkpO1xuICB9XG5cbiAgY29uc3QgcmVzOiBhbnlbXSA9IFtdO1xuICBpZiAoYXJyYXlzLmxlbmd0aCA+IDApIHtcbiAgICBmb3IgKGxldCB3ZWVrSSA9IDA7IHdlZWtJIDwgYXJyYXlzWzBdLmxlbmd0aDsgd2Vla0krKykge1xuICAgICAgbGV0IHN1bVZhbCA9IDA7XG4gICAgICBmb3IgKGxldCBwcm9wSSA9IDA7IHByb3BJIDwgcHJvcGVydGllcy5sZW5ndGg7IHByb3BJKyspIHtcbiAgICAgICAgc3VtVmFsID0gc3VtVmFsICsgTnVtYmVyKGFycmF5c1twcm9wSV1bd2Vla0ldKTtcbiAgICAgIH1cbiAgICAgIHJlcy5wdXNoKHN1bVZhbCk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXM7XG59XG4vKipcbiAqIERyYXcgYSB0aHJlc2hvbGQgbGluZSBvbiBjaGFydCByZWxhdGVkIHRvIHRoZSBwcm9wZXJ0eS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRyYXdUaHJlc2hvbGQoc291cmNlOiBhbnlbXSwgcHJvcGVydHk6IHN0cmluZywgdGhyZXNob2xkOiBhbnlbXSk6IGFueVtdIHtcbiAgc291cmNlID0gKHNvdXJjZSB8fCBbXSkuZmlsdGVyKChmOiBhbnkpID0+IGYgIT0gbnVsbCk7XG4gIHRocmVzaG9sZCA9IHRocmVzaG9sZCB8fCBbMF07XG4gIGlmICghKHRocmVzaG9sZCBpbnN0YW5jZW9mIEFycmF5KSkge1xuICAgIHRocmVzaG9sZCA9IFt0aHJlc2hvbGRdO1xuICB9XG4gIGNvbnN0IGwgPSBzb3VyY2UubGVuZ3RoO1xuICBjb25zdCByZXM6IGFueVtdID0gW107XG4gIGxldCBjb3VudCA9IDA7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbDsgaSsrKSB7XG4gICAgaWYgKHNvdXJjZVtpXVtwcm9wZXJ0eV0gIT0gbnVsbCkge1xuICAgICAgaWYgKHRocmVzaG9sZC5sZW5ndGggPiBjb3VudCkge1xuICAgICAgICByZXMucHVzaCh0aHJlc2hvbGRbY291bnRdKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlcy5wdXNoKHRocmVzaG9sZFswXSk7XG4gICAgICB9XG4gICAgICBjb3VudCsrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzO1xufVxuLyoqXG4gKiBFeHRyYWN0IHRoZSBkYXRlcyBvZiB0aGUgc291cmNlIG9iamVjdCB3aXRoIHByb3BlcnR5ICE9IG51bGxcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGV4dHJhY3REYXRlcyhzb3VyY2U6IGFueVtdLCBwcm9wZXJ0eTogc3RyaW5nLCBmbXQ6IHN0cmluZyk6IHN0cmluZ1tdIHtcbiAgc291cmNlID0gKHNvdXJjZSB8fCBbXSkuZmlsdGVyKChmOiBhbnkpID0+IGYgIT0gbnVsbCk7XG4gIGNvbnN0IGwgPSBzb3VyY2UubGVuZ3RoO1xuICBjb25zdCByZXM6IGFueSA9IFtdO1xuICBsZXQgcHJlZml4ID0gJyc7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbDsgaSsrKSB7XG4gICAgaWYgKHNvdXJjZVtpXVtwcm9wZXJ0eV0gIT0gbnVsbCkge1xuICAgICAgc3dpdGNoIChmbXQpIHtcbiAgICAgICAgY2FzZSAnV1cnOlxuICAgICAgICBjYXNlICd3dyc6XG4gICAgICAgICAgcHJlZml4ID0gJ1cnO1xuICAgICAgICAgIHJlcy5wdXNoKHByZWZpeCArIGZvcm1hdERhdGUoc291cmNlW2ldWydkYXRlX3N0YXJ0J10sIGZtdCkpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdNTSc6XG4gICAgICAgIGNhc2UgJ21tJzpcbiAgICAgICAgICBwcmVmaXggPSAnTSc7XG4gICAgICAgICAgcmVzLnB1c2gocHJlZml4ICsgaXNvTW9udGgoc291cmNlW2ldWydkYXRlX3N0YXJ0J10sIGZtdCkpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHByZWZpeCA9ICcnO1xuICAgICAgICAgIHJlcy5wdXNoKHByZWZpeCArIGZvcm1hdERhdGUoc291cmNlW2ldWydkYXRlX3N0YXJ0J10sIGZtdCkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzO1xufVxuLyoqXG4gKiBFeHRyYWN0IHRoZSBsYXN0IHByb3BlcnR5IGNvbnRhaW5zIGluIHNvdXJjZSAhPSBudWxsXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBsYXN0UHJvcGVydHkoc291cmNlOiBhbnksIHByb3BlcnR5OiBzdHJpbmcpOiBhbnkge1xuICBzb3VyY2UgPSAoc291cmNlIHx8IFtdKS5maWx0ZXIoKGY6IGFueSkgPT4gZiAhPSBudWxsKTtcbiAgbGV0IGwgPSBzb3VyY2UubGVuZ3RoIC0gMTtcblxuICB3aGlsZSAobCA+PSAwICYmIHNvdXJjZVtsXVtwcm9wZXJ0eV0gPT0gbnVsbCkge1xuICAgIGwtLTtcbiAgICBpZiAobCA8IDApIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGwgPj0gMCA/IHNvdXJjZVtsXVtwcm9wZXJ0eV0gOiAnJztcbn1cbi8qKlxuICogSXQgc3VtIHRoZSBMQXN0IHByb3BlcnRpZXMgb2Ygc291cmNlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gc3VtTGFzdFByb3BlcnRpZXMoc291cmNlOiBhbnlbXSwgcHJvcGVydGllczogc3RyaW5nW10pOiBudW1iZXIge1xuICBzb3VyY2UgPSAoc291cmNlIHx8IFtdKS5maWx0ZXIoKGY6IGFueSkgPT4gZiAhPSBudWxsKTtcbiAgbGV0IHN1bVZhbCA9IDA7XG4gIGxldCB2YWwgPSAwO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHByb3BlcnRpZXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YWwgPSBOdW1iZXIobGFzdFByb3BlcnR5KHNvdXJjZSwgcHJvcGVydGllc1tpXSkpO1xuICAgIGlmICghaXNOYU4odmFsKSkge1xuICAgICAgc3VtVmFsICs9IHZhbDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHN1bVZhbDtcbn1cbi8qKlxuICogQ29tcHV0ZSB0aGUgdHJlbmQgb2YgdGhlIHByb3BlcnR5IGNvbnRhaW5lZCBvbiB0aGUgc291cmNlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gY2FsY3VsYXRlVHJlbmRQcm9wZXJ0eShzb3VyY2U6IGFueVtdLCBwcm9wZXJ0eTogc3RyaW5nKTogc3RyaW5nIHtcbiAgc291cmNlID0gKHNvdXJjZSB8fCBbXSkuZmlsdGVyKChmOiBhbnkpID0+IGYgIT0gbnVsbCk7XG4gIGxldCBsYXN0ID0gc291cmNlLmxlbmd0aCAtIDE7XG4gIHdoaWxlIChzb3VyY2VbbGFzdF1bcHJvcGVydHldID09IG51bGwpIHtcbiAgICBpZiAobGFzdCA9PSAwKSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgbGFzdC0tO1xuICB9XG4gIGxldCBsYXN0TGFzdCA9IGxhc3QgLSAxO1xuICBpZiAobGFzdCA9PSAwKSB7XG4gICAgbGFzdExhc3QgPSBsYXN0O1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzb3VyY2VbbGFzdExhc3RdW3Byb3BlcnR5XSA9PSBudWxsKSB7XG4gICAgICBpZiAobGFzdExhc3QgPT0gMCkge1xuICAgICAgICBsYXN0TGFzdCA9IGxhc3Q7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgbGFzdExhc3QtLTtcbiAgICB9XG4gIH1cblxuICBjb25zdCBsYXN0UHJvcCA9IHNvdXJjZVtsYXN0XSA/IHNvdXJjZVtsYXN0XVtwcm9wZXJ0eV0gfHwgMCA6IDA7XG4gIGNvbnN0IGxhc3RMYXN0UHJvcCA9IHNvdXJjZVtsYXN0TGFzdF0gPyBzb3VyY2VbbGFzdExhc3RdW3Byb3BlcnR5XSB8fCAwIDogMDtcblxuICBpZiAobGFzdFByb3AgPT0gbGFzdExhc3RQcm9wKSB7XG4gICAgcmV0dXJuICc8cD48aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCIgc3R5bGU9XCJjb2xvcjpibHVlXCI+dHJlbmRpbmdfZmxhdDwvaT48L3A+JztcbiAgfSBlbHNlIGlmIChsYXN0UHJvcCA+IGxhc3RMYXN0UHJvcCkge1xuICAgIHJldHVybiAnPHA+PGkgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiIHN0eWxlPVwiY29sb3I6Z3JlZW5cIj50cmVuZGluZ191cDwvaT48L3A+JztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gJzxwPjxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIiBzdHlsZT1cImNvbG9yOnJlZFwiPnRyZW5kaW5nX2Rvd248L2k+PC9wPic7XG4gIH1cbn1cbi8qKlxuICogQ29tcHV0ZSB0aGUgYXZlcmFnZSB2YWx1ZSBvZiB0aGUgcHJvcGVydHkgY29udGFpbmVkIG9uIHRoZSBzb3VyY2UuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjYWxjdWxhdGVUcmVuZEJ5UHJvcGVydGllcyhzb3VyY2U6IGFueVtdLCBwcm9wZXJ0aWVzOiBzdHJpbmdbXSk6IHN0cmluZyB7XG4gIGNvbnN0IGFycmF5c3VtID0gZXh0cmFjdEFycmF5U3VtKHNvdXJjZSwgcHJvcGVydGllcyk7XG5cbiAgY29uc3QgbGFzdFByb3AgPSBhcnJheXN1bS5sZW5ndGggPiAwID8gYXJyYXlzdW1bYXJyYXlzdW0ubGVuZ3RoIC0gMV0gfHwgMCA6IDA7XG4gIGNvbnN0IGxhc3RMYXN0UHJvcCA9IGFycmF5c3VtLmxlbmd0aCA+IDEgPyBhcnJheXN1bVthcnJheXN1bS5sZW5ndGggLSAyXSB8fCAwIDogbGFzdFByb3A7XG5cbiAgaWYgKGxhc3RQcm9wID09IGxhc3RMYXN0UHJvcCkge1xuICAgIHJldHVybiAnPHA+PGkgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiIHN0eWxlPVwiY29sb3I6Ymx1ZVwiPnRyZW5kaW5nX2ZsYXQ8L2k+PC9wPic7XG4gIH0gZWxzZSBpZiAobGFzdFByb3AgPiBsYXN0TGFzdFByb3ApIHtcbiAgICByZXR1cm4gJzxwPjxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIiBzdHlsZT1cImNvbG9yOmdyZWVuXCI+dHJlbmRpbmdfdXA8L2k+PC9wPic7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuICc8cD48aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCIgc3R5bGU9XCJjb2xvcjpyZWRcIj50cmVuZGluZ19kb3duPC9pPjwvcD4nO1xuICB9XG59XG4vKipcbiAqXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjYWxjdWxhdGVBdmdQcm9wZXJ0eShcbiAgc291cmNlOiBhbnlbXSxcbiAgcHJvcGVydHk6IHN0cmluZyxcbiAgcmFuZ2U6IG51bWJlcixcbiAgY29lZmZpY2llbnQ6IG51bWJlcixcbik6IG51bWJlciB7XG4gIHNvdXJjZSA9IChzb3VyY2UgfHwgW10pLmZpbHRlcigoZjogYW55KSA9PiBmICE9IG51bGwpO1xuXG4gIGNvZWZmaWNpZW50ID0gY29lZmZpY2llbnQgfHwgMTtcbiAgcmFuZ2UgPSByYW5nZSB8fCAxMjtcblxuICBsZXQgbCA9IHNvdXJjZS5sZW5ndGg7XG4gIGxldCByZXMgPSAwO1xuICBsZXQgY291bnRlciA9IDA7XG4gIGxldCBub1plcm8gPSAwO1xuXG4gIGlmIChsIDwgcmFuZ2UpIHtcbiAgICByYW5nZSA9IGw7XG4gIH1cblxuICB3aGlsZSAocmFuZ2UgIT0gMCkge1xuICAgIGlmIChzb3VyY2VbbCAtIDFdW3Byb3BlcnR5XSAhPSBudWxsKSB7XG4gICAgICBjb3VudGVyKys7XG4gICAgICByZXMgKz0gTnVtYmVyKHNvdXJjZVtsIC0gMV1bcHJvcGVydHldKTtcblxuICAgICAgaWYgKHNvdXJjZVtsIC0gMV1bcHJvcGVydHldID4gMCkge1xuICAgICAgICBub1plcm8rKztcbiAgICAgIH1cbiAgICB9XG4gICAgbC0tO1xuICAgIHJhbmdlLS07XG4gIH1cblxuICBpZiAoY29lZmZpY2llbnQgPT0gMCkge1xuICAgIHJldHVybiBub1plcm87XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHJvdW5kKChyZXMgLyBjb3VudGVyKSAqIGNvZWZmaWNpZW50LCAyKSB8fCAwO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjYWxjdWxhdGVBdmdQcm9wZXJ0eUFycmF5KFxuICBzb3VyY2U6IGFueVtdLFxuICBwcm9wZXJ0aWVzOiBzdHJpbmdbXSxcbiAgcmFuZ2U6IG51bWJlcixcbiAgY29lZmZpY2llbnQ6IG51bWJlcixcbik6IG51bWJlcltdIHtcbiAgc291cmNlID0gKHNvdXJjZSB8fCBbXSkuZmlsdGVyKChmOiBhbnkpID0+IGYgIT0gbnVsbCk7XG4gIGNvbnN0IHJlc0FycjogYW55W10gPSBbXTtcblxuICBpZiAocHJvcGVydGllcyAmJiBwcm9wZXJ0aWVzLmxlbmd0aCA+IDApIHtcbiAgICBsZXQgYXZnID0gMDtcblxuICAgIGNvZWZmaWNpZW50ID0gY29lZmZpY2llbnQgfHwgMTtcbiAgICByYW5nZSA9IHJhbmdlIHx8IDEyO1xuXG4gICAgY29uc3Qgc291cmNlQXJyID1cbiAgICAgIHByb3BlcnRpZXMubGVuZ3RoID4gMVxuICAgICAgICA/IGV4dHJhY3RBcnJheVN1bShzb3VyY2UsIHByb3BlcnRpZXMpXG4gICAgICAgIDogZXh0cmFjdEFycmF5KHNvdXJjZSwgcHJvcGVydGllc1swXSk7XG5cbiAgICBsZXQgbCA9IHNvdXJjZUFyci5sZW5ndGg7XG5cbiAgICBmb3IgKGxldCBsZW4gPSBsOyBsZW4gPiAwOyBsZW4tLSkge1xuICAgICAgbGV0IHJlcyA9IDA7XG4gICAgICBsZXQgY291bnRlciA9IDA7XG4gICAgICBsZXQgbm9aZXJvID0gMDtcblxuICAgICAgaWYgKGxlbiA8IHJhbmdlKSB7XG4gICAgICAgIHJhbmdlID0gbGVuO1xuICAgICAgfVxuXG4gICAgICBmb3IgKGxldCByID0gMTsgciA8PSByYW5nZTsgcisrKSB7XG4gICAgICAgIGxldCB2YWwgPSBzb3VyY2VBcnJbbGVuIC0gcl07XG4gICAgICAgIGlmICh2YWwgIT0gbnVsbCkge1xuICAgICAgICAgIGNvdW50ZXIrKztcbiAgICAgICAgICByZXMgKz0gTnVtYmVyKHZhbCk7XG4gICAgICAgICAgaWYgKHZhbCA+IDApIHtcbiAgICAgICAgICAgIG5vWmVybysrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoY291bnRlciA+IDApIHtcbiAgICAgICAgaWYgKGNvZWZmaWNpZW50ID09IDApIHtcbiAgICAgICAgICBhdmcgPSBub1plcm87XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYXZnID0gKHJlcyAvIGNvdW50ZXIpICogY29lZmZpY2llbnQgfHwgMDtcbiAgICAgICAgfVxuICAgICAgICByZXNBcnIucHVzaChyb3VuZChhdmcsIDIpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc0Fyci5yZXZlcnNlKCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhbGVydChzb3VyY2U6IGFueVtdLCBwcm9wZXJ0eTogc3RyaW5nLCB0aHJlc2hvbGQ6IG51bWJlcik6IHN0cmluZyB7XG4gIHNvdXJjZSA9IFsuLi4oc291cmNlIHx8IFtdKV07XG5cbiAgaWYgKGxhc3RQcm9wZXJ0eShzb3VyY2UsIHByb3BlcnR5KSA+IHRocmVzaG9sZCkge1xuICAgIHJldHVybiAnPHA+PGkgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiIHN0eWxlPVwiY29sb3I6cmVkXCI+d2FybmluZzwvaT48L3A+JztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gJzxwPjwvcD4nO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXROdW1iZXIobnVtOiBudW1iZXIsIGZtdD86IHN0cmluZyk6IHN0cmluZyB7XG4gIGZtdCA9IGZtdCB8fCAnMCwwWy5dMCc7XG4gIHJldHVybiBudW1icm8obnVtKS5mb3JtYXQoZm10KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdERhdGUoZGF0ZTogRGF0ZSB8IHN0cmluZywgZm10Pzogc3RyaW5nKTogc3RyaW5nIHtcbiAgZm10ID0gZm10IHx8ICdtbS1ERC15eXl5JztcbiAgcmV0dXJuIGRhdGVVdGlscy5mb3JtYXQodHlwZW9mIGRhdGUgPT09ICdzdHJpbmcnID8gZGF0ZVV0aWxzLnBhcnNlKGRhdGUpIDogZGF0ZSwgZm10KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzb01vbnRoKGRhdGU6IERhdGUsIGZtdD86IHN0cmluZyk6IHN0cmluZyB7XG4gIGZtdCA9IGZtdCB8fCAnbW0nO1xuICBjb25zdCBkdSA9IGRhdGVVdGlscztcbiAgcmV0dXJuIGR1LmZvcm1hdChkdS5hZGREYXlzKGR1LnN0YXJ0T2ZJU09XZWVrKGRhdGUpLCAzKSwgZm10KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldENvb3JkaW5hdGUoc291cmNlOiBhbnksIHpvb20/OiBudW1iZXIpOiBbbnVtYmVyLCBudW1iZXIsIG51bWJlcl0ge1xuICB6b29tID0gem9vbSB8fCA2O1xuICBpZiAoc291cmNlID09IG51bGwpIHtcbiAgICByZXR1cm4gWzUxLjUwNSwgLTAuMDksIHpvb21dO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBbc291cmNlWzBdLCBzb3VyY2VbMV0sIHpvb21dO1xuICB9XG59XG5cbi8qKlxuICogUmV0dXJucyBhbiBhcnJheSBjb250YWluaW5nIGFsbCB0aGUgdmFsdWVzIHRoYXQgdGhlIHNwZWNpZmllZCBmaWVsZCB0YWtlcyBpbiB0aGUgZm9ybXMuXG4gKiBUaGUgdmFsdWVzIGFyZSBjb252ZXJ0ZWQgdG8gc3RyaW5ncy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIEFMTF9WQUxVRVNfT0YoZm9ybXM6IE1haW5Gb3JtW10sIGZpZWxkOiBzdHJpbmcsIGZpbHRlcjogRnVuY3xzdHJpbmcgPSAndHJ1ZScpOiBzdHJpbmdbXSB7XG4gIGZvcm1zID0gKGZvcm1zIHx8IFtdKS5maWx0ZXIoZiA9PiBmICE9IG51bGwpO1xuICBpZiAodHlwZW9mKGZpbHRlcikgPT09ICdzdHJpbmcnKSB7XG4gICAgZmlsdGVyID0gY3JlYXRlRnVuY3Rpb24oZmlsdGVyKTtcbiAgfVxuICBsZXQgdmFsdWVzOiBzdHJpbmdbXSA9IFtdO1xuICBmb3IgKGNvbnN0IGZvcm0gb2YgZm9ybXMpIHtcbiAgICBpZiAoZm9ybVtmaWVsZF0gIT0gbnVsbCAmJiBmaWx0ZXIoZm9ybSkpIHtcbiAgICAgIHZhbHVlcy5wdXNoKFN0cmluZyhmb3JtW2ZpZWxkXSkpO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IHJlcCBvZiBhbGxSZXBzKGZvcm0pKSB7XG4gICAgICBpZiAocmVwW2ZpZWxkXSAhPSBudWxsICYmIGZpbHRlcih7Li4uZm9ybSwgLi4ucmVwfSkpIHtcbiAgICAgICAgdmFsdWVzLnB1c2goU3RyaW5nKHJlcFtmaWVsZF0pKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIFsuLi5uZXcgU2V0KHZhbHVlcyldO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcGxhaW5BcnJheShwYXJhbXM6IGFueVtdKTogYW55W10ge1xuICBjb25zdCByZXM6IGFueVtdID0gW107XG4gIGZvciAoY29uc3QgcGFyYW0gb2YgcGFyYW1zKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkocGFyYW0pKSB7XG4gICAgICByZXMucHVzaCguLi5wYXJhbSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlcy5wdXNoKHBhcmFtKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBudW1iZXIgb2YgZm9ybXMgZm9yIHdoaWNoIGZpbHRlciBldmFsdWF0ZXMgdG8gdHJ1ZSxcbiAqIGZvciB0aGUgZm9ybSBpdHNlbGYgb3IgZm9yIGFueSBvZiBpdHMgcmVwZXRpdGlvbnMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBDT1VOVF9GT1JNUyhmb3JtczogTWFpbkZvcm1bXSwgZmlsdGVyOiBGdW5jfHN0cmluZyA9ICd0cnVlJyk6IG51bWJlciB7XG4gIGZvcm1zID0gKGZvcm1zIHx8IFtdKS5maWx0ZXIoZiA9PiBmICE9IG51bGwpO1xuICBpZiAoZmlsdGVyID09PSAndHJ1ZScpIHtcbiAgICByZXR1cm4gZm9ybXMubGVuZ3RoO1xuICB9XG4gIGlmICh0eXBlb2YoZmlsdGVyKSA9PT0gJ3N0cmluZycpIHtcbiAgICBmaWx0ZXIgPSBjcmVhdGVGdW5jdGlvbihmaWx0ZXIpO1xuICB9XG4gIGxldCBjb3VudCA9IDA7XG4gIGZvciAoY29uc3QgZm9ybSBvZiBmb3Jtcykge1xuICAgIGlmIChmaWx0ZXIoZm9ybSkpIHtcbiAgICAgIGNvdW50Kys7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgZm9yIChjb25zdCByZXAgb2YgYWxsUmVwcyhmb3JtKSkge1xuICAgICAgaWYgKGZpbHRlcih7Li4uZm9ybSwgLi4ucmVwfSkpIHtcbiAgICAgICAgY291bnQrKztcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBjb3VudDtcbn1cblxuLyoqXG4gKiBDb3VudHMgdGhlIGZvcm1zIGFuZCBhbGwgb2YgdGhlaXIgcmVwZXRpdGlvbnMgZm9yIHdoaWNoIGZpbHRlciBldmFsdWF0ZXMgdG8gdHJ1ZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIENPVU5UX1JFUFMoZm9ybXM6IE1haW5Gb3JtW10sIGZpbHRlcjogRnVuY3xzdHJpbmcgPSAndHJ1ZScpOiBudW1iZXIge1xuICBmb3JtcyA9IChmb3JtcyB8fCBbXSkuZmlsdGVyKGYgPT4gZiAhPSBudWxsKTtcbiAgaWYgKHR5cGVvZihmaWx0ZXIpID09PSAnc3RyaW5nJykge1xuICAgIGZpbHRlciA9IGNyZWF0ZUZ1bmN0aW9uKGZpbHRlcik7XG4gIH1cbiAgbGV0IGNvdW50ID0gMDtcbiAgZm9yIChjb25zdCBmb3JtIG9mIGZvcm1zKSB7XG4gICAgaWYgKGZpbHRlcihmb3JtKSkge1xuICAgICAgY291bnQrKztcbiAgICB9XG4gICAgZm9yIChjb25zdCByZXAgb2YgYWxsUmVwcyhmb3JtKSkge1xuICAgICAgaWYgKGZpbHRlcih7Li4uZm9ybSwgLi4ucmVwfSkpIHtcbiAgICAgICAgY291bnQrKztcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIGNvdW50O1xufVxuXG4vKipcbiAqIERlcHJlY2F0ZWQuIFVzZSBMRU4oQUxMX1ZBTFVFU19PRilcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIENPVU5UX0ZPUk1TX1VOSVFVRShmb3JtczogTWFpbkZvcm1bXSwgZmllbGQ6IHN0cmluZywgZmlsdGVyOiBGdW5jfHN0cmluZyA9ICd0cnVlJyk6IG51bWJlciB7XG4gIHJldHVybiBBTExfVkFMVUVTX09GKGZvcm1zLCBmaWVsZCwgZmlsdGVyKS5sZW5ndGg7XG59XG5cbmZ1bmN0aW9uIGdldE51bWVyaWNWYWx1ZXMoZm9ybXM6IChNYWluRm9ybSB8IEZvcm0pW10sIGZpZWxkOiBzdHJpbmcsIGZpbHRlcjogRnVuY3xzdHJpbmcgPSAndHJ1ZScpOiBudW1iZXJbXSB7XG4gIGZvcm1zID0gKGZvcm1zIHx8IFtdKS5maWx0ZXIoZiA9PiBmICE9IG51bGwpO1xuICBpZiAodHlwZW9mKGZpbHRlcikgPT09ICdzdHJpbmcnKSB7XG4gICAgZmlsdGVyID0gY3JlYXRlRnVuY3Rpb24oZmlsdGVyKTtcbiAgfVxuICBsZXQgdmFsdWVzOiBudW1iZXJbXSA9IFtdO1xuICBmb3IgKGNvbnN0IGZvcm0gb2YgZm9ybXMpIHtcbiAgICBjb25zdCB2YWwgPSBmb3JtW2ZpZWxkXTtcbiAgICBpZiAodmFsICE9IG51bGwgJiYgIWlzTmFOKE51bWJlcih2YWwpKSAmJiBmaWx0ZXIoZm9ybSkpIHtcbiAgICAgIHZhbHVlcy5wdXNoKE51bWJlcih2YWwpKTtcbiAgICB9XG4gICAgZm9yIChjb25zdCByZXAgb2YgYWxsUmVwcyhmb3JtKSkge1xuICAgICAgY29uc3QgdmFsID0gcmVwW2ZpZWxkXTtcbiAgICAgIGlmICh2YWwgIT0gbnVsbCAmJiAhaXNOYU4oTnVtYmVyKHZhbCkpICYmIGZpbHRlcih7Li4uZm9ybSwgLi4ucmVwfSkpIHtcbiAgICAgICAgdmFsdWVzLnB1c2goTnVtYmVyKHZhbCkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gdmFsdWVzO1xufVxuXG4vKipcbiAqIEFnZ3JlZ2F0ZXMgYW5kIHN1bXMgdGhlIHZhbHVlcyBvZiB0aGUgc3BlY2lmaWVkIGZpZWxkLlxuICogQW4gb3B0aW9uYWwgZXhwcmVzc2lvbiBjYW4gYmUgYWRkZWQgdG8gZmlsdGVyIHdoaWNoIGZvcm1zIHRvIHRha2UgZm9yIHRoZSBzdW0uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBTVU0oZm9ybXM6IChNYWluRm9ybSB8IEZvcm0pW10sIGZpZWxkOiBzdHJpbmcsIGZpbHRlcjogRnVuY3xzdHJpbmcgPSAndHJ1ZScpOiBudW1iZXIge1xuICBjb25zdCB2YWx1ZXMgPSBnZXROdW1lcmljVmFsdWVzKGZvcm1zLCBmaWVsZCwgZmlsdGVyKTtcbiAgbGV0IHN1bSA9IDA7XG4gIGZvciAoY29uc3QgdmFsIG9mIHZhbHVlcykge1xuICAgIHN1bSArPSB2YWw7XG4gIH1cbiAgcmV0dXJuIHRydW5jYXRlMTAoc3VtKTtcbn1cblxuLyoqXG4gKiBDb21wdXRlcyB0aGUgbWVhbiBvZiB0aGUgdmFsdWVzIG9mIHRoZSBzcGVjaWZpZWQgZmllbGQuXG4gKiBBbiBvcHRpb25hbCBleHByZXNzaW9uIGNhbiBiZSBhZGRlZCB0byBmaWx0ZXIgd2hpY2ggZm9ybXMgdG8gdGFrZSBmb3IgdGhlIHN1bS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIE1FQU4oZm9ybXM6IChGb3JtIHwgTWFpbkZvcm0pW10sIGZpZWxkOiBzdHJpbmcsIGZpbHRlcjogRnVuY3xzdHJpbmcgPSAndHJ1ZScpOiBudW1iZXIge1xuICBjb25zdCB2YWx1ZXMgPSBnZXROdW1lcmljVmFsdWVzKGZvcm1zLCBmaWVsZCwgZmlsdGVyKTtcbiAgbGV0IHN1bSA9IDA7XG4gIGZvciAoY29uc3QgdmFsIG9mIHZhbHVlcykge1xuICAgIHN1bSArPSB2YWw7XG4gIH1cbiAgcmV0dXJuIHRydW5jYXRlMTAoc3VtIC8gdmFsdWVzLmxlbmd0aCk7XG59XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgJSBiZXR3ZWVuIHR3byBtZW1iZXJzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gUEVSQ0VOVCh2YWx1ZTE6IG51bWJlciwgdmFsdWUyOiBudW1iZXIpOiBzdHJpbmcge1xuICBjb25zdCByZXMgPSAoK3ZhbHVlMSAqIDEwMCkgLyArdmFsdWUyO1xuICByZXR1cm4gTnVtYmVyLmlzRmluaXRlKHJlcykgPyBNYXRoLnJvdW5kKHJlcykrJyUnIDogJ2luZmluaXRlJztcbn1cblxuLyoqXG4gKiBFdmFsdWF0ZXMgdGhlIGV4cHJlc3Npb24gaW4gdGhlIGZpcnN0IGZvcm0gYnkgZGF0ZS5cbiAqL1xuIGV4cG9ydCBmdW5jdGlvbiBGSVJTVChmb3JtczogKEZvcm0gfCBNYWluRm9ybSlbXSwgZXhwcmVzc2lvbjogRnVuY3xzdHJpbmcsIGRhdGUgPSAnY3JlYXRlZF9hdCcpOiBhbnkge1xuICBpZiAodHlwZW9mKGV4cHJlc3Npb24pID09PSAnc3RyaW5nJykge1xuICAgIGV4cHJlc3Npb24gPSBjcmVhdGVGdW5jdGlvbihleHByZXNzaW9uKTtcbiAgfVxuICBmb3JtcyA9IChmb3JtcyB8fCBbXSkuZmlsdGVyKGYgPT4gZiAhPSBudWxsKS5zb3J0KChhLCBiKSA9PiB7XG4gICAgY29uc3QgZGF0ZUEgPSBuZXcgRGF0ZShiW2RhdGVdIGFzIHN0cmluZykuZ2V0VGltZSgpO1xuICAgIGNvbnN0IGRhdGVCID0gbmV3IERhdGUoYVtkYXRlXSBhcyBzdHJpbmcpLmdldFRpbWUoKTtcbiAgICByZXR1cm4gZGF0ZUEgLSBkYXRlQjtcbiAgfSk7XG4gIGlmIChmb3Jtcy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG4gIHJldHVybiBleHByZXNzaW9uKGZvcm1zWzBdKTtcbn1cblxuLyoqXG4gKiBFdmFsdWF0ZXMgdGhlIGV4cHJlc3Npb24gaW4gdGhlIGxhc3QgZm9ybSBieSBkYXRlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gTEFTVChmb3JtczogKEZvcm0gfCBNYWluRm9ybSlbXSwgZXhwcmVzc2lvbjogRnVuY3xzdHJpbmcsIGRhdGUgPSAnY3JlYXRlZF9hdCcpOiBhbnkge1xuICBpZiAodHlwZW9mKGV4cHJlc3Npb24pID09PSAnc3RyaW5nJykge1xuICAgIGV4cHJlc3Npb24gPSBjcmVhdGVGdW5jdGlvbihleHByZXNzaW9uKTtcbiAgfVxuICBmb3JtcyA9IChmb3JtcyB8fCBbXSkuZmlsdGVyKGYgPT4gZiAhPSBudWxsKS5zb3J0KChhLCBiKSA9PiB7XG4gICAgY29uc3QgZGF0ZUEgPSBuZXcgRGF0ZShiW2RhdGVdIGFzIHN0cmluZykuZ2V0VGltZSgpO1xuICAgIGNvbnN0IGRhdGVCID0gbmV3IERhdGUoYVtkYXRlXSBhcyBzdHJpbmcpLmdldFRpbWUoKTtcbiAgICByZXR1cm4gZGF0ZUEgLSBkYXRlQjtcbiAgfSk7XG4gIGlmIChmb3Jtcy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG4gIHJldHVybiBleHByZXNzaW9uKGZvcm1zW2Zvcm1zLmxlbmd0aCAtIDFdKTtcbn1cblxuLyoqXG4gKiBDb21wdXRlcyB0aGUgbWF4IHZhbHVlIG9mIHRoZSBmaWVsZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIE1BWChmb3JtczogKEZvcm0gfCBNYWluRm9ybSlbXSwgZmllbGQ6IHN0cmluZywgZmlsdGVyOiBGdW5jfHN0cmluZyA9ICd0cnVlJyk6IG51bWJlciB7XG4gIGNvbnN0IHZhbHVlcyA9IGdldE51bWVyaWNWYWx1ZXMoZm9ybXMsIGZpZWxkLCBmaWx0ZXIpO1xuICBsZXQgbWF4ID0gLUluZmluaXR5O1xuICBmb3IgKGNvbnN0IHZhbCBvZiB2YWx1ZXMpIHtcbiAgICBpZiAodmFsID4gbWF4KSB7XG4gICAgICBtYXggPSB2YWw7XG4gICAgfVxuICB9XG4gIHJldHVybiBtYXg7XG59XG5cbi8qKlxuICogQ29tcHV0ZXMgdGhlIG1lZGlhbiB2YWx1ZSBvZiB0aGUgZmllbGQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBNRURJQU4oZm9ybXM6IChGb3JtIHwgTWFpbkZvcm0pW10sIGZpZWxkOiBzdHJpbmcsIGZpbHRlcjogRnVuY3xzdHJpbmcgPSAndHJ1ZScpOiBudW1iZXIge1xuICBjb25zdCB2YWx1ZXMgPSBnZXROdW1lcmljVmFsdWVzKGZvcm1zLCBmaWVsZCwgZmlsdGVyKS5zb3J0KCk7XG4gIGlmICh2YWx1ZXMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIE5hTjtcbiAgfVxuICByZXR1cm4gdmFsdWVzW01hdGguZmxvb3IodmFsdWVzLmxlbmd0aCAvIDIpXTtcbn1cblxuLyoqXG4gKiBDb21wdXRlcyB0aGUgbW9kZSB2YWx1ZSBvZiB0aGUgZmllbGQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBNT0RFKGZvcm1zOiAoRm9ybSB8IE1haW5Gb3JtKVtdLCBmaWVsZDogc3RyaW5nLCBmaWx0ZXI6IEZ1bmN8c3RyaW5nID0gJ3RydWUnKTogbnVtYmVyIHtcbiAgY29uc3QgdmFsdWVzID0gZ2V0TnVtZXJpY1ZhbHVlcyhmb3JtcywgZmllbGQsIGZpbHRlcik7XG4gIGNvbnN0IGNvdW50ZXJzOiB7W3ZhbDogbnVtYmVyXTogbnVtYmVyfSA9IHt9O1xuICBmb3IgKGNvbnN0IHZhbCBvZiB2YWx1ZXMpIHtcbiAgICBpZiAoY291bnRlcnNbdmFsXSA9PSBudWxsKSB7XG4gICAgICBjb3VudGVyc1t2YWxdID0gMTtcbiAgICB9IGVsc2Uge1xuICAgICAgY291bnRlcnNbdmFsXSsrO1xuICAgIH1cbiAgfVxuICBsZXQgbWF4Q291bnQgPSAwO1xuICBmb3IgKGNvbnN0IHZhbCBpbiBjb3VudGVycykge1xuICAgIGlmIChjb3VudGVyc1t2YWxdID4gbWF4Q291bnQpIHtcbiAgICAgIG1heENvdW50ID0gY291bnRlcnNbdmFsXTtcbiAgICB9XG4gIH1cbiAgZm9yIChjb25zdCB2YWwgaW4gY291bnRlcnMpIHtcbiAgICBpZiAoY291bnRlcnNbdmFsXSA9PT0gbWF4Q291bnQpIHtcbiAgICAgIHJldHVybiBOdW1iZXIodmFsKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIE5hTjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkRGF0YXNldChcbiAgZGF0YXNldDogKHN0cmluZyB8IG51bWJlciB8IHN0cmluZ1tdIHwgbnVtYmVyW10pW10sXG4gIGNvbHNwYW5zOiBudW1iZXJbXSxcbik6IEFqZlRhYmxlQ2VsbFtdW10ge1xuICByZXR1cm4gYnVpbGRBbGlnbmVkRGF0YXNldChkYXRhc2V0LCBjb2xzcGFucywgW10pO1xufVxuXG4vKipcbiAqIEJ1aWxkIGEgZGF0YXNldCBmb3IgYWpmIGR5bmFtaWMgdGFibGVcbiAqIEBwYXJhbSBkYXRhc2V0IHRoZSBkYXRhc2V0IGZvciB0aGUgdGFibGVcbiAqIEBwYXJhbSBjb2xzcGFucyBjb2xzcGFuIGZvciBlYWNoIHZhbHVlIGluIHRoZSBkYXRhc2V0XG4gKiBAcGFyYW0gdGV4dEFsaWduIGFsaWdubWVudCBmb3IgZWFjaCB2YWx1ZSBpbiB0aGUgZGF0YXNldFxuICogQHJldHVybnMgQW4gQWpmVGFibGVDZWxsIGxpc3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkQWxpZ25lZERhdGFzZXQoXG4gIGRhdGFzZXQ6IChzdHJpbmcgfCBudW1iZXIgfCBzdHJpbmdbXSB8IG51bWJlcltdKVtdLFxuICBjb2xzcGFuczogbnVtYmVyW10sXG4gIHRleHRBbGlnbjogc3RyaW5nW10sXG4pOiBBamZUYWJsZUNlbGxbXVtdIHtcbiAgY29uc3QgcmVzOiBBamZUYWJsZUNlbGxbXVtdID0gW107XG4gIGNvbnN0IG5vcm1hbGl6ZURhdGFzZXQ6IGFueVtdW10gPSBbXTtcbiAgZGF0YXNldC5mb3JFYWNoKChyb3c6IGFueSwgaW5kZXhSb3c6IG51bWJlcikgPT4ge1xuICAgIHJvdyA9IEFycmF5LmlzQXJyYXkocm93KSA/IHJvdyA6IFtyb3ddO1xuICAgIG5vcm1hbGl6ZURhdGFzZXRbaW5kZXhSb3cgJSBjb2xzcGFucy5sZW5ndGhdID1cbiAgICAgIG5vcm1hbGl6ZURhdGFzZXRbaW5kZXhSb3cgJSBjb2xzcGFucy5sZW5ndGhdICE9IG51bGxcbiAgICAgICAgPyBbLi4ubm9ybWFsaXplRGF0YXNldFtpbmRleFJvdyAlIGNvbHNwYW5zLmxlbmd0aF0sIC4uLnJvd11cbiAgICAgICAgOiBbLi4ucm93XTtcbiAgfSk7XG4gIGNvbnN0IHRyYW5zcG9zZSA9IG5vcm1hbGl6ZURhdGFzZXRbMF0ubWFwKChfOiBhbnksIGNvbEluZGV4OiBudW1iZXIpID0+XG4gICAgbm9ybWFsaXplRGF0YXNldC5tYXAoKHJvdzogYW55KSA9PiByb3dbY29sSW5kZXhdKSxcbiAgKTtcbiAgdHJhbnNwb3NlLmZvckVhY2goKGRhdGE6IGFueVtdLCBpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgY29uc3Qgcm93OiBBamZUYWJsZUNlbGxbXSA9IFtdO1xuICAgIGRhdGEuZm9yRWFjaCgoY2VsbFZhbHVlOiBzdHJpbmcgfCBudW1iZXIsIGNlbGxJbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICByb3cucHVzaCh7XG4gICAgICAgIHZhbHVlOiBjZWxsVmFsdWUsXG4gICAgICAgIGNvbHNwYW46IGNvbHNwYW5zW2NlbGxJbmRleF0sXG4gICAgICAgIHJvd3NwYW46IDEsXG4gICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgdGV4dEFsaWduOiB0ZXh0QWxpZ25bY2VsbEluZGV4XSA/IHRleHRBbGlnbltjZWxsSW5kZXhdIDogJ2NlbnRlcicsXG4gICAgICAgICAgY29sb3I6ICdibGFjaycsXG4gICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBpbmRleCAlIDIgPT09IDAgPyAnd2hpdGUnIDogJyNkZGQnLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgcmVzLnB1c2gocm93KTtcbiAgfSk7XG4gIHJldHVybiByZXM7XG59XG5cbi8qKlxuICogQnVpbGQgYSBkYXRhc2V0IGJhc2VkIG9uIGEgbGlzdCBvZiBGb3JtcywgZm9yIGFqZiBkeW5hbWljIHRhYmxlXG4gKiBAcGFyYW0gZGF0YXNldCB0aGUgZGF0YXNldCBmb3IgdGhlIHRhYmxlXG4gKiBAcGFyYW0gZmllbGRzIHRoZSBsaXN0IG9mIGZpZWxkcyBuYW1lIGZvciBlYWNoIHJvd1xuICogQHBhcmFtIHJvd0xpbmsgdGhlIGh0dHAgbGluayBmb3IgdGhlIHJvdywgd2l0aCB0aGUgZm9ybSBmaWVsZCBuYW1lIHdpdGggdGhlIGxpbmsgdmFsdWUgYW5kIHRoZSBjb2x1bW4gcG9zaXRpb24gZm9yIHRoZSBsaW5rLlxuICogaWU6IHsnbGluayc6ICdob21lX2xpbmsnLCAncG9zaXRpb24nOiAwfVxuICogQHBhcmFtIGJhY2tncm91bmRDb2xvckEgdGhlIGZpcnN0IGJhY2tncm91ZCBjb2xvclxuICogQHBhcmFtIGJhY2tncm91bmRDb2xvckIgdGhlIHNlY29uZCBiYWNrZ3JvdWQgY29sb3JcbiAqIEByZXR1cm5zIEFuIEFqZlRhYmxlQ2VsbCBsaXN0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBidWlsZEZvcm1EYXRhc2V0KFxuICBkYXRhc2V0OiBNYWluRm9ybVtdLFxuICBmaWVsZHM6IHN0cmluZ1tdLFxuICByb3dMaW5rOiB7bGluazogc3RyaW5nOyBwb3NpdGlvbjogbnVtYmVyfSB8IG51bGwsXG4gIF9iYWNrZ3JvdW5kQ29sb3JBPzogc3RyaW5nLFxuICBfYmFja2dyb3VuZENvbG9yQj86IHN0cmluZyxcbik6IEFqZlRhYmxlQ2VsbFtdW10ge1xuICByZXR1cm4gYnVpbGRBbGlnbmVkRm9ybURhdGFzZXQoZGF0YXNldCwgZmllbGRzLCBbXSwgW10sIHJvd0xpbmssIFtdLCBbXSk7XG59XG5cbi8qKlxuICogQnVpbGQgYSBkYXRhc2V0IGJhc2VkIG9uIGEgbGlzdCBvZiBGb3JtcywgZm9yIGFqZiBkeW5hbWljIHRhYmxlXG4gKiBAcGFyYW0gZGF0YXNldCB0aGUgZGF0YXNldCBmb3IgdGhlIHRhYmxlXG4gKiBAcGFyYW0gZmllbGRzIHRoZSBsaXN0IG9mIGZpZWxkcyBuYW1lIGZvciBlYWNoIHJvd1xuICogQHBhcmFtIGNvbHNwYW5zIGNvbHNwYW4gZm9yIGVhY2ggdmFsdWUgaW4gdGhlIGRhdGFzZXRcbiAqIEBwYXJhbSB0ZXh0QWxpZ24gYWxpZ25tZW50IGZvciBlYWNoIHZhbHVlIGluIHRoZSBkYXRhc2V0XG4gKiBAcGFyYW0gcm93TGluayB0aGUgaHR0cCBsaW5rIGZvciB0aGUgcm93LCB3aXRoIHRoZSBmb3JtIGZpZWxkIG5hbWUgd2l0aCB0aGUgbGluayB2YWx1ZSBhbmQgdGhlIGNvbHVtbiBwb3NpdGlvbiBmb3IgdGhlIGxpbmsuXG4gKiBpZTogeydsaW5rJzogJ2hvbWVfbGluaycsICdwb3NpdGlvbic6IDB9XG4gKiBAcmV0dXJucyBBbiBBamZUYWJsZUNlbGwgbGlzdFxuICovXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRBbGlnbmVkRm9ybURhdGFzZXQoXG4gIGRhdGFzZXQ6IE1haW5Gb3JtW10sXG4gIGZpZWxkczogc3RyaW5nW10sXG4gIGNvbHNwYW5zOiBudW1iZXJbXSxcbiAgdGV4dEFsaWduOiBzdHJpbmdbXSxcbiAgcm93TGluazoge2xpbms6IHN0cmluZzsgcG9zaXRpb246IG51bWJlcn0gfCBudWxsLFxuICBkaWFsb2dGaWVsZHM6IHN0cmluZ1tdLFxuICBkaWFsb2dMYWJlbEZpZWxkczogc3RyaW5nW10sXG4pOiBBamZUYWJsZUNlbGxbXVtdIHtcbiAgY29uc3QgcmVzOiBBamZUYWJsZUNlbGxbXVtdID0gW107XG5cbiAgY29uc3QgYmFja2dyb3VuZENvbG9yQSA9ICd3aGl0ZSc7XG4gIGNvbnN0IGJhY2tncm91bmRDb2xvckIgPSAnI2RkZCc7XG4gIGlmIChkYXRhc2V0KSB7XG4gICAgbGV0IGluZGV4OiBudW1iZXIgPSAwO1xuICAgIGRhdGFzZXQuZm9yRWFjaCgoZGF0YTogTWFpbkZvcm0pID0+IHtcbiAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgIGluZGV4Kys7XG4gICAgICAgIGNvbnN0IHJvdzogQWpmVGFibGVDZWxsW10gPSBbXTtcbiAgICAgICAgZmllbGRzLmZvckVhY2goKGZpZWxkOiBzdHJpbmcsIGNlbGxJZHg6IG51bWJlcikgPT4ge1xuICAgICAgICAgIGxldCBjZWxsVmFsdWUgPSBkYXRhW2ZpZWxkXSB8fCAnJztcbiAgICAgICAgICBpZiAocm93TGluayAhPSBudWxsICYmIGNlbGxJZHggPT09IHJvd0xpbmtbJ3Bvc2l0aW9uJ10pIHtcbiAgICAgICAgICAgIGNlbGxWYWx1ZSA9IGA8YSBocmVmPScke2RhdGFbcm93TGlua1snbGluayddXX0nPiAke2RhdGFbZmllbGRdfTwvYT5gO1xuICAgICAgICAgIH1cbiAgICAgICAgICByb3cucHVzaCh7XG4gICAgICAgICAgICB2YWx1ZTogY2VsbFZhbHVlLFxuICAgICAgICAgICAgY29sc3BhbjogY29sc3BhbnNbY2VsbElkeF0gJiYgY29sc3BhbnNbY2VsbElkeF0gPiAwID8gY29sc3BhbnNbY2VsbElkeF0gOiAxLFxuICAgICAgICAgICAgcm93c3BhbjogMSxcbiAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgIHRleHRBbGlnbjogdGV4dEFsaWduW2NlbGxJZHhdID8gdGV4dEFsaWduW2NlbGxJZHhdIDogJ2NlbnRlcicsXG4gICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snLFxuICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IGluZGV4ICUgMiA9PT0gMCA/IGJhY2tncm91bmRDb2xvckEgOiBiYWNrZ3JvdW5kQ29sb3JCLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGRpYWxvZ0ZpZWxkcyAmJiBkaWFsb2dGaWVsZHMubGVuZ3RoKSB7XG4gICAgICAgICAgbGV0IGRpYWxvZ0h0bWw6IHN0cmluZ1tdID0gW107XG4gICAgICAgICAgZGlhbG9nRmllbGRzLmZvckVhY2goKGZpZWxkOiBzdHJpbmcsIGNlbGxJZHg6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgbGV0IGZpZWxkVmFsdWUgPSAnXCJcIic7XG4gICAgICAgICAgICBpZiAoZGF0YVtmaWVsZF0gIT0gbnVsbCkge1xuICAgICAgICAgICAgICBmaWVsZFZhbHVlID1cbiAgICAgICAgICAgICAgICBcIjxwIGNsYXNzPSdkaWFsb2ctaXRlbSc+PGI+XCIgK1xuICAgICAgICAgICAgICAgIGRpYWxvZ0xhYmVsRmllbGRzW2NlbGxJZHhdLnJlcGxhY2UoL1snXFxcIl0rL2csICcnKSArXG4gICAgICAgICAgICAgICAgJzwvYj4gPHNwYW4+JyArXG4gICAgICAgICAgICAgICAgZGF0YVtmaWVsZF0gK1xuICAgICAgICAgICAgICAgICc8L3NwYW4+PC9wPic7XG4gICAgICAgICAgICAgIGRpYWxvZ0h0bWwucHVzaChmaWVsZFZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHJvdy5wdXNoKHtcbiAgICAgICAgICAgIHZhbHVlOlxuICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cInJlYWRfbW9yZV9jZWxsXCI+PHAgY2xhc3M9XCJyZWFkX21vcmVfdGV4dFwiPlJlYWQgbW9yZTwvcD48YiBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCI+YWRkX2NpcmNsZV9vdXRsaW5lPC9iPjwvZGl2PicsXG4gICAgICAgICAgICBkaWFsb2dIdG1sOiBkaWFsb2dIdG1sLmpvaW4oJyAnKSxcbiAgICAgICAgICAgIGNvbHNwYW46IDEsXG4gICAgICAgICAgICByb3dzcGFuOiAxLFxuICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgY29sb3I6ICdibGFjaycsXG4gICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogaW5kZXggJSAyID09PSAwID8gYmFja2dyb3VuZENvbG9yQSA6IGJhY2tncm91bmRDb2xvckIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJlcy5wdXNoKHJvdyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cblxuLyoqXG4gKiBjcmVhdGUgYSB3aWRnZXQgZGF0YXNldCBpbnRvIGEgY29udGVudCBsaXN0LCBiYXNlZCBvbiBhIGxpc3Qgb2YgRm9ybXMsIGZvciBwYWdpbmF0ZWQgd2lkZ2V0XG4gKlxuICogQHBhcmFtIGRhdGFzZXQgdGhlIGRhdGFzZXQgZm9yIHRoZSB3aWRnZXRzXG4gKiBAcGFyYW0gZmllbGRzIHRoZSBsaXN0IG9mIGZpZWxkcyBuYW1lIGZvciBlYWNoIHJvd1xuICogQHBhcmFtIHJvd0xpbmsgdGhlIGh0dHAgbGluayBmb3IgdGhlIHJvdywgd2l0aCB0aGUgZm9ybSBmaWVsZCBuYW1lIHdpdGggdGhlIGxpbmsgdmFsdWUgYW5kIHRoZSBjb2x1bW4gcG9zaXRpb24gZm9yIHRoZSBsaW5rLlxuICogaWU6IHsnbGluayc6ICdob21lX2xpbmsnLCAncG9zaXRpb24nOiAwfVxuICogQHBhcmFtIGNlbGxTdHlsZXMgY3NzIHN0eWxlcyBmb3IgY2VsbHNcbiAqIEBwYXJhbSByb3dTdHlsZSBjc3Mgc3R5bGVzIGZvciByb3dzXG4gKiBAcGFyYW0gcGVyY1dpZHRoIGFuIGFycmF5IHdpdGggdGhlIHNhbWUgbGVuZ3RoIG9mIGZpZWxkcyBwYXJhbSwgd2l0aCB0aGUgd2lkdGggZm9yIHRoZSBjb2x1bW5zLlxuICogaWU6IFsnMTAlJywgJzMwJScsICcxMCUnLCAnMjUlJywgJzE1JScsICcxMCUnXVxuICogQHBhcmFtIGJhY2tncm91bmRDb2xvckEgdGhlIGZpcnN0IGJhY2tncm91ZCBjb2xvclxuICogQHBhcmFtIGJhY2tncm91bmRDb2xvckIgdGhlIHNlY29uZCBiYWNrZ3JvdWQgY29sb3JcbiAqIEByZXR1cm5zIEFuIEFqZlRhYmxlV2lkZ2V0IGxpc3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkV2lkZ2V0RGF0YXNldChcbiAgZGF0YXNldDogTWFpbkZvcm1bXSxcbiAgZmllbGRzOiBzdHJpbmdbXSxcbiAgcm93TGluazoge2xpbms6IHN0cmluZzsgcG9zaXRpb246IG51bWJlcn0gfCBudWxsLFxuICBjZWxsU3R5bGVzOiB7W2tleTogc3RyaW5nXTogYW55fSB8IG51bGwsXG4gIHJvd1N0eWxlOiB7W2tleTogc3RyaW5nXTogYW55fSB8IG51bGwsXG4gIHBlcmNXaWR0aDogc3RyaW5nW10sXG4gIGJhY2tncm91bmRDb2xvckE/OiBzdHJpbmcsXG4gIGJhY2tncm91bmRDb2xvckI/OiBzdHJpbmcsXG4pOiBhbnlbXSB7XG4gIGNvbnN0IHJlczoge1trZXk6IHN0cmluZ106IGFueX1bXSA9IFtdO1xuICBpZiAoYmFja2dyb3VuZENvbG9yQSA9PSBudWxsKSB7XG4gICAgYmFja2dyb3VuZENvbG9yQSA9ICd3aGl0ZSc7XG4gIH1cbiAgaWYgKGJhY2tncm91bmRDb2xvckIgPT0gbnVsbCkge1xuICAgIGJhY2tncm91bmRDb2xvckIgPSAnI2RkZCc7XG4gIH1cbiAgaWYgKHJvd1N0eWxlID09IG51bGwpIHtcbiAgICByb3dTdHlsZSA9IHtcbiAgICAgICd0ZXh0LWFsaWduJzogJ3JpZ2h0JyxcbiAgICAgICdtYXJnaW4tYm90dG9tJzogMCxcbiAgICAgICdib3JkZXItY29sbGFwc2UnOiAnY29sbGFwc2UnLFxuICAgIH07XG4gIH1cbiAgaWYgKGNlbGxTdHlsZXMgPT0gbnVsbCkge1xuICAgIGNlbGxTdHlsZXMgPSB7XG4gICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxuICAgICAgY29sb3I6ICdibGFjaycsXG4gICAgfTtcbiAgfVxuICBpZiAocGVyY1dpZHRoID09IG51bGwgfHwgcGVyY1dpZHRoLmxlbmd0aCAhPT0gZmllbGRzLmxlbmd0aCkge1xuICAgIGNvbnN0IGNlbGxXaWR0aCA9IDEwMCAvIGZpZWxkcy5sZW5ndGggKyAnJSc7XG4gICAgcGVyY1dpZHRoID0gW107XG4gICAgZmllbGRzLmZvckVhY2goXyA9PiBwZXJjV2lkdGgucHVzaChjZWxsV2lkdGgpKTtcbiAgfVxuXG4gIGlmIChkYXRhc2V0KSB7XG4gICAgbGV0IGluZGV4OiBudW1iZXIgPSAwO1xuICAgIGRhdGFzZXQuZm9yRWFjaCgoZGF0YTogTWFpbkZvcm0pID0+IHtcbiAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgIGluZGV4Kys7XG4gICAgICAgIC8vIFJvdyBpcyBhbiBBamZUYWJsZVdpZGdldFxuICAgICAgICBjb25zdCByb3c6IHtba2V5OiBzdHJpbmddOiBhbnl9ID0ge1xuICAgICAgICAgIHN0eWxlczoge1xuICAgICAgICAgICAgJ3RleHQtYWxpZ24nOiAncmlnaHQnLFxuICAgICAgICAgICAgJ21hcmdpbi1ib3R0b20nOiAwLFxuICAgICAgICAgICAgJ2JvcmRlci1jb2xsYXBzZSc6ICdjb2xsYXBzZScsXG4gICAgICAgICAgICAuLi5yb3dTdHlsZSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHZpc2liaWxpdHk6IHtjb25kaXRpb246ICd0cnVlJ30sXG4gICAgICAgICAgd2lkZ2V0VHlwZTogNSxcbiAgICAgICAgICBkYXRhc2V0OiBbW11dIGFzIGFueVtdW10sXG4gICAgICAgICAgY2VsbFN0eWxlczogeydib3JkZXItdG9wJzogJzFweCBzb2xpZCBncmV5J30sXG4gICAgICAgIH07XG5cbiAgICAgICAgZmllbGRzLmZvckVhY2goKGZpZWxkOiBzdHJpbmcsIGNlbGxJZHg6IG51bWJlcikgPT4ge1xuICAgICAgICAgIGxldCBmb3JtdWxhQ2VsbCA9ICdcIlwiJztcbiAgICAgICAgICBpZiAoZGF0YVtmaWVsZF0gIT0gbnVsbCkge1xuICAgICAgICAgICAgZm9ybXVsYUNlbGwgPSAnXCInICsgZGF0YVtmaWVsZF0gKyAnXCInO1xuICAgICAgICAgICAgaWYgKHJvd0xpbmsgIT0gbnVsbCAmJiBjZWxsSWR4ID09PSByb3dMaW5rWydwb3NpdGlvbiddKSB7XG4gICAgICAgICAgICAgIGZvcm11bGFDZWxsID0gYFwiPGEgaHJlZj0nJHtkYXRhW3Jvd0xpbmtbJ2xpbmsnXV19Jz4gJHtkYXRhW2ZpZWxkXX08L2E+XCJgO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHJvd1snZGF0YXNldCddWzBdLnB1c2goe1xuICAgICAgICAgICAgbGFiZWw6ICcnLFxuICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgY29sb3I6ICdibGFjaycsXG4gICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogaW5kZXggJSAyID09PSAwID8gYmFja2dyb3VuZENvbG9yQSA6IGJhY2tncm91bmRDb2xvckIsXG4gICAgICAgICAgICAgIC4uLmNlbGxTdHlsZXMsXG4gICAgICAgICAgICAgIHdpZHRoOiBwZXJjV2lkdGhbY2VsbElkeF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZm9ybXVsYToge1xuICAgICAgICAgICAgICBmb3JtdWxhOiBmb3JtdWxhQ2VsbCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb2xzcGFuOiAxLFxuICAgICAgICAgICAgcm93c3BhbjogMSxcbiAgICAgICAgICAgIGFnZ3JlZ2F0aW9uOiB7XG4gICAgICAgICAgICAgIGFnZ3JlZ2F0aW9uOiAwLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJlcy5wdXNoKHJvdyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cblxuLyoqXG4gKiBjcmVhdGUgYSB3aWRnZXQgZGF0YXNldCBpbnRvIGEgY29udGVudCBsaXN0LCBiYXNlZCBvbiBhIGxpc3Qgb2YgRm9ybXMsIGZvciBwYWdpbmF0ZWQgd2lkZ2V0LlxuICogRWFjaCByb3cgaXMgYSBBamZEaWFsb2dXaWRnZXQgYW5kLCBvbiBjbGljaywgb3BlbiBhIGRpYWxvZy5cbiAqXG4gKiBAcGFyYW0gZGF0YXNldCB0aGUgZGF0YXNldCBmb3IgdGhlIHdpZGdldHNcbiAqIEBwYXJhbSBmaWVsZHMgdGhlIGxpc3Qgb2YgZmllbGRzIG5hbWUgZm9yIGVhY2ggcm93XG4gKiBAcGFyYW0gZGlhbG9nRmllbGRzIHRoZSBsaXN0IG9mIGZpZWxkcyBuYW1lIHRvIHNob3cgaW4gdGhlIGRpYWxvZ1xuICogQHBhcmFtIGRpYWxvZ0xhYmVsRmllbGRzIHRoZSBsaXN0IG9mIGxhYmVscyBmb3IgZWFjaCBkaWFsb2dGaWVsZHNcbiAqIEBwYXJhbSByb3dMaW5rIHRoZSBodHRwIGxpbmsgZm9yIHRoZSByb3csIHdpdGggdGhlIGZvcm0gZmllbGQgbmFtZSB3aXRoIHRoZSBsaW5rIHZhbHVlIGFuZCB0aGUgY29sdW1uIHBvc2l0aW9uIGZvciB0aGUgbGluay5cbiAqIGllOiB7J2xpbmsnOiAnaG9tZV9saW5rJywgJ3Bvc2l0aW9uJzogMH1cbiAqIEBwYXJhbSBjZWxsU3R5bGVzIGNzcyBzdHlsZXMgZm9yIGNlbGxzXG4gKiBAcGFyYW0gcm93U3R5bGUgY3NzIHN0eWxlcyBmb3Igcm93c1xuICogQHBhcmFtIHBlcmNXaWR0aCBhbiBhcnJheSB3aXRoIHRoZSBzYW1lIGxlbmd0aCBvZiBmaWVsZHMgcGFyYW0sIHdpdGggdGhlIHdpZHRoIGZvciB0aGUgY29sdW1ucy5cbiAqIGllOiBbJzEwJScsICczMCUnLCAnMTAlJywgJzI1JScsICcxNSUnLCAnMTAlJ11cbiAqIEBwYXJhbSBiYWNrZ3JvdW5kQ29sb3JBIHRoZSBmaXJzdCBiYWNrZ3JvdWQgY29sb3JcbiAqIEBwYXJhbSBiYWNrZ3JvdW5kQ29sb3JCIHRoZSBzZWNvbmQgYmFja2dyb3VkIGNvbG9yXG4gKiBAcmV0dXJucyBBbiBBamZEaWFsb2dXaWRnZXQgbGlzdFxuICovXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRXaWRnZXREYXRhc2V0V2l0aERpYWxvZyhcbiAgZGF0YXNldDogTWFpbkZvcm1bXSxcbiAgZmllbGRzOiBzdHJpbmdbXSxcbiAgZGlhbG9nRmllbGRzOiBzdHJpbmdbXSxcbiAgZGlhbG9nTGFiZWxGaWVsZHM6IHN0cmluZ1tdLFxuICBjZWxsU3R5bGVzOiB7W2tleTogc3RyaW5nXTogYW55fSB8IG51bGwsXG4gIHJvd1N0eWxlOiB7W2tleTogc3RyaW5nXTogYW55fSB8IG51bGwsXG4gIHBlcmNXaWR0aDogc3RyaW5nW10sXG4gIGJhY2tncm91bmRDb2xvckE/OiBzdHJpbmcsXG4gIGJhY2tncm91bmRDb2xvckI/OiBzdHJpbmcsXG4pOiBhbnlbXSB7XG4gIGNvbnN0IHJlczoge1trZXk6IHN0cmluZ106IGFueX1bXSA9IFtdO1xuICBpZiAoYmFja2dyb3VuZENvbG9yQSA9PSBudWxsKSB7XG4gICAgYmFja2dyb3VuZENvbG9yQSA9ICd3aGl0ZSc7XG4gIH1cbiAgaWYgKGJhY2tncm91bmRDb2xvckIgPT0gbnVsbCkge1xuICAgIGJhY2tncm91bmRDb2xvckIgPSAnI2RkZCc7XG4gIH1cbiAgaWYgKHJvd1N0eWxlID09IG51bGwpIHtcbiAgICByb3dTdHlsZSA9IHtcbiAgICAgICd0ZXh0LWFsaWduJzogJ3JpZ2h0JyxcbiAgICAgICdtYXJnaW4tYm90dG9tJzogMCxcbiAgICAgICdib3JkZXItY29sbGFwc2UnOiAnY29sbGFwc2UnLFxuICAgIH07XG4gIH1cbiAgaWYgKGNlbGxTdHlsZXMgPT0gbnVsbCkge1xuICAgIGNlbGxTdHlsZXMgPSB7XG4gICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxuICAgICAgY29sb3I6ICdibGFjaycsXG4gICAgfTtcbiAgfVxuICBpZiAocGVyY1dpZHRoID09IG51bGwgfHwgcGVyY1dpZHRoLmxlbmd0aCAhPT0gZmllbGRzLmxlbmd0aCkge1xuICAgIGNvbnN0IGNlbGxXaWR0aCA9IDEwMCAvIGZpZWxkcy5sZW5ndGggKyAnJSc7XG4gICAgcGVyY1dpZHRoID0gW107XG4gICAgZmllbGRzLmZvckVhY2goXyA9PiBwZXJjV2lkdGgucHVzaChjZWxsV2lkdGgpKTtcbiAgfVxuXG4gIGlmIChkYXRhc2V0KSB7XG4gICAgbGV0IGluZGV4OiBudW1iZXIgPSAwO1xuICAgIGRhdGFzZXQuZm9yRWFjaCgoZGF0YTogTWFpbkZvcm0pID0+IHtcbiAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgIGluZGV4Kys7XG4gICAgICAgIC8vIFJvdyBpcyBhbiBBamZUYWJsZVdpZGdldFxuICAgICAgICBjb25zdCByb3c6IHtba2V5OiBzdHJpbmddOiBhbnl9ID0ge1xuICAgICAgICAgIHN0eWxlczoge1xuICAgICAgICAgICAgJ3RleHQtYWxpZ24nOiAncmlnaHQnLFxuICAgICAgICAgICAgJ21hcmdpbi1ib3R0b20nOiAwLFxuICAgICAgICAgICAgJ2JvcmRlci1jb2xsYXBzZSc6ICdjb2xsYXBzZScsXG4gICAgICAgICAgICAuLi5yb3dTdHlsZSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHZpc2liaWxpdHk6IHtjb25kaXRpb246ICd0cnVlJ30sXG4gICAgICAgICAgd2lkZ2V0VHlwZTogNSxcbiAgICAgICAgICBkYXRhc2V0OiBbW11dIGFzIGFueVtdW10sXG4gICAgICAgICAgY2VsbFN0eWxlczogeydib3JkZXItdG9wJzogJzFweCBzb2xpZCBncmV5J30sXG4gICAgICAgIH07XG5cbiAgICAgICAgZmllbGRzLmZvckVhY2goKGZpZWxkOiBzdHJpbmcsIGNlbGxJZHg6IG51bWJlcikgPT4ge1xuICAgICAgICAgIGxldCBmb3JtdWxhQ2VsbCA9ICdcIlwiJztcbiAgICAgICAgICBpZiAoZGF0YVtmaWVsZF0gIT0gbnVsbCkge1xuICAgICAgICAgICAgZm9ybXVsYUNlbGwgPSAnXCInICsgZGF0YVtmaWVsZF0gKyAnXCInO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJvd1snZGF0YXNldCddWzBdLnB1c2goe1xuICAgICAgICAgICAgbGFiZWw6ICcnLFxuICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgY29sb3I6ICdibGFjaycsXG4gICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogaW5kZXggJSAyID09PSAwID8gYmFja2dyb3VuZENvbG9yQSA6IGJhY2tncm91bmRDb2xvckIsXG4gICAgICAgICAgICAgIC4uLmNlbGxTdHlsZXMsXG4gICAgICAgICAgICAgIHdpZHRoOiBwZXJjV2lkdGhbY2VsbElkeF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZm9ybXVsYToge1xuICAgICAgICAgICAgICBmb3JtdWxhOiBmb3JtdWxhQ2VsbCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb2xzcGFuOiAxLFxuICAgICAgICAgICAgcm93c3BhbjogMSxcbiAgICAgICAgICAgIGFnZ3JlZ2F0aW9uOiB7XG4gICAgICAgICAgICAgIGFnZ3JlZ2F0aW9uOiAwLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IGh0bWxEaWFsb2c6IHN0cmluZ1tdID0gW107XG4gICAgICAgIGRpYWxvZ0ZpZWxkcy5mb3JFYWNoKChmaWVsZDogc3RyaW5nLCBjZWxsSWR4OiBudW1iZXIpID0+IHtcbiAgICAgICAgICBsZXQgZmllbGRWYWx1ZSA9ICdcIlwiJztcbiAgICAgICAgICBpZiAoZGF0YVtmaWVsZF0gIT0gbnVsbCkge1xuICAgICAgICAgICAgZmllbGRWYWx1ZSA9XG4gICAgICAgICAgICAgIFwiPHAgY2xhc3M9J2RpYWxvZy1pdGVtJz48Yj5cIiArXG4gICAgICAgICAgICAgIGRpYWxvZ0xhYmVsRmllbGRzW2NlbGxJZHhdICtcbiAgICAgICAgICAgICAgJzwvYj4gPHNwYW4+JyArXG4gICAgICAgICAgICAgIGRhdGFbZmllbGRdICtcbiAgICAgICAgICAgICAgJzwvc3Bhbj48L3A+JztcbiAgICAgICAgICAgIGh0bWxEaWFsb2cucHVzaChmaWVsZFZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IGRpYWxvZ0NvbnRlbnQ6IHtba2V5OiBzdHJpbmddOiBhbnl9ID0ge1xuICAgICAgICAgIHdpZGdldFR5cGU6IDMsXG4gICAgICAgICAgc3R5bGVzOiB7XG4gICAgICAgICAgICAnbWFyZ2luJzogJzAgMWVtJyxcbiAgICAgICAgICAgICdwYWRkaW5nJzogJzVweCAxMHB4JyxcbiAgICAgICAgICAgICdtYXgtaGVpZ2h0JzogJzM2MHB4JyxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHZpc2liaWxpdHk6IHtjb25kaXRpb246ICd0cnVlJ30sXG4gICAgICAgICAgaHRtbFRleHQ6IGh0bWxEaWFsb2cuam9pbignICcpLFxuICAgICAgICB9O1xuXG4gICAgICAgIC8vIFRoaXMgaXMgYSBEaWFsb2cgV2lkZ2V0LCBhZGRlZCBhcyBjb210YWluZXIgZm9yIGVhY2ggdGFibGUgd2lkZ2V0XG4gICAgICAgIGNvbnN0IGRpYWxvZ1Jvdzoge1trZXk6IHN0cmluZ106IGFueX0gPSB7XG4gICAgICAgICAgd2lkZ2V0VHlwZTogMTMsXG4gICAgICAgICAgc3R5bGVzOiB7XG4gICAgICAgICAgICAnbWFyZ2luJzogJzAnLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgdmlzaWJpbGl0eToge2NvbmRpdGlvbjogJ3RydWUnfSxcbiAgICAgICAgICB0b2dnbGU6IHJvdyxcbiAgICAgICAgICBjb250ZW50OiBbZGlhbG9nQ29udGVudF0sXG4gICAgICAgIH07XG4gICAgICAgIHJlcy5wdXNoKGRpYWxvZ1Jvdyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cblxuLyoqXG4gKiBEZXByZWNhdGVkLiBVc2UgTUFQXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBSRVBFQVQoXG4gIGZvcm1zOiBNYWluRm9ybVtdLFxuICBhcnJheTogc3RyaW5nW10sXG4gIGZuOiBhbnksXG4gIGFyZzE6IHN0cmluZyxcbiAgYXJnMjogc3RyaW5nID0gJ3RydWUnLFxuKTogYW55W10ge1xuICByZXR1cm4gYXJyYXkubWFwKHYgPT4ge1xuICAgIGNvbnN0IHMgPSBKU09OLnN0cmluZ2lmeSh2KTtcbiAgICBjb25zdCBjdXJyZW50MSA9IChhcmcxIGFzIGFueSkucmVwbGFjZUFsbCgnY3VycmVudCcsIHMpO1xuICAgIGNvbnN0IGN1cnJlbnQyID0gKGFyZzIgYXMgYW55KS5yZXBsYWNlQWxsKCdjdXJyZW50Jywgcyk7XG4gICAgcmV0dXJuIGZuKGZvcm1zLCBjdXJyZW50MSwgY3VycmVudDIpO1xuICB9KTtcbn1cblxuLyoqXG4gKiBNYXBzIGZ1bmMgdG8gdGhlIGVsZW1lbnRzIG9mIGFycmF5LlxuICovXG5leHBvcnQgZnVuY3Rpb24gTUFQKGFycmF5OiBhbnlbXSwgZnVuYzogKGE6IGFueSkgPT4gYW55KTogYW55W10ge1xuICByZXR1cm4gYXJyYXkubWFwKGZ1bmMpO1xufVxuXG4vKipcbiAqIEZvciBlYWNoIGZvcm0gaW4gZm9ybXMsIHRoZSBzcGVjaWZpZWQgZmllbGQgaXMgc2V0IHdpdGggdGhlIHZhbHVlIGdpdmVuIGJ5IGV4cHJlc3Npb24uXG4gKiBUaGUgZm9ybSdzIGZpZWxkcyBjYW4gYmUgdXNlZCBpbnNpZGUgZXhwcmVzc2lvbi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIEFQUExZKGZvcm1zOiBNYWluRm9ybVtdLCBmaWVsZDogc3RyaW5nLCBleHByZXNzaW9uOiBGdW5jfHN0cmluZyk6IE1haW5Gb3JtW10ge1xuICBmb3JtcyA9IGNsb25lTWFpbkZvcm1zKGZvcm1zKTtcbiAgaWYgKHR5cGVvZihleHByZXNzaW9uKSA9PT0gJ3N0cmluZycpIHtcbiAgICBleHByZXNzaW9uID0gY3JlYXRlRnVuY3Rpb24oZXhwcmVzc2lvbik7XG4gIH1cbiAgZm9yIChjb25zdCBmb3JtIG9mIGZvcm1zKSB7XG4gICAgaWYgKGZvcm0gIT0gbnVsbCkge1xuICAgICAgZm9ybVtmaWVsZF0gPSBleHByZXNzaW9uKGZvcm0pO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZm9ybXM7XG59XG5cbi8qKlxuICogUm91bmRzIG51bSB0byB0aGUgc3BlY2lmaWVkIG51bWJlciBvZiBkaWdpdHMgYWZ0ZXIgdGhlIHBvaW50IChvciB6ZXJvKS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIFJPVU5EKG51bTogbnVtYmVyIHwgc3RyaW5nLCBkaWdpdHM/OiBudW1iZXIpOiBudW1iZXIge1xuICByZXR1cm4gcm91bmQobnVtLCBkaWdpdHMpO1xufVxuXG4vKipcbiAqIERlcHJlY2F0ZWQuIFVzZSBJRlxuICovXG5leHBvcnQgZnVuY3Rpb24gRVZBTFVBVEUoY29uZGl0aW9uOiBzdHJpbmcsIGJyYW5jaDE6IGFueSwgYnJhbmNoMjogYW55KTogYW55IHtcbiAgaWYgKGV2YWx1YXRlRXhwcmVzc2lvbihjb25kaXRpb24pKSB7XG4gICAgcmV0dXJuIGJyYW5jaDE7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGJyYW5jaDI7XG4gIH1cbn1cblxuLyoqXG4gKiBUZWxscyBpZiBhcnIgaW5jbHVkZXMgZWxlbVxuICovXG5leHBvcnQgZnVuY3Rpb24gSU5DTFVERVMoYXJyOiAoYW55W10pfHN0cmluZywgZWxlbTogYW55KTogYm9vbGVhbiB7XG4gIGlmICghQXJyYXkuaXNBcnJheShhcnIpICYmIHR5cGVvZihhcnIpICE9PSAnc3RyaW5nJykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gYXJyLmluY2x1ZGVzKGVsZW0pO1xufVxuXG4vKipcbiAqIFRoaXMgZnVuY3Rpb24gYnVpbGRzIGEgZGF0YSBzdHJ1Y3R1cmUgdGhhdCBhbGxvd3MgdGhlIHVzZSBvZiB0aGUgaGluZGlraXQgZm9ybXVsYXNcbiAqIGZvciBldmVyeSBmb3JtcyB3aXRoIHJlcGVhdGluZyBzbGlkZXMuXG4gKiBJbiBwYXJ0aWN1bGFyLCBpdCBidWlsZHMgYSBtYWluIGRhdGEgZm9ybSB3aXRoIGFsbCB0aGUgZGF0YSByZWxhdGluZyB0byB0aGUgc2xpZGVzIGFuZFxuICogYSBkaWN0aW9uYXJ5IHdpdGggdGhlIG5hbWUgcmVwcyB0aHVzIG1hZGUgaW5zdGFuY2Ugc2xpZGVOYW1lIGZvcm1zLlxuICogV2hlcmUgYSBmb3JtIGlzIGFzc29jaWF0ZWQgd2l0aCBlYWNoIGluc3RhbmNlIG9mIHRoZSByZXBlYXRpbmcgc2xpZGUuXG4gKiBleGFtcGxlOlxuICogc2ltcGxlIGZvcm06XG4gKiAge1xuICogICAgJHZhbHVlOiBcIkFHT1wiXG4gKiAgICBjaXR0YWRpbmFuemFfXzA6IFwiQUdPXCJcbiAqICAgIGNvZGljZV9maXNjYWxlX18wOiBcImpkZmxqZ2zDsmvDsmvDslwiXG4gKiAgICBjb3VudHJ5X18wOiBcIkFHT1wiXG4gKiAgICBkYXRlX2VuZDogXCIyMDIxLTAxLTEwXCJcbiAqICAgIGRhdGVfc3RhcnQ6IFwiMjAyMS0wMS0xMFwiXG4gKiAgICBkb2JfXzA6IFwiMjAyMS0wMy0xMVwiXG4gKiAgICBmaXJzdF9uYW1lX18wOiBcInBpcHBvXCJcbiAqICAgIGdlbmRlcl9fMDogXCJmXCJcbiAqICAgIGlkX2ZhbWlseTogXCIzYmVmM2EzZi1kOTVkLTRhMDktOGRmNC1lODEyYzU1YzYxYzZcIlxuICogICAgaXN0cnV6aW9uZV9fMDogbnVsbFxuICogICAgbGFzdF9uYW1lX18wOiBcInBpcHBvXCJcbiAqICAgIHBlcm1lc3NvX3NvZ2dpb3Jub19fMDogXCJub1wiXG4gKiAgICByZWxhemlvbmVfXzA6IFwiZ2VuaXRvcmVcIlxuICogICAgc29saWRhbmRvOiBcInNvbGlkYW5kbzFcIlxuICogICAgc3RhdG9fY2l2aWxlX18wOiBudWxsXG4gKiAgfVxuICogYWZ0ZXIgQlVJTERfREFUQVNFVFxuICogTWFpbkZvcm06XG4gKiB7XG4gKiAgICAkdmFsdWU6IFwiQUdPXCJcbiAqICAgIGFqZl9mb3JtX2lkOiAwICoqIGFkZGVkIGF0cmlidXRlIHRoYXQgcmFwcHJlc2VudCB0aGUgaW5kZXggcG9zaXRpb24gaW5zaWRlcyBpbnB1dCBmb3JtIGxpc3QuXG4gKiAgICBhamZfZmFtaWx5X2NvbXBvbmVudF9jb3VudDogMSoqIGFkZGVkIGF0cmlidXRlIHRoYXQgcmFwcHJlc2VudCB0aGUgaW5zdGFuY2UgbnVtYmVyIG9mIGZhbWlsaV9jb21wb25lbnQgcmVwZWF0aW5nIHNsaWRlcy5cbiAqICAgIGRhdGVfZW5kOiBcIjIwMjEtMDEtMTBcIlxuICogICAgZGF0ZV9zdGFydDogXCIyMDIxLTAxLTEwXCJcbiAqICAgIGlkX2ZhbWlseTogXCIzYmVmM2EzZi1kOTVkLTRhMDktOGRmNC1lODEyYzU1YzYxYzZcIlxuICogICAgcmVwczoge1xuICogICAgICBmYW1pbHlfY29tcG9uZW50OiBbXG4gKiAgICAgICAge1xuICogICAgICAgICAgYWpmX2ZhbWlseV9jb21wb25lbnRfcmVwOiAwICoqIGFkZGVkIGF0cmlidXRlIHRoYXQgcmFwcHJlc2VudCB0aGUgb3JkZXIgaW5zdGFuY2Ugb2YgZmFtaWx5X2NvbXBvbmVudCByZXBlYXRpbmcgc2xpZGUuXG4gKiAgICAgICAgICBjaXR0YWRpbmFuemE6IFwiQUdPXCJcbiAqICAgICAgICAgIGNvZGljZV9maXNjYWxlOiBcImpkZmxqZ2zDsmvDsmvDslwiXG4gKiAgICAgICAgICBjb3VudHJ5OiBcIkFHT1wiXG4gKiAgICAgICAgICBkb2I6IFwiMjAyMS0wMy0xMVwiXG4gKiAgICAgICAgICBmaXJzdF9uYW1lOiBcInBpcHBvXCJcbiAqICAgICAgICAgIGdlbmRlcjogXCJmXCJcbiAqICAgICAgICAgIGlzdHJ1emlvbmU6IG51bGxcbiAqICAgICAgICAgIGxhc3RfbmFtZTogXCJwaXBwb1wiXG4gKiAgICAgICAgICBwZXJtZXNzb19zb2dnaW9ybm86IFwibm9cIlxuICogICAgICAgICAgcmVsYXppb25lOiBcImdlbml0b3JlXCJcbiAqICAgICAgICAgIHN0YXRvX2NpdmlsZTogbnVsbFxuICogICAgICAgIH1cbiAqICAgICAgXVxuICogICAgfVxuICogfVxuICpcbiAqIEBwYXJhbSB7Rm9ybVtdfSBmb3Jtc1xuICogQHBhcmFtIHsqfSBbc2NoZW1hXSBpZiBzY2hlbWEgaXMgcHJvdmlkZWQgdGhlIGluc3RhbmNlcyBpbnNpZGUgdGhlIHJlcHMgbWF0Y2ggd2l0aCBlZmZlY3RpdmVcbiAqIHNsaWRlIG5hbWUuIE90aGVyd2lzZSBhbGwgcmVwZWF0aW5nIHNsaWRlcyBhcmUgYXNzb2NpYXRlcyB0byBnZW5lcmljIHNsaWRlIG5hbWUgXCJyZXBcIi5cbiAqIEByZXR1cm4geyp9ICB7TWFpbkZvcm1bXX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIEJVSUxEX0RBVEFTRVQoZm9ybXM6IEZvcm1bXSwgc2NoZW1hPzogYW55KTogTWFpbkZvcm1bXSB7XG4gIGNvbnN0IHJlczogTWFpbkZvcm1bXSA9IFtdO1xuICBjb25zdCBnZW5lcmF0ZU1ldGFkYXRhID0gKHNsaWRlTmFtZTogc3RyaW5nLCBzbGlkZUluc3RhbmNlOiBudW1iZXIpID0+IHtcbiAgICBjb25zdCByZXNnOiB7W3NuYW1lOiBzdHJpbmddOiBhbnl9ID0ge307XG4gICAgcmVzZ1tgYWpmXyR7c2xpZGVOYW1lfV9yZXBgXSA9IHNsaWRlSW5zdGFuY2U7XG4gICAgcmV0dXJuIHJlc2c7XG4gIH07XG5cbiAgZm9ybXMgPSBbLi4uKGZvcm1zIHx8IFtdKV07XG5cbiAgaWYgKHNjaGVtYSAhPSBudWxsKSB7XG4gICAgY29uc3QgcmVwZWF0aW5nU2xpZGVzOiBhbnlbXSA9IHNjaGVtYS5ub2Rlcy5maWx0ZXIoKG5vZGU6IGFueSkgPT4gbm9kZS5ub2RlVHlwZSA9PT0gNCk7XG4gICAgY29uc3Qgb2JqOiB7W2ZpZWxkTmFtZTogc3RyaW5nXTogc3RyaW5nfSA9IHt9O1xuICAgIHJlcGVhdGluZ1NsaWRlcy5mb3JFYWNoKHNsaWRlID0+IHtcbiAgICAgIGxldCBub2RlRmllbGRzID0gc2xpZGUubm9kZXMubWFwKChuOiBhbnkpID0+IG4ubmFtZSk7XG4gICAgICBub2RlRmllbGRzLmZvckVhY2goKG5vZGVGaWVsZDogc3RyaW5nKSA9PiB7XG4gICAgICAgIG9ialtub2RlRmllbGRdID0gc2xpZGUubmFtZTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZm9ybXMuZm9yRWFjaCgoZiwgZm9ybUlkeCkgPT4ge1xuICAgICAgY29uc3QgbWFpbkZvcm06IE1haW5Gb3JtID0ge3JlcHM6IHt9fTtcbiAgICAgIGNvbnN0IGZLZXlzOiBzdHJpbmdbXSA9IE9iamVjdC5rZXlzKGYpO1xuICAgICAgY29uc3QgaW5zdGFuY2VzOiB7W3NsaWRlTmFtZTogc3RyaW5nXTogYW55fSA9IHt9O1xuXG4gICAgICBmS2V5cy5mb3JFYWNoKGZrZXkgPT4ge1xuICAgICAgICBjb25zdCBzcGxpdHRlZEtleTogc3RyaW5nW10gPSBma2V5LnNwbGl0KCdfXycpO1xuICAgICAgICBjb25zdCBzcGxpdHRlZExlbmd0aDogbnVtYmVyID0gc3BsaXR0ZWRLZXkubGVuZ3RoO1xuICAgICAgICBjb25zdCBmaWVsZE5hbWUgPSBzcGxpdHRlZEtleVswXTtcbiAgICAgICAgY29uc3Qgc2xpZGVJbnN0YW5jZSA9XG4gICAgICAgICAgc3BsaXR0ZWRLZXlbMV0gIT0gbnVsbCAmJiBOdW1iZXIuaXNJbnRlZ2VyKCtzcGxpdHRlZEtleVsxXSkgPyArc3BsaXR0ZWRLZXlbMV0gOiBudWxsO1xuICAgICAgICBjb25zdCBzbGlkZU5hbWUgPSBvYmpbZmllbGROYW1lXTtcbiAgICAgICAgaWYgKHNwbGl0dGVkTGVuZ3RoID09PSAyICYmIHNsaWRlSW5zdGFuY2UgIT0gbnVsbCAmJiBzbGlkZU5hbWUgIT0gbnVsbCkge1xuICAgICAgICAgIGluc3RhbmNlc1tzbGlkZU5hbWVdID0gaW5zdGFuY2VzW3NsaWRlTmFtZV0gIT0gbnVsbCA/IGluc3RhbmNlc1tzbGlkZU5hbWVdIDogW107XG4gICAgICAgICAgaW5zdGFuY2VzW3NsaWRlTmFtZV1bc2xpZGVJbnN0YW5jZV0gPVxuICAgICAgICAgICAgaW5zdGFuY2VzW3NsaWRlTmFtZV1bc2xpZGVJbnN0YW5jZV0gIT0gbnVsbFxuICAgICAgICAgICAgICA/IGluc3RhbmNlc1tzbGlkZU5hbWVdW3NsaWRlSW5zdGFuY2VdXG4gICAgICAgICAgICAgIDogZ2VuZXJhdGVNZXRhZGF0YShzbGlkZU5hbWUsIHNsaWRlSW5zdGFuY2UpO1xuICAgICAgICAgIGluc3RhbmNlc1tzbGlkZU5hbWVdW3NsaWRlSW5zdGFuY2VdW2ZpZWxkTmFtZV0gPSBmW2ZrZXldO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG1haW5Gb3JtW2ZrZXldID0gZltma2V5XTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBtYWluRm9ybVtgYWpmX2Zvcm1faWRgXSA9IGZvcm1JZHg7XG4gICAgICBjb25zdCBpbnN0YW5jZUtleXMgPSBPYmplY3Qua2V5cyhpbnN0YW5jZXMpO1xuICAgICAgaW5zdGFuY2VLZXlzLmZvckVhY2goaW5zdGFuY2VLZXkgPT4ge1xuICAgICAgICBtYWluRm9ybVtgYWpmXyR7aW5zdGFuY2VLZXl9X2NvdW50YF0gPSBpbnN0YW5jZXNbaW5zdGFuY2VLZXldLmxlbmd0aDtcbiAgICAgIH0pO1xuICAgICAgbWFpbkZvcm0ucmVwcyA9IGluc3RhbmNlcztcbiAgICAgIHJlcy5wdXNoKG1haW5Gb3JtKTtcbiAgICB9KTtcbiAgICByZXR1cm4gcmVzO1xuICB9IGVsc2Uge1xuICAgIGZvcm1zLmZvckVhY2goZm9ybSA9PiB7XG4gICAgICBjb25zdCBmS2V5czogc3RyaW5nW10gPSBPYmplY3Qua2V5cyhmb3JtKTtcbiAgICAgIGNvbnN0IG5vUmVwZWF0aW5nRmllbGRzOiBzdHJpbmdbXSA9IGZLZXlzLmZpbHRlcihma2V5ID0+IHtcbiAgICAgICAgY29uc3Qgc3BsaXR0ZWRLZXk6IHN0cmluZ1tdID0gZmtleS5zcGxpdCgnX18nKTtcbiAgICAgICAgaWYgKHNwbGl0dGVkS2V5Lmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0pO1xuICAgICAgY29uc3Qgbm9SZXBGb3JtOiBGb3JtID0ge307XG5cbiAgICAgIG5vUmVwZWF0aW5nRmllbGRzLmZvckVhY2goZmllbGQgPT4ge1xuICAgICAgICBub1JlcEZvcm1bZmllbGRdID0gZm9ybVtmaWVsZF07XG4gICAgICB9KTtcblxuICAgICAgY29uc3QgbWFpbkZvcm06IE1haW5Gb3JtID0gey4uLm5vUmVwRm9ybSwgcmVwczoge3NsaWRlOiBbXX19O1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8PSBNQVhfUkVQUzsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRTbGlkZTogRm9ybSA9IHt9O1xuICAgICAgICBjb25zdCBvbmx5Q3VycmVudEluc3RhbmNlS2V5czogc3RyaW5nW10gPSBmS2V5cy5maWx0ZXIoZmtleSA9PiB7XG4gICAgICAgICAgY29uc3Qgc3BsaXR0ZWRLZXk6IHN0cmluZ1tdID0gZmtleS5zcGxpdCgnX18nKTtcbiAgICAgICAgICBpZiAoc3BsaXR0ZWRLZXkubGVuZ3RoID09PSAyKSB7XG4gICAgICAgICAgICByZXR1cm4gZmtleS5pbmRleE9mKGBfXyR7aX1gKSA+IC0xO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBzZSBpbCBudW1lcm8gZGkgYXR0cmlidXRpIGNvaW5jaWRlIGlsIGZvcm0gZGF0YSBub24gaGEgcmVwZWF0aW5nc2xpZGVzXG4gICAgICAgIGlmIChvbmx5Q3VycmVudEluc3RhbmNlS2V5cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICBtYWluRm9ybVsnYWpmX3JlcF9jb3VudCddID0gaTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBvbmx5Q3VycmVudEluc3RhbmNlS2V5cy5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgY29uc3Qgc3BsaXR0ZWRLZXkgPSBrZXkuc3BsaXQoJ19fJyk7XG4gICAgICAgICAgY29uc3QgZmllbGROYW1lID0gc3BsaXR0ZWRLZXlbMF07XG4gICAgICAgICAgY29uc3Qgc2xpZGVJbnN0YW5jZSA9IHNwbGl0dGVkS2V5WzFdICE9IG51bGwgPyArc3BsaXR0ZWRLZXlbMV0gOiBudWxsO1xuICAgICAgICAgIGN1cnJlbnRTbGlkZVtmaWVsZE5hbWVdID0gZm9ybVtrZXldO1xuICAgICAgICAgIGN1cnJlbnRTbGlkZVsnYWpmX3JlcCddID0gc2xpZGVJbnN0YW5jZSAhPSBudWxsID8gc2xpZGVJbnN0YW5jZSA6IGN1cnJlbnRTbGlkZVsnYWpmX3JlcCddO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKG9ubHlDdXJyZW50SW5zdGFuY2VLZXlzLmxlbmd0aCAhPSAwKSB7XG4gICAgICAgICAgbWFpbkZvcm0ucmVwcyFbJ3NsaWRlJ10ucHVzaChjdXJyZW50U2xpZGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG1haW5Gb3JtLnJlcHMgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJlcy5wdXNoKG1haW5Gb3JtKTtcbiAgICB9KTtcblxuICAgIHJldHVybiByZXM7XG4gIH1cbn1cblxuLyoqXG4gKiBVVElMSVRZIEZVTkNJT05cbiAqIFRoaXMgZnVuY3Rpb24gdGFrZSBhbiBhamYgc2NoZW1hIGFzIGlucHV0IGFuZCBleHRyYWN0IGFcbiAqIGRpY3QgdGhhdCBtYXRjaCBlYWNoIGNob2ljZSB2YWx1ZSAoYWxzbyB3aXRoIGNob2ljZXNPcmlnaW4gbmFtZSBwcmVmaXgpIHdpdGggaXRzIGxhYmVsXG4gKiBAcGFyYW0gc2NoZW1hIHRoZSBhamYgc2NoZW1hXG4gKiBAcmV0dXJucyBBIGRpY3Qgd2l0aDpcbiAqICB7W2Nob2ljZXNPcmlnaW5OYW1lX2Nob2ljZVZhbHVlOiBzdHJpbmddOiBbY2hvaWNlTGFiZWw6IHN0cmluZ119XG4gKiAge1tjaG9pY2VWYWx1ZTogc3RyaW5nXTogW2Nob2ljZUxhYmVsOiBzdHJpbmddfVxuICovXG5mdW5jdGlvbiBleHRyYWN0TGFiZWxzQnlTY2hlbWFDaG9pY2VzKHNjaGVtYTogYW55KToge1tjaG9pY2VWYWx1ZTogc3RyaW5nXTogc3RyaW5nfSB7XG4gIGNvbnN0IGNob2ljZUxhYmVsczoge1tjaG9pY2VWYWx1ZTogc3RyaW5nXTogc3RyaW5nfSA9IHt9O1xuICBpZiAoc2NoZW1hICYmIHNjaGVtYS5jaG9pY2VzT3JpZ2lucyAhPSBudWxsKSB7XG4gICAgKHNjaGVtYS5jaG9pY2VzT3JpZ2lucyBhcyBhbnlbXSkuZm9yRWFjaChjaG9pY2VzT3JpZ2luID0+IHtcbiAgICAgIGlmIChjaG9pY2VzT3JpZ2luICE9IG51bGwgJiYgY2hvaWNlc09yaWdpbi5jaG9pY2VzICE9IG51bGwpIHtcbiAgICAgICAgKGNob2ljZXNPcmlnaW4uY2hvaWNlcyBhcyBhbnlbXSkuZm9yRWFjaChjaG9pY2UgPT4ge1xuICAgICAgICAgIGNob2ljZUxhYmVsc1tjaG9pY2VzT3JpZ2luLm5hbWUgKyAnXycgKyBjaG9pY2UudmFsdWVdID0gY2hvaWNlLmxhYmVsO1xuICAgICAgICAgIGNob2ljZUxhYmVsc1tjaG9pY2UudmFsdWVdID0gY2hvaWNlLmxhYmVsO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICByZXR1cm4gY2hvaWNlTGFiZWxzO1xufVxuXG4vKipcbiAqIFVUSUxJVFkgRlVOQ0lPTlxuICogVGhpcyBmdW5jdGlvbiB0YWtlIGFuIGFqZiBzY2hlbWEgYXMgaW5wdXQgYW5kIGV4dHJhY3QgYSBvbmVcbiAqIGRpbWVuc2lvbmFsIGFycmF5IG9mIEFqZk5vZGUgZm9yIGVhY2ggc2xpZGUncyBmaWVsZFxuICpcbiAqIEBwYXJhbSBzY2hlbWEgdGhlIGFqZiBzY2hlbWFcbiAqIEByZXR1cm5zIEFuIG9iamVjdCB3aXRoIGFsbCBmaWVsZHM6XG4gKiAge1tmaWVsZE5hbWU6IHN0cmluZ106IGFqZiBmaWVsZH1cbiAqL1xuZnVuY3Rpb24gZXh0cmFjdEZsYXR0ZW5Ob2RlcyhzY2hlbWE6IGFueSk6IHtbZmllbGQ6IHN0cmluZ106IGFueX0ge1xuICBjb25zdCBmaWVsZE5vZGVzOiB7W2ZpZWxkOiBzdHJpbmddOiBhbnl9ID0ge307XG4gIGlmIChzY2hlbWEgJiYgc2NoZW1hLm5vZGVzKSB7XG4gICAgY29uc3Qgc2xpZGVzOiBhbnlbXSA9IHNjaGVtYS5ub2Rlcy5maWx0ZXIoXG4gICAgICAobm9kZTogYW55KSA9PiBub2RlLm5vZGVUeXBlID09PSAzIHx8IG5vZGUubm9kZVR5cGUgPT09IDQsXG4gICAgKTtcbiAgICBzbGlkZXMuZm9yRWFjaChzbGlkZSA9PiB7XG4gICAgICBzbGlkZS5ub2Rlc1xuICAgICAgICAuZmlsdGVyKChub2RlOiBhbnkpID0+IG5vZGUubm9kZVR5cGUgPT09IDApXG4gICAgICAgIC5mb3JFYWNoKChmaWVsZE5vZGU6IGFueSkgPT4ge1xuICAgICAgICAgIGZpZWxkTm9kZXNbZmllbGROb2RlLm5hbWVdID0gZmllbGROb2RlO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfVxuICByZXR1cm4gZmllbGROb2Rlcztcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgY2xvbmUgb2YgZm9ybXMsIHdoZXJlIHRoZSBzcGVjaWZpZWQgZmllbGRzIGFyZSByZXBsYWNlZCBieSB0aGUgY29ycmVzcG9uZGluZyBsYWJlbHMsXG4gKiBhcyBkZWZpbmVkIGJ5IHRoZSBjaG9pY2Ugb3JpZ2lucyBpbiBzY2hlbWEuXG4gKlxuICogQHBhcmFtIHtNYWluRm9ybVtdfSBmb3JtTGlzdFxuICogQHBhcmFtIHsqfSBzY2hlbWEgdGhlIGFqZiBzY2hlbWFcbiAqIEBwYXJhbSB7c3RyaW5nW119IGZpZWxkTmFtZXNcbiAqIEByZXR1cm4geyp9ICB7TWFpbkZvcm1bXX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIEFQUExZX0xBQkVMUyhmb3JtTGlzdDogTWFpbkZvcm1bXSwgc2NoZW1hOiBhbnksIGZpZWxkTmFtZXM6IHN0cmluZ1tdKTogTWFpbkZvcm1bXSB7XG4gIGZvcm1MaXN0ID0gY2xvbmVNYWluRm9ybXMoZm9ybUxpc3QpO1xuICBjb25zdCBjaG9pY2VMYWJlbHM6IHtbZmllbGROYW1lOiBzdHJpbmddOiBzdHJpbmd9ID0gZXh0cmFjdExhYmVsc0J5U2NoZW1hQ2hvaWNlcyhzY2hlbWEpO1xuICBjb25zdCBmbGF0dGVuTm9kZXMgPSBleHRyYWN0RmxhdHRlbk5vZGVzKHNjaGVtYSk7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBmb3JtTGlzdC5sZW5ndGg7IGkrKykge1xuICAgIGlmIChmb3JtTGlzdFtpXSA9PSBudWxsKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgaWYgKGZvcm1MaXN0W2ldLnJlcHMgIT0gbnVsbCkge1xuICAgICAgY29uc3QgZiA9IGZvcm1MaXN0W2ldO1xuICAgICAgY29uc3QgZktleXM6IHN0cmluZ1tdID0gT2JqZWN0LmtleXMoZik7XG4gICAgICBmS2V5cy5mb3JFYWNoKGZrZXkgPT4ge1xuICAgICAgICBjb25zdCBmaWVsZE5vZGUgPSBmbGF0dGVuTm9kZXNbZmtleV07XG4gICAgICAgIGNvbnN0IGNob2ljZU9yaWdpbk5hbWVQcmVmaXggPVxuICAgICAgICAgIGZpZWxkTm9kZSAmJiBmaWVsZE5vZGUuY2hvaWNlc09yaWdpblJlZiA/IGZpZWxkTm9kZS5jaG9pY2VzT3JpZ2luUmVmICsgJ18nIDogJyc7XG5cbiAgICAgICAgaWYgKGZpZWxkTmFtZXMuaW5jbHVkZXMoZmtleSkgJiYgZltma2V5XSAhPT0gbnVsbCkge1xuICAgICAgICAgIGxldCBjaG9pY2VWYWx1ZTogc3RyaW5nW10gPSBbXTtcbiAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShmW2ZrZXldKSkge1xuICAgICAgICAgICAgY2hvaWNlVmFsdWUgPSBmW2ZrZXldIGFzIHVua25vd24gYXMgc3RyaW5nW107XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IG11bHRpcGxlVmFscyA9IChmW2ZrZXldIGFzIHN0cmluZykuc3BsaXQoJywnKS5tYXAodiA9PiB2LnRyaW0oKSk7XG4gICAgICAgICAgICBpZiAobXVsdGlwbGVWYWxzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgY2hvaWNlVmFsdWUgPSBtdWx0aXBsZVZhbHM7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBjaG9pY2VWYWx1ZSA9IFtmW2ZrZXldIGFzIHN0cmluZ107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChjaG9pY2VWYWx1ZSAhPSBudWxsKSB7XG4gICAgICAgICAgICBjb25zdCBsYWJlbHMgPSBjaG9pY2VWYWx1ZS5tYXAodmFsID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgdmFsV2l0aFByZWZpeCA9IGNob2ljZU9yaWdpbk5hbWVQcmVmaXggKyB2YWw7XG4gICAgICAgICAgICAgIHJldHVybiBjaG9pY2VMYWJlbHNbdmFsV2l0aFByZWZpeF0gIT0gbnVsbFxuICAgICAgICAgICAgICAgID8gY2hvaWNlTGFiZWxzW3ZhbFdpdGhQcmVmaXhdXG4gICAgICAgICAgICAgICAgOiBjaG9pY2VMYWJlbHNbdmFsXSAhPSBudWxsXG4gICAgICAgICAgICAgICAgPyBjaG9pY2VMYWJlbHNbdmFsXVxuICAgICAgICAgICAgICAgIDogdmFsO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAobGFiZWxzICYmIGxhYmVscy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgY29uc3QgbGFiZWxGaWVsZE5hbWUgPSBma2V5ICsgJ19jaG9pY2VzTGFiZWwnO1xuICAgICAgICAgICAgICBmb3JtTGlzdFtpXVtsYWJlbEZpZWxkTmFtZV0gPSBsYWJlbHMubGVuZ3RoID4gMSA/IGxhYmVscy5qb2luKCcsICcpIDogbGFiZWxzWzBdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBmb3JtTGlzdDtcbn1cblxuLyoqXG4gKiBEZXByZWNhdGVkLiBVc2UgRklMVEVSX0JZXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBGSUxURVJfQllfVkFSUyhmb3JtTGlzdDogTWFpbkZvcm1bXSwgZXhwcmVzc2lvbjogc3RyaW5nKTogTWFpbkZvcm1bXSB7XG4gIHJldHVybiBGSUxURVJfQlkoZm9ybUxpc3QsIGV4cHJlc3Npb24pO1xufVxuXG4vKipcbiAqIFJldHVybnMgYSBjb3B5IG9mIGZvcm1zIGFuZCBpdHMgcmVwZXRpdGlvbnMsIGtlZXBpbmcgb25seSB0aGUgb25lcyBmb3Igd2hpY2ggZXhwcmVzc2lvbiBldmFsdWF0ZXMgdG8gdHJ1ZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIEZJTFRFUl9CWShmb3JtczogTWFpbkZvcm1bXSwgZXhwcmVzc2lvbjogRnVuY3xzdHJpbmcpOiBNYWluRm9ybVtdIHtcbiAgZm9ybXMgPSBmb3JtcyB8fCBbXTtcbiAgaWYgKGV4cHJlc3Npb24gPT09ICd0cnVlJykge1xuICAgIHJldHVybiBjbG9uZU1haW5Gb3Jtcyhmb3Jtcyk7XG4gIH1cbiAgaWYgKHR5cGVvZihleHByZXNzaW9uKSA9PT0gJ3N0cmluZycpIHtcbiAgICBleHByZXNzaW9uID0gY3JlYXRlRnVuY3Rpb24oZXhwcmVzc2lvbik7XG4gIH1cbiAgY29uc3QgcmVzOiBNYWluRm9ybVtdID0gW107XG4gIGZvciAobGV0IGZvcm0gb2YgZm9ybXMuZmlsdGVyKGYgPT4gZiAhPSBudWxsKSkge1xuICAgIGZvcm0gPSB7Li4uZm9ybX07XG4gICAgY29uc3QgZmlsdGVyZWRSZXBzOiBJbnN0YW5jZXMgPSB7fTtcbiAgICBsZXQgc29tZVJlcHMgPSBmYWxzZTtcbiAgICBpZiAoZm9ybS5yZXBzICE9IG51bGwpIHtcbiAgICAgIGZvciAoY29uc3Qga2V5IGluIGZvcm0ucmVwcykge1xuICAgICAgICBmaWx0ZXJlZFJlcHNba2V5XSA9IGZvcm0ucmVwc1trZXldLmZpbHRlcihyZXAgPT5cbiAgICAgICAgICAoZXhwcmVzc2lvbiBhcyBGdW5jKSh7Li4uZm9ybSwgLi4ucmVwfSlcbiAgICAgICAgKTtcbiAgICAgICAgZm9ybVtgYWpmXyR7a2V5fV9jb3VudGBdID0gZmlsdGVyZWRSZXBzW2tleV0ubGVuZ3RoO1xuICAgICAgICBzb21lUmVwcyB8fD0gZmlsdGVyZWRSZXBzW2tleV0ubGVuZ3RoID4gMDtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHNvbWVSZXBzIHx8IGV4cHJlc3Npb24oZm9ybSkpIHtcbiAgICAgIGZvcm0ucmVwcyA9IGZpbHRlcmVkUmVwcztcbiAgICAgIHJlcy5wdXNoKGZvcm0pO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzO1xufVxuXG4vKipcbiAqIFJldHVybnMgdG9kYXkncyBkYXRlLlxuICpcbiAqIEBleHBvcnRcbiAqIEBwYXJhbSB7c3RyaW5nfSBbZm9ybWF0PSd5eXl5LU1NLWRkJ11cbiAqIEByZXR1cm4geyp9ICB7c3RyaW5nfVxuICovXG5leHBvcnQgZnVuY3Rpb24gVE9EQVkoZm9ybWF0ID0gJ3l5eXktTU0tZGQnKTogc3RyaW5nIHtcbiAgcmV0dXJuIGRhdGVGbnMuZm9ybWF0KG5ldyBEYXRlKCksIGZvcm1hdCk7XG59XG5cbi8qKlxuICogTG9ncyB2YWwgdG8gdGhlIGNvbnNvbGUuXG4gKiBcbiAqIEBleHBvcnRcbiAqIEBwYXJhbSB7Kn0gdmFsXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBDT05TT0xFX0xPRyh2YWw6IGFueSk6IHZvaWQge1xuICBjb25zb2xlLmxvZyh2YWwpO1xufVxuXG4vKipcbiAqIENvbXB1dGVzIHRoZSBjdXJyZW50IGFnZSBpbiB5ZWFycywgZ2l2ZW4gdGhlIGRhdGUgb2YgYmlydGguXG4gKlxuICogQGV4cG9ydFxuICogQHBhcmFtIHsoc3RyaW5nIHwgbnVsbCl9IGRvYlxuICogQHJldHVybiB7Kn0gIHtudW1iZXJ9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBHRVRfQUdFKGRvYjogc3RyaW5nIHwgbnVsbCk6IG51bWJlciB7XG4gIGlmIChkb2IgPT0gbnVsbCkge1xuICAgIHJldHVybiBOYU47XG4gIH1cbiAgcmV0dXJuIGRhdGVGbnMuZGlmZmVyZW5jZUluWWVhcnMobmV3IERhdGUoKSwgbmV3IERhdGUoZG9iKSk7XG59XG5cbi8qKlxuICogSWYgZGF0YSBpcyBhIGZvcm0gd2l0aCByZXBldGl0aW9ucywgcmV0dXJucyB0aGUgbnVtYmVyIG9mIHJlcGV0aXRpb25zO1xuICogSWYgZGF0YSBpcyBhbiBhcnJheSwgcmV0dXJucyBpdHMgbGVuZ3RoO1xuICogT3RoZXJ3aXNlIHJldHVybnMgMC5cbiAqXG4gKiBAZXhwb3J0XG4gKiBAcGFyYW0geyhNYWluRm9ybSB8IGFueVtdKX0gZGF0YXNldFxuICogQHJldHVybiB7Kn0gIHtudW1iZXJ9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBMRU4oZGF0YXNldDogTWFpbkZvcm0gfCBhbnlbXSk6IG51bWJlciB7XG4gIGlmIChkYXRhc2V0ID09IG51bGwpIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuICBjb25zdCBmb3JtID0gZGF0YXNldCBhcyBNYWluRm9ybTtcbiAgaWYgKGZvcm0ucmVwcyAhPSBudWxsKSB7XG4gICAgcmV0dXJuIGFsbFJlcHMoZm9ybSkubGVuZ3RoO1xuICB9XG4gIHJldHVybiAoZGF0YXNldCBhcyBhbnlbXSkubGVuZ3RoIHx8IDA7XG59XG5cbi8qKlxuICogQXJyYXkgY29uY2F0ZW5hdGlvbi5cbiAqXG4gKiBAZXhwb3J0XG4gKiBAcGFyYW0ge2FueVtdfSBhXG4gKiBAcGFyYW0ge2FueVtdfSBiXG4gKiBAcmV0dXJuIHsqfSAge2FueVtdfVxuICovXG5leHBvcnQgZnVuY3Rpb24gQ09OQ0FUKGE6IGFueVtdLCBiOiBhbnlbXSk6IGFueVtdIHtcbiAgcmV0dXJuIGEuY29uY2F0KGIpO1xufVxuXG4vKipcbiAqIFJlbW92ZXMgZHVwbGljYXRlIGVsZW1lbnRzIGZyb20gYW4gYXJyYXkuXG4gKlxuICogQGV4cG9ydFxuICogQHBhcmFtIHthbnlbXX0gYXJyXG4gKiBAcmV0dXJuIHsqfSAge2FueVtdfVxuICovXG5leHBvcnQgZnVuY3Rpb24gUkVNT1ZFX0RVUExJQ0FURVMoYXJyOiBhbnlbXSk6IGFueVtdIHtcbiAgcmV0dXJuIFsuLi5uZXcgTWFwKGFyci5tYXAodiA9PiBbSlNPTi5zdHJpbmdpZnkodiksIHZdKSkudmFsdWVzKCldO1xufVxuXG4vLyBSZXR1cm5zIHRoZSBkYXRlIG9idGFpbmVkIGJ5IGFkZGluZyBkYXlzIHRvIGRhdGUuXG5leHBvcnQgZnVuY3Rpb24gQUREX0RBWVMoZGF0ZTogc3RyaW5nLCBkYXlzOiBudW1iZXIpOiBzdHJpbmcge1xuICBjb25zdCBkID0gbmV3IERhdGUoZGF0ZSk7XG4gIGQuc2V0RGF0ZShkLmdldERhdGUoKSArIGRheXMpO1xuICByZXR1cm4gZC50b0pTT04oKS5zbGljZSgwLCAxMCk7XG59XG5cbi8vIFJldHVybnMgdGhlIGRpZmZlcmVuY2UgaW4gZGF5cyAoYSAtIGIpIGJldHdlZW4gdGhlIHR3byBkYXRlcy5cbmV4cG9ydCBmdW5jdGlvbiBEQVlTX0RJRkYoYTogc3RyaW5nLCBiOiBzdHJpbmcpOiBudW1iZXIge1xuICBjb25zdCBkYXRlQSA9IG5ldyBEYXRlKGEpO1xuICBjb25zdCBkYXRlQiA9IG5ldyBEYXRlKGIpO1xuICAvLyBVVEMgYXZvaWRzIGJ1Z3Mgd2l0aCBkYXlsaWdodCBzYXZpbmcgdGltZS5cbiAgY29uc3QgdXRjQSA9IERhdGUuVVRDKGRhdGVBLmdldEZ1bGxZZWFyKCksIGRhdGVBLmdldE1vbnRoKCksIGRhdGVBLmdldERhdGUoKSk7XG4gIGNvbnN0IHV0Y0IgPSBEYXRlLlVUQyhkYXRlQi5nZXRGdWxsWWVhcigpLCBkYXRlQi5nZXRNb250aCgpLCBkYXRlQi5nZXREYXRlKCkpO1xuXG4gIGNvbnN0IG1pbGxpc1BlckRheSA9IDEwMDAgKiA2MCAqIDYwICogMjQ7XG4gIHJldHVybiBNYXRoLmZsb29yKCh1dGNBIC0gdXRjQikgLyBtaWxsaXNQZXJEYXkpO1xufVxuXG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiBkYXRlIGlzIGJlZm9yZSBkYXRlVG9Db21wYXJlLlxuICpcbiAqIEBleHBvcnRcbiAqIEBwYXJhbSB7c3RyaW5nfSBkYXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gZGF0ZVRvQ29tcGFyZVxuICogQHJldHVybiB7Kn0gIHtib29sZWFufVxuICovXG5leHBvcnQgZnVuY3Rpb24gSVNfQkVGT1JFKGRhdGU6IHN0cmluZywgZGF0ZVRvQ29tcGFyZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gIGNvbnN0IGRhdGVBOiBEYXRlID0gZGF0ZUZucy5wYXJzZUlTTyhkYXRlKTtcbiAgY29uc3QgZGF0ZUI6IERhdGUgPSBkYXRlRm5zLnBhcnNlSVNPKGRhdGVUb0NvbXBhcmUpO1xuICByZXR1cm4gZGF0ZUZucy5pc0JlZm9yZShkYXRlQSwgZGF0ZUIpO1xufVxuXG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiBkYXRlIGlzIGFmdGVyIGRhdGVUb0NvbXBhcmUuXG4gKlxuICogQGV4cG9ydFxuICogQHBhcmFtIHtzdHJpbmd9IGRhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBkYXRlVG9Db21wYXJlXG4gKiBAcmV0dXJuIHsqfSAge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBJU19BRlRFUihkYXRlOiBzdHJpbmcsIGRhdGVUb0NvbXBhcmU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICBjb25zdCBkYXRlQTogRGF0ZSA9IGRhdGVGbnMucGFyc2VJU08oZGF0ZSk7XG4gIGNvbnN0IGRhdGVCOiBEYXRlID0gZGF0ZUZucy5wYXJzZUlTTyhkYXRlVG9Db21wYXJlKTtcbiAgcmV0dXJuIGRhdGVGbnMuaXNBZnRlcihkYXRlQSwgZGF0ZUIpO1xufVxuXG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiBkYXRlIGlzIGJldHdlZW4gZGF0ZVN0YXJ0IGFuZCBkYXRlRW5kLlxuICpcbiAqIEBleHBvcnRcbiAqIEBwYXJhbSB7c3RyaW5nfSBkYXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gZGF0ZVN0YXJ0XG4gKiBAcGFyYW0ge3N0cmluZ30gZGF0ZUVuZFxuICogQHJldHVybiB7Kn0gIHtib29sZWFufVxuICovXG5leHBvcnQgZnVuY3Rpb24gSVNfV0lUSElOX0lOVEVSVkFMKGRhdGU6IHN0cmluZywgZGF0ZVN0YXJ0OiBzdHJpbmcsIGRhdGVFbmQ6IHN0cmluZyk6IGJvb2xlYW4ge1xuICBjb25zdCBkYXRlVG9Db21wYXJlOiBEYXRlID0gZGF0ZUZucy5wYXJzZUlTTyhkYXRlKTtcbiAgY29uc3QgaW50ZXJ2YWw6IEludGVydmFsID0ge1xuICAgIHN0YXJ0OiBkYXRlRm5zLnBhcnNlSVNPKGRhdGVTdGFydCksXG4gICAgZW5kOiBkYXRlRm5zLnBhcnNlSVNPKGRhdGVFbmQpLFxuICB9O1xuICByZXR1cm4gZGF0ZUZucy5pc1dpdGhpbkludGVydmFsKGRhdGVUb0NvbXBhcmUsIGludGVydmFsKTtcbn1cblxuLyoqXG4gKiBDb21wYXJlcyBkYXRlIHdpdGggYW4gaW50ZXJ2YWwuXG4gKiBSZXR1cm5zICctMScgKG9yIHRoZSBmaXJzdCBlbGVtZW50IG9mIGxhYmVscykgaWYgZGF0ZSBpcyBiZWZvcmUgZGF0ZVN0YXJ0LFxuICogJzAnIChvciB0aGUgc2Vjb25kIGVsZW1lbnQpIGlmIGRhdGUgaXMgYmV0d2VlbiBkYXRlU3RhcnQgYW5kIGRhdGVFbmQsXG4gKiAnMScgKG9yIHRoZSB0aGlyZCBlbGVtZW50KSBpZiBkYXRlIGlzIGFmdGVyIGRhdGVFbmQuXG4gKlxuICogQGV4cG9ydFxuICogQHBhcmFtIHtzdHJpbmd9IGRhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBkYXRlU3RhcnRcbiAqIEBwYXJhbSB7c3RyaW5nfSBkYXRlRW5kXG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBsYWJlbHMgYW4gb3B0aW9uYWwgYXJyYXkgb2Ygc3RyaW5nIGZvciB0aGUgb3V0cHV0IHZhbHVlc1xuICogQHJldHVybiB7Kn0gIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBDT01QQVJFX0RBVEUoXG4gIGRhdGU6IHN0cmluZyxcbiAgZGF0ZVN0YXJ0OiBzdHJpbmcsXG4gIGRhdGVFbmQ6IHN0cmluZyxcbiAgbGFiZWxzPzogc3RyaW5nW10sXG4pOiBzdHJpbmcge1xuICBjb25zdCBkYXRlVG9Db21wYXJlOiBEYXRlID0gZGF0ZUZucy5wYXJzZUlTTyhkYXRlKTtcbiAgY29uc3QgZGF0ZUE6IERhdGUgPSBkYXRlRm5zLnBhcnNlSVNPKGRhdGVTdGFydCk7XG4gIGNvbnN0IGRhdGVCOiBEYXRlID0gZGF0ZUZucy5wYXJzZUlTTyhkYXRlRW5kKTtcbiAgY29uc3QgaW50ZXJ2YWw6IEludGVydmFsID0ge1xuICAgIHN0YXJ0OiBkYXRlQSxcbiAgICBlbmQ6IGRhdGVCLFxuICB9O1xuICBpZiAobGFiZWxzID09IG51bGwpIHtcbiAgICBsYWJlbHMgPSBbJy0xJywgJzAnLCAnMSddO1xuICB9XG4gIGlmIChkYXRlRm5zLmlzQmVmb3JlKGRhdGVUb0NvbXBhcmUsIGRhdGVBKSkge1xuICAgIHJldHVybiBsYWJlbHNbMF07XG4gIH1cbiAgaWYgKGRhdGVGbnMuaXNXaXRoaW5JbnRlcnZhbChkYXRlVG9Db21wYXJlLCBpbnRlcnZhbCkpIHtcbiAgICByZXR1cm4gbGFiZWxzWzFdO1xuICB9XG4gIGlmIChkYXRlRm5zLmlzQWZ0ZXIoZGF0ZVRvQ29tcGFyZSwgZGF0ZUIpKSB7XG4gICAgcmV0dXJuIGxhYmVsc1syXTtcbiAgfVxuICByZXR1cm4gJyc7XG59XG5cbi8qKlxuICogUGVyZm9ybXMgYSBsZWZ0IGpvaW4gb2YgZm9ybXNBIGFuZCBmb3Jtc0IuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBKT0lOX0ZPUk1TKFxuICBmb3Jtc0E6IChNYWluRm9ybSB8IEZvcm0pW10sXG4gIGZvcm1zQjogKE1haW5Gb3JtIHwgRm9ybSlbXSxcbiAga2V5QTogc3RyaW5nLFxuICBrZXlCPzogc3RyaW5nLFxuKTogKE1haW5Gb3JtIHwgRm9ybSlbXSB7XG4gIHJldHVybiBKT0lOX1JFUEVBVElOR19TTElERVMoZm9ybXNBLCBmb3Jtc0IsIGtleUEsIGtleUIgYXMgYW55LCBudWxsIGFzIGFueSk7XG59XG5cbi8qKlxuICogUGVyZm9ybXMgYSBsZWZ0IGpvaW4gb2YgZm9ybXNBIGFuZCBmb3Jtc0IsIGxpa2UgSk9JTl9GT1JNUy5cbiAqIEluIGFkZGl0aW9uLCBmb3IgZWFjaCBtYXRjaGluZyBwYWlyIG9mIGZvcm1BIGFuZCBmb3JtQiwgdGhlaXIgcmVwZWF0aW5nIHNsaWRlcyBhcmUgYWxzbyBqb2luZWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBKT0lOX1JFUEVBVElOR19TTElERVMoXG4gIGZvcm1zQTogTWFpbkZvcm1bXSxcbiAgZm9ybXNCOiBNYWluRm9ybVtdLFxuICBrZXlBOiBzdHJpbmcsXG4gIGtleUI6IHN0cmluZyxcbiAgc3Via2V5QTogc3RyaW5nLFxuICBzdWJrZXlCPzogc3RyaW5nLFxuKTogTWFpbkZvcm1bXSB7XG4gIGZvcm1zQSA9IGNsb25lTWFpbkZvcm1zKGZvcm1zQSB8fCBbXSk7XG4gIGZvcm1zQiA9IGNsb25lTWFpbkZvcm1zKGZvcm1zQiB8fCBbXSk7XG4gIGlmIChrZXlCID09IG51bGwpIHtcbiAgICBrZXlCID0ga2V5QTtcbiAgfVxuICBpZiAoc3Via2V5QiA9PSBudWxsKSB7XG4gICAgc3Via2V5QiA9IHN1YmtleUE7XG4gIH1cbiAgY29uc3QgaW5kZXhCOiB7W3ZhbDogc3RyaW5nXTogTWFpbkZvcm19ID0ge307XG4gIGZvciAobGV0IGkgPSBmb3Jtc0IubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICBjb25zdCB2YWwgPSBmb3Jtc0JbaV0gJiYgZm9ybXNCW2ldW2tleUJdO1xuICAgIGlmICh2YWwgIT0gbnVsbCkge1xuICAgICAgaW5kZXhCW1N0cmluZyh2YWwpXSA9IGZvcm1zQltpXTtcbiAgICB9XG4gIH1cbiAgY29uc3QgcmVzOiBNYWluRm9ybVtdID0gW107XG4gIGZvciAoY29uc3QgZm9ybUEgb2YgZm9ybXNBKSB7XG4gICAgY29uc3QgdmFsID0gZm9ybUEgJiYgZm9ybUFba2V5QV07XG4gICAgY29uc3QgZm9ybUIgPSBpbmRleEJbU3RyaW5nKHZhbCldO1xuICAgIGlmICh2YWwgPT0gbnVsbCB8fCBmb3JtQiA9PSBudWxsKSB7XG4gICAgICByZXMucHVzaChmb3JtQSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgY29uc3QgcmVwc0EgPSBmb3JtQS5yZXBzIHx8IHt9O1xuICAgIGNvbnN0IHJlcHNCID0gZm9ybUIucmVwcyB8fCB7fTtcbiAgICBpZiAoc3Via2V5QSAhPSBudWxsKSB7XG4gICAgICBjb25zdCBhbGxSZXBzQiA9IGFsbFJlcHMoZm9ybUIpO1xuICAgICAgZm9yIChjb25zdCBrIGluIHJlcHNBKSB7XG4gICAgICAgIHJlcHNBW2tdID0gSk9JTl9GT1JNUyhyZXBzQVtrXSwgYWxsUmVwc0IsIHN1YmtleUEsIHN1YmtleUIpIGFzIEZvcm1bXTtcbiAgICAgICAgZm9ybUFbYGFqZl8ke2t9X2NvdW50YF0gPSByZXBzQVtrXS5sZW5ndGg7XG4gICAgICB9XG4gICAgfVxuICAgIHJlcy5wdXNoKHsuLi5mb3JtQiwgLi4uZm9ybUEsIHJlcHM6IHsuLi5yZXBzQiwgLi4ucmVwc0F9fSk7XG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBhcnJheSBvYnRhaW5lZCBieSBldmFsdWF0aW5nIGV4cHJlc3Npb24gZm9yIGV2ZXJ5IHJlcGV0aXRpb24gb2YgZm9ybS5cbiAqXG4gKiBAZXhwb3J0XG4gKiBAcGFyYW0ge01haW5Gb3JtfSBmb3JtXG4gKiBAcGFyYW0ge3N0cmluZ30gZXhwcmVzc2lvblxuICogQHJldHVybiB7Kn0gIHthbnlbXX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIEZST01fUkVQUyhmb3JtOiBNYWluRm9ybSwgZXhwcmVzc2lvbjogRnVuY3xzdHJpbmcpOiBhbnlbXSB7XG4gIGlmICh0eXBlb2YoZXhwcmVzc2lvbikgPT09ICdzdHJpbmcnKSB7XG4gICAgZXhwcmVzc2lvbiA9IGNyZWF0ZUZ1bmN0aW9uKGV4cHJlc3Npb24pO1xuICB9XG4gIHJldHVybiBhbGxSZXBzKGZvcm0gfHwge30pLm1hcChyZXAgPT5cbiAgICAoZXhwcmVzc2lvbiBhcyBGdW5jKSh7Li4uZm9ybSwgLi4ucmVwfSlcbiAgKTtcbn1cblxuLyoqXG4gKiBEZXByZWNhdGVkLiBVc2UgSU5DTFVERVNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIElTSU4oZGF0YXNldDogYW55W10sIHZhbHVlOiBhbnkpOiBib29sZWFuIHtcbiAgaWYgKGRhdGFzZXQgPT0gbnVsbCB8fCB2YWx1ZSA9PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiBkYXRhc2V0LmluZGV4T2YodmFsdWUpID49IDA7XG59XG5cbi8qKlxuICogQXBwbGllcyB0aGUgb3BlcmF0b3IgdG8gZXZlcnkgcGFpciBvZiBlbGVtZW50cyAoYXJyYXlBW2ldLCBhcnJheUJbaV0pLFxuICogcmV0dXJuaW5nIHRoZSBhcnJheSBvZiByZXN1bHRzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gT1AoYXJyYXlBOiBhbnlbXSwgYXJyYXlCOiBhbnlbXSwgb3BlcmF0b3I6ICgoYTogYW55LCBiOiBhbnkpID0+IGFueSl8c3RyaW5nKTogYW55W10ge1xuICBpZiAodHlwZW9mKG9wZXJhdG9yKSA9PT0gJ3N0cmluZycpIHtcbiAgICBjb25zdCBmdW5jID0gY3JlYXRlRnVuY3Rpb24ob3BlcmF0b3IpO1xuICAgIG9wZXJhdG9yID0gKGVsZW1BLCBlbGVtQikgPT4gZnVuYyh7ZWxlbUEsIGVsZW1CfSk7XG4gIH1cbiAgY29uc3QgcmVzOiBhbnlbXSA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IE1hdGgubWluKGFycmF5QS5sZW5ndGgsIGFycmF5Qi5sZW5ndGgpOyBpKyspIHtcbiAgICBjb25zdCB2YWwgPSBvcGVyYXRvcihhcnJheUFbaV0sIGFycmF5QltpXSk7XG4gICAgcmVzLnB1c2godmFsKTtcbiAgfVxuICByZXR1cm4gcmVzO1xufVxuXG4vKipcbiAqIEdpdmVuIGFuIGFycmF5IG9mIHZhbHVlcywgcmV0dXJucyB0aGUgY29ycmVzcG9uZGluZyBhcnJheSBvZiBsYWJlbHMsXG4gKiBhcyBzcGVjaWZpZWQgYnkgdGhlIGNob2ljZXMgb3JpZ2luIGluIHNjaGVtYS5cbiAqXG4gKiBAZXhwb3J0XG4gKiBAcGFyYW0geyp9IHNjaGVtYVxuICogQHBhcmFtIHtzdHJpbmdbXX0gdmFsdWVzXG4gKiBAcmV0dXJuIHsqfSAge3N0cmluZ1tdfVxuICovXG5leHBvcnQgZnVuY3Rpb24gR0VUX0xBQkVMUyhzY2hlbWE6IGFueSwgdmFsdWVzOiBzdHJpbmdbXSk6IHN0cmluZ1tdIHtcbiAgY29uc3QgY2hvaWNlTGFiZWxzID0gZXh0cmFjdExhYmVsc0J5U2NoZW1hQ2hvaWNlcyhzY2hlbWEpO1xuICByZXR1cm4gdmFsdWVzLm1hcCh2YWwgPT4gY2hvaWNlTGFiZWxzW3ZhbF0gIT0gbnVsbCA/IGNob2ljZUxhYmVsc1t2YWxdIDogdmFsKTtcbn1cbiJdfQ==