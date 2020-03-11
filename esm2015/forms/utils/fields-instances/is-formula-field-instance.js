/**
 * @fileoverview added by tsickle
 * Generated from: src/core/forms/utils/fields-instances/is-formula-field-instance.ts
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
import { isFormulaField } from '../fields/is-formula-field';
import { isFieldInstance } from '../nodes-instances/is-field-instance';
/**
 * @param {?} nodeInstance
 * @return {?}
 */
export function isFormulaFieldInstance(nodeInstance) {
    return nodeInstance != null && isFieldInstance(nodeInstance) &&
        isFormulaField(((/** @type {?} */ (nodeInstance))).node);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXMtZm9ybXVsYS1maWVsZC1pbnN0YW5jZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2Zvcm1zL3V0aWxzL2ZpZWxkcy1pbnN0YW5jZXMvaXMtZm9ybXVsYS1maWVsZC1pbnN0YW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXdCQSxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFDMUQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHNDQUFzQyxDQUFDOzs7OztBQUVyRSxNQUFNLFVBQVUsc0JBQXNCLENBQUMsWUFBNkI7SUFDbEUsT0FBTyxZQUFZLElBQUksSUFBSSxJQUFJLGVBQWUsQ0FBQyxZQUFZLENBQUM7UUFDeEQsY0FBYyxDQUFDLENBQUMsbUJBQUEsWUFBWSxFQUFvQixDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDOUQsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZGaWVsZEluc3RhbmNlfSBmcm9tICcuLi8uLi9pbnRlcmZhY2UvZmllbGRzLWluc3RhbmNlcy9maWVsZC1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZk5vZGVJbnN0YW5jZX0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL25vZGVzLWluc3RhbmNlcy9ub2RlLWluc3RhbmNlJztcbmltcG9ydCB7aXNGb3JtdWxhRmllbGR9IGZyb20gJy4uL2ZpZWxkcy9pcy1mb3JtdWxhLWZpZWxkJztcbmltcG9ydCB7aXNGaWVsZEluc3RhbmNlfSBmcm9tICcuLi9ub2Rlcy1pbnN0YW5jZXMvaXMtZmllbGQtaW5zdGFuY2UnO1xuXG5leHBvcnQgZnVuY3Rpb24gaXNGb3JtdWxhRmllbGRJbnN0YW5jZShub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSk6IGJvb2xlYW4ge1xuICByZXR1cm4gbm9kZUluc3RhbmNlICE9IG51bGwgJiYgaXNGaWVsZEluc3RhbmNlKG5vZGVJbnN0YW5jZSkgJiZcbiAgICAgIGlzRm9ybXVsYUZpZWxkKChub2RlSW5zdGFuY2UgYXMgQWpmRmllbGRJbnN0YW5jZSkubm9kZSk7XG59XG4iXX0=