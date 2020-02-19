/**
 * @fileoverview added by tsickle
 * Generated from: src/core/models/utils/evaluate-expression.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright (C) 2018 Gnucoop soc. coop.
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZhbHVhdGUtZXhwcmVzc2lvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL21vZGVscy91dGlscy9ldmFsdWF0ZS1leHByZXNzaW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBLE9BQU8sS0FBSyxPQUFPLE1BQU0sU0FBUyxDQUFDOztNQUM3QixVQUFVLEdBQVEsQ0FBQyxtQkFBQSxPQUFPLEVBQU8sQ0FBQyxDQUFDLE9BQU8sSUFBSSxPQUFPO01BQ3JELEVBQUMsUUFBUSxFQUFDLEdBQUcsVUFBVTtBQUc3QixPQUFPLEVBQUMsR0FBRyxFQUFDLE1BQU0sU0FBUyxDQUFDO0FBQzVCLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLG9CQUFvQixDQUFDOztJQUVsRCxXQUFXLEdBQVEsRUFBRTs7Ozs7OztBQUV6QixNQUFNLFVBQVUsa0JBQWtCLENBQzlCLFVBQWtCLEVBQUUsT0FBb0IsRUFBRSxZQUFxQjs7UUFDN0QsT0FBTyxHQUFHLFlBQVksSUFBSSxVQUFVLElBQUksRUFBRTtJQUM5QyxJQUFJLE9BQU8sS0FBSyxFQUFFLEVBQUU7UUFDbEIsT0FBTyxFQUFFLENBQUM7S0FDWDtJQUNELElBQUksT0FBTyxLQUFLLE1BQU0sRUFBRTtRQUN0QixPQUFPLElBQUksQ0FBQztLQUNiO0lBQ0QsSUFBSSxPQUFPLEtBQUssT0FBTyxFQUFFO1FBQ3ZCLE9BQU8sS0FBSyxDQUFDO0tBQ2Q7SUFDRCxJQUFJLE9BQU8sSUFBSSxJQUFJLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLFNBQVMsRUFBRTtRQUNyRCxPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUN6QjtJQUNELElBQUksV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRTtRQUM3QixPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0tBQ3hDOztVQUNLLFdBQVcsR0FDYixRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTTs7OztJQUFDLENBQUMsQ0FBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLFlBQVksRUFBQyxDQUFDLEdBQUc7Ozs7SUFBQyxDQUFDLENBQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBQzs7VUFDcEYsR0FBRyxHQUFVLEVBQUU7SUFDckIsV0FBVyxDQUFDLE9BQU87Ozs7SUFBQyxDQUFDLEdBQVcsRUFBRSxFQUFFOztZQUM5QixHQUFHLEdBQVEsSUFBSTtRQUNuQixJQUFJLE9BQU8sSUFBSSxJQUFJLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLFNBQVMsRUFBRTtZQUNqRCxHQUFHLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3BCO2FBQU0sSUFBSSxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssU0FBUyxFQUFFOztrQkFDaEQsSUFBSSxHQUFHLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7WUFDMUMsR0FBRyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7U0FDZjtRQUNELEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDaEIsQ0FBQyxFQUFDLENBQUM7SUFDSCxXQUFXLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ2hDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFFdEIsSUFBSTtRQUNGLElBQUksR0FBRyxDQUFDLE9BQU8sRUFBRTtZQUNmLEdBQUcsQ0FBQyx3Q0FBd0MsRUFBRSxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDN0Q7O1lBQ0csQ0FBQyxHQUFHLElBQUksUUFBUSxDQUFDLEdBQUcsV0FBVyxFQUFFLFVBQVUsT0FBTyxFQUFFLENBQUM7O2NBQ25ELEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDckIsSUFBSSxHQUFHLENBQUMsT0FBTyxFQUFFO1lBQ2YsR0FBRyxDQUFDLGlDQUFpQyxFQUFFLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQztTQUN0RDtRQUNELENBQUMsR0FBRyxtQkFBSyxJQUFJLEVBQUEsQ0FBQztRQUNkLE9BQU8sR0FBRyxDQUFDO0tBQ1o7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDZixJQUFJLEdBQUcsQ0FBQyxPQUFPLEVBQUU7WUFDZixHQUFHLENBQUMsb0NBQW9DLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUMvRDtRQUNELE9BQU8sS0FBSyxDQUFDO0tBQ2Q7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSAyMDE4IEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCAqIGFzIGVzcHJpbWEgZnJvbSAnZXNwcmltYSc7XG5jb25zdCBlc3ByaW1hTW9kOiBhbnkgPSAoZXNwcmltYSBhcyBhbnkpLmRlZmF1bHQgfHwgZXNwcmltYTtcbmNvbnN0IHt0b2tlbml6ZX0gPSBlc3ByaW1hTW9kO1xuXG5pbXBvcnQge0FqZkNvbnRleHR9IGZyb20gJy4uL2ludGVyZmFjZS9jb250ZXh0JztcbmltcG9ydCB7ZGJnfSBmcm9tICcuL2RlYnVnJztcbmltcG9ydCB7QWpmRXhwcmVzc2lvblV0aWxzfSBmcm9tICcuL2V4cHJlc3Npb24tdXRpbHMnO1xuXG5sZXQgZXhlY0NvbnRleHQ6IGFueSA9IHt9O1xuXG5leHBvcnQgZnVuY3Rpb24gZXZhbHVhdGVFeHByZXNzaW9uKFxuICAgIGV4cHJlc3Npb246IHN0cmluZywgY29udGV4dD86IEFqZkNvbnRleHQsIGZvcmNlRm9ybXVsYT86IHN0cmluZyk6IGFueSB7XG4gIGxldCBmb3JtdWxhID0gZm9yY2VGb3JtdWxhIHx8IGV4cHJlc3Npb24gfHwgJyc7XG4gIGlmIChmb3JtdWxhID09PSAnJykge1xuICAgIHJldHVybiAnJztcbiAgfVxuICBpZiAoZm9ybXVsYSA9PT0gJ3RydWUnKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgaWYgKGZvcm11bGEgPT09ICdmYWxzZScpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKGNvbnRleHQgIT0gbnVsbCAmJiBjb250ZXh0W2Zvcm11bGFdICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gY29udGV4dFtmb3JtdWxhXTtcbiAgfVxuICBpZiAoL15cIlteXCJdKlwiJC8udGVzdChmb3JtdWxhKSkge1xuICAgIHJldHVybiBmb3JtdWxhLnJlcGxhY2UoL15cIit8XCIrJC9nLCAnJyk7XG4gIH1cbiAgY29uc3QgaWRlbnRpZmllcnMgPVxuICAgICAgdG9rZW5pemUoZm9ybXVsYSkuZmlsdGVyKCh0OiBhbnkpID0+IHQudHlwZSA9PT0gJ0lkZW50aWZpZXInKS5tYXAoKHQ6IGFueSkgPT4gdC52YWx1ZSk7XG4gIGNvbnN0IGN0eDogYW55W10gPSBbXTtcbiAgaWRlbnRpZmllcnMuZm9yRWFjaCgoa2V5OiBzdHJpbmcpID0+IHtcbiAgICBsZXQgdmFsOiBhbnkgPSBudWxsO1xuICAgIGlmIChjb250ZXh0ICE9IG51bGwgJiYgY29udGV4dFtrZXldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHZhbCA9IGNvbnRleHRba2V5XTtcbiAgICB9IGVsc2UgaWYgKEFqZkV4cHJlc3Npb25VdGlscy51dGlsc1trZXldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnN0IHV0aWwgPSBBamZFeHByZXNzaW9uVXRpbHMudXRpbHNba2V5XTtcbiAgICAgIHZhbCA9IHV0aWwuZm47XG4gICAgfVxuICAgIGN0eC5wdXNoKHZhbCk7XG4gIH0pO1xuICBpZGVudGlmaWVycy5wdXNoKCdleGVjQ29udGV4dCcpO1xuICBjdHgucHVzaChleGVjQ29udGV4dCk7XG5cbiAgdHJ5IHtcbiAgICBpZiAoZGJnLmVuYWJsZWQpIHtcbiAgICAgIGRiZyhgZXZhbHVhdGluZyBmb3JtdWxhICVzIHVzaW5nIGNvbnRleHQgJWpgLCBmb3JtdWxhLCBjdHgpO1xuICAgIH1cbiAgICBsZXQgZiA9IG5ldyBGdW5jdGlvbiguLi5pZGVudGlmaWVycywgYHJldHVybiAke2Zvcm11bGF9YCk7XG4gICAgY29uc3QgcmVzID0gZiguLi5jdHgpO1xuICAgIGlmIChkYmcuZW5hYmxlZCkge1xuICAgICAgZGJnKGBmb3JtdWxhICVzIGV2YWx1YXRlZDogcmVzdWx0ICVzYCwgZm9ybXVsYSwgcmVzKTtcbiAgICB9XG4gICAgZiA9IDxhbnk+bnVsbDtcbiAgICByZXR1cm4gcmVzO1xuICB9IGNhdGNoIChlKSB7XG4gICAgY29uc29sZS5sb2coZSk7XG4gICAgaWYgKGRiZy5lbmFibGVkKSB7XG4gICAgICBkYmcoYGZvcm11bGEgJXMgbm90IGV2YWx1YXRlZDogZXJyb3IgJWpgLCBmb3JtdWxhLCBlLm1lc3NhZ2UpO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cbiJdfQ==