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
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('chart.js'), require('chart.piecelabel.js'), require('@ajf/core/utils')) :
    typeof define === 'function' && define.amd ? define('@ajf/core/chart', ['exports', '@angular/core', 'chart.js', 'chart.piecelabel.js', '@ajf/core/utils'], factory) :
    (global = global || self, factory((global.ajf = global.ajf || {}, global.ajf.core = global.ajf.core || {}, global.ajf.core.chart = {}), global.ng.core, global.chartJs, global.chartPiecelabel, global.ajf.core.utils));
}(this, function (exports, core, Chart__default, chart_piecelabel_js, utils) { 'use strict';

    var Chart__default__default = 'default' in Chart__default ? Chart__default['default'] : Chart__default;

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var chartClass = Chart__default__default || Chart__default;
    var AjfChartComponent = /** @class */ (function () {
        function AjfChartComponent(_el, _renderer) {
            this._el = _el;
            this._renderer = _renderer;
            this._chartTypesNeedPoints = ['scatter', 'bubble'];
        }
        /**
         * @return {?}
         */
        AjfChartComponent.prototype.ngAfterViewInit = /**
         * @return {?}
         */
        function () {
            this._rebuildChart();
        };
        /**
         * @param {?} changes
         * @return {?}
         */
        AjfChartComponent.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            if ('chartType' in changes) {
                this._rebuildChart();
            }
            else if ('options' in changes || 'data' in changes) {
                this._updateChart();
            }
        };
        /**
         * @private
         * @param {?} chartType
         * @param {?} data
         * @return {?}
         */
        AjfChartComponent.prototype._fixData = /**
         * @private
         * @param {?} chartType
         * @param {?} data
         * @return {?}
         */
        function (chartType, data) {
            var _this = this;
            /** @type {?} */
            var newData = utils.deepCopy(data);
            /** @type {?} */
            var maxPointsNum = 0;
            (newData.datasets || []).forEach((/**
             * @param {?} dataset
             * @return {?}
             */
            function (dataset) {
                if (dataset.label == null) {
                    dataset.label = '';
                }
                maxPointsNum = Math.max(maxPointsNum, (dataset.data || []).length);
                /** @type {?} */
                var datasetType = dataset.type != null ? (/** @type {?} */ (dataset.type)) : chartType;
                if (_this._chartTypesNeedPoints.indexOf(datasetType) > -1) {
                    dataset.data = ((/** @type {?} */ ((dataset.data || [])))).map((/**
                     * @param {?} d
                     * @param {?} idx
                     * @return {?}
                     */
                    function (d, idx) {
                        if (typeof d === 'number') {
                            return (/** @type {?} */ ({ x: idx, y: d, r: d }));
                        }
                        return (/** @type {?} */ (d));
                    }));
                }
            }));
            /** @type {?} */
            var labels = newData.labels || [];
            if (maxPointsNum > 0 && labels.length < maxPointsNum) {
                for (var i = labels.length; i < maxPointsNum; i++) {
                    labels.push('');
                }
                newData.labels = labels;
            }
            return newData;
        };
        /**
         * @private
         * @return {?}
         */
        AjfChartComponent.prototype._updateChart = /**
         * @private
         * @return {?}
         */
        function () {
            if (this._chart == null) {
                this._rebuildChart();
            }
            else {
                ((/** @type {?} */ (this._chart))).options = __assign({}, utils.deepCopy(((/** @type {?} */ (this._chart))).options), utils.deepCopy(this.options || {}));
                this._chart.data = __assign({}, utils.deepCopy(this._chart.data), utils.deepCopy(this.data));
                this._chart.update();
            }
        };
        /**
         * @private
         * @return {?}
         */
        AjfChartComponent.prototype._rebuildChart = /**
         * @private
         * @return {?}
         */
        function () {
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
                var ctx = this._chartCanvasElement.getContext('2d');
                this._chart = new chartClass(ctx, {
                    type: this.chartType,
                    data: this._fixData(this.chartType, this.data),
                    options: this._fixChartOptions(this.options)
                });
            }
        };
        /**
         * @private
         * @param {?} options
         * @return {?}
         */
        AjfChartComponent.prototype._fixChartOptions = /**
         * @private
         * @param {?} options
         * @return {?}
         */
        function (options) {
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
                var newOptions = (/** @type {?} */ (options));
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
        };
        AjfChartComponent.decorators = [
            { type: core.Component, args: [{selector: 'ajf-chart',
                        template: "",
                        styles: ["ajf-chart{display:block;width:inherit;height:inherit;position:relative}"],
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None
                    },] },
        ];
        /** @nocollapse */
        AjfChartComponent.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: core.Renderer2 }
        ]; };
        AjfChartComponent.propDecorators = {
            data: [{ type: core.Input }],
            options: [{ type: core.Input }],
            chartType: [{ type: core.Input }]
        };
        return AjfChartComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var AjfChartModule = /** @class */ (function () {
        function AjfChartModule() {
        }
        AjfChartModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [
                            AjfChartComponent
                        ],
                        exports: [
                            AjfChartComponent
                        ]
                    },] },
        ];
        return AjfChartModule;
    }());

    exports.AjfChartComponent = AjfChartComponent;
    exports.AjfChartModule = AjfChartModule;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=core-chart.umd.js.map
