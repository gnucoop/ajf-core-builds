/**
 * @fileoverview added by tsickle
 * Generated from: src/core/forms/utils/nodes-instances/get-instance-warnings.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LWluc3RhbmNlLXdhcm5pbmdzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvZm9ybXMvdXRpbHMvbm9kZXMtaW5zdGFuY2VzL2dldC1pbnN0YW5jZS13YXJuaW5ncy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXVCQSxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQzs7Ozs7OztBQUUxRCxNQUFNLFVBQVUsbUJBQW1CLENBQy9CLFFBQXNCLEVBQUUsY0FBd0MsRUFDaEUsTUFBZ0I7O1FBQ2QsT0FBTyxHQUFHLEtBQUs7O1VBQ2IsV0FBVyxHQUFHLFFBQVEsQ0FBQyxHQUFHOzs7O0lBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTs7Y0FDckMsVUFBVSxHQUFHLGtCQUFrQixDQUFDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxDQUFDO1FBQ3RFLElBQUksVUFBVSxLQUFLLE9BQU8sRUFBRTtZQUMxQixPQUFPLEdBQUcsSUFBSSxDQUFDO1NBQ2hCO1FBQ0QsT0FBTyxVQUFVLENBQUM7SUFDcEIsQ0FBQyxFQUFDO0lBQ0YsT0FBTyxPQUFPLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDO0FBQzFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmV2FybmluZ30gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL3dhcm5pbmcvd2FybmluZyc7XG5pbXBvcnQge2dldEluc3RhbmNlV2FybmluZ30gZnJvbSAnLi9nZXQtaW5zdGFuY2Utd2FybmluZyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRJbnN0YW5jZVdhcm5pbmdzKFxuICAgIHdhcm5pbmdzOiBBamZXYXJuaW5nW10sIGFuY2VzdG9yc05hbWVzOiB7W3Byb3A6IHN0cmluZ106IG51bWJlcn0sXG4gICAgcHJlZml4OiBudW1iZXJbXSk6IEFqZldhcm5pbmdbXSB7XG4gIGxldCBjaGFuZ2VkID0gZmFsc2U7XG4gIGNvbnN0IG5ld1dhcm5pbmdzID0gd2FybmluZ3MubWFwKCh3YXJuaW5nKSA9PiB7XG4gICAgY29uc3QgbmV3V2FybmluZyA9IGdldEluc3RhbmNlV2FybmluZyh3YXJuaW5nLCBhbmNlc3RvcnNOYW1lcywgcHJlZml4KTtcbiAgICBpZiAobmV3V2FybmluZyAhPT0gd2FybmluZykge1xuICAgICAgY2hhbmdlZCA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiBuZXdXYXJuaW5nO1xuICB9KTtcbiAgcmV0dXJuIGNoYW5nZWQgPyBuZXdXYXJuaW5ncyA6IHdhcm5pbmdzO1xufVxuIl19