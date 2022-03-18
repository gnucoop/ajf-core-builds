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
import { evaluateExpression } from '@ajf/core/models';
import { AjfAggregationType } from '../../interface/aggregation/aggregation-type';
export function evaluateAggregation(aggregation, formulas, context) {
    const data = formulas.map(f => evaluateExpression(f.formula, context));
    switch (aggregation.aggregation) {
        case AjfAggregationType.None:
            if (data.length !== 1) {
                throw new Error('Invalid aggregation');
            }
            return data[0];
        case AjfAggregationType.Sum:
            return data.map((r) => r.reduce((s, d) => s + d, 0));
        case AjfAggregationType.Average:
        case AjfAggregationType.WeightedAverage:
            return data.map((r) => {
                const sum = r.reduce((s, d) => s + d, 0);
                return sum / data.length;
            });
        default:
            return [];
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZhbHVhdGUtYWdncmVnYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL3JlcG9ydHMvc3JjL3V0aWxzL2FnZ3JlZ2F0aW9uL2V2YWx1YXRlLWFnZ3JlZ2F0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFBeUIsa0JBQWtCLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUU1RSxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSw4Q0FBOEMsQ0FBQztBQUVoRixNQUFNLFVBQVUsbUJBQW1CLENBQ2pDLFdBQTJCLEVBQzNCLFFBQXNCLEVBQ3RCLE9BQW1CO0lBRW5CLE1BQU0sSUFBSSxHQUFVLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDOUUsUUFBUSxXQUFXLENBQUMsV0FBVyxFQUFFO1FBQy9CLEtBQUssa0JBQWtCLENBQUMsSUFBSTtZQUMxQixJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO2dCQUNyQixNQUFNLElBQUksS0FBSyxDQUFDLHFCQUFxQixDQUFDLENBQUM7YUFDeEM7WUFDRCxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqQixLQUFLLGtCQUFrQixDQUFDLEdBQUc7WUFDekIsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBTSxFQUFFLENBQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RFLEtBQUssa0JBQWtCLENBQUMsT0FBTyxDQUFDO1FBQ2hDLEtBQUssa0JBQWtCLENBQUMsZUFBZTtZQUNyQyxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFNLEVBQUUsRUFBRTtnQkFDekIsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQU0sRUFBRSxDQUFNLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ25ELE9BQU8sR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDM0IsQ0FBQyxDQUFDLENBQUM7UUFDTDtZQUNFLE9BQU8sRUFBRSxDQUFDO0tBQ2I7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkNvbnRleHQsIEFqZkZvcm11bGEsIGV2YWx1YXRlRXhwcmVzc2lvbn0gZnJvbSAnQGFqZi9jb3JlL21vZGVscyc7XG5pbXBvcnQge0FqZkFnZ3JlZ2F0aW9ufSBmcm9tICcuLi8uLi9pbnRlcmZhY2UvYWdncmVnYXRpb24vYWdncmVnYXRpb24nO1xuaW1wb3J0IHtBamZBZ2dyZWdhdGlvblR5cGV9IGZyb20gJy4uLy4uL2ludGVyZmFjZS9hZ2dyZWdhdGlvbi9hZ2dyZWdhdGlvbi10eXBlJztcblxuZXhwb3J0IGZ1bmN0aW9uIGV2YWx1YXRlQWdncmVnYXRpb24oXG4gIGFnZ3JlZ2F0aW9uOiBBamZBZ2dyZWdhdGlvbixcbiAgZm9ybXVsYXM6IEFqZkZvcm11bGFbXSxcbiAgY29udGV4dDogQWpmQ29udGV4dCxcbik6IG51bWJlcltdIHtcbiAgY29uc3QgZGF0YTogYW55W10gPSBmb3JtdWxhcy5tYXAoZiA9PiBldmFsdWF0ZUV4cHJlc3Npb24oZi5mb3JtdWxhLCBjb250ZXh0KSk7XG4gIHN3aXRjaCAoYWdncmVnYXRpb24uYWdncmVnYXRpb24pIHtcbiAgICBjYXNlIEFqZkFnZ3JlZ2F0aW9uVHlwZS5Ob25lOlxuICAgICAgaWYgKGRhdGEubGVuZ3RoICE9PSAxKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBhZ2dyZWdhdGlvbicpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGRhdGFbMF07XG4gICAgY2FzZSBBamZBZ2dyZWdhdGlvblR5cGUuU3VtOlxuICAgICAgcmV0dXJuIGRhdGEubWFwKChyOiBhbnkpID0+IHIucmVkdWNlKChzOiBhbnksIGQ6IGFueSkgPT4gcyArIGQsIDApKTtcbiAgICBjYXNlIEFqZkFnZ3JlZ2F0aW9uVHlwZS5BdmVyYWdlOlxuICAgIGNhc2UgQWpmQWdncmVnYXRpb25UeXBlLldlaWdodGVkQXZlcmFnZTpcbiAgICAgIHJldHVybiBkYXRhLm1hcCgocjogYW55KSA9PiB7XG4gICAgICAgIGNvbnN0IHN1bSA9IHIucmVkdWNlKChzOiBhbnksIGQ6IGFueSkgPT4gcyArIGQsIDApO1xuICAgICAgICByZXR1cm4gc3VtIC8gZGF0YS5sZW5ndGg7XG4gICAgICB9KTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIFtdO1xuICB9XG59XG4iXX0=