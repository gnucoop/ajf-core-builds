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
import { AjfImageIcon, AjfImageType } from '@ajf/core/image';
import { AjfCondition, AjfFormula, AjfJsonSerializable } from '@ajf/core/models';
import { AjfChartType } from './charts';
import { AjfChartDataset, AjfDataset, AjfTableDataset } from './dataset';
import { AjfReportStyles } from './report-styles';
import { ChartOptions } from 'chart.js';
/**
 * Report widget types. They are mainly divided in layout and data widgets.
 * Layout widgets (Layout, PageBreak, Image, Text) are used to display static
 * content or for layout purposes.
 * Data widgets (Chart, Table, Map) are used to display the data of a report
 * instance (@see AjfReportInstance).
 * All data widgets and the PageBreak widget can have no content
 */
export declare enum AjfReportWidgetType {
    Layout = 0,
    PageBreak = 1,
    Image = 2,
    Text = 3,
    Chart = 4,
    Table = 5,
    Map = 6,
    Column = 7,
    Formula = 8,
    ImageContainer = 9,
    LENGTH = 10
}
export declare enum AjfReportDataType {
    EPI = 0,
    Month = 1,
    Year = 2,
    LENGTH = 3
}
export interface AjfReportCustomWidget {
    json: string;
    type: string;
}
/**
 * Base abstract class that represent a report widget.
 *
 */
export declare abstract class AjfReportWidget extends AjfJsonSerializable {
    /**
     * The sub-widgets contained inside this widget
     */
    content: AjfReportWidget[];
    /**
     * A dictionary of CSS-styles applied to the widget
     */
    styles: AjfReportStyles;
    /**
     * The condition under which the widget is visible
     *
     * @memberOf AjfReportWidget
     */
    visibility: AjfCondition;
    /**
     * True if the current widget can contain sub-widgets
     */
    abstract readonly hasContent: boolean;
    /**
     * Creates a report widget from its JSON representation
     *
     * @param obj: any The JSON representation
     * @throws 'Widget type missing' when the JSON representation lacks of a widget type
     * @throws 'Invalid widget type' when the JSON representation contains an invalid widget type
     * @return AjfReportWidget The report widget
     */
    static fromJson(obj: any): AjfReportWidget;
    protected static parseJsonObject(obj: any): any;
    /**
     * Creates a report widget given a widget type (@see AjfReportWidgetType)
     */
    static createWidget(widgetType: AjfReportWidgetType, obj?: any): AjfReportWidget;
    /**
     * The widget type (@see AjfReportWidgetType)
     */
    readonly widgetType: AjfReportWidgetType;
    constructor(obj?: any);
}
export declare class AjfReportLayoutWidget extends AjfReportWidget {
    columns: number[];
    readonly hasContent: boolean;
    constructor(obj?: any);
}
export declare class AjfReportColumnWidget extends AjfReportWidget {
    readonly hasContent: boolean;
    constructor(obj?: any);
}
export declare class AjfReportPageBreakWidget extends AjfReportWidget {
    readonly hasContent: boolean;
    constructor(obj?: any);
}
export declare class AjfReportImageWidget extends AjfReportWidget {
    readonly hasContent: boolean;
    private _imageType;
    imageType: AjfImageType;
    private _icon;
    icon: AjfFormula | null;
    private _flag;
    flag: AjfFormula | null;
    private _url;
    url: AjfFormula | null;
    setUrl(imageUrl: string): void;
    setIcon(icon: AjfImageIcon): void;
    setFlag(flag: string): void;
    constructor(obj?: any);
}
export declare class AjfReportImageContainerWidget extends AjfReportWidget {
    readonly hasContent: boolean;
    private _imageType;
    imageType: AjfImageType;
    urls: AjfFormula | string[];
    flags: AjfFormula | string[];
    icons: AjfFormula | AjfFormula[];
    constructor(obj?: any);
}
export declare class AjfReportTextWidget extends AjfReportWidget {
    private _htmlText;
    htmlText: string;
    readonly hasContent: boolean;
    constructor(obj?: any);
}
export declare class AjfReportFormulaWidget extends AjfReportWidget {
    private _formula;
    formula: AjfFormula;
    readonly hasContent: boolean;
    constructor(obj?: any);
}
export declare abstract class AjfReportDataWidget extends AjfReportWidget {
    readonly hasContent: boolean;
    dataset: AjfDataset[] | AjfDataset[][];
    constructor(obj?: any);
}
/**
 * Concrete class for manage chart.
 *
 *
 *
 * @throws 'labels or data or backgroundColor or borderColor missed'
 *         if the length of arrays passed by obj are not the same
 */
export declare class AjfReportChartWidget extends AjfReportDataWidget {
    chartType: AjfChartType;
    labels: AjfFormula | AjfFormula[];
    dataset: AjfChartDataset[];
    options: ChartOptions;
    constructor(obj?: any);
}
export declare class AjfReportTableWidget extends AjfReportDataWidget {
    cellStyles: any;
    dataset: AjfTableDataset[][];
    constructor(obj?: any);
}
export declare class AjfReportMapWidget extends AjfReportDataWidget {
    coordinate: AjfFormula;
    tileLayer: string;
    attribution: string;
    disabled: boolean;
    readonly coordinateMap: AjfFormula | null;
    readonly tileLayerMap: string;
    readonly attributionMap: string;
    readonly disabledMap: boolean;
    constructor(obj?: any);
}
