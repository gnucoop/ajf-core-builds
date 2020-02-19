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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnQtdXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9yZXBvcnRzL2NoYXJ0LXV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUdILE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSwrQkFBK0IsQ0FBQztBQUUzRCxNQUFNLFVBQVUsa0JBQWtCLENBQUMsU0FBd0I7SUFDdkQsUUFBUSxTQUFTLEVBQUU7UUFDakIsS0FBSyxZQUFZLENBQUMsSUFBSTtZQUN0QixPQUFPLE1BQU0sQ0FBQztRQUNkLEtBQUssWUFBWSxDQUFDLEdBQUc7WUFDckIsT0FBTyxLQUFLLENBQUM7UUFDYixLQUFLLFlBQVksQ0FBQyxhQUFhO1lBQy9CLE9BQU8sZUFBZSxDQUFDO1FBQ3ZCLEtBQUssWUFBWSxDQUFDLEtBQUs7WUFDdkIsT0FBTyxPQUFPLENBQUM7UUFDZixLQUFLLFlBQVksQ0FBQyxPQUFPO1lBQ3pCLE9BQU8sU0FBUyxDQUFDO1FBQ2pCLEtBQUssWUFBWSxDQUFDLFFBQVE7WUFDMUIsT0FBTyxVQUFVLENBQUM7UUFDbEIsS0FBSyxZQUFZLENBQUMsR0FBRztZQUNyQixPQUFPLEtBQUssQ0FBQztRQUNiLEtBQUssWUFBWSxDQUFDLFNBQVM7WUFDM0IsT0FBTyxXQUFXLENBQUM7UUFDbkIsS0FBSyxZQUFZLENBQUMsTUFBTTtZQUN4QixPQUFPLFFBQVEsQ0FBQztRQUNoQjtZQUNBLE9BQU8sTUFBTSxDQUFDO0tBQ2Y7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSAyMDE4IEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7RXh0ZW5kZWRDaGFydFR5cGV9IGZyb20gJ0BhamYvY29yZS9jaGFydCc7XG5pbXBvcnQge0FqZkNoYXJ0VHlwZX0gZnJvbSAnLi9pbnRlcmZhY2UvY2hhcnRzL2NoYXJ0LXR5cGUnO1xuXG5leHBvcnQgZnVuY3Rpb24gY2hhcnRUb0NoYXJ0SnNUeXBlKGNoYXJ0VHlwZT86IEFqZkNoYXJ0VHlwZSk6IEV4dGVuZGVkQ2hhcnRUeXBlIHtcbiAgICBzd2l0Y2ggKGNoYXJ0VHlwZSkge1xuICAgICAgY2FzZSBBamZDaGFydFR5cGUuTGluZTpcbiAgICAgIHJldHVybiAnbGluZSc7XG4gICAgICBjYXNlIEFqZkNoYXJ0VHlwZS5CYXI6XG4gICAgICByZXR1cm4gJ2Jhcic7XG4gICAgICBjYXNlIEFqZkNoYXJ0VHlwZS5Ib3Jpem9udGFsQmFyOlxuICAgICAgcmV0dXJuICdob3Jpem9udGFsQmFyJztcbiAgICAgIGNhc2UgQWpmQ2hhcnRUeXBlLlJhZGFyOlxuICAgICAgcmV0dXJuICdyYWRhcic7XG4gICAgICBjYXNlIEFqZkNoYXJ0VHlwZS5TY2F0dGVyOlxuICAgICAgcmV0dXJuICdzY2F0dGVyJztcbiAgICAgIGNhc2UgQWpmQ2hhcnRUeXBlLkRvdWdobnV0OlxuICAgICAgcmV0dXJuICdkb3VnaG51dCc7XG4gICAgICBjYXNlIEFqZkNoYXJ0VHlwZS5QaWU6XG4gICAgICByZXR1cm4gJ3BpZSc7XG4gICAgICBjYXNlIEFqZkNoYXJ0VHlwZS5Qb2xhckFyZWE6XG4gICAgICByZXR1cm4gJ3BvbGFyQXJlYSc7XG4gICAgICBjYXNlIEFqZkNoYXJ0VHlwZS5CdWJibGU6XG4gICAgICByZXR1cm4gJ2J1YmJsZSc7XG4gICAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuICdsaW5lJztcbiAgICB9XG4gIH1cbiJdfQ==