/**
 * @fileoverview added by tsickle
 * Generated from: src/core/forms/utils/fields-instances/create-table-field-instance.ts
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
import { createFieldInstance } from './create-field-instance';
/**
 * to mantain retrocompatibility with old string type convert string to AjfTableCell
 * check  node.rows: (string|AjfTableCell)[][];
 * if elem of map is string convert in to AjfTableCell object
 * @param {?} node
 * @return {?}
 */
function normalizeRows(node) {
    node.rows.forEach((/**
     * @param {?} row
     * @param {?} rowIdx
     * @return {?}
     */
    (row, rowIdx) => {
        row.forEach((/**
         * @param {?} elem
         * @param {?} elemIdx
         * @return {?}
         */
        (elem, elemIdx) => {
            if (typeof elem === 'string') {
                node.rows[rowIdx][elemIdx] = (/** @type {?} */ ({
                    formula: elem,
                    editable: node.editable
                }));
            }
        }));
    }));
}
/**
 * @param {?} instance
 * @param {?} context
 * @return {?}
 */
export function createTableFieldInstance(instance, context) {
    normalizeRows((/** @type {?} */ (instance.node)));
    /** @type {?} */
    const fieldInstance = createFieldInstance(instance, context);
    return Object.assign(Object.assign({}, fieldInstance), { node: instance.node, context, hideEmptyRows: instance.hideEmptyRows || false, controls: [] });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLXRhYmxlLWZpZWxkLWluc3RhbmNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvZm9ybXMvdXRpbHMvZmllbGRzLWluc3RhbmNlcy9jcmVhdGUtdGFibGUtZmllbGQtaW5zdGFuY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF3QkEsT0FBTyxFQUF5QixtQkFBbUIsRUFBQyxNQUFNLHlCQUF5QixDQUFDOzs7Ozs7OztBQVVwRixTQUFTLGFBQWEsQ0FBQyxJQUFtQjtJQUN4QyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU87Ozs7O0lBQUMsQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDaEMsR0FBRyxDQUFDLE9BQU87Ozs7O1FBQUUsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUU7WUFDN0IsSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLEVBQUU7Z0JBQzVCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsbUJBQUE7b0JBQzNCLE9BQU8sRUFBRSxJQUFJO29CQUNiLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtpQkFDeEIsRUFBZ0IsQ0FBQzthQUNuQjtRQUNILENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQyxFQUFDLENBQUM7QUFDTCxDQUFDOzs7Ozs7QUFFRCxNQUFNLFVBQVUsd0JBQXdCLENBQ3BDLFFBQXFDLEVBQUUsT0FBbUI7SUFDeEQsYUFBYSxDQUFDLG1CQUFBLFFBQVEsQ0FBQyxJQUFJLEVBQWlCLENBQUMsQ0FBQzs7VUFDeEMsYUFBYSxHQUFHLG1CQUFtQixDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUM7SUFDNUQsdUNBQ0ssYUFBYSxLQUNoQixJQUFJLEVBQUUsUUFBUSxDQUFDLElBQUksRUFDbkIsT0FBTyxFQUNQLGFBQWEsRUFBRSxRQUFRLENBQUMsYUFBYSxJQUFJLEtBQUssRUFDOUMsUUFBUSxFQUFFLEVBQUUsSUFDWjtBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTggR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZDb250ZXh0fSBmcm9tICdAYWpmL2NvcmUvbW9kZWxzJztcblxuaW1wb3J0IHtBamZGaWVsZEluc3RhbmNlQ3JlYXRlLCBjcmVhdGVGaWVsZEluc3RhbmNlfSBmcm9tICcuL2NyZWF0ZS1maWVsZC1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZlRhYmxlRmllbGQsIEFqZlRhYmxlQ2VsbH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL2ZpZWxkcy90YWJsZS1maWVsZCc7XG5pbXBvcnQge0FqZlRhYmxlRmllbGRJbnN0YW5jZX0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL2ZpZWxkcy1pbnN0YW5jZXMvdGFibGUtZmllbGQtaW5zdGFuY2UnO1xuXG5leHBvcnQgdHlwZSBBamZUYWJsZUZpZWxkSW5zdGFuY2VDcmVhdGUgPSBBamZGaWVsZEluc3RhbmNlQ3JlYXRlJlBhcnRpYWw8QWpmVGFibGVGaWVsZEluc3RhbmNlPjtcbi8qKlxuICogdG8gbWFudGFpbiByZXRyb2NvbXBhdGliaWxpdHkgd2l0aCBvbGQgc3RyaW5nIHR5cGUgY29udmVydCBzdHJpbmcgdG8gQWpmVGFibGVDZWxsXG4gKiBjaGVjayAgbm9kZS5yb3dzOiAoc3RyaW5nfEFqZlRhYmxlQ2VsbClbXVtdO1xuICogaWYgZWxlbSBvZiBtYXAgaXMgc3RyaW5nIGNvbnZlcnQgaW4gdG8gQWpmVGFibGVDZWxsIG9iamVjdFxuICovXG5mdW5jdGlvbiBub3JtYWxpemVSb3dzKG5vZGU6IEFqZlRhYmxlRmllbGQpOiB2b2lkIHtcbiAgbm9kZS5yb3dzLmZvckVhY2goKHJvdywgcm93SWR4KSA9PiB7XG4gICAgcm93LmZvckVhY2goIChlbGVtLCBlbGVtSWR4KSA9PiB7XG4gICAgICBpZiAodHlwZW9mIGVsZW0gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIG5vZGUucm93c1tyb3dJZHhdW2VsZW1JZHhdID0ge1xuICAgICAgICAgIGZvcm11bGE6IGVsZW0sXG4gICAgICAgICAgZWRpdGFibGU6IG5vZGUuZWRpdGFibGVcbiAgICAgICAgfSBhcyBBamZUYWJsZUNlbGw7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlVGFibGVGaWVsZEluc3RhbmNlKFxuICAgIGluc3RhbmNlOiBBamZUYWJsZUZpZWxkSW5zdGFuY2VDcmVhdGUsIGNvbnRleHQ6IEFqZkNvbnRleHQpOiBBamZUYWJsZUZpZWxkSW5zdGFuY2Uge1xuICAgICAgbm9ybWFsaXplUm93cyhpbnN0YW5jZS5ub2RlIGFzIEFqZlRhYmxlRmllbGQpO1xuICAgICAgY29uc3QgZmllbGRJbnN0YW5jZSA9IGNyZWF0ZUZpZWxkSW5zdGFuY2UoaW5zdGFuY2UsIGNvbnRleHQpO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uZmllbGRJbnN0YW5jZSxcbiAgICAgICAgbm9kZTogaW5zdGFuY2Uubm9kZSxcbiAgICAgICAgY29udGV4dCxcbiAgICAgICAgaGlkZUVtcHR5Um93czogaW5zdGFuY2UuaGlkZUVtcHR5Um93cyB8fCBmYWxzZSxcbiAgICAgICAgY29udHJvbHM6IFtdXG4gICAgICB9O1xuICAgIH1cbiJdfQ==