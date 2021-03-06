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
import { updateConditionalBranches } from '../nodes-instances/update-conditional-branches';
import { updateVisibility } from '../nodes-instances/update-visibility';
import { updateFormula } from './update-formula';
import { updateNextSlideCondition } from './update-next-slide-condition';
import { updateValidation } from './update-validation';
import { updateWarning } from './update-warning';
export function updateFieldInstanceState(instance, context, branchVisibility = true) {
    updateVisibility(instance, context, branchVisibility);
    updateConditionalBranches(instance, context);
    updateFormula(instance, context);
    updateValidation(instance, context);
    updateWarning(instance, context);
    updateNextSlideCondition(instance, context);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLWZpZWxkLWluc3RhbmNlLXN0YXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvZm9ybXMvdXRpbHMvZmllbGRzLWluc3RhbmNlcy91cGRhdGUtZmllbGQtaW5zdGFuY2Utc3RhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBTUgsT0FBTyxFQUFDLHlCQUF5QixFQUFDLE1BQU0sZ0RBQWdELENBQUM7QUFDekYsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sc0NBQXNDLENBQUM7QUFDdEUsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQy9DLE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLCtCQUErQixDQUFDO0FBQ3ZFLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQ3JELE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUUvQyxNQUFNLFVBQVUsd0JBQXdCLENBQ3BDLFFBQTBCLEVBQUUsT0FBbUIsRUFBRSxnQkFBZ0IsR0FBRyxJQUFJO0lBQzFFLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztJQUN0RCx5QkFBeUIsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDN0MsYUFBYSxDQUFDLFFBQW1DLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDNUQsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3BDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDakMsd0JBQXdCLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQzlDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmQ29udGV4dH0gZnJvbSAnQGFqZi9jb3JlL21vZGVscyc7XG5cbmltcG9ydCB7QWpmRmllbGRJbnN0YW5jZX0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL2ZpZWxkcy1pbnN0YW5jZXMvZmllbGQtaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZGb3JtdWxhRmllbGRJbnN0YW5jZX0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL2ZpZWxkcy1pbnN0YW5jZXMvZm9ybXVsYS1maWVsZC1pbnN0YW5jZSc7XG5pbXBvcnQge3VwZGF0ZUNvbmRpdGlvbmFsQnJhbmNoZXN9IGZyb20gJy4uL25vZGVzLWluc3RhbmNlcy91cGRhdGUtY29uZGl0aW9uYWwtYnJhbmNoZXMnO1xuaW1wb3J0IHt1cGRhdGVWaXNpYmlsaXR5fSBmcm9tICcuLi9ub2Rlcy1pbnN0YW5jZXMvdXBkYXRlLXZpc2liaWxpdHknO1xuaW1wb3J0IHt1cGRhdGVGb3JtdWxhfSBmcm9tICcuL3VwZGF0ZS1mb3JtdWxhJztcbmltcG9ydCB7dXBkYXRlTmV4dFNsaWRlQ29uZGl0aW9ufSBmcm9tICcuL3VwZGF0ZS1uZXh0LXNsaWRlLWNvbmRpdGlvbic7XG5pbXBvcnQge3VwZGF0ZVZhbGlkYXRpb259IGZyb20gJy4vdXBkYXRlLXZhbGlkYXRpb24nO1xuaW1wb3J0IHt1cGRhdGVXYXJuaW5nfSBmcm9tICcuL3VwZGF0ZS13YXJuaW5nJztcblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZUZpZWxkSW5zdGFuY2VTdGF0ZShcbiAgICBpbnN0YW5jZTogQWpmRmllbGRJbnN0YW5jZSwgY29udGV4dDogQWpmQ29udGV4dCwgYnJhbmNoVmlzaWJpbGl0eSA9IHRydWUpOiB2b2lkIHtcbiAgdXBkYXRlVmlzaWJpbGl0eShpbnN0YW5jZSwgY29udGV4dCwgYnJhbmNoVmlzaWJpbGl0eSk7XG4gIHVwZGF0ZUNvbmRpdGlvbmFsQnJhbmNoZXMoaW5zdGFuY2UsIGNvbnRleHQpO1xuICB1cGRhdGVGb3JtdWxhKGluc3RhbmNlIGFzIEFqZkZvcm11bGFGaWVsZEluc3RhbmNlLCBjb250ZXh0KTtcbiAgdXBkYXRlVmFsaWRhdGlvbihpbnN0YW5jZSwgY29udGV4dCk7XG4gIHVwZGF0ZVdhcm5pbmcoaW5zdGFuY2UsIGNvbnRleHQpO1xuICB1cGRhdGVOZXh0U2xpZGVDb25kaXRpb24oaW5zdGFuY2UsIGNvbnRleHQpO1xufVxuIl19