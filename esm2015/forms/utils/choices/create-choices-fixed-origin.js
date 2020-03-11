/**
 * @fileoverview added by tsickle
 * Generated from: src/core/forms/utils/choices/create-choices-fixed-origin.ts
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
import { createChoicesOrigin } from './create-choices-origin';
/**
 * @template T
 * @param {?} origin
 * @return {?}
 */
export function createChoicesFixedOrigin(origin) {
    /** @type {?} */
    const type = 'fixed';
    return Object.assign(Object.assign({}, createChoicesOrigin(Object.assign(Object.assign({}, origin), { type }))), { type });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLWNob2ljZXMtZml4ZWQtb3JpZ2luLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvZm9ybXMvdXRpbHMvY2hvaWNlcy9jcmVhdGUtY2hvaWNlcy1maXhlZC1vcmlnaW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF1QkEsT0FBTyxFQUF5QixtQkFBbUIsRUFBQyxNQUFNLHlCQUF5QixDQUFDOzs7Ozs7QUFLcEYsTUFBTSxVQUFVLHdCQUF3QixDQUNwQyxNQUFzQzs7VUFDbEMsSUFBSSxHQUFHLE9BQU87SUFDcEIsdUNBQVcsbUJBQW1CLGlDQUFLLE1BQU0sS0FBRSxJQUFJLElBQUUsS0FBRSxJQUFJLElBQUU7QUFDM0QsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZDaG9pY2VzRml4ZWRPcmlnaW59IGZyb20gJy4uLy4uL2ludGVyZmFjZS9jaG9pY2VzL2Nob2ljZXMtZml4ZWQtb3JpZ2luJztcbmltcG9ydCB7QWpmQ2hvaWNlc09yaWdpbkNyZWF0ZSwgY3JlYXRlQ2hvaWNlc09yaWdpbn0gZnJvbSAnLi9jcmVhdGUtY2hvaWNlcy1vcmlnaW4nO1xuXG5leHBvcnQgdHlwZSBBamZDaG9pY2VzRml4ZWRPcmlnaW5DcmVhdGU8VD4gPVxuICAgIE9taXQ8QWpmQ2hvaWNlc09yaWdpbkNyZWF0ZTxUPiwgJ3R5cGUnPiZQYXJ0aWFsPEFqZkNob2ljZXNGaXhlZE9yaWdpbjxUPj47XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVDaG9pY2VzRml4ZWRPcmlnaW48VCA9IHN0cmluZyB8IG51bWJlcj4oXG4gICAgb3JpZ2luOiBBamZDaG9pY2VzRml4ZWRPcmlnaW5DcmVhdGU8VD4pOiBBamZDaG9pY2VzRml4ZWRPcmlnaW48VD4ge1xuICBjb25zdCB0eXBlID0gJ2ZpeGVkJztcbiAgcmV0dXJuIHsuLi5jcmVhdGVDaG9pY2VzT3JpZ2luKHsuLi5vcmlnaW4sIHR5cGV9KSwgdHlwZX07XG59XG4iXX0=