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
import { deepCopy } from '@ajf/core/utils';
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation, } from '@angular/core';
import * as chartJs from 'chart.js';
import * as i0 from "@angular/core";
const { Chart } = (chartJs.default || chartJs);
export class AjfChartComponent {
    constructor(_el, _renderer) {
        this._el = _el;
        this._renderer = _renderer;
        this._chart = null;
        this._chartCanvasElement = null;
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
        if ('instance' in changes && this.instance != null) {
            this.instance.canvasDataUrl = () => {
                if (this._chartCanvasElement == null) {
                    return '';
                }
                return this._chartCanvasElement.toDataURL();
            };
        }
    }
    _fixData(chartType, data) {
        const newData = deepCopy(data);
        let maxPointsNum = 0;
        (newData.datasets || []).forEach(dataset => {
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
            this._chart.options = {
                ...deepCopy(this._chart.options),
                ...deepCopy(this.options || {}),
            };
            this._chart.data = {
                ...deepCopy(this._chart.data),
                ...deepCopy(this.data),
            };
            this._chart.update();
        }
    }
    _rebuildChart() {
        if (this._chart != null) {
            this._chart.destroy();
            this._chart = null;
        }
        if (this._chartCanvasElement != null) {
            this._chartCanvasElement.remove();
            this._chartCanvasElement = null;
        }
        if (this.data != null) {
            this._chartCanvasElement = this._renderer.createElement('canvas');
            const widgetExportElement = this._el.nativeElement.parentElement.parentElement;
            const height = widgetExportElement.clientHeight;
            const width = widgetExportElement.clientWidth;
            if (widgetExportElement != null) {
                if (height > 0) {
                    this._renderer.setStyle(this._el.nativeElement, 'height', `${height}px`);
                    this._renderer.setStyle(this._chartCanvasElement, 'height', `${height}px`);
                }
                if (width > 0) {
                    this._renderer.setStyle(this._chartCanvasElement, 'width', width);
                }
            }
            else {
                this._renderer.setStyle(this._chartCanvasElement, 'width', 'inherit');
                this._renderer.setStyle(this._chartCanvasElement, 'height', 'inherit');
            }
            this._renderer.appendChild(this._el.nativeElement, this._chartCanvasElement);
            if (this.chartType != null) {
                const ctx = this._chartCanvasElement.getContext('2d');
                this._chart = new Chart(ctx, {
                    type: this.chartType,
                    data: this._fixData(this.chartType, this.data),
                    options: this._fixChartOptions(this.options),
                });
            }
        }
    }
    _fixChartOptions(chartOptions) {
        const options = deepCopy(chartOptions || {}) || {};
        if (options.legendCallback) {
            const legendCallback = (typeof options.legendCallback === 'string'
                ? new Function(options.legendCallback)
                : options.legendCallback);
            options.legendCallback = legendCallback;
        }
        if (options.onHover) {
            const onHover = (typeof options.onHover === 'string' ? new Function(options.onHover) : options.onHover);
            options.onHover = onHover;
        }
        if (options.onClick) {
            const onClick = (typeof options.onClick === 'string' ? new Function(options.onClick) : options.onClick);
            options.onClick = onClick;
        }
        if (options.onResize) {
            const onResize = (typeof options.onResize === 'string' ? new Function(options.onResize) : options.onResize);
            options.onResize = onResize;
        }
        if (options.legend) {
            const legend = options.legend;
            if (legend.onClick) {
                const onClick = (typeof legend.onClick === 'string' ? new Function(legend.onClick) : legend.onClick);
                legend.onClick = onClick;
            }
            if (legend.onHover) {
                const onHover = (typeof legend.onHover === 'string' ? new Function(legend.onHover) : legend.onHover);
                legend.onHover = onHover;
            }
            if (legend.onLeave) {
                const onLeave = (typeof legend.onLeave === 'string' ? new Function(legend.onLeave) : legend.onLeave);
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
                    const filter = (typeof labels.filter === 'string' ? new Function(labels.filter) : labels.filter);
                    labels.filter = filter;
                }
            }
        }
        if (options.tooltips) {
            const tooltips = options.tooltips;
            if (tooltips.custom) {
                const custom = (typeof tooltips.custom === 'string' ? new Function(tooltips.custom) : tooltips.custom);
                tooltips.custom = custom;
            }
            if (tooltips.callbacks) {
                const callbacks = tooltips.callbacks;
                for (const key in callbacks) {
                    const callback = callbacks[key];
                    callbacks[key] =
                        typeof callback === 'string' ? new Function(callback) : callback;
                }
            }
            if (tooltips.filter) {
                const filter = (typeof tooltips.filter === 'string' ? new Function(tooltips.filter) : tooltips.filter);
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
                const onHover = (typeof hover.onHover === 'string' ? new Function(hover.onHover) : hover.onHover);
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
            let newOptions = deepCopy(options);
            newOptions.pieceLabel = {
                ...{
                    render: function (args) {
                        if (args.label) {
                            return args.label + ':' + args.value;
                        }
                        else {
                            return args.value;
                        }
                    },
                    ...newOptions.pieceLabel,
                },
                position: 'outside',
            };
            return newOptions;
        }
        return options;
    }
}
AjfChartComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfChartComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
AjfChartComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.5", type: AjfChartComponent, selector: "ajf-chart", inputs: { data: "data", options: "options", chartType: "chartType", instance: "instance" }, usesOnChanges: true, ngImport: i0, template: "", styles: ["ajf-chart{display:block;width:inherit;height:inherit;position:relative}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfChartComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ajf-chart', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "", styles: ["ajf-chart{display:block;width:inherit;height:inherit;position:relative}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }]; }, propDecorators: { data: [{
                type: Input
            }], options: [{
                type: Input
            }], chartType: [{
                type: Input
            }], instance: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL2NoYXJ0L3NyYy9jaGFydC50cyIsIi4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvY2hhcnQvc3JjL2NoYXJ0Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUVULEtBQUssRUFJTCxpQkFBaUIsR0FDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxLQUFLLE9BQU8sTUFBTSxVQUFVLENBQUM7O0FBY3BDLE1BQU0sRUFBQyxLQUFLLEVBQUMsR0FBRyxDQUFFLE9BQWUsQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFtQixDQUFDO0FBZXhFLE1BQU0sT0FBTyxpQkFBaUI7SUFVNUIsWUFBb0IsR0FBZSxFQUFVLFNBQW9CO1FBQTdDLFFBQUcsR0FBSCxHQUFHLENBQVk7UUFBVSxjQUFTLEdBQVQsU0FBUyxDQUFXO1FBSnpELFdBQU0sR0FBaUIsSUFBSSxDQUFDO1FBQzVCLHdCQUFtQixHQUE2QixJQUFJLENBQUM7UUFDckQsMEJBQXFCLEdBQXdCLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBRVAsQ0FBQztJQUVyRSxlQUFlO1FBQ2IsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFBSSxXQUFXLElBQUksT0FBTyxFQUFFO1lBQzFCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUN0QjthQUFNLElBQUksU0FBUyxJQUFJLE9BQU8sSUFBSSxNQUFNLElBQUksT0FBTyxFQUFFO1lBQ3BELElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUNyQjtRQUNELElBQUksVUFBVSxJQUFJ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LENBQUM7OzhHQXZTVSxpQkFBaUI7a0dBQWpCLGlCQUFpQixrS0MvRDlCLEVBQUE7MkZEK0RhLGlCQUFpQjtrQkFQN0IsU0FBUzsrQkFDRSxXQUFXLG1CQUdKLHVCQUF1QixDQUFDLE1BQU0saUJBQ2hDLGlCQUFpQixDQUFDLElBQUk7eUhBRzVCLElBQUk7c0JBQVosS0FBSztnQkFDRyxPQUFPO3NCQUFmLEtBQUs7Z0JBQ0csU0FBUztzQkFBakIsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge2RlZXBDb3B5fSBmcm9tICdAYWpmL2NvcmUvdXRpbHMnO1xuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgUmVuZGVyZXIyLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBjaGFydEpzIGZyb20gJ2NoYXJ0LmpzJztcbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1kdXBsaWNhdGUtaW1wb3J0c1xuaW1wb3J0IHtcbiAgQ2hhcnREYXRhLFxuICBDaGFydExlZ2VuZExhYmVsSXRlbSxcbiAgQ2hhcnRPcHRpb25zLFxuICBDaGFydFBvaW50LFxuICBDaGFydFNpemUsXG4gIENoYXJ0VG9vbHRpcEl0ZW0sXG4gIENoYXJ0VG9vbHRpcE1vZGVsLFxufSBmcm9tICdjaGFydC5qcyc7XG5cbmltcG9ydCB7RXh0ZW5kZWRDaGFydFR5cGV9IGZyb20gJy4vZXh0ZW5kZWQtY2hhcnQtdHlwZSc7XG5cbmNvbnN0IHtDaGFydH0gPSAoKGNoYXJ0SnMgYXMgYW55KS5kZWZhdWx0IHx8IGNoYXJ0SnMpIGFzIHR5cGVvZiBjaGFydEpzO1xuXG4vLyBXZSBvbmx5IG5lZWQgdG8gc2V0IGNhbnZhc0RhdGFVcmwgb2YgdGhlIEFqZkNoYXJ0V2lkZ2V0SW5zdGFuY2UgaGVyZSxcbi8vIGF2b2lkIGltcG9ydGluZyB0aGUgYWN0dWFsIGludGVyZmFjZSBiZWNhdXNlIG9mIHRoZSBjaXJjdWxhciBkZXBlbmRlbmN5OlxuaW50ZXJmYWNlIENoYXJ0V2lkZ2V0SW5zdGFuY2Uge1xuICBjYW52YXNEYXRhVXJsPygpOiBzdHJpbmc7XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FqZi1jaGFydCcsXG4gIHRlbXBsYXRlVXJsOiAnY2hhcnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWydjaGFydC5zY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxufSlcbmV4cG9ydCBjbGFzcyBBamZDaGFydENvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpIGRhdGE/OiBDaGFydERhdGE7XG4gIEBJbnB1dCgpIG9wdGlvbnM/OiBDaGFydE9wdGlvbnM7XG4gIEBJbnB1dCgpIGNoYXJ0VHlwZT86IEV4dGVuZGVkQ2hhcnRUeXBlO1xuICBASW5wdXQoKSBpbnN0YW5jZT86IENoYXJ0V2lkZ2V0SW5zdGFuY2U7XG5cbiAgcHJpdmF0ZSBfY2hhcnQ6IENoYXJ0IHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgX2NoYXJ0Q2FudmFzRWxlbWVudDogSFRNTENhbnZhc0VsZW1lbnQgfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBfY2hhcnRUeXBlc05lZWRQb2ludHM6IEV4dGVuZGVkQ2hhcnRUeXBlW10gPSBbJ3NjYXR0ZXInLCAnYnViYmxlJ107XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfZWw6IEVsZW1lbnRSZWYsIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIpIHt9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHRoaXMuX3JlYnVpbGRDaGFydCgpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGlmICgnY2hhcnRUeXBlJyBpbiBjaGFuZ2VzKSB7XG4gICAgICB0aGlzLl9yZWJ1aWxkQ2hhcnQoKTtcbiAgICB9IGVsc2UgaWYgKCdvcHRpb25zJyBpbiBjaGFuZ2VzIHx8ICdkYXRhJyBpbiBjaGFuZ2VzKSB7XG4gICAgICB0aGlzLl91cGRhdGVDaGFydCgpO1xuICAgIH1cbiAgICBpZiAoJ2luc3RhbmNlJyBpbiBjaGFuZ2VzICYmIHRoaXMuaW5zdGFuY2UgIT0gbnVsbCkge1xuICAgICAgdGhpcy5pbnN0YW5jZS5jYW52YXNEYXRhVXJsID0gKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5fY2hhcnRDYW52YXNFbGVtZW50ID09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX2NoYXJ0Q2FudmFzRWxlbWVudC50b0RhdGFVUkwoKTtcbiAgICAgIH07XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfZml4RGF0YShjaGFydFR5cGU6IEV4dGVuZGVkQ2hhcnRUeXBlLCBkYXRhOiBDaGFydERhdGEpOiBDaGFydERhdGEge1xuICAgIGNvbnN0IG5ld0RhdGE6IENoYXJ0RGF0YSA9IGRlZXBDb3B5KGRhdGEpO1xuICAgIGxldCBtYXhQb2ludHNOdW0gPSAwO1xuICAgIChuZXdEYXRhLmRhdGFzZXRzIHx8IFtdKS5mb3JFYWNoKGRhdGFzZXQgPT4ge1xuICAgICAgaWYgKGRhdGFzZXQubGFiZWwgPT0gbnVsbCkge1xuICAgICAgICBkYXRhc2V0LmxhYmVsID0gJyc7XG4gICAgICB9XG4gICAgICBtYXhQb2ludHNOdW0gPSBNYXRoLm1heChtYXhQb2ludHNOdW0sIChkYXRhc2V0LmRhdGEgfHwgW10pLmxlbmd0aCk7XG4gICAgICBjb25zdCBkYXRhc2V0VHlwZSA9IGRhdGFzZXQudHlwZSAhPSBudWxsID8gPEV4dGVuZGVkQ2hhcnRUeXBlPmRhdGFzZXQudHlwZSA6IGNoYXJ0VHlwZTtcbiAgICAgIGlmICh0aGlzLl9jaGFydFR5cGVzTmVlZFBvaW50cy5pbmRleE9mKGRhdGFzZXRUeXBlKSA+IC0xKSB7XG4gICAgICAgIGRhdGFzZXQuZGF0YSA9ICg8YW55W10+KGRhdGFzZXQuZGF0YSB8fCBbXSkpLm1hcCgoZCwgaWR4KSA9PiB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBkID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgcmV0dXJuIDxhbnk+e3g6IGlkeCwgeTogZCwgcjogZH07XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiA8Q2hhcnRQb2ludD5kO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBjb25zdCBsYWJlbHMgPSBuZXdEYXRhLmxhYmVscyB8fCBbXTtcbiAgICBpZiAobWF4UG9pbnRzTnVtID4gMCAmJiBsYWJlbHMubGVuZ3RoIDwgbWF4UG9pbnRzTnVtKSB7XG4gICAgICBmb3IgKGxldCBpID0gbGFiZWxzLmxlbmd0aDsgaSA8IG1heFBvaW50c051bTsgaSsrKSB7XG4gICAgICAgIGxhYmVscy5wdXNoKCcnKTtcbiAgICAgIH1cbiAgICAgIG5ld0RhdGEubGFiZWxzID0gbGFiZWxzO1xuICAgIH1cbiAgICByZXR1cm4gbmV3RGF0YTtcbiAgfVxuXG4gIHByaXZhdGUgX3VwZGF0ZUNoYXJ0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9jaGFydCA9PSBudWxsKSB7XG4gICAgICB0aGlzLl9yZWJ1aWxkQ2hhcnQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgKDxhbnk+dGhpcy5fY2hhcnQpLm9wdGlvbnMgPSB7XG4gICAgICAgIC4uLmRlZXBDb3B5KCg8YW55PnRoaXMuX2NoYXJ0KS5vcHRpb25zKSxcbiAgICAgICAgLi4uZGVlcENvcHkodGhpcy5vcHRpb25zIHx8IHt9KSxcbiAgICAgIH07XG4gICAgICB0aGlzLl9jaGFydC5kYXRhID0ge1xuICAgICAgICAuLi5kZWVwQ29weSh0aGlzLl9jaGFydC5kYXRhKSxcbiAgICAgICAgLi4uZGVlcENvcHkodGhpcy5kYXRhKSxcbiAgICAgIH07XG4gICAgICB0aGlzLl9jaGFydC51cGRhdGUoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9yZWJ1aWxkQ2hhcnQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2NoYXJ0ICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX2NoYXJ0LmRlc3Ryb3koKTtcbiAgICAgIHRoaXMuX2NoYXJ0ID0gbnVsbDtcbiAgICB9XG4gICAgaWYgKHRoaXMuX2NoYXJ0Q2FudmFzRWxlbWVudCAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9jaGFydENhbnZhc0VsZW1lbnQucmVtb3ZlKCk7XG4gICAgICB0aGlzLl9jaGFydENhbnZhc0VsZW1lbnQgPSBudWxsO1xuICAgIH1cbiAgICBpZiAodGhpcy5kYXRhICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX2NoYXJ0Q2FudmFzRWxlbWVudCA9IHRoaXMuX3JlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgICAgY29uc3Qgd2lkZ2V0RXhwb3J0RWxlbWVudDogSFRNTEVsZW1lbnQgPSB0aGlzLl9lbC5uYXRpdmVFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgICAgIGNvbnN0IGhlaWdodCA9IHdpZGdldEV4cG9ydEVsZW1lbnQuY2xpZW50SGVpZ2h0O1xuICAgICAgY29uc3Qgd2lkdGggPSB3aWRnZXRFeHBvcnRFbGVtZW50LmNsaWVudFdpZHRoO1xuICAgICAgaWYgKHdpZGdldEV4cG9ydEVsZW1lbnQgIT0gbnVsbCkge1xuICAgICAgICBpZiAoaGVpZ2h0ID4gMCkge1xuICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQsICdoZWlnaHQnLCBgJHtoZWlnaHR9cHhgKTtcbiAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9jaGFydENhbnZhc0VsZW1lbnQsICdoZWlnaHQnLCBgJHtoZWlnaHR9cHhgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAod2lkdGggPiAwKSB7XG4gICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fY2hhcnRDYW52YXNFbGVtZW50LCAnd2lkdGgnLCB3aWR0aCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX2NoYXJ0Q2FudmFzRWxlbWVudCwgJ3dpZHRoJywgJ2luaGVyaXQnKTtcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fY2hhcnRDYW52YXNFbGVtZW50LCAnaGVpZ2h0JywgJ2luaGVyaXQnKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX3JlbmRlcmVyLmFwcGVuZENoaWxkKHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQsIHRoaXMuX2NoYXJ0Q2FudmFzRWxlbWVudCk7XG4gICAgICBpZiAodGhpcy5jaGFydFR5cGUgIT0gbnVsbCkge1xuICAgICAgICBjb25zdCBjdHggPSB0aGlzLl9jaGFydENhbnZhc0VsZW1lbnQhLmdldENvbnRleHQoJzJkJykgYXMgQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xuICAgICAgICB0aGlzLl9jaGFydCA9IG5ldyBDaGFydChjdHgsIHtcbiAgICAgICAgICB0eXBlOiB0aGlzLmNoYXJ0VHlwZSxcbiAgICAgICAgICBkYXRhOiB0aGlzLl9maXhEYXRhKHRoaXMuY2hhcnRUeXBlLCB0aGlzLmRhdGEpLFxuICAgICAgICAgIG9wdGlvbnM6IHRoaXMuX2ZpeENoYXJ0T3B0aW9ucyh0aGlzLm9wdGlvbnMpLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9maXhDaGFydE9wdGlvbnMoY2hhcnRPcHRpb25zOiBDaGFydE9wdGlvbnMgfCB1bmRlZmluZWQpOiBDaGFydE9wdGlvbnMge1xuICAgIGNvbnN0IG9wdGlvbnMgPSBkZWVwQ29weShjaGFydE9wdGlvbnMgfHwge30pIHx8IHt9O1xuICAgIGlmIChvcHRpb25zLmxlZ2VuZENhbGxiYWNrKSB7XG4gICAgICBjb25zdCBsZWdlbmRDYWxsYmFjayA9IChcbiAgICAgICAgdHlwZW9mIG9wdGlvbnMubGVnZW5kQ2FsbGJhY2sgPT09ICdzdHJpbmcnXG4gICAgICAgICAgPyBuZXcgRnVuY3Rpb24ob3B0aW9ucy5sZWdlbmRDYWxsYmFjaylcbiAgICAgICAgICA6IG9wdGlvbnMubGVnZW5kQ2FsbGJhY2tcbiAgICAgICkgYXMgKGNoYXJ0OiBDaGFydCkgPT4gc3RyaW5nO1xuICAgICAgb3B0aW9ucy5sZWdlbmRDYWxsYmFjayA9IGxlZ2VuZENhbGxiYWNrO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy5vbkhvdmVyKSB7XG4gICAgICBjb25zdCBvbkhvdmVyID0gKFxuICAgICAgICB0eXBlb2Ygb3B0aW9ucy5vbkhvdmVyID09PSAnc3RyaW5nJyA/IG5ldyBGdW5jdGlvbihvcHRpb25zLm9uSG92ZXIpIDogb3B0aW9ucy5vbkhvdmVyXG4gICAgICApIGFzICh0aGlzOiBDaGFydCwgZXZlbnQ6IE1vdXNlRXZlbnQsIGFjdGl2ZUVsZW1lbnRzOiB7fVtdKSA9PiBhbnk7XG4gICAgICBvcHRpb25zLm9uSG92ZXIgPSBvbkhvdmVyO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy5vbkNsaWNrKSB7XG4gICAgICBjb25zdCBvbkNsaWNrID0gKFxuICAgICAgICB0eXBlb2Ygb3B0aW9ucy5vbkNsaWNrID09PSAnc3RyaW5nJyA/IG5ldyBGdW5jdGlvbihvcHRpb25zLm9uQ2xpY2spIDogb3B0aW9ucy5vbkNsaWNrXG4gICAgICApIGFzIChldmVudD86IE1vdXNlRXZlbnQsIGFjdGl2ZUVsZW1lbnRzPzoge31bXSkgPT4gYW55O1xuICAgICAgb3B0aW9ucy5vbkNsaWNrID0gb25DbGljaztcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMub25SZXNpemUpIHtcbiAgICAgIGNvbnN0IG9uUmVzaXplID0gKFxuICAgICAgICB0eXBlb2Ygb3B0aW9ucy5vblJlc2l6ZSA9PT0gJ3N0cmluZycgPyBuZXcgRnVuY3Rpb24ob3B0aW9ucy5vblJlc2l6ZSkgOiBvcHRpb25zLm9uUmVzaXplXG4gICAgICApIGFzICh0aGlzOiBDaGFydCwgbmV3U2l6ZTogQ2hhcnRTaXplKSA9PiB2b2lkO1xuICAgICAgb3B0aW9ucy5vblJlc2l6ZSA9IG9uUmVzaXplO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy5sZWdlbmQpIHtcbiAgICAgIGNvbnN0IGxlZ2VuZCA9IG9wdGlvbnMubGVnZW5kO1xuICAgICAgaWYgKGxlZ2VuZC5vbkNsaWNrKSB7XG4gICAgICAgIGNvbnN0IG9uQ2xpY2sgPSAoXG4gICAgICAgICAgdHlwZW9mIGxlZ2VuZC5vbkNsaWNrID09PSAnc3RyaW5nJyA/IG5ldyBGdW5jdGlvbihsZWdlbmQub25DbGljaykgOiBsZWdlbmQub25DbGlja1xuICAgICAgICApIGFzIChldmVudDogTW91c2VFdmVudCwgbGVnZW5kSXRlbTogQ2hhcnRMZWdlbmRMYWJlbEl0ZW0pID0+IHZvaWQ7XG4gICAgICAgIGxlZ2VuZC5vbkNsaWNrID0gb25DbGljaztcbiAgICAgIH1cbiAgICAgIGlmIChsZWdlbmQub25Ib3Zlcikge1xuICAgICAgICBjb25zdCBvbkhvdmVyID0gKFxuICAgICAgICAgIHR5cGVvZiBsZWdlbmQub25Ib3ZlciA9PT0gJ3N0cmluZycgPyBuZXcgRnVuY3Rpb24obGVnZW5kLm9uSG92ZXIpIDogbGVnZW5kLm9uSG92ZXJcbiAgICAgICAgKSBhcyAoZXZlbnQ6IE1vdXNlRXZlbnQsIGxlZ2VuZEl0ZW06IENoYXJ0TGVnZW5kTGFiZWxJdGVtKSA9PiB2b2lkO1xuICAgICAgICBsZWdlbmQub25Ib3ZlciA9IG9uSG92ZXI7XG4gICAgICB9XG4gICAgICBpZiAobGVnZW5kLm9uTGVhdmUpIHtcbiAgICAgICAgY29uc3Qgb25MZWF2ZSA9IChcbiAgICAgICAgICB0eXBlb2YgbGVnZW5kLm9uTGVhdmUgPT09ICdzdHJpbmcnID8gbmV3IEZ1bmN0aW9uKGxlZ2VuZC5vbkxlYXZlKSA6IGxlZ2VuZC5vbkxlYXZlXG4gICAgICAgICkgYXMgKGV2ZW50OiBNb3VzZUV2ZW50LCBsZWdlbmRJdGVtOiBDaGFydExlZ2VuZExhYmVsSXRlbSkgPT4gdm9pZDtcbiAgICAgICAgbGVnZW5kLm9uTGVhdmUgPSBvbkxlYXZlO1xuICAgICAgfVxuICAgICAgaWYgKGxlZ2VuZC5sYWJlbHMpIHtcbiAgICAgICAgY29uc3QgbGFiZWxzID0gbGVnZW5kLmxhYmVscztcbiAgICAgICAgaWYgKGxhYmVscy5nZW5lcmF0ZUxhYmVscykge1xuICAgICAgICAgIGNvbnN0IGdlbmVyYXRlTGFiZWxzID0gKFxuICAgICAgICAgICAgdHlwZW9mIGxhYmVscy5nZW5lcmF0ZUxhYmVscyA9PT0gJ3N0cmluZydcbiAgICAgICAgICAgICAgPyBuZXcgRnVuY3Rpb24obGFiZWxzLmdlbmVyYXRlTGFiZWxzKVxuICAgICAgICAgICAgICA6IGxhYmVscy5nZW5lcmF0ZUxhYmVsc1xuICAgICAgICAgICkgYXMgKGNoYXJ0OiBDaGFydCkgPT4gQ2hhcnRMZWdlbmRMYWJlbEl0ZW1bXTtcbiAgICAgICAgICBsYWJlbHMuZ2VuZXJhdGVMYWJlbHMgPSBnZW5lcmF0ZUxhYmVscztcbiAgICAgICAgfVxuICAgICAgICBpZiAobGFiZWxzLmZpbHRlcikge1xuICAgICAgICAgIGNvbnN0IGZpbHRlciA9IChcbiAgICAgICAgICAgIHR5cGVvZiBsYWJlbHMuZmlsdGVyID09PSAnc3RyaW5nJyA/IG5ldyBGdW5jdGlvbihsYWJlbHMuZmlsdGVyKSA6IGxhYmVscy5maWx0ZXJcbiAgICAgICAgICApIGFzIChsZWdlbmRJdGVtOiBDaGFydExlZ2VuZExhYmVsSXRlbSwgZGF0YTogQ2hhcnREYXRhKSA9PiBhbnk7XG4gICAgICAgICAgbGFiZWxzLmZpbHRlciA9IGZpbHRlcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAob3B0aW9ucy50b29sdGlwcykge1xuICAgICAgY29uc3QgdG9vbHRpcHMgPSBvcHRpb25zLnRvb2x0aXBzO1xuICAgICAgaWYgKHRvb2x0aXBzLmN1c3RvbSkge1xuICAgICAgICBjb25zdCBjdXN0b20gPSAoXG4gICAgICAgICAgdHlwZW9mIHRvb2x0aXBzLmN1c3RvbSA9PT0gJ3N0cmluZycgPyBuZXcgRnVuY3Rpb24odG9vbHRpcHMuY3VzdG9tKSA6IHRvb2x0aXBzLmN1c3RvbVxuICAgICAgICApIGFzICh0b29sdGlwTW9kZWw6IENoYXJ0VG9vbHRpcE1vZGVsKSA9PiB2b2lkO1xuICAgICAgICB0b29sdGlwcy5jdXN0b20gPSBjdXN0b207XG4gICAgICB9XG4gICAgICBpZiAodG9vbHRpcHMuY2FsbGJhY2tzKSB7XG4gICAgICAgIGNvbnN0IGNhbGxiYWNrcyA9IHRvb2x0aXBzLmNhbGxiYWNrcztcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gY2FsbGJhY2tzKSB7XG4gICAgICAgICAgY29uc3QgY2FsbGJhY2sgPSAoY2FsbGJhY2tzIGFzIGFueSlba2V5XSBhcyAoXG4gICAgICAgICAgICBpdGVtOiBDaGFydFRvb2x0aXBJdGVtW10sXG4gICAgICAgICAgICBkYXRhOiBDaGFydERhdGEsXG4gICAgICAgICAgKSA9PiBzdHJpbmcgfCBzdHJpbmdbXTtcbiAgICAgICAgICAoY2FsbGJhY2tzIGFzIGFueSlba2V5XSA9XG4gICAgICAgICAgICB0eXBlb2YgY2FsbGJhY2sgPT09ICdzdHJpbmcnID8gbmV3IEZ1bmN0aW9uKGNhbGxiYWNrKSA6IGNhbGxiYWNrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAodG9vbHRpcHMuZmlsdGVyKSB7XG4gICAgICAgIHR5cGUgRmlsdGVyRm4gPSAoaXRlbTogQ2hhcnRUb29sdGlwSXRlbSwgZGF0YTogQ2hhcnREYXRhKSA9PiBib29sZWFuO1xuICAgICAgICBjb25zdCBmaWx0ZXIgPSAoXG4gICAgICAgICAgdHlwZW9mIHRvb2x0aXBzLmZpbHRlciA9PT0gJ3N0cmluZycgPyBuZXcgRnVuY3Rpb24odG9vbHRpcHMuZmlsdGVyKSA6IHRvb2x0aXBzLmZpbHRlclxuICAgICAgICApIGFzIEZpbHRlckZuO1xuICAgICAgICB0b29sdGlwcy5maWx0ZXIgPSBmaWx0ZXI7XG4gICAgICB9XG4gICAgICBpZiAodG9vbHRpcHMuaXRlbVNvcnQpIHtcbiAgICAgICAgdHlwZSBTb3J0Rm4gPSAoXG4gICAgICAgICAgaXRlbUE6IENoYXJ0VG9vbHRpcEl0ZW0sXG4gICAgICAgICAgaXRlbUI6IENoYXJ0VG9vbHRpcEl0ZW0sXG4gICAgICAgICAgZGF0YT86IENoYXJ0RGF0YSxcbiAgICAgICAgKSA9PiBudW1iZXI7XG4gICAgICAgIGNvbnN0IGl0ZW1Tb3J0ID0gKFxuICAgICAgICAgIHR5cGVvZiB0b29sdGlwcy5pdGVtU29ydCA9PT0gJ3N0cmluZydcbiAgICAgICAgICAgID8gbmV3IEZ1bmN0aW9uKHRvb2x0aXBzLml0ZW1Tb3J0KVxuICAgICAgICAgICAgOiB0b29sdGlwcy5pdGVtU29ydFxuICAgICAgICApIGFzIFNvcnRGbjtcbiAgICAgICAgdG9vbHRpcHMuaXRlbVNvcnQgPSBpdGVtU29ydDtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKG9wdGlvbnMuaG92ZXIpIHtcbiAgICAgIGNvbnN0IGhvdmVyID0gb3B0aW9ucy5ob3ZlcjtcbiAgICAgIGlmIChob3Zlci5vbkhvdmVyKSB7XG4gICAgICAgIGNvbnN0IG9uSG92ZXIgPSAoXG4gICAgICAgICAgdHlwZW9mIGhvdmVyLm9uSG92ZXIgPT09ICdzdHJpbmcnID8gbmV3IEZ1bmN0aW9uKGhvdmVyLm9uSG92ZXIpIDogaG92ZXIub25Ib3ZlclxuICAgICAgICApIGFzICh0aGlzOiBDaGFydCwgZXZlbnQ6IE1vdXNlRXZlbnQsIGFjdGl2ZUVsZW1lbnRzOiB7fVtdKSA9PiBhbnk7XG4gICAgICAgIGhvdmVyLm9uSG92ZXIgPSBvbkhvdmVyO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAob3B0aW9ucy5hbmltYXRpb24pIHtcbiAgICAgIGNvbnN0IGFuaW1hdGlvbiA9IG9wdGlvbnMuYW5pbWF0aW9uO1xuICAgICAgaWYgKGFuaW1hdGlvbi5vblByb2dyZXNzKSB7XG4gICAgICAgIGNvbnN0IG9uUHJvZ3Jlc3MgPSAoXG4gICAgICAgICAgdHlwZW9mIGFuaW1hdGlvbi5vblByb2dyZXNzID09PSAnc3RyaW5nJ1xuICAgICAgICAgICAgPyBuZXcgRnVuY3Rpb24oYW5pbWF0aW9uLm9uUHJvZ3Jlc3MpXG4gICAgICAgICAgICA6IGFuaW1hdGlvbi5vblByb2dyZXNzXG4gICAgICAgICkgYXMgKGNoYXJ0OiBhbnkpID0+IHZvaWQ7XG4gICAgICAgIGFuaW1hdGlvbi5vblByb2dyZXNzID0gb25Qcm9ncmVzcztcbiAgICAgIH1cbiAgICAgIGlmIChhbmltYXRpb24ub25Db21wbGV0ZSkge1xuICAgICAgICBjb25zdCBvbkNvbXBsZXRlID0gKFxuICAgICAgICAgIHR5cGVvZiBhbmltYXRpb24ub25Db21wbGV0ZSA9PT0gJ3N0cmluZydcbiAgICAgICAgICAgID8gbmV3IEZ1bmN0aW9uKGFuaW1hdGlvbi5vbkNvbXBsZXRlKVxuICAgICAgICAgICAgOiBhbmltYXRpb24ub25Db21wbGV0ZVxuICAgICAgICApIGFzIChjaGFydDogYW55KSA9PiB2b2lkO1xuICAgICAgICBhbmltYXRpb24ub25Db21wbGV0ZSA9IG9uQ29tcGxldGU7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChvcHRpb25zLnNjYWxlcyA9PSBudWxsKSB7XG4gICAgICBvcHRpb25zLnNjYWxlcyA9IHt4QXhlczogW10sIHlBeGVzOiBbXX07XG4gICAgfVxuICAgIGlmIChvcHRpb25zLnNjYWxlcy54QXhlcyA9PSBudWxsKSB7XG4gICAgICBvcHRpb25zLnNjYWxlcy54QXhlcyA9IFtdO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy5zY2FsZXMueUF4ZXMgPT0gbnVsbCkge1xuICAgICAgb3B0aW9ucy5zY2FsZXMueUF4ZXMgPSBbXTtcbiAgICB9XG4gICAgb3B0aW9ucy5zY2FsZXMueUF4ZXMuZm9yRWFjaCgoeUF4ZTogYW55KSA9PiB7XG4gICAgICBpZiAoeUF4ZS50aWNrcyAmJiB5QXhlLnRpY2tzLmNhbGxiYWNrKSB7XG4gICAgICAgIGNvbnN0IGNhbGxiYWNrID0gKFxuICAgICAgICAgIHR5cGVvZiB5QXhlLnRpY2tzLmNhbGxiYWNrID09PSAnc3RyaW5nJ1xuICAgICAgICAgICAgPyBuZXcgRnVuY3Rpb24oeUF4ZS50aWNrcy5jYWxsYmFjaylcbiAgICAgICAgICAgIDogeUF4ZS50aWNrcy5jYWxsYmFja1xuICAgICAgICApIGFzICh2YWx1ZTogYW55LCBpbmRleDogYW55LCB2YWx1ZXM6IGFueSkgPT4gc3RyaW5nIHwgbnVtYmVyO1xuICAgICAgICB5QXhlLnRpY2tzLmNhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgICB9XG4gICAgfSk7XG4gICAgb3B0aW9ucy5zY2FsZXMueEF4ZXMuZm9yRWFjaCgoeEF4ZTogYW55KSA9PiB7XG4gICAgICBpZiAoeEF4ZS50aWNrcyAmJiB4QXhlLnRpY2tzLmNhbGxiYWNrKSB7XG4gICAgICAgIGNvbnN0IGNhbGxiYWNrID0gKFxuICAgICAgICAgIHR5cGVvZiB4QXhlLnRpY2tzLmNhbGxiYWNrID09PSAnc3RyaW5nJ1xuICAgICAgICAgICAgPyBuZXcgRnVuY3Rpb24oeEF4ZS50aWNrcy5jYWxsYmFjaylcbiAgICAgICAgICAgIDogeEF4ZS50aWNrcy5jYWxsYmFja1xuICAgICAgICApIGFzICh2YWx1ZTogYW55LCBpbmRleDogYW55LCB2YWx1ZXM6IGFueSkgPT4gc3RyaW5nIHwgbnVtYmVyO1xuICAgICAgICB4QXhlLnRpY2tzLmNhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKHRoaXMuY2hhcnRUeXBlID09ICdwaWUnKSB7XG4gICAgICBsZXQgbmV3T3B0aW9ucyA9IGRlZXBDb3B5KG9wdGlvbnMpO1xuICAgICAgbmV3T3B0aW9ucy5waWVjZUxhYmVsID0ge1xuICAgICAgICAuLi57XG4gICAgICAgICAgcmVuZGVyOiBmdW5jdGlvbiAoYXJnczogYW55KSB7XG4gICAgICAgICAgICBpZiAoYXJncy5sYWJlbCkge1xuICAgICAgICAgICAgICByZXR1cm4gYXJncy5sYWJlbCArICc6JyArIGFyZ3MudmFsdWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXR1cm4gYXJncy52YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIC4uLm5ld09wdGlvbnMucGllY2VMYWJlbCxcbiAgICAgICAgfSxcbiAgICAgICAgcG9zaXRpb246ICdvdXRzaWRlJyxcbiAgICAgIH07XG4gICAgICByZXR1cm4gbmV3T3B0aW9ucztcbiAgICB9XG4gICAgcmV0dXJuIG9wdGlvbnM7XG4gIH1cbn1cbiIsIiJdfQ==