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
import { TranslateService } from '@ngx-translate/core';
import { ChartData } from 'chart.js';
import { Observable } from 'rxjs';
import { ExtendedChartType } from '@ajf/core/chart';
import { AjfTableCell } from '@ajf/core/table';
import { AjfReportStyles } from './report-styles';
import { AjfReportDataWidget, AjfReportWidget, AjfReportWidgetType } from './widgets';
export declare class AjfReportWidgetInstance {
    ts: TranslateService;
    protected _widget: AjfReportWidget;
    readonly widget: AjfReportWidget;
    private _visible;
    readonly visible: boolean;
    private _content;
    readonly content: AjfReportWidgetInstance[];
    private _styles;
    readonly styles: AjfReportStyles;
    private _widgetType;
    readonly widgetType: AjfReportWidgetType | null;
    protected _context: any;
    static create(widget: AjfReportWidget, context: any, ts: TranslateService): AjfReportWidgetInstance;
    constructor(widget: AjfReportWidget, context: any, ts: TranslateService);
    initContext(context: any): void;
    protected _initInstance(): void;
    private _populateContent;
    private _evaluateVisibility;
}
export declare class AjfReportDataWidgetInstance extends AjfReportWidgetInstance {
    readonly widget: AjfReportDataWidget;
    private _dataset;
    readonly dataset: any;
    constructor(widget: AjfReportDataWidget, context: any, ts: TranslateService);
    initContext(context: any): void;
    protected _initInstance(): void;
    private _populateData;
}
export declare class AjfReportLayoutWidgetInstance extends AjfReportWidgetInstance {
    constructor(widget: AjfReportWidget, context: any, ts: TranslateService);
    getColumnContent(column: number): AjfReportWidgetInstance | null;
}
export declare class AjfReportColumnWidgetInstance extends AjfReportWidgetInstance {
    constructor(widget: AjfReportWidget, context: any, ts: TranslateService);
}
export declare class AjfReportPageBreakWidgetInstance extends AjfReportWidgetInstance {
    constructor(widget: AjfReportWidget, context: any, ts: TranslateService);
}
export declare class AjfReportImageWidgetInstance extends AjfReportWidgetInstance {
    private _icon;
    readonly icon: string;
    private _flag;
    readonly flag: string;
    private _url;
    readonly url: string;
    initContext(context: any): void;
}
export declare class AjfReportImageContainerWidgetInstance extends AjfReportWidgetInstance {
    private _icons;
    readonly icons: string[];
    private _flags;
    readonly flags: string[];
    private _urls;
    readonly urls: string[];
    initContext(context: any): void;
}
export declare class AjfReportTextWidgetInstance extends AjfReportWidgetInstance {
    private _htmlText;
    readonly htmlText: string;
    initContext(context: any): void;
}
export declare class AjfReportTableWidgetInstance extends AjfReportWidgetInstance {
    private _data;
    readonly data: AjfTableCell[][];
    private _recalcEvt;
    private _recalc;
    readonly recalc: Observable<boolean>;
    constructor(widget: AjfReportWidget, context: any, ts: TranslateService);
    initContext(context: any): void;
    calcValues(context: any): void;
}
export declare class AjfReportChartWidgetInstance extends AjfReportDataWidgetInstance {
    private _datasets;
    private _labels;
    private _data;
    readonly data: ChartData;
    private _chartType;
    readonly chartType: ExtendedChartType;
    constructor(widget: AjfReportDataWidget, context: any, ts: TranslateService);
    private _translate;
    initContext(context: any): void;
}
export declare class AjfReportMapWidgetInstance extends AjfReportDataWidgetInstance {
    coordinate: number[];
    initContext(context: any): void;
}
export declare class AjfReportFormulaWidgetInstance extends AjfReportWidgetInstance {
    private _formula;
    readonly formula: string;
    initContext(context: any): void;
}
