/**
 * @fileoverview added by tsickle
 * Generated from: src/core/forms/utils/fields-instances/update-formula.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLWZvcm11bGEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9mb3Jtcy91dGlscy9maWVsZHMtaW5zdGFuY2VzL3VwZGF0ZS1mb3JtdWxhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBLE9BQU8sRUFBYSxrQkFBa0IsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBR2hFLE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLGdEQUFnRCxDQUFDOzs7Ozs7OztBQU14RixNQUFNLFVBQVUsYUFBYSxDQUN6QixRQUEwQixFQUFFLE9BQW1COztVQUMzQyxPQUFPLEdBQUcsUUFBUSxDQUFDLE9BQU87O1VBQzFCLFFBQVEsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVE7SUFDdkMsSUFBSSxPQUFPLElBQUksSUFBSSxJQUFJLFFBQVEsQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDLFFBQVEsSUFBSSxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxDQUFDLEVBQUU7O1lBQzFGLFFBQVEsR0FBUSxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQzs7Y0FDMUQsUUFBUSxHQUFHLFFBQVEsQ0FBQyxLQUFLO1FBQy9CLElBQUksUUFBUSxLQUFLLFFBQVEsQ0FBQyxLQUFLLEVBQUU7WUFDL0IsUUFBUSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUM7WUFDMUIsT0FBTyxDQUFDLHdCQUF3QixDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQztZQUM3RCxPQUFPLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUM7U0FDakM7UUFDRCxPQUFPLEVBQUMsT0FBTyxFQUFFLFFBQVEsS0FBSyxRQUFRLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBQyxDQUFDO0tBQzFEO0lBQ0QsT0FBTyxFQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFFBQVEsQ0FBQyxLQUFLLEVBQUMsQ0FBQztBQUNqRCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSAyMDE4IEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmQ29udGV4dCwgZXZhbHVhdGVFeHByZXNzaW9ufSBmcm9tICdAYWpmL2NvcmUvbW9kZWxzJztcblxuaW1wb3J0IHtBamZGaWVsZEluc3RhbmNlfSBmcm9tICcuLi8uLi9pbnRlcmZhY2UvZmllbGRzLWluc3RhbmNlcy9maWVsZC1pbnN0YW5jZSc7XG5pbXBvcnQge25vZGVJbnN0YW5jZUNvbXBsZXRlTmFtZX0gZnJvbSAnLi4vbm9kZXMtaW5zdGFuY2VzL25vZGUtaW5zdGFuY2UtY29tcGxldGUtbmFtZSc7XG5cbi8qKlxuICogdXBkYXRlIHRoZSByZWxhdGl2ZSBpbnN0YW5jZSB2YWx1ZSBhbmQgdGhlIGNvbnRleHRcbiAqIGlmICFlZGl0YWJsZSBldmFsdWF0ZSBleHByZXNzaW9uIG9uY2Ugb25lIHRpbWUgYW5kIGZsYWcgY2hhbmdlZCBpcyBmYWxzZVxuICovXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlRm9ybXVsYShcbiAgICBpbnN0YW5jZTogQWpmRmllbGRJbnN0YW5jZSwgY29udGV4dDogQWpmQ29udGV4dCk6IHtjaGFuZ2VkOiBib29sZWFuLCB2YWx1ZTogYW55fSB7XG4gIGNvbnN0IGZvcm11bGEgPSBpbnN0YW5jZS5mb3JtdWxhO1xuICBjb25zdCBlZGl0YWJsZSA9IGluc3RhbmNlLm5vZGUuZWRpdGFibGU7XG4gIGlmIChmb3JtdWxhICE9IG51bGwgJiYgaW5zdGFuY2UudmlzaWJsZSAmJiAoIWVkaXRhYmxlIHx8IChlZGl0YWJsZSAmJiBpbnN0YW5jZS52YWx1ZSA9PSBudWxsKSkpIHtcbiAgICBsZXQgbmV3VmFsdWU6IGFueSA9IGV2YWx1YXRlRXhwcmVzc2lvbihmb3JtdWxhLmZvcm11bGEsIGNvbnRleHQpO1xuICAgIGNvbnN0IG9sZFZhbHVlID0gaW5zdGFuY2UudmFsdWU7XG4gICAgaWYgKG5ld1ZhbHVlICE9PSBpbnN0YW5jZS52YWx1ZSkge1xuICAgICAgaW5zdGFuY2UudmFsdWUgPSBuZXdWYWx1ZTtcbiAgICAgIGNvbnRleHRbbm9kZUluc3RhbmNlQ29tcGxldGVOYW1lKGluc3RhbmNlKV0gPSBpbnN0YW5jZS52YWx1ZTtcbiAgICAgIGNvbnRleHQuJHZhbHVlID0gaW5zdGFuY2UudmFsdWU7XG4gICAgfVxuICAgIHJldHVybiB7Y2hhbmdlZDogbmV3VmFsdWUgIT09IG9sZFZhbHVlLCB2YWx1ZTogbmV3VmFsdWV9O1xuICB9XG4gIHJldHVybiB7Y2hhbmdlZDogZmFsc2UsIHZhbHVlOiBpbnN0YW5jZS52YWx1ZX07XG59XG4iXX0=