/**
 * @fileoverview added by tsickle
 * Generated from: src/core/forms/utils/nodes-instances/find-node-instance-in-tree.ts
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
/**
 * @param {?} nodes
 * @param {?} node
 * @return {?}
 */
export function findNodeInstanceInTree(nodes, node) {
    /** @type {?} */
    const index = nodes.indexOf(node);
    if (index > -1) {
        return { container: nodes, index: index };
    }
    /** @type {?} */
    const groups = nodes.filter((/**
     * @param {?} n
     * @return {?}
     */
    n => isContainerNodeInstance(n)));
    /** @type {?} */
    let i = 0;
    /** @type {?} */
    const len = groups.length;
    while (i < len) {
        /** @type {?} */
        const res = findNodeInstanceInTree(((/** @type {?} */ (groups[i]))).node.nodes, node);
        if (res.index > -1) {
            return res;
        }
        i++;
    }
    return { container: [], index: -1 };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmluZC1ub2RlLWluc3RhbmNlLWluLXRyZWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9mb3Jtcy91dGlscy9ub2Rlcy1pbnN0YW5jZXMvZmluZC1ub2RlLWluc3RhbmNlLWluLXRyZWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF1QkEsT0FBTyxFQUFDLHVCQUF1QixFQUFDLE1BQU0sOEJBQThCLENBQUM7Ozs7OztBQUVyRSxNQUFNLFVBQVUsc0JBQXNCLENBQUMsS0FBd0IsRUFBRSxJQUFxQjs7VUFFOUUsS0FBSyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO0lBQ2pDLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxFQUFFO1FBQ2QsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBQyxDQUFDO0tBQ3pDOztVQUNLLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTTs7OztJQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxDQUFDLEVBQUM7O1FBQ3hELENBQUMsR0FBRyxDQUFDOztVQUNILEdBQUcsR0FBRyxNQUFNLENBQUMsTUFBTTtJQUN6QixPQUFPLENBQUMsR0FBRyxHQUFHLEVBQUU7O2NBQ1IsR0FBRyxHQUFHLHNCQUFzQixDQUFDLENBQUMsbUJBQUssTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFBLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQztRQUNyRSxJQUFJLEdBQUcsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEVBQUU7WUFDbEIsT0FBTyxHQUFHLENBQUM7U0FDWjtRQUNELENBQUMsRUFBRSxDQUFDO0tBQ0w7SUFDRCxPQUFPLEVBQUMsU0FBUyxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQztBQUNwQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSAyMDE4IEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmTm9kZUluc3RhbmNlfSBmcm9tICcuLi8uLi9pbnRlcmZhY2Uvbm9kZXMtaW5zdGFuY2VzL25vZGUtaW5zdGFuY2UnO1xuaW1wb3J0IHtpc0NvbnRhaW5lck5vZGVJbnN0YW5jZX0gZnJvbSAnLi9pcy1jb250YWluZXItbm9kZS1pbnN0YW5jZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBmaW5kTm9kZUluc3RhbmNlSW5UcmVlKG5vZGVzOiBBamZOb2RlSW5zdGFuY2VbXSwgbm9kZTogQWpmTm9kZUluc3RhbmNlKTpcbiAgICB7Y29udGFpbmVyOiBBamZOb2RlSW5zdGFuY2VbXSwgaW5kZXg6IG51bWJlcn0ge1xuICBjb25zdCBpbmRleCA9IG5vZGVzLmluZGV4T2Yobm9kZSk7XG4gIGlmIChpbmRleCA+IC0xKSB7XG4gICAgcmV0dXJuIHtjb250YWluZXI6IG5vZGVzLCBpbmRleDogaW5kZXh9O1xuICB9XG4gIGNvbnN0IGdyb3VwcyA9IG5vZGVzLmZpbHRlcihuID0+IGlzQ29udGFpbmVyTm9kZUluc3RhbmNlKG4pKTtcbiAgbGV0IGkgPSAwO1xuICBjb25zdCBsZW4gPSBncm91cHMubGVuZ3RoO1xuICB3aGlsZSAoaSA8IGxlbikge1xuICAgIGNvbnN0IHJlcyA9IGZpbmROb2RlSW5zdGFuY2VJblRyZWUoKDxhbnk+Z3JvdXBzW2ldKS5ub2RlLm5vZGVzLCBub2RlKTtcbiAgICBpZiAocmVzLmluZGV4ID4gLTEpIHtcbiAgICAgIHJldHVybiByZXM7XG4gICAgfVxuICAgIGkrKztcbiAgfVxuICByZXR1cm4ge2NvbnRhaW5lcjogW10sIGluZGV4OiAtMX07XG59XG4iXX0=