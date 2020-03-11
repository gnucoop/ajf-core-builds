/**
 * @fileoverview added by tsickle
 * Generated from: src/core/forms/utils/nodes-instances/find-node-instance-in-tree.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmluZC1ub2RlLWluc3RhbmNlLWluLXRyZWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9mb3Jtcy91dGlscy9ub2Rlcy1pbnN0YW5jZXMvZmluZC1ub2RlLWluc3RhbmNlLWluLXRyZWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF1QkEsT0FBTyxFQUFDLHVCQUF1QixFQUFDLE1BQU0sOEJBQThCLENBQUM7Ozs7OztBQUVyRSxNQUFNLFVBQVUsc0JBQXNCLENBQUMsS0FBd0IsRUFBRSxJQUFxQjs7VUFFOUUsS0FBSyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO0lBQ2pDLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxFQUFFO1FBQ2QsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBQyxDQUFDO0tBQ3pDOztVQUNLLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTTs7OztJQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxDQUFDLEVBQUM7O1FBQ3hELENBQUMsR0FBRyxDQUFDOztVQUNILEdBQUcsR0FBRyxNQUFNLENBQUMsTUFBTTtJQUN6QixPQUFPLENBQUMsR0FBRyxHQUFHLEVBQUU7O2NBQ1IsR0FBRyxHQUFHLHNCQUFzQixDQUFDLENBQUMsbUJBQUssTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFBLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQztRQUNyRSxJQUFJLEdBQUcsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEVBQUU7WUFDbEIsT0FBTyxHQUFHLENBQUM7U0FDWjtRQUNELENBQUMsRUFBRSxDQUFDO0tBQ0w7SUFDRCxPQUFPLEVBQUMsU0FBUyxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQztBQUNwQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZk5vZGVJbnN0YW5jZX0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL25vZGVzLWluc3RhbmNlcy9ub2RlLWluc3RhbmNlJztcbmltcG9ydCB7aXNDb250YWluZXJOb2RlSW5zdGFuY2V9IGZyb20gJy4vaXMtY29udGFpbmVyLW5vZGUtaW5zdGFuY2UnO1xuXG5leHBvcnQgZnVuY3Rpb24gZmluZE5vZGVJbnN0YW5jZUluVHJlZShub2RlczogQWpmTm9kZUluc3RhbmNlW10sIG5vZGU6IEFqZk5vZGVJbnN0YW5jZSk6XG4gICAge2NvbnRhaW5lcjogQWpmTm9kZUluc3RhbmNlW10sIGluZGV4OiBudW1iZXJ9IHtcbiAgY29uc3QgaW5kZXggPSBub2Rlcy5pbmRleE9mKG5vZGUpO1xuICBpZiAoaW5kZXggPiAtMSkge1xuICAgIHJldHVybiB7Y29udGFpbmVyOiBub2RlcywgaW5kZXg6IGluZGV4fTtcbiAgfVxuICBjb25zdCBncm91cHMgPSBub2Rlcy5maWx0ZXIobiA9PiBpc0NvbnRhaW5lck5vZGVJbnN0YW5jZShuKSk7XG4gIGxldCBpID0gMDtcbiAgY29uc3QgbGVuID0gZ3JvdXBzLmxlbmd0aDtcbiAgd2hpbGUgKGkgPCBsZW4pIHtcbiAgICBjb25zdCByZXMgPSBmaW5kTm9kZUluc3RhbmNlSW5UcmVlKCg8YW55Pmdyb3Vwc1tpXSkubm9kZS5ub2Rlcywgbm9kZSk7XG4gICAgaWYgKHJlcy5pbmRleCA+IC0xKSB7XG4gICAgICByZXR1cm4gcmVzO1xuICAgIH1cbiAgICBpKys7XG4gIH1cbiAgcmV0dXJuIHtjb250YWluZXI6IFtdLCBpbmRleDogLTF9O1xufVxuIl19