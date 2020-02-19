/**
 * @fileoverview added by tsickle
 * Generated from: src/core/forms/utils/nodes-instances/flatten-node-instances.ts
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
 * @param {?=} nodes
 * @return {?}
 */
export function flattenNodeInstances(nodes = []) {
    /** @type {?} */
    let flatNodes = [];
    nodes.forEach((/**
     * @param {?} nodeInstance
     * @return {?}
     */
    (nodeInstance) => {
        flatNodes.push(nodeInstance);
        if (isContainerNodeInstance(nodeInstance)) {
            flatNodes =
                flatNodes.concat(flattenNodeInstances(((/** @type {?} */ (nodeInstance))).nodes));
        }
    }));
    return flatNodes;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxhdHRlbi1ub2RlLWluc3RhbmNlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2Zvcm1zL3V0aWxzL25vZGVzLWluc3RhbmNlcy9mbGF0dGVuLW5vZGUtaW5zdGFuY2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBeUJBLE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLDhCQUE4QixDQUFDOzs7OztBQUVyRSxNQUFNLFVBQVUsb0JBQW9CLENBQUMsUUFBMkIsRUFBRTs7UUFDNUQsU0FBUyxHQUFzQixFQUFFO0lBQ3JDLEtBQUssQ0FBQyxPQUFPOzs7O0lBQUMsQ0FBQyxZQUE2QixFQUFFLEVBQUU7UUFDOUMsU0FBUyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUM3QixJQUFJLHVCQUF1QixDQUFDLFlBQVksQ0FBQyxFQUFFO1lBQ3pDLFNBQVM7Z0JBQ0wsU0FBUyxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLG1CQUFBLFlBQVksRUFBNEIsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7U0FDOUY7SUFDSCxDQUFDLEVBQUMsQ0FBQztJQUNILE9BQU8sU0FBUyxDQUFDO0FBQ25CLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTggR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZDb250YWluZXJOb2RlSW5zdGFuY2V9IGZyb20gJy4uLy4uL2ludGVyZmFjZS9ub2Rlcy1pbnN0YW5jZXMvY29udGFpbmVyLW5vZGUtaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZOb2RlSW5zdGFuY2V9IGZyb20gJy4uLy4uL2ludGVyZmFjZS9ub2Rlcy1pbnN0YW5jZXMvbm9kZS1pbnN0YW5jZSc7XG5cbmltcG9ydCB7aXNDb250YWluZXJOb2RlSW5zdGFuY2V9IGZyb20gJy4vaXMtY29udGFpbmVyLW5vZGUtaW5zdGFuY2UnO1xuXG5leHBvcnQgZnVuY3Rpb24gZmxhdHRlbk5vZGVJbnN0YW5jZXMobm9kZXM6IEFqZk5vZGVJbnN0YW5jZVtdID0gW10pOiBBamZOb2RlSW5zdGFuY2VbXSB7XG4gIGxldCBmbGF0Tm9kZXM6IEFqZk5vZGVJbnN0YW5jZVtdID0gW107XG4gIG5vZGVzLmZvckVhY2goKG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlKSA9PiB7XG4gICAgZmxhdE5vZGVzLnB1c2gobm9kZUluc3RhbmNlKTtcbiAgICBpZiAoaXNDb250YWluZXJOb2RlSW5zdGFuY2Uobm9kZUluc3RhbmNlKSkge1xuICAgICAgZmxhdE5vZGVzID1cbiAgICAgICAgICBmbGF0Tm9kZXMuY29uY2F0KGZsYXR0ZW5Ob2RlSW5zdGFuY2VzKChub2RlSW5zdGFuY2UgYXMgQWpmQ29udGFpbmVyTm9kZUluc3RhbmNlKS5ub2RlcykpO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBmbGF0Tm9kZXM7XG59XG4iXX0=