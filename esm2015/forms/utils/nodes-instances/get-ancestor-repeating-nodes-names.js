/**
 * @fileoverview added by tsickle
 * Generated from: src/core/forms/utils/nodes-instances/get-ancestor-repeating-nodes-names.ts
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
import { isField } from '../nodes/is-field';
import { getAncestorRepeatingNodes } from './get-ancestor-repeating-nodes';
/**
 * @param {?} allNodes
 * @param {?} node
 * @return {?}
 */
export function getAncestorRepeatingNodesNames(allNodes, node) {
    /** @type {?} */
    let names = {};
    /** @type {?} */
    const nodeGroups = (/** @type {?} */ (getAncestorRepeatingNodes(allNodes, node)));
    nodeGroups.forEach((/**
     * @param {?} n
     * @param {?} idx
     * @return {?}
     */
    (n, idx) => (n.nodes || []).forEach((/**
     * @param {?} sn
     * @return {?}
     */
    (sn) => {
        if (isField(sn)) {
            names[sn.name] = idx;
        }
    }))));
    return names;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LWFuY2VzdG9yLXJlcGVhdGluZy1ub2Rlcy1uYW1lcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2Zvcm1zL3V0aWxzL25vZGVzLWluc3RhbmNlcy9nZXQtYW5jZXN0b3ItcmVwZWF0aW5nLW5vZGVzLW5hbWVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBeUJBLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUUxQyxPQUFPLEVBQUMseUJBQXlCLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQzs7Ozs7O0FBRXpFLE1BQU0sVUFBVSw4QkFBOEIsQ0FDMUMsUUFBcUMsRUFBRSxJQUFhOztRQUNsRCxLQUFLLEdBQTZCLEVBQUU7O1VBQ2xDLFVBQVUsR0FBRyxtQkFBQSx5QkFBeUIsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLEVBQWtCO0lBQzlFLFVBQVUsQ0FBQyxPQUFPOzs7OztJQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQyxDQUFDLE9BQU87Ozs7SUFBQyxDQUFDLEVBQUUsRUFBRSxFQUFFO1FBQzVELElBQUksT0FBTyxDQUFDLEVBQUUsQ0FBQyxFQUFFO1lBQ2YsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUM7U0FDdEI7SUFDSCxDQUFDLEVBQUMsRUFBQyxDQUFDO0lBQ0osT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSAyMDE4IEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmTm9kZUluc3RhbmNlfSBmcm9tICcuLi8uLi9pbnRlcmZhY2Uvbm9kZXMtaW5zdGFuY2VzL25vZGUtaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZOb2RlfSBmcm9tICcuLi8uLi9pbnRlcmZhY2Uvbm9kZXMvbm9kZSc7XG5pbXBvcnQge0FqZk5vZGVHcm91cH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL25vZGVzL25vZGUtZ3JvdXAnO1xuaW1wb3J0IHtpc0ZpZWxkfSBmcm9tICcuLi9ub2Rlcy9pcy1maWVsZCc7XG5cbmltcG9ydCB7Z2V0QW5jZXN0b3JSZXBlYXRpbmdOb2Rlc30gZnJvbSAnLi9nZXQtYW5jZXN0b3ItcmVwZWF0aW5nLW5vZGVzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGdldEFuY2VzdG9yUmVwZWF0aW5nTm9kZXNOYW1lcyhcbiAgICBhbGxOb2RlczogKEFqZk5vZGV8QWpmTm9kZUluc3RhbmNlKVtdLCBub2RlOiBBamZOb2RlKToge1twcm9wOiBzdHJpbmddOiBudW1iZXJ9IHtcbiAgbGV0IG5hbWVzOiB7W3Byb3A6IHN0cmluZ106IG51bWJlcn0gPSB7fTtcbiAgY29uc3Qgbm9kZUdyb3VwcyA9IGdldEFuY2VzdG9yUmVwZWF0aW5nTm9kZXMoYWxsTm9kZXMsIG5vZGUpIGFzIEFqZk5vZGVHcm91cFtdO1xuICBub2RlR3JvdXBzLmZvckVhY2goKG4sIGlkeCkgPT4gKG4ubm9kZXMgfHwgW10pLmZvckVhY2goKHNuKSA9PiB7XG4gICAgaWYgKGlzRmllbGQoc24pKSB7XG4gICAgICBuYW1lc1tzbi5uYW1lXSA9IGlkeDtcbiAgICB9XG4gIH0pKTtcbiAgcmV0dXJuIG5hbWVzO1xufVxuIl19