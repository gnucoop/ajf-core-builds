/**
 * @fileoverview added by tsickle
 * Generated from: src/core/forms/utils/slides-instances/valid-slide.ts
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
/**
 * @param {?} slide
 * @param {?} idx
 * @return {?}
 */
export function validSlide(slide, idx) {
    if (idx >= slide.slideNodes.length) {
        return true;
    }
    return slide.slideNodes[idx]
        .map((/**
     * @param {?} n
     * @return {?}
     */
    n => {
        if (n.visible && Object.keys(n).indexOf('valid') > -1) {
            return ((/** @type {?} */ (n))).valid;
        }
        return true;
    }))
        .reduce((/**
     * @param {?} v1
     * @param {?} v2
     * @return {?}
     */
    (v1, v2) => v1 && v2), true);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWQtc2xpZGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9mb3Jtcy91dGlscy9zbGlkZXMtaW5zdGFuY2VzL3ZhbGlkLXNsaWRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF3QkEsTUFBTSxVQUFVLFVBQVUsQ0FBQyxLQUEyQixFQUFFLEdBQVc7SUFDakUsSUFBSSxHQUFHLElBQUksS0FBSyxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUU7UUFDbEMsT0FBTyxJQUFJLENBQUM7S0FDYjtJQUNELE9BQU8sS0FBSyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUM7U0FDdkIsR0FBRzs7OztJQUFDLENBQUMsQ0FBQyxFQUFFO1FBQ1AsSUFBSSxDQUFDLENBQUMsT0FBTyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO1lBQ3JELE9BQU8sQ0FBQyxtQkFBSyxDQUFDLEVBQUEsQ0FBQyxDQUFDLEtBQUssQ0FBQztTQUN2QjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQyxFQUFDO1NBQ0QsTUFBTTs7Ozs7SUFBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEdBQUUsSUFBSSxDQUFDLENBQUM7QUFDMUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZCYXNlU2xpZGVJbnN0YW5jZX0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL3NsaWRlcy1pbnN0YW5jZXMvYmFzZS1zbGlkZS1pbnN0YW5jZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiB2YWxpZFNsaWRlKHNsaWRlOiBBamZCYXNlU2xpZGVJbnN0YW5jZSwgaWR4OiBudW1iZXIpOiBib29sZWFuIHtcbiAgaWYgKGlkeCA+PSBzbGlkZS5zbGlkZU5vZGVzLmxlbmd0aCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHJldHVybiBzbGlkZS5zbGlkZU5vZGVzW2lkeF1cbiAgICAgIC5tYXAobiA9PiB7XG4gICAgICAgIGlmIChuLnZpc2libGUgJiYgT2JqZWN0LmtleXMobikuaW5kZXhPZigndmFsaWQnKSA+IC0xKSB7XG4gICAgICAgICAgcmV0dXJuICg8YW55Pm4pLnZhbGlkO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSlcbiAgICAgIC5yZWR1Y2UoKHYxLCB2MikgPT4gdjEgJiYgdjIsIHRydWUpO1xufVxuIl19