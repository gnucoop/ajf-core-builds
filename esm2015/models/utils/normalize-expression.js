/**
 * @fileoverview added by tsickle
 * Generated from: src/core/models/utils/normalize-expression.ts
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
/**
 * @param {?} formula
 * @param {?} ancestorsNames
 * @param {?} prefix
 * @return {?}
 */
export function normalizeExpression(formula, ancestorsNames, prefix) {
    /** @type {?} */
    const ancestorsNameStrings = Object.keys(ancestorsNames);
    /** @type {?} */
    const tokens = tokenize(formula)
        .filter((/**
     * @param {?} token
     * @return {?}
     */
    (token) => token.type == 'Identifier' && token.value != '$value'))
        .map((/**
     * @param {?} token
     * @return {?}
     */
    (token) => token.value));
    tokens.forEach((/**
     * @param {?} t
     * @return {?}
     */
    (t) => {
        if (ancestorsNameStrings.indexOf(t) > -1) {
            formula = formula.replace(new RegExp(`\\b${t}\\b`, 'g'), `${t}__${prefix.slice(ancestorsNames[t]).join('__')}`);
        }
    }));
    return formula;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9ybWFsaXplLWV4cHJlc3Npb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9tb2RlbHMvdXRpbHMvbm9ybWFsaXplLWV4cHJlc3Npb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzQkEsT0FBTyxLQUFLLE9BQU8sTUFBTSxTQUFTLENBQUM7O01BQzdCLFVBQVUsR0FBUSxDQUFDLG1CQUFBLE9BQU8sRUFBTyxDQUFDLENBQUMsT0FBTyxJQUFJLE9BQU87TUFDckQsRUFBQyxRQUFRLEVBQUMsR0FBRyxVQUFVOzs7Ozs7O0FBRTdCLE1BQU0sVUFBVSxtQkFBbUIsQ0FDL0IsT0FBZSxFQUFFLGNBQXdDLEVBQUUsTUFBZ0I7O1VBQ3ZFLG9CQUFvQixHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDOztVQUNsRCxNQUFNLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQztTQUNaLE1BQU07Ozs7SUFBQyxDQUFDLEtBQVUsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxZQUFZLElBQUksS0FBSyxDQUFDLEtBQUssSUFBSSxRQUFRLEVBQUM7U0FDN0UsR0FBRzs7OztJQUFDLENBQUMsS0FBVSxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFDO0lBQ3BELE1BQU0sQ0FBQyxPQUFPOzs7O0lBQUMsQ0FBQyxDQUFNLEVBQUUsRUFBRTtRQUN4QixJQUFJLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtZQUN4QyxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FDckIsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUMsS0FBSyxNQUFNLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDM0Y7SUFDSCxDQUFDLEVBQUMsQ0FBQztJQUNILE9BQU8sT0FBTyxDQUFDO0FBQ2pCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTggR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0ICogYXMgZXNwcmltYSBmcm9tICdlc3ByaW1hJztcbmNvbnN0IGVzcHJpbWFNb2Q6IGFueSA9IChlc3ByaW1hIGFzIGFueSkuZGVmYXVsdCB8fCBlc3ByaW1hO1xuY29uc3Qge3Rva2VuaXplfSA9IGVzcHJpbWFNb2Q7XG5cbmV4cG9ydCBmdW5jdGlvbiBub3JtYWxpemVFeHByZXNzaW9uKFxuICAgIGZvcm11bGE6IHN0cmluZywgYW5jZXN0b3JzTmFtZXM6IHtbcHJvcDogc3RyaW5nXTogbnVtYmVyfSwgcHJlZml4OiBudW1iZXJbXSk6IHN0cmluZyB7XG4gIGNvbnN0IGFuY2VzdG9yc05hbWVTdHJpbmdzID0gT2JqZWN0LmtleXMoYW5jZXN0b3JzTmFtZXMpO1xuICBjb25zdCB0b2tlbnMgPSB0b2tlbml6ZShmb3JtdWxhKVxuICAgICAgICAgICAgICAgICAgICAgLmZpbHRlcigodG9rZW46IGFueSkgPT4gdG9rZW4udHlwZSA9PSAnSWRlbnRpZmllcicgJiYgdG9rZW4udmFsdWUgIT0gJyR2YWx1ZScpXG4gICAgICAgICAgICAgICAgICAgICAubWFwKCh0b2tlbjogYW55KSA9PiB0b2tlbi52YWx1ZSk7XG4gIHRva2Vucy5mb3JFYWNoKCh0OiBhbnkpID0+IHtcbiAgICBpZiAoYW5jZXN0b3JzTmFtZVN0cmluZ3MuaW5kZXhPZih0KSA+IC0xKSB7XG4gICAgICBmb3JtdWxhID0gZm9ybXVsYS5yZXBsYWNlKFxuICAgICAgICAgIG5ldyBSZWdFeHAoYFxcXFxiJHt0fVxcXFxiYCwgJ2cnKSwgYCR7dH1fXyR7cHJlZml4LnNsaWNlKGFuY2VzdG9yc05hbWVzW3RdKS5qb2luKCdfXycpfWApO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBmb3JtdWxhO1xufVxuIl19