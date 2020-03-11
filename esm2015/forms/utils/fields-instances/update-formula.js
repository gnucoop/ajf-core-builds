/**
 * @fileoverview added by tsickle
 * Generated from: src/core/forms/utils/fields-instances/update-formula.ts
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
import { evaluateExpression } from '@ajf/core/models';
import { nodeInstanceCompleteName } from '../nodes-instances/node-instance-complete-name';
/**
 * update the relative instance value and the context
 * if !editable evaluate expression once one time and flag changed is false
 * @param {?} instance
 * @param {?} context
 * @return {?}
 */
export function updateFormula(instance, context) {
    /** @type {?} */
    const formula = instance.formula;
    /** @type {?} */
    const editable = instance.node.editable;
    if (formula != null && instance.visible && (!editable || (editable && instance.value == null))) {
        /** @type {?} */
        let newValue = evaluateExpression(formula.formula, context);
        /** @type {?} */
        const oldValue = instance.value;
        if (newValue !== instance.value) {
            instance.value = newValue;
            context[nodeInstanceCompleteName(instance)] = instance.value;
            context.$value = instance.value;
        }
        return { changed: newValue !== oldValue, value: newValue };
    }
    return { changed: false, value: instance.value };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLWZvcm11bGEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9mb3Jtcy91dGlscy9maWVsZHMtaW5zdGFuY2VzL3VwZGF0ZS1mb3JtdWxhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBLE9BQU8sRUFBYSxrQkFBa0IsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBR2hFLE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLGdEQUFnRCxDQUFDOzs7Ozs7OztBQU14RixNQUFNLFVBQVUsYUFBYSxDQUN6QixRQUEwQixFQUFFLE9BQW1COztVQUMzQyxPQUFPLEdBQUcsUUFBUSxDQUFDLE9BQU87O1VBQzFCLFFBQVEsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVE7SUFDdkMsSUFBSSxPQUFPLElBQUksSUFBSSxJQUFJLFFBQVEsQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDLFFBQVEsSUFBSSxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxDQUFDLEVBQUU7O1lBQzFGLFFBQVEsR0FBUSxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQzs7Y0FDMUQsUUFBUSxHQUFHLFFBQVEsQ0FBQyxLQUFLO1FBQy9CLElBQUksUUFBUSxLQUFLLFFBQVEsQ0FBQyxLQUFLLEVBQUU7WUFDL0IsUUFBUSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUM7WUFDMUIsT0FBTyxDQUFDLHdCQUF3QixDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQztZQUM3RCxPQUFPLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUM7U0FDakM7UUFDRCxPQUFPLEVBQUMsT0FBTyxFQUFFLFFBQVEsS0FBSyxRQUFRLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBQyxDQUFDO0tBQzFEO0lBQ0QsT0FBTyxFQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFFBQVEsQ0FBQyxLQUFLLEVBQUMsQ0FBQztBQUNqRCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkNvbnRleHQsIGV2YWx1YXRlRXhwcmVzc2lvbn0gZnJvbSAnQGFqZi9jb3JlL21vZGVscyc7XG5cbmltcG9ydCB7QWpmRmllbGRJbnN0YW5jZX0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL2ZpZWxkcy1pbnN0YW5jZXMvZmllbGQtaW5zdGFuY2UnO1xuaW1wb3J0IHtub2RlSW5zdGFuY2VDb21wbGV0ZU5hbWV9IGZyb20gJy4uL25vZGVzLWluc3RhbmNlcy9ub2RlLWluc3RhbmNlLWNvbXBsZXRlLW5hbWUnO1xuXG4vKipcbiAqIHVwZGF0ZSB0aGUgcmVsYXRpdmUgaW5zdGFuY2UgdmFsdWUgYW5kIHRoZSBjb250ZXh0XG4gKiBpZiAhZWRpdGFibGUgZXZhbHVhdGUgZXhwcmVzc2lvbiBvbmNlIG9uZSB0aW1lIGFuZCBmbGFnIGNoYW5nZWQgaXMgZmFsc2VcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZUZvcm11bGEoXG4gICAgaW5zdGFuY2U6IEFqZkZpZWxkSW5zdGFuY2UsIGNvbnRleHQ6IEFqZkNvbnRleHQpOiB7Y2hhbmdlZDogYm9vbGVhbiwgdmFsdWU6IGFueX0ge1xuICBjb25zdCBmb3JtdWxhID0gaW5zdGFuY2UuZm9ybXVsYTtcbiAgY29uc3QgZWRpdGFibGUgPSBpbnN0YW5jZS5ub2RlLmVkaXRhYmxlO1xuICBpZiAoZm9ybXVsYSAhPSBudWxsICYmIGluc3RhbmNlLnZpc2libGUgJiYgKCFlZGl0YWJsZSB8fCAoZWRpdGFibGUgJiYgaW5zdGFuY2UudmFsdWUgPT0gbnVsbCkpKSB7XG4gICAgbGV0IG5ld1ZhbHVlOiBhbnkgPSBldmFsdWF0ZUV4cHJlc3Npb24oZm9ybXVsYS5mb3JtdWxhLCBjb250ZXh0KTtcbiAgICBjb25zdCBvbGRWYWx1ZSA9IGluc3RhbmNlLnZhbHVlO1xuICAgIGlmIChuZXdWYWx1ZSAhPT0gaW5zdGFuY2UudmFsdWUpIHtcbiAgICAgIGluc3RhbmNlLnZhbHVlID0gbmV3VmFsdWU7XG4gICAgICBjb250ZXh0W25vZGVJbnN0YW5jZUNvbXBsZXRlTmFtZShpbnN0YW5jZSldID0gaW5zdGFuY2UudmFsdWU7XG4gICAgICBjb250ZXh0LiR2YWx1ZSA9IGluc3RhbmNlLnZhbHVlO1xuICAgIH1cbiAgICByZXR1cm4ge2NoYW5nZWQ6IG5ld1ZhbHVlICE9PSBvbGRWYWx1ZSwgdmFsdWU6IG5ld1ZhbHVlfTtcbiAgfVxuICByZXR1cm4ge2NoYW5nZWQ6IGZhbHNlLCB2YWx1ZTogaW5zdGFuY2UudmFsdWV9O1xufVxuIl19