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
    MAX: { fn: MAX },
    MEDIAN: { fn: MEDIAN },
    MODE: { fn: MODE },
    ALL_VALUES_OF: { fn: ALL_VALUES_OF },
    REPEAT: { fn: REPEAT },
    EVALUATE: { fn: EVALUATE },
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
    const identifiers = getCodeIdentifiers(formula, true);
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
export function ALL_VALUES_OF(forms, field) {
    forms = (forms || []).filter(f => f != null);
    const allreps = forms;
    for (const form of forms) {
        allreps.push(...allReps(form));
    }
    return [...new Set(allreps.filter(f => f[field] != null).map(f => String(f[field])))];
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
 * Returns the number of forms for which filterExpression evaluates to true,
 * for the form itself or for any of its repetitions.
 */
export function COUNT_FORMS(forms, expression = 'true') {
    forms = (forms || []).filter(f => f != null);
    if (expression === 'true') {
        return forms.length;
    }
    let count = 0;
    for (const form of forms) {
        if (evaluateExpression(expression, form)) {
            count++;
            continue;
        }
        for (const rep of allReps(form)) {
            if (evaluateExpression(expression, { ...form, ...rep })) {
                count++;
                break;
            }
        }
    }
    return count;
}
/**
 * Counts the forms and all of their repetitions for which the expression evaluates to true.
 */
export function COUNT_REPS(forms, expression = 'true') {
    forms = (forms || []).filter(f => f != null);
    let count = 0;
    for (const form of forms) {
        if (evaluateExpression(expression, form)) {
            count++;
        }
        for (const rep of allReps(form)) {
            if (evaluateExpression(expression, { ...form, ...rep })) {
                count++;
            }
        }
    }
    return count;
}
/**
 * Counts the different values that the specified field takes in the forms (and their repetitions).
 */
export function COUNT_FORMS_UNIQUE(forms, field, expression = 'true') {
    forms = (forms || []).filter(f => f != null);
    let values = [];
    for (const form of forms) {
        if (form[field] != null && evaluateExpression(expression, form)) {
            values.push(form[field]);
        }
        for (const rep of allReps(form)) {
            if (rep[field] != null && evaluateExpression(expression, { ...form, ...rep })) {
                values.push(rep[field]);
            }
        }
    }
    return [...new Set(values)].length;
}
function getNumericValues(forms, field, expression = 'true') {
    forms = (forms || []).filter(f => f != null);
    let values = [];
    for (const form of forms) {
        const val = form[field];
        if (val != null && !isNaN(Number(val)) && evaluateExpression(expression, form)) {
            values.push(Number(val));
        }
        for (const rep of allReps(form)) {
            const val = rep[field];
            if (val != null && !isNaN(Number(val)) && evaluateExpression(expression, { ...form, ...rep })) {
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
export function SUM(forms, field, expression = 'true') {
    const values = getNumericValues(forms, field, expression);
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
export function MEAN(forms, field, expression = 'true') {
    const values = getNumericValues(forms, field, expression);
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
    return Number.isFinite(res) ? `${ROUND(res)}%` : 'infinite';
}
/**
 * Evaluates the expression in the last form by date.
 */
export function LAST(forms, expression, date = 'created_at') {
    forms = (forms || []).filter(f => f != null).sort((a, b) => {
        const dateA = new Date(b[date]).getTime();
        const dateB = new Date(a[date]).getTime();
        return dateA - dateB;
    });
    if (forms.length === 0 || expression == null) {
        return undefined;
    }
    return evaluateExpression(expression, forms[forms.length - 1]);
}
/**
 * Computes the max value of the field.
 */
export function MAX(forms, field, expression = 'true') {
    const values = getNumericValues(forms, field, expression);
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
export function MEDIAN(forms, field, expression = 'true') {
    const values = getNumericValues(forms, field, expression).sort();
    if (values.length === 0) {
        return NaN;
    }
    return values[Math.floor(values.length / 2)];
}
/**
 * Computes the mode value of the field.
 */
export function MODE(forms, field, expression = 'true') {
    const values = getNumericValues(forms, field, expression);
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
 *
 * @param forms the form data
 * @param iterations all values of iteration
 * @param fn the fuction of expression-utils to apply at iteration
 * @param param1 first param of fn
 * @param param2 second param of fn
 * @returns the result of fn applied to all values param conditions
 * &current is an anchor key, The params with &current will be modified with the iteration values.
 */
export function REPEAT(forms, iterations, fn, param1, param2 = 'true') {
    const res = [];
    const newExp1 = param1 != null && param1.includes('current')
        ? (v) => param1.split('current').join(JSON.stringify(v))
        : () => param1;
    const newExp2 = param2 != null && param2.includes('current')
        ? (v) => param2.split('current').join(JSON.stringify(v))
        : () => param2;
    iterations.forEach(v => {
        const vv = fn(forms, newExp1(v), newExp2(v));
        res.push(vv);
    });
    return res;
}
function buildFn(expression) {
    return (v) => {
        const newExp = expression
            .split('ajf_form')
            .join(`${JSON.stringify(v)}`)
            .split('current')
            .join(`${JSON.stringify(v)}`);
        return newExp;
    };
}
/**
 * this function allow to define a new attribute of mainform.
 * the attribute field will be added on every form and it takes the result of expression calculated
 * for every mainform
 *
 * @export
 * @param {MainForm[]} formList
 * @param {string} field
 * @param {string} expression
 * @return {*}  {MainForm[]}
 */
export function APPLY(formList, field, expression) {
    const expFn = buildFn(expression);
    formList = cloneMainForms(formList);
    for (let i = 0; i < formList.length; i++) {
        if (formList[i] == null) {
            continue;
        }
        if (formList[i].reps != null) {
            formList[i][field] = evaluateExpression(expFn(formList[i]), formList[i]);
        }
    }
    return formList;
}
/**
 * this function round a number,
 * if you need can be define de digits of round
 *
 * @export
 * @param {(number | string)} num
 * @param {number} [digits]
 * @return {*}  {number}
 */
export function ROUND(num, digits) {
    return round(num, digits);
}
/**
 * this function evalueate a condition if true return branch1 else branch2
 *
 * @export
 * @param {string} condition
 * @param {*} branch1
 * @param {*} branch2
 * @return {*}  {*}
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
 * This function take a list of forms, an ajf schema and a list of field names as input and builds
 * a data structure that replace a list of label matched inside a schema choiche origins.
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
 *
 * @param {MainForm[]} formList a set of main forms
 * @param {string} expression to be evaluated, also with report variables values.
 * @return {*}  {MainForm[]}
 */
export function FILTER_BY_VARS(formList, expression) {
    return FILTER_BY(formList, expression);
}
/**
 * This function build a partition of formList by execution of expression.
 * For every mainForm the expression match mainform field and replace it.
 * If the evaluation of expression is true the mainForm was added to partition
 * (that becouse the expression don't has repeating slide fields) else if
 * there are reps for every rep the expression is updated with replacing of
 * repeating slide instance fields and evaluated, if true was added to partition.
 * All ajf attributes wad updated. /TODO
 *
 *
 * @param {MainForm[]} formList a set of main forms
 * @param {string} expression to be evaluated. that can be able to contains another
 * hindikit functions or mainForm fields or reps fields.
 * @return {*}  {MainForm[]}
 */
export function FILTER_BY(formList, expression) {
    const forms = cloneMainForms(formList || []).filter(f => f != null);
    const identifiers = [...new Set(getCodeIdentifiers(expression, true))];
    let res = [];
    if (expression === 'true') {
        return forms;
    }
    if (forms.length === 0) {
        return [];
    }
    for (let i = 0; i < forms.length; i++) {
        const mainForm = forms[i];
        let expr = expression;
        if (mainForm == null) {
            res.push(mainForm);
            continue;
        }
        /* replace main form field inside expression */
        identifiers.forEach(identifier => {
            const change = mainForm[identifier] ? mainForm[identifier] : null;
            if (change) {
                expr = expr.split(identifier).join(JSON.stringify(change));
            }
        });
        /* if that's already true push it in res */
        if (evaluateExpression(expr, mainForm)) {
            res.push(mainForm);
            continue;
        }
        let newReps;
        const childKeys = Object.keys(mainForm.reps);
        childKeys.forEach(childKey => {
            const currentReps = mainForm.reps[childKey]
                .filter((form) => {
                let repExpr = expr;
                /* replace rep field inside expression */
                identifiers.forEach(identifier => {
                    const changeInRep = form[identifier] ? form[identifier] : null;
                    if (changeInRep) {
                        repExpr = repExpr.split(identifier).join(JSON.stringify(changeInRep));
                    }
                });
                return evaluateExpression(repExpr, form);
            })
                .filter(f => f != null);
            if (currentReps.length > 0) {
                newReps = (newReps != null ? newReps : {});
                newReps[childKey] = currentReps;
            }
            mainForm[`ajf_${childKey}_count`] = currentReps.length;
        });
        if (newReps == null) {
            res.push(null);
        }
        else {
            mainForm.reps = newReps;
            res.push(mainForm);
        }
    }
    return res;
}
/**
 * return the today date
 *
 * @export
 * @param {string} [format='yyyy-MM-dd']
 * @return {*}  {string}
 */
export function TODAY(format = 'yyyy-MM-dd') {
    return dateFns.format(new Date(), format);
}
/**
 * UTILITY FUNCTION
 *  this function allow the console log of excel variables.
 * @export
 * @param {*} val
 * @param {string} [text='log: ']
 */
export function CONSOLE_LOG(val, text = 'log: ') {
    console.log(text, val);
}
/**
 * this function take a string date and return the difference in year from dob to today.
 *
 * @export
 * @param {(string | null)} dob
 * @return {*}  {number}
 */
export function GET_AGE(dob) {
    if (dob == null)
        return +'<'; // need for generate false funcion in evaluateExpression
    const date = new Date(dob);
    const age = dateFns.differenceInYears(new Date(), date);
    return age;
}
/**
 * this function returns reps length if reps in defined or the length of dataset if dataset is array-
 *
 * @export
 * @param {(MainForm | any[])} dataset
 * @return {*}  {number}
 */
export function LEN(dataset) {
    if (dataset == null) {
        return 0;
    }
    if (dataset.reps != null) {
        const mainForm = dataset;
        const reps = Object.keys(mainForm.reps)
            .map(key => mainForm.reps[key].flat())
            .flat();
        return reps.length;
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
 * return true if date is before then dateToCompare
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
 * return true if date is after then dateToCompare
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
 * return true if date is whithin interval from dateStart to dateEnd
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
 * compare a date with two dates interval. Return '-1' (or the first element of labels array) if date
 * is before the dateStart, '1' (or the second element) if date is after the dateEnd
 * or '0' (or the last element) if date is within inteval.
 *
 * @export
 * @param {string} date
 * @param {string} dateStart
 * @param {string} dateEnd
 * @param {string[]} labels an optional array of string for the output values
 * @return {*}  {string}
 */
export function COMPARE_DATE(date, dateStart, dateEnd, labels) {
    let res = '';
    const dateToCompare = dateFns.parseISO(date);
    const dateA = dateFns.parseISO(dateStart);
    const dateB = dateFns.parseISO(dateEnd);
    const interval = {
        start: dateA,
        end: dateB,
    };
    if (labels == null) {
        labels = ['-1', '1', '0'];
    }
    if (dateFns.isBefore(dateToCompare, dateA)) {
        res = labels[0];
    }
    else if (dateFns.isAfter(dateToCompare, dateB)) {
        res = labels[1];
    }
    else if (dateFns.isWithinInterval(dateToCompare, interval)) {
        res = labels[2];
    }
    return res;
}
/**
 * this function extend formsA dataset.
 * search all match of keyA in formsB, if found if merge formA and formB.
 *
 * @export
 * @param {string} keyA
 * @param {string} [keyB]
 * @return {*}
 */
export function JOIN_FORMS(formsA, formsB, keyA, keyB) {
    formsA = cloneMainForms(formsA);
    formsB = cloneMainForms(formsB);
    const mergedForms = [];
    if (keyA == null || formsA == null || formsA.length === 0) {
        return mergedForms;
    }
    if (keyB == null) {
        keyB = keyA;
    }
    if (formsB == null || formsB.length === 0) {
        return formsA;
    }
    for (let i = 0; i < formsA.length; i++) {
        const formA = formsA[i];
        const keyAValue = formA[keyA];
        let mergedForm = { ...formA };
        if (formA == null || keyAValue == null) {
            mergedForms.push(formA);
            continue;
        }
        for (let j = 0; j < formsB.length; j++) {
            const formB = formsB[j];
            const keyBValue = formB[keyB];
            if (formB == null || keyBValue == null) {
                continue;
            }
            if (keyAValue === keyBValue) {
                mergedForm = { ...formA, ...formB };
                if (formA.reps != null && formB.reps != null) {
                    mergedForm.reps = {
                        ...formA.reps,
                        ...formB.reps,
                    };
                }
                break;
            }
        }
        mergedForms.push(mergedForm);
    }
    return mergedForms;
}
/**
 * like JOIN_FORMS but extends the behaviour on the reps.
 * search all match of subKeyA in formB
 *
 * @export
 * @param {MainForm[]} formsA
 * @param {MainForm[]} formsB
 * @param {string} keyA
 * @param {string} keyB
 * @param {string} subKeyA
 * @param {string} [subKeyB]
 * @return {*}  {MainForm[]}
 */
export function JOIN_REPEATING_SLIDES(formsA, formsB, keyA, keyB, subKeyA, subKeyB) {
    const mergedForms = [];
    formsA = cloneMainForms(formsA);
    formsB = cloneMainForms(formsB);
    if (keyA == null || formsA == null || formsA.length === 0) {
        return mergedForms;
    }
    if (keyB == null) {
        keyB = keyA;
    }
    if (formsB == null || formsB.length === 0) {
        return formsA;
    }
    if (subKeyA == null) {
        return JOIN_FORMS(formsA, formsB, keyA, keyB);
    }
    if (subKeyB == null) {
        subKeyB = subKeyA;
    }
    for (let i = 0; i < formsA.length; i++) {
        const formA = formsA[i];
        const keyAValue = formA[keyA];
        let mergedForm = { ...formA };
        if (formA == null || keyAValue == null) {
            mergedForms.push(formA);
            continue;
        }
        for (let j = 0; j < formsB.length; j++) {
            const formB = formsB[j];
            const keyBValue = formB[keyB];
            if (formB == null || keyBValue == null) {
                continue;
            }
            if (keyAValue === keyBValue) {
                mergedForm = { ...formA, ...formB };
                mergedForm.reps = { ...formA.reps, ...formB.reps };
                if (formA.reps != null && formB.reps != null) {
                    const mergedReps = {};
                    const childAKeys = Object.keys(formA.reps);
                    const childB = Object.keys(formB.reps)
                        .map(key => formB.reps[key].flat())
                        .flat();
                    childAKeys.forEach(key => {
                        const instance = formA.reps[key];
                        mergedReps[key] = JOIN_FORMS(instance, childB, subKeyA, subKeyB);
                    });
                    mergedForm.reps = mergedReps;
                }
                break;
            }
        }
        mergedForms.push(mergedForm);
    }
    return mergedForms;
}
/**
 * this function extract an array of evaluated expression from main form reps.
 *
 * @export
 * @param {MainForm} mainForm
 * @param {string} expression
 * @return {*}  {any[]}
 */
export function FROM_REPS(mainForm, expression) {
    const res = [];
    if (mainForm != null && mainForm.reps != null) {
        const reps = Object.keys(mainForm.reps)
            .map(key => mainForm.reps[key].flat())
            .flat();
        reps.forEach(child => {
            res.push(evaluateExpression(expression, child));
        });
    }
    return res;
}
/**
 * this function return true if value is inside of dataset
 *
 * @export
 * @param {any[]} dataset
 * @param {*} value
 * @return {*}  {boolean}
 */
export function ISIN(dataset, value) {
    if (dataset == null || value == null) {
        return false;
    }
    return dataset.indexOf(value) >= 0;
}
/**
 * the lengths of the datasets are assumed to be the same.
 * this function return an array list of calculated values.
 * each element of the array is calculated by replacing elemA with the current element of a
 * and elemB with the current element of b inside the expression.
 *
 * @export
 * @param {number[]} datasetA
 * @param {number[]} datasetB
 * @param {string} expression
 * @return {*}  {number[]}
 */
export function OP(datasetA, datasetB, expression) {
    const res = [];
    if (datasetA == null || datasetB.length > datasetA.length) {
        return [];
    }
    if (datasetB == null) {
        return datasetA;
    }
    for (let i = 0; i < datasetA.length; i++) {
        const elemA = datasetA[i] || 0;
        const elemB = datasetB[i] || 0;
        const expr = expression
            .split('elemA')
            .join(JSON.stringify(elemA))
            .split('elemB')
            .join(JSON.stringify(elemB));
        res.push(evaluateExpression(expr));
    }
    return res;
}
/**
 * this function take a ajf schema and a list of values as input and
 * returns a list of label matched inside a schema choiche origins.
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwcmVzc2lvbi11dGlscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvbW9kZWxzL3NyYy91dGlscy9leHByZXNzaW9uLXV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUdILE9BQU8sS0FBSyxPQUFPLE1BQU0sVUFBVSxDQUFDO0FBQ3BDLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxTQUFTLENBQUM7QUFDcEMsT0FBTyxLQUFLLFNBQVMsTUFBTSxRQUFRLENBQUM7QUFJcEMsSUFBSSxXQUFXLEdBQVEsRUFBRSxDQUFDO0FBRTFCLE1BQU0sTUFBTSxHQUFHLFNBQVMsQ0FBQyxPQUFPLElBQUksU0FBUyxDQUFDO0FBWTlDLFNBQVMsT0FBTyxDQUFDLElBQWM7SUFDN0IsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksRUFBRTtRQUNyQixPQUFPLEVBQUUsQ0FBQztLQUNYO0lBQ0QsTUFBTSxJQUFJLEdBQVcsRUFBRSxDQUFDO0lBQ3hCLEtBQUssTUFBTSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtRQUMzQixNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztLQUNqQjtJQUNELE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQztBQUVELE1BQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQztBQUVwQixNQUFNLENBQUMsTUFBTSxrQkFBa0IsR0FBRyxDQUNoQyxNQUFjLEVBQ2QscUJBQThCLEtBQUssRUFDekIsRUFBRTtJQUNaLE1BQU0sV0FBVyxHQUFHLEVBQWMsQ0FBQztJQUNuQyxJQUFJO1FBQ0YsV0FBVyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsRUFBRTtZQUM3QixPQUFPLEVBQUUsQ0FBQyxLQUFL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Q0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUNsRixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkNvbnRleHR9IGZyb20gJ0BhamYvY29yZS9jb21tb24nO1xuaW1wb3J0ICogYXMgZGF0ZUZucyBmcm9tICdkYXRlLWZucyc7XG5pbXBvcnQge3BhcnNlU2NyaXB0fSBmcm9tICdtZXJpeWFoJztcbmltcG9ydCAqIGFzIG51bWJyb01vZCBmcm9tICdudW1icm8nO1xuaW1wb3J0IHtBamZUYWJsZUNlbGx9IGZyb20gJ0BhamYvY29yZS90YWJsZSc7XG5pbXBvcnQge0FqZlZhbGlkYXRpb25Gbn0gZnJvbSAnLi4vaW50ZXJmYWNlL3ZhbGlkYXRpb24tZnVuY3Rpb24nO1xuXG5sZXQgZXhlY0NvbnRleHQ6IGFueSA9IHt9O1xuXG5jb25zdCBudW1icm8gPSBudW1icm9Nb2QuZGVmYXVsdCB8fCBudW1icm9Nb2Q7XG5leHBvcnQgaW50ZXJmYWNlIEZvcm0ge1xuICBba2V5OiBzdHJpbmddOiBzdHJpbmcgfCBudW1iZXIgfCBudWxsO1xufVxuZXhwb3J0IGludGVyZmFjZSBJbnN0YW5jZXMge1xuICBbaW5zdGFuY2U6IHN0cmluZ106IEZvcm1bXTtcbn1cbmV4cG9ydCBpbnRlcmZhY2UgTWFpbkZvcm0ge1xuICBba2V5OiBzdHJpbmddOiBzdHJpbmcgfCBudW1iZXIgfCBib29sZWFuIHwgbnVsbCB8IEluc3RhbmNlcyB8IHVuZGVmaW5lZCB8IG51bGw7XG4gIHJlcHM/OiBJbnN0YW5jZXM7XG59XG5cbmZ1bmN0aW9uIGFsbFJlcHMoZm9ybTogTWFpbkZvcm0pOiBGb3JtW10ge1xuICBpZiAoZm9ybS5yZXBzID09IG51bGwpIHtcbiAgICByZXR1cm4gW107XG4gIH1cbiAgY29uc3QgcmVwczogRm9ybVtdID0gW107XG4gIGZvciAoY29uc3Qga2V5IGluIGZvcm0ucmVwcykge1xuICAgIGNvbnN0IHIgPSBmb3JtLnJlcHNba2V5XTtcbiAgICByZXBzLnB1c2goLi4ucik7XG4gIH1cbiAgcmV0dXJuIHJlcHM7XG59XG5cbmNvbnN0IE1BWF9SRVBTID0gMzA7XG5cbmV4cG9ydCBjb25zdCBnZXRDb2RlSWRlbnRpZmllcnMgPSAoXG4gIHNvdXJjZTogc3RyaW5nLFxuICBpbmNsdWRlRG9sbGFyVmFsdWU6IGJvb2xlYW4gPSBmYWxzZSxcbik6IHN0cmluZ1tdID0+IHtcbiAgY29uc3QgaWRlbnRpZmllcnMgPSBbXSBhcyBzdHJpbmdbXTtcbiAgdHJ5IHtcbiAgICBwYXJzZVNjcmlwdChzb3VyY2UudG9TdHJpbmcoKSwge1xuICAgICAgb25Ub2tlbjogKHRva2VuLCBzdGFydCwgZW5kKSA9PiB7XG4gICAgICAgIGlmICh0b2tlbiA9PSAnSWRlbnRpZmllcicpIHtcbiAgICAgICAgICBjb25zdCBpZGVudGlmaWVyID0gc291cmNlLnRvU3RyaW5nKCkuc3Vic3RyaW5nKHN0YXJ0LCBlbmQpO1xuICAgICAgICAgIGlmIChpbmNsdWRlRG9sbGFyVmFsdWUgfHwgaWRlbnRpZmllciAhPT0gJyR2YWx1ZScpIHtcbiAgICAgICAgICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgIH0pO1xuICB9IGNhdGNoIChlKSB7XG4gICAgY29uc29sZS5sb2coc291cmNlKTtcbiAgICBjb25zb2xlLmxvZyhlKTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcnMuc29ydCgoaTEsIGkyKSA9PiBpMi5sb2NhbGVDb21wYXJlKGkxKSk7XG59O1xuXG5leHBvcnQgY29uc3QgZGF0ZVV0aWxzID0ge1xuICBhZGREYXlzOiBkYXRlRm5zLmFkZERheXMsXG4gIGFkZE1vbnRoczogZGF0ZUZucy5hZGRNb250aHMsXG4gIGFkZFllYXJzOiBkYXRlRm5zLmFkZFllYXJzLFxuICBlbmRPZklTT1dlZWs6IGRhdGVGbnMuZW5kT2ZJU09XZWVrLFxuICBmb3JtYXQ6IGRhdGVGbnMuZm9ybWF0LFxuICBnZXREYXk6IGRhdGVGbnMuZ2V0RGF5LFxuICBwYXJzZTogZGF0ZUZucy5wYXJzZUlTTyxcbiAgc3RhcnRPZk1vbnRoOiBkYXRlRm5zLnN0YXJ0T2ZNb250aCxcbiAgc3RhcnRPZklTT1dlZWs6IGRhdGVGbnMuc3RhcnRPZklTT1dlZWssXG4gIGlzQmVmb3JlOiBkYXRlRm5zLmlzQmVmb3JlLFxufTtcblxuZXhwb3J0IGNsYXNzIEFqZkV4cHJlc3Npb25VdGlscyB7XG4gIC8vIFRPRE8gd2hhdCBpcyBpdCBmb3JcbiAgc3RhdGljIFVUSUxfRlVOQ1RJT05TID0gJyc7XG4gIC8qKlxuICAgKiBJdCBpcyBhIGtleS12YWx1ZSBkaWN0aW9uYXJ5LCB0aGF0IG1hcHBpbmcgYWxsIEFqZiB2YWxpZGF0aW9uIGZ1bmN0aW9ucy5cbiAgICovXG4gIHN0YXRpYyB1dGlsczoge1tuYW1lOiBzdHJpbmddOiBBamZWYWxpZGF0aW9uRm59ID0ge1xuICAgIGRpZ2l0Q291bnQ6IHtmbjogZGlnaXRDb3VudH0sXG4gICAgZGVjaW1hbENvdW50OiB7Zm46IGRlY2ltYWxDb3VudH0sXG4gICAgaXNJbnQ6IHtmbjogaXNJbnR9LFxuICAgIG5vdEVtcHR5OiB7Zm46IG5vdEVtcHR5fSxcbiAgICB2YWx1ZUluQ2hvaWNlOiB7Zm46IHZhbHVlSW5DaG9pY2V9LFxuICAgIHNjYW5Hcm91cEZpZWxkOiB7Zm46IHNjYW5Hcm91cEZpZWxkfSxcbiAgICBzdW06IHtmbjogc3VtfSxcbiAgICBkYXRlT3BlcmF0aW9uczoge2ZuOiBkYXRlT3BlcmF0aW9uc30sXG4gICAgcm91bmQ6IHtmbjogcm91bmR9LFxuICAgIGV4dHJhY3RBcnJheToge2ZuOiBleHRyYWN0QXJyYXl9LFxuICAgIGV4dHJhY3RTdW06IHtmbjogZXh0cmFjdFN1bX0sXG4gICAgZXh0cmFjdEFycmF5U3VtOiB7Zm46IGV4dHJhY3RBcnJheVN1bX0sXG4gICAgZHJhd1RocmVzaG9sZDoge2ZuOiBkcmF3VGhyZXNob2xkfSxcbiAgICBleHRyYWN0RGF0ZXM6IHtmbjogZXh0cmFjdERhdGVzfSxcbiAgICBsYXN0UHJvcGVydHk6IHtmbjogbGFzdFByb3BlcnR5fSxcbiAgICBzdW1MYXN0UHJvcGVydGllczoge2ZuOiBzdW1MYXN0UHJvcGVydGllc30sXG4gICAgY2FsY3VsYXRlVHJlbmRQcm9wZXJ0eToge2ZuOiBjYWxjdWxhdGVUcmVuZFByb3BlcnR5fSxcbiAgICBjYWxjdWxhdGVUcmVuZEJ5UHJvcGVydGllczoge2ZuOiBjYWxjdWxhdGVUcmVuZEJ5UHJvcGVydGllc30sXG4gICAgY2FsY3VsYXRlQXZnUHJvcGVydHk6IHtmbjogY2FsY3VsYXRlQXZnUHJvcGVydHl9LFxuICAgIGNhbGN1bGF0ZUF2Z1Byb3BlcnR5QXJyYXk6IHtmbjogY2FsY3VsYXRlQXZnUHJvcGVydHlBcnJheX0sXG4gICAgYWxlcnQ6IHtmbjogYWxlcnR9LFxuICAgIGZvcm1hdE51bWJlcjoge2ZuOiBmb3JtYXROdW1iZXJ9LFxuICAgIGZvcm1hdERhdGU6IHtmbjogZm9ybWF0RGF0ZX0sXG4gICAgaXNvTW9udGg6IHtmbjogaXNvTW9udGh9LFxuICAgIGdldENvb3JkaW5hdGU6IHtmbjogZ2V0Q29vcmRpbmF0ZX0sXG4gICAgTWF0aDoge2ZuOiBNYXRofSxcbiAgICBwYXJzZUludDoge2ZuOiBwYXJzZUludH0sXG4gICAgcGFyc2VGbG9hdDoge2ZuOiBwYXJzZUZsb2F0fSxcbiAgICBwYXJzZURhdGU6IHtmbjogZGF0ZVV0aWxzLnBhcnNlfSxcbiAgICBEYXRlOiB7Zm46IERhdGV9LFxuICAgIHBsYWluQXJyYXk6IHtmbjogcGxhaW5BcnJheX0sXG4gICAgQ09VTlRfRk9STVM6IHtmbjogQ09VTlRfRk9STVN9LFxuICAgIENPVU5UX0ZPUk1TX1VOSVFVRToge2ZuOiBDT1VOVF9GT1JNU19VTklRVUV9LFxuICAgIENPVU5UX1JFUFM6IHtmbjogQ09VTlRfUkVQU30sXG4gICAgU1VNOiB7Zm46IFNVTX0sXG4gICAgTUVBTjoge2ZuOiBNRUFOfSxcbiAgICBQRVJDRU5UOiB7Zm46IFBFUkNFTlR9LFxuICAgIExBU1Q6IHtmbjogTEFTVH0sXG4gICAgTUFYOiB7Zm46IE1BWH0sXG4gICAgTUVESUFOOiB7Zm46IE1FRElBTn0sXG4gICAgTU9ERToge2ZuOiBNT0RFfSxcbiAgICBBTExfVkFMVUVTX09GOiB7Zm46IEFMTF9WQUxVRVNfT0Z9LFxuICAgIFJFUEVBVDoge2ZuOiBSRVBFQVR9LFxuICAgIEVWQUxVQVRFOiB7Zm46IEVWQUxVQVRFfSxcbiAgICBidWlsZERhdGFzZXQ6IHtmbjogYnVpbGREYXRhc2V0fSxcbiAgICBidWlsZEFsaWduZWREYXRhc2V0OiB7Zm46IGJ1aWxkQWxpZ25lZERhdGFzZXR9LFxuICAgIGJ1aWxkRm9ybURhdGFzZXQ6IHtmbjogYnVpbGRGb3JtRGF0YXNldH0sXG4gICAgYnVpbGRBbGlnbmVkRm9ybURhdGFzZXQ6IHtmbjogYnVpbGRBbGlnbmVkRm9ybURhdGFzZXR9LFxuICAgIGJ1aWxkV2lkZ2V0RGF0YXNldDoge2ZuOiBidWlsZFdpZGdldERhdGFzZXR9LFxuICAgIGJ1aWxkV2lkZ2V0RGF0YXNldFdpdGhEaWFsb2c6IHtmbjogYnVpbGRXaWRnZXREYXRhc2V0V2l0aERpYWxvZ30sXG4gICAgRklMVEVSX0JZX1ZBUlM6IHtmbjogRklMVEVSX0JZX1ZBUlN9LFxuICAgIEZJTFRFUl9CWToge2ZuOiBGSUxURVJfQll9LFxuICAgIElTX0JFRk9SRToge2ZuOiBJU19CRUZPUkV9LFxuICAgIElTX0FGVEVSOiB7Zm46IElTX0FGVEVSfSxcbiAgICBJU19XSVRISU5fSU5URVJWQUw6IHtmbjogSVNfV0lUSElOX0lOVEVSVkFMfSxcbiAgICBDT01QQVJFX0RBVEU6IHtmbjogQ09NUEFSRV9EQVRFfSxcbiAgICBBUFBMWToge2ZuOiBBUFBMWX0sXG4gICAgVE9EQVk6IHtmbjogVE9EQVl9LFxuICAgIEdFVF9BR0U6IHtmbjogR0VUX0FHRX0sXG4gICAgQlVJTERfREFUQVNFVDoge2ZuOiBCVUlMRF9EQVRBU0VUfSxcbiAgICBKT0lOX0ZPUk1TOiB7Zm46IEpPSU5fRk9STVN9LFxuICAgIExFTjoge2ZuOiBMRU59LFxuICAgIENPTkNBVDoge2ZuOiBDT05DQVR9LFxuICAgIFJFTU9WRV9EVVBMSUNBVEVTOiB7Zm46IFJFTU9WRV9EVVBMSUNBVEVTfSxcbiAgICBKT0lOX1JFUEVBVElOR19TTElERVM6IHtmbjogSk9JTl9SRVBFQVRJTkdfU0xJREVTfSxcbiAgICBGUk9NX1JFUFM6IHtmbjogRlJPTV9SRVBTfSxcbiAgICBJU0lOOiB7Zm46IElTSU59LFxuICAgIE9QOiB7Zm46IE9QfSxcbiAgICBHRVRfTEFCRUxTOiB7Zm46IEdFVF9MQUJFTFN9LFxuICAgIEFQUExZX0xBQkVMUzoge2ZuOiBBUFBMWV9MQUJFTFN9LFxuICAgIFJPVU5EOiB7Zm46IFJPVU5EfSxcbiAgICBDT05TT0xFX0xPRzoge2ZuOiBDT05TT0xFX0xPR30sXG4gIH07XG59XG5cbi8qKlxuICogVVRJTElUWSBGVU5DSU9OXG4gKiBUaGlzIGZ1bmN0aW9uIHByb3ZpZGUgYSBkZWVwIGNvcHkgYnVpbGRlciBvZiBhcnJheSBvZiBtYWluIGZvcm1zLlxuICogVGhhdCdzIGEgY3VzdG9tIGZ1bmN0aW9uIHJlbGF0ZWQgdG8gbWFpbmZvcm1zIHRoYXQgY2FuIGJlIGFibGUgdG8gaW5jcmVhc2UgY29weSBwZXJmb3JtYW5jZS5cbiAqXG4gKiBAcGFyYW0ge01haW5Gb3JtW119IGZvcm1zXG4gKiBAcmV0dXJuIHsqfSAge01haW5Gb3JtW119XG4gKi9cbmZ1bmN0aW9uIGNsb25lTWFpbkZvcm1zKGZvcm1zOiBNYWluRm9ybVtdKTogTWFpbkZvcm1bXSB7XG4gIGxldCByZXM6IE1haW5Gb3JtW10gPSBbXTtcbiAgZm9yIChjb25zdCBmb3JtIG9mIGZvcm1zKSB7XG4gICAgaWYgKGZvcm0gPT0gbnVsbCkge1xuICAgICAgcmVzLnB1c2goZm9ybSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgbGV0IHJlcHM6IEluc3RhbmNlcyA9IHt9O1xuICAgIGlmIChmb3JtLnJlcHMgIT0gbnVsbCkge1xuICAgICAgZm9yIChjb25zdCBrZXkgaW4gZm9ybS5yZXBzKSB7XG4gICAgICAgIHJlcHNba2V5XSA9IFsuLi5mb3JtLnJlcHNba2V5XV07XG4gICAgICB9XG4gICAgfVxuICAgIHJlcy5wdXNoKHsuLi5mb3JtLCByZXBzfSk7XG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cbmV4cG9ydCBmdW5jdGlvbiBldmFsdWF0ZUV4cHJlc3Npb24oXG4gIGV4cHJlc3Npb246IHN0cmluZyxcbiAgY29udGV4dD86IEFqZkNvbnRleHQsXG4gIGZvcmNlRm9ybXVsYT86IHN0cmluZyxcbik6IGFueSB7XG4gIGxldCBmb3JtdWxhID0gZm9yY2VGb3JtdWxhIHx8IGV4cHJlc3Npb24gfHwgJyc7XG4gIGlmIChmb3JtdWxhID09PSAnJykge1xuICAgIHJldHVybiAnJztcbiAgfVxuICBpZiAoZm9ybXVsYSA9PT0gJ3RydWUnKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgaWYgKGZvcm11bGEgPT09ICdmYWxzZScpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKGNvbnRleHQgIT0gbnVsbCAmJiBjb250ZXh0W2Zvcm11bGFdICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gY29udGV4dFtmb3JtdWxhXTtcbiAgfVxuICBpZiAoL15cIlteXCJdKlwiJC8udGVzdChmb3JtdWxhKSkge1xuICAgIHJldHVybiBmb3JtdWxhLnJlcGxhY2UoL15cIit8XCIrJC9nLCAnJyk7XG4gIH1cbiAgY29uc3QgaWRlbnRpZmllcnMgPSBnZXRDb2RlSWRlbnRpZmllcnMoZm9ybXVsYSwgdHJ1ZSk7XG4gIGNvbnN0IGN0eDogYW55W10gPSBbXTtcbiAgaWRlbnRpZmllcnMuZm9yRWFjaCgoa2V5OiBzdHJpbmcpID0+IHtcbiAgICBsZXQgdmFsOiBhbnkgPSBudWxsO1xuICAgIGlmIChjb250ZXh0ICE9IG51bGwgJiYgY29udGV4dFtrZXldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHZhbCA9IGNvbnRleHRba2V5XTtcbiAgICB9IGVsc2UgaWYgKEFqZkV4cHJlc3Npb25VdGlscy51dGlsc1trZXldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnN0IHV0aWwgPSBBamZFeHByZXNzaW9uVXRpbHMudXRpbHNba2V5XTtcbiAgICAgIHZhbCA9IHV0aWwuZm47XG4gICAgfVxuICAgIGN0eC5wdXNoKHZhbCk7XG4gIH0pO1xuICBpZGVudGlmaWVycy5wdXNoKCdleGVjQ29udGV4dCcpO1xuICBjdHgucHVzaChleGVjQ29udGV4dCk7XG5cbiAgdHJ5IHtcbiAgICBsZXQgZiA9IG5ldyBGdW5jdGlvbiguLi5pZGVudGlmaWVycywgYHJldHVybiAke2Zvcm11bGF9YCk7XG4gICAgY29uc3QgcmVzID0gZiguLi5jdHgpO1xuICAgIGYgPSA8YW55Pm51bGw7XG4gICAgcmV0dXJuIHJlcztcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuLyoqXG4gKiBJdCByZXR1cm5zIHRoZSBjb3VudCBvZiBkaWdpdCBpbnNpZGUgeC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRpZ2l0Q291bnQoeDogbnVtYmVyKTogbnVtYmVyIHtcbiAgaWYgKGlzTmFOKHgpIHx8IHR5cGVvZiB4ICE9PSAnbnVtYmVyJykge1xuICAgIHJldHVybiAwO1xuICB9XG4gIGlmICghaXNGaW5pdGUoeCkpIHtcbiAgICByZXR1cm4gSW5maW5pdHk7XG4gIH1cbiAgcmV0dXJuIHgudG9TdHJpbmcoKS5yZXBsYWNlKC9bXjAtOV0vZywgJycpLmxlbmd0aDtcbn1cbi8qKlxuICogSXQgaXMgY291bnQgdGhlIGNvdW50IG9mIGRlY2ltYWwgZGlnaXQgaW5zaWRlIHMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZWNpbWFsQ291bnQoeDogc3RyaW5nIHwgbnVtYmVyKTogbnVtYmVyIHtcbiAgaWYgKHR5cGVvZiB4ID09PSAnc3RyaW5nJykge1xuICAgIHggPSBwYXJzZUZsb2F0KHgpO1xuICB9XG4gIGlmICh0eXBlb2YgeCAhPT0gJ251bWJlcicgfHwgaXNOYU4oeCkpIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuICBjb25zdCBwYXJ0cyA9IHgudG9TdHJpbmcoKS5zcGxpdCgnLicpO1xuICByZXR1cm4gcGFydHMubGVuZ3RoID4gMSA/IHBhcnRzWzFdLmxlbmd0aCA6IDA7XG59XG4vKipcbiAqIEl0IGlzIHRydWUgaWYgeCBpcyBhbiBpbnRlZ2VyLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNJbnQoeDogc3RyaW5nIHwgbnVtYmVyKTogYm9vbGVhbiB7XG4gIGlmICh0eXBlb2YgeCA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gL14tP1xcZCskLy50ZXN0KHgpO1xuICB9XG4gIGlmICh0eXBlb2YgeCA9PT0gJ251bWJlcicpIHtcbiAgICByZXR1cm4gTWF0aC5yb3VuZCh4KSA9PT0geDtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG4vKipcbiAqIEl0IGlzIHRydWUgaWYgeCBpcyBub3QgZW1wdHkuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBub3RFbXB0eSh4OiBhbnkpOiBib29sZWFuIHtcbiAgcmV0dXJuIHR5cGVvZiB4ICE9PSAndW5kZWZpbmVkJyAmJiB4ICE9PSBudWxsID8geC50b1N0cmluZygpLmxlbmd0aCA+IDAgOiBmYWxzZTtcbn1cbi8qKlxuICogSXQgaXMgdHJ1ZSBpZiBhcnJheSBjb250YWlucyB4IG9yIGFycmF5IGlzIGVxdWFsIHRvIHguXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB2YWx1ZUluQ2hvaWNlKGFycmF5OiBhbnlbXSwgeDogYW55KTogYm9vbGVhbiB7XG4gIHJldHVybiAoYXJyYXkgfHwgW10pLmluZGV4T2YoeCkgPiAtMSB8fCBhcnJheSA9PT0geDtcbn1cbi8qKlxuICogSXQgYXBwbGllcyBjYWxsYmFjayBmb3IgcmVwcyB0aW1lcyBhbmQgYWNjdW11bGF0ZSB0aGUgcmVzdWx0IGluIGFjYy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNjYW5Hcm91cEZpZWxkKHJlcHM6IG51bWJlciwgYWNjOiBhbnksIGNhbGxiYWNrOiBhbnkpOiBhbnkge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHJlcHM7IGkrKykge1xuICAgIGFjYyA9IGNhbGxiYWNrKGFjYywgaSk7XG4gIH1cbiAgcmV0dXJuIGFjYztcbn1cbi8qKlxuICogSXQgcmV0dXJucyB0aGUgc3VtIG9mIHRoZSBhcnJheSB2YWx1ZXMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdW0oYXJyYXk6IGFueVtdKTogYW55IHtcbiAgcmV0dXJuIGFycmF5LnJlZHVjZSgoYSwgYikgPT4gYSArIGIsIDApO1xufVxuLyoqXG4gKiBJdCBhcHBsaWVzIGFkZC9yZW1vdmUob3BlcmF0aW9uKSB2IChkYXkvbW9udGgveWVhcilwZXJpb2QgdG8gZHN0cmluZyBhbmQgcmV0dXJuIG5ldyBmb3JtYXQgZGF0ZS5cbiAqL1xuLy8gVE9ETyBjaGVjayBpZiBkZXByZWNhdGVkIGluc3RlYWQgcmVmYWNvdG9yaW5nIHBhcmFtZXRlciB0eXBlXG4vLyBUT0RPIChkU3RyaW5nOiBzdHJpbmd8bnVsbCwgcGVyaW9kOidkYXknfCdtb250aCd8J3llYXInLFxuLy8gVE9ETyBvcGVyYXRpb246ICdhZGQvcmVtb3ZlJyA9ICdhZGQnLCB2Om51bWJlcilcbmV4cG9ydCBmdW5jdGlvbiBkYXRlT3BlcmF0aW9ucyhkU3RyaW5nOiBzdHJpbmcsIHBlcmlvZDogc3RyaW5nLCBvcGVyYXRpb246IHN0cmluZywgdjogYW55KTogc3RyaW5nIHtcbiAgY29uc3QgZm10ID0gJ21tL2RkL3l5eXknO1xuICBsZXQgZCA9IHR5cGVvZiBkU3RyaW5nICE9PSAndW5kZWZpbmVkJyA/IGRhdGVVdGlscy5wYXJzZShkU3RyaW5nKSA6IG5ldyBEYXRlKCk7XG4gIGlmIChvcGVyYXRpb24gPT0gJ3JlbW92ZScpIHtcbiAgICB2ID0gLXY7XG4gIH1cbiAgbGV0IGRhdGVPcDtcbiAgc3dpdGNoIChwZXJpb2QpIHtcbiAgICBjYXNlICdkYXknOlxuICAgICAgZGF0ZU9wID0gZGF0ZVV0aWxzLmFkZERheXM7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdtb250aCc6XG4gICAgICBkYXRlT3AgPSBkYXRlVXRpbHMuYWRkTW9udGhzO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAneWVhcic6XG4gICAgICBkYXRlT3AgPSBkYXRlVXRpbHMuYWRkWWVhcnM7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuICcnO1xuICB9XG4gIHJldHVybiBkYXRlVXRpbHMuZm9ybWF0KGRhdGVPcChkLCB2KSwgZm10KTtcbn1cblxuLyoqXG4gKiBGaXhlZCBkZWNpbWFscyBmb3IgZmxvYXRpbmcgbnVtYmVyXG4gKiBSZXNvbHZlIGZsb2F0IHN1bSBwcm9ibGVtcyBsaWtlIHRoaXM6IDAuMSArIDAuMiA9IDAuMzAwMDAwMDAwMDAwMDAwMDRcbiAqIEBwYXJhbSBudW1cbiAqIEByZXR1cm5zXG4gKi9cbmZ1bmN0aW9uIHRydW5jYXRlMTAobnVtOiBudW1iZXIpIHtcbiAgcmV0dXJuIHBhcnNlRmxvYXQobnVtLnRvRml4ZWQoMTApKTtcbn1cblxuLyoqXG4gKiBJdCByb3VuZHMgdGhlIG51bSB3aXRoIHRoZSB2YWx1ZSBvZiBkaWdpdHNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJvdW5kKG51bTogbnVtYmVyIHwgc3RyaW5nLCBkaWdpdHM/OiBudW1iZXIpOiBudW1iZXIge1xuICBkaWdpdHMgPSBkaWdpdHMgfHwgMDtcbiAgbGV0IGY7XG4gIGlmICh0eXBlb2YgbnVtICE9PSAnbnVtYmVyJykge1xuICAgIHRyeSB7XG4gICAgICBmID0gcGFyc2VGbG9hdChudW0pO1xuICAgIH0gY2F0Y2ggKGUpIHt9XG4gIH0gZWxzZSB7XG4gICAgZiA9IG51bTtcbiAgfVxuICBpZiAoZiA9PSBudWxsIHx8IGlzTmFOKGYpKSB7XG4gICAgZiA9IDA7XG4gIH1cbiAgY29uc3QgbSA9IE1hdGgucG93KDEwLCBkaWdpdHMpO1xuICByZXR1cm4gTWF0aC5yb3VuZChmICogbSkgLyBtO1xufVxuLyoqXG4gKiBJdCBleHRyYWN0cyBwcm9wZXJ0eSBmcm9tIHNvdXJjZS5cbiAqIGZvciBldmVyeSBlbGVtZW50IG9mIHNvdXJjZSBpZiBwcm9wZXJ0eSBhbmQgcHJvcGVydHkyIGFyZSBkZWZpbmVkIHJldHVybiB0aGUgc3VtXG4gKiBlbHNlIGlmIG9ubHkgcHJvcGVydHkgaXMgZGVmaW5lZCByZXR1cm4gaGltLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZXh0cmFjdEFycmF5KHNvdXJjZTogYW55W10sIHByb3BlcnR5OiBzdHJpbmcsIHByb3BlcnR5Mj86IHN0cmluZyk6IGFueVtdIHtcbiAgc291cmNlID0gKHNvdXJjZSB8fCBbXSkuZmlsdGVyKChmOiBhbnkpID0+IGYgIT0gbnVsbCk7XG4gIGNvbnN0IHJlczogYW55W10gPSBbXTtcbiAgZm9yIChjb25zdCBzIG9mIHNvdXJjZSkge1xuICAgIGlmIChzW3Byb3BlcnR5XSAhPSBudWxsICYmIHByb3BlcnR5MiAhPSBudWxsICYmIHNbcHJvcGVydHkyXSAhPSBudWxsKSB7XG4gICAgICByZXMucHVzaChOdW1iZXIoc1twcm9wZXJ0eV0pICsgTnVtYmVyKHNbcHJvcGVydHkyXSkpO1xuICAgIH0gZWxzZSBpZiAoc1twcm9wZXJ0eV0gIT0gbnVsbCkge1xuICAgICAgcmVzLnB1c2goc1twcm9wZXJ0eV0pO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzO1xufVxuLyoqXG4gKiBJdCByZXR1cm5zIHRoZSBzdW0gb2YgYWxsIGRlZmluZWQgcHJvcGVydGllcyBvZiBlYWNoIGVsZW1lbnQgb2Ygc291cmNlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZXh0cmFjdFN1bShzb3VyY2U6IGFueVtdLCBwcm9wZXJ0aWVzOiBzdHJpbmdbXSk6IG51bWJlciB7XG4gIHByb3BlcnRpZXMgPSBbLi4uKHByb3BlcnRpZXMgfHwgW10pXTtcblxuICBsZXQgc3VtVmFsID0gMDtcbiAgZm9yIChjb25zdCBwcm9wIG9mIHByb3BlcnRpZXMpIHtcbiAgICBjb25zdCBhcnJheSA9IGV4dHJhY3RBcnJheShzb3VyY2UsIHByb3ApO1xuICAgIGZvciAoY29uc3QgYSBvZiBhcnJheSkge1xuICAgICAgaWYgKCFpc05hTihOdW1iZXIoYSkpKSB7XG4gICAgICAgIHN1bVZhbCArPSBOdW1iZXIoYSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBzdW1WYWw7XG59XG4vKipcbiAqIEl0IHJldHVybnMgYSBudW1iZXIgYXJyYXkgdGhhdCBjb250YWlucyB0aGUgc3VtIG9mIHByb3BlcnRpZXMgdmFsdWUgaW5zaWRlIHRoZSBzb3VyY2UuXG4gKiBleHRyYWN0QXJyYXlTdW0oW3thOiA1fSwge2I6IDF9LCB7YTogNSwgYjogMX1dLCBbJ2EnLCAnYiddKTsgPSZndDsgWzYsNl1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGV4dHJhY3RBcnJheVN1bShzb3VyY2U6IGFueVtdLCBwcm9wZXJ0aWVzOiBzdHJpbmdbXSk6IGFueVtdIHtcbiAgY29uc3QgYXJyYXlzOiBhbnlbXSA9IFtdO1xuICBwcm9wZXJ0aWVzID0gWy4uLihwcm9wZXJ0aWVzIHx8IFtdKV07XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9wZXJ0aWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgYXJyYXkgPSBleHRyYWN0QXJyYXkoc291cmNlLCBwcm9wZXJ0aWVzW2ldKTtcbiAgICBhcnJheXMucHVzaChhcnJheSk7XG4gIH1cblxuICBjb25zdCByZXM6IGFueVtdID0gW107XG4gIGlmIChhcnJheXMubGVuZ3RoID4gMCkge1xuICAgIGZvciAobGV0IHdlZWtJID0gMDsgd2Vla0kgPCBhcnJheXNbMF0ubGVuZ3RoOyB3ZWVrSSsrKSB7XG4gICAgICBsZXQgc3VtVmFsID0gMDtcbiAgICAgIGZvciAobGV0IHByb3BJID0gMDsgcHJvcEkgPCBwcm9wZXJ0aWVzLmxlbmd0aDsgcHJvcEkrKykge1xuICAgICAgICBzdW1WYWwgPSBzdW1WYWwgKyBOdW1iZXIoYXJyYXlzW3Byb3BJXVt3ZWVrSV0pO1xuICAgICAgfVxuICAgICAgcmVzLnB1c2goc3VtVmFsKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cbi8qKlxuICogRHJhdyBhIHRocmVzaG9sZCBsaW5lIG9uIGNoYXJ0IHJlbGF0ZWQgdG8gdGhlIHByb3BlcnR5LlxuICovXG5leHBvcnQgZnVuY3Rpb24gZHJhd1RocmVzaG9sZChzb3VyY2U6IGFueVtdLCBwcm9wZXJ0eTogc3RyaW5nLCB0aHJlc2hvbGQ6IGFueVtdKTogYW55W10ge1xuICBzb3VyY2UgPSAoc291cmNlIHx8IFtdKS5maWx0ZXIoKGY6IGFueSkgPT4gZiAhPSBudWxsKTtcbiAgdGhyZXNob2xkID0gdGhyZXNob2xkIHx8IFswXTtcbiAgaWYgKCEodGhyZXNob2xkIGluc3RhbmNlb2YgQXJyYXkpKSB7XG4gICAgdGhyZXNob2xkID0gW3RocmVzaG9sZF07XG4gIH1cbiAgY29uc3QgbCA9IHNvdXJjZS5sZW5ndGg7XG4gIGNvbnN0IHJlczogYW55W10gPSBbXTtcbiAgbGV0IGNvdW50ID0gMDtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsOyBpKyspIHtcbiAgICBpZiAoc291cmNlW2ldW3Byb3BlcnR5XSAhPSBudWxsKSB7XG4gICAgICBpZiAodGhyZXNob2xkLmxlbmd0aCA+IGNvdW50KSB7XG4gICAgICAgIHJlcy5wdXNoKHRocmVzaG9sZFtjb3VudF0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzLnB1c2godGhyZXNob2xkWzBdKTtcbiAgICAgIH1cbiAgICAgIGNvdW50Kys7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXM7XG59XG4vKipcbiAqIEV4dHJhY3QgdGhlIGRhdGVzIG9mIHRoZSBzb3VyY2Ugb2JqZWN0IHdpdGggcHJvcGVydHkgIT0gbnVsbFxuICovXG5leHBvcnQgZnVuY3Rpb24gZXh0cmFjdERhdGVzKHNvdXJjZTogYW55W10sIHByb3BlcnR5OiBzdHJpbmcsIGZtdDogc3RyaW5nKTogc3RyaW5nW10ge1xuICBzb3VyY2UgPSAoc291cmNlIHx8IFtdKS5maWx0ZXIoKGY6IGFueSkgPT4gZiAhPSBudWxsKTtcbiAgY29uc3QgbCA9IHNvdXJjZS5sZW5ndGg7XG4gIGNvbnN0IHJlczogYW55ID0gW107XG4gIGxldCBwcmVmaXggPSAnJztcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsOyBpKyspIHtcbiAgICBpZiAoc291cmNlW2ldW3Byb3BlcnR5XSAhPSBudWxsKSB7XG4gICAgICBzd2l0Y2ggKGZtdCkge1xuICAgICAgICBjYXNlICdXVyc6XG4gICAgICAgIGNhc2UgJ3d3JzpcbiAgICAgICAgICBwcmVmaXggPSAnVyc7XG4gICAgICAgICAgcmVzLnB1c2gocHJlZml4ICsgZm9ybWF0RGF0ZShzb3VyY2VbaV1bJ2RhdGVfc3RhcnQnXSwgZm10KSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ01NJzpcbiAgICAgICAgY2FzZSAnbW0nOlxuICAgICAgICAgIHByZWZpeCA9ICdNJztcbiAgICAgICAgICByZXMucHVzaChwcmVmaXggKyBpc29Nb250aChzb3VyY2VbaV1bJ2RhdGVfc3RhcnQnXSwgZm10KSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgcHJlZml4ID0gJyc7XG4gICAgICAgICAgcmVzLnB1c2gocHJlZml4ICsgZm9ybWF0RGF0ZShzb3VyY2VbaV1bJ2RhdGVfc3RhcnQnXSwgZm10KSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiByZXM7XG59XG4vKipcbiAqIEV4dHJhY3QgdGhlIGxhc3QgcHJvcGVydHkgY29udGFpbnMgaW4gc291cmNlICE9IG51bGxcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGxhc3RQcm9wZXJ0eShzb3VyY2U6IGFueSwgcHJvcGVydHk6IHN0cmluZyk6IGFueSB7XG4gIHNvdXJjZSA9IChzb3VyY2UgfHwgW10pLmZpbHRlcigoZjogYW55KSA9PiBmICE9IG51bGwpO1xuICBsZXQgbCA9IHNvdXJjZS5sZW5ndGggLSAxO1xuXG4gIHdoaWxlIChsID49IDAgJiYgc291cmNlW2xdW3Byb3BlcnR5XSA9PSBudWxsKSB7XG4gICAgbC0tO1xuICAgIGlmIChsIDwgMCkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbCA+PSAwID8gc291cmNlW2xdW3Byb3BlcnR5XSA6ICcnO1xufVxuLyoqXG4gKiBJdCBzdW0gdGhlIExBc3QgcHJvcGVydGllcyBvZiBzb3VyY2UuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdW1MYXN0UHJvcGVydGllcyhzb3VyY2U6IGFueVtdLCBwcm9wZXJ0aWVzOiBzdHJpbmdbXSk6IG51bWJlciB7XG4gIHNvdXJjZSA9IChzb3VyY2UgfHwgW10pLmZpbHRlcigoZjogYW55KSA9PiBmICE9IG51bGwpO1xuICBsZXQgc3VtVmFsID0gMDtcbiAgbGV0IHZhbCA9IDA7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvcGVydGllcy5sZW5ndGg7IGkrKykge1xuICAgIHZhbCA9IE51bWJlcihsYXN0UHJvcGVydHkoc291cmNlLCBwcm9wZXJ0aWVzW2ldKSk7XG4gICAgaWYgKCFpc05hTih2YWwpKSB7XG4gICAgICBzdW1WYWwgKz0gdmFsO1xuICAgIH1cbiAgfVxuICByZXR1cm4gc3VtVmFsO1xufVxuLyoqXG4gKiBDb21wdXRlIHRoZSB0cmVuZCBvZiB0aGUgcHJvcGVydHkgY29udGFpbmVkIG9uIHRoZSBzb3VyY2UuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjYWxjdWxhdGVUcmVuZFByb3BlcnR5KHNvdXJjZTogYW55W10sIHByb3BlcnR5OiBzdHJpbmcpOiBzdHJpbmcge1xuICBzb3VyY2UgPSAoc291cmNlIHx8IFtdKS5maWx0ZXIoKGY6IGFueSkgPT4gZiAhPSBudWxsKTtcbiAgbGV0IGxhc3QgPSBzb3VyY2UubGVuZ3RoIC0gMTtcbiAgd2hpbGUgKHNvdXJjZVtsYXN0XVtwcm9wZXJ0eV0gPT0gbnVsbCkge1xuICAgIGlmIChsYXN0ID09IDApIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBsYXN0LS07XG4gIH1cbiAgbGV0IGxhc3RMYXN0ID0gbGFzdCAtIDE7XG4gIGlmIChsYXN0ID09IDApIHtcbiAgICBsYXN0TGFzdCA9IGxhc3Q7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHNvdXJjZVtsYXN0TGFzdF1bcHJvcGVydHldID09IG51bGwpIHtcbiAgICAgIGlmIChsYXN0TGFzdCA9PSAwKSB7XG4gICAgICAgIGxhc3RMYXN0ID0gbGFzdDtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBsYXN0TGFzdC0tO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGxhc3RQcm9wID0gc291cmNlW2xhc3RdID8gc291cmNlW2xhc3RdW3Byb3BlcnR5XSB8fCAwIDogMDtcbiAgY29uc3QgbGFzdExhc3RQcm9wID0gc291cmNlW2xhc3RMYXN0XSA/IHNvdXJjZVtsYXN0TGFzdF1bcHJvcGVydHldIHx8IDAgOiAwO1xuXG4gIGlmIChsYXN0UHJvcCA9PSBsYXN0TGFzdFByb3ApIHtcbiAgICByZXR1cm4gJzxwPjxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIiBzdHlsZT1cImNvbG9yOmJsdWVcIj50cmVuZGluZ19mbGF0PC9pPjwvcD4nO1xuICB9IGVsc2UgaWYgKGxhc3RQcm9wID4gbGFzdExhc3RQcm9wKSB7XG4gICAgcmV0dXJuICc8cD48aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCIgc3R5bGU9XCJjb2xvcjpncmVlblwiPnRyZW5kaW5nX3VwPC9pPjwvcD4nO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAnPHA+PGkgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiIHN0eWxlPVwiY29sb3I6cmVkXCI+dHJlbmRpbmdfZG93bjwvaT48L3A+JztcbiAgfVxufVxuLyoqXG4gKiBDb21wdXRlIHRoZSBhdmVyYWdlIHZhbHVlIG9mIHRoZSBwcm9wZXJ0eSBjb250YWluZWQgb24gdGhlIHNvdXJjZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNhbGN1bGF0ZVRyZW5kQnlQcm9wZXJ0aWVzKHNvdXJjZTogYW55W10sIHByb3BlcnRpZXM6IHN0cmluZ1tdKTogc3RyaW5nIHtcbiAgY29uc3QgYXJyYXlzdW0gPSBleHRyYWN0QXJyYXlTdW0oc291cmNlLCBwcm9wZXJ0aWVzKTtcblxuICBjb25zdCBsYXN0UHJvcCA9IGFycmF5c3VtLmxlbmd0aCA+IDAgPyBhcnJheXN1bVthcnJheXN1bS5sZW5ndGggLSAxXSB8fCAwIDogMDtcbiAgY29uc3QgbGFzdExhc3RQcm9wID0gYXJyYXlzdW0ubGVuZ3RoID4gMSA/IGFycmF5c3VtW2FycmF5c3VtLmxlbmd0aCAtIDJdIHx8IDAgOiBsYXN0UHJvcDtcblxuICBpZiAobGFzdFByb3AgPT0gbGFzdExhc3RQcm9wKSB7XG4gICAgcmV0dXJuICc8cD48aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCIgc3R5bGU9XCJjb2xvcjpibHVlXCI+dHJlbmRpbmdfZmxhdDwvaT48L3A+JztcbiAgfSBlbHNlIGlmIChsYXN0UHJvcCA+IGxhc3RMYXN0UHJvcCkge1xuICAgIHJldHVybiAnPHA+PGkgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiIHN0eWxlPVwiY29sb3I6Z3JlZW5cIj50cmVuZGluZ191cDwvaT48L3A+JztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gJzxwPjxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIiBzdHlsZT1cImNvbG9yOnJlZFwiPnRyZW5kaW5nX2Rvd248L2k+PC9wPic7XG4gIH1cbn1cbi8qKlxuICpcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNhbGN1bGF0ZUF2Z1Byb3BlcnR5KFxuICBzb3VyY2U6IGFueVtdLFxuICBwcm9wZXJ0eTogc3RyaW5nLFxuICByYW5nZTogbnVtYmVyLFxuICBjb2VmZmljaWVudDogbnVtYmVyLFxuKTogbnVtYmVyIHtcbiAgc291cmNlID0gKHNvdXJjZSB8fCBbXSkuZmlsdGVyKChmOiBhbnkpID0+IGYgIT0gbnVsbCk7XG5cbiAgY29lZmZpY2llbnQgPSBjb2VmZmljaWVudCB8fCAxO1xuICByYW5nZSA9IHJhbmdlIHx8IDEyO1xuXG4gIGxldCBsID0gc291cmNlLmxlbmd0aDtcbiAgbGV0IHJlcyA9IDA7XG4gIGxldCBjb3VudGVyID0gMDtcbiAgbGV0IG5vWmVybyA9IDA7XG5cbiAgaWYgKGwgPCByYW5nZSkge1xuICAgIHJhbmdlID0gbDtcbiAgfVxuXG4gIHdoaWxlIChyYW5nZSAhPSAwKSB7XG4gICAgaWYgKHNvdXJjZVtsIC0gMV1bcHJvcGVydHldICE9IG51bGwpIHtcbiAgICAgIGNvdW50ZXIrKztcbiAgICAgIHJlcyArPSBOdW1iZXIoc291cmNlW2wgLSAxXVtwcm9wZXJ0eV0pO1xuXG4gICAgICBpZiAoc291cmNlW2wgLSAxXVtwcm9wZXJ0eV0gPiAwKSB7XG4gICAgICAgIG5vWmVybysrO1xuICAgICAgfVxuICAgIH1cbiAgICBsLS07XG4gICAgcmFuZ2UtLTtcbiAgfVxuXG4gIGlmIChjb2VmZmljaWVudCA9PSAwKSB7XG4gICAgcmV0dXJuIG5vWmVybztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gcm91bmQoKHJlcyAvIGNvdW50ZXIpICogY29lZmZpY2llbnQsIDIpIHx8IDA7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNhbGN1bGF0ZUF2Z1Byb3BlcnR5QXJyYXkoXG4gIHNvdXJjZTogYW55W10sXG4gIHByb3BlcnRpZXM6IHN0cmluZ1tdLFxuICByYW5nZTogbnVtYmVyLFxuICBjb2VmZmljaWVudDogbnVtYmVyLFxuKTogbnVtYmVyW10ge1xuICBzb3VyY2UgPSAoc291cmNlIHx8IFtdKS5maWx0ZXIoKGY6IGFueSkgPT4gZiAhPSBudWxsKTtcbiAgY29uc3QgcmVzQXJyOiBhbnlbXSA9IFtdO1xuXG4gIGlmIChwcm9wZXJ0aWVzICYmIHByb3BlcnRpZXMubGVuZ3RoID4gMCkge1xuICAgIGxldCBhdmcgPSAwO1xuXG4gICAgY29lZmZpY2llbnQgPSBjb2VmZmljaWVudCB8fCAxO1xuICAgIHJhbmdlID0gcmFuZ2UgfHwgMTI7XG5cbiAgICBjb25zdCBzb3VyY2VBcnIgPVxuICAgICAgcHJvcGVydGllcy5sZW5ndGggPiAxXG4gICAgICAgID8gZXh0cmFjdEFycmF5U3VtKHNvdXJjZSwgcHJvcGVydGllcylcbiAgICAgICAgOiBleHRyYWN0QXJyYXkoc291cmNlLCBwcm9wZXJ0aWVzWzBdKTtcblxuICAgIGxldCBsID0gc291cmNlQXJyLmxlbmd0aDtcblxuICAgIGZvciAobGV0IGxlbiA9IGw7IGxlbiA+IDA7IGxlbi0tKSB7XG4gICAgICBsZXQgcmVzID0gMDtcbiAgICAgIGxldCBjb3VudGVyID0gMDtcbiAgICAgIGxldCBub1plcm8gPSAwO1xuXG4gICAgICBpZiAobGVuIDwgcmFuZ2UpIHtcbiAgICAgICAgcmFuZ2UgPSBsZW47XG4gICAgICB9XG5cbiAgICAgIGZvciAobGV0IHIgPSAxOyByIDw9IHJhbmdlOyByKyspIHtcbiAgICAgICAgbGV0IHZhbCA9IHNvdXJjZUFycltsZW4gLSByXTtcbiAgICAgICAgaWYgKHZhbCAhPSBudWxsKSB7XG4gICAgICAgICAgY291bnRlcisrO1xuICAgICAgICAgIHJlcyArPSBOdW1iZXIodmFsKTtcbiAgICAgICAgICBpZiAodmFsID4gMCkge1xuICAgICAgICAgICAgbm9aZXJvKys7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChjb3VudGVyID4gMCkge1xuICAgICAgICBpZiAoY29lZmZpY2llbnQgPT0gMCkge1xuICAgICAgICAgIGF2ZyA9IG5vWmVybztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhdmcgPSAocmVzIC8gY291bnRlcikgKiBjb2VmZmljaWVudCB8fCAwO1xuICAgICAgICB9XG4gICAgICAgIHJlc0Fyci5wdXNoKHJvdW5kKGF2ZywgMikpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzQXJyLnJldmVyc2UoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFsZXJ0KHNvdXJjZTogYW55W10sIHByb3BlcnR5OiBzdHJpbmcsIHRocmVzaG9sZDogbnVtYmVyKTogc3RyaW5nIHtcbiAgc291cmNlID0gWy4uLihzb3VyY2UgfHwgW10pXTtcblxuICBpZiAobGFzdFByb3BlcnR5KHNvdXJjZSwgcHJvcGVydHkpID4gdGhyZXNob2xkKSB7XG4gICAgcmV0dXJuICc8cD48aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCIgc3R5bGU9XCJjb2xvcjpyZWRcIj53YXJuaW5nPC9pPjwvcD4nO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAnPHA+PC9wPic7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdE51bWJlcihudW06IG51bWJlciwgZm10Pzogc3RyaW5nKTogc3RyaW5nIHtcbiAgZm10ID0gZm10IHx8ICcwLDBbLl0wJztcbiAgcmV0dXJuIG51bWJybyhudW0pLmZvcm1hdChmbXQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0RGF0ZShkYXRlOiBEYXRlIHwgc3RyaW5nLCBmbXQ/OiBzdHJpbmcpOiBzdHJpbmcge1xuICBmbXQgPSBmbXQgfHwgJ21tLURELXl5eXknO1xuICByZXR1cm4gZGF0ZVV0aWxzLmZvcm1hdCh0eXBlb2YgZGF0ZSA9PT0gJ3N0cmluZycgPyBkYXRlVXRpbHMucGFyc2UoZGF0ZSkgOiBkYXRlLCBmbXQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNvTW9udGgoZGF0ZTogRGF0ZSwgZm10Pzogc3RyaW5nKTogc3RyaW5nIHtcbiAgZm10ID0gZm10IHx8ICdtbSc7XG4gIGNvbnN0IGR1ID0gZGF0ZVV0aWxzO1xuICByZXR1cm4gZHUuZm9ybWF0KGR1LmFkZERheXMoZHUuc3RhcnRPZklTT1dlZWsoZGF0ZSksIDMpLCBmbXQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29vcmRpbmF0ZShzb3VyY2U6IGFueSwgem9vbT86IG51bWJlcik6IFtudW1iZXIsIG51bWJlciwgbnVtYmVyXSB7XG4gIHpvb20gPSB6b29tIHx8IDY7XG4gIGlmIChzb3VyY2UgPT0gbnVsbCkge1xuICAgIHJldHVybiBbNTEuNTA1LCAtMC4wOSwgem9vbV07XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIFtzb3VyY2VbMF0sIHNvdXJjZVsxXSwgem9vbV07XG4gIH1cbn1cblxuLyoqXG4gKiBSZXR1cm5zIGFuIGFycmF5IGNvbnRhaW5pbmcgYWxsIHRoZSB2YWx1ZXMgdGhhdCB0aGUgc3BlY2lmaWVkIGZpZWxkIHRha2VzIGluIHRoZSBmb3Jtcy5cbiAqIFRoZSB2YWx1ZXMgYXJlIGNvbnZlcnRlZCB0byBzdHJpbmdzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gQUxMX1ZBTFVFU19PRihmb3JtczogTWFpbkZvcm1bXSwgZmllbGQ6IHN0cmluZyk6IHN0cmluZ1tdIHtcbiAgZm9ybXMgPSAoZm9ybXMgfHwgW10pLmZpbHRlcihmID0+IGYgIT0gbnVsbCk7XG4gIGNvbnN0IGFsbHJlcHMgPSBmb3JtcztcbiAgZm9yIChjb25zdCBmb3JtIG9mIGZvcm1zKSB7XG4gICAgYWxscmVwcy5wdXNoKC4uLmFsbFJlcHMoZm9ybSkpO1xuICB9XG4gIHJldHVybiBbLi4ubmV3IFNldChhbGxyZXBzLmZpbHRlcihmID0+IGZbZmllbGRdICE9IG51bGwpLm1hcChmID0+IFN0cmluZyhmW2ZpZWxkXSkpKV07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwbGFpbkFycmF5KHBhcmFtczogYW55W10pOiBhbnlbXSB7XG4gIGNvbnN0IHJlczogYW55W10gPSBbXTtcbiAgZm9yIChjb25zdCBwYXJhbSBvZiBwYXJhbXMpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShwYXJhbSkpIHtcbiAgICAgIHJlcy5wdXNoKC4uLnBhcmFtKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzLnB1c2gocGFyYW0pO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzO1xufVxuLyoqXG4gKiBSZXR1cm5zIHRoZSBudW1iZXIgb2YgZm9ybXMgZm9yIHdoaWNoIGZpbHRlckV4cHJlc3Npb24gZXZhbHVhdGVzIHRvIHRydWUsXG4gKiBmb3IgdGhlIGZvcm0gaXRzZWxmIG9yIGZvciBhbnkgb2YgaXRzIHJlcGV0aXRpb25zLlxuICovXG5leHBvcnQgZnVuY3Rpb24gQ09VTlRfRk9STVMoZm9ybXM6IE1haW5Gb3JtW10sIGV4cHJlc3Npb246IHN0cmluZyA9ICd0cnVlJyk6IG51bWJlciB7XG4gIGZvcm1zID0gKGZvcm1zIHx8IFtdKS5maWx0ZXIoZiA9PiBmICE9IG51bGwpO1xuICBpZiAoZXhwcmVzc2lvbiA9PT0gJ3RydWUnKSB7XG4gICAgcmV0dXJuIGZvcm1zLmxlbmd0aDtcbiAgfVxuICBsZXQgY291bnQgPSAwO1xuICBmb3IgKGNvbnN0IGZvcm0gb2YgZm9ybXMpIHtcbiAgICBpZiAoZXZhbHVhdGVFeHByZXNzaW9uKGV4cHJlc3Npb24sIGZvcm0pKSB7XG4gICAgICBjb3VudCsrO1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGZvciAoY29uc3QgcmVwIG9mIGFsbFJlcHMoZm9ybSkpIHtcbiAgICAgIGlmIChldmFsdWF0ZUV4cHJlc3Npb24oZXhwcmVzc2lvbiwgey4uLmZvcm0sIC4uLnJlcH0pKSB7XG4gICAgICAgIGNvdW50Kys7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gY291bnQ7XG59XG4vKipcbiAqIENvdW50cyB0aGUgZm9ybXMgYW5kIGFsbCBvZiB0aGVpciByZXBldGl0aW9ucyBmb3Igd2hpY2ggdGhlIGV4cHJlc3Npb24gZXZhbHVhdGVzIHRvIHRydWUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBDT1VOVF9SRVBTKGZvcm1zOiBNYWluRm9ybVtdLCBleHByZXNzaW9uOiBzdHJpbmcgPSAndHJ1ZScpOiBudW1iZXIge1xuICBmb3JtcyA9IChmb3JtcyB8fCBbXSkuZmlsdGVyKGYgPT4gZiAhPSBudWxsKTtcbiAgbGV0IGNvdW50ID0gMDtcbiAgZm9yIChjb25zdCBmb3JtIG9mIGZvcm1zKSB7XG4gICAgaWYgKGV2YWx1YXRlRXhwcmVzc2lvbihleHByZXNzaW9uLCBmb3JtKSkge1xuICAgICAgY291bnQrKztcbiAgICB9XG4gICAgZm9yIChjb25zdCByZXAgb2YgYWxsUmVwcyhmb3JtKSkge1xuICAgICAgaWYgKGV2YWx1YXRlRXhwcmVzc2lvbihleHByZXNzaW9uLCB7Li4uZm9ybSwgLi4ucmVwfSkpIHtcbiAgICAgICAgY291bnQrKztcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIGNvdW50O1xufVxuXG4vKipcbiAqIENvdW50cyB0aGUgZGlmZmVyZW50IHZhbHVlcyB0aGF0IHRoZSBzcGVjaWZpZWQgZmllbGQgdGFrZXMgaW4gdGhlIGZvcm1zIChhbmQgdGhlaXIgcmVwZXRpdGlvbnMpLlxuICovXG5leHBvcnQgZnVuY3Rpb24gQ09VTlRfRk9STVNfVU5JUVVFKFxuICBmb3JtczogTWFpbkZvcm1bXSxcbiAgZmllbGQ6IHN0cmluZyxcbiAgZXhwcmVzc2lvbjogc3RyaW5nID0gJ3RydWUnLFxuKTogbnVtYmVyIHtcbiAgZm9ybXMgPSAoZm9ybXMgfHwgW10pLmZpbHRlcihmID0+IGYgIT0gbnVsbCk7XG4gIGxldCB2YWx1ZXM6IGFueVtdID0gW107XG4gIGZvciAoY29uc3QgZm9ybSBvZiBmb3Jtcykge1xuICAgIGlmIChmb3JtW2ZpZWxkXSAhPSBudWxsICYmIGV2YWx1YXRlRXhwcmVzc2lvbihleHByZXNzaW9uLCBmb3JtKSkge1xuICAgICAgdmFsdWVzLnB1c2goZm9ybVtmaWVsZF0pO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IHJlcCBvZiBhbGxSZXBzKGZvcm0pKSB7XG4gICAgICBpZiAocmVwW2ZpZWxkXSAhPSBudWxsICYmIGV2YWx1YXRlRXhwcmVzc2lvbihleHByZXNzaW9uLCB7Li4uZm9ybSwgLi4ucmVwfSkpIHtcbiAgICAgICAgdmFsdWVzLnB1c2gocmVwW2ZpZWxkXSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBbLi4ubmV3IFNldCh2YWx1ZXMpXS5sZW5ndGg7XG59XG5cbmZ1bmN0aW9uIGdldE51bWVyaWNWYWx1ZXMoZm9ybXM6IChNYWluRm9ybSB8IEZvcm0pW10sIGZpZWxkOiBzdHJpbmcsIGV4cHJlc3Npb24gPSAndHJ1ZScpOiBudW1iZXJbXSB7XG4gIGZvcm1zID0gKGZvcm1zIHx8IFtdKS5maWx0ZXIoZiA9PiBmICE9IG51bGwpO1xuICBsZXQgdmFsdWVzOiBudW1iZXJbXSA9IFtdO1xuICBmb3IgKGNvbnN0IGZvcm0gb2YgZm9ybXMpIHtcbiAgICBjb25zdCB2YWwgPSBmb3JtW2ZpZWxkXTtcbiAgICBpZiAodmFsICE9IG51bGwgJiYgIWlzTmFOKE51bWJlcih2YWwpKSAmJiBldmFsdWF0ZUV4cHJlc3Npb24oZXhwcmVzc2lvbiwgZm9ybSkpIHtcbiAgICAgIHZhbHVlcy5wdXNoKE51bWJlcih2YWwpKTtcbiAgICB9XG4gICAgZm9yIChjb25zdCByZXAgb2YgYWxsUmVwcyhmb3JtKSkge1xuICAgICAgY29uc3QgdmFsID0gcmVwW2ZpZWxkXTtcbiAgICAgIGlmICh2YWwgIT0gbnVsbCAmJiAhaXNOYU4oTnVtYmVyKHZhbCkpICYmIGV2YWx1YXRlRXhwcmVzc2lvbihleHByZXNzaW9uLCB7Li4uZm9ybSwgLi4ucmVwfSkpIHtcbiAgICAgICAgdmFsdWVzLnB1c2goTnVtYmVyKHZhbCkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gdmFsdWVzO1xufVxuXG4vKipcbiAqIEFnZ3JlZ2F0ZXMgYW5kIHN1bXMgdGhlIHZhbHVlcyBvZiB0aGUgc3BlY2lmaWVkIGZpZWxkLlxuICogQW4gb3B0aW9uYWwgZXhwcmVzc2lvbiBjYW4gYmUgYWRkZWQgdG8gZmlsdGVyIHdoaWNoIGZvcm1zIHRvIHRha2UgZm9yIHRoZSBzdW0uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBTVU0oZm9ybXM6IChNYWluRm9ybSB8IEZvcm0pW10sIGZpZWxkOiBzdHJpbmcsIGV4cHJlc3Npb24gPSAndHJ1ZScpOiBudW1iZXIge1xuICBjb25zdCB2YWx1ZXMgPSBnZXROdW1lcmljVmFsdWVzKGZvcm1zLCBmaWVsZCwgZXhwcmVzc2lvbik7XG4gIGxldCBzdW0gPSAwO1xuICBmb3IgKGNvbnN0IHZhbCBvZiB2YWx1ZXMpIHtcbiAgICBzdW0gKz0gdmFsO1xuICB9XG4gIHJldHVybiB0cnVuY2F0ZTEwKHN1bSk7XG59XG5cbi8qKlxuICogQ29tcHV0ZXMgdGhlIG1lYW4gb2YgdGhlIHZhbHVlcyBvZiB0aGUgc3BlY2lmaWVkIGZpZWxkLlxuICogQW4gb3B0aW9uYWwgZXhwcmVzc2lvbiBjYW4gYmUgYWRkZWQgdG8gZmlsdGVyIHdoaWNoIGZvcm1zIHRvIHRha2UgZm9yIHRoZSBzdW0uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBNRUFOKGZvcm1zOiAoRm9ybSB8IE1haW5Gb3JtKVtdLCBmaWVsZDogc3RyaW5nLCBleHByZXNzaW9uID0gJ3RydWUnKTogbnVtYmVyIHtcbiAgY29uc3QgdmFsdWVzID0gZ2V0TnVtZXJpY1ZhbHVlcyhmb3JtcywgZmllbGQsIGV4cHJlc3Npb24pO1xuICBsZXQgc3VtID0gMDtcbiAgZm9yIChjb25zdCB2YWwgb2YgdmFsdWVzKSB7XG4gICAgc3VtICs9IHZhbDtcbiAgfVxuICByZXR1cm4gdHJ1bmNhdGUxMChzdW0gLyB2YWx1ZXMubGVuZ3RoKTtcbn1cblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSAlIGJldHdlZW4gdHdvIG1lbWJlcnMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBQRVJDRU5UKHZhbHVlMTogbnVtYmVyLCB2YWx1ZTI6IG51bWJlcik6IHN0cmluZyB7XG4gIGNvbnN0IHJlcyA9ICgrdmFsdWUxICogMTAwKSAvICt2YWx1ZTI7XG4gIHJldHVybiBOdW1iZXIuaXNGaW5pdGUocmVzKSA/IGAke1JPVU5EKHJlcyl9JWAgOiAnaW5maW5pdGUnO1xufVxuXG4vKipcbiAqIEV2YWx1YXRlcyB0aGUgZXhwcmVzc2lvbiBpbiB0aGUgbGFzdCBmb3JtIGJ5IGRhdGUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBMQVNUKGZvcm1zOiAoRm9ybSB8IE1haW5Gb3JtKVtdLCBleHByZXNzaW9uOiBzdHJpbmcsIGRhdGUgPSAnY3JlYXRlZF9hdCcpOiBhbnkge1xuICBmb3JtcyA9IChmb3JtcyB8fCBbXSkuZmlsdGVyKGYgPT4gZiAhPSBudWxsKS5zb3J0KChhLCBiKSA9PiB7XG4gICAgY29uc3QgZGF0ZUEgPSBuZXcgRGF0ZShiW2RhdGVdIGFzIHN0cmluZykuZ2V0VGltZSgpO1xuICAgIGNvbnN0IGRhdGVCID0gbmV3IERhdGUoYVtkYXRlXSBhcyBzdHJpbmcpLmdldFRpbWUoKTtcbiAgICByZXR1cm4gZGF0ZUEgLSBkYXRlQjtcbiAgfSk7XG4gIGlmIChmb3Jtcy5sZW5ndGggPT09IDAgfHwgZXhwcmVzc2lvbiA9PSBudWxsKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuICByZXR1cm4gZXZhbHVhdGVFeHByZXNzaW9uKGV4cHJlc3Npb24sIGZvcm1zW2Zvcm1zLmxlbmd0aCAtIDFdKTtcbn1cblxuLyoqXG4gKiBDb21wdXRlcyB0aGUgbWF4IHZhbHVlIG9mIHRoZSBmaWVsZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIE1BWChmb3JtczogKEZvcm0gfCBNYWluRm9ybSlbXSwgZmllbGQ6IHN0cmluZywgZXhwcmVzc2lvbiA9ICd0cnVlJyk6IG51bWJlciB7XG4gIGNvbnN0IHZhbHVlcyA9IGdldE51bWVyaWNWYWx1ZXMoZm9ybXMsIGZpZWxkLCBleHByZXNzaW9uKTtcbiAgbGV0IG1heCA9IC1JbmZpbml0eTtcbiAgZm9yIChjb25zdCB2YWwgb2YgdmFsdWVzKSB7XG4gICAgaWYgKHZhbCA+IG1heCkge1xuICAgICAgbWF4ID0gdmFsO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbWF4O1xufVxuXG4vKipcbiAqIENvbXB1dGVzIHRoZSBtZWRpYW4gdmFsdWUgb2YgdGhlIGZpZWxkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gTUVESUFOKGZvcm1zOiAoRm9ybSB8IE1haW5Gb3JtKVtdLCBmaWVsZDogc3RyaW5nLCBleHByZXNzaW9uID0gJ3RydWUnKTogbnVtYmVyIHtcbiAgY29uc3QgdmFsdWVzID0gZ2V0TnVtZXJpY1ZhbHVlcyhmb3JtcywgZmllbGQsIGV4cHJlc3Npb24pLnNvcnQoKTtcbiAgaWYgKHZhbHVlcy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gTmFOO1xuICB9XG4gIHJldHVybiB2YWx1ZXNbTWF0aC5mbG9vcih2YWx1ZXMubGVuZ3RoIC8gMildO1xufVxuXG4vKipcbiAqIENvbXB1dGVzIHRoZSBtb2RlIHZhbHVlIG9mIHRoZSBmaWVsZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIE1PREUoZm9ybXM6IChGb3JtIHwgTWFpbkZvcm0pW10sIGZpZWxkOiBzdHJpbmcsIGV4cHJlc3Npb24gPSAndHJ1ZScpOiBudW1iZXIge1xuICBjb25zdCB2YWx1ZXMgPSBnZXROdW1lcmljVmFsdWVzKGZvcm1zLCBmaWVsZCwgZXhwcmVzc2lvbik7XG4gIGNvbnN0IGNvdW50ZXJzOiB7W3ZhbDogbnVtYmVyXTogbnVtYmVyfSA9IHt9O1xuICBmb3IgKGNvbnN0IHZhbCBvZiB2YWx1ZXMpIHtcbiAgICBpZiAoY291bnRlcnNbdmFsXSA9PSBudWxsKSB7XG4gICAgICBjb3VudGVyc1t2YWxdID0gMTtcbiAgICB9IGVsc2Uge1xuICAgICAgY291bnRlcnNbdmFsXSsrO1xuICAgIH1cbiAgfVxuICBsZXQgbWF4Q291bnQgPSAwO1xuICBmb3IgKGNvbnN0IHZhbCBpbiBjb3VudGVycykge1xuICAgIGlmIChjb3VudGVyc1t2YWxdID4gbWF4Q291bnQpIHtcbiAgICAgIG1heENvdW50ID0gY291bnRlcnNbdmFsXTtcbiAgICB9XG4gIH1cbiAgZm9yIChjb25zdCB2YWwgaW4gY291bnRlcnMpIHtcbiAgICBpZiAoY291bnRlcnNbdmFsXSA9PT0gbWF4Q291bnQpIHtcbiAgICAgIHJldHVybiBOdW1iZXIodmFsKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIE5hTjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkRGF0YXNldChcbiAgZGF0YXNldDogKHN0cmluZyB8IG51bWJlciB8IHN0cmluZ1tdIHwgbnVtYmVyW10pW10sXG4gIGNvbHNwYW5zOiBudW1iZXJbXSxcbik6IEFqZlRhYmxlQ2VsbFtdW10ge1xuICByZXR1cm4gYnVpbGRBbGlnbmVkRGF0YXNldChkYXRhc2V0LCBjb2xzcGFucywgW10pO1xufVxuXG4vKipcbiAqIEJ1aWxkIGEgZGF0YXNldCBmb3IgYWpmIGR5bmFtaWMgdGFibGVcbiAqIEBwYXJhbSBkYXRhc2V0IHRoZSBkYXRhc2V0IGZvciB0aGUgdGFibGVcbiAqIEBwYXJhbSBjb2xzcGFucyBjb2xzcGFuIGZvciBlYWNoIHZhbHVlIGluIHRoZSBkYXRhc2V0XG4gKiBAcGFyYW0gdGV4dEFsaWduIGFsaWdubWVudCBmb3IgZWFjaCB2YWx1ZSBpbiB0aGUgZGF0YXNldFxuICogQHJldHVybnMgQW4gQWpmVGFibGVDZWxsIGxpc3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkQWxpZ25lZERhdGFzZXQoXG4gIGRhdGFzZXQ6IChzdHJpbmcgfCBudW1iZXIgfCBzdHJpbmdbXSB8IG51bWJlcltdKVtdLFxuICBjb2xzcGFuczogbnVtYmVyW10sXG4gIHRleHRBbGlnbjogc3RyaW5nW10sXG4pOiBBamZUYWJsZUNlbGxbXVtdIHtcbiAgY29uc3QgcmVzOiBBamZUYWJsZUNlbGxbXVtdID0gW107XG4gIGNvbnN0IG5vcm1hbGl6ZURhdGFzZXQ6IGFueVtdW10gPSBbXTtcbiAgZGF0YXNldC5mb3JFYWNoKChyb3c6IGFueSwgaW5kZXhSb3c6IG51bWJlcikgPT4ge1xuICAgIHJvdyA9IEFycmF5LmlzQXJyYXkocm93KSA/IHJvdyA6IFtyb3ddO1xuICAgIG5vcm1hbGl6ZURhdGFzZXRbaW5kZXhSb3cgJSBjb2xzcGFucy5sZW5ndGhdID1cbiAgICAgIG5vcm1hbGl6ZURhdGFzZXRbaW5kZXhSb3cgJSBjb2xzcGFucy5sZW5ndGhdICE9IG51bGxcbiAgICAgICAgPyBbLi4ubm9ybWFsaXplRGF0YXNldFtpbmRleFJvdyAlIGNvbHNwYW5zLmxlbmd0aF0sIC4uLnJvd11cbiAgICAgICAgOiBbLi4ucm93XTtcbiAgfSk7XG4gIGNvbnN0IHRyYW5zcG9zZSA9IG5vcm1hbGl6ZURhdGFzZXRbMF0ubWFwKChfOiBhbnksIGNvbEluZGV4OiBudW1iZXIpID0+XG4gICAgbm9ybWFsaXplRGF0YXNldC5tYXAoKHJvdzogYW55KSA9PiByb3dbY29sSW5kZXhdKSxcbiAgKTtcbiAgdHJhbnNwb3NlLmZvckVhY2goKGRhdGE6IGFueVtdLCBpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgY29uc3Qgcm93OiBBamZUYWJsZUNlbGxbXSA9IFtdO1xuICAgIGRhdGEuZm9yRWFjaCgoY2VsbFZhbHVlOiBzdHJpbmcgfCBudW1iZXIsIGNlbGxJbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICByb3cucHVzaCh7XG4gICAgICAgIHZhbHVlOiBjZWxsVmFsdWUsXG4gICAgICAgIGNvbHNwYW46IGNvbHNwYW5zW2NlbGxJbmRleF0sXG4gICAgICAgIHJvd3NwYW46IDEsXG4gICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgdGV4dEFsaWduOiB0ZXh0QWxpZ25bY2VsbEluZGV4XSA/IHRleHRBbGlnbltjZWxsSW5kZXhdIDogJ2NlbnRlcicsXG4gICAgICAgICAgY29sb3I6ICdibGFjaycsXG4gICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBpbmRleCAlIDIgPT09IDAgPyAnd2hpdGUnIDogJyNkZGQnLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgcmVzLnB1c2gocm93KTtcbiAgfSk7XG4gIHJldHVybiByZXM7XG59XG5cbi8qKlxuICogQnVpbGQgYSBkYXRhc2V0IGJhc2VkIG9uIGEgbGlzdCBvZiBGb3JtcywgZm9yIGFqZiBkeW5hbWljIHRhYmxlXG4gKiBAcGFyYW0gZGF0YXNldCB0aGUgZGF0YXNldCBmb3IgdGhlIHRhYmxlXG4gKiBAcGFyYW0gZmllbGRzIHRoZSBsaXN0IG9mIGZpZWxkcyBuYW1lIGZvciBlYWNoIHJvd1xuICogQHBhcmFtIHJvd0xpbmsgdGhlIGh0dHAgbGluayBmb3IgdGhlIHJvdywgd2l0aCB0aGUgZm9ybSBmaWVsZCBuYW1lIHdpdGggdGhlIGxpbmsgdmFsdWUgYW5kIHRoZSBjb2x1bW4gcG9zaXRpb24gZm9yIHRoZSBsaW5rLlxuICogaWU6IHsnbGluayc6ICdob21lX2xpbmsnLCAncG9zaXRpb24nOiAwfVxuICogQHBhcmFtIGJhY2tncm91bmRDb2xvckEgdGhlIGZpcnN0IGJhY2tncm91ZCBjb2xvclxuICogQHBhcmFtIGJhY2tncm91bmRDb2xvckIgdGhlIHNlY29uZCBiYWNrZ3JvdWQgY29sb3JcbiAqIEByZXR1cm5zIEFuIEFqZlRhYmxlQ2VsbCBsaXN0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBidWlsZEZvcm1EYXRhc2V0KFxuICBkYXRhc2V0OiBNYWluRm9ybVtdLFxuICBmaWVsZHM6IHN0cmluZ1tdLFxuICByb3dMaW5rOiB7bGluazogc3RyaW5nOyBwb3NpdGlvbjogbnVtYmVyfSB8IG51bGwsXG4gIF9iYWNrZ3JvdW5kQ29sb3JBPzogc3RyaW5nLFxuICBfYmFja2dyb3VuZENvbG9yQj86IHN0cmluZyxcbik6IEFqZlRhYmxlQ2VsbFtdW10ge1xuICByZXR1cm4gYnVpbGRBbGlnbmVkRm9ybURhdGFzZXQoZGF0YXNldCwgZmllbGRzLCBbXSwgW10sIHJvd0xpbmssIFtdLCBbXSk7XG59XG5cbi8qKlxuICogQnVpbGQgYSBkYXRhc2V0IGJhc2VkIG9uIGEgbGlzdCBvZiBGb3JtcywgZm9yIGFqZiBkeW5hbWljIHRhYmxlXG4gKiBAcGFyYW0gZGF0YXNldCB0aGUgZGF0YXNldCBmb3IgdGhlIHRhYmxlXG4gKiBAcGFyYW0gZmllbGRzIHRoZSBsaXN0IG9mIGZpZWxkcyBuYW1lIGZvciBlYWNoIHJvd1xuICogQHBhcmFtIGNvbHNwYW5zIGNvbHNwYW4gZm9yIGVhY2ggdmFsdWUgaW4gdGhlIGRhdGFzZXRcbiAqIEBwYXJhbSB0ZXh0QWxpZ24gYWxpZ25tZW50IGZvciBlYWNoIHZhbHVlIGluIHRoZSBkYXRhc2V0XG4gKiBAcGFyYW0gcm93TGluayB0aGUgaHR0cCBsaW5rIGZvciB0aGUgcm93LCB3aXRoIHRoZSBmb3JtIGZpZWxkIG5hbWUgd2l0aCB0aGUgbGluayB2YWx1ZSBhbmQgdGhlIGNvbHVtbiBwb3NpdGlvbiBmb3IgdGhlIGxpbmsuXG4gKiBpZTogeydsaW5rJzogJ2hvbWVfbGluaycsICdwb3NpdGlvbic6IDB9XG4gKiBAcmV0dXJucyBBbiBBamZUYWJsZUNlbGwgbGlzdFxuICovXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRBbGlnbmVkRm9ybURhdGFzZXQoXG4gIGRhdGFzZXQ6IE1haW5Gb3JtW10sXG4gIGZpZWxkczogc3RyaW5nW10sXG4gIGNvbHNwYW5zOiBudW1iZXJbXSxcbiAgdGV4dEFsaWduOiBzdHJpbmdbXSxcbiAgcm93TGluazoge2xpbms6IHN0cmluZzsgcG9zaXRpb246IG51bWJlcn0gfCBudWxsLFxuICBkaWFsb2dGaWVsZHM6IHN0cmluZ1tdLFxuICBkaWFsb2dMYWJlbEZpZWxkczogc3RyaW5nW10sXG4pOiBBamZUYWJsZUNlbGxbXVtdIHtcbiAgY29uc3QgcmVzOiBBamZUYWJsZUNlbGxbXVtdID0gW107XG5cbiAgY29uc3QgYmFja2dyb3VuZENvbG9yQSA9ICd3aGl0ZSc7XG4gIGNvbnN0IGJhY2tncm91bmRDb2xvckIgPSAnI2RkZCc7XG4gIGlmIChkYXRhc2V0KSB7XG4gICAgbGV0IGluZGV4OiBudW1iZXIgPSAwO1xuICAgIGRhdGFzZXQuZm9yRWFjaCgoZGF0YTogTWFpbkZvcm0pID0+IHtcbiAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgIGluZGV4Kys7XG4gICAgICAgIGNvbnN0IHJvdzogQWpmVGFibGVDZWxsW10gPSBbXTtcbiAgICAgICAgZmllbGRzLmZvckVhY2goKGZpZWxkOiBzdHJpbmcsIGNlbGxJZHg6IG51bWJlcikgPT4ge1xuICAgICAgICAgIGxldCBjZWxsVmFsdWUgPSBkYXRhW2ZpZWxkXSB8fCAnJztcbiAgICAgICAgICBpZiAocm93TGluayAhPSBudWxsICYmIGNlbGxJZHggPT09IHJvd0xpbmtbJ3Bvc2l0aW9uJ10pIHtcbiAgICAgICAgICAgIGNlbGxWYWx1ZSA9IGA8YSBocmVmPScke2RhdGFbcm93TGlua1snbGluayddXX0nPiAke2RhdGFbZmllbGRdfTwvYT5gO1xuICAgICAgICAgIH1cbiAgICAgICAgICByb3cucHVzaCh7XG4gICAgICAgICAgICB2YWx1ZTogY2VsbFZhbHVlLFxuICAgICAgICAgICAgY29sc3BhbjogY29sc3BhbnNbY2VsbElkeF0gJiYgY29sc3BhbnNbY2VsbElkeF0gPiAwID8gY29sc3BhbnNbY2VsbElkeF0gOiAxLFxuICAgICAgICAgICAgcm93c3BhbjogMSxcbiAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgIHRleHRBbGlnbjogdGV4dEFsaWduW2NlbGxJZHhdID8gdGV4dEFsaWduW2NlbGxJZHhdIDogJ2NlbnRlcicsXG4gICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snLFxuICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IGluZGV4ICUgMiA9PT0gMCA/IGJhY2tncm91bmRDb2xvckEgOiBiYWNrZ3JvdW5kQ29sb3JCLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGRpYWxvZ0ZpZWxkcyAmJiBkaWFsb2dGaWVsZHMubGVuZ3RoKSB7XG4gICAgICAgICAgbGV0IGRpYWxvZ0h0bWw6IHN0cmluZ1tdID0gW107XG4gICAgICAgICAgZGlhbG9nRmllbGRzLmZvckVhY2goKGZpZWxkOiBzdHJpbmcsIGNlbGxJZHg6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgbGV0IGZpZWxkVmFsdWUgPSAnXCJcIic7XG4gICAgICAgICAgICBpZiAoZGF0YVtmaWVsZF0gIT0gbnVsbCkge1xuICAgICAgICAgICAgICBmaWVsZFZhbHVlID1cbiAgICAgICAgICAgICAgICBcIjxwIGNsYXNzPSdkaWFsb2ctaXRlbSc+PGI+XCIgK1xuICAgICAgICAgICAgICAgIGRpYWxvZ0xhYmVsRmllbGRzW2NlbGxJZHhdLnJlcGxhY2UoL1snXFxcIl0rL2csICcnKSArXG4gICAgICAgICAgICAgICAgJzwvYj4gPHNwYW4+JyArXG4gICAgICAgICAgICAgICAgZGF0YVtmaWVsZF0gK1xuICAgICAgICAgICAgICAgICc8L3NwYW4+PC9wPic7XG4gICAgICAgICAgICAgIGRpYWxvZ0h0bWwucHVzaChmaWVsZFZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHJvdy5wdXNoKHtcbiAgICAgICAgICAgIHZhbHVlOlxuICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cInJlYWRfbW9yZV9jZWxsXCI+PHAgY2xhc3M9XCJyZWFkX21vcmVfdGV4dFwiPlJlYWQgbW9yZTwvcD48YiBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCI+YWRkX2NpcmNsZV9vdXRsaW5lPC9iPjwvZGl2PicsXG4gICAgICAgICAgICBkaWFsb2dIdG1sOiBkaWFsb2dIdG1sLmpvaW4oJyAnKSxcbiAgICAgICAgICAgIGNvbHNwYW46IDEsXG4gICAgICAgICAgICByb3dzcGFuOiAxLFxuICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgY29sb3I6ICdibGFjaycsXG4gICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogaW5kZXggJSAyID09PSAwID8gYmFja2dyb3VuZENvbG9yQSA6IGJhY2tncm91bmRDb2xvckIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJlcy5wdXNoKHJvdyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cblxuLyoqXG4gKiBjcmVhdGUgYSB3aWRnZXQgZGF0YXNldCBpbnRvIGEgY29udGVudCBsaXN0LCBiYXNlZCBvbiBhIGxpc3Qgb2YgRm9ybXMsIGZvciBwYWdpbmF0ZWQgd2lkZ2V0XG4gKlxuICogQHBhcmFtIGRhdGFzZXQgdGhlIGRhdGFzZXQgZm9yIHRoZSB3aWRnZXRzXG4gKiBAcGFyYW0gZmllbGRzIHRoZSBsaXN0IG9mIGZpZWxkcyBuYW1lIGZvciBlYWNoIHJvd1xuICogQHBhcmFtIHJvd0xpbmsgdGhlIGh0dHAgbGluayBmb3IgdGhlIHJvdywgd2l0aCB0aGUgZm9ybSBmaWVsZCBuYW1lIHdpdGggdGhlIGxpbmsgdmFsdWUgYW5kIHRoZSBjb2x1bW4gcG9zaXRpb24gZm9yIHRoZSBsaW5rLlxuICogaWU6IHsnbGluayc6ICdob21lX2xpbmsnLCAncG9zaXRpb24nOiAwfVxuICogQHBhcmFtIGNlbGxTdHlsZXMgY3NzIHN0eWxlcyBmb3IgY2VsbHNcbiAqIEBwYXJhbSByb3dTdHlsZSBjc3Mgc3R5bGVzIGZvciByb3dzXG4gKiBAcGFyYW0gcGVyY1dpZHRoIGFuIGFycmF5IHdpdGggdGhlIHNhbWUgbGVuZ3RoIG9mIGZpZWxkcyBwYXJhbSwgd2l0aCB0aGUgd2lkdGggZm9yIHRoZSBjb2x1bW5zLlxuICogaWU6IFsnMTAlJywgJzMwJScsICcxMCUnLCAnMjUlJywgJzE1JScsICcxMCUnXVxuICogQHBhcmFtIGJhY2tncm91bmRDb2xvckEgdGhlIGZpcnN0IGJhY2tncm91ZCBjb2xvclxuICogQHBhcmFtIGJhY2tncm91bmRDb2xvckIgdGhlIHNlY29uZCBiYWNrZ3JvdWQgY29sb3JcbiAqIEByZXR1cm5zIEFuIEFqZlRhYmxlV2lkZ2V0IGxpc3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkV2lkZ2V0RGF0YXNldChcbiAgZGF0YXNldDogTWFpbkZvcm1bXSxcbiAgZmllbGRzOiBzdHJpbmdbXSxcbiAgcm93TGluazoge2xpbms6IHN0cmluZzsgcG9zaXRpb246IG51bWJlcn0gfCBudWxsLFxuICBjZWxsU3R5bGVzOiB7W2tleTogc3RyaW5nXTogYW55fSB8IG51bGwsXG4gIHJvd1N0eWxlOiB7W2tleTogc3RyaW5nXTogYW55fSB8IG51bGwsXG4gIHBlcmNXaWR0aDogc3RyaW5nW10sXG4gIGJhY2tncm91bmRDb2xvckE/OiBzdHJpbmcsXG4gIGJhY2tncm91bmRDb2xvckI/OiBzdHJpbmcsXG4pOiBhbnlbXSB7XG4gIGNvbnN0IHJlczoge1trZXk6IHN0cmluZ106IGFueX1bXSA9IFtdO1xuICBpZiAoYmFja2dyb3VuZENvbG9yQSA9PSBudWxsKSB7XG4gICAgYmFja2dyb3VuZENvbG9yQSA9ICd3aGl0ZSc7XG4gIH1cbiAgaWYgKGJhY2tncm91bmRDb2xvckIgPT0gbnVsbCkge1xuICAgIGJhY2tncm91bmRDb2xvckIgPSAnI2RkZCc7XG4gIH1cbiAgaWYgKHJvd1N0eWxlID09IG51bGwpIHtcbiAgICByb3dTdHlsZSA9IHtcbiAgICAgICd0ZXh0LWFsaWduJzogJ3JpZ2h0JyxcbiAgICAgICdtYXJnaW4tYm90dG9tJzogMCxcbiAgICAgICdib3JkZXItY29sbGFwc2UnOiAnY29sbGFwc2UnLFxuICAgIH07XG4gIH1cbiAgaWYgKGNlbGxTdHlsZXMgPT0gbnVsbCkge1xuICAgIGNlbGxTdHlsZXMgPSB7XG4gICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxuICAgICAgY29sb3I6ICdibGFjaycsXG4gICAgfTtcbiAgfVxuICBpZiAocGVyY1dpZHRoID09IG51bGwgfHwgcGVyY1dpZHRoLmxlbmd0aCAhPT0gZmllbGRzLmxlbmd0aCkge1xuICAgIGNvbnN0IGNlbGxXaWR0aCA9IDEwMCAvIGZpZWxkcy5sZW5ndGggKyAnJSc7XG4gICAgcGVyY1dpZHRoID0gW107XG4gICAgZmllbGRzLmZvckVhY2goXyA9PiBwZXJjV2lkdGgucHVzaChjZWxsV2lkdGgpKTtcbiAgfVxuXG4gIGlmIChkYXRhc2V0KSB7XG4gICAgbGV0IGluZGV4OiBudW1iZXIgPSAwO1xuICAgIGRhdGFzZXQuZm9yRWFjaCgoZGF0YTogTWFpbkZvcm0pID0+IHtcbiAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgIGluZGV4Kys7XG4gICAgICAgIC8vIFJvdyBpcyBhbiBBamZUYWJsZVdpZGdldFxuICAgICAgICBjb25zdCByb3c6IHtba2V5OiBzdHJpbmddOiBhbnl9ID0ge1xuICAgICAgICAgIHN0eWxlczoge1xuICAgICAgICAgICAgJ3RleHQtYWxpZ24nOiAncmlnaHQnLFxuICAgICAgICAgICAgJ21hcmdpbi1ib3R0b20nOiAwLFxuICAgICAgICAgICAgJ2JvcmRlci1jb2xsYXBzZSc6ICdjb2xsYXBzZScsXG4gICAgICAgICAgICAuLi5yb3dTdHlsZSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHZpc2liaWxpdHk6IHtjb25kaXRpb246ICd0cnVlJ30sXG4gICAgICAgICAgd2lkZ2V0VHlwZTogNSxcbiAgICAgICAgICBkYXRhc2V0OiBbW11dIGFzIGFueVtdW10sXG4gICAgICAgICAgY2VsbFN0eWxlczogeydib3JkZXItdG9wJzogJzFweCBzb2xpZCBncmV5J30sXG4gICAgICAgIH07XG5cbiAgICAgICAgZmllbGRzLmZvckVhY2goKGZpZWxkOiBzdHJpbmcsIGNlbGxJZHg6IG51bWJlcikgPT4ge1xuICAgICAgICAgIGxldCBmb3JtdWxhQ2VsbCA9ICdcIlwiJztcbiAgICAgICAgICBpZiAoZGF0YVtmaWVsZF0gIT0gbnVsbCkge1xuICAgICAgICAgICAgZm9ybXVsYUNlbGwgPSAnXCInICsgZGF0YVtmaWVsZF0gKyAnXCInO1xuICAgICAgICAgICAgaWYgKHJvd0xpbmsgIT0gbnVsbCAmJiBjZWxsSWR4ID09PSByb3dMaW5rWydwb3NpdGlvbiddKSB7XG4gICAgICAgICAgICAgIGZvcm11bGFDZWxsID0gYFwiPGEgaHJlZj0nJHtkYXRhW3Jvd0xpbmtbJ2xpbmsnXV19Jz4gJHtkYXRhW2ZpZWxkXX08L2E+XCJgO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHJvd1snZGF0YXNldCddWzBdLnB1c2goe1xuICAgICAgICAgICAgbGFiZWw6ICcnLFxuICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgY29sb3I6ICdibGFjaycsXG4gICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogaW5kZXggJSAyID09PSAwID8gYmFja2dyb3VuZENvbG9yQSA6IGJhY2tncm91bmRDb2xvckIsXG4gICAgICAgICAgICAgIC4uLmNlbGxTdHlsZXMsXG4gICAgICAgICAgICAgIHdpZHRoOiBwZXJjV2lkdGhbY2VsbElkeF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZm9ybXVsYToge1xuICAgICAgICAgICAgICBmb3JtdWxhOiBmb3JtdWxhQ2VsbCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb2xzcGFuOiAxLFxuICAgICAgICAgICAgcm93c3BhbjogMSxcbiAgICAgICAgICAgIGFnZ3JlZ2F0aW9uOiB7XG4gICAgICAgICAgICAgIGFnZ3JlZ2F0aW9uOiAwLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJlcy5wdXNoKHJvdyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cblxuLyoqXG4gKiBjcmVhdGUgYSB3aWRnZXQgZGF0YXNldCBpbnRvIGEgY29udGVudCBsaXN0LCBiYXNlZCBvbiBhIGxpc3Qgb2YgRm9ybXMsIGZvciBwYWdpbmF0ZWQgd2lkZ2V0LlxuICogRWFjaCByb3cgaXMgYSBBamZEaWFsb2dXaWRnZXQgYW5kLCBvbiBjbGljaywgb3BlbiBhIGRpYWxvZy5cbiAqXG4gKiBAcGFyYW0gZGF0YXNldCB0aGUgZGF0YXNldCBmb3IgdGhlIHdpZGdldHNcbiAqIEBwYXJhbSBmaWVsZHMgdGhlIGxpc3Qgb2YgZmllbGRzIG5hbWUgZm9yIGVhY2ggcm93XG4gKiBAcGFyYW0gZGlhbG9nRmllbGRzIHRoZSBsaXN0IG9mIGZpZWxkcyBuYW1lIHRvIHNob3cgaW4gdGhlIGRpYWxvZ1xuICogQHBhcmFtIGRpYWxvZ0xhYmVsRmllbGRzIHRoZSBsaXN0IG9mIGxhYmVscyBmb3IgZWFjaCBkaWFsb2dGaWVsZHNcbiAqIEBwYXJhbSByb3dMaW5rIHRoZSBodHRwIGxpbmsgZm9yIHRoZSByb3csIHdpdGggdGhlIGZvcm0gZmllbGQgbmFtZSB3aXRoIHRoZSBsaW5rIHZhbHVlIGFuZCB0aGUgY29sdW1uIHBvc2l0aW9uIGZvciB0aGUgbGluay5cbiAqIGllOiB7J2xpbmsnOiAnaG9tZV9saW5rJywgJ3Bvc2l0aW9uJzogMH1cbiAqIEBwYXJhbSBjZWxsU3R5bGVzIGNzcyBzdHlsZXMgZm9yIGNlbGxzXG4gKiBAcGFyYW0gcm93U3R5bGUgY3NzIHN0eWxlcyBmb3Igcm93c1xuICogQHBhcmFtIHBlcmNXaWR0aCBhbiBhcnJheSB3aXRoIHRoZSBzYW1lIGxlbmd0aCBvZiBmaWVsZHMgcGFyYW0sIHdpdGggdGhlIHdpZHRoIGZvciB0aGUgY29sdW1ucy5cbiAqIGllOiBbJzEwJScsICczMCUnLCAnMTAlJywgJzI1JScsICcxNSUnLCAnMTAlJ11cbiAqIEBwYXJhbSBiYWNrZ3JvdW5kQ29sb3JBIHRoZSBmaXJzdCBiYWNrZ3JvdWQgY29sb3JcbiAqIEBwYXJhbSBiYWNrZ3JvdW5kQ29sb3JCIHRoZSBzZWNvbmQgYmFja2dyb3VkIGNvbG9yXG4gKiBAcmV0dXJucyBBbiBBamZEaWFsb2dXaWRnZXQgbGlzdFxuICovXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRXaWRnZXREYXRhc2V0V2l0aERpYWxvZyhcbiAgZGF0YXNldDogTWFpbkZvcm1bXSxcbiAgZmllbGRzOiBzdHJpbmdbXSxcbiAgZGlhbG9nRmllbGRzOiBzdHJpbmdbXSxcbiAgZGlhbG9nTGFiZWxGaWVsZHM6IHN0cmluZ1tdLFxuICBjZWxsU3R5bGVzOiB7W2tleTogc3RyaW5nXTogYW55fSB8IG51bGwsXG4gIHJvd1N0eWxlOiB7W2tleTogc3RyaW5nXTogYW55fSB8IG51bGwsXG4gIHBlcmNXaWR0aDogc3RyaW5nW10sXG4gIGJhY2tncm91bmRDb2xvckE/OiBzdHJpbmcsXG4gIGJhY2tncm91bmRDb2xvckI/OiBzdHJpbmcsXG4pOiBhbnlbXSB7XG4gIGNvbnN0IHJlczoge1trZXk6IHN0cmluZ106IGFueX1bXSA9IFtdO1xuICBpZiAoYmFja2dyb3VuZENvbG9yQSA9PSBudWxsKSB7XG4gICAgYmFja2dyb3VuZENvbG9yQSA9ICd3aGl0ZSc7XG4gIH1cbiAgaWYgKGJhY2tncm91bmRDb2xvckIgPT0gbnVsbCkge1xuICAgIGJhY2tncm91bmRDb2xvckIgPSAnI2RkZCc7XG4gIH1cbiAgaWYgKHJvd1N0eWxlID09IG51bGwpIHtcbiAgICByb3dTdHlsZSA9IHtcbiAgICAgICd0ZXh0LWFsaWduJzogJ3JpZ2h0JyxcbiAgICAgICdtYXJnaW4tYm90dG9tJzogMCxcbiAgICAgICdib3JkZXItY29sbGFwc2UnOiAnY29sbGFwc2UnLFxuICAgIH07XG4gIH1cbiAgaWYgKGNlbGxTdHlsZXMgPT0gbnVsbCkge1xuICAgIGNlbGxTdHlsZXMgPSB7XG4gICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxuICAgICAgY29sb3I6ICdibGFjaycsXG4gICAgfTtcbiAgfVxuICBpZiAocGVyY1dpZHRoID09IG51bGwgfHwgcGVyY1dpZHRoLmxlbmd0aCAhPT0gZmllbGRzLmxlbmd0aCkge1xuICAgIGNvbnN0IGNlbGxXaWR0aCA9IDEwMCAvIGZpZWxkcy5sZW5ndGggKyAnJSc7XG4gICAgcGVyY1dpZHRoID0gW107XG4gICAgZmllbGRzLmZvckVhY2goXyA9PiBwZXJjV2lkdGgucHVzaChjZWxsV2lkdGgpKTtcbiAgfVxuXG4gIGlmIChkYXRhc2V0KSB7XG4gICAgbGV0IGluZGV4OiBudW1iZXIgPSAwO1xuICAgIGRhdGFzZXQuZm9yRWFjaCgoZGF0YTogTWFpbkZvcm0pID0+IHtcbiAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgIGluZGV4Kys7XG4gICAgICAgIC8vIFJvdyBpcyBhbiBBamZUYWJsZVdpZGdldFxuICAgICAgICBjb25zdCByb3c6IHtba2V5OiBzdHJpbmddOiBhbnl9ID0ge1xuICAgICAgICAgIHN0eWxlczoge1xuICAgICAgICAgICAgJ3RleHQtYWxpZ24nOiAncmlnaHQnLFxuICAgICAgICAgICAgJ21hcmdpbi1ib3R0b20nOiAwLFxuICAgICAgICAgICAgJ2JvcmRlci1jb2xsYXBzZSc6ICdjb2xsYXBzZScsXG4gICAgICAgICAgICAuLi5yb3dTdHlsZSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHZpc2liaWxpdHk6IHtjb25kaXRpb246ICd0cnVlJ30sXG4gICAgICAgICAgd2lkZ2V0VHlwZTogNSxcbiAgICAgICAgICBkYXRhc2V0OiBbW11dIGFzIGFueVtdW10sXG4gICAgICAgICAgY2VsbFN0eWxlczogeydib3JkZXItdG9wJzogJzFweCBzb2xpZCBncmV5J30sXG4gICAgICAgIH07XG5cbiAgICAgICAgZmllbGRzLmZvckVhY2goKGZpZWxkOiBzdHJpbmcsIGNlbGxJZHg6IG51bWJlcikgPT4ge1xuICAgICAgICAgIGxldCBmb3JtdWxhQ2VsbCA9ICdcIlwiJztcbiAgICAgICAgICBpZiAoZGF0YVtmaWVsZF0gIT0gbnVsbCkge1xuICAgICAgICAgICAgZm9ybXVsYUNlbGwgPSAnXCInICsgZGF0YVtmaWVsZF0gKyAnXCInO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJvd1snZGF0YXNldCddWzBdLnB1c2goe1xuICAgICAgICAgICAgbGFiZWw6ICcnLFxuICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgY29sb3I6ICdibGFjaycsXG4gICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogaW5kZXggJSAyID09PSAwID8gYmFja2dyb3VuZENvbG9yQSA6IGJhY2tncm91bmRDb2xvckIsXG4gICAgICAgICAgICAgIC4uLmNlbGxTdHlsZXMsXG4gICAgICAgICAgICAgIHdpZHRoOiBwZXJjV2lkdGhbY2VsbElkeF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZm9ybXVsYToge1xuICAgICAgICAgICAgICBmb3JtdWxhOiBmb3JtdWxhQ2VsbCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb2xzcGFuOiAxLFxuICAgICAgICAgICAgcm93c3BhbjogMSxcbiAgICAgICAgICAgIGFnZ3JlZ2F0aW9uOiB7XG4gICAgICAgICAgICAgIGFnZ3JlZ2F0aW9uOiAwLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IGh0bWxEaWFsb2c6IHN0cmluZ1tdID0gW107XG4gICAgICAgIGRpYWxvZ0ZpZWxkcy5mb3JFYWNoKChmaWVsZDogc3RyaW5nLCBjZWxsSWR4OiBudW1iZXIpID0+IHtcbiAgICAgICAgICBsZXQgZmllbGRWYWx1ZSA9ICdcIlwiJztcbiAgICAgICAgICBpZiAoZGF0YVtmaWVsZF0gIT0gbnVsbCkge1xuICAgICAgICAgICAgZmllbGRWYWx1ZSA9XG4gICAgICAgICAgICAgIFwiPHAgY2xhc3M9J2RpYWxvZy1pdGVtJz48Yj5cIiArXG4gICAgICAgICAgICAgIGRpYWxvZ0xhYmVsRmllbGRzW2NlbGxJZHhdICtcbiAgICAgICAgICAgICAgJzwvYj4gPHNwYW4+JyArXG4gICAgICAgICAgICAgIGRhdGFbZmllbGRdICtcbiAgICAgICAgICAgICAgJzwvc3Bhbj48L3A+JztcbiAgICAgICAgICAgIGh0bWxEaWFsb2cucHVzaChmaWVsZFZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IGRpYWxvZ0NvbnRlbnQ6IHtba2V5OiBzdHJpbmddOiBhbnl9ID0ge1xuICAgICAgICAgIHdpZGdldFR5cGU6IDMsXG4gICAgICAgICAgc3R5bGVzOiB7XG4gICAgICAgICAgICAnbWFyZ2luJzogJzAgMWVtJyxcbiAgICAgICAgICAgICdwYWRkaW5nJzogJzVweCAxMHB4JyxcbiAgICAgICAgICAgICdtYXgtaGVpZ2h0JzogJzM2MHB4JyxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHZpc2liaWxpdHk6IHtjb25kaXRpb246ICd0cnVlJ30sXG4gICAgICAgICAgaHRtbFRleHQ6IGh0bWxEaWFsb2cuam9pbignICcpLFxuICAgICAgICB9O1xuXG4gICAgICAgIC8vIFRoaXMgaXMgYSBEaWFsb2cgV2lkZ2V0LCBhZGRlZCBhcyBjb210YWluZXIgZm9yIGVhY2ggdGFibGUgd2lkZ2V0XG4gICAgICAgIGNvbnN0IGRpYWxvZ1Jvdzoge1trZXk6IHN0cmluZ106IGFueX0gPSB7XG4gICAgICAgICAgd2lkZ2V0VHlwZTogMTMsXG4gICAgICAgICAgc3R5bGVzOiB7XG4gICAgICAgICAgICAnbWFyZ2luJzogJzAnLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgdmlzaWJpbGl0eToge2NvbmRpdGlvbjogJ3RydWUnfSxcbiAgICAgICAgICB0b2dnbGU6IHJvdyxcbiAgICAgICAgICBjb250ZW50OiBbZGlhbG9nQ29udGVudF0sXG4gICAgICAgIH07XG4gICAgICAgIHJlcy5wdXNoKGRpYWxvZ1Jvdyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cblxuLyoqXG4gKlxuICogQHBhcmFtIGZvcm1zIHRoZSBmb3JtIGRhdGFcbiAqIEBwYXJhbSBpdGVyYXRpb25zIGFsbCB2YWx1ZXMgb2YgaXRlcmF0aW9uXG4gKiBAcGFyYW0gZm4gdGhlIGZ1Y3Rpb24gb2YgZXhwcmVzc2lvbi11dGlscyB0byBhcHBseSBhdCBpdGVyYXRpb25cbiAqIEBwYXJhbSBwYXJhbTEgZmlyc3QgcGFyYW0gb2YgZm5cbiAqIEBwYXJhbSBwYXJhbTIgc2Vjb25kIHBhcmFtIG9mIGZuXG4gKiBAcmV0dXJucyB0aGUgcmVzdWx0IG9mIGZuIGFwcGxpZWQgdG8gYWxsIHZhbHVlcyBwYXJhbSBjb25kaXRpb25zXG4gKiAmY3VycmVudCBpcyBhbiBhbmNob3Iga2V5LCBUaGUgcGFyYW1zIHdpdGggJmN1cnJlbnQgd2lsbCBiZSBtb2RpZmllZCB3aXRoIHRoZSBpdGVyYXRpb24gdmFsdWVzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gUkVQRUFUKFxuICBmb3JtczogTWFpbkZvcm1bXSxcbiAgaXRlcmF0aW9uczogc3RyaW5nW10sXG4gIGZuOiBBamZWYWxpZGF0aW9uRm4sXG4gIHBhcmFtMTogc3RyaW5nLFxuICBwYXJhbTI6IHN0cmluZyA9ICd0cnVlJyxcbik6IGFueVtdIHtcbiAgY29uc3QgcmVzOiBhbnlbXSA9IFtdO1xuICBjb25zdCBuZXdFeHAxID1cbiAgICBwYXJhbTEgIT0gbnVsbCAmJiBwYXJhbTEuaW5jbHVkZXMoJ2N1cnJlbnQnKVxuICAgICAgPyAodjogYW55KSA9PiBwYXJhbTEuc3BsaXQoJ2N1cnJlbnQnKS5qb2luKEpTT04uc3RyaW5naWZ5KHYpKVxuICAgICAgOiAoKSA9PiBwYXJhbTE7XG4gIGNvbnN0IG5ld0V4cDIgPVxuICAgIHBhcmFtMiAhPSBudWxsICYmIHBhcmFtMi5pbmNsdWRlcygnY3VycmVudCcpXG4gICAgICA/ICh2OiBhbnkpID0+IHBhcmFtMi5zcGxpdCgnY3VycmVudCcpLmpvaW4oSlNPTi5zdHJpbmdpZnkodikpXG4gICAgICA6ICgpID0+IHBhcmFtMjtcbiAgaXRlcmF0aW9ucy5mb3JFYWNoKHYgPT4ge1xuICAgIGNvbnN0IHZ2ID0gKGZuIGFzIGFueSkoZm9ybXMsIG5ld0V4cDEodiksIG5ld0V4cDIodikpO1xuICAgIHJlcy5wdXNoKHZ2KTtcbiAgfSk7XG4gIHJldHVybiByZXM7XG59XG5mdW5jdGlvbiBidWlsZEZuKGV4cHJlc3Npb246IHN0cmluZyk6IGFueSB7XG4gIHJldHVybiAodjogYW55KSA9PiB7XG4gICAgY29uc3QgbmV3RXhwID0gZXhwcmVzc2lvblxuICAgICAgLnNwbGl0KCdhamZfZm9ybScpXG4gICAgICAuam9pbihgJHtKU09OLnN0cmluZ2lmeSh2KX1gKVxuICAgICAgLnNwbGl0KCdjdXJyZW50JylcbiAgICAgIC5qb2luKGAke0pTT04uc3RyaW5naWZ5KHYpfWApO1xuICAgIHJldHVybiBuZXdFeHA7XG4gIH07XG59XG5cbi8qKlxuICogdGhpcyBmdW5jdGlvbiBhbGxvdyB0byBkZWZpbmUgYSBuZXcgYXR0cmlidXRlIG9mIG1haW5mb3JtLlxuICogdGhlIGF0dHJpYnV0ZSBmaWVsZCB3aWxsIGJlIGFkZGVkIG9uIGV2ZXJ5IGZvcm0gYW5kIGl0IHRha2VzIHRoZSByZXN1bHQgb2YgZXhwcmVzc2lvbiBjYWxjdWxhdGVkXG4gKiBmb3IgZXZlcnkgbWFpbmZvcm1cbiAqXG4gKiBAZXhwb3J0XG4gKiBAcGFyYW0ge01haW5Gb3JtW119IGZvcm1MaXN0XG4gKiBAcGFyYW0ge3N0cmluZ30gZmllbGRcbiAqIEBwYXJhbSB7c3RyaW5nfSBleHByZXNzaW9uXG4gKiBAcmV0dXJuIHsqfSAge01haW5Gb3JtW119XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBBUFBMWShmb3JtTGlzdDogTWFpbkZvcm1bXSwgZmllbGQ6IHN0cmluZywgZXhwcmVzc2lvbjogc3RyaW5nKTogTWFpbkZvcm1bXSB7XG4gIGNvbnN0IGV4cEZuID0gYnVpbGRGbihleHByZXNzaW9uKTtcbiAgZm9ybUxpc3QgPSBjbG9uZU1haW5Gb3Jtcyhmb3JtTGlzdCk7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBmb3JtTGlzdC5sZW5ndGg7IGkrKykge1xuICAgIGlmIChmb3JtTGlzdFtpXSA9PSBudWxsKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgaWYgKGZvcm1MaXN0W2ldLnJlcHMgIT0gbnVsbCkge1xuICAgICAgZm9ybUxpc3RbaV1bZmllbGRdID0gZXZhbHVhdGVFeHByZXNzaW9uKGV4cEZuKGZvcm1MaXN0W2ldKSwgZm9ybUxpc3RbaV0pO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZm9ybUxpc3Q7XG59XG5cbi8qKlxuICogdGhpcyBmdW5jdGlvbiByb3VuZCBhIG51bWJlcixcbiAqIGlmIHlvdSBuZWVkIGNhbiBiZSBkZWZpbmUgZGUgZGlnaXRzIG9mIHJvdW5kXG4gKlxuICogQGV4cG9ydFxuICogQHBhcmFtIHsobnVtYmVyIHwgc3RyaW5nKX0gbnVtXG4gKiBAcGFyYW0ge251bWJlcn0gW2RpZ2l0c11cbiAqIEByZXR1cm4geyp9ICB7bnVtYmVyfVxuICovXG5leHBvcnQgZnVuY3Rpb24gUk9VTkQobnVtOiBudW1iZXIgfCBzdHJpbmcsIGRpZ2l0cz86IG51bWJlcik6IG51bWJlciB7XG4gIHJldHVybiByb3VuZChudW0sIGRpZ2l0cyk7XG59XG5cbi8qKlxuICogdGhpcyBmdW5jdGlvbiBldmFsdWVhdGUgYSBjb25kaXRpb24gaWYgdHJ1ZSByZXR1cm4gYnJhbmNoMSBlbHNlIGJyYW5jaDJcbiAqXG4gKiBAZXhwb3J0XG4gKiBAcGFyYW0ge3N0cmluZ30gY29uZGl0aW9uXG4gKiBAcGFyYW0geyp9IGJyYW5jaDFcbiAqIEBwYXJhbSB7Kn0gYnJhbmNoMlxuICogQHJldHVybiB7Kn0gIHsqfVxuICovXG5leHBvcnQgZnVuY3Rpb24gRVZBTFVBVEUoY29uZGl0aW9uOiBzdHJpbmcsIGJyYW5jaDE6IGFueSwgYnJhbmNoMjogYW55KTogYW55IHtcbiAgaWYgKGV2YWx1YXRlRXhwcmVzc2lvbihjb25kaXRpb24pKSB7XG4gICAgcmV0dXJuIGJyYW5jaDE7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGJyYW5jaDI7XG4gIH1cbn1cbi8qKlxuICogVGhpcyBmdW5jdGlvbiBidWlsZHMgYSBkYXRhIHN0cnVjdHVyZSB0aGF0IGFsbG93cyB0aGUgdXNlIG9mIHRoZSBoaW5kaWtpdCBmb3JtdWxhc1xuICogZm9yIGV2ZXJ5IGZvcm1zIHdpdGggcmVwZWF0aW5nIHNsaWRlcy5cbiAqIEluIHBhcnRpY3VsYXIsIGl0IGJ1aWxkcyBhIG1haW4gZGF0YSBmb3JtIHdpdGggYWxsIHRoZSBkYXRhIHJlbGF0aW5nIHRvIHRoZSBzbGlkZXMgYW5kXG4gKiBhIGRpY3Rpb25hcnkgd2l0aCB0aGUgbmFtZSByZXBzIHRodXMgbWFkZSBpbnN0YW5jZSBzbGlkZU5hbWUgZm9ybXMuXG4gKiBXaGVyZSBhIGZvcm0gaXMgYXNzb2NpYXRlZCB3aXRoIGVhY2ggaW5zdGFuY2Ugb2YgdGhlIHJlcGVhdGluZyBzbGlkZS5cbiAqIGV4YW1wbGU6XG4gKiBzaW1wbGUgZm9ybTpcbiAqICB7XG4gKiAgICAkdmFsdWU6IFwiQUdPXCJcbiAqICAgIGNpdHRhZGluYW56YV9fMDogXCJBR09cIlxuICogICAgY29kaWNlX2Zpc2NhbGVfXzA6IFwiamRmbGpnbMOya8Oya8OyXCJcbiAqICAgIGNvdW50cnlfXzA6IFwiQUdPXCJcbiAqICAgIGRhdGVfZW5kOiBcIjIwMjEtMDEtMTBcIlxuICogICAgZGF0ZV9zdGFydDogXCIyMDIxLTAxLTEwXCJcbiAqICAgIGRvYl9fMDogXCIyMDIxLTAzLTExXCJcbiAqICAgIGZpcnN0X25hbWVfXzA6IFwicGlwcG9cIlxuICogICAgZ2VuZGVyX18wOiBcImZcIlxuICogICAgaWRfZmFtaWx5OiBcIjNiZWYzYTNmLWQ5NWQtNGEwOS04ZGY0LWU4MTJjNTVjNjFjNlwiXG4gKiAgICBpc3RydXppb25lX18wOiBudWxsXG4gKiAgICBsYXN0X25hbWVfXzA6IFwicGlwcG9cIlxuICogICAgcGVybWVzc29fc29nZ2lvcm5vX18wOiBcIm5vXCJcbiAqICAgIHJlbGF6aW9uZV9fMDogXCJnZW5pdG9yZVwiXG4gKiAgICBzb2xpZGFuZG86IFwic29saWRhbmRvMVwiXG4gKiAgICBzdGF0b19jaXZpbGVfXzA6IG51bGxcbiAqICB9XG4gKiBhZnRlciBCVUlMRF9EQVRBU0VUXG4gKiBNYWluRm9ybTpcbiAqIHtcbiAqICAgICR2YWx1ZTogXCJBR09cIlxuICogICAgYWpmX2Zvcm1faWQ6IDAgKiogYWRkZWQgYXRyaWJ1dGUgdGhhdCByYXBwcmVzZW50IHRoZSBpbmRleCBwb3NpdGlvbiBpbnNpZGVzIGlucHV0IGZvcm0gbGlzdC5cbiAqICAgIGFqZl9mYW1pbHlfY29tcG9uZW50X2NvdW50OiAxKiogYWRkZWQgYXRyaWJ1dGUgdGhhdCByYXBwcmVzZW50IHRoZSBpbnN0YW5jZSBudW1iZXIgb2YgZmFtaWxpX2NvbXBvbmVudCByZXBlYXRpbmcgc2xpZGVzLlxuICogICAgZGF0ZV9lbmQ6IFwiMjAyMS0wMS0xMFwiXG4gKiAgICBkYXRlX3N0YXJ0OiBcIjIwMjEtMDEtMTBcIlxuICogICAgaWRfZmFtaWx5OiBcIjNiZWYzYTNmLWQ5NWQtNGEwOS04ZGY0LWU4MTJjNTVjNjFjNlwiXG4gKiAgICByZXBzOiB7XG4gKiAgICAgIGZhbWlseV9jb21wb25lbnQ6IFtcbiAqICAgICAgICB7XG4gKiAgICAgICAgICBhamZfZmFtaWx5X2NvbXBvbmVudF9yZXA6IDAgKiogYWRkZWQgYXRyaWJ1dGUgdGhhdCByYXBwcmVzZW50IHRoZSBvcmRlciBpbnN0YW5jZSBvZiBmYW1pbHlfY29tcG9uZW50IHJlcGVhdGluZyBzbGlkZS5cbiAqICAgICAgICAgIGNpdHRhZGluYW56YTogXCJBR09cIlxuICogICAgICAgICAgY29kaWNlX2Zpc2NhbGU6IFwiamRmbGpnbMOya8Oya8OyXCJcbiAqICAgICAgICAgIGNvdW50cnk6IFwiQUdPXCJcbiAqICAgICAgICAgIGRvYjogXCIyMDIxLTAzLTExXCJcbiAqICAgICAgICAgIGZpcnN0X25hbWU6IFwicGlwcG9cIlxuICogICAgICAgICAgZ2VuZGVyOiBcImZcIlxuICogICAgICAgICAgaXN0cnV6aW9uZTogbnVsbFxuICogICAgICAgICAgbGFzdF9uYW1lOiBcInBpcHBvXCJcbiAqICAgICAgICAgIHBlcm1lc3NvX3NvZ2dpb3JubzogXCJub1wiXG4gKiAgICAgICAgICByZWxhemlvbmU6IFwiZ2VuaXRvcmVcIlxuICogICAgICAgICAgc3RhdG9fY2l2aWxlOiBudWxsXG4gKiAgICAgICAgfVxuICogICAgICBdXG4gKiAgICB9XG4gKiB9XG4gKlxuICogQHBhcmFtIHtGb3JtW119IGZvcm1zXG4gKiBAcGFyYW0geyp9IFtzY2hlbWFdIGlmIHNjaGVtYSBpcyBwcm92aWRlZCB0aGUgaW5zdGFuY2VzIGluc2lkZSB0aGUgcmVwcyBtYXRjaCB3aXRoIGVmZmVjdGl2ZVxuICogc2xpZGUgbmFtZS4gT3RoZXJ3aXNlIGFsbCByZXBlYXRpbmcgc2xpZGVzIGFyZSBhc3NvY2lhdGVzIHRvIGdlbmVyaWMgc2xpZGUgbmFtZSBcInJlcFwiLlxuICogQHJldHVybiB7Kn0gIHtNYWluRm9ybVtdfVxuICovXG5leHBvcnQgZnVuY3Rpb24gQlVJTERfREFUQVNFVChmb3JtczogRm9ybVtdLCBzY2hlbWE/OiBhbnkpOiBNYWluRm9ybVtdIHtcbiAgY29uc3QgcmVzOiBNYWluRm9ybVtdID0gW107XG4gIGNvbnN0IGdlbmVyYXRlTWV0YWRhdGEgPSAoc2xpZGVOYW1lOiBzdHJpbmcsIHNsaWRlSW5zdGFuY2U6IG51bWJlcikgPT4ge1xuICAgIGNvbnN0IHJlc2c6IHtbc25hbWU6IHN0cmluZ106IGFueX0gPSB7fTtcbiAgICByZXNnW2BhamZfJHtzbGlkZU5hbWV9X3JlcGBdID0gc2xpZGVJbnN0YW5jZTtcbiAgICByZXR1cm4gcmVzZztcbiAgfTtcblxuICBmb3JtcyA9IFsuLi4oZm9ybXMgfHwgW10pXTtcblxuICBpZiAoc2NoZW1hICE9IG51bGwpIHtcbiAgICBjb25zdCByZXBlYXRpbmdTbGlkZXM6IGFueVtdID0gc2NoZW1hLm5vZGVzLmZpbHRlcigobm9kZTogYW55KSA9PiBub2RlLm5vZGVUeXBlID09PSA0KTtcbiAgICBjb25zdCBvYmo6IHtbZmllbGROYW1lOiBzdHJpbmddOiBzdHJpbmd9ID0ge307XG4gICAgcmVwZWF0aW5nU2xpZGVzLmZvckVhY2goc2xpZGUgPT4ge1xuICAgICAgbGV0IG5vZGVGaWVsZHMgPSBzbGlkZS5ub2Rlcy5tYXAoKG46IGFueSkgPT4gbi5uYW1lKTtcbiAgICAgIG5vZGVGaWVsZHMuZm9yRWFjaCgobm9kZUZpZWxkOiBzdHJpbmcpID0+IHtcbiAgICAgICAgb2JqW25vZGVGaWVsZF0gPSBzbGlkZS5uYW1lO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBmb3Jtcy5mb3JFYWNoKChmLCBmb3JtSWR4KSA9PiB7XG4gICAgICBjb25zdCBtYWluRm9ybTogTWFpbkZvcm0gPSB7cmVwczoge319O1xuICAgICAgY29uc3QgZktleXM6IHN0cmluZ1tdID0gT2JqZWN0LmtleXMoZik7XG4gICAgICBjb25zdCBpbnN0YW5jZXM6IHtbc2xpZGVOYW1lOiBzdHJpbmddOiBhbnl9ID0ge307XG5cbiAgICAgIGZLZXlzLmZvckVhY2goZmtleSA9PiB7XG4gICAgICAgIGNvbnN0IHNwbGl0dGVkS2V5OiBzdHJpbmdbXSA9IGZrZXkuc3BsaXQoJ19fJyk7XG4gICAgICAgIGNvbnN0IHNwbGl0dGVkTGVuZ3RoOiBudW1iZXIgPSBzcGxpdHRlZEtleS5sZW5ndGg7XG4gICAgICAgIGNvbnN0IGZpZWxkTmFtZSA9IHNwbGl0dGVkS2V5WzBdO1xuICAgICAgICBjb25zdCBzbGlkZUluc3RhbmNlID1cbiAgICAgICAgICBzcGxpdHRlZEtleVsxXSAhPSBudWxsICYmIE51bWJlci5pc0ludGVnZXIoK3NwbGl0dGVkS2V5WzFdKSA/ICtzcGxpdHRlZEtleVsxXSA6IG51bGw7XG4gICAgICAgIGNvbnN0IHNsaWRlTmFtZSA9IG9ialtmaWVsZE5hbWVdO1xuICAgICAgICBpZiAoc3BsaXR0ZWRMZW5ndGggPT09IDIgJiYgc2xpZGVJbnN0YW5jZSAhPSBudWxsICYmIHNsaWRlTmFtZSAhPSBudWxsKSB7XG4gICAgICAgICAgaW5zdGFuY2VzW3NsaWRlTmFtZV0gPSBpbnN0YW5jZXNbc2xpZGVOYW1lXSAhPSBudWxsID8gaW5zdGFuY2VzW3NsaWRlTmFtZV0gOiBbXTtcbiAgICAgICAgICBpbnN0YW5jZXNbc2xpZGVOYW1lXVtzbGlkZUluc3RhbmNlXSA9XG4gICAgICAgICAgICBpbnN0YW5jZXNbc2xpZGVOYW1lXVtzbGlkZUluc3RhbmNlXSAhPSBudWxsXG4gICAgICAgICAgICAgID8gaW5zdGFuY2VzW3NsaWRlTmFtZV1bc2xpZGVJbnN0YW5jZV1cbiAgICAgICAgICAgICAgOiBnZW5lcmF0ZU1ldGFkYXRhKHNsaWRlTmFtZSwgc2xpZGVJbnN0YW5jZSk7XG4gICAgICAgICAgaW5zdGFuY2VzW3NsaWRlTmFtZV1bc2xpZGVJbnN0YW5jZV1bZmllbGROYW1lXSA9IGZbZmtleV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbWFpbkZvcm1bZmtleV0gPSBmW2ZrZXldO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIG1haW5Gb3JtW2BhamZfZm9ybV9pZGBdID0gZm9ybUlkeDtcbiAgICAgIGNvbnN0IGluc3RhbmNlS2V5cyA9IE9iamVjdC5rZXlzKGluc3RhbmNlcyk7XG4gICAgICBpbnN0YW5jZUtleXMuZm9yRWFjaChpbnN0YW5jZUtleSA9PiB7XG4gICAgICAgIG1haW5Gb3JtW2BhamZfJHtpbnN0YW5jZUtleX1fY291bnRgXSA9IGluc3RhbmNlc1tpbnN0YW5jZUtleV0ubGVuZ3RoO1xuICAgICAgfSk7XG4gICAgICBtYWluRm9ybS5yZXBzID0gaW5zdGFuY2VzO1xuICAgICAgcmVzLnB1c2gobWFpbkZvcm0pO1xuICAgIH0pO1xuICAgIHJldHVybiByZXM7XG4gIH0gZWxzZSB7XG4gICAgZm9ybXMuZm9yRWFjaChmb3JtID0+IHtcbiAgICAgIGNvbnN0IGZLZXlzOiBzdHJpbmdbXSA9IE9iamVjdC5rZXlzKGZvcm0pO1xuICAgICAgY29uc3Qgbm9SZXBlYXRpbmdGaWVsZHM6IHN0cmluZ1tdID0gZktleXMuZmlsdGVyKGZrZXkgPT4ge1xuICAgICAgICBjb25zdCBzcGxpdHRlZEtleTogc3RyaW5nW10gPSBma2V5LnNwbGl0KCdfXycpO1xuICAgICAgICBpZiAoc3BsaXR0ZWRLZXkubGVuZ3RoID09PSAyKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSk7XG4gICAgICBjb25zdCBub1JlcEZvcm06IEZvcm0gPSB7fTtcblxuICAgICAgbm9SZXBlYXRpbmdGaWVsZHMuZm9yRWFjaChmaWVsZCA9PiB7XG4gICAgICAgIG5vUmVwRm9ybVtmaWVsZF0gPSBmb3JtW2ZpZWxkXTtcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBtYWluRm9ybTogTWFpbkZvcm0gPSB7Li4ubm9SZXBGb3JtLCByZXBzOiB7c2xpZGU6IFtdfX07XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IE1BWF9SRVBTOyBpKyspIHtcbiAgICAgICAgY29uc3QgY3VycmVudFNsaWRlOiBGb3JtID0ge307XG4gICAgICAgIGNvbnN0IG9ubHlDdXJyZW50SW5zdGFuY2VLZXlzOiBzdHJpbmdbXSA9IGZLZXlzLmZpbHRlcihma2V5ID0+IHtcbiAgICAgICAgICBjb25zdCBzcGxpdHRlZEtleTogc3RyaW5nW10gPSBma2V5LnNwbGl0KCdfXycpO1xuICAgICAgICAgIGlmIChzcGxpdHRlZEtleS5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgICAgIHJldHVybiBma2V5LmluZGV4T2YoYF9fJHtpfWApID4gLTE7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIHNlIGlsIG51bWVybyBkaSBhdHRyaWJ1dGkgY29pbmNpZGUgaWwgZm9ybSBkYXRhIG5vbiBoYSByZXBlYXRpbmdzbGlkZXNcbiAgICAgICAgaWYgKG9ubHlDdXJyZW50SW5zdGFuY2VLZXlzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIG1haW5Gb3JtWydhamZfcmVwX2NvdW50J10gPSBpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIG9ubHlDdXJyZW50SW5zdGFuY2VLZXlzLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgICBjb25zdCBzcGxpdHRlZEtleSA9IGtleS5zcGxpdCgnX18nKTtcbiAgICAgICAgICBjb25zdCBmaWVsZE5hbWUgPSBzcGxpdHRlZEtleVswXTtcbiAgICAgICAgICBjb25zdCBzbGlkZUluc3RhbmNlID0gc3BsaXR0ZWRLZXlbMV0gIT0gbnVsbCA/ICtzcGxpdHRlZEtleVsxXSA6IG51bGw7XG4gICAgICAgICAgY3VycmVudFNsaWRlW2ZpZWxkTmFtZV0gPSBmb3JtW2tleV07XG4gICAgICAgICAgY3VycmVudFNsaWRlWydhamZfcmVwJ10gPSBzbGlkZUluc3RhbmNlICE9IG51bGwgPyBzbGlkZUluc3RhbmNlIDogY3VycmVudFNsaWRlWydhamZfcmVwJ107XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAob25seUN1cnJlbnRJbnN0YW5jZUtleXMubGVuZ3RoICE9IDApIHtcbiAgICAgICAgICBtYWluRm9ybS5yZXBzIVsnc2xpZGUnXS5wdXNoKGN1cnJlbnRTbGlkZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbWFpbkZvcm0ucmVwcyA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmVzLnB1c2gobWFpbkZvcm0pO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHJlcztcbiAgfVxufVxuXG4vKipcbiAqIFVUSUxJVFkgRlVOQ0lPTlxuICogVGhpcyBmdW5jdGlvbiB0YWtlIGFuIGFqZiBzY2hlbWEgYXMgaW5wdXQgYW5kIGV4dHJhY3QgYVxuICogZGljdCB0aGF0IG1hdGNoIGVhY2ggY2hvaWNlIHZhbHVlIChhbHNvIHdpdGggY2hvaWNlc09yaWdpbiBuYW1lIHByZWZpeCkgd2l0aCBpdHMgbGFiZWxcbiAqIEBwYXJhbSBzY2hlbWEgdGhlIGFqZiBzY2hlbWFcbiAqIEByZXR1cm5zIEEgZGljdCB3aXRoOlxuICogIHtbY2hvaWNlc09yaWdpbk5hbWVfY2hvaWNlVmFsdWU6IHN0cmluZ106IFtjaG9pY2VMYWJlbDogc3RyaW5nXX1cbiAqICB7W2Nob2ljZVZhbHVlOiBzdHJpbmddOiBbY2hvaWNlTGFiZWw6IHN0cmluZ119XG4gKi9cbmZ1bmN0aW9uIGV4dHJhY3RMYWJlbHNCeVNjaGVtYUNob2ljZXMoc2NoZW1hOiBhbnkpOiB7W2Nob2ljZVZhbHVlOiBzdHJpbmddOiBzdHJpbmd9IHtcbiAgY29uc3QgY2hvaWNlTGFiZWxzOiB7W2Nob2ljZVZhbHVlOiBzdHJpbmddOiBzdHJpbmd9ID0ge307XG4gIGlmIChzY2hlbWEgJiYgc2NoZW1hLmNob2ljZXNPcmlnaW5zICE9IG51bGwpIHtcbiAgICAoc2NoZW1hLmNob2ljZXNPcmlnaW5zIGFzIGFueVtdKS5mb3JFYWNoKGNob2ljZXNPcmlnaW4gPT4ge1xuICAgICAgaWYgKGNob2ljZXNPcmlnaW4gIT0gbnVsbCAmJiBjaG9pY2VzT3JpZ2luLmNob2ljZXMgIT0gbnVsbCkge1xuICAgICAgICAoY2hvaWNlc09yaWdpbi5jaG9pY2VzIGFzIGFueVtdKS5mb3JFYWNoKGNob2ljZSA9PiB7XG4gICAgICAgICAgY2hvaWNlTGFiZWxzW2Nob2ljZXNPcmlnaW4ubmFtZSArICdfJyArIGNob2ljZS52YWx1ZV0gPSBjaG9pY2UubGFiZWw7XG4gICAgICAgICAgY2hvaWNlTGFiZWxzW2Nob2ljZS52YWx1ZV0gPSBjaG9pY2UubGFiZWw7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIHJldHVybiBjaG9pY2VMYWJlbHM7XG59XG5cbi8qKlxuICogVVRJTElUWSBGVU5DSU9OXG4gKiBUaGlzIGZ1bmN0aW9uIHRha2UgYW4gYWpmIHNjaGVtYSBhcyBpbnB1dCBhbmQgZXh0cmFjdCBhIG9uZVxuICogZGltZW5zaW9uYWwgYXJyYXkgb2YgQWpmTm9kZSBmb3IgZWFjaCBzbGlkZSdzIGZpZWxkXG4gKlxuICogQHBhcmFtIHNjaGVtYSB0aGUgYWpmIHNjaGVtYVxuICogQHJldHVybnMgQW4gb2JqZWN0IHdpdGggYWxsIGZpZWxkczpcbiAqICB7W2ZpZWxkTmFtZTogc3RyaW5nXTogYWpmIGZpZWxkfVxuICovXG5mdW5jdGlvbiBleHRyYWN0RmxhdHRlbk5vZGVzKHNjaGVtYTogYW55KToge1tmaWVsZDogc3RyaW5nXTogYW55fSB7XG4gIGNvbnN0IGZpZWxkTm9kZXM6IHtbZmllbGQ6IHN0cmluZ106IGFueX0gPSB7fTtcbiAgaWYgKHNjaGVtYSAmJiBzY2hlbWEubm9kZXMpIHtcbiAgICBjb25zdCBzbGlkZXM6IGFueVtdID0gc2NoZW1hLm5vZGVzLmZpbHRlcihcbiAgICAgIChub2RlOiBhbnkpID0+IG5vZGUubm9kZVR5cGUgPT09IDMgfHwgbm9kZS5ub2RlVHlwZSA9PT0gNCxcbiAgICApO1xuICAgIHNsaWRlcy5mb3JFYWNoKHNsaWRlID0+IHtcbiAgICAgIHNsaWRlLm5vZGVzXG4gICAgICAgIC5maWx0ZXIoKG5vZGU6IGFueSkgPT4gbm9kZS5ub2RlVHlwZSA9PT0gMClcbiAgICAgICAgLmZvckVhY2goKGZpZWxkTm9kZTogYW55KSA9PiB7XG4gICAgICAgICAgZmllbGROb2Rlc1tmaWVsZE5vZGUubmFtZV0gPSBmaWVsZE5vZGU7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9XG4gIHJldHVybiBmaWVsZE5vZGVzO1xufVxuXG4vKipcbiAqIFRoaXMgZnVuY3Rpb24gdGFrZSBhIGxpc3Qgb2YgZm9ybXMsIGFuIGFqZiBzY2hlbWEgYW5kIGEgbGlzdCBvZiBmaWVsZCBuYW1lcyBhcyBpbnB1dCBhbmQgYnVpbGRzXG4gKiBhIGRhdGEgc3RydWN0dXJlIHRoYXQgcmVwbGFjZSBhIGxpc3Qgb2YgbGFiZWwgbWF0Y2hlZCBpbnNpZGUgYSBzY2hlbWEgY2hvaWNoZSBvcmlnaW5zLlxuICpcbiAqIEBwYXJhbSB7TWFpbkZvcm1bXX0gZm9ybUxpc3RcbiAqIEBwYXJhbSB7Kn0gc2NoZW1hIHRoZSBhamYgc2NoZW1hXG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBmaWVsZE5hbWVzXG4gKiBAcmV0dXJuIHsqfSAge01haW5Gb3JtW119XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBBUFBMWV9MQUJFTFMoZm9ybUxpc3Q6IE1haW5Gb3JtW10sIHNjaGVtYTogYW55LCBmaWVsZE5hbWVzOiBzdHJpbmdbXSk6IE1haW5Gb3JtW10ge1xuICBmb3JtTGlzdCA9IGNsb25lTWFpbkZvcm1zKGZvcm1MaXN0KTtcbiAgY29uc3QgY2hvaWNlTGFiZWxzOiB7W2ZpZWxkTmFtZTogc3RyaW5nXTogc3RyaW5nfSA9IGV4dHJhY3RMYWJlbHNCeVNjaGVtYUNob2ljZXMoc2NoZW1hKTtcbiAgY29uc3QgZmxhdHRlbk5vZGVzID0gZXh0cmFjdEZsYXR0ZW5Ob2RlcyhzY2hlbWEpO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZm9ybUxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoZm9ybUxpc3RbaV0gPT0gbnVsbCkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGlmIChmb3JtTGlzdFtpXS5yZXBzICE9IG51bGwpIHtcbiAgICAgIGNvbnN0IGYgPSBmb3JtTGlzdFtpXTtcbiAgICAgIGNvbnN0IGZLZXlzOiBzdHJpbmdbXSA9IE9iamVjdC5rZXlzKGYpO1xuICAgICAgZktleXMuZm9yRWFjaChma2V5ID0+IHtcbiAgICAgICAgY29uc3QgZmllbGROb2RlID0gZmxhdHRlbk5vZGVzW2ZrZXldO1xuICAgICAgICBjb25zdCBjaG9pY2VPcmlnaW5OYW1lUHJlZml4ID1cbiAgICAgICAgICBmaWVsZE5vZGUgJiYgZmllbGROb2RlLmNob2ljZXNPcmlnaW5SZWYgPyBmaWVsZE5vZGUuY2hvaWNlc09yaWdpblJlZiArICdfJyA6ICcnO1xuXG4gICAgICAgIGlmIChmaWVsZE5hbWVzLmluY2x1ZGVzKGZrZXkpICYmIGZbZmtleV0gIT09IG51bGwpIHtcbiAgICAgICAgICBsZXQgY2hvaWNlVmFsdWU6IHN0cmluZ1tdID0gW107XG4gICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZltma2V5XSkpIHtcbiAgICAgICAgICAgIGNob2ljZVZhbHVlID0gZltma2V5XSBhcyB1bmtub3duIGFzIHN0cmluZ1tdO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBtdWx0aXBsZVZhbHMgPSAoZltma2V5XSBhcyBzdHJpbmcpLnNwbGl0KCcsJykubWFwKHYgPT4gdi50cmltKCkpO1xuICAgICAgICAgICAgaWYgKG11bHRpcGxlVmFscy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgIGNob2ljZVZhbHVlID0gbXVsdGlwbGVWYWxzO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgY2hvaWNlVmFsdWUgPSBbZltma2V5XSBhcyBzdHJpbmddO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoY2hvaWNlVmFsdWUgIT0gbnVsbCkge1xuICAgICAgICAgICAgY29uc3QgbGFiZWxzID0gY2hvaWNlVmFsdWUubWFwKHZhbCA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IHZhbFdpdGhQcmVmaXggPSBjaG9pY2VPcmlnaW5OYW1lUHJlZml4ICsgdmFsO1xuICAgICAgICAgICAgICByZXR1cm4gY2hvaWNlTGFiZWxzW3ZhbFdpdGhQcmVmaXhdICE9IG51bGxcbiAgICAgICAgICAgICAgICA/IGNob2ljZUxhYmVsc1t2YWxXaXRoUHJlZml4XVxuICAgICAgICAgICAgICAgIDogY2hvaWNlTGFiZWxzW3ZhbF0gIT0gbnVsbFxuICAgICAgICAgICAgICAgID8gY2hvaWNlTGFiZWxzW3ZhbF1cbiAgICAgICAgICAgICAgICA6IHZhbDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKGxhYmVscyAmJiBsYWJlbHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgIGNvbnN0IGxhYmVsRmllbGROYW1lID0gZmtleSArICdfY2hvaWNlc0xhYmVsJztcbiAgICAgICAgICAgICAgZm9ybUxpc3RbaV1bbGFiZWxGaWVsZE5hbWVdID0gbGFiZWxzLmxlbmd0aCA+IDEgPyBsYWJlbHMuam9pbignLCAnKSA6IGxhYmVsc1swXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZm9ybUxpc3Q7XG59XG5cbi8qKlxuICpcbiAqIEBwYXJhbSB7TWFpbkZvcm1bXX0gZm9ybUxpc3QgYSBzZXQgb2YgbWFpbiBmb3Jtc1xuICogQHBhcmFtIHtzdHJpbmd9IGV4cHJlc3Npb24gdG8gYmUgZXZhbHVhdGVkLCBhbHNvIHdpdGggcmVwb3J0IHZhcmlhYmxlcyB2YWx1ZXMuXG4gKiBAcmV0dXJuIHsqfSAge01haW5Gb3JtW119XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBGSUxURVJfQllfVkFSUyhmb3JtTGlzdDogTWFpbkZvcm1bXSwgZXhwcmVzc2lvbjogc3RyaW5nKTogTWFpbkZvcm1bXSB7XG4gIHJldHVybiBGSUxURVJfQlkoZm9ybUxpc3QsIGV4cHJlc3Npb24pO1xufVxuXG4vKipcbiAqIFRoaXMgZnVuY3Rpb24gYnVpbGQgYSBwYXJ0aXRpb24gb2YgZm9ybUxpc3QgYnkgZXhlY3V0aW9uIG9mIGV4cHJlc3Npb24uXG4gKiBGb3IgZXZlcnkgbWFpbkZvcm0gdGhlIGV4cHJlc3Npb24gbWF0Y2ggbWFpbmZvcm0gZmllbGQgYW5kIHJlcGxhY2UgaXQuXG4gKiBJZiB0aGUgZXZhbHVhdGlvbiBvZiBleHByZXNzaW9uIGlzIHRydWUgdGhlIG1haW5Gb3JtIHdhcyBhZGRlZCB0byBwYXJ0aXRpb25cbiAqICh0aGF0IGJlY291c2UgdGhlIGV4cHJlc3Npb24gZG9uJ3QgaGFzIHJlcGVhdGluZyBzbGlkZSBmaWVsZHMpIGVsc2UgaWZcbiAqIHRoZXJlIGFyZSByZXBzIGZvciBldmVyeSByZXAgdGhlIGV4cHJlc3Npb24gaXMgdXBkYXRlZCB3aXRoIHJlcGxhY2luZyBvZlxuICogcmVwZWF0aW5nIHNsaWRlIGluc3RhbmNlIGZpZWxkcyBhbmQgZXZhbHVhdGVkLCBpZiB0cnVlIHdhcyBhZGRlZCB0byBwYXJ0aXRpb24uXG4gKiBBbGwgYWpmIGF0dHJpYnV0ZXMgd2FkIHVwZGF0ZWQuIC9UT0RPXG4gKlxuICpcbiAqIEBwYXJhbSB7TWFpbkZvcm1bXX0gZm9ybUxpc3QgYSBzZXQgb2YgbWFpbiBmb3Jtc1xuICogQHBhcmFtIHtzdHJpbmd9IGV4cHJlc3Npb24gdG8gYmUgZXZhbHVhdGVkLiB0aGF0IGNhbiBiZSBhYmxlIHRvIGNvbnRhaW5zIGFub3RoZXJcbiAqIGhpbmRpa2l0IGZ1bmN0aW9ucyBvciBtYWluRm9ybSBmaWVsZHMgb3IgcmVwcyBmaWVsZHMuXG4gKiBAcmV0dXJuIHsqfSAge01haW5Gb3JtW119XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBGSUxURVJfQlkoZm9ybUxpc3Q6IE1haW5Gb3JtW10sIGV4cHJlc3Npb246IHN0cmluZyk6IE1haW5Gb3JtW10ge1xuICBjb25zdCBmb3JtczogTWFpbkZvcm1bXSA9IGNsb25lTWFpbkZvcm1zKGZvcm1MaXN0IHx8IFtdKS5maWx0ZXIoZiA9PiBmICE9IG51bGwpO1xuICBjb25zdCBpZGVudGlmaWVycyA9IFsuLi5uZXcgU2V0KGdldENvZGVJZGVudGlmaWVycyhleHByZXNzaW9uLCB0cnVlKSldO1xuICBsZXQgcmVzOiBNYWluRm9ybVtdID0gW107XG4gIGlmIChleHByZXNzaW9uID09PSAndHJ1ZScpIHtcbiAgICByZXR1cm4gZm9ybXM7XG4gIH1cbiAgaWYgKGZvcm1zLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZm9ybXMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBtYWluRm9ybTogTWFpbkZvcm0gPSBmb3Jtc1tpXTtcbiAgICBsZXQgZXhwciA9IGV4cHJlc3Npb247XG4gICAgaWYgKG1haW5Gb3JtID09IG51bGwpIHtcbiAgICAgIHJlcy5wdXNoKG1haW5Gb3JtKTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICAvKiByZXBsYWNlIG1haW4gZm9ybSBmaWVsZCBpbnNpZGUgZXhwcmVzc2lvbiAqL1xuICAgIGlkZW50aWZpZXJzLmZvckVhY2goaWRlbnRpZmllciA9PiB7XG4gICAgICBjb25zdCBjaGFuZ2UgPSBtYWluRm9ybVtpZGVudGlmaWVyXSA/IG1haW5Gb3JtW2lkZW50aWZpZXJdIDogbnVsbDtcbiAgICAgIGlmIChjaGFuZ2UpIHtcbiAgICAgICAgZXhwciA9IGV4cHIuc3BsaXQoaWRlbnRpZmllcikuam9pbihKU09OLnN0cmluZ2lmeShjaGFuZ2UpKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICAvKiBpZiB0aGF0J3MgYWxyZWFkeSB0cnVlIHB1c2ggaXQgaW4gcmVzICovXG4gICAgaWYgKGV2YWx1YXRlRXhwcmVzc2lvbihleHByLCBtYWluRm9ybSkpIHtcbiAgICAgIHJlcy5wdXNoKG1haW5Gb3JtKTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGxldCBuZXdSZXBzOiBJbnN0YW5jZXMgfCB1bmRlZmluZWQ7XG4gICAgY29uc3QgY2hpbGRLZXlzID0gT2JqZWN0LmtleXMobWFpbkZvcm0ucmVwcyBhcyBJbnN0YW5jZXMpO1xuXG4gICAgY2hpbGRLZXlzLmZvckVhY2goY2hpbGRLZXkgPT4ge1xuICAgICAgY29uc3QgY3VycmVudFJlcHMgPSAoKG1haW5Gb3JtLnJlcHMgYXMgSW5zdGFuY2VzKVtjaGlsZEtleV0gYXMgRm9ybVtdKVxuICAgICAgICAuZmlsdGVyKChmb3JtOiBGb3JtKSA9PiB7XG4gICAgICAgICAgbGV0IHJlcEV4cHIgPSBleHByO1xuICAgICAgICAgIC8qIHJlcGxhY2UgcmVwIGZpZWxkIGluc2lkZSBleHByZXNzaW9uICovXG4gICAgICAgICAgaWRlbnRpZmllcnMuZm9yRWFjaChpZGVudGlmaWVyID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNoYW5nZUluUmVwID0gZm9ybVtpZGVudGlmaWVyXSA/IGZvcm1baWRlbnRpZmllcl0gOiBudWxsO1xuICAgICAgICAgICAgaWYgKGNoYW5nZUluUmVwKSB7XG4gICAgICAgICAgICAgIHJlcEV4cHIgPSByZXBFeHByLnNwbGl0KGlkZW50aWZpZXIpLmpvaW4oSlNPTi5zdHJpbmdpZnkoY2hhbmdlSW5SZXApKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXR1cm4gZXZhbHVhdGVFeHByZXNzaW9uKHJlcEV4cHIsIGZvcm0pO1xuICAgICAgICB9KVxuICAgICAgICAuZmlsdGVyKGYgPT4gZiAhPSBudWxsKTtcbiAgICAgIGlmIChjdXJyZW50UmVwcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIG5ld1JlcHMgPSAobmV3UmVwcyAhPSBudWxsID8gbmV3UmVwcyA6IHt9KSBhcyBJbnN0YW5jZXM7XG4gICAgICAgIG5ld1JlcHNbY2hpbGRLZXldID0gY3VycmVudFJlcHM7XG4gICAgICB9XG4gICAgICBtYWluRm9ybVtgYWpmXyR7Y2hpbGRLZXl9X2NvdW50YF0gPSBjdXJyZW50UmVwcy5sZW5ndGg7XG4gICAgfSk7XG4gICAgaWYgKG5ld1JlcHMgPT0gbnVsbCkge1xuICAgICAgcmVzLnB1c2gobnVsbCBhcyB1bmtub3duIGFzIE1haW5Gb3JtKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbWFpbkZvcm0ucmVwcyA9IG5ld1JlcHM7XG4gICAgICByZXMucHVzaChtYWluRm9ybSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlcztcbn1cblxuLyoqXG4gKiByZXR1cm4gdGhlIHRvZGF5IGRhdGVcbiAqXG4gKiBAZXhwb3J0XG4gKiBAcGFyYW0ge3N0cmluZ30gW2Zvcm1hdD0neXl5eS1NTS1kZCddXG4gKiBAcmV0dXJuIHsqfSAge3N0cmluZ31cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIFRPREFZKGZvcm1hdCA9ICd5eXl5LU1NLWRkJyk6IHN0cmluZyB7XG4gIHJldHVybiBkYXRlRm5zLmZvcm1hdChuZXcgRGF0ZSgpLCBmb3JtYXQpO1xufVxuXG4vKipcbiAqIFVUSUxJVFkgRlVOQ1RJT05cbiAqICB0aGlzIGZ1bmN0aW9uIGFsbG93IHRoZSBjb25zb2xlIGxvZyBvZiBleGNlbCB2YXJpYWJsZXMuXG4gKiBAZXhwb3J0XG4gKiBAcGFyYW0geyp9IHZhbFxuICogQHBhcmFtIHtzdHJpbmd9IFt0ZXh0PSdsb2c6ICddXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBDT05TT0xFX0xPRyh2YWw6IGFueSwgdGV4dCA9ICdsb2c6ICcpOiB2b2lkIHtcbiAgY29uc29sZS5sb2codGV4dCwgdmFsKTtcbn1cblxuLyoqXG4gKiB0aGlzIGZ1bmN0aW9uIHRha2UgYSBzdHJpbmcgZGF0ZSBhbmQgcmV0dXJuIHRoZSBkaWZmZXJlbmNlIGluIHllYXIgZnJvbSBkb2IgdG8gdG9kYXkuXG4gKlxuICogQGV4cG9ydFxuICogQHBhcmFtIHsoc3RyaW5nIHwgbnVsbCl9IGRvYlxuICogQHJldHVybiB7Kn0gIHtudW1iZXJ9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBHRVRfQUdFKGRvYjogc3RyaW5nIHwgbnVsbCk6IG51bWJlciB7XG4gIGlmIChkb2IgPT0gbnVsbCkgcmV0dXJuICsnPCc7IC8vIG5lZWQgZm9yIGdlbmVyYXRlIGZhbHNlIGZ1bmNpb24gaW4gZXZhbHVhdGVFeHByZXNzaW9uXG4gIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZShkb2IpO1xuICBjb25zdCBhZ2U6IG51bWJlciA9IGRhdGVGbnMuZGlmZmVyZW5jZUluWWVhcnMobmV3IERhdGUoKSwgZGF0ZSk7XG4gIHJldHVybiBhZ2U7XG59XG5cbi8qKlxuICogdGhpcyBmdW5jdGlvbiByZXR1cm5zIHJlcHMgbGVuZ3RoIGlmIHJlcHMgaW4gZGVmaW5lZCBvciB0aGUgbGVuZ3RoIG9mIGRhdGFzZXQgaWYgZGF0YXNldCBpcyBhcnJheS1cbiAqXG4gKiBAZXhwb3J0XG4gKiBAcGFyYW0geyhNYWluRm9ybSB8IGFueVtdKX0gZGF0YXNldFxuICogQHJldHVybiB7Kn0gIHtudW1iZXJ9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBMRU4oZGF0YXNldDogTWFpbkZvcm0gfCBhbnlbXSk6IG51bWJlciB7XG4gIGlmIChkYXRhc2V0ID09IG51bGwpIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuICBpZiAoKGRhdGFzZXQgYXMgTWFpbkZvcm0pLnJlcHMgIT0gbnVsbCkge1xuICAgIGNvbnN0IG1haW5Gb3JtID0gZGF0YXNldCBhcyBNYWluRm9ybTtcbiAgICBjb25zdCByZXBzID0gT2JqZWN0LmtleXMobWFpbkZvcm0ucmVwcyBhcyBJbnN0YW5jZXMpXG4gICAgICAubWFwKGtleSA9PiAobWFpbkZvcm0ucmVwcyBhcyBJbnN0YW5jZXMpW2tleV0uZmxhdCgpKVxuICAgICAgLmZsYXQoKTtcbiAgICByZXR1cm4gcmVwcy5sZW5ndGg7XG4gIH1cblxuICByZXR1cm4gKGRhdGFzZXQgYXMgYW55W10pLmxlbmd0aCB8fCAwO1xufVxuXG4vKipcbiAqIEFycmF5IGNvbmNhdGVuYXRpb24uXG4gKlxuICogQGV4cG9ydFxuICogQHBhcmFtIHthbnlbXX0gYVxuICogQHBhcmFtIHthbnlbXX0gYlxuICogQHJldHVybiB7Kn0gIHthbnlbXX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIENPTkNBVChhOiBhbnlbXSwgYjogYW55W10pOiBhbnlbXSB7XG4gIHJldHVybiBhLmNvbmNhdChiKTtcbn1cblxuLyoqXG4gKiBSZW1vdmVzIGR1cGxpY2F0ZSBlbGVtZW50cyBmcm9tIGFuIGFycmF5LlxuICpcbiAqIEBleHBvcnRcbiAqIEBwYXJhbSB7YW55W119IGFyclxuICogQHJldHVybiB7Kn0gIHthbnlbXX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIFJFTU9WRV9EVVBMSUNBVEVTKGFycjogYW55W10pOiBhbnlbXSB7XG4gIHJldHVybiBbLi4ubmV3IE1hcChhcnIubWFwKHYgPT4gW0pTT04uc3RyaW5naWZ5KHYpLCB2XSkpLnZhbHVlcygpXTtcbn1cblxuLyoqXG4gKiByZXR1cm4gdHJ1ZSBpZiBkYXRlIGlzIGJlZm9yZSB0aGVuIGRhdGVUb0NvbXBhcmVcbiAqXG4gKiBAZXhwb3J0XG4gKiBAcGFyYW0ge3N0cmluZ30gZGF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IGRhdGVUb0NvbXBhcmVcbiAqIEByZXR1cm4geyp9ICB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIElTX0JFRk9SRShkYXRlOiBzdHJpbmcsIGRhdGVUb0NvbXBhcmU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICBjb25zdCBkYXRlQTogRGF0ZSA9IGRhdGVGbnMucGFyc2VJU08oZGF0ZSk7XG4gIGNvbnN0IGRhdGVCOiBEYXRlID0gZGF0ZUZucy5wYXJzZUlTTyhkYXRlVG9Db21wYXJlKTtcbiAgcmV0dXJuIGRhdGVGbnMuaXNCZWZvcmUoZGF0ZUEsIGRhdGVCKTtcbn1cblxuLyoqXG4gKiByZXR1cm4gdHJ1ZSBpZiBkYXRlIGlzIGFmdGVyIHRoZW4gZGF0ZVRvQ29tcGFyZVxuICpcbiAqIEBleHBvcnRcbiAqIEBwYXJhbSB7c3RyaW5nfSBkYXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gZGF0ZVRvQ29tcGFyZVxuICogQHJldHVybiB7Kn0gIHtib29sZWFufVxuICovXG5leHBvcnQgZnVuY3Rpb24gSVNfQUZURVIoZGF0ZTogc3RyaW5nLCBkYXRlVG9Db21wYXJlOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgY29uc3QgZGF0ZUE6IERhdGUgPSBkYXRlRm5zLnBhcnNlSVNPKGRhdGUpO1xuICBjb25zdCBkYXRlQjogRGF0ZSA9IGRhdGVGbnMucGFyc2VJU08oZGF0ZVRvQ29tcGFyZSk7XG4gIHJldHVybiBkYXRlRm5zLmlzQWZ0ZXIoZGF0ZUEsIGRhdGVCKTtcbn1cblxuLyoqXG4gKiByZXR1cm4gdHJ1ZSBpZiBkYXRlIGlzIHdoaXRoaW4gaW50ZXJ2YWwgZnJvbSBkYXRlU3RhcnQgdG8gZGF0ZUVuZFxuICpcbiAqIEBleHBvcnRcbiAqIEBwYXJhbSB7c3RyaW5nfSBkYXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gZGF0ZVN0YXJ0XG4gKiBAcGFyYW0ge3N0cmluZ30gZGF0ZUVuZFxuICogQHJldHVybiB7Kn0gIHtib29sZWFufVxuICovXG5leHBvcnQgZnVuY3Rpb24gSVNfV0lUSElOX0lOVEVSVkFMKGRhdGU6IHN0cmluZywgZGF0ZVN0YXJ0OiBzdHJpbmcsIGRhdGVFbmQ6IHN0cmluZyk6IGJvb2xlYW4ge1xuICBjb25zdCBkYXRlVG9Db21wYXJlOiBEYXRlID0gZGF0ZUZucy5wYXJzZUlTTyhkYXRlKTtcbiAgY29uc3QgaW50ZXJ2YWw6IEludGVydmFsID0ge1xuICAgIHN0YXJ0OiBkYXRlRm5zLnBhcnNlSVNPKGRhdGVTdGFydCksXG4gICAgZW5kOiBkYXRlRm5zLnBhcnNlSVNPKGRhdGVFbmQpLFxuICB9O1xuICByZXR1cm4gZGF0ZUZucy5pc1dpdGhpbkludGVydmFsKGRhdGVUb0NvbXBhcmUsIGludGVydmFsKTtcbn1cblxuLyoqXG4gKiBjb21wYXJlIGEgZGF0ZSB3aXRoIHR3byBkYXRlcyBpbnRlcnZhbC4gUmV0dXJuICctMScgKG9yIHRoZSBmaXJzdCBlbGVtZW50IG9mIGxhYmVscyBhcnJheSkgaWYgZGF0ZVxuICogaXMgYmVmb3JlIHRoZSBkYXRlU3RhcnQsICcxJyAob3IgdGhlIHNlY29uZCBlbGVtZW50KSBpZiBkYXRlIGlzIGFmdGVyIHRoZSBkYXRlRW5kXG4gKiBvciAnMCcgKG9yIHRoZSBsYXN0IGVsZW1lbnQpIGlmIGRhdGUgaXMgd2l0aGluIGludGV2YWwuXG4gKlxuICogQGV4cG9ydFxuICogQHBhcmFtIHtzdHJpbmd9IGRhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBkYXRlU3RhcnRcbiAqIEBwYXJhbSB7c3RyaW5nfSBkYXRlRW5kXG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBsYWJlbHMgYW4gb3B0aW9uYWwgYXJyYXkgb2Ygc3RyaW5nIGZvciB0aGUgb3V0cHV0IHZhbHVlc1xuICogQHJldHVybiB7Kn0gIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBDT01QQVJFX0RBVEUoXG4gIGRhdGU6IHN0cmluZyxcbiAgZGF0ZVN0YXJ0OiBzdHJpbmcsXG4gIGRhdGVFbmQ6IHN0cmluZyxcbiAgbGFiZWxzPzogc3RyaW5nW10sXG4pOiBzdHJpbmcge1xuICBsZXQgcmVzID0gJyc7XG4gIGNvbnN0IGRhdGVUb0NvbXBhcmU6IERhdGUgPSBkYXRlRm5zLnBhcnNlSVNPKGRhdGUpO1xuICBjb25zdCBkYXRlQTogRGF0ZSA9IGRhdGVGbnMucGFyc2VJU08oZGF0ZVN0YXJ0KTtcbiAgY29uc3QgZGF0ZUI6IERhdGUgPSBkYXRlRm5zLnBhcnNlSVNPKGRhdGVFbmQpO1xuICBjb25zdCBpbnRlcnZhbDogSW50ZXJ2YWwgPSB7XG4gICAgc3RhcnQ6IGRhdGVBLFxuICAgIGVuZDogZGF0ZUIsXG4gIH07XG4gIGlmIChsYWJlbHMgPT0gbnVsbCkge1xuICAgIGxhYmVscyA9IFsnLTEnLCAnMScsICcwJ107XG4gIH1cbiAgaWYgKGRhdGVGbnMuaXNCZWZvcmUoZGF0ZVRvQ29tcGFyZSwgZGF0ZUEpKSB7XG4gICAgcmVzID0gbGFiZWxzWzBdO1xuICB9IGVsc2UgaWYgKGRhdGVGbnMuaXNBZnRlcihkYXRlVG9Db21wYXJlLCBkYXRlQikpIHtcbiAgICByZXMgPSBsYWJlbHNbMV07XG4gIH0gZWxzZSBpZiAoZGF0ZUZucy5pc1dpdGhpbkludGVydmFsKGRhdGVUb0NvbXBhcmUsIGludGVydmFsKSkge1xuICAgIHJlcyA9IGxhYmVsc1syXTtcbiAgfVxuICByZXR1cm4gcmVzO1xufVxuXG4vKipcbiAqIHRoaXMgZnVuY3Rpb24gZXh0ZW5kIGZvcm1zQSBkYXRhc2V0LlxuICogc2VhcmNoIGFsbCBtYXRjaCBvZiBrZXlBIGluIGZvcm1zQiwgaWYgZm91bmQgaWYgbWVyZ2UgZm9ybUEgYW5kIGZvcm1CLlxuICpcbiAqIEBleHBvcnRcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXlBXG4gKiBAcGFyYW0ge3N0cmluZ30gW2tleUJdXG4gKiBAcmV0dXJuIHsqfVxuICovXG5leHBvcnQgZnVuY3Rpb24gSk9JTl9GT1JNUyhcbiAgZm9ybXNBOiAoTWFpbkZvcm0gfCBGb3JtKVtdLFxuICBmb3Jtc0I6IChNYWluRm9ybSB8IEZvcm0pW10sXG4gIGtleUE6IHN0cmluZyxcbiAga2V5Qj86IHN0cmluZyxcbik6IChNYWluRm9ybSB8IEZvcm0pW10ge1xuICBmb3Jtc0EgPSBjbG9uZU1haW5Gb3Jtcyhmb3Jtc0EpO1xuICBmb3Jtc0IgPSBjbG9uZU1haW5Gb3Jtcyhmb3Jtc0IpO1xuICBjb25zdCBtZXJnZWRGb3JtczogKE1haW5Gb3JtIHwgRm9ybSlbXSA9IFtdO1xuICBpZiAoa2V5QSA9PSBudWxsIHx8IGZvcm1zQSA9PSBudWxsIHx8IGZvcm1zQS5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gbWVyZ2VkRm9ybXM7XG4gIH1cbiAgaWYgKGtleUIgPT0gbnVsbCkge1xuICAgIGtleUIgPSBrZXlBO1xuICB9XG4gIGlmIChmb3Jtc0IgPT0gbnVsbCB8fCBmb3Jtc0IubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIGZvcm1zQTtcbiAgfVxuICBmb3IgKGxldCBpID0gMDsgaSA8IGZvcm1zQS5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGZvcm1BID0gZm9ybXNBW2ldO1xuICAgIGNvbnN0IGtleUFWYWx1ZSA9IGZvcm1BW2tleUFdO1xuICAgIGxldCBtZXJnZWRGb3JtID0gey4uLmZvcm1BfTtcbiAgICBpZiAoZm9ybUEgPT0gbnVsbCB8fCBrZXlBVmFsdWUgPT0gbnVsbCkge1xuICAgICAgbWVyZ2VkRm9ybXMucHVzaChmb3JtQSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBmb3Jtc0IubGVuZ3RoOyBqKyspIHtcbiAgICAgIGNvbnN0IGZvcm1CID0gZm9ybXNCW2pdO1xuICAgICAgY29uc3Qga2V5QlZhbHVlID0gZm9ybUJba2V5Ql07XG4gICAgICBpZiAoZm9ybUIgPT0gbnVsbCB8fCBrZXlCVmFsdWUgPT0gbnVsbCkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmIChrZXlBVmFsdWUgPT09IGtleUJWYWx1ZSkge1xuICAgICAgICBtZXJnZWRGb3JtID0gey4uLmZvcm1BLCAuLi5mb3JtQn07XG4gICAgICAgIGlmIChmb3JtQS5yZXBzICE9IG51bGwgJiYgZm9ybUIucmVwcyAhPSBudWxsKSB7XG4gICAgICAgICAgbWVyZ2VkRm9ybS5yZXBzID0ge1xuICAgICAgICAgICAgLi4uKGZvcm1BIGFzIE1haW5Gb3JtKS5yZXBzLFxuICAgICAgICAgICAgLi4uKGZvcm1CIGFzIE1haW5Gb3JtKS5yZXBzLFxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIG1lcmdlZEZvcm1zLnB1c2gobWVyZ2VkRm9ybSk7XG4gIH1cblxuICByZXR1cm4gbWVyZ2VkRm9ybXM7XG59XG5cbi8qKlxuICogbGlrZSBKT0lOX0ZPUk1TIGJ1dCBleHRlbmRzIHRoZSBiZWhhdmlvdXIgb24gdGhlIHJlcHMuXG4gKiBzZWFyY2ggYWxsIG1hdGNoIG9mIHN1YktleUEgaW4gZm9ybUJcbiAqXG4gKiBAZXhwb3J0XG4gKiBAcGFyYW0ge01haW5Gb3JtW119IGZvcm1zQVxuICogQHBhcmFtIHtNYWluRm9ybVtdfSBmb3Jtc0JcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXlBXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5QlxuICogQHBhcmFtIHtzdHJpbmd9IHN1YktleUFcbiAqIEBwYXJhbSB7c3RyaW5nfSBbc3ViS2V5Ql1cbiAqIEByZXR1cm4geyp9ICB7TWFpbkZvcm1bXX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIEpPSU5fUkVQRUFUSU5HX1NMSURFUyhcbiAgZm9ybXNBOiBNYWluRm9ybVtdLFxuICBmb3Jtc0I6IE1haW5Gb3JtW10sXG4gIGtleUE6IHN0cmluZyxcbiAga2V5Qjogc3RyaW5nLFxuICBzdWJLZXlBOiBzdHJpbmcsXG4gIHN1YktleUI/OiBzdHJpbmcsXG4pOiBNYWluRm9ybVtdIHtcbiAgY29uc3QgbWVyZ2VkRm9ybXM6IE1haW5Gb3JtW10gPSBbXTtcbiAgZm9ybXNBID0gY2xvbmVNYWluRm9ybXMoZm9ybXNBKTtcbiAgZm9ybXNCID0gY2xvbmVNYWluRm9ybXMoZm9ybXNCKTtcbiAgaWYgKGtleUEgPT0gbnVsbCB8fCBmb3Jtc0EgPT0gbnVsbCB8fCBmb3Jtc0EubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIG1lcmdlZEZvcm1zO1xuICB9XG4gIGlmIChrZXlCID09IG51bGwpIHtcbiAgICBrZXlCID0ga2V5QTtcbiAgfVxuICBpZiAoZm9ybXNCID09IG51bGwgfHwgZm9ybXNCLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBmb3Jtc0E7XG4gIH1cbiAgaWYgKHN1YktleUEgPT0gbnVsbCkge1xuICAgIHJldHVybiBKT0lOX0ZPUk1TKGZvcm1zQSwgZm9ybXNCLCBrZXlBLCBrZXlCKSBhcyBNYWluRm9ybVtdO1xuICB9XG4gIGlmIChzdWJLZXlCID09IG51bGwpIHtcbiAgICBzdWJLZXlCID0gc3ViS2V5QTtcbiAgfVxuICBmb3IgKGxldCBpID0gMDsgaSA8IGZvcm1zQS5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGZvcm1BID0gZm9ybXNBW2ldO1xuICAgIGNvbnN0IGtleUFWYWx1ZSA9IGZvcm1BW2tleUFdO1xuICAgIGxldCBtZXJnZWRGb3JtID0gey4uLmZvcm1BfTtcbiAgICBpZiAoZm9ybUEgPT0gbnVsbCB8fCBrZXlBVmFsdWUgPT0gbnVsbCkge1xuICAgICAgbWVyZ2VkRm9ybXMucHVzaChmb3JtQSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBmb3Jtc0IubGVuZ3RoOyBqKyspIHtcbiAgICAgIGNvbnN0IGZvcm1CID0gZm9ybXNCW2pdO1xuICAgICAgY29uc3Qga2V5QlZhbHVlID0gZm9ybUJba2V5Ql07XG4gICAgICBpZiAoZm9ybUIgPT0gbnVsbCB8fCBrZXlCVmFsdWUgPT0gbnVsbCkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmIChrZXlBVmFsdWUgPT09IGtleUJWYWx1ZSkge1xuICAgICAgICBtZXJnZWRGb3JtID0gey4uLmZvcm1BLCAuLi5mb3JtQn07XG4gICAgICAgIG1lcmdlZEZvcm0ucmVwcyA9IHsuLi5mb3JtQS5yZXBzLCAuLi5mb3JtQi5yZXBzfTtcbiAgICAgICAgaWYgKGZvcm1BLnJlcHMgIT0gbnVsbCAmJiBmb3JtQi5yZXBzICE9IG51bGwpIHtcbiAgICAgICAgICBjb25zdCBtZXJnZWRSZXBzOiBJbnN0YW5jZXMgPSB7fTtcbiAgICAgICAgICBjb25zdCBjaGlsZEFLZXlzID0gT2JqZWN0LmtleXMoZm9ybUEucmVwcyk7XG4gICAgICAgICAgY29uc3QgY2hpbGRCID0gT2JqZWN0LmtleXMoZm9ybUIucmVwcylcbiAgICAgICAgICAgIC5tYXAoa2V5ID0+IChmb3JtQi5yZXBzIGFzIEluc3RhbmNlcylba2V5XS5mbGF0KCkpXG4gICAgICAgICAgICAuZmxhdCgpO1xuICAgICAgICAgIGNoaWxkQUtleXMuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaW5zdGFuY2UgPSAoZm9ybUEucmVwcyBhcyBJbnN0YW5jZXMpW2tleV07XG4gICAgICAgICAgICBtZXJnZWRSZXBzW2tleV0gPSBKT0lOX0ZPUk1TKFxuICAgICAgICAgICAgICBpbnN0YW5jZSBhcyB1bmtub3duIGFzIE1haW5Gb3JtW10sXG4gICAgICAgICAgICAgIGNoaWxkQiBhcyB1bmtub3duIGFzIE1haW5Gb3JtW10sXG4gICAgICAgICAgICAgIHN1YktleUEsXG4gICAgICAgICAgICAgIHN1YktleUIsXG4gICAgICAgICAgICApIGFzIEZvcm1bXTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBtZXJnZWRGb3JtLnJlcHMgPSBtZXJnZWRSZXBzO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICBtZXJnZWRGb3Jtcy5wdXNoKG1lcmdlZEZvcm0pO1xuICB9XG5cbiAgcmV0dXJuIG1lcmdlZEZvcm1zO1xufVxuXG4vKipcbiAqIHRoaXMgZnVuY3Rpb24gZXh0cmFjdCBhbiBhcnJheSBvZiBldmFsdWF0ZWQgZXhwcmVzc2lvbiBmcm9tIG1haW4gZm9ybSByZXBzLlxuICpcbiAqIEBleHBvcnRcbiAqIEBwYXJhbSB7TWFpbkZvcm19IG1haW5Gb3JtXG4gKiBAcGFyYW0ge3N0cmluZ30gZXhwcmVzc2lvblxuICogQHJldHVybiB7Kn0gIHthbnlbXX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIEZST01fUkVQUyhtYWluRm9ybTogTWFpbkZvcm0sIGV4cHJlc3Npb246IHN0cmluZyk6IGFueVtdIHtcbiAgY29uc3QgcmVzOiBhbnlbXSA9IFtdO1xuXG4gIGlmIChtYWluRm9ybSAhPSBudWxsICYmIG1haW5Gb3JtLnJlcHMgIT0gbnVsbCkge1xuICAgIGNvbnN0IHJlcHMgPSBPYmplY3Qua2V5cyhtYWluRm9ybS5yZXBzKVxuICAgICAgLm1hcChrZXkgPT4gKG1haW5Gb3JtLnJlcHMgYXMgSW5zdGFuY2VzKVtrZXldLmZsYXQoKSlcbiAgICAgIC5mbGF0KCk7XG4gICAgcmVwcy5mb3JFYWNoKGNoaWxkID0+IHtcbiAgICAgIHJlcy5wdXNoKGV2YWx1YXRlRXhwcmVzc2lvbihleHByZXNzaW9uLCBjaGlsZCkpO1xuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHJlcztcbn1cblxuLyoqXG4gKiB0aGlzIGZ1bmN0aW9uIHJldHVybiB0cnVlIGlmIHZhbHVlIGlzIGluc2lkZSBvZiBkYXRhc2V0XG4gKlxuICogQGV4cG9ydFxuICogQHBhcmFtIHthbnlbXX0gZGF0YXNldFxuICogQHBhcmFtIHsqfSB2YWx1ZVxuICogQHJldHVybiB7Kn0gIHtib29sZWFufVxuICovXG5leHBvcnQgZnVuY3Rpb24gSVNJTihkYXRhc2V0OiBhbnlbXSwgdmFsdWU6IGFueSk6IGJvb2xlYW4ge1xuICBpZiAoZGF0YXNldCA9PSBudWxsIHx8IHZhbHVlID09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIGRhdGFzZXQuaW5kZXhPZih2YWx1ZSkgPj0gMDtcbn1cblxuLyoqXG4gKiB0aGUgbGVuZ3RocyBvZiB0aGUgZGF0YXNldHMgYXJlIGFzc3VtZWQgdG8gYmUgdGhlIHNhbWUuXG4gKiB0aGlzIGZ1bmN0aW9uIHJldHVybiBhbiBhcnJheSBsaXN0IG9mIGNhbGN1bGF0ZWQgdmFsdWVzLlxuICogZWFjaCBlbGVtZW50IG9mIHRoZSBhcnJheSBpcyBjYWxjdWxhdGVkIGJ5IHJlcGxhY2luZyBlbGVtQSB3aXRoIHRoZSBjdXJyZW50IGVsZW1lbnQgb2YgYVxuICogYW5kIGVsZW1CIHdpdGggdGhlIGN1cnJlbnQgZWxlbWVudCBvZiBiIGluc2lkZSB0aGUgZXhwcmVzc2lvbi5cbiAqXG4gKiBAZXhwb3J0XG4gKiBAcGFyYW0ge251bWJlcltdfSBkYXRhc2V0QVxuICogQHBhcmFtIHtudW1iZXJbXX0gZGF0YXNldEJcbiAqIEBwYXJhbSB7c3RyaW5nfSBleHByZXNzaW9uXG4gKiBAcmV0dXJuIHsqfSAge251bWJlcltdfVxuICovXG5leHBvcnQgZnVuY3Rpb24gT1AoZGF0YXNldEE6IG51bWJlcltdLCBkYXRhc2V0QjogbnVtYmVyW10sIGV4cHJlc3Npb246IHN0cmluZyk6IG51bWJlcltdIHtcbiAgY29uc3QgcmVzOiBudW1iZXJbXSA9IFtdO1xuICBpZiAoZGF0YXNldEEgPT0gbnVsbCB8fCBkYXRhc2V0Qi5sZW5ndGggPiBkYXRhc2V0QS5sZW5ndGgpIHtcbiAgICByZXR1cm4gW107XG4gIH1cbiAgaWYgKGRhdGFzZXRCID09IG51bGwpIHtcbiAgICByZXR1cm4gZGF0YXNldEE7XG4gIH1cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhc2V0QS5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGVsZW1BID0gZGF0YXNldEFbaV0gfHwgMDtcbiAgICBjb25zdCBlbGVtQiA9IGRhdGFzZXRCW2ldIHx8IDA7XG4gICAgY29uc3QgZXhwciA9IGV4cHJlc3Npb25cbiAgICAgIC5zcGxpdCgnZWxlbUEnKVxuICAgICAgLmpvaW4oSlNPTi5zdHJpbmdpZnkoZWxlbUEpKVxuICAgICAgLnNwbGl0KCdlbGVtQicpXG4gICAgICAuam9pbihKU09OLnN0cmluZ2lmeShlbGVtQikpO1xuICAgIHJlcy5wdXNoKGV2YWx1YXRlRXhwcmVzc2lvbihleHByKSk7XG4gIH1cblxuICByZXR1cm4gcmVzO1xufVxuXG4vKipcbiAqIHRoaXMgZnVuY3Rpb24gdGFrZSBhIGFqZiBzY2hlbWEgYW5kIGEgbGlzdCBvZiB2YWx1ZXMgYXMgaW5wdXQgYW5kXG4gKiByZXR1cm5zIGEgbGlzdCBvZiBsYWJlbCBtYXRjaGVkIGluc2lkZSBhIHNjaGVtYSBjaG9pY2hlIG9yaWdpbnMuXG4gKlxuICogQGV4cG9ydFxuICogQHBhcmFtIHsqfSBzY2hlbWFcbiAqIEBwYXJhbSB7c3RyaW5nW119IHZhbHVlc1xuICogQHJldHVybiB7Kn0gIHtzdHJpbmdbXX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIEdFVF9MQUJFTFMoc2NoZW1hOiBhbnksIHZhbHVlczogc3RyaW5nW10pOiBzdHJpbmdbXSB7XG4gIGNvbnN0IGNob2ljZUxhYmVsczoge1tmaWVsZE5hbWU6IHN0cmluZ106IHN0cmluZ30gPSBleHRyYWN0TGFiZWxzQnlTY2hlbWFDaG9pY2VzKHNjaGVtYSk7XG4gIHJldHVybiB2YWx1ZXMubWFwKHZhbCA9PiAoY2hvaWNlTGFiZWxzW3ZhbF0gIT0gbnVsbCA/IGNob2ljZUxhYmVsc1t2YWxdIDogdmFsKSk7XG59XG4iXX0=