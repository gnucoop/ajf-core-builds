/**
 * @fileoverview added by tsickle
 * Generated from: src/core/forms/interface/validation/validation-group.ts
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
/**
 * @record
 */
export function AjfValidationGroup() { }
if (false) {
    /** @type {?|undefined} */
    AjfValidationGroup.prototype.forceValue;
    /** @type {?|undefined} */
    AjfValidationGroup.prototype.maxValue;
    /** @type {?|undefined} */
    AjfValidationGroup.prototype.minValue;
    /** @type {?|undefined} */
    AjfValidationGroup.prototype.notEmpty;
    /** @type {?|undefined} */
    AjfValidationGroup.prototype.maxDigits;
    /** @type {?|undefined} */
    AjfValidationGroup.prototype.minDigits;
    /** @type {?} */
    AjfValidationGroup.prototype.conditions;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGlvbi1ncm91cC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2Zvcm1zL2ludGVyZmFjZS92YWxpZGF0aW9uL3ZhbGlkYXRpb24tZ3JvdXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUEwQkEsd0NBUUM7OztJQVBDLHdDQUEwQjs7SUFDMUIsc0NBQXlCOztJQUN6QixzQ0FBeUI7O0lBQ3pCLHNDQUF5Qjs7SUFDekIsdUNBQTBCOztJQUMxQix1Q0FBMEI7O0lBQzFCLHdDQUE0QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZDb25kaXRpb259IGZyb20gJ0BhamYvY29yZS9tb2RlbHMnO1xuXG5pbXBvcnQge0FqZlZhbGlkYXRpb259IGZyb20gJy4vdmFsaWRhdGlvbic7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQWpmVmFsaWRhdGlvbkdyb3VwIHtcbiAgZm9yY2VWYWx1ZT86IEFqZkNvbmRpdGlvbjtcbiAgbWF4VmFsdWU/OiBBamZWYWxpZGF0aW9uO1xuICBtaW5WYWx1ZT86IEFqZlZhbGlkYXRpb247XG4gIG5vdEVtcHR5PzogQWpmVmFsaWRhdGlvbjtcbiAgbWF4RGlnaXRzPzogQWpmVmFsaWRhdGlvbjtcbiAgbWluRGlnaXRzPzogQWpmVmFsaWRhdGlvbjtcbiAgY29uZGl0aW9uczogQWpmVmFsaWRhdGlvbltdO1xufVxuIl19