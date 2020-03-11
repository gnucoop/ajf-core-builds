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
    var data = formulas.map(function (f) { return evaluateExpression(f.formula, context); });
    switch (aggregation.aggregation) {
        case AjfAggregationType.None:
            if (data.length !== 1) {
                throw new Error('Invalid aggregation');
            }
            return data[0];
        case AjfAggregationType.Sum:
            return data.map(function (r) { return r.reduce(function (s, d) { return s + d; }, 0); });
        case AjfAggregationType.Average:
        case AjfAggregationType.WeightedAverage:
            return data.map(function (r) {
                var sum = r.reduce(function (s, d) { return s + d; }, 0);
                return sum / data.length;
            });
        default:
            return [];
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZhbHVhdGUtYWdncmVnYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9yZXBvcnRzL3V0aWxzL2FnZ3JlZ2F0aW9uL2V2YWx1YXRlLWFnZ3JlZ2F0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFBeUIsa0JBQWtCLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUU1RSxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSw4Q0FBOEMsQ0FBQztBQUVoRixNQUFNLFVBQVUsbUJBQW1CLENBQy9CLFdBQTJCLEVBQUUsUUFBc0IsRUFBRSxPQUFtQjtJQUMxRSxJQUFNLElBQUksR0FBVSxRQUFRLENBQUMsR0FBRyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsRUFBdEMsQ0FBc0MsQ0FBQyxDQUFDO0lBQzlFLFFBQVEsV0FBVyxDQUFDLFdBQVcsRUFBRTtRQUMvQixLQUFLLGtCQUFrQixDQUFDLElBQUk7WUFDMUIsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtnQkFDckIsTUFBTSxJQUFJLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO2FBQ3hDO1lBQ0QsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakIsS0FBSyxrQkFBa0IsQ0FBQyxHQUFHO1lBQ3pCLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFDLENBQU0sSUFBSyxPQUFBLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBQyxDQUFNLEVBQUUsQ0FBTSxJQUFLLE9BQUEsQ0FBQyxHQUFHLENBQUMsRUFBTCxDQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQXRDLENBQXNDLENBQUMsQ0FBQztRQUN0RSxLQUFLLGtCQUFrQixDQUFDLE9BQU8sQ0FBQztRQUNoQyxLQUFLLGtCQUFrQixDQUFDLGVBQWU7WUFDckMsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQUMsQ0FBTTtnQkFDckIsSUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFDLENBQU0sRUFBRSxDQUFNLElBQUssT0FBQSxDQUFDLEdBQUcsQ0FBQyxFQUFMLENBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDbkQsT0FBTyxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUMzQixDQUFDLENBQUMsQ0FBQztRQUNMO1lBQ0UsT0FBTyxFQUFFLENBQUM7S0FDYjtBQUNILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmQ29udGV4dCwgQWpmRm9ybXVsYSwgZXZhbHVhdGVFeHByZXNzaW9ufSBmcm9tICdAYWpmL2NvcmUvbW9kZWxzJztcbmltcG9ydCB7QWpmQWdncmVnYXRpb259IGZyb20gJy4uLy4uL2ludGVyZmFjZS9hZ2dyZWdhdGlvbi9hZ2dyZWdhdGlvbic7XG5pbXBvcnQge0FqZkFnZ3JlZ2F0aW9uVHlwZX0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL2FnZ3JlZ2F0aW9uL2FnZ3JlZ2F0aW9uLXR5cGUnO1xuXG5leHBvcnQgZnVuY3Rpb24gZXZhbHVhdGVBZ2dyZWdhdGlvbihcbiAgICBhZ2dyZWdhdGlvbjogQWpmQWdncmVnYXRpb24sIGZvcm11bGFzOiBBamZGb3JtdWxhW10sIGNvbnRleHQ6IEFqZkNvbnRleHQpOiBudW1iZXJbXSB7XG4gIGNvbnN0IGRhdGE6IGFueVtdID0gZm9ybXVsYXMubWFwKGYgPT4gZXZhbHVhdGVFeHByZXNzaW9uKGYuZm9ybXVsYSwgY29udGV4dCkpO1xuICBzd2l0Y2ggKGFnZ3JlZ2F0aW9uLmFnZ3JlZ2F0aW9uKSB7XG4gICAgY2FzZSBBamZBZ2dyZWdhdGlvblR5cGUuTm9uZTpcbiAgICAgIGlmIChkYXRhLmxlbmd0aCAhPT0gMSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgYWdncmVnYXRpb24nKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBkYXRhWzBdO1xuICAgIGNhc2UgQWpmQWdncmVnYXRpb25UeXBlLlN1bTpcbiAgICAgIHJldHVybiBkYXRhLm1hcCgocjogYW55KSA9PiByLnJlZHVjZSgoczogYW55LCBkOiBhbnkpID0+IHMgKyBkLCAwKSk7XG4gICAgY2FzZSBBamZBZ2dyZWdhdGlvblR5cGUuQXZlcmFnZTpcbiAgICBjYXNlIEFqZkFnZ3JlZ2F0aW9uVHlwZS5XZWlnaHRlZEF2ZXJhZ2U6XG4gICAgICByZXR1cm4gZGF0YS5tYXAoKHI6IGFueSkgPT4ge1xuICAgICAgICBjb25zdCBzdW0gPSByLnJlZHVjZSgoczogYW55LCBkOiBhbnkpID0+IHMgKyBkLCAwKTtcbiAgICAgICAgcmV0dXJuIHN1bSAvIGRhdGEubGVuZ3RoO1xuICAgICAgfSk7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBbXTtcbiAgfVxufVxuIl19