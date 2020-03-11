/**
 * @fileoverview added by tsickle
 * Generated from: src/core/chart/chart.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
/** @type {?} */
const chartClass = ((/** @type {?} */ (Chart))).default || Chart;
import 'chart.piecelabel.js';
import { deepCopy } from '@ajf/core/utils';
export class AjfChartComponent {
    /**
     * @param {?} _el
     * @param {?} _renderer
     */
    constructor(_el, _renderer) {
        this._el = _el;
        this._renderer = _renderer;
        this._chartTypesNeedPoints = ['scatter', 'bubble'];
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this._rebuildChart();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if ('chartType' in changes) {
            this._rebuildChart();
        }
        else if ('options' in changes || 'data' in changes) {
            this._updateChart();
        }
    }
    /**
     * @private
     * @param {?} chartType
     * @param {?} data
     * @return {?}
     */
    _fixData(chartType, data) {
        /** @type {?} */
        const newData = deepCopy(data);
        /** @type {?} */
        let maxPointsNum = 0;
        (newData.datasets || []).forEach((/**
         * @param {?} dataset
         * @return {?}
         */
        (dataset) => {
            if (dataset.label == null) {
                dataset.label = '';
            }
            maxPointsNum = Math.max(maxPointsNum, (dataset.data || []).length);
            /** @type {?} */
            const datasetType = dataset.type != null ? (/** @type {?} */ (dataset.type)) : chartType;
            if (this._chartTypesNeedPoints.indexOf(datasetType) > -1) {
                dataset.data = ((/** @type {?} */ ((dataset.data || [])))).map((/**
                 * @param {?} d
                 * @param {?} idx
                 * @return {?}
                 */
                (d, idx) => {
                    if (typeof d === 'number') {
                        return (/** @type {?} */ ({ x: idx, y: d, r: d }));
                    }
                    return (/** @type {?} */ (d));
                }));
            }
        }));
        /** @type {?} */
        const labels = newData.labels || [];
        if (maxPointsNum > 0 && labels.length < maxPointsNum) {
            for (let i = labels.length; i < maxPointsNum; i++) {
                labels.push('');
            }
            newData.labels = labels;
        }
        return newData;
    }
    /**
     * @private
     * @return {?}
     */
    _updateChart() {
        if (this._chart == null) {
            this._rebuildChart();
        }
        else {
            ((/** @type {?} */ (this._chart))).options = Object.assign(Object.assign({}, deepCopy(((/** @type {?} */ (this._chart))).options)), deepCopy(this.options || {}));
            this._chart.data = Object.assign(Object.assign({}, deepCopy(this._chart.data)), deepCopy(this.data));
            this._chart.update();
        }
    }
    /**
     * @private
     * @return {?}
     */
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
            /** @type {?} */
            const ctx = this._chartCanvasElement.getContext('2d');
            this._chart = new chartClass(ctx, {
                type: this.chartType,
                data: this._fixData(this.chartType, this.data),
                options: this._fixChartOptions(this.options)
            });
        }
    }
    /**
     * @private
     * @param {?} options
     * @return {?}
     */
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
            /** @type {?} */
            let newOptions = (/** @type {?} */ (options));
            newOptions.pieceLabel = {
                render: (/**
                 * @param {?} args
                 * @return {?}
                 */
                function (args) {
                    if (args.label) {
                        return args.label + ':' + args.value;
                    }
                    else {
                        return args.value;
                    }
                }),
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
if (false) {
    /** @type {?} */
    AjfChartComponent.prototype.data;
    /** @type {?} */
    AjfChartComponent.prototype.options;
    /** @type {?} */
    AjfChartComponent.prototype.chartType;
    /**
     * @type {?}
     * @private
     */
    AjfChartComponent.prototype._chart;
    /**
     * @type {?}
     * @private
     */
    AjfChartComponent.prototype._chartCanvasElement;
    /**
     * @type {?}
     * @private
     */
    AjfChartComponent.prototype._chartTypesNeedPoints;
    /**
     * @type {?}
     * @private
     */
    AjfChartComponent.prototype._el;
    /**
     * @type {?}
     * @private
     */
    AjfChartComponent.prototype._renderer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9jaGFydC9jaGFydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCQSxPQUFPLEVBQ1UsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQ3BFLFNBQVMsRUFBaUIsaUJBQWlCLEVBQzVDLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sS0FBSyxLQUFLLE1BQU0sVUFBVSxDQUFDOztNQUM1QixVQUFVLEdBQUcsQ0FBQyxtQkFBSyxLQUFLLEVBQUEsQ0FBQyxDQUFDLE9BQU8sSUFBSSxLQUFLO0FBR2hELE9BQU8scUJBQXFCLENBQUM7QUFFN0IsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBV3pDLE1BQU0sT0FBTyxpQkFBaUI7Ozs7O0lBUzVCLFlBQW9CLEdBQWUsRUFBVSxTQUFvQjtRQUE3QyxRQUFHLEdBQUgsR0FBRyxDQUFZO1FBQVUsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUZ6RCwwQkFBcUIsR0FBd0IsQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFFTixDQUFDOzs7O0lBRXRFLGVBQWU7UUFDYixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDdkIsQ0FBQzs7Ozs7SUFFRCxXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFBSSxXQUFXLElBQUksT0FBTyxFQUFFO1lBQzFCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUN0QjthQUFNLElBQUksU0FBUyxJQUFJLE9BQU8sSUFBSSxNQUFNLElBQUksT0FBTyxFQUFFO1lBQ3BELElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUNyQjtJQUNILENBQUM7Ozs7Ozs7SUFFTyxRQUFRLENBQUMsU0FBNEIsRUFBRSxJQUFlOztjQUN0RCxPQUFPLEdBQWMsUUFBUSxDQUFDLElBQUksQ0FBQzs7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Qzs7Ozs7SUFDakMsa0RBQTJFOzs7OztJQUUvRCxnQ0FBdUI7Ozs7O0lBQUUsc0NBQTRCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge1xuICBBZnRlclZpZXdJbml0LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBJbnB1dCwgT25DaGFuZ2VzLFxuICBSZW5kZXJlcjIsIFNpbXBsZUNoYW5nZXMsIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgKiBhcyBDaGFydCBmcm9tICdjaGFydC5qcyc7XG5jb25zdCBjaGFydENsYXNzID0gKDxhbnk+Q2hhcnQpLmRlZmF1bHQgfHwgQ2hhcnQ7XG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmVcbmltcG9ydCB7Q2hhcnREYXRhLCBDaGFydE9wdGlvbnMsIENoYXJ0UG9pbnR9IGZyb20gJ2NoYXJ0LmpzJztcbmltcG9ydCAnY2hhcnQucGllY2VsYWJlbC5qcyc7XG5cbmltcG9ydCB7ZGVlcENvcHl9IGZyb20gJ0BhamYvY29yZS91dGlscyc7XG5pbXBvcnQge0V4dGVuZGVkQ2hhcnRUeXBlfSBmcm9tICcuL2V4dGVuZGVkLWNoYXJ0LXR5cGUnO1xuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FqZi1jaGFydCcsXG4gIHRlbXBsYXRlVXJsOiAnY2hhcnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWydjaGFydC5jc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgQWpmQ2hhcnRDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkNoYW5nZXMge1xuICBASW5wdXQoKSBkYXRhOiBDaGFydERhdGE7XG4gIEBJbnB1dCgpIG9wdGlvbnM6IENoYXJ0T3B0aW9ucztcbiAgQElucHV0KCkgY2hhcnRUeXBlOiBFeHRlbmRlZENoYXJ0VHlwZTtcblxuICBwcml2YXRlIF9jaGFydDogQ2hhcnQgfCBudWxsO1xuICBwcml2YXRlIF9jaGFydENhbnZhc0VsZW1lbnQ6IGFueTtcbiAgcHJpdmF0ZSBfY2hhcnRUeXBlc05lZWRQb2ludHM6IEV4dGVuZGVkQ2hhcnRUeXBlW10gPSBbJ3NjYXR0ZXInLCAnYnViYmxlJ107XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfZWw6IEVsZW1lbnRSZWYsIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIpIHsgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9yZWJ1aWxkQ2hhcnQoKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBpZiAoJ2NoYXJ0VHlwZScgaW4gY2hhbmdlcykge1xuICAgICAgdGhpcy5fcmVidWlsZENoYXJ0KCk7XG4gICAgfSBlbHNlIGlmICgnb3B0aW9ucycgaW4gY2hhbmdlcyB8fCAnZGF0YScgaW4gY2hhbmdlcykge1xuICAgICAgdGhpcy5fdXBkYXRlQ2hhcnQoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9maXhEYXRhKGNoYXJ0VHlwZTogRXh0ZW5kZWRDaGFydFR5cGUsIGRhdGE6IENoYXJ0RGF0YSk6IENoYXJ0RGF0YSB7XG4gICAgY29uc3QgbmV3RGF0YTogQ2hhcnREYXRhID0gZGVlcENvcHkoZGF0YSk7XG4gICAgbGV0IG1heFBvaW50c051bSA9IDA7XG4gICAgKG5ld0RhdGEuZGF0YXNldHMgfHwgW10pLmZvckVhY2goKGRhdGFzZXQpID0+IHtcbiAgICAgIGlmIChkYXRhc2V0LmxhYmVsID09IG51bGwpIHtcbiAgICAgICAgZGF0YXNldC5sYWJlbCA9ICcnO1xuICAgICAgfVxuICAgICAgbWF4UG9pbnRzTnVtID0gTWF0aC5tYXgobWF4UG9pbnRzTnVtLCAoZGF0YXNldC5kYXRhIHx8IFtdKS5sZW5ndGgpO1xuICAgICAgY29uc3QgZGF0YXNldFR5cGUgPSBkYXRhc2V0LnR5cGUgIT0gbnVsbCA/IDxFeHRlbmRlZENoYXJ0VHlwZT5kYXRhc2V0LnR5cGUgOiBjaGFydFR5cGU7XG4gICAgICBpZiAodGhpcy5fY2hhcnRUeXBlc05lZWRQb2ludHMuaW5kZXhPZihkYXRhc2V0VHlwZSkgPiAtMSkge1xuICAgICAgICBkYXRhc2V0LmRhdGEgPSAoPGFueVtdPihkYXRhc2V0LmRhdGEgfHwgW10pKS5tYXAoKGQsIGlkeCkgPT4ge1xuICAgICAgICAgIGlmICh0eXBlb2YgZCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHJldHVybiA8YW55PnsgeDogaWR4LCB5OiBkLCByOiBkIH07XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiA8Q2hhcnRQb2ludD5kO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBjb25zdCBsYWJlbHMgPSBuZXdEYXRhLmxhYmVscyB8fCBbXTtcbiAgICBpZiAobWF4UG9pbnRzTnVtID4gMCAmJiBsYWJlbHMubGVuZ3RoIDwgbWF4UG9pbnRzTnVtKSB7XG4gICAgICBmb3IgKGxldCBpID0gbGFiZWxzLmxlbmd0aDsgaSA8IG1heFBvaW50c051bTsgaSsrKSB7XG4gICAgICAgIGxhYmVscy5wdXNoKCcnKTtcbiAgICAgIH1cbiAgICAgIG5ld0RhdGEubGFiZWxzID0gbGFiZWxzO1xuICAgIH1cbiAgICByZXR1cm4gbmV3RGF0YTtcbiAgfVxuXG4gIHByaXZhdGUgX3VwZGF0ZUNoYXJ0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9jaGFydCA9PSBudWxsKSB7XG4gICAgICB0aGlzLl9yZWJ1aWxkQ2hhcnQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgKDxhbnk+dGhpcy5fY2hhcnQpLm9wdGlvbnMgPSB7XG4gICAgICAgIC4uLmRlZXBDb3B5KCg8YW55PnRoaXMuX2NoYXJ0KS5vcHRpb25zKSxcbiAgICAgICAgLi4uZGVlcENvcHkodGhpcy5vcHRpb25zIHx8IHt9KVxuICAgICAgfTtcbiAgICAgIHRoaXMuX2NoYXJ0LmRhdGEgPSB7XG4gICAgICAgIC4uLmRlZXBDb3B5KHRoaXMuX2NoYXJ0LmRhdGEpLFxuICAgICAgICAuLi5kZWVwQ29weSh0aGlzLmRhdGEpXG4gICAgICB9O1xuICAgICAgdGhpcy5fY2hhcnQudXBkYXRlKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfcmVidWlsZENoYXJ0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9jaGFydCAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9jaGFydC5kZXN0cm95KCk7XG4gICAgICB0aGlzLl9jaGFydCA9IG51bGw7XG4gICAgfVxuICAgIGlmICh0aGlzLl9jaGFydENhbnZhc0VsZW1lbnQgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fcmVuZGVyZXIucmVtb3ZlQ2hpbGQodGhpcy5fZWwubmF0aXZlRWxlbWVudCwgdGhpcy5fY2hhcnRDYW52YXNFbGVtZW50KTtcbiAgICAgIHRoaXMuX2NoYXJ0Q2FudmFzRWxlbWVudCA9IG51bGw7XG4gICAgfVxuICAgIGlmICh0aGlzLmRhdGEgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fY2hhcnRDYW52YXNFbGVtZW50ID0gdGhpcy5fcmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9jaGFydENhbnZhc0VsZW1lbnQsICd3aWR0aCcsICdpbmhlcml0Jyk7XG4gICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9jaGFydENhbnZhc0VsZW1lbnQsICdoZWlnaHQnLCAnaW5oZXJpdCcpO1xuICAgICAgdGhpcy5fcmVuZGVyZXIuYXBwZW5kQ2hpbGQodGhpcy5fZWwubmF0aXZlRWxlbWVudCwgdGhpcy5fY2hhcnRDYW52YXNFbGVtZW50KTtcbiAgICAgIGNvbnN0IGN0eCA9IHRoaXMuX2NoYXJ0Q2FudmFzRWxlbWVudC5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgdGhpcy5fY2hhcnQgPSBuZXcgY2hhcnRDbGFzcyhjdHgsIHtcbiAgICAgICAgdHlwZTogdGhpcy5jaGFydFR5cGUsXG4gICAgICAgIGRhdGE6IHRoaXMuX2ZpeERhdGEodGhpcy5jaGFydFR5cGUsIHRoaXMuZGF0YSksXG4gICAgICAgIG9wdGlvbnM6IHRoaXMuX2ZpeENoYXJ0T3B0aW9ucyh0aGlzLm9wdGlvbnMpXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9maXhDaGFydE9wdGlvbnMob3B0aW9uczogQ2hhcnRPcHRpb25zKTogQ2hhcnRPcHRpb25zIHtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICBpZiAob3B0aW9ucy5zY2FsZXMgPT0gbnVsbCkge1xuICAgICAgb3B0aW9ucy5zY2FsZXMgPSB7IHhBeGVzOiBbXSwgeUF4ZXM6IFtdIH07XG4gICAgfVxuICAgIGlmIChvcHRpb25zLnNjYWxlcy54QXhlcyA9PSBudWxsKSB7XG4gICAgICBvcHRpb25zLnNjYWxlcy54QXhlcyA9IFtdO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy5zY2FsZXMueUF4ZXMgPT0gbnVsbCkge1xuICAgICAgb3B0aW9ucy5zY2FsZXMueUF4ZXMgPSBbXTtcbiAgICB9XG4gICAgaWYgKHRoaXMuY2hhcnRUeXBlID09ICdwaWUnKSB7XG4gICAgICBsZXQgbmV3T3B0aW9ucyA9IDxhbnk+b3B0aW9ucztcbiAgICAgIG5ld09wdGlvbnMucGllY2VMYWJlbCA9IHtcbiAgICAgICAgcmVuZGVyOiBmdW5jdGlvbiAoYXJnczogYW55KSB7XG4gICAgICAgICAgaWYgKGFyZ3MubGFiZWwpIHtcbiAgICAgICAgICAgIHJldHVybiBhcmdzLmxhYmVsICsgJzonICsgYXJncy52YWx1ZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGFyZ3MudmFsdWU7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBwb3NpdGlvbjogJ291dHNpZGUnXG4gICAgICB9O1xuICAgICAgcmV0dXJuIG5ld09wdGlvbnM7XG4gICAgfVxuICAgIHJldHVybiBvcHRpb25zO1xuICB9XG59XG4iXX0=