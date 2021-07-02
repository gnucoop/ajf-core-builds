(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@ajf/core/common'), require('@angular/common'), require('date-fns'), require('xlsx'), require('@ajf/core/models'), require('@ajf/core/utils'), require('@ajf/core/image'), require('@ajf/core/vfs-fonts'), require('pdfmake/build/pdfmake')) :
    typeof define === 'function' && define.amd ? define('@ajf/core/reports', ['exports', '@angular/core', '@ajf/core/common', '@angular/common', 'date-fns', 'xlsx', '@ajf/core/models', '@ajf/core/utils', '@ajf/core/image', '@ajf/core/vfs-fonts', 'pdfmake/build/pdfmake'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.ajf = global.ajf || {}, global.ajf.core = global.ajf.core || {}, global.ajf.core.reports = {}), global.ng.core, global.ajf.core.common, global.ng.common, global.dateFns, global.xlsx, global.ajf.core.models, global.ajf.core.utils, global.ajf.core.image, global.ajf.core.vfsFonts, global.pdfmake.build.pdfmake));
}(this, (function (exports, core, common, common$1, dateFns, XLSX, models, utils, image, vfsFonts, pdfmake) { 'use strict';

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () {
                            return e[k];
                        }
                    });
                }
            });
        }
        n['default'] = e;
        return Object.freeze(n);
    }

    var XLSX__namespace = /*#__PURE__*/_interopNamespace(XLSX);

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
            get: function () {
                return this._instance;
            },
            set: function (instance) {
                if (this._instance !== instance) {
                    this._instance = instance;
                    this._cdr.detectChanges();
                }
            },
            enumerable: false,
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
    // tslint:disable-next-line:prefer-const-enum
    exports.AjfChartType = void 0;
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
    })(exports.AjfChartType || (exports.AjfChartType = {}));

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
            case exports.AjfChartType.Line:
                return 'line';
            case exports.AjfChartType.Bar:
                return 'bar';
            case exports.AjfChartType.HorizontalBar:
                return 'horizontalBar';
            case exports.AjfChartType.Radar:
                return 'radar';
            case exports.AjfChartType.Scatter:
                return 'scatter';
            case exports.AjfChartType.Doughnut:
                return 'doughnut';
            case exports.AjfChartType.Pie:
                return 'pie';
            case exports.AjfChartType.PolarArea:
                return 'polarArea';
            case exports.AjfChartType.Bubble:
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
        return AjfGetColumnContentPipe;
    }());
    AjfGetColumnContentPipe.decorators = [
        { type: core.Pipe, args: [{ name: 'ajfGetColumnContent' },] }
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
    // tslint:disable-next-line:prefer-const-enum
    exports.AjfAggregationType = void 0;
    (function (AjfAggregationType) {
        AjfAggregationType[AjfAggregationType["None"] = 0] = "None";
        AjfAggregationType[AjfAggregationType["Sum"] = 1] = "Sum";
        AjfAggregationType[AjfAggregationType["Average"] = 2] = "Average";
        AjfAggregationType[AjfAggregationType["WeightedAverage"] = 3] = "WeightedAverage";
        AjfAggregationType[AjfAggregationType["LENGTH"] = 4] = "LENGTH";
    })(exports.AjfAggregationType || (exports.AjfAggregationType = {}));

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
    // tslint:disable-next-line:prefer-const-enum
    exports.AjfWidgetType = void 0;
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
    })(exports.AjfWidgetType || (exports.AjfWidgetType = {}));

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
            get: function () {
                return this._instance;
            },
            set: function (instance) {
                this._instance = instance;
                this._report = instance != null ? instance.report : null;
                this._cdr.markForCheck();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AjfReportRenderer.prototype, "report", {
            get: function () {
                return this._report;
            },
            enumerable: false,
            configurable: true
        });
        return AjfReportRenderer;
    }());
    AjfReportRenderer.decorators = [
        { type: core.Directive }
    ];
    AjfReportRenderer.ctorParameters = function () { return [
        { type: core.ChangeDetectorRef }
    ]; };
    AjfReportRenderer.propDecorators = {
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
    var buildReportStringIdentifier = function (report, context, opts) {
        if (report == null) {
            return '';
        }
        var stringIdentifier = report.stringIdentifier || [];
        if (stringIdentifier.length === 0) {
            return '';
        }
        return common.buildStringIdentifier(stringIdentifier, context, opts);
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
    var AjfReportStringIdentifierPipe = /** @class */ (function () {
        function AjfReportStringIdentifierPipe() {
        }
        AjfReportStringIdentifierPipe.prototype.transform = function (report, context, opts) {
            return buildReportStringIdentifier(report, context, opts);
        };
        return AjfReportStringIdentifierPipe;
    }());
    AjfReportStringIdentifierPipe.decorators = [
        { type: core.Pipe, args: [{ name: 'ajfReportStringIdentifier' },] }
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
    var xlsxMod = (XLSX__namespace.default || XLSX__namespace);
    var AjfWidgetExport = /** @class */ (function () {
        function AjfWidgetExport() {
            this.overlay = true;
            this.enable = false;
        }
        /**
         * Export widget data in CSV format
         * @deprecated Use `AjfWidgetExport.export` with 'csv' parameter.
         * @breaking-change 13.0.0
         */
        AjfWidgetExport.prototype.exportCsv = function () {
            this.export('csv');
        };
        /**
         * Export widget data in Xlsx format
         * @deprecated Use `AjfWidgetExport.export` with 'xlsx' parameter.
         * @breaking-change 13.0.0
         */
        AjfWidgetExport.prototype.exportXlsx = function () {
            this.export('xlsx');
        };
        /**
         * Export widget data in CSV or Xlsx format
         */
        AjfWidgetExport.prototype.export = function (bookType) {
            var sheetName = this._buildTitle(this.widgetType);
            var sheets = {};
            sheets[sheetName] = xlsxMod.utils.aoa_to_sheet(this._buildXlsxData());
            var workBook = { Sheets: sheets, SheetNames: [sheetName] };
            xlsxMod.writeFile(workBook, sheetName + "." + bookType, {
                bookType: bookType,
                type: 'array',
            });
        };
        AjfWidgetExport.prototype._buildXlsxData = function () {
            var xlsxData = [];
            var labels = [];
            switch (this.widgetType) {
                default:
                case exports.AjfWidgetType.Chart:
                    this.data = this.data;
                    var datasets = this.data.datasets || [];
                    labels = ['name'].concat(this.data.labels);
                    xlsxData.push(labels);
                    for (var i = 0; i < datasets.length; i++) {
                        var row = [];
                        var data = datasets[i].data || [];
                        row.push(datasets[i].label);
                        for (var j = 0; j < data.length; j++) {
                            row.push(data[j]);
                        }
                        xlsxData.push(row);
                    }
                    break;
                case exports.AjfWidgetType.Table:
                    this.data = this.data;
                    this.data.forEach(function (row, idxRow) {
                        var res = [];
                        if (idxRow === 0) {
                            row.forEach(function (elem) {
                                labels.push(elem.value.changingThisBreaksApplicationSecurity);
                                if (elem.colspan && elem.colspan > 1) {
                                    for (var i = 1; i < elem.colspan; i++) {
                                        labels.push(' ');
                                    }
                                }
                            });
                            xlsxData.push(labels);
                        }
                        else {
                            row.forEach(function (elem) {
                                res.push(elem.value.changingThisBreaksApplicationSecurity);
                            });
                            xlsxData.push(res);
                        }
                    });
                    break;
            }
            return xlsxData;
        };
        AjfWidgetExport.prototype._buildTitle = function (widgetType) {
            return exports.AjfWidgetType[widgetType] + " " + dateFns.format(new Date(), "yyyy-MM-dd");
        };
        return AjfWidgetExport;
    }());
    AjfWidgetExport.decorators = [
        { type: core.Component, args: [{
                    selector: 'ajf-widget-export',
                    template: "<div class=\"ajf-widget-wrapper\">\n  <ng-content></ng-content>\n  <div *ngIf=\"enable\" class=\"ajf-export-menu\" [class.ajf-export-menu-overlay]=\"overlay\">\n      <button (click)=\"export('csv')\">CSV</button>\n      <button (click)=\"export('xlsx')\">XLSX</button>\n  </div>\n</div>\n",
                    encapsulation: core.ViewEncapsulation.None,
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    styles: ["ajf-widget-export{width:100%;height:inherit}ajf-widget-export .ajf-widget-wrapper{position:relative;height:inherit}ajf-widget-export .ajf-export-menu{position:absolute;right:0;top:0}ajf-widget-export .ajf-export-menu.ajf-export-menu-overlay{display:none}ajf-widget-export .ajf-export-menu button{margin:.5em;border:none;color:#fff;background-color:#4a403f;padding:7.5px 16px;text-align:center;text-decoration:none;display:inline-block;font-size:16px;cursor:pointer}ajf-widget-export .ajf-widget-wrapper:hover .ajf-export-menu-overlay{display:block}\n"]
                },] }
    ];
    AjfWidgetExport.ctorParameters = function () { return []; };
    AjfWidgetExport.propDecorators = {
        widgetType: [{ type: core.Input }],
        data: [{ type: core.Input }],
        overlay: [{ type: core.Input }],
        enable: [{ type: core.Input }]
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
    var AjfWidgetHost = /** @class */ (function () {
        function AjfWidgetHost(viewContainerRef) {
            this.viewContainerRef = viewContainerRef;
        }
        return AjfWidgetHost;
    }());
    AjfWidgetHost.decorators = [
        { type: core.Directive, args: [{ selector: '[ajf-widget-host]' },] }
    ];
    AjfWidgetHost.ctorParameters = function () { return [
        { type: core.ViewContainerRef }
    ]; };

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
        return AjfReportsModule;
    }());
    AjfReportsModule.decorators = [
        { type: core.NgModule, args: [{
                    declarations: [
                        AjfGetColumnContentPipe,
                        AjfReportStringIdentifierPipe,
                        AjfWidgetHost,
                        AjfWidgetExport,
                    ],
                    imports: [
                        common$1.CommonModule,
                    ],
                    exports: [
                        AjfGetColumnContentPipe,
                        AjfReportStringIdentifierPipe,
                        AjfWidgetHost,
                        AjfWidgetExport,
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
    function createAggregation(aggregation) {
        return Object.assign(Object.assign({}, aggregation), { aggregation: aggregation.aggregation || exports.AjfAggregationType.None });
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
            return createAggregation(Object.assign(Object.assign({}, json), { aggregation: json.aggregation }));
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
        return Object.assign(Object.assign({}, dataset), { aggregation: dataset.aggregation || createAggregation({ aggregation: exports.AjfAggregationType.None }) });
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
                json.formula = json.formula.map(function (f) { return models.AjfFormulaSerializer.fromJson(f); }) :
                models.AjfFormulaSerializer.fromJson(json.formula);
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
        return Object.assign(Object.assign({}, widget), { styles: widget.styles || {}, visibility: widget.visibility || models.alwaysCondition() });
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
                json.visibility ? models.AjfConditionSerializer.fromJson(json.visibility) : models.alwaysCondition();
            json.styles = json.styles || {};
            var obj = json;
            if (obj.widgetType === exports.AjfWidgetType.Layout || obj.widgetType === exports.AjfWidgetType.Column) {
                return AjfWidgetSerializer._widgetWithContentFromJson(obj);
            }
            if (obj.widgetType === exports.AjfWidgetType.Chart || obj.widgetType === exports.AjfWidgetType.Table) {
                var w = AjfWidgetSerializer._dataWidgetFromJson(obj);
                if (obj.widgetType === exports.AjfWidgetType.Chart) {
                    var cw = w;
                    if (cw.labels instanceof Array) {
                        cw.labels.map(function (l) { return models.AjfFormulaSerializer.fromJson(l); });
                    }
                    else if (cw.labels != null) {
                        cw.labels = models.AjfFormulaSerializer.fromJson(cw.labels);
                    }
                }
                return w;
            }
            if (obj.widgetType === exports.AjfWidgetType.Map) {
                var mw = obj;
                mw.coordinate = models.AjfFormulaSerializer.fromJson(mw.coordinate);
            }
            return obj;
        };
        AjfWidgetSerializer._dataWidgetFromJson = function (json) {
            var dataset;
            if (json.dataset == null) {
                dataset = [];
            }
            else {
                if (json.widgetType === exports.AjfWidgetType.Table) {
                    dataset = json.dataset
                        .map(function (row) { return row.map(function (cell) { return AjfDatasetSerializer.fromJson(cell); }); });
                }
                else {
                    dataset = json.dataset.map(function (d) { return AjfDatasetSerializer.fromJson(d); });
                }
            }
            return Object.assign(Object.assign({}, createWidget(json)), { dataset: dataset });
        };
        AjfWidgetSerializer._widgetWithContentFromJson = function (json) {
            var content = (json.content || []).map(function (c) { return AjfWidgetSerializer.fromJson(c); });
            return Object.assign(Object.assign({}, createWidget(json)), { content: content });
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
            return Object.assign(Object.assign({}, json), { content: json.content, styles: json.styles || {} });
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
        return Object.assign({}, report);
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
            get: function () {
                return this._instance;
            },
            set: function (instance) {
                if (this._instance !== instance) {
                    this._instance = instance;
                    if (this._init) {
                        this._loadComponent();
                    }
                }
            },
            enumerable: false,
            configurable: true
        });
        AjfReportWidget.prototype.ngOnInit = function () {
            this._init = true;
            this._loadComponent();
        };
        AjfReportWidget.prototype._loadComponent = function () {
            var _this = this;
            if (!this._init || this._instance == null || this.widgetHost == null ||
                !this.instance.visible) {
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
                    catch (e) {
                    }
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
            catch (e) {
            }
        };
        return AjfReportWidget;
    }());
    AjfReportWidget.decorators = [
        { type: core.Directive }
    ];
    AjfReportWidget.ctorParameters = function () { return [
        { type: core.ComponentFactoryResolver },
        { type: core.Renderer2 }
    ]; };
    AjfReportWidget.propDecorators = {
        widgetHost: [{ type: core.ViewChild, args: [AjfWidgetHost, { static: true },] }],
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
    var componentsMap = {};

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
    var AjfWidgetService = /** @class */ (function () {
        function AjfWidgetService(defaultWidgets) {
            this.componentsMap = componentsMap;
            if (defaultWidgets != null) {
                for (var key in defaultWidgets) {
                    var nKey = parseInt(key, 10);
                    this.componentsMap[nKey] = defaultWidgets[key];
                }
            }
        }
        AjfWidgetService.prototype.registerCustomWidget = function (widget) {
            var widgetType = widget.widgetType, component = widget.component;
            if (widgetType < 100) {
                throw new Error('Invalid custom widget type, it must be greater than 100');
            }
            if (component == null) {
                throw new Error('Invalid custom widget component');
            }
            this.componentsMap[widgetType] = widget;
        };
        return AjfWidgetService;
    }());

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (Object.prototype.hasOwnProperty.call(b, p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, o) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
                __createBinding(o, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    /** @deprecated */
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    /** @deprecated */
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    function __spreadArray(to, from) {
        for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
            to[j] = from[i];
        return to;
    }
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, state, kind, f) {
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    }
    function __classPrivateFieldSet(receiver, state, value, kind, f) {
        if (kind === "m")
            throw new TypeError("Private method is not writable");
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
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
    function evaluateAggregation(aggregation, formulas, context) {
        var data = formulas.map(function (f) { return models.evaluateExpression(f.formula, context); });
        switch (aggregation.aggregation) {
            case exports.AjfAggregationType.None:
                if (data.length !== 1) {
                    throw new Error('Invalid aggregation');
                }
                return data[0];
            case exports.AjfAggregationType.Sum:
                return data.map(function (r) { return r.reduce(function (s, d) { return s + d; }, 0); });
            case exports.AjfAggregationType.Average:
            case exports.AjfAggregationType.WeightedAverage:
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
            visible: models.evaluateExpression(widget.visibility.condition, context),
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
        if (formula.substr(0, 1) === '"' || formula.substr(0, 1) === '\'') {
            var ft = formula.slice(1, -1);
            var transFt = ft != null && typeof ft === 'string' && ft.trim().length > 0 ? ts.instant(ft) : ft;
            if (ft.length > 0) {
                formula = "\"" + transFt + "\"";
            }
        }
        else {
            formula = formula != null && typeof formula === 'string' && formula.trim().length > 0 ?
                ts.instant(formula) :
                formula;
        }
        return models.evaluateExpression(formula, context);
    }

    function widgetToWidgetInstance(widget, context, ts) {
        var wi = createWidgetInstance(widget, context, ts);
        if (widget.widgetType === exports.AjfWidgetType.Column || widget.widgetType === exports.AjfWidgetType.Layout) {
            var wwc_1 = widget;
            var wwci_1 = wi;
            var content_1 = [];
            wwc_1.content.forEach(function (c) {
                if (wwc_1.repetitions != null) {
                    wwci_1.repetitions = models.evaluateExpression(wwc_1.repetitions.formula, context);
                    if (typeof wwci_1.repetitions === 'number' && wwci_1.repetitions > 0) {
                        for (var i = 0; i < wwci_1.repetitions; i++) {
                            content_1.push(widgetToWidgetInstance(c, Object.assign(Object.assign({}, context), { '$repetition': i }), ts));
                        }
                    }
                }
                else {
                    content_1.push(widgetToWidgetInstance(c, context, ts));
                }
                wwci_1.content = content_1;
            });
        }
        else if (widget.widgetType === exports.AjfWidgetType.Chart) {
            var cw = widget;
            var cwi = wi;
            var labels = cw.labels instanceof Array ? cw.labels : [cw.labels];
            var evLabels = labels.map(function (l) {
                var evf = models.evaluateExpression(l.formula, context);
                try {
                    if (evf instanceof Array) {
                        evf = evf.map(function (v) { return v != null && typeof v === 'string' && v.trim().length > 0 ? ts.instant(v) : v; });
                    }
                    else {
                        evf = evf != null && typeof evf === 'string' && evf.trim().length > 0 ? ts.instant(evf) :
                            evf;
                    }
                }
                catch (_e) {
                }
                return evf;
            });
            cwi.labels = cw.labels instanceof Array ? evLabels : evLabels[0];
            cwi.datasets = cw.dataset.map(function (d) {
                var ds = Object.assign(Object.assign({}, d.options || {}), { data: evaluateAggregation(d.aggregation, d.formula, context) });
                if (d.chartType != null) {
                    var ct = chartToChartJsType(d.chartType);
                    ds = Object.assign(Object.assign({}, ds), { chartType: ct, type: ct });
                }
                if (d.options != null) {
                    ds = Object.assign(Object.assign({}, ds), { options: d.options });
                }
                if (d.label != null) {
                    ds = Object.assign(Object.assign({}, ds), { label: d.label.trim().length > 0 ? ts.instant(d.label) : d.label });
                }
                if (d.datalabels != null) {
                    ds.datalabels = utils.deepCopy(d.datalabels);
                }
                return ds;
            });
            cwi.data = { labels: cwi.labels, datasets: cwi.datasets };
            cwi.chartType = chartToChartJsType(cw.type || cw.chartType);
            cwi.exportable =
                cw.exportable && (cw.exportable === true || cw.exportable === 'true') ? true : false;
            if (cw.options != null && cw.options.plugins != null) {
                var plugins_1 = cw.options.plugins;
                var pluginNames = Object.keys(plugins_1);
                pluginNames.forEach(function (pluginName) {
                    var plugin = plugins_1[pluginName];
                    var pluginOptions = Object.keys(plugin);
                    pluginOptions.forEach(function (pluginOptionName) {
                        var pluginOption = plugin[pluginOptionName];
                        if (typeof pluginOption !== 'string' && pluginOption != null &&
                            pluginOption.formula != null) {
                            plugin[pluginOptionName] = models.evaluateExpression(pluginOption.formula, context);
                        }
                    });
                });
            }
        }
        else if (widget.widgetType === exports.AjfWidgetType.Table) {
            var tw_1 = widget;
            var twi = wi;
            twi.dataset = tw_1.dataset.map(function (row) { return row.map(function (cell) {
                return cell.formula instanceof Array ?
                    cell.formula.map(function (f) { return trFormula(f, context, ts); }) :
                    trFormula(cell.formula, context, ts);
            }); });
            twi.exportable =
                tw_1.exportable && (tw_1.exportable === true || tw_1.exportable === 'true') ? true : false;
            twi.data = (tw_1.dataset || []).map(function (row) { return row.map(function (cell) {
                var evf = '';
                try {
                    evf = cell.formula instanceof Array ?
                        cell.formula.map(function (f) { return trFormula(f, context, ts); }) :
                        trFormula(cell.formula, context, ts);
                }
                catch (_e) {
                }
                return ({
                    value: evf,
                    style: Object.assign(Object.assign({}, tw_1.cellStyles), cell.style),
                    rowspan: cell.rowspan,
                    colspan: cell.colspan,
                });
            }); });
        }
        else if (widget.widgetType === exports.AjfWidgetType.DynamicTable) {
            var tdw_1 = widget;
            var tdwi = wi;
            tdwi.dataset = tdw_1.dataset.map(function (cell) {
                return cell.formula instanceof Array ?
                    cell.formula.map(function (f) { return trFormula(f, context, ts); }) :
                    trFormula(cell.formula, context, ts);
            });
            tdwi.exportable =
                tdw_1.exportable && (tdw_1.exportable === true || tdw_1.exportable === 'true') ? true : false;
            var dataset = models.evaluateExpression(tdw_1.rowDefinition.formula, context) || [];
            dataset = (dataset || []).map(function (row) { return row.map(function (cell) {
                var trf = cell.value;
                try {
                    if (trf instanceof Array) {
                        trf = trf.map(function (v) { return v != null && typeof v === 'string' && v.trim().length > 0 ? ts.instant(v) : v; });
                    }
                    else {
                        trf = trf != null && typeof trf === 'string' && trf.trim().length > 0 ? ts.instant(trf) :
                            trf;
                    }
                }
                catch (_e) {
                }
                return (Object.assign(Object.assign({}, cell), { value: trf }));
            }); });
            var header = (tdw_1.dataset || []).map(function (cell) {
                var evf = '';
                try {
                    evf = cell.formula instanceof Array ?
                        cell.formula.map(function (f) { return trFormula(f, context, ts); }) :
                        trFormula(cell.formula, context, ts);
                }
                catch (_e) {
                }
                return ({
                    value: evf,
                    style: Object.assign(Object.assign({}, tdw_1.cellStyles), cell.style),
                    rowspan: cell.rowspan,
                    colspan: cell.colspan,
                });
            });
            tdwi.data = __spreadArray([__spreadArray([], __read(header))], __read(dataset));
        }
        else if (widget.widgetType === exports.AjfWidgetType.Image) {
            var iw = widget;
            var iwi = wi;
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
        else if (widget.widgetType === exports.AjfWidgetType.ImageContainer) {
            var icw = widget;
            var icwi = wi;
            if (icw.flags) {
                icwi.flags = icw.flags instanceof Array ?
                    icw.flags.map(function (f) { return models.evaluateExpression(f.formula, context); }) :
                    models.evaluateExpression(icw.flags.formula, context);
            }
            if (icw.icons) {
                icwi.icons = icw.icons instanceof Array ?
                    icw.icons.map(function (f) { return models.evaluateExpression(f.formula, context); }) :
                    models.evaluateExpression(icw.icons.formula, context);
            }
            if (icw.urls) {
                icwi.urls = icw.urls instanceof Array ?
                    icw.urls.map(function (f) { return models.evaluateExpression(f.formula, context); }) :
                    models.evaluateExpression(icw.urls.formula, context);
            }
        }
        else if (widget.widgetType === exports.AjfWidgetType.Text) {
            var tew = widget;
            var tewi = wi;
            var formulaRegEx = /\[{2}(.+?)\]{2}/g;
            var matches = [];
            var match = void 0;
            var htmlText_1 = tew.htmlText;
            while (match = formulaRegEx.exec(htmlText_1)) {
                var idx = match.index;
                var len = match[0].length;
                var formula = models.createFormula({ formula: match[1] });
                matches.push({ idx: idx, len: len, formula: formula });
            }
            matches.reverse().forEach(function (m) {
                var calcValue;
                try {
                    calcValue = models.evaluateExpression(m.formula.formula, context);
                }
                catch (e) {
                    calcValue = '';
                }
                htmlText_1 = "" + htmlText_1.substr(0, m.idx) + calcValue + htmlText_1.substr(m.idx + m.len);
            });
            tewi.htmlText = htmlText_1 != null && htmlText_1.length > 0 ? ts.instant(htmlText_1) : htmlText_1;
        }
        else if (widget.widgetType === exports.AjfWidgetType.Formula) {
            var fw = widget;
            var fwi = wi;
            fwi.formula = models.evaluateExpression(fw.formula.formula, context);
        }
        else if (widget.widgetType === exports.AjfWidgetType.Map) {
            var mw = widget;
            var mwi = wi;
            mwi.coordinate = models.evaluateExpression(mw.coordinate.formula, context);
        }
        else if (widget.widgetType > 100) {
            var iiFn = componentsMap[widget.widgetType] != null ?
                componentsMap[widget.widgetType].initInstance :
                null;
            if (iiFn != null) {
                return iiFn(wi, context, ts);
            }
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
            context[variable.name] = models.evaluateExpression(variable.formula.formula, context);
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

    function loadReportImages(report) {
        var promises = [];
        if (report.header != null) {
            promises.push(loadContainerImages(report.header));
        }
        if (report.content != null) {
            promises.push(loadContainerImages(report.content));
        }
        if (report.footer != null) {
            promises.push(loadContainerImages(report.footer));
        }
        return new Promise(function (resolve) {
            Promise.all(promises).then(function (maps) {
                var e_1, _a;
                var map = {};
                try {
                    for (var maps_1 = __values(maps), maps_1_1 = maps_1.next(); !maps_1_1.done; maps_1_1 = maps_1.next()) {
                        var m = maps_1_1.value;
                        map = Object.assign(Object.assign({}, map), m);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (maps_1_1 && !maps_1_1.done && (_a = maps_1.return)) _a.call(maps_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                resolve(map);
            });
        });
    }
    function loadContainerImages(container) {
        var e_2, _a;
        var promises = [];
        try {
            for (var _b = __values(container.content), _c = _b.next(); !_c.done; _c = _b.next()) {
                var widget = _c.value;
                promises.push(loadWidgetImages(widget));
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return new Promise(function (resolve) {
            Promise.all(promises).then(function (maps) {
                var e_3, _a;
                var map = {};
                try {
                    for (var maps_2 = __values(maps), maps_2_1 = maps_2.next(); !maps_2_1.done; maps_2_1 = maps_2.next()) {
                        var m = maps_2_1.value;
                        map = Object.assign(Object.assign({}, map), m);
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (maps_2_1 && !maps_2_1.done && (_a = maps_2.return)) _a.call(maps_2);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
                resolve(map);
            });
        });
    }
    function loadWidgetImages(widget) {
        switch (widget.widgetType) {
            case exports.AjfWidgetType.Layout:
            case exports.AjfWidgetType.Column:
                return loadContainerImages(widget);
            case exports.AjfWidgetType.Image:
                var image_1 = widget;
                if (image_1.widget.imageType !== image.AjfImageType.Image) {
                    break;
                }
                return new Promise(function (resolve) {
                    var req = new XMLHttpRequest();
                    req.onerror = function () { return resolve({}); }; // ignore 404's
                    req.onload = function () {
                        var r = new FileReader();
                        r.onerror = function () { return resolve({}); };
                        r.onloadend = function () {
                            var result = r.result;
                            if (result.startsWith('data:image')) {
                                var map = {};
                                map[image_1.url] = result;
                                resolve(map);
                            }
                            else {
                                resolve({});
                            }
                        };
                        r.readAsDataURL(req.response);
                    };
                    req.open('GET', image_1.url);
                    req.responseType = 'blob';
                    req.send();
                });
        }
        return new Promise(function (resolve) { return resolve({}); });
    }

    function openReportPdf(report, orientation) {
        createReportPdf(report, orientation).then(function (pdf) {
            pdf.open();
        });
    }
    function createReportPdf(report, orientation) {
        return new Promise(function (resolve) {
            loadReportImages(report).then(function (images) {
                var width = 595.28 - 40 * 2; // A4 page width - margins
                if (orientation === 'landscape') {
                    width = 841.89 - 40 * 2;
                }
                var pdfDef = reportToPdf(report, images, width);
                pdfDef.pageOrientation = orientation;
                resolve(pdfmake.createPdf(pdfDef, undefined, vfsFonts.vfsFontsMap, vfsFonts.vfsFonts));
            });
        });
    }
    function reportToPdf(report, images, width) {
        var stack = [];
        if (report.header != null) {
            stack.push(containerToPdf(report.header, images, width));
        }
        if (report.content != null) {
            stack.push(containerToPdf(report.content, images, width));
        }
        if (report.footer != null) {
            stack.push(containerToPdf(report.footer, images, width));
        }
        return { content: { stack: stack } };
    }
    function containerToPdf(container, images, width) {
        return { stack: container.content.map(function (w) { return widgetToPdf(w, images, width); }) };
    }
    var marginBetweenWidgets = 10;
    function widgetToPdf(widget, images, width) {
        switch (widget.widget.widgetType) {
            case exports.AjfWidgetType.Layout:
                return layoutToPdf(widget, images, width);
            case exports.AjfWidgetType.PageBreak:
                return { text: '', pageBreak: 'after' };
            case exports.AjfWidgetType.Image:
                return imageToPdf(widget, images, width);
            case exports.AjfWidgetType.Text:
                return textToPdf(widget);
            case exports.AjfWidgetType.Chart:
                var chart = widget;
                var dataUrl = chart.canvasDataUrl == null ? '' : chart.canvasDataUrl();
                if (dataUrl === '') {
                    return { text: '[chart with no attached canvas]' };
                }
                return { image: dataUrl, width: width, margin: [0, 0, 0, marginBetweenWidgets] };
            case exports.AjfWidgetType.Table:
            case exports.AjfWidgetType.DynamicTable:
                return tableToPdf(widget);
            case exports.AjfWidgetType.Column:
                var cw = widget;
                return { stack: cw.content.map(function (w) { return widgetToPdf(w, images, width); }) };
            case exports.AjfWidgetType.Formula:
                var fw = widget;
                return { text: fw.formula, margin: [0, 0, 0, marginBetweenWidgets] };
            default:
                return { text: '' };
        }
    }
    function layoutToPdf(lw, images, width) {
        var columns = __spreadArray([], __read(lw.widget.columns));
        while (columns.length < lw.content.length) {
            columns.push(1);
        }
        var childWidth = width / (columns.length || 1);
        var children = [];
        for (var i = 0; i < lw.content.length; i++) {
            var child = widgetToPdf(lw.content[i], images, childWidth);
            // Children of Layout widgets are supposed to be Columns. If they aren't,
            // we must wrap them to avoid problems like images having an 'auto' width.
            if (child.stack == null) {
                child = { stack: [child] };
            }
            child.width = columns[i] === -1 ? 'auto' : '*';
            children.push(child);
        }
        return { columns: children };
    }
    function imageToPdf(image$1, images, width) {
        if (image$1.widget.imageType !== image.AjfImageType.Image) {
            // Can't get icons to work, pdfs with multiple fonts don't seem to be working
            return { text: '' };
        }
        var dataUrl = images[image$1.url];
        if (dataUrl == null) {
            return { text: '' };
        }
        var w = image$1.styles.width;
        if (typeof (w) === 'string' && w.endsWith('px')) {
            width = Number(w.slice(0, -2));
        }
        return { image: dataUrl, width: width, margin: [0, 0, 0, marginBetweenWidgets] };
    }
    function textToPdf(tw) {
        var text = {
            text: stripHTML(tw.htmlText),
            margin: [0, 0, 0, marginBetweenWidgets],
        };
        if (tw.htmlText.startsWith('<h1>')) {
            text.fontSize = 20;
            text.margin = [0, 10, 0, marginBetweenWidgets];
        }
        else if (tw.htmlText.startsWith('<h2>')) {
            text.fontSize = 15;
            text.margin = [0, 5, 0, marginBetweenWidgets];
        }
        return text;
    }
    function tableToPdf(table) {
        var e_1, _a, e_2, _b;
        if (table.data == null || table.data.length === 0) {
            return { text: '' };
        }
        var body = [];
        try {
            for (var _c = __values(expandColAndRowSpan(table.data)), _d = _c.next(); !_d.done; _d = _c.next()) {
                var dataRow = _d.value;
                var bodyRow = [];
                try {
                    for (var dataRow_1 = (e_2 = void 0, __values(dataRow)), dataRow_1_1 = dataRow_1.next(); !dataRow_1_1.done; dataRow_1_1 = dataRow_1.next()) {
                        var cell = dataRow_1_1.value;
                        var text = '';
                        if (typeof (cell.value) === 'string' || typeof (cell.value) === 'number') {
                            text = String(cell.value);
                        }
                        if (typeof (cell.value) === 'object') {
                            text = String(cell.value.changingThisBreaksApplicationSecurity || '');
                        }
                        bodyRow.push({ text: text, colSpan: cell.colspan, rowSpan: cell.rowspan });
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (dataRow_1_1 && !dataRow_1_1.done && (_b = dataRow_1.return)) _b.call(dataRow_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
                body.push(bodyRow);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return { table: { headerRows: 0, body: body }, margin: [0, 0, 0, marginBetweenWidgets] };
    }
    // pdfmake wants placeholder cells after cells with col/rowspan > 1
    function expandColAndRowSpan(data) {
        var e_3, _a;
        data = utils.deepCopy(data);
        try {
            // expand colspan:
            for (var data_1 = __values(data), data_1_1 = data_1.next(); !data_1_1.done; data_1_1 = data_1.next()) {
                var row = data_1_1.value;
                for (var j = 0; j < row.length; j++) {
                    var cell = row[j];
                    for (var k = 1; k < (cell.colspan || 1); k++) {
                        row.splice(j + k, 0, { rowspan: cell.rowspan, value: '', style: {} });
                    }
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (data_1_1 && !data_1_1.done && (_a = data_1.return)) _a.call(data_1);
            }
            finally { if (e_3) throw e_3.error; }
        }
        // expand rowspan:
        for (var i = 0; i < data.length; i++) {
            var row = data[i];
            for (var j = 0; j < row.length; j++) {
                var cell = row[j];
                for (var k = 1; k < (cell.rowspan || 1); k++) {
                    data[i + k].splice(j, 0, { value: '', style: {} });
                }
            }
        }
        return data;
    }
    function stripHTML(s) {
        return s.replace(/<\/?[^>]+(>|$)/g, '');
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

    exports.AjfAggregationSerializer = AjfAggregationSerializer;
    exports.AjfBaseWidgetComponent = AjfBaseWidgetComponent;
    exports.AjfDatasetSerializer = AjfDatasetSerializer;
    exports.AjfGetColumnContentPipe = AjfGetColumnContentPipe;
    exports.AjfReportContainerSerializer = AjfReportContainerSerializer;
    exports.AjfReportRenderer = AjfReportRenderer;
    exports.AjfReportSerializer = AjfReportSerializer;
    exports.AjfReportStringIdentifierPipe = AjfReportStringIdentifierPipe;
    exports.AjfReportWidget = AjfReportWidget;
    exports.AjfReportsModule = AjfReportsModule;
    exports.AjfWidgetExport = AjfWidgetExport;
    exports.AjfWidgetHost = AjfWidgetHost;
    exports.AjfWidgetSerializer = AjfWidgetSerializer;
    exports.AjfWidgetService = AjfWidgetService;
    exports.chartToChartJsType = chartToChartJsType;
    exports.createAggregation = createAggregation;
    exports.createReportInstance = createReportInstance;
    exports.createReportPdf = createReportPdf;
    exports.createWidget = createWidget;
    exports.createWidgetInstance = createWidgetInstance;
    exports.openReportPdf = openReportPdf;
    exports.widgetToWidgetInstance = widgetToWidgetInstance;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=core-reports.umd.js.map
