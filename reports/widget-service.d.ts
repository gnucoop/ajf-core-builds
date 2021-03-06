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
import { Type } from '@angular/core';
import { AjfBaseWidgetComponent } from './base-widget';
import { AjfWidgetComponentsMap } from './interface/widgets/widget-components-map';
export declare abstract class AjfWidgetService {
    readonly componentsMap: AjfWidgetComponentsMap;
    constructor(defaultWidgets: AjfWidgetComponentsMap);
    registerCustomWidget(widget: {
        widgetType: number;
        component: Type<AjfBaseWidgetComponent>;
        inputs?: {
            [key: string]: any;
        };
    }): void;
}
