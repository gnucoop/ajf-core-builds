/**
 * @fileoverview added by tsickle
 * Generated from: src/core/reports/chart-utils.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnQtdXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9yZXBvcnRzL2NoYXJ0LXV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBdUJBLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSwrQkFBK0IsQ0FBQzs7Ozs7QUFFM0QsTUFBTSxVQUFVLGtCQUFrQixDQUFDLFNBQXdCO0lBQ3ZELFFBQVEsU0FBUyxFQUFFO1FBQ2pCLEtBQUssWUFBWSxDQUFDLElBQUk7WUFDdEIsT0FBTyxNQUFNLENBQUM7UUFDZCxLQUFLLFlBQVksQ0FBQyxHQUFHO1lBQ3JCLE9BQU8sS0FBSyxDQUFDO1FBQ2IsS0FBSyxZQUFZLENBQUMsYUFBYTtZQUMvQixPQUFPLGVBQWUsQ0FBQztRQUN2QixLQUFLLFlBQVksQ0FBQyxLQUFLO1lBQ3ZCLE9BQU8sT0FBTyxDQUFDO1FBQ2YsS0FBSyxZQUFZLENBQUMsT0FBTztZQUN6QixPQUFPLFNBQVMsQ0FBQztRQUNqQixLQUFLLFlBQVksQ0FBQyxRQUFRO1lBQzFCLE9BQU8sVUFBVSxDQUFDO1FBQ2xCLEtBQUssWUFBWSxDQUFDLEdBQUc7WUFDckIsT0FBTyxLQUFLLENBQUM7UUFDYixLQUFLLFlBQVksQ0FBQyxTQUFTO1lBQzNCLE9BQU8sV0FBVyxDQUFDO1FBQ25CLEtBQUssWUFBWSxDQUFDLE1BQU07WUFDeEIsT0FBTyxRQUFRLENBQUM7UUFDaEI7WUFDQSxPQUFPLE1BQU0sQ0FBQztLQUNmO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtFeHRlbmRlZENoYXJ0VHlwZX0gZnJvbSAnQGFqZi9jb3JlL2NoYXJ0JztcbmltcG9ydCB7QWpmQ2hhcnRUeXBlfSBmcm9tICcuL2ludGVyZmFjZS9jaGFydHMvY2hhcnQtdHlwZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBjaGFydFRvQ2hhcnRKc1R5cGUoY2hhcnRUeXBlPzogQWpmQ2hhcnRUeXBlKTogRXh0ZW5kZWRDaGFydFR5cGUge1xuICAgIHN3aXRjaCAoY2hhcnRUeXBlKSB7XG4gICAgICBjYXNlIEFqZkNoYXJ0VHlwZS5MaW5lOlxuICAgICAgcmV0dXJuICdsaW5lJztcbiAgICAgIGNhc2UgQWpmQ2hhcnRUeXBlLkJhcjpcbiAgICAgIHJldHVybiAnYmFyJztcbiAgICAgIGNhc2UgQWpmQ2hhcnRUeXBlLkhvcml6b250YWxCYXI6XG4gICAgICByZXR1cm4gJ2hvcml6b250YWxCYXInO1xuICAgICAgY2FzZSBBamZDaGFydFR5cGUuUmFkYXI6XG4gICAgICByZXR1cm4gJ3JhZGFyJztcbiAgICAgIGNhc2UgQWpmQ2hhcnRUeXBlLlNjYXR0ZXI6XG4gICAgICByZXR1cm4gJ3NjYXR0ZXInO1xuICAgICAgY2FzZSBBamZDaGFydFR5cGUuRG91Z2hudXQ6XG4gICAgICByZXR1cm4gJ2RvdWdobnV0JztcbiAgICAgIGNhc2UgQWpmQ2hhcnRUeXBlLlBpZTpcbiAgICAgIHJldHVybiAncGllJztcbiAgICAgIGNhc2UgQWpmQ2hhcnRUeXBlLlBvbGFyQXJlYTpcbiAgICAgIHJldHVybiAncG9sYXJBcmVhJztcbiAgICAgIGNhc2UgQWpmQ2hhcnRUeXBlLkJ1YmJsZTpcbiAgICAgIHJldHVybiAnYnViYmxlJztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gJ2xpbmUnO1xuICAgIH1cbiAgfVxuIl19