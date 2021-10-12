import * as i0 from '@angular/core';
import { Pipe, Directive, Input, Component, ViewEncapsulation, ChangeDetectionStrategy, NgModule, ViewChild } from '@angular/core';
import { buildStringIdentifier } from '@ajf/core/common';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import { format } from 'date-fns';
import * as XLSX from 'xlsx';
import { AjfFormulaSerializer, alwaysCondition, AjfConditionSerializer, evaluateExpression, createFormula } from '@ajf/core/models';
import { deepCopy } from '@ajf/core/utils';
import { AjfFieldType } from '@ajf/core/forms';
import { AjfImageType } from '@ajf/core/image';
import { vfsFontsMap, vfsFonts } from '@ajf/core/vfs-fonts';
import { createPdf } from 'pdfmake/build/pdfmake';

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
class AjfBaseWidgetComponent {
    constructor(_cdr, el) {
        this._cdr = _cdr;
        this.el = el;
    }
    get instance() {
        return this._instance;
    }
    set instance(instance) {
        if (this._instance !== instance) {
            this._instance = instance;
            this._cdr.detectChanges();
        }
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
// tslint:disable-next-line:prefer-const-enum
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
class AjfGetColumnContentPipe {
    transform(instance, column) {
        return column >= 0 && column < instance.content.length ? instance.content[column] : null;
    }
}
AjfGetColumnContentPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfGetColumnContentPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
AjfGetColumnContentPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfGetColumnContentPipe, name: "ajfGetColumnContent" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfGetColumnContentPipe, decorators: [{
            type: Pipe,
            args: [{ name: 'ajfGetColumnContent' }]
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
// tslint:disable-next-line:prefer-const-enum
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
// tslint:disable-next-line:prefer-const-enum
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
class AjfReportRenderer {
    constructor(_cdr) {
        this._cdr = _cdr;
    }
    get instance() {
        return this._instance;
    }
    set instance(instance) {
        this._instance = instance;
        this._report = instance != null ? instance.report : null;
        this._cdr.markForCheck();
    }
    get report() {
        return this._report;
    }
}
AjfReportRenderer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfReportRenderer, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Directive });
AjfReportRenderer.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.0-next.15", type: AjfReportRenderer, inputs: { instance: "instance" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfReportRenderer, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }]; }, propDecorators: { instance: [{
                type: Input
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
const buildReportStringIdentifier = (report, context, opts) => {
    if (report == null) {
        return '';
    }
    const stringIdentifier = report.stringIdentifier || [];
    if (stringIdentifier.length === 0) {
        return '';
    }
    return buildStringIdentifier(stringIdentifier, context, opts);
};

class AjfReportStringIdentifierPipe {
    transform(report, context, opts) {
        return buildReportStringIdentifier(report, context, opts);
    }
}
AjfReportStringIdentifierPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfReportStringIdentifierPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
AjfReportStringIdentifierPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfReportStringIdentifierPipe, name: "ajfReportStringIdentifier" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfReportStringIdentifierPipe, decorators: [{
            type: Pipe,
            args: [{ name: 'ajfReportStringIdentifier' }]
        }] });

