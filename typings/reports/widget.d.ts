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
import { AjfImageType } from '@ajf/core/image';
import { ChangeDetectorRef } from '@angular/core';
import { AjfChartWidgetInstance } from './interface/widgets-instances/chart-widget-instance';
import { AjfColumnWidgetInstance } from './interface/widgets-instances/column-widget-instance';
import { AjfFormulaWidgetInstance } from './interface/widgets-instances/formula-widget-instance';
import { AjfImageContainerWidgetInstance } from './interface/widgets-instances/image-container-widget-instance';
import { AjfImageWidgetInstance } from './interface/widgets-instances/image-widget-instance';
import { AjfLayoutWidgetInstance } from './interface/widgets-instances/layout-widget-instance';
import { AjfMapWidgetInstance } from './interface/widgets-instances/map-widget-instance';
import { AjfTableWidgetInstance } from './interface/widgets-instances/table-widget-instance';
import { AjfTextWidgetInstance } from './interface/widgets-instances/text-widget-instance';
import { AjfWidgetInstance } from './interface/widgets-instances/widget-instance';
import { AjfChartWidget } from './interface/widgets/chart-widget';
import { AjfImageWidget } from './interface/widgets/image-widget';
import { AjfLayoutWidget } from './interface/widgets/layout-widget';
import { AjfMapWidget } from './interface/widgets/map-widget';
import { AjfWidget } from './interface/widgets/widget';
import { AjfWidgetType } from './interface/widgets/widget-type';
export declare abstract class AjfWidgetRenderer {
    private _cdr;
    readonly widgetTypes: typeof AjfWidgetType;
    private _widget;
    readonly widget: AjfWidget | null;
    private _imageTypes;
    readonly imageTypes: typeof AjfImageType;
    private _widgetInstance;
    widgetInstance: AjfWidgetInstance;
    readonly columnInst: AjfColumnWidgetInstance;
    readonly imgwInst: AjfImageWidgetInstance;
    readonly imgw: AjfImageWidget;
    readonly imgcwInst: AjfImageContainerWidgetInstance;
    readonly imgcw: AjfImageWidget;
    readonly layoutwInst: AjfLayoutWidgetInstance;
    readonly layoutw: AjfLayoutWidget;
    readonly chartwInst: AjfChartWidgetInstance;
    readonly chartw: AjfChartWidget;
    readonly tablewInst: AjfTableWidgetInstance;
    readonly textwInst: AjfTextWidgetInstance;
    readonly mapwInst: AjfMapWidgetInstance;
    readonly mapw: AjfMapWidget;
    readonly formulawInst: AjfFormulaWidgetInstance;
    constructor(_cdr: ChangeDetectorRef);
}
