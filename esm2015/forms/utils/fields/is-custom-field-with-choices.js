/**
 * @fileoverview added by tsickle
 * Generated from: src/core/forms/utils/fields/is-custom-field-with-choices.ts
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
import { componentsMap } from './fields-map';
/**
 * @param {?} field
 * @return {?}
 */
export function isCustomFieldWithChoices(field) {
    return field.fieldType > 100
        && componentsMap[field.fieldType] != null
        && componentsMap[field.fieldType].isFieldWithChoice === true;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXMtY3VzdG9tLWZpZWxkLXdpdGgtY2hvaWNlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2Zvcm1zL3V0aWxzL2ZpZWxkcy9pcy1jdXN0b20tZmllbGQtd2l0aC1jaG9pY2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBdUJBLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxjQUFjLENBQUM7Ozs7O0FBRTNDLE1BQU0sVUFBVSx3QkFBd0IsQ0FBQyxLQUFlO0lBQ3RELE9BQU8sS0FBSyxDQUFDLFNBQVMsR0FBRyxHQUFHO1dBQ3ZCLGFBQWEsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksSUFBSTtXQUN0QyxhQUFhLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLGlCQUFpQixLQUFLLElBQUksQ0FBQztBQUNqRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkZpZWxkfSBmcm9tICcuLi8uLi9pbnRlcmZhY2UvZmllbGRzL2ZpZWxkJztcbmltcG9ydCB7Y29tcG9uZW50c01hcH0gZnJvbSAnLi9maWVsZHMtbWFwJztcblxuZXhwb3J0IGZ1bmN0aW9uIGlzQ3VzdG9tRmllbGRXaXRoQ2hvaWNlcyhmaWVsZDogQWpmRmllbGQpOiBib29sZWFuIHtcbiAgcmV0dXJuIGZpZWxkLmZpZWxkVHlwZSA+IDEwMFxuICAgICYmIGNvbXBvbmVudHNNYXBbZmllbGQuZmllbGRUeXBlXSAhPSBudWxsXG4gICAgJiYgY29tcG9uZW50c01hcFtmaWVsZC5maWVsZFR5cGVdLmlzRmllbGRXaXRoQ2hvaWNlID09PSB0cnVlO1xufVxuIl19