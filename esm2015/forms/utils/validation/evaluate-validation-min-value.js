/**
 * @fileoverview added by tsickle
 * Generated from: src/core/forms/utils/validation/evaluate-validation-min-value.ts
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
import { evaluateValidation } from './evaluate-validation';
/**
 * @param {?} validation
 * @param {?} value
 * @return {?}
 */
export function evaluateValidationMinValue(validation, value) {
    if (validation.minValue == null) {
        return null;
    }
    /** @type {?} */
    const ctx = { '$value': value };
    if (typeof validation.minValue === 'number') {
        return {
            result: evaluateExpression(`$value.length <= ${validation.minValue}`, ctx),
            error: `Value must be >= ${validation.minValue}`,
            clientValidation: false
        };
    }
    return evaluateValidation(validation.minValue, { '$value': value });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZhbHVhdGUtdmFsaWRhdGlvbi1taW4tdmFsdWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9mb3Jtcy91dGlscy92YWxpZGF0aW9uL2V2YWx1YXRlLXZhbGlkYXRpb24tbWluLXZhbHVlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBR3BELE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLHVCQUF1QixDQUFDOzs7Ozs7QUFFekQsTUFBTSxVQUFVLDBCQUEwQixDQUN0QyxVQUE4QixFQUFFLEtBQVU7SUFDNUMsSUFBSSxVQUFVLENBQUMsUUFBUSxJQUFJLElBQUksRUFBRTtRQUMvQixPQUFPLElBQUksQ0FBQztLQUNiOztVQUNLLEdBQUcsR0FBRyxFQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUM7SUFDN0IsSUFBSSxPQUFPLFVBQVUsQ0FBQyxRQUFRLEtBQUssUUFBUSxFQUFFO1FBQzNDLE9BQU87WUFDTCxNQUFNLEVBQUUsa0JBQWtCLENBQUMsb0JBQW9CLFVBQVUsQ0FBQyxRQUFRLEVBQUUsRUFBRSxHQUFHLENBQUM7WUFDMUUsS0FBSyxFQUFFLG9CQUFvQixVQUFVLENBQUMsUUFBUSxFQUFFO1lBQ2hELGdCQUFnQixFQUFFLEtBQUs7U0FDeEIsQ0FBQztLQUNIO0lBQ0QsT0FBTyxrQkFBa0IsQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLEVBQUMsUUFBUSxFQUFFLEtBQUssRUFBQyxDQUFDLENBQUM7QUFDcEUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgMjAxOCBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge2V2YWx1YXRlRXhwcmVzc2lvbn0gZnJvbSAnQGFqZi9jb3JlL21vZGVscyc7XG5pbXBvcnQge0FqZlZhbGlkYXRpb25Hcm91cH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL3ZhbGlkYXRpb24vdmFsaWRhdGlvbi1ncm91cCc7XG5pbXBvcnQge0FqZlZhbGlkYXRpb25SZXN1bHR9IGZyb20gJy4uLy4uL2ludGVyZmFjZS92YWxpZGF0aW9uL3ZhbGlkYXRpb24tcmVzdWx0cyc7XG5pbXBvcnQge2V2YWx1YXRlVmFsaWRhdGlvbn0gZnJvbSAnLi9ldmFsdWF0ZS12YWxpZGF0aW9uJztcblxuZXhwb3J0IGZ1bmN0aW9uIGV2YWx1YXRlVmFsaWRhdGlvbk1pblZhbHVlKFxuICAgIHZhbGlkYXRpb246IEFqZlZhbGlkYXRpb25Hcm91cCwgdmFsdWU6IGFueSk6IEFqZlZhbGlkYXRpb25SZXN1bHR8bnVsbCB7XG4gIGlmICh2YWxpZGF0aW9uLm1pblZhbHVlID09IG51bGwpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICBjb25zdCBjdHggPSB7JyR2YWx1ZSc6IHZhbHVlfTtcbiAgaWYgKHR5cGVvZiB2YWxpZGF0aW9uLm1pblZhbHVlID09PSAnbnVtYmVyJykge1xuICAgIHJldHVybiB7XG4gICAgICByZXN1bHQ6IGV2YWx1YXRlRXhwcmVzc2lvbihgJHZhbHVlLmxlbmd0aCA8PSAke3ZhbGlkYXRpb24ubWluVmFsdWV9YCwgY3R4KSxcbiAgICAgIGVycm9yOiBgVmFsdWUgbXVzdCBiZSA+PSAke3ZhbGlkYXRpb24ubWluVmFsdWV9YCxcbiAgICAgIGNsaWVudFZhbGlkYXRpb246IGZhbHNlXG4gICAgfTtcbiAgfVxuICByZXR1cm4gZXZhbHVhdGVWYWxpZGF0aW9uKHZhbGlkYXRpb24ubWluVmFsdWUsIHsnJHZhbHVlJzogdmFsdWV9KTtcbn1cbiJdfQ==