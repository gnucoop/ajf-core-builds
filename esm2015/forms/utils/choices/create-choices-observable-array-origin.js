/**
 * @fileoverview added by tsickle
 * Generated from: src/core/forms/utils/choices/create-choices-observable-array-origin.ts
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
/**
 * @template T
 * @param {?} origin
 * @return {?}
 */
export function createChoicesObservableArrayOrigin(origin) {
    return Object.assign(Object.assign({}, origin), { type: 'observableArray', label: origin.label || '', choices: origin.choices || [] });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLWNob2ljZXMtb2JzZXJ2YWJsZS1hcnJheS1vcmlnaW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9mb3Jtcy91dGlscy9jaG9pY2VzL2NyZWF0ZS1jaG9pY2VzLW9ic2VydmFibGUtYXJyYXktb3JpZ2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUErQkEsTUFBTSxVQUFVLGtDQUFrQyxDQUNoRCxNQUFnRDtJQUVoRCx1Q0FDSyxNQUFNLEtBQ1QsSUFBSSxFQUFFLGlCQUFpQixFQUN2QixLQUFLLEVBQUUsTUFBTSxDQUFDLEtBQUssSUFBSSxFQUFFLEVBQ3pCLE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTyxJQUFJLEVBQUUsSUFDN0I7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSAyMDE4IEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7XG4gIEFqZkNob2ljZXNPYnNlcnZhYmxlQXJyYXlPcmlnaW5cbn0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL2Nob2ljZXMvY2hvaWNlcy1vYnNlcnZhYmxlLWFycmF5LW9yaWdpbic7XG5pbXBvcnQge0FqZkNob2ljZXNPcmlnaW5DcmVhdGV9IGZyb20gJy4vY3JlYXRlLWNob2ljZXMtb3JpZ2luJztcblxuZXhwb3J0IHR5cGUgQWpmQ2hvaWNlc09ic2VydmFibGVBcnJheU9yaWdpbkNyZWF0ZTxUPiA9XG4gIE9taXQ8QWpmQ2hvaWNlc09yaWdpbkNyZWF0ZTxUPiwgJ3R5cGUnPiZQaWNrPEFqZkNob2ljZXNPYnNlcnZhYmxlQXJyYXlPcmlnaW48VD4sICdnZW5lcmF0b3InPlxuICAmUGFydGlhbDxBamZDaG9pY2VzT2JzZXJ2YWJsZUFycmF5T3JpZ2luPFQ+PjtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUNob2ljZXNPYnNlcnZhYmxlQXJyYXlPcmlnaW48VD4oXG4gIG9yaWdpbjogQWpmQ2hvaWNlc09ic2VydmFibGVBcnJheU9yaWdpbkNyZWF0ZTxUPlxuKTogQWpmQ2hvaWNlc09ic2VydmFibGVBcnJheU9yaWdpbjxUPiB7XG4gIHJldHVybiB7XG4gICAgLi4ub3JpZ2luLFxuICAgIHR5cGU6ICdvYnNlcnZhYmxlQXJyYXknLFxuICAgIGxhYmVsOiBvcmlnaW4ubGFiZWwgfHwgJycsXG4gICAgY2hvaWNlczogb3JpZ2luLmNob2ljZXMgfHwgW10sXG4gIH07XG59XG4iXX0=