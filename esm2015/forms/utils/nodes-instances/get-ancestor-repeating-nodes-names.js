/**
 * @fileoverview added by tsickle
 * Generated from: src/core/forms/utils/nodes-instances/get-ancestor-repeating-nodes-names.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LWFuY2VzdG9yLXJlcGVhdGluZy1ub2Rlcy1uYW1lcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2Zvcm1zL3V0aWxzL25vZGVzLWluc3RhbmNlcy9nZXQtYW5jZXN0b3ItcmVwZWF0aW5nLW5vZGVzLW5hbWVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBeUJBLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUUxQyxPQUFPLEVBQUMseUJBQXlCLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQzs7Ozs7O0FBRXpFLE1BQU0sVUFBVSw4QkFBOEIsQ0FDMUMsUUFBcUMsRUFBRSxJQUFhOztRQUNsRCxLQUFLLEdBQTZCLEVBQUU7O1VBQ2xDLFVBQVUsR0FBRyxtQkFBQSx5QkFBeUIsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLEVBQWtCO0lBQzlFLFVBQVUsQ0FBQyxPQUFPOzs7OztJQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQyxDQUFDLE9BQU87Ozs7SUFBQyxDQUFDLEVBQUUsRUFBRSxFQUFFO1FBQzVELElBQUksT0FBTyxDQUFDLEVBQUUsQ0FBQyxFQUFFO1lBQ2YsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUM7U0FDdEI7SUFDSCxDQUFDLEVBQUMsRUFBQyxDQUFDO0lBQ0osT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZk5vZGVJbnN0YW5jZX0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL25vZGVzLWluc3RhbmNlcy9ub2RlLWluc3RhbmNlJztcbmltcG9ydCB7QWpmTm9kZX0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL25vZGVzL25vZGUnO1xuaW1wb3J0IHtBamZOb2RlR3JvdXB9IGZyb20gJy4uLy4uL2ludGVyZmFjZS9ub2Rlcy9ub2RlLWdyb3VwJztcbmltcG9ydCB7aXNGaWVsZH0gZnJvbSAnLi4vbm9kZXMvaXMtZmllbGQnO1xuXG5pbXBvcnQge2dldEFuY2VzdG9yUmVwZWF0aW5nTm9kZXN9IGZyb20gJy4vZ2V0LWFuY2VzdG9yLXJlcGVhdGluZy1ub2Rlcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRBbmNlc3RvclJlcGVhdGluZ05vZGVzTmFtZXMoXG4gICAgYWxsTm9kZXM6IChBamZOb2RlfEFqZk5vZGVJbnN0YW5jZSlbXSwgbm9kZTogQWpmTm9kZSk6IHtbcHJvcDogc3RyaW5nXTogbnVtYmVyfSB7XG4gIGxldCBuYW1lczoge1twcm9wOiBzdHJpbmddOiBudW1iZXJ9ID0ge307XG4gIGNvbnN0IG5vZGVHcm91cHMgPSBnZXRBbmNlc3RvclJlcGVhdGluZ05vZGVzKGFsbE5vZGVzLCBub2RlKSBhcyBBamZOb2RlR3JvdXBbXTtcbiAgbm9kZUdyb3Vwcy5mb3JFYWNoKChuLCBpZHgpID0+IChuLm5vZGVzIHx8IFtdKS5mb3JFYWNoKChzbikgPT4ge1xuICAgIGlmIChpc0ZpZWxkKHNuKSkge1xuICAgICAgbmFtZXNbc24ubmFtZV0gPSBpZHg7XG4gICAgfVxuICB9KSk7XG4gIHJldHVybiBuYW1lcztcbn1cbiJdfQ==