import * as dateFns from 'date-fns';
import { tokenize } from 'esprima';
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
const MAX_REPS = 30;
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
    COUNTFORMS: { fn: COUNTFORMS },
    COUNTFORMS_UNIQUE: { fn: COUNTFORMS_UNIQUE },
    SUM: { fn: SUM },
    MEAN: { fn: MEAN },
    PERCENT: { fn: PERCENT },
    LAST: { fn: LAST },
    MAX: { fn: MAX },
    MEDIAN: { fn: MEDIAN },
    MODE: { fn: MODE },
};
function evaluateExpression(expression, context, forceFormula) {
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
    const identifiers = tokenize(formula)
        .filter((t) => t.type === 'Identifier')
        .map((t) => t.value);
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
function extractSum(source, properties) {
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
function extractArraySum(source, properties) {
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
function drawThreshold(source, property, threshold) {
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
function extractDates(source, property, fmt) {
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
function lastProperty(source, property) {
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
function sumLastProperties(source, properties) {
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
function calculateTrendProperty(source, property) {
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
function calculateAvgPropertyArray(source, properties, range, coefficient) {
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
function alert(source, property, threshold) {
    source = (source || []).slice(0);
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
 * Counts the collected forms. The form name must be specified. An optional condition can be added
 * to discriminate which forms to count in.
 */
function COUNTFORMS(forms, expression = 'true') {
    forms = (forms || []).slice(0);
    if (expression === 'true') {
        return forms.length;
    }
    if (forms.length === 0) {
        return 0;
    }
    const isInRepeatingSlide = expression.includes(`__`);
    if (isInRepeatingSlide) {
        let count = 0;
        forms.forEach(f => {
            for (let i = 0; i <= MAX_REPS; i++) {
                if (Object.keys(f).filter(key => key.includes(`__${i}`)).length === 0) {
                    break;
                }
                if ((evaluateExpression(expression.replace('__', `__${i}`)), f)) {
                    count++;
                }
            }
        });
        return count;
    }
    else {
        return forms.filter(f => evaluateExpression(expression, f)).length;
    }
}
/**
 * Counts the amount of unique form values for a specific field. The form name must be specified. An
 * optional condition can be added to discriminate which forms to count in
 */
function COUNTFORMS_UNIQUE(forms, fieldName, expression) {
    forms = (forms || []).slice(0);
    const values = [];
    if (expression != null) {
        forms = forms.filter(f => evaluateExpression(expression, f));
    }
    forms.forEach(f => {
        values.push(evaluateExpression(fieldName, f));
    });
    return Array.from(new Set(values)).length;
}
/**
 * Aggregates and sums the values of one or more. An optional condition can be added to discriminate
 * which forms to take for the sum.
 */
function SUM(forms, expression, condition) {
    let acc = 0;
    forms = (forms || []).slice(0);
    if (expression == null) {
        return 0;
    }
    if (condition != null) {
        forms = forms.filter(f => evaluateExpression(condition, f));
    }
    const isInRepeatingSlide = expression.includes(`__`);
    if (isInRepeatingSlide) {
        forms.forEach(f => {
            for (let i = 0; i <= MAX_REPS; i++) {
                if (Object.keys(f).filter(key => key.includes(`__${i}`)).length === 0) {
                    break;
                }
                const evaluatedExpression = evaluateExpression(expression.replace('__', `__${i}`), f);
                if (Number.isFinite(evaluateExpression)) {
                    acc += evaluatedExpression;
                }
            }
        });
    }
    else {
        forms.forEach(f => (acc += evaluateExpression(expression, f)));
    }
    return acc;
}
/**
 * Calculates the mean of a simple or derived value. An optional condition can be added to
 * discriminate which forms to take for the sum.
 */
function MEAN(forms, expression) {
    forms = (forms || []).slice(0);
    expression = expression || '';
    const length = forms.length;
    if (length === 0) {
        return 0;
    }
    let acc = 0;
    forms.forEach(f => {
        acc += evaluateExpression(expression, f);
    });
    return Math.trunc(acc / length);
}
/**
 * Calculates the % between two members.
 */
function PERCENT(value1, value2) {
    const res = +value1 / +value2;
    return Number.isFinite(res) ? `${res}%` : 'err';
}
/**
 * Calculates the expression in the last form by date.
 */
function LAST(forms, expression, date = 'date_end') {
    forms = (forms || []).slice(0).sort((a, b) => {
        const dateA = new Date(b[date]).getTime();
        const dateB = new Date(a[date]).getTime();
        return dateA - dateB;
    });
    if (forms.length > 0 && expression != null) {
        const lastForm = forms[forms.length - 1] || [];
        return evaluateExpression(expression, lastForm);
    }
    return 0;
}
/**
 * Calculates the max value of the field.
 */
function MAX(forms, fieldName) {
    forms = (forms || []).slice(0);
    let max = 0;
    forms.forEach(form => {
        if (form[fieldName] != null &&
            !isNaN(form[fieldName]) &&
            form[fieldName] > max) {
            max = form[fieldName];
        }
    });
    return max;
}
/**
 * Calculates the median value of the field.
 */
function MEDIAN(forms, fieldName) {
    forms = (forms || []).slice(0);
    const numbers = forms
        .filter(f => f[fieldName] != null && !isNaN(f[fieldName]))
        .map(f => f[fieldName])
        .sort((a, b) => a - b)
        .filter((item, pos, self) => self.indexOf(item) == pos);
    return Number.isInteger(numbers.length / 2)
        ? numbers[numbers.length / 2]
        : (numbers[+parseInt(`${numbers.length - 1 / 2}`) / 2] +
            numbers[+parseInt(`${numbers.length - 1 / 2}`) / 2 + 1]) /
            2;
}
/**
 * Calculates the mode value of the field.
 */
function MODE(forms, fieldName) {
    forms = (forms || []).slice(0);
    let maxCount = 0;
    const map = {};
    forms.forEach(f => {
        const value = f[fieldName];
        if (value != null) {
            map[value] = map[value] != null ? map[value] + 1 : 1;
        }
        if (map[value] > maxCount) {
            maxCount = map[value];
        }
    });
    return Object.keys(map)
        .filter(v => map[+v] === maxCount)
        .map(v => +v);
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
    const tokens = tokenize(formula)
        .filter((token) => token.type == 'Identifier' && token.value != '$value')
        .map((token) => token.value);
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

export { AjfConditionSerializer, AjfError, AjfExpressionUtils, AjfFormulaSerializer, COUNTFORMS, COUNTFORMS_UNIQUE, LAST, MAX, MEAN, MEDIAN, MODE, PERCENT, SUM, alert, alwaysCondition, calculateAvgProperty, calculateAvgPropertyArray, calculateTrendByProperties, calculateTrendProperty, createCondition, createFormula, dateOperations, dateUtils, decimalCount, digitCount, drawThreshold, evaluateExpression, extractArray, extractArraySum, extractDates, extractSum, formatDate, formatNumber, getContextString, getCoordinate, isInt, isoMonth, lastProperty, neverCondition, normalizeExpression, notEmpty, round, scanGroupField, sum, sumLastProperties, validateExpression, valueInChoice };
//# sourceMappingURL=models.mjs.map
