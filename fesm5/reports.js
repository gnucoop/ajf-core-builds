import { Pipe, Directive, ChangeDetectorRef, Input, ViewContainerRef, NgModule, ComponentFactoryResolver, Renderer2, ViewChild } from '@angular/core';
import { __assign, __spread } from 'tslib';
import { AjfFormulaSerializer, alwaysCondition, AjfConditionSerializer, evaluateExpression, createFormula } from '@ajf/core/models';
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
var AjfBaseWidgetComponent = /** @class */ (function () {
    function AjfBaseWidgetComponent(_cdr, el) {
        this._cdr = _cdr;
        this.el = el;
    }
    Object.defineProperty(AjfBaseWidgetComponent.prototype, "instance", {
        get: function () { return this._instance; },
        set: function (instance) {
            if (this._instance !== instance) {
                this._instance = instance;
                this._cdr.detectChanges();
            }
        },
        enumerable: true,
        configurable: true
    });
    return AjfBaseWidgetComponent;
}());

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
var AjfChartType;
(function (AjfChartType) {
    AjfChartType[AjfChartType["Line"] = 0] = "Line";
    AjfChartType[AjfChartType["Bar"] = 1] = "Bar";
    AjfChartType[AjfChartType["HorizontalBar"] = 2] = "HorizontalBar";
    AjfChartType[AjfChartType["Radar"] = 3] = "Radar";
    AjfChartType[AjfChartType["Scatter"] = 4] = "Scatter";
    AjfChartType[AjfChartType["Doughnut"] = 5] = "Doughnut";
    AjfChartType[AjfChartType["Pie"] = 6] = "Pie";
    AjfChartType[AjfChartType["PolarArea"] = 7] = "PolarArea";
    AjfChartType[AjfChartType["Bubble"] = 8] = "Bubble";
    AjfChartType[AjfChartType["LENGTH"] = 9] = "LENGTH";
})(AjfChartType || (AjfChartType = {}));

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
function chartToChartJsType(chartType) {
    switch (chartType) {
        case AjfChartType.Line:
            return 'line';
        case AjfChartType.Bar:
            return 'bar';
        case AjfChartType.HorizontalBar:
            return 'horizontalBar';
        case AjfChartType.Radar:
            return 'radar';
        case AjfChartType.Scatter:
            return 'scatter';
        case AjfChartType.Doughnut:
            return 'doughnut';
        case AjfChartType.Pie:
            return 'pie';
        case AjfChartType.PolarArea:
            return 'polarArea';
        case AjfChartType.Bubble:
            return 'bubble';
        default:
            return 'line';
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
var AjfGetColumnContentPipe = /** @class */ (function () {
    function AjfGetColumnContentPipe() {
    }
    AjfGetColumnContentPipe.prototype.transform = function (instance, column) {
        return column >= 0 && column < instance.content.length ? instance.content[column] : null;
    };
    AjfGetColumnContentPipe.decorators = [
        { type: Pipe, args: [{ name: 'ajfGetColumnContent' },] }
    ];
    return AjfGetColumnContentPipe;
}());

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
var AjfAggregationType;
(function (AjfAggregationType) {
    AjfAggregationType[AjfAggregationType["None"] = 0] = "None";
    AjfAggregationType[AjfAggregationType["Sum"] = 1] = "Sum";
    AjfAggregationType[AjfAggregationType["Average"] = 2] = "Average";
    AjfAggregationType[AjfAggregationType["WeightedAverage"] = 3] = "WeightedAverage";
    AjfAggregationType[AjfAggregationType["LENGTH"] = 4] = "LENGTH";
})(AjfAggregationType || (AjfAggregationType = {}));

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
var AjfWidgetType;
(function (AjfWidgetType) {
    AjfWidgetType[AjfWidgetType["Layout"] = 0] = "Layout";
    AjfWidgetType[AjfWidgetType["PageBreak"] = 1] = "PageBreak";
    AjfWidgetType[AjfWidgetType["Image"] = 2] = "Image";
    AjfWidgetType[AjfWidgetType["Text"] = 3] = "Text";
    AjfWidgetType[AjfWidgetType["Chart"] = 4] = "Chart";
    AjfWidgetType[AjfWidgetType["Table"] = 5] = "Table";
    AjfWidgetType[AjfWidgetType["Map"] = 6] = "Map";
    AjfWidgetType[AjfWidgetType["Column"] = 7] = "Column";
    AjfWidgetType[AjfWidgetType["Formula"] = 8] = "Formula";
    AjfWidgetType[AjfWidgetType["ImageContainer"] = 9] = "ImageContainer";
    AjfWidgetType[AjfWidgetType["DynamicTable"] = 10] = "DynamicTable";
    AjfWidgetType[AjfWidgetType["LENGTH"] = 11] = "LENGTH";
})(AjfWidgetType || (AjfWidgetType = {}));

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
var AjfReportRenderer = /** @class */ (function () {
    function AjfReportRenderer(_cdr) {
        this._cdr = _cdr;
    }
    Object.defineProperty(AjfReportRenderer.prototype, "instance", {
        get: function () { return this._instance; },
        set: function (instance) {
            this._instance = instance;
            this._report = instance != null ? instance.report : null;
            this._cdr.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfReportRenderer.prototype, "report", {
        get: function () {
            return this._report;
        },
        enumerable: true,
        configurable: true
    });
    AjfReportRenderer.decorators = [
        { type: Directive }
    ];
    /** @nocollapse */
    AjfReportRenderer.ctorParameters = function () { return [
        { type: ChangeDetectorRef }
    ]; };
    AjfReportRenderer.propDecorators = {
        instance: [{ type: Input }]
    };
    return AjfReportRenderer;
}());

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
var AjfWidgetHost = /** @class */ (function () {
    function AjfWidgetHost(viewContainerRef) {
        this.viewContainerRef = viewContainerRef;
    }
    AjfWidgetHost.decorators = [
        { type: Directive, args: [{ selector: '[ajf-widget-host]' },] }
    ];
    /** @nocollapse */
    AjfWidgetHost.ctorParameters = function () { return [
        { type: ViewContainerRef }
    ]; };
    return AjfWidgetHost;
}());

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
var AjfReportsModule = /** @class */ (function () {
    function AjfReportsModule() {
    }
    AjfReportsModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        AjfGetColumnContentPipe,
                        AjfWidgetHost,
                    ],
                    exports: [
                        AjfGetColumnContentPipe,
                        AjfWidgetHost,
                    ],
                },] }
    ];
    return AjfReportsModule;
}());

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
function createAggregation(aggregation) {
    return __assign(__assign({}, aggregation), { aggregation: aggregation.aggregation || AjfAggregationType.None });
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
var AjfAggregationSerializer = /** @class */ (function () {
    function AjfAggregationSerializer() {
    }
    AjfAggregationSerializer.fromJson = function (json) {
        if (json.aggregation == null) {
            throw new Error('Malformed aggregation');
        }
        return createAggregation(__assign(__assign({}, json), { aggregation: json.aggregation }));
    };
    return AjfAggregationSerializer;
}());

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
function createDataset(dataset) {
    return __assign(__assign({}, dataset), { aggregation: dataset.aggregation || createAggregation({ aggregation: AjfAggregationType.None }) });
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
var AjfDatasetSerializer = /** @class */ (function () {
    function AjfDatasetSerializer() {
    }
    AjfDatasetSerializer.fromJson = function (json) {
        if (json.formula == null || json.aggregation == null || json.label == null) {
            throw new Error('Malformed dataset');
        }
        json.formula = json.formula instanceof Array ?
            json.formula = json.formula.map(function (f) { return AjfFormulaSerializer.fromJson(f); }) :
            AjfFormulaSerializer.fromJson(json.formula);
        json.aggregation = AjfAggregationSerializer.fromJson(json.aggregation);
        return createDataset(json);
    };
    return AjfDatasetSerializer;
}());

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
function createWidget(widget) {
    return __assign(__assign({}, widget), { styles: widget.styles || {}, visibility: widget.visibility || alwaysCondition() });
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
var AjfWidgetSerializer = /** @class */ (function () {
    function AjfWidgetSerializer() {
    }
    AjfWidgetSerializer.fromJson = function (json) {
        if (json.widgetType == null) {
            throw new Error('Malformed widget');
        }
        json.visibility =
            json.visibility ? AjfConditionSerializer.fromJson(json.visibility) : alwaysCondition();
        json.styles = json.styles || {};
        var obj = json;
        if (obj.widgetType === AjfWidgetType.Layout || obj.widgetType === AjfWidgetType.Column) {
            return AjfWidgetSerializer._widgetWithContentFromJson(obj);
        }
        if (obj.widgetType === AjfWidgetType.Chart || obj.widgetType === AjfWidgetType.Table) {
            var w = AjfWidgetSerializer._dataWidgetFromJson(obj);
            if (obj.widgetType === AjfWidgetType.Chart) {
                var cw = w;
                if (cw.labels instanceof Array) {
                    cw.labels.map(function (l) { return AjfFormulaSerializer.fromJson(l); });
                }
                else if (cw.labels != null) {
                    cw.labels = AjfFormulaSerializer.fromJson(cw.labels);
                }
            }
            return w;
        }
        if (obj.widgetType === AjfWidgetType.Map) {
            var mw = obj;
            mw.coordinate = AjfFormulaSerializer.fromJson(mw.coordinate);
        }
        return obj;
    };
    AjfWidgetSerializer._dataWidgetFromJson = function (json) {
        var dataset = json.dataset ?
            (json.widgetType === AjfWidgetType.Table ?
                json.dataset
                    .map(function (row) { return row.map(function (cell) { return AjfDatasetSerializer.fromJson(cell); }); }) :
                json.dataset.map(function (d) { return AjfDatasetSerializer.fromJson(d); })) :
            [];
        return __assign(__assign({}, createWidget(json)), { dataset: dataset });
    };
    AjfWidgetSerializer._widgetWithContentFromJson = function (json) {
        var content = (json.content || []).map(function (c) { return AjfWidgetSerializer.fromJson(c); });
        return __assign(__assign({}, createWidget(json)), { content: content });
    };
    return AjfWidgetSerializer;
}());

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
var AjfReportContainerSerializer = /** @class */ (function () {
    function AjfReportContainerSerializer() {
    }
    AjfReportContainerSerializer.fromJson = function (json) {
        json.content = (json.content || []).map(function (c) { return AjfWidgetSerializer.fromJson(c); });
        return __assign(__assign({}, json), { content: json.content, styles: json.styles || {} });
    };
    return AjfReportContainerSerializer;
}());

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
function createReport(report) {
    return __assign({}, report);
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
var AjfReportSerializer = /** @class */ (function () {
    function AjfReportSerializer() {
    }
    AjfReportSerializer.fromJson = function (json) {
        var containers = ['header', 'footer', 'content'];
        containers.forEach(function (c) {
            if (json[c]) {
                json[c] =
                    AjfReportContainerSerializer.fromJson(json[c]);
            }
        });
        return createReport(json);
    };
    return AjfReportSerializer;
}());

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
var AjfReportWidget = /** @class */ (function () {
    function AjfReportWidget(_cfr, _renderer) {
        this._cfr = _cfr;
        this._renderer = _renderer;
        this._init = false;
    }
    Object.defineProperty(AjfReportWidget.prototype, "instance", {
        get: function () { return this._instance; },
        set: function (instance) {
            if (this._instance !== instance) {
                this._instance = instance;
                if (this._init) {
                    this._loadComponent();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    AjfReportWidget.prototype.ngOnInit = function () {
        this._init = true;
        this._loadComponent();
    };
    AjfReportWidget.prototype._loadComponent = function () {
        var _this = this;
        if (!this._init || this._instance == null
            || this.widgetHost == null || !this.instance.visible) {
            return;
        }
        var vcr = this.widgetHost.viewContainerRef;
        vcr.clear();
        var componentDef = this.widgetsMap[this._instance.widget.widgetType];
        if (componentDef == null) {
            return;
        }
        var component = componentDef.component;
        try {
            var componentFactory = this._cfr.resolveComponentFactory(component);
            var componentRef = vcr.createComponent(componentFactory);
            var componentInstance_1 = componentRef.instance;
            Object.keys(this._instance.widget.styles).forEach(function (style) {
                try {
                    _this._renderer.setStyle(componentInstance_1.el.nativeElement, style, "" + _this._instance.widget.styles[style]);
                }
                catch (e) { }
            });
            componentInstance_1.instance = this._instance;
            if (componentDef.inputs) {
                Object.keys(componentDef.inputs).forEach(function (key) {
                    if (key in componentInstance_1) {
                        componentInstance_1[key] = componentDef.inputs[key];
                    }
                });
            }
        }
        catch (e) { }
    };
    AjfReportWidget.decorators = [
        { type: Directive }
    ];
    /** @nocollapse */
    AjfReportWidget.ctorParameters = function () { return [
        { type: ComponentFactoryResolver },
        { type: Renderer2 }
    ]; };
    AjfReportWidget.propDecorators = {
        widgetHost: [{ type: ViewChild, args: [AjfWidgetHost, { static: true },] }],
        instance: [{ type: Input }]
    };
    return AjfReportWidget;
}());

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
function evaluateAggregation(aggregation, formulas, context) {
    var data = formulas.map(function (f) { return evaluateExpression(f.formula, context); });
    switch (aggregation.aggregation) {
        case AjfAggregationType.None:
            if (data.length !== 1) {
                throw new Error('Invalid aggregation');
            }
            return data[0];
        case AjfAggregationType.Sum:
            return data.map(function (r) { return r.reduce(function (s, d) { return s + d; }, 0); });
        case AjfAggregationType.Average:
        case AjfAggregationType.WeightedAverage:
            return data.map(function (r) {
                var sum = r.reduce(function (s, d) { return s + d; }, 0);
                return sum / data.length;
            });
        default:
            return [];
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
function createWidgetInstance(widget, context, _ts) {
    return {
        widget: widget,
        widgetType: widget.widgetType,
        visible: evaluateExpression(widget.visibility.condition, context),
        styles: widget.styles || {},
    };
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
function trFormula(f, context, ts) {
    var formula = f.formula;
    if (formula.substr(0, 1) === '"') {
        var ft = formula.slice(1, -1);
        var transFt = ft != null && typeof ft === 'string' && ft.trim().length > 0
            ? ts.instant(ft) : ft;
        if (ft.length > 0) {
            formula = "\"" + transFt + "\"";
        }
    }
    else {
        formula = formula != null && typeof formula === 'string' && formula.trim().length > 0
            ? ts.instant(formula) : formula;
    }
    return evaluateExpression(formula, context);
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
function widgetToWidgetInstance(widget, context, ts) {
    var wi = createWidgetInstance(widget, context, ts);
    if (widget.widgetType === AjfWidgetType.Column || widget.widgetType === AjfWidgetType.Layout) {
        var wwc_1 = widget;
        var wwci_1 = wi;
        var content_1 = [];
        wwc_1.content.forEach(function (c) {
            if (wwc_1.repetitions != null) {
                wwci_1.repetitions = evaluateExpression(wwc_1.repetitions.formula, context);
                if (typeof wwci_1.repetitions === 'number' && wwci_1.repetitions > 0) {
                    for (var i = 0; i < wwci_1.repetitions; i++) {
                        content_1.push(widgetToWidgetInstance(c, __assign(__assign({}, context), { '$repetition': i }), ts));
                    }
                }
            }
            else {
                content_1.push(widgetToWidgetInstance(c, context, ts));
            }
            wwci_1.content = content_1;
        });
    }
    else if (widget.widgetType === AjfWidgetType.Chart) {
        var cw = widget;
        var cwi = wi;
        var labels = cw.labels instanceof Array ? cw.labels : [cw.labels];
        var evLabels = labels.map(function (l) {
            var evf = evaluateExpression(l.formula, context);
            try {
                if (evf instanceof Array) {
                    evf = evf.map(function (v) { return v != null && typeof v === 'string' && v.trim().length > 0
                        ? ts.instant(v) : v; });
                }
                else {
                    evf = evf != null && typeof evf === 'string' && evf.trim().length > 0
                        ? ts.instant(evf) : evf;
                }
            }
            catch (_e) {
            }
            return evf;
        });
        cwi.labels = cw.labels instanceof Array ? evLabels : evLabels[0];
        cwi.datasets = cw.dataset.map(function (d) {
            var ds = __assign(__assign({}, d.options || {}), { data: evaluateAggregation(d.aggregation, d.formula, context) });
            if (d.chartType != null) {
                var ct = chartToChartJsType(d.chartType);
                ds = __assign(__assign({}, ds), { chartType: ct, type: ct });
            }
            if (d.options != null) {
                ds = __assign(__assign({}, ds), { options: d.options });
            }
            if (d.label != null) {
                ds = __assign(__assign({}, ds), { label: d.label });
            }
            if (d.datalabels != null) {
                ds.datalabels = deepCopy(d.datalabels);
            }
            return ds;
        });
        cwi.data = { labels: cwi.labels, datasets: cwi.datasets };
        cwi.chartType = chartToChartJsType(cw.type || cw.chartType);
        if (cw.options != null && cw.options.plugins != null) {
            var plugins_1 = cw.options.plugins;
            var pluginNames = Object.keys(plugins_1);
            pluginNames.forEach(function (pluginName) {
                var plugin = plugins_1[pluginName];
                var pluginOptions = Object.keys(plugin);
                pluginOptions.forEach(function (pluginOptionName) {
                    var pluginOption = plugin[pluginOptionName];
                    if (typeof pluginOption !== 'string' &&
                        pluginOption != null &&
                        pluginOption.formula != null) {
                        plugin[pluginOptionName] = evaluateExpression(pluginOption.formula, context);
                    }
                });
            });
        }
    }
    else if (widget.widgetType === AjfWidgetType.Table) {
        var tw_1 = widget;
        var twi = wi;
        twi.dataset = tw_1.dataset.map(function (row) { return row.map(function (cell) {
            return cell.formula instanceof Array ?
                cell.formula.map(function (f) { return trFormula(f, context, ts); }) :
                trFormula(cell.formula, context, ts);
        }); });
        twi.data = (tw_1.dataset || [])
            .map(function (row) { return row.map(function (cell) { return ({
            value: evaluateExpression(cell.formula.formula, context),
            style: __assign(__assign({}, tw_1.cellStyles), cell.style),
            rowspan: cell.rowspan,
            colspan: cell.colspan,
        }); }); });
    }
    else if (widget.widgetType === AjfWidgetType.DynamicTable) {
        var tdw_1 = widget;
        var tdwi = wi;
        tdwi.dataset = tdw_1.dataset.map(function (cell) {
            return cell.formula instanceof Array ?
                cell.formula.map(function (f) { return trFormula(f, context, ts); }) :
                trFormula(cell.formula, context, ts);
        });
        var dataset = evaluateExpression(tdw_1.rowDefinition.formula, context) || [];
        var header = (tdw_1.dataset || []).map(function (cell) { return ({
            value: evaluateExpression(cell.formula.formula, context),
            style: __assign(__assign({}, tdw_1.cellStyles), cell.style),
            rowspan: cell.rowspan,
            colspan: cell.colspan,
        }); });
        tdwi.data = __spread([__spread(header)], dataset);
    }
    else if (widget.widgetType === AjfWidgetType.Image) {
        var iw = widget;
        var iwi = wi;
        if (iw.flag) {
            iwi.flag = evaluateExpression(iw.flag.formula, context);
        }
        if (iw.icon) {
            iwi.icon = evaluateExpression(iw.icon.formula, context);
        }
        if (iw.url) {
            iwi.url = evaluateExpression(iw.url.formula, context);
        }
    }
    else if (widget.widgetType === AjfWidgetType.ImageContainer) {
        var icw = widget;
        var icwi = wi;
        if (icw.flags) {
            icwi.flags = icw.flags instanceof Array
                ? icw.flags.map(function (f) { return evaluateExpression(f.formula, context); })
                : evaluateExpression(icw.flags.formula, context);
        }
        if (icw.icons) {
            icwi.icons = icw.icons instanceof Array
                ? icw.icons.map(function (f) { return evaluateExpression(f.formula, context); })
                : evaluateExpression(icw.icons.formula, context);
        }
        if (icw.urls) {
            icwi.urls = icw.urls instanceof Array
                ? icw.urls.map(function (f) { return evaluateExpression(f.formula, context); })
                : evaluateExpression(icw.urls.formula, context);
        }
    }
    else if (widget.widgetType === AjfWidgetType.Text) {
        var tew = widget;
        var tewi = wi;
        var formulaRegEx = /\[{2}(.+?)\]{2}/g;
        var matches = [];
        var match = void 0;
        var htmlText_1 = tew.htmlText;
        while (match = formulaRegEx.exec(htmlText_1)) {
            var idx = match.index;
            var len = match[0].length;
            var formula = createFormula({ formula: match[1] });
            matches.push({ idx: idx, len: len, formula: formula });
        }
        matches.reverse().forEach(function (m) {
            var calcValue;
            try {
                calcValue = evaluateExpression(m.formula.formula, context);
            }
            catch (e) {
                calcValue = '';
            }
            htmlText_1 = "" + htmlText_1.substr(0, m.idx) + calcValue + htmlText_1.substr(m.idx + m.len);
        });
        tewi.htmlText = htmlText_1 != null && htmlText_1.length > 0 ? ts.instant(htmlText_1) : htmlText_1;
    }
    else if (widget.widgetType === AjfWidgetType.Formula) {
        var fw = widget;
        var fwi = wi;
        fwi.formula = evaluateExpression(fw.formula.formula, context);
    }
    else if (widget.widgetType === AjfWidgetType.Map) {
        var mw = widget;
        var mwi = wi;
        mwi.coordinate = evaluateExpression(mw.coordinate.formula, context);
    }
    return wi;
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
function createReportContainerInstance(container, context, ts) {
    var content = container.content.map(function (c) { return widgetToWidgetInstance(c, context, ts); });
    return {
        container: container,
        content: content,
        styles: container.styles,
    };
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
function createReportInstance(report, context, ts) {
    (report.variables || []).forEach(function (variable) {
        context[variable.name] = evaluateExpression(variable.formula.formula, context);
    });
    return {
        report: report,
        header: report.header ? createReportContainerInstance(report.header, context, ts) : undefined,
        content: report.content ? createReportContainerInstance(report.content, context, ts) :
            undefined,
        footer: report.footer ? createReportContainerInstance(report.footer, context, ts) : undefined,
        styles: report.styles || {},
    };
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

/**
 * Generated bundle index. Do not edit.
 */

export { AjfAggregationSerializer, AjfAggregationType, AjfBaseWidgetComponent, AjfChartType, AjfDatasetSerializer, AjfGetColumnContentPipe, AjfReportContainerSerializer, AjfReportRenderer, AjfReportSerializer, AjfReportWidget, AjfReportsModule, AjfWidgetHost, AjfWidgetSerializer, AjfWidgetType, chartToChartJsType, createAggregation, createReportInstance, createWidget, createWidgetInstance, widgetToWidgetInstance };
//# sourceMappingURL=reports.js.map
