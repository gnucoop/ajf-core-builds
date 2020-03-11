/**
 * @fileoverview added by tsickle
 * Generated from: src/core/forms/utils/nodes-instances/get-instance-warning.ts
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
import { normalizeExpression } from '@ajf/core/models';
import { createWarning } from '../warning/create-warning';
/**
 * @param {?} warning
 * @param {?} ancestorsNames
 * @param {?} prefix
 * @return {?}
 */
export function getInstanceWarning(warning, ancestorsNames, prefix) {
    /** @type {?} */
    const oldWarning = warning.condition;
    /** @type {?} */
    let newWarning = normalizeExpression(oldWarning, ancestorsNames, prefix);
    if (newWarning === oldWarning) {
        return warning;
    }
    return createWarning({ condition: newWarning });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LWluc3RhbmNlLXdhcm5pbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9mb3Jtcy91dGlscy9ub2Rlcy1pbnN0YW5jZXMvZ2V0LWluc3RhbmNlLXdhcm5pbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzQkEsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFHckQsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLDJCQUEyQixDQUFDOzs7Ozs7O0FBRXhELE1BQU0sVUFBVSxrQkFBa0IsQ0FDOUIsT0FBbUIsRUFBRSxjQUF3QyxFQUFFLE1BQWdCOztVQUMzRSxVQUFVLEdBQUcsT0FBTyxDQUFDLFNBQVM7O1FBQ2hDLFVBQVUsR0FBRyxtQkFBbUIsQ0FBQyxVQUFVLEVBQUUsY0FBYyxFQUFFLE1BQU0sQ0FBQztJQUN4RSxJQUFJLFVBQVUsS0FBSyxVQUFVLEVBQUU7UUFDN0IsT0FBTyxPQUFPLENBQUM7S0FDaEI7SUFDRCxPQUFPLGFBQWEsQ0FBQyxFQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUMsQ0FBQyxDQUFDO0FBQ2hELENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7bm9ybWFsaXplRXhwcmVzc2lvbn0gZnJvbSAnQGFqZi9jb3JlL21vZGVscyc7XG5cbmltcG9ydCB7QWpmV2FybmluZ30gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL3dhcm5pbmcvd2FybmluZyc7XG5pbXBvcnQge2NyZWF0ZVdhcm5pbmd9IGZyb20gJy4uL3dhcm5pbmcvY3JlYXRlLXdhcm5pbmcnO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0SW5zdGFuY2VXYXJuaW5nKFxuICAgIHdhcm5pbmc6IEFqZldhcm5pbmcsIGFuY2VzdG9yc05hbWVzOiB7W3Byb3A6IHN0cmluZ106IG51bWJlcn0sIHByZWZpeDogbnVtYmVyW10pOiBBamZXYXJuaW5nIHtcbiAgY29uc3Qgb2xkV2FybmluZyA9IHdhcm5pbmcuY29uZGl0aW9uO1xuICBsZXQgbmV3V2FybmluZyA9IG5vcm1hbGl6ZUV4cHJlc3Npb24ob2xkV2FybmluZywgYW5jZXN0b3JzTmFtZXMsIHByZWZpeCk7XG4gIGlmIChuZXdXYXJuaW5nID09PSBvbGRXYXJuaW5nKSB7XG4gICAgcmV0dXJuIHdhcm5pbmc7XG4gIH1cbiAgcmV0dXJuIGNyZWF0ZVdhcm5pbmcoe2NvbmRpdGlvbjogbmV3V2FybmluZ30pO1xufVxuIl19