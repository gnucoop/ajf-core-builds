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
import { neverCondition } from '@ajf/core/models';
import { createNodeInstance } from '../nodes-instances/create-node-instance';
/**
 * It creates AjfSlideInstance.
 * Init nodes,slideNodes and flatNodes with empty array.
 * Init valid with false.
 * Init position with 0.
 */
export function createSlideInstance(instance) {
    const nodeInstance = createNodeInstance(instance);
    return Object.assign(Object.assign({}, nodeInstance), { node: instance.node, nodes: [], slideNodes: [], flatNodes: [], valid: false, position: 0, editable: instance.editable || true, readonly: instance.node.readonly || neverCondition() });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLXNsaWRlLWluc3RhbmNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvZm9ybXMvdXRpbHMvc2xpZGVzLWluc3RhbmNlcy9jcmVhdGUtc2xpZGUtaW5zdGFuY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBRWhELE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLHlDQUF5QyxDQUFDO0FBSzNFOzs7OztHQUtHO0FBQ0gsTUFBTSxVQUFVLG1CQUFtQixDQUFDLFFBQWdDO0lBQ2xFLE1BQU0sWUFBWSxHQUFHLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2xELHVDQUNLLFlBQVksS0FDZixJQUFJLEVBQUUsUUFBUSxDQUFDLElBQUksRUFDbkIsS0FBSyxFQUFFLEVBQUUsRUFDVCxVQUFVLEVBQUUsRUFBRSxFQUNkLFNBQVMsRUFBRSxFQUFFLEVBQ2IsS0FBSyxFQUFFLEtBQUssRUFDWixRQUFRLEVBQUUsQ0FBQyxFQUNYLFFBQVEsRUFBRSxRQUFRLENBQUMsUUFBUSxJQUFJLElBQUksRUFDbkMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLGNBQWMsRUFBRSxJQUNwRDtBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7bmV2ZXJDb25kaXRpb259IGZyb20gJ0BhamYvY29yZS9tb2RlbHMnO1xuaW1wb3J0IHtBamZTbGlkZUluc3RhbmNlfSBmcm9tICcuLi8uLi9pbnRlcmZhY2Uvc2xpZGVzLWluc3RhbmNlcy9zbGlkZS1pbnN0YW5jZSc7XG5pbXBvcnQge2NyZWF0ZU5vZGVJbnN0YW5jZX0gZnJvbSAnLi4vbm9kZXMtaW5zdGFuY2VzL2NyZWF0ZS1ub2RlLWluc3RhbmNlJztcbmltcG9ydCB7QWpmQmFzZVNsaWRlSW5zdGFuY2VDcmVhdGV9IGZyb20gJy4vYmFzZSc7XG5cbmV4cG9ydCB0eXBlIEFqZlNsaWRlSW5zdGFuY2VDcmVhdGUgPSBBamZCYXNlU2xpZGVJbnN0YW5jZUNyZWF0ZSZQYXJ0aWFsPEFqZlNsaWRlSW5zdGFuY2U+O1xuXG4vKipcbiAqIEl0IGNyZWF0ZXMgQWpmU2xpZGVJbnN0YW5jZS5cbiAqIEluaXQgbm9kZXMsc2xpZGVOb2RlcyBhbmQgZmxhdE5vZGVzIHdpdGggZW1wdHkgYXJyYXkuXG4gKiBJbml0IHZhbGlkIHdpdGggZmFsc2UuXG4gKiBJbml0IHBvc2l0aW9uIHdpdGggMC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNsaWRlSW5zdGFuY2UoaW5zdGFuY2U6IEFqZlNsaWRlSW5zdGFuY2VDcmVhdGUpOiBBamZTbGlkZUluc3RhbmNlIHtcbiAgY29uc3Qgbm9kZUluc3RhbmNlID0gY3JlYXRlTm9kZUluc3RhbmNlKGluc3RhbmNlKTtcbiAgcmV0dXJuIHtcbiAgICAuLi5ub2RlSW5zdGFuY2UsXG4gICAgbm9kZTogaW5zdGFuY2Uubm9kZSxcbiAgICBub2RlczogW10sXG4gICAgc2xpZGVOb2RlczogW10sXG4gICAgZmxhdE5vZGVzOiBbXSxcbiAgICB2YWxpZDogZmFsc2UsXG4gICAgcG9zaXRpb246IDAsXG4gICAgZWRpdGFibGU6IGluc3RhbmNlLmVkaXRhYmxlIHx8IHRydWUsXG4gICAgcmVhZG9ubHk6IGluc3RhbmNlLm5vZGUucmVhZG9ubHkgfHwgbmV2ZXJDb25kaXRpb24oKVxuICB9O1xufVxuIl19