/**
 * @fileoverview added by tsickle
 * Generated from: src/core/forms/utils/nodes/ordered-nodes.ts
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
/**
 * @param {?} nodes
 * @param {?} parent
 * @return {?}
 */
export function orderedNodes(nodes, parent) {
    /** @type {?} */
    let newNodes = [];
    nodes
        .filter((/**
     * @param {?} n
     * @return {?}
     */
    (n) => parent != null ? n.parent == parent : n.parent == null || n.parent === 0))
        .sort((/**
     * @param {?} n1
     * @param {?} n2
     * @return {?}
     */
    (n1, n2) => n1.parentNode - n2.parentNode))
        .forEach((/**
     * @param {?} n
     * @return {?}
     */
    (n) => {
        newNodes.push(n);
        newNodes = newNodes.concat(orderedNodes(nodes, n.id));
    }));
    return newNodes;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXJlZC1ub2Rlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2Zvcm1zL3V0aWxzL25vZGVzL29yZGVyZWQtbm9kZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXdCQSxNQUFNLFVBQVUsWUFBWSxDQUFDLEtBQWdCLEVBQUUsTUFBbUI7O1FBQzVELFFBQVEsR0FBYyxFQUFFO0lBQzVCLEtBQUs7U0FDQSxNQUFNOzs7O0lBQ0gsQ0FBQyxDQUFVLEVBQUUsRUFBRSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxJQUFJLElBQUksSUFBSSxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBQztTQUM1RixJQUFJOzs7OztJQUFDLENBQUMsRUFBVyxFQUFFLEVBQVcsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUMsVUFBVSxFQUFDO1NBQ2pFLE9BQU87Ozs7SUFBQyxDQUFDLENBQVUsRUFBRSxFQUFFO1FBQ3RCLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakIsUUFBUSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN4RCxDQUFDLEVBQUMsQ0FBQztJQUNQLE9BQU8sUUFBUSxDQUFDO0FBQ2xCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmTm9kZX0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL25vZGVzL25vZGUnO1xuXG5leHBvcnQgZnVuY3Rpb24gb3JkZXJlZE5vZGVzKG5vZGVzOiBBamZOb2RlW10sIHBhcmVudDogbnVtYmVyfG51bGwpOiBBamZOb2RlW10ge1xuICBsZXQgbmV3Tm9kZXM6IEFqZk5vZGVbXSA9IFtdO1xuICBub2Rlc1xuICAgICAgLmZpbHRlcihcbiAgICAgICAgICAobjogQWpmTm9kZSkgPT4gcGFyZW50ICE9IG51bGwgPyBuLnBhcmVudCA9PSBwYXJlbnQgOiBuLnBhcmVudCA9PSBudWxsIHx8IG4ucGFyZW50ID09PSAwKVxuICAgICAgLnNvcnQoKG4xOiBBamZOb2RlLCBuMjogQWpmTm9kZSkgPT4gbjEucGFyZW50Tm9kZSAtIG4yLnBhcmVudE5vZGUpXG4gICAgICAuZm9yRWFjaCgobjogQWpmTm9kZSkgPT4ge1xuICAgICAgICBuZXdOb2Rlcy5wdXNoKG4pO1xuICAgICAgICBuZXdOb2RlcyA9IG5ld05vZGVzLmNvbmNhdChvcmRlcmVkTm9kZXMobm9kZXMsIG4uaWQpKTtcbiAgICAgIH0pO1xuICByZXR1cm4gbmV3Tm9kZXM7XG59XG4iXX0=