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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9jaGFydC9jaGFydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCQSxPQUFPLEVBRUwsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsS0FBSyxFQUVMLFNBQVMsRUFFVCxpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxLQUFLLEtBQUssTUFBTSxVQUFVLENBQUM7O01BQzVCLFVBQVUsR0FBRyxDQUFDLG1CQUFLLEtBQUssRUFBQSxDQUFDLENBQUMsT0FBTyxJQUFJLEtBQUs7QUFHaEQsT0FBTyxxQkFBcUIsQ0FBQztBQUU3QixPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFXekMsTUFBTSxPQUFPLGlCQUFpQjs7Ozs7SUFTNUIsWUFBb0IsR0FBZSxFQUFVLFNBQW9CO1FBQTdDLFFBQUcsR0FBSCxHQUFHLENBQVk7UUFBVSxjQUFTLEdBQVQsU0FBUyxDQUFXO1FBRnpELDBCQUFxQixHQUF3QixDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUVQLENBQUM7Ozs7SUFFckUsZUFBZTtRQUNiLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN2QixDQUFDOzs7OztJQUVELFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxJQUFJLFdBQVcsSUFBSSxPQUFPLEVBQUU7WUFDMUIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQ3RCO2FBQU0sSUFBSSxTQUFTLElBQUksT0FBTyxJQUFJLE1BQU0sSUFBSSxPQUFPLEVBQUU7WUFDcEQsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1NBQ3JCO0lBQ0gsQ0FBQzs7Ozs7OztJQUVPLFFBQVEsQ0FBQyxTQUE0QixFQUFFLElBQWU7O2NBQ3RELE9BQU8sR0FBYyxRQUFRLENBQUMsSUFBSSxDQUFDOztZ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OztJQUNqQyxrREFBMkU7Ozs7O0lBRS9ELGdDQUF1Qjs7Ozs7SUFBRSxzQ0FBNEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIFJlbmRlcmVyMixcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCAqIGFzIENoYXJ0IGZyb20gJ2NoYXJ0LmpzJztcbmNvbnN0IGNoYXJ0Q2xhc3MgPSAoPGFueT5DaGFydCkuZGVmYXVsdCB8fCBDaGFydDtcbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZVxuaW1wb3J0IHtDaGFydERhdGEsIENoYXJ0T3B0aW9ucywgQ2hhcnRQb2ludH0gZnJvbSAnY2hhcnQuanMnO1xuaW1wb3J0ICdjaGFydC5waWVjZWxhYmVsLmpzJztcblxuaW1wb3J0IHtkZWVwQ29weX0gZnJvbSAnQGFqZi9jb3JlL3V0aWxzJztcbmltcG9ydCB7RXh0ZW5kZWRDaGFydFR5cGV9IGZyb20gJy4vZXh0ZW5kZWQtY2hhcnQtdHlwZSc7XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWpmLWNoYXJ0JyxcbiAgdGVtcGxhdGVVcmw6ICdjaGFydC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ2NoYXJ0LmNzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBBamZDaGFydENvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpIGRhdGE6IENoYXJ0RGF0YTtcbiAgQElucHV0KCkgb3B0aW9uczogQ2hhcnRPcHRpb25zO1xuICBASW5wdXQoKSBjaGFydFR5cGU6IEV4dGVuZGVkQ2hhcnRUeXBlO1xuXG4gIHByaXZhdGUgX2NoYXJ0OiBDaGFydHxudWxsO1xuICBwcml2YXRlIF9jaGFydENhbnZhc0VsZW1lbnQ6IGFueTtcbiAgcHJpdmF0ZSBfY2hhcnRUeXBlc05lZWRQb2ludHM6IEV4dGVuZGVkQ2hhcnRUeXBlW10gPSBbJ3NjYXR0ZXInLCAnYnViYmxlJ107XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfZWw6IEVsZW1lbnRSZWYsIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIpIHt9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHRoaXMuX3JlYnVpbGRDaGFydCgpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGlmICgnY2hhcnRUeXBlJyBpbiBjaGFuZ2VzKSB7XG4gICAgICB0aGlzLl9yZWJ1aWxkQ2hhcnQoKTtcbiAgICB9IGVsc2UgaWYgKCdvcHRpb25zJyBpbiBjaGFuZ2VzIHx8ICdkYXRhJyBpbiBjaGFuZ2VzKSB7XG4gICAgICB0aGlzLl91cGRhdGVDaGFydCgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2ZpeERhdGEoY2hhcnRUeXBlOiBFeHRlbmRlZENoYXJ0VHlwZSwgZGF0YTogQ2hhcnREYXRhKTogQ2hhcnREYXRhIHtcbiAgICBjb25zdCBuZXdEYXRhOiBDaGFydERhdGEgPSBkZWVwQ29weShkYXRhKTtcbiAgICBsZXQgbWF4UG9pbnRzTnVtID0gMDtcbiAgICAobmV3RGF0YS5kYXRhc2V0cyB8fCBbXSkuZm9yRWFjaCgoZGF0YXNldCkgPT4ge1xuICAgICAgaWYgKGRhdGFzZXQubGFiZWwgPT0gbnVsbCkge1xuICAgICAgICBkYXRhc2V0LmxhYmVsID0gJyc7XG4gICAgICB9XG4gICAgICBtYXhQb2ludHNOdW0gPSBNYXRoLm1heChtYXhQb2ludHNOdW0sIChkYXRhc2V0LmRhdGEgfHwgW10pLmxlbmd0aCk7XG4gICAgICBjb25zdCBkYXRhc2V0VHlwZSA9IGRhdGFzZXQudHlwZSAhPSBudWxsID8gPEV4dGVuZGVkQ2hhcnRUeXBlPmRhdGFzZXQudHlwZSA6IGNoYXJ0VHlwZTtcbiAgICAgIGlmICh0aGlzLl9jaGFydFR5cGVzTmVlZFBvaW50cy5pbmRleE9mKGRhdGFzZXRUeXBlKSA+IC0xKSB7XG4gICAgICAgIGRhdGFzZXQuZGF0YSA9ICg8YW55W10+KGRhdGFzZXQuZGF0YSB8fCBbXSkpLm1hcCgoZCwgaWR4KSA9PiB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBkID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgcmV0dXJuIDxhbnk+e3g6IGlkeCwgeTogZCwgcjogZH07XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiA8Q2hhcnRQb2ludD5kO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBjb25zdCBsYWJlbHMgPSBuZXdEYXRhLmxhYmVscyB8fCBbXTtcbiAgICBpZiAobWF4UG9pbnRzTnVtID4gMCAmJiBsYWJlbHMubGVuZ3RoIDwgbWF4UG9pbnRzTnVtKSB7XG4gICAgICBmb3IgKGxldCBpID0gbGFiZWxzLmxlbmd0aDsgaSA8IG1heFBvaW50c051bTsgaSsrKSB7XG4gICAgICAgIGxhYmVscy5wdXNoKCcnKTtcbiAgICAgIH1cbiAgICAgIG5ld0RhdGEubGFiZWxzID0gbGFiZWxzO1xuICAgIH1cbiAgICByZXR1cm4gbmV3RGF0YTtcbiAgfVxuXG4gIHByaXZhdGUgX3VwZGF0ZUNoYXJ0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9jaGFydCA9PSBudWxsKSB7XG4gICAgICB0aGlzLl9yZWJ1aWxkQ2hhcnQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgKDxhbnk+dGhpcy5fY2hhcnQpLm9wdGlvbnMgPSB7XG4gICAgICAgIC4uLmRlZXBDb3B5KCg8YW55PnRoaXMuX2NoYXJ0KS5vcHRpb25zKSxcbiAgICAgICAgLi4uZGVlcENvcHkodGhpcy5vcHRpb25zIHx8IHt9KVxuICAgICAgfTtcbiAgICAgIHRoaXMuX2NoYXJ0LmRhdGEgPSB7Li4uZGVlcENvcHkodGhpcy5fY2hhcnQuZGF0YSksIC4uLmRlZXBDb3B5KHRoaXMuZGF0YSl9O1xuICAgICAgdGhpcy5fY2hhcnQudXBkYXRlKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfcmVidWlsZENoYXJ0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9jaGFydCAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9jaGFydC5kZXN0cm95KCk7XG4gICAgICB0aGlzLl9jaGFydCA9IG51bGw7XG4gICAgfVxuICAgIGlmICh0aGlzLl9jaGFydENhbnZhc0VsZW1lbnQgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fcmVuZGVyZXIucmVtb3ZlQ2hpbGQodGhpcy5fZWwubmF0aXZlRWxlbWVudCwgdGhpcy5fY2hhcnRDYW52YXNFbGVtZW50KTtcbiAgICAgIHRoaXMuX2NoYXJ0Q2FudmFzRWxlbWVudCA9IG51bGw7XG4gICAgfVxuICAgIGlmICh0aGlzLmRhdGEgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fY2hhcnRDYW52YXNFbGVtZW50ID0gdGhpcy5fcmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9jaGFydENhbnZhc0VsZW1lbnQsICd3aWR0aCcsICdpbmhlcml0Jyk7XG4gICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9jaGFydENhbnZhc0VsZW1lbnQsICdoZWlnaHQnLCAnaW5oZXJpdCcpO1xuICAgICAgdGhpcy5fcmVuZGVyZXIuYXBwZW5kQ2hpbGQodGhpcy5fZWwubmF0aXZlRWxlbWVudCwgdGhpcy5fY2hhcnRDYW52YXNFbGVtZW50KTtcbiAgICAgIGNvbnN0IGN0eCA9IHRoaXMuX2NoYXJ0Q2FudmFzRWxlbWVudC5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgdGhpcy5fY2hhcnQgPSBuZXcgY2hhcnRDbGFzcyhjdHgsIHtcbiAgICAgICAgdHlwZTogdGhpcy5jaGFydFR5cGUsXG4gICAgICAgIGRhdGE6IHRoaXMuX2ZpeERhdGEodGhpcy5jaGFydFR5cGUsIHRoaXMuZGF0YSksXG4gICAgICAgIG9wdGlvbnM6IHRoaXMuX2ZpeENoYXJ0T3B0aW9ucyh0aGlzLm9wdGlvbnMpXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9maXhDaGFydE9wdGlvbnMob3B0aW9uczogQ2hhcnRPcHRpb25zKTogQ2hhcnRPcHRpb25zIHtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICBpZiAob3B0aW9ucy5zY2FsZXMgPT0gbnVsbCkge1xuICAgICAgb3B0aW9ucy5zY2FsZXMgPSB7eEF4ZXM6IFtdLCB5QXhlczogW119O1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy5zY2FsZXMueEF4ZXMgPT0gbnVsbCkge1xuICAgICAgb3B0aW9ucy5zY2FsZXMueEF4ZXMgPSBbXTtcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMuc2NhbGVzLnlBeGVzID09IG51bGwpIHtcbiAgICAgIG9wdGlvbnMuc2NhbGVzLnlBeGVzID0gW107XG4gICAgfVxuICAgIGlmICh0aGlzLmNoYXJ0VHlwZSA9PSAncGllJykge1xuICAgICAgbGV0IG5ld09wdGlvbnMgPSA8YW55Pm9wdGlvbnM7XG4gICAgICBuZXdPcHRpb25zLnBpZWNlTGFiZWwgPSB7XG4gICAgICAgIHJlbmRlcjogZnVuY3Rpb24oYXJnczogYW55KSB7XG4gICAgICAgICAgaWYgKGFyZ3MubGFiZWwpIHtcbiAgICAgICAgICAgIHJldHVybiBhcmdzLmxhYmVsICsgJzonICsgYXJncy52YWx1ZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGFyZ3MudmFsdWU7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBwb3NpdGlvbjogJ291dHNpZGUnXG4gICAgICB9O1xuICAgICAgcmV0dXJuIG5ld09wdGlvbnM7XG4gICAgfVxuICAgIHJldHVybiBvcHRpb25zO1xuICB9XG59XG4iXX0=