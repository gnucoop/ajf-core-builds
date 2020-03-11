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
import { AjfChartType } from './interface/charts/chart-type';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnQtdXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9yZXBvcnRzL2NoYXJ0LXV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUdILE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSwrQkFBK0IsQ0FBQztBQUUzRCxNQUFNLFVBQVUsa0JBQWtCLENBQUMsU0FBd0I7SUFDdkQsUUFBUSxTQUFTLEVBQUU7UUFDakIsS0FBSyxZQUFZLENBQUMsSUFBSTtZQUN0QixPQUFPLE1BQU0sQ0FBQztRQUNkLEtBQUssWUFBWSxDQUFDLEdBQUc7WUFDckIsT0FBTyxLQUFLLENBQUM7UUFDYixLQUFLLFlBQVksQ0FBQyxhQUFhO1lBQy9CLE9BQU8sZUFBZSxDQUFDO1FBQ3ZCLEtBQUssWUFBWSxDQUFDLEtBQUs7WUFDdkIsT0FBTyxPQUFPLENBQUM7UUFDZixLQUFLLFlBQVksQ0FBQyxPQUFPO1lBQ3pCLE9BQU8sU0FBUyxDQUFDO1FBQ2pCLEtBQUssWUFBWSxDQUFDLFFBQVE7WUFDMUIsT0FBTyxVQUFVLENBQUM7UUFDbEIsS0FBSyxZQUFZLENBQUMsR0FBRztZQUNyQixPQUFPLEtBQUssQ0FBQztRQUNiLEtBQUssWUFBWSxDQUFDLFNBQVM7WUFDM0IsT0FBTyxXQUFXLENBQUM7UUFDbkIsS0FBSyxZQUFZLENBQUMsTUFBTTtZQUN4QixPQUFPLFFBQVEsQ0FBQztRQUNoQjtZQUNBLE9BQU8sTUFBTSxDQUFDO0tBQ2Y7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0V4dGVuZGVkQ2hhcnRUeXBlfSBmcm9tICdAYWpmL2NvcmUvY2hhcnQnO1xuaW1wb3J0IHtBamZDaGFydFR5cGV9IGZyb20gJy4vaW50ZXJmYWNlL2NoYXJ0cy9jaGFydC10eXBlJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNoYXJ0VG9DaGFydEpzVHlwZShjaGFydFR5cGU/OiBBamZDaGFydFR5cGUpOiBFeHRlbmRlZENoYXJ0VHlwZSB7XG4gICAgc3dpdGNoIChjaGFydFR5cGUpIHtcbiAgICAgIGNhc2UgQWpmQ2hhcnRUeXBlLkxpbmU6XG4gICAgICByZXR1cm4gJ2xpbmUnO1xuICAgICAgY2FzZSBBamZDaGFydFR5cGUuQmFyOlxuICAgICAgcmV0dXJuICdiYXInO1xuICAgICAgY2FzZSBBamZDaGFydFR5cGUuSG9yaXpvbnRhbEJhcjpcbiAgICAgIHJldHVybiAnaG9yaXpvbnRhbEJhcic7XG4gICAgICBjYXNlIEFqZkNoYXJ0VHlwZS5SYWRhcjpcbiAgICAgIHJldHVybiAncmFkYXInO1xuICAgICAgY2FzZSBBamZDaGFydFR5cGUuU2NhdHRlcjpcbiAgICAgIHJldHVybiAnc2NhdHRlcic7XG4gICAgICBjYXNlIEFqZkNoYXJ0VHlwZS5Eb3VnaG51dDpcbiAgICAgIHJldHVybiAnZG91Z2hudXQnO1xuICAgICAgY2FzZSBBamZDaGFydFR5cGUuUGllOlxuICAgICAgcmV0dXJuICdwaWUnO1xuICAgICAgY2FzZSBBamZDaGFydFR5cGUuUG9sYXJBcmVhOlxuICAgICAgcmV0dXJuICdwb2xhckFyZWEnO1xuICAgICAgY2FzZSBBamZDaGFydFR5cGUuQnViYmxlOlxuICAgICAgcmV0dXJuICdidWJibGUnO1xuICAgICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiAnbGluZSc7XG4gICAgfVxuICB9XG4iXX0=