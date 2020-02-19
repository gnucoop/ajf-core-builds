/**
 * @fileoverview added by tsickle
 * Generated from: src/core/forms/serializers/choices-origin-serializer.ts
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
import { createChoicesOrigin } from '../utils/choices/create-choices-origin';
export class AjfChoicesOriginSerializer {
    /**
     * @param {?} origin
     * @return {?}
     */
    static fromJson(origin) {
        return createChoicesOrigin((/** @type {?} */ (Object.assign(Object.assign({}, origin), { type: origin.type || 'fixed', name: origin.name || '' }))));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hvaWNlcy1vcmlnaW4tc2VyaWFsaXplci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2Zvcm1zL3NlcmlhbGl6ZXJzL2Nob2ljZXMtb3JpZ2luLXNlcmlhbGl6ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF1QkEsT0FBTyxFQUF5QixtQkFBbUIsRUFBQyxNQUFNLHdDQUF3QyxDQUFDO0FBRW5HLE1BQU0sT0FBTywwQkFBMEI7Ozs7O0lBQ3JDLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBc0M7UUFDcEQsT0FBTyxtQkFBbUIsQ0FBTSxtREFDM0IsTUFBTSxLQUNULElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxJQUFJLE9BQU8sRUFDNUIsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLElBQUksRUFBRSxLQUNPLENBQUMsQ0FBQztJQUNwQyxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTggR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZDaG9pY2VzT3JpZ2lufSBmcm9tICcuLi9pbnRlcmZhY2UvY2hvaWNlcy9jaG9pY2VzLW9yaWdpbic7XG5pbXBvcnQge0FqZkNob2ljZXNPcmlnaW5DcmVhdGUsIGNyZWF0ZUNob2ljZXNPcmlnaW59IGZyb20gJy4uL3V0aWxzL2Nob2ljZXMvY3JlYXRlLWNob2ljZXMtb3JpZ2luJztcblxuZXhwb3J0IGNsYXNzIEFqZkNob2ljZXNPcmlnaW5TZXJpYWxpemVyIHtcbiAgc3RhdGljIGZyb21Kc29uKG9yaWdpbjogUGFydGlhbDxBamZDaG9pY2VzT3JpZ2luPGFueT4+KTogQWpmQ2hvaWNlc09yaWdpbjxhbnk+IHtcbiAgICByZXR1cm4gY3JlYXRlQ2hvaWNlc09yaWdpbjxhbnk+KHtcbiAgICAgIC4uLm9yaWdpbixcbiAgICAgIHR5cGU6IG9yaWdpbi50eXBlIHx8ICdmaXhlZCcsXG4gICAgICBuYW1lOiBvcmlnaW4ubmFtZSB8fCAnJyxcbiAgICB9IGFzIEFqZkNob2ljZXNPcmlnaW5DcmVhdGU8YW55Pik7XG4gIH1cbn1cbiJdfQ==