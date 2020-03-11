/**
 * @fileoverview added by tsickle
 * Generated from: src/core/forms/utils/attachments/create-attachments-origin.ts
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
 * @template T
 * @param {?} origin
 * @return {?}
 */
export function createAttachmentsOrigin(origin) {
    return Object.assign(Object.assign({}, origin), { attachments: origin.attachments || [] });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLWF0dGFjaG1lbnRzLW9yaWdpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2Zvcm1zL3V0aWxzL2F0dGFjaG1lbnRzL2NyZWF0ZS1hdHRhY2htZW50cy1vcmlnaW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTJCQSxNQUFNLFVBQVUsdUJBQXVCLENBQUksTUFBcUM7SUFFOUUsdUNBQ0ssTUFBTSxLQUNULFdBQVcsRUFBRSxNQUFNLENBQUMsV0FBVyxJQUFJLEVBQUUsSUFDckM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkF0dGFjaG1lbnRzT3JpZ2lufSBmcm9tICcuLi8uLi9pbnRlcmZhY2UvYXR0YWNobWVudHMvYXR0YWNobWVudHMtb3JpZ2luJztcblxuZXhwb3J0IHR5cGUgQWpmQXR0YWNobWVudHNPcmlnaW5DcmVhdGU8VD4gPVxuICAgIFBpY2s8QWpmQXR0YWNobWVudHNPcmlnaW48VD4sICduYW1lJz4mUGFydGlhbDxBamZBdHRhY2htZW50c09yaWdpbjxUPj47XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVBdHRhY2htZW50c09yaWdpbjxUPihvcmlnaW46IEFqZkF0dGFjaG1lbnRzT3JpZ2luQ3JlYXRlPFQ+KTpcbiAgICBBamZBdHRhY2htZW50c09yaWdpbjxUPiB7XG4gIHJldHVybiB7XG4gICAgLi4ub3JpZ2luLFxuICAgIGF0dGFjaG1lbnRzOiBvcmlnaW4uYXR0YWNobWVudHMgfHwgW10sXG4gIH07XG59XG4iXX0=