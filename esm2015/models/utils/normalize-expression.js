/**
 * @fileoverview added by tsickle
 * Generated from: src/core/models/utils/normalize-expression.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9ybWFsaXplLWV4cHJlc3Npb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9tb2RlbHMvdXRpbHMvbm9ybWFsaXplLWV4cHJlc3Npb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzQkEsT0FBTyxLQUFLLE9BQU8sTUFBTSxTQUFTLENBQUM7O01BQzdCLFVBQVUsR0FBUSxDQUFDLG1CQUFBLE9BQU8sRUFBTyxDQUFDLENBQUMsT0FBTyxJQUFJLE9BQU87TUFDckQsRUFBQyxRQUFRLEVBQUMsR0FBRyxVQUFVOzs7Ozs7O0FBRTdCLE1BQU0sVUFBVSxtQkFBbUIsQ0FDL0IsT0FBZSxFQUFFLGNBQXdDLEVBQUUsTUFBZ0I7O1VBQ3ZFLG9CQUFvQixHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDOztVQUNsRCxNQUFNLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQztTQUNaLE1BQU07Ozs7SUFBQyxDQUFDLEtBQVUsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxZQUFZLElBQUksS0FBSyxDQUFDLEtBQUssSUFBSSxRQUFRLEVBQUM7U0FDN0UsR0FBRzs7OztJQUFDLENBQUMsS0FBVSxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFDO0lBQ3BELE1BQU0sQ0FBQyxPQUFPOzs7O0lBQUMsQ0FBQyxDQUFNLEVBQUUsRUFBRTtRQUN4QixJQUFJLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtZQUN4QyxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FDckIsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUMsS0FBSyxNQUFNLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDM0Y7SUFDSCxDQUFDLEVBQUMsQ0FBQztJQUNILE9BQU8sT0FBTyxDQUFDO0FBQ2pCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCAqIGFzIGVzcHJpbWEgZnJvbSAnZXNwcmltYSc7XG5jb25zdCBlc3ByaW1hTW9kOiBhbnkgPSAoZXNwcmltYSBhcyBhbnkpLmRlZmF1bHQgfHwgZXNwcmltYTtcbmNvbnN0IHt0b2tlbml6ZX0gPSBlc3ByaW1hTW9kO1xuXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplRXhwcmVzc2lvbihcbiAgICBmb3JtdWxhOiBzdHJpbmcsIGFuY2VzdG9yc05hbWVzOiB7W3Byb3A6IHN0cmluZ106IG51bWJlcn0sIHByZWZpeDogbnVtYmVyW10pOiBzdHJpbmcge1xuICBjb25zdCBhbmNlc3RvcnNOYW1lU3RyaW5ncyA9IE9iamVjdC5rZXlzKGFuY2VzdG9yc05hbWVzKTtcbiAgY29uc3QgdG9rZW5zID0gdG9rZW5pemUoZm9ybXVsYSlcbiAgICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoKHRva2VuOiBhbnkpID0+IHRva2VuLnR5cGUgPT0gJ0lkZW50aWZpZXInICYmIHRva2VuLnZhbHVlICE9ICckdmFsdWUnKVxuICAgICAgICAgICAgICAgICAgICAgLm1hcCgodG9rZW46IGFueSkgPT4gdG9rZW4udmFsdWUpO1xuICB0b2tlbnMuZm9yRWFjaCgodDogYW55KSA9PiB7XG4gICAgaWYgKGFuY2VzdG9yc05hbWVTdHJpbmdzLmluZGV4T2YodCkgPiAtMSkge1xuICAgICAgZm9ybXVsYSA9IGZvcm11bGEucmVwbGFjZShcbiAgICAgICAgICBuZXcgUmVnRXhwKGBcXFxcYiR7dH1cXFxcYmAsICdnJyksIGAke3R9X18ke3ByZWZpeC5zbGljZShhbmNlc3RvcnNOYW1lc1t0XSkuam9pbignX18nKX1gKTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gZm9ybXVsYTtcbn1cbiJdfQ==