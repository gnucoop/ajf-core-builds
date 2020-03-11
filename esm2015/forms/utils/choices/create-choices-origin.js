/**
 * @fileoverview added by tsickle
 * Generated from: src/core/forms/utils/choices/create-choices-origin.ts
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
export function createChoicesOrigin(origin) {
    return Object.assign(Object.assign({}, origin), { type: origin.type, label: origin.label || '', choices: origin.choices || [] });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLWNob2ljZXMtb3JpZ2luLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvZm9ybXMvdXRpbHMvY2hvaWNlcy9jcmVhdGUtY2hvaWNlcy1vcmlnaW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTJCQSxNQUFNLFVBQVUsbUJBQW1CLENBQUksTUFBaUM7SUFDdEUsdUNBQ0ssTUFBTSxLQUNULElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxFQUNqQixLQUFLLEVBQUUsTUFBTSxDQUFDLEtBQUssSUFBSSxFQUFFLEVBQ3pCLE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTyxJQUFJLEVBQUUsSUFDN0I7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkNob2ljZXNPcmlnaW59IGZyb20gJy4uLy4uL2ludGVyZmFjZS9jaG9pY2VzL2Nob2ljZXMtb3JpZ2luJztcblxuZXhwb3J0IHR5cGUgQWpmQ2hvaWNlc09yaWdpbkNyZWF0ZTxUPiA9XG4gICAgUGljazxBamZDaG9pY2VzT3JpZ2luPGFueT4sICd0eXBlJ3wnbmFtZSc+JlBhcnRpYWw8QWpmQ2hvaWNlc09yaWdpbjxUPj47XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVDaG9pY2VzT3JpZ2luPFQ+KG9yaWdpbjogQWpmQ2hvaWNlc09yaWdpbkNyZWF0ZTxUPik6IEFqZkNob2ljZXNPcmlnaW48VD4ge1xuICByZXR1cm4ge1xuICAgIC4uLm9yaWdpbixcbiAgICB0eXBlOiBvcmlnaW4udHlwZSxcbiAgICBsYWJlbDogb3JpZ2luLmxhYmVsIHx8ICcnLFxuICAgIGNob2ljZXM6IG9yaWdpbi5jaG9pY2VzIHx8IFtdLFxuICB9O1xufVxuIl19