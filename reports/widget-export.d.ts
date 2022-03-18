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
import { AjfTableCell } from '@ajf/core/table';
import { ChartData } from 'chart.js';
import { AjfWidgetType } from './interface/widgets/widget-type';
import * as i0 from "@angular/core";
export declare class AjfWidgetExport {
    widgetType: AjfWidgetType | undefined;
    data: ChartData | AjfTableCell[][] | undefined;
    overlay: boolean;
    enable: boolean;
    showOverlay: boolean;
    private static _iconsMap;
    /**
     * Allows rendering html icons as text.
     */
    static addIcons(icons: {
        [html: string]: string;
    }): void;
    constructor();
    /**
     * Export widget data in CSV format
     * @deprecated Use `AjfWidgetExport.export` with 'csv' parameter.
     * @breaking-change 13.0.0
     */
    exportCsv(): void;
    /**
     * Export widget data in Xlsx format
     * @deprecated Use `AjfWidgetExport.export` with 'xlsx' parameter.
     * @breaking-change 13.0.0
     */
    exportXlsx(): void;
    /**
     * Export widget data in CSV or Xlsx format
     */
    export(bookType: 'csv' | 'xlsx'): void;
    private _buildXlsxData;
    private _buildTitle;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfWidgetExport, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfWidgetExport, "ajf-widget-export", never, { "widgetType": "widgetType"; "data": "data"; "overlay": "overlay"; "enable": "enable"; }, {}, never, ["*"]>;
}
