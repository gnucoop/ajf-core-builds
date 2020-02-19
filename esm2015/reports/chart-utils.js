/**
 * @fileoverview added by tsickle
 * Generated from: src/core/reports/chart-utils.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright (C) 2018 Gnucoop soc. coop.
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
import { AjfChartType } from './interface/charts/chart-type';
/**
 * @param {?=} chartType
 * @return {?}
 */
export function chartToChartJsType(chartType) {
    switch (chartType) {
        case AjfChartType.Line:
            return 'line';
        case AjfChartType.Bar:
            return 'bar';
        case AjfChartType.HorizontalBar:
            return 'horizontalBar';
        case AjfChartType.Radar:
            return 'radar';
        case AjfChartType.Scatter:
            return 'scatter';
        case AjfChartType.Doughnut:
            return 'doughnut';
        case AjfChartType.Pie:
            return 'pie';
        case AjfChartType.PolarArea:
            return 'polarArea';
        case AjfChartType.Bubble:
            return 'bubble';
        default:
            return 'line';
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnQtdXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9yZXBvcnRzL2NoYXJ0LXV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBdUJBLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSwrQkFBK0IsQ0FBQzs7Ozs7QUFFM0QsTUFBTSxVQUFVLGtCQUFrQixDQUFDLFNBQXdCO0lBQ3ZELFFBQVEsU0FBUyxFQUFFO1FBQ2pCLEtBQUssWUFBWSxDQUFDLElBQUk7WUFDdEIsT0FBTyxNQUFNLENBQUM7UUFDZCxLQUFLLFlBQVksQ0FBQyxHQUFHO1lBQ3JCLE9BQU8sS0FBSyxDQUFDO1FBQ2IsS0FBSyxZQUFZLENBQUMsYUFBYTtZQUMvQixPQUFPLGVBQWUsQ0FBQztRQUN2QixLQUFLLFlBQVksQ0FBQyxLQUFLO1lBQ3ZCLE9BQU8sT0FBTyxDQUFDO1FBQ2YsS0FBSyxZQUFZLENBQUMsT0FBTztZQUN6QixPQUFPLFNBQVMsQ0FBQztRQUNqQixLQUFLLFlBQVksQ0FBQyxRQUFRO1lBQzFCLE9BQU8sVUFBVSxDQUFDO1FBQ2xCLEtBQUssWUFBWSxDQUFDLEdBQUc7WUFDckIsT0FBTyxLQUFLLENBQUM7UUFDYixLQUFLLFlBQVksQ0FBQyxTQUFTO1lBQzNCLE9BQU8sV0FBVyxDQUFDO1FBQ25CLEtBQUssWUFBWSxDQUFDLE1BQU07WUFDeEIsT0FBTyxRQUFRLENBQUM7UUFDaEI7WUFDQSxPQUFPLE1BQU0sQ0FBQztLQUNmO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgMjAxOCBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0V4dGVuZGVkQ2hhcnRUeXBlfSBmcm9tICdAYWpmL2NvcmUvY2hhcnQnO1xuaW1wb3J0IHtBamZDaGFydFR5cGV9IGZyb20gJy4vaW50ZXJmYWNlL2NoYXJ0cy9jaGFydC10eXBlJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNoYXJ0VG9DaGFydEpzVHlwZShjaGFydFR5cGU/OiBBamZDaGFydFR5cGUpOiBFeHRlbmRlZENoYXJ0VHlwZSB7XG4gICAgc3dpdGNoIChjaGFydFR5cGUpIHtcbiAgICAgIGNhc2UgQWpmQ2hhcnRUeXBlLkxpbmU6XG4gICAgICByZXR1cm4gJ2xpbmUnO1xuICAgICAgY2FzZSBBamZDaGFydFR5cGUuQmFyOlxuICAgICAgcmV0dXJuICdiYXInO1xuICAgICAgY2FzZSBBamZDaGFydFR5cGUuSG9yaXpvbnRhbEJhcjpcbiAgICAgIHJldHVybiAnaG9yaXpvbnRhbEJhcic7XG4gICAgICBjYXNlIEFqZkNoYXJ0VHlwZS5SYWRhcjpcbiAgICAgIHJldHVybiAncmFkYXInO1xuICAgICAgY2FzZSBBamZDaGFydFR5cGUuU2NhdHRlcjpcbiAgICAgIHJldHVybiAnc2NhdHRlcic7XG4gICAgICBjYXNlIEFqZkNoYXJ0VHlwZS5Eb3VnaG51dDpcbiAgICAgIHJldHVybiAnZG91Z2hudXQnO1xuICAgICAgY2FzZSBBamZDaGFydFR5cGUuUGllOlxuICAgICAgcmV0dXJuICdwaWUnO1xuICAgICAgY2FzZSBBamZDaGFydFR5cGUuUG9sYXJBcmVhOlxuICAgICAgcmV0dXJuICdwb2xhckFyZWEnO1xuICAgICAgY2FzZSBBamZDaGFydFR5cGUuQnViYmxlOlxuICAgICAgcmV0dXJuICdidWJibGUnO1xuICAgICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiAnbGluZSc7XG4gICAgfVxuICB9XG4iXX0=