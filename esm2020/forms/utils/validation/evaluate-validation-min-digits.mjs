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
import { evaluateValidation } from './evaluate-validation';
/**
 * Basic validation function that cheecks the minimum digit's length.
 * minDigits is the associated AjfCondition
 */
export function evaluateValidationMinDigits(validation, value) {
    if (validation.minDigits == null) {
        return null;
    }
    const ctx = { '$value': value };
    if (typeof validation.minDigits === 'number') {
        return {
            result: evaluateExpression(`$value.toString().length >= ${validation.minDigits}`, ctx),
            error: `Digits count must be >= ${validation.minDigits}`,
            clientValidation: false,
        };
    }
    return evaluateValidation(validation.minDigits, ctx);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZhbHVhdGUtdmFsaWRhdGlvbi1taW4tZGlnaXRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9mb3Jtcy9zcmMvdXRpbHMvdmFsaWRhdGlvbi9ldmFsdWF0ZS12YWxpZGF0aW9uLW1pbi1kaWdpdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFHcEQsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFFekQ7OztHQUdHO0FBQ0gsTUFBTSxVQUFVLDJCQUEyQixDQUN6QyxVQUE4QixFQUM5QixLQUFVO0lBRVYsSUFBSSxVQUFVLENBQUMsU0FBUyxJQUFJLElBQUksRUFBRTtRQUNoQyxPQUFPLElBQUksQ0FBQztLQUNiO0lBQ0QsTUFBTSxHQUFHLEdBQUcsRUFBQyxRQUFRLEVBQUUsS0FBSyxFQUFDLENBQUM7SUFDOUIsSUFBSSxPQUFPLFVBQVUsQ0FBQyxTQUFTLEtBQUssUUFBUSxFQUFFO1FBQzVDLE9BQU87WUFDTCxNQUFNLEVBQUUsa0JBQWtCLENBQUMsK0JBQStCLFVBQVUsQ0FBQyxTQUFTLEVBQUUsRUFBRSxHQUFHLENBQUM7WUFDdEYsS0FBSyxFQUFFLDJCQUEyQixVQUFVLENBQUMsU0FBUyxFQUFFO1lBQ3hELGdCQUFnQixFQUFFLEtBQUs7U0FDeEIsQ0FBQztLQUNIO0lBQ0QsT0FBTyxrQkFBa0IsQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQ3ZELENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7ZXZhbHVhdGVFeHByZXNzaW9ufSBmcm9tICdAYWpmL2NvcmUvbW9kZWxzJztcbmltcG9ydCB7QWpmVmFsaWRhdGlvbkdyb3VwfSBmcm9tICcuLi8uLi9pbnRlcmZhY2UvdmFsaWRhdGlvbi92YWxpZGF0aW9uLWdyb3VwJztcbmltcG9ydCB7QWpmVmFsaWRhdGlvblJlc3VsdH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL3ZhbGlkYXRpb24vdmFsaWRhdGlvbi1yZXN1bHRzJztcbmltcG9ydCB7ZXZhbHVhdGVWYWxpZGF0aW9ufSBmcm9tICcuL2V2YWx1YXRlLXZhbGlkYXRpb24nO1xuXG4vKipcbiAqIEJhc2ljIHZhbGlkYXRpb24gZnVuY3Rpb24gdGhhdCBjaGVlY2tzIHRoZSBtaW5pbXVtIGRpZ2l0J3MgbGVuZ3RoLlxuICogbWluRGlnaXRzIGlzIHRoZSBhc3NvY2lhdGVkIEFqZkNvbmRpdGlvblxuICovXG5leHBvcnQgZnVuY3Rpb24gZXZhbHVhdGVWYWxpZGF0aW9uTWluRGlnaXRzKFxuICB2YWxpZGF0aW9uOiBBamZWYWxpZGF0aW9uR3JvdXAsXG4gIHZhbHVlOiBhbnksXG4pOiBBamZWYWxpZGF0aW9uUmVzdWx0IHwgbnVsbCB7XG4gIGlmICh2YWxpZGF0aW9uLm1pbkRpZ2l0cyA9PSBudWxsKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgY29uc3QgY3R4ID0geyckdmFsdWUnOiB2YWx1ZX07XG4gIGlmICh0eXBlb2YgdmFsaWRhdGlvbi5taW5EaWdpdHMgPT09ICdudW1iZXInKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3VsdDogZXZhbHVhdGVFeHByZXNzaW9uKGAkdmFsdWUudG9TdHJpbmcoKS5sZW5ndGggPj0gJHt2YWxpZGF0aW9uLm1pbkRpZ2l0c31gLCBjdHgpLFxuICAgICAgZXJyb3I6IGBEaWdpdHMgY291bnQgbXVzdCBiZSA+PSAke3ZhbGlkYXRpb24ubWluRGlnaXRzfWAsXG4gICAgICBjbGllbnRWYWxpZGF0aW9uOiBmYWxzZSxcbiAgICB9O1xuICB9XG4gIHJldHVybiBldmFsdWF0ZVZhbGlkYXRpb24odmFsaWRhdGlvbi5taW5EaWdpdHMsIGN0eCk7XG59XG4iXX0=