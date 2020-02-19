/**
 * @fileoverview added by tsickle
 * Generated from: src/core/forms/utils/fields-instances/update-validation.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLXZhbGlkYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9mb3Jtcy91dGlscy9maWVsZHMtaW5zdGFuY2VzL3VwZGF0ZS12YWxpZGF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBLE9BQU8sRUFBYSxrQkFBa0IsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBSWhFLE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLGdEQUFnRCxDQUFDO0FBQ3hGLE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLHlDQUF5QyxDQUFDOzs7Ozs7O0FBRWhGLE1BQU0sVUFBVSxnQkFBZ0IsQ0FDNUIsUUFBMEIsRUFBRSxPQUFtQixFQUFFLHlCQUErQjs7VUFDNUUsVUFBVSxHQUFHLFFBQVEsQ0FBQyxVQUFVO0lBQ3RDLElBQUksVUFBVSxJQUFJLElBQUksRUFBRTtRQUN0QixRQUFRLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUN0QixPQUFPO0tBQ1I7SUFFRCxJQUFJLHlCQUF5QixFQUFFO1FBQzdCLE1BQU0sQ0FBQyxJQUFJLENBQUMseUJBQXlCLENBQUMsQ0FBQyxPQUFPOzs7O1FBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUNyRCxPQUFPLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLEdBQUcseUJBQXlCLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDeEUsQ0FBQyxFQUFDLENBQUM7S0FDSjs7VUFFSyxZQUFZLEdBQUcsd0JBQXdCLENBQUMsUUFBUSxDQUFDO0lBRXZELElBQUksT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLElBQUksSUFBSSxVQUFVLElBQUksVUFBVSxDQUFDLFVBQVUsRUFBRTtRQUN4RSxRQUFRLENBQUMsS0FBSyxHQUFHLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQzlFLE9BQU8sQ0FBQyxZQUFZLENBQUMsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDO1FBQ3ZDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQztLQUNqQztJQUVELFFBQVEsQ0FBQyxpQkFBaUI7UUFDdEIsdUJBQXVCLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxZQUFZLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUN4RSxRQUFRLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNOzs7OztJQUM5QyxDQUFDLElBQWEsRUFBRSxDQUFzQixFQUFFLEVBQUUsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLE1BQU0sR0FBRSxJQUFJLENBQUMsQ0FBQztBQUN6RSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSAyMDE4IEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmQ29udGV4dCwgZXZhbHVhdGVFeHByZXNzaW9ufSBmcm9tICdAYWpmL2NvcmUvbW9kZWxzJztcblxuaW1wb3J0IHtBamZGaWVsZEluc3RhbmNlfSBmcm9tICcuLi8uLi9pbnRlcmZhY2UvZmllbGRzLWluc3RhbmNlcy9maWVsZC1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZlZhbGlkYXRpb25SZXN1bHR9IGZyb20gJy4uLy4uL2ludGVyZmFjZS92YWxpZGF0aW9uL3ZhbGlkYXRpb24tcmVzdWx0cyc7XG5pbXBvcnQge25vZGVJbnN0YW5jZUNvbXBsZXRlTmFtZX0gZnJvbSAnLi4vbm9kZXMtaW5zdGFuY2VzL25vZGUtaW5zdGFuY2UtY29tcGxldGUtbmFtZSc7XG5pbXBvcnQge2V2YWx1YXRlVmFsaWRhdGlvbkdyb3VwfSBmcm9tICcuLi92YWxpZGF0aW9uL2V2YWx1YXRlLXZhbGlkYXRpb24tZ3JvdXAnO1xuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlVmFsaWRhdGlvbihcbiAgICBpbnN0YW5jZTogQWpmRmllbGRJbnN0YW5jZSwgY29udGV4dDogQWpmQ29udGV4dCwgc3VwcGxlbWVudGFyeUluZm9ybWF0aW9ucz86IGFueSk6IHZvaWQge1xuICBjb25zdCB2YWxpZGF0aW9uID0gaW5zdGFuY2UudmFsaWRhdGlvbjtcbiAgaWYgKHZhbGlkYXRpb24gPT0gbnVsbCkge1xuICAgIGluc3RhbmNlLnZhbGlkID0gdHJ1ZTtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoc3VwcGxlbWVudGFyeUluZm9ybWF0aW9ucykge1xuICAgIE9iamVjdC5rZXlzKHN1cHBsZW1lbnRhcnlJbmZvcm1hdGlvbnMpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgY29udGV4dFtgX19zdXBwbGVtZW50YXJ5X18ke2tleX1fX2BdID0gc3VwcGxlbWVudGFyeUluZm9ybWF0aW9uc1trZXldO1xuICAgIH0pO1xuICB9XG5cbiAgY29uc3QgY29tcGxldGVOYW1lID0gbm9kZUluc3RhbmNlQ29tcGxldGVOYW1lKGluc3RhbmNlKTtcblxuICBpZiAoY29udGV4dFtjb21wbGV0ZU5hbWVdICE9IG51bGwgJiYgdmFsaWRhdGlvbiAmJiB2YWxpZGF0aW9uLmZvcmNlVmFsdWUpIHtcbiAgICBpbnN0YW5jZS52YWx1ZSA9IGV2YWx1YXRlRXhwcmVzc2lvbih2YWxpZGF0aW9uLmZvcmNlVmFsdWUuY29uZGl0aW9uLCBjb250ZXh0KTtcbiAgICBjb250ZXh0W2NvbXBsZXRlTmFtZV0gPSBpbnN0YW5jZS52YWx1ZTtcbiAgICBjb250ZXh0LiR2YWx1ZSA9IGluc3RhbmNlLnZhbHVlO1xuICB9XG5cbiAgaW5zdGFuY2UudmFsaWRhdGlvblJlc3VsdHMgPVxuICAgICAgZXZhbHVhdGVWYWxpZGF0aW9uR3JvdXAodmFsaWRhdGlvbiwgY29udGV4dFtjb21wbGV0ZU5hbWVdLCBjb250ZXh0KTtcbiAgaW5zdGFuY2UudmFsaWQgPSBpbnN0YW5jZS52YWxpZGF0aW9uUmVzdWx0cy5yZWR1Y2UoXG4gICAgICAocHJldjogYm9vbGVhbiwgeDogQWpmVmFsaWRhdGlvblJlc3VsdCkgPT4gcHJldiAmJiB4LnJlc3VsdCwgdHJ1ZSk7XG59XG4iXX0=