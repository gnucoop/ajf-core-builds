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
    const forms = [...(mainforms || [])];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwcmVzc2lvbi11dGlscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvbW9kZWxzL3NyYy91dGlscy9leHByZXNzaW9uLXV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUdILE9BQU8sS0FBSyxPQUFPLE1BQU0sVUFBVSxDQUFDO0FBQ3BDLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxTQUFTLENBQUM7QUFDcEMsT0FBTyxLQUFLLFNBQVMsTUFBTSxRQUFRLENBQUM7QUFLcEMsSUFBSSxXQUFXLEdBQVEsRUFBRSxDQUFDO0FBRTFCLE1BQU0sTUFBTSxHQUFHLFNBQVMsQ0FBQyxPQUFPLElBQUksU0FBUyxDQUFDO0FBWTlDLE1BQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQztBQUVwQixNQUFNLENBQUMsTUFBTSxrQkFBa0IsR0FBRyxDQUNoQyxNQUFjLEVBQ2QscUJBQThCLEtBQUssRUFDekIsRUFBRTtJQUNaLE1BQU0sV0FBVyxHQUFHLEVBQWMsQ0FBQztJQUNuQyxJQUFJO1FBQ0YsV0FBVyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsRUFBRTtZQUM3QixPQUFPLEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxFQUFFO2dCQUM3QixJQUFJLEtBQUssSUFBSSxZQUFZLEVBQUU7b0JBQ3pCLE1BQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO29CQUMzRCxJQUFJLGtCQUFrQixJQUFJLFVBQVUsS0FBSyxRQUFRLEVBQUU7d0JBQ2pELFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7cUJBQzlCO2lCQUNGO1lBQ0gsQ0FBQztTQUNGLENBQUMsQ0FBQztLQUNKO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDVixPQUFPLENB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RUFBRTtZQUNoRCxJQUFJLE1BQU0sSUFBSSxJQUFJLElBQUksTUFBTSxDQUFDLE9BQU8sSUFBSSxJQUFJLEVBQUU7Z0JBQzNDLE1BQU0sQ0FBQyxPQUFpQixDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtvQkFDMUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO2dCQUN4QyxDQUFDLENBQUMsQ0FBQzthQUNKO1FBQ0gsQ0FBQyxDQUFDLENBQUM7S0FDSjtJQUVELE9BQU8sVUFBVSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0FBQ2xHLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmQ29udGV4dH0gZnJvbSAnQGFqZi9jb3JlL2NvbW1vbic7XG5pbXBvcnQgKiBhcyBkYXRlRm5zIGZyb20gJ2RhdGUtZm5zJztcbmltcG9ydCB7cGFyc2VTY3JpcHR9IGZyb20gJ21lcml5YWgnO1xuaW1wb3J0ICogYXMgbnVtYnJvTW9kIGZyb20gJ251bWJybyc7XG5pbXBvcnQge0FqZlRhYmxlQ2VsbH0gZnJvbSAnQGFqZi9jb3JlL3RhYmxlJztcblxuaW1wb3J0IHtBamZWYWxpZGF0aW9uRm59IGZyb20gJy4uL2ludGVyZmFjZS92YWxpZGF0aW9uLWZ1bmN0aW9uJztcblxubGV0IGV4ZWNDb250ZXh0OiBhbnkgPSB7fTtcblxuY29uc3QgbnVtYnJvID0gbnVtYnJvTW9kLmRlZmF1bHQgfHwgbnVtYnJvTW9kO1xuZXhwb3J0IGludGVyZmFjZSBGb3JtIHtcbiAgW2tleTogc3RyaW5nXTogc3RyaW5nIHwgbnVtYmVyIHwgbnVsbDtcbn1cbmV4cG9ydCBpbnRlcmZhY2UgSW5zdGFuY2VzIHtcbiAgW2luc3RhbmNlOiBzdHJpbmddOiBGb3JtW107XG59XG5leHBvcnQgaW50ZXJmYWNlIE1haW5Gb3JtIHtcbiAgW2tleTogc3RyaW5nXTogc3RyaW5nIHwgbnVtYmVyIHwgbnVsbCB8IEluc3RhbmNlcyB8IHVuZGVmaW5lZCB8IG51bGw7XG4gIHJlcHM/OiBJbnN0YW5jZXM7XG59XG5cbmNvbnN0IE1BWF9SRVBTID0gMzA7XG5cbmV4cG9ydCBjb25zdCBnZXRDb2RlSWRlbnRpZmllcnMgPSAoXG4gIHNvdXJjZTogc3RyaW5nLFxuICBpbmNsdWRlRG9sbGFyVmFsdWU6IGJvb2xlYW4gPSBmYWxzZSxcbik6IHN0cmluZ1tdID0+IHtcbiAgY29uc3QgaWRlbnRpZmllcnMgPSBbXSBhcyBzdHJpbmdbXTtcbiAgdHJ5IHtcbiAgICBwYXJzZVNjcmlwdChzb3VyY2UudG9TdHJpbmcoKSwge1xuICAgICAgb25Ub2tlbjogKHRva2VuLCBzdGFydCwgZW5kKSA9PiB7XG4gICAgICAgIGlmICh0b2tlbiA9PSAnSWRlbnRpZmllcicpIHtcbiAgICAgICAgICBjb25zdCBpZGVudGlmaWVyID0gc291cmNlLnRvU3RyaW5nKCkuc3Vic3RyaW5nKHN0YXJ0LCBlbmQpO1xuICAgICAgICAgIGlmIChpbmNsdWRlRG9sbGFyVmFsdWUgfHwgaWRlbnRpZmllciAhPT0gJyR2YWx1ZScpIHtcbiAgICAgICAgICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgIH0pO1xuICB9IGNhdGNoIChlKSB7XG4gICAgY29uc29sZS5sb2coc291cmNlKTtcbiAgICBjb25zb2xlLmxvZyhlKTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcnMuc29ydCgoaTEsIGkyKSA9PiBpMi5sb2NhbGVDb21wYXJlKGkxKSk7XG59O1xuXG5leHBvcnQgY29uc3QgZGF0ZVV0aWxzID0ge1xuICBhZGREYXlzOiBkYXRlRm5zLmFkZERheXMsXG4gIGFkZE1vbnRoczogZGF0ZUZucy5hZGRNb250aHMsXG4gIGFkZFllYXJzOiBkYXRlRm5zLmFkZFllYXJzLFxuICBlbmRPZklTT1dlZWs6IGRhdGVGbnMuZW5kT2ZJU09XZWVrLFxuICBmb3JtYXQ6IGRhdGVGbnMuZm9ybWF0LFxuICBnZXREYXk6IGRhdGVGbnMuZ2V0RGF5LFxuICBwYXJzZTogZGF0ZUZucy5wYXJzZUlTTyxcbiAgc3RhcnRPZk1vbnRoOiBkYXRlRm5zLnN0YXJ0T2ZNb250aCxcbiAgc3RhcnRPZklTT1dlZWs6IGRhdGVGbnMuc3RhcnRPZklTT1dlZWssXG4gIGlzQmVmb3JlOiBkYXRlRm5zLmlzQmVmb3JlLFxufTtcblxuZXhwb3J0IGNsYXNzIEFqZkV4cHJlc3Npb25VdGlscyB7XG4gIC8vIFRPRE8gd2hhdCBpcyBpdCBmb3JcbiAgc3RhdGljIFVUSUxfRlVOQ1RJT05TID0gJyc7XG4gIC8qKlxuICAgKiBJdCBpcyBhIGtleS12YWx1ZSBkaWN0aW9uYXJ5LCB0aGF0IG1hcHBpbmcgYWxsIEFqZiB2YWxpZGF0aW9uIGZ1bmN0aW9ucy5cbiAgICovXG4gIHN0YXRpYyB1dGlsczoge1tuYW1lOiBzdHJpbmddOiBBamZWYWxpZGF0aW9uRm59ID0ge1xuICAgIGRpZ2l0Q291bnQ6IHtmbjogZGlnaXRDb3VudH0sXG4gICAgZGVjaW1hbENvdW50OiB7Zm46IGRlY2ltYWxDb3VudH0sXG4gICAgaXNJbnQ6IHtmbjogaXNJbnR9LFxuICAgIG5vdEVtcHR5OiB7Zm46IG5vdEVtcHR5fSxcbiAgICB2YWx1ZUluQ2hvaWNlOiB7Zm46IHZhbHVlSW5DaG9pY2V9LFxuICAgIHNjYW5Hcm91cEZpZWxkOiB7Zm46IHNjYW5Hcm91cEZpZWxkfSxcbiAgICBzdW06IHtmbjogc3VtfSxcbiAgICBkYXRlT3BlcmF0aW9uczoge2ZuOiBkYXRlT3BlcmF0aW9uc30sXG4gICAgcm91bmQ6IHtmbjogcm91bmR9LFxuICAgIGV4dHJhY3RBcnJheToge2ZuOiBleHRyYWN0QXJyYXl9LFxuICAgIGV4dHJhY3RTdW06IHtmbjogZXh0cmFjdFN1bX0sXG4gICAgZXh0cmFjdEFycmF5U3VtOiB7Zm46IGV4dHJhY3RBcnJheVN1bX0sXG4gICAgZHJhd1RocmVzaG9sZDoge2ZuOiBkcmF3VGhyZXNob2xkfSxcbiAgICBleHRyYWN0RGF0ZXM6IHtmbjogZXh0cmFjdERhdGVzfSxcbiAgICBsYXN0UHJvcGVydHk6IHtmbjogbGFzdFByb3BlcnR5fSxcbiAgICBzdW1MYXN0UHJvcGVydGllczoge2ZuOiBzdW1MYXN0UHJvcGVydGllc30sXG4gICAgY2FsY3VsYXRlVHJlbmRQcm9wZXJ0eToge2ZuOiBjYWxjdWxhdGVUcmVuZFByb3BlcnR5fSxcbiAgICBjYWxjdWxhdGVUcmVuZEJ5UHJvcGVydGllczoge2ZuOiBjYWxjdWxhdGVUcmVuZEJ5UHJvcGVydGllc30sXG4gICAgY2FsY3VsYXRlQXZnUHJvcGVydHk6IHtmbjogY2FsY3VsYXRlQXZnUHJvcGVydHl9LFxuICAgIGNhbGN1bGF0ZUF2Z1Byb3BlcnR5QXJyYXk6IHtmbjogY2FsY3VsYXRlQXZnUHJvcGVydHlBcnJheX0sXG4gICAgYWxlcnQ6IHtmbjogYWxlcnR9LFxuICAgIGZvcm1hdE51bWJlcjoge2ZuOiBmb3JtYXROdW1iZXJ9LFxuICAgIGZvcm1hdERhdGU6IHtmbjogZm9ybWF0RGF0ZX0sXG4gICAgaXNvTW9udGg6IHtmbjogaXNvTW9udGh9LFxuICAgIGdldENvb3JkaW5hdGU6IHtmbjogZ2V0Q29vcmRpbmF0ZX0sXG4gICAgTWF0aDoge2ZuOiBNYXRofSxcbiAgICBwYXJzZUludDoge2ZuOiBwYXJzZUludH0sXG4gICAgcGFyc2VGbG9hdDoge2ZuOiBwYXJzZUZsb2F0fSxcbiAgICBwYXJzZURhdGU6IHtmbjogZGF0ZVV0aWxzLnBhcnNlfSxcbiAgICBEYXRlOiB7Zm46IERhdGV9LFxuICAgIHBsYWluQXJyYXk6IHtmbjogcGxhaW5BcnJheX0sXG4gICAgQ09VTlRfRk9STVM6IHtmbjogQ09VTlRfRk9STVN9LFxuICAgIENPVU5UX0ZPUk1TX1VOSVFVRToge2ZuOiBDT1VOVF9GT1JNU19VTklRVUV9LFxuICAgIENPVU5UX1JFUFM6IHtmbjogQ09VTlRfUkVQU30sXG4gICAgU1VNOiB7Zm46IFNVTX0sXG4gICAgTUVBTjoge2ZuOiBNRUFOfSxcbiAgICBQRVJDRU5UOiB7Zm46IFBFUkNFTlR9LFxuICAgIExBU1Q6IHtmbjogTEFTVH0sXG4gICAgTUFYOiB7Zm46IE1BWH0sXG4gICAgTUVESUFOOiB7Zm46IE1FRElBTn0sXG4gICAgTU9ERToge2ZuOiBNT0RFfSxcbiAgICBBTExfVkFMVUVTX09GOiB7Zm46IEFMTF9WQUxVRVNfT0Z9LFxuICAgIFJFUEVBVDoge2ZuOiBSRVBFQVR9LFxuICAgIEVWQUxVQVRFOiB7Zm46IEVWQUxVQVRFfSxcbiAgICBidWlsZERhdGFzZXQ6IHtmbjogYnVpbGREYXRhc2V0fSxcbiAgICBGSUxURVJfQlk6IHtmbjogRklMVEVSX0JZfSxcbiAgICBJU19CRUZPUkU6IHtmbjogSVNfQkVGT1JFfSxcbiAgICBJU19BRlRFUjoge2ZuOiBJU19BRlRFUn0sXG4gICAgSVNfV0lUSElOX0lOVEVSVkFMOiB7Zm46IElTX1dJVEhJTl9JTlRFUlZBTH0sXG4gICAgQVBQTFk6IHtmbjogQVBQTFl9LFxuICAgIFRPREFZOiB7Zm46IFRPREFZfSxcbiAgICBHRVRfQUdFOiB7Zm46IEdFVF9BR0V9LFxuICAgIEJVSUxEX0RBVEFTRVQ6IHtmbjogQlVJTERfREFUQVNFVH0sXG4gICAgSk9JTl9GT1JNUzoge2ZuOiBKT0lOX0ZPUk1TfSxcbiAgICBMRU46IHtmbjogTEVOfSxcbiAgICBKT0lOX1JFUEVBVElOR19TTElERVM6IHtmbjogSk9JTl9SRVBFQVRJTkdfU0xJREVTfSxcbiAgICBGUk9NX1JFUFM6IHtmbjogRlJPTV9SRVBTfSxcbiAgICBJU0lOOiB7Zm46IElTSU59LFxuICAgIE9QOiB7Zm46IE9QfSxcbiAgICBHRVRfTEFCRUxTOiB7Zm46IEdFVF9MQUJFTFN9LFxuICAgIFJPVU5EOiB7Zm46IFJPVU5EfSxcbiAgICBDT05TT0xFX0xPRzoge2ZuOiBDT05TT0xFX0xPR30sXG4gIH07XG59XG5cbmNvbnN0IG5vbk51bGxJbnN0YW5jZXMgPSAocmVwczogSW5zdGFuY2VzIHwgdW5kZWZpbmVkKTogcmVwcyBpcyBJbnN0YW5jZXMgPT4gcmVwcyAhPSBudWxsO1xuXG4vKipcbiAqIFVUSUxJVFkgRlVOQ0lPTlxuICogVGhpcyBmdW5jdGlvbiBwcm92aWRlIGEgZGVlcCBjb3B5IGJ1aWxkZXIgb2YgYXJyYXkgb2YgbWFpbiBmb3Jtcy5cbiAqIFRoYXQncyBhIGN1c3RvbSBmdW5jdGlvbiByZWxhdGVkIHRvIG1haW5mb3JtcyB0aGF0IGNhbiBiZSBhYmxlIHRvIGluY3JlYXNlIGNvcHkgcGVyZm9ybWFuY2UuXG4gKlxuICogQHBhcmFtIHtNYWluRm9ybVtdfSBmb3Jtc1xuICogQHJldHVybiB7Kn0gIHtNYWluRm9ybVtdfVxuICovXG5mdW5jdGlvbiBjbG9uZU1haW5Gb3Jtcyhmb3JtczogTWFpbkZvcm1bXSk6IE1haW5Gb3JtW10ge1xuICBsZXQgcmVzOiBNYWluRm9ybVtdID0gW107XG4gIGZvcm1zLmZvckVhY2goZm9ybSA9PiB7XG4gICAgbGV0IHJlcHM6IEluc3RhbmNlcyA9IHt9O1xuICAgIGlmIChmb3JtID09IG51bGwpIHtcbiAgICAgIHJlcy5wdXNoKG51bGwgYXMgdW5rbm93biBhcyBNYWluRm9ybSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChmb3JtLnJlcHMgIT0gbnVsbCkge1xuICAgICAgICBPYmplY3Qua2V5cyhmb3JtLnJlcHMpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgICByZXBzW2tleV0gPSBmb3JtLnJlcHMhW2tleV0uc2xpY2UoMCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgY29uc3QgZiA9IHsuLi5mb3JtLCByZXBzfTtcbiAgICAgIHJlcy5wdXNoKGYpO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiByZXM7XG59XG5leHBvcnQgZnVuY3Rpb24gZXZhbHVhdGVFeHByZXNzaW9uKFxuICBleHByZXNzaW9uOiBzdHJpbmcsXG4gIGNvbnRleHQ/OiBBamZDb250ZXh0LFxuICBmb3JjZUZvcm11bGE/OiBzdHJpbmcsXG4pOiBhbnkge1xuICBsZXQgZm9ybXVsYSA9IGZvcmNlRm9ybXVsYSB8fCBleHByZXNzaW9uIHx8ICcnO1xuICBpZiAoZm9ybXVsYSA9PT0gJycpIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cbiAgaWYgKGZvcm11bGEgPT09ICd0cnVlJykge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGlmIChmb3JtdWxhID09PSAnZmFsc2UnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmIChjb250ZXh0ICE9IG51bGwgJiYgY29udGV4dFtmb3JtdWxhXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIGNvbnRleHRbZm9ybXVsYV07XG4gIH1cbiAgaWYgKC9eXCJbXlwiXSpcIiQvLnRlc3QoZm9ybXVsYSkpIHtcbiAgICByZXR1cm4gZm9ybXVsYS5yZXBsYWNlKC9eXCIrfFwiKyQvZywgJycpO1xuICB9XG4gIGNvbnN0IGlkZW50aWZpZXJzID0gZ2V0Q29kZUlkZW50aWZpZXJzKGZvcm11bGEsIHRydWUpO1xuICBjb25zdCBjdHg6IGFueVtdID0gW107XG4gIGlkZW50aWZpZXJzLmZvckVhY2goKGtleTogc3RyaW5nKSA9PiB7XG4gICAgbGV0IHZhbDogYW55ID0gbnVsbDtcbiAgICBpZiAoY29udGV4dCAhPSBudWxsICYmIGNvbnRleHRba2V5XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB2YWwgPSBjb250ZXh0W2tleV07XG4gICAgfSBlbHNlIGlmIChBamZFeHByZXNzaW9uVXRpbHMudXRpbHNba2V5XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb25zdCB1dGlsID0gQWpmRXhwcmVzc2lvblV0aWxzLnV0aWxzW2tleV07XG4gICAgICB2YWwgPSB1dGlsLmZuO1xuICAgIH1cbiAgICBjdHgucHVzaCh2YWwpO1xuICB9KTtcbiAgaWRlbnRpZmllcnMucHVzaCgnZXhlY0NvbnRleHQnKTtcbiAgY3R4LnB1c2goZXhlY0NvbnRleHQpO1xuXG4gIHRyeSB7XG4gICAgbGV0IGYgPSBuZXcgRnVuY3Rpb24oLi4uaWRlbnRpZmllcnMsIGByZXR1cm4gJHtmb3JtdWxhfWApO1xuICAgIGNvbnN0IHJlcyA9IGYoLi4uY3R4KTtcbiAgICBmID0gPGFueT5udWxsO1xuICAgIHJldHVybiByZXM7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cbi8qKlxuICogSXQgcmV0dXJucyB0aGUgY291bnQgb2YgZGlnaXQgaW5zaWRlIHguXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkaWdpdENvdW50KHg6IG51bWJlcik6IG51bWJlciB7XG4gIGlmIChpc05hTih4KSB8fCB0eXBlb2YgeCAhPT0gJ251bWJlcicpIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuICBpZiAoIWlzRmluaXRlKHgpKSB7XG4gICAgcmV0dXJuIEluZmluaXR5O1xuICB9XG4gIHJldHVybiB4LnRvU3RyaW5nKCkucmVwbGFjZSgvW14wLTldL2csICcnKS5sZW5ndGg7XG59XG4vKipcbiAqIEl0IGlzIGNvdW50IHRoZSBjb3VudCBvZiBkZWNpbWFsIGRpZ2l0IGluc2lkZSBzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZGVjaW1hbENvdW50KHg6IHN0cmluZyB8IG51bWJlcik6IG51bWJlciB7XG4gIGlmICh0eXBlb2YgeCA9PT0gJ3N0cmluZycpIHtcbiAgICB4ID0gcGFyc2VGbG9hdCh4KTtcbiAgfVxuICBpZiAodHlwZW9mIHggIT09ICdudW1iZXInIHx8IGlzTmFOKHgpKSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cbiAgY29uc3QgcGFydHMgPSB4LnRvU3RyaW5nKCkuc3BsaXQoJy4nKTtcbiAgcmV0dXJuIHBhcnRzLmxlbmd0aCA+IDEgPyBwYXJ0c1sxXS5sZW5ndGggOiAwO1xufVxuLyoqXG4gKiBJdCBpcyB0cnVlIGlmIHggaXMgYW4gaW50ZWdlci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzSW50KHg6IHN0cmluZyB8IG51bWJlcik6IGJvb2xlYW4ge1xuICBpZiAodHlwZW9mIHggPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIC9eLT9cXGQrJC8udGVzdCh4KTtcbiAgfVxuICBpZiAodHlwZW9mIHggPT09ICdudW1iZXInKSB7XG4gICAgcmV0dXJuIE1hdGgucm91bmQoeCkgPT09IHg7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuLyoqXG4gKiBJdCBpcyB0cnVlIGlmIHggaXMgbm90IGVtcHR5LlxuICovXG5leHBvcnQgZnVuY3Rpb24gbm90RW1wdHkoeDogYW55KTogYm9vbGVhbiB7XG4gIHJldHVybiB0eXBlb2YgeCAhPT0gJ3VuZGVmaW5lZCcgJiYgeCAhPT0gbnVsbCA/IHgudG9TdHJpbmcoKS5sZW5ndGggPiAwIDogZmFsc2U7XG59XG4vKipcbiAqIEl0IGlzIHRydWUgaWYgYXJyYXkgY29udGFpbnMgeCBvciBhcnJheSBpcyBlcXVhbCB0byB4LlxuICovXG5leHBvcnQgZnVuY3Rpb24gdmFsdWVJbkNob2ljZShhcnJheTogYW55W10sIHg6IGFueSk6IGJvb2xlYW4ge1xuICByZXR1cm4gKGFycmF5IHx8IFtdKS5pbmRleE9mKHgpID4gLTEgfHwgYXJyYXkgPT09IHg7XG59XG4vKipcbiAqIEl0IGFwcGxpZXMgY2FsbGJhY2sgZm9yIHJlcHMgdGltZXMgYW5kIGFjY3VtdWxhdGUgdGhlIHJlc3VsdCBpbiBhY2MuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzY2FuR3JvdXBGaWVsZChyZXBzOiBudW1iZXIsIGFjYzogYW55LCBjYWxsYmFjazogYW55KTogYW55IHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXBzOyBpKyspIHtcbiAgICBhY2MgPSBjYWxsYmFjayhhY2MsIGkpO1xuICB9XG4gIHJldHVybiBhY2M7XG59XG4vKipcbiAqIEl0IHJldHVybnMgdGhlIHN1bSBvZiB0aGUgYXJyYXkgdmFsdWVzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gc3VtKGFycmF5OiBhbnlbXSk6IGFueSB7XG4gIHJldHVybiBhcnJheS5yZWR1Y2UoKGEsIGIpID0+IGEgKyBiLCAwKTtcbn1cbi8qKlxuICogSXQgYXBwbGllcyBhZGQvcmVtb3ZlKG9wZXJhdGlvbikgdiAoZGF5L21vbnRoL3llYXIpcGVyaW9kIHRvIGRzdHJpbmcgYW5kIHJldHVybiBuZXcgZm9ybWF0IGRhdGUuXG4gKi9cbi8vIFRPRE8gY2hlY2sgaWYgZGVwcmVjYXRlZCBpbnN0ZWFkIHJlZmFjb3RvcmluZyBwYXJhbWV0ZXIgdHlwZVxuLy8gVE9ETyAoZFN0cmluZzogc3RyaW5nfG51bGwsIHBlcmlvZDonZGF5J3wnbW9udGgnfCd5ZWFyJyxcbi8vIFRPRE8gb3BlcmF0aW9uOiAnYWRkL3JlbW92ZScgPSAnYWRkJywgdjpudW1iZXIpXG5leHBvcnQgZnVuY3Rpb24gZGF0ZU9wZXJhdGlvbnMoZFN0cmluZzogc3RyaW5nLCBwZXJpb2Q6IHN0cmluZywgb3BlcmF0aW9uOiBzdHJpbmcsIHY6IGFueSk6IHN0cmluZyB7XG4gIGNvbnN0IGZtdCA9ICdtbS9kZC95eXl5JztcbiAgbGV0IGQgPSB0eXBlb2YgZFN0cmluZyAhPT0gJ3VuZGVmaW5lZCcgPyBkYXRlVXRpbHMucGFyc2UoZFN0cmluZykgOiBuZXcgRGF0ZSgpO1xuICBpZiAob3BlcmF0aW9uID09ICdyZW1vdmUnKSB7XG4gICAgdiA9IC12O1xuICB9XG4gIGxldCBkYXRlT3A7XG4gIHN3aXRjaCAocGVyaW9kKSB7XG4gICAgY2FzZSAnZGF5JzpcbiAgICAgIGRhdGVPcCA9IGRhdGVVdGlscy5hZGREYXlzO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnbW9udGgnOlxuICAgICAgZGF0ZU9wID0gZGF0ZVV0aWxzLmFkZE1vbnRocztcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3llYXInOlxuICAgICAgZGF0ZU9wID0gZGF0ZVV0aWxzLmFkZFllYXJzO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiAnJztcbiAgfVxuICByZXR1cm4gZGF0ZVV0aWxzLmZvcm1hdChkYXRlT3AoZCwgdiksIGZtdCk7XG59XG4vKipcbiAqIEl0IHJvdW5kcyB0aGUgbnVtIHdpdGggdGhlIHZhbHVlIG9mIGRpZ2l0c1xuICovXG5leHBvcnQgZnVuY3Rpb24gcm91bmQobnVtOiBudW1iZXIgfCBzdHJpbmcsIGRpZ2l0cz86IG51bWJlcik6IG51bWJlciB7XG4gIGRpZ2l0cyA9IGRpZ2l0cyB8fCAwO1xuICBsZXQgZjtcbiAgaWYgKHR5cGVvZiBudW0gIT09ICdudW1iZXInKSB7XG4gICAgdHJ5IHtcbiAgICAgIGYgPSBwYXJzZUZsb2F0KG51bSk7XG4gICAgfSBjYXRjaCAoZSkge31cbiAgfSBlbHNlIHtcbiAgICBmID0gbnVtO1xuICB9XG4gIGlmIChmID09IG51bGwgfHwgaXNOYU4oZikpIHtcbiAgICBmID0gMDtcbiAgfVxuICBjb25zdCBtID0gTWF0aC5wb3coMTAsIGRpZ2l0cyk7XG4gIHJldHVybiBNYXRoLnJvdW5kKGYgKiBtKSAvIG07XG59XG4vKipcbiAqIEl0IGV4dHJhY3RzIHByb3BlcnR5IGZyb20gc291cmNlLlxuICogZm9yIGV2ZXJ5IGVsZW1lbnQgb2Ygc291cmNlIGlmIHByb3BlcnR5IGFuZCBwcm9wZXJ0eTIgYXJlIGRlZmluZWQgcmV0dXJuIHRoZSBzdW1cbiAqIGVsc2UgaWYgb25seSBwcm9wZXJ0eSBpcyBkZWZpbmVkIHJldHVybiBoaW0uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBleHRyYWN0QXJyYXkoc291cmNlOiBhbnlbXSwgcHJvcGVydHk6IHN0cmluZywgcHJvcGVydHkyPzogc3RyaW5nKTogYW55W10ge1xuICBzb3VyY2UgPSAoc291cmNlIHx8IFtdKS5zbGljZSgwKTtcbiAgY29uc3QgbCA9IHNvdXJjZS5sZW5ndGg7XG4gIGNvbnN0IHJlczogYW55W10gPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsOyBpKyspIHtcbiAgICBpZiAoc291cmNlW2ldW3Byb3BlcnR5XSAhPSBudWxsICYmIHByb3BlcnR5MiAhPSBudWxsICYmIHNvdXJjZVtpXVtwcm9wZXJ0eTJdICE9IG51bGwpIHtcbiAgICAgIHJlcy5wdXNoKE51bWJlcihzb3VyY2VbaV1bcHJvcGVydHldKSArIE51bWJlcihzb3VyY2VbaV1bcHJvcGVydHkyXSkpO1xuICAgIH0gZWxzZSBpZiAoc291cmNlW2ldW3Byb3BlcnR5XSAhPSBudWxsKSB7XG4gICAgICByZXMucHVzaChzb3VyY2VbaV1bcHJvcGVydHldKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cbi8qKlxuICogSXQgcmV0dXJucyB0aGUgc3VtIG9mIGFsbCBkZWZpbmVkIHByb3BlcnRpZXMgb2YgZWFjaCBlbGVtZW50IG9mIHNvdXJjZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGV4dHJhY3RTdW0oc291cmNlOiBhbnlbXSwgcHJvcGVydGllczogc3RyaW5nW10pOiBudW1iZXIge1xuICBsZXQgc3VtVmFsID0gMDtcbiAgcHJvcGVydGllcyA9IChwcm9wZXJ0aWVzIHx8IFtdKS5zbGljZSgwKTtcbiAgY29uc3QgbCA9IHByb3BlcnRpZXMubGVuZ3RoO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbDsgaSsrKSB7XG4gICAgY29uc3QgYXJyYXkgPSBleHRyYWN0QXJyYXkoc291cmNlLCBwcm9wZXJ0aWVzW2ldKTtcbiAgICBjb25zdCBsZW5nID0gYXJyYXkubGVuZ3RoO1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgbGVuZzsgaisrKSB7XG4gICAgICBpZiAoIWlzTmFOKE51bWJlcihhcnJheVtqXSkpKSB7XG4gICAgICAgIHN1bVZhbCArPSBOdW1iZXIoYXJyYXlbal0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gc3VtVmFsO1xufVxuLyoqXG4gKiBJdCByZXR1cm5zIGEgbnVtYmVyIGFycmF5IHRoYXQgY29udGFpbnMgdGhlIHN1bSBvZiBwcm9wZXJ0aWVzIHZhbHVlIGluc2lkZSB0aGUgc291cmNlLlxuICogZXh0cmFjdEFycmF5U3VtKFt7YTogNX0sIHtiOiAxfSwge2E6IDUsIGI6IDF9XSwgWydhJywgJ2InXSk7ID0mZ3Q7IFs2LDZdXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBleHRyYWN0QXJyYXlTdW0oc291cmNlOiBhbnlbXSwgcHJvcGVydGllczogc3RyaW5nW10pOiBhbnlbXSB7XG4gIGNvbnN0IGFycmF5czogYW55W10gPSBbXTtcbiAgcHJvcGVydGllcyA9IChwcm9wZXJ0aWVzIHx8IFtdKS5zbGljZSgwKTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IHByb3BlcnRpZXMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBhcnJheSA9IGV4dHJhY3RBcnJheShzb3VyY2UsIHByb3BlcnRpZXNbaV0pO1xuICAgIGFycmF5cy5wdXNoKGFycmF5KTtcbiAgfVxuXG4gIGNvbnN0IHJlczogYW55W10gPSBbXTtcbiAgaWYgKGFycmF5cy5sZW5ndGggPiAwKSB7XG4gICAgZm9yIChsZXQgd2Vla0kgPSAwOyB3ZWVrSSA8IGFycmF5c1swXS5sZW5ndGg7IHdlZWtJKyspIHtcbiAgICAgIGxldCBzdW1WYWwgPSAwO1xuICAgICAgZm9yIChsZXQgcHJvcEkgPSAwOyBwcm9wSSA8IHByb3BlcnRpZXMubGVuZ3RoOyBwcm9wSSsrKSB7XG4gICAgICAgIHN1bVZhbCA9IHN1bVZhbCArIE51bWJlcihhcnJheXNbcHJvcEldW3dlZWtJXSk7XG4gICAgICB9XG4gICAgICByZXMucHVzaChzdW1WYWwpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzO1xufVxuLyoqXG4gKiBEcmF3IGEgdGhyZXNob2xkIGxpbmUgb24gY2hhcnQgcmVsYXRlZCB0byB0aGUgcHJvcGVydHkuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkcmF3VGhyZXNob2xkKHNvdXJjZTogYW55W10sIHByb3BlcnR5OiBzdHJpbmcsIHRocmVzaG9sZDogYW55W10pOiBhbnlbXSB7XG4gIHNvdXJjZSA9IChzb3VyY2UgfHwgW10pLnNsaWNlKDApO1xuICB0aHJlc2hvbGQgPSB0aHJlc2hvbGQgfHwgWzBdO1xuICBpZiAoISh0aHJlc2hvbGQgaW5zdGFuY2VvZiBBcnJheSkpIHtcbiAgICB0aHJlc2hvbGQgPSBbdGhyZXNob2xkXTtcbiAgfVxuICBjb25zdCBsID0gc291cmNlLmxlbmd0aDtcbiAgY29uc3QgcmVzOiBhbnlbXSA9IFtdO1xuICBsZXQgY291bnQgPSAwO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGw7IGkrKykge1xuICAgIGlmIChzb3VyY2VbaV1bcHJvcGVydHldICE9IG51bGwpIHtcbiAgICAgIGlmICh0aHJlc2hvbGQubGVuZ3RoID4gY291bnQpIHtcbiAgICAgICAgcmVzLnB1c2godGhyZXNob2xkW2NvdW50XSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXMucHVzaCh0aHJlc2hvbGRbMF0pO1xuICAgICAgfVxuICAgICAgY291bnQrKztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cbi8qKlxuICogRXh0cmFjdCB0aGUgZGF0ZXMgb2YgdGhlIHNvdXJjZSBvYmplY3Qgd2l0aCBwcm9wZXJ0eSAhPSBudWxsXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBleHRyYWN0RGF0ZXMoc291cmNlOiBhbnlbXSwgcHJvcGVydHk6IHN0cmluZywgZm10OiBzdHJpbmcpOiBzdHJpbmdbXSB7XG4gIHNvdXJjZSA9IChzb3VyY2UgfHwgW10pLnNsaWNlKDApO1xuICBjb25zdCBsID0gc291cmNlLmxlbmd0aDtcbiAgY29uc3QgcmVzOiBhbnkgPSBbXTtcbiAgbGV0IHByZWZpeCA9ICcnO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGw7IGkrKykge1xuICAgIGlmIChzb3VyY2VbaV1bcHJvcGVydHldICE9IG51bGwpIHtcbiAgICAgIHN3aXRjaCAoZm10KSB7XG4gICAgICAgIGNhc2UgJ1dXJzpcbiAgICAgICAgY2FzZSAnd3cnOlxuICAgICAgICAgIHByZWZpeCA9ICdXJztcbiAgICAgICAgICByZXMucHVzaChwcmVmaXggKyBmb3JtYXREYXRlKHNvdXJjZVtpXVsnZGF0ZV9zdGFydCddLCBmbXQpKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnTU0nOlxuICAgICAgICBjYXNlICdtbSc6XG4gICAgICAgICAgcHJlZml4ID0gJ00nO1xuICAgICAgICAgIHJlcy5wdXNoKHByZWZpeCArIGlzb01vbnRoKHNvdXJjZVtpXVsnZGF0ZV9zdGFydCddLCBmbXQpKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBwcmVmaXggPSAnJztcbiAgICAgICAgICByZXMucHVzaChwcmVmaXggKyBmb3JtYXREYXRlKHNvdXJjZVtpXVsnZGF0ZV9zdGFydCddLCBmbXQpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cbi8qKlxuICogRXh0cmFjdCB0aGUgbGFzdCBwcm9wZXJ0eSBjb250YWlucyBpbiBzb3VyY2UgIT0gbnVsbFxuICovXG5leHBvcnQgZnVuY3Rpb24gbGFzdFByb3BlcnR5KHNvdXJjZTogYW55LCBwcm9wZXJ0eTogc3RyaW5nKTogYW55IHtcbiAgc291cmNlID0gKHNvdXJjZSB8fCBbXSkuc2xpY2UoMCk7XG4gIGxldCBsID0gc291cmNlLmxlbmd0aCAtIDE7XG5cbiAgd2hpbGUgKGwgPj0gMCAmJiBzb3VyY2VbbF1bcHJvcGVydHldID09IG51bGwpIHtcbiAgICBsLS07XG4gICAgaWYgKGwgPCAwKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICB9XG4gIHJldHVybiBsID49IDAgPyBzb3VyY2VbbF1bcHJvcGVydHldIDogJyc7XG59XG4vKipcbiAqIEl0IHN1bSB0aGUgTEFzdCBwcm9wZXJ0aWVzIG9mIHNvdXJjZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHN1bUxhc3RQcm9wZXJ0aWVzKHNvdXJjZTogYW55W10sIHByb3BlcnRpZXM6IHN0cmluZ1tdKTogbnVtYmVyIHtcbiAgc291cmNlID0gKHNvdXJjZSB8fCBbXSkuc2xpY2UoMCk7XG4gIGxldCBzdW1WYWwgPSAwO1xuICBsZXQgdmFsID0gMDtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9wZXJ0aWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFsID0gTnVtYmVyKGxhc3RQcm9wZXJ0eShzb3VyY2UsIHByb3BlcnRpZXNbaV0pKTtcbiAgICBpZiAoIWlzTmFOKHZhbCkpIHtcbiAgICAgIHN1bVZhbCArPSB2YWw7XG4gICAgfVxuICB9XG4gIHJldHVybiBzdW1WYWw7XG59XG4vKipcbiAqIENvbXB1dGUgdGhlIHRyZW5kIG9mIHRoZSBwcm9wZXJ0eSBjb250YWluZWQgb24gdGhlIHNvdXJjZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNhbGN1bGF0ZVRyZW5kUHJvcGVydHkoc291cmNlOiBhbnlbXSwgcHJvcGVydHk6IHN0cmluZyk6IHN0cmluZyB7XG4gIHNvdXJjZSA9IChzb3VyY2UgfHwgW10pLnNsaWNlKDApO1xuICBsZXQgbGFzdCA9IHNvdXJjZS5sZW5ndGggLSAxO1xuICB3aGlsZSAoc291cmNlW2xhc3RdW3Byb3BlcnR5XSA9PSBudWxsKSB7XG4gICAgaWYgKGxhc3QgPT0gMCkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGxhc3QtLTtcbiAgfVxuICBsZXQgbGFzdExhc3QgPSBsYXN0IC0gMTtcbiAgaWYgKGxhc3QgPT0gMCkge1xuICAgIGxhc3RMYXN0ID0gbGFzdDtcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc291cmNlW2xhc3RMYXN0XVtwcm9wZXJ0eV0gPT0gbnVsbCkge1xuICAgICAgaWYgKGxhc3RMYXN0ID09IDApIHtcbiAgICAgICAgbGFzdExhc3QgPSBsYXN0O1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGxhc3RMYXN0LS07XG4gICAgfVxuICB9XG5cbiAgY29uc3QgbGFzdFByb3AgPSBzb3VyY2VbbGFzdF0gPyBzb3VyY2VbbGFzdF1bcHJvcGVydHldIHx8IDAgOiAwO1xuICBjb25zdCBsYXN0TGFzdFByb3AgPSBzb3VyY2VbbGFzdExhc3RdID8gc291cmNlW2xhc3RMYXN0XVtwcm9wZXJ0eV0gfHwgMCA6IDA7XG5cbiAgaWYgKGxhc3RQcm9wID09IGxhc3RMYXN0UHJvcCkge1xuICAgIHJldHVybiAnPHA+PGkgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiIHN0eWxlPVwiY29sb3I6Ymx1ZVwiPnRyZW5kaW5nX2ZsYXQ8L2k+PC9wPic7XG4gIH0gZWxzZSBpZiAobGFzdFByb3AgPiBsYXN0TGFzdFByb3ApIHtcbiAgICByZXR1cm4gJzxwPjxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIiBzdHlsZT1cImNvbG9yOmdyZWVuXCI+dHJlbmRpbmdfdXA8L2k+PC9wPic7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuICc8cD48aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCIgc3R5bGU9XCJjb2xvcjpyZWRcIj50cmVuZGluZ19kb3duPC9pPjwvcD4nO1xuICB9XG59XG4vKipcbiAqIENvbXB1dGUgdGhlIGF2ZXJhZ2UgdmFsdWUgb2YgdGhlIHByb3BlcnR5IGNvbnRhaW5lZCBvbiB0aGUgc291cmNlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gY2FsY3VsYXRlVHJlbmRCeVByb3BlcnRpZXMoc291cmNlOiBhbnlbXSwgcHJvcGVydGllczogc3RyaW5nW10pOiBzdHJpbmcge1xuICBjb25zdCBhcnJheXN1bSA9IGV4dHJhY3RBcnJheVN1bShzb3VyY2UsIHByb3BlcnRpZXMpO1xuXG4gIGNvbnN0IGxhc3RQcm9wID0gYXJyYXlzdW0ubGVuZ3RoID4gMCA/IGFycmF5c3VtW2FycmF5c3VtLmxlbmd0aCAtIDFdIHx8IDAgOiAwO1xuICBjb25zdCBsYXN0TGFzdFByb3AgPSBhcnJheXN1bS5sZW5ndGggPiAxID8gYXJyYXlzdW1bYXJyYXlzdW0ubGVuZ3RoIC0gMl0gfHwgMCA6IGxhc3RQcm9wO1xuXG4gIGlmIChsYXN0UHJvcCA9PSBsYXN0TGFzdFByb3ApIHtcbiAgICByZXR1cm4gJzxwPjxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIiBzdHlsZT1cImNvbG9yOmJsdWVcIj50cmVuZGluZ19mbGF0PC9pPjwvcD4nO1xuICB9IGVsc2UgaWYgKGxhc3RQcm9wID4gbGFzdExhc3RQcm9wKSB7XG4gICAgcmV0dXJuICc8cD48aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCIgc3R5bGU9XCJjb2xvcjpncmVlblwiPnRyZW5kaW5nX3VwPC9pPjwvcD4nO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAnPHA+PGkgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiIHN0eWxlPVwiY29sb3I6cmVkXCI+dHJlbmRpbmdfZG93bjwvaT48L3A+JztcbiAgfVxufVxuLyoqXG4gKlxuICovXG5leHBvcnQgZnVuY3Rpb24gY2FsY3VsYXRlQXZnUHJvcGVydHkoXG4gIHNvdXJjZTogYW55W10sXG4gIHByb3BlcnR5OiBzdHJpbmcsXG4gIHJhbmdlOiBudW1iZXIsXG4gIGNvZWZmaWNpZW50OiBudW1iZXIsXG4pOiBudW1iZXIge1xuICBzb3VyY2UgPSAoc291cmNlIHx8IFtdKS5zbGljZSgwKTtcblxuICBjb2VmZmljaWVudCA9IGNvZWZmaWNpZW50IHx8IDE7XG4gIHJhbmdlID0gcmFuZ2UgfHwgMTI7XG5cbiAgbGV0IGwgPSBzb3VyY2UubGVuZ3RoO1xuICBsZXQgcmVzID0gMDtcbiAgbGV0IGNvdW50ZXIgPSAwO1xuICBsZXQgbm9aZXJvID0gMDtcblxuICBpZiAobCA8IHJhbmdlKSB7XG4gICAgcmFuZ2UgPSBsO1xuICB9XG5cbiAgd2hpbGUgKHJhbmdlICE9IDApIHtcbiAgICBpZiAoc291cmNlW2wgLSAxXVtwcm9wZXJ0eV0gIT0gbnVsbCkge1xuICAgICAgY291bnRlcisrO1xuICAgICAgcmVzICs9IE51bWJlcihzb3VyY2VbbCAtIDFdW3Byb3BlcnR5XSk7XG5cbiAgICAgIGlmIChzb3VyY2VbbCAtIDFdW3Byb3BlcnR5XSA+IDApIHtcbiAgICAgICAgbm9aZXJvKys7XG4gICAgICB9XG4gICAgfVxuICAgIGwtLTtcbiAgICByYW5nZS0tO1xuICB9XG5cbiAgaWYgKGNvZWZmaWNpZW50ID09IDApIHtcbiAgICByZXR1cm4gbm9aZXJvO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiByb3VuZCgocmVzIC8gY291bnRlcikgKiBjb2VmZmljaWVudCwgMikgfHwgMDtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY2FsY3VsYXRlQXZnUHJvcGVydHlBcnJheShcbiAgc291cmNlOiBhbnlbXSxcbiAgcHJvcGVydGllczogc3RyaW5nW10sXG4gIHJhbmdlOiBudW1iZXIsXG4gIGNvZWZmaWNpZW50OiBudW1iZXIsXG4pOiBudW1iZXJbXSB7XG4gIHNvdXJjZSA9IChzb3VyY2UgfHwgW10pLnNsaWNlKDApO1xuICBjb25zdCByZXNBcnI6IGFueVtdID0gW107XG5cbiAgaWYgKHByb3BlcnRpZXMgJiYgcHJvcGVydGllcy5sZW5ndGggPiAwKSB7XG4gICAgbGV0IGF2ZyA9IDA7XG5cbiAgICBjb2VmZmljaWVudCA9IGNvZWZmaWNpZW50IHx8IDE7XG4gICAgcmFuZ2UgPSByYW5nZSB8fCAxMjtcblxuICAgIGNvbnN0IHNvdXJjZUFyciA9XG4gICAgICBwcm9wZXJ0aWVzLmxlbmd0aCA+IDFcbiAgICAgICAgPyBleHRyYWN0QXJyYXlTdW0oc291cmNlLCBwcm9wZXJ0aWVzKVxuICAgICAgICA6IGV4dHJhY3RBcnJheShzb3VyY2UsIHByb3BlcnRpZXNbMF0pO1xuXG4gICAgbGV0IGwgPSBzb3VyY2VBcnIubGVuZ3RoO1xuXG4gICAgZm9yIChsZXQgbGVuID0gbDsgbGVuID4gMDsgbGVuLS0pIHtcbiAgICAgIGxldCByZXMgPSAwO1xuICAgICAgbGV0IGNvdW50ZXIgPSAwO1xuICAgICAgbGV0IG5vWmVybyA9IDA7XG5cbiAgICAgIGlmIChsZW4gPCByYW5nZSkge1xuICAgICAgICByYW5nZSA9IGxlbjtcbiAgICAgIH1cblxuICAgICAgZm9yIChsZXQgciA9IDE7IHIgPD0gcmFuZ2U7IHIrKykge1xuICAgICAgICBsZXQgdmFsID0gc291cmNlQXJyW2xlbiAtIHJdO1xuICAgICAgICBpZiAodmFsICE9IG51bGwpIHtcbiAgICAgICAgICBjb3VudGVyKys7XG4gICAgICAgICAgcmVzICs9IE51bWJlcih2YWwpO1xuICAgICAgICAgIGlmICh2YWwgPiAwKSB7XG4gICAgICAgICAgICBub1plcm8rKztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGNvdW50ZXIgPiAwKSB7XG4gICAgICAgIGlmIChjb2VmZmljaWVudCA9PSAwKSB7XG4gICAgICAgICAgYXZnID0gbm9aZXJvO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGF2ZyA9IChyZXMgLyBjb3VudGVyKSAqIGNvZWZmaWNpZW50IHx8IDA7XG4gICAgICAgIH1cbiAgICAgICAgcmVzQXJyLnB1c2gocm91bmQoYXZnLCAyKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiByZXNBcnIucmV2ZXJzZSgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWxlcnQoc291cmNlOiBhbnlbXSwgcHJvcGVydHk6IHN0cmluZywgdGhyZXNob2xkOiBudW1iZXIpOiBzdHJpbmcge1xuICBzb3VyY2UgPSAoc291cmNlIHx8IFtdKS5zbGljZSgwKTtcblxuICBpZiAobGFzdFByb3BlcnR5KHNvdXJjZSwgcHJvcGVydHkpID4gdGhyZXNob2xkKSB7XG4gICAgcmV0dXJuICc8cD48aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCIgc3R5bGU9XCJjb2xvcjpyZWRcIj53YXJuaW5nPC9pPjwvcD4nO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAnPHA+PC9wPic7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdE51bWJlcihudW06IG51bWJlciwgZm10Pzogc3RyaW5nKTogc3RyaW5nIHtcbiAgZm10ID0gZm10IHx8ICcwLDBbLl0wJztcbiAgcmV0dXJuIG51bWJybyhudW0pLmZvcm1hdChmbXQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0RGF0ZShkYXRlOiBEYXRlIHwgc3RyaW5nLCBmbXQ/OiBzdHJpbmcpOiBzdHJpbmcge1xuICBmbXQgPSBmbXQgfHwgJ21tLURELXl5eXknO1xuICByZXR1cm4gZGF0ZVV0aWxzLmZvcm1hdCh0eXBlb2YgZGF0ZSA9PT0gJ3N0cmluZycgPyBkYXRlVXRpbHMucGFyc2UoZGF0ZSkgOiBkYXRlLCBmbXQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNvTW9udGgoZGF0ZTogRGF0ZSwgZm10Pzogc3RyaW5nKTogc3RyaW5nIHtcbiAgZm10ID0gZm10IHx8ICdtbSc7XG4gIGNvbnN0IGR1ID0gZGF0ZVV0aWxzO1xuICByZXR1cm4gZHUuZm9ybWF0KGR1LmFkZERheXMoZHUuc3RhcnRPZklTT1dlZWsoZGF0ZSksIDMpLCBmbXQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29vcmRpbmF0ZShzb3VyY2U6IGFueSwgem9vbT86IG51bWJlcik6IFtudW1iZXIsIG51bWJlciwgbnVtYmVyXSB7XG4gIHpvb20gPSB6b29tIHx8IDY7XG4gIGlmIChzb3VyY2UgPT0gbnVsbCkge1xuICAgIHJldHVybiBbNTEuNTA1LCAtMC4wOSwgem9vbV07XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIFtzb3VyY2VbMF0sIHNvdXJjZVsxXSwgem9vbV07XG4gIH1cbn1cblxuLyoqXG4gKiBDYWxjdWxhdGVzIGFsbCB0aGUgcG9zc2libGUgcmVzdWx0cyB0aGF0IGEgZmllbGQgaGFzIHRha2VuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBBTExfVkFMVUVTX09GKG1haW5mb3JtczogTWFpbkZvcm1bXSwgZmllbGROYW1lOiBzdHJpbmcpOiBzdHJpbmdbXSB7XG4gIGNvbnN0IGZvcm1zID0gWy4uLihtYWluZm9ybXMgfHwgW10pXTtcbiAgY29uc3QgYWxscmVwcyA9IFtcbiAgICAuLi5mb3Jtcy5tYXAoZm9ybSA9PiB7XG4gICAgICBjb25zdCB7cmVwcywgLi4udn0gPSBmb3JtO1xuICAgICAgcmV0dXJuIHY7XG4gICAgfSksXG4gICAgLi4uZm9ybXNcbiAgICAgIC5tYXAobSA9PiBtLnJlcHMpXG4gICAgICAuZmlsdGVyKG5vbk51bGxJbnN0YW5jZXMpXG4gICAgICAubWFwKGkgPT5cbiAgICAgICAgT2JqZWN0LmtleXMoaSlcbiAgICAgICAgICAubWFwKGsgPT4gaVtrXSlcbiAgICAgICAgICAuZmxhdCgpLFxuICAgICAgKVxuICAgICAgLmZsYXQoKSxcbiAgXTtcblxuICByZXR1cm4gWy4uLm5ldyBTZXQoYWxscmVwcy5maWx0ZXIoZiA9PiBmW2ZpZWxkTmFtZV0gIT0gbnVsbCkubWFwKGYgPT4gYCR7ZltmaWVsZE5hbWVdfWApKV07XG59XG5leHBvcnQgZnVuY3Rpb24gcGxhaW5BcnJheShwYXJhbXM6IGFueVtdKTogYW55W10ge1xuICBsZXQgcmVzOiBhbnlbXSA9IFtdO1xuICBwYXJhbXMuZm9yRWFjaChwYXJhbSA9PiB7XG4gICAgcGFyYW0gPSBBcnJheS5pc0FycmF5KHBhcmFtKSA/IHBhcmFtIDogW3BhcmFtXTtcbiAgICByZXMgPSBbLi4ucmVzLCAuLi5wYXJhbV07XG4gIH0pO1xuXG4gIHJldHVybiByZXM7XG59XG4vKipcbiAqIENvdW50cyB0aGUgY29sbGVjdGVkIGZvcm1zLiBUaGUgZm9ybSBuYW1lIG11c3QgYmUgc3BlY2lmaWVkLiBBbiBvcHRpb25hbCBjb25kaXRpb24gY2FuIGJlIGFkZGVkXG4gKiB0byBkaXNjcmltaW5hdGUgd2hpY2ggZm9ybXMgdG8gY291bnQgaW4uXG4gKiB0aGUgZXhwcmVzc2lvbiBpcyBmaXJzdCBldmFsdWF0ZWQgaW4gbWFpbkZvcm0gaWYgZmFsc2UgdGhlIGV2YWx1YXRpb24gb2YgZXhwcmVzc2lvbiBpcyBjYWxjdWxhdGVkXG4gKiBpbiBhbnkgcmVwcy4gSWYgZXhwcmVzc2lvbiBpcyB0cnVlIGluIHJlcHMgdGhlIGZvcm0gaXMgY291bnRlZFxuICovXG5leHBvcnQgZnVuY3Rpb24gQ09VTlRfRk9STVMoZm9ybUxpc3Q6IE1haW5Gb3JtW10sIGV4cHJlc3Npb246IHN0cmluZyA9ICd0cnVlJyk6IG51bWJlciB7XG4gIC8vIGNvbnN0IGZvcm1zOiBNYWluRm9ybVtdID0gZGVlcENvcHkoZm9ybUxpc3QpLmZpbHRlcigoZjogTWFpbkZvcm0pID0+IGYgIT0gbnVsbCk7XG4gIGNvbnN0IGZvcm1zOiBNYWluRm9ybVtdID0gKGZvcm1MaXN0IHx8IFtdKS5zbGljZSgwKS5maWx0ZXIoKGY6IE1haW5Gb3JtKSA9PiBmICE9IG51bGwpO1xuICBjb25zdCBpZGVudGlmaWVycyA9IFsuLi5uZXcgU2V0KGdldENvZGVJZGVudGlmaWVycyhleHByZXNzaW9uLCB0cnVlKSldO1xuICBsZXQgY291bnQgPSAwO1xuICBpZiAoZXhwcmVzc2lvbiA9PT0gJ3RydWUnKSB7XG4gICAgcmV0dXJuIGZvcm1zLmxlbmd0aDtcbiAgfVxuICBpZiAoZm9ybXMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBmb3Jtcy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IG1haW5Gb3JtID0gZm9ybXNbaV07XG4gICAgbGV0IGV4eHByID0gZXhwcmVzc2lvbjtcbiAgICBpZGVudGlmaWVycy5mb3JFYWNoKGlkZW50aWZpZXIgPT4ge1xuICAgICAgY29uc3QgY2hhbmdlID0gbWFpbkZvcm1baWRlbnRpZmllcl0gPyBtYWluRm9ybVtpZGVudGlmaWVyXSA6IG51bGw7XG4gICAgICBpZiAoY2hhbmdlICE9IG51bGwpIHtcbiAgICAgICAgZXh4cHIgPSBleHhwci5zcGxpdChpZGVudGlmaWVyKS5qb2luKEpTT04uc3RyaW5naWZ5KGNoYW5nZSBhcyBzdHJpbmcpKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAobWFpbkZvcm0ucmVwcyAhPSBudWxsKSB7XG4gICAgICBjb25zdCBhbGxyZXBzOiBudW1iZXIgPSBPYmplY3Qua2V5cyhtYWluRm9ybS5yZXBzKVxuICAgICAgICAubWFwKChrZXk6IHN0cmluZykgPT4gKG1haW5Gb3JtLnJlcHMgYXMgSW5zdGFuY2VzKVtrZXldKVxuICAgICAgICAuZmxhdCgpXG4gICAgICAgIC5tYXAoKGNoaWxkOiBGb3JtKSA9PiBldmFsdWF0ZUV4cHJlc3Npb24oZXh4cHIsIGNoaWxkKSlcbiAgICAgICAgLnJlZHVjZSgoYSwgYikgPT4gKGEgKz0gK2IpLCAwKTtcbiAgICAgIGlmIChhbGxyZXBzID4gMCkge1xuICAgICAgICBjb3VudCsrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChldmFsdWF0ZUV4cHJlc3Npb24oZXh4cHIsIG1haW5Gb3JtKSkge1xuICAgICAgY291bnQrKztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGNvdW50O1xufVxuLyoqXG4gKiBDb3VudHMgdGhlIHJlcHMgb2YgdGhlIGZvcm0uXG4gKiB0aGUgZXhwcmVzc2lvbiBpcyBmaXJzdCBldmFsdWF0ZWQgaW4gbWFpbkZvcm0gIGlmIHRydWUgcmV0dXJuIGFsbCByZXBzIGNvdW50aW5nIGVsc2UgdGhlIGV2YWx1YXRpb24gb2YgZXhwcmVzc2lvbiBpcyBjYWxjdWxhdGVkXG4gKiBpbiBhbnkgcmVwcyBhbmQgcmV0dXJuIHRoZSBjb3VudCBvZiBhbGwgcmVwcyB0aGF0IHNhdGlzZmllZCB0aGUgZXhwcmVzc2lvbi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIENPVU5UX1JFUFMoZm9ybUxpc3Q6IE1haW5Gb3JtW10sIGV4cHJlc3Npb246IHN0cmluZyA9ICd0cnVlJyk6IG51bWJlciB7XG4gIGNvbnN0IGZvcm1zOiBNYWluRm9ybVtdID0gY2xvbmVNYWluRm9ybXMoZm9ybUxpc3QpLmZpbHRlcigoZjogTWFpbkZvcm0pID0+IGYgIT0gbnVsbCk7XG4gIGNvbnN0IGlkZW50aWZpZXJzID0gZ2V0Q29kZUlkZW50aWZpZXJzKGV4cHJlc3Npb24sIHRydWUpO1xuICBsZXQgZXh4cHIgPSBleHByZXNzaW9uO1xuICBsZXQgY291bnQgPSAwO1xuXG4gIGlmIChmb3Jtcy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuICBmb3IgKGxldCBpID0gMDsgaSA8IGZvcm1zLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgbWFpbkZvcm0gPSBmb3Jtc1tpXTtcbiAgICBpZiAobWFpbkZvcm0ucmVwcyAhPSBudWxsKSB7XG4gICAgICBjb25zdCBhbGxyZXBzOiBGb3JtW10gPSBPYmplY3Qua2V5cyhtYWluRm9ybS5yZXBzKVxuICAgICAgICAubWFwKChrZXk6IHN0cmluZykgPT4gKG1haW5Gb3JtLnJlcHMgYXMgSW5zdGFuY2VzKVtrZXldKVxuICAgICAgICAuZmxhdCgpO1xuICAgICAgYWxscmVwcy5mb3JFYWNoKChjaGlsZDogRm9ybSkgPT4ge1xuICAgICAgICBpZiAoZXZhbHVhdGVFeHByZXNzaW9uKGV4cHJlc3Npb24sIGNoaWxkKSkge1xuICAgICAgICAgIGNvdW50Kys7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlkZW50aWZpZXJzLmZvckVhY2goaWRlbnRpZmllciA9PiB7XG4gICAgICBjb25zdCBjaGFuZ2UgPSBtYWluRm9ybVtpZGVudGlmaWVyXSA/IG1haW5Gb3JtW2lkZW50aWZpZXJdIDogbnVsbDtcbiAgICAgIGlmIChjaGFuZ2UpIHtcbiAgICAgICAgZXh4cHIgPSBleHByZXNzaW9uLnNwbGl0KGlkZW50aWZpZXIpLmpvaW4oSlNPTi5zdHJpbmdpZnkoY2hhbmdlIGFzIHN0cmluZykpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmIChldmFsdWF0ZUV4cHJlc3Npb24oZXh4cHIsIG1haW5Gb3JtKSkge1xuICAgICAgY291bnQrKztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGNvdW50O1xufVxuXG4vKipcbiAqIENvdW50cyB0aGUgYW1vdW50IG9mIHVuaXF1ZSBmb3JtIHZhbHVlcyBmb3IgYSBzcGVjaWZpYyBmaWVsZC4gVGhlIGZvcm0gbmFtZSBtdXN0IGJlIHNwZWNpZmllZC4gQW5cbiAqIG9wdGlvbmFsIGNvbmRpdGlvbiBjYW4gYmUgYWRkZWQgdG8gZGlzY3JpbWluYXRlIHdoaWNoIGZvcm1zIHRvIGNvdW50IGluXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBDT1VOVF9GT1JNU19VTklRVUUoXG4gIGZvcm1MaXN0OiBNYWluRm9ybVtdLFxuICBmaWVsZE5hbWU6IHN0cmluZyxcbiAgZXhwcmVzc2lvbjogc3RyaW5nID0gJ3RydWUnLFxuKTogbnVtYmVyIHtcbiAgY29uc3QgZm9ybXM6IE1haW5Gb3JtW10gPSAoZm9ybUxpc3QgfHwgW10pLnNsaWNlKDApLmZpbHRlcigoZjogTWFpbkZvcm0pID0+IGYgIT0gbnVsbCk7XG4gIGNvbnN0IGlkZW50aWZpZXJzID0gWy4uLm5ldyBTZXQoZ2V0Q29kZUlkZW50aWZpZXJzKGV4cHJlc3Npb24sIHRydWUpKV07XG4gIGxldCB2YWx1ZXM6IGFueVtdID0gW107XG5cbiAgaWYgKGZvcm1zLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiAwO1xuICB9XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZm9ybXMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBtYWluRm9ybSA9IGZvcm1zW2ldO1xuICAgIGxldCBleHhwciA9IGV4cHJlc3Npb247XG4gICAgaWRlbnRpZmllcnMuZm9yRWFjaChpZGVudGlmaWVyID0+IHtcbiAgICAgIGNvbnN0IGNoYW5nZSA9IG1haW5Gb3JtW2lkZW50aWZpZXJdID8gbWFpbkZvcm1baWRlbnRpZmllcl0gOiBudWxsO1xuICAgICAgaWYgKGNoYW5nZSAhPSBudWxsKSB7XG4gICAgICAgIGV4eHByID0gZXh4cHIuc3BsaXQoaWRlbnRpZmllcikuam9pbihKU09OLnN0cmluZ2lmeShjaGFuZ2UgYXMgc3RyaW5nKSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKG1haW5Gb3JtLnJlcHMgIT0gbnVsbCkge1xuICAgICAgY29uc3QgZmllbGROYW1lSW5NYWluID0gZXZhbHVhdGVFeHByZXNzaW9uKGZpZWxkTmFtZSwgbWFpbkZvcm0pO1xuICAgICAgY29uc3QgYWxscmVwczogYW55W10gPSBPYmplY3Qua2V5cyhtYWluRm9ybS5yZXBzKVxuICAgICAgICAubWFwKChrZXk6IHN0cmluZykgPT4gKG1haW5Gb3JtLnJlcHMgYXMgSW5zdGFuY2VzKVtrZXldKVxuICAgICAgICAuZmxhdCgpXG4gICAgICAgIC5maWx0ZXIoKGNoaWxkOiBGb3JtKSA9PiBldmFsdWF0ZUV4cHJlc3Npb24oZXh4cHIsIGNoaWxkKSlcbiAgICAgICAgLm1hcCgoY2hpbGQ6IEZvcm0pID0+XG4gICAgICAgICAgZmllbGROYW1lSW5NYWluICE9IG51bGwgPyBmaWVsZE5hbWVJbk1haW4gOiBldmFsdWF0ZUV4cHJlc3Npb24oZmllbGROYW1lLCBjaGlsZCksXG4gICAgICAgICk7XG4gICAgICBpZiAoYWxscmVwcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHZhbHVlcyA9IFsuLi52YWx1ZXMsIC4uLmFsbHJlcHNdO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoZXZhbHVhdGVFeHByZXNzaW9uKGV4eHByLCBtYWluRm9ybSkpIHtcbiAgICAgIGNvbnN0IG1WYWx1ZSA9IGV2YWx1YXRlRXhwcmVzc2lvbihmaWVsZE5hbWUsIG1haW5Gb3JtKTtcbiAgICAgIGlmIChtVmFsdWUgIT0gbnVsbCkge1xuICAgICAgICB2YWx1ZXMucHVzaChtVmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gWy4uLm5ldyBTZXQodmFsdWVzKV0ubGVuZ3RoO1xufVxuXG4vKipcbiAqIEFnZ3JlZ2F0ZXMgYW5kIHN1bXMgdGhlIHZhbHVlcyBvZiBvbmUgb3IgbW9yZS4gQW4gb3B0aW9uYWwgY29uZGl0aW9uIGNhbiBiZSBhZGRlZCB0byBkaXNjcmltaW5hdGVcbiAqIHdoaWNoIGZvcm1zIHRvIHRha2UgZm9yIHRoZSBzdW0uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBTVU0obWFpbkZvcm1zOiAoTWFpbkZvcm0gfCBGb3JtKVtdLCBmaWVsZDogc3RyaW5nLCBjb25kaXRpb24gPSAndHJ1ZScpOiBudW1iZXIge1xuICAvLyBjb25zdCBmb3JtczogTWFpbkZvcm1bXSA9IGRlZXBDb3B5KG1haW5Gb3JtcykuZmlsdGVyKChmOiBNYWluRm9ybSkgPT4gZiAhPSBudWxsKTtcbiAgY29uc3QgZm9ybXM6IChNYWluRm9ybSB8IEZvcm0pW10gPSAobWFpbkZvcm1zIHx8IFtdKVxuICAgIC5zbGljZSgwKVxuICAgIC5maWx0ZXIoKGY6IE1haW5Gb3JtIHwgRm9ybSkgPT4gZiAhPSBudWxsKTtcbiAgY29uc3QgaWRlbnRpZmllcnMgPSBnZXRDb2RlSWRlbnRpZmllcnMoY29uZGl0aW9uLCB0cnVlKTtcbiAgbGV0IGV4eHByID0gY29uZGl0aW9uO1xuICBsZXQgY291bnQgPSAwO1xuXG4gIGlmIChmb3Jtcy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuICBmb3IgKGxldCBpID0gMDsgaSA8IGZvcm1zLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgbWFpbkZvcm0gPSBmb3Jtc1tpXTtcbiAgICBpZiAobWFpbkZvcm0ucmVwcyAhPSBudWxsKSB7XG4gICAgICBjb25zdCBhbGxyZXBzOiBGb3JtW10gPSBPYmplY3Qua2V5cyhtYWluRm9ybS5yZXBzKVxuICAgICAgICAubWFwKChrZXk6IHN0cmluZykgPT4gKG1haW5Gb3JtLnJlcHMgYXMgSW5zdGFuY2VzKVtrZXldKVxuICAgICAgICAuZmxhdCgpO1xuICAgICAgYWxscmVwc1xuICAgICAgICAuZmlsdGVyKGMgPT4gY1tmaWVsZF0gIT0gbnVsbClcbiAgICAgICAgLmZvckVhY2goKGNoaWxkOiBGb3JtKSA9PiB7XG4gICAgICAgICAgaWYgKGV2YWx1YXRlRXhwcmVzc2lvbihjb25kaXRpb24sIGNoaWxkKSkge1xuICAgICAgICAgICAgY291bnQgKz0gKyhjaGlsZFtmaWVsZF0gYXMgbnVtYmVyKSB8fCAwO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWRlbnRpZmllcnMuZm9yRWFjaChpZGVudGlmaWVyID0+IHtcbiAgICAgIGNvbnN0IGNoYW5nZSA9IG1haW5Gb3JtW2lkZW50aWZpZXJdID8gbWFpbkZvcm1baWRlbnRpZmllcl0gOiBudWxsO1xuICAgICAgaWYgKGNoYW5nZSkge1xuICAgICAgICBleHhwciA9IGNvbmRpdGlvbi5zcGxpdChpZGVudGlmaWVyKS5qb2luKEpTT04uc3RyaW5naWZ5KGNoYW5nZSkgYXMgc3RyaW5nKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAoZXZhbHVhdGVFeHByZXNzaW9uKGV4eHByLCBtYWluRm9ybSkgJiYgbWFpbkZvcm1bZmllbGRdICE9IG51bGwpIHtcbiAgICAgIGNvdW50ICs9ICsobWFpbkZvcm1bZmllbGRdIGFzIG51bWJlcikgfHwgMDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGNvdW50O1xufVxuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIG1lYW4gb2YgYSBzaW1wbGUgb3IgZGVyaXZlZCB2YWx1ZS4gQW4gb3B0aW9uYWwgY29uZGl0aW9uIGNhbiBiZSBhZGRlZCB0b1xuICogZGlzY3JpbWluYXRlIHdoaWNoIGZvcm1zIHRvIHRha2UgZm9yIHRoZSBzdW0uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBNRUFOKGZvcm1zOiAoRm9ybSB8IE1haW5Gb3JtKVtdLCBmaWVsZE5hbWU6IHN0cmluZyk6IHN0cmluZyB7XG4gIGZvcm1zID0gKGZvcm1zIHx8IFtdKS5zbGljZSgwKTtcbiAgZmllbGROYW1lID0gZmllbGROYW1lIHx8ICcnO1xuICBsZXQgbGVuZ3RoID0gMDtcbiAgbGV0IGFjYyA9IDA7XG4gIGZvcm1zLmZvckVhY2goZm9ybSA9PiB7XG4gICAgaWYgKGZvcm1bZmllbGROYW1lXSA9PSBudWxsICYmIGZvcm0ucmVwcyAhPSBudWxsKSB7XG4gICAgICBPYmplY3Qua2V5cyhmb3JtLnJlcHMgYXMgSW5zdGFuY2VzKS5mb3JFYWNoKHJlcCA9PiB7XG4gICAgICAgICgoZm9ybS5yZXBzIGFzIEluc3RhbmNlcylbcmVwXSBhcyBGb3JtW10pLmZvckVhY2gocmZvcm0gPT4ge1xuICAgICAgICAgIGNvbnN0IHJzVmFsID0gcmZvcm1bZmllbGROYW1lXTtcbiAgICAgICAgICBpZiAocnNWYWwgIT0gbnVsbCkge1xuICAgICAgICAgICAgYWNjICs9IGV2YWx1YXRlRXhwcmVzc2lvbihgJHtyc1ZhbH1gLCBmb3JtKTtcbiAgICAgICAgICAgIGxlbmd0aCsrO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgYWNjICs9IGV2YWx1YXRlRXhwcmVzc2lvbihmaWVsZE5hbWUsIGZvcm0pO1xuICAgICAgbGVuZ3RoKys7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGAke1JPVU5EKGFjYyAvIGxlbmd0aCl9YDtcbn1cblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSAlIGJldHdlZW4gdHdvIG1lbWJlcnMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBQRVJDRU5UKHZhbHVlMTogbnVtYmVyLCB2YWx1ZTI6IG51bWJlcik6IHN0cmluZyB7XG4gIGNvbnN0IHJlcyA9ICgrdmFsdWUxICogMTAwKSAvICt2YWx1ZTI7XG4gIHJldHVybiBOdW1iZXIuaXNGaW5pdGUocmVzKSA/IGAke1JPVU5EKHJlcyl9JWAgOiAnaW5maW5pdGUnO1xufVxuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGV4cHJlc3Npb24gaW4gdGhlIGxhc3QgZm9ybSBieSBkYXRlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gTEFTVChmb3JtczogKEZvcm0gfCBNYWluRm9ybSlbXSwgZXhwcmVzc2lvbjogc3RyaW5nLCBkYXRlID0gJ2RhdGVfZW5kJyk6IHN0cmluZyB7XG4gIGZvcm1zID0gKGZvcm1zIHx8IFtdKS5zbGljZSgwKS5zb3J0KChhLCBiKSA9PiB7XG4gICAgY29uc3QgZGF0ZUEgPSBuZXcgRGF0ZShiW2RhdGVdIGFzIHN0cmluZykuZ2V0VGltZSgpO1xuICAgIGNvbnN0IGRhdGVCID0gbmV3IERhdGUoYVtkYXRlXSBhcyBzdHJpbmcpLmdldFRpbWUoKTtcbiAgICByZXR1cm4gZGF0ZUEgLSBkYXRlQjtcbiAgfSk7XG4gIGlmIChmb3Jtcy5sZW5ndGggPiAwICYmIGV4cHJlc3Npb24gIT0gbnVsbCkge1xuICAgIGNvbnN0IGlkZW50aWZpZXJzID0gZ2V0Q29kZUlkZW50aWZpZXJzKGV4cHJlc3Npb24sIHRydWUpO1xuICAgIGNvbnN0IGxhc3RGb3JtID0gZm9ybXNbZm9ybXMubGVuZ3RoIC0gMV0gfHwgW107XG4gICAgbGV0IGV4eHByID0gZXhwcmVzc2lvbjtcbiAgICBpZGVudGlmaWVycy5mb3JFYWNoKGlkZW50aWZpZXIgPT4ge1xuICAgICAgY29uc3QgY2hhbmdlID0gbGFzdEZvcm1baWRlbnRpZmllcl0gPyBsYXN0Rm9ybVtpZGVudGlmaWVyXSA6IG51bGw7XG4gICAgICBpZiAoY2hhbmdlICE9IG51bGwpIHtcbiAgICAgICAgZXh4cHIgPSBleHhwci5zcGxpdChpZGVudGlmaWVyKS5qb2luKGNoYW5nZSBhcyBzdHJpbmcpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGNvbnN0IGZvcm1FdmFsID0gZXZhbHVhdGVFeHByZXNzaW9uKGV4cHJlc3Npb24sIGxhc3RGb3JtKTtcbiAgICBpZiAoZm9ybUV2YWwgPT0gZmFsc2UgJiYgbGFzdEZvcm0ucmVwcyAhPSBudWxsKSB7XG4gICAgICBjb25zdCBhbGxyZXBzOiBudW1iZXIgPSBPYmplY3Qua2V5cyhsYXN0Rm9ybS5yZXBzKVxuICAgICAgICAubWFwKChrZXk6IHN0cmluZykgPT4gKGxhc3RGb3JtLnJlcHMgYXMgSW5zdGFuY2VzKVtrZXldKVxuICAgICAgICAuZmxhdCgpXG4gICAgICAgIC5tYXAoKHJlcDogRm9ybSkgPT4gZXZhbHVhdGVFeHByZXNzaW9uKGV4eHByLCByZXApKVxuICAgICAgICAucmVkdWNlKChhLCBiKSA9PiAoYSArPSArYiksIDApO1xuICAgICAgaWYgKGFsbHJlcHMgPiAwKSB7XG4gICAgICAgIHJldHVybiBgJHthbGxyZXBzfWA7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmb3JtRXZhbDtcbiAgfVxuICByZXR1cm4gJzAnO1xufVxuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIG1heCB2YWx1ZSBvZiB0aGUgZmllbGQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBNQVgoZm9ybXM6IChGb3JtIHwgTWFpbkZvcm0pW10sIGZpZWxkTmFtZTogc3RyaW5nKTogbnVtYmVyIHtcbiAgZm9ybXMgPSAoZm9ybXMgfHwgW10pLnNsaWNlKDApO1xuICBsZXQgbWF4ID0gMDtcbiAgZm9ybXMuZm9yRWFjaChmb3JtID0+IHtcbiAgICBpZiAoZm9ybVtmaWVsZE5hbWVdID09IG51bGwgJiYgZm9ybS5yZXBzICE9IG51bGwpIHtcbiAgICAgIE9iamVjdC5rZXlzKGZvcm0ucmVwcyBhcyBJbnN0YW5jZXMpLmZvckVhY2gocmVwID0+IHtcbiAgICAgICAgKChmb3JtLnJlcHMgYXMgSW5zdGFuY2VzKVtyZXBdIGFzIEZvcm1bXSkuZm9yRWFjaChfcmZvcm0gPT4ge1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIGZvcm1bZmllbGROYW1lXSAhPSBudWxsICYmXG4gICAgICAgICAgICAhaXNOYU4oZm9ybVtmaWVsZE5hbWVdIGFzIG51bWJlcikgJiZcbiAgICAgICAgICAgIChmb3JtW2ZpZWxkTmFtZV0gYXMgbnVtYmVyKSA+IG1heFxuICAgICAgICAgICkge1xuICAgICAgICAgICAgbWF4ID0gZm9ybVtmaWVsZE5hbWVdIGFzIG51bWJlcjtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChcbiAgICAgICAgZm9ybVtmaWVsZE5hbWVdICE9IG51bGwgJiZcbiAgICAgICAgIWlzTmFOKGZvcm1bZmllbGROYW1lXSBhcyBudW1iZXIpICYmXG4gICAgICAgIChmb3JtW2ZpZWxkTmFtZV0gYXMgbnVtYmVyKSA+IG1heFxuICAgICAgKSB7XG4gICAgICAgIG1heCA9IGZvcm1bZmllbGROYW1lXSBhcyBudW1iZXI7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIG1heDtcbn1cblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBtZWRpYW4gdmFsdWUgb2YgdGhlIGZpZWxkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gTUVESUFOKGZvcm1zOiAoRm9ybSB8IE1haW5Gb3JtKVtdLCBmaWVsZE5hbWU6IHN0cmluZyk6IHN0cmluZyB7XG4gIGZvcm1zID0gKGZvcm1zIHx8IFtdKS5zbGljZSgwKTtcbiAgbGV0IG51bWJlcnM6IG51bWJlcltdID0gW107XG4gIGZvcm1zLmZvckVhY2goZm9ybSA9PiB7XG4gICAgaWYgKGZvcm1bZmllbGROYW1lXSA9PSBudWxsICYmIGZvcm0ucmVwcyAhPSBudWxsKSB7XG4gICAgICBPYmplY3Qua2V5cyhmb3JtLnJlcHMgYXMgSW5zdGFuY2VzKS5mb3JFYWNoKHJlcCA9PiB7XG4gICAgICAgICgoZm9ybS5yZXBzIGFzIEluc3RhbmNlcylbcmVwXSBhcyBGb3JtW10pLmZvckVhY2gocmZvcm0gPT4ge1xuICAgICAgICAgIGlmIChyZm9ybVtmaWVsZE5hbWVdICE9IG51bGwpIHtcbiAgICAgICAgICAgIG51bWJlcnMucHVzaChyZm9ybVtmaWVsZE5hbWVdIGFzIG51bWJlcik7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBudW1iZXJzLnB1c2goKGZvcm0gYXMgRm9ybSlbZmllbGROYW1lXSBhcyBudW1iZXIpO1xuICAgIH1cbiAgfSk7XG5cbiAgbnVtYmVycyA9IG51bWJlcnMuc29ydCgoYSwgYikgPT4gYSAtIGIpLmZpbHRlcigoaXRlbSwgcG9zLCBzZWxmKSA9PiBzZWxmLmluZGV4T2YoaXRlbSkgPT0gcG9zKTtcbiAgY29uc3QgcmVzID0gTnVtYmVyLmlzSW50ZWdlcihudW1iZXJzLmxlbmd0aCAvIDIpXG4gICAgPyBudW1iZXJzW251bWJlcnMubGVuZ3RoIC8gMl1cbiAgICA6IChudW1iZXJzWytwYXJzZUludChgJHtudW1iZXJzLmxlbmd0aCAtIDEgLyAyfWApIC8gMl0gK1xuICAgICAgICBudW1iZXJzWytwYXJzZUludChgJHtudW1iZXJzLmxlbmd0aCAtIDEgLyAyfWApIC8gMiArIDFdKSAvXG4gICAgICAyO1xuXG4gIHJldHVybiBgJHtST1VORChyZXMpfWA7XG59XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgbW9kZSB2YWx1ZSBvZiB0aGUgZmllbGQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBNT0RFKGZvcm1zOiAoRm9ybSB8IE1haW5Gb3JtKVtdLCBmaWVsZE5hbWU6IHN0cmluZyk6IG51bWJlcltdIHtcbiAgZm9ybXMgPSAoZm9ybXMgfHwgW10pLnNsaWNlKDApO1xuICBsZXQgbWF4Q291bnQgPSAwO1xuICBjb25zdCBtYXA6IHtba2V5OiBudW1iZXJdOiBudW1iZXJ9ID0ge307XG4gIGZvcm1zLmZvckVhY2goZiA9PiB7XG4gICAgaWYgKGZbZmllbGROYW1lXSA9PSBudWxsICYmIGYucmVwcyAhPSBudWxsKSB7XG4gICAgICBPYmplY3Qua2V5cyhmKVxuICAgICAgICAuZmlsdGVyKGtleSA9PiBrZXkuaW5jbHVkZXMoZmllbGROYW1lKSlcbiAgICAgICAgLmZvckVhY2gocnNGaWVsZCA9PiB7XG4gICAgICAgICAgY29uc3QgdmFsdWUgPSBmW3JzRmllbGRdIGFzIG51bWJlcjtcbiAgICAgICAgICBpZiAodmFsdWUgIT0gbnVsbCkge1xuICAgICAgICAgICAgbWFwW3ZhbHVlXSA9IG1hcFt2YWx1ZV0gIT0gbnVsbCA/IG1hcFt2YWx1ZV0gKyAxIDogMTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKG1hcFt2YWx1ZV0gPiBtYXhDb3VudCkge1xuICAgICAgICAgICAgbWF4Q291bnQgPSBtYXBbdmFsdWVdO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHZhbHVlID0gZltmaWVsZE5hbWVdIGFzIG51bWJlcjtcbiAgICAgIGlmICh2YWx1ZSAhPSBudWxsKSB7XG4gICAgICAgIG1hcFt2YWx1ZV0gPSBtYXBbdmFsdWVdICE9IG51bGwgPyBtYXBbdmFsdWVdICsgMSA6IDE7XG4gICAgICB9XG4gICAgICBpZiAobWFwW3ZhbHVlXSA+IG1heENvdW50KSB7XG4gICAgICAgIG1heENvdW50ID0gbWFwW3ZhbHVlXTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuICByZXR1cm4gT2JqZWN0LmtleXMobWFwKVxuICAgIC5maWx0ZXIodiA9PiBtYXBbK3ZdID09PSBtYXhDb3VudClcbiAgICAubWFwKHYgPT4gK3YpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYnVpbGREYXRhc2V0KFxuICBkYXRhc2V0OiAoc3RyaW5nIHwgbnVtYmVyIHwgc3RyaW5nW10gfCBudW1iZXJbXSlbXSxcbiAgY29sc3BhbnM6IG51bWJlcltdLFxuKTogQWpmVGFibGVDZWxsW11bXSB7XG4gIGNvbnN0IHJlczogQWpmVGFibGVDZWxsW11bXSA9IFtdO1xuICBjb25zdCBub3JtYWxpemVEYXRhc2V0OiBhbnlbXVtdID0gW107XG4gIGRhdGFzZXQuZm9yRWFjaCgocm93OiBhbnksIGluZGV4Um93OiBudW1iZXIpID0+IHtcbiAgICByb3cgPSBBcnJheS5pc0FycmF5KHJvdykgPyByb3cgOiBbcm93XTtcbiAgICBub3JtYWxpemVEYXRhc2V0W2luZGV4Um93ICUgY29sc3BhbnMubGVuZ3RoXSA9XG4gICAgICBub3JtYWxpemVEYXRhc2V0W2luZGV4Um93ICUgY29sc3BhbnMubGVuZ3RoXSAhPSBudWxsXG4gICAgICAgID8gWy4uLm5vcm1hbGl6ZURhdGFzZXRbaW5kZXhSb3cgJSBjb2xzcGFucy5sZW5ndGhdLCAuLi5yb3ddXG4gICAgICAgIDogWy4uLnJvd107XG4gIH0pO1xuICBjb25zdCB0cmFuc3Bvc2UgPSBub3JtYWxpemVEYXRhc2V0WzBdLm1hcCgoXzogYW55LCBjb2xJbmRleDogbnVtYmVyKSA9PlxuICAgIG5vcm1hbGl6ZURhdGFzZXQubWFwKChyb3c6IGFueSkgPT4gcm93W2NvbEluZGV4XSksXG4gICk7XG4gIHRyYW5zcG9zZS5mb3JFYWNoKChkYXRhOiBhbnlbXSwgaW5kZXg6IG51bWJlcikgPT4ge1xuICAgIGNvbnN0IHJvdzogQWpmVGFibGVDZWxsW10gPSBbXTtcbiAgICBkYXRhLmZvckVhY2goKGNlbGxWYWx1ZTogc3RyaW5nIHwgbnVtYmVyLCBjZWxsSW5kZXg6IG51bWJlcikgPT4ge1xuICAgICAgcm93LnB1c2goe1xuICAgICAgICB2YWx1ZTogY2VsbFZhbHVlLFxuICAgICAgICBjb2xzcGFuOiBjb2xzcGFuc1tjZWxsSW5kZXhdLFxuICAgICAgICByb3dzcGFuOiAxLFxuICAgICAgICBzdHlsZToge1xuICAgICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXG4gICAgICAgICAgY29sb3I6ICdibGFjaycsXG4gICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBpbmRleCAlIDIgPT09IDAgPyAnd2hpdGUnIDogJyNkZGQnLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgcmVzLnB1c2gocm93KTtcbiAgfSk7XG4gIHJldHVybiByZXM7XG59XG5cbi8qKlxuICpcbiAqIEBwYXJhbSBmb3JtcyB0aGUgZm9ybSBkYXRhXG4gKiBAcGFyYW0gaXRlcmF0aW9ucyBhbGwgdmFsdWVzIG9mIGl0ZXJhdGlvblxuICogQHBhcmFtIGZuIHRoZSBmdWN0aW9uIG9mIGV4cHJlc3Npb24tdXRpbHMgdG8gYXBwbHkgYXQgaXRlcmF0aW9uXG4gKiBAcGFyYW0gcGFyYW0xIGZpcnN0IHBhcmFtIG9mIGZuXG4gKiBAcGFyYW0gcGFyYW0yIHNlY29uZCBwYXJhbSBvZiBmblxuICogQHJldHVybnMgdGhlIHJlc3VsdCBvZiBmbiBhcHBsaWVkIHRvIGFsbCB2YWx1ZXMgcGFyYW0gY29uZGl0aW9uc1xuICogJmN1cnJlbnQgaXMgYW4gYW5jaG9yIGtleSwgVGhlIHBhcmFtcyB3aXRoICZjdXJyZW50IHdpbGwgYmUgbW9kaWZpZWQgd2l0aCB0aGUgaXRlcmF0aW9uIHZhbHVlcy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIFJFUEVBVChcbiAgZm9ybXM6IE1haW5Gb3JtW10sXG4gIGl0ZXJhdGlvbnM6IHN0cmluZ1tdLFxuICBmbjogQWpmVmFsaWRhdGlvbkZuLFxuICBwYXJhbTE6IHN0cmluZyxcbiAgcGFyYW0yOiBzdHJpbmcgPSAndHJ1ZScsXG4pOiBhbnlbXSB7XG4gIGNvbnN0IHJlczogYW55W10gPSBbXTtcbiAgY29uc3QgbmV3RXhwMSA9XG4gICAgcGFyYW0xICE9IG51bGwgJiYgcGFyYW0xLmluY2x1ZGVzKCdjdXJyZW50JylcbiAgICAgID8gKHY6IGFueSkgPT4gcGFyYW0xLnNwbGl0KCdjdXJyZW50Jykuam9pbihKU09OLnN0cmluZ2lmeSh2KSlcbiAgICAgIDogKCkgPT4gcGFyYW0xO1xuICBjb25zdCBuZXdFeHAyID1cbiAgICBwYXJhbTIgIT0gbnVsbCAmJiBwYXJhbTIuaW5jbHVkZXMoJ2N1cnJlbnQnKVxuICAgICAgPyAodjogYW55KSA9PiBwYXJhbTIuc3BsaXQoJ2N1cnJlbnQnKS5qb2luKEpTT04uc3RyaW5naWZ5KHYpKVxuICAgICAgOiAoKSA9PiBwYXJhbTI7XG4gIGl0ZXJhdGlvbnMuZm9yRWFjaCh2ID0+IHtcbiAgICBjb25zdCB2diA9IChmbiBhcyBhbnkpKGZvcm1zLCBuZXdFeHAxKHYpLCBuZXdFeHAyKHYpKTtcbiAgICByZXMucHVzaCh2dik7XG4gIH0pO1xuICByZXR1cm4gcmVzO1xufVxuZnVuY3Rpb24gYnVpbGRGbihleHByZXNzaW9uOiBzdHJpbmcpOiBhbnkge1xuICByZXR1cm4gKHY6IGFueSkgPT4ge1xuICAgIGNvbnN0IG5ld0V4cCA9IGV4cHJlc3Npb25cbiAgICAgIC5zcGxpdCgnYWpmX2Zvcm0nKVxuICAgICAgLmpvaW4oYCR7SlNPTi5zdHJpbmdpZnkodil9YClcbiAgICAgIC5zcGxpdCgnY3VycmVudCcpXG4gICAgICAuam9pbihgJHtKU09OLnN0cmluZ2lmeSh2KX1gKTtcbiAgICByZXR1cm4gbmV3RXhwO1xuICB9O1xufVxuXG4vKipcbiAqIHRoaXMgZnVuY3Rpb24gYWxsb3cgdG8gZGVmaW5lIGEgbmV3IGF0dHJpYnV0ZSBvZiBtYWluZm9ybS5cbiAqIHRoZSBhdHRyaWJ1dGUgZmllbGQgd2lsbCBiZSBhZGRlZCBvbiBldmVyeSBmb3JtIGFuZCBpdCB0YWtlcyB0aGUgcmVzdWx0IG9mIGV4cHJlc3Npb24gY2FsY3VsYXRlZFxuICogZm9yIGV2ZXJ5IG1haW5mb3JtXG4gKlxuICogQGV4cG9ydFxuICogQHBhcmFtIHtNYWluRm9ybVtdfSBmb3JtTGlzdFxuICogQHBhcmFtIHtzdHJpbmd9IGZpZWxkXG4gKiBAcGFyYW0ge3N0cmluZ30gZXhwcmVzc2lvblxuICogQHJldHVybiB7Kn0gIHtNYWluRm9ybVtdfVxuICovXG5leHBvcnQgZnVuY3Rpb24gQVBQTFkoZm9ybUxpc3Q6IE1haW5Gb3JtW10sIGZpZWxkOiBzdHJpbmcsIGV4cHJlc3Npb246IHN0cmluZyk6IE1haW5Gb3JtW10ge1xuICBjb25zdCBleHBGbiA9IGJ1aWxkRm4oZXhwcmVzc2lvbik7XG4gIGZvcm1MaXN0ID0gY2xvbmVNYWluRm9ybXMoZm9ybUxpc3QpO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZm9ybUxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoZm9ybUxpc3RbaV0gPT0gbnVsbCkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGlmIChmb3JtTGlzdFtpXS5yZXBzICE9IG51bGwpIHtcbiAgICAgIGZvcm1MaXN0W2ldW2ZpZWxkXSA9IGV2YWx1YXRlRXhwcmVzc2lvbihleHBGbihmb3JtTGlzdFtpXSksIGZvcm1MaXN0W2ldKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZvcm1MaXN0O1xufVxuXG4vKipcbiAqIHRoaXMgZnVuY3Rpb24gcm91bmQgYSBudW1iZXIsXG4gKiBpZiB5b3UgbmVlZCBjYW4gYmUgZGVmaW5lIGRlIGRpZ2l0cyBvZiByb3VuZFxuICpcbiAqIEBleHBvcnRcbiAqIEBwYXJhbSB7KG51bWJlciB8IHN0cmluZyl9IG51bVxuICogQHBhcmFtIHtudW1iZXJ9IFtkaWdpdHNdXG4gKiBAcmV0dXJuIHsqfSAge251bWJlcn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIFJPVU5EKG51bTogbnVtYmVyIHwgc3RyaW5nLCBkaWdpdHM/OiBudW1iZXIpOiBudW1iZXIge1xuICByZXR1cm4gcm91bmQobnVtLCBkaWdpdHMpO1xufVxuXG4vKipcbiAqIHRoaXMgZnVuY3Rpb24gZXZhbHVlYXRlIGEgY29uZGl0aW9uIGlmIHRydWUgcmV0dXJuIGJyYW5jaDEgZWxzZSBicmFuY2gyXG4gKlxuICogQGV4cG9ydFxuICogQHBhcmFtIHtzdHJpbmd9IGNvbmRpdGlvblxuICogQHBhcmFtIHsqfSBicmFuY2gxXG4gKiBAcGFyYW0geyp9IGJyYW5jaDJcbiAqIEByZXR1cm4geyp9ICB7Kn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIEVWQUxVQVRFKGNvbmRpdGlvbjogc3RyaW5nLCBicmFuY2gxOiBhbnksIGJyYW5jaDI6IGFueSk6IGFueSB7XG4gIGlmIChldmFsdWF0ZUV4cHJlc3Npb24oY29uZGl0aW9uKSkge1xuICAgIHJldHVybiBicmFuY2gxO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBicmFuY2gyO1xuICB9XG59XG4vKipcbiAqIFRoaXMgZnVuY3Rpb24gYnVpbGRzIGEgZGF0YSBzdHJ1Y3R1cmUgdGhhdCBhbGxvd3MgdGhlIHVzZSBvZiB0aGUgaGluZGlraXQgZm9ybXVsYXNcbiAqIGZvciBldmVyeSBmb3JtcyB3aXRoIHJlcGVhdGluZyBzbGlkZXMuXG4gKiBJbiBwYXJ0aWN1bGFyLCBpdCBidWlsZHMgYSBtYWluIGRhdGEgZm9ybSB3aXRoIGFsbCB0aGUgZGF0YSByZWxhdGluZyB0byB0aGUgc2xpZGVzIGFuZFxuICogYSBkaWN0aW9uYXJ5IHdpdGggdGhlIG5hbWUgcmVwcyB0aHVzIG1hZGUgaW5zdGFuY2Ugc2xpZGVOYW1lIGZvcm1zLlxuICogV2hlcmUgYSBmb3JtIGlzIGFzc29jaWF0ZWQgd2l0aCBlYWNoIGluc3RhbmNlIG9mIHRoZSByZXBlYXRpbmcgc2xpZGUuXG4gKiBleGFtcGxlOlxuICogc2ltcGxlIGZvcm06XG4gKiAge1xuICogICAgJHZhbHVlOiBcIkFHT1wiXG4gKiAgICBjaXR0YWRpbmFuemFfXzA6IFwiQUdPXCJcbiAqICAgIGNvZGljZV9maXNjYWxlX18wOiBcImpkZmxqZ2zDsmvDsmvDslwiXG4gKiAgICBjb3VudHJ5X18wOiBcIkFHT1wiXG4gKiAgICBkYXRlX2VuZDogXCIyMDIxLTAxLTEwXCJcbiAqICAgIGRhdGVfc3RhcnQ6IFwiMjAyMS0wMS0xMFwiXG4gKiAgICBkb2JfXzA6IFwiMjAyMS0wMy0xMVwiXG4gKiAgICBmaXJzdF9uYW1lX18wOiBcInBpcHBvXCJcbiAqICAgIGdlbmRlcl9fMDogXCJmXCJcbiAqICAgIGlkX2ZhbWlseTogXCIzYmVmM2EzZi1kOTVkLTRhMDktOGRmNC1lODEyYzU1YzYxYzZcIlxuICogICAgaXN0cnV6aW9uZV9fMDogbnVsbFxuICogICAgbGFzdF9uYW1lX18wOiBcInBpcHBvXCJcbiAqICAgIHBlcm1lc3NvX3NvZ2dpb3Jub19fMDogXCJub1wiXG4gKiAgICByZWxhemlvbmVfXzA6IFwiZ2VuaXRvcmVcIlxuICogICAgc29saWRhbmRvOiBcInNvbGlkYW5kbzFcIlxuICogICAgc3RhdG9fY2l2aWxlX18wOiBudWxsXG4gKiAgfVxuICogYWZ0ZXIgQlVJTERfREFUQVNFVFxuICogTWFpbkZvcm06XG4gKiB7XG4gKiAgICAkdmFsdWU6IFwiQUdPXCJcbiAqICAgIGFqZl9mb3JtX2lkOiAwICoqIGFkZGVkIGF0cmlidXRlIHRoYXQgcmFwcHJlc2VudCB0aGUgaW5kZXggcG9zaXRpb24gaW5zaWRlcyBpbnB1dCBmb3JtIGxpc3QuXG4gKiAgICBhamZfZmFtaWx5X2NvbXBvbmVudF9jb3VudDogMSoqIGFkZGVkIGF0cmlidXRlIHRoYXQgcmFwcHJlc2VudCB0aGUgaW5zdGFuY2UgbnVtYmVyIG9mIGZhbWlsaV9jb21wb25lbnQgcmVwZWF0aW5nIHNsaWRlcy5cbiAqICAgIGRhdGVfZW5kOiBcIjIwMjEtMDEtMTBcIlxuICogICAgZGF0ZV9zdGFydDogXCIyMDIxLTAxLTEwXCJcbiAqICAgIGlkX2ZhbWlseTogXCIzYmVmM2EzZi1kOTVkLTRhMDktOGRmNC1lODEyYzU1YzYxYzZcIlxuICogICAgcmVwczoge1xuICogICAgICBmYW1pbHlfY29tcG9uZW50OiBbXG4gKiAgICAgICAge1xuICogICAgICAgICAgYWpmX2ZhbWlseV9jb21wb25lbnRfcmVwOiAwICoqIGFkZGVkIGF0cmlidXRlIHRoYXQgcmFwcHJlc2VudCB0aGUgb3JkZXIgaW5zdGFuY2Ugb2YgZmFtaWx5X2NvbXBvbmVudCByZXBlYXRpbmcgc2xpZGUuXG4gKiAgICAgICAgICBjaXR0YWRpbmFuemE6IFwiQUdPXCJcbiAqICAgICAgICAgIGNvZGljZV9maXNjYWxlOiBcImpkZmxqZ2zDsmvDsmvDslwiXG4gKiAgICAgICAgICBjb3VudHJ5OiBcIkFHT1wiXG4gKiAgICAgICAgICBkb2I6IFwiMjAyMS0wMy0xMVwiXG4gKiAgICAgICAgICBmaXJzdF9uYW1lOiBcInBpcHBvXCJcbiAqICAgICAgICAgIGdlbmRlcjogXCJmXCJcbiAqICAgICAgICAgIGlzdHJ1emlvbmU6IG51bGxcbiAqICAgICAgICAgIGxhc3RfbmFtZTogXCJwaXBwb1wiXG4gKiAgICAgICAgICBwZXJtZXNzb19zb2dnaW9ybm86IFwibm9cIlxuICogICAgICAgICAgcmVsYXppb25lOiBcImdlbml0b3JlXCJcbiAqICAgICAgICAgIHN0YXRvX2NpdmlsZTogbnVsbFxuICogICAgICAgIH1cbiAqICAgICAgXVxuICogICAgfVxuICogfVxuICpcbiAqIEBwYXJhbSB7Rm9ybVtdfSBmb3Jtc1xuICogQHBhcmFtIHsqfSBbc2NoZW1hXSBpZiBzY2hlbWEgaXMgcHJvdmlkZWQgdGhlIGluc3RhbmNlcyBpbnNpZGUgdGhlIHJlcHMgbWF0Y2ggd2l0aCBlZmZlY3RpdmVcbiAqIHNsaWRlIG5hbWUuIE90aGVyd2lzZSBhbGwgcmVwZWF0aW5nIHNsaWRlcyBhcmUgYXNzb2NpYXRlcyB0byBnZW5lcmljIHNsaWRlIG5hbWUgXCJyZXBcIi5cbiAqIEByZXR1cm4geyp9ICB7TWFpbkZvcm1bXX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIEJVSUxEX0RBVEFTRVQoZm9ybXM6IEZvcm1bXSwgc2NoZW1hPzogYW55KTogTWFpbkZvcm1bXSB7XG4gIGNvbnN0IHJlczogTWFpbkZvcm1bXSA9IFtdO1xuICBjb25zdCBnZW5lcmF0ZU1ldGFkYXRhID0gKHNsaWRlTmFtZTogc3RyaW5nLCBzbGlkZUluc3RhbmNlOiBudW1iZXIpID0+IHtcbiAgICBjb25zdCByZXNnOiB7W3NuYW1lOiBzdHJpbmddOiBhbnl9ID0ge307XG4gICAgcmVzZ1tgYWpmXyR7c2xpZGVOYW1lfV9yZXBgXSA9IHNsaWRlSW5zdGFuY2U7XG4gICAgcmV0dXJuIHJlc2c7XG4gIH07XG5cbiAgZm9ybXMgPSAoZm9ybXMgfHwgW10pLnNsaWNlKDApO1xuXG4gIGlmIChzY2hlbWEgIT0gbnVsbCkge1xuICAgIGNvbnN0IHJlcGVhdGluZ1NsaWRlczogYW55W10gPSBzY2hlbWEubm9kZXMuZmlsdGVyKChub2RlOiBhbnkpID0+IG5vZGUubm9kZVR5cGUgPT09IDQpO1xuICAgIGNvbnN0IG9iajoge1tmaWVsZE5hbWU6IHN0cmluZ106IHN0cmluZ30gPSB7fTtcbiAgICByZXBlYXRpbmdTbGlkZXMuZm9yRWFjaChzbGlkZSA9PiB7XG4gICAgICBsZXQgbm9kZUZpZWxkcyA9IHNsaWRlLm5vZGVzLm1hcCgobjogYW55KSA9PiBuLm5hbWUpO1xuICAgICAgbm9kZUZpZWxkcy5mb3JFYWNoKChub2RlRmllbGQ6IHN0cmluZykgPT4ge1xuICAgICAgICBvYmpbbm9kZUZpZWxkXSA9IHNsaWRlLm5hbWU7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBmb3Jtcy5mb3JFYWNoKChmLCBmb3JtSWR4KSA9PiB7XG4gICAgICBjb25zdCBtYWluRm9ybTogTWFpbkZvcm0gPSB7cmVwczoge319O1xuICAgICAgY29uc3QgZktleXM6IHN0cmluZ1tdID0gT2JqZWN0LmtleXMoZik7XG4gICAgICBjb25zdCBpbnN0YW5jZXM6IHtbc2xpZGVOYW1lOiBzdHJpbmddOiBhbnl9ID0ge307XG5cbiAgICAgIGZLZXlzLmZvckVhY2goZmtleSA9PiB7XG4gICAgICAgIGNvbnN0IHNwbGl0dGVkS2V5OiBzdHJpbmdbXSA9IGZrZXkuc3BsaXQoJ19fJyk7XG4gICAgICAgIGNvbnN0IHNwbGl0dGVkTGVuZ3RoOiBudW1iZXIgPSBzcGxpdHRlZEtleS5sZW5ndGg7XG4gICAgICAgIGNvbnN0IGZpZWxkTmFtZSA9IHNwbGl0dGVkS2V5WzBdO1xuICAgICAgICBjb25zdCBzbGlkZUluc3RhbmNlID1cbiAgICAgICAgICBzcGxpdHRlZEtleVsxXSAhPSBudWxsICYmIE51bWJlci5pc0ludGVnZXIoK3NwbGl0dGVkS2V5WzFdKSA/ICtzcGxpdHRlZEtleVsxXSA6IG51bGw7XG4gICAgICAgIGNvbnN0IHNsaWRlTmFtZSA9IG9ialtmaWVsZE5hbWVdO1xuICAgICAgICBpZiAoc3BsaXR0ZWRMZW5ndGggPT09IDIgJiYgc2xpZGVJbnN0YW5jZSAhPSBudWxsICYmIHNsaWRlTmFtZSAhPSBudWxsKSB7XG4gICAgICAgICAgaW5zdGFuY2VzW3NsaWRlTmFtZV0gPSBpbnN0YW5jZXNbc2xpZGVOYW1lXSAhPSBudWxsID8gaW5zdGFuY2VzW3NsaWRlTmFtZV0gOiBbXTtcbiAgICAgICAgICBpbnN0YW5jZXNbc2xpZGVOYW1lXVtzbGlkZUluc3RhbmNlXSA9XG4gICAgICAgICAgICBpbnN0YW5jZXNbc2xpZGVOYW1lXVtzbGlkZUluc3RhbmNlXSAhPSBudWxsXG4gICAgICAgICAgICAgID8gaW5zdGFuY2VzW3NsaWRlTmFtZV1bc2xpZGVJbnN0YW5jZV1cbiAgICAgICAgICAgICAgOiBnZW5lcmF0ZU1ldGFkYXRhKHNsaWRlTmFtZSwgc2xpZGVJbnN0YW5jZSk7XG4gICAgICAgICAgaW5zdGFuY2VzW3NsaWRlTmFtZV1bc2xpZGVJbnN0YW5jZV1bZmllbGROYW1lXSA9IGZbZmtleV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbWFpbkZvcm1bZmllbGROYW1lXSA9IGZbZmllbGROYW1lXTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBtYWluRm9ybVtgYWpmX2Zvcm1faWRgXSA9IGZvcm1JZHg7XG4gICAgICBjb25zdCBpbnN0YW5jZUtleXMgPSBPYmplY3Qua2V5cyhpbnN0YW5jZXMpO1xuICAgICAgaW5zdGFuY2VLZXlzLmZvckVhY2goaW5zdGFuY2VLZXkgPT4ge1xuICAgICAgICBtYWluRm9ybVtgYWpmXyR7aW5zdGFuY2VLZXl9X2NvdW50YF0gPSBpbnN0YW5jZXNbaW5zdGFuY2VLZXldLmxlbmd0aDtcbiAgICAgIH0pO1xuICAgICAgbWFpbkZvcm0ucmVwcyA9IGluc3RhbmNlcztcbiAgICAgIHJlcy5wdXNoKG1haW5Gb3JtKTtcbiAgICB9KTtcbiAgICByZXR1cm4gcmVzO1xuICB9IGVsc2Uge1xuICAgIGZvcm1zLmZvckVhY2goZm9ybSA9PiB7XG4gICAgICBjb25zdCBmS2V5czogc3RyaW5nW10gPSBPYmplY3Qua2V5cyhmb3JtKTtcbiAgICAgIGNvbnN0IG5vUmVwZWF0aW5nRmllbGRzOiBzdHJpbmdbXSA9IGZLZXlzLmZpbHRlcihma2V5ID0+IGZrZXkuaW5kZXhPZignX18nKSA9PT0gLTEpO1xuICAgICAgY29uc3Qgbm9SZXBGb3JtOiBGb3JtID0ge307XG5cbiAgICAgIG5vUmVwZWF0aW5nRmllbGRzLmZvckVhY2goZmllbGQgPT4ge1xuICAgICAgICBub1JlcEZvcm1bZmllbGRdID0gZm9ybVtmaWVsZF07XG4gICAgICB9KTtcblxuICAgICAgY29uc3QgbWFpbkZvcm06IE1haW5Gb3JtID0gey4uLm5vUmVwRm9ybSwgcmVwczoge3NsaWRlOiBbXX19O1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8PSBNQVhfUkVQUzsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRTbGlkZTogRm9ybSA9IHt9O1xuICAgICAgICBjb25zdCBvbmx5Q3VycmVudEluc3RhbmNlS2V5czogc3RyaW5nW10gPSBmS2V5cy5maWx0ZXIoZmtleSA9PiBma2V5LmluZGV4T2YoYF9fJHtpfWApID4gLTEpO1xuICAgICAgICAvLyBzZSBpbCBudW1lcm8gZGkgYXR0cmlidXRpIGNvaW5jaWRlIGlsIGZvcm0gZGF0YSBub24gaGEgcmVwZWF0aW5nc2xpZGVzXG4gICAgICAgIGlmIChvbmx5Q3VycmVudEluc3RhbmNlS2V5cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICBtYWluRm9ybVsnYWpmX3JlcF9jb3VudCddID0gaTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBvbmx5Q3VycmVudEluc3RhbmNlS2V5cy5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgY29uc3Qgc3BsaXR0ZWRLZXkgPSBrZXkuc3BsaXQoJ19fJyk7XG4gICAgICAgICAgY29uc3QgZmllbGROYW1lID0gc3BsaXR0ZWRLZXlbMF07XG4gICAgICAgICAgY29uc3Qgc2xpZGVJbnN0YW5jZSA9IHNwbGl0dGVkS2V5WzFdICE9IG51bGwgPyArc3BsaXR0ZWRLZXlbMV0gOiBudWxsO1xuICAgICAgICAgIGN1cnJlbnRTbGlkZVtmaWVsZE5hbWVdID0gZm9ybVtrZXldO1xuICAgICAgICAgIGN1cnJlbnRTbGlkZVsnYWpmX3JlcCddID0gc2xpZGVJbnN0YW5jZSAhPSBudWxsID8gc2xpZGVJbnN0YW5jZSA6IGN1cnJlbnRTbGlkZVsnYWpmX3JlcCddO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKG9ubHlDdXJyZW50SW5zdGFuY2VLZXlzLmxlbmd0aCAhPSAwKSB7XG4gICAgICAgICAgbWFpbkZvcm0ucmVwcyFbJ3NsaWRlJ10ucHVzaChjdXJyZW50U2xpZGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG1haW5Gb3JtLnJlcHMgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJlcy5wdXNoKG1haW5Gb3JtKTtcbiAgICB9KTtcblxuICAgIHJldHVybiByZXM7XG4gIH1cbn1cblxuLyoqXG4gKiBUaGlzIGZ1bmN0aW9uIGJ1aWxkIGEgcGFydGl0aW9uIG9mIGZvcm1MaXN0IGJ5IGV4ZWN1dGlvbiBvZiBleHByZXNzaW9uLlxuICogRm9yIGV2ZXJ5IG1haW5Gb3JtIHRoZSBleHByZXNzaW9uIG1hdGNoIG1haW5mb3JtIGZpZWxkIGFuZCByZXBsYWNlIGl0LlxuICogSWYgdGhlIGV2YWx1YXRpb24gb2YgZXhwcmVzc2lvbiBpcyB0cnVlIHRoZSBtYWluRm9ybSB3YXMgYWRkZWQgdG8gcGFydGl0aW9uXG4gKiAodGhhdCBiZWNvdXNlIHRoZSBleHByZXNzaW9uIGRvbid0IGhhcyByZXBlYXRpbmcgc2xpZGUgZmllbGRzKSBlbHNlIGlmXG4gKiB0aGVyZSBhcmUgcmVwcyBmb3IgZXZlcnkgcmVwIHRoZSBleHByZXNzaW9uIGlzIHVwZGF0ZWQgd2l0aCByZXBsYWNpbmcgb2ZcbiAqIHJlcGVhdGluZyBzbGlkZSBpbnN0YW5jZSBmaWVsZHMgYW5kIGV2YWx1YXRlZCwgaWYgdHJ1ZSB3YXMgYWRkZWQgdG8gcGFydGl0aW9uLlxuICogQWxsIGFqZiBhdHRyaWJ1dGVzIHdhZCB1cGRhdGVkLiAvVE9ET1xuICpcbiAqXG4gKiBAcGFyYW0ge01haW5Gb3JtW119IGZvcm1MaXN0IGEgc2V0IG9mIG1haW4gZm9ybXNcbiAqIEBwYXJhbSB7c3RyaW5nfSBleHByZXNzaW9uIHRvIGJlIGV2YWx1YXRlZC4gdGhhdCBjYW4gYmUgYWJsZSB0byBjb250YWlucyBhbm90aGVyXG4gKiBoaW5kaWtpdCBmdW5jdGlvbnMgb3IgbWFpbkZvcm0gZmllbGRzIG9yIHJlcHMgZmllbGRzLlxuICogQHJldHVybiB7Kn0gIHtNYWluRm9ybVtdfVxuICovXG5leHBvcnQgZnVuY3Rpb24gRklMVEVSX0JZKGZvcm1MaXN0OiBNYWluRm9ybVtdLCBleHByZXNzaW9uOiBzdHJpbmcpOiBNYWluRm9ybVtdIHtcbiAgY29uc3QgZm9ybXM6IE1haW5Gb3JtW10gPSBjbG9uZU1haW5Gb3Jtcyhmb3JtTGlzdCB8fCBbXSkuZmlsdGVyKChmOiBNYWluRm9ybSkgPT4gZiAhPSBudWxsKTtcbiAgY29uc3QgaWRlbnRpZmllcnMgPSBbLi4ubmV3IFNldChnZXRDb2RlSWRlbnRpZmllcnMoZXhwcmVzc2lvbiwgdHJ1ZSkpXTtcbiAgbGV0IHJlczogTWFpbkZvcm1bXSA9IFtdO1xuICBpZiAoZXhwcmVzc2lvbiA9PT0gJ3RydWUnKSB7XG4gICAgcmV0dXJuIGZvcm1zO1xuICB9XG4gIGlmIChmb3Jtcy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gW107XG4gIH1cblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGZvcm1zLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgbWFpbkZvcm06IE1haW5Gb3JtID0gZm9ybXNbaV07XG4gICAgbGV0IGV4cHIgPSBleHByZXNzaW9uO1xuICAgIGlmIChtYWluRm9ybSA9PSBudWxsKSB7XG4gICAgICByZXMucHVzaChtYWluRm9ybSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgLyogcmVwbGFjZSBtYWluIGZvcm0gZmllbGQgaW5zaWRlIGV4cHJlc3Npb24gKi9cbiAgICBpZGVudGlmaWVycy5mb3JFYWNoKGlkZW50aWZpZXIgPT4ge1xuICAgICAgY29uc3QgY2hhbmdlID0gbWFpbkZvcm1baWRlbnRpZmllcl0gPyBtYWluRm9ybVtpZGVudGlmaWVyXSA6IG51bGw7XG4gICAgICBpZiAoY2hhbmdlKSB7XG4gICAgICAgIGV4cHIgPSBleHByLnNwbGl0KGlkZW50aWZpZXIpLmpvaW4oSlNPTi5zdHJpbmdpZnkoY2hhbmdlKSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgLyogaWYgdGhhdCdzIGFscmVhZHkgdHJ1ZSBwdXNoIGl0IGluIHJlcyAqL1xuICAgIGlmIChldmFsdWF0ZUV4cHJlc3Npb24oZXhwciwgbWFpbkZvcm0pKSB7XG4gICAgICByZXMucHVzaChtYWluRm9ybSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBsZXQgbmV3UmVwczogSW5zdGFuY2VzIHwgdW5kZWZpbmVkO1xuICAgIGNvbnN0IGNoaWxkS2V5cyA9IE9iamVjdC5rZXlzKG1haW5Gb3JtLnJlcHMgYXMgSW5zdGFuY2VzKTtcblxuICAgIGNoaWxkS2V5cy5mb3JFYWNoKGNoaWxkS2V5ID0+IHtcbiAgICAgIGNvbnN0IGN1cnJlbnRSZXBzID0gKChtYWluRm9ybS5yZXBzIGFzIEluc3RhbmNlcylbY2hpbGRLZXldIGFzIEZvcm1bXSlcbiAgICAgICAgLmZpbHRlcigoZm9ybTogRm9ybSkgPT4ge1xuICAgICAgICAgIGxldCByZXBFeHByID0gZXhwcjtcbiAgICAgICAgICAvKiByZXBsYWNlIHJlcCBmaWVsZCBpbnNpZGUgZXhwcmVzc2lvbiAqL1xuICAgICAgICAgIGlkZW50aWZpZXJzLmZvckVhY2goaWRlbnRpZmllciA9PiB7XG4gICAgICAgICAgICBjb25zdCBjaGFuZ2VJblJlcCA9IGZvcm1baWRlbnRpZmllcl0gPyBmb3JtW2lkZW50aWZpZXJdIDogbnVsbDtcbiAgICAgICAgICAgIGlmIChjaGFuZ2VJblJlcCkge1xuICAgICAgICAgICAgICByZXBFeHByID0gcmVwRXhwci5zcGxpdChpZGVudGlmaWVyKS5qb2luKEpTT04uc3RyaW5naWZ5KGNoYW5nZUluUmVwKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmV0dXJuIGV2YWx1YXRlRXhwcmVzc2lvbihyZXBFeHByLCBmb3JtKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmZpbHRlcihmID0+IGYgIT0gbnVsbCk7XG4gICAgICBpZiAoY3VycmVudFJlcHMubGVuZ3RoID4gMCkge1xuICAgICAgICBuZXdSZXBzID0gKG5ld1JlcHMgIT0gbnVsbCA/IG5ld1JlcHMgOiB7fSkgYXMgSW5zdGFuY2VzO1xuICAgICAgICBuZXdSZXBzW2NoaWxkS2V5XSA9IGN1cnJlbnRSZXBzO1xuICAgICAgfVxuICAgICAgbWFpbkZvcm1bYGFqZl8ke2NoaWxkS2V5fV9jb3VudGBdID0gY3VycmVudFJlcHMubGVuZ3RoO1xuICAgIH0pO1xuICAgIGlmIChuZXdSZXBzID09IG51bGwpIHtcbiAgICAgIHJlcy5wdXNoKG51bGwgYXMgdW5rbm93biBhcyBNYWluRm9ybSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG1haW5Gb3JtLnJlcHMgPSBuZXdSZXBzO1xuICAgICAgcmVzLnB1c2gobWFpbkZvcm0pO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXM7XG59XG5cbi8qKlxuICogcmV0dXJuIHRoZSB0b2RheSBkYXRlXG4gKlxuICogQGV4cG9ydFxuICogQHBhcmFtIHtzdHJpbmd9IFtmb3JtYXQ9J3l5eXktTU0tZGQnXVxuICogQHJldHVybiB7Kn0gIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBUT0RBWShmb3JtYXQgPSAneXl5eS1NTS1kZCcpOiBzdHJpbmcge1xuICByZXR1cm4gZGF0ZUZucy5mb3JtYXQobmV3IERhdGUoKSwgZm9ybWF0KTtcbn1cblxuLyoqXG4gKiBVVElMSVRZIEZVTkNUSU9OXG4gKiAgdGhpcyBmdW5jdGlvbiBhbGxvdyB0aGUgY29uc29sZSBsb2cgb2YgZXhjZWwgdmFyaWFibGVzLlxuICogQGV4cG9ydFxuICogQHBhcmFtIHsqfSB2YWxcbiAqIEBwYXJhbSB7c3RyaW5nfSBbdGV4dD0nbG9nOiAnXVxuICovXG5leHBvcnQgZnVuY3Rpb24gQ09OU09MRV9MT0codmFsOiBhbnksIHRleHQgPSAnbG9nOiAnKTogdm9pZCB7XG4gIGNvbnNvbGUubG9nKHRleHQsIHZhbCk7XG59XG5cbi8qKlxuICogdGhpcyBmdW5jdGlvbiB0YWtlIGEgc3RyaW5nIGRhdGUgYW5kIHJldHVybiB0aGUgZGlmZmVyZW5jZSBpbiB5ZWFyIGZyb20gZG9iIHRvIHRvZGF5LlxuICpcbiAqIEBleHBvcnRcbiAqIEBwYXJhbSB7KHN0cmluZyB8IG51bGwpfSBkb2JcbiAqIEByZXR1cm4geyp9ICB7bnVtYmVyfVxuICovXG5leHBvcnQgZnVuY3Rpb24gR0VUX0FHRShkb2I6IHN0cmluZyB8IG51bGwpOiBudW1iZXIge1xuICBpZiAoZG9iID09IG51bGwpIHJldHVybiArJzwnOyAvLyBuZWVkIGZvciBnZW5lcmF0ZSBmYWxzZSBmdW5jaW9uIGluIGV2YWx1YXRlRXhwcmVzc2lvblxuICBjb25zdCBkYXRlID0gbmV3IERhdGUoZG9iKTtcbiAgY29uc3QgYWdlOiBudW1iZXIgPSBkYXRlRm5zLmRpZmZlcmVuY2VJblllYXJzKG5ldyBEYXRlKCksIGRhdGUpO1xuICByZXR1cm4gYWdlO1xufVxuXG4vKipcbiAqIHRoaXMgZnVuY3Rpb24gcmV0dXJucyByZXBzIGxlbmd0aCBpZiByZXBzIGluIGRlZmluZWQgb3IgdGhlIGxlbmd0aCBvZiBkYXRhc2V0IGlmIGRhdGFzZXQgaXMgYXJyYXktXG4gKlxuICogQGV4cG9ydFxuICogQHBhcmFtIHsoTWFpbkZvcm0gfCBhbnlbXSl9IGRhdGFzZXRcbiAqIEByZXR1cm4geyp9ICB7bnVtYmVyfVxuICovXG5leHBvcnQgZnVuY3Rpb24gTEVOKGRhdGFzZXQ6IE1haW5Gb3JtIHwgYW55W10pOiBudW1iZXIge1xuICBpZiAoZGF0YXNldCA9PSBudWxsKSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cbiAgaWYgKChkYXRhc2V0IGFzIE1haW5Gb3JtKS5yZXBzICE9IG51bGwpIHtcbiAgICBjb25zdCBtYWluRm9ybSA9IGRhdGFzZXQgYXMgTWFpbkZvcm07XG4gICAgY29uc3QgcmVwcyA9IE9iamVjdC5rZXlzKG1haW5Gb3JtLnJlcHMgYXMgSW5zdGFuY2VzKVxuICAgICAgLm1hcChrZXkgPT4gKG1haW5Gb3JtLnJlcHMgYXMgSW5zdGFuY2VzKVtrZXldLmZsYXQoKSlcbiAgICAgIC5mbGF0KCk7XG4gICAgcmV0dXJuIHJlcHMubGVuZ3RoO1xuICB9XG5cbiAgcmV0dXJuIChkYXRhc2V0IGFzIGFueVtdKS5sZW5ndGggfHwgMDtcbn1cblxuLyoqXG4gKiByZXR1cm4gdHJ1ZSBpZiBkYXRlIGlzIGJlZm9yZSB0aGVuIGRhdGVUb0NvbXBhcmVcbiAqXG4gKiBAZXhwb3J0XG4gKiBAcGFyYW0ge3N0cmluZ30gZGF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IGRhdGVUb0NvbXBhcmVcbiAqIEByZXR1cm4geyp9ICB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIElTX0JFRk9SRShkYXRlOiBzdHJpbmcsIGRhdGVUb0NvbXBhcmU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICBjb25zdCBkYXRlQTogRGF0ZSA9IGRhdGVGbnMucGFyc2VJU08oZGF0ZSk7XG4gIGNvbnN0IGRhdGVCOiBEYXRlID0gZGF0ZUZucy5wYXJzZUlTTyhkYXRlVG9Db21wYXJlKTtcbiAgcmV0dXJuIGRhdGVGbnMuaXNCZWZvcmUoZGF0ZUEsIGRhdGVCKTtcbn1cblxuLyoqXG4gKiByZXR1cm4gdHJ1ZSBpZiBkYXRlIGlzIGFmdGVyIHRoZW4gZGF0ZVRvQ29tcGFyZVxuICpcbiAqIEBleHBvcnRcbiAqIEBwYXJhbSB7c3RyaW5nfSBkYXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gZGF0ZVRvQ29tcGFyZVxuICogQHJldHVybiB7Kn0gIHtib29sZWFufVxuICovXG5leHBvcnQgZnVuY3Rpb24gSVNfQUZURVIoZGF0ZTogc3RyaW5nLCBkYXRlVG9Db21wYXJlOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgY29uc3QgZGF0ZUE6IERhdGUgPSBkYXRlRm5zLnBhcnNlSVNPKGRhdGUpO1xuICBjb25zdCBkYXRlQjogRGF0ZSA9IGRhdGVGbnMucGFyc2VJU08oZGF0ZVRvQ29tcGFyZSk7XG4gIHJldHVybiBkYXRlRm5zLmlzQWZ0ZXIoZGF0ZUEsIGRhdGVCKTtcbn1cblxuLyoqXG4gKiByZXR1cm4gdHJ1ZSBpZiBkYXRlIGlzIHdoaXRoaW4gaW50ZXJ2YWwgZnJvbSBkYXRlU3RhcnQgdG8gZGF0ZUVuZFxuICpcbiAqIEBleHBvcnRcbiAqIEBwYXJhbSB7c3RyaW5nfSBkYXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gZGF0ZVN0YXJ0XG4gKiBAcGFyYW0ge3N0cmluZ30gZGF0ZUVuZFxuICogQHJldHVybiB7Kn0gIHtib29sZWFufVxuICovXG5leHBvcnQgZnVuY3Rpb24gSVNfV0lUSElOX0lOVEVSVkFMKGRhdGU6IHN0cmluZywgZGF0ZVN0YXJ0OiBzdHJpbmcsIGRhdGVFbmQ6IHN0cmluZyk6IGJvb2xlYW4ge1xuICBjb25zdCBkYXRlVG9Db21wYXJlOiBEYXRlID0gZGF0ZUZucy5wYXJzZUlTTyhkYXRlKTtcbiAgY29uc3QgaW50ZXJ2YWw6IEludGVydmFsID0ge1xuICAgIHN0YXJ0OiBkYXRlRm5zLnBhcnNlSVNPKGRhdGVTdGFydCksXG4gICAgZW5kOiBkYXRlRm5zLnBhcnNlSVNPKGRhdGVFbmQpLFxuICB9O1xuICByZXR1cm4gZGF0ZUZucy5pc1dpdGhpbkludGVydmFsKGRhdGVUb0NvbXBhcmUsIGludGVydmFsKTtcbn1cblxuLyoqXG4gKiB0aGlzIGZ1bmN0aW9uIGV4dGVuZCBmb3Jtc0EgZGF0YXNldC5cbiAqIHNlYXJjaCBhbGwgbWF0Y2ggb2Yga2V5QSBpbiBmb3Jtc0IsIGlmIGZvdW5kIGlmIG1lcmdlIGZvcm1BIGFuZCBmb3JtQi5cbiAqXG4gKiBAZXhwb3J0XG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5QVxuICogQHBhcmFtIHtzdHJpbmd9IFtrZXlCXVxuICogQHJldHVybiB7Kn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIEpPSU5fRk9STVMoXG4gIGZvcm1zQTogKE1haW5Gb3JtIHwgRm9ybSlbXSxcbiAgZm9ybXNCOiAoTWFpbkZvcm0gfCBGb3JtKVtdLFxuICBrZXlBOiBzdHJpbmcsXG4gIGtleUI/OiBzdHJpbmcsXG4pOiAoTWFpbkZvcm0gfCBGb3JtKVtdIHtcbiAgZm9ybXNBID0gY2xvbmVNYWluRm9ybXMoZm9ybXNBKTtcbiAgZm9ybXNCID0gY2xvbmVNYWluRm9ybXMoZm9ybXNCKTtcbiAgY29uc3QgbWVyZ2VkRm9ybXM6IChNYWluRm9ybSB8IEZvcm0pW10gPSBbXTtcbiAgaWYgKGtleUEgPT0gbnVsbCB8fCBmb3Jtc0EgPT0gbnVsbCB8fCBmb3Jtc0EubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIG1lcmdlZEZvcm1zO1xuICB9XG4gIGlmIChrZXlCID09IG51bGwpIHtcbiAgICBrZXlCID0ga2V5QTtcbiAgfVxuICBpZiAoZm9ybXNCID09IG51bGwgfHwgZm9ybXNCLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBmb3Jtc0E7XG4gIH1cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBmb3Jtc0EubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBmb3JtQSA9IGZvcm1zQVtpXTtcbiAgICBjb25zdCBrZXlBVmFsdWUgPSBmb3JtQVtrZXlBXTtcbiAgICBsZXQgbWVyZ2VkRm9ybSA9IHsuLi5mb3JtQX07XG4gICAgaWYgKGZvcm1BID09IG51bGwgfHwga2V5QVZhbHVlID09IG51bGwpIHtcbiAgICAgIG1lcmdlZEZvcm1zLnB1c2goZm9ybUEpO1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGZvciAobGV0IGogPSAwOyBqIDwgZm9ybXNCLmxlbmd0aDsgaisrKSB7XG4gICAgICBjb25zdCBmb3JtQiA9IGZvcm1zQltqXTtcbiAgICAgIGNvbnN0IGtleUJWYWx1ZSA9IGZvcm1CW2tleUJdO1xuICAgICAgaWYgKGZvcm1CID09IG51bGwgfHwga2V5QlZhbHVlID09IG51bGwpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAoa2V5QVZhbHVlID09PSBrZXlCVmFsdWUpIHtcbiAgICAgICAgbWVyZ2VkRm9ybSA9IHsuLi5mb3JtQSwgLi4uZm9ybUJ9O1xuICAgICAgICBpZiAoZm9ybUEucmVwcyAhPSBudWxsICYmIGZvcm1CLnJlcHMgIT0gbnVsbCkge1xuICAgICAgICAgIG1lcmdlZEZvcm0ucmVwcyA9IHtcbiAgICAgICAgICAgIC4uLihmb3JtQSBhcyBNYWluRm9ybSkucmVwcyxcbiAgICAgICAgICAgIC4uLihmb3JtQiBhcyBNYWluRm9ybSkucmVwcyxcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICBtZXJnZWRGb3Jtcy5wdXNoKG1lcmdlZEZvcm0pO1xuICB9XG5cbiAgcmV0dXJuIG1lcmdlZEZvcm1zO1xufVxuXG4vKipcbiAqIGxpa2UgSk9JTl9GT1JNUyBidXQgZXh0ZW5kcyB0aGUgYmVoYXZpb3VyIG9uIHRoZSByZXBzLlxuICogc2VhcmNoIGFsbCBtYXRjaCBvZiBzdWJLZXlBIGluIGZvcm1CXG4gKlxuICogQGV4cG9ydFxuICogQHBhcmFtIHtNYWluRm9ybVtdfSBmb3Jtc0FcbiAqIEBwYXJhbSB7TWFpbkZvcm1bXX0gZm9ybXNCXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5QVxuICogQHBhcmFtIHtzdHJpbmd9IGtleUJcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdWJLZXlBXG4gKiBAcGFyYW0ge3N0cmluZ30gW3N1YktleUJdXG4gKiBAcmV0dXJuIHsqfSAge01haW5Gb3JtW119XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBKT0lOX1JFUEVBVElOR19TTElERVMoXG4gIGZvcm1zQTogTWFpbkZvcm1bXSxcbiAgZm9ybXNCOiBNYWluRm9ybVtdLFxuICBrZXlBOiBzdHJpbmcsXG4gIGtleUI6IHN0cmluZyxcbiAgc3ViS2V5QTogc3RyaW5nLFxuICBzdWJLZXlCPzogc3RyaW5nLFxuKTogTWFpbkZvcm1bXSB7XG4gIGNvbnN0IG1lcmdlZEZvcm1zOiBNYWluRm9ybVtdID0gW107XG4gIGZvcm1zQSA9IGNsb25lTWFpbkZvcm1zKGZvcm1zQSk7XG4gIGZvcm1zQiA9IGNsb25lTWFpbkZvcm1zKGZvcm1zQik7XG4gIGlmIChrZXlBID09IG51bGwgfHwgZm9ybXNBID09IG51bGwgfHwgZm9ybXNBLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBtZXJnZWRGb3JtcztcbiAgfVxuICBpZiAoa2V5QiA9PSBudWxsKSB7XG4gICAga2V5QiA9IGtleUE7XG4gIH1cbiAgaWYgKGZvcm1zQiA9PSBudWxsIHx8IGZvcm1zQi5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gZm9ybXNBO1xuICB9XG4gIGlmIChzdWJLZXlBID09IG51bGwpIHtcbiAgICByZXR1cm4gSk9JTl9GT1JNUyhmb3Jtc0EsIGZvcm1zQiwga2V5QSwga2V5QikgYXMgTWFpbkZvcm1bXTtcbiAgfVxuICBpZiAoc3ViS2V5QiA9PSBudWxsKSB7XG4gICAgc3ViS2V5QiA9IHN1YktleUE7XG4gIH1cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBmb3Jtc0EubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBmb3JtQSA9IGZvcm1zQVtpXTtcbiAgICBjb25zdCBrZXlBVmFsdWUgPSBmb3JtQVtrZXlBXTtcbiAgICBsZXQgbWVyZ2VkRm9ybSA9IHsuLi5mb3JtQX07XG4gICAgaWYgKGZvcm1BID09IG51bGwgfHwga2V5QVZhbHVlID09IG51bGwpIHtcbiAgICAgIG1lcmdlZEZvcm1zLnB1c2goZm9ybUEpO1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGZvciAobGV0IGogPSAwOyBqIDwgZm9ybXNCLmxlbmd0aDsgaisrKSB7XG4gICAgICBjb25zdCBmb3JtQiA9IGZvcm1zQltqXTtcbiAgICAgIGNvbnN0IGtleUJWYWx1ZSA9IGZvcm1CW2tleUJdO1xuICAgICAgaWYgKGZvcm1CID09IG51bGwgfHwga2V5QlZhbHVlID09IG51bGwpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAoa2V5QVZhbHVlID09PSBrZXlCVmFsdWUpIHtcbiAgICAgICAgbWVyZ2VkRm9ybSA9IHsuLi5mb3JtQSwgLi4uZm9ybUJ9O1xuICAgICAgICBtZXJnZWRGb3JtLnJlcHMgPSB7Li4uZm9ybUEucmVwcywgLi4uZm9ybUIucmVwc307XG4gICAgICAgIGlmIChmb3JtQS5yZXBzICE9IG51bGwgJiYgZm9ybUIucmVwcyAhPSBudWxsKSB7XG4gICAgICAgICAgY29uc3QgbWVyZ2VkUmVwczogSW5zdGFuY2VzID0ge307XG4gICAgICAgICAgY29uc3QgY2hpbGRBS2V5cyA9IE9iamVjdC5rZXlzKGZvcm1BLnJlcHMpO1xuICAgICAgICAgIGNvbnN0IGNoaWxkQiA9IE9iamVjdC5rZXlzKGZvcm1CLnJlcHMpXG4gICAgICAgICAgICAubWFwKGtleSA9PiAoZm9ybUIucmVwcyBhcyBJbnN0YW5jZXMpW2tleV0uZmxhdCgpKVxuICAgICAgICAgICAgLmZsYXQoKTtcbiAgICAgICAgICBjaGlsZEFLZXlzLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGluc3RhbmNlID0gKGZvcm1BLnJlcHMgYXMgSW5zdGFuY2VzKVtrZXldO1xuICAgICAgICAgICAgbWVyZ2VkUmVwc1trZXldID0gSk9JTl9GT1JNUyhcbiAgICAgICAgICAgICAgaW5zdGFuY2UgYXMgdW5rbm93biBhcyBNYWluRm9ybVtdLFxuICAgICAgICAgICAgICBjaGlsZEIgYXMgdW5rbm93biBhcyBNYWluRm9ybVtdLFxuICAgICAgICAgICAgICBzdWJLZXlBLFxuICAgICAgICAgICAgICBzdWJLZXlCLFxuICAgICAgICAgICAgKSBhcyBGb3JtW107XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgbWVyZ2VkRm9ybS5yZXBzID0gbWVyZ2VkUmVwcztcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgbWVyZ2VkRm9ybXMucHVzaChtZXJnZWRGb3JtKTtcbiAgfVxuXG4gIHJldHVybiBtZXJnZWRGb3Jtcztcbn1cblxuLyoqXG4gKiB0aGlzIGZ1bmN0aW9uIGV4dHJhY3QgYW4gYXJyYXkgb2YgZXZhbHVhdGVkIGV4cHJlc3Npb24gZnJvbSBtYWluIGZvcm0gcmVwcy5cbiAqXG4gKiBAZXhwb3J0XG4gKiBAcGFyYW0ge01haW5Gb3JtfSBtYWluRm9ybVxuICogQHBhcmFtIHtzdHJpbmd9IGV4cHJlc3Npb25cbiAqIEByZXR1cm4geyp9ICB7YW55W119XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBGUk9NX1JFUFMobWFpbkZvcm06IE1haW5Gb3JtLCBleHByZXNzaW9uOiBzdHJpbmcpOiBhbnlbXSB7XG4gIGNvbnN0IHJlczogYW55W10gPSBbXTtcblxuICBpZiAobWFpbkZvcm0gIT0gbnVsbCAmJiBtYWluRm9ybS5yZXBzICE9IG51bGwpIHtcbiAgICBjb25zdCByZXBzID0gT2JqZWN0LmtleXMobWFpbkZvcm0ucmVwcylcbiAgICAgIC5tYXAoa2V5ID0+IChtYWluRm9ybS5yZXBzIGFzIEluc3RhbmNlcylba2V5XS5mbGF0KCkpXG4gICAgICAuZmxhdCgpO1xuICAgIHJlcHMuZm9yRWFjaChjaGlsZCA9PiB7XG4gICAgICByZXMucHVzaChldmFsdWF0ZUV4cHJlc3Npb24oZXhwcmVzc2lvbiwgY2hpbGQpKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiByZXM7XG59XG5cbi8qKlxuICogdGhpcyBmdW5jdGlvbiByZXR1cm4gdHJ1ZSBpZiB2YWx1ZSBpcyBpbnNpZGUgb2YgZGF0YXNldFxuICpcbiAqIEBleHBvcnRcbiAqIEBwYXJhbSB7YW55W119IGRhdGFzZXRcbiAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAqIEByZXR1cm4geyp9ICB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIElTSU4oZGF0YXNldDogYW55W10sIHZhbHVlOiBhbnkpOiBib29sZWFuIHtcbiAgaWYgKGRhdGFzZXQgPT0gbnVsbCB8fCB2YWx1ZSA9PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiBkYXRhc2V0LmluZGV4T2YodmFsdWUpID49IDA7XG59XG5cbi8qKlxuICogdGhlIGxlbmd0aHMgb2YgdGhlIGRhdGFzZXRzIGFyZSBhc3N1bWVkIHRvIGJlIHRoZSBzYW1lLlxuICogdGhpcyBmdW5jdGlvbiByZXR1cm4gYW4gYXJyYXkgbGlzdCBvZiBjYWxjdWxhdGVkIHZhbHVlcy5cbiAqIGVhY2ggZWxlbWVudCBvZiB0aGUgYXJyYXkgaXMgY2FsY3VsYXRlZCBieSByZXBsYWNpbmcgZWxlbUEgd2l0aCB0aGUgY3VycmVudCBlbGVtZW50IG9mIGFcbiAqIGFuZCBlbGVtQiB3aXRoIHRoZSBjdXJyZW50IGVsZW1lbnQgb2YgYiBpbnNpZGUgdGhlIGV4cHJlc3Npb24uXG4gKlxuICogQGV4cG9ydFxuICogQHBhcmFtIHtudW1iZXJbXX0gZGF0YXNldEFcbiAqIEBwYXJhbSB7bnVtYmVyW119IGRhdGFzZXRCXG4gKiBAcGFyYW0ge3N0cmluZ30gZXhwcmVzc2lvblxuICogQHJldHVybiB7Kn0gIHtudW1iZXJbXX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIE9QKGRhdGFzZXRBOiBudW1iZXJbXSwgZGF0YXNldEI6IG51bWJlcltdLCBleHByZXNzaW9uOiBzdHJpbmcpOiBudW1iZXJbXSB7XG4gIGNvbnN0IHJlczogbnVtYmVyW10gPSBbXTtcbiAgaWYgKGRhdGFzZXRBID09IG51bGwgfHwgZGF0YXNldEIubGVuZ3RoID4gZGF0YXNldEEubGVuZ3RoKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG4gIGlmIChkYXRhc2V0QiA9PSBudWxsKSB7XG4gICAgcmV0dXJuIGRhdGFzZXRBO1xuICB9XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YXNldEEubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBlbGVtQSA9IGRhdGFzZXRBW2ldIHx8IDA7XG4gICAgY29uc3QgZWxlbUIgPSBkYXRhc2V0QltpXSB8fCAwO1xuICAgIGNvbnN0IGV4cHIgPSBleHByZXNzaW9uXG4gICAgICAuc3BsaXQoJ2VsZW1BJylcbiAgICAgIC5qb2luKEpTT04uc3RyaW5naWZ5KGVsZW1BKSlcbiAgICAgIC5zcGxpdCgnZWxlbUInKVxuICAgICAgLmpvaW4oSlNPTi5zdHJpbmdpZnkoZWxlbUIpKTtcbiAgICByZXMucHVzaChldmFsdWF0ZUV4cHJlc3Npb24oZXhwcikpO1xuICB9XG5cbiAgcmV0dXJuIHJlcztcbn1cblxuLyoqXG4gKiB0aGlzIGZ1bmN0aW9uIHRha2UgYSBhamYgc2NoZW1hIGFuZCBhIGxpc3Qgb2YgZmllbGQgbmFtZXMgYXMgaW5wdXQgYW5kXG4gKiByZXR1cm5zIGEgbGlzdCBvZiBsYWJlbCBtYXRjaGVkIGluc2lkZSBhIHNjaGVtYSBjaG9pY2hlIG9yaWdpbnMuXG4gKlxuICogQGV4cG9ydFxuICogQHBhcmFtIHsqfSBzY2hlbWFcbiAqIEBwYXJhbSB7c3RyaW5nW119IGZpZWxkTmFtZXNcbiAqIEByZXR1cm4geyp9ICB7c3RyaW5nW119XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBHRVRfTEFCRUxTKHNjaGVtYTogYW55LCBmaWVsZE5hbWVzOiBzdHJpbmdbXSk6IHN0cmluZ1tdIHtcbiAgY29uc3QgbGFiZWxzOiB7W2ZpZWxkTmFtZTogc3RyaW5nXTogc3RyaW5nfSA9IHt9O1xuXG4gIGlmIChzY2hlbWEgIT0gbnVsbCAmJiBzY2hlbWEuY2hvaWNlc09yaWdpbnMgIT0gbnVsbCkge1xuICAgIChzY2hlbWEuY2hvaWNlc09yaWdpbnMgYXMgYW55W10pLmZvckVhY2goY2hvaWNlID0+IHtcbiAgICAgIGlmIChjaG9pY2UgIT0gbnVsbCAmJiBjaG9pY2UuY2hvaWNlcyAhPSBudWxsKSB7XG4gICAgICAgIChjaG9pY2UuY2hvaWNlcyBhcyBhbnlbXSkuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgICAgICBsYWJlbHNbZWxlbWVudC52YWx1ZV0gPSBlbGVtZW50LmxhYmVsO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiBmaWVsZE5hbWVzLm1hcChmaWVsZE5hbWUgPT4gKGxhYmVsc1tmaWVsZE5hbWVdICE9IG51bGwgPyBsYWJlbHNbZmllbGROYW1lXSA6IGZpZWxkTmFtZSkpO1xufVxuIl19