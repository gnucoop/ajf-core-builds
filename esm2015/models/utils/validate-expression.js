/**
 * @fileoverview added by tsickle
 * Generated from: src/core/models/utils/validate-expression.ts
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
import { dbg } from './debug';
import { getContextString } from './get-context-string';
/** @type {?} */
let cachedContext = {};
/** @type {?} */
let cachedContextString = '{}';
/**
 * @param {?} str
 * @param {?=} context
 * @return {?}
 */
export function validateExpression(str, context) {
    if (context === cachedContext) {
        console.log('cache hit');
    }
    else {
        cachedContext = context;
        cachedContextString = getContextString(context);
    }
    /** @type {?} */
    let ctx = cachedContextString;
    try {
        /** @type {?} */
        let f = new Function(`${ctx}${str}`);
        dbg((/** @type {?} */ (`validating formula %s using context %j`)), str, ctx);
        f();
        dbg(`formula %s validated`, str);
        f = (/** @type {?} */ (null));
        return true;
    }
    catch (e) {
        dbg(`formula %s not validated: error %j`, str, e);
        return false;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGUtZXhwcmVzc2lvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL21vZGVscy91dGlscy92YWxpZGF0ZS1leHByZXNzaW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBdUJBLE9BQU8sRUFBQyxHQUFHLEVBQUMsTUFBTSxTQUFTLENBQUM7QUFDNUIsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7O0lBRWxELGFBQWEsR0FBUSxFQUFFOztJQUN2QixtQkFBbUIsR0FBRyxJQUFJOzs7Ozs7QUFFOUIsTUFBTSxVQUFVLGtCQUFrQixDQUFDLEdBQVcsRUFBRSxPQUFvQjtJQUNsRSxJQUFJLE9BQU8sS0FBSyxhQUFhLEVBQUU7UUFDN0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztLQUMxQjtTQUFNO1FBQ0wsYUFBYSxHQUFHLE9BQU8sQ0FBQztRQUN4QixtQkFBbUIsR0FBRyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUNqRDs7UUFDRyxHQUFHLEdBQUcsbUJBQW1CO0lBQzdCLElBQUk7O1lBQ0UsQ0FBQyxHQUFHLElBQUksUUFBUSxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBQ3BDLEdBQUcsQ0FBQyxtQkFBSyx3Q0FBd0MsRUFBQSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUM3RCxDQUFDLEVBQUUsQ0FBQztRQUNKLEdBQUcsQ0FBQyxzQkFBc0IsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNqQyxDQUFDLEdBQUcsbUJBQUssSUFBSSxFQUFBLENBQUM7UUFDZCxPQUFPLElBQUksQ0FBQztLQUNiO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDVixHQUFHLENBQUMsb0NBQW9DLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2xELE9BQU8sS0FBSyxDQUFDO0tBQ2Q7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSAyMDE4IEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmQ29udGV4dH0gZnJvbSAnLi4vaW50ZXJmYWNlL2NvbnRleHQnO1xuaW1wb3J0IHtkYmd9IGZyb20gJy4vZGVidWcnO1xuaW1wb3J0IHtnZXRDb250ZXh0U3RyaW5nfSBmcm9tICcuL2dldC1jb250ZXh0LXN0cmluZyc7XG5cbmxldCBjYWNoZWRDb250ZXh0OiBhbnkgPSB7fTtcbmxldCBjYWNoZWRDb250ZXh0U3RyaW5nID0gJ3t9JztcblxuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlRXhwcmVzc2lvbihzdHI6IHN0cmluZywgY29udGV4dD86IEFqZkNvbnRleHQpOiBib29sZWFuIHtcbiAgaWYgKGNvbnRleHQgPT09IGNhY2hlZENvbnRleHQpIHtcbiAgICBjb25zb2xlLmxvZygnY2FjaGUgaGl0Jyk7XG4gIH0gZWxzZSB7XG4gICAgY2FjaGVkQ29udGV4dCA9IGNvbnRleHQ7XG4gICAgY2FjaGVkQ29udGV4dFN0cmluZyA9IGdldENvbnRleHRTdHJpbmcoY29udGV4dCk7XG4gIH1cbiAgbGV0IGN0eCA9IGNhY2hlZENvbnRleHRTdHJpbmc7XG4gIHRyeSB7XG4gICAgbGV0IGYgPSBuZXcgRnVuY3Rpb24oYCR7Y3R4fSR7c3RyfWApO1xuICAgIGRiZyg8YW55PmB2YWxpZGF0aW5nIGZvcm11bGEgJXMgdXNpbmcgY29udGV4dCAlamAsIHN0ciwgY3R4KTtcbiAgICBmKCk7XG4gICAgZGJnKGBmb3JtdWxhICVzIHZhbGlkYXRlZGAsIHN0cik7XG4gICAgZiA9IDxhbnk+bnVsbDtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGRiZyhgZm9ybXVsYSAlcyBub3QgdmFsaWRhdGVkOiBlcnJvciAlamAsIHN0ciwgZSk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG4iXX0=