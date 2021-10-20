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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9jaGFydC9jaGFydC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2NoYXJ0L2NoYXJ0Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFVBQVUsRUFDVixLQUFLLEVBRUwsU0FBUyxFQUVULGlCQUFpQixHQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQ0wsS0FBSyxHQVFOLE1BQU0sVUFBVSxDQUFDOztBQWlCbEIsTUFBTSxPQUFPLGlCQUFpQjtJQVU1QixZQUFvQixHQUFlLEVBQVUsU0FBb0I7UUFBN0MsUUFBRyxHQUFILEdBQUcsQ0FBWTtRQUFVLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFGekQsMEJBQXFCLEdBQXdCLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBRVAsQ0FBQztJQUVyRSxlQUFlO1FBQ2IsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFBSSxXQUFXLElBQUksT0FBTyxFQUFFO1lBQzFCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUN0QjthQUFNLElBQUksU0FBUyxJQUFJLE9BQU8sSUFBSSxNQUFNLElBQUksT0FBTyxFQUFFO1lBQ3BELElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUNyQjtRQUNELElBQUksVUFBVSxJQUFJLE9BQU8sRUFBRTtZQUN6QixJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsR0FBRyxHQUFHLEVBQUU7Z0JBQ2pDLElBQUksSUFBSSxDQUFDLG1CQUFtQixJQUFJLElBQUksRUFBRTtvQkFDcEMs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XG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge2RlZXBDb3B5fSBmcm9tICdAYWpmL2NvcmUvdXRpbHMnO1xuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgUmVuZGVyZXIyLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBDaGFydCxcbiAgQ2hhcnREYXRhLFxuICBDaGFydExlZ2VuZExhYmVsSXRlbSxcbiAgQ2hhcnRPcHRpb25zLFxuICBDaGFydFBvaW50LFxuICBDaGFydFNpemUsXG4gIENoYXJ0VG9vbHRpcEl0ZW0sXG4gIENoYXJ0VG9vbHRpcE1vZGVsLFxufSBmcm9tICdjaGFydC5qcyc7XG5cbmltcG9ydCB7RXh0ZW5kZWRDaGFydFR5cGV9IGZyb20gJy4vZXh0ZW5kZWQtY2hhcnQtdHlwZSc7XG5cbi8vIFdlIG9ubHkgbmVlZCB0byBzZXQgY2FudmFzRGF0YVVybCBvZiB0aGUgQWpmQ2hhcnRXaWRnZXRJbnN0YW5jZSBoZXJlLFxuLy8gYXZvaWQgaW1wb3J0aW5nIHRoZSBhY3R1YWwgaW50ZXJmYWNlIGJlY2F1c2Ugb2YgdGhlIGNpcmN1bGFyIGRlcGVuZGVuY3k6XG5pbnRlcmZhY2UgQ2hhcnRXaWRnZXRJbnN0YW5jZSB7XG4gIGNhbnZhc0RhdGFVcmw/KCk6IHN0cmluZztcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWpmLWNoYXJ0JyxcbiAgdGVtcGxhdGVVcmw6ICdjaGFydC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ2NoYXJ0LmNzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbn0pXG5leHBvcnQgY2xhc3MgQWpmQ2hhcnRDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkNoYW5nZXMge1xuICBASW5wdXQoKSBkYXRhOiBDaGFydERhdGE7XG4gIEBJbnB1dCgpIG9wdGlvbnM6IENoYXJ0T3B0aW9ucztcbiAgQElucHV0KCkgY2hhcnRUeXBlOiBFeHRlbmRlZENoYXJ0VHlwZTtcbiAgQElucHV0KCkgaW5zdGFuY2U6IENoYXJ0V2lkZ2V0SW5zdGFuY2U7XG5cbiAgcHJpdmF0ZSBfY2hhcnQ6IENoYXJ0IHwgbnVsbDtcbiAgcHJpdmF0ZSBfY2hhcnRDYW52YXNFbGVtZW50OiBIVE1MQ2FudmFzRWxlbWVudCB8IG51bGw7XG4gIHByaXZhdGUgX2NoYXJ0VHlwZXNOZWVkUG9pbnRzOiBFeHRlbmRlZENoYXJ0VHlwZVtdID0gWydzY2F0dGVyJywgJ2J1YmJsZSddO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2VsOiBFbGVtZW50UmVmLCBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyKSB7fVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9yZWJ1aWxkQ2hhcnQoKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBpZiAoJ2NoYXJ0VHlwZScgaW4gY2hhbmdlcykge1xuICAgICAgdGhpcy5fcmVidWlsZENoYXJ0KCk7XG4gICAgfSBlbHNlIGlmICgnb3B0aW9ucycgaW4gY2hhbmdlcyB8fCAnZGF0YScgaW4gY2hhbmdlcykge1xuICAgICAgdGhpcy5fdXBkYXRlQ2hhcnQoKTtcbiAgICB9XG4gICAgaWYgKCdpbnN0YW5jZScgaW4gY2hhbmdlcykge1xuICAgICAgdGhpcy5pbnN0YW5jZS5jYW52YXNEYXRhVXJsID0gKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5fY2hhcnRDYW52YXNFbGVtZW50ID09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX2NoYXJ0Q2FudmFzRWxlbWVudC50b0RhdGFVUkwoKTtcbiAgICAgIH07XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfZml4RGF0YShjaGFydFR5cGU6IEV4dGVuZGVkQ2hhcnRUeXBlLCBkYXRhOiBDaGFydERhdGEpOiBDaGFydERhdGEge1xuICAgIGNvbnN0IG5ld0RhdGE6IENoYXJ0RGF0YSA9IGRlZXBDb3B5KGRhdGEpO1xuICAgIGxldCBtYXhQb2ludHNOdW0gPSAwO1xuICAgIChuZXdEYXRhLmRhdGFzZXRzIHx8IFtdKS5mb3JFYWNoKGRhdGFzZXQgPT4ge1xuICAgICAgaWYgKGRhdGFzZXQubGFiZWwgPT0gbnVsbCkge1xuICAgICAgICBkYXRhc2V0LmxhYmVsID0gJyc7XG4gICAgICB9XG4gICAgICBtYXhQb2ludHNOdW0gPSBNYXRoLm1heChtYXhQb2ludHNOdW0sIChkYXRhc2V0LmRhdGEgfHwgW10pLmxlbmd0aCk7XG4gICAgICBjb25zdCBkYXRhc2V0VHlwZSA9IGRhdGFzZXQudHlwZSAhPSBudWxsID8gPEV4dGVuZGVkQ2hhcnRUeXBlPmRhdGFzZXQudHlwZSA6IGNoYXJ0VHlwZTtcbiAgICAgIGlmICh0aGlzLl9jaGFydFR5cGVzTmVlZFBvaW50cy5pbmRleE9mKGRhdGFzZXRUeXBlKSA+IC0xKSB7XG4gICAgICAgIGRhdGFzZXQuZGF0YSA9ICg8YW55W10+KGRhdGFzZXQuZGF0YSB8fCBbXSkpLm1hcCgoZCwgaWR4KSA9PiB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBkID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgcmV0dXJuIDxhbnk+e3g6IGlkeCwgeTogZCwgcjogZH07XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiA8Q2hhcnRQb2ludD5kO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBjb25zdCBsYWJlbHMgPSBuZXdEYXRhLmxhYmVscyB8fCBbXTtcbiAgICBpZiAobWF4UG9pbnRzTnVtID4gMCAmJiBsYWJlbHMubGVuZ3RoIDwgbWF4UG9pbnRzTnVtKSB7XG4gICAgICBmb3IgKGxldCBpID0gbGFiZWxzLmxlbmd0aDsgaSA8IG1heFBvaW50c051bTsgaSsrKSB7XG4gICAgICAgIGxhYmVscy5wdXNoKCcnKTtcbiAgICAgIH1cbiAgICAgIG5ld0RhdGEubGFiZWxzID0gbGFiZWxzO1xuICAgIH1cbiAgICByZXR1cm4gbmV3RGF0YTtcbiAgfVxuXG4gIHByaXZhdGUgX3VwZGF0ZUNoYXJ0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9jaGFydCA9PSBudWxsKSB7XG4gICAgICB0aGlzLl9yZWJ1aWxkQ2hhcnQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgKDxhbnk+dGhpcy5fY2hhcnQpLm9wdGlvbnMgPSB7XG4gICAgICAgIC4uLmRlZXBDb3B5KCg8YW55PnRoaXMuX2NoYXJ0KS5vcHRpb25zKSxcbiAgICAgICAgLi4uZGVlcENvcHkodGhpcy5vcHRpb25zIHx8IHt9KSxcbiAgICAgIH07XG4gICAgICB0aGlzLl9jaGFydC5kYXRhID0gey4uLmRlZXBDb3B5KHRoaXMuX2NoYXJ0LmRhdGEpLCAuLi5kZWVwQ29weSh0aGlzLmRhdGEpfTtcbiAgICAgIHRoaXMuX2NoYXJ0LnVwZGF0ZSgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3JlYnVpbGRDaGFydCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fY2hhcnQgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fY2hhcnQuZGVzdHJveSgpO1xuICAgICAgdGhpcy5fY2hhcnQgPSBudWxsO1xuICAgIH1cbiAgICBpZiAodGhpcy5fY2hhcnRDYW52YXNFbGVtZW50ICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX2NoYXJ0Q2FudmFzRWxlbWVudC5yZW1vdmUoKTtcbiAgICAgIHRoaXMuX2NoYXJ0Q2FudmFzRWxlbWVudCA9IG51bGw7XG4gICAgfVxuICAgIGlmICh0aGlzLmRhdGEgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fY2hhcnRDYW52YXNFbGVtZW50ID0gdGhpcy5fcmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgICBjb25zdCB3aWRnZXRFeHBvcnRFbGVtZW50OiBIVE1MRWxlbWVudCA9IHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50O1xuICAgICAgY29uc3QgaGVpZ2h0ID0gd2lkZ2V0RXhwb3J0RWxlbWVudC5jbGllbnRIZWlnaHQ7XG4gICAgICBjb25zdCB3aWR0aCA9IHdpZGdldEV4cG9ydEVsZW1lbnQuY2xpZW50V2lkdGg7XG4gICAgICBpZiAod2lkZ2V0RXhwb3J0RWxlbWVudCAhPSBudWxsKSB7XG4gICAgICAgIGlmIChoZWlnaHQgPiAwKSB7XG4gICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fZWwubmF0aXZlRWxlbWVudCwgJ2hlaWdodCcsIGAke2hlaWdodH1weGApO1xuICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX2NoYXJ0Q2FudmFzRWxlbWVudCwgJ2hlaWdodCcsIGAke2hlaWdodH1weGApO1xuICAgICAgICB9XG4gICAgICAgIGlmICh3aWR0aCA+IDApIHtcbiAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9jaGFydENhbnZhc0VsZW1lbnQsICd3aWR0aCcsIHdpZHRoKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fY2hhcnRDYW52YXNFbGVtZW50LCAnd2lkdGgnLCAnaW5oZXJpdCcpO1xuICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9jaGFydENhbnZhc0VsZW1lbnQsICdoZWlnaHQnLCAnaW5oZXJpdCcpO1xuICAgICAgfVxuICAgICAgdGhpcy5fcmVuZGVyZXIuYXBwZW5kQ2hpbGQodGhpcy5fZWwubmF0aXZlRWxlbWVudCwgdGhpcy5fY2hhcnRDYW52YXNFbGVtZW50KTtcbiAgICAgIGNvbnN0IGN0eCA9IHRoaXMuX2NoYXJ0Q2FudmFzRWxlbWVudCEuZ2V0Q29udGV4dCgnMmQnKSBhcyBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XG4gICAgICB0aGlzLl9jaGFydCA9IG5ldyBDaGFydChjdHgsIHtcbiAgICAgICAgdHlwZTogdGhpcy5jaGFydFR5cGUsXG4gICAgICAgIGRhdGE6IHRoaXMuX2ZpeERhdGEodGhpcy5jaGFydFR5cGUsIHRoaXMuZGF0YSksXG4gICAgICAgIG9wdGlvbnM6IHRoaXMuX2ZpeENoYXJ0T3B0aW9ucyh0aGlzLm9wdGlvbnMpLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfZml4Q2hhcnRPcHRpb25zKG9wdGlvbnM6IENoYXJ0T3B0aW9ucyk6IENoYXJ0T3B0aW9ucyB7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgaWYgKG9wdGlvbnMubGVnZW5kQ2FsbGJhY2spIHtcbiAgICAgIGNvbnN0IGxlZ2VuZENhbGxiYWNrID0gKFxuICAgICAgICB0eXBlb2Ygb3B0aW9ucy5sZWdlbmRDYWxsYmFjayA9PT0gJ3N0cmluZydcbiAgICAgICAgICA/IG5ldyBGdW5jdGlvbihvcHRpb25zLmxlZ2VuZENhbGxiYWNrKVxuICAgICAgICAgIDogb3B0aW9ucy5sZWdlbmRDYWxsYmFja1xuICAgICAgKSBhcyAoY2hhcnQ6IENoYXJ0KSA9PiBzdHJpbmc7XG4gICAgICBvcHRpb25zLmxlZ2VuZENhbGxiYWNrID0gbGVnZW5kQ2FsbGJhY2s7XG4gICAgfVxuICAgIGlmIChvcHRpb25zLm9uSG92ZXIpIHtcbiAgICAgIGNvbnN0IG9uSG92ZXIgPSAoXG4gICAgICAgIHR5cGVvZiBvcHRpb25zLm9uSG92ZXIgPT09ICdzdHJpbmcnID8gbmV3IEZ1bmN0aW9uKG9wdGlvbnMub25Ib3ZlcikgOiBvcHRpb25zLm9uSG92ZXJcbiAgICAgICkgYXMgKHRoaXM6IENoYXJ0LCBldmVudDogTW91c2VFdmVudCwgYWN0aXZlRWxlbWVudHM6IHt9W10pID0+IGFueTtcbiAgICAgIG9wdGlvbnMub25Ib3ZlciA9IG9uSG92ZXI7XG4gICAgfVxuICAgIGlmIChvcHRpb25zLm9uQ2xpY2spIHtcbiAgICAgIGNvbnN0IG9uQ2xpY2sgPSAoXG4gICAgICAgIHR5cGVvZiBvcHRpb25zLm9uQ2xpY2sgPT09ICdzdHJpbmcnID8gbmV3IEZ1bmN0aW9uKG9wdGlvbnMub25DbGljaykgOiBvcHRpb25zLm9uQ2xpY2tcbiAgICAgICkgYXMgKGV2ZW50PzogTW91c2VFdmVudCwgYWN0aXZlRWxlbWVudHM/OiB7fVtdKSA9PiBhbnk7XG4gICAgICBvcHRpb25zLm9uQ2xpY2sgPSBvbkNsaWNrO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy5vblJlc2l6ZSkge1xuICAgICAgY29uc3Qgb25SZXNpemUgPSAoXG4gICAgICAgIHR5cGVvZiBvcHRpb25zLm9uUmVzaXplID09PSAnc3RyaW5nJyA/IG5ldyBGdW5jdGlvbihvcHRpb25zLm9uUmVzaXplKSA6IG9wdGlvbnMub25SZXNpemVcbiAgICAgICkgYXMgKHRoaXM6IENoYXJ0LCBuZXdTaXplOiBDaGFydFNpemUpID0+IHZvaWQ7XG4gICAgICBvcHRpb25zLm9uUmVzaXplID0gb25SZXNpemU7XG4gICAgfVxuICAgIGlmIChvcHRpb25zLmxlZ2VuZCkge1xuICAgICAgY29uc3QgbGVnZW5kID0gb3B0aW9ucy5sZWdlbmQ7XG4gICAgICBpZiAobGVnZW5kLm9uQ2xpY2spIHtcbiAgICAgICAgY29uc3Qgb25DbGljayA9IChcbiAgICAgICAgICB0eXBlb2YgbGVnZW5kLm9uQ2xpY2sgPT09ICdzdHJpbmcnID8gbmV3IEZ1bmN0aW9uKGxlZ2VuZC5vbkNsaWNrKSA6IGxlZ2VuZC5vbkNsaWNrXG4gICAgICAgICkgYXMgKGV2ZW50OiBNb3VzZUV2ZW50LCBsZWdlbmRJdGVtOiBDaGFydExlZ2VuZExhYmVsSXRlbSkgPT4gdm9pZDtcbiAgICAgICAgbGVnZW5kLm9uQ2xpY2sgPSBvbkNsaWNrO1xuICAgICAgfVxuICAgICAgaWYgKGxlZ2VuZC5vbkhvdmVyKSB7XG4gICAgICAgIGNvbnN0IG9uSG92ZXIgPSAoXG4gICAgICAgICAgdHlwZW9mIGxlZ2VuZC5vbkhvdmVyID09PSAnc3RyaW5nJyA/IG5ldyBGdW5jdGlvbihsZWdlbmQub25Ib3ZlcikgOiBsZWdlbmQub25Ib3ZlclxuICAgICAgICApIGFzIChldmVudDogTW91c2VFdmVudCwgbGVnZW5kSXRlbTogQ2hhcnRMZWdlbmRMYWJlbEl0ZW0pID0+IHZvaWQ7XG4gICAgICAgIGxlZ2VuZC5vbkhvdmVyID0gb25Ib3ZlcjtcbiAgICAgIH1cbiAgICAgIGlmIChsZWdlbmQub25MZWF2ZSkge1xuICAgICAgICBjb25zdCBvbkxlYXZlID0gKFxuICAgICAgICAgIHR5cGVvZiBsZWdlbmQub25MZWF2ZSA9PT0gJ3N0cmluZycgPyBuZXcgRnVuY3Rpb24obGVnZW5kLm9uTGVhdmUpIDogbGVnZW5kLm9uTGVhdmVcbiAgICAgICAgKSBhcyAoZXZlbnQ6IE1vdXNlRXZlbnQsIGxlZ2VuZEl0ZW06IENoYXJ0TGVnZW5kTGFiZWxJdGVtKSA9PiB2b2lkO1xuICAgICAgICBsZWdlbmQub25MZWF2ZSA9IG9uTGVhdmU7XG4gICAgICB9XG4gICAgICBpZiAobGVnZW5kLmxhYmVscykge1xuICAgICAgICBjb25zdCBsYWJlbHMgPSBsZWdlbmQubGFiZWxzO1xuICAgICAgICBpZiAobGFiZWxzLmdlbmVyYXRlTGFiZWxzKSB7XG4gICAgICAgICAgY29uc3QgZ2VuZXJhdGVMYWJlbHMgPSAoXG4gICAgICAgICAgICB0eXBlb2YgbGFiZWxzLmdlbmVyYXRlTGFiZWxzID09PSAnc3RyaW5nJ1xuICAgICAgICAgICAgICA/IG5ldyBGdW5jdGlvbihsYWJlbHMuZ2VuZXJhdGVMYWJlbHMpXG4gICAgICAgICAgICAgIDogbGFiZWxzLmdlbmVyYXRlTGFiZWxzXG4gICAgICAgICAgKSBhcyAoY2hhcnQ6IENoYXJ0KSA9PiBDaGFydExlZ2VuZExhYmVsSXRlbVtdO1xuICAgICAgICAgIGxhYmVscy5nZW5lcmF0ZUxhYmVscyA9IGdlbmVyYXRlTGFiZWxzO1xuICAgICAgICB9XG4gICAgICAgIGlmIChsYWJlbHMuZmlsdGVyKSB7XG4gICAgICAgICAgY29uc3QgZmlsdGVyID0gKFxuICAgICAgICAgICAgdHlwZW9mIGxhYmVscy5maWx0ZXIgPT09ICdzdHJpbmcnID8gbmV3IEZ1bmN0aW9uKGxhYmVscy5maWx0ZXIpIDogbGFiZWxzLmZpbHRlclxuICAgICAgICAgICkgYXMgKGxlZ2VuZEl0ZW06IENoYXJ0TGVnZW5kTGFiZWxJdGVtLCBkYXRhOiBDaGFydERhdGEpID0+IGFueTtcbiAgICAgICAgICBsYWJlbHMuZmlsdGVyID0gZmlsdGVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChvcHRpb25zLnRvb2x0aXBzKSB7XG4gICAgICBjb25zdCB0b29sdGlwcyA9IG9wdGlvbnMudG9vbHRpcHM7XG4gICAgICBpZiAodG9vbHRpcHMuY3VzdG9tKSB7XG4gICAgICAgIGNvbnN0IGN1c3RvbSA9IChcbiAgICAgICAgICB0eXBlb2YgdG9vbHRpcHMuY3VzdG9tID09PSAnc3RyaW5nJyA/IG5ldyBGdW5jdGlvbih0b29sdGlwcy5jdXN0b20pIDogdG9vbHRpcHMuY3VzdG9tXG4gICAgICAgICkgYXMgKHRvb2x0aXBNb2RlbDogQ2hhcnRUb29sdGlwTW9kZWwpID0+IHZvaWQ7XG4gICAgICAgIHRvb2x0aXBzLmN1c3RvbSA9IGN1c3RvbTtcbiAgICAgIH1cbiAgICAgIGlmICh0b29sdGlwcy5jYWxsYmFja3MpIHtcbiAgICAgICAgY29uc3QgY2FsbGJhY2tzID0gdG9vbHRpcHMuY2FsbGJhY2tzO1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBjYWxsYmFja3MpIHtcbiAgICAgICAgICBjb25zdCBjYWxsYmFjayA9IChjYWxsYmFja3MgYXMgYW55KVtrZXldIGFzIChcbiAgICAgICAgICAgIGl0ZW06IENoYXJ0VG9vbHRpcEl0ZW1bXSxcbiAgICAgICAgICAgIGRhdGE6IENoYXJ0RGF0YSxcbiAgICAgICAgICApID0+IHN0cmluZyB8IHN0cmluZ1tdO1xuICAgICAgICAgIChjYWxsYmFja3MgYXMgYW55KVtrZXldID1cbiAgICAgICAgICAgIHR5cGVvZiBjYWxsYmFjayA9PT0gJ3N0cmluZycgPyBuZXcgRnVuY3Rpb24oY2FsbGJhY2spIDogY2FsbGJhY2s7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICh0b29sdGlwcy5maWx0ZXIpIHtcbiAgICAgICAgdHlwZSBGaWx0ZXJGbiA9IChpdGVtOiBDaGFydFRvb2x0aXBJdGVtLCBkYXRhOiBDaGFydERhdGEpID0+IGJvb2xlYW47XG4gICAgICAgIGNvbnN0IGZpbHRlciA9IChcbiAgICAgICAgICB0eXBlb2YgdG9vbHRpcHMuZmlsdGVyID09PSAnc3RyaW5nJyA/IG5ldyBGdW5jdGlvbih0b29sdGlwcy5maWx0ZXIpIDogdG9vbHRpcHMuZmlsdGVyXG4gICAgICAgICkgYXMgRmlsdGVyRm47XG4gICAgICAgIHRvb2x0aXBzLmZpbHRlciA9IGZpbHRlcjtcbiAgICAgIH1cbiAgICAgIGlmICh0b29sdGlwcy5pdGVtU29ydCkge1xuICAgICAgICB0eXBlIFNvcnRGbiA9IChcbiAgICAgICAgICBpdGVtQTogQ2hhcnRUb29sdGlwSXRlbSxcbiAgICAgICAgICBpdGVtQjogQ2hhcnRUb29sdGlwSXRlbSxcbiAgICAgICAgICBkYXRhPzogQ2hhcnREYXRhLFxuICAgICAgICApID0+IG51bWJlcjtcbiAgICAgICAgY29uc3QgaXRlbVNvcnQgPSAoXG4gICAgICAgICAgdHlwZW9mIHRvb2x0aXBzLml0ZW1Tb3J0ID09PSAnc3RyaW5nJ1xuICAgICAgICAgICAgPyBuZXcgRnVuY3Rpb24odG9vbHRpcHMuaXRlbVNvcnQpXG4gICAgICAgICAgICA6IHRvb2x0aXBzLml0ZW1Tb3J0XG4gICAgICAgICkgYXMgU29ydEZuO1xuICAgICAgICB0b29sdGlwcy5pdGVtU29ydCA9IGl0ZW1Tb3J0O1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAob3B0aW9ucy5ob3Zlcikge1xuICAgICAgY29uc3QgaG92ZXIgPSBvcHRpb25zLmhvdmVyO1xuICAgICAgaWYgKGhvdmVyLm9uSG92ZXIpIHtcbiAgICAgICAgY29uc3Qgb25Ib3ZlciA9IChcbiAgICAgICAgICB0eXBlb2YgaG92ZXIub25Ib3ZlciA9PT0gJ3N0cmluZycgPyBuZXcgRnVuY3Rpb24oaG92ZXIub25Ib3ZlcikgOiBob3Zlci5vbkhvdmVyXG4gICAgICAgICkgYXMgKHRoaXM6IENoYXJ0LCBldmVudDogTW91c2VFdmVudCwgYWN0aXZlRWxlbWVudHM6IHt9W10pID0+IGFueTtcbiAgICAgICAgaG92ZXIub25Ib3ZlciA9IG9uSG92ZXI7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChvcHRpb25zLmFuaW1hdGlvbikge1xuICAgICAgY29uc3QgYW5pbWF0aW9uID0gb3B0aW9ucy5hbmltYXRpb247XG4gICAgICBpZiAoYW5pbWF0aW9uLm9uUHJvZ3Jlc3MpIHtcbiAgICAgICAgY29uc3Qgb25Qcm9ncmVzcyA9IChcbiAgICAgICAgICB0eXBlb2YgYW5pbWF0aW9uLm9uUHJvZ3Jlc3MgPT09ICdzdHJpbmcnXG4gICAgICAgICAgICA/IG5ldyBGdW5jdGlvbihhbmltYXRpb24ub25Qcm9ncmVzcylcbiAgICAgICAgICAgIDogYW5pbWF0aW9uLm9uUHJvZ3Jlc3NcbiAgICAgICAgKSBhcyAoY2hhcnQ6IGFueSkgPT4gdm9pZDtcbiAgICAgICAgYW5pbWF0aW9uLm9uUHJvZ3Jlc3MgPSBvblByb2dyZXNzO1xuICAgICAgfVxuICAgICAgaWYgKGFuaW1hdGlvbi5vbkNvbXBsZXRlKSB7XG4gICAgICAgIGNvbnN0IG9uQ29tcGxldGUgPSAoXG4gICAgICAgICAgdHlwZW9mIGFuaW1hdGlvbi5vbkNvbXBsZXRlID09PSAnc3RyaW5nJ1xuICAgICAgICAgICAgPyBuZXcgRnVuY3Rpb24oYW5pbWF0aW9uLm9uQ29tcGxldGUpXG4gICAgICAgICAgICA6IGFuaW1hdGlvbi5vbkNvbXBsZXRlXG4gICAgICAgICkgYXMgKGNoYXJ0OiBhbnkpID0+IHZvaWQ7XG4gICAgICAgIGFuaW1hdGlvbi5vbkNvbXBsZXRlID0gb25Db21wbGV0ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKG9wdGlvbnMuc2NhbGVzID09IG51bGwpIHtcbiAgICAgIG9wdGlvbnMuc2NhbGVzID0ge3hBeGVzOiBbXSwgeUF4ZXM6IFtdfTtcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMuc2NhbGVzLnhBeGVzID09IG51bGwpIHtcbiAgICAgIG9wdGlvbnMuc2NhbGVzLnhBeGVzID0gW107XG4gICAgfVxuICAgIGlmIChvcHRpb25zLnNjYWxlcy55QXhlcyA9PSBudWxsKSB7XG4gICAgICBvcHRpb25zLnNjYWxlcy55QXhlcyA9IFtdO1xuICAgIH1cbiAgICBvcHRpb25zLnNjYWxlcy55QXhlcy5mb3JFYWNoKHlBeGUgPT4ge1xuICAgICAgaWYgKHlBeGUudGlja3MgJiYgeUF4ZS50aWNrcy5jYWxsYmFjaykge1xuICAgICAgICBjb25zdCBjYWxsYmFjayA9IChcbiAgICAgICAgICB0eXBlb2YgeUF4ZS50aWNrcy5jYWxsYmFjayA9PT0gJ3N0cmluZydcbiAgICAgICAgICAgID8gbmV3IEZ1bmN0aW9uKHlBeGUudGlja3MuY2FsbGJhY2spXG4gICAgICAgICAgICA6IHlBeGUudGlja3MuY2FsbGJhY2tcbiAgICAgICAgKSBhcyAodmFsdWU6IGFueSwgaW5kZXg6IGFueSwgdmFsdWVzOiBhbnkpID0+IHN0cmluZyB8IG51bWJlcjtcbiAgICAgICAgeUF4ZS50aWNrcy5jYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgICAgfVxuICAgIH0pO1xuICAgIG9wdGlvbnMuc2NhbGVzLnhBeGVzLmZvckVhY2goeEF4ZSA9PiB7XG4gICAgICBpZiAoeEF4ZS50aWNrcyAmJiB4QXhlLnRpY2tzLmNhbGxiYWNrKSB7XG4gICAgICAgIGNvbnN0IGNhbGxiYWNrID0gKFxuICAgICAgICAgIHR5cGVvZiB4QXhlLnRpY2tzLmNhbGxiYWNrID09PSAnc3RyaW5nJ1xuICAgICAgICAgICAgPyBuZXcgRnVuY3Rpb24oeEF4ZS50aWNrcy5jYWxsYmFjaylcbiAgICAgICAgICAgIDogeEF4ZS50aWNrcy5jYWxsYmFja1xuICAgICAgICApIGFzICh2YWx1ZTogYW55LCBpbmRleDogYW55LCB2YWx1ZXM6IGFueSkgPT4gc3RyaW5nIHwgbnVtYmVyO1xuICAgICAgICB4QXhlLnRpY2tzLmNhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKHRoaXMuY2hhcnRUeXBlID09ICdwaWUnKSB7XG4gICAgICBsZXQgbmV3T3B0aW9ucyA9IDxhbnk+b3B0aW9ucztcbiAgICAgIG5ld09wdGlvbnMucGllY2VMYWJlbCA9IHtcbiAgICAgICAgLi4ue1xuICAgICAgICAgIHJlbmRlcjogZnVuY3Rpb24gKGFyZ3M6IGFueSkge1xuICAgICAgICAgICAgaWYgKGFyZ3MubGFiZWwpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGFyZ3MubGFiZWwgKyAnOicgKyBhcmdzLnZhbHVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGFyZ3MudmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICAuLi5uZXdPcHRpb25zLnBpZWNlTGFiZWwsXG4gICAgICAgIH0sXG4gICAgICAgIHBvc2l0aW9uOiAnb3V0c2lkZScsXG4gICAgICB9O1xuICAgICAgcmV0dXJuIG5ld09wdGlvbnM7XG4gICAgfVxuICAgIHJldHVybiBvcHRpb25zO1xuICB9XG59XG4iLCIiXX0=