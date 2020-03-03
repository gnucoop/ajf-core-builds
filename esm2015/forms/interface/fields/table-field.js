/**
 * @fileoverview added by tsickle
 * Generated from: src/core/forms/interface/fields/table-field.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtZmllbGQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9mb3Jtcy9pbnRlcmZhY2UvZmllbGRzL3RhYmxlLWZpZWxkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBeUJBLGtDQUdDOzs7SUFGQywrQkFBZ0I7O0lBQ2hCLGdDQUFtQjs7Ozs7QUFFckIsbUNBT0M7OztJQU5DLGtDQUE4Qjs7SUFFOUIsNkJBQWdDOztJQUNoQyxxQ0FBdUI7O0lBQ3ZCLGtDQUFvQjs7SUFDcEIsc0NBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSAyMDE4IEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmRmllbGR9IGZyb20gJy4vZmllbGQnO1xuaW1wb3J0IHtBamZGaWVsZFR5cGV9IGZyb20gJy4vZmllbGQtdHlwZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQWpmVGFibGVDZWxsIHtcbiAgZm9ybXVsYTogc3RyaW5nO1xuICBlZGl0YWJsZT86IGJvb2xlYW47XG59XG5leHBvcnQgaW50ZXJmYWNlIEFqZlRhYmxlRmllbGQgZXh0ZW5kcyBBamZGaWVsZCB7XG4gIGZpZWxkVHlwZTogQWpmRmllbGRUeXBlLlRhYmxlO1xuICAvLyBkZXByZWNhdGVkIHN0cmluZyB0eXBlIGlzIHVzZWQgdG8gbWFpbnRhaW4gYmFja3dhcmQgY29tcGF0aWJpbGl0eVxuICByb3dzOiAoc3RyaW5nfEFqZlRhYmxlQ2VsbClbXVtdO1xuICBjb2x1bW5MYWJlbHM6IHN0cmluZ1tdO1xuICByb3dMYWJlbHM6IHN0cmluZ1tdO1xuICBoaWRlRW1wdHlSb3dzOiBib29sZWFuO1xufVxuIl19