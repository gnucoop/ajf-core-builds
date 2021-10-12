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
import { ChangeDetectionStrategy, Component, ElementRef, Input, Renderer2, ViewEncapsulation } from '@angular/core';
import { Chart, } from 'chart.js';
import * as i0 from "@angular/core";
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
            this._chart.options = {
                ...deepCopy(this._chart.options),
                ...deepCopy(this.options || {})
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
                options: this._fixChartOptions(this.options)
            });
        }
    }
    _fixChartOptions(options) {
        options = options || {};
        if (options.legendCallback) {
            const legendCallback = (typeof options.legendCallback === 'string' ?
                new Function(options.legendCallback) :
                options.legendCallback);
            options.legendCallback = legendCallback;
        }
        if (options.onHover) {
            const onHover = (typeof options.onHover === 'string' ?
                new Function(options.onHover) :
                options.onHover);
            options.onHover = onHover;
        }
        if (options.onClick) {
            const onClick = (typeof options.onClick === 'string' ?
                new Function(options.onClick) :
                options.onClick);
            options.onClick = onClick;
        }
        if (options.onResize) {
            const onResize = (typeof options.onResize === 'string' ?
                new Function(options.onResize) :
                options.onResize);
            options.onResize = onResize;
        }
        if (options.legend) {
            const legend = options.legend;
            if (legend.onClick) {
                const onClick = (typeof legend.onClick === 'string' ?
                    new Function(legend.onClick) :
                    legend.onClick);
                legend.onClick = onClick;
            }
            if (legend.onHover) {
                const onHover = (typeof legend.onHover === 'string' ?
                    new Function(legend.onHover) :
                    legend.onHover);
                legend.onHover = onHover;
            }
            if (legend.onLeave) {
                const onLeave = (typeof legend.onLeave === 'string' ?
                    new Function(legend.onLeave) :
                    legend.onLeave);
                legend.onLeave = onLeave;
            }
            if (legend.labels) {
                const labels = legend.labels;
                if (labels.generateLabels) {
                    const generateLabels = (typeof labels.generateLabels === 'string' ?
                        new Function(labels.generateLabels) :
                        labels.generateLabels);
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
                const custom = (typeof tooltips.custom === 'string' ?
                    new Function(tooltips.custom) :
                    tooltips.custom);
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
                const filter = (typeof tooltips.filter === 'string' ? new Function(tooltips.filter) :
                    tooltips.filter);
                tooltips.filter = filter;
            }
            if (tooltips.itemSort) {
                const itemSort = (typeof tooltips.itemSort === 'string' ? new Function(tooltips.itemSort) :
                    tooltips.itemSort);
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
                const onProgress = (typeof animation.onProgress === 'string' ?
                    new Function(animation.onProgress) :
                    animation.onProgress);
                animation.onProgress = onProgress;
            }
            if (animation.onComplete) {
                const onComplete = (typeof animation.onComplete === 'string' ?
                    new Function(animation.onComplete) :
                    animation.onComplete);
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
                const callback = (typeof yAxe.ticks.callback === 'string' ?
                    new Function(yAxe.ticks.callback) :
                    yAxe.ticks.callback);
                yAxe.ticks.callback = callback;
            }
        });
        options.scales.xAxes.forEach((xAxe) => {
            if (xAxe.ticks && xAxe.ticks.callback) {
                const callback = (typeof xAxe.ticks.callback === 'string' ?
                    new Function(xAxe.ticks.callback) :
                    xAxe.ticks.callback);
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
                    ...newOptions.pieceLabel
                },
                position: 'outside'
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9jaGFydC9jaGFydC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2NoYXJ0L2NoYXJ0Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFVBQVUsRUFDVixLQUFLLEVBRUwsU0FBUyxFQUVULGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQ0wsS0FBSyxHQVFOLE1BQU0sVUFBVSxDQUFDOztBQW1CbEIsTUFBTSxPQUFPLGlCQUFpQjtJQVU1QixZQUFvQixHQUFlLEVBQVUsU0FBb0I7UUFBN0MsUUFBRyxHQUFILEdBQUcsQ0FBWTtRQUFVLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFGekQsMEJBQXFCLEdBQXdCLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBRVAsQ0FBQztJQUVyRSxlQUFlO1FBQ2IsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFBSSxXQUFXLElBQUksT0FBTyxFQUFFO1lBQzFCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUN0QjthQUFNLElBQUksU0FBUyxJQUFJLE9BQU8sSUFBSSxNQUFNLElBQUksT0FBTyxFQUFFO1lBQ3BELElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUNyQjtRQUNELElBQUksVUFBVSxJQUFJLE9BQU8sRUFBRTtZQUN6QixJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsR0FBRyxHQUFHLEVBQUU7Z0JBQ2pDLElBQUksSUFBSSxDQUFDLG1CQUFtQixJQUFJLElBQUksRUFBRTtvQkFDcEMs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UUFBUTtzQkFBaEIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtkZWVwQ29weX0gZnJvbSAnQGFqZi9jb3JlL3V0aWxzJztcbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIFJlbmRlcmVyMixcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBDaGFydCxcbiAgQ2hhcnREYXRhLFxuICBDaGFydExlZ2VuZExhYmVsSXRlbSxcbiAgQ2hhcnRPcHRpb25zLFxuICBDaGFydFBvaW50LFxuICBDaGFydFNpemUsXG4gIENoYXJ0VG9vbHRpcEl0ZW0sXG4gIENoYXJ0VG9vbHRpcE1vZGVsLFxufSBmcm9tICdjaGFydC5qcyc7XG5cbmltcG9ydCB7RXh0ZW5kZWRDaGFydFR5cGV9IGZyb20gJy4vZXh0ZW5kZWQtY2hhcnQtdHlwZSc7XG5cblxuLy8gV2Ugb25seSBuZWVkIHRvIHNldCBjYW52YXNEYXRhVXJsIG9mIHRoZSBBamZDaGFydFdpZGdldEluc3RhbmNlIGhlcmUsXG4vLyBhdm9pZCBpbXBvcnRpbmcgdGhlIGFjdHVhbCBpbnRlcmZhY2UgYmVjYXVzZSBvZiB0aGUgY2lyY3VsYXIgZGVwZW5kZW5jeTpcbmludGVyZmFjZSBDaGFydFdpZGdldEluc3RhbmNlIHtcbiAgY2FudmFzRGF0YVVybD8oKTogc3RyaW5nO1xufVxuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FqZi1jaGFydCcsXG4gIHRlbXBsYXRlVXJsOiAnY2hhcnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWydjaGFydC5jc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgQWpmQ2hhcnRDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkNoYW5nZXMge1xuICBASW5wdXQoKSBkYXRhOiBDaGFydERhdGE7XG4gIEBJbnB1dCgpIG9wdGlvbnM6IENoYXJ0T3B0aW9ucztcbiAgQElucHV0KCkgY2hhcnRUeXBlOiBFeHRlbmRlZENoYXJ0VHlwZTtcbiAgQElucHV0KCkgaW5zdGFuY2U6IENoYXJ0V2lkZ2V0SW5zdGFuY2U7XG5cbiAgcHJpdmF0ZSBfY2hhcnQ6IENoYXJ0fG51bGw7XG4gIHByaXZhdGUgX2NoYXJ0Q2FudmFzRWxlbWVudDogSFRNTENhbnZhc0VsZW1lbnR8bnVsbDtcbiAgcHJpdmF0ZSBfY2hhcnRUeXBlc05lZWRQb2ludHM6IEV4dGVuZGVkQ2hhcnRUeXBlW10gPSBbJ3NjYXR0ZXInLCAnYnViYmxlJ107XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfZWw6IEVsZW1lbnRSZWYsIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIpIHt9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHRoaXMuX3JlYnVpbGRDaGFydCgpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGlmICgnY2hhcnRUeXBlJyBpbiBjaGFuZ2VzKSB7XG4gICAgICB0aGlzLl9yZWJ1aWxkQ2hhcnQoKTtcbiAgICB9IGVsc2UgaWYgKCdvcHRpb25zJyBpbiBjaGFuZ2VzIHx8ICdkYXRhJyBpbiBjaGFuZ2VzKSB7XG4gICAgICB0aGlzLl91cGRhdGVDaGFydCgpO1xuICAgIH1cbiAgICBpZiAoJ2luc3RhbmNlJyBpbiBjaGFuZ2VzKSB7XG4gICAgICB0aGlzLmluc3RhbmNlLmNhbnZhc0RhdGFVcmwgPSAoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLl9jaGFydENhbnZhc0VsZW1lbnQgPT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fY2hhcnRDYW52YXNFbGVtZW50LnRvRGF0YVVSTCgpO1xuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9maXhEYXRhKGNoYXJ0VHlwZTogRXh0ZW5kZWRDaGFydFR5cGUsIGRhdGE6IENoYXJ0RGF0YSk6IENoYXJ0RGF0YSB7XG4gICAgY29uc3QgbmV3RGF0YTogQ2hhcnREYXRhID0gZGVlcENvcHkoZGF0YSk7XG4gICAgbGV0IG1heFBvaW50c051bSA9IDA7XG4gICAgKG5ld0RhdGEuZGF0YXNldHMgfHwgW10pLmZvckVhY2goKGRhdGFzZXQpID0+IHtcbiAgICAgIGlmIChkYXRhc2V0LmxhYmVsID09IG51bGwpIHtcbiAgICAgICAgZGF0YXNldC5sYWJlbCA9ICcnO1xuICAgICAgfVxuICAgICAgbWF4UG9pbnRzTnVtID0gTWF0aC5tYXgobWF4UG9pbnRzTnVtLCAoZGF0YXNldC5kYXRhIHx8IFtdKS5sZW5ndGgpO1xuICAgICAgY29uc3QgZGF0YXNldFR5cGUgPSBkYXRhc2V0LnR5cGUgIT0gbnVsbCA/IDxFeHRlbmRlZENoYXJ0VHlwZT5kYXRhc2V0LnR5cGUgOiBjaGFydFR5cGU7XG4gICAgICBpZiAodGhpcy5fY2hhcnRUeXBlc05lZWRQb2ludHMuaW5kZXhPZihkYXRhc2V0VHlwZSkgPiAtMSkge1xuICAgICAgICBkYXRhc2V0LmRhdGEgPSAoPGFueVtdPihkYXRhc2V0LmRhdGEgfHwgW10pKS5tYXAoKGQsIGlkeCkgPT4ge1xuICAgICAgICAgIGlmICh0eXBlb2YgZCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHJldHVybiA8YW55Pnt4OiBpZHgsIHk6IGQsIHI6IGR9O1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gPENoYXJ0UG9pbnQ+ZDtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgY29uc3QgbGFiZWxzID0gbmV3RGF0YS5sYWJlbHMgfHwgW107XG4gICAgaWYgKG1heFBvaW50c051bSA+IDAgJiYgbGFiZWxzLmxlbmd0aCA8IG1heFBvaW50c051bSkge1xuICAgICAgZm9yIChsZXQgaSA9IGxhYmVscy5sZW5ndGg7IGkgPCBtYXhQb2ludHNOdW07IGkrKykge1xuICAgICAgICBsYWJlbHMucHVzaCgnJyk7XG4gICAgICB9XG4gICAgICBuZXdEYXRhLmxhYmVscyA9IGxhYmVscztcbiAgICB9XG4gICAgcmV0dXJuIG5ld0RhdGE7XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVDaGFydCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fY2hhcnQgPT0gbnVsbCkge1xuICAgICAgdGhpcy5fcmVidWlsZENoYXJ0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICg8YW55PnRoaXMuX2NoYXJ0KS5vcHRpb25zID0ge1xuICAgICAgICAuLi5kZWVwQ29weSgoPGFueT50aGlzLl9jaGFydCkub3B0aW9ucyksXG4gICAgICAgIC4uLmRlZXBDb3B5KHRoaXMub3B0aW9ucyB8fCB7fSlcbiAgICAgIH07XG4gICAgICB0aGlzLl9jaGFydC5kYXRhID0gey4uLmRlZXBDb3B5KHRoaXMuX2NoYXJ0LmRhdGEpLCAuLi5kZWVwQ29weSh0aGlzLmRhdGEpfTtcbiAgICAgIHRoaXMuX2NoYXJ0LnVwZGF0ZSgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3JlYnVpbGRDaGFydCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fY2hhcnQgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fY2hhcnQuZGVzdHJveSgpO1xuICAgICAgdGhpcy5fY2hhcnQgPSBudWxsO1xuICAgIH1cbiAgICBpZiAodGhpcy5fY2hhcnRDYW52YXNFbGVtZW50ICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX2NoYXJ0Q2FudmFzRWxlbWVudC5yZW1vdmUoKTtcbiAgICAgIHRoaXMuX2NoYXJ0Q2FudmFzRWxlbWVudCA9IG51bGw7XG4gICAgfVxuICAgIGlmICh0aGlzLmRhdGEgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fY2hhcnRDYW52YXNFbGVtZW50ID0gdGhpcy5fcmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgICBjb25zdCB3aWRnZXRFeHBvcnRFbGVtZW50OiBIVE1MRWxlbWVudCA9IHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50O1xuICAgICAgY29uc3QgaGVpZ2h0ID0gd2lkZ2V0RXhwb3J0RWxlbWVudC5jbGllbnRIZWlnaHQ7XG4gICAgICBjb25zdCB3aWR0aCA9IHdpZGdldEV4cG9ydEVsZW1lbnQuY2xpZW50V2lkdGg7XG4gICAgICBpZiAod2lkZ2V0RXhwb3J0RWxlbWVudCAhPSBudWxsKSB7XG4gICAgICAgIGlmIChoZWlnaHQgPiAwKSB7XG4gICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fZWwubmF0aXZlRWxlbWVudCwgJ2hlaWdodCcsIGAke2hlaWdodH1weGApO1xuICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX2NoYXJ0Q2FudmFzRWxlbWVudCwgJ2hlaWdodCcsIGAke2hlaWdodH1weGApO1xuICAgICAgICB9XG4gICAgICAgIGlmICh3aWR0aCA+IDApIHtcbiAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9jaGFydENhbnZhc0VsZW1lbnQsICd3aWR0aCcsIHdpZHRoKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fY2hhcnRDYW52YXNFbGVtZW50LCAnd2lkdGgnLCAnaW5oZXJpdCcpO1xuICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9jaGFydENhbnZhc0VsZW1lbnQsICdoZWlnaHQnLCAnaW5oZXJpdCcpO1xuICAgICAgfVxuICAgICAgdGhpcy5fcmVuZGVyZXIuYXBwZW5kQ2hpbGQodGhpcy5fZWwubmF0aXZlRWxlbWVudCwgdGhpcy5fY2hhcnRDYW52YXNFbGVtZW50KTtcbiAgICAgIGNvbnN0IGN0eCA9IHRoaXMuX2NoYXJ0Q2FudmFzRWxlbWVudCEuZ2V0Q29udGV4dCgnMmQnKSBhcyBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XG4gICAgICB0aGlzLl9jaGFydCA9IG5ldyBDaGFydChjdHgsIHtcbiAgICAgICAgdHlwZTogdGhpcy5jaGFydFR5cGUsXG4gICAgICAgIGRhdGE6IHRoaXMuX2ZpeERhdGEodGhpcy5jaGFydFR5cGUsIHRoaXMuZGF0YSksXG4gICAgICAgIG9wdGlvbnM6IHRoaXMuX2ZpeENoYXJ0T3B0aW9ucyh0aGlzLm9wdGlvbnMpXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9maXhDaGFydE9wdGlvbnMob3B0aW9uczogQ2hhcnRPcHRpb25zKTogQ2hhcnRPcHRpb25zIHtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICBpZiAob3B0aW9ucy5sZWdlbmRDYWxsYmFjaykge1xuICAgICAgY29uc3QgbGVnZW5kQ2FsbGJhY2sgPSAodHlwZW9mIG9wdGlvbnMubGVnZW5kQ2FsbGJhY2sgPT09ICdzdHJpbmcnID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgRnVuY3Rpb24ob3B0aW9ucy5sZWdlbmRDYWxsYmFjaykgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMubGVnZW5kQ2FsbGJhY2spIGFzIChjaGFydDogQ2hhcnQpID0+IHN0cmluZztcbiAgICAgIG9wdGlvbnMubGVnZW5kQ2FsbGJhY2sgPSBsZWdlbmRDYWxsYmFjaztcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMub25Ib3Zlcikge1xuICAgICAgY29uc3Qgb25Ib3ZlciA9XG4gICAgICAgICAgKHR5cGVvZiBvcHRpb25zLm9uSG92ZXIgPT09ICdzdHJpbmcnID9cbiAgICAgICAgICAgICAgIG5ldyBGdW5jdGlvbihvcHRpb25zLm9uSG92ZXIpIDpcbiAgICAgICAgICAgICAgIG9wdGlvbnMub25Ib3ZlcikgYXMgKHRoaXM6IENoYXJ0LCBldmVudDogTW91c2VFdmVudCwgYWN0aXZlRWxlbWVudHM6IHt9W10pID0+IGFueTtcbiAgICAgIG9wdGlvbnMub25Ib3ZlciA9IG9uSG92ZXI7XG4gICAgfVxuICAgIGlmIChvcHRpb25zLm9uQ2xpY2spIHtcbiAgICAgIGNvbnN0IG9uQ2xpY2sgPSAodHlwZW9mIG9wdGlvbnMub25DbGljayA9PT0gJ3N0cmluZycgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IEZ1bmN0aW9uKG9wdGlvbnMub25DbGljaykgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5vbkNsaWNrKSBhcyAoZXZlbnQ/OiBNb3VzZUV2ZW50LCBhY3RpdmVFbGVtZW50cz86IHt9W10pID0+IGFueTtcbiAgICAgIG9wdGlvbnMub25DbGljayA9IG9uQ2xpY2s7XG4gICAgfVxuICAgIGlmIChvcHRpb25zLm9uUmVzaXplKSB7XG4gICAgICBjb25zdCBvblJlc2l6ZSA9ICh0eXBlb2Ygb3B0aW9ucy5vblJlc2l6ZSA9PT0gJ3N0cmluZycgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBGdW5jdGlvbihvcHRpb25zLm9uUmVzaXplKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5vblJlc2l6ZSkgYXMgKHRoaXM6IENoYXJ0LCBuZXdTaXplOiBDaGFydFNpemUpID0+IHZvaWQ7XG4gICAgICBvcHRpb25zLm9uUmVzaXplID0gb25SZXNpemU7XG4gICAgfVxuICAgIGlmIChvcHRpb25zLmxlZ2VuZCkge1xuICAgICAgY29uc3QgbGVnZW5kID0gb3B0aW9ucy5sZWdlbmQ7XG4gICAgICBpZiAobGVnZW5kLm9uQ2xpY2spIHtcbiAgICAgICAgY29uc3Qgb25DbGljayA9XG4gICAgICAgICAgICAodHlwZW9mIGxlZ2VuZC5vbkNsaWNrID09PSAnc3RyaW5nJyA/XG4gICAgICAgICAgICAgICAgIG5ldyBGdW5jdGlvbihsZWdlbmQub25DbGljaykgOlxuICAgICAgICAgICAgICAgICBsZWdlbmQub25DbGljaykgYXMgKGV2ZW50OiBNb3VzZUV2ZW50LCBsZWdlbmRJdGVtOiBDaGFydExlZ2VuZExhYmVsSXRlbSkgPT4gdm9pZDtcbiAgICAgICAgbGVnZW5kLm9uQ2xpY2sgPSBvbkNsaWNrO1xuICAgICAgfVxuICAgICAgaWYgKGxlZ2VuZC5vbkhvdmVyKSB7XG4gICAgICAgIGNvbnN0IG9uSG92ZXIgPVxuICAgICAgICAgICAgKHR5cGVvZiBsZWdlbmQub25Ib3ZlciA9PT0gJ3N0cmluZycgP1xuICAgICAgICAgICAgICAgICBuZXcgRnVuY3Rpb24obGVnZW5kLm9uSG92ZXIpIDpcbiAgICAgICAgICAgICAgICAgbGVnZW5kLm9uSG92ZXIpIGFzIChldmVudDogTW91c2VFdmVudCwgbGVnZW5kSXRlbTogQ2hhcnRMZWdlbmRMYWJlbEl0ZW0pID0+IHZvaWQ7XG4gICAgICAgIGxlZ2VuZC5vbkhvdmVyID0gb25Ib3ZlcjtcbiAgICAgIH1cbiAgICAgIGlmIChsZWdlbmQub25MZWF2ZSkge1xuICAgICAgICBjb25zdCBvbkxlYXZlID1cbiAgICAgICAgICAgICh0eXBlb2YgbGVnZW5kLm9uTGVhdmUgPT09ICdzdHJpbmcnID9cbiAgICAgICAgICAgICAgICAgbmV3IEZ1bmN0aW9uKGxlZ2VuZC5vbkxlYXZlKSA6XG4gICAgICAgICAgICAgICAgIGxlZ2VuZC5vbkxlYXZlKSBhcyAoZXZlbnQ6IE1vdXNlRXZlbnQsIGxlZ2VuZEl0ZW06IENoYXJ0TGVnZW5kTGFiZWxJdGVtKSA9PiB2b2lkO1xuICAgICAgICBsZWdlbmQub25MZWF2ZSA9IG9uTGVhdmU7XG4gICAgICB9XG4gICAgICBpZiAobGVnZW5kLmxhYmVscykge1xuICAgICAgICBjb25zdCBsYWJlbHMgPSBsZWdlbmQubGFiZWxzO1xuICAgICAgICBpZiAobGFiZWxzLmdlbmVyYXRlTGFiZWxzKSB7XG4gICAgICAgICAgY29uc3QgZ2VuZXJhdGVMYWJlbHMgPSAodHlwZW9mIGxhYmVscy5nZW5lcmF0ZUxhYmVscyA9PT0gJ3N0cmluZycgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgRnVuY3Rpb24obGFiZWxzLmdlbmVyYXRlTGFiZWxzKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVscy5nZW5lcmF0ZUxhYmVscykgYXMgKGNoYXJ0OiBDaGFydCkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDaGFydExlZ2VuZExhYmVsSXRlbVtdO1xuICAgICAgICAgIGxhYmVscy5nZW5lcmF0ZUxhYmVscyA9IGdlbmVyYXRlTGFiZWxzO1xuICAgICAgICB9XG4gICAgICAgIGlmIChsYWJlbHMuZmlsdGVyKSB7XG4gICAgICAgICAgY29uc3QgZmlsdGVyID1cbiAgICAgICAgICAgICAgKHR5cGVvZiBsYWJlbHMuZmlsdGVyID09PSAnc3RyaW5nJyA/IG5ldyBGdW5jdGlvbihsYWJlbHMuZmlsdGVyKSA6IGxhYmVscy5maWx0ZXIpIGFzIChcbiAgICAgICAgICAgICAgICAgIGxlZ2VuZEl0ZW06IENoYXJ0TGVnZW5kTGFiZWxJdGVtLCBkYXRhOiBDaGFydERhdGEpID0+IGFueTtcbiAgICAgICAgICBsYWJlbHMuZmlsdGVyID0gZmlsdGVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChvcHRpb25zLnRvb2x0aXBzKSB7XG4gICAgICBjb25zdCB0b29sdGlwcyA9IG9wdGlvbnMudG9vbHRpcHM7XG4gICAgICBpZiAodG9vbHRpcHMuY3VzdG9tKSB7XG4gICAgICAgIGNvbnN0IGN1c3RvbSA9ICh0eXBlb2YgdG9vbHRpcHMuY3VzdG9tID09PSAnc3RyaW5nJyA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IEZ1bmN0aW9uKHRvb2x0aXBzLmN1c3RvbSkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvb2x0aXBzLmN1c3RvbSkgYXMgKHRvb2x0aXBNb2RlbDogQ2hhcnRUb29sdGlwTW9kZWwpID0+IHZvaWQ7XG4gICAgICAgIHRvb2x0aXBzLmN1c3RvbSA9IGN1c3RvbTtcbiAgICAgIH1cbiAgICAgIGlmICh0b29sdGlwcy5jYWxsYmFja3MpIHtcbiAgICAgICAgY29uc3QgY2FsbGJhY2tzID0gdG9vbHRpcHMuY2FsbGJhY2tzO1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBjYWxsYmFja3MpIHtcbiAgICAgICAgICBjb25zdCBjYWxsYmFjayA9IChjYWxsYmFja3MgYXMgYW55KVtrZXldIGFzIChpdGVtOiBDaGFydFRvb2x0aXBJdGVtW10sIGRhdGE6IENoYXJ0RGF0YSkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJpbmcgfCBzdHJpbmdbXTtcbiAgICAgICAgICAoY2FsbGJhY2tzIGFzIGFueSlba2V5XSA9XG4gICAgICAgICAgICAgIHR5cGVvZiBjYWxsYmFjayA9PT0gJ3N0cmluZycgPyBuZXcgRnVuY3Rpb24oY2FsbGJhY2spIDogY2FsbGJhY2s7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICh0b29sdGlwcy5maWx0ZXIpIHtcbiAgICAgICAgdHlwZSBGaWx0ZXJGbiA9IChpdGVtOiBDaGFydFRvb2x0aXBJdGVtLCBkYXRhOiBDaGFydERhdGEpID0+IGJvb2xlYW47XG4gICAgICAgIGNvbnN0IGZpbHRlciA9ICh0eXBlb2YgdG9vbHRpcHMuZmlsdGVyID09PSAnc3RyaW5nJyA/IG5ldyBGdW5jdGlvbih0b29sdGlwcy5maWx0ZXIpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9vbHRpcHMuZmlsdGVyKSBhcyBGaWx0ZXJGbjtcbiAgICAgICAgdG9vbHRpcHMuZmlsdGVyID0gZmlsdGVyO1xuICAgICAgfVxuICAgICAgaWYgKHRvb2x0aXBzLml0ZW1Tb3J0KSB7XG4gICAgICAgIHR5cGUgU29ydEZuID0gKGl0ZW1BOiBDaGFydFRvb2x0aXBJdGVtLCBpdGVtQjogQ2hhcnRUb29sdGlwSXRlbSwgZGF0YT86IENoYXJ0RGF0YSkgPT5cbiAgICAgICAgICAgIG51bWJlcjtcbiAgICAgICAgY29uc3QgaXRlbVNvcnQgPSAodHlwZW9mIHRvb2x0aXBzLml0ZW1Tb3J0ID09PSAnc3RyaW5nJyA/IG5ldyBGdW5jdGlvbih0b29sdGlwcy5pdGVtU29ydCkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9vbHRpcHMuaXRlbVNvcnQpIGFzIFNvcnRGbjtcbiAgICAgICAgdG9vbHRpcHMuaXRlbVNvcnQgPSBpdGVtU29ydDtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKG9wdGlvbnMuaG92ZXIpIHtcbiAgICAgIGNvbnN0IGhvdmVyID0gb3B0aW9ucy5ob3ZlcjtcbiAgICAgIGlmIChob3Zlci5vbkhvdmVyKSB7XG4gICAgICAgIGNvbnN0IG9uSG92ZXIgPVxuICAgICAgICAgICAgKHR5cGVvZiBob3Zlci5vbkhvdmVyID09PSAnc3RyaW5nJyA/IG5ldyBGdW5jdGlvbihob3Zlci5vbkhvdmVyKSA6IGhvdmVyLm9uSG92ZXIpIGFzIChcbiAgICAgICAgICAgICAgICB0aGlzOiBDaGFydCwgZXZlbnQ6IE1vdXNlRXZlbnQsIGFjdGl2ZUVsZW1lbnRzOiB7fVtdKSA9PiBhbnk7XG4gICAgICAgIGhvdmVyLm9uSG92ZXIgPSBvbkhvdmVyO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAob3B0aW9ucy5hbmltYXRpb24pIHtcbiAgICAgIGNvbnN0IGFuaW1hdGlvbiA9IG9wdGlvbnMuYW5pbWF0aW9uO1xuICAgICAgaWYgKGFuaW1hdGlvbi5vblByb2dyZXNzKSB7XG4gICAgICAgIGNvbnN0IG9uUHJvZ3Jlc3MgPSAodHlwZW9mIGFuaW1hdGlvbi5vblByb2dyZXNzID09PSAnc3RyaW5nJyA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBGdW5jdGlvbihhbmltYXRpb24ub25Qcm9ncmVzcykgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRpb24ub25Qcm9ncmVzcykgYXMgKGNoYXJ0OiBhbnkpID0+IHZvaWQ7XG4gICAgICAgIGFuaW1hdGlvbi5vblByb2dyZXNzID0gb25Qcm9ncmVzcztcbiAgICAgIH1cbiAgICAgIGlmIChhbmltYXRpb24ub25Db21wbGV0ZSkge1xuICAgICAgICBjb25zdCBvbkNvbXBsZXRlID0gKHR5cGVvZiBhbmltYXRpb24ub25Db21wbGV0ZSA9PT0gJ3N0cmluZycgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgRnVuY3Rpb24oYW5pbWF0aW9uLm9uQ29tcGxldGUpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uLm9uQ29tcGxldGUpIGFzIChjaGFydDogYW55KSA9PiB2b2lkO1xuICAgICAgICBhbmltYXRpb24ub25Db21wbGV0ZSA9IG9uQ29tcGxldGU7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChvcHRpb25zLnNjYWxlcyA9PSBudWxsKSB7XG4gICAgICBvcHRpb25zLnNjYWxlcyA9IHt4QXhlczogW10sIHlBeGVzOiBbXX07XG4gICAgfVxuICAgIGlmIChvcHRpb25zLnNjYWxlcy54QXhlcyA9PSBudWxsKSB7XG4gICAgICBvcHRpb25zLnNjYWxlcy54QXhlcyA9IFtdO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy5zY2FsZXMueUF4ZXMgPT0gbnVsbCkge1xuICAgICAgb3B0aW9ucy5zY2FsZXMueUF4ZXMgPSBbXTtcbiAgICB9XG4gICAgb3B0aW9ucy5zY2FsZXMueUF4ZXMuZm9yRWFjaCgoeUF4ZSkgPT4ge1xuICAgICAgaWYgKHlBeGUudGlja3MgJiYgeUF4ZS50aWNrcy5jYWxsYmFjaykge1xuICAgICAgICBjb25zdCBjYWxsYmFjayA9ICh0eXBlb2YgeUF4ZS50aWNrcy5jYWxsYmFjayA9PT0gJ3N0cmluZycgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IEZ1bmN0aW9uKHlBeGUudGlja3MuY2FsbGJhY2spIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHlBeGUudGlja3MuY2FsbGJhY2spIGFzICh2YWx1ZTogYW55LCBpbmRleDogYW55LCB2YWx1ZXM6IGFueSkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RyaW5nIHwgbnVtYmVyO1xuICAgICAgICB5QXhlLnRpY2tzLmNhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgICB9XG4gICAgfSk7XG4gICAgb3B0aW9ucy5zY2FsZXMueEF4ZXMuZm9yRWFjaCgoeEF4ZSkgPT4ge1xuICAgICAgaWYgKHhBeGUudGlja3MgJiYgeEF4ZS50aWNrcy5jYWxsYmFjaykge1xuICAgICAgICBjb25zdCBjYWxsYmFjayA9ICh0eXBlb2YgeEF4ZS50aWNrcy5jYWxsYmFjayA9PT0gJ3N0cmluZycgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IEZ1bmN0aW9uKHhBeGUudGlja3MuY2FsbGJhY2spIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHhBeGUudGlja3MuY2FsbGJhY2spIGFzICh2YWx1ZTogYW55LCBpbmRleDogYW55LCB2YWx1ZXM6IGFueSkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RyaW5nIHwgbnVtYmVyO1xuICAgICAgICB4QXhlLnRpY2tzLmNhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKHRoaXMuY2hhcnRUeXBlID09ICdwaWUnKSB7XG4gICAgICBsZXQgbmV3T3B0aW9ucyA9IDxhbnk+b3B0aW9ucztcbiAgICAgIG5ld09wdGlvbnMucGllY2VMYWJlbCA9IHtcbiAgICAgICAgLi4ue1xuICAgICAgICAgIHJlbmRlcjogZnVuY3Rpb24oYXJnczogYW55KSB7XG4gICAgICAgICAgICBpZiAoYXJncy5sYWJlbCkge1xuICAgICAgICAgICAgICByZXR1cm4gYXJncy5sYWJlbCArICc6JyArIGFyZ3MudmFsdWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXR1cm4gYXJncy52YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIC4uLm5ld09wdGlvbnMucGllY2VMYWJlbFxuICAgICAgICB9LFxuICAgICAgICBwb3NpdGlvbjogJ291dHNpZGUnXG4gICAgICB9O1xuICAgICAgcmV0dXJuIG5ld09wdGlvbnM7XG4gICAgfVxuICAgIHJldHVybiBvcHRpb25zO1xuICB9XG59XG4iLCIiXX0=