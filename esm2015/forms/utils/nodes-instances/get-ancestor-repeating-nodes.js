/**
 * @fileoverview added by tsickle
 * Generated from: src/core/forms/utils/nodes-instances/get-ancestor-repeating-nodes.ts
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
import { isRepeatingContainerNode } from '../nodes/is-repeating-container-node';
/**
 * @param {?} allNodes
 * @param {?} node
 * @return {?}
 */
export function getAncestorRepeatingNodes(allNodes, node) {
    /** @type {?} */
    let nodeGroups = [];
    /** @type {?} */
    let curParent = node.parent;
    while (curParent != null) {
        /** @type {?} */
        const curNode = allNodes.map((/**
         * @param {?} n
         * @return {?}
         */
        (n) => ((/** @type {?} */ (n))).node || (/** @type {?} */ (n))))
            .find((/**
         * @param {?} n
         * @return {?}
         */
        n => n.id == curParent));
        if (curNode) {
            if (isRepeatingContainerNode(curNode)) {
                nodeGroups.push(curNode);
            }
        }
        curParent = curNode != null ? curNode.parent : null;
    }
    return nodeGroups;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LWFuY2VzdG9yLXJlcGVhdGluZy1ub2Rlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2Zvcm1zL3V0aWxzL25vZGVzLWluc3RhbmNlcy9nZXQtYW5jZXN0b3ItcmVwZWF0aW5nLW5vZGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBd0JBLE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLHNDQUFzQyxDQUFDOzs7Ozs7QUFFOUUsTUFBTSxVQUFVLHlCQUF5QixDQUNyQyxRQUFxQyxFQUFFLElBQWE7O1FBQ2xELFVBQVUsR0FBYyxFQUFFOztRQUMxQixTQUFTLEdBQWdCLElBQUksQ0FBQyxNQUFNO0lBQ3hDLE9BQU8sU0FBUyxJQUFJLElBQUksRUFBRTs7Y0FDbEIsT0FBTyxHQUNULFFBQVEsQ0FBQyxHQUFHOzs7O1FBQUMsQ0FBQyxDQUEwQixFQUFFLEVBQUUsQ0FBQyxDQUFDLG1CQUFBLENBQUMsRUFBbUIsQ0FBQyxDQUFDLElBQUksSUFBSSxtQkFBQSxDQUFDLEVBQVcsRUFBQzthQUNwRixJQUFJOzs7O1FBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLFNBQVMsRUFBQztRQUNyQyxJQUFJLE9BQU8sRUFBRTtZQUNYLElBQUksd0JBQXdCLENBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ3JDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDMUI7U0FDRjtRQUNELFNBQVMsR0FBRyxPQUFPLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7S0FDckQ7SUFDRCxPQUFPLFVBQVUsQ0FBQztBQUNwQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZk5vZGVJbnN0YW5jZX0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL25vZGVzLWluc3RhbmNlcy9ub2RlLWluc3RhbmNlJztcbmltcG9ydCB7QWpmTm9kZX0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL25vZGVzL25vZGUnO1xuaW1wb3J0IHtpc1JlcGVhdGluZ0NvbnRhaW5lck5vZGV9IGZyb20gJy4uL25vZGVzL2lzLXJlcGVhdGluZy1jb250YWluZXItbm9kZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRBbmNlc3RvclJlcGVhdGluZ05vZGVzKFxuICAgIGFsbE5vZGVzOiAoQWpmTm9kZXxBamZOb2RlSW5zdGFuY2UpW10sIG5vZGU6IEFqZk5vZGUpOiBBamZOb2RlW10ge1xuICBsZXQgbm9kZUdyb3VwczogQWpmTm9kZVtdID0gW107XG4gIGxldCBjdXJQYXJlbnQ6IG51bWJlcnxudWxsID0gbm9kZS5wYXJlbnQ7XG4gIHdoaWxlIChjdXJQYXJlbnQgIT0gbnVsbCkge1xuICAgIGNvbnN0IGN1ck5vZGUgPVxuICAgICAgICBhbGxOb2Rlcy5tYXAoKG46IEFqZk5vZGV8QWpmTm9kZUluc3RhbmNlKSA9PiAobiBhcyBBamZOb2RlSW5zdGFuY2UpLm5vZGUgfHwgbiBhcyBBamZOb2RlKVxuICAgICAgICAgICAgLmZpbmQobiA9PiBuLmlkID09IGN1clBhcmVudCk7XG4gICAgaWYgKGN1ck5vZGUpIHtcbiAgICAgIGlmIChpc1JlcGVhdGluZ0NvbnRhaW5lck5vZGUoY3VyTm9kZSkpIHtcbiAgICAgICAgbm9kZUdyb3Vwcy5wdXNoKGN1ck5vZGUpO1xuICAgICAgfVxuICAgIH1cbiAgICBjdXJQYXJlbnQgPSBjdXJOb2RlICE9IG51bGwgPyBjdXJOb2RlLnBhcmVudCA6IG51bGw7XG4gIH1cbiAgcmV0dXJuIG5vZGVHcm91cHM7XG59XG4iXX0=