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
import { __extends, __assign } from 'tslib';
import { AjfJsonSerializable, AjfFormula, AjfCondition } from '@ajf/core/models';
import { deepCopy } from '@ajf/core/utils';
import { Subject } from 'rxjs';
import { AjfImageType } from '@ajf/core/image';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {number} */
var AjfAggregationType = {
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
var  /**
 * This class will define an ajf aggregator
 */
AjfAggregation = /** @class */ (function (_super) {
    __extends(AjfAggregation, _super);
    /**
     *
     * @param obj
     */
    function AjfAggregation(obj) {
        var _this = _super.call(this) || this;
        _this.jsonExportedMembers = ['aggregation'];
        _this.aggregation = obj && obj.aggregation || AjfAggregationType.None;
        return _this;
    }
    /**
     * this static method will load an AjfAggregator from json
     * @param obj : any - object aggregator
     * @return AjfFormula
     */
    /**
     * this static method will load an AjfAggregator from json
     * @param {?} obj : any - object aggregator
     * @return {?} AjfFormula
     */
    AjfAggregation.fromJson = /**
     * this static method will load an AjfAggregator from json
     * @param {?} obj : any - object aggregator
     * @return {?} AjfFormula
     */
    function (obj) {
        obj = deepCopy(obj);
        return new AjfAggregation(obj);
    };
    /**
     * @param {?} formulas
     * @param {?} context
     * @return {?}
     */
    AjfAggregation.prototype.evaluate = /**
     * @param {?} formulas
     * @param {?} context
     * @return {?}
     */
    function (formulas, context) {
        /** @type {?} */
        var data = formulas.map((/**
         * @param {?} f
         * @return {?}
         */
        function (f) { return f.evaluate(context); }));
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
                function (r) { return r.reduce((/**
                 * @param {?} s
                 * @param {?} d
                 * @return {?}
                 */
                function (s, d) { return s + d; }), 0); }));
            case AjfAggregationType.Average:
            case AjfAggregationType.WeightedAverage:
                return data.map((/**
                 * @param {?} r
                 * @return {?}
                 */
                function (r) {
                    /** @type {?} */
                    var sum = r.reduce((/**
                     * @param {?} s
                     * @param {?} d
                     * @return {?}
                     */
                    function (s, d) { return s + d; }), 0);
                    return sum / data.length;
                }));
            default:
                return [];
        }
    };
    return AjfAggregation;
}(AjfJsonSerializable));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/** @enum {number} */
var AjfChartType = {
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
var  /**
 * This class will define an ajf dataset
 */
AjfDataset = /** @class */ (function (_super) {
    __extends(AjfDataset, _super);
    /**
     *
     * @param obj
     */
    function AjfDataset(obj) {
        var _this = _super.call(this) || this;
        _this.jsonExportedMembers =
            _this.jsonExportedMembers.concat(['formula', 'aggregation', 'label']);
        _this.formula = obj && obj.formula || null;
        _this.aggregation = obj && obj.aggregation || AjfAggregationType.None;
        _this.label = obj && obj.label || null;
        return _this;
    }
    /**
     * this static method will load an AjfDataset from json
     * @param obj : any - object formula
     * @return AjfFormula
     */
    /**
     * this static method will load an AjfDataset from json
     * @param {?} obj : any - object formula
     * @return {?} AjfFormula
     */
    AjfDataset.fromJson = /**
     * this static method will load an AjfDataset from json
     * @param {?} obj : any - object formula
     * @return {?} AjfFormula
     */
    function (obj) {
        return new AjfDataset(AjfDataset._parseJsonObject(obj));
    };
    /**
     * @protected
     * @param {?} obj
     * @return {?}
     */
    AjfDataset._parseJsonObject = /**
     * @protected
     * @param {?} obj
     * @return {?}
     */
    function (obj) {
        obj = deepCopy(obj);
        /** @type {?} */
        var keys = Object.keys(obj);
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
        var formula;
        if (obj.formula instanceof Array) {
            formula = ((/** @type {?} */ (obj.formula))).map((/**
             * @param {?} f
             * @return {?}
             */
            function (f) { return AjfFormula.fromJson(f); }));
        }
        else {
            formula = AjfFormula.fromJson(obj.formula);
        }
        /** @type {?} */
        var aggregation = AjfAggregation.fromJson(obj.aggregation);
        obj.formula = formula;
        obj.aggregation = aggregation;
        return obj;
    };
    return AjfDataset;
}(AjfJsonSerializable));
var AjfTableDataset = /** @class */ (function (_super) {
    __extends(AjfTableDataset, _super);
    function AjfTableDataset(obj) {
        var _this = _super.call(this, obj) || this;
        _this.jsonExportedMembers =
            _this.jsonExportedMembers.concat(['rowspan', 'colspan', 'style']);
        _this.rowspan = obj && obj.rowspan || null;
        _this.colspan = obj && obj.colspan || null;
        _this.style = obj && obj.style || null;
        return _this;
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    AjfTableDataset.fromJson = /**
     * @param {?} obj
     * @return {?}
     */
    function (obj) {
        return new AjfTableDataset(AjfDataset._parseJsonObject(obj));
    };
    return AjfTableDataset;
}(AjfDataset));
var AjfChartDataset = /** @class */ (function (_super) {
    __extends(AjfChartDataset, _super);
    function AjfChartDataset(obj) {
        var _this = _super.call(this, obj) || this;
        _this.jsonExportedMembers =
            _this.jsonExportedMembers.concat(['chartType', 'options']);
        if (obj.chartType != null) {
            _this.chartType = obj.chartType;
        }
        if (obj.options != null) {
            _this.options = obj.options;
        }
        if (obj.datalabels != null) {
            _this.datalabels = obj.datalabels;
        }
        return _this;
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    AjfChartDataset.fromJson = /**
     * @param {?} obj
     * @return {?}
     */
    function (obj) {
        return new AjfChartDataset(AjfDataset._parseJsonObject(obj));
    };
    return AjfChartDataset;
}(AjfDataset));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @abstract
 */
var  /**
 * @abstract
 */
AjfReportRenderer = /** @class */ (function () {
    function AjfReportRenderer(_cdr) {
        this._cdr = _cdr;
    }
    Object.defineProperty(AjfReportRenderer.prototype, "reportInstance", {
        get: /**
         * @return {?}
         */
        function () { return this._reportInstance; },
        set: /**
         * @param {?} reportInstance
         * @return {?}
         */
        function (reportInstance) {
            this._reportInstance = reportInstance;
            this._report = reportInstance != null ? reportInstance.report : null;
            this._cdr.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfReportRenderer.prototype, "report", {
        get: /**
         * @return {?}
         */
        function () {
            return this._report;
        },
        enumerable: true,
        configurable: true
    });
    return AjfReportRenderer;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {number} */
var AjfReportWidgetType = {
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
var AjfReportDataType = {
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
var  /**
 * Base abstract class that represent a report widget.
 *
 * @abstract
 */
AjfReportWidget = /** @class */ (function (_super) {
    __extends(AjfReportWidget, _super);
    function AjfReportWidget(obj) {
        var _this = _super.call(this, obj) || this;
        _this.jsonExportedMembers = _this.jsonExportedMembers
            .concat(['widgetType', 'content', 'styles', 'visibility']);
        _this.content = obj && obj.content || [];
        _this.styles = obj && obj.styles || {};
        _this.visibility = obj && obj.visibility || AjfCondition.alwaysCondition();
        return _this;
    }
    /**
     * Creates a report widget from its JSON representation
     *
     * @param obj: any The JSON representation
     * @throws 'Widget type missing' when the JSON representation lacks of a widget type
     * @throws 'Invalid widget type' when the JSON representation contains an invalid widget type
     * @return AjfReportWidget The report widget
     */
    /**
     * Creates a report widget from its JSON representation
     *
     * @throws 'Widget type missing' when the JSON representation lacks of a widget type / 'Invalid widget type' when the JSON representation contains an invalid widget type
     * @param {?} obj
     * @return {?} AjfReportWidget The report widget
     */
    AjfReportWidget.fromJson = /**
     * Creates a report widget from its JSON representation
     *
     * @throws 'Widget type missing' when the JSON representation lacks of a widget type / 'Invalid widget type' when the JSON representation contains an invalid widget type
     * @param {?} obj
     * @return {?} AjfReportWidget The report widget
     */
    function (obj) {
        /** @type {?} */
        var keys = Object.keys(obj);
        if (keys.indexOf('widgetType') === -1) {
            throw new Error('Widget type missing');
        }
        /** @type {?} */
        var widgetType = obj.widgetType;
        if (AjfReportWidgetType[widgetType] == null) {
            throw new Error('Invalid widget type');
        }
        obj = this.parseJsonObject(obj);
        delete obj.widgetType;
        return AjfReportWidget.createWidget(widgetType, obj);
    };
    /**
     * @protected
     * @param {?} obj
     * @return {?}
     */
    AjfReportWidget.parseJsonObject = /**
     * @protected
     * @param {?} obj
     * @return {?}
     */
    function (obj) {
        obj = deepCopy(obj);
        /** @type {?} */
        var keys = Object.keys(obj);
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
            function (w) { return AjfReportWidget.fromJson(w); }));
        }
        if (keys.indexOf('dataset') > -1 && obj['dataset'] instanceof Array) {
            if (obj.widgetType == AjfReportWidgetType.Table) {
                /** @type {?} */
                var data = obj.dataset
                    .map((/**
                 * @param {?} row
                 * @return {?}
                 */
                function (row) { return row.map((/**
                 * @param {?} cell
                 * @return {?}
                 */
                function (cell) { return AjfTableDataset.fromJson(cell); })); }));
                obj.dataset = data;
            }
            else if (obj.widgetType == AjfReportWidgetType.Chart) {
                /** @type {?} */
                var data = obj.dataset
                    .map((/**
                 * @param {?} row
                 * @return {?}
                 */
                function (row) { return AjfChartDataset.fromJson(row); }));
                obj.dataset = data;
            }
        }
        if (keys.indexOf('labels') > -1) {
            if (obj['labels'] instanceof Array) {
                obj.labels = obj.labels.map((/**
                 * @param {?} l
                 * @return {?}
                 */
                function (l) { return AjfFormula.fromJson(l); }));
            }
            else {
                obj.labels = AjfFormula.fromJson(obj.labels);
            }
        }
        if (keys.indexOf('coordinate') > -1) {
            obj.coordinate = AjfFormula.fromJson(obj.coordinate);
        }
        return obj;
    };
    /**
     * Creates a report widget given a widget type (@see AjfReportWidgetType)
     */
    /**
     * Creates a report widget given a widget type (\@see AjfReportWidgetType)
     * @param {?} widgetType
     * @param {?=} obj
     * @return {?}
     */
    AjfReportWidget.createWidget = /**
     * Creates a report widget given a widget type (\@see AjfReportWidgetType)
     * @param {?} widgetType
     * @param {?=} obj
     * @return {?}
     */
    function (widgetType, obj) {
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
    };
    Object.defineProperty(AjfReportWidget.prototype, "widgetType", {
        /**
         * The widget type (@see AjfReportWidgetType)
         */
        get: /**
         * The widget type (\@see AjfReportWidgetType)
         * @return {?}
         */
        function () {
            /** @type {?} */
            var thisObj = this;
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
        },
        enumerable: true,
        configurable: true
    });
    return AjfReportWidget;
}(AjfJsonSerializable));
var AjfReportLayoutWidget = /** @class */ (function (_super) {
    __extends(AjfReportLayoutWidget, _super);
    function AjfReportLayoutWidget(obj) {
        var _this = _super.call(this, obj) || this;
        _this.jsonExportedMembers = _this.jsonExportedMembers.concat(['columns']);
        if (obj && obj.columns) {
            _this.columns = obj.columns;
        }
        else {
            _this.content = [new AjfReportColumnWidget()];
            _this.columns = [1];
        }
        return _this;
    }
    Object.defineProperty(AjfReportLayoutWidget.prototype, "hasContent", {
        get: /**
         * @return {?}
         */
        function () { return true; },
        enumerable: true,
        configurable: true
    });
    return AjfReportLayoutWidget;
}(AjfReportWidget));
var AjfReportColumnWidget = /** @class */ (function (_super) {
    __extends(AjfReportColumnWidget, _super);
    function AjfReportColumnWidget(obj) {
        return _super.call(this, obj) || this;
    }
    Object.defineProperty(AjfReportColumnWidget.prototype, "hasContent", {
        get: /**
         * @return {?}
         */
        function () { return true; },
        enumerable: true,
        configurable: true
    });
    return AjfReportColumnWidget;
}(AjfReportWidget));
var AjfReportPageBreakWidget = /** @class */ (function (_super) {
    __extends(AjfReportPageBreakWidget, _super);
    function AjfReportPageBreakWidget(obj) {
        return _super.call(this, obj) || this;
    }
    Object.defineProperty(AjfReportPageBreakWidget.prototype, "hasContent", {
        get: /**
         * @return {?}
         */
        function () { return false; },
        enumerable: true,
        configurable: true
    });
    return AjfReportPageBreakWidget;
}(AjfReportWidget));
var AjfReportImageWidget = /** @class */ (function (_super) {
    __extends(AjfReportImageWidget, _super);
    function AjfReportImageWidget(obj) {
        var _this = _super.call(this, obj) || this;
        _this._imageType = AjfImageType.Image;
        _this.jsonExportedMembers = _this.jsonExportedMembers.concat([
            'imageType', 'url', 'icon', 'flag'
        ]);
        _this._imageType = obj && obj.imageType != null ? obj.imageType : null;
        _this._url = obj && obj.url ?
            (obj.url instanceof AjfFormula ? obj.url : AjfFormula.fromJson(obj.url)) :
            null;
        _this._icon = obj && obj.icon ?
            (obj.icon instanceof AjfFormula ? obj.icon : AjfFormula.fromJson(obj.icon)) :
            null;
        _this._flag = obj && obj.flag ?
            (obj.flag instanceof AjfFormula ? obj.flag : AjfFormula.fromJson(obj.flag)) :
            null;
        return _this;
    }
    Object.defineProperty(AjfReportImageWidget.prototype, "hasContent", {
        get: /**
         * @return {?}
         */
        function () { return false; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfReportImageWidget.prototype, "imageType", {
        get: /**
         * @return {?}
         */
        function () { return this._imageType; },
        set: /**
         * @param {?} imageType
         * @return {?}
         */
        function (imageType) {
            this._imageType = imageType;
            this._icon = null;
            this._flag = null;
            this._url = null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfReportImageWidget.prototype, "icon", {
        get: /**
         * @return {?}
         */
        function () { return this._icon; },
        set: /**
         * @param {?} icon
         * @return {?}
         */
        function (icon) {
            if (this._imageType === AjfImageType.Icon) {
                this._icon = icon;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfReportImageWidget.prototype, "flag", {
        get: /**
         * @return {?}
         */
        function () { return this._flag; },
        set: /**
         * @param {?} flag
         * @return {?}
         */
        function (flag) {
            if (this._imageType === AjfImageType.Flag) {
                this._flag = flag;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfReportImageWidget.prototype, "url", {
        get: /**
         * @return {?}
         */
        function () { return this._url; },
        set: /**
         * @param {?} url
         * @return {?}
         */
        function (url) {
            if (this._imageType === AjfImageType.Image) {
                this._url = url;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} imageUrl
     * @return {?}
     */
    AjfReportImageWidget.prototype.setUrl = /**
     * @param {?} imageUrl
     * @return {?}
     */
    function (imageUrl) {
        this.imageType = AjfImageType.Image;
        this._url = new AjfFormula({ formula: "\"" + imageUrl + "\"" });
    };
    /**
     * @param {?} icon
     * @return {?}
     */
    AjfReportImageWidget.prototype.setIcon = /**
     * @param {?} icon
     * @return {?}
     */
    function (icon) {
        this.imageType = AjfImageType.Icon;
        this._icon = new AjfFormula({
            formula: "{fontSet: \"" + icon.fontSet + "\", fontIcon: \"" + icon.fontIcon + "\"}"
        });
    };
    /**
     * @param {?} flag
     * @return {?}
     */
    AjfReportImageWidget.prototype.setFlag = /**
     * @param {?} flag
     * @return {?}
     */
    function (flag) {
        this.imageType = AjfImageType.Flag;
        this._flag = new AjfFormula({ formula: "\"" + flag + "\"" });
    };
    return AjfReportImageWidget;
}(AjfReportWidget));
var AjfReportImageContainerWidget = /** @class */ (function (_super) {
    __extends(AjfReportImageContainerWidget, _super);
    function AjfReportImageContainerWidget(obj) {
        var _this = _super.call(this, obj) || this;
        _this._imageType = AjfImageType.Image;
        _this.jsonExportedMembers = _this.jsonExportedMembers.concat([
            'imageType', 'urls', 'icons', 'flags'
        ]);
        _this._imageType = obj && obj.imageType != null ? obj.imageType : null;
        _this.urls = obj && obj.urls ?
            (obj.urls instanceof AjfFormula ? obj.urls :
                (obj.urls instanceof Array ? obj.urls : AjfFormula.fromJson(obj.urls))) : [];
        _this.flags = obj && obj.flags ?
            (obj.flags instanceof AjfFormula ? obj.flags :
                (obj.flags instanceof Array ? obj.flags : AjfFormula.fromJson(obj.flags))) : [];
        _this.icons = obj && obj.icons
            ? (obj.icons instanceof AjfFormula
                ? obj.icons
                : obj.icons.map((/**
                 * @param {?} l
                 * @return {?}
                 */
                function (l) { return AjfFormula.fromJson(l); })))
            : [];
        return _this;
    }
    Object.defineProperty(AjfReportImageContainerWidget.prototype, "hasContent", {
        get: /**
         * @return {?}
         */
        function () { return false; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfReportImageContainerWidget.prototype, "imageType", {
        get: /**
         * @return {?}
         */
        function () { return this._imageType; },
        set: /**
         * @param {?} imageType
         * @return {?}
         */
        function (imageType) {
            this._imageType = imageType;
            this.urls = [];
            this.flags = [];
            this.icons = [];
        },
        enumerable: true,
        configurable: true
    });
    return AjfReportImageContainerWidget;
}(AjfReportWidget));
var AjfReportTextWidget = /** @class */ (function (_super) {
    __extends(AjfReportTextWidget, _super);
    function AjfReportTextWidget(obj) {
        var _this = _super.call(this, obj) || this;
        _this.jsonExportedMembers = _this.jsonExportedMembers.concat(['htmlText']);
        _this._htmlText = obj && obj.htmlText || '';
        return _this;
    }
    Object.defineProperty(AjfReportTextWidget.prototype, "htmlText", {
        get: /**
         * @return {?}
         */
        function () { return this._htmlText; },
        set: /**
         * @param {?} htmlText
         * @return {?}
         */
        function (htmlText) {
            this._htmlText = htmlText;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfReportTextWidget.prototype, "hasContent", {
        get: /**
         * @return {?}
         */
        function () { return false; },
        enumerable: true,
        configurable: true
    });
    return AjfReportTextWidget;
}(AjfReportWidget));
var AjfReportFormulaWidget = /** @class */ (function (_super) {
    __extends(AjfReportFormulaWidget, _super);
    function AjfReportFormulaWidget(obj) {
        var _this = _super.call(this, obj) || this;
        _this.jsonExportedMembers =
            _this.jsonExportedMembers.concat(['content', 'formula']);
        _this.content = obj && obj.content || [];
        _this.formula = obj && obj.formula ?
            (obj.formula instanceof AjfFormula ? obj.formula : AjfFormula.fromJson(obj.formula)) : null;
        return _this;
    }
    Object.defineProperty(AjfReportFormulaWidget.prototype, "formula", {
        get: /**
         * @return {?}
         */
        function () { return this._formula; },
        set: /**
         * @param {?} formula
         * @return {?}
         */
        function (formula) { this._formula = formula; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfReportFormulaWidget.prototype, "hasContent", {
        get: /**
         * @return {?}
         */
        function () { return true; },
        enumerable: true,
        configurable: true
    });
    return AjfReportFormulaWidget;
}(AjfReportWidget));
/**
 * @abstract
 */
var  /**
 * @abstract
 */
AjfReportDataWidget = /** @class */ (function (_super) {
    __extends(AjfReportDataWidget, _super);
    function AjfReportDataWidget(obj) {
        var _this = _super.call(this, obj) || this;
        _this.jsonExportedMembers = _this.jsonExportedMembers
            .concat(['dataset']);
        _this.dataset = obj && obj.dataset || [];
        return _this;
    }
    Object.defineProperty(AjfReportDataWidget.prototype, "hasContent", {
        get: /**
         * @return {?}
         */
        function () { return false; },
        enumerable: true,
        configurable: true
    });
    return AjfReportDataWidget;
}(AjfReportWidget));
/**
 * Concrete class for manage chart.
 *
 *
 *
 * @throws 'labels or data or backgroundColor or borderColor missed'
 *         if the length of arrays passed by obj are not the same
 */
var  /**
 * Concrete class for manage chart.
 *
 *
 *
 * @throws 'labels or data or backgroundColor or borderColor missed'
 *         if the length of arrays passed by obj are not the same
 */
AjfReportChartWidget = /** @class */ (function (_super) {
    __extends(AjfReportChartWidget, _super);
    function AjfReportChartWidget(obj) {
        var _this = _super.call(this, obj) || this;
        _this.jsonExportedMembers = _this.jsonExportedMembers
            .concat(['chartType', 'labels', 'options']);
        _this.chartType = obj && obj.type || AjfChartType.Line;
        _this.dataset = obj && obj.dataset || [];
        _this.labels = obj && obj.labels || [];
        _this.options = obj && obj.options || null;
        return _this;
    }
    return AjfReportChartWidget;
}(AjfReportDataWidget));
var AjfReportTableWidget = /** @class */ (function (_super) {
    __extends(AjfReportTableWidget, _super);
    function AjfReportTableWidget(obj) {
        var _this = _super.call(this, obj) || this;
        _this.jsonExportedMembers = _this.jsonExportedMembers
            .concat(['cellStyles']);
        _this.cellStyles = obj && obj.cellStyles || null;
        return _this;
    }
    return AjfReportTableWidget;
}(AjfReportDataWidget));
var AjfReportMapWidget = /** @class */ (function (_super) {
    __extends(AjfReportMapWidget, _super);
    function AjfReportMapWidget(obj) {
        var _this = _super.call(this, obj) || this;
        _this.jsonExportedMembers = _this.jsonExportedMembers
            .concat(['coordinate', 'tileLayer', 'attribution', 'disabled']);
        _this.coordinate = obj && obj.coordinate || '';
        _this.tileLayer = obj && obj.tileLayer || '';
        _this.attribution = obj && obj.attribution || '';
        _this.disabled = obj && obj.disabled || false;
        return _this;
    }
    Object.defineProperty(AjfReportMapWidget.prototype, "coordinateMap", {
        get: /**
         * @return {?}
         */
        function () { return this.coordinate; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfReportMapWidget.prototype, "tileLayerMap", {
        get: /**
         * @return {?}
         */
        function () { return this.tileLayer; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfReportMapWidget.prototype, "attributionMap", {
        get: /**
         * @return {?}
         */
        function () { return this.attribution; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfReportMapWidget.prototype, "disabledMap", {
        get: /**
         * @return {?}
         */
        function () { return this.disabled; },
        enumerable: true,
        configurable: true
    });
    return AjfReportMapWidget;
}(AjfReportDataWidget));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AjfReportWidgetInstance = /** @class */ (function () {
    function AjfReportWidgetInstance(widget, context, ts) {
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
    Object.defineProperty(AjfReportWidgetInstance.prototype, "widget", {
        get: /**
         * @return {?}
         */
        function () { return this._widget; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfReportWidgetInstance.prototype, "visible", {
        get: /**
         * @return {?}
         */
        function () { return this._visible; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfReportWidgetInstance.prototype, "content", {
        get: /**
         * @return {?}
         */
        function () { return this._content; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfReportWidgetInstance.prototype, "styles", {
        get: /**
         * @return {?}
         */
        function () {
            return this._styles;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfReportWidgetInstance.prototype, "widgetType", {
        get: /**
         * @return {?}
         */
        function () {
            return this._widgetType;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} widget
     * @param {?} context
     * @param {?} ts
     * @return {?}
     */
    AjfReportWidgetInstance.create = /**
     * @param {?} widget
     * @param {?} context
     * @param {?} ts
     * @return {?}
     */
    function (widget, context, ts) {
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
    };
    /**
     * @param {?} context
     * @return {?}
     */
    AjfReportWidgetInstance.prototype.initContext = /**
     * @param {?} context
     * @return {?}
     */
    function (context) {
        this._evaluateVisibility(context);
    };
    /**
     * @protected
     * @return {?}
     */
    AjfReportWidgetInstance.prototype._initInstance = /**
     * @protected
     * @return {?}
     */
    function () {
        this._populateContent();
    };
    /**
     * @private
     * @return {?}
     */
    AjfReportWidgetInstance.prototype._populateContent = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var content = [];
        if (this._widget.hasContent) {
            this._widget.content.forEach((/**
             * @param {?} w
             * @return {?}
             */
            function (w) {
                content.push(AjfReportWidgetInstance.create(w, _this._context, _this.ts));
            }));
        }
        this._content = content;
    };
    /**
     * @private
     * @param {?} context
     * @return {?}
     */
    AjfReportWidgetInstance.prototype._evaluateVisibility = /**
     * @private
     * @param {?} context
     * @return {?}
     */
    function (context) {
        if (this._widget.visibility != null) {
            this._visible = this._widget.visibility.evaluate(context);
        }
    };
    return AjfReportWidgetInstance;
}());
var AjfReportDataWidgetInstance = /** @class */ (function (_super) {
    __extends(AjfReportDataWidgetInstance, _super);
    function AjfReportDataWidgetInstance(widget, context, ts) {
        return _super.call(this, widget, context, ts) || this;
    }
    Object.defineProperty(AjfReportDataWidgetInstance.prototype, "widget", {
        get: /**
         * @return {?}
         */
        function () {
            return (/** @type {?} */ (this._widget));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfReportDataWidgetInstance.prototype, "dataset", {
        get: /**
         * @return {?}
         */
        function () { return this._dataset; },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} context
     * @return {?}
     */
    AjfReportDataWidgetInstance.prototype.initContext = /**
     * @param {?} context
     * @return {?}
     */
    function (context) {
        _super.prototype.initContext.call(this, context);
        this._populateData(context);
    };
    /**
     * @protected
     * @return {?}
     */
    AjfReportDataWidgetInstance.prototype._initInstance = /**
     * @protected
     * @return {?}
     */
    function () {
        _super.prototype._initInstance.call(this);
    };
    /**
     * @private
     * @param {?} context
     * @return {?}
     */
    AjfReportDataWidgetInstance.prototype._populateData = /**
     * @private
     * @param {?} context
     * @return {?}
     */
    function (context) {
        this._dataset = ((/** @type {?} */ ((this.widget.dataset || []))))
            .map((/**
         * @param {?} row
         * @return {?}
         */
        function (row) {
            if (row instanceof Array) {
                return ((/** @type {?} */ (row))).map((/**
                 * @param {?} cell
                 * @return {?}
                 */
                function (cell) {
                    return cell.formula instanceof Array ?
                        cell.formula.map((/**
                         * @param {?} f
                         * @return {?}
                         */
                        function (f) { return f.evaluate(context); })) :
                        cell.formula.evaluate(context);
                }));
            }
            else {
                /** @type {?} */
                var formula = ((/** @type {?} */ (row))).formula;
                return formula instanceof Array ?
                    formula.map((/**
                     * @param {?} f
                     * @return {?}
                     */
                    function (f) { return f.evaluate(context); })) :
                    formula.evaluate(context);
            }
        }));
    };
    return AjfReportDataWidgetInstance;
}(AjfReportWidgetInstance));
var AjfReportLayoutWidgetInstance = /** @class */ (function (_super) {
    __extends(AjfReportLayoutWidgetInstance, _super);
    function AjfReportLayoutWidgetInstance(widget, context, ts) {
        return _super.call(this, widget, context, ts) || this;
    }
    /**
     * @param {?} column
     * @return {?}
     */
    AjfReportLayoutWidgetInstance.prototype.getColumnContent = /**
     * @param {?} column
     * @return {?}
     */
    function (column) {
        return column >= 0 && column < this.content.length ? this.content[column] : null;
    };
    return AjfReportLayoutWidgetInstance;
}(AjfReportWidgetInstance));
var AjfReportColumnWidgetInstance = /** @class */ (function (_super) {
    __extends(AjfReportColumnWidgetInstance, _super);
    function AjfReportColumnWidgetInstance(widget, context, ts) {
        return _super.call(this, widget, context, ts) || this;
    }
    return AjfReportColumnWidgetInstance;
}(AjfReportWidgetInstance));
var AjfReportPageBreakWidgetInstance = /** @class */ (function (_super) {
    __extends(AjfReportPageBreakWidgetInstance, _super);
    function AjfReportPageBreakWidgetInstance(widget, context, ts) {
        return _super.call(this, widget, context, ts) || this;
    }
    return AjfReportPageBreakWidgetInstance;
}(AjfReportWidgetInstance));
var AjfReportImageWidgetInstance = /** @class */ (function (_super) {
    __extends(AjfReportImageWidgetInstance, _super);
    function AjfReportImageWidgetInstance() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(AjfReportImageWidgetInstance.prototype, "icon", {
        get: /**
         * @return {?}
         */
        function () { return this._icon; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfReportImageWidgetInstance.prototype, "flag", {
        get: /**
         * @return {?}
         */
        function () { return this._flag; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfReportImageWidgetInstance.prototype, "url", {
        get: /**
         * @return {?}
         */
        function () { return this._url; },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} context
     * @return {?}
     */
    AjfReportImageWidgetInstance.prototype.initContext = /**
     * @param {?} context
     * @return {?}
     */
    function (context) {
        _super.prototype.initContext.call(this, context);
        /** @type {?} */
        var widget = ((/** @type {?} */ (this.widget)));
        /** @type {?} */
        var icon = widget.icon;
        /** @type {?} */
        var flag = widget.flag;
        /** @type {?} */
        var url = widget.url;
        this._icon = icon ? icon.evaluate(context) : '';
        this._flag = flag ? flag.evaluate(context) : '';
        this._url = url ? url.evaluate(context) : '';
    };
    return AjfReportImageWidgetInstance;
}(AjfReportWidgetInstance));
var AjfReportImageContainerWidgetInstance = /** @class */ (function (_super) {
    __extends(AjfReportImageContainerWidgetInstance, _super);
    function AjfReportImageContainerWidgetInstance() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(AjfReportImageContainerWidgetInstance.prototype, "icons", {
        get: /**
         * @return {?}
         */
        function () { return this._icons; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfReportImageContainerWidgetInstance.prototype, "flags", {
        get: /**
         * @return {?}
         */
        function () { return this._flags; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfReportImageContainerWidgetInstance.prototype, "urls", {
        get: /**
         * @return {?}
         */
        function () { return this._urls; },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} context
     * @return {?}
     */
    AjfReportImageContainerWidgetInstance.prototype.initContext = /**
     * @param {?} context
     * @return {?}
     */
    function (context) {
        _super.prototype.initContext.call(this, context);
        /** @type {?} */
        var widget = ((/** @type {?} */ (this.widget)));
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
            function (l) { return l.evaluate(context); })) :
                (widget.icons instanceof AjfFormula ? widget.icons.evaluate(context) : []))
            : [];
    };
    return AjfReportImageContainerWidgetInstance;
}(AjfReportWidgetInstance));
var AjfReportTextWidgetInstance = /** @class */ (function (_super) {
    __extends(AjfReportTextWidgetInstance, _super);
    function AjfReportTextWidgetInstance() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(AjfReportTextWidgetInstance.prototype, "htmlText", {
        get: /**
         * @return {?}
         */
        function () { return this._htmlText; },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} context
     * @return {?}
     */
    AjfReportTextWidgetInstance.prototype.initContext = /**
     * @param {?} context
     * @return {?}
     */
    function (context) {
        _super.prototype.initContext.call(this, context);
        /** @type {?} */
        var formulaRegEx = /\[\[(.+?)\]\]/g;
        /** @type {?} */
        var widget = ((/** @type {?} */ (this.widget)));
        /** @type {?} */
        var htmlText = widget.htmlText;
        /** @type {?} */
        var matches = [];
        /** @type {?} */
        var match;
        while (match = formulaRegEx.exec(htmlText)) {
            /** @type {?} */
            var idx = match['index'];
            /** @type {?} */
            var len = match[0].length;
            /** @type {?} */
            var formula = new AjfFormula({ formula: match[1] });
            matches.push({ idx: idx, len: len, formula: formula });
        }
        matches.reverse().forEach((/**
         * @param {?} m
         * @return {?}
         */
        function (m) {
            /** @type {?} */
            var calcValue;
            try {
                calcValue = m.formula.evaluate(context);
            }
            catch (e) {
                calcValue = '';
            }
            htmlText = "" + htmlText.substr(0, m.idx) + calcValue + htmlText.substr(m.idx + m.len);
        }));
        this._htmlText = htmlText;
    };
    return AjfReportTextWidgetInstance;
}(AjfReportWidgetInstance));
var AjfReportTableWidgetInstance = /** @class */ (function (_super) {
    __extends(AjfReportTableWidgetInstance, _super);
    function AjfReportTableWidgetInstance(widget, context, ts) {
        var _this = _super.call(this, widget, context, ts) || this;
        _this._recalcEvt = new Subject();
        _this._recalc = _this._recalcEvt.asObservable();
        return _this;
    }
    Object.defineProperty(AjfReportTableWidgetInstance.prototype, "data", {
        get: /**
         * @return {?}
         */
        function () { return this._data; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfReportTableWidgetInstance.prototype, "recalc", {
        get: /**
         * @return {?}
         */
        function () { return this._recalc; },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} context
     * @return {?}
     */
    AjfReportTableWidgetInstance.prototype.initContext = /**
     * @param {?} context
     * @return {?}
     */
    function (context) {
        _super.prototype.initContext.call(this, context);
        /** @type {?} */
        var widget = (/** @type {?} */ (this.widget));
        this._data = [];
        /** @type {?} */
        var rows = (widget.dataset || []);
        /** @type {?} */
        var rowsNum = rows.length;
        for (var i = 0; i < rowsNum; i++) {
            /** @type {?} */
            var row = rows[i];
            /** @type {?} */
            var cellsNum = row.length;
            this._data.push([]);
            for (var j = 0; j < cellsNum; j++) {
                /** @type {?} */
                var cell = row[j];
                /** @type {?} */
                var value = cell.formula.evaluate(context);
                /** @type {?} */
                var style = __assign({}, widget.cellStyles, cell.style);
                this._data[i].push((/** @type {?} */ ({
                    value: value,
                    style: style,
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
    };
    /**
     * @param {?} context
     * @return {?}
     */
    AjfReportTableWidgetInstance.prototype.calcValues = /**
     * @param {?} context
     * @return {?}
     */
    function (context) {
        if (context === undefined) {
            return;
        }
        /** @type {?} */
        var widget = (/** @type {?} */ (this.widget));
        /** @type {?} */
        var rows = (widget.dataset || []);
        /** @type {?} */
        var rowsNum = rows.length;
        for (var i = 0; i < rowsNum; i++) {
            /** @type {?} */
            var row = rows[i];
            /** @type {?} */
            var cellsNum = row.length;
            for (var j = 0; j < cellsNum; j++) {
                /** @type {?} */
                var cell = row[j];
                this._data[i][j].value = cell.formula.evaluate(context);
            }
        }
        this._data = this._data.slice(0);
        this._recalcEvt.next(true);
    };
    return AjfReportTableWidgetInstance;
}(AjfReportWidgetInstance));
var AjfReportChartWidgetInstance = /** @class */ (function (_super) {
    __extends(AjfReportChartWidgetInstance, _super);
    function AjfReportChartWidgetInstance(widget, context, ts) {
        return _super.call(this, widget, context, ts) || this;
    }
    Object.defineProperty(AjfReportChartWidgetInstance.prototype, "data", {
        get: /**
         * @return {?}
         */
        function () {
            return this._data;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfReportChartWidgetInstance.prototype, "chartType", {
        get: /**
         * @return {?}
         */
        function () { return this._chartType; },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     * @param {?} formula
     * @param {?} context
     * @return {?}
     */
    AjfReportChartWidgetInstance.prototype._translate = /**
     * @private
     * @param {?} formula
     * @param {?} context
     * @return {?}
     */
    function (formula, context) {
        var _this = this;
        /** @type {?} */
        var evaluatedfunction = formula.evaluate(context);
        try {
            if (Array.isArray(evaluatedfunction)) {
                evaluatedfunction.forEach((/**
                 * @param {?} rowValue
                 * @param {?} index
                 * @return {?}
                 */
                function (rowValue, index) {
                    if (Array.isArray(rowValue)) {
                        rowValue.forEach((/**
                         * @param {?} value
                         * @param {?} rowIndex
                         * @return {?}
                         */
                        function (value, rowIndex) {
                            evaluatedfunction[index][rowIndex] = _this.ts.instant(value);
                        }));
                    }
                    else {
                        evaluatedfunction[index] = _this.ts.instant(rowValue);
                    }
                }));
            }
            return evaluatedfunction;
        }
        catch (e) {
            return evaluatedfunction;
        }
    };
    /**
     * @param {?} context
     * @return {?}
     */
    AjfReportChartWidgetInstance.prototype.initContext = /**
     * @param {?} context
     * @return {?}
     */
    function (context) {
        var _this = this;
        _super.prototype.initContext.call(this, context);
        /** @type {?} */
        var widget = (/** @type {?} */ (this.widget));
        this._chartType = chartToChartJsType(widget.chartType);
        if (widget.labels instanceof Array) {
            widget.labels.map((/**
             * @param {?} l
             * @return {?}
             */
            function (l) {
                _this._labels.concat(_this._translate(l, context));
            }));
        }
        else {
            this._labels = this._translate(widget.labels, context);
        }
        this._datasets = widget.dataset.map(((/**
         * @param {?} d
         * @return {?}
         */
        function (d) {
            /** @type {?} */
            var ds = (/** @type {?} */ (__assign({}, d.options || {}, { data: d.aggregation.evaluate(d.formula, context) })));
            if (d.chartType != null) {
                /** @type {?} */
                var ct = chartToChartJsType(d.chartType);
                ds = __assign({}, ds, { chartType: ct, type: ct });
            }
            if (d.options != null) {
                ds = __assign({}, ds, { options: d.options });
            }
            if (d.label != null) {
                ds = __assign({}, ds, { label: d.label });
            }
            if (d.datalabels != null) {
                ds.datalabels = deepCopy(d.datalabels);
            }
            return ds;
        })));
        this._data = { labels: this._labels, datasets: this._datasets };
    };
    return AjfReportChartWidgetInstance;
}(AjfReportDataWidgetInstance));
var AjfReportMapWidgetInstance = /** @class */ (function (_super) {
    __extends(AjfReportMapWidgetInstance, _super);
    function AjfReportMapWidgetInstance() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param {?} context
     * @return {?}
     */
    AjfReportMapWidgetInstance.prototype.initContext = /**
     * @param {?} context
     * @return {?}
     */
    function (context) {
        _super.prototype.initContext.call(this, context);
        /** @type {?} */
        var widget = (/** @type {?} */ (this.widget));
        this.coordinate = widget.coordinate.evaluate(context);
    };
    return AjfReportMapWidgetInstance;
}(AjfReportDataWidgetInstance));
var AjfReportFormulaWidgetInstance = /** @class */ (function (_super) {
    __extends(AjfReportFormulaWidgetInstance, _super);
    function AjfReportFormulaWidgetInstance() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(AjfReportFormulaWidgetInstance.prototype, "formula", {
        get: /**
         * @return {?}
         */
        function () { return this._formula; },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} context
     * @return {?}
     */
    AjfReportFormulaWidgetInstance.prototype.initContext = /**
     * @param {?} context
     * @return {?}
     */
    function (context) {
        _super.prototype.initContext.call(this, context);
        /** @type {?} */
        var widget = (/** @type {?} */ (this.widget));
        this._formula = widget.formula.evaluate(context);
    };
    return AjfReportFormulaWidgetInstance;
}(AjfReportWidgetInstance));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AjfReportContainerInstance = /** @class */ (function () {
    function AjfReportContainerInstance(container, context, _ts) {
        this._ts = _ts;
        this._styles = {};
        this._container = container;
        this._styles = this._container != null ? this._container.styles : {};
        this._context = context;
        this._populateContent();
    }
    Object.defineProperty(AjfReportContainerInstance.prototype, "container", {
        get: /**
         * @return {?}
         */
        function () { return this._container; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfReportContainerInstance.prototype, "content", {
        get: /**
         * @return {?}
         */
        function () { return this._content; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfReportContainerInstance.prototype, "styles", {
        get: /**
         * @return {?}
         */
        function () { return this._styles; },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     * @return {?}
     */
    AjfReportContainerInstance.prototype._populateContent = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var content = [];
        this._container.content.forEach((/**
         * @param {?} c
         * @return {?}
         */
        function (c) {
            _this._translate(c);
            content.push(AjfReportWidgetInstance.create(c, _this._context, _this._ts));
        }));
        this._content = content;
    };
    /**
     * @private
     * @param {?} reportWidget
     * @return {?}
     */
    AjfReportContainerInstance.prototype._translate = /**
     * @private
     * @param {?} reportWidget
     * @return {?}
     */
    function (reportWidget) {
        var _this = this;
        if (reportWidget.hasContent) {
            reportWidget.content.forEach((/**
             * @param {?} subReportWidget
             * @return {?}
             */
            function (subReportWidget) {
                _this._translate(subReportWidget);
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
            function (element) {
                element.label = element.label ? _this._ts.instant(element.label) : '';
            }));
        }
        if (reportWidget instanceof AjfReportTableWidget && reportWidget.dataset) {
            reportWidget.dataset.forEach((/**
             * @param {?} row
             * @return {?}
             */
            function (row) {
                row.forEach((/**
                 * @param {?} element
                 * @return {?}
                 */
                function (element) {
                    if (element.formula && element.formula.formula) {
                        try {
                            /** @type {?} */
                            var formulaToBeTranslate = element.formula.formula;
                            if (formulaToBeTranslate[0] === '"') {
                                formulaToBeTranslate = formulaToBeTranslate.slice(1, -1);
                                element.formula.formula = formulaToBeTranslate.length > 0
                                    ? "\"" + _this._ts.instant(formulaToBeTranslate) + "\"" : element.formula.formula;
                            }
                            else {
                                element.formula.formula = _this._ts.instant(formulaToBeTranslate);
                            }
                        }
                        catch (e) { }
                    }
                }));
            }));
        }
    };
    return AjfReportContainerInstance;
}());
/**
 * A report instance. Report + data
 */
var  /**
 * A report instance. Report + data
 */
AjfReportInstance = /** @class */ (function () {
    function AjfReportInstance(report, context, _ts) {
        this._ts = _ts;
        this._report = report;
        this._context = context;
        this._populateReport();
    }
    Object.defineProperty(AjfReportInstance.prototype, "report", {
        get: /**
         * @return {?}
         */
        function () { return this._report; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfReportInstance.prototype, "header", {
        get: /**
         * @return {?}
         */
        function () { return this._header; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfReportInstance.prototype, "content", {
        get: /**
         * @return {?}
         */
        function () { return this._content; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfReportInstance.prototype, "footer", {
        get: /**
         * @return {?}
         */
        function () { return this._footer; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfReportInstance.prototype, "data", {
        get: /**
         * @return {?}
         */
        function () { return this._data; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfReportInstance.prototype, "styles", {
        get: /**
         * @return {?}
         */
        function () {
            return this._report != null ? this._report.styles : {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfReportInstance.prototype, "context", {
        get: /**
         * @return {?}
         */
        function () { return this._context; },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     * @return {?}
     */
    AjfReportInstance.prototype._populateReport = /**
     * @private
     * @return {?}
     */
    function () {
        this._header = this._populateContainer(this._report.header);
        this._content = this._populateContainer(this._report.content);
        this._footer = this._populateContainer(this._report.footer);
    };
    /**
     * @private
     * @param {?} container
     * @return {?}
     */
    AjfReportInstance.prototype._populateContainer = /**
     * @private
     * @param {?} container
     * @return {?}
     */
    function (container) {
        return new AjfReportContainerInstance(container, this._context, this._ts);
    };
    return AjfReportInstance;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AjfReportContainer = /** @class */ (function (_super) {
    __extends(AjfReportContainer, _super);
    function AjfReportContainer(obj) {
        var _this = _super.call(this, obj) || this;
        _this.jsonExportedMembers = _this.jsonExportedMembers.concat(['content', 'styles']);
        _this._content = obj && obj.content || [];
        _this._styles = obj && obj.styles || {};
        return _this;
    }
    Object.defineProperty(AjfReportContainer.prototype, "content", {
        get: /**
         * @return {?}
         */
        function () { return this._content; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfReportContainer.prototype, "styles", {
        get: /**
         * @return {?}
         */
        function () { return this._styles; },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} obj
     * @return {?}
     */
    AjfReportContainer.fromJson = /**
     * @param {?} obj
     * @return {?}
     */
    function (obj) {
        obj = deepCopy(obj);
        /** @type {?} */
        var keys = Object.keys(obj);
        if (keys.indexOf('content') > -1 && obj['content'] instanceof Array) {
            obj['content'] = obj['content'].map((/**
             * @param {?} cw
             * @return {?}
             */
            function (cw) { return AjfReportWidget.fromJson(cw); }));
        }
        return new AjfReportContainer(obj);
    };
    return AjfReportContainer;
}(AjfJsonSerializable));
/**
 * Class that represents a report.
 * A report is defined as three trees of report widgets (\@see AjfReportWidget),
 * displayed each in the header / content / footer of the report.
 *
 */
var  /**
 * Class that represents a report.
 * A report is defined as three trees of report widgets (\@see AjfReportWidget),
 * displayed each in the header / content / footer of the report.
 *
 */
AjfReport = /** @class */ (function (_super) {
    __extends(AjfReport, _super);
    /**
     * Creates a report.
     * @param form : AjfForm The form that defines the data structure
     * @param obj : any Report initial data
     */
    function AjfReport(forms, obj) {
        var _this = _super.call(this, obj) || this;
        _this._forms = forms.slice(0);
        _this.jsonExportedMembers = _this.jsonExportedMembers
            .concat(['header', 'footer', 'content', 'styles']);
        _this._header = obj && obj.header || null;
        _this._footer = obj && obj.footer || null;
        _this._content = obj && obj.content || null;
        _this._styles = obj && obj.styles || null;
        return _this;
    }
    Object.defineProperty(AjfReport.prototype, "header", {
        get: /**
         * @return {?}
         */
        function () { return this._header; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfReport.prototype, "footer", {
        get: /**
         * @return {?}
         */
        function () { return this._footer; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfReport.prototype, "content", {
        get: /**
         * @return {?}
         */
        function () { return this._content; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfReport.prototype, "styles", {
        get: /**
         * @return {?}
         */
        function () { return this._styles; },
        set: /**
         * @param {?} styles
         * @return {?}
         */
        function (styles) {
            this._styles = styles;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfReport.prototype, "forms", {
        get: /**
         * @return {?}
         */
        function () { return this._forms; },
        set: /**
         * @param {?} forms
         * @return {?}
         */
        function (forms) {
            this._forms = forms;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Creates a report starting from a JSON representation.
     * The form definition can be nested in the report JSON.
     * @param obj : any The JSON representation of the report
     * @param form : AjfForm The form that defines the data structure
     * @return AjfReport The report
     */
    /**
     * Creates a report starting from a JSON representation.
     * The form definition can be nested in the report JSON.
     * @param {?} obj : any The JSON representation of the report
     * @param {?=} forms
     * @return {?} AjfReport The report
     */
    AjfReport.fromJson = /**
     * Creates a report starting from a JSON representation.
     * The form definition can be nested in the report JSON.
     * @param {?} obj : any The JSON representation of the report
     * @param {?=} forms
     * @return {?} AjfReport The report
     */
    function (obj, forms) {
        obj = deepCopy(obj);
        /** @type {?} */
        var keys = Object.keys(obj);
        /** @type {?} */
        var containers = ['header', 'footer', 'content'];
        containers.forEach((/**
         * @param {?} c
         * @return {?}
         */
        function (c) {
            if (keys.indexOf(c) > -1) {
                obj[c] = AjfReportContainer.fromJson(obj[c]);
            }
        }));
        return new AjfReport(forms || [], obj);
    };
    return AjfReport;
}(AjfJsonSerializable));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
var  /**
 * @abstract
 */
AjfReportWidgetRenderer = /** @class */ (function () {
    function AjfReportWidgetRenderer(_cdr) {
        this._cdr = _cdr;
        this.widgetTypes = AjfReportWidgetType;
        this._imageTypes = AjfImageType;
    }
    Object.defineProperty(AjfReportWidgetRenderer.prototype, "widget", {
        get: /**
         * @return {?}
         */
        function () { return this._widget; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfReportWidgetRenderer.prototype, "imageTypes", {
        get: /**
         * @return {?}
         */
        function () { return this._imageTypes; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfReportWidgetRenderer.prototype, "widgetInstance", {
        get: /**
         * @return {?}
         */
        function () { return this._widgetInstance; },
        set: /**
         * @param {?} widgetInstance
         * @return {?}
         */
        function (widgetInstance) {
            if (this._widgetInstance !== widgetInstance) {
                this._widgetInstance = widgetInstance;
                this._widget = this._widgetInstance != null ? this._widgetInstance.widget : null;
                this._cdr.markForCheck();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfReportWidgetRenderer.prototype, "imgwInst", {
        get: /**
         * @return {?}
         */
        function () {
            return (/** @type {?} */ (this._widgetInstance));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfReportWidgetRenderer.prototype, "imgw", {
        get: /**
         * @return {?}
         */
        function () {
            return (/** @type {?} */ (this._widget));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfReportWidgetRenderer.prototype, "imgcwInst", {
        get: /**
         * @return {?}
         */
        function () {
            return (/** @type {?} */ (this._widgetInstance));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfReportWidgetRenderer.prototype, "imgcw", {
        get: /**
         * @return {?}
         */
        function () {
            return (/** @type {?} */ (this._widget));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfReportWidgetRenderer.prototype, "layoutwInst", {
        get: /**
         * @return {?}
         */
        function () {
            return (/** @type {?} */ (this._widgetInstance));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfReportWidgetRenderer.prototype, "layoutw", {
        get: /**
         * @return {?}
         */
        function () {
            return (/** @type {?} */ (this._widget));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfReportWidgetRenderer.prototype, "chartwInst", {
        get: /**
         * @return {?}
         */
        function () {
            return (/** @type {?} */ (this._widgetInstance));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfReportWidgetRenderer.prototype, "chartw", {
        get: /**
         * @return {?}
         */
        function () {
            return (/** @type {?} */ (this._widget));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfReportWidgetRenderer.prototype, "tablewInst", {
        get: /**
         * @return {?}
         */
        function () {
            return (/** @type {?} */ (this._widgetInstance));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfReportWidgetRenderer.prototype, "textwInst", {
        get: /**
         * @return {?}
         */
        function () {
            return (/** @type {?} */ (this._widgetInstance));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfReportWidgetRenderer.prototype, "mapwInst", {
        get: /**
         * @return {?}
         */
        function () {
            return (/** @type {?} */ (this._widgetInstance));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfReportWidgetRenderer.prototype, "mapw", {
        get: /**
         * @return {?}
         */
        function () {
            return (/** @type {?} */ (this._widget));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfReportWidgetRenderer.prototype, "formulawInst", {
        get: /**
         * @return {?}
         */
        function () {
            return (/** @type {?} */ (this._widgetInstance));
        },
        enumerable: true,
        configurable: true
    });
    return AjfReportWidgetRenderer;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { AjfAggregationType, AjfAggregation, chartToChartJsType, AjfChartType, AjfDataset, AjfTableDataset, AjfChartDataset, AjfReportRenderer, AjfReportContainerInstance, AjfReportInstance, AjfReportContainer, AjfReport, AjfReportWidgetRenderer, AjfReportWidgetInstance, AjfReportDataWidgetInstance, AjfReportLayoutWidgetInstance, AjfReportColumnWidgetInstance, AjfReportPageBreakWidgetInstance, AjfReportImageWidgetInstance, AjfReportImageContainerWidgetInstance, AjfReportTextWidgetInstance, AjfReportTableWidgetInstance, AjfReportChartWidgetInstance, AjfReportMapWidgetInstance, AjfReportFormulaWidgetInstance, AjfReportWidgetType, AjfReportDataType, AjfReportWidget, AjfReportLayoutWidget, AjfReportColumnWidget, AjfReportPageBreakWidget, AjfReportImageWidget, AjfReportImageContainerWidget, AjfReportTextWidget, AjfReportFormulaWidget, AjfReportDataWidget, AjfReportChartWidget, AjfReportTableWidget, AjfReportMapWidget };
//# sourceMappingURL=reports.es5.js.map
