/**
 * @fileoverview added by tsickle
 * Generated from: src/core/forms/utils/nodes-instances/get-instance-warnings.ts
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
import { getInstanceWarning } from './get-instance-warning';
/**
 * @param {?} warnings
 * @param {?} ancestorsNames
 * @param {?} prefix
 * @return {?}
 */
export function getInstanceWarnings(warnings, ancestorsNames, prefix) {
    /** @type {?} */
    let changed = false;
    /** @type {?} */
    const newWarnings = warnings.map((/**
     * @param {?} warning
     * @return {?}
     */
    (warning) => {
        /** @type {?} */
        const newWarning = getInstanceWarning(warning, ancestorsNames, prefix);
        if (newWarning !== warning) {
            changed = true;
        }
        return newWarning;
    }));
    return changed ? newWarnings : warnings;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LWluc3RhbmNlLXdhcm5pbmdzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvZm9ybXMvdXRpbHMvbm9kZXMtaW5zdGFuY2VzL2dldC1pbnN0YW5jZS13YXJuaW5ncy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXVCQSxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQzs7Ozs7OztBQUUxRCxNQUFNLFVBQVUsbUJBQW1CLENBQy9CLFFBQXNCLEVBQUUsY0FBd0MsRUFDaEUsTUFBZ0I7O1FBQ2QsT0FBTyxHQUFHLEtBQUs7O1VBQ2IsV0FBVyxHQUFHLFFBQVEsQ0FBQyxHQUFHOzs7O0lBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTs7Y0FDckMsVUFBVSxHQUFHLGtCQUFrQixDQUFDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxDQUFDO1FBQ3RFLElBQUksVUFBVSxLQUFLLE9BQU8sRUFBRTtZQUMxQixPQUFPLEdBQUcsSUFBSSxDQUFDO1NBQ2hCO1FBQ0QsT0FBTyxVQUFVLENBQUM7SUFDcEIsQ0FBQyxFQUFDO0lBQ0YsT0FBTyxPQUFPLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDO0FBQzFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTggR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZXYXJuaW5nfSBmcm9tICcuLi8uLi9pbnRlcmZhY2Uvd2FybmluZy93YXJuaW5nJztcbmltcG9ydCB7Z2V0SW5zdGFuY2VXYXJuaW5nfSBmcm9tICcuL2dldC1pbnN0YW5jZS13YXJuaW5nJztcblxuZXhwb3J0IGZ1bmN0aW9uIGdldEluc3RhbmNlV2FybmluZ3MoXG4gICAgd2FybmluZ3M6IEFqZldhcm5pbmdbXSwgYW5jZXN0b3JzTmFtZXM6IHtbcHJvcDogc3RyaW5nXTogbnVtYmVyfSxcbiAgICBwcmVmaXg6IG51bWJlcltdKTogQWpmV2FybmluZ1tdIHtcbiAgbGV0IGNoYW5nZWQgPSBmYWxzZTtcbiAgY29uc3QgbmV3V2FybmluZ3MgPSB3YXJuaW5ncy5tYXAoKHdhcm5pbmcpID0+IHtcbiAgICBjb25zdCBuZXdXYXJuaW5nID0gZ2V0SW5zdGFuY2VXYXJuaW5nKHdhcm5pbmcsIGFuY2VzdG9yc05hbWVzLCBwcmVmaXgpO1xuICAgIGlmIChuZXdXYXJuaW5nICE9PSB3YXJuaW5nKSB7XG4gICAgICBjaGFuZ2VkID0gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIG5ld1dhcm5pbmc7XG4gIH0pO1xuICByZXR1cm4gY2hhbmdlZCA/IG5ld1dhcm5pbmdzIDogd2FybmluZ3M7XG59XG4iXX0=