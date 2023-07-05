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
    PERCENTAGE_CHANGE: { fn: PERCENTAGE_CHANGE },
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
    'this',
    'true',
    'false',
    'null',
    'undefined',
    'Infinity',
    'NaN',
    'isNaN',
    'isFinite',
    'Object',
    'String',
    'Array',
    'Set',
    'Map',
    'Number',
    'Date',
    'Math',
    'parseInt',
    'parseFloat',
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
    if (/^[a-zA-Z_$][\w$]*$/.test(expression)) {
        // expression is an identifier
        return c => (c == null || c[expression] === undefined ? null : c[expression]);
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
    if (typeof filter === 'string') {
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
    if (typeof filter === 'string') {
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
    if (typeof filter === 'string') {
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
    if (typeof filter === 'string') {
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
 * Calculates the percentage change between a value and his base reference value.
 */
export function PERCENTAGE_CHANGE(value, reference_value) {
    let curr = Number(value);
    let ref = Number(reference_value);
    if (typeof value === 'string' && isNaN(curr)) {
        curr = Number(value.slice(0, -1));
    }
    if (typeof reference_value === 'string' && isNaN(ref)) {
        ref = Number(reference_value.slice(0, -1));
    }
    if (!isNaN(curr) && !isNaN(ref) && ref > 0) {
        const res = ((curr - ref) / ref) * 100;
        return Number.isFinite(res) ? Math.round(res) : 0;
    }
    return '-';
}
/**
 * Evaluates the expression in the first form by date.
 */
export function FIRST(forms, expression, date = 'created_at') {
    if (typeof expression === 'string') {
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
    if (typeof expression === 'string') {
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
    if (typeof expression === 'string') {
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
    if (!Array.isArray(arr) && typeof arr !== 'string') {
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
    if (typeof expression === 'string') {
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
    if (when.slice(5) < dob.slice(5)) {
        // birthday not reached yet in current year
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
    if (typeof expression === 'string') {
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
    if (typeof operator === 'string') {
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
    return values.map(val => (choiceLabels[val] != null ? choiceLabels[val] : val));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwcmVzc2lvbi11dGlscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvbW9kZWxzL3NyYy91dGlscy9leHByZXNzaW9uLXV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUdILE9BQU8sS0FBSyxPQUFPLE1BQU0sVUFBVSxDQUFDO0FBQ3BDLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxTQUFTLENBQUM7QUFDcEMsT0FBTyxLQUFLLFNBQVMsTUFBTSxRQUFRLENBQUM7QUFJcEMsSUFBSSxXQUFXLEdBQVEsRUFBRSxDQUFDO0FBRTFCLE1BQU0sTUFBTSxHQUFHLFNBQVMsQ0FBQyxPQUFPLElBQUksU0FBUyxDQUFDO0FBWTlDLFNBQVMsT0FBTyxDQUFDLElBQWM7SUFDN0IsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksRUFBRTtRQUNyQixPQUFPLEVBQUUsQ0FBQztLQUNYO0lBQ0QsTUFBTSxJQUFJLEdBQVcsRUFBRSxDQUFDO0lBQ3hCLEtBQUssTUFBTSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtRQUMzQixNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztLQUNqQjtJQUNELE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQztBQUVELE1BQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQztBQUVwQixNQUFNLENBQUMsTUFBTSxrQkFBa0IsR0FBRyxDQUNoQyxNQUFjLEVBQ2QscUJBQThCLEtBQUssRUFDekIsRUFBRTtJQUNaLE1BQU0sV0FBVyxHQUFHLEVBQWMsQ0FBQztJQUNuQyxJQUFJO1FBQ0YsV0FBVyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsRUFBRTtZQUM3QixPQUFPLEVBQUUsQ0FBQyxLQUFL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Q0FBQztBQUNiLENBQUM7QUFFRDs7Ozs7Ozs7R0FRRztBQUNILE1BQU0sVUFBVSxVQUFVLENBQUMsTUFBVyxFQUFFLE1BQWdCO0lBQ3RELE1BQU0sWUFBWSxHQUFHLDRCQUE0QixDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzFELE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ2xGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmQ29udGV4dH0gZnJvbSAnQGFqZi9jb3JlL2NvbW1vbic7XG5pbXBvcnQgKiBhcyBkYXRlRm5zIGZyb20gJ2RhdGUtZm5zJztcbmltcG9ydCB7cGFyc2VTY3JpcHR9IGZyb20gJ21lcml5YWgnO1xuaW1wb3J0ICogYXMgbnVtYnJvTW9kIGZyb20gJ251bWJybyc7XG5pbXBvcnQge0FqZlRhYmxlQ2VsbH0gZnJvbSAnQGFqZi9jb3JlL3RhYmxlJztcbmltcG9ydCB7QWpmVmFsaWRhdGlvbkZufSBmcm9tICcuLi9pbnRlcmZhY2UvdmFsaWRhdGlvbi1mdW5jdGlvbic7XG5cbmxldCBleGVjQ29udGV4dDogYW55ID0ge307XG5cbmNvbnN0IG51bWJybyA9IG51bWJyb01vZC5kZWZhdWx0IHx8IG51bWJyb01vZDtcbmV4cG9ydCBpbnRlcmZhY2UgRm9ybSB7XG4gIFtrZXk6IHN0cmluZ106IHN0cmluZyB8IG51bWJlciB8IG51bGw7XG59XG5leHBvcnQgaW50ZXJmYWNlIEluc3RhbmNlcyB7XG4gIFtpbnN0YW5jZTogc3RyaW5nXTogRm9ybVtdO1xufVxuZXhwb3J0IGludGVyZmFjZSBNYWluRm9ybSB7XG4gIFtrZXk6IHN0cmluZ106IHN0cmluZyB8IG51bWJlciB8IGJvb2xlYW4gfCBudWxsIHwgSW5zdGFuY2VzIHwgdW5kZWZpbmVkIHwgbnVsbDtcbiAgcmVwcz86IEluc3RhbmNlcztcbn1cblxuZnVuY3Rpb24gYWxsUmVwcyhmb3JtOiBNYWluRm9ybSk6IEZvcm1bXSB7XG4gIGlmIChmb3JtLnJlcHMgPT0gbnVsbCkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuICBjb25zdCByZXBzOiBGb3JtW10gPSBbXTtcbiAgZm9yIChjb25zdCBrZXkgaW4gZm9ybS5yZXBzKSB7XG4gICAgY29uc3QgciA9IGZvcm0ucmVwc1trZXldO1xuICAgIHJlcHMucHVzaCguLi5yKTtcbiAgfVxuICByZXR1cm4gcmVwcztcbn1cblxuY29uc3QgTUFYX1JFUFMgPSAzMDtcblxuZXhwb3J0IGNvbnN0IGdldENvZGVJZGVudGlmaWVycyA9IChcbiAgc291cmNlOiBzdHJpbmcsXG4gIGluY2x1ZGVEb2xsYXJWYWx1ZTogYm9vbGVhbiA9IGZhbHNlLFxuKTogc3RyaW5nW10gPT4ge1xuICBjb25zdCBpZGVudGlmaWVycyA9IFtdIGFzIHN0cmluZ1tdO1xuICB0cnkge1xuICAgIHBhcnNlU2NyaXB0KHNvdXJjZS50b1N0cmluZygpLCB7XG4gICAgICBvblRva2VuOiAodG9rZW4sIHN0YXJ0LCBlbmQpID0+IHtcbiAgICAgICAgaWYgKHRva2VuID09ICdJZGVudGlmaWVyJykge1xuICAgICAgICAgIGNvbnN0IGlkZW50aWZpZXIgPSBzb3VyY2UudG9TdHJpbmcoKS5zdWJzdHJpbmcoc3RhcnQsIGVuZCk7XG4gICAgICAgICAgaWYgKGluY2x1ZGVEb2xsYXJWYWx1ZSB8fCBpZGVudGlmaWVyICE9PSAnJHZhbHVlJykge1xuICAgICAgICAgICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgfSk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBjb25zb2xlLmxvZyhzb3VyY2UpO1xuICAgIGNvbnNvbGUubG9nKGUpO1xuICB9XG4gIHJldHVybiBpZGVudGlmaWVycy5zb3J0KChpMSwgaTIpID0+IGkyLmxvY2FsZUNvbXBhcmUoaTEpKTtcbn07XG5cbmV4cG9ydCBjb25zdCBkYXRlVXRpbHMgPSB7XG4gIGFkZERheXM6IGRhdGVGbnMuYWRkRGF5cyxcbiAgYWRkTW9udGhzOiBkYXRlRm5zLmFkZE1vbnRocyxcbiAgYWRkWWVhcnM6IGRhdGVGbnMuYWRkWWVhcnMsXG4gIGVuZE9mSVNPV2VlazogZGF0ZUZucy5lbmRPZklTT1dlZWssXG4gIGZvcm1hdDogZGF0ZUZucy5mb3JtYXQsXG4gIGdldERheTogZGF0ZUZucy5nZXREYXksXG4gIHBhcnNlOiBkYXRlRm5zLnBhcnNlSVNPLFxuICBzdGFydE9mTW9udGg6IGRhdGVGbnMuc3RhcnRPZk1vbnRoLFxuICBzdGFydE9mSVNPV2VlazogZGF0ZUZucy5zdGFydE9mSVNPV2VlayxcbiAgaXNCZWZvcmU6IGRhdGVGbnMuaXNCZWZvcmUsXG59O1xuXG5leHBvcnQgY2xhc3MgQWpmRXhwcmVzc2lvblV0aWxzIHtcbiAgLy8gVE9ETyB3aGF0IGlzIGl0IGZvclxuICBzdGF0aWMgVVRJTF9GVU5DVElPTlMgPSAnJztcbiAgLyoqXG4gICAqIEl0IGlzIGEga2V5LXZhbHVlIGRpY3Rpb25hcnksIHRoYXQgbWFwcGluZyBhbGwgQWpmIHZhbGlkYXRpb24gZnVuY3Rpb25zLlxuICAgKi9cbiAgc3RhdGljIHV0aWxzOiB7W25hbWU6IHN0cmluZ106IEFqZlZhbGlkYXRpb25Gbn0gPSB7XG4gICAgYWxlcnQ6IHtmbjogYWxlcnR9LFxuICAgIGJ1aWxkQWxpZ25lZERhdGFzZXQ6IHtmbjogYnVpbGRBbGlnbmVkRGF0YXNldH0sXG4gICAgYnVpbGRBbGlnbmVkRm9ybURhdGFzZXQ6IHtmbjogYnVpbGRBbGlnbmVkRm9ybURhdGFzZXR9LFxuICAgIGJ1aWxkRGF0YXNldDoge2ZuOiBidWlsZERhdGFzZXR9LFxuICAgIGJ1aWxkRm9ybURhdGFzZXQ6IHtmbjogYnVpbGRGb3JtRGF0YXNldH0sXG4gICAgYnVpbGRXaWRnZXREYXRhc2V0OiB7Zm46IGJ1aWxkV2lkZ2V0RGF0YXNldH0sXG4gICAgYnVpbGRXaWRnZXREYXRhc2V0V2l0aERpYWxvZzoge2ZuOiBidWlsZFdpZGdldERhdGFzZXRXaXRoRGlhbG9nfSxcbiAgICBjYWxjdWxhdGVBdmdQcm9wZXJ0eToge2ZuOiBjYWxjdWxhdGVBdmdQcm9wZXJ0eX0sXG4gICAgY2FsY3VsYXRlQXZnUHJvcGVydHlBcnJheToge2ZuOiBjYWxjdWxhdGVBdmdQcm9wZXJ0eUFycmF5fSxcbiAgICBjYWxjdWxhdGVUcmVuZEJ5UHJvcGVydGllczoge2ZuOiBjYWxjdWxhdGVUcmVuZEJ5UHJvcGVydGllc30sXG4gICAgY2FsY3VsYXRlVHJlbmRQcm9wZXJ0eToge2ZuOiBjYWxjdWxhdGVUcmVuZFByb3BlcnR5fSxcbiAgICBkYXRlT3BlcmF0aW9uczoge2ZuOiBkYXRlT3BlcmF0aW9uc30sXG4gICAgZGVjaW1hbENvdW50OiB7Zm46IGRlY2ltYWxDb3VudH0sXG4gICAgZGlnaXRDb3VudDoge2ZuOiBkaWdpdENvdW50fSxcbiAgICBkcmF3VGhyZXNob2xkOiB7Zm46IGRyYXdUaHJlc2hvbGR9LFxuICAgIGV4dHJhY3RBcnJheToge2ZuOiBleHRyYWN0QXJyYXl9LFxuICAgIGV4dHJhY3RBcnJheVN1bToge2ZuOiBleHRyYWN0QXJyYXlTdW19LFxuICAgIGV4dHJhY3REYXRlczoge2ZuOiBleHRyYWN0RGF0ZXN9LFxuICAgIGV4dHJhY3RTdW06IHtmbjogZXh0cmFjdFN1bX0sXG4gICAgZm9ybWF0RGF0ZToge2ZuOiBmb3JtYXREYXRlfSxcbiAgICBmb3JtYXROdW1iZXI6IHtmbjogZm9ybWF0TnVtYmVyfSxcbiAgICBnZXRDb29yZGluYXRlOiB7Zm46IGdldENvb3JkaW5hdGV9LFxuICAgIGlzSW50OiB7Zm46IGlzSW50fSxcbiAgICBpc29Nb250aDoge2ZuOiBpc29Nb250aH0sXG4gICAgbGFzdFByb3BlcnR5OiB7Zm46IGxhc3RQcm9wZXJ0eX0sXG4gICAgbm90RW1wdHk6IHtmbjogbm90RW1wdHl9LFxuICAgIHBhcnNlRGF0ZToge2ZuOiBkYXRlVXRpbHMucGFyc2V9LFxuICAgIHBsYWluQXJyYXk6IHtmbjogcGxhaW5BcnJheX0sXG4gICAgcm91bmQ6IHtmbjogcm91bmR9LFxuICAgIHNjYW5Hcm91cEZpZWxkOiB7Zm46IHNjYW5Hcm91cEZpZWxkfSxcbiAgICBzdW06IHtmbjogc3VtfSxcbiAgICBzdW1MYXN0UHJvcGVydGllczoge2ZuOiBzdW1MYXN0UHJvcGVydGllc30sXG4gICAgdmFsdWVJbkNob2ljZToge2ZuOiB2YWx1ZUluQ2hvaWNlfSxcbiAgICBBRERfREFZUzoge2ZuOiBBRERfREFZU30sXG4gICAgQUxMX1ZBTFVFU19PRjoge2ZuOiBBTExfVkFMVUVTX09GfSxcbiAgICBBUFBMWV9MQUJFTFM6IHtmbjogQVBQTFlfTEFCRUxTfSxcbiAgICBBUFBMWToge2ZuOiBBUFBMWX0sXG4gICAgQlVJTERfREFUQVNFVDoge2ZuOiBCVUlMRF9EQVRBU0VUfSxcbiAgICBDT01QQVJFX0RBVEU6IHtmbjogQ09NUEFSRV9EQVRFfSxcbiAgICBDT05DQVQ6IHtmbjogQ09OQ0FUfSxcbiAgICBDT05TT0xFX0xPRzoge2ZuOiBDT05TT0xFX0xPR30sXG4gICAgQ09VTlRfRk9STVNfVU5JUVVFOiB7Zm46IENPVU5UX0ZPUk1TX1VOSVFVRX0sXG4gICAgQ09VTlRfRk9STVM6IHtmbjogQ09VTlRfRk9STVN9LFxuICAgIENPVU5UX1JFUFM6IHtmbjogQ09VTlRfUkVQU30sXG4gICAgREFZU19ESUZGOiB7Zm46IERBWVNfRElGRn0sXG4gICAgRVZBTFVBVEU6IHtmbjogRVZBTFVBVEV9LFxuICAgIEZJTFRFUl9CWV9WQVJTOiB7Zm46IEZJTFRFUl9CWV9WQVJTfSxcbiAgICBGSUxURVJfQlk6IHtmbjogRklMVEVSX0JZfSxcbiAgICBGSVJTVDoge2ZuOiBGSVJTVH0sXG4gICAgRlJPTV9SRVBTOiB7Zm46IEZST01fUkVQU30sXG4gICAgR0VUX0FHRToge2ZuOiBHRVRfQUdFfSxcbiAgICBHRVRfTEFCRUxTOiB7Zm46IEdFVF9MQUJFTFN9LFxuICAgIElOQ0xVREVTOiB7Zm46IElOQ0xVREVTfSxcbiAgICBJU19BRlRFUjoge2ZuOiBJU19BRlRFUn0sXG4gICAgSVNfQkVGT1JFOiB7Zm46IElTX0JFRk9SRX0sXG4gICAgSVNfV0lUSElOX0lOVEVSVkFMOiB7Zm46IElTX1dJVEhJTl9JTlRFUlZBTH0sXG4gICAgSVNJTjoge2ZuOiBJU0lOfSxcbiAgICBKT0lOX0ZPUk1TOiB7Zm46IEpPSU5fRk9STVN9LFxuICAgIEpPSU5fUkVQRUFUSU5HX1NMSURFUzoge2ZuOiBKT0lOX1JFUEVBVElOR19TTElERVN9LFxuICAgIExBU1Q6IHtmbjogTEFTVH0sXG4gICAgTEVOOiB7Zm46IExFTn0sXG4gICAgTUFQOiB7Zm46IE1BUH0sXG4gICAgTUFYOiB7Zm46IE1BWH0sXG4gICAgTUVBTjoge2ZuOiBNRUFOfSxcbiAgICBNRURJQU46IHtmbjogTUVESUFOfSxcbiAgICBNT0RFOiB7Zm46IE1PREV9LFxuICAgIE9QOiB7Zm46IE9QfSxcbiAgICBQRVJDRU5UOiB7Zm46IFBFUkNFTlR9LFxuICAgIFBFUkNFTlRBR0VfQ0hBTkdFOiB7Zm46IFBFUkNFTlRBR0VfQ0hBTkdFfSxcbiAgICBSRU1PVkVfRFVQTElDQVRFUzoge2ZuOiBSRU1PVkVfRFVQTElDQVRFU30sXG4gICAgUkVQRUFUOiB7Zm46IFJFUEVBVH0sXG4gICAgUk9VTkQ6IHtmbjogUk9VTkR9LFxuICAgIFNVTToge2ZuOiBTVU19LFxuICAgIFRPREFZOiB7Zm46IFRPREFZfSxcbiAgfTtcbn1cblxuLyoqXG4gKiBVVElMSVRZIEZVTkNJT05cbiAqIFRoaXMgZnVuY3Rpb24gcHJvdmlkZSBhIGRlZXAgY29weSBidWlsZGVyIG9mIGFycmF5IG9mIG1haW4gZm9ybXMuXG4gKiBUaGF0J3MgYSBjdXN0b20gZnVuY3Rpb24gcmVsYXRlZCB0byBtYWluZm9ybXMgdGhhdCBjYW4gYmUgYWJsZSB0byBpbmNyZWFzZSBjb3B5IHBlcmZvcm1hbmNlLlxuICpcbiAqIEBwYXJhbSB7TWFpbkZvcm1bXX0gZm9ybXNcbiAqIEByZXR1cm4geyp9ICB7TWFpbkZvcm1bXX1cbiAqL1xuZnVuY3Rpb24gY2xvbmVNYWluRm9ybXMoZm9ybXM6IE1haW5Gb3JtW10pOiBNYWluRm9ybVtdIHtcbiAgbGV0IHJlczogTWFpbkZvcm1bXSA9IFtdO1xuICBmb3IgKGNvbnN0IGZvcm0gb2YgZm9ybXMpIHtcbiAgICBpZiAoZm9ybSA9PSBudWxsKSB7XG4gICAgICByZXMucHVzaChmb3JtKTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBsZXQgcmVwczogSW5zdGFuY2VzID0ge307XG4gICAgaWYgKGZvcm0ucmVwcyAhPSBudWxsKSB7XG4gICAgICBmb3IgKGNvbnN0IGtleSBpbiBmb3JtLnJlcHMpIHtcbiAgICAgICAgcmVwc1trZXldID0gWy4uLmZvcm0ucmVwc1trZXldXTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmVzLnB1c2goey4uLmZvcm0sIHJlcHN9KTtcbiAgfVxuICByZXR1cm4gcmVzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZXZhbHVhdGVFeHByZXNzaW9uKGV4cHJlc3Npb246IHN0cmluZywgY29udGV4dD86IEFqZkNvbnRleHQpOiBhbnkge1xuICByZXR1cm4gY3JlYXRlRnVuY3Rpb24oZXhwcmVzc2lvbikoY29udGV4dCk7XG59XG5cbmNvbnN0IGdsb2JhbHMgPSBbXG4gICd0aGlzJyxcbiAgJ3RydWUnLFxuICAnZmFsc2UnLFxuICAnbnVsbCcsXG4gICd1bmRlZmluZWQnLFxuICAnSW5maW5pdHknLFxuICAnTmFOJyxcbiAgJ2lzTmFOJyxcbiAgJ2lzRmluaXRlJyxcbiAgJ09iamVjdCcsXG4gICdTdHJpbmcnLFxuICAnQXJyYXknLFxuICAnU2V0JyxcbiAgJ01hcCcsXG4gICdOdW1iZXInLFxuICAnRGF0ZScsXG4gICdNYXRoJyxcbiAgJ3BhcnNlSW50JyxcbiAgJ3BhcnNlRmxvYXQnLFxuXTtcblxudHlwZSBGdW5jID0gKGM/OiBBamZDb250ZXh0KSA9PiBhbnk7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVGdW5jdGlvbihleHByZXNzaW9uOiBzdHJpbmcpOiBGdW5jIHtcbiAgaWYgKGV4cHJlc3Npb24gPT0gbnVsbCkge1xuICAgIHJldHVybiBfID0+IG51bGw7XG4gIH1cbiAgZXhwcmVzc2lvbiA9IFN0cmluZyhleHByZXNzaW9uKTtcbiAgaWYgKGV4cHJlc3Npb24gPT09ICd0cnVlJykge1xuICAgIHJldHVybiBfID0+IHRydWU7XG4gIH1cbiAgaWYgKGV4cHJlc3Npb24gPT09ICdmYWxzZScpIHtcbiAgICByZXR1cm4gXyA9PiBmYWxzZTtcbiAgfVxuICBpZiAoL15bYS16QS1aXyRdW1xcdyRdKiQvLnRlc3QoZXhwcmVzc2lvbikpIHtcbiAgICAvLyBleHByZXNzaW9uIGlzIGFuIGlkZW50aWZpZXJcbiAgICByZXR1cm4gYyA9PiAoYyA9PSBudWxsIHx8IGNbZXhwcmVzc2lvbl0gPT09IHVuZGVmaW5lZCA/IG51bGwgOiBjW2V4cHJlc3Npb25dKTtcbiAgfVxuICBpZiAoL15cIlteXCJdKlwiJC8udGVzdChleHByZXNzaW9uKSB8fCAvXidbXiddKickLy50ZXN0KGV4cHJlc3Npb24pKSB7XG4gICAgbGV0IHN0ciA9IGV4cHJlc3Npb24uc2xpY2UoMSwgLTEpO1xuICAgIHJldHVybiBfID0+IHN0cjtcbiAgfVxuXG4gIGNvbnN0IGlkZW50aWZpZXJzID0gbmV3IFNldChnZXRDb2RlSWRlbnRpZmllcnMoZXhwcmVzc2lvbiwgdHJ1ZSkpLmFkZCgnZXhlY0NvbnRleHQnKTtcbiAgZm9yIChjb25zdCBpZGUgb2YgZ2xvYmFscykge1xuICAgIGlkZW50aWZpZXJzLmRlbGV0ZShpZGUpO1xuICB9XG4gIGNvbnN0IGFyZ05hbWVzID0gWy4uLmlkZW50aWZpZXJzXTtcbiAgbGV0IGZ1bmM6IEZ1bmN0aW9uO1xuICB0cnkge1xuICAgIGZ1bmMgPSBuZXcgRnVuY3Rpb24oLi4uYXJnTmFtZXMsICdyZXR1cm4gJyArIGV4cHJlc3Npb24pO1xuICB9IGNhdGNoIHtcbiAgICByZXR1cm4gXyA9PiBmYWxzZTtcbiAgfVxuICByZXR1cm4gY29udGV4dCA9PiB7XG4gICAgY29uc3QgYXJnVmFsdWVzID0gYXJnTmFtZXMubWFwKG5hbWUgPT4ge1xuICAgICAgaWYgKGNvbnRleHQgIT0gbnVsbCAmJiBjb250ZXh0W25hbWVdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIGNvbnRleHRbbmFtZV07XG4gICAgICB9XG4gICAgICBpZiAoQWpmRXhwcmVzc2lvblV0aWxzLnV0aWxzW25hbWVdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIEFqZkV4cHJlc3Npb25VdGlscy51dGlsc1tuYW1lXS5mbjtcbiAgICAgIH1cbiAgICAgIGlmIChuYW1lID09PSAnZXhlY0NvbnRleHQnKSB7XG4gICAgICAgIHJldHVybiBleGVjQ29udGV4dDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH0pO1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gZnVuYyguLi5hcmdWYWx1ZXMpO1xuICAgIH0gY2F0Y2gge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfTtcbn1cblxuLyoqXG4gKiBJdCByZXR1cm5zIHRoZSBjb3VudCBvZiBkaWdpdCBpbnNpZGUgeC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRpZ2l0Q291bnQoeDogbnVtYmVyKTogbnVtYmVyIHtcbiAgaWYgKGlzTmFOKHgpIHx8IHR5cGVvZiB4ICE9PSAnbnVtYmVyJykge1xuICAgIHJldHVybiAwO1xuICB9XG4gIGlmICghaXNGaW5pdGUoeCkpIHtcbiAgICByZXR1cm4gSW5maW5pdHk7XG4gIH1cbiAgcmV0dXJuIHgudG9TdHJpbmcoKS5yZXBsYWNlKC9bXjAtOV0vZywgJycpLmxlbmd0aDtcbn1cbi8qKlxuICogSXQgaXMgY291bnQgdGhlIGNvdW50IG9mIGRlY2ltYWwgZGlnaXQgaW5zaWRlIHMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZWNpbWFsQ291bnQoeDogc3RyaW5nIHwgbnVtYmVyKTogbnVtYmVyIHtcbiAgaWYgKHR5cGVvZiB4ID09PSAnc3RyaW5nJykge1xuICAgIHggPSBwYXJzZUZsb2F0KHgpO1xuICB9XG4gIGlmICh0eXBlb2YgeCAhPT0gJ251bWJlcicgfHwgaXNOYU4oeCkpIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuICBjb25zdCBwYXJ0cyA9IHgudG9TdHJpbmcoKS5zcGxpdCgnLicpO1xuICByZXR1cm4gcGFydHMubGVuZ3RoID4gMSA/IHBhcnRzWzFdLmxlbmd0aCA6IDA7XG59XG4vKipcbiAqIEl0IGlzIHRydWUgaWYgeCBpcyBhbiBpbnRlZ2VyLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNJbnQoeDogc3RyaW5nIHwgbnVtYmVyKTogYm9vbGVhbiB7XG4gIGlmICh0eXBlb2YgeCA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gL14tP1xcZCskLy50ZXN0KHgpO1xuICB9XG4gIGlmICh0eXBlb2YgeCA9PT0gJ251bWJlcicpIHtcbiAgICByZXR1cm4gTWF0aC5yb3VuZCh4KSA9PT0geDtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG4vKipcbiAqIEl0IGlzIHRydWUgaWYgeCBpcyBub3QgZW1wdHkuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBub3RFbXB0eSh4OiBhbnkpOiBib29sZWFuIHtcbiAgcmV0dXJuIHR5cGVvZiB4ICE9PSAndW5kZWZpbmVkJyAmJiB4ICE9PSBudWxsID8geC50b1N0cmluZygpLmxlbmd0aCA+IDAgOiBmYWxzZTtcbn1cbi8qKlxuICogSXQgaXMgdHJ1ZSBpZiBhcnJheSBjb250YWlucyB4IG9yIGFycmF5IGlzIGVxdWFsIHRvIHguXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB2YWx1ZUluQ2hvaWNlKGFycmF5OiBhbnlbXSwgeDogYW55KTogYm9vbGVhbiB7XG4gIHJldHVybiAoYXJyYXkgfHwgW10pLmluZGV4T2YoeCkgPiAtMSB8fCBhcnJheSA9PT0geDtcbn1cbi8qKlxuICogSXQgYXBwbGllcyBjYWxsYmFjayBmb3IgcmVwcyB0aW1lcyBhbmQgYWNjdW11bGF0ZSB0aGUgcmVzdWx0IGluIGFjYy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNjYW5Hcm91cEZpZWxkKHJlcHM6IG51bWJlciwgYWNjOiBhbnksIGNhbGxiYWNrOiBhbnkpOiBhbnkge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHJlcHM7IGkrKykge1xuICAgIGFjYyA9IGNhbGxiYWNrKGFjYywgaSk7XG4gIH1cbiAgcmV0dXJuIGFjYztcbn1cbi8qKlxuICogSXQgcmV0dXJucyB0aGUgc3VtIG9mIHRoZSBhcnJheSB2YWx1ZXMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdW0oYXJyYXk6IGFueVtdKTogYW55IHtcbiAgcmV0dXJuIGFycmF5LnJlZHVjZSgoYSwgYikgPT4gYSArIGIsIDApO1xufVxuLyoqXG4gKiBJdCBhcHBsaWVzIGFkZC9yZW1vdmUob3BlcmF0aW9uKSB2IChkYXkvbW9udGgveWVhcilwZXJpb2QgdG8gZHN0cmluZyBhbmQgcmV0dXJuIG5ldyBmb3JtYXQgZGF0ZS5cbiAqL1xuLy8gVE9ETyBjaGVjayBpZiBkZXByZWNhdGVkIGluc3RlYWQgcmVmYWNvdG9yaW5nIHBhcmFtZXRlciB0eXBlXG4vLyBUT0RPIChkU3RyaW5nOiBzdHJpbmd8bnVsbCwgcGVyaW9kOidkYXknfCdtb250aCd8J3llYXInLFxuLy8gVE9ETyBvcGVyYXRpb246ICdhZGQvcmVtb3ZlJyA9ICdhZGQnLCB2Om51bWJlcilcbmV4cG9ydCBmdW5jdGlvbiBkYXRlT3BlcmF0aW9ucyhkU3RyaW5nOiBzdHJpbmcsIHBlcmlvZDogc3RyaW5nLCBvcGVyYXRpb246IHN0cmluZywgdjogYW55KTogc3RyaW5nIHtcbiAgY29uc3QgZm10ID0gJ21tL2RkL3l5eXknO1xuICBsZXQgZCA9IHR5cGVvZiBkU3RyaW5nICE9PSAndW5kZWZpbmVkJyA/IGRhdGVVdGlscy5wYXJzZShkU3RyaW5nKSA6IG5ldyBEYXRlKCk7XG4gIGlmIChvcGVyYXRpb24gPT0gJ3JlbW92ZScpIHtcbiAgICB2ID0gLXY7XG4gIH1cbiAgbGV0IGRhdGVPcDtcbiAgc3dpdGNoIChwZXJpb2QpIHtcbiAgICBjYXNlICdkYXknOlxuICAgICAgZGF0ZU9wID0gZGF0ZVV0aWxzLmFkZERheXM7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdtb250aCc6XG4gICAgICBkYXRlT3AgPSBkYXRlVXRpbHMuYWRkTW9udGhzO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAneWVhcic6XG4gICAgICBkYXRlT3AgPSBkYXRlVXRpbHMuYWRkWWVhcnM7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuICcnO1xuICB9XG4gIHJldHVybiBkYXRlVXRpbHMuZm9ybWF0KGRhdGVPcChkLCB2KSwgZm10KTtcbn1cblxuLyoqXG4gKiBGaXhlZCBkZWNpbWFscyBmb3IgZmxvYXRpbmcgbnVtYmVyXG4gKiBSZXNvbHZlIGZsb2F0IHN1bSBwcm9ibGVtcyBsaWtlIHRoaXM6IDAuMSArIDAuMiA9IDAuMzAwMDAwMDAwMDAwMDAwMDRcbiAqIEBwYXJhbSBudW1cbiAqIEByZXR1cm5zXG4gKi9cbmZ1bmN0aW9uIHRydW5jYXRlMTAobnVtOiBudW1iZXIpIHtcbiAgcmV0dXJuIHBhcnNlRmxvYXQobnVtLnRvRml4ZWQoMTApKTtcbn1cblxuLyoqXG4gKiBJdCByb3VuZHMgdGhlIG51bSB3aXRoIHRoZSB2YWx1ZSBvZiBkaWdpdHNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJvdW5kKG51bTogbnVtYmVyIHwgc3RyaW5nLCBkaWdpdHM/OiBudW1iZXIpOiBudW1iZXIge1xuICBkaWdpdHMgPSBkaWdpdHMgfHwgMDtcbiAgbGV0IGY7XG4gIGlmICh0eXBlb2YgbnVtICE9PSAnbnVtYmVyJykge1xuICAgIHRyeSB7XG4gICAgICBmID0gcGFyc2VGbG9hdChudW0pO1xuICAgIH0gY2F0Y2ggKGUpIHt9XG4gIH0gZWxzZSB7XG4gICAgZiA9IG51bTtcbiAgfVxuICBpZiAoZiA9PSBudWxsIHx8IGlzTmFOKGYpKSB7XG4gICAgZiA9IDA7XG4gIH1cbiAgY29uc3QgbSA9IE1hdGgucG93KDEwLCBkaWdpdHMpO1xuICByZXR1cm4gTWF0aC5yb3VuZChmICogbSkgLyBtO1xufVxuLyoqXG4gKiBJdCBleHRyYWN0cyBwcm9wZXJ0eSBmcm9tIHNvdXJjZS5cbiAqIGZvciBldmVyeSBlbGVtZW50IG9mIHNvdXJjZSBpZiBwcm9wZXJ0eSBhbmQgcHJvcGVydHkyIGFyZSBkZWZpbmVkIHJldHVybiB0aGUgc3VtXG4gKiBlbHNlIGlmIG9ubHkgcHJvcGVydHkgaXMgZGVmaW5lZCByZXR1cm4gaGltLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZXh0cmFjdEFycmF5KHNvdXJjZTogYW55W10sIHByb3BlcnR5OiBzdHJpbmcsIHByb3BlcnR5Mj86IHN0cmluZyk6IGFueVtdIHtcbiAgc291cmNlID0gKHNvdXJjZSB8fCBbXSkuZmlsdGVyKChmOiBhbnkpID0+IGYgIT0gbnVsbCk7XG4gIGNvbnN0IHJlczogYW55W10gPSBbXTtcbiAgZm9yIChjb25zdCBzIG9mIHNvdXJjZSkge1xuICAgIGlmIChzW3Byb3BlcnR5XSAhPSBudWxsICYmIHByb3BlcnR5MiAhPSBudWxsICYmIHNbcHJvcGVydHkyXSAhPSBudWxsKSB7XG4gICAgICByZXMucHVzaChOdW1iZXIoc1twcm9wZXJ0eV0pICsgTnVtYmVyKHNbcHJvcGVydHkyXSkpO1xuICAgIH0gZWxzZSBpZiAoc1twcm9wZXJ0eV0gIT0gbnVsbCkge1xuICAgICAgcmVzLnB1c2goc1twcm9wZXJ0eV0pO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzO1xufVxuLyoqXG4gKiBJdCByZXR1cm5zIHRoZSBzdW0gb2YgYWxsIGRlZmluZWQgcHJvcGVydGllcyBvZiBlYWNoIGVsZW1lbnQgb2Ygc291cmNlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZXh0cmFjdFN1bShzb3VyY2U6IGFueVtdLCBwcm9wZXJ0aWVzOiBzdHJpbmdbXSk6IG51bWJlciB7XG4gIHByb3BlcnRpZXMgPSBbLi4uKHByb3BlcnRpZXMgfHwgW10pXTtcblxuICBsZXQgc3VtVmFsID0gMDtcbiAgZm9yIChjb25zdCBwcm9wIG9mIHByb3BlcnRpZXMpIHtcbiAgICBjb25zdCBhcnJheSA9IGV4dHJhY3RBcnJheShzb3VyY2UsIHByb3ApO1xuICAgIGZvciAoY29uc3QgYSBvZiBhcnJheSkge1xuICAgICAgaWYgKCFpc05hTihOdW1iZXIoYSkpKSB7XG4gICAgICAgIHN1bVZhbCArPSBOdW1iZXIoYSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBzdW1WYWw7XG59XG4vKipcbiAqIEl0IHJldHVybnMgYSBudW1iZXIgYXJyYXkgdGhhdCBjb250YWlucyB0aGUgc3VtIG9mIHByb3BlcnRpZXMgdmFsdWUgaW5zaWRlIHRoZSBzb3VyY2UuXG4gKiBleHRyYWN0QXJyYXlTdW0oW3thOiA1fSwge2I6IDF9LCB7YTogNSwgYjogMX1dLCBbJ2EnLCAnYiddKTsgPSZndDsgWzYsNl1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGV4dHJhY3RBcnJheVN1bShzb3VyY2U6IGFueVtdLCBwcm9wZXJ0aWVzOiBzdHJpbmdbXSk6IGFueVtdIHtcbiAgY29uc3QgYXJyYXlzOiBhbnlbXSA9IFtdO1xuICBwcm9wZXJ0aWVzID0gWy4uLihwcm9wZXJ0aWVzIHx8IFtdKV07XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9wZXJ0aWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgYXJyYXkgPSBleHRyYWN0QXJyYXkoc291cmNlLCBwcm9wZXJ0aWVzW2ldKTtcbiAgICBhcnJheXMucHVzaChhcnJheSk7XG4gIH1cblxuICBjb25zdCByZXM6IGFueVtdID0gW107XG4gIGlmIChhcnJheXMubGVuZ3RoID4gMCkge1xuICAgIGZvciAobGV0IHdlZWtJID0gMDsgd2Vla0kgPCBhcnJheXNbMF0ubGVuZ3RoOyB3ZWVrSSsrKSB7XG4gICAgICBsZXQgc3VtVmFsID0gMDtcbiAgICAgIGZvciAobGV0IHByb3BJID0gMDsgcHJvcEkgPCBwcm9wZXJ0aWVzLmxlbmd0aDsgcHJvcEkrKykge1xuICAgICAgICBzdW1WYWwgPSBzdW1WYWwgKyBOdW1iZXIoYXJyYXlzW3Byb3BJXVt3ZWVrSV0pO1xuICAgICAgfVxuICAgICAgcmVzLnB1c2goc3VtVmFsKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cbi8qKlxuICogRHJhdyBhIHRocmVzaG9sZCBsaW5lIG9uIGNoYXJ0IHJlbGF0ZWQgdG8gdGhlIHByb3BlcnR5LlxuICovXG5leHBvcnQgZnVuY3Rpb24gZHJhd1RocmVzaG9sZChzb3VyY2U6IGFueVtdLCBwcm9wZXJ0eTogc3RyaW5nLCB0aHJlc2hvbGQ6IGFueVtdKTogYW55W10ge1xuICBzb3VyY2UgPSAoc291cmNlIHx8IFtdKS5maWx0ZXIoKGY6IGFueSkgPT4gZiAhPSBudWxsKTtcbiAgdGhyZXNob2xkID0gdGhyZXNob2xkIHx8IFswXTtcbiAgaWYgKCEodGhyZXNob2xkIGluc3RhbmNlb2YgQXJyYXkpKSB7XG4gICAgdGhyZXNob2xkID0gW3RocmVzaG9sZF07XG4gIH1cbiAgY29uc3QgbCA9IHNvdXJjZS5sZW5ndGg7XG4gIGNvbnN0IHJlczogYW55W10gPSBbXTtcbiAgbGV0IGNvdW50ID0gMDtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsOyBpKyspIHtcbiAgICBpZiAoc291cmNlW2ldW3Byb3BlcnR5XSAhPSBudWxsKSB7XG4gICAgICBpZiAodGhyZXNob2xkLmxlbmd0aCA+IGNvdW50KSB7XG4gICAgICAgIHJlcy5wdXNoKHRocmVzaG9sZFtjb3VudF0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzLnB1c2godGhyZXNob2xkWzBdKTtcbiAgICAgIH1cbiAgICAgIGNvdW50Kys7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXM7XG59XG4vKipcbiAqIEV4dHJhY3QgdGhlIGRhdGVzIG9mIHRoZSBzb3VyY2Ugb2JqZWN0IHdpdGggcHJvcGVydHkgIT0gbnVsbFxuICovXG5leHBvcnQgZnVuY3Rpb24gZXh0cmFjdERhdGVzKHNvdXJjZTogYW55W10sIHByb3BlcnR5OiBzdHJpbmcsIGZtdDogc3RyaW5nKTogc3RyaW5nW10ge1xuICBzb3VyY2UgPSAoc291cmNlIHx8IFtdKS5maWx0ZXIoKGY6IGFueSkgPT4gZiAhPSBudWxsKTtcbiAgY29uc3QgbCA9IHNvdXJjZS5sZW5ndGg7XG4gIGNvbnN0IHJlczogYW55ID0gW107XG4gIGxldCBwcmVmaXggPSAnJztcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsOyBpKyspIHtcbiAgICBpZiAoc291cmNlW2ldW3Byb3BlcnR5XSAhPSBudWxsKSB7XG4gICAgICBzd2l0Y2ggKGZtdCkge1xuICAgICAgICBjYXNlICdXVyc6XG4gICAgICAgIGNhc2UgJ3d3JzpcbiAgICAgICAgICBwcmVmaXggPSAnVyc7XG4gICAgICAgICAgcmVzLnB1c2gocHJlZml4ICsgZm9ybWF0RGF0ZShzb3VyY2VbaV1bJ2RhdGVfc3RhcnQnXSwgZm10KSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ01NJzpcbiAgICAgICAgY2FzZSAnbW0nOlxuICAgICAgICAgIHByZWZpeCA9ICdNJztcbiAgICAgICAgICByZXMucHVzaChwcmVmaXggKyBpc29Nb250aChzb3VyY2VbaV1bJ2RhdGVfc3RhcnQnXSwgZm10KSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgcHJlZml4ID0gJyc7XG4gICAgICAgICAgcmVzLnB1c2gocHJlZml4ICsgZm9ybWF0RGF0ZShzb3VyY2VbaV1bJ2RhdGVfc3RhcnQnXSwgZm10KSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiByZXM7XG59XG4vKipcbiAqIEV4dHJhY3QgdGhlIGxhc3QgcHJvcGVydHkgY29udGFpbnMgaW4gc291cmNlICE9IG51bGxcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGxhc3RQcm9wZXJ0eShzb3VyY2U6IGFueSwgcHJvcGVydHk6IHN0cmluZyk6IGFueSB7XG4gIHNvdXJjZSA9IChzb3VyY2UgfHwgW10pLmZpbHRlcigoZjogYW55KSA9PiBmICE9IG51bGwpO1xuICBsZXQgbCA9IHNvdXJjZS5sZW5ndGggLSAxO1xuXG4gIHdoaWxlIChsID49IDAgJiYgc291cmNlW2xdW3Byb3BlcnR5XSA9PSBudWxsKSB7XG4gICAgbC0tO1xuICAgIGlmIChsIDwgMCkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbCA+PSAwID8gc291cmNlW2xdW3Byb3BlcnR5XSA6ICcnO1xufVxuLyoqXG4gKiBJdCBzdW0gdGhlIExBc3QgcHJvcGVydGllcyBvZiBzb3VyY2UuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdW1MYXN0UHJvcGVydGllcyhzb3VyY2U6IGFueVtdLCBwcm9wZXJ0aWVzOiBzdHJpbmdbXSk6IG51bWJlciB7XG4gIHNvdXJjZSA9IChzb3VyY2UgfHwgW10pLmZpbHRlcigoZjogYW55KSA9PiBmICE9IG51bGwpO1xuICBsZXQgc3VtVmFsID0gMDtcbiAgbGV0IHZhbCA9IDA7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvcGVydGllcy5sZW5ndGg7IGkrKykge1xuICAgIHZhbCA9IE51bWJlcihsYXN0UHJvcGVydHkoc291cmNlLCBwcm9wZXJ0aWVzW2ldKSk7XG4gICAgaWYgKCFpc05hTih2YWwpKSB7XG4gICAgICBzdW1WYWwgKz0gdmFsO1xuICAgIH1cbiAgfVxuICByZXR1cm4gc3VtVmFsO1xufVxuLyoqXG4gKiBDb21wdXRlIHRoZSB0cmVuZCBvZiB0aGUgcHJvcGVydHkgY29udGFpbmVkIG9uIHRoZSBzb3VyY2UuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjYWxjdWxhdGVUcmVuZFByb3BlcnR5KHNvdXJjZTogYW55W10sIHByb3BlcnR5OiBzdHJpbmcpOiBzdHJpbmcge1xuICBzb3VyY2UgPSAoc291cmNlIHx8IFtdKS5maWx0ZXIoKGY6IGFueSkgPT4gZiAhPSBudWxsKTtcbiAgbGV0IGxhc3QgPSBzb3VyY2UubGVuZ3RoIC0gMTtcbiAgd2hpbGUgKHNvdXJjZVtsYXN0XVtwcm9wZXJ0eV0gPT0gbnVsbCkge1xuICAgIGlmIChsYXN0ID09IDApIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBsYXN0LS07XG4gIH1cbiAgbGV0IGxhc3RMYXN0ID0gbGFzdCAtIDE7XG4gIGlmIChsYXN0ID09IDApIHtcbiAgICBsYXN0TGFzdCA9IGxhc3Q7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHNvdXJjZVtsYXN0TGFzdF1bcHJvcGVydHldID09IG51bGwpIHtcbiAgICAgIGlmIChsYXN0TGFzdCA9PSAwKSB7XG4gICAgICAgIGxhc3RMYXN0ID0gbGFzdDtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBsYXN0TGFzdC0tO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGxhc3RQcm9wID0gc291cmNlW2xhc3RdID8gc291cmNlW2xhc3RdW3Byb3BlcnR5XSB8fCAwIDogMDtcbiAgY29uc3QgbGFzdExhc3RQcm9wID0gc291cmNlW2xhc3RMYXN0XSA/IHNvdXJjZVtsYXN0TGFzdF1bcHJvcGVydHldIHx8IDAgOiAwO1xuXG4gIGlmIChsYXN0UHJvcCA9PSBsYXN0TGFzdFByb3ApIHtcbiAgICByZXR1cm4gJzxwPjxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIiBzdHlsZT1cImNvbG9yOmJsdWVcIj50cmVuZGluZ19mbGF0PC9pPjwvcD4nO1xuICB9IGVsc2UgaWYgKGxhc3RQcm9wID4gbGFzdExhc3RQcm9wKSB7XG4gICAgcmV0dXJuICc8cD48aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCIgc3R5bGU9XCJjb2xvcjpncmVlblwiPnRyZW5kaW5nX3VwPC9pPjwvcD4nO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAnPHA+PGkgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiIHN0eWxlPVwiY29sb3I6cmVkXCI+dHJlbmRpbmdfZG93bjwvaT48L3A+JztcbiAgfVxufVxuLyoqXG4gKiBDb21wdXRlIHRoZSBhdmVyYWdlIHZhbHVlIG9mIHRoZSBwcm9wZXJ0eSBjb250YWluZWQgb24gdGhlIHNvdXJjZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNhbGN1bGF0ZVRyZW5kQnlQcm9wZXJ0aWVzKHNvdXJjZTogYW55W10sIHByb3BlcnRpZXM6IHN0cmluZ1tdKTogc3RyaW5nIHtcbiAgY29uc3QgYXJyYXlzdW0gPSBleHRyYWN0QXJyYXlTdW0oc291cmNlLCBwcm9wZXJ0aWVzKTtcblxuICBjb25zdCBsYXN0UHJvcCA9IGFycmF5c3VtLmxlbmd0aCA+IDAgPyBhcnJheXN1bVthcnJheXN1bS5sZW5ndGggLSAxXSB8fCAwIDogMDtcbiAgY29uc3QgbGFzdExhc3RQcm9wID0gYXJyYXlzdW0ubGVuZ3RoID4gMSA/IGFycmF5c3VtW2FycmF5c3VtLmxlbmd0aCAtIDJdIHx8IDAgOiBsYXN0UHJvcDtcblxuICBpZiAobGFzdFByb3AgPT0gbGFzdExhc3RQcm9wKSB7XG4gICAgcmV0dXJuICc8cD48aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCIgc3R5bGU9XCJjb2xvcjpibHVlXCI+dHJlbmRpbmdfZmxhdDwvaT48L3A+JztcbiAgfSBlbHNlIGlmIChsYXN0UHJvcCA+IGxhc3RMYXN0UHJvcCkge1xuICAgIHJldHVybiAnPHA+PGkgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiIHN0eWxlPVwiY29sb3I6Z3JlZW5cIj50cmVuZGluZ191cDwvaT48L3A+JztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gJzxwPjxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIiBzdHlsZT1cImNvbG9yOnJlZFwiPnRyZW5kaW5nX2Rvd248L2k+PC9wPic7XG4gIH1cbn1cbi8qKlxuICpcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNhbGN1bGF0ZUF2Z1Byb3BlcnR5KFxuICBzb3VyY2U6IGFueVtdLFxuICBwcm9wZXJ0eTogc3RyaW5nLFxuICByYW5nZTogbnVtYmVyLFxuICBjb2VmZmljaWVudDogbnVtYmVyLFxuKTogbnVtYmVyIHtcbiAgc291cmNlID0gKHNvdXJjZSB8fCBbXSkuZmlsdGVyKChmOiBhbnkpID0+IGYgIT0gbnVsbCk7XG5cbiAgY29lZmZpY2llbnQgPSBjb2VmZmljaWVudCB8fCAxO1xuICByYW5nZSA9IHJhbmdlIHx8IDEyO1xuXG4gIGxldCBsID0gc291cmNlLmxlbmd0aDtcbiAgbGV0IHJlcyA9IDA7XG4gIGxldCBjb3VudGVyID0gMDtcbiAgbGV0IG5vWmVybyA9IDA7XG5cbiAgaWYgKGwgPCByYW5nZSkge1xuICAgIHJhbmdlID0gbDtcbiAgfVxuXG4gIHdoaWxlIChyYW5nZSAhPSAwKSB7XG4gICAgaWYgKHNvdXJjZVtsIC0gMV1bcHJvcGVydHldICE9IG51bGwpIHtcbiAgICAgIGNvdW50ZXIrKztcbiAgICAgIHJlcyArPSBOdW1iZXIoc291cmNlW2wgLSAxXVtwcm9wZXJ0eV0pO1xuXG4gICAgICBpZiAoc291cmNlW2wgLSAxXVtwcm9wZXJ0eV0gPiAwKSB7XG4gICAgICAgIG5vWmVybysrO1xuICAgICAgfVxuICAgIH1cbiAgICBsLS07XG4gICAgcmFuZ2UtLTtcbiAgfVxuXG4gIGlmIChjb2VmZmljaWVudCA9PSAwKSB7XG4gICAgcmV0dXJuIG5vWmVybztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gcm91bmQoKHJlcyAvIGNvdW50ZXIpICogY29lZmZpY2llbnQsIDIpIHx8IDA7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNhbGN1bGF0ZUF2Z1Byb3BlcnR5QXJyYXkoXG4gIHNvdXJjZTogYW55W10sXG4gIHByb3BlcnRpZXM6IHN0cmluZ1tdLFxuICByYW5nZTogbnVtYmVyLFxuICBjb2VmZmljaWVudDogbnVtYmVyLFxuKTogbnVtYmVyW10ge1xuICBzb3VyY2UgPSAoc291cmNlIHx8IFtdKS5maWx0ZXIoKGY6IGFueSkgPT4gZiAhPSBudWxsKTtcbiAgY29uc3QgcmVzQXJyOiBhbnlbXSA9IFtdO1xuXG4gIGlmIChwcm9wZXJ0aWVzICYmIHByb3BlcnRpZXMubGVuZ3RoID4gMCkge1xuICAgIGxldCBhdmcgPSAwO1xuXG4gICAgY29lZmZpY2llbnQgPSBjb2VmZmljaWVudCB8fCAxO1xuICAgIHJhbmdlID0gcmFuZ2UgfHwgMTI7XG5cbiAgICBjb25zdCBzb3VyY2VBcnIgPVxuICAgICAgcHJvcGVydGllcy5sZW5ndGggPiAxXG4gICAgICAgID8gZXh0cmFjdEFycmF5U3VtKHNvdXJjZSwgcHJvcGVydGllcylcbiAgICAgICAgOiBleHRyYWN0QXJyYXkoc291cmNlLCBwcm9wZXJ0aWVzWzBdKTtcblxuICAgIGxldCBsID0gc291cmNlQXJyLmxlbmd0aDtcblxuICAgIGZvciAobGV0IGxlbiA9IGw7IGxlbiA+IDA7IGxlbi0tKSB7XG4gICAgICBsZXQgcmVzID0gMDtcbiAgICAgIGxldCBjb3VudGVyID0gMDtcbiAgICAgIGxldCBub1plcm8gPSAwO1xuXG4gICAgICBpZiAobGVuIDwgcmFuZ2UpIHtcbiAgICAgICAgcmFuZ2UgPSBsZW47XG4gICAgICB9XG5cbiAgICAgIGZvciAobGV0IHIgPSAxOyByIDw9IHJhbmdlOyByKyspIHtcbiAgICAgICAgbGV0IHZhbCA9IHNvdXJjZUFycltsZW4gLSByXTtcbiAgICAgICAgaWYgKHZhbCAhPSBudWxsKSB7XG4gICAgICAgICAgY291bnRlcisrO1xuICAgICAgICAgIHJlcyArPSBOdW1iZXIodmFsKTtcbiAgICAgICAgICBpZiAodmFsID4gMCkge1xuICAgICAgICAgICAgbm9aZXJvKys7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChjb3VudGVyID4gMCkge1xuICAgICAgICBpZiAoY29lZmZpY2llbnQgPT0gMCkge1xuICAgICAgICAgIGF2ZyA9IG5vWmVybztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhdmcgPSAocmVzIC8gY291bnRlcikgKiBjb2VmZmljaWVudCB8fCAwO1xuICAgICAgICB9XG4gICAgICAgIHJlc0Fyci5wdXNoKHJvdW5kKGF2ZywgMikpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzQXJyLnJldmVyc2UoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFsZXJ0KHNvdXJjZTogYW55W10sIHByb3BlcnR5OiBzdHJpbmcsIHRocmVzaG9sZDogbnVtYmVyKTogc3RyaW5nIHtcbiAgc291cmNlID0gWy4uLihzb3VyY2UgfHwgW10pXTtcblxuICBpZiAobGFzdFByb3BlcnR5KHNvdXJjZSwgcHJvcGVydHkpID4gdGhyZXNob2xkKSB7XG4gICAgcmV0dXJuICc8cD48aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCIgc3R5bGU9XCJjb2xvcjpyZWRcIj53YXJuaW5nPC9pPjwvcD4nO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAnPHA+PC9wPic7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdE51bWJlcihudW06IG51bWJlciwgZm10Pzogc3RyaW5nKTogc3RyaW5nIHtcbiAgZm10ID0gZm10IHx8ICcwLDBbLl0wJztcbiAgcmV0dXJuIG51bWJybyhudW0pLmZvcm1hdChmbXQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0RGF0ZShkYXRlOiBEYXRlIHwgc3RyaW5nLCBmbXQ/OiBzdHJpbmcpOiBzdHJpbmcge1xuICBmbXQgPSBmbXQgfHwgJ21tLURELXl5eXknO1xuICByZXR1cm4gZGF0ZVV0aWxzLmZvcm1hdCh0eXBlb2YgZGF0ZSA9PT0gJ3N0cmluZycgPyBkYXRlVXRpbHMucGFyc2UoZGF0ZSkgOiBkYXRlLCBmbXQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNvTW9udGgoZGF0ZTogRGF0ZSwgZm10Pzogc3RyaW5nKTogc3RyaW5nIHtcbiAgZm10ID0gZm10IHx8ICdtbSc7XG4gIGNvbnN0IGR1ID0gZGF0ZVV0aWxzO1xuICByZXR1cm4gZHUuZm9ybWF0KGR1LmFkZERheXMoZHUuc3RhcnRPZklTT1dlZWsoZGF0ZSksIDMpLCBmbXQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29vcmRpbmF0ZShzb3VyY2U6IGFueSwgem9vbT86IG51bWJlcik6IFtudW1iZXIsIG51bWJlciwgbnVtYmVyXSB7XG4gIHpvb20gPSB6b29tIHx8IDY7XG4gIGlmIChzb3VyY2UgPT0gbnVsbCkge1xuICAgIHJldHVybiBbNTEuNTA1LCAtMC4wOSwgem9vbV07XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIFtzb3VyY2VbMF0sIHNvdXJjZVsxXSwgem9vbV07XG4gIH1cbn1cblxuLyoqXG4gKiBSZXR1cm5zIGFuIGFycmF5IGNvbnRhaW5pbmcgYWxsIHRoZSB2YWx1ZXMgdGhhdCB0aGUgc3BlY2lmaWVkIGZpZWxkIHRha2VzIGluIHRoZSBmb3Jtcy5cbiAqIFRoZSB2YWx1ZXMgYXJlIGNvbnZlcnRlZCB0byBzdHJpbmdzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gQUxMX1ZBTFVFU19PRihcbiAgZm9ybXM6IE1haW5Gb3JtW10sXG4gIGZpZWxkOiBzdHJpbmcsXG4gIGZpbHRlcjogRnVuYyB8IHN0cmluZyA9ICd0cnVlJyxcbik6IHN0cmluZ1tdIHtcbiAgZm9ybXMgPSAoZm9ybXMgfHwgW10pLmZpbHRlcihmID0+IGYgIT0gbnVsbCk7XG4gIGlmICh0eXBlb2YgZmlsdGVyID09PSAnc3RyaW5nJykge1xuICAgIGZpbHRlciA9IGNyZWF0ZUZ1bmN0aW9uKGZpbHRlcik7XG4gIH1cbiAgbGV0IHZhbHVlczogc3RyaW5nW10gPSBbXTtcbiAgZm9yIChjb25zdCBmb3JtIG9mIGZvcm1zKSB7XG4gICAgaWYgKGZvcm1bZmllbGRdICE9IG51bGwgJiYgZmlsdGVyKGZvcm0pKSB7XG4gICAgICB2YWx1ZXMucHVzaChTdHJpbmcoZm9ybVtmaWVsZF0pKTtcbiAgICB9XG4gICAgZm9yIChjb25zdCByZXAgb2YgYWxsUmVwcyhmb3JtKSkge1xuICAgICAgaWYgKHJlcFtmaWVsZF0gIT0gbnVsbCAmJiBmaWx0ZXIoey4uLmZvcm0sIC4uLnJlcH0pKSB7XG4gICAgICAgIHZhbHVlcy5wdXNoKFN0cmluZyhyZXBbZmllbGRdKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBbLi4ubmV3IFNldCh2YWx1ZXMpXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBsYWluQXJyYXkocGFyYW1zOiBhbnlbXSk6IGFueVtdIHtcbiAgY29uc3QgcmVzOiBhbnlbXSA9IFtdO1xuICBmb3IgKGNvbnN0IHBhcmFtIG9mIHBhcmFtcykge1xuICAgIGlmIChBcnJheS5pc0FycmF5KHBhcmFtKSkge1xuICAgICAgcmVzLnB1c2goLi4ucGFyYW0pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXMucHVzaChwYXJhbSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXM7XG59XG5cbi8qKlxuICogUmV0dXJucyB0aGUgbnVtYmVyIG9mIGZvcm1zIGZvciB3aGljaCBmaWx0ZXIgZXZhbHVhdGVzIHRvIHRydWUsXG4gKiBmb3IgdGhlIGZvcm0gaXRzZWxmIG9yIGZvciBhbnkgb2YgaXRzIHJlcGV0aXRpb25zLlxuICovXG5leHBvcnQgZnVuY3Rpb24gQ09VTlRfRk9STVMoZm9ybXM6IE1haW5Gb3JtW10sIGZpbHRlcjogRnVuYyB8IHN0cmluZyA9ICd0cnVlJyk6IG51bWJlciB7XG4gIGZvcm1zID0gKGZvcm1zIHx8IFtdKS5maWx0ZXIoZiA9PiBmICE9IG51bGwpO1xuICBpZiAoZmlsdGVyID09PSAndHJ1ZScpIHtcbiAgICByZXR1cm4gZm9ybXMubGVuZ3RoO1xuICB9XG4gIGlmICh0eXBlb2YgZmlsdGVyID09PSAnc3RyaW5nJykge1xuICAgIGZpbHRlciA9IGNyZWF0ZUZ1bmN0aW9uKGZpbHRlcik7XG4gIH1cbiAgbGV0IGNvdW50ID0gMDtcbiAgZm9yIChjb25zdCBmb3JtIG9mIGZvcm1zKSB7XG4gICAgaWYgKGZpbHRlcihmb3JtKSkge1xuICAgICAgY291bnQrKztcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IHJlcCBvZiBhbGxSZXBzKGZvcm0pKSB7XG4gICAgICBpZiAoZmlsdGVyKHsuLi5mb3JtLCAuLi5yZXB9KSkge1xuICAgICAgICBjb3VudCsrO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIGNvdW50O1xufVxuXG4vKipcbiAqIENvdW50cyB0aGUgZm9ybXMgYW5kIGFsbCBvZiB0aGVpciByZXBldGl0aW9ucyBmb3Igd2hpY2ggZmlsdGVyIGV2YWx1YXRlcyB0byB0cnVlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gQ09VTlRfUkVQUyhmb3JtczogTWFpbkZvcm1bXSwgZmlsdGVyOiBGdW5jIHwgc3RyaW5nID0gJ3RydWUnKTogbnVtYmVyIHtcbiAgZm9ybXMgPSAoZm9ybXMgfHwgW10pLmZpbHRlcihmID0+IGYgIT0gbnVsbCk7XG4gIGlmICh0eXBlb2YgZmlsdGVyID09PSAnc3RyaW5nJykge1xuICAgIGZpbHRlciA9IGNyZWF0ZUZ1bmN0aW9uKGZpbHRlcik7XG4gIH1cbiAgbGV0IGNvdW50ID0gMDtcbiAgZm9yIChjb25zdCBmb3JtIG9mIGZvcm1zKSB7XG4gICAgaWYgKGZpbHRlcihmb3JtKSkge1xuICAgICAgY291bnQrKztcbiAgICB9XG4gICAgZm9yIChjb25zdCByZXAgb2YgYWxsUmVwcyhmb3JtKSkge1xuICAgICAgaWYgKGZpbHRlcih7Li4uZm9ybSwgLi4ucmVwfSkpIHtcbiAgICAgICAgY291bnQrKztcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIGNvdW50O1xufVxuXG4vKipcbiAqIERlcHJlY2F0ZWQuIFVzZSBMRU4oQUxMX1ZBTFVFU19PRilcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIENPVU5UX0ZPUk1TX1VOSVFVRShcbiAgZm9ybXM6IE1haW5Gb3JtW10sXG4gIGZpZWxkOiBzdHJpbmcsXG4gIGZpbHRlcjogRnVuYyB8IHN0cmluZyA9ICd0cnVlJyxcbik6IG51bWJlciB7XG4gIHJldHVybiBBTExfVkFMVUVTX09GKGZvcm1zLCBmaWVsZCwgZmlsdGVyKS5sZW5ndGg7XG59XG5cbmZ1bmN0aW9uIGdldE51bWVyaWNWYWx1ZXMoXG4gIGZvcm1zOiAoTWFpbkZvcm0gfCBGb3JtKVtdLFxuICBmaWVsZDogc3RyaW5nLFxuICBmaWx0ZXI6IEZ1bmMgfCBzdHJpbmcgPSAndHJ1ZScsXG4pOiBudW1iZXJbXSB7XG4gIGZvcm1zID0gKGZvcm1zIHx8IFtdKS5maWx0ZXIoZiA9PiBmICE9IG51bGwpO1xuICBpZiAodHlwZW9mIGZpbHRlciA9PT0gJ3N0cmluZycpIHtcbiAgICBmaWx0ZXIgPSBjcmVhdGVGdW5jdGlvbihmaWx0ZXIpO1xuICB9XG4gIGxldCB2YWx1ZXM6IG51bWJlcltdID0gW107XG4gIGZvciAoY29uc3QgZm9ybSBvZiBmb3Jtcykge1xuICAgIGNvbnN0IHZhbCA9IGZvcm1bZmllbGRdO1xuICAgIGlmICh2YWwgIT0gbnVsbCAmJiAhaXNOYU4oTnVtYmVyKHZhbCkpICYmIGZpbHRlcihmb3JtKSkge1xuICAgICAgdmFsdWVzLnB1c2goTnVtYmVyKHZhbCkpO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IHJlcCBvZiBhbGxSZXBzKGZvcm0pKSB7XG4gICAgICBjb25zdCB2YWwgPSByZXBbZmllbGRdO1xuICAgICAgaWYgKHZhbCAhPSBudWxsICYmICFpc05hTihOdW1iZXIodmFsKSkgJiYgZmlsdGVyKHsuLi5mb3JtLCAuLi5yZXB9KSkge1xuICAgICAgICB2YWx1ZXMucHVzaChOdW1iZXIodmFsKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiB2YWx1ZXM7XG59XG5cbi8qKlxuICogQWdncmVnYXRlcyBhbmQgc3VtcyB0aGUgdmFsdWVzIG9mIHRoZSBzcGVjaWZpZWQgZmllbGQuXG4gKiBBbiBvcHRpb25hbCBleHByZXNzaW9uIGNhbiBiZSBhZGRlZCB0byBmaWx0ZXIgd2hpY2ggZm9ybXMgdG8gdGFrZSBmb3IgdGhlIHN1bS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIFNVTShcbiAgZm9ybXM6IChNYWluRm9ybSB8IEZvcm0pW10sXG4gIGZpZWxkOiBzdHJpbmcsXG4gIGZpbHRlcjogRnVuYyB8IHN0cmluZyA9ICd0cnVlJyxcbik6IG51bWJlciB7XG4gIGNvbnN0IHZhbHVlcyA9IGdldE51bWVyaWNWYWx1ZXMoZm9ybXMsIGZpZWxkLCBmaWx0ZXIpO1xuICBsZXQgc3VtID0gMDtcbiAgZm9yIChjb25zdCB2YWwgb2YgdmFsdWVzKSB7XG4gICAgc3VtICs9IHZhbDtcbiAgfVxuICByZXR1cm4gdHJ1bmNhdGUxMChzdW0pO1xufVxuXG4vKipcbiAqIENvbXB1dGVzIHRoZSBtZWFuIG9mIHRoZSB2YWx1ZXMgb2YgdGhlIHNwZWNpZmllZCBmaWVsZC5cbiAqIEFuIG9wdGlvbmFsIGV4cHJlc3Npb24gY2FuIGJlIGFkZGVkIHRvIGZpbHRlciB3aGljaCBmb3JtcyB0byB0YWtlIGZvciB0aGUgc3VtLlxuICovXG5leHBvcnQgZnVuY3Rpb24gTUVBTihcbiAgZm9ybXM6IChGb3JtIHwgTWFpbkZvcm0pW10sXG4gIGZpZWxkOiBzdHJpbmcsXG4gIGZpbHRlcjogRnVuYyB8IHN0cmluZyA9ICd0cnVlJyxcbik6IG51bWJlciB7XG4gIGNvbnN0IHZhbHVlcyA9IGdldE51bWVyaWNWYWx1ZXMoZm9ybXMsIGZpZWxkLCBmaWx0ZXIpO1xuICBsZXQgc3VtID0gMDtcbiAgZm9yIChjb25zdCB2YWwgb2YgdmFsdWVzKSB7XG4gICAgc3VtICs9IHZhbDtcbiAgfVxuICByZXR1cm4gdHJ1bmNhdGUxMChzdW0gLyB2YWx1ZXMubGVuZ3RoKTtcbn1cblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSAlIGJldHdlZW4gdHdvIG1lbWJlcnMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBQRVJDRU5UKHZhbHVlMTogbnVtYmVyLCB2YWx1ZTI6IG51bWJlcik6IHN0cmluZyB7XG4gIGNvbnN0IHJlcyA9ICgrdmFsdWUxICogMTAwKSAvICt2YWx1ZTI7XG4gIHJldHVybiBOdW1iZXIuaXNGaW5pdGUocmVzKSA/IE1hdGgucm91bmQocmVzKSArICclJyA6ICdpbmZpbml0ZSc7XG59XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgcGVyY2VudGFnZSBjaGFuZ2UgYmV0d2VlbiBhIHZhbHVlIGFuZCBoaXMgYmFzZSByZWZlcmVuY2UgdmFsdWUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBQRVJDRU5UQUdFX0NIQU5HRShcbiAgdmFsdWU6IG51bWJlciB8IHN0cmluZyxcbiAgcmVmZXJlbmNlX3ZhbHVlOiBudW1iZXIgfCBzdHJpbmcsXG4pOiBudW1iZXIgfCBzdHJpbmcge1xuICBsZXQgY3VyciA9IE51bWJlcih2YWx1ZSk7XG4gIGxldCByZWYgPSBOdW1iZXIocmVmZXJlbmNlX3ZhbHVlKTtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgJiYgaXNOYU4oY3VycikpIHtcbiAgICBjdXJyID0gTnVtYmVyKHZhbHVlLnNsaWNlKDAsIC0xKSk7XG4gIH1cbiAgaWYgKHR5cGVvZiByZWZlcmVuY2VfdmFsdWUgPT09ICdzdHJpbmcnICYmIGlzTmFOKHJlZikpIHtcbiAgICByZWYgPSBOdW1iZXIocmVmZXJlbmNlX3ZhbHVlLnNsaWNlKDAsIC0xKSk7XG4gIH1cbiAgaWYgKCFpc05hTihjdXJyKSAmJiAhaXNOYU4ocmVmKSAmJiByZWYgPiAwKSB7XG4gICAgY29uc3QgcmVzID0gKChjdXJyIC0gcmVmKSAvIHJlZikgKiAxMDA7XG4gICAgcmV0dXJuIE51bWJlci5pc0Zpbml0ZShyZXMpID8gTWF0aC5yb3VuZChyZXMpIDogMDtcbiAgfVxuICByZXR1cm4gJy0nO1xufVxuXG4vKipcbiAqIEV2YWx1YXRlcyB0aGUgZXhwcmVzc2lvbiBpbiB0aGUgZmlyc3QgZm9ybSBieSBkYXRlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gRklSU1QoXG4gIGZvcm1zOiAoRm9ybSB8IE1haW5Gb3JtKVtdLFxuICBleHByZXNzaW9uOiBGdW5jIHwgc3RyaW5nLFxuICBkYXRlID0gJ2NyZWF0ZWRfYXQnLFxuKTogYW55IHtcbiAgaWYgKHR5cGVvZiBleHByZXNzaW9uID09PSAnc3RyaW5nJykge1xuICAgIGV4cHJlc3Npb24gPSBjcmVhdGVGdW5jdGlvbihleHByZXNzaW9uKTtcbiAgfVxuICBmb3JtcyA9IChmb3JtcyB8fCBbXSkuZmlsdGVyKGYgPT4gZiAhPSBudWxsICYmIGZbZGF0ZV0gIT0gbnVsbCk7XG4gIGlmIChmb3Jtcy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG4gIGxldCBmb3JtID0gZm9ybXNbMF07XG4gIGxldCBtaW5EYXRlID0gZm9ybVtkYXRlXSBhcyBzdHJpbmc7XG4gIGZvciAobGV0IGkgPSAxOyBpIDwgZm9ybXMubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoKGZvcm1zW2ldW2RhdGVdIGFzIHN0cmluZykgPCBtaW5EYXRlKSB7XG4gICAgICBmb3JtID0gZm9ybXNbaV07XG4gICAgICBtaW5EYXRlID0gZm9ybVtkYXRlXSBhcyBzdHJpbmc7XG4gICAgfVxuICB9XG4gIHJldHVybiBleHByZXNzaW9uKGZvcm0pO1xufVxuXG4vKipcbiAqIEV2YWx1YXRlcyB0aGUgZXhwcmVzc2lvbiBpbiB0aGUgbGFzdCBmb3JtIGJ5IGRhdGUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBMQVNUKFxuICBmb3JtczogKEZvcm0gfCBNYWluRm9ybSlbXSxcbiAgZXhwcmVzc2lvbjogRnVuYyB8IHN0cmluZyxcbiAgZGF0ZSA9ICdjcmVhdGVkX2F0Jyxcbik6IGFueSB7XG4gIGlmICh0eXBlb2YgZXhwcmVzc2lvbiA9PT0gJ3N0cmluZycpIHtcbiAgICBleHByZXNzaW9uID0gY3JlYXRlRnVuY3Rpb24oZXhwcmVzc2lvbik7XG4gIH1cbiAgZm9ybXMgPSAoZm9ybXMgfHwgW10pLmZpbHRlcihmID0+IGYgIT0gbnVsbCAmJiBmW2RhdGVdICE9IG51bGwpO1xuICBpZiAoZm9ybXMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuICBsZXQgZm9ybSA9IGZvcm1zW2Zvcm1zLmxlbmd0aCAtIDFdO1xuICBsZXQgbWF4RGF0ZSA9IGZvcm1bZGF0ZV0gYXMgc3RyaW5nO1xuICBmb3IgKGxldCBpID0gZm9ybXMubGVuZ3RoIC0gMjsgaSA+PSAwOyBpLS0pIHtcbiAgICBpZiAoKGZvcm1zW2ldW2RhdGVdIGFzIHN0cmluZykgPiBtYXhEYXRlKSB7XG4gICAgICBmb3JtID0gZm9ybXNbaV07XG4gICAgICBtYXhEYXRlID0gZm9ybVtkYXRlXSBhcyBzdHJpbmc7XG4gICAgfVxuICB9XG4gIHJldHVybiBleHByZXNzaW9uKGZvcm0pO1xufVxuXG4vKipcbiAqIENvbXB1dGVzIHRoZSBtYXggdmFsdWUgb2YgdGhlIGZpZWxkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gTUFYKFxuICBmb3JtczogKEZvcm0gfCBNYWluRm9ybSlbXSxcbiAgZmllbGQ6IHN0cmluZyxcbiAgZmlsdGVyOiBGdW5jIHwgc3RyaW5nID0gJ3RydWUnLFxuKTogbnVtYmVyIHtcbiAgY29uc3QgdmFsdWVzID0gZ2V0TnVtZXJpY1ZhbHVlcyhmb3JtcywgZmllbGQsIGZpbHRlcik7XG4gIGxldCBtYXggPSAtSW5maW5pdHk7XG4gIGZvciAoY29uc3QgdmFsIG9mIHZhbHVlcykge1xuICAgIGlmICh2YWwgPiBtYXgpIHtcbiAgICAgIG1heCA9IHZhbDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG1heDtcbn1cblxuLyoqXG4gKiBDb21wdXRlcyB0aGUgbWVkaWFuIHZhbHVlIG9mIHRoZSBmaWVsZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIE1FRElBTihcbiAgZm9ybXM6IChGb3JtIHwgTWFpbkZvcm0pW10sXG4gIGZpZWxkOiBzdHJpbmcsXG4gIGZpbHRlcjogRnVuYyB8IHN0cmluZyA9ICd0cnVlJyxcbik6IG51bWJlciB7XG4gIGNvbnN0IHZhbHVlcyA9IGdldE51bWVyaWNWYWx1ZXMoZm9ybXMsIGZpZWxkLCBmaWx0ZXIpLnNvcnQoKTtcbiAgaWYgKHZhbHVlcy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gTmFOO1xuICB9XG4gIHJldHVybiB2YWx1ZXNbTWF0aC5mbG9vcih2YWx1ZXMubGVuZ3RoIC8gMildO1xufVxuXG4vKipcbiAqIENvbXB1dGVzIHRoZSBtb2RlIHZhbHVlIG9mIHRoZSBmaWVsZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIE1PREUoXG4gIGZvcm1zOiAoRm9ybSB8IE1haW5Gb3JtKVtdLFxuICBmaWVsZDogc3RyaW5nLFxuICBmaWx0ZXI6IEZ1bmMgfCBzdHJpbmcgPSAndHJ1ZScsXG4pOiBudW1iZXIge1xuICBjb25zdCB2YWx1ZXMgPSBnZXROdW1lcmljVmFsdWVzKGZvcm1zLCBmaWVsZCwgZmlsdGVyKTtcbiAgY29uc3QgY291bnRlcnM6IHtbdmFsOiBudW1iZXJdOiBudW1iZXJ9ID0ge307XG4gIGZvciAoY29uc3QgdmFsIG9mIHZhbHVlcykge1xuICAgIGlmIChjb3VudGVyc1t2YWxdID09IG51bGwpIHtcbiAgICAgIGNvdW50ZXJzW3ZhbF0gPSAxO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb3VudGVyc1t2YWxdKys7XG4gICAgfVxuICB9XG4gIGxldCBtYXhDb3VudCA9IDA7XG4gIGZvciAoY29uc3QgdmFsIGluIGNvdW50ZXJzKSB7XG4gICAgaWYgKGNvdW50ZXJzW3ZhbF0gPiBtYXhDb3VudCkge1xuICAgICAgbWF4Q291bnQgPSBjb3VudGVyc1t2YWxdO1xuICAgIH1cbiAgfVxuICBmb3IgKGNvbnN0IHZhbCBpbiBjb3VudGVycykge1xuICAgIGlmIChjb3VudGVyc1t2YWxdID09PSBtYXhDb3VudCkge1xuICAgICAgcmV0dXJuIE51bWJlcih2YWwpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gTmFOO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYnVpbGREYXRhc2V0KFxuICBkYXRhc2V0OiAoc3RyaW5nIHwgbnVtYmVyIHwgc3RyaW5nW10gfCBudW1iZXJbXSlbXSxcbiAgY29sc3BhbnM6IG51bWJlcltdLFxuKTogQWpmVGFibGVDZWxsW11bXSB7XG4gIHJldHVybiBidWlsZEFsaWduZWREYXRhc2V0KGRhdGFzZXQsIGNvbHNwYW5zLCBbXSk7XG59XG5cbi8qKlxuICogQnVpbGQgYSBkYXRhc2V0IGZvciBhamYgZHluYW1pYyB0YWJsZVxuICogQHBhcmFtIGRhdGFzZXQgdGhlIGRhdGFzZXQgZm9yIHRoZSB0YWJsZVxuICogQHBhcmFtIGNvbHNwYW5zIGNvbHNwYW4gZm9yIGVhY2ggdmFsdWUgaW4gdGhlIGRhdGFzZXRcbiAqIEBwYXJhbSB0ZXh0QWxpZ24gYWxpZ25tZW50IGZvciBlYWNoIHZhbHVlIGluIHRoZSBkYXRhc2V0XG4gKiBAcmV0dXJucyBBbiBBamZUYWJsZUNlbGwgbGlzdFxuICovXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRBbGlnbmVkRGF0YXNldChcbiAgZGF0YXNldDogKHN0cmluZyB8IG51bWJlciB8IHN0cmluZ1tdIHwgbnVtYmVyW10pW10sXG4gIGNvbHNwYW5zOiBudW1iZXJbXSxcbiAgdGV4dEFsaWduOiBzdHJpbmdbXSxcbik6IEFqZlRhYmxlQ2VsbFtdW10ge1xuICBjb25zdCByZXM6IEFqZlRhYmxlQ2VsbFtdW10gPSBbXTtcbiAgY29uc3Qgbm9ybWFsaXplRGF0YXNldDogYW55W11bXSA9IFtdO1xuICBkYXRhc2V0LmZvckVhY2goKHJvdzogYW55LCBpbmRleFJvdzogbnVtYmVyKSA9PiB7XG4gICAgcm93ID0gQXJyYXkuaXNBcnJheShyb3cpID8gcm93IDogW3Jvd107XG4gICAgbm9ybWFsaXplRGF0YXNldFtpbmRleFJvdyAlIGNvbHNwYW5zLmxlbmd0aF0gPVxuICAgICAgbm9ybWFsaXplRGF0YXNldFtpbmRleFJvdyAlIGNvbHNwYW5zLmxlbmd0aF0gIT0gbnVsbFxuICAgICAgICA/IFsuLi5ub3JtYWxpemVEYXRhc2V0W2luZGV4Um93ICUgY29sc3BhbnMubGVuZ3RoXSwgLi4ucm93XVxuICAgICAgICA6IFsuLi5yb3ddO1xuICB9KTtcbiAgY29uc3QgdHJhbnNwb3NlID0gbm9ybWFsaXplRGF0YXNldFswXS5tYXAoKF86IGFueSwgY29sSW5kZXg6IG51bWJlcikgPT5cbiAgICBub3JtYWxpemVEYXRhc2V0Lm1hcCgocm93OiBhbnkpID0+IHJvd1tjb2xJbmRleF0pLFxuICApO1xuICB0cmFuc3Bvc2UuZm9yRWFjaCgoZGF0YTogYW55W10sIGluZGV4OiBudW1iZXIpID0+IHtcbiAgICBjb25zdCByb3c6IEFqZlRhYmxlQ2VsbFtdID0gW107XG4gICAgZGF0YS5mb3JFYWNoKChjZWxsVmFsdWU6IHN0cmluZyB8IG51bWJlciwgY2VsbEluZGV4OiBudW1iZXIpID0+IHtcbiAgICAgIHJvdy5wdXNoKHtcbiAgICAgICAgdmFsdWU6IGNlbGxWYWx1ZSxcbiAgICAgICAgY29sc3BhbjogY29sc3BhbnNbY2VsbEluZGV4XSxcbiAgICAgICAgcm93c3BhbjogMSxcbiAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICB0ZXh0QWxpZ246IHRleHRBbGlnbltjZWxsSW5kZXhdID8gdGV4dEFsaWduW2NlbGxJbmRleF0gOiAnY2VudGVyJyxcbiAgICAgICAgICBjb2xvcjogJ2JsYWNrJyxcbiAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IGluZGV4ICUgMiA9PT0gMCA/ICd3aGl0ZScgOiAnI2RkZCcsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9KTtcbiAgICByZXMucHVzaChyb3cpO1xuICB9KTtcbiAgcmV0dXJuIHJlcztcbn1cblxuLyoqXG4gKiBCdWlsZCBhIGRhdGFzZXQgYmFzZWQgb24gYSBsaXN0IG9mIEZvcm1zLCBmb3IgYWpmIGR5bmFtaWMgdGFibGVcbiAqIEBwYXJhbSBkYXRhc2V0IHRoZSBkYXRhc2V0IGZvciB0aGUgdGFibGVcbiAqIEBwYXJhbSBmaWVsZHMgdGhlIGxpc3Qgb2YgZmllbGRzIG5hbWUgZm9yIGVhY2ggcm93XG4gKiBAcGFyYW0gcm93TGluayB0aGUgaHR0cCBsaW5rIGZvciB0aGUgcm93LCB3aXRoIHRoZSBmb3JtIGZpZWxkIG5hbWUgd2l0aCB0aGUgbGluayB2YWx1ZSBhbmQgdGhlIGNvbHVtbiBwb3NpdGlvbiBmb3IgdGhlIGxpbmsuXG4gKiBpZTogeydsaW5rJzogJ2hvbWVfbGluaycsICdwb3NpdGlvbic6IDB9XG4gKiBAcGFyYW0gYmFja2dyb3VuZENvbG9yQSB0aGUgZmlyc3QgYmFja2dyb3VkIGNvbG9yXG4gKiBAcGFyYW0gYmFja2dyb3VuZENvbG9yQiB0aGUgc2Vjb25kIGJhY2tncm91ZCBjb2xvclxuICogQHJldHVybnMgQW4gQWpmVGFibGVDZWxsIGxpc3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkRm9ybURhdGFzZXQoXG4gIGRhdGFzZXQ6IE1haW5Gb3JtW10sXG4gIGZpZWxkczogc3RyaW5nW10sXG4gIHJvd0xpbms6IHtsaW5rOiBzdHJpbmc7IHBvc2l0aW9uOiBudW1iZXJ9IHwgbnVsbCxcbiAgX2JhY2tncm91bmRDb2xvckE/OiBzdHJpbmcsXG4gIF9iYWNrZ3JvdW5kQ29sb3JCPzogc3RyaW5nLFxuKTogQWpmVGFibGVDZWxsW11bXSB7XG4gIHJldHVybiBidWlsZEFsaWduZWRGb3JtRGF0YXNldChkYXRhc2V0LCBmaWVsZHMsIFtdLCBbXSwgcm93TGluaywgW10sIFtdKTtcbn1cblxuLyoqXG4gKiBCdWlsZCBhIGRhdGFzZXQgYmFzZWQgb24gYSBsaXN0IG9mIEZvcm1zLCBmb3IgYWpmIGR5bmFtaWMgdGFibGVcbiAqIEBwYXJhbSBkYXRhc2V0IHRoZSBkYXRhc2V0IGZvciB0aGUgdGFibGVcbiAqIEBwYXJhbSBmaWVsZHMgdGhlIGxpc3Qgb2YgZmllbGRzIG5hbWUgZm9yIGVhY2ggcm93XG4gKiBAcGFyYW0gY29sc3BhbnMgY29sc3BhbiBmb3IgZWFjaCB2YWx1ZSBpbiB0aGUgZGF0YXNldFxuICogQHBhcmFtIHRleHRBbGlnbiBhbGlnbm1lbnQgZm9yIGVhY2ggdmFsdWUgaW4gdGhlIGRhdGFzZXRcbiAqIEBwYXJhbSByb3dMaW5rIHRoZSBodHRwIGxpbmsgZm9yIHRoZSByb3csIHdpdGggdGhlIGZvcm0gZmllbGQgbmFtZSB3aXRoIHRoZSBsaW5rIHZhbHVlIGFuZCB0aGUgY29sdW1uIHBvc2l0aW9uIGZvciB0aGUgbGluay5cbiAqIGllOiB7J2xpbmsnOiAnaG9tZV9saW5rJywgJ3Bvc2l0aW9uJzogMH1cbiAqIEByZXR1cm5zIEFuIEFqZlRhYmxlQ2VsbCBsaXN0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBidWlsZEFsaWduZWRGb3JtRGF0YXNldChcbiAgZGF0YXNldDogTWFpbkZvcm1bXSxcbiAgZmllbGRzOiBzdHJpbmdbXSxcbiAgY29sc3BhbnM6IG51bWJlcltdLFxuICB0ZXh0QWxpZ246IHN0cmluZ1tdLFxuICByb3dMaW5rOiB7bGluazogc3RyaW5nOyBwb3NpdGlvbjogbnVtYmVyfSB8IG51bGwsXG4gIGRpYWxvZ0ZpZWxkczogc3RyaW5nW10sXG4gIGRpYWxvZ0xhYmVsRmllbGRzOiBzdHJpbmdbXSxcbik6IEFqZlRhYmxlQ2VsbFtdW10ge1xuICBjb25zdCByZXM6IEFqZlRhYmxlQ2VsbFtdW10gPSBbXTtcblxuICBjb25zdCBiYWNrZ3JvdW5kQ29sb3JBID0gJ3doaXRlJztcbiAgY29uc3QgYmFja2dyb3VuZENvbG9yQiA9ICcjZGRkJztcbiAgaWYgKGRhdGFzZXQpIHtcbiAgICBsZXQgaW5kZXg6IG51bWJlciA9IDA7XG4gICAgZGF0YXNldC5mb3JFYWNoKChkYXRhOiBNYWluRm9ybSkgPT4ge1xuICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgaW5kZXgrKztcbiAgICAgICAgY29uc3Qgcm93OiBBamZUYWJsZUNlbGxbXSA9IFtdO1xuICAgICAgICBmaWVsZHMuZm9yRWFjaCgoZmllbGQ6IHN0cmluZywgY2VsbElkeDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgbGV0IGNlbGxWYWx1ZSA9IGRhdGFbZmllbGRdIHx8ICcnO1xuICAgICAgICAgIGlmIChyb3dMaW5rICE9IG51bGwgJiYgY2VsbElkeCA9PT0gcm93TGlua1sncG9zaXRpb24nXSkge1xuICAgICAgICAgICAgY2VsbFZhbHVlID0gYDxhIGhyZWY9JyR7ZGF0YVtyb3dMaW5rWydsaW5rJ11dfSc+ICR7ZGF0YVtmaWVsZF19PC9hPmA7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJvdy5wdXNoKHtcbiAgICAgICAgICAgIHZhbHVlOiBjZWxsVmFsdWUsXG4gICAgICAgICAgICBjb2xzcGFuOiBjb2xzcGFuc1tjZWxsSWR4XSAmJiBjb2xzcGFuc1tjZWxsSWR4XSA+IDAgPyBjb2xzcGFuc1tjZWxsSWR4XSA6IDEsXG4gICAgICAgICAgICByb3dzcGFuOiAxLFxuICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgdGV4dEFsaWduOiB0ZXh0QWxpZ25bY2VsbElkeF0gPyB0ZXh0QWxpZ25bY2VsbElkeF0gOiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgY29sb3I6ICdibGFjaycsXG4gICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogaW5kZXggJSAyID09PSAwID8gYmFja2dyb3VuZENvbG9yQSA6IGJhY2tncm91bmRDb2xvckIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoZGlhbG9nRmllbGRzICYmIGRpYWxvZ0ZpZWxkcy5sZW5ndGgpIHtcbiAgICAgICAgICBsZXQgZGlhbG9nSHRtbDogc3RyaW5nW10gPSBbXTtcbiAgICAgICAgICBkaWFsb2dGaWVsZHMuZm9yRWFjaCgoZmllbGQ6IHN0cmluZywgY2VsbElkeDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICBsZXQgZmllbGRWYWx1ZSA9ICdcIlwiJztcbiAgICAgICAgICAgIGlmIChkYXRhW2ZpZWxkXSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgIGZpZWxkVmFsdWUgPVxuICAgICAgICAgICAgICAgIFwiPHAgY2xhc3M9J2RpYWxvZy1pdGVtJz48Yj5cIiArXG4gICAgICAgICAgICAgICAgZGlhbG9nTGFiZWxGaWVsZHNbY2VsbElkeF0ucmVwbGFjZSgvWydcXFwiXSsvZywgJycpICtcbiAgICAgICAgICAgICAgICAnPC9iPiA8c3Bhbj4nICtcbiAgICAgICAgICAgICAgICBkYXRhW2ZpZWxkXSArXG4gICAgICAgICAgICAgICAgJzwvc3Bhbj48L3A+JztcbiAgICAgICAgICAgICAgZGlhbG9nSHRtbC5wdXNoKGZpZWxkVmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgcm93LnB1c2goe1xuICAgICAgICAgICAgdmFsdWU6XG4gICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwicmVhZF9tb3JlX2NlbGxcIj48cCBjbGFzcz1cInJlYWRfbW9yZV90ZXh0XCI+UmVhZCBtb3JlPC9wPjxiIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIj5hZGRfY2lyY2xlX291dGxpbmU8L2I+PC9kaXY+JyxcbiAgICAgICAgICAgIGRpYWxvZ0h0bWw6IGRpYWxvZ0h0bWwuam9pbignICcpLFxuICAgICAgICAgICAgY29sc3BhbjogMSxcbiAgICAgICAgICAgIHJvd3NwYW46IDEsXG4gICAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxuICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJyxcbiAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBpbmRleCAlIDIgPT09IDAgPyBiYWNrZ3JvdW5kQ29sb3JBIDogYmFja2dyb3VuZENvbG9yQixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmVzLnB1c2gocm93KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICByZXR1cm4gcmVzO1xufVxuXG4vKipcbiAqIGNyZWF0ZSBhIHdpZGdldCBkYXRhc2V0IGludG8gYSBjb250ZW50IGxpc3QsIGJhc2VkIG9uIGEgbGlzdCBvZiBGb3JtcywgZm9yIHBhZ2luYXRlZCB3aWRnZXRcbiAqXG4gKiBAcGFyYW0gZGF0YXNldCB0aGUgZGF0YXNldCBmb3IgdGhlIHdpZGdldHNcbiAqIEBwYXJhbSBmaWVsZHMgdGhlIGxpc3Qgb2YgZmllbGRzIG5hbWUgZm9yIGVhY2ggcm93XG4gKiBAcGFyYW0gcm93TGluayB0aGUgaHR0cCBsaW5rIGZvciB0aGUgcm93LCB3aXRoIHRoZSBmb3JtIGZpZWxkIG5hbWUgd2l0aCB0aGUgbGluayB2YWx1ZSBhbmQgdGhlIGNvbHVtbiBwb3NpdGlvbiBmb3IgdGhlIGxpbmsuXG4gKiBpZTogeydsaW5rJzogJ2hvbWVfbGluaycsICdwb3NpdGlvbic6IDB9XG4gKiBAcGFyYW0gY2VsbFN0eWxlcyBjc3Mgc3R5bGVzIGZvciBjZWxsc1xuICogQHBhcmFtIHJvd1N0eWxlIGNzcyBzdHlsZXMgZm9yIHJvd3NcbiAqIEBwYXJhbSBwZXJjV2lkdGggYW4gYXJyYXkgd2l0aCB0aGUgc2FtZSBsZW5ndGggb2YgZmllbGRzIHBhcmFtLCB3aXRoIHRoZSB3aWR0aCBmb3IgdGhlIGNvbHVtbnMuXG4gKiBpZTogWycxMCUnLCAnMzAlJywgJzEwJScsICcyNSUnLCAnMTUlJywgJzEwJSddXG4gKiBAcGFyYW0gYmFja2dyb3VuZENvbG9yQSB0aGUgZmlyc3QgYmFja2dyb3VkIGNvbG9yXG4gKiBAcGFyYW0gYmFja2dyb3VuZENvbG9yQiB0aGUgc2Vjb25kIGJhY2tncm91ZCBjb2xvclxuICogQHJldHVybnMgQW4gQWpmVGFibGVXaWRnZXQgbGlzdFxuICovXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRXaWRnZXREYXRhc2V0KFxuICBkYXRhc2V0OiBNYWluRm9ybVtdLFxuICBmaWVsZHM6IHN0cmluZ1tdLFxuICByb3dMaW5rOiB7bGluazogc3RyaW5nOyBwb3NpdGlvbjogbnVtYmVyfSB8IG51bGwsXG4gIGNlbGxTdHlsZXM6IHtba2V5OiBzdHJpbmddOiBhbnl9IHwgbnVsbCxcbiAgcm93U3R5bGU6IHtba2V5OiBzdHJpbmddOiBhbnl9IHwgbnVsbCxcbiAgcGVyY1dpZHRoOiBzdHJpbmdbXSxcbiAgYmFja2dyb3VuZENvbG9yQT86IHN0cmluZyxcbiAgYmFja2dyb3VuZENvbG9yQj86IHN0cmluZyxcbik6IGFueVtdIHtcbiAgY29uc3QgcmVzOiB7W2tleTogc3RyaW5nXTogYW55fVtdID0gW107XG4gIGlmIChiYWNrZ3JvdW5kQ29sb3JBID09IG51bGwpIHtcbiAgICBiYWNrZ3JvdW5kQ29sb3JBID0gJ3doaXRlJztcbiAgfVxuICBpZiAoYmFja2dyb3VuZENvbG9yQiA9PSBudWxsKSB7XG4gICAgYmFja2dyb3VuZENvbG9yQiA9ICcjZGRkJztcbiAgfVxuICBpZiAocm93U3R5bGUgPT0gbnVsbCkge1xuICAgIHJvd1N0eWxlID0ge1xuICAgICAgJ3RleHQtYWxpZ24nOiAncmlnaHQnLFxuICAgICAgJ21hcmdpbi1ib3R0b20nOiAwLFxuICAgICAgJ2JvcmRlci1jb2xsYXBzZSc6ICdjb2xsYXBzZScsXG4gICAgfTtcbiAgfVxuICBpZiAoY2VsbFN0eWxlcyA9PSBudWxsKSB7XG4gICAgY2VsbFN0eWxlcyA9IHtcbiAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXG4gICAgICBjb2xvcjogJ2JsYWNrJyxcbiAgICB9O1xuICB9XG4gIGlmIChwZXJjV2lkdGggPT0gbnVsbCB8fCBwZXJjV2lkdGgubGVuZ3RoICE9PSBmaWVsZHMubGVuZ3RoKSB7XG4gICAgY29uc3QgY2VsbFdpZHRoID0gMTAwIC8gZmllbGRzLmxlbmd0aCArICclJztcbiAgICBwZXJjV2lkdGggPSBbXTtcbiAgICBmaWVsZHMuZm9yRWFjaChfID0+IHBlcmNXaWR0aC5wdXNoKGNlbGxXaWR0aCkpO1xuICB9XG5cbiAgaWYgKGRhdGFzZXQpIHtcbiAgICBsZXQgaW5kZXg6IG51bWJlciA9IDA7XG4gICAgZGF0YXNldC5mb3JFYWNoKChkYXRhOiBNYWluRm9ybSkgPT4ge1xuICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgaW5kZXgrKztcbiAgICAgICAgLy8gUm93IGlzIGFuIEFqZlRhYmxlV2lkZ2V0XG4gICAgICAgIGNvbnN0IHJvdzoge1trZXk6IHN0cmluZ106IGFueX0gPSB7XG4gICAgICAgICAgc3R5bGVzOiB7XG4gICAgICAgICAgICAndGV4dC1hbGlnbic6ICdyaWdodCcsXG4gICAgICAgICAgICAnbWFyZ2luLWJvdHRvbSc6IDAsXG4gICAgICAgICAgICAnYm9yZGVyLWNvbGxhcHNlJzogJ2NvbGxhcHNlJyxcbiAgICAgICAgICAgIC4uLnJvd1N0eWxlLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgdmlzaWJpbGl0eToge2NvbmRpdGlvbjogJ3RydWUnfSxcbiAgICAgICAgICB3aWRnZXRUeXBlOiA1LFxuICAgICAgICAgIGRhdGFzZXQ6IFtbXV0gYXMgYW55W11bXSxcbiAgICAgICAgICBjZWxsU3R5bGVzOiB7J2JvcmRlci10b3AnOiAnMXB4IHNvbGlkIGdyZXknfSxcbiAgICAgICAgfTtcblxuICAgICAgICBmaWVsZHMuZm9yRWFjaCgoZmllbGQ6IHN0cmluZywgY2VsbElkeDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgbGV0IGZvcm11bGFDZWxsID0gJ1wiXCInO1xuICAgICAgICAgIGlmIChkYXRhW2ZpZWxkXSAhPSBudWxsKSB7XG4gICAgICAgICAgICBmb3JtdWxhQ2VsbCA9ICdcIicgKyBkYXRhW2ZpZWxkXSArICdcIic7XG4gICAgICAgICAgICBpZiAocm93TGluayAhPSBudWxsICYmIGNlbGxJZHggPT09IHJvd0xpbmtbJ3Bvc2l0aW9uJ10pIHtcbiAgICAgICAgICAgICAgZm9ybXVsYUNlbGwgPSBgXCI8YSBocmVmPScke2RhdGFbcm93TGlua1snbGluayddXX0nPiAke2RhdGFbZmllbGRdfTwvYT5cImA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcm93WydkYXRhc2V0J11bMF0ucHVzaCh7XG4gICAgICAgICAgICBsYWJlbDogJycsXG4gICAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxuICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJyxcbiAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBpbmRleCAlIDIgPT09IDAgPyBiYWNrZ3JvdW5kQ29sb3JBIDogYmFja2dyb3VuZENvbG9yQixcbiAgICAgICAgICAgICAgLi4uY2VsbFN0eWxlcyxcbiAgICAgICAgICAgICAgd2lkdGg6IHBlcmNXaWR0aFtjZWxsSWR4XSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmb3JtdWxhOiB7XG4gICAgICAgICAgICAgIGZvcm11bGE6IGZvcm11bGFDZWxsLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNvbHNwYW46IDEsXG4gICAgICAgICAgICByb3dzcGFuOiAxLFxuICAgICAgICAgICAgYWdncmVnYXRpb246IHtcbiAgICAgICAgICAgICAgYWdncmVnYXRpb246IDAsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgcmVzLnB1c2gocm93KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICByZXR1cm4gcmVzO1xufVxuXG4vKipcbiAqIGNyZWF0ZSBhIHdpZGdldCBkYXRhc2V0IGludG8gYSBjb250ZW50IGxpc3QsIGJhc2VkIG9uIGEgbGlzdCBvZiBGb3JtcywgZm9yIHBhZ2luYXRlZCB3aWRnZXQuXG4gKiBFYWNoIHJvdyBpcyBhIEFqZkRpYWxvZ1dpZGdldCBhbmQsIG9uIGNsaWNrLCBvcGVuIGEgZGlhbG9nLlxuICpcbiAqIEBwYXJhbSBkYXRhc2V0IHRoZSBkYXRhc2V0IGZvciB0aGUgd2lkZ2V0c1xuICogQHBhcmFtIGZpZWxkcyB0aGUgbGlzdCBvZiBmaWVsZHMgbmFtZSBmb3IgZWFjaCByb3dcbiAqIEBwYXJhbSBkaWFsb2dGaWVsZHMgdGhlIGxpc3Qgb2YgZmllbGRzIG5hbWUgdG8gc2hvdyBpbiB0aGUgZGlhbG9nXG4gKiBAcGFyYW0gZGlhbG9nTGFiZWxGaWVsZHMgdGhlIGxpc3Qgb2YgbGFiZWxzIGZvciBlYWNoIGRpYWxvZ0ZpZWxkc1xuICogQHBhcmFtIHJvd0xpbmsgdGhlIGh0dHAgbGluayBmb3IgdGhlIHJvdywgd2l0aCB0aGUgZm9ybSBmaWVsZCBuYW1lIHdpdGggdGhlIGxpbmsgdmFsdWUgYW5kIHRoZSBjb2x1bW4gcG9zaXRpb24gZm9yIHRoZSBsaW5rLlxuICogaWU6IHsnbGluayc6ICdob21lX2xpbmsnLCAncG9zaXRpb24nOiAwfVxuICogQHBhcmFtIGNlbGxTdHlsZXMgY3NzIHN0eWxlcyBmb3IgY2VsbHNcbiAqIEBwYXJhbSByb3dTdHlsZSBjc3Mgc3R5bGVzIGZvciByb3dzXG4gKiBAcGFyYW0gcGVyY1dpZHRoIGFuIGFycmF5IHdpdGggdGhlIHNhbWUgbGVuZ3RoIG9mIGZpZWxkcyBwYXJhbSwgd2l0aCB0aGUgd2lkdGggZm9yIHRoZSBjb2x1bW5zLlxuICogaWU6IFsnMTAlJywgJzMwJScsICcxMCUnLCAnMjUlJywgJzE1JScsICcxMCUnXVxuICogQHBhcmFtIGJhY2tncm91bmRDb2xvckEgdGhlIGZpcnN0IGJhY2tncm91ZCBjb2xvclxuICogQHBhcmFtIGJhY2tncm91bmRDb2xvckIgdGhlIHNlY29uZCBiYWNrZ3JvdWQgY29sb3JcbiAqIEByZXR1cm5zIEFuIEFqZkRpYWxvZ1dpZGdldCBsaXN0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBidWlsZFdpZGdldERhdGFzZXRXaXRoRGlhbG9nKFxuICBkYXRhc2V0OiBNYWluRm9ybVtdLFxuICBmaWVsZHM6IHN0cmluZ1tdLFxuICBkaWFsb2dGaWVsZHM6IHN0cmluZ1tdLFxuICBkaWFsb2dMYWJlbEZpZWxkczogc3RyaW5nW10sXG4gIGNlbGxTdHlsZXM6IHtba2V5OiBzdHJpbmddOiBhbnl9IHwgbnVsbCxcbiAgcm93U3R5bGU6IHtba2V5OiBzdHJpbmddOiBhbnl9IHwgbnVsbCxcbiAgcGVyY1dpZHRoOiBzdHJpbmdbXSxcbiAgYmFja2dyb3VuZENvbG9yQT86IHN0cmluZyxcbiAgYmFja2dyb3VuZENvbG9yQj86IHN0cmluZyxcbik6IGFueVtdIHtcbiAgY29uc3QgcmVzOiB7W2tleTogc3RyaW5nXTogYW55fVtdID0gW107XG4gIGlmIChiYWNrZ3JvdW5kQ29sb3JBID09IG51bGwpIHtcbiAgICBiYWNrZ3JvdW5kQ29sb3JBID0gJ3doaXRlJztcbiAgfVxuICBpZiAoYmFja2dyb3VuZENvbG9yQiA9PSBudWxsKSB7XG4gICAgYmFja2dyb3VuZENvbG9yQiA9ICcjZGRkJztcbiAgfVxuICBpZiAocm93U3R5bGUgPT0gbnVsbCkge1xuICAgIHJvd1N0eWxlID0ge1xuICAgICAgJ3RleHQtYWxpZ24nOiAncmlnaHQnLFxuICAgICAgJ21hcmdpbi1ib3R0b20nOiAwLFxuICAgICAgJ2JvcmRlci1jb2xsYXBzZSc6ICdjb2xsYXBzZScsXG4gICAgfTtcbiAgfVxuICBpZiAoY2VsbFN0eWxlcyA9PSBudWxsKSB7XG4gICAgY2VsbFN0eWxlcyA9IHtcbiAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXG4gICAgICBjb2xvcjogJ2JsYWNrJyxcbiAgICB9O1xuICB9XG4gIGlmIChwZXJjV2lkdGggPT0gbnVsbCB8fCBwZXJjV2lkdGgubGVuZ3RoICE9PSBmaWVsZHMubGVuZ3RoKSB7XG4gICAgY29uc3QgY2VsbFdpZHRoID0gMTAwIC8gZmllbGRzLmxlbmd0aCArICclJztcbiAgICBwZXJjV2lkdGggPSBbXTtcbiAgICBmaWVsZHMuZm9yRWFjaChfID0+IHBlcmNXaWR0aC5wdXNoKGNlbGxXaWR0aCkpO1xuICB9XG5cbiAgaWYgKGRhdGFzZXQpIHtcbiAgICBsZXQgaW5kZXg6IG51bWJlciA9IDA7XG4gICAgZGF0YXNldC5mb3JFYWNoKChkYXRhOiBNYWluRm9ybSkgPT4ge1xuICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgaW5kZXgrKztcbiAgICAgICAgLy8gUm93IGlzIGFuIEFqZlRhYmxlV2lkZ2V0XG4gICAgICAgIGNvbnN0IHJvdzoge1trZXk6IHN0cmluZ106IGFueX0gPSB7XG4gICAgICAgICAgc3R5bGVzOiB7XG4gICAgICAgICAgICAndGV4dC1hbGlnbic6ICdyaWdodCcsXG4gICAgICAgICAgICAnbWFyZ2luLWJvdHRvbSc6IDAsXG4gICAgICAgICAgICAnYm9yZGVyLWNvbGxhcHNlJzogJ2NvbGxhcHNlJyxcbiAgICAgICAgICAgIC4uLnJvd1N0eWxlLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgdmlzaWJpbGl0eToge2NvbmRpdGlvbjogJ3RydWUnfSxcbiAgICAgICAgICB3aWRnZXRUeXBlOiA1LFxuICAgICAgICAgIGRhdGFzZXQ6IFtbXV0gYXMgYW55W11bXSxcbiAgICAgICAgICBjZWxsU3R5bGVzOiB7J2JvcmRlci10b3AnOiAnMXB4IHNvbGlkIGdyZXknfSxcbiAgICAgICAgfTtcblxuICAgICAgICBmaWVsZHMuZm9yRWFjaCgoZmllbGQ6IHN0cmluZywgY2VsbElkeDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgbGV0IGZvcm11bGFDZWxsID0gJ1wiXCInO1xuICAgICAgICAgIGlmIChkYXRhW2ZpZWxkXSAhPSBudWxsKSB7XG4gICAgICAgICAgICBmb3JtdWxhQ2VsbCA9ICdcIicgKyBkYXRhW2ZpZWxkXSArICdcIic7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcm93WydkYXRhc2V0J11bMF0ucHVzaCh7XG4gICAgICAgICAgICBsYWJlbDogJycsXG4gICAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxuICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJyxcbiAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBpbmRleCAlIDIgPT09IDAgPyBiYWNrZ3JvdW5kQ29sb3JBIDogYmFja2dyb3VuZENvbG9yQixcbiAgICAgICAgICAgICAgLi4uY2VsbFN0eWxlcyxcbiAgICAgICAgICAgICAgd2lkdGg6IHBlcmNXaWR0aFtjZWxsSWR4XSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmb3JtdWxhOiB7XG4gICAgICAgICAgICAgIGZvcm11bGE6IGZvcm11bGFDZWxsLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNvbHNwYW46IDEsXG4gICAgICAgICAgICByb3dzcGFuOiAxLFxuICAgICAgICAgICAgYWdncmVnYXRpb246IHtcbiAgICAgICAgICAgICAgYWdncmVnYXRpb246IDAsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBsZXQgaHRtbERpYWxvZzogc3RyaW5nW10gPSBbXTtcbiAgICAgICAgZGlhbG9nRmllbGRzLmZvckVhY2goKGZpZWxkOiBzdHJpbmcsIGNlbGxJZHg6IG51bWJlcikgPT4ge1xuICAgICAgICAgIGxldCBmaWVsZFZhbHVlID0gJ1wiXCInO1xuICAgICAgICAgIGlmIChkYXRhW2ZpZWxkXSAhPSBudWxsKSB7XG4gICAgICAgICAgICBmaWVsZFZhbHVlID1cbiAgICAgICAgICAgICAgXCI8cCBjbGFzcz0nZGlhbG9nLWl0ZW0nPjxiPlwiICtcbiAgICAgICAgICAgICAgZGlhbG9nTGFiZWxGaWVsZHNbY2VsbElkeF0gK1xuICAgICAgICAgICAgICAnPC9iPiA8c3Bhbj4nICtcbiAgICAgICAgICAgICAgZGF0YVtmaWVsZF0gK1xuICAgICAgICAgICAgICAnPC9zcGFuPjwvcD4nO1xuICAgICAgICAgICAgaHRtbERpYWxvZy5wdXNoKGZpZWxkVmFsdWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgZGlhbG9nQ29udGVudDoge1trZXk6IHN0cmluZ106IGFueX0gPSB7XG4gICAgICAgICAgd2lkZ2V0VHlwZTogMyxcbiAgICAgICAgICBzdHlsZXM6IHtcbiAgICAgICAgICAgICdtYXJnaW4nOiAnMCAxZW0nLFxuICAgICAgICAgICAgJ3BhZGRpbmcnOiAnNXB4IDEwcHgnLFxuICAgICAgICAgICAgJ21heC1oZWlnaHQnOiAnMzYwcHgnLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgdmlzaWJpbGl0eToge2NvbmRpdGlvbjogJ3RydWUnfSxcbiAgICAgICAgICBodG1sVGV4dDogaHRtbERpYWxvZy5qb2luKCcgJyksXG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gVGhpcyBpcyBhIERpYWxvZyBXaWRnZXQsIGFkZGVkIGFzIGNvbXRhaW5lciBmb3IgZWFjaCB0YWJsZSB3aWRnZXRcbiAgICAgICAgY29uc3QgZGlhbG9nUm93OiB7W2tleTogc3RyaW5nXTogYW55fSA9IHtcbiAgICAgICAgICB3aWRnZXRUeXBlOiAxMyxcbiAgICAgICAgICBzdHlsZXM6IHtcbiAgICAgICAgICAgICdtYXJnaW4nOiAnMCcsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB2aXNpYmlsaXR5OiB7Y29uZGl0aW9uOiAndHJ1ZSd9LFxuICAgICAgICAgIHRvZ2dsZTogcm93LFxuICAgICAgICAgIGNvbnRlbnQ6IFtkaWFsb2dDb250ZW50XSxcbiAgICAgICAgfTtcbiAgICAgICAgcmVzLnB1c2goZGlhbG9nUm93KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICByZXR1cm4gcmVzO1xufVxuXG4vKipcbiAqIERlcHJlY2F0ZWQuIFVzZSBNQVBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIFJFUEVBVChcbiAgZm9ybXM6IE1haW5Gb3JtW10sXG4gIGFycmF5OiBzdHJpbmdbXSxcbiAgZm46IGFueSxcbiAgYXJnMTogc3RyaW5nLFxuICBhcmcyOiBzdHJpbmcgPSAndHJ1ZScsXG4pOiBhbnlbXSB7XG4gIHJldHVybiBhcnJheS5tYXAodiA9PiB7XG4gICAgY29uc3QgcyA9IEpTT04uc3RyaW5naWZ5KHYpO1xuICAgIGNvbnN0IGN1cnJlbnQxID0gKGFyZzEgYXMgYW55KS5yZXBsYWNlQWxsKCdjdXJyZW50Jywgcyk7XG4gICAgY29uc3QgY3VycmVudDIgPSAoYXJnMiBhcyBhbnkpLnJlcGxhY2VBbGwoJ2N1cnJlbnQnLCBzKTtcbiAgICByZXR1cm4gZm4oZm9ybXMsIGN1cnJlbnQxLCBjdXJyZW50Mik7XG4gIH0pO1xufVxuXG4vKipcbiAqIE1hcHMgZnVuYyB0byB0aGUgZWxlbWVudHMgb2YgYXJyYXkuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBNQVAoYXJyYXk6IGFueVtdLCBmdW5jOiAoYTogYW55KSA9PiBhbnkpOiBhbnlbXSB7XG4gIHJldHVybiBhcnJheS5tYXAoZnVuYyk7XG59XG5cbi8qKlxuICogRm9yIGVhY2ggZm9ybSBpbiBmb3JtcywgdGhlIHNwZWNpZmllZCBmaWVsZCBpcyBzZXQgd2l0aCB0aGUgdmFsdWUgZ2l2ZW4gYnkgZXhwcmVzc2lvbi5cbiAqIFRoZSBmb3JtJ3MgZmllbGRzIGNhbiBiZSB1c2VkIGluc2lkZSBleHByZXNzaW9uLlxuICovXG5leHBvcnQgZnVuY3Rpb24gQVBQTFkoZm9ybXM6IE1haW5Gb3JtW10sIGZpZWxkOiBzdHJpbmcsIGV4cHJlc3Npb246IEZ1bmMgfCBzdHJpbmcpOiBNYWluRm9ybVtdIHtcbiAgZm9ybXMgPSBjbG9uZU1haW5Gb3Jtcyhmb3Jtcyk7XG4gIGlmICh0eXBlb2YgZXhwcmVzc2lvbiA9PT0gJ3N0cmluZycpIHtcbiAgICBleHByZXNzaW9uID0gY3JlYXRlRnVuY3Rpb24oZXhwcmVzc2lvbik7XG4gIH1cbiAgZm9yIChjb25zdCBmb3JtIG9mIGZvcm1zKSB7XG4gICAgaWYgKGZvcm0gIT0gbnVsbCkge1xuICAgICAgZm9ybVtmaWVsZF0gPSBleHByZXNzaW9uKGZvcm0pO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZm9ybXM7XG59XG5cbi8qKlxuICogUm91bmRzIG51bSB0byB0aGUgc3BlY2lmaWVkIG51bWJlciBvZiBkaWdpdHMgYWZ0ZXIgdGhlIHBvaW50IChvciB6ZXJvKS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIFJPVU5EKG51bTogbnVtYmVyIHwgc3RyaW5nLCBkaWdpdHM/OiBudW1iZXIpOiBudW1iZXIge1xuICByZXR1cm4gcm91bmQobnVtLCBkaWdpdHMpO1xufVxuXG4vKipcbiAqIERlcHJlY2F0ZWQuIFVzZSBJRlxuICovXG5leHBvcnQgZnVuY3Rpb24gRVZBTFVBVEUoY29uZGl0aW9uOiBzdHJpbmcsIGJyYW5jaDE6IGFueSwgYnJhbmNoMjogYW55KTogYW55IHtcbiAgaWYgKGV2YWx1YXRlRXhwcmVzc2lvbihjb25kaXRpb24pKSB7XG4gICAgcmV0dXJuIGJyYW5jaDE7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGJyYW5jaDI7XG4gIH1cbn1cblxuLyoqXG4gKiBUZWxscyBpZiBhcnIgaW5jbHVkZXMgZWxlbVxuICovXG5leHBvcnQgZnVuY3Rpb24gSU5DTFVERVMoYXJyOiBhbnlbXSB8IHN0cmluZywgZWxlbTogYW55KTogYm9vbGVhbiB7XG4gIGlmICghQXJyYXkuaXNBcnJheShhcnIpICYmIHR5cGVvZiBhcnIgIT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiBhcnIuaW5jbHVkZXMoZWxlbSk7XG59XG5cbi8qKlxuICogVGhpcyBmdW5jdGlvbiBidWlsZHMgYSBkYXRhIHN0cnVjdHVyZSB0aGF0IGFsbG93cyB0aGUgdXNlIG9mIHRoZSBoaW5kaWtpdCBmb3JtdWxhc1xuICogZm9yIGV2ZXJ5IGZvcm1zIHdpdGggcmVwZWF0aW5nIHNsaWRlcy5cbiAqIEluIHBhcnRpY3VsYXIsIGl0IGJ1aWxkcyBhIG1haW4gZGF0YSBmb3JtIHdpdGggYWxsIHRoZSBkYXRhIHJlbGF0aW5nIHRvIHRoZSBzbGlkZXMgYW5kXG4gKiBhIGRpY3Rpb25hcnkgd2l0aCB0aGUgbmFtZSByZXBzIHRodXMgbWFkZSBpbnN0YW5jZSBzbGlkZU5hbWUgZm9ybXMuXG4gKiBXaGVyZSBhIGZvcm0gaXMgYXNzb2NpYXRlZCB3aXRoIGVhY2ggaW5zdGFuY2Ugb2YgdGhlIHJlcGVhdGluZyBzbGlkZS5cbiAqIGV4YW1wbGU6XG4gKiBzaW1wbGUgZm9ybTpcbiAqICB7XG4gKiAgICAkdmFsdWU6IFwiQUdPXCJcbiAqICAgIGNpdHRhZGluYW56YV9fMDogXCJBR09cIlxuICogICAgY29kaWNlX2Zpc2NhbGVfXzA6IFwiamRmbGpnbMOya8Oya8OyXCJcbiAqICAgIGNvdW50cnlfXzA6IFwiQUdPXCJcbiAqICAgIGRhdGVfZW5kOiBcIjIwMjEtMDEtMTBcIlxuICogICAgZGF0ZV9zdGFydDogXCIyMDIxLTAxLTEwXCJcbiAqICAgIGRvYl9fMDogXCIyMDIxLTAzLTExXCJcbiAqICAgIGZpcnN0X25hbWVfXzA6IFwicGlwcG9cIlxuICogICAgZ2VuZGVyX18wOiBcImZcIlxuICogICAgaWRfZmFtaWx5OiBcIjNiZWYzYTNmLWQ5NWQtNGEwOS04ZGY0LWU4MTJjNTVjNjFjNlwiXG4gKiAgICBpc3RydXppb25lX18wOiBudWxsXG4gKiAgICBsYXN0X25hbWVfXzA6IFwicGlwcG9cIlxuICogICAgcGVybWVzc29fc29nZ2lvcm5vX18wOiBcIm5vXCJcbiAqICAgIHJlbGF6aW9uZV9fMDogXCJnZW5pdG9yZVwiXG4gKiAgICBzb2xpZGFuZG86IFwic29saWRhbmRvMVwiXG4gKiAgICBzdGF0b19jaXZpbGVfXzA6IG51bGxcbiAqICB9XG4gKiBhZnRlciBCVUlMRF9EQVRBU0VUXG4gKiBNYWluRm9ybTpcbiAqIHtcbiAqICAgICR2YWx1ZTogXCJBR09cIlxuICogICAgYWpmX2Zvcm1faWQ6IDAgKiogYWRkZWQgYXRyaWJ1dGUgdGhhdCByYXBwcmVzZW50IHRoZSBpbmRleCBwb3NpdGlvbiBpbnNpZGVzIGlucHV0IGZvcm0gbGlzdC5cbiAqICAgIGFqZl9mYW1pbHlfY29tcG9uZW50X2NvdW50OiAxKiogYWRkZWQgYXRyaWJ1dGUgdGhhdCByYXBwcmVzZW50IHRoZSBpbnN0YW5jZSBudW1iZXIgb2YgZmFtaWxpX2NvbXBvbmVudCByZXBlYXRpbmcgc2xpZGVzLlxuICogICAgZGF0ZV9lbmQ6IFwiMjAyMS0wMS0xMFwiXG4gKiAgICBkYXRlX3N0YXJ0OiBcIjIwMjEtMDEtMTBcIlxuICogICAgaWRfZmFtaWx5OiBcIjNiZWYzYTNmLWQ5NWQtNGEwOS04ZGY0LWU4MTJjNTVjNjFjNlwiXG4gKiAgICByZXBzOiB7XG4gKiAgICAgIGZhbWlseV9jb21wb25lbnQ6IFtcbiAqICAgICAgICB7XG4gKiAgICAgICAgICBhamZfZmFtaWx5X2NvbXBvbmVudF9yZXA6IDAgKiogYWRkZWQgYXRyaWJ1dGUgdGhhdCByYXBwcmVzZW50IHRoZSBvcmRlciBpbnN0YW5jZSBvZiBmYW1pbHlfY29tcG9uZW50IHJlcGVhdGluZyBzbGlkZS5cbiAqICAgICAgICAgIGNpdHRhZGluYW56YTogXCJBR09cIlxuICogICAgICAgICAgY29kaWNlX2Zpc2NhbGU6IFwiamRmbGpnbMOya8Oya8OyXCJcbiAqICAgICAgICAgIGNvdW50cnk6IFwiQUdPXCJcbiAqICAgICAgICAgIGRvYjogXCIyMDIxLTAzLTExXCJcbiAqICAgICAgICAgIGZpcnN0X25hbWU6IFwicGlwcG9cIlxuICogICAgICAgICAgZ2VuZGVyOiBcImZcIlxuICogICAgICAgICAgaXN0cnV6aW9uZTogbnVsbFxuICogICAgICAgICAgbGFzdF9uYW1lOiBcInBpcHBvXCJcbiAqICAgICAgICAgIHBlcm1lc3NvX3NvZ2dpb3JubzogXCJub1wiXG4gKiAgICAgICAgICByZWxhemlvbmU6IFwiZ2VuaXRvcmVcIlxuICogICAgICAgICAgc3RhdG9fY2l2aWxlOiBudWxsXG4gKiAgICAgICAgfVxuICogICAgICBdXG4gKiAgICB9XG4gKiB9XG4gKlxuICogQHBhcmFtIHtGb3JtW119IGZvcm1zXG4gKiBAcGFyYW0geyp9IFtzY2hlbWFdIGlmIHNjaGVtYSBpcyBwcm92aWRlZCB0aGUgaW5zdGFuY2VzIGluc2lkZSB0aGUgcmVwcyBtYXRjaCB3aXRoIGVmZmVjdGl2ZVxuICogc2xpZGUgbmFtZS4gT3RoZXJ3aXNlIGFsbCByZXBlYXRpbmcgc2xpZGVzIGFyZSBhc3NvY2lhdGVzIHRvIGdlbmVyaWMgc2xpZGUgbmFtZSBcInJlcFwiLlxuICogQHJldHVybiB7Kn0gIHtNYWluRm9ybVtdfVxuICovXG5leHBvcnQgZnVuY3Rpb24gQlVJTERfREFUQVNFVChmb3JtczogRm9ybVtdLCBzY2hlbWE/OiBhbnkpOiBNYWluRm9ybVtdIHtcbiAgY29uc3QgcmVzOiBNYWluRm9ybVtdID0gW107XG4gIGNvbnN0IGdlbmVyYXRlTWV0YWRhdGEgPSAoc2xpZGVOYW1lOiBzdHJpbmcsIHNsaWRlSW5zdGFuY2U6IG51bWJlcikgPT4ge1xuICAgIGNvbnN0IHJlc2c6IHtbc25hbWU6IHN0cmluZ106IGFueX0gPSB7fTtcbiAgICByZXNnW2BhamZfJHtzbGlkZU5hbWV9X3JlcGBdID0gc2xpZGVJbnN0YW5jZTtcbiAgICByZXR1cm4gcmVzZztcbiAgfTtcblxuICBmb3JtcyA9IFsuLi4oZm9ybXMgfHwgW10pXTtcblxuICBpZiAoc2NoZW1hICE9IG51bGwpIHtcbiAgICBjb25zdCByZXBlYXRpbmdTbGlkZXM6IGFueVtdID0gc2NoZW1hLm5vZGVzLmZpbHRlcigobm9kZTogYW55KSA9PiBub2RlLm5vZGVUeXBlID09PSA0KTtcbiAgICBjb25zdCBvYmo6IHtbZmllbGROYW1lOiBzdHJpbmddOiBzdHJpbmd9ID0ge307XG4gICAgcmVwZWF0aW5nU2xpZGVzLmZvckVhY2goc2xpZGUgPT4ge1xuICAgICAgbGV0IG5vZGVGaWVsZHMgPSBzbGlkZS5ub2Rlcy5tYXAoKG46IGFueSkgPT4gbi5uYW1lKTtcbiAgICAgIG5vZGVGaWVsZHMuZm9yRWFjaCgobm9kZUZpZWxkOiBzdHJpbmcpID0+IHtcbiAgICAgICAgb2JqW25vZGVGaWVsZF0gPSBzbGlkZS5uYW1lO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBmb3Jtcy5mb3JFYWNoKChmLCBmb3JtSWR4KSA9PiB7XG4gICAgICBjb25zdCBtYWluRm9ybTogTWFpbkZvcm0gPSB7cmVwczoge319O1xuICAgICAgY29uc3QgZktleXM6IHN0cmluZ1tdID0gT2JqZWN0LmtleXMoZik7XG4gICAgICBjb25zdCBpbnN0YW5jZXM6IHtbc2xpZGVOYW1lOiBzdHJpbmddOiBhbnl9ID0ge307XG5cbiAgICAgIGZLZXlzLmZvckVhY2goZmtleSA9PiB7XG4gICAgICAgIGNvbnN0IHNwbGl0dGVkS2V5OiBzdHJpbmdbXSA9IGZrZXkuc3BsaXQoJ19fJyk7XG4gICAgICAgIGNvbnN0IHNwbGl0dGVkTGVuZ3RoOiBudW1iZXIgPSBzcGxpdHRlZEtleS5sZW5ndGg7XG4gICAgICAgIGNvbnN0IGZpZWxkTmFtZSA9IHNwbGl0dGVkS2V5WzBdO1xuICAgICAgICBjb25zdCBzbGlkZUluc3RhbmNlID1cbiAgICAgICAgICBzcGxpdHRlZEtleVsxXSAhPSBudWxsICYmIE51bWJlci5pc0ludGVnZXIoK3NwbGl0dGVkS2V5WzFdKSA/ICtzcGxpdHRlZEtleVsxXSA6IG51bGw7XG4gICAgICAgIGNvbnN0IHNsaWRlTmFtZSA9IG9ialtmaWVsZE5hbWVdO1xuICAgICAgICBpZiAoc3BsaXR0ZWRMZW5ndGggPT09IDIgJiYgc2xpZGVJbnN0YW5jZSAhPSBudWxsICYmIHNsaWRlTmFtZSAhPSBudWxsKSB7XG4gICAgICAgICAgaW5zdGFuY2VzW3NsaWRlTmFtZV0gPSBpbnN0YW5jZXNbc2xpZGVOYW1lXSAhPSBudWxsID8gaW5zdGFuY2VzW3NsaWRlTmFtZV0gOiBbXTtcbiAgICAgICAgICBpbnN0YW5jZXNbc2xpZGVOYW1lXVtzbGlkZUluc3RhbmNlXSA9XG4gICAgICAgICAgICBpbnN0YW5jZXNbc2xpZGVOYW1lXVtzbGlkZUluc3RhbmNlXSAhPSBudWxsXG4gICAgICAgICAgICAgID8gaW5zdGFuY2VzW3NsaWRlTmFtZV1bc2xpZGVJbnN0YW5jZV1cbiAgICAgICAgICAgICAgOiBnZW5lcmF0ZU1ldGFkYXRhKHNsaWRlTmFtZSwgc2xpZGVJbnN0YW5jZSk7XG4gICAgICAgICAgaW5zdGFuY2VzW3NsaWRlTmFtZV1bc2xpZGVJbnN0YW5jZV1bZmllbGROYW1lXSA9IGZbZmtleV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbWFpbkZvcm1bZmtleV0gPSBmW2ZrZXldO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIG1haW5Gb3JtW2BhamZfZm9ybV9pZGBdID0gZm9ybUlkeDtcbiAgICAgIGNvbnN0IGluc3RhbmNlS2V5cyA9IE9iamVjdC5rZXlzKGluc3RhbmNlcyk7XG4gICAgICBpbnN0YW5jZUtleXMuZm9yRWFjaChpbnN0YW5jZUtleSA9PiB7XG4gICAgICAgIG1haW5Gb3JtW2BhamZfJHtpbnN0YW5jZUtleX1fY291bnRgXSA9IGluc3RhbmNlc1tpbnN0YW5jZUtleV0ubGVuZ3RoO1xuICAgICAgfSk7XG4gICAgICBtYWluRm9ybS5yZXBzID0gaW5zdGFuY2VzO1xuICAgICAgcmVzLnB1c2gobWFpbkZvcm0pO1xuICAgIH0pO1xuICAgIHJldHVybiByZXM7XG4gIH0gZWxzZSB7XG4gICAgZm9ybXMuZm9yRWFjaChmb3JtID0+IHtcbiAgICAgIGNvbnN0IGZLZXlzOiBzdHJpbmdbXSA9IE9iamVjdC5rZXlzKGZvcm0pO1xuICAgICAgY29uc3Qgbm9SZXBlYXRpbmdGaWVsZHM6IHN0cmluZ1tdID0gZktleXMuZmlsdGVyKGZrZXkgPT4ge1xuICAgICAgICBjb25zdCBzcGxpdHRlZEtleTogc3RyaW5nW10gPSBma2V5LnNwbGl0KCdfXycpO1xuICAgICAgICBpZiAoc3BsaXR0ZWRLZXkubGVuZ3RoID09PSAyKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSk7XG4gICAgICBjb25zdCBub1JlcEZvcm06IEZvcm0gPSB7fTtcblxuICAgICAgbm9SZXBlYXRpbmdGaWVsZHMuZm9yRWFjaChmaWVsZCA9PiB7XG4gICAgICAgIG5vUmVwRm9ybVtmaWVsZF0gPSBmb3JtW2ZpZWxkXTtcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBtYWluRm9ybTogTWFpbkZvcm0gPSB7Li4ubm9SZXBGb3JtLCByZXBzOiB7c2xpZGU6IFtdfX07XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IE1BWF9SRVBTOyBpKyspIHtcbiAgICAgICAgY29uc3QgY3VycmVudFNsaWRlOiBGb3JtID0ge307XG4gICAgICAgIGNvbnN0IG9ubHlDdXJyZW50SW5zdGFuY2VLZXlzOiBzdHJpbmdbXSA9IGZLZXlzLmZpbHRlcihma2V5ID0+IHtcbiAgICAgICAgICBjb25zdCBzcGxpdHRlZEtleTogc3RyaW5nW10gPSBma2V5LnNwbGl0KCdfXycpO1xuICAgICAgICAgIGlmIChzcGxpdHRlZEtleS5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgICAgIHJldHVybiBma2V5LmluZGV4T2YoYF9fJHtpfWApID4gLTE7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIHNlIGlsIG51bWVybyBkaSBhdHRyaWJ1dGkgY29pbmNpZGUgaWwgZm9ybSBkYXRhIG5vbiBoYSByZXBlYXRpbmdzbGlkZXNcbiAgICAgICAgaWYgKG9ubHlDdXJyZW50SW5zdGFuY2VLZXlzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIG1haW5Gb3JtWydhamZfcmVwX2NvdW50J10gPSBpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIG9ubHlDdXJyZW50SW5zdGFuY2VLZXlzLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgICBjb25zdCBzcGxpdHRlZEtleSA9IGtleS5zcGxpdCgnX18nKTtcbiAgICAgICAgICBjb25zdCBmaWVsZE5hbWUgPSBzcGxpdHRlZEtleVswXTtcbiAgICAgICAgICBjb25zdCBzbGlkZUluc3RhbmNlID0gc3BsaXR0ZWRLZXlbMV0gIT0gbnVsbCA/ICtzcGxpdHRlZEtleVsxXSA6IG51bGw7XG4gICAgICAgICAgY3VycmVudFNsaWRlW2ZpZWxkTmFtZV0gPSBmb3JtW2tleV07XG4gICAgICAgICAgY3VycmVudFNsaWRlWydhamZfcmVwJ10gPSBzbGlkZUluc3RhbmNlICE9IG51bGwgPyBzbGlkZUluc3RhbmNlIDogY3VycmVudFNsaWRlWydhamZfcmVwJ107XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAob25seUN1cnJlbnRJbnN0YW5jZUtleXMubGVuZ3RoICE9IDApIHtcbiAgICAgICAgICBtYWluRm9ybS5yZXBzIVsnc2xpZGUnXS5wdXNoKGN1cnJlbnRTbGlkZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbWFpbkZvcm0ucmVwcyA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmVzLnB1c2gobWFpbkZvcm0pO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHJlcztcbiAgfVxufVxuXG4vKipcbiAqIFVUSUxJVFkgRlVOQ0lPTlxuICogVGhpcyBmdW5jdGlvbiB0YWtlIGFuIGFqZiBzY2hlbWEgYXMgaW5wdXQgYW5kIGV4dHJhY3QgYVxuICogZGljdCB0aGF0IG1hdGNoIGVhY2ggY2hvaWNlIHZhbHVlIChhbHNvIHdpdGggY2hvaWNlc09yaWdpbiBuYW1lIHByZWZpeCkgd2l0aCBpdHMgbGFiZWxcbiAqIEBwYXJhbSBzY2hlbWEgdGhlIGFqZiBzY2hlbWFcbiAqIEByZXR1cm5zIEEgZGljdCB3aXRoOlxuICogIHtbY2hvaWNlc09yaWdpbk5hbWVfY2hvaWNlVmFsdWU6IHN0cmluZ106IFtjaG9pY2VMYWJlbDogc3RyaW5nXX1cbiAqICB7W2Nob2ljZVZhbHVlOiBzdHJpbmddOiBbY2hvaWNlTGFiZWw6IHN0cmluZ119XG4gKi9cbmZ1bmN0aW9uIGV4dHJhY3RMYWJlbHNCeVNjaGVtYUNob2ljZXMoc2NoZW1hOiBhbnkpOiB7W2Nob2ljZVZhbHVlOiBzdHJpbmddOiBzdHJpbmd9IHtcbiAgY29uc3QgY2hvaWNlTGFiZWxzOiB7W2Nob2ljZVZhbHVlOiBzdHJpbmddOiBzdHJpbmd9ID0ge307XG4gIGlmIChzY2hlbWEgJiYgc2NoZW1hLmNob2ljZXNPcmlnaW5zICE9IG51bGwpIHtcbiAgICAoc2NoZW1hLmNob2ljZXNPcmlnaW5zIGFzIGFueVtdKS5mb3JFYWNoKGNob2ljZXNPcmlnaW4gPT4ge1xuICAgICAgaWYgKGNob2ljZXNPcmlnaW4gIT0gbnVsbCAmJiBjaG9pY2VzT3JpZ2luLmNob2ljZXMgIT0gbnVsbCkge1xuICAgICAgICAoY2hvaWNlc09yaWdpbi5jaG9pY2VzIGFzIGFueVtdKS5mb3JFYWNoKGNob2ljZSA9PiB7XG4gICAgICAgICAgY2hvaWNlTGFiZWxzW2Nob2ljZXNPcmlnaW4ubmFtZSArICdfJyArIGNob2ljZS52YWx1ZV0gPSBjaG9pY2UubGFiZWw7XG4gICAgICAgICAgY2hvaWNlTGFiZWxzW2Nob2ljZS52YWx1ZV0gPSBjaG9pY2UubGFiZWw7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIHJldHVybiBjaG9pY2VMYWJlbHM7XG59XG5cbi8qKlxuICogVVRJTElUWSBGVU5DSU9OXG4gKiBUaGlzIGZ1bmN0aW9uIHRha2UgYW4gYWpmIHNjaGVtYSBhcyBpbnB1dCBhbmQgZXh0cmFjdCBhIG9uZVxuICogZGltZW5zaW9uYWwgYXJyYXkgb2YgQWpmTm9kZSBmb3IgZWFjaCBzbGlkZSdzIGZpZWxkXG4gKlxuICogQHBhcmFtIHNjaGVtYSB0aGUgYWpmIHNjaGVtYVxuICogQHJldHVybnMgQW4gb2JqZWN0IHdpdGggYWxsIGZpZWxkczpcbiAqICB7W2ZpZWxkTmFtZTogc3RyaW5nXTogYWpmIGZpZWxkfVxuICovXG5mdW5jdGlvbiBleHRyYWN0RmxhdHRlbk5vZGVzKHNjaGVtYTogYW55KToge1tmaWVsZDogc3RyaW5nXTogYW55fSB7XG4gIGNvbnN0IGZpZWxkTm9kZXM6IHtbZmllbGQ6IHN0cmluZ106IGFueX0gPSB7fTtcbiAgaWYgKHNjaGVtYSAmJiBzY2hlbWEubm9kZXMpIHtcbiAgICBjb25zdCBzbGlkZXM6IGFueVtdID0gc2NoZW1hLm5vZGVzLmZpbHRlcihcbiAgICAgIChub2RlOiBhbnkpID0+IG5vZGUubm9kZVR5cGUgPT09IDMgfHwgbm9kZS5ub2RlVHlwZSA9PT0gNCxcbiAgICApO1xuICAgIHNsaWRlcy5mb3JFYWNoKHNsaWRlID0+IHtcbiAgICAgIHNsaWRlLm5vZGVzXG4gICAgICAgIC5maWx0ZXIoKG5vZGU6IGFueSkgPT4gbm9kZS5ub2RlVHlwZSA9PT0gMClcbiAgICAgICAgLmZvckVhY2goKGZpZWxkTm9kZTogYW55KSA9PiB7XG4gICAgICAgICAgZmllbGROb2Rlc1tmaWVsZE5vZGUubmFtZV0gPSBmaWVsZE5vZGU7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9XG4gIHJldHVybiBmaWVsZE5vZGVzO1xufVxuXG4vKipcbiAqIFJldHVybnMgYSBjbG9uZSBvZiBmb3Jtcywgd2hlcmUgdGhlIHNwZWNpZmllZCBmaWVsZHMgYXJlIHJlcGxhY2VkIGJ5IHRoZSBjb3JyZXNwb25kaW5nIGxhYmVscyxcbiAqIGFzIGRlZmluZWQgYnkgdGhlIGNob2ljZSBvcmlnaW5zIGluIHNjaGVtYS5cbiAqXG4gKiBAcGFyYW0ge01haW5Gb3JtW119IGZvcm1MaXN0XG4gKiBAcGFyYW0geyp9IHNjaGVtYSB0aGUgYWpmIHNjaGVtYVxuICogQHBhcmFtIHtzdHJpbmdbXX0gZmllbGROYW1lc1xuICogQHJldHVybiB7Kn0gIHtNYWluRm9ybVtdfVxuICovXG5leHBvcnQgZnVuY3Rpb24gQVBQTFlfTEFCRUxTKGZvcm1MaXN0OiBNYWluRm9ybVtdLCBzY2hlbWE6IGFueSwgZmllbGROYW1lczogc3RyaW5nW10pOiBNYWluRm9ybVtdIHtcbiAgZm9ybUxpc3QgPSBjbG9uZU1haW5Gb3Jtcyhmb3JtTGlzdCk7XG4gIGNvbnN0IGNob2ljZUxhYmVsczoge1tmaWVsZE5hbWU6IHN0cmluZ106IHN0cmluZ30gPSBleHRyYWN0TGFiZWxzQnlTY2hlbWFDaG9pY2VzKHNjaGVtYSk7XG4gIGNvbnN0IGZsYXR0ZW5Ob2RlcyA9IGV4dHJhY3RGbGF0dGVuTm9kZXMoc2NoZW1hKTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGZvcm1MaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGZvcm1MaXN0W2ldID09IG51bGwpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBpZiAoZm9ybUxpc3RbaV0ucmVwcyAhPSBudWxsKSB7XG4gICAgICBjb25zdCBmID0gZm9ybUxpc3RbaV07XG4gICAgICBjb25zdCBmS2V5czogc3RyaW5nW10gPSBPYmplY3Qua2V5cyhmKTtcbiAgICAgIGZLZXlzLmZvckVhY2goZmtleSA9PiB7XG4gICAgICAgIGNvbnN0IGZpZWxkTm9kZSA9IGZsYXR0ZW5Ob2Rlc1tma2V5XTtcbiAgICAgICAgY29uc3QgY2hvaWNlT3JpZ2luTmFtZVByZWZpeCA9XG4gICAgICAgICAgZmllbGROb2RlICYmIGZpZWxkTm9kZS5jaG9pY2VzT3JpZ2luUmVmID8gZmllbGROb2RlLmNob2ljZXNPcmlnaW5SZWYgKyAnXycgOiAnJztcblxuICAgICAgICBpZiAoZmllbGROYW1lcy5pbmNsdWRlcyhma2V5KSAmJiBmW2ZrZXldICE9PSBudWxsKSB7XG4gICAgICAgICAgbGV0IGNob2ljZVZhbHVlOiBzdHJpbmdbXSA9IFtdO1xuICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGZbZmtleV0pKSB7XG4gICAgICAgICAgICBjaG9pY2VWYWx1ZSA9IGZbZmtleV0gYXMgdW5rbm93biBhcyBzdHJpbmdbXTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgbXVsdGlwbGVWYWxzID0gKGZbZmtleV0gYXMgc3RyaW5nKS5zcGxpdCgnLCcpLm1hcCh2ID0+IHYudHJpbSgpKTtcbiAgICAgICAgICAgIGlmIChtdWx0aXBsZVZhbHMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICBjaG9pY2VWYWx1ZSA9IG11bHRpcGxlVmFscztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGNob2ljZVZhbHVlID0gW2ZbZmtleV0gYXMgc3RyaW5nXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGNob2ljZVZhbHVlICE9IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnN0IGxhYmVscyA9IGNob2ljZVZhbHVlLm1hcCh2YWwgPT4ge1xuICAgICAgICAgICAgICBjb25zdCB2YWxXaXRoUHJlZml4ID0gY2hvaWNlT3JpZ2luTmFtZVByZWZpeCArIHZhbDtcbiAgICAgICAgICAgICAgcmV0dXJuIGNob2ljZUxhYmVsc1t2YWxXaXRoUHJlZml4XSAhPSBudWxsXG4gICAgICAgICAgICAgICAgPyBjaG9pY2VMYWJlbHNbdmFsV2l0aFByZWZpeF1cbiAgICAgICAgICAgICAgICA6IGNob2ljZUxhYmVsc1t2YWxdICE9IG51bGxcbiAgICAgICAgICAgICAgICA/IGNob2ljZUxhYmVsc1t2YWxdXG4gICAgICAgICAgICAgICAgOiB2YWw7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChsYWJlbHMgJiYgbGFiZWxzLmxlbmd0aCkge1xuICAgICAgICAgICAgICBjb25zdCBsYWJlbEZpZWxkTmFtZSA9IGZrZXkgKyAnX2Nob2ljZXNMYWJlbCc7XG4gICAgICAgICAgICAgIGZvcm1MaXN0W2ldW2xhYmVsRmllbGROYW1lXSA9IGxhYmVscy5sZW5ndGggPiAxID8gbGFiZWxzLmpvaW4oJywgJykgOiBsYWJlbHNbMF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZvcm1MaXN0O1xufVxuXG4vKipcbiAqIERlcHJlY2F0ZWQuIFVzZSBGSUxURVJfQllcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIEZJTFRFUl9CWV9WQVJTKGZvcm1MaXN0OiBNYWluRm9ybVtdLCBleHByZXNzaW9uOiBzdHJpbmcpOiBNYWluRm9ybVtdIHtcbiAgcmV0dXJuIEZJTFRFUl9CWShmb3JtTGlzdCwgZXhwcmVzc2lvbik7XG59XG5cbi8qKlxuICogUmV0dXJucyBhIGNvcHkgb2YgZm9ybXMgYW5kIGl0cyByZXBldGl0aW9ucywga2VlcGluZyBvbmx5IHRoZSBvbmVzIGZvciB3aGljaCBleHByZXNzaW9uIGV2YWx1YXRlcyB0byB0cnVlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gRklMVEVSX0JZKGZvcm1zOiBNYWluRm9ybVtdLCBleHByZXNzaW9uOiBGdW5jIHwgc3RyaW5nKTogTWFpbkZvcm1bXSB7XG4gIGZvcm1zID0gZm9ybXMgfHwgW107XG4gIGlmIChleHByZXNzaW9uID09PSAndHJ1ZScpIHtcbiAgICByZXR1cm4gY2xvbmVNYWluRm9ybXMoZm9ybXMpO1xuICB9XG4gIGlmICh0eXBlb2YgZXhwcmVzc2lvbiA9PT0gJ3N0cmluZycpIHtcbiAgICBleHByZXNzaW9uID0gY3JlYXRlRnVuY3Rpb24oZXhwcmVzc2lvbik7XG4gIH1cbiAgY29uc3QgcmVzOiBNYWluRm9ybVtdID0gW107XG4gIGZvciAobGV0IGZvcm0gb2YgZm9ybXMuZmlsdGVyKGYgPT4gZiAhPSBudWxsKSkge1xuICAgIGZvcm0gPSB7Li4uZm9ybX07XG4gICAgY29uc3QgZmlsdGVyZWRSZXBzOiBJbnN0YW5jZXMgPSB7fTtcbiAgICBsZXQgc29tZVJlcHMgPSBmYWxzZTtcbiAgICBpZiAoZm9ybS5yZXBzICE9IG51bGwpIHtcbiAgICAgIGZvciAoY29uc3Qga2V5IGluIGZvcm0ucmVwcykge1xuICAgICAgICBmaWx0ZXJlZFJlcHNba2V5XSA9IGZvcm0ucmVwc1trZXldLmZpbHRlcihyZXAgPT4gKGV4cHJlc3Npb24gYXMgRnVuYykoey4uLmZvcm0sIC4uLnJlcH0pKTtcbiAgICAgICAgZm9ybVtgYWpmXyR7a2V5fV9jb3VudGBdID0gZmlsdGVyZWRSZXBzW2tleV0ubGVuZ3RoO1xuICAgICAgICBzb21lUmVwcyB8fD0gZmlsdGVyZWRSZXBzW2tleV0ubGVuZ3RoID4gMDtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHNvbWVSZXBzIHx8IGV4cHJlc3Npb24oZm9ybSkpIHtcbiAgICAgIGZvcm0ucmVwcyA9IGZpbHRlcmVkUmVwcztcbiAgICAgIHJlcy5wdXNoKGZvcm0pO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzO1xufVxuXG4vKipcbiAqIFJldHVybnMgdG9kYXkncyBkYXRlLlxuICpcbiAqIEBleHBvcnRcbiAqIEByZXR1cm4geyp9ICB7c3RyaW5nfVxuICovXG5leHBvcnQgZnVuY3Rpb24gVE9EQVkoKTogc3RyaW5nIHtcbiAgcmV0dXJuIG5ldyBEYXRlKCkudG9KU09OKCkuc2xpY2UoMCwgMTApO1xufVxuXG4vKipcbiAqIExvZ3MgdmFsIHRvIHRoZSBjb25zb2xlLlxuICpcbiAqIEBleHBvcnRcbiAqIEBwYXJhbSB7Kn0gdmFsXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBDT05TT0xFX0xPRyh2YWw6IGFueSk6IGFueSB7XG4gIGNvbnNvbGUubG9nKHZhbCk7XG4gIHJldHVybiB2YWw7XG59XG5cbi8qKlxuICogQ29tcHV0ZXMgdGhlIGN1cnJlbnQgYWdlIGluIHllYXJzLCBnaXZlbiB0aGUgZGF0ZSBvZiBiaXJ0aC5cbiAqXG4gKiBAZXhwb3J0XG4gKiBAcGFyYW0geyhzdHJpbmcgfCBudWxsKX0gZG9iXG4gKiBAcGFyYW0geyhzdHJpbmcgfCB1bmRlZmluZWQpfSB3aGVuXG4gKiBAcmV0dXJuIHsqfSAge251bWJlcn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIEdFVF9BR0UoZG9iOiBzdHJpbmcgfCBudWxsLCB3aGVuPzogc3RyaW5nKTogbnVtYmVyIHtcbiAgaWYgKGRvYiA9PSBudWxsKSB7XG4gICAgcmV0dXJuIE5hTjtcbiAgfVxuICBpZiAod2hlbiA9PSBudWxsKSB7XG4gICAgd2hlbiA9IFRPREFZKCk7XG4gIH1cbiAgbGV0IHllYXJzRGlmZiA9IE51bWJlcih3aGVuLnNsaWNlKDAsIDQpKSAtIE51bWJlcihkb2Iuc2xpY2UoMCwgNCkpO1xuICBpZiAod2hlbi5zbGljZSg1KSA8IGRvYi5zbGljZSg1KSkge1xuICAgIC8vIGJpcnRoZGF5IG5vdCByZWFjaGVkIHlldCBpbiBjdXJyZW50IHllYXJcbiAgICB5ZWFyc0RpZmYtLTtcbiAgfVxuICByZXR1cm4geWVhcnNEaWZmO1xufVxuXG4vKipcbiAqIElmIGRhdGEgaXMgYSBmb3JtIHdpdGggcmVwZXRpdGlvbnMsIHJldHVybnMgdGhlIG51bWJlciBvZiByZXBldGl0aW9ucztcbiAqIElmIGRhdGEgaXMgYW4gYXJyYXksIHJldHVybnMgaXRzIGxlbmd0aDtcbiAqIE90aGVyd2lzZSByZXR1cm5zIDAuXG4gKlxuICogQGV4cG9ydFxuICogQHBhcmFtIHsoTWFpbkZvcm0gfCBhbnlbXSl9IGRhdGFzZXRcbiAqIEByZXR1cm4geyp9ICB7bnVtYmVyfVxuICovXG5leHBvcnQgZnVuY3Rpb24gTEVOKGRhdGFzZXQ6IE1haW5Gb3JtIHwgYW55W10pOiBudW1iZXIge1xuICBpZiAoZGF0YXNldCA9PSBudWxsKSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cbiAgY29uc3QgZm9ybSA9IGRhdGFzZXQgYXMgTWFpbkZvcm07XG4gIGlmIChmb3JtLnJlcHMgIT0gbnVsbCkge1xuICAgIHJldHVybiBhbGxSZXBzKGZvcm0pLmxlbmd0aDtcbiAgfVxuICByZXR1cm4gKGRhdGFzZXQgYXMgYW55W10pLmxlbmd0aCB8fCAwO1xufVxuXG4vKipcbiAqIEFycmF5IGNvbmNhdGVuYXRpb24uXG4gKlxuICogQGV4cG9ydFxuICogQHBhcmFtIHthbnlbXX0gYVxuICogQHBhcmFtIHthbnlbXX0gYlxuICogQHJldHVybiB7Kn0gIHthbnlbXX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIENPTkNBVChhOiBhbnlbXSwgYjogYW55W10pOiBhbnlbXSB7XG4gIHJldHVybiBhLmNvbmNhdChiKTtcbn1cblxuLyoqXG4gKiBSZW1vdmVzIGR1cGxpY2F0ZSBlbGVtZW50cyBmcm9tIGFuIGFycmF5LlxuICpcbiAqIEBleHBvcnRcbiAqIEBwYXJhbSB7YW55W119IGFyclxuICogQHJldHVybiB7Kn0gIHthbnlbXX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIFJFTU9WRV9EVVBMSUNBVEVTKGFycjogYW55W10pOiBhbnlbXSB7XG4gIHJldHVybiBbLi4ubmV3IE1hcChhcnIubWFwKHYgPT4gW0pTT04uc3RyaW5naWZ5KHYpLCB2XSkpLnZhbHVlcygpXTtcbn1cblxuLy8gUmV0dXJucyB0aGUgZGF0ZSBvYnRhaW5lZCBieSBhZGRpbmcgZGF5cyB0byBkYXRlLlxuZXhwb3J0IGZ1bmN0aW9uIEFERF9EQVlTKGRhdGU6IHN0cmluZywgZGF5czogbnVtYmVyKTogc3RyaW5nIHtcbiAgY29uc3QgZCA9IG5ldyBEYXRlKGRhdGUpO1xuICBkLnNldERhdGUoZC5nZXREYXRlKCkgKyBkYXlzKTtcbiAgcmV0dXJuIGQudG9KU09OKCkuc2xpY2UoMCwgMTApO1xufVxuXG4vLyBSZXR1cm5zIHRoZSBkaWZmZXJlbmNlIGluIGRheXMgKGEgLSBiKSBiZXR3ZWVuIHRoZSB0d28gZGF0ZXMuXG5leHBvcnQgZnVuY3Rpb24gREFZU19ESUZGKGE6IHN0cmluZywgYjogc3RyaW5nKTogbnVtYmVyIHtcbiAgY29uc3QgZGF0ZUEgPSBuZXcgRGF0ZShhKTtcbiAgY29uc3QgZGF0ZUIgPSBuZXcgRGF0ZShiKTtcbiAgLy8gVVRDIGF2b2lkcyBidWdzIHdpdGggZGF5bGlnaHQgc2F2aW5nIHRpbWUuXG4gIGNvbnN0IHV0Y0EgPSBEYXRlLlVUQyhkYXRlQS5nZXRGdWxsWWVhcigpLCBkYXRlQS5nZXRNb250aCgpLCBkYXRlQS5nZXREYXRlKCkpO1xuICBjb25zdCB1dGNCID0gRGF0ZS5VVEMoZGF0ZUIuZ2V0RnVsbFllYXIoKSwgZGF0ZUIuZ2V0TW9udGgoKSwgZGF0ZUIuZ2V0RGF0ZSgpKTtcblxuICBjb25zdCBtaWxsaXNQZXJEYXkgPSAxMDAwICogNjAgKiA2MCAqIDI0O1xuICByZXR1cm4gTWF0aC5mbG9vcigodXRjQSAtIHV0Y0IpIC8gbWlsbGlzUGVyRGF5KTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgZGF0ZSBpcyBiZWZvcmUgZGF0ZVRvQ29tcGFyZS5cbiAqXG4gKiBAZXhwb3J0XG4gKiBAcGFyYW0ge3N0cmluZ30gZGF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IGRhdGVUb0NvbXBhcmVcbiAqIEByZXR1cm4geyp9ICB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIElTX0JFRk9SRShkYXRlOiBzdHJpbmcsIGRhdGVUb0NvbXBhcmU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICByZXR1cm4gZGF0ZSA8IGRhdGVUb0NvbXBhcmU7XG59XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIGRhdGUgaXMgYWZ0ZXIgZGF0ZVRvQ29tcGFyZS5cbiAqXG4gKiBAZXhwb3J0XG4gKiBAcGFyYW0ge3N0cmluZ30gZGF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IGRhdGVUb0NvbXBhcmVcbiAqIEByZXR1cm4geyp9ICB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIElTX0FGVEVSKGRhdGU6IHN0cmluZywgZGF0ZVRvQ29tcGFyZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gIHJldHVybiBkYXRlID4gZGF0ZVRvQ29tcGFyZTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgZGF0ZSBpcyBiZXR3ZWVuIGRhdGVTdGFydCBhbmQgZGF0ZUVuZC5cbiAqXG4gKiBAZXhwb3J0XG4gKiBAcGFyYW0ge3N0cmluZ30gZGF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IGRhdGVTdGFydFxuICogQHBhcmFtIHtzdHJpbmd9IGRhdGVFbmRcbiAqIEByZXR1cm4geyp9ICB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIElTX1dJVEhJTl9JTlRFUlZBTChkYXRlOiBzdHJpbmcsIGRhdGVTdGFydDogc3RyaW5nLCBkYXRlRW5kOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgcmV0dXJuIGRhdGUgPj0gZGF0ZVN0YXJ0ICYmIGRhdGUgPD0gZGF0ZUVuZDtcbn1cblxuLyoqXG4gKiBDb21wYXJlcyBkYXRlIHdpdGggYW4gaW50ZXJ2YWwuXG4gKiBSZXR1cm5zICctMScgKG9yIHRoZSBmaXJzdCBlbGVtZW50IG9mIGxhYmVscykgaWYgZGF0ZSBpcyBiZWZvcmUgZGF0ZVN0YXJ0LFxuICogJzAnIChvciB0aGUgc2Vjb25kIGVsZW1lbnQpIGlmIGRhdGUgaXMgYmV0d2VlbiBkYXRlU3RhcnQgYW5kIGRhdGVFbmQsXG4gKiAnMScgKG9yIHRoZSB0aGlyZCBlbGVtZW50KSBpZiBkYXRlIGlzIGFmdGVyIGRhdGVFbmQuXG4gKlxuICogQGV4cG9ydFxuICogQHBhcmFtIHtzdHJpbmd9IGRhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBkYXRlU3RhcnRcbiAqIEBwYXJhbSB7c3RyaW5nfSBkYXRlRW5kXG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBsYWJlbHMgYW4gb3B0aW9uYWwgYXJyYXkgb2Ygc3RyaW5nIGZvciB0aGUgb3V0cHV0IHZhbHVlc1xuICogQHJldHVybiB7Kn0gIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBDT01QQVJFX0RBVEUoXG4gIGRhdGU6IHN0cmluZyxcbiAgZGF0ZVN0YXJ0OiBzdHJpbmcsXG4gIGRhdGVFbmQ6IHN0cmluZyxcbiAgbGFiZWxzPzogc3RyaW5nW10sXG4pOiBzdHJpbmcge1xuICBpZiAobGFiZWxzID09IG51bGwpIHtcbiAgICBsYWJlbHMgPSBbJy0xJywgJzAnLCAnMSddO1xuICB9XG4gIGlmIChJU19CRUZPUkUoZGF0ZSwgZGF0ZVN0YXJ0KSkge1xuICAgIHJldHVybiBsYWJlbHNbMF07XG4gIH1cbiAgaWYgKElTX1dJVEhJTl9JTlRFUlZBTChkYXRlLCBkYXRlU3RhcnQsIGRhdGVFbmQpKSB7XG4gICAgcmV0dXJuIGxhYmVsc1sxXTtcbiAgfVxuICBpZiAoSVNfQUZURVIoZGF0ZSwgZGF0ZUVuZCkpIHtcbiAgICByZXR1cm4gbGFiZWxzWzJdO1xuICB9XG4gIHJldHVybiAnJztcbn1cblxuLyoqXG4gKiBQZXJmb3JtcyBhIGxlZnQgam9pbiBvZiBmb3Jtc0EgYW5kIGZvcm1zQi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIEpPSU5fRk9STVMoXG4gIGZvcm1zQTogKE1haW5Gb3JtIHwgRm9ybSlbXSxcbiAgZm9ybXNCOiAoTWFpbkZvcm0gfCBGb3JtKVtdLFxuICBrZXlBOiBzdHJpbmcsXG4gIGtleUI/OiBzdHJpbmcsXG4pOiAoTWFpbkZvcm0gfCBGb3JtKVtdIHtcbiAgcmV0dXJuIEpPSU5fUkVQRUFUSU5HX1NMSURFUyhmb3Jtc0EsIGZvcm1zQiwga2V5QSwga2V5QiBhcyBhbnksIG51bGwgYXMgYW55KTtcbn1cblxuLyoqXG4gKiBQZXJmb3JtcyBhIGxlZnQgam9pbiBvZiBmb3Jtc0EgYW5kIGZvcm1zQiwgbGlrZSBKT0lOX0ZPUk1TLlxuICogSW4gYWRkaXRpb24sIGZvciBlYWNoIG1hdGNoaW5nIHBhaXIgb2YgZm9ybUEgYW5kIGZvcm1CLCB0aGVpciByZXBlYXRpbmcgc2xpZGVzIGFyZSBhbHNvIGpvaW5lZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIEpPSU5fUkVQRUFUSU5HX1NMSURFUyhcbiAgZm9ybXNBOiBNYWluRm9ybVtdLFxuICBmb3Jtc0I6IE1haW5Gb3JtW10sXG4gIGtleUE6IHN0cmluZyxcbiAga2V5Qjogc3RyaW5nLFxuICBzdWJrZXlBOiBzdHJpbmcsXG4gIHN1YmtleUI/OiBzdHJpbmcsXG4pOiBNYWluRm9ybVtdIHtcbiAgZm9ybXNBID0gY2xvbmVNYWluRm9ybXMoZm9ybXNBIHx8IFtdKTtcbiAgZm9ybXNCID0gY2xvbmVNYWluRm9ybXMoZm9ybXNCIHx8IFtdKTtcbiAgaWYgKGtleUIgPT0gbnVsbCkge1xuICAgIGtleUIgPSBrZXlBO1xuICB9XG4gIGlmIChzdWJrZXlCID09IG51bGwpIHtcbiAgICBzdWJrZXlCID0gc3Via2V5QTtcbiAgfVxuICBjb25zdCBpbmRleEI6IHtbdmFsOiBzdHJpbmddOiBNYWluRm9ybX0gPSB7fTtcbiAgZm9yIChsZXQgaSA9IGZvcm1zQi5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgIGNvbnN0IHZhbCA9IGZvcm1zQltpXSAmJiBmb3Jtc0JbaV1ba2V5Ql07XG4gICAgaWYgKHZhbCAhPSBudWxsKSB7XG4gICAgICBpbmRleEJbU3RyaW5nKHZhbCldID0gZm9ybXNCW2ldO1xuICAgIH1cbiAgfVxuICBjb25zdCByZXM6IE1haW5Gb3JtW10gPSBbXTtcbiAgZm9yIChjb25zdCBmb3JtQSBvZiBmb3Jtc0EpIHtcbiAgICBjb25zdCB2YWwgPSBmb3JtQSAmJiBmb3JtQVtrZXlBXTtcbiAgICBjb25zdCBmb3JtQiA9IGluZGV4QltTdHJpbmcodmFsKV07XG4gICAgaWYgKHZhbCA9PSBudWxsIHx8IGZvcm1CID09IG51bGwpIHtcbiAgICAgIHJlcy5wdXNoKGZvcm1BKTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBjb25zdCByZXBzQSA9IGZvcm1BLnJlcHMgfHwge307XG4gICAgY29uc3QgcmVwc0IgPSBmb3JtQi5yZXBzIHx8IHt9O1xuICAgIGlmIChzdWJrZXlBICE9IG51bGwpIHtcbiAgICAgIGNvbnN0IGFsbFJlcHNCID0gYWxsUmVwcyhmb3JtQik7XG4gICAgICBmb3IgKGNvbnN0IGsgaW4gcmVwc0EpIHtcbiAgICAgICAgcmVwc0Fba10gPSBKT0lOX0ZPUk1TKHJlcHNBW2tdLCBhbGxSZXBzQiwgc3Via2V5QSwgc3Via2V5QikgYXMgRm9ybVtdO1xuICAgICAgICBmb3JtQVtgYWpmXyR7a31fY291bnRgXSA9IHJlcHNBW2tdLmxlbmd0aDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmVzLnB1c2goey4uLmZvcm1CLCAuLi5mb3JtQSwgcmVwczogey4uLnJlcHNCLCAuLi5yZXBzQX19KTtcbiAgfVxuICByZXR1cm4gcmVzO1xufVxuXG4vKipcbiAqIFJldHVybnMgdGhlIGFycmF5IG9idGFpbmVkIGJ5IGV2YWx1YXRpbmcgZXhwcmVzc2lvbiBmb3IgZXZlcnkgcmVwZXRpdGlvbiBvZiBmb3JtLlxuICpcbiAqIEBleHBvcnRcbiAqIEBwYXJhbSB7TWFpbkZvcm19IGZvcm1cbiAqIEBwYXJhbSB7c3RyaW5nfSBleHByZXNzaW9uXG4gKiBAcmV0dXJuIHsqfSAge2FueVtdfVxuICovXG5leHBvcnQgZnVuY3Rpb24gRlJPTV9SRVBTKGZvcm06IE1haW5Gb3JtLCBleHByZXNzaW9uOiBGdW5jIHwgc3RyaW5nKTogYW55W10ge1xuICBpZiAodHlwZW9mIGV4cHJlc3Npb24gPT09ICdzdHJpbmcnKSB7XG4gICAgZXhwcmVzc2lvbiA9IGNyZWF0ZUZ1bmN0aW9uKGV4cHJlc3Npb24pO1xuICB9XG4gIHJldHVybiBhbGxSZXBzKGZvcm0gfHwge30pLm1hcChyZXAgPT4gKGV4cHJlc3Npb24gYXMgRnVuYykoey4uLmZvcm0sIC4uLnJlcH0pKTtcbn1cblxuLyoqXG4gKiBEZXByZWNhdGVkLiBVc2UgSU5DTFVERVNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIElTSU4oZGF0YXNldDogYW55W10sIHZhbHVlOiBhbnkpOiBib29sZWFuIHtcbiAgaWYgKGRhdGFzZXQgPT0gbnVsbCB8fCB2YWx1ZSA9PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiBkYXRhc2V0LmluZGV4T2YodmFsdWUpID49IDA7XG59XG5cbi8qKlxuICogQXBwbGllcyB0aGUgb3BlcmF0b3IgdG8gZXZlcnkgcGFpciBvZiBlbGVtZW50cyAoYXJyYXlBW2ldLCBhcnJheUJbaV0pLFxuICogcmV0dXJuaW5nIHRoZSBhcnJheSBvZiByZXN1bHRzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gT1AoXG4gIGFycmF5QTogYW55W10sXG4gIGFycmF5QjogYW55W10sXG4gIG9wZXJhdG9yOiAoKGE6IGFueSwgYjogYW55KSA9PiBhbnkpIHwgc3RyaW5nLFxuKTogYW55W10ge1xuICBpZiAodHlwZW9mIG9wZXJhdG9yID09PSAnc3RyaW5nJykge1xuICAgIGNvbnN0IGZ1bmMgPSBjcmVhdGVGdW5jdGlvbihvcGVyYXRvcik7XG4gICAgb3BlcmF0b3IgPSAoZWxlbUEsIGVsZW1CKSA9PiBmdW5jKHtlbGVtQSwgZWxlbUJ9KTtcbiAgfVxuICBjb25zdCByZXM6IGFueVtdID0gW107XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgTWF0aC5taW4oYXJyYXlBLmxlbmd0aCwgYXJyYXlCLmxlbmd0aCk7IGkrKykge1xuICAgIGNvbnN0IHZhbCA9IG9wZXJhdG9yKGFycmF5QVtpXSwgYXJyYXlCW2ldKTtcbiAgICByZXMucHVzaCh2YWwpO1xuICB9XG4gIHJldHVybiByZXM7XG59XG5cbi8qKlxuICogR2l2ZW4gYW4gYXJyYXkgb2YgdmFsdWVzLCByZXR1cm5zIHRoZSBjb3JyZXNwb25kaW5nIGFycmF5IG9mIGxhYmVscyxcbiAqIGFzIHNwZWNpZmllZCBieSB0aGUgY2hvaWNlcyBvcmlnaW4gaW4gc2NoZW1hLlxuICpcbiAqIEBleHBvcnRcbiAqIEBwYXJhbSB7Kn0gc2NoZW1hXG4gKiBAcGFyYW0ge3N0cmluZ1tdfSB2YWx1ZXNcbiAqIEByZXR1cm4geyp9ICB7c3RyaW5nW119XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBHRVRfTEFCRUxTKHNjaGVtYTogYW55LCB2YWx1ZXM6IHN0cmluZ1tdKTogc3RyaW5nW10ge1xuICBjb25zdCBjaG9pY2VMYWJlbHMgPSBleHRyYWN0TGFiZWxzQnlTY2hlbWFDaG9pY2VzKHNjaGVtYSk7XG4gIHJldHVybiB2YWx1ZXMubWFwKHZhbCA9PiAoY2hvaWNlTGFiZWxzW3ZhbF0gIT0gbnVsbCA/IGNob2ljZUxhYmVsc1t2YWxdIDogdmFsKSk7XG59XG4iXX0=