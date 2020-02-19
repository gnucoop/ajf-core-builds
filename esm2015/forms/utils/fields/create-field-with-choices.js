/**
 * @fileoverview added by tsickle
 * Generated from: src/core/forms/utils/fields/create-field-with-choices.ts
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
import { createField } from './create-field';
/**
 * @template T
 * @param {?} field
 * @return {?}
 */
export function createFieldWithChoices(field) {
    /** @type {?} */
    const node = createField(Object.assign({}, field));
    return Object.assign(Object.assign(Object.assign({}, node), field), { choices: field.choices || [], forceExpanded: field.forceExpanded || false, forceNarrow: field.forceNarrow || false });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLWZpZWxkLXdpdGgtY2hvaWNlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2Zvcm1zL3V0aWxzL2ZpZWxkcy9jcmVhdGUtZmllbGQtd2l0aC1jaG9pY2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBdUJBLE9BQU8sRUFBaUIsV0FBVyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7Ozs7OztBQUszRCxNQUFNLFVBQVUsc0JBQXNCLENBQUksS0FBbUM7O1VBRXJFLElBQUksR0FBRyxXQUFXLG1CQUFLLEtBQUssRUFBRTtJQUNwQyxxREFDSyxJQUFJLEdBQ0osS0FBSyxLQUNSLE9BQU8sRUFBRSxLQUFLLENBQUMsT0FBTyxJQUFJLEVBQUUsRUFDNUIsYUFBYSxFQUFFLEtBQUssQ0FBQyxhQUFhLElBQUksS0FBSyxFQUMzQyxXQUFXLEVBQUUsS0FBSyxDQUFDLFdBQVcsSUFBSSxLQUFLLElBQ3ZDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgMjAxOCBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkZpZWxkV2l0aENob2ljZXN9IGZyb20gJy4uLy4uL2ludGVyZmFjZS9maWVsZHMvZmllbGQtd2l0aC1jaG9pY2VzJztcbmltcG9ydCB7QWpmRmllbGRDcmVhdGUsIGNyZWF0ZUZpZWxkfSBmcm9tICcuL2NyZWF0ZS1maWVsZCc7XG5cbmV4cG9ydCB0eXBlIEFqZkZpZWxkV2l0aENob2ljZXNDcmVhdGU8VD4gPSBBamZGaWVsZENyZWF0ZSZcbiAgICBQaWNrPEFqZkZpZWxkV2l0aENob2ljZXM8VD4sICdmaWVsZFR5cGUnfCdjaG9pY2VzT3JpZ2luJz4mUGFydGlhbDxBamZGaWVsZFdpdGhDaG9pY2VzPFQ+PjtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUZpZWxkV2l0aENob2ljZXM8VD4oZmllbGQ6IEFqZkZpZWxkV2l0aENob2ljZXNDcmVhdGU8VD4pOlxuICAgIEFqZkZpZWxkV2l0aENob2ljZXM8VD4ge1xuICBjb25zdCBub2RlID0gY3JlYXRlRmllbGQoey4uLmZpZWxkfSk7XG4gIHJldHVybiB7XG4gICAgLi4ubm9kZSxcbiAgICAuLi5maWVsZCxcbiAgICBjaG9pY2VzOiBmaWVsZC5jaG9pY2VzIHx8IFtdLFxuICAgIGZvcmNlRXhwYW5kZWQ6IGZpZWxkLmZvcmNlRXhwYW5kZWQgfHwgZmFsc2UsXG4gICAgZm9yY2VOYXJyb3c6IGZpZWxkLmZvcmNlTmFycm93IHx8IGZhbHNlLFxuICB9O1xufVxuIl19