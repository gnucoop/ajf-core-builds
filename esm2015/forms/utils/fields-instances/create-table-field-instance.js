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
                node.rows[rowIdx][elemIdx] = (/** @type {?} */ ({ formula: elem, editable: node.editable }));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLXRhYmxlLWZpZWxkLWluc3RhbmNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvZm9ybXMvdXRpbHMvZmllbGRzLWluc3RhbmNlcy9jcmVhdGUtdGFibGUtZmllbGQtaW5zdGFuY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUEyQkEsT0FBTyxFQUF5QixtQkFBbUIsRUFBQyxNQUFNLHlCQUF5QixDQUFDOzs7Ozs7OztBQVFwRixTQUFTLGFBQWEsQ0FBQyxJQUFtQjtJQUN4QyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU87Ozs7O0lBQUMsQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDaEMsR0FBRyxDQUFDLE9BQU87Ozs7O1FBQUMsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUU7WUFDNUIsSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLEVBQUU7Z0JBQzVCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsbUJBQUEsRUFBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFDLEVBQWdCLENBQUM7YUFDdkY7UUFDSCxDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUMsRUFBQyxDQUFDO0FBQ0wsQ0FBQzs7Ozs7O0FBRUQsTUFBTSxVQUFVLHdCQUF3QixDQUNwQyxRQUFxQyxFQUFFLE9BQW1CO0lBQzVELGFBQWEsQ0FBQyxtQkFBQSxRQUFRLENBQUMsSUFBSSxFQUFpQixDQUFDLENBQUM7O1VBQ3hDLGFBQWEsR0FBRyxtQkFBbUIsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDO0lBQzVELHVDQUNLLGFBQWEsS0FDaEIsSUFBSSxFQUFFLFFBQVEsQ0FBQyxJQUFJLEVBQ25CLE9BQU8sRUFDUCxhQUFhLEVBQUUsUUFBUSxDQUFDLGFBQWEsSUFBSSxLQUFLLEVBQzlDLFFBQVEsRUFBRSxFQUFFLElBQ1o7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkNvbnRleHR9IGZyb20gJ0BhamYvY29yZS9tb2RlbHMnO1xuXG5pbXBvcnQge0FqZlRhYmxlRmllbGRJbnN0YW5jZX0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL2ZpZWxkcy1pbnN0YW5jZXMvdGFibGUtZmllbGQtaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZUYWJsZUNlbGwsIEFqZlRhYmxlRmllbGR9IGZyb20gJy4uLy4uL2ludGVyZmFjZS9maWVsZHMvdGFibGUtZmllbGQnO1xuXG5pbXBvcnQge0FqZkZpZWxkSW5zdGFuY2VDcmVhdGUsIGNyZWF0ZUZpZWxkSW5zdGFuY2V9IGZyb20gJy4vY3JlYXRlLWZpZWxkLWluc3RhbmNlJztcblxuZXhwb3J0IHR5cGUgQWpmVGFibGVGaWVsZEluc3RhbmNlQ3JlYXRlID0gQWpmRmllbGRJbnN0YW5jZUNyZWF0ZSZQYXJ0aWFsPEFqZlRhYmxlRmllbGRJbnN0YW5jZT47XG4vKipcbiAqIHRvIG1hbnRhaW4gcmV0cm9jb21wYXRpYmlsaXR5IHdpdGggb2xkIHN0cmluZyB0eXBlIGNvbnZlcnQgc3RyaW5nIHRvIEFqZlRhYmxlQ2VsbFxuICogY2hlY2sgIG5vZGUucm93czogKHN0cmluZ3xBamZUYWJsZUNlbGwpW11bXTtcbiAqIGlmIGVsZW0gb2YgbWFwIGlzIHN0cmluZyBjb252ZXJ0IGluIHRvIEFqZlRhYmxlQ2VsbCBvYmplY3RcbiAqL1xuZnVuY3Rpb24gbm9ybWFsaXplUm93cyhub2RlOiBBamZUYWJsZUZpZWxkKTogdm9pZCB7XG4gIG5vZGUucm93cy5mb3JFYWNoKChyb3csIHJvd0lkeCkgPT4ge1xuICAgIHJvdy5mb3JFYWNoKChlbGVtLCBlbGVtSWR4KSA9PiB7XG4gICAgICBpZiAodHlwZW9mIGVsZW0gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIG5vZGUucm93c1tyb3dJZHhdW2VsZW1JZHhdID0ge2Zvcm11bGE6IGVsZW0sIGVkaXRhYmxlOiBub2RlLmVkaXRhYmxlfSBhcyBBamZUYWJsZUNlbGw7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlVGFibGVGaWVsZEluc3RhbmNlKFxuICAgIGluc3RhbmNlOiBBamZUYWJsZUZpZWxkSW5zdGFuY2VDcmVhdGUsIGNvbnRleHQ6IEFqZkNvbnRleHQpOiBBamZUYWJsZUZpZWxkSW5zdGFuY2Uge1xuICBub3JtYWxpemVSb3dzKGluc3RhbmNlLm5vZGUgYXMgQWpmVGFibGVGaWVsZCk7XG4gIGNvbnN0IGZpZWxkSW5zdGFuY2UgPSBjcmVhdGVGaWVsZEluc3RhbmNlKGluc3RhbmNlLCBjb250ZXh0KTtcbiAgcmV0dXJuIHtcbiAgICAuLi5maWVsZEluc3RhbmNlLFxuICAgIG5vZGU6IGluc3RhbmNlLm5vZGUsXG4gICAgY29udGV4dCxcbiAgICBoaWRlRW1wdHlSb3dzOiBpbnN0YW5jZS5oaWRlRW1wdHlSb3dzIHx8IGZhbHNlLFxuICAgIGNvbnRyb2xzOiBbXVxuICB9O1xufVxuIl19