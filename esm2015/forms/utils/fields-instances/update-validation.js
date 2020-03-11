/**
 * @fileoverview added by tsickle
 * Generated from: src/core/forms/utils/fields-instances/update-validation.ts
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
import { evaluateValidationGroup } from '../validation/evaluate-validation-group';
/**
 * @param {?} instance
 * @param {?} context
 * @param {?=} supplementaryInformations
 * @return {?}
 */
export function updateValidation(instance, context, supplementaryInformations) {
    /** @type {?} */
    const validation = instance.validation;
    if (validation == null) {
        instance.valid = true;
        return;
    }
    if (supplementaryInformations) {
        Object.keys(supplementaryInformations).forEach((/**
         * @param {?} key
         * @return {?}
         */
        (key) => {
            context[`__supplementary__${key}__`] = supplementaryInformations[key];
        }));
    }
    /** @type {?} */
    const completeName = nodeInstanceCompleteName(instance);
    if (context[completeName] != null && validation && validation.forceValue) {
        instance.value = evaluateExpression(validation.forceValue.condition, context);
        context[completeName] = instance.value;
        context.$value = instance.value;
    }
    instance.validationResults =
        evaluateValidationGroup(validation, context[completeName], context);
    instance.valid = instance.validationResults.reduce((/**
     * @param {?} prev
     * @param {?} x
     * @return {?}
     */
    (prev, x) => prev && x.result), true);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLXZhbGlkYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9mb3Jtcy91dGlscy9maWVsZHMtaW5zdGFuY2VzL3VwZGF0ZS12YWxpZGF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBLE9BQU8sRUFBYSxrQkFBa0IsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBSWhFLE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLGdEQUFnRCxDQUFDO0FBQ3hGLE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLHlDQUF5QyxDQUFDOzs7Ozs7O0FBRWhGLE1BQU0sVUFBVSxnQkFBZ0IsQ0FDNUIsUUFBMEIsRUFBRSxPQUFtQixFQUFFLHlCQUErQjs7VUFDNUUsVUFBVSxHQUFHLFFBQVEsQ0FBQyxVQUFVO0lBQ3RDLElBQUksVUFBVSxJQUFJLElBQUksRUFBRTtRQUN0QixRQUFRLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUN0QixPQUFPO0tBQ1I7SUFFRCxJQUFJLHlCQUF5QixFQUFFO1FBQzdCLE1BQU0sQ0FBQyxJQUFJLENBQUMseUJBQXlCLENBQUMsQ0FBQyxPQUFPOzs7O1FBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUNyRCxPQUFPLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLEdBQUcseUJBQXlCLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDeEUsQ0FBQyxFQUFDLENBQUM7S0FDSjs7VUFFSyxZQUFZLEdBQUcsd0JBQXdCLENBQUMsUUFBUSxDQUFDO0lBRXZELElBQUksT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLElBQUksSUFBSSxVQUFVLElBQUksVUFBVSxDQUFDLFVBQVUsRUFBRTtRQUN4RSxRQUFRLENBQUMsS0FBSyxHQUFHLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQzlFLE9BQU8sQ0FBQyxZQUFZLENBQUMsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDO1FBQ3ZDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQztLQUNqQztJQUVELFFBQVEsQ0FBQyxpQkFBaUI7UUFDdEIsdUJBQXVCLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxZQUFZLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUN4RSxRQUFRLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNOzs7OztJQUM5QyxDQUFDLElBQWEsRUFBRSxDQUFzQixFQUFFLEVBQUUsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLE1BQU0sR0FBRSxJQUFJLENBQUMsQ0FBQztBQUN6RSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkNvbnRleHQsIGV2YWx1YXRlRXhwcmVzc2lvbn0gZnJvbSAnQGFqZi9jb3JlL21vZGVscyc7XG5cbmltcG9ydCB7QWpmRmllbGRJbnN0YW5jZX0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL2ZpZWxkcy1pbnN0YW5jZXMvZmllbGQtaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZWYWxpZGF0aW9uUmVzdWx0fSBmcm9tICcuLi8uLi9pbnRlcmZhY2UvdmFsaWRhdGlvbi92YWxpZGF0aW9uLXJlc3VsdHMnO1xuaW1wb3J0IHtub2RlSW5zdGFuY2VDb21wbGV0ZU5hbWV9IGZyb20gJy4uL25vZGVzLWluc3RhbmNlcy9ub2RlLWluc3RhbmNlLWNvbXBsZXRlLW5hbWUnO1xuaW1wb3J0IHtldmFsdWF0ZVZhbGlkYXRpb25Hcm91cH0gZnJvbSAnLi4vdmFsaWRhdGlvbi9ldmFsdWF0ZS12YWxpZGF0aW9uLWdyb3VwJztcblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZVZhbGlkYXRpb24oXG4gICAgaW5zdGFuY2U6IEFqZkZpZWxkSW5zdGFuY2UsIGNvbnRleHQ6IEFqZkNvbnRleHQsIHN1cHBsZW1lbnRhcnlJbmZvcm1hdGlvbnM/OiBhbnkpOiB2b2lkIHtcbiAgY29uc3QgdmFsaWRhdGlvbiA9IGluc3RhbmNlLnZhbGlkYXRpb247XG4gIGlmICh2YWxpZGF0aW9uID09IG51bGwpIHtcbiAgICBpbnN0YW5jZS52YWxpZCA9IHRydWU7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKHN1cHBsZW1lbnRhcnlJbmZvcm1hdGlvbnMpIHtcbiAgICBPYmplY3Qua2V5cyhzdXBwbGVtZW50YXJ5SW5mb3JtYXRpb25zKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIGNvbnRleHRbYF9fc3VwcGxlbWVudGFyeV9fJHtrZXl9X19gXSA9IHN1cHBsZW1lbnRhcnlJbmZvcm1hdGlvbnNba2V5XTtcbiAgICB9KTtcbiAgfVxuXG4gIGNvbnN0IGNvbXBsZXRlTmFtZSA9IG5vZGVJbnN0YW5jZUNvbXBsZXRlTmFtZShpbnN0YW5jZSk7XG5cbiAgaWYgKGNvbnRleHRbY29tcGxldGVOYW1lXSAhPSBudWxsICYmIHZhbGlkYXRpb24gJiYgdmFsaWRhdGlvbi5mb3JjZVZhbHVlKSB7XG4gICAgaW5zdGFuY2UudmFsdWUgPSBldmFsdWF0ZUV4cHJlc3Npb24odmFsaWRhdGlvbi5mb3JjZVZhbHVlLmNvbmRpdGlvbiwgY29udGV4dCk7XG4gICAgY29udGV4dFtjb21wbGV0ZU5hbWVdID0gaW5zdGFuY2UudmFsdWU7XG4gICAgY29udGV4dC4kdmFsdWUgPSBpbnN0YW5jZS52YWx1ZTtcbiAgfVxuXG4gIGluc3RhbmNlLnZhbGlkYXRpb25SZXN1bHRzID1cbiAgICAgIGV2YWx1YXRlVmFsaWRhdGlvbkdyb3VwKHZhbGlkYXRpb24sIGNvbnRleHRbY29tcGxldGVOYW1lXSwgY29udGV4dCk7XG4gIGluc3RhbmNlLnZhbGlkID0gaW5zdGFuY2UudmFsaWRhdGlvblJlc3VsdHMucmVkdWNlKFxuICAgICAgKHByZXY6IGJvb2xlYW4sIHg6IEFqZlZhbGlkYXRpb25SZXN1bHQpID0+IHByZXYgJiYgeC5yZXN1bHQsIHRydWUpO1xufVxuIl19