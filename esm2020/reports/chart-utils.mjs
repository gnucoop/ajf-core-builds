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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnQtdXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL3JlcG9ydHMvc3JjL2NoYXJ0LXV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUdILE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSwrQkFBK0IsQ0FBQztBQUUzRCxNQUFNLFVBQVUsa0JBQWtCLENBQUMsU0FBd0I7SUFDekQsUUFBUSxTQUFTLEVBQUU7UUFDakIsS0FBSyxZQUFZLENBQUMsSUFBSTtZQUNwQixPQUFPLE1BQU0sQ0FBQztRQUNoQixLQUFLLFlBQVksQ0FBQyxHQUFHO1lBQ25CLE9BQU8sS0FBSyxDQUFDO1FBQ2YsS0FBSyxZQUFZLENBQUMsYUFBYTtZQUM3QixPQUFPLGVBQWUsQ0FBQztRQUN6QixLQUFLLFlBQVksQ0FBQyxLQUFLO1lBQ3JCLE9BQU8sT0FBTyxDQUFDO1FBQ2pCLEtBQUssWUFBWSxDQUFDLE9BQU87WUFDdkIsT0FBTyxTQUFTLENBQUM7UUFDbkIsS0FBSyxZQUFZLENBQUMsUUFBUTtZQUN4QixPQUFPLFVBQVUsQ0FBQztRQUNwQixLQUFLLFlBQVksQ0FBQyxHQUFHO1lBQ25CLE9BQU8sS0FBSyxDQUFDO1FBQ2YsS0FBSyxZQUFZLENBQUMsU0FBUztZQUN6QixPQUFPLFdBQVcsQ0FBQztRQUNyQixLQUFLLFlBQVksQ0FBQyxNQUFNO1lBQ3RCLE9BQU8sUUFBUSxDQUFDO1FBQ2xCO1lBQ0UsT0FBTyxNQUFNLENBQUM7S0FDakI7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0V4dGVuZGVkQ2hhcnRUeXBlfSBmcm9tICdAYWpmL2NvcmUvY2hhcnQnO1xuaW1wb3J0IHtBamZDaGFydFR5cGV9IGZyb20gJy4vaW50ZXJmYWNlL2NoYXJ0cy9jaGFydC10eXBlJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNoYXJ0VG9DaGFydEpzVHlwZShjaGFydFR5cGU/OiBBamZDaGFydFR5cGUpOiBFeHRlbmRlZENoYXJ0VHlwZSB7XG4gIHN3aXRjaCAoY2hhcnRUeXBlKSB7XG4gICAgY2FzZSBBamZDaGFydFR5cGUuTGluZTpcbiAgICAgIHJldHVybiAnbGluZSc7XG4gICAgY2FzZSBBamZDaGFydFR5cGUuQmFyOlxuICAgICAgcmV0dXJuICdiYXInO1xuICAgIGNhc2UgQWpmQ2hhcnRUeXBlLkhvcml6b250YWxCYXI6XG4gICAgICByZXR1cm4gJ2hvcml6b250YWxCYXInO1xuICAgIGNhc2UgQWpmQ2hhcnRUeXBlLlJhZGFyOlxuICAgICAgcmV0dXJuICdyYWRhcic7XG4gICAgY2FzZSBBamZDaGFydFR5cGUuU2NhdHRlcjpcbiAgICAgIHJldHVybiAnc2NhdHRlcic7XG4gICAgY2FzZSBBamZDaGFydFR5cGUuRG91Z2hudXQ6XG4gICAgICByZXR1cm4gJ2RvdWdobnV0JztcbiAgICBjYXNlIEFqZkNoYXJ0VHlwZS5QaWU6XG4gICAgICByZXR1cm4gJ3BpZSc7XG4gICAgY2FzZSBBamZDaGFydFR5cGUuUG9sYXJBcmVhOlxuICAgICAgcmV0dXJuICdwb2xhckFyZWEnO1xuICAgIGNhc2UgQWpmQ2hhcnRUeXBlLkJ1YmJsZTpcbiAgICAgIHJldHVybiAnYnViYmxlJztcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuICdsaW5lJztcbiAgfVxufVxuIl19