const xlsxMod = (XLSX.default || XLSX);
class AjfWidgetExport {
    constructor() {
        this.overlay = true;
        this.enable = false;
    }
    /**
     * Export widget data in CSV format
     * @deprecated Use `AjfWidgetExport.export` with 'csv' parameter.
     * @breaking-change 13.0.0
     */
    exportCsv() {
        this.export('csv');
    }
    /**
     * Export widget data in Xlsx format
     * @deprecated Use `AjfWidgetExport.export` with 'xlsx' parameter.
     * @breaking-change 13.0.0
     */
    exportXlsx() {
        this.export('xlsx');
    }
    /**
     * Export widget data in CSV or Xlsx format
     */
    export(bookType) {
        const sheetName = this._buildTitle(this.widgetType);
        const sheets = {};
        sheets[sheetName] = xlsxMod.utils.aoa_to_sheet(this._buildXlsxData());
        const workBook = { Sheets: sheets, SheetNames: [sheetName] };
        xlsxMod.writeFile(workBook, `${sheetName}.${bookType}`, {
            bookType,
            type: 'array',
        });
    }
    _buildXlsxData() {
        let xlsxData = [];
        let labels = [];
        switch (this.widgetType) {
            default:
            case AjfWidgetType.Chart:
                this.data = this.data;
                const datasets = this.data.datasets || [];
                labels = ['name'].concat(this.data.labels);
                xlsxData.push(labels);
                for (let i = 0; i < datasets.length; i++) {
                    const row = [];
                    const data = datasets[i].data || [];
                    row.push(datasets[i].label);
                    for (let j = 0; j < data.length; j++) {
                        row.push(data[j]);
                    }
                    xlsxData.push(row);
                }
                break;
            case AjfWidgetType.Table:
                this.data = this.data;
                this.data.forEach((row, idxRow) => {
                    const res = [];
                    if (idxRow === 0) {
                        row.forEach((elem) => {
                            labels.push(elem.value.changingThisBreaksApplicationSecurity);
                            if (elem.colspan && elem.colspan > 1) {
                                for (let i = 1; i < elem.colspan; i++) {
                                    labels.push(' ');
                                }
                            }
                        });
                        xlsxData.push(labels);
                    }
                    else {
                        row.forEach((elem) => {
                            res.push(elem.value.changingThisBreaksApplicationSecurity);
                        });
                        xlsxData.push(res);
                    }
                });
                break;
        }
        return xlsxData;
    }
    _buildTitle(widgetType) {
        return `${AjfWidgetType[widgetType]} ${format(new Date(), `yyyy-MM-dd`)}`;
    }
}
AjfWidgetExport.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfWidgetExport, deps: [], target: i0.ɵɵFactoryTarget.Component });
AjfWidgetExport.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.0-next.15", type: AjfWidgetExport, selector: "ajf-widget-export", inputs: { widgetType: "widgetType", data: "data", overlay: "overlay", enable: "enable" }, ngImport: i0, template: "<div class=\"ajf-widget-wrapper\">\n  <ng-content></ng-content>\n  <div *ngIf=\"enable\" class=\"ajf-export-menu\" [class.ajf-export-menu-overlay]=\"overlay\">\n      <button (click)=\"export('csv')\">CSV</button>\n      <button (click)=\"export('xlsx')\">XLSX</button>\n  </div>\n</div>\n", styles: ["ajf-widget-export{width:100%;height:inherit}ajf-widget-export .ajf-widget-wrapper{position:relative;height:inherit}ajf-widget-export .ajf-export-menu{position:absolute;right:0;top:0}ajf-widget-export .ajf-export-menu.ajf-export-menu-overlay{display:none}ajf-widget-export .ajf-export-menu button{margin:.5em;border:none;color:#fff;background-color:#4a403f;padding:7.5px 16px;text-align:center;text-decoration:none;display:inline-block;font-size:16px;cursor:pointer}ajf-widget-export .ajf-widget-wrapper:hover .ajf-export-menu-overlay{display:block}\n"], directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfWidgetExport, decorators: [{
            type: Component,
            args: [{ selector: 'ajf-widget-export', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"ajf-widget-wrapper\">\n  <ng-content></ng-content>\n  <div *ngIf=\"enable\" class=\"ajf-export-menu\" [class.ajf-export-menu-overlay]=\"overlay\">\n      <button (click)=\"export('csv')\">CSV</button>\n      <button (click)=\"export('xlsx')\">XLSX</button>\n  </div>\n</div>\n", styles: ["ajf-widget-export{width:100%;height:inherit}ajf-widget-export .ajf-widget-wrapper{position:relative;height:inherit}ajf-widget-export .ajf-export-menu{position:absolute;right:0;top:0}ajf-widget-export .ajf-export-menu.ajf-export-menu-overlay{display:none}ajf-widget-export .ajf-export-menu button{margin:.5em;border:none;color:#fff;background-color:#4a403f;padding:7.5px 16px;text-align:center;text-decoration:none;display:inline-block;font-size:16px;cursor:pointer}ajf-widget-export .ajf-widget-wrapper:hover .ajf-export-menu-overlay{display:block}\n"] }]
        }], ctorParameters: function () { return []; }, propDecorators: { widgetType: [{
                type: Input
            }], data: [{
                type: Input
            }], overlay: [{
                type: Input
            }], enable: [{
                type: Input
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
class AjfWidgetHost {
    constructor(viewContainerRef) {
        this.viewContainerRef = viewContainerRef;
    }
}
AjfWidgetHost.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfWidgetHost, deps: [{ token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
AjfWidgetHost.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.0-next.15", type: AjfWidgetHost, selector: "[ajf-widget-host]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfWidgetHost, decorators: [{
            type: Directive,
            args: [{ selector: '[ajf-widget-host]' }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }]; } });

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
class AjfReportsModule {
}
AjfReportsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfReportsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AjfReportsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfReportsModule, declarations: [AjfGetColumnContentPipe,
        AjfReportStringIdentifierPipe,
        AjfWidgetHost,
        AjfWidgetExport], imports: [CommonModule], exports: [AjfGetColumnContentPipe,
        AjfReportStringIdentifierPipe,
        AjfWidgetHost,
        AjfWidgetExport] });
AjfReportsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfReportsModule, imports: [[
            CommonModule,
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfReportsModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        AjfGetColumnContentPipe,
                        AjfReportStringIdentifierPipe,
                        AjfWidgetHost,
                        AjfWidgetExport,
                    ],
                    imports: [
                        CommonModule,
                    ],
                    exports: [
                        AjfGetColumnContentPipe,
                        AjfReportStringIdentifierPipe,
                        AjfWidgetHost,
                        AjfWidgetExport,
                    ],
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
function createAggregation(aggregation) {
    return Object.assign(Object.assign({}, aggregation), { aggregation: aggregation.aggregation || AjfAggregationType.None });
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
class AjfAggregationSerializer {
    static fromJson(json) {
        if (json.aggregation == null) {
            throw new Error('Malformed aggregation');
        }
        return createAggregation(Object.assign(Object.assign({}, json), { aggregation: json.aggregation }));
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
function createDataset(dataset) {
    return Object.assign(Object.assign({}, dataset), { aggregation: dataset.aggregation || createAggregation({ aggregation: AjfAggregationType.None }) });
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
class AjfDatasetSerializer {
    static fromJson(json) {
        if (json.formula == null || json.aggregation == null || json.label == null) {
            throw new Error('Malformed dataset');
        }
        json.formula = json.formula instanceof Array ?
            json.formula = json.formula.map(f => AjfFormulaSerializer.fromJson(f)) :
            AjfFormulaSerializer.fromJson(json.formula);
        json.aggregation = AjfAggregationSerializer.fromJson(json.aggregation);
        return createDataset(json);
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
function createWidget(widget) {
    return Object.assign(Object.assign({}, widget), { styles: widget.styles || {}, visibility: widget.visibility || alwaysCondition() });
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
class AjfWidgetSerializer {
    static fromJson(json) {
        if (json.widgetType == null) {
            throw new Error('Malformed widget');
        }
        json.visibility =
            json.visibility ? AjfConditionSerializer.fromJson(json.visibility) : alwaysCondition();
        json.styles = json.styles || {};
        const obj = json;
        if (obj.widgetType === AjfWidgetType.Layout || obj.widgetType === AjfWidgetType.Column) {
            return AjfWidgetSerializer._widgetWithContentFromJson(obj);
        }
        if (obj.widgetType === AjfWidgetType.Chart || obj.widgetType === AjfWidgetType.Table) {
            const w = AjfWidgetSerializer._dataWidgetFromJson(obj);
            if (obj.widgetType === AjfWidgetType.Chart) {
                const cw = w;
                if (cw.labels instanceof Array) {
                    cw.labels.map(l => AjfFormulaSerializer.fromJson(l));
                }
                else if (cw.labels != null) {
                    cw.labels = AjfFormulaSerializer.fromJson(cw.labels);
                }
            }
            return w;
        }
        if (obj.widgetType === AjfWidgetType.Map) {
            const mw = obj;
            mw.coordinate = AjfFormulaSerializer.fromJson(mw.coordinate);
        }
        return obj;
    }
    static _dataWidgetFromJson(json) {
        let dataset;
        if (json.dataset == null) {
            dataset = [];
        }
        else {
            if (json.widgetType === AjfWidgetType.Table) {
                dataset = json.dataset
                    .map(row => row.map(cell => AjfDatasetSerializer.fromJson(cell)));
            }
            else {
                dataset = json.dataset.map(d => AjfDatasetSerializer.fromJson(d));
            }
        }
        return Object.assign(Object.assign({}, createWidget(json)), { dataset });
    }
    static _widgetWithContentFromJson(json) {
        const content = (json.content || []).map(c => AjfWidgetSerializer.fromJson(c));
        return Object.assign(Object.assign({}, createWidget(json)), { content });
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
class AjfReportContainerSerializer {
    static fromJson(json) {
        json.content = (json.content || []).map(c => AjfWidgetSerializer.fromJson(c));
        return Object.assign(Object.assign({}, json), { content: json.content, styles: json.styles || {} });
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
class AjfReportSerializer {
    static fromJson(json) {
        const containers = ['header', 'footer', 'content'];
        containers.forEach(c => {
            if (json[c]) {
                json[c] =
                    AjfReportContainerSerializer.fromJson(json[c]);
            }
        });
        return createReport(json);
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
class AjfReportWidget {
    constructor(_cfr, _renderer) {
        this._cfr = _cfr;
        this._renderer = _renderer;
        this._init = false;
    }
    get instance() {
        return this._instance;
    }
    set instance(instance) {
        if (this._instance !== instance) {
            this._instance = instance;
            if (this._init) {
                this._loadComponent();
            }
        }
    }
    ngOnInit() {
        this._init = true;
        this._loadComponent();
    }
    _loadComponent() {
        if (!this._init || this._instance == null || this.widgetHost == null ||
            !this.instance.visible) {
            return;
        }
        const vcr = this.widgetHost.viewContainerRef;
        vcr.clear();
        const componentDef = this.widgetsMap[this._instance.widget.widgetType];
        if (componentDef == null) {
            return;
        }
        const component = componentDef.component;
        try {
            const componentFactory = this._cfr.resolveComponentFactory(component);
            const componentRef = vcr.createComponent(componentFactory);
            const componentInstance = componentRef.instance;
            Object.keys(this._instance.widget.styles).forEach((style) => {
                try {
                    this._renderer.setStyle(componentInstance.el.nativeElement, style, `${this._instance.widget.styles[style]}`);
                }
                catch (e) {
                }
            });
            componentInstance.instance = this._instance;
            if (componentDef.inputs) {
                Object.keys(componentDef.inputs).forEach(key => {
                    if (key in componentInstance) {
                        componentInstance[key] = componentDef.inputs[key];
                    }
                });
            }
        }
        catch (e) {
        }
    }
}
AjfReportWidget.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfReportWidget, deps: [{ token: i0.ComponentFactoryResolver }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive });
AjfReportWidget.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.0-next.15", type: AjfReportWidget, inputs: { instance: "instance" }, viewQueries: [{ propertyName: "widgetHost", first: true, predicate: AjfWidgetHost, descendants: true, static: true }], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfReportWidget, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: i0.Renderer2 }]; }, propDecorators: { widgetHost: [{
                type: ViewChild,
                args: [AjfWidgetHost, { static: true }]
            }], instance: [{
                type: Input
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
const componentsMap = {};

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
class AjfWidgetService {
    constructor(defaultWidgets) {
        this.componentsMap = componentsMap;
        if (defaultWidgets != null) {
            for (const key in defaultWidgets) {
                const nKey = parseInt(key, 10);
                this.componentsMap[nKey] = defaultWidgets[key];
            }
        }
    }
    registerCustomWidget(widget) {
        const { widgetType, component } = widget;
        if (widgetType < 100) {
            throw new Error('Invalid custom widget type, it must be greater than 100');
        }
        if (component == null) {
            throw new Error('Invalid custom widget component');
        }
        this.componentsMap[widgetType] = widget;
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
function evaluateAggregation(aggregation, formulas, context) {
    const data = formulas.map(f => evaluateExpression(f.formula, context));
    switch (aggregation.aggregation) {
        case AjfAggregationType.None:
            if (data.length !== 1) {
                throw new Error('Invalid aggregation');
            }
            return data[0];
        case AjfAggregationType.Sum:
            return data.map((r) => r.reduce((s, d) => s + d, 0));
        case AjfAggregationType.Average:
        case AjfAggregationType.WeightedAverage:
            return data.map((r) => {
                const sum = r.reduce((s, d) => s + d, 0);
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
        widget,
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
    let formula = f.formula;
    if (formula.substr(0, 1) === '"' || formula.substr(0, 1) === '\'') {
        const ft = formula.slice(1, -1);
        const transFt = ft != null && typeof ft === 'string' && ft.trim().length > 0 ? ts.translate(ft) : ft;
        if (ft.length > 0) {
            formula = `"${transFt}"`;
        }
    }
    else {
        formula = formula != null && typeof formula === 'string' && formula.trim().length > 0 ?
            ts.translate(formula) :
            formula;
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
    const wi = createWidgetInstance(widget, context, ts);
    if (widget.widgetType === AjfWidgetType.Column || widget.widgetType === AjfWidgetType.Layout) {
        const wwc = widget;
        const wwci = wi;
        let content = [];
        wwc.content.forEach(c => {
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
        });
    }
    else if (widget.widgetType === AjfWidgetType.Chart) {
        const cw = widget;
        const cwi = wi;
        const labels = cw.labels instanceof Array ? cw.labels : [cw.labels];
        const evLabels = labels.map(l => {
            let evf = evaluateExpression(l.formula, context);
            try {
                if (evf instanceof Array) {
                    evf = evf.map(v => v != null && typeof v === 'string' && v.trim().length > 0 ? ts.translate(v) : v);
                }
                else {
                    evf = evf != null && typeof evf === 'string' && evf.trim().length > 0 ?
                        ts.translate(evf) :
                        evf;
                }
            }
            catch (_e) {
            }
            return evf;
        });
        cwi.labels = cw.labels instanceof Array ? evLabels : evLabels[0];
        cwi.datasets = cw.dataset.map(d => {
            let ds = Object.assign(Object.assign({}, d.options || {}), { data: evaluateAggregation(d.aggregation, d.formula, context) });
            if (d.chartType != null) {
                const ct = chartToChartJsType(d.chartType);
                ds = Object.assign(Object.assign({}, ds), { chartType: ct, type: ct });
            }
            if (d.options != null) {
                ds = Object.assign(Object.assign({}, ds), { options: d.options });
            }
            if (d.label != null) {
                ds = Object.assign(Object.assign({}, ds), { label: d.label.trim().length > 0 ? ts.translate(d.label) : d.label });
            }
            if (d.datalabels != null) {
                ds.datalabels = deepCopy(d.datalabels);
            }
            return ds;
        });
        cwi.data = { labels: cwi.labels, datasets: cwi.datasets };
        cwi.chartType = chartToChartJsType(cw.type || cw.chartType);
        cwi.exportable =
            cw.exportable && (cw.exportable === true || cw.exportable === 'true') ? true : false;
        if (cw.options != null && cw.options.plugins != null) {
            const plugins = cw.options.plugins;
            const pluginNames = Object.keys(plugins);
            pluginNames.forEach((pluginName) => {
                const plugin = plugins[pluginName];
                const pluginOptions = Object.keys(plugin);
                pluginOptions.forEach((pluginOptionName) => {
                    const pluginOption = plugin[pluginOptionName];
                    if (typeof pluginOption !== 'string' && pluginOption != null &&
                        pluginOption.formula != null) {
                        plugin[pluginOptionName] = evaluateExpression(pluginOption.formula, context);
                    }
                });
            });
        }
    }
    else if (widget.widgetType === AjfWidgetType.Table) {
        const tw = widget;
        const twi = wi;
        twi.dataset = tw.dataset.map(row => row.map(cell => {
            return cell.formula instanceof Array ?
                cell.formula.map(f => trFormula(f, context, ts)) :
                trFormula(cell.formula, context, ts);
        }));
        twi.exportable =
            tw.exportable && (tw.exportable === true || tw.exportable === 'true') ? true : false;
        twi.data = (tw.dataset || []).map(row => row.map(cell => {
            let evf = '';
            try {
                evf = cell.formula instanceof Array ?
                    cell.formula.map(f => trFormula(f, context, ts)) :
                    trFormula(cell.formula, context, ts);
            }
            catch (_e) {
            }
            return ({
                value: evf,
                style: Object.assign(Object.assign({}, tw.cellStyles), cell.style),
                rowspan: cell.rowspan,
                colspan: cell.colspan,
            });
        }));
    }
    else if (widget.widgetType === AjfWidgetType.DynamicTable) {
        const tdw = widget;
        const tdwi = wi;
        tdwi.dataset = tdw.dataset.map((cell) => {
            return cell.formula instanceof Array ?
                cell.formula.map(f => trFormula(f, context, ts)) :
                trFormula(cell.formula, context, ts);
        });
        tdwi.exportable =
            tdw.exportable && (tdw.exportable === true || tdw.exportable === 'true') ? true : false;
        let dataset = evaluateExpression(tdw.rowDefinition.formula, context) || [];
        dataset = (dataset || []).map((row) => row.map(cell => {
            let trf = cell.value;
            try {
                if (trf instanceof Array) {
                    trf = trf.map(v => v != null && typeof v === 'string' && v.trim().length > 0 ? ts.translate(v) : v);
                }
                else {
                    trf = trf != null && typeof trf === 'string' && trf.trim().length > 0 ?
                        ts.translate(trf) :
                        trf;
                }
            }
            catch (_e) {
            }
            return (Object.assign(Object.assign({}, cell), { value: trf }));
        }));
        const header = (tdw.dataset || []).map(cell => {
            let evf = '';
            try {
                evf = cell.formula instanceof Array ?
                    cell.formula.map(f => trFormula(f, context, ts)) :
                    trFormula(cell.formula, context, ts);
            }
            catch (_e) {
            }
            return ({
                value: evf,
                style: Object.assign(Object.assign({}, tdw.cellStyles), cell.style),
                rowspan: cell.rowspan,
                colspan: cell.colspan,
            });
        });
        tdwi.data = header.length === 0 ? [...dataset] : [[...header], ...dataset];
    }
    else if (widget.widgetType === AjfWidgetType.Image) {
        const iw = widget;
        const iwi = wi;
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
        const icw = widget;
        const icwi = wi;
        if (icw.flags) {
            icwi.flags = icw.flags instanceof Array ?
                icw.flags.map(f => evaluateExpression(f.formula, context)) :
                evaluateExpression(icw.flags.formula, context);
        }
        if (icw.icons) {
            icwi.icons = icw.icons instanceof Array ?
                icw.icons.map(f => evaluateExpression(f.formula, context)) :
                evaluateExpression(icw.icons.formula, context);
        }
        if (icw.urls) {
            icwi.urls = icw.urls instanceof Array ?
                icw.urls.map(f => evaluateExpression(f.formula, context)) :
                evaluateExpression(icw.urls.formula, context);
        }
    }
    else if (widget.widgetType === AjfWidgetType.Text) {
        const tew = widget;
        const tewi = wi;
        const formulaRegEx = /\[{2}(.+?)\]{2}/g;
        const matches = [];
        let match;
        let htmlText = tew.htmlText;
        while (match = formulaRegEx.exec(htmlText)) {
            const idx = match.index;
            const len = match[0].length;
            const formula = createFormula({ formula: match[1] });
            matches.push({ idx, len, formula });
        }
        matches.reverse().forEach((m) => {
            let calcValue;
            try {
                calcValue = evaluateExpression(m.formula.formula, context);
            }
            catch (e) {
                calcValue = '';
            }
            htmlText = `${htmlText.substr(0, m.idx)}${calcValue}${htmlText.substr(m.idx + m.len)}`;
        });
        tewi.htmlText = htmlText != null && htmlText.length > 0 ? ts.translate(htmlText) : htmlText;
    }
    else if (widget.widgetType === AjfWidgetType.Formula) {
        const fw = widget;
        const fwi = wi;
        fwi.formula = evaluateExpression(fw.formula.formula, context);
    }
    else if (widget.widgetType === AjfWidgetType.Map) {
        const mw = widget;
        const mwi = wi;
        mwi.coordinate = evaluateExpression(mw.coordinate.formula, context);
    }
    else if (widget.widgetType > 100) {
        const iiFn = componentsMap[widget.widgetType] != null ?
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
    const content = container.content.map(c => widgetToWidgetInstance(c, context, ts));
    return {
        container,
        content,
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
    (report.variables || []).forEach(variable => {
        context[variable.name] = evaluateExpression(variable.formula.formula, context);
    });
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
function createReportContainer(container) {
    return Object.assign({}, container);
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
const slideTitleStyle = {
    width: '100%',
    dislay: 'block',
    border: '1px solid gray',
    margin: '10px 10px 0px 10px',
    padding: '10px',
    backgroundColor: 'white',
};
const slideContentStyle = {
    with: '100%',
    dislay: 'block',
    border: '1px solid gray',
    margin: '0px 10px 10px 50px',
    padding: '10px',
    backgroundColor: 'white',
};
const widgetTitleStyle = {
    width: '100%',
    dislay: 'block',
    border: '1px solid gray',
    padding: '10px',
    maxHeight: '600px',
    backgroundColor: 'white',
};
const boxStyle = {
    dislay: 'block',
    padding: '10px',
    width: '100%',
    height: '100%'
};
const widgetStyle = {
    backgroundColor: 'white',
    dislay: 'block',
    border: '1px solid gray',
    padding: '10px',
    maxHeight: '500px',
    marginBottom: '10px'
};
const backgroundColor = [
    '#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', '#E6B333', '#3366E6', '#999966', '#99FF99',
    '#B34D4D', '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', '#FF99E6', '#CCFF1A', '#FF1A66',
    '#E6331A', '#33FFCC', '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', '#66664D', '#991AFF',
    '#E666FF', '#4DB3FF', '#1AB399', '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', '#4D8066',
    '#809980', '#E6FF80', '#1AFF33', '#999933', '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
    '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF', '#F44336', '#FFEBEE', '#FFCDD2', '#EF9A9A',
    '#E57373', '#EF5350', '#E53935', '#D32F2F', '#C62828', '#B71C1C', '#FF8A80', '#FF5252', '#FF1744',
    '#D50000', '#FCE4EC', '#F8BBD0', '#F48FB1', '#F06292', '#EC407A', '#E91E63', '#D81B60', '#C2185B',
    '#AD1457', '#880E4F', '#FF80AB', '#FF4081', '#F50057', '#C51162', '#F3E5F5', '#E1BEE7', '#CE93D8',
    '#BA68C8', '#AB47BC', '#9C27B0', '#8E24AA', '#7B1FA2', '#6A1B9A', '#4A148C', '#EA80FC', '#E040FB',
    '#D500F9', '#AA00FF', '#EDE7F6', '#D1C4E9', '#B39DDB', '#9575CD', '#7E57C2', '#673AB7', '#5E35B1',
    '#512DA8', '#4527A0', '#311B92', '#B388FF', '#7C4DFF', '#651FFF', '#6200EA', '#E8EAF6', '#C5CAE9',
    '#9FA8DA', '#7986CB', '#5C6BC0', '#3F51B5', '#3949AB', '#303F9F', '#283593', '#1A237E', '#8C9EFF',
    '#536DFE', '#3D5AFE', '#304FFE', '#E3F2FD', '#BBDEFB', '#90CAF9', '#64B5F6', '#42A5F5', '#2196F3',
    '#1E88E5', '#1976D2', '#1565C0', '#0D47A1', '#82B1FF', '#448AFF', '#2979FF', '#2962FF', '#E1F5FE',
    '#B3E5FC', '#81D4FA', '#4FC3F7', '#29B6F6', '#03A9F4', '#039BE5', '#0288D1', '#0277BD', '#01579B',
    '#80D8FF', '#40C4FF', '#00B0FF', '#0091EA', '#E0F7FA', '#B2EBF2', '#80DEEA', '#4DD0E1', '#26C6DA',
    '#00BCD4', '#00ACC1', '#0097A7', '#00838F', '#6064', '#84FFFF', '#18FFFF', '#00E5FF', '#00B8D4',
    '#E0F2F1', '#B2DFDB', '#80CBC4', '#4DB6AC', '#26A69A', '#9688', '#00897B', '#00796B', '#00695C',
    '#004D40', '#A7FFEB', '#64FFDA', '#1DE9B6', '#00BFA5', '#E8F5E9', '#C8E6C9', '#A5D6A7', '#81C784',
    '#66BB6A', '#4CAF50', '#43A047', '#388E3C', '#2E7D32', '#1B5E20', '#B9F6CA', '#69F0AE', '#00E676',
    '#00C853', '#F1F8E9', '#DCEDC8', '#C5E1A5', '#AED581', '#9CCC65', '#8BC34A', '#7CB342', '#689F38',
    '#558B2F', '#33691E', '#CCFF90', '#B2FF59', '#76FF03', '#64DD17', '#F9FBE7', '#F0F4C3', '#E6EE9C',
    '#DCE775', '#D4E157', '#CDDC39', '#C0CA33', '#AFB42B', '#9E9D24', '#827717', '#F4FF81', '#EEFF41',
    '#C6FF00', '#AEEA00', '#FFFDE7', '#FFF9C4', '#FFF59D', '#FFF176', '#FFEE58', '#FFEB3B', '#FDD835',
    '#FBC02D', '#F9A825', '#F57F17', '#FFFF8D', '#FFFF00', '#FFEA00', '#FFD600', '#FFF8E1', '#FFECB3',
    '#FFE082', '#FFD54F', '#FFCA28', '#FFC107', '#FFB300', '#FFA000', '#FF8F00', '#FF6F00', '#FFE57F',
    '#FFD740', '#FFC400', '#FFAB00', '#FFF3E0', '#FFE0B2', '#FFCC80', '#FFB74D', '#FFA726', '#FF9800',
    '#FB8C00', '#F57C00', '#EF6C00', '#E65100', '#FFD180', '#FFAB40', '#FF9100', '#FF6D00', '#FBE9E7',
    '#FFCCBC', '#FFAB91', '#FF8A65', '#FF7043', '#FF5722', '#F4511E', '#E64A19', '#D84315', '#BF360C',
    '#FF9E80', '#FF6E40', '#FF3D00', '#DD2C00', '#EFEBE9', '#D7CCC8', '#BCAAA4', '#A1887F', '#8D6E63',
    '#795548', '#6D4C41', '#5D4037', '#4E342E', '#3E2723', '#FAFAFA', '#F5F5F5', '#EEEEEE', '#E0E0E0',
    '#BDBDBD', '#9E9E9E', '#757575', '#616161', '#424242', '#212121', '#ECEFF1', '#CFD8DC', '#B0BEC5',
    '#90A4AE', '#78909C', '#607D8B', '#546E7A', '#455A64', '#37474F', '#263238',
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
function createBooleanWidget(field) {
    return createWidget({
        widgetType: AjfWidgetType.Column,
        content: [createWidget({
                widgetType: AjfWidgetType.Chart,
                type: AjfChartType.Pie,
                labels: { formula: '[\'True\', \'False\']' },
                dataset: [createDataset({
                        label: 'true',
                        formula: [createFormula({
                                formula: `[COUNTFORMS(forms,"${field.name}===true"),COUNTFORMS(forms,"${field.name}===false")]`
                            })],
                        options: { backgroundColor: ['green', 'red'] }
                    })],
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    legend: { display: true, position: 'bottom' }
                },
                styles: { width: '100%', height: '400px' },
                exportable: true
            })],
    });
}
function createMultipleChoiceWidget(field) {
    const choices = field.choicesOrigin.choices;
    let dataset = choices.map((c, index) => createDataset({
        label: `${c.label}`,
        formula: [createFormula({ formula: `[COUNTFORMS(forms,"${field.name}.indexOf('${c.value}') > -1")]` })],
        options: {
            backgroundColor: backgroundColor[index],
            stack: `Stack ${index}`,
        }
    }));
    let chartType = AjfChartType.Bar;
    let labels = { formula: `[]` };
    return createWidget({
        widgetType: AjfWidgetType.Column,
        content: [createWidget({
                widgetType: AjfWidgetType.Chart,
                type: chartType,
                labels,
                dataset,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    legend: { display: true, position: 'bottom' }
                },
                styles: { width: '100%', height: '400px' },
                exportable: true
            })],
    });
}
function createNumberWidget(field) {
    return createWidget({
        widgetType: AjfWidgetType.Column,
        styles: widgetStyle,
        content: [createWidget({
                widgetType: AjfWidgetType.Layout,
                columns: [0.33, 0.33, 0.33],
                content: [
                    createWidget({
                        widgetType: AjfWidgetType.Column,
                        styles: boxStyle,
                        content: [
                            createWidget({
                                widgetType: AjfWidgetType.Text,
                                htmlText: `<div color="primary"><h5>Mean</h5></div>`,
                                styles: widgetTitleStyle,
                            }),
                            createWidget({
                                widgetType: AjfWidgetType.Text,
                                'htmlText': `<p>[[MEAN(forms,"${field.name}")]] / [[MAX(forms,"${field.name}")]]</p>`,
                                styles: widgetTitleStyle,
                            })
                        ]
                    }),
                    createWidget({
                        widgetType: AjfWidgetType.Column,
                        styles: boxStyle,
                        content: [
                            createWidget({
                                widgetType: AjfWidgetType.Text,
                                htmlText: `<div color="primary"><h5>Median</h5></div>`,
                                styles: widgetTitleStyle,
                            }),
                            createWidget({
                                widgetType: AjfWidgetType.Text,
                                'htmlText': `<p>[[MEDIAN(forms,"${field.name}")]] / [[MAX(forms,"${field.name}")]]</p>`,
                                styles: widgetTitleStyle,
                            })
                        ]
                    }),
                    createWidget({
                        widgetType: AjfWidgetType.Column,
                        styles: boxStyle,
                        content: [
                            createWidget({
                                widgetType: AjfWidgetType.Text,
                                htmlText: `<div color="primary"><h5>Mode</h5></div>`,
                                styles: widgetTitleStyle,
                            }),
                            createWidget({
                                widgetType: AjfWidgetType.Text,
                                htmlText: `<p>[[MODE(forms,"${field.name}")]]</p>`,
                                styles: widgetTitleStyle,
                            })
                        ]
                    }),
                ]
            })]
    });
}
function createSingleChoiceWidget(field) {
    const choices = field.choicesOrigin.choices;
    let dataset = [];
    let chartType = AjfChartType.Bar;
    let labels = { formula: `[]` };
    if (choices.length > 5) {
        labels = { formula: `[${choices.map(c => `${JSON.stringify(c.label)}`)}]` };
        chartType = AjfChartType.Pie;
        dataset =
            [createDataset({
                    label: field.label,
                    formula: [createFormula({
                            formula: `[${choices.map((choice) => `COUNTFORMS(forms,"${field.name}==='${choice.value}'")`)
                                .toString()}]`
                        })],
                    options: { backgroundColor }
                })];
    }
    else {
        dataset = choices.map((c, index) => createDataset({
            label: `${c.label}`,
            formula: [createFormula({ formula: `[COUNTFORMS(forms,"${field.name}==='${c.value}'")]` })],
            options: {
                backgroundColor: backgroundColor[index],
                stack: `Stack ${index}`,
            }
        }));
    }
    return createWidget({
        widgetType: AjfWidgetType.Column,
        content: [createWidget({
                widgetType: AjfWidgetType.Chart,
                type: chartType,
                labels,
                dataset,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    legend: { display: true, position: 'bottom' }
                },
                styles: { width: '100%', height: '400px' },
                exportable: true
            })],
    });
}
function createRangeWidget(field) {
    var _a, _b;
    const end = (_a = field.end) !== null && _a !== void 0 ? _a : 11;
    const start = (_b = field.start) !== null && _b !== void 0 ? _b : 1;
    let choices = [];
    for (let i = start; i <= end; i++) {
        choices.push(i);
    }
    let labels = { formula: `[${JSON.stringify(field.label)}]` };
    let dataset = choices.map((_, index) => createDataset({
        label: `${index + start}`,
        formula: [createFormula({ formula: `[COUNTFORMS(forms,"${field.name}===${index + 1 + start}")]` })],
        options: {
            backgroundColor: backgroundColor[index],
            stack: `Stack ${index}`,
        }
    }));
    return createWidget({
        widgetType: AjfWidgetType.Column,
        styles: widgetStyle,
        content: [
            createWidget({
                widgetType: AjfWidgetType.Layout,
                columns: [0.33, 0.33, 0.33],
                content: [
                    createWidget({
                        widgetType: AjfWidgetType.Column,
                        styles: boxStyle,
                        content: [
                            createWidget({
                                widgetType: AjfWidgetType.Text,
                                htmlText: `<div color="primary"><h5>Mean</h5></div>`,
                                styles: widgetTitleStyle,
                            }),
                            createWidget({
                                widgetType: AjfWidgetType.Text,
                                'htmlText': `<p>[[MEAN(forms,"${field.name}")]] / [[MAX(forms,"${field.name}")]]</p>`,
                                styles: widgetTitleStyle,
                            })
                        ]
                    }),
                    createWidget({
                        widgetType: AjfWidgetType.Column,
                        styles: boxStyle,
                        content: [
                            createWidget({
                                widgetType: AjfWidgetType.Text,
                                htmlText: `<div color="primary"><h5>Median</h5></div>`,
                                styles: widgetTitleStyle,
                            }),
                            createWidget({
                                widgetType: AjfWidgetType.Text,
                                'htmlText': `<p>[[MEDIAN(forms,"${field.name}")]] / [[MAX(forms,"${field.name}")]]</p>`,
                                styles: widgetTitleStyle,
                            })
                        ]
                    }),
                    createWidget({
                        widgetType: AjfWidgetType.Column,
                        styles: boxStyle,
                        content: [
                            createWidget({
                                widgetType: AjfWidgetType.Text,
                                htmlText: `<div color="primary"><h5>Mode</h5></div>`,
                                styles: widgetTitleStyle,
                            }),
                            createWidget({
                                widgetType: AjfWidgetType.Text,
                                htmlText: `<p>[[MODE(forms,"${field.name}")]]</p>`,
                                styles: widgetTitleStyle,
                            })
                        ]
                    }),
                ]
            }),
            createWidget({
                widgetType: AjfWidgetType.Chart,
                type: AjfChartType.Bar,
                labels,
                dataset,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    legend: { display: true, position: 'bottom' }
                },
                styles: { width: '100%', height: '400px' },
                exportable: true
            })
        ]
    });
}
/**
 * This function returns a basic report for any form passed in input.
 *
 * @param form the form schema
 * @param [id] the id of the form inside the plathform.
 */
function reportFromForm(form, id) {
    var _a;
    const report = {};
    const reportWidgets = [];
    // we assume that the array of forms passed to the report is called 'forms'.
    if (id != null) {
        report.variables = [{ name: 'forms', formula: { 'formula': `forms[${id}]` } }];
    }
    (_a = form.nodes) === null || _a === void 0 ? void 0 : _a.forEach(slide => {
        const slideWidgets = [];
        slide.nodes.forEach((field) => {
            // create the title of the widget.
            const fieldTitleWidget = createWidget({
                widgetType: AjfWidgetType.Text,
                htmlText: `<div color="primary"><h5>${field.label} - [[COUNTFORMS(forms,"${field.name} != null")]] answers</h5></div>`,
                styles: widgetTitleStyle
            });
            slideWidgets.push(fieldTitleWidget);
            switch (field.fieldType) {
                default:
                    slideWidgets.pop(); // remove the title of empty widget
                    break;
                case AjfFieldType.Number:
                    slideWidgets.push(createNumberWidget(field));
                    break;
                case AjfFieldType.Boolean:
                    slideWidgets.push(createBooleanWidget(field));
                    break;
                case AjfFieldType.SingleChoice:
                    slideWidgets.push(createSingleChoiceWidget(field));
                    break;
                case AjfFieldType.MultipleChoice:
                    slideWidgets.push(createMultipleChoiceWidget(field));
                    break;
                case AjfFieldType.Range:
                    slideWidgets.push(createRangeWidget(field));
                    break;
            }
        });
        // if the slide have a widgets add him to the reports with the relative title
        if (slideWidgets.length > 0) {
            // create the title of the slide.
            const slideTitleWidget = createWidget({
                widgetType: AjfWidgetType.Text,
                htmlText: `<div color="primary"><h1>${slide.label}</h1></div>`,
                styles: slideTitleStyle
            });
            reportWidgets.push(slideTitleWidget);
            // create the column with the slide widgets.
            const columnWidget = createWidget({
                widgetType: AjfWidgetType.Column,
                content: slideWidgets,
                styles: slideContentStyle,
            });
            reportWidgets.push(columnWidget);
        }
    });
    report.content = createReportContainer({ content: [...reportWidgets] });
    return report;
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
function loadReportImages(report) {
    const promises = [];
    if (report.header != null) {
        promises.push(loadContainerImages(report.header));
    }
    if (report.content != null) {
        promises.push(loadContainerImages(report.content));
    }
    if (report.footer != null) {
        promises.push(loadContainerImages(report.footer));
    }
    return new Promise(resolve => {
        Promise.all(promises).then(maps => {
            let map = {};
            for (const m of maps) {
                map = Object.assign(Object.assign({}, map), m);
            }
            resolve(map);
        });
    });
}
function loadContainerImages(container) {
    const promises = [];
    for (let widget of container.content) {
        promises.push(loadWidgetImages(widget));
    }
    return new Promise(resolve => {
        Promise.all(promises).then(maps => {
            let map = {};
            for (const m of maps) {
                map = Object.assign(Object.assign({}, map), m);
            }
            resolve(map);
        });
    });
}
function loadWidgetImages(widget) {
    switch (widget.widgetType) {
        case AjfWidgetType.Layout:
        case AjfWidgetType.Column:
            return loadContainerImages(widget);
        case AjfWidgetType.Image:
            const image = widget;
            if (image.widget.imageType !== AjfImageType.Image) {
                break;
            }
            return new Promise(resolve => {
                const req = new XMLHttpRequest();
                req.onerror = () => resolve({}); // ignore 404's
                req.onload = () => {
                    const r = new FileReader();
                    r.onerror = () => resolve({});
                    r.onloadend = () => {
                        const result = r.result;
                        if (result.startsWith('data:image')) {
                            const map = {};
                            map[image.url] = result;
                            resolve(map);
                        }
                        else {
                            resolve({});
                        }
                    };
                    r.readAsDataURL(req.response);
                };
                req.open('GET', image.url);
                req.responseType = 'blob';
                req.send();
            });
    }
    return new Promise(resolve => resolve({}));
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
const pageWidth = 800;
const pageHeight = pageWidth * 1.4142; // A4 proportions
const pageMargins = [40, 60];
function openReportPdf(report, orientation = 'portrait', icons = {}) {
    createReportPdf(report, orientation, icons).then(pdf => {
        pdf.open();
    });
}
function createReportPdf(report, orientation = 'portrait', icons = {}) {
    return new Promise(resolve => {
        loadReportImages(report).then(images => {
            let width = pageWidth - pageMargins[0] * 2;
            if (orientation === 'landscape') {
                width = pageHeight - pageMargins[1] * 2;
            }
            const pdfDef = reportToPdf(report, Object.assign(Object.assign({}, images), icons), width);
            pdfDef.pageSize = { width: pageWidth, height: pageHeight };
            pdfDef.pageMargins = pageMargins;
            pdfDef.pageOrientation = orientation;
            resolve(createPdf(pdfDef, undefined, vfsFontsMap, vfsFonts));
        });
    });
}
function reportToPdf(report, images, width) {
    const stack = [];
    if (report.header != null) {
        stack.push(containerToPdf(report.header, images, width));
    }
    if (report.content != null) {
        stack.push(containerToPdf(report.content, images, width));
    }
    if (report.footer != null) {
        stack.push(containerToPdf(report.footer, images, width));
    }
    return { content: { stack } };
}
function containerToPdf(container, images, width) {
    return { stack: container.content.map(w => widgetToPdf(w, images, width)) };
}
const marginBetweenWidgets = 10;
function widgetToPdf(widget, images, width) {
    switch (widget.widget.widgetType) {
        case AjfWidgetType.Layout:
            return layoutToPdf(widget, images, width);
        case AjfWidgetType.PageBreak:
            return { text: '', pageBreak: 'after' };
        case AjfWidgetType.Image:
            return imageToPdf(widget, images, width);
        case AjfWidgetType.Text:
            return textToPdf(widget, images);
        case AjfWidgetType.Chart:
            const chart = widget;
            const dataUrl = chart.canvasDataUrl == null ? '' : chart.canvasDataUrl();
            if (dataUrl === '') {
                return { text: '[chart with no attached canvas]' };
            }
            return { image: dataUrl, width, margin: [0, 0, 0, marginBetweenWidgets] };
        case AjfWidgetType.Table:
        case AjfWidgetType.DynamicTable:
            return tableToPdf(widget, images);
        case AjfWidgetType.Column:
            const cw = widget;
            return { stack: cw.content.map(w => widgetToPdf(w, images, width)) };
        case AjfWidgetType.Formula:
            const fw = widget;
            return { text: fw.formula, margin: [0, 0, 0, marginBetweenWidgets] };
        default:
            return { text: '' };
    }
}
function layoutToPdf(lw, images, width) {
    const columns = [...lw.widget.columns];
    while (columns.length < lw.content.length) {
        columns.push(1);
    }
    const childWidth = width / (columns.length || 1);
    const children = [];
    for (let i = 0; i < lw.content.length; i++) {
        let child = widgetToPdf(lw.content[i], images, childWidth);
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
function imageToPdf(image, images, width) {
    if (image.widget.imageType !== AjfImageType.Image) {
        // Can't get icons to work, pdfs with multiple fonts don't seem to be working
        return { text: '' };
    }
    const dataUrl = images[image.url];
    if (dataUrl == null) {
        return { text: '' };
    }
    const w = image.styles.width;
    if (typeof (w) === 'string' && w.endsWith('px')) {
        width = Number(w.slice(0, -2));
    }
    return { image: dataUrl, width, margin: [0, 0, 0, marginBetweenWidgets] };
}
function htmlTextToPdfText(htmlText, images) {
    const iconText = images[htmlText];
    if (typeof (iconText) === 'string') {
        return iconText;
    }
    return stripHTML(htmlText);
}
function textToPdf(tw, images) {
    const text = {
        text: htmlTextToPdfText(tw.htmlText, images),
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
function tableToPdf(table, images) {
    if (table.data == null || table.data.length === 0) {
        return { text: '' };
    }
    const body = [];
    for (const dataRow of expandColAndRowSpan(table.data)) {
        const bodyRow = [];
        for (const cell of dataRow) {
            let text = '';
            switch (typeof (cell.value)) {
                case 'number':
                    text = String(cell.value);
                    break;
                case 'string':
                    text = htmlTextToPdfText(cell.value, images);
                    break;
                case 'object':
                    let val = cell.value.changingThisBreaksApplicationSecurity;
                    if (typeof (val) === 'number') {
                        val = String(val);
                    }
                    text = htmlTextToPdfText(val || '', images);
                    break;
            }
            bodyRow.push({ text, colSpan: cell.colspan, rowSpan: cell.rowspan });
        }
        body.push(bodyRow);
    }
    return { table: { headerRows: 0, body }, margin: [0, 0, 0, marginBetweenWidgets] };
}
// pdfmake wants placeholder cells after cells with col/rowspan > 1
function expandColAndRowSpan(data) {
    data = deepCopy(data);
    // expand colspan:
    for (const row of data) {
        for (let j = 0; j < row.length; j++) {
            const cell = row[j];
            for (let k = 1; k < (cell.colspan || 1); k++) {
                row.splice(j + k, 0, { rowspan: cell.rowspan, value: '', style: {} });
            }
        }
    }
    // expand rowspan:
    for (let i = 0; i < data.length; i++) {
        const row = data[i];
        for (let j = 0; j < row.length; j++) {
            const cell = row[j];
            for (let k = 1; k < (cell.rowspan || 1); k++) {
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

export { AjfAggregationSerializer, AjfAggregationType, AjfBaseWidgetComponent, AjfChartType, AjfDatasetSerializer, AjfGetColumnContentPipe, AjfReportContainerSerializer, AjfReportRenderer, AjfReportSerializer, AjfReportStringIdentifierPipe, AjfReportWidget, AjfReportsModule, AjfWidgetExport, AjfWidgetHost, AjfWidgetSerializer, AjfWidgetService, AjfWidgetType, chartToChartJsType, createAggregation, createReportInstance, createReportPdf, createWidget, createWidgetInstance, openReportPdf, reportFromForm, widgetToWidgetInstance };
//# sourceMappingURL=reports.mjs.map
