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
import { ChangeDetectionStrategy, Component, ElementRef, Input, Renderer2, ViewEncapsulation } from '@angular/core';
import * as Chart from 'chart.js';
const chartClass = Chart.default || Chart;
import 'chart.piecelabel.js';
import { deepCopy } from '@ajf/core/utils';
let AjfChartComponent = /** @class */ (() => {
    class AjfChartComponent {
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
    }
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
    AjfChartComponent.ctorParameters = () => [
        { type: ElementRef },
        { type: Renderer2 }
    ];
    AjfChartComponent.propDecorators = {
        data: [{ type: Input }],
        options: [{ type: Input }],
        chartType: [{ type: Input }]
    };
    return AjfChartComponent;
})();
export { AjfChartComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9jaGFydC9jaGFydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBRUwsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsS0FBSyxFQUVMLFNBQVMsRUFFVCxpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxLQUFLLEtBQUssTUFBTSxVQUFVLENBQUM7QUFDbEMsTUFBTSxVQUFVLEdBQVMsS0FBTSxDQUFDLE9BQU8sSUFBSSxLQUFLLENBQUM7QUFHakQsT0FBTyxxQkFBcUIsQ0FBQztBQUU3QixPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFJekM7SUFBQSxNQU9hLGlCQUFpQjtRQVM1QixZQUFvQixHQUFlLEVBQVUsU0FBb0I7WUFBN0MsUUFBRyxHQUFILEdBQUcsQ0FBWTtZQUFVLGNBQVMsR0FBVCxTQUFTLENBQVc7WUFGekQsMEJBQXFCLEdBQXdCLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBRVAsQ0FBQztRQUVyRSxlQUFlO1lBQ2IsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3ZCLENBQUM7UUFFRCxXQUFXLENBQUMsT0FBc0I7WUFDaEMsSUFBSSxXQUFXLElBQUksT0FBTyxFQUFFO2dCQUMxQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7YUFDdEI7aUJBQU0sSUFBSSxTQUFTLElBQUksT0FBTyxJQUFJLE1BQU0sSUFBSSxPQUFPLEVBQUU7Z0JBQ3BELElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQzthQUNyQjtRQUNILENBQUM7UUFFTyxRQUFRLENBQUMsU0FBNEIsRUFBRSxJQUFlO1lBQzVELE1BQU0sT0FBTyxHQUFjLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMxQyxJQUFJLFlBQVks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TUFBTSxDQUFDLEtBQUssSUFBSSxJQUFJLEVBQUU7Z0JBQ2hDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQzthQUMzQjtZQUNELElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLElBQUksSUFBSSxFQUFFO2dCQUNoQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7YUFDM0I7WUFDRCxJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksS0FBSyxFQUFFO2dCQUMzQixJQUFJLFVBQVUsR0FBUSxPQUFPLENBQUM7Z0JBQzlCLFVBQVUsQ0FBQyxVQUFVLEdBQUc7b0JBQ3RCLE1BQU0sRUFBRSxVQUFTLElBQVM7d0JBQ3hCLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTs0QkFDZCxPQUFPLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7eUJBQ3RDOzZCQUFNOzRCQUNMLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQzt5QkFDbkI7b0JBQ0gsQ0FBQztvQkFDRCxRQUFRLEVBQUUsU0FBUztpQkFDcEIsQ0FBQztnQkFDRixPQUFPLFVBQVUsQ0FBQzthQUNuQjtZQUNELE9BQU8sT0FBTyxDQUFDO1FBQ2pCLENBQUM7OztnQkF4SEYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxXQUFXO29CQUNyQixZQUF5QjtvQkFFekIsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJOztpQkFDdEM7Ozs7Z0JBeEJDLFVBQVU7Z0JBR1YsU0FBUzs7O3VCQXVCUixLQUFLOzBCQUNMLEtBQUs7NEJBQ0wsS0FBSzs7SUErR1Isd0JBQUM7S0FBQTtTQWxIWSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIFJlbmRlcmVyMixcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCAqIGFzIENoYXJ0IGZyb20gJ2NoYXJ0LmpzJztcbmNvbnN0IGNoYXJ0Q2xhc3MgPSAoPGFueT5DaGFydCkuZGVmYXVsdCB8fCBDaGFydDtcbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZVxuaW1wb3J0IHtDaGFydERhdGEsIENoYXJ0T3B0aW9ucywgQ2hhcnRQb2ludH0gZnJvbSAnY2hhcnQuanMnO1xuaW1wb3J0ICdjaGFydC5waWVjZWxhYmVsLmpzJztcblxuaW1wb3J0IHtkZWVwQ29weX0gZnJvbSAnQGFqZi9jb3JlL3V0aWxzJztcbmltcG9ydCB7RXh0ZW5kZWRDaGFydFR5cGV9IGZyb20gJy4vZXh0ZW5kZWQtY2hhcnQtdHlwZSc7XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWpmLWNoYXJ0JyxcbiAgdGVtcGxhdGVVcmw6ICdjaGFydC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ2NoYXJ0LmNzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBBamZDaGFydENvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpIGRhdGE6IENoYXJ0RGF0YTtcbiAgQElucHV0KCkgb3B0aW9uczogQ2hhcnRPcHRpb25zO1xuICBASW5wdXQoKSBjaGFydFR5cGU6IEV4dGVuZGVkQ2hhcnRUeXBlO1xuXG4gIHByaXZhdGUgX2NoYXJ0OiBDaGFydHxudWxsO1xuICBwcml2YXRlIF9jaGFydENhbnZhc0VsZW1lbnQ6IGFueTtcbiAgcHJpdmF0ZSBfY2hhcnRUeXBlc05lZWRQb2ludHM6IEV4dGVuZGVkQ2hhcnRUeXBlW10gPSBbJ3NjYXR0ZXInLCAnYnViYmxlJ107XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfZWw6IEVsZW1lbnRSZWYsIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIpIHt9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHRoaXMuX3JlYnVpbGRDaGFydCgpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGlmICgnY2hhcnRUeXBlJyBpbiBjaGFuZ2VzKSB7XG4gICAgICB0aGlzLl9yZWJ1aWxkQ2hhcnQoKTtcbiAgICB9IGVsc2UgaWYgKCdvcHRpb25zJyBpbiBjaGFuZ2VzIHx8ICdkYXRhJyBpbiBjaGFuZ2VzKSB7XG4gICAgICB0aGlzLl91cGRhdGVDaGFydCgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2ZpeERhdGEoY2hhcnRUeXBlOiBFeHRlbmRlZENoYXJ0VHlwZSwgZGF0YTogQ2hhcnREYXRhKTogQ2hhcnREYXRhIHtcbiAgICBjb25zdCBuZXdEYXRhOiBDaGFydERhdGEgPSBkZWVwQ29weShkYXRhKTtcbiAgICBsZXQgbWF4UG9pbnRzTnVtID0gMDtcbiAgICAobmV3RGF0YS5kYXRhc2V0cyB8fCBbXSkuZm9yRWFjaCgoZGF0YXNldCkgPT4ge1xuICAgICAgaWYgKGRhdGFzZXQubGFiZWwgPT0gbnVsbCkge1xuICAgICAgICBkYXRhc2V0LmxhYmVsID0gJyc7XG4gICAgICB9XG4gICAgICBtYXhQb2ludHNOdW0gPSBNYXRoLm1heChtYXhQb2ludHNOdW0sIChkYXRhc2V0LmRhdGEgfHwgW10pLmxlbmd0aCk7XG4gICAgICBjb25zdCBkYXRhc2V0VHlwZSA9IGRhdGFzZXQudHlwZSAhPSBudWxsID8gPEV4dGVuZGVkQ2hhcnRUeXBlPmRhdGFzZXQudHlwZSA6IGNoYXJ0VHlwZTtcbiAgICAgIGlmICh0aGlzLl9jaGFydFR5cGVzTmVlZFBvaW50cy5pbmRleE9mKGRhdGFzZXRUeXBlKSA+IC0xKSB7XG4gICAgICAgIGRhdGFzZXQuZGF0YSA9ICg8YW55W10+KGRhdGFzZXQuZGF0YSB8fCBbXSkpLm1hcCgoZCwgaWR4KSA9PiB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBkID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgcmV0dXJuIDxhbnk+e3g6IGlkeCwgeTogZCwgcjogZH07XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiA8Q2hhcnRQb2ludD5kO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBjb25zdCBsYWJlbHMgPSBuZXdEYXRhLmxhYmVscyB8fCBbXTtcbiAgICBpZiAobWF4UG9pbnRzTnVtID4gMCAmJiBsYWJlbHMubGVuZ3RoIDwgbWF4UG9pbnRzTnVtKSB7XG4gICAgICBmb3IgKGxldCBpID0gbGFiZWxzLmxlbmd0aDsgaSA8IG1heFBvaW50c051bTsgaSsrKSB7XG4gICAgICAgIGxhYmVscy5wdXNoKCcnKTtcbiAgICAgIH1cbiAgICAgIG5ld0RhdGEubGFiZWxzID0gbGFiZWxzO1xuICAgIH1cbiAgICByZXR1cm4gbmV3RGF0YTtcbiAgfVxuXG4gIHByaXZhdGUgX3VwZGF0ZUNoYXJ0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9jaGFydCA9PSBudWxsKSB7XG4gICAgICB0aGlzLl9yZWJ1aWxkQ2hhcnQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgKDxhbnk+dGhpcy5fY2hhcnQpLm9wdGlvbnMgPSB7XG4gICAgICAgIC4uLmRlZXBDb3B5KCg8YW55PnRoaXMuX2NoYXJ0KS5vcHRpb25zKSxcbiAgICAgICAgLi4uZGVlcENvcHkodGhpcy5vcHRpb25zIHx8IHt9KVxuICAgICAgfTtcbiAgICAgIHRoaXMuX2NoYXJ0LmRhdGEgPSB7Li4uZGVlcENvcHkodGhpcy5fY2hhcnQuZGF0YSksIC4uLmRlZXBDb3B5KHRoaXMuZGF0YSl9O1xuICAgICAgdGhpcy5fY2hhcnQudXBkYXRlKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfcmVidWlsZENoYXJ0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9jaGFydCAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9jaGFydC5kZXN0cm95KCk7XG4gICAgICB0aGlzLl9jaGFydCA9IG51bGw7XG4gICAgfVxuICAgIGlmICh0aGlzLl9jaGFydENhbnZhc0VsZW1lbnQgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fcmVuZGVyZXIucmVtb3ZlQ2hpbGQodGhpcy5fZWwubmF0aXZlRWxlbWVudCwgdGhpcy5fY2hhcnRDYW52YXNFbGVtZW50KTtcbiAgICAgIHRoaXMuX2NoYXJ0Q2FudmFzRWxlbWVudCA9IG51bGw7XG4gICAgfVxuICAgIGlmICh0aGlzLmRhdGEgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fY2hhcnRDYW52YXNFbGVtZW50ID0gdGhpcy5fcmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9jaGFydENhbnZhc0VsZW1lbnQsICd3aWR0aCcsICdpbmhlcml0Jyk7XG4gICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9jaGFydENhbnZhc0VsZW1lbnQsICdoZWlnaHQnLCAnaW5oZXJpdCcpO1xuICAgICAgdGhpcy5fcmVuZGVyZXIuYXBwZW5kQ2hpbGQodGhpcy5fZWwubmF0aXZlRWxlbWVudCwgdGhpcy5fY2hhcnRDYW52YXNFbGVtZW50KTtcbiAgICAgIGNvbnN0IGN0eCA9IHRoaXMuX2NoYXJ0Q2FudmFzRWxlbWVudC5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgdGhpcy5fY2hhcnQgPSBuZXcgY2hhcnRDbGFzcyhjdHgsIHtcbiAgICAgICAgdHlwZTogdGhpcy5jaGFydFR5cGUsXG4gICAgICAgIGRhdGE6IHRoaXMuX2ZpeERhdGEodGhpcy5jaGFydFR5cGUsIHRoaXMuZGF0YSksXG4gICAgICAgIG9wdGlvbnM6IHRoaXMuX2ZpeENoYXJ0T3B0aW9ucyh0aGlzLm9wdGlvbnMpXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9maXhDaGFydE9wdGlvbnMob3B0aW9uczogQ2hhcnRPcHRpb25zKTogQ2hhcnRPcHRpb25zIHtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICBpZiAob3B0aW9ucy5zY2FsZXMgPT0gbnVsbCkge1xuICAgICAgb3B0aW9ucy5zY2FsZXMgPSB7eEF4ZXM6IFtdLCB5QXhlczogW119O1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy5zY2FsZXMueEF4ZXMgPT0gbnVsbCkge1xuICAgICAgb3B0aW9ucy5zY2FsZXMueEF4ZXMgPSBbXTtcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMuc2NhbGVzLnlBeGVzID09IG51bGwpIHtcbiAgICAgIG9wdGlvbnMuc2NhbGVzLnlBeGVzID0gW107XG4gICAgfVxuICAgIGlmICh0aGlzLmNoYXJ0VHlwZSA9PSAncGllJykge1xuICAgICAgbGV0IG5ld09wdGlvbnMgPSA8YW55Pm9wdGlvbnM7XG4gICAgICBuZXdPcHRpb25zLnBpZWNlTGFiZWwgPSB7XG4gICAgICAgIHJlbmRlcjogZnVuY3Rpb24oYXJnczogYW55KSB7XG4gICAgICAgICAgaWYgKGFyZ3MubGFiZWwpIHtcbiAgICAgICAgICAgIHJldHVybiBhcmdzLmxhYmVsICsgJzonICsgYXJncy52YWx1ZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGFyZ3MudmFsdWU7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBwb3NpdGlvbjogJ291dHNpZGUnXG4gICAgICB9O1xuICAgICAgcmV0dXJuIG5ld09wdGlvbnM7XG4gICAgfVxuICAgIHJldHVybiBvcHRpb25zO1xuICB9XG59XG4iXX0=