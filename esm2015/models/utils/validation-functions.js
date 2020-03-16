/**
 * @fileoverview added by tsickle
 * Generated from: src/core/models/utils/validation-functions.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
import * as dateFns from 'date-fns';
import * as numeral from 'numeral';
/** @type {?} */
const numeralConstructor = ((/** @type {?} */ (numeral))).default || numeral;
/** @type {?} */
export const dateUtils = {
    addDays: dateFns.addDays,
    addMonths: dateFns.addMonths,
    addYears: dateFns.addYears,
    endOfISOWeek: dateFns.endOfISOWeek,
    format: dateFns.format,
    getDay: dateFns.getDay,
    parse: dateFns.parseISO,
    startOfMonth: dateFns.startOfMonth,
    startOfISOWeek: dateFns.startOfISOWeek
};
/**
 * @param {?} x
 * @return {?}
 */
export function digitCount(x) {
    if (isNaN(x) || typeof (x) !== 'number') {
        return 0;
    }
    if (!isFinite(x)) {
        return Infinity;
    }
    return x.toString().replace(/[^0-9]/g, '').length;
}
/**
 * @param {?} x
 * @return {?}
 */
export function decimalCount(x) {
    if (typeof x === 'string') {
        x = parseFloat(x);
    }
    if (typeof x !== 'number' || isNaN(x)) {
        return 0;
    }
    /** @type {?} */
    const parts = x.toString().split('.');
    return parts.length > 1 ? parts[1].length : 0;
}
/**
 * @param {?} x
 * @return {?}
 */
export function isInt(x) {
    if (typeof (x) === 'string') {
        return /^-?\d+$/.test(x);
    }
    if (typeof (x) === 'number') {
        return Math.round(x) === x;
    }
    return false;
}
/**
 * @param {?} x
 * @return {?}
 */
export function notEmpty(x) {
    return (typeof x !== 'undefined' && x !== null ? x.toString().length > 0 : false);
}
/**
 * @param {?} array
 * @param {?} x
 * @return {?}
 */
export function valueInChoice(array, x) {
    return (array || []).indexOf(x) > -1 || array === x;
}
/**
 * @param {?} reps
 * @param {?} acc
 * @param {?} callback
 * @return {?}
 */
export function scanGroupField(reps, acc, callback) {
    for (let i = 0; i < reps; i++) {
        acc = callback(acc, i);
    }
    return acc;
}
/**
 * @param {?} array
 * @return {?}
 */
