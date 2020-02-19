/**
 * @fileoverview added by tsickle
 * Generated from: src/core/chart/chart.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright (C) 2018 Gnucoop soc. coop.
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9jaGFydC9jaGFydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCQSxPQUFPLEVBQ1UsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQ3BFLFNBQVMsRUFBaUIsaUJBQWlCLEVBQzVDLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sS0FBSyxLQUFLLE1BQU0sVUFBVSxDQUFDOztNQUM1QixVQUFVLEdBQUcsQ0FBQyxtQkFBSyxLQUFLLEVBQUEsQ0FBQyxDQUFDLE9BQU8sSUFBSSxLQUFLO0FBR2hELE9BQU8scUJBQXFCLENBQUM7QUFFN0IsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBV3pDLE1BQU0sT0FBTyxpQkFBaUI7Ozs7O0lBUzVCLFlBQW9CLEdBQWUsRUFBVSxTQUFvQjtRQUE3QyxRQUFHLEdBQUgsR0FBRyxDQUFZO1FBQVUsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUZ6RCwwQkFBcUIsR0FBd0IsQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFFTixDQUFDOzs7O0lBRXRFLGVBQWU7UUFDYixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDdkIsQ0FBQzs7Ozs7SUFFRCxXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFBSSxXQUFXLElBQUksT0FBTyxFQUFFO1lBQzFCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUN0QjthQUFNLElBQUksU0FBUyxJQUFJLE9BQU8sSUFBSSxNQUFNLElBQUksT0FBTyxFQUFFO1lBQ3BELElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUNyQjtJQUNILENBQUM7Ozs7Ozs7SUFFTyxRQUFRLENBQUMsU0FBNEIsRUFBRSxJQUFlOztjQUN0RCxPQUFPLEdBQWMsUUFBUSxDQUFDLElBQUksQ0FBQzs7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Qzs7Ozs7SUFDakMsa0RBQTJFOzs7OztJQUUvRCxnQ0FBdUI7Ozs7O0lBQUUsc0NBQTRCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSAyMDE4IEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIEVsZW1lbnRSZWYsIElucHV0LCBPbkNoYW5nZXMsXG4gIFJlbmRlcmVyMiwgU2ltcGxlQ2hhbmdlcywgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCAqIGFzIENoYXJ0IGZyb20gJ2NoYXJ0LmpzJztcbmNvbnN0IGNoYXJ0Q2xhc3MgPSAoPGFueT5DaGFydCkuZGVmYXVsdCB8fCBDaGFydDtcbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZVxuaW1wb3J0IHtDaGFydERhdGEsIENoYXJ0T3B0aW9ucywgQ2hhcnRQb2ludH0gZnJvbSAnY2hhcnQuanMnO1xuaW1wb3J0ICdjaGFydC5waWVjZWxhYmVsLmpzJztcblxuaW1wb3J0IHtkZWVwQ29weX0gZnJvbSAnQGFqZi9jb3JlL3V0aWxzJztcbmltcG9ydCB7RXh0ZW5kZWRDaGFydFR5cGV9IGZyb20gJy4vZXh0ZW5kZWQtY2hhcnQtdHlwZSc7XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWpmLWNoYXJ0JyxcbiAgdGVtcGxhdGVVcmw6ICdjaGFydC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ2NoYXJ0LmNzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBBamZDaGFydENvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpIGRhdGE6IENoYXJ0RGF0YTtcbiAgQElucHV0KCkgb3B0aW9uczogQ2hhcnRPcHRpb25zO1xuICBASW5wdXQoKSBjaGFydFR5cGU6IEV4dGVuZGVkQ2hhcnRUeXBlO1xuXG4gIHByaXZhdGUgX2NoYXJ0OiBDaGFydCB8IG51bGw7XG4gIHByaXZhdGUgX2NoYXJ0Q2FudmFzRWxlbWVudDogYW55O1xuICBwcml2YXRlIF9jaGFydFR5cGVzTmVlZFBvaW50czogRXh0ZW5kZWRDaGFydFR5cGVbXSA9IFsnc2NhdHRlcicsICdidWJibGUnXTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9lbDogRWxlbWVudFJlZiwgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMikgeyB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHRoaXMuX3JlYnVpbGRDaGFydCgpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGlmICgnY2hhcnRUeXBlJyBpbiBjaGFuZ2VzKSB7XG4gICAgICB0aGlzLl9yZWJ1aWxkQ2hhcnQoKTtcbiAgICB9IGVsc2UgaWYgKCdvcHRpb25zJyBpbiBjaGFuZ2VzIHx8ICdkYXRhJyBpbiBjaGFuZ2VzKSB7XG4gICAgICB0aGlzLl91cGRhdGVDaGFydCgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2ZpeERhdGEoY2hhcnRUeXBlOiBFeHRlbmRlZENoYXJ0VHlwZSwgZGF0YTogQ2hhcnREYXRhKTogQ2hhcnREYXRhIHtcbiAgICBjb25zdCBuZXdEYXRhOiBDaGFydERhdGEgPSBkZWVwQ29weShkYXRhKTtcbiAgICBsZXQgbWF4UG9pbnRzTnVtID0gMDtcbiAgICAobmV3RGF0YS5kYXRhc2V0cyB8fCBbXSkuZm9yRWFjaCgoZGF0YXNldCkgPT4ge1xuICAgICAgaWYgKGRhdGFzZXQubGFiZWwgPT0gbnVsbCkge1xuICAgICAgICBkYXRhc2V0LmxhYmVsID0gJyc7XG4gICAgICB9XG4gICAgICBtYXhQb2ludHNOdW0gPSBNYXRoLm1heChtYXhQb2ludHNOdW0sIChkYXRhc2V0LmRhdGEgfHwgW10pLmxlbmd0aCk7XG4gICAgICBjb25zdCBkYXRhc2V0VHlwZSA9IGRhdGFzZXQudHlwZSAhPSBudWxsID8gPEV4dGVuZGVkQ2hhcnRUeXBlPmRhdGFzZXQudHlwZSA6IGNoYXJ0VHlwZTtcbiAgICAgIGlmICh0aGlzLl9jaGFydFR5cGVzTmVlZFBvaW50cy5pbmRleE9mKGRhdGFzZXRUeXBlKSA+IC0xKSB7XG4gICAgICAgIGRhdGFzZXQuZGF0YSA9ICg8YW55W10+KGRhdGFzZXQuZGF0YSB8fCBbXSkpLm1hcCgoZCwgaWR4KSA9PiB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBkID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgcmV0dXJuIDxhbnk+eyB4OiBpZHgsIHk6IGQsIHI6IGQgfTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIDxDaGFydFBvaW50PmQ7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGNvbnN0IGxhYmVscyA9IG5ld0RhdGEubGFiZWxzIHx8IFtdO1xuICAgIGlmIChtYXhQb2ludHNOdW0gPiAwICYmIGxhYmVscy5sZW5ndGggPCBtYXhQb2ludHNOdW0pIHtcbiAgICAgIGZvciAobGV0IGkgPSBsYWJlbHMubGVuZ3RoOyBpIDwgbWF4UG9pbnRzTnVtOyBpKyspIHtcbiAgICAgICAgbGFiZWxzLnB1c2goJycpO1xuICAgICAgfVxuICAgICAgbmV3RGF0YS5sYWJlbHMgPSBsYWJlbHM7XG4gICAgfVxuICAgIHJldHVybiBuZXdEYXRhO1xuICB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlQ2hhcnQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2NoYXJ0ID09IG51bGwpIHtcbiAgICAgIHRoaXMuX3JlYnVpbGRDaGFydCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAoPGFueT50aGlzLl9jaGFydCkub3B0aW9ucyA9IHtcbiAgICAgICAgLi4uZGVlcENvcHkoKDxhbnk+dGhpcy5fY2hhcnQpLm9wdGlvbnMpLFxuICAgICAgICAuLi5kZWVwQ29weSh0aGlzLm9wdGlvbnMgfHwge30pXG4gICAgICB9O1xuICAgICAgdGhpcy5fY2hhcnQuZGF0YSA9IHtcbiAgICAgICAgLi4uZGVlcENvcHkodGhpcy5fY2hhcnQuZGF0YSksXG4gICAgICAgIC4uLmRlZXBDb3B5KHRoaXMuZGF0YSlcbiAgICAgIH07XG4gICAgICB0aGlzLl9jaGFydC51cGRhdGUoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9yZWJ1aWxkQ2hhcnQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2NoYXJ0ICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX2NoYXJ0LmRlc3Ryb3koKTtcbiAgICAgIHRoaXMuX2NoYXJ0ID0gbnVsbDtcbiAgICB9XG4gICAgaWYgKHRoaXMuX2NoYXJ0Q2FudmFzRWxlbWVudCAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVDaGlsZCh0aGlzLl9lbC5uYXRpdmVFbGVtZW50LCB0aGlzLl9jaGFydENhbnZhc0VsZW1lbnQpO1xuICAgICAgdGhpcy5fY2hhcnRDYW52YXNFbGVtZW50ID0gbnVsbDtcbiAgICB9XG4gICAgaWYgKHRoaXMuZGF0YSAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9jaGFydENhbnZhc0VsZW1lbnQgPSB0aGlzLl9yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX2NoYXJ0Q2FudmFzRWxlbWVudCwgJ3dpZHRoJywgJ2luaGVyaXQnKTtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX2NoYXJ0Q2FudmFzRWxlbWVudCwgJ2hlaWdodCcsICdpbmhlcml0Jyk7XG4gICAgICB0aGlzLl9yZW5kZXJlci5hcHBlbmRDaGlsZCh0aGlzLl9lbC5uYXRpdmVFbGVtZW50LCB0aGlzLl9jaGFydENhbnZhc0VsZW1lbnQpO1xuICAgICAgY29uc3QgY3R4ID0gdGhpcy5fY2hhcnRDYW52YXNFbGVtZW50LmdldENvbnRleHQoJzJkJyk7XG4gICAgICB0aGlzLl9jaGFydCA9IG5ldyBjaGFydENsYXNzKGN0eCwge1xuICAgICAgICB0eXBlOiB0aGlzLmNoYXJ0VHlwZSxcbiAgICAgICAgZGF0YTogdGhpcy5fZml4RGF0YSh0aGlzLmNoYXJ0VHlwZSwgdGhpcy5kYXRhKSxcbiAgICAgICAgb3B0aW9uczogdGhpcy5fZml4Q2hhcnRPcHRpb25zKHRoaXMub3B0aW9ucylcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2ZpeENoYXJ0T3B0aW9ucyhvcHRpb25zOiBDaGFydE9wdGlvbnMpOiBDaGFydE9wdGlvbnMge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIGlmIChvcHRpb25zLnNjYWxlcyA9PSBudWxsKSB7XG4gICAgICBvcHRpb25zLnNjYWxlcyA9IHsgeEF4ZXM6IFtdLCB5QXhlczogW10gfTtcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMuc2NhbGVzLnhBeGVzID09IG51bGwpIHtcbiAgICAgIG9wdGlvbnMuc2NhbGVzLnhBeGVzID0gW107XG4gICAgfVxuICAgIGlmIChvcHRpb25zLnNjYWxlcy55QXhlcyA9PSBudWxsKSB7XG4gICAgICBvcHRpb25zLnNjYWxlcy55QXhlcyA9IFtdO1xuICAgIH1cbiAgICBpZiAodGhpcy5jaGFydFR5cGUgPT0gJ3BpZScpIHtcbiAgICAgIGxldCBuZXdPcHRpb25zID0gPGFueT5vcHRpb25zO1xuICAgICAgbmV3T3B0aW9ucy5waWVjZUxhYmVsID0ge1xuICAgICAgICByZW5kZXI6IGZ1bmN0aW9uIChhcmdzOiBhbnkpIHtcbiAgICAgICAgICBpZiAoYXJncy5sYWJlbCkge1xuICAgICAgICAgICAgcmV0dXJuIGFyZ3MubGFiZWwgKyAnOicgKyBhcmdzLnZhbHVlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gYXJncy52YWx1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHBvc2l0aW9uOiAnb3V0c2lkZSdcbiAgICAgIH07XG4gICAgICByZXR1cm4gbmV3T3B0aW9ucztcbiAgICB9XG4gICAgcmV0dXJuIG9wdGlvbnM7XG4gIH1cbn1cbiJdfQ==