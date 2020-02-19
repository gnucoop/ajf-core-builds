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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9jaGFydC9jaGFydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7O0FBRUgsT0FBTyxFQUNVLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUNwRSxTQUFTLEVBQWlCLGlCQUFpQixFQUM1QyxNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEtBQUssS0FBSyxNQUFNLFVBQVUsQ0FBQztBQUNsQyxJQUFNLFVBQVUsR0FBUyxLQUFNLENBQUMsT0FBTyxJQUFJLEtBQUssQ0FBQztBQUdqRCxPQUFPLHFCQUFxQixDQUFDO0FBRTdCLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUl6QztJQWdCRSwyQkFBb0IsR0FBZSxFQUFVLFNBQW9CO1FBQTdDLFFBQUcsR0FBSCxHQUFHLENBQVk7UUFBVSxjQUFTLEdBQVQsU0FBUyxDQUFXO1FBRnpELDBCQUFxQixHQUF3QixDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUVOLENBQUM7SUFFdEUsMkNBQWUsR0FBZjtRQUNFLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBRUQsdUNBQVcsR0FBWCxVQUFZLE9BQXNCO1FBQ2hDLElBQUksV0FBVyxJQUFJLE9BQU8sRUFBRTtZQUMxQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDdEI7YUFBTSxJQUFJLFNBQVMsSUFBSSxPQUFPLElBQUksTUFBTSxJQUFJLE9BQU8sRUFBRTtZQUNwRCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDckI7SUFDSCxDQUFDO0lBRU8sb0NBQVEsR0FBaEIsVUFBaUIsU0FBNEIsRUFBRSxJQUFlO1FBQTlELGlCQTBCQztRQXpCQyxJQUFNLE9BQU8sR0FBYyxRQUFRLENBQUMsSUFB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QyxNQUFNLENBQUMsS0FBSyxJQUFJLElBQUksRUFBRTtZQUNoQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7U0FDM0I7UUFDRCxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxJQUFJLElBQUksRUFBRTtZQUNoQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7U0FDM0I7UUFDRCxJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksS0FBSyxFQUFFO1lBQzNCLElBQUksVUFBVSxHQUFRLE9BQU8sQ0FBQztZQUM5QixVQUFVLENBQUMsVUFBVSxHQUFHO2dCQUN0QixNQUFNLEVBQUUsVUFBVSxJQUFTO29CQUN6QixJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7d0JBQ2QsT0FBTyxJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO3FCQUN0Qzt5QkFBTTt3QkFDTCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7cUJBQ25CO2dCQUNILENBQUM7Z0JBQ0QsUUFBUSxFQUFFLFNBQVM7YUFDcEIsQ0FBQztZQUNGLE9BQU8sVUFBVSxDQUFDO1NBQ25CO1FBQ0QsT0FBTyxPQUFPLENBQUM7SUFDakIsQ0FBQzs7Z0JBM0hGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsV0FBVztvQkFDckIsWUFBeUI7b0JBRXpCLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTs7aUJBQ3RDOzs7O2dCQXBCb0QsVUFBVTtnQkFDN0QsU0FBUzs7O3VCQXFCUixLQUFLOzBCQUNMLEtBQUs7NEJBQ0wsS0FBSzs7SUFrSFIsd0JBQUM7Q0FBQSxBQTVIRCxJQTRIQztTQXJIWSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTggR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgRWxlbWVudFJlZiwgSW5wdXQsIE9uQ2hhbmdlcyxcbiAgUmVuZGVyZXIyLCBTaW1wbGVDaGFuZ2VzLCBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0ICogYXMgQ2hhcnQgZnJvbSAnY2hhcnQuanMnO1xuY29uc3QgY2hhcnRDbGFzcyA9ICg8YW55PkNoYXJ0KS5kZWZhdWx0IHx8IENoYXJ0O1xuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lXG5pbXBvcnQge0NoYXJ0RGF0YSwgQ2hhcnRPcHRpb25zLCBDaGFydFBvaW50fSBmcm9tICdjaGFydC5qcyc7XG5pbXBvcnQgJ2NoYXJ0LnBpZWNlbGFiZWwuanMnO1xuXG5pbXBvcnQge2RlZXBDb3B5fSBmcm9tICdAYWpmL2NvcmUvdXRpbHMnO1xuaW1wb3J0IHtFeHRlbmRlZENoYXJ0VHlwZX0gZnJvbSAnLi9leHRlbmRlZC1jaGFydC10eXBlJztcblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhamYtY2hhcnQnLFxuICB0ZW1wbGF0ZVVybDogJ2NoYXJ0Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnY2hhcnQuY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIEFqZkNoYXJ0Q29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25DaGFuZ2VzIHtcbiAgQElucHV0KCkgZGF0YTogQ2hhcnREYXRhO1xuICBASW5wdXQoKSBvcHRpb25zOiBDaGFydE9wdGlvbnM7XG4gIEBJbnB1dCgpIGNoYXJ0VHlwZTogRXh0ZW5kZWRDaGFydFR5cGU7XG5cbiAgcHJpdmF0ZSBfY2hhcnQ6IENoYXJ0IHwgbnVsbDtcbiAgcHJpdmF0ZSBfY2hhcnRDYW52YXNFbGVtZW50OiBhbnk7XG4gIHByaXZhdGUgX2NoYXJ0VHlwZXNOZWVkUG9pbnRzOiBFeHRlbmRlZENoYXJ0VHlwZVtdID0gWydzY2F0dGVyJywgJ2J1YmJsZSddO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2VsOiBFbGVtZW50UmVmLCBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyKSB7IH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fcmVidWlsZENoYXJ0KCk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgaWYgKCdjaGFydFR5cGUnIGluIGNoYW5nZXMpIHtcbiAgICAgIHRoaXMuX3JlYnVpbGRDaGFydCgpO1xuICAgIH0gZWxzZSBpZiAoJ29wdGlvbnMnIGluIGNoYW5nZXMgfHwgJ2RhdGEnIGluIGNoYW5nZXMpIHtcbiAgICAgIHRoaXMuX3VwZGF0ZUNoYXJ0KCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfZml4RGF0YShjaGFydFR5cGU6IEV4dGVuZGVkQ2hhcnRUeXBlLCBkYXRhOiBDaGFydERhdGEpOiBDaGFydERhdGEge1xuICAgIGNvbnN0IG5ld0RhdGE6IENoYXJ0RGF0YSA9IGRlZXBDb3B5KGRhdGEpO1xuICAgIGxldCBtYXhQb2ludHNOdW0gPSAwO1xuICAgIChuZXdEYXRhLmRhdGFzZXRzIHx8IFtdKS5mb3JFYWNoKChkYXRhc2V0KSA9PiB7XG4gICAgICBpZiAoZGF0YXNldC5sYWJlbCA9PSBudWxsKSB7XG4gICAgICAgIGRhdGFzZXQubGFiZWwgPSAnJztcbiAgICAgIH1cbiAgICAgIG1heFBvaW50c051bSA9IE1hdGgubWF4KG1heFBvaW50c051bSwgKGRhdGFzZXQuZGF0YSB8fCBbXSkubGVuZ3RoKTtcbiAgICAgIGNvbnN0IGRhdGFzZXRUeXBlID0gZGF0YXNldC50eXBlICE9IG51bGwgPyA8RXh0ZW5kZWRDaGFydFR5cGU+ZGF0YXNldC50eXBlIDogY2hhcnRUeXBlO1xuICAgICAgaWYgKHRoaXMuX2NoYXJ0VHlwZXNOZWVkUG9pbnRzLmluZGV4T2YoZGF0YXNldFR5cGUpID4gLTEpIHtcbiAgICAgICAgZGF0YXNldC5kYXRhID0gKDxhbnlbXT4oZGF0YXNldC5kYXRhIHx8IFtdKSkubWFwKChkLCBpZHgpID0+IHtcbiAgICAgICAgICBpZiAodHlwZW9mIGQgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICByZXR1cm4gPGFueT57IHg6IGlkeCwgeTogZCwgcjogZCB9O1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gPENoYXJ0UG9pbnQ+ZDtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgY29uc3QgbGFiZWxzID0gbmV3RGF0YS5sYWJlbHMgfHwgW107XG4gICAgaWYgKG1heFBvaW50c051bSA+IDAgJiYgbGFiZWxzLmxlbmd0aCA8IG1heFBvaW50c051bSkge1xuICAgICAgZm9yIChsZXQgaSA9IGxhYmVscy5sZW5ndGg7IGkgPCBtYXhQb2ludHNOdW07IGkrKykge1xuICAgICAgICBsYWJlbHMucHVzaCgnJyk7XG4gICAgICB9XG4gICAgICBuZXdEYXRhLmxhYmVscyA9IGxhYmVscztcbiAgICB9XG4gICAgcmV0dXJuIG5ld0RhdGE7XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVDaGFydCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fY2hhcnQgPT0gbnVsbCkge1xuICAgICAgdGhpcy5fcmVidWlsZENoYXJ0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICg8YW55PnRoaXMuX2NoYXJ0KS5vcHRpb25zID0ge1xuICAgICAgICAuLi5kZWVwQ29weSgoPGFueT50aGlzLl9jaGFydCkub3B0aW9ucyksXG4gICAgICAgIC4uLmRlZXBDb3B5KHRoaXMub3B0aW9ucyB8fCB7fSlcbiAgICAgIH07XG4gICAgICB0aGlzLl9jaGFydC5kYXRhID0ge1xuICAgICAgICAuLi5kZWVwQ29weSh0aGlzLl9jaGFydC5kYXRhKSxcbiAgICAgICAgLi4uZGVlcENvcHkodGhpcy5kYXRhKVxuICAgICAgfTtcbiAgICAgIHRoaXMuX2NoYXJ0LnVwZGF0ZSgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3JlYnVpbGRDaGFydCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fY2hhcnQgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fY2hhcnQuZGVzdHJveSgpO1xuICAgICAgdGhpcy5fY2hhcnQgPSBudWxsO1xuICAgIH1cbiAgICBpZiAodGhpcy5fY2hhcnRDYW52YXNFbGVtZW50ICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZUNoaWxkKHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQsIHRoaXMuX2NoYXJ0Q2FudmFzRWxlbWVudCk7XG4gICAgICB0aGlzLl9jaGFydENhbnZhc0VsZW1lbnQgPSBudWxsO1xuICAgIH1cbiAgICBpZiAodGhpcy5kYXRhICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX2NoYXJ0Q2FudmFzRWxlbWVudCA9IHRoaXMuX3JlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fY2hhcnRDYW52YXNFbGVtZW50LCAnd2lkdGgnLCAnaW5oZXJpdCcpO1xuICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fY2hhcnRDYW52YXNFbGVtZW50LCAnaGVpZ2h0JywgJ2luaGVyaXQnKTtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLmFwcGVuZENoaWxkKHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQsIHRoaXMuX2NoYXJ0Q2FudmFzRWxlbWVudCk7XG4gICAgICBjb25zdCBjdHggPSB0aGlzLl9jaGFydENhbnZhc0VsZW1lbnQuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgIHRoaXMuX2NoYXJ0ID0gbmV3IGNoYXJ0Q2xhc3MoY3R4LCB7XG4gICAgICAgIHR5cGU6IHRoaXMuY2hhcnRUeXBlLFxuICAgICAgICBkYXRhOiB0aGlzLl9maXhEYXRhKHRoaXMuY2hhcnRUeXBlLCB0aGlzLmRhdGEpLFxuICAgICAgICBvcHRpb25zOiB0aGlzLl9maXhDaGFydE9wdGlvbnModGhpcy5vcHRpb25zKVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfZml4Q2hhcnRPcHRpb25zKG9wdGlvbnM6IENoYXJ0T3B0aW9ucyk6IENoYXJ0T3B0aW9ucyB7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgaWYgKG9wdGlvbnMuc2NhbGVzID09IG51bGwpIHtcbiAgICAgIG9wdGlvbnMuc2NhbGVzID0geyB4QXhlczogW10sIHlBeGVzOiBbXSB9O1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy5zY2FsZXMueEF4ZXMgPT0gbnVsbCkge1xuICAgICAgb3B0aW9ucy5zY2FsZXMueEF4ZXMgPSBbXTtcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMuc2NhbGVzLnlBeGVzID09IG51bGwpIHtcbiAgICAgIG9wdGlvbnMuc2NhbGVzLnlBeGVzID0gW107XG4gICAgfVxuICAgIGlmICh0aGlzLmNoYXJ0VHlwZSA9PSAncGllJykge1xuICAgICAgbGV0IG5ld09wdGlvbnMgPSA8YW55Pm9wdGlvbnM7XG4gICAgICBuZXdPcHRpb25zLnBpZWNlTGFiZWwgPSB7XG4gICAgICAgIHJlbmRlcjogZnVuY3Rpb24gKGFyZ3M6IGFueSkge1xuICAgICAgICAgIGlmIChhcmdzLmxhYmVsKSB7XG4gICAgICAgICAgICByZXR1cm4gYXJncy5sYWJlbCArICc6JyArIGFyZ3MudmFsdWU7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBhcmdzLnZhbHVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgcG9zaXRpb246ICdvdXRzaWRlJ1xuICAgICAgfTtcbiAgICAgIHJldHVybiBuZXdPcHRpb25zO1xuICAgIH1cbiAgICByZXR1cm4gb3B0aW9ucztcbiAgfVxufVxuIl19