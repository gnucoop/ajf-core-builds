/**
 * @fileoverview added by tsickle
 * Generated from: src/core/forms/utils/choices/create-choices-observable-origin.ts
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
export function createChoicesObservableOrigin(origin) {
    return Object.assign(Object.assign({}, origin), { type: 'observable', label: origin.label || '', choices: origin.choices || [] });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLWNob2ljZXMtb2JzZXJ2YWJsZS1vcmlnaW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9mb3Jtcy91dGlscy9jaG9pY2VzL2NyZWF0ZS1jaG9pY2VzLW9ic2VydmFibGUtb3JpZ2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE0QkEsTUFBTSxVQUFVLDZCQUE2QixDQUFJLE1BQTJDO0lBRTFGLHVDQUNLLE1BQU0sS0FDVCxJQUFJLEVBQUUsWUFBWSxFQUNsQixLQUFLLEVBQUUsTUFBTSxDQUFDLEtBQUssSUFBSSxFQUFFLEVBQ3pCLE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTyxJQUFJLEVBQUUsSUFDN0I7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkNob2ljZXNPYnNlcnZhYmxlT3JpZ2lufSBmcm9tICcuLi8uLi9pbnRlcmZhY2UvY2hvaWNlcy9jaG9pY2VzLW9ic2VydmFibGUtb3JpZ2luJztcbmltcG9ydCB7QWpmQ2hvaWNlc09yaWdpbkNyZWF0ZX0gZnJvbSAnLi9jcmVhdGUtY2hvaWNlcy1vcmlnaW4nO1xuXG5leHBvcnQgdHlwZSBBamZDaG9pY2VzT2JzZXJ2YWJsZU9yaWdpbkNyZWF0ZTxUPiA9IE9taXQ8QWpmQ2hvaWNlc09yaWdpbkNyZWF0ZTxUPiwgJ3R5cGUnPiZcbiAgICBQaWNrPEFqZkNob2ljZXNPYnNlcnZhYmxlT3JpZ2luPFQ+LCAnZ2VuZXJhdG9yJz4mUGFydGlhbDxBamZDaG9pY2VzT2JzZXJ2YWJsZU9yaWdpbjxUPj47XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVDaG9pY2VzT2JzZXJ2YWJsZU9yaWdpbjxUPihvcmlnaW46IEFqZkNob2ljZXNPYnNlcnZhYmxlT3JpZ2luQ3JlYXRlPFQ+KTpcbiAgICBBamZDaG9pY2VzT2JzZXJ2YWJsZU9yaWdpbjxUPiB7XG4gIHJldHVybiB7XG4gICAgLi4ub3JpZ2luLFxuICAgIHR5cGU6ICdvYnNlcnZhYmxlJyxcbiAgICBsYWJlbDogb3JpZ2luLmxhYmVsIHx8ICcnLFxuICAgIGNob2ljZXM6IG9yaWdpbi5jaG9pY2VzIHx8IFtdLFxuICB9O1xufVxuIl19