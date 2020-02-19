/**
 * @fileoverview added by tsickle
 * Generated from: src/core/forms/utils/choices/create-choices-fixed-origin.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLWNob2ljZXMtZml4ZWQtb3JpZ2luLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvZm9ybXMvdXRpbHMvY2hvaWNlcy9jcmVhdGUtY2hvaWNlcy1maXhlZC1vcmlnaW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF1QkEsT0FBTyxFQUF5QixtQkFBbUIsRUFBQyxNQUFNLHlCQUF5QixDQUFDOzs7Ozs7QUFLcEYsTUFBTSxVQUFVLHdCQUF3QixDQUNwQyxNQUFzQzs7VUFDbEMsSUFBSSxHQUFHLE9BQU87SUFDcEIsdUNBQVcsbUJBQW1CLGlDQUFLLE1BQU0sS0FBRSxJQUFJLElBQUUsS0FBRSxJQUFJLElBQUU7QUFDM0QsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgMjAxOCBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkNob2ljZXNGaXhlZE9yaWdpbn0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL2Nob2ljZXMvY2hvaWNlcy1maXhlZC1vcmlnaW4nO1xuaW1wb3J0IHtBamZDaG9pY2VzT3JpZ2luQ3JlYXRlLCBjcmVhdGVDaG9pY2VzT3JpZ2lufSBmcm9tICcuL2NyZWF0ZS1jaG9pY2VzLW9yaWdpbic7XG5cbmV4cG9ydCB0eXBlIEFqZkNob2ljZXNGaXhlZE9yaWdpbkNyZWF0ZTxUPiA9XG4gICAgT21pdDxBamZDaG9pY2VzT3JpZ2luQ3JlYXRlPFQ+LCAndHlwZSc+JlBhcnRpYWw8QWpmQ2hvaWNlc0ZpeGVkT3JpZ2luPFQ+PjtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUNob2ljZXNGaXhlZE9yaWdpbjxUID0gc3RyaW5nIHwgbnVtYmVyPihcbiAgICBvcmlnaW46IEFqZkNob2ljZXNGaXhlZE9yaWdpbkNyZWF0ZTxUPik6IEFqZkNob2ljZXNGaXhlZE9yaWdpbjxUPiB7XG4gIGNvbnN0IHR5cGUgPSAnZml4ZWQnO1xuICByZXR1cm4gey4uLmNyZWF0ZUNob2ljZXNPcmlnaW4oey4uLm9yaWdpbiwgdHlwZX0pLCB0eXBlfTtcbn1cbiJdfQ==