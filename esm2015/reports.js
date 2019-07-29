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
import { AjfJsonSerializable, AjfFormula, AjfCondition } from '@ajf/core/models';
import { deepCopy } from '@ajf/core/utils';
import { Subject } from 'rxjs';
import { AjfImageType } from '@ajf/core/image';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
 * This class will define an ajf aggregator
 */
class AjfAggregation extends AjfJsonSerializable {
    /**
     * this static method will load an AjfAggregator from json
     * @param {?} obj : any - object aggregator
     * @return {?} AjfFormula
     */
    static fromJson(obj) {
        obj = deepCopy(obj);
        return new AjfAggregation(obj);
    }
    /**
     *
     * @param {?=} obj
     */
    constructor(obj) {
        super();
        this.jsonExportedMembers = ['aggregation'];
        this.aggregation = obj && obj.aggregation || AjfAggregationType.None;
    }
    /**
     * @param {?} formulas
     * @param {?} context
     * @return {?}
     */
    evaluate(formulas, context) {
        /** @type {?} */
        const data = formulas.map((/**
         * @param {?} f
         * @return {?}
         */
        f => f.evaluate(context)));
        switch (this.aggregation) {
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
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * This class will define an ajf dataset
 */
class AjfDataset extends AjfJsonSerializable {
    /**
     * this static method will load an AjfDataset from json
     * @param {?} obj : any - object formula
     * @return {?} AjfFormula
     */
    static fromJson(obj) {
        return new AjfDataset(AjfDataset._parseJsonObject(obj));
    }
    /**
     * @protected
     * @param {?} obj
     * @return {?}
     */
    static _parseJsonObject(obj) {
        obj = deepCopy(obj);
        /** @type {?} */
        let keys = Object.keys(obj);
        if (keys.indexOf('formula') === -1) {
            throw new Error('dataset formula missing');
        }
        if (keys.indexOf('aggregation') === -1) {
            throw new Error('dataset aggregation missing');
        }
        if (keys.indexOf('label') === -1) {
            throw new Error('dataset label missing');
        }
        /** @type {?} */
        let formula;
        if (obj.formula instanceof Array) {
            formula = ((/** @type {?} */ (obj.formula))).map((/**
             * @param {?} f
             * @return {?}
             */
            f => AjfFormula.fromJson(f)));
        }
        else {
            formula = AjfFormula.fromJson(obj.formula);
        }
        /** @type {?} */
        let aggregation = AjfAggregation.fromJson(obj.aggregation);
        obj.formula = formula;
        obj.aggregation = aggregation;
        return obj;
    }
    /**
     *
     * @param {?=} obj
     */
    constructor(obj) {
        super();
        this.jsonExportedMembers =
            this.jsonExportedMembers.concat(['formula', 'aggregation', 'label']);
        this.formula = obj && obj.formula || null;
        this.aggregation = obj && obj.aggregation || AjfAggregationType.None;
        this.label = obj && obj.label || null;
    }
}
class AjfTableDataset extends AjfDataset {
    /**
     * @param {?=} obj
     */
    constructor(obj) {
        super(obj);
        this.jsonExportedMembers =
            this.jsonExportedMembers.concat(['rowspan', 'colspan', 'style']);
        this.rowspan = obj && obj.rowspan || null;
        this.colspan = obj && obj.colspan || null;
        this.style = obj && obj.style || null;
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    static fromJson(obj) {
        return new AjfTableDataset(AjfDataset._parseJsonObject(obj));
    }
}
class AjfChartDataset extends AjfDataset {
    /**
     * @param {?=} obj
     */
    constructor(obj) {
        super(obj);
        this.jsonExportedMembers =
            this.jsonExportedMembers.concat(['chartType', 'options']);
        if (obj.chartType != null) {
            this.chartType = obj.chartType;
        }
        if (obj.options != null) {
            this.options = obj.options;
        }
        if (obj.datalabels != null) {
            this.datalabels = obj.datalabels;
        }
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    static fromJson(obj) {
        return new AjfChartDataset(AjfDataset._parseJsonObject(obj));
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {number} */
const AjfReportWidgetType = {
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
AjfReportWidgetType[AjfReportWidgetType.Layout] = 'Layout';
AjfReportWidgetType[AjfReportWidgetType.PageBreak] = 'PageBreak';
AjfReportWidgetType[AjfReportWidgetType.Image] = 'Image';
AjfReportWidgetType[AjfReportWidgetType.Text] = 'Text';
AjfReportWidgetType[AjfReportWidgetType.Chart] = 'Chart';
AjfReportWidgetType[AjfReportWidgetType.Table] = 'Table';
AjfReportWidgetType[AjfReportWidgetType.Map] = 'Map';
AjfReportWidgetType[AjfReportWidgetType.Column] = 'Column';
AjfReportWidgetType[AjfReportWidgetType.Formula] = 'Formula';
AjfReportWidgetType[AjfReportWidgetType.ImageContainer] = 'ImageContainer';
AjfReportWidgetType[AjfReportWidgetType.LENGTH] = 'LENGTH';
/** @enum {number} */
const AjfReportDataType = {
    EPI: 0,
    Month: 1,
    Year: 2,
    LENGTH: 3,
};
AjfReportDataType[AjfReportDataType.EPI] = 'EPI';
AjfReportDataType[AjfReportDataType.Month] = 'Month';
AjfReportDataType[AjfReportDataType.Year] = 'Year';
AjfReportDataType[AjfReportDataType.LENGTH] = 'LENGTH';
/**
 * Base abstract class that represent a report widget.
 *
 * @abstract
 */
class AjfReportWidget extends AjfJsonSerializable {
    /**
     * Creates a report widget from its JSON representation
     *
     * @throws 'Widget type missing' when the JSON representation lacks of a widget type / 'Invalid widget type' when the JSON representation contains an invalid widget type
     * @param {?} obj
     * @return {?} AjfReportWidget The report widget
     */
    static fromJson(obj) {
        /** @type {?} */
        let keys = Object.keys(obj);
        if (keys.indexOf('widgetType') === -1) {
            throw new Error('Widget type missing');
        }
        /** @type {?} */
        let widgetType = obj.widgetType;
        if (AjfReportWidgetType[widgetType] == null) {
            throw new Error('Invalid widget type');
        }
        obj = this.parseJsonObject(obj);
        delete obj.widgetType;
        return AjfReportWidget.createWidget(widgetType, obj);
    }
    /**
     * @protected
     * @param {?} obj
     * @return {?}
     */
    static parseJsonObject(obj) {
        obj = deepCopy(obj);
        /** @type {?} */
        let keys = Object.keys(obj);
        if (keys.indexOf('visibility') > -1) {
            obj.visibility = AjfCondition.fromJson(obj.visibility);
        }
        else {
            obj.visibility = AjfCondition.alwaysCondition();
        }
        if (keys.indexOf('content') > -1 && obj.content instanceof Array) {
            obj.content = obj.content.map((/**
             * @param {?} w
             * @return {?}
             */
            (w) => AjfReportWidget.fromJson(w)));
        }
        if (keys.indexOf('dataset') > -1 && obj['dataset'] instanceof Array) {
            if (obj.widgetType == AjfReportWidgetType.Table) {
                /** @type {?} */
                const data = obj.dataset
                    .map((/**
                 * @param {?} row
                 * @return {?}
                 */
                (row) => row.map((/**
                 * @param {?} cell
                 * @return {?}
                 */
                cell => AjfTableDataset.fromJson(cell)))));
                obj.dataset = data;
            }
            else if (obj.widgetType == AjfReportWidgetType.Chart) {
                /** @type {?} */
                const data = obj.dataset
                    .map((/**
                 * @param {?} row
                 * @return {?}
                 */
                (row) => AjfChartDataset.fromJson(row)));
                obj.dataset = data;
            }
        }
        if (keys.indexOf('labels') > -1) {
            if (obj['labels'] instanceof Array) {
                obj.labels = obj.labels.map((/**
                 * @param {?} l
                 * @return {?}
                 */
                (l) => AjfFormula.fromJson(l)));
            }
            else {
                obj.labels = AjfFormula.fromJson(obj.labels);
            }
        }
        if (keys.indexOf('coordinate') > -1) {
            obj.coordinate = AjfFormula.fromJson(obj.coordinate);
        }
        return obj;
    }
    /**
     * Creates a report widget given a widget type (\@see AjfReportWidgetType)
     * @param {?} widgetType
     * @param {?=} obj
     * @return {?}
     */
    static createWidget(widgetType, obj) {
        switch (widgetType) {
            case AjfReportWidgetType.Layout:
                return new AjfReportLayoutWidget(obj);
            case AjfReportWidgetType.PageBreak:
                return new AjfReportPageBreakWidget(obj);
            case AjfReportWidgetType.Image:
                return new AjfReportImageWidget(obj);
            case AjfReportWidgetType.Text:
                return new AjfReportTextWidget(obj);
            case AjfReportWidgetType.Chart:
                return new AjfReportChartWidget(obj);
            case AjfReportWidgetType.Table:
                return new AjfReportTableWidget(obj);
            case AjfReportWidgetType.Map:
                return new AjfReportMapWidget(obj);
            case AjfReportWidgetType.Column:
                return new AjfReportColumnWidget(obj);
            case AjfReportWidgetType.Formula:
                return new AjfReportFormulaWidget(obj);
            case AjfReportWidgetType.ImageContainer:
                return new AjfReportImageContainerWidget(obj);
            default:
                throw new Error('Invalid widget type');
        }
    }
    /**
     * The widget type (\@see AjfReportWidgetType)
     * @return {?}
     */
    get widgetType() {
        /** @type {?} */
        const thisObj = this;
        if (thisObj instanceof AjfReportLayoutWidget) {
            return AjfReportWidgetType.Layout;
        }
        if (thisObj instanceof AjfReportColumnWidget) {
            return AjfReportWidgetType.Column;
        }
        if (thisObj instanceof AjfReportPageBreakWidget) {
            return AjfReportWidgetType.PageBreak;
        }
        if (thisObj instanceof AjfReportImageWidget) {
            return AjfReportWidgetType.Image;
        }
        if (thisObj instanceof AjfReportTextWidget) {
            return AjfReportWidgetType.Text;
        }
        if (thisObj instanceof AjfReportChartWidget) {
            return AjfReportWidgetType.Chart;
        }
        if (thisObj instanceof AjfReportTableWidget) {
            return AjfReportWidgetType.Table;
        }
        if (thisObj instanceof AjfReportMapWidget) {
            return AjfReportWidgetType.Map;
        }
        if (thisObj instanceof AjfReportFormulaWidget) {
            return AjfReportWidgetType.Formula;
        }
        if (thisObj instanceof AjfReportImageContainerWidget) {
            return AjfReportWidgetType.ImageContainer;
        }
        throw new Error('Invalid widget type');
    }
    /**
     * @param {?=} obj
     */
    constructor(obj) {
        super(obj);
        this.jsonExportedMembers = this.jsonExportedMembers
            .concat(['widgetType', 'content', 'styles', 'visibility']);
        this.content = obj && obj.content || [];
        this.styles = obj && obj.styles || {};
        this.visibility = obj && obj.visibility || AjfCondition.alwaysCondition();
    }
}
class AjfReportLayoutWidget extends AjfReportWidget {
    /**
     * @return {?}
     */
    get hasContent() { return true; }
    /**
     * @param {?=} obj
     */
    constructor(obj) {
        super(obj);
        this.jsonExportedMembers = this.jsonExportedMembers.concat(['columns']);
        if (obj && obj.columns) {
            this.columns = obj.columns;
        }
        else {
            this.content = [new AjfReportColumnWidget()];
            this.columns = [1];
        }
    }
}
class AjfReportColumnWidget extends AjfReportWidget {
    /**
     * @return {?}
     */
    get hasContent() { return true; }
    /**
     * @param {?=} obj
     */
    constructor(obj) {
        super(obj);
    }
}
class AjfReportPageBreakWidget extends AjfReportWidget {
    /**
     * @return {?}
     */
    get hasContent() { return false; }
    /**
     * @param {?=} obj
     */
    constructor(obj) {
        super(obj);
    }
}
class AjfReportImageWidget extends AjfReportWidget {
    /**
     * @param {?=} obj
     */
    constructor(obj) {
        super(obj);
        this._imageType = AjfImageType.Image;
        this.jsonExportedMembers = this.jsonExportedMembers.concat([
            'imageType', 'url', 'icon', 'flag'
        ]);
        this._imageType = obj && obj.imageType != null ? obj.imageType : null;
        this._url = obj && obj.url ?
            (obj.url instanceof AjfFormula ? obj.url : AjfFormula.fromJson(obj.url)) :
            null;
        this._icon = obj && obj.icon ?
            (obj.icon instanceof AjfFormula ? obj.icon : AjfFormula.fromJson(obj.icon)) :
            null;
        this._flag = obj && obj.flag ?
            (obj.flag instanceof AjfFormula ? obj.flag : AjfFormula.fromJson(obj.flag)) :
            null;
    }
    /**
     * @return {?}
     */
    get hasContent() { return false; }
    /**
     * @return {?}
     */
    get imageType() { return this._imageType; }
    /**
     * @param {?} imageType
     * @return {?}
     */
    set imageType(imageType) {
        this._imageType = imageType;
        this._icon = null;
        this._flag = null;
        this._url = null;
    }
    /**
     * @return {?}
     */
    get icon() { return this._icon; }
    /**
     * @param {?} icon
     * @return {?}
     */
    set icon(icon) {
        if (this._imageType === AjfImageType.Icon) {
            this._icon = icon;
        }
    }
    /**
     * @return {?}
     */
    get flag() { return this._flag; }
    /**
     * @param {?} flag
     * @return {?}
     */
    set flag(flag) {
        if (this._imageType === AjfImageType.Flag) {
            this._flag = flag;
        }
    }
    /**
     * @return {?}
     */
    get url() { return this._url; }
    /**
     * @param {?} url
     * @return {?}
     */
    set url(url) {
        if (this._imageType === AjfImageType.Image) {
            this._url = url;
        }
    }
    /**
     * @param {?} imageUrl
     * @return {?}
     */
    setUrl(imageUrl) {
        this.imageType = AjfImageType.Image;
        this._url = new AjfFormula({ formula: `"${imageUrl}"` });
    }
    /**
     * @param {?} icon
     * @return {?}
     */
    setIcon(icon) {
        this.imageType = AjfImageType.Icon;
        this._icon = new AjfFormula({
            formula: `{fontSet: "${icon.fontSet}", fontIcon: "${icon.fontIcon}"}`
        });
    }
    /**
     * @param {?} flag
     * @return {?}
     */
    setFlag(flag) {
        this.imageType = AjfImageType.Flag;
        this._flag = new AjfFormula({ formula: `"${flag}"` });
    }
}
class AjfReportImageContainerWidget extends AjfReportWidget {
    /**
     * @param {?=} obj
     */
    constructor(obj) {
        super(obj);
        this._imageType = AjfImageType.Image;
        this.jsonExportedMembers = this.jsonExportedMembers.concat([
            'imageType', 'urls', 'icons', 'flags'
        ]);
        this._imageType = obj && obj.imageType != null ? obj.imageType : null;
        this.urls = obj && obj.urls ?
            (obj.urls instanceof AjfFormula ? obj.urls :
                (obj.urls instanceof Array ? obj.urls : AjfFormula.fromJson(obj.urls))) : [];
        this.flags = obj && obj.flags ?
            (obj.flags instanceof AjfFormula ? obj.flags :
                (obj.flags instanceof Array ? obj.flags : AjfFormula.fromJson(obj.flags))) : [];
        this.icons = obj && obj.icons
            ? (obj.icons instanceof AjfFormula
                ? obj.icons
                : obj.icons.map((/**
                 * @param {?} l
                 * @return {?}
                 */
                (l) => AjfFormula.fromJson(l))))
            : [];
    }
    /**
     * @return {?}
     */
    get hasContent() { return false; }
    /**
     * @return {?}
     */
    get imageType() { return this._imageType; }
    /**
     * @param {?} imageType
     * @return {?}
     */
    set imageType(imageType) {
        this._imageType = imageType;
        this.urls = [];
        this.flags = [];
        this.icons = [];
    }
}
class AjfReportTextWidget extends AjfReportWidget {
    /**
     * @return {?}
     */
    get htmlText() { return this._htmlText; }
    /**
     * @param {?} htmlText
     * @return {?}
     */
    set htmlText(htmlText) {
        this._htmlText = htmlText;
    }
    /**
     * @return {?}
     */
    get hasContent() { return false; }
    /**
     * @param {?=} obj
     */
    constructor(obj) {
        super(obj);
        this.jsonExportedMembers = this.jsonExportedMembers.concat(['htmlText']);
        this._htmlText = obj && obj.htmlText || '';
    }
}
class AjfReportFormulaWidget extends AjfReportWidget {
    /**
     * @return {?}
     */
    get formula() { return this._formula; }
    /**
     * @param {?} formula
     * @return {?}
     */
    set formula(formula) { this._formula = formula; }
    /**
     * @return {?}
     */
    get hasContent() { return true; }
    /**
     * @param {?=} obj
     */
    constructor(obj) {
        super(obj);
        this.jsonExportedMembers =
            this.jsonExportedMembers.concat(['content', 'formula']);
        this.content = obj && obj.content || [];
        this.formula = obj && obj.formula ?
            (obj.formula instanceof AjfFormula ? obj.formula : AjfFormula.fromJson(obj.formula)) : null;
    }
}
/**
 * @abstract
 */
class AjfReportDataWidget extends AjfReportWidget {
    /**
     * @return {?}
     */
    get hasContent() { return false; }
    /**
     * @param {?=} obj
     */
    constructor(obj) {
        super(obj);
        this.jsonExportedMembers = this.jsonExportedMembers
            .concat(['dataset']);
        this.dataset = obj && obj.dataset || [];
    }
}
/**
 * Concrete class for manage chart.
 *
 *
 *
 * @throws 'labels or data or backgroundColor or borderColor missed'
 *         if the length of arrays passed by obj are not the same
 */
class AjfReportChartWidget extends AjfReportDataWidget {
    /**
     * @param {?=} obj
     */
    constructor(obj) {
        super(obj);
        this.jsonExportedMembers = this.jsonExportedMembers
            .concat(['chartType', 'labels', 'options']);
        this.chartType = obj && obj.type || AjfChartType.Line;
        this.dataset = obj && obj.dataset || [];
        this.labels = obj && obj.labels || [];
        this.options = obj && obj.options || null;
    }
}
class AjfReportTableWidget extends AjfReportDataWidget {
    /**
     * @param {?=} obj
     */
    constructor(obj) {
        super(obj);
        this.jsonExportedMembers = this.jsonExportedMembers
            .concat(['cellStyles']);
        this.cellStyles = obj && obj.cellStyles || null;
    }
}
class AjfReportMapWidget extends AjfReportDataWidget {
    /**
     * @return {?}
     */
    get coordinateMap() { return this.coordinate; }
    /**
     * @return {?}
     */
    get tileLayerMap() { return this.tileLayer; }
    /**
     * @return {?}
     */
    get attributionMap() { return this.attribution; }
    /**
     * @return {?}
     */
    get disabledMap() { return this.disabled; }
    /**
     * @param {?=} obj
     */
    constructor(obj) {
        super(obj);
        this.jsonExportedMembers = this.jsonExportedMembers
            .concat(['coordinate', 'tileLayer', 'attribution', 'disabled']);
        this.coordinate = obj && obj.coordinate || '';
        this.tileLayer = obj && obj.tileLayer || '';
        this.attribution = obj && obj.attribution || '';
        this.disabled = obj && obj.disabled || false;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfReportWidgetInstance {
    /**
     * @param {?} widget
     * @param {?} context
     * @param {?} ts
     */
    constructor(widget, context, ts) {
        this.ts = ts;
        this._visible = true;
        this._widget = widget;
        if (widget != null) {
            this._styles = widget.styles;
            this._widgetType = widget.widgetType;
        }
        this._context = context;
        this._initInstance();
        this.initContext(context);
    }
    /**
     * @return {?}
     */
    get widget() { return this._widget; }
    /**
     * @return {?}
     */
    get visible() { return this._visible; }
    /**
     * @return {?}
     */
    get content() { return this._content; }
    /**
     * @return {?}
     */
    get styles() {
        return this._styles;
    }
    /**
     * @return {?}
     */
    get widgetType() {
        return this._widgetType;
    }
    /**
     * @param {?} widget
     * @param {?} context
     * @param {?} ts
     * @return {?}
     */
    static create(widget, context, ts) {
        if (widget instanceof AjfReportLayoutWidget) {
            return new AjfReportLayoutWidgetInstance(widget, context, ts);
        }
        else if (widget instanceof AjfReportImageWidget) {
            return new AjfReportImageWidgetInstance(widget, context, ts);
        }
        else if (widget instanceof AjfReportTextWidget) {
            return new AjfReportTextWidgetInstance(widget, context, ts);
        }
        else if (widget instanceof AjfReportTableWidget) {
            return new AjfReportTableWidgetInstance(widget, context, ts);
        }
        else if (widget instanceof AjfReportChartWidget) {
            return new AjfReportChartWidgetInstance(widget, context, ts);
        }
        else if (widget instanceof AjfReportMapWidget) {
            return new AjfReportMapWidgetInstance(widget, context, ts);
        }
        else if (widget instanceof AjfReportDataWidget) {
            return new AjfReportDataWidgetInstance(widget, context, ts);
        }
        else if (widget instanceof AjfReportFormulaWidget) {
            return new AjfReportFormulaWidgetInstance(widget, context, ts);
        }
        else if (widget instanceof AjfReportImageContainerWidget) {
            return new AjfReportImageContainerWidgetInstance(widget, context, ts);
        }
        else if (widget instanceof AjfReportWidget) {
            return new AjfReportWidgetInstance(widget, context, ts);
        }
        throw new Error('Invalid widget type');
    }
    /**
     * @param {?} context
     * @return {?}
     */
    initContext(context) {
        this._evaluateVisibility(context);
    }
    /**
     * @protected
     * @return {?}
     */
    _initInstance() {
        this._populateContent();
    }
    /**
     * @private
     * @return {?}
     */
    _populateContent() {
        /** @type {?} */
        const content = [];
        if (this._widget.hasContent) {
            this._widget.content.forEach((/**
             * @param {?} w
             * @return {?}
             */
            w => {
                content.push(AjfReportWidgetInstance.create(w, this._context, this.ts));
            }));
        }
        this._content = content;
    }
    /**
     * @private
     * @param {?} context
     * @return {?}
     */
    _evaluateVisibility(context) {
        if (this._widget.visibility != null) {
            this._visible = this._widget.visibility.evaluate(context);
        }
    }
}
class AjfReportDataWidgetInstance extends AjfReportWidgetInstance {
    /**
     * @return {?}
     */
    get widget() {
        return (/** @type {?} */ (this._widget));
    }
    /**
     * @return {?}
     */
    get dataset() { return this._dataset; }
    /**
     * @param {?} widget
     * @param {?} context
     * @param {?} ts
     */
    constructor(widget, context, ts) {
        super(widget, context, ts);
    }
    /**
     * @param {?} context
     * @return {?}
     */
    initContext(context) {
        super.initContext(context);
        this._populateData(context);
    }
    /**
     * @protected
     * @return {?}
     */
    _initInstance() {
        super._initInstance();
    }
    /**
     * @private
     * @param {?} context
     * @return {?}
     */
    _populateData(context) {
        this._dataset = ((/** @type {?} */ ((this.widget.dataset || []))))
            .map((/**
         * @param {?} row
         * @return {?}
         */
        row => {
            if (row instanceof Array) {
                return ((/** @type {?} */ (row))).map((/**
                 * @param {?} cell
                 * @return {?}
                 */
                (cell) => {
                    return cell.formula instanceof Array ?
                        cell.formula.map((/**
                         * @param {?} f
                         * @return {?}
                         */
                        (f) => f.evaluate(context))) :
                        cell.formula.evaluate(context);
                }));
            }
            else {
                /** @type {?} */
                const formula = ((/** @type {?} */ (row))).formula;
                return formula instanceof Array ?
                    formula.map((/**
                     * @param {?} f
                     * @return {?}
                     */
                    (f) => f.evaluate(context))) :
                    formula.evaluate(context);
            }
        }));
    }
}
class AjfReportLayoutWidgetInstance extends AjfReportWidgetInstance {
    /**
     * @param {?} widget
     * @param {?} context
     * @param {?} ts
     */
    constructor(widget, context, ts) {
        super(widget, context, ts);
    }
    /**
     * @param {?} column
     * @return {?}
     */
    getColumnContent(column) {
        return column >= 0 && column < this.content.length ? this.content[column] : null;
    }
}
class AjfReportColumnWidgetInstance extends AjfReportWidgetInstance {
    /**
     * @param {?} widget
     * @param {?} context
     * @param {?} ts
     */
    constructor(widget, context, ts) {
        super(widget, context, ts);
    }
}
class AjfReportPageBreakWidgetInstance extends AjfReportWidgetInstance {
    /**
     * @param {?} widget
     * @param {?} context
     * @param {?} ts
     */
    constructor(widget, context, ts) {
        super(widget, context, ts);
    }
}
class AjfReportImageWidgetInstance extends AjfReportWidgetInstance {
    /**
     * @return {?}
     */
    get icon() { return this._icon; }
    /**
     * @return {?}
     */
    get flag() { return this._flag; }
    /**
     * @return {?}
     */
    get url() { return this._url; }
    /**
     * @param {?} context
     * @return {?}
     */
    initContext(context) {
        super.initContext(context);
        /** @type {?} */
        const widget = ((/** @type {?} */ (this.widget)));
        /** @type {?} */
        const icon = widget.icon;
        /** @type {?} */
        const flag = widget.flag;
        /** @type {?} */
        const url = widget.url;
        this._icon = icon ? icon.evaluate(context) : '';
        this._flag = flag ? flag.evaluate(context) : '';
        this._url = url ? url.evaluate(context) : '';
    }
}
class AjfReportImageContainerWidgetInstance extends AjfReportWidgetInstance {
    /**
     * @return {?}
     */
    get icons() { return this._icons; }
    /**
     * @return {?}
     */
    get flags() { return this._flags; }
    /**
     * @return {?}
     */
    get urls() { return this._urls; }
    /**
     * @param {?} context
     * @return {?}
     */
    initContext(context) {
        super.initContext(context);
        /** @type {?} */
        const widget = ((/** @type {?} */ (this.widget)));
        // TODO: check! perche' evaluate torna una lista di liste?
        // this._urls[0][0] contiene la lista di url..
        this._urls = widget.urls ?
            (widget.urls instanceof Array ? widget.urls :
                (widget.urls instanceof AjfFormula ? widget.urls.evaluate(context) : []))
            : [];
        this._flags = widget.flags ?
            (widget.flags instanceof Array ? widget.flags :
                (widget.flags instanceof AjfFormula ? widget.flags.evaluate(context) : []))
            : [];
        this._icons = widget.icons ?
            (widget.icons instanceof Array ? widget.icons.map((/**
             * @param {?} l
             * @return {?}
             */
            (l) => l.evaluate(context))) :
                (widget.icons instanceof AjfFormula ? widget.icons.evaluate(context) : []))
            : [];
    }
}
class AjfReportTextWidgetInstance extends AjfReportWidgetInstance {
    /**
     * @return {?}
     */
    get htmlText() { return this._htmlText; }
    /**
     * @param {?} context
     * @return {?}
     */
    initContext(context) {
        super.initContext(context);
        /** @type {?} */
        const formulaRegEx = /\[\[(.+?)\]\]/g;
        /** @type {?} */
        const widget = ((/** @type {?} */ (this.widget)));
        /** @type {?} */
        let htmlText = widget.htmlText;
        /** @type {?} */
        const matches = [];
        /** @type {?} */
        let match;
        while (match = formulaRegEx.exec(htmlText)) {
            /** @type {?} */
            const idx = match['index'];
            /** @type {?} */
            const len = match[0].length;
            /** @type {?} */
            const formula = new AjfFormula({ formula: match[1] });
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
                calcValue = m.formula.evaluate(context);
            }
            catch (e) {
                calcValue = '';
            }
            htmlText = `${htmlText.substr(0, m.idx)}${calcValue}${htmlText.substr(m.idx + m.len)}`;
        }));
        this._htmlText = htmlText;
    }
}
class AjfReportTableWidgetInstance extends AjfReportWidgetInstance {
    /**
     * @param {?} widget
     * @param {?} context
     * @param {?} ts
     */
    constructor(widget, context, ts) {
        super(widget, context, ts);
        this._recalcEvt = new Subject();
        this._recalc = this._recalcEvt.asObservable();
    }
    /**
     * @return {?}
     */
    get data() { return this._data; }
    /**
     * @return {?}
     */
    get recalc() { return this._recalc; }
    /**
     * @param {?} context
     * @return {?}
     */
    initContext(context) {
        super.initContext(context);
        /** @type {?} */
        const widget = (/** @type {?} */ (this.widget));
        this._data = [];
        /** @type {?} */
        let rows = (widget.dataset || []);
        /** @type {?} */
        const rowsNum = rows.length;
        for (let i = 0; i < rowsNum; i++) {
            /** @type {?} */
            const row = rows[i];
            /** @type {?} */
            const cellsNum = row.length;
            this._data.push([]);
            for (let j = 0; j < cellsNum; j++) {
                /** @type {?} */
                const cell = row[j];
                /** @type {?} */
                const value = cell.formula.evaluate(context);
                /** @type {?} */
                const style = Object.assign({}, widget.cellStyles, cell.style);
                this._data[i].push((/** @type {?} */ ({
                    value,
                    style,
                    rowspan: cell.rowspan,
                    colspan: cell.colspan
                })));
            }
        }
        // this._data = (widget.dataset || []).map((row: AjfDataset[]) => {
        //   return row.map((cell: AjfTableDataset) => {
        //     return <AjfTableCell>{
        //       value: cell.formula.evaluate(context),
        //       style: {...widget.cellStyles, ...cell.style},
        //       rowspan: cell.rowspan,
        //       colspan: cell.colspan
        //     };
        //   });
        // });
    }
    /**
     * @param {?} context
     * @return {?}
     */
    calcValues(context) {
        if (context === undefined) {
            return;
        }
        /** @type {?} */
        const widget = (/** @type {?} */ (this.widget));
        /** @type {?} */
        let rows = (widget.dataset || []);
        /** @type {?} */
        const rowsNum = rows.length;
        for (let i = 0; i < rowsNum; i++) {
            /** @type {?} */
            const row = rows[i];
            /** @type {?} */
            const cellsNum = row.length;
            for (let j = 0; j < cellsNum; j++) {
                /** @type {?} */
                const cell = row[j];
                this._data[i][j].value = cell.formula.evaluate(context);
            }
        }
        this._data = this._data.slice(0);
        this._recalcEvt.next(true);
    }
}
class AjfReportChartWidgetInstance extends AjfReportDataWidgetInstance {
    /**
     * @return {?}
     */
    get data() {
        return this._data;
    }
    /**
     * @return {?}
     */
    get chartType() { return this._chartType; }
    /**
     * @param {?} widget
     * @param {?} context
     * @param {?} ts
     */
    constructor(widget, context, ts) {
        super(widget, context, ts);
    }
    /**
     * @private
     * @param {?} formula
     * @param {?} context
     * @return {?}
     */
    _translate(formula, context) {
        /** @type {?} */
        const evaluatedfunction = formula.evaluate(context);
        try {
            if (Array.isArray(evaluatedfunction)) {
                evaluatedfunction.forEach((/**
                 * @param {?} rowValue
                 * @param {?} index
                 * @return {?}
                 */
                (rowValue, index) => {
                    if (Array.isArray(rowValue)) {
                        rowValue.forEach((/**
                         * @param {?} value
                         * @param {?} rowIndex
                         * @return {?}
                         */
                        (value, rowIndex) => {
                            evaluatedfunction[index][rowIndex] = this.ts.instant(value);
                        }));
                    }
                    else {
                        evaluatedfunction[index] = this.ts.instant(rowValue);
                    }
                }));
            }
            return evaluatedfunction;
        }
        catch (e) {
            return evaluatedfunction;
        }
    }
    /**
     * @param {?} context
     * @return {?}
     */
    initContext(context) {
        super.initContext(context);
        /** @type {?} */
        const widget = (/** @type {?} */ (this.widget));
        this._chartType = chartToChartJsType(widget.chartType);
        if (widget.labels instanceof Array) {
            widget.labels.map((/**
             * @param {?} l
             * @return {?}
             */
            (l) => {
                this._labels.concat(this._translate(l, context));
            }));
        }
        else {
            this._labels = this._translate(widget.labels, context);
        }
        this._datasets = widget.dataset.map(((/**
         * @param {?} d
         * @return {?}
         */
        d => {
            /** @type {?} */
            let ds = (/** @type {?} */ (Object.assign({}, d.options || {}, { data: d.aggregation.evaluate(d.formula, context) })));
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
        })));
        this._data = { labels: this._labels, datasets: this._datasets };
    }
}
class AjfReportMapWidgetInstance extends AjfReportDataWidgetInstance {
    /**
     * @param {?} context
     * @return {?}
     */
    initContext(context) {
        super.initContext(context);
        /** @type {?} */
        const widget = (/** @type {?} */ (this.widget));
        this.coordinate = widget.coordinate.evaluate(context);
    }
}
class AjfReportFormulaWidgetInstance extends AjfReportWidgetInstance {
    /**
     * @return {?}
     */
    get formula() { return this._formula; }
    /**
     * @param {?} context
     * @return {?}
     */
    initContext(context) {
        super.initContext(context);
        /** @type {?} */
        const widget = (/** @type {?} */ (this.widget));
        this._formula = widget.formula.evaluate(context);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfReportContainerInstance {
    /**
     * @param {?} container
     * @param {?} context
     * @param {?} _ts
     */
    constructor(container, context, _ts) {
        this._ts = _ts;
        this._styles = {};
        this._container = container;
        this._styles = this._container != null ? this._container.styles : {};
        this._context = context;
        this._populateContent();
    }
    /**
     * @return {?}
     */
    get container() { return this._container; }
    /**
     * @return {?}
     */
    get content() { return this._content; }
    /**
     * @return {?}
     */
    get styles() { return this._styles; }
    /**
     * @private
     * @return {?}
     */
    _populateContent() {
        /** @type {?} */
        const content = [];
        this._container.content.forEach((/**
         * @param {?} c
         * @return {?}
         */
        c => {
            this._translate(c);
            content.push(AjfReportWidgetInstance.create(c, this._context, this._ts));
        }));
        this._content = content;
    }
    /**
     * @private
     * @param {?} reportWidget
     * @return {?}
     */
    _translate(reportWidget) {
        if (reportWidget.hasContent) {
            reportWidget.content.forEach((/**
             * @param {?} subReportWidget
             * @return {?}
             */
            (subReportWidget) => {
                this._translate(subReportWidget);
            }));
        }
        if (reportWidget instanceof AjfReportTextWidget && reportWidget.htmlText) {
            reportWidget.htmlText = this._ts.instant(reportWidget.htmlText);
        }
        if (reportWidget instanceof AjfReportChartWidget && reportWidget.dataset) {
            reportWidget.dataset.forEach((/**
             * @param {?} element
             * @return {?}
             */
            element => {
                element.label = element.label ? this._ts.instant(element.label) : '';
            }));
        }
        if (reportWidget instanceof AjfReportTableWidget && reportWidget.dataset) {
            reportWidget.dataset.forEach((/**
             * @param {?} row
             * @return {?}
             */
            (row) => {
                row.forEach((/**
                 * @param {?} element
                 * @return {?}
                 */
                (element) => {
                    if (element.formula && element.formula.formula) {
                        try {
                            /** @type {?} */
                            let formulaToBeTranslate = element.formula.formula;
                            if (formulaToBeTranslate[0] === '"') {
                                formulaToBeTranslate = formulaToBeTranslate.slice(1, -1);
                                element.formula.formula = formulaToBeTranslate.length > 0
                                    ? `"${this._ts.instant(formulaToBeTranslate)}"` : element.formula.formula;
                            }
                            else {
                                element.formula.formula = this._ts.instant(formulaToBeTranslate);
                            }
                        }
                        catch (e) { }
                    }
                }));
            }));
        }
    }
}
/**
 * A report instance. Report + data
 */
class AjfReportInstance {
    /**
     * @param {?} report
     * @param {?} context
     * @param {?} _ts
     */
    constructor(report, context, _ts) {
        this._ts = _ts;
        this._report = report;
        this._context = context;
        this._populateReport();
    }
    /**
     * @return {?}
     */
    get report() { return this._report; }
    /**
     * @return {?}
     */
    get header() { return this._header; }
    /**
     * @return {?}
     */
    get content() { return this._content; }
    /**
     * @return {?}
     */
    get footer() { return this._footer; }
    /**
     * @return {?}
     */
    get data() { return this._data; }
    /**
     * @return {?}
     */
    get styles() {
        return this._report != null ? this._report.styles : {};
    }
    /**
     * @return {?}
     */
    get context() { return this._context; }
    /**
     * @private
     * @return {?}
     */
    _populateReport() {
        this._header = this._populateContainer(this._report.header);
        this._content = this._populateContainer(this._report.content);
        this._footer = this._populateContainer(this._report.footer);
    }
    /**
     * @private
     * @param {?} container
     * @return {?}
     */
    _populateContainer(container) {
        return new AjfReportContainerInstance(container, this._context, this._ts);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfReportContainer extends AjfJsonSerializable {
    /**
     * @return {?}
     */
    get content() { return this._content; }
    /**
     * @return {?}
     */
    get styles() { return this._styles; }
    /**
     * @param {?} obj
     * @return {?}
     */
    static fromJson(obj) {
        obj = deepCopy(obj);
        /** @type {?} */
        let keys = Object.keys(obj);
        if (keys.indexOf('content') > -1 && obj['content'] instanceof Array) {
            obj['content'] = obj['content'].map((/**
             * @param {?} cw
             * @return {?}
             */
            (cw) => AjfReportWidget.fromJson(cw)));
        }
        return new AjfReportContainer(obj);
    }
    /**
     * @param {?=} obj
     */
    constructor(obj) {
        super(obj);
        this.jsonExportedMembers = this.jsonExportedMembers.concat(['content', 'styles']);
        this._content = obj && obj.content || [];
        this._styles = obj && obj.styles || {};
    }
}
/**
 * Class that represents a report.
 * A report is defined as three trees of report widgets (\@see AjfReportWidget),
 * displayed each in the header / content / footer of the report.
 *
 */
class AjfReport extends AjfJsonSerializable {
    /**
     * @return {?}
     */
    get header() { return this._header; }
    /**
     * @return {?}
     */
    get footer() { return this._footer; }
    /**
     * @return {?}
     */
    get content() { return this._content; }
    /**
     * @return {?}
     */
    get styles() { return this._styles; }
    /**
     * @param {?} styles
     * @return {?}
     */
    set styles(styles) {
        this._styles = styles;
    }
    /**
     * @return {?}
     */
    get forms() { return this._forms; }
    /**
     * @param {?} forms
     * @return {?}
     */
    set forms(forms) {
        this._forms = forms;
    }
    /**
     * Creates a report starting from a JSON representation.
     * The form definition can be nested in the report JSON.
     * @param {?} obj : any The JSON representation of the report
     * @param {?=} forms
     * @return {?} AjfReport The report
     */
    static fromJson(obj, forms) {
        obj = deepCopy(obj);
        /** @type {?} */
        const keys = Object.keys(obj);
        /** @type {?} */
        const containers = ['header', 'footer', 'content'];
        containers.forEach((/**
         * @param {?} c
         * @return {?}
         */
        (c) => {
            if (keys.indexOf(c) > -1) {
                obj[c] = AjfReportContainer.fromJson(obj[c]);
            }
        }));
        return new AjfReport(forms || [], obj);
    }
    /**
     * Creates a report.
     * @param {?} forms
     * @param {?=} obj : any Report initial data
     */
    constructor(forms, obj) {
        super(obj);
        this._forms = forms.slice(0);
        this.jsonExportedMembers = this.jsonExportedMembers
            .concat(['header', 'footer', 'content', 'styles']);
        this._header = obj && obj.header || null;
        this._footer = obj && obj.footer || null;
        this._content = obj && obj.content || null;
        this._styles = obj && obj.styles || null;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
class AjfReportWidgetRenderer {
    /**
     * @param {?} _cdr
     */
    constructor(_cdr) {
        this._cdr = _cdr;
        this.widgetTypes = AjfReportWidgetType;
        this._imageTypes = AjfImageType;
    }
    /**
     * @return {?}
     */
    get widget() { return this._widget; }
    /**
     * @return {?}
     */
    get imageTypes() { return this._imageTypes; }
    /**
     * @return {?}
     */
    get widgetInstance() { return this._widgetInstance; }
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

export { AjfAggregation, AjfAggregationType, AjfChartDataset, AjfChartType, AjfDataset, AjfReport, AjfReportChartWidget, AjfReportChartWidgetInstance, AjfReportColumnWidget, AjfReportColumnWidgetInstance, AjfReportContainer, AjfReportContainerInstance, AjfReportDataType, AjfReportDataWidget, AjfReportDataWidgetInstance, AjfReportFormulaWidget, AjfReportFormulaWidgetInstance, AjfReportImageContainerWidget, AjfReportImageContainerWidgetInstance, AjfReportImageWidget, AjfReportImageWidgetInstance, AjfReportInstance, AjfReportLayoutWidget, AjfReportLayoutWidgetInstance, AjfReportMapWidget, AjfReportMapWidgetInstance, AjfReportPageBreakWidget, AjfReportPageBreakWidgetInstance, AjfReportRenderer, AjfReportTableWidget, AjfReportTableWidgetInstance, AjfReportTextWidget, AjfReportTextWidgetInstance, AjfReportWidget, AjfReportWidgetInstance, AjfReportWidgetRenderer, AjfReportWidgetType, AjfTableDataset, chartToChartJsType };
//# sourceMappingURL=reports.js.map
