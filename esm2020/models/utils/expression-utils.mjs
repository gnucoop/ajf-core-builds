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
    return identifiers;
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
    FILTER_BY: { fn: FILTER_BY },
    IS_BEFORE: { fn: IS_BEFORE },
    IS_AFTER: { fn: IS_AFTER },
    IS_WITHIN_INTERVAL: { fn: IS_WITHIN_INTERVAL },
    APPLY: { fn: APPLY },
    TODAY: { fn: TODAY },
    GET_AGE: { fn: GET_AGE },
    BUILD_DATASET: { fn: BUILD_DATASET },
    JOIN_FORMS: { fn: JOIN_FORMS },
    LEN: { fn: LEN },
    JOIN_REPEATING_SLIDES: { fn: JOIN_REPEATING_SLIDES },
    FROM_REPS: { fn: FROM_REPS },
    ISIN: { fn: ISIN },
    OP: { fn: OP },
    GET_LABELS: { fn: GET_LABELS },
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
 * Calculates all the possible results that a field has taken
 */
export function ALL_VALUES_OF(mainforms, fieldName) {
    const allreps = (mainforms || [])
        .slice(0)
        .map(m => m.reps)
        .filter(c => c != null)
        .map((i) => Object.keys(i)
        .map(k => i[k])
        .flat())
        .flat();
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
    // const forms: MainForm[] = deepCopy(formList).filter((f: MainForm) => f != null);
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
        if (mainForm.reps != null) {
            const allreps = Object.keys(mainForm.reps)
                .map((key) => mainForm.reps[key])
                .flat()
                .map((child) => evaluateExpression(exxpr, child))
                .reduce((a, b) => (a += +b), 0);
            if (allreps > 0) {
                count++;
            }
        }
        if (evaluateExpression(exxpr, mainForm)) {
            count++;
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
 * Aggregates and sums the values of one or more. An optional condition can be added to discriminate
 * which forms to take for the sum.
 */
export function SUM(mainForms, field, condition = 'true') {
    // const forms: MainForm[] = deepCopy(mainForms).filter((f: MainForm) => f != null);
    const forms = (mainForms || [])
        .slice(0)
        .filter((f) => f != null);
    const identifiers = getCodeIdentifiers(condition, true);
    let exxpr = condition;
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
            allreps
                .filter(c => c[field] != null)
                .forEach((child) => {
                if (evaluateExpression(condition, child)) {
                    count += +child[field] || 0;
                }
            });
        }
        identifiers.forEach(identifier => {
            const change = mainForm[identifier] ? mainForm[identifier] : null;
            if (change) {
                exxpr = condition.split(identifier).join(JSON.stringify(change));
            }
        });
        if (evaluateExpression(exxpr, mainForm) && mainForm[field] != null) {
            count += +mainForm[field] || 0;
        }
    }
    return count;
}
/**
 * Calculates the mean of a simple or derived value. An optional condition can be added to
 * discriminate which forms to take for the sum.
 */
