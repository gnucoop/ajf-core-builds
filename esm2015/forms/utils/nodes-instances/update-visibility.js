/**
 * @fileoverview added by tsickle
 * Generated from: src/core/forms/utils/nodes-instances/update-visibility.ts
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
import { evaluateExpression } from '@ajf/core/models';
/**
 * @param {?} instance
 * @param {?} context
 * @param {?=} branchVisibility
 * @return {?}
 */
export function updateVisibility(instance, context, branchVisibility = true) {
    if (instance.visibility == null) {
        instance.visible = false;
        return false;
    }
    /** @type {?} */
    const visibility = instance.visibility;
    /** @type {?} */
    const oldVisibility = instance.visible;
    /** @type {?} */
    let newVisibility = branchVisibility && evaluateExpression(visibility.condition, context);
    if (newVisibility !== instance.visible) {
        instance.visible = newVisibility;
    }
    return oldVisibility !== newVisibility;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLXZpc2liaWxpdHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9mb3Jtcy91dGlscy9ub2Rlcy1pbnN0YW5jZXMvdXBkYXRlLXZpc2liaWxpdHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzQkEsT0FBTyxFQUEyQixrQkFBa0IsRUFBQyxNQUFNLGtCQUFrQixDQUFDOzs7Ozs7O0FBSTlFLE1BQU0sVUFBVSxnQkFBZ0IsQ0FDNUIsUUFBeUIsRUFBRSxPQUFtQixFQUFFLGdCQUFnQixHQUFHLElBQUk7SUFDekUsSUFBSSxRQUFRLENBQUMsVUFBVSxJQUFJLElBQUksRUFBRTtRQUMvQixRQUFRLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUN6QixPQUFPLEtBQUssQ0FBQztLQUNkOztVQUNLLFVBQVUsR0FBaUIsUUFBUSxDQUFDLFVBQVU7O1VBRTlDLGFBQWEsR0FBWSxRQUFRLENBQUMsT0FBTzs7UUFDM0MsYUFBYSxHQUNiLGdCQUFnQixJQUFJLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDO0lBQ3pFLElBQUksYUFBYSxLQUFLLFFBQVEsQ0FBQyxPQUFPLEVBQUU7UUFDdEMsUUFBUSxDQUFDLE9BQU8sR0FBRyxhQUFhLENBQUM7S0FDbEM7SUFFRCxPQUFPLGFBQWEsS0FBSyxhQUFhLENBQUM7QUFDekMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZDb25kaXRpb24sIEFqZkNvbnRleHQsIGV2YWx1YXRlRXhwcmVzc2lvbn0gZnJvbSAnQGFqZi9jb3JlL21vZGVscyc7XG5cbmltcG9ydCB7QWpmTm9kZUluc3RhbmNlfSBmcm9tICcuLi8uLi9pbnRlcmZhY2Uvbm9kZXMtaW5zdGFuY2VzL25vZGUtaW5zdGFuY2UnO1xuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlVmlzaWJpbGl0eShcbiAgICBpbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlLCBjb250ZXh0OiBBamZDb250ZXh0LCBicmFuY2hWaXNpYmlsaXR5ID0gdHJ1ZSk6IGJvb2xlYW4ge1xuICBpZiAoaW5zdGFuY2UudmlzaWJpbGl0eSA9PSBudWxsKSB7XG4gICAgaW5zdGFuY2UudmlzaWJsZSA9IGZhbHNlO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBjb25zdCB2aXNpYmlsaXR5OiBBamZDb25kaXRpb24gPSBpbnN0YW5jZS52aXNpYmlsaXR5O1xuXG4gIGNvbnN0IG9sZFZpc2liaWxpdHk6IGJvb2xlYW4gPSBpbnN0YW5jZS52aXNpYmxlO1xuICBsZXQgbmV3VmlzaWJpbGl0eTogYm9vbGVhbiA9XG4gICAgICBicmFuY2hWaXNpYmlsaXR5ICYmIGV2YWx1YXRlRXhwcmVzc2lvbih2aXNpYmlsaXR5LmNvbmRpdGlvbiwgY29udGV4dCk7XG4gIGlmIChuZXdWaXNpYmlsaXR5ICE9PSBpbnN0YW5jZS52aXNpYmxlKSB7XG4gICAgaW5zdGFuY2UudmlzaWJsZSA9IG5ld1Zpc2liaWxpdHk7XG4gIH1cblxuICByZXR1cm4gb2xkVmlzaWJpbGl0eSAhPT0gbmV3VmlzaWJpbGl0eTtcbn1cbiJdfQ==