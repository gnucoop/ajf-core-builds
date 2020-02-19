import { Pipe, Directive, ChangeDetectorRef, Input, ViewContainerRef, NgModule, ComponentFactoryResolver, Renderer2, ViewChild } from '@angular/core';
import { AjfFormulaSerializer, alwaysCondition, AjfConditionSerializer, evaluateExpression, createFormula } from '@ajf/core/models';
import { deepCopy } from '@ajf/core/utils';

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/reports/base-widget.ts
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
/**
 * @abstract
 * @template T
 */
class AjfBaseWidgetComponent {
    /**
     * @param {?} _cdr
     * @param {?} el
     */
    constructor(_cdr, el) {
        this._cdr = _cdr;
        this.el = el;
    }
    /**
     * @return {?}
     */
    get instance() { return this._instance; }
    /**
     * @param {?} instance
     * @return {?}
     */
    set instance(instance) {
        if (this._instance !== instance) {
            this._instance = instance;
            this._cdr.detectChanges();
        }
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    AjfBaseWidgetComponent.prototype._instance;
    /**
     * @type {?}
     * @private
     */
    AjfBaseWidgetComponent.prototype._cdr;
    /** @type {?} */
    AjfBaseWidgetComponent.prototype.el;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/reports/interface/charts/chart-type.ts
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
/** @enum {number} */
const AjfChartType = {
    Line: 0,
    Bar: 1,
    HorizontalBar: 2,
    Radar: 3,
    Scatter: 4,
    Doughnut: 5,
    Pie: 6,
    PolarArea: 7,
    Bubble: 8,
    LENGTH: 9,
};
AjfChartType[AjfChartType.Line] = 'Line';
AjfChartType[AjfChartType.Bar] = 'Bar';
AjfChartType[AjfChartType.HorizontalBar] = 'HorizontalBar';
AjfChartType[AjfChartType.Radar] = 'Radar';
AjfChartType[AjfChartType.Scatter] = 'Scatter';
AjfChartType[AjfChartType.Doughnut] = 'Doughnut';
AjfChartType[AjfChartType.Pie] = 'Pie';
AjfChartType[AjfChartType.PolarArea] = 'PolarArea';
AjfChartType[AjfChartType.Bubble] = 'Bubble';
AjfChartType[AjfChartType.LENGTH] = 'LENGTH';

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/reports/chart-utils.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?=} chartType
 * @return {?}
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
 * @fileoverview added by tsickle
 * Generated from: src/core/reports/get-column-content.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfGetColumnContentPipe {
    /**
     * @param {?} instance
     * @param {?} column
     * @return {?}
     */
    transform(instance, column) {
        return column >= 0 && column < instance.content.length ? instance.content[column] : null;
    }
}
AjfGetColumnContentPipe.decorators = [
    { type: Pipe, args: [{ name: 'ajfGetColumnContent' },] }
];

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/reports/interface/aggregation/aggregation.ts
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
/**
 * @record
 */
function AjfAggregation() { }
if (false) {
    /** @type {?} */
    AjfAggregation.prototype.aggregation;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/reports/interface/aggregation/aggregation-type.ts
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
/** @enum {number} */
const AjfAggregationType = {
    None: 0,
    Sum: 1,
    Average: 2,
    WeightedAverage: 3,
    LENGTH: 4,
};
AjfAggregationType[AjfAggregationType.None] = 'None';
AjfAggregationType[AjfAggregationType.Sum] = 'Sum';
AjfAggregationType[AjfAggregationType.Average] = 'Average';
AjfAggregationType[AjfAggregationType.WeightedAverage] = 'WeightedAverage';
AjfAggregationType[AjfAggregationType.LENGTH] = 'LENGTH';

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/reports/interface/dataset/chart-dataset.ts
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
/**
 * @record
 */
function AjfChartDataset() { }
if (false) {
    /** @type {?} */
    AjfChartDataset.prototype.formula;
    /** @type {?|undefined} */
    AjfChartDataset.prototype.chartType;
    /** @type {?|undefined} */
    AjfChartDataset.prototype.options;
    /** @type {?|undefined} */
    AjfChartDataset.prototype.datalabels;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/reports/interface/dataset/chart-dataset-options.ts
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
/**
 * @record
 */
function AjfChartDatasetOptions() { }
if (false) {
    /** @type {?|undefined} */
    AjfChartDatasetOptions.prototype.backgroundColor;
    /** @type {?|undefined} */
    AjfChartDatasetOptions.prototype.borderWidth;
    /** @type {?|undefined} */
    AjfChartDatasetOptions.prototype.borderColor;
    /** @type {?|undefined} */
    AjfChartDatasetOptions.prototype.borderCapStyle;
    /** @type {?|undefined} */
    AjfChartDatasetOptions.prototype.borderDash;
    /** @type {?|undefined} */
    AjfChartDatasetOptions.prototype.borderDashOffset;
    /** @type {?|undefined} */
    AjfChartDatasetOptions.prototype.borderJoinStyle;
    /** @type {?|undefined} */
    AjfChartDatasetOptions.prototype.fill;
    /** @type {?|undefined} */
    AjfChartDatasetOptions.prototype.label;
    /** @type {?|undefined} */
    AjfChartDatasetOptions.prototype.lineTension;
    /** @type {?|undefined} */
    AjfChartDatasetOptions.prototype.pointBorderColor;
    /** @type {?|undefined} */
    AjfChartDatasetOptions.prototype.pointBackgroundColor;
    /** @type {?|undefined} */
    AjfChartDatasetOptions.prototype.pointBorderWidth;
    /** @type {?|undefined} */
    AjfChartDatasetOptions.prototype.pointRadius;
    /** @type {?|undefined} */
    AjfChartDatasetOptions.prototype.pointHoverRadius;
    /** @type {?|undefined} */
    AjfChartDatasetOptions.prototype.pointHitRadius;
    /** @type {?|undefined} */
    AjfChartDatasetOptions.prototype.pointHoverBackgroundColor;
    /** @type {?|undefined} */
    AjfChartDatasetOptions.prototype.pointHoverBorderColor;
    /** @type {?|undefined} */
    AjfChartDatasetOptions.prototype.pointHoverBorderWidth;
    /** @type {?|undefined} */
    AjfChartDatasetOptions.prototype.pointStyle;
    /** @type {?|undefined} */
    AjfChartDatasetOptions.prototype.xAxisID;
    /** @type {?|undefined} */
    AjfChartDatasetOptions.prototype.yAxisID;
    /** @type {?|undefined} */
    AjfChartDatasetOptions.prototype.type;
    /** @type {?|undefined} */
    AjfChartDatasetOptions.prototype.hidden;
    /** @type {?|undefined} */
    AjfChartDatasetOptions.prototype.hideInLegendAndTooltip;
    /** @type {?|undefined} */
    AjfChartDatasetOptions.prototype.stack;
    /** @type {?|undefined} */
    AjfChartDatasetOptions.prototype.datalabels;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/reports/interface/dataset/dataset.ts
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
/**
 * @record
 */
function AjfDataset() { }
if (false) {
    /** @type {?|undefined} */
    AjfDataset.prototype.formula;
    /** @type {?} */
    AjfDataset.prototype.aggregation;
    /** @type {?|undefined} */
    AjfDataset.prototype.label;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/reports/interface/dataset/table-dataset.ts
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
/**
 * @record
 */
function AjfTableDataset() { }
if (false) {
    /** @type {?} */
    AjfTableDataset.prototype.formula;
    /** @type {?} */
    AjfTableDataset.prototype.colspan;
    /** @type {?} */
    AjfTableDataset.prototype.rowspan;
    /** @type {?} */
    AjfTableDataset.prototype.style;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/reports/interface/reports/report.ts
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
/**
 * @record
 */
function AjfReport() { }
if (false) {
    /** @type {?|undefined} */
    AjfReport.prototype.header;
    /** @type {?|undefined} */
    AjfReport.prototype.content;
    /** @type {?|undefined} */
    AjfReport.prototype.footer;
    /** @type {?|undefined} */
    AjfReport.prototype.styles;
    /** @type {?|undefined} */
    AjfReport.prototype.forms;
    /** @type {?|undefined} */
    AjfReport.prototype.variables;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/reports/interface/reports/report-container.ts
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
/**
 * @record
 */
function AjfReportContainer() { }
if (false) {
    /** @type {?} */
    AjfReportContainer.prototype.content;
    /** @type {?} */
    AjfReportContainer.prototype.styles;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/reports/interface/reports/report-variable.ts
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
/**
 * @record
 */
function AjfReportVariable() { }
if (false) {
    /** @type {?} */
    AjfReportVariable.prototype.name;
    /** @type {?} */
    AjfReportVariable.prototype.formula;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/reports/interface/reports-instances/report-container-instance.ts
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
/**
 * @record
 */
function AjfReportContainerInstance() { }
if (false) {
    /** @type {?} */
    AjfReportContainerInstance.prototype.container;
    /** @type {?} */
    AjfReportContainerInstance.prototype.content;
    /** @type {?} */
    AjfReportContainerInstance.prototype.styles;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/reports/interface/reports-instances/report-instance.ts
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
/**
 * @record
 */
function AjfReportInstance() { }
if (false) {
    /** @type {?} */
    AjfReportInstance.prototype.report;
    /** @type {?|undefined} */
    AjfReportInstance.prototype.header;
    /** @type {?|undefined} */
    AjfReportInstance.prototype.content;
    /** @type {?|undefined} */
    AjfReportInstance.prototype.footer;
    /** @type {?} */
    AjfReportInstance.prototype.styles;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/reports/interface/styles.ts
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
/**
 * @record
 */
function AjfStyles() { }

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/reports/interface/widgets/chart-widget.ts
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
/**
 * @record
 */
function AjfChartWidget() { }
if (false) {
    /** @type {?} */
    AjfChartWidget.prototype.chartType;
    /** @type {?|undefined} */
    AjfChartWidget.prototype.type;
    /** @type {?} */
    AjfChartWidget.prototype.labels;
    /** @type {?} */
    AjfChartWidget.prototype.dataset;
    /** @type {?} */
    AjfChartWidget.prototype.options;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/reports/interface/widgets/column-widget.ts
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

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/reports/interface/widgets/custom-widget.ts
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
/**
 * @record
 */
function AjfCustomWidget() { }
if (false) {
    /** @type {?} */
    AjfCustomWidget.prototype.json;
    /** @type {?} */
    AjfCustomWidget.prototype.type;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/reports/interface/widgets/data-widget.ts
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
/**
 * @record
 */
function AjfDataWidget() { }
if (false) {
    /** @type {?} */
    AjfDataWidget.prototype.dataset;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/reports/interface/widgets/formula-widget.ts
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
/**
 * @record
 */
function AjfFormulaWidget() { }
if (false) {
    /** @type {?} */
    AjfFormulaWidget.prototype.formula;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/reports/interface/widgets/image-container-widget.ts
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
/**
 * @record
 */
function AjfImageContainerWidget() { }
if (false) {
    /** @type {?} */
    AjfImageContainerWidget.prototype.imageType;
    /** @type {?|undefined} */
    AjfImageContainerWidget.prototype.icons;
    /** @type {?|undefined} */
    AjfImageContainerWidget.prototype.flags;
    /** @type {?|undefined} */
    AjfImageContainerWidget.prototype.urls;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/reports/interface/widgets/image-widget.ts
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
/**
 * @record
 */
function AjfImageWidget() { }
if (false) {
    /** @type {?} */
    AjfImageWidget.prototype.imageType;
    /** @type {?|undefined} */
    AjfImageWidget.prototype.icon;
    /** @type {?|undefined} */
    AjfImageWidget.prototype.flag;
    /** @type {?|undefined} */
    AjfImageWidget.prototype.url;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/reports/interface/widgets/layout-widget.ts
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
/**
 * @record
 */
function AjfLayoutWidget() { }
if (false) {
    /** @type {?} */
    AjfLayoutWidget.prototype.columns;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/reports/interface/widgets/map-widget.ts
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
/**
 * @record
 */
function AjfMapWidget() { }
if (false) {
    /** @type {?} */
    AjfMapWidget.prototype.coordinate;
    /** @type {?} */
    AjfMapWidget.prototype.tileLayer;
    /** @type {?} */
    AjfMapWidget.prototype.attribution;
    /** @type {?} */
    AjfMapWidget.prototype.disabled;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/reports/interface/widgets/page-break-widget.ts
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

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/reports/interface/widgets/table-widget.ts
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
/**
 * @record
 */
function AjfTableWidget() { }
if (false) {
    /** @type {?} */
    AjfTableWidget.prototype.cellStyles;
    /** @type {?} */
    AjfTableWidget.prototype.dataset;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/reports/interface/widgets/text-widget.ts
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
/**
 * @record
 */
function AjfTextWidget() { }
if (false) {
    /** @type {?} */
    AjfTextWidget.prototype.htmlText;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/reports/interface/widgets/widget.ts
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
/**
 * @record
 */
function AjfWidget() { }
if (false) {
    /** @type {?} */
    AjfWidget.prototype.widgetType;
    /** @type {?} */
    AjfWidget.prototype.styles;
    /** @type {?} */
    AjfWidget.prototype.visibility;
    /** @type {?|undefined} */
    AjfWidget.prototype.repetitions;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/reports/interface/widgets/widget-type.ts
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
/** @enum {number} */
const AjfWidgetType = {
    Layout: 0,
    PageBreak: 1,
    Image: 2,
    Text: 3,
    Chart: 4,
    Table: 5,
    Map: 6,
    Column: 7,
    Formula: 8,
    ImageContainer: 9,
    LENGTH: 10,
};
AjfWidgetType[AjfWidgetType.Layout] = 'Layout';
AjfWidgetType[AjfWidgetType.PageBreak] = 'PageBreak';
AjfWidgetType[AjfWidgetType.Image] = 'Image';
AjfWidgetType[AjfWidgetType.Text] = 'Text';
AjfWidgetType[AjfWidgetType.Chart] = 'Chart';
AjfWidgetType[AjfWidgetType.Table] = 'Table';
AjfWidgetType[AjfWidgetType.Map] = 'Map';
AjfWidgetType[AjfWidgetType.Column] = 'Column';
AjfWidgetType[AjfWidgetType.Formula] = 'Formula';
AjfWidgetType[AjfWidgetType.ImageContainer] = 'ImageContainer';
AjfWidgetType[AjfWidgetType.LENGTH] = 'LENGTH';

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/reports/interface/widgets/widget-with-content.ts
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
/**
 * @record
 */
function AjfWidgetWithContent() { }
if (false) {
    /** @type {?} */
    AjfWidgetWithContent.prototype.content;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/reports/interface/widgets-instances/chart-widget-instance.ts
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
/**
 * @record
 */
function AjfChartWidgetInstance() { }
if (false) {
    /** @type {?} */
    AjfChartWidgetInstance.prototype.widget;
    /** @type {?} */
    AjfChartWidgetInstance.prototype.datasets;
    /** @type {?} */
    AjfChartWidgetInstance.prototype.chartType;
    /** @type {?} */
    AjfChartWidgetInstance.prototype.data;
    /** @type {?} */
    AjfChartWidgetInstance.prototype.labels;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/reports/interface/widgets-instances/column-widget-instance.ts
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
/**
 * @record
 */
function AjfColumnWidgetInstance() { }
if (false) {
    /** @type {?} */
    AjfColumnWidgetInstance.prototype.widget;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/reports/interface/widgets-instances/data-widget-instance.ts
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
/**
 * @record
 */
function AjfDataWidgetInstance() { }
if (false) {
    /** @type {?} */
    AjfDataWidgetInstance.prototype.widget;
    /** @type {?} */
    AjfDataWidgetInstance.prototype.dataset;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/reports/interface/widgets-instances/formula-widget-instance.ts
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
/**
 * @record
 */
function AjfFormulaWidgetInstance() { }
if (false) {
    /** @type {?} */
    AjfFormulaWidgetInstance.prototype.widget;
    /** @type {?} */
    AjfFormulaWidgetInstance.prototype.formula;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/reports/interface/widgets-instances/image-container-widget-instance.ts
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
/**
 * @record
 */
function AjfImageContainerWidgetInstance() { }
if (false) {
    /** @type {?} */
    AjfImageContainerWidgetInstance.prototype.widget;
    /** @type {?} */
    AjfImageContainerWidgetInstance.prototype.icons;
    /** @type {?} */
    AjfImageContainerWidgetInstance.prototype.flags;
    /** @type {?} */
    AjfImageContainerWidgetInstance.prototype.urls;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/reports/interface/widgets-instances/image-widget-instance.ts
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
/**
 * @record
 */
function AjfImageWidgetInstance() { }
if (false) {
    /** @type {?} */
    AjfImageWidgetInstance.prototype.widget;
    /** @type {?} */
    AjfImageWidgetInstance.prototype.icon;
    /** @type {?} */
    AjfImageWidgetInstance.prototype.flag;
    /** @type {?} */
    AjfImageWidgetInstance.prototype.url;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/reports/interface/widgets-instances/layout-widget-instance.ts
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
/**
 * @record
 */
function AjfLayoutWidgetInstance() { }
if (false) {
    /** @type {?} */
    AjfLayoutWidgetInstance.prototype.widget;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/reports/interface/widgets-instances/map-widget-instance.ts
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
/**
 * @record
 */
function AjfMapWidgetInstance() { }
if (false) {
    /** @type {?} */
    AjfMapWidgetInstance.prototype.widget;
    /** @type {?} */
    AjfMapWidgetInstance.prototype.coordinate;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/reports/interface/widgets-instances/page-break-widget-instance.ts
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
/**
 * @record
 */
function AjfPageBreakWidgetInstance() { }
if (false) {
    /** @type {?} */
    AjfPageBreakWidgetInstance.prototype.widget;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/reports/interface/widgets-instances/table-widget-instance.ts
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
/**
 * @record
 */
function AjfTableWidgetInstance() { }
if (false) {
    /** @type {?} */
    AjfTableWidgetInstance.prototype.widget;
    /** @type {?} */
    AjfTableWidgetInstance.prototype.data;
    /** @type {?} */
    AjfTableWidgetInstance.prototype.recalcEvt;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/reports/interface/widgets-instances/text-widget-instance.ts
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
/**
 * @record
 */
function AjfTextWidgetInstance() { }
if (false) {
    /** @type {?} */
    AjfTextWidgetInstance.prototype.widget;
    /** @type {?} */
    AjfTextWidgetInstance.prototype.htmlText;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/reports/interface/widgets-instances/widget-instance.ts
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
/**
 * @record
 */
function AjfWidgetInstance() { }
if (false) {
    /** @type {?} */
    AjfWidgetInstance.prototype.widget;
    /** @type {?} */
    AjfWidgetInstance.prototype.visible;
    /** @type {?} */
    AjfWidgetInstance.prototype.styles;
    /** @type {?} */
    AjfWidgetInstance.prototype.widgetType;
    /** @type {?|undefined} */
    AjfWidgetInstance.prototype.repetitions;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/reports/interface/widgets-instances/widget-with-content-instance.ts
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
/**
 * @record
 */
function AjfWidgetWithContentInstance() { }
if (false) {
    /** @type {?} */
    AjfWidgetWithContentInstance.prototype.content;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/reports/report.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
class AjfReportRenderer {
    /**
     * @param {?} _cdr
     */
    constructor(_cdr) {
        this._cdr = _cdr;
    }
    /**
     * @return {?}
     */
    get instance() { return this._instance; }
    /**
     * @param {?} instance
     * @return {?}
     */
    set instance(instance) {
        this._instance = instance;
        this._report = instance != null ? instance.report : null;
        this._cdr.markForCheck();
    }
    /**
     * @return {?}
     */
    get report() {
        return this._report;
    }
}
AjfReportRenderer.decorators = [
    { type: Directive }
];
/** @nocollapse */
AjfReportRenderer.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
AjfReportRenderer.propDecorators = {
    instance: [{ type: Input }]
};
if (false) {
    /**
     * @type {?}
     * @private
     */
    AjfReportRenderer.prototype._instance;
    /**
     * @type {?}
     * @private
     */
    AjfReportRenderer.prototype._report;
    /**
     * @type {?}
     * @private
     */
    AjfReportRenderer.prototype._cdr;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/reports/widget-host.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfWidgetHost {
    /**
     * @param {?} viewContainerRef
     */
    constructor(viewContainerRef) {
        this.viewContainerRef = viewContainerRef;
    }
}
AjfWidgetHost.decorators = [
    { type: Directive, args: [{ selector: '[ajf-widget-host]' },] }
];
/** @nocollapse */
AjfWidgetHost.ctorParameters = () => [
    { type: ViewContainerRef }
];
if (false) {
    /** @type {?} */
    AjfWidgetHost.prototype.viewContainerRef;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/reports/reports-module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfReportsModule {
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

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/reports/utils/aggregation/create-aggregation.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} aggregation
 * @return {?}
 */
function createAggregation(aggregation) {
    return Object.assign(Object.assign({}, aggregation), { aggregation: aggregation.aggregation || AjfAggregationType.None });
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/reports/serializers/aggregation-serializer.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfAggregationSerializer {
    /**
     * @param {?} json
     * @return {?}
     */
    static fromJson(json) {
        if (json.aggregation == null) {
            throw new Error('Malformed aggregation');
        }
        return createAggregation(Object.assign(Object.assign({}, json), { aggregation: json.aggregation }));
    }
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/reports/utils/dataset/create-dataset.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} dataset
 * @return {?}
 */
function createDataset(dataset) {
    return Object.assign(Object.assign({}, dataset), { aggregation: dataset.aggregation || createAggregation({ aggregation: AjfAggregationType.None }) });
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/reports/serializers/dataset-serializer.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfDatasetSerializer {
    /**
     * @param {?} json
     * @return {?}
     */
    static fromJson(json) {
        if (json.formula == null || json.aggregation == null || json.label == null) {
            throw new Error('Malformed dataset');
        }
        json.formula = json.formula instanceof Array ?
            json.formula = json.formula.map((/**
             * @param {?} f
             * @return {?}
             */
            f => AjfFormulaSerializer.fromJson(f))) :
            AjfFormulaSerializer.fromJson(json.formula);
        json.aggregation = AjfAggregationSerializer.fromJson(json.aggregation);
        return createDataset(json);
    }
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/reports/utils/widgets/create-widget.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} widget
 * @return {?}
 */
function createWidget(widget) {
    return Object.assign(Object.assign({}, widget), { styles: widget.styles || {}, visibility: widget.visibility || alwaysCondition() });
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/reports/serializers/widget-serializer.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfWidgetSerializer {
    /**
     * @param {?} json
     * @return {?}
     */
    static fromJson(json) {
        if (json.widgetType == null) {
            throw new Error('Malformed widget');
        }
        json.visibility =
            json.visibility ? AjfConditionSerializer.fromJson(json.visibility) : alwaysCondition();
        json.styles = json.styles || {};
        /** @type {?} */
        const obj = (/** @type {?} */ (json));
        if (obj.widgetType === AjfWidgetType.Layout || obj.widgetType === AjfWidgetType.Column) {
            return AjfWidgetSerializer._widgetWithContentFromJson(obj);
        }
        if (obj.widgetType === AjfWidgetType.Chart || obj.widgetType === AjfWidgetType.Table) {
            /** @type {?} */
            const w = AjfWidgetSerializer._dataWidgetFromJson(obj);
            if (obj.widgetType === AjfWidgetType.Chart) {
                /** @type {?} */
                const cw = (/** @type {?} */ (w));
                if (cw.labels instanceof Array) {
                    cw.labels.map((/**
                     * @param {?} l
                     * @return {?}
                     */
                    l => AjfFormulaSerializer.fromJson(l)));
                }
                else if (cw.labels != null) {
                    cw.labels = AjfFormulaSerializer.fromJson(cw.labels);
                }
            }
            return w;
        }
        if (obj.widgetType === AjfWidgetType.Map) {
            /** @type {?} */
            const mw = (/** @type {?} */ (obj));
            mw.coordinate = AjfFormulaSerializer.fromJson(mw.coordinate);
        }
        return obj;
    }
    /**
     * @private
     * @param {?} json
     * @return {?}
     */
    static _dataWidgetFromJson(json) {
        /** @type {?} */
        const dataset = json.dataset ?
            (json.widgetType === AjfWidgetType.Table ?
                ((/** @type {?} */ (json.dataset)))
                    .map((/**
                 * @param {?} row
                 * @return {?}
                 */
                row => row.map((/**
                 * @param {?} cell
                 * @return {?}
                 */
                cell => AjfDatasetSerializer.fromJson(cell))))) :
                ((/** @type {?} */ (json.dataset))).map((/**
                 * @param {?} d
                 * @return {?}
                 */
                d => AjfDatasetSerializer.fromJson(d)))) :
            [];
        return Object.assign(Object.assign({}, createWidget(json)), { dataset });
    }
    /**
     * @private
     * @param {?} json
     * @return {?}
     */
    static _widgetWithContentFromJson(json) {
        /** @type {?} */
        const content = (json.content || []).map((/**
         * @param {?} c
         * @return {?}
         */
        c => AjfWidgetSerializer.fromJson(c)));
        return Object.assign(Object.assign({}, createWidget(json)), { content });
    }
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/reports/serializers/report-container-serializer.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfReportContainerSerializer {
    /**
     * @param {?} json
     * @return {?}
     */
    static fromJson(json) {
        json.content = (json.content || []).map((/**
         * @param {?} c
         * @return {?}
         */
        c => AjfWidgetSerializer.fromJson(c)));
        return Object.assign(Object.assign({}, json), { content: (/** @type {?} */ (json.content)), styles: json.styles || {} });
    }
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/reports/utils/reports/create-report.ts
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
/**
 * @param {?} report
 * @return {?}
 */
function createReport(report) {
    return Object.assign({}, report);
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/reports/serializers/report-serializer.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfReportSerializer {
    /**
     * @param {?} json
     * @return {?}
     */
    static fromJson(json) {
        /** @type {?} */
        const containers = ['header', 'footer', 'content'];
        containers.forEach((/**
         * @param {?} c
         * @return {?}
         */
        c => {
            if (json[c]) {
                ((/** @type {?} */ (json[c]))) =
                    AjfReportContainerSerializer.fromJson((/** @type {?} */ (json[c])));
            }
        }));
        return createReport(json);
    }
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/reports/widget.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
class AjfReportWidget {
    /**
     * @param {?} _cfr
     * @param {?} _renderer
     */
    constructor(_cfr, _renderer) {
        this._cfr = _cfr;
        this._renderer = _renderer;
        this._init = false;
    }
    /**
     * @return {?}
     */
    get instance() { return this._instance; }
    /**
     * @param {?} instance
     * @return {?}
     */
    set instance(instance) {
        if (this._instance !== instance) {
            this._instance = instance;
            if (this._init) {
                this._loadComponent();
            }
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._init = true;
        this._loadComponent();
    }
    /**
     * @private
     * @return {?}
     */
    _loadComponent() {
        if (!this._init || this._instance == null
            || this.widgetHost == null || !this.instance.visible) {
            return;
        }
        /** @type {?} */
        const vcr = this.widgetHost.viewContainerRef;
        vcr.clear();
        /** @type {?} */
        const componentDef = this.widgetsMap[this._instance.widget.widgetType];
        if (componentDef == null) {
            return;
        }
        /** @type {?} */
        const component = componentDef.component;
        try {
            /** @type {?} */
            const componentFactory = this._cfr.resolveComponentFactory(component);
            /** @type {?} */
            const componentRef = vcr.createComponent(componentFactory);
            /** @type {?} */
            const componentInstance = componentRef.instance;
            Object.keys(this._instance.widget.styles).forEach((/**
             * @param {?} style
             * @return {?}
             */
            (style) => {
                try {
                    this._renderer.setStyle(componentInstance.el.nativeElement, style, `${this._instance.widget.styles[style]}`);
                }
                catch (e) { }
            }));
            componentInstance.instance = this._instance;
            if (componentDef.inputs) {
                Object.keys(componentDef.inputs).forEach((/**
                 * @param {?} key
                 * @return {?}
                 */
                key => {
                    if (key in componentInstance) {
                        ((/** @type {?} */ (componentInstance)))[key] = (/** @type {?} */ (componentDef.inputs))[key];
                    }
                }));
            }
        }
        catch (e) { }
    }
}
AjfReportWidget.decorators = [
    { type: Directive }
];
/** @nocollapse */
AjfReportWidget.ctorParameters = () => [
    { type: ComponentFactoryResolver },
    { type: Renderer2 }
];
AjfReportWidget.propDecorators = {
    widgetHost: [{ type: ViewChild, args: [AjfWidgetHost, { static: true },] }],
    instance: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    AjfReportWidget.prototype.widgetHost;
    /**
     * @type {?}
     * @private
     */
    AjfReportWidget.prototype._instance;
    /**
     * @type {?}
     * @protected
     */
    AjfReportWidget.prototype.widgetsMap;
    /**
     * @type {?}
     * @private
     */
    AjfReportWidget.prototype._init;
    /**
     * @type {?}
     * @private
     */
    AjfReportWidget.prototype._cfr;
    /**
     * @type {?}
     * @private
     */
    AjfReportWidget.prototype._renderer;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/reports/widget-components-map.ts
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
/**
 * @record
 */
function AjfWidgetComponentsMap() { }

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/reports/utils/aggregation/evaluate-aggregation.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} aggregation
 * @param {?} formulas
 * @param {?} context
 * @return {?}
 */
function evaluateAggregation(aggregation, formulas, context) {
    /** @type {?} */
    const data = formulas.map((/**
     * @param {?} f
     * @return {?}
     */
    f => evaluateExpression(f.formula, context)));
    switch (aggregation.aggregation) {
        case AjfAggregationType.None:
            if (data.length !== 1) {
                throw new Error('Invalid aggregation');
            }
            return data[0];
        case AjfAggregationType.Sum:
            return data.map((/**
             * @param {?} r
             * @return {?}
             */
            (r) => r.reduce((/**
             * @param {?} s
             * @param {?} d
             * @return {?}
             */
            (s, d) => s + d), 0)));
        case AjfAggregationType.Average:
        case AjfAggregationType.WeightedAverage:
            return data.map((/**
             * @param {?} r
             * @return {?}
             */
            (r) => {
                /** @type {?} */
                const sum = r.reduce((/**
                 * @param {?} s
                 * @param {?} d
                 * @return {?}
                 */
                (s, d) => s + d), 0);
                return sum / data.length;
            }));
        default:
            return [];
    }
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/reports/utils/widgets-instances/create-widget-instance.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} widget
 * @param {?} context
 * @param {?} _ts
 * @return {?}
 */
function createWidgetInstance(widget, context, _ts) {
    return {
        widget,
        widgetType: widget.widgetType,
        visible: evaluateExpression(widget.visibility.condition, context),
        styles: widget.styles || {},
    };
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/reports/utils/widgets-instances/widget-to-widget-instance.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} widget
 * @param {?} context
 * @param {?} ts
 * @return {?}
 */
function widgetToWidgetInstance(widget, context, ts) {
    /** @type {?} */
    const wi = createWidgetInstance(widget, context, ts);
    if (widget.widgetType === AjfWidgetType.Column || widget.widgetType === AjfWidgetType.Layout) {
        /** @type {?} */
        const wwc = (/** @type {?} */ (widget));
        /** @type {?} */
        const wwci = (/** @type {?} */ (wi));
        /** @type {?} */
        let content = (/** @type {?} */ ([]));
        wwc.content.forEach((/**
         * @param {?} c
         * @return {?}
         */
        c => {
            if (wwc.repetitions != null) {
                wwci.repetitions = evaluateExpression(wwc.repetitions.formula, context);
                if (typeof wwci.repetitions === 'number' && wwci.repetitions > 0) {
                    for (let i = 0; i < wwci.repetitions; i++) {
                        content.push(widgetToWidgetInstance(c, Object.assign(Object.assign({}, context), { '$repetition': i }), ts));
                    }
                }
            }
            else {
                content.push(widgetToWidgetInstance(c, context, ts));
            }
            wwci.content = content;
        }));
    }
    else if (widget.widgetType === AjfWidgetType.Chart) {
        /** @type {?} */
        const cw = (/** @type {?} */ (widget));
        /** @type {?} */
        const cwi = (/** @type {?} */ (wi));
        /** @type {?} */
        const labels = cw.labels instanceof Array ? cw.labels : [cw.labels];
        /** @type {?} */
        const evLabels = labels.map((/**
         * @param {?} l
         * @return {?}
         */
        l => {
            /** @type {?} */
            let evf = evaluateExpression(l.formula, context);
            try {
                if (evf instanceof Array) {
                    evf = evf.map((/**
                     * @param {?} v
                     * @return {?}
                     */
                    v => v != null && typeof v === 'string' && v.trim().length > 0
                        ? ts.instant(v) : v));
                }
                else {
                    evf = evf != null && typeof evf === 'string' && evf.trim().length > 0
                        ? ts.instant(evf) : evf;
                }
            }
            catch (_e) {
            }
            return evf;
        }));
        cwi.labels = cw.labels instanceof Array ? evLabels : evLabels[0];
        cwi.datasets = cw.dataset.map((/**
         * @param {?} d
         * @return {?}
         */
        d => {
            /** @type {?} */
            let ds = Object.assign(Object.assign({}, d.options || {}), { data: evaluateAggregation(d.aggregation, d.formula, context) });
            if (d.chartType != null) {
                /** @type {?} */
                const ct = chartToChartJsType(d.chartType);
                ds = Object.assign(Object.assign({}, ds), { chartType: ct, type: ct });
            }
            if (d.options != null) {
                ds = Object.assign(Object.assign({}, ds), { options: d.options });
            }
            if (d.label != null) {
                ds = Object.assign(Object.assign({}, ds), { label: d.label });
            }
            if (d.datalabels != null) {
                ds.datalabels = deepCopy(d.datalabels);
            }
            return ds;
        }));
        cwi.data = { labels: cwi.labels, datasets: cwi.datasets };
        cwi.chartType = chartToChartJsType(cw.type || cw.chartType);
        if (cw.options != null && cw.options.plugins != null) {
            /** @type {?} */
            const plugins = cw.options.plugins;
            /** @type {?} */
            const pluginNames = Object.keys(plugins);
            pluginNames.forEach((/**
             * @param {?} pluginName
             * @return {?}
             */
            (pluginName) => {
                /** @type {?} */
                const plugin = plugins[pluginName];
                /** @type {?} */
                const pluginOptions = Object.keys(plugin);
                pluginOptions.forEach((/**
                 * @param {?} pluginOptionName
                 * @return {?}
                 */
                (pluginOptionName) => {
                    /** @type {?} */
                    const pluginOption = plugin[pluginOptionName];
                    if (typeof pluginOption !== 'string' &&
                        pluginOption != null &&
                        pluginOption.formula != null) {
                        plugin[pluginOptionName] = evaluateExpression(pluginOption.formula, context);
                    }
                }));
            }));
        }
    }
    else if (widget.widgetType === AjfWidgetType.Table) {
        /** @type {?} */
        const tw = (/** @type {?} */ (widget));
        /** @type {?} */
        const twi = (/** @type {?} */ (wi));
        /** @type {?} */
        const trFormula = (/**
         * @param {?} f
         * @return {?}
         */
        (f) => {
            /** @type {?} */
            let formula = f.formula;
            if (formula.substr(0, 1) === '"') {
                /** @type {?} */
                const ft = formula.slice(1, -1);
                /** @type {?} */
                const transFt = ft != null && typeof ft === 'string' && ft.trim().length > 0
                    ? ts.instant(ft) : ft;
                if (ft.length > 0) {
                    formula = `"${transFt}"`;
                }
            }
            else {
                formula = formula != null && typeof formula === 'string' && formula.trim().length > 0
                    ? ts.instant(formula) : formula;
            }
            return evaluateExpression(formula, context);
        });
        twi.dataset = tw.dataset.map((/**
         * @param {?} row
         * @return {?}
         */
        row => row.map((/**
         * @param {?} cell
         * @return {?}
         */
        cell => {
            return cell.formula instanceof Array ? cell.formula.map((/**
             * @param {?} f
             * @return {?}
             */
            f => trFormula((/** @type {?} */ (f))))) :
                trFormula((/** @type {?} */ (cell.formula)));
        }))));
        twi.data = (tw.dataset ||
            []).map((/**
         * @param {?} row
         * @return {?}
         */
        row => row.map((/**
         * @param {?} cell
         * @return {?}
         */
        cell => ({
            value: evaluateExpression(cell.formula.formula, context),
            style: Object.assign(Object.assign({}, tw.cellStyles), cell.style),
            rowspan: cell.rowspan,
            colspan: cell.colspan,
        })))));
    }
    else if (widget.widgetType === AjfWidgetType.Image) {
        /** @type {?} */
        const iw = (/** @type {?} */ (widget));
        /** @type {?} */
        const iwi = (/** @type {?} */ (wi));
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
        /** @type {?} */
        const icw = (/** @type {?} */ (widget));
        /** @type {?} */
        const icwi = (/** @type {?} */ (wi));
        if (icw.flags) {
            icwi.flags = icw.flags instanceof Array
                ? icw.flags.map((/**
                 * @param {?} f
                 * @return {?}
                 */
                f => evaluateExpression(f.formula, context)))
                : evaluateExpression(icw.flags.formula, context);
        }
        if (icw.icons) {
            icwi.icons = icw.icons instanceof Array
                ? icw.icons.map((/**
                 * @param {?} f
                 * @return {?}
                 */
                f => evaluateExpression(f.formula, context)))
                : evaluateExpression(icw.icons.formula, context);
        }
        if (icw.urls) {
            icwi.urls = icw.urls instanceof Array
                ? icw.urls.map((/**
                 * @param {?} f
                 * @return {?}
                 */
                f => evaluateExpression(f.formula, context)))
                : evaluateExpression(icw.urls.formula, context);
        }
    }
    else if (widget.widgetType === AjfWidgetType.Text) {
        /** @type {?} */
        const tew = (/** @type {?} */ (widget));
        /** @type {?} */
        const tewi = (/** @type {?} */ (wi));
        /** @type {?} */
        const formulaRegEx = /\[{2}(.+?)\]{2}/g;
        /** @type {?} */
        const matches = [];
        /** @type {?} */
        let match;
        /** @type {?} */
        let htmlText = tew.htmlText;
        while (match = formulaRegEx.exec(htmlText)) {
            /** @type {?} */
            const idx = match.index;
            /** @type {?} */
            const len = match[0].length;
            /** @type {?} */
            const formula = createFormula({ formula: match[1] });
            matches.push({ idx, len, formula });
        }
        matches.reverse().forEach((/**
         * @param {?} m
         * @return {?}
         */
        (m) => {
            /** @type {?} */
            let calcValue;
            try {
                calcValue = evaluateExpression(m.formula.formula, context);
            }
            catch (e) {
                calcValue = '';
            }
            htmlText = `${htmlText.substr(0, m.idx)}${calcValue}${htmlText.substr(m.idx + m.len)}`;
        }));
        tewi.htmlText = htmlText != null && htmlText.length > 0 ? ts.instant(htmlText) : htmlText;
    }
    else if (widget.widgetType === AjfWidgetType.Formula) {
        /** @type {?} */
        const fw = (/** @type {?} */ (widget));
        /** @type {?} */
        const fwi = (/** @type {?} */ (wi));
        fwi.formula = evaluateExpression(fw.formula.formula, context);
    }
    else if (widget.widgetType === AjfWidgetType.Map) {
        /** @type {?} */
        const mw = (/** @type {?} */ (widget));
        /** @type {?} */
        const mwi = (/** @type {?} */ (wi));
        mwi.coordinate = evaluateExpression(mw.coordinate.formula, context);
    }
    return wi;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/reports/utils/reports-instances/create-report-container-instance.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} container
 * @param {?} context
 * @param {?} ts
 * @return {?}
 */
function createReportContainerInstance(container, context, ts) {
    /** @type {?} */
    const content = container.content.map((/**
     * @param {?} c
     * @return {?}
     */
    c => widgetToWidgetInstance(c, context, ts)));
    return {
        container,
        content,
        styles: container.styles,
    };
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/reports/utils/reports-instances/create-report-instance.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} report
 * @param {?} context
 * @param {?} ts
 * @return {?}
 */
function createReportInstance(report, context, ts) {
    (report.variables || []).forEach((/**
     * @param {?} variable
     * @return {?}
     */
    variable => {
        context[variable.name] = evaluateExpression(variable.formula.formula, context);
    }));
    return {
        report,
        header: report.header ? createReportContainerInstance(report.header, context, ts) : undefined,
        content: report.content ? createReportContainerInstance(report.content, context, ts) :
            undefined,
        footer: report.footer ? createReportContainerInstance(report.footer, context, ts) : undefined,
        styles: report.styles || {},
    };
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/reports/public-api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * Generated bundle index. Do not edit.
 */

export { AjfAggregationSerializer, AjfAggregationType, AjfBaseWidgetComponent, AjfChartType, AjfDatasetSerializer, AjfGetColumnContentPipe, AjfReportContainerSerializer, AjfReportRenderer, AjfReportSerializer, AjfReportWidget, AjfReportsModule, AjfWidgetHost, AjfWidgetSerializer, AjfWidgetType, chartToChartJsType, createAggregation, createReportInstance, createWidget, createWidgetInstance, widgetToWidgetInstance };
//# sourceMappingURL=reports.js.map
