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
import { Pipe, NgModule } from '@angular/core';
import { AjfFormulaSerializer, alwaysCondition, AjfConditionSerializer, evaluateExpression, createFormula } from '@ajf/core/models';
import { AjfImageType } from '@ajf/core/image';
import { deepCopy } from '@ajf/core/utils';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
    get reportInstance() { return this._reportInstance; }
    /**
     * @param {?} reportInstance
     * @return {?}
     */
    set reportInstance(reportInstance) {
        this._reportInstance = reportInstance;
        this._report = reportInstance != null ? reportInstance.report : null;
        this._cdr.markForCheck();
    }
    /**
     * @return {?}
     */
    get report() {
        return this._report;
    }
}

/**
 * @fileoverview added by tsickle
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
    { type: Pipe, args: [{ name: 'ajfGetColumnContent' },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfReportsModule {
}
AjfReportsModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    AjfGetColumnContentPipe,
                ],
                exports: [
                    AjfGetColumnContentPipe,
                ],
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} aggregation
 * @return {?}
 */
function createAggregation(aggregation) {
    return Object.assign({}, aggregation, { aggregation: aggregation.aggregation || AjfAggregationType.None });
}

/**
 * @fileoverview added by tsickle
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
        return createAggregation(Object.assign({}, json, { aggregation: json.aggregation }));
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} dataset
 * @return {?}
 */
function createDataset(dataset) {
    return Object.assign({}, dataset, { aggregation: dataset.aggregation || createAggregation({ aggregation: AjfAggregationType.None }) });
}

/**
 * @fileoverview added by tsickle
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
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} widget
 * @return {?}
 */
function createWidget(widget) {
    return Object.assign({}, widget, { styles: widget.styles || {}, visibility: widget.visibility || alwaysCondition() });
}

/**
 * @fileoverview added by tsickle
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
        return Object.assign({}, createWidget(json), { dataset });
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
        return Object.assign({}, createWidget(json), { content });
    }
}

/**
 * @fileoverview added by tsickle
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
        return Object.assign({}, json, { content: (/** @type {?} */ (json.content)), styles: json.styles || {} });
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
class AjfWidgetRenderer {
    /**
     * @param {?} _cdr
     */
    constructor(_cdr) {
        this._cdr = _cdr;
        this.widgetTypes = AjfWidgetType;
        this._imageTypes = AjfImageType;
    }
    /**
     * @return {?}
     */
    get widget() {
        return this._widget;
    }
    /**
     * @return {?}
     */
    get imageTypes() { return this._imageTypes; }
    /**
     * @return {?}
     */
    get widgetInstance() {
        return this._widgetInstance;
    }
    /**
     * @param {?} widgetInstance
     * @return {?}
     */
    set widgetInstance(widgetInstance) {
        if (this._widgetInstance !== widgetInstance) {
            this._widgetInstance = widgetInstance;
            this._widget = this._widgetInstance != null ? this._widgetInstance.widget : null;
            this._cdr.markForCheck();
        }
    }
    /**
     * @return {?}
     */
    get columnInst() {
        return (/** @type {?} */ (this._widgetInstance));
    }
    /**
     * @return {?}
     */
    get imgwInst() {
        return (/** @type {?} */ (this._widgetInstance));
    }
    /**
     * @return {?}
     */
    get imgw() {
        return (/** @type {?} */ (this._widget));
    }
    /**
     * @return {?}
     */
    get imgcwInst() {
        return (/** @type {?} */ (this._widgetInstance));
    }
    /**
     * @return {?}
     */
    get imgcw() {
        return (/** @type {?} */ (this._widget));
    }
    /**
     * @return {?}
     */
    get layoutwInst() {
        return (/** @type {?} */ (this._widgetInstance));
    }
    /**
     * @return {?}
     */
    get layoutw() {
        return (/** @type {?} */ (this._widget));
    }
    /**
     * @return {?}
     */
    get chartwInst() {
        return (/** @type {?} */ (this._widgetInstance));
    }
    /**
     * @return {?}
     */
    get chartw() {
        return (/** @type {?} */ (this._widget));
    }
    /**
     * @return {?}
     */
    get tablewInst() {
        return (/** @type {?} */ (this._widgetInstance));
    }
    /**
     * @return {?}
     */
    get textwInst() {
        return (/** @type {?} */ (this._widgetInstance));
    }
    /**
     * @return {?}
     */
    get mapwInst() {
        return (/** @type {?} */ (this._widgetInstance));
    }
    /**
     * @return {?}
     */
    get mapw() {
        return (/** @type {?} */ (this._widget));
    }
    /**
     * @return {?}
     */
    get formulawInst() {
        return (/** @type {?} */ (this._widgetInstance));
    }
}

