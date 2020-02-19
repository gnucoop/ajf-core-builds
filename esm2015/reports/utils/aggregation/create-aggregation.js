/**
 * @fileoverview added by tsickle
 * Generated from: src/core/reports/utils/aggregation/create-aggregation.ts
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
import { AjfAggregationType } from '../../interface/aggregation/aggregation-type';
/**
 * @param {?} aggregation
 * @return {?}
 */
export function createAggregation(aggregation) {
    return Object.assign(Object.assign({}, aggregation), { aggregation: aggregation.aggregation || AjfAggregationType.None });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLWFnZ3JlZ2F0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvcmVwb3J0cy91dGlscy9hZ2dyZWdhdGlvbi9jcmVhdGUtYWdncmVnYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF1QkEsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sOENBQThDLENBQUM7Ozs7O0FBSWhGLE1BQU0sVUFBVSxpQkFBaUIsQ0FBQyxXQUFpQztJQUNqRSx1Q0FDSyxXQUFXLEtBQ2QsV0FBVyxFQUFFLFdBQVcsQ0FBQyxXQUFXLElBQUksa0JBQWtCLENBQUMsSUFBSSxJQUMvRDtBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTggR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZBZ2dyZWdhdGlvbn0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL2FnZ3JlZ2F0aW9uL2FnZ3JlZ2F0aW9uJztcbmltcG9ydCB7QWpmQWdncmVnYXRpb25UeXBlfSBmcm9tICcuLi8uLi9pbnRlcmZhY2UvYWdncmVnYXRpb24vYWdncmVnYXRpb24tdHlwZSc7XG5cbmV4cG9ydCB0eXBlIEFqZkFnZ3JlZ2F0aW9uQ3JlYXRlID0gUGFydGlhbDxBamZBZ2dyZWdhdGlvbj47XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVBZ2dyZWdhdGlvbihhZ2dyZWdhdGlvbjogQWpmQWdncmVnYXRpb25DcmVhdGUpOiBBamZBZ2dyZWdhdGlvbiB7XG4gIHJldHVybiB7XG4gICAgLi4uYWdncmVnYXRpb24sXG4gICAgYWdncmVnYXRpb246IGFnZ3JlZ2F0aW9uLmFnZ3JlZ2F0aW9uIHx8IEFqZkFnZ3JlZ2F0aW9uVHlwZS5Ob25lLFxuICB9O1xufVxuIl19