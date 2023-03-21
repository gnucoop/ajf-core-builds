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
export function evaluateExpression(expression, context, forceFormula) {
    return createFunction(forceFormula || expression)(context);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwcmVzc2lvbi11dGlscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvbW9kZWxzL3NyYy91dGlscy9leHByZXNzaW9uLXV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUdILE9BQU8sS0FBSyxPQUFPLE1BQU0sVUFBVSxDQUFDO0FBQ3BDLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxTQUFTLENBQUM7QUFDcEMsT0FBTyxLQUFLLFNBQVMsTUFBTSxRQUFRLENBQUM7QUFJcEMsSUFBSSxXQUFXLEdBQVEsRUFBRSxDQUFDO0FBRTFCLE1BQU0sTUFBTSxHQUFHLFNBQVMsQ0FBQyxPQUFPLElBQUksU0FBUyxDQUFDO0FBWTlDLFNBQVMsT0FBTyxDQUFDLElBQWM7SUFDN0IsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksRUFBRTtRQUNyQixPQUFPLEVBQUUsQ0FBQztLQUNYO0lBQ0QsTUFBTSxJQUFJLEdBQVcsRUFBRSxDQUFDO0lBQ3hCLEtBQUssTUFBTSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtRQUMzQixNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztLQUNqQjtJQUNELE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQztBQUVELE1BQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQztBQUVwQixNQUFNLENBQUMsTUFBTSxrQkFBa0IsR0FBRyxDQUNoQyxNQUFjLEVBQ2QscUJBQThCLEtBQUssRUFDekIsRUFBRTtJQUNaLE1BQU0sV0FBVyxHQUFHLEVBQWMsQ0FBQztJQUNuQyxJQUFJO1FBQ0YsV0FBVyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsRUFBRTtZQUM3QixPQUFPLEVBQUUsQ0FBQyxLQUFL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QUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ2Y7SUFDRCxPQUFPLEdBQUcsQ0FBQztBQUNiLENBQUM7QUFFRDs7Ozs7Ozs7R0FRRztBQUNILE1BQU0sVUFBVSxVQUFVLENBQUMsTUFBVyxFQUFFLE1BQWdCO0lBQ3RELE1BQU0sWUFBWSxHQUFHLDRCQUE0QixDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzFELE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDaEYsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZDb250ZXh0fSBmcm9tICdAYWpmL2NvcmUvY29tbW9uJztcbmltcG9ydCAqIGFzIGRhdGVGbnMgZnJvbSAnZGF0ZS1mbnMnO1xuaW1wb3J0IHtwYXJzZVNjcmlwdH0gZnJvbSAnbWVyaXlhaCc7XG5pbXBvcnQgKiBhcyBudW1icm9Nb2QgZnJvbSAnbnVtYnJvJztcbmltcG9ydCB7QWpmVGFibGVDZWxsfSBmcm9tICdAYWpmL2NvcmUvdGFibGUnO1xuaW1wb3J0IHtBamZWYWxpZGF0aW9uRm59IGZyb20gJy4uL2ludGVyZmFjZS92YWxpZGF0aW9uLWZ1bmN0aW9uJztcblxubGV0IGV4ZWNDb250ZXh0OiBhbnkgPSB7fTtcblxuY29uc3QgbnVtYnJvID0gbnVtYnJvTW9kLmRlZmF1bHQgfHwgbnVtYnJvTW9kO1xuZXhwb3J0IGludGVyZmFjZSBGb3JtIHtcbiAgW2tleTogc3RyaW5nXTogc3RyaW5nIHwgbnVtYmVyIHwgbnVsbDtcbn1cbmV4cG9ydCBpbnRlcmZhY2UgSW5zdGFuY2VzIHtcbiAgW2luc3RhbmNlOiBzdHJpbmddOiBGb3JtW107XG59XG5leHBvcnQgaW50ZXJmYWNlIE1haW5Gb3JtIHtcbiAgW2tleTogc3RyaW5nXTogc3RyaW5nIHwgbnVtYmVyIHwgYm9vbGVhbiB8IG51bGwgfCBJbnN0YW5jZXMgfCB1bmRlZmluZWQgfCBudWxsO1xuICByZXBzPzogSW5zdGFuY2VzO1xufVxuXG5mdW5jdGlvbiBhbGxSZXBzKGZvcm06IE1haW5Gb3JtKTogRm9ybVtdIHtcbiAgaWYgKGZvcm0ucmVwcyA9PSBudWxsKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG4gIGNvbnN0IHJlcHM6IEZvcm1bXSA9IFtdO1xuICBmb3IgKGNvbnN0IGtleSBpbiBmb3JtLnJlcHMpIHtcbiAgICBjb25zdCByID0gZm9ybS5yZXBzW2tleV07XG4gICAgcmVwcy5wdXNoKC4uLnIpO1xuICB9XG4gIHJldHVybiByZXBzO1xufVxuXG5jb25zdCBNQVhfUkVQUyA9IDMwO1xuXG5leHBvcnQgY29uc3QgZ2V0Q29kZUlkZW50aWZpZXJzID0gKFxuICBzb3VyY2U6IHN0cmluZyxcbiAgaW5jbHVkZURvbGxhclZhbHVlOiBib29sZWFuID0gZmFsc2UsXG4pOiBzdHJpbmdbXSA9PiB7XG4gIGNvbnN0IGlkZW50aWZpZXJzID0gW10gYXMgc3RyaW5nW107XG4gIHRyeSB7XG4gICAgcGFyc2VTY3JpcHQoc291cmNlLnRvU3RyaW5nKCksIHtcbiAgICAgIG9uVG9rZW46ICh0b2tlbiwgc3RhcnQsIGVuZCkgPT4ge1xuICAgICAgICBpZiAodG9rZW4gPT0gJ0lkZW50aWZpZXInKSB7XG4gICAgICAgICAgY29uc3QgaWRlbnRpZmllciA9IHNvdXJjZS50b1N0cmluZygpLnN1YnN0cmluZyhzdGFydCwgZW5kKTtcbiAgICAgICAgICBpZiAoaW5jbHVkZURvbGxhclZhbHVlIHx8IGlkZW50aWZpZXIgIT09ICckdmFsdWUnKSB7XG4gICAgICAgICAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICB9KTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGNvbnNvbGUubG9nKHNvdXJjZSk7XG4gICAgY29uc29sZS5sb2coZSk7XG4gIH1cbiAgcmV0dXJuIGlkZW50aWZpZXJzLnNvcnQoKGkxLCBpMikgPT4gaTIubG9jYWxlQ29tcGFyZShpMSkpO1xufTtcblxuZXhwb3J0IGNvbnN0IGRhdGVVdGlscyA9IHtcbiAgYWRkRGF5czogZGF0ZUZucy5hZGREYXlzLFxuICBhZGRNb250aHM6IGRhdGVGbnMuYWRkTW9udGhzLFxuICBhZGRZZWFyczogZGF0ZUZucy5hZGRZZWFycyxcbiAgZW5kT2ZJU09XZWVrOiBkYXRlRm5zLmVuZE9mSVNPV2VlayxcbiAgZm9ybWF0OiBkYXRlRm5zLmZvcm1hdCxcbiAgZ2V0RGF5OiBkYXRlRm5zLmdldERheSxcbiAgcGFyc2U6IGRhdGVGbnMucGFyc2VJU08sXG4gIHN0YXJ0T2ZNb250aDogZGF0ZUZucy5zdGFydE9mTW9udGgsXG4gIHN0YXJ0T2ZJU09XZWVrOiBkYXRlRm5zLnN0YXJ0T2ZJU09XZWVrLFxuICBpc0JlZm9yZTogZGF0ZUZucy5pc0JlZm9yZSxcbn07XG5cbmV4cG9ydCBjbGFzcyBBamZFeHByZXNzaW9uVXRpbHMge1xuICAvLyBUT0RPIHdoYXQgaXMgaXQgZm9yXG4gIHN0YXRpYyBVVElMX0ZVTkNUSU9OUyA9ICcnO1xuICAvKipcbiAgICogSXQgaXMgYSBrZXktdmFsdWUgZGljdGlvbmFyeSwgdGhhdCBtYXBwaW5nIGFsbCBBamYgdmFsaWRhdGlvbiBmdW5jdGlvbnMuXG4gICAqL1xuICBzdGF0aWMgdXRpbHM6IHtbbmFtZTogc3RyaW5nXTogQWpmVmFsaWRhdGlvbkZufSA9IHtcbiAgICBkaWdpdENvdW50OiB7Zm46IGRpZ2l0Q291bnR9LFxuICAgIGRlY2ltYWxDb3VudDoge2ZuOiBkZWNpbWFsQ291bnR9LFxuICAgIGlzSW50OiB7Zm46IGlzSW50fSxcbiAgICBub3RFbXB0eToge2ZuOiBub3RFbXB0eX0sXG4gICAgdmFsdWVJbkNob2ljZToge2ZuOiB2YWx1ZUluQ2hvaWNlfSxcbiAgICBzY2FuR3JvdXBGaWVsZDoge2ZuOiBzY2FuR3JvdXBGaWVsZH0sXG4gICAgc3VtOiB7Zm46IHN1bX0sXG4gICAgZGF0ZU9wZXJhdGlvbnM6IHtmbjogZGF0ZU9wZXJhdGlvbnN9LFxuICAgIHJvdW5kOiB7Zm46IHJvdW5kfSxcbiAgICBleHRyYWN0QXJyYXk6IHtmbjogZXh0cmFjdEFycmF5fSxcbiAgICBleHRyYWN0U3VtOiB7Zm46IGV4dHJhY3RTdW19LFxuICAgIGV4dHJhY3RBcnJheVN1bToge2ZuOiBleHRyYWN0QXJyYXlTdW19LFxuICAgIGRyYXdUaHJlc2hvbGQ6IHtmbjogZHJhd1RocmVzaG9sZH0sXG4gICAgZXh0cmFjdERhdGVzOiB7Zm46IGV4dHJhY3REYXRlc30sXG4gICAgbGFzdFByb3BlcnR5OiB7Zm46IGxhc3RQcm9wZXJ0eX0sXG4gICAgc3VtTGFzdFByb3BlcnRpZXM6IHtmbjogc3VtTGFzdFByb3BlcnRpZXN9LFxuICAgIGNhbGN1bGF0ZVRyZW5kUHJvcGVydHk6IHtmbjogY2FsY3VsYXRlVHJlbmRQcm9wZXJ0eX0sXG4gICAgY2FsY3VsYXRlVHJlbmRCeVByb3BlcnRpZXM6IHtmbjogY2FsY3VsYXRlVHJlbmRCeVByb3BlcnRpZXN9LFxuICAgIGNhbGN1bGF0ZUF2Z1Byb3BlcnR5OiB7Zm46IGNhbGN1bGF0ZUF2Z1Byb3BlcnR5fSxcbiAgICBjYWxjdWxhdGVBdmdQcm9wZXJ0eUFycmF5OiB7Zm46IGNhbGN1bGF0ZUF2Z1Byb3BlcnR5QXJyYXl9LFxuICAgIGFsZXJ0OiB7Zm46IGFsZXJ0fSxcbiAgICBmb3JtYXROdW1iZXI6IHtmbjogZm9ybWF0TnVtYmVyfSxcbiAgICBmb3JtYXREYXRlOiB7Zm46IGZvcm1hdERhdGV9LFxuICAgIGlzb01vbnRoOiB7Zm46IGlzb01vbnRofSxcbiAgICBnZXRDb29yZGluYXRlOiB7Zm46IGdldENvb3JkaW5hdGV9LFxuICAgIE1hdGg6IHtmbjogTWF0aH0sXG4gICAgcGFyc2VJbnQ6IHtmbjogcGFyc2VJbnR9LFxuICAgIHBhcnNlRmxvYXQ6IHtmbjogcGFyc2VGbG9hdH0sXG4gICAgcGFyc2VEYXRlOiB7Zm46IGRhdGVVdGlscy5wYXJzZX0sXG4gICAgRGF0ZToge2ZuOiBEYXRlfSxcbiAgICBwbGFpbkFycmF5OiB7Zm46IHBsYWluQXJyYXl9LFxuICAgIENPVU5UX0ZPUk1TOiB7Zm46IENPVU5UX0ZPUk1TfSxcbiAgICBDT1VOVF9GT1JNU19VTklRVUU6IHtmbjogQ09VTlRfRk9STVNfVU5JUVVFfSxcbiAgICBDT1VOVF9SRVBTOiB7Zm46IENPVU5UX1JFUFN9LFxuICAgIFNVTToge2ZuOiBTVU19LFxuICAgIE1FQU46IHtmbjogTUVBTn0sXG4gICAgUEVSQ0VOVDoge2ZuOiBQRVJDRU5UfSxcbiAgICBMQVNUOiB7Zm46IExBU1R9LFxuICAgIEZJUlNUOiB7Zm46IEZJUlNUfSxcbiAgICBNQVg6IHtmbjogTUFYfSxcbiAgICBNRURJQU46IHtmbjogTUVESUFOfSxcbiAgICBNT0RFOiB7Zm46IE1PREV9LFxuICAgIEFMTF9WQUxVRVNfT0Y6IHtmbjogQUxMX1ZBTFVFU19PRn0sXG4gICAgUkVQRUFUOiB7Zm46IFJFUEVBVH0sXG4gICAgRVZBTFVBVEU6IHtmbjogRVZBTFVBVEV9LFxuICAgIElOQ0xVREVTOiB7Zm46IElOQ0xVREVTfSxcbiAgICBidWlsZERhdGFzZXQ6IHtmbjogYnVpbGREYXRhc2V0fSxcbiAgICBidWlsZEFsaWduZWREYXRhc2V0OiB7Zm46IGJ1aWxkQWxpZ25lZERhdGFzZXR9LFxuICAgIGJ1aWxkRm9ybURhdGFzZXQ6IHtmbjogYnVpbGRGb3JtRGF0YXNldH0sXG4gICAgYnVpbGRBbGlnbmVkRm9ybURhdGFzZXQ6IHtmbjogYnVpbGRBbGlnbmVkRm9ybURhdGFzZXR9LFxuICAgIGJ1aWxkV2lkZ2V0RGF0YXNldDoge2ZuOiBidWlsZFdpZGdldERhdGFzZXR9LFxuICAgIGJ1aWxkV2lkZ2V0RGF0YXNldFdpdGhEaWFsb2c6IHtmbjogYnVpbGRXaWRnZXREYXRhc2V0V2l0aERpYWxvZ30sXG4gICAgRklMVEVSX0JZX1ZBUlM6IHtmbjogRklMVEVSX0JZX1ZBUlN9LFxuICAgIEZJTFRFUl9CWToge2ZuOiBGSUxURVJfQll9LFxuICAgIElTX0JFRk9SRToge2ZuOiBJU19CRUZPUkV9LFxuICAgIElTX0FGVEVSOiB7Zm46IElTX0FGVEVSfSxcbiAgICBJU19XSVRISU5fSU5URVJWQUw6IHtmbjogSVNfV0lUSElOX0lOVEVSVkFMfSxcbiAgICBDT01QQVJFX0RBVEU6IHtmbjogQ09NUEFSRV9EQVRFfSxcbiAgICBBUFBMWToge2ZuOiBBUFBMWX0sXG4gICAgVE9EQVk6IHtmbjogVE9EQVl9LFxuICAgIEdFVF9BR0U6IHtmbjogR0VUX0FHRX0sXG4gICAgQlVJTERfREFUQVNFVDoge2ZuOiBCVUlMRF9EQVRBU0VUfSxcbiAgICBKT0lOX0ZPUk1TOiB7Zm46IEpPSU5fRk9STVN9LFxuICAgIExFTjoge2ZuOiBMRU59LFxuICAgIENPTkNBVDoge2ZuOiBDT05DQVR9LFxuICAgIFJFTU9WRV9EVVBMSUNBVEVTOiB7Zm46IFJFTU9WRV9EVVBMSUNBVEVTfSxcbiAgICBKT0lOX1JFUEVBVElOR19TTElERVM6IHtmbjogSk9JTl9SRVBFQVRJTkdfU0xJREVTfSxcbiAgICBGUk9NX1JFUFM6IHtmbjogRlJPTV9SRVBTfSxcbiAgICBJU0lOOiB7Zm46IElTSU59LFxuICAgIE9QOiB7Zm46IE9QfSxcbiAgICBHRVRfTEFCRUxTOiB7Zm46IEdFVF9MQUJFTFN9LFxuICAgIEFQUExZX0xBQkVMUzoge2ZuOiBBUFBMWV9MQUJFTFN9LFxuICAgIFJPVU5EOiB7Zm46IFJPVU5EfSxcbiAgICBDT05TT0xFX0xPRzoge2ZuOiBDT05TT0xFX0xPR30sXG4gIH07XG59XG5cbi8qKlxuICogVVRJTElUWSBGVU5DSU9OXG4gKiBUaGlzIGZ1bmN0aW9uIHByb3ZpZGUgYSBkZWVwIGNvcHkgYnVpbGRlciBvZiBhcnJheSBvZiBtYWluIGZvcm1zLlxuICogVGhhdCdzIGEgY3VzdG9tIGZ1bmN0aW9uIHJlbGF0ZWQgdG8gbWFpbmZvcm1zIHRoYXQgY2FuIGJlIGFibGUgdG8gaW5jcmVhc2UgY29weSBwZXJmb3JtYW5jZS5cbiAqXG4gKiBAcGFyYW0ge01haW5Gb3JtW119IGZvcm1zXG4gKiBAcmV0dXJuIHsqfSAge01haW5Gb3JtW119XG4gKi9cbmZ1bmN0aW9uIGNsb25lTWFpbkZvcm1zKGZvcm1zOiBNYWluRm9ybVtdKTogTWFpbkZvcm1bXSB7XG4gIGxldCByZXM6IE1haW5Gb3JtW10gPSBbXTtcbiAgZm9yIChjb25zdCBmb3JtIG9mIGZvcm1zKSB7XG4gICAgaWYgKGZvcm0gPT0gbnVsbCkge1xuICAgICAgcmVzLnB1c2goZm9ybSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgbGV0IHJlcHM6IEluc3RhbmNlcyA9IHt9O1xuICAgIGlmIChmb3JtLnJlcHMgIT0gbnVsbCkge1xuICAgICAgZm9yIChjb25zdCBrZXkgaW4gZm9ybS5yZXBzKSB7XG4gICAgICAgIHJlcHNba2V5XSA9IFsuLi5mb3JtLnJlcHNba2V5XV07XG4gICAgICB9XG4gICAgfVxuICAgIHJlcy5wdXNoKHsuLi5mb3JtLCByZXBzfSk7XG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGV2YWx1YXRlRXhwcmVzc2lvbihcbiAgZXhwcmVzc2lvbjogc3RyaW5nLFxuICBjb250ZXh0PzogQWpmQ29udGV4dCxcbiAgZm9yY2VGb3JtdWxhPzogc3RyaW5nLFxuKTogYW55IHtcbiAgcmV0dXJuIGNyZWF0ZUZ1bmN0aW9uKGZvcmNlRm9ybXVsYSB8fCBleHByZXNzaW9uKShjb250ZXh0KTtcbn1cblxudHlwZSBGdW5jID0gKGM/OiBBamZDb250ZXh0KSA9PiBhbnk7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVGdW5jdGlvbihleHByZXNzaW9uOiBzdHJpbmcpOiBGdW5jIHtcbiAgaWYgKGV4cHJlc3Npb24gPT0gbnVsbCkge1xuICAgIHJldHVybiBfID0+IG51bGw7XG4gIH1cbiAgZXhwcmVzc2lvbiA9IFN0cmluZyhleHByZXNzaW9uKTtcbiAgaWYgKGV4cHJlc3Npb24gPT09ICd0cnVlJykge1xuICAgIHJldHVybiBfID0+IHRydWU7XG4gIH1cbiAgaWYgKGV4cHJlc3Npb24gPT09ICdmYWxzZScpIHtcbiAgICByZXR1cm4gXyA9PiBmYWxzZTtcbiAgfVxuICBpZiAoL15bYS16QS1aXyRdW1xcdyRdKiQvLnRlc3QoZXhwcmVzc2lvbikpIHsgLy8gZXhwcmVzc2lvbiBpcyBhbiBpZGVudGlmaWVyXG4gICAgcmV0dXJuIGMgPT4gYyA9PSBudWxsIHx8IGNbZXhwcmVzc2lvbl0gPT09IHVuZGVmaW5lZCA/IG51bGwgOiBjW2V4cHJlc3Npb25dO1xuICB9XG4gIGlmICgvXlwiW15cIl0qXCIkLy50ZXN0KGV4cHJlc3Npb24pIHx8IC9eJ1teJ10qJyQvLnRlc3QoZXhwcmVzc2lvbikpIHtcbiAgICBsZXQgc3RyID0gZXhwcmVzc2lvbi5zbGljZSgxLCAtMSk7XG4gICAgcmV0dXJuIF8gPT4gc3RyO1xuICB9XG5cbiAgY29uc3QgYXJnTmFtZXMgPSBbLi4ubmV3IFNldChnZXRDb2RlSWRlbnRpZmllcnMoZXhwcmVzc2lvbiwgdHJ1ZSkpLmFkZCgnZXhlY0NvbnRleHQnKV07XG4gIGxldCBmdW5jOiBGdW5jdGlvbjtcbiAgdHJ5IHtcbiAgICBmdW5jID0gbmV3IEZ1bmN0aW9uKC4uLmFyZ05hbWVzLCAncmV0dXJuICcgKyBleHByZXNzaW9uKTtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIF8gPT4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIGNvbnRleHQgPT4ge1xuICAgIGNvbnN0IGFyZ1ZhbHVlcyA9IGFyZ05hbWVzLm1hcChuYW1lID0+IHtcbiAgICAgIGlmIChjb250ZXh0ICE9IG51bGwgJiYgY29udGV4dFtuYW1lXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBjb250ZXh0W25hbWVdO1xuICAgICAgfVxuICAgICAgaWYgKEFqZkV4cHJlc3Npb25VdGlscy51dGlsc1tuYW1lXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBBamZFeHByZXNzaW9uVXRpbHMudXRpbHNbbmFtZV0uZm47XG4gICAgICB9XG4gICAgICBpZiAobmFtZSA9PT0gJ2V4ZWNDb250ZXh0Jykge1xuICAgICAgICByZXR1cm4gZXhlY0NvbnRleHQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9KTtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIGZ1bmMoLi4uYXJnVmFsdWVzKTtcbiAgICB9IGNhdGNoIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH07XG59XG5cbi8qKlxuICogSXQgcmV0dXJucyB0aGUgY291bnQgb2YgZGlnaXQgaW5zaWRlIHguXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkaWdpdENvdW50KHg6IG51bWJlcik6IG51bWJlciB7XG4gIGlmIChpc05hTih4KSB8fCB0eXBlb2YgeCAhPT0gJ251bWJlcicpIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuICBpZiAoIWlzRmluaXRlKHgpKSB7XG4gICAgcmV0dXJuIEluZmluaXR5O1xuICB9XG4gIHJldHVybiB4LnRvU3RyaW5nKCkucmVwbGFjZSgvW14wLTldL2csICcnKS5sZW5ndGg7XG59XG4vKipcbiAqIEl0IGlzIGNvdW50IHRoZSBjb3VudCBvZiBkZWNpbWFsIGRpZ2l0IGluc2lkZSBzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZGVjaW1hbENvdW50KHg6IHN0cmluZyB8IG51bWJlcik6IG51bWJlciB7XG4gIGlmICh0eXBlb2YgeCA9PT0gJ3N0cmluZycpIHtcbiAgICB4ID0gcGFyc2VGbG9hdCh4KTtcbiAgfVxuICBpZiAodHlwZW9mIHggIT09ICdudW1iZXInIHx8IGlzTmFOKHgpKSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cbiAgY29uc3QgcGFydHMgPSB4LnRvU3RyaW5nKCkuc3BsaXQoJy4nKTtcbiAgcmV0dXJuIHBhcnRzLmxlbmd0aCA+IDEgPyBwYXJ0c1sxXS5sZW5ndGggOiAwO1xufVxuLyoqXG4gKiBJdCBpcyB0cnVlIGlmIHggaXMgYW4gaW50ZWdlci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzSW50KHg6IHN0cmluZyB8IG51bWJlcik6IGJvb2xlYW4ge1xuICBpZiAodHlwZW9mIHggPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIC9eLT9cXGQrJC8udGVzdCh4KTtcbiAgfVxuICBpZiAodHlwZW9mIHggPT09ICdudW1iZXInKSB7XG4gICAgcmV0dXJuIE1hdGgucm91bmQoeCkgPT09IHg7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuLyoqXG4gKiBJdCBpcyB0cnVlIGlmIHggaXMgbm90IGVtcHR5LlxuICovXG5leHBvcnQgZnVuY3Rpb24gbm90RW1wdHkoeDogYW55KTogYm9vbGVhbiB7XG4gIHJldHVybiB0eXBlb2YgeCAhPT0gJ3VuZGVmaW5lZCcgJiYgeCAhPT0gbnVsbCA/IHgudG9TdHJpbmcoKS5sZW5ndGggPiAwIDogZmFsc2U7XG59XG4vKipcbiAqIEl0IGlzIHRydWUgaWYgYXJyYXkgY29udGFpbnMgeCBvciBhcnJheSBpcyBlcXVhbCB0byB4LlxuICovXG5leHBvcnQgZnVuY3Rpb24gdmFsdWVJbkNob2ljZShhcnJheTogYW55W10sIHg6IGFueSk6IGJvb2xlYW4ge1xuICByZXR1cm4gKGFycmF5IHx8IFtdKS5pbmRleE9mKHgpID4gLTEgfHwgYXJyYXkgPT09IHg7XG59XG4vKipcbiAqIEl0IGFwcGxpZXMgY2FsbGJhY2sgZm9yIHJlcHMgdGltZXMgYW5kIGFjY3VtdWxhdGUgdGhlIHJlc3VsdCBpbiBhY2MuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzY2FuR3JvdXBGaWVsZChyZXBzOiBudW1iZXIsIGFjYzogYW55LCBjYWxsYmFjazogYW55KTogYW55IHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXBzOyBpKyspIHtcbiAgICBhY2MgPSBjYWxsYmFjayhhY2MsIGkpO1xuICB9XG4gIHJldHVybiBhY2M7XG59XG4vKipcbiAqIEl0IHJldHVybnMgdGhlIHN1bSBvZiB0aGUgYXJyYXkgdmFsdWVzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gc3VtKGFycmF5OiBhbnlbXSk6IGFueSB7XG4gIHJldHVybiBhcnJheS5yZWR1Y2UoKGEsIGIpID0+IGEgKyBiLCAwKTtcbn1cbi8qKlxuICogSXQgYXBwbGllcyBhZGQvcmVtb3ZlKG9wZXJhdGlvbikgdiAoZGF5L21vbnRoL3llYXIpcGVyaW9kIHRvIGRzdHJpbmcgYW5kIHJldHVybiBuZXcgZm9ybWF0IGRhdGUuXG4gKi9cbi8vIFRPRE8gY2hlY2sgaWYgZGVwcmVjYXRlZCBpbnN0ZWFkIHJlZmFjb3RvcmluZyBwYXJhbWV0ZXIgdHlwZVxuLy8gVE9ETyAoZFN0cmluZzogc3RyaW5nfG51bGwsIHBlcmlvZDonZGF5J3wnbW9udGgnfCd5ZWFyJyxcbi8vIFRPRE8gb3BlcmF0aW9uOiAnYWRkL3JlbW92ZScgPSAnYWRkJywgdjpudW1iZXIpXG5leHBvcnQgZnVuY3Rpb24gZGF0ZU9wZXJhdGlvbnMoZFN0cmluZzogc3RyaW5nLCBwZXJpb2Q6IHN0cmluZywgb3BlcmF0aW9uOiBzdHJpbmcsIHY6IGFueSk6IHN0cmluZyB7XG4gIGNvbnN0IGZtdCA9ICdtbS9kZC95eXl5JztcbiAgbGV0IGQgPSB0eXBlb2YgZFN0cmluZyAhPT0gJ3VuZGVmaW5lZCcgPyBkYXRlVXRpbHMucGFyc2UoZFN0cmluZykgOiBuZXcgRGF0ZSgpO1xuICBpZiAob3BlcmF0aW9uID09ICdyZW1vdmUnKSB7XG4gICAgdiA9IC12O1xuICB9XG4gIGxldCBkYXRlT3A7XG4gIHN3aXRjaCAocGVyaW9kKSB7XG4gICAgY2FzZSAnZGF5JzpcbiAgICAgIGRhdGVPcCA9IGRhdGVVdGlscy5hZGREYXlzO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnbW9udGgnOlxuICAgICAgZGF0ZU9wID0gZGF0ZVV0aWxzLmFkZE1vbnRocztcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3llYXInOlxuICAgICAgZGF0ZU9wID0gZGF0ZVV0aWxzLmFkZFllYXJzO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiAnJztcbiAgfVxuICByZXR1cm4gZGF0ZVV0aWxzLmZvcm1hdChkYXRlT3AoZCwgdiksIGZtdCk7XG59XG5cbi8qKlxuICogRml4ZWQgZGVjaW1hbHMgZm9yIGZsb2F0aW5nIG51bWJlclxuICogUmVzb2x2ZSBmbG9hdCBzdW0gcHJvYmxlbXMgbGlrZSB0aGlzOiAwLjEgKyAwLjIgPSAwLjMwMDAwMDAwMDAwMDAwMDA0XG4gKiBAcGFyYW0gbnVtXG4gKiBAcmV0dXJuc1xuICovXG5mdW5jdGlvbiB0cnVuY2F0ZTEwKG51bTogbnVtYmVyKSB7XG4gIHJldHVybiBwYXJzZUZsb2F0KG51bS50b0ZpeGVkKDEwKSk7XG59XG5cbi8qKlxuICogSXQgcm91bmRzIHRoZSBudW0gd2l0aCB0aGUgdmFsdWUgb2YgZGlnaXRzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByb3VuZChudW06IG51bWJlciB8IHN0cmluZywgZGlnaXRzPzogbnVtYmVyKTogbnVtYmVyIHtcbiAgZGlnaXRzID0gZGlnaXRzIHx8IDA7XG4gIGxldCBmO1xuICBpZiAodHlwZW9mIG51bSAhPT0gJ251bWJlcicpIHtcbiAgICB0cnkge1xuICAgICAgZiA9IHBhcnNlRmxvYXQobnVtKTtcbiAgICB9IGNhdGNoIChlKSB7fVxuICB9IGVsc2Uge1xuICAgIGYgPSBudW07XG4gIH1cbiAgaWYgKGYgPT0gbnVsbCB8fCBpc05hTihmKSkge1xuICAgIGYgPSAwO1xuICB9XG4gIGNvbnN0IG0gPSBNYXRoLnBvdygxMCwgZGlnaXRzKTtcbiAgcmV0dXJuIE1hdGgucm91bmQoZiAqIG0pIC8gbTtcbn1cbi8qKlxuICogSXQgZXh0cmFjdHMgcHJvcGVydHkgZnJvbSBzb3VyY2UuXG4gKiBmb3IgZXZlcnkgZWxlbWVudCBvZiBzb3VyY2UgaWYgcHJvcGVydHkgYW5kIHByb3BlcnR5MiBhcmUgZGVmaW5lZCByZXR1cm4gdGhlIHN1bVxuICogZWxzZSBpZiBvbmx5IHByb3BlcnR5IGlzIGRlZmluZWQgcmV0dXJuIGhpbS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGV4dHJhY3RBcnJheShzb3VyY2U6IGFueVtdLCBwcm9wZXJ0eTogc3RyaW5nLCBwcm9wZXJ0eTI/OiBzdHJpbmcpOiBhbnlbXSB7XG4gIHNvdXJjZSA9IChzb3VyY2UgfHwgW10pLmZpbHRlcigoZjogYW55KSA9PiBmICE9IG51bGwpO1xuICBjb25zdCByZXM6IGFueVtdID0gW107XG4gIGZvciAoY29uc3QgcyBvZiBzb3VyY2UpIHtcbiAgICBpZiAoc1twcm9wZXJ0eV0gIT0gbnVsbCAmJiBwcm9wZXJ0eTIgIT0gbnVsbCAmJiBzW3Byb3BlcnR5Ml0gIT0gbnVsbCkge1xuICAgICAgcmVzLnB1c2goTnVtYmVyKHNbcHJvcGVydHldKSArIE51bWJlcihzW3Byb3BlcnR5Ml0pKTtcbiAgICB9IGVsc2UgaWYgKHNbcHJvcGVydHldICE9IG51bGwpIHtcbiAgICAgIHJlcy5wdXNoKHNbcHJvcGVydHldKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cbi8qKlxuICogSXQgcmV0dXJucyB0aGUgc3VtIG9mIGFsbCBkZWZpbmVkIHByb3BlcnRpZXMgb2YgZWFjaCBlbGVtZW50IG9mIHNvdXJjZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGV4dHJhY3RTdW0oc291cmNlOiBhbnlbXSwgcHJvcGVydGllczogc3RyaW5nW10pOiBudW1iZXIge1xuICBwcm9wZXJ0aWVzID0gWy4uLihwcm9wZXJ0aWVzIHx8IFtdKV07XG5cbiAgbGV0IHN1bVZhbCA9IDA7XG4gIGZvciAoY29uc3QgcHJvcCBvZiBwcm9wZXJ0aWVzKSB7XG4gICAgY29uc3QgYXJyYXkgPSBleHRyYWN0QXJyYXkoc291cmNlLCBwcm9wKTtcbiAgICBmb3IgKGNvbnN0IGEgb2YgYXJyYXkpIHtcbiAgICAgIGlmICghaXNOYU4oTnVtYmVyKGEpKSkge1xuICAgICAgICBzdW1WYWwgKz0gTnVtYmVyKGEpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gc3VtVmFsO1xufVxuLyoqXG4gKiBJdCByZXR1cm5zIGEgbnVtYmVyIGFycmF5IHRoYXQgY29udGFpbnMgdGhlIHN1bSBvZiBwcm9wZXJ0aWVzIHZhbHVlIGluc2lkZSB0aGUgc291cmNlLlxuICogZXh0cmFjdEFycmF5U3VtKFt7YTogNX0sIHtiOiAxfSwge2E6IDUsIGI6IDF9XSwgWydhJywgJ2InXSk7ID0mZ3Q7IFs2LDZdXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBleHRyYWN0QXJyYXlTdW0oc291cmNlOiBhbnlbXSwgcHJvcGVydGllczogc3RyaW5nW10pOiBhbnlbXSB7XG4gIGNvbnN0IGFycmF5czogYW55W10gPSBbXTtcbiAgcHJvcGVydGllcyA9IFsuLi4ocHJvcGVydGllcyB8fCBbXSldO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvcGVydGllcy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGFycmF5ID0gZXh0cmFjdEFycmF5KHNvdXJjZSwgcHJvcGVydGllc1tpXSk7XG4gICAgYXJyYXlzLnB1c2goYXJyYXkpO1xuICB9XG5cbiAgY29uc3QgcmVzOiBhbnlbXSA9IFtdO1xuICBpZiAoYXJyYXlzLmxlbmd0aCA+IDApIHtcbiAgICBmb3IgKGxldCB3ZWVrSSA9IDA7IHdlZWtJIDwgYXJyYXlzWzBdLmxlbmd0aDsgd2Vla0krKykge1xuICAgICAgbGV0IHN1bVZhbCA9IDA7XG4gICAgICBmb3IgKGxldCBwcm9wSSA9IDA7IHByb3BJIDwgcHJvcGVydGllcy5sZW5ndGg7IHByb3BJKyspIHtcbiAgICAgICAgc3VtVmFsID0gc3VtVmFsICsgTnVtYmVyKGFycmF5c1twcm9wSV1bd2Vla0ldKTtcbiAgICAgIH1cbiAgICAgIHJlcy5wdXNoKHN1bVZhbCk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXM7XG59XG4vKipcbiAqIERyYXcgYSB0aHJlc2hvbGQgbGluZSBvbiBjaGFydCByZWxhdGVkIHRvIHRoZSBwcm9wZXJ0eS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRyYXdUaHJlc2hvbGQoc291cmNlOiBhbnlbXSwgcHJvcGVydHk6IHN0cmluZywgdGhyZXNob2xkOiBhbnlbXSk6IGFueVtdIHtcbiAgc291cmNlID0gKHNvdXJjZSB8fCBbXSkuZmlsdGVyKChmOiBhbnkpID0+IGYgIT0gbnVsbCk7XG4gIHRocmVzaG9sZCA9IHRocmVzaG9sZCB8fCBbMF07XG4gIGlmICghKHRocmVzaG9sZCBpbnN0YW5jZW9mIEFycmF5KSkge1xuICAgIHRocmVzaG9sZCA9IFt0aHJlc2hvbGRdO1xuICB9XG4gIGNvbnN0IGwgPSBzb3VyY2UubGVuZ3RoO1xuICBjb25zdCByZXM6IGFueVtdID0gW107XG4gIGxldCBjb3VudCA9IDA7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbDsgaSsrKSB7XG4gICAgaWYgKHNvdXJjZVtpXVtwcm9wZXJ0eV0gIT0gbnVsbCkge1xuICAgICAgaWYgKHRocmVzaG9sZC5sZW5ndGggPiBjb3VudCkge1xuICAgICAgICByZXMucHVzaCh0aHJlc2hvbGRbY291bnRdKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlcy5wdXNoKHRocmVzaG9sZFswXSk7XG4gICAgICB9XG4gICAgICBjb3VudCsrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzO1xufVxuLyoqXG4gKiBFeHRyYWN0IHRoZSBkYXRlcyBvZiB0aGUgc291cmNlIG9iamVjdCB3aXRoIHByb3BlcnR5ICE9IG51bGxcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGV4dHJhY3REYXRlcyhzb3VyY2U6IGFueVtdLCBwcm9wZXJ0eTogc3RyaW5nLCBmbXQ6IHN0cmluZyk6IHN0cmluZ1tdIHtcbiAgc291cmNlID0gKHNvdXJjZSB8fCBbXSkuZmlsdGVyKChmOiBhbnkpID0+IGYgIT0gbnVsbCk7XG4gIGNvbnN0IGwgPSBzb3VyY2UubGVuZ3RoO1xuICBjb25zdCByZXM6IGFueSA9IFtdO1xuICBsZXQgcHJlZml4ID0gJyc7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbDsgaSsrKSB7XG4gICAgaWYgKHNvdXJjZVtpXVtwcm9wZXJ0eV0gIT0gbnVsbCkge1xuICAgICAgc3dpdGNoIChmbXQpIHtcbiAgICAgICAgY2FzZSAnV1cnOlxuICAgICAgICBjYXNlICd3dyc6XG4gICAgICAgICAgcHJlZml4ID0gJ1cnO1xuICAgICAgICAgIHJlcy5wdXNoKHByZWZpeCArIGZvcm1hdERhdGUoc291cmNlW2ldWydkYXRlX3N0YXJ0J10sIGZtdCkpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdNTSc6XG4gICAgICAgIGNhc2UgJ21tJzpcbiAgICAgICAgICBwcmVmaXggPSAnTSc7XG4gICAgICAgICAgcmVzLnB1c2gocHJlZml4ICsgaXNvTW9udGgoc291cmNlW2ldWydkYXRlX3N0YXJ0J10sIGZtdCkpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHByZWZpeCA9ICcnO1xuICAgICAgICAgIHJlcy5wdXNoKHByZWZpeCArIGZvcm1hdERhdGUoc291cmNlW2ldWydkYXRlX3N0YXJ0J10sIGZtdCkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzO1xufVxuLyoqXG4gKiBFeHRyYWN0IHRoZSBsYXN0IHByb3BlcnR5IGNvbnRhaW5zIGluIHNvdXJjZSAhPSBudWxsXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBsYXN0UHJvcGVydHkoc291cmNlOiBhbnksIHByb3BlcnR5OiBzdHJpbmcpOiBhbnkge1xuICBzb3VyY2UgPSAoc291cmNlIHx8IFtdKS5maWx0ZXIoKGY6IGFueSkgPT4gZiAhPSBudWxsKTtcbiAgbGV0IGwgPSBzb3VyY2UubGVuZ3RoIC0gMTtcblxuICB3aGlsZSAobCA+PSAwICYmIHNvdXJjZVtsXVtwcm9wZXJ0eV0gPT0gbnVsbCkge1xuICAgIGwtLTtcbiAgICBpZiAobCA8IDApIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGwgPj0gMCA/IHNvdXJjZVtsXVtwcm9wZXJ0eV0gOiAnJztcbn1cbi8qKlxuICogSXQgc3VtIHRoZSBMQXN0IHByb3BlcnRpZXMgb2Ygc291cmNlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gc3VtTGFzdFByb3BlcnRpZXMoc291cmNlOiBhbnlbXSwgcHJvcGVydGllczogc3RyaW5nW10pOiBudW1iZXIge1xuICBzb3VyY2UgPSAoc291cmNlIHx8IFtdKS5maWx0ZXIoKGY6IGFueSkgPT4gZiAhPSBudWxsKTtcbiAgbGV0IHN1bVZhbCA9IDA7XG4gIGxldCB2YWwgPSAwO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHByb3BlcnRpZXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YWwgPSBOdW1iZXIobGFzdFByb3BlcnR5KHNvdXJjZSwgcHJvcGVydGllc1tpXSkpO1xuICAgIGlmICghaXNOYU4odmFsKSkge1xuICAgICAgc3VtVmFsICs9IHZhbDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHN1bVZhbDtcbn1cbi8qKlxuICogQ29tcHV0ZSB0aGUgdHJlbmQgb2YgdGhlIHByb3BlcnR5IGNvbnRhaW5lZCBvbiB0aGUgc291cmNlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gY2FsY3VsYXRlVHJlbmRQcm9wZXJ0eShzb3VyY2U6IGFueVtdLCBwcm9wZXJ0eTogc3RyaW5nKTogc3RyaW5nIHtcbiAgc291cmNlID0gKHNvdXJjZSB8fCBbXSkuZmlsdGVyKChmOiBhbnkpID0+IGYgIT0gbnVsbCk7XG4gIGxldCBsYXN0ID0gc291cmNlLmxlbmd0aCAtIDE7XG4gIHdoaWxlIChzb3VyY2VbbGFzdF1bcHJvcGVydHldID09IG51bGwpIHtcbiAgICBpZiAobGFzdCA9PSAwKSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgbGFzdC0tO1xuICB9XG4gIGxldCBsYXN0TGFzdCA9IGxhc3QgLSAxO1xuICBpZiAobGFzdCA9PSAwKSB7XG4gICAgbGFzdExhc3QgPSBsYXN0O1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzb3VyY2VbbGFzdExhc3RdW3Byb3BlcnR5XSA9PSBudWxsKSB7XG4gICAgICBpZiAobGFzdExhc3QgPT0gMCkge1xuICAgICAgICBsYXN0TGFzdCA9IGxhc3Q7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgbGFzdExhc3QtLTtcbiAgICB9XG4gIH1cblxuICBjb25zdCBsYXN0UHJvcCA9IHNvdXJjZVtsYXN0XSA/IHNvdXJjZVtsYXN0XVtwcm9wZXJ0eV0gfHwgMCA6IDA7XG4gIGNvbnN0IGxhc3RMYXN0UHJvcCA9IHNvdXJjZVtsYXN0TGFzdF0gPyBzb3VyY2VbbGFzdExhc3RdW3Byb3BlcnR5XSB8fCAwIDogMDtcblxuICBpZiAobGFzdFByb3AgPT0gbGFzdExhc3RQcm9wKSB7XG4gICAgcmV0dXJuICc8cD48aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCIgc3R5bGU9XCJjb2xvcjpibHVlXCI+dHJlbmRpbmdfZmxhdDwvaT48L3A+JztcbiAgfSBlbHNlIGlmIChsYXN0UHJvcCA+IGxhc3RMYXN0UHJvcCkge1xuICAgIHJldHVybiAnPHA+PGkgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiIHN0eWxlPVwiY29sb3I6Z3JlZW5cIj50cmVuZGluZ191cDwvaT48L3A+JztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gJzxwPjxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIiBzdHlsZT1cImNvbG9yOnJlZFwiPnRyZW5kaW5nX2Rvd248L2k+PC9wPic7XG4gIH1cbn1cbi8qKlxuICogQ29tcHV0ZSB0aGUgYXZlcmFnZSB2YWx1ZSBvZiB0aGUgcHJvcGVydHkgY29udGFpbmVkIG9uIHRoZSBzb3VyY2UuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjYWxjdWxhdGVUcmVuZEJ5UHJvcGVydGllcyhzb3VyY2U6IGFueVtdLCBwcm9wZXJ0aWVzOiBzdHJpbmdbXSk6IHN0cmluZyB7XG4gIGNvbnN0IGFycmF5c3VtID0gZXh0cmFjdEFycmF5U3VtKHNvdXJjZSwgcHJvcGVydGllcyk7XG5cbiAgY29uc3QgbGFzdFByb3AgPSBhcnJheXN1bS5sZW5ndGggPiAwID8gYXJyYXlzdW1bYXJyYXlzdW0ubGVuZ3RoIC0gMV0gfHwgMCA6IDA7XG4gIGNvbnN0IGxhc3RMYXN0UHJvcCA9IGFycmF5c3VtLmxlbmd0aCA+IDEgPyBhcnJheXN1bVthcnJheXN1bS5sZW5ndGggLSAyXSB8fCAwIDogbGFzdFByb3A7XG5cbiAgaWYgKGxhc3RQcm9wID09IGxhc3RMYXN0UHJvcCkge1xuICAgIHJldHVybiAnPHA+PGkgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiIHN0eWxlPVwiY29sb3I6Ymx1ZVwiPnRyZW5kaW5nX2ZsYXQ8L2k+PC9wPic7XG4gIH0gZWxzZSBpZiAobGFzdFByb3AgPiBsYXN0TGFzdFByb3ApIHtcbiAgICByZXR1cm4gJzxwPjxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIiBzdHlsZT1cImNvbG9yOmdyZWVuXCI+dHJlbmRpbmdfdXA8L2k+PC9wPic7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuICc8cD48aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCIgc3R5bGU9XCJjb2xvcjpyZWRcIj50cmVuZGluZ19kb3duPC9pPjwvcD4nO1xuICB9XG59XG4vKipcbiAqXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjYWxjdWxhdGVBdmdQcm9wZXJ0eShcbiAgc291cmNlOiBhbnlbXSxcbiAgcHJvcGVydHk6IHN0cmluZyxcbiAgcmFuZ2U6IG51bWJlcixcbiAgY29lZmZpY2llbnQ6IG51bWJlcixcbik6IG51bWJlciB7XG4gIHNvdXJjZSA9IChzb3VyY2UgfHwgW10pLmZpbHRlcigoZjogYW55KSA9PiBmICE9IG51bGwpO1xuXG4gIGNvZWZmaWNpZW50ID0gY29lZmZpY2llbnQgfHwgMTtcbiAgcmFuZ2UgPSByYW5nZSB8fCAxMjtcblxuICBsZXQgbCA9IHNvdXJjZS5sZW5ndGg7XG4gIGxldCByZXMgPSAwO1xuICBsZXQgY291bnRlciA9IDA7XG4gIGxldCBub1plcm8gPSAwO1xuXG4gIGlmIChsIDwgcmFuZ2UpIHtcbiAgICByYW5nZSA9IGw7XG4gIH1cblxuICB3aGlsZSAocmFuZ2UgIT0gMCkge1xuICAgIGlmIChzb3VyY2VbbCAtIDFdW3Byb3BlcnR5XSAhPSBudWxsKSB7XG4gICAgICBjb3VudGVyKys7XG4gICAgICByZXMgKz0gTnVtYmVyKHNvdXJjZVtsIC0gMV1bcHJvcGVydHldKTtcblxuICAgICAgaWYgKHNvdXJjZVtsIC0gMV1bcHJvcGVydHldID4gMCkge1xuICAgICAgICBub1plcm8rKztcbiAgICAgIH1cbiAgICB9XG4gICAgbC0tO1xuICAgIHJhbmdlLS07XG4gIH1cblxuICBpZiAoY29lZmZpY2llbnQgPT0gMCkge1xuICAgIHJldHVybiBub1plcm87XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHJvdW5kKChyZXMgLyBjb3VudGVyKSAqIGNvZWZmaWNpZW50LCAyKSB8fCAwO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjYWxjdWxhdGVBdmdQcm9wZXJ0eUFycmF5KFxuICBzb3VyY2U6IGFueVtdLFxuICBwcm9wZXJ0aWVzOiBzdHJpbmdbXSxcbiAgcmFuZ2U6IG51bWJlcixcbiAgY29lZmZpY2llbnQ6IG51bWJlcixcbik6IG51bWJlcltdIHtcbiAgc291cmNlID0gKHNvdXJjZSB8fCBbXSkuZmlsdGVyKChmOiBhbnkpID0+IGYgIT0gbnVsbCk7XG4gIGNvbnN0IHJlc0FycjogYW55W10gPSBbXTtcblxuICBpZiAocHJvcGVydGllcyAmJiBwcm9wZXJ0aWVzLmxlbmd0aCA+IDApIHtcbiAgICBsZXQgYXZnID0gMDtcblxuICAgIGNvZWZmaWNpZW50ID0gY29lZmZpY2llbnQgfHwgMTtcbiAgICByYW5nZSA9IHJhbmdlIHx8IDEyO1xuXG4gICAgY29uc3Qgc291cmNlQXJyID1cbiAgICAgIHByb3BlcnRpZXMubGVuZ3RoID4gMVxuICAgICAgICA/IGV4dHJhY3RBcnJheVN1bShzb3VyY2UsIHByb3BlcnRpZXMpXG4gICAgICAgIDogZXh0cmFjdEFycmF5KHNvdXJjZSwgcHJvcGVydGllc1swXSk7XG5cbiAgICBsZXQgbCA9IHNvdXJjZUFyci5sZW5ndGg7XG5cbiAgICBmb3IgKGxldCBsZW4gPSBsOyBsZW4gPiAwOyBsZW4tLSkge1xuICAgICAgbGV0IHJlcyA9IDA7XG4gICAgICBsZXQgY291bnRlciA9IDA7XG4gICAgICBsZXQgbm9aZXJvID0gMDtcblxuICAgICAgaWYgKGxlbiA8IHJhbmdlKSB7XG4gICAgICAgIHJhbmdlID0gbGVuO1xuICAgICAgfVxuXG4gICAgICBmb3IgKGxldCByID0gMTsgciA8PSByYW5nZTsgcisrKSB7XG4gICAgICAgIGxldCB2YWwgPSBzb3VyY2VBcnJbbGVuIC0gcl07XG4gICAgICAgIGlmICh2YWwgIT0gbnVsbCkge1xuICAgICAgICAgIGNvdW50ZXIrKztcbiAgICAgICAgICByZXMgKz0gTnVtYmVyKHZhbCk7XG4gICAgICAgICAgaWYgKHZhbCA+IDApIHtcbiAgICAgICAgICAgIG5vWmVybysrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoY291bnRlciA+IDApIHtcbiAgICAgICAgaWYgKGNvZWZmaWNpZW50ID09IDApIHtcbiAgICAgICAgICBhdmcgPSBub1plcm87XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYXZnID0gKHJlcyAvIGNvdW50ZXIpICogY29lZmZpY2llbnQgfHwgMDtcbiAgICAgICAgfVxuICAgICAgICByZXNBcnIucHVzaChyb3VuZChhdmcsIDIpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc0Fyci5yZXZlcnNlKCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhbGVydChzb3VyY2U6IGFueVtdLCBwcm9wZXJ0eTogc3RyaW5nLCB0aHJlc2hvbGQ6IG51bWJlcik6IHN0cmluZyB7XG4gIHNvdXJjZSA9IFsuLi4oc291cmNlIHx8IFtdKV07XG5cbiAgaWYgKGxhc3RQcm9wZXJ0eShzb3VyY2UsIHByb3BlcnR5KSA+IHRocmVzaG9sZCkge1xuICAgIHJldHVybiAnPHA+PGkgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiIHN0eWxlPVwiY29sb3I6cmVkXCI+d2FybmluZzwvaT48L3A+JztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gJzxwPjwvcD4nO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXROdW1iZXIobnVtOiBudW1iZXIsIGZtdD86IHN0cmluZyk6IHN0cmluZyB7XG4gIGZtdCA9IGZtdCB8fCAnMCwwWy5dMCc7XG4gIHJldHVybiBudW1icm8obnVtKS5mb3JtYXQoZm10KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdERhdGUoZGF0ZTogRGF0ZSB8IHN0cmluZywgZm10Pzogc3RyaW5nKTogc3RyaW5nIHtcbiAgZm10ID0gZm10IHx8ICdtbS1ERC15eXl5JztcbiAgcmV0dXJuIGRhdGVVdGlscy5mb3JtYXQodHlwZW9mIGRhdGUgPT09ICdzdHJpbmcnID8gZGF0ZVV0aWxzLnBhcnNlKGRhdGUpIDogZGF0ZSwgZm10KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzb01vbnRoKGRhdGU6IERhdGUsIGZtdD86IHN0cmluZyk6IHN0cmluZyB7XG4gIGZtdCA9IGZtdCB8fCAnbW0nO1xuICBjb25zdCBkdSA9IGRhdGVVdGlscztcbiAgcmV0dXJuIGR1LmZvcm1hdChkdS5hZGREYXlzKGR1LnN0YXJ0T2ZJU09XZWVrKGRhdGUpLCAzKSwgZm10KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldENvb3JkaW5hdGUoc291cmNlOiBhbnksIHpvb20/OiBudW1iZXIpOiBbbnVtYmVyLCBudW1iZXIsIG51bWJlcl0ge1xuICB6b29tID0gem9vbSB8fCA2O1xuICBpZiAoc291cmNlID09IG51bGwpIHtcbiAgICByZXR1cm4gWzUxLjUwNSwgLTAuMDksIHpvb21dO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBbc291cmNlWzBdLCBzb3VyY2VbMV0sIHpvb21dO1xuICB9XG59XG5cbi8qKlxuICogUmV0dXJucyBhbiBhcnJheSBjb250YWluaW5nIGFsbCB0aGUgdmFsdWVzIHRoYXQgdGhlIHNwZWNpZmllZCBmaWVsZCB0YWtlcyBpbiB0aGUgZm9ybXMuXG4gKiBUaGUgdmFsdWVzIGFyZSBjb252ZXJ0ZWQgdG8gc3RyaW5ncy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIEFMTF9WQUxVRVNfT0YoZm9ybXM6IE1haW5Gb3JtW10sIGZpZWxkOiBzdHJpbmcsIGZpbHRlcjogRnVuY3xzdHJpbmcgPSAndHJ1ZScpOiBzdHJpbmdbXSB7XG4gIGZvcm1zID0gKGZvcm1zIHx8IFtdKS5maWx0ZXIoZiA9PiBmICE9IG51bGwpO1xuICBpZiAodHlwZW9mKGZpbHRlcikgPT09ICdzdHJpbmcnKSB7XG4gICAgZmlsdGVyID0gY3JlYXRlRnVuY3Rpb24oZmlsdGVyKTtcbiAgfVxuICBsZXQgdmFsdWVzOiBzdHJpbmdbXSA9IFtdO1xuICBmb3IgKGNvbnN0IGZvcm0gb2YgZm9ybXMpIHtcbiAgICBpZiAoZm9ybVtmaWVsZF0gIT0gbnVsbCAmJiBmaWx0ZXIoZm9ybSkpIHtcbiAgICAgIHZhbHVlcy5wdXNoKFN0cmluZyhmb3JtW2ZpZWxkXSkpO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IHJlcCBvZiBhbGxSZXBzKGZvcm0pKSB7XG4gICAgICBpZiAocmVwW2ZpZWxkXSAhPSBudWxsICYmIGZpbHRlcih7Li4uZm9ybSwgLi4ucmVwfSkpIHtcbiAgICAgICAgdmFsdWVzLnB1c2goU3RyaW5nKHJlcFtmaWVsZF0pKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIFsuLi5uZXcgU2V0KHZhbHVlcyldO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcGxhaW5BcnJheShwYXJhbXM6IGFueVtdKTogYW55W10ge1xuICBjb25zdCByZXM6IGFueVtdID0gW107XG4gIGZvciAoY29uc3QgcGFyYW0gb2YgcGFyYW1zKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkocGFyYW0pKSB7XG4gICAgICByZXMucHVzaCguLi5wYXJhbSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlcy5wdXNoKHBhcmFtKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBudW1iZXIgb2YgZm9ybXMgZm9yIHdoaWNoIGZpbHRlciBldmFsdWF0ZXMgdG8gdHJ1ZSxcbiAqIGZvciB0aGUgZm9ybSBpdHNlbGYgb3IgZm9yIGFueSBvZiBpdHMgcmVwZXRpdGlvbnMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBDT1VOVF9GT1JNUyhmb3JtczogTWFpbkZvcm1bXSwgZmlsdGVyOiBGdW5jfHN0cmluZyA9ICd0cnVlJyk6IG51bWJlciB7XG4gIGZvcm1zID0gKGZvcm1zIHx8IFtdKS5maWx0ZXIoZiA9PiBmICE9IG51bGwpO1xuICBpZiAoZmlsdGVyID09PSAndHJ1ZScpIHtcbiAgICByZXR1cm4gZm9ybXMubGVuZ3RoO1xuICB9XG4gIGlmICh0eXBlb2YoZmlsdGVyKSA9PT0gJ3N0cmluZycpIHtcbiAgICBmaWx0ZXIgPSBjcmVhdGVGdW5jdGlvbihmaWx0ZXIpO1xuICB9XG4gIGxldCBjb3VudCA9IDA7XG4gIGZvciAoY29uc3QgZm9ybSBvZiBmb3Jtcykge1xuICAgIGlmIChmaWx0ZXIoZm9ybSkpIHtcbiAgICAgIGNvdW50Kys7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgZm9yIChjb25zdCByZXAgb2YgYWxsUmVwcyhmb3JtKSkge1xuICAgICAgaWYgKGZpbHRlcih7Li4uZm9ybSwgLi4ucmVwfSkpIHtcbiAgICAgICAgY291bnQrKztcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBjb3VudDtcbn1cblxuLyoqXG4gKiBDb3VudHMgdGhlIGZvcm1zIGFuZCBhbGwgb2YgdGhlaXIgcmVwZXRpdGlvbnMgZm9yIHdoaWNoIGZpbHRlciBldmFsdWF0ZXMgdG8gdHJ1ZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIENPVU5UX1JFUFMoZm9ybXM6IE1haW5Gb3JtW10sIGZpbHRlcjogRnVuY3xzdHJpbmcgPSAndHJ1ZScpOiBudW1iZXIge1xuICBmb3JtcyA9IChmb3JtcyB8fCBbXSkuZmlsdGVyKGYgPT4gZiAhPSBudWxsKTtcbiAgaWYgKHR5cGVvZihmaWx0ZXIpID09PSAnc3RyaW5nJykge1xuICAgIGZpbHRlciA9IGNyZWF0ZUZ1bmN0aW9uKGZpbHRlcik7XG4gIH1cbiAgbGV0IGNvdW50ID0gMDtcbiAgZm9yIChjb25zdCBmb3JtIG9mIGZvcm1zKSB7XG4gICAgaWYgKGZpbHRlcihmb3JtKSkge1xuICAgICAgY291bnQrKztcbiAgICB9XG4gICAgZm9yIChjb25zdCByZXAgb2YgYWxsUmVwcyhmb3JtKSkge1xuICAgICAgaWYgKGZpbHRlcih7Li4uZm9ybSwgLi4ucmVwfSkpIHtcbiAgICAgICAgY291bnQrKztcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIGNvdW50O1xufVxuXG4vKipcbiAqIERlcHJlY2F0ZWQuIFVzZSBMRU4oQUxMX1ZBTFVFU19PRilcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIENPVU5UX0ZPUk1TX1VOSVFVRShmb3JtczogTWFpbkZvcm1bXSwgZmllbGQ6IHN0cmluZywgZmlsdGVyOiBGdW5jfHN0cmluZyA9ICd0cnVlJyk6IG51bWJlciB7XG4gIHJldHVybiBBTExfVkFMVUVTX09GKGZvcm1zLCBmaWVsZCwgZmlsdGVyKS5sZW5ndGg7XG59XG5cbmZ1bmN0aW9uIGdldE51bWVyaWNWYWx1ZXMoZm9ybXM6IChNYWluRm9ybSB8IEZvcm0pW10sIGZpZWxkOiBzdHJpbmcsIGZpbHRlcjogRnVuY3xzdHJpbmcgPSAndHJ1ZScpOiBudW1iZXJbXSB7XG4gIGZvcm1zID0gKGZvcm1zIHx8IFtdKS5maWx0ZXIoZiA9PiBmICE9IG51bGwpO1xuICBpZiAodHlwZW9mKGZpbHRlcikgPT09ICdzdHJpbmcnKSB7XG4gICAgZmlsdGVyID0gY3JlYXRlRnVuY3Rpb24oZmlsdGVyKTtcbiAgfVxuICBsZXQgdmFsdWVzOiBudW1iZXJbXSA9IFtdO1xuICBmb3IgKGNvbnN0IGZvcm0gb2YgZm9ybXMpIHtcbiAgICBjb25zdCB2YWwgPSBmb3JtW2ZpZWxkXTtcbiAgICBpZiAodmFsICE9IG51bGwgJiYgIWlzTmFOKE51bWJlcih2YWwpKSAmJiBmaWx0ZXIoZm9ybSkpIHtcbiAgICAgIHZhbHVlcy5wdXNoKE51bWJlcih2YWwpKTtcbiAgICB9XG4gICAgZm9yIChjb25zdCByZXAgb2YgYWxsUmVwcyhmb3JtKSkge1xuICAgICAgY29uc3QgdmFsID0gcmVwW2ZpZWxkXTtcbiAgICAgIGlmICh2YWwgIT0gbnVsbCAmJiAhaXNOYU4oTnVtYmVyKHZhbCkpICYmIGZpbHRlcih7Li4uZm9ybSwgLi4ucmVwfSkpIHtcbiAgICAgICAgdmFsdWVzLnB1c2goTnVtYmVyKHZhbCkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gdmFsdWVzO1xufVxuXG4vKipcbiAqIEFnZ3JlZ2F0ZXMgYW5kIHN1bXMgdGhlIHZhbHVlcyBvZiB0aGUgc3BlY2lmaWVkIGZpZWxkLlxuICogQW4gb3B0aW9uYWwgZXhwcmVzc2lvbiBjYW4gYmUgYWRkZWQgdG8gZmlsdGVyIHdoaWNoIGZvcm1zIHRvIHRha2UgZm9yIHRoZSBzdW0uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBTVU0oZm9ybXM6IChNYWluRm9ybSB8IEZvcm0pW10sIGZpZWxkOiBzdHJpbmcsIGZpbHRlcjogRnVuY3xzdHJpbmcgPSAndHJ1ZScpOiBudW1iZXIge1xuICBjb25zdCB2YWx1ZXMgPSBnZXROdW1lcmljVmFsdWVzKGZvcm1zLCBmaWVsZCwgZmlsdGVyKTtcbiAgbGV0IHN1bSA9IDA7XG4gIGZvciAoY29uc3QgdmFsIG9mIHZhbHVlcykge1xuICAgIHN1bSArPSB2YWw7XG4gIH1cbiAgcmV0dXJuIHRydW5jYXRlMTAoc3VtKTtcbn1cblxuLyoqXG4gKiBDb21wdXRlcyB0aGUgbWVhbiBvZiB0aGUgdmFsdWVzIG9mIHRoZSBzcGVjaWZpZWQgZmllbGQuXG4gKiBBbiBvcHRpb25hbCBleHByZXNzaW9uIGNhbiBiZSBhZGRlZCB0byBmaWx0ZXIgd2hpY2ggZm9ybXMgdG8gdGFrZSBmb3IgdGhlIHN1bS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIE1FQU4oZm9ybXM6IChGb3JtIHwgTWFpbkZvcm0pW10sIGZpZWxkOiBzdHJpbmcsIGZpbHRlcjogRnVuY3xzdHJpbmcgPSAndHJ1ZScpOiBudW1iZXIge1xuICBjb25zdCB2YWx1ZXMgPSBnZXROdW1lcmljVmFsdWVzKGZvcm1zLCBmaWVsZCwgZmlsdGVyKTtcbiAgbGV0IHN1bSA9IDA7XG4gIGZvciAoY29uc3QgdmFsIG9mIHZhbHVlcykge1xuICAgIHN1bSArPSB2YWw7XG4gIH1cbiAgcmV0dXJuIHRydW5jYXRlMTAoc3VtIC8gdmFsdWVzLmxlbmd0aCk7XG59XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgJSBiZXR3ZWVuIHR3byBtZW1iZXJzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gUEVSQ0VOVCh2YWx1ZTE6IG51bWJlciwgdmFsdWUyOiBudW1iZXIpOiBzdHJpbmcge1xuICBjb25zdCByZXMgPSAoK3ZhbHVlMSAqIDEwMCkgLyArdmFsdWUyO1xuICByZXR1cm4gTnVtYmVyLmlzRmluaXRlKHJlcykgPyBNYXRoLnJvdW5kKHJlcykrJyUnIDogJ2luZmluaXRlJztcbn1cblxuLyoqXG4gKiBFdmFsdWF0ZXMgdGhlIGV4cHJlc3Npb24gaW4gdGhlIGZpcnN0IGZvcm0gYnkgZGF0ZS5cbiAqL1xuIGV4cG9ydCBmdW5jdGlvbiBGSVJTVChmb3JtczogKEZvcm0gfCBNYWluRm9ybSlbXSwgZXhwcmVzc2lvbjogRnVuY3xzdHJpbmcsIGRhdGUgPSAnY3JlYXRlZF9hdCcpOiBhbnkge1xuICBpZiAodHlwZW9mKGV4cHJlc3Npb24pID09PSAnc3RyaW5nJykge1xuICAgIGV4cHJlc3Npb24gPSBjcmVhdGVGdW5jdGlvbihleHByZXNzaW9uKTtcbiAgfVxuICBmb3JtcyA9IChmb3JtcyB8fCBbXSkuZmlsdGVyKGYgPT4gZiAhPSBudWxsKS5zb3J0KChhLCBiKSA9PiB7XG4gICAgY29uc3QgZGF0ZUEgPSBuZXcgRGF0ZShiW2RhdGVdIGFzIHN0cmluZykuZ2V0VGltZSgpO1xuICAgIGNvbnN0IGRhdGVCID0gbmV3IERhdGUoYVtkYXRlXSBhcyBzdHJpbmcpLmdldFRpbWUoKTtcbiAgICByZXR1cm4gZGF0ZUEgLSBkYXRlQjtcbiAgfSk7XG4gIGlmIChmb3Jtcy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG4gIHJldHVybiBleHByZXNzaW9uKGZvcm1zWzBdKTtcbn1cblxuLyoqXG4gKiBFdmFsdWF0ZXMgdGhlIGV4cHJlc3Npb24gaW4gdGhlIGxhc3QgZm9ybSBieSBkYXRlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gTEFTVChmb3JtczogKEZvcm0gfCBNYWluRm9ybSlbXSwgZXhwcmVzc2lvbjogRnVuY3xzdHJpbmcsIGRhdGUgPSAnY3JlYXRlZF9hdCcpOiBhbnkge1xuICBpZiAodHlwZW9mKGV4cHJlc3Npb24pID09PSAnc3RyaW5nJykge1xuICAgIGV4cHJlc3Npb24gPSBjcmVhdGVGdW5jdGlvbihleHByZXNzaW9uKTtcbiAgfVxuICBmb3JtcyA9IChmb3JtcyB8fCBbXSkuZmlsdGVyKGYgPT4gZiAhPSBudWxsKS5zb3J0KChhLCBiKSA9PiB7XG4gICAgY29uc3QgZGF0ZUEgPSBuZXcgRGF0ZShiW2RhdGVdIGFzIHN0cmluZykuZ2V0VGltZSgpO1xuICAgIGNvbnN0IGRhdGVCID0gbmV3IERhdGUoYVtkYXRlXSBhcyBzdHJpbmcpLmdldFRpbWUoKTtcbiAgICByZXR1cm4gZGF0ZUEgLSBkYXRlQjtcbiAgfSk7XG4gIGlmIChmb3Jtcy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG4gIHJldHVybiBleHByZXNzaW9uKGZvcm1zW2Zvcm1zLmxlbmd0aCAtIDFdKTtcbn1cblxuLyoqXG4gKiBDb21wdXRlcyB0aGUgbWF4IHZhbHVlIG9mIHRoZSBmaWVsZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIE1BWChmb3JtczogKEZvcm0gfCBNYWluRm9ybSlbXSwgZmllbGQ6IHN0cmluZywgZmlsdGVyOiBGdW5jfHN0cmluZyA9ICd0cnVlJyk6IG51bWJlciB7XG4gIGNvbnN0IHZhbHVlcyA9IGdldE51bWVyaWNWYWx1ZXMoZm9ybXMsIGZpZWxkLCBmaWx0ZXIpO1xuICBsZXQgbWF4ID0gLUluZmluaXR5O1xuICBmb3IgKGNvbnN0IHZhbCBvZiB2YWx1ZXMpIHtcbiAgICBpZiAodmFsID4gbWF4KSB7XG4gICAgICBtYXggPSB2YWw7XG4gICAgfVxuICB9XG4gIHJldHVybiBtYXg7XG59XG5cbi8qKlxuICogQ29tcHV0ZXMgdGhlIG1lZGlhbiB2YWx1ZSBvZiB0aGUgZmllbGQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBNRURJQU4oZm9ybXM6IChGb3JtIHwgTWFpbkZvcm0pW10sIGZpZWxkOiBzdHJpbmcsIGZpbHRlcjogRnVuY3xzdHJpbmcgPSAndHJ1ZScpOiBudW1iZXIge1xuICBjb25zdCB2YWx1ZXMgPSBnZXROdW1lcmljVmFsdWVzKGZvcm1zLCBmaWVsZCwgZmlsdGVyKS5zb3J0KCk7XG4gIGlmICh2YWx1ZXMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIE5hTjtcbiAgfVxuICByZXR1cm4gdmFsdWVzW01hdGguZmxvb3IodmFsdWVzLmxlbmd0aCAvIDIpXTtcbn1cblxuLyoqXG4gKiBDb21wdXRlcyB0aGUgbW9kZSB2YWx1ZSBvZiB0aGUgZmllbGQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBNT0RFKGZvcm1zOiAoRm9ybSB8IE1haW5Gb3JtKVtdLCBmaWVsZDogc3RyaW5nLCBmaWx0ZXI6IEZ1bmN8c3RyaW5nID0gJ3RydWUnKTogbnVtYmVyIHtcbiAgY29uc3QgdmFsdWVzID0gZ2V0TnVtZXJpY1ZhbHVlcyhmb3JtcywgZmllbGQsIGZpbHRlcik7XG4gIGNvbnN0IGNvdW50ZXJzOiB7W3ZhbDogbnVtYmVyXTogbnVtYmVyfSA9IHt9O1xuICBmb3IgKGNvbnN0IHZhbCBvZiB2YWx1ZXMpIHtcbiAgICBpZiAoY291bnRlcnNbdmFsXSA9PSBudWxsKSB7XG4gICAgICBjb3VudGVyc1t2YWxdID0gMTtcbiAgICB9IGVsc2Uge1xuICAgICAgY291bnRlcnNbdmFsXSsrO1xuICAgIH1cbiAgfVxuICBsZXQgbWF4Q291bnQgPSAwO1xuICBmb3IgKGNvbnN0IHZhbCBpbiBjb3VudGVycykge1xuICAgIGlmIChjb3VudGVyc1t2YWxdID4gbWF4Q291bnQpIHtcbiAgICAgIG1heENvdW50ID0gY291bnRlcnNbdmFsXTtcbiAgICB9XG4gIH1cbiAgZm9yIChjb25zdCB2YWwgaW4gY291bnRlcnMpIHtcbiAgICBpZiAoY291bnRlcnNbdmFsXSA9PT0gbWF4Q291bnQpIHtcbiAgICAgIHJldHVybiBOdW1iZXIodmFsKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIE5hTjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkRGF0YXNldChcbiAgZGF0YXNldDogKHN0cmluZyB8IG51bWJlciB8IHN0cmluZ1tdIHwgbnVtYmVyW10pW10sXG4gIGNvbHNwYW5zOiBudW1iZXJbXSxcbik6IEFqZlRhYmxlQ2VsbFtdW10ge1xuICByZXR1cm4gYnVpbGRBbGlnbmVkRGF0YXNldChkYXRhc2V0LCBjb2xzcGFucywgW10pO1xufVxuXG4vKipcbiAqIEJ1aWxkIGEgZGF0YXNldCBmb3IgYWpmIGR5bmFtaWMgdGFibGVcbiAqIEBwYXJhbSBkYXRhc2V0IHRoZSBkYXRhc2V0IGZvciB0aGUgdGFibGVcbiAqIEBwYXJhbSBjb2xzcGFucyBjb2xzcGFuIGZvciBlYWNoIHZhbHVlIGluIHRoZSBkYXRhc2V0XG4gKiBAcGFyYW0gdGV4dEFsaWduIGFsaWdubWVudCBmb3IgZWFjaCB2YWx1ZSBpbiB0aGUgZGF0YXNldFxuICogQHJldHVybnMgQW4gQWpmVGFibGVDZWxsIGxpc3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkQWxpZ25lZERhdGFzZXQoXG4gIGRhdGFzZXQ6IChzdHJpbmcgfCBudW1iZXIgfCBzdHJpbmdbXSB8IG51bWJlcltdKVtdLFxuICBjb2xzcGFuczogbnVtYmVyW10sXG4gIHRleHRBbGlnbjogc3RyaW5nW10sXG4pOiBBamZUYWJsZUNlbGxbXVtdIHtcbiAgY29uc3QgcmVzOiBBamZUYWJsZUNlbGxbXVtdID0gW107XG4gIGNvbnN0IG5vcm1hbGl6ZURhdGFzZXQ6IGFueVtdW10gPSBbXTtcbiAgZGF0YXNldC5mb3JFYWNoKChyb3c6IGFueSwgaW5kZXhSb3c6IG51bWJlcikgPT4ge1xuICAgIHJvdyA9IEFycmF5LmlzQXJyYXkocm93KSA/IHJvdyA6IFtyb3ddO1xuICAgIG5vcm1hbGl6ZURhdGFzZXRbaW5kZXhSb3cgJSBjb2xzcGFucy5sZW5ndGhdID1cbiAgICAgIG5vcm1hbGl6ZURhdGFzZXRbaW5kZXhSb3cgJSBjb2xzcGFucy5sZW5ndGhdICE9IG51bGxcbiAgICAgICAgPyBbLi4ubm9ybWFsaXplRGF0YXNldFtpbmRleFJvdyAlIGNvbHNwYW5zLmxlbmd0aF0sIC4uLnJvd11cbiAgICAgICAgOiBbLi4ucm93XTtcbiAgfSk7XG4gIGNvbnN0IHRyYW5zcG9zZSA9IG5vcm1hbGl6ZURhdGFzZXRbMF0ubWFwKChfOiBhbnksIGNvbEluZGV4OiBudW1iZXIpID0+XG4gICAgbm9ybWFsaXplRGF0YXNldC5tYXAoKHJvdzogYW55KSA9PiByb3dbY29sSW5kZXhdKSxcbiAgKTtcbiAgdHJhbnNwb3NlLmZvckVhY2goKGRhdGE6IGFueVtdLCBpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgY29uc3Qgcm93OiBBamZUYWJsZUNlbGxbXSA9IFtdO1xuICAgIGRhdGEuZm9yRWFjaCgoY2VsbFZhbHVlOiBzdHJpbmcgfCBudW1iZXIsIGNlbGxJbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICByb3cucHVzaCh7XG4gICAgICAgIHZhbHVlOiBjZWxsVmFsdWUsXG4gICAgICAgIGNvbHNwYW46IGNvbHNwYW5zW2NlbGxJbmRleF0sXG4gICAgICAgIHJvd3NwYW46IDEsXG4gICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgdGV4dEFsaWduOiB0ZXh0QWxpZ25bY2VsbEluZGV4XSA/IHRleHRBbGlnbltjZWxsSW5kZXhdIDogJ2NlbnRlcicsXG4gICAgICAgICAgY29sb3I6ICdibGFjaycsXG4gICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBpbmRleCAlIDIgPT09IDAgPyAnd2hpdGUnIDogJyNkZGQnLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgcmVzLnB1c2gocm93KTtcbiAgfSk7XG4gIHJldHVybiByZXM7XG59XG5cbi8qKlxuICogQnVpbGQgYSBkYXRhc2V0IGJhc2VkIG9uIGEgbGlzdCBvZiBGb3JtcywgZm9yIGFqZiBkeW5hbWljIHRhYmxlXG4gKiBAcGFyYW0gZGF0YXNldCB0aGUgZGF0YXNldCBmb3IgdGhlIHRhYmxlXG4gKiBAcGFyYW0gZmllbGRzIHRoZSBsaXN0IG9mIGZpZWxkcyBuYW1lIGZvciBlYWNoIHJvd1xuICogQHBhcmFtIHJvd0xpbmsgdGhlIGh0dHAgbGluayBmb3IgdGhlIHJvdywgd2l0aCB0aGUgZm9ybSBmaWVsZCBuYW1lIHdpdGggdGhlIGxpbmsgdmFsdWUgYW5kIHRoZSBjb2x1bW4gcG9zaXRpb24gZm9yIHRoZSBsaW5rLlxuICogaWU6IHsnbGluayc6ICdob21lX2xpbmsnLCAncG9zaXRpb24nOiAwfVxuICogQHBhcmFtIGJhY2tncm91bmRDb2xvckEgdGhlIGZpcnN0IGJhY2tncm91ZCBjb2xvclxuICogQHBhcmFtIGJhY2tncm91bmRDb2xvckIgdGhlIHNlY29uZCBiYWNrZ3JvdWQgY29sb3JcbiAqIEByZXR1cm5zIEFuIEFqZlRhYmxlQ2VsbCBsaXN0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBidWlsZEZvcm1EYXRhc2V0KFxuICBkYXRhc2V0OiBNYWluRm9ybVtdLFxuICBmaWVsZHM6IHN0cmluZ1tdLFxuICByb3dMaW5rOiB7bGluazogc3RyaW5nOyBwb3NpdGlvbjogbnVtYmVyfSB8IG51bGwsXG4gIF9iYWNrZ3JvdW5kQ29sb3JBPzogc3RyaW5nLFxuICBfYmFja2dyb3VuZENvbG9yQj86IHN0cmluZyxcbik6IEFqZlRhYmxlQ2VsbFtdW10ge1xuICByZXR1cm4gYnVpbGRBbGlnbmVkRm9ybURhdGFzZXQoZGF0YXNldCwgZmllbGRzLCBbXSwgW10sIHJvd0xpbmssIFtdLCBbXSk7XG59XG5cbi8qKlxuICogQnVpbGQgYSBkYXRhc2V0IGJhc2VkIG9uIGEgbGlzdCBvZiBGb3JtcywgZm9yIGFqZiBkeW5hbWljIHRhYmxlXG4gKiBAcGFyYW0gZGF0YXNldCB0aGUgZGF0YXNldCBmb3IgdGhlIHRhYmxlXG4gKiBAcGFyYW0gZmllbGRzIHRoZSBsaXN0IG9mIGZpZWxkcyBuYW1lIGZvciBlYWNoIHJvd1xuICogQHBhcmFtIGNvbHNwYW5zIGNvbHNwYW4gZm9yIGVhY2ggdmFsdWUgaW4gdGhlIGRhdGFzZXRcbiAqIEBwYXJhbSB0ZXh0QWxpZ24gYWxpZ25tZW50IGZvciBlYWNoIHZhbHVlIGluIHRoZSBkYXRhc2V0XG4gKiBAcGFyYW0gcm93TGluayB0aGUgaHR0cCBsaW5rIGZvciB0aGUgcm93LCB3aXRoIHRoZSBmb3JtIGZpZWxkIG5hbWUgd2l0aCB0aGUgbGluayB2YWx1ZSBhbmQgdGhlIGNvbHVtbiBwb3NpdGlvbiBmb3IgdGhlIGxpbmsuXG4gKiBpZTogeydsaW5rJzogJ2hvbWVfbGluaycsICdwb3NpdGlvbic6IDB9XG4gKiBAcmV0dXJucyBBbiBBamZUYWJsZUNlbGwgbGlzdFxuICovXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRBbGlnbmVkRm9ybURhdGFzZXQoXG4gIGRhdGFzZXQ6IE1haW5Gb3JtW10sXG4gIGZpZWxkczogc3RyaW5nW10sXG4gIGNvbHNwYW5zOiBudW1iZXJbXSxcbiAgdGV4dEFsaWduOiBzdHJpbmdbXSxcbiAgcm93TGluazoge2xpbms6IHN0cmluZzsgcG9zaXRpb246IG51bWJlcn0gfCBudWxsLFxuICBkaWFsb2dGaWVsZHM6IHN0cmluZ1tdLFxuICBkaWFsb2dMYWJlbEZpZWxkczogc3RyaW5nW10sXG4pOiBBamZUYWJsZUNlbGxbXVtdIHtcbiAgY29uc3QgcmVzOiBBamZUYWJsZUNlbGxbXVtdID0gW107XG5cbiAgY29uc3QgYmFja2dyb3VuZENvbG9yQSA9ICd3aGl0ZSc7XG4gIGNvbnN0IGJhY2tncm91bmRDb2xvckIgPSAnI2RkZCc7XG4gIGlmIChkYXRhc2V0KSB7XG4gICAgbGV0IGluZGV4OiBudW1iZXIgPSAwO1xuICAgIGRhdGFzZXQuZm9yRWFjaCgoZGF0YTogTWFpbkZvcm0pID0+IHtcbiAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgIGluZGV4Kys7XG4gICAgICAgIGNvbnN0IHJvdzogQWpmVGFibGVDZWxsW10gPSBbXTtcbiAgICAgICAgZmllbGRzLmZvckVhY2goKGZpZWxkOiBzdHJpbmcsIGNlbGxJZHg6IG51bWJlcikgPT4ge1xuICAgICAgICAgIGxldCBjZWxsVmFsdWUgPSBkYXRhW2ZpZWxkXSB8fCAnJztcbiAgICAgICAgICBpZiAocm93TGluayAhPSBudWxsICYmIGNlbGxJZHggPT09IHJvd0xpbmtbJ3Bvc2l0aW9uJ10pIHtcbiAgICAgICAgICAgIGNlbGxWYWx1ZSA9IGA8YSBocmVmPScke2RhdGFbcm93TGlua1snbGluayddXX0nPiAke2RhdGFbZmllbGRdfTwvYT5gO1xuICAgICAgICAgIH1cbiAgICAgICAgICByb3cucHVzaCh7XG4gICAgICAgICAgICB2YWx1ZTogY2VsbFZhbHVlLFxuICAgICAgICAgICAgY29sc3BhbjogY29sc3BhbnNbY2VsbElkeF0gJiYgY29sc3BhbnNbY2VsbElkeF0gPiAwID8gY29sc3BhbnNbY2VsbElkeF0gOiAxLFxuICAgICAgICAgICAgcm93c3BhbjogMSxcbiAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgIHRleHRBbGlnbjogdGV4dEFsaWduW2NlbGxJZHhdID8gdGV4dEFsaWduW2NlbGxJZHhdIDogJ2NlbnRlcicsXG4gICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snLFxuICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IGluZGV4ICUgMiA9PT0gMCA/IGJhY2tncm91bmRDb2xvckEgOiBiYWNrZ3JvdW5kQ29sb3JCLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGRpYWxvZ0ZpZWxkcyAmJiBkaWFsb2dGaWVsZHMubGVuZ3RoKSB7XG4gICAgICAgICAgbGV0IGRpYWxvZ0h0bWw6IHN0cmluZ1tdID0gW107XG4gICAgICAgICAgZGlhbG9nRmllbGRzLmZvckVhY2goKGZpZWxkOiBzdHJpbmcsIGNlbGxJZHg6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgbGV0IGZpZWxkVmFsdWUgPSAnXCJcIic7XG4gICAgICAgICAgICBpZiAoZGF0YVtmaWVsZF0gIT0gbnVsbCkge1xuICAgICAgICAgICAgICBmaWVsZFZhbHVlID1cbiAgICAgICAgICAgICAgICBcIjxwIGNsYXNzPSdkaWFsb2ctaXRlbSc+PGI+XCIgK1xuICAgICAgICAgICAgICAgIGRpYWxvZ0xhYmVsRmllbGRzW2NlbGxJZHhdLnJlcGxhY2UoL1snXFxcIl0rL2csICcnKSArXG4gICAgICAgICAgICAgICAgJzwvYj4gPHNwYW4+JyArXG4gICAgICAgICAgICAgICAgZGF0YVtmaWVsZF0gK1xuICAgICAgICAgICAgICAgICc8L3NwYW4+PC9wPic7XG4gICAgICAgICAgICAgIGRpYWxvZ0h0bWwucHVzaChmaWVsZFZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHJvdy5wdXNoKHtcbiAgICAgICAgICAgIHZhbHVlOlxuICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cInJlYWRfbW9yZV9jZWxsXCI+PHAgY2xhc3M9XCJyZWFkX21vcmVfdGV4dFwiPlJlYWQgbW9yZTwvcD48YiBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCI+YWRkX2NpcmNsZV9vdXRsaW5lPC9iPjwvZGl2PicsXG4gICAgICAgICAgICBkaWFsb2dIdG1sOiBkaWFsb2dIdG1sLmpvaW4oJyAnKSxcbiAgICAgICAgICAgIGNvbHNwYW46IDEsXG4gICAgICAgICAgICByb3dzcGFuOiAxLFxuICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgY29sb3I6ICdibGFjaycsXG4gICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogaW5kZXggJSAyID09PSAwID8gYmFja2dyb3VuZENvbG9yQSA6IGJhY2tncm91bmRDb2xvckIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJlcy5wdXNoKHJvdyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cblxuLyoqXG4gKiBjcmVhdGUgYSB3aWRnZXQgZGF0YXNldCBpbnRvIGEgY29udGVudCBsaXN0LCBiYXNlZCBvbiBhIGxpc3Qgb2YgRm9ybXMsIGZvciBwYWdpbmF0ZWQgd2lkZ2V0XG4gKlxuICogQHBhcmFtIGRhdGFzZXQgdGhlIGRhdGFzZXQgZm9yIHRoZSB3aWRnZXRzXG4gKiBAcGFyYW0gZmllbGRzIHRoZSBsaXN0IG9mIGZpZWxkcyBuYW1lIGZvciBlYWNoIHJvd1xuICogQHBhcmFtIHJvd0xpbmsgdGhlIGh0dHAgbGluayBmb3IgdGhlIHJvdywgd2l0aCB0aGUgZm9ybSBmaWVsZCBuYW1lIHdpdGggdGhlIGxpbmsgdmFsdWUgYW5kIHRoZSBjb2x1bW4gcG9zaXRpb24gZm9yIHRoZSBsaW5rLlxuICogaWU6IHsnbGluayc6ICdob21lX2xpbmsnLCAncG9zaXRpb24nOiAwfVxuICogQHBhcmFtIGNlbGxTdHlsZXMgY3NzIHN0eWxlcyBmb3IgY2VsbHNcbiAqIEBwYXJhbSByb3dTdHlsZSBjc3Mgc3R5bGVzIGZvciByb3dzXG4gKiBAcGFyYW0gcGVyY1dpZHRoIGFuIGFycmF5IHdpdGggdGhlIHNhbWUgbGVuZ3RoIG9mIGZpZWxkcyBwYXJhbSwgd2l0aCB0aGUgd2lkdGggZm9yIHRoZSBjb2x1bW5zLlxuICogaWU6IFsnMTAlJywgJzMwJScsICcxMCUnLCAnMjUlJywgJzE1JScsICcxMCUnXVxuICogQHBhcmFtIGJhY2tncm91bmRDb2xvckEgdGhlIGZpcnN0IGJhY2tncm91ZCBjb2xvclxuICogQHBhcmFtIGJhY2tncm91bmRDb2xvckIgdGhlIHNlY29uZCBiYWNrZ3JvdWQgY29sb3JcbiAqIEByZXR1cm5zIEFuIEFqZlRhYmxlV2lkZ2V0IGxpc3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkV2lkZ2V0RGF0YXNldChcbiAgZGF0YXNldDogTWFpbkZvcm1bXSxcbiAgZmllbGRzOiBzdHJpbmdbXSxcbiAgcm93TGluazoge2xpbms6IHN0cmluZzsgcG9zaXRpb246IG51bWJlcn0gfCBudWxsLFxuICBjZWxsU3R5bGVzOiB7W2tleTogc3RyaW5nXTogYW55fSB8IG51bGwsXG4gIHJvd1N0eWxlOiB7W2tleTogc3RyaW5nXTogYW55fSB8IG51bGwsXG4gIHBlcmNXaWR0aDogc3RyaW5nW10sXG4gIGJhY2tncm91bmRDb2xvckE/OiBzdHJpbmcsXG4gIGJhY2tncm91bmRDb2xvckI/OiBzdHJpbmcsXG4pOiBhbnlbXSB7XG4gIGNvbnN0IHJlczoge1trZXk6IHN0cmluZ106IGFueX1bXSA9IFtdO1xuICBpZiAoYmFja2dyb3VuZENvbG9yQSA9PSBudWxsKSB7XG4gICAgYmFja2dyb3VuZENvbG9yQSA9ICd3aGl0ZSc7XG4gIH1cbiAgaWYgKGJhY2tncm91bmRDb2xvckIgPT0gbnVsbCkge1xuICAgIGJhY2tncm91bmRDb2xvckIgPSAnI2RkZCc7XG4gIH1cbiAgaWYgKHJvd1N0eWxlID09IG51bGwpIHtcbiAgICByb3dTdHlsZSA9IHtcbiAgICAgICd0ZXh0LWFsaWduJzogJ3JpZ2h0JyxcbiAgICAgICdtYXJnaW4tYm90dG9tJzogMCxcbiAgICAgICdib3JkZXItY29sbGFwc2UnOiAnY29sbGFwc2UnLFxuICAgIH07XG4gIH1cbiAgaWYgKGNlbGxTdHlsZXMgPT0gbnVsbCkge1xuICAgIGNlbGxTdHlsZXMgPSB7XG4gICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxuICAgICAgY29sb3I6ICdibGFjaycsXG4gICAgfTtcbiAgfVxuICBpZiAocGVyY1dpZHRoID09IG51bGwgfHwgcGVyY1dpZHRoLmxlbmd0aCAhPT0gZmllbGRzLmxlbmd0aCkge1xuICAgIGNvbnN0IGNlbGxXaWR0aCA9IDEwMCAvIGZpZWxkcy5sZW5ndGggKyAnJSc7XG4gICAgcGVyY1dpZHRoID0gW107XG4gICAgZmllbGRzLmZvckVhY2goXyA9PiBwZXJjV2lkdGgucHVzaChjZWxsV2lkdGgpKTtcbiAgfVxuXG4gIGlmIChkYXRhc2V0KSB7XG4gICAgbGV0IGluZGV4OiBudW1iZXIgPSAwO1xuICAgIGRhdGFzZXQuZm9yRWFjaCgoZGF0YTogTWFpbkZvcm0pID0+IHtcbiAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgIGluZGV4Kys7XG4gICAgICAgIC8vIFJvdyBpcyBhbiBBamZUYWJsZVdpZGdldFxuICAgICAgICBjb25zdCByb3c6IHtba2V5OiBzdHJpbmddOiBhbnl9ID0ge1xuICAgICAgICAgIHN0eWxlczoge1xuICAgICAgICAgICAgJ3RleHQtYWxpZ24nOiAncmlnaHQnLFxuICAgICAgICAgICAgJ21hcmdpbi1ib3R0b20nOiAwLFxuICAgICAgICAgICAgJ2JvcmRlci1jb2xsYXBzZSc6ICdjb2xsYXBzZScsXG4gICAgICAgICAgICAuLi5yb3dTdHlsZSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHZpc2liaWxpdHk6IHtjb25kaXRpb246ICd0cnVlJ30sXG4gICAgICAgICAgd2lkZ2V0VHlwZTogNSxcbiAgICAgICAgICBkYXRhc2V0OiBbW11dIGFzIGFueVtdW10sXG4gICAgICAgICAgY2VsbFN0eWxlczogeydib3JkZXItdG9wJzogJzFweCBzb2xpZCBncmV5J30sXG4gICAgICAgIH07XG5cbiAgICAgICAgZmllbGRzLmZvckVhY2goKGZpZWxkOiBzdHJpbmcsIGNlbGxJZHg6IG51bWJlcikgPT4ge1xuICAgICAgICAgIGxldCBmb3JtdWxhQ2VsbCA9ICdcIlwiJztcbiAgICAgICAgICBpZiAoZGF0YVtmaWVsZF0gIT0gbnVsbCkge1xuICAgICAgICAgICAgZm9ybXVsYUNlbGwgPSAnXCInICsgZGF0YVtmaWVsZF0gKyAnXCInO1xuICAgICAgICAgICAgaWYgKHJvd0xpbmsgIT0gbnVsbCAmJiBjZWxsSWR4ID09PSByb3dMaW5rWydwb3NpdGlvbiddKSB7XG4gICAgICAgICAgICAgIGZvcm11bGFDZWxsID0gYFwiPGEgaHJlZj0nJHtkYXRhW3Jvd0xpbmtbJ2xpbmsnXV19Jz4gJHtkYXRhW2ZpZWxkXX08L2E+XCJgO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHJvd1snZGF0YXNldCddWzBdLnB1c2goe1xuICAgICAgICAgICAgbGFiZWw6ICcnLFxuICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgY29sb3I6ICdibGFjaycsXG4gICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogaW5kZXggJSAyID09PSAwID8gYmFja2dyb3VuZENvbG9yQSA6IGJhY2tncm91bmRDb2xvckIsXG4gICAgICAgICAgICAgIC4uLmNlbGxTdHlsZXMsXG4gICAgICAgICAgICAgIHdpZHRoOiBwZXJjV2lkdGhbY2VsbElkeF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZm9ybXVsYToge1xuICAgICAgICAgICAgICBmb3JtdWxhOiBmb3JtdWxhQ2VsbCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb2xzcGFuOiAxLFxuICAgICAgICAgICAgcm93c3BhbjogMSxcbiAgICAgICAgICAgIGFnZ3JlZ2F0aW9uOiB7XG4gICAgICAgICAgICAgIGFnZ3JlZ2F0aW9uOiAwLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJlcy5wdXNoKHJvdyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cblxuLyoqXG4gKiBjcmVhdGUgYSB3aWRnZXQgZGF0YXNldCBpbnRvIGEgY29udGVudCBsaXN0LCBiYXNlZCBvbiBhIGxpc3Qgb2YgRm9ybXMsIGZvciBwYWdpbmF0ZWQgd2lkZ2V0LlxuICogRWFjaCByb3cgaXMgYSBBamZEaWFsb2dXaWRnZXQgYW5kLCBvbiBjbGljaywgb3BlbiBhIGRpYWxvZy5cbiAqXG4gKiBAcGFyYW0gZGF0YXNldCB0aGUgZGF0YXNldCBmb3IgdGhlIHdpZGdldHNcbiAqIEBwYXJhbSBmaWVsZHMgdGhlIGxpc3Qgb2YgZmllbGRzIG5hbWUgZm9yIGVhY2ggcm93XG4gKiBAcGFyYW0gZGlhbG9nRmllbGRzIHRoZSBsaXN0IG9mIGZpZWxkcyBuYW1lIHRvIHNob3cgaW4gdGhlIGRpYWxvZ1xuICogQHBhcmFtIGRpYWxvZ0xhYmVsRmllbGRzIHRoZSBsaXN0IG9mIGxhYmVscyBmb3IgZWFjaCBkaWFsb2dGaWVsZHNcbiAqIEBwYXJhbSByb3dMaW5rIHRoZSBodHRwIGxpbmsgZm9yIHRoZSByb3csIHdpdGggdGhlIGZvcm0gZmllbGQgbmFtZSB3aXRoIHRoZSBsaW5rIHZhbHVlIGFuZCB0aGUgY29sdW1uIHBvc2l0aW9uIGZvciB0aGUgbGluay5cbiAqIGllOiB7J2xpbmsnOiAnaG9tZV9saW5rJywgJ3Bvc2l0aW9uJzogMH1cbiAqIEBwYXJhbSBjZWxsU3R5bGVzIGNzcyBzdHlsZXMgZm9yIGNlbGxzXG4gKiBAcGFyYW0gcm93U3R5bGUgY3NzIHN0eWxlcyBmb3Igcm93c1xuICogQHBhcmFtIHBlcmNXaWR0aCBhbiBhcnJheSB3aXRoIHRoZSBzYW1lIGxlbmd0aCBvZiBmaWVsZHMgcGFyYW0sIHdpdGggdGhlIHdpZHRoIGZvciB0aGUgY29sdW1ucy5cbiAqIGllOiBbJzEwJScsICczMCUnLCAnMTAlJywgJzI1JScsICcxNSUnLCAnMTAlJ11cbiAqIEBwYXJhbSBiYWNrZ3JvdW5kQ29sb3JBIHRoZSBmaXJzdCBiYWNrZ3JvdWQgY29sb3JcbiAqIEBwYXJhbSBiYWNrZ3JvdW5kQ29sb3JCIHRoZSBzZWNvbmQgYmFja2dyb3VkIGNvbG9yXG4gKiBAcmV0dXJucyBBbiBBamZEaWFsb2dXaWRnZXQgbGlzdFxuICovXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRXaWRnZXREYXRhc2V0V2l0aERpYWxvZyhcbiAgZGF0YXNldDogTWFpbkZvcm1bXSxcbiAgZmllbGRzOiBzdHJpbmdbXSxcbiAgZGlhbG9nRmllbGRzOiBzdHJpbmdbXSxcbiAgZGlhbG9nTGFiZWxGaWVsZHM6IHN0cmluZ1tdLFxuICBjZWxsU3R5bGVzOiB7W2tleTogc3RyaW5nXTogYW55fSB8IG51bGwsXG4gIHJvd1N0eWxlOiB7W2tleTogc3RyaW5nXTogYW55fSB8IG51bGwsXG4gIHBlcmNXaWR0aDogc3RyaW5nW10sXG4gIGJhY2tncm91bmRDb2xvckE/OiBzdHJpbmcsXG4gIGJhY2tncm91bmRDb2xvckI/OiBzdHJpbmcsXG4pOiBhbnlbXSB7XG4gIGNvbnN0IHJlczoge1trZXk6IHN0cmluZ106IGFueX1bXSA9IFtdO1xuICBpZiAoYmFja2dyb3VuZENvbG9yQSA9PSBudWxsKSB7XG4gICAgYmFja2dyb3VuZENvbG9yQSA9ICd3aGl0ZSc7XG4gIH1cbiAgaWYgKGJhY2tncm91bmRDb2xvckIgPT0gbnVsbCkge1xuICAgIGJhY2tncm91bmRDb2xvckIgPSAnI2RkZCc7XG4gIH1cbiAgaWYgKHJvd1N0eWxlID09IG51bGwpIHtcbiAgICByb3dTdHlsZSA9IHtcbiAgICAgICd0ZXh0LWFsaWduJzogJ3JpZ2h0JyxcbiAgICAgICdtYXJnaW4tYm90dG9tJzogMCxcbiAgICAgICdib3JkZXItY29sbGFwc2UnOiAnY29sbGFwc2UnLFxuICAgIH07XG4gIH1cbiAgaWYgKGNlbGxTdHlsZXMgPT0gbnVsbCkge1xuICAgIGNlbGxTdHlsZXMgPSB7XG4gICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxuICAgICAgY29sb3I6ICdibGFjaycsXG4gICAgfTtcbiAgfVxuICBpZiAocGVyY1dpZHRoID09IG51bGwgfHwgcGVyY1dpZHRoLmxlbmd0aCAhPT0gZmllbGRzLmxlbmd0aCkge1xuICAgIGNvbnN0IGNlbGxXaWR0aCA9IDEwMCAvIGZpZWxkcy5sZW5ndGggKyAnJSc7XG4gICAgcGVyY1dpZHRoID0gW107XG4gICAgZmllbGRzLmZvckVhY2goXyA9PiBwZXJjV2lkdGgucHVzaChjZWxsV2lkdGgpKTtcbiAgfVxuXG4gIGlmIChkYXRhc2V0KSB7XG4gICAgbGV0IGluZGV4OiBudW1iZXIgPSAwO1xuICAgIGRhdGFzZXQuZm9yRWFjaCgoZGF0YTogTWFpbkZvcm0pID0+IHtcbiAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgIGluZGV4Kys7XG4gICAgICAgIC8vIFJvdyBpcyBhbiBBamZUYWJsZVdpZGdldFxuICAgICAgICBjb25zdCByb3c6IHtba2V5OiBzdHJpbmddOiBhbnl9ID0ge1xuICAgICAgICAgIHN0eWxlczoge1xuICAgICAgICAgICAgJ3RleHQtYWxpZ24nOiAncmlnaHQnLFxuICAgICAgICAgICAgJ21hcmdpbi1ib3R0b20nOiAwLFxuICAgICAgICAgICAgJ2JvcmRlci1jb2xsYXBzZSc6ICdjb2xsYXBzZScsXG4gICAgICAgICAgICAuLi5yb3dTdHlsZSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHZpc2liaWxpdHk6IHtjb25kaXRpb246ICd0cnVlJ30sXG4gICAgICAgICAgd2lkZ2V0VHlwZTogNSxcbiAgICAgICAgICBkYXRhc2V0OiBbW11dIGFzIGFueVtdW10sXG4gICAgICAgICAgY2VsbFN0eWxlczogeydib3JkZXItdG9wJzogJzFweCBzb2xpZCBncmV5J30sXG4gICAgICAgIH07XG5cbiAgICAgICAgZmllbGRzLmZvckVhY2goKGZpZWxkOiBzdHJpbmcsIGNlbGxJZHg6IG51bWJlcikgPT4ge1xuICAgICAgICAgIGxldCBmb3JtdWxhQ2VsbCA9ICdcIlwiJztcbiAgICAgICAgICBpZiAoZGF0YVtmaWVsZF0gIT0gbnVsbCkge1xuICAgICAgICAgICAgZm9ybXVsYUNlbGwgPSAnXCInICsgZGF0YVtmaWVsZF0gKyAnXCInO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJvd1snZGF0YXNldCddWzBdLnB1c2goe1xuICAgICAgICAgICAgbGFiZWw6ICcnLFxuICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgY29sb3I6ICdibGFjaycsXG4gICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogaW5kZXggJSAyID09PSAwID8gYmFja2dyb3VuZENvbG9yQSA6IGJhY2tncm91bmRDb2xvckIsXG4gICAgICAgICAgICAgIC4uLmNlbGxTdHlsZXMsXG4gICAgICAgICAgICAgIHdpZHRoOiBwZXJjV2lkdGhbY2VsbElkeF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZm9ybXVsYToge1xuICAgICAgICAgICAgICBmb3JtdWxhOiBmb3JtdWxhQ2VsbCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb2xzcGFuOiAxLFxuICAgICAgICAgICAgcm93c3BhbjogMSxcbiAgICAgICAgICAgIGFnZ3JlZ2F0aW9uOiB7XG4gICAgICAgICAgICAgIGFnZ3JlZ2F0aW9uOiAwLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IGh0bWxEaWFsb2c6IHN0cmluZ1tdID0gW107XG4gICAgICAgIGRpYWxvZ0ZpZWxkcy5mb3JFYWNoKChmaWVsZDogc3RyaW5nLCBjZWxsSWR4OiBudW1iZXIpID0+IHtcbiAgICAgICAgICBsZXQgZmllbGRWYWx1ZSA9ICdcIlwiJztcbiAgICAgICAgICBpZiAoZGF0YVtmaWVsZF0gIT0gbnVsbCkge1xuICAgICAgICAgICAgZmllbGRWYWx1ZSA9XG4gICAgICAgICAgICAgIFwiPHAgY2xhc3M9J2RpYWxvZy1pdGVtJz48Yj5cIiArXG4gICAgICAgICAgICAgIGRpYWxvZ0xhYmVsRmllbGRzW2NlbGxJZHhdICtcbiAgICAgICAgICAgICAgJzwvYj4gPHNwYW4+JyArXG4gICAgICAgICAgICAgIGRhdGFbZmllbGRdICtcbiAgICAgICAgICAgICAgJzwvc3Bhbj48L3A+JztcbiAgICAgICAgICAgIGh0bWxEaWFsb2cucHVzaChmaWVsZFZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IGRpYWxvZ0NvbnRlbnQ6IHtba2V5OiBzdHJpbmddOiBhbnl9ID0ge1xuICAgICAgICAgIHdpZGdldFR5cGU6IDMsXG4gICAgICAgICAgc3R5bGVzOiB7XG4gICAgICAgICAgICAnbWFyZ2luJzogJzAgMWVtJyxcbiAgICAgICAgICAgICdwYWRkaW5nJzogJzVweCAxMHB4JyxcbiAgICAgICAgICAgICdtYXgtaGVpZ2h0JzogJzM2MHB4JyxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHZpc2liaWxpdHk6IHtjb25kaXRpb246ICd0cnVlJ30sXG4gICAgICAgICAgaHRtbFRleHQ6IGh0bWxEaWFsb2cuam9pbignICcpLFxuICAgICAgICB9O1xuXG4gICAgICAgIC8vIFRoaXMgaXMgYSBEaWFsb2cgV2lkZ2V0LCBhZGRlZCBhcyBjb210YWluZXIgZm9yIGVhY2ggdGFibGUgd2lkZ2V0XG4gICAgICAgIGNvbnN0IGRpYWxvZ1Jvdzoge1trZXk6IHN0cmluZ106IGFueX0gPSB7XG4gICAgICAgICAgd2lkZ2V0VHlwZTogMTMsXG4gICAgICAgICAgc3R5bGVzOiB7XG4gICAgICAgICAgICAnbWFyZ2luJzogJzAnLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgdmlzaWJpbGl0eToge2NvbmRpdGlvbjogJ3RydWUnfSxcbiAgICAgICAgICB0b2dnbGU6IHJvdyxcbiAgICAgICAgICBjb250ZW50OiBbZGlhbG9nQ29udGVudF0sXG4gICAgICAgIH07XG4gICAgICAgIHJlcy5wdXNoKGRpYWxvZ1Jvdyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cblxuLyoqXG4gKiBEZXByZWNhdGVkLiBVc2UgTUFQXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBSRVBFQVQoXG4gIGZvcm1zOiBNYWluRm9ybVtdLFxuICBhcnJheTogc3RyaW5nW10sXG4gIGZuOiBhbnksXG4gIGFyZzE6IHN0cmluZyxcbiAgYXJnMjogc3RyaW5nID0gJ3RydWUnLFxuKTogYW55W10ge1xuICByZXR1cm4gYXJyYXkubWFwKHYgPT4ge1xuICAgIGNvbnN0IHMgPSBKU09OLnN0cmluZ2lmeSh2KTtcbiAgICBjb25zdCBjdXJyZW50MSA9IChhcmcxIGFzIGFueSkucmVwbGFjZUFsbCgnY3VycmVudCcsIHMpO1xuICAgIGNvbnN0IGN1cnJlbnQyID0gKGFyZzIgYXMgYW55KS5yZXBsYWNlQWxsKCdjdXJyZW50Jywgcyk7XG4gICAgcmV0dXJuIGZuKGZvcm1zLCBjdXJyZW50MSwgY3VycmVudDIpO1xuICB9KTtcbn1cblxuLyoqXG4gKiBNYXBzIGZ1bmMgdG8gdGhlIGVsZW1lbnRzIG9mIGFycmF5LlxuICovXG5leHBvcnQgZnVuY3Rpb24gTUFQKGFycmF5OiBhbnlbXSwgZnVuYzogKGE6IGFueSkgPT4gYW55KTogYW55W10ge1xuICByZXR1cm4gYXJyYXkubWFwKGZ1bmMpO1xufVxuXG4vKipcbiAqIEZvciBlYWNoIGZvcm0gaW4gZm9ybXMsIHRoZSBzcGVjaWZpZWQgZmllbGQgaXMgc2V0IHdpdGggdGhlIHZhbHVlIGdpdmVuIGJ5IGV4cHJlc3Npb24uXG4gKiBUaGUgZm9ybSdzIGZpZWxkcyBjYW4gYmUgdXNlZCBpbnNpZGUgZXhwcmVzc2lvbi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIEFQUExZKGZvcm1zOiBNYWluRm9ybVtdLCBmaWVsZDogc3RyaW5nLCBleHByZXNzaW9uOiBGdW5jfHN0cmluZyk6IE1haW5Gb3JtW10ge1xuICBmb3JtcyA9IGNsb25lTWFpbkZvcm1zKGZvcm1zKTtcbiAgaWYgKHR5cGVvZihleHByZXNzaW9uKSA9PT0gJ3N0cmluZycpIHtcbiAgICBleHByZXNzaW9uID0gY3JlYXRlRnVuY3Rpb24oZXhwcmVzc2lvbik7XG4gIH1cbiAgZm9yIChjb25zdCBmb3JtIG9mIGZvcm1zKSB7XG4gICAgaWYgKGZvcm0gIT0gbnVsbCkge1xuICAgICAgZm9ybVtmaWVsZF0gPSBleHByZXNzaW9uKGZvcm0pO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZm9ybXM7XG59XG5cbi8qKlxuICogUm91bmRzIG51bSB0byB0aGUgc3BlY2lmaWVkIG51bWJlciBvZiBkaWdpdHMgYWZ0ZXIgdGhlIHBvaW50IChvciB6ZXJvKS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIFJPVU5EKG51bTogbnVtYmVyIHwgc3RyaW5nLCBkaWdpdHM/OiBudW1iZXIpOiBudW1iZXIge1xuICByZXR1cm4gcm91bmQobnVtLCBkaWdpdHMpO1xufVxuXG4vKipcbiAqIERlcHJlY2F0ZWQuIFVzZSBJRlxuICovXG5leHBvcnQgZnVuY3Rpb24gRVZBTFVBVEUoY29uZGl0aW9uOiBzdHJpbmcsIGJyYW5jaDE6IGFueSwgYnJhbmNoMjogYW55KTogYW55IHtcbiAgaWYgKGV2YWx1YXRlRXhwcmVzc2lvbihjb25kaXRpb24pKSB7XG4gICAgcmV0dXJuIGJyYW5jaDE7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGJyYW5jaDI7XG4gIH1cbn1cblxuLyoqXG4gKiBUZWxscyBpZiBhcnIgaW5jbHVkZXMgZWxlbVxuICovXG5leHBvcnQgZnVuY3Rpb24gSU5DTFVERVMoYXJyOiBhbnlbXSwgZWxlbTogYW55KTogYm9vbGVhbiB7XG4gIHJldHVybiBhcnIuaW5jbHVkZXMoZWxlbSk7XG59XG5cbi8qKlxuICogVGhpcyBmdW5jdGlvbiBidWlsZHMgYSBkYXRhIHN0cnVjdHVyZSB0aGF0IGFsbG93cyB0aGUgdXNlIG9mIHRoZSBoaW5kaWtpdCBmb3JtdWxhc1xuICogZm9yIGV2ZXJ5IGZvcm1zIHdpdGggcmVwZWF0aW5nIHNsaWRlcy5cbiAqIEluIHBhcnRpY3VsYXIsIGl0IGJ1aWxkcyBhIG1haW4gZGF0YSBmb3JtIHdpdGggYWxsIHRoZSBkYXRhIHJlbGF0aW5nIHRvIHRoZSBzbGlkZXMgYW5kXG4gKiBhIGRpY3Rpb25hcnkgd2l0aCB0aGUgbmFtZSByZXBzIHRodXMgbWFkZSBpbnN0YW5jZSBzbGlkZU5hbWUgZm9ybXMuXG4gKiBXaGVyZSBhIGZvcm0gaXMgYXNzb2NpYXRlZCB3aXRoIGVhY2ggaW5zdGFuY2Ugb2YgdGhlIHJlcGVhdGluZyBzbGlkZS5cbiAqIGV4YW1wbGU6XG4gKiBzaW1wbGUgZm9ybTpcbiAqICB7XG4gKiAgICAkdmFsdWU6IFwiQUdPXCJcbiAqICAgIGNpdHRhZGluYW56YV9fMDogXCJBR09cIlxuICogICAgY29kaWNlX2Zpc2NhbGVfXzA6IFwiamRmbGpnbMOya8Oya8OyXCJcbiAqICAgIGNvdW50cnlfXzA6IFwiQUdPXCJcbiAqICAgIGRhdGVfZW5kOiBcIjIwMjEtMDEtMTBcIlxuICogICAgZGF0ZV9zdGFydDogXCIyMDIxLTAxLTEwXCJcbiAqICAgIGRvYl9fMDogXCIyMDIxLTAzLTExXCJcbiAqICAgIGZpcnN0X25hbWVfXzA6IFwicGlwcG9cIlxuICogICAgZ2VuZGVyX18wOiBcImZcIlxuICogICAgaWRfZmFtaWx5OiBcIjNiZWYzYTNmLWQ5NWQtNGEwOS04ZGY0LWU4MTJjNTVjNjFjNlwiXG4gKiAgICBpc3RydXppb25lX18wOiBudWxsXG4gKiAgICBsYXN0X25hbWVfXzA6IFwicGlwcG9cIlxuICogICAgcGVybWVzc29fc29nZ2lvcm5vX18wOiBcIm5vXCJcbiAqICAgIHJlbGF6aW9uZV9fMDogXCJnZW5pdG9yZVwiXG4gKiAgICBzb2xpZGFuZG86IFwic29saWRhbmRvMVwiXG4gKiAgICBzdGF0b19jaXZpbGVfXzA6IG51bGxcbiAqICB9XG4gKiBhZnRlciBCVUlMRF9EQVRBU0VUXG4gKiBNYWluRm9ybTpcbiAqIHtcbiAqICAgICR2YWx1ZTogXCJBR09cIlxuICogICAgYWpmX2Zvcm1faWQ6IDAgKiogYWRkZWQgYXRyaWJ1dGUgdGhhdCByYXBwcmVzZW50IHRoZSBpbmRleCBwb3NpdGlvbiBpbnNpZGVzIGlucHV0IGZvcm0gbGlzdC5cbiAqICAgIGFqZl9mYW1pbHlfY29tcG9uZW50X2NvdW50OiAxKiogYWRkZWQgYXRyaWJ1dGUgdGhhdCByYXBwcmVzZW50IHRoZSBpbnN0YW5jZSBudW1iZXIgb2YgZmFtaWxpX2NvbXBvbmVudCByZXBlYXRpbmcgc2xpZGVzLlxuICogICAgZGF0ZV9lbmQ6IFwiMjAyMS0wMS0xMFwiXG4gKiAgICBkYXRlX3N0YXJ0OiBcIjIwMjEtMDEtMTBcIlxuICogICAgaWRfZmFtaWx5OiBcIjNiZWYzYTNmLWQ5NWQtNGEwOS04ZGY0LWU4MTJjNTVjNjFjNlwiXG4gKiAgICByZXBzOiB7XG4gKiAgICAgIGZhbWlseV9jb21wb25lbnQ6IFtcbiAqICAgICAgICB7XG4gKiAgICAgICAgICBhamZfZmFtaWx5X2NvbXBvbmVudF9yZXA6IDAgKiogYWRkZWQgYXRyaWJ1dGUgdGhhdCByYXBwcmVzZW50IHRoZSBvcmRlciBpbnN0YW5jZSBvZiBmYW1pbHlfY29tcG9uZW50IHJlcGVhdGluZyBzbGlkZS5cbiAqICAgICAgICAgIGNpdHRhZGluYW56YTogXCJBR09cIlxuICogICAgICAgICAgY29kaWNlX2Zpc2NhbGU6IFwiamRmbGpnbMOya8Oya8OyXCJcbiAqICAgICAgICAgIGNvdW50cnk6IFwiQUdPXCJcbiAqICAgICAgICAgIGRvYjogXCIyMDIxLTAzLTExXCJcbiAqICAgICAgICAgIGZpcnN0X25hbWU6IFwicGlwcG9cIlxuICogICAgICAgICAgZ2VuZGVyOiBcImZcIlxuICogICAgICAgICAgaXN0cnV6aW9uZTogbnVsbFxuICogICAgICAgICAgbGFzdF9uYW1lOiBcInBpcHBvXCJcbiAqICAgICAgICAgIHBlcm1lc3NvX3NvZ2dpb3JubzogXCJub1wiXG4gKiAgICAgICAgICByZWxhemlvbmU6IFwiZ2VuaXRvcmVcIlxuICogICAgICAgICAgc3RhdG9fY2l2aWxlOiBudWxsXG4gKiAgICAgICAgfVxuICogICAgICBdXG4gKiAgICB9XG4gKiB9XG4gKlxuICogQHBhcmFtIHtGb3JtW119IGZvcm1zXG4gKiBAcGFyYW0geyp9IFtzY2hlbWFdIGlmIHNjaGVtYSBpcyBwcm92aWRlZCB0aGUgaW5zdGFuY2VzIGluc2lkZSB0aGUgcmVwcyBtYXRjaCB3aXRoIGVmZmVjdGl2ZVxuICogc2xpZGUgbmFtZS4gT3RoZXJ3aXNlIGFsbCByZXBlYXRpbmcgc2xpZGVzIGFyZSBhc3NvY2lhdGVzIHRvIGdlbmVyaWMgc2xpZGUgbmFtZSBcInJlcFwiLlxuICogQHJldHVybiB7Kn0gIHtNYWluRm9ybVtdfVxuICovXG5leHBvcnQgZnVuY3Rpb24gQlVJTERfREFUQVNFVChmb3JtczogRm9ybVtdLCBzY2hlbWE/OiBhbnkpOiBNYWluRm9ybVtdIHtcbiAgY29uc3QgcmVzOiBNYWluRm9ybVtdID0gW107XG4gIGNvbnN0IGdlbmVyYXRlTWV0YWRhdGEgPSAoc2xpZGVOYW1lOiBzdHJpbmcsIHNsaWRlSW5zdGFuY2U6IG51bWJlcikgPT4ge1xuICAgIGNvbnN0IHJlc2c6IHtbc25hbWU6IHN0cmluZ106IGFueX0gPSB7fTtcbiAgICByZXNnW2BhamZfJHtzbGlkZU5hbWV9X3JlcGBdID0gc2xpZGVJbnN0YW5jZTtcbiAgICByZXR1cm4gcmVzZztcbiAgfTtcblxuICBmb3JtcyA9IFsuLi4oZm9ybXMgfHwgW10pXTtcblxuICBpZiAoc2NoZW1hICE9IG51bGwpIHtcbiAgICBjb25zdCByZXBlYXRpbmdTbGlkZXM6IGFueVtdID0gc2NoZW1hLm5vZGVzLmZpbHRlcigobm9kZTogYW55KSA9PiBub2RlLm5vZGVUeXBlID09PSA0KTtcbiAgICBjb25zdCBvYmo6IHtbZmllbGROYW1lOiBzdHJpbmddOiBzdHJpbmd9ID0ge307XG4gICAgcmVwZWF0aW5nU2xpZGVzLmZvckVhY2goc2xpZGUgPT4ge1xuICAgICAgbGV0IG5vZGVGaWVsZHMgPSBzbGlkZS5ub2Rlcy5tYXAoKG46IGFueSkgPT4gbi5uYW1lKTtcbiAgICAgIG5vZGVGaWVsZHMuZm9yRWFjaCgobm9kZUZpZWxkOiBzdHJpbmcpID0+IHtcbiAgICAgICAgb2JqW25vZGVGaWVsZF0gPSBzbGlkZS5uYW1lO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBmb3Jtcy5mb3JFYWNoKChmLCBmb3JtSWR4KSA9PiB7XG4gICAgICBjb25zdCBtYWluRm9ybTogTWFpbkZvcm0gPSB7cmVwczoge319O1xuICAgICAgY29uc3QgZktleXM6IHN0cmluZ1tdID0gT2JqZWN0LmtleXMoZik7XG4gICAgICBjb25zdCBpbnN0YW5jZXM6IHtbc2xpZGVOYW1lOiBzdHJpbmddOiBhbnl9ID0ge307XG5cbiAgICAgIGZLZXlzLmZvckVhY2goZmtleSA9PiB7XG4gICAgICAgIGNvbnN0IHNwbGl0dGVkS2V5OiBzdHJpbmdbXSA9IGZrZXkuc3BsaXQoJ19fJyk7XG4gICAgICAgIGNvbnN0IHNwbGl0dGVkTGVuZ3RoOiBudW1iZXIgPSBzcGxpdHRlZEtleS5sZW5ndGg7XG4gICAgICAgIGNvbnN0IGZpZWxkTmFtZSA9IHNwbGl0dGVkS2V5WzBdO1xuICAgICAgICBjb25zdCBzbGlkZUluc3RhbmNlID1cbiAgICAgICAgICBzcGxpdHRlZEtleVsxXSAhPSBudWxsICYmIE51bWJlci5pc0ludGVnZXIoK3NwbGl0dGVkS2V5WzFdKSA/ICtzcGxpdHRlZEtleVsxXSA6IG51bGw7XG4gICAgICAgIGNvbnN0IHNsaWRlTmFtZSA9IG9ialtmaWVsZE5hbWVdO1xuICAgICAgICBpZiAoc3BsaXR0ZWRMZW5ndGggPT09IDIgJiYgc2xpZGVJbnN0YW5jZSAhPSBudWxsICYmIHNsaWRlTmFtZSAhPSBudWxsKSB7XG4gICAgICAgICAgaW5zdGFuY2VzW3NsaWRlTmFtZV0gPSBpbnN0YW5jZXNbc2xpZGVOYW1lXSAhPSBudWxsID8gaW5zdGFuY2VzW3NsaWRlTmFtZV0gOiBbXTtcbiAgICAgICAgICBpbnN0YW5jZXNbc2xpZGVOYW1lXVtzbGlkZUluc3RhbmNlXSA9XG4gICAgICAgICAgICBpbnN0YW5jZXNbc2xpZGVOYW1lXVtzbGlkZUluc3RhbmNlXSAhPSBudWxsXG4gICAgICAgICAgICAgID8gaW5zdGFuY2VzW3NsaWRlTmFtZV1bc2xpZGVJbnN0YW5jZV1cbiAgICAgICAgICAgICAgOiBnZW5lcmF0ZU1ldGFkYXRhKHNsaWRlTmFtZSwgc2xpZGVJbnN0YW5jZSk7XG4gICAgICAgICAgaW5zdGFuY2VzW3NsaWRlTmFtZV1bc2xpZGVJbnN0YW5jZV1bZmllbGROYW1lXSA9IGZbZmtleV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbWFpbkZvcm1bZmtleV0gPSBmW2ZrZXldO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIG1haW5Gb3JtW2BhamZfZm9ybV9pZGBdID0gZm9ybUlkeDtcbiAgICAgIGNvbnN0IGluc3RhbmNlS2V5cyA9IE9iamVjdC5rZXlzKGluc3RhbmNlcyk7XG4gICAgICBpbnN0YW5jZUtleXMuZm9yRWFjaChpbnN0YW5jZUtleSA9PiB7XG4gICAgICAgIG1haW5Gb3JtW2BhamZfJHtpbnN0YW5jZUtleX1fY291bnRgXSA9IGluc3RhbmNlc1tpbnN0YW5jZUtleV0ubGVuZ3RoO1xuICAgICAgfSk7XG4gICAgICBtYWluRm9ybS5yZXBzID0gaW5zdGFuY2VzO1xuICAgICAgcmVzLnB1c2gobWFpbkZvcm0pO1xuICAgIH0pO1xuICAgIHJldHVybiByZXM7XG4gIH0gZWxzZSB7XG4gICAgZm9ybXMuZm9yRWFjaChmb3JtID0+IHtcbiAgICAgIGNvbnN0IGZLZXlzOiBzdHJpbmdbXSA9IE9iamVjdC5rZXlzKGZvcm0pO1xuICAgICAgY29uc3Qgbm9SZXBlYXRpbmdGaWVsZHM6IHN0cmluZ1tdID0gZktleXMuZmlsdGVyKGZrZXkgPT4ge1xuICAgICAgICBjb25zdCBzcGxpdHRlZEtleTogc3RyaW5nW10gPSBma2V5LnNwbGl0KCdfXycpO1xuICAgICAgICBpZiAoc3BsaXR0ZWRLZXkubGVuZ3RoID09PSAyKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSk7XG4gICAgICBjb25zdCBub1JlcEZvcm06IEZvcm0gPSB7fTtcblxuICAgICAgbm9SZXBlYXRpbmdGaWVsZHMuZm9yRWFjaChmaWVsZCA9PiB7XG4gICAgICAgIG5vUmVwRm9ybVtmaWVsZF0gPSBmb3JtW2ZpZWxkXTtcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBtYWluRm9ybTogTWFpbkZvcm0gPSB7Li4ubm9SZXBGb3JtLCByZXBzOiB7c2xpZGU6IFtdfX07XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IE1BWF9SRVBTOyBpKyspIHtcbiAgICAgICAgY29uc3QgY3VycmVudFNsaWRlOiBGb3JtID0ge307XG4gICAgICAgIGNvbnN0IG9ubHlDdXJyZW50SW5zdGFuY2VLZXlzOiBzdHJpbmdbXSA9IGZLZXlzLmZpbHRlcihma2V5ID0+IHtcbiAgICAgICAgICBjb25zdCBzcGxpdHRlZEtleTogc3RyaW5nW10gPSBma2V5LnNwbGl0KCdfXycpO1xuICAgICAgICAgIGlmIChzcGxpdHRlZEtleS5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgICAgIHJldHVybiBma2V5LmluZGV4T2YoYF9fJHtpfWApID4gLTE7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIHNlIGlsIG51bWVybyBkaSBhdHRyaWJ1dGkgY29pbmNpZGUgaWwgZm9ybSBkYXRhIG5vbiBoYSByZXBlYXRpbmdzbGlkZXNcbiAgICAgICAgaWYgKG9ubHlDdXJyZW50SW5zdGFuY2VLZXlzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIG1haW5Gb3JtWydhamZfcmVwX2NvdW50J10gPSBpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIG9ubHlDdXJyZW50SW5zdGFuY2VLZXlzLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgICBjb25zdCBzcGxpdHRlZEtleSA9IGtleS5zcGxpdCgnX18nKTtcbiAgICAgICAgICBjb25zdCBmaWVsZE5hbWUgPSBzcGxpdHRlZEtleVswXTtcbiAgICAgICAgICBjb25zdCBzbGlkZUluc3RhbmNlID0gc3BsaXR0ZWRLZXlbMV0gIT0gbnVsbCA/ICtzcGxpdHRlZEtleVsxXSA6IG51bGw7XG4gICAgICAgICAgY3VycmVudFNsaWRlW2ZpZWxkTmFtZV0gPSBmb3JtW2tleV07XG4gICAgICAgICAgY3VycmVudFNsaWRlWydhamZfcmVwJ10gPSBzbGlkZUluc3RhbmNlICE9IG51bGwgPyBzbGlkZUluc3RhbmNlIDogY3VycmVudFNsaWRlWydhamZfcmVwJ107XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAob25seUN1cnJlbnRJbnN0YW5jZUtleXMubGVuZ3RoICE9IDApIHtcbiAgICAgICAgICBtYWluRm9ybS5yZXBzIVsnc2xpZGUnXS5wdXNoKGN1cnJlbnRTbGlkZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbWFpbkZvcm0ucmVwcyA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmVzLnB1c2gobWFpbkZvcm0pO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHJlcztcbiAgfVxufVxuXG4vKipcbiAqIFVUSUxJVFkgRlVOQ0lPTlxuICogVGhpcyBmdW5jdGlvbiB0YWtlIGFuIGFqZiBzY2hlbWEgYXMgaW5wdXQgYW5kIGV4dHJhY3QgYVxuICogZGljdCB0aGF0IG1hdGNoIGVhY2ggY2hvaWNlIHZhbHVlIChhbHNvIHdpdGggY2hvaWNlc09yaWdpbiBuYW1lIHByZWZpeCkgd2l0aCBpdHMgbGFiZWxcbiAqIEBwYXJhbSBzY2hlbWEgdGhlIGFqZiBzY2hlbWFcbiAqIEByZXR1cm5zIEEgZGljdCB3aXRoOlxuICogIHtbY2hvaWNlc09yaWdpbk5hbWVfY2hvaWNlVmFsdWU6IHN0cmluZ106IFtjaG9pY2VMYWJlbDogc3RyaW5nXX1cbiAqICB7W2Nob2ljZVZhbHVlOiBzdHJpbmddOiBbY2hvaWNlTGFiZWw6IHN0cmluZ119XG4gKi9cbmZ1bmN0aW9uIGV4dHJhY3RMYWJlbHNCeVNjaGVtYUNob2ljZXMoc2NoZW1hOiBhbnkpOiB7W2Nob2ljZVZhbHVlOiBzdHJpbmddOiBzdHJpbmd9IHtcbiAgY29uc3QgY2hvaWNlTGFiZWxzOiB7W2Nob2ljZVZhbHVlOiBzdHJpbmddOiBzdHJpbmd9ID0ge307XG4gIGlmIChzY2hlbWEgJiYgc2NoZW1hLmNob2ljZXNPcmlnaW5zICE9IG51bGwpIHtcbiAgICAoc2NoZW1hLmNob2ljZXNPcmlnaW5zIGFzIGFueVtdKS5mb3JFYWNoKGNob2ljZXNPcmlnaW4gPT4ge1xuICAgICAgaWYgKGNob2ljZXNPcmlnaW4gIT0gbnVsbCAmJiBjaG9pY2VzT3JpZ2luLmNob2ljZXMgIT0gbnVsbCkge1xuICAgICAgICAoY2hvaWNlc09yaWdpbi5jaG9pY2VzIGFzIGFueVtdKS5mb3JFYWNoKGNob2ljZSA9PiB7XG4gICAgICAgICAgY2hvaWNlTGFiZWxzW2Nob2ljZXNPcmlnaW4ubmFtZSArICdfJyArIGNob2ljZS52YWx1ZV0gPSBjaG9pY2UubGFiZWw7XG4gICAgICAgICAgY2hvaWNlTGFiZWxzW2Nob2ljZS52YWx1ZV0gPSBjaG9pY2UubGFiZWw7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIHJldHVybiBjaG9pY2VMYWJlbHM7XG59XG5cbi8qKlxuICogVVRJTElUWSBGVU5DSU9OXG4gKiBUaGlzIGZ1bmN0aW9uIHRha2UgYW4gYWpmIHNjaGVtYSBhcyBpbnB1dCBhbmQgZXh0cmFjdCBhIG9uZVxuICogZGltZW5zaW9uYWwgYXJyYXkgb2YgQWpmTm9kZSBmb3IgZWFjaCBzbGlkZSdzIGZpZWxkXG4gKlxuICogQHBhcmFtIHNjaGVtYSB0aGUgYWpmIHNjaGVtYVxuICogQHJldHVybnMgQW4gb2JqZWN0IHdpdGggYWxsIGZpZWxkczpcbiAqICB7W2ZpZWxkTmFtZTogc3RyaW5nXTogYWpmIGZpZWxkfVxuICovXG5mdW5jdGlvbiBleHRyYWN0RmxhdHRlbk5vZGVzKHNjaGVtYTogYW55KToge1tmaWVsZDogc3RyaW5nXTogYW55fSB7XG4gIGNvbnN0IGZpZWxkTm9kZXM6IHtbZmllbGQ6IHN0cmluZ106IGFueX0gPSB7fTtcbiAgaWYgKHNjaGVtYSAmJiBzY2hlbWEubm9kZXMpIHtcbiAgICBjb25zdCBzbGlkZXM6IGFueVtdID0gc2NoZW1hLm5vZGVzLmZpbHRlcihcbiAgICAgIChub2RlOiBhbnkpID0+IG5vZGUubm9kZVR5cGUgPT09IDMgfHwgbm9kZS5ub2RlVHlwZSA9PT0gNCxcbiAgICApO1xuICAgIHNsaWRlcy5mb3JFYWNoKHNsaWRlID0+IHtcbiAgICAgIHNsaWRlLm5vZGVzXG4gICAgICAgIC5maWx0ZXIoKG5vZGU6IGFueSkgPT4gbm9kZS5ub2RlVHlwZSA9PT0gMClcbiAgICAgICAgLmZvckVhY2goKGZpZWxkTm9kZTogYW55KSA9PiB7XG4gICAgICAgICAgZmllbGROb2Rlc1tmaWVsZE5vZGUubmFtZV0gPSBmaWVsZE5vZGU7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9XG4gIHJldHVybiBmaWVsZE5vZGVzO1xufVxuXG4vKipcbiAqIFJldHVybnMgYSBjbG9uZSBvZiBmb3Jtcywgd2hlcmUgdGhlIHNwZWNpZmllZCBmaWVsZHMgYXJlIHJlcGxhY2VkIGJ5IHRoZSBjb3JyZXNwb25kaW5nIGxhYmVscyxcbiAqIGFzIGRlZmluZWQgYnkgdGhlIGNob2ljZSBvcmlnaW5zIGluIHNjaGVtYS5cbiAqXG4gKiBAcGFyYW0ge01haW5Gb3JtW119IGZvcm1MaXN0XG4gKiBAcGFyYW0geyp9IHNjaGVtYSB0aGUgYWpmIHNjaGVtYVxuICogQHBhcmFtIHtzdHJpbmdbXX0gZmllbGROYW1lc1xuICogQHJldHVybiB7Kn0gIHtNYWluRm9ybVtdfVxuICovXG5leHBvcnQgZnVuY3Rpb24gQVBQTFlfTEFCRUxTKGZvcm1MaXN0OiBNYWluRm9ybVtdLCBzY2hlbWE6IGFueSwgZmllbGROYW1lczogc3RyaW5nW10pOiBNYWluRm9ybVtdIHtcbiAgZm9ybUxpc3QgPSBjbG9uZU1haW5Gb3Jtcyhmb3JtTGlzdCk7XG4gIGNvbnN0IGNob2ljZUxhYmVsczoge1tmaWVsZE5hbWU6IHN0cmluZ106IHN0cmluZ30gPSBleHRyYWN0TGFiZWxzQnlTY2hlbWFDaG9pY2VzKHNjaGVtYSk7XG4gIGNvbnN0IGZsYXR0ZW5Ob2RlcyA9IGV4dHJhY3RGbGF0dGVuTm9kZXMoc2NoZW1hKTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGZvcm1MaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGZvcm1MaXN0W2ldID09IG51bGwpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBpZiAoZm9ybUxpc3RbaV0ucmVwcyAhPSBudWxsKSB7XG4gICAgICBjb25zdCBmID0gZm9ybUxpc3RbaV07XG4gICAgICBjb25zdCBmS2V5czogc3RyaW5nW10gPSBPYmplY3Qua2V5cyhmKTtcbiAgICAgIGZLZXlzLmZvckVhY2goZmtleSA9PiB7XG4gICAgICAgIGNvbnN0IGZpZWxkTm9kZSA9IGZsYXR0ZW5Ob2Rlc1tma2V5XTtcbiAgICAgICAgY29uc3QgY2hvaWNlT3JpZ2luTmFtZVByZWZpeCA9XG4gICAgICAgICAgZmllbGROb2RlICYmIGZpZWxkTm9kZS5jaG9pY2VzT3JpZ2luUmVmID8gZmllbGROb2RlLmNob2ljZXNPcmlnaW5SZWYgKyAnXycgOiAnJztcblxuICAgICAgICBpZiAoZmllbGROYW1lcy5pbmNsdWRlcyhma2V5KSAmJiBmW2ZrZXldICE9PSBudWxsKSB7XG4gICAgICAgICAgbGV0IGNob2ljZVZhbHVlOiBzdHJpbmdbXSA9IFtdO1xuICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGZbZmtleV0pKSB7XG4gICAgICAgICAgICBjaG9pY2VWYWx1ZSA9IGZbZmtleV0gYXMgdW5rbm93biBhcyBzdHJpbmdbXTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgbXVsdGlwbGVWYWxzID0gKGZbZmtleV0gYXMgc3RyaW5nKS5zcGxpdCgnLCcpLm1hcCh2ID0+IHYudHJpbSgpKTtcbiAgICAgICAgICAgIGlmIChtdWx0aXBsZVZhbHMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICBjaG9pY2VWYWx1ZSA9IG11bHRpcGxlVmFscztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGNob2ljZVZhbHVlID0gW2ZbZmtleV0gYXMgc3RyaW5nXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGNob2ljZVZhbHVlICE9IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnN0IGxhYmVscyA9IGNob2ljZVZhbHVlLm1hcCh2YWwgPT4ge1xuICAgICAgICAgICAgICBjb25zdCB2YWxXaXRoUHJlZml4ID0gY2hvaWNlT3JpZ2luTmFtZVByZWZpeCArIHZhbDtcbiAgICAgICAgICAgICAgcmV0dXJuIGNob2ljZUxhYmVsc1t2YWxXaXRoUHJlZml4XSAhPSBudWxsXG4gICAgICAgICAgICAgICAgPyBjaG9pY2VMYWJlbHNbdmFsV2l0aFByZWZpeF1cbiAgICAgICAgICAgICAgICA6IGNob2ljZUxhYmVsc1t2YWxdICE9IG51bGxcbiAgICAgICAgICAgICAgICA/IGNob2ljZUxhYmVsc1t2YWxdXG4gICAgICAgICAgICAgICAgOiB2YWw7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChsYWJlbHMgJiYgbGFiZWxzLmxlbmd0aCkge1xuICAgICAgICAgICAgICBjb25zdCBsYWJlbEZpZWxkTmFtZSA9IGZrZXkgKyAnX2Nob2ljZXNMYWJlbCc7XG4gICAgICAgICAgICAgIGZvcm1MaXN0W2ldW2xhYmVsRmllbGROYW1lXSA9IGxhYmVscy5sZW5ndGggPiAxID8gbGFiZWxzLmpvaW4oJywgJykgOiBsYWJlbHNbMF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZvcm1MaXN0O1xufVxuXG4vKipcbiAqIERlcHJlY2F0ZWQuIFVzZSBGSUxURVJfQllcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIEZJTFRFUl9CWV9WQVJTKGZvcm1MaXN0OiBNYWluRm9ybVtdLCBleHByZXNzaW9uOiBzdHJpbmcpOiBNYWluRm9ybVtdIHtcbiAgcmV0dXJuIEZJTFRFUl9CWShmb3JtTGlzdCwgZXhwcmVzc2lvbik7XG59XG5cbi8qKlxuICogUmV0dXJucyBhIGNvcHkgb2YgZm9ybXMgYW5kIGl0cyByZXBldGl0aW9ucywga2VlcGluZyBvbmx5IHRoZSBvbmVzIGZvciB3aGljaCBleHByZXNzaW9uIGV2YWx1YXRlcyB0byB0cnVlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gRklMVEVSX0JZKGZvcm1zOiBNYWluRm9ybVtdLCBleHByZXNzaW9uOiBGdW5jfHN0cmluZyk6IE1haW5Gb3JtW10ge1xuICBmb3JtcyA9IGZvcm1zIHx8IFtdO1xuICBpZiAoZXhwcmVzc2lvbiA9PT0gJ3RydWUnKSB7XG4gICAgcmV0dXJuIGNsb25lTWFpbkZvcm1zKGZvcm1zKTtcbiAgfVxuICBpZiAodHlwZW9mKGV4cHJlc3Npb24pID09PSAnc3RyaW5nJykge1xuICAgIGV4cHJlc3Npb24gPSBjcmVhdGVGdW5jdGlvbihleHByZXNzaW9uKTtcbiAgfVxuICBjb25zdCByZXM6IE1haW5Gb3JtW10gPSBbXTtcbiAgZm9yIChsZXQgZm9ybSBvZiBmb3Jtcy5maWx0ZXIoZiA9PiBmICE9IG51bGwpKSB7XG4gICAgZm9ybSA9IHsuLi5mb3JtfTtcbiAgICBjb25zdCBmaWx0ZXJlZFJlcHM6IEluc3RhbmNlcyA9IHt9O1xuICAgIGxldCBzb21lUmVwcyA9IGZhbHNlO1xuICAgIGlmIChmb3JtLnJlcHMgIT0gbnVsbCkge1xuICAgICAgZm9yIChjb25zdCBrZXkgaW4gZm9ybS5yZXBzKSB7XG4gICAgICAgIGZpbHRlcmVkUmVwc1trZXldID0gZm9ybS5yZXBzW2tleV0uZmlsdGVyKHJlcCA9PlxuICAgICAgICAgIChleHByZXNzaW9uIGFzIEZ1bmMpKHsuLi5mb3JtLCAuLi5yZXB9KVxuICAgICAgICApO1xuICAgICAgICBmb3JtW2BhamZfJHtrZXl9X2NvdW50YF0gPSBmaWx0ZXJlZFJlcHNba2V5XS5sZW5ndGg7XG4gICAgICAgIHNvbWVSZXBzIHx8PSBmaWx0ZXJlZFJlcHNba2V5XS5sZW5ndGggPiAwO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoc29tZVJlcHMgfHwgZXhwcmVzc2lvbihmb3JtKSkge1xuICAgICAgZm9ybS5yZXBzID0gZmlsdGVyZWRSZXBzO1xuICAgICAgcmVzLnB1c2goZm9ybSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXM7XG59XG5cbi8qKlxuICogUmV0dXJucyB0b2RheSdzIGRhdGUuXG4gKlxuICogQGV4cG9ydFxuICogQHBhcmFtIHtzdHJpbmd9IFtmb3JtYXQ9J3l5eXktTU0tZGQnXVxuICogQHJldHVybiB7Kn0gIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBUT0RBWShmb3JtYXQgPSAneXl5eS1NTS1kZCcpOiBzdHJpbmcge1xuICByZXR1cm4gZGF0ZUZucy5mb3JtYXQobmV3IERhdGUoKSwgZm9ybWF0KTtcbn1cblxuLyoqXG4gKiBMb2dzIHZhbCB0byB0aGUgY29uc29sZS5cbiAqIFxuICogQGV4cG9ydFxuICogQHBhcmFtIHsqfSB2YWxcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIENPTlNPTEVfTE9HKHZhbDogYW55KTogdm9pZCB7XG4gIGNvbnNvbGUubG9nKHZhbCk7XG59XG5cbi8qKlxuICogQ29tcHV0ZXMgdGhlIGN1cnJlbnQgYWdlIGluIHllYXJzLCBnaXZlbiB0aGUgZGF0ZSBvZiBiaXJ0aC5cbiAqXG4gKiBAZXhwb3J0XG4gKiBAcGFyYW0geyhzdHJpbmcgfCBudWxsKX0gZG9iXG4gKiBAcmV0dXJuIHsqfSAge251bWJlcn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIEdFVF9BR0UoZG9iOiBzdHJpbmcgfCBudWxsKTogbnVtYmVyIHtcbiAgaWYgKGRvYiA9PSBudWxsKSB7XG4gICAgcmV0dXJuIE5hTjtcbiAgfVxuICByZXR1cm4gZGF0ZUZucy5kaWZmZXJlbmNlSW5ZZWFycyhuZXcgRGF0ZSgpLCBuZXcgRGF0ZShkb2IpKTtcbn1cblxuLyoqXG4gKiBJZiBkYXRhIGlzIGEgZm9ybSB3aXRoIHJlcGV0aXRpb25zLCByZXR1cm5zIHRoZSBudW1iZXIgb2YgcmVwZXRpdGlvbnM7XG4gKiBJZiBkYXRhIGlzIGFuIGFycmF5LCByZXR1cm5zIGl0cyBsZW5ndGg7XG4gKiBPdGhlcndpc2UgcmV0dXJucyAwLlxuICpcbiAqIEBleHBvcnRcbiAqIEBwYXJhbSB7KE1haW5Gb3JtIHwgYW55W10pfSBkYXRhc2V0XG4gKiBAcmV0dXJuIHsqfSAge251bWJlcn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIExFTihkYXRhc2V0OiBNYWluRm9ybSB8IGFueVtdKTogbnVtYmVyIHtcbiAgaWYgKGRhdGFzZXQgPT0gbnVsbCkge1xuICAgIHJldHVybiAwO1xuICB9XG4gIGNvbnN0IGZvcm0gPSBkYXRhc2V0IGFzIE1haW5Gb3JtO1xuICBpZiAoZm9ybS5yZXBzICE9IG51bGwpIHtcbiAgICByZXR1cm4gYWxsUmVwcyhmb3JtKS5sZW5ndGg7XG4gIH1cbiAgcmV0dXJuIChkYXRhc2V0IGFzIGFueVtdKS5sZW5ndGggfHwgMDtcbn1cblxuLyoqXG4gKiBBcnJheSBjb25jYXRlbmF0aW9uLlxuICpcbiAqIEBleHBvcnRcbiAqIEBwYXJhbSB7YW55W119IGFcbiAqIEBwYXJhbSB7YW55W119IGJcbiAqIEByZXR1cm4geyp9ICB7YW55W119XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBDT05DQVQoYTogYW55W10sIGI6IGFueVtdKTogYW55W10ge1xuICByZXR1cm4gYS5jb25jYXQoYik7XG59XG5cbi8qKlxuICogUmVtb3ZlcyBkdXBsaWNhdGUgZWxlbWVudHMgZnJvbSBhbiBhcnJheS5cbiAqXG4gKiBAZXhwb3J0XG4gKiBAcGFyYW0ge2FueVtdfSBhcnJcbiAqIEByZXR1cm4geyp9ICB7YW55W119XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBSRU1PVkVfRFVQTElDQVRFUyhhcnI6IGFueVtdKTogYW55W10ge1xuICByZXR1cm4gWy4uLm5ldyBNYXAoYXJyLm1hcCh2ID0+IFtKU09OLnN0cmluZ2lmeSh2KSwgdl0pKS52YWx1ZXMoKV07XG59XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIGRhdGUgaXMgYmVmb3JlIGRhdGVUb0NvbXBhcmUuXG4gKlxuICogQGV4cG9ydFxuICogQHBhcmFtIHtzdHJpbmd9IGRhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBkYXRlVG9Db21wYXJlXG4gKiBAcmV0dXJuIHsqfSAge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBJU19CRUZPUkUoZGF0ZTogc3RyaW5nLCBkYXRlVG9Db21wYXJlOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgY29uc3QgZGF0ZUE6IERhdGUgPSBkYXRlRm5zLnBhcnNlSVNPKGRhdGUpO1xuICBjb25zdCBkYXRlQjogRGF0ZSA9IGRhdGVGbnMucGFyc2VJU08oZGF0ZVRvQ29tcGFyZSk7XG4gIHJldHVybiBkYXRlRm5zLmlzQmVmb3JlKGRhdGVBLCBkYXRlQik7XG59XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIGRhdGUgaXMgYWZ0ZXIgZGF0ZVRvQ29tcGFyZS5cbiAqXG4gKiBAZXhwb3J0XG4gKiBAcGFyYW0ge3N0cmluZ30gZGF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IGRhdGVUb0NvbXBhcmVcbiAqIEByZXR1cm4geyp9ICB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIElTX0FGVEVSKGRhdGU6IHN0cmluZywgZGF0ZVRvQ29tcGFyZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gIGNvbnN0IGRhdGVBOiBEYXRlID0gZGF0ZUZucy5wYXJzZUlTTyhkYXRlKTtcbiAgY29uc3QgZGF0ZUI6IERhdGUgPSBkYXRlRm5zLnBhcnNlSVNPKGRhdGVUb0NvbXBhcmUpO1xuICByZXR1cm4gZGF0ZUZucy5pc0FmdGVyKGRhdGVBLCBkYXRlQik7XG59XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIGRhdGUgaXMgYmV0d2VlbiBkYXRlU3RhcnQgYW5kIGRhdGVFbmQuXG4gKlxuICogQGV4cG9ydFxuICogQHBhcmFtIHtzdHJpbmd9IGRhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBkYXRlU3RhcnRcbiAqIEBwYXJhbSB7c3RyaW5nfSBkYXRlRW5kXG4gKiBAcmV0dXJuIHsqfSAge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBJU19XSVRISU5fSU5URVJWQUwoZGF0ZTogc3RyaW5nLCBkYXRlU3RhcnQ6IHN0cmluZywgZGF0ZUVuZDogc3RyaW5nKTogYm9vbGVhbiB7XG4gIGNvbnN0IGRhdGVUb0NvbXBhcmU6IERhdGUgPSBkYXRlRm5zLnBhcnNlSVNPKGRhdGUpO1xuICBjb25zdCBpbnRlcnZhbDogSW50ZXJ2YWwgPSB7XG4gICAgc3RhcnQ6IGRhdGVGbnMucGFyc2VJU08oZGF0ZVN0YXJ0KSxcbiAgICBlbmQ6IGRhdGVGbnMucGFyc2VJU08oZGF0ZUVuZCksXG4gIH07XG4gIHJldHVybiBkYXRlRm5zLmlzV2l0aGluSW50ZXJ2YWwoZGF0ZVRvQ29tcGFyZSwgaW50ZXJ2YWwpO1xufVxuXG4vKipcbiAqIENvbXBhcmVzIGRhdGUgd2l0aCBhbiBpbnRlcnZhbC5cbiAqIFJldHVybnMgJy0xJyAob3IgdGhlIGZpcnN0IGVsZW1lbnQgb2YgbGFiZWxzKSBpZiBkYXRlIGlzIGJlZm9yZSBkYXRlU3RhcnQsXG4gKiAnMCcgKG9yIHRoZSBzZWNvbmQgZWxlbWVudCkgaWYgZGF0ZSBpcyBiZXR3ZWVuIGRhdGVTdGFydCBhbmQgZGF0ZUVuZCxcbiAqICcxJyAob3IgdGhlIHRoaXJkIGVsZW1lbnQpIGlmIGRhdGUgaXMgYWZ0ZXIgZGF0ZUVuZC5cbiAqXG4gKiBAZXhwb3J0XG4gKiBAcGFyYW0ge3N0cmluZ30gZGF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IGRhdGVTdGFydFxuICogQHBhcmFtIHtzdHJpbmd9IGRhdGVFbmRcbiAqIEBwYXJhbSB7c3RyaW5nW119IGxhYmVscyBhbiBvcHRpb25hbCBhcnJheSBvZiBzdHJpbmcgZm9yIHRoZSBvdXRwdXQgdmFsdWVzXG4gKiBAcmV0dXJuIHsqfSAge3N0cmluZ31cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIENPTVBBUkVfREFURShcbiAgZGF0ZTogc3RyaW5nLFxuICBkYXRlU3RhcnQ6IHN0cmluZyxcbiAgZGF0ZUVuZDogc3RyaW5nLFxuICBsYWJlbHM/OiBzdHJpbmdbXSxcbik6IHN0cmluZyB7XG4gIGNvbnN0IGRhdGVUb0NvbXBhcmU6IERhdGUgPSBkYXRlRm5zLnBhcnNlSVNPKGRhdGUpO1xuICBjb25zdCBkYXRlQTogRGF0ZSA9IGRhdGVGbnMucGFyc2VJU08oZGF0ZVN0YXJ0KTtcbiAgY29uc3QgZGF0ZUI6IERhdGUgPSBkYXRlRm5zLnBhcnNlSVNPKGRhdGVFbmQpO1xuICBjb25zdCBpbnRlcnZhbDogSW50ZXJ2YWwgPSB7XG4gICAgc3RhcnQ6IGRhdGVBLFxuICAgIGVuZDogZGF0ZUIsXG4gIH07XG4gIGlmIChsYWJlbHMgPT0gbnVsbCkge1xuICAgIGxhYmVscyA9IFsnLTEnLCAnMCcsICcxJ107XG4gIH1cbiAgaWYgKGRhdGVGbnMuaXNCZWZvcmUoZGF0ZVRvQ29tcGFyZSwgZGF0ZUEpKSB7XG4gICAgcmV0dXJuIGxhYmVsc1swXTtcbiAgfVxuICBpZiAoZGF0ZUZucy5pc1dpdGhpbkludGVydmFsKGRhdGVUb0NvbXBhcmUsIGludGVydmFsKSkge1xuICAgIHJldHVybiBsYWJlbHNbMV07XG4gIH1cbiAgaWYgKGRhdGVGbnMuaXNBZnRlcihkYXRlVG9Db21wYXJlLCBkYXRlQikpIHtcbiAgICByZXR1cm4gbGFiZWxzWzJdO1xuICB9XG4gIHJldHVybiAnJztcbn1cblxuLyoqXG4gKiBQZXJmb3JtcyBhIGxlZnQgam9pbiBvZiBmb3Jtc0EgYW5kIGZvcm1zQi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIEpPSU5fRk9STVMoXG4gIGZvcm1zQTogKE1haW5Gb3JtIHwgRm9ybSlbXSxcbiAgZm9ybXNCOiAoTWFpbkZvcm0gfCBGb3JtKVtdLFxuICBrZXlBOiBzdHJpbmcsXG4gIGtleUI/OiBzdHJpbmcsXG4pOiAoTWFpbkZvcm0gfCBGb3JtKVtdIHtcbiAgcmV0dXJuIEpPSU5fUkVQRUFUSU5HX1NMSURFUyhmb3Jtc0EsIGZvcm1zQiwga2V5QSwga2V5QiBhcyBhbnksIG51bGwgYXMgYW55KTtcbn1cblxuLyoqXG4gKiBQZXJmb3JtcyBhIGxlZnQgam9pbiBvZiBmb3Jtc0EgYW5kIGZvcm1zQiwgbGlrZSBKT0lOX0ZPUk1TLlxuICogSW4gYWRkaXRpb24sIGZvciBlYWNoIG1hdGNoaW5nIHBhaXIgb2YgZm9ybUEgYW5kIGZvcm1CLCB0aGVpciByZXBlYXRpbmcgc2xpZGVzIGFyZSBhbHNvIGpvaW5lZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIEpPSU5fUkVQRUFUSU5HX1NMSURFUyhcbiAgZm9ybXNBOiBNYWluRm9ybVtdLFxuICBmb3Jtc0I6IE1haW5Gb3JtW10sXG4gIGtleUE6IHN0cmluZyxcbiAga2V5Qjogc3RyaW5nLFxuICBzdWJrZXlBOiBzdHJpbmcsXG4gIHN1YmtleUI/OiBzdHJpbmcsXG4pOiBNYWluRm9ybVtdIHtcbiAgZm9ybXNBID0gY2xvbmVNYWluRm9ybXMoZm9ybXNBIHx8IFtdKTtcbiAgZm9ybXNCID0gY2xvbmVNYWluRm9ybXMoZm9ybXNCIHx8IFtdKTtcbiAgaWYgKGtleUIgPT0gbnVsbCkge1xuICAgIGtleUIgPSBrZXlBO1xuICB9XG4gIGlmIChzdWJrZXlCID09IG51bGwpIHtcbiAgICBzdWJrZXlCID0gc3Via2V5QTtcbiAgfVxuICBjb25zdCBpbmRleEI6IHtbdmFsOiBzdHJpbmddOiBNYWluRm9ybX0gPSB7fTtcbiAgZm9yIChsZXQgaSA9IGZvcm1zQi5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgIGNvbnN0IHZhbCA9IGZvcm1zQltpXSAmJiBmb3Jtc0JbaV1ba2V5Ql07XG4gICAgaWYgKHZhbCAhPSBudWxsKSB7XG4gICAgICBpbmRleEJbU3RyaW5nKHZhbCldID0gZm9ybXNCW2ldO1xuICAgIH1cbiAgfVxuICBjb25zdCByZXM6IE1haW5Gb3JtW10gPSBbXTtcbiAgZm9yIChjb25zdCBmb3JtQSBvZiBmb3Jtc0EpIHtcbiAgICBjb25zdCB2YWwgPSBmb3JtQSAmJiBmb3JtQVtrZXlBXTtcbiAgICBjb25zdCBmb3JtQiA9IGluZGV4QltTdHJpbmcodmFsKV07XG4gICAgaWYgKHZhbCA9PSBudWxsIHx8IGZvcm1CID09IG51bGwpIHtcbiAgICAgIHJlcy5wdXNoKGZvcm1BKTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBjb25zdCByZXBzQSA9IGZvcm1BLnJlcHMgfHwge307XG4gICAgY29uc3QgcmVwc0IgPSBmb3JtQi5yZXBzIHx8IHt9O1xuICAgIGlmIChzdWJrZXlBICE9IG51bGwpIHtcbiAgICAgIGNvbnN0IGFsbFJlcHNCID0gYWxsUmVwcyhmb3JtQik7XG4gICAgICBmb3IgKGNvbnN0IGsgaW4gcmVwc0EpIHtcbiAgICAgICAgcmVwc0Fba10gPSBKT0lOX0ZPUk1TKHJlcHNBW2tdLCBhbGxSZXBzQiwgc3Via2V5QSwgc3Via2V5QikgYXMgRm9ybVtdO1xuICAgICAgICBmb3JtQVtgYWpmXyR7a31fY291bnRgXSA9IHJlcHNBW2tdLmxlbmd0aDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmVzLnB1c2goey4uLmZvcm1CLCAuLi5mb3JtQSwgcmVwczogey4uLnJlcHNCLCAuLi5yZXBzQX19KTtcbiAgfVxuICByZXR1cm4gcmVzO1xufVxuXG4vKipcbiAqIFJldHVybnMgdGhlIGFycmF5IG9idGFpbmVkIGJ5IGV2YWx1YXRpbmcgZXhwcmVzc2lvbiBmb3IgZXZlcnkgcmVwZXRpdGlvbiBvZiBmb3JtLlxuICpcbiAqIEBleHBvcnRcbiAqIEBwYXJhbSB7TWFpbkZvcm19IGZvcm1cbiAqIEBwYXJhbSB7c3RyaW5nfSBleHByZXNzaW9uXG4gKiBAcmV0dXJuIHsqfSAge2FueVtdfVxuICovXG5leHBvcnQgZnVuY3Rpb24gRlJPTV9SRVBTKGZvcm06IE1haW5Gb3JtLCBleHByZXNzaW9uOiBGdW5jfHN0cmluZyk6IGFueVtdIHtcbiAgaWYgKHR5cGVvZihleHByZXNzaW9uKSA9PT0gJ3N0cmluZycpIHtcbiAgICBleHByZXNzaW9uID0gY3JlYXRlRnVuY3Rpb24oZXhwcmVzc2lvbik7XG4gIH1cbiAgcmV0dXJuIGFsbFJlcHMoZm9ybSB8fCB7fSkubWFwKHJlcCA9PlxuICAgIChleHByZXNzaW9uIGFzIEZ1bmMpKHsuLi5mb3JtLCAuLi5yZXB9KVxuICApO1xufVxuXG4vKipcbiAqIERlcHJlY2F0ZWQuIFVzZSBJTkNMVURFU1xuICovXG5leHBvcnQgZnVuY3Rpb24gSVNJTihkYXRhc2V0OiBhbnlbXSwgdmFsdWU6IGFueSk6IGJvb2xlYW4ge1xuICBpZiAoZGF0YXNldCA9PSBudWxsIHx8IHZhbHVlID09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIGRhdGFzZXQuaW5kZXhPZih2YWx1ZSkgPj0gMDtcbn1cblxuLyoqXG4gKiBBcHBsaWVzIHRoZSBvcGVyYXRvciB0byBldmVyeSBwYWlyIG9mIGVsZW1lbnRzIChhcnJheUFbaV0sIGFycmF5QltpXSksXG4gKiByZXR1cm5pbmcgdGhlIGFycmF5IG9mIHJlc3VsdHMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBPUChhcnJheUE6IGFueVtdLCBhcnJheUI6IGFueVtdLCBvcGVyYXRvcjogKChhOiBhbnksIGI6IGFueSkgPT4gYW55KXxzdHJpbmcpOiBhbnlbXSB7XG4gIGlmICh0eXBlb2Yob3BlcmF0b3IpID09PSAnc3RyaW5nJykge1xuICAgIGNvbnN0IGZ1bmMgPSBjcmVhdGVGdW5jdGlvbihvcGVyYXRvcik7XG4gICAgb3BlcmF0b3IgPSAoZWxlbUEsIGVsZW1CKSA9PiBmdW5jKHtlbGVtQSwgZWxlbUJ9KTtcbiAgfVxuICBjb25zdCByZXM6IGFueVtdID0gW107XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgTWF0aC5taW4oYXJyYXlBLmxlbmd0aCwgYXJyYXlCLmxlbmd0aCk7IGkrKykge1xuICAgIGNvbnN0IHZhbCA9IG9wZXJhdG9yKGFycmF5QVtpXSwgYXJyYXlCW2ldKTtcbiAgICByZXMucHVzaCh2YWwpO1xuICB9XG4gIHJldHVybiByZXM7XG59XG5cbi8qKlxuICogR2l2ZW4gYW4gYXJyYXkgb2YgdmFsdWVzLCByZXR1cm5zIHRoZSBjb3JyZXNwb25kaW5nIGFycmF5IG9mIGxhYmVscyxcbiAqIGFzIHNwZWNpZmllZCBieSB0aGUgY2hvaWNlcyBvcmlnaW4gaW4gc2NoZW1hLlxuICpcbiAqIEBleHBvcnRcbiAqIEBwYXJhbSB7Kn0gc2NoZW1hXG4gKiBAcGFyYW0ge3N0cmluZ1tdfSB2YWx1ZXNcbiAqIEByZXR1cm4geyp9ICB7c3RyaW5nW119XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBHRVRfTEFCRUxTKHNjaGVtYTogYW55LCB2YWx1ZXM6IHN0cmluZ1tdKTogc3RyaW5nW10ge1xuICBjb25zdCBjaG9pY2VMYWJlbHMgPSBleHRyYWN0TGFiZWxzQnlTY2hlbWFDaG9pY2VzKHNjaGVtYSk7XG4gIHJldHVybiB2YWx1ZXMubWFwKHZhbCA9PiBjaG9pY2VMYWJlbHNbdmFsXSAhPSBudWxsID8gY2hvaWNlTGFiZWxzW3ZhbF0gOiB2YWwpO1xufVxuIl19