/**
 * @fileoverview added by tsickle
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
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} widget
 * @param {?} context
 * @param {?} ts
 * @return {?}
 */
function createWidgetInstance(widget, context, ts) {
    return {
        widget,
        widgetType: widget.widgetType,
        visible: evaluateExpression(widget.visibility.condition, context),
        styles: widget.styles || {},
    };
}

/**
 * @fileoverview added by tsickle
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
    const wi = createWidgetInstance(widget, context);
    if (widget.widgetType === AjfWidgetType.Column || widget.widgetType === AjfWidgetType.Layout) {
        /** @type {?} */
        const wwc = (/** @type {?} */ (widget));
        /** @type {?} */
        const wwci = (/** @type {?} */ (wi));
        wwci.content = wwc.content.map((/**
         * @param {?} c
         * @return {?}
         */
        c => widgetToWidgetInstance(c, context, ts)));
    }
    else if (widget.widgetType === AjfWidgetType.Chart) {
        /** @type {?} */
        const cw = (/** @type {?} */ (widget));
        /** @type {?} */
        const cwi = (/** @type {?} */ (wi));
        /** @type {?} */
        const labels = cw.labels instanceof Array ? cw.labels : [cw.labels];
        cwi.labels = labels.map((/**
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
                    v => ts.instant(v)));
                }
                else {
                    evf = ts.instant(evf);
                }
            }
            catch (_e) {
            }
            return evf;
        }));
        cwi.dataset = cw.dataset.map((/**
         * @param {?} d
         * @return {?}
         */
        d => {
            /** @type {?} */
            let ds = Object.assign({}, d.options || {}, { data: evaluateAggregation(d.aggregation, d.formula, context) });
            if (d.chartType != null) {
                /** @type {?} */
                const ct = chartToChartJsType(d.chartType);
                ds = Object.assign({}, ds, { chartType: ct, type: ct });
            }
            if (d.options != null) {
                ds = Object.assign({}, ds, { options: d.options });
            }
            if (d.label != null) {
                ds = Object.assign({}, ds, { label: d.label });
            }
            if (d.datalabels != null) {
                ds.datalabels = deepCopy(d.datalabels);
            }
            return ds;
        }));
        cwi.data = { labels: cwi.labels, datasets: cwi.datasets };
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
                if (ft.length > 0) {
                    formula = `"${ts.instant(ft)}"`;
                }
            }
            else {
                formula = ts.instant(formula);
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
            style: Object.assign({}, tw.cellStyles, cell.style),
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
            /** @type {?} */
            const flags = icw.flags instanceof Array ? icw.flags : [icw.flags];
            icwi.flags = flags.map((/**
             * @param {?} f
             * @return {?}
             */
            f => evaluateExpression(f.formula, context)));
        }
        if (icw.icons) {
            /** @type {?} */
            const icons = icw.icons instanceof Array ? icw.icons : [icw.icons];
            icwi.icons = icons.map((/**
             * @param {?} f
             * @return {?}
             */
            f => evaluateExpression(f.formula, context)));
        }
        if (icw.urls) {
            /** @type {?} */
            const urls = icw.urls instanceof Array ? icw.urls : [icw.urls];
            icwi.urls = urls.map((/**
             * @param {?} f
             * @return {?}
             */
            f => evaluateExpression(f.formula, context)));
        }
    }
    else if (widget.widgetType === AjfWidgetType.Text) {
        /** @type {?} */
        const tew = (/** @type {?} */ (widget));
        /** @type {?} */
        const tewi = (/** @type {?} */ (wi));
        /** @type {?} */
        const formulaRegEx = /\[\[(.+?)\]\]/g;
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
        }
        tewi.htmlText = ts.instant(htmlText);
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
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} report
 * @param {?} context
 * @param {?} ts
 * @return {?}
 */
function createReportInstance(report, context, ts) {
    return {
        report,
        header: report.header ? createReportContainerInstance(report.header, context, ts) : undefined,
        content: report.content ? createReportContainerInstance(report.content, context, ts) :
            undefined,
        footer: report.footer ? createReportContainerInstance(report.footer, context, ts) : undefined,
        styles: report.styles || {},
    };
}

export { AjfAggregationSerializer, AjfAggregationType, AjfChartType, AjfDatasetSerializer, AjfReportContainerSerializer, AjfReportRenderer, AjfReportSerializer, AjfReportsModule, AjfWidgetRenderer, AjfWidgetSerializer, AjfWidgetType, chartToChartJsType, createAggregation, createReportInstance, createWidget, AjfGetColumnContentPipe as ɵa, createReportContainerInstance as ɵb };
//# sourceMappingURL=reports.js.map
