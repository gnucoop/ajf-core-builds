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
import { Component, ChangeDetectionStrategy, ViewEncapsulation, ElementRef, Renderer2, Input, NgModule } from '@angular/core';
import * as Chart from 'chart.js';
import Chart__default, {  } from 'chart.js';
import 'chart.piecelabel.js';
import { deepCopy } from '@ajf/core/utils';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const chartClass = Chart__default || Chart;
class AjfChartComponent {
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
            ((/** @type {?} */ (this._chart))).options = Object.assign({}, deepCopy(((/** @type {?} */ (this._chart))).options), deepCopy(this.options || {}));
            this._chart.data = Object.assign({}, deepCopy(this._chart.data), deepCopy(this.data));
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
    { type: Component, args: [{selector: 'ajf-chart',
                template: "",
                styles: ["ajf-chart{display:block;width:inherit;height:inherit;position:relative}"],
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None
            },] },
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfChartModule {
}
AjfChartModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    AjfChartComponent
                ],
                exports: [
                    AjfChartComponent
                ]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { AjfChartComponent, AjfChartModule };
//# sourceMappingURL=chart.js.map
