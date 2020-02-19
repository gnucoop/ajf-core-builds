/**
 * @fileoverview added by tsickle
 * Generated from: src/core/forms/utils/nodes-instances/get-ancestor-repeating-nodes.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LWFuY2VzdG9yLXJlcGVhdGluZy1ub2Rlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2Zvcm1zL3V0aWxzL25vZGVzLWluc3RhbmNlcy9nZXQtYW5jZXN0b3ItcmVwZWF0aW5nLW5vZGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBd0JBLE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLHNDQUFzQyxDQUFDOzs7Ozs7QUFFOUUsTUFBTSxVQUFVLHlCQUF5QixDQUNyQyxRQUFxQyxFQUFFLElBQWE7O1FBQ2xELFVBQVUsR0FBYyxFQUFFOztRQUMxQixTQUFTLEdBQWdCLElBQUksQ0FBQyxNQUFNO0lBQ3hDLE9BQU8sU0FBUyxJQUFJLElBQUksRUFBRTs7Y0FDbEIsT0FBTyxHQUNULFFBQVEsQ0FBQyxHQUFHOzs7O1FBQUMsQ0FBQyxDQUEwQixFQUFFLEVBQUUsQ0FBQyxDQUFDLG1CQUFBLENBQUMsRUFBbUIsQ0FBQyxDQUFDLElBQUksSUFBSSxtQkFBQSxDQUFDLEVBQVcsRUFBQzthQUNwRixJQUFJOzs7O1FBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLFNBQVMsRUFBQztRQUNyQyxJQUFJLE9BQU8sRUFBRTtZQUNYLElBQUksd0JBQXdCLENBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ3JDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDMUI7U0FDRjtRQUNELFNBQVMsR0FBRyxPQUFPLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7S0FDckQ7SUFDRCxPQUFPLFVBQVUsQ0FBQztBQUNwQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSAyMDE4IEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmTm9kZUluc3RhbmNlfSBmcm9tICcuLi8uLi9pbnRlcmZhY2Uvbm9kZXMtaW5zdGFuY2VzL25vZGUtaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZOb2RlfSBmcm9tICcuLi8uLi9pbnRlcmZhY2Uvbm9kZXMvbm9kZSc7XG5pbXBvcnQge2lzUmVwZWF0aW5nQ29udGFpbmVyTm9kZX0gZnJvbSAnLi4vbm9kZXMvaXMtcmVwZWF0aW5nLWNvbnRhaW5lci1ub2RlJztcblxuZXhwb3J0IGZ1bmN0aW9uIGdldEFuY2VzdG9yUmVwZWF0aW5nTm9kZXMoXG4gICAgYWxsTm9kZXM6IChBamZOb2RlfEFqZk5vZGVJbnN0YW5jZSlbXSwgbm9kZTogQWpmTm9kZSk6IEFqZk5vZGVbXSB7XG4gIGxldCBub2RlR3JvdXBzOiBBamZOb2RlW10gPSBbXTtcbiAgbGV0IGN1clBhcmVudDogbnVtYmVyfG51bGwgPSBub2RlLnBhcmVudDtcbiAgd2hpbGUgKGN1clBhcmVudCAhPSBudWxsKSB7XG4gICAgY29uc3QgY3VyTm9kZSA9XG4gICAgICAgIGFsbE5vZGVzLm1hcCgobjogQWpmTm9kZXxBamZOb2RlSW5zdGFuY2UpID0+IChuIGFzIEFqZk5vZGVJbnN0YW5jZSkubm9kZSB8fCBuIGFzIEFqZk5vZGUpXG4gICAgICAgICAgICAuZmluZChuID0+IG4uaWQgPT0gY3VyUGFyZW50KTtcbiAgICBpZiAoY3VyTm9kZSkge1xuICAgICAgaWYgKGlzUmVwZWF0aW5nQ29udGFpbmVyTm9kZShjdXJOb2RlKSkge1xuICAgICAgICBub2RlR3JvdXBzLnB1c2goY3VyTm9kZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGN1clBhcmVudCA9IGN1ck5vZGUgIT0gbnVsbCA/IGN1ck5vZGUucGFyZW50IDogbnVsbDtcbiAgfVxuICByZXR1cm4gbm9kZUdyb3Vwcztcbn1cbiJdfQ==