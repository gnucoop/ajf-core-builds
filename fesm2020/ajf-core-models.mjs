import * as dateFns from 'date-fns';
import { parseScript } from 'meriyah';
import * as numbroMod from 'numbro';

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
class AjfError extends Error {
    /**
     * this constructor will init the message error
     */
    constructor(message) {
        super(message);
        this.stack = '';
        // Set the prototype explicitly. Workaround needed in TS >= 2.1 when extending built-ins
        // See: https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md
        Object.setPrototypeOf(this, AjfError.prototype);
        this._message = message || '';
    }
    get name() {
        return 'AjfError';
    }
    get message() {
        return this._message;
    }
}

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
/**
 * It Creates an AjfCondition by conditio.
 * If condition.condition is not defined will be assigned ''.
 */
function createCondition(condition = {}) {
    return { condition: condition.condition || '' };
}

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
class AjfConditionSerializer {
    static fromJson(json) {
        return createCondition(json);
    }
}

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
/**
 * It Creates an AjfFormula.
 * If formula.formula is not defined will be assigned ''.
 */
function createFormula(formula = {}) {
    return { formula: formula.formula || '' };
}

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
class AjfFormulaSerializer {
    static fromJson(json) {
        return createFormula(json);
    }
}

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
/**
 * It creates a true AjfCondidion.
 */
