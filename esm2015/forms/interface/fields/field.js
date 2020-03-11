/**
 * @fileoverview added by tsickle
 * Generated from: src/core/forms/interface/fields/field.ts
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
export function AjfField() { }
if (false) {
    /** @type {?} */
    AjfField.prototype.nodeType;
    /** @type {?} */
    AjfField.prototype.fieldType;
    /** @type {?|undefined} */
    AjfField.prototype.description;
    /** @type {?} */
    AjfField.prototype.editable;
    /** @type {?|undefined} */
    AjfField.prototype.formula;
    /** @type {?} */
    AjfField.prototype.defaultValue;
    /** @type {?} */
    AjfField.prototype.size;
    /** @type {?|undefined} */
    AjfField.prototype.validation;
    /** @type {?|undefined} */
    AjfField.prototype.warning;
    /** @type {?|undefined} */
    AjfField.prototype.nextSlideCondition;
    /** @type {?|undefined} */
    AjfField.prototype.attachmentOrigin;
    /** @type {?|undefined} */
    AjfField.prototype.attachments;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9mb3Jtcy9pbnRlcmZhY2UvZmllbGRzL2ZpZWxkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBZ0NBLDhCQWFDOzs7SUFaQyw0QkFBK0I7O0lBQy9CLDZCQUF3Qjs7SUFDeEIsK0JBQXFCOztJQUNyQiw0QkFBa0I7O0lBQ2xCLDJCQUFxQjs7SUFDckIsZ0NBQWtCOztJQUNsQix3QkFBbUI7O0lBQ25CLDhCQUFnQzs7SUFDaEMsMkJBQTBCOztJQUMxQixzQ0FBa0M7O0lBQ2xDLG9DQUE2Qzs7SUFDN0MsK0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkNvbmRpdGlvbiwgQWpmRm9ybXVsYX0gZnJvbSAnQGFqZi9jb3JlL21vZGVscyc7XG5cbmltcG9ydCB7QWpmQXR0YWNobWVudHNPcmlnaW59IGZyb20gJy4uL2F0dGFjaG1lbnRzL2F0dGFjaG1lbnRzLW9yaWdpbic7XG5pbXBvcnQge0FqZk5vZGV9IGZyb20gJy4uL25vZGVzL25vZGUnO1xuaW1wb3J0IHtBamZOb2RlVHlwZX0gZnJvbSAnLi4vbm9kZXMvbm9kZS10eXBlJztcbmltcG9ydCB7QWpmVmFsaWRhdGlvbkdyb3VwfSBmcm9tICcuLi92YWxpZGF0aW9uL3ZhbGlkYXRpb24tZ3JvdXAnO1xuaW1wb3J0IHtBamZXYXJuaW5nR3JvdXB9IGZyb20gJy4uL3dhcm5pbmcvd2FybmluZy1ncm91cCc7XG5pbXBvcnQge0FqZkZpZWxkU2l6ZX0gZnJvbSAnLi9maWVsZC1zaXplJztcbmltcG9ydCB7QWpmRmllbGRUeXBlfSBmcm9tICcuL2ZpZWxkLXR5cGUnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEFqZkZpZWxkIGV4dGVuZHMgQWpmTm9kZSB7XG4gIG5vZGVUeXBlOiBBamZOb2RlVHlwZS5BamZGaWVsZDtcbiAgZmllbGRUeXBlOiBBamZGaWVsZFR5cGU7XG4gIGRlc2NyaXB0aW9uPzogc3RyaW5nO1xuICBlZGl0YWJsZTogYm9vbGVhbjtcbiAgZm9ybXVsYT86IEFqZkZvcm11bGE7XG4gIGRlZmF1bHRWYWx1ZTogYW55O1xuICBzaXplOiBBamZGaWVsZFNpemU7XG4gIHZhbGlkYXRpb24/OiBBamZWYWxpZGF0aW9uR3JvdXA7XG4gIHdhcm5pbmc/OiBBamZXYXJuaW5nR3JvdXA7XG4gIG5leHRTbGlkZUNvbmRpdGlvbj86IEFqZkNvbmRpdGlvbjtcbiAgYXR0YWNobWVudE9yaWdpbj86IEFqZkF0dGFjaG1lbnRzT3JpZ2luPGFueT47XG4gIGF0dGFjaG1lbnRzPzogYW55W107XG59XG4iXX0=