export function sum(array) {
    return array.reduce((/**
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    (a, b) => a + b), 0);
}
/**
 * @param {?} dString
 * @param {?} period
 * @param {?} operation
 * @param {?} v
 * @return {?}
 */
export function dateOperations(dString, period, operation, v) {
    /** @type {?} */
    const fmt = 'mm/dd/yyyy';
    /** @type {?} */
    let d = (typeof dString !== 'undefined') ? dateUtils.parse(dString) : new Date();
    if (operation == 'remove') {
        v = -v;
    }
    /** @type {?} */
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
 * @param {?} num
 * @param {?} digits
 * @return {?}
 */
export function round(num, digits) {
    digits = digits || 0;
    /** @type {?} */
    let f;
    if (typeof num !== 'number') {
        try {
            f = parseFloat(num);
        }
        catch (e) {
        }
    }
    else {
        f = num;
    }
    if (f == null || isNaN(f)) {
        f = 0;
    }
    /** @type {?} */
    const m = Math.pow(10, digits);
    return Math.round(f * m) / m;
}
/**
 * @param {?} source
 * @param {?} property
 * @param {?=} property2
 * @return {?}
 */
export function extractArray(source, property, property2) {
    source = (source || []).slice(0);
    /** @type {?} */
    const l = source.length;
    /** @type {?} */
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
 * @param {?} source
 * @param {?} properties
 * @return {?}
 */
export function extractSum(source, properties) {
    /** @type {?} */
    let sumVal = 0;
    properties = (properties || []).slice(0);
    /** @type {?} */
    const l = properties.length;
    for (let i = 0; i < l; i++) {
        /** @type {?} */
        const array = extractArray(source, properties[i]);
        /** @type {?} */
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
 * @param {?} source
 * @param {?} properties
 * @return {?}
 */
export function extractArraySum(source, properties) {
    /** @type {?} */
    const arrays = [];
    properties = (properties || []).slice(0);
    for (let i = 0; i < properties.length; i++) {
        /** @type {?} */
        const array = extractArray(source, properties[i]);
        arrays.push(array);
    }
    /** @type {?} */
    const res = [];
    if (arrays.length > 0) {
        for (let weekI = 0; weekI < arrays[0].length; weekI++) {
            /** @type {?} */
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
 * @param {?} source
 * @param {?} property
 * @param {?} threshold
 * @return {?}
 */
export function drawThreshold(source, property, threshold) {
    source = (source || []).slice(0);
    threshold = threshold || [0];
    if (!(threshold instanceof Array)) {
        threshold = [threshold];
    }
    /** @type {?} */
    const l = source.length;
    /** @type {?} */
    const res = [];
    /** @type {?} */
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
 * @param {?} source
 * @param {?} property
 * @param {?} fmt
 * @return {?}
 */
export function extractDates(source, property, fmt) {
    source = (source || []).slice(0);
    /** @type {?} */
    const l = source.length;
    /** @type {?} */
    const res = [];
    /** @type {?} */
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
 * @param {?} source
 * @param {?} property
 * @return {?}
 */
export function lastProperty(source, property) {
    source = (source || []).slice(0);
    /** @type {?} */
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
 * @param {?} source
 * @param {?} properties
 * @return {?}
 */
export function sumLastProperties(source, properties) {
    source = (source || []).slice(0);
    /** @type {?} */
    let sumVal = 0;
    /** @type {?} */
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
 * @param {?} source
 * @param {?} property
 * @return {?}
 */
export function calculateTrendProperty(source, property) {
    source = (source || []).slice(0);
    /** @type {?} */
    let last = source.length - 1;
    while (source[last][property] == null) {
        if (last == 0) {
            break;
        }
        last--;
    }
    /** @type {?} */
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
    /** @type {?} */
    const lastProp = source[last] ? (source[last][property] || 0) : 0;
    /** @type {?} */
    const lastLastProp = source[lastLast] ? (source[lastLast][property] || 0) : 0;
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
 * @param {?} source
 * @param {?} properties
 * @return {?}
 */
export function calculateTrendByProperties(source, properties) {
    /** @type {?} */
    const arraysum = extractArraySum(source, properties);
    /** @type {?} */
    const lastProp = arraysum.length > 0 ? (arraysum[arraysum.length - 1] || 0) : 0;
    /** @type {?} */
    const lastLastProp = arraysum.length > 1 ? (arraysum[arraysum.length - 2] || 0) : lastProp;
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
 * @param {?} source
 * @param {?} property
 * @param {?} range
 * @param {?} coefficient
 * @return {?}
 */
export function calculateAvgProperty(source, property, range, coefficient) {
    source = (source || []).slice(0);
    coefficient = coefficient || 1;
    range = range || 12;
    /** @type {?} */
    let l = source.length;
    /** @type {?} */
    let res = 0;
    /** @type {?} */
    let counter = 0;
    /** @type {?} */
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
/**
 * @param {?} source
 * @param {?} properties
 * @param {?} range
 * @param {?} coefficient
 * @return {?}
 */
export function calculateAvgPropertyArray(source, properties, range, coefficient) {
    source = (source || []).slice(0);
    /** @type {?} */
    const resArr = [];
    if (properties && properties.length > 0) {
        /** @type {?} */
        let avg = 0;
        coefficient = coefficient || 1;
        range = range || 12;
        /** @type {?} */
        const sourceArr = properties.length > 1 ? extractArraySum(source, properties) :
            extractArray(source, properties[0]);
        /** @type {?} */
        let l = sourceArr.length;
        for (let len = l; len > 0; len--) {
            /** @type {?} */
            let res = 0;
            /** @type {?} */
            let counter = 0;
            /** @type {?} */
            let noZero = 0;
            if (len < range) {
                range = len;
            }
            for (let r = 1; r <= range; r++) {
                /** @type {?} */
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
/**
 * @param {?} source
 * @param {?} property
 * @param {?} threshold
 * @return {?}
 */
export function alert(source, property, threshold) {
    source = (source || []).slice(0);
    if (lastProperty(source, property) > threshold) {
        return '<p><i class="material-icons" style="color:red">warning</i></p>';
    }
    else {
        return '<p></p>';
    }
}
/**
 * @param {?} num
 * @param {?=} fmt
 * @return {?}
 */
export function formatNumber(num, fmt) {
    fmt = fmt || '0,0[.]0';
    return numeralConstructor(num).format(fmt);
}
/**
 * @param {?} date
 * @param {?=} fmt
 * @return {?}
 */
export function formatDate(date, fmt) {
    fmt = fmt || 'mm-DD-yyyy';
    return dateUtils.format(typeof date === 'string' ? dateUtils.parse(date) : date, fmt);
}
/**
 * @param {?} date
 * @param {?=} fmt
 * @return {?}
 */
export function isoMonth(date, fmt) {
    fmt = fmt || 'mm';
    /** @type {?} */
    const du = dateUtils;
    return du.format(du.addDays(du.startOfISOWeek(date), 3), fmt);
}
/**
 * @param {?} source
 * @param {?=} zoom
 * @return {?}
 */
export function getCoordinate(source, zoom) {
    zoom = zoom || 6;
    if (source == null) {
        return [51.505, -0.09, zoom];
    }
    else {
        return [source[0], source[1], zoom];
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGlvbi1mdW5jdGlvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9tb2RlbHMvdXRpbHMvdmFsaWRhdGlvbi1mdW5jdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzQkEsT0FBTyxLQUFLLE9BQU8sTUFBTSxVQUFVLENBQUM7QUFDcEMsT0FBTyxLQUFLLE9BQU8sTUFBTSxTQUFTLENBQUM7O01BRTdCLGtCQUFrQixHQUF5QixDQUFDLG1CQUFLLE9BQU8sRUFBQSxDQUFDLENBQUMsT0FBTyxJQUFJLE9BQU87O0FBR2xGLE1BQU0sT0FBTyxTQUFTLEdBQUc7SUFDdkIsT0FBTyxFQUFFLE9BQU8sQ0FBQyxPQUFPO0lBQ3hCLFNBQVMsRUFBRSxPQUFPLENBQUMsU0FBUztJQUM1QixRQUFRLEVBQUUsT0FBTyxDQUFDLFFBQVE7SUFDMUIsWUFBWSxFQUFFLE9BQU8sQ0FBQyxZQUFZO0lBQ2xDLE1BQU0sRUFBRSxPQUFPLENBQUMsTUFBTTtJQUN0QixNQUFNLEVBQUUsT0FBTyxDQUFDLE1BQU07SUFDdEIsS0FBSyxFQUFFLE9BQU8sQ0FBQyxRQUFRO0lBQ3ZCLFlBQVksRUFBRSxPQUFPLENBQUMsWUFBWTtJQUNsQyxjQUFjLEVBQUUsT0FBTyxDQUFDLGNBQWM7Q0FDdkM7Ozs7O0FBRUQsTUFBTSxVQUFVLFVBQVUsQ0FBQyxDQUFTO0lBQ2xDLElBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLE9BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxRQUFRLEVBQUU7UUFDdkMsT0FBTyxDQUFDLENBQUM7S0FDVjtJQUNELElBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUU7UUFDakIsT0FBTyxRQUFRLENBQUM7S0FDakI7SUFDRCxPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLEVBQUUs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TUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztLQUNyQztBQUNILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCAqIGFzIGRhdGVGbnMgZnJvbSAnZGF0ZS1mbnMnO1xuaW1wb3J0ICogYXMgbnVtZXJhbCBmcm9tICdudW1lcmFsJztcblxuY29uc3QgbnVtZXJhbENvbnN0cnVjdG9yOiAodmFsdWU/OiBhbnkpID0+IGFueSA9ICg8YW55Pm51bWVyYWwpLmRlZmF1bHQgfHwgbnVtZXJhbDtcblxuXG5leHBvcnQgY29uc3QgZGF0ZVV0aWxzID0ge1xuICBhZGREYXlzOiBkYXRlRm5zLmFkZERheXMsXG4gIGFkZE1vbnRoczogZGF0ZUZucy5hZGRNb250aHMsXG4gIGFkZFllYXJzOiBkYXRlRm5zLmFkZFllYXJzLFxuICBlbmRPZklTT1dlZWs6IGRhdGVGbnMuZW5kT2ZJU09XZWVrLFxuICBmb3JtYXQ6IGRhdGVGbnMuZm9ybWF0LFxuICBnZXREYXk6IGRhdGVGbnMuZ2V0RGF5LFxuICBwYXJzZTogZGF0ZUZucy5wYXJzZUlTTyxcbiAgc3RhcnRPZk1vbnRoOiBkYXRlRm5zLnN0YXJ0T2ZNb250aCxcbiAgc3RhcnRPZklTT1dlZWs6IGRhdGVGbnMuc3RhcnRPZklTT1dlZWtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBkaWdpdENvdW50KHg6IG51bWJlcik6IG51bWJlciB7XG4gIGlmICggaXNOYU4oeCkgfHwgdHlwZW9mKHgpICE9PSAnbnVtYmVyJykge1xuICAgIHJldHVybiAwO1xuICB9XG4gIGlmICggIWlzRmluaXRlKHgpKSB7XG4gICAgcmV0dXJuIEluZmluaXR5O1xuICB9XG4gIHJldHVybiB4LnRvU3RyaW5nKCkucmVwbGFjZSgvW14wLTldL2csICcnKS5sZW5ndGg7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWNpbWFsQ291bnQoeDogc3RyaW5nfG51bWJlcik6IG51bWJlciB7XG4gIGlmICh0eXBlb2YgeCA9PT0gJ3N0cmluZycpIHtcbiAgICB4ID0gcGFyc2VGbG9hdCh4KTtcbiAgfVxuICBpZiAodHlwZW9mIHggIT09ICdudW1iZXInIHx8IGlzTmFOKHgpKSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cbiAgY29uc3QgcGFydHMgPSB4LnRvU3RyaW5nKCkuc3BsaXQoJy4nKTtcbiAgcmV0dXJuIHBhcnRzLmxlbmd0aCA+IDEgPyBwYXJ0c1sxXS5sZW5ndGggOiAwO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNJbnQoeDogc3RyaW5nfG51bWJlcik6IGJvb2xlYW4ge1xuICBpZiAodHlwZW9mKHgpID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiAvXi0/XFxkKyQvLnRlc3QoeCk7XG4gIH1cbiAgaWYgKHR5cGVvZiAoeCkgPT09ICdudW1iZXInKSB7XG4gICAgcmV0dXJuIE1hdGgucm91bmQoeCkgPT09IHg7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbm90RW1wdHkoeDogYW55KTogYm9vbGVhbiB7XG4gIHJldHVybiAodHlwZW9mIHggIT09ICd1bmRlZmluZWQnICYmIHggIT09IG51bGwgPyB4LnRvU3RyaW5nKCkubGVuZ3RoID4gMCA6IGZhbHNlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHZhbHVlSW5DaG9pY2UoYXJyYXk6IGFueVtdLCB4OiBhbnkpOiBib29sZWFuIHtcbiAgcmV0dXJuIChhcnJheSB8fCBbXSkuaW5kZXhPZih4KSA+IC0xIHx8IGFycmF5ID09PSB4O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2Nhbkdyb3VwRmllbGQocmVwczogbnVtYmVyLCBhY2M6IGFueSwgY2FsbGJhY2s6IGFueSk6IGFueSB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcmVwczsgaSsrKSB7XG4gICAgYWNjID0gY2FsbGJhY2soYWNjLCBpKTtcbiAgfVxuICByZXR1cm4gYWNjO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3VtKGFycmF5OiBhbnlbXSk6IGFueSB7XG4gIHJldHVybiBhcnJheS5yZWR1Y2UoKGEsIGIpID0+IGEgKyBiLCAwKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRhdGVPcGVyYXRpb25zKGRTdHJpbmc6IHN0cmluZywgcGVyaW9kOiBzdHJpbmcsIG9wZXJhdGlvbjogc3RyaW5nLCB2OiBhbnkpOiBzdHJpbmcge1xuICBjb25zdCBmbXQgPSAnbW0vZGQveXl5eSc7XG4gIGxldCBkID0gKHR5cGVvZiBkU3RyaW5nICE9PSAndW5kZWZpbmVkJykgPyBkYXRlVXRpbHMucGFyc2UoZFN0cmluZykgOiBuZXcgRGF0ZSgpO1xuICBpZiAob3BlcmF0aW9uID09ICdyZW1vdmUnKSB7XG4gICAgdiA9IC12O1xuICB9XG4gIGxldCBkYXRlT3A7XG4gIHN3aXRjaCAocGVyaW9kKSB7XG4gICAgY2FzZSAnZGF5JzpcbiAgICAgIGRhdGVPcCA9IGRhdGVVdGlscy5hZGREYXlzO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnbW9udGgnOlxuICAgICAgZGF0ZU9wID0gZGF0ZVV0aWxzLmFkZE1vbnRocztcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3llYXInOlxuICAgICAgZGF0ZU9wID0gZGF0ZVV0aWxzLmFkZFllYXJzO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiAnJztcbiAgfVxuICByZXR1cm4gZGF0ZVV0aWxzLmZvcm1hdChkYXRlT3AoZCwgdiksIGZtdCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByb3VuZChudW06IG51bWJlcnxzdHJpbmcsIGRpZ2l0czogbnVtYmVyKTogbnVtYmVyIHtcbiAgZGlnaXRzID0gZGlnaXRzIHx8IDA7XG4gIGxldCBmO1xuICBpZiAodHlwZW9mIG51bSAhPT0gJ251bWJlcicpIHtcbiAgICB0cnkge1xuICAgICAgZiA9IHBhcnNlRmxvYXQobnVtKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGYgPSBudW07XG4gIH1cbiAgaWYgKGYgPT0gbnVsbCB8fCBpc05hTihmKSkge1xuICAgIGYgPSAwO1xuICB9XG4gIGNvbnN0IG0gPSBNYXRoLnBvdygxMCwgZGlnaXRzKTtcbiAgcmV0dXJuIE1hdGgucm91bmQoZiAqIG0pIC8gbTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGV4dHJhY3RBcnJheShzb3VyY2U6IGFueVtdLCBwcm9wZXJ0eTogc3RyaW5nLCBwcm9wZXJ0eTI/OiBzdHJpbmcpOiBhbnlbXSB7XG4gIHNvdXJjZSA9IChzb3VyY2UgfHwgW10pLnNsaWNlKDApO1xuICBjb25zdCBsID0gc291cmNlLmxlbmd0aDtcbiAgY29uc3QgcmVzOiBhbnlbXSA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGw7IGkrKykge1xuICAgIGlmIChzb3VyY2VbaV1bcHJvcGVydHldICE9IG51bGwgJiYgcHJvcGVydHkyICE9IG51bGwgJiYgc291cmNlW2ldW3Byb3BlcnR5Ml0gIT0gbnVsbCkge1xuICAgICAgcmVzLnB1c2goTnVtYmVyKHNvdXJjZVtpXVtwcm9wZXJ0eV0pICsgTnVtYmVyKHNvdXJjZVtpXVtwcm9wZXJ0eTJdKSk7XG4gICAgfSBlbHNlIGlmIChzb3VyY2VbaV1bcHJvcGVydHldICE9IG51bGwpIHtcbiAgICAgIHJlcy5wdXNoKHNvdXJjZVtpXVtwcm9wZXJ0eV0pO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZXh0cmFjdFN1bShzb3VyY2U6IGFueVtdLCBwcm9wZXJ0aWVzOiBzdHJpbmdbXSk6IG51bWJlciB7XG4gIGxldCBzdW1WYWwgPSAwO1xuICBwcm9wZXJ0aWVzID0gKHByb3BlcnRpZXMgfHwgW10pLnNsaWNlKDApO1xuICBjb25zdCBsID0gcHJvcGVydGllcy5sZW5ndGg7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsOyBpKyspIHtcbiAgICBjb25zdCBhcnJheSA9IGV4dHJhY3RBcnJheShzb3VyY2UsIHByb3BlcnRpZXNbaV0pO1xuICAgIGNvbnN0IGxlbmcgPSBhcnJheS5sZW5ndGg7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBsZW5nOyBqKyspIHtcbiAgICAgIGlmICghaXNOYU4oTnVtYmVyKGFycmF5W2pdKSkpIHtcbiAgICAgICAgc3VtVmFsICs9IE51bWJlcihhcnJheVtqXSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBzdW1WYWw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBleHRyYWN0QXJyYXlTdW0oc291cmNlOiBhbnlbXSwgcHJvcGVydGllczogc3RyaW5nW10pOiBhbnlbXSB7XG4gIGNvbnN0IGFycmF5czogYW55W10gPSBbXTtcbiAgcHJvcGVydGllcyA9IChwcm9wZXJ0aWVzIHx8IFtdKS5zbGljZSgwKTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IHByb3BlcnRpZXMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBhcnJheSA9IGV4dHJhY3RBcnJheShzb3VyY2UsIHByb3BlcnRpZXNbaV0pO1xuICAgIGFycmF5cy5wdXNoKGFycmF5KTtcbiAgfVxuXG4gIGNvbnN0IHJlczogYW55W10gPSBbXTtcbiAgaWYgKGFycmF5cy5sZW5ndGggPiAwKSB7XG4gICAgZm9yIChsZXQgd2Vla0kgPSAwOyB3ZWVrSSA8IGFycmF5c1swXS5sZW5ndGg7IHdlZWtJKyspIHtcbiAgICAgIGxldCBzdW1WYWwgPSAwO1xuICAgICAgZm9yIChsZXQgcHJvcEkgPSAwOyBwcm9wSSA8IHByb3BlcnRpZXMubGVuZ3RoOyBwcm9wSSsrKSB7XG4gICAgICAgIHN1bVZhbCA9IHN1bVZhbCArIE51bWJlcihhcnJheXNbcHJvcEldW3dlZWtJXSk7XG4gICAgICB9XG4gICAgICByZXMucHVzaChzdW1WYWwpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZHJhd1RocmVzaG9sZChzb3VyY2U6IGFueVtdLCBwcm9wZXJ0eTogc3RyaW5nLCB0aHJlc2hvbGQ6IGFueVtdKTogYW55W10ge1xuICBzb3VyY2UgPSAoc291cmNlIHx8IFtdKS5zbGljZSgwKTtcbiAgdGhyZXNob2xkID0gdGhyZXNob2xkIHx8IFswXTtcbiAgaWYgKCEodGhyZXNob2xkIGluc3RhbmNlb2YgQXJyYXkpKSB7XG4gICAgdGhyZXNob2xkID0gW3RocmVzaG9sZF07XG4gIH1cbiAgY29uc3QgbCA9IHNvdXJjZS5sZW5ndGg7XG4gIGNvbnN0IHJlczogYW55W10gPSBbXTtcbiAgbGV0IGNvdW50ID0gMDtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsOyBpKyspIHtcbiAgICBpZiAoc291cmNlW2ldW3Byb3BlcnR5XSAhPSBudWxsKSB7XG4gICAgICBpZiAodGhyZXNob2xkLmxlbmd0aCA+IGNvdW50KSB7XG4gICAgICAgIHJlcy5wdXNoKHRocmVzaG9sZFtjb3VudF0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzLnB1c2godGhyZXNob2xkWzBdKTtcbiAgICAgIH1cbiAgICAgIGNvdW50Kys7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBleHRyYWN0RGF0ZXMoc291cmNlOiBhbnlbXSwgcHJvcGVydHk6IHN0cmluZywgZm10OiBzdHJpbmcpOiBzdHJpbmdbXSB7XG4gIHNvdXJjZSA9IChzb3VyY2UgfHwgW10pLnNsaWNlKDApO1xuICBjb25zdCBsID0gc291cmNlLmxlbmd0aDtcbiAgY29uc3QgcmVzOiBhbnkgPSBbXTtcbiAgbGV0IHByZWZpeCA9ICcnO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGw7IGkrKykge1xuICAgIGlmIChzb3VyY2VbaV1bcHJvcGVydHldICE9IG51bGwpIHtcbiAgICAgIHN3aXRjaCAoZm10KSB7XG4gICAgICAgIGNhc2UgJ1dXJzpcbiAgICAgICAgY2FzZSAnd3cnOlxuICAgICAgICAgIHByZWZpeCA9ICdXJztcbiAgICAgICAgICByZXMucHVzaChwcmVmaXggKyBmb3JtYXREYXRlKHNvdXJjZVtpXVsnZGF0ZV9zdGFydCddLCBmbXQpKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnTU0nOlxuICAgICAgICBjYXNlICdtbSc6XG4gICAgICAgICAgcHJlZml4ID0gJ00nO1xuICAgICAgICAgIHJlcy5wdXNoKHByZWZpeCArIGlzb01vbnRoKHNvdXJjZVtpXVsnZGF0ZV9zdGFydCddLCBmbXQpKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBwcmVmaXggPSAnJztcbiAgICAgICAgICByZXMucHVzaChwcmVmaXggKyBmb3JtYXREYXRlKHNvdXJjZVtpXVsnZGF0ZV9zdGFydCddLCBmbXQpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxhc3RQcm9wZXJ0eShzb3VyY2U6IGFueSwgcHJvcGVydHk6IHN0cmluZyk6IGFueSB7XG4gIHNvdXJjZSA9IChzb3VyY2UgfHwgW10pLnNsaWNlKDApO1xuICBsZXQgbCA9IHNvdXJjZS5sZW5ndGggLSAxO1xuXG4gIHdoaWxlIChsID49IDAgJiYgc291cmNlW2xdW3Byb3BlcnR5XSA9PSBudWxsKSB7XG4gICAgbC0tO1xuICAgIGlmIChsIDwgMCkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbCA+PSAwID8gc291cmNlW2xdW3Byb3BlcnR5XSA6ICcnO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3VtTGFzdFByb3BlcnRpZXMoc291cmNlOiBhbnlbXSwgcHJvcGVydGllczogc3RyaW5nW10pOiBudW1iZXIge1xuICBzb3VyY2UgPSAoc291cmNlIHx8IFtdKS5zbGljZSgwKTtcbiAgbGV0IHN1bVZhbCA9IDA7XG4gIGxldCB2YWwgPSAwO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHByb3BlcnRpZXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YWwgPSBOdW1iZXIobGFzdFByb3BlcnR5KHNvdXJjZSwgcHJvcGVydGllc1tpXSkpO1xuICAgIGlmICghaXNOYU4odmFsKSkge1xuICAgICAgc3VtVmFsICs9IHZhbDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHN1bVZhbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNhbGN1bGF0ZVRyZW5kUHJvcGVydHkoc291cmNlOiBhbnlbXSwgcHJvcGVydHk6IHN0cmluZyk6IHN0cmluZyB7XG4gIHNvdXJjZSA9IChzb3VyY2UgfHwgW10pLnNsaWNlKDApO1xuICBsZXQgbGFzdCA9IHNvdXJjZS5sZW5ndGggLSAxO1xuICB3aGlsZSAoc291cmNlW2xhc3RdW3Byb3BlcnR5XSA9PSBudWxsKSB7XG4gICAgaWYgKGxhc3QgPT0gMCkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGxhc3QtLTtcbiAgfVxuICBsZXQgbGFzdExhc3QgPSBsYXN0IC0gMTtcbiAgaWYgKGxhc3QgPT0gMCkge1xuICAgIGxhc3RMYXN0ID0gbGFzdDtcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc291cmNlW2xhc3RMYXN0XVtwcm9wZXJ0eV0gPT0gbnVsbCkge1xuICAgICAgaWYgKGxhc3RMYXN0ID09IDApIHtcbiAgICAgICAgbGFzdExhc3QgPSBsYXN0O1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGxhc3RMYXN0LS07XG4gICAgfVxuICB9XG5cbiAgY29uc3QgbGFzdFByb3AgPSBzb3VyY2VbbGFzdF0gPyAoc291cmNlW2xhc3RdW3Byb3BlcnR5XSB8fCAwKSA6IDA7XG4gIGNvbnN0IGxhc3RMYXN0UHJvcCA9IHNvdXJjZVtsYXN0TGFzdF0gPyAoc291cmNlW2xhc3RMYXN0XVtwcm9wZXJ0eV0gfHwgMCkgOiAwO1xuXG4gIGlmIChsYXN0UHJvcCA9PSBsYXN0TGFzdFByb3ApIHtcbiAgICByZXR1cm4gJzxwPjxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIiBzdHlsZT1cImNvbG9yOmJsdWVcIj50cmVuZGluZ19mbGF0PC9pPjwvcD4nO1xuICB9IGVsc2UgaWYgKGxhc3RQcm9wID4gbGFzdExhc3RQcm9wKSB7XG4gICAgcmV0dXJuICc8cD48aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCIgc3R5bGU9XCJjb2xvcjpncmVlblwiPnRyZW5kaW5nX3VwPC9pPjwvcD4nO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAnPHA+PGkgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiIHN0eWxlPVwiY29sb3I6cmVkXCI+dHJlbmRpbmdfZG93bjwvaT48L3A+JztcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY2FsY3VsYXRlVHJlbmRCeVByb3BlcnRpZXMoc291cmNlOiBhbnlbXSwgcHJvcGVydGllczogc3RyaW5nW10pOiBzdHJpbmcge1xuICBjb25zdCBhcnJheXN1bSA9IGV4dHJhY3RBcnJheVN1bShzb3VyY2UsIHByb3BlcnRpZXMpO1xuXG4gIGNvbnN0IGxhc3RQcm9wID0gYXJyYXlzdW0ubGVuZ3RoID4gMCA/IChhcnJheXN1bVthcnJheXN1bS5sZW5ndGggLSAxXSB8fCAwKSA6IDA7XG4gIGNvbnN0IGxhc3RMYXN0UHJvcCA9IGFycmF5c3VtLmxlbmd0aCA+IDEgPyAoYXJyYXlzdW1bYXJyYXlzdW0ubGVuZ3RoIC0gMl0gfHwgMCkgOiBsYXN0UHJvcDtcblxuICBpZiAobGFzdFByb3AgPT0gbGFzdExhc3RQcm9wKSB7XG4gICAgcmV0dXJuICc8cD48aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCIgc3R5bGU9XCJjb2xvcjpibHVlXCI+dHJlbmRpbmdfZmxhdDwvaT48L3A+JztcbiAgfSBlbHNlIGlmIChsYXN0UHJvcCA+IGxhc3RMYXN0UHJvcCkge1xuICAgIHJldHVybiAnPHA+PGkgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiIHN0eWxlPVwiY29sb3I6Z3JlZW5cIj50cmVuZGluZ191cDwvaT48L3A+JztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gJzxwPjxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIiBzdHlsZT1cImNvbG9yOnJlZFwiPnRyZW5kaW5nX2Rvd248L2k+PC9wPic7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNhbGN1bGF0ZUF2Z1Byb3BlcnR5KFxuICAgIHNvdXJjZTogYW55W10sIHByb3BlcnR5OiBzdHJpbmcsIHJhbmdlOiBudW1iZXIsIGNvZWZmaWNpZW50OiBudW1iZXIpOiBudW1iZXIge1xuICBzb3VyY2UgPSAoc291cmNlIHx8IFtdKS5zbGljZSgwKTtcblxuICBjb2VmZmljaWVudCA9IGNvZWZmaWNpZW50IHx8IDE7XG4gIHJhbmdlID0gcmFuZ2UgfHwgMTI7XG5cbiAgbGV0IGwgPSBzb3VyY2UubGVuZ3RoO1xuICBsZXQgcmVzID0gMDtcbiAgbGV0IGNvdW50ZXIgPSAwO1xuICBsZXQgbm9aZXJvID0gMDtcblxuICBpZiAobCA8IHJhbmdlKSB7XG4gICAgcmFuZ2UgPSBsO1xuICB9XG5cbiAgd2hpbGUgKHJhbmdlICE9IDApIHtcbiAgICBpZiAoc291cmNlW2wgLSAxXVtwcm9wZXJ0eV0gIT0gbnVsbCkge1xuICAgICAgY291bnRlcisrO1xuICAgICAgcmVzICs9IE51bWJlcihzb3VyY2VbbCAtIDFdW3Byb3BlcnR5XSk7XG5cbiAgICAgIGlmIChzb3VyY2VbbCAtIDFdW3Byb3BlcnR5XSA+IDApIHtcbiAgICAgICAgbm9aZXJvKys7XG4gICAgICB9XG4gICAgfVxuICAgIGwtLTtcbiAgICByYW5nZS0tO1xuICB9XG5cbiAgaWYgKGNvZWZmaWNpZW50ID09IDApIHtcbiAgICByZXR1cm4gbm9aZXJvO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiByb3VuZCgocmVzIC8gY291bnRlcikgKiBjb2VmZmljaWVudCwgMikgfHwgMDtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY2FsY3VsYXRlQXZnUHJvcGVydHlBcnJheShcbiAgICBzb3VyY2U6IGFueVtdLCBwcm9wZXJ0aWVzOiBzdHJpbmdbXSwgcmFuZ2U6IG51bWJlciwgY29lZmZpY2llbnQ6IG51bWJlcik6IG51bWJlcltdIHtcbiAgc291cmNlID0gKHNvdXJjZSB8fCBbXSkuc2xpY2UoMCk7XG4gIGNvbnN0IHJlc0FycjogYW55W10gPSBbXTtcblxuICBpZiAocHJvcGVydGllcyAmJiBwcm9wZXJ0aWVzLmxlbmd0aCA+IDApIHtcbiAgICBsZXQgYXZnID0gMDtcblxuICAgIGNvZWZmaWNpZW50ID0gY29lZmZpY2llbnQgfHwgMTtcbiAgICByYW5nZSA9IHJhbmdlIHx8IDEyO1xuXG4gICAgY29uc3Qgc291cmNlQXJyID0gcHJvcGVydGllcy5sZW5ndGggPiAxID8gZXh0cmFjdEFycmF5U3VtKHNvdXJjZSwgcHJvcGVydGllcykgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4dHJhY3RBcnJheShzb3VyY2UsIHByb3BlcnRpZXNbMF0pO1xuXG4gICAgbGV0IGwgPSBzb3VyY2VBcnIubGVuZ3RoO1xuXG4gICAgZm9yIChsZXQgbGVuID0gbDsgbGVuID4gMDsgbGVuLS0pIHtcbiAgICAgIGxldCByZXMgPSAwO1xuICAgICAgbGV0IGNvdW50ZXIgPSAwO1xuICAgICAgbGV0IG5vWmVybyA9IDA7XG5cbiAgICAgIGlmIChsZW4gPCByYW5nZSkge1xuICAgICAgICByYW5nZSA9IGxlbjtcbiAgICAgIH1cblxuICAgICAgZm9yIChsZXQgciA9IDE7IHIgPD0gcmFuZ2U7IHIrKykge1xuICAgICAgICBsZXQgdmFsID0gc291cmNlQXJyW2xlbiAtIHJdO1xuICAgICAgICBpZiAodmFsICE9IG51bGwpIHtcbiAgICAgICAgICBjb3VudGVyKys7XG4gICAgICAgICAgcmVzICs9IE51bWJlcih2YWwpO1xuICAgICAgICAgIGlmICh2YWwgPiAwKSB7XG4gICAgICAgICAgICBub1plcm8rKztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGNvdW50ZXIgPiAwKSB7XG4gICAgICAgIGlmIChjb2VmZmljaWVudCA9PSAwKSB7XG4gICAgICAgICAgYXZnID0gbm9aZXJvO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGF2ZyA9IChyZXMgLyBjb3VudGVyKSAqIGNvZWZmaWNpZW50IHx8IDA7XG4gICAgICAgIH1cbiAgICAgICAgcmVzQXJyLnB1c2gocm91bmQoYXZnLCAyKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiByZXNBcnIucmV2ZXJzZSgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWxlcnQoc291cmNlOiBhbnlbXSwgcHJvcGVydHk6IHN0cmluZywgdGhyZXNob2xkOiBudW1iZXIpOiBzdHJpbmcge1xuICBzb3VyY2UgPSAoc291cmNlIHx8IFtdKS5zbGljZSgwKTtcblxuICBpZiAobGFzdFByb3BlcnR5KHNvdXJjZSwgcHJvcGVydHkpID4gdGhyZXNob2xkKSB7XG4gICAgcmV0dXJuICc8cD48aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCIgc3R5bGU9XCJjb2xvcjpyZWRcIj53YXJuaW5nPC9pPjwvcD4nO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAnPHA+PC9wPic7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdE51bWJlcihudW06IG51bWJlciwgZm10Pzogc3RyaW5nKTogc3RyaW5nIHtcbiAgZm10ID0gZm10IHx8ICcwLDBbLl0wJztcbiAgcmV0dXJuIG51bWVyYWxDb25zdHJ1Y3RvcihudW0pLmZvcm1hdChmbXQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0RGF0ZShkYXRlOiBEYXRlfHN0cmluZywgZm10Pzogc3RyaW5nKTogc3RyaW5nIHtcbiAgZm10ID0gZm10IHx8ICdtbS1ERC15eXl5JztcbiAgcmV0dXJuIGRhdGVVdGlscy5mb3JtYXQoXG4gICAgdHlwZW9mIGRhdGUgPT09ICdzdHJpbmcnID8gZGF0ZVV0aWxzLnBhcnNlKGRhdGUpIDogZGF0ZSwgZm10KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzb01vbnRoKGRhdGU6IERhdGUsIGZtdD86IHN0cmluZyk6IHN0cmluZyB7XG4gIGZtdCA9IGZtdCB8fCAnbW0nO1xuICBjb25zdCBkdSA9IGRhdGVVdGlscztcbiAgcmV0dXJuIGR1LmZvcm1hdChkdS5hZGREYXlzKGR1LnN0YXJ0T2ZJU09XZWVrKGRhdGUpLCAzKSwgZm10KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldENvb3JkaW5hdGUoc291cmNlOiBhbnksIHpvb20/OiBudW1iZXIpOiBbbnVtYmVyLCBudW1iZXIsIG51bWJlcl0ge1xuICB6b29tID0gem9vbSB8fCA2O1xuICBpZiAoc291cmNlID09IG51bGwpIHtcbiAgICByZXR1cm4gWzUxLjUwNSwgLTAuMDksIHpvb21dO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBbc291cmNlWzBdLCBzb3VyY2VbMV0sIHpvb21dO1xuICB9XG59XG4iXX0=