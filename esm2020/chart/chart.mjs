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
    _fixChartOptions(options) {
        options = options || {};
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
        options.scales.yAxes.forEach(yAxe => {
            if (yAxe.ticks && yAxe.ticks.callback) {
                const callback = (typeof yAxe.ticks.callback === 'string'
                    ? new Function(yAxe.ticks.callback)
                    : yAxe.ticks.callback);
                yAxe.ticks.callback = callback;
            }
        });
        options.scales.xAxes.forEach(xAxe => {
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
AjfChartComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfChartComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
AjfChartComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.0-next.15", type: AjfChartComponent, selector: "ajf-chart", inputs: { data: "data", options: "options", chartType: "chartType", instance: "instance" }, usesOnChanges: true, ngImport: i0, template: "", styles: ["ajf-chart{display:block;width:inherit;height:inherit;position:relative}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfChartComponent, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9jaGFydC9jaGFydC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2NoYXJ0L2NoYXJ0Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFVBQVUsRUFDVixLQUFLLEVBRUwsU0FBUyxFQUVULGlCQUFpQixHQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEtBQUssT0FBTyxNQUFNLFVBQVUsQ0FBQzs7QUFjcEMsTUFBTSxFQUFDLEtBQUssRUFBQyxHQUFHLENBQUUsT0FBZSxDQUFDLE9BQU8sSUFBSSxPQUFPLENBQW1CLENBQUM7QUFleEUsTUFBTSxPQUFPLGlCQUFpQjtJQVU1QixZQUFvQixHQUFlLEVBQVUsU0FBb0I7UUFBN0MsUUFBRyxHQUFILEdBQUcsQ0FBWTtRQUFVLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFGekQsMEJBQXFCLEdBQXdCLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBRVAsQ0FBQztJQUVyRSxlQUFlO1FBQ2IsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFBSSxXQUFXLElBQUksT0FBTyxFQUFFO1lBQzFCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUN0QjthQUFNLElBQUksU0FBUyxJQUFJLE9BQU8sSUFBSSxNQUFNLElBQUksT0FBTyxFQUFFO1lBQ3BELElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUNyQjtRQUNELElBQUksVUFBVSxJQUFJLE9BQU8sRUFBRTtZQUN6QixJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEs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Q0csU0FBUztzQkFBakIsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge2RlZXBDb3B5fSBmcm9tICdAYWpmL2NvcmUvdXRpbHMnO1xuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgUmVuZGVyZXIyLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBjaGFydEpzIGZyb20gJ2NoYXJ0LmpzJztcbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1kdXBsaWNhdGUtaW1wb3J0c1xuaW1wb3J0IHtcbiAgQ2hhcnREYXRhLFxuICBDaGFydExlZ2VuZExhYmVsSXRlbSxcbiAgQ2hhcnRPcHRpb25zLFxuICBDaGFydFBvaW50LFxuICBDaGFydFNpemUsXG4gIENoYXJ0VG9vbHRpcEl0ZW0sXG4gIENoYXJ0VG9vbHRpcE1vZGVsLFxufSBmcm9tICdjaGFydC5qcyc7XG5cbmltcG9ydCB7RXh0ZW5kZWRDaGFydFR5cGV9IGZyb20gJy4vZXh0ZW5kZWQtY2hhcnQtdHlwZSc7XG5cbmNvbnN0IHtDaGFydH0gPSAoKGNoYXJ0SnMgYXMgYW55KS5kZWZhdWx0IHx8IGNoYXJ0SnMpIGFzIHR5cGVvZiBjaGFydEpzO1xuXG4vLyBXZSBvbmx5IG5lZWQgdG8gc2V0IGNhbnZhc0RhdGFVcmwgb2YgdGhlIEFqZkNoYXJ0V2lkZ2V0SW5zdGFuY2UgaGVyZSxcbi8vIGF2b2lkIGltcG9ydGluZyB0aGUgYWN0dWFsIGludGVyZmFjZSBiZWNhdXNlIG9mIHRoZSBjaXJjdWxhciBkZXBlbmRlbmN5OlxuaW50ZXJmYWNlIENoYXJ0V2lkZ2V0SW5zdGFuY2Uge1xuICBjYW52YXNEYXRhVXJsPygpOiBzdHJpbmc7XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FqZi1jaGFydCcsXG4gIHRlbXBsYXRlVXJsOiAnY2hhcnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWydjaGFydC5jc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG59KVxuZXhwb3J0IGNsYXNzIEFqZkNoYXJ0Q29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25DaGFuZ2VzIHtcbiAgQElucHV0KCkgZGF0YTogQ2hhcnREYXRhO1xuICBASW5wdXQoKSBvcHRpb25zOiBDaGFydE9wdGlvbnM7XG4gIEBJbnB1dCgpIGNoYXJ0VHlwZTogRXh0ZW5kZWRDaGFydFR5cGU7XG4gIEBJbnB1dCgpIGluc3RhbmNlOiBDaGFydFdpZGdldEluc3RhbmNlO1xuXG4gIHByaXZhdGUgX2NoYXJ0OiBDaGFydCB8IG51bGw7XG4gIHByaXZhdGUgX2NoYXJ0Q2FudmFzRWxlbWVudDogSFRNTENhbnZhc0VsZW1lbnQgfCBudWxsO1xuICBwcml2YXRlIF9jaGFydFR5cGVzTmVlZFBvaW50czogRXh0ZW5kZWRDaGFydFR5cGVbXSA9IFsnc2NhdHRlcicsICdidWJibGUnXTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9lbDogRWxlbWVudFJlZiwgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMikge31cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fcmVidWlsZENoYXJ0KCk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgaWYgKCdjaGFydFR5cGUnIGluIGNoYW5nZXMpIHtcbiAgICAgIHRoaXMuX3JlYnVpbGRDaGFydCgpO1xuICAgIH0gZWxzZSBpZiAoJ29wdGlvbnMnIGluIGNoYW5nZXMgfHwgJ2RhdGEnIGluIGNoYW5nZXMpIHtcbiAgICAgIHRoaXMuX3VwZGF0ZUNoYXJ0KCk7XG4gICAgfVxuICAgIGlmICgnaW5zdGFuY2UnIGluIGNoYW5nZXMpIHtcbiAgICAgIHRoaXMuaW5zdGFuY2UuY2FudmFzRGF0YVVybCA9ICgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuX2NoYXJ0Q2FudmFzRWxlbWVudCA9PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9jaGFydENhbnZhc0VsZW1lbnQudG9EYXRhVVJMKCk7XG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2ZpeERhdGEoY2hhcnRUeXBlOiBFeHRlbmRlZENoYXJ0VHlwZSwgZGF0YTogQ2hhcnREYXRhKTogQ2hhcnREYXRhIHtcbiAgICBjb25zdCBuZXdEYXRhOiBDaGFydERhdGEgPSBkZWVwQ29weShkYXRhKTtcbiAgICBsZXQgbWF4UG9pbnRzTnVtID0gMDtcbiAgICAobmV3RGF0YS5kYXRhc2V0cyB8fCBbXSkuZm9yRWFjaChkYXRhc2V0ID0+IHtcbiAgICAgIGlmIChkYXRhc2V0LmxhYmVsID09IG51bGwpIHtcbiAgICAgICAgZGF0YXNldC5sYWJlbCA9ICcnO1xuICAgICAgfVxuICAgICAgbWF4UG9pbnRzTnVtID0gTWF0aC5tYXgobWF4UG9pbnRzTnVtLCAoZGF0YXNldC5kYXRhIHx8IFtdKS5sZW5ndGgpO1xuICAgICAgY29uc3QgZGF0YXNldFR5cGUgPSBkYXRhc2V0LnR5cGUgIT0gbnVsbCA/IDxFeHRlbmRlZENoYXJ0VHlwZT5kYXRhc2V0LnR5cGUgOiBjaGFydFR5cGU7XG4gICAgICBpZiAodGhpcy5fY2hhcnRUeXBlc05lZWRQb2ludHMuaW5kZXhPZihkYXRhc2V0VHlwZSkgPiAtMSkge1xuICAgICAgICBkYXRhc2V0LmRhdGEgPSAoPGFueVtdPihkYXRhc2V0LmRhdGEgfHwgW10pKS5tYXAoKGQsIGlkeCkgPT4ge1xuICAgICAgICAgIGlmICh0eXBlb2YgZCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHJldHVybiA8YW55Pnt4OiBpZHgsIHk6IGQsIHI6IGR9O1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gPENoYXJ0UG9pbnQ+ZDtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgY29uc3QgbGFiZWxzID0gbmV3RGF0YS5sYWJlbHMgfHwgW107XG4gICAgaWYgKG1heFBvaW50c051bSA+IDAgJiYgbGFiZWxzLmxlbmd0aCA8IG1heFBvaW50c051bSkge1xuICAgICAgZm9yIChsZXQgaSA9IGxhYmVscy5sZW5ndGg7IGkgPCBtYXhQb2ludHNOdW07IGkrKykge1xuICAgICAgICBsYWJlbHMucHVzaCgnJyk7XG4gICAgICB9XG4gICAgICBuZXdEYXRhLmxhYmVscyA9IGxhYmVscztcbiAgICB9XG4gICAgcmV0dXJuIG5ld0RhdGE7XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVDaGFydCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fY2hhcnQgPT0gbnVsbCkge1xuICAgICAgdGhpcy5fcmVidWlsZENoYXJ0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICg8YW55PnRoaXMuX2NoYXJ0KS5vcHRpb25zID0ge1xuICAgICAgICAuLi5kZWVwQ29weSgoPGFueT50aGlzLl9jaGFydCkub3B0aW9ucyksXG4gICAgICAgIC4uLmRlZXBDb3B5KHRoaXMub3B0aW9ucyB8fCB7fSksXG4gICAgICB9O1xuICAgICAgdGhpcy5fY2hhcnQuZGF0YSA9IHsuLi5kZWVwQ29weSh0aGlzLl9jaGFydC5kYXRhKSwgLi4uZGVlcENvcHkodGhpcy5kYXRhKX07XG4gICAgICB0aGlzLl9jaGFydC51cGRhdGUoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9yZWJ1aWxkQ2hhcnQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2NoYXJ0ICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX2NoYXJ0LmRlc3Ryb3koKTtcbiAgICAgIHRoaXMuX2NoYXJ0ID0gbnVsbDtcbiAgICB9XG4gICAgaWYgKHRoaXMuX2NoYXJ0Q2FudmFzRWxlbWVudCAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9jaGFydENhbnZhc0VsZW1lbnQucmVtb3ZlKCk7XG4gICAgICB0aGlzLl9jaGFydENhbnZhc0VsZW1lbnQgPSBudWxsO1xuICAgIH1cbiAgICBpZiAodGhpcy5kYXRhICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX2NoYXJ0Q2FudmFzRWxlbWVudCA9IHRoaXMuX3JlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgICAgY29uc3Qgd2lkZ2V0RXhwb3J0RWxlbWVudDogSFRNTEVsZW1lbnQgPSB0aGlzLl9lbC5uYXRpdmVFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgICAgIGNvbnN0IGhlaWdodCA9IHdpZGdldEV4cG9ydEVsZW1lbnQuY2xpZW50SGVpZ2h0O1xuICAgICAgY29uc3Qgd2lkdGggPSB3aWRnZXRFeHBvcnRFbGVtZW50LmNsaWVudFdpZHRoO1xuICAgICAgaWYgKHdpZGdldEV4cG9ydEVsZW1lbnQgIT0gbnVsbCkge1xuICAgICAgICBpZiAoaGVpZ2h0ID4gMCkge1xuICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQsICdoZWlnaHQnLCBgJHtoZWlnaHR9cHhgKTtcbiAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9jaGFydENhbnZhc0VsZW1lbnQsICdoZWlnaHQnLCBgJHtoZWlnaHR9cHhgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAod2lkdGggPiAwKSB7XG4gICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fY2hhcnRDYW52YXNFbGVtZW50LCAnd2lkdGgnLCB3aWR0aCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX2NoYXJ0Q2FudmFzRWxlbWVudCwgJ3dpZHRoJywgJ2luaGVyaXQnKTtcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fY2hhcnRDYW52YXNFbGVtZW50LCAnaGVpZ2h0JywgJ2luaGVyaXQnKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX3JlbmRlcmVyLmFwcGVuZENoaWxkKHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQsIHRoaXMuX2NoYXJ0Q2FudmFzRWxlbWVudCk7XG4gICAgICBjb25zdCBjdHggPSB0aGlzLl9jaGFydENhbnZhc0VsZW1lbnQhLmdldENvbnRleHQoJzJkJykgYXMgQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xuICAgICAgdGhpcy5fY2hhcnQgPSBuZXcgQ2hhcnQoY3R4LCB7XG4gICAgICAgIHR5cGU6IHRoaXMuY2hhcnRUeXBlLFxuICAgICAgICBkYXRhOiB0aGlzLl9maXhEYXRhKHRoaXMuY2hhcnRUeXBlLCB0aGlzLmRhdGEpLFxuICAgICAgICBvcHRpb25zOiB0aGlzLl9maXhDaGFydE9wdGlvbnModGhpcy5vcHRpb25zKSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2ZpeENoYXJ0T3B0aW9ucyhvcHRpb25zOiBDaGFydE9wdGlvbnMpOiBDaGFydE9wdGlvbnMge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIGlmIChvcHRpb25zLmxlZ2VuZENhbGxiYWNrKSB7XG4gICAgICBjb25zdCBsZWdlbmRDYWxsYmFjayA9IChcbiAgICAgICAgdHlwZW9mIG9wdGlvbnMubGVnZW5kQ2FsbGJhY2sgPT09ICdzdHJpbmcnXG4gICAgICAgICAgPyBuZXcgRnVuY3Rpb24ob3B0aW9ucy5sZWdlbmRDYWxsYmFjaylcbiAgICAgICAgICA6IG9wdGlvbnMubGVnZW5kQ2FsbGJhY2tcbiAgICAgICkgYXMgKGNoYXJ0OiBDaGFydCkgPT4gc3RyaW5nO1xuICAgICAgb3B0aW9ucy5sZWdlbmRDYWxsYmFjayA9IGxlZ2VuZENhbGxiYWNrO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy5vbkhvdmVyKSB7XG4gICAgICBjb25zdCBvbkhvdmVyID0gKFxuICAgICAgICB0eXBlb2Ygb3B0aW9ucy5vbkhvdmVyID09PSAnc3RyaW5nJyA/IG5ldyBGdW5jdGlvbihvcHRpb25zLm9uSG92ZXIpIDogb3B0aW9ucy5vbkhvdmVyXG4gICAgICApIGFzICh0aGlzOiBDaGFydCwgZXZlbnQ6IE1vdXNlRXZlbnQsIGFjdGl2ZUVsZW1lbnRzOiB7fVtdKSA9PiBhbnk7XG4gICAgICBvcHRpb25zLm9uSG92ZXIgPSBvbkhvdmVyO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy5vbkNsaWNrKSB7XG4gICAgICBjb25zdCBvbkNsaWNrID0gKFxuICAgICAgICB0eXBlb2Ygb3B0aW9ucy5vbkNsaWNrID09PSAnc3RyaW5nJyA/IG5ldyBGdW5jdGlvbihvcHRpb25zLm9uQ2xpY2spIDogb3B0aW9ucy5vbkNsaWNrXG4gICAgICApIGFzIChldmVudD86IE1vdXNlRXZlbnQsIGFjdGl2ZUVsZW1lbnRzPzoge31bXSkgPT4gYW55O1xuICAgICAgb3B0aW9ucy5vbkNsaWNrID0gb25DbGljaztcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMub25SZXNpemUpIHtcbiAgICAgIGNvbnN0IG9uUmVzaXplID0gKFxuICAgICAgICB0eXBlb2Ygb3B0aW9ucy5vblJlc2l6ZSA9PT0gJ3N0cmluZycgPyBuZXcgRnVuY3Rpb24ob3B0aW9ucy5vblJlc2l6ZSkgOiBvcHRpb25zLm9uUmVzaXplXG4gICAgICApIGFzICh0aGlzOiBDaGFydCwgbmV3U2l6ZTogQ2hhcnRTaXplKSA9PiB2b2lkO1xuICAgICAgb3B0aW9ucy5vblJlc2l6ZSA9IG9uUmVzaXplO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy5sZWdlbmQpIHtcbiAgICAgIGNvbnN0IGxlZ2VuZCA9IG9wdGlvbnMubGVnZW5kO1xuICAgICAgaWYgKGxlZ2VuZC5vbkNsaWNrKSB7XG4gICAgICAgIGNvbnN0IG9uQ2xpY2sgPSAoXG4gICAgICAgICAgdHlwZW9mIGxlZ2VuZC5vbkNsaWNrID09PSAnc3RyaW5nJyA/IG5ldyBGdW5jdGlvbihsZWdlbmQub25DbGljaykgOiBsZWdlbmQub25DbGlja1xuICAgICAgICApIGFzIChldmVudDogTW91c2VFdmVudCwgbGVnZW5kSXRlbTogQ2hhcnRMZWdlbmRMYWJlbEl0ZW0pID0+IHZvaWQ7XG4gICAgICAgIGxlZ2VuZC5vbkNsaWNrID0gb25DbGljaztcbiAgICAgIH1cbiAgICAgIGlmIChsZWdlbmQub25Ib3Zlcikge1xuICAgICAgICBjb25zdCBvbkhvdmVyID0gKFxuICAgICAgICAgIHR5cGVvZiBsZWdlbmQub25Ib3ZlciA9PT0gJ3N0cmluZycgPyBuZXcgRnVuY3Rpb24obGVnZW5kLm9uSG92ZXIpIDogbGVnZW5kLm9uSG92ZXJcbiAgICAgICAgKSBhcyAoZXZlbnQ6IE1vdXNlRXZlbnQsIGxlZ2VuZEl0ZW06IENoYXJ0TGVnZW5kTGFiZWxJdGVtKSA9PiB2b2lkO1xuICAgICAgICBsZWdlbmQub25Ib3ZlciA9IG9uSG92ZXI7XG4gICAgICB9XG4gICAgICBpZiAobGVnZW5kLm9uTGVhdmUpIHtcbiAgICAgICAgY29uc3Qgb25MZWF2ZSA9IChcbiAgICAgICAgICB0eXBlb2YgbGVnZW5kLm9uTGVhdmUgPT09ICdzdHJpbmcnID8gbmV3IEZ1bmN0aW9uKGxlZ2VuZC5vbkxlYXZlKSA6IGxlZ2VuZC5vbkxlYXZlXG4gICAgICAgICkgYXMgKGV2ZW50OiBNb3VzZUV2ZW50LCBsZWdlbmRJdGVtOiBDaGFydExlZ2VuZExhYmVsSXRlbSkgPT4gdm9pZDtcbiAgICAgICAgbGVnZW5kLm9uTGVhdmUgPSBvbkxlYXZlO1xuICAgICAgfVxuICAgICAgaWYgKGxlZ2VuZC5sYWJlbHMpIHtcbiAgICAgICAgY29uc3QgbGFiZWxzID0gbGVnZW5kLmxhYmVscztcbiAgICAgICAgaWYgKGxhYmVscy5nZW5lcmF0ZUxhYmVscykge1xuICAgICAgICAgIGNvbnN0IGdlbmVyYXRlTGFiZWxzID0gKFxuICAgICAgICAgICAgdHlwZW9mIGxhYmVscy5nZW5lcmF0ZUxhYmVscyA9PT0gJ3N0cmluZydcbiAgICAgICAgICAgICAgPyBuZXcgRnVuY3Rpb24obGFiZWxzLmdlbmVyYXRlTGFiZWxzKVxuICAgICAgICAgICAgICA6IGxhYmVscy5nZW5lcmF0ZUxhYmVsc1xuICAgICAgICAgICkgYXMgKGNoYXJ0OiBDaGFydCkgPT4gQ2hhcnRMZWdlbmRMYWJlbEl0ZW1bXTtcbiAgICAgICAgICBsYWJlbHMuZ2VuZXJhdGVMYWJlbHMgPSBnZW5lcmF0ZUxhYmVscztcbiAgICAgICAgfVxuICAgICAgICBpZiAobGFiZWxzLmZpbHRlcikge1xuICAgICAgICAgIGNvbnN0IGZpbHRlciA9IChcbiAgICAgICAgICAgIHR5cGVvZiBsYWJlbHMuZmlsdGVyID09PSAnc3RyaW5nJyA/IG5ldyBGdW5jdGlvbihsYWJlbHMuZmlsdGVyKSA6IGxhYmVscy5maWx0ZXJcbiAgICAgICAgICApIGFzIChsZWdlbmRJdGVtOiBDaGFydExlZ2VuZExhYmVsSXRlbSwgZGF0YTogQ2hhcnREYXRhKSA9PiBhbnk7XG4gICAgICAgICAgbGFiZWxzLmZpbHRlciA9IGZpbHRlcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAob3B0aW9ucy50b29sdGlwcykge1xuICAgICAgY29uc3QgdG9vbHRpcHMgPSBvcHRpb25zLnRvb2x0aXBzO1xuICAgICAgaWYgKHRvb2x0aXBzLmN1c3RvbSkge1xuICAgICAgICBjb25zdCBjdXN0b20gPSAoXG4gICAgICAgICAgdHlwZW9mIHRvb2x0aXBzLmN1c3RvbSA9PT0gJ3N0cmluZycgPyBuZXcgRnVuY3Rpb24odG9vbHRpcHMuY3VzdG9tKSA6IHRvb2x0aXBzLmN1c3RvbVxuICAgICAgICApIGFzICh0b29sdGlwTW9kZWw6IENoYXJ0VG9vbHRpcE1vZGVsKSA9PiB2b2lkO1xuICAgICAgICB0b29sdGlwcy5jdXN0b20gPSBjdXN0b207XG4gICAgICB9XG4gICAgICBpZiAodG9vbHRpcHMuY2FsbGJhY2tzKSB7XG4gICAgICAgIGNvbnN0IGNhbGxiYWNrcyA9IHRvb2x0aXBzLmNhbGxiYWNrcztcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gY2FsbGJhY2tzKSB7XG4gICAgICAgICAgY29uc3QgY2FsbGJhY2sgPSAoY2FsbGJhY2tzIGFzIGFueSlba2V5XSBhcyAoXG4gICAgICAgICAgICBpdGVtOiBDaGFydFRvb2x0aXBJdGVtW10sXG4gICAgICAgICAgICBkYXRhOiBDaGFydERhdGEsXG4gICAgICAgICAgKSA9PiBzdHJpbmcgfCBzdHJpbmdbXTtcbiAgICAgICAgICAoY2FsbGJhY2tzIGFzIGFueSlba2V5XSA9XG4gICAgICAgICAgICB0eXBlb2YgY2FsbGJhY2sgPT09ICdzdHJpbmcnID8gbmV3IEZ1bmN0aW9uKGNhbGxiYWNrKSA6IGNhbGxiYWNrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAodG9vbHRpcHMuZmlsdGVyKSB7XG4gICAgICAgIHR5cGUgRmlsdGVyRm4gPSAoaXRlbTogQ2hhcnRUb29sdGlwSXRlbSwgZGF0YTogQ2hhcnREYXRhKSA9PiBib29sZWFuO1xuICAgICAgICBjb25zdCBmaWx0ZXIgPSAoXG4gICAgICAgICAgdHlwZW9mIHRvb2x0aXBzLmZpbHRlciA9PT0gJ3N0cmluZycgPyBuZXcgRnVuY3Rpb24odG9vbHRpcHMuZmlsdGVyKSA6IHRvb2x0aXBzLmZpbHRlclxuICAgICAgICApIGFzIEZpbHRlckZuO1xuICAgICAgICB0b29sdGlwcy5maWx0ZXIgPSBmaWx0ZXI7XG4gICAgICB9XG4gICAgICBpZiAodG9vbHRpcHMuaXRlbVNvcnQpIHtcbiAgICAgICAgdHlwZSBTb3J0Rm4gPSAoXG4gICAgICAgICAgaXRlbUE6IENoYXJ0VG9vbHRpcEl0ZW0sXG4gICAgICAgICAgaXRlbUI6IENoYXJ0VG9vbHRpcEl0ZW0sXG4gICAgICAgICAgZGF0YT86IENoYXJ0RGF0YSxcbiAgICAgICAgKSA9PiBudW1iZXI7XG4gICAgICAgIGNvbnN0IGl0ZW1Tb3J0ID0gKFxuICAgICAgICAgIHR5cGVvZiB0b29sdGlwcy5pdGVtU29ydCA9PT0gJ3N0cmluZydcbiAgICAgICAgICAgID8gbmV3IEZ1bmN0aW9uKHRvb2x0aXBzLml0ZW1Tb3J0KVxuICAgICAgICAgICAgOiB0b29sdGlwcy5pdGVtU29ydFxuICAgICAgICApIGFzIFNvcnRGbjtcbiAgICAgICAgdG9vbHRpcHMuaXRlbVNvcnQgPSBpdGVtU29ydDtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKG9wdGlvbnMuaG92ZXIpIHtcbiAgICAgIGNvbnN0IGhvdmVyID0gb3B0aW9ucy5ob3ZlcjtcbiAgICAgIGlmIChob3Zlci5vbkhvdmVyKSB7XG4gICAgICAgIGNvbnN0IG9uSG92ZXIgPSAoXG4gICAgICAgICAgdHlwZW9mIGhvdmVyLm9uSG92ZXIgPT09ICdzdHJpbmcnID8gbmV3IEZ1bmN0aW9uKGhvdmVyLm9uSG92ZXIpIDogaG92ZXIub25Ib3ZlclxuICAgICAgICApIGFzICh0aGlzOiBDaGFydCwgZXZlbnQ6IE1vdXNlRXZlbnQsIGFjdGl2ZUVsZW1lbnRzOiB7fVtdKSA9PiBhbnk7XG4gICAgICAgIGhvdmVyLm9uSG92ZXIgPSBvbkhvdmVyO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAob3B0aW9ucy5hbmltYXRpb24pIHtcbiAgICAgIGNvbnN0IGFuaW1hdGlvbiA9IG9wdGlvbnMuYW5pbWF0aW9uO1xuICAgICAgaWYgKGFuaW1hdGlvbi5vblByb2dyZXNzKSB7XG4gICAgICAgIGNvbnN0IG9uUHJvZ3Jlc3MgPSAoXG4gICAgICAgICAgdHlwZW9mIGFuaW1hdGlvbi5vblByb2dyZXNzID09PSAnc3RyaW5nJ1xuICAgICAgICAgICAgPyBuZXcgRnVuY3Rpb24oYW5pbWF0aW9uLm9uUHJvZ3Jlc3MpXG4gICAgICAgICAgICA6IGFuaW1hdGlvbi5vblByb2dyZXNzXG4gICAgICAgICkgYXMgKGNoYXJ0OiBhbnkpID0+IHZvaWQ7XG4gICAgICAgIGFuaW1hdGlvbi5vblByb2dyZXNzID0gb25Qcm9ncmVzcztcbiAgICAgIH1cbiAgICAgIGlmIChhbmltYXRpb24ub25Db21wbGV0ZSkge1xuICAgICAgICBjb25zdCBvbkNvbXBsZXRlID0gKFxuICAgICAgICAgIHR5cGVvZiBhbmltYXRpb24ub25Db21wbGV0ZSA9PT0gJ3N0cmluZydcbiAgICAgICAgICAgID8gbmV3IEZ1bmN0aW9uKGFuaW1hdGlvbi5vbkNvbXBsZXRlKVxuICAgICAgICAgICAgOiBhbmltYXRpb24ub25Db21wbGV0ZVxuICAgICAgICApIGFzIChjaGFydDogYW55KSA9PiB2b2lkO1xuICAgICAgICBhbmltYXRpb24ub25Db21wbGV0ZSA9IG9uQ29tcGxldGU7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChvcHRpb25zLnNjYWxlcyA9PSBudWxsKSB7XG4gICAgICBvcHRpb25zLnNjYWxlcyA9IHt4QXhlczogW10sIHlBeGVzOiBbXX07XG4gICAgfVxuICAgIGlmIChvcHRpb25zLnNjYWxlcy54QXhlcyA9PSBudWxsKSB7XG4gICAgICBvcHRpb25zLnNjYWxlcy54QXhlcyA9IFtdO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy5zY2FsZXMueUF4ZXMgPT0gbnVsbCkge1xuICAgICAgb3B0aW9ucy5zY2FsZXMueUF4ZXMgPSBbXTtcbiAgICB9XG4gICAgb3B0aW9ucy5zY2FsZXMueUF4ZXMuZm9yRWFjaCh5QXhlID0+IHtcbiAgICAgIGlmICh5QXhlLnRpY2tzICYmIHlBeGUudGlja3MuY2FsbGJhY2spIHtcbiAgICAgICAgY29uc3QgY2FsbGJhY2sgPSAoXG4gICAgICAgICAgdHlwZW9mIHlBeGUudGlja3MuY2FsbGJhY2sgPT09ICdzdHJpbmcnXG4gICAgICAgICAgICA/IG5ldyBGdW5jdGlvbih5QXhlLnRpY2tzLmNhbGxiYWNrKVxuICAgICAgICAgICAgOiB5QXhlLnRpY2tzLmNhbGxiYWNrXG4gICAgICAgICkgYXMgKHZhbHVlOiBhbnksIGluZGV4OiBhbnksIHZhbHVlczogYW55KSA9PiBzdHJpbmcgfCBudW1iZXI7XG4gICAgICAgIHlBeGUudGlja3MuY2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICAgIH1cbiAgICB9KTtcbiAgICBvcHRpb25zLnNjYWxlcy54QXhlcy5mb3JFYWNoKHhBeGUgPT4ge1xuICAgICAgaWYgKHhBeGUudGlja3MgJiYgeEF4ZS50aWNrcy5jYWxsYmFjaykge1xuICAgICAgICBjb25zdCBjYWxsYmFjayA9IChcbiAgICAgICAgICB0eXBlb2YgeEF4ZS50aWNrcy5jYWxsYmFjayA9PT0gJ3N0cmluZydcbiAgICAgICAgICAgID8gbmV3IEZ1bmN0aW9uKHhBeGUudGlja3MuY2FsbGJhY2spXG4gICAgICAgICAgICA6IHhBeGUudGlja3MuY2FsbGJhY2tcbiAgICAgICAgKSBhcyAodmFsdWU6IGFueSwgaW5kZXg6IGFueSwgdmFsdWVzOiBhbnkpID0+IHN0cmluZyB8IG51bWJlcjtcbiAgICAgICAgeEF4ZS50aWNrcy5jYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmICh0aGlzLmNoYXJ0VHlwZSA9PSAncGllJykge1xuICAgICAgbGV0IG5ld09wdGlvbnMgPSA8YW55Pm9wdGlvbnM7XG4gICAgICBuZXdPcHRpb25zLnBpZWNlTGFiZWwgPSB7XG4gICAgICAgIC4uLntcbiAgICAgICAgICByZW5kZXI6IGZ1bmN0aW9uIChhcmdzOiBhbnkpIHtcbiAgICAgICAgICAgIGlmIChhcmdzLmxhYmVsKSB7XG4gICAgICAgICAgICAgIHJldHVybiBhcmdzLmxhYmVsICsgJzonICsgYXJncy52YWx1ZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJldHVybiBhcmdzLnZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgLi4ubmV3T3B0aW9ucy5waWVjZUxhYmVsLFxuICAgICAgICB9LFxuICAgICAgICBwb3NpdGlvbjogJ291dHNpZGUnLFxuICAgICAgfTtcbiAgICAgIHJldHVybiBuZXdPcHRpb25zO1xuICAgIH1cbiAgICByZXR1cm4gb3B0aW9ucztcbiAgfVxufVxuIiwiIl19