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
import { createNodeInstance } from './create-node-instance';
export function createNodeGroupInstance(instance) {
    const nodeInstance = createNodeInstance(instance);
    return Object.assign(Object.assign({}, nodeInstance), { node: instance.node, formulaReps: instance.formulaReps, reps: 0, nodes: [], flatNodes: [] });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLW5vZGUtZ3JvdXAtaW5zdGFuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9mb3Jtcy91dGlscy9ub2Rlcy1pbnN0YW5jZXMvY3JlYXRlLW5vZGUtZ3JvdXAtaW5zdGFuY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBR0gsT0FBTyxFQUF3QixrQkFBa0IsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBSWpGLE1BQU0sVUFBVSx1QkFBdUIsQ0FBQyxRQUFvQztJQUUxRSxNQUFNLFlBQVksR0FBRyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNsRCx1Q0FDSyxZQUFZLEtBQ2YsSUFBSSxFQUFFLFFBQVEsQ0FBQyxJQUFJLEVBQ25CLFdBQVcsRUFBRSxRQUFRLENBQUMsV0FBVyxFQUNqQyxJQUFJLEVBQUUsQ0FBQyxFQUNQLEtBQUssRUFBRSxFQUFFLEVBQ1QsU0FBUyxFQUFFLEVBQUUsSUFDYjtBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmTm9kZUdyb3VwSW5zdGFuY2V9IGZyb20gJy4uLy4uL2ludGVyZmFjZS9ub2Rlcy1pbnN0YW5jZXMvbm9kZS1ncm91cC1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZk5vZGVJbnN0YW5jZUNyZWF0ZSwgY3JlYXRlTm9kZUluc3RhbmNlfSBmcm9tICcuL2NyZWF0ZS1ub2RlLWluc3RhbmNlJztcblxuZXhwb3J0IHR5cGUgQWpmTm9kZUdyb3VwSW5zdGFuY2VDcmVhdGUgPSBBamZOb2RlSW5zdGFuY2VDcmVhdGUmUGFydGlhbDxBamZOb2RlR3JvdXBJbnN0YW5jZT47XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVOb2RlR3JvdXBJbnN0YW5jZShpbnN0YW5jZTogQWpmTm9kZUdyb3VwSW5zdGFuY2VDcmVhdGUpOlxuICAgIEFqZk5vZGVHcm91cEluc3RhbmNlIHtcbiAgY29uc3Qgbm9kZUluc3RhbmNlID0gY3JlYXRlTm9kZUluc3RhbmNlKGluc3RhbmNlKTtcbiAgcmV0dXJuIHtcbiAgICAuLi5ub2RlSW5zdGFuY2UsXG4gICAgbm9kZTogaW5zdGFuY2Uubm9kZSxcbiAgICBmb3JtdWxhUmVwczogaW5zdGFuY2UuZm9ybXVsYVJlcHMsXG4gICAgcmVwczogMCxcbiAgICBub2RlczogW10sXG4gICAgZmxhdE5vZGVzOiBbXSxcbiAgfTtcbn1cbiJdfQ==