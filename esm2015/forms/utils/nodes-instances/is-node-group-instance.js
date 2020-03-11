/**
 * @fileoverview added by tsickle
 * Generated from: src/core/forms/utils/nodes-instances/is-node-group-instance.ts
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
import { isNodeGroup } from '../nodes/is-node-group';
/**
 * @param {?} nodeInstance
 * @return {?}
 */
export function isNodeGroupInstance(nodeInstance) {
    return nodeInstance != null && nodeInstance.node != null && isNodeGroup(nodeInstance.node);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXMtbm9kZS1ncm91cC1pbnN0YW5jZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2Zvcm1zL3V0aWxzL25vZGVzLWluc3RhbmNlcy9pcy1ub2RlLWdyb3VwLWluc3RhbmNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBdUJBLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQzs7Ozs7QUFFbkQsTUFBTSxVQUFVLG1CQUFtQixDQUFDLFlBQTZCO0lBQy9ELE9BQU8sWUFBWSxJQUFJLElBQUksSUFBSSxZQUFZLENBQUMsSUFBSSxJQUFJLElBQUksSUFBSSxXQUFXLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzdGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmTm9kZUluc3RhbmNlfSBmcm9tICcuLi8uLi9pbnRlcmZhY2Uvbm9kZXMtaW5zdGFuY2VzL25vZGUtaW5zdGFuY2UnO1xuaW1wb3J0IHtpc05vZGVHcm91cH0gZnJvbSAnLi4vbm9kZXMvaXMtbm9kZS1ncm91cCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBpc05vZGVHcm91cEluc3RhbmNlKG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlKTogYm9vbGVhbiB7XG4gIHJldHVybiBub2RlSW5zdGFuY2UgIT0gbnVsbCAmJiBub2RlSW5zdGFuY2Uubm9kZSAhPSBudWxsICYmIGlzTm9kZUdyb3VwKG5vZGVJbnN0YW5jZS5ub2RlKTtcbn1cbiJdfQ==