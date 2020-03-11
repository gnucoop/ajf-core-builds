/**
 * @fileoverview added by tsickle
 * Generated from: src/core/models/utils/evaluate-expression.ts
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
import * as esprima from 'esprima';
/** @type {?} */
const esprimaMod = ((/** @type {?} */ (esprima))).default || esprima;
const { tokenize } = esprimaMod;
import { dbg } from './debug';
import { AjfExpressionUtils } from './expression-utils';
/** @type {?} */
let execContext = {};
/**
 * @param {?} expression
 * @param {?=} context
 * @param {?=} forceFormula
 * @return {?}
 */
export function evaluateExpression(expression, context, forceFormula) {
    /** @type {?} */
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
    /** @type {?} */
    const identifiers = tokenize(formula).filter((/**
     * @param {?} t
     * @return {?}
     */
    (t) => t.type === 'Identifier')).map((/**
     * @param {?} t
     * @return {?}
     */
    (t) => t.value));
    /** @type {?} */
    const ctx = [];
    identifiers.forEach((/**
     * @param {?} key
     * @return {?}
     */
    (key) => {
        /** @type {?} */
        let val = null;
        if (context != null && context[key] !== undefined) {
            val = context[key];
        }
        else if (AjfExpressionUtils.utils[key] !== undefined) {
            /** @type {?} */
            const util = AjfExpressionUtils.utils[key];
            val = util.fn;
        }
        ctx.push(val);
    }));
    identifiers.push('execContext');
    ctx.push(execContext);
    try {
        if (dbg.enabled) {
            dbg(`evaluating formula %s using context %j`, formula, ctx);
        }
        /** @type {?} */
        let f = new Function(...identifiers, `return ${formula}`);
        /** @type {?} */
        const res = f(...ctx);
        if (dbg.enabled) {
            dbg(`formula %s evaluated: result %s`, formula, res);
        }
        f = (/** @type {?} */ (null));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZhbHVhdGUtZXhwcmVzc2lvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL21vZGVscy91dGlscy9ldmFsdWF0ZS1leHByZXNzaW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBLE9BQU8sS0FBSyxPQUFPLE1BQU0sU0FBUyxDQUFDOztNQUM3QixVQUFVLEdBQVEsQ0FBQyxtQkFBQSxPQUFPLEVBQU8sQ0FBQyxDQUFDLE9BQU8sSUFBSSxPQUFPO01BQ3JELEVBQUMsUUFBUSxFQUFDLEdBQUcsVUFBVTtBQUc3QixPQUFPLEVBQUMsR0FBRyxFQUFDLE1BQU0sU0FBUyxDQUFDO0FBQzVCLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLG9CQUFvQixDQUFDOztJQUVsRCxXQUFXLEdBQVEsRUFBRTs7Ozs7OztBQUV6QixNQUFNLFVBQVUsa0JBQWtCLENBQzlCLFVBQWtCLEVBQUUsT0FBb0IsRUFBRSxZQUFxQjs7UUFDN0QsT0FBTyxHQUFHLFlBQVksSUFBSSxVQUFVLElBQUksRUFBRTtJQUM5QyxJQUFJLE9BQU8sS0FBSyxFQUFFLEVBQUU7UUFDbEIsT0FBTyxFQUFFLENBQUM7S0FDWDtJQUNELElBQUksT0FBTyxLQUFLLE1BQU0sRUFBRTtRQUN0QixPQUFPLElBQUksQ0FBQztLQUNiO0lBQ0QsSUFBSSxPQUFPLEtBQUssT0FBTyxFQUFFO1FBQ3ZCLE9BQU8sS0FBSyxDQUFDO0tBQ2Q7SUFDRCxJQUFJLE9BQU8sSUFBSSxJQUFJLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLFNBQVMsRUFBRTtRQUNyRCxPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUN6QjtJQUNELElBQUksV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRTtRQUM3QixPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0tBQ3hDOztVQUNLLFdBQVcsR0FDYixRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTTs7OztJQUFDLENBQUMsQ0FBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLFlBQVksRUFBQyxDQUFDLEdBQUc7Ozs7SUFBQyxDQUFDLENBQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBQzs7VUFDcEYsR0FBRyxHQUFVLEVBQUU7SUFDckIsV0FBVyxDQUFDLE9BQU87Ozs7SUFBQyxDQUFDLEdBQVcsRUFBRSxFQUFFOztZQUM5QixHQUFHLEdBQVEsSUFBSTtRQUNuQixJQUFJLE9BQU8sSUFBSSxJQUFJLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLFNBQVMsRUFBRTtZQUNqRCxHQUFHLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3BCO2FBQU0sSUFBSSxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssU0FBUyxFQUFFOztrQkFDaEQsSUFBSSxHQUFHLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7WUFDMUMsR0FBRyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7U0FDZjtRQUNELEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDaEIsQ0FBQyxFQUFDLENBQUM7SUFDSCxXQUFXLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ2hDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFFdEIsSUFBSTtRQUNGLElBQUksR0FBRyxDQUFDLE9BQU8sRUFBRTtZQUNmLEdBQUcsQ0FBQyx3Q0FBd0MsRUFBRSxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDN0Q7O1lBQ0csQ0FBQyxHQUFHLElBQUksUUFBUSxDQUFDLEdBQUcsV0FBVyxFQUFFLFVBQVUsT0FBTyxFQUFFLENBQUM7O2NBQ25ELEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDckIsSUFBSSxHQUFHLENBQUMsT0FBTyxFQUFFO1lBQ2YsR0FBRyxDQUFDLGlDQUFpQyxFQUFFLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQztTQUN0RDtRQUNELENBQUMsR0FBRyxtQkFBSyxJQUFJLEVBQUEsQ0FBQztRQUNkLE9BQU8sR0FBRyxDQUFDO0tBQ1o7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDZixJQUFJLEdBQUcsQ0FBQyxPQUFPLEVBQUU7WUFDZixHQUFHLENBQUMsb0NBQW9DLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUMvRDtRQUNELE9BQU8sS0FBSyxDQUFDO0tBQ2Q7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQgKiBhcyBlc3ByaW1hIGZyb20gJ2VzcHJpbWEnO1xuY29uc3QgZXNwcmltYU1vZDogYW55ID0gKGVzcHJpbWEgYXMgYW55KS5kZWZhdWx0IHx8IGVzcHJpbWE7XG5jb25zdCB7dG9rZW5pemV9ID0gZXNwcmltYU1vZDtcblxuaW1wb3J0IHtBamZDb250ZXh0fSBmcm9tICcuLi9pbnRlcmZhY2UvY29udGV4dCc7XG5pbXBvcnQge2RiZ30gZnJvbSAnLi9kZWJ1Zyc7XG5pbXBvcnQge0FqZkV4cHJlc3Npb25VdGlsc30gZnJvbSAnLi9leHByZXNzaW9uLXV0aWxzJztcblxubGV0IGV4ZWNDb250ZXh0OiBhbnkgPSB7fTtcblxuZXhwb3J0IGZ1bmN0aW9uIGV2YWx1YXRlRXhwcmVzc2lvbihcbiAgICBleHByZXNzaW9uOiBzdHJpbmcsIGNvbnRleHQ/OiBBamZDb250ZXh0LCBmb3JjZUZvcm11bGE/OiBzdHJpbmcpOiBhbnkge1xuICBsZXQgZm9ybXVsYSA9IGZvcmNlRm9ybXVsYSB8fCBleHByZXNzaW9uIHx8ICcnO1xuICBpZiAoZm9ybXVsYSA9PT0gJycpIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cbiAgaWYgKGZvcm11bGEgPT09ICd0cnVlJykge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGlmIChmb3JtdWxhID09PSAnZmFsc2UnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmIChjb250ZXh0ICE9IG51bGwgJiYgY29udGV4dFtmb3JtdWxhXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIGNvbnRleHRbZm9ybXVsYV07XG4gIH1cbiAgaWYgKC9eXCJbXlwiXSpcIiQvLnRlc3QoZm9ybXVsYSkpIHtcbiAgICByZXR1cm4gZm9ybXVsYS5yZXBsYWNlKC9eXCIrfFwiKyQvZywgJycpO1xuICB9XG4gIGNvbnN0IGlkZW50aWZpZXJzID1cbiAgICAgIHRva2VuaXplKGZvcm11bGEpLmZpbHRlcigodDogYW55KSA9PiB0LnR5cGUgPT09ICdJZGVudGlmaWVyJykubWFwKCh0OiBhbnkpID0+IHQudmFsdWUpO1xuICBjb25zdCBjdHg6IGFueVtdID0gW107XG4gIGlkZW50aWZpZXJzLmZvckVhY2goKGtleTogc3RyaW5nKSA9PiB7XG4gICAgbGV0IHZhbDogYW55ID0gbnVsbDtcbiAgICBpZiAoY29udGV4dCAhPSBudWxsICYmIGNvbnRleHRba2V5XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB2YWwgPSBjb250ZXh0W2tleV07XG4gICAgfSBlbHNlIGlmIChBamZFeHByZXNzaW9uVXRpbHMudXRpbHNba2V5XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb25zdCB1dGlsID0gQWpmRXhwcmVzc2lvblV0aWxzLnV0aWxzW2tleV07XG4gICAgICB2YWwgPSB1dGlsLmZuO1xuICAgIH1cbiAgICBjdHgucHVzaCh2YWwpO1xuICB9KTtcbiAgaWRlbnRpZmllcnMucHVzaCgnZXhlY0NvbnRleHQnKTtcbiAgY3R4LnB1c2goZXhlY0NvbnRleHQpO1xuXG4gIHRyeSB7XG4gICAgaWYgKGRiZy5lbmFibGVkKSB7XG4gICAgICBkYmcoYGV2YWx1YXRpbmcgZm9ybXVsYSAlcyB1c2luZyBjb250ZXh0ICVqYCwgZm9ybXVsYSwgY3R4KTtcbiAgICB9XG4gICAgbGV0IGYgPSBuZXcgRnVuY3Rpb24oLi4uaWRlbnRpZmllcnMsIGByZXR1cm4gJHtmb3JtdWxhfWApO1xuICAgIGNvbnN0IHJlcyA9IGYoLi4uY3R4KTtcbiAgICBpZiAoZGJnLmVuYWJsZWQpIHtcbiAgICAgIGRiZyhgZm9ybXVsYSAlcyBldmFsdWF0ZWQ6IHJlc3VsdCAlc2AsIGZvcm11bGEsIHJlcyk7XG4gICAgfVxuICAgIGYgPSA8YW55Pm51bGw7XG4gICAgcmV0dXJuIHJlcztcbiAgfSBjYXRjaCAoZSkge1xuICAgIGNvbnNvbGUubG9nKGUpO1xuICAgIGlmIChkYmcuZW5hYmxlZCkge1xuICAgICAgZGJnKGBmb3JtdWxhICVzIG5vdCBldmFsdWF0ZWQ6IGVycm9yICVqYCwgZm9ybXVsYSwgZS5tZXNzYWdlKTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG4iXX0=