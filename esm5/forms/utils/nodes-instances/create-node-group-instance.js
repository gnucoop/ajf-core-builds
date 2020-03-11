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
import { __assign } from "tslib";
import { createNodeInstance } from './create-node-instance';
export function createNodeGroupInstance(instance) {
    var nodeInstance = createNodeInstance(instance);
    return __assign(__assign({}, nodeInstance), { node: instance.node, formulaReps: instance.formulaReps, reps: 0, nodes: [], flatNodes: [] });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLW5vZGUtZ3JvdXAtaW5zdGFuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9mb3Jtcy91dGlscy9ub2Rlcy1pbnN0YW5jZXMvY3JlYXRlLW5vZGUtZ3JvdXAtaW5zdGFuY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHOztBQUdILE9BQU8sRUFBd0Isa0JBQWtCLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUlqRixNQUFNLFVBQVUsdUJBQXVCLENBQUMsUUFBb0M7SUFFMUUsSUFBTSxZQUFZLEdBQUcsa0JBQWtCLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDbEQsNkJBQ0ssWUFBWSxLQUNmLElBQUksRUFBRSxRQUFRLENBQUMsSUFBSSxFQUNuQixXQUFXLEVBQUUsUUFBUSxDQUFDLFdBQVcsRUFDakMsSUFBSSxFQUFFLENBQUMsRUFDUCxLQUFLLEVBQUUsRUFBRSxFQUNULFNBQVMsRUFBRSxFQUFFLElBQ2I7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZk5vZGVHcm91cEluc3RhbmNlfSBmcm9tICcuLi8uLi9pbnRlcmZhY2Uvbm9kZXMtaW5zdGFuY2VzL25vZGUtZ3JvdXAtaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZOb2RlSW5zdGFuY2VDcmVhdGUsIGNyZWF0ZU5vZGVJbnN0YW5jZX0gZnJvbSAnLi9jcmVhdGUtbm9kZS1pbnN0YW5jZSc7XG5cbmV4cG9ydCB0eXBlIEFqZk5vZGVHcm91cEluc3RhbmNlQ3JlYXRlID0gQWpmTm9kZUluc3RhbmNlQ3JlYXRlJlBhcnRpYWw8QWpmTm9kZUdyb3VwSW5zdGFuY2U+O1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlTm9kZUdyb3VwSW5zdGFuY2UoaW5zdGFuY2U6IEFqZk5vZGVHcm91cEluc3RhbmNlQ3JlYXRlKTpcbiAgICBBamZOb2RlR3JvdXBJbnN0YW5jZSB7XG4gIGNvbnN0IG5vZGVJbnN0YW5jZSA9IGNyZWF0ZU5vZGVJbnN0YW5jZShpbnN0YW5jZSk7XG4gIHJldHVybiB7XG4gICAgLi4ubm9kZUluc3RhbmNlLFxuICAgIG5vZGU6IGluc3RhbmNlLm5vZGUsXG4gICAgZm9ybXVsYVJlcHM6IGluc3RhbmNlLmZvcm11bGFSZXBzLFxuICAgIHJlcHM6IDAsXG4gICAgbm9kZXM6IFtdLFxuICAgIGZsYXROb2RlczogW10sXG4gIH07XG59XG4iXX0=