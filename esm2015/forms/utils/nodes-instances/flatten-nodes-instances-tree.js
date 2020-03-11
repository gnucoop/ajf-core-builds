/**
 * @fileoverview added by tsickle
 * Generated from: src/core/forms/utils/nodes-instances/flatten-nodes-instances-tree.ts
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
import { flattenNodesInstances } from './flatten-nodes-instances';
import { isSlidesInstance } from './is-slides-instance';
/**
 * @param {?} nodes
 * @return {?}
 */
export function flattenNodesInstancesTree(nodes) {
    /** @type {?} */
    let flatTree = [];
    nodes.forEach((/**
     * @param {?} nodeInstance
     * @return {?}
     */
    (nodeInstance) => {
        if (isSlidesInstance(nodeInstance)) {
            /** @type {?} */
            const ni = (/** @type {?} */ (nodeInstance));
            flatTree.push(ni);
            ni.flatNodes = flattenNodesInstances(ni.nodes);
        }
    }));
    return flatTree;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxhdHRlbi1ub2Rlcy1pbnN0YW5jZXMtdHJlZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2Zvcm1zL3V0aWxzL25vZGVzLWluc3RhbmNlcy9mbGF0dGVuLW5vZGVzLWluc3RhbmNlcy10cmVlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBd0JBLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQ2hFLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHNCQUFzQixDQUFDOzs7OztBQUV0RCxNQUFNLFVBQVUseUJBQXlCLENBQUMsS0FBd0I7O1FBQzVELFFBQVEsR0FBdUIsRUFBRTtJQUNyQyxLQUFLLENBQUMsT0FBTzs7OztJQUFDLENBQUMsWUFBNkIsRUFBRSxFQUFFO1FBQzlDLElBQUksZ0JBQWdCLENBQUMsWUFBWSxDQUFDLEVBQUU7O2tCQUM1QixFQUFFLEdBQUcsbUJBQUEsWUFBWSxFQUFvQjtZQUMzQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ2xCLEVBQUUsQ0FBQyxTQUFTLEdBQUcscUJBQXFCLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2hEO0lBQ0gsQ0FBQyxFQUFDLENBQUM7SUFDSCxPQUFPLFFBQVEsQ0FBQztBQUNsQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZk5vZGVJbnN0YW5jZX0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL25vZGVzLWluc3RhbmNlcy9ub2RlLWluc3RhbmNlJztcbmltcG9ydCB7QWpmU2xpZGVJbnN0YW5jZX0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL3NsaWRlcy1pbnN0YW5jZXMvc2xpZGUtaW5zdGFuY2UnO1xuaW1wb3J0IHtmbGF0dGVuTm9kZXNJbnN0YW5jZXN9IGZyb20gJy4vZmxhdHRlbi1ub2Rlcy1pbnN0YW5jZXMnO1xuaW1wb3J0IHtpc1NsaWRlc0luc3RhbmNlfSBmcm9tICcuL2lzLXNsaWRlcy1pbnN0YW5jZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBmbGF0dGVuTm9kZXNJbnN0YW5jZXNUcmVlKG5vZGVzOiBBamZOb2RlSW5zdGFuY2VbXSk6IEFqZlNsaWRlSW5zdGFuY2VbXSB7XG4gIGxldCBmbGF0VHJlZTogQWpmU2xpZGVJbnN0YW5jZVtdID0gW107XG4gIG5vZGVzLmZvckVhY2goKG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlKSA9PiB7XG4gICAgaWYgKGlzU2xpZGVzSW5zdGFuY2Uobm9kZUluc3RhbmNlKSkge1xuICAgICAgY29uc3QgbmkgPSBub2RlSW5zdGFuY2UgYXMgQWpmU2xpZGVJbnN0YW5jZTtcbiAgICAgIGZsYXRUcmVlLnB1c2gobmkpO1xuICAgICAgbmkuZmxhdE5vZGVzID0gZmxhdHRlbk5vZGVzSW5zdGFuY2VzKG5pLm5vZGVzKTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gZmxhdFRyZWU7XG59XG4iXX0=