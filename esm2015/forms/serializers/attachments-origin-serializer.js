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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXR0YWNobWVudHMtb3JpZ2luLXNlcmlhbGl6ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9mb3Jtcy9zZXJpYWxpemVycy9hdHRhY2htZW50cy1vcmlnaW4tc2VyaWFsaXplci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXVCQSxPQUFPLEVBRUwsdUJBQXVCLEVBQ3hCLE1BQU0sZ0RBQWdELENBQUM7QUFFeEQsTUFBTSxPQUFPLDhCQUE4Qjs7Ozs7SUFDekMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUEwQztRQUN4RCxJQUFJLE1BQU0sQ0FBQyxJQUFJLElBQUksSUFBSSxFQUFFO1lBQ3ZCLE1BQU0sSUFBSSxLQUFLLENBQUMsOEJBQThCLENBQUMsQ0FBQztTQUNqRDtRQUNELE9BQU8sdUJBQXVCLENBQUMsbUJBQUEsTUFBTSxFQUFtQyxDQUFDLENBQUM7SUFDNUUsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkF0dGFjaG1lbnRzT3JpZ2lufSBmcm9tICcuLi9pbnRlcmZhY2UvYXR0YWNobWVudHMvYXR0YWNobWVudHMtb3JpZ2luJztcbmltcG9ydCB7XG4gIEFqZkF0dGFjaG1lbnRzT3JpZ2luQ3JlYXRlLFxuICBjcmVhdGVBdHRhY2htZW50c09yaWdpblxufSBmcm9tICcuLi91dGlscy9hdHRhY2htZW50cy9jcmVhdGUtYXR0YWNobWVudHMtb3JpZ2luJztcblxuZXhwb3J0IGNsYXNzIEFqZkF0dGFjaG1lbnRzT3JpZ2luU2VyaWFsaXplciB7XG4gIHN0YXRpYyBmcm9tSnNvbihvcmlnaW46IFBhcnRpYWw8QWpmQXR0YWNobWVudHNPcmlnaW48YW55Pj4pOiBBamZBdHRhY2htZW50c09yaWdpbjxhbnk+IHtcbiAgICBpZiAob3JpZ2luLm5hbWUgPT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdNYWxmb3JtZWQgYXR0YWNobWVudHMgb3JpZ2luJyk7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVBdHRhY2htZW50c09yaWdpbihvcmlnaW4gYXMgQWpmQXR0YWNobWVudHNPcmlnaW5DcmVhdGU8YW55Pik7XG4gIH1cbn1cbiJdfQ==