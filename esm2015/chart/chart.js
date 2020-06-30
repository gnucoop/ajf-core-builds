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
import { Chart, } from 'chart.js';
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
                this._chart = new Chart(ctx, {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9jaGFydC9jaGFydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBRUwsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsS0FBSyxFQUVMLFNBQVMsRUFFVCxpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQVFMLEtBQUssR0FDTixNQUFNLFVBQVUsQ0FBQztBQUVsQixPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFJekM7SUFBQSxNQU9hLGlCQUFpQjtRQVM1QixZQUFvQixHQUFlLEVBQVUsU0FBb0I7WUFBN0MsUUFBRyxHQUFILEdBQUcsQ0FBWTtZQUFVLGNBQVMsR0FBVCxTQUFTLENBQVc7WUFGekQsMEJBQXFCLEdBQXdCLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBRVAsQ0FBQztRQUVyRSxlQUFlO1lBQ2IsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3ZCLENBQUM7UUFFRCxXQUFXLENBQUMsT0FBc0I7WUFDaEMsSUFBSSxXQUFXLElBQUksT0FBTyxFQUFFO2dCQUMxQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7YUFDdEI7aUJBQU0sSUFBSSxTQUFTLElBQUksT0FBTyxJQUFJLE1BQU0sSUFBSSxPQUFPLEVBQUU7Z0JBQ3BELElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQzthQUNyQjtRQUNILENBQUM7UUFFTyxRQUFRLENBQUMsU0FBNEIsRUFBRSxJQUFlO1lBQzVELE1BQU0sT0FBTyxHQUFjLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMxQyxJQUFJLFlBQVksR0FBRyxDQUFDLENBQUM7WUFDckIsQ0FBQyxPQUFPLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FB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dUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7O2lCQUN0Qzs7O2dCQTdCQyxVQUFVO2dCQUdWLFNBQVM7Ozt1QkE0QlIsS0FBSzswQkFDTCxLQUFLOzRCQUNMLEtBQUs7O0lBMFBSLHdCQUFDO0tBQUE7U0E3UFksaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBSZW5kZXJlcjIsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge1xuICBDaGFydERhdGEsXG4gIENoYXJ0UG9pbnQsXG4gIENoYXJ0TGVnZW5kTGFiZWxJdGVtLFxuICBDaGFydE9wdGlvbnMsXG4gIENoYXJ0U2l6ZSxcbiAgQ2hhcnRUb29sdGlwTW9kZWwsXG4gIENoYXJ0VG9vbHRpcEl0ZW0sXG4gIENoYXJ0LFxufSBmcm9tICdjaGFydC5qcyc7XG5cbmltcG9ydCB7ZGVlcENvcHl9IGZyb20gJ0BhamYvY29yZS91dGlscyc7XG5pbXBvcnQge0V4dGVuZGVkQ2hhcnRUeXBlfSBmcm9tICcuL2V4dGVuZGVkLWNoYXJ0LXR5cGUnO1xuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FqZi1jaGFydCcsXG4gIHRlbXBsYXRlVXJsOiAnY2hhcnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWydjaGFydC5jc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgQWpmQ2hhcnRDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkNoYW5nZXMge1xuICBASW5wdXQoKSBkYXRhOiBDaGFydERhdGE7XG4gIEBJbnB1dCgpIG9wdGlvbnM6IENoYXJ0T3B0aW9ucztcbiAgQElucHV0KCkgY2hhcnRUeXBlOiBFeHRlbmRlZENoYXJ0VHlwZTtcblxuICBwcml2YXRlIF9jaGFydDogQ2hhcnR8bnVsbDtcbiAgcHJpdmF0ZSBfY2hhcnRDYW52YXNFbGVtZW50OiBhbnk7XG4gIHByaXZhdGUgX2NoYXJ0VHlwZXNOZWVkUG9pbnRzOiBFeHRlbmRlZENoYXJ0VHlwZVtdID0gWydzY2F0dGVyJywgJ2J1YmJsZSddO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2VsOiBFbGVtZW50UmVmLCBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyKSB7fVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9yZWJ1aWxkQ2hhcnQoKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBpZiAoJ2NoYXJ0VHlwZScgaW4gY2hhbmdlcykge1xuICAgICAgdGhpcy5fcmVidWlsZENoYXJ0KCk7XG4gICAgfSBlbHNlIGlmICgnb3B0aW9ucycgaW4gY2hhbmdlcyB8fCAnZGF0YScgaW4gY2hhbmdlcykge1xuICAgICAgdGhpcy5fdXBkYXRlQ2hhcnQoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9maXhEYXRhKGNoYXJ0VHlwZTogRXh0ZW5kZWRDaGFydFR5cGUsIGRhdGE6IENoYXJ0RGF0YSk6IENoYXJ0RGF0YSB7XG4gICAgY29uc3QgbmV3RGF0YTogQ2hhcnREYXRhID0gZGVlcENvcHkoZGF0YSk7XG4gICAgbGV0IG1heFBvaW50c051bSA9IDA7XG4gICAgKG5ld0RhdGEuZGF0YXNldHMgfHwgW10pLmZvckVhY2goKGRhdGFzZXQpID0+IHtcbiAgICAgIGlmIChkYXRhc2V0LmxhYmVsID09IG51bGwpIHtcbiAgICAgICAgZGF0YXNldC5sYWJlbCA9ICcnO1xuICAgICAgfVxuICAgICAgbWF4UG9pbnRzTnVtID0gTWF0aC5tYXgobWF4UG9pbnRzTnVtLCAoZGF0YXNldC5kYXRhIHx8IFtdKS5sZW5ndGgpO1xuICAgICAgY29uc3QgZGF0YXNldFR5cGUgPSBkYXRhc2V0LnR5cGUgIT0gbnVsbCA/IDxFeHRlbmRlZENoYXJ0VHlwZT5kYXRhc2V0LnR5cGUgOiBjaGFydFR5cGU7XG4gICAgICBpZiAodGhpcy5fY2hhcnRUeXBlc05lZWRQb2ludHMuaW5kZXhPZihkYXRhc2V0VHlwZSkgPiAtMSkge1xuICAgICAgICBkYXRhc2V0LmRhdGEgPSAoPGFueVtdPihkYXRhc2V0LmRhdGEgfHwgW10pKS5tYXAoKGQsIGlkeCkgPT4ge1xuICAgICAgICAgIGlmICh0eXBlb2YgZCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHJldHVybiA8YW55Pnt4OiBpZHgsIHk6IGQsIHI6IGR9O1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gPENoYXJ0UG9pbnQ+ZDtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgY29uc3QgbGFiZWxzID0gbmV3RGF0YS5sYWJlbHMgfHwgW107XG4gICAgaWYgKG1heFBvaW50c051bSA+IDAgJiYgbGFiZWxzLmxlbmd0aCA8IG1heFBvaW50c051bSkge1xuICAgICAgZm9yIChsZXQgaSA9IGxhYmVscy5sZW5ndGg7IGkgPCBtYXhQb2ludHNOdW07IGkrKykge1xuICAgICAgICBsYWJlbHMucHVzaCgnJyk7XG4gICAgICB9XG4gICAgICBuZXdEYXRhLmxhYmVscyA9IGxhYmVscztcbiAgICB9XG4gICAgcmV0dXJuIG5ld0RhdGE7XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVDaGFydCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fY2hhcnQgPT0gbnVsbCkge1xuICAgICAgdGhpcy5fcmVidWlsZENoYXJ0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICg8YW55PnRoaXMuX2NoYXJ0KS5vcHRpb25zID0ge1xuICAgICAgICAuLi5kZWVwQ29weSgoPGFueT50aGlzLl9jaGFydCkub3B0aW9ucyksXG4gICAgICAgIC4uLmRlZXBDb3B5KHRoaXMub3B0aW9ucyB8fCB7fSlcbiAgICAgIH07XG4gICAgICB0aGlzLl9jaGFydC5kYXRhID0gey4uLmRlZXBDb3B5KHRoaXMuX2NoYXJ0LmRhdGEpLCAuLi5kZWVwQ29weSh0aGlzLmRhdGEpfTtcbiAgICAgIHRoaXMuX2NoYXJ0LnVwZGF0ZSgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3JlYnVpbGRDaGFydCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fY2hhcnQgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fY2hhcnQuZGVzdHJveSgpO1xuICAgICAgdGhpcy5fY2hhcnQgPSBudWxsO1xuICAgIH1cbiAgICBpZiAodGhpcy5fY2hhcnRDYW52YXNFbGVtZW50ICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZUNoaWxkKHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQsIHRoaXMuX2NoYXJ0Q2FudmFzRWxlbWVudCk7XG4gICAgICB0aGlzLl9jaGFydENhbnZhc0VsZW1lbnQgPSBudWxsO1xuICAgIH1cbiAgICBpZiAodGhpcy5kYXRhICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX2NoYXJ0Q2FudmFzRWxlbWVudCA9IHRoaXMuX3JlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fY2hhcnRDYW52YXNFbGVtZW50LCAnd2lkdGgnLCAnaW5oZXJpdCcpO1xuICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fY2hhcnRDYW52YXNFbGVtZW50LCAnaGVpZ2h0JywgJ2luaGVyaXQnKTtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLmFwcGVuZENoaWxkKHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQsIHRoaXMuX2NoYXJ0Q2FudmFzRWxlbWVudCk7XG4gICAgICBjb25zdCBjdHggPSB0aGlzLl9jaGFydENhbnZhc0VsZW1lbnQuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgIHRoaXMuX2NoYXJ0ID0gbmV3IENoYXJ0KGN0eCwge1xuICAgICAgICB0eXBlOiB0aGlzLmNoYXJ0VHlwZSxcbiAgICAgICAgZGF0YTogdGhpcy5fZml4RGF0YSh0aGlzLmNoYXJ0VHlwZSwgdGhpcy5kYXRhKSxcbiAgICAgICAgb3B0aW9uczogdGhpcy5fZml4Q2hhcnRPcHRpb25zKHRoaXMub3B0aW9ucylcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2ZpeENoYXJ0T3B0aW9ucyhvcHRpb25zOiBDaGFydE9wdGlvbnMpOiBDaGFydE9wdGlvbnMge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIGlmIChvcHRpb25zLmxlZ2VuZENhbGxiYWNrKSB7XG4gICAgICBjb25zdCBsZWdlbmRDYWxsYmFjayA9ICh0eXBlb2Ygb3B0aW9ucy5sZWdlbmRDYWxsYmFjayA9PT0gJ3N0cmluZydcbiAgICAgICAgPyBuZXcgRnVuY3Rpb24ob3B0aW9ucy5sZWdlbmRDYWxsYmFjaylcbiAgICAgICAgOiBvcHRpb25zLmxlZ2VuZENhbGxiYWNrKSBhcyAoY2hhcnQ6IENoYXJ0KSA9PiBzdHJpbmc7XG4gICAgICBvcHRpb25zLmxlZ2VuZENhbGxiYWNrID0gbGVnZW5kQ2FsbGJhY2s7XG4gICAgfVxuICAgIGlmIChvcHRpb25zLm9uSG92ZXIpIHtcbiAgICAgIGNvbnN0IG9uSG92ZXIgPSAodHlwZW9mIG9wdGlvbnMub25Ib3ZlciA9PT0gJ3N0cmluZydcbiAgICAgICAgPyBuZXcgRnVuY3Rpb24ob3B0aW9ucy5vbkhvdmVyKVxuICAgICAgICA6IG9wdGlvbnMub25Ib3ZlcikgYXMgKFxuICAgICAgICAgIHRoaXM6IENoYXJ0LCBldmVudDogTW91c2VFdmVudCwgYWN0aXZlRWxlbWVudHM6IHt9W10pID0+IGFueTtcbiAgICAgIG9wdGlvbnMub25Ib3ZlciA9IG9uSG92ZXI7XG4gICAgfVxuICAgIGlmIChvcHRpb25zLm9uQ2xpY2spIHtcbiAgICAgIGNvbnN0IG9uQ2xpY2sgPSAodHlwZW9mIG9wdGlvbnMub25DbGljayA9PT0gJ3N0cmluZydcbiAgICAgICAgPyBuZXcgRnVuY3Rpb24ob3B0aW9ucy5vbkNsaWNrKVxuICAgICAgICA6IG9wdGlvbnMub25DbGljaykgYXMgKGV2ZW50PzogTW91c2VFdmVudCwgYWN0aXZlRWxlbWVudHM/OiB7fVtdKSA9PlxuICAgICAgICBhbnk7XG4gICAgICBvcHRpb25zLm9uQ2xpY2sgPSBvbkNsaWNrO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy5vblJlc2l6ZSkge1xuICAgICAgY29uc3Qgb25SZXNpemUgPSAodHlwZW9mIG9wdGlvbnMub25SZXNpemUgPT09ICdzdHJpbmcnXG4gICAgICAgID8gbmV3IEZ1bmN0aW9uKG9wdGlvbnMub25SZXNpemUpXG4gICAgICAgIDogb3B0aW9ucy5vblJlc2l6ZSkgYXMgKHRoaXM6IENoYXJ0LCBuZXdTaXplOiBDaGFydFNpemUpID0+IHZvaWQ7XG4gICAgICBvcHRpb25zLm9uUmVzaXplID0gb25SZXNpemU7XG4gICAgfVxuICAgIGlmIChvcHRpb25zLmxlZ2VuZCkge1xuICAgICAgY29uc3QgbGVnZW5kID0gb3B0aW9ucy5sZWdlbmQ7XG4gICAgICBpZiAobGVnZW5kLm9uQ2xpY2spIHtcbiAgICAgICAgY29uc3Qgb25DbGljayA9ICh0eXBlb2YgbGVnZW5kLm9uQ2xpY2sgPT09ICdzdHJpbmcnXG4gICAgICAgICAgPyBuZXcgRnVuY3Rpb24obGVnZW5kLm9uQ2xpY2spXG4gICAgICAgICAgOiBsZWdlbmQub25DbGljaykgYXMgKGV2ZW50OiBNb3VzZUV2ZW50LCBsZWdlbmRJdGVtOiBDaGFydExlZ2VuZExhYmVsSXRlbSkgPT4gdm9pZDtcbiAgICAgICAgbGVnZW5kLm9uQ2xpY2sgPSBvbkNsaWNrO1xuICAgICAgfVxuICAgICAgaWYgKGxlZ2VuZC5vbkhvdmVyKSB7XG4gICAgICAgIGNvbnN0IG9uSG92ZXIgPSAodHlwZW9mIGxlZ2VuZC5vbkhvdmVyID09PSAnc3RyaW5nJ1xuICAgICAgICAgID8gbmV3IEZ1bmN0aW9uKGxlZ2VuZC5vbkhvdmVyKVxuICAgICAgICAgIDogbGVnZW5kLm9uSG92ZXIpIGFzIChldmVudDogTW91c2VFdmVudCwgbGVnZW5kSXRlbTogQ2hhcnRMZWdlbmRMYWJlbEl0ZW0pID0+IHZvaWQ7XG4gICAgICAgIGxlZ2VuZC5vbkhvdmVyID0gb25Ib3ZlcjtcbiAgICAgIH1cbiAgICAgIGlmIChsZWdlbmQub25MZWF2ZSkge1xuICAgICAgICBjb25zdCBvbkxlYXZlID0gKHR5cGVvZiBsZWdlbmQub25MZWF2ZSA9PT0gJ3N0cmluZydcbiAgICAgICAgICA/IG5ldyBGdW5jdGlvbihsZWdlbmQub25MZWF2ZSlcbiAgICAgICAgICA6IGxlZ2VuZC5vbkxlYXZlKSBhcyAoZXZlbnQ6IE1vdXNlRXZlbnQsIGxlZ2VuZEl0ZW06IENoYXJ0TGVnZW5kTGFiZWxJdGVtKSA9PiB2b2lkO1xuICAgICAgICBsZWdlbmQub25MZWF2ZSA9IG9uTGVhdmU7XG4gICAgICB9XG4gICAgICBpZiAobGVnZW5kLmxhYmVscykge1xuICAgICAgICBjb25zdCBsYWJlbHMgPSBsZWdlbmQubGFiZWxzO1xuICAgICAgICBpZiAobGFiZWxzLmdlbmVyYXRlTGFiZWxzKSB7XG4gICAgICAgICAgY29uc3QgZ2VuZXJhdGVMYWJlbHMgPSAodHlwZW9mIGxhYmVscy5nZW5lcmF0ZUxhYmVscyA9PT0gJ3N0cmluZydcbiAgICAgICAgICAgID8gbmV3IEZ1bmN0aW9uKGxhYmVscy5nZW5lcmF0ZUxhYmVscylcbiAgICAgICAgICAgIDogbGFiZWxzLmdlbmVyYXRlTGFiZWxzKSBhcyAoY2hhcnQ6IENoYXJ0KSA9PlxuICAgICAgICAgICAgQ2hhcnRMZWdlbmRMYWJlbEl0ZW1bXTtcbiAgICAgICAgICBsYWJlbHMuZ2VuZXJhdGVMYWJlbHMgPSBnZW5lcmF0ZUxhYmVscztcbiAgICAgICAgfVxuICAgICAgICBpZiAobGFiZWxzLmZpbHRlcikge1xuICAgICAgICAgIGNvbnN0IGZpbHRlciA9ICh0eXBlb2YgbGFiZWxzLmZpbHRlciA9PT0gJ3N0cmluZydcbiAgICAgICAgICAgID8gbmV3IEZ1bmN0aW9uKGxhYmVscy5maWx0ZXIpXG4gICAgICAgICAgICA6IGxhYmVscy5maWx0ZXIpIGFzIChsZWdlbmRJdGVtOiBDaGFydExlZ2VuZExhYmVsSXRlbSwgZGF0YTogQ2hhcnREYXRhKSA9PiBhbnk7XG4gICAgICAgICAgbGFiZWxzLmZpbHRlciA9IGZpbHRlcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAob3B0aW9ucy50b29sdGlwcykge1xuICAgICAgY29uc3QgdG9vbHRpcHMgPSBvcHRpb25zLnRvb2x0aXBzO1xuICAgICAgaWYgKHRvb2x0aXBzLmN1c3RvbSkge1xuICAgICAgICBjb25zdCBjdXN0b20gPSAodHlwZW9mIHRvb2x0aXBzLmN1c3RvbSA9PT0gJ3N0cmluZydcbiAgICAgICAgICA/IG5ldyBGdW5jdGlvbih0b29sdGlwcy5jdXN0b20pXG4gICAgICAgICAgOiB0b29sdGlwcy5jdXN0b20pIGFzICh0b29sdGlwTW9kZWw6IENoYXJ0VG9vbHRpcE1vZGVsKSA9PiB2b2lkO1xuICAgICAgICB0b29sdGlwcy5jdXN0b20gPSBjdXN0b207XG4gICAgICB9XG4gICAgICBpZiAodG9vbHRpcHMuY2FsbGJhY2tzKSB7XG4gICAgICAgIGNvbnN0IGNhbGxiYWNrcyA9IHRvb2x0aXBzLmNhbGxiYWNrcztcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gY2FsbGJhY2tzKSB7XG4gICAgICAgICAgY29uc3QgY2FsbGJhY2sgPSAoY2FsbGJhY2tzIGFzIGFueSlba2V5XSBhc1xuICAgICAgICAgICAgKGl0ZW06IENoYXJ0VG9vbHRpcEl0ZW1bXSwgZGF0YTogQ2hhcnREYXRhKSA9PiBzdHJpbmcgfCBzdHJpbmdbXTtcbiAgICAgICAgICAoY2FsbGJhY2tzIGFzIGFueSlba2V5XSA9IHR5cGVvZiBjYWxsYmFjayA9PT0gJ3N0cmluZydcbiAgICAgICAgICAgID8gbmV3IEZ1bmN0aW9uKGNhbGxiYWNrKVxuICAgICAgICAgICAgOiBjYWxsYmFjaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHRvb2x0aXBzLmZpbHRlcikge1xuICAgICAgICBjb25zdCBmaWx0ZXIgPSAodHlwZW9mIHRvb2x0aXBzLmZpbHRlciA9PT0gJ3N0cmluZydcbiAgICAgICAgICA/IG5ldyBGdW5jdGlvbih0b29sdGlwcy5maWx0ZXIpXG4gICAgICAgICAgOiB0b29sdGlwcy5maWx0ZXIpIGFzIChpdGVtOiBDaGFydFRvb2x0aXBJdGVtLCBkYXRhOiBDaGFydERhdGEpID0+XG4gICAgICAgICAgICBib29sZWFuO1xuICAgICAgICB0b29sdGlwcy5maWx0ZXIgPSBmaWx0ZXI7XG4gICAgICB9XG4gICAgICBpZiAodG9vbHRpcHMuaXRlbVNvcnQpIHtcbiAgICAgICAgY29uc3QgaXRlbVNvcnQgPSAodHlwZW9mIHRvb2x0aXBzLml0ZW1Tb3J0ID09PSAnc3RyaW5nJ1xuICAgICAgICAgID8gbmV3IEZ1bmN0aW9uKHRvb2x0aXBzLml0ZW1Tb3J0KVxuICAgICAgICAgIDogdG9vbHRpcHMuaXRlbVNvcnQpIGFzIChcbiAgICAgICAgICAgIGl0ZW1BOiBDaGFydFRvb2x0aXBJdGVtLCBpdGVtQjogQ2hhcnRUb29sdGlwSXRlbSwgZGF0YT86IENoYXJ0RGF0YSkgPT4gbnVtYmVyO1xuICAgICAgICB0b29sdGlwcy5pdGVtU29ydCA9IGl0ZW1Tb3J0O1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAob3B0aW9ucy5ob3Zlcikge1xuICAgICAgY29uc3QgaG92ZXIgPSBvcHRpb25zLmhvdmVyO1xuICAgICAgaWYgKGhvdmVyLm9uSG92ZXIpIHtcbiAgICAgICAgY29uc3Qgb25Ib3ZlciA9ICh0eXBlb2YgaG92ZXIub25Ib3ZlciA9PT0gJ3N0cmluZydcbiAgICAgICAgICA/IG5ldyBGdW5jdGlvbihob3Zlci5vbkhvdmVyKVxuICAgICAgICAgIDogaG92ZXIub25Ib3ZlcikgYXMgKFxuICAgICAgICAgICAgdGhpczogQ2hhcnQsIGV2ZW50OiBNb3VzZUV2ZW50LCBhY3RpdmVFbGVtZW50czoge31bXSkgPT4gYW55O1xuICAgICAgICBob3Zlci5vbkhvdmVyID0gb25Ib3ZlcjtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKG9wdGlvbnMuYW5pbWF0aW9uKSB7XG4gICAgICBjb25zdCBhbmltYXRpb24gPSBvcHRpb25zLmFuaW1hdGlvbjtcbiAgICAgIGlmIChhbmltYXRpb24ub25Qcm9ncmVzcykge1xuICAgICAgICBjb25zdCBvblByb2dyZXNzID0gKHR5cGVvZiBhbmltYXRpb24ub25Qcm9ncmVzcyA9PT0gJ3N0cmluZydcbiAgICAgICAgICA/IG5ldyBGdW5jdGlvbihhbmltYXRpb24ub25Qcm9ncmVzcylcbiAgICAgICAgICA6IGFuaW1hdGlvbi5vblByb2dyZXNzKSBhcyAoY2hhcnQ6IGFueSkgPT4gdm9pZDtcbiAgICAgICAgYW5pbWF0aW9uLm9uUHJvZ3Jlc3MgPSBvblByb2dyZXNzO1xuICAgICAgfVxuICAgICAgaWYgKGFuaW1hdGlvbi5vbkNvbXBsZXRlKSB7XG4gICAgICAgIGNvbnN0IG9uQ29tcGxldGUgPSAodHlwZW9mIGFuaW1hdGlvbi5vbkNvbXBsZXRlID09PSAnc3RyaW5nJ1xuICAgICAgICAgID8gbmV3IEZ1bmN0aW9uKGFuaW1hdGlvbi5vbkNvbXBsZXRlKVxuICAgICAgICAgIDogYW5pbWF0aW9uLm9uQ29tcGxldGUpIGFzIChjaGFydDogYW55KSA9PiB2b2lkO1xuICAgICAgICBhbmltYXRpb24ub25Db21wbGV0ZSA9IG9uQ29tcGxldGU7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChvcHRpb25zLnNjYWxlcyA9PSBudWxsKSB7XG4gICAgICBvcHRpb25zLnNjYWxlcyA9IHt4QXhlczogW10sIHlBeGVzOiBbXX07XG4gICAgfVxuICAgIGlmIChvcHRpb25zLnNjYWxlcy54QXhlcyA9PSBudWxsKSB7XG4gICAgICBvcHRpb25zLnNjYWxlcy54QXhlcyA9IFtdO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy5zY2FsZXMueUF4ZXMgPT0gbnVsbCkge1xuICAgICAgb3B0aW9ucy5zY2FsZXMueUF4ZXMgPSBbXTtcbiAgICB9XG4gICAgb3B0aW9ucy5zY2FsZXMueUF4ZXMuZm9yRWFjaCgoeUF4ZSkgPT4ge1xuICAgICAgaWYgKHlBeGUudGlja3MgJiYgeUF4ZS50aWNrcy5jYWxsYmFjaykge1xuICAgICAgICBjb25zdCBjYWxsYmFjayA9ICh0eXBlb2YgeUF4ZS50aWNrcy5jYWxsYmFjayA9PT0gJ3N0cmluZydcbiAgICAgICAgICA/IG5ldyBGdW5jdGlvbih5QXhlLnRpY2tzLmNhbGxiYWNrKVxuICAgICAgICAgIDogeUF4ZS50aWNrcy5jYWxsYmFjaykgYXMgKHZhbHVlOiBhbnksIGluZGV4OiBhbnksIHZhbHVlczogYW55KSA9PlxuICAgICAgICAgIHN0cmluZyB8IG51bWJlcjtcbiAgICAgICAgeUF4ZS50aWNrcy5jYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgICAgfVxuICAgIH0pO1xuICAgIG9wdGlvbnMuc2NhbGVzLnhBeGVzLmZvckVhY2goKHhBeGUpID0+IHtcbiAgICAgIGlmICh4QXhlLnRpY2tzICYmIHhBeGUudGlja3MuY2FsbGJhY2spIHtcbiAgICAgICAgY29uc3QgY2FsbGJhY2sgPSAodHlwZW9mIHhBeGUudGlja3MuY2FsbGJhY2sgPT09ICdzdHJpbmcnXG4gICAgICAgICAgPyBuZXcgRnVuY3Rpb24oeEF4ZS50aWNrcy5jYWxsYmFjaylcbiAgICAgICAgICA6IHhBeGUudGlja3MuY2FsbGJhY2spIGFzICh2YWx1ZTogYW55LCBpbmRleDogYW55LCB2YWx1ZXM6IGFueSkgPT5cbiAgICAgICAgICBzdHJpbmcgfCBudW1iZXI7XG4gICAgICAgIHhBeGUudGlja3MuY2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAodGhpcy5jaGFydFR5cGUgPT0gJ3BpZScpIHtcbiAgICAgIGxldCBuZXdPcHRpb25zID0gPGFueT5vcHRpb25zO1xuICAgICAgbmV3T3B0aW9ucy5waWVjZUxhYmVsID0ge1xuICAgICAgICByZW5kZXI6IGZ1bmN0aW9uKGFyZ3M6IGFueSkge1xuICAgICAgICAgIGlmIChhcmdzLmxhYmVsKSB7XG4gICAgICAgICAgICByZXR1cm4gYXJncy5sYWJlbCArICc6JyArIGFyZ3MudmFsdWU7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBhcmdzLnZhbHVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgcG9zaXRpb246ICdvdXRzaWRlJ1xuICAgICAgfTtcbiAgICAgIHJldHVybiBuZXdPcHRpb25zO1xuICAgIH1cbiAgICByZXR1cm4gb3B0aW9ucztcbiAgfVxufVxuIl19