export function MEAN(forms, fieldName) {
    forms = (forms || []).slice(0);
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
export function LAST(forms, expression, date = 'date_end') {
    forms = (forms || []).slice(0).sort((a, b) => {
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
    forms = (forms || []).slice(0);
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
    forms = (forms || []).slice(0);
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
    forms = (forms || []).slice(0);
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
                    textAlign: 'center',
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
                    mainForm[fieldName] = f[fieldName];
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
            const noRepeatingFields = fKeys.filter(fkey => fkey.indexOf('__') === -1);
            const noRepForm = {};
            noRepeatingFields.forEach(field => {
                noRepForm[field] = form[field];
            });
            const mainForm = { ...noRepForm, reps: { slide: [] } };
            for (let i = 0; i <= MAX_REPS; i++) {
                const currentSlide = {};
                const onlyCurrentInstanceKeys = fKeys.filter(fkey => fkey.indexOf(`__${i}`) > -1);
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
 * this function take a ajf schema and a list of field names as input and
 * returns a list of label matched inside a schema choiche origins.
 *
 * @export
 * @param {*} schema
 * @param {string[]} fieldNames
 * @return {*}  {string[]}
 */
export function GET_LABELS(schema, fieldNames) {
    const labels = {};
    if (schema != null && schema.choicesOrigins != null) {
        schema.choicesOrigins.forEach(choice => {
            if (choice != null && choice.choices != null) {
                choice.choices.forEach(element => {
                    labels[element.value] = element.label;
                });
            }
        });
    }
    return fieldNames.map(fieldName => (labels[fieldName] != null ? labels[fieldName] : fieldName));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwcmVzc2lvbi11dGlscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvbW9kZWxzL3NyYy91dGlscy9leHByZXNzaW9uLXV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUdILE9BQU8sS0FBSyxPQUFPLE1BQU0sVUFBVSxDQUFDO0FBQ3BDLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxTQUFTLENBQUM7QUFDcEMsT0FBTyxLQUFLLFNBQVMsTUFBTSxRQUFRLENBQUM7QUFLcEMsSUFBSSxXQUFXLEdBQVEsRUFBRSxDQUFDO0FBRTFCLE1BQU0sTUFBTSxHQUFHLFNBQVMsQ0FBQyxPQUFPLElBQUksU0FBUyxDQUFDO0FBWTlDLE1BQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQztBQUVwQixNQUFNLENBQUMsTUFBTSxrQkFBa0IsR0FBRyxDQUNoQyxNQUFjLEVBQ2QscUJBQThCLEtBQUssRUFDekIsRUFBRTtJQUNaLE1BQU0sV0FBVyxHQUFHLEVBQWMsQ0FBQztJQUNuQyxJQUFJO1FBQ0YsV0FBVyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsRUFBRTtZQUM3QixPQUFPLEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxFQUFFO2dCQUM3QixJQUFJLEtBQUssSUFBSSxZQUFZLEVBQUU7b0JBQ3pCLE1BQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO29CQUMzRCxJQUFJLGtCQUFrQixJQUFJLFVBQVUsS0FBSyxRQUFRLEVBQUU7d0JBQ2pELFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7cUJBQzlCO2lCQUNGO1lBQ0gsQ0FBQztTQUNGLENBQUMsQ0FBQztLQUNKO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDVixPQUFPLENB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TSxDQUFDLFNBQVMsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0FBQ2xHLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmQ29udGV4dH0gZnJvbSAnQGFqZi9jb3JlL2NvbW1vbic7XG5pbXBvcnQgKiBhcyBkYXRlRm5zIGZyb20gJ2RhdGUtZm5zJztcbmltcG9ydCB7cGFyc2VTY3JpcHR9IGZyb20gJ21lcml5YWgnO1xuaW1wb3J0ICogYXMgbnVtYnJvTW9kIGZyb20gJ251bWJybyc7XG5pbXBvcnQge0FqZlRhYmxlQ2VsbH0gZnJvbSAnQGFqZi9jb3JlL3RhYmxlJztcblxuaW1wb3J0IHtBamZWYWxpZGF0aW9uRm59IGZyb20gJy4uL2ludGVyZmFjZS92YWxpZGF0aW9uLWZ1bmN0aW9uJztcblxubGV0IGV4ZWNDb250ZXh0OiBhbnkgPSB7fTtcblxuY29uc3QgbnVtYnJvID0gbnVtYnJvTW9kLmRlZmF1bHQgfHwgbnVtYnJvTW9kO1xuZXhwb3J0IGludGVyZmFjZSBGb3JtIHtcbiAgW2tleTogc3RyaW5nXTogc3RyaW5nIHwgbnVtYmVyIHwgbnVsbDtcbn1cbmV4cG9ydCBpbnRlcmZhY2UgSW5zdGFuY2VzIHtcbiAgW2luc3RhbmNlOiBzdHJpbmddOiBGb3JtW107XG59XG5leHBvcnQgaW50ZXJmYWNlIE1haW5Gb3JtIHtcbiAgW2tleTogc3RyaW5nXTogc3RyaW5nIHwgbnVtYmVyIHwgbnVsbCB8IEluc3RhbmNlcyB8IHVuZGVmaW5lZCB8IG51bGw7XG4gIHJlcHM/OiBJbnN0YW5jZXM7XG59XG5cbmNvbnN0IE1BWF9SRVBTID0gMzA7XG5cbmV4cG9ydCBjb25zdCBnZXRDb2RlSWRlbnRpZmllcnMgPSAoXG4gIHNvdXJjZTogc3RyaW5nLFxuICBpbmNsdWRlRG9sbGFyVmFsdWU6IGJvb2xlYW4gPSBmYWxzZSxcbik6IHN0cmluZ1tdID0+IHtcbiAgY29uc3QgaWRlbnRpZmllcnMgPSBbXSBhcyBzdHJpbmdbXTtcbiAgdHJ5IHtcbiAgICBwYXJzZVNjcmlwdChzb3VyY2UudG9TdHJpbmcoKSwge1xuICAgICAgb25Ub2tlbjogKHRva2VuLCBzdGFydCwgZW5kKSA9PiB7XG4gICAgICAgIGlmICh0b2tlbiA9PSAnSWRlbnRpZmllcicpIHtcbiAgICAgICAgICBjb25zdCBpZGVudGlmaWVyID0gc291cmNlLnRvU3RyaW5nKCkuc3Vic3RyaW5nKHN0YXJ0LCBlbmQpO1xuICAgICAgICAgIGlmIChpbmNsdWRlRG9sbGFyVmFsdWUgfHwgaWRlbnRpZmllciAhPT0gJyR2YWx1ZScpIHtcbiAgICAgICAgICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgIH0pO1xuICB9IGNhdGNoIChlKSB7XG4gICAgY29uc29sZS5sb2coc291cmNlKTtcbiAgICBjb25zb2xlLmxvZyhlKTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59O1xuXG5leHBvcnQgY29uc3QgZGF0ZVV0aWxzID0ge1xuICBhZGREYXlzOiBkYXRlRm5zLmFkZERheXMsXG4gIGFkZE1vbnRoczogZGF0ZUZucy5hZGRNb250aHMsXG4gIGFkZFllYXJzOiBkYXRlRm5zLmFkZFllYXJzLFxuICBlbmRPZklTT1dlZWs6IGRhdGVGbnMuZW5kT2ZJU09XZWVrLFxuICBmb3JtYXQ6IGRhdGVGbnMuZm9ybWF0LFxuICBnZXREYXk6IGRhdGVGbnMuZ2V0RGF5LFxuICBwYXJzZTogZGF0ZUZucy5wYXJzZUlTTyxcbiAgc3RhcnRPZk1vbnRoOiBkYXRlRm5zLnN0YXJ0T2ZNb250aCxcbiAgc3RhcnRPZklTT1dlZWs6IGRhdGVGbnMuc3RhcnRPZklTT1dlZWssXG4gIGlzQmVmb3JlOiBkYXRlRm5zLmlzQmVmb3JlLFxufTtcblxuZXhwb3J0IGNsYXNzIEFqZkV4cHJlc3Npb25VdGlscyB7XG4gIC8vIFRPRE8gd2hhdCBpcyBpdCBmb3JcbiAgc3RhdGljIFVUSUxfRlVOQ1RJT05TID0gJyc7XG4gIC8qKlxuICAgKiBJdCBpcyBhIGtleS12YWx1ZSBkaWN0aW9uYXJ5LCB0aGF0IG1hcHBpbmcgYWxsIEFqZiB2YWxpZGF0aW9uIGZ1bmN0aW9ucy5cbiAgICovXG4gIHN0YXRpYyB1dGlsczoge1tuYW1lOiBzdHJpbmddOiBBamZWYWxpZGF0aW9uRm59ID0ge1xuICAgIGRpZ2l0Q291bnQ6IHtmbjogZGlnaXRDb3VudH0sXG4gICAgZGVjaW1hbENvdW50OiB7Zm46IGRlY2ltYWxDb3VudH0sXG4gICAgaXNJbnQ6IHtmbjogaXNJbnR9LFxuICAgIG5vdEVtcHR5OiB7Zm46IG5vdEVtcHR5fSxcbiAgICB2YWx1ZUluQ2hvaWNlOiB7Zm46IHZhbHVlSW5DaG9pY2V9LFxuICAgIHNjYW5Hcm91cEZpZWxkOiB7Zm46IHNjYW5Hcm91cEZpZWxkfSxcbiAgICBzdW06IHtmbjogc3VtfSxcbiAgICBkYXRlT3BlcmF0aW9uczoge2ZuOiBkYXRlT3BlcmF0aW9uc30sXG4gICAgcm91bmQ6IHtmbjogcm91bmR9LFxuICAgIGV4dHJhY3RBcnJheToge2ZuOiBleHRyYWN0QXJyYXl9LFxuICAgIGV4dHJhY3RTdW06IHtmbjogZXh0cmFjdFN1bX0sXG4gICAgZXh0cmFjdEFycmF5U3VtOiB7Zm46IGV4dHJhY3RBcnJheVN1bX0sXG4gICAgZHJhd1RocmVzaG9sZDoge2ZuOiBkcmF3VGhyZXNob2xkfSxcbiAgICBleHRyYWN0RGF0ZXM6IHtmbjogZXh0cmFjdERhdGVzfSxcbiAgICBsYXN0UHJvcGVydHk6IHtmbjogbGFzdFByb3BlcnR5fSxcbiAgICBzdW1MYXN0UHJvcGVydGllczoge2ZuOiBzdW1MYXN0UHJvcGVydGllc30sXG4gICAgY2FsY3VsYXRlVHJlbmRQcm9wZXJ0eToge2ZuOiBjYWxjdWxhdGVUcmVuZFByb3BlcnR5fSxcbiAgICBjYWxjdWxhdGVUcmVuZEJ5UHJvcGVydGllczoge2ZuOiBjYWxjdWxhdGVUcmVuZEJ5UHJvcGVydGllc30sXG4gICAgY2FsY3VsYXRlQXZnUHJvcGVydHk6IHtmbjogY2FsY3VsYXRlQXZnUHJvcGVydHl9LFxuICAgIGNhbGN1bGF0ZUF2Z1Byb3BlcnR5QXJyYXk6IHtmbjogY2FsY3VsYXRlQXZnUHJvcGVydHlBcnJheX0sXG4gICAgYWxlcnQ6IHtmbjogYWxlcnR9LFxuICAgIGZvcm1hdE51bWJlcjoge2ZuOiBmb3JtYXROdW1iZXJ9LFxuICAgIGZvcm1hdERhdGU6IHtmbjogZm9ybWF0RGF0ZX0sXG4gICAgaXNvTW9udGg6IHtmbjogaXNvTW9udGh9LFxuICAgIGdldENvb3JkaW5hdGU6IHtmbjogZ2V0Q29vcmRpbmF0ZX0sXG4gICAgTWF0aDoge2ZuOiBNYXRofSxcbiAgICBwYXJzZUludDoge2ZuOiBwYXJzZUludH0sXG4gICAgcGFyc2VGbG9hdDoge2ZuOiBwYXJzZUZsb2F0fSxcbiAgICBwYXJzZURhdGU6IHtmbjogZGF0ZVV0aWxzLnBhcnNlfSxcbiAgICBEYXRlOiB7Zm46IERhdGV9LFxuICAgIHBsYWluQXJyYXk6IHtmbjogcGxhaW5BcnJheX0sXG4gICAgQ09VTlRfRk9STVM6IHtmbjogQ09VTlRfRk9STVN9LFxuICAgIENPVU5UX0ZPUk1TX1VOSVFVRToge2ZuOiBDT1VOVF9GT1JNU19VTklRVUV9LFxuICAgIENPVU5UX1JFUFM6IHtmbjogQ09VTlRfUkVQU30sXG4gICAgU1VNOiB7Zm46IFNVTX0sXG4gICAgTUVBTjoge2ZuOiBNRUFOfSxcbiAgICBQRVJDRU5UOiB7Zm46IFBFUkNFTlR9LFxuICAgIExBU1Q6IHtmbjogTEFTVH0sXG4gICAgTUFYOiB7Zm46IE1BWH0sXG4gICAgTUVESUFOOiB7Zm46IE1FRElBTn0sXG4gICAgTU9ERToge2ZuOiBNT0RFfSxcbiAgICBBTExfVkFMVUVTX09GOiB7Zm46IEFMTF9WQUxVRVNfT0Z9LFxuICAgIFJFUEVBVDoge2ZuOiBSRVBFQVR9LFxuICAgIEVWQUxVQVRFOiB7Zm46IEVWQUxVQVRFfSxcbiAgICBidWlsZERhdGFzZXQ6IHtmbjogYnVpbGREYXRhc2V0fSxcbiAgICBGSUxURVJfQlk6IHtmbjogRklMVEVSX0JZfSxcbiAgICBJU19CRUZPUkU6IHtmbjogSVNfQkVGT1JFfSxcbiAgICBJU19BRlRFUjoge2ZuOiBJU19BRlRFUn0sXG4gICAgSVNfV0lUSElOX0lOVEVSVkFMOiB7Zm46IElTX1dJVEhJTl9JTlRFUlZBTH0sXG4gICAgQVBQTFk6IHtmbjogQVBQTFl9LFxuICAgIFRPREFZOiB7Zm46IFRPREFZfSxcbiAgICBHRVRfQUdFOiB7Zm46IEdFVF9BR0V9LFxuICAgIEJVSUxEX0RBVEFTRVQ6IHtmbjogQlVJTERfREFUQVNFVH0sXG4gICAgSk9JTl9GT1JNUzoge2ZuOiBKT0lOX0ZPUk1TfSxcbiAgICBMRU46IHtmbjogTEVOfSxcbiAgICBKT0lOX1JFUEVBVElOR19TTElERVM6IHtmbjogSk9JTl9SRVBFQVRJTkdfU0xJREVTfSxcbiAgICBGUk9NX1JFUFM6IHtmbjogRlJPTV9SRVBTfSxcbiAgICBJU0lOOiB7Zm46IElTSU59LFxuICAgIE9QOiB7Zm46IE9QfSxcbiAgICBHRVRfTEFCRUxTOiB7Zm46IEdFVF9MQUJFTFN9LFxuICAgIFJPVU5EOiB7Zm46IFJPVU5EfSxcbiAgICBDT05TT0xFX0xPRzoge2ZuOiBDT05TT0xFX0xPR30sXG4gIH07XG59XG5cbi8qKlxuICogVVRJTElUWSBGVU5DSU9OXG4gKiBUaGlzIGZ1bmN0aW9uIHByb3ZpZGUgYSBkZWVwIGNvcHkgYnVpbGRlciBvZiBhcnJheSBvZiBtYWluIGZvcm1zLlxuICogVGhhdCdzIGEgY3VzdG9tIGZ1bmN0aW9uIHJlbGF0ZWQgdG8gbWFpbmZvcm1zIHRoYXQgY2FuIGJlIGFibGUgdG8gaW5jcmVhc2UgY29weSBwZXJmb3JtYW5jZS5cbiAqXG4gKiBAcGFyYW0ge01haW5Gb3JtW119IGZvcm1zXG4gKiBAcmV0dXJuIHsqfSAge01haW5Gb3JtW119XG4gKi9cbmZ1bmN0aW9uIGNsb25lTWFpbkZvcm1zKGZvcm1zOiBNYWluRm9ybVtdKTogTWFpbkZvcm1bXSB7XG4gIGxldCByZXM6IE1haW5Gb3JtW10gPSBbXTtcbiAgZm9ybXMuZm9yRWFjaChmb3JtID0+IHtcbiAgICBsZXQgcmVwczogSW5zdGFuY2VzID0ge307XG4gICAgaWYgKGZvcm0gPT0gbnVsbCkge1xuICAgICAgcmVzLnB1c2gobnVsbCBhcyB1bmtub3duIGFzIE1haW5Gb3JtKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGZvcm0ucmVwcyAhPSBudWxsKSB7XG4gICAgICAgIE9iamVjdC5rZXlzKGZvcm0ucmVwcykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAgIHJlcHNba2V5XSA9IGZvcm0ucmVwcyFba2V5XS5zbGljZSgwKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBjb25zdCBmID0gey4uLmZvcm0sIHJlcHN9O1xuICAgICAgcmVzLnB1c2goZik7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIHJlcztcbn1cbmV4cG9ydCBmdW5jdGlvbiBldmFsdWF0ZUV4cHJlc3Npb24oXG4gIGV4cHJlc3Npb246IHN0cmluZyxcbiAgY29udGV4dD86IEFqZkNvbnRleHQsXG4gIGZvcmNlRm9ybXVsYT86IHN0cmluZyxcbik6IGFueSB7XG4gIGxldCBmb3JtdWxhID0gZm9yY2VGb3JtdWxhIHx8IGV4cHJlc3Npb24gfHwgJyc7XG4gIGlmIChmb3JtdWxhID09PSAnJykge1xuICAgIHJldHVybiAnJztcbiAgfVxuICBpZiAoZm9ybXVsYSA9PT0gJ3RydWUnKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgaWYgKGZvcm11bGEgPT09ICdmYWxzZScpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKGNvbnRleHQgIT0gbnVsbCAmJiBjb250ZXh0W2Zvcm11bGFdICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gY29udGV4dFtmb3JtdWxhXTtcbiAgfVxuICBpZiAoL15cIlteXCJdKlwiJC8udGVzdChmb3JtdWxhKSkge1xuICAgIHJldHVybiBmb3JtdWxhLnJlcGxhY2UoL15cIit8XCIrJC9nLCAnJyk7XG4gIH1cbiAgY29uc3QgaWRlbnRpZmllcnMgPSBnZXRDb2RlSWRlbnRpZmllcnMoZm9ybXVsYSwgdHJ1ZSk7XG4gIGNvbnN0IGN0eDogYW55W10gPSBbXTtcbiAgaWRlbnRpZmllcnMuZm9yRWFjaCgoa2V5OiBzdHJpbmcpID0+IHtcbiAgICBsZXQgdmFsOiBhbnkgPSBudWxsO1xuICAgIGlmIChjb250ZXh0ICE9IG51bGwgJiYgY29udGV4dFtrZXldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHZhbCA9IGNvbnRleHRba2V5XTtcbiAgICB9IGVsc2UgaWYgKEFqZkV4cHJlc3Npb25VdGlscy51dGlsc1trZXldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnN0IHV0aWwgPSBBamZFeHByZXNzaW9uVXRpbHMudXRpbHNba2V5XTtcbiAgICAgIHZhbCA9IHV0aWwuZm47XG4gICAgfVxuICAgIGN0eC5wdXNoKHZhbCk7XG4gIH0pO1xuICBpZGVudGlmaWVycy5wdXNoKCdleGVjQ29udGV4dCcpO1xuICBjdHgucHVzaChleGVjQ29udGV4dCk7XG5cbiAgdHJ5IHtcbiAgICBsZXQgZiA9IG5ldyBGdW5jdGlvbiguLi5pZGVudGlmaWVycywgYHJldHVybiAke2Zvcm11bGF9YCk7XG4gICAgY29uc3QgcmVzID0gZiguLi5jdHgpO1xuICAgIGYgPSA8YW55Pm51bGw7XG4gICAgcmV0dXJuIHJlcztcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuLyoqXG4gKiBJdCByZXR1cm5zIHRoZSBjb3VudCBvZiBkaWdpdCBpbnNpZGUgeC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRpZ2l0Q291bnQoeDogbnVtYmVyKTogbnVtYmVyIHtcbiAgaWYgKGlzTmFOKHgpIHx8IHR5cGVvZiB4ICE9PSAnbnVtYmVyJykge1xuICAgIHJldHVybiAwO1xuICB9XG4gIGlmICghaXNGaW5pdGUoeCkpIHtcbiAgICByZXR1cm4gSW5maW5pdHk7XG4gIH1cbiAgcmV0dXJuIHgudG9TdHJpbmcoKS5yZXBsYWNlKC9bXjAtOV0vZywgJycpLmxlbmd0aDtcbn1cbi8qKlxuICogSXQgaXMgY291bnQgdGhlIGNvdW50IG9mIGRlY2ltYWwgZGlnaXQgaW5zaWRlIHMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZWNpbWFsQ291bnQoeDogc3RyaW5nIHwgbnVtYmVyKTogbnVtYmVyIHtcbiAgaWYgKHR5cGVvZiB4ID09PSAnc3RyaW5nJykge1xuICAgIHggPSBwYXJzZUZsb2F0KHgpO1xuICB9XG4gIGlmICh0eXBlb2YgeCAhPT0gJ251bWJlcicgfHwgaXNOYU4oeCkpIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuICBjb25zdCBwYXJ0cyA9IHgudG9TdHJpbmcoKS5zcGxpdCgnLicpO1xuICByZXR1cm4gcGFydHMubGVuZ3RoID4gMSA/IHBhcnRzWzFdLmxlbmd0aCA6IDA7XG59XG4vKipcbiAqIEl0IGlzIHRydWUgaWYgeCBpcyBhbiBpbnRlZ2VyLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNJbnQoeDogc3RyaW5nIHwgbnVtYmVyKTogYm9vbGVhbiB7XG4gIGlmICh0eXBlb2YgeCA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gL14tP1xcZCskLy50ZXN0KHgpO1xuICB9XG4gIGlmICh0eXBlb2YgeCA9PT0gJ251bWJlcicpIHtcbiAgICByZXR1cm4gTWF0aC5yb3VuZCh4KSA9PT0geDtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG4vKipcbiAqIEl0IGlzIHRydWUgaWYgeCBpcyBub3QgZW1wdHkuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBub3RFbXB0eSh4OiBhbnkpOiBib29sZWFuIHtcbiAgcmV0dXJuIHR5cGVvZiB4ICE9PSAndW5kZWZpbmVkJyAmJiB4ICE9PSBudWxsID8geC50b1N0cmluZygpLmxlbmd0aCA+IDAgOiBmYWxzZTtcbn1cbi8qKlxuICogSXQgaXMgdHJ1ZSBpZiBhcnJheSBjb250YWlucyB4IG9yIGFycmF5IGlzIGVxdWFsIHRvIHguXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB2YWx1ZUluQ2hvaWNlKGFycmF5OiBhbnlbXSwgeDogYW55KTogYm9vbGVhbiB7XG4gIHJldHVybiAoYXJyYXkgfHwgW10pLmluZGV4T2YoeCkgPiAtMSB8fCBhcnJheSA9PT0geDtcbn1cbi8qKlxuICogSXQgYXBwbGllcyBjYWxsYmFjayBmb3IgcmVwcyB0aW1lcyBhbmQgYWNjdW11bGF0ZSB0aGUgcmVzdWx0IGluIGFjYy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNjYW5Hcm91cEZpZWxkKHJlcHM6IG51bWJlciwgYWNjOiBhbnksIGNhbGxiYWNrOiBhbnkpOiBhbnkge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHJlcHM7IGkrKykge1xuICAgIGFjYyA9IGNhbGxiYWNrKGFjYywgaSk7XG4gIH1cbiAgcmV0dXJuIGFjYztcbn1cbi8qKlxuICogSXQgcmV0dXJucyB0aGUgc3VtIG9mIHRoZSBhcnJheSB2YWx1ZXMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdW0oYXJyYXk6IGFueVtdKTogYW55IHtcbiAgcmV0dXJuIGFycmF5LnJlZHVjZSgoYSwgYikgPT4gYSArIGIsIDApO1xufVxuLyoqXG4gKiBJdCBhcHBsaWVzIGFkZC9yZW1vdmUob3BlcmF0aW9uKSB2IChkYXkvbW9udGgveWVhcilwZXJpb2QgdG8gZHN0cmluZyBhbmQgcmV0dXJuIG5ldyBmb3JtYXQgZGF0ZS5cbiAqL1xuLy8gVE9ETyBjaGVjayBpZiBkZXByZWNhdGVkIGluc3RlYWQgcmVmYWNvdG9yaW5nIHBhcmFtZXRlciB0eXBlXG4vLyBUT0RPIChkU3RyaW5nOiBzdHJpbmd8bnVsbCwgcGVyaW9kOidkYXknfCdtb250aCd8J3llYXInLFxuLy8gVE9ETyBvcGVyYXRpb246ICdhZGQvcmVtb3ZlJyA9ICdhZGQnLCB2Om51bWJlcilcbmV4cG9ydCBmdW5jdGlvbiBkYXRlT3BlcmF0aW9ucyhkU3RyaW5nOiBzdHJpbmcsIHBlcmlvZDogc3RyaW5nLCBvcGVyYXRpb246IHN0cmluZywgdjogYW55KTogc3RyaW5nIHtcbiAgY29uc3QgZm10ID0gJ21tL2RkL3l5eXknO1xuICBsZXQgZCA9IHR5cGVvZiBkU3RyaW5nICE9PSAndW5kZWZpbmVkJyA/IGRhdGVVdGlscy5wYXJzZShkU3RyaW5nKSA6IG5ldyBEYXRlKCk7XG4gIGlmIChvcGVyYXRpb24gPT0gJ3JlbW92ZScpIHtcbiAgICB2ID0gLXY7XG4gIH1cbiAgbGV0IGRhdGVPcDtcbiAgc3dpdGNoIChwZXJpb2QpIHtcbiAgICBjYXNlICdkYXknOlxuICAgICAgZGF0ZU9wID0gZGF0ZVV0aWxzLmFkZERheXM7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdtb250aCc6XG4gICAgICBkYXRlT3AgPSBkYXRlVXRpbHMuYWRkTW9udGhzO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAneWVhcic6XG4gICAgICBkYXRlT3AgPSBkYXRlVXRpbHMuYWRkWWVhcnM7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuICcnO1xuICB9XG4gIHJldHVybiBkYXRlVXRpbHMuZm9ybWF0KGRhdGVPcChkLCB2KSwgZm10KTtcbn1cbi8qKlxuICogSXQgcm91bmRzIHRoZSBudW0gd2l0aCB0aGUgdmFsdWUgb2YgZGlnaXRzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByb3VuZChudW06IG51bWJlciB8IHN0cmluZywgZGlnaXRzPzogbnVtYmVyKTogbnVtYmVyIHtcbiAgZGlnaXRzID0gZGlnaXRzIHx8IDA7XG4gIGxldCBmO1xuICBpZiAodHlwZW9mIG51bSAhPT0gJ251bWJlcicpIHtcbiAgICB0cnkge1xuICAgICAgZiA9IHBhcnNlRmxvYXQobnVtKTtcbiAgICB9IGNhdGNoIChlKSB7fVxuICB9IGVsc2Uge1xuICAgIGYgPSBudW07XG4gIH1cbiAgaWYgKGYgPT0gbnVsbCB8fCBpc05hTihmKSkge1xuICAgIGYgPSAwO1xuICB9XG4gIGNvbnN0IG0gPSBNYXRoLnBvdygxMCwgZGlnaXRzKTtcbiAgcmV0dXJuIE1hdGgucm91bmQoZiAqIG0pIC8gbTtcbn1cbi8qKlxuICogSXQgZXh0cmFjdHMgcHJvcGVydHkgZnJvbSBzb3VyY2UuXG4gKiBmb3IgZXZlcnkgZWxlbWVudCBvZiBzb3VyY2UgaWYgcHJvcGVydHkgYW5kIHByb3BlcnR5MiBhcmUgZGVmaW5lZCByZXR1cm4gdGhlIHN1bVxuICogZWxzZSBpZiBvbmx5IHByb3BlcnR5IGlzIGRlZmluZWQgcmV0dXJuIGhpbS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGV4dHJhY3RBcnJheShzb3VyY2U6IGFueVtdLCBwcm9wZXJ0eTogc3RyaW5nLCBwcm9wZXJ0eTI/OiBzdHJpbmcpOiBhbnlbXSB7XG4gIHNvdXJjZSA9IChzb3VyY2UgfHwgW10pLnNsaWNlKDApO1xuICBjb25zdCBsID0gc291cmNlLmxlbmd0aDtcbiAgY29uc3QgcmVzOiBhbnlbXSA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGw7IGkrKykge1xuICAgIGlmIChzb3VyY2VbaV1bcHJvcGVydHldICE9IG51bGwgJiYgcHJvcGVydHkyICE9IG51bGwgJiYgc291cmNlW2ldW3Byb3BlcnR5Ml0gIT0gbnVsbCkge1xuICAgICAgcmVzLnB1c2goTnVtYmVyKHNvdXJjZVtpXVtwcm9wZXJ0eV0pICsgTnVtYmVyKHNvdXJjZVtpXVtwcm9wZXJ0eTJdKSk7XG4gICAgfSBlbHNlIGlmIChzb3VyY2VbaV1bcHJvcGVydHldICE9IG51bGwpIHtcbiAgICAgIHJlcy5wdXNoKHNvdXJjZVtpXVtwcm9wZXJ0eV0pO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzO1xufVxuLyoqXG4gKiBJdCByZXR1cm5zIHRoZSBzdW0gb2YgYWxsIGRlZmluZWQgcHJvcGVydGllcyBvZiBlYWNoIGVsZW1lbnQgb2Ygc291cmNlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZXh0cmFjdFN1bShzb3VyY2U6IGFueVtdLCBwcm9wZXJ0aWVzOiBzdHJpbmdbXSk6IG51bWJlciB7XG4gIGxldCBzdW1WYWwgPSAwO1xuICBwcm9wZXJ0aWVzID0gKHByb3BlcnRpZXMgfHwgW10pLnNsaWNlKDApO1xuICBjb25zdCBsID0gcHJvcGVydGllcy5sZW5ndGg7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsOyBpKyspIHtcbiAgICBjb25zdCBhcnJheSA9IGV4dHJhY3RBcnJheShzb3VyY2UsIHByb3BlcnRpZXNbaV0pO1xuICAgIGNvbnN0IGxlbmcgPSBhcnJheS5sZW5ndGg7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBsZW5nOyBqKyspIHtcbiAgICAgIGlmICghaXNOYU4oTnVtYmVyKGFycmF5W2pdKSkpIHtcbiAgICAgICAgc3VtVmFsICs9IE51bWJlcihhcnJheVtqXSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBzdW1WYWw7XG59XG4vKipcbiAqIEl0IHJldHVybnMgYSBudW1iZXIgYXJyYXkgdGhhdCBjb250YWlucyB0aGUgc3VtIG9mIHByb3BlcnRpZXMgdmFsdWUgaW5zaWRlIHRoZSBzb3VyY2UuXG4gKiBleHRyYWN0QXJyYXlTdW0oW3thOiA1fSwge2I6IDF9LCB7YTogNSwgYjogMX1dLCBbJ2EnLCAnYiddKTsgPSZndDsgWzYsNl1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGV4dHJhY3RBcnJheVN1bShzb3VyY2U6IGFueVtdLCBwcm9wZXJ0aWVzOiBzdHJpbmdbXSk6IGFueVtdIHtcbiAgY29uc3QgYXJyYXlzOiBhbnlbXSA9IFtdO1xuICBwcm9wZXJ0aWVzID0gKHByb3BlcnRpZXMgfHwgW10pLnNsaWNlKDApO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvcGVydGllcy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGFycmF5ID0gZXh0cmFjdEFycmF5KHNvdXJjZSwgcHJvcGVydGllc1tpXSk7XG4gICAgYXJyYXlzLnB1c2goYXJyYXkpO1xuICB9XG5cbiAgY29uc3QgcmVzOiBhbnlbXSA9IFtdO1xuICBpZiAoYXJyYXlzLmxlbmd0aCA+IDApIHtcbiAgICBmb3IgKGxldCB3ZWVrSSA9IDA7IHdlZWtJIDwgYXJyYXlzWzBdLmxlbmd0aDsgd2Vla0krKykge1xuICAgICAgbGV0IHN1bVZhbCA9IDA7XG4gICAgICBmb3IgKGxldCBwcm9wSSA9IDA7IHByb3BJIDwgcHJvcGVydGllcy5sZW5ndGg7IHByb3BJKyspIHtcbiAgICAgICAgc3VtVmFsID0gc3VtVmFsICsgTnVtYmVyKGFycmF5c1twcm9wSV1bd2Vla0ldKTtcbiAgICAgIH1cbiAgICAgIHJlcy5wdXNoKHN1bVZhbCk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXM7XG59XG4vKipcbiAqIERyYXcgYSB0aHJlc2hvbGQgbGluZSBvbiBjaGFydCByZWxhdGVkIHRvIHRoZSBwcm9wZXJ0eS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRyYXdUaHJlc2hvbGQoc291cmNlOiBhbnlbXSwgcHJvcGVydHk6IHN0cmluZywgdGhyZXNob2xkOiBhbnlbXSk6IGFueVtdIHtcbiAgc291cmNlID0gKHNvdXJjZSB8fCBbXSkuc2xpY2UoMCk7XG4gIHRocmVzaG9sZCA9IHRocmVzaG9sZCB8fCBbMF07XG4gIGlmICghKHRocmVzaG9sZCBpbnN0YW5jZW9mIEFycmF5KSkge1xuICAgIHRocmVzaG9sZCA9IFt0aHJlc2hvbGRdO1xuICB9XG4gIGNvbnN0IGwgPSBzb3VyY2UubGVuZ3RoO1xuICBjb25zdCByZXM6IGFueVtdID0gW107XG4gIGxldCBjb3VudCA9IDA7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbDsgaSsrKSB7XG4gICAgaWYgKHNvdXJjZVtpXVtwcm9wZXJ0eV0gIT0gbnVsbCkge1xuICAgICAgaWYgKHRocmVzaG9sZC5sZW5ndGggPiBjb3VudCkge1xuICAgICAgICByZXMucHVzaCh0aHJlc2hvbGRbY291bnRdKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlcy5wdXNoKHRocmVzaG9sZFswXSk7XG4gICAgICB9XG4gICAgICBjb3VudCsrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzO1xufVxuLyoqXG4gKiBFeHRyYWN0IHRoZSBkYXRlcyBvZiB0aGUgc291cmNlIG9iamVjdCB3aXRoIHByb3BlcnR5ICE9IG51bGxcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGV4dHJhY3REYXRlcyhzb3VyY2U6IGFueVtdLCBwcm9wZXJ0eTogc3RyaW5nLCBmbXQ6IHN0cmluZyk6IHN0cmluZ1tdIHtcbiAgc291cmNlID0gKHNvdXJjZSB8fCBbXSkuc2xpY2UoMCk7XG4gIGNvbnN0IGwgPSBzb3VyY2UubGVuZ3RoO1xuICBjb25zdCByZXM6IGFueSA9IFtdO1xuICBsZXQgcHJlZml4ID0gJyc7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbDsgaSsrKSB7XG4gICAgaWYgKHNvdXJjZVtpXVtwcm9wZXJ0eV0gIT0gbnVsbCkge1xuICAgICAgc3dpdGNoIChmbXQpIHtcbiAgICAgICAgY2FzZSAnV1cnOlxuICAgICAgICBjYXNlICd3dyc6XG4gICAgICAgICAgcHJlZml4ID0gJ1cnO1xuICAgICAgICAgIHJlcy5wdXNoKHByZWZpeCArIGZvcm1hdERhdGUoc291cmNlW2ldWydkYXRlX3N0YXJ0J10sIGZtdCkpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdNTSc6XG4gICAgICAgIGNhc2UgJ21tJzpcbiAgICAgICAgICBwcmVmaXggPSAnTSc7XG4gICAgICAgICAgcmVzLnB1c2gocHJlZml4ICsgaXNvTW9udGgoc291cmNlW2ldWydkYXRlX3N0YXJ0J10sIGZtdCkpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHByZWZpeCA9ICcnO1xuICAgICAgICAgIHJlcy5wdXNoKHByZWZpeCArIGZvcm1hdERhdGUoc291cmNlW2ldWydkYXRlX3N0YXJ0J10sIGZtdCkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzO1xufVxuLyoqXG4gKiBFeHRyYWN0IHRoZSBsYXN0IHByb3BlcnR5IGNvbnRhaW5zIGluIHNvdXJjZSAhPSBudWxsXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBsYXN0UHJvcGVydHkoc291cmNlOiBhbnksIHByb3BlcnR5OiBzdHJpbmcpOiBhbnkge1xuICBzb3VyY2UgPSAoc291cmNlIHx8IFtdKS5zbGljZSgwKTtcbiAgbGV0IGwgPSBzb3VyY2UubGVuZ3RoIC0gMTtcblxuICB3aGlsZSAobCA+PSAwICYmIHNvdXJjZVtsXVtwcm9wZXJ0eV0gPT0gbnVsbCkge1xuICAgIGwtLTtcbiAgICBpZiAobCA8IDApIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGwgPj0gMCA/IHNvdXJjZVtsXVtwcm9wZXJ0eV0gOiAnJztcbn1cbi8qKlxuICogSXQgc3VtIHRoZSBMQXN0IHByb3BlcnRpZXMgb2Ygc291cmNlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gc3VtTGFzdFByb3BlcnRpZXMoc291cmNlOiBhbnlbXSwgcHJvcGVydGllczogc3RyaW5nW10pOiBudW1iZXIge1xuICBzb3VyY2UgPSAoc291cmNlIHx8IFtdKS5zbGljZSgwKTtcbiAgbGV0IHN1bVZhbCA9IDA7XG4gIGxldCB2YWwgPSAwO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHByb3BlcnRpZXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YWwgPSBOdW1iZXIobGFzdFByb3BlcnR5KHNvdXJjZSwgcHJvcGVydGllc1tpXSkpO1xuICAgIGlmICghaXNOYU4odmFsKSkge1xuICAgICAgc3VtVmFsICs9IHZhbDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHN1bVZhbDtcbn1cbi8qKlxuICogQ29tcHV0ZSB0aGUgdHJlbmQgb2YgdGhlIHByb3BlcnR5IGNvbnRhaW5lZCBvbiB0aGUgc291cmNlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gY2FsY3VsYXRlVHJlbmRQcm9wZXJ0eShzb3VyY2U6IGFueVtdLCBwcm9wZXJ0eTogc3RyaW5nKTogc3RyaW5nIHtcbiAgc291cmNlID0gKHNvdXJjZSB8fCBbXSkuc2xpY2UoMCk7XG4gIGxldCBsYXN0ID0gc291cmNlLmxlbmd0aCAtIDE7XG4gIHdoaWxlIChzb3VyY2VbbGFzdF1bcHJvcGVydHldID09IG51bGwpIHtcbiAgICBpZiAobGFzdCA9PSAwKSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgbGFzdC0tO1xuICB9XG4gIGxldCBsYXN0TGFzdCA9IGxhc3QgLSAxO1xuICBpZiAobGFzdCA9PSAwKSB7XG4gICAgbGFzdExhc3QgPSBsYXN0O1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzb3VyY2VbbGFzdExhc3RdW3Byb3BlcnR5XSA9PSBudWxsKSB7XG4gICAgICBpZiAobGFzdExhc3QgPT0gMCkge1xuICAgICAgICBsYXN0TGFzdCA9IGxhc3Q7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgbGFzdExhc3QtLTtcbiAgICB9XG4gIH1cblxuICBjb25zdCBsYXN0UHJvcCA9IHNvdXJjZVtsYXN0XSA/IHNvdXJjZVtsYXN0XVtwcm9wZXJ0eV0gfHwgMCA6IDA7XG4gIGNvbnN0IGxhc3RMYXN0UHJvcCA9IHNvdXJjZVtsYXN0TGFzdF0gPyBzb3VyY2VbbGFzdExhc3RdW3Byb3BlcnR5XSB8fCAwIDogMDtcblxuICBpZiAobGFzdFByb3AgPT0gbGFzdExhc3RQcm9wKSB7XG4gICAgcmV0dXJuICc8cD48aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCIgc3R5bGU9XCJjb2xvcjpibHVlXCI+dHJlbmRpbmdfZmxhdDwvaT48L3A+JztcbiAgfSBlbHNlIGlmIChsYXN0UHJvcCA+IGxhc3RMYXN0UHJvcCkge1xuICAgIHJldHVybiAnPHA+PGkgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiIHN0eWxlPVwiY29sb3I6Z3JlZW5cIj50cmVuZGluZ191cDwvaT48L3A+JztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gJzxwPjxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIiBzdHlsZT1cImNvbG9yOnJlZFwiPnRyZW5kaW5nX2Rvd248L2k+PC9wPic7XG4gIH1cbn1cbi8qKlxuICogQ29tcHV0ZSB0aGUgYXZlcmFnZSB2YWx1ZSBvZiB0aGUgcHJvcGVydHkgY29udGFpbmVkIG9uIHRoZSBzb3VyY2UuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjYWxjdWxhdGVUcmVuZEJ5UHJvcGVydGllcyhzb3VyY2U6IGFueVtdLCBwcm9wZXJ0aWVzOiBzdHJpbmdbXSk6IHN0cmluZyB7XG4gIGNvbnN0IGFycmF5c3VtID0gZXh0cmFjdEFycmF5U3VtKHNvdXJjZSwgcHJvcGVydGllcyk7XG5cbiAgY29uc3QgbGFzdFByb3AgPSBhcnJheXN1bS5sZW5ndGggPiAwID8gYXJyYXlzdW1bYXJyYXlzdW0ubGVuZ3RoIC0gMV0gfHwgMCA6IDA7XG4gIGNvbnN0IGxhc3RMYXN0UHJvcCA9IGFycmF5c3VtLmxlbmd0aCA+IDEgPyBhcnJheXN1bVthcnJheXN1bS5sZW5ndGggLSAyXSB8fCAwIDogbGFzdFByb3A7XG5cbiAgaWYgKGxhc3RQcm9wID09IGxhc3RMYXN0UHJvcCkge1xuICAgIHJldHVybiAnPHA+PGkgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiIHN0eWxlPVwiY29sb3I6Ymx1ZVwiPnRyZW5kaW5nX2ZsYXQ8L2k+PC9wPic7XG4gIH0gZWxzZSBpZiAobGFzdFByb3AgPiBsYXN0TGFzdFByb3ApIHtcbiAgICByZXR1cm4gJzxwPjxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIiBzdHlsZT1cImNvbG9yOmdyZWVuXCI+dHJlbmRpbmdfdXA8L2k+PC9wPic7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuICc8cD48aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCIgc3R5bGU9XCJjb2xvcjpyZWRcIj50cmVuZGluZ19kb3duPC9pPjwvcD4nO1xuICB9XG59XG4vKipcbiAqXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjYWxjdWxhdGVBdmdQcm9wZXJ0eShcbiAgc291cmNlOiBhbnlbXSxcbiAgcHJvcGVydHk6IHN0cmluZyxcbiAgcmFuZ2U6IG51bWJlcixcbiAgY29lZmZpY2llbnQ6IG51bWJlcixcbik6IG51bWJlciB7XG4gIHNvdXJjZSA9IChzb3VyY2UgfHwgW10pLnNsaWNlKDApO1xuXG4gIGNvZWZmaWNpZW50ID0gY29lZmZpY2llbnQgfHwgMTtcbiAgcmFuZ2UgPSByYW5nZSB8fCAxMjtcblxuICBsZXQgbCA9IHNvdXJjZS5sZW5ndGg7XG4gIGxldCByZXMgPSAwO1xuICBsZXQgY291bnRlciA9IDA7XG4gIGxldCBub1plcm8gPSAwO1xuXG4gIGlmIChsIDwgcmFuZ2UpIHtcbiAgICByYW5nZSA9IGw7XG4gIH1cblxuICB3aGlsZSAocmFuZ2UgIT0gMCkge1xuICAgIGlmIChzb3VyY2VbbCAtIDFdW3Byb3BlcnR5XSAhPSBudWxsKSB7XG4gICAgICBjb3VudGVyKys7XG4gICAgICByZXMgKz0gTnVtYmVyKHNvdXJjZVtsIC0gMV1bcHJvcGVydHldKTtcblxuICAgICAgaWYgKHNvdXJjZVtsIC0gMV1bcHJvcGVydHldID4gMCkge1xuICAgICAgICBub1plcm8rKztcbiAgICAgIH1cbiAgICB9XG4gICAgbC0tO1xuICAgIHJhbmdlLS07XG4gIH1cblxuICBpZiAoY29lZmZpY2llbnQgPT0gMCkge1xuICAgIHJldHVybiBub1plcm87XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHJvdW5kKChyZXMgLyBjb3VudGVyKSAqIGNvZWZmaWNpZW50LCAyKSB8fCAwO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjYWxjdWxhdGVBdmdQcm9wZXJ0eUFycmF5KFxuICBzb3VyY2U6IGFueVtdLFxuICBwcm9wZXJ0aWVzOiBzdHJpbmdbXSxcbiAgcmFuZ2U6IG51bWJlcixcbiAgY29lZmZpY2llbnQ6IG51bWJlcixcbik6IG51bWJlcltdIHtcbiAgc291cmNlID0gKHNvdXJjZSB8fCBbXSkuc2xpY2UoMCk7XG4gIGNvbnN0IHJlc0FycjogYW55W10gPSBbXTtcblxuICBpZiAocHJvcGVydGllcyAmJiBwcm9wZXJ0aWVzLmxlbmd0aCA+IDApIHtcbiAgICBsZXQgYXZnID0gMDtcblxuICAgIGNvZWZmaWNpZW50ID0gY29lZmZpY2llbnQgfHwgMTtcbiAgICByYW5nZSA9IHJhbmdlIHx8IDEyO1xuXG4gICAgY29uc3Qgc291cmNlQXJyID1cbiAgICAgIHByb3BlcnRpZXMubGVuZ3RoID4gMVxuICAgICAgICA/IGV4dHJhY3RBcnJheVN1bShzb3VyY2UsIHByb3BlcnRpZXMpXG4gICAgICAgIDogZXh0cmFjdEFycmF5KHNvdXJjZSwgcHJvcGVydGllc1swXSk7XG5cbiAgICBsZXQgbCA9IHNvdXJjZUFyci5sZW5ndGg7XG5cbiAgICBmb3IgKGxldCBsZW4gPSBsOyBsZW4gPiAwOyBsZW4tLSkge1xuICAgICAgbGV0IHJlcyA9IDA7XG4gICAgICBsZXQgY291bnRlciA9IDA7XG4gICAgICBsZXQgbm9aZXJvID0gMDtcblxuICAgICAgaWYgKGxlbiA8IHJhbmdlKSB7XG4gICAgICAgIHJhbmdlID0gbGVuO1xuICAgICAgfVxuXG4gICAgICBmb3IgKGxldCByID0gMTsgciA8PSByYW5nZTsgcisrKSB7XG4gICAgICAgIGxldCB2YWwgPSBzb3VyY2VBcnJbbGVuIC0gcl07XG4gICAgICAgIGlmICh2YWwgIT0gbnVsbCkge1xuICAgICAgICAgIGNvdW50ZXIrKztcbiAgICAgICAgICByZXMgKz0gTnVtYmVyKHZhbCk7XG4gICAgICAgICAgaWYgKHZhbCA+IDApIHtcbiAgICAgICAgICAgIG5vWmVybysrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoY291bnRlciA+IDApIHtcbiAgICAgICAgaWYgKGNvZWZmaWNpZW50ID09IDApIHtcbiAgICAgICAgICBhdmcgPSBub1plcm87XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYXZnID0gKHJlcyAvIGNvdW50ZXIpICogY29lZmZpY2llbnQgfHwgMDtcbiAgICAgICAgfVxuICAgICAgICByZXNBcnIucHVzaChyb3VuZChhdmcsIDIpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc0Fyci5yZXZlcnNlKCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhbGVydChzb3VyY2U6IGFueVtdLCBwcm9wZXJ0eTogc3RyaW5nLCB0aHJlc2hvbGQ6IG51bWJlcik6IHN0cmluZyB7XG4gIHNvdXJjZSA9IChzb3VyY2UgfHwgW10pLnNsaWNlKDApO1xuXG4gIGlmIChsYXN0UHJvcGVydHkoc291cmNlLCBwcm9wZXJ0eSkgPiB0aHJlc2hvbGQpIHtcbiAgICByZXR1cm4gJzxwPjxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIiBzdHlsZT1cImNvbG9yOnJlZFwiPndhcm5pbmc8L2k+PC9wPic7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuICc8cD48L3A+JztcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0TnVtYmVyKG51bTogbnVtYmVyLCBmbXQ/OiBzdHJpbmcpOiBzdHJpbmcge1xuICBmbXQgPSBmbXQgfHwgJzAsMFsuXTAnO1xuICByZXR1cm4gbnVtYnJvKG51bSkuZm9ybWF0KGZtdCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXREYXRlKGRhdGU6IERhdGUgfCBzdHJpbmcsIGZtdD86IHN0cmluZyk6IHN0cmluZyB7XG4gIGZtdCA9IGZtdCB8fCAnbW0tREQteXl5eSc7XG4gIHJldHVybiBkYXRlVXRpbHMuZm9ybWF0KHR5cGVvZiBkYXRlID09PSAnc3RyaW5nJyA/IGRhdGVVdGlscy5wYXJzZShkYXRlKSA6IGRhdGUsIGZtdCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc29Nb250aChkYXRlOiBEYXRlLCBmbXQ/OiBzdHJpbmcpOiBzdHJpbmcge1xuICBmbXQgPSBmbXQgfHwgJ21tJztcbiAgY29uc3QgZHUgPSBkYXRlVXRpbHM7XG4gIHJldHVybiBkdS5mb3JtYXQoZHUuYWRkRGF5cyhkdS5zdGFydE9mSVNPV2VlayhkYXRlKSwgMyksIGZtdCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRDb29yZGluYXRlKHNvdXJjZTogYW55LCB6b29tPzogbnVtYmVyKTogW251bWJlciwgbnVtYmVyLCBudW1iZXJdIHtcbiAgem9vbSA9IHpvb20gfHwgNjtcbiAgaWYgKHNvdXJjZSA9PSBudWxsKSB7XG4gICAgcmV0dXJuIFs1MS41MDUsIC0wLjA5LCB6b29tXTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gW3NvdXJjZVswXSwgc291cmNlWzFdLCB6b29tXTtcbiAgfVxufVxuXG4vKipcbiAqIENhbGN1bGF0ZXMgYWxsIHRoZSBwb3NzaWJsZSByZXN1bHRzIHRoYXQgYSBmaWVsZCBoYXMgdGFrZW5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIEFMTF9WQUxVRVNfT0YobWFpbmZvcm1zOiBNYWluRm9ybVtdLCBmaWVsZE5hbWU6IHN0cmluZyk6IHN0cmluZ1tdIHtcbiAgY29uc3QgYWxscmVwcyA9IChtYWluZm9ybXMgfHwgW10pXG4gICAgLnNsaWNlKDApXG4gICAgLm1hcChtID0+IG0ucmVwcylcbiAgICAuZmlsdGVyKGMgPT4gYyAhPSBudWxsKVxuICAgIC5tYXAoKGk6IHVua25vd24pID0+XG4gICAgICBPYmplY3Qua2V5cyhpIGFzIEluc3RhbmNlcylcbiAgICAgICAgLm1hcChrID0+IChpIGFzIEluc3RhbmNlcylba10pXG4gICAgICAgIC5mbGF0KCksXG4gICAgKVxuICAgIC5mbGF0KCk7XG5cbiAgcmV0dXJuIFsuLi5uZXcgU2V0KGFsbHJlcHMuZmlsdGVyKGYgPT4gZltmaWVsZE5hbWVdICE9IG51bGwpLm1hcChmID0+IGAke2ZbZmllbGROYW1lXX1gKSldO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHBsYWluQXJyYXkocGFyYW1zOiBhbnlbXSk6IGFueVtdIHtcbiAgbGV0IHJlczogYW55W10gPSBbXTtcbiAgcGFyYW1zLmZvckVhY2gocGFyYW0gPT4ge1xuICAgIHBhcmFtID0gQXJyYXkuaXNBcnJheShwYXJhbSkgPyBwYXJhbSA6IFtwYXJhbV07XG4gICAgcmVzID0gWy4uLnJlcywgLi4ucGFyYW1dO1xuICB9KTtcblxuICByZXR1cm4gcmVzO1xufVxuLyoqXG4gKiBDb3VudHMgdGhlIGNvbGxlY3RlZCBmb3Jtcy4gVGhlIGZvcm0gbmFtZSBtdXN0IGJlIHNwZWNpZmllZC4gQW4gb3B0aW9uYWwgY29uZGl0aW9uIGNhbiBiZSBhZGRlZFxuICogdG8gZGlzY3JpbWluYXRlIHdoaWNoIGZvcm1zIHRvIGNvdW50IGluLlxuICogdGhlIGV4cHJlc3Npb24gaXMgZmlyc3QgZXZhbHVhdGVkIGluIG1haW5Gb3JtIGlmIGZhbHNlIHRoZSBldmFsdWF0aW9uIG9mIGV4cHJlc3Npb24gaXMgY2FsY3VsYXRlZFxuICogaW4gYW55IHJlcHMuIElmIGV4cHJlc3Npb24gaXMgdHJ1ZSBpbiByZXBzIHRoZSBmb3JtIGlzIGNvdW50ZWRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIENPVU5UX0ZPUk1TKGZvcm1MaXN0OiBNYWluRm9ybVtdLCBleHByZXNzaW9uOiBzdHJpbmcgPSAndHJ1ZScpOiBudW1iZXIge1xuICAvLyBjb25zdCBmb3JtczogTWFpbkZvcm1bXSA9IGRlZXBDb3B5KGZvcm1MaXN0KS5maWx0ZXIoKGY6IE1haW5Gb3JtKSA9PiBmICE9IG51bGwpO1xuICBjb25zdCBmb3JtczogTWFpbkZvcm1bXSA9IChmb3JtTGlzdCB8fCBbXSkuc2xpY2UoMCkuZmlsdGVyKChmOiBNYWluRm9ybSkgPT4gZiAhPSBudWxsKTtcbiAgY29uc3QgaWRlbnRpZmllcnMgPSBbLi4ubmV3IFNldChnZXRDb2RlSWRlbnRpZmllcnMoZXhwcmVzc2lvbiwgdHJ1ZSkpXTtcbiAgbGV0IGNvdW50ID0gMDtcbiAgaWYgKGV4cHJlc3Npb24gPT09ICd0cnVlJykge1xuICAgIHJldHVybiBmb3Jtcy5sZW5ndGg7XG4gIH1cbiAgaWYgKGZvcm1zLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiAwO1xuICB9XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZm9ybXMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBtYWluRm9ybSA9IGZvcm1zW2ldO1xuICAgIGxldCBleHhwciA9IGV4cHJlc3Npb247XG4gICAgaWRlbnRpZmllcnMuZm9yRWFjaChpZGVudGlmaWVyID0+IHtcbiAgICAgIGNvbnN0IGNoYW5nZSA9IG1haW5Gb3JtW2lkZW50aWZpZXJdID8gbWFpbkZvcm1baWRlbnRpZmllcl0gOiBudWxsO1xuICAgICAgaWYgKGNoYW5nZSAhPSBudWxsKSB7XG4gICAgICAgIGV4eHByID0gZXh4cHIuc3BsaXQoaWRlbnRpZmllcikuam9pbihKU09OLnN0cmluZ2lmeShjaGFuZ2UgYXMgc3RyaW5nKSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKG1haW5Gb3JtLnJlcHMgIT0gbnVsbCkge1xuICAgICAgY29uc3QgYWxscmVwczogbnVtYmVyID0gT2JqZWN0LmtleXMobWFpbkZvcm0ucmVwcylcbiAgICAgICAgLm1hcCgoa2V5OiBzdHJpbmcpID0+IChtYWluRm9ybS5yZXBzIGFzIEluc3RhbmNlcylba2V5XSlcbiAgICAgICAgLmZsYXQoKVxuICAgICAgICAubWFwKChjaGlsZDogRm9ybSkgPT4gZXZhbHVhdGVFeHByZXNzaW9uKGV4eHByLCBjaGlsZCkpXG4gICAgICAgIC5yZWR1Y2UoKGEsIGIpID0+IChhICs9ICtiKSwgMCk7XG4gICAgICBpZiAoYWxscmVwcyA+IDApIHtcbiAgICAgICAgY291bnQrKztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoZXZhbHVhdGVFeHByZXNzaW9uKGV4eHByLCBtYWluRm9ybSkpIHtcbiAgICAgIGNvdW50Kys7XG4gICAgfVxuICB9XG4gIHJldHVybiBjb3VudDtcbn1cbi8qKlxuICogQ291bnRzIHRoZSByZXBzIG9mIHRoZSBmb3JtLlxuICogdGhlIGV4cHJlc3Npb24gaXMgZmlyc3QgZXZhbHVhdGVkIGluIG1haW5Gb3JtICBpZiB0cnVlIHJldHVybiBhbGwgcmVwcyBjb3VudGluZyBlbHNlIHRoZSBldmFsdWF0aW9uIG9mIGV4cHJlc3Npb24gaXMgY2FsY3VsYXRlZFxuICogaW4gYW55IHJlcHMgYW5kIHJldHVybiB0aGUgY291bnQgb2YgYWxsIHJlcHMgdGhhdCBzYXRpc2ZpZWQgdGhlIGV4cHJlc3Npb24uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBDT1VOVF9SRVBTKGZvcm1MaXN0OiBNYWluRm9ybVtdLCBleHByZXNzaW9uOiBzdHJpbmcgPSAndHJ1ZScpOiBudW1iZXIge1xuICBjb25zdCBmb3JtczogTWFpbkZvcm1bXSA9IGNsb25lTWFpbkZvcm1zKGZvcm1MaXN0KS5maWx0ZXIoKGY6IE1haW5Gb3JtKSA9PiBmICE9IG51bGwpO1xuICBjb25zdCBpZGVudGlmaWVycyA9IGdldENvZGVJZGVudGlmaWVycyhleHByZXNzaW9uLCB0cnVlKTtcbiAgbGV0IGV4eHByID0gZXhwcmVzc2lvbjtcbiAgbGV0IGNvdW50ID0gMDtcblxuICBpZiAoZm9ybXMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBmb3Jtcy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IG1haW5Gb3JtID0gZm9ybXNbaV07XG4gICAgaWYgKG1haW5Gb3JtLnJlcHMgIT0gbnVsbCkge1xuICAgICAgY29uc3QgYWxscmVwczogRm9ybVtdID0gT2JqZWN0LmtleXMobWFpbkZvcm0ucmVwcylcbiAgICAgICAgLm1hcCgoa2V5OiBzdHJpbmcpID0+IChtYWluRm9ybS5yZXBzIGFzIEluc3RhbmNlcylba2V5XSlcbiAgICAgICAgLmZsYXQoKTtcbiAgICAgIGFsbHJlcHMuZm9yRWFjaCgoY2hpbGQ6IEZvcm0pID0+IHtcbiAgICAgICAgaWYgKGV2YWx1YXRlRXhwcmVzc2lvbihleHByZXNzaW9uLCBjaGlsZCkpIHtcbiAgICAgICAgICBjb3VudCsrO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZGVudGlmaWVycy5mb3JFYWNoKGlkZW50aWZpZXIgPT4ge1xuICAgICAgY29uc3QgY2hhbmdlID0gbWFpbkZvcm1baWRlbnRpZmllcl0gPyBtYWluRm9ybVtpZGVudGlmaWVyXSA6IG51bGw7XG4gICAgICBpZiAoY2hhbmdlKSB7XG4gICAgICAgIGV4eHByID0gZXhwcmVzc2lvbi5zcGxpdChpZGVudGlmaWVyKS5qb2luKEpTT04uc3RyaW5naWZ5KGNoYW5nZSBhcyBzdHJpbmcpKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAoZXZhbHVhdGVFeHByZXNzaW9uKGV4eHByLCBtYWluRm9ybSkpIHtcbiAgICAgIGNvdW50Kys7XG4gICAgfVxuICB9XG4gIHJldHVybiBjb3VudDtcbn1cblxuLyoqXG4gKiBDb3VudHMgdGhlIGFtb3VudCBvZiB1bmlxdWUgZm9ybSB2YWx1ZXMgZm9yIGEgc3BlY2lmaWMgZmllbGQuIFRoZSBmb3JtIG5hbWUgbXVzdCBiZSBzcGVjaWZpZWQuIEFuXG4gKiBvcHRpb25hbCBjb25kaXRpb24gY2FuIGJlIGFkZGVkIHRvIGRpc2NyaW1pbmF0ZSB3aGljaCBmb3JtcyB0byBjb3VudCBpblxuICovXG5leHBvcnQgZnVuY3Rpb24gQ09VTlRfRk9STVNfVU5JUVVFKFxuICBmb3JtTGlzdDogTWFpbkZvcm1bXSxcbiAgZmllbGROYW1lOiBzdHJpbmcsXG4gIGV4cHJlc3Npb246IHN0cmluZyA9ICd0cnVlJyxcbik6IG51bWJlciB7XG4gIGNvbnN0IGZvcm1zOiBNYWluRm9ybVtdID0gKGZvcm1MaXN0IHx8IFtdKS5zbGljZSgwKS5maWx0ZXIoKGY6IE1haW5Gb3JtKSA9PiBmICE9IG51bGwpO1xuICBjb25zdCBpZGVudGlmaWVycyA9IFsuLi5uZXcgU2V0KGdldENvZGVJZGVudGlmaWVycyhleHByZXNzaW9uLCB0cnVlKSldO1xuICBsZXQgdmFsdWVzOiBhbnlbXSA9IFtdO1xuXG4gIGlmIChmb3Jtcy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuICBmb3IgKGxldCBpID0gMDsgaSA8IGZvcm1zLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgbWFpbkZvcm0gPSBmb3Jtc1tpXTtcbiAgICBsZXQgZXh4cHIgPSBleHByZXNzaW9uO1xuICAgIGlkZW50aWZpZXJzLmZvckVhY2goaWRlbnRpZmllciA9PiB7XG4gICAgICBjb25zdCBjaGFuZ2UgPSBtYWluRm9ybVtpZGVudGlmaWVyXSA/IG1haW5Gb3JtW2lkZW50aWZpZXJdIDogbnVsbDtcbiAgICAgIGlmIChjaGFuZ2UgIT0gbnVsbCkge1xuICAgICAgICBleHhwciA9IGV4eHByLnNwbGl0KGlkZW50aWZpZXIpLmpvaW4oSlNPTi5zdHJpbmdpZnkoY2hhbmdlIGFzIHN0cmluZykpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmIChtYWluRm9ybS5yZXBzICE9IG51bGwpIHtcbiAgICAgIGNvbnN0IGZpZWxkTmFtZUluTWFpbiA9IGV2YWx1YXRlRXhwcmVzc2lvbihmaWVsZE5hbWUsIG1haW5Gb3JtKTtcbiAgICAgIGNvbnN0IGFsbHJlcHM6IGFueVtdID0gT2JqZWN0LmtleXMobWFpbkZvcm0ucmVwcylcbiAgICAgICAgLm1hcCgoa2V5OiBzdHJpbmcpID0+IChtYWluRm9ybS5yZXBzIGFzIEluc3RhbmNlcylba2V5XSlcbiAgICAgICAgLmZsYXQoKVxuICAgICAgICAuZmlsdGVyKChjaGlsZDogRm9ybSkgPT4gZXZhbHVhdGVFeHByZXNzaW9uKGV4eHByLCBjaGlsZCkpXG4gICAgICAgIC5tYXAoKGNoaWxkOiBGb3JtKSA9PlxuICAgICAgICAgIGZpZWxkTmFtZUluTWFpbiAhPSBudWxsID8gZmllbGROYW1lSW5NYWluIDogZXZhbHVhdGVFeHByZXNzaW9uKGZpZWxkTmFtZSwgY2hpbGQpLFxuICAgICAgICApO1xuICAgICAgaWYgKGFsbHJlcHMubGVuZ3RoID4gMCkge1xuICAgICAgICB2YWx1ZXMgPSBbLi4udmFsdWVzLCAuLi5hbGxyZXBzXTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGV2YWx1YXRlRXhwcmVzc2lvbihleHhwciwgbWFpbkZvcm0pKSB7XG4gICAgICBjb25zdCBtVmFsdWUgPSBldmFsdWF0ZUV4cHJlc3Npb24oZmllbGROYW1lLCBtYWluRm9ybSk7XG4gICAgICBpZiAobVZhbHVlICE9IG51bGwpIHtcbiAgICAgICAgdmFsdWVzLnB1c2gobVZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIFsuLi5uZXcgU2V0KHZhbHVlcyldLmxlbmd0aDtcbn1cblxuLyoqXG4gKiBBZ2dyZWdhdGVzIGFuZCBzdW1zIHRoZSB2YWx1ZXMgb2Ygb25lIG9yIG1vcmUuIEFuIG9wdGlvbmFsIGNvbmRpdGlvbiBjYW4gYmUgYWRkZWQgdG8gZGlzY3JpbWluYXRlXG4gKiB3aGljaCBmb3JtcyB0byB0YWtlIGZvciB0aGUgc3VtLlxuICovXG5leHBvcnQgZnVuY3Rpb24gU1VNKG1haW5Gb3JtczogKE1haW5Gb3JtIHwgRm9ybSlbXSwgZmllbGQ6IHN0cmluZywgY29uZGl0aW9uID0gJ3RydWUnKTogbnVtYmVyIHtcbiAgLy8gY29uc3QgZm9ybXM6IE1haW5Gb3JtW10gPSBkZWVwQ29weShtYWluRm9ybXMpLmZpbHRlcigoZjogTWFpbkZvcm0pID0+IGYgIT0gbnVsbCk7XG4gIGNvbnN0IGZvcm1zOiAoTWFpbkZvcm0gfCBGb3JtKVtdID0gKG1haW5Gb3JtcyB8fCBbXSlcbiAgICAuc2xpY2UoMClcbiAgICAuZmlsdGVyKChmOiBNYWluRm9ybSB8IEZvcm0pID0+IGYgIT0gbnVsbCk7XG4gIGNvbnN0IGlkZW50aWZpZXJzID0gZ2V0Q29kZUlkZW50aWZpZXJzKGNvbmRpdGlvbiwgdHJ1ZSk7XG4gIGxldCBleHhwciA9IGNvbmRpdGlvbjtcbiAgbGV0IGNvdW50ID0gMDtcblxuICBpZiAoZm9ybXMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBmb3Jtcy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IG1haW5Gb3JtID0gZm9ybXNbaV07XG4gICAgaWYgKG1haW5Gb3JtLnJlcHMgIT0gbnVsbCkge1xuICAgICAgY29uc3QgYWxscmVwczogRm9ybVtdID0gT2JqZWN0LmtleXMobWFpbkZvcm0ucmVwcylcbiAgICAgICAgLm1hcCgoa2V5OiBzdHJpbmcpID0+IChtYWluRm9ybS5yZXBzIGFzIEluc3RhbmNlcylba2V5XSlcbiAgICAgICAgLmZsYXQoKTtcbiAgICAgIGFsbHJlcHNcbiAgICAgICAgLmZpbHRlcihjID0+IGNbZmllbGRdICE9IG51bGwpXG4gICAgICAgIC5mb3JFYWNoKChjaGlsZDogRm9ybSkgPT4ge1xuICAgICAgICAgIGlmIChldmFsdWF0ZUV4cHJlc3Npb24oY29uZGl0aW9uLCBjaGlsZCkpIHtcbiAgICAgICAgICAgIGNvdW50ICs9ICsoY2hpbGRbZmllbGRdIGFzIG51bWJlcikgfHwgMDtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGlkZW50aWZpZXJzLmZvckVhY2goaWRlbnRpZmllciA9PiB7XG4gICAgICBjb25zdCBjaGFuZ2UgPSBtYWluRm9ybVtpZGVudGlmaWVyXSA/IG1haW5Gb3JtW2lkZW50aWZpZXJdIDogbnVsbDtcbiAgICAgIGlmIChjaGFuZ2UpIHtcbiAgICAgICAgZXh4cHIgPSBjb25kaXRpb24uc3BsaXQoaWRlbnRpZmllcikuam9pbihKU09OLnN0cmluZ2lmeShjaGFuZ2UpIGFzIHN0cmluZyk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKGV2YWx1YXRlRXhwcmVzc2lvbihleHhwciwgbWFpbkZvcm0pICYmIG1haW5Gb3JtW2ZpZWxkXSAhPSBudWxsKSB7XG4gICAgICBjb3VudCArPSArKG1haW5Gb3JtW2ZpZWxkXSBhcyBudW1iZXIpIHx8IDA7XG4gICAgfVxuICB9XG4gIHJldHVybiBjb3VudDtcbn1cblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBtZWFuIG9mIGEgc2ltcGxlIG9yIGRlcml2ZWQgdmFsdWUuIEFuIG9wdGlvbmFsIGNvbmRpdGlvbiBjYW4gYmUgYWRkZWQgdG9cbiAqIGRpc2NyaW1pbmF0ZSB3aGljaCBmb3JtcyB0byB0YWtlIGZvciB0aGUgc3VtLlxuICovXG5leHBvcnQgZnVuY3Rpb24gTUVBTihmb3JtczogKEZvcm0gfCBNYWluRm9ybSlbXSwgZmllbGROYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xuICBmb3JtcyA9IChmb3JtcyB8fCBbXSkuc2xpY2UoMCk7XG4gIGZpZWxkTmFtZSA9IGZpZWxkTmFtZSB8fCAnJztcbiAgbGV0IGxlbmd0aCA9IDA7XG4gIGxldCBhY2MgPSAwO1xuICBmb3Jtcy5mb3JFYWNoKGZvcm0gPT4ge1xuICAgIGlmIChmb3JtW2ZpZWxkTmFtZV0gPT0gbnVsbCAmJiBmb3JtLnJlcHMgIT0gbnVsbCkge1xuICAgICAgT2JqZWN0LmtleXMoZm9ybS5yZXBzIGFzIEluc3RhbmNlcykuZm9yRWFjaChyZXAgPT4ge1xuICAgICAgICAoKGZvcm0ucmVwcyBhcyBJbnN0YW5jZXMpW3JlcF0gYXMgRm9ybVtdKS5mb3JFYWNoKHJmb3JtID0+IHtcbiAgICAgICAgICBjb25zdCByc1ZhbCA9IHJmb3JtW2ZpZWxkTmFtZV07XG4gICAgICAgICAgaWYgKHJzVmFsICE9IG51bGwpIHtcbiAgICAgICAgICAgIGFjYyArPSBldmFsdWF0ZUV4cHJlc3Npb24oYCR7cnNWYWx9YCwgZm9ybSk7XG4gICAgICAgICAgICBsZW5ndGgrKztcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFjYyArPSBldmFsdWF0ZUV4cHJlc3Npb24oZmllbGROYW1lLCBmb3JtKTtcbiAgICAgIGxlbmd0aCsrO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBgJHtST1VORChhY2MgLyBsZW5ndGgpfWA7XG59XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgJSBiZXR3ZWVuIHR3byBtZW1iZXJzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gUEVSQ0VOVCh2YWx1ZTE6IG51bWJlciwgdmFsdWUyOiBudW1iZXIpOiBzdHJpbmcge1xuICBjb25zdCByZXMgPSAoK3ZhbHVlMSAqIDEwMCkgLyArdmFsdWUyO1xuICByZXR1cm4gTnVtYmVyLmlzRmluaXRlKHJlcykgPyBgJHtST1VORChyZXMpfSVgIDogJ2luZmluaXRlJztcbn1cblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBleHByZXNzaW9uIGluIHRoZSBsYXN0IGZvcm0gYnkgZGF0ZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIExBU1QoZm9ybXM6IChGb3JtIHwgTWFpbkZvcm0pW10sIGV4cHJlc3Npb246IHN0cmluZywgZGF0ZSA9ICdkYXRlX2VuZCcpOiBzdHJpbmcge1xuICBmb3JtcyA9IChmb3JtcyB8fCBbXSkuc2xpY2UoMCkuc29ydCgoYSwgYikgPT4ge1xuICAgIGNvbnN0IGRhdGVBID0gbmV3IERhdGUoYltkYXRlXSBhcyBzdHJpbmcpLmdldFRpbWUoKTtcbiAgICBjb25zdCBkYXRlQiA9IG5ldyBEYXRlKGFbZGF0ZV0gYXMgc3RyaW5nKS5nZXRUaW1lKCk7XG4gICAgcmV0dXJuIGRhdGVBIC0gZGF0ZUI7XG4gIH0pO1xuICBpZiAoZm9ybXMubGVuZ3RoID4gMCAmJiBleHByZXNzaW9uICE9IG51bGwpIHtcbiAgICBjb25zdCBpZGVudGlmaWVycyA9IGdldENvZGVJZGVudGlmaWVycyhleHByZXNzaW9uLCB0cnVlKTtcbiAgICBjb25zdCBsYXN0Rm9ybSA9IGZvcm1zW2Zvcm1zLmxlbmd0aCAtIDFdIHx8IFtdO1xuICAgIGxldCBleHhwciA9IGV4cHJlc3Npb247XG4gICAgaWRlbnRpZmllcnMuZm9yRWFjaChpZGVudGlmaWVyID0+IHtcbiAgICAgIGNvbnN0IGNoYW5nZSA9IGxhc3RGb3JtW2lkZW50aWZpZXJdID8gbGFzdEZvcm1baWRlbnRpZmllcl0gOiBudWxsO1xuICAgICAgaWYgKGNoYW5nZSAhPSBudWxsKSB7XG4gICAgICAgIGV4eHByID0gZXh4cHIuc3BsaXQoaWRlbnRpZmllcikuam9pbihjaGFuZ2UgYXMgc3RyaW5nKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBjb25zdCBmb3JtRXZhbCA9IGV2YWx1YXRlRXhwcmVzc2lvbihleHByZXNzaW9uLCBsYXN0Rm9ybSk7XG4gICAgaWYgKGZvcm1FdmFsID09IGZhbHNlICYmIGxhc3RGb3JtLnJlcHMgIT0gbnVsbCkge1xuICAgICAgY29uc3QgYWxscmVwczogbnVtYmVyID0gT2JqZWN0LmtleXMobGFzdEZvcm0ucmVwcylcbiAgICAgICAgLm1hcCgoa2V5OiBzdHJpbmcpID0+IChsYXN0Rm9ybS5yZXBzIGFzIEluc3RhbmNlcylba2V5XSlcbiAgICAgICAgLmZsYXQoKVxuICAgICAgICAubWFwKChyZXA6IEZvcm0pID0+IGV2YWx1YXRlRXhwcmVzc2lvbihleHhwciwgcmVwKSlcbiAgICAgICAgLnJlZHVjZSgoYSwgYikgPT4gKGEgKz0gK2IpLCAwKTtcbiAgICAgIGlmIChhbGxyZXBzID4gMCkge1xuICAgICAgICByZXR1cm4gYCR7YWxscmVwc31gO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZm9ybUV2YWw7XG4gIH1cbiAgcmV0dXJuICcwJztcbn1cblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBtYXggdmFsdWUgb2YgdGhlIGZpZWxkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gTUFYKGZvcm1zOiAoRm9ybSB8IE1haW5Gb3JtKVtdLCBmaWVsZE5hbWU6IHN0cmluZyk6IG51bWJlciB7XG4gIGZvcm1zID0gKGZvcm1zIHx8IFtdKS5zbGljZSgwKTtcbiAgbGV0IG1heCA9IDA7XG4gIGZvcm1zLmZvckVhY2goZm9ybSA9PiB7XG4gICAgaWYgKGZvcm1bZmllbGROYW1lXSA9PSBudWxsICYmIGZvcm0ucmVwcyAhPSBudWxsKSB7XG4gICAgICBPYmplY3Qua2V5cyhmb3JtLnJlcHMgYXMgSW5zdGFuY2VzKS5mb3JFYWNoKHJlcCA9PiB7XG4gICAgICAgICgoZm9ybS5yZXBzIGFzIEluc3RhbmNlcylbcmVwXSBhcyBGb3JtW10pLmZvckVhY2goX3Jmb3JtID0+IHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBmb3JtW2ZpZWxkTmFtZV0gIT0gbnVsbCAmJlxuICAgICAgICAgICAgIWlzTmFOKGZvcm1bZmllbGROYW1lXSBhcyBudW1iZXIpICYmXG4gICAgICAgICAgICAoZm9ybVtmaWVsZE5hbWVdIGFzIG51bWJlcikgPiBtYXhcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIG1heCA9IGZvcm1bZmllbGROYW1lXSBhcyBudW1iZXI7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoXG4gICAgICAgIGZvcm1bZmllbGROYW1lXSAhPSBudWxsICYmXG4gICAgICAgICFpc05hTihmb3JtW2ZpZWxkTmFtZV0gYXMgbnVtYmVyKSAmJlxuICAgICAgICAoZm9ybVtmaWVsZE5hbWVdIGFzIG51bWJlcikgPiBtYXhcbiAgICAgICkge1xuICAgICAgICBtYXggPSBmb3JtW2ZpZWxkTmFtZV0gYXMgbnVtYmVyO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG4gIHJldHVybiBtYXg7XG59XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgbWVkaWFuIHZhbHVlIG9mIHRoZSBmaWVsZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIE1FRElBTihmb3JtczogKEZvcm0gfCBNYWluRm9ybSlbXSwgZmllbGROYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xuICBmb3JtcyA9IChmb3JtcyB8fCBbXSkuc2xpY2UoMCk7XG4gIGxldCBudW1iZXJzOiBudW1iZXJbXSA9IFtdO1xuICBmb3Jtcy5mb3JFYWNoKGZvcm0gPT4ge1xuICAgIGlmIChmb3JtW2ZpZWxkTmFtZV0gPT0gbnVsbCAmJiBmb3JtLnJlcHMgIT0gbnVsbCkge1xuICAgICAgT2JqZWN0LmtleXMoZm9ybS5yZXBzIGFzIEluc3RhbmNlcykuZm9yRWFjaChyZXAgPT4ge1xuICAgICAgICAoKGZvcm0ucmVwcyBhcyBJbnN0YW5jZXMpW3JlcF0gYXMgRm9ybVtdKS5mb3JFYWNoKHJmb3JtID0+IHtcbiAgICAgICAgICBpZiAocmZvcm1bZmllbGROYW1lXSAhPSBudWxsKSB7XG4gICAgICAgICAgICBudW1iZXJzLnB1c2gocmZvcm1bZmllbGROYW1lXSBhcyBudW1iZXIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgbnVtYmVycy5wdXNoKChmb3JtIGFzIEZvcm0pW2ZpZWxkTmFtZV0gYXMgbnVtYmVyKTtcbiAgICB9XG4gIH0pO1xuXG4gIG51bWJlcnMgPSBudW1iZXJzLnNvcnQoKGEsIGIpID0+IGEgLSBiKS5maWx0ZXIoKGl0ZW0sIHBvcywgc2VsZikgPT4gc2VsZi5pbmRleE9mKGl0ZW0pID09IHBvcyk7XG4gIGNvbnN0IHJlcyA9IE51bWJlci5pc0ludGVnZXIobnVtYmVycy5sZW5ndGggLyAyKVxuICAgID8gbnVtYmVyc1tudW1iZXJzLmxlbmd0aCAvIDJdXG4gICAgOiAobnVtYmVyc1srcGFyc2VJbnQoYCR7bnVtYmVycy5sZW5ndGggLSAxIC8gMn1gKSAvIDJdICtcbiAgICAgICAgbnVtYmVyc1srcGFyc2VJbnQoYCR7bnVtYmVycy5sZW5ndGggLSAxIC8gMn1gKSAvIDIgKyAxXSkgL1xuICAgICAgMjtcblxuICByZXR1cm4gYCR7Uk9VTkQocmVzKX1gO1xufVxuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIG1vZGUgdmFsdWUgb2YgdGhlIGZpZWxkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gTU9ERShmb3JtczogKEZvcm0gfCBNYWluRm9ybSlbXSwgZmllbGROYW1lOiBzdHJpbmcpOiBudW1iZXJbXSB7XG4gIGZvcm1zID0gKGZvcm1zIHx8IFtdKS5zbGljZSgwKTtcbiAgbGV0IG1heENvdW50ID0gMDtcbiAgY29uc3QgbWFwOiB7W2tleTogbnVtYmVyXTogbnVtYmVyfSA9IHt9O1xuICBmb3Jtcy5mb3JFYWNoKGYgPT4ge1xuICAgIGlmIChmW2ZpZWxkTmFtZV0gPT0gbnVsbCAmJiBmLnJlcHMgIT0gbnVsbCkge1xuICAgICAgT2JqZWN0LmtleXMoZilcbiAgICAgICAgLmZpbHRlcihrZXkgPT4ga2V5LmluY2x1ZGVzKGZpZWxkTmFtZSkpXG4gICAgICAgIC5mb3JFYWNoKHJzRmllbGQgPT4ge1xuICAgICAgICAgIGNvbnN0IHZhbHVlID0gZltyc0ZpZWxkXSBhcyBudW1iZXI7XG4gICAgICAgICAgaWYgKHZhbHVlICE9IG51bGwpIHtcbiAgICAgICAgICAgIG1hcFt2YWx1ZV0gPSBtYXBbdmFsdWVdICE9IG51bGwgPyBtYXBbdmFsdWVdICsgMSA6IDE7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChtYXBbdmFsdWVdID4gbWF4Q291bnQpIHtcbiAgICAgICAgICAgIG1heENvdW50ID0gbWFwW3ZhbHVlXTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCB2YWx1ZSA9IGZbZmllbGROYW1lXSBhcyBudW1iZXI7XG4gICAgICBpZiAodmFsdWUgIT0gbnVsbCkge1xuICAgICAgICBtYXBbdmFsdWVdID0gbWFwW3ZhbHVlXSAhPSBudWxsID8gbWFwW3ZhbHVlXSArIDEgOiAxO1xuICAgICAgfVxuICAgICAgaWYgKG1hcFt2YWx1ZV0gPiBtYXhDb3VudCkge1xuICAgICAgICBtYXhDb3VudCA9IG1hcFt2YWx1ZV07XG4gICAgICB9XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIE9iamVjdC5rZXlzKG1hcClcbiAgICAuZmlsdGVyKHYgPT4gbWFwWyt2XSA9PT0gbWF4Q291bnQpXG4gICAgLm1hcCh2ID0+ICt2KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkRGF0YXNldChcbiAgZGF0YXNldDogKHN0cmluZyB8IG51bWJlciB8IHN0cmluZ1tdIHwgbnVtYmVyW10pW10sXG4gIGNvbHNwYW5zOiBudW1iZXJbXSxcbik6IEFqZlRhYmxlQ2VsbFtdW10ge1xuICBjb25zdCByZXM6IEFqZlRhYmxlQ2VsbFtdW10gPSBbXTtcbiAgY29uc3Qgbm9ybWFsaXplRGF0YXNldDogYW55W11bXSA9IFtdO1xuICBkYXRhc2V0LmZvckVhY2goKHJvdzogYW55LCBpbmRleFJvdzogbnVtYmVyKSA9PiB7XG4gICAgcm93ID0gQXJyYXkuaXNBcnJheShyb3cpID8gcm93IDogW3Jvd107XG4gICAgbm9ybWFsaXplRGF0YXNldFtpbmRleFJvdyAlIGNvbHNwYW5zLmxlbmd0aF0gPVxuICAgICAgbm9ybWFsaXplRGF0YXNldFtpbmRleFJvdyAlIGNvbHNwYW5zLmxlbmd0aF0gIT0gbnVsbFxuICAgICAgICA/IFsuLi5ub3JtYWxpemVEYXRhc2V0W2luZGV4Um93ICUgY29sc3BhbnMubGVuZ3RoXSwgLi4ucm93XVxuICAgICAgICA6IFsuLi5yb3ddO1xuICB9KTtcbiAgY29uc3QgdHJhbnNwb3NlID0gbm9ybWFsaXplRGF0YXNldFswXS5tYXAoKF86IGFueSwgY29sSW5kZXg6IG51bWJlcikgPT5cbiAgICBub3JtYWxpemVEYXRhc2V0Lm1hcCgocm93OiBhbnkpID0+IHJvd1tjb2xJbmRleF0pLFxuICApO1xuICB0cmFuc3Bvc2UuZm9yRWFjaCgoZGF0YTogYW55W10sIGluZGV4OiBudW1iZXIpID0+IHtcbiAgICBjb25zdCByb3c6IEFqZlRhYmxlQ2VsbFtdID0gW107XG4gICAgZGF0YS5mb3JFYWNoKChjZWxsVmFsdWU6IHN0cmluZyB8IG51bWJlciwgY2VsbEluZGV4OiBudW1iZXIpID0+IHtcbiAgICAgIHJvdy5wdXNoKHtcbiAgICAgICAgdmFsdWU6IGNlbGxWYWx1ZSxcbiAgICAgICAgY29sc3BhbjogY29sc3BhbnNbY2VsbEluZGV4XSxcbiAgICAgICAgcm93c3BhbjogMSxcbiAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxuICAgICAgICAgIGNvbG9yOiAnYmxhY2snLFxuICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogaW5kZXggJSAyID09PSAwID8gJ3doaXRlJyA6ICcjZGRkJyxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHJlcy5wdXNoKHJvdyk7XG4gIH0pO1xuICByZXR1cm4gcmVzO1xufVxuXG4vKipcbiAqXG4gKiBAcGFyYW0gZm9ybXMgdGhlIGZvcm0gZGF0YVxuICogQHBhcmFtIGl0ZXJhdGlvbnMgYWxsIHZhbHVlcyBvZiBpdGVyYXRpb25cbiAqIEBwYXJhbSBmbiB0aGUgZnVjdGlvbiBvZiBleHByZXNzaW9uLXV0aWxzIHRvIGFwcGx5IGF0IGl0ZXJhdGlvblxuICogQHBhcmFtIHBhcmFtMSBmaXJzdCBwYXJhbSBvZiBmblxuICogQHBhcmFtIHBhcmFtMiBzZWNvbmQgcGFyYW0gb2YgZm5cbiAqIEByZXR1cm5zIHRoZSByZXN1bHQgb2YgZm4gYXBwbGllZCB0byBhbGwgdmFsdWVzIHBhcmFtIGNvbmRpdGlvbnNcbiAqICZjdXJyZW50IGlzIGFuIGFuY2hvciBrZXksIFRoZSBwYXJhbXMgd2l0aCAmY3VycmVudCB3aWxsIGJlIG1vZGlmaWVkIHdpdGggdGhlIGl0ZXJhdGlvbiB2YWx1ZXMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBSRVBFQVQoXG4gIGZvcm1zOiBNYWluRm9ybVtdLFxuICBpdGVyYXRpb25zOiBzdHJpbmdbXSxcbiAgZm46IEFqZlZhbGlkYXRpb25GbixcbiAgcGFyYW0xOiBzdHJpbmcsXG4gIHBhcmFtMjogc3RyaW5nID0gJ3RydWUnLFxuKTogYW55W10ge1xuICBjb25zdCByZXM6IGFueVtdID0gW107XG4gIGNvbnN0IG5ld0V4cDEgPVxuICAgIHBhcmFtMSAhPSBudWxsICYmIHBhcmFtMS5pbmNsdWRlcygnY3VycmVudCcpXG4gICAgICA/ICh2OiBhbnkpID0+IHBhcmFtMS5zcGxpdCgnY3VycmVudCcpLmpvaW4oSlNPTi5zdHJpbmdpZnkodikpXG4gICAgICA6ICgpID0+IHBhcmFtMTtcbiAgY29uc3QgbmV3RXhwMiA9XG4gICAgcGFyYW0yICE9IG51bGwgJiYgcGFyYW0yLmluY2x1ZGVzKCdjdXJyZW50JylcbiAgICAgID8gKHY6IGFueSkgPT4gcGFyYW0yLnNwbGl0KCdjdXJyZW50Jykuam9pbihKU09OLnN0cmluZ2lmeSh2KSlcbiAgICAgIDogKCkgPT4gcGFyYW0yO1xuICBpdGVyYXRpb25zLmZvckVhY2godiA9PiB7XG4gICAgY29uc3QgdnYgPSAoZm4gYXMgYW55KShmb3JtcywgbmV3RXhwMSh2KSwgbmV3RXhwMih2KSk7XG4gICAgcmVzLnB1c2godnYpO1xuICB9KTtcbiAgcmV0dXJuIHJlcztcbn1cbmZ1bmN0aW9uIGJ1aWxkRm4oZXhwcmVzc2lvbjogc3RyaW5nKTogYW55IHtcbiAgcmV0dXJuICh2OiBhbnkpID0+IHtcbiAgICBjb25zdCBuZXdFeHAgPSBleHByZXNzaW9uXG4gICAgICAuc3BsaXQoJ2FqZl9mb3JtJylcbiAgICAgIC5qb2luKGAke0pTT04uc3RyaW5naWZ5KHYpfWApXG4gICAgICAuc3BsaXQoJ2N1cnJlbnQnKVxuICAgICAgLmpvaW4oYCR7SlNPTi5zdHJpbmdpZnkodil9YCk7XG4gICAgcmV0dXJuIG5ld0V4cDtcbiAgfTtcbn1cblxuLyoqXG4gKiB0aGlzIGZ1bmN0aW9uIGFsbG93IHRvIGRlZmluZSBhIG5ldyBhdHRyaWJ1dGUgb2YgbWFpbmZvcm0uXG4gKiB0aGUgYXR0cmlidXRlIGZpZWxkIHdpbGwgYmUgYWRkZWQgb24gZXZlcnkgZm9ybSBhbmQgaXQgdGFrZXMgdGhlIHJlc3VsdCBvZiBleHByZXNzaW9uIGNhbGN1bGF0ZWRcbiAqIGZvciBldmVyeSBtYWluZm9ybVxuICpcbiAqIEBleHBvcnRcbiAqIEBwYXJhbSB7TWFpbkZvcm1bXX0gZm9ybUxpc3RcbiAqIEBwYXJhbSB7c3RyaW5nfSBmaWVsZFxuICogQHBhcmFtIHtzdHJpbmd9IGV4cHJlc3Npb25cbiAqIEByZXR1cm4geyp9ICB7TWFpbkZvcm1bXX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIEFQUExZKGZvcm1MaXN0OiBNYWluRm9ybVtdLCBmaWVsZDogc3RyaW5nLCBleHByZXNzaW9uOiBzdHJpbmcpOiBNYWluRm9ybVtdIHtcbiAgY29uc3QgZXhwRm4gPSBidWlsZEZuKGV4cHJlc3Npb24pO1xuICBmb3JtTGlzdCA9IGNsb25lTWFpbkZvcm1zKGZvcm1MaXN0KTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGZvcm1MaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGZvcm1MaXN0W2ldID09IG51bGwpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBpZiAoZm9ybUxpc3RbaV0ucmVwcyAhPSBudWxsKSB7XG4gICAgICBmb3JtTGlzdFtpXVtmaWVsZF0gPSBldmFsdWF0ZUV4cHJlc3Npb24oZXhwRm4oZm9ybUxpc3RbaV0pLCBmb3JtTGlzdFtpXSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBmb3JtTGlzdDtcbn1cblxuLyoqXG4gKiB0aGlzIGZ1bmN0aW9uIHJvdW5kIGEgbnVtYmVyLFxuICogaWYgeW91IG5lZWQgY2FuIGJlIGRlZmluZSBkZSBkaWdpdHMgb2Ygcm91bmRcbiAqXG4gKiBAZXhwb3J0XG4gKiBAcGFyYW0geyhudW1iZXIgfCBzdHJpbmcpfSBudW1cbiAqIEBwYXJhbSB7bnVtYmVyfSBbZGlnaXRzXVxuICogQHJldHVybiB7Kn0gIHtudW1iZXJ9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBST1VORChudW06IG51bWJlciB8IHN0cmluZywgZGlnaXRzPzogbnVtYmVyKTogbnVtYmVyIHtcbiAgcmV0dXJuIHJvdW5kKG51bSwgZGlnaXRzKTtcbn1cblxuLyoqXG4gKiB0aGlzIGZ1bmN0aW9uIGV2YWx1ZWF0ZSBhIGNvbmRpdGlvbiBpZiB0cnVlIHJldHVybiBicmFuY2gxIGVsc2UgYnJhbmNoMlxuICpcbiAqIEBleHBvcnRcbiAqIEBwYXJhbSB7c3RyaW5nfSBjb25kaXRpb25cbiAqIEBwYXJhbSB7Kn0gYnJhbmNoMVxuICogQHBhcmFtIHsqfSBicmFuY2gyXG4gKiBAcmV0dXJuIHsqfSAgeyp9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBFVkFMVUFURShjb25kaXRpb246IHN0cmluZywgYnJhbmNoMTogYW55LCBicmFuY2gyOiBhbnkpOiBhbnkge1xuICBpZiAoZXZhbHVhdGVFeHByZXNzaW9uKGNvbmRpdGlvbikpIHtcbiAgICByZXR1cm4gYnJhbmNoMTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gYnJhbmNoMjtcbiAgfVxufVxuLyoqXG4gKiBUaGlzIGZ1bmN0aW9uIGJ1aWxkcyBhIGRhdGEgc3RydWN0dXJlIHRoYXQgYWxsb3dzIHRoZSB1c2Ugb2YgdGhlIGhpbmRpa2l0IGZvcm11bGFzXG4gKiBmb3IgZXZlcnkgZm9ybXMgd2l0aCByZXBlYXRpbmcgc2xpZGVzLlxuICogSW4gcGFydGljdWxhciwgaXQgYnVpbGRzIGEgbWFpbiBkYXRhIGZvcm0gd2l0aCBhbGwgdGhlIGRhdGEgcmVsYXRpbmcgdG8gdGhlIHNsaWRlcyBhbmRcbiAqIGEgZGljdGlvbmFyeSB3aXRoIHRoZSBuYW1lIHJlcHMgdGh1cyBtYWRlIGluc3RhbmNlIHNsaWRlTmFtZSBmb3Jtcy5cbiAqIFdoZXJlIGEgZm9ybSBpcyBhc3NvY2lhdGVkIHdpdGggZWFjaCBpbnN0YW5jZSBvZiB0aGUgcmVwZWF0aW5nIHNsaWRlLlxuICogZXhhbXBsZTpcbiAqIHNpbXBsZSBmb3JtOlxuICogIHtcbiAqICAgICR2YWx1ZTogXCJBR09cIlxuICogICAgY2l0dGFkaW5hbnphX18wOiBcIkFHT1wiXG4gKiAgICBjb2RpY2VfZmlzY2FsZV9fMDogXCJqZGZsamdsw7Jrw7Jrw7JcIlxuICogICAgY291bnRyeV9fMDogXCJBR09cIlxuICogICAgZGF0ZV9lbmQ6IFwiMjAyMS0wMS0xMFwiXG4gKiAgICBkYXRlX3N0YXJ0OiBcIjIwMjEtMDEtMTBcIlxuICogICAgZG9iX18wOiBcIjIwMjEtMDMtMTFcIlxuICogICAgZmlyc3RfbmFtZV9fMDogXCJwaXBwb1wiXG4gKiAgICBnZW5kZXJfXzA6IFwiZlwiXG4gKiAgICBpZF9mYW1pbHk6IFwiM2JlZjNhM2YtZDk1ZC00YTA5LThkZjQtZTgxMmM1NWM2MWM2XCJcbiAqICAgIGlzdHJ1emlvbmVfXzA6IG51bGxcbiAqICAgIGxhc3RfbmFtZV9fMDogXCJwaXBwb1wiXG4gKiAgICBwZXJtZXNzb19zb2dnaW9ybm9fXzA6IFwibm9cIlxuICogICAgcmVsYXppb25lX18wOiBcImdlbml0b3JlXCJcbiAqICAgIHNvbGlkYW5kbzogXCJzb2xpZGFuZG8xXCJcbiAqICAgIHN0YXRvX2NpdmlsZV9fMDogbnVsbFxuICogIH1cbiAqIGFmdGVyIEJVSUxEX0RBVEFTRVRcbiAqIE1haW5Gb3JtOlxuICoge1xuICogICAgJHZhbHVlOiBcIkFHT1wiXG4gKiAgICBhamZfZm9ybV9pZDogMCAqKiBhZGRlZCBhdHJpYnV0ZSB0aGF0IHJhcHByZXNlbnQgdGhlIGluZGV4IHBvc2l0aW9uIGluc2lkZXMgaW5wdXQgZm9ybSBsaXN0LlxuICogICAgYWpmX2ZhbWlseV9jb21wb25lbnRfY291bnQ6IDEqKiBhZGRlZCBhdHJpYnV0ZSB0aGF0IHJhcHByZXNlbnQgdGhlIGluc3RhbmNlIG51bWJlciBvZiBmYW1pbGlfY29tcG9uZW50IHJlcGVhdGluZyBzbGlkZXMuXG4gKiAgICBkYXRlX2VuZDogXCIyMDIxLTAxLTEwXCJcbiAqICAgIGRhdGVfc3RhcnQ6IFwiMjAyMS0wMS0xMFwiXG4gKiAgICBpZF9mYW1pbHk6IFwiM2JlZjNhM2YtZDk1ZC00YTA5LThkZjQtZTgxMmM1NWM2MWM2XCJcbiAqICAgIHJlcHM6IHtcbiAqICAgICAgZmFtaWx5X2NvbXBvbmVudDogW1xuICogICAgICAgIHtcbiAqICAgICAgICAgIGFqZl9mYW1pbHlfY29tcG9uZW50X3JlcDogMCAqKiBhZGRlZCBhdHJpYnV0ZSB0aGF0IHJhcHByZXNlbnQgdGhlIG9yZGVyIGluc3RhbmNlIG9mIGZhbWlseV9jb21wb25lbnQgcmVwZWF0aW5nIHNsaWRlLlxuICogICAgICAgICAgY2l0dGFkaW5hbnphOiBcIkFHT1wiXG4gKiAgICAgICAgICBjb2RpY2VfZmlzY2FsZTogXCJqZGZsamdsw7Jrw7Jrw7JcIlxuICogICAgICAgICAgY291bnRyeTogXCJBR09cIlxuICogICAgICAgICAgZG9iOiBcIjIwMjEtMDMtMTFcIlxuICogICAgICAgICAgZmlyc3RfbmFtZTogXCJwaXBwb1wiXG4gKiAgICAgICAgICBnZW5kZXI6IFwiZlwiXG4gKiAgICAgICAgICBpc3RydXppb25lOiBudWxsXG4gKiAgICAgICAgICBsYXN0X25hbWU6IFwicGlwcG9cIlxuICogICAgICAgICAgcGVybWVzc29fc29nZ2lvcm5vOiBcIm5vXCJcbiAqICAgICAgICAgIHJlbGF6aW9uZTogXCJnZW5pdG9yZVwiXG4gKiAgICAgICAgICBzdGF0b19jaXZpbGU6IG51bGxcbiAqICAgICAgICB9XG4gKiAgICAgIF1cbiAqICAgIH1cbiAqIH1cbiAqXG4gKiBAcGFyYW0ge0Zvcm1bXX0gZm9ybXNcbiAqIEBwYXJhbSB7Kn0gW3NjaGVtYV0gaWYgc2NoZW1hIGlzIHByb3ZpZGVkIHRoZSBpbnN0YW5jZXMgaW5zaWRlIHRoZSByZXBzIG1hdGNoIHdpdGggZWZmZWN0aXZlXG4gKiBzbGlkZSBuYW1lLiBPdGhlcndpc2UgYWxsIHJlcGVhdGluZyBzbGlkZXMgYXJlIGFzc29jaWF0ZXMgdG8gZ2VuZXJpYyBzbGlkZSBuYW1lIFwicmVwXCIuXG4gKiBAcmV0dXJuIHsqfSAge01haW5Gb3JtW119XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBCVUlMRF9EQVRBU0VUKGZvcm1zOiBGb3JtW10sIHNjaGVtYT86IGFueSk6IE1haW5Gb3JtW10ge1xuICBjb25zdCByZXM6IE1haW5Gb3JtW10gPSBbXTtcbiAgY29uc3QgZ2VuZXJhdGVNZXRhZGF0YSA9IChzbGlkZU5hbWU6IHN0cmluZywgc2xpZGVJbnN0YW5jZTogbnVtYmVyKSA9PiB7XG4gICAgY29uc3QgcmVzZzoge1tzbmFtZTogc3RyaW5nXTogYW55fSA9IHt9O1xuICAgIHJlc2dbYGFqZl8ke3NsaWRlTmFtZX1fcmVwYF0gPSBzbGlkZUluc3RhbmNlO1xuICAgIHJldHVybiByZXNnO1xuICB9O1xuXG4gIGZvcm1zID0gKGZvcm1zIHx8IFtdKS5zbGljZSgwKTtcblxuICBpZiAoc2NoZW1hICE9IG51bGwpIHtcbiAgICBjb25zdCByZXBlYXRpbmdTbGlkZXM6IGFueVtdID0gc2NoZW1hLm5vZGVzLmZpbHRlcigobm9kZTogYW55KSA9PiBub2RlLm5vZGVUeXBlID09PSA0KTtcbiAgICBjb25zdCBvYmo6IHtbZmllbGROYW1lOiBzdHJpbmddOiBzdHJpbmd9ID0ge307XG4gICAgcmVwZWF0aW5nU2xpZGVzLmZvckVhY2goc2xpZGUgPT4ge1xuICAgICAgbGV0IG5vZGVGaWVsZHMgPSBzbGlkZS5ub2Rlcy5tYXAoKG46IGFueSkgPT4gbi5uYW1lKTtcbiAgICAgIG5vZGVGaWVsZHMuZm9yRWFjaCgobm9kZUZpZWxkOiBzdHJpbmcpID0+IHtcbiAgICAgICAgb2JqW25vZGVGaWVsZF0gPSBzbGlkZS5uYW1lO1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgZm9ybXMuZm9yRWFjaCgoZiwgZm9ybUlkeCkgPT4ge1xuICAgICAgY29uc3QgbWFpbkZvcm06IE1haW5Gb3JtID0ge3JlcHM6IHt9fTtcbiAgICAgIGNvbnN0IGZLZXlzOiBzdHJpbmdbXSA9IE9iamVjdC5rZXlzKGYpO1xuICAgICAgY29uc3QgaW5zdGFuY2VzOiB7W3NsaWRlTmFtZTogc3RyaW5nXTogYW55fSA9IHt9O1xuXG4gICAgICBmS2V5cy5mb3JFYWNoKGZrZXkgPT4ge1xuICAgICAgICBjb25zdCBzcGxpdHRlZEtleTogc3RyaW5nW10gPSBma2V5LnNwbGl0KCdfXycpO1xuICAgICAgICBjb25zdCBzcGxpdHRlZExlbmd0aDogbnVtYmVyID0gc3BsaXR0ZWRLZXkubGVuZ3RoO1xuICAgICAgICBjb25zdCBmaWVsZE5hbWUgPSBzcGxpdHRlZEtleVswXTtcbiAgICAgICAgY29uc3Qgc2xpZGVJbnN0YW5jZSA9XG4gICAgICAgICAgc3BsaXR0ZWRLZXlbMV0gIT0gbnVsbCAmJiBOdW1iZXIuaXNJbnRlZ2VyKCtzcGxpdHRlZEtleVsxXSkgPyArc3BsaXR0ZWRLZXlbMV0gOiBudWxsO1xuICAgICAgICBjb25zdCBzbGlkZU5hbWUgPSBvYmpbZmllbGROYW1lXTtcbiAgICAgICAgaWYgKHNwbGl0dGVkTGVuZ3RoID09PSAyICYmIHNsaWRlSW5zdGFuY2UgIT0gbnVsbCAmJiBzbGlkZU5hbWUgIT0gbnVsbCkge1xuICAgICAgICAgIGluc3RhbmNlc1tzbGlkZU5hbWVdID0gaW5zdGFuY2VzW3NsaWRlTmFtZV0gIT0gbnVsbCA/IGluc3RhbmNlc1tzbGlkZU5hbWVdIDogW107XG4gICAgICAgICAgaW5zdGFuY2VzW3NsaWRlTmFtZV1bc2xpZGVJbnN0YW5jZV0gPVxuICAgICAgICAgICAgaW5zdGFuY2VzW3NsaWRlTmFtZV1bc2xpZGVJbnN0YW5jZV0gIT0gbnVsbFxuICAgICAgICAgICAgICA/IGluc3RhbmNlc1tzbGlkZU5hbWVdW3NsaWRlSW5zdGFuY2VdXG4gICAgICAgICAgICAgIDogZ2VuZXJhdGVNZXRhZGF0YShzbGlkZU5hbWUsIHNsaWRlSW5zdGFuY2UpO1xuICAgICAgICAgIGluc3RhbmNlc1tzbGlkZU5hbWVdW3NsaWRlSW5zdGFuY2VdW2ZpZWxkTmFtZV0gPSBmW2ZrZXldO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG1haW5Gb3JtW2ZpZWxkTmFtZV0gPSBmW2ZpZWxkTmFtZV07XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgbWFpbkZvcm1bYGFqZl9mb3JtX2lkYF0gPSBmb3JtSWR4O1xuICAgICAgY29uc3QgaW5zdGFuY2VLZXlzID0gT2JqZWN0LmtleXMoaW5zdGFuY2VzKTtcbiAgICAgIGluc3RhbmNlS2V5cy5mb3JFYWNoKGluc3RhbmNlS2V5ID0+IHtcbiAgICAgICAgbWFpbkZvcm1bYGFqZl8ke2luc3RhbmNlS2V5fV9jb3VudGBdID0gaW5zdGFuY2VzW2luc3RhbmNlS2V5XS5sZW5ndGg7XG4gICAgICB9KTtcbiAgICAgIG1haW5Gb3JtLnJlcHMgPSBpbnN0YW5jZXM7XG4gICAgICByZXMucHVzaChtYWluRm9ybSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlcztcbiAgfSBlbHNlIHtcbiAgICBmb3Jtcy5mb3JFYWNoKGZvcm0gPT4ge1xuICAgICAgY29uc3QgZktleXM6IHN0cmluZ1tdID0gT2JqZWN0LmtleXMoZm9ybSk7XG4gICAgICBjb25zdCBub1JlcGVhdGluZ0ZpZWxkczogc3RyaW5nW10gPSBmS2V5cy5maWx0ZXIoZmtleSA9PiBma2V5LmluZGV4T2YoJ19fJykgPT09IC0xKTtcbiAgICAgIGNvbnN0IG5vUmVwRm9ybTogRm9ybSA9IHt9O1xuXG4gICAgICBub1JlcGVhdGluZ0ZpZWxkcy5mb3JFYWNoKGZpZWxkID0+IHtcbiAgICAgICAgbm9SZXBGb3JtW2ZpZWxkXSA9IGZvcm1bZmllbGRdO1xuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IG1haW5Gb3JtOiBNYWluRm9ybSA9IHsuLi5ub1JlcEZvcm0sIHJlcHM6IHtzbGlkZTogW119fTtcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gTUFYX1JFUFM7IGkrKykge1xuICAgICAgICBjb25zdCBjdXJyZW50U2xpZGU6IEZvcm0gPSB7fTtcbiAgICAgICAgY29uc3Qgb25seUN1cnJlbnRJbnN0YW5jZUtleXM6IHN0cmluZ1tdID0gZktleXMuZmlsdGVyKGZrZXkgPT4gZmtleS5pbmRleE9mKGBfXyR7aX1gKSA+IC0xKTtcbiAgICAgICAgLy8gc2UgaWwgbnVtZXJvIGRpIGF0dHJpYnV0aSBjb2luY2lkZSBpbCBmb3JtIGRhdGEgbm9uIGhhIHJlcGVhdGluZ3NsaWRlc1xuICAgICAgICBpZiAob25seUN1cnJlbnRJbnN0YW5jZUtleXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgbWFpbkZvcm1bJ2FqZl9yZXBfY291bnQnXSA9IGk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgb25seUN1cnJlbnRJbnN0YW5jZUtleXMuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAgIGNvbnN0IHNwbGl0dGVkS2V5ID0ga2V5LnNwbGl0KCdfXycpO1xuICAgICAgICAgIGNvbnN0IGZpZWxkTmFtZSA9IHNwbGl0dGVkS2V5WzBdO1xuICAgICAgICAgIGNvbnN0IHNsaWRlSW5zdGFuY2UgPSBzcGxpdHRlZEtleVsxXSAhPSBudWxsID8gK3NwbGl0dGVkS2V5WzFdIDogbnVsbDtcbiAgICAgICAgICBjdXJyZW50U2xpZGVbZmllbGROYW1lXSA9IGZvcm1ba2V5XTtcbiAgICAgICAgICBjdXJyZW50U2xpZGVbJ2FqZl9yZXAnXSA9IHNsaWRlSW5zdGFuY2UgIT0gbnVsbCA/IHNsaWRlSW5zdGFuY2UgOiBjdXJyZW50U2xpZGVbJ2FqZl9yZXAnXTtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChvbmx5Q3VycmVudEluc3RhbmNlS2V5cy5sZW5ndGggIT0gMCkge1xuICAgICAgICAgIG1haW5Gb3JtLnJlcHMhWydzbGlkZSddLnB1c2goY3VycmVudFNsaWRlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBtYWluRm9ybS5yZXBzID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXMucHVzaChtYWluRm9ybSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcmVzO1xuICB9XG59XG5cbi8qKlxuICogVGhpcyBmdW5jdGlvbiBidWlsZCBhIHBhcnRpdGlvbiBvZiBmb3JtTGlzdCBieSBleGVjdXRpb24gb2YgZXhwcmVzc2lvbi5cbiAqIEZvciBldmVyeSBtYWluRm9ybSB0aGUgZXhwcmVzc2lvbiBtYXRjaCBtYWluZm9ybSBmaWVsZCBhbmQgcmVwbGFjZSBpdC5cbiAqIElmIHRoZSBldmFsdWF0aW9uIG9mIGV4cHJlc3Npb24gaXMgdHJ1ZSB0aGUgbWFpbkZvcm0gd2FzIGFkZGVkIHRvIHBhcnRpdGlvblxuICogKHRoYXQgYmVjb3VzZSB0aGUgZXhwcmVzc2lvbiBkb24ndCBoYXMgcmVwZWF0aW5nIHNsaWRlIGZpZWxkcykgZWxzZSBpZlxuICogdGhlcmUgYXJlIHJlcHMgZm9yIGV2ZXJ5IHJlcCB0aGUgZXhwcmVzc2lvbiBpcyB1cGRhdGVkIHdpdGggcmVwbGFjaW5nIG9mXG4gKiByZXBlYXRpbmcgc2xpZGUgaW5zdGFuY2UgZmllbGRzIGFuZCBldmFsdWF0ZWQsIGlmIHRydWUgd2FzIGFkZGVkIHRvIHBhcnRpdGlvbi5cbiAqIEFsbCBhamYgYXR0cmlidXRlcyB3YWQgdXBkYXRlZC4gL1RPRE9cbiAqXG4gKlxuICogQHBhcmFtIHtNYWluRm9ybVtdfSBmb3JtTGlzdCBhIHNldCBvZiBtYWluIGZvcm1zXG4gKiBAcGFyYW0ge3N0cmluZ30gZXhwcmVzc2lvbiB0byBiZSBldmFsdWF0ZWQuIHRoYXQgY2FuIGJlIGFibGUgdG8gY29udGFpbnMgYW5vdGhlclxuICogaGluZGlraXQgZnVuY3Rpb25zIG9yIG1haW5Gb3JtIGZpZWxkcyBvciByZXBzIGZpZWxkcy5cbiAqIEByZXR1cm4geyp9ICB7TWFpbkZvcm1bXX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIEZJTFRFUl9CWShmb3JtTGlzdDogTWFpbkZvcm1bXSwgZXhwcmVzc2lvbjogc3RyaW5nKTogTWFpbkZvcm1bXSB7XG4gIGNvbnN0IGZvcm1zOiBNYWluRm9ybVtdID0gY2xvbmVNYWluRm9ybXMoZm9ybUxpc3QgfHwgW10pLmZpbHRlcigoZjogTWFpbkZvcm0pID0+IGYgIT0gbnVsbCk7XG4gIGNvbnN0IGlkZW50aWZpZXJzID0gWy4uLm5ldyBTZXQoZ2V0Q29kZUlkZW50aWZpZXJzKGV4cHJlc3Npb24sIHRydWUpKV07XG4gIGxldCByZXM6IE1haW5Gb3JtW10gPSBbXTtcbiAgaWYgKGV4cHJlc3Npb24gPT09ICd0cnVlJykge1xuICAgIHJldHVybiBmb3JtcztcbiAgfVxuICBpZiAoZm9ybXMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBmb3Jtcy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IG1haW5Gb3JtOiBNYWluRm9ybSA9IGZvcm1zW2ldO1xuICAgIGxldCBleHByID0gZXhwcmVzc2lvbjtcbiAgICBpZiAobWFpbkZvcm0gPT0gbnVsbCkge1xuICAgICAgcmVzLnB1c2gobWFpbkZvcm0pO1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIC8qIHJlcGxhY2UgbWFpbiBmb3JtIGZpZWxkIGluc2lkZSBleHByZXNzaW9uICovXG4gICAgaWRlbnRpZmllcnMuZm9yRWFjaChpZGVudGlmaWVyID0+IHtcbiAgICAgIGNvbnN0IGNoYW5nZSA9IG1haW5Gb3JtW2lkZW50aWZpZXJdID8gbWFpbkZvcm1baWRlbnRpZmllcl0gOiBudWxsO1xuICAgICAgaWYgKGNoYW5nZSkge1xuICAgICAgICBleHByID0gZXhwci5zcGxpdChpZGVudGlmaWVyKS5qb2luKEpTT04uc3RyaW5naWZ5KGNoYW5nZSkpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIC8qIGlmIHRoYXQncyBhbHJlYWR5IHRydWUgcHVzaCBpdCBpbiByZXMgKi9cbiAgICBpZiAoZXZhbHVhdGVFeHByZXNzaW9uKGV4cHIsIG1haW5Gb3JtKSkge1xuICAgICAgcmVzLnB1c2gobWFpbkZvcm0pO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgbGV0IG5ld1JlcHM6IEluc3RhbmNlcyB8IHVuZGVmaW5lZDtcbiAgICBjb25zdCBjaGlsZEtleXMgPSBPYmplY3Qua2V5cyhtYWluRm9ybS5yZXBzIGFzIEluc3RhbmNlcyk7XG5cbiAgICBjaGlsZEtleXMuZm9yRWFjaChjaGlsZEtleSA9PiB7XG4gICAgICBjb25zdCBjdXJyZW50UmVwcyA9ICgobWFpbkZvcm0ucmVwcyBhcyBJbnN0YW5jZXMpW2NoaWxkS2V5XSBhcyBGb3JtW10pXG4gICAgICAgIC5maWx0ZXIoKGZvcm06IEZvcm0pID0+IHtcbiAgICAgICAgICBsZXQgcmVwRXhwciA9IGV4cHI7XG4gICAgICAgICAgLyogcmVwbGFjZSByZXAgZmllbGQgaW5zaWRlIGV4cHJlc3Npb24gKi9cbiAgICAgICAgICBpZGVudGlmaWVycy5mb3JFYWNoKGlkZW50aWZpZXIgPT4ge1xuICAgICAgICAgICAgY29uc3QgY2hhbmdlSW5SZXAgPSBmb3JtW2lkZW50aWZpZXJdID8gZm9ybVtpZGVudGlmaWVyXSA6IG51bGw7XG4gICAgICAgICAgICBpZiAoY2hhbmdlSW5SZXApIHtcbiAgICAgICAgICAgICAgcmVwRXhwciA9IHJlcEV4cHIuc3BsaXQoaWRlbnRpZmllcikuam9pbihKU09OLnN0cmluZ2lmeShjaGFuZ2VJblJlcCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHJldHVybiBldmFsdWF0ZUV4cHJlc3Npb24ocmVwRXhwciwgZm9ybSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5maWx0ZXIoZiA9PiBmICE9IG51bGwpO1xuICAgICAgaWYgKGN1cnJlbnRSZXBzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgbmV3UmVwcyA9IChuZXdSZXBzICE9IG51bGwgPyBuZXdSZXBzIDoge30pIGFzIEluc3RhbmNlcztcbiAgICAgICAgbmV3UmVwc1tjaGlsZEtleV0gPSBjdXJyZW50UmVwcztcbiAgICAgIH1cbiAgICAgIG1haW5Gb3JtW2BhamZfJHtjaGlsZEtleX1fY291bnRgXSA9IGN1cnJlbnRSZXBzLmxlbmd0aDtcbiAgICB9KTtcbiAgICBpZiAobmV3UmVwcyA9PSBudWxsKSB7XG4gICAgICByZXMucHVzaChudWxsIGFzIHVua25vd24gYXMgTWFpbkZvcm0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBtYWluRm9ybS5yZXBzID0gbmV3UmVwcztcbiAgICAgIHJlcy5wdXNoKG1haW5Gb3JtKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzO1xufVxuXG4vKipcbiAqIHJldHVybiB0aGUgdG9kYXkgZGF0ZVxuICpcbiAqIEBleHBvcnRcbiAqIEBwYXJhbSB7c3RyaW5nfSBbZm9ybWF0PSd5eXl5LU1NLWRkJ11cbiAqIEByZXR1cm4geyp9ICB7c3RyaW5nfVxuICovXG5leHBvcnQgZnVuY3Rpb24gVE9EQVkoZm9ybWF0ID0gJ3l5eXktTU0tZGQnKTogc3RyaW5nIHtcbiAgcmV0dXJuIGRhdGVGbnMuZm9ybWF0KG5ldyBEYXRlKCksIGZvcm1hdCk7XG59XG5cbi8qKlxuICogVVRJTElUWSBGVU5DVElPTlxuICogIHRoaXMgZnVuY3Rpb24gYWxsb3cgdGhlIGNvbnNvbGUgbG9nIG9mIGV4Y2VsIHZhcmlhYmxlcy5cbiAqIEBleHBvcnRcbiAqIEBwYXJhbSB7Kn0gdmFsXG4gKiBAcGFyYW0ge3N0cmluZ30gW3RleHQ9J2xvZzogJ11cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIENPTlNPTEVfTE9HKHZhbDogYW55LCB0ZXh0ID0gJ2xvZzogJyk6IHZvaWQge1xuICBjb25zb2xlLmxvZyh0ZXh0LCB2YWwpO1xufVxuXG4vKipcbiAqIHRoaXMgZnVuY3Rpb24gdGFrZSBhIHN0cmluZyBkYXRlIGFuZCByZXR1cm4gdGhlIGRpZmZlcmVuY2UgaW4geWVhciBmcm9tIGRvYiB0byB0b2RheS5cbiAqXG4gKiBAZXhwb3J0XG4gKiBAcGFyYW0geyhzdHJpbmcgfCBudWxsKX0gZG9iXG4gKiBAcmV0dXJuIHsqfSAge251bWJlcn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIEdFVF9BR0UoZG9iOiBzdHJpbmcgfCBudWxsKTogbnVtYmVyIHtcbiAgaWYgKGRvYiA9PSBudWxsKSByZXR1cm4gKyc8JzsgLy8gbmVlZCBmb3IgZ2VuZXJhdGUgZmFsc2UgZnVuY2lvbiBpbiBldmFsdWF0ZUV4cHJlc3Npb25cbiAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKGRvYik7XG4gIGNvbnN0IGFnZTogbnVtYmVyID0gZGF0ZUZucy5kaWZmZXJlbmNlSW5ZZWFycyhuZXcgRGF0ZSgpLCBkYXRlKTtcbiAgcmV0dXJuIGFnZTtcbn1cblxuLyoqXG4gKiB0aGlzIGZ1bmN0aW9uIHJldHVybnMgcmVwcyBsZW5ndGggaWYgcmVwcyBpbiBkZWZpbmVkIG9yIHRoZSBsZW5ndGggb2YgZGF0YXNldCBpZiBkYXRhc2V0IGlzIGFycmF5LVxuICpcbiAqIEBleHBvcnRcbiAqIEBwYXJhbSB7KE1haW5Gb3JtIHwgYW55W10pfSBkYXRhc2V0XG4gKiBAcmV0dXJuIHsqfSAge251bWJlcn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIExFTihkYXRhc2V0OiBNYWluRm9ybSB8IGFueVtdKTogbnVtYmVyIHtcbiAgaWYgKGRhdGFzZXQgPT0gbnVsbCkge1xuICAgIHJldHVybiAwO1xuICB9XG4gIGlmICgoZGF0YXNldCBhcyBNYWluRm9ybSkucmVwcyAhPSBudWxsKSB7XG4gICAgY29uc3QgbWFpbkZvcm0gPSBkYXRhc2V0IGFzIE1haW5Gb3JtO1xuICAgIGNvbnN0IHJlcHMgPSBPYmplY3Qua2V5cyhtYWluRm9ybS5yZXBzIGFzIEluc3RhbmNlcylcbiAgICAgIC5tYXAoa2V5ID0+IChtYWluRm9ybS5yZXBzIGFzIEluc3RhbmNlcylba2V5XS5mbGF0KCkpXG4gICAgICAuZmxhdCgpO1xuICAgIHJldHVybiByZXBzLmxlbmd0aDtcbiAgfVxuXG4gIHJldHVybiAoZGF0YXNldCBhcyBhbnlbXSkubGVuZ3RoIHx8IDA7XG59XG5cbi8qKlxuICogcmV0dXJuIHRydWUgaWYgZGF0ZSBpcyBiZWZvcmUgdGhlbiBkYXRlVG9Db21wYXJlXG4gKlxuICogQGV4cG9ydFxuICogQHBhcmFtIHtzdHJpbmd9IGRhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBkYXRlVG9Db21wYXJlXG4gKiBAcmV0dXJuIHsqfSAge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBJU19CRUZPUkUoZGF0ZTogc3RyaW5nLCBkYXRlVG9Db21wYXJlOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgY29uc3QgZGF0ZUE6IERhdGUgPSBkYXRlRm5zLnBhcnNlSVNPKGRhdGUpO1xuICBjb25zdCBkYXRlQjogRGF0ZSA9IGRhdGVGbnMucGFyc2VJU08oZGF0ZVRvQ29tcGFyZSk7XG4gIHJldHVybiBkYXRlRm5zLmlzQmVmb3JlKGRhdGVBLCBkYXRlQik7XG59XG5cbi8qKlxuICogcmV0dXJuIHRydWUgaWYgZGF0ZSBpcyBhZnRlciB0aGVuIGRhdGVUb0NvbXBhcmVcbiAqXG4gKiBAZXhwb3J0XG4gKiBAcGFyYW0ge3N0cmluZ30gZGF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IGRhdGVUb0NvbXBhcmVcbiAqIEByZXR1cm4geyp9ICB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIElTX0FGVEVSKGRhdGU6IHN0cmluZywgZGF0ZVRvQ29tcGFyZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gIGNvbnN0IGRhdGVBOiBEYXRlID0gZGF0ZUZucy5wYXJzZUlTTyhkYXRlKTtcbiAgY29uc3QgZGF0ZUI6IERhdGUgPSBkYXRlRm5zLnBhcnNlSVNPKGRhdGVUb0NvbXBhcmUpO1xuICByZXR1cm4gZGF0ZUZucy5pc0FmdGVyKGRhdGVBLCBkYXRlQik7XG59XG5cbi8qKlxuICogcmV0dXJuIHRydWUgaWYgZGF0ZSBpcyB3aGl0aGluIGludGVydmFsIGZyb20gZGF0ZVN0YXJ0IHRvIGRhdGVFbmRcbiAqXG4gKiBAZXhwb3J0XG4gKiBAcGFyYW0ge3N0cmluZ30gZGF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IGRhdGVTdGFydFxuICogQHBhcmFtIHtzdHJpbmd9IGRhdGVFbmRcbiAqIEByZXR1cm4geyp9ICB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIElTX1dJVEhJTl9JTlRFUlZBTChkYXRlOiBzdHJpbmcsIGRhdGVTdGFydDogc3RyaW5nLCBkYXRlRW5kOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgY29uc3QgZGF0ZVRvQ29tcGFyZTogRGF0ZSA9IGRhdGVGbnMucGFyc2VJU08oZGF0ZSk7XG4gIGNvbnN0IGludGVydmFsOiBJbnRlcnZhbCA9IHtcbiAgICBzdGFydDogZGF0ZUZucy5wYXJzZUlTTyhkYXRlU3RhcnQpLFxuICAgIGVuZDogZGF0ZUZucy5wYXJzZUlTTyhkYXRlRW5kKSxcbiAgfTtcbiAgcmV0dXJuIGRhdGVGbnMuaXNXaXRoaW5JbnRlcnZhbChkYXRlVG9Db21wYXJlLCBpbnRlcnZhbCk7XG59XG5cbi8qKlxuICogdGhpcyBmdW5jdGlvbiBleHRlbmQgZm9ybXNBIGRhdGFzZXQuXG4gKiBzZWFyY2ggYWxsIG1hdGNoIG9mIGtleUEgaW4gZm9ybXNCLCBpZiBmb3VuZCBpZiBtZXJnZSBmb3JtQSBhbmQgZm9ybUIuXG4gKlxuICogQGV4cG9ydFxuICogQHBhcmFtIHtzdHJpbmd9IGtleUFcbiAqIEBwYXJhbSB7c3RyaW5nfSBba2V5Ql1cbiAqIEByZXR1cm4geyp9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBKT0lOX0ZPUk1TKFxuICBmb3Jtc0E6IChNYWluRm9ybSB8IEZvcm0pW10sXG4gIGZvcm1zQjogKE1haW5Gb3JtIHwgRm9ybSlbXSxcbiAga2V5QTogc3RyaW5nLFxuICBrZXlCPzogc3RyaW5nLFxuKTogKE1haW5Gb3JtIHwgRm9ybSlbXSB7XG4gIGZvcm1zQSA9IGNsb25lTWFpbkZvcm1zKGZvcm1zQSk7XG4gIGZvcm1zQiA9IGNsb25lTWFpbkZvcm1zKGZvcm1zQik7XG4gIGNvbnN0IG1lcmdlZEZvcm1zOiAoTWFpbkZvcm0gfCBGb3JtKVtdID0gW107XG4gIGlmIChrZXlBID09IG51bGwgfHwgZm9ybXNBID09IG51bGwgfHwgZm9ybXNBLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBtZXJnZWRGb3JtcztcbiAgfVxuICBpZiAoa2V5QiA9PSBudWxsKSB7XG4gICAga2V5QiA9IGtleUE7XG4gIH1cbiAgaWYgKGZvcm1zQiA9PSBudWxsIHx8IGZvcm1zQi5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gZm9ybXNBO1xuICB9XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZm9ybXNBLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgZm9ybUEgPSBmb3Jtc0FbaV07XG4gICAgY29uc3Qga2V5QVZhbHVlID0gZm9ybUFba2V5QV07XG4gICAgbGV0IG1lcmdlZEZvcm0gPSB7Li4uZm9ybUF9O1xuICAgIGlmIChmb3JtQSA9PSBudWxsIHx8IGtleUFWYWx1ZSA9PSBudWxsKSB7XG4gICAgICBtZXJnZWRGb3Jtcy5wdXNoKGZvcm1BKTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IGZvcm1zQi5sZW5ndGg7IGorKykge1xuICAgICAgY29uc3QgZm9ybUIgPSBmb3Jtc0Jbal07XG4gICAgICBjb25zdCBrZXlCVmFsdWUgPSBmb3JtQltrZXlCXTtcbiAgICAgIGlmIChmb3JtQiA9PSBudWxsIHx8IGtleUJWYWx1ZSA9PSBudWxsKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKGtleUFWYWx1ZSA9PT0ga2V5QlZhbHVlKSB7XG4gICAgICAgIG1lcmdlZEZvcm0gPSB7Li4uZm9ybUEsIC4uLmZvcm1CfTtcbiAgICAgICAgaWYgKGZvcm1BLnJlcHMgIT0gbnVsbCAmJiBmb3JtQi5yZXBzICE9IG51bGwpIHtcbiAgICAgICAgICBtZXJnZWRGb3JtLnJlcHMgPSB7XG4gICAgICAgICAgICAuLi4oZm9ybUEgYXMgTWFpbkZvcm0pLnJlcHMsXG4gICAgICAgICAgICAuLi4oZm9ybUIgYXMgTWFpbkZvcm0pLnJlcHMsXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgbWVyZ2VkRm9ybXMucHVzaChtZXJnZWRGb3JtKTtcbiAgfVxuXG4gIHJldHVybiBtZXJnZWRGb3Jtcztcbn1cblxuLyoqXG4gKiBsaWtlIEpPSU5fRk9STVMgYnV0IGV4dGVuZHMgdGhlIGJlaGF2aW91ciBvbiB0aGUgcmVwcy5cbiAqIHNlYXJjaCBhbGwgbWF0Y2ggb2Ygc3ViS2V5QSBpbiBmb3JtQlxuICpcbiAqIEBleHBvcnRcbiAqIEBwYXJhbSB7TWFpbkZvcm1bXX0gZm9ybXNBXG4gKiBAcGFyYW0ge01haW5Gb3JtW119IGZvcm1zQlxuICogQHBhcmFtIHtzdHJpbmd9IGtleUFcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXlCXG4gKiBAcGFyYW0ge3N0cmluZ30gc3ViS2V5QVxuICogQHBhcmFtIHtzdHJpbmd9IFtzdWJLZXlCXVxuICogQHJldHVybiB7Kn0gIHtNYWluRm9ybVtdfVxuICovXG5leHBvcnQgZnVuY3Rpb24gSk9JTl9SRVBFQVRJTkdfU0xJREVTKFxuICBmb3Jtc0E6IE1haW5Gb3JtW10sXG4gIGZvcm1zQjogTWFpbkZvcm1bXSxcbiAga2V5QTogc3RyaW5nLFxuICBrZXlCOiBzdHJpbmcsXG4gIHN1YktleUE6IHN0cmluZyxcbiAgc3ViS2V5Qj86IHN0cmluZyxcbik6IE1haW5Gb3JtW10ge1xuICBjb25zdCBtZXJnZWRGb3JtczogTWFpbkZvcm1bXSA9IFtdO1xuICBmb3Jtc0EgPSBjbG9uZU1haW5Gb3Jtcyhmb3Jtc0EpO1xuICBmb3Jtc0IgPSBjbG9uZU1haW5Gb3Jtcyhmb3Jtc0IpO1xuICBpZiAoa2V5QSA9PSBudWxsIHx8IGZvcm1zQSA9PSBudWxsIHx8IGZvcm1zQS5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gbWVyZ2VkRm9ybXM7XG4gIH1cbiAgaWYgKGtleUIgPT0gbnVsbCkge1xuICAgIGtleUIgPSBrZXlBO1xuICB9XG4gIGlmIChmb3Jtc0IgPT0gbnVsbCB8fCBmb3Jtc0IubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIGZvcm1zQTtcbiAgfVxuICBpZiAoc3ViS2V5QSA9PSBudWxsKSB7XG4gICAgcmV0dXJuIEpPSU5fRk9STVMoZm9ybXNBLCBmb3Jtc0IsIGtleUEsIGtleUIpIGFzIE1haW5Gb3JtW107XG4gIH1cbiAgaWYgKHN1YktleUIgPT0gbnVsbCkge1xuICAgIHN1YktleUIgPSBzdWJLZXlBO1xuICB9XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZm9ybXNBLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgZm9ybUEgPSBmb3Jtc0FbaV07XG4gICAgY29uc3Qga2V5QVZhbHVlID0gZm9ybUFba2V5QV07XG4gICAgbGV0IG1lcmdlZEZvcm0gPSB7Li4uZm9ybUF9O1xuICAgIGlmIChmb3JtQSA9PSBudWxsIHx8IGtleUFWYWx1ZSA9PSBudWxsKSB7XG4gICAgICBtZXJnZWRGb3Jtcy5wdXNoKGZvcm1BKTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IGZvcm1zQi5sZW5ndGg7IGorKykge1xuICAgICAgY29uc3QgZm9ybUIgPSBmb3Jtc0Jbal07XG4gICAgICBjb25zdCBrZXlCVmFsdWUgPSBmb3JtQltrZXlCXTtcbiAgICAgIGlmIChmb3JtQiA9PSBudWxsIHx8IGtleUJWYWx1ZSA9PSBudWxsKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKGtleUFWYWx1ZSA9PT0ga2V5QlZhbHVlKSB7XG4gICAgICAgIG1lcmdlZEZvcm0gPSB7Li4uZm9ybUEsIC4uLmZvcm1CfTtcbiAgICAgICAgbWVyZ2VkRm9ybS5yZXBzID0gey4uLmZvcm1BLnJlcHMsIC4uLmZvcm1CLnJlcHN9O1xuICAgICAgICBpZiAoZm9ybUEucmVwcyAhPSBudWxsICYmIGZvcm1CLnJlcHMgIT0gbnVsbCkge1xuICAgICAgICAgIGNvbnN0IG1lcmdlZFJlcHM6IEluc3RhbmNlcyA9IHt9O1xuICAgICAgICAgIGNvbnN0IGNoaWxkQUtleXMgPSBPYmplY3Qua2V5cyhmb3JtQS5yZXBzKTtcbiAgICAgICAgICBjb25zdCBjaGlsZEIgPSBPYmplY3Qua2V5cyhmb3JtQi5yZXBzKVxuICAgICAgICAgICAgLm1hcChrZXkgPT4gKGZvcm1CLnJlcHMgYXMgSW5zdGFuY2VzKVtrZXldLmZsYXQoKSlcbiAgICAgICAgICAgIC5mbGF0KCk7XG4gICAgICAgICAgY2hpbGRBS2V5cy5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpbnN0YW5jZSA9IChmb3JtQS5yZXBzIGFzIEluc3RhbmNlcylba2V5XTtcbiAgICAgICAgICAgIG1lcmdlZFJlcHNba2V5XSA9IEpPSU5fRk9STVMoXG4gICAgICAgICAgICAgIGluc3RhbmNlIGFzIHVua25vd24gYXMgTWFpbkZvcm1bXSxcbiAgICAgICAgICAgICAgY2hpbGRCIGFzIHVua25vd24gYXMgTWFpbkZvcm1bXSxcbiAgICAgICAgICAgICAgc3ViS2V5QSxcbiAgICAgICAgICAgICAgc3ViS2V5QixcbiAgICAgICAgICAgICkgYXMgRm9ybVtdO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIG1lcmdlZEZvcm0ucmVwcyA9IG1lcmdlZFJlcHM7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIG1lcmdlZEZvcm1zLnB1c2gobWVyZ2VkRm9ybSk7XG4gIH1cblxuICByZXR1cm4gbWVyZ2VkRm9ybXM7XG59XG5cbi8qKlxuICogdGhpcyBmdW5jdGlvbiBleHRyYWN0IGFuIGFycmF5IG9mIGV2YWx1YXRlZCBleHByZXNzaW9uIGZyb20gbWFpbiBmb3JtIHJlcHMuXG4gKlxuICogQGV4cG9ydFxuICogQHBhcmFtIHtNYWluRm9ybX0gbWFpbkZvcm1cbiAqIEBwYXJhbSB7c3RyaW5nfSBleHByZXNzaW9uXG4gKiBAcmV0dXJuIHsqfSAge2FueVtdfVxuICovXG5leHBvcnQgZnVuY3Rpb24gRlJPTV9SRVBTKG1haW5Gb3JtOiBNYWluRm9ybSwgZXhwcmVzc2lvbjogc3RyaW5nKTogYW55W10ge1xuICBjb25zdCByZXM6IGFueVtdID0gW107XG5cbiAgaWYgKG1haW5Gb3JtICE9IG51bGwgJiYgbWFpbkZvcm0ucmVwcyAhPSBudWxsKSB7XG4gICAgY29uc3QgcmVwcyA9IE9iamVjdC5rZXlzKG1haW5Gb3JtLnJlcHMpXG4gICAgICAubWFwKGtleSA9PiAobWFpbkZvcm0ucmVwcyBhcyBJbnN0YW5jZXMpW2tleV0uZmxhdCgpKVxuICAgICAgLmZsYXQoKTtcbiAgICByZXBzLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgcmVzLnB1c2goZXZhbHVhdGVFeHByZXNzaW9uKGV4cHJlc3Npb24sIGNoaWxkKSk7XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4gcmVzO1xufVxuXG4vKipcbiAqIHRoaXMgZnVuY3Rpb24gcmV0dXJuIHRydWUgaWYgdmFsdWUgaXMgaW5zaWRlIG9mIGRhdGFzZXRcbiAqXG4gKiBAZXhwb3J0XG4gKiBAcGFyYW0ge2FueVtdfSBkYXRhc2V0XG4gKiBAcGFyYW0geyp9IHZhbHVlXG4gKiBAcmV0dXJuIHsqfSAge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBJU0lOKGRhdGFzZXQ6IGFueVtdLCB2YWx1ZTogYW55KTogYm9vbGVhbiB7XG4gIGlmIChkYXRhc2V0ID09IG51bGwgfHwgdmFsdWUgPT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gZGF0YXNldC5pbmRleE9mKHZhbHVlKSA+PSAwO1xufVxuXG4vKipcbiAqIHRoZSBsZW5ndGhzIG9mIHRoZSBkYXRhc2V0cyBhcmUgYXNzdW1lZCB0byBiZSB0aGUgc2FtZS5cbiAqIHRoaXMgZnVuY3Rpb24gcmV0dXJuIGFuIGFycmF5IGxpc3Qgb2YgY2FsY3VsYXRlZCB2YWx1ZXMuXG4gKiBlYWNoIGVsZW1lbnQgb2YgdGhlIGFycmF5IGlzIGNhbGN1bGF0ZWQgYnkgcmVwbGFjaW5nIGVsZW1BIHdpdGggdGhlIGN1cnJlbnQgZWxlbWVudCBvZiBhXG4gKiBhbmQgZWxlbUIgd2l0aCB0aGUgY3VycmVudCBlbGVtZW50IG9mIGIgaW5zaWRlIHRoZSBleHByZXNzaW9uLlxuICpcbiAqIEBleHBvcnRcbiAqIEBwYXJhbSB7bnVtYmVyW119IGRhdGFzZXRBXG4gKiBAcGFyYW0ge251bWJlcltdfSBkYXRhc2V0QlxuICogQHBhcmFtIHtzdHJpbmd9IGV4cHJlc3Npb25cbiAqIEByZXR1cm4geyp9ICB7bnVtYmVyW119XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBPUChkYXRhc2V0QTogbnVtYmVyW10sIGRhdGFzZXRCOiBudW1iZXJbXSwgZXhwcmVzc2lvbjogc3RyaW5nKTogbnVtYmVyW10ge1xuICBjb25zdCByZXM6IG51bWJlcltdID0gW107XG4gIGlmIChkYXRhc2V0QSA9PSBudWxsIHx8IGRhdGFzZXRCLmxlbmd0aCA+IGRhdGFzZXRBLmxlbmd0aCkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuICBpZiAoZGF0YXNldEIgPT0gbnVsbCkge1xuICAgIHJldHVybiBkYXRhc2V0QTtcbiAgfVxuICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGFzZXRBLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgZWxlbUEgPSBkYXRhc2V0QVtpXSB8fCAwO1xuICAgIGNvbnN0IGVsZW1CID0gZGF0YXNldEJbaV0gfHwgMDtcbiAgICBjb25zdCBleHByID0gZXhwcmVzc2lvblxuICAgICAgLnNwbGl0KCdlbGVtQScpXG4gICAgICAuam9pbihKU09OLnN0cmluZ2lmeShlbGVtQSkpXG4gICAgICAuc3BsaXQoJ2VsZW1CJylcbiAgICAgIC5qb2luKEpTT04uc3RyaW5naWZ5KGVsZW1CKSk7XG4gICAgcmVzLnB1c2goZXZhbHVhdGVFeHByZXNzaW9uKGV4cHIpKTtcbiAgfVxuXG4gIHJldHVybiByZXM7XG59XG5cbi8qKlxuICogdGhpcyBmdW5jdGlvbiB0YWtlIGEgYWpmIHNjaGVtYSBhbmQgYSBsaXN0IG9mIGZpZWxkIG5hbWVzIGFzIGlucHV0IGFuZFxuICogcmV0dXJucyBhIGxpc3Qgb2YgbGFiZWwgbWF0Y2hlZCBpbnNpZGUgYSBzY2hlbWEgY2hvaWNoZSBvcmlnaW5zLlxuICpcbiAqIEBleHBvcnRcbiAqIEBwYXJhbSB7Kn0gc2NoZW1hXG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBmaWVsZE5hbWVzXG4gKiBAcmV0dXJuIHsqfSAge3N0cmluZ1tdfVxuICovXG5leHBvcnQgZnVuY3Rpb24gR0VUX0xBQkVMUyhzY2hlbWE6IGFueSwgZmllbGROYW1lczogc3RyaW5nW10pOiBzdHJpbmdbXSB7XG4gIGNvbnN0IGxhYmVsczoge1tmaWVsZE5hbWU6IHN0cmluZ106IHN0cmluZ30gPSB7fTtcblxuICBpZiAoc2NoZW1hICE9IG51bGwgJiYgc2NoZW1hLmNob2ljZXNPcmlnaW5zICE9IG51bGwpIHtcbiAgICAoc2NoZW1hLmNob2ljZXNPcmlnaW5zIGFzIGFueVtdKS5mb3JFYWNoKGNob2ljZSA9PiB7XG4gICAgICBpZiAoY2hvaWNlICE9IG51bGwgJiYgY2hvaWNlLmNob2ljZXMgIT0gbnVsbCkge1xuICAgICAgICAoY2hvaWNlLmNob2ljZXMgYXMgYW55W10pLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICAgICAgbGFiZWxzW2VsZW1lbnQudmFsdWVdID0gZWxlbWVudC5sYWJlbDtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4gZmllbGROYW1lcy5tYXAoZmllbGROYW1lID0+IChsYWJlbHNbZmllbGROYW1lXSAhPSBudWxsID8gbGFiZWxzW2ZpZWxkTmFtZV0gOiBmaWVsZE5hbWUpKTtcbn1cbiJdfQ==