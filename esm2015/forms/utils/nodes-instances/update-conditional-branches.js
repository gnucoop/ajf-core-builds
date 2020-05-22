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
import { evaluateExpression } from '@ajf/core/models';
export function updateConditionalBranches(instance, context) {
    const conditionalBranches = instance.conditionalBranches;
    if (conditionalBranches != null) {
        const oldBranch = instance.verifiedBranch;
        let idx = 0;
        let found = false;
        while (idx < conditionalBranches.length && !found) {
            let verified = evaluateExpression(conditionalBranches[idx].condition, context);
            if (verified) {
                found = true;
                if (idx !== instance.verifiedBranch) {
                    instance.verifiedBranch = idx;
                }
            }
            idx++;
        }
        if (oldBranch !== instance.verifiedBranch) {
            return true;
        }
    }
    return false;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLWNvbmRpdGlvbmFsLWJyYW5jaGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvZm9ybXMvdXRpbHMvbm9kZXMtaW5zdGFuY2VzL3VwZGF0ZS1jb25kaXRpb25hbC1icmFuY2hlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQWEsa0JBQWtCLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUloRSxNQUFNLFVBQVUseUJBQXlCLENBQUMsUUFBeUIsRUFBRSxPQUFtQjtJQUN0RixNQUFNLG1CQUFtQixHQUFHLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQztJQUV6RCxJQUFJLG1CQUFtQixJQUFJLElBQUksRUFBRTtRQUMvQixNQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDO1FBQzFDLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNaLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNsQixPQUFPLEdBQUcsR0FBRyxtQkFBbUIsQ0FBQyxNQUFNLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDakQsSUFBSSxRQUFRLEdBQVksa0JBQWtCLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQ3hGLElBQUksUUFBUSxFQUFFO2dCQUNaLEtBQUssR0FBRyxJQUFJLENBQUM7Z0JBQ2IsSUFBSSxHQUFHLEtBQUssUUFBUSxDQUFDLGNBQWMsRUFBRTtvQkFDbkMsUUFBUSxDQUFDLGNBQWMsR0FBRyxHQUFHLENBQUM7aUJBQy9CO2FBQ0Y7WUFDRCxHQUFHLEVBQUUsQ0FBQztTQUNQO1FBRUQsSUFBSSxTQUFTLEtBQUssUUFBUSxDQUFDLGNBQWMsRUFBRTtZQUN6QyxPQUFPLElBQUksQ0FBQztTQUNiO0tBQ0Y7SUFFRCxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmQ29udGV4dCwgZXZhbHVhdGVFeHByZXNzaW9ufSBmcm9tICdAYWpmL2NvcmUvbW9kZWxzJztcblxuaW1wb3J0IHtBamZOb2RlSW5zdGFuY2V9IGZyb20gJy4uLy4uL2ludGVyZmFjZS9ub2Rlcy1pbnN0YW5jZXMvbm9kZS1pbnN0YW5jZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVDb25kaXRpb25hbEJyYW5jaGVzKGluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UsIGNvbnRleHQ6IEFqZkNvbnRleHQpOiBib29sZWFuIHtcbiAgY29uc3QgY29uZGl0aW9uYWxCcmFuY2hlcyA9IGluc3RhbmNlLmNvbmRpdGlvbmFsQnJhbmNoZXM7XG5cbiAgaWYgKGNvbmRpdGlvbmFsQnJhbmNoZXMgIT0gbnVsbCkge1xuICAgIGNvbnN0IG9sZEJyYW5jaCA9IGluc3RhbmNlLnZlcmlmaWVkQnJhbmNoO1xuICAgIGxldCBpZHggPSAwO1xuICAgIGxldCBmb3VuZCA9IGZhbHNlO1xuICAgIHdoaWxlIChpZHggPCBjb25kaXRpb25hbEJyYW5jaGVzLmxlbmd0aCAmJiAhZm91bmQpIHtcbiAgICAgIGxldCB2ZXJpZmllZDogYm9vbGVhbiA9IGV2YWx1YXRlRXhwcmVzc2lvbihjb25kaXRpb25hbEJyYW5jaGVzW2lkeF0uY29uZGl0aW9uLCBjb250ZXh0KTtcbiAgICAgIGlmICh2ZXJpZmllZCkge1xuICAgICAgICBmb3VuZCA9IHRydWU7XG4gICAgICAgIGlmIChpZHggIT09IGluc3RhbmNlLnZlcmlmaWVkQnJhbmNoKSB7XG4gICAgICAgICAgaW5zdGFuY2UudmVyaWZpZWRCcmFuY2ggPSBpZHg7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlkeCsrO1xuICAgIH1cblxuICAgIGlmIChvbGRCcmFuY2ggIT09IGluc3RhbmNlLnZlcmlmaWVkQnJhbmNoKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG4iXX0=