function alwaysCondition() {
    return createCondition({ condition: 'true' });
}

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
const getCodeIdentifiers = (source, includeDollarValue = false) => {
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
const dateUtils = {
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
class AjfExpressionUtils {
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
function evaluateExpression(expression, context) {
    return createFunction(expression)(context);
}
function createFunction(expression) {
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
function digitCount(x) {
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
function decimalCount(x) {
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
function isInt(x) {
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
function notEmpty(x) {
    return typeof x !== 'undefined' && x !== null ? x.toString().length > 0 : false;
}
/**
 * It is true if array contains x or array is equal to x.
 */
function valueInChoice(array, x) {
    return (array || []).indexOf(x) > -1 || array === x;
}
/**
 * It applies callback for reps times and accumulate the result in acc.
 */
function scanGroupField(reps, acc, callback) {
    for (let i = 0; i < reps; i++) {
        acc = callback(acc, i);
    }
    return acc;
}
/**
 * It returns the sum of the array values.
 */
function sum(array) {
    return array.reduce((a, b) => a + b, 0);
}
/**
 * It applies add/remove(operation) v (day/month/year)period to dstring and return new format date.
 */
// TODO check if deprecated instead refacotoring parameter type
// TODO (dString: string|null, period:'day'|'month'|'year',
// TODO operation: 'add/remove' = 'add', v:number)
function dateOperations(dString, period, operation, v) {
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
function round(num, digits) {
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
function extractArray(source, property, property2) {
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
function extractSum(source, properties) {
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
function extractArraySum(source, properties) {
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
function drawThreshold(source, property, threshold) {
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
function extractDates(source, property, fmt) {
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
function lastProperty(source, property) {
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
function sumLastProperties(source, properties) {
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
function calculateTrendProperty(source, property) {
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
function calculateTrendByProperties(source, properties) {
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
function calculateAvgProperty(source, property, range, coefficient) {
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
function calculateAvgPropertyArray(source, properties, range, coefficient) {
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
function alert(source, property, threshold) {
    source = [...(source || [])];
    if (lastProperty(source, property) > threshold) {
        return '<p><i class="material-icons" style="color:red">warning</i></p>';
    }
    else {
        return '<p></p>';
    }
}
function formatNumber(num, fmt) {
    fmt = fmt || '0,0[.]0';
    return numbro(num).format(fmt);
}
function formatDate(date, fmt) {
    fmt = fmt || 'mm-DD-yyyy';
    return dateUtils.format(typeof date === 'string' ? dateUtils.parse(date) : date, fmt);
}
function isoMonth(date, fmt) {
    fmt = fmt || 'mm';
    const du = dateUtils;
    return du.format(du.addDays(du.startOfISOWeek(date), 3), fmt);
}
function getCoordinate(source, zoom) {
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
function ALL_VALUES_OF(forms, field, filter = 'true') {
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
function plainArray(params) {
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
function COUNT_FORMS(forms, filter = 'true') {
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
function COUNT_REPS(forms, filter = 'true') {
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
function COUNT_FORMS_UNIQUE(forms, field, filter = 'true') {
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
function SUM(forms, field, filter = 'true') {
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
function MEAN(forms, field, filter = 'true') {
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
function PERCENT(value1, value2) {
    const res = (+value1 * 100) / +value2;
    return Number.isFinite(res) ? Math.round(res) + '%' : 'infinite';
}
/**
 * Evaluates the expression in the first form by date.
 */
function FIRST(forms, expression, date = 'created_at') {
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
function LAST(forms, expression, date = 'created_at') {
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
function MAX(forms, field, filter = 'true') {
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
function MEDIAN(forms, field, filter = 'true') {
    const values = getNumericValues(forms, field, filter).sort();
    if (values.length === 0) {
        return NaN;
    }
    return values[Math.floor(values.length / 2)];
}
/**
 * Computes the mode value of the field.
 */
function MODE(forms, field, filter = 'true') {
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
function buildDataset(dataset, colspans) {
    return buildAlignedDataset(dataset, colspans, []);
}
/**
 * Build a dataset for ajf dynamic table
 * @param dataset the dataset for the table
 * @param colspans colspan for each value in the dataset
 * @param textAlign alignment for each value in the dataset
 * @returns An AjfTableCell list
 */
function buildAlignedDataset(dataset, colspans, textAlign) {
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
function buildFormDataset(dataset, fields, rowLink, _backgroundColorA, _backgroundColorB) {
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
function buildAlignedFormDataset(dataset, fields, colspans, textAlign, rowLink, dialogFields, dialogLabelFields) {
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
function buildWidgetDataset(dataset, fields, rowLink, cellStyles, rowStyle, percWidth, backgroundColorA, backgroundColorB) {
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
function buildWidgetDatasetWithDialog(dataset, fields, dialogFields, dialogLabelFields, cellStyles, rowStyle, percWidth, backgroundColorA, backgroundColorB) {
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
function REPEAT(forms, array, fn, arg1, arg2 = 'true') {
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
function MAP(array, func) {
    return array.map(func);
}
/**
 * For each form in forms, the specified field is set with the value given by expression.
 * The form's fields can be used inside expression.
 */
function APPLY(forms, field, expression) {
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
function ROUND(num, digits) {
    return round(num, digits);
}
/**
 * Deprecated. Use IF
 */
function EVALUATE(condition, branch1, branch2) {
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
function INCLUDES(arr, elem) {
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
function BUILD_DATASET(forms, schema) {
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
function APPLY_LABELS(formList, schema, fieldNames) {
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
function FILTER_BY_VARS(formList, expression) {
    return FILTER_BY(formList, expression);
}
/**
 * Returns a copy of forms and its repetitions, keeping only the ones for which expression evaluates to true.
 */
function FILTER_BY(forms, expression) {
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
function TODAY(format = 'yyyy-MM-dd') {
    return dateFns.format(new Date(), format);
}
/**
 * Logs val to the console.
 *
 * @export
 * @param {*} val
 */
function CONSOLE_LOG(val) {
    console.log(val);
}
/**
 * Computes the current age in years, given the date of birth.
 *
 * @export
 * @param {(string | null)} dob
 * @return {*}  {number}
 */
function GET_AGE(dob) {
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
function LEN(dataset) {
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
function CONCAT(a, b) {
    return a.concat(b);
}
/**
 * Removes duplicate elements from an array.
 *
 * @export
 * @param {any[]} arr
 * @return {*}  {any[]}
 */
function REMOVE_DUPLICATES(arr) {
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
function IS_BEFORE(date, dateToCompare) {
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
function IS_AFTER(date, dateToCompare) {
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
function IS_WITHIN_INTERVAL(date, dateStart, dateEnd) {
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
function COMPARE_DATE(date, dateStart, dateEnd, labels) {
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
function JOIN_FORMS(formsA, formsB, keyA, keyB) {
    return JOIN_REPEATING_SLIDES(formsA, formsB, keyA, keyB, null);
}
/**
 * Performs a left join of formsA and formsB, like JOIN_FORMS.
 * In addition, for each matching pair of formA and formB, their repeating slides are also joined.
 */
function JOIN_REPEATING_SLIDES(formsA, formsB, keyA, keyB, subkeyA, subkeyB) {
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
function FROM_REPS(form, expression) {
    if (typeof (expression) === 'string') {
        expression = createFunction(expression);
    }
    return allReps(form || {}).map(rep => expression({ ...form, ...rep }));
}
/**
 * Deprecated. Use INCLUDES
 */
function ISIN(dataset, value) {
    if (dataset == null || value == null) {
        return false;
    }
    return dataset.indexOf(value) >= 0;
}
/**
 * Applies the operator to every pair of elements (arrayA[i], arrayB[i]),
 * returning the array of results.
 */
function OP(arrayA, arrayB, operator) {
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
function GET_LABELS(schema, values) {
    const choiceLabels = extractLabelsBySchemaChoices(schema);
    return values.map(val => choiceLabels[val] != null ? choiceLabels[val] : val);
}

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
function getContextString(context) {
    let fstr = AjfExpressionUtils.UTIL_FUNCTIONS;
    if (context instanceof Array) {
        for (let i = 0; i < context.length; i++) {
            fstr = `${fstr}var ${context[i]} = true;`;
        }
    }
    else if (context != null) {
        Object.keys(context).forEach(x => {
            let val = context[x];
            if (val == null || isNaN(Number(val)) || val === '' || val instanceof Array) {
                if (val instanceof Array) {
                    for (let i = 0; i < val.length; i++) {
                        val[i] =
                            ((val == null || isNaN(Number(val[i])) || val[i] === '') && val[i]) || Number(val[i]);
                    }
                }
                val = JSON.stringify(val);
            }
            else {
                val = Number(val);
            }
            fstr = `${fstr}var ${x} = ${val}; `;
        });
    }
    return fstr;
}

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
/**
 * It creates a false AjfCondidion.
 */
function neverCondition() {
    return createCondition({ condition: 'false' });
}

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
function normalizeExpression(formula, ancestorsNames, prefix) {
    const ancestorsNameStrings = Object.keys(ancestorsNames);
    const tokens = getCodeIdentifiers(formula);
    tokens.forEach((t) => {
        if (ancestorsNameStrings.indexOf(t) > -1) {
            formula = formula.replace(new RegExp(`\\b${t}\\b`, 'g'), `${t}__${prefix.slice(ancestorsNames[t]).join('__')}`);
        }
    });
    return formula;
}

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
let cachedContext = {};
let cachedContextString = '{}';
function validateExpression(str, context) {
    if (context === cachedContext) {
        console.log('cache hit');
    }
    else {
        cachedContext = context;
        cachedContextString = getContextString(context);
    }
    let ctx = cachedContextString;
    try {
        let f = new Function(`${ctx}${str}`);
        f();
        f = null;
        return true;
    }
    catch (e) {
        return false;
    }
}

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

/**
 * Generated bundle index. Do not edit.
 */

export { ALL_VALUES_OF, APPLY, APPLY_LABELS, AjfConditionSerializer, AjfError, AjfExpressionUtils, AjfFormulaSerializer, BUILD_DATASET, COMPARE_DATE, CONCAT, CONSOLE_LOG, COUNT_FORMS, COUNT_FORMS_UNIQUE, COUNT_REPS, EVALUATE, FILTER_BY, FILTER_BY_VARS, FIRST, FROM_REPS, GET_AGE, GET_LABELS, INCLUDES, ISIN, IS_AFTER, IS_BEFORE, IS_WITHIN_INTERVAL, JOIN_FORMS, JOIN_REPEATING_SLIDES, LAST, LEN, MAP, MAX, MEAN, MEDIAN, MODE, OP, PERCENT, REMOVE_DUPLICATES, REPEAT, ROUND, SUM, TODAY, alert, alwaysCondition, buildAlignedDataset, buildAlignedFormDataset, buildDataset, buildFormDataset, buildWidgetDataset, buildWidgetDatasetWithDialog, calculateAvgProperty, calculateAvgPropertyArray, calculateTrendByProperties, calculateTrendProperty, createCondition, createFormula, createFunction, dateOperations, dateUtils, decimalCount, digitCount, drawThreshold, evaluateExpression, extractArray, extractArraySum, extractDates, extractSum, formatDate, formatNumber, getCodeIdentifiers, getContextString, getCoordinate, isInt, isoMonth, lastProperty, neverCondition, normalizeExpression, notEmpty, plainArray, round, scanGroupField, sum, sumLastProperties, validateExpression, valueInChoice };
//# sourceMappingURL=ajf-core-models.mjs.map
