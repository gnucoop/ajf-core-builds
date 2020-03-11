/**
 * @fileoverview added by tsickle
 * Generated from: src/core/forms/utils/validation/evaluate-validation-max-value.ts
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
export function evaluateValidationMaxValue(validation, value) {
    if (validation.maxValue == null) {
        return null;
    }
    /** @type {?} */
    const ctx = { '$value': value };
    if (typeof validation.maxValue === 'number') {
        return {
            result: evaluateExpression(`$value.length <= ${validation.maxValue}`, ctx),
            error: `Value must be <= ${validation.maxValue}`,
            clientValidation: false
        };
    }
    return evaluateValidation(validation.maxValue, { '$value': value });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZhbHVhdGUtdmFsaWRhdGlvbi1tYXgtdmFsdWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9mb3Jtcy91dGlscy92YWxpZGF0aW9uL2V2YWx1YXRlLXZhbGlkYXRpb24tbWF4LXZhbHVlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBR3BELE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLHVCQUF1QixDQUFDOzs7Ozs7QUFFekQsTUFBTSxVQUFVLDBCQUEwQixDQUN0QyxVQUE4QixFQUFFLEtBQVU7SUFDNUMsSUFBSSxVQUFVLENBQUMsUUFBUSxJQUFJLElBQUksRUFBRTtRQUMvQixPQUFPLElBQUksQ0FBQztLQUNiOztVQUNLLEdBQUcsR0FBRyxFQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUM7SUFDN0IsSUFBSSxPQUFPLFVBQVUsQ0FBQyxRQUFRLEtBQUssUUFBUSxFQUFFO1FBQzNDLE9BQU87WUFDTCxNQUFNLEVBQUUsa0JBQWtCLENBQUMsb0JBQW9CLFVBQVUsQ0FBQyxRQUFRLEVBQUUsRUFBRSxHQUFHLENBQUM7WUFDMUUsS0FBSyxFQUFFLG9CQUFvQixVQUFVLENBQUMsUUFBUSxFQUFFO1lBQ2hELGdCQUFnQixFQUFFLEtBQUs7U0FDeEIsQ0FBQztLQUNIO0lBQ0QsT0FBTyxrQkFBa0IsQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLEVBQUMsUUFBUSxFQUFFLEtBQUssRUFBQyxDQUFDLENBQUM7QUFDcEUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtldmFsdWF0ZUV4cHJlc3Npb259IGZyb20gJ0BhamYvY29yZS9tb2RlbHMnO1xuaW1wb3J0IHtBamZWYWxpZGF0aW9uR3JvdXB9IGZyb20gJy4uLy4uL2ludGVyZmFjZS92YWxpZGF0aW9uL3ZhbGlkYXRpb24tZ3JvdXAnO1xuaW1wb3J0IHtBamZWYWxpZGF0aW9uUmVzdWx0fSBmcm9tICcuLi8uLi9pbnRlcmZhY2UvdmFsaWRhdGlvbi92YWxpZGF0aW9uLXJlc3VsdHMnO1xuaW1wb3J0IHtldmFsdWF0ZVZhbGlkYXRpb259IGZyb20gJy4vZXZhbHVhdGUtdmFsaWRhdGlvbic7XG5cbmV4cG9ydCBmdW5jdGlvbiBldmFsdWF0ZVZhbGlkYXRpb25NYXhWYWx1ZShcbiAgICB2YWxpZGF0aW9uOiBBamZWYWxpZGF0aW9uR3JvdXAsIHZhbHVlOiBhbnkpOiBBamZWYWxpZGF0aW9uUmVzdWx0fG51bGwge1xuICBpZiAodmFsaWRhdGlvbi5tYXhWYWx1ZSA9PSBudWxsKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgY29uc3QgY3R4ID0geyckdmFsdWUnOiB2YWx1ZX07XG4gIGlmICh0eXBlb2YgdmFsaWRhdGlvbi5tYXhWYWx1ZSA9PT0gJ251bWJlcicpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdWx0OiBldmFsdWF0ZUV4cHJlc3Npb24oYCR2YWx1ZS5sZW5ndGggPD0gJHt2YWxpZGF0aW9uLm1heFZhbHVlfWAsIGN0eCksXG4gICAgICBlcnJvcjogYFZhbHVlIG11c3QgYmUgPD0gJHt2YWxpZGF0aW9uLm1heFZhbHVlfWAsXG4gICAgICBjbGllbnRWYWxpZGF0aW9uOiBmYWxzZVxuICAgIH07XG4gIH1cbiAgcmV0dXJuIGV2YWx1YXRlVmFsaWRhdGlvbih2YWxpZGF0aW9uLm1heFZhbHVlLCB7JyR2YWx1ZSc6IHZhbHVlfSk7XG59XG4iXX0=