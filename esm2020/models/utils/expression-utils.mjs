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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwcmVzc2lvbi11dGlscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvbW9kZWxzL3NyYy91dGlscy9leHByZXNzaW9uLXV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUdILE9BQU8sS0FBSyxPQUFPLE1BQU0sVUFBVSxDQUFDO0FBQ3BDLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxTQUFTLENBQUM7QUFDcEMsT0FBTyxLQUFLLFNBQVMsTUFBTSxRQUFRLENBQUM7QUFJcEMsSUFBSSxXQUFXLEdBQVEsRUFBRSxDQUFDO0FBRTFCLE1BQU0sTUFBTSxHQUFHLFNBQVMsQ0FBQyxPQUFPLElBQUksU0FBUyxDQUFDO0FBWTlDLFNBQVMsT0FBTyxDQUFDLElBQWM7SUFDN0IsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksRUFBRTtRQUNyQixPQUFPLEVBQUUsQ0FBQztLQUNYO0lBQ0QsTUFBTSxJQUFJLEdBQVcsRUFBRSxDQUFDO0lBQ3hCLEtBQUssTUFBTSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtRQUMzQixNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztLQUNqQjtJQUNELE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQztBQUVELE1BQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQztBQUVwQixNQUFNLENBQUMsTUFBTSxrQkFBa0IsR0FBRyxDQUNoQyxNQUFjLEVBQ2QscUJBQThCLEtBQUssRUFDekIsRUFBRTtJQUNaLE1BQU0sV0FBVyxHQUFHLEVBQWMsQ0FBQztJQUNuQyxJQUFJO1FBQ0YsV0FBVyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsRUFBRTtZQUM3QixPQUFPLEVBQUUsQ0FBQyxLQUFL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LEdBQUcsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3RDLFFBQVEsR0FBRyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFDLEtBQUssRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDO0tBQ25EO0lBQ0QsTUFBTSxHQUFHLEdBQVUsRUFBRSxDQUFDO0lBQ3RCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQy9ELE1BQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0MsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUNmO0lBQ0QsT0FBTyxHQUFHLENBQUM7QUFDYixDQUFDO0FBRUQ7Ozs7Ozs7O0dBUUc7QUFDSCxNQUFNLFVBQVUsVUFBVSxDQUFDLE1BQVcsRUFBRSxNQUFnQjtJQUN0RCxNQUFNLFlBQVksR0FBRyw0QkFBNEIsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMxRCxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2hGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmQ29udGV4dH0gZnJvbSAnQGFqZi9jb3JlL2NvbW1vbic7XG5pbXBvcnQgKiBhcyBkYXRlRm5zIGZyb20gJ2RhdGUtZm5zJztcbmltcG9ydCB7cGFyc2VTY3JpcHR9IGZyb20gJ21lcml5YWgnO1xuaW1wb3J0ICogYXMgbnVtYnJvTW9kIGZyb20gJ251bWJybyc7XG5pbXBvcnQge0FqZlRhYmxlQ2VsbH0gZnJvbSAnQGFqZi9jb3JlL3RhYmxlJztcbmltcG9ydCB7QWpmVmFsaWRhdGlvbkZufSBmcm9tICcuLi9pbnRlcmZhY2UvdmFsaWRhdGlvbi1mdW5jdGlvbic7XG5cbmxldCBleGVjQ29udGV4dDogYW55ID0ge307XG5cbmNvbnN0IG51bWJybyA9IG51bWJyb01vZC5kZWZhdWx0IHx8IG51bWJyb01vZDtcbmV4cG9ydCBpbnRlcmZhY2UgRm9ybSB7XG4gIFtrZXk6IHN0cmluZ106IHN0cmluZyB8IG51bWJlciB8IG51bGw7XG59XG5leHBvcnQgaW50ZXJmYWNlIEluc3RhbmNlcyB7XG4gIFtpbnN0YW5jZTogc3RyaW5nXTogRm9ybVtdO1xufVxuZXhwb3J0IGludGVyZmFjZSBNYWluRm9ybSB7XG4gIFtrZXk6IHN0cmluZ106IHN0cmluZyB8IG51bWJlciB8IGJvb2xlYW4gfCBudWxsIHwgSW5zdGFuY2VzIHwgdW5kZWZpbmVkIHwgbnVsbDtcbiAgcmVwcz86IEluc3RhbmNlcztcbn1cblxuZnVuY3Rpb24gYWxsUmVwcyhmb3JtOiBNYWluRm9ybSk6IEZvcm1bXSB7XG4gIGlmIChmb3JtLnJlcHMgPT0gbnVsbCkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuICBjb25zdCByZXBzOiBGb3JtW10gPSBbXTtcbiAgZm9yIChjb25zdCBrZXkgaW4gZm9ybS5yZXBzKSB7XG4gICAgY29uc3QgciA9IGZvcm0ucmVwc1trZXldO1xuICAgIHJlcHMucHVzaCguLi5yKTtcbiAgfVxuICByZXR1cm4gcmVwcztcbn1cblxuY29uc3QgTUFYX1JFUFMgPSAzMDtcblxuZXhwb3J0IGNvbnN0IGdldENvZGVJZGVudGlmaWVycyA9IChcbiAgc291cmNlOiBzdHJpbmcsXG4gIGluY2x1ZGVEb2xsYXJWYWx1ZTogYm9vbGVhbiA9IGZhbHNlLFxuKTogc3RyaW5nW10gPT4ge1xuICBjb25zdCBpZGVudGlmaWVycyA9IFtdIGFzIHN0cmluZ1tdO1xuICB0cnkge1xuICAgIHBhcnNlU2NyaXB0KHNvdXJjZS50b1N0cmluZygpLCB7XG4gICAgICBvblRva2VuOiAodG9rZW4sIHN0YXJ0LCBlbmQpID0+IHtcbiAgICAgICAgaWYgKHRva2VuID09ICdJZGVudGlmaWVyJykge1xuICAgICAgICAgIGNvbnN0IGlkZW50aWZpZXIgPSBzb3VyY2UudG9TdHJpbmcoKS5zdWJzdHJpbmcoc3RhcnQsIGVuZCk7XG4gICAgICAgICAgaWYgKGluY2x1ZGVEb2xsYXJWYWx1ZSB8fCBpZGVudGlmaWVyICE9PSAnJHZhbHVlJykge1xuICAgICAgICAgICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgfSk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBjb25zb2xlLmxvZyhzb3VyY2UpO1xuICAgIGNvbnNvbGUubG9nKGUpO1xuICB9XG4gIHJldHVybiBpZGVudGlmaWVycy5zb3J0KChpMSwgaTIpID0+IGkyLmxvY2FsZUNvbXBhcmUoaTEpKTtcbn07XG5cbmV4cG9ydCBjb25zdCBkYXRlVXRpbHMgPSB7XG4gIGFkZERheXM6IGRhdGVGbnMuYWRkRGF5cyxcbiAgYWRkTW9udGhzOiBkYXRlRm5zLmFkZE1vbnRocyxcbiAgYWRkWWVhcnM6IGRhdGVGbnMuYWRkWWVhcnMsXG4gIGVuZE9mSVNPV2VlazogZGF0ZUZucy5lbmRPZklTT1dlZWssXG4gIGZvcm1hdDogZGF0ZUZucy5mb3JtYXQsXG4gIGdldERheTogZGF0ZUZucy5nZXREYXksXG4gIHBhcnNlOiBkYXRlRm5zLnBhcnNlSVNPLFxuICBzdGFydE9mTW9udGg6IGRhdGVGbnMuc3RhcnRPZk1vbnRoLFxuICBzdGFydE9mSVNPV2VlazogZGF0ZUZucy5zdGFydE9mSVNPV2VlayxcbiAgaXNCZWZvcmU6IGRhdGVGbnMuaXNCZWZvcmUsXG59O1xuXG5leHBvcnQgY2xhc3MgQWpmRXhwcmVzc2lvblV0aWxzIHtcbiAgLy8gVE9ETyB3aGF0IGlzIGl0IGZvclxuICBzdGF0aWMgVVRJTF9GVU5DVElPTlMgPSAnJztcbiAgLyoqXG4gICAqIEl0IGlzIGEga2V5LXZhbHVlIGRpY3Rpb25hcnksIHRoYXQgbWFwcGluZyBhbGwgQWpmIHZhbGlkYXRpb24gZnVuY3Rpb25zLlxuICAgKi9cbiAgc3RhdGljIHV0aWxzOiB7W25hbWU6IHN0cmluZ106IEFqZlZhbGlkYXRpb25Gbn0gPSB7XG4gICAgZGlnaXRDb3VudDoge2ZuOiBkaWdpdENvdW50fSxcbiAgICBkZWNpbWFsQ291bnQ6IHtmbjogZGVjaW1hbENvdW50fSxcbiAgICBpc0ludDoge2ZuOiBpc0ludH0sXG4gICAgbm90RW1wdHk6IHtmbjogbm90RW1wdHl9LFxuICAgIHZhbHVlSW5DaG9pY2U6IHtmbjogdmFsdWVJbkNob2ljZX0sXG4gICAgc2Nhbkdyb3VwRmllbGQ6IHtmbjogc2Nhbkdyb3VwRmllbGR9LFxuICAgIHN1bToge2ZuOiBzdW19LFxuICAgIGRhdGVPcGVyYXRpb25zOiB7Zm46IGRhdGVPcGVyYXRpb25zfSxcbiAgICByb3VuZDoge2ZuOiByb3VuZH0sXG4gICAgZXh0cmFjdEFycmF5OiB7Zm46IGV4dHJhY3RBcnJheX0sXG4gICAgZXh0cmFjdFN1bToge2ZuOiBleHRyYWN0U3VtfSxcbiAgICBleHRyYWN0QXJyYXlTdW06IHtmbjogZXh0cmFjdEFycmF5U3VtfSxcbiAgICBkcmF3VGhyZXNob2xkOiB7Zm46IGRyYXdUaHJlc2hvbGR9LFxuICAgIGV4dHJhY3REYXRlczoge2ZuOiBleHRyYWN0RGF0ZXN9LFxuICAgIGxhc3RQcm9wZXJ0eToge2ZuOiBsYXN0UHJvcGVydHl9LFxuICAgIHN1bUxhc3RQcm9wZXJ0aWVzOiB7Zm46IHN1bUxhc3RQcm9wZXJ0aWVzfSxcbiAgICBjYWxjdWxhdGVUcmVuZFByb3BlcnR5OiB7Zm46IGNhbGN1bGF0ZVRyZW5kUHJvcGVydHl9LFxuICAgIGNhbGN1bGF0ZVRyZW5kQnlQcm9wZXJ0aWVzOiB7Zm46IGNhbGN1bGF0ZVRyZW5kQnlQcm9wZXJ0aWVzfSxcbiAgICBjYWxjdWxhdGVBdmdQcm9wZXJ0eToge2ZuOiBjYWxjdWxhdGVBdmdQcm9wZXJ0eX0sXG4gICAgY2FsY3VsYXRlQXZnUHJvcGVydHlBcnJheToge2ZuOiBjYWxjdWxhdGVBdmdQcm9wZXJ0eUFycmF5fSxcbiAgICBhbGVydDoge2ZuOiBhbGVydH0sXG4gICAgZm9ybWF0TnVtYmVyOiB7Zm46IGZvcm1hdE51bWJlcn0sXG4gICAgZm9ybWF0RGF0ZToge2ZuOiBmb3JtYXREYXRlfSxcbiAgICBpc29Nb250aDoge2ZuOiBpc29Nb250aH0sXG4gICAgZ2V0Q29vcmRpbmF0ZToge2ZuOiBnZXRDb29yZGluYXRlfSxcbiAgICBNYXRoOiB7Zm46IE1hdGh9LFxuICAgIHBhcnNlSW50OiB7Zm46IHBhcnNlSW50fSxcbiAgICBwYXJzZUZsb2F0OiB7Zm46IHBhcnNlRmxvYXR9LFxuICAgIHBhcnNlRGF0ZToge2ZuOiBkYXRlVXRpbHMucGFyc2V9LFxuICAgIERhdGU6IHtmbjogRGF0ZX0sXG4gICAgcGxhaW5BcnJheToge2ZuOiBwbGFpbkFycmF5fSxcbiAgICBDT1VOVF9GT1JNUzoge2ZuOiBDT1VOVF9GT1JNU30sXG4gICAgQ09VTlRfRk9STVNfVU5JUVVFOiB7Zm46IENPVU5UX0ZPUk1TX1VOSVFVRX0sXG4gICAgQ09VTlRfUkVQUzoge2ZuOiBDT1VOVF9SRVBTfSxcbiAgICBTVU06IHtmbjogU1VNfSxcbiAgICBNRUFOOiB7Zm46IE1FQU59LFxuICAgIFBFUkNFTlQ6IHtmbjogUEVSQ0VOVH0sXG4gICAgTEFTVDoge2ZuOiBMQVNUfSxcbiAgICBGSVJTVDoge2ZuOiBGSVJTVH0sXG4gICAgTUFYOiB7Zm46IE1BWH0sXG4gICAgTUVESUFOOiB7Zm46IE1FRElBTn0sXG4gICAgTU9ERToge2ZuOiBNT0RFfSxcbiAgICBBTExfVkFMVUVTX09GOiB7Zm46IEFMTF9WQUxVRVNfT0Z9LFxuICAgIFJFUEVBVDoge2ZuOiBSRVBFQVR9LFxuICAgIEVWQUxVQVRFOiB7Zm46IEVWQUxVQVRFfSxcbiAgICBJTkNMVURFUzoge2ZuOiBJTkNMVURFU30sXG4gICAgYnVpbGREYXRhc2V0OiB7Zm46IGJ1aWxkRGF0YXNldH0sXG4gICAgYnVpbGRBbGlnbmVkRGF0YXNldDoge2ZuOiBidWlsZEFsaWduZWREYXRhc2V0fSxcbiAgICBidWlsZEZvcm1EYXRhc2V0OiB7Zm46IGJ1aWxkRm9ybURhdGFzZXR9LFxuICAgIGJ1aWxkQWxpZ25lZEZvcm1EYXRhc2V0OiB7Zm46IGJ1aWxkQWxpZ25lZEZvcm1EYXRhc2V0fSxcbiAgICBidWlsZFdpZGdldERhdGFzZXQ6IHtmbjogYnVpbGRXaWRnZXREYXRhc2V0fSxcbiAgICBidWlsZFdpZGdldERhdGFzZXRXaXRoRGlhbG9nOiB7Zm46IGJ1aWxkV2lkZ2V0RGF0YXNldFdpdGhEaWFsb2d9LFxuICAgIEZJTFRFUl9CWV9WQVJTOiB7Zm46IEZJTFRFUl9CWV9WQVJTfSxcbiAgICBGSUxURVJfQlk6IHtmbjogRklMVEVSX0JZfSxcbiAgICBBRERfREFZUzoge2ZuOiBBRERfREFZU30sXG4gICAgREFZU19ESUZGOiB7Zm46IERBWVNfRElGRn0sXG4gICAgSVNfQkVGT1JFOiB7Zm46IElTX0JFRk9SRX0sXG4gICAgSVNfQUZURVI6IHtmbjogSVNfQUZURVJ9LFxuICAgIElTX1dJVEhJTl9JTlRFUlZBTDoge2ZuOiBJU19XSVRISU5fSU5URVJWQUx9LFxuICAgIENPTVBBUkVfREFURToge2ZuOiBDT01QQVJFX0RBVEV9LFxuICAgIEFQUExZOiB7Zm46IEFQUExZfSxcbiAgICBUT0RBWToge2ZuOiBUT0RBWX0sXG4gICAgR0VUX0FHRToge2ZuOiBHRVRfQUdFfSxcbiAgICBCVUlMRF9EQVRBU0VUOiB7Zm46IEJVSUxEX0RBVEFTRVR9LFxuICAgIEpPSU5fRk9STVM6IHtmbjogSk9JTl9GT1JNU30sXG4gICAgTEVOOiB7Zm46IExFTn0sXG4gICAgQ09OQ0FUOiB7Zm46IENPTkNBVH0sXG4gICAgUkVNT1ZFX0RVUExJQ0FURVM6IHtmbjogUkVNT1ZFX0RVUExJQ0FURVN9LFxuICAgIEpPSU5fUkVQRUFUSU5HX1NMSURFUzoge2ZuOiBKT0lOX1JFUEVBVElOR19TTElERVN9LFxuICAgIEZST01fUkVQUzoge2ZuOiBGUk9NX1JFUFN9LFxuICAgIElTSU46IHtmbjogSVNJTn0sXG4gICAgTUFQOiB7Zm46IE1BUH0sXG4gICAgT1A6IHtmbjogT1B9LFxuICAgIEdFVF9MQUJFTFM6IHtmbjogR0VUX0xBQkVMU30sXG4gICAgQVBQTFlfTEFCRUxTOiB7Zm46IEFQUExZX0xBQkVMU30sXG4gICAgUk9VTkQ6IHtmbjogUk9VTkR9LFxuICAgIENPTlNPTEVfTE9HOiB7Zm46IENPTlNPTEVfTE9HfSxcbiAgfTtcbn1cblxuLyoqXG4gKiBVVElMSVRZIEZVTkNJT05cbiAqIFRoaXMgZnVuY3Rpb24gcHJvdmlkZSBhIGRlZXAgY29weSBidWlsZGVyIG9mIGFycmF5IG9mIG1haW4gZm9ybXMuXG4gKiBUaGF0J3MgYSBjdXN0b20gZnVuY3Rpb24gcmVsYXRlZCB0byBtYWluZm9ybXMgdGhhdCBjYW4gYmUgYWJsZSB0byBpbmNyZWFzZSBjb3B5IHBlcmZvcm1hbmNlLlxuICpcbiAqIEBwYXJhbSB7TWFpbkZvcm1bXX0gZm9ybXNcbiAqIEByZXR1cm4geyp9ICB7TWFpbkZvcm1bXX1cbiAqL1xuZnVuY3Rpb24gY2xvbmVNYWluRm9ybXMoZm9ybXM6IE1haW5Gb3JtW10pOiBNYWluRm9ybVtdIHtcbiAgbGV0IHJlczogTWFpbkZvcm1bXSA9IFtdO1xuICBmb3IgKGNvbnN0IGZvcm0gb2YgZm9ybXMpIHtcbiAgICBpZiAoZm9ybSA9PSBudWxsKSB7XG4gICAgICByZXMucHVzaChmb3JtKTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBsZXQgcmVwczogSW5zdGFuY2VzID0ge307XG4gICAgaWYgKGZvcm0ucmVwcyAhPSBudWxsKSB7XG4gICAgICBmb3IgKGNvbnN0IGtleSBpbiBmb3JtLnJlcHMpIHtcbiAgICAgICAgcmVwc1trZXldID0gWy4uLmZvcm0ucmVwc1trZXldXTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmVzLnB1c2goey4uLmZvcm0sIHJlcHN9KTtcbiAgfVxuICByZXR1cm4gcmVzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZXZhbHVhdGVFeHByZXNzaW9uKGV4cHJlc3Npb246IHN0cmluZywgY29udGV4dD86IEFqZkNvbnRleHQpOiBhbnkge1xuICByZXR1cm4gY3JlYXRlRnVuY3Rpb24oZXhwcmVzc2lvbikoY29udGV4dCk7XG59XG5cbnR5cGUgRnVuYyA9IChjPzogQWpmQ29udGV4dCkgPT4gYW55O1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRnVuY3Rpb24oZXhwcmVzc2lvbjogc3RyaW5nKTogRnVuYyB7XG4gIGlmIChleHByZXNzaW9uID09IG51bGwpIHtcbiAgICByZXR1cm4gXyA9PiBudWxsO1xuICB9XG4gIGV4cHJlc3Npb24gPSBTdHJpbmcoZXhwcmVzc2lvbik7XG4gIGlmIChleHByZXNzaW9uID09PSAndHJ1ZScpIHtcbiAgICByZXR1cm4gXyA9PiB0cnVlO1xuICB9XG4gIGlmIChleHByZXNzaW9uID09PSAnZmFsc2UnKSB7XG4gICAgcmV0dXJuIF8gPT4gZmFsc2U7XG4gIH1cbiAgaWYgKC9eW2EtekEtWl8kXVtcXHckXSokLy50ZXN0KGV4cHJlc3Npb24pKSB7IC8vIGV4cHJlc3Npb24gaXMgYW4gaWRlbnRpZmllclxuICAgIHJldHVybiBjID0+IGMgPT0gbnVsbCB8fCBjW2V4cHJlc3Npb25dID09PSB1bmRlZmluZWQgPyBudWxsIDogY1tleHByZXNzaW9uXTtcbiAgfVxuICBpZiAoL15cIlteXCJdKlwiJC8udGVzdChleHByZXNzaW9uKSB8fCAvXidbXiddKickLy50ZXN0KGV4cHJlc3Npb24pKSB7XG4gICAgbGV0IHN0ciA9IGV4cHJlc3Npb24uc2xpY2UoMSwgLTEpO1xuICAgIHJldHVybiBfID0+IHN0cjtcbiAgfVxuXG4gIGNvbnN0IGFyZ05hbWVzID0gWy4uLm5ldyBTZXQoZ2V0Q29kZUlkZW50aWZpZXJzKGV4cHJlc3Npb24sIHRydWUpKS5hZGQoJ2V4ZWNDb250ZXh0JyldO1xuICBsZXQgZnVuYzogRnVuY3Rpb247XG4gIHRyeSB7XG4gICAgZnVuYyA9IG5ldyBGdW5jdGlvbiguLi5hcmdOYW1lcywgJ3JldHVybiAnICsgZXhwcmVzc2lvbik7XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiBfID0+IGZhbHNlO1xuICB9XG4gIHJldHVybiBjb250ZXh0ID0+IHtcbiAgICBjb25zdCBhcmdWYWx1ZXMgPSBhcmdOYW1lcy5tYXAobmFtZSA9PiB7XG4gICAgICBpZiAoY29udGV4dCAhPSBudWxsICYmIGNvbnRleHRbbmFtZV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gY29udGV4dFtuYW1lXTtcbiAgICAgIH1cbiAgICAgIGlmIChBamZFeHByZXNzaW9uVXRpbHMudXRpbHNbbmFtZV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gQWpmRXhwcmVzc2lvblV0aWxzLnV0aWxzW25hbWVdLmZuO1xuICAgICAgfVxuICAgICAgaWYgKG5hbWUgPT09ICdleGVjQ29udGV4dCcpIHtcbiAgICAgICAgcmV0dXJuIGV4ZWNDb250ZXh0O1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSk7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBmdW5jKC4uLmFyZ1ZhbHVlcyk7XG4gICAgfSBjYXRjaCB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9O1xufVxuXG4vKipcbiAqIEl0IHJldHVybnMgdGhlIGNvdW50IG9mIGRpZ2l0IGluc2lkZSB4LlxuICovXG5leHBvcnQgZnVuY3Rpb24gZGlnaXRDb3VudCh4OiBudW1iZXIpOiBudW1iZXIge1xuICBpZiAoaXNOYU4oeCkgfHwgdHlwZW9mIHggIT09ICdudW1iZXInKSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cbiAgaWYgKCFpc0Zpbml0ZSh4KSkge1xuICAgIHJldHVybiBJbmZpbml0eTtcbiAgfVxuICByZXR1cm4geC50b1N0cmluZygpLnJlcGxhY2UoL1teMC05XS9nLCAnJykubGVuZ3RoO1xufVxuLyoqXG4gKiBJdCBpcyBjb3VudCB0aGUgY291bnQgb2YgZGVjaW1hbCBkaWdpdCBpbnNpZGUgcy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRlY2ltYWxDb3VudCh4OiBzdHJpbmcgfCBudW1iZXIpOiBudW1iZXIge1xuICBpZiAodHlwZW9mIHggPT09ICdzdHJpbmcnKSB7XG4gICAgeCA9IHBhcnNlRmxvYXQoeCk7XG4gIH1cbiAgaWYgKHR5cGVvZiB4ICE9PSAnbnVtYmVyJyB8fCBpc05hTih4KSkge1xuICAgIHJldHVybiAwO1xuICB9XG4gIGNvbnN0IHBhcnRzID0geC50b1N0cmluZygpLnNwbGl0KCcuJyk7XG4gIHJldHVybiBwYXJ0cy5sZW5ndGggPiAxID8gcGFydHNbMV0ubGVuZ3RoIDogMDtcbn1cbi8qKlxuICogSXQgaXMgdHJ1ZSBpZiB4IGlzIGFuIGludGVnZXIuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0ludCh4OiBzdHJpbmcgfCBudW1iZXIpOiBib29sZWFuIHtcbiAgaWYgKHR5cGVvZiB4ID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiAvXi0/XFxkKyQvLnRlc3QoeCk7XG4gIH1cbiAgaWYgKHR5cGVvZiB4ID09PSAnbnVtYmVyJykge1xuICAgIHJldHVybiBNYXRoLnJvdW5kKHgpID09PSB4O1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cbi8qKlxuICogSXQgaXMgdHJ1ZSBpZiB4IGlzIG5vdCBlbXB0eS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG5vdEVtcHR5KHg6IGFueSk6IGJvb2xlYW4ge1xuICByZXR1cm4gdHlwZW9mIHggIT09ICd1bmRlZmluZWQnICYmIHggIT09IG51bGwgPyB4LnRvU3RyaW5nKCkubGVuZ3RoID4gMCA6IGZhbHNlO1xufVxuLyoqXG4gKiBJdCBpcyB0cnVlIGlmIGFycmF5IGNvbnRhaW5zIHggb3IgYXJyYXkgaXMgZXF1YWwgdG8geC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHZhbHVlSW5DaG9pY2UoYXJyYXk6IGFueVtdLCB4OiBhbnkpOiBib29sZWFuIHtcbiAgcmV0dXJuIChhcnJheSB8fCBbXSkuaW5kZXhPZih4KSA+IC0xIHx8IGFycmF5ID09PSB4O1xufVxuLyoqXG4gKiBJdCBhcHBsaWVzIGNhbGxiYWNrIGZvciByZXBzIHRpbWVzIGFuZCBhY2N1bXVsYXRlIHRoZSByZXN1bHQgaW4gYWNjLlxuICovXG5leHBvcnQgZnVuY3Rpb24gc2Nhbkdyb3VwRmllbGQocmVwczogbnVtYmVyLCBhY2M6IGFueSwgY2FsbGJhY2s6IGFueSk6IGFueSB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcmVwczsgaSsrKSB7XG4gICAgYWNjID0gY2FsbGJhY2soYWNjLCBpKTtcbiAgfVxuICByZXR1cm4gYWNjO1xufVxuLyoqXG4gKiBJdCByZXR1cm5zIHRoZSBzdW0gb2YgdGhlIGFycmF5IHZhbHVlcy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHN1bShhcnJheTogYW55W10pOiBhbnkge1xuICByZXR1cm4gYXJyYXkucmVkdWNlKChhLCBiKSA9PiBhICsgYiwgMCk7XG59XG4vKipcbiAqIEl0IGFwcGxpZXMgYWRkL3JlbW92ZShvcGVyYXRpb24pIHYgKGRheS9tb250aC95ZWFyKXBlcmlvZCB0byBkc3RyaW5nIGFuZCByZXR1cm4gbmV3IGZvcm1hdCBkYXRlLlxuICovXG4vLyBUT0RPIGNoZWNrIGlmIGRlcHJlY2F0ZWQgaW5zdGVhZCByZWZhY290b3JpbmcgcGFyYW1ldGVyIHR5cGVcbi8vIFRPRE8gKGRTdHJpbmc6IHN0cmluZ3xudWxsLCBwZXJpb2Q6J2RheSd8J21vbnRoJ3wneWVhcicsXG4vLyBUT0RPIG9wZXJhdGlvbjogJ2FkZC9yZW1vdmUnID0gJ2FkZCcsIHY6bnVtYmVyKVxuZXhwb3J0IGZ1bmN0aW9uIGRhdGVPcGVyYXRpb25zKGRTdHJpbmc6IHN0cmluZywgcGVyaW9kOiBzdHJpbmcsIG9wZXJhdGlvbjogc3RyaW5nLCB2OiBhbnkpOiBzdHJpbmcge1xuICBjb25zdCBmbXQgPSAnbW0vZGQveXl5eSc7XG4gIGxldCBkID0gdHlwZW9mIGRTdHJpbmcgIT09ICd1bmRlZmluZWQnID8gZGF0ZVV0aWxzLnBhcnNlKGRTdHJpbmcpIDogbmV3IERhdGUoKTtcbiAgaWYgKG9wZXJhdGlvbiA9PSAncmVtb3ZlJykge1xuICAgIHYgPSAtdjtcbiAgfVxuICBsZXQgZGF0ZU9wO1xuICBzd2l0Y2ggKHBlcmlvZCkge1xuICAgIGNhc2UgJ2RheSc6XG4gICAgICBkYXRlT3AgPSBkYXRlVXRpbHMuYWRkRGF5cztcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ21vbnRoJzpcbiAgICAgIGRhdGVPcCA9IGRhdGVVdGlscy5hZGRNb250aHM7XG4gICAgICBicmVhaztcbiAgICBjYXNlICd5ZWFyJzpcbiAgICAgIGRhdGVPcCA9IGRhdGVVdGlscy5hZGRZZWFycztcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gJyc7XG4gIH1cbiAgcmV0dXJuIGRhdGVVdGlscy5mb3JtYXQoZGF0ZU9wKGQsIHYpLCBmbXQpO1xufVxuXG4vKipcbiAqIEZpeGVkIGRlY2ltYWxzIGZvciBmbG9hdGluZyBudW1iZXJcbiAqIFJlc29sdmUgZmxvYXQgc3VtIHByb2JsZW1zIGxpa2UgdGhpczogMC4xICsgMC4yID0gMC4zMDAwMDAwMDAwMDAwMDAwNFxuICogQHBhcmFtIG51bVxuICogQHJldHVybnNcbiAqL1xuZnVuY3Rpb24gdHJ1bmNhdGUxMChudW06IG51bWJlcikge1xuICByZXR1cm4gcGFyc2VGbG9hdChudW0udG9GaXhlZCgxMCkpO1xufVxuXG4vKipcbiAqIEl0IHJvdW5kcyB0aGUgbnVtIHdpdGggdGhlIHZhbHVlIG9mIGRpZ2l0c1xuICovXG5leHBvcnQgZnVuY3Rpb24gcm91bmQobnVtOiBudW1iZXIgfCBzdHJpbmcsIGRpZ2l0cz86IG51bWJlcik6IG51bWJlciB7XG4gIGRpZ2l0cyA9IGRpZ2l0cyB8fCAwO1xuICBsZXQgZjtcbiAgaWYgKHR5cGVvZiBudW0gIT09ICdudW1iZXInKSB7XG4gICAgdHJ5IHtcbiAgICAgIGYgPSBwYXJzZUZsb2F0KG51bSk7XG4gICAgfSBjYXRjaCAoZSkge31cbiAgfSBlbHNlIHtcbiAgICBmID0gbnVtO1xuICB9XG4gIGlmIChmID09IG51bGwgfHwgaXNOYU4oZikpIHtcbiAgICBmID0gMDtcbiAgfVxuICBjb25zdCBtID0gTWF0aC5wb3coMTAsIGRpZ2l0cyk7XG4gIHJldHVybiBNYXRoLnJvdW5kKGYgKiBtKSAvIG07XG59XG4vKipcbiAqIEl0IGV4dHJhY3RzIHByb3BlcnR5IGZyb20gc291cmNlLlxuICogZm9yIGV2ZXJ5IGVsZW1lbnQgb2Ygc291cmNlIGlmIHByb3BlcnR5IGFuZCBwcm9wZXJ0eTIgYXJlIGRlZmluZWQgcmV0dXJuIHRoZSBzdW1cbiAqIGVsc2UgaWYgb25seSBwcm9wZXJ0eSBpcyBkZWZpbmVkIHJldHVybiBoaW0uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBleHRyYWN0QXJyYXkoc291cmNlOiBhbnlbXSwgcHJvcGVydHk6IHN0cmluZywgcHJvcGVydHkyPzogc3RyaW5nKTogYW55W10ge1xuICBzb3VyY2UgPSAoc291cmNlIHx8IFtdKS5maWx0ZXIoKGY6IGFueSkgPT4gZiAhPSBudWxsKTtcbiAgY29uc3QgcmVzOiBhbnlbXSA9IFtdO1xuICBmb3IgKGNvbnN0IHMgb2Ygc291cmNlKSB7XG4gICAgaWYgKHNbcHJvcGVydHldICE9IG51bGwgJiYgcHJvcGVydHkyICE9IG51bGwgJiYgc1twcm9wZXJ0eTJdICE9IG51bGwpIHtcbiAgICAgIHJlcy5wdXNoKE51bWJlcihzW3Byb3BlcnR5XSkgKyBOdW1iZXIoc1twcm9wZXJ0eTJdKSk7XG4gICAgfSBlbHNlIGlmIChzW3Byb3BlcnR5XSAhPSBudWxsKSB7XG4gICAgICByZXMucHVzaChzW3Byb3BlcnR5XSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXM7XG59XG4vKipcbiAqIEl0IHJldHVybnMgdGhlIHN1bSBvZiBhbGwgZGVmaW5lZCBwcm9wZXJ0aWVzIG9mIGVhY2ggZWxlbWVudCBvZiBzb3VyY2UuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBleHRyYWN0U3VtKHNvdXJjZTogYW55W10sIHByb3BlcnRpZXM6IHN0cmluZ1tdKTogbnVtYmVyIHtcbiAgcHJvcGVydGllcyA9IFsuLi4ocHJvcGVydGllcyB8fCBbXSldO1xuXG4gIGxldCBzdW1WYWwgPSAwO1xuICBmb3IgKGNvbnN0IHByb3Agb2YgcHJvcGVydGllcykge1xuICAgIGNvbnN0IGFycmF5ID0gZXh0cmFjdEFycmF5KHNvdXJjZSwgcHJvcCk7XG4gICAgZm9yIChjb25zdCBhIG9mIGFycmF5KSB7XG4gICAgICBpZiAoIWlzTmFOKE51bWJlcihhKSkpIHtcbiAgICAgICAgc3VtVmFsICs9IE51bWJlcihhKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHN1bVZhbDtcbn1cbi8qKlxuICogSXQgcmV0dXJucyBhIG51bWJlciBhcnJheSB0aGF0IGNvbnRhaW5zIHRoZSBzdW0gb2YgcHJvcGVydGllcyB2YWx1ZSBpbnNpZGUgdGhlIHNvdXJjZS5cbiAqIGV4dHJhY3RBcnJheVN1bShbe2E6IDV9LCB7YjogMX0sIHthOiA1LCBiOiAxfV0sIFsnYScsICdiJ10pOyA9Jmd0OyBbNiw2XVxuICovXG5leHBvcnQgZnVuY3Rpb24gZXh0cmFjdEFycmF5U3VtKHNvdXJjZTogYW55W10sIHByb3BlcnRpZXM6IHN0cmluZ1tdKTogYW55W10ge1xuICBjb25zdCBhcnJheXM6IGFueVtdID0gW107XG4gIHByb3BlcnRpZXMgPSBbLi4uKHByb3BlcnRpZXMgfHwgW10pXTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IHByb3BlcnRpZXMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBhcnJheSA9IGV4dHJhY3RBcnJheShzb3VyY2UsIHByb3BlcnRpZXNbaV0pO1xuICAgIGFycmF5cy5wdXNoKGFycmF5KTtcbiAgfVxuXG4gIGNvbnN0IHJlczogYW55W10gPSBbXTtcbiAgaWYgKGFycmF5cy5sZW5ndGggPiAwKSB7XG4gICAgZm9yIChsZXQgd2Vla0kgPSAwOyB3ZWVrSSA8IGFycmF5c1swXS5sZW5ndGg7IHdlZWtJKyspIHtcbiAgICAgIGxldCBzdW1WYWwgPSAwO1xuICAgICAgZm9yIChsZXQgcHJvcEkgPSAwOyBwcm9wSSA8IHByb3BlcnRpZXMubGVuZ3RoOyBwcm9wSSsrKSB7XG4gICAgICAgIHN1bVZhbCA9IHN1bVZhbCArIE51bWJlcihhcnJheXNbcHJvcEldW3dlZWtJXSk7XG4gICAgICB9XG4gICAgICByZXMucHVzaChzdW1WYWwpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzO1xufVxuLyoqXG4gKiBEcmF3IGEgdGhyZXNob2xkIGxpbmUgb24gY2hhcnQgcmVsYXRlZCB0byB0aGUgcHJvcGVydHkuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkcmF3VGhyZXNob2xkKHNvdXJjZTogYW55W10sIHByb3BlcnR5OiBzdHJpbmcsIHRocmVzaG9sZDogYW55W10pOiBhbnlbXSB7XG4gIHNvdXJjZSA9IChzb3VyY2UgfHwgW10pLmZpbHRlcigoZjogYW55KSA9PiBmICE9IG51bGwpO1xuICB0aHJlc2hvbGQgPSB0aHJlc2hvbGQgfHwgWzBdO1xuICBpZiAoISh0aHJlc2hvbGQgaW5zdGFuY2VvZiBBcnJheSkpIHtcbiAgICB0aHJlc2hvbGQgPSBbdGhyZXNob2xkXTtcbiAgfVxuICBjb25zdCBsID0gc291cmNlLmxlbmd0aDtcbiAgY29uc3QgcmVzOiBhbnlbXSA9IFtdO1xuICBsZXQgY291bnQgPSAwO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGw7IGkrKykge1xuICAgIGlmIChzb3VyY2VbaV1bcHJvcGVydHldICE9IG51bGwpIHtcbiAgICAgIGlmICh0aHJlc2hvbGQubGVuZ3RoID4gY291bnQpIHtcbiAgICAgICAgcmVzLnB1c2godGhyZXNob2xkW2NvdW50XSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXMucHVzaCh0aHJlc2hvbGRbMF0pO1xuICAgICAgfVxuICAgICAgY291bnQrKztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cbi8qKlxuICogRXh0cmFjdCB0aGUgZGF0ZXMgb2YgdGhlIHNvdXJjZSBvYmplY3Qgd2l0aCBwcm9wZXJ0eSAhPSBudWxsXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBleHRyYWN0RGF0ZXMoc291cmNlOiBhbnlbXSwgcHJvcGVydHk6IHN0cmluZywgZm10OiBzdHJpbmcpOiBzdHJpbmdbXSB7XG4gIHNvdXJjZSA9IChzb3VyY2UgfHwgW10pLmZpbHRlcigoZjogYW55KSA9PiBmICE9IG51bGwpO1xuICBjb25zdCBsID0gc291cmNlLmxlbmd0aDtcbiAgY29uc3QgcmVzOiBhbnkgPSBbXTtcbiAgbGV0IHByZWZpeCA9ICcnO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGw7IGkrKykge1xuICAgIGlmIChzb3VyY2VbaV1bcHJvcGVydHldICE9IG51bGwpIHtcbiAgICAgIHN3aXRjaCAoZm10KSB7XG4gICAgICAgIGNhc2UgJ1dXJzpcbiAgICAgICAgY2FzZSAnd3cnOlxuICAgICAgICAgIHByZWZpeCA9ICdXJztcbiAgICAgICAgICByZXMucHVzaChwcmVmaXggKyBmb3JtYXREYXRlKHNvdXJjZVtpXVsnZGF0ZV9zdGFydCddLCBmbXQpKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnTU0nOlxuICAgICAgICBjYXNlICdtbSc6XG4gICAgICAgICAgcHJlZml4ID0gJ00nO1xuICAgICAgICAgIHJlcy5wdXNoKHByZWZpeCArIGlzb01vbnRoKHNvdXJjZVtpXVsnZGF0ZV9zdGFydCddLCBmbXQpKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBwcmVmaXggPSAnJztcbiAgICAgICAgICByZXMucHVzaChwcmVmaXggKyBmb3JtYXREYXRlKHNvdXJjZVtpXVsnZGF0ZV9zdGFydCddLCBmbXQpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cbi8qKlxuICogRXh0cmFjdCB0aGUgbGFzdCBwcm9wZXJ0eSBjb250YWlucyBpbiBzb3VyY2UgIT0gbnVsbFxuICovXG5leHBvcnQgZnVuY3Rpb24gbGFzdFByb3BlcnR5KHNvdXJjZTogYW55LCBwcm9wZXJ0eTogc3RyaW5nKTogYW55IHtcbiAgc291cmNlID0gKHNvdXJjZSB8fCBbXSkuZmlsdGVyKChmOiBhbnkpID0+IGYgIT0gbnVsbCk7XG4gIGxldCBsID0gc291cmNlLmxlbmd0aCAtIDE7XG5cbiAgd2hpbGUgKGwgPj0gMCAmJiBzb3VyY2VbbF1bcHJvcGVydHldID09IG51bGwpIHtcbiAgICBsLS07XG4gICAgaWYgKGwgPCAwKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICB9XG4gIHJldHVybiBsID49IDAgPyBzb3VyY2VbbF1bcHJvcGVydHldIDogJyc7XG59XG4vKipcbiAqIEl0IHN1bSB0aGUgTEFzdCBwcm9wZXJ0aWVzIG9mIHNvdXJjZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHN1bUxhc3RQcm9wZXJ0aWVzKHNvdXJjZTogYW55W10sIHByb3BlcnRpZXM6IHN0cmluZ1tdKTogbnVtYmVyIHtcbiAgc291cmNlID0gKHNvdXJjZSB8fCBbXSkuZmlsdGVyKChmOiBhbnkpID0+IGYgIT0gbnVsbCk7XG4gIGxldCBzdW1WYWwgPSAwO1xuICBsZXQgdmFsID0gMDtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9wZXJ0aWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFsID0gTnVtYmVyKGxhc3RQcm9wZXJ0eShzb3VyY2UsIHByb3BlcnRpZXNbaV0pKTtcbiAgICBpZiAoIWlzTmFOKHZhbCkpIHtcbiAgICAgIHN1bVZhbCArPSB2YWw7XG4gICAgfVxuICB9XG4gIHJldHVybiBzdW1WYWw7XG59XG4vKipcbiAqIENvbXB1dGUgdGhlIHRyZW5kIG9mIHRoZSBwcm9wZXJ0eSBjb250YWluZWQgb24gdGhlIHNvdXJjZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNhbGN1bGF0ZVRyZW5kUHJvcGVydHkoc291cmNlOiBhbnlbXSwgcHJvcGVydHk6IHN0cmluZyk6IHN0cmluZyB7XG4gIHNvdXJjZSA9IChzb3VyY2UgfHwgW10pLmZpbHRlcigoZjogYW55KSA9PiBmICE9IG51bGwpO1xuICBsZXQgbGFzdCA9IHNvdXJjZS5sZW5ndGggLSAxO1xuICB3aGlsZSAoc291cmNlW2xhc3RdW3Byb3BlcnR5XSA9PSBudWxsKSB7XG4gICAgaWYgKGxhc3QgPT0gMCkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGxhc3QtLTtcbiAgfVxuICBsZXQgbGFzdExhc3QgPSBsYXN0IC0gMTtcbiAgaWYgKGxhc3QgPT0gMCkge1xuICAgIGxhc3RMYXN0ID0gbGFzdDtcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc291cmNlW2xhc3RMYXN0XVtwcm9wZXJ0eV0gPT0gbnVsbCkge1xuICAgICAgaWYgKGxhc3RMYXN0ID09IDApIHtcbiAgICAgICAgbGFzdExhc3QgPSBsYXN0O1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGxhc3RMYXN0LS07XG4gICAgfVxuICB9XG5cbiAgY29uc3QgbGFzdFByb3AgPSBzb3VyY2VbbGFzdF0gPyBzb3VyY2VbbGFzdF1bcHJvcGVydHldIHx8IDAgOiAwO1xuICBjb25zdCBsYXN0TGFzdFByb3AgPSBzb3VyY2VbbGFzdExhc3RdID8gc291cmNlW2xhc3RMYXN0XVtwcm9wZXJ0eV0gfHwgMCA6IDA7XG5cbiAgaWYgKGxhc3RQcm9wID09IGxhc3RMYXN0UHJvcCkge1xuICAgIHJldHVybiAnPHA+PGkgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiIHN0eWxlPVwiY29sb3I6Ymx1ZVwiPnRyZW5kaW5nX2ZsYXQ8L2k+PC9wPic7XG4gIH0gZWxzZSBpZiAobGFzdFByb3AgPiBsYXN0TGFzdFByb3ApIHtcbiAgICByZXR1cm4gJzxwPjxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIiBzdHlsZT1cImNvbG9yOmdyZWVuXCI+dHJlbmRpbmdfdXA8L2k+PC9wPic7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuICc8cD48aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCIgc3R5bGU9XCJjb2xvcjpyZWRcIj50cmVuZGluZ19kb3duPC9pPjwvcD4nO1xuICB9XG59XG4vKipcbiAqIENvbXB1dGUgdGhlIGF2ZXJhZ2UgdmFsdWUgb2YgdGhlIHByb3BlcnR5IGNvbnRhaW5lZCBvbiB0aGUgc291cmNlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gY2FsY3VsYXRlVHJlbmRCeVByb3BlcnRpZXMoc291cmNlOiBhbnlbXSwgcHJvcGVydGllczogc3RyaW5nW10pOiBzdHJpbmcge1xuICBjb25zdCBhcnJheXN1bSA9IGV4dHJhY3RBcnJheVN1bShzb3VyY2UsIHByb3BlcnRpZXMpO1xuXG4gIGNvbnN0IGxhc3RQcm9wID0gYXJyYXlzdW0ubGVuZ3RoID4gMCA/IGFycmF5c3VtW2FycmF5c3VtLmxlbmd0aCAtIDFdIHx8IDAgOiAwO1xuICBjb25zdCBsYXN0TGFzdFByb3AgPSBhcnJheXN1bS5sZW5ndGggPiAxID8gYXJyYXlzdW1bYXJyYXlzdW0ubGVuZ3RoIC0gMl0gfHwgMCA6IGxhc3RQcm9wO1xuXG4gIGlmIChsYXN0UHJvcCA9PSBsYXN0TGFzdFByb3ApIHtcbiAgICByZXR1cm4gJzxwPjxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIiBzdHlsZT1cImNvbG9yOmJsdWVcIj50cmVuZGluZ19mbGF0PC9pPjwvcD4nO1xuICB9IGVsc2UgaWYgKGxhc3RQcm9wID4gbGFzdExhc3RQcm9wKSB7XG4gICAgcmV0dXJuICc8cD48aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCIgc3R5bGU9XCJjb2xvcjpncmVlblwiPnRyZW5kaW5nX3VwPC9pPjwvcD4nO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAnPHA+PGkgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiIHN0eWxlPVwiY29sb3I6cmVkXCI+dHJlbmRpbmdfZG93bjwvaT48L3A+JztcbiAgfVxufVxuLyoqXG4gKlxuICovXG5leHBvcnQgZnVuY3Rpb24gY2FsY3VsYXRlQXZnUHJvcGVydHkoXG4gIHNvdXJjZTogYW55W10sXG4gIHByb3BlcnR5OiBzdHJpbmcsXG4gIHJhbmdlOiBudW1iZXIsXG4gIGNvZWZmaWNpZW50OiBudW1iZXIsXG4pOiBudW1iZXIge1xuICBzb3VyY2UgPSAoc291cmNlIHx8IFtdKS5maWx0ZXIoKGY6IGFueSkgPT4gZiAhPSBudWxsKTtcblxuICBjb2VmZmljaWVudCA9IGNvZWZmaWNpZW50IHx8IDE7XG4gIHJhbmdlID0gcmFuZ2UgfHwgMTI7XG5cbiAgbGV0IGwgPSBzb3VyY2UubGVuZ3RoO1xuICBsZXQgcmVzID0gMDtcbiAgbGV0IGNvdW50ZXIgPSAwO1xuICBsZXQgbm9aZXJvID0gMDtcblxuICBpZiAobCA8IHJhbmdlKSB7XG4gICAgcmFuZ2UgPSBsO1xuICB9XG5cbiAgd2hpbGUgKHJhbmdlICE9IDApIHtcbiAgICBpZiAoc291cmNlW2wgLSAxXVtwcm9wZXJ0eV0gIT0gbnVsbCkge1xuICAgICAgY291bnRlcisrO1xuICAgICAgcmVzICs9IE51bWJlcihzb3VyY2VbbCAtIDFdW3Byb3BlcnR5XSk7XG5cbiAgICAgIGlmIChzb3VyY2VbbCAtIDFdW3Byb3BlcnR5XSA+IDApIHtcbiAgICAgICAgbm9aZXJvKys7XG4gICAgICB9XG4gICAgfVxuICAgIGwtLTtcbiAgICByYW5nZS0tO1xuICB9XG5cbiAgaWYgKGNvZWZmaWNpZW50ID09IDApIHtcbiAgICByZXR1cm4gbm9aZXJvO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiByb3VuZCgocmVzIC8gY291bnRlcikgKiBjb2VmZmljaWVudCwgMikgfHwgMDtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY2FsY3VsYXRlQXZnUHJvcGVydHlBcnJheShcbiAgc291cmNlOiBhbnlbXSxcbiAgcHJvcGVydGllczogc3RyaW5nW10sXG4gIHJhbmdlOiBudW1iZXIsXG4gIGNvZWZmaWNpZW50OiBudW1iZXIsXG4pOiBudW1iZXJbXSB7XG4gIHNvdXJjZSA9IChzb3VyY2UgfHwgW10pLmZpbHRlcigoZjogYW55KSA9PiBmICE9IG51bGwpO1xuICBjb25zdCByZXNBcnI6IGFueVtdID0gW107XG5cbiAgaWYgKHByb3BlcnRpZXMgJiYgcHJvcGVydGllcy5sZW5ndGggPiAwKSB7XG4gICAgbGV0IGF2ZyA9IDA7XG5cbiAgICBjb2VmZmljaWVudCA9IGNvZWZmaWNpZW50IHx8IDE7XG4gICAgcmFuZ2UgPSByYW5nZSB8fCAxMjtcblxuICAgIGNvbnN0IHNvdXJjZUFyciA9XG4gICAgICBwcm9wZXJ0aWVzLmxlbmd0aCA+IDFcbiAgICAgICAgPyBleHRyYWN0QXJyYXlTdW0oc291cmNlLCBwcm9wZXJ0aWVzKVxuICAgICAgICA6IGV4dHJhY3RBcnJheShzb3VyY2UsIHByb3BlcnRpZXNbMF0pO1xuXG4gICAgbGV0IGwgPSBzb3VyY2VBcnIubGVuZ3RoO1xuXG4gICAgZm9yIChsZXQgbGVuID0gbDsgbGVuID4gMDsgbGVuLS0pIHtcbiAgICAgIGxldCByZXMgPSAwO1xuICAgICAgbGV0IGNvdW50ZXIgPSAwO1xuICAgICAgbGV0IG5vWmVybyA9IDA7XG5cbiAgICAgIGlmIChsZW4gPCByYW5nZSkge1xuICAgICAgICByYW5nZSA9IGxlbjtcbiAgICAgIH1cblxuICAgICAgZm9yIChsZXQgciA9IDE7IHIgPD0gcmFuZ2U7IHIrKykge1xuICAgICAgICBsZXQgdmFsID0gc291cmNlQXJyW2xlbiAtIHJdO1xuICAgICAgICBpZiAodmFsICE9IG51bGwpIHtcbiAgICAgICAgICBjb3VudGVyKys7XG4gICAgICAgICAgcmVzICs9IE51bWJlcih2YWwpO1xuICAgICAgICAgIGlmICh2YWwgPiAwKSB7XG4gICAgICAgICAgICBub1plcm8rKztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGNvdW50ZXIgPiAwKSB7XG4gICAgICAgIGlmIChjb2VmZmljaWVudCA9PSAwKSB7XG4gICAgICAgICAgYXZnID0gbm9aZXJvO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGF2ZyA9IChyZXMgLyBjb3VudGVyKSAqIGNvZWZmaWNpZW50IHx8IDA7XG4gICAgICAgIH1cbiAgICAgICAgcmVzQXJyLnB1c2gocm91bmQoYXZnLCAyKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiByZXNBcnIucmV2ZXJzZSgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWxlcnQoc291cmNlOiBhbnlbXSwgcHJvcGVydHk6IHN0cmluZywgdGhyZXNob2xkOiBudW1iZXIpOiBzdHJpbmcge1xuICBzb3VyY2UgPSBbLi4uKHNvdXJjZSB8fCBbXSldO1xuXG4gIGlmIChsYXN0UHJvcGVydHkoc291cmNlLCBwcm9wZXJ0eSkgPiB0aHJlc2hvbGQpIHtcbiAgICByZXR1cm4gJzxwPjxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIiBzdHlsZT1cImNvbG9yOnJlZFwiPndhcm5pbmc8L2k+PC9wPic7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuICc8cD48L3A+JztcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0TnVtYmVyKG51bTogbnVtYmVyLCBmbXQ/OiBzdHJpbmcpOiBzdHJpbmcge1xuICBmbXQgPSBmbXQgfHwgJzAsMFsuXTAnO1xuICByZXR1cm4gbnVtYnJvKG51bSkuZm9ybWF0KGZtdCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXREYXRlKGRhdGU6IERhdGUgfCBzdHJpbmcsIGZtdD86IHN0cmluZyk6IHN0cmluZyB7XG4gIGZtdCA9IGZtdCB8fCAnbW0tREQteXl5eSc7XG4gIHJldHVybiBkYXRlVXRpbHMuZm9ybWF0KHR5cGVvZiBkYXRlID09PSAnc3RyaW5nJyA/IGRhdGVVdGlscy5wYXJzZShkYXRlKSA6IGRhdGUsIGZtdCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc29Nb250aChkYXRlOiBEYXRlLCBmbXQ/OiBzdHJpbmcpOiBzdHJpbmcge1xuICBmbXQgPSBmbXQgfHwgJ21tJztcbiAgY29uc3QgZHUgPSBkYXRlVXRpbHM7XG4gIHJldHVybiBkdS5mb3JtYXQoZHUuYWRkRGF5cyhkdS5zdGFydE9mSVNPV2VlayhkYXRlKSwgMyksIGZtdCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRDb29yZGluYXRlKHNvdXJjZTogYW55LCB6b29tPzogbnVtYmVyKTogW251bWJlciwgbnVtYmVyLCBudW1iZXJdIHtcbiAgem9vbSA9IHpvb20gfHwgNjtcbiAgaWYgKHNvdXJjZSA9PSBudWxsKSB7XG4gICAgcmV0dXJuIFs1MS41MDUsIC0wLjA5LCB6b29tXTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gW3NvdXJjZVswXSwgc291cmNlWzFdLCB6b29tXTtcbiAgfVxufVxuXG4vKipcbiAqIFJldHVybnMgYW4gYXJyYXkgY29udGFpbmluZyBhbGwgdGhlIHZhbHVlcyB0aGF0IHRoZSBzcGVjaWZpZWQgZmllbGQgdGFrZXMgaW4gdGhlIGZvcm1zLlxuICogVGhlIHZhbHVlcyBhcmUgY29udmVydGVkIHRvIHN0cmluZ3MuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBBTExfVkFMVUVTX09GKGZvcm1zOiBNYWluRm9ybVtdLCBmaWVsZDogc3RyaW5nLCBmaWx0ZXI6IEZ1bmN8c3RyaW5nID0gJ3RydWUnKTogc3RyaW5nW10ge1xuICBmb3JtcyA9IChmb3JtcyB8fCBbXSkuZmlsdGVyKGYgPT4gZiAhPSBudWxsKTtcbiAgaWYgKHR5cGVvZihmaWx0ZXIpID09PSAnc3RyaW5nJykge1xuICAgIGZpbHRlciA9IGNyZWF0ZUZ1bmN0aW9uKGZpbHRlcik7XG4gIH1cbiAgbGV0IHZhbHVlczogc3RyaW5nW10gPSBbXTtcbiAgZm9yIChjb25zdCBmb3JtIG9mIGZvcm1zKSB7XG4gICAgaWYgKGZvcm1bZmllbGRdICE9IG51bGwgJiYgZmlsdGVyKGZvcm0pKSB7XG4gICAgICB2YWx1ZXMucHVzaChTdHJpbmcoZm9ybVtmaWVsZF0pKTtcbiAgICB9XG4gICAgZm9yIChjb25zdCByZXAgb2YgYWxsUmVwcyhmb3JtKSkge1xuICAgICAgaWYgKHJlcFtmaWVsZF0gIT0gbnVsbCAmJiBmaWx0ZXIoey4uLmZvcm0sIC4uLnJlcH0pKSB7XG4gICAgICAgIHZhbHVlcy5wdXNoKFN0cmluZyhyZXBbZmllbGRdKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBbLi4ubmV3IFNldCh2YWx1ZXMpXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBsYWluQXJyYXkocGFyYW1zOiBhbnlbXSk6IGFueVtdIHtcbiAgY29uc3QgcmVzOiBhbnlbXSA9IFtdO1xuICBmb3IgKGNvbnN0IHBhcmFtIG9mIHBhcmFtcykge1xuICAgIGlmIChBcnJheS5pc0FycmF5KHBhcmFtKSkge1xuICAgICAgcmVzLnB1c2goLi4ucGFyYW0pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXMucHVzaChwYXJhbSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXM7XG59XG5cbi8qKlxuICogUmV0dXJucyB0aGUgbnVtYmVyIG9mIGZvcm1zIGZvciB3aGljaCBmaWx0ZXIgZXZhbHVhdGVzIHRvIHRydWUsXG4gKiBmb3IgdGhlIGZvcm0gaXRzZWxmIG9yIGZvciBhbnkgb2YgaXRzIHJlcGV0aXRpb25zLlxuICovXG5leHBvcnQgZnVuY3Rpb24gQ09VTlRfRk9STVMoZm9ybXM6IE1haW5Gb3JtW10sIGZpbHRlcjogRnVuY3xzdHJpbmcgPSAndHJ1ZScpOiBudW1iZXIge1xuICBmb3JtcyA9IChmb3JtcyB8fCBbXSkuZmlsdGVyKGYgPT4gZiAhPSBudWxsKTtcbiAgaWYgKGZpbHRlciA9PT0gJ3RydWUnKSB7XG4gICAgcmV0dXJuIGZvcm1zLmxlbmd0aDtcbiAgfVxuICBpZiAodHlwZW9mKGZpbHRlcikgPT09ICdzdHJpbmcnKSB7XG4gICAgZmlsdGVyID0gY3JlYXRlRnVuY3Rpb24oZmlsdGVyKTtcbiAgfVxuICBsZXQgY291bnQgPSAwO1xuICBmb3IgKGNvbnN0IGZvcm0gb2YgZm9ybXMpIHtcbiAgICBpZiAoZmlsdGVyKGZvcm0pKSB7XG4gICAgICBjb3VudCsrO1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGZvciAoY29uc3QgcmVwIG9mIGFsbFJlcHMoZm9ybSkpIHtcbiAgICAgIGlmIChmaWx0ZXIoey4uLmZvcm0sIC4uLnJlcH0pKSB7XG4gICAgICAgIGNvdW50Kys7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gY291bnQ7XG59XG5cbi8qKlxuICogQ291bnRzIHRoZSBmb3JtcyBhbmQgYWxsIG9mIHRoZWlyIHJlcGV0aXRpb25zIGZvciB3aGljaCBmaWx0ZXIgZXZhbHVhdGVzIHRvIHRydWUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBDT1VOVF9SRVBTKGZvcm1zOiBNYWluRm9ybVtdLCBmaWx0ZXI6IEZ1bmN8c3RyaW5nID0gJ3RydWUnKTogbnVtYmVyIHtcbiAgZm9ybXMgPSAoZm9ybXMgfHwgW10pLmZpbHRlcihmID0+IGYgIT0gbnVsbCk7XG4gIGlmICh0eXBlb2YoZmlsdGVyKSA9PT0gJ3N0cmluZycpIHtcbiAgICBmaWx0ZXIgPSBjcmVhdGVGdW5jdGlvbihmaWx0ZXIpO1xuICB9XG4gIGxldCBjb3VudCA9IDA7XG4gIGZvciAoY29uc3QgZm9ybSBvZiBmb3Jtcykge1xuICAgIGlmIChmaWx0ZXIoZm9ybSkpIHtcbiAgICAgIGNvdW50Kys7XG4gICAgfVxuICAgIGZvciAoY29uc3QgcmVwIG9mIGFsbFJlcHMoZm9ybSkpIHtcbiAgICAgIGlmIChmaWx0ZXIoey4uLmZvcm0sIC4uLnJlcH0pKSB7XG4gICAgICAgIGNvdW50Kys7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBjb3VudDtcbn1cblxuLyoqXG4gKiBEZXByZWNhdGVkLiBVc2UgTEVOKEFMTF9WQUxVRVNfT0YpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBDT1VOVF9GT1JNU19VTklRVUUoZm9ybXM6IE1haW5Gb3JtW10sIGZpZWxkOiBzdHJpbmcsIGZpbHRlcjogRnVuY3xzdHJpbmcgPSAndHJ1ZScpOiBudW1iZXIge1xuICByZXR1cm4gQUxMX1ZBTFVFU19PRihmb3JtcywgZmllbGQsIGZpbHRlcikubGVuZ3RoO1xufVxuXG5mdW5jdGlvbiBnZXROdW1lcmljVmFsdWVzKGZvcm1zOiAoTWFpbkZvcm0gfCBGb3JtKVtdLCBmaWVsZDogc3RyaW5nLCBmaWx0ZXI6IEZ1bmN8c3RyaW5nID0gJ3RydWUnKTogbnVtYmVyW10ge1xuICBmb3JtcyA9IChmb3JtcyB8fCBbXSkuZmlsdGVyKGYgPT4gZiAhPSBudWxsKTtcbiAgaWYgKHR5cGVvZihmaWx0ZXIpID09PSAnc3RyaW5nJykge1xuICAgIGZpbHRlciA9IGNyZWF0ZUZ1bmN0aW9uKGZpbHRlcik7XG4gIH1cbiAgbGV0IHZhbHVlczogbnVtYmVyW10gPSBbXTtcbiAgZm9yIChjb25zdCBmb3JtIG9mIGZvcm1zKSB7XG4gICAgY29uc3QgdmFsID0gZm9ybVtmaWVsZF07XG4gICAgaWYgKHZhbCAhPSBudWxsICYmICFpc05hTihOdW1iZXIodmFsKSkgJiYgZmlsdGVyKGZvcm0pKSB7XG4gICAgICB2YWx1ZXMucHVzaChOdW1iZXIodmFsKSk7XG4gICAgfVxuICAgIGZvciAoY29uc3QgcmVwIG9mIGFsbFJlcHMoZm9ybSkpIHtcbiAgICAgIGNvbnN0IHZhbCA9IHJlcFtmaWVsZF07XG4gICAgICBpZiAodmFsICE9IG51bGwgJiYgIWlzTmFOKE51bWJlcih2YWwpKSAmJiBmaWx0ZXIoey4uLmZvcm0sIC4uLnJlcH0pKSB7XG4gICAgICAgIHZhbHVlcy5wdXNoKE51bWJlcih2YWwpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHZhbHVlcztcbn1cblxuLyoqXG4gKiBBZ2dyZWdhdGVzIGFuZCBzdW1zIHRoZSB2YWx1ZXMgb2YgdGhlIHNwZWNpZmllZCBmaWVsZC5cbiAqIEFuIG9wdGlvbmFsIGV4cHJlc3Npb24gY2FuIGJlIGFkZGVkIHRvIGZpbHRlciB3aGljaCBmb3JtcyB0byB0YWtlIGZvciB0aGUgc3VtLlxuICovXG5leHBvcnQgZnVuY3Rpb24gU1VNKGZvcm1zOiAoTWFpbkZvcm0gfCBGb3JtKVtdLCBmaWVsZDogc3RyaW5nLCBmaWx0ZXI6IEZ1bmN8c3RyaW5nID0gJ3RydWUnKTogbnVtYmVyIHtcbiAgY29uc3QgdmFsdWVzID0gZ2V0TnVtZXJpY1ZhbHVlcyhmb3JtcywgZmllbGQsIGZpbHRlcik7XG4gIGxldCBzdW0gPSAwO1xuICBmb3IgKGNvbnN0IHZhbCBvZiB2YWx1ZXMpIHtcbiAgICBzdW0gKz0gdmFsO1xuICB9XG4gIHJldHVybiB0cnVuY2F0ZTEwKHN1bSk7XG59XG5cbi8qKlxuICogQ29tcHV0ZXMgdGhlIG1lYW4gb2YgdGhlIHZhbHVlcyBvZiB0aGUgc3BlY2lmaWVkIGZpZWxkLlxuICogQW4gb3B0aW9uYWwgZXhwcmVzc2lvbiBjYW4gYmUgYWRkZWQgdG8gZmlsdGVyIHdoaWNoIGZvcm1zIHRvIHRha2UgZm9yIHRoZSBzdW0uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBNRUFOKGZvcm1zOiAoRm9ybSB8IE1haW5Gb3JtKVtdLCBmaWVsZDogc3RyaW5nLCBmaWx0ZXI6IEZ1bmN8c3RyaW5nID0gJ3RydWUnKTogbnVtYmVyIHtcbiAgY29uc3QgdmFsdWVzID0gZ2V0TnVtZXJpY1ZhbHVlcyhmb3JtcywgZmllbGQsIGZpbHRlcik7XG4gIGxldCBzdW0gPSAwO1xuICBmb3IgKGNvbnN0IHZhbCBvZiB2YWx1ZXMpIHtcbiAgICBzdW0gKz0gdmFsO1xuICB9XG4gIHJldHVybiB0cnVuY2F0ZTEwKHN1bSAvIHZhbHVlcy5sZW5ndGgpO1xufVxuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlICUgYmV0d2VlbiB0d28gbWVtYmVycy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIFBFUkNFTlQodmFsdWUxOiBudW1iZXIsIHZhbHVlMjogbnVtYmVyKTogc3RyaW5nIHtcbiAgY29uc3QgcmVzID0gKCt2YWx1ZTEgKiAxMDApIC8gK3ZhbHVlMjtcbiAgcmV0dXJuIE51bWJlci5pc0Zpbml0ZShyZXMpID8gTWF0aC5yb3VuZChyZXMpKyclJyA6ICdpbmZpbml0ZSc7XG59XG5cbi8qKlxuICogRXZhbHVhdGVzIHRoZSBleHByZXNzaW9uIGluIHRoZSBmaXJzdCBmb3JtIGJ5IGRhdGUuXG4gKi9cbiBleHBvcnQgZnVuY3Rpb24gRklSU1QoZm9ybXM6IChGb3JtIHwgTWFpbkZvcm0pW10sIGV4cHJlc3Npb246IEZ1bmN8c3RyaW5nLCBkYXRlID0gJ2NyZWF0ZWRfYXQnKTogYW55IHtcbiAgaWYgKHR5cGVvZihleHByZXNzaW9uKSA9PT0gJ3N0cmluZycpIHtcbiAgICBleHByZXNzaW9uID0gY3JlYXRlRnVuY3Rpb24oZXhwcmVzc2lvbik7XG4gIH1cbiAgZm9ybXMgPSAoZm9ybXMgfHwgW10pLmZpbHRlcihmID0+IGYgIT0gbnVsbCAmJiBmW2RhdGVdICE9IG51bGwpO1xuICBpZiAoZm9ybXMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuICBsZXQgZm9ybSA9IGZvcm1zWzBdO1xuICBsZXQgbWluRGF0ZSA9IGZvcm1bZGF0ZV0gYXMgc3RyaW5nO1xuICBmb3IgKGxldCBpID0gMTsgaSA8IGZvcm1zLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGZvcm1zW2ldW2RhdGVdIGFzIHN0cmluZyA8IG1pbkRhdGUpIHtcbiAgICAgIGZvcm0gPSBmb3Jtc1tpXTtcbiAgICAgIG1pbkRhdGUgPSBmb3JtW2RhdGVdIGFzIHN0cmluZztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGV4cHJlc3Npb24oZm9ybSk7XG59XG5cbi8qKlxuICogRXZhbHVhdGVzIHRoZSBleHByZXNzaW9uIGluIHRoZSBsYXN0IGZvcm0gYnkgZGF0ZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIExBU1QoZm9ybXM6IChGb3JtIHwgTWFpbkZvcm0pW10sIGV4cHJlc3Npb246IEZ1bmN8c3RyaW5nLCBkYXRlID0gJ2NyZWF0ZWRfYXQnKTogYW55IHtcbiAgaWYgKHR5cGVvZihleHByZXNzaW9uKSA9PT0gJ3N0cmluZycpIHtcbiAgICBleHByZXNzaW9uID0gY3JlYXRlRnVuY3Rpb24oZXhwcmVzc2lvbik7XG4gIH1cbiAgZm9ybXMgPSAoZm9ybXMgfHwgW10pLmZpbHRlcihmID0+IGYgIT0gbnVsbCAmJiBmW2RhdGVdICE9IG51bGwpO1xuICBpZiAoZm9ybXMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuICBsZXQgZm9ybSA9IGZvcm1zW2Zvcm1zLmxlbmd0aCAtIDFdO1xuICBsZXQgbWF4RGF0ZSA9IGZvcm1bZGF0ZV0gYXMgc3RyaW5nO1xuICBmb3IgKGxldCBpID0gZm9ybXMubGVuZ3RoIC0gMjsgaSA+PSAwOyBpLS0pIHtcbiAgICBpZiAoZm9ybXNbaV1bZGF0ZV0gYXMgc3RyaW5nID4gbWF4RGF0ZSkge1xuICAgICAgZm9ybSA9IGZvcm1zW2ldO1xuICAgICAgbWF4RGF0ZSA9IGZvcm1bZGF0ZV0gYXMgc3RyaW5nO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZXhwcmVzc2lvbihmb3JtKTtcbn1cblxuLyoqXG4gKiBDb21wdXRlcyB0aGUgbWF4IHZhbHVlIG9mIHRoZSBmaWVsZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIE1BWChmb3JtczogKEZvcm0gfCBNYWluRm9ybSlbXSwgZmllbGQ6IHN0cmluZywgZmlsdGVyOiBGdW5jfHN0cmluZyA9ICd0cnVlJyk6IG51bWJlciB7XG4gIGNvbnN0IHZhbHVlcyA9IGdldE51bWVyaWNWYWx1ZXMoZm9ybXMsIGZpZWxkLCBmaWx0ZXIpO1xuICBsZXQgbWF4ID0gLUluZmluaXR5O1xuICBmb3IgKGNvbnN0IHZhbCBvZiB2YWx1ZXMpIHtcbiAgICBpZiAodmFsID4gbWF4KSB7XG4gICAgICBtYXggPSB2YWw7XG4gICAgfVxuICB9XG4gIHJldHVybiBtYXg7XG59XG5cbi8qKlxuICogQ29tcHV0ZXMgdGhlIG1lZGlhbiB2YWx1ZSBvZiB0aGUgZmllbGQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBNRURJQU4oZm9ybXM6IChGb3JtIHwgTWFpbkZvcm0pW10sIGZpZWxkOiBzdHJpbmcsIGZpbHRlcjogRnVuY3xzdHJpbmcgPSAndHJ1ZScpOiBudW1iZXIge1xuICBjb25zdCB2YWx1ZXMgPSBnZXROdW1lcmljVmFsdWVzKGZvcm1zLCBmaWVsZCwgZmlsdGVyKS5zb3J0KCk7XG4gIGlmICh2YWx1ZXMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIE5hTjtcbiAgfVxuICByZXR1cm4gdmFsdWVzW01hdGguZmxvb3IodmFsdWVzLmxlbmd0aCAvIDIpXTtcbn1cblxuLyoqXG4gKiBDb21wdXRlcyB0aGUgbW9kZSB2YWx1ZSBvZiB0aGUgZmllbGQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBNT0RFKGZvcm1zOiAoRm9ybSB8IE1haW5Gb3JtKVtdLCBmaWVsZDogc3RyaW5nLCBmaWx0ZXI6IEZ1bmN8c3RyaW5nID0gJ3RydWUnKTogbnVtYmVyIHtcbiAgY29uc3QgdmFsdWVzID0gZ2V0TnVtZXJpY1ZhbHVlcyhmb3JtcywgZmllbGQsIGZpbHRlcik7XG4gIGNvbnN0IGNvdW50ZXJzOiB7W3ZhbDogbnVtYmVyXTogbnVtYmVyfSA9IHt9O1xuICBmb3IgKGNvbnN0IHZhbCBvZiB2YWx1ZXMpIHtcbiAgICBpZiAoY291bnRlcnNbdmFsXSA9PSBudWxsKSB7XG4gICAgICBjb3VudGVyc1t2YWxdID0gMTtcbiAgICB9IGVsc2Uge1xuICAgICAgY291bnRlcnNbdmFsXSsrO1xuICAgIH1cbiAgfVxuICBsZXQgbWF4Q291bnQgPSAwO1xuICBmb3IgKGNvbnN0IHZhbCBpbiBjb3VudGVycykge1xuICAgIGlmIChjb3VudGVyc1t2YWxdID4gbWF4Q291bnQpIHtcbiAgICAgIG1heENvdW50ID0gY291bnRlcnNbdmFsXTtcbiAgICB9XG4gIH1cbiAgZm9yIChjb25zdCB2YWwgaW4gY291bnRlcnMpIHtcbiAgICBpZiAoY291bnRlcnNbdmFsXSA9PT0gbWF4Q291bnQpIHtcbiAgICAgIHJldHVybiBOdW1iZXIodmFsKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIE5hTjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkRGF0YXNldChcbiAgZGF0YXNldDogKHN0cmluZyB8IG51bWJlciB8IHN0cmluZ1tdIHwgbnVtYmVyW10pW10sXG4gIGNvbHNwYW5zOiBudW1iZXJbXSxcbik6IEFqZlRhYmxlQ2VsbFtdW10ge1xuICByZXR1cm4gYnVpbGRBbGlnbmVkRGF0YXNldChkYXRhc2V0LCBjb2xzcGFucywgW10pO1xufVxuXG4vKipcbiAqIEJ1aWxkIGEgZGF0YXNldCBmb3IgYWpmIGR5bmFtaWMgdGFibGVcbiAqIEBwYXJhbSBkYXRhc2V0IHRoZSBkYXRhc2V0IGZvciB0aGUgdGFibGVcbiAqIEBwYXJhbSBjb2xzcGFucyBjb2xzcGFuIGZvciBlYWNoIHZhbHVlIGluIHRoZSBkYXRhc2V0XG4gKiBAcGFyYW0gdGV4dEFsaWduIGFsaWdubWVudCBmb3IgZWFjaCB2YWx1ZSBpbiB0aGUgZGF0YXNldFxuICogQHJldHVybnMgQW4gQWpmVGFibGVDZWxsIGxpc3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkQWxpZ25lZERhdGFzZXQoXG4gIGRhdGFzZXQ6IChzdHJpbmcgfCBudW1iZXIgfCBzdHJpbmdbXSB8IG51bWJlcltdKVtdLFxuICBjb2xzcGFuczogbnVtYmVyW10sXG4gIHRleHRBbGlnbjogc3RyaW5nW10sXG4pOiBBamZUYWJsZUNlbGxbXVtdIHtcbiAgY29uc3QgcmVzOiBBamZUYWJsZUNlbGxbXVtdID0gW107XG4gIGNvbnN0IG5vcm1hbGl6ZURhdGFzZXQ6IGFueVtdW10gPSBbXTtcbiAgZGF0YXNldC5mb3JFYWNoKChyb3c6IGFueSwgaW5kZXhSb3c6IG51bWJlcikgPT4ge1xuICAgIHJvdyA9IEFycmF5LmlzQXJyYXkocm93KSA/IHJvdyA6IFtyb3ddO1xuICAgIG5vcm1hbGl6ZURhdGFzZXRbaW5kZXhSb3cgJSBjb2xzcGFucy5sZW5ndGhdID1cbiAgICAgIG5vcm1hbGl6ZURhdGFzZXRbaW5kZXhSb3cgJSBjb2xzcGFucy5sZW5ndGhdICE9IG51bGxcbiAgICAgICAgPyBbLi4ubm9ybWFsaXplRGF0YXNldFtpbmRleFJvdyAlIGNvbHNwYW5zLmxlbmd0aF0sIC4uLnJvd11cbiAgICAgICAgOiBbLi4ucm93XTtcbiAgfSk7XG4gIGNvbnN0IHRyYW5zcG9zZSA9IG5vcm1hbGl6ZURhdGFzZXRbMF0ubWFwKChfOiBhbnksIGNvbEluZGV4OiBudW1iZXIpID0+XG4gICAgbm9ybWFsaXplRGF0YXNldC5tYXAoKHJvdzogYW55KSA9PiByb3dbY29sSW5kZXhdKSxcbiAgKTtcbiAgdHJhbnNwb3NlLmZvckVhY2goKGRhdGE6IGFueVtdLCBpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgY29uc3Qgcm93OiBBamZUYWJsZUNlbGxbXSA9IFtdO1xuICAgIGRhdGEuZm9yRWFjaCgoY2VsbFZhbHVlOiBzdHJpbmcgfCBudW1iZXIsIGNlbGxJbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICByb3cucHVzaCh7XG4gICAgICAgIHZhbHVlOiBjZWxsVmFsdWUsXG4gICAgICAgIGNvbHNwYW46IGNvbHNwYW5zW2NlbGxJbmRleF0sXG4gICAgICAgIHJvd3NwYW46IDEsXG4gICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgdGV4dEFsaWduOiB0ZXh0QWxpZ25bY2VsbEluZGV4XSA/IHRleHRBbGlnbltjZWxsSW5kZXhdIDogJ2NlbnRlcicsXG4gICAgICAgICAgY29sb3I6ICdibGFjaycsXG4gICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBpbmRleCAlIDIgPT09IDAgPyAnd2hpdGUnIDogJyNkZGQnLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgcmVzLnB1c2gocm93KTtcbiAgfSk7XG4gIHJldHVybiByZXM7XG59XG5cbi8qKlxuICogQnVpbGQgYSBkYXRhc2V0IGJhc2VkIG9uIGEgbGlzdCBvZiBGb3JtcywgZm9yIGFqZiBkeW5hbWljIHRhYmxlXG4gKiBAcGFyYW0gZGF0YXNldCB0aGUgZGF0YXNldCBmb3IgdGhlIHRhYmxlXG4gKiBAcGFyYW0gZmllbGRzIHRoZSBsaXN0IG9mIGZpZWxkcyBuYW1lIGZvciBlYWNoIHJvd1xuICogQHBhcmFtIHJvd0xpbmsgdGhlIGh0dHAgbGluayBmb3IgdGhlIHJvdywgd2l0aCB0aGUgZm9ybSBmaWVsZCBuYW1lIHdpdGggdGhlIGxpbmsgdmFsdWUgYW5kIHRoZSBjb2x1bW4gcG9zaXRpb24gZm9yIHRoZSBsaW5rLlxuICogaWU6IHsnbGluayc6ICdob21lX2xpbmsnLCAncG9zaXRpb24nOiAwfVxuICogQHBhcmFtIGJhY2tncm91bmRDb2xvckEgdGhlIGZpcnN0IGJhY2tncm91ZCBjb2xvclxuICogQHBhcmFtIGJhY2tncm91bmRDb2xvckIgdGhlIHNlY29uZCBiYWNrZ3JvdWQgY29sb3JcbiAqIEByZXR1cm5zIEFuIEFqZlRhYmxlQ2VsbCBsaXN0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBidWlsZEZvcm1EYXRhc2V0KFxuICBkYXRhc2V0OiBNYWluRm9ybVtdLFxuICBmaWVsZHM6IHN0cmluZ1tdLFxuICByb3dMaW5rOiB7bGluazogc3RyaW5nOyBwb3NpdGlvbjogbnVtYmVyfSB8IG51bGwsXG4gIF9iYWNrZ3JvdW5kQ29sb3JBPzogc3RyaW5nLFxuICBfYmFja2dyb3VuZENvbG9yQj86IHN0cmluZyxcbik6IEFqZlRhYmxlQ2VsbFtdW10ge1xuICByZXR1cm4gYnVpbGRBbGlnbmVkRm9ybURhdGFzZXQoZGF0YXNldCwgZmllbGRzLCBbXSwgW10sIHJvd0xpbmssIFtdLCBbXSk7XG59XG5cbi8qKlxuICogQnVpbGQgYSBkYXRhc2V0IGJhc2VkIG9uIGEgbGlzdCBvZiBGb3JtcywgZm9yIGFqZiBkeW5hbWljIHRhYmxlXG4gKiBAcGFyYW0gZGF0YXNldCB0aGUgZGF0YXNldCBmb3IgdGhlIHRhYmxlXG4gKiBAcGFyYW0gZmllbGRzIHRoZSBsaXN0IG9mIGZpZWxkcyBuYW1lIGZvciBlYWNoIHJvd1xuICogQHBhcmFtIGNvbHNwYW5zIGNvbHNwYW4gZm9yIGVhY2ggdmFsdWUgaW4gdGhlIGRhdGFzZXRcbiAqIEBwYXJhbSB0ZXh0QWxpZ24gYWxpZ25tZW50IGZvciBlYWNoIHZhbHVlIGluIHRoZSBkYXRhc2V0XG4gKiBAcGFyYW0gcm93TGluayB0aGUgaHR0cCBsaW5rIGZvciB0aGUgcm93LCB3aXRoIHRoZSBmb3JtIGZpZWxkIG5hbWUgd2l0aCB0aGUgbGluayB2YWx1ZSBhbmQgdGhlIGNvbHVtbiBwb3NpdGlvbiBmb3IgdGhlIGxpbmsuXG4gKiBpZTogeydsaW5rJzogJ2hvbWVfbGluaycsICdwb3NpdGlvbic6IDB9XG4gKiBAcmV0dXJucyBBbiBBamZUYWJsZUNlbGwgbGlzdFxuICovXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRBbGlnbmVkRm9ybURhdGFzZXQoXG4gIGRhdGFzZXQ6IE1haW5Gb3JtW10sXG4gIGZpZWxkczogc3RyaW5nW10sXG4gIGNvbHNwYW5zOiBudW1iZXJbXSxcbiAgdGV4dEFsaWduOiBzdHJpbmdbXSxcbiAgcm93TGluazoge2xpbms6IHN0cmluZzsgcG9zaXRpb246IG51bWJlcn0gfCBudWxsLFxuICBkaWFsb2dGaWVsZHM6IHN0cmluZ1tdLFxuICBkaWFsb2dMYWJlbEZpZWxkczogc3RyaW5nW10sXG4pOiBBamZUYWJsZUNlbGxbXVtdIHtcbiAgY29uc3QgcmVzOiBBamZUYWJsZUNlbGxbXVtdID0gW107XG5cbiAgY29uc3QgYmFja2dyb3VuZENvbG9yQSA9ICd3aGl0ZSc7XG4gIGNvbnN0IGJhY2tncm91bmRDb2xvckIgPSAnI2RkZCc7XG4gIGlmIChkYXRhc2V0KSB7XG4gICAgbGV0IGluZGV4OiBudW1iZXIgPSAwO1xuICAgIGRhdGFzZXQuZm9yRWFjaCgoZGF0YTogTWFpbkZvcm0pID0+IHtcbiAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgIGluZGV4Kys7XG4gICAgICAgIGNvbnN0IHJvdzogQWpmVGFibGVDZWxsW10gPSBbXTtcbiAgICAgICAgZmllbGRzLmZvckVhY2goKGZpZWxkOiBzdHJpbmcsIGNlbGxJZHg6IG51bWJlcikgPT4ge1xuICAgICAgICAgIGxldCBjZWxsVmFsdWUgPSBkYXRhW2ZpZWxkXSB8fCAnJztcbiAgICAgICAgICBpZiAocm93TGluayAhPSBudWxsICYmIGNlbGxJZHggPT09IHJvd0xpbmtbJ3Bvc2l0aW9uJ10pIHtcbiAgICAgICAgICAgIGNlbGxWYWx1ZSA9IGA8YSBocmVmPScke2RhdGFbcm93TGlua1snbGluayddXX0nPiAke2RhdGFbZmllbGRdfTwvYT5gO1xuICAgICAgICAgIH1cbiAgICAgICAgICByb3cucHVzaCh7XG4gICAgICAgICAgICB2YWx1ZTogY2VsbFZhbHVlLFxuICAgICAgICAgICAgY29sc3BhbjogY29sc3BhbnNbY2VsbElkeF0gJiYgY29sc3BhbnNbY2VsbElkeF0gPiAwID8gY29sc3BhbnNbY2VsbElkeF0gOiAxLFxuICAgICAgICAgICAgcm93c3BhbjogMSxcbiAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgIHRleHRBbGlnbjogdGV4dEFsaWduW2NlbGxJZHhdID8gdGV4dEFsaWduW2NlbGxJZHhdIDogJ2NlbnRlcicsXG4gICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snLFxuICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IGluZGV4ICUgMiA9PT0gMCA/IGJhY2tncm91bmRDb2xvckEgOiBiYWNrZ3JvdW5kQ29sb3JCLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGRpYWxvZ0ZpZWxkcyAmJiBkaWFsb2dGaWVsZHMubGVuZ3RoKSB7XG4gICAgICAgICAgbGV0IGRpYWxvZ0h0bWw6IHN0cmluZ1tdID0gW107XG4gICAgICAgICAgZGlhbG9nRmllbGRzLmZvckVhY2goKGZpZWxkOiBzdHJpbmcsIGNlbGxJZHg6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgbGV0IGZpZWxkVmFsdWUgPSAnXCJcIic7XG4gICAgICAgICAgICBpZiAoZGF0YVtmaWVsZF0gIT0gbnVsbCkge1xuICAgICAgICAgICAgICBmaWVsZFZhbHVlID1cbiAgICAgICAgICAgICAgICBcIjxwIGNsYXNzPSdkaWFsb2ctaXRlbSc+PGI+XCIgK1xuICAgICAgICAgICAgICAgIGRpYWxvZ0xhYmVsRmllbGRzW2NlbGxJZHhdLnJlcGxhY2UoL1snXFxcIl0rL2csICcnKSArXG4gICAgICAgICAgICAgICAgJzwvYj4gPHNwYW4+JyArXG4gICAgICAgICAgICAgICAgZGF0YVtmaWVsZF0gK1xuICAgICAgICAgICAgICAgICc8L3NwYW4+PC9wPic7XG4gICAgICAgICAgICAgIGRpYWxvZ0h0bWwucHVzaChmaWVsZFZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHJvdy5wdXNoKHtcbiAgICAgICAgICAgIHZhbHVlOlxuICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cInJlYWRfbW9yZV9jZWxsXCI+PHAgY2xhc3M9XCJyZWFkX21vcmVfdGV4dFwiPlJlYWQgbW9yZTwvcD48YiBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCI+YWRkX2NpcmNsZV9vdXRsaW5lPC9iPjwvZGl2PicsXG4gICAgICAgICAgICBkaWFsb2dIdG1sOiBkaWFsb2dIdG1sLmpvaW4oJyAnKSxcbiAgICAgICAgICAgIGNvbHNwYW46IDEsXG4gICAgICAgICAgICByb3dzcGFuOiAxLFxuICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgY29sb3I6ICdibGFjaycsXG4gICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogaW5kZXggJSAyID09PSAwID8gYmFja2dyb3VuZENvbG9yQSA6IGJhY2tncm91bmRDb2xvckIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJlcy5wdXNoKHJvdyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cblxuLyoqXG4gKiBjcmVhdGUgYSB3aWRnZXQgZGF0YXNldCBpbnRvIGEgY29udGVudCBsaXN0LCBiYXNlZCBvbiBhIGxpc3Qgb2YgRm9ybXMsIGZvciBwYWdpbmF0ZWQgd2lkZ2V0XG4gKlxuICogQHBhcmFtIGRhdGFzZXQgdGhlIGRhdGFzZXQgZm9yIHRoZSB3aWRnZXRzXG4gKiBAcGFyYW0gZmllbGRzIHRoZSBsaXN0IG9mIGZpZWxkcyBuYW1lIGZvciBlYWNoIHJvd1xuICogQHBhcmFtIHJvd0xpbmsgdGhlIGh0dHAgbGluayBmb3IgdGhlIHJvdywgd2l0aCB0aGUgZm9ybSBmaWVsZCBuYW1lIHdpdGggdGhlIGxpbmsgdmFsdWUgYW5kIHRoZSBjb2x1bW4gcG9zaXRpb24gZm9yIHRoZSBsaW5rLlxuICogaWU6IHsnbGluayc6ICdob21lX2xpbmsnLCAncG9zaXRpb24nOiAwfVxuICogQHBhcmFtIGNlbGxTdHlsZXMgY3NzIHN0eWxlcyBmb3IgY2VsbHNcbiAqIEBwYXJhbSByb3dTdHlsZSBjc3Mgc3R5bGVzIGZvciByb3dzXG4gKiBAcGFyYW0gcGVyY1dpZHRoIGFuIGFycmF5IHdpdGggdGhlIHNhbWUgbGVuZ3RoIG9mIGZpZWxkcyBwYXJhbSwgd2l0aCB0aGUgd2lkdGggZm9yIHRoZSBjb2x1bW5zLlxuICogaWU6IFsnMTAlJywgJzMwJScsICcxMCUnLCAnMjUlJywgJzE1JScsICcxMCUnXVxuICogQHBhcmFtIGJhY2tncm91bmRDb2xvckEgdGhlIGZpcnN0IGJhY2tncm91ZCBjb2xvclxuICogQHBhcmFtIGJhY2tncm91bmRDb2xvckIgdGhlIHNlY29uZCBiYWNrZ3JvdWQgY29sb3JcbiAqIEByZXR1cm5zIEFuIEFqZlRhYmxlV2lkZ2V0IGxpc3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkV2lkZ2V0RGF0YXNldChcbiAgZGF0YXNldDogTWFpbkZvcm1bXSxcbiAgZmllbGRzOiBzdHJpbmdbXSxcbiAgcm93TGluazoge2xpbms6IHN0cmluZzsgcG9zaXRpb246IG51bWJlcn0gfCBudWxsLFxuICBjZWxsU3R5bGVzOiB7W2tleTogc3RyaW5nXTogYW55fSB8IG51bGwsXG4gIHJvd1N0eWxlOiB7W2tleTogc3RyaW5nXTogYW55fSB8IG51bGwsXG4gIHBlcmNXaWR0aDogc3RyaW5nW10sXG4gIGJhY2tncm91bmRDb2xvckE/OiBzdHJpbmcsXG4gIGJhY2tncm91bmRDb2xvckI/OiBzdHJpbmcsXG4pOiBhbnlbXSB7XG4gIGNvbnN0IHJlczoge1trZXk6IHN0cmluZ106IGFueX1bXSA9IFtdO1xuICBpZiAoYmFja2dyb3VuZENvbG9yQSA9PSBudWxsKSB7XG4gICAgYmFja2dyb3VuZENvbG9yQSA9ICd3aGl0ZSc7XG4gIH1cbiAgaWYgKGJhY2tncm91bmRDb2xvckIgPT0gbnVsbCkge1xuICAgIGJhY2tncm91bmRDb2xvckIgPSAnI2RkZCc7XG4gIH1cbiAgaWYgKHJvd1N0eWxlID09IG51bGwpIHtcbiAgICByb3dTdHlsZSA9IHtcbiAgICAgICd0ZXh0LWFsaWduJzogJ3JpZ2h0JyxcbiAgICAgICdtYXJnaW4tYm90dG9tJzogMCxcbiAgICAgICdib3JkZXItY29sbGFwc2UnOiAnY29sbGFwc2UnLFxuICAgIH07XG4gIH1cbiAgaWYgKGNlbGxTdHlsZXMgPT0gbnVsbCkge1xuICAgIGNlbGxTdHlsZXMgPSB7XG4gICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxuICAgICAgY29sb3I6ICdibGFjaycsXG4gICAgfTtcbiAgfVxuICBpZiAocGVyY1dpZHRoID09IG51bGwgfHwgcGVyY1dpZHRoLmxlbmd0aCAhPT0gZmllbGRzLmxlbmd0aCkge1xuICAgIGNvbnN0IGNlbGxXaWR0aCA9IDEwMCAvIGZpZWxkcy5sZW5ndGggKyAnJSc7XG4gICAgcGVyY1dpZHRoID0gW107XG4gICAgZmllbGRzLmZvckVhY2goXyA9PiBwZXJjV2lkdGgucHVzaChjZWxsV2lkdGgpKTtcbiAgfVxuXG4gIGlmIChkYXRhc2V0KSB7XG4gICAgbGV0IGluZGV4OiBudW1iZXIgPSAwO1xuICAgIGRhdGFzZXQuZm9yRWFjaCgoZGF0YTogTWFpbkZvcm0pID0+IHtcbiAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgIGluZGV4Kys7XG4gICAgICAgIC8vIFJvdyBpcyBhbiBBamZUYWJsZVdpZGdldFxuICAgICAgICBjb25zdCByb3c6IHtba2V5OiBzdHJpbmddOiBhbnl9ID0ge1xuICAgICAgICAgIHN0eWxlczoge1xuICAgICAgICAgICAgJ3RleHQtYWxpZ24nOiAncmlnaHQnLFxuICAgICAgICAgICAgJ21hcmdpbi1ib3R0b20nOiAwLFxuICAgICAgICAgICAgJ2JvcmRlci1jb2xsYXBzZSc6ICdjb2xsYXBzZScsXG4gICAgICAgICAgICAuLi5yb3dTdHlsZSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHZpc2liaWxpdHk6IHtjb25kaXRpb246ICd0cnVlJ30sXG4gICAgICAgICAgd2lkZ2V0VHlwZTogNSxcbiAgICAgICAgICBkYXRhc2V0OiBbW11dIGFzIGFueVtdW10sXG4gICAgICAgICAgY2VsbFN0eWxlczogeydib3JkZXItdG9wJzogJzFweCBzb2xpZCBncmV5J30sXG4gICAgICAgIH07XG5cbiAgICAgICAgZmllbGRzLmZvckVhY2goKGZpZWxkOiBzdHJpbmcsIGNlbGxJZHg6IG51bWJlcikgPT4ge1xuICAgICAgICAgIGxldCBmb3JtdWxhQ2VsbCA9ICdcIlwiJztcbiAgICAgICAgICBpZiAoZGF0YVtmaWVsZF0gIT0gbnVsbCkge1xuICAgICAgICAgICAgZm9ybXVsYUNlbGwgPSAnXCInICsgZGF0YVtmaWVsZF0gKyAnXCInO1xuICAgICAgICAgICAgaWYgKHJvd0xpbmsgIT0gbnVsbCAmJiBjZWxsSWR4ID09PSByb3dMaW5rWydwb3NpdGlvbiddKSB7XG4gICAgICAgICAgICAgIGZvcm11bGFDZWxsID0gYFwiPGEgaHJlZj0nJHtkYXRhW3Jvd0xpbmtbJ2xpbmsnXV19Jz4gJHtkYXRhW2ZpZWxkXX08L2E+XCJgO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHJvd1snZGF0YXNldCddWzBdLnB1c2goe1xuICAgICAgICAgICAgbGFiZWw6ICcnLFxuICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgY29sb3I6ICdibGFjaycsXG4gICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogaW5kZXggJSAyID09PSAwID8gYmFja2dyb3VuZENvbG9yQSA6IGJhY2tncm91bmRDb2xvckIsXG4gICAgICAgICAgICAgIC4uLmNlbGxTdHlsZXMsXG4gICAgICAgICAgICAgIHdpZHRoOiBwZXJjV2lkdGhbY2VsbElkeF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZm9ybXVsYToge1xuICAgICAgICAgICAgICBmb3JtdWxhOiBmb3JtdWxhQ2VsbCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb2xzcGFuOiAxLFxuICAgICAgICAgICAgcm93c3BhbjogMSxcbiAgICAgICAgICAgIGFnZ3JlZ2F0aW9uOiB7XG4gICAgICAgICAgICAgIGFnZ3JlZ2F0aW9uOiAwLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJlcy5wdXNoKHJvdyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cblxuLyoqXG4gKiBjcmVhdGUgYSB3aWRnZXQgZGF0YXNldCBpbnRvIGEgY29udGVudCBsaXN0LCBiYXNlZCBvbiBhIGxpc3Qgb2YgRm9ybXMsIGZvciBwYWdpbmF0ZWQgd2lkZ2V0LlxuICogRWFjaCByb3cgaXMgYSBBamZEaWFsb2dXaWRnZXQgYW5kLCBvbiBjbGljaywgb3BlbiBhIGRpYWxvZy5cbiAqXG4gKiBAcGFyYW0gZGF0YXNldCB0aGUgZGF0YXNldCBmb3IgdGhlIHdpZGdldHNcbiAqIEBwYXJhbSBmaWVsZHMgdGhlIGxpc3Qgb2YgZmllbGRzIG5hbWUgZm9yIGVhY2ggcm93XG4gKiBAcGFyYW0gZGlhbG9nRmllbGRzIHRoZSBsaXN0IG9mIGZpZWxkcyBuYW1lIHRvIHNob3cgaW4gdGhlIGRpYWxvZ1xuICogQHBhcmFtIGRpYWxvZ0xhYmVsRmllbGRzIHRoZSBsaXN0IG9mIGxhYmVscyBmb3IgZWFjaCBkaWFsb2dGaWVsZHNcbiAqIEBwYXJhbSByb3dMaW5rIHRoZSBodHRwIGxpbmsgZm9yIHRoZSByb3csIHdpdGggdGhlIGZvcm0gZmllbGQgbmFtZSB3aXRoIHRoZSBsaW5rIHZhbHVlIGFuZCB0aGUgY29sdW1uIHBvc2l0aW9uIGZvciB0aGUgbGluay5cbiAqIGllOiB7J2xpbmsnOiAnaG9tZV9saW5rJywgJ3Bvc2l0aW9uJzogMH1cbiAqIEBwYXJhbSBjZWxsU3R5bGVzIGNzcyBzdHlsZXMgZm9yIGNlbGxzXG4gKiBAcGFyYW0gcm93U3R5bGUgY3NzIHN0eWxlcyBmb3Igcm93c1xuICogQHBhcmFtIHBlcmNXaWR0aCBhbiBhcnJheSB3aXRoIHRoZSBzYW1lIGxlbmd0aCBvZiBmaWVsZHMgcGFyYW0sIHdpdGggdGhlIHdpZHRoIGZvciB0aGUgY29sdW1ucy5cbiAqIGllOiBbJzEwJScsICczMCUnLCAnMTAlJywgJzI1JScsICcxNSUnLCAnMTAlJ11cbiAqIEBwYXJhbSBiYWNrZ3JvdW5kQ29sb3JBIHRoZSBmaXJzdCBiYWNrZ3JvdWQgY29sb3JcbiAqIEBwYXJhbSBiYWNrZ3JvdW5kQ29sb3JCIHRoZSBzZWNvbmQgYmFja2dyb3VkIGNvbG9yXG4gKiBAcmV0dXJucyBBbiBBamZEaWFsb2dXaWRnZXQgbGlzdFxuICovXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRXaWRnZXREYXRhc2V0V2l0aERpYWxvZyhcbiAgZGF0YXNldDogTWFpbkZvcm1bXSxcbiAgZmllbGRzOiBzdHJpbmdbXSxcbiAgZGlhbG9nRmllbGRzOiBzdHJpbmdbXSxcbiAgZGlhbG9nTGFiZWxGaWVsZHM6IHN0cmluZ1tdLFxuICBjZWxsU3R5bGVzOiB7W2tleTogc3RyaW5nXTogYW55fSB8IG51bGwsXG4gIHJvd1N0eWxlOiB7W2tleTogc3RyaW5nXTogYW55fSB8IG51bGwsXG4gIHBlcmNXaWR0aDogc3RyaW5nW10sXG4gIGJhY2tncm91bmRDb2xvckE/OiBzdHJpbmcsXG4gIGJhY2tncm91bmRDb2xvckI/OiBzdHJpbmcsXG4pOiBhbnlbXSB7XG4gIGNvbnN0IHJlczoge1trZXk6IHN0cmluZ106IGFueX1bXSA9IFtdO1xuICBpZiAoYmFja2dyb3VuZENvbG9yQSA9PSBudWxsKSB7XG4gICAgYmFja2dyb3VuZENvbG9yQSA9ICd3aGl0ZSc7XG4gIH1cbiAgaWYgKGJhY2tncm91bmRDb2xvckIgPT0gbnVsbCkge1xuICAgIGJhY2tncm91bmRDb2xvckIgPSAnI2RkZCc7XG4gIH1cbiAgaWYgKHJvd1N0eWxlID09IG51bGwpIHtcbiAgICByb3dTdHlsZSA9IHtcbiAgICAgICd0ZXh0LWFsaWduJzogJ3JpZ2h0JyxcbiAgICAgICdtYXJnaW4tYm90dG9tJzogMCxcbiAgICAgICdib3JkZXItY29sbGFwc2UnOiAnY29sbGFwc2UnLFxuICAgIH07XG4gIH1cbiAgaWYgKGNlbGxTdHlsZXMgPT0gbnVsbCkge1xuICAgIGNlbGxTdHlsZXMgPSB7XG4gICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxuICAgICAgY29sb3I6ICdibGFjaycsXG4gICAgfTtcbiAgfVxuICBpZiAocGVyY1dpZHRoID09IG51bGwgfHwgcGVyY1dpZHRoLmxlbmd0aCAhPT0gZmllbGRzLmxlbmd0aCkge1xuICAgIGNvbnN0IGNlbGxXaWR0aCA9IDEwMCAvIGZpZWxkcy5sZW5ndGggKyAnJSc7XG4gICAgcGVyY1dpZHRoID0gW107XG4gICAgZmllbGRzLmZvckVhY2goXyA9PiBwZXJjV2lkdGgucHVzaChjZWxsV2lkdGgpKTtcbiAgfVxuXG4gIGlmIChkYXRhc2V0KSB7XG4gICAgbGV0IGluZGV4OiBudW1iZXIgPSAwO1xuICAgIGRhdGFzZXQuZm9yRWFjaCgoZGF0YTogTWFpbkZvcm0pID0+IHtcbiAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgIGluZGV4Kys7XG4gICAgICAgIC8vIFJvdyBpcyBhbiBBamZUYWJsZVdpZGdldFxuICAgICAgICBjb25zdCByb3c6IHtba2V5OiBzdHJpbmddOiBhbnl9ID0ge1xuICAgICAgICAgIHN0eWxlczoge1xuICAgICAgICAgICAgJ3RleHQtYWxpZ24nOiAncmlnaHQnLFxuICAgICAgICAgICAgJ21hcmdpbi1ib3R0b20nOiAwLFxuICAgICAgICAgICAgJ2JvcmRlci1jb2xsYXBzZSc6ICdjb2xsYXBzZScsXG4gICAgICAgICAgICAuLi5yb3dTdHlsZSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHZpc2liaWxpdHk6IHtjb25kaXRpb246ICd0cnVlJ30sXG4gICAgICAgICAgd2lkZ2V0VHlwZTogNSxcbiAgICAgICAgICBkYXRhc2V0OiBbW11dIGFzIGFueVtdW10sXG4gICAgICAgICAgY2VsbFN0eWxlczogeydib3JkZXItdG9wJzogJzFweCBzb2xpZCBncmV5J30sXG4gICAgICAgIH07XG5cbiAgICAgICAgZmllbGRzLmZvckVhY2goKGZpZWxkOiBzdHJpbmcsIGNlbGxJZHg6IG51bWJlcikgPT4ge1xuICAgICAgICAgIGxldCBmb3JtdWxhQ2VsbCA9ICdcIlwiJztcbiAgICAgICAgICBpZiAoZGF0YVtmaWVsZF0gIT0gbnVsbCkge1xuICAgICAgICAgICAgZm9ybXVsYUNlbGwgPSAnXCInICsgZGF0YVtmaWVsZF0gKyAnXCInO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJvd1snZGF0YXNldCddWzBdLnB1c2goe1xuICAgICAgICAgICAgbGFiZWw6ICcnLFxuICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgY29sb3I6ICdibGFjaycsXG4gICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogaW5kZXggJSAyID09PSAwID8gYmFja2dyb3VuZENvbG9yQSA6IGJhY2tncm91bmRDb2xvckIsXG4gICAgICAgICAgICAgIC4uLmNlbGxTdHlsZXMsXG4gICAgICAgICAgICAgIHdpZHRoOiBwZXJjV2lkdGhbY2VsbElkeF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZm9ybXVsYToge1xuICAgICAgICAgICAgICBmb3JtdWxhOiBmb3JtdWxhQ2VsbCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb2xzcGFuOiAxLFxuICAgICAgICAgICAgcm93c3BhbjogMSxcbiAgICAgICAgICAgIGFnZ3JlZ2F0aW9uOiB7XG4gICAgICAgICAgICAgIGFnZ3JlZ2F0aW9uOiAwLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IGh0bWxEaWFsb2c6IHN0cmluZ1tdID0gW107XG4gICAgICAgIGRpYWxvZ0ZpZWxkcy5mb3JFYWNoKChmaWVsZDogc3RyaW5nLCBjZWxsSWR4OiBudW1iZXIpID0+IHtcbiAgICAgICAgICBsZXQgZmllbGRWYWx1ZSA9ICdcIlwiJztcbiAgICAgICAgICBpZiAoZGF0YVtmaWVsZF0gIT0gbnVsbCkge1xuICAgICAgICAgICAgZmllbGRWYWx1ZSA9XG4gICAgICAgICAgICAgIFwiPHAgY2xhc3M9J2RpYWxvZy1pdGVtJz48Yj5cIiArXG4gICAgICAgICAgICAgIGRpYWxvZ0xhYmVsRmllbGRzW2NlbGxJZHhdICtcbiAgICAgICAgICAgICAgJzwvYj4gPHNwYW4+JyArXG4gICAgICAgICAgICAgIGRhdGFbZmllbGRdICtcbiAgICAgICAgICAgICAgJzwvc3Bhbj48L3A+JztcbiAgICAgICAgICAgIGh0bWxEaWFsb2cucHVzaChmaWVsZFZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IGRpYWxvZ0NvbnRlbnQ6IHtba2V5OiBzdHJpbmddOiBhbnl9ID0ge1xuICAgICAgICAgIHdpZGdldFR5cGU6IDMsXG4gICAgICAgICAgc3R5bGVzOiB7XG4gICAgICAgICAgICAnbWFyZ2luJzogJzAgMWVtJyxcbiAgICAgICAgICAgICdwYWRkaW5nJzogJzVweCAxMHB4JyxcbiAgICAgICAgICAgICdtYXgtaGVpZ2h0JzogJzM2MHB4JyxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHZpc2liaWxpdHk6IHtjb25kaXRpb246ICd0cnVlJ30sXG4gICAgICAgICAgaHRtbFRleHQ6IGh0bWxEaWFsb2cuam9pbignICcpLFxuICAgICAgICB9O1xuXG4gICAgICAgIC8vIFRoaXMgaXMgYSBEaWFsb2cgV2lkZ2V0LCBhZGRlZCBhcyBjb210YWluZXIgZm9yIGVhY2ggdGFibGUgd2lkZ2V0XG4gICAgICAgIGNvbnN0IGRpYWxvZ1Jvdzoge1trZXk6IHN0cmluZ106IGFueX0gPSB7XG4gICAgICAgICAgd2lkZ2V0VHlwZTogMTMsXG4gICAgICAgICAgc3R5bGVzOiB7XG4gICAgICAgICAgICAnbWFyZ2luJzogJzAnLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgdmlzaWJpbGl0eToge2NvbmRpdGlvbjogJ3RydWUnfSxcbiAgICAgICAgICB0b2dnbGU6IHJvdyxcbiAgICAgICAgICBjb250ZW50OiBbZGlhbG9nQ29udGVudF0sXG4gICAgICAgIH07XG4gICAgICAgIHJlcy5wdXNoKGRpYWxvZ1Jvdyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cblxuLyoqXG4gKiBEZXByZWNhdGVkLiBVc2UgTUFQXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBSRVBFQVQoXG4gIGZvcm1zOiBNYWluRm9ybVtdLFxuICBhcnJheTogc3RyaW5nW10sXG4gIGZuOiBhbnksXG4gIGFyZzE6IHN0cmluZyxcbiAgYXJnMjogc3RyaW5nID0gJ3RydWUnLFxuKTogYW55W10ge1xuICByZXR1cm4gYXJyYXkubWFwKHYgPT4ge1xuICAgIGNvbnN0IHMgPSBKU09OLnN0cmluZ2lmeSh2KTtcbiAgICBjb25zdCBjdXJyZW50MSA9IChhcmcxIGFzIGFueSkucmVwbGFjZUFsbCgnY3VycmVudCcsIHMpO1xuICAgIGNvbnN0IGN1cnJlbnQyID0gKGFyZzIgYXMgYW55KS5yZXBsYWNlQWxsKCdjdXJyZW50Jywgcyk7XG4gICAgcmV0dXJuIGZuKGZvcm1zLCBjdXJyZW50MSwgY3VycmVudDIpO1xuICB9KTtcbn1cblxuLyoqXG4gKiBNYXBzIGZ1bmMgdG8gdGhlIGVsZW1lbnRzIG9mIGFycmF5LlxuICovXG5leHBvcnQgZnVuY3Rpb24gTUFQKGFycmF5OiBhbnlbXSwgZnVuYzogKGE6IGFueSkgPT4gYW55KTogYW55W10ge1xuICByZXR1cm4gYXJyYXkubWFwKGZ1bmMpO1xufVxuXG4vKipcbiAqIEZvciBlYWNoIGZvcm0gaW4gZm9ybXMsIHRoZSBzcGVjaWZpZWQgZmllbGQgaXMgc2V0IHdpdGggdGhlIHZhbHVlIGdpdmVuIGJ5IGV4cHJlc3Npb24uXG4gKiBUaGUgZm9ybSdzIGZpZWxkcyBjYW4gYmUgdXNlZCBpbnNpZGUgZXhwcmVzc2lvbi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIEFQUExZKGZvcm1zOiBNYWluRm9ybVtdLCBmaWVsZDogc3RyaW5nLCBleHByZXNzaW9uOiBGdW5jfHN0cmluZyk6IE1haW5Gb3JtW10ge1xuICBmb3JtcyA9IGNsb25lTWFpbkZvcm1zKGZvcm1zKTtcbiAgaWYgKHR5cGVvZihleHByZXNzaW9uKSA9PT0gJ3N0cmluZycpIHtcbiAgICBleHByZXNzaW9uID0gY3JlYXRlRnVuY3Rpb24oZXhwcmVzc2lvbik7XG4gIH1cbiAgZm9yIChjb25zdCBmb3JtIG9mIGZvcm1zKSB7XG4gICAgaWYgKGZvcm0gIT0gbnVsbCkge1xuICAgICAgZm9ybVtmaWVsZF0gPSBleHByZXNzaW9uKGZvcm0pO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZm9ybXM7XG59XG5cbi8qKlxuICogUm91bmRzIG51bSB0byB0aGUgc3BlY2lmaWVkIG51bWJlciBvZiBkaWdpdHMgYWZ0ZXIgdGhlIHBvaW50IChvciB6ZXJvKS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIFJPVU5EKG51bTogbnVtYmVyIHwgc3RyaW5nLCBkaWdpdHM/OiBudW1iZXIpOiBudW1iZXIge1xuICByZXR1cm4gcm91bmQobnVtLCBkaWdpdHMpO1xufVxuXG4vKipcbiAqIERlcHJlY2F0ZWQuIFVzZSBJRlxuICovXG5leHBvcnQgZnVuY3Rpb24gRVZBTFVBVEUoY29uZGl0aW9uOiBzdHJpbmcsIGJyYW5jaDE6IGFueSwgYnJhbmNoMjogYW55KTogYW55IHtcbiAgaWYgKGV2YWx1YXRlRXhwcmVzc2lvbihjb25kaXRpb24pKSB7XG4gICAgcmV0dXJuIGJyYW5jaDE7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGJyYW5jaDI7XG4gIH1cbn1cblxuLyoqXG4gKiBUZWxscyBpZiBhcnIgaW5jbHVkZXMgZWxlbVxuICovXG5leHBvcnQgZnVuY3Rpb24gSU5DTFVERVMoYXJyOiAoYW55W10pfHN0cmluZywgZWxlbTogYW55KTogYm9vbGVhbiB7XG4gIGlmICghQXJyYXkuaXNBcnJheShhcnIpICYmIHR5cGVvZihhcnIpICE9PSAnc3RyaW5nJykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gYXJyLmluY2x1ZGVzKGVsZW0pO1xufVxuXG4vKipcbiAqIFRoaXMgZnVuY3Rpb24gYnVpbGRzIGEgZGF0YSBzdHJ1Y3R1cmUgdGhhdCBhbGxvd3MgdGhlIHVzZSBvZiB0aGUgaGluZGlraXQgZm9ybXVsYXNcbiAqIGZvciBldmVyeSBmb3JtcyB3aXRoIHJlcGVhdGluZyBzbGlkZXMuXG4gKiBJbiBwYXJ0aWN1bGFyLCBpdCBidWlsZHMgYSBtYWluIGRhdGEgZm9ybSB3aXRoIGFsbCB0aGUgZGF0YSByZWxhdGluZyB0byB0aGUgc2xpZGVzIGFuZFxuICogYSBkaWN0aW9uYXJ5IHdpdGggdGhlIG5hbWUgcmVwcyB0aHVzIG1hZGUgaW5zdGFuY2Ugc2xpZGVOYW1lIGZvcm1zLlxuICogV2hlcmUgYSBmb3JtIGlzIGFzc29jaWF0ZWQgd2l0aCBlYWNoIGluc3RhbmNlIG9mIHRoZSByZXBlYXRpbmcgc2xpZGUuXG4gKiBleGFtcGxlOlxuICogc2ltcGxlIGZvcm06XG4gKiAge1xuICogICAgJHZhbHVlOiBcIkFHT1wiXG4gKiAgICBjaXR0YWRpbmFuemFfXzA6IFwiQUdPXCJcbiAqICAgIGNvZGljZV9maXNjYWxlX18wOiBcImpkZmxqZ2zDsmvDsmvDslwiXG4gKiAgICBjb3VudHJ5X18wOiBcIkFHT1wiXG4gKiAgICBkYXRlX2VuZDogXCIyMDIxLTAxLTEwXCJcbiAqICAgIGRhdGVfc3RhcnQ6IFwiMjAyMS0wMS0xMFwiXG4gKiAgICBkb2JfXzA6IFwiMjAyMS0wMy0xMVwiXG4gKiAgICBmaXJzdF9uYW1lX18wOiBcInBpcHBvXCJcbiAqICAgIGdlbmRlcl9fMDogXCJmXCJcbiAqICAgIGlkX2ZhbWlseTogXCIzYmVmM2EzZi1kOTVkLTRhMDktOGRmNC1lODEyYzU1YzYxYzZcIlxuICogICAgaXN0cnV6aW9uZV9fMDogbnVsbFxuICogICAgbGFzdF9uYW1lX18wOiBcInBpcHBvXCJcbiAqICAgIHBlcm1lc3NvX3NvZ2dpb3Jub19fMDogXCJub1wiXG4gKiAgICByZWxhemlvbmVfXzA6IFwiZ2VuaXRvcmVcIlxuICogICAgc29saWRhbmRvOiBcInNvbGlkYW5kbzFcIlxuICogICAgc3RhdG9fY2l2aWxlX18wOiBudWxsXG4gKiAgfVxuICogYWZ0ZXIgQlVJTERfREFUQVNFVFxuICogTWFpbkZvcm06XG4gKiB7XG4gKiAgICAkdmFsdWU6IFwiQUdPXCJcbiAqICAgIGFqZl9mb3JtX2lkOiAwICoqIGFkZGVkIGF0cmlidXRlIHRoYXQgcmFwcHJlc2VudCB0aGUgaW5kZXggcG9zaXRpb24gaW5zaWRlcyBpbnB1dCBmb3JtIGxpc3QuXG4gKiAgICBhamZfZmFtaWx5X2NvbXBvbmVudF9jb3VudDogMSoqIGFkZGVkIGF0cmlidXRlIHRoYXQgcmFwcHJlc2VudCB0aGUgaW5zdGFuY2UgbnVtYmVyIG9mIGZhbWlsaV9jb21wb25lbnQgcmVwZWF0aW5nIHNsaWRlcy5cbiAqICAgIGRhdGVfZW5kOiBcIjIwMjEtMDEtMTBcIlxuICogICAgZGF0ZV9zdGFydDogXCIyMDIxLTAxLTEwXCJcbiAqICAgIGlkX2ZhbWlseTogXCIzYmVmM2EzZi1kOTVkLTRhMDktOGRmNC1lODEyYzU1YzYxYzZcIlxuICogICAgcmVwczoge1xuICogICAgICBmYW1pbHlfY29tcG9uZW50OiBbXG4gKiAgICAgICAge1xuICogICAgICAgICAgYWpmX2ZhbWlseV9jb21wb25lbnRfcmVwOiAwICoqIGFkZGVkIGF0cmlidXRlIHRoYXQgcmFwcHJlc2VudCB0aGUgb3JkZXIgaW5zdGFuY2Ugb2YgZmFtaWx5X2NvbXBvbmVudCByZXBlYXRpbmcgc2xpZGUuXG4gKiAgICAgICAgICBjaXR0YWRpbmFuemE6IFwiQUdPXCJcbiAqICAgICAgICAgIGNvZGljZV9maXNjYWxlOiBcImpkZmxqZ2zDsmvDsmvDslwiXG4gKiAgICAgICAgICBjb3VudHJ5OiBcIkFHT1wiXG4gKiAgICAgICAgICBkb2I6IFwiMjAyMS0wMy0xMVwiXG4gKiAgICAgICAgICBmaXJzdF9uYW1lOiBcInBpcHBvXCJcbiAqICAgICAgICAgIGdlbmRlcjogXCJmXCJcbiAqICAgICAgICAgIGlzdHJ1emlvbmU6IG51bGxcbiAqICAgICAgICAgIGxhc3RfbmFtZTogXCJwaXBwb1wiXG4gKiAgICAgICAgICBwZXJtZXNzb19zb2dnaW9ybm86IFwibm9cIlxuICogICAgICAgICAgcmVsYXppb25lOiBcImdlbml0b3JlXCJcbiAqICAgICAgICAgIHN0YXRvX2NpdmlsZTogbnVsbFxuICogICAgICAgIH1cbiAqICAgICAgXVxuICogICAgfVxuICogfVxuICpcbiAqIEBwYXJhbSB7Rm9ybVtdfSBmb3Jtc1xuICogQHBhcmFtIHsqfSBbc2NoZW1hXSBpZiBzY2hlbWEgaXMgcHJvdmlkZWQgdGhlIGluc3RhbmNlcyBpbnNpZGUgdGhlIHJlcHMgbWF0Y2ggd2l0aCBlZmZlY3RpdmVcbiAqIHNsaWRlIG5hbWUuIE90aGVyd2lzZSBhbGwgcmVwZWF0aW5nIHNsaWRlcyBhcmUgYXNzb2NpYXRlcyB0byBnZW5lcmljIHNsaWRlIG5hbWUgXCJyZXBcIi5cbiAqIEByZXR1cm4geyp9ICB7TWFpbkZvcm1bXX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIEJVSUxEX0RBVEFTRVQoZm9ybXM6IEZvcm1bXSwgc2NoZW1hPzogYW55KTogTWFpbkZvcm1bXSB7XG4gIGNvbnN0IHJlczogTWFpbkZvcm1bXSA9IFtdO1xuICBjb25zdCBnZW5lcmF0ZU1ldGFkYXRhID0gKHNsaWRlTmFtZTogc3RyaW5nLCBzbGlkZUluc3RhbmNlOiBudW1iZXIpID0+IHtcbiAgICBjb25zdCByZXNnOiB7W3NuYW1lOiBzdHJpbmddOiBhbnl9ID0ge307XG4gICAgcmVzZ1tgYWpmXyR7c2xpZGVOYW1lfV9yZXBgXSA9IHNsaWRlSW5zdGFuY2U7XG4gICAgcmV0dXJuIHJlc2c7XG4gIH07XG5cbiAgZm9ybXMgPSBbLi4uKGZvcm1zIHx8IFtdKV07XG5cbiAgaWYgKHNjaGVtYSAhPSBudWxsKSB7XG4gICAgY29uc3QgcmVwZWF0aW5nU2xpZGVzOiBhbnlbXSA9IHNjaGVtYS5ub2Rlcy5maWx0ZXIoKG5vZGU6IGFueSkgPT4gbm9kZS5ub2RlVHlwZSA9PT0gNCk7XG4gICAgY29uc3Qgb2JqOiB7W2ZpZWxkTmFtZTogc3RyaW5nXTogc3RyaW5nfSA9IHt9O1xuICAgIHJlcGVhdGluZ1NsaWRlcy5mb3JFYWNoKHNsaWRlID0+IHtcbiAgICAgIGxldCBub2RlRmllbGRzID0gc2xpZGUubm9kZXMubWFwKChuOiBhbnkpID0+IG4ubmFtZSk7XG4gICAgICBub2RlRmllbGRzLmZvckVhY2goKG5vZGVGaWVsZDogc3RyaW5nKSA9PiB7XG4gICAgICAgIG9ialtub2RlRmllbGRdID0gc2xpZGUubmFtZTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZm9ybXMuZm9yRWFjaCgoZiwgZm9ybUlkeCkgPT4ge1xuICAgICAgY29uc3QgbWFpbkZvcm06IE1haW5Gb3JtID0ge3JlcHM6IHt9fTtcbiAgICAgIGNvbnN0IGZLZXlzOiBzdHJpbmdbXSA9IE9iamVjdC5rZXlzKGYpO1xuICAgICAgY29uc3QgaW5zdGFuY2VzOiB7W3NsaWRlTmFtZTogc3RyaW5nXTogYW55fSA9IHt9O1xuXG4gICAgICBmS2V5cy5mb3JFYWNoKGZrZXkgPT4ge1xuICAgICAgICBjb25zdCBzcGxpdHRlZEtleTogc3RyaW5nW10gPSBma2V5LnNwbGl0KCdfXycpO1xuICAgICAgICBjb25zdCBzcGxpdHRlZExlbmd0aDogbnVtYmVyID0gc3BsaXR0ZWRLZXkubGVuZ3RoO1xuICAgICAgICBjb25zdCBmaWVsZE5hbWUgPSBzcGxpdHRlZEtleVswXTtcbiAgICAgICAgY29uc3Qgc2xpZGVJbnN0YW5jZSA9XG4gICAgICAgICAgc3BsaXR0ZWRLZXlbMV0gIT0gbnVsbCAmJiBOdW1iZXIuaXNJbnRlZ2VyKCtzcGxpdHRlZEtleVsxXSkgPyArc3BsaXR0ZWRLZXlbMV0gOiBudWxsO1xuICAgICAgICBjb25zdCBzbGlkZU5hbWUgPSBvYmpbZmllbGROYW1lXTtcbiAgICAgICAgaWYgKHNwbGl0dGVkTGVuZ3RoID09PSAyICYmIHNsaWRlSW5zdGFuY2UgIT0gbnVsbCAmJiBzbGlkZU5hbWUgIT0gbnVsbCkge1xuICAgICAgICAgIGluc3RhbmNlc1tzbGlkZU5hbWVdID0gaW5zdGFuY2VzW3NsaWRlTmFtZV0gIT0gbnVsbCA/IGluc3RhbmNlc1tzbGlkZU5hbWVdIDogW107XG4gICAgICAgICAgaW5zdGFuY2VzW3NsaWRlTmFtZV1bc2xpZGVJbnN0YW5jZV0gPVxuICAgICAgICAgICAgaW5zdGFuY2VzW3NsaWRlTmFtZV1bc2xpZGVJbnN0YW5jZV0gIT0gbnVsbFxuICAgICAgICAgICAgICA/IGluc3RhbmNlc1tzbGlkZU5hbWVdW3NsaWRlSW5zdGFuY2VdXG4gICAgICAgICAgICAgIDogZ2VuZXJhdGVNZXRhZGF0YShzbGlkZU5hbWUsIHNsaWRlSW5zdGFuY2UpO1xuICAgICAgICAgIGluc3RhbmNlc1tzbGlkZU5hbWVdW3NsaWRlSW5zdGFuY2VdW2ZpZWxkTmFtZV0gPSBmW2ZrZXldO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG1haW5Gb3JtW2ZrZXldID0gZltma2V5XTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBtYWluRm9ybVtgYWpmX2Zvcm1faWRgXSA9IGZvcm1JZHg7XG4gICAgICBjb25zdCBpbnN0YW5jZUtleXMgPSBPYmplY3Qua2V5cyhpbnN0YW5jZXMpO1xuICAgICAgaW5zdGFuY2VLZXlzLmZvckVhY2goaW5zdGFuY2VLZXkgPT4ge1xuICAgICAgICBtYWluRm9ybVtgYWpmXyR7aW5zdGFuY2VLZXl9X2NvdW50YF0gPSBpbnN0YW5jZXNbaW5zdGFuY2VLZXldLmxlbmd0aDtcbiAgICAgIH0pO1xuICAgICAgbWFpbkZvcm0ucmVwcyA9IGluc3RhbmNlcztcbiAgICAgIHJlcy5wdXNoKG1haW5Gb3JtKTtcbiAgICB9KTtcbiAgICByZXR1cm4gcmVzO1xuICB9IGVsc2Uge1xuICAgIGZvcm1zLmZvckVhY2goZm9ybSA9PiB7XG4gICAgICBjb25zdCBmS2V5czogc3RyaW5nW10gPSBPYmplY3Qua2V5cyhmb3JtKTtcbiAgICAgIGNvbnN0IG5vUmVwZWF0aW5nRmllbGRzOiBzdHJpbmdbXSA9IGZLZXlzLmZpbHRlcihma2V5ID0+IHtcbiAgICAgICAgY29uc3Qgc3BsaXR0ZWRLZXk6IHN0cmluZ1tdID0gZmtleS5zcGxpdCgnX18nKTtcbiAgICAgICAgaWYgKHNwbGl0dGVkS2V5Lmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0pO1xuICAgICAgY29uc3Qgbm9SZXBGb3JtOiBGb3JtID0ge307XG5cbiAgICAgIG5vUmVwZWF0aW5nRmllbGRzLmZvckVhY2goZmllbGQgPT4ge1xuICAgICAgICBub1JlcEZvcm1bZmllbGRdID0gZm9ybVtmaWVsZF07XG4gICAgICB9KTtcblxuICAgICAgY29uc3QgbWFpbkZvcm06IE1haW5Gb3JtID0gey4uLm5vUmVwRm9ybSwgcmVwczoge3NsaWRlOiBbXX19O1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8PSBNQVhfUkVQUzsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRTbGlkZTogRm9ybSA9IHt9O1xuICAgICAgICBjb25zdCBvbmx5Q3VycmVudEluc3RhbmNlS2V5czogc3RyaW5nW10gPSBmS2V5cy5maWx0ZXIoZmtleSA9PiB7XG4gICAgICAgICAgY29uc3Qgc3BsaXR0ZWRLZXk6IHN0cmluZ1tdID0gZmtleS5zcGxpdCgnX18nKTtcbiAgICAgICAgICBpZiAoc3BsaXR0ZWRLZXkubGVuZ3RoID09PSAyKSB7XG4gICAgICAgICAgICByZXR1cm4gZmtleS5pbmRleE9mKGBfXyR7aX1gKSA+IC0xO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBzZSBpbCBudW1lcm8gZGkgYXR0cmlidXRpIGNvaW5jaWRlIGlsIGZvcm0gZGF0YSBub24gaGEgcmVwZWF0aW5nc2xpZGVzXG4gICAgICAgIGlmIChvbmx5Q3VycmVudEluc3RhbmNlS2V5cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICBtYWluRm9ybVsnYWpmX3JlcF9jb3VudCddID0gaTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBvbmx5Q3VycmVudEluc3RhbmNlS2V5cy5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgY29uc3Qgc3BsaXR0ZWRLZXkgPSBrZXkuc3BsaXQoJ19fJyk7XG4gICAgICAgICAgY29uc3QgZmllbGROYW1lID0gc3BsaXR0ZWRLZXlbMF07XG4gICAgICAgICAgY29uc3Qgc2xpZGVJbnN0YW5jZSA9IHNwbGl0dGVkS2V5WzFdICE9IG51bGwgPyArc3BsaXR0ZWRLZXlbMV0gOiBudWxsO1xuICAgICAgICAgIGN1cnJlbnRTbGlkZVtmaWVsZE5hbWVdID0gZm9ybVtrZXldO1xuICAgICAgICAgIGN1cnJlbnRTbGlkZVsnYWpmX3JlcCddID0gc2xpZGVJbnN0YW5jZSAhPSBudWxsID8gc2xpZGVJbnN0YW5jZSA6IGN1cnJlbnRTbGlkZVsnYWpmX3JlcCddO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKG9ubHlDdXJyZW50SW5zdGFuY2VLZXlzLmxlbmd0aCAhPSAwKSB7XG4gICAgICAgICAgbWFpbkZvcm0ucmVwcyFbJ3NsaWRlJ10ucHVzaChjdXJyZW50U2xpZGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG1haW5Gb3JtLnJlcHMgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJlcy5wdXNoKG1haW5Gb3JtKTtcbiAgICB9KTtcblxuICAgIHJldHVybiByZXM7XG4gIH1cbn1cblxuLyoqXG4gKiBVVElMSVRZIEZVTkNJT05cbiAqIFRoaXMgZnVuY3Rpb24gdGFrZSBhbiBhamYgc2NoZW1hIGFzIGlucHV0IGFuZCBleHRyYWN0IGFcbiAqIGRpY3QgdGhhdCBtYXRjaCBlYWNoIGNob2ljZSB2YWx1ZSAoYWxzbyB3aXRoIGNob2ljZXNPcmlnaW4gbmFtZSBwcmVmaXgpIHdpdGggaXRzIGxhYmVsXG4gKiBAcGFyYW0gc2NoZW1hIHRoZSBhamYgc2NoZW1hXG4gKiBAcmV0dXJucyBBIGRpY3Qgd2l0aDpcbiAqICB7W2Nob2ljZXNPcmlnaW5OYW1lX2Nob2ljZVZhbHVlOiBzdHJpbmddOiBbY2hvaWNlTGFiZWw6IHN0cmluZ119XG4gKiAge1tjaG9pY2VWYWx1ZTogc3RyaW5nXTogW2Nob2ljZUxhYmVsOiBzdHJpbmddfVxuICovXG5mdW5jdGlvbiBleHRyYWN0TGFiZWxzQnlTY2hlbWFDaG9pY2VzKHNjaGVtYTogYW55KToge1tjaG9pY2VWYWx1ZTogc3RyaW5nXTogc3RyaW5nfSB7XG4gIGNvbnN0IGNob2ljZUxhYmVsczoge1tjaG9pY2VWYWx1ZTogc3RyaW5nXTogc3RyaW5nfSA9IHt9O1xuICBpZiAoc2NoZW1hICYmIHNjaGVtYS5jaG9pY2VzT3JpZ2lucyAhPSBudWxsKSB7XG4gICAgKHNjaGVtYS5jaG9pY2VzT3JpZ2lucyBhcyBhbnlbXSkuZm9yRWFjaChjaG9pY2VzT3JpZ2luID0+IHtcbiAgICAgIGlmIChjaG9pY2VzT3JpZ2luICE9IG51bGwgJiYgY2hvaWNlc09yaWdpbi5jaG9pY2VzICE9IG51bGwpIHtcbiAgICAgICAgKGNob2ljZXNPcmlnaW4uY2hvaWNlcyBhcyBhbnlbXSkuZm9yRWFjaChjaG9pY2UgPT4ge1xuICAgICAgICAgIGNob2ljZUxhYmVsc1tjaG9pY2VzT3JpZ2luLm5hbWUgKyAnXycgKyBjaG9pY2UudmFsdWVdID0gY2hvaWNlLmxhYmVsO1xuICAgICAgICAgIGNob2ljZUxhYmVsc1tjaG9pY2UudmFsdWVdID0gY2hvaWNlLmxhYmVsO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICByZXR1cm4gY2hvaWNlTGFiZWxzO1xufVxuXG4vKipcbiAqIFVUSUxJVFkgRlVOQ0lPTlxuICogVGhpcyBmdW5jdGlvbiB0YWtlIGFuIGFqZiBzY2hlbWEgYXMgaW5wdXQgYW5kIGV4dHJhY3QgYSBvbmVcbiAqIGRpbWVuc2lvbmFsIGFycmF5IG9mIEFqZk5vZGUgZm9yIGVhY2ggc2xpZGUncyBmaWVsZFxuICpcbiAqIEBwYXJhbSBzY2hlbWEgdGhlIGFqZiBzY2hlbWFcbiAqIEByZXR1cm5zIEFuIG9iamVjdCB3aXRoIGFsbCBmaWVsZHM6XG4gKiAge1tmaWVsZE5hbWU6IHN0cmluZ106IGFqZiBmaWVsZH1cbiAqL1xuZnVuY3Rpb24gZXh0cmFjdEZsYXR0ZW5Ob2RlcyhzY2hlbWE6IGFueSk6IHtbZmllbGQ6IHN0cmluZ106IGFueX0ge1xuICBjb25zdCBmaWVsZE5vZGVzOiB7W2ZpZWxkOiBzdHJpbmddOiBhbnl9ID0ge307XG4gIGlmIChzY2hlbWEgJiYgc2NoZW1hLm5vZGVzKSB7XG4gICAgY29uc3Qgc2xpZGVzOiBhbnlbXSA9IHNjaGVtYS5ub2Rlcy5maWx0ZXIoXG4gICAgICAobm9kZTogYW55KSA9PiBub2RlLm5vZGVUeXBlID09PSAzIHx8IG5vZGUubm9kZVR5cGUgPT09IDQsXG4gICAgKTtcbiAgICBzbGlkZXMuZm9yRWFjaChzbGlkZSA9PiB7XG4gICAgICBzbGlkZS5ub2Rlc1xuICAgICAgICAuZmlsdGVyKChub2RlOiBhbnkpID0+IG5vZGUubm9kZVR5cGUgPT09IDApXG4gICAgICAgIC5mb3JFYWNoKChmaWVsZE5vZGU6IGFueSkgPT4ge1xuICAgICAgICAgIGZpZWxkTm9kZXNbZmllbGROb2RlLm5hbWVdID0gZmllbGROb2RlO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfVxuICByZXR1cm4gZmllbGROb2Rlcztcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgY2xvbmUgb2YgZm9ybXMsIHdoZXJlIHRoZSBzcGVjaWZpZWQgZmllbGRzIGFyZSByZXBsYWNlZCBieSB0aGUgY29ycmVzcG9uZGluZyBsYWJlbHMsXG4gKiBhcyBkZWZpbmVkIGJ5IHRoZSBjaG9pY2Ugb3JpZ2lucyBpbiBzY2hlbWEuXG4gKlxuICogQHBhcmFtIHtNYWluRm9ybVtdfSBmb3JtTGlzdFxuICogQHBhcmFtIHsqfSBzY2hlbWEgdGhlIGFqZiBzY2hlbWFcbiAqIEBwYXJhbSB7c3RyaW5nW119IGZpZWxkTmFtZXNcbiAqIEByZXR1cm4geyp9ICB7TWFpbkZvcm1bXX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIEFQUExZX0xBQkVMUyhmb3JtTGlzdDogTWFpbkZvcm1bXSwgc2NoZW1hOiBhbnksIGZpZWxkTmFtZXM6IHN0cmluZ1tdKTogTWFpbkZvcm1bXSB7XG4gIGZvcm1MaXN0ID0gY2xvbmVNYWluRm9ybXMoZm9ybUxpc3QpO1xuICBjb25zdCBjaG9pY2VMYWJlbHM6IHtbZmllbGROYW1lOiBzdHJpbmddOiBzdHJpbmd9ID0gZXh0cmFjdExhYmVsc0J5U2NoZW1hQ2hvaWNlcyhzY2hlbWEpO1xuICBjb25zdCBmbGF0dGVuTm9kZXMgPSBleHRyYWN0RmxhdHRlbk5vZGVzKHNjaGVtYSk7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBmb3JtTGlzdC5sZW5ndGg7IGkrKykge1xuICAgIGlmIChmb3JtTGlzdFtpXSA9PSBudWxsKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgaWYgKGZvcm1MaXN0W2ldLnJlcHMgIT0gbnVsbCkge1xuICAgICAgY29uc3QgZiA9IGZvcm1MaXN0W2ldO1xuICAgICAgY29uc3QgZktleXM6IHN0cmluZ1tdID0gT2JqZWN0LmtleXMoZik7XG4gICAgICBmS2V5cy5mb3JFYWNoKGZrZXkgPT4ge1xuICAgICAgICBjb25zdCBmaWVsZE5vZGUgPSBmbGF0dGVuTm9kZXNbZmtleV07XG4gICAgICAgIGNvbnN0IGNob2ljZU9yaWdpbk5hbWVQcmVmaXggPVxuICAgICAgICAgIGZpZWxkTm9kZSAmJiBmaWVsZE5vZGUuY2hvaWNlc09yaWdpblJlZiA/IGZpZWxkTm9kZS5jaG9pY2VzT3JpZ2luUmVmICsgJ18nIDogJyc7XG5cbiAgICAgICAgaWYgKGZpZWxkTmFtZXMuaW5jbHVkZXMoZmtleSkgJiYgZltma2V5XSAhPT0gbnVsbCkge1xuICAgICAgICAgIGxldCBjaG9pY2VWYWx1ZTogc3RyaW5nW10gPSBbXTtcbiAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShmW2ZrZXldKSkge1xuICAgICAgICAgICAgY2hvaWNlVmFsdWUgPSBmW2ZrZXldIGFzIHVua25vd24gYXMgc3RyaW5nW107XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IG11bHRpcGxlVmFscyA9IChmW2ZrZXldIGFzIHN0cmluZykuc3BsaXQoJywnKS5tYXAodiA9PiB2LnRyaW0oKSk7XG4gICAgICAgICAgICBpZiAobXVsdGlwbGVWYWxzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgY2hvaWNlVmFsdWUgPSBtdWx0aXBsZVZhbHM7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBjaG9pY2VWYWx1ZSA9IFtmW2ZrZXldIGFzIHN0cmluZ107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChjaG9pY2VWYWx1ZSAhPSBudWxsKSB7XG4gICAgICAgICAgICBjb25zdCBsYWJlbHMgPSBjaG9pY2VWYWx1ZS5tYXAodmFsID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgdmFsV2l0aFByZWZpeCA9IGNob2ljZU9yaWdpbk5hbWVQcmVmaXggKyB2YWw7XG4gICAgICAgICAgICAgIHJldHVybiBjaG9pY2VMYWJlbHNbdmFsV2l0aFByZWZpeF0gIT0gbnVsbFxuICAgICAgICAgICAgICAgID8gY2hvaWNlTGFiZWxzW3ZhbFdpdGhQcmVmaXhdXG4gICAgICAgICAgICAgICAgOiBjaG9pY2VMYWJlbHNbdmFsXSAhPSBudWxsXG4gICAgICAgICAgICAgICAgPyBjaG9pY2VMYWJlbHNbdmFsXVxuICAgICAgICAgICAgICAgIDogdmFsO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAobGFiZWxzICYmIGxhYmVscy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgY29uc3QgbGFiZWxGaWVsZE5hbWUgPSBma2V5ICsgJ19jaG9pY2VzTGFiZWwnO1xuICAgICAgICAgICAgICBmb3JtTGlzdFtpXVtsYWJlbEZpZWxkTmFtZV0gPSBsYWJlbHMubGVuZ3RoID4gMSA/IGxhYmVscy5qb2luKCcsICcpIDogbGFiZWxzWzBdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBmb3JtTGlzdDtcbn1cblxuLyoqXG4gKiBEZXByZWNhdGVkLiBVc2UgRklMVEVSX0JZXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBGSUxURVJfQllfVkFSUyhmb3JtTGlzdDogTWFpbkZvcm1bXSwgZXhwcmVzc2lvbjogc3RyaW5nKTogTWFpbkZvcm1bXSB7XG4gIHJldHVybiBGSUxURVJfQlkoZm9ybUxpc3QsIGV4cHJlc3Npb24pO1xufVxuXG4vKipcbiAqIFJldHVybnMgYSBjb3B5IG9mIGZvcm1zIGFuZCBpdHMgcmVwZXRpdGlvbnMsIGtlZXBpbmcgb25seSB0aGUgb25lcyBmb3Igd2hpY2ggZXhwcmVzc2lvbiBldmFsdWF0ZXMgdG8gdHJ1ZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIEZJTFRFUl9CWShmb3JtczogTWFpbkZvcm1bXSwgZXhwcmVzc2lvbjogRnVuY3xzdHJpbmcpOiBNYWluRm9ybVtdIHtcbiAgZm9ybXMgPSBmb3JtcyB8fCBbXTtcbiAgaWYgKGV4cHJlc3Npb24gPT09ICd0cnVlJykge1xuICAgIHJldHVybiBjbG9uZU1haW5Gb3Jtcyhmb3Jtcyk7XG4gIH1cbiAgaWYgKHR5cGVvZihleHByZXNzaW9uKSA9PT0gJ3N0cmluZycpIHtcbiAgICBleHByZXNzaW9uID0gY3JlYXRlRnVuY3Rpb24oZXhwcmVzc2lvbik7XG4gIH1cbiAgY29uc3QgcmVzOiBNYWluRm9ybVtdID0gW107XG4gIGZvciAobGV0IGZvcm0gb2YgZm9ybXMuZmlsdGVyKGYgPT4gZiAhPSBudWxsKSkge1xuICAgIGZvcm0gPSB7Li4uZm9ybX07XG4gICAgY29uc3QgZmlsdGVyZWRSZXBzOiBJbnN0YW5jZXMgPSB7fTtcbiAgICBsZXQgc29tZVJlcHMgPSBmYWxzZTtcbiAgICBpZiAoZm9ybS5yZXBzICE9IG51bGwpIHtcbiAgICAgIGZvciAoY29uc3Qga2V5IGluIGZvcm0ucmVwcykge1xuICAgICAgICBmaWx0ZXJlZFJlcHNba2V5XSA9IGZvcm0ucmVwc1trZXldLmZpbHRlcihyZXAgPT5cbiAgICAgICAgICAoZXhwcmVzc2lvbiBhcyBGdW5jKSh7Li4uZm9ybSwgLi4ucmVwfSlcbiAgICAgICAgKTtcbiAgICAgICAgZm9ybVtgYWpmXyR7a2V5fV9jb3VudGBdID0gZmlsdGVyZWRSZXBzW2tleV0ubGVuZ3RoO1xuICAgICAgICBzb21lUmVwcyB8fD0gZmlsdGVyZWRSZXBzW2tleV0ubGVuZ3RoID4gMDtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHNvbWVSZXBzIHx8IGV4cHJlc3Npb24oZm9ybSkpIHtcbiAgICAgIGZvcm0ucmVwcyA9IGZpbHRlcmVkUmVwcztcbiAgICAgIHJlcy5wdXNoKGZvcm0pO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzO1xufVxuXG4vKipcbiAqIFJldHVybnMgdG9kYXkncyBkYXRlLlxuICpcbiAqIEBleHBvcnRcbiAqIEBwYXJhbSB7c3RyaW5nfSBbZm9ybWF0PSd5eXl5LU1NLWRkJ11cbiAqIEByZXR1cm4geyp9ICB7c3RyaW5nfVxuICovXG5leHBvcnQgZnVuY3Rpb24gVE9EQVkoZm9ybWF0ID0gJ3l5eXktTU0tZGQnKTogc3RyaW5nIHtcbiAgcmV0dXJuIGRhdGVGbnMuZm9ybWF0KG5ldyBEYXRlKCksIGZvcm1hdCk7XG59XG5cbi8qKlxuICogTG9ncyB2YWwgdG8gdGhlIGNvbnNvbGUuXG4gKiBcbiAqIEBleHBvcnRcbiAqIEBwYXJhbSB7Kn0gdmFsXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBDT05TT0xFX0xPRyh2YWw6IGFueSk6IHZvaWQge1xuICBjb25zb2xlLmxvZyh2YWwpO1xufVxuXG4vKipcbiAqIENvbXB1dGVzIHRoZSBjdXJyZW50IGFnZSBpbiB5ZWFycywgZ2l2ZW4gdGhlIGRhdGUgb2YgYmlydGguXG4gKlxuICogQGV4cG9ydFxuICogQHBhcmFtIHsoc3RyaW5nIHwgbnVsbCl9IGRvYlxuICogQHJldHVybiB7Kn0gIHtudW1iZXJ9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBHRVRfQUdFKGRvYjogc3RyaW5nIHwgbnVsbCk6IG51bWJlciB7XG4gIGlmIChkb2IgPT0gbnVsbCkge1xuICAgIHJldHVybiBOYU47XG4gIH1cbiAgcmV0dXJuIGRhdGVGbnMuZGlmZmVyZW5jZUluWWVhcnMobmV3IERhdGUoKSwgbmV3IERhdGUoZG9iKSk7XG59XG5cbi8qKlxuICogSWYgZGF0YSBpcyBhIGZvcm0gd2l0aCByZXBldGl0aW9ucywgcmV0dXJucyB0aGUgbnVtYmVyIG9mIHJlcGV0aXRpb25zO1xuICogSWYgZGF0YSBpcyBhbiBhcnJheSwgcmV0dXJucyBpdHMgbGVuZ3RoO1xuICogT3RoZXJ3aXNlIHJldHVybnMgMC5cbiAqXG4gKiBAZXhwb3J0XG4gKiBAcGFyYW0geyhNYWluRm9ybSB8IGFueVtdKX0gZGF0YXNldFxuICogQHJldHVybiB7Kn0gIHtudW1iZXJ9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBMRU4oZGF0YXNldDogTWFpbkZvcm0gfCBhbnlbXSk6IG51bWJlciB7XG4gIGlmIChkYXRhc2V0ID09IG51bGwpIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuICBjb25zdCBmb3JtID0gZGF0YXNldCBhcyBNYWluRm9ybTtcbiAgaWYgKGZvcm0ucmVwcyAhPSBudWxsKSB7XG4gICAgcmV0dXJuIGFsbFJlcHMoZm9ybSkubGVuZ3RoO1xuICB9XG4gIHJldHVybiAoZGF0YXNldCBhcyBhbnlbXSkubGVuZ3RoIHx8IDA7XG59XG5cbi8qKlxuICogQXJyYXkgY29uY2F0ZW5hdGlvbi5cbiAqXG4gKiBAZXhwb3J0XG4gKiBAcGFyYW0ge2FueVtdfSBhXG4gKiBAcGFyYW0ge2FueVtdfSBiXG4gKiBAcmV0dXJuIHsqfSAge2FueVtdfVxuICovXG5leHBvcnQgZnVuY3Rpb24gQ09OQ0FUKGE6IGFueVtdLCBiOiBhbnlbXSk6IGFueVtdIHtcbiAgcmV0dXJuIGEuY29uY2F0KGIpO1xufVxuXG4vKipcbiAqIFJlbW92ZXMgZHVwbGljYXRlIGVsZW1lbnRzIGZyb20gYW4gYXJyYXkuXG4gKlxuICogQGV4cG9ydFxuICogQHBhcmFtIHthbnlbXX0gYXJyXG4gKiBAcmV0dXJuIHsqfSAge2FueVtdfVxuICovXG5leHBvcnQgZnVuY3Rpb24gUkVNT1ZFX0RVUExJQ0FURVMoYXJyOiBhbnlbXSk6IGFueVtdIHtcbiAgcmV0dXJuIFsuLi5uZXcgTWFwKGFyci5tYXAodiA9PiBbSlNPTi5zdHJpbmdpZnkodiksIHZdKSkudmFsdWVzKCldO1xufVxuXG4vLyBSZXR1cm5zIHRoZSBkYXRlIG9idGFpbmVkIGJ5IGFkZGluZyBkYXlzIHRvIGRhdGUuXG5leHBvcnQgZnVuY3Rpb24gQUREX0RBWVMoZGF0ZTogc3RyaW5nLCBkYXlzOiBudW1iZXIpOiBzdHJpbmcge1xuICBjb25zdCBkID0gbmV3IERhdGUoZGF0ZSk7XG4gIGQuc2V0RGF0ZShkLmdldERhdGUoKSArIGRheXMpO1xuICByZXR1cm4gZC50b0pTT04oKS5zbGljZSgwLCAxMCk7XG59XG5cbi8vIFJldHVybnMgdGhlIGRpZmZlcmVuY2UgaW4gZGF5cyAoYSAtIGIpIGJldHdlZW4gdGhlIHR3byBkYXRlcy5cbmV4cG9ydCBmdW5jdGlvbiBEQVlTX0RJRkYoYTogc3RyaW5nLCBiOiBzdHJpbmcpOiBudW1iZXIge1xuICBjb25zdCBkYXRlQSA9IG5ldyBEYXRlKGEpO1xuICBjb25zdCBkYXRlQiA9IG5ldyBEYXRlKGIpO1xuICAvLyBVVEMgYXZvaWRzIGJ1Z3Mgd2l0aCBkYXlsaWdodCBzYXZpbmcgdGltZS5cbiAgY29uc3QgdXRjQSA9IERhdGUuVVRDKGRhdGVBLmdldEZ1bGxZZWFyKCksIGRhdGVBLmdldE1vbnRoKCksIGRhdGVBLmdldERhdGUoKSk7XG4gIGNvbnN0IHV0Y0IgPSBEYXRlLlVUQyhkYXRlQi5nZXRGdWxsWWVhcigpLCBkYXRlQi5nZXRNb250aCgpLCBkYXRlQi5nZXREYXRlKCkpO1xuXG4gIGNvbnN0IG1pbGxpc1BlckRheSA9IDEwMDAgKiA2MCAqIDYwICogMjQ7XG4gIHJldHVybiBNYXRoLmZsb29yKCh1dGNBIC0gdXRjQikgLyBtaWxsaXNQZXJEYXkpO1xufVxuXG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiBkYXRlIGlzIGJlZm9yZSBkYXRlVG9Db21wYXJlLlxuICpcbiAqIEBleHBvcnRcbiAqIEBwYXJhbSB7c3RyaW5nfSBkYXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gZGF0ZVRvQ29tcGFyZVxuICogQHJldHVybiB7Kn0gIHtib29sZWFufVxuICovXG5leHBvcnQgZnVuY3Rpb24gSVNfQkVGT1JFKGRhdGU6IHN0cmluZywgZGF0ZVRvQ29tcGFyZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gIGNvbnN0IGRhdGVBOiBEYXRlID0gZGF0ZUZucy5wYXJzZUlTTyhkYXRlKTtcbiAgY29uc3QgZGF0ZUI6IERhdGUgPSBkYXRlRm5zLnBhcnNlSVNPKGRhdGVUb0NvbXBhcmUpO1xuICByZXR1cm4gZGF0ZUZucy5pc0JlZm9yZShkYXRlQSwgZGF0ZUIpO1xufVxuXG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiBkYXRlIGlzIGFmdGVyIGRhdGVUb0NvbXBhcmUuXG4gKlxuICogQGV4cG9ydFxuICogQHBhcmFtIHtzdHJpbmd9IGRhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBkYXRlVG9Db21wYXJlXG4gKiBAcmV0dXJuIHsqfSAge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBJU19BRlRFUihkYXRlOiBzdHJpbmcsIGRhdGVUb0NvbXBhcmU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICBjb25zdCBkYXRlQTogRGF0ZSA9IGRhdGVGbnMucGFyc2VJU08oZGF0ZSk7XG4gIGNvbnN0IGRhdGVCOiBEYXRlID0gZGF0ZUZucy5wYXJzZUlTTyhkYXRlVG9Db21wYXJlKTtcbiAgcmV0dXJuIGRhdGVGbnMuaXNBZnRlcihkYXRlQSwgZGF0ZUIpO1xufVxuXG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiBkYXRlIGlzIGJldHdlZW4gZGF0ZVN0YXJ0IGFuZCBkYXRlRW5kLlxuICpcbiAqIEBleHBvcnRcbiAqIEBwYXJhbSB7c3RyaW5nfSBkYXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gZGF0ZVN0YXJ0XG4gKiBAcGFyYW0ge3N0cmluZ30gZGF0ZUVuZFxuICogQHJldHVybiB7Kn0gIHtib29sZWFufVxuICovXG5leHBvcnQgZnVuY3Rpb24gSVNfV0lUSElOX0lOVEVSVkFMKGRhdGU6IHN0cmluZywgZGF0ZVN0YXJ0OiBzdHJpbmcsIGRhdGVFbmQ6IHN0cmluZyk6IGJvb2xlYW4ge1xuICBjb25zdCBkYXRlVG9Db21wYXJlOiBEYXRlID0gZGF0ZUZucy5wYXJzZUlTTyhkYXRlKTtcbiAgY29uc3QgaW50ZXJ2YWw6IEludGVydmFsID0ge1xuICAgIHN0YXJ0OiBkYXRlRm5zLnBhcnNlSVNPKGRhdGVTdGFydCksXG4gICAgZW5kOiBkYXRlRm5zLnBhcnNlSVNPKGRhdGVFbmQpLFxuICB9O1xuICByZXR1cm4gZGF0ZUZucy5pc1dpdGhpbkludGVydmFsKGRhdGVUb0NvbXBhcmUsIGludGVydmFsKTtcbn1cblxuLyoqXG4gKiBDb21wYXJlcyBkYXRlIHdpdGggYW4gaW50ZXJ2YWwuXG4gKiBSZXR1cm5zICctMScgKG9yIHRoZSBmaXJzdCBlbGVtZW50IG9mIGxhYmVscykgaWYgZGF0ZSBpcyBiZWZvcmUgZGF0ZVN0YXJ0LFxuICogJzAnIChvciB0aGUgc2Vjb25kIGVsZW1lbnQpIGlmIGRhdGUgaXMgYmV0d2VlbiBkYXRlU3RhcnQgYW5kIGRhdGVFbmQsXG4gKiAnMScgKG9yIHRoZSB0aGlyZCBlbGVtZW50KSBpZiBkYXRlIGlzIGFmdGVyIGRhdGVFbmQuXG4gKlxuICogQGV4cG9ydFxuICogQHBhcmFtIHtzdHJpbmd9IGRhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBkYXRlU3RhcnRcbiAqIEBwYXJhbSB7c3RyaW5nfSBkYXRlRW5kXG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBsYWJlbHMgYW4gb3B0aW9uYWwgYXJyYXkgb2Ygc3RyaW5nIGZvciB0aGUgb3V0cHV0IHZhbHVlc1xuICogQHJldHVybiB7Kn0gIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBDT01QQVJFX0RBVEUoXG4gIGRhdGU6IHN0cmluZyxcbiAgZGF0ZVN0YXJ0OiBzdHJpbmcsXG4gIGRhdGVFbmQ6IHN0cmluZyxcbiAgbGFiZWxzPzogc3RyaW5nW10sXG4pOiBzdHJpbmcge1xuICBjb25zdCBkYXRlVG9Db21wYXJlOiBEYXRlID0gZGF0ZUZucy5wYXJzZUlTTyhkYXRlKTtcbiAgY29uc3QgZGF0ZUE6IERhdGUgPSBkYXRlRm5zLnBhcnNlSVNPKGRhdGVTdGFydCk7XG4gIGNvbnN0IGRhdGVCOiBEYXRlID0gZGF0ZUZucy5wYXJzZUlTTyhkYXRlRW5kKTtcbiAgY29uc3QgaW50ZXJ2YWw6IEludGVydmFsID0ge1xuICAgIHN0YXJ0OiBkYXRlQSxcbiAgICBlbmQ6IGRhdGVCLFxuICB9O1xuICBpZiAobGFiZWxzID09IG51bGwpIHtcbiAgICBsYWJlbHMgPSBbJy0xJywgJzAnLCAnMSddO1xuICB9XG4gIGlmIChkYXRlRm5zLmlzQmVmb3JlKGRhdGVUb0NvbXBhcmUsIGRhdGVBKSkge1xuICAgIHJldHVybiBsYWJlbHNbMF07XG4gIH1cbiAgaWYgKGRhdGVGbnMuaXNXaXRoaW5JbnRlcnZhbChkYXRlVG9Db21wYXJlLCBpbnRlcnZhbCkpIHtcbiAgICByZXR1cm4gbGFiZWxzWzFdO1xuICB9XG4gIGlmIChkYXRlRm5zLmlzQWZ0ZXIoZGF0ZVRvQ29tcGFyZSwgZGF0ZUIpKSB7XG4gICAgcmV0dXJuIGxhYmVsc1syXTtcbiAgfVxuICByZXR1cm4gJyc7XG59XG5cbi8qKlxuICogUGVyZm9ybXMgYSBsZWZ0IGpvaW4gb2YgZm9ybXNBIGFuZCBmb3Jtc0IuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBKT0lOX0ZPUk1TKFxuICBmb3Jtc0E6IChNYWluRm9ybSB8IEZvcm0pW10sXG4gIGZvcm1zQjogKE1haW5Gb3JtIHwgRm9ybSlbXSxcbiAga2V5QTogc3RyaW5nLFxuICBrZXlCPzogc3RyaW5nLFxuKTogKE1haW5Gb3JtIHwgRm9ybSlbXSB7XG4gIHJldHVybiBKT0lOX1JFUEVBVElOR19TTElERVMoZm9ybXNBLCBmb3Jtc0IsIGtleUEsIGtleUIgYXMgYW55LCBudWxsIGFzIGFueSk7XG59XG5cbi8qKlxuICogUGVyZm9ybXMgYSBsZWZ0IGpvaW4gb2YgZm9ybXNBIGFuZCBmb3Jtc0IsIGxpa2UgSk9JTl9GT1JNUy5cbiAqIEluIGFkZGl0aW9uLCBmb3IgZWFjaCBtYXRjaGluZyBwYWlyIG9mIGZvcm1BIGFuZCBmb3JtQiwgdGhlaXIgcmVwZWF0aW5nIHNsaWRlcyBhcmUgYWxzbyBqb2luZWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBKT0lOX1JFUEVBVElOR19TTElERVMoXG4gIGZvcm1zQTogTWFpbkZvcm1bXSxcbiAgZm9ybXNCOiBNYWluRm9ybVtdLFxuICBrZXlBOiBzdHJpbmcsXG4gIGtleUI6IHN0cmluZyxcbiAgc3Via2V5QTogc3RyaW5nLFxuICBzdWJrZXlCPzogc3RyaW5nLFxuKTogTWFpbkZvcm1bXSB7XG4gIGZvcm1zQSA9IGNsb25lTWFpbkZvcm1zKGZvcm1zQSB8fCBbXSk7XG4gIGZvcm1zQiA9IGNsb25lTWFpbkZvcm1zKGZvcm1zQiB8fCBbXSk7XG4gIGlmIChrZXlCID09IG51bGwpIHtcbiAgICBrZXlCID0ga2V5QTtcbiAgfVxuICBpZiAoc3Via2V5QiA9PSBudWxsKSB7XG4gICAgc3Via2V5QiA9IHN1YmtleUE7XG4gIH1cbiAgY29uc3QgaW5kZXhCOiB7W3ZhbDogc3RyaW5nXTogTWFpbkZvcm19ID0ge307XG4gIGZvciAobGV0IGkgPSBmb3Jtc0IubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICBjb25zdCB2YWwgPSBmb3Jtc0JbaV0gJiYgZm9ybXNCW2ldW2tleUJdO1xuICAgIGlmICh2YWwgIT0gbnVsbCkge1xuICAgICAgaW5kZXhCW1N0cmluZyh2YWwpXSA9IGZvcm1zQltpXTtcbiAgICB9XG4gIH1cbiAgY29uc3QgcmVzOiBNYWluRm9ybVtdID0gW107XG4gIGZvciAoY29uc3QgZm9ybUEgb2YgZm9ybXNBKSB7XG4gICAgY29uc3QgdmFsID0gZm9ybUEgJiYgZm9ybUFba2V5QV07XG4gICAgY29uc3QgZm9ybUIgPSBpbmRleEJbU3RyaW5nKHZhbCldO1xuICAgIGlmICh2YWwgPT0gbnVsbCB8fCBmb3JtQiA9PSBudWxsKSB7XG4gICAgICByZXMucHVzaChmb3JtQSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgY29uc3QgcmVwc0EgPSBmb3JtQS5yZXBzIHx8IHt9O1xuICAgIGNvbnN0IHJlcHNCID0gZm9ybUIucmVwcyB8fCB7fTtcbiAgICBpZiAoc3Via2V5QSAhPSBudWxsKSB7XG4gICAgICBjb25zdCBhbGxSZXBzQiA9IGFsbFJlcHMoZm9ybUIpO1xuICAgICAgZm9yIChjb25zdCBrIGluIHJlcHNBKSB7XG4gICAgICAgIHJlcHNBW2tdID0gSk9JTl9GT1JNUyhyZXBzQVtrXSwgYWxsUmVwc0IsIHN1YmtleUEsIHN1YmtleUIpIGFzIEZvcm1bXTtcbiAgICAgICAgZm9ybUFbYGFqZl8ke2t9X2NvdW50YF0gPSByZXBzQVtrXS5sZW5ndGg7XG4gICAgICB9XG4gICAgfVxuICAgIHJlcy5wdXNoKHsuLi5mb3JtQiwgLi4uZm9ybUEsIHJlcHM6IHsuLi5yZXBzQiwgLi4ucmVwc0F9fSk7XG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBhcnJheSBvYnRhaW5lZCBieSBldmFsdWF0aW5nIGV4cHJlc3Npb24gZm9yIGV2ZXJ5IHJlcGV0aXRpb24gb2YgZm9ybS5cbiAqXG4gKiBAZXhwb3J0XG4gKiBAcGFyYW0ge01haW5Gb3JtfSBmb3JtXG4gKiBAcGFyYW0ge3N0cmluZ30gZXhwcmVzc2lvblxuICogQHJldHVybiB7Kn0gIHthbnlbXX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIEZST01fUkVQUyhmb3JtOiBNYWluRm9ybSwgZXhwcmVzc2lvbjogRnVuY3xzdHJpbmcpOiBhbnlbXSB7XG4gIGlmICh0eXBlb2YoZXhwcmVzc2lvbikgPT09ICdzdHJpbmcnKSB7XG4gICAgZXhwcmVzc2lvbiA9IGNyZWF0ZUZ1bmN0aW9uKGV4cHJlc3Npb24pO1xuICB9XG4gIHJldHVybiBhbGxSZXBzKGZvcm0gfHwge30pLm1hcChyZXAgPT5cbiAgICAoZXhwcmVzc2lvbiBhcyBGdW5jKSh7Li4uZm9ybSwgLi4ucmVwfSlcbiAgKTtcbn1cblxuLyoqXG4gKiBEZXByZWNhdGVkLiBVc2UgSU5DTFVERVNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIElTSU4oZGF0YXNldDogYW55W10sIHZhbHVlOiBhbnkpOiBib29sZWFuIHtcbiAgaWYgKGRhdGFzZXQgPT0gbnVsbCB8fCB2YWx1ZSA9PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiBkYXRhc2V0LmluZGV4T2YodmFsdWUpID49IDA7XG59XG5cbi8qKlxuICogQXBwbGllcyB0aGUgb3BlcmF0b3IgdG8gZXZlcnkgcGFpciBvZiBlbGVtZW50cyAoYXJyYXlBW2ldLCBhcnJheUJbaV0pLFxuICogcmV0dXJuaW5nIHRoZSBhcnJheSBvZiByZXN1bHRzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gT1AoYXJyYXlBOiBhbnlbXSwgYXJyYXlCOiBhbnlbXSwgb3BlcmF0b3I6ICgoYTogYW55LCBiOiBhbnkpID0+IGFueSl8c3RyaW5nKTogYW55W10ge1xuICBpZiAodHlwZW9mKG9wZXJhdG9yKSA9PT0gJ3N0cmluZycpIHtcbiAgICBjb25zdCBmdW5jID0gY3JlYXRlRnVuY3Rpb24ob3BlcmF0b3IpO1xuICAgIG9wZXJhdG9yID0gKGVsZW1BLCBlbGVtQikgPT4gZnVuYyh7ZWxlbUEsIGVsZW1CfSk7XG4gIH1cbiAgY29uc3QgcmVzOiBhbnlbXSA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IE1hdGgubWluKGFycmF5QS5sZW5ndGgsIGFycmF5Qi5sZW5ndGgpOyBpKyspIHtcbiAgICBjb25zdCB2YWwgPSBvcGVyYXRvcihhcnJheUFbaV0sIGFycmF5QltpXSk7XG4gICAgcmVzLnB1c2godmFsKTtcbiAgfVxuICByZXR1cm4gcmVzO1xufVxuXG4vKipcbiAqIEdpdmVuIGFuIGFycmF5IG9mIHZhbHVlcywgcmV0dXJucyB0aGUgY29ycmVzcG9uZGluZyBhcnJheSBvZiBsYWJlbHMsXG4gKiBhcyBzcGVjaWZpZWQgYnkgdGhlIGNob2ljZXMgb3JpZ2luIGluIHNjaGVtYS5cbiAqXG4gKiBAZXhwb3J0XG4gKiBAcGFyYW0geyp9IHNjaGVtYVxuICogQHBhcmFtIHtzdHJpbmdbXX0gdmFsdWVzXG4gKiBAcmV0dXJuIHsqfSAge3N0cmluZ1tdfVxuICovXG5leHBvcnQgZnVuY3Rpb24gR0VUX0xBQkVMUyhzY2hlbWE6IGFueSwgdmFsdWVzOiBzdHJpbmdbXSk6IHN0cmluZ1tdIHtcbiAgY29uc3QgY2hvaWNlTGFiZWxzID0gZXh0cmFjdExhYmVsc0J5U2NoZW1hQ2hvaWNlcyhzY2hlbWEpO1xuICByZXR1cm4gdmFsdWVzLm1hcCh2YWwgPT4gY2hvaWNlTGFiZWxzW3ZhbF0gIT0gbnVsbCA/IGNob2ljZUxhYmVsc1t2YWxdIDogdmFsKTtcbn1cbiJdfQ==