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
const nonNullInstances = (reps) => reps != null;
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
    forms.forEach(form => {
        let reps = {};
        if (form == null) {
            res.push(null);
        }
        else {
            if (form.reps != null) {
                Object.keys(form.reps).forEach(key => {
                    reps[key] = form.reps[key].slice(0);
                });
            }
            const f = { ...form, reps };
            res.push(f);
        }
    });
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
function floatify(num) {
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
    source = (source || []).slice(0).filter((f) => f != null);
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
    source = (source || []).slice(0).filter((f) => f != null);
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
    source = (source || []).slice(0).filter((f) => f != null);
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
    source = (source || []).slice(0).filter((f) => f != null);
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
    source = (source || []).slice(0).filter((f) => f != null);
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
    source = (source || []).slice(0).filter((f) => f != null);
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
    source = (source || []).slice(0).filter((f) => f != null);
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
    source = (source || []).slice(0).filter((f) => f != null);
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
 * Calculates all the possible results that a field has taken
 */
export function ALL_VALUES_OF(mainforms, fieldName) {
    const forms = [...(mainforms.filter(form => form != null) || [])];
    const allreps = [
        ...forms.map(form => {
            const { reps, ...v } = form;
            return v;
        }),
        ...forms
            .map(m => m.reps)
            .filter(nonNullInstances)
            .map(i => Object.keys(i)
            .map(k => i[k])
            .flat())
            .flat(),
    ];
    return [...new Set(allreps.filter(f => f[fieldName] != null).map(f => `${f[fieldName]}`))];
}
export function plainArray(params) {
    let res = [];
    params.forEach(param => {
        param = Array.isArray(param) ? param : [param];
        res = [...res, ...param];
    });
    return res;
}
/**
 * Counts the collected forms. The form name must be specified. An optional condition can be added
 * to discriminate which forms to count in.
 * the expression is first evaluated in mainForm if false the evaluation of expression is calculated
 * in any reps. If expression is true in reps the form is counted
 */
export function COUNT_FORMS(formList, expression = 'true') {
    const forms = (formList || []).slice(0).filter((f) => f != null);
    const identifiers = [...new Set(getCodeIdentifiers(expression, true))];
    let count = 0;
    if (expression === 'true') {
        return forms.length;
    }
    if (forms.length === 0) {
        return 0;
    }
    for (let i = 0; i < forms.length; i++) {
        const mainForm = forms[i];
        let exxpr = expression;
        identifiers.forEach(identifier => {
            const change = mainForm[identifier] ? mainForm[identifier] : null;
            if (change != null) {
                exxpr = exxpr.split(identifier).join(JSON.stringify(change));
            }
        });
        if (evaluateExpression(exxpr, mainForm)) {
            count++;
        }
        else if (mainForm.reps != null) {
            const allreps = Object.keys(mainForm.reps)
                .map((key) => mainForm.reps[key])
                .flat()
                .map((child) => evaluateExpression(exxpr, child))
                .reduce((a, b) => (a += +b), 0);
            if (allreps > 0) {
                count++;
            }
        }
    }
    return count;
}
/**
 * Counts the reps of the form.
 * the expression is first evaluated in mainForm  if true return all reps counting else the evaluation of expression is calculated
 * in any reps and return the count of all reps that satisfied the expression.
 */
export function COUNT_REPS(formList, expression = 'true') {
    const forms = cloneMainForms(formList).filter((f) => f != null);
    const identifiers = getCodeIdentifiers(expression, true);
    let exxpr = expression;
    let count = 0;
    if (forms.length === 0) {
        return 0;
    }
    for (let i = 0; i < forms.length; i++) {
        const mainForm = forms[i];
        if (mainForm.reps != null) {
            const allreps = Object.keys(mainForm.reps)
                .map((key) => mainForm.reps[key])
                .flat();
            allreps.forEach((child) => {
                if (evaluateExpression(expression, child)) {
                    count++;
                }
            });
        }
        identifiers.forEach(identifier => {
            const change = mainForm[identifier] ? mainForm[identifier] : null;
            if (change) {
                exxpr = expression.split(identifier).join(JSON.stringify(change));
            }
        });
        if (evaluateExpression(exxpr, mainForm)) {
            count++;
        }
    }
    return count;
}
/**
 * Counts the amount of unique form values for a specific field. The form name must be specified. An
 * optional condition can be added to discriminate which forms to count in
 */
export function COUNT_FORMS_UNIQUE(formList, fieldName, expression = 'true') {
    const forms = (formList || []).slice(0).filter((f) => f != null);
    const identifiers = [...new Set(getCodeIdentifiers(expression, true))];
    let values = [];
    if (forms.length === 0) {
        return 0;
    }
    for (let i = 0; i < forms.length; i++) {
        const mainForm = forms[i];
        let exxpr = expression;
        identifiers.forEach(identifier => {
            const change = mainForm[identifier] ? mainForm[identifier] : null;
            if (change != null) {
                exxpr = exxpr.split(identifier).join(JSON.stringify(change));
            }
        });
        if (mainForm.reps != null) {
            const fieldNameInMain = evaluateExpression(fieldName, mainForm);
            const allreps = Object.keys(mainForm.reps)
                .map((key) => mainForm.reps[key])
                .flat()
                .filter((child) => evaluateExpression(exxpr, child))
                .map((child) => fieldNameInMain != null ? fieldNameInMain : evaluateExpression(fieldName, child));
            if (allreps.length > 0) {
                values = [...values, ...allreps];
            }
        }
        if (evaluateExpression(exxpr, mainForm)) {
            const mValue = evaluateExpression(fieldName, mainForm);
            if (mValue != null) {
                values.push(mValue);
            }
        }
    }
    return [...new Set(values)].length;
}
/**
 * Aggregates and sums the values of one field. An optional condition can be added to discriminate
 * which forms to take for the sum.
 */
export function SUM(mainForms, field, condition = 'true') {
    const forms = (mainForms || [])
        .slice(0)
        .filter((f) => f != null);
    let count = 0;
    if (forms.length === 0) {
        return 0;
    }
    for (let i = 0; i < forms.length; i++) {
        const mainForm = forms[i];
        if (evaluateExpression(condition, mainForm)) {
            if (field in mainForm && mainForm[field] != null) {
                count += +mainForm[field] || 0;
                count = floatify(count);
            }
            else {
                if (mainForm.reps != null) {
                    const allreps = Object.keys(mainForm.reps)
                        .map((key) => mainForm.reps[key])
                        .flat();
                    allreps
                        .filter(c => c[field] != null)
                        .forEach((child) => {
                        count += +child[field] || 0;
                        count = floatify(count);
                    });
                }
            }
        }
        else {
            if (mainForm.reps != null) {
                const allreps = Object.keys(mainForm.reps)
                    .map((key) => mainForm.reps[key])
                    .flat();
                allreps
                    .filter(c => c[field] != null)
                    .forEach((child) => {
                    if (evaluateExpression(condition, child)) {
                        count += +child[field] || 0;
                        count = floatify(count);
                    }
                });
            }
        }
    }
    return count;
}
/**
 * Calculates the mean of a simple or derived value. An optional condition can be added to
 * discriminate which forms to take for the sum.
 */
export function MEAN(forms, fieldName) {
    forms = (forms || []).slice(0).filter((f) => f != null);
    fieldName = fieldName || '';
    let length = 0;
    let acc = 0;
    forms.forEach(form => {
        if (form[fieldName] == null && form.reps != null) {
            Object.keys(form.reps).forEach(rep => {
                form.reps[rep].forEach(rform => {
                    const rsVal = rform[fieldName];
                    if (rsVal != null) {
                        acc += evaluateExpression(`${rsVal}`, form);
                        length++;
                    }
                });
            });
        }
        else {
            acc += evaluateExpression(fieldName, form);
            length++;
        }
    });
    return `${ROUND(acc / length)}`;
}
/**
 * Calculates the % between two members.
 */
export function PERCENT(value1, value2) {
    const res = (+value1 * 100) / +value2;
    return Number.isFinite(res) ? `${ROUND(res)}%` : 'infinite';
}
/**
 * Calculates the expression in the last form by date.
 */
export function LAST(forms, expression, date = 'created_at') {
    forms = (forms || [])
        .slice(0)
        .filter((f) => f != null)
        .sort((a, b) => {
        const dateA = new Date(b[date]).getTime();
        const dateB = new Date(a[date]).getTime();
        return dateA - dateB;
    });
    if (forms.length > 0 && expression != null) {
        const identifiers = getCodeIdentifiers(expression, true);
        const lastForm = forms[forms.length - 1] || [];
        let exxpr = expression;
        identifiers.forEach(identifier => {
            const change = lastForm[identifier] ? lastForm[identifier] : null;
            if (change != null) {
                exxpr = exxpr.split(identifier).join(change);
            }
        });
        const formEval = evaluateExpression(expression, lastForm);
        if (formEval == false && lastForm.reps != null) {
            const allreps = Object.keys(lastForm.reps)
                .map((key) => lastForm.reps[key])
                .flat()
                .map((rep) => evaluateExpression(exxpr, rep))
                .reduce((a, b) => (a += +b), 0);
            if (allreps > 0) {
                return `${allreps}`;
            }
        }
        return formEval;
    }
    return '0';
}
/**
 * Calculates the max value of the field.
 */
export function MAX(forms, fieldName) {
    forms = (forms || []).slice(0).filter((f) => f != null);
    let max = 0;
    forms.forEach(form => {
        if (form[fieldName] == null && form.reps != null) {
            Object.keys(form.reps).forEach(rep => {
                form.reps[rep].forEach(_rform => {
                    if (form[fieldName] != null &&
                        !isNaN(form[fieldName]) &&
                        form[fieldName] > max) {
                        max = form[fieldName];
                    }
                });
            });
        }
        else {
            if (form[fieldName] != null &&
                !isNaN(form[fieldName]) &&
                form[fieldName] > max) {
                max = form[fieldName];
            }
        }
    });
    return max;
}
/**
 * Calculates the median value of the field.
 */
export function MEDIAN(forms, fieldName) {
    forms = (forms || []).slice(0).filter((f) => f != null);
    let numbers = [];
    forms.forEach(form => {
        if (form[fieldName] == null && form.reps != null) {
            Object.keys(form.reps).forEach(rep => {
                form.reps[rep].forEach(rform => {
                    if (rform[fieldName] != null) {
                        numbers.push(rform[fieldName]);
                    }
                });
            });
        }
        else {
            numbers.push(form[fieldName]);
        }
    });
    numbers = numbers.sort((a, b) => a - b).filter((item, pos, self) => self.indexOf(item) == pos);
    const res = Number.isInteger(numbers.length / 2)
        ? numbers[numbers.length / 2]
        : (numbers[+parseInt(`${numbers.length - 1 / 2}`) / 2] +
            numbers[+parseInt(`${numbers.length - 1 / 2}`) / 2 + 1]) /
            2;
    return `${ROUND(res)}`;
}
/**
 * Calculates the mode value of the field.
 */
export function MODE(forms, fieldName) {
    forms = (forms || []).slice(0).filter((f) => f != null);
    let maxCount = 0;
    const map = {};
    forms.forEach(f => {
        if (f[fieldName] == null && f.reps != null) {
            Object.keys(f)
                .filter(key => key.includes(fieldName))
                .forEach(rsField => {
                const value = f[rsField];
                if (value != null) {
                    map[value] = map[value] != null ? map[value] + 1 : 1;
                }
                if (map[value] > maxCount) {
                    maxCount = map[value];
                }
            });
        }
        else {
            const value = f[fieldName];
            if (value != null) {
                map[value] = map[value] != null ? map[value] + 1 : 1;
            }
            if (map[value] > maxCount) {
                maxCount = map[value];
            }
        }
    });
    return Object.keys(map)
        .filter(v => map[+v] === maxCount)
        .map(v => +v);
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
    forms = (forms || []).slice(0);
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
    const forms = cloneMainForms(formList || []).filter((f) => f != null);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwcmVzc2lvbi11dGlscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvbW9kZWxzL3NyYy91dGlscy9leHByZXNzaW9uLXV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUdILE9BQU8sS0FBSyxPQUFPLE1BQU0sVUFBVSxDQUFDO0FBQ3BDLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxTQUFTLENBQUM7QUFDcEMsT0FBTyxLQUFLLFNBQVMsTUFBTSxRQUFRLENBQUM7QUFJcEMsSUFBSSxXQUFXLEdBQVEsRUFBRSxDQUFDO0FBRTFCLE1BQU0sTUFBTSxHQUFHLFNBQVMsQ0FBQyxPQUFPLElBQUksU0FBUyxDQUFDO0FBWTlDLE1BQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQztBQUVwQixNQUFNLENBQUMsTUFBTSxrQkFBa0IsR0FBRyxDQUNoQyxNQUFjLEVBQ2QscUJBQThCLEtBQUssRUFDekIsRUFBRTtJQUNaLE1BQU0sV0FBVyxHQUFHLEVBQWMsQ0FBQztJQUNuQyxJQUFJO1FBQ0YsV0FBVyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsRUFBRTtZQUM3QixPQUFPLEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxFQUFFO2dCQUM3QixJQUFJLEtBQUssSUFBSSxZQUFZLEVBQUU7b0JBQ3pCLE1BQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO29CQUMzRCxJQUFJLGtCQUFrQixJQUFJLFVBQVUsS0FBSyxRQUFRLEVBQUU7d0JBQ2pELFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7cUJBQzlCO2lCQUNGO1lBQ0gsQ0FBQztTQUNGLENBQUMsQ0FBQztLQUNKO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDVixPQUFPLENB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SUFDRCxJQUFJLFFBQVEsSUFBSSxJQUFJLEVBQUU7UUFDcEIsT0FBTyxRQUFRLENBQUM7S0FDakI7SUFDRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUN4QyxNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQy9CLE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDL0IsTUFBTSxJQUFJLEdBQUcsVUFBVTthQUNwQixLQUFLLENBQUMsT0FBTyxDQUFDO2FBQ2QsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDM0IsS0FBSyxDQUFDLE9BQU8sQ0FBQzthQUNkLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDL0IsR0FBRyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0tBQ3BDO0lBRUQsT0FBTyxHQUFHLENBQUM7QUFDYixDQUFDO0FBRUQ7Ozs7Ozs7O0dBUUc7QUFDSCxNQUFNLFVBQVUsVUFBVSxDQUFDLE1BQVcsRUFBRSxNQUFnQjtJQUN0RCxNQUFNLFlBQVksR0FBa0MsNEJBQTRCLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDekYsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDbEYsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZDb250ZXh0fSBmcm9tICdAYWpmL2NvcmUvY29tbW9uJztcbmltcG9ydCAqIGFzIGRhdGVGbnMgZnJvbSAnZGF0ZS1mbnMnO1xuaW1wb3J0IHtwYXJzZVNjcmlwdH0gZnJvbSAnbWVyaXlhaCc7XG5pbXBvcnQgKiBhcyBudW1icm9Nb2QgZnJvbSAnbnVtYnJvJztcbmltcG9ydCB7QWpmVGFibGVDZWxsfSBmcm9tICdAYWpmL2NvcmUvdGFibGUnO1xuaW1wb3J0IHtBamZWYWxpZGF0aW9uRm59IGZyb20gJy4uL2ludGVyZmFjZS92YWxpZGF0aW9uLWZ1bmN0aW9uJztcblxubGV0IGV4ZWNDb250ZXh0OiBhbnkgPSB7fTtcblxuY29uc3QgbnVtYnJvID0gbnVtYnJvTW9kLmRlZmF1bHQgfHwgbnVtYnJvTW9kO1xuZXhwb3J0IGludGVyZmFjZSBGb3JtIHtcbiAgW2tleTogc3RyaW5nXTogc3RyaW5nIHwgbnVtYmVyIHwgbnVsbDtcbn1cbmV4cG9ydCBpbnRlcmZhY2UgSW5zdGFuY2VzIHtcbiAgW2luc3RhbmNlOiBzdHJpbmddOiBGb3JtW107XG59XG5leHBvcnQgaW50ZXJmYWNlIE1haW5Gb3JtIHtcbiAgW2tleTogc3RyaW5nXTogc3RyaW5nIHwgbnVtYmVyIHwgYm9vbGVhbiB8IG51bGwgfCBJbnN0YW5jZXMgfCB1bmRlZmluZWQgfCBudWxsO1xuICByZXBzPzogSW5zdGFuY2VzO1xufVxuXG5jb25zdCBNQVhfUkVQUyA9IDMwO1xuXG5leHBvcnQgY29uc3QgZ2V0Q29kZUlkZW50aWZpZXJzID0gKFxuICBzb3VyY2U6IHN0cmluZyxcbiAgaW5jbHVkZURvbGxhclZhbHVlOiBib29sZWFuID0gZmFsc2UsXG4pOiBzdHJpbmdbXSA9PiB7XG4gIGNvbnN0IGlkZW50aWZpZXJzID0gW10gYXMgc3RyaW5nW107XG4gIHRyeSB7XG4gICAgcGFyc2VTY3JpcHQoc291cmNlLnRvU3RyaW5nKCksIHtcbiAgICAgIG9uVG9rZW46ICh0b2tlbiwgc3RhcnQsIGVuZCkgPT4ge1xuICAgICAgICBpZiAodG9rZW4gPT0gJ0lkZW50aWZpZXInKSB7XG4gICAgICAgICAgY29uc3QgaWRlbnRpZmllciA9IHNvdXJjZS50b1N0cmluZygpLnN1YnN0cmluZyhzdGFydCwgZW5kKTtcbiAgICAgICAgICBpZiAoaW5jbHVkZURvbGxhclZhbHVlIHx8IGlkZW50aWZpZXIgIT09ICckdmFsdWUnKSB7XG4gICAgICAgICAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICB9KTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGNvbnNvbGUubG9nKHNvdXJjZSk7XG4gICAgY29uc29sZS5sb2coZSk7XG4gIH1cbiAgcmV0dXJuIGlkZW50aWZpZXJzLnNvcnQoKGkxLCBpMikgPT4gaTIubG9jYWxlQ29tcGFyZShpMSkpO1xufTtcblxuZXhwb3J0IGNvbnN0IGRhdGVVdGlscyA9IHtcbiAgYWRkRGF5czogZGF0ZUZucy5hZGREYXlzLFxuICBhZGRNb250aHM6IGRhdGVGbnMuYWRkTW9udGhzLFxuICBhZGRZZWFyczogZGF0ZUZucy5hZGRZZWFycyxcbiAgZW5kT2ZJU09XZWVrOiBkYXRlRm5zLmVuZE9mSVNPV2VlayxcbiAgZm9ybWF0OiBkYXRlRm5zLmZvcm1hdCxcbiAgZ2V0RGF5OiBkYXRlRm5zLmdldERheSxcbiAgcGFyc2U6IGRhdGVGbnMucGFyc2VJU08sXG4gIHN0YXJ0T2ZNb250aDogZGF0ZUZucy5zdGFydE9mTW9udGgsXG4gIHN0YXJ0T2ZJU09XZWVrOiBkYXRlRm5zLnN0YXJ0T2ZJU09XZWVrLFxuICBpc0JlZm9yZTogZGF0ZUZucy5pc0JlZm9yZSxcbn07XG5cbmV4cG9ydCBjbGFzcyBBamZFeHByZXNzaW9uVXRpbHMge1xuICAvLyBUT0RPIHdoYXQgaXMgaXQgZm9yXG4gIHN0YXRpYyBVVElMX0ZVTkNUSU9OUyA9ICcnO1xuICAvKipcbiAgICogSXQgaXMgYSBrZXktdmFsdWUgZGljdGlvbmFyeSwgdGhhdCBtYXBwaW5nIGFsbCBBamYgdmFsaWRhdGlvbiBmdW5jdGlvbnMuXG4gICAqL1xuICBzdGF0aWMgdXRpbHM6IHtbbmFtZTogc3RyaW5nXTogQWpmVmFsaWRhdGlvbkZufSA9IHtcbiAgICBkaWdpdENvdW50OiB7Zm46IGRpZ2l0Q291bnR9LFxuICAgIGRlY2ltYWxDb3VudDoge2ZuOiBkZWNpbWFsQ291bnR9LFxuICAgIGlzSW50OiB7Zm46IGlzSW50fSxcbiAgICBub3RFbXB0eToge2ZuOiBub3RFbXB0eX0sXG4gICAgdmFsdWVJbkNob2ljZToge2ZuOiB2YWx1ZUluQ2hvaWNlfSxcbiAgICBzY2FuR3JvdXBGaWVsZDoge2ZuOiBzY2FuR3JvdXBGaWVsZH0sXG4gICAgc3VtOiB7Zm46IHN1bX0sXG4gICAgZGF0ZU9wZXJhdGlvbnM6IHtmbjogZGF0ZU9wZXJhdGlvbnN9LFxuICAgIHJvdW5kOiB7Zm46IHJvdW5kfSxcbiAgICBleHRyYWN0QXJyYXk6IHtmbjogZXh0cmFjdEFycmF5fSxcbiAgICBleHRyYWN0U3VtOiB7Zm46IGV4dHJhY3RTdW19LFxuICAgIGV4dHJhY3RBcnJheVN1bToge2ZuOiBleHRyYWN0QXJyYXlTdW19LFxuICAgIGRyYXdUaHJlc2hvbGQ6IHtmbjogZHJhd1RocmVzaG9sZH0sXG4gICAgZXh0cmFjdERhdGVzOiB7Zm46IGV4dHJhY3REYXRlc30sXG4gICAgbGFzdFByb3BlcnR5OiB7Zm46IGxhc3RQcm9wZXJ0eX0sXG4gICAgc3VtTGFzdFByb3BlcnRpZXM6IHtmbjogc3VtTGFzdFByb3BlcnRpZXN9LFxuICAgIGNhbGN1bGF0ZVRyZW5kUHJvcGVydHk6IHtmbjogY2FsY3VsYXRlVHJlbmRQcm9wZXJ0eX0sXG4gICAgY2FsY3VsYXRlVHJlbmRCeVByb3BlcnRpZXM6IHtmbjogY2FsY3VsYXRlVHJlbmRCeVByb3BlcnRpZXN9LFxuICAgIGNhbGN1bGF0ZUF2Z1Byb3BlcnR5OiB7Zm46IGNhbGN1bGF0ZUF2Z1Byb3BlcnR5fSxcbiAgICBjYWxjdWxhdGVBdmdQcm9wZXJ0eUFycmF5OiB7Zm46IGNhbGN1bGF0ZUF2Z1Byb3BlcnR5QXJyYXl9LFxuICAgIGFsZXJ0OiB7Zm46IGFsZXJ0fSxcbiAgICBmb3JtYXROdW1iZXI6IHtmbjogZm9ybWF0TnVtYmVyfSxcbiAgICBmb3JtYXREYXRlOiB7Zm46IGZvcm1hdERhdGV9LFxuICAgIGlzb01vbnRoOiB7Zm46IGlzb01vbnRofSxcbiAgICBnZXRDb29yZGluYXRlOiB7Zm46IGdldENvb3JkaW5hdGV9LFxuICAgIE1hdGg6IHtmbjogTWF0aH0sXG4gICAgcGFyc2VJbnQ6IHtmbjogcGFyc2VJbnR9LFxuICAgIHBhcnNlRmxvYXQ6IHtmbjogcGFyc2VGbG9hdH0sXG4gICAgcGFyc2VEYXRlOiB7Zm46IGRhdGVVdGlscy5wYXJzZX0sXG4gICAgRGF0ZToge2ZuOiBEYXRlfSxcbiAgICBwbGFpbkFycmF5OiB7Zm46IHBsYWluQXJyYXl9LFxuICAgIENPVU5UX0ZPUk1TOiB7Zm46IENPVU5UX0ZPUk1TfSxcbiAgICBDT1VOVF9GT1JNU19VTklRVUU6IHtmbjogQ09VTlRfRk9STVNfVU5JUVVFfSxcbiAgICBDT1VOVF9SRVBTOiB7Zm46IENPVU5UX1JFUFN9LFxuICAgIFNVTToge2ZuOiBTVU19LFxuICAgIE1FQU46IHtmbjogTUVBTn0sXG4gICAgUEVSQ0VOVDoge2ZuOiBQRVJDRU5UfSxcbiAgICBMQVNUOiB7Zm46IExBU1R9LFxuICAgIE1BWDoge2ZuOiBNQVh9LFxuICAgIE1FRElBTjoge2ZuOiBNRURJQU59LFxuICAgIE1PREU6IHtmbjogTU9ERX0sXG4gICAgQUxMX1ZBTFVFU19PRjoge2ZuOiBBTExfVkFMVUVTX09GfSxcbiAgICBSRVBFQVQ6IHtmbjogUkVQRUFUfSxcbiAgICBFVkFMVUFURToge2ZuOiBFVkFMVUFURX0sXG4gICAgYnVpbGREYXRhc2V0OiB7Zm46IGJ1aWxkRGF0YXNldH0sXG4gICAgYnVpbGRBbGlnbmVkRGF0YXNldDoge2ZuOiBidWlsZEFsaWduZWREYXRhc2V0fSxcbiAgICBidWlsZEZvcm1EYXRhc2V0OiB7Zm46IGJ1aWxkRm9ybURhdGFzZXR9LFxuICAgIGJ1aWxkQWxpZ25lZEZvcm1EYXRhc2V0OiB7Zm46IGJ1aWxkQWxpZ25lZEZvcm1EYXRhc2V0fSxcbiAgICBidWlsZFdpZGdldERhdGFzZXQ6IHtmbjogYnVpbGRXaWRnZXREYXRhc2V0fSxcbiAgICBidWlsZFdpZGdldERhdGFzZXRXaXRoRGlhbG9nOiB7Zm46IGJ1aWxkV2lkZ2V0RGF0YXNldFdpdGhEaWFsb2d9LFxuICAgIEZJTFRFUl9CWV9WQVJTOiB7Zm46IEZJTFRFUl9CWV9WQVJTfSxcbiAgICBGSUxURVJfQlk6IHtmbjogRklMVEVSX0JZfSxcbiAgICBJU19CRUZPUkU6IHtmbjogSVNfQkVGT1JFfSxcbiAgICBJU19BRlRFUjoge2ZuOiBJU19BRlRFUn0sXG4gICAgSVNfV0lUSElOX0lOVEVSVkFMOiB7Zm46IElTX1dJVEhJTl9JTlRFUlZBTH0sXG4gICAgQ09NUEFSRV9EQVRFOiB7Zm46IENPTVBBUkVfREFURX0sXG4gICAgQVBQTFk6IHtmbjogQVBQTFl9LFxuICAgIFRPREFZOiB7Zm46IFRPREFZfSxcbiAgICBHRVRfQUdFOiB7Zm46IEdFVF9BR0V9LFxuICAgIEJVSUxEX0RBVEFTRVQ6IHtmbjogQlVJTERfREFUQVNFVH0sXG4gICAgSk9JTl9GT1JNUzoge2ZuOiBKT0lOX0ZPUk1TfSxcbiAgICBMRU46IHtmbjogTEVOfSxcbiAgICBDT05DQVQ6IHtmbjogQ09OQ0FUfSxcbiAgICBSRU1PVkVfRFVQTElDQVRFUzoge2ZuOiBSRU1PVkVfRFVQTElDQVRFU30sXG4gICAgSk9JTl9SRVBFQVRJTkdfU0xJREVTOiB7Zm46IEpPSU5fUkVQRUFUSU5HX1NMSURFU30sXG4gICAgRlJPTV9SRVBTOiB7Zm46IEZST01fUkVQU30sXG4gICAgSVNJTjoge2ZuOiBJU0lOfSxcbiAgICBPUDoge2ZuOiBPUH0sXG4gICAgR0VUX0xBQkVMUzoge2ZuOiBHRVRfTEFCRUxTfSxcbiAgICBBUFBMWV9MQUJFTFM6IHtmbjogQVBQTFlfTEFCRUxTfSxcbiAgICBST1VORDoge2ZuOiBST1VORH0sXG4gICAgQ09OU09MRV9MT0c6IHtmbjogQ09OU09MRV9MT0d9LFxuICB9O1xufVxuXG5jb25zdCBub25OdWxsSW5zdGFuY2VzID0gKHJlcHM6IEluc3RhbmNlcyB8IHVuZGVmaW5lZCk6IHJlcHMgaXMgSW5zdGFuY2VzID0+IHJlcHMgIT0gbnVsbDtcblxuLyoqXG4gKiBVVElMSVRZIEZVTkNJT05cbiAqIFRoaXMgZnVuY3Rpb24gcHJvdmlkZSBhIGRlZXAgY29weSBidWlsZGVyIG9mIGFycmF5IG9mIG1haW4gZm9ybXMuXG4gKiBUaGF0J3MgYSBjdXN0b20gZnVuY3Rpb24gcmVsYXRlZCB0byBtYWluZm9ybXMgdGhhdCBjYW4gYmUgYWJsZSB0byBpbmNyZWFzZSBjb3B5IHBlcmZvcm1hbmNlLlxuICpcbiAqIEBwYXJhbSB7TWFpbkZvcm1bXX0gZm9ybXNcbiAqIEByZXR1cm4geyp9ICB7TWFpbkZvcm1bXX1cbiAqL1xuZnVuY3Rpb24gY2xvbmVNYWluRm9ybXMoZm9ybXM6IE1haW5Gb3JtW10pOiBNYWluRm9ybVtdIHtcbiAgbGV0IHJlczogTWFpbkZvcm1bXSA9IFtdO1xuICBmb3Jtcy5mb3JFYWNoKGZvcm0gPT4ge1xuICAgIGxldCByZXBzOiBJbnN0YW5jZXMgPSB7fTtcbiAgICBpZiAoZm9ybSA9PSBudWxsKSB7XG4gICAgICByZXMucHVzaChudWxsIGFzIHVua25vd24gYXMgTWFpbkZvcm0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoZm9ybS5yZXBzICE9IG51bGwpIHtcbiAgICAgICAgT2JqZWN0LmtleXMoZm9ybS5yZXBzKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgcmVwc1trZXldID0gZm9ybS5yZXBzIVtrZXldLnNsaWNlKDApO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGYgPSB7Li4uZm9ybSwgcmVwc307XG4gICAgICByZXMucHVzaChmKTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gcmVzO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGV2YWx1YXRlRXhwcmVzc2lvbihcbiAgZXhwcmVzc2lvbjogc3RyaW5nLFxuICBjb250ZXh0PzogQWpmQ29udGV4dCxcbiAgZm9yY2VGb3JtdWxhPzogc3RyaW5nLFxuKTogYW55IHtcbiAgbGV0IGZvcm11bGEgPSBmb3JjZUZvcm11bGEgfHwgZXhwcmVzc2lvbiB8fCAnJztcbiAgaWYgKGZvcm11bGEgPT09ICcnKSB7XG4gICAgcmV0dXJuICcnO1xuICB9XG4gIGlmIChmb3JtdWxhID09PSAndHJ1ZScpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBpZiAoZm9ybXVsYSA9PT0gJ2ZhbHNlJykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpZiAoY29udGV4dCAhPSBudWxsICYmIGNvbnRleHRbZm9ybXVsYV0gIT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBjb250ZXh0W2Zvcm11bGFdO1xuICB9XG4gIGlmICgvXlwiW15cIl0qXCIkLy50ZXN0KGZvcm11bGEpKSB7XG4gICAgcmV0dXJuIGZvcm11bGEucmVwbGFjZSgvXlwiK3xcIiskL2csICcnKTtcbiAgfVxuICBjb25zdCBpZGVudGlmaWVycyA9IGdldENvZGVJZGVudGlmaWVycyhmb3JtdWxhLCB0cnVlKTtcbiAgY29uc3QgY3R4OiBhbnlbXSA9IFtdO1xuICBpZGVudGlmaWVycy5mb3JFYWNoKChrZXk6IHN0cmluZykgPT4ge1xuICAgIGxldCB2YWw6IGFueSA9IG51bGw7XG4gICAgaWYgKGNvbnRleHQgIT0gbnVsbCAmJiBjb250ZXh0W2tleV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgdmFsID0gY29udGV4dFtrZXldO1xuICAgIH0gZWxzZSBpZiAoQWpmRXhwcmVzc2lvblV0aWxzLnV0aWxzW2tleV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgY29uc3QgdXRpbCA9IEFqZkV4cHJlc3Npb25VdGlscy51dGlsc1trZXldO1xuICAgICAgdmFsID0gdXRpbC5mbjtcbiAgICB9XG4gICAgY3R4LnB1c2godmFsKTtcbiAgfSk7XG4gIGlkZW50aWZpZXJzLnB1c2goJ2V4ZWNDb250ZXh0Jyk7XG4gIGN0eC5wdXNoKGV4ZWNDb250ZXh0KTtcblxuICB0cnkge1xuICAgIGxldCBmID0gbmV3IEZ1bmN0aW9uKC4uLmlkZW50aWZpZXJzLCBgcmV0dXJuICR7Zm9ybXVsYX1gKTtcbiAgICBjb25zdCByZXMgPSBmKC4uLmN0eCk7XG4gICAgZiA9IDxhbnk+bnVsbDtcbiAgICByZXR1cm4gcmVzO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG4vKipcbiAqIEl0IHJldHVybnMgdGhlIGNvdW50IG9mIGRpZ2l0IGluc2lkZSB4LlxuICovXG5leHBvcnQgZnVuY3Rpb24gZGlnaXRDb3VudCh4OiBudW1iZXIpOiBudW1iZXIge1xuICBpZiAoaXNOYU4oeCkgfHwgdHlwZW9mIHggIT09ICdudW1iZXInKSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cbiAgaWYgKCFpc0Zpbml0ZSh4KSkge1xuICAgIHJldHVybiBJbmZpbml0eTtcbiAgfVxuICByZXR1cm4geC50b1N0cmluZygpLnJlcGxhY2UoL1teMC05XS9nLCAnJykubGVuZ3RoO1xufVxuLyoqXG4gKiBJdCBpcyBjb3VudCB0aGUgY291bnQgb2YgZGVjaW1hbCBkaWdpdCBpbnNpZGUgcy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRlY2ltYWxDb3VudCh4OiBzdHJpbmcgfCBudW1iZXIpOiBudW1iZXIge1xuICBpZiAodHlwZW9mIHggPT09ICdzdHJpbmcnKSB7XG4gICAgeCA9IHBhcnNlRmxvYXQoeCk7XG4gIH1cbiAgaWYgKHR5cGVvZiB4ICE9PSAnbnVtYmVyJyB8fCBpc05hTih4KSkge1xuICAgIHJldHVybiAwO1xuICB9XG4gIGNvbnN0IHBhcnRzID0geC50b1N0cmluZygpLnNwbGl0KCcuJyk7XG4gIHJldHVybiBwYXJ0cy5sZW5ndGggPiAxID8gcGFydHNbMV0ubGVuZ3RoIDogMDtcbn1cbi8qKlxuICogSXQgaXMgdHJ1ZSBpZiB4IGlzIGFuIGludGVnZXIuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0ludCh4OiBzdHJpbmcgfCBudW1iZXIpOiBib29sZWFuIHtcbiAgaWYgKHR5cGVvZiB4ID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiAvXi0/XFxkKyQvLnRlc3QoeCk7XG4gIH1cbiAgaWYgKHR5cGVvZiB4ID09PSAnbnVtYmVyJykge1xuICAgIHJldHVybiBNYXRoLnJvdW5kKHgpID09PSB4O1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cbi8qKlxuICogSXQgaXMgdHJ1ZSBpZiB4IGlzIG5vdCBlbXB0eS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG5vdEVtcHR5KHg6IGFueSk6IGJvb2xlYW4ge1xuICByZXR1cm4gdHlwZW9mIHggIT09ICd1bmRlZmluZWQnICYmIHggIT09IG51bGwgPyB4LnRvU3RyaW5nKCkubGVuZ3RoID4gMCA6IGZhbHNlO1xufVxuLyoqXG4gKiBJdCBpcyB0cnVlIGlmIGFycmF5IGNvbnRhaW5zIHggb3IgYXJyYXkgaXMgZXF1YWwgdG8geC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHZhbHVlSW5DaG9pY2UoYXJyYXk6IGFueVtdLCB4OiBhbnkpOiBib29sZWFuIHtcbiAgcmV0dXJuIChhcnJheSB8fCBbXSkuaW5kZXhPZih4KSA+IC0xIHx8IGFycmF5ID09PSB4O1xufVxuLyoqXG4gKiBJdCBhcHBsaWVzIGNhbGxiYWNrIGZvciByZXBzIHRpbWVzIGFuZCBhY2N1bXVsYXRlIHRoZSByZXN1bHQgaW4gYWNjLlxuICovXG5leHBvcnQgZnVuY3Rpb24gc2Nhbkdyb3VwRmllbGQocmVwczogbnVtYmVyLCBhY2M6IGFueSwgY2FsbGJhY2s6IGFueSk6IGFueSB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcmVwczsgaSsrKSB7XG4gICAgYWNjID0gY2FsbGJhY2soYWNjLCBpKTtcbiAgfVxuICByZXR1cm4gYWNjO1xufVxuLyoqXG4gKiBJdCByZXR1cm5zIHRoZSBzdW0gb2YgdGhlIGFycmF5IHZhbHVlcy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHN1bShhcnJheTogYW55W10pOiBhbnkge1xuICByZXR1cm4gYXJyYXkucmVkdWNlKChhLCBiKSA9PiBhICsgYiwgMCk7XG59XG4vKipcbiAqIEl0IGFwcGxpZXMgYWRkL3JlbW92ZShvcGVyYXRpb24pIHYgKGRheS9tb250aC95ZWFyKXBlcmlvZCB0byBkc3RyaW5nIGFuZCByZXR1cm4gbmV3IGZvcm1hdCBkYXRlLlxuICovXG4vLyBUT0RPIGNoZWNrIGlmIGRlcHJlY2F0ZWQgaW5zdGVhZCByZWZhY290b3JpbmcgcGFyYW1ldGVyIHR5cGVcbi8vIFRPRE8gKGRTdHJpbmc6IHN0cmluZ3xudWxsLCBwZXJpb2Q6J2RheSd8J21vbnRoJ3wneWVhcicsXG4vLyBUT0RPIG9wZXJhdGlvbjogJ2FkZC9yZW1vdmUnID0gJ2FkZCcsIHY6bnVtYmVyKVxuZXhwb3J0IGZ1bmN0aW9uIGRhdGVPcGVyYXRpb25zKGRTdHJpbmc6IHN0cmluZywgcGVyaW9kOiBzdHJpbmcsIG9wZXJhdGlvbjogc3RyaW5nLCB2OiBhbnkpOiBzdHJpbmcge1xuICBjb25zdCBmbXQgPSAnbW0vZGQveXl5eSc7XG4gIGxldCBkID0gdHlwZW9mIGRTdHJpbmcgIT09ICd1bmRlZmluZWQnID8gZGF0ZVV0aWxzLnBhcnNlKGRTdHJpbmcpIDogbmV3IERhdGUoKTtcbiAgaWYgKG9wZXJhdGlvbiA9PSAncmVtb3ZlJykge1xuICAgIHYgPSAtdjtcbiAgfVxuICBsZXQgZGF0ZU9wO1xuICBzd2l0Y2ggKHBlcmlvZCkge1xuICAgIGNhc2UgJ2RheSc6XG4gICAgICBkYXRlT3AgPSBkYXRlVXRpbHMuYWRkRGF5cztcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ21vbnRoJzpcbiAgICAgIGRhdGVPcCA9IGRhdGVVdGlscy5hZGRNb250aHM7XG4gICAgICBicmVhaztcbiAgICBjYXNlICd5ZWFyJzpcbiAgICAgIGRhdGVPcCA9IGRhdGVVdGlscy5hZGRZZWFycztcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gJyc7XG4gIH1cbiAgcmV0dXJuIGRhdGVVdGlscy5mb3JtYXQoZGF0ZU9wKGQsIHYpLCBmbXQpO1xufVxuXG4vKipcbiAqIEZpeGVkIGRlY2ltYWxzIGZvciBmbG9hdGluZyBudW1iZXJcbiAqIFJlc29sdmUgZmxvYXQgc3VtIHByb2JsZW1zIGxpa2UgdGhpczogMC4xICsgMC4yID0gMC4zMDAwMDAwMDAwMDAwMDAwNFxuICogQHBhcmFtIG51bVxuICogQHJldHVybnNcbiAqL1xuZnVuY3Rpb24gZmxvYXRpZnkobnVtOiBudW1iZXIpIHtcbiAgcmV0dXJuIHBhcnNlRmxvYXQobnVtLnRvRml4ZWQoMTApKTtcbn1cblxuLyoqXG4gKiBJdCByb3VuZHMgdGhlIG51bSB3aXRoIHRoZSB2YWx1ZSBvZiBkaWdpdHNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJvdW5kKG51bTogbnVtYmVyIHwgc3RyaW5nLCBkaWdpdHM/OiBudW1iZXIpOiBudW1iZXIge1xuICBkaWdpdHMgPSBkaWdpdHMgfHwgMDtcbiAgbGV0IGY7XG4gIGlmICh0eXBlb2YgbnVtICE9PSAnbnVtYmVyJykge1xuICAgIHRyeSB7XG4gICAgICBmID0gcGFyc2VGbG9hdChudW0pO1xuICAgIH0gY2F0Y2ggKGUpIHt9XG4gIH0gZWxzZSB7XG4gICAgZiA9IG51bTtcbiAgfVxuICBpZiAoZiA9PSBudWxsIHx8IGlzTmFOKGYpKSB7XG4gICAgZiA9IDA7XG4gIH1cbiAgY29uc3QgbSA9IE1hdGgucG93KDEwLCBkaWdpdHMpO1xuICByZXR1cm4gTWF0aC5yb3VuZChmICogbSkgLyBtO1xufVxuLyoqXG4gKiBJdCBleHRyYWN0cyBwcm9wZXJ0eSBmcm9tIHNvdXJjZS5cbiAqIGZvciBldmVyeSBlbGVtZW50IG9mIHNvdXJjZSBpZiBwcm9wZXJ0eSBhbmQgcHJvcGVydHkyIGFyZSBkZWZpbmVkIHJldHVybiB0aGUgc3VtXG4gKiBlbHNlIGlmIG9ubHkgcHJvcGVydHkgaXMgZGVmaW5lZCByZXR1cm4gaGltLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZXh0cmFjdEFycmF5KHNvdXJjZTogYW55W10sIHByb3BlcnR5OiBzdHJpbmcsIHByb3BlcnR5Mj86IHN0cmluZyk6IGFueVtdIHtcbiAgc291cmNlID0gKHNvdXJjZSB8fCBbXSkuc2xpY2UoMCkuZmlsdGVyKChmOiBhbnkpID0+IGYgIT0gbnVsbCk7XG4gIGNvbnN0IGwgPSBzb3VyY2UubGVuZ3RoO1xuICBjb25zdCByZXM6IGFueVtdID0gW107XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbDsgaSsrKSB7XG4gICAgaWYgKHNvdXJjZVtpXVtwcm9wZXJ0eV0gIT0gbnVsbCAmJiBwcm9wZXJ0eTIgIT0gbnVsbCAmJiBzb3VyY2VbaV1bcHJvcGVydHkyXSAhPSBudWxsKSB7XG4gICAgICByZXMucHVzaChOdW1iZXIoc291cmNlW2ldW3Byb3BlcnR5XSkgKyBOdW1iZXIoc291cmNlW2ldW3Byb3BlcnR5Ml0pKTtcbiAgICB9IGVsc2UgaWYgKHNvdXJjZVtpXVtwcm9wZXJ0eV0gIT0gbnVsbCkge1xuICAgICAgcmVzLnB1c2goc291cmNlW2ldW3Byb3BlcnR5XSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXM7XG59XG4vKipcbiAqIEl0IHJldHVybnMgdGhlIHN1bSBvZiBhbGwgZGVmaW5lZCBwcm9wZXJ0aWVzIG9mIGVhY2ggZWxlbWVudCBvZiBzb3VyY2UuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBleHRyYWN0U3VtKHNvdXJjZTogYW55W10sIHByb3BlcnRpZXM6IHN0cmluZ1tdKTogbnVtYmVyIHtcbiAgbGV0IHN1bVZhbCA9IDA7XG4gIHByb3BlcnRpZXMgPSAocHJvcGVydGllcyB8fCBbXSkuc2xpY2UoMCk7XG4gIGNvbnN0IGwgPSBwcm9wZXJ0aWVzLmxlbmd0aDtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGw7IGkrKykge1xuICAgIGNvbnN0IGFycmF5ID0gZXh0cmFjdEFycmF5KHNvdXJjZSwgcHJvcGVydGllc1tpXSk7XG4gICAgY29uc3QgbGVuZyA9IGFycmF5Lmxlbmd0aDtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IGxlbmc7IGorKykge1xuICAgICAgaWYgKCFpc05hTihOdW1iZXIoYXJyYXlbal0pKSkge1xuICAgICAgICBzdW1WYWwgKz0gTnVtYmVyKGFycmF5W2pdKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHN1bVZhbDtcbn1cbi8qKlxuICogSXQgcmV0dXJucyBhIG51bWJlciBhcnJheSB0aGF0IGNvbnRhaW5zIHRoZSBzdW0gb2YgcHJvcGVydGllcyB2YWx1ZSBpbnNpZGUgdGhlIHNvdXJjZS5cbiAqIGV4dHJhY3RBcnJheVN1bShbe2E6IDV9LCB7YjogMX0sIHthOiA1LCBiOiAxfV0sIFsnYScsICdiJ10pOyA9Jmd0OyBbNiw2XVxuICovXG5leHBvcnQgZnVuY3Rpb24gZXh0cmFjdEFycmF5U3VtKHNvdXJjZTogYW55W10sIHByb3BlcnRpZXM6IHN0cmluZ1tdKTogYW55W10ge1xuICBjb25zdCBhcnJheXM6IGFueVtdID0gW107XG4gIHByb3BlcnRpZXMgPSAocHJvcGVydGllcyB8fCBbXSkuc2xpY2UoMCk7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9wZXJ0aWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgYXJyYXkgPSBleHRyYWN0QXJyYXkoc291cmNlLCBwcm9wZXJ0aWVzW2ldKTtcbiAgICBhcnJheXMucHVzaChhcnJheSk7XG4gIH1cblxuICBjb25zdCByZXM6IGFueVtdID0gW107XG4gIGlmIChhcnJheXMubGVuZ3RoID4gMCkge1xuICAgIGZvciAobGV0IHdlZWtJID0gMDsgd2Vla0kgPCBhcnJheXNbMF0ubGVuZ3RoOyB3ZWVrSSsrKSB7XG4gICAgICBsZXQgc3VtVmFsID0gMDtcbiAgICAgIGZvciAobGV0IHByb3BJID0gMDsgcHJvcEkgPCBwcm9wZXJ0aWVzLmxlbmd0aDsgcHJvcEkrKykge1xuICAgICAgICBzdW1WYWwgPSBzdW1WYWwgKyBOdW1iZXIoYXJyYXlzW3Byb3BJXVt3ZWVrSV0pO1xuICAgICAgfVxuICAgICAgcmVzLnB1c2goc3VtVmFsKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cbi8qKlxuICogRHJhdyBhIHRocmVzaG9sZCBsaW5lIG9uIGNoYXJ0IHJlbGF0ZWQgdG8gdGhlIHByb3BlcnR5LlxuICovXG5leHBvcnQgZnVuY3Rpb24gZHJhd1RocmVzaG9sZChzb3VyY2U6IGFueVtdLCBwcm9wZXJ0eTogc3RyaW5nLCB0aHJlc2hvbGQ6IGFueVtdKTogYW55W10ge1xuICBzb3VyY2UgPSAoc291cmNlIHx8IFtdKS5zbGljZSgwKS5maWx0ZXIoKGY6IGFueSkgPT4gZiAhPSBudWxsKTtcbiAgdGhyZXNob2xkID0gdGhyZXNob2xkIHx8IFswXTtcbiAgaWYgKCEodGhyZXNob2xkIGluc3RhbmNlb2YgQXJyYXkpKSB7XG4gICAgdGhyZXNob2xkID0gW3RocmVzaG9sZF07XG4gIH1cbiAgY29uc3QgbCA9IHNvdXJjZS5sZW5ndGg7XG4gIGNvbnN0IHJlczogYW55W10gPSBbXTtcbiAgbGV0IGNvdW50ID0gMDtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsOyBpKyspIHtcbiAgICBpZiAoc291cmNlW2ldW3Byb3BlcnR5XSAhPSBudWxsKSB7XG4gICAgICBpZiAodGhyZXNob2xkLmxlbmd0aCA+IGNvdW50KSB7XG4gICAgICAgIHJlcy5wdXNoKHRocmVzaG9sZFtjb3VudF0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzLnB1c2godGhyZXNob2xkWzBdKTtcbiAgICAgIH1cbiAgICAgIGNvdW50Kys7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXM7XG59XG4vKipcbiAqIEV4dHJhY3QgdGhlIGRhdGVzIG9mIHRoZSBzb3VyY2Ugb2JqZWN0IHdpdGggcHJvcGVydHkgIT0gbnVsbFxuICovXG5leHBvcnQgZnVuY3Rpb24gZXh0cmFjdERhdGVzKHNvdXJjZTogYW55W10sIHByb3BlcnR5OiBzdHJpbmcsIGZtdDogc3RyaW5nKTogc3RyaW5nW10ge1xuICBzb3VyY2UgPSAoc291cmNlIHx8IFtdKS5zbGljZSgwKS5maWx0ZXIoKGY6IGFueSkgPT4gZiAhPSBudWxsKTtcbiAgY29uc3QgbCA9IHNvdXJjZS5sZW5ndGg7XG4gIGNvbnN0IHJlczogYW55ID0gW107XG4gIGxldCBwcmVmaXggPSAnJztcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsOyBpKyspIHtcbiAgICBpZiAoc291cmNlW2ldW3Byb3BlcnR5XSAhPSBudWxsKSB7XG4gICAgICBzd2l0Y2ggKGZtdCkge1xuICAgICAgICBjYXNlICdXVyc6XG4gICAgICAgIGNhc2UgJ3d3JzpcbiAgICAgICAgICBwcmVmaXggPSAnVyc7XG4gICAgICAgICAgcmVzLnB1c2gocHJlZml4ICsgZm9ybWF0RGF0ZShzb3VyY2VbaV1bJ2RhdGVfc3RhcnQnXSwgZm10KSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ01NJzpcbiAgICAgICAgY2FzZSAnbW0nOlxuICAgICAgICAgIHByZWZpeCA9ICdNJztcbiAgICAgICAgICByZXMucHVzaChwcmVmaXggKyBpc29Nb250aChzb3VyY2VbaV1bJ2RhdGVfc3RhcnQnXSwgZm10KSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgcHJlZml4ID0gJyc7XG4gICAgICAgICAgcmVzLnB1c2gocHJlZml4ICsgZm9ybWF0RGF0ZShzb3VyY2VbaV1bJ2RhdGVfc3RhcnQnXSwgZm10KSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiByZXM7XG59XG4vKipcbiAqIEV4dHJhY3QgdGhlIGxhc3QgcHJvcGVydHkgY29udGFpbnMgaW4gc291cmNlICE9IG51bGxcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGxhc3RQcm9wZXJ0eShzb3VyY2U6IGFueSwgcHJvcGVydHk6IHN0cmluZyk6IGFueSB7XG4gIHNvdXJjZSA9IChzb3VyY2UgfHwgW10pLnNsaWNlKDApLmZpbHRlcigoZjogYW55KSA9PiBmICE9IG51bGwpO1xuICBsZXQgbCA9IHNvdXJjZS5sZW5ndGggLSAxO1xuXG4gIHdoaWxlIChsID49IDAgJiYgc291cmNlW2xdW3Byb3BlcnR5XSA9PSBudWxsKSB7XG4gICAgbC0tO1xuICAgIGlmIChsIDwgMCkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbCA+PSAwID8gc291cmNlW2xdW3Byb3BlcnR5XSA6ICcnO1xufVxuLyoqXG4gKiBJdCBzdW0gdGhlIExBc3QgcHJvcGVydGllcyBvZiBzb3VyY2UuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdW1MYXN0UHJvcGVydGllcyhzb3VyY2U6IGFueVtdLCBwcm9wZXJ0aWVzOiBzdHJpbmdbXSk6IG51bWJlciB7XG4gIHNvdXJjZSA9IChzb3VyY2UgfHwgW10pLnNsaWNlKDApLmZpbHRlcigoZjogYW55KSA9PiBmICE9IG51bGwpO1xuICBsZXQgc3VtVmFsID0gMDtcbiAgbGV0IHZhbCA9IDA7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvcGVydGllcy5sZW5ndGg7IGkrKykge1xuICAgIHZhbCA9IE51bWJlcihsYXN0UHJvcGVydHkoc291cmNlLCBwcm9wZXJ0aWVzW2ldKSk7XG4gICAgaWYgKCFpc05hTih2YWwpKSB7XG4gICAgICBzdW1WYWwgKz0gdmFsO1xuICAgIH1cbiAgfVxuICByZXR1cm4gc3VtVmFsO1xufVxuLyoqXG4gKiBDb21wdXRlIHRoZSB0cmVuZCBvZiB0aGUgcHJvcGVydHkgY29udGFpbmVkIG9uIHRoZSBzb3VyY2UuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjYWxjdWxhdGVUcmVuZFByb3BlcnR5KHNvdXJjZTogYW55W10sIHByb3BlcnR5OiBzdHJpbmcpOiBzdHJpbmcge1xuICBzb3VyY2UgPSAoc291cmNlIHx8IFtdKS5zbGljZSgwKS5maWx0ZXIoKGY6IGFueSkgPT4gZiAhPSBudWxsKTtcbiAgbGV0IGxhc3QgPSBzb3VyY2UubGVuZ3RoIC0gMTtcbiAgd2hpbGUgKHNvdXJjZVtsYXN0XVtwcm9wZXJ0eV0gPT0gbnVsbCkge1xuICAgIGlmIChsYXN0ID09IDApIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBsYXN0LS07XG4gIH1cbiAgbGV0IGxhc3RMYXN0ID0gbGFzdCAtIDE7XG4gIGlmIChsYXN0ID09IDApIHtcbiAgICBsYXN0TGFzdCA9IGxhc3Q7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHNvdXJjZVtsYXN0TGFzdF1bcHJvcGVydHldID09IG51bGwpIHtcbiAgICAgIGlmIChsYXN0TGFzdCA9PSAwKSB7XG4gICAgICAgIGxhc3RMYXN0ID0gbGFzdDtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBsYXN0TGFzdC0tO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGxhc3RQcm9wID0gc291cmNlW2xhc3RdID8gc291cmNlW2xhc3RdW3Byb3BlcnR5XSB8fCAwIDogMDtcbiAgY29uc3QgbGFzdExhc3RQcm9wID0gc291cmNlW2xhc3RMYXN0XSA/IHNvdXJjZVtsYXN0TGFzdF1bcHJvcGVydHldIHx8IDAgOiAwO1xuXG4gIGlmIChsYXN0UHJvcCA9PSBsYXN0TGFzdFByb3ApIHtcbiAgICByZXR1cm4gJzxwPjxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIiBzdHlsZT1cImNvbG9yOmJsdWVcIj50cmVuZGluZ19mbGF0PC9pPjwvcD4nO1xuICB9IGVsc2UgaWYgKGxhc3RQcm9wID4gbGFzdExhc3RQcm9wKSB7XG4gICAgcmV0dXJuICc8cD48aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCIgc3R5bGU9XCJjb2xvcjpncmVlblwiPnRyZW5kaW5nX3VwPC9pPjwvcD4nO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAnPHA+PGkgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiIHN0eWxlPVwiY29sb3I6cmVkXCI+dHJlbmRpbmdfZG93bjwvaT48L3A+JztcbiAgfVxufVxuLyoqXG4gKiBDb21wdXRlIHRoZSBhdmVyYWdlIHZhbHVlIG9mIHRoZSBwcm9wZXJ0eSBjb250YWluZWQgb24gdGhlIHNvdXJjZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNhbGN1bGF0ZVRyZW5kQnlQcm9wZXJ0aWVzKHNvdXJjZTogYW55W10sIHByb3BlcnRpZXM6IHN0cmluZ1tdKTogc3RyaW5nIHtcbiAgY29uc3QgYXJyYXlzdW0gPSBleHRyYWN0QXJyYXlTdW0oc291cmNlLCBwcm9wZXJ0aWVzKTtcblxuICBjb25zdCBsYXN0UHJvcCA9IGFycmF5c3VtLmxlbmd0aCA+IDAgPyBhcnJheXN1bVthcnJheXN1bS5sZW5ndGggLSAxXSB8fCAwIDogMDtcbiAgY29uc3QgbGFzdExhc3RQcm9wID0gYXJyYXlzdW0ubGVuZ3RoID4gMSA/IGFycmF5c3VtW2FycmF5c3VtLmxlbmd0aCAtIDJdIHx8IDAgOiBsYXN0UHJvcDtcblxuICBpZiAobGFzdFByb3AgPT0gbGFzdExhc3RQcm9wKSB7XG4gICAgcmV0dXJuICc8cD48aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCIgc3R5bGU9XCJjb2xvcjpibHVlXCI+dHJlbmRpbmdfZmxhdDwvaT48L3A+JztcbiAgfSBlbHNlIGlmIChsYXN0UHJvcCA+IGxhc3RMYXN0UHJvcCkge1xuICAgIHJldHVybiAnPHA+PGkgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiIHN0eWxlPVwiY29sb3I6Z3JlZW5cIj50cmVuZGluZ191cDwvaT48L3A+JztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gJzxwPjxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIiBzdHlsZT1cImNvbG9yOnJlZFwiPnRyZW5kaW5nX2Rvd248L2k+PC9wPic7XG4gIH1cbn1cbi8qKlxuICpcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNhbGN1bGF0ZUF2Z1Byb3BlcnR5KFxuICBzb3VyY2U6IGFueVtdLFxuICBwcm9wZXJ0eTogc3RyaW5nLFxuICByYW5nZTogbnVtYmVyLFxuICBjb2VmZmljaWVudDogbnVtYmVyLFxuKTogbnVtYmVyIHtcbiAgc291cmNlID0gKHNvdXJjZSB8fCBbXSkuc2xpY2UoMCkuZmlsdGVyKChmOiBhbnkpID0+IGYgIT0gbnVsbCk7XG5cbiAgY29lZmZpY2llbnQgPSBjb2VmZmljaWVudCB8fCAxO1xuICByYW5nZSA9IHJhbmdlIHx8IDEyO1xuXG4gIGxldCBsID0gc291cmNlLmxlbmd0aDtcbiAgbGV0IHJlcyA9IDA7XG4gIGxldCBjb3VudGVyID0gMDtcbiAgbGV0IG5vWmVybyA9IDA7XG5cbiAgaWYgKGwgPCByYW5nZSkge1xuICAgIHJhbmdlID0gbDtcbiAgfVxuXG4gIHdoaWxlIChyYW5nZSAhPSAwKSB7XG4gICAgaWYgKHNvdXJjZVtsIC0gMV1bcHJvcGVydHldICE9IG51bGwpIHtcbiAgICAgIGNvdW50ZXIrKztcbiAgICAgIHJlcyArPSBOdW1iZXIoc291cmNlW2wgLSAxXVtwcm9wZXJ0eV0pO1xuXG4gICAgICBpZiAoc291cmNlW2wgLSAxXVtwcm9wZXJ0eV0gPiAwKSB7XG4gICAgICAgIG5vWmVybysrO1xuICAgICAgfVxuICAgIH1cbiAgICBsLS07XG4gICAgcmFuZ2UtLTtcbiAgfVxuXG4gIGlmIChjb2VmZmljaWVudCA9PSAwKSB7XG4gICAgcmV0dXJuIG5vWmVybztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gcm91bmQoKHJlcyAvIGNvdW50ZXIpICogY29lZmZpY2llbnQsIDIpIHx8IDA7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNhbGN1bGF0ZUF2Z1Byb3BlcnR5QXJyYXkoXG4gIHNvdXJjZTogYW55W10sXG4gIHByb3BlcnRpZXM6IHN0cmluZ1tdLFxuICByYW5nZTogbnVtYmVyLFxuICBjb2VmZmljaWVudDogbnVtYmVyLFxuKTogbnVtYmVyW10ge1xuICBzb3VyY2UgPSAoc291cmNlIHx8IFtdKS5zbGljZSgwKS5maWx0ZXIoKGY6IGFueSkgPT4gZiAhPSBudWxsKTtcbiAgY29uc3QgcmVzQXJyOiBhbnlbXSA9IFtdO1xuXG4gIGlmIChwcm9wZXJ0aWVzICYmIHByb3BlcnRpZXMubGVuZ3RoID4gMCkge1xuICAgIGxldCBhdmcgPSAwO1xuXG4gICAgY29lZmZpY2llbnQgPSBjb2VmZmljaWVudCB8fCAxO1xuICAgIHJhbmdlID0gcmFuZ2UgfHwgMTI7XG5cbiAgICBjb25zdCBzb3VyY2VBcnIgPVxuICAgICAgcHJvcGVydGllcy5sZW5ndGggPiAxXG4gICAgICAgID8gZXh0cmFjdEFycmF5U3VtKHNvdXJjZSwgcHJvcGVydGllcylcbiAgICAgICAgOiBleHRyYWN0QXJyYXkoc291cmNlLCBwcm9wZXJ0aWVzWzBdKTtcblxuICAgIGxldCBsID0gc291cmNlQXJyLmxlbmd0aDtcblxuICAgIGZvciAobGV0IGxlbiA9IGw7IGxlbiA+IDA7IGxlbi0tKSB7XG4gICAgICBsZXQgcmVzID0gMDtcbiAgICAgIGxldCBjb3VudGVyID0gMDtcbiAgICAgIGxldCBub1plcm8gPSAwO1xuXG4gICAgICBpZiAobGVuIDwgcmFuZ2UpIHtcbiAgICAgICAgcmFuZ2UgPSBsZW47XG4gICAgICB9XG5cbiAgICAgIGZvciAobGV0IHIgPSAxOyByIDw9IHJhbmdlOyByKyspIHtcbiAgICAgICAgbGV0IHZhbCA9IHNvdXJjZUFycltsZW4gLSByXTtcbiAgICAgICAgaWYgKHZhbCAhPSBudWxsKSB7XG4gICAgICAgICAgY291bnRlcisrO1xuICAgICAgICAgIHJlcyArPSBOdW1iZXIodmFsKTtcbiAgICAgICAgICBpZiAodmFsID4gMCkge1xuICAgICAgICAgICAgbm9aZXJvKys7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChjb3VudGVyID4gMCkge1xuICAgICAgICBpZiAoY29lZmZpY2llbnQgPT0gMCkge1xuICAgICAgICAgIGF2ZyA9IG5vWmVybztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhdmcgPSAocmVzIC8gY291bnRlcikgKiBjb2VmZmljaWVudCB8fCAwO1xuICAgICAgICB9XG4gICAgICAgIHJlc0Fyci5wdXNoKHJvdW5kKGF2ZywgMikpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzQXJyLnJldmVyc2UoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFsZXJ0KHNvdXJjZTogYW55W10sIHByb3BlcnR5OiBzdHJpbmcsIHRocmVzaG9sZDogbnVtYmVyKTogc3RyaW5nIHtcbiAgc291cmNlID0gKHNvdXJjZSB8fCBbXSkuc2xpY2UoMCk7XG5cbiAgaWYgKGxhc3RQcm9wZXJ0eShzb3VyY2UsIHByb3BlcnR5KSA+IHRocmVzaG9sZCkge1xuICAgIHJldHVybiAnPHA+PGkgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiIHN0eWxlPVwiY29sb3I6cmVkXCI+d2FybmluZzwvaT48L3A+JztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gJzxwPjwvcD4nO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXROdW1iZXIobnVtOiBudW1iZXIsIGZtdD86IHN0cmluZyk6IHN0cmluZyB7XG4gIGZtdCA9IGZtdCB8fCAnMCwwWy5dMCc7XG4gIHJldHVybiBudW1icm8obnVtKS5mb3JtYXQoZm10KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdERhdGUoZGF0ZTogRGF0ZSB8IHN0cmluZywgZm10Pzogc3RyaW5nKTogc3RyaW5nIHtcbiAgZm10ID0gZm10IHx8ICdtbS1ERC15eXl5JztcbiAgcmV0dXJuIGRhdGVVdGlscy5mb3JtYXQodHlwZW9mIGRhdGUgPT09ICdzdHJpbmcnID8gZGF0ZVV0aWxzLnBhcnNlKGRhdGUpIDogZGF0ZSwgZm10KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzb01vbnRoKGRhdGU6IERhdGUsIGZtdD86IHN0cmluZyk6IHN0cmluZyB7XG4gIGZtdCA9IGZtdCB8fCAnbW0nO1xuICBjb25zdCBkdSA9IGRhdGVVdGlscztcbiAgcmV0dXJuIGR1LmZvcm1hdChkdS5hZGREYXlzKGR1LnN0YXJ0T2ZJU09XZWVrKGRhdGUpLCAzKSwgZm10KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldENvb3JkaW5hdGUoc291cmNlOiBhbnksIHpvb20/OiBudW1iZXIpOiBbbnVtYmVyLCBudW1iZXIsIG51bWJlcl0ge1xuICB6b29tID0gem9vbSB8fCA2O1xuICBpZiAoc291cmNlID09IG51bGwpIHtcbiAgICByZXR1cm4gWzUxLjUwNSwgLTAuMDksIHpvb21dO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBbc291cmNlWzBdLCBzb3VyY2VbMV0sIHpvb21dO1xuICB9XG59XG5cbi8qKlxuICogQ2FsY3VsYXRlcyBhbGwgdGhlIHBvc3NpYmxlIHJlc3VsdHMgdGhhdCBhIGZpZWxkIGhhcyB0YWtlblxuICovXG5leHBvcnQgZnVuY3Rpb24gQUxMX1ZBTFVFU19PRihtYWluZm9ybXM6IE1haW5Gb3JtW10sIGZpZWxkTmFtZTogc3RyaW5nKTogc3RyaW5nW10ge1xuICBjb25zdCBmb3JtcyA9IFsuLi4obWFpbmZvcm1zLmZpbHRlcihmb3JtID0+IGZvcm0gIT0gbnVsbCkgfHwgW10pXTtcbiAgY29uc3QgYWxscmVwcyA9IFtcbiAgICAuLi5mb3Jtcy5tYXAoZm9ybSA9PiB7XG4gICAgICBjb25zdCB7cmVwcywgLi4udn0gPSBmb3JtO1xuICAgICAgcmV0dXJuIHY7XG4gICAgfSksXG4gICAgLi4uZm9ybXNcbiAgICAgIC5tYXAobSA9PiBtLnJlcHMpXG4gICAgICAuZmlsdGVyKG5vbk51bGxJbnN0YW5jZXMpXG4gICAgICAubWFwKGkgPT5cbiAgICAgICAgT2JqZWN0LmtleXMoaSlcbiAgICAgICAgICAubWFwKGsgPT4gaVtrXSlcbiAgICAgICAgICAuZmxhdCgpLFxuICAgICAgKVxuICAgICAgLmZsYXQoKSxcbiAgXTtcbiAgcmV0dXJuIFsuLi5uZXcgU2V0KGFsbHJlcHMuZmlsdGVyKGYgPT4gZltmaWVsZE5hbWVdICE9IG51bGwpLm1hcChmID0+IGAke2ZbZmllbGROYW1lXX1gKSldO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcGxhaW5BcnJheShwYXJhbXM6IGFueVtdKTogYW55W10ge1xuICBsZXQgcmVzOiBhbnlbXSA9IFtdO1xuICBwYXJhbXMuZm9yRWFjaChwYXJhbSA9PiB7XG4gICAgcGFyYW0gPSBBcnJheS5pc0FycmF5KHBhcmFtKSA/IHBhcmFtIDogW3BhcmFtXTtcbiAgICByZXMgPSBbLi4ucmVzLCAuLi5wYXJhbV07XG4gIH0pO1xuXG4gIHJldHVybiByZXM7XG59XG4vKipcbiAqIENvdW50cyB0aGUgY29sbGVjdGVkIGZvcm1zLiBUaGUgZm9ybSBuYW1lIG11c3QgYmUgc3BlY2lmaWVkLiBBbiBvcHRpb25hbCBjb25kaXRpb24gY2FuIGJlIGFkZGVkXG4gKiB0byBkaXNjcmltaW5hdGUgd2hpY2ggZm9ybXMgdG8gY291bnQgaW4uXG4gKiB0aGUgZXhwcmVzc2lvbiBpcyBmaXJzdCBldmFsdWF0ZWQgaW4gbWFpbkZvcm0gaWYgZmFsc2UgdGhlIGV2YWx1YXRpb24gb2YgZXhwcmVzc2lvbiBpcyBjYWxjdWxhdGVkXG4gKiBpbiBhbnkgcmVwcy4gSWYgZXhwcmVzc2lvbiBpcyB0cnVlIGluIHJlcHMgdGhlIGZvcm0gaXMgY291bnRlZFxuICovXG5leHBvcnQgZnVuY3Rpb24gQ09VTlRfRk9STVMoZm9ybUxpc3Q6IE1haW5Gb3JtW10sIGV4cHJlc3Npb246IHN0cmluZyA9ICd0cnVlJyk6IG51bWJlciB7XG4gIGNvbnN0IGZvcm1zOiBNYWluRm9ybVtdID0gKGZvcm1MaXN0IHx8IFtdKS5zbGljZSgwKS5maWx0ZXIoKGY6IE1haW5Gb3JtKSA9PiBmICE9IG51bGwpO1xuICBjb25zdCBpZGVudGlmaWVycyA9IFsuLi5uZXcgU2V0KGdldENvZGVJZGVudGlmaWVycyhleHByZXNzaW9uLCB0cnVlKSldO1xuICBsZXQgY291bnQgPSAwO1xuICBpZiAoZXhwcmVzc2lvbiA9PT0gJ3RydWUnKSB7XG4gICAgcmV0dXJuIGZvcm1zLmxlbmd0aDtcbiAgfVxuICBpZiAoZm9ybXMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBmb3Jtcy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IG1haW5Gb3JtID0gZm9ybXNbaV07XG4gICAgbGV0IGV4eHByID0gZXhwcmVzc2lvbjtcbiAgICBpZGVudGlmaWVycy5mb3JFYWNoKGlkZW50aWZpZXIgPT4ge1xuICAgICAgY29uc3QgY2hhbmdlID0gbWFpbkZvcm1baWRlbnRpZmllcl0gPyBtYWluRm9ybVtpZGVudGlmaWVyXSA6IG51bGw7XG4gICAgICBpZiAoY2hhbmdlICE9IG51bGwpIHtcbiAgICAgICAgZXh4cHIgPSBleHhwci5zcGxpdChpZGVudGlmaWVyKS5qb2luKEpTT04uc3RyaW5naWZ5KGNoYW5nZSBhcyBzdHJpbmcpKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAoZXZhbHVhdGVFeHByZXNzaW9uKGV4eHByLCBtYWluRm9ybSkpIHtcbiAgICAgIGNvdW50Kys7XG4gICAgfSBlbHNlIGlmIChtYWluRm9ybS5yZXBzICE9IG51bGwpIHtcbiAgICAgIGNvbnN0IGFsbHJlcHM6IG51bWJlciA9IE9iamVjdC5rZXlzKG1haW5Gb3JtLnJlcHMpXG4gICAgICAgIC5tYXAoKGtleTogc3RyaW5nKSA9PiAobWFpbkZvcm0ucmVwcyBhcyBJbnN0YW5jZXMpW2tleV0pXG4gICAgICAgIC5mbGF0KClcbiAgICAgICAgLm1hcCgoY2hpbGQ6IEZvcm0pID0+IGV2YWx1YXRlRXhwcmVzc2lvbihleHhwciwgY2hpbGQpKVxuICAgICAgICAucmVkdWNlKChhLCBiKSA9PiAoYSArPSArYiksIDApO1xuICAgICAgaWYgKGFsbHJlcHMgPiAwKSB7XG4gICAgICAgIGNvdW50Kys7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBjb3VudDtcbn1cbi8qKlxuICogQ291bnRzIHRoZSByZXBzIG9mIHRoZSBmb3JtLlxuICogdGhlIGV4cHJlc3Npb24gaXMgZmlyc3QgZXZhbHVhdGVkIGluIG1haW5Gb3JtICBpZiB0cnVlIHJldHVybiBhbGwgcmVwcyBjb3VudGluZyBlbHNlIHRoZSBldmFsdWF0aW9uIG9mIGV4cHJlc3Npb24gaXMgY2FsY3VsYXRlZFxuICogaW4gYW55IHJlcHMgYW5kIHJldHVybiB0aGUgY291bnQgb2YgYWxsIHJlcHMgdGhhdCBzYXRpc2ZpZWQgdGhlIGV4cHJlc3Npb24uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBDT1VOVF9SRVBTKGZvcm1MaXN0OiBNYWluRm9ybVtdLCBleHByZXNzaW9uOiBzdHJpbmcgPSAndHJ1ZScpOiBudW1iZXIge1xuICBjb25zdCBmb3JtczogTWFpbkZvcm1bXSA9IGNsb25lTWFpbkZvcm1zKGZvcm1MaXN0KS5maWx0ZXIoKGY6IE1haW5Gb3JtKSA9PiBmICE9IG51bGwpO1xuICBjb25zdCBpZGVudGlmaWVycyA9IGdldENvZGVJZGVudGlmaWVycyhleHByZXNzaW9uLCB0cnVlKTtcbiAgbGV0IGV4eHByID0gZXhwcmVzc2lvbjtcbiAgbGV0IGNvdW50ID0gMDtcblxuICBpZiAoZm9ybXMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBmb3Jtcy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IG1haW5Gb3JtID0gZm9ybXNbaV07XG4gICAgaWYgKG1haW5Gb3JtLnJlcHMgIT0gbnVsbCkge1xuICAgICAgY29uc3QgYWxscmVwczogRm9ybVtdID0gT2JqZWN0LmtleXMobWFpbkZvcm0ucmVwcylcbiAgICAgICAgLm1hcCgoa2V5OiBzdHJpbmcpID0+IChtYWluRm9ybS5yZXBzIGFzIEluc3RhbmNlcylba2V5XSlcbiAgICAgICAgLmZsYXQoKTtcbiAgICAgIGFsbHJlcHMuZm9yRWFjaCgoY2hpbGQ6IEZvcm0pID0+IHtcbiAgICAgICAgaWYgKGV2YWx1YXRlRXhwcmVzc2lvbihleHByZXNzaW9uLCBjaGlsZCkpIHtcbiAgICAgICAgICBjb3VudCsrO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZGVudGlmaWVycy5mb3JFYWNoKGlkZW50aWZpZXIgPT4ge1xuICAgICAgY29uc3QgY2hhbmdlID0gbWFpbkZvcm1baWRlbnRpZmllcl0gPyBtYWluRm9ybVtpZGVudGlmaWVyXSA6IG51bGw7XG4gICAgICBpZiAoY2hhbmdlKSB7XG4gICAgICAgIGV4eHByID0gZXhwcmVzc2lvbi5zcGxpdChpZGVudGlmaWVyKS5qb2luKEpTT04uc3RyaW5naWZ5KGNoYW5nZSBhcyBzdHJpbmcpKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAoZXZhbHVhdGVFeHByZXNzaW9uKGV4eHByLCBtYWluRm9ybSkpIHtcbiAgICAgIGNvdW50Kys7XG4gICAgfVxuICB9XG4gIHJldHVybiBjb3VudDtcbn1cblxuLyoqXG4gKiBDb3VudHMgdGhlIGFtb3VudCBvZiB1bmlxdWUgZm9ybSB2YWx1ZXMgZm9yIGEgc3BlY2lmaWMgZmllbGQuIFRoZSBmb3JtIG5hbWUgbXVzdCBiZSBzcGVjaWZpZWQuIEFuXG4gKiBvcHRpb25hbCBjb25kaXRpb24gY2FuIGJlIGFkZGVkIHRvIGRpc2NyaW1pbmF0ZSB3aGljaCBmb3JtcyB0byBjb3VudCBpblxuICovXG5leHBvcnQgZnVuY3Rpb24gQ09VTlRfRk9STVNfVU5JUVVFKFxuICBmb3JtTGlzdDogTWFpbkZvcm1bXSxcbiAgZmllbGROYW1lOiBzdHJpbmcsXG4gIGV4cHJlc3Npb246IHN0cmluZyA9ICd0cnVlJyxcbik6IG51bWJlciB7XG4gIGNvbnN0IGZvcm1zOiBNYWluRm9ybVtdID0gKGZvcm1MaXN0IHx8IFtdKS5zbGljZSgwKS5maWx0ZXIoKGY6IE1haW5Gb3JtKSA9PiBmICE9IG51bGwpO1xuICBjb25zdCBpZGVudGlmaWVycyA9IFsuLi5uZXcgU2V0KGdldENvZGVJZGVudGlmaWVycyhleHByZXNzaW9uLCB0cnVlKSldO1xuICBsZXQgdmFsdWVzOiBhbnlbXSA9IFtdO1xuXG4gIGlmIChmb3Jtcy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuICBmb3IgKGxldCBpID0gMDsgaSA8IGZvcm1zLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgbWFpbkZvcm0gPSBmb3Jtc1tpXTtcbiAgICBsZXQgZXh4cHIgPSBleHByZXNzaW9uO1xuICAgIGlkZW50aWZpZXJzLmZvckVhY2goaWRlbnRpZmllciA9PiB7XG4gICAgICBjb25zdCBjaGFuZ2UgPSBtYWluRm9ybVtpZGVudGlmaWVyXSA/IG1haW5Gb3JtW2lkZW50aWZpZXJdIDogbnVsbDtcbiAgICAgIGlmIChjaGFuZ2UgIT0gbnVsbCkge1xuICAgICAgICBleHhwciA9IGV4eHByLnNwbGl0KGlkZW50aWZpZXIpLmpvaW4oSlNPTi5zdHJpbmdpZnkoY2hhbmdlIGFzIHN0cmluZykpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmIChtYWluRm9ybS5yZXBzICE9IG51bGwpIHtcbiAgICAgIGNvbnN0IGZpZWxkTmFtZUluTWFpbiA9IGV2YWx1YXRlRXhwcmVzc2lvbihmaWVsZE5hbWUsIG1haW5Gb3JtKTtcbiAgICAgIGNvbnN0IGFsbHJlcHM6IGFueVtdID0gT2JqZWN0LmtleXMobWFpbkZvcm0ucmVwcylcbiAgICAgICAgLm1hcCgoa2V5OiBzdHJpbmcpID0+IChtYWluRm9ybS5yZXBzIGFzIEluc3RhbmNlcylba2V5XSlcbiAgICAgICAgLmZsYXQoKVxuICAgICAgICAuZmlsdGVyKChjaGlsZDogRm9ybSkgPT4gZXZhbHVhdGVFeHByZXNzaW9uKGV4eHByLCBjaGlsZCkpXG4gICAgICAgIC5tYXAoKGNoaWxkOiBGb3JtKSA9PlxuICAgICAgICAgIGZpZWxkTmFtZUluTWFpbiAhPSBudWxsID8gZmllbGROYW1lSW5NYWluIDogZXZhbHVhdGVFeHByZXNzaW9uKGZpZWxkTmFtZSwgY2hpbGQpLFxuICAgICAgICApO1xuICAgICAgaWYgKGFsbHJlcHMubGVuZ3RoID4gMCkge1xuICAgICAgICB2YWx1ZXMgPSBbLi4udmFsdWVzLCAuLi5hbGxyZXBzXTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGV2YWx1YXRlRXhwcmVzc2lvbihleHhwciwgbWFpbkZvcm0pKSB7XG4gICAgICBjb25zdCBtVmFsdWUgPSBldmFsdWF0ZUV4cHJlc3Npb24oZmllbGROYW1lLCBtYWluRm9ybSk7XG4gICAgICBpZiAobVZhbHVlICE9IG51bGwpIHtcbiAgICAgICAgdmFsdWVzLnB1c2gobVZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIFsuLi5uZXcgU2V0KHZhbHVlcyldLmxlbmd0aDtcbn1cblxuLyoqXG4gKiBBZ2dyZWdhdGVzIGFuZCBzdW1zIHRoZSB2YWx1ZXMgb2Ygb25lIGZpZWxkLiBBbiBvcHRpb25hbCBjb25kaXRpb24gY2FuIGJlIGFkZGVkIHRvIGRpc2NyaW1pbmF0ZVxuICogd2hpY2ggZm9ybXMgdG8gdGFrZSBmb3IgdGhlIHN1bS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIFNVTShtYWluRm9ybXM6IChNYWluRm9ybSB8IEZvcm0pW10sIGZpZWxkOiBzdHJpbmcsIGNvbmRpdGlvbiA9ICd0cnVlJyk6IG51bWJlciB7XG4gIGNvbnN0IGZvcm1zOiAoTWFpbkZvcm0gfCBGb3JtKVtdID0gKG1haW5Gb3JtcyB8fCBbXSlcbiAgICAuc2xpY2UoMClcbiAgICAuZmlsdGVyKChmOiBNYWluRm9ybSB8IEZvcm0pID0+IGYgIT0gbnVsbCk7XG5cbiAgbGV0IGNvdW50ID0gMDtcblxuICBpZiAoZm9ybXMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBmb3Jtcy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IG1haW5Gb3JtID0gZm9ybXNbaV07XG5cbiAgICBpZiAoZXZhbHVhdGVFeHByZXNzaW9uKGNvbmRpdGlvbiwgbWFpbkZvcm0pKSB7XG4gICAgICBpZiAoZmllbGQgaW4gbWFpbkZvcm0gJiYgbWFpbkZvcm1bZmllbGRdICE9IG51bGwpIHtcbiAgICAgICAgY291bnQgKz0gKyhtYWluRm9ybVtmaWVsZF0gYXMgbnVtYmVyKSB8fCAwO1xuICAgICAgICBjb3VudCA9IGZsb2F0aWZ5KGNvdW50KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChtYWluRm9ybS5yZXBzICE9IG51bGwpIHtcbiAgICAgICAgICBjb25zdCBhbGxyZXBzOiBGb3JtW10gPSBPYmplY3Qua2V5cyhtYWluRm9ybS5yZXBzKVxuICAgICAgICAgICAgLm1hcCgoa2V5OiBzdHJpbmcpID0+IChtYWluRm9ybS5yZXBzIGFzIEluc3RhbmNlcylba2V5XSlcbiAgICAgICAgICAgIC5mbGF0KCk7XG4gICAgICAgICAgYWxscmVwc1xuICAgICAgICAgICAgLmZpbHRlcihjID0+IGNbZmllbGRdICE9IG51bGwpXG4gICAgICAgICAgICAuZm9yRWFjaCgoY2hpbGQ6IEZvcm0pID0+IHtcbiAgICAgICAgICAgICAgY291bnQgKz0gKyhjaGlsZFtmaWVsZF0gYXMgbnVtYmVyKSB8fCAwO1xuICAgICAgICAgICAgICBjb3VudCA9IGZsb2F0aWZ5KGNvdW50KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChtYWluRm9ybS5yZXBzICE9IG51bGwpIHtcbiAgICAgICAgY29uc3QgYWxscmVwczogRm9ybVtdID0gT2JqZWN0LmtleXMobWFpbkZvcm0ucmVwcylcbiAgICAgICAgICAubWFwKChrZXk6IHN0cmluZykgPT4gKG1haW5Gb3JtLnJlcHMgYXMgSW5zdGFuY2VzKVtrZXldKVxuICAgICAgICAgIC5mbGF0KCk7XG4gICAgICAgIGFsbHJlcHNcbiAgICAgICAgICAuZmlsdGVyKGMgPT4gY1tmaWVsZF0gIT0gbnVsbClcbiAgICAgICAgICAuZm9yRWFjaCgoY2hpbGQ6IEZvcm0pID0+IHtcbiAgICAgICAgICAgIGlmIChldmFsdWF0ZUV4cHJlc3Npb24oY29uZGl0aW9uLCBjaGlsZCkpIHtcbiAgICAgICAgICAgICAgY291bnQgKz0gKyhjaGlsZFtmaWVsZF0gYXMgbnVtYmVyKSB8fCAwO1xuICAgICAgICAgICAgICBjb3VudCA9IGZsb2F0aWZ5KGNvdW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIGNvdW50O1xufVxuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIG1lYW4gb2YgYSBzaW1wbGUgb3IgZGVyaXZlZCB2YWx1ZS4gQW4gb3B0aW9uYWwgY29uZGl0aW9uIGNhbiBiZSBhZGRlZCB0b1xuICogZGlzY3JpbWluYXRlIHdoaWNoIGZvcm1zIHRvIHRha2UgZm9yIHRoZSBzdW0uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBNRUFOKGZvcm1zOiAoRm9ybSB8IE1haW5Gb3JtKVtdLCBmaWVsZE5hbWU6IHN0cmluZyk6IHN0cmluZyB7XG4gIGZvcm1zID0gKGZvcm1zIHx8IFtdKS5zbGljZSgwKS5maWx0ZXIoKGY6IE1haW5Gb3JtIHwgRm9ybSkgPT4gZiAhPSBudWxsKTtcbiAgZmllbGROYW1lID0gZmllbGROYW1lIHx8ICcnO1xuICBsZXQgbGVuZ3RoID0gMDtcbiAgbGV0IGFjYyA9IDA7XG4gIGZvcm1zLmZvckVhY2goZm9ybSA9PiB7XG4gICAgaWYgKGZvcm1bZmllbGROYW1lXSA9PSBudWxsICYmIGZvcm0ucmVwcyAhPSBudWxsKSB7XG4gICAgICBPYmplY3Qua2V5cyhmb3JtLnJlcHMgYXMgSW5zdGFuY2VzKS5mb3JFYWNoKHJlcCA9PiB7XG4gICAgICAgICgoZm9ybS5yZXBzIGFzIEluc3RhbmNlcylbcmVwXSBhcyBGb3JtW10pLmZvckVhY2gocmZvcm0gPT4ge1xuICAgICAgICAgIGNvbnN0IHJzVmFsID0gcmZvcm1bZmllbGROYW1lXTtcbiAgICAgICAgICBpZiAocnNWYWwgIT0gbnVsbCkge1xuICAgICAgICAgICAgYWNjICs9IGV2YWx1YXRlRXhwcmVzc2lvbihgJHtyc1ZhbH1gLCBmb3JtKTtcbiAgICAgICAgICAgIGxlbmd0aCsrO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgYWNjICs9IGV2YWx1YXRlRXhwcmVzc2lvbihmaWVsZE5hbWUsIGZvcm0pO1xuICAgICAgbGVuZ3RoKys7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGAke1JPVU5EKGFjYyAvIGxlbmd0aCl9YDtcbn1cblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSAlIGJldHdlZW4gdHdvIG1lbWJlcnMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBQRVJDRU5UKHZhbHVlMTogbnVtYmVyLCB2YWx1ZTI6IG51bWJlcik6IHN0cmluZyB7XG4gIGNvbnN0IHJlcyA9ICgrdmFsdWUxICogMTAwKSAvICt2YWx1ZTI7XG4gIHJldHVybiBOdW1iZXIuaXNGaW5pdGUocmVzKSA/IGAke1JPVU5EKHJlcyl9JWAgOiAnaW5maW5pdGUnO1xufVxuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGV4cHJlc3Npb24gaW4gdGhlIGxhc3QgZm9ybSBieSBkYXRlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gTEFTVChmb3JtczogKEZvcm0gfCBNYWluRm9ybSlbXSwgZXhwcmVzc2lvbjogc3RyaW5nLCBkYXRlID0gJ2NyZWF0ZWRfYXQnKTogc3RyaW5nIHtcbiAgZm9ybXMgPSAoZm9ybXMgfHwgW10pXG4gICAgLnNsaWNlKDApXG4gICAgLmZpbHRlcigoZjogTWFpbkZvcm0gfCBGb3JtKSA9PiBmICE9IG51bGwpXG4gICAgLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgIGNvbnN0IGRhdGVBID0gbmV3IERhdGUoYltkYXRlXSBhcyBzdHJpbmcpLmdldFRpbWUoKTtcbiAgICAgIGNvbnN0IGRhdGVCID0gbmV3IERhdGUoYVtkYXRlXSBhcyBzdHJpbmcpLmdldFRpbWUoKTtcbiAgICAgIHJldHVybiBkYXRlQSAtIGRhdGVCO1xuICAgIH0pO1xuICBpZiAoZm9ybXMubGVuZ3RoID4gMCAmJiBleHByZXNzaW9uICE9IG51bGwpIHtcbiAgICBjb25zdCBpZGVudGlmaWVycyA9IGdldENvZGVJZGVudGlmaWVycyhleHByZXNzaW9uLCB0cnVlKTtcbiAgICBjb25zdCBsYXN0Rm9ybSA9IGZvcm1zW2Zvcm1zLmxlbmd0aCAtIDFdIHx8IFtdO1xuICAgIGxldCBleHhwciA9IGV4cHJlc3Npb247XG4gICAgaWRlbnRpZmllcnMuZm9yRWFjaChpZGVudGlmaWVyID0+IHtcbiAgICAgIGNvbnN0IGNoYW5nZSA9IGxhc3RGb3JtW2lkZW50aWZpZXJdID8gbGFzdEZvcm1baWRlbnRpZmllcl0gOiBudWxsO1xuICAgICAgaWYgKGNoYW5nZSAhPSBudWxsKSB7XG4gICAgICAgIGV4eHByID0gZXh4cHIuc3BsaXQoaWRlbnRpZmllcikuam9pbihjaGFuZ2UgYXMgc3RyaW5nKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBjb25zdCBmb3JtRXZhbCA9IGV2YWx1YXRlRXhwcmVzc2lvbihleHByZXNzaW9uLCBsYXN0Rm9ybSk7XG4gICAgaWYgKGZvcm1FdmFsID09IGZhbHNlICYmIGxhc3RGb3JtLnJlcHMgIT0gbnVsbCkge1xuICAgICAgY29uc3QgYWxscmVwczogbnVtYmVyID0gT2JqZWN0LmtleXMobGFzdEZvcm0ucmVwcylcbiAgICAgICAgLm1hcCgoa2V5OiBzdHJpbmcpID0+IChsYXN0Rm9ybS5yZXBzIGFzIEluc3RhbmNlcylba2V5XSlcbiAgICAgICAgLmZsYXQoKVxuICAgICAgICAubWFwKChyZXA6IEZvcm0pID0+IGV2YWx1YXRlRXhwcmVzc2lvbihleHhwciwgcmVwKSlcbiAgICAgICAgLnJlZHVjZSgoYSwgYikgPT4gKGEgKz0gK2IpLCAwKTtcbiAgICAgIGlmIChhbGxyZXBzID4gMCkge1xuICAgICAgICByZXR1cm4gYCR7YWxscmVwc31gO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZm9ybUV2YWw7XG4gIH1cbiAgcmV0dXJuICcwJztcbn1cblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBtYXggdmFsdWUgb2YgdGhlIGZpZWxkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gTUFYKGZvcm1zOiAoRm9ybSB8IE1haW5Gb3JtKVtdLCBmaWVsZE5hbWU6IHN0cmluZyk6IG51bWJlciB7XG4gIGZvcm1zID0gKGZvcm1zIHx8IFtdKS5zbGljZSgwKS5maWx0ZXIoKGY6IE1haW5Gb3JtIHwgRm9ybSkgPT4gZiAhPSBudWxsKTtcbiAgbGV0IG1heCA9IDA7XG4gIGZvcm1zLmZvckVhY2goZm9ybSA9PiB7XG4gICAgaWYgKGZvcm1bZmllbGROYW1lXSA9PSBudWxsICYmIGZvcm0ucmVwcyAhPSBudWxsKSB7XG4gICAgICBPYmplY3Qua2V5cyhmb3JtLnJlcHMgYXMgSW5zdGFuY2VzKS5mb3JFYWNoKHJlcCA9PiB7XG4gICAgICAgICgoZm9ybS5yZXBzIGFzIEluc3RhbmNlcylbcmVwXSBhcyBGb3JtW10pLmZvckVhY2goX3Jmb3JtID0+IHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBmb3JtW2ZpZWxkTmFtZV0gIT0gbnVsbCAmJlxuICAgICAgICAgICAgIWlzTmFOKGZvcm1bZmllbGROYW1lXSBhcyBudW1iZXIpICYmXG4gICAgICAgICAgICAoZm9ybVtmaWVsZE5hbWVdIGFzIG51bWJlcikgPiBtYXhcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIG1heCA9IGZvcm1bZmllbGROYW1lXSBhcyBudW1iZXI7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoXG4gICAgICAgIGZvcm1bZmllbGROYW1lXSAhPSBudWxsICYmXG4gICAgICAgICFpc05hTihmb3JtW2ZpZWxkTmFtZV0gYXMgbnVtYmVyKSAmJlxuICAgICAgICAoZm9ybVtmaWVsZE5hbWVdIGFzIG51bWJlcikgPiBtYXhcbiAgICAgICkge1xuICAgICAgICBtYXggPSBmb3JtW2ZpZWxkTmFtZV0gYXMgbnVtYmVyO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG4gIHJldHVybiBtYXg7XG59XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgbWVkaWFuIHZhbHVlIG9mIHRoZSBmaWVsZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIE1FRElBTihmb3JtczogKEZvcm0gfCBNYWluRm9ybSlbXSwgZmllbGROYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xuICBmb3JtcyA9IChmb3JtcyB8fCBbXSkuc2xpY2UoMCkuZmlsdGVyKChmOiBNYWluRm9ybSB8IEZvcm0pID0+IGYgIT0gbnVsbCk7XG4gIGxldCBudW1iZXJzOiBudW1iZXJbXSA9IFtdO1xuICBmb3Jtcy5mb3JFYWNoKGZvcm0gPT4ge1xuICAgIGlmIChmb3JtW2ZpZWxkTmFtZV0gPT0gbnVsbCAmJiBmb3JtLnJlcHMgIT0gbnVsbCkge1xuICAgICAgT2JqZWN0LmtleXMoZm9ybS5yZXBzIGFzIEluc3RhbmNlcykuZm9yRWFjaChyZXAgPT4ge1xuICAgICAgICAoKGZvcm0ucmVwcyBhcyBJbnN0YW5jZXMpW3JlcF0gYXMgRm9ybVtdKS5mb3JFYWNoKHJmb3JtID0+IHtcbiAgICAgICAgICBpZiAocmZvcm1bZmllbGROYW1lXSAhPSBudWxsKSB7XG4gICAgICAgICAgICBudW1iZXJzLnB1c2gocmZvcm1bZmllbGROYW1lXSBhcyBudW1iZXIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgbnVtYmVycy5wdXNoKChmb3JtIGFzIEZvcm0pW2ZpZWxkTmFtZV0gYXMgbnVtYmVyKTtcbiAgICB9XG4gIH0pO1xuXG4gIG51bWJlcnMgPSBudW1iZXJzLnNvcnQoKGEsIGIpID0+IGEgLSBiKS5maWx0ZXIoKGl0ZW0sIHBvcywgc2VsZikgPT4gc2VsZi5pbmRleE9mKGl0ZW0pID09IHBvcyk7XG4gIGNvbnN0IHJlcyA9IE51bWJlci5pc0ludGVnZXIobnVtYmVycy5sZW5ndGggLyAyKVxuICAgID8gbnVtYmVyc1tudW1iZXJzLmxlbmd0aCAvIDJdXG4gICAgOiAobnVtYmVyc1srcGFyc2VJbnQoYCR7bnVtYmVycy5sZW5ndGggLSAxIC8gMn1gKSAvIDJdICtcbiAgICAgICAgbnVtYmVyc1srcGFyc2VJbnQoYCR7bnVtYmVycy5sZW5ndGggLSAxIC8gMn1gKSAvIDIgKyAxXSkgL1xuICAgICAgMjtcblxuICByZXR1cm4gYCR7Uk9VTkQocmVzKX1gO1xufVxuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIG1vZGUgdmFsdWUgb2YgdGhlIGZpZWxkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gTU9ERShmb3JtczogKEZvcm0gfCBNYWluRm9ybSlbXSwgZmllbGROYW1lOiBzdHJpbmcpOiBudW1iZXJbXSB7XG4gIGZvcm1zID0gKGZvcm1zIHx8IFtdKS5zbGljZSgwKS5maWx0ZXIoKGY6IE1haW5Gb3JtIHwgRm9ybSkgPT4gZiAhPSBudWxsKTtcbiAgbGV0IG1heENvdW50ID0gMDtcbiAgY29uc3QgbWFwOiB7W2tleTogbnVtYmVyXTogbnVtYmVyfSA9IHt9O1xuICBmb3Jtcy5mb3JFYWNoKGYgPT4ge1xuICAgIGlmIChmW2ZpZWxkTmFtZV0gPT0gbnVsbCAmJiBmLnJlcHMgIT0gbnVsbCkge1xuICAgICAgT2JqZWN0LmtleXMoZilcbiAgICAgICAgLmZpbHRlcihrZXkgPT4ga2V5LmluY2x1ZGVzKGZpZWxkTmFtZSkpXG4gICAgICAgIC5mb3JFYWNoKHJzRmllbGQgPT4ge1xuICAgICAgICAgIGNvbnN0IHZhbHVlID0gZltyc0ZpZWxkXSBhcyBudW1iZXI7XG4gICAgICAgICAgaWYgKHZhbHVlICE9IG51bGwpIHtcbiAgICAgICAgICAgIG1hcFt2YWx1ZV0gPSBtYXBbdmFsdWVdICE9IG51bGwgPyBtYXBbdmFsdWVdICsgMSA6IDE7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChtYXBbdmFsdWVdID4gbWF4Q291bnQpIHtcbiAgICAgICAgICAgIG1heENvdW50ID0gbWFwW3ZhbHVlXTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCB2YWx1ZSA9IGZbZmllbGROYW1lXSBhcyBudW1iZXI7XG4gICAgICBpZiAodmFsdWUgIT0gbnVsbCkge1xuICAgICAgICBtYXBbdmFsdWVdID0gbWFwW3ZhbHVlXSAhPSBudWxsID8gbWFwW3ZhbHVlXSArIDEgOiAxO1xuICAgICAgfVxuICAgICAgaWYgKG1hcFt2YWx1ZV0gPiBtYXhDb3VudCkge1xuICAgICAgICBtYXhDb3VudCA9IG1hcFt2YWx1ZV07XG4gICAgICB9XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIE9iamVjdC5rZXlzKG1hcClcbiAgICAuZmlsdGVyKHYgPT4gbWFwWyt2XSA9PT0gbWF4Q291bnQpXG4gICAgLm1hcCh2ID0+ICt2KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkRGF0YXNldChcbiAgZGF0YXNldDogKHN0cmluZyB8IG51bWJlciB8IHN0cmluZ1tdIHwgbnVtYmVyW10pW10sXG4gIGNvbHNwYW5zOiBudW1iZXJbXSxcbik6IEFqZlRhYmxlQ2VsbFtdW10ge1xuICByZXR1cm4gYnVpbGRBbGlnbmVkRGF0YXNldChkYXRhc2V0LCBjb2xzcGFucywgW10pO1xufVxuXG4vKipcbiAqIEJ1aWxkIGEgZGF0YXNldCBmb3IgYWpmIGR5bmFtaWMgdGFibGVcbiAqIEBwYXJhbSBkYXRhc2V0IHRoZSBkYXRhc2V0IGZvciB0aGUgdGFibGVcbiAqIEBwYXJhbSBjb2xzcGFucyBjb2xzcGFuIGZvciBlYWNoIHZhbHVlIGluIHRoZSBkYXRhc2V0XG4gKiBAcGFyYW0gdGV4dEFsaWduIGFsaWdubWVudCBmb3IgZWFjaCB2YWx1ZSBpbiB0aGUgZGF0YXNldFxuICogQHJldHVybnMgQW4gQWpmVGFibGVDZWxsIGxpc3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkQWxpZ25lZERhdGFzZXQoXG4gIGRhdGFzZXQ6IChzdHJpbmcgfCBudW1iZXIgfCBzdHJpbmdbXSB8IG51bWJlcltdKVtdLFxuICBjb2xzcGFuczogbnVtYmVyW10sXG4gIHRleHRBbGlnbjogc3RyaW5nW10sXG4pOiBBamZUYWJsZUNlbGxbXVtdIHtcbiAgY29uc3QgcmVzOiBBamZUYWJsZUNlbGxbXVtdID0gW107XG4gIGNvbnN0IG5vcm1hbGl6ZURhdGFzZXQ6IGFueVtdW10gPSBbXTtcbiAgZGF0YXNldC5mb3JFYWNoKChyb3c6IGFueSwgaW5kZXhSb3c6IG51bWJlcikgPT4ge1xuICAgIHJvdyA9IEFycmF5LmlzQXJyYXkocm93KSA/IHJvdyA6IFtyb3ddO1xuICAgIG5vcm1hbGl6ZURhdGFzZXRbaW5kZXhSb3cgJSBjb2xzcGFucy5sZW5ndGhdID1cbiAgICAgIG5vcm1hbGl6ZURhdGFzZXRbaW5kZXhSb3cgJSBjb2xzcGFucy5sZW5ndGhdICE9IG51bGxcbiAgICAgICAgPyBbLi4ubm9ybWFsaXplRGF0YXNldFtpbmRleFJvdyAlIGNvbHNwYW5zLmxlbmd0aF0sIC4uLnJvd11cbiAgICAgICAgOiBbLi4ucm93XTtcbiAgfSk7XG4gIGNvbnN0IHRyYW5zcG9zZSA9IG5vcm1hbGl6ZURhdGFzZXRbMF0ubWFwKChfOiBhbnksIGNvbEluZGV4OiBudW1iZXIpID0+XG4gICAgbm9ybWFsaXplRGF0YXNldC5tYXAoKHJvdzogYW55KSA9PiByb3dbY29sSW5kZXhdKSxcbiAgKTtcbiAgdHJhbnNwb3NlLmZvckVhY2goKGRhdGE6IGFueVtdLCBpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgY29uc3Qgcm93OiBBamZUYWJsZUNlbGxbXSA9IFtdO1xuICAgIGRhdGEuZm9yRWFjaCgoY2VsbFZhbHVlOiBzdHJpbmcgfCBudW1iZXIsIGNlbGxJbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICByb3cucHVzaCh7XG4gICAgICAgIHZhbHVlOiBjZWxsVmFsdWUsXG4gICAgICAgIGNvbHNwYW46IGNvbHNwYW5zW2NlbGxJbmRleF0sXG4gICAgICAgIHJvd3NwYW46IDEsXG4gICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgdGV4dEFsaWduOiB0ZXh0QWxpZ25bY2VsbEluZGV4XSA/IHRleHRBbGlnbltjZWxsSW5kZXhdIDogJ2NlbnRlcicsXG4gICAgICAgICAgY29sb3I6ICdibGFjaycsXG4gICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBpbmRleCAlIDIgPT09IDAgPyAnd2hpdGUnIDogJyNkZGQnLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgcmVzLnB1c2gocm93KTtcbiAgfSk7XG4gIHJldHVybiByZXM7XG59XG5cbi8qKlxuICogQnVpbGQgYSBkYXRhc2V0IGJhc2VkIG9uIGEgbGlzdCBvZiBGb3JtcywgZm9yIGFqZiBkeW5hbWljIHRhYmxlXG4gKiBAcGFyYW0gZGF0YXNldCB0aGUgZGF0YXNldCBmb3IgdGhlIHRhYmxlXG4gKiBAcGFyYW0gZmllbGRzIHRoZSBsaXN0IG9mIGZpZWxkcyBuYW1lIGZvciBlYWNoIHJvd1xuICogQHBhcmFtIHJvd0xpbmsgdGhlIGh0dHAgbGluayBmb3IgdGhlIHJvdywgd2l0aCB0aGUgZm9ybSBmaWVsZCBuYW1lIHdpdGggdGhlIGxpbmsgdmFsdWUgYW5kIHRoZSBjb2x1bW4gcG9zaXRpb24gZm9yIHRoZSBsaW5rLlxuICogaWU6IHsnbGluayc6ICdob21lX2xpbmsnLCAncG9zaXRpb24nOiAwfVxuICogQHBhcmFtIGJhY2tncm91bmRDb2xvckEgdGhlIGZpcnN0IGJhY2tncm91ZCBjb2xvclxuICogQHBhcmFtIGJhY2tncm91bmRDb2xvckIgdGhlIHNlY29uZCBiYWNrZ3JvdWQgY29sb3JcbiAqIEByZXR1cm5zIEFuIEFqZlRhYmxlQ2VsbCBsaXN0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBidWlsZEZvcm1EYXRhc2V0KFxuICBkYXRhc2V0OiBNYWluRm9ybVtdLFxuICBmaWVsZHM6IHN0cmluZ1tdLFxuICByb3dMaW5rOiB7bGluazogc3RyaW5nOyBwb3NpdGlvbjogbnVtYmVyfSB8IG51bGwsXG4gIF9iYWNrZ3JvdW5kQ29sb3JBPzogc3RyaW5nLFxuICBfYmFja2dyb3VuZENvbG9yQj86IHN0cmluZyxcbik6IEFqZlRhYmxlQ2VsbFtdW10ge1xuICByZXR1cm4gYnVpbGRBbGlnbmVkRm9ybURhdGFzZXQoZGF0YXNldCwgZmllbGRzLCBbXSwgW10sIHJvd0xpbmssIFtdLCBbXSk7XG59XG5cbi8qKlxuICogQnVpbGQgYSBkYXRhc2V0IGJhc2VkIG9uIGEgbGlzdCBvZiBGb3JtcywgZm9yIGFqZiBkeW5hbWljIHRhYmxlXG4gKiBAcGFyYW0gZGF0YXNldCB0aGUgZGF0YXNldCBmb3IgdGhlIHRhYmxlXG4gKiBAcGFyYW0gZmllbGRzIHRoZSBsaXN0IG9mIGZpZWxkcyBuYW1lIGZvciBlYWNoIHJvd1xuICogQHBhcmFtIGNvbHNwYW5zIGNvbHNwYW4gZm9yIGVhY2ggdmFsdWUgaW4gdGhlIGRhdGFzZXRcbiAqIEBwYXJhbSB0ZXh0QWxpZ24gYWxpZ25tZW50IGZvciBlYWNoIHZhbHVlIGluIHRoZSBkYXRhc2V0XG4gKiBAcGFyYW0gcm93TGluayB0aGUgaHR0cCBsaW5rIGZvciB0aGUgcm93LCB3aXRoIHRoZSBmb3JtIGZpZWxkIG5hbWUgd2l0aCB0aGUgbGluayB2YWx1ZSBhbmQgdGhlIGNvbHVtbiBwb3NpdGlvbiBmb3IgdGhlIGxpbmsuXG4gKiBpZTogeydsaW5rJzogJ2hvbWVfbGluaycsICdwb3NpdGlvbic6IDB9XG4gKiBAcmV0dXJucyBBbiBBamZUYWJsZUNlbGwgbGlzdFxuICovXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRBbGlnbmVkRm9ybURhdGFzZXQoXG4gIGRhdGFzZXQ6IE1haW5Gb3JtW10sXG4gIGZpZWxkczogc3RyaW5nW10sXG4gIGNvbHNwYW5zOiBudW1iZXJbXSxcbiAgdGV4dEFsaWduOiBzdHJpbmdbXSxcbiAgcm93TGluazoge2xpbms6IHN0cmluZzsgcG9zaXRpb246IG51bWJlcn0gfCBudWxsLFxuICBkaWFsb2dGaWVsZHM6IHN0cmluZ1tdLFxuICBkaWFsb2dMYWJlbEZpZWxkczogc3RyaW5nW10sXG4pOiBBamZUYWJsZUNlbGxbXVtdIHtcbiAgY29uc3QgcmVzOiBBamZUYWJsZUNlbGxbXVtdID0gW107XG5cbiAgY29uc3QgYmFja2dyb3VuZENvbG9yQSA9ICd3aGl0ZSc7XG4gIGNvbnN0IGJhY2tncm91bmRDb2xvckIgPSAnI2RkZCc7XG4gIGlmIChkYXRhc2V0KSB7XG4gICAgbGV0IGluZGV4OiBudW1iZXIgPSAwO1xuICAgIGRhdGFzZXQuZm9yRWFjaCgoZGF0YTogTWFpbkZvcm0pID0+IHtcbiAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgIGluZGV4Kys7XG4gICAgICAgIGNvbnN0IHJvdzogQWpmVGFibGVDZWxsW10gPSBbXTtcbiAgICAgICAgZmllbGRzLmZvckVhY2goKGZpZWxkOiBzdHJpbmcsIGNlbGxJZHg6IG51bWJlcikgPT4ge1xuICAgICAgICAgIGxldCBjZWxsVmFsdWUgPSBkYXRhW2ZpZWxkXSB8fCAnJztcbiAgICAgICAgICBpZiAocm93TGluayAhPSBudWxsICYmIGNlbGxJZHggPT09IHJvd0xpbmtbJ3Bvc2l0aW9uJ10pIHtcbiAgICAgICAgICAgIGNlbGxWYWx1ZSA9IGA8YSBocmVmPScke2RhdGFbcm93TGlua1snbGluayddXX0nPiAke2RhdGFbZmllbGRdfTwvYT5gO1xuICAgICAgICAgIH1cbiAgICAgICAgICByb3cucHVzaCh7XG4gICAgICAgICAgICB2YWx1ZTogY2VsbFZhbHVlLFxuICAgICAgICAgICAgY29sc3BhbjogY29sc3BhbnNbY2VsbElkeF0gJiYgY29sc3BhbnNbY2VsbElkeF0gPiAwID8gY29sc3BhbnNbY2VsbElkeF0gOiAxLFxuICAgICAgICAgICAgcm93c3BhbjogMSxcbiAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgIHRleHRBbGlnbjogdGV4dEFsaWduW2NlbGxJZHhdID8gdGV4dEFsaWduW2NlbGxJZHhdIDogJ2NlbnRlcicsXG4gICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snLFxuICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IGluZGV4ICUgMiA9PT0gMCA/IGJhY2tncm91bmRDb2xvckEgOiBiYWNrZ3JvdW5kQ29sb3JCLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGRpYWxvZ0ZpZWxkcyAmJiBkaWFsb2dGaWVsZHMubGVuZ3RoKSB7XG4gICAgICAgICAgbGV0IGRpYWxvZ0h0bWw6IHN0cmluZ1tdID0gW107XG4gICAgICAgICAgZGlhbG9nRmllbGRzLmZvckVhY2goKGZpZWxkOiBzdHJpbmcsIGNlbGxJZHg6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgbGV0IGZpZWxkVmFsdWUgPSAnXCJcIic7XG4gICAgICAgICAgICBpZiAoZGF0YVtmaWVsZF0gIT0gbnVsbCkge1xuICAgICAgICAgICAgICBmaWVsZFZhbHVlID1cbiAgICAgICAgICAgICAgICBcIjxwIGNsYXNzPSdkaWFsb2ctaXRlbSc+PGI+XCIgK1xuICAgICAgICAgICAgICAgIGRpYWxvZ0xhYmVsRmllbGRzW2NlbGxJZHhdLnJlcGxhY2UoL1snXFxcIl0rL2csICcnKSArXG4gICAgICAgICAgICAgICAgJzwvYj4gPHNwYW4+JyArXG4gICAgICAgICAgICAgICAgZGF0YVtmaWVsZF0gK1xuICAgICAgICAgICAgICAgICc8L3NwYW4+PC9wPic7XG4gICAgICAgICAgICAgIGRpYWxvZ0h0bWwucHVzaChmaWVsZFZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHJvdy5wdXNoKHtcbiAgICAgICAgICAgIHZhbHVlOlxuICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cInJlYWRfbW9yZV9jZWxsXCI+PHAgY2xhc3M9XCJyZWFkX21vcmVfdGV4dFwiPlJlYWQgbW9yZTwvcD48YiBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCI+YWRkX2NpcmNsZV9vdXRsaW5lPC9iPjwvZGl2PicsXG4gICAgICAgICAgICBkaWFsb2dIdG1sOiBkaWFsb2dIdG1sLmpvaW4oJyAnKSxcbiAgICAgICAgICAgIGNvbHNwYW46IDEsXG4gICAgICAgICAgICByb3dzcGFuOiAxLFxuICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgY29sb3I6ICdibGFjaycsXG4gICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogaW5kZXggJSAyID09PSAwID8gYmFja2dyb3VuZENvbG9yQSA6IGJhY2tncm91bmRDb2xvckIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJlcy5wdXNoKHJvdyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cblxuLyoqXG4gKiBjcmVhdGUgYSB3aWRnZXQgZGF0YXNldCBpbnRvIGEgY29udGVudCBsaXN0LCBiYXNlZCBvbiBhIGxpc3Qgb2YgRm9ybXMsIGZvciBwYWdpbmF0ZWQgd2lkZ2V0XG4gKlxuICogQHBhcmFtIGRhdGFzZXQgdGhlIGRhdGFzZXQgZm9yIHRoZSB3aWRnZXRzXG4gKiBAcGFyYW0gZmllbGRzIHRoZSBsaXN0IG9mIGZpZWxkcyBuYW1lIGZvciBlYWNoIHJvd1xuICogQHBhcmFtIHJvd0xpbmsgdGhlIGh0dHAgbGluayBmb3IgdGhlIHJvdywgd2l0aCB0aGUgZm9ybSBmaWVsZCBuYW1lIHdpdGggdGhlIGxpbmsgdmFsdWUgYW5kIHRoZSBjb2x1bW4gcG9zaXRpb24gZm9yIHRoZSBsaW5rLlxuICogaWU6IHsnbGluayc6ICdob21lX2xpbmsnLCAncG9zaXRpb24nOiAwfVxuICogQHBhcmFtIGNlbGxTdHlsZXMgY3NzIHN0eWxlcyBmb3IgY2VsbHNcbiAqIEBwYXJhbSByb3dTdHlsZSBjc3Mgc3R5bGVzIGZvciByb3dzXG4gKiBAcGFyYW0gcGVyY1dpZHRoIGFuIGFycmF5IHdpdGggdGhlIHNhbWUgbGVuZ3RoIG9mIGZpZWxkcyBwYXJhbSwgd2l0aCB0aGUgd2lkdGggZm9yIHRoZSBjb2x1bW5zLlxuICogaWU6IFsnMTAlJywgJzMwJScsICcxMCUnLCAnMjUlJywgJzE1JScsICcxMCUnXVxuICogQHBhcmFtIGJhY2tncm91bmRDb2xvckEgdGhlIGZpcnN0IGJhY2tncm91ZCBjb2xvclxuICogQHBhcmFtIGJhY2tncm91bmRDb2xvckIgdGhlIHNlY29uZCBiYWNrZ3JvdWQgY29sb3JcbiAqIEByZXR1cm5zIEFuIEFqZlRhYmxlV2lkZ2V0IGxpc3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkV2lkZ2V0RGF0YXNldChcbiAgZGF0YXNldDogTWFpbkZvcm1bXSxcbiAgZmllbGRzOiBzdHJpbmdbXSxcbiAgcm93TGluazoge2xpbms6IHN0cmluZzsgcG9zaXRpb246IG51bWJlcn0gfCBudWxsLFxuICBjZWxsU3R5bGVzOiB7W2tleTogc3RyaW5nXTogYW55fSB8IG51bGwsXG4gIHJvd1N0eWxlOiB7W2tleTogc3RyaW5nXTogYW55fSB8IG51bGwsXG4gIHBlcmNXaWR0aDogc3RyaW5nW10sXG4gIGJhY2tncm91bmRDb2xvckE/OiBzdHJpbmcsXG4gIGJhY2tncm91bmRDb2xvckI/OiBzdHJpbmcsXG4pOiBhbnlbXSB7XG4gIGNvbnN0IHJlczoge1trZXk6IHN0cmluZ106IGFueX1bXSA9IFtdO1xuICBpZiAoYmFja2dyb3VuZENvbG9yQSA9PSBudWxsKSB7XG4gICAgYmFja2dyb3VuZENvbG9yQSA9ICd3aGl0ZSc7XG4gIH1cbiAgaWYgKGJhY2tncm91bmRDb2xvckIgPT0gbnVsbCkge1xuICAgIGJhY2tncm91bmRDb2xvckIgPSAnI2RkZCc7XG4gIH1cbiAgaWYgKHJvd1N0eWxlID09IG51bGwpIHtcbiAgICByb3dTdHlsZSA9IHtcbiAgICAgICd0ZXh0LWFsaWduJzogJ3JpZ2h0JyxcbiAgICAgICdtYXJnaW4tYm90dG9tJzogMCxcbiAgICAgICdib3JkZXItY29sbGFwc2UnOiAnY29sbGFwc2UnLFxuICAgIH07XG4gIH1cbiAgaWYgKGNlbGxTdHlsZXMgPT0gbnVsbCkge1xuICAgIGNlbGxTdHlsZXMgPSB7XG4gICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxuICAgICAgY29sb3I6ICdibGFjaycsXG4gICAgfTtcbiAgfVxuICBpZiAocGVyY1dpZHRoID09IG51bGwgfHwgcGVyY1dpZHRoLmxlbmd0aCAhPT0gZmllbGRzLmxlbmd0aCkge1xuICAgIGNvbnN0IGNlbGxXaWR0aCA9IDEwMCAvIGZpZWxkcy5sZW5ndGggKyAnJSc7XG4gICAgcGVyY1dpZHRoID0gW107XG4gICAgZmllbGRzLmZvckVhY2goXyA9PiBwZXJjV2lkdGgucHVzaChjZWxsV2lkdGgpKTtcbiAgfVxuXG4gIGlmIChkYXRhc2V0KSB7XG4gICAgbGV0IGluZGV4OiBudW1iZXIgPSAwO1xuICAgIGRhdGFzZXQuZm9yRWFjaCgoZGF0YTogTWFpbkZvcm0pID0+IHtcbiAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgIGluZGV4Kys7XG4gICAgICAgIC8vIFJvdyBpcyBhbiBBamZUYWJsZVdpZGdldFxuICAgICAgICBjb25zdCByb3c6IHtba2V5OiBzdHJpbmddOiBhbnl9ID0ge1xuICAgICAgICAgIHN0eWxlczoge1xuICAgICAgICAgICAgJ3RleHQtYWxpZ24nOiAncmlnaHQnLFxuICAgICAgICAgICAgJ21hcmdpbi1ib3R0b20nOiAwLFxuICAgICAgICAgICAgJ2JvcmRlci1jb2xsYXBzZSc6ICdjb2xsYXBzZScsXG4gICAgICAgICAgICAuLi5yb3dTdHlsZSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHZpc2liaWxpdHk6IHtjb25kaXRpb246ICd0cnVlJ30sXG4gICAgICAgICAgd2lkZ2V0VHlwZTogNSxcbiAgICAgICAgICBkYXRhc2V0OiBbW11dIGFzIGFueVtdW10sXG4gICAgICAgICAgY2VsbFN0eWxlczogeydib3JkZXItdG9wJzogJzFweCBzb2xpZCBncmV5J30sXG4gICAgICAgIH07XG5cbiAgICAgICAgZmllbGRzLmZvckVhY2goKGZpZWxkOiBzdHJpbmcsIGNlbGxJZHg6IG51bWJlcikgPT4ge1xuICAgICAgICAgIGxldCBmb3JtdWxhQ2VsbCA9ICdcIlwiJztcbiAgICAgICAgICBpZiAoZGF0YVtmaWVsZF0gIT0gbnVsbCkge1xuICAgICAgICAgICAgZm9ybXVsYUNlbGwgPSAnXCInICsgZGF0YVtmaWVsZF0gKyAnXCInO1xuICAgICAgICAgICAgaWYgKHJvd0xpbmsgIT0gbnVsbCAmJiBjZWxsSWR4ID09PSByb3dMaW5rWydwb3NpdGlvbiddKSB7XG4gICAgICAgICAgICAgIGZvcm11bGFDZWxsID0gYFwiPGEgaHJlZj0nJHtkYXRhW3Jvd0xpbmtbJ2xpbmsnXV19Jz4gJHtkYXRhW2ZpZWxkXX08L2E+XCJgO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHJvd1snZGF0YXNldCddWzBdLnB1c2goe1xuICAgICAgICAgICAgbGFiZWw6ICcnLFxuICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgY29sb3I6ICdibGFjaycsXG4gICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogaW5kZXggJSAyID09PSAwID8gYmFja2dyb3VuZENvbG9yQSA6IGJhY2tncm91bmRDb2xvckIsXG4gICAgICAgICAgICAgIC4uLmNlbGxTdHlsZXMsXG4gICAgICAgICAgICAgIHdpZHRoOiBwZXJjV2lkdGhbY2VsbElkeF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZm9ybXVsYToge1xuICAgICAgICAgICAgICBmb3JtdWxhOiBmb3JtdWxhQ2VsbCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb2xzcGFuOiAxLFxuICAgICAgICAgICAgcm93c3BhbjogMSxcbiAgICAgICAgICAgIGFnZ3JlZ2F0aW9uOiB7XG4gICAgICAgICAgICAgIGFnZ3JlZ2F0aW9uOiAwLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJlcy5wdXNoKHJvdyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cblxuLyoqXG4gKiBjcmVhdGUgYSB3aWRnZXQgZGF0YXNldCBpbnRvIGEgY29udGVudCBsaXN0LCBiYXNlZCBvbiBhIGxpc3Qgb2YgRm9ybXMsIGZvciBwYWdpbmF0ZWQgd2lkZ2V0LlxuICogRWFjaCByb3cgaXMgYSBBamZEaWFsb2dXaWRnZXQgYW5kLCBvbiBjbGljaywgb3BlbiBhIGRpYWxvZy5cbiAqXG4gKiBAcGFyYW0gZGF0YXNldCB0aGUgZGF0YXNldCBmb3IgdGhlIHdpZGdldHNcbiAqIEBwYXJhbSBmaWVsZHMgdGhlIGxpc3Qgb2YgZmllbGRzIG5hbWUgZm9yIGVhY2ggcm93XG4gKiBAcGFyYW0gZGlhbG9nRmllbGRzIHRoZSBsaXN0IG9mIGZpZWxkcyBuYW1lIHRvIHNob3cgaW4gdGhlIGRpYWxvZ1xuICogQHBhcmFtIGRpYWxvZ0xhYmVsRmllbGRzIHRoZSBsaXN0IG9mIGxhYmVscyBmb3IgZWFjaCBkaWFsb2dGaWVsZHNcbiAqIEBwYXJhbSByb3dMaW5rIHRoZSBodHRwIGxpbmsgZm9yIHRoZSByb3csIHdpdGggdGhlIGZvcm0gZmllbGQgbmFtZSB3aXRoIHRoZSBsaW5rIHZhbHVlIGFuZCB0aGUgY29sdW1uIHBvc2l0aW9uIGZvciB0aGUgbGluay5cbiAqIGllOiB7J2xpbmsnOiAnaG9tZV9saW5rJywgJ3Bvc2l0aW9uJzogMH1cbiAqIEBwYXJhbSBjZWxsU3R5bGVzIGNzcyBzdHlsZXMgZm9yIGNlbGxzXG4gKiBAcGFyYW0gcm93U3R5bGUgY3NzIHN0eWxlcyBmb3Igcm93c1xuICogQHBhcmFtIHBlcmNXaWR0aCBhbiBhcnJheSB3aXRoIHRoZSBzYW1lIGxlbmd0aCBvZiBmaWVsZHMgcGFyYW0sIHdpdGggdGhlIHdpZHRoIGZvciB0aGUgY29sdW1ucy5cbiAqIGllOiBbJzEwJScsICczMCUnLCAnMTAlJywgJzI1JScsICcxNSUnLCAnMTAlJ11cbiAqIEBwYXJhbSBiYWNrZ3JvdW5kQ29sb3JBIHRoZSBmaXJzdCBiYWNrZ3JvdWQgY29sb3JcbiAqIEBwYXJhbSBiYWNrZ3JvdW5kQ29sb3JCIHRoZSBzZWNvbmQgYmFja2dyb3VkIGNvbG9yXG4gKiBAcmV0dXJucyBBbiBBamZEaWFsb2dXaWRnZXQgbGlzdFxuICovXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRXaWRnZXREYXRhc2V0V2l0aERpYWxvZyhcbiAgZGF0YXNldDogTWFpbkZvcm1bXSxcbiAgZmllbGRzOiBzdHJpbmdbXSxcbiAgZGlhbG9nRmllbGRzOiBzdHJpbmdbXSxcbiAgZGlhbG9nTGFiZWxGaWVsZHM6IHN0cmluZ1tdLFxuICBjZWxsU3R5bGVzOiB7W2tleTogc3RyaW5nXTogYW55fSB8IG51bGwsXG4gIHJvd1N0eWxlOiB7W2tleTogc3RyaW5nXTogYW55fSB8IG51bGwsXG4gIHBlcmNXaWR0aDogc3RyaW5nW10sXG4gIGJhY2tncm91bmRDb2xvckE/OiBzdHJpbmcsXG4gIGJhY2tncm91bmRDb2xvckI/OiBzdHJpbmcsXG4pOiBhbnlbXSB7XG4gIGNvbnN0IHJlczoge1trZXk6IHN0cmluZ106IGFueX1bXSA9IFtdO1xuICBpZiAoYmFja2dyb3VuZENvbG9yQSA9PSBudWxsKSB7XG4gICAgYmFja2dyb3VuZENvbG9yQSA9ICd3aGl0ZSc7XG4gIH1cbiAgaWYgKGJhY2tncm91bmRDb2xvckIgPT0gbnVsbCkge1xuICAgIGJhY2tncm91bmRDb2xvckIgPSAnI2RkZCc7XG4gIH1cbiAgaWYgKHJvd1N0eWxlID09IG51bGwpIHtcbiAgICByb3dTdHlsZSA9IHtcbiAgICAgICd0ZXh0LWFsaWduJzogJ3JpZ2h0JyxcbiAgICAgICdtYXJnaW4tYm90dG9tJzogMCxcbiAgICAgICdib3JkZXItY29sbGFwc2UnOiAnY29sbGFwc2UnLFxuICAgIH07XG4gIH1cbiAgaWYgKGNlbGxTdHlsZXMgPT0gbnVsbCkge1xuICAgIGNlbGxTdHlsZXMgPSB7XG4gICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxuICAgICAgY29sb3I6ICdibGFjaycsXG4gICAgfTtcbiAgfVxuICBpZiAocGVyY1dpZHRoID09IG51bGwgfHwgcGVyY1dpZHRoLmxlbmd0aCAhPT0gZmllbGRzLmxlbmd0aCkge1xuICAgIGNvbnN0IGNlbGxXaWR0aCA9IDEwMCAvIGZpZWxkcy5sZW5ndGggKyAnJSc7XG4gICAgcGVyY1dpZHRoID0gW107XG4gICAgZmllbGRzLmZvckVhY2goXyA9PiBwZXJjV2lkdGgucHVzaChjZWxsV2lkdGgpKTtcbiAgfVxuXG4gIGlmIChkYXRhc2V0KSB7XG4gICAgbGV0IGluZGV4OiBudW1iZXIgPSAwO1xuICAgIGRhdGFzZXQuZm9yRWFjaCgoZGF0YTogTWFpbkZvcm0pID0+IHtcbiAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgIGluZGV4Kys7XG4gICAgICAgIC8vIFJvdyBpcyBhbiBBamZUYWJsZVdpZGdldFxuICAgICAgICBjb25zdCByb3c6IHtba2V5OiBzdHJpbmddOiBhbnl9ID0ge1xuICAgICAgICAgIHN0eWxlczoge1xuICAgICAgICAgICAgJ3RleHQtYWxpZ24nOiAncmlnaHQnLFxuICAgICAgICAgICAgJ21hcmdpbi1ib3R0b20nOiAwLFxuICAgICAgICAgICAgJ2JvcmRlci1jb2xsYXBzZSc6ICdjb2xsYXBzZScsXG4gICAgICAgICAgICAuLi5yb3dTdHlsZSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHZpc2liaWxpdHk6IHtjb25kaXRpb246ICd0cnVlJ30sXG4gICAgICAgICAgd2lkZ2V0VHlwZTogNSxcbiAgICAgICAgICBkYXRhc2V0OiBbW11dIGFzIGFueVtdW10sXG4gICAgICAgICAgY2VsbFN0eWxlczogeydib3JkZXItdG9wJzogJzFweCBzb2xpZCBncmV5J30sXG4gICAgICAgIH07XG5cbiAgICAgICAgZmllbGRzLmZvckVhY2goKGZpZWxkOiBzdHJpbmcsIGNlbGxJZHg6IG51bWJlcikgPT4ge1xuICAgICAgICAgIGxldCBmb3JtdWxhQ2VsbCA9ICdcIlwiJztcbiAgICAgICAgICBpZiAoZGF0YVtmaWVsZF0gIT0gbnVsbCkge1xuICAgICAgICAgICAgZm9ybXVsYUNlbGwgPSAnXCInICsgZGF0YVtmaWVsZF0gKyAnXCInO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJvd1snZGF0YXNldCddWzBdLnB1c2goe1xuICAgICAgICAgICAgbGFiZWw6ICcnLFxuICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgY29sb3I6ICdibGFjaycsXG4gICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogaW5kZXggJSAyID09PSAwID8gYmFja2dyb3VuZENvbG9yQSA6IGJhY2tncm91bmRDb2xvckIsXG4gICAgICAgICAgICAgIC4uLmNlbGxTdHlsZXMsXG4gICAgICAgICAgICAgIHdpZHRoOiBwZXJjV2lkdGhbY2VsbElkeF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZm9ybXVsYToge1xuICAgICAgICAgICAgICBmb3JtdWxhOiBmb3JtdWxhQ2VsbCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb2xzcGFuOiAxLFxuICAgICAgICAgICAgcm93c3BhbjogMSxcbiAgICAgICAgICAgIGFnZ3JlZ2F0aW9uOiB7XG4gICAgICAgICAgICAgIGFnZ3JlZ2F0aW9uOiAwLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IGh0bWxEaWFsb2c6IHN0cmluZ1tdID0gW107XG4gICAgICAgIGRpYWxvZ0ZpZWxkcy5mb3JFYWNoKChmaWVsZDogc3RyaW5nLCBjZWxsSWR4OiBudW1iZXIpID0+IHtcbiAgICAgICAgICBsZXQgZmllbGRWYWx1ZSA9ICdcIlwiJztcbiAgICAgICAgICBpZiAoZGF0YVtmaWVsZF0gIT0gbnVsbCkge1xuICAgICAgICAgICAgZmllbGRWYWx1ZSA9XG4gICAgICAgICAgICAgIFwiPHAgY2xhc3M9J2RpYWxvZy1pdGVtJz48Yj5cIiArXG4gICAgICAgICAgICAgIGRpYWxvZ0xhYmVsRmllbGRzW2NlbGxJZHhdICtcbiAgICAgICAgICAgICAgJzwvYj4gPHNwYW4+JyArXG4gICAgICAgICAgICAgIGRhdGFbZmllbGRdICtcbiAgICAgICAgICAgICAgJzwvc3Bhbj48L3A+JztcbiAgICAgICAgICAgIGh0bWxEaWFsb2cucHVzaChmaWVsZFZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IGRpYWxvZ0NvbnRlbnQ6IHtba2V5OiBzdHJpbmddOiBhbnl9ID0ge1xuICAgICAgICAgIHdpZGdldFR5cGU6IDMsXG4gICAgICAgICAgc3R5bGVzOiB7XG4gICAgICAgICAgICAnbWFyZ2luJzogJzAgMWVtJyxcbiAgICAgICAgICAgICdwYWRkaW5nJzogJzVweCAxMHB4JyxcbiAgICAgICAgICAgICdtYXgtaGVpZ2h0JzogJzM2MHB4JyxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHZpc2liaWxpdHk6IHtjb25kaXRpb246ICd0cnVlJ30sXG4gICAgICAgICAgaHRtbFRleHQ6IGh0bWxEaWFsb2cuam9pbignICcpLFxuICAgICAgICB9O1xuXG4gICAgICAgIC8vIFRoaXMgaXMgYSBEaWFsb2cgV2lkZ2V0LCBhZGRlZCBhcyBjb210YWluZXIgZm9yIGVhY2ggdGFibGUgd2lkZ2V0XG4gICAgICAgIGNvbnN0IGRpYWxvZ1Jvdzoge1trZXk6IHN0cmluZ106IGFueX0gPSB7XG4gICAgICAgICAgd2lkZ2V0VHlwZTogMTMsXG4gICAgICAgICAgc3R5bGVzOiB7XG4gICAgICAgICAgICAnbWFyZ2luJzogJzAnLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgdmlzaWJpbGl0eToge2NvbmRpdGlvbjogJ3RydWUnfSxcbiAgICAgICAgICB0b2dnbGU6IHJvdyxcbiAgICAgICAgICBjb250ZW50OiBbZGlhbG9nQ29udGVudF0sXG4gICAgICAgIH07XG4gICAgICAgIHJlcy5wdXNoKGRpYWxvZ1Jvdyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cblxuLyoqXG4gKlxuICogQHBhcmFtIGZvcm1zIHRoZSBmb3JtIGRhdGFcbiAqIEBwYXJhbSBpdGVyYXRpb25zIGFsbCB2YWx1ZXMgb2YgaXRlcmF0aW9uXG4gKiBAcGFyYW0gZm4gdGhlIGZ1Y3Rpb24gb2YgZXhwcmVzc2lvbi11dGlscyB0byBhcHBseSBhdCBpdGVyYXRpb25cbiAqIEBwYXJhbSBwYXJhbTEgZmlyc3QgcGFyYW0gb2YgZm5cbiAqIEBwYXJhbSBwYXJhbTIgc2Vjb25kIHBhcmFtIG9mIGZuXG4gKiBAcmV0dXJucyB0aGUgcmVzdWx0IG9mIGZuIGFwcGxpZWQgdG8gYWxsIHZhbHVlcyBwYXJhbSBjb25kaXRpb25zXG4gKiAmY3VycmVudCBpcyBhbiBhbmNob3Iga2V5LCBUaGUgcGFyYW1zIHdpdGggJmN1cnJlbnQgd2lsbCBiZSBtb2RpZmllZCB3aXRoIHRoZSBpdGVyYXRpb24gdmFsdWVzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gUkVQRUFUKFxuICBmb3JtczogTWFpbkZvcm1bXSxcbiAgaXRlcmF0aW9uczogc3RyaW5nW10sXG4gIGZuOiBBamZWYWxpZGF0aW9uRm4sXG4gIHBhcmFtMTogc3RyaW5nLFxuICBwYXJhbTI6IHN0cmluZyA9ICd0cnVlJyxcbik6IGFueVtdIHtcbiAgY29uc3QgcmVzOiBhbnlbXSA9IFtdO1xuICBjb25zdCBuZXdFeHAxID1cbiAgICBwYXJhbTEgIT0gbnVsbCAmJiBwYXJhbTEuaW5jbHVkZXMoJ2N1cnJlbnQnKVxuICAgICAgPyAodjogYW55KSA9PiBwYXJhbTEuc3BsaXQoJ2N1cnJlbnQnKS5qb2luKEpTT04uc3RyaW5naWZ5KHYpKVxuICAgICAgOiAoKSA9PiBwYXJhbTE7XG4gIGNvbnN0IG5ld0V4cDIgPVxuICAgIHBhcmFtMiAhPSBudWxsICYmIHBhcmFtMi5pbmNsdWRlcygnY3VycmVudCcpXG4gICAgICA/ICh2OiBhbnkpID0+IHBhcmFtMi5zcGxpdCgnY3VycmVudCcpLmpvaW4oSlNPTi5zdHJpbmdpZnkodikpXG4gICAgICA6ICgpID0+IHBhcmFtMjtcbiAgaXRlcmF0aW9ucy5mb3JFYWNoKHYgPT4ge1xuICAgIGNvbnN0IHZ2ID0gKGZuIGFzIGFueSkoZm9ybXMsIG5ld0V4cDEodiksIG5ld0V4cDIodikpO1xuICAgIHJlcy5wdXNoKHZ2KTtcbiAgfSk7XG4gIHJldHVybiByZXM7XG59XG5mdW5jdGlvbiBidWlsZEZuKGV4cHJlc3Npb246IHN0cmluZyk6IGFueSB7XG4gIHJldHVybiAodjogYW55KSA9PiB7XG4gICAgY29uc3QgbmV3RXhwID0gZXhwcmVzc2lvblxuICAgICAgLnNwbGl0KCdhamZfZm9ybScpXG4gICAgICAuam9pbihgJHtKU09OLnN0cmluZ2lmeSh2KX1gKVxuICAgICAgLnNwbGl0KCdjdXJyZW50JylcbiAgICAgIC5qb2luKGAke0pTT04uc3RyaW5naWZ5KHYpfWApO1xuICAgIHJldHVybiBuZXdFeHA7XG4gIH07XG59XG5cbi8qKlxuICogdGhpcyBmdW5jdGlvbiBhbGxvdyB0byBkZWZpbmUgYSBuZXcgYXR0cmlidXRlIG9mIG1haW5mb3JtLlxuICogdGhlIGF0dHJpYnV0ZSBmaWVsZCB3aWxsIGJlIGFkZGVkIG9uIGV2ZXJ5IGZvcm0gYW5kIGl0IHRha2VzIHRoZSByZXN1bHQgb2YgZXhwcmVzc2lvbiBjYWxjdWxhdGVkXG4gKiBmb3IgZXZlcnkgbWFpbmZvcm1cbiAqXG4gKiBAZXhwb3J0XG4gKiBAcGFyYW0ge01haW5Gb3JtW119IGZvcm1MaXN0XG4gKiBAcGFyYW0ge3N0cmluZ30gZmllbGRcbiAqIEBwYXJhbSB7c3RyaW5nfSBleHByZXNzaW9uXG4gKiBAcmV0dXJuIHsqfSAge01haW5Gb3JtW119XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBBUFBMWShmb3JtTGlzdDogTWFpbkZvcm1bXSwgZmllbGQ6IHN0cmluZywgZXhwcmVzc2lvbjogc3RyaW5nKTogTWFpbkZvcm1bXSB7XG4gIGNvbnN0IGV4cEZuID0gYnVpbGRGbihleHByZXNzaW9uKTtcbiAgZm9ybUxpc3QgPSBjbG9uZU1haW5Gb3Jtcyhmb3JtTGlzdCk7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBmb3JtTGlzdC5sZW5ndGg7IGkrKykge1xuICAgIGlmIChmb3JtTGlzdFtpXSA9PSBudWxsKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgaWYgKGZvcm1MaXN0W2ldLnJlcHMgIT0gbnVsbCkge1xuICAgICAgZm9ybUxpc3RbaV1bZmllbGRdID0gZXZhbHVhdGVFeHByZXNzaW9uKGV4cEZuKGZvcm1MaXN0W2ldKSwgZm9ybUxpc3RbaV0pO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZm9ybUxpc3Q7XG59XG5cbi8qKlxuICogdGhpcyBmdW5jdGlvbiByb3VuZCBhIG51bWJlcixcbiAqIGlmIHlvdSBuZWVkIGNhbiBiZSBkZWZpbmUgZGUgZGlnaXRzIG9mIHJvdW5kXG4gKlxuICogQGV4cG9ydFxuICogQHBhcmFtIHsobnVtYmVyIHwgc3RyaW5nKX0gbnVtXG4gKiBAcGFyYW0ge251bWJlcn0gW2RpZ2l0c11cbiAqIEByZXR1cm4geyp9ICB7bnVtYmVyfVxuICovXG5leHBvcnQgZnVuY3Rpb24gUk9VTkQobnVtOiBudW1iZXIgfCBzdHJpbmcsIGRpZ2l0cz86IG51bWJlcik6IG51bWJlciB7XG4gIHJldHVybiByb3VuZChudW0sIGRpZ2l0cyk7XG59XG5cbi8qKlxuICogdGhpcyBmdW5jdGlvbiBldmFsdWVhdGUgYSBjb25kaXRpb24gaWYgdHJ1ZSByZXR1cm4gYnJhbmNoMSBlbHNlIGJyYW5jaDJcbiAqXG4gKiBAZXhwb3J0XG4gKiBAcGFyYW0ge3N0cmluZ30gY29uZGl0aW9uXG4gKiBAcGFyYW0geyp9IGJyYW5jaDFcbiAqIEBwYXJhbSB7Kn0gYnJhbmNoMlxuICogQHJldHVybiB7Kn0gIHsqfVxuICovXG5leHBvcnQgZnVuY3Rpb24gRVZBTFVBVEUoY29uZGl0aW9uOiBzdHJpbmcsIGJyYW5jaDE6IGFueSwgYnJhbmNoMjogYW55KTogYW55IHtcbiAgaWYgKGV2YWx1YXRlRXhwcmVzc2lvbihjb25kaXRpb24pKSB7XG4gICAgcmV0dXJuIGJyYW5jaDE7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGJyYW5jaDI7XG4gIH1cbn1cbi8qKlxuICogVGhpcyBmdW5jdGlvbiBidWlsZHMgYSBkYXRhIHN0cnVjdHVyZSB0aGF0IGFsbG93cyB0aGUgdXNlIG9mIHRoZSBoaW5kaWtpdCBmb3JtdWxhc1xuICogZm9yIGV2ZXJ5IGZvcm1zIHdpdGggcmVwZWF0aW5nIHNsaWRlcy5cbiAqIEluIHBhcnRpY3VsYXIsIGl0IGJ1aWxkcyBhIG1haW4gZGF0YSBmb3JtIHdpdGggYWxsIHRoZSBkYXRhIHJlbGF0aW5nIHRvIHRoZSBzbGlkZXMgYW5kXG4gKiBhIGRpY3Rpb25hcnkgd2l0aCB0aGUgbmFtZSByZXBzIHRodXMgbWFkZSBpbnN0YW5jZSBzbGlkZU5hbWUgZm9ybXMuXG4gKiBXaGVyZSBhIGZvcm0gaXMgYXNzb2NpYXRlZCB3aXRoIGVhY2ggaW5zdGFuY2Ugb2YgdGhlIHJlcGVhdGluZyBzbGlkZS5cbiAqIGV4YW1wbGU6XG4gKiBzaW1wbGUgZm9ybTpcbiAqICB7XG4gKiAgICAkdmFsdWU6IFwiQUdPXCJcbiAqICAgIGNpdHRhZGluYW56YV9fMDogXCJBR09cIlxuICogICAgY29kaWNlX2Zpc2NhbGVfXzA6IFwiamRmbGpnbMOya8Oya8OyXCJcbiAqICAgIGNvdW50cnlfXzA6IFwiQUdPXCJcbiAqICAgIGRhdGVfZW5kOiBcIjIwMjEtMDEtMTBcIlxuICogICAgZGF0ZV9zdGFydDogXCIyMDIxLTAxLTEwXCJcbiAqICAgIGRvYl9fMDogXCIyMDIxLTAzLTExXCJcbiAqICAgIGZpcnN0X25hbWVfXzA6IFwicGlwcG9cIlxuICogICAgZ2VuZGVyX18wOiBcImZcIlxuICogICAgaWRfZmFtaWx5OiBcIjNiZWYzYTNmLWQ5NWQtNGEwOS04ZGY0LWU4MTJjNTVjNjFjNlwiXG4gKiAgICBpc3RydXppb25lX18wOiBudWxsXG4gKiAgICBsYXN0X25hbWVfXzA6IFwicGlwcG9cIlxuICogICAgcGVybWVzc29fc29nZ2lvcm5vX18wOiBcIm5vXCJcbiAqICAgIHJlbGF6aW9uZV9fMDogXCJnZW5pdG9yZVwiXG4gKiAgICBzb2xpZGFuZG86IFwic29saWRhbmRvMVwiXG4gKiAgICBzdGF0b19jaXZpbGVfXzA6IG51bGxcbiAqICB9XG4gKiBhZnRlciBCVUlMRF9EQVRBU0VUXG4gKiBNYWluRm9ybTpcbiAqIHtcbiAqICAgICR2YWx1ZTogXCJBR09cIlxuICogICAgYWpmX2Zvcm1faWQ6IDAgKiogYWRkZWQgYXRyaWJ1dGUgdGhhdCByYXBwcmVzZW50IHRoZSBpbmRleCBwb3NpdGlvbiBpbnNpZGVzIGlucHV0IGZvcm0gbGlzdC5cbiAqICAgIGFqZl9mYW1pbHlfY29tcG9uZW50X2NvdW50OiAxKiogYWRkZWQgYXRyaWJ1dGUgdGhhdCByYXBwcmVzZW50IHRoZSBpbnN0YW5jZSBudW1iZXIgb2YgZmFtaWxpX2NvbXBvbmVudCByZXBlYXRpbmcgc2xpZGVzLlxuICogICAgZGF0ZV9lbmQ6IFwiMjAyMS0wMS0xMFwiXG4gKiAgICBkYXRlX3N0YXJ0OiBcIjIwMjEtMDEtMTBcIlxuICogICAgaWRfZmFtaWx5OiBcIjNiZWYzYTNmLWQ5NWQtNGEwOS04ZGY0LWU4MTJjNTVjNjFjNlwiXG4gKiAgICByZXBzOiB7XG4gKiAgICAgIGZhbWlseV9jb21wb25lbnQ6IFtcbiAqICAgICAgICB7XG4gKiAgICAgICAgICBhamZfZmFtaWx5X2NvbXBvbmVudF9yZXA6IDAgKiogYWRkZWQgYXRyaWJ1dGUgdGhhdCByYXBwcmVzZW50IHRoZSBvcmRlciBpbnN0YW5jZSBvZiBmYW1pbHlfY29tcG9uZW50IHJlcGVhdGluZyBzbGlkZS5cbiAqICAgICAgICAgIGNpdHRhZGluYW56YTogXCJBR09cIlxuICogICAgICAgICAgY29kaWNlX2Zpc2NhbGU6IFwiamRmbGpnbMOya8Oya8OyXCJcbiAqICAgICAgICAgIGNvdW50cnk6IFwiQUdPXCJcbiAqICAgICAgICAgIGRvYjogXCIyMDIxLTAzLTExXCJcbiAqICAgICAgICAgIGZpcnN0X25hbWU6IFwicGlwcG9cIlxuICogICAgICAgICAgZ2VuZGVyOiBcImZcIlxuICogICAgICAgICAgaXN0cnV6aW9uZTogbnVsbFxuICogICAgICAgICAgbGFzdF9uYW1lOiBcInBpcHBvXCJcbiAqICAgICAgICAgIHBlcm1lc3NvX3NvZ2dpb3JubzogXCJub1wiXG4gKiAgICAgICAgICByZWxhemlvbmU6IFwiZ2VuaXRvcmVcIlxuICogICAgICAgICAgc3RhdG9fY2l2aWxlOiBudWxsXG4gKiAgICAgICAgfVxuICogICAgICBdXG4gKiAgICB9XG4gKiB9XG4gKlxuICogQHBhcmFtIHtGb3JtW119IGZvcm1zXG4gKiBAcGFyYW0geyp9IFtzY2hlbWFdIGlmIHNjaGVtYSBpcyBwcm92aWRlZCB0aGUgaW5zdGFuY2VzIGluc2lkZSB0aGUgcmVwcyBtYXRjaCB3aXRoIGVmZmVjdGl2ZVxuICogc2xpZGUgbmFtZS4gT3RoZXJ3aXNlIGFsbCByZXBlYXRpbmcgc2xpZGVzIGFyZSBhc3NvY2lhdGVzIHRvIGdlbmVyaWMgc2xpZGUgbmFtZSBcInJlcFwiLlxuICogQHJldHVybiB7Kn0gIHtNYWluRm9ybVtdfVxuICovXG5leHBvcnQgZnVuY3Rpb24gQlVJTERfREFUQVNFVChmb3JtczogRm9ybVtdLCBzY2hlbWE/OiBhbnkpOiBNYWluRm9ybVtdIHtcbiAgY29uc3QgcmVzOiBNYWluRm9ybVtdID0gW107XG4gIGNvbnN0IGdlbmVyYXRlTWV0YWRhdGEgPSAoc2xpZGVOYW1lOiBzdHJpbmcsIHNsaWRlSW5zdGFuY2U6IG51bWJlcikgPT4ge1xuICAgIGNvbnN0IHJlc2c6IHtbc25hbWU6IHN0cmluZ106IGFueX0gPSB7fTtcbiAgICByZXNnW2BhamZfJHtzbGlkZU5hbWV9X3JlcGBdID0gc2xpZGVJbnN0YW5jZTtcbiAgICByZXR1cm4gcmVzZztcbiAgfTtcblxuICBmb3JtcyA9IChmb3JtcyB8fCBbXSkuc2xpY2UoMCk7XG5cbiAgaWYgKHNjaGVtYSAhPSBudWxsKSB7XG4gICAgY29uc3QgcmVwZWF0aW5nU2xpZGVzOiBhbnlbXSA9IHNjaGVtYS5ub2Rlcy5maWx0ZXIoKG5vZGU6IGFueSkgPT4gbm9kZS5ub2RlVHlwZSA9PT0gNCk7XG4gICAgY29uc3Qgb2JqOiB7W2ZpZWxkTmFtZTogc3RyaW5nXTogc3RyaW5nfSA9IHt9O1xuICAgIHJlcGVhdGluZ1NsaWRlcy5mb3JFYWNoKHNsaWRlID0+IHtcbiAgICAgIGxldCBub2RlRmllbGRzID0gc2xpZGUubm9kZXMubWFwKChuOiBhbnkpID0+IG4ubmFtZSk7XG4gICAgICBub2RlRmllbGRzLmZvckVhY2goKG5vZGVGaWVsZDogc3RyaW5nKSA9PiB7XG4gICAgICAgIG9ialtub2RlRmllbGRdID0gc2xpZGUubmFtZTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZm9ybXMuZm9yRWFjaCgoZiwgZm9ybUlkeCkgPT4ge1xuICAgICAgY29uc3QgbWFpbkZvcm06IE1haW5Gb3JtID0ge3JlcHM6IHt9fTtcbiAgICAgIGNvbnN0IGZLZXlzOiBzdHJpbmdbXSA9IE9iamVjdC5rZXlzKGYpO1xuICAgICAgY29uc3QgaW5zdGFuY2VzOiB7W3NsaWRlTmFtZTogc3RyaW5nXTogYW55fSA9IHt9O1xuXG4gICAgICBmS2V5cy5mb3JFYWNoKGZrZXkgPT4ge1xuICAgICAgICBjb25zdCBzcGxpdHRlZEtleTogc3RyaW5nW10gPSBma2V5LnNwbGl0KCdfXycpO1xuICAgICAgICBjb25zdCBzcGxpdHRlZExlbmd0aDogbnVtYmVyID0gc3BsaXR0ZWRLZXkubGVuZ3RoO1xuICAgICAgICBjb25zdCBmaWVsZE5hbWUgPSBzcGxpdHRlZEtleVswXTtcbiAgICAgICAgY29uc3Qgc2xpZGVJbnN0YW5jZSA9XG4gICAgICAgICAgc3BsaXR0ZWRLZXlbMV0gIT0gbnVsbCAmJiBOdW1iZXIuaXNJbnRlZ2VyKCtzcGxpdHRlZEtleVsxXSkgPyArc3BsaXR0ZWRLZXlbMV0gOiBudWxsO1xuICAgICAgICBjb25zdCBzbGlkZU5hbWUgPSBvYmpbZmllbGROYW1lXTtcbiAgICAgICAgaWYgKHNwbGl0dGVkTGVuZ3RoID09PSAyICYmIHNsaWRlSW5zdGFuY2UgIT0gbnVsbCAmJiBzbGlkZU5hbWUgIT0gbnVsbCkge1xuICAgICAgICAgIGluc3RhbmNlc1tzbGlkZU5hbWVdID0gaW5zdGFuY2VzW3NsaWRlTmFtZV0gIT0gbnVsbCA/IGluc3RhbmNlc1tzbGlkZU5hbWVdIDogW107XG4gICAgICAgICAgaW5zdGFuY2VzW3NsaWRlTmFtZV1bc2xpZGVJbnN0YW5jZV0gPVxuICAgICAgICAgICAgaW5zdGFuY2VzW3NsaWRlTmFtZV1bc2xpZGVJbnN0YW5jZV0gIT0gbnVsbFxuICAgICAgICAgICAgICA/IGluc3RhbmNlc1tzbGlkZU5hbWVdW3NsaWRlSW5zdGFuY2VdXG4gICAgICAgICAgICAgIDogZ2VuZXJhdGVNZXRhZGF0YShzbGlkZU5hbWUsIHNsaWRlSW5zdGFuY2UpO1xuICAgICAgICAgIGluc3RhbmNlc1tzbGlkZU5hbWVdW3NsaWRlSW5zdGFuY2VdW2ZpZWxkTmFtZV0gPSBmW2ZrZXldO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG1haW5Gb3JtW2ZrZXldID0gZltma2V5XTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBtYWluRm9ybVtgYWpmX2Zvcm1faWRgXSA9IGZvcm1JZHg7XG4gICAgICBjb25zdCBpbnN0YW5jZUtleXMgPSBPYmplY3Qua2V5cyhpbnN0YW5jZXMpO1xuICAgICAgaW5zdGFuY2VLZXlzLmZvckVhY2goaW5zdGFuY2VLZXkgPT4ge1xuICAgICAgICBtYWluRm9ybVtgYWpmXyR7aW5zdGFuY2VLZXl9X2NvdW50YF0gPSBpbnN0YW5jZXNbaW5zdGFuY2VLZXldLmxlbmd0aDtcbiAgICAgIH0pO1xuICAgICAgbWFpbkZvcm0ucmVwcyA9IGluc3RhbmNlcztcbiAgICAgIHJlcy5wdXNoKG1haW5Gb3JtKTtcbiAgICB9KTtcbiAgICByZXR1cm4gcmVzO1xuICB9IGVsc2Uge1xuICAgIGZvcm1zLmZvckVhY2goZm9ybSA9PiB7XG4gICAgICBjb25zdCBmS2V5czogc3RyaW5nW10gPSBPYmplY3Qua2V5cyhmb3JtKTtcbiAgICAgIGNvbnN0IG5vUmVwZWF0aW5nRmllbGRzOiBzdHJpbmdbXSA9IGZLZXlzLmZpbHRlcihma2V5ID0+IHtcbiAgICAgICAgY29uc3Qgc3BsaXR0ZWRLZXk6IHN0cmluZ1tdID0gZmtleS5zcGxpdCgnX18nKTtcbiAgICAgICAgaWYgKHNwbGl0dGVkS2V5Lmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0pO1xuICAgICAgY29uc3Qgbm9SZXBGb3JtOiBGb3JtID0ge307XG5cbiAgICAgIG5vUmVwZWF0aW5nRmllbGRzLmZvckVhY2goZmllbGQgPT4ge1xuICAgICAgICBub1JlcEZvcm1bZmllbGRdID0gZm9ybVtmaWVsZF07XG4gICAgICB9KTtcblxuICAgICAgY29uc3QgbWFpbkZvcm06IE1haW5Gb3JtID0gey4uLm5vUmVwRm9ybSwgcmVwczoge3NsaWRlOiBbXX19O1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8PSBNQVhfUkVQUzsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRTbGlkZTogRm9ybSA9IHt9O1xuICAgICAgICBjb25zdCBvbmx5Q3VycmVudEluc3RhbmNlS2V5czogc3RyaW5nW10gPSBmS2V5cy5maWx0ZXIoZmtleSA9PiB7XG4gICAgICAgICAgY29uc3Qgc3BsaXR0ZWRLZXk6IHN0cmluZ1tdID0gZmtleS5zcGxpdCgnX18nKTtcbiAgICAgICAgICBpZiAoc3BsaXR0ZWRLZXkubGVuZ3RoID09PSAyKSB7XG4gICAgICAgICAgICByZXR1cm4gZmtleS5pbmRleE9mKGBfXyR7aX1gKSA+IC0xO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBzZSBpbCBudW1lcm8gZGkgYXR0cmlidXRpIGNvaW5jaWRlIGlsIGZvcm0gZGF0YSBub24gaGEgcmVwZWF0aW5nc2xpZGVzXG4gICAgICAgIGlmIChvbmx5Q3VycmVudEluc3RhbmNlS2V5cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICBtYWluRm9ybVsnYWpmX3JlcF9jb3VudCddID0gaTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBvbmx5Q3VycmVudEluc3RhbmNlS2V5cy5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgY29uc3Qgc3BsaXR0ZWRLZXkgPSBrZXkuc3BsaXQoJ19fJyk7XG4gICAgICAgICAgY29uc3QgZmllbGROYW1lID0gc3BsaXR0ZWRLZXlbMF07XG4gICAgICAgICAgY29uc3Qgc2xpZGVJbnN0YW5jZSA9IHNwbGl0dGVkS2V5WzFdICE9IG51bGwgPyArc3BsaXR0ZWRLZXlbMV0gOiBudWxsO1xuICAgICAgICAgIGN1cnJlbnRTbGlkZVtmaWVsZE5hbWVdID0gZm9ybVtrZXldO1xuICAgICAgICAgIGN1cnJlbnRTbGlkZVsnYWpmX3JlcCddID0gc2xpZGVJbnN0YW5jZSAhPSBudWxsID8gc2xpZGVJbnN0YW5jZSA6IGN1cnJlbnRTbGlkZVsnYWpmX3JlcCddO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKG9ubHlDdXJyZW50SW5zdGFuY2VLZXlzLmxlbmd0aCAhPSAwKSB7XG4gICAgICAgICAgbWFpbkZvcm0ucmVwcyFbJ3NsaWRlJ10ucHVzaChjdXJyZW50U2xpZGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG1haW5Gb3JtLnJlcHMgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJlcy5wdXNoKG1haW5Gb3JtKTtcbiAgICB9KTtcblxuICAgIHJldHVybiByZXM7XG4gIH1cbn1cblxuLyoqXG4gKiBVVElMSVRZIEZVTkNJT05cbiAqIFRoaXMgZnVuY3Rpb24gdGFrZSBhbiBhamYgc2NoZW1hIGFzIGlucHV0IGFuZCBleHRyYWN0IGFcbiAqIGRpY3QgdGhhdCBtYXRjaCBlYWNoIGNob2ljZSB2YWx1ZSAoYWxzbyB3aXRoIGNob2ljZXNPcmlnaW4gbmFtZSBwcmVmaXgpIHdpdGggaXRzIGxhYmVsXG4gKiBAcGFyYW0gc2NoZW1hIHRoZSBhamYgc2NoZW1hXG4gKiBAcmV0dXJucyBBIGRpY3Qgd2l0aDpcbiAqICB7W2Nob2ljZXNPcmlnaW5OYW1lX2Nob2ljZVZhbHVlOiBzdHJpbmddOiBbY2hvaWNlTGFiZWw6IHN0cmluZ119XG4gKiAge1tjaG9pY2VWYWx1ZTogc3RyaW5nXTogW2Nob2ljZUxhYmVsOiBzdHJpbmddfVxuICovXG5mdW5jdGlvbiBleHRyYWN0TGFiZWxzQnlTY2hlbWFDaG9pY2VzKHNjaGVtYTogYW55KToge1tjaG9pY2VWYWx1ZTogc3RyaW5nXTogc3RyaW5nfSB7XG4gIGNvbnN0IGNob2ljZUxhYmVsczoge1tjaG9pY2VWYWx1ZTogc3RyaW5nXTogc3RyaW5nfSA9IHt9O1xuICBpZiAoc2NoZW1hICYmIHNjaGVtYS5jaG9pY2VzT3JpZ2lucyAhPSBudWxsKSB7XG4gICAgKHNjaGVtYS5jaG9pY2VzT3JpZ2lucyBhcyBhbnlbXSkuZm9yRWFjaChjaG9pY2VzT3JpZ2luID0+IHtcbiAgICAgIGlmIChjaG9pY2VzT3JpZ2luICE9IG51bGwgJiYgY2hvaWNlc09yaWdpbi5jaG9pY2VzICE9IG51bGwpIHtcbiAgICAgICAgKGNob2ljZXNPcmlnaW4uY2hvaWNlcyBhcyBhbnlbXSkuZm9yRWFjaChjaG9pY2UgPT4ge1xuICAgICAgICAgIGNob2ljZUxhYmVsc1tjaG9pY2VzT3JpZ2luLm5hbWUgKyAnXycgKyBjaG9pY2UudmFsdWVdID0gY2hvaWNlLmxhYmVsO1xuICAgICAgICAgIGNob2ljZUxhYmVsc1tjaG9pY2UudmFsdWVdID0gY2hvaWNlLmxhYmVsO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICByZXR1cm4gY2hvaWNlTGFiZWxzO1xufVxuXG4vKipcbiAqIFVUSUxJVFkgRlVOQ0lPTlxuICogVGhpcyBmdW5jdGlvbiB0YWtlIGFuIGFqZiBzY2hlbWEgYXMgaW5wdXQgYW5kIGV4dHJhY3QgYSBvbmVcbiAqIGRpbWVuc2lvbmFsIGFycmF5IG9mIEFqZk5vZGUgZm9yIGVhY2ggc2xpZGUncyBmaWVsZFxuICpcbiAqIEBwYXJhbSBzY2hlbWEgdGhlIGFqZiBzY2hlbWFcbiAqIEByZXR1cm5zIEFuIG9iamVjdCB3aXRoIGFsbCBmaWVsZHM6XG4gKiAge1tmaWVsZE5hbWU6IHN0cmluZ106IGFqZiBmaWVsZH1cbiAqL1xuZnVuY3Rpb24gZXh0cmFjdEZsYXR0ZW5Ob2RlcyhzY2hlbWE6IGFueSk6IHtbZmllbGQ6IHN0cmluZ106IGFueX0ge1xuICBjb25zdCBmaWVsZE5vZGVzOiB7W2ZpZWxkOiBzdHJpbmddOiBhbnl9ID0ge307XG4gIGlmIChzY2hlbWEgJiYgc2NoZW1hLm5vZGVzKSB7XG4gICAgY29uc3Qgc2xpZGVzOiBhbnlbXSA9IHNjaGVtYS5ub2Rlcy5maWx0ZXIoXG4gICAgICAobm9kZTogYW55KSA9PiBub2RlLm5vZGVUeXBlID09PSAzIHx8IG5vZGUubm9kZVR5cGUgPT09IDQsXG4gICAgKTtcbiAgICBzbGlkZXMuZm9yRWFjaChzbGlkZSA9PiB7XG4gICAgICBzbGlkZS5ub2Rlc1xuICAgICAgICAuZmlsdGVyKChub2RlOiBhbnkpID0+IG5vZGUubm9kZVR5cGUgPT09IDApXG4gICAgICAgIC5mb3JFYWNoKChmaWVsZE5vZGU6IGFueSkgPT4ge1xuICAgICAgICAgIGZpZWxkTm9kZXNbZmllbGROb2RlLm5hbWVdID0gZmllbGROb2RlO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfVxuICByZXR1cm4gZmllbGROb2Rlcztcbn1cblxuLyoqXG4gKiBUaGlzIGZ1bmN0aW9uIHRha2UgYSBsaXN0IG9mIGZvcm1zLCBhbiBhamYgc2NoZW1hIGFuZCBhIGxpc3Qgb2YgZmllbGQgbmFtZXMgYXMgaW5wdXQgYW5kIGJ1aWxkc1xuICogYSBkYXRhIHN0cnVjdHVyZSB0aGF0IHJlcGxhY2UgYSBsaXN0IG9mIGxhYmVsIG1hdGNoZWQgaW5zaWRlIGEgc2NoZW1hIGNob2ljaGUgb3JpZ2lucy5cbiAqXG4gKiBAcGFyYW0ge01haW5Gb3JtW119IGZvcm1MaXN0XG4gKiBAcGFyYW0geyp9IHNjaGVtYSB0aGUgYWpmIHNjaGVtYVxuICogQHBhcmFtIHtzdHJpbmdbXX0gZmllbGROYW1lc1xuICogQHJldHVybiB7Kn0gIHtNYWluRm9ybVtdfVxuICovXG5leHBvcnQgZnVuY3Rpb24gQVBQTFlfTEFCRUxTKGZvcm1MaXN0OiBNYWluRm9ybVtdLCBzY2hlbWE6IGFueSwgZmllbGROYW1lczogc3RyaW5nW10pOiBNYWluRm9ybVtdIHtcbiAgZm9ybUxpc3QgPSBjbG9uZU1haW5Gb3Jtcyhmb3JtTGlzdCk7XG4gIGNvbnN0IGNob2ljZUxhYmVsczoge1tmaWVsZE5hbWU6IHN0cmluZ106IHN0cmluZ30gPSBleHRyYWN0TGFiZWxzQnlTY2hlbWFDaG9pY2VzKHNjaGVtYSk7XG4gIGNvbnN0IGZsYXR0ZW5Ob2RlcyA9IGV4dHJhY3RGbGF0dGVuTm9kZXMoc2NoZW1hKTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGZvcm1MaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGZvcm1MaXN0W2ldID09IG51bGwpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBpZiAoZm9ybUxpc3RbaV0ucmVwcyAhPSBudWxsKSB7XG4gICAgICBjb25zdCBmID0gZm9ybUxpc3RbaV07XG4gICAgICBjb25zdCBmS2V5czogc3RyaW5nW10gPSBPYmplY3Qua2V5cyhmKTtcbiAgICAgIGZLZXlzLmZvckVhY2goZmtleSA9PiB7XG4gICAgICAgIGNvbnN0IGZpZWxkTm9kZSA9IGZsYXR0ZW5Ob2Rlc1tma2V5XTtcbiAgICAgICAgY29uc3QgY2hvaWNlT3JpZ2luTmFtZVByZWZpeCA9XG4gICAgICAgICAgZmllbGROb2RlICYmIGZpZWxkTm9kZS5jaG9pY2VzT3JpZ2luUmVmID8gZmllbGROb2RlLmNob2ljZXNPcmlnaW5SZWYgKyAnXycgOiAnJztcblxuICAgICAgICBpZiAoZmllbGROYW1lcy5pbmNsdWRlcyhma2V5KSAmJiBmW2ZrZXldICE9PSBudWxsKSB7XG4gICAgICAgICAgbGV0IGNob2ljZVZhbHVlOiBzdHJpbmdbXSA9IFtdO1xuICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGZbZmtleV0pKSB7XG4gICAgICAgICAgICBjaG9pY2VWYWx1ZSA9IGZbZmtleV0gYXMgdW5rbm93biBhcyBzdHJpbmdbXTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgbXVsdGlwbGVWYWxzID0gKGZbZmtleV0gYXMgc3RyaW5nKS5zcGxpdCgnLCcpLm1hcCh2ID0+IHYudHJpbSgpKTtcbiAgICAgICAgICAgIGlmIChtdWx0aXBsZVZhbHMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICBjaG9pY2VWYWx1ZSA9IG11bHRpcGxlVmFscztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGNob2ljZVZhbHVlID0gW2ZbZmtleV0gYXMgc3RyaW5nXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGNob2ljZVZhbHVlICE9IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnN0IGxhYmVscyA9IGNob2ljZVZhbHVlLm1hcCh2YWwgPT4ge1xuICAgICAgICAgICAgICBjb25zdCB2YWxXaXRoUHJlZml4ID0gY2hvaWNlT3JpZ2luTmFtZVByZWZpeCArIHZhbDtcbiAgICAgICAgICAgICAgcmV0dXJuIGNob2ljZUxhYmVsc1t2YWxXaXRoUHJlZml4XSAhPSBudWxsXG4gICAgICAgICAgICAgICAgPyBjaG9pY2VMYWJlbHNbdmFsV2l0aFByZWZpeF1cbiAgICAgICAgICAgICAgICA6IGNob2ljZUxhYmVsc1t2YWxdICE9IG51bGxcbiAgICAgICAgICAgICAgICA/IGNob2ljZUxhYmVsc1t2YWxdXG4gICAgICAgICAgICAgICAgOiB2YWw7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChsYWJlbHMgJiYgbGFiZWxzLmxlbmd0aCkge1xuICAgICAgICAgICAgICBjb25zdCBsYWJlbEZpZWxkTmFtZSA9IGZrZXkgKyAnX2Nob2ljZXNMYWJlbCc7XG4gICAgICAgICAgICAgIGZvcm1MaXN0W2ldW2xhYmVsRmllbGROYW1lXSA9IGxhYmVscy5sZW5ndGggPiAxID8gbGFiZWxzLmpvaW4oJywgJykgOiBsYWJlbHNbMF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZvcm1MaXN0O1xufVxuXG4vKipcbiAqXG4gKiBAcGFyYW0ge01haW5Gb3JtW119IGZvcm1MaXN0IGEgc2V0IG9mIG1haW4gZm9ybXNcbiAqIEBwYXJhbSB7c3RyaW5nfSBleHByZXNzaW9uIHRvIGJlIGV2YWx1YXRlZCwgYWxzbyB3aXRoIHJlcG9ydCB2YXJpYWJsZXMgdmFsdWVzLlxuICogQHJldHVybiB7Kn0gIHtNYWluRm9ybVtdfVxuICovXG5leHBvcnQgZnVuY3Rpb24gRklMVEVSX0JZX1ZBUlMoZm9ybUxpc3Q6IE1haW5Gb3JtW10sIGV4cHJlc3Npb246IHN0cmluZyk6IE1haW5Gb3JtW10ge1xuICByZXR1cm4gRklMVEVSX0JZKGZvcm1MaXN0LCBleHByZXNzaW9uKTtcbn1cblxuLyoqXG4gKiBUaGlzIGZ1bmN0aW9uIGJ1aWxkIGEgcGFydGl0aW9uIG9mIGZvcm1MaXN0IGJ5IGV4ZWN1dGlvbiBvZiBleHByZXNzaW9uLlxuICogRm9yIGV2ZXJ5IG1haW5Gb3JtIHRoZSBleHByZXNzaW9uIG1hdGNoIG1haW5mb3JtIGZpZWxkIGFuZCByZXBsYWNlIGl0LlxuICogSWYgdGhlIGV2YWx1YXRpb24gb2YgZXhwcmVzc2lvbiBpcyB0cnVlIHRoZSBtYWluRm9ybSB3YXMgYWRkZWQgdG8gcGFydGl0aW9uXG4gKiAodGhhdCBiZWNvdXNlIHRoZSBleHByZXNzaW9uIGRvbid0IGhhcyByZXBlYXRpbmcgc2xpZGUgZmllbGRzKSBlbHNlIGlmXG4gKiB0aGVyZSBhcmUgcmVwcyBmb3IgZXZlcnkgcmVwIHRoZSBleHByZXNzaW9uIGlzIHVwZGF0ZWQgd2l0aCByZXBsYWNpbmcgb2ZcbiAqIHJlcGVhdGluZyBzbGlkZSBpbnN0YW5jZSBmaWVsZHMgYW5kIGV2YWx1YXRlZCwgaWYgdHJ1ZSB3YXMgYWRkZWQgdG8gcGFydGl0aW9uLlxuICogQWxsIGFqZiBhdHRyaWJ1dGVzIHdhZCB1cGRhdGVkLiAvVE9ET1xuICpcbiAqXG4gKiBAcGFyYW0ge01haW5Gb3JtW119IGZvcm1MaXN0IGEgc2V0IG9mIG1haW4gZm9ybXNcbiAqIEBwYXJhbSB7c3RyaW5nfSBleHByZXNzaW9uIHRvIGJlIGV2YWx1YXRlZC4gdGhhdCBjYW4gYmUgYWJsZSB0byBjb250YWlucyBhbm90aGVyXG4gKiBoaW5kaWtpdCBmdW5jdGlvbnMgb3IgbWFpbkZvcm0gZmllbGRzIG9yIHJlcHMgZmllbGRzLlxuICogQHJldHVybiB7Kn0gIHtNYWluRm9ybVtdfVxuICovXG5leHBvcnQgZnVuY3Rpb24gRklMVEVSX0JZKGZvcm1MaXN0OiBNYWluRm9ybVtdLCBleHByZXNzaW9uOiBzdHJpbmcpOiBNYWluRm9ybVtdIHtcbiAgY29uc3QgZm9ybXM6IE1haW5Gb3JtW10gPSBjbG9uZU1haW5Gb3Jtcyhmb3JtTGlzdCB8fCBbXSkuZmlsdGVyKChmOiBNYWluRm9ybSkgPT4gZiAhPSBudWxsKTtcbiAgY29uc3QgaWRlbnRpZmllcnMgPSBbLi4ubmV3IFNldChnZXRDb2RlSWRlbnRpZmllcnMoZXhwcmVzc2lvbiwgdHJ1ZSkpXTtcbiAgbGV0IHJlczogTWFpbkZvcm1bXSA9IFtdO1xuICBpZiAoZXhwcmVzc2lvbiA9PT0gJ3RydWUnKSB7XG4gICAgcmV0dXJuIGZvcm1zO1xuICB9XG4gIGlmIChmb3Jtcy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gW107XG4gIH1cblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGZvcm1zLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgbWFpbkZvcm06IE1haW5Gb3JtID0gZm9ybXNbaV07XG4gICAgbGV0IGV4cHIgPSBleHByZXNzaW9uO1xuICAgIGlmIChtYWluRm9ybSA9PSBudWxsKSB7XG4gICAgICByZXMucHVzaChtYWluRm9ybSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgLyogcmVwbGFjZSBtYWluIGZvcm0gZmllbGQgaW5zaWRlIGV4cHJlc3Npb24gKi9cbiAgICBpZGVudGlmaWVycy5mb3JFYWNoKGlkZW50aWZpZXIgPT4ge1xuICAgICAgY29uc3QgY2hhbmdlID0gbWFpbkZvcm1baWRlbnRpZmllcl0gPyBtYWluRm9ybVtpZGVudGlmaWVyXSA6IG51bGw7XG4gICAgICBpZiAoY2hhbmdlKSB7XG4gICAgICAgIGV4cHIgPSBleHByLnNwbGl0KGlkZW50aWZpZXIpLmpvaW4oSlNPTi5zdHJpbmdpZnkoY2hhbmdlKSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgLyogaWYgdGhhdCdzIGFscmVhZHkgdHJ1ZSBwdXNoIGl0IGluIHJlcyAqL1xuICAgIGlmIChldmFsdWF0ZUV4cHJlc3Npb24oZXhwciwgbWFpbkZvcm0pKSB7XG4gICAgICByZXMucHVzaChtYWluRm9ybSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBsZXQgbmV3UmVwczogSW5zdGFuY2VzIHwgdW5kZWZpbmVkO1xuICAgIGNvbnN0IGNoaWxkS2V5cyA9IE9iamVjdC5rZXlzKG1haW5Gb3JtLnJlcHMgYXMgSW5zdGFuY2VzKTtcblxuICAgIGNoaWxkS2V5cy5mb3JFYWNoKGNoaWxkS2V5ID0+IHtcbiAgICAgIGNvbnN0IGN1cnJlbnRSZXBzID0gKChtYWluRm9ybS5yZXBzIGFzIEluc3RhbmNlcylbY2hpbGRLZXldIGFzIEZvcm1bXSlcbiAgICAgICAgLmZpbHRlcigoZm9ybTogRm9ybSkgPT4ge1xuICAgICAgICAgIGxldCByZXBFeHByID0gZXhwcjtcbiAgICAgICAgICAvKiByZXBsYWNlIHJlcCBmaWVsZCBpbnNpZGUgZXhwcmVzc2lvbiAqL1xuICAgICAgICAgIGlkZW50aWZpZXJzLmZvckVhY2goaWRlbnRpZmllciA9PiB7XG4gICAgICAgICAgICBjb25zdCBjaGFuZ2VJblJlcCA9IGZvcm1baWRlbnRpZmllcl0gPyBmb3JtW2lkZW50aWZpZXJdIDogbnVsbDtcbiAgICAgICAgICAgIGlmIChjaGFuZ2VJblJlcCkge1xuICAgICAgICAgICAgICByZXBFeHByID0gcmVwRXhwci5zcGxpdChpZGVudGlmaWVyKS5qb2luKEpTT04uc3RyaW5naWZ5KGNoYW5nZUluUmVwKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmV0dXJuIGV2YWx1YXRlRXhwcmVzc2lvbihyZXBFeHByLCBmb3JtKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmZpbHRlcihmID0+IGYgIT0gbnVsbCk7XG4gICAgICBpZiAoY3VycmVudFJlcHMubGVuZ3RoID4gMCkge1xuICAgICAgICBuZXdSZXBzID0gKG5ld1JlcHMgIT0gbnVsbCA/IG5ld1JlcHMgOiB7fSkgYXMgSW5zdGFuY2VzO1xuICAgICAgICBuZXdSZXBzW2NoaWxkS2V5XSA9IGN1cnJlbnRSZXBzO1xuICAgICAgfVxuICAgICAgbWFpbkZvcm1bYGFqZl8ke2NoaWxkS2V5fV9jb3VudGBdID0gY3VycmVudFJlcHMubGVuZ3RoO1xuICAgIH0pO1xuICAgIGlmIChuZXdSZXBzID09IG51bGwpIHtcbiAgICAgIHJlcy5wdXNoKG51bGwgYXMgdW5rbm93biBhcyBNYWluRm9ybSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG1haW5Gb3JtLnJlcHMgPSBuZXdSZXBzO1xuICAgICAgcmVzLnB1c2gobWFpbkZvcm0pO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXM7XG59XG5cbi8qKlxuICogcmV0dXJuIHRoZSB0b2RheSBkYXRlXG4gKlxuICogQGV4cG9ydFxuICogQHBhcmFtIHtzdHJpbmd9IFtmb3JtYXQ9J3l5eXktTU0tZGQnXVxuICogQHJldHVybiB7Kn0gIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBUT0RBWShmb3JtYXQgPSAneXl5eS1NTS1kZCcpOiBzdHJpbmcge1xuICByZXR1cm4gZGF0ZUZucy5mb3JtYXQobmV3IERhdGUoKSwgZm9ybWF0KTtcbn1cblxuLyoqXG4gKiBVVElMSVRZIEZVTkNUSU9OXG4gKiAgdGhpcyBmdW5jdGlvbiBhbGxvdyB0aGUgY29uc29sZSBsb2cgb2YgZXhjZWwgdmFyaWFibGVzLlxuICogQGV4cG9ydFxuICogQHBhcmFtIHsqfSB2YWxcbiAqIEBwYXJhbSB7c3RyaW5nfSBbdGV4dD0nbG9nOiAnXVxuICovXG5leHBvcnQgZnVuY3Rpb24gQ09OU09MRV9MT0codmFsOiBhbnksIHRleHQgPSAnbG9nOiAnKTogdm9pZCB7XG4gIGNvbnNvbGUubG9nKHRleHQsIHZhbCk7XG59XG5cbi8qKlxuICogdGhpcyBmdW5jdGlvbiB0YWtlIGEgc3RyaW5nIGRhdGUgYW5kIHJldHVybiB0aGUgZGlmZmVyZW5jZSBpbiB5ZWFyIGZyb20gZG9iIHRvIHRvZGF5LlxuICpcbiAqIEBleHBvcnRcbiAqIEBwYXJhbSB7KHN0cmluZyB8IG51bGwpfSBkb2JcbiAqIEByZXR1cm4geyp9ICB7bnVtYmVyfVxuICovXG5leHBvcnQgZnVuY3Rpb24gR0VUX0FHRShkb2I6IHN0cmluZyB8IG51bGwpOiBudW1iZXIge1xuICBpZiAoZG9iID09IG51bGwpIHJldHVybiArJzwnOyAvLyBuZWVkIGZvciBnZW5lcmF0ZSBmYWxzZSBmdW5jaW9uIGluIGV2YWx1YXRlRXhwcmVzc2lvblxuICBjb25zdCBkYXRlID0gbmV3IERhdGUoZG9iKTtcbiAgY29uc3QgYWdlOiBudW1iZXIgPSBkYXRlRm5zLmRpZmZlcmVuY2VJblllYXJzKG5ldyBEYXRlKCksIGRhdGUpO1xuICByZXR1cm4gYWdlO1xufVxuXG4vKipcbiAqIHRoaXMgZnVuY3Rpb24gcmV0dXJucyByZXBzIGxlbmd0aCBpZiByZXBzIGluIGRlZmluZWQgb3IgdGhlIGxlbmd0aCBvZiBkYXRhc2V0IGlmIGRhdGFzZXQgaXMgYXJyYXktXG4gKlxuICogQGV4cG9ydFxuICogQHBhcmFtIHsoTWFpbkZvcm0gfCBhbnlbXSl9IGRhdGFzZXRcbiAqIEByZXR1cm4geyp9ICB7bnVtYmVyfVxuICovXG5leHBvcnQgZnVuY3Rpb24gTEVOKGRhdGFzZXQ6IE1haW5Gb3JtIHwgYW55W10pOiBudW1iZXIge1xuICBpZiAoZGF0YXNldCA9PSBudWxsKSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cbiAgaWYgKChkYXRhc2V0IGFzIE1haW5Gb3JtKS5yZXBzICE9IG51bGwpIHtcbiAgICBjb25zdCBtYWluRm9ybSA9IGRhdGFzZXQgYXMgTWFpbkZvcm07XG4gICAgY29uc3QgcmVwcyA9IE9iamVjdC5rZXlzKG1haW5Gb3JtLnJlcHMgYXMgSW5zdGFuY2VzKVxuICAgICAgLm1hcChrZXkgPT4gKG1haW5Gb3JtLnJlcHMgYXMgSW5zdGFuY2VzKVtrZXldLmZsYXQoKSlcbiAgICAgIC5mbGF0KCk7XG4gICAgcmV0dXJuIHJlcHMubGVuZ3RoO1xuICB9XG5cbiAgcmV0dXJuIChkYXRhc2V0IGFzIGFueVtdKS5sZW5ndGggfHwgMDtcbn1cblxuLyoqXG4gKiBBcnJheSBjb25jYXRlbmF0aW9uLlxuICpcbiAqIEBleHBvcnRcbiAqIEBwYXJhbSB7YW55W119IGFcbiAqIEBwYXJhbSB7YW55W119IGJcbiAqIEByZXR1cm4geyp9ICB7YW55W119XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBDT05DQVQoYTogYW55W10sIGI6IGFueVtdKTogYW55W10ge1xuICByZXR1cm4gYS5jb25jYXQoYik7XG59XG5cbi8qKlxuICogUmVtb3ZlcyBkdXBsaWNhdGUgZWxlbWVudHMgZnJvbSBhbiBhcnJheS5cbiAqXG4gKiBAZXhwb3J0XG4gKiBAcGFyYW0ge2FueVtdfSBhcnJcbiAqIEByZXR1cm4geyp9ICB7YW55W119XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBSRU1PVkVfRFVQTElDQVRFUyhhcnI6IGFueVtdKTogYW55W10ge1xuICByZXR1cm4gWy4uLm5ldyBNYXAoYXJyLm1hcCh2ID0+IFtKU09OLnN0cmluZ2lmeSh2KSwgdl0pKS52YWx1ZXMoKV07XG59XG5cbi8qKlxuICogcmV0dXJuIHRydWUgaWYgZGF0ZSBpcyBiZWZvcmUgdGhlbiBkYXRlVG9Db21wYXJlXG4gKlxuICogQGV4cG9ydFxuICogQHBhcmFtIHtzdHJpbmd9IGRhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBkYXRlVG9Db21wYXJlXG4gKiBAcmV0dXJuIHsqfSAge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBJU19CRUZPUkUoZGF0ZTogc3RyaW5nLCBkYXRlVG9Db21wYXJlOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgY29uc3QgZGF0ZUE6IERhdGUgPSBkYXRlRm5zLnBhcnNlSVNPKGRhdGUpO1xuICBjb25zdCBkYXRlQjogRGF0ZSA9IGRhdGVGbnMucGFyc2VJU08oZGF0ZVRvQ29tcGFyZSk7XG4gIHJldHVybiBkYXRlRm5zLmlzQmVmb3JlKGRhdGVBLCBkYXRlQik7XG59XG5cbi8qKlxuICogcmV0dXJuIHRydWUgaWYgZGF0ZSBpcyBhZnRlciB0aGVuIGRhdGVUb0NvbXBhcmVcbiAqXG4gKiBAZXhwb3J0XG4gKiBAcGFyYW0ge3N0cmluZ30gZGF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IGRhdGVUb0NvbXBhcmVcbiAqIEByZXR1cm4geyp9ICB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIElTX0FGVEVSKGRhdGU6IHN0cmluZywgZGF0ZVRvQ29tcGFyZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gIGNvbnN0IGRhdGVBOiBEYXRlID0gZGF0ZUZucy5wYXJzZUlTTyhkYXRlKTtcbiAgY29uc3QgZGF0ZUI6IERhdGUgPSBkYXRlRm5zLnBhcnNlSVNPKGRhdGVUb0NvbXBhcmUpO1xuICByZXR1cm4gZGF0ZUZucy5pc0FmdGVyKGRhdGVBLCBkYXRlQik7XG59XG5cbi8qKlxuICogcmV0dXJuIHRydWUgaWYgZGF0ZSBpcyB3aGl0aGluIGludGVydmFsIGZyb20gZGF0ZVN0YXJ0IHRvIGRhdGVFbmRcbiAqXG4gKiBAZXhwb3J0XG4gKiBAcGFyYW0ge3N0cmluZ30gZGF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IGRhdGVTdGFydFxuICogQHBhcmFtIHtzdHJpbmd9IGRhdGVFbmRcbiAqIEByZXR1cm4geyp9ICB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIElTX1dJVEhJTl9JTlRFUlZBTChkYXRlOiBzdHJpbmcsIGRhdGVTdGFydDogc3RyaW5nLCBkYXRlRW5kOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgY29uc3QgZGF0ZVRvQ29tcGFyZTogRGF0ZSA9IGRhdGVGbnMucGFyc2VJU08oZGF0ZSk7XG4gIGNvbnN0IGludGVydmFsOiBJbnRlcnZhbCA9IHtcbiAgICBzdGFydDogZGF0ZUZucy5wYXJzZUlTTyhkYXRlU3RhcnQpLFxuICAgIGVuZDogZGF0ZUZucy5wYXJzZUlTTyhkYXRlRW5kKSxcbiAgfTtcbiAgcmV0dXJuIGRhdGVGbnMuaXNXaXRoaW5JbnRlcnZhbChkYXRlVG9Db21wYXJlLCBpbnRlcnZhbCk7XG59XG5cbi8qKlxuICogY29tcGFyZSBhIGRhdGUgd2l0aCB0d28gZGF0ZXMgaW50ZXJ2YWwuIFJldHVybiAnLTEnIChvciB0aGUgZmlyc3QgZWxlbWVudCBvZiBsYWJlbHMgYXJyYXkpIGlmIGRhdGVcbiAqIGlzIGJlZm9yZSB0aGUgZGF0ZVN0YXJ0LCAnMScgKG9yIHRoZSBzZWNvbmQgZWxlbWVudCkgaWYgZGF0ZSBpcyBhZnRlciB0aGUgZGF0ZUVuZFxuICogb3IgJzAnIChvciB0aGUgbGFzdCBlbGVtZW50KSBpZiBkYXRlIGlzIHdpdGhpbiBpbnRldmFsLlxuICpcbiAqIEBleHBvcnRcbiAqIEBwYXJhbSB7c3RyaW5nfSBkYXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gZGF0ZVN0YXJ0XG4gKiBAcGFyYW0ge3N0cmluZ30gZGF0ZUVuZFxuICogQHBhcmFtIHtzdHJpbmdbXX0gbGFiZWxzIGFuIG9wdGlvbmFsIGFycmF5IG9mIHN0cmluZyBmb3IgdGhlIG91dHB1dCB2YWx1ZXNcbiAqIEByZXR1cm4geyp9ICB7c3RyaW5nfVxuICovXG5leHBvcnQgZnVuY3Rpb24gQ09NUEFSRV9EQVRFKFxuICBkYXRlOiBzdHJpbmcsXG4gIGRhdGVTdGFydDogc3RyaW5nLFxuICBkYXRlRW5kOiBzdHJpbmcsXG4gIGxhYmVscz86IHN0cmluZ1tdLFxuKTogc3RyaW5nIHtcbiAgbGV0IHJlcyA9ICcnO1xuICBjb25zdCBkYXRlVG9Db21wYXJlOiBEYXRlID0gZGF0ZUZucy5wYXJzZUlTTyhkYXRlKTtcbiAgY29uc3QgZGF0ZUE6IERhdGUgPSBkYXRlRm5zLnBhcnNlSVNPKGRhdGVTdGFydCk7XG4gIGNvbnN0IGRhdGVCOiBEYXRlID0gZGF0ZUZucy5wYXJzZUlTTyhkYXRlRW5kKTtcbiAgY29uc3QgaW50ZXJ2YWw6IEludGVydmFsID0ge1xuICAgIHN0YXJ0OiBkYXRlQSxcbiAgICBlbmQ6IGRhdGVCLFxuICB9O1xuICBpZiAobGFiZWxzID09IG51bGwpIHtcbiAgICBsYWJlbHMgPSBbJy0xJywgJzEnLCAnMCddO1xuICB9XG4gIGlmIChkYXRlRm5zLmlzQmVmb3JlKGRhdGVUb0NvbXBhcmUsIGRhdGVBKSkge1xuICAgIHJlcyA9IGxhYmVsc1swXTtcbiAgfSBlbHNlIGlmIChkYXRlRm5zLmlzQWZ0ZXIoZGF0ZVRvQ29tcGFyZSwgZGF0ZUIpKSB7XG4gICAgcmVzID0gbGFiZWxzWzFdO1xuICB9IGVsc2UgaWYgKGRhdGVGbnMuaXNXaXRoaW5JbnRlcnZhbChkYXRlVG9Db21wYXJlLCBpbnRlcnZhbCkpIHtcbiAgICByZXMgPSBsYWJlbHNbMl07XG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cblxuLyoqXG4gKiB0aGlzIGZ1bmN0aW9uIGV4dGVuZCBmb3Jtc0EgZGF0YXNldC5cbiAqIHNlYXJjaCBhbGwgbWF0Y2ggb2Yga2V5QSBpbiBmb3Jtc0IsIGlmIGZvdW5kIGlmIG1lcmdlIGZvcm1BIGFuZCBmb3JtQi5cbiAqXG4gKiBAZXhwb3J0XG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5QVxuICogQHBhcmFtIHtzdHJpbmd9IFtrZXlCXVxuICogQHJldHVybiB7Kn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIEpPSU5fRk9STVMoXG4gIGZvcm1zQTogKE1haW5Gb3JtIHwgRm9ybSlbXSxcbiAgZm9ybXNCOiAoTWFpbkZvcm0gfCBGb3JtKVtdLFxuICBrZXlBOiBzdHJpbmcsXG4gIGtleUI/OiBzdHJpbmcsXG4pOiAoTWFpbkZvcm0gfCBGb3JtKVtdIHtcbiAgZm9ybXNBID0gY2xvbmVNYWluRm9ybXMoZm9ybXNBKTtcbiAgZm9ybXNCID0gY2xvbmVNYWluRm9ybXMoZm9ybXNCKTtcbiAgY29uc3QgbWVyZ2VkRm9ybXM6IChNYWluRm9ybSB8IEZvcm0pW10gPSBbXTtcbiAgaWYgKGtleUEgPT0gbnVsbCB8fCBmb3Jtc0EgPT0gbnVsbCB8fCBmb3Jtc0EubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIG1lcmdlZEZvcm1zO1xuICB9XG4gIGlmIChrZXlCID09IG51bGwpIHtcbiAgICBrZXlCID0ga2V5QTtcbiAgfVxuICBpZiAoZm9ybXNCID09IG51bGwgfHwgZm9ybXNCLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBmb3Jtc0E7XG4gIH1cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBmb3Jtc0EubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBmb3JtQSA9IGZvcm1zQVtpXTtcbiAgICBjb25zdCBrZXlBVmFsdWUgPSBmb3JtQVtrZXlBXTtcbiAgICBsZXQgbWVyZ2VkRm9ybSA9IHsuLi5mb3JtQX07XG4gICAgaWYgKGZvcm1BID09IG51bGwgfHwga2V5QVZhbHVlID09IG51bGwpIHtcbiAgICAgIG1lcmdlZEZvcm1zLnB1c2goZm9ybUEpO1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGZvciAobGV0IGogPSAwOyBqIDwgZm9ybXNCLmxlbmd0aDsgaisrKSB7XG4gICAgICBjb25zdCBmb3JtQiA9IGZvcm1zQltqXTtcbiAgICAgIGNvbnN0IGtleUJWYWx1ZSA9IGZvcm1CW2tleUJdO1xuICAgICAgaWYgKGZvcm1CID09IG51bGwgfHwga2V5QlZhbHVlID09IG51bGwpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAoa2V5QVZhbHVlID09PSBrZXlCVmFsdWUpIHtcbiAgICAgICAgbWVyZ2VkRm9ybSA9IHsuLi5mb3JtQSwgLi4uZm9ybUJ9O1xuICAgICAgICBpZiAoZm9ybUEucmVwcyAhPSBudWxsICYmIGZvcm1CLnJlcHMgIT0gbnVsbCkge1xuICAgICAgICAgIG1lcmdlZEZvcm0ucmVwcyA9IHtcbiAgICAgICAgICAgIC4uLihmb3JtQSBhcyBNYWluRm9ybSkucmVwcyxcbiAgICAgICAgICAgIC4uLihmb3JtQiBhcyBNYWluRm9ybSkucmVwcyxcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICBtZXJnZWRGb3Jtcy5wdXNoKG1lcmdlZEZvcm0pO1xuICB9XG5cbiAgcmV0dXJuIG1lcmdlZEZvcm1zO1xufVxuXG4vKipcbiAqIGxpa2UgSk9JTl9GT1JNUyBidXQgZXh0ZW5kcyB0aGUgYmVoYXZpb3VyIG9uIHRoZSByZXBzLlxuICogc2VhcmNoIGFsbCBtYXRjaCBvZiBzdWJLZXlBIGluIGZvcm1CXG4gKlxuICogQGV4cG9ydFxuICogQHBhcmFtIHtNYWluRm9ybVtdfSBmb3Jtc0FcbiAqIEBwYXJhbSB7TWFpbkZvcm1bXX0gZm9ybXNCXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5QVxuICogQHBhcmFtIHtzdHJpbmd9IGtleUJcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdWJLZXlBXG4gKiBAcGFyYW0ge3N0cmluZ30gW3N1YktleUJdXG4gKiBAcmV0dXJuIHsqfSAge01haW5Gb3JtW119XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBKT0lOX1JFUEVBVElOR19TTElERVMoXG4gIGZvcm1zQTogTWFpbkZvcm1bXSxcbiAgZm9ybXNCOiBNYWluRm9ybVtdLFxuICBrZXlBOiBzdHJpbmcsXG4gIGtleUI6IHN0cmluZyxcbiAgc3ViS2V5QTogc3RyaW5nLFxuICBzdWJLZXlCPzogc3RyaW5nLFxuKTogTWFpbkZvcm1bXSB7XG4gIGNvbnN0IG1lcmdlZEZvcm1zOiBNYWluRm9ybVtdID0gW107XG4gIGZvcm1zQSA9IGNsb25lTWFpbkZvcm1zKGZvcm1zQSk7XG4gIGZvcm1zQiA9IGNsb25lTWFpbkZvcm1zKGZvcm1zQik7XG4gIGlmIChrZXlBID09IG51bGwgfHwgZm9ybXNBID09IG51bGwgfHwgZm9ybXNBLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBtZXJnZWRGb3JtcztcbiAgfVxuICBpZiAoa2V5QiA9PSBudWxsKSB7XG4gICAga2V5QiA9IGtleUE7XG4gIH1cbiAgaWYgKGZvcm1zQiA9PSBudWxsIHx8IGZvcm1zQi5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gZm9ybXNBO1xuICB9XG4gIGlmIChzdWJLZXlBID09IG51bGwpIHtcbiAgICByZXR1cm4gSk9JTl9GT1JNUyhmb3Jtc0EsIGZvcm1zQiwga2V5QSwga2V5QikgYXMgTWFpbkZvcm1bXTtcbiAgfVxuICBpZiAoc3ViS2V5QiA9PSBudWxsKSB7XG4gICAgc3ViS2V5QiA9IHN1YktleUE7XG4gIH1cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBmb3Jtc0EubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBmb3JtQSA9IGZvcm1zQVtpXTtcbiAgICBjb25zdCBrZXlBVmFsdWUgPSBmb3JtQVtrZXlBXTtcbiAgICBsZXQgbWVyZ2VkRm9ybSA9IHsuLi5mb3JtQX07XG4gICAgaWYgKGZvcm1BID09IG51bGwgfHwga2V5QVZhbHVlID09IG51bGwpIHtcbiAgICAgIG1lcmdlZEZvcm1zLnB1c2goZm9ybUEpO1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGZvciAobGV0IGogPSAwOyBqIDwgZm9ybXNCLmxlbmd0aDsgaisrKSB7XG4gICAgICBjb25zdCBmb3JtQiA9IGZvcm1zQltqXTtcbiAgICAgIGNvbnN0IGtleUJWYWx1ZSA9IGZvcm1CW2tleUJdO1xuICAgICAgaWYgKGZvcm1CID09IG51bGwgfHwga2V5QlZhbHVlID09IG51bGwpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAoa2V5QVZhbHVlID09PSBrZXlCVmFsdWUpIHtcbiAgICAgICAgbWVyZ2VkRm9ybSA9IHsuLi5mb3JtQSwgLi4uZm9ybUJ9O1xuICAgICAgICBtZXJnZWRGb3JtLnJlcHMgPSB7Li4uZm9ybUEucmVwcywgLi4uZm9ybUIucmVwc307XG4gICAgICAgIGlmIChmb3JtQS5yZXBzICE9IG51bGwgJiYgZm9ybUIucmVwcyAhPSBudWxsKSB7XG4gICAgICAgICAgY29uc3QgbWVyZ2VkUmVwczogSW5zdGFuY2VzID0ge307XG4gICAgICAgICAgY29uc3QgY2hpbGRBS2V5cyA9IE9iamVjdC5rZXlzKGZvcm1BLnJlcHMpO1xuICAgICAgICAgIGNvbnN0IGNoaWxkQiA9IE9iamVjdC5rZXlzKGZvcm1CLnJlcHMpXG4gICAgICAgICAgICAubWFwKGtleSA9PiAoZm9ybUIucmVwcyBhcyBJbnN0YW5jZXMpW2tleV0uZmxhdCgpKVxuICAgICAgICAgICAgLmZsYXQoKTtcbiAgICAgICAgICBjaGlsZEFLZXlzLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGluc3RhbmNlID0gKGZvcm1BLnJlcHMgYXMgSW5zdGFuY2VzKVtrZXldO1xuICAgICAgICAgICAgbWVyZ2VkUmVwc1trZXldID0gSk9JTl9GT1JNUyhcbiAgICAgICAgICAgICAgaW5zdGFuY2UgYXMgdW5rbm93biBhcyBNYWluRm9ybVtdLFxuICAgICAgICAgICAgICBjaGlsZEIgYXMgdW5rbm93biBhcyBNYWluRm9ybVtdLFxuICAgICAgICAgICAgICBzdWJLZXlBLFxuICAgICAgICAgICAgICBzdWJLZXlCLFxuICAgICAgICAgICAgKSBhcyBGb3JtW107XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgbWVyZ2VkRm9ybS5yZXBzID0gbWVyZ2VkUmVwcztcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgbWVyZ2VkRm9ybXMucHVzaChtZXJnZWRGb3JtKTtcbiAgfVxuXG4gIHJldHVybiBtZXJnZWRGb3Jtcztcbn1cblxuLyoqXG4gKiB0aGlzIGZ1bmN0aW9uIGV4dHJhY3QgYW4gYXJyYXkgb2YgZXZhbHVhdGVkIGV4cHJlc3Npb24gZnJvbSBtYWluIGZvcm0gcmVwcy5cbiAqXG4gKiBAZXhwb3J0XG4gKiBAcGFyYW0ge01haW5Gb3JtfSBtYWluRm9ybVxuICogQHBhcmFtIHtzdHJpbmd9IGV4cHJlc3Npb25cbiAqIEByZXR1cm4geyp9ICB7YW55W119XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBGUk9NX1JFUFMobWFpbkZvcm06IE1haW5Gb3JtLCBleHByZXNzaW9uOiBzdHJpbmcpOiBhbnlbXSB7XG4gIGNvbnN0IHJlczogYW55W10gPSBbXTtcblxuICBpZiAobWFpbkZvcm0gIT0gbnVsbCAmJiBtYWluRm9ybS5yZXBzICE9IG51bGwpIHtcbiAgICBjb25zdCByZXBzID0gT2JqZWN0LmtleXMobWFpbkZvcm0ucmVwcylcbiAgICAgIC5tYXAoa2V5ID0+IChtYWluRm9ybS5yZXBzIGFzIEluc3RhbmNlcylba2V5XS5mbGF0KCkpXG4gICAgICAuZmxhdCgpO1xuICAgIHJlcHMuZm9yRWFjaChjaGlsZCA9PiB7XG4gICAgICByZXMucHVzaChldmFsdWF0ZUV4cHJlc3Npb24oZXhwcmVzc2lvbiwgY2hpbGQpKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiByZXM7XG59XG5cbi8qKlxuICogdGhpcyBmdW5jdGlvbiByZXR1cm4gdHJ1ZSBpZiB2YWx1ZSBpcyBpbnNpZGUgb2YgZGF0YXNldFxuICpcbiAqIEBleHBvcnRcbiAqIEBwYXJhbSB7YW55W119IGRhdGFzZXRcbiAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAqIEByZXR1cm4geyp9ICB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIElTSU4oZGF0YXNldDogYW55W10sIHZhbHVlOiBhbnkpOiBib29sZWFuIHtcbiAgaWYgKGRhdGFzZXQgPT0gbnVsbCB8fCB2YWx1ZSA9PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiBkYXRhc2V0LmluZGV4T2YodmFsdWUpID49IDA7XG59XG5cbi8qKlxuICogdGhlIGxlbmd0aHMgb2YgdGhlIGRhdGFzZXRzIGFyZSBhc3N1bWVkIHRvIGJlIHRoZSBzYW1lLlxuICogdGhpcyBmdW5jdGlvbiByZXR1cm4gYW4gYXJyYXkgbGlzdCBvZiBjYWxjdWxhdGVkIHZhbHVlcy5cbiAqIGVhY2ggZWxlbWVudCBvZiB0aGUgYXJyYXkgaXMgY2FsY3VsYXRlZCBieSByZXBsYWNpbmcgZWxlbUEgd2l0aCB0aGUgY3VycmVudCBlbGVtZW50IG9mIGFcbiAqIGFuZCBlbGVtQiB3aXRoIHRoZSBjdXJyZW50IGVsZW1lbnQgb2YgYiBpbnNpZGUgdGhlIGV4cHJlc3Npb24uXG4gKlxuICogQGV4cG9ydFxuICogQHBhcmFtIHtudW1iZXJbXX0gZGF0YXNldEFcbiAqIEBwYXJhbSB7bnVtYmVyW119IGRhdGFzZXRCXG4gKiBAcGFyYW0ge3N0cmluZ30gZXhwcmVzc2lvblxuICogQHJldHVybiB7Kn0gIHtudW1iZXJbXX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIE9QKGRhdGFzZXRBOiBudW1iZXJbXSwgZGF0YXNldEI6IG51bWJlcltdLCBleHByZXNzaW9uOiBzdHJpbmcpOiBudW1iZXJbXSB7XG4gIGNvbnN0IHJlczogbnVtYmVyW10gPSBbXTtcbiAgaWYgKGRhdGFzZXRBID09IG51bGwgfHwgZGF0YXNldEIubGVuZ3RoID4gZGF0YXNldEEubGVuZ3RoKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG4gIGlmIChkYXRhc2V0QiA9PSBudWxsKSB7XG4gICAgcmV0dXJuIGRhdGFzZXRBO1xuICB9XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YXNldEEubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBlbGVtQSA9IGRhdGFzZXRBW2ldIHx8IDA7XG4gICAgY29uc3QgZWxlbUIgPSBkYXRhc2V0QltpXSB8fCAwO1xuICAgIGNvbnN0IGV4cHIgPSBleHByZXNzaW9uXG4gICAgICAuc3BsaXQoJ2VsZW1BJylcbiAgICAgIC5qb2luKEpTT04uc3RyaW5naWZ5KGVsZW1BKSlcbiAgICAgIC5zcGxpdCgnZWxlbUInKVxuICAgICAgLmpvaW4oSlNPTi5zdHJpbmdpZnkoZWxlbUIpKTtcbiAgICByZXMucHVzaChldmFsdWF0ZUV4cHJlc3Npb24oZXhwcikpO1xuICB9XG5cbiAgcmV0dXJuIHJlcztcbn1cblxuLyoqXG4gKiB0aGlzIGZ1bmN0aW9uIHRha2UgYSBhamYgc2NoZW1hIGFuZCBhIGxpc3Qgb2YgdmFsdWVzIGFzIGlucHV0IGFuZFxuICogcmV0dXJucyBhIGxpc3Qgb2YgbGFiZWwgbWF0Y2hlZCBpbnNpZGUgYSBzY2hlbWEgY2hvaWNoZSBvcmlnaW5zLlxuICpcbiAqIEBleHBvcnRcbiAqIEBwYXJhbSB7Kn0gc2NoZW1hXG4gKiBAcGFyYW0ge3N0cmluZ1tdfSB2YWx1ZXNcbiAqIEByZXR1cm4geyp9ICB7c3RyaW5nW119XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBHRVRfTEFCRUxTKHNjaGVtYTogYW55LCB2YWx1ZXM6IHN0cmluZ1tdKTogc3RyaW5nW10ge1xuICBjb25zdCBjaG9pY2VMYWJlbHM6IHtbZmllbGROYW1lOiBzdHJpbmddOiBzdHJpbmd9ID0gZXh0cmFjdExhYmVsc0J5U2NoZW1hQ2hvaWNlcyhzY2hlbWEpO1xuICByZXR1cm4gdmFsdWVzLm1hcCh2YWwgPT4gKGNob2ljZUxhYmVsc1t2YWxdICE9IG51bGwgPyBjaG9pY2VMYWJlbHNbdmFsXSA6IHZhbCkpO1xufVxuIl19