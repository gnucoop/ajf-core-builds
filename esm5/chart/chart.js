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
import { __assign } from "tslib";
import { ChangeDetectionStrategy, Component, ElementRef, Input, Renderer2, ViewEncapsulation } from '@angular/core';
import * as Chart from 'chart.js';
var chartClass = Chart.default || Chart;
import 'chart.piecelabel.js';
import { deepCopy } from '@ajf/core/utils';
var AjfChartComponent = /** @class */ (function () {
    function AjfChartComponent(_el, _renderer) {
        this._el = _el;
        this._renderer = _renderer;
        this._chartTypesNeedPoints = ['scatter', 'bubble'];
    }
    AjfChartComponent.prototype.ngAfterViewInit = function () {
        this._rebuildChart();
    };
    AjfChartComponent.prototype.ngOnChanges = function (changes) {
        if ('chartType' in changes) {
            this._rebuildChart();
        }
        else if ('options' in changes || 'data' in changes) {
            this._updateChart();
        }
    };
    AjfChartComponent.prototype._fixData = function (chartType, data) {
        var _this = this;
        var newData = deepCopy(data);
        var maxPointsNum = 0;
        (newData.datasets || []).forEach(function (dataset) {
            if (dataset.label == null) {
                dataset.label = '';
            }
            maxPointsNum = Math.max(maxPointsNum, (dataset.data || []).length);
            var datasetType = dataset.type != null ? dataset.type : chartType;
            if (_this._chartTypesNeedPoints.indexOf(datasetType) > -1) {
                dataset.data = (dataset.data || []).map(function (d, idx) {
                    if (typeof d === 'number') {
                        return { x: idx, y: d, r: d };
                    }
                    return d;
                });
            }
        });
        var labels = newData.labels || [];
        if (maxPointsNum > 0 && labels.length < maxPointsNum) {
            for (var i = labels.length; i < maxPointsNum; i++) {
                labels.push('');
            }
            newData.labels = labels;
        }
        return newData;
    };
    AjfChartComponent.prototype._updateChart = function () {
        if (this._chart == null) {
            this._rebuildChart();
        }
        else {
            this._chart.options = __assign(__assign({}, deepCopy(this._chart.options)), deepCopy(this.options || {}));
            this._chart.data = __assign(__assign({}, deepCopy(this._chart.data)), deepCopy(this.data));
            this._chart.update();
        }
    };
    AjfChartComponent.prototype._rebuildChart = function () {
        if (this._chart != null) {
            this._chart.destroy();
            this._chart = null;
        }
        if (this._chartCanvasElement != null) {
            this._renderer.removeChild(this._el.nativeElement, this._chartCanvasElement);
            this._chartCanvasElement = null;
        }
        if (this.data != null) {
            this._chartCanvasElement = this._renderer.createElement('canvas');
            this._renderer.setStyle(this._chartCanvasElement, 'width', 'inherit');
            this._renderer.setStyle(this._chartCanvasElement, 'height', 'inherit');
            this._renderer.appendChild(this._el.nativeElement, this._chartCanvasElement);
            var ctx = this._chartCanvasElement.getContext('2d');
            this._chart = new chartClass(ctx, {
                type: this.chartType,
                data: this._fixData(this.chartType, this.data),
                options: this._fixChartOptions(this.options)
            });
        }
    };
    AjfChartComponent.prototype._fixChartOptions = function (options) {
        options = options || {};
        if (options.scales == null) {
            options.scales = { xAxes: [], yAxes: [] };
        }
        if (options.scales.xAxes == null) {
            options.scales.xAxes = [];
        }
        if (options.scales.yAxes == null) {
            options.scales.yAxes = [];
        }
        if (this.chartType == 'pie') {
            var newOptions = options;
            newOptions.pieceLabel = {
                render: function (args) {
                    if (args.label) {
                        return args.label + ':' + args.value;
                    }
                    else {
                        return args.value;
                    }
                },
                position: 'outside'
            };
            return newOptions;
        }
        return options;
    };
    AjfChartComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ajf-chart',
                    template: "",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    styles: ["ajf-chart{display:block;width:inherit;height:inherit;position:relative}\n"]
                }] }
    ];
    /** @nocollapse */
    AjfChartComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    AjfChartComponent.propDecorators = {
        data: [{ type: Input }],
        options: [{ type: Input }],
        chartType: [{ type: Input }]
    };
    return AjfChartComponent;
}());
export { AjfChartComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9jaGFydC9jaGFydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7O0FBRUgsT0FBTyxFQUVMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsVUFBVSxFQUNWLEtBQUssRUFFTCxTQUFTLEVBRVQsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sS0FBSyxLQUFLLE1BQU0sVUFBVSxDQUFDO0FBQ2xDLElBQU0sVUFBVSxHQUFTLEtBQU0sQ0FBQyxPQUFPLElBQUksS0FBSyxDQUFDO0FBR2pELE9BQU8scUJBQXFCLENBQUM7QUFFN0IsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBSXpDO0lBZ0JFLDJCQUFvQixHQUFlLEVBQVUsU0FBb0I7UUFBN0MsUUFBRyxHQUFILEdBQUcsQ0FBWTtRQUFVLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFGekQsMEJBQXFCLEdBQXdCLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBRVAsQ0FBQztJQUVyRSwyQ0FBZSxHQUFmO1FBQ0UsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCx1Q0FBVyxHQUFYLFVBQVksT0FBc0I7UUFDaEMsSUFBSSxXQUFXLElBQUksT0FBTyxFQUFFO1lBQzFCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUN0QjthQUFNLElBQUksU0FBUyxJQUFJLE9BQU8sSUFBSSxNQUFNLElBQUksT0FBTyxFQUFFO1lBQ3BELElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUNyQjtJQUNILENBQUM7SUFFTyxvQ0FBUSxHQUFoQixVQUFpQixTQUE0QixFQUFFLElBQWU7UUFBOUQsaUJBMEJDO1FBekJDLElBQU0sT0FBTyxHQUFjLFFBQVEsQ0FBQyxJQUFJ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TUFBTSxDQUFDLEtBQUssSUFBSSxJQUFJLEVBQUU7WUFDaEMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1NBQzNCO1FBQ0QsSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssSUFBSSxJQUFJLEVBQUU7WUFDaEMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1NBQzNCO1FBQ0QsSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLEtBQUssRUFBRTtZQUMzQixJQUFJLFVBQVUsR0FBUSxPQUFPLENBQUM7WUFDOUIsVUFBVSxDQUFDLFVBQVUsR0FBRztnQkFDdEIsTUFBTSxFQUFFLFVBQVMsSUFBUztvQkFDeEIsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO3dCQUNkLE9BQU8sSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztxQkFDdEM7eUJBQU07d0JBQ0wsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO3FCQUNuQjtnQkFDSCxDQUFDO2dCQUNELFFBQVEsRUFBRSxTQUFTO2FBQ3BCLENBQUM7WUFDRixPQUFPLFVBQVUsQ0FBQztTQUNuQjtRQUNELE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUM7O2dCQXhIRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLFdBQVc7b0JBQ3JCLFlBQXlCO29CQUV6QixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7O2lCQUN0Qzs7OztnQkF4QkMsVUFBVTtnQkFHVixTQUFTOzs7dUJBdUJSLEtBQUs7MEJBQ0wsS0FBSzs0QkFDTCxLQUFLOztJQStHUix3QkFBQztDQUFBLEFBekhELElBeUhDO1NBbEhZLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgUmVuZGVyZXIyLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0ICogYXMgQ2hhcnQgZnJvbSAnY2hhcnQuanMnO1xuY29uc3QgY2hhcnRDbGFzcyA9ICg8YW55PkNoYXJ0KS5kZWZhdWx0IHx8IENoYXJ0O1xuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lXG5pbXBvcnQge0NoYXJ0RGF0YSwgQ2hhcnRPcHRpb25zLCBDaGFydFBvaW50fSBmcm9tICdjaGFydC5qcyc7XG5pbXBvcnQgJ2NoYXJ0LnBpZWNlbGFiZWwuanMnO1xuXG5pbXBvcnQge2RlZXBDb3B5fSBmcm9tICdAYWpmL2NvcmUvdXRpbHMnO1xuaW1wb3J0IHtFeHRlbmRlZENoYXJ0VHlwZX0gZnJvbSAnLi9leHRlbmRlZC1jaGFydC10eXBlJztcblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhamYtY2hhcnQnLFxuICB0ZW1wbGF0ZVVybDogJ2NoYXJ0Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnY2hhcnQuY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIEFqZkNoYXJ0Q29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25DaGFuZ2VzIHtcbiAgQElucHV0KCkgZGF0YTogQ2hhcnREYXRhO1xuICBASW5wdXQoKSBvcHRpb25zOiBDaGFydE9wdGlvbnM7XG4gIEBJbnB1dCgpIGNoYXJ0VHlwZTogRXh0ZW5kZWRDaGFydFR5cGU7XG5cbiAgcHJpdmF0ZSBfY2hhcnQ6IENoYXJ0fG51bGw7XG4gIHByaXZhdGUgX2NoYXJ0Q2FudmFzRWxlbWVudDogYW55O1xuICBwcml2YXRlIF9jaGFydFR5cGVzTmVlZFBvaW50czogRXh0ZW5kZWRDaGFydFR5cGVbXSA9IFsnc2NhdHRlcicsICdidWJibGUnXTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9lbDogRWxlbWVudFJlZiwgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMikge31cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fcmVidWlsZENoYXJ0KCk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgaWYgKCdjaGFydFR5cGUnIGluIGNoYW5nZXMpIHtcbiAgICAgIHRoaXMuX3JlYnVpbGRDaGFydCgpO1xuICAgIH0gZWxzZSBpZiAoJ29wdGlvbnMnIGluIGNoYW5nZXMgfHwgJ2RhdGEnIGluIGNoYW5nZXMpIHtcbiAgICAgIHRoaXMuX3VwZGF0ZUNoYXJ0KCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfZml4RGF0YShjaGFydFR5cGU6IEV4dGVuZGVkQ2hhcnRUeXBlLCBkYXRhOiBDaGFydERhdGEpOiBDaGFydERhdGEge1xuICAgIGNvbnN0IG5ld0RhdGE6IENoYXJ0RGF0YSA9IGRlZXBDb3B5KGRhdGEpO1xuICAgIGxldCBtYXhQb2ludHNOdW0gPSAwO1xuICAgIChuZXdEYXRhLmRhdGFzZXRzIHx8IFtdKS5mb3JFYWNoKChkYXRhc2V0KSA9PiB7XG4gICAgICBpZiAoZGF0YXNldC5sYWJlbCA9PSBudWxsKSB7XG4gICAgICAgIGRhdGFzZXQubGFiZWwgPSAnJztcbiAgICAgIH1cbiAgICAgIG1heFBvaW50c051bSA9IE1hdGgubWF4KG1heFBvaW50c051bSwgKGRhdGFzZXQuZGF0YSB8fCBbXSkubGVuZ3RoKTtcbiAgICAgIGNvbnN0IGRhdGFzZXRUeXBlID0gZGF0YXNldC50eXBlICE9IG51bGwgPyA8RXh0ZW5kZWRDaGFydFR5cGU+ZGF0YXNldC50eXBlIDogY2hhcnRUeXBlO1xuICAgICAgaWYgKHRoaXMuX2NoYXJ0VHlwZXNOZWVkUG9pbnRzLmluZGV4T2YoZGF0YXNldFR5cGUpID4gLTEpIHtcbiAgICAgICAgZGF0YXNldC5kYXRhID0gKDxhbnlbXT4oZGF0YXNldC5kYXRhIHx8IFtdKSkubWFwKChkLCBpZHgpID0+IHtcbiAgICAgICAgICBpZiAodHlwZW9mIGQgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICByZXR1cm4gPGFueT57eDogaWR4LCB5OiBkLCByOiBkfTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIDxDaGFydFBvaW50PmQ7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGNvbnN0IGxhYmVscyA9IG5ld0RhdGEubGFiZWxzIHx8IFtdO1xuICAgIGlmIChtYXhQb2ludHNOdW0gPiAwICYmIGxhYmVscy5sZW5ndGggPCBtYXhQb2ludHNOdW0pIHtcbiAgICAgIGZvciAobGV0IGkgPSBsYWJlbHMubGVuZ3RoOyBpIDwgbWF4UG9pbnRzTnVtOyBpKyspIHtcbiAgICAgICAgbGFiZWxzLnB1c2goJycpO1xuICAgICAgfVxuICAgICAgbmV3RGF0YS5sYWJlbHMgPSBsYWJlbHM7XG4gICAgfVxuICAgIHJldHVybiBuZXdEYXRhO1xuICB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlQ2hhcnQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2NoYXJ0ID09IG51bGwpIHtcbiAgICAgIHRoaXMuX3JlYnVpbGRDaGFydCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAoPGFueT50aGlzLl9jaGFydCkub3B0aW9ucyA9IHtcbiAgICAgICAgLi4uZGVlcENvcHkoKDxhbnk+dGhpcy5fY2hhcnQpLm9wdGlvbnMpLFxuICAgICAgICAuLi5kZWVwQ29weSh0aGlzLm9wdGlvbnMgfHwge30pXG4gICAgICB9O1xuICAgICAgdGhpcy5fY2hhcnQuZGF0YSA9IHsuLi5kZWVwQ29weSh0aGlzLl9jaGFydC5kYXRhKSwgLi4uZGVlcENvcHkodGhpcy5kYXRhKX07XG4gICAgICB0aGlzLl9jaGFydC51cGRhdGUoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9yZWJ1aWxkQ2hhcnQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2NoYXJ0ICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX2NoYXJ0LmRlc3Ryb3koKTtcbiAgICAgIHRoaXMuX2NoYXJ0ID0gbnVsbDtcbiAgICB9XG4gICAgaWYgKHRoaXMuX2NoYXJ0Q2FudmFzRWxlbWVudCAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVDaGlsZCh0aGlzLl9lbC5uYXRpdmVFbGVtZW50LCB0aGlzLl9jaGFydENhbnZhc0VsZW1lbnQpO1xuICAgICAgdGhpcy5fY2hhcnRDYW52YXNFbGVtZW50ID0gbnVsbDtcbiAgICB9XG4gICAgaWYgKHRoaXMuZGF0YSAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9jaGFydENhbnZhc0VsZW1lbnQgPSB0aGlzLl9yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX2NoYXJ0Q2FudmFzRWxlbWVudCwgJ3dpZHRoJywgJ2luaGVyaXQnKTtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX2NoYXJ0Q2FudmFzRWxlbWVudCwgJ2hlaWdodCcsICdpbmhlcml0Jyk7XG4gICAgICB0aGlzLl9yZW5kZXJlci5hcHBlbmRDaGlsZCh0aGlzLl9lbC5uYXRpdmVFbGVtZW50LCB0aGlzLl9jaGFydENhbnZhc0VsZW1lbnQpO1xuICAgICAgY29uc3QgY3R4ID0gdGhpcy5fY2hhcnRDYW52YXNFbGVtZW50LmdldENvbnRleHQoJzJkJyk7XG4gICAgICB0aGlzLl9jaGFydCA9IG5ldyBjaGFydENsYXNzKGN0eCwge1xuICAgICAgICB0eXBlOiB0aGlzLmNoYXJ0VHlwZSxcbiAgICAgICAgZGF0YTogdGhpcy5fZml4RGF0YSh0aGlzLmNoYXJ0VHlwZSwgdGhpcy5kYXRhKSxcbiAgICAgICAgb3B0aW9uczogdGhpcy5fZml4Q2hhcnRPcHRpb25zKHRoaXMub3B0aW9ucylcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2ZpeENoYXJ0T3B0aW9ucyhvcHRpb25zOiBDaGFydE9wdGlvbnMpOiBDaGFydE9wdGlvbnMge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIGlmIChvcHRpb25zLnNjYWxlcyA9PSBudWxsKSB7XG4gICAgICBvcHRpb25zLnNjYWxlcyA9IHt4QXhlczogW10sIHlBeGVzOiBbXX07XG4gICAgfVxuICAgIGlmIChvcHRpb25zLnNjYWxlcy54QXhlcyA9PSBudWxsKSB7XG4gICAgICBvcHRpb25zLnNjYWxlcy54QXhlcyA9IFtdO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy5zY2FsZXMueUF4ZXMgPT0gbnVsbCkge1xuICAgICAgb3B0aW9ucy5zY2FsZXMueUF4ZXMgPSBbXTtcbiAgICB9XG4gICAgaWYgKHRoaXMuY2hhcnRUeXBlID09ICdwaWUnKSB7XG4gICAgICBsZXQgbmV3T3B0aW9ucyA9IDxhbnk+b3B0aW9ucztcbiAgICAgIG5ld09wdGlvbnMucGllY2VMYWJlbCA9IHtcbiAgICAgICAgcmVuZGVyOiBmdW5jdGlvbihhcmdzOiBhbnkpIHtcbiAgICAgICAgICBpZiAoYXJncy5sYWJlbCkge1xuICAgICAgICAgICAgcmV0dXJuIGFyZ3MubGFiZWwgKyAnOicgKyBhcmdzLnZhbHVlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gYXJncy52YWx1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHBvc2l0aW9uOiAnb3V0c2lkZSdcbiAgICAgIH07XG4gICAgICByZXR1cm4gbmV3T3B0aW9ucztcbiAgICB9XG4gICAgcmV0dXJuIG9wdGlvbnM7XG4gIH1cbn1cbiJdfQ==