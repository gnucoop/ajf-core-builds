/**
 * @fileoverview added by tsickle
 * Generated from: src/core/forms/interface/fields/table-field.ts
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
 * @record
 */
export function AjfTableCell() { }
if (false) {
    /** @type {?} */
    AjfTableCell.prototype.formula;
    /** @type {?|undefined} */
    AjfTableCell.prototype.editable;
}
/**
 * @record
 */
export function AjfTableField() { }
if (false) {
    /** @type {?} */
    AjfTableField.prototype.fieldType;
    /** @type {?} */
    AjfTableField.prototype.rows;
    /** @type {?} */
    AjfTableField.prototype.columnLabels;
    /** @type {?} */
    AjfTableField.prototype.rowLabels;
    /** @type {?} */
    AjfTableField.prototype.hideEmptyRows;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtZmllbGQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9mb3Jtcy9pbnRlcmZhY2UvZmllbGRzL3RhYmxlLWZpZWxkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBeUJBLGtDQUdDOzs7SUFGQywrQkFBZ0I7O0lBQ2hCLGdDQUFtQjs7Ozs7QUFFckIsbUNBT0M7OztJQU5DLGtDQUE4Qjs7SUFFOUIsNkJBQWdDOztJQUNoQyxxQ0FBdUI7O0lBQ3ZCLGtDQUFvQjs7SUFDcEIsc0NBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkZpZWxkfSBmcm9tICcuL2ZpZWxkJztcbmltcG9ydCB7QWpmRmllbGRUeXBlfSBmcm9tICcuL2ZpZWxkLXR5cGUnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEFqZlRhYmxlQ2VsbCB7XG4gIGZvcm11bGE6IHN0cmluZztcbiAgZWRpdGFibGU/OiBib29sZWFuO1xufVxuZXhwb3J0IGludGVyZmFjZSBBamZUYWJsZUZpZWxkIGV4dGVuZHMgQWpmRmllbGQge1xuICBmaWVsZFR5cGU6IEFqZkZpZWxkVHlwZS5UYWJsZTtcbiAgLy8gZGVwcmVjYXRlZCBzdHJpbmcgdHlwZSBpcyB1c2VkIHRvIG1haW50YWluIGJhY2t3YXJkIGNvbXBhdGliaWxpdHlcbiAgcm93czogKHN0cmluZ3xBamZUYWJsZUNlbGwpW11bXTtcbiAgY29sdW1uTGFiZWxzOiBzdHJpbmdbXTtcbiAgcm93TGFiZWxzOiBzdHJpbmdbXTtcbiAgaGlkZUVtcHR5Um93czogYm9vbGVhbjtcbn1cbiJdfQ==