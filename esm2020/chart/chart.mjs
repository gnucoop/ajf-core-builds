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
import { ChangeDetectionStrategy, Component, ElementRef, Input, Renderer2, ViewEncapsulation, } from '@angular/core';
import * as chartJs from 'chart.js';
import * as i0 from "@angular/core";
const { Chart } = (chartJs.default || chartJs);
export class AjfChartComponent {
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
        if ('instance' in changes) {
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
            this._chart.data = { ...deepCopy(this._chart.data), ...deepCopy(this.data) };
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
            const ctx = this._chartCanvasElement.getContext('2d');
            this._chart = new Chart(ctx, {
                type: this.chartType,
                data: this._fixData(this.chartType, this.data),
                options: this._fixChartOptions(this.options),
            });
        }
    }
    _fixChartOptions(chartOptions) {
        const options = deepCopy(chartOptions) || {};
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
AjfChartComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-rc.3", ngImport: i0, type: AjfChartComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
AjfChartComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.0-rc.3", type: AjfChartComponent, selector: "ajf-chart", inputs: { data: "data", options: "options", chartType: "chartType", instance: "instance" }, usesOnChanges: true, ngImport: i0, template: "", styles: ["ajf-chart{display:block;width:inherit;height:inherit;position:relative}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-rc.3", ngImport: i0, type: AjfChartComponent, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9jaGFydC9jaGFydC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2NoYXJ0L2NoYXJ0Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFVBQVUsRUFDVixLQUFLLEVBRUwsU0FBUyxFQUVULGlCQUFpQixHQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEtBQUssT0FBTyxNQUFNLFVBQVUsQ0FBQzs7QUFjcEMsTUFBTSxFQUFDLEtBQUssRUFBQyxHQUFHLENBQUUsT0FBZSxDQUFDLE9BQU8sSUFBSSxPQUFPLENBQW1CLENBQUM7QUFleEUsTUFBTSxPQUFPLGlCQUFpQjtJQVU1QixZQUFvQixHQUFlLEVBQVUsU0FBb0I7UUFBN0MsUUFBRyxHQUFILEdBQUcsQ0FBWTtRQUFVLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFGekQsMEJBQXFCLEdBQXdCLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBRVAsQ0FBQztJQUVyRSxlQUFlO1FBQ2IsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFBSSxXQUFXLElBQUksT0FBTyxFQUFFO1lBQzFCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUN0QjthQUFNLElBQUksU0FBUyxJQUFJLE9BQU8sSUFBSSxNQUFNLElBQUksT0FBTyxFQUFFO1lBQ3BELElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUNyQjtRQUNELElBQUksVUFBVSxJQUFJLE9BQU8sRUFBRTtZQUN6QixJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEs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RzVCLElBQUk7c0JBQVosS0FBSztnQkFDRyxPQUFPO3NCQUFmLEtBQUs7Z0JBQ0csU0FBUztzQkFBakIsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge2RlZXBDb3B5fSBmcm9tICdAYWpmL2NvcmUvdXRpbHMnO1xuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgUmVuZGVyZXIyLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBjaGFydEpzIGZyb20gJ2NoYXJ0LmpzJztcbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1kdXBsaWNhdGUtaW1wb3J0c1xuaW1wb3J0IHtcbiAgQ2hhcnREYXRhLFxuICBDaGFydExlZ2VuZExhYmVsSXRlbSxcbiAgQ2hhcnRPcHRpb25zLFxuICBDaGFydFBvaW50LFxuICBDaGFydFNpemUsXG4gIENoYXJ0VG9vbHRpcEl0ZW0sXG4gIENoYXJ0VG9vbHRpcE1vZGVsLFxufSBmcm9tICdjaGFydC5qcyc7XG5cbmltcG9ydCB7RXh0ZW5kZWRDaGFydFR5cGV9IGZyb20gJy4vZXh0ZW5kZWQtY2hhcnQtdHlwZSc7XG5cbmNvbnN0IHtDaGFydH0gPSAoKGNoYXJ0SnMgYXMgYW55KS5kZWZhdWx0IHx8IGNoYXJ0SnMpIGFzIHR5cGVvZiBjaGFydEpzO1xuXG4vLyBXZSBvbmx5IG5lZWQgdG8gc2V0IGNhbnZhc0RhdGFVcmwgb2YgdGhlIEFqZkNoYXJ0V2lkZ2V0SW5zdGFuY2UgaGVyZSxcbi8vIGF2b2lkIGltcG9ydGluZyB0aGUgYWN0dWFsIGludGVyZmFjZSBiZWNhdXNlIG9mIHRoZSBjaXJjdWxhciBkZXBlbmRlbmN5OlxuaW50ZXJmYWNlIENoYXJ0V2lkZ2V0SW5zdGFuY2Uge1xuICBjYW52YXNEYXRhVXJsPygpOiBzdHJpbmc7XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FqZi1jaGFydCcsXG4gIHRlbXBsYXRlVXJsOiAnY2hhcnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWydjaGFydC5jc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG59KVxuZXhwb3J0IGNsYXNzIEFqZkNoYXJ0Q29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25DaGFuZ2VzIHtcbiAgQElucHV0KCkgZGF0YTogQ2hhcnREYXRhO1xuICBASW5wdXQoKSBvcHRpb25zOiBDaGFydE9wdGlvbnM7XG4gIEBJbnB1dCgpIGNoYXJ0VHlwZTogRXh0ZW5kZWRDaGFydFR5cGU7XG4gIEBJbnB1dCgpIGluc3RhbmNlOiBDaGFydFdpZGdldEluc3RhbmNlO1xuXG4gIHByaXZhdGUgX2NoYXJ0OiBDaGFydCB8IG51bGw7XG4gIHByaXZhdGUgX2NoYXJ0Q2FudmFzRWxlbWVudDogSFRNTENhbnZhc0VsZW1lbnQgfCBudWxsO1xuICBwcml2YXRlIF9jaGFydFR5cGVzTmVlZFBvaW50czogRXh0ZW5kZWRDaGFydFR5cGVbXSA9IFsnc2NhdHRlcicsICdidWJibGUnXTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9lbDogRWxlbWVudFJlZiwgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMikge31cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fcmVidWlsZENoYXJ0KCk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgaWYgKCdjaGFydFR5cGUnIGluIGNoYW5nZXMpIHtcbiAgICAgIHRoaXMuX3JlYnVpbGRDaGFydCgpO1xuICAgIH0gZWxzZSBpZiAoJ29wdGlvbnMnIGluIGNoYW5nZXMgfHwgJ2RhdGEnIGluIGNoYW5nZXMpIHtcbiAgICAgIHRoaXMuX3VwZGF0ZUNoYXJ0KCk7XG4gICAgfVxuICAgIGlmICgnaW5zdGFuY2UnIGluIGNoYW5nZXMpIHtcbiAgICAgIHRoaXMuaW5zdGFuY2UuY2FudmFzRGF0YVVybCA9ICgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuX2NoYXJ0Q2FudmFzRWxlbWVudCA9PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9jaGFydENhbnZhc0VsZW1lbnQudG9EYXRhVVJMKCk7XG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2ZpeERhdGEoY2hhcnRUeXBlOiBFeHRlbmRlZENoYXJ0VHlwZSwgZGF0YTogQ2hhcnREYXRhKTogQ2hhcnREYXRhIHtcbiAgICBjb25zdCBuZXdEYXRhOiBDaGFydERhdGEgPSBkZWVwQ29weShkYXRhKTtcbiAgICBsZXQgbWF4UG9pbnRzTnVtID0gMDtcbiAgICAobmV3RGF0YS5kYXRhc2V0cyB8fCBbXSkuZm9yRWFjaChkYXRhc2V0ID0+IHtcbiAgICAgIGlmIChkYXRhc2V0LmxhYmVsID09IG51bGwpIHtcbiAgICAgICAgZGF0YXNldC5sYWJlbCA9ICcnO1xuICAgICAgfVxuICAgICAgbWF4UG9pbnRzTnVtID0gTWF0aC5tYXgobWF4UG9pbnRzTnVtLCAoZGF0YXNldC5kYXRhIHx8IFtdKS5sZW5ndGgpO1xuICAgICAgY29uc3QgZGF0YXNldFR5cGUgPSBkYXRhc2V0LnR5cGUgIT0gbnVsbCA/IDxFeHRlbmRlZENoYXJ0VHlwZT5kYXRhc2V0LnR5cGUgOiBjaGFydFR5cGU7XG4gICAgICBpZiAodGhpcy5fY2hhcnRUeXBlc05lZWRQb2ludHMuaW5kZXhPZihkYXRhc2V0VHlwZSkgPiAtMSkge1xuICAgICAgICBkYXRhc2V0LmRhdGEgPSAoPGFueVtdPihkYXRhc2V0LmRhdGEgfHwgW10pKS5tYXAoKGQsIGlkeCkgPT4ge1xuICAgICAgICAgIGlmICh0eXBlb2YgZCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHJldHVybiA8YW55Pnt4OiBpZHgsIHk6IGQsIHI6IGR9O1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gPENoYXJ0UG9pbnQ+ZDtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgY29uc3QgbGFiZWxzID0gbmV3RGF0YS5sYWJlbHMgfHwgW107XG4gICAgaWYgKG1heFBvaW50c051bSA+IDAgJiYgbGFiZWxzLmxlbmd0aCA8IG1heFBvaW50c051bSkge1xuICAgICAgZm9yIChsZXQgaSA9IGxhYmVscy5sZW5ndGg7IGkgPCBtYXhQb2ludHNOdW07IGkrKykge1xuICAgICAgICBsYWJlbHMucHVzaCgnJyk7XG4gICAgICB9XG4gICAgICBuZXdEYXRhLmxhYmVscyA9IGxhYmVscztcbiAgICB9XG4gICAgcmV0dXJuIG5ld0RhdGE7XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVDaGFydCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fY2hhcnQgPT0gbnVsbCkge1xuICAgICAgdGhpcy5fcmVidWlsZENoYXJ0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICg8YW55PnRoaXMuX2NoYXJ0KS5vcHRpb25zID0ge1xuICAgICAgICAuLi5kZWVwQ29weSgoPGFueT50aGlzLl9jaGFydCkub3B0aW9ucyksXG4gICAgICAgIC4uLmRlZXBDb3B5KHRoaXMub3B0aW9ucyB8fCB7fSksXG4gICAgICB9O1xuICAgICAgdGhpcy5fY2hhcnQuZGF0YSA9IHsuLi5kZWVwQ29weSh0aGlzLl9jaGFydC5kYXRhKSwgLi4uZGVlcENvcHkodGhpcy5kYXRhKX07XG4gICAgICB0aGlzLl9jaGFydC51cGRhdGUoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9yZWJ1aWxkQ2hhcnQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2NoYXJ0ICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX2NoYXJ0LmRlc3Ryb3koKTtcbiAgICAgIHRoaXMuX2NoYXJ0ID0gbnVsbDtcbiAgICB9XG4gICAgaWYgKHRoaXMuX2NoYXJ0Q2FudmFzRWxlbWVudCAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9jaGFydENhbnZhc0VsZW1lbnQucmVtb3ZlKCk7XG4gICAgICB0aGlzLl9jaGFydENhbnZhc0VsZW1lbnQgPSBudWxsO1xuICAgIH1cbiAgICBpZiAodGhpcy5kYXRhICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX2NoYXJ0Q2FudmFzRWxlbWVudCA9IHRoaXMuX3JlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgICAgY29uc3Qgd2lkZ2V0RXhwb3J0RWxlbWVudDogSFRNTEVsZW1lbnQgPSB0aGlzLl9lbC5uYXRpdmVFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgICAgIGNvbnN0IGhlaWdodCA9IHdpZGdldEV4cG9ydEVsZW1lbnQuY2xpZW50SGVpZ2h0O1xuICAgICAgY29uc3Qgd2lkdGggPSB3aWRnZXRFeHBvcnRFbGVtZW50LmNsaWVudFdpZHRoO1xuICAgICAgaWYgKHdpZGdldEV4cG9ydEVsZW1lbnQgIT0gbnVsbCkge1xuICAgICAgICBpZiAoaGVpZ2h0ID4gMCkge1xuICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQsICdoZWlnaHQnLCBgJHtoZWlnaHR9cHhgKTtcbiAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9jaGFydENhbnZhc0VsZW1lbnQsICdoZWlnaHQnLCBgJHtoZWlnaHR9cHhgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAod2lkdGggPiAwKSB7XG4gICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fY2hhcnRDYW52YXNFbGVtZW50LCAnd2lkdGgnLCB3aWR0aCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX2NoYXJ0Q2FudmFzRWxlbWVudCwgJ3dpZHRoJywgJ2luaGVyaXQnKTtcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fY2hhcnRDYW52YXNFbGVtZW50LCAnaGVpZ2h0JywgJ2luaGVyaXQnKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX3JlbmRlcmVyLmFwcGVuZENoaWxkKHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQsIHRoaXMuX2NoYXJ0Q2FudmFzRWxlbWVudCk7XG4gICAgICBjb25zdCBjdHggPSB0aGlzLl9jaGFydENhbnZhc0VsZW1lbnQhLmdldENvbnRleHQoJzJkJykgYXMgQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xuICAgICAgdGhpcy5fY2hhcnQgPSBuZXcgQ2hhcnQoY3R4LCB7XG4gICAgICAgIHR5cGU6IHRoaXMuY2hhcnRUeXBlLFxuICAgICAgICBkYXRhOiB0aGlzLl9maXhEYXRhKHRoaXMuY2hhcnRUeXBlLCB0aGlzLmRhdGEpLFxuICAgICAgICBvcHRpb25zOiB0aGlzLl9maXhDaGFydE9wdGlvbnModGhpcy5vcHRpb25zKSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2ZpeENoYXJ0T3B0aW9ucyhjaGFydE9wdGlvbnM6IENoYXJ0T3B0aW9ucyk6IENoYXJ0T3B0aW9ucyB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IGRlZXBDb3B5KGNoYXJ0T3B0aW9ucykgfHwge307XG4gICAgaWYgKG9wdGlvbnMubGVnZW5kQ2FsbGJhY2spIHtcbiAgICAgIGNvbnN0IGxlZ2VuZENhbGxiYWNrID0gKFxuICAgICAgICB0eXBlb2Ygb3B0aW9ucy5sZWdlbmRDYWxsYmFjayA9PT0gJ3N0cmluZydcbiAgICAgICAgICA/IG5ldyBGdW5jdGlvbihvcHRpb25zLmxlZ2VuZENhbGxiYWNrKVxuICAgICAgICAgIDogb3B0aW9ucy5sZWdlbmRDYWxsYmFja1xuICAgICAgKSBhcyAoY2hhcnQ6IENoYXJ0KSA9PiBzdHJpbmc7XG4gICAgICBvcHRpb25zLmxlZ2VuZENhbGxiYWNrID0gbGVnZW5kQ2FsbGJhY2s7XG4gICAgfVxuICAgIGlmIChvcHRpb25zLm9uSG92ZXIpIHtcbiAgICAgIGNvbnN0IG9uSG92ZXIgPSAoXG4gICAgICAgIHR5cGVvZiBvcHRpb25zLm9uSG92ZXIgPT09ICdzdHJpbmcnID8gbmV3IEZ1bmN0aW9uKG9wdGlvbnMub25Ib3ZlcikgOiBvcHRpb25zLm9uSG92ZXJcbiAgICAgICkgYXMgKHRoaXM6IENoYXJ0LCBldmVudDogTW91c2VFdmVudCwgYWN0aXZlRWxlbWVudHM6IHt9W10pID0+IGFueTtcbiAgICAgIG9wdGlvbnMub25Ib3ZlciA9IG9uSG92ZXI7XG4gICAgfVxuICAgIGlmIChvcHRpb25zLm9uQ2xpY2spIHtcbiAgICAgIGNvbnN0IG9uQ2xpY2sgPSAoXG4gICAgICAgIHR5cGVvZiBvcHRpb25zLm9uQ2xpY2sgPT09ICdzdHJpbmcnID8gbmV3IEZ1bmN0aW9uKG9wdGlvbnMub25DbGljaykgOiBvcHRpb25zLm9uQ2xpY2tcbiAgICAgICkgYXMgKGV2ZW50PzogTW91c2VFdmVudCwgYWN0aXZlRWxlbWVudHM/OiB7fVtdKSA9PiBhbnk7XG4gICAgICBvcHRpb25zLm9uQ2xpY2sgPSBvbkNsaWNrO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy5vblJlc2l6ZSkge1xuICAgICAgY29uc3Qgb25SZXNpemUgPSAoXG4gICAgICAgIHR5cGVvZiBvcHRpb25zLm9uUmVzaXplID09PSAnc3RyaW5nJyA/IG5ldyBGdW5jdGlvbihvcHRpb25zLm9uUmVzaXplKSA6IG9wdGlvbnMub25SZXNpemVcbiAgICAgICkgYXMgKHRoaXM6IENoYXJ0LCBuZXdTaXplOiBDaGFydFNpemUpID0+IHZvaWQ7XG4gICAgICBvcHRpb25zLm9uUmVzaXplID0gb25SZXNpemU7XG4gICAgfVxuICAgIGlmIChvcHRpb25zLmxlZ2VuZCkge1xuICAgICAgY29uc3QgbGVnZW5kID0gb3B0aW9ucy5sZWdlbmQ7XG4gICAgICBpZiAobGVnZW5kLm9uQ2xpY2spIHtcbiAgICAgICAgY29uc3Qgb25DbGljayA9IChcbiAgICAgICAgICB0eXBlb2YgbGVnZW5kLm9uQ2xpY2sgPT09ICdzdHJpbmcnID8gbmV3IEZ1bmN0aW9uKGxlZ2VuZC5vbkNsaWNrKSA6IGxlZ2VuZC5vbkNsaWNrXG4gICAgICAgICkgYXMgKGV2ZW50OiBNb3VzZUV2ZW50LCBsZWdlbmRJdGVtOiBDaGFydExlZ2VuZExhYmVsSXRlbSkgPT4gdm9pZDtcbiAgICAgICAgbGVnZW5kLm9uQ2xpY2sgPSBvbkNsaWNrO1xuICAgICAgfVxuICAgICAgaWYgKGxlZ2VuZC5vbkhvdmVyKSB7XG4gICAgICAgIGNvbnN0IG9uSG92ZXIgPSAoXG4gICAgICAgICAgdHlwZW9mIGxlZ2VuZC5vbkhvdmVyID09PSAnc3RyaW5nJyA/IG5ldyBGdW5jdGlvbihsZWdlbmQub25Ib3ZlcikgOiBsZWdlbmQub25Ib3ZlclxuICAgICAgICApIGFzIChldmVudDogTW91c2VFdmVudCwgbGVnZW5kSXRlbTogQ2hhcnRMZWdlbmRMYWJlbEl0ZW0pID0+IHZvaWQ7XG4gICAgICAgIGxlZ2VuZC5vbkhvdmVyID0gb25Ib3ZlcjtcbiAgICAgIH1cbiAgICAgIGlmIChsZWdlbmQub25MZWF2ZSkge1xuICAgICAgICBjb25zdCBvbkxlYXZlID0gKFxuICAgICAgICAgIHR5cGVvZiBsZWdlbmQub25MZWF2ZSA9PT0gJ3N0cmluZycgPyBuZXcgRnVuY3Rpb24obGVnZW5kLm9uTGVhdmUpIDogbGVnZW5kLm9uTGVhdmVcbiAgICAgICAgKSBhcyAoZXZlbnQ6IE1vdXNlRXZlbnQsIGxlZ2VuZEl0ZW06IENoYXJ0TGVnZW5kTGFiZWxJdGVtKSA9PiB2b2lkO1xuICAgICAgICBsZWdlbmQub25MZWF2ZSA9IG9uTGVhdmU7XG4gICAgICB9XG4gICAgICBpZiAobGVnZW5kLmxhYmVscykge1xuICAgICAgICBjb25zdCBsYWJlbHMgPSBsZWdlbmQubGFiZWxzO1xuICAgICAgICBpZiAobGFiZWxzLmdlbmVyYXRlTGFiZWxzKSB7XG4gICAgICAgICAgY29uc3QgZ2VuZXJhdGVMYWJlbHMgPSAoXG4gICAgICAgICAgICB0eXBlb2YgbGFiZWxzLmdlbmVyYXRlTGFiZWxzID09PSAnc3RyaW5nJ1xuICAgICAgICAgICAgICA/IG5ldyBGdW5jdGlvbihsYWJlbHMuZ2VuZXJhdGVMYWJlbHMpXG4gICAgICAgICAgICAgIDogbGFiZWxzLmdlbmVyYXRlTGFiZWxzXG4gICAgICAgICAgKSBhcyAoY2hhcnQ6IENoYXJ0KSA9PiBDaGFydExlZ2VuZExhYmVsSXRlbVtdO1xuICAgICAgICAgIGxhYmVscy5nZW5lcmF0ZUxhYmVscyA9IGdlbmVyYXRlTGFiZWxzO1xuICAgICAgICB9XG4gICAgICAgIGlmIChsYWJlbHMuZmlsdGVyKSB7XG4gICAgICAgICAgY29uc3QgZmlsdGVyID0gKFxuICAgICAgICAgICAgdHlwZW9mIGxhYmVscy5maWx0ZXIgPT09ICdzdHJpbmcnID8gbmV3IEZ1bmN0aW9uKGxhYmVscy5maWx0ZXIpIDogbGFiZWxzLmZpbHRlclxuICAgICAgICAgICkgYXMgKGxlZ2VuZEl0ZW06IENoYXJ0TGVnZW5kTGFiZWxJdGVtLCBkYXRhOiBDaGFydERhdGEpID0+IGFueTtcbiAgICAgICAgICBsYWJlbHMuZmlsdGVyID0gZmlsdGVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChvcHRpb25zLnRvb2x0aXBzKSB7XG4gICAgICBjb25zdCB0b29sdGlwcyA9IG9wdGlvbnMudG9vbHRpcHM7XG4gICAgICBpZiAodG9vbHRpcHMuY3VzdG9tKSB7XG4gICAgICAgIGNvbnN0IGN1c3RvbSA9IChcbiAgICAgICAgICB0eXBlb2YgdG9vbHRpcHMuY3VzdG9tID09PSAnc3RyaW5nJyA/IG5ldyBGdW5jdGlvbih0b29sdGlwcy5jdXN0b20pIDogdG9vbHRpcHMuY3VzdG9tXG4gICAgICAgICkgYXMgKHRvb2x0aXBNb2RlbDogQ2hhcnRUb29sdGlwTW9kZWwpID0+IHZvaWQ7XG4gICAgICAgIHRvb2x0aXBzLmN1c3RvbSA9IGN1c3RvbTtcbiAgICAgIH1cbiAgICAgIGlmICh0b29sdGlwcy5jYWxsYmFja3MpIHtcbiAgICAgICAgY29uc3QgY2FsbGJhY2tzID0gdG9vbHRpcHMuY2FsbGJhY2tzO1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBjYWxsYmFja3MpIHtcbiAgICAgICAgICBjb25zdCBjYWxsYmFjayA9IChjYWxsYmFja3MgYXMgYW55KVtrZXldIGFzIChcbiAgICAgICAgICAgIGl0ZW06IENoYXJ0VG9vbHRpcEl0ZW1bXSxcbiAgICAgICAgICAgIGRhdGE6IENoYXJ0RGF0YSxcbiAgICAgICAgICApID0+IHN0cmluZyB8IHN0cmluZ1tdO1xuICAgICAgICAgIChjYWxsYmFja3MgYXMgYW55KVtrZXldID1cbiAgICAgICAgICAgIHR5cGVvZiBjYWxsYmFjayA9PT0gJ3N0cmluZycgPyBuZXcgRnVuY3Rpb24oY2FsbGJhY2spIDogY2FsbGJhY2s7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICh0b29sdGlwcy5maWx0ZXIpIHtcbiAgICAgICAgdHlwZSBGaWx0ZXJGbiA9IChpdGVtOiBDaGFydFRvb2x0aXBJdGVtLCBkYXRhOiBDaGFydERhdGEpID0+IGJvb2xlYW47XG4gICAgICAgIGNvbnN0IGZpbHRlciA9IChcbiAgICAgICAgICB0eXBlb2YgdG9vbHRpcHMuZmlsdGVyID09PSAnc3RyaW5nJyA/IG5ldyBGdW5jdGlvbih0b29sdGlwcy5maWx0ZXIpIDogdG9vbHRpcHMuZmlsdGVyXG4gICAgICAgICkgYXMgRmlsdGVyRm47XG4gICAgICAgIHRvb2x0aXBzLmZpbHRlciA9IGZpbHRlcjtcbiAgICAgIH1cbiAgICAgIGlmICh0b29sdGlwcy5pdGVtU29ydCkge1xuICAgICAgICB0eXBlIFNvcnRGbiA9IChcbiAgICAgICAgICBpdGVtQTogQ2hhcnRUb29sdGlwSXRlbSxcbiAgICAgICAgICBpdGVtQjogQ2hhcnRUb29sdGlwSXRlbSxcbiAgICAgICAgICBkYXRhPzogQ2hhcnREYXRhLFxuICAgICAgICApID0+IG51bWJlcjtcbiAgICAgICAgY29uc3QgaXRlbVNvcnQgPSAoXG4gICAgICAgICAgdHlwZW9mIHRvb2x0aXBzLml0ZW1Tb3J0ID09PSAnc3RyaW5nJ1xuICAgICAgICAgICAgPyBuZXcgRnVuY3Rpb24odG9vbHRpcHMuaXRlbVNvcnQpXG4gICAgICAgICAgICA6IHRvb2x0aXBzLml0ZW1Tb3J0XG4gICAgICAgICkgYXMgU29ydEZuO1xuICAgICAgICB0b29sdGlwcy5pdGVtU29ydCA9IGl0ZW1Tb3J0O1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAob3B0aW9ucy5ob3Zlcikge1xuICAgICAgY29uc3QgaG92ZXIgPSBvcHRpb25zLmhvdmVyO1xuICAgICAgaWYgKGhvdmVyLm9uSG92ZXIpIHtcbiAgICAgICAgY29uc3Qgb25Ib3ZlciA9IChcbiAgICAgICAgICB0eXBlb2YgaG92ZXIub25Ib3ZlciA9PT0gJ3N0cmluZycgPyBuZXcgRnVuY3Rpb24oaG92ZXIub25Ib3ZlcikgOiBob3Zlci5vbkhvdmVyXG4gICAgICAgICkgYXMgKHRoaXM6IENoYXJ0LCBldmVudDogTW91c2VFdmVudCwgYWN0aXZlRWxlbWVudHM6IHt9W10pID0+IGFueTtcbiAgICAgICAgaG92ZXIub25Ib3ZlciA9IG9uSG92ZXI7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChvcHRpb25zLmFuaW1hdGlvbikge1xuICAgICAgY29uc3QgYW5pbWF0aW9uID0gb3B0aW9ucy5hbmltYXRpb247XG4gICAgICBpZiAoYW5pbWF0aW9uLm9uUHJvZ3Jlc3MpIHtcbiAgICAgICAgY29uc3Qgb25Qcm9ncmVzcyA9IChcbiAgICAgICAgICB0eXBlb2YgYW5pbWF0aW9uLm9uUHJvZ3Jlc3MgPT09ICdzdHJpbmcnXG4gICAgICAgICAgICA/IG5ldyBGdW5jdGlvbihhbmltYXRpb24ub25Qcm9ncmVzcylcbiAgICAgICAgICAgIDogYW5pbWF0aW9uLm9uUHJvZ3Jlc3NcbiAgICAgICAgKSBhcyAoY2hhcnQ6IGFueSkgPT4gdm9pZDtcbiAgICAgICAgYW5pbWF0aW9uLm9uUHJvZ3Jlc3MgPSBvblByb2dyZXNzO1xuICAgICAgfVxuICAgICAgaWYgKGFuaW1hdGlvbi5vbkNvbXBsZXRlKSB7XG4gICAgICAgIGNvbnN0IG9uQ29tcGxldGUgPSAoXG4gICAgICAgICAgdHlwZW9mIGFuaW1hdGlvbi5vbkNvbXBsZXRlID09PSAnc3RyaW5nJ1xuICAgICAgICAgICAgPyBuZXcgRnVuY3Rpb24oYW5pbWF0aW9uLm9uQ29tcGxldGUpXG4gICAgICAgICAgICA6IGFuaW1hdGlvbi5vbkNvbXBsZXRlXG4gICAgICAgICkgYXMgKGNoYXJ0OiBhbnkpID0+IHZvaWQ7XG4gICAgICAgIGFuaW1hdGlvbi5vbkNvbXBsZXRlID0gb25Db21wbGV0ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKG9wdGlvbnMuc2NhbGVzID09IG51bGwpIHtcbiAgICAgIG9wdGlvbnMuc2NhbGVzID0ge3hBeGVzOiBbXSwgeUF4ZXM6IFtdfTtcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMuc2NhbGVzLnhBeGVzID09IG51bGwpIHtcbiAgICAgIG9wdGlvbnMuc2NhbGVzLnhBeGVzID0gW107XG4gICAgfVxuICAgIGlmIChvcHRpb25zLnNjYWxlcy55QXhlcyA9PSBudWxsKSB7XG4gICAgICBvcHRpb25zLnNjYWxlcy55QXhlcyA9IFtdO1xuICAgIH1cbiAgICBvcHRpb25zLnNjYWxlcy55QXhlcy5mb3JFYWNoKCh5QXhlOiBhbnkpID0+IHtcbiAgICAgIGlmICh5QXhlLnRpY2tzICYmIHlBeGUudGlja3MuY2FsbGJhY2spIHtcbiAgICAgICAgY29uc3QgY2FsbGJhY2sgPSAoXG4gICAgICAgICAgdHlwZW9mIHlBeGUudGlja3MuY2FsbGJhY2sgPT09ICdzdHJpbmcnXG4gICAgICAgICAgICA/IG5ldyBGdW5jdGlvbih5QXhlLnRpY2tzLmNhbGxiYWNrKVxuICAgICAgICAgICAgOiB5QXhlLnRpY2tzLmNhbGxiYWNrXG4gICAgICAgICkgYXMgKHZhbHVlOiBhbnksIGluZGV4OiBhbnksIHZhbHVlczogYW55KSA9PiBzdHJpbmcgfCBudW1iZXI7XG4gICAgICAgIHlBeGUudGlja3MuY2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICAgIH1cbiAgICB9KTtcbiAgICBvcHRpb25zLnNjYWxlcy54QXhlcy5mb3JFYWNoKCh4QXhlOiBhbnkpID0+IHtcbiAgICAgIGlmICh4QXhlLnRpY2tzICYmIHhBeGUudGlja3MuY2FsbGJhY2spIHtcbiAgICAgICAgY29uc3QgY2FsbGJhY2sgPSAoXG4gICAgICAgICAgdHlwZW9mIHhBeGUudGlja3MuY2FsbGJhY2sgPT09ICdzdHJpbmcnXG4gICAgICAgICAgICA/IG5ldyBGdW5jdGlvbih4QXhlLnRpY2tzLmNhbGxiYWNrKVxuICAgICAgICAgICAgOiB4QXhlLnRpY2tzLmNhbGxiYWNrXG4gICAgICAgICkgYXMgKHZhbHVlOiBhbnksIGluZGV4OiBhbnksIHZhbHVlczogYW55KSA9PiBzdHJpbmcgfCBudW1iZXI7XG4gICAgICAgIHhBeGUudGlja3MuY2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAodGhpcy5jaGFydFR5cGUgPT0gJ3BpZScpIHtcbiAgICAgIGxldCBuZXdPcHRpb25zID0gZGVlcENvcHkob3B0aW9ucyk7XG4gICAgICBuZXdPcHRpb25zLnBpZWNlTGFiZWwgPSB7XG4gICAgICAgIC4uLntcbiAgICAgICAgICByZW5kZXI6IGZ1bmN0aW9uIChhcmdzOiBhbnkpIHtcbiAgICAgICAgICAgIGlmIChhcmdzLmxhYmVsKSB7XG4gICAgICAgICAgICAgIHJldHVybiBhcmdzLmxhYmVsICsgJzonICsgYXJncy52YWx1ZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJldHVybiBhcmdzLnZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgLi4ubmV3T3B0aW9ucy5waWVjZUxhYmVsLFxuICAgICAgICB9LFxuICAgICAgICBwb3NpdGlvbjogJ291dHNpZGUnLFxuICAgICAgfTtcbiAgICAgIHJldHVybiBuZXdPcHRpb25zO1xuICAgIH1cbiAgICByZXR1cm4gb3B0aW9ucztcbiAgfVxufVxuIiwiIl19