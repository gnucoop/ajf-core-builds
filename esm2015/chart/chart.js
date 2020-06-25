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
            if (options.legendCallback) {
                const legendCallback = (typeof options.legendCallback === 'string'
                    ? new Function(options.legendCallback)
                    : options.legendCallback);
                options.legendCallback = legendCallback;
            }
            if (options.onHover) {
                const onHover = (typeof options.onHover === 'string'
                    ? new Function(options.onHover)
                    : options.onHover);
                options.onHover = onHover;
            }
            if (options.onClick) {
                const onClick = (typeof options.onClick === 'string'
                    ? new Function(options.onClick)
                    : options.onClick);
                options.onClick = onClick;
            }
            if (options.onResize) {
                const onResize = (typeof options.onResize === 'string'
                    ? new Function(options.onResize)
                    : options.onResize);
                options.onResize = onResize;
            }
            if (options.legend) {
                const legend = options.legend;
                if (legend.onClick) {
                    const onClick = (typeof legend.onClick === 'string'
                        ? new Function(legend.onClick)
                        : legend.onClick);
                    legend.onClick = onClick;
                }
                if (legend.onHover) {
                    const onHover = (typeof legend.onHover === 'string'
                        ? new Function(legend.onHover)
                        : legend.onHover);
                    legend.onHover = onHover;
                }
                if (legend.onLeave) {
                    const onLeave = (typeof legend.onLeave === 'string'
                        ? new Function(legend.onLeave)
                        : legend.onLeave);
                    legend.onLeave = onLeave;
                }
                if (legend.labels) {
                    const labels = legend.labels;
                    if (labels.generateLabels) {
                        const generateLabels = (typeof labels.generateLabels === 'string'
                            ? new Function(labels.generateLabels)
                            : labels.generateLabels);
                        labels.generateLabels = generateLabels;
                    }
                    if (labels.filter) {
                        const filter = (typeof labels.filter === 'string'
                            ? new Function(labels.filter)
                            : labels.filter);
                        labels.filter = filter;
                    }
                }
            }
            if (options.tooltips) {
                const tooltips = options.tooltips;
                if (tooltips.custom) {
                    const custom = (typeof tooltips.custom === 'string'
                        ? new Function(tooltips.custom)
                        : tooltips.custom);
                    tooltips.custom = custom;
                }
                if (tooltips.callbacks) {
                    const callbacks = tooltips.callbacks;
                    for (const key in callbacks) {
                        const callback = callbacks[key];
                        callbacks[key] = typeof callback === 'string'
                            ? new Function(callback)
                            : callback;
                    }
                }
                if (tooltips.filter) {
                    const filter = (typeof tooltips.filter === 'string'
                        ? new Function(tooltips.filter)
                        : tooltips.filter);
                    tooltips.filter = filter;
                }
                if (tooltips.itemSort) {
                    const itemSort = (typeof tooltips.itemSort === 'string'
                        ? new Function(tooltips.itemSort)
                        : tooltips.itemSort);
                    tooltips.itemSort = itemSort;
                }
            }
            if (options.hover) {
                const hover = options.hover;
                if (hover.onHover) {
                    const onHover = (typeof hover.onHover === 'string'
                        ? new Function(hover.onHover)
                        : hover.onHover);
                    hover.onHover = onHover;
                }
            }
            if (options.animation) {
                const animation = options.animation;
                if (animation.onProgress) {
                    const onProgress = (typeof animation.onProgress === 'string'
                        ? new Function(animation.onProgress)
                        : animation.onProgress);
                    animation.onProgress = onProgress;
                }
                if (animation.onComplete) {
                    const onComplete = (typeof animation.onComplete === 'string'
                        ? new Function(animation.onComplete)
                        : animation.onComplete);
                    animation.onComplete = onComplete;
                }
            }
            if (options.scales == null) {
                options.scales = { xAxes: [], yAxes: [] };
            }
            if (options.scales.xAxes == null) {
                options.scales.xAxes = [];
            }
            if (options.scales.yAxes == null) {
                options.scales.yAxes = [];
            }
            options.scales.yAxes.forEach((yAxe) => {
                if (yAxe.ticks && yAxe.ticks.callback) {
                    const callback = (typeof yAxe.ticks.callback === 'string'
                        ? new Function(yAxe.ticks.callback)
                        : yAxe.ticks.callback);
                    yAxe.ticks.callback = callback;
                }
            });
            options.scales.xAxes.forEach((xAxe) => {
                if (xAxe.ticks && xAxe.ticks.callback) {
                    const callback = (typeof xAxe.ticks.callback === 'string'
                        ? new Function(xAxe.ticks.callback)
                        : xAxe.ticks.callback);
                    xAxe.ticks.callback = callback;
                }
            });
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
                },] }
    ];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9jaGFydC9jaGFydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBRUwsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsS0FBSyxFQUVMLFNBQVMsRUFFVCxpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxLQUFLLEtBQUssTUFBTSxVQUFVLENBQUM7QUFDbEMsTUFBTSxVQUFVLEdBQUksS0FBYSxDQUFDLE9BQU8sSUFBSSxLQUFLLENBQUM7QUFZbkQsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBSXpDO0lBQUEsTUFPYSxpQkFBaUI7UUFTNUIsWUFBb0IsR0FBZSxFQUFVLFNBQW9CO1lBQTdDLFFBQUcsR0FBSCxHQUFHLENBQVk7WUFBVSxjQUFTLEdBQVQsU0FBUyxDQUFXO1lBRnpELDBCQUFxQixHQUF3QixDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUVQLENBQUM7UUFFckUsZUFBZTtZQUNiLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN2QixDQUFDO1FBRUQsV0FBVyxDQUFDLE9BQXNCO1lBQ2hDLElBQUksV0FBVyxJQUFJLE9BQU8sRUFBRTtnQkFDMUIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO2FBQ3RCO2lCQUFNLElBQUksU0FBUyxJQUFJLE9BQU8sSUFBSSxNQUFNLElBQUksT0FBTyxFQUFFO2dCQUNwRCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7YUFDckI7UUFDSCxDQUFDO1FBRU8sUUFBUSxDQUFDLFNBQTRCLEVBQUUsSUFBZTtZQUM1RCxNQUFNLE9BQU8sR0FBYyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDMUMsSUFBSSxZQUFZLEdBQUcsQ0FBQyxDQUFDO1lBQ3JCLENB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LFFBQVEsRUFBRSxXQUFXO29CQUNyQixZQUF5QjtvQkFFekIsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJOztpQkFDdEM7OztnQkEvQkMsVUFBVTtnQkFHVixTQUFTOzs7dUJBOEJSLEtBQUs7MEJBQ0wsS0FBSzs0QkFDTCxLQUFLOztJQTBQUix3QkFBQztLQUFBO1NBN1BZLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgUmVuZGVyZXIyLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0ICogYXMgQ2hhcnQgZnJvbSAnY2hhcnQuanMnO1xuY29uc3QgY2hhcnRDbGFzcyA9IChDaGFydCBhcyBhbnkpLmRlZmF1bHQgfHwgQ2hhcnQ7XG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmVcbmltcG9ydCB7XG4gIENoYXJ0RGF0YSxcbiAgQ2hhcnRQb2ludCxcbiAgQ2hhcnRMZWdlbmRMYWJlbEl0ZW0sXG4gIENoYXJ0T3B0aW9ucyxcbiAgQ2hhcnRTaXplLFxuICBDaGFydFRvb2x0aXBNb2RlbCxcbiAgQ2hhcnRUb29sdGlwSXRlbSxcbn0gZnJvbSAnY2hhcnQuanMnO1xuXG5pbXBvcnQge2RlZXBDb3B5fSBmcm9tICdAYWpmL2NvcmUvdXRpbHMnO1xuaW1wb3J0IHtFeHRlbmRlZENoYXJ0VHlwZX0gZnJvbSAnLi9leHRlbmRlZC1jaGFydC10eXBlJztcblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhamYtY2hhcnQnLFxuICB0ZW1wbGF0ZVVybDogJ2NoYXJ0Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnY2hhcnQuY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIEFqZkNoYXJ0Q29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25DaGFuZ2VzIHtcbiAgQElucHV0KCkgZGF0YTogQ2hhcnREYXRhO1xuICBASW5wdXQoKSBvcHRpb25zOiBDaGFydE9wdGlvbnM7XG4gIEBJbnB1dCgpIGNoYXJ0VHlwZTogRXh0ZW5kZWRDaGFydFR5cGU7XG5cbiAgcHJpdmF0ZSBfY2hhcnQ6IENoYXJ0fG51bGw7XG4gIHByaXZhdGUgX2NoYXJ0Q2FudmFzRWxlbWVudDogYW55O1xuICBwcml2YXRlIF9jaGFydFR5cGVzTmVlZFBvaW50czogRXh0ZW5kZWRDaGFydFR5cGVbXSA9IFsnc2NhdHRlcicsICdidWJibGUnXTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9lbDogRWxlbWVudFJlZiwgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMikge31cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fcmVidWlsZENoYXJ0KCk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgaWYgKCdjaGFydFR5cGUnIGluIGNoYW5nZXMpIHtcbiAgICAgIHRoaXMuX3JlYnVpbGRDaGFydCgpO1xuICAgIH0gZWxzZSBpZiAoJ29wdGlvbnMnIGluIGNoYW5nZXMgfHwgJ2RhdGEnIGluIGNoYW5nZXMpIHtcbiAgICAgIHRoaXMuX3VwZGF0ZUNoYXJ0KCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfZml4RGF0YShjaGFydFR5cGU6IEV4dGVuZGVkQ2hhcnRUeXBlLCBkYXRhOiBDaGFydERhdGEpOiBDaGFydERhdGEge1xuICAgIGNvbnN0IG5ld0RhdGE6IENoYXJ0RGF0YSA9IGRlZXBDb3B5KGRhdGEpO1xuICAgIGxldCBtYXhQb2ludHNOdW0gPSAwO1xuICAgIChuZXdEYXRhLmRhdGFzZXRzIHx8IFtdKS5mb3JFYWNoKChkYXRhc2V0KSA9PiB7XG4gICAgICBpZiAoZGF0YXNldC5sYWJlbCA9PSBudWxsKSB7XG4gICAgICAgIGRhdGFzZXQubGFiZWwgPSAnJztcbiAgICAgIH1cbiAgICAgIG1heFBvaW50c051bSA9IE1hdGgubWF4KG1heFBvaW50c051bSwgKGRhdGFzZXQuZGF0YSB8fCBbXSkubGVuZ3RoKTtcbiAgICAgIGNvbnN0IGRhdGFzZXRUeXBlID0gZGF0YXNldC50eXBlICE9IG51bGwgPyA8RXh0ZW5kZWRDaGFydFR5cGU+ZGF0YXNldC50eXBlIDogY2hhcnRUeXBlO1xuICAgICAgaWYgKHRoaXMuX2NoYXJ0VHlwZXNOZWVkUG9pbnRzLmluZGV4T2YoZGF0YXNldFR5cGUpID4gLTEpIHtcbiAgICAgICAgZGF0YXNldC5kYXRhID0gKDxhbnlbXT4oZGF0YXNldC5kYXRhIHx8IFtdKSkubWFwKChkLCBpZHgpID0+IHtcbiAgICAgICAgICBpZiAodHlwZW9mIGQgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICByZXR1cm4gPGFueT57eDogaWR4LCB5OiBkLCByOiBkfTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIDxDaGFydFBvaW50PmQ7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGNvbnN0IGxhYmVscyA9IG5ld0RhdGEubGFiZWxzIHx8IFtdO1xuICAgIGlmIChtYXhQb2ludHNOdW0gPiAwICYmIGxhYmVscy5sZW5ndGggPCBtYXhQb2ludHNOdW0pIHtcbiAgICAgIGZvciAobGV0IGkgPSBsYWJlbHMubGVuZ3RoOyBpIDwgbWF4UG9pbnRzTnVtOyBpKyspIHtcbiAgICAgICAgbGFiZWxzLnB1c2goJycpO1xuICAgICAgfVxuICAgICAgbmV3RGF0YS5sYWJlbHMgPSBsYWJlbHM7XG4gICAgfVxuICAgIHJldHVybiBuZXdEYXRhO1xuICB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlQ2hhcnQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2NoYXJ0ID09IG51bGwpIHtcbiAgICAgIHRoaXMuX3JlYnVpbGRDaGFydCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAoPGFueT50aGlzLl9jaGFydCkub3B0aW9ucyA9IHtcbiAgICAgICAgLi4uZGVlcENvcHkoKDxhbnk+dGhpcy5fY2hhcnQpLm9wdGlvbnMpLFxuICAgICAgICAuLi5kZWVwQ29weSh0aGlzLm9wdGlvbnMgfHwge30pXG4gICAgICB9O1xuICAgICAgdGhpcy5fY2hhcnQuZGF0YSA9IHsuLi5kZWVwQ29weSh0aGlzLl9jaGFydC5kYXRhKSwgLi4uZGVlcENvcHkodGhpcy5kYXRhKX07XG4gICAgICB0aGlzLl9jaGFydC51cGRhdGUoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9yZWJ1aWxkQ2hhcnQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2NoYXJ0ICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX2NoYXJ0LmRlc3Ryb3koKTtcbiAgICAgIHRoaXMuX2NoYXJ0ID0gbnVsbDtcbiAgICB9XG4gICAgaWYgKHRoaXMuX2NoYXJ0Q2FudmFzRWxlbWVudCAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVDaGlsZCh0aGlzLl9lbC5uYXRpdmVFbGVtZW50LCB0aGlzLl9jaGFydENhbnZhc0VsZW1lbnQpO1xuICAgICAgdGhpcy5fY2hhcnRDYW52YXNFbGVtZW50ID0gbnVsbDtcbiAgICB9XG4gICAgaWYgKHRoaXMuZGF0YSAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9jaGFydENhbnZhc0VsZW1lbnQgPSB0aGlzLl9yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX2NoYXJ0Q2FudmFzRWxlbWVudCwgJ3dpZHRoJywgJ2luaGVyaXQnKTtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX2NoYXJ0Q2FudmFzRWxlbWVudCwgJ2hlaWdodCcsICdpbmhlcml0Jyk7XG4gICAgICB0aGlzLl9yZW5kZXJlci5hcHBlbmRDaGlsZCh0aGlzLl9lbC5uYXRpdmVFbGVtZW50LCB0aGlzLl9jaGFydENhbnZhc0VsZW1lbnQpO1xuICAgICAgY29uc3QgY3R4ID0gdGhpcy5fY2hhcnRDYW52YXNFbGVtZW50LmdldENvbnRleHQoJzJkJyk7XG4gICAgICB0aGlzLl9jaGFydCA9IG5ldyBjaGFydENsYXNzKGN0eCwge1xuICAgICAgICB0eXBlOiB0aGlzLmNoYXJ0VHlwZSxcbiAgICAgICAgZGF0YTogdGhpcy5fZml4RGF0YSh0aGlzLmNoYXJ0VHlwZSwgdGhpcy5kYXRhKSxcbiAgICAgICAgb3B0aW9uczogdGhpcy5fZml4Q2hhcnRPcHRpb25zKHRoaXMub3B0aW9ucylcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2ZpeENoYXJ0T3B0aW9ucyhvcHRpb25zOiBDaGFydE9wdGlvbnMpOiBDaGFydE9wdGlvbnMge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIGlmIChvcHRpb25zLmxlZ2VuZENhbGxiYWNrKSB7XG4gICAgICBjb25zdCBsZWdlbmRDYWxsYmFjayA9ICh0eXBlb2Ygb3B0aW9ucy5sZWdlbmRDYWxsYmFjayA9PT0gJ3N0cmluZydcbiAgICAgICAgPyBuZXcgRnVuY3Rpb24ob3B0aW9ucy5sZWdlbmRDYWxsYmFjaylcbiAgICAgICAgOiBvcHRpb25zLmxlZ2VuZENhbGxiYWNrKSBhcyAoY2hhcnQ6IENoYXJ0KSA9PiBzdHJpbmc7XG4gICAgICBvcHRpb25zLmxlZ2VuZENhbGxiYWNrID0gbGVnZW5kQ2FsbGJhY2s7XG4gICAgfVxuICAgIGlmIChvcHRpb25zLm9uSG92ZXIpIHtcbiAgICAgIGNvbnN0IG9uSG92ZXIgPSAodHlwZW9mIG9wdGlvbnMub25Ib3ZlciA9PT0gJ3N0cmluZydcbiAgICAgICAgPyBuZXcgRnVuY3Rpb24ob3B0aW9ucy5vbkhvdmVyKVxuICAgICAgICA6IG9wdGlvbnMub25Ib3ZlcikgYXMgKFxuICAgICAgICAgIHRoaXM6IENoYXJ0LCBldmVudDogTW91c2VFdmVudCwgYWN0aXZlRWxlbWVudHM6IHt9W10pID0+IGFueTtcbiAgICAgIG9wdGlvbnMub25Ib3ZlciA9IG9uSG92ZXI7XG4gICAgfVxuICAgIGlmIChvcHRpb25zLm9uQ2xpY2spIHtcbiAgICAgIGNvbnN0IG9uQ2xpY2sgPSAodHlwZW9mIG9wdGlvbnMub25DbGljayA9PT0gJ3N0cmluZydcbiAgICAgICAgPyBuZXcgRnVuY3Rpb24ob3B0aW9ucy5vbkNsaWNrKVxuICAgICAgICA6IG9wdGlvbnMub25DbGljaykgYXMgKGV2ZW50PzogTW91c2VFdmVudCwgYWN0aXZlRWxlbWVudHM/OiB7fVtdKSA9PlxuICAgICAgICBhbnk7XG4gICAgICBvcHRpb25zLm9uQ2xpY2sgPSBvbkNsaWNrO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy5vblJlc2l6ZSkge1xuICAgICAgY29uc3Qgb25SZXNpemUgPSAodHlwZW9mIG9wdGlvbnMub25SZXNpemUgPT09ICdzdHJpbmcnXG4gICAgICAgID8gbmV3IEZ1bmN0aW9uKG9wdGlvbnMub25SZXNpemUpXG4gICAgICAgIDogb3B0aW9ucy5vblJlc2l6ZSkgYXMgKHRoaXM6IENoYXJ0LCBuZXdTaXplOiBDaGFydFNpemUpID0+IHZvaWQ7XG4gICAgICBvcHRpb25zLm9uUmVzaXplID0gb25SZXNpemU7XG4gICAgfVxuICAgIGlmIChvcHRpb25zLmxlZ2VuZCkge1xuICAgICAgY29uc3QgbGVnZW5kID0gb3B0aW9ucy5sZWdlbmQ7XG4gICAgICBpZiAobGVnZW5kLm9uQ2xpY2spIHtcbiAgICAgICAgY29uc3Qgb25DbGljayA9ICh0eXBlb2YgbGVnZW5kLm9uQ2xpY2sgPT09ICdzdHJpbmcnXG4gICAgICAgICAgPyBuZXcgRnVuY3Rpb24obGVnZW5kLm9uQ2xpY2spXG4gICAgICAgICAgOiBsZWdlbmQub25DbGljaykgYXMgKGV2ZW50OiBNb3VzZUV2ZW50LCBsZWdlbmRJdGVtOiBDaGFydExlZ2VuZExhYmVsSXRlbSkgPT4gdm9pZDtcbiAgICAgICAgbGVnZW5kLm9uQ2xpY2sgPSBvbkNsaWNrO1xuICAgICAgfVxuICAgICAgaWYgKGxlZ2VuZC5vbkhvdmVyKSB7XG4gICAgICAgIGNvbnN0IG9uSG92ZXIgPSAodHlwZW9mIGxlZ2VuZC5vbkhvdmVyID09PSAnc3RyaW5nJ1xuICAgICAgICAgID8gbmV3IEZ1bmN0aW9uKGxlZ2VuZC5vbkhvdmVyKVxuICAgICAgICAgIDogbGVnZW5kLm9uSG92ZXIpIGFzIChldmVudDogTW91c2VFdmVudCwgbGVnZW5kSXRlbTogQ2hhcnRMZWdlbmRMYWJlbEl0ZW0pID0+IHZvaWQ7XG4gICAgICAgIGxlZ2VuZC5vbkhvdmVyID0gb25Ib3ZlcjtcbiAgICAgIH1cbiAgICAgIGlmIChsZWdlbmQub25MZWF2ZSkge1xuICAgICAgICBjb25zdCBvbkxlYXZlID0gKHR5cGVvZiBsZWdlbmQub25MZWF2ZSA9PT0gJ3N0cmluZydcbiAgICAgICAgICA/IG5ldyBGdW5jdGlvbihsZWdlbmQub25MZWF2ZSlcbiAgICAgICAgICA6IGxlZ2VuZC5vbkxlYXZlKSBhcyAoZXZlbnQ6IE1vdXNlRXZlbnQsIGxlZ2VuZEl0ZW06IENoYXJ0TGVnZW5kTGFiZWxJdGVtKSA9PiB2b2lkO1xuICAgICAgICBsZWdlbmQub25MZWF2ZSA9IG9uTGVhdmU7XG4gICAgICB9XG4gICAgICBpZiAobGVnZW5kLmxhYmVscykge1xuICAgICAgICBjb25zdCBsYWJlbHMgPSBsZWdlbmQubGFiZWxzO1xuICAgICAgICBpZiAobGFiZWxzLmdlbmVyYXRlTGFiZWxzKSB7XG4gICAgICAgICAgY29uc3QgZ2VuZXJhdGVMYWJlbHMgPSAodHlwZW9mIGxhYmVscy5nZW5lcmF0ZUxhYmVscyA9PT0gJ3N0cmluZydcbiAgICAgICAgICAgID8gbmV3IEZ1bmN0aW9uKGxhYmVscy5nZW5lcmF0ZUxhYmVscylcbiAgICAgICAgICAgIDogbGFiZWxzLmdlbmVyYXRlTGFiZWxzKSBhcyAoY2hhcnQ6IENoYXJ0KSA9PlxuICAgICAgICAgICAgQ2hhcnRMZWdlbmRMYWJlbEl0ZW1bXTtcbiAgICAgICAgICBsYWJlbHMuZ2VuZXJhdGVMYWJlbHMgPSBnZW5lcmF0ZUxhYmVscztcbiAgICAgICAgfVxuICAgICAgICBpZiAobGFiZWxzLmZpbHRlcikge1xuICAgICAgICAgIGNvbnN0IGZpbHRlciA9ICh0eXBlb2YgbGFiZWxzLmZpbHRlciA9PT0gJ3N0cmluZydcbiAgICAgICAgICAgID8gbmV3IEZ1bmN0aW9uKGxhYmVscy5maWx0ZXIpXG4gICAgICAgICAgICA6IGxhYmVscy5maWx0ZXIpIGFzIChsZWdlbmRJdGVtOiBDaGFydExlZ2VuZExhYmVsSXRlbSwgZGF0YTogQ2hhcnREYXRhKSA9PiBhbnk7XG4gICAgICAgICAgbGFiZWxzLmZpbHRlciA9IGZpbHRlcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAob3B0aW9ucy50b29sdGlwcykge1xuICAgICAgY29uc3QgdG9vbHRpcHMgPSBvcHRpb25zLnRvb2x0aXBzO1xuICAgICAgaWYgKHRvb2x0aXBzLmN1c3RvbSkge1xuICAgICAgICBjb25zdCBjdXN0b20gPSAodHlwZW9mIHRvb2x0aXBzLmN1c3RvbSA9PT0gJ3N0cmluZydcbiAgICAgICAgICA/IG5ldyBGdW5jdGlvbih0b29sdGlwcy5jdXN0b20pXG4gICAgICAgICAgOiB0b29sdGlwcy5jdXN0b20pIGFzICh0b29sdGlwTW9kZWw6IENoYXJ0VG9vbHRpcE1vZGVsKSA9PiB2b2lkO1xuICAgICAgICB0b29sdGlwcy5jdXN0b20gPSBjdXN0b207XG4gICAgICB9XG4gICAgICBpZiAodG9vbHRpcHMuY2FsbGJhY2tzKSB7XG4gICAgICAgIGNvbnN0IGNhbGxiYWNrcyA9IHRvb2x0aXBzLmNhbGxiYWNrcztcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gY2FsbGJhY2tzKSB7XG4gICAgICAgICAgY29uc3QgY2FsbGJhY2sgPSAoY2FsbGJhY2tzIGFzIGFueSlba2V5XSBhc1xuICAgICAgICAgICAgKGl0ZW06IENoYXJ0VG9vbHRpcEl0ZW1bXSwgZGF0YTogQ2hhcnREYXRhKSA9PiBzdHJpbmcgfCBzdHJpbmdbXTtcbiAgICAgICAgICAoY2FsbGJhY2tzIGFzIGFueSlba2V5XSA9IHR5cGVvZiBjYWxsYmFjayA9PT0gJ3N0cmluZydcbiAgICAgICAgICAgID8gbmV3IEZ1bmN0aW9uKGNhbGxiYWNrKVxuICAgICAgICAgICAgOiBjYWxsYmFjaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHRvb2x0aXBzLmZpbHRlcikge1xuICAgICAgICBjb25zdCBmaWx0ZXIgPSAodHlwZW9mIHRvb2x0aXBzLmZpbHRlciA9PT0gJ3N0cmluZydcbiAgICAgICAgICA/IG5ldyBGdW5jdGlvbih0b29sdGlwcy5maWx0ZXIpXG4gICAgICAgICAgOiB0b29sdGlwcy5maWx0ZXIpIGFzIChpdGVtOiBDaGFydFRvb2x0aXBJdGVtLCBkYXRhOiBDaGFydERhdGEpID0+XG4gICAgICAgICAgICBib29sZWFuO1xuICAgICAgICB0b29sdGlwcy5maWx0ZXIgPSBmaWx0ZXI7XG4gICAgICB9XG4gICAgICBpZiAodG9vbHRpcHMuaXRlbVNvcnQpIHtcbiAgICAgICAgY29uc3QgaXRlbVNvcnQgPSAodHlwZW9mIHRvb2x0aXBzLml0ZW1Tb3J0ID09PSAnc3RyaW5nJ1xuICAgICAgICAgID8gbmV3IEZ1bmN0aW9uKHRvb2x0aXBzLml0ZW1Tb3J0KVxuICAgICAgICAgIDogdG9vbHRpcHMuaXRlbVNvcnQpIGFzIChcbiAgICAgICAgICAgIGl0ZW1BOiBDaGFydFRvb2x0aXBJdGVtLCBpdGVtQjogQ2hhcnRUb29sdGlwSXRlbSwgZGF0YT86IENoYXJ0RGF0YSkgPT4gbnVtYmVyO1xuICAgICAgICB0b29sdGlwcy5pdGVtU29ydCA9IGl0ZW1Tb3J0O1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAob3B0aW9ucy5ob3Zlcikge1xuICAgICAgY29uc3QgaG92ZXIgPSBvcHRpb25zLmhvdmVyO1xuICAgICAgaWYgKGhvdmVyLm9uSG92ZXIpIHtcbiAgICAgICAgY29uc3Qgb25Ib3ZlciA9ICh0eXBlb2YgaG92ZXIub25Ib3ZlciA9PT0gJ3N0cmluZydcbiAgICAgICAgICA/IG5ldyBGdW5jdGlvbihob3Zlci5vbkhvdmVyKVxuICAgICAgICAgIDogaG92ZXIub25Ib3ZlcikgYXMgKFxuICAgICAgICAgICAgdGhpczogQ2hhcnQsIGV2ZW50OiBNb3VzZUV2ZW50LCBhY3RpdmVFbGVtZW50czoge31bXSkgPT4gYW55O1xuICAgICAgICBob3Zlci5vbkhvdmVyID0gb25Ib3ZlcjtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKG9wdGlvbnMuYW5pbWF0aW9uKSB7XG4gICAgICBjb25zdCBhbmltYXRpb24gPSBvcHRpb25zLmFuaW1hdGlvbjtcbiAgICAgIGlmIChhbmltYXRpb24ub25Qcm9ncmVzcykge1xuICAgICAgICBjb25zdCBvblByb2dyZXNzID0gKHR5cGVvZiBhbmltYXRpb24ub25Qcm9ncmVzcyA9PT0gJ3N0cmluZydcbiAgICAgICAgICA/IG5ldyBGdW5jdGlvbihhbmltYXRpb24ub25Qcm9ncmVzcylcbiAgICAgICAgICA6IGFuaW1hdGlvbi5vblByb2dyZXNzKSBhcyAoY2hhcnQ6IGFueSkgPT4gdm9pZDtcbiAgICAgICAgYW5pbWF0aW9uLm9uUHJvZ3Jlc3MgPSBvblByb2dyZXNzO1xuICAgICAgfVxuICAgICAgaWYgKGFuaW1hdGlvbi5vbkNvbXBsZXRlKSB7XG4gICAgICAgIGNvbnN0IG9uQ29tcGxldGUgPSAodHlwZW9mIGFuaW1hdGlvbi5vbkNvbXBsZXRlID09PSAnc3RyaW5nJ1xuICAgICAgICAgID8gbmV3IEZ1bmN0aW9uKGFuaW1hdGlvbi5vbkNvbXBsZXRlKVxuICAgICAgICAgIDogYW5pbWF0aW9uLm9uQ29tcGxldGUpIGFzIChjaGFydDogYW55KSA9PiB2b2lkO1xuICAgICAgICBhbmltYXRpb24ub25Db21wbGV0ZSA9IG9uQ29tcGxldGU7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChvcHRpb25zLnNjYWxlcyA9PSBudWxsKSB7XG4gICAgICBvcHRpb25zLnNjYWxlcyA9IHt4QXhlczogW10sIHlBeGVzOiBbXX07XG4gICAgfVxuICAgIGlmIChvcHRpb25zLnNjYWxlcy54QXhlcyA9PSBudWxsKSB7XG4gICAgICBvcHRpb25zLnNjYWxlcy54QXhlcyA9IFtdO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy5zY2FsZXMueUF4ZXMgPT0gbnVsbCkge1xuICAgICAgb3B0aW9ucy5zY2FsZXMueUF4ZXMgPSBbXTtcbiAgICB9XG4gICAgb3B0aW9ucy5zY2FsZXMueUF4ZXMuZm9yRWFjaCgoeUF4ZSkgPT4ge1xuICAgICAgaWYgKHlBeGUudGlja3MgJiYgeUF4ZS50aWNrcy5jYWxsYmFjaykge1xuICAgICAgICBjb25zdCBjYWxsYmFjayA9ICh0eXBlb2YgeUF4ZS50aWNrcy5jYWxsYmFjayA9PT0gJ3N0cmluZydcbiAgICAgICAgICA/IG5ldyBGdW5jdGlvbih5QXhlLnRpY2tzLmNhbGxiYWNrKVxuICAgICAgICAgIDogeUF4ZS50aWNrcy5jYWxsYmFjaykgYXMgKHZhbHVlOiBhbnksIGluZGV4OiBhbnksIHZhbHVlczogYW55KSA9PlxuICAgICAgICAgIHN0cmluZyB8IG51bWJlcjtcbiAgICAgICAgeUF4ZS50aWNrcy5jYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgICAgfVxuICAgIH0pO1xuICAgIG9wdGlvbnMuc2NhbGVzLnhBeGVzLmZvckVhY2goKHhBeGUpID0+IHtcbiAgICAgIGlmICh4QXhlLnRpY2tzICYmIHhBeGUudGlja3MuY2FsbGJhY2spIHtcbiAgICAgICAgY29uc3QgY2FsbGJhY2sgPSAodHlwZW9mIHhBeGUudGlja3MuY2FsbGJhY2sgPT09ICdzdHJpbmcnXG4gICAgICAgICAgPyBuZXcgRnVuY3Rpb24oeEF4ZS50aWNrcy5jYWxsYmFjaylcbiAgICAgICAgICA6IHhBeGUudGlja3MuY2FsbGJhY2spIGFzICh2YWx1ZTogYW55LCBpbmRleDogYW55LCB2YWx1ZXM6IGFueSkgPT5cbiAgICAgICAgICBzdHJpbmcgfCBudW1iZXI7XG4gICAgICAgIHhBeGUudGlja3MuY2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAodGhpcy5jaGFydFR5cGUgPT0gJ3BpZScpIHtcbiAgICAgIGxldCBuZXdPcHRpb25zID0gPGFueT5vcHRpb25zO1xuICAgICAgbmV3T3B0aW9ucy5waWVjZUxhYmVsID0ge1xuICAgICAgICByZW5kZXI6IGZ1bmN0aW9uKGFyZ3M6IGFueSkge1xuICAgICAgICAgIGlmIChhcmdzLmxhYmVsKSB7XG4gICAgICAgICAgICByZXR1cm4gYXJncy5sYWJlbCArICc6JyArIGFyZ3MudmFsdWU7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBhcmdzLnZhbHVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgcG9zaXRpb246ICdvdXRzaWRlJ1xuICAgICAgfTtcbiAgICAgIHJldHVybiBuZXdPcHRpb25zO1xuICAgIH1cbiAgICByZXR1cm4gb3B0aW9ucztcbiAgfVxufVxuIl19