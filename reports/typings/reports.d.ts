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
import { AjfForm } from '@ajf/core/forms';
import { AjfJsonSerializable } from '@ajf/core/models';
import { AjfReportStyles } from './report-styles';
import { AjfReportWidget } from './widgets';
export declare class AjfReportContainer extends AjfJsonSerializable {
    private _content;
    readonly content: AjfReportWidget[];
    private _styles;
    readonly styles: AjfReportStyles;
    static fromJson(obj: any): AjfReportContainer;
    constructor(obj?: any);
}
/**
 * Class that represents a report.
 * A report is defined as three trees of report widgets (@see AjfReportWidget),
 * displayed each in the header / content / footer of the report.
 *
 */
export declare class AjfReport extends AjfJsonSerializable {
    /**
     * Collection of widgets that compose the report header
     */
    private _header;
    readonly header: AjfReportContainer;
    /**
     * Collection of widgets that compose the report footer
     */
    private _footer;
    readonly footer: AjfReportContainer;
    /**
     * Collection of widgets that compose the report content
     */
    private _content;
    readonly content: AjfReportContainer;
    private _styles;
    styles: AjfReportStyles;
    /**
     * collection of forms that generate the report variables
     *
     * @memberOf AjfReport
     */
    private _forms;
    forms: AjfForm[];
    /**
     * Creates a report starting from a JSON representation.
     * The form definition can be nested in the report JSON.
     * @param obj : any The JSON representation of the report
     * @param form : AjfForm The form that defines the data structure
     * @return AjfReport The report
     */
    static fromJson(obj: any, forms?: AjfForm[]): AjfReport;
    /**
     * Creates a report.
     * @param form : AjfForm The form that defines the data structure
     * @param obj : any Report initial data
     */
    constructor(forms: AjfForm[], obj?: any);
}
