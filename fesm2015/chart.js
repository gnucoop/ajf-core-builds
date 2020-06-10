import * as Chart from 'chart.js';
import Chart__default from 'chart.js';
import { Component, ChangeDetectionStrategy, ViewEncapsulation, ElementRef, Renderer2, Input, NgModule } from '@angular/core';
import 'chart.piecelabel.js';
import { deepCopy } from '@ajf/core/utils';

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
const chartClass = Chart__default || Chart;
function registerChartPlugins(plugins) {
    if (plugins != null && plugins.length > 0) {
        plugins.forEach(plugin => chartClass.plugins.register(plugin));
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
const chartClass$1 = Chart__default || Chart;
let AjfChartComponent = /** @class */ (() => {
    class AjfChartComponent {
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
                this._chart = new chartClass$1(ctx, {
                    type: this.chartType,
                    data: this._fixData(this.chartType, this.data),
                    options: this._fixChartOptions(this.options)
                });
            }
        }
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
                let newOptions = options;
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
    return AjfChartComponent;
})();

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
let AjfChartModule = /** @class */ (() => {
    class AjfChartModule {
    }
    AjfChartModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        AjfChartComponent,
                    ],
                    exports: [
                        AjfChartComponent,
                    ],
                },] }
    ];
    return AjfChartModule;
})();

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

export { AjfChartComponent, AjfChartModule, registerChartPlugins };
//# sourceMappingURL=chart.js.map
