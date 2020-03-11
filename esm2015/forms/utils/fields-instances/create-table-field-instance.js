/**
 * @fileoverview added by tsickle
 * Generated from: src/core/forms/utils/fields-instances/create-table-field-instance.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLXRhYmxlLWZpZWxkLWluc3RhbmNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvZm9ybXMvdXRpbHMvZmllbGRzLWluc3RhbmNlcy9jcmVhdGUtdGFibGUtZmllbGQtaW5zdGFuY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF3QkEsT0FBTyxFQUF5QixtQkFBbUIsRUFBQyxNQUFNLHlCQUF5QixDQUFDOzs7Ozs7OztBQVVwRixTQUFTLGFBQWEsQ0FBQyxJQUFtQjtJQUN4QyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU87Ozs7O0lBQUMsQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDaEMsR0FBRyxDQUFDLE9BQU87Ozs7O1FBQUUsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUU7WUFDN0IsSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLEVBQUU7Z0JBQzVCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsbUJBQUE7b0JBQzNCLE9BQU8sRUFBRSxJQUFJO29CQUNiLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtpQkFDeEIsRUFBZ0IsQ0FBQzthQUNuQjtRQUNILENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQyxFQUFDLENBQUM7QUFDTCxDQUFDOzs7Ozs7QUFFRCxNQUFNLFVBQVUsd0JBQXdCLENBQ3BDLFFBQXFDLEVBQUUsT0FBbUI7SUFDeEQsYUFBYSxDQUFDLG1CQUFBLFFBQVEsQ0FBQyxJQUFJLEVBQWlCLENBQUMsQ0FBQzs7VUFDeEMsYUFBYSxHQUFHLG1CQUFtQixDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUM7SUFDNUQsdUNBQ0ssYUFBYSxLQUNoQixJQUFJLEVBQUUsUUFBUSxDQUFDLElBQUksRUFDbkIsT0FBTyxFQUNQLGFBQWEsRUFBRSxRQUFRLENBQUMsYUFBYSxJQUFJLEtBQUssRUFDOUMsUUFBUSxFQUFFLEVBQUUsSUFDWjtBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmQ29udGV4dH0gZnJvbSAnQGFqZi9jb3JlL21vZGVscyc7XG5cbmltcG9ydCB7QWpmRmllbGRJbnN0YW5jZUNyZWF0ZSwgY3JlYXRlRmllbGRJbnN0YW5jZX0gZnJvbSAnLi9jcmVhdGUtZmllbGQtaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZUYWJsZUZpZWxkLCBBamZUYWJsZUNlbGx9IGZyb20gJy4uLy4uL2ludGVyZmFjZS9maWVsZHMvdGFibGUtZmllbGQnO1xuaW1wb3J0IHtBamZUYWJsZUZpZWxkSW5zdGFuY2V9IGZyb20gJy4uLy4uL2ludGVyZmFjZS9maWVsZHMtaW5zdGFuY2VzL3RhYmxlLWZpZWxkLWluc3RhbmNlJztcblxuZXhwb3J0IHR5cGUgQWpmVGFibGVGaWVsZEluc3RhbmNlQ3JlYXRlID0gQWpmRmllbGRJbnN0YW5jZUNyZWF0ZSZQYXJ0aWFsPEFqZlRhYmxlRmllbGRJbnN0YW5jZT47XG4vKipcbiAqIHRvIG1hbnRhaW4gcmV0cm9jb21wYXRpYmlsaXR5IHdpdGggb2xkIHN0cmluZyB0eXBlIGNvbnZlcnQgc3RyaW5nIHRvIEFqZlRhYmxlQ2VsbFxuICogY2hlY2sgIG5vZGUucm93czogKHN0cmluZ3xBamZUYWJsZUNlbGwpW11bXTtcbiAqIGlmIGVsZW0gb2YgbWFwIGlzIHN0cmluZyBjb252ZXJ0IGluIHRvIEFqZlRhYmxlQ2VsbCBvYmplY3RcbiAqL1xuZnVuY3Rpb24gbm9ybWFsaXplUm93cyhub2RlOiBBamZUYWJsZUZpZWxkKTogdm9pZCB7XG4gIG5vZGUucm93cy5mb3JFYWNoKChyb3csIHJvd0lkeCkgPT4ge1xuICAgIHJvdy5mb3JFYWNoKCAoZWxlbSwgZWxlbUlkeCkgPT4ge1xuICAgICAgaWYgKHR5cGVvZiBlbGVtID09PSAnc3RyaW5nJykge1xuICAgICAgICBub2RlLnJvd3Nbcm93SWR4XVtlbGVtSWR4XSA9IHtcbiAgICAgICAgICBmb3JtdWxhOiBlbGVtLFxuICAgICAgICAgIGVkaXRhYmxlOiBub2RlLmVkaXRhYmxlXG4gICAgICAgIH0gYXMgQWpmVGFibGVDZWxsO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVRhYmxlRmllbGRJbnN0YW5jZShcbiAgICBpbnN0YW5jZTogQWpmVGFibGVGaWVsZEluc3RhbmNlQ3JlYXRlLCBjb250ZXh0OiBBamZDb250ZXh0KTogQWpmVGFibGVGaWVsZEluc3RhbmNlIHtcbiAgICAgIG5vcm1hbGl6ZVJvd3MoaW5zdGFuY2Uubm9kZSBhcyBBamZUYWJsZUZpZWxkKTtcbiAgICAgIGNvbnN0IGZpZWxkSW5zdGFuY2UgPSBjcmVhdGVGaWVsZEluc3RhbmNlKGluc3RhbmNlLCBjb250ZXh0KTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLmZpZWxkSW5zdGFuY2UsXG4gICAgICAgIG5vZGU6IGluc3RhbmNlLm5vZGUsXG4gICAgICAgIGNvbnRleHQsXG4gICAgICAgIGhpZGVFbXB0eVJvd3M6IGluc3RhbmNlLmhpZGVFbXB0eVJvd3MgfHwgZmFsc2UsXG4gICAgICAgIGNvbnRyb2xzOiBbXVxuICAgICAgfTtcbiAgICB9XG4iXX0=