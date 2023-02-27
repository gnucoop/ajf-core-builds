import { coerceBooleanProperty } from '@angular/cdk/coercion';
import * as i0 from '@angular/core';
import { EventEmitter, Component, ChangeDetectionStrategy, ViewEncapsulation, Input, Output, NgModule } from '@angular/core';
import * as i1 from '@ajf/core/echarts';
import { AjfEchartsModule } from '@ajf/core/echarts';

let heatMapIdx = 0;
class AjfHeatMap {
    constructor(_cdr) {
        this._cdr = _cdr;
        this._startColor = '#ffeb3b';
        this._endColor = '#f44336';
        this._highlightColor = '#009688';
        this._values = 'properties.value';
        this._action = '';
        this._idProp = 'id';
        this._showVisualMap = false;
        this.featureSelected = new EventEmitter();
        this._name = `ajf_heatmap_${heatMapIdx++}`;
    }
    set features(features) {
        this._features = features;
    }
    set startColor(startColor) {
        this._startColor = startColor;
    }
    set endColor(endColor) {
        this._endColor = endColor;
    }
    set highlightColor(highlightColor) {
        this._highlightColor = highlightColor;
    }
    set values(values) {
        this._values = values;
    }
    /**
     * The codo to execute when an element is selected on heatmap.
     * It is inserted into a function, which receives the selected object as input
     */
    set action(action) {
        this._action = action;
    }
    set idProp(idProp) {
        this._idProp = idProp;
    }
    set showVisualMap(showVisualMap) {
        this._showVisualMap = coerceBooleanProperty(showVisualMap);
    }
    get chartOptions() {
        return this._chartOptions;
    }
    ngOnChanges(_) {
        this._updateChartOptions();
    }
    ngOnDestroy() {
        this.featureSelected.complete();
    }
    onChartInit(event) {
        const { echarts, chart } = event;
        this._echarts = echarts;
        chart.on('selectchanged', params => {
            if (this._features == null) {
                return;
            }
            const { selected } = params;
            if (selected == null || selected.length !== 1) {
                return;
            }
            const { dataIndex, seriesIndex } = selected[0];
            if (seriesIndex !== 0 || dataIndex.length !== 1) {
                return;
            }
            const idx = dataIndex[0];
            if (idx < 0 || idx >= this._features.features.length) {
                return;
            }
            const feature = this._features.features[idx];
            this.featureSelected.emit({ feature });
            if (this._action && this._action.length) {
                try {
                    const actionFunction = new Function('v', this._action);
                    actionFunction({ feature });
                }
                catch (e) { }
            }
        });
        this._updateChartOptions();
    }
    _updateChartOptions() {
        if (this._echarts == null) {
            return;
        }
        if (this._features == null) {
            this._chartOptions = undefined;
        }
        else {
            this._echarts.registerMap(this._name, this._features);
            this._chartOptions = {
                geo: {
                    map: this._name,
                    itemStyle: {
                        opacity: 0,
                    },
                    nameProperty: this._idProp,
                },
                visualMap: {
                    calculable: false,
                    realtime: false,
                    inRange: {
                        color: [this._startColor, this._endColor],
                    },
                    showLabel: false,
                    show: this._showVisualMap,
                },
                series: this._getChartSeries(),
            };
        }
        this._cdr.detectChanges();
    }
    _getChartSeries() {
        const data = this._getFeaturesData();
        if (data.length === 0) {
            return [];
        }
        return [
            {
                type: 'map',
                map: this._name,
                nameProperty: this._idProp,
                emphasis: {
                    itemStyle: {
                        areaColor: this._highlightColor,
                    },
                    label: {
                        show: false,
                    },
                },
                select: {
                    itemStyle: {
                        color: this._highlightColor,
                    },
                    label: {
                        show: false,
                    },
                },
                selectedMode: 'single',
                data,
            },
        ];
    }
    _getFeaturesData() {
        if (this._features == null) {
            return [];
        }
        const { features } = this._features;
        const values = this._values;
        if (typeof values === 'string') {
        }
        else if (values.length === features.length) {
            return features.map((feature, idx) => {
                const idProp = feature.properties[this._idProp];
                return {
                    name: idProp,
                    value: values[idx],
                };
            });
        }
        return [];
    }
}
AjfHeatMap.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfHeatMap, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
AjfHeatMap.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.4", type: AjfHeatMap, selector: "ajf-heat-map", inputs: { features: "features", startColor: "startColor", endColor: "endColor", highlightColor: "highlightColor", values: "values", action: "action", idProp: "idProp", showVisualMap: "showVisualMap" }, outputs: { featureSelected: "featureSelected" }, usesOnChanges: true, ngImport: i0, template: "<div ajfEcharts (chartInit)=\"onChartInit($event)\" [options]=\"chartOptions\"></div>\n", styles: ["ajf-heat-map{display:block;position:relative}ajf-heat-map [ajfEcharts]{width:100%;height:100%}\n"], dependencies: [{ kind: "directive", type: i1.AjfEchartsDirective, selector: "[ajfEcharts]", inputs: ["theme", "renderer", "options"], outputs: ["chartInit"], exportAs: ["ajfEcharts"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfHeatMap, decorators: [{
            type: Component,
            args: [{ selector: 'ajf-heat-map', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<div ajfEcharts (chartInit)=\"onChartInit($event)\" [options]=\"chartOptions\"></div>\n", styles: ["ajf-heat-map{display:block;position:relative}ajf-heat-map [ajfEcharts]{width:100%;height:100%}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }]; }, propDecorators: { features: [{
                type: Input
            }], startColor: [{
                type: Input
            }], endColor: [{
                type: Input
            }], highlightColor: [{
                type: Input
            }], values: [{
                type: Input
            }], action: [{
                type: Input
            }], idProp: [{
                type: Input
            }], showVisualMap: [{
                type: Input
            }], featureSelected: [{
                type: Output
            }] } });

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
class AjfHeatMapModule {
}
AjfHeatMapModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfHeatMapModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AjfHeatMapModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.0.4", ngImport: i0, type: AjfHeatMapModule, declarations: [AjfHeatMap], imports: [AjfEchartsModule], exports: [AjfHeatMap] });
AjfHeatMapModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfHeatMapModule, imports: [AjfEchartsModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfHeatMapModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [AjfHeatMap],
                    exports: [AjfHeatMap],
                    imports: [AjfEchartsModule],
                }]
        }] });

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

export { AjfHeatMap, AjfHeatMapModule };
//# sourceMappingURL=ajf-core-heat-map.mjs.map
