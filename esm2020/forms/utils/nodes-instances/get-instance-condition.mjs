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
export function getInstanceCondition(condition, ancestorsNames, prefix) {
    const oldCondition = condition.condition;
    let newCondition = normalizeExpression(oldCondition, ancestorsNames, prefix);
    if (newCondition === oldCondition) {
        return condition;
    }
    return { condition: newCondition };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LWluc3RhbmNlLWNvbmRpdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvZm9ybXMvc3JjL3V0aWxzL25vZGVzLWluc3RhbmNlcy9nZXQtaW5zdGFuY2UtY29uZGl0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFBZSxtQkFBbUIsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBRW5FLE1BQU0sVUFBVSxvQkFBb0IsQ0FDbEMsU0FBdUIsRUFDdkIsY0FBd0MsRUFDeEMsTUFBZ0I7SUFFaEIsTUFBTSxZQUFZLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQztJQUN6QyxJQUFJLFlBQVksR0FBRyxtQkFBbUIsQ0FBQyxZQUFZLEVBQUUsY0FBYyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQzdFLElBQUksWUFBWSxLQUFLLFlBQVksRUFBRTtRQUNqQyxPQUFPLFNBQVMsQ0FBQztLQUNsQjtJQUNELE9BQU8sRUFBQyxTQUFTLEVBQUUsWUFBWSxFQUFDLENBQUM7QUFDbkMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZDb25kaXRpb24sIG5vcm1hbGl6ZUV4cHJlc3Npb259IGZyb20gJ0BhamYvY29yZS9tb2RlbHMnO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0SW5zdGFuY2VDb25kaXRpb24oXG4gIGNvbmRpdGlvbjogQWpmQ29uZGl0aW9uLFxuICBhbmNlc3RvcnNOYW1lczoge1twcm9wOiBzdHJpbmddOiBudW1iZXJ9LFxuICBwcmVmaXg6IG51bWJlcltdLFxuKTogQWpmQ29uZGl0aW9uIHtcbiAgY29uc3Qgb2xkQ29uZGl0aW9uID0gY29uZGl0aW9uLmNvbmRpdGlvbjtcbiAgbGV0IG5ld0NvbmRpdGlvbiA9IG5vcm1hbGl6ZUV4cHJlc3Npb24ob2xkQ29uZGl0aW9uLCBhbmNlc3RvcnNOYW1lcywgcHJlZml4KTtcbiAgaWYgKG5ld0NvbmRpdGlvbiA9PT0gb2xkQ29uZGl0aW9uKSB7XG4gICAgcmV0dXJuIGNvbmRpdGlvbjtcbiAgfVxuICByZXR1cm4ge2NvbmRpdGlvbjogbmV3Q29uZGl0aW9ufTtcbn1cbiJdfQ==