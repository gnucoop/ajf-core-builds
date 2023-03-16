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
    if (!expression) {
        return _ => '';
    }
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
export function REPEAT(forms, array, fn, field, filter = 'true') {
    if (typeof (filter) === 'string') {
        filter = createFunction(filter);
    }
    return array.map(current => {
        const currentFilter = (ctx) => filter({ ...ctx, current });
        return fn(forms, field, currentFilter);
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
 * Deprecated. Use IF_THEN_ELSE
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwcmVzc2lvbi11dGlscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvbW9kZWxzL3NyYy91dGlscy9leHByZXNzaW9uLXV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUdILE9BQU8sS0FBSyxPQUFPLE1BQU0sVUFBVSxDQUFDO0FBQ3BDLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxTQUFTLENBQUM7QUFDcEMsT0FBTyxLQUFLLFNBQVMsTUFBTSxRQUFRLENBQUM7QUFJcEMsSUFBSSxXQUFXLEdBQVEsRUFBRSxDQUFDO0FBRTFCLE1BQU0sTUFBTSxHQUFHLFNBQVMsQ0FBQyxPQUFPLElBQUksU0FBUyxDQUFDO0FBWTlDLFNBQVMsT0FBTyxDQUFDLElBQWM7SUFDN0IsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksRUFBRTtRQUNyQixPQUFPLEVBQUUsQ0FBQztLQUNYO0lBQ0QsTUFBTSxJQUFJLEdBQVcsRUFBRSxDQUFDO0lBQ3hCLEtBQUssTUFBTSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtRQUMzQixNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztLQUNqQjtJQUNELE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQztBQUVELE1BQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQztBQUVwQixNQUFNLENBQUMsTUFBTSxrQkFBa0IsR0FBRyxDQUNoQyxNQUFjLEVBQ2QscUJBQThCLEtBQUssRUFDekIsRUFBRTtJQUNaLE1BQU0sV0FBVyxHQUFHLEVBQWMsQ0FBQztJQUNuQyxJQUFJO1FBQ0YsV0FBVyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsRUFBRTtZQUM3QixPQUFPLEVBQUUsQ0FBQyxLQUFL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Q0FBQztJQUMxRCxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2hGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmQ29udGV4dH0gZnJvbSAnQGFqZi9jb3JlL2NvbW1vbic7XG5pbXBvcnQgKiBhcyBkYXRlRm5zIGZyb20gJ2RhdGUtZm5zJztcbmltcG9ydCB7cGFyc2VTY3JpcHR9IGZyb20gJ21lcml5YWgnO1xuaW1wb3J0ICogYXMgbnVtYnJvTW9kIGZyb20gJ251bWJybyc7XG5pbXBvcnQge0FqZlRhYmxlQ2VsbH0gZnJvbSAnQGFqZi9jb3JlL3RhYmxlJztcbmltcG9ydCB7QWpmVmFsaWRhdGlvbkZufSBmcm9tICcuLi9pbnRlcmZhY2UvdmFsaWRhdGlvbi1mdW5jdGlvbic7XG5cbmxldCBleGVjQ29udGV4dDogYW55ID0ge307XG5cbmNvbnN0IG51bWJybyA9IG51bWJyb01vZC5kZWZhdWx0IHx8IG51bWJyb01vZDtcbmV4cG9ydCBpbnRlcmZhY2UgRm9ybSB7XG4gIFtrZXk6IHN0cmluZ106IHN0cmluZyB8IG51bWJlciB8IG51bGw7XG59XG5leHBvcnQgaW50ZXJmYWNlIEluc3RhbmNlcyB7XG4gIFtpbnN0YW5jZTogc3RyaW5nXTogRm9ybVtdO1xufVxuZXhwb3J0IGludGVyZmFjZSBNYWluRm9ybSB7XG4gIFtrZXk6IHN0cmluZ106IHN0cmluZyB8IG51bWJlciB8IGJvb2xlYW4gfCBudWxsIHwgSW5zdGFuY2VzIHwgdW5kZWZpbmVkIHwgbnVsbDtcbiAgcmVwcz86IEluc3RhbmNlcztcbn1cblxuZnVuY3Rpb24gYWxsUmVwcyhmb3JtOiBNYWluRm9ybSk6IEZvcm1bXSB7XG4gIGlmIChmb3JtLnJlcHMgPT0gbnVsbCkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuICBjb25zdCByZXBzOiBGb3JtW10gPSBbXTtcbiAgZm9yIChjb25zdCBrZXkgaW4gZm9ybS5yZXBzKSB7XG4gICAgY29uc3QgciA9IGZvcm0ucmVwc1trZXldO1xuICAgIHJlcHMucHVzaCguLi5yKTtcbiAgfVxuICByZXR1cm4gcmVwcztcbn1cblxuY29uc3QgTUFYX1JFUFMgPSAzMDtcblxuZXhwb3J0IGNvbnN0IGdldENvZGVJZGVudGlmaWVycyA9IChcbiAgc291cmNlOiBzdHJpbmcsXG4gIGluY2x1ZGVEb2xsYXJWYWx1ZTogYm9vbGVhbiA9IGZhbHNlLFxuKTogc3RyaW5nW10gPT4ge1xuICBjb25zdCBpZGVudGlmaWVycyA9IFtdIGFzIHN0cmluZ1tdO1xuICB0cnkge1xuICAgIHBhcnNlU2NyaXB0KHNvdXJjZS50b1N0cmluZygpLCB7XG4gICAgICBvblRva2VuOiAodG9rZW4sIHN0YXJ0LCBlbmQpID0+IHtcbiAgICAgICAgaWYgKHRva2VuID09ICdJZGVudGlmaWVyJykge1xuICAgICAgICAgIGNvbnN0IGlkZW50aWZpZXIgPSBzb3VyY2UudG9TdHJpbmcoKS5zdWJzdHJpbmcoc3RhcnQsIGVuZCk7XG4gICAgICAgICAgaWYgKGluY2x1ZGVEb2xsYXJWYWx1ZSB8fCBpZGVudGlmaWVyICE9PSAnJHZhbHVlJykge1xuICAgICAgICAgICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgfSk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBjb25zb2xlLmxvZyhzb3VyY2UpO1xuICAgIGNvbnNvbGUubG9nKGUpO1xuICB9XG4gIHJldHVybiBpZGVudGlmaWVycy5zb3J0KChpMSwgaTIpID0+IGkyLmxvY2FsZUNvbXBhcmUoaTEpKTtcbn07XG5cbmV4cG9ydCBjb25zdCBkYXRlVXRpbHMgPSB7XG4gIGFkZERheXM6IGRhdGVGbnMuYWRkRGF5cyxcbiAgYWRkTW9udGhzOiBkYXRlRm5zLmFkZE1vbnRocyxcbiAgYWRkWWVhcnM6IGRhdGVGbnMuYWRkWWVhcnMsXG4gIGVuZE9mSVNPV2VlazogZGF0ZUZucy5lbmRPZklTT1dlZWssXG4gIGZvcm1hdDogZGF0ZUZucy5mb3JtYXQsXG4gIGdldERheTogZGF0ZUZucy5nZXREYXksXG4gIHBhcnNlOiBkYXRlRm5zLnBhcnNlSVNPLFxuICBzdGFydE9mTW9udGg6IGRhdGVGbnMuc3RhcnRPZk1vbnRoLFxuICBzdGFydE9mSVNPV2VlazogZGF0ZUZucy5zdGFydE9mSVNPV2VlayxcbiAgaXNCZWZvcmU6IGRhdGVGbnMuaXNCZWZvcmUsXG59O1xuXG5leHBvcnQgY2xhc3MgQWpmRXhwcmVzc2lvblV0aWxzIHtcbiAgLy8gVE9ETyB3aGF0IGlzIGl0IGZvclxuICBzdGF0aWMgVVRJTF9GVU5DVElPTlMgPSAnJztcbiAgLyoqXG4gICAqIEl0IGlzIGEga2V5LXZhbHVlIGRpY3Rpb25hcnksIHRoYXQgbWFwcGluZyBhbGwgQWpmIHZhbGlkYXRpb24gZnVuY3Rpb25zLlxuICAgKi9cbiAgc3RhdGljIHV0aWxzOiB7W25hbWU6IHN0cmluZ106IEFqZlZhbGlkYXRpb25Gbn0gPSB7XG4gICAgZGlnaXRDb3VudDoge2ZuOiBkaWdpdENvdW50fSxcbiAgICBkZWNpbWFsQ291bnQ6IHtmbjogZGVjaW1hbENvdW50fSxcbiAgICBpc0ludDoge2ZuOiBpc0ludH0sXG4gICAgbm90RW1wdHk6IHtmbjogbm90RW1wdHl9LFxuICAgIHZhbHVlSW5DaG9pY2U6IHtmbjogdmFsdWVJbkNob2ljZX0sXG4gICAgc2Nhbkdyb3VwRmllbGQ6IHtmbjogc2Nhbkdyb3VwRmllbGR9LFxuICAgIHN1bToge2ZuOiBzdW19LFxuICAgIGRhdGVPcGVyYXRpb25zOiB7Zm46IGRhdGVPcGVyYXRpb25zfSxcbiAgICByb3VuZDoge2ZuOiByb3VuZH0sXG4gICAgZXh0cmFjdEFycmF5OiB7Zm46IGV4dHJhY3RBcnJheX0sXG4gICAgZXh0cmFjdFN1bToge2ZuOiBleHRyYWN0U3VtfSxcbiAgICBleHRyYWN0QXJyYXlTdW06IHtmbjogZXh0cmFjdEFycmF5U3VtfSxcbiAgICBkcmF3VGhyZXNob2xkOiB7Zm46IGRyYXdUaHJlc2hvbGR9LFxuICAgIGV4dHJhY3REYXRlczoge2ZuOiBleHRyYWN0RGF0ZXN9LFxuICAgIGxhc3RQcm9wZXJ0eToge2ZuOiBsYXN0UHJvcGVydHl9LFxuICAgIHN1bUxhc3RQcm9wZXJ0aWVzOiB7Zm46IHN1bUxhc3RQcm9wZXJ0aWVzfSxcbiAgICBjYWxjdWxhdGVUcmVuZFByb3BlcnR5OiB7Zm46IGNhbGN1bGF0ZVRyZW5kUHJvcGVydHl9LFxuICAgIGNhbGN1bGF0ZVRyZW5kQnlQcm9wZXJ0aWVzOiB7Zm46IGNhbGN1bGF0ZVRyZW5kQnlQcm9wZXJ0aWVzfSxcbiAgICBjYWxjdWxhdGVBdmdQcm9wZXJ0eToge2ZuOiBjYWxjdWxhdGVBdmdQcm9wZXJ0eX0sXG4gICAgY2FsY3VsYXRlQXZnUHJvcGVydHlBcnJheToge2ZuOiBjYWxjdWxhdGVBdmdQcm9wZXJ0eUFycmF5fSxcbiAgICBhbGVydDoge2ZuOiBhbGVydH0sXG4gICAgZm9ybWF0TnVtYmVyOiB7Zm46IGZvcm1hdE51bWJlcn0sXG4gICAgZm9ybWF0RGF0ZToge2ZuOiBmb3JtYXREYXRlfSxcbiAgICBpc29Nb250aDoge2ZuOiBpc29Nb250aH0sXG4gICAgZ2V0Q29vcmRpbmF0ZToge2ZuOiBnZXRDb29yZGluYXRlfSxcbiAgICBNYXRoOiB7Zm46IE1hdGh9LFxuICAgIHBhcnNlSW50OiB7Zm46IHBhcnNlSW50fSxcbiAgICBwYXJzZUZsb2F0OiB7Zm46IHBhcnNlRmxvYXR9LFxuICAgIHBhcnNlRGF0ZToge2ZuOiBkYXRlVXRpbHMucGFyc2V9LFxuICAgIERhdGU6IHtmbjogRGF0ZX0sXG4gICAgcGxhaW5BcnJheToge2ZuOiBwbGFpbkFycmF5fSxcbiAgICBDT1VOVF9GT1JNUzoge2ZuOiBDT1VOVF9GT1JNU30sXG4gICAgQ09VTlRfRk9STVNfVU5JUVVFOiB7Zm46IENPVU5UX0ZPUk1TX1VOSVFVRX0sXG4gICAgQ09VTlRfUkVQUzoge2ZuOiBDT1VOVF9SRVBTfSxcbiAgICBTVU06IHtmbjogU1VNfSxcbiAgICBNRUFOOiB7Zm46IE1FQU59LFxuICAgIFBFUkNFTlQ6IHtmbjogUEVSQ0VOVH0sXG4gICAgTEFTVDoge2ZuOiBMQVNUfSxcbiAgICBGSVJTVDoge2ZuOiBGSVJTVH0sXG4gICAgTUFYOiB7Zm46IE1BWH0sXG4gICAgTUVESUFOOiB7Zm46IE1FRElBTn0sXG4gICAgTU9ERToge2ZuOiBNT0RFfSxcbiAgICBBTExfVkFMVUVTX09GOiB7Zm46IEFMTF9WQUxVRVNfT0Z9LFxuICAgIFJFUEVBVDoge2ZuOiBSRVBFQVR9LFxuICAgIEVWQUxVQVRFOiB7Zm46IEVWQUxVQVRFfSxcbiAgICBJTkNMVURFUzoge2ZuOiBJTkNMVURFU30sXG4gICAgYnVpbGREYXRhc2V0OiB7Zm46IGJ1aWxkRGF0YXNldH0sXG4gICAgYnVpbGRBbGlnbmVkRGF0YXNldDoge2ZuOiBidWlsZEFsaWduZWREYXRhc2V0fSxcbiAgICBidWlsZEZvcm1EYXRhc2V0OiB7Zm46IGJ1aWxkRm9ybURhdGFzZXR9LFxuICAgIGJ1aWxkQWxpZ25lZEZvcm1EYXRhc2V0OiB7Zm46IGJ1aWxkQWxpZ25lZEZvcm1EYXRhc2V0fSxcbiAgICBidWlsZFdpZGdldERhdGFzZXQ6IHtmbjogYnVpbGRXaWRnZXREYXRhc2V0fSxcbiAgICBidWlsZFdpZGdldERhdGFzZXRXaXRoRGlhbG9nOiB7Zm46IGJ1aWxkV2lkZ2V0RGF0YXNldFdpdGhEaWFsb2d9LFxuICAgIEZJTFRFUl9CWV9WQVJTOiB7Zm46IEZJTFRFUl9CWV9WQVJTfSxcbiAgICBGSUxURVJfQlk6IHtmbjogRklMVEVSX0JZfSxcbiAgICBJU19CRUZPUkU6IHtmbjogSVNfQkVGT1JFfSxcbiAgICBJU19BRlRFUjoge2ZuOiBJU19BRlRFUn0sXG4gICAgSVNfV0lUSElOX0lOVEVSVkFMOiB7Zm46IElTX1dJVEhJTl9JTlRFUlZBTH0sXG4gICAgQ09NUEFSRV9EQVRFOiB7Zm46IENPTVBBUkVfREFURX0sXG4gICAgQVBQTFk6IHtmbjogQVBQTFl9LFxuICAgIFRPREFZOiB7Zm46IFRPREFZfSxcbiAgICBHRVRfQUdFOiB7Zm46IEdFVF9BR0V9LFxuICAgIEJVSUxEX0RBVEFTRVQ6IHtmbjogQlVJTERfREFUQVNFVH0sXG4gICAgSk9JTl9GT1JNUzoge2ZuOiBKT0lOX0ZPUk1TfSxcbiAgICBMRU46IHtmbjogTEVOfSxcbiAgICBDT05DQVQ6IHtmbjogQ09OQ0FUfSxcbiAgICBSRU1PVkVfRFVQTElDQVRFUzoge2ZuOiBSRU1PVkVfRFVQTElDQVRFU30sXG4gICAgSk9JTl9SRVBFQVRJTkdfU0xJREVTOiB7Zm46IEpPSU5fUkVQRUFUSU5HX1NMSURFU30sXG4gICAgRlJPTV9SRVBTOiB7Zm46IEZST01fUkVQU30sXG4gICAgSVNJTjoge2ZuOiBJU0lOfSxcbiAgICBPUDoge2ZuOiBPUH0sXG4gICAgR0VUX0xBQkVMUzoge2ZuOiBHRVRfTEFCRUxTfSxcbiAgICBBUFBMWV9MQUJFTFM6IHtmbjogQVBQTFlfTEFCRUxTfSxcbiAgICBST1VORDoge2ZuOiBST1VORH0sXG4gICAgQ09OU09MRV9MT0c6IHtmbjogQ09OU09MRV9MT0d9LFxuICB9O1xufVxuXG4vKipcbiAqIFVUSUxJVFkgRlVOQ0lPTlxuICogVGhpcyBmdW5jdGlvbiBwcm92aWRlIGEgZGVlcCBjb3B5IGJ1aWxkZXIgb2YgYXJyYXkgb2YgbWFpbiBmb3Jtcy5cbiAqIFRoYXQncyBhIGN1c3RvbSBmdW5jdGlvbiByZWxhdGVkIHRvIG1haW5mb3JtcyB0aGF0IGNhbiBiZSBhYmxlIHRvIGluY3JlYXNlIGNvcHkgcGVyZm9ybWFuY2UuXG4gKlxuICogQHBhcmFtIHtNYWluRm9ybVtdfSBmb3Jtc1xuICogQHJldHVybiB7Kn0gIHtNYWluRm9ybVtdfVxuICovXG5mdW5jdGlvbiBjbG9uZU1haW5Gb3Jtcyhmb3JtczogTWFpbkZvcm1bXSk6IE1haW5Gb3JtW10ge1xuICBsZXQgcmVzOiBNYWluRm9ybVtdID0gW107XG4gIGZvciAoY29uc3QgZm9ybSBvZiBmb3Jtcykge1xuICAgIGlmIChmb3JtID09IG51bGwpIHtcbiAgICAgIHJlcy5wdXNoKGZvcm0pO1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGxldCByZXBzOiBJbnN0YW5jZXMgPSB7fTtcbiAgICBpZiAoZm9ybS5yZXBzICE9IG51bGwpIHtcbiAgICAgIGZvciAoY29uc3Qga2V5IGluIGZvcm0ucmVwcykge1xuICAgICAgICByZXBzW2tleV0gPSBbLi4uZm9ybS5yZXBzW2tleV1dO1xuICAgICAgfVxuICAgIH1cbiAgICByZXMucHVzaCh7Li4uZm9ybSwgcmVwc30pO1xuICB9XG4gIHJldHVybiByZXM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBldmFsdWF0ZUV4cHJlc3Npb24oXG4gIGV4cHJlc3Npb246IHN0cmluZyxcbiAgY29udGV4dD86IEFqZkNvbnRleHQsXG4gIGZvcmNlRm9ybXVsYT86IHN0cmluZyxcbik6IGFueSB7XG4gIHJldHVybiBjcmVhdGVGdW5jdGlvbihmb3JjZUZvcm11bGEgfHwgZXhwcmVzc2lvbikoY29udGV4dCk7XG59XG5cbnR5cGUgRnVuYyA9IChjPzogQWpmQ29udGV4dCkgPT4gYW55O1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRnVuY3Rpb24oZXhwcmVzc2lvbjogc3RyaW5nKTogRnVuYyB7XG4gIGlmICghZXhwcmVzc2lvbikge1xuICAgIHJldHVybiBfID0+ICcnO1xuICB9XG4gIGlmIChleHByZXNzaW9uID09PSAndHJ1ZScpIHtcbiAgICByZXR1cm4gXyA9PiB0cnVlO1xuICB9XG4gIGlmIChleHByZXNzaW9uID09PSAnZmFsc2UnKSB7XG4gICAgcmV0dXJuIF8gPT4gZmFsc2U7XG4gIH1cbiAgaWYgKC9eW2EtekEtWl8kXVtcXHckXSokLy50ZXN0KGV4cHJlc3Npb24pKSB7IC8vIGV4cHJlc3Npb24gaXMgYW4gaWRlbnRpZmllclxuICAgIHJldHVybiBjID0+IGMgPT0gbnVsbCB8fCBjW2V4cHJlc3Npb25dID09PSB1bmRlZmluZWQgPyBudWxsIDogY1tleHByZXNzaW9uXTtcbiAgfVxuICBpZiAoL15cIlteXCJdKlwiJC8udGVzdChleHByZXNzaW9uKSB8fCAvXidbXiddKickLy50ZXN0KGV4cHJlc3Npb24pKSB7XG4gICAgbGV0IHN0ciA9IGV4cHJlc3Npb24uc2xpY2UoMSwgLTEpO1xuICAgIHJldHVybiBfID0+IHN0cjtcbiAgfVxuXG4gIGNvbnN0IGFyZ05hbWVzID0gWy4uLm5ldyBTZXQoZ2V0Q29kZUlkZW50aWZpZXJzKGV4cHJlc3Npb24sIHRydWUpKS5hZGQoJ2V4ZWNDb250ZXh0JyldO1xuICBsZXQgZnVuYzogRnVuY3Rpb247XG4gIHRyeSB7XG4gICAgZnVuYyA9IG5ldyBGdW5jdGlvbiguLi5hcmdOYW1lcywgJ3JldHVybiAnICsgZXhwcmVzc2lvbik7XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiBfID0+IGZhbHNlO1xuICB9XG4gIHJldHVybiBjb250ZXh0ID0+IHtcbiAgICBjb25zdCBhcmdWYWx1ZXMgPSBhcmdOYW1lcy5tYXAobmFtZSA9PiB7XG4gICAgICBpZiAoY29udGV4dCAhPSBudWxsICYmIGNvbnRleHRbbmFtZV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gY29udGV4dFtuYW1lXTtcbiAgICAgIH1cbiAgICAgIGlmIChBamZFeHByZXNzaW9uVXRpbHMudXRpbHNbbmFtZV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gQWpmRXhwcmVzc2lvblV0aWxzLnV0aWxzW25hbWVdLmZuO1xuICAgICAgfVxuICAgICAgaWYgKG5hbWUgPT09ICdleGVjQ29udGV4dCcpIHtcbiAgICAgICAgcmV0dXJuIGV4ZWNDb250ZXh0O1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSk7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBmdW5jKC4uLmFyZ1ZhbHVlcyk7XG4gICAgfSBjYXRjaCB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9O1xufVxuXG4vKipcbiAqIEl0IHJldHVybnMgdGhlIGNvdW50IG9mIGRpZ2l0IGluc2lkZSB4LlxuICovXG5leHBvcnQgZnVuY3Rpb24gZGlnaXRDb3VudCh4OiBudW1iZXIpOiBudW1iZXIge1xuICBpZiAoaXNOYU4oeCkgfHwgdHlwZW9mIHggIT09ICdudW1iZXInKSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cbiAgaWYgKCFpc0Zpbml0ZSh4KSkge1xuICAgIHJldHVybiBJbmZpbml0eTtcbiAgfVxuICByZXR1cm4geC50b1N0cmluZygpLnJlcGxhY2UoL1teMC05XS9nLCAnJykubGVuZ3RoO1xufVxuLyoqXG4gKiBJdCBpcyBjb3VudCB0aGUgY291bnQgb2YgZGVjaW1hbCBkaWdpdCBpbnNpZGUgcy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRlY2ltYWxDb3VudCh4OiBzdHJpbmcgfCBudW1iZXIpOiBudW1iZXIge1xuICBpZiAodHlwZW9mIHggPT09ICdzdHJpbmcnKSB7XG4gICAgeCA9IHBhcnNlRmxvYXQoeCk7XG4gIH1cbiAgaWYgKHR5cGVvZiB4ICE9PSAnbnVtYmVyJyB8fCBpc05hTih4KSkge1xuICAgIHJldHVybiAwO1xuICB9XG4gIGNvbnN0IHBhcnRzID0geC50b1N0cmluZygpLnNwbGl0KCcuJyk7XG4gIHJldHVybiBwYXJ0cy5sZW5ndGggPiAxID8gcGFydHNbMV0ubGVuZ3RoIDogMDtcbn1cbi8qKlxuICogSXQgaXMgdHJ1ZSBpZiB4IGlzIGFuIGludGVnZXIuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0ludCh4OiBzdHJpbmcgfCBudW1iZXIpOiBib29sZWFuIHtcbiAgaWYgKHR5cGVvZiB4ID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiAvXi0/XFxkKyQvLnRlc3QoeCk7XG4gIH1cbiAgaWYgKHR5cGVvZiB4ID09PSAnbnVtYmVyJykge1xuICAgIHJldHVybiBNYXRoLnJvdW5kKHgpID09PSB4O1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cbi8qKlxuICogSXQgaXMgdHJ1ZSBpZiB4IGlzIG5vdCBlbXB0eS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG5vdEVtcHR5KHg6IGFueSk6IGJvb2xlYW4ge1xuICByZXR1cm4gdHlwZW9mIHggIT09ICd1bmRlZmluZWQnICYmIHggIT09IG51bGwgPyB4LnRvU3RyaW5nKCkubGVuZ3RoID4gMCA6IGZhbHNlO1xufVxuLyoqXG4gKiBJdCBpcyB0cnVlIGlmIGFycmF5IGNvbnRhaW5zIHggb3IgYXJyYXkgaXMgZXF1YWwgdG8geC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHZhbHVlSW5DaG9pY2UoYXJyYXk6IGFueVtdLCB4OiBhbnkpOiBib29sZWFuIHtcbiAgcmV0dXJuIChhcnJheSB8fCBbXSkuaW5kZXhPZih4KSA+IC0xIHx8IGFycmF5ID09PSB4O1xufVxuLyoqXG4gKiBJdCBhcHBsaWVzIGNhbGxiYWNrIGZvciByZXBzIHRpbWVzIGFuZCBhY2N1bXVsYXRlIHRoZSByZXN1bHQgaW4gYWNjLlxuICovXG5leHBvcnQgZnVuY3Rpb24gc2Nhbkdyb3VwRmllbGQocmVwczogbnVtYmVyLCBhY2M6IGFueSwgY2FsbGJhY2s6IGFueSk6IGFueSB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcmVwczsgaSsrKSB7XG4gICAgYWNjID0gY2FsbGJhY2soYWNjLCBpKTtcbiAgfVxuICByZXR1cm4gYWNjO1xufVxuLyoqXG4gKiBJdCByZXR1cm5zIHRoZSBzdW0gb2YgdGhlIGFycmF5IHZhbHVlcy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHN1bShhcnJheTogYW55W10pOiBhbnkge1xuICByZXR1cm4gYXJyYXkucmVkdWNlKChhLCBiKSA9PiBhICsgYiwgMCk7XG59XG4vKipcbiAqIEl0IGFwcGxpZXMgYWRkL3JlbW92ZShvcGVyYXRpb24pIHYgKGRheS9tb250aC95ZWFyKXBlcmlvZCB0byBkc3RyaW5nIGFuZCByZXR1cm4gbmV3IGZvcm1hdCBkYXRlLlxuICovXG4vLyBUT0RPIGNoZWNrIGlmIGRlcHJlY2F0ZWQgaW5zdGVhZCByZWZhY290b3JpbmcgcGFyYW1ldGVyIHR5cGVcbi8vIFRPRE8gKGRTdHJpbmc6IHN0cmluZ3xudWxsLCBwZXJpb2Q6J2RheSd8J21vbnRoJ3wneWVhcicsXG4vLyBUT0RPIG9wZXJhdGlvbjogJ2FkZC9yZW1vdmUnID0gJ2FkZCcsIHY6bnVtYmVyKVxuZXhwb3J0IGZ1bmN0aW9uIGRhdGVPcGVyYXRpb25zKGRTdHJpbmc6IHN0cmluZywgcGVyaW9kOiBzdHJpbmcsIG9wZXJhdGlvbjogc3RyaW5nLCB2OiBhbnkpOiBzdHJpbmcge1xuICBjb25zdCBmbXQgPSAnbW0vZGQveXl5eSc7XG4gIGxldCBkID0gdHlwZW9mIGRTdHJpbmcgIT09ICd1bmRlZmluZWQnID8gZGF0ZVV0aWxzLnBhcnNlKGRTdHJpbmcpIDogbmV3IERhdGUoKTtcbiAgaWYgKG9wZXJhdGlvbiA9PSAncmVtb3ZlJykge1xuICAgIHYgPSAtdjtcbiAgfVxuICBsZXQgZGF0ZU9wO1xuICBzd2l0Y2ggKHBlcmlvZCkge1xuICAgIGNhc2UgJ2RheSc6XG4gICAgICBkYXRlT3AgPSBkYXRlVXRpbHMuYWRkRGF5cztcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ21vbnRoJzpcbiAgICAgIGRhdGVPcCA9IGRhdGVVdGlscy5hZGRNb250aHM7XG4gICAgICBicmVhaztcbiAgICBjYXNlICd5ZWFyJzpcbiAgICAgIGRhdGVPcCA9IGRhdGVVdGlscy5hZGRZZWFycztcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gJyc7XG4gIH1cbiAgcmV0dXJuIGRhdGVVdGlscy5mb3JtYXQoZGF0ZU9wKGQsIHYpLCBmbXQpO1xufVxuXG4vKipcbiAqIEZpeGVkIGRlY2ltYWxzIGZvciBmbG9hdGluZyBudW1iZXJcbiAqIFJlc29sdmUgZmxvYXQgc3VtIHByb2JsZW1zIGxpa2UgdGhpczogMC4xICsgMC4yID0gMC4zMDAwMDAwMDAwMDAwMDAwNFxuICogQHBhcmFtIG51bVxuICogQHJldHVybnNcbiAqL1xuZnVuY3Rpb24gdHJ1bmNhdGUxMChudW06IG51bWJlcikge1xuICByZXR1cm4gcGFyc2VGbG9hdChudW0udG9GaXhlZCgxMCkpO1xufVxuXG4vKipcbiAqIEl0IHJvdW5kcyB0aGUgbnVtIHdpdGggdGhlIHZhbHVlIG9mIGRpZ2l0c1xuICovXG5leHBvcnQgZnVuY3Rpb24gcm91bmQobnVtOiBudW1iZXIgfCBzdHJpbmcsIGRpZ2l0cz86IG51bWJlcik6IG51bWJlciB7XG4gIGRpZ2l0cyA9IGRpZ2l0cyB8fCAwO1xuICBsZXQgZjtcbiAgaWYgKHR5cGVvZiBudW0gIT09ICdudW1iZXInKSB7XG4gICAgdHJ5IHtcbiAgICAgIGYgPSBwYXJzZUZsb2F0KG51bSk7XG4gICAgfSBjYXRjaCAoZSkge31cbiAgfSBlbHNlIHtcbiAgICBmID0gbnVtO1xuICB9XG4gIGlmIChmID09IG51bGwgfHwgaXNOYU4oZikpIHtcbiAgICBmID0gMDtcbiAgfVxuICBjb25zdCBtID0gTWF0aC5wb3coMTAsIGRpZ2l0cyk7XG4gIHJldHVybiBNYXRoLnJvdW5kKGYgKiBtKSAvIG07XG59XG4vKipcbiAqIEl0IGV4dHJhY3RzIHByb3BlcnR5IGZyb20gc291cmNlLlxuICogZm9yIGV2ZXJ5IGVsZW1lbnQgb2Ygc291cmNlIGlmIHByb3BlcnR5IGFuZCBwcm9wZXJ0eTIgYXJlIGRlZmluZWQgcmV0dXJuIHRoZSBzdW1cbiAqIGVsc2UgaWYgb25seSBwcm9wZXJ0eSBpcyBkZWZpbmVkIHJldHVybiBoaW0uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBleHRyYWN0QXJyYXkoc291cmNlOiBhbnlbXSwgcHJvcGVydHk6IHN0cmluZywgcHJvcGVydHkyPzogc3RyaW5nKTogYW55W10ge1xuICBzb3VyY2UgPSAoc291cmNlIHx8IFtdKS5maWx0ZXIoKGY6IGFueSkgPT4gZiAhPSBudWxsKTtcbiAgY29uc3QgcmVzOiBhbnlbXSA9IFtdO1xuICBmb3IgKGNvbnN0IHMgb2Ygc291cmNlKSB7XG4gICAgaWYgKHNbcHJvcGVydHldICE9IG51bGwgJiYgcHJvcGVydHkyICE9IG51bGwgJiYgc1twcm9wZXJ0eTJdICE9IG51bGwpIHtcbiAgICAgIHJlcy5wdXNoKE51bWJlcihzW3Byb3BlcnR5XSkgKyBOdW1iZXIoc1twcm9wZXJ0eTJdKSk7XG4gICAgfSBlbHNlIGlmIChzW3Byb3BlcnR5XSAhPSBudWxsKSB7XG4gICAgICByZXMucHVzaChzW3Byb3BlcnR5XSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXM7XG59XG4vKipcbiAqIEl0IHJldHVybnMgdGhlIHN1bSBvZiBhbGwgZGVmaW5lZCBwcm9wZXJ0aWVzIG9mIGVhY2ggZWxlbWVudCBvZiBzb3VyY2UuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBleHRyYWN0U3VtKHNvdXJjZTogYW55W10sIHByb3BlcnRpZXM6IHN0cmluZ1tdKTogbnVtYmVyIHtcbiAgcHJvcGVydGllcyA9IFsuLi4ocHJvcGVydGllcyB8fCBbXSldO1xuXG4gIGxldCBzdW1WYWwgPSAwO1xuICBmb3IgKGNvbnN0IHByb3Agb2YgcHJvcGVydGllcykge1xuICAgIGNvbnN0IGFycmF5ID0gZXh0cmFjdEFycmF5KHNvdXJjZSwgcHJvcCk7XG4gICAgZm9yIChjb25zdCBhIG9mIGFycmF5KSB7XG4gICAgICBpZiAoIWlzTmFOKE51bWJlcihhKSkpIHtcbiAgICAgICAgc3VtVmFsICs9IE51bWJlcihhKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHN1bVZhbDtcbn1cbi8qKlxuICogSXQgcmV0dXJucyBhIG51bWJlciBhcnJheSB0aGF0IGNvbnRhaW5zIHRoZSBzdW0gb2YgcHJvcGVydGllcyB2YWx1ZSBpbnNpZGUgdGhlIHNvdXJjZS5cbiAqIGV4dHJhY3RBcnJheVN1bShbe2E6IDV9LCB7YjogMX0sIHthOiA1LCBiOiAxfV0sIFsnYScsICdiJ10pOyA9Jmd0OyBbNiw2XVxuICovXG5leHBvcnQgZnVuY3Rpb24gZXh0cmFjdEFycmF5U3VtKHNvdXJjZTogYW55W10sIHByb3BlcnRpZXM6IHN0cmluZ1tdKTogYW55W10ge1xuICBjb25zdCBhcnJheXM6IGFueVtdID0gW107XG4gIHByb3BlcnRpZXMgPSBbLi4uKHByb3BlcnRpZXMgfHwgW10pXTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IHByb3BlcnRpZXMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBhcnJheSA9IGV4dHJhY3RBcnJheShzb3VyY2UsIHByb3BlcnRpZXNbaV0pO1xuICAgIGFycmF5cy5wdXNoKGFycmF5KTtcbiAgfVxuXG4gIGNvbnN0IHJlczogYW55W10gPSBbXTtcbiAgaWYgKGFycmF5cy5sZW5ndGggPiAwKSB7XG4gICAgZm9yIChsZXQgd2Vla0kgPSAwOyB3ZWVrSSA8IGFycmF5c1swXS5sZW5ndGg7IHdlZWtJKyspIHtcbiAgICAgIGxldCBzdW1WYWwgPSAwO1xuICAgICAgZm9yIChsZXQgcHJvcEkgPSAwOyBwcm9wSSA8IHByb3BlcnRpZXMubGVuZ3RoOyBwcm9wSSsrKSB7XG4gICAgICAgIHN1bVZhbCA9IHN1bVZhbCArIE51bWJlcihhcnJheXNbcHJvcEldW3dlZWtJXSk7XG4gICAgICB9XG4gICAgICByZXMucHVzaChzdW1WYWwpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzO1xufVxuLyoqXG4gKiBEcmF3IGEgdGhyZXNob2xkIGxpbmUgb24gY2hhcnQgcmVsYXRlZCB0byB0aGUgcHJvcGVydHkuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkcmF3VGhyZXNob2xkKHNvdXJjZTogYW55W10sIHByb3BlcnR5OiBzdHJpbmcsIHRocmVzaG9sZDogYW55W10pOiBhbnlbXSB7XG4gIHNvdXJjZSA9IChzb3VyY2UgfHwgW10pLmZpbHRlcigoZjogYW55KSA9PiBmICE9IG51bGwpO1xuICB0aHJlc2hvbGQgPSB0aHJlc2hvbGQgfHwgWzBdO1xuICBpZiAoISh0aHJlc2hvbGQgaW5zdGFuY2VvZiBBcnJheSkpIHtcbiAgICB0aHJlc2hvbGQgPSBbdGhyZXNob2xkXTtcbiAgfVxuICBjb25zdCBsID0gc291cmNlLmxlbmd0aDtcbiAgY29uc3QgcmVzOiBhbnlbXSA9IFtdO1xuICBsZXQgY291bnQgPSAwO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGw7IGkrKykge1xuICAgIGlmIChzb3VyY2VbaV1bcHJvcGVydHldICE9IG51bGwpIHtcbiAgICAgIGlmICh0aHJlc2hvbGQubGVuZ3RoID4gY291bnQpIHtcbiAgICAgICAgcmVzLnB1c2godGhyZXNob2xkW2NvdW50XSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXMucHVzaCh0aHJlc2hvbGRbMF0pO1xuICAgICAgfVxuICAgICAgY291bnQrKztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cbi8qKlxuICogRXh0cmFjdCB0aGUgZGF0ZXMgb2YgdGhlIHNvdXJjZSBvYmplY3Qgd2l0aCBwcm9wZXJ0eSAhPSBudWxsXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBleHRyYWN0RGF0ZXMoc291cmNlOiBhbnlbXSwgcHJvcGVydHk6IHN0cmluZywgZm10OiBzdHJpbmcpOiBzdHJpbmdbXSB7XG4gIHNvdXJjZSA9IChzb3VyY2UgfHwgW10pLmZpbHRlcigoZjogYW55KSA9PiBmICE9IG51bGwpO1xuICBjb25zdCBsID0gc291cmNlLmxlbmd0aDtcbiAgY29uc3QgcmVzOiBhbnkgPSBbXTtcbiAgbGV0IHByZWZpeCA9ICcnO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGw7IGkrKykge1xuICAgIGlmIChzb3VyY2VbaV1bcHJvcGVydHldICE9IG51bGwpIHtcbiAgICAgIHN3aXRjaCAoZm10KSB7XG4gICAgICAgIGNhc2UgJ1dXJzpcbiAgICAgICAgY2FzZSAnd3cnOlxuICAgICAgICAgIHByZWZpeCA9ICdXJztcbiAgICAgICAgICByZXMucHVzaChwcmVmaXggKyBmb3JtYXREYXRlKHNvdXJjZVtpXVsnZGF0ZV9zdGFydCddLCBmbXQpKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnTU0nOlxuICAgICAgICBjYXNlICdtbSc6XG4gICAgICAgICAgcHJlZml4ID0gJ00nO1xuICAgICAgICAgIHJlcy5wdXNoKHByZWZpeCArIGlzb01vbnRoKHNvdXJjZVtpXVsnZGF0ZV9zdGFydCddLCBmbXQpKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBwcmVmaXggPSAnJztcbiAgICAgICAgICByZXMucHVzaChwcmVmaXggKyBmb3JtYXREYXRlKHNvdXJjZVtpXVsnZGF0ZV9zdGFydCddLCBmbXQpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cbi8qKlxuICogRXh0cmFjdCB0aGUgbGFzdCBwcm9wZXJ0eSBjb250YWlucyBpbiBzb3VyY2UgIT0gbnVsbFxuICovXG5leHBvcnQgZnVuY3Rpb24gbGFzdFByb3BlcnR5KHNvdXJjZTogYW55LCBwcm9wZXJ0eTogc3RyaW5nKTogYW55IHtcbiAgc291cmNlID0gKHNvdXJjZSB8fCBbXSkuZmlsdGVyKChmOiBhbnkpID0+IGYgIT0gbnVsbCk7XG4gIGxldCBsID0gc291cmNlLmxlbmd0aCAtIDE7XG5cbiAgd2hpbGUgKGwgPj0gMCAmJiBzb3VyY2VbbF1bcHJvcGVydHldID09IG51bGwpIHtcbiAgICBsLS07XG4gICAgaWYgKGwgPCAwKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICB9XG4gIHJldHVybiBsID49IDAgPyBzb3VyY2VbbF1bcHJvcGVydHldIDogJyc7XG59XG4vKipcbiAqIEl0IHN1bSB0aGUgTEFzdCBwcm9wZXJ0aWVzIG9mIHNvdXJjZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHN1bUxhc3RQcm9wZXJ0aWVzKHNvdXJjZTogYW55W10sIHByb3BlcnRpZXM6IHN0cmluZ1tdKTogbnVtYmVyIHtcbiAgc291cmNlID0gKHNvdXJjZSB8fCBbXSkuZmlsdGVyKChmOiBhbnkpID0+IGYgIT0gbnVsbCk7XG4gIGxldCBzdW1WYWwgPSAwO1xuICBsZXQgdmFsID0gMDtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9wZXJ0aWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFsID0gTnVtYmVyKGxhc3RQcm9wZXJ0eShzb3VyY2UsIHByb3BlcnRpZXNbaV0pKTtcbiAgICBpZiAoIWlzTmFOKHZhbCkpIHtcbiAgICAgIHN1bVZhbCArPSB2YWw7XG4gICAgfVxuICB9XG4gIHJldHVybiBzdW1WYWw7XG59XG4vKipcbiAqIENvbXB1dGUgdGhlIHRyZW5kIG9mIHRoZSBwcm9wZXJ0eSBjb250YWluZWQgb24gdGhlIHNvdXJjZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNhbGN1bGF0ZVRyZW5kUHJvcGVydHkoc291cmNlOiBhbnlbXSwgcHJvcGVydHk6IHN0cmluZyk6IHN0cmluZyB7XG4gIHNvdXJjZSA9IChzb3VyY2UgfHwgW10pLmZpbHRlcigoZjogYW55KSA9PiBmICE9IG51bGwpO1xuICBsZXQgbGFzdCA9IHNvdXJjZS5sZW5ndGggLSAxO1xuICB3aGlsZSAoc291cmNlW2xhc3RdW3Byb3BlcnR5XSA9PSBudWxsKSB7XG4gICAgaWYgKGxhc3QgPT0gMCkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGxhc3QtLTtcbiAgfVxuICBsZXQgbGFzdExhc3QgPSBsYXN0IC0gMTtcbiAgaWYgKGxhc3QgPT0gMCkge1xuICAgIGxhc3RMYXN0ID0gbGFzdDtcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc291cmNlW2xhc3RMYXN0XVtwcm9wZXJ0eV0gPT0gbnVsbCkge1xuICAgICAgaWYgKGxhc3RMYXN0ID09IDApIHtcbiAgICAgICAgbGFzdExhc3QgPSBsYXN0O1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGxhc3RMYXN0LS07XG4gICAgfVxuICB9XG5cbiAgY29uc3QgbGFzdFByb3AgPSBzb3VyY2VbbGFzdF0gPyBzb3VyY2VbbGFzdF1bcHJvcGVydHldIHx8IDAgOiAwO1xuICBjb25zdCBsYXN0TGFzdFByb3AgPSBzb3VyY2VbbGFzdExhc3RdID8gc291cmNlW2xhc3RMYXN0XVtwcm9wZXJ0eV0gfHwgMCA6IDA7XG5cbiAgaWYgKGxhc3RQcm9wID09IGxhc3RMYXN0UHJvcCkge1xuICAgIHJldHVybiAnPHA+PGkgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiIHN0eWxlPVwiY29sb3I6Ymx1ZVwiPnRyZW5kaW5nX2ZsYXQ8L2k+PC9wPic7XG4gIH0gZWxzZSBpZiAobGFzdFByb3AgPiBsYXN0TGFzdFByb3ApIHtcbiAgICByZXR1cm4gJzxwPjxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIiBzdHlsZT1cImNvbG9yOmdyZWVuXCI+dHJlbmRpbmdfdXA8L2k+PC9wPic7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuICc8cD48aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCIgc3R5bGU9XCJjb2xvcjpyZWRcIj50cmVuZGluZ19kb3duPC9pPjwvcD4nO1xuICB9XG59XG4vKipcbiAqIENvbXB1dGUgdGhlIGF2ZXJhZ2UgdmFsdWUgb2YgdGhlIHByb3BlcnR5IGNvbnRhaW5lZCBvbiB0aGUgc291cmNlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gY2FsY3VsYXRlVHJlbmRCeVByb3BlcnRpZXMoc291cmNlOiBhbnlbXSwgcHJvcGVydGllczogc3RyaW5nW10pOiBzdHJpbmcge1xuICBjb25zdCBhcnJheXN1bSA9IGV4dHJhY3RBcnJheVN1bShzb3VyY2UsIHByb3BlcnRpZXMpO1xuXG4gIGNvbnN0IGxhc3RQcm9wID0gYXJyYXlzdW0ubGVuZ3RoID4gMCA/IGFycmF5c3VtW2FycmF5c3VtLmxlbmd0aCAtIDFdIHx8IDAgOiAwO1xuICBjb25zdCBsYXN0TGFzdFByb3AgPSBhcnJheXN1bS5sZW5ndGggPiAxID8gYXJyYXlzdW1bYXJyYXlzdW0ubGVuZ3RoIC0gMl0gfHwgMCA6IGxhc3RQcm9wO1xuXG4gIGlmIChsYXN0UHJvcCA9PSBsYXN0TGFzdFByb3ApIHtcbiAgICByZXR1cm4gJzxwPjxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIiBzdHlsZT1cImNvbG9yOmJsdWVcIj50cmVuZGluZ19mbGF0PC9pPjwvcD4nO1xuICB9IGVsc2UgaWYgKGxhc3RQcm9wID4gbGFzdExhc3RQcm9wKSB7XG4gICAgcmV0dXJuICc8cD48aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCIgc3R5bGU9XCJjb2xvcjpncmVlblwiPnRyZW5kaW5nX3VwPC9pPjwvcD4nO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAnPHA+PGkgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiIHN0eWxlPVwiY29sb3I6cmVkXCI+dHJlbmRpbmdfZG93bjwvaT48L3A+JztcbiAgfVxufVxuLyoqXG4gKlxuICovXG5leHBvcnQgZnVuY3Rpb24gY2FsY3VsYXRlQXZnUHJvcGVydHkoXG4gIHNvdXJjZTogYW55W10sXG4gIHByb3BlcnR5OiBzdHJpbmcsXG4gIHJhbmdlOiBudW1iZXIsXG4gIGNvZWZmaWNpZW50OiBudW1iZXIsXG4pOiBudW1iZXIge1xuICBzb3VyY2UgPSAoc291cmNlIHx8IFtdKS5maWx0ZXIoKGY6IGFueSkgPT4gZiAhPSBudWxsKTtcblxuICBjb2VmZmljaWVudCA9IGNvZWZmaWNpZW50IHx8IDE7XG4gIHJhbmdlID0gcmFuZ2UgfHwgMTI7XG5cbiAgbGV0IGwgPSBzb3VyY2UubGVuZ3RoO1xuICBsZXQgcmVzID0gMDtcbiAgbGV0IGNvdW50ZXIgPSAwO1xuICBsZXQgbm9aZXJvID0gMDtcblxuICBpZiAobCA8IHJhbmdlKSB7XG4gICAgcmFuZ2UgPSBsO1xuICB9XG5cbiAgd2hpbGUgKHJhbmdlICE9IDApIHtcbiAgICBpZiAoc291cmNlW2wgLSAxXVtwcm9wZXJ0eV0gIT0gbnVsbCkge1xuICAgICAgY291bnRlcisrO1xuICAgICAgcmVzICs9IE51bWJlcihzb3VyY2VbbCAtIDFdW3Byb3BlcnR5XSk7XG5cbiAgICAgIGlmIChzb3VyY2VbbCAtIDFdW3Byb3BlcnR5XSA+IDApIHtcbiAgICAgICAgbm9aZXJvKys7XG4gICAgICB9XG4gICAgfVxuICAgIGwtLTtcbiAgICByYW5nZS0tO1xuICB9XG5cbiAgaWYgKGNvZWZmaWNpZW50ID09IDApIHtcbiAgICByZXR1cm4gbm9aZXJvO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiByb3VuZCgocmVzIC8gY291bnRlcikgKiBjb2VmZmljaWVudCwgMikgfHwgMDtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY2FsY3VsYXRlQXZnUHJvcGVydHlBcnJheShcbiAgc291cmNlOiBhbnlbXSxcbiAgcHJvcGVydGllczogc3RyaW5nW10sXG4gIHJhbmdlOiBudW1iZXIsXG4gIGNvZWZmaWNpZW50OiBudW1iZXIsXG4pOiBudW1iZXJbXSB7XG4gIHNvdXJjZSA9IChzb3VyY2UgfHwgW10pLmZpbHRlcigoZjogYW55KSA9PiBmICE9IG51bGwpO1xuICBjb25zdCByZXNBcnI6IGFueVtdID0gW107XG5cbiAgaWYgKHByb3BlcnRpZXMgJiYgcHJvcGVydGllcy5sZW5ndGggPiAwKSB7XG4gICAgbGV0IGF2ZyA9IDA7XG5cbiAgICBjb2VmZmljaWVudCA9IGNvZWZmaWNpZW50IHx8IDE7XG4gICAgcmFuZ2UgPSByYW5nZSB8fCAxMjtcblxuICAgIGNvbnN0IHNvdXJjZUFyciA9XG4gICAgICBwcm9wZXJ0aWVzLmxlbmd0aCA+IDFcbiAgICAgICAgPyBleHRyYWN0QXJyYXlTdW0oc291cmNlLCBwcm9wZXJ0aWVzKVxuICAgICAgICA6IGV4dHJhY3RBcnJheShzb3VyY2UsIHByb3BlcnRpZXNbMF0pO1xuXG4gICAgbGV0IGwgPSBzb3VyY2VBcnIubGVuZ3RoO1xuXG4gICAgZm9yIChsZXQgbGVuID0gbDsgbGVuID4gMDsgbGVuLS0pIHtcbiAgICAgIGxldCByZXMgPSAwO1xuICAgICAgbGV0IGNvdW50ZXIgPSAwO1xuICAgICAgbGV0IG5vWmVybyA9IDA7XG5cbiAgICAgIGlmIChsZW4gPCByYW5nZSkge1xuICAgICAgICByYW5nZSA9IGxlbjtcbiAgICAgIH1cblxuICAgICAgZm9yIChsZXQgciA9IDE7IHIgPD0gcmFuZ2U7IHIrKykge1xuICAgICAgICBsZXQgdmFsID0gc291cmNlQXJyW2xlbiAtIHJdO1xuICAgICAgICBpZiAodmFsICE9IG51bGwpIHtcbiAgICAgICAgICBjb3VudGVyKys7XG4gICAgICAgICAgcmVzICs9IE51bWJlcih2YWwpO1xuICAgICAgICAgIGlmICh2YWwgPiAwKSB7XG4gICAgICAgICAgICBub1plcm8rKztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGNvdW50ZXIgPiAwKSB7XG4gICAgICAgIGlmIChjb2VmZmljaWVudCA9PSAwKSB7XG4gICAgICAgICAgYXZnID0gbm9aZXJvO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGF2ZyA9IChyZXMgLyBjb3VudGVyKSAqIGNvZWZmaWNpZW50IHx8IDA7XG4gICAgICAgIH1cbiAgICAgICAgcmVzQXJyLnB1c2gocm91bmQoYXZnLCAyKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiByZXNBcnIucmV2ZXJzZSgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWxlcnQoc291cmNlOiBhbnlbXSwgcHJvcGVydHk6IHN0cmluZywgdGhyZXNob2xkOiBudW1iZXIpOiBzdHJpbmcge1xuICBzb3VyY2UgPSBbLi4uKHNvdXJjZSB8fCBbXSldO1xuXG4gIGlmIChsYXN0UHJvcGVydHkoc291cmNlLCBwcm9wZXJ0eSkgPiB0aHJlc2hvbGQpIHtcbiAgICByZXR1cm4gJzxwPjxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIiBzdHlsZT1cImNvbG9yOnJlZFwiPndhcm5pbmc8L2k+PC9wPic7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuICc8cD48L3A+JztcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0TnVtYmVyKG51bTogbnVtYmVyLCBmbXQ/OiBzdHJpbmcpOiBzdHJpbmcge1xuICBmbXQgPSBmbXQgfHwgJzAsMFsuXTAnO1xuICByZXR1cm4gbnVtYnJvKG51bSkuZm9ybWF0KGZtdCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXREYXRlKGRhdGU6IERhdGUgfCBzdHJpbmcsIGZtdD86IHN0cmluZyk6IHN0cmluZyB7XG4gIGZtdCA9IGZtdCB8fCAnbW0tREQteXl5eSc7XG4gIHJldHVybiBkYXRlVXRpbHMuZm9ybWF0KHR5cGVvZiBkYXRlID09PSAnc3RyaW5nJyA/IGRhdGVVdGlscy5wYXJzZShkYXRlKSA6IGRhdGUsIGZtdCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc29Nb250aChkYXRlOiBEYXRlLCBmbXQ/OiBzdHJpbmcpOiBzdHJpbmcge1xuICBmbXQgPSBmbXQgfHwgJ21tJztcbiAgY29uc3QgZHUgPSBkYXRlVXRpbHM7XG4gIHJldHVybiBkdS5mb3JtYXQoZHUuYWRkRGF5cyhkdS5zdGFydE9mSVNPV2VlayhkYXRlKSwgMyksIGZtdCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRDb29yZGluYXRlKHNvdXJjZTogYW55LCB6b29tPzogbnVtYmVyKTogW251bWJlciwgbnVtYmVyLCBudW1iZXJdIHtcbiAgem9vbSA9IHpvb20gfHwgNjtcbiAgaWYgKHNvdXJjZSA9PSBudWxsKSB7XG4gICAgcmV0dXJuIFs1MS41MDUsIC0wLjA5LCB6b29tXTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gW3NvdXJjZVswXSwgc291cmNlWzFdLCB6b29tXTtcbiAgfVxufVxuXG4vKipcbiAqIFJldHVybnMgYW4gYXJyYXkgY29udGFpbmluZyBhbGwgdGhlIHZhbHVlcyB0aGF0IHRoZSBzcGVjaWZpZWQgZmllbGQgdGFrZXMgaW4gdGhlIGZvcm1zLlxuICogVGhlIHZhbHVlcyBhcmUgY29udmVydGVkIHRvIHN0cmluZ3MuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBBTExfVkFMVUVTX09GKGZvcm1zOiBNYWluRm9ybVtdLCBmaWVsZDogc3RyaW5nLCBmaWx0ZXI6IEZ1bmN8c3RyaW5nID0gJ3RydWUnKTogc3RyaW5nW10ge1xuICBmb3JtcyA9IChmb3JtcyB8fCBbXSkuZmlsdGVyKGYgPT4gZiAhPSBudWxsKTtcbiAgaWYgKHR5cGVvZihmaWx0ZXIpID09PSAnc3RyaW5nJykge1xuICAgIGZpbHRlciA9IGNyZWF0ZUZ1bmN0aW9uKGZpbHRlcik7XG4gIH1cbiAgbGV0IHZhbHVlczogc3RyaW5nW10gPSBbXTtcbiAgZm9yIChjb25zdCBmb3JtIG9mIGZvcm1zKSB7XG4gICAgaWYgKGZvcm1bZmllbGRdICE9IG51bGwgJiYgZmlsdGVyKGZvcm0pKSB7XG4gICAgICB2YWx1ZXMucHVzaChTdHJpbmcoZm9ybVtmaWVsZF0pKTtcbiAgICB9XG4gICAgZm9yIChjb25zdCByZXAgb2YgYWxsUmVwcyhmb3JtKSkge1xuICAgICAgaWYgKHJlcFtmaWVsZF0gIT0gbnVsbCAmJiBmaWx0ZXIoey4uLmZvcm0sIC4uLnJlcH0pKSB7XG4gICAgICAgIHZhbHVlcy5wdXNoKFN0cmluZyhyZXBbZmllbGRdKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBbLi4ubmV3IFNldCh2YWx1ZXMpXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBsYWluQXJyYXkocGFyYW1zOiBhbnlbXSk6IGFueVtdIHtcbiAgY29uc3QgcmVzOiBhbnlbXSA9IFtdO1xuICBmb3IgKGNvbnN0IHBhcmFtIG9mIHBhcmFtcykge1xuICAgIGlmIChBcnJheS5pc0FycmF5KHBhcmFtKSkge1xuICAgICAgcmVzLnB1c2goLi4ucGFyYW0pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXMucHVzaChwYXJhbSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXM7XG59XG5cbi8qKlxuICogUmV0dXJucyB0aGUgbnVtYmVyIG9mIGZvcm1zIGZvciB3aGljaCBmaWx0ZXIgZXZhbHVhdGVzIHRvIHRydWUsXG4gKiBmb3IgdGhlIGZvcm0gaXRzZWxmIG9yIGZvciBhbnkgb2YgaXRzIHJlcGV0aXRpb25zLlxuICovXG5leHBvcnQgZnVuY3Rpb24gQ09VTlRfRk9STVMoZm9ybXM6IE1haW5Gb3JtW10sIGZpbHRlcjogRnVuY3xzdHJpbmcgPSAndHJ1ZScpOiBudW1iZXIge1xuICBmb3JtcyA9IChmb3JtcyB8fCBbXSkuZmlsdGVyKGYgPT4gZiAhPSBudWxsKTtcbiAgaWYgKGZpbHRlciA9PT0gJ3RydWUnKSB7XG4gICAgcmV0dXJuIGZvcm1zLmxlbmd0aDtcbiAgfVxuICBpZiAodHlwZW9mKGZpbHRlcikgPT09ICdzdHJpbmcnKSB7XG4gICAgZmlsdGVyID0gY3JlYXRlRnVuY3Rpb24oZmlsdGVyKTtcbiAgfVxuICBsZXQgY291bnQgPSAwO1xuICBmb3IgKGNvbnN0IGZvcm0gb2YgZm9ybXMpIHtcbiAgICBpZiAoZmlsdGVyKGZvcm0pKSB7XG4gICAgICBjb3VudCsrO1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGZvciAoY29uc3QgcmVwIG9mIGFsbFJlcHMoZm9ybSkpIHtcbiAgICAgIGlmIChmaWx0ZXIoey4uLmZvcm0sIC4uLnJlcH0pKSB7XG4gICAgICAgIGNvdW50Kys7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gY291bnQ7XG59XG5cbi8qKlxuICogQ291bnRzIHRoZSBmb3JtcyBhbmQgYWxsIG9mIHRoZWlyIHJlcGV0aXRpb25zIGZvciB3aGljaCBmaWx0ZXIgZXZhbHVhdGVzIHRvIHRydWUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBDT1VOVF9SRVBTKGZvcm1zOiBNYWluRm9ybVtdLCBmaWx0ZXI6IEZ1bmN8c3RyaW5nID0gJ3RydWUnKTogbnVtYmVyIHtcbiAgZm9ybXMgPSAoZm9ybXMgfHwgW10pLmZpbHRlcihmID0+IGYgIT0gbnVsbCk7XG4gIGlmICh0eXBlb2YoZmlsdGVyKSA9PT0gJ3N0cmluZycpIHtcbiAgICBmaWx0ZXIgPSBjcmVhdGVGdW5jdGlvbihmaWx0ZXIpO1xuICB9XG4gIGxldCBjb3VudCA9IDA7XG4gIGZvciAoY29uc3QgZm9ybSBvZiBmb3Jtcykge1xuICAgIGlmIChmaWx0ZXIoZm9ybSkpIHtcbiAgICAgIGNvdW50Kys7XG4gICAgfVxuICAgIGZvciAoY29uc3QgcmVwIG9mIGFsbFJlcHMoZm9ybSkpIHtcbiAgICAgIGlmIChmaWx0ZXIoey4uLmZvcm0sIC4uLnJlcH0pKSB7XG4gICAgICAgIGNvdW50Kys7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBjb3VudDtcbn1cblxuLyoqXG4gKiBEZXByZWNhdGVkLiBVc2UgTEVOKEFMTF9WQUxVRVNfT0YpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBDT1VOVF9GT1JNU19VTklRVUUoZm9ybXM6IE1haW5Gb3JtW10sIGZpZWxkOiBzdHJpbmcsIGZpbHRlcjogRnVuY3xzdHJpbmcgPSAndHJ1ZScpOiBudW1iZXIge1xuICByZXR1cm4gQUxMX1ZBTFVFU19PRihmb3JtcywgZmllbGQsIGZpbHRlcikubGVuZ3RoO1xufVxuXG5mdW5jdGlvbiBnZXROdW1lcmljVmFsdWVzKGZvcm1zOiAoTWFpbkZvcm0gfCBGb3JtKVtdLCBmaWVsZDogc3RyaW5nLCBmaWx0ZXI6IEZ1bmN8c3RyaW5nID0gJ3RydWUnKTogbnVtYmVyW10ge1xuICBmb3JtcyA9IChmb3JtcyB8fCBbXSkuZmlsdGVyKGYgPT4gZiAhPSBudWxsKTtcbiAgaWYgKHR5cGVvZihmaWx0ZXIpID09PSAnc3RyaW5nJykge1xuICAgIGZpbHRlciA9IGNyZWF0ZUZ1bmN0aW9uKGZpbHRlcik7XG4gIH1cbiAgbGV0IHZhbHVlczogbnVtYmVyW10gPSBbXTtcbiAgZm9yIChjb25zdCBmb3JtIG9mIGZvcm1zKSB7XG4gICAgY29uc3QgdmFsID0gZm9ybVtmaWVsZF07XG4gICAgaWYgKHZhbCAhPSBudWxsICYmICFpc05hTihOdW1iZXIodmFsKSkgJiYgZmlsdGVyKGZvcm0pKSB7XG4gICAgICB2YWx1ZXMucHVzaChOdW1iZXIodmFsKSk7XG4gICAgfVxuICAgIGZvciAoY29uc3QgcmVwIG9mIGFsbFJlcHMoZm9ybSkpIHtcbiAgICAgIGNvbnN0IHZhbCA9IHJlcFtmaWVsZF07XG4gICAgICBpZiAodmFsICE9IG51bGwgJiYgIWlzTmFOKE51bWJlcih2YWwpKSAmJiBmaWx0ZXIoey4uLmZvcm0sIC4uLnJlcH0pKSB7XG4gICAgICAgIHZhbHVlcy5wdXNoKE51bWJlcih2YWwpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHZhbHVlcztcbn1cblxuLyoqXG4gKiBBZ2dyZWdhdGVzIGFuZCBzdW1zIHRoZSB2YWx1ZXMgb2YgdGhlIHNwZWNpZmllZCBmaWVsZC5cbiAqIEFuIG9wdGlvbmFsIGV4cHJlc3Npb24gY2FuIGJlIGFkZGVkIHRvIGZpbHRlciB3aGljaCBmb3JtcyB0byB0YWtlIGZvciB0aGUgc3VtLlxuICovXG5leHBvcnQgZnVuY3Rpb24gU1VNKGZvcm1zOiAoTWFpbkZvcm0gfCBGb3JtKVtdLCBmaWVsZDogc3RyaW5nLCBmaWx0ZXI6IEZ1bmN8c3RyaW5nID0gJ3RydWUnKTogbnVtYmVyIHtcbiAgY29uc3QgdmFsdWVzID0gZ2V0TnVtZXJpY1ZhbHVlcyhmb3JtcywgZmllbGQsIGZpbHRlcik7XG4gIGxldCBzdW0gPSAwO1xuICBmb3IgKGNvbnN0IHZhbCBvZiB2YWx1ZXMpIHtcbiAgICBzdW0gKz0gdmFsO1xuICB9XG4gIHJldHVybiB0cnVuY2F0ZTEwKHN1bSk7XG59XG5cbi8qKlxuICogQ29tcHV0ZXMgdGhlIG1lYW4gb2YgdGhlIHZhbHVlcyBvZiB0aGUgc3BlY2lmaWVkIGZpZWxkLlxuICogQW4gb3B0aW9uYWwgZXhwcmVzc2lvbiBjYW4gYmUgYWRkZWQgdG8gZmlsdGVyIHdoaWNoIGZvcm1zIHRvIHRha2UgZm9yIHRoZSBzdW0uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBNRUFOKGZvcm1zOiAoRm9ybSB8IE1haW5Gb3JtKVtdLCBmaWVsZDogc3RyaW5nLCBmaWx0ZXI6IEZ1bmN8c3RyaW5nID0gJ3RydWUnKTogbnVtYmVyIHtcbiAgY29uc3QgdmFsdWVzID0gZ2V0TnVtZXJpY1ZhbHVlcyhmb3JtcywgZmllbGQsIGZpbHRlcik7XG4gIGxldCBzdW0gPSAwO1xuICBmb3IgKGNvbnN0IHZhbCBvZiB2YWx1ZXMpIHtcbiAgICBzdW0gKz0gdmFsO1xuICB9XG4gIHJldHVybiB0cnVuY2F0ZTEwKHN1bSAvIHZhbHVlcy5sZW5ndGgpO1xufVxuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlICUgYmV0d2VlbiB0d28gbWVtYmVycy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIFBFUkNFTlQodmFsdWUxOiBudW1iZXIsIHZhbHVlMjogbnVtYmVyKTogc3RyaW5nIHtcbiAgY29uc3QgcmVzID0gKCt2YWx1ZTEgKiAxMDApIC8gK3ZhbHVlMjtcbiAgcmV0dXJuIE51bWJlci5pc0Zpbml0ZShyZXMpID8gTWF0aC5yb3VuZChyZXMpKyclJyA6ICdpbmZpbml0ZSc7XG59XG5cbi8qKlxuICogRXZhbHVhdGVzIHRoZSBleHByZXNzaW9uIGluIHRoZSBmaXJzdCBmb3JtIGJ5IGRhdGUuXG4gKi9cbiBleHBvcnQgZnVuY3Rpb24gRklSU1QoZm9ybXM6IChGb3JtIHwgTWFpbkZvcm0pW10sIGV4cHJlc3Npb246IEZ1bmN8c3RyaW5nLCBkYXRlID0gJ2NyZWF0ZWRfYXQnKTogYW55IHtcbiAgaWYgKHR5cGVvZihleHByZXNzaW9uKSA9PT0gJ3N0cmluZycpIHtcbiAgICBleHByZXNzaW9uID0gY3JlYXRlRnVuY3Rpb24oZXhwcmVzc2lvbik7XG4gIH1cbiAgZm9ybXMgPSAoZm9ybXMgfHwgW10pLmZpbHRlcihmID0+IGYgIT0gbnVsbCkuc29ydCgoYSwgYikgPT4ge1xuICAgIGNvbnN0IGRhdGVBID0gbmV3IERhdGUoYltkYXRlXSBhcyBzdHJpbmcpLmdldFRpbWUoKTtcbiAgICBjb25zdCBkYXRlQiA9IG5ldyBEYXRlKGFbZGF0ZV0gYXMgc3RyaW5nKS5nZXRUaW1lKCk7XG4gICAgcmV0dXJuIGRhdGVBIC0gZGF0ZUI7XG4gIH0pO1xuICBpZiAoZm9ybXMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuICByZXR1cm4gZXhwcmVzc2lvbihmb3Jtc1swXSk7XG59XG5cbi8qKlxuICogRXZhbHVhdGVzIHRoZSBleHByZXNzaW9uIGluIHRoZSBsYXN0IGZvcm0gYnkgZGF0ZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIExBU1QoZm9ybXM6IChGb3JtIHwgTWFpbkZvcm0pW10sIGV4cHJlc3Npb246IEZ1bmN8c3RyaW5nLCBkYXRlID0gJ2NyZWF0ZWRfYXQnKTogYW55IHtcbiAgaWYgKHR5cGVvZihleHByZXNzaW9uKSA9PT0gJ3N0cmluZycpIHtcbiAgICBleHByZXNzaW9uID0gY3JlYXRlRnVuY3Rpb24oZXhwcmVzc2lvbik7XG4gIH1cbiAgZm9ybXMgPSAoZm9ybXMgfHwgW10pLmZpbHRlcihmID0+IGYgIT0gbnVsbCkuc29ydCgoYSwgYikgPT4ge1xuICAgIGNvbnN0IGRhdGVBID0gbmV3IERhdGUoYltkYXRlXSBhcyBzdHJpbmcpLmdldFRpbWUoKTtcbiAgICBjb25zdCBkYXRlQiA9IG5ldyBEYXRlKGFbZGF0ZV0gYXMgc3RyaW5nKS5nZXRUaW1lKCk7XG4gICAgcmV0dXJuIGRhdGVBIC0gZGF0ZUI7XG4gIH0pO1xuICBpZiAoZm9ybXMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuICByZXR1cm4gZXhwcmVzc2lvbihmb3Jtc1tmb3Jtcy5sZW5ndGggLSAxXSk7XG59XG5cbi8qKlxuICogQ29tcHV0ZXMgdGhlIG1heCB2YWx1ZSBvZiB0aGUgZmllbGQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBNQVgoZm9ybXM6IChGb3JtIHwgTWFpbkZvcm0pW10sIGZpZWxkOiBzdHJpbmcsIGZpbHRlcjogRnVuY3xzdHJpbmcgPSAndHJ1ZScpOiBudW1iZXIge1xuICBjb25zdCB2YWx1ZXMgPSBnZXROdW1lcmljVmFsdWVzKGZvcm1zLCBmaWVsZCwgZmlsdGVyKTtcbiAgbGV0IG1heCA9IC1JbmZpbml0eTtcbiAgZm9yIChjb25zdCB2YWwgb2YgdmFsdWVzKSB7XG4gICAgaWYgKHZhbCA+IG1heCkge1xuICAgICAgbWF4ID0gdmFsO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbWF4O1xufVxuXG4vKipcbiAqIENvbXB1dGVzIHRoZSBtZWRpYW4gdmFsdWUgb2YgdGhlIGZpZWxkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gTUVESUFOKGZvcm1zOiAoRm9ybSB8IE1haW5Gb3JtKVtdLCBmaWVsZDogc3RyaW5nLCBmaWx0ZXI6IEZ1bmN8c3RyaW5nID0gJ3RydWUnKTogbnVtYmVyIHtcbiAgY29uc3QgdmFsdWVzID0gZ2V0TnVtZXJpY1ZhbHVlcyhmb3JtcywgZmllbGQsIGZpbHRlcikuc29ydCgpO1xuICBpZiAodmFsdWVzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBOYU47XG4gIH1cbiAgcmV0dXJuIHZhbHVlc1tNYXRoLmZsb29yKHZhbHVlcy5sZW5ndGggLyAyKV07XG59XG5cbi8qKlxuICogQ29tcHV0ZXMgdGhlIG1vZGUgdmFsdWUgb2YgdGhlIGZpZWxkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gTU9ERShmb3JtczogKEZvcm0gfCBNYWluRm9ybSlbXSwgZmllbGQ6IHN0cmluZywgZmlsdGVyOiBGdW5jfHN0cmluZyA9ICd0cnVlJyk6IG51bWJlciB7XG4gIGNvbnN0IHZhbHVlcyA9IGdldE51bWVyaWNWYWx1ZXMoZm9ybXMsIGZpZWxkLCBmaWx0ZXIpO1xuICBjb25zdCBjb3VudGVyczoge1t2YWw6IG51bWJlcl06IG51bWJlcn0gPSB7fTtcbiAgZm9yIChjb25zdCB2YWwgb2YgdmFsdWVzKSB7XG4gICAgaWYgKGNvdW50ZXJzW3ZhbF0gPT0gbnVsbCkge1xuICAgICAgY291bnRlcnNbdmFsXSA9IDE7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvdW50ZXJzW3ZhbF0rKztcbiAgICB9XG4gIH1cbiAgbGV0IG1heENvdW50ID0gMDtcbiAgZm9yIChjb25zdCB2YWwgaW4gY291bnRlcnMpIHtcbiAgICBpZiAoY291bnRlcnNbdmFsXSA+IG1heENvdW50KSB7XG4gICAgICBtYXhDb3VudCA9IGNvdW50ZXJzW3ZhbF07XG4gICAgfVxuICB9XG4gIGZvciAoY29uc3QgdmFsIGluIGNvdW50ZXJzKSB7XG4gICAgaWYgKGNvdW50ZXJzW3ZhbF0gPT09IG1heENvdW50KSB7XG4gICAgICByZXR1cm4gTnVtYmVyKHZhbCk7XG4gICAgfVxuICB9XG4gIHJldHVybiBOYU47XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBidWlsZERhdGFzZXQoXG4gIGRhdGFzZXQ6IChzdHJpbmcgfCBudW1iZXIgfCBzdHJpbmdbXSB8IG51bWJlcltdKVtdLFxuICBjb2xzcGFuczogbnVtYmVyW10sXG4pOiBBamZUYWJsZUNlbGxbXVtdIHtcbiAgcmV0dXJuIGJ1aWxkQWxpZ25lZERhdGFzZXQoZGF0YXNldCwgY29sc3BhbnMsIFtdKTtcbn1cblxuLyoqXG4gKiBCdWlsZCBhIGRhdGFzZXQgZm9yIGFqZiBkeW5hbWljIHRhYmxlXG4gKiBAcGFyYW0gZGF0YXNldCB0aGUgZGF0YXNldCBmb3IgdGhlIHRhYmxlXG4gKiBAcGFyYW0gY29sc3BhbnMgY29sc3BhbiBmb3IgZWFjaCB2YWx1ZSBpbiB0aGUgZGF0YXNldFxuICogQHBhcmFtIHRleHRBbGlnbiBhbGlnbm1lbnQgZm9yIGVhY2ggdmFsdWUgaW4gdGhlIGRhdGFzZXRcbiAqIEByZXR1cm5zIEFuIEFqZlRhYmxlQ2VsbCBsaXN0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBidWlsZEFsaWduZWREYXRhc2V0KFxuICBkYXRhc2V0OiAoc3RyaW5nIHwgbnVtYmVyIHwgc3RyaW5nW10gfCBudW1iZXJbXSlbXSxcbiAgY29sc3BhbnM6IG51bWJlcltdLFxuICB0ZXh0QWxpZ246IHN0cmluZ1tdLFxuKTogQWpmVGFibGVDZWxsW11bXSB7XG4gIGNvbnN0IHJlczogQWpmVGFibGVDZWxsW11bXSA9IFtdO1xuICBjb25zdCBub3JtYWxpemVEYXRhc2V0OiBhbnlbXVtdID0gW107XG4gIGRhdGFzZXQuZm9yRWFjaCgocm93OiBhbnksIGluZGV4Um93OiBudW1iZXIpID0+IHtcbiAgICByb3cgPSBBcnJheS5pc0FycmF5KHJvdykgPyByb3cgOiBbcm93XTtcbiAgICBub3JtYWxpemVEYXRhc2V0W2luZGV4Um93ICUgY29sc3BhbnMubGVuZ3RoXSA9XG4gICAgICBub3JtYWxpemVEYXRhc2V0W2luZGV4Um93ICUgY29sc3BhbnMubGVuZ3RoXSAhPSBudWxsXG4gICAgICAgID8gWy4uLm5vcm1hbGl6ZURhdGFzZXRbaW5kZXhSb3cgJSBjb2xzcGFucy5sZW5ndGhdLCAuLi5yb3ddXG4gICAgICAgIDogWy4uLnJvd107XG4gIH0pO1xuICBjb25zdCB0cmFuc3Bvc2UgPSBub3JtYWxpemVEYXRhc2V0WzBdLm1hcCgoXzogYW55LCBjb2xJbmRleDogbnVtYmVyKSA9PlxuICAgIG5vcm1hbGl6ZURhdGFzZXQubWFwKChyb3c6IGFueSkgPT4gcm93W2NvbEluZGV4XSksXG4gICk7XG4gIHRyYW5zcG9zZS5mb3JFYWNoKChkYXRhOiBhbnlbXSwgaW5kZXg6IG51bWJlcikgPT4ge1xuICAgIGNvbnN0IHJvdzogQWpmVGFibGVDZWxsW10gPSBbXTtcbiAgICBkYXRhLmZvckVhY2goKGNlbGxWYWx1ZTogc3RyaW5nIHwgbnVtYmVyLCBjZWxsSW5kZXg6IG51bWJlcikgPT4ge1xuICAgICAgcm93LnB1c2goe1xuICAgICAgICB2YWx1ZTogY2VsbFZhbHVlLFxuICAgICAgICBjb2xzcGFuOiBjb2xzcGFuc1tjZWxsSW5kZXhdLFxuICAgICAgICByb3dzcGFuOiAxLFxuICAgICAgICBzdHlsZToge1xuICAgICAgICAgIHRleHRBbGlnbjogdGV4dEFsaWduW2NlbGxJbmRleF0gPyB0ZXh0QWxpZ25bY2VsbEluZGV4XSA6ICdjZW50ZXInLFxuICAgICAgICAgIGNvbG9yOiAnYmxhY2snLFxuICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogaW5kZXggJSAyID09PSAwID8gJ3doaXRlJyA6ICcjZGRkJyxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHJlcy5wdXNoKHJvdyk7XG4gIH0pO1xuICByZXR1cm4gcmVzO1xufVxuXG4vKipcbiAqIEJ1aWxkIGEgZGF0YXNldCBiYXNlZCBvbiBhIGxpc3Qgb2YgRm9ybXMsIGZvciBhamYgZHluYW1pYyB0YWJsZVxuICogQHBhcmFtIGRhdGFzZXQgdGhlIGRhdGFzZXQgZm9yIHRoZSB0YWJsZVxuICogQHBhcmFtIGZpZWxkcyB0aGUgbGlzdCBvZiBmaWVsZHMgbmFtZSBmb3IgZWFjaCByb3dcbiAqIEBwYXJhbSByb3dMaW5rIHRoZSBodHRwIGxpbmsgZm9yIHRoZSByb3csIHdpdGggdGhlIGZvcm0gZmllbGQgbmFtZSB3aXRoIHRoZSBsaW5rIHZhbHVlIGFuZCB0aGUgY29sdW1uIHBvc2l0aW9uIGZvciB0aGUgbGluay5cbiAqIGllOiB7J2xpbmsnOiAnaG9tZV9saW5rJywgJ3Bvc2l0aW9uJzogMH1cbiAqIEBwYXJhbSBiYWNrZ3JvdW5kQ29sb3JBIHRoZSBmaXJzdCBiYWNrZ3JvdWQgY29sb3JcbiAqIEBwYXJhbSBiYWNrZ3JvdW5kQ29sb3JCIHRoZSBzZWNvbmQgYmFja2dyb3VkIGNvbG9yXG4gKiBAcmV0dXJucyBBbiBBamZUYWJsZUNlbGwgbGlzdFxuICovXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRGb3JtRGF0YXNldChcbiAgZGF0YXNldDogTWFpbkZvcm1bXSxcbiAgZmllbGRzOiBzdHJpbmdbXSxcbiAgcm93TGluazoge2xpbms6IHN0cmluZzsgcG9zaXRpb246IG51bWJlcn0gfCBudWxsLFxuICBfYmFja2dyb3VuZENvbG9yQT86IHN0cmluZyxcbiAgX2JhY2tncm91bmRDb2xvckI/OiBzdHJpbmcsXG4pOiBBamZUYWJsZUNlbGxbXVtdIHtcbiAgcmV0dXJuIGJ1aWxkQWxpZ25lZEZvcm1EYXRhc2V0KGRhdGFzZXQsIGZpZWxkcywgW10sIFtdLCByb3dMaW5rLCBbXSwgW10pO1xufVxuXG4vKipcbiAqIEJ1aWxkIGEgZGF0YXNldCBiYXNlZCBvbiBhIGxpc3Qgb2YgRm9ybXMsIGZvciBhamYgZHluYW1pYyB0YWJsZVxuICogQHBhcmFtIGRhdGFzZXQgdGhlIGRhdGFzZXQgZm9yIHRoZSB0YWJsZVxuICogQHBhcmFtIGZpZWxkcyB0aGUgbGlzdCBvZiBmaWVsZHMgbmFtZSBmb3IgZWFjaCByb3dcbiAqIEBwYXJhbSBjb2xzcGFucyBjb2xzcGFuIGZvciBlYWNoIHZhbHVlIGluIHRoZSBkYXRhc2V0XG4gKiBAcGFyYW0gdGV4dEFsaWduIGFsaWdubWVudCBmb3IgZWFjaCB2YWx1ZSBpbiB0aGUgZGF0YXNldFxuICogQHBhcmFtIHJvd0xpbmsgdGhlIGh0dHAgbGluayBmb3IgdGhlIHJvdywgd2l0aCB0aGUgZm9ybSBmaWVsZCBuYW1lIHdpdGggdGhlIGxpbmsgdmFsdWUgYW5kIHRoZSBjb2x1bW4gcG9zaXRpb24gZm9yIHRoZSBsaW5rLlxuICogaWU6IHsnbGluayc6ICdob21lX2xpbmsnLCAncG9zaXRpb24nOiAwfVxuICogQHJldHVybnMgQW4gQWpmVGFibGVDZWxsIGxpc3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkQWxpZ25lZEZvcm1EYXRhc2V0KFxuICBkYXRhc2V0OiBNYWluRm9ybVtdLFxuICBmaWVsZHM6IHN0cmluZ1tdLFxuICBjb2xzcGFuczogbnVtYmVyW10sXG4gIHRleHRBbGlnbjogc3RyaW5nW10sXG4gIHJvd0xpbms6IHtsaW5rOiBzdHJpbmc7IHBvc2l0aW9uOiBudW1iZXJ9IHwgbnVsbCxcbiAgZGlhbG9nRmllbGRzOiBzdHJpbmdbXSxcbiAgZGlhbG9nTGFiZWxGaWVsZHM6IHN0cmluZ1tdLFxuKTogQWpmVGFibGVDZWxsW11bXSB7XG4gIGNvbnN0IHJlczogQWpmVGFibGVDZWxsW11bXSA9IFtdO1xuXG4gIGNvbnN0IGJhY2tncm91bmRDb2xvckEgPSAnd2hpdGUnO1xuICBjb25zdCBiYWNrZ3JvdW5kQ29sb3JCID0gJyNkZGQnO1xuICBpZiAoZGF0YXNldCkge1xuICAgIGxldCBpbmRleDogbnVtYmVyID0gMDtcbiAgICBkYXRhc2V0LmZvckVhY2goKGRhdGE6IE1haW5Gb3JtKSA9PiB7XG4gICAgICBpZiAoZGF0YSkge1xuICAgICAgICBpbmRleCsrO1xuICAgICAgICBjb25zdCByb3c6IEFqZlRhYmxlQ2VsbFtdID0gW107XG4gICAgICAgIGZpZWxkcy5mb3JFYWNoKChmaWVsZDogc3RyaW5nLCBjZWxsSWR4OiBudW1iZXIpID0+IHtcbiAgICAgICAgICBsZXQgY2VsbFZhbHVlID0gZGF0YVtmaWVsZF0gfHwgJyc7XG4gICAgICAgICAgaWYgKHJvd0xpbmsgIT0gbnVsbCAmJiBjZWxsSWR4ID09PSByb3dMaW5rWydwb3NpdGlvbiddKSB7XG4gICAgICAgICAgICBjZWxsVmFsdWUgPSBgPGEgaHJlZj0nJHtkYXRhW3Jvd0xpbmtbJ2xpbmsnXV19Jz4gJHtkYXRhW2ZpZWxkXX08L2E+YDtcbiAgICAgICAgICB9XG4gICAgICAgICAgcm93LnB1c2goe1xuICAgICAgICAgICAgdmFsdWU6IGNlbGxWYWx1ZSxcbiAgICAgICAgICAgIGNvbHNwYW46IGNvbHNwYW5zW2NlbGxJZHhdICYmIGNvbHNwYW5zW2NlbGxJZHhdID4gMCA/IGNvbHNwYW5zW2NlbGxJZHhdIDogMSxcbiAgICAgICAgICAgIHJvd3NwYW46IDEsXG4gICAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgICB0ZXh0QWxpZ246IHRleHRBbGlnbltjZWxsSWR4XSA/IHRleHRBbGlnbltjZWxsSWR4XSA6ICdjZW50ZXInLFxuICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJyxcbiAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBpbmRleCAlIDIgPT09IDAgPyBiYWNrZ3JvdW5kQ29sb3JBIDogYmFja2dyb3VuZENvbG9yQixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChkaWFsb2dGaWVsZHMgJiYgZGlhbG9nRmllbGRzLmxlbmd0aCkge1xuICAgICAgICAgIGxldCBkaWFsb2dIdG1sOiBzdHJpbmdbXSA9IFtdO1xuICAgICAgICAgIGRpYWxvZ0ZpZWxkcy5mb3JFYWNoKChmaWVsZDogc3RyaW5nLCBjZWxsSWR4OiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgIGxldCBmaWVsZFZhbHVlID0gJ1wiXCInO1xuICAgICAgICAgICAgaWYgKGRhdGFbZmllbGRdICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgZmllbGRWYWx1ZSA9XG4gICAgICAgICAgICAgICAgXCI8cCBjbGFzcz0nZGlhbG9nLWl0ZW0nPjxiPlwiICtcbiAgICAgICAgICAgICAgICBkaWFsb2dMYWJlbEZpZWxkc1tjZWxsSWR4XS5yZXBsYWNlKC9bJ1xcXCJdKy9nLCAnJykgK1xuICAgICAgICAgICAgICAgICc8L2I+IDxzcGFuPicgK1xuICAgICAgICAgICAgICAgIGRhdGFbZmllbGRdICtcbiAgICAgICAgICAgICAgICAnPC9zcGFuPjwvcD4nO1xuICAgICAgICAgICAgICBkaWFsb2dIdG1sLnB1c2goZmllbGRWYWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICByb3cucHVzaCh7XG4gICAgICAgICAgICB2YWx1ZTpcbiAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJyZWFkX21vcmVfY2VsbFwiPjxwIGNsYXNzPVwicmVhZF9tb3JlX3RleHRcIj5SZWFkIG1vcmU8L3A+PGIgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiPmFkZF9jaXJjbGVfb3V0bGluZTwvYj48L2Rpdj4nLFxuICAgICAgICAgICAgZGlhbG9nSHRtbDogZGlhbG9nSHRtbC5qb2luKCcgJyksXG4gICAgICAgICAgICBjb2xzcGFuOiAxLFxuICAgICAgICAgICAgcm93c3BhbjogMSxcbiAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXG4gICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snLFxuICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IGluZGV4ICUgMiA9PT0gMCA/IGJhY2tncm91bmRDb2xvckEgOiBiYWNrZ3JvdW5kQ29sb3JCLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXMucHVzaChyb3cpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIHJldHVybiByZXM7XG59XG5cbi8qKlxuICogY3JlYXRlIGEgd2lkZ2V0IGRhdGFzZXQgaW50byBhIGNvbnRlbnQgbGlzdCwgYmFzZWQgb24gYSBsaXN0IG9mIEZvcm1zLCBmb3IgcGFnaW5hdGVkIHdpZGdldFxuICpcbiAqIEBwYXJhbSBkYXRhc2V0IHRoZSBkYXRhc2V0IGZvciB0aGUgd2lkZ2V0c1xuICogQHBhcmFtIGZpZWxkcyB0aGUgbGlzdCBvZiBmaWVsZHMgbmFtZSBmb3IgZWFjaCByb3dcbiAqIEBwYXJhbSByb3dMaW5rIHRoZSBodHRwIGxpbmsgZm9yIHRoZSByb3csIHdpdGggdGhlIGZvcm0gZmllbGQgbmFtZSB3aXRoIHRoZSBsaW5rIHZhbHVlIGFuZCB0aGUgY29sdW1uIHBvc2l0aW9uIGZvciB0aGUgbGluay5cbiAqIGllOiB7J2xpbmsnOiAnaG9tZV9saW5rJywgJ3Bvc2l0aW9uJzogMH1cbiAqIEBwYXJhbSBjZWxsU3R5bGVzIGNzcyBzdHlsZXMgZm9yIGNlbGxzXG4gKiBAcGFyYW0gcm93U3R5bGUgY3NzIHN0eWxlcyBmb3Igcm93c1xuICogQHBhcmFtIHBlcmNXaWR0aCBhbiBhcnJheSB3aXRoIHRoZSBzYW1lIGxlbmd0aCBvZiBmaWVsZHMgcGFyYW0sIHdpdGggdGhlIHdpZHRoIGZvciB0aGUgY29sdW1ucy5cbiAqIGllOiBbJzEwJScsICczMCUnLCAnMTAlJywgJzI1JScsICcxNSUnLCAnMTAlJ11cbiAqIEBwYXJhbSBiYWNrZ3JvdW5kQ29sb3JBIHRoZSBmaXJzdCBiYWNrZ3JvdWQgY29sb3JcbiAqIEBwYXJhbSBiYWNrZ3JvdW5kQ29sb3JCIHRoZSBzZWNvbmQgYmFja2dyb3VkIGNvbG9yXG4gKiBAcmV0dXJucyBBbiBBamZUYWJsZVdpZGdldCBsaXN0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBidWlsZFdpZGdldERhdGFzZXQoXG4gIGRhdGFzZXQ6IE1haW5Gb3JtW10sXG4gIGZpZWxkczogc3RyaW5nW10sXG4gIHJvd0xpbms6IHtsaW5rOiBzdHJpbmc7IHBvc2l0aW9uOiBudW1iZXJ9IHwgbnVsbCxcbiAgY2VsbFN0eWxlczoge1trZXk6IHN0cmluZ106IGFueX0gfCBudWxsLFxuICByb3dTdHlsZToge1trZXk6IHN0cmluZ106IGFueX0gfCBudWxsLFxuICBwZXJjV2lkdGg6IHN0cmluZ1tdLFxuICBiYWNrZ3JvdW5kQ29sb3JBPzogc3RyaW5nLFxuICBiYWNrZ3JvdW5kQ29sb3JCPzogc3RyaW5nLFxuKTogYW55W10ge1xuICBjb25zdCByZXM6IHtba2V5OiBzdHJpbmddOiBhbnl9W10gPSBbXTtcbiAgaWYgKGJhY2tncm91bmRDb2xvckEgPT0gbnVsbCkge1xuICAgIGJhY2tncm91bmRDb2xvckEgPSAnd2hpdGUnO1xuICB9XG4gIGlmIChiYWNrZ3JvdW5kQ29sb3JCID09IG51bGwpIHtcbiAgICBiYWNrZ3JvdW5kQ29sb3JCID0gJyNkZGQnO1xuICB9XG4gIGlmIChyb3dTdHlsZSA9PSBudWxsKSB7XG4gICAgcm93U3R5bGUgPSB7XG4gICAgICAndGV4dC1hbGlnbic6ICdyaWdodCcsXG4gICAgICAnbWFyZ2luLWJvdHRvbSc6IDAsXG4gICAgICAnYm9yZGVyLWNvbGxhcHNlJzogJ2NvbGxhcHNlJyxcbiAgICB9O1xuICB9XG4gIGlmIChjZWxsU3R5bGVzID09IG51bGwpIHtcbiAgICBjZWxsU3R5bGVzID0ge1xuICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcbiAgICAgIGNvbG9yOiAnYmxhY2snLFxuICAgIH07XG4gIH1cbiAgaWYgKHBlcmNXaWR0aCA9PSBudWxsIHx8IHBlcmNXaWR0aC5sZW5ndGggIT09IGZpZWxkcy5sZW5ndGgpIHtcbiAgICBjb25zdCBjZWxsV2lkdGggPSAxMDAgLyBmaWVsZHMubGVuZ3RoICsgJyUnO1xuICAgIHBlcmNXaWR0aCA9IFtdO1xuICAgIGZpZWxkcy5mb3JFYWNoKF8gPT4gcGVyY1dpZHRoLnB1c2goY2VsbFdpZHRoKSk7XG4gIH1cblxuICBpZiAoZGF0YXNldCkge1xuICAgIGxldCBpbmRleDogbnVtYmVyID0gMDtcbiAgICBkYXRhc2V0LmZvckVhY2goKGRhdGE6IE1haW5Gb3JtKSA9PiB7XG4gICAgICBpZiAoZGF0YSkge1xuICAgICAgICBpbmRleCsrO1xuICAgICAgICAvLyBSb3cgaXMgYW4gQWpmVGFibGVXaWRnZXRcbiAgICAgICAgY29uc3Qgcm93OiB7W2tleTogc3RyaW5nXTogYW55fSA9IHtcbiAgICAgICAgICBzdHlsZXM6IHtcbiAgICAgICAgICAgICd0ZXh0LWFsaWduJzogJ3JpZ2h0JyxcbiAgICAgICAgICAgICdtYXJnaW4tYm90dG9tJzogMCxcbiAgICAgICAgICAgICdib3JkZXItY29sbGFwc2UnOiAnY29sbGFwc2UnLFxuICAgICAgICAgICAgLi4ucm93U3R5bGUsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB2aXNpYmlsaXR5OiB7Y29uZGl0aW9uOiAndHJ1ZSd9LFxuICAgICAgICAgIHdpZGdldFR5cGU6IDUsXG4gICAgICAgICAgZGF0YXNldDogW1tdXSBhcyBhbnlbXVtdLFxuICAgICAgICAgIGNlbGxTdHlsZXM6IHsnYm9yZGVyLXRvcCc6ICcxcHggc29saWQgZ3JleSd9LFxuICAgICAgICB9O1xuXG4gICAgICAgIGZpZWxkcy5mb3JFYWNoKChmaWVsZDogc3RyaW5nLCBjZWxsSWR4OiBudW1iZXIpID0+IHtcbiAgICAgICAgICBsZXQgZm9ybXVsYUNlbGwgPSAnXCJcIic7XG4gICAgICAgICAgaWYgKGRhdGFbZmllbGRdICE9IG51bGwpIHtcbiAgICAgICAgICAgIGZvcm11bGFDZWxsID0gJ1wiJyArIGRhdGFbZmllbGRdICsgJ1wiJztcbiAgICAgICAgICAgIGlmIChyb3dMaW5rICE9IG51bGwgJiYgY2VsbElkeCA9PT0gcm93TGlua1sncG9zaXRpb24nXSkge1xuICAgICAgICAgICAgICBmb3JtdWxhQ2VsbCA9IGBcIjxhIGhyZWY9JyR7ZGF0YVtyb3dMaW5rWydsaW5rJ11dfSc+ICR7ZGF0YVtmaWVsZF19PC9hPlwiYDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICByb3dbJ2RhdGFzZXQnXVswXS5wdXNoKHtcbiAgICAgICAgICAgIGxhYmVsOiAnJyxcbiAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXG4gICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snLFxuICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IGluZGV4ICUgMiA9PT0gMCA/IGJhY2tncm91bmRDb2xvckEgOiBiYWNrZ3JvdW5kQ29sb3JCLFxuICAgICAgICAgICAgICAuLi5jZWxsU3R5bGVzLFxuICAgICAgICAgICAgICB3aWR0aDogcGVyY1dpZHRoW2NlbGxJZHhdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZvcm11bGE6IHtcbiAgICAgICAgICAgICAgZm9ybXVsYTogZm9ybXVsYUNlbGwsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29sc3BhbjogMSxcbiAgICAgICAgICAgIHJvd3NwYW46IDEsXG4gICAgICAgICAgICBhZ2dyZWdhdGlvbjoge1xuICAgICAgICAgICAgICBhZ2dyZWdhdGlvbjogMCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXMucHVzaChyb3cpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIHJldHVybiByZXM7XG59XG5cbi8qKlxuICogY3JlYXRlIGEgd2lkZ2V0IGRhdGFzZXQgaW50byBhIGNvbnRlbnQgbGlzdCwgYmFzZWQgb24gYSBsaXN0IG9mIEZvcm1zLCBmb3IgcGFnaW5hdGVkIHdpZGdldC5cbiAqIEVhY2ggcm93IGlzIGEgQWpmRGlhbG9nV2lkZ2V0IGFuZCwgb24gY2xpY2ssIG9wZW4gYSBkaWFsb2cuXG4gKlxuICogQHBhcmFtIGRhdGFzZXQgdGhlIGRhdGFzZXQgZm9yIHRoZSB3aWRnZXRzXG4gKiBAcGFyYW0gZmllbGRzIHRoZSBsaXN0IG9mIGZpZWxkcyBuYW1lIGZvciBlYWNoIHJvd1xuICogQHBhcmFtIGRpYWxvZ0ZpZWxkcyB0aGUgbGlzdCBvZiBmaWVsZHMgbmFtZSB0byBzaG93IGluIHRoZSBkaWFsb2dcbiAqIEBwYXJhbSBkaWFsb2dMYWJlbEZpZWxkcyB0aGUgbGlzdCBvZiBsYWJlbHMgZm9yIGVhY2ggZGlhbG9nRmllbGRzXG4gKiBAcGFyYW0gcm93TGluayB0aGUgaHR0cCBsaW5rIGZvciB0aGUgcm93LCB3aXRoIHRoZSBmb3JtIGZpZWxkIG5hbWUgd2l0aCB0aGUgbGluayB2YWx1ZSBhbmQgdGhlIGNvbHVtbiBwb3NpdGlvbiBmb3IgdGhlIGxpbmsuXG4gKiBpZTogeydsaW5rJzogJ2hvbWVfbGluaycsICdwb3NpdGlvbic6IDB9XG4gKiBAcGFyYW0gY2VsbFN0eWxlcyBjc3Mgc3R5bGVzIGZvciBjZWxsc1xuICogQHBhcmFtIHJvd1N0eWxlIGNzcyBzdHlsZXMgZm9yIHJvd3NcbiAqIEBwYXJhbSBwZXJjV2lkdGggYW4gYXJyYXkgd2l0aCB0aGUgc2FtZSBsZW5ndGggb2YgZmllbGRzIHBhcmFtLCB3aXRoIHRoZSB3aWR0aCBmb3IgdGhlIGNvbHVtbnMuXG4gKiBpZTogWycxMCUnLCAnMzAlJywgJzEwJScsICcyNSUnLCAnMTUlJywgJzEwJSddXG4gKiBAcGFyYW0gYmFja2dyb3VuZENvbG9yQSB0aGUgZmlyc3QgYmFja2dyb3VkIGNvbG9yXG4gKiBAcGFyYW0gYmFja2dyb3VuZENvbG9yQiB0aGUgc2Vjb25kIGJhY2tncm91ZCBjb2xvclxuICogQHJldHVybnMgQW4gQWpmRGlhbG9nV2lkZ2V0IGxpc3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkV2lkZ2V0RGF0YXNldFdpdGhEaWFsb2coXG4gIGRhdGFzZXQ6IE1haW5Gb3JtW10sXG4gIGZpZWxkczogc3RyaW5nW10sXG4gIGRpYWxvZ0ZpZWxkczogc3RyaW5nW10sXG4gIGRpYWxvZ0xhYmVsRmllbGRzOiBzdHJpbmdbXSxcbiAgY2VsbFN0eWxlczoge1trZXk6IHN0cmluZ106IGFueX0gfCBudWxsLFxuICByb3dTdHlsZToge1trZXk6IHN0cmluZ106IGFueX0gfCBudWxsLFxuICBwZXJjV2lkdGg6IHN0cmluZ1tdLFxuICBiYWNrZ3JvdW5kQ29sb3JBPzogc3RyaW5nLFxuICBiYWNrZ3JvdW5kQ29sb3JCPzogc3RyaW5nLFxuKTogYW55W10ge1xuICBjb25zdCByZXM6IHtba2V5OiBzdHJpbmddOiBhbnl9W10gPSBbXTtcbiAgaWYgKGJhY2tncm91bmRDb2xvckEgPT0gbnVsbCkge1xuICAgIGJhY2tncm91bmRDb2xvckEgPSAnd2hpdGUnO1xuICB9XG4gIGlmIChiYWNrZ3JvdW5kQ29sb3JCID09IG51bGwpIHtcbiAgICBiYWNrZ3JvdW5kQ29sb3JCID0gJyNkZGQnO1xuICB9XG4gIGlmIChyb3dTdHlsZSA9PSBudWxsKSB7XG4gICAgcm93U3R5bGUgPSB7XG4gICAgICAndGV4dC1hbGlnbic6ICdyaWdodCcsXG4gICAgICAnbWFyZ2luLWJvdHRvbSc6IDAsXG4gICAgICAnYm9yZGVyLWNvbGxhcHNlJzogJ2NvbGxhcHNlJyxcbiAgICB9O1xuICB9XG4gIGlmIChjZWxsU3R5bGVzID09IG51bGwpIHtcbiAgICBjZWxsU3R5bGVzID0ge1xuICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcbiAgICAgIGNvbG9yOiAnYmxhY2snLFxuICAgIH07XG4gIH1cbiAgaWYgKHBlcmNXaWR0aCA9PSBudWxsIHx8IHBlcmNXaWR0aC5sZW5ndGggIT09IGZpZWxkcy5sZW5ndGgpIHtcbiAgICBjb25zdCBjZWxsV2lkdGggPSAxMDAgLyBmaWVsZHMubGVuZ3RoICsgJyUnO1xuICAgIHBlcmNXaWR0aCA9IFtdO1xuICAgIGZpZWxkcy5mb3JFYWNoKF8gPT4gcGVyY1dpZHRoLnB1c2goY2VsbFdpZHRoKSk7XG4gIH1cblxuICBpZiAoZGF0YXNldCkge1xuICAgIGxldCBpbmRleDogbnVtYmVyID0gMDtcbiAgICBkYXRhc2V0LmZvckVhY2goKGRhdGE6IE1haW5Gb3JtKSA9PiB7XG4gICAgICBpZiAoZGF0YSkge1xuICAgICAgICBpbmRleCsrO1xuICAgICAgICAvLyBSb3cgaXMgYW4gQWpmVGFibGVXaWRnZXRcbiAgICAgICAgY29uc3Qgcm93OiB7W2tleTogc3RyaW5nXTogYW55fSA9IHtcbiAgICAgICAgICBzdHlsZXM6IHtcbiAgICAgICAgICAgICd0ZXh0LWFsaWduJzogJ3JpZ2h0JyxcbiAgICAgICAgICAgICdtYXJnaW4tYm90dG9tJzogMCxcbiAgICAgICAgICAgICdib3JkZXItY29sbGFwc2UnOiAnY29sbGFwc2UnLFxuICAgICAgICAgICAgLi4ucm93U3R5bGUsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB2aXNpYmlsaXR5OiB7Y29uZGl0aW9uOiAndHJ1ZSd9LFxuICAgICAgICAgIHdpZGdldFR5cGU6IDUsXG4gICAgICAgICAgZGF0YXNldDogW1tdXSBhcyBhbnlbXVtdLFxuICAgICAgICAgIGNlbGxTdHlsZXM6IHsnYm9yZGVyLXRvcCc6ICcxcHggc29saWQgZ3JleSd9LFxuICAgICAgICB9O1xuXG4gICAgICAgIGZpZWxkcy5mb3JFYWNoKChmaWVsZDogc3RyaW5nLCBjZWxsSWR4OiBudW1iZXIpID0+IHtcbiAgICAgICAgICBsZXQgZm9ybXVsYUNlbGwgPSAnXCJcIic7XG4gICAgICAgICAgaWYgKGRhdGFbZmllbGRdICE9IG51bGwpIHtcbiAgICAgICAgICAgIGZvcm11bGFDZWxsID0gJ1wiJyArIGRhdGFbZmllbGRdICsgJ1wiJztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByb3dbJ2RhdGFzZXQnXVswXS5wdXNoKHtcbiAgICAgICAgICAgIGxhYmVsOiAnJyxcbiAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXG4gICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snLFxuICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IGluZGV4ICUgMiA9PT0gMCA/IGJhY2tncm91bmRDb2xvckEgOiBiYWNrZ3JvdW5kQ29sb3JCLFxuICAgICAgICAgICAgICAuLi5jZWxsU3R5bGVzLFxuICAgICAgICAgICAgICB3aWR0aDogcGVyY1dpZHRoW2NlbGxJZHhdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZvcm11bGE6IHtcbiAgICAgICAgICAgICAgZm9ybXVsYTogZm9ybXVsYUNlbGwsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29sc3BhbjogMSxcbiAgICAgICAgICAgIHJvd3NwYW46IDEsXG4gICAgICAgICAgICBhZ2dyZWdhdGlvbjoge1xuICAgICAgICAgICAgICBhZ2dyZWdhdGlvbjogMCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxldCBodG1sRGlhbG9nOiBzdHJpbmdbXSA9IFtdO1xuICAgICAgICBkaWFsb2dGaWVsZHMuZm9yRWFjaCgoZmllbGQ6IHN0cmluZywgY2VsbElkeDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgbGV0IGZpZWxkVmFsdWUgPSAnXCJcIic7XG4gICAgICAgICAgaWYgKGRhdGFbZmllbGRdICE9IG51bGwpIHtcbiAgICAgICAgICAgIGZpZWxkVmFsdWUgPVxuICAgICAgICAgICAgICBcIjxwIGNsYXNzPSdkaWFsb2ctaXRlbSc+PGI+XCIgK1xuICAgICAgICAgICAgICBkaWFsb2dMYWJlbEZpZWxkc1tjZWxsSWR4XSArXG4gICAgICAgICAgICAgICc8L2I+IDxzcGFuPicgK1xuICAgICAgICAgICAgICBkYXRhW2ZpZWxkXSArXG4gICAgICAgICAgICAgICc8L3NwYW4+PC9wPic7XG4gICAgICAgICAgICBodG1sRGlhbG9nLnB1c2goZmllbGRWYWx1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBkaWFsb2dDb250ZW50OiB7W2tleTogc3RyaW5nXTogYW55fSA9IHtcbiAgICAgICAgICB3aWRnZXRUeXBlOiAzLFxuICAgICAgICAgIHN0eWxlczoge1xuICAgICAgICAgICAgJ21hcmdpbic6ICcwIDFlbScsXG4gICAgICAgICAgICAncGFkZGluZyc6ICc1cHggMTBweCcsXG4gICAgICAgICAgICAnbWF4LWhlaWdodCc6ICczNjBweCcsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB2aXNpYmlsaXR5OiB7Y29uZGl0aW9uOiAndHJ1ZSd9LFxuICAgICAgICAgIGh0bWxUZXh0OiBodG1sRGlhbG9nLmpvaW4oJyAnKSxcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBUaGlzIGlzIGEgRGlhbG9nIFdpZGdldCwgYWRkZWQgYXMgY29tdGFpbmVyIGZvciBlYWNoIHRhYmxlIHdpZGdldFxuICAgICAgICBjb25zdCBkaWFsb2dSb3c6IHtba2V5OiBzdHJpbmddOiBhbnl9ID0ge1xuICAgICAgICAgIHdpZGdldFR5cGU6IDEzLFxuICAgICAgICAgIHN0eWxlczoge1xuICAgICAgICAgICAgJ21hcmdpbic6ICcwJyxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHZpc2liaWxpdHk6IHtjb25kaXRpb246ICd0cnVlJ30sXG4gICAgICAgICAgdG9nZ2xlOiByb3csXG4gICAgICAgICAgY29udGVudDogW2RpYWxvZ0NvbnRlbnRdLFxuICAgICAgICB9O1xuICAgICAgICByZXMucHVzaChkaWFsb2dSb3cpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIHJldHVybiByZXM7XG59XG5cbi8qKlxuICogRGVwcmVjYXRlZC4gVXNlIE1BUFxuICovXG5leHBvcnQgZnVuY3Rpb24gUkVQRUFUKFxuICBmb3JtczogTWFpbkZvcm1bXSxcbiAgYXJyYXk6IHN0cmluZ1tdLFxuICBmbjogQWpmVmFsaWRhdGlvbkZuLFxuICBmaWVsZDogc3RyaW5nLFxuICBmaWx0ZXI6IEZ1bmN8c3RyaW5nID0gJ3RydWUnLFxuKTogYW55W10ge1xuICBpZiAodHlwZW9mKGZpbHRlcikgPT09ICdzdHJpbmcnKSB7XG4gICAgZmlsdGVyID0gY3JlYXRlRnVuY3Rpb24oZmlsdGVyKTtcbiAgfVxuICByZXR1cm4gYXJyYXkubWFwKGN1cnJlbnQgPT4ge1xuICAgIGNvbnN0IGN1cnJlbnRGaWx0ZXIgPSAoY3R4PzogQWpmQ29udGV4dCkgPT4gKGZpbHRlciBhcyBGdW5jKSh7Li4uY3R4LCBjdXJyZW50fSk7XG4gICAgcmV0dXJuIChmbiBhcyBhbnkpKGZvcm1zLCBmaWVsZCwgY3VycmVudEZpbHRlcik7XG4gIH0pO1xufVxuXG4vKipcbiAqIE1hcHMgZnVuYyB0byB0aGUgZWxlbWVudHMgb2YgYXJyYXkuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBNQVAoYXJyYXk6IGFueVtdLCBmdW5jOiAoYTogYW55KSA9PiBhbnkpOiBhbnlbXSB7XG4gIHJldHVybiBhcnJheS5tYXAoZnVuYyk7XG59XG5cbi8qKlxuICogRm9yIGVhY2ggZm9ybSBpbiBmb3JtcywgdGhlIHNwZWNpZmllZCBmaWVsZCBpcyBzZXQgd2l0aCB0aGUgdmFsdWUgZ2l2ZW4gYnkgZXhwcmVzc2lvbi5cbiAqIFRoZSBmb3JtJ3MgZmllbGRzIGNhbiBiZSB1c2VkIGluc2lkZSBleHByZXNzaW9uLlxuICovXG5leHBvcnQgZnVuY3Rpb24gQVBQTFkoZm9ybXM6IE1haW5Gb3JtW10sIGZpZWxkOiBzdHJpbmcsIGV4cHJlc3Npb246IEZ1bmN8c3RyaW5nKTogTWFpbkZvcm1bXSB7XG4gIGZvcm1zID0gY2xvbmVNYWluRm9ybXMoZm9ybXMpO1xuICBpZiAodHlwZW9mKGV4cHJlc3Npb24pID09PSAnc3RyaW5nJykge1xuICAgIGV4cHJlc3Npb24gPSBjcmVhdGVGdW5jdGlvbihleHByZXNzaW9uKTtcbiAgfVxuICBmb3IgKGNvbnN0IGZvcm0gb2YgZm9ybXMpIHtcbiAgICBpZiAoZm9ybSAhPSBudWxsKSB7XG4gICAgICBmb3JtW2ZpZWxkXSA9IGV4cHJlc3Npb24oZm9ybSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBmb3Jtcztcbn1cblxuLyoqXG4gKiBSb3VuZHMgbnVtIHRvIHRoZSBzcGVjaWZpZWQgbnVtYmVyIG9mIGRpZ2l0cyBhZnRlciB0aGUgcG9pbnQgKG9yIHplcm8pLlxuICovXG5leHBvcnQgZnVuY3Rpb24gUk9VTkQobnVtOiBudW1iZXIgfCBzdHJpbmcsIGRpZ2l0cz86IG51bWJlcik6IG51bWJlciB7XG4gIHJldHVybiByb3VuZChudW0sIGRpZ2l0cyk7XG59XG5cbi8qKlxuICogRGVwcmVjYXRlZC4gVXNlIElGX1RIRU5fRUxTRVxuICovXG5leHBvcnQgZnVuY3Rpb24gRVZBTFVBVEUoY29uZGl0aW9uOiBzdHJpbmcsIGJyYW5jaDE6IGFueSwgYnJhbmNoMjogYW55KTogYW55IHtcbiAgaWYgKGV2YWx1YXRlRXhwcmVzc2lvbihjb25kaXRpb24pKSB7XG4gICAgcmV0dXJuIGJyYW5jaDE7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGJyYW5jaDI7XG4gIH1cbn1cblxuLyoqXG4gKiBUZWxscyBpZiBhcnIgaW5jbHVkZXMgZWxlbVxuICovXG5leHBvcnQgZnVuY3Rpb24gSU5DTFVERVMoYXJyOiBhbnlbXSwgZWxlbTogYW55KTogYm9vbGVhbiB7XG4gIHJldHVybiBhcnIuaW5jbHVkZXMoZWxlbSk7XG59XG5cbi8qKlxuICogVGhpcyBmdW5jdGlvbiBidWlsZHMgYSBkYXRhIHN0cnVjdHVyZSB0aGF0IGFsbG93cyB0aGUgdXNlIG9mIHRoZSBoaW5kaWtpdCBmb3JtdWxhc1xuICogZm9yIGV2ZXJ5IGZvcm1zIHdpdGggcmVwZWF0aW5nIHNsaWRlcy5cbiAqIEluIHBhcnRpY3VsYXIsIGl0IGJ1aWxkcyBhIG1haW4gZGF0YSBmb3JtIHdpdGggYWxsIHRoZSBkYXRhIHJlbGF0aW5nIHRvIHRoZSBzbGlkZXMgYW5kXG4gKiBhIGRpY3Rpb25hcnkgd2l0aCB0aGUgbmFtZSByZXBzIHRodXMgbWFkZSBpbnN0YW5jZSBzbGlkZU5hbWUgZm9ybXMuXG4gKiBXaGVyZSBhIGZvcm0gaXMgYXNzb2NpYXRlZCB3aXRoIGVhY2ggaW5zdGFuY2Ugb2YgdGhlIHJlcGVhdGluZyBzbGlkZS5cbiAqIGV4YW1wbGU6XG4gKiBzaW1wbGUgZm9ybTpcbiAqICB7XG4gKiAgICAkdmFsdWU6IFwiQUdPXCJcbiAqICAgIGNpdHRhZGluYW56YV9fMDogXCJBR09cIlxuICogICAgY29kaWNlX2Zpc2NhbGVfXzA6IFwiamRmbGpnbMOya8Oya8OyXCJcbiAqICAgIGNvdW50cnlfXzA6IFwiQUdPXCJcbiAqICAgIGRhdGVfZW5kOiBcIjIwMjEtMDEtMTBcIlxuICogICAgZGF0ZV9zdGFydDogXCIyMDIxLTAxLTEwXCJcbiAqICAgIGRvYl9fMDogXCIyMDIxLTAzLTExXCJcbiAqICAgIGZpcnN0X25hbWVfXzA6IFwicGlwcG9cIlxuICogICAgZ2VuZGVyX18wOiBcImZcIlxuICogICAgaWRfZmFtaWx5OiBcIjNiZWYzYTNmLWQ5NWQtNGEwOS04ZGY0LWU4MTJjNTVjNjFjNlwiXG4gKiAgICBpc3RydXppb25lX18wOiBudWxsXG4gKiAgICBsYXN0X25hbWVfXzA6IFwicGlwcG9cIlxuICogICAgcGVybWVzc29fc29nZ2lvcm5vX18wOiBcIm5vXCJcbiAqICAgIHJlbGF6aW9uZV9fMDogXCJnZW5pdG9yZVwiXG4gKiAgICBzb2xpZGFuZG86IFwic29saWRhbmRvMVwiXG4gKiAgICBzdGF0b19jaXZpbGVfXzA6IG51bGxcbiAqICB9XG4gKiBhZnRlciBCVUlMRF9EQVRBU0VUXG4gKiBNYWluRm9ybTpcbiAqIHtcbiAqICAgICR2YWx1ZTogXCJBR09cIlxuICogICAgYWpmX2Zvcm1faWQ6IDAgKiogYWRkZWQgYXRyaWJ1dGUgdGhhdCByYXBwcmVzZW50IHRoZSBpbmRleCBwb3NpdGlvbiBpbnNpZGVzIGlucHV0IGZvcm0gbGlzdC5cbiAqICAgIGFqZl9mYW1pbHlfY29tcG9uZW50X2NvdW50OiAxKiogYWRkZWQgYXRyaWJ1dGUgdGhhdCByYXBwcmVzZW50IHRoZSBpbnN0YW5jZSBudW1iZXIgb2YgZmFtaWxpX2NvbXBvbmVudCByZXBlYXRpbmcgc2xpZGVzLlxuICogICAgZGF0ZV9lbmQ6IFwiMjAyMS0wMS0xMFwiXG4gKiAgICBkYXRlX3N0YXJ0OiBcIjIwMjEtMDEtMTBcIlxuICogICAgaWRfZmFtaWx5OiBcIjNiZWYzYTNmLWQ5NWQtNGEwOS04ZGY0LWU4MTJjNTVjNjFjNlwiXG4gKiAgICByZXBzOiB7XG4gKiAgICAgIGZhbWlseV9jb21wb25lbnQ6IFtcbiAqICAgICAgICB7XG4gKiAgICAgICAgICBhamZfZmFtaWx5X2NvbXBvbmVudF9yZXA6IDAgKiogYWRkZWQgYXRyaWJ1dGUgdGhhdCByYXBwcmVzZW50IHRoZSBvcmRlciBpbnN0YW5jZSBvZiBmYW1pbHlfY29tcG9uZW50IHJlcGVhdGluZyBzbGlkZS5cbiAqICAgICAgICAgIGNpdHRhZGluYW56YTogXCJBR09cIlxuICogICAgICAgICAgY29kaWNlX2Zpc2NhbGU6IFwiamRmbGpnbMOya8Oya8OyXCJcbiAqICAgICAgICAgIGNvdW50cnk6IFwiQUdPXCJcbiAqICAgICAgICAgIGRvYjogXCIyMDIxLTAzLTExXCJcbiAqICAgICAgICAgIGZpcnN0X25hbWU6IFwicGlwcG9cIlxuICogICAgICAgICAgZ2VuZGVyOiBcImZcIlxuICogICAgICAgICAgaXN0cnV6aW9uZTogbnVsbFxuICogICAgICAgICAgbGFzdF9uYW1lOiBcInBpcHBvXCJcbiAqICAgICAgICAgIHBlcm1lc3NvX3NvZ2dpb3JubzogXCJub1wiXG4gKiAgICAgICAgICByZWxhemlvbmU6IFwiZ2VuaXRvcmVcIlxuICogICAgICAgICAgc3RhdG9fY2l2aWxlOiBudWxsXG4gKiAgICAgICAgfVxuICogICAgICBdXG4gKiAgICB9XG4gKiB9XG4gKlxuICogQHBhcmFtIHtGb3JtW119IGZvcm1zXG4gKiBAcGFyYW0geyp9IFtzY2hlbWFdIGlmIHNjaGVtYSBpcyBwcm92aWRlZCB0aGUgaW5zdGFuY2VzIGluc2lkZSB0aGUgcmVwcyBtYXRjaCB3aXRoIGVmZmVjdGl2ZVxuICogc2xpZGUgbmFtZS4gT3RoZXJ3aXNlIGFsbCByZXBlYXRpbmcgc2xpZGVzIGFyZSBhc3NvY2lhdGVzIHRvIGdlbmVyaWMgc2xpZGUgbmFtZSBcInJlcFwiLlxuICogQHJldHVybiB7Kn0gIHtNYWluRm9ybVtdfVxuICovXG5leHBvcnQgZnVuY3Rpb24gQlVJTERfREFUQVNFVChmb3JtczogRm9ybVtdLCBzY2hlbWE/OiBhbnkpOiBNYWluRm9ybVtdIHtcbiAgY29uc3QgcmVzOiBNYWluRm9ybVtdID0gW107XG4gIGNvbnN0IGdlbmVyYXRlTWV0YWRhdGEgPSAoc2xpZGVOYW1lOiBzdHJpbmcsIHNsaWRlSW5zdGFuY2U6IG51bWJlcikgPT4ge1xuICAgIGNvbnN0IHJlc2c6IHtbc25hbWU6IHN0cmluZ106IGFueX0gPSB7fTtcbiAgICByZXNnW2BhamZfJHtzbGlkZU5hbWV9X3JlcGBdID0gc2xpZGVJbnN0YW5jZTtcbiAgICByZXR1cm4gcmVzZztcbiAgfTtcblxuICBmb3JtcyA9IFsuLi4oZm9ybXMgfHwgW10pXTtcblxuICBpZiAoc2NoZW1hICE9IG51bGwpIHtcbiAgICBjb25zdCByZXBlYXRpbmdTbGlkZXM6IGFueVtdID0gc2NoZW1hLm5vZGVzLmZpbHRlcigobm9kZTogYW55KSA9PiBub2RlLm5vZGVUeXBlID09PSA0KTtcbiAgICBjb25zdCBvYmo6IHtbZmllbGROYW1lOiBzdHJpbmddOiBzdHJpbmd9ID0ge307XG4gICAgcmVwZWF0aW5nU2xpZGVzLmZvckVhY2goc2xpZGUgPT4ge1xuICAgICAgbGV0IG5vZGVGaWVsZHMgPSBzbGlkZS5ub2Rlcy5tYXAoKG46IGFueSkgPT4gbi5uYW1lKTtcbiAgICAgIG5vZGVGaWVsZHMuZm9yRWFjaCgobm9kZUZpZWxkOiBzdHJpbmcpID0+IHtcbiAgICAgICAgb2JqW25vZGVGaWVsZF0gPSBzbGlkZS5uYW1lO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBmb3Jtcy5mb3JFYWNoKChmLCBmb3JtSWR4KSA9PiB7XG4gICAgICBjb25zdCBtYWluRm9ybTogTWFpbkZvcm0gPSB7cmVwczoge319O1xuICAgICAgY29uc3QgZktleXM6IHN0cmluZ1tdID0gT2JqZWN0LmtleXMoZik7XG4gICAgICBjb25zdCBpbnN0YW5jZXM6IHtbc2xpZGVOYW1lOiBzdHJpbmddOiBhbnl9ID0ge307XG5cbiAgICAgIGZLZXlzLmZvckVhY2goZmtleSA9PiB7XG4gICAgICAgIGNvbnN0IHNwbGl0dGVkS2V5OiBzdHJpbmdbXSA9IGZrZXkuc3BsaXQoJ19fJyk7XG4gICAgICAgIGNvbnN0IHNwbGl0dGVkTGVuZ3RoOiBudW1iZXIgPSBzcGxpdHRlZEtleS5sZW5ndGg7XG4gICAgICAgIGNvbnN0IGZpZWxkTmFtZSA9IHNwbGl0dGVkS2V5WzBdO1xuICAgICAgICBjb25zdCBzbGlkZUluc3RhbmNlID1cbiAgICAgICAgICBzcGxpdHRlZEtleVsxXSAhPSBudWxsICYmIE51bWJlci5pc0ludGVnZXIoK3NwbGl0dGVkS2V5WzFdKSA/ICtzcGxpdHRlZEtleVsxXSA6IG51bGw7XG4gICAgICAgIGNvbnN0IHNsaWRlTmFtZSA9IG9ialtmaWVsZE5hbWVdO1xuICAgICAgICBpZiAoc3BsaXR0ZWRMZW5ndGggPT09IDIgJiYgc2xpZGVJbnN0YW5jZSAhPSBudWxsICYmIHNsaWRlTmFtZSAhPSBudWxsKSB7XG4gICAgICAgICAgaW5zdGFuY2VzW3NsaWRlTmFtZV0gPSBpbnN0YW5jZXNbc2xpZGVOYW1lXSAhPSBudWxsID8gaW5zdGFuY2VzW3NsaWRlTmFtZV0gOiBbXTtcbiAgICAgICAgICBpbnN0YW5jZXNbc2xpZGVOYW1lXVtzbGlkZUluc3RhbmNlXSA9XG4gICAgICAgICAgICBpbnN0YW5jZXNbc2xpZGVOYW1lXVtzbGlkZUluc3RhbmNlXSAhPSBudWxsXG4gICAgICAgICAgICAgID8gaW5zdGFuY2VzW3NsaWRlTmFtZV1bc2xpZGVJbnN0YW5jZV1cbiAgICAgICAgICAgICAgOiBnZW5lcmF0ZU1ldGFkYXRhKHNsaWRlTmFtZSwgc2xpZGVJbnN0YW5jZSk7XG4gICAgICAgICAgaW5zdGFuY2VzW3NsaWRlTmFtZV1bc2xpZGVJbnN0YW5jZV1bZmllbGROYW1lXSA9IGZbZmtleV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbWFpbkZvcm1bZmtleV0gPSBmW2ZrZXldO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIG1haW5Gb3JtW2BhamZfZm9ybV9pZGBdID0gZm9ybUlkeDtcbiAgICAgIGNvbnN0IGluc3RhbmNlS2V5cyA9IE9iamVjdC5rZXlzKGluc3RhbmNlcyk7XG4gICAgICBpbnN0YW5jZUtleXMuZm9yRWFjaChpbnN0YW5jZUtleSA9PiB7XG4gICAgICAgIG1haW5Gb3JtW2BhamZfJHtpbnN0YW5jZUtleX1fY291bnRgXSA9IGluc3RhbmNlc1tpbnN0YW5jZUtleV0ubGVuZ3RoO1xuICAgICAgfSk7XG4gICAgICBtYWluRm9ybS5yZXBzID0gaW5zdGFuY2VzO1xuICAgICAgcmVzLnB1c2gobWFpbkZvcm0pO1xuICAgIH0pO1xuICAgIHJldHVybiByZXM7XG4gIH0gZWxzZSB7XG4gICAgZm9ybXMuZm9yRWFjaChmb3JtID0+IHtcbiAgICAgIGNvbnN0IGZLZXlzOiBzdHJpbmdbXSA9IE9iamVjdC5rZXlzKGZvcm0pO1xuICAgICAgY29uc3Qgbm9SZXBlYXRpbmdGaWVsZHM6IHN0cmluZ1tdID0gZktleXMuZmlsdGVyKGZrZXkgPT4ge1xuICAgICAgICBjb25zdCBzcGxpdHRlZEtleTogc3RyaW5nW10gPSBma2V5LnNwbGl0KCdfXycpO1xuICAgICAgICBpZiAoc3BsaXR0ZWRLZXkubGVuZ3RoID09PSAyKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSk7XG4gICAgICBjb25zdCBub1JlcEZvcm06IEZvcm0gPSB7fTtcblxuICAgICAgbm9SZXBlYXRpbmdGaWVsZHMuZm9yRWFjaChmaWVsZCA9PiB7XG4gICAgICAgIG5vUmVwRm9ybVtmaWVsZF0gPSBmb3JtW2ZpZWxkXTtcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBtYWluRm9ybTogTWFpbkZvcm0gPSB7Li4ubm9SZXBGb3JtLCByZXBzOiB7c2xpZGU6IFtdfX07XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IE1BWF9SRVBTOyBpKyspIHtcbiAgICAgICAgY29uc3QgY3VycmVudFNsaWRlOiBGb3JtID0ge307XG4gICAgICAgIGNvbnN0IG9ubHlDdXJyZW50SW5zdGFuY2VLZXlzOiBzdHJpbmdbXSA9IGZLZXlzLmZpbHRlcihma2V5ID0+IHtcbiAgICAgICAgICBjb25zdCBzcGxpdHRlZEtleTogc3RyaW5nW10gPSBma2V5LnNwbGl0KCdfXycpO1xuICAgICAgICAgIGlmIChzcGxpdHRlZEtleS5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgICAgIHJldHVybiBma2V5LmluZGV4T2YoYF9fJHtpfWApID4gLTE7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIHNlIGlsIG51bWVybyBkaSBhdHRyaWJ1dGkgY29pbmNpZGUgaWwgZm9ybSBkYXRhIG5vbiBoYSByZXBlYXRpbmdzbGlkZXNcbiAgICAgICAgaWYgKG9ubHlDdXJyZW50SW5zdGFuY2VLZXlzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIG1haW5Gb3JtWydhamZfcmVwX2NvdW50J10gPSBpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIG9ubHlDdXJyZW50SW5zdGFuY2VLZXlzLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgICBjb25zdCBzcGxpdHRlZEtleSA9IGtleS5zcGxpdCgnX18nKTtcbiAgICAgICAgICBjb25zdCBmaWVsZE5hbWUgPSBzcGxpdHRlZEtleVswXTtcbiAgICAgICAgICBjb25zdCBzbGlkZUluc3RhbmNlID0gc3BsaXR0ZWRLZXlbMV0gIT0gbnVsbCA/ICtzcGxpdHRlZEtleVsxXSA6IG51bGw7XG4gICAgICAgICAgY3VycmVudFNsaWRlW2ZpZWxkTmFtZV0gPSBmb3JtW2tleV07XG4gICAgICAgICAgY3VycmVudFNsaWRlWydhamZfcmVwJ10gPSBzbGlkZUluc3RhbmNlICE9IG51bGwgPyBzbGlkZUluc3RhbmNlIDogY3VycmVudFNsaWRlWydhamZfcmVwJ107XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAob25seUN1cnJlbnRJbnN0YW5jZUtleXMubGVuZ3RoICE9IDApIHtcbiAgICAgICAgICBtYWluRm9ybS5yZXBzIVsnc2xpZGUnXS5wdXNoKGN1cnJlbnRTbGlkZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbWFpbkZvcm0ucmVwcyA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmVzLnB1c2gobWFpbkZvcm0pO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHJlcztcbiAgfVxufVxuXG4vKipcbiAqIFVUSUxJVFkgRlVOQ0lPTlxuICogVGhpcyBmdW5jdGlvbiB0YWtlIGFuIGFqZiBzY2hlbWEgYXMgaW5wdXQgYW5kIGV4dHJhY3QgYVxuICogZGljdCB0aGF0IG1hdGNoIGVhY2ggY2hvaWNlIHZhbHVlIChhbHNvIHdpdGggY2hvaWNlc09yaWdpbiBuYW1lIHByZWZpeCkgd2l0aCBpdHMgbGFiZWxcbiAqIEBwYXJhbSBzY2hlbWEgdGhlIGFqZiBzY2hlbWFcbiAqIEByZXR1cm5zIEEgZGljdCB3aXRoOlxuICogIHtbY2hvaWNlc09yaWdpbk5hbWVfY2hvaWNlVmFsdWU6IHN0cmluZ106IFtjaG9pY2VMYWJlbDogc3RyaW5nXX1cbiAqICB7W2Nob2ljZVZhbHVlOiBzdHJpbmddOiBbY2hvaWNlTGFiZWw6IHN0cmluZ119XG4gKi9cbmZ1bmN0aW9uIGV4dHJhY3RMYWJlbHNCeVNjaGVtYUNob2ljZXMoc2NoZW1hOiBhbnkpOiB7W2Nob2ljZVZhbHVlOiBzdHJpbmddOiBzdHJpbmd9IHtcbiAgY29uc3QgY2hvaWNlTGFiZWxzOiB7W2Nob2ljZVZhbHVlOiBzdHJpbmddOiBzdHJpbmd9ID0ge307XG4gIGlmIChzY2hlbWEgJiYgc2NoZW1hLmNob2ljZXNPcmlnaW5zICE9IG51bGwpIHtcbiAgICAoc2NoZW1hLmNob2ljZXNPcmlnaW5zIGFzIGFueVtdKS5mb3JFYWNoKGNob2ljZXNPcmlnaW4gPT4ge1xuICAgICAgaWYgKGNob2ljZXNPcmlnaW4gIT0gbnVsbCAmJiBjaG9pY2VzT3JpZ2luLmNob2ljZXMgIT0gbnVsbCkge1xuICAgICAgICAoY2hvaWNlc09yaWdpbi5jaG9pY2VzIGFzIGFueVtdKS5mb3JFYWNoKGNob2ljZSA9PiB7XG4gICAgICAgICAgY2hvaWNlTGFiZWxzW2Nob2ljZXNPcmlnaW4ubmFtZSArICdfJyArIGNob2ljZS52YWx1ZV0gPSBjaG9pY2UubGFiZWw7XG4gICAgICAgICAgY2hvaWNlTGFiZWxzW2Nob2ljZS52YWx1ZV0gPSBjaG9pY2UubGFiZWw7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIHJldHVybiBjaG9pY2VMYWJlbHM7XG59XG5cbi8qKlxuICogVVRJTElUWSBGVU5DSU9OXG4gKiBUaGlzIGZ1bmN0aW9uIHRha2UgYW4gYWpmIHNjaGVtYSBhcyBpbnB1dCBhbmQgZXh0cmFjdCBhIG9uZVxuICogZGltZW5zaW9uYWwgYXJyYXkgb2YgQWpmTm9kZSBmb3IgZWFjaCBzbGlkZSdzIGZpZWxkXG4gKlxuICogQHBhcmFtIHNjaGVtYSB0aGUgYWpmIHNjaGVtYVxuICogQHJldHVybnMgQW4gb2JqZWN0IHdpdGggYWxsIGZpZWxkczpcbiAqICB7W2ZpZWxkTmFtZTogc3RyaW5nXTogYWpmIGZpZWxkfVxuICovXG5mdW5jdGlvbiBleHRyYWN0RmxhdHRlbk5vZGVzKHNjaGVtYTogYW55KToge1tmaWVsZDogc3RyaW5nXTogYW55fSB7XG4gIGNvbnN0IGZpZWxkTm9kZXM6IHtbZmllbGQ6IHN0cmluZ106IGFueX0gPSB7fTtcbiAgaWYgKHNjaGVtYSAmJiBzY2hlbWEubm9kZXMpIHtcbiAgICBjb25zdCBzbGlkZXM6IGFueVtdID0gc2NoZW1hLm5vZGVzLmZpbHRlcihcbiAgICAgIChub2RlOiBhbnkpID0+IG5vZGUubm9kZVR5cGUgPT09IDMgfHwgbm9kZS5ub2RlVHlwZSA9PT0gNCxcbiAgICApO1xuICAgIHNsaWRlcy5mb3JFYWNoKHNsaWRlID0+IHtcbiAgICAgIHNsaWRlLm5vZGVzXG4gICAgICAgIC5maWx0ZXIoKG5vZGU6IGFueSkgPT4gbm9kZS5ub2RlVHlwZSA9PT0gMClcbiAgICAgICAgLmZvckVhY2goKGZpZWxkTm9kZTogYW55KSA9PiB7XG4gICAgICAgICAgZmllbGROb2Rlc1tmaWVsZE5vZGUubmFtZV0gPSBmaWVsZE5vZGU7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9XG4gIHJldHVybiBmaWVsZE5vZGVzO1xufVxuXG4vKipcbiAqIFJldHVybnMgYSBjbG9uZSBvZiBmb3Jtcywgd2hlcmUgdGhlIHNwZWNpZmllZCBmaWVsZHMgYXJlIHJlcGxhY2VkIGJ5IHRoZSBjb3JyZXNwb25kaW5nIGxhYmVscyxcbiAqIGFzIGRlZmluZWQgYnkgdGhlIGNob2ljZSBvcmlnaW5zIGluIHNjaGVtYS5cbiAqXG4gKiBAcGFyYW0ge01haW5Gb3JtW119IGZvcm1MaXN0XG4gKiBAcGFyYW0geyp9IHNjaGVtYSB0aGUgYWpmIHNjaGVtYVxuICogQHBhcmFtIHtzdHJpbmdbXX0gZmllbGROYW1lc1xuICogQHJldHVybiB7Kn0gIHtNYWluRm9ybVtdfVxuICovXG5leHBvcnQgZnVuY3Rpb24gQVBQTFlfTEFCRUxTKGZvcm1MaXN0OiBNYWluRm9ybVtdLCBzY2hlbWE6IGFueSwgZmllbGROYW1lczogc3RyaW5nW10pOiBNYWluRm9ybVtdIHtcbiAgZm9ybUxpc3QgPSBjbG9uZU1haW5Gb3Jtcyhmb3JtTGlzdCk7XG4gIGNvbnN0IGNob2ljZUxhYmVsczoge1tmaWVsZE5hbWU6IHN0cmluZ106IHN0cmluZ30gPSBleHRyYWN0TGFiZWxzQnlTY2hlbWFDaG9pY2VzKHNjaGVtYSk7XG4gIGNvbnN0IGZsYXR0ZW5Ob2RlcyA9IGV4dHJhY3RGbGF0dGVuTm9kZXMoc2NoZW1hKTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGZvcm1MaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGZvcm1MaXN0W2ldID09IG51bGwpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBpZiAoZm9ybUxpc3RbaV0ucmVwcyAhPSBudWxsKSB7XG4gICAgICBjb25zdCBmID0gZm9ybUxpc3RbaV07XG4gICAgICBjb25zdCBmS2V5czogc3RyaW5nW10gPSBPYmplY3Qua2V5cyhmKTtcbiAgICAgIGZLZXlzLmZvckVhY2goZmtleSA9PiB7XG4gICAgICAgIGNvbnN0IGZpZWxkTm9kZSA9IGZsYXR0ZW5Ob2Rlc1tma2V5XTtcbiAgICAgICAgY29uc3QgY2hvaWNlT3JpZ2luTmFtZVByZWZpeCA9XG4gICAgICAgICAgZmllbGROb2RlICYmIGZpZWxkTm9kZS5jaG9pY2VzT3JpZ2luUmVmID8gZmllbGROb2RlLmNob2ljZXNPcmlnaW5SZWYgKyAnXycgOiAnJztcblxuICAgICAgICBpZiAoZmllbGROYW1lcy5pbmNsdWRlcyhma2V5KSAmJiBmW2ZrZXldICE9PSBudWxsKSB7XG4gICAgICAgICAgbGV0IGNob2ljZVZhbHVlOiBzdHJpbmdbXSA9IFtdO1xuICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGZbZmtleV0pKSB7XG4gICAgICAgICAgICBjaG9pY2VWYWx1ZSA9IGZbZmtleV0gYXMgdW5rbm93biBhcyBzdHJpbmdbXTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgbXVsdGlwbGVWYWxzID0gKGZbZmtleV0gYXMgc3RyaW5nKS5zcGxpdCgnLCcpLm1hcCh2ID0+IHYudHJpbSgpKTtcbiAgICAgICAgICAgIGlmIChtdWx0aXBsZVZhbHMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICBjaG9pY2VWYWx1ZSA9IG11bHRpcGxlVmFscztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGNob2ljZVZhbHVlID0gW2ZbZmtleV0gYXMgc3RyaW5nXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGNob2ljZVZhbHVlICE9IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnN0IGxhYmVscyA9IGNob2ljZVZhbHVlLm1hcCh2YWwgPT4ge1xuICAgICAgICAgICAgICBjb25zdCB2YWxXaXRoUHJlZml4ID0gY2hvaWNlT3JpZ2luTmFtZVByZWZpeCArIHZhbDtcbiAgICAgICAgICAgICAgcmV0dXJuIGNob2ljZUxhYmVsc1t2YWxXaXRoUHJlZml4XSAhPSBudWxsXG4gICAgICAgICAgICAgICAgPyBjaG9pY2VMYWJlbHNbdmFsV2l0aFByZWZpeF1cbiAgICAgICAgICAgICAgICA6IGNob2ljZUxhYmVsc1t2YWxdICE9IG51bGxcbiAgICAgICAgICAgICAgICA/IGNob2ljZUxhYmVsc1t2YWxdXG4gICAgICAgICAgICAgICAgOiB2YWw7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChsYWJlbHMgJiYgbGFiZWxzLmxlbmd0aCkge1xuICAgICAgICAgICAgICBjb25zdCBsYWJlbEZpZWxkTmFtZSA9IGZrZXkgKyAnX2Nob2ljZXNMYWJlbCc7XG4gICAgICAgICAgICAgIGZvcm1MaXN0W2ldW2xhYmVsRmllbGROYW1lXSA9IGxhYmVscy5sZW5ndGggPiAxID8gbGFiZWxzLmpvaW4oJywgJykgOiBsYWJlbHNbMF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZvcm1MaXN0O1xufVxuXG4vKipcbiAqIERlcHJlY2F0ZWQuIFVzZSBGSUxURVJfQllcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIEZJTFRFUl9CWV9WQVJTKGZvcm1MaXN0OiBNYWluRm9ybVtdLCBleHByZXNzaW9uOiBzdHJpbmcpOiBNYWluRm9ybVtdIHtcbiAgcmV0dXJuIEZJTFRFUl9CWShmb3JtTGlzdCwgZXhwcmVzc2lvbik7XG59XG5cbi8qKlxuICogUmV0dXJucyBhIGNvcHkgb2YgZm9ybXMgYW5kIGl0cyByZXBldGl0aW9ucywga2VlcGluZyBvbmx5IHRoZSBvbmVzIGZvciB3aGljaCBleHByZXNzaW9uIGV2YWx1YXRlcyB0byB0cnVlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gRklMVEVSX0JZKGZvcm1zOiBNYWluRm9ybVtdLCBleHByZXNzaW9uOiBGdW5jfHN0cmluZyk6IE1haW5Gb3JtW10ge1xuICBmb3JtcyA9IGZvcm1zIHx8IFtdO1xuICBpZiAoZXhwcmVzc2lvbiA9PT0gJ3RydWUnKSB7XG4gICAgcmV0dXJuIGNsb25lTWFpbkZvcm1zKGZvcm1zKTtcbiAgfVxuICBpZiAodHlwZW9mKGV4cHJlc3Npb24pID09PSAnc3RyaW5nJykge1xuICAgIGV4cHJlc3Npb24gPSBjcmVhdGVGdW5jdGlvbihleHByZXNzaW9uKTtcbiAgfVxuICBjb25zdCByZXM6IE1haW5Gb3JtW10gPSBbXTtcbiAgZm9yIChsZXQgZm9ybSBvZiBmb3Jtcy5maWx0ZXIoZiA9PiBmICE9IG51bGwpKSB7XG4gICAgZm9ybSA9IHsuLi5mb3JtfTtcbiAgICBjb25zdCBmaWx0ZXJlZFJlcHM6IEluc3RhbmNlcyA9IHt9O1xuICAgIGxldCBzb21lUmVwcyA9IGZhbHNlO1xuICAgIGlmIChmb3JtLnJlcHMgIT0gbnVsbCkge1xuICAgICAgZm9yIChjb25zdCBrZXkgaW4gZm9ybS5yZXBzKSB7XG4gICAgICAgIGZpbHRlcmVkUmVwc1trZXldID0gZm9ybS5yZXBzW2tleV0uZmlsdGVyKHJlcCA9PlxuICAgICAgICAgIChleHByZXNzaW9uIGFzIEZ1bmMpKHsuLi5mb3JtLCAuLi5yZXB9KVxuICAgICAgICApO1xuICAgICAgICBmb3JtW2BhamZfJHtrZXl9X2NvdW50YF0gPSBmaWx0ZXJlZFJlcHNba2V5XS5sZW5ndGg7XG4gICAgICAgIHNvbWVSZXBzIHx8PSBmaWx0ZXJlZFJlcHNba2V5XS5sZW5ndGggPiAwO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoc29tZVJlcHMgfHwgZXhwcmVzc2lvbihmb3JtKSkge1xuICAgICAgZm9ybS5yZXBzID0gZmlsdGVyZWRSZXBzO1xuICAgICAgcmVzLnB1c2goZm9ybSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXM7XG59XG5cbi8qKlxuICogUmV0dXJucyB0b2RheSdzIGRhdGUuXG4gKlxuICogQGV4cG9ydFxuICogQHBhcmFtIHtzdHJpbmd9IFtmb3JtYXQ9J3l5eXktTU0tZGQnXVxuICogQHJldHVybiB7Kn0gIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBUT0RBWShmb3JtYXQgPSAneXl5eS1NTS1kZCcpOiBzdHJpbmcge1xuICByZXR1cm4gZGF0ZUZucy5mb3JtYXQobmV3IERhdGUoKSwgZm9ybWF0KTtcbn1cblxuLyoqXG4gKiBMb2dzIHZhbCB0byB0aGUgY29uc29sZS5cbiAqIFxuICogQGV4cG9ydFxuICogQHBhcmFtIHsqfSB2YWxcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIENPTlNPTEVfTE9HKHZhbDogYW55KTogdm9pZCB7XG4gIGNvbnNvbGUubG9nKHZhbCk7XG59XG5cbi8qKlxuICogQ29tcHV0ZXMgdGhlIGN1cnJlbnQgYWdlIGluIHllYXJzLCBnaXZlbiB0aGUgZGF0ZSBvZiBiaXJ0aC5cbiAqXG4gKiBAZXhwb3J0XG4gKiBAcGFyYW0geyhzdHJpbmcgfCBudWxsKX0gZG9iXG4gKiBAcmV0dXJuIHsqfSAge251bWJlcn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIEdFVF9BR0UoZG9iOiBzdHJpbmcgfCBudWxsKTogbnVtYmVyIHtcbiAgaWYgKGRvYiA9PSBudWxsKSB7XG4gICAgcmV0dXJuIE5hTjtcbiAgfVxuICByZXR1cm4gZGF0ZUZucy5kaWZmZXJlbmNlSW5ZZWFycyhuZXcgRGF0ZSgpLCBuZXcgRGF0ZShkb2IpKTtcbn1cblxuLyoqXG4gKiBJZiBkYXRhIGlzIGEgZm9ybSB3aXRoIHJlcGV0aXRpb25zLCByZXR1cm5zIHRoZSBudW1iZXIgb2YgcmVwZXRpdGlvbnM7XG4gKiBJZiBkYXRhIGlzIGFuIGFycmF5LCByZXR1cm5zIGl0cyBsZW5ndGg7XG4gKiBPdGhlcndpc2UgcmV0dXJucyAwLlxuICpcbiAqIEBleHBvcnRcbiAqIEBwYXJhbSB7KE1haW5Gb3JtIHwgYW55W10pfSBkYXRhc2V0XG4gKiBAcmV0dXJuIHsqfSAge251bWJlcn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIExFTihkYXRhc2V0OiBNYWluRm9ybSB8IGFueVtdKTogbnVtYmVyIHtcbiAgaWYgKGRhdGFzZXQgPT0gbnVsbCkge1xuICAgIHJldHVybiAwO1xuICB9XG4gIGNvbnN0IGZvcm0gPSBkYXRhc2V0IGFzIE1haW5Gb3JtO1xuICBpZiAoZm9ybS5yZXBzICE9IG51bGwpIHtcbiAgICByZXR1cm4gYWxsUmVwcyhmb3JtKS5sZW5ndGg7XG4gIH1cbiAgcmV0dXJuIChkYXRhc2V0IGFzIGFueVtdKS5sZW5ndGggfHwgMDtcbn1cblxuLyoqXG4gKiBBcnJheSBjb25jYXRlbmF0aW9uLlxuICpcbiAqIEBleHBvcnRcbiAqIEBwYXJhbSB7YW55W119IGFcbiAqIEBwYXJhbSB7YW55W119IGJcbiAqIEByZXR1cm4geyp9ICB7YW55W119XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBDT05DQVQoYTogYW55W10sIGI6IGFueVtdKTogYW55W10ge1xuICByZXR1cm4gYS5jb25jYXQoYik7XG59XG5cbi8qKlxuICogUmVtb3ZlcyBkdXBsaWNhdGUgZWxlbWVudHMgZnJvbSBhbiBhcnJheS5cbiAqXG4gKiBAZXhwb3J0XG4gKiBAcGFyYW0ge2FueVtdfSBhcnJcbiAqIEByZXR1cm4geyp9ICB7YW55W119XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBSRU1PVkVfRFVQTElDQVRFUyhhcnI6IGFueVtdKTogYW55W10ge1xuICByZXR1cm4gWy4uLm5ldyBNYXAoYXJyLm1hcCh2ID0+IFtKU09OLnN0cmluZ2lmeSh2KSwgdl0pKS52YWx1ZXMoKV07XG59XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIGRhdGUgaXMgYmVmb3JlIGRhdGVUb0NvbXBhcmUuXG4gKlxuICogQGV4cG9ydFxuICogQHBhcmFtIHtzdHJpbmd9IGRhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBkYXRlVG9Db21wYXJlXG4gKiBAcmV0dXJuIHsqfSAge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBJU19CRUZPUkUoZGF0ZTogc3RyaW5nLCBkYXRlVG9Db21wYXJlOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgY29uc3QgZGF0ZUE6IERhdGUgPSBkYXRlRm5zLnBhcnNlSVNPKGRhdGUpO1xuICBjb25zdCBkYXRlQjogRGF0ZSA9IGRhdGVGbnMucGFyc2VJU08oZGF0ZVRvQ29tcGFyZSk7XG4gIHJldHVybiBkYXRlRm5zLmlzQmVmb3JlKGRhdGVBLCBkYXRlQik7XG59XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIGRhdGUgaXMgYWZ0ZXIgZGF0ZVRvQ29tcGFyZS5cbiAqXG4gKiBAZXhwb3J0XG4gKiBAcGFyYW0ge3N0cmluZ30gZGF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IGRhdGVUb0NvbXBhcmVcbiAqIEByZXR1cm4geyp9ICB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIElTX0FGVEVSKGRhdGU6IHN0cmluZywgZGF0ZVRvQ29tcGFyZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gIGNvbnN0IGRhdGVBOiBEYXRlID0gZGF0ZUZucy5wYXJzZUlTTyhkYXRlKTtcbiAgY29uc3QgZGF0ZUI6IERhdGUgPSBkYXRlRm5zLnBhcnNlSVNPKGRhdGVUb0NvbXBhcmUpO1xuICByZXR1cm4gZGF0ZUZucy5pc0FmdGVyKGRhdGVBLCBkYXRlQik7XG59XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIGRhdGUgaXMgYmV0d2VlbiBkYXRlU3RhcnQgYW5kIGRhdGVFbmQuXG4gKlxuICogQGV4cG9ydFxuICogQHBhcmFtIHtzdHJpbmd9IGRhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBkYXRlU3RhcnRcbiAqIEBwYXJhbSB7c3RyaW5nfSBkYXRlRW5kXG4gKiBAcmV0dXJuIHsqfSAge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBJU19XSVRISU5fSU5URVJWQUwoZGF0ZTogc3RyaW5nLCBkYXRlU3RhcnQ6IHN0cmluZywgZGF0ZUVuZDogc3RyaW5nKTogYm9vbGVhbiB7XG4gIGNvbnN0IGRhdGVUb0NvbXBhcmU6IERhdGUgPSBkYXRlRm5zLnBhcnNlSVNPKGRhdGUpO1xuICBjb25zdCBpbnRlcnZhbDogSW50ZXJ2YWwgPSB7XG4gICAgc3RhcnQ6IGRhdGVGbnMucGFyc2VJU08oZGF0ZVN0YXJ0KSxcbiAgICBlbmQ6IGRhdGVGbnMucGFyc2VJU08oZGF0ZUVuZCksXG4gIH07XG4gIHJldHVybiBkYXRlRm5zLmlzV2l0aGluSW50ZXJ2YWwoZGF0ZVRvQ29tcGFyZSwgaW50ZXJ2YWwpO1xufVxuXG4vKipcbiAqIENvbXBhcmVzIGRhdGUgd2l0aCBhbiBpbnRlcnZhbC5cbiAqIFJldHVybnMgJy0xJyAob3IgdGhlIGZpcnN0IGVsZW1lbnQgb2YgbGFiZWxzKSBpZiBkYXRlIGlzIGJlZm9yZSBkYXRlU3RhcnQsXG4gKiAnMCcgKG9yIHRoZSBzZWNvbmQgZWxlbWVudCkgaWYgZGF0ZSBpcyBiZXR3ZWVuIGRhdGVTdGFydCBhbmQgZGF0ZUVuZCxcbiAqICcxJyAob3IgdGhlIHRoaXJkIGVsZW1lbnQpIGlmIGRhdGUgaXMgYWZ0ZXIgZGF0ZUVuZC5cbiAqXG4gKiBAZXhwb3J0XG4gKiBAcGFyYW0ge3N0cmluZ30gZGF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IGRhdGVTdGFydFxuICogQHBhcmFtIHtzdHJpbmd9IGRhdGVFbmRcbiAqIEBwYXJhbSB7c3RyaW5nW119IGxhYmVscyBhbiBvcHRpb25hbCBhcnJheSBvZiBzdHJpbmcgZm9yIHRoZSBvdXRwdXQgdmFsdWVzXG4gKiBAcmV0dXJuIHsqfSAge3N0cmluZ31cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIENPTVBBUkVfREFURShcbiAgZGF0ZTogc3RyaW5nLFxuICBkYXRlU3RhcnQ6IHN0cmluZyxcbiAgZGF0ZUVuZDogc3RyaW5nLFxuICBsYWJlbHM/OiBzdHJpbmdbXSxcbik6IHN0cmluZyB7XG4gIGNvbnN0IGRhdGVUb0NvbXBhcmU6IERhdGUgPSBkYXRlRm5zLnBhcnNlSVNPKGRhdGUpO1xuICBjb25zdCBkYXRlQTogRGF0ZSA9IGRhdGVGbnMucGFyc2VJU08oZGF0ZVN0YXJ0KTtcbiAgY29uc3QgZGF0ZUI6IERhdGUgPSBkYXRlRm5zLnBhcnNlSVNPKGRhdGVFbmQpO1xuICBjb25zdCBpbnRlcnZhbDogSW50ZXJ2YWwgPSB7XG4gICAgc3RhcnQ6IGRhdGVBLFxuICAgIGVuZDogZGF0ZUIsXG4gIH07XG4gIGlmIChsYWJlbHMgPT0gbnVsbCkge1xuICAgIGxhYmVscyA9IFsnLTEnLCAnMCcsICcxJ107XG4gIH1cbiAgaWYgKGRhdGVGbnMuaXNCZWZvcmUoZGF0ZVRvQ29tcGFyZSwgZGF0ZUEpKSB7XG4gICAgcmV0dXJuIGxhYmVsc1swXTtcbiAgfVxuICBpZiAoZGF0ZUZucy5pc1dpdGhpbkludGVydmFsKGRhdGVUb0NvbXBhcmUsIGludGVydmFsKSkge1xuICAgIHJldHVybiBsYWJlbHNbMV07XG4gIH1cbiAgaWYgKGRhdGVGbnMuaXNBZnRlcihkYXRlVG9Db21wYXJlLCBkYXRlQikpIHtcbiAgICByZXR1cm4gbGFiZWxzWzJdO1xuICB9XG4gIHJldHVybiAnJztcbn1cblxuLyoqXG4gKiBQZXJmb3JtcyBhIGxlZnQgam9pbiBvZiBmb3Jtc0EgYW5kIGZvcm1zQi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIEpPSU5fRk9STVMoXG4gIGZvcm1zQTogKE1haW5Gb3JtIHwgRm9ybSlbXSxcbiAgZm9ybXNCOiAoTWFpbkZvcm0gfCBGb3JtKVtdLFxuICBrZXlBOiBzdHJpbmcsXG4gIGtleUI/OiBzdHJpbmcsXG4pOiAoTWFpbkZvcm0gfCBGb3JtKVtdIHtcbiAgcmV0dXJuIEpPSU5fUkVQRUFUSU5HX1NMSURFUyhmb3Jtc0EsIGZvcm1zQiwga2V5QSwga2V5QiBhcyBhbnksIG51bGwgYXMgYW55KTtcbn1cblxuLyoqXG4gKiBQZXJmb3JtcyBhIGxlZnQgam9pbiBvZiBmb3Jtc0EgYW5kIGZvcm1zQiwgbGlrZSBKT0lOX0ZPUk1TLlxuICogSW4gYWRkaXRpb24sIGZvciBlYWNoIG1hdGNoaW5nIHBhaXIgb2YgZm9ybUEgYW5kIGZvcm1CLCB0aGVpciByZXBlYXRpbmcgc2xpZGVzIGFyZSBhbHNvIGpvaW5lZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIEpPSU5fUkVQRUFUSU5HX1NMSURFUyhcbiAgZm9ybXNBOiBNYWluRm9ybVtdLFxuICBmb3Jtc0I6IE1haW5Gb3JtW10sXG4gIGtleUE6IHN0cmluZyxcbiAga2V5Qjogc3RyaW5nLFxuICBzdWJrZXlBOiBzdHJpbmcsXG4gIHN1YmtleUI/OiBzdHJpbmcsXG4pOiBNYWluRm9ybVtdIHtcbiAgZm9ybXNBID0gY2xvbmVNYWluRm9ybXMoZm9ybXNBIHx8IFtdKTtcbiAgZm9ybXNCID0gY2xvbmVNYWluRm9ybXMoZm9ybXNCIHx8IFtdKTtcbiAgaWYgKGtleUIgPT0gbnVsbCkge1xuICAgIGtleUIgPSBrZXlBO1xuICB9XG4gIGlmIChzdWJrZXlCID09IG51bGwpIHtcbiAgICBzdWJrZXlCID0gc3Via2V5QTtcbiAgfVxuICBjb25zdCBpbmRleEI6IHtbdmFsOiBzdHJpbmddOiBNYWluRm9ybX0gPSB7fTtcbiAgZm9yIChsZXQgaSA9IGZvcm1zQi5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgIGNvbnN0IHZhbCA9IGZvcm1zQltpXSAmJiBmb3Jtc0JbaV1ba2V5Ql07XG4gICAgaWYgKHZhbCAhPSBudWxsKSB7XG4gICAgICBpbmRleEJbU3RyaW5nKHZhbCldID0gZm9ybXNCW2ldO1xuICAgIH1cbiAgfVxuICBjb25zdCByZXM6IE1haW5Gb3JtW10gPSBbXTtcbiAgZm9yIChjb25zdCBmb3JtQSBvZiBmb3Jtc0EpIHtcbiAgICBjb25zdCB2YWwgPSBmb3JtQSAmJiBmb3JtQVtrZXlBXTtcbiAgICBjb25zdCBmb3JtQiA9IGluZGV4QltTdHJpbmcodmFsKV07XG4gICAgaWYgKHZhbCA9PSBudWxsIHx8IGZvcm1CID09IG51bGwpIHtcbiAgICAgIHJlcy5wdXNoKGZvcm1BKTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBjb25zdCByZXBzQSA9IGZvcm1BLnJlcHMgfHwge307XG4gICAgY29uc3QgcmVwc0IgPSBmb3JtQi5yZXBzIHx8IHt9O1xuICAgIGlmIChzdWJrZXlBICE9IG51bGwpIHtcbiAgICAgIGNvbnN0IGFsbFJlcHNCID0gYWxsUmVwcyhmb3JtQik7XG4gICAgICBmb3IgKGNvbnN0IGsgaW4gcmVwc0EpIHtcbiAgICAgICAgcmVwc0Fba10gPSBKT0lOX0ZPUk1TKHJlcHNBW2tdLCBhbGxSZXBzQiwgc3Via2V5QSwgc3Via2V5QikgYXMgRm9ybVtdO1xuICAgICAgICBmb3JtQVtgYWpmXyR7a31fY291bnRgXSA9IHJlcHNBW2tdLmxlbmd0aDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmVzLnB1c2goey4uLmZvcm1CLCAuLi5mb3JtQSwgcmVwczogey4uLnJlcHNCLCAuLi5yZXBzQX19KTtcbiAgfVxuICByZXR1cm4gcmVzO1xufVxuXG4vKipcbiAqIFJldHVybnMgdGhlIGFycmF5IG9idGFpbmVkIGJ5IGV2YWx1YXRpbmcgZXhwcmVzc2lvbiBmb3IgZXZlcnkgcmVwZXRpdGlvbiBvZiBmb3JtLlxuICpcbiAqIEBleHBvcnRcbiAqIEBwYXJhbSB7TWFpbkZvcm19IGZvcm1cbiAqIEBwYXJhbSB7c3RyaW5nfSBleHByZXNzaW9uXG4gKiBAcmV0dXJuIHsqfSAge2FueVtdfVxuICovXG5leHBvcnQgZnVuY3Rpb24gRlJPTV9SRVBTKGZvcm06IE1haW5Gb3JtLCBleHByZXNzaW9uOiBGdW5jfHN0cmluZyk6IGFueVtdIHtcbiAgaWYgKHR5cGVvZihleHByZXNzaW9uKSA9PT0gJ3N0cmluZycpIHtcbiAgICBleHByZXNzaW9uID0gY3JlYXRlRnVuY3Rpb24oZXhwcmVzc2lvbik7XG4gIH1cbiAgcmV0dXJuIGFsbFJlcHMoZm9ybSB8fCB7fSkubWFwKHJlcCA9PlxuICAgIChleHByZXNzaW9uIGFzIEZ1bmMpKHsuLi5mb3JtLCAuLi5yZXB9KVxuICApO1xufVxuXG4vKipcbiAqIERlcHJlY2F0ZWQuIFVzZSBJTkNMVURFU1xuICovXG5leHBvcnQgZnVuY3Rpb24gSVNJTihkYXRhc2V0OiBhbnlbXSwgdmFsdWU6IGFueSk6IGJvb2xlYW4ge1xuICBpZiAoZGF0YXNldCA9PSBudWxsIHx8IHZhbHVlID09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIGRhdGFzZXQuaW5kZXhPZih2YWx1ZSkgPj0gMDtcbn1cblxuLyoqXG4gKiBBcHBsaWVzIHRoZSBvcGVyYXRvciB0byBldmVyeSBwYWlyIG9mIGVsZW1lbnRzIChhcnJheUFbaV0sIGFycmF5QltpXSksXG4gKiByZXR1cm5pbmcgdGhlIGFycmF5IG9mIHJlc3VsdHMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBPUChhcnJheUE6IGFueVtdLCBhcnJheUI6IGFueVtdLCBvcGVyYXRvcjogKGE6IGFueSwgYjogYW55KSA9PiBhbnkpOiBhbnlbXSB7XG4gIGNvbnN0IHJlczogYW55W10gPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBNYXRoLm1pbihhcnJheUEubGVuZ3RoLCBhcnJheUIubGVuZ3RoKTsgaSsrKSB7XG4gICAgY29uc3QgdmFsID0gb3BlcmF0b3IoYXJyYXlBW2ldLCBhcnJheUJbaV0pO1xuICAgIHJlcy5wdXNoKHZhbCk7XG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cblxuLyoqXG4gKiBHaXZlbiBhbiBhcnJheSBvZiB2YWx1ZXMsIHJldHVybnMgdGhlIGNvcnJlc3BvbmRpbmcgYXJyYXkgb2YgbGFiZWxzLFxuICogYXMgc3BlY2lmaWVkIGJ5IHRoZSBjaG9pY2VzIG9yaWdpbiBpbiBzY2hlbWEuXG4gKlxuICogQGV4cG9ydFxuICogQHBhcmFtIHsqfSBzY2hlbWFcbiAqIEBwYXJhbSB7c3RyaW5nW119IHZhbHVlc1xuICogQHJldHVybiB7Kn0gIHtzdHJpbmdbXX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIEdFVF9MQUJFTFMoc2NoZW1hOiBhbnksIHZhbHVlczogc3RyaW5nW10pOiBzdHJpbmdbXSB7XG4gIGNvbnN0IGNob2ljZUxhYmVscyA9IGV4dHJhY3RMYWJlbHNCeVNjaGVtYUNob2ljZXMoc2NoZW1hKTtcbiAgcmV0dXJuIHZhbHVlcy5tYXAodmFsID0+IGNob2ljZUxhYmVsc1t2YWxdICE9IG51bGwgPyBjaG9pY2VMYWJlbHNbdmFsXSA6IHZhbCk7XG59XG4iXX0=