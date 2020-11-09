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
            newOptions.pieceLabel = Object.assign(Object.assign({}, Object.assign({ render: function (args) {
                    if (args.label) {
                        return args.label + ':' + args.value;
                    }
                    else {
                        return args.value;
                    }
                } }, newOptions.pieceLabel)), { position: 'outside' });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9jaGFydC9jaGFydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDekMsT0FBTyxFQUVMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsVUFBVSxFQUNWLEtBQUssRUFFTCxTQUFTLEVBRVQsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFDTCxLQUFLLEdBUU4sTUFBTSxVQUFVLENBQUM7QUFZbEIsTUFBTSxPQUFPLGlCQUFpQjtJQVM1QixZQUFvQixHQUFlLEVBQVUsU0FBb0I7UUFBN0MsUUFBRyxHQUFILEdBQUcsQ0FBWTtRQUFVLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFGekQsMEJBQXFCLEdBQXdCLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBRVAsQ0FBQztJQUVyRSxlQUFlO1FBQ2IsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFBSSxXQUFXLElBQUksT0FBTyxFQUFFO1lBQzFCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUN0QjthQUFNLElBQUksU0FBUyxJQUFJLE9BQU8sSUFBSSxNQUFNLElBQUksT0FBTyxFQUFFO1lBQ3BELElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUNyQjtJQUNILENBQUM7SUFFTyxRQUFRLENBQUMsU0FBNEIsRUFBRSxJQUFlO1FBQzVELE1BQU0sT0FBTyxHQUFjLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMxQyxJQUFJLFlBQVksR0FBRyxDQUFDLENBQUM7UUFDckIsQ0FBQyxPQUFPLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxD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WUFHVixTQUFTOzs7bUJBMEJSLEtBQUs7c0JBQ0wsS0FBSzt3QkFDTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge2RlZXBDb3B5fSBmcm9tICdAYWpmL2NvcmUvdXRpbHMnO1xuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgUmVuZGVyZXIyLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIENoYXJ0LFxuICBDaGFydERhdGEsXG4gIENoYXJ0TGVnZW5kTGFiZWxJdGVtLFxuICBDaGFydE9wdGlvbnMsXG4gIENoYXJ0UG9pbnQsXG4gIENoYXJ0U2l6ZSxcbiAgQ2hhcnRUb29sdGlwSXRlbSxcbiAgQ2hhcnRUb29sdGlwTW9kZWwsXG59IGZyb20gJ2NoYXJ0LmpzJztcblxuaW1wb3J0IHtFeHRlbmRlZENoYXJ0VHlwZX0gZnJvbSAnLi9leHRlbmRlZC1jaGFydC10eXBlJztcblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhamYtY2hhcnQnLFxuICB0ZW1wbGF0ZVVybDogJ2NoYXJ0Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnY2hhcnQuY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIEFqZkNoYXJ0Q29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25DaGFuZ2VzIHtcbiAgQElucHV0KCkgZGF0YTogQ2hhcnREYXRhO1xuICBASW5wdXQoKSBvcHRpb25zOiBDaGFydE9wdGlvbnM7XG4gIEBJbnB1dCgpIGNoYXJ0VHlwZTogRXh0ZW5kZWRDaGFydFR5cGU7XG5cbiAgcHJpdmF0ZSBfY2hhcnQ6IENoYXJ0fG51bGw7XG4gIHByaXZhdGUgX2NoYXJ0Q2FudmFzRWxlbWVudDogYW55O1xuICBwcml2YXRlIF9jaGFydFR5cGVzTmVlZFBvaW50czogRXh0ZW5kZWRDaGFydFR5cGVbXSA9IFsnc2NhdHRlcicsICdidWJibGUnXTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9lbDogRWxlbWVudFJlZiwgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMikge31cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fcmVidWlsZENoYXJ0KCk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgaWYgKCdjaGFydFR5cGUnIGluIGNoYW5nZXMpIHtcbiAgICAgIHRoaXMuX3JlYnVpbGRDaGFydCgpO1xuICAgIH0gZWxzZSBpZiAoJ29wdGlvbnMnIGluIGNoYW5nZXMgfHwgJ2RhdGEnIGluIGNoYW5nZXMpIHtcbiAgICAgIHRoaXMuX3VwZGF0ZUNoYXJ0KCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfZml4RGF0YShjaGFydFR5cGU6IEV4dGVuZGVkQ2hhcnRUeXBlLCBkYXRhOiBDaGFydERhdGEpOiBDaGFydERhdGEge1xuICAgIGNvbnN0IG5ld0RhdGE6IENoYXJ0RGF0YSA9IGRlZXBDb3B5KGRhdGEpO1xuICAgIGxldCBtYXhQb2ludHNOdW0gPSAwO1xuICAgIChuZXdEYXRhLmRhdGFzZXRzIHx8IFtdKS5mb3JFYWNoKChkYXRhc2V0KSA9PiB7XG4gICAgICBpZiAoZGF0YXNldC5sYWJlbCA9PSBudWxsKSB7XG4gICAgICAgIGRhdGFzZXQubGFiZWwgPSAnJztcbiAgICAgIH1cbiAgICAgIG1heFBvaW50c051bSA9IE1hdGgubWF4KG1heFBvaW50c051bSwgKGRhdGFzZXQuZGF0YSB8fCBbXSkubGVuZ3RoKTtcbiAgICAgIGNvbnN0IGRhdGFzZXRUeXBlID0gZGF0YXNldC50eXBlICE9IG51bGwgPyA8RXh0ZW5kZWRDaGFydFR5cGU+ZGF0YXNldC50eXBlIDogY2hhcnRUeXBlO1xuICAgICAgaWYgKHRoaXMuX2NoYXJ0VHlwZXNOZWVkUG9pbnRzLmluZGV4T2YoZGF0YXNldFR5cGUpID4gLTEpIHtcbiAgICAgICAgZGF0YXNldC5kYXRhID0gKDxhbnlbXT4oZGF0YXNldC5kYXRhIHx8IFtdKSkubWFwKChkLCBpZHgpID0+IHtcbiAgICAgICAgICBpZiAodHlwZW9mIGQgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICByZXR1cm4gPGFueT57eDogaWR4LCB5OiBkLCByOiBkfTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIDxDaGFydFBvaW50PmQ7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGNvbnN0IGxhYmVscyA9IG5ld0RhdGEubGFiZWxzIHx8IFtdO1xuICAgIGlmIChtYXhQb2ludHNOdW0gPiAwICYmIGxhYmVscy5sZW5ndGggPCBtYXhQb2ludHNOdW0pIHtcbiAgICAgIGZvciAobGV0IGkgPSBsYWJlbHMubGVuZ3RoOyBpIDwgbWF4UG9pbnRzTnVtOyBpKyspIHtcbiAgICAgICAgbGFiZWxzLnB1c2goJycpO1xuICAgICAgfVxuICAgICAgbmV3RGF0YS5sYWJlbHMgPSBsYWJlbHM7XG4gICAgfVxuICAgIHJldHVybiBuZXdEYXRhO1xuICB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlQ2hhcnQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2NoYXJ0ID09IG51bGwpIHtcbiAgICAgIHRoaXMuX3JlYnVpbGRDaGFydCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAoPGFueT50aGlzLl9jaGFydCkub3B0aW9ucyA9IHtcbiAgICAgICAgLi4uZGVlcENvcHkoKDxhbnk+dGhpcy5fY2hhcnQpLm9wdGlvbnMpLFxuICAgICAgICAuLi5kZWVwQ29weSh0aGlzLm9wdGlvbnMgfHwge30pXG4gICAgICB9O1xuICAgICAgdGhpcy5fY2hhcnQuZGF0YSA9IHsuLi5kZWVwQ29weSh0aGlzLl9jaGFydC5kYXRhKSwgLi4uZGVlcENvcHkodGhpcy5kYXRhKX07XG4gICAgICB0aGlzLl9jaGFydC51cGRhdGUoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9yZWJ1aWxkQ2hhcnQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2NoYXJ0ICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX2NoYXJ0LmRlc3Ryb3koKTtcbiAgICAgIHRoaXMuX2NoYXJ0ID0gbnVsbDtcbiAgICB9XG4gICAgaWYgKHRoaXMuX2NoYXJ0Q2FudmFzRWxlbWVudCAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVDaGlsZCh0aGlzLl9lbC5uYXRpdmVFbGVtZW50LCB0aGlzLl9jaGFydENhbnZhc0VsZW1lbnQpO1xuICAgICAgdGhpcy5fY2hhcnRDYW52YXNFbGVtZW50ID0gbnVsbDtcbiAgICB9XG4gICAgaWYgKHRoaXMuZGF0YSAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9jaGFydENhbnZhc0VsZW1lbnQgPSB0aGlzLl9yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX2NoYXJ0Q2FudmFzRWxlbWVudCwgJ3dpZHRoJywgJ2luaGVyaXQnKTtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX2NoYXJ0Q2FudmFzRWxlbWVudCwgJ2hlaWdodCcsICdpbmhlcml0Jyk7XG4gICAgICB0aGlzLl9yZW5kZXJlci5hcHBlbmRDaGlsZCh0aGlzLl9lbC5uYXRpdmVFbGVtZW50LCB0aGlzLl9jaGFydENhbnZhc0VsZW1lbnQpO1xuICAgICAgY29uc3QgY3R4ID0gdGhpcy5fY2hhcnRDYW52YXNFbGVtZW50LmdldENvbnRleHQoJzJkJyk7XG4gICAgICB0aGlzLl9jaGFydCA9IG5ldyBDaGFydChjdHgsIHtcbiAgICAgICAgdHlwZTogdGhpcy5jaGFydFR5cGUsXG4gICAgICAgIGRhdGE6IHRoaXMuX2ZpeERhdGEodGhpcy5jaGFydFR5cGUsIHRoaXMuZGF0YSksXG4gICAgICAgIG9wdGlvbnM6IHRoaXMuX2ZpeENoYXJ0T3B0aW9ucyh0aGlzLm9wdGlvbnMpXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9maXhDaGFydE9wdGlvbnMob3B0aW9uczogQ2hhcnRPcHRpb25zKTogQ2hhcnRPcHRpb25zIHtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICBpZiAob3B0aW9ucy5sZWdlbmRDYWxsYmFjaykge1xuICAgICAgY29uc3QgbGVnZW5kQ2FsbGJhY2sgPSAodHlwZW9mIG9wdGlvbnMubGVnZW5kQ2FsbGJhY2sgPT09ICdzdHJpbmcnID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgRnVuY3Rpb24ob3B0aW9ucy5sZWdlbmRDYWxsYmFjaykgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMubGVnZW5kQ2FsbGJhY2spIGFzIChjaGFydDogQ2hhcnQpID0+IHN0cmluZztcbiAgICAgIG9wdGlvbnMubGVnZW5kQ2FsbGJhY2sgPSBsZWdlbmRDYWxsYmFjaztcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMub25Ib3Zlcikge1xuICAgICAgY29uc3Qgb25Ib3ZlciA9XG4gICAgICAgICAgKHR5cGVvZiBvcHRpb25zLm9uSG92ZXIgPT09ICdzdHJpbmcnID9cbiAgICAgICAgICAgICAgIG5ldyBGdW5jdGlvbihvcHRpb25zLm9uSG92ZXIpIDpcbiAgICAgICAgICAgICAgIG9wdGlvbnMub25Ib3ZlcikgYXMgKHRoaXM6IENoYXJ0LCBldmVudDogTW91c2VFdmVudCwgYWN0aXZlRWxlbWVudHM6IHt9W10pID0+IGFueTtcbiAgICAgIG9wdGlvbnMub25Ib3ZlciA9IG9uSG92ZXI7XG4gICAgfVxuICAgIGlmIChvcHRpb25zLm9uQ2xpY2spIHtcbiAgICAgIGNvbnN0IG9uQ2xpY2sgPSAodHlwZW9mIG9wdGlvbnMub25DbGljayA9PT0gJ3N0cmluZycgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IEZ1bmN0aW9uKG9wdGlvbnMub25DbGljaykgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5vbkNsaWNrKSBhcyAoZXZlbnQ/OiBNb3VzZUV2ZW50LCBhY3RpdmVFbGVtZW50cz86IHt9W10pID0+IGFueTtcbiAgICAgIG9wdGlvbnMub25DbGljayA9IG9uQ2xpY2s7XG4gICAgfVxuICAgIGlmIChvcHRpb25zLm9uUmVzaXplKSB7XG4gICAgICBjb25zdCBvblJlc2l6ZSA9ICh0eXBlb2Ygb3B0aW9ucy5vblJlc2l6ZSA9PT0gJ3N0cmluZycgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBGdW5jdGlvbihvcHRpb25zLm9uUmVzaXplKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5vblJlc2l6ZSkgYXMgKHRoaXM6IENoYXJ0LCBuZXdTaXplOiBDaGFydFNpemUpID0+IHZvaWQ7XG4gICAgICBvcHRpb25zLm9uUmVzaXplID0gb25SZXNpemU7XG4gICAgfVxuICAgIGlmIChvcHRpb25zLmxlZ2VuZCkge1xuICAgICAgY29uc3QgbGVnZW5kID0gb3B0aW9ucy5sZWdlbmQ7XG4gICAgICBpZiAobGVnZW5kLm9uQ2xpY2spIHtcbiAgICAgICAgY29uc3Qgb25DbGljayA9XG4gICAgICAgICAgICAodHlwZW9mIGxlZ2VuZC5vbkNsaWNrID09PSAnc3RyaW5nJyA/XG4gICAgICAgICAgICAgICAgIG5ldyBGdW5jdGlvbihsZWdlbmQub25DbGljaykgOlxuICAgICAgICAgICAgICAgICBsZWdlbmQub25DbGljaykgYXMgKGV2ZW50OiBNb3VzZUV2ZW50LCBsZWdlbmRJdGVtOiBDaGFydExlZ2VuZExhYmVsSXRlbSkgPT4gdm9pZDtcbiAgICAgICAgbGVnZW5kLm9uQ2xpY2sgPSBvbkNsaWNrO1xuICAgICAgfVxuICAgICAgaWYgKGxlZ2VuZC5vbkhvdmVyKSB7XG4gICAgICAgIGNvbnN0IG9uSG92ZXIgPVxuICAgICAgICAgICAgKHR5cGVvZiBsZWdlbmQub25Ib3ZlciA9PT0gJ3N0cmluZycgP1xuICAgICAgICAgICAgICAgICBuZXcgRnVuY3Rpb24obGVnZW5kLm9uSG92ZXIpIDpcbiAgICAgICAgICAgICAgICAgbGVnZW5kLm9uSG92ZXIpIGFzIChldmVudDogTW91c2VFdmVudCwgbGVnZW5kSXRlbTogQ2hhcnRMZWdlbmRMYWJlbEl0ZW0pID0+IHZvaWQ7XG4gICAgICAgIGxlZ2VuZC5vbkhvdmVyID0gb25Ib3ZlcjtcbiAgICAgIH1cbiAgICAgIGlmIChsZWdlbmQub25MZWF2ZSkge1xuICAgICAgICBjb25zdCBvbkxlYXZlID1cbiAgICAgICAgICAgICh0eXBlb2YgbGVnZW5kLm9uTGVhdmUgPT09ICdzdHJpbmcnID9cbiAgICAgICAgICAgICAgICAgbmV3IEZ1bmN0aW9uKGxlZ2VuZC5vbkxlYXZlKSA6XG4gICAgICAgICAgICAgICAgIGxlZ2VuZC5vbkxlYXZlKSBhcyAoZXZlbnQ6IE1vdXNlRXZlbnQsIGxlZ2VuZEl0ZW06IENoYXJ0TGVnZW5kTGFiZWxJdGVtKSA9PiB2b2lkO1xuICAgICAgICBsZWdlbmQub25MZWF2ZSA9IG9uTGVhdmU7XG4gICAgICB9XG4gICAgICBpZiAobGVnZW5kLmxhYmVscykge1xuICAgICAgICBjb25zdCBsYWJlbHMgPSBsZWdlbmQubGFiZWxzO1xuICAgICAgICBpZiAobGFiZWxzLmdlbmVyYXRlTGFiZWxzKSB7XG4gICAgICAgICAgY29uc3QgZ2VuZXJhdGVMYWJlbHMgPSAodHlwZW9mIGxhYmVscy5nZW5lcmF0ZUxhYmVscyA9PT0gJ3N0cmluZycgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgRnVuY3Rpb24obGFiZWxzLmdlbmVyYXRlTGFiZWxzKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVscy5nZW5lcmF0ZUxhYmVscykgYXMgKGNoYXJ0OiBDaGFydCkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDaGFydExlZ2VuZExhYmVsSXRlbVtdO1xuICAgICAgICAgIGxhYmVscy5nZW5lcmF0ZUxhYmVscyA9IGdlbmVyYXRlTGFiZWxzO1xuICAgICAgICB9XG4gICAgICAgIGlmIChsYWJlbHMuZmlsdGVyKSB7XG4gICAgICAgICAgY29uc3QgZmlsdGVyID1cbiAgICAgICAgICAgICAgKHR5cGVvZiBsYWJlbHMuZmlsdGVyID09PSAnc3RyaW5nJyA/IG5ldyBGdW5jdGlvbihsYWJlbHMuZmlsdGVyKSA6IGxhYmVscy5maWx0ZXIpIGFzIChcbiAgICAgICAgICAgICAgICAgIGxlZ2VuZEl0ZW06IENoYXJ0TGVnZW5kTGFiZWxJdGVtLCBkYXRhOiBDaGFydERhdGEpID0+IGFueTtcbiAgICAgICAgICBsYWJlbHMuZmlsdGVyID0gZmlsdGVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChvcHRpb25zLnRvb2x0aXBzKSB7XG4gICAgICBjb25zdCB0b29sdGlwcyA9IG9wdGlvbnMudG9vbHRpcHM7XG4gICAgICBpZiAodG9vbHRpcHMuY3VzdG9tKSB7XG4gICAgICAgIGNvbnN0IGN1c3RvbSA9ICh0eXBlb2YgdG9vbHRpcHMuY3VzdG9tID09PSAnc3RyaW5nJyA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IEZ1bmN0aW9uKHRvb2x0aXBzLmN1c3RvbSkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvb2x0aXBzLmN1c3RvbSkgYXMgKHRvb2x0aXBNb2RlbDogQ2hhcnRUb29sdGlwTW9kZWwpID0+IHZvaWQ7XG4gICAgICAgIHRvb2x0aXBzLmN1c3RvbSA9IGN1c3RvbTtcbiAgICAgIH1cbiAgICAgIGlmICh0b29sdGlwcy5jYWxsYmFja3MpIHtcbiAgICAgICAgY29uc3QgY2FsbGJhY2tzID0gdG9vbHRpcHMuY2FsbGJhY2tzO1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBjYWxsYmFja3MpIHtcbiAgICAgICAgICBjb25zdCBjYWxsYmFjayA9IChjYWxsYmFja3MgYXMgYW55KVtrZXldIGFzIChpdGVtOiBDaGFydFRvb2x0aXBJdGVtW10sIGRhdGE6IENoYXJ0RGF0YSkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJpbmcgfCBzdHJpbmdbXTtcbiAgICAgICAgICAoY2FsbGJhY2tzIGFzIGFueSlba2V5XSA9XG4gICAgICAgICAgICAgIHR5cGVvZiBjYWxsYmFjayA9PT0gJ3N0cmluZycgPyBuZXcgRnVuY3Rpb24oY2FsbGJhY2spIDogY2FsbGJhY2s7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICh0b29sdGlwcy5maWx0ZXIpIHtcbiAgICAgICAgdHlwZSBGaWx0ZXJGbiA9IChpdGVtOiBDaGFydFRvb2x0aXBJdGVtLCBkYXRhOiBDaGFydERhdGEpID0+IGJvb2xlYW47XG4gICAgICAgIGNvbnN0IGZpbHRlciA9ICh0eXBlb2YgdG9vbHRpcHMuZmlsdGVyID09PSAnc3RyaW5nJyA/IG5ldyBGdW5jdGlvbih0b29sdGlwcy5maWx0ZXIpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9vbHRpcHMuZmlsdGVyKSBhcyBGaWx0ZXJGbjtcbiAgICAgICAgdG9vbHRpcHMuZmlsdGVyID0gZmlsdGVyO1xuICAgICAgfVxuICAgICAgaWYgKHRvb2x0aXBzLml0ZW1Tb3J0KSB7XG4gICAgICAgIHR5cGUgU29ydEZuID0gKGl0ZW1BOiBDaGFydFRvb2x0aXBJdGVtLCBpdGVtQjogQ2hhcnRUb29sdGlwSXRlbSwgZGF0YT86IENoYXJ0RGF0YSkgPT5cbiAgICAgICAgICAgIG51bWJlcjtcbiAgICAgICAgY29uc3QgaXRlbVNvcnQgPSAodHlwZW9mIHRvb2x0aXBzLml0ZW1Tb3J0ID09PSAnc3RyaW5nJyA/IG5ldyBGdW5jdGlvbih0b29sdGlwcy5pdGVtU29ydCkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9vbHRpcHMuaXRlbVNvcnQpIGFzIFNvcnRGbjtcbiAgICAgICAgdG9vbHRpcHMuaXRlbVNvcnQgPSBpdGVtU29ydDtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKG9wdGlvbnMuaG92ZXIpIHtcbiAgICAgIGNvbnN0IGhvdmVyID0gb3B0aW9ucy5ob3ZlcjtcbiAgICAgIGlmIChob3Zlci5vbkhvdmVyKSB7XG4gICAgICAgIGNvbnN0IG9uSG92ZXIgPVxuICAgICAgICAgICAgKHR5cGVvZiBob3Zlci5vbkhvdmVyID09PSAnc3RyaW5nJyA/IG5ldyBGdW5jdGlvbihob3Zlci5vbkhvdmVyKSA6IGhvdmVyLm9uSG92ZXIpIGFzIChcbiAgICAgICAgICAgICAgICB0aGlzOiBDaGFydCwgZXZlbnQ6IE1vdXNlRXZlbnQsIGFjdGl2ZUVsZW1lbnRzOiB7fVtdKSA9PiBhbnk7XG4gICAgICAgIGhvdmVyLm9uSG92ZXIgPSBvbkhvdmVyO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAob3B0aW9ucy5hbmltYXRpb24pIHtcbiAgICAgIGNvbnN0IGFuaW1hdGlvbiA9IG9wdGlvbnMuYW5pbWF0aW9uO1xuICAgICAgaWYgKGFuaW1hdGlvbi5vblByb2dyZXNzKSB7XG4gICAgICAgIGNvbnN0IG9uUHJvZ3Jlc3MgPSAodHlwZW9mIGFuaW1hdGlvbi5vblByb2dyZXNzID09PSAnc3RyaW5nJyA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBGdW5jdGlvbihhbmltYXRpb24ub25Qcm9ncmVzcykgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRpb24ub25Qcm9ncmVzcykgYXMgKGNoYXJ0OiBhbnkpID0+IHZvaWQ7XG4gICAgICAgIGFuaW1hdGlvbi5vblByb2dyZXNzID0gb25Qcm9ncmVzcztcbiAgICAgIH1cbiAgICAgIGlmIChhbmltYXRpb24ub25Db21wbGV0ZSkge1xuICAgICAgICBjb25zdCBvbkNvbXBsZXRlID0gKHR5cGVvZiBhbmltYXRpb24ub25Db21wbGV0ZSA9PT0gJ3N0cmluZycgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgRnVuY3Rpb24oYW5pbWF0aW9uLm9uQ29tcGxldGUpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uLm9uQ29tcGxldGUpIGFzIChjaGFydDogYW55KSA9PiB2b2lkO1xuICAgICAgICBhbmltYXRpb24ub25Db21wbGV0ZSA9IG9uQ29tcGxldGU7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChvcHRpb25zLnNjYWxlcyA9PSBudWxsKSB7XG4gICAgICBvcHRpb25zLnNjYWxlcyA9IHt4QXhlczogW10sIHlBeGVzOiBbXX07XG4gICAgfVxuICAgIGlmIChvcHRpb25zLnNjYWxlcy54QXhlcyA9PSBudWxsKSB7XG4gICAgICBvcHRpb25zLnNjYWxlcy54QXhlcyA9IFtdO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy5zY2FsZXMueUF4ZXMgPT0gbnVsbCkge1xuICAgICAgb3B0aW9ucy5zY2FsZXMueUF4ZXMgPSBbXTtcbiAgICB9XG4gICAgb3B0aW9ucy5zY2FsZXMueUF4ZXMuZm9yRWFjaCgoeUF4ZSkgPT4ge1xuICAgICAgaWYgKHlBeGUudGlja3MgJiYgeUF4ZS50aWNrcy5jYWxsYmFjaykge1xuICAgICAgICBjb25zdCBjYWxsYmFjayA9ICh0eXBlb2YgeUF4ZS50aWNrcy5jYWxsYmFjayA9PT0gJ3N0cmluZycgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IEZ1bmN0aW9uKHlBeGUudGlja3MuY2FsbGJhY2spIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHlBeGUudGlja3MuY2FsbGJhY2spIGFzICh2YWx1ZTogYW55LCBpbmRleDogYW55LCB2YWx1ZXM6IGFueSkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RyaW5nIHwgbnVtYmVyO1xuICAgICAgICB5QXhlLnRpY2tzLmNhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgICB9XG4gICAgfSk7XG4gICAgb3B0aW9ucy5zY2FsZXMueEF4ZXMuZm9yRWFjaCgoeEF4ZSkgPT4ge1xuICAgICAgaWYgKHhBeGUudGlja3MgJiYgeEF4ZS50aWNrcy5jYWxsYmFjaykge1xuICAgICAgICBjb25zdCBjYWxsYmFjayA9ICh0eXBlb2YgeEF4ZS50aWNrcy5jYWxsYmFjayA9PT0gJ3N0cmluZycgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IEZ1bmN0aW9uKHhBeGUudGlja3MuY2FsbGJhY2spIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHhBeGUudGlja3MuY2FsbGJhY2spIGFzICh2YWx1ZTogYW55LCBpbmRleDogYW55LCB2YWx1ZXM6IGFueSkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RyaW5nIHwgbnVtYmVyO1xuICAgICAgICB4QXhlLnRpY2tzLmNhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKHRoaXMuY2hhcnRUeXBlID09ICdwaWUnKSB7XG4gICAgICBsZXQgbmV3T3B0aW9ucyA9IDxhbnk+b3B0aW9ucztcbiAgICAgIG5ld09wdGlvbnMucGllY2VMYWJlbCA9IHsuLi57XG4gICAgICAgIHJlbmRlcjogZnVuY3Rpb24oYXJnczogYW55KSB7XG4gICAgICAgICAgaWYgKGFyZ3MubGFiZWwpIHtcbiAgICAgICAgICAgIHJldHVybiBhcmdzLmxhYmVsICsgJzonICsgYXJncy52YWx1ZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGFyZ3MudmFsdWU7XG4gICAgICAgICAgfVxuICAgICAgICB9LCAuLi5uZXdPcHRpb25zLnBpZWNlTGFiZWx9LFxuICAgICAgICBwb3NpdGlvbjogJ291dHNpZGUnXG4gICAgICB9O1xuICAgICAgcmV0dXJuIG5ld09wdGlvbnM7XG4gICAgfVxuICAgIHJldHVybiBvcHRpb25zO1xuICB9XG59XG4iXX0=