/**
 * @fileoverview added by tsickle
 * Generated from: src/core/forms/utils/nodes-instances/get-instance-condition.ts
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
/**
 * @param {?} condition
 * @param {?} ancestorsNames
 * @param {?} prefix
 * @return {?}
 */
export function getInstanceCondition(condition, ancestorsNames, prefix) {
    /** @type {?} */
    const oldCondition = condition.condition;
    /** @type {?} */
    let newCondition = normalizeExpression(oldCondition, ancestorsNames, prefix);
    if (newCondition === oldCondition) {
        return condition;
    }
    return { condition: newCondition };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LWluc3RhbmNlLWNvbmRpdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2Zvcm1zL3V0aWxzL25vZGVzLWluc3RhbmNlcy9nZXQtaW5zdGFuY2UtY29uZGl0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBLE9BQU8sRUFBZSxtQkFBbUIsRUFBQyxNQUFNLGtCQUFrQixDQUFDOzs7Ozs7O0FBRW5FLE1BQU0sVUFBVSxvQkFBb0IsQ0FDaEMsU0FBdUIsRUFBRSxjQUF3QyxFQUNqRSxNQUFnQjs7VUFDWixZQUFZLEdBQUcsU0FBUyxDQUFDLFNBQVM7O1FBQ3BDLFlBQVksR0FBRyxtQkFBbUIsQ0FBQyxZQUFZLEVBQUUsY0FBYyxFQUFFLE1BQU0sQ0FBQztJQUM1RSxJQUFJLFlBQVksS0FBSyxZQUFZLEVBQUU7UUFDakMsT0FBTyxTQUFTLENBQUM7S0FDbEI7SUFDRCxPQUFPLEVBQUMsU0FBUyxFQUFFLFlBQVksRUFBQyxDQUFDO0FBQ25DLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmQ29uZGl0aW9uLCBub3JtYWxpemVFeHByZXNzaW9ufSBmcm9tICdAYWpmL2NvcmUvbW9kZWxzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGdldEluc3RhbmNlQ29uZGl0aW9uKFxuICAgIGNvbmRpdGlvbjogQWpmQ29uZGl0aW9uLCBhbmNlc3RvcnNOYW1lczoge1twcm9wOiBzdHJpbmddOiBudW1iZXJ9LFxuICAgIHByZWZpeDogbnVtYmVyW10pOiBBamZDb25kaXRpb24ge1xuICBjb25zdCBvbGRDb25kaXRpb24gPSBjb25kaXRpb24uY29uZGl0aW9uO1xuICBsZXQgbmV3Q29uZGl0aW9uID0gbm9ybWFsaXplRXhwcmVzc2lvbihvbGRDb25kaXRpb24sIGFuY2VzdG9yc05hbWVzLCBwcmVmaXgpO1xuICBpZiAobmV3Q29uZGl0aW9uID09PSBvbGRDb25kaXRpb24pIHtcbiAgICByZXR1cm4gY29uZGl0aW9uO1xuICB9XG4gIHJldHVybiB7Y29uZGl0aW9uOiBuZXdDb25kaXRpb259O1xufVxuIl19