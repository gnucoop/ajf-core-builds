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
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@ajf/core/models'), require('@ajf/core/utils')) :
    typeof define === 'function' && define.amd ? define('@ajf/core/reports', ['exports', '@angular/core', '@ajf/core/models', '@ajf/core/utils'], factory) :
    (global = global || self, factory((global.ajf = global.ajf || {}, global.ajf.core = global.ajf.core || {}, global.ajf.core.reports = {}), global.ng.core, global.ajf.core.models, global.ajf.core.utils));
}(this, function (exports, core, models, utils) { 'use strict';

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

    /**
     * @abstract
     * @template T
     */
    var   /**
     * @abstract
     * @template T
     */
    AjfBaseWidgetComponent = /** @class */ (function () {
        function AjfBaseWidgetComponent(_cdr, el) {
            this._cdr = _cdr;
            this.el = el;
        }
        Object.defineProperty(AjfBaseWidgetComponent.prototype, "instance", {
            get: /**
             * @return {?}
             */
            function () { return this._instance; },
            set: /**
             * @param {?} instance
             * @return {?}
             */
            function (instance) {
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
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /** @enum {number} */
    var AjfWidgetType = {
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
    var   /**
     * @abstract
     */
    AjfReportRenderer = /** @class */ (function () {
        function AjfReportRenderer(_cdr) {
            this._cdr = _cdr;
        }
        Object.defineProperty(AjfReportRenderer.prototype, "instance", {
            get: /**
             * @return {?}
             */
            function () { return this._instance; },
            set: /**
             * @param {?} instance
             * @return {?}
             */
            function (instance) {
                this._instance = instance;
                this._report = instance != null ? instance.report : null;
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
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var AjfGetColumnContentPipe = /** @class */ (function () {
        function AjfGetColumnContentPipe() {
        }
        /**
         * @param {?} instance
         * @param {?} column
         * @return {?}
         */
        AjfGetColumnContentPipe.prototype.transform = /**
         * @param {?} instance
         * @param {?} column
         * @return {?}
         */
        function (instance, column) {
            return column >= 0 && column < instance.content.length ? instance.content[column] : null;
        };
        AjfGetColumnContentPipe.decorators = [
            { type: core.Pipe, args: [{ name: 'ajfGetColumnContent' },] },
        ];
        return AjfGetColumnContentPipe;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var AjfWidgetHost = /** @class */ (function () {
        function AjfWidgetHost(viewContainerRef) {
            this.viewContainerRef = viewContainerRef;
        }
        AjfWidgetHost.decorators = [
            { type: core.Directive, args: [{ selector: '[ajf-widget-host]' },] },
        ];
        /** @nocollapse */
        AjfWidgetHost.ctorParameters = function () { return [
            { type: core.ViewContainerRef }
        ]; };
        return AjfWidgetHost;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var AjfReportsModule = /** @class */ (function () {
        function AjfReportsModule() {
        }
        AjfReportsModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [
                            AjfGetColumnContentPipe,
                            AjfWidgetHost,
                        ],
                        exports: [
                            AjfGetColumnContentPipe,
                            AjfWidgetHost,
                        ],
                    },] },
        ];
        return AjfReportsModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} aggregation
     * @return {?}
     */
    function createAggregation(aggregation) {
        return __assign({}, aggregation, { aggregation: aggregation.aggregation || AjfAggregationType.None });
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var AjfAggregationSerializer = /** @class */ (function () {
        function AjfAggregationSerializer() {
        }
        /**
         * @param {?} json
         * @return {?}
         */
        AjfAggregationSerializer.fromJson = /**
         * @param {?} json
         * @return {?}
         */
        function (json) {
            if (json.aggregation == null) {
                throw new Error('Malformed aggregation');
            }
            return createAggregation(__assign({}, json, { aggregation: json.aggregation }));
        };
        return AjfAggregationSerializer;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} dataset
     * @return {?}
     */
    function createDataset(dataset) {
        return __assign({}, dataset, { aggregation: dataset.aggregation || createAggregation({ aggregation: AjfAggregationType.None }) });
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var AjfDatasetSerializer = /** @class */ (function () {
        function AjfDatasetSerializer() {
        }
        /**
         * @param {?} json
         * @return {?}
         */
        AjfDatasetSerializer.fromJson = /**
         * @param {?} json
         * @return {?}
         */
        function (json) {
            if (json.formula == null || json.aggregation == null || json.label == null) {
                throw new Error('Malformed dataset');
            }
            json.formula = json.formula instanceof Array ?
                json.formula = json.formula.map((/**
                 * @param {?} f
                 * @return {?}
                 */
                function (f) { return models.AjfFormulaSerializer.fromJson(f); })) :
                models.AjfFormulaSerializer.fromJson(json.formula);
            json.aggregation = AjfAggregationSerializer.fromJson(json.aggregation);
            return createDataset(json);
        };
        return AjfDatasetSerializer;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} widget
     * @return {?}
     */
    function createWidget(widget) {
        return __assign({}, widget, { styles: widget.styles || {}, visibility: widget.visibility || models.alwaysCondition() });
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var AjfWidgetSerializer = /** @class */ (function () {
        function AjfWidgetSerializer() {
        }
        /**
         * @param {?} json
         * @return {?}
         */
        AjfWidgetSerializer.fromJson = /**
         * @param {?} json
         * @return {?}
         */
        function (json) {
            if (json.widgetType == null) {
                throw new Error('Malformed widget');
            }
            json.visibility =
                json.visibility ? models.AjfConditionSerializer.fromJson(json.visibility) : models.alwaysCondition();
            json.styles = json.styles || {};
            /** @type {?} */
            var obj = (/** @type {?} */ (json));
            if (obj.widgetType === AjfWidgetType.Layout || obj.widgetType === AjfWidgetType.Column) {
                return AjfWidgetSerializer._widgetWithContentFromJson(obj);
            }
            if (obj.widgetType === AjfWidgetType.Chart || obj.widgetType === AjfWidgetType.Table) {
                /** @type {?} */
                var w = AjfWidgetSerializer._dataWidgetFromJson(obj);
                if (obj.widgetType === AjfWidgetType.Chart) {
                    /** @type {?} */
                    var cw = (/** @type {?} */ (w));
                    if (cw.labels instanceof Array) {
                        cw.labels.map((/**
                         * @param {?} l
                         * @return {?}
                         */
                        function (l) { return models.AjfFormulaSerializer.fromJson(l); }));
                    }
                    else if (cw.labels != null) {
                        cw.labels = models.AjfFormulaSerializer.fromJson(cw.labels);
                    }
                }
                return w;
            }
            if (obj.widgetType === AjfWidgetType.Map) {
                /** @type {?} */
                var mw = (/** @type {?} */ (obj));
                mw.coordinate = models.AjfFormulaSerializer.fromJson(mw.coordinate);
            }
            return obj;
        };
        /**
         * @private
         * @param {?} json
         * @return {?}
         */
        AjfWidgetSerializer._dataWidgetFromJson = /**
         * @private
         * @param {?} json
         * @return {?}
         */
        function (json) {
            /** @type {?} */
            var dataset = json.dataset ?
                (json.widgetType === AjfWidgetType.Table ?
                    ((/** @type {?} */ (json.dataset)))
                        .map((/**
                     * @param {?} row
                     * @return {?}
                     */
                    function (row) { return row.map((/**
                     * @param {?} cell
                     * @return {?}
                     */
                    function (cell) { return AjfDatasetSerializer.fromJson(cell); })); })) :
                    ((/** @type {?} */ (json.dataset))).map((/**
                     * @param {?} d
                     * @return {?}
                     */
                    function (d) { return AjfDatasetSerializer.fromJson(d); }))) :
                [];
            return __assign({}, createWidget(json), { dataset: dataset });
        };
        /**
         * @private
         * @param {?} json
         * @return {?}
         */
        AjfWidgetSerializer._widgetWithContentFromJson = /**
         * @private
         * @param {?} json
         * @return {?}
         */
        function (json) {
            /** @type {?} */
            var content = (json.content || []).map((/**
             * @param {?} c
             * @return {?}
             */
            function (c) { return AjfWidgetSerializer.fromJson(c); }));
            return __assign({}, createWidget(json), { content: content });
        };
        return AjfWidgetSerializer;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var AjfReportContainerSerializer = /** @class */ (function () {
        function AjfReportContainerSerializer() {
        }
        /**
         * @param {?} json
         * @return {?}
         */
        AjfReportContainerSerializer.fromJson = /**
         * @param {?} json
         * @return {?}
         */
        function (json) {
            json.content = (json.content || []).map((/**
             * @param {?} c
             * @return {?}
             */
            function (c) { return AjfWidgetSerializer.fromJson(c); }));
            return __assign({}, json, { content: (/** @type {?} */ (json.content)), styles: json.styles || {} });
        };
        return AjfReportContainerSerializer;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @param {?} report
     * @return {?}
     */
    function createReport(report) {
        return __assign({}, report);
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var AjfReportSerializer = /** @class */ (function () {
        function AjfReportSerializer() {
        }
        /**
         * @param {?} json
         * @return {?}
         */
        AjfReportSerializer.fromJson = /**
         * @param {?} json
         * @return {?}
         */
        function (json) {
            /** @type {?} */
            var containers = ['header', 'footer', 'content'];
            containers.forEach((/**
             * @param {?} c
             * @return {?}
             */
            function (c) {
                if (json[c]) {
                    ((/** @type {?} */ (json[c]))) =
                        AjfReportContainerSerializer.fromJson((/** @type {?} */ (json[c])));
                }
            }));
            return createReport(json);
        };
        return AjfReportSerializer;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @abstract
     */
    var   /**
     * @abstract
     */
    AjfReportWidget = /** @class */ (function () {
        function AjfReportWidget(_cfr, _renderer) {
            this._cfr = _cfr;
            this._renderer = _renderer;
        }
        Object.defineProperty(AjfReportWidget.prototype, "instance", {
            get: /**
             * @return {?}
             */
            function () { return this._instance; },
            set: /**
             * @param {?} instance
             * @return {?}
             */
            function (instance) {
                if (this._instance !== instance) {
                    this._instance = instance;
                    this._loadComponent();
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        AjfReportWidget.prototype.ngAfterViewInit = /**
         * @return {?}
         */
        function () {
            this._loadComponent();
        };
        /**
         * @private
         * @return {?}
         */
        AjfReportWidget.prototype._loadComponent = /**
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            if (this._instance == null || this.widgetHost == null) {
                return;
            }
            /** @type {?} */
            var vcr = this.widgetHost.viewContainerRef;
            vcr.clear();
            /** @type {?} */
            var componentDef = this.widgetsMap[this._instance.widget.widgetType];
            if (componentDef == null) {
                return;
            }
            /** @type {?} */
            var component = componentDef.component;
            try {
                /** @type {?} */
                var componentFactory = this._cfr.resolveComponentFactory(component);
                /** @type {?} */
                var componentRef = vcr.createComponent(componentFactory);
                /** @type {?} */
                var componentInstance_1 = componentRef.instance;
                Object.keys(this._instance.widget.styles).forEach((/**
                 * @param {?} style
                 * @return {?}
                 */
                function (style) {
                    try {
                        _this._renderer.setStyle(componentInstance_1.el.nativeElement, style, "" + _this._instance.widget.styles[style]);
                    }
                    catch (e) { }
                }));
                componentInstance_1.instance = this._instance;
                if (componentDef.inputs) {
                    Object.keys(componentDef.inputs).forEach((/**
                     * @param {?} key
                     * @return {?}
                     */
                    function (key) {
                        if (key in componentInstance_1) {
                            ((/** @type {?} */ (componentInstance_1)))[key] = (/** @type {?} */ (componentDef.inputs))[key];
                        }
                    }));
                }
            }
            catch (e) { }
        };
        return AjfReportWidget;
    }());

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
        var data = formulas.map((/**
         * @param {?} f
         * @return {?}
         */
        function (f) { return models.evaluateExpression(f.formula, context); }));
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
            widget: widget,
            widgetType: widget.widgetType,
            visible: models.evaluateExpression(widget.visibility.condition, context),
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
        var wi = createWidgetInstance(widget, context);
        if (widget.widgetType === AjfWidgetType.Column || widget.widgetType === AjfWidgetType.Layout) {
            /** @type {?} */
            var wwc = (/** @type {?} */ (widget));
            /** @type {?} */
            var wwci = (/** @type {?} */ (wi));
            wwci.content = wwc.content.map((/**
             * @param {?} c
             * @return {?}
             */
            function (c) { return widgetToWidgetInstance(c, context, ts); }));
        }
        else if (widget.widgetType === AjfWidgetType.Chart) {
            /** @type {?} */
            var cw = (/** @type {?} */ (widget));
            /** @type {?} */
            var cwi = (/** @type {?} */ (wi));
            /** @type {?} */
            var labels = cw.labels instanceof Array ? cw.labels : [cw.labels];
            /** @type {?} */
            var evLabels = labels.map((/**
             * @param {?} l
             * @return {?}
             */
            function (l) {
                /** @type {?} */
                var evf = models.evaluateExpression(l.formula, context);
                try {
                    if (evf instanceof Array) {
                        evf = evf.map((/**
                         * @param {?} v
                         * @return {?}
                         */
                        function (v) { return ts.instant(v); }));
                    }
                    else {
                        evf = ts.instant(evf);
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
            function (d) {
                /** @type {?} */
                var ds = __assign({}, d.options || {}, { data: evaluateAggregation(d.aggregation, d.formula, context) });
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
                    ds.datalabels = utils.deepCopy(d.datalabels);
                }
                return ds;
            }));
            cwi.data = { labels: cwi.labels, datasets: cwi.datasets };
            cwi.chartType = chartToChartJsType(cw.type || cw.chartType);
        }
        else if (widget.widgetType === AjfWidgetType.Table) {
            /** @type {?} */
            var tw_1 = (/** @type {?} */ (widget));
            /** @type {?} */
            var twi = (/** @type {?} */ (wi));
            /** @type {?} */
            var trFormula_1 = (/**
             * @param {?} f
             * @return {?}
             */
            function (f) {
                /** @type {?} */
                var formula = f.formula;
                if (formula.substr(0, 1) === '"') {
                    /** @type {?} */
                    var ft = formula.slice(1, -1);
                    if (ft.length > 0) {
                        formula = "\"" + ts.instant(ft) + "\"";
                    }
                }
                else {
                    formula = ts.instant(formula);
                }
                return models.evaluateExpression(formula, context);
            });
            twi.dataset = tw_1.dataset.map((/**
             * @param {?} row
             * @return {?}
             */
            function (row) { return row.map((/**
             * @param {?} cell
             * @return {?}
             */
            function (cell) {
                return cell.formula instanceof Array ? cell.formula.map((/**
                 * @param {?} f
                 * @return {?}
                 */
                function (f) { return trFormula_1((/** @type {?} */ (f))); })) :
                    trFormula_1((/** @type {?} */ (cell.formula)));
            })); }));
            twi.data = (tw_1.dataset ||
                []).map((/**
             * @param {?} row
             * @return {?}
             */
            function (row) { return row.map((/**
             * @param {?} cell
             * @return {?}
             */
            function (cell) { return ({
                value: models.evaluateExpression(cell.formula.formula, context),
                style: __assign({}, tw_1.cellStyles, cell.style),
                rowspan: cell.rowspan,
                colspan: cell.colspan,
            }); })); }));
        }
        else if (widget.widgetType === AjfWidgetType.Image) {
            /** @type {?} */
            var iw = (/** @type {?} */ (widget));
            /** @type {?} */
            var iwi = (/** @type {?} */ (wi));
            if (iw.flag) {
                iwi.flag = models.evaluateExpression(iw.flag.formula, context);
            }
            if (iw.icon) {
                iwi.icon = models.evaluateExpression(iw.icon.formula, context);
            }
            if (iw.url) {
                iwi.url = models.evaluateExpression(iw.url.formula, context);
            }
        }
        else if (widget.widgetType === AjfWidgetType.ImageContainer) {
            /** @type {?} */
            var icw = (/** @type {?} */ (widget));
            /** @type {?} */
            var icwi = (/** @type {?} */ (wi));
            if (icw.flags) {
                /** @type {?} */
                var flags = icw.flags instanceof Array ? icw.flags : [icw.flags];
                icwi.flags = flags.map((/**
                 * @param {?} f
                 * @return {?}
                 */
                function (f) { return models.evaluateExpression(f.formula, context); }));
            }
            if (icw.icons) {
                /** @type {?} */
                var icons = icw.icons instanceof Array ? icw.icons : [icw.icons];
                icwi.icons = icons.map((/**
                 * @param {?} f
                 * @return {?}
                 */
                function (f) { return models.evaluateExpression(f.formula, context); }));
            }
            if (icw.urls) {
                /** @type {?} */
                var urls = icw.urls instanceof Array ? icw.urls : [icw.urls];
                icwi.urls = urls.map((/**
                 * @param {?} f
                 * @return {?}
                 */
                function (f) { return models.evaluateExpression(f.formula, context); }));
            }
        }
        else if (widget.widgetType === AjfWidgetType.Text) {
            /** @type {?} */
            var tew = (/** @type {?} */ (widget));
            /** @type {?} */
            var tewi = (/** @type {?} */ (wi));
            /** @type {?} */
            var formulaRegEx = /\[\[(.+?)\]\]/g;
            /** @type {?} */
            var matches = [];
            /** @type {?} */
            var match = void 0;
            /** @type {?} */
            var htmlText_1 = tew.htmlText;
            while (match = formulaRegEx.exec(htmlText_1)) {
                /** @type {?} */
                var idx = match.index;
                /** @type {?} */
                var len = match[0].length;
                /** @type {?} */
                var formula = models.createFormula({ formula: match[1] });
                matches.push({ idx: idx, len: len, formula: formula });
                matches.reverse().forEach((/**
                 * @param {?} m
                 * @return {?}
                 */
                function (m) {
                    /** @type {?} */
                    var calcValue;
                    try {
                        calcValue = models.evaluateExpression(m.formula.formula, context);
                    }
                    catch (e) {
                        calcValue = '';
                    }
                    htmlText_1 = "" + htmlText_1.substr(0, m.idx) + calcValue + htmlText_1.substr(m.idx + m.len);
                }));
            }
            tewi.htmlText = htmlText_1 != null && htmlText_1.length > 0 ? ts.instant(htmlText_1) : htmlText_1;
        }
        else if (widget.widgetType === AjfWidgetType.Formula) {
            /** @type {?} */
            var fw = (/** @type {?} */ (widget));
            /** @type {?} */
            var fwi = (/** @type {?} */ (wi));
            fwi.formula = models.evaluateExpression(fw.formula.formula, context);
        }
        else if (widget.widgetType === AjfWidgetType.Map) {
            /** @type {?} */
            var mw = (/** @type {?} */ (widget));
            /** @type {?} */
            var mwi = (/** @type {?} */ (wi));
            mwi.coordinate = models.evaluateExpression(mw.coordinate.formula, context);
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
        var content = container.content.map((/**
         * @param {?} c
         * @return {?}
         */
        function (c) { return widgetToWidgetInstance(c, context, ts); }));
        return {
            container: container,
            content: content,
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
            report: report,
            header: report.header ? createReportContainerInstance(report.header, context, ts) : undefined,
            content: report.content ? createReportContainerInstance(report.content, context, ts) :
                undefined,
            footer: report.footer ? createReportContainerInstance(report.footer, context, ts) : undefined,
            styles: report.styles || {},
        };
    }

    exports.AjfAggregationSerializer = AjfAggregationSerializer;
    exports.AjfAggregationType = AjfAggregationType;
    exports.AjfBaseWidgetComponent = AjfBaseWidgetComponent;
    exports.AjfChartType = AjfChartType;
    exports.AjfDatasetSerializer = AjfDatasetSerializer;
    exports.AjfReportContainerSerializer = AjfReportContainerSerializer;
    exports.AjfReportRenderer = AjfReportRenderer;
    exports.AjfReportSerializer = AjfReportSerializer;
    exports.AjfReportWidget = AjfReportWidget;
    exports.AjfReportsModule = AjfReportsModule;
    exports.AjfWidgetHost = AjfWidgetHost;
    exports.AjfWidgetSerializer = AjfWidgetSerializer;
    exports.AjfWidgetType = AjfWidgetType;
    exports.chartToChartJsType = chartToChartJsType;
    exports.createAggregation = createAggregation;
    exports.createReportInstance = createReportInstance;
    exports.createWidget = createWidget;
    exports.createWidgetInstance = createWidgetInstance;
    exports.widgetToWidgetInstance = widgetToWidgetInstance;
    exports.ɵa = AjfGetColumnContentPipe;
    exports.ɵb = createReportContainerInstance;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=core-reports.umd.js.map
