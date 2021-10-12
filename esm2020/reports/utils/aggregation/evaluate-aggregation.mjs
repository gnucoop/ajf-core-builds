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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZhbHVhdGUtYWdncmVnYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9yZXBvcnRzL3V0aWxzL2FnZ3JlZ2F0aW9uL2V2YWx1YXRlLWFnZ3JlZ2F0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFBeUIsa0JBQWtCLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUU1RSxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSw4Q0FBOEMsQ0FBQztBQUVoRixNQUFNLFVBQVUsbUJBQW1CLENBQy9CLFdBQTJCLEVBQUUsUUFBc0IsRUFBRSxPQUFtQjtJQUMxRSxNQUFNLElBQUksR0FBVSxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQzlFLFFBQVEsV0FBVyxDQUFDLFdBQVcsRUFBRTtRQUMvQixLQUFLLGtCQUFrQixDQUFDLElBQUk7WUFDMUIsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtnQkFDckIsTUFBTSxJQUFJLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO2FBQ3hDO1lBQ0QsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakIsS0FBSyxrQkFBa0IsQ0FBQyxHQUFHO1lBQ3pCLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQU0sRUFBRSxDQUFNLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0RSxLQUFLLGtCQUFrQixDQUFDLE9BQU8sQ0FBQztRQUNoQyxLQUFLLGtCQUFrQixDQUFDLGVBQWU7WUFDckMsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBTSxFQUFFLEVBQUU7Z0JBQ3pCLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFNLEVBQUUsQ0FBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUNuRCxPQUFPLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQzNCLENBQUMsQ0FBQyxDQUFDO1FBQ0w7WUFDRSxPQUFPLEVBQUUsQ0FBQztLQUNiO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZDb250ZXh0LCBBamZGb3JtdWxhLCBldmFsdWF0ZUV4cHJlc3Npb259IGZyb20gJ0BhamYvY29yZS9tb2RlbHMnO1xuaW1wb3J0IHtBamZBZ2dyZWdhdGlvbn0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL2FnZ3JlZ2F0aW9uL2FnZ3JlZ2F0aW9uJztcbmltcG9ydCB7QWpmQWdncmVnYXRpb25UeXBlfSBmcm9tICcuLi8uLi9pbnRlcmZhY2UvYWdncmVnYXRpb24vYWdncmVnYXRpb24tdHlwZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBldmFsdWF0ZUFnZ3JlZ2F0aW9uKFxuICAgIGFnZ3JlZ2F0aW9uOiBBamZBZ2dyZWdhdGlvbiwgZm9ybXVsYXM6IEFqZkZvcm11bGFbXSwgY29udGV4dDogQWpmQ29udGV4dCk6IG51bWJlcltdIHtcbiAgY29uc3QgZGF0YTogYW55W10gPSBmb3JtdWxhcy5tYXAoZiA9PiBldmFsdWF0ZUV4cHJlc3Npb24oZi5mb3JtdWxhLCBjb250ZXh0KSk7XG4gIHN3aXRjaCAoYWdncmVnYXRpb24uYWdncmVnYXRpb24pIHtcbiAgICBjYXNlIEFqZkFnZ3JlZ2F0aW9uVHlwZS5Ob25lOlxuICAgICAgaWYgKGRhdGEubGVuZ3RoICE9PSAxKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBhZ2dyZWdhdGlvbicpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGRhdGFbMF07XG4gICAgY2FzZSBBamZBZ2dyZWdhdGlvblR5cGUuU3VtOlxuICAgICAgcmV0dXJuIGRhdGEubWFwKChyOiBhbnkpID0+IHIucmVkdWNlKChzOiBhbnksIGQ6IGFueSkgPT4gcyArIGQsIDApKTtcbiAgICBjYXNlIEFqZkFnZ3JlZ2F0aW9uVHlwZS5BdmVyYWdlOlxuICAgIGNhc2UgQWpmQWdncmVnYXRpb25UeXBlLldlaWdodGVkQXZlcmFnZTpcbiAgICAgIHJldHVybiBkYXRhLm1hcCgocjogYW55KSA9PiB7XG4gICAgICAgIGNvbnN0IHN1bSA9IHIucmVkdWNlKChzOiBhbnksIGQ6IGFueSkgPT4gcyArIGQsIDApO1xuICAgICAgICByZXR1cm4gc3VtIC8gZGF0YS5sZW5ndGg7XG4gICAgICB9KTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIFtdO1xuICB9XG59XG4iXX0=