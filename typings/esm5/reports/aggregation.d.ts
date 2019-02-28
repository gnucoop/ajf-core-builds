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
export declare enum AjfAggregationType {
    None = 0,
    Sum = 1,
    Average = 2,
    WeightedAverage = 3,
    LENGTH = 4
}
/**
 * This class will define an ajf aggregator
 */
export declare class AjfAggregation extends AjfJsonSerializable {
    aggregation: AjfAggregationType;
    /**
     * this static method will load an AjfAggregator from json
     * @param obj : any - object aggregator
     * @return AjfFormula
     */
    static fromJson(obj: any): AjfAggregation;
    /**
     *
     * @param obj
     */
    constructor(obj?: any);
    evaluate(formulas: AjfFormula[], context: any): number[];
}
