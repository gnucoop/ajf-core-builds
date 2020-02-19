/**
 * @fileoverview added by tsickle
 * Generated from: src/core/forms/utils/nodes-instances/flatten-nodes-instances-tree.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxhdHRlbi1ub2Rlcy1pbnN0YW5jZXMtdHJlZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2Zvcm1zL3V0aWxzL25vZGVzLWluc3RhbmNlcy9mbGF0dGVuLW5vZGVzLWluc3RhbmNlcy10cmVlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBd0JBLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQ2hFLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHNCQUFzQixDQUFDOzs7OztBQUV0RCxNQUFNLFVBQVUseUJBQXlCLENBQUMsS0FBd0I7O1FBQzVELFFBQVEsR0FBdUIsRUFBRTtJQUNyQyxLQUFLLENBQUMsT0FBTzs7OztJQUFDLENBQUMsWUFBNkIsRUFBRSxFQUFFO1FBQzlDLElBQUksZ0JBQWdCLENBQUMsWUFBWSxDQUFDLEVBQUU7O2tCQUM1QixFQUFFLEdBQUcsbUJBQUEsWUFBWSxFQUFvQjtZQUMzQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ2xCLEVBQUUsQ0FBQyxTQUFTLEdBQUcscUJBQXFCLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2hEO0lBQ0gsQ0FBQyxFQUFDLENBQUM7SUFDSCxPQUFPLFFBQVEsQ0FBQztBQUNsQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSAyMDE4IEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmTm9kZUluc3RhbmNlfSBmcm9tICcuLi8uLi9pbnRlcmZhY2Uvbm9kZXMtaW5zdGFuY2VzL25vZGUtaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZTbGlkZUluc3RhbmNlfSBmcm9tICcuLi8uLi9pbnRlcmZhY2Uvc2xpZGVzLWluc3RhbmNlcy9zbGlkZS1pbnN0YW5jZSc7XG5pbXBvcnQge2ZsYXR0ZW5Ob2Rlc0luc3RhbmNlc30gZnJvbSAnLi9mbGF0dGVuLW5vZGVzLWluc3RhbmNlcyc7XG5pbXBvcnQge2lzU2xpZGVzSW5zdGFuY2V9IGZyb20gJy4vaXMtc2xpZGVzLWluc3RhbmNlJztcblxuZXhwb3J0IGZ1bmN0aW9uIGZsYXR0ZW5Ob2Rlc0luc3RhbmNlc1RyZWUobm9kZXM6IEFqZk5vZGVJbnN0YW5jZVtdKTogQWpmU2xpZGVJbnN0YW5jZVtdIHtcbiAgbGV0IGZsYXRUcmVlOiBBamZTbGlkZUluc3RhbmNlW10gPSBbXTtcbiAgbm9kZXMuZm9yRWFjaCgobm9kZUluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UpID0+IHtcbiAgICBpZiAoaXNTbGlkZXNJbnN0YW5jZShub2RlSW5zdGFuY2UpKSB7XG4gICAgICBjb25zdCBuaSA9IG5vZGVJbnN0YW5jZSBhcyBBamZTbGlkZUluc3RhbmNlO1xuICAgICAgZmxhdFRyZWUucHVzaChuaSk7XG4gICAgICBuaS5mbGF0Tm9kZXMgPSBmbGF0dGVuTm9kZXNJbnN0YW5jZXMobmkubm9kZXMpO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBmbGF0VHJlZTtcbn1cbiJdfQ==