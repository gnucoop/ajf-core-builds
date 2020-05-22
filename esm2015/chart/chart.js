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
import { __decorate, __metadata } from "tslib";
import { ChangeDetectionStrategy, Component, ElementRef, Input, Renderer2, ViewEncapsulation } from '@angular/core';
import * as Chart from 'chart.js';
const chartClass = Chart.default || Chart;
import 'chart.piecelabel.js';
import { deepCopy } from '@ajf/core/utils';
let AjfChartComponent = /** @class */ (() => {
    let AjfChartComponent = class AjfChartComponent {
        constructor(_el, _renderer) {
            this._el = _el;
            this._renderer = _renderer;
            this._chartTypesNeedPoints = ['scatter', 'bubble'];
        }
        ngAfterViewInit() {
            this._rebuildChart();
        }
        ngOnChanges(changes) {
            if ('chartType' in changes) {
                this._rebuildChart();
            }
            else if ('options' in changes || 'data' in changes) {
                this._updateChart();
            }
        }
        _fixData(chartType, data) {
            const newData = deepCopy(data);
            let maxPointsNum = 0;
            (newData.datasets || []).forEach((dataset) => {
                if (dataset.label == null) {
                    dataset.label = '';
                }
                maxPointsNum = Math.max(maxPointsNum, (dataset.data || []).length);
                const datasetType = dataset.type != null ? dataset.type : chartType;
                if (this._chartTypesNeedPoints.indexOf(datasetType) > -1) {
                    dataset.data = (dataset.data || []).map((d, idx) => {
                        if (typeof d === 'number') {
                            return { x: idx, y: d, r: d };
                        }
                        return d;
                    });
                }
            });
            const labels = newData.labels || [];
            if (maxPointsNum > 0 && labels.length < maxPointsNum) {
                for (let i = labels.length; i < maxPointsNum; i++) {
                    labels.push('');
                }
                newData.labels = labels;
            }
            return newData;
        }
        _updateChart() {
            if (this._chart == null) {
                this._rebuildChart();
            }
            else {
                this._chart.options = Object.assign(Object.assign({}, deepCopy(this._chart.options)), deepCopy(this.options || {}));
                this._chart.data = Object.assign(Object.assign({}, deepCopy(this._chart.data)), deepCopy(this.data));
                this._chart.update();
            }
        }
        _rebuildChart() {
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
                const ctx = this._chartCanvasElement.getContext('2d');
                this._chart = new chartClass(ctx, {
                    type: this.chartType,
                    data: this._fixData(this.chartType, this.data),
                    options: this._fixChartOptions(this.options)
                });
            }
        }
        _fixChartOptions(options) {
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
                let newOptions = options;
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
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AjfChartComponent.prototype, "data", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AjfChartComponent.prototype, "options", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], AjfChartComponent.prototype, "chartType", void 0);
    AjfChartComponent = __decorate([
        Component({
            selector: 'ajf-chart',
            template: "",
            changeDetection: ChangeDetectionStrategy.OnPush,
            encapsulation: ViewEncapsulation.None,
            styles: ["ajf-chart{display:block;width:inherit;height:inherit;position:relative}\n"]
        }),
        __metadata("design:paramtypes", [ElementRef, Renderer2])
    ], AjfChartComponent);
    return AjfChartComponent;
})();
export { AjfChartComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9jaGFydC9jaGFydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7O0FBRUgsT0FBTyxFQUVMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsVUFBVSxFQUNWLEtBQUssRUFFTCxTQUFTLEVBRVQsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sS0FBSyxLQUFLLE1BQU0sVUFBVSxDQUFDO0FBQ2xDLE1BQU0sVUFBVSxHQUFTLEtBQU0sQ0FBQyxPQUFPLElBQUksS0FBSyxDQUFDO0FBR2pELE9BQU8scUJBQXFCLENBQUM7QUFFN0IsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBV3pDO0lBQUEsSUFBYSxpQkFBaUIsR0FBOUIsTUFBYSxpQkFBaUI7UUFTNUIsWUFBb0IsR0FBZSxFQUFVLFNBQW9CO1lBQTdDLFFBQUcsR0FBSCxHQUFHLENBQVk7WUFBVSxjQUFTLEdBQVQsU0FBUyxDQUFXO1lBRnpELDBCQUFxQixHQUF3QixDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUVQLENBQUM7UUFFckUsZUFBZTtZQUNiLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN2QixDQUFDO1FBRUQsV0FBVyxDQUFDLE9BQXNCO1lBQ2hDLElBQUksV0FBVyxJQUFJLE9BQU8sRUFBRTtnQkFDMUIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO2FBQ3RCO2lCQUFNLElBQUksU0FBUyxJQUFJLE9BQU8sSUFBSSxNQUFNLElBQUksT0FBTyxFQUFFO2dCQUNwRCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7YUFDckI7UUFDSCxDQUFDO1FBRU8sUUFBUSxDQUFDLFNBQTRCLEVBQUUsSUFBZTtZQUM1RCxNQUFNLE9BQU8sR0FBYyxRQUFRLENBQUMsSUFBSSxDQUFDLENB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dCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIFJlbmRlcmVyMixcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCAqIGFzIENoYXJ0IGZyb20gJ2NoYXJ0LmpzJztcbmNvbnN0IGNoYXJ0Q2xhc3MgPSAoPGFueT5DaGFydCkuZGVmYXVsdCB8fCBDaGFydDtcbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZVxuaW1wb3J0IHtDaGFydERhdGEsIENoYXJ0T3B0aW9ucywgQ2hhcnRQb2ludH0gZnJvbSAnY2hhcnQuanMnO1xuaW1wb3J0ICdjaGFydC5waWVjZWxhYmVsLmpzJztcblxuaW1wb3J0IHtkZWVwQ29weX0gZnJvbSAnQGFqZi9jb3JlL3V0aWxzJztcbmltcG9ydCB7RXh0ZW5kZWRDaGFydFR5cGV9IGZyb20gJy4vZXh0ZW5kZWQtY2hhcnQtdHlwZSc7XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWpmLWNoYXJ0JyxcbiAgdGVtcGxhdGVVcmw6ICdjaGFydC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ2NoYXJ0LmNzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBBamZDaGFydENvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpIGRhdGE6IENoYXJ0RGF0YTtcbiAgQElucHV0KCkgb3B0aW9uczogQ2hhcnRPcHRpb25zO1xuICBASW5wdXQoKSBjaGFydFR5cGU6IEV4dGVuZGVkQ2hhcnRUeXBlO1xuXG4gIHByaXZhdGUgX2NoYXJ0OiBDaGFydHxudWxsO1xuICBwcml2YXRlIF9jaGFydENhbnZhc0VsZW1lbnQ6IGFueTtcbiAgcHJpdmF0ZSBfY2hhcnRUeXBlc05lZWRQb2ludHM6IEV4dGVuZGVkQ2hhcnRUeXBlW10gPSBbJ3NjYXR0ZXInLCAnYnViYmxlJ107XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfZWw6IEVsZW1lbnRSZWYsIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIpIHt9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHRoaXMuX3JlYnVpbGRDaGFydCgpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGlmICgnY2hhcnRUeXBlJyBpbiBjaGFuZ2VzKSB7XG4gICAgICB0aGlzLl9yZWJ1aWxkQ2hhcnQoKTtcbiAgICB9IGVsc2UgaWYgKCdvcHRpb25zJyBpbiBjaGFuZ2VzIHx8ICdkYXRhJyBpbiBjaGFuZ2VzKSB7XG4gICAgICB0aGlzLl91cGRhdGVDaGFydCgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2ZpeERhdGEoY2hhcnRUeXBlOiBFeHRlbmRlZENoYXJ0VHlwZSwgZGF0YTogQ2hhcnREYXRhKTogQ2hhcnREYXRhIHtcbiAgICBjb25zdCBuZXdEYXRhOiBDaGFydERhdGEgPSBkZWVwQ29weShkYXRhKTtcbiAgICBsZXQgbWF4UG9pbnRzTnVtID0gMDtcbiAgICAobmV3RGF0YS5kYXRhc2V0cyB8fCBbXSkuZm9yRWFjaCgoZGF0YXNldCkgPT4ge1xuICAgICAgaWYgKGRhdGFzZXQubGFiZWwgPT0gbnVsbCkge1xuICAgICAgICBkYXRhc2V0LmxhYmVsID0gJyc7XG4gICAgICB9XG4gICAgICBtYXhQb2ludHNOdW0gPSBNYXRoLm1heChtYXhQb2ludHNOdW0sIChkYXRhc2V0LmRhdGEgfHwgW10pLmxlbmd0aCk7XG4gICAgICBjb25zdCBkYXRhc2V0VHlwZSA9IGRhdGFzZXQudHlwZSAhPSBudWxsID8gPEV4dGVuZGVkQ2hhcnRUeXBlPmRhdGFzZXQudHlwZSA6IGNoYXJ0VHlwZTtcbiAgICAgIGlmICh0aGlzLl9jaGFydFR5cGVzTmVlZFBvaW50cy5pbmRleE9mKGRhdGFzZXRUeXBlKSA+IC0xKSB7XG4gICAgICAgIGRhdGFzZXQuZGF0YSA9ICg8YW55W10+KGRhdGFzZXQuZGF0YSB8fCBbXSkpLm1hcCgoZCwgaWR4KSA9PiB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBkID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgcmV0dXJuIDxhbnk+e3g6IGlkeCwgeTogZCwgcjogZH07XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiA8Q2hhcnRQb2ludD5kO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBjb25zdCBsYWJlbHMgPSBuZXdEYXRhLmxhYmVscyB8fCBbXTtcbiAgICBpZiAobWF4UG9pbnRzTnVtID4gMCAmJiBsYWJlbHMubGVuZ3RoIDwgbWF4UG9pbnRzTnVtKSB7XG4gICAgICBmb3IgKGxldCBpID0gbGFiZWxzLmxlbmd0aDsgaSA8IG1heFBvaW50c051bTsgaSsrKSB7XG4gICAgICAgIGxhYmVscy5wdXNoKCcnKTtcbiAgICAgIH1cbiAgICAgIG5ld0RhdGEubGFiZWxzID0gbGFiZWxzO1xuICAgIH1cbiAgICByZXR1cm4gbmV3RGF0YTtcbiAgfVxuXG4gIHByaXZhdGUgX3VwZGF0ZUNoYXJ0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9jaGFydCA9PSBudWxsKSB7XG4gICAgICB0aGlzLl9yZWJ1aWxkQ2hhcnQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgKDxhbnk+dGhpcy5fY2hhcnQpLm9wdGlvbnMgPSB7XG4gICAgICAgIC4uLmRlZXBDb3B5KCg8YW55PnRoaXMuX2NoYXJ0KS5vcHRpb25zKSxcbiAgICAgICAgLi4uZGVlcENvcHkodGhpcy5vcHRpb25zIHx8IHt9KVxuICAgICAgfTtcbiAgICAgIHRoaXMuX2NoYXJ0LmRhdGEgPSB7Li4uZGVlcENvcHkodGhpcy5fY2hhcnQuZGF0YSksIC4uLmRlZXBDb3B5KHRoaXMuZGF0YSl9O1xuICAgICAgdGhpcy5fY2hhcnQudXBkYXRlKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfcmVidWlsZENoYXJ0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9jaGFydCAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9jaGFydC5kZXN0cm95KCk7XG4gICAgICB0aGlzLl9jaGFydCA9IG51bGw7XG4gICAgfVxuICAgIGlmICh0aGlzLl9jaGFydENhbnZhc0VsZW1lbnQgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fcmVuZGVyZXIucmVtb3ZlQ2hpbGQodGhpcy5fZWwubmF0aXZlRWxlbWVudCwgdGhpcy5fY2hhcnRDYW52YXNFbGVtZW50KTtcbiAgICAgIHRoaXMuX2NoYXJ0Q2FudmFzRWxlbWVudCA9IG51bGw7XG4gICAgfVxuICAgIGlmICh0aGlzLmRhdGEgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fY2hhcnRDYW52YXNFbGVtZW50ID0gdGhpcy5fcmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9jaGFydENhbnZhc0VsZW1lbnQsICd3aWR0aCcsICdpbmhlcml0Jyk7XG4gICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9jaGFydENhbnZhc0VsZW1lbnQsICdoZWlnaHQnLCAnaW5oZXJpdCcpO1xuICAgICAgdGhpcy5fcmVuZGVyZXIuYXBwZW5kQ2hpbGQodGhpcy5fZWwubmF0aXZlRWxlbWVudCwgdGhpcy5fY2hhcnRDYW52YXNFbGVtZW50KTtcbiAgICAgIGNvbnN0IGN0eCA9IHRoaXMuX2NoYXJ0Q2FudmFzRWxlbWVudC5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgdGhpcy5fY2hhcnQgPSBuZXcgY2hhcnRDbGFzcyhjdHgsIHtcbiAgICAgICAgdHlwZTogdGhpcy5jaGFydFR5cGUsXG4gICAgICAgIGRhdGE6IHRoaXMuX2ZpeERhdGEodGhpcy5jaGFydFR5cGUsIHRoaXMuZGF0YSksXG4gICAgICAgIG9wdGlvbnM6IHRoaXMuX2ZpeENoYXJ0T3B0aW9ucyh0aGlzLm9wdGlvbnMpXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9maXhDaGFydE9wdGlvbnMob3B0aW9uczogQ2hhcnRPcHRpb25zKTogQ2hhcnRPcHRpb25zIHtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICBpZiAob3B0aW9ucy5zY2FsZXMgPT0gbnVsbCkge1xuICAgICAgb3B0aW9ucy5zY2FsZXMgPSB7eEF4ZXM6IFtdLCB5QXhlczogW119O1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy5zY2FsZXMueEF4ZXMgPT0gbnVsbCkge1xuICAgICAgb3B0aW9ucy5zY2FsZXMueEF4ZXMgPSBbXTtcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMuc2NhbGVzLnlBeGVzID09IG51bGwpIHtcbiAgICAgIG9wdGlvbnMuc2NhbGVzLnlBeGVzID0gW107XG4gICAgfVxuICAgIGlmICh0aGlzLmNoYXJ0VHlwZSA9PSAncGllJykge1xuICAgICAgbGV0IG5ld09wdGlvbnMgPSA8YW55Pm9wdGlvbnM7XG4gICAgICBuZXdPcHRpb25zLnBpZWNlTGFiZWwgPSB7XG4gICAgICAgIHJlbmRlcjogZnVuY3Rpb24oYXJnczogYW55KSB7XG4gICAgICAgICAgaWYgKGFyZ3MubGFiZWwpIHtcbiAgICAgICAgICAgIHJldHVybiBhcmdzLmxhYmVsICsgJzonICsgYXJncy52YWx1ZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGFyZ3MudmFsdWU7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBwb3NpdGlvbjogJ291dHNpZGUnXG4gICAgICB9O1xuICAgICAgcmV0dXJuIG5ld09wdGlvbnM7XG4gICAgfVxuICAgIHJldHVybiBvcHRpb25zO1xuICB9XG59XG4iXX0=