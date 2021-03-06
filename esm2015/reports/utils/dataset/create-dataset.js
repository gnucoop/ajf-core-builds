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
import { AjfAggregationType } from '../../interface/aggregation/aggregation-type';
import { createAggregation } from '../aggregation/create-aggregation';
export function createDataset(dataset) {
    return Object.assign(Object.assign({}, dataset), { aggregation: dataset.aggregation || createAggregation({ aggregation: AjfAggregationType.None }) });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLWRhdGFzZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9yZXBvcnRzL3V0aWxzL2RhdGFzZXQvY3JlYXRlLWRhdGFzZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sOENBQThDLENBQUM7QUFFaEYsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sbUNBQW1DLENBQUM7QUFFcEUsTUFBTSxVQUFVLGFBQWEsQ0FBQyxPQUE0QjtJQUN4RCx1Q0FDSyxPQUFPLEtBQ1YsV0FBVyxFQUFFLE9BQU8sQ0FBQyxXQUFXLElBQUksaUJBQWlCLENBQUMsRUFBQyxXQUFXLEVBQUUsa0JBQWtCLENBQUMsSUFBSSxFQUFDLENBQUMsSUFDN0Y7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkFnZ3JlZ2F0aW9uVHlwZX0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL2FnZ3JlZ2F0aW9uL2FnZ3JlZ2F0aW9uLXR5cGUnO1xuaW1wb3J0IHtBamZEYXRhc2V0fSBmcm9tICcuLi8uLi9pbnRlcmZhY2UvZGF0YXNldC9kYXRhc2V0JztcbmltcG9ydCB7Y3JlYXRlQWdncmVnYXRpb259IGZyb20gJy4uL2FnZ3JlZ2F0aW9uL2NyZWF0ZS1hZ2dyZWdhdGlvbic7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVEYXRhc2V0KGRhdGFzZXQ6IFBhcnRpYWw8QWpmRGF0YXNldD4pOiBBamZEYXRhc2V0IHtcbiAgcmV0dXJuIHtcbiAgICAuLi5kYXRhc2V0LFxuICAgIGFnZ3JlZ2F0aW9uOiBkYXRhc2V0LmFnZ3JlZ2F0aW9uIHx8IGNyZWF0ZUFnZ3JlZ2F0aW9uKHthZ2dyZWdhdGlvbjogQWpmQWdncmVnYXRpb25UeXBlLk5vbmV9KSxcbiAgfTtcbn1cbiJdfQ==