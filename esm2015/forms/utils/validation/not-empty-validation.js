/**
 * @fileoverview added by tsickle
 * Generated from: src/core/forms/utils/validation/not-empty-validation.ts
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
import { createValidation } from './create-validation';
/**
 * @return {?}
 */
export function notEmptyValidation() {
    return createValidation({ condition: `notEmpty($value)`, errorMessage: `Value must not be empty` });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90LWVtcHR5LXZhbGlkYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9mb3Jtcy91dGlscy92YWxpZGF0aW9uL25vdC1lbXB0eS12YWxpZGF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBdUJBLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHFCQUFxQixDQUFDOzs7O0FBRXJELE1BQU0sVUFBVSxrQkFBa0I7SUFDaEMsT0FBTyxnQkFBZ0IsQ0FBQyxFQUFDLFNBQVMsRUFBRSxrQkFBa0IsRUFBRSxZQUFZLEVBQUUseUJBQXlCLEVBQUMsQ0FBQyxDQUFDO0FBQ3BHLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmVmFsaWRhdGlvbn0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL3ZhbGlkYXRpb24vdmFsaWRhdGlvbic7XG5pbXBvcnQge2NyZWF0ZVZhbGlkYXRpb259IGZyb20gJy4vY3JlYXRlLXZhbGlkYXRpb24nO1xuXG5leHBvcnQgZnVuY3Rpb24gbm90RW1wdHlWYWxpZGF0aW9uKCk6IEFqZlZhbGlkYXRpb24ge1xuICByZXR1cm4gY3JlYXRlVmFsaWRhdGlvbih7Y29uZGl0aW9uOiBgbm90RW1wdHkoJHZhbHVlKWAsIGVycm9yTWVzc2FnZTogYFZhbHVlIG11c3Qgbm90IGJlIGVtcHR5YH0pO1xufVxuIl19