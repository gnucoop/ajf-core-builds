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
/**
 * It updates instance.visible with the result of evaluating instance.visibility.condition.
 * If instance.visibility is null instance.visible is false and it returns false.
 * If instance.visible changes return true.
 */
export function updateVisibility(instance, context, branchVisibility = true) {
    if (instance.visibility == null) {
        instance.visible = false;
        return false;
    }
    const visibility = instance.visibility;
    const oldVisibility = instance.visible;
    let newVisibility = branchVisibility && evaluateExpression(visibility.condition, context);
    if (newVisibility !== instance.visible) {
        instance.visible = newVisibility;
    }
    return oldVisibility !== newVisibility;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLXZpc2liaWxpdHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9mb3Jtcy91dGlscy9ub2Rlcy1pbnN0YW5jZXMvdXBkYXRlLXZpc2liaWxpdHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUEyQixrQkFBa0IsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBSTlFOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUsZ0JBQWdCLENBQzVCLFFBQXlCLEVBQUUsT0FBbUIsRUFBRSxnQkFBZ0IsR0FBRyxJQUFJO0lBQ3pFLElBQUksUUFBUSxDQUFDLFVBQVUsSUFBSSxJQUFJLEVBQUU7UUFDL0IsUUFBUSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDekIsT0FBTyxLQUFLLENBQUM7S0FDZDtJQUNELE1BQU0sVUFBVSxHQUFpQixRQUFRLENBQUMsVUFBVSxDQUFDO0lBRXJELE1BQU0sYUFBYSxHQUFZLFFBQVEsQ0FBQyxPQUFPLENBQUM7SUFDaEQsSUFBSSxhQUFhLEdBQ2IsZ0JBQWdCLElBQUksa0JBQWtCLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUMxRSxJQUFJLGFBQWEsS0FBSyxRQUFRLENBQUMsT0FBTyxFQUFFO1FBQ3RDLFFBQVEsQ0FBQyxPQUFPLEdBQUcsYUFBYSxDQUFDO0tBQ2xDO0lBRUQsT0FBTyxhQUFhLEtBQUssYUFBYSxDQUFDO0FBQ3pDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmQ29uZGl0aW9uLCBBamZDb250ZXh0LCBldmFsdWF0ZUV4cHJlc3Npb259IGZyb20gJ0BhamYvY29yZS9tb2RlbHMnO1xuXG5pbXBvcnQge0FqZk5vZGVJbnN0YW5jZX0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL25vZGVzLWluc3RhbmNlcy9ub2RlLWluc3RhbmNlJztcblxuLyoqXG4gKiBJdCB1cGRhdGVzIGluc3RhbmNlLnZpc2libGUgd2l0aCB0aGUgcmVzdWx0IG9mIGV2YWx1YXRpbmcgaW5zdGFuY2UudmlzaWJpbGl0eS5jb25kaXRpb24uXG4gKiBJZiBpbnN0YW5jZS52aXNpYmlsaXR5IGlzIG51bGwgaW5zdGFuY2UudmlzaWJsZSBpcyBmYWxzZSBhbmQgaXQgcmV0dXJucyBmYWxzZS5cbiAqIElmIGluc3RhbmNlLnZpc2libGUgY2hhbmdlcyByZXR1cm4gdHJ1ZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZVZpc2liaWxpdHkoXG4gICAgaW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSwgY29udGV4dDogQWpmQ29udGV4dCwgYnJhbmNoVmlzaWJpbGl0eSA9IHRydWUpOiBib29sZWFuIHtcbiAgaWYgKGluc3RhbmNlLnZpc2liaWxpdHkgPT0gbnVsbCkge1xuICAgIGluc3RhbmNlLnZpc2libGUgPSBmYWxzZTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgY29uc3QgdmlzaWJpbGl0eTogQWpmQ29uZGl0aW9uID0gaW5zdGFuY2UudmlzaWJpbGl0eTtcblxuICBjb25zdCBvbGRWaXNpYmlsaXR5OiBib29sZWFuID0gaW5zdGFuY2UudmlzaWJsZTtcbiAgbGV0IG5ld1Zpc2liaWxpdHk6IGJvb2xlYW4gPVxuICAgICAgYnJhbmNoVmlzaWJpbGl0eSAmJiBldmFsdWF0ZUV4cHJlc3Npb24odmlzaWJpbGl0eS5jb25kaXRpb24sIGNvbnRleHQpO1xuICBpZiAobmV3VmlzaWJpbGl0eSAhPT0gaW5zdGFuY2UudmlzaWJsZSkge1xuICAgIGluc3RhbmNlLnZpc2libGUgPSBuZXdWaXNpYmlsaXR5O1xuICB9XG5cbiAgcmV0dXJuIG9sZFZpc2liaWxpdHkgIT09IG5ld1Zpc2liaWxpdHk7XG59XG4iXX0=