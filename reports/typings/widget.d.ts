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
import { ChangeDetectorRef } from '@angular/core';
import { AjfImageType } from '@ajf/core/image';
import { AjfReportChartWidgetInstance, AjfReportFormulaWidgetInstance, AjfReportImageContainerWidgetInstance, AjfReportImageWidgetInstance, AjfReportLayoutWidgetInstance, AjfReportMapWidgetInstance, AjfReportTableWidgetInstance, AjfReportTextWidgetInstance, AjfReportWidgetInstance } from './widgets-instances';
import { AjfReportChartWidget, AjfReportImageWidget, AjfReportLayoutWidget, AjfReportMapWidget, AjfReportWidget, AjfReportWidgetType } from './widgets';
export declare abstract class AjfReportWidgetRenderer {
    private _cdr;
    readonly widgetTypes: typeof AjfReportWidgetType;
    private _widget;
    readonly widget: AjfReportWidget | null;
    private _imageTypes;
    readonly imageTypes: typeof AjfImageType;
    private _widgetInstance;
    widgetInstance: AjfReportWidgetInstance;
    readonly imgwInst: AjfReportImageWidgetInstance;
    readonly imgw: AjfReportImageWidget;
    readonly imgcwInst: AjfReportImageContainerWidgetInstance;
    readonly imgcw: AjfReportImageWidget;
    readonly layoutwInst: AjfReportLayoutWidgetInstance;
    readonly layoutw: AjfReportLayoutWidget;
    readonly chartwInst: AjfReportChartWidgetInstance;
    readonly chartw: AjfReportChartWidget;
    readonly tablewInst: AjfReportTableWidgetInstance;
    readonly textwInst: AjfReportTextWidgetInstance;
    readonly mapwInst: AjfReportMapWidgetInstance;
    readonly mapw: AjfReportMapWidget;
    readonly formulawInst: AjfReportFormulaWidgetInstance;
    constructor(_cdr: ChangeDetectorRef);
}
