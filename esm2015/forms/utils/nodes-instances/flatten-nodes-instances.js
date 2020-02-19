/**
 * @fileoverview added by tsickle
 * Generated from: src/core/forms/utils/nodes-instances/flatten-nodes-instances.ts
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
import { isContainerNodeInstance } from './is-container-node-instance';
import { isFieldInstance } from './is-field-instance';
/**
 * @param {?} nodes
 * @param {?=} includeGroups
 * @return {?}
 */
export function flattenNodesInstances(nodes, includeGroups = false) {
    /** @type {?} */
    let flatNodes = [];
    nodes.forEach((/**
     * @param {?} nodeInstance
     * @return {?}
     */
    (nodeInstance) => {
        if (isFieldInstance(nodeInstance)) {
            flatNodes.push(nodeInstance);
        }
        if (isContainerNodeInstance(nodeInstance)) {
            if (includeGroups) {
                flatNodes.push(nodeInstance);
            }
            flatNodes = flatNodes.concat(flattenNodesInstances(((/** @type {?} */ (nodeInstance))).nodes, includeGroups));
        }
    }));
    return flatNodes;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxhdHRlbi1ub2Rlcy1pbnN0YW5jZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9mb3Jtcy91dGlscy9ub2Rlcy1pbnN0YW5jZXMvZmxhdHRlbi1ub2Rlcy1pbnN0YW5jZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF5QkEsT0FBTyxFQUFDLHVCQUF1QixFQUFDLE1BQU0sOEJBQThCLENBQUM7QUFDckUsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHFCQUFxQixDQUFDOzs7Ozs7QUFFcEQsTUFBTSxVQUFVLHFCQUFxQixDQUNqQyxLQUF3QixFQUFFLGFBQWEsR0FBRyxLQUFLOztRQUM3QyxTQUFTLEdBQXNCLEVBQUU7SUFDckMsS0FBSyxDQUFDLE9BQU87Ozs7SUFBQyxDQUFDLFlBQTZCLEVBQUUsRUFBRTtRQUM5QyxJQUFJLGVBQWUsQ0FBQyxZQUFZLENBQUMsRUFBRTtZQUNqQyxTQUFTLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQzlCO1FBQ0QsSUFBSSx1QkFBdUIsQ0FBQyxZQUFZLENBQUMsRUFBRTtZQUN6QyxJQUFJLGFBQWEsRUFBRTtnQkFDakIsU0FBUyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUM5QjtZQUNELFNBQVMsR0FBRyxTQUFTLENBQUMsTUFBTSxDQUN4QixxQkFBcUIsQ0FBQyxDQUFDLG1CQUFBLFlBQVksRUFBNEIsQ0FBQyxDQUFDLEtBQUssRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFDO1NBQzdGO0lBQ0gsQ0FBQyxFQUFDLENBQUM7SUFDSCxPQUFPLFNBQVMsQ0FBQztBQUNuQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSAyMDE4IEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmQ29udGFpbmVyTm9kZUluc3RhbmNlfSBmcm9tICcuLi8uLi9pbnRlcmZhY2Uvbm9kZXMtaW5zdGFuY2VzL2NvbnRhaW5lci1ub2RlLWluc3RhbmNlJztcbmltcG9ydCB7QWpmTm9kZUluc3RhbmNlfSBmcm9tICcuLi8uLi9pbnRlcmZhY2Uvbm9kZXMtaW5zdGFuY2VzL25vZGUtaW5zdGFuY2UnO1xuXG5pbXBvcnQge2lzQ29udGFpbmVyTm9kZUluc3RhbmNlfSBmcm9tICcuL2lzLWNvbnRhaW5lci1ub2RlLWluc3RhbmNlJztcbmltcG9ydCB7aXNGaWVsZEluc3RhbmNlfSBmcm9tICcuL2lzLWZpZWxkLWluc3RhbmNlJztcblxuZXhwb3J0IGZ1bmN0aW9uIGZsYXR0ZW5Ob2Rlc0luc3RhbmNlcyhcbiAgICBub2RlczogQWpmTm9kZUluc3RhbmNlW10sIGluY2x1ZGVHcm91cHMgPSBmYWxzZSk6IEFqZk5vZGVJbnN0YW5jZVtdIHtcbiAgbGV0IGZsYXROb2RlczogQWpmTm9kZUluc3RhbmNlW10gPSBbXTtcbiAgbm9kZXMuZm9yRWFjaCgobm9kZUluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UpID0+IHtcbiAgICBpZiAoaXNGaWVsZEluc3RhbmNlKG5vZGVJbnN0YW5jZSkpIHtcbiAgICAgIGZsYXROb2Rlcy5wdXNoKG5vZGVJbnN0YW5jZSk7XG4gICAgfVxuICAgIGlmIChpc0NvbnRhaW5lck5vZGVJbnN0YW5jZShub2RlSW5zdGFuY2UpKSB7XG4gICAgICBpZiAoaW5jbHVkZUdyb3Vwcykge1xuICAgICAgICBmbGF0Tm9kZXMucHVzaChub2RlSW5zdGFuY2UpO1xuICAgICAgfVxuICAgICAgZmxhdE5vZGVzID0gZmxhdE5vZGVzLmNvbmNhdChcbiAgICAgICAgICBmbGF0dGVuTm9kZXNJbnN0YW5jZXMoKG5vZGVJbnN0YW5jZSBhcyBBamZDb250YWluZXJOb2RlSW5zdGFuY2UpLm5vZGVzLCBpbmNsdWRlR3JvdXBzKSk7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGZsYXROb2Rlcztcbn1cbiJdfQ==