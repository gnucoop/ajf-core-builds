/**
 * @fileoverview added by tsickle
 * Generated from: src/core/forms/utils/validation/evaluate-validation-not-empty.ts
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
import { evaluateValidation } from './evaluate-validation';
/**
 * @param {?} validation
 * @param {?} value
 * @return {?}
 */
export function evaluateValidationNotEmpty(validation, value) {
    if (validation.notEmpty == null) {
        return null;
    }
    /** @type {?} */
    const ctx = { '$value': value };
    if (typeof validation.notEmpty === 'boolean') {
        return {
            result: evaluateExpression(`($value != null) === ${validation.notEmpty}`, ctx),
            error: 'Value must not be empty',
            clientValidation: false
        };
    }
    return evaluateValidation(validation.notEmpty, ctx);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZhbHVhdGUtdmFsaWRhdGlvbi1ub3QtZW1wdHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9mb3Jtcy91dGlscy92YWxpZGF0aW9uL2V2YWx1YXRlLXZhbGlkYXRpb24tbm90LWVtcHR5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBR3BELE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLHVCQUF1QixDQUFDOzs7Ozs7QUFFekQsTUFBTSxVQUFVLDBCQUEwQixDQUN0QyxVQUE4QixFQUFFLEtBQVU7SUFDNUMsSUFBSSxVQUFVLENBQUMsUUFBUSxJQUFJLElBQUksRUFBRTtRQUMvQixPQUFPLElBQUksQ0FBQztLQUNiOztVQUNLLEdBQUcsR0FBRyxFQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUM7SUFDN0IsSUFBSSxPQUFPLFVBQVUsQ0FBQyxRQUFRLEtBQUssU0FBUyxFQUFFO1FBQzVDLE9BQU87WUFDTCxNQUFNLEVBQUUsa0JBQWtCLENBQUMsd0JBQXdCLFVBQVUsQ0FBQyxRQUFRLEVBQUUsRUFBRSxHQUFHLENBQUM7WUFDOUUsS0FBSyxFQUFFLHlCQUF5QjtZQUNoQyxnQkFBZ0IsRUFBRSxLQUFLO1NBQ3hCLENBQUM7S0FDSDtJQUNELE9BQU8sa0JBQWtCLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUN0RCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge2V2YWx1YXRlRXhwcmVzc2lvbn0gZnJvbSAnQGFqZi9jb3JlL21vZGVscyc7XG5pbXBvcnQge0FqZlZhbGlkYXRpb25Hcm91cH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL3ZhbGlkYXRpb24vdmFsaWRhdGlvbi1ncm91cCc7XG5pbXBvcnQge0FqZlZhbGlkYXRpb25SZXN1bHR9IGZyb20gJy4uLy4uL2ludGVyZmFjZS92YWxpZGF0aW9uL3ZhbGlkYXRpb24tcmVzdWx0cyc7XG5pbXBvcnQge2V2YWx1YXRlVmFsaWRhdGlvbn0gZnJvbSAnLi9ldmFsdWF0ZS12YWxpZGF0aW9uJztcblxuZXhwb3J0IGZ1bmN0aW9uIGV2YWx1YXRlVmFsaWRhdGlvbk5vdEVtcHR5KFxuICAgIHZhbGlkYXRpb246IEFqZlZhbGlkYXRpb25Hcm91cCwgdmFsdWU6IGFueSk6IEFqZlZhbGlkYXRpb25SZXN1bHR8bnVsbCB7XG4gIGlmICh2YWxpZGF0aW9uLm5vdEVtcHR5ID09IG51bGwpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICBjb25zdCBjdHggPSB7JyR2YWx1ZSc6IHZhbHVlfTtcbiAgaWYgKHR5cGVvZiB2YWxpZGF0aW9uLm5vdEVtcHR5ID09PSAnYm9vbGVhbicpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdWx0OiBldmFsdWF0ZUV4cHJlc3Npb24oYCgkdmFsdWUgIT0gbnVsbCkgPT09ICR7dmFsaWRhdGlvbi5ub3RFbXB0eX1gLCBjdHgpLFxuICAgICAgZXJyb3I6ICdWYWx1ZSBtdXN0IG5vdCBiZSBlbXB0eScsXG4gICAgICBjbGllbnRWYWxpZGF0aW9uOiBmYWxzZVxuICAgIH07XG4gIH1cbiAgcmV0dXJuIGV2YWx1YXRlVmFsaWRhdGlvbih2YWxpZGF0aW9uLm5vdEVtcHR5LCBjdHgpO1xufVxuIl19