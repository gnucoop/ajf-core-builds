(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('chart.js'), require('@ajf/core/utils'), require('@angular/core')) :
    typeof define === 'function' && define.amd ? define('@ajf/core/chart', ['exports', 'chart.js', '@ajf/core/utils', '@angular/core'], factory) :
    (global = global || self, factory((global.ajf = global.ajf || {}, global.ajf.core = global.ajf.core || {}, global.ajf.core.chart = {}), global.Chart, global.ajf.core.utils, global.ng.core));
}(this, (function (exports, chart_js, utils, core) { 'use strict';

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
    function registerChartPlugins(plugins) {
        if (plugins != null && plugins.length > 0) {
            plugins.forEach(function (plugin) { return chart_js.Chart.plugins.register(plugin); });
        }
    }

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
            var _this = this;
            if ('chartType' in changes) {
                this._rebuildChart();
            }
            else if ('options' in changes || 'data' in changes) {
                this._updateChart();
            }
            if ('instance' in changes) {
                this.instance.canvasDataUrl = function () {
                    if (_this._chartCanvasElement == null) {
                        return '';
                    }
                    return _this._chartCanvasElement.toDataURL();
                };
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
                this._chart.options = Object.assign(Object.assign({}, utils.deepCopy(this._chart.options)), utils.deepCopy(this.options || {}));
                this._chart.data = Object.assign(Object.assign({}, utils.deepCopy(this._chart.data)), utils.deepCopy(this.data));
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
                var widgetExportElement = this._el.nativeElement.parentElement.parentElement;
                var height = widgetExportElement.clientHeight;
                var width = widgetExportElement.clientWidth;
                if (widgetExportElement != null) {
                    if (height > 0) {
                        this._renderer.setStyle(this._el.nativeElement, 'height', height + "px");
                        this._renderer.setStyle(this._chartCanvasElement, 'height', height + "px");
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
                var ctx = this._chartCanvasElement.getContext('2d');
                this._chart = new chart_js.Chart(ctx, {
                    type: this.chartType,
                    data: this._fixData(this.chartType, this.data),
                    options: this._fixChartOptions(this.options)
                });
            }
        };
        AjfChartComponent.prototype._fixChartOptions = function (options) {
            options = options || {};
            if (options.legendCallback) {
                var legendCallback = (typeof options.legendCallback === 'string' ?
                    new Function(options.legendCallback) :
                    options.legendCallback);
                options.legendCallback = legendCallback;
            }
            if (options.onHover) {
                var onHover = (typeof options.onHover === 'string' ?
                    new Function(options.onHover) :
                    options.onHover);
                options.onHover = onHover;
            }
            if (options.onClick) {
                var onClick = (typeof options.onClick === 'string' ?
                    new Function(options.onClick) :
                    options.onClick);
                options.onClick = onClick;
            }
            if (options.onResize) {
                var onResize = (typeof options.onResize === 'string' ?
                    new Function(options.onResize) :
                    options.onResize);
                options.onResize = onResize;
            }
            if (options.legend) {
                var legend = options.legend;
                if (legend.onClick) {
                    var onClick = (typeof legend.onClick === 'string' ?
                        new Function(legend.onClick) :
                        legend.onClick);
                    legend.onClick = onClick;
                }
                if (legend.onHover) {
                    var onHover = (typeof legend.onHover === 'string' ?
                        new Function(legend.onHover) :
                        legend.onHover);
                    legend.onHover = onHover;
                }
                if (legend.onLeave) {
                    var onLeave = (typeof legend.onLeave === 'string' ?
                        new Function(legend.onLeave) :
                        legend.onLeave);
                    legend.onLeave = onLeave;
                }
                if (legend.labels) {
                    var labels = legend.labels;
                    if (labels.generateLabels) {
                        var generateLabels = (typeof labels.generateLabels === 'string' ?
                            new Function(labels.generateLabels) :
                            labels.generateLabels);
                        labels.generateLabels = generateLabels;
                    }
                    if (labels.filter) {
                        var filter = (typeof labels.filter === 'string' ? new Function(labels.filter) : labels.filter);
                        labels.filter = filter;
                    }
                }
            }
            if (options.tooltips) {
                var tooltips = options.tooltips;
                if (tooltips.custom) {
                    var custom = (typeof tooltips.custom === 'string' ?
                        new Function(tooltips.custom) :
                        tooltips.custom);
                    tooltips.custom = custom;
                }
                if (tooltips.callbacks) {
                    var callbacks = tooltips.callbacks;
                    for (var key in callbacks) {
                        var callback = callbacks[key];
                        callbacks[key] =
                            typeof callback === 'string' ? new Function(callback) : callback;
                    }
                }
                if (tooltips.filter) {
                    var filter = (typeof tooltips.filter === 'string' ? new Function(tooltips.filter) :
                        tooltips.filter);
                    tooltips.filter = filter;
                }
                if (tooltips.itemSort) {
                    var itemSort = (typeof tooltips.itemSort === 'string' ? new Function(tooltips.itemSort) :
                        tooltips.itemSort);
                    tooltips.itemSort = itemSort;
                }
            }
            if (options.hover) {
                var hover = options.hover;
                if (hover.onHover) {
                    var onHover = (typeof hover.onHover === 'string' ? new Function(hover.onHover) : hover.onHover);
                    hover.onHover = onHover;
                }
            }
            if (options.animation) {
                var animation = options.animation;
                if (animation.onProgress) {
                    var onProgress = (typeof animation.onProgress === 'string' ?
                        new Function(animation.onProgress) :
                        animation.onProgress);
                    animation.onProgress = onProgress;
                }
                if (animation.onComplete) {
                    var onComplete = (typeof animation.onComplete === 'string' ?
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
            options.scales.yAxes.forEach(function (yAxe) {
                if (yAxe.ticks && yAxe.ticks.callback) {
                    var callback = (typeof yAxe.ticks.callback === 'string' ?
                        new Function(yAxe.ticks.callback) :
                        yAxe.ticks.callback);
                    yAxe.ticks.callback = callback;
                }
            });
            options.scales.xAxes.forEach(function (xAxe) {
                if (xAxe.ticks && xAxe.ticks.callback) {
                    var callback = (typeof xAxe.ticks.callback === 'string' ?
                        new Function(xAxe.ticks.callback) :
                        xAxe.ticks.callback);
                    xAxe.ticks.callback = callback;
                }
            });
            if (this.chartType == 'pie') {
                var newOptions = options;
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
        };
        return AjfChartComponent;
    }());
    AjfChartComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'ajf-chart',
                    template: "",
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    encapsulation: core.ViewEncapsulation.None,
                    styles: ["ajf-chart{display:block;width:inherit;height:inherit;position:relative}\n"]
                },] }
    ];
    AjfChartComponent.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: core.Renderer2 }
    ]; };
    AjfChartComponent.propDecorators = {
        data: [{ type: core.Input }],
        options: [{ type: core.Input }],
        chartType: [{ type: core.Input }],
        instance: [{ type: core.Input }]
    };

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
    var AjfChartModule = /** @class */ (function () {
        function AjfChartModule() {
        }
        return AjfChartModule;
    }());
    AjfChartModule.decorators = [
        { type: core.NgModule, args: [{
                    declarations: [
                        AjfChartComponent,
                    ],
                    exports: [
                        AjfChartComponent,
                    ],
                },] }
    ];

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

    /**
     * Generated bundle index. Do not edit.
     */

    exports.AjfChartComponent = AjfChartComponent;
    exports.AjfChartModule = AjfChartModule;
    exports.registerChartPlugins = registerChartPlugins;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=core-chart.umd.js.map
