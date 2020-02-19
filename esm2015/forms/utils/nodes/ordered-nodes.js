/**
 * @fileoverview added by tsickle
 * Generated from: src/core/forms/utils/nodes/ordered-nodes.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXJlZC1ub2Rlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2Zvcm1zL3V0aWxzL25vZGVzL29yZGVyZWQtbm9kZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXdCQSxNQUFNLFVBQVUsWUFBWSxDQUFDLEtBQWdCLEVBQUUsTUFBbUI7O1FBQzVELFFBQVEsR0FBYyxFQUFFO0lBQzVCLEtBQUs7U0FDQSxNQUFNOzs7O0lBQ0gsQ0FBQyxDQUFVLEVBQUUsRUFBRSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxJQUFJLElBQUksSUFBSSxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBQztTQUM1RixJQUFJOzs7OztJQUFDLENBQUMsRUFBVyxFQUFFLEVBQVcsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUMsVUFBVSxFQUFDO1NBQ2pFLE9BQU87Ozs7SUFBQyxDQUFDLENBQVUsRUFBRSxFQUFFO1FBQ3RCLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakIsUUFBUSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN4RCxDQUFDLEVBQUMsQ0FBQztJQUNQLE9BQU8sUUFBUSxDQUFDO0FBQ2xCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTggR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZOb2RlfSBmcm9tICcuLi8uLi9pbnRlcmZhY2Uvbm9kZXMvbm9kZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBvcmRlcmVkTm9kZXMobm9kZXM6IEFqZk5vZGVbXSwgcGFyZW50OiBudW1iZXJ8bnVsbCk6IEFqZk5vZGVbXSB7XG4gIGxldCBuZXdOb2RlczogQWpmTm9kZVtdID0gW107XG4gIG5vZGVzXG4gICAgICAuZmlsdGVyKFxuICAgICAgICAgIChuOiBBamZOb2RlKSA9PiBwYXJlbnQgIT0gbnVsbCA/IG4ucGFyZW50ID09IHBhcmVudCA6IG4ucGFyZW50ID09IG51bGwgfHwgbi5wYXJlbnQgPT09IDApXG4gICAgICAuc29ydCgobjE6IEFqZk5vZGUsIG4yOiBBamZOb2RlKSA9PiBuMS5wYXJlbnROb2RlIC0gbjIucGFyZW50Tm9kZSlcbiAgICAgIC5mb3JFYWNoKChuOiBBamZOb2RlKSA9PiB7XG4gICAgICAgIG5ld05vZGVzLnB1c2gobik7XG4gICAgICAgIG5ld05vZGVzID0gbmV3Tm9kZXMuY29uY2F0KG9yZGVyZWROb2Rlcyhub2Rlcywgbi5pZCkpO1xuICAgICAgfSk7XG4gIHJldHVybiBuZXdOb2Rlcztcbn1cbiJdfQ==