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
import * as vfuncs from './validation-functions';
var AjfExpressionUtils = /** @class */ (function () {
    function AjfExpressionUtils() {
    }
    AjfExpressionUtils.UTIL_FUNCTIONS = '';
    AjfExpressionUtils.utils = {
        digitCount: { fn: vfuncs.digitCount },
        decimalCount: { fn: vfuncs.decimalCount },
        isInt: { fn: vfuncs.isInt },
        notEmpty: { fn: vfuncs.notEmpty },
        valueInChoice: { fn: vfuncs.valueInChoice },
        scanGroupField: { fn: vfuncs.scanGroupField },
        sum: { fn: vfuncs.sum },
        dateOperations: { fn: vfuncs.dateOperations },
        round: { fn: vfuncs.round },
        extractArray: { fn: vfuncs.extractArray },
        extractSum: { fn: vfuncs.extractSum },
        extractArraySum: { fn: vfuncs.extractArraySum },
        drawThreshold: { fn: vfuncs.drawThreshold },
        extractDates: { fn: vfuncs.extractDates },
        lastProperty: { fn: vfuncs.lastProperty },
        sumLastProperties: { fn: vfuncs.sumLastProperties },
        calculateTrendProperty: { fn: vfuncs.calculateTrendProperty },
        calculateTrendByProperties: { fn: vfuncs.calculateTrendByProperties },
        calculateAvgProperty: { fn: vfuncs.calculateAvgProperty },
        calculateAvgPropertyArray: { fn: vfuncs.calculateAvgPropertyArray },
        alert: { fn: vfuncs.alert },
        formatNumber: { fn: vfuncs.formatNumber },
        formatDate: { fn: vfuncs.formatDate },
        isoMonth: { fn: vfuncs.isoMonth },
        getCoordinate: { fn: vfuncs.getCoordinate },
        Math: { fn: Math },
        parseInt: { fn: parseInt },
        parseFloat: { fn: parseFloat },
        parseDate: { fn: vfuncs.dateUtils.parse },
        Date: { fn: Date }
    };
    return AjfExpressionUtils;
}());
export { AjfExpressionUtils };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwcmVzc2lvbi11dGlscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL21vZGVscy91dGlscy9leHByZXNzaW9uLXV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUlILE9BQU8sS0FBSyxNQUFNLE1BQU0sd0JBQXdCLENBQUM7QUFFakQ7SUFBQTtJQW1DQSxDQUFDO0lBbENRLGlDQUFjLEdBQUcsRUFBRSxDQUFDO0lBRXBCLHdCQUFLLEdBQXNDO1FBQ2hELFVBQVUsRUFBRSxFQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsVUFBVSxFQUFDO1FBQ25DLFlBQVksRUFBRSxFQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsWUFBWSxFQUFDO1FBQ3ZDLEtBQUssRUFBRSxFQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsS0FBSyxFQUFDO1FBQ3pCLFFBQVEsRUFBRSxFQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsUUFBUSxFQUFDO1FBQy9CLGFBQWEsRUFBRSxFQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsYUFBYSxFQUFDO1FBQ3pDLGNBQWMsRUFBRSxFQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsY0FBYyxFQUFDO1FBQzNDLEdBQUcsRUFBRSxFQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsR0FBRyxFQUFDO1FBQ3JCLGNBQWMsRUFBRSxFQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsY0FBYyxFQUFDO1FBQzNDLEtBQUssRUFBRSxFQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsS0FBSyxFQUFDO1FBQ3pCLFlBQVksRUFBRSxFQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsWUFBWSxFQUFDO1FBQ3ZDLFVBQVUsRUFBRSxFQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsVUFBVSxFQUFDO1FBQ25DLGVBQWUsRUFBRSxFQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsZUFBZSxFQUFDO1FBQzdDLGFBQWEsRUFBRSxFQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsYUFBYSxFQUFDO1FBQ3pDLFlBQVksRUFBRSxFQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsWUFBWSxFQUFDO1FBQ3ZDLFlBQVksRUFBRSxFQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsWUFBWSxFQUFDO1FBQ3ZDLGlCQUFpQixFQUFFLEVBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxpQkFBaUIsRUFBQztRQUNqRCxzQkFBc0IsRUFBRSxFQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsc0JBQXNCLEVBQUM7UUFDM0QsMEJBQTBCLEVBQUUsRUFBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLDBCQUEwQixFQUFDO1FBQ25FLG9CQUFvQixFQUFFLEVBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxvQkFBb0IsRUFBQztRQUN2RCx5QkFBeUIsRUFBRSxFQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMseUJBQXlCLEVBQUM7UUFDakUsS0FBSyxFQUFFLEVBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxLQUFLLEVBQUM7UUFDekIsWUFBWSxFQUFFLEVBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxZQUFZLEVBQUM7UUFDdkMsVUFBVSxFQUFFLEVBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxVQUFVLEVBQUM7UUFDbkMsUUFBUSxFQUFFLEVBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxRQUFRLEVBQUM7UUFDL0IsYUFBYSxFQUFFLEVBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxhQUFhLEVBQUM7UUFDekMsSUFBSSxFQUFFLEVBQUMsRUFBRSxFQUFFLElBQUksRUFBQztRQUNoQixRQUFRLEVBQUUsRUFBQyxFQUFFLEVBQUUsUUFBUSxFQUFDO1FBQ3hCLFVBQVUsRUFBRSxFQUFDLEVBQUUsRUFBRSxVQUFVLEVBQUM7UUFDNUIsU0FBUyxFQUFFLEVBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFDO1FBQ3ZDLElBQUksRUFBRSxFQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUM7S0FDakIsQ0FBQztJQUNKLHlCQUFDO0NBQUEsQUFuQ0QsSUFtQ0M7U0FuQ1ksa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZlZhbGlkYXRpb25Gbn0gZnJvbSAnLi4vaW50ZXJmYWNlL3ZhbGlkYXRpb24tZnVuY3Rpb24nO1xuXG5pbXBvcnQgKiBhcyB2ZnVuY3MgZnJvbSAnLi92YWxpZGF0aW9uLWZ1bmN0aW9ucyc7XG5cbmV4cG9ydCBjbGFzcyBBamZFeHByZXNzaW9uVXRpbHMge1xuICBzdGF0aWMgVVRJTF9GVU5DVElPTlMgPSAnJztcblxuICBzdGF0aWMgdXRpbHM6IHtbbmFtZTogc3RyaW5nXTogQWpmVmFsaWRhdGlvbkZufSA9IHtcbiAgICBkaWdpdENvdW50OiB7Zm46IHZmdW5jcy5kaWdpdENvdW50fSxcbiAgICBkZWNpbWFsQ291bnQ6IHtmbjogdmZ1bmNzLmRlY2ltYWxDb3VudH0sXG4gICAgaXNJbnQ6IHtmbjogdmZ1bmNzLmlzSW50fSxcbiAgICBub3RFbXB0eToge2ZuOiB2ZnVuY3Mubm90RW1wdHl9LFxuICAgIHZhbHVlSW5DaG9pY2U6IHtmbjogdmZ1bmNzLnZhbHVlSW5DaG9pY2V9LFxuICAgIHNjYW5Hcm91cEZpZWxkOiB7Zm46IHZmdW5jcy5zY2FuR3JvdXBGaWVsZH0sXG4gICAgc3VtOiB7Zm46IHZmdW5jcy5zdW19LFxuICAgIGRhdGVPcGVyYXRpb25zOiB7Zm46IHZmdW5jcy5kYXRlT3BlcmF0aW9uc30sXG4gICAgcm91bmQ6IHtmbjogdmZ1bmNzLnJvdW5kfSxcbiAgICBleHRyYWN0QXJyYXk6IHtmbjogdmZ1bmNzLmV4dHJhY3RBcnJheX0sXG4gICAgZXh0cmFjdFN1bToge2ZuOiB2ZnVuY3MuZXh0cmFjdFN1bX0sXG4gICAgZXh0cmFjdEFycmF5U3VtOiB7Zm46IHZmdW5jcy5leHRyYWN0QXJyYXlTdW19LFxuICAgIGRyYXdUaHJlc2hvbGQ6IHtmbjogdmZ1bmNzLmRyYXdUaHJlc2hvbGR9LFxuICAgIGV4dHJhY3REYXRlczoge2ZuOiB2ZnVuY3MuZXh0cmFjdERhdGVzfSxcbiAgICBsYXN0UHJvcGVydHk6IHtmbjogdmZ1bmNzLmxhc3RQcm9wZXJ0eX0sXG4gICAgc3VtTGFzdFByb3BlcnRpZXM6IHtmbjogdmZ1bmNzLnN1bUxhc3RQcm9wZXJ0aWVzfSxcbiAgICBjYWxjdWxhdGVUcmVuZFByb3BlcnR5OiB7Zm46IHZmdW5jcy5jYWxjdWxhdGVUcmVuZFByb3BlcnR5fSxcbiAgICBjYWxjdWxhdGVUcmVuZEJ5UHJvcGVydGllczoge2ZuOiB2ZnVuY3MuY2FsY3VsYXRlVHJlbmRCeVByb3BlcnRpZXN9LFxuICAgIGNhbGN1bGF0ZUF2Z1Byb3BlcnR5OiB7Zm46IHZmdW5jcy5jYWxjdWxhdGVBdmdQcm9wZXJ0eX0sXG4gICAgY2FsY3VsYXRlQXZnUHJvcGVydHlBcnJheToge2ZuOiB2ZnVuY3MuY2FsY3VsYXRlQXZnUHJvcGVydHlBcnJheX0sXG4gICAgYWxlcnQ6IHtmbjogdmZ1bmNzLmFsZXJ0fSxcbiAgICBmb3JtYXROdW1iZXI6IHtmbjogdmZ1bmNzLmZvcm1hdE51bWJlcn0sXG4gICAgZm9ybWF0RGF0ZToge2ZuOiB2ZnVuY3MuZm9ybWF0RGF0ZX0sXG4gICAgaXNvTW9udGg6IHtmbjogdmZ1bmNzLmlzb01vbnRofSxcbiAgICBnZXRDb29yZGluYXRlOiB7Zm46IHZmdW5jcy5nZXRDb29yZGluYXRlfSxcbiAgICBNYXRoOiB7Zm46IE1hdGh9LFxuICAgIHBhcnNlSW50OiB7Zm46IHBhcnNlSW50fSxcbiAgICBwYXJzZUZsb2F0OiB7Zm46IHBhcnNlRmxvYXR9LFxuICAgIHBhcnNlRGF0ZToge2ZuOiB2ZnVuY3MuZGF0ZVV0aWxzLnBhcnNlfSxcbiAgICBEYXRlOiB7Zm46IERhdGV9XG4gIH07XG59XG4iXX0=