/**
 * @fileoverview added by tsickle
 * Generated from: src/core/forms/utils/validation/evaluate-validation-min-digits.ts
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
export function evaluateValidationMinDigits(validation, value) {
    if (validation.minDigits == null) {
        return null;
    }
    /** @type {?} */
    const ctx = { '$value': value };
    if (typeof validation.minDigits === 'number') {
        return {
            result: evaluateExpression(`$value.toString().length >= ${validation.minDigits}`, ctx),
            error: `Digits count must be >= ${validation.minDigits}`,
            clientValidation: false
        };
    }
    return evaluateValidation(validation.minDigits, ctx);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZhbHVhdGUtdmFsaWRhdGlvbi1taW4tZGlnaXRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvZm9ybXMvdXRpbHMvdmFsaWRhdGlvbi9ldmFsdWF0ZS12YWxpZGF0aW9uLW1pbi1kaWdpdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzQkEsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFHcEQsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7Ozs7OztBQUV6RCxNQUFNLFVBQVUsMkJBQTJCLENBQ3ZDLFVBQThCLEVBQUUsS0FBVTtJQUM1QyxJQUFJLFVBQVUsQ0FBQyxTQUFTLElBQUksSUFBSSxFQUFFO1FBQ2hDLE9BQU8sSUFBSSxDQUFDO0tBQ2I7O1VBQ0ssR0FBRyxHQUFHLEVBQUMsUUFBUSxFQUFFLEtBQUssRUFBQztJQUM3QixJQUFJLE9BQU8sVUFBVSxDQUFDLFNBQVMsS0FBSyxRQUFRLEVBQUU7UUFDNUMsT0FBTztZQUNMLE1BQU0sRUFBRSxrQkFBa0IsQ0FBQywrQkFBK0IsVUFBVSxDQUFDLFNBQVMsRUFBRSxFQUFFLEdBQUcsQ0FBQztZQUN0RixLQUFLLEVBQUUsMkJBQTJCLFVBQVUsQ0FBQyxTQUFTLEVBQUU7WUFDeEQsZ0JBQWdCLEVBQUUsS0FBSztTQUN4QixDQUFDO0tBQ0g7SUFDRCxPQUFPLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDdkQsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtldmFsdWF0ZUV4cHJlc3Npb259IGZyb20gJ0BhamYvY29yZS9tb2RlbHMnO1xuaW1wb3J0IHtBamZWYWxpZGF0aW9uR3JvdXB9IGZyb20gJy4uLy4uL2ludGVyZmFjZS92YWxpZGF0aW9uL3ZhbGlkYXRpb24tZ3JvdXAnO1xuaW1wb3J0IHtBamZWYWxpZGF0aW9uUmVzdWx0fSBmcm9tICcuLi8uLi9pbnRlcmZhY2UvdmFsaWRhdGlvbi92YWxpZGF0aW9uLXJlc3VsdHMnO1xuaW1wb3J0IHtldmFsdWF0ZVZhbGlkYXRpb259IGZyb20gJy4vZXZhbHVhdGUtdmFsaWRhdGlvbic7XG5cbmV4cG9ydCBmdW5jdGlvbiBldmFsdWF0ZVZhbGlkYXRpb25NaW5EaWdpdHMoXG4gICAgdmFsaWRhdGlvbjogQWpmVmFsaWRhdGlvbkdyb3VwLCB2YWx1ZTogYW55KTogQWpmVmFsaWRhdGlvblJlc3VsdHxudWxsIHtcbiAgaWYgKHZhbGlkYXRpb24ubWluRGlnaXRzID09IG51bGwpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICBjb25zdCBjdHggPSB7JyR2YWx1ZSc6IHZhbHVlfTtcbiAgaWYgKHR5cGVvZiB2YWxpZGF0aW9uLm1pbkRpZ2l0cyA9PT0gJ251bWJlcicpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdWx0OiBldmFsdWF0ZUV4cHJlc3Npb24oYCR2YWx1ZS50b1N0cmluZygpLmxlbmd0aCA+PSAke3ZhbGlkYXRpb24ubWluRGlnaXRzfWAsIGN0eCksXG4gICAgICBlcnJvcjogYERpZ2l0cyBjb3VudCBtdXN0IGJlID49ICR7dmFsaWRhdGlvbi5taW5EaWdpdHN9YCxcbiAgICAgIGNsaWVudFZhbGlkYXRpb246IGZhbHNlXG4gICAgfTtcbiAgfVxuICByZXR1cm4gZXZhbHVhdGVWYWxpZGF0aW9uKHZhbGlkYXRpb24ubWluRGlnaXRzLCBjdHgpO1xufVxuIl19