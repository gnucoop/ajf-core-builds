(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('chart.js'), require('tslib'), require('@angular/core'), require('chart.piecelabel.js'), require('@ajf/core/utils')) :
    typeof define === 'function' && define.amd ? define('@ajf/core/chart', ['exports', 'chart.js', 'tslib', '@angular/core', 'chart.piecelabel.js', '@ajf/core/utils'], factory) :
    (global = global || self, factory((global.ajf = global.ajf || {}, global.ajf.core = global.ajf.core || {}, global.ajf.core.chart = {}), global.Chart, global.tslib, global.ng.core, global.Chart.piecelabel, global.ng.core.utils));
}(this, (function (exports, Chart, tslib, core, chart_piecelabel_js, utils) { 'use strict';

    var Chart__default = 'default' in Chart ? Chart['default'] : Chart;

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
    var chartClass = Chart__default || Chart;
    function registerChartPlugins(plugins) {
        if (plugins != null && plugins.length > 0) {
            plugins.forEach(function (plugin) { return chartClass.plugins.register(plugin); });
        }
    }

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
    var chartClass$1 = Chart__default || Chart;
    var AjfChartComponent = /** @class */ (function () {
        function AjfChartComponent(_el, _renderer) {
            this._el = _el;
            this._renderer = _renderer;
            this._chartTypesNeedPoints = ['scatter', 'bubble'];
        }
        AjfChartComponent.prototype.ngAfterViewInit = function () {
            this._rebuildChart();
        };
        AjfChartComponent.prototype.ngOnChanges = function (changes) {
            if ('chartType' in changes) {
                this._rebuildChart();
            }
            else if ('options' in changes || 'data' in changes) {
                this._updateChart();
            }
        };
        AjfChartComponent.prototype._fixData = function (chartType, data) {
            var _this = this;
            var newData = utils.deepCopy(data);
            var maxPointsNum = 0;
            (newData.datasets || []).forEach(function (dataset) {
                if (dataset.label == null) {
                    dataset.label = '';
                }
                maxPointsNum = Math.max(maxPointsNum, (dataset.data || []).length);
                var datasetType = dataset.type != null ? dataset.type : chartType;
                if (_this._chartTypesNeedPoints.indexOf(datasetType) > -1) {
                    dataset.data = (dataset.data || []).map(function (d, idx) {
                        if (typeof d === 'number') {
                            return { x: idx, y: d, r: d };
                        }
                        return d;
                    });
                }
            });
            var labels = newData.labels || [];
            if (maxPointsNum > 0 && labels.length < maxPointsNum) {
                for (var i = labels.length; i < maxPointsNum; i++) {
                    labels.push('');
                }
                newData.labels = labels;
            }
            return newData;
        };
        AjfChartComponent.prototype._updateChart = function () {
            if (this._chart == null) {
                this._rebuildChart();
            }
            else {
                this._chart.options = tslib.__assign(tslib.__assign({}, utils.deepCopy(this._chart.options)), utils.deepCopy(this.options || {}));
                this._chart.data = tslib.__assign(tslib.__assign({}, utils.deepCopy(this._chart.data)), utils.deepCopy(this.data));
                this._chart.update();
            }
        };
        AjfChartComponent.prototype._rebuildChart = function () {
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
                var ctx = this._chartCanvasElement.getContext('2d');
                this._chart = new chartClass$1(ctx, {
                    type: this.chartType,
                    data: this._fixData(this.chartType, this.data),
                    options: this._fixChartOptions(this.options)
                });
            }
        };
        AjfChartComponent.prototype._fixChartOptions = function (options) {
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
                var newOptions = options;
                newOptions.pieceLabel = {
                    render: function (args) {
                        if (args.label) {
                            return args.label + ':' + args.value;
                        }
                        else {
                            return args.value;
                        }
                    },
                    position: 'outside'
                };
                return newOptions;
            }
            return options;
        };
        AjfChartComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'ajf-chart',
                        template: "",
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                        styles: ["ajf-chart{display:block;width:inherit;height:inherit;position:relative}\n"]
                    }] }
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
                    },] }
        ];
        return AjfChartModule;
    }());

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

    /**
     * Generated bundle index. Do not edit.
     */

    exports.AjfChartComponent = AjfChartComponent;
    exports.AjfChartModule = AjfChartModule;
    exports.registerChartPlugins = registerChartPlugins;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=core-chart.umd.js.map
