import { AfterViewInit, ElementRef, OnChanges, Renderer2, SimpleChanges } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { ExtendedChartType } from './extended-chart-type';
import * as i0 from "@angular/core";
interface ChartWidgetInstance {
    canvasDataUrl?(): string;
}
export declare class AjfChartComponent implements AfterViewInit, OnChanges {
    private _el;
    private _renderer;
    data?: ChartData;
    options?: ChartOptions;
    chartType?: ExtendedChartType;
    instance?: ChartWidgetInstance;
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
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfChartComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfChartComponent, "ajf-chart", never, { "data": "data"; "options": "options"; "chartType": "chartType"; "instance": "instance"; }, {}, never, never, false, never>;
}
export {};
