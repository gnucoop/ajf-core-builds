/**
 * @fileoverview added by tsickle
 * Generated from: src/core/forms/utils/choices/create-choices-promise-origin.ts
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
export function createChoicesPromiseOrigin(origin) {
    return Object.assign(Object.assign({}, origin), { type: 'promise', label: origin.label || '', choices: origin.choices || [] });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLWNob2ljZXMtcHJvbWlzZS1vcmlnaW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9mb3Jtcy91dGlscy9jaG9pY2VzL2NyZWF0ZS1jaG9pY2VzLXByb21pc2Utb3JpZ2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE0QkEsTUFBTSxVQUFVLDBCQUEwQixDQUFJLE1BQXdDO0lBRXBGLHVDQUNLLE1BQU0sS0FDVCxJQUFJLEVBQUUsU0FBUyxFQUNmLEtBQUssRUFBRSxNQUFNLENBQUMsS0FBSyxJQUFJLEVBQUUsRUFDekIsT0FBTyxFQUFFLE1BQU0sQ0FBQyxPQUFPLElBQUksRUFBRSxJQUM3QjtBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmQ2hvaWNlc1Byb21pc2VPcmlnaW59IGZyb20gJy4uLy4uL2ludGVyZmFjZS9jaG9pY2VzL2Nob2ljZXMtcHJvbWlzZS1vcmlnaW4nO1xuaW1wb3J0IHtBamZDaG9pY2VzT3JpZ2luQ3JlYXRlfSBmcm9tICcuL2NyZWF0ZS1jaG9pY2VzLW9yaWdpbic7XG5cbmV4cG9ydCB0eXBlIEFqZkNob2ljZXNQcm9taXNlT3JpZ2luQ3JlYXRlPFQ+ID0gT21pdDxBamZDaG9pY2VzT3JpZ2luQ3JlYXRlPFQ+LCAndHlwZSc+JlxuICAgIFBpY2s8QWpmQ2hvaWNlc1Byb21pc2VPcmlnaW48VD4sICdnZW5lcmF0b3InPiZQYXJ0aWFsPEFqZkNob2ljZXNQcm9taXNlT3JpZ2luPFQ+PjtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUNob2ljZXNQcm9taXNlT3JpZ2luPFQ+KG9yaWdpbjogQWpmQ2hvaWNlc1Byb21pc2VPcmlnaW5DcmVhdGU8VD4pOlxuICAgIEFqZkNob2ljZXNQcm9taXNlT3JpZ2luPFQ+IHtcbiAgcmV0dXJuIHtcbiAgICAuLi5vcmlnaW4sXG4gICAgdHlwZTogJ3Byb21pc2UnLFxuICAgIGxhYmVsOiBvcmlnaW4ubGFiZWwgfHwgJycsXG4gICAgY2hvaWNlczogb3JpZ2luLmNob2ljZXMgfHwgW10sXG4gIH07XG59XG4iXX0=