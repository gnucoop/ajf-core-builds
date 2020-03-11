/**
 * @fileoverview added by tsickle
 * Generated from: src/core/forms/utils/forms/create-form.ts
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
 * @param {?=} form
 * @return {?}
 */
export function createForm(form = {}) {
    return {
        nodes: form.nodes || [],
        choicesOrigins: form.choicesOrigins || [],
        attachmentsOrigins: form.attachmentsOrigins || [],
        initContext: form.initContext || {},
        stringIdentifier: form.stringIdentifier || (/** @type {?} */ ([])),
        supplementaryInformations: form.supplementaryInformations,
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLWZvcm0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9mb3Jtcy91dGlscy9mb3Jtcy9jcmVhdGUtZm9ybS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUEyQkEsTUFBTSxVQUFVLFVBQVUsQ0FBQyxPQUFzQixFQUFFO0lBQ2pELE9BQU87UUFDTCxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssSUFBSSxFQUFFO1FBQ3ZCLGNBQWMsRUFBRSxJQUFJLENBQUMsY0FBYyxJQUFJLEVBQUU7UUFDekMsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixJQUFJLEVBQUU7UUFDakQsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXLElBQUksRUFBRTtRQUNuQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLElBQUksbUJBQUEsRUFBRSxFQUE2QjtRQUMxRSx5QkFBeUIsRUFBRSxJQUFJLENBQUMseUJBQXlCO0tBQzFELENBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkZvcm19IGZyb20gJy4uLy4uL2ludGVyZmFjZS9mb3Jtcy9mb3JtJztcbmltcG9ydCB7QWpmRm9ybVN0cmluZ0lkZW50aWZpZXJ9IGZyb20gJy4uLy4uL2ludGVyZmFjZS9mb3Jtcy9mb3JtLXN0cmluZy1pZGVudGlmaWVyJztcblxuZXhwb3J0IHR5cGUgQWpmRm9ybUNyZWF0ZSA9IFBhcnRpYWw8QWpmRm9ybT47XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVGb3JtKGZvcm06IEFqZkZvcm1DcmVhdGUgPSB7fSk6IEFqZkZvcm0ge1xuICByZXR1cm4ge1xuICAgIG5vZGVzOiBmb3JtLm5vZGVzIHx8IFtdLFxuICAgIGNob2ljZXNPcmlnaW5zOiBmb3JtLmNob2ljZXNPcmlnaW5zIHx8IFtdLFxuICAgIGF0dGFjaG1lbnRzT3JpZ2luczogZm9ybS5hdHRhY2htZW50c09yaWdpbnMgfHwgW10sXG4gICAgaW5pdENvbnRleHQ6IGZvcm0uaW5pdENvbnRleHQgfHwge30sXG4gICAgc3RyaW5nSWRlbnRpZmllcjogZm9ybS5zdHJpbmdJZGVudGlmaWVyIHx8IFtdIGFzIEFqZkZvcm1TdHJpbmdJZGVudGlmaWVyW10sXG4gICAgc3VwcGxlbWVudGFyeUluZm9ybWF0aW9uczogZm9ybS5zdXBwbGVtZW50YXJ5SW5mb3JtYXRpb25zLFxuICB9O1xufVxuIl19