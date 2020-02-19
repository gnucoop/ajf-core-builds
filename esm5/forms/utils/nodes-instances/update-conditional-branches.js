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
import { evaluateExpression } from '@ajf/core/models';
export function updateConditionalBranches(instance, context) {
    var conditionalBranches = instance.conditionalBranches;
    if (conditionalBranches != null) {
        var oldBranch = instance.verifiedBranch;
        var idx = 0;
        var found = false;
        while (idx < conditionalBranches.length && !found) {
            var verified = evaluateExpression(conditionalBranches[idx].condition, context);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLWNvbmRpdGlvbmFsLWJyYW5jaGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvZm9ybXMvdXRpbHMvbm9kZXMtaW5zdGFuY2VzL3VwZGF0ZS1jb25kaXRpb25hbC1icmFuY2hlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQWEsa0JBQWtCLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUloRSxNQUFNLFVBQVUseUJBQXlCLENBQUMsUUFBeUIsRUFBRSxPQUFtQjtJQUN0RixJQUFNLG1CQUFtQixHQUFHLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQztJQUV6RCxJQUFJLG1CQUFtQixJQUFJLElBQUksRUFBRTtRQUMvQixJQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDO1FBQzFDLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNaLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNsQixPQUFPLEdBQUcsR0FBRyxtQkFBbUIsQ0FBQyxNQUFNLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDakQsSUFBSSxRQUFRLEdBQVksa0JBQWtCLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQ3hGLElBQUksUUFBUSxFQUFFO2dCQUNaLEtBQUssR0FBRyxJQUFJLENBQUM7Z0JBQ2IsSUFBSSxHQUFHLEtBQUssUUFBUSxDQUFDLGNBQWMsRUFBRTtvQkFDbkMsUUFBUSxDQUFDLGNBQWMsR0FBRyxHQUFHLENBQUM7aUJBQy9CO2FBQ0Y7WUFDRCxHQUFHLEVBQUUsQ0FBQztTQUNQO1FBRUQsSUFBSSxTQUFTLEtBQUssUUFBUSxDQUFDLGNBQWMsRUFBRTtZQUN6QyxPQUFPLElBQUksQ0FBQztTQUNiO0tBQ0Y7SUFFRCxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTggR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZDb250ZXh0LCBldmFsdWF0ZUV4cHJlc3Npb259IGZyb20gJ0BhamYvY29yZS9tb2RlbHMnO1xuXG5pbXBvcnQge0FqZk5vZGVJbnN0YW5jZX0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL25vZGVzLWluc3RhbmNlcy9ub2RlLWluc3RhbmNlJztcblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZUNvbmRpdGlvbmFsQnJhbmNoZXMoaW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSwgY29udGV4dDogQWpmQ29udGV4dCk6IGJvb2xlYW4ge1xuICBjb25zdCBjb25kaXRpb25hbEJyYW5jaGVzID0gaW5zdGFuY2UuY29uZGl0aW9uYWxCcmFuY2hlcztcblxuICBpZiAoY29uZGl0aW9uYWxCcmFuY2hlcyAhPSBudWxsKSB7XG4gICAgY29uc3Qgb2xkQnJhbmNoID0gaW5zdGFuY2UudmVyaWZpZWRCcmFuY2g7XG4gICAgbGV0IGlkeCA9IDA7XG4gICAgbGV0IGZvdW5kID0gZmFsc2U7XG4gICAgd2hpbGUgKGlkeCA8IGNvbmRpdGlvbmFsQnJhbmNoZXMubGVuZ3RoICYmICFmb3VuZCkge1xuICAgICAgbGV0IHZlcmlmaWVkOiBib29sZWFuID0gZXZhbHVhdGVFeHByZXNzaW9uKGNvbmRpdGlvbmFsQnJhbmNoZXNbaWR4XS5jb25kaXRpb24sIGNvbnRleHQpO1xuICAgICAgaWYgKHZlcmlmaWVkKSB7XG4gICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgICAgaWYgKGlkeCAhPT0gaW5zdGFuY2UudmVyaWZpZWRCcmFuY2gpIHtcbiAgICAgICAgICBpbnN0YW5jZS52ZXJpZmllZEJyYW5jaCA9IGlkeDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWR4Kys7XG4gICAgfVxuXG4gICAgaWYgKG9sZEJyYW5jaCAhPT0gaW5zdGFuY2UudmVyaWZpZWRCcmFuY2gpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn1cbiJdfQ==