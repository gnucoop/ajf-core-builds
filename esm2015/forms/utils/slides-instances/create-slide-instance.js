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
export function createSlideInstance(instance) {
    const nodeInstance = createNodeInstance(instance);
    return Object.assign(Object.assign({}, nodeInstance), { node: instance.node, nodes: [], slideNodes: [], flatNodes: [], valid: false, position: 0, editable: instance.editable || true, readonly: instance.node.readonly || neverCondition() });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLXNsaWRlLWluc3RhbmNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvZm9ybXMvdXRpbHMvc2xpZGVzLWluc3RhbmNlcy9jcmVhdGUtc2xpZGUtaW5zdGFuY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBRWhELE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLHlDQUF5QyxDQUFDO0FBSzNFLE1BQU0sVUFBVSxtQkFBbUIsQ0FBQyxRQUFnQztJQUNsRSxNQUFNLFlBQVksR0FBRyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNsRCx1Q0FDSyxZQUFZLEtBQ2YsSUFBSSxFQUFFLFFBQVEsQ0FBQyxJQUFJLEVBQ25CLEtBQUssRUFBRSxFQUFFLEVBQ1QsVUFBVSxFQUFFLEVBQUUsRUFDZCxTQUFTLEVBQUUsRUFBRSxFQUNiLEtBQUssRUFBRSxLQUFLLEVBQ1osUUFBUSxFQUFFLENBQUMsRUFDWCxRQUFRLEVBQUUsUUFBUSxDQUFDLFFBQVEsSUFBSSxJQUFJLEVBQ25DLFFBQVEsRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxjQUFjLEVBQUUsSUFDcEQ7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge25ldmVyQ29uZGl0aW9ufSBmcm9tICdAYWpmL2NvcmUvbW9kZWxzJztcbmltcG9ydCB7QWpmU2xpZGVJbnN0YW5jZX0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL3NsaWRlcy1pbnN0YW5jZXMvc2xpZGUtaW5zdGFuY2UnO1xuaW1wb3J0IHtjcmVhdGVOb2RlSW5zdGFuY2V9IGZyb20gJy4uL25vZGVzLWluc3RhbmNlcy9jcmVhdGUtbm9kZS1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZkJhc2VTbGlkZUluc3RhbmNlQ3JlYXRlfSBmcm9tICcuL2Jhc2UnO1xuXG5leHBvcnQgdHlwZSBBamZTbGlkZUluc3RhbmNlQ3JlYXRlID0gQWpmQmFzZVNsaWRlSW5zdGFuY2VDcmVhdGUmUGFydGlhbDxBamZTbGlkZUluc3RhbmNlPjtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNsaWRlSW5zdGFuY2UoaW5zdGFuY2U6IEFqZlNsaWRlSW5zdGFuY2VDcmVhdGUpOiBBamZTbGlkZUluc3RhbmNlIHtcbiAgY29uc3Qgbm9kZUluc3RhbmNlID0gY3JlYXRlTm9kZUluc3RhbmNlKGluc3RhbmNlKTtcbiAgcmV0dXJuIHtcbiAgICAuLi5ub2RlSW5zdGFuY2UsXG4gICAgbm9kZTogaW5zdGFuY2Uubm9kZSxcbiAgICBub2RlczogW10sXG4gICAgc2xpZGVOb2RlczogW10sXG4gICAgZmxhdE5vZGVzOiBbXSxcbiAgICB2YWxpZDogZmFsc2UsXG4gICAgcG9zaXRpb246IDAsXG4gICAgZWRpdGFibGU6IGluc3RhbmNlLmVkaXRhYmxlIHx8IHRydWUsXG4gICAgcmVhZG9ubHk6IGluc3RhbmNlLm5vZGUucmVhZG9ubHkgfHwgbmV2ZXJDb25kaXRpb24oKVxuICB9O1xufVxuIl19