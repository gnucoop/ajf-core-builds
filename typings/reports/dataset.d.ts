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
import { AjfFormula, AjfJsonSerializable } from '@ajf/core/models';
import { AjfAggregation } from './aggregation';
import { AjfChartDatasetOptions, AjfChartType } from './charts';
/**
 * This class will define an ajf dataset
 */
export declare class AjfDataset extends AjfJsonSerializable {
    formula: AjfFormula | AjfFormula[];
    aggregation: AjfAggregation;
    label: string;
    /**
     * this static method will load an AjfDataset from json
     * @param obj : any - object formula
     * @return AjfFormula
     */
    static fromJson(obj: any): AjfDataset;
    protected static _parseJsonObject(obj: any): any;
    /**
     *
     * @param obj
     */
    constructor(obj?: any);
}
export declare class AjfTableDataset extends AjfDataset {
    formula: AjfFormula;
    colspan: number;
    rowspan: number;
    style: any;
    constructor(obj?: any);
    static fromJson(obj: any): AjfTableDataset;
}
export declare class AjfChartDataset extends AjfDataset {
    formula: AjfFormula[];
    chartType?: AjfChartType;
    options?: AjfChartDatasetOptions;
    datalabels?: any;
    constructor(obj?: any);
    static fromJson(obj: any): AjfChartDataset;
}
