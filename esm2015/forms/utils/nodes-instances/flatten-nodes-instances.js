/**
 * @fileoverview added by tsickle
 * Generated from: src/core/forms/utils/nodes-instances/flatten-nodes-instances.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxhdHRlbi1ub2Rlcy1pbnN0YW5jZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9mb3Jtcy91dGlscy9ub2Rlcy1pbnN0YW5jZXMvZmxhdHRlbi1ub2Rlcy1pbnN0YW5jZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF5QkEsT0FBTyxFQUFDLHVCQUF1QixFQUFDLE1BQU0sOEJBQThCLENBQUM7QUFDckUsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHFCQUFxQixDQUFDOzs7Ozs7QUFFcEQsTUFBTSxVQUFVLHFCQUFxQixDQUNqQyxLQUF3QixFQUFFLGFBQWEsR0FBRyxLQUFLOztRQUM3QyxTQUFTLEdBQXNCLEVBQUU7SUFDckMsS0FBSyxDQUFDLE9BQU87Ozs7SUFBQyxDQUFDLFlBQTZCLEVBQUUsRUFBRTtRQUM5QyxJQUFJLGVBQWUsQ0FBQyxZQUFZLENBQUMsRUFBRTtZQUNqQyxTQUFTLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQzlCO1FBQ0QsSUFBSSx1QkFBdUIsQ0FBQyxZQUFZLENBQUMsRUFBRTtZQUN6QyxJQUFJLGFBQWEsRUFBRTtnQkFDakIsU0FBUyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUM5QjtZQUNELFNBQVMsR0FBRyxTQUFTLENBQUMsTUFBTSxDQUN4QixxQkFBcUIsQ0FBQyxDQUFDLG1CQUFBLFlBQVksRUFBNEIsQ0FBQyxDQUFDLEtBQUssRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFDO1NBQzdGO0lBQ0gsQ0FBQyxFQUFDLENBQUM7SUFDSCxPQUFPLFNBQVMsQ0FBQztBQUNuQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkNvbnRhaW5lck5vZGVJbnN0YW5jZX0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL25vZGVzLWluc3RhbmNlcy9jb250YWluZXItbm9kZS1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZk5vZGVJbnN0YW5jZX0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL25vZGVzLWluc3RhbmNlcy9ub2RlLWluc3RhbmNlJztcblxuaW1wb3J0IHtpc0NvbnRhaW5lck5vZGVJbnN0YW5jZX0gZnJvbSAnLi9pcy1jb250YWluZXItbm9kZS1pbnN0YW5jZSc7XG5pbXBvcnQge2lzRmllbGRJbnN0YW5jZX0gZnJvbSAnLi9pcy1maWVsZC1pbnN0YW5jZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBmbGF0dGVuTm9kZXNJbnN0YW5jZXMoXG4gICAgbm9kZXM6IEFqZk5vZGVJbnN0YW5jZVtdLCBpbmNsdWRlR3JvdXBzID0gZmFsc2UpOiBBamZOb2RlSW5zdGFuY2VbXSB7XG4gIGxldCBmbGF0Tm9kZXM6IEFqZk5vZGVJbnN0YW5jZVtdID0gW107XG4gIG5vZGVzLmZvckVhY2goKG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlKSA9PiB7XG4gICAgaWYgKGlzRmllbGRJbnN0YW5jZShub2RlSW5zdGFuY2UpKSB7XG4gICAgICBmbGF0Tm9kZXMucHVzaChub2RlSW5zdGFuY2UpO1xuICAgIH1cbiAgICBpZiAoaXNDb250YWluZXJOb2RlSW5zdGFuY2Uobm9kZUluc3RhbmNlKSkge1xuICAgICAgaWYgKGluY2x1ZGVHcm91cHMpIHtcbiAgICAgICAgZmxhdE5vZGVzLnB1c2gobm9kZUluc3RhbmNlKTtcbiAgICAgIH1cbiAgICAgIGZsYXROb2RlcyA9IGZsYXROb2Rlcy5jb25jYXQoXG4gICAgICAgICAgZmxhdHRlbk5vZGVzSW5zdGFuY2VzKChub2RlSW5zdGFuY2UgYXMgQWpmQ29udGFpbmVyTm9kZUluc3RhbmNlKS5ub2RlcywgaW5jbHVkZUdyb3VwcykpO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBmbGF0Tm9kZXM7XG59XG4iXX0=