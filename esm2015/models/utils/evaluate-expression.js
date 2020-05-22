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
import * as esprima from 'esprima';
const esprimaMod = esprima.default || esprima;
const { tokenize } = esprimaMod;
import { dbg } from './debug';
import { AjfExpressionUtils } from './expression-utils';
let execContext = {};
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
    const identifiers = tokenize(formula).filter((t) => t.type === 'Identifier').map((t) => t.value);
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
        if (dbg.enabled) {
            dbg(`evaluating formula %s using context %j`, formula, ctx);
        }
        let f = new Function(...identifiers, `return ${formula}`);
        const res = f(...ctx);
        if (dbg.enabled) {
            dbg(`formula %s evaluated: result %s`, formula, res);
        }
        f = null;
        return res;
    }
    catch (e) {
        console.log(e);
        if (dbg.enabled) {
            dbg(`formula %s not evaluated: error %j`, formula, e.message);
        }
        return false;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZhbHVhdGUtZXhwcmVzc2lvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL21vZGVscy91dGlscy9ldmFsdWF0ZS1leHByZXNzaW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sS0FBSyxPQUFPLE1BQU0sU0FBUyxDQUFDO0FBQ25DLE1BQU0sVUFBVSxHQUFTLE9BQWUsQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDO0FBQzVELE1BQU0sRUFBQyxRQUFRLEVBQUMsR0FBRyxVQUFVLENBQUM7QUFHOUIsT0FBTyxFQUFDLEdBQUcsRUFBQyxNQUFNLFNBQVMsQ0FBQztBQUM1QixPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUV0RCxJQUFJLFdBQVcsR0FBUSxFQUFFLENBQUM7QUFFMUIsTUFBTSxVQUFVLGtCQUFrQixDQUM5QixVQUFrQixFQUFFLE9BQW9CLEVBQUUsWUFBcUI7SUFDakUsSUFBSSxPQUFPLEdBQUcsWUFBWSxJQUFJLFVBQVUsSUFBSSxFQUFFLENBQUM7SUFDL0MsSUFBSSxPQUFPLEtBQUssRUFBRSxFQUFFO1FBQ2xCLE9BQU8sRUFBRSxDQUFDO0tBQ1g7SUFDRCxJQUFJLE9BQU8sS0FBSyxNQUFNLEVBQUU7UUFDdEIsT0FBTyxJQUFJLENBQUM7S0FDYjtJQUNELElBQUksT0FBTyxLQUFLLE9BQU8sRUFBRTtRQUN2QixPQUFPLEtBQUssQ0FBQztLQUNkO0lBQ0QsSUFBSSxPQUFPLElBQUksSUFBSSxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxTQUFTLEVBQUU7UUFDckQsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDekI7SUFDRCxJQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFDN0IsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQztLQUN4QztJQUNELE1BQU0sV0FBVyxHQUNiLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFNLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssWUFBWSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDM0YsTUFBTSxHQUFHLEdBQVUsRUFBRSxDQUFDO0lBQ3RCLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFXLEVBQUUsRUFBRTtRQUNsQyxJQUFJLEdBQUcsR0FBUSxJQUFJLENBQUM7UUFDcEIsSUFBSSxPQUFPLElBQUksSUFBSSxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxTQUFTLEVBQUU7WUFDakQsR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNwQjthQUFNLElBQUksa0JBQWtCLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLFNBQVMsRUFBRTtZQUN0RCxNQUFNLElBQUksR0FBRyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDM0MsR0FBRyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7U0FDZjtRQUNELEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDaEIsQ0FBQyxDQUFDLENBQUM7SUFDSCxXQUFXLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ2hDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFFdEIsSUFBSTtRQUNGLElBQUksR0FBRyxDQUFDLE9BQU8sRUFBRTtZQUNmLEdBQUcsQ0FBQyx3Q0FBd0MsRUFBRSxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDN0Q7UUFDRCxJQUFJLENBQUMsR0FBRyxJQUFJLFFBQVEsQ0FBQyxHQUFHLFdBQVcsRUFBRSxVQUFVLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFDMUQsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDdEIsSUFBSSxHQUFHLENBQUMsT0FBTyxFQUFFO1lBQ2YsR0FBRyxDQUFDLGlDQUFpQyxFQUFFLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQztTQUN0RDtRQUNELENBQUMsR0FBUSxJQUFJLENBQUM7UUFDZCxPQUFPLEdBQUcsQ0FBQztLQUNaO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDVixPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2YsSUFBSSxHQUFHLENBQUMsT0FBTyxFQUFFO1lBQ2YsR0FBRyxDQUFDLG9DQUFvQyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDL0Q7UUFDRCxPQUFPLEtBQUssQ0FBQztLQUNkO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0ICogYXMgZXNwcmltYSBmcm9tICdlc3ByaW1hJztcbmNvbnN0IGVzcHJpbWFNb2Q6IGFueSA9IChlc3ByaW1hIGFzIGFueSkuZGVmYXVsdCB8fCBlc3ByaW1hO1xuY29uc3Qge3Rva2VuaXplfSA9IGVzcHJpbWFNb2Q7XG5cbmltcG9ydCB7QWpmQ29udGV4dH0gZnJvbSAnLi4vaW50ZXJmYWNlL2NvbnRleHQnO1xuaW1wb3J0IHtkYmd9IGZyb20gJy4vZGVidWcnO1xuaW1wb3J0IHtBamZFeHByZXNzaW9uVXRpbHN9IGZyb20gJy4vZXhwcmVzc2lvbi11dGlscyc7XG5cbmxldCBleGVjQ29udGV4dDogYW55ID0ge307XG5cbmV4cG9ydCBmdW5jdGlvbiBldmFsdWF0ZUV4cHJlc3Npb24oXG4gICAgZXhwcmVzc2lvbjogc3RyaW5nLCBjb250ZXh0PzogQWpmQ29udGV4dCwgZm9yY2VGb3JtdWxhPzogc3RyaW5nKTogYW55IHtcbiAgbGV0IGZvcm11bGEgPSBmb3JjZUZvcm11bGEgfHwgZXhwcmVzc2lvbiB8fCAnJztcbiAgaWYgKGZvcm11bGEgPT09ICcnKSB7XG4gICAgcmV0dXJuICcnO1xuICB9XG4gIGlmIChmb3JtdWxhID09PSAndHJ1ZScpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBpZiAoZm9ybXVsYSA9PT0gJ2ZhbHNlJykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpZiAoY29udGV4dCAhPSBudWxsICYmIGNvbnRleHRbZm9ybXVsYV0gIT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBjb250ZXh0W2Zvcm11bGFdO1xuICB9XG4gIGlmICgvXlwiW15cIl0qXCIkLy50ZXN0KGZvcm11bGEpKSB7XG4gICAgcmV0dXJuIGZvcm11bGEucmVwbGFjZSgvXlwiK3xcIiskL2csICcnKTtcbiAgfVxuICBjb25zdCBpZGVudGlmaWVycyA9XG4gICAgICB0b2tlbml6ZShmb3JtdWxhKS5maWx0ZXIoKHQ6IGFueSkgPT4gdC50eXBlID09PSAnSWRlbnRpZmllcicpLm1hcCgodDogYW55KSA9PiB0LnZhbHVlKTtcbiAgY29uc3QgY3R4OiBhbnlbXSA9IFtdO1xuICBpZGVudGlmaWVycy5mb3JFYWNoKChrZXk6IHN0cmluZykgPT4ge1xuICAgIGxldCB2YWw6IGFueSA9IG51bGw7XG4gICAgaWYgKGNvbnRleHQgIT0gbnVsbCAmJiBjb250ZXh0W2tleV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgdmFsID0gY29udGV4dFtrZXldO1xuICAgIH0gZWxzZSBpZiAoQWpmRXhwcmVzc2lvblV0aWxzLnV0aWxzW2tleV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgY29uc3QgdXRpbCA9IEFqZkV4cHJlc3Npb25VdGlscy51dGlsc1trZXldO1xuICAgICAgdmFsID0gdXRpbC5mbjtcbiAgICB9XG4gICAgY3R4LnB1c2godmFsKTtcbiAgfSk7XG4gIGlkZW50aWZpZXJzLnB1c2goJ2V4ZWNDb250ZXh0Jyk7XG4gIGN0eC5wdXNoKGV4ZWNDb250ZXh0KTtcblxuICB0cnkge1xuICAgIGlmIChkYmcuZW5hYmxlZCkge1xuICAgICAgZGJnKGBldmFsdWF0aW5nIGZvcm11bGEgJXMgdXNpbmcgY29udGV4dCAlamAsIGZvcm11bGEsIGN0eCk7XG4gICAgfVxuICAgIGxldCBmID0gbmV3IEZ1bmN0aW9uKC4uLmlkZW50aWZpZXJzLCBgcmV0dXJuICR7Zm9ybXVsYX1gKTtcbiAgICBjb25zdCByZXMgPSBmKC4uLmN0eCk7XG4gICAgaWYgKGRiZy5lbmFibGVkKSB7XG4gICAgICBkYmcoYGZvcm11bGEgJXMgZXZhbHVhdGVkOiByZXN1bHQgJXNgLCBmb3JtdWxhLCByZXMpO1xuICAgIH1cbiAgICBmID0gPGFueT5udWxsO1xuICAgIHJldHVybiByZXM7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBjb25zb2xlLmxvZyhlKTtcbiAgICBpZiAoZGJnLmVuYWJsZWQpIHtcbiAgICAgIGRiZyhgZm9ybXVsYSAlcyBub3QgZXZhbHVhdGVkOiBlcnJvciAlamAsIGZvcm11bGEsIGUubWVzc2FnZSk7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuIl19