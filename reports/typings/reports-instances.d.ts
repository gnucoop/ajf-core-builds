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
import { AjfReport, AjfReportContainer } from './reports';
import { AjfReportStyles } from './report-styles';
import { AjfReportWidgetInstance } from './widgets-instances';
export declare class AjfReportContainerInstance {
    private _ts;
    private _container;
    readonly container: AjfReportContainer;
    private _content;
    readonly content: AjfReportWidgetInstance[];
    private _styles;
    readonly styles: AjfReportStyles;
    private _context;
    constructor(container: AjfReportContainer, context: any, _ts: TranslateService);
    private _populateContent;
    private _translate;
}
/**
 * A report instance. Report + data
 */
export declare class AjfReportInstance {
    private _ts;
    /**
     * The report
     */
    private _report;
    readonly report: AjfReport;
    private _header;
    readonly header: AjfReportContainerInstance;
    private _content;
    readonly content: AjfReportContainerInstance;
    private _footer;
    readonly footer: AjfReportContainerInstance;
    private _data;
    readonly data: any;
    readonly styles: AjfReportStyles;
    private _context;
    readonly context: any;
    constructor(report: AjfReport, context: any, _ts: TranslateService);
    private _populateReport;
    private _populateContainer;
}
