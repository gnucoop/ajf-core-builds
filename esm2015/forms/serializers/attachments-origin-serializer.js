/**
 * @fileoverview added by tsickle
 * Generated from: src/core/forms/serializers/attachments-origin-serializer.ts
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
import { createAttachmentsOrigin } from '../utils/attachments/create-attachments-origin';
export class AjfAttachmentsOriginSerializer {
    /**
     * @param {?} origin
     * @return {?}
     */
    static fromJson(origin) {
        if (origin.name == null) {
            throw new Error('Malformed attachments origin');
        }
        return createAttachmentsOrigin((/** @type {?} */ (origin)));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXR0YWNobWVudHMtb3JpZ2luLXNlcmlhbGl6ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9mb3Jtcy9zZXJpYWxpemVycy9hdHRhY2htZW50cy1vcmlnaW4tc2VyaWFsaXplci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXVCQSxPQUFPLEVBQ3VCLHVCQUF1QixFQUNwRCxNQUFNLGdEQUFnRCxDQUFDO0FBRXhELE1BQU0sT0FBTyw4QkFBOEI7Ozs7O0lBQ3pDLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBMEM7UUFDeEQsSUFBSSxNQUFNLENBQUMsSUFBSSxJQUFJLElBQUksRUFBRTtZQUN2QixNQUFNLElBQUksS0FBSyxDQUFDLDhCQUE4QixDQUFDLENBQUM7U0FDakQ7UUFDRCxPQUFPLHVCQUF1QixDQUFDLG1CQUFBLE1BQU0sRUFBbUMsQ0FBQyxDQUFDO0lBQzVFLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZBdHRhY2htZW50c09yaWdpbn0gZnJvbSAnLi4vaW50ZXJmYWNlL2F0dGFjaG1lbnRzL2F0dGFjaG1lbnRzLW9yaWdpbic7XG5pbXBvcnQge1xuICBBamZBdHRhY2htZW50c09yaWdpbkNyZWF0ZSwgY3JlYXRlQXR0YWNobWVudHNPcmlnaW5cbn0gZnJvbSAnLi4vdXRpbHMvYXR0YWNobWVudHMvY3JlYXRlLWF0dGFjaG1lbnRzLW9yaWdpbic7XG5cbmV4cG9ydCBjbGFzcyBBamZBdHRhY2htZW50c09yaWdpblNlcmlhbGl6ZXIge1xuICBzdGF0aWMgZnJvbUpzb24ob3JpZ2luOiBQYXJ0aWFsPEFqZkF0dGFjaG1lbnRzT3JpZ2luPGFueT4+KTogQWpmQXR0YWNobWVudHNPcmlnaW48YW55PiB7XG4gICAgaWYgKG9yaWdpbi5uYW1lID09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTWFsZm9ybWVkIGF0dGFjaG1lbnRzIG9yaWdpbicpO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQXR0YWNobWVudHNPcmlnaW4ob3JpZ2luIGFzIEFqZkF0dGFjaG1lbnRzT3JpZ2luQ3JlYXRlPGFueT4pO1xuICB9XG59XG4iXX0=