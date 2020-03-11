/**
 * @fileoverview added by tsickle
 * Generated from: src/core/forms/utils/nodes-instances/flatten-node-instances.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxhdHRlbi1ub2RlLWluc3RhbmNlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2Zvcm1zL3V0aWxzL25vZGVzLWluc3RhbmNlcy9mbGF0dGVuLW5vZGUtaW5zdGFuY2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBeUJBLE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLDhCQUE4QixDQUFDOzs7OztBQUVyRSxNQUFNLFVBQVUsb0JBQW9CLENBQUMsUUFBMkIsRUFBRTs7UUFDNUQsU0FBUyxHQUFzQixFQUFFO0lBQ3JDLEtBQUssQ0FBQyxPQUFPOzs7O0lBQUMsQ0FBQyxZQUE2QixFQUFFLEVBQUU7UUFDOUMsU0FBUyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUM3QixJQUFJLHVCQUF1QixDQUFDLFlBQVksQ0FBQyxFQUFFO1lBQ3pDLFNBQVM7Z0JBQ0wsU0FBUyxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLG1CQUFBLFlBQVksRUFBNEIsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7U0FDOUY7SUFDSCxDQUFDLEVBQUMsQ0FBQztJQUNILE9BQU8sU0FBUyxDQUFDO0FBQ25CLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmQ29udGFpbmVyTm9kZUluc3RhbmNlfSBmcm9tICcuLi8uLi9pbnRlcmZhY2Uvbm9kZXMtaW5zdGFuY2VzL2NvbnRhaW5lci1ub2RlLWluc3RhbmNlJztcbmltcG9ydCB7QWpmTm9kZUluc3RhbmNlfSBmcm9tICcuLi8uLi9pbnRlcmZhY2Uvbm9kZXMtaW5zdGFuY2VzL25vZGUtaW5zdGFuY2UnO1xuXG5pbXBvcnQge2lzQ29udGFpbmVyTm9kZUluc3RhbmNlfSBmcm9tICcuL2lzLWNvbnRhaW5lci1ub2RlLWluc3RhbmNlJztcblxuZXhwb3J0IGZ1bmN0aW9uIGZsYXR0ZW5Ob2RlSW5zdGFuY2VzKG5vZGVzOiBBamZOb2RlSW5zdGFuY2VbXSA9IFtdKTogQWpmTm9kZUluc3RhbmNlW10ge1xuICBsZXQgZmxhdE5vZGVzOiBBamZOb2RlSW5zdGFuY2VbXSA9IFtdO1xuICBub2Rlcy5mb3JFYWNoKChub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSkgPT4ge1xuICAgIGZsYXROb2Rlcy5wdXNoKG5vZGVJbnN0YW5jZSk7XG4gICAgaWYgKGlzQ29udGFpbmVyTm9kZUluc3RhbmNlKG5vZGVJbnN0YW5jZSkpIHtcbiAgICAgIGZsYXROb2RlcyA9XG4gICAgICAgICAgZmxhdE5vZGVzLmNvbmNhdChmbGF0dGVuTm9kZUluc3RhbmNlcygobm9kZUluc3RhbmNlIGFzIEFqZkNvbnRhaW5lck5vZGVJbnN0YW5jZSkubm9kZXMpKTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gZmxhdE5vZGVzO1xufVxuIl19