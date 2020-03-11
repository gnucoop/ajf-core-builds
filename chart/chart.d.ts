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
import { AfterViewInit, ElementRef, OnChanges, Renderer2, SimpleChanges } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import 'chart.piecelabel.js';
import { ExtendedChartType } from './extended-chart-type';
export declare class AjfChartComponent implements AfterViewInit, OnChanges {
    private _el;
    private _renderer;
    data: ChartData;
    options: ChartOptions;
    chartType: ExtendedChartType;
    private _chart;
    private _chartCanvasElement;
    private _chartTypesNeedPoints;
    constructor(_el: ElementRef, _renderer: Renderer2);
    ngAfterViewInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    private _fixData;
    private _updateChart;
    private _rebuildChart;
    private _fixChartOptions;
}
