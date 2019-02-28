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
import { AjfCondition, AjfJsonSerializable } from '@ajf/core/models';
/**
 * This class will define an ajf warning result
 */
export declare class AjfWarningResult {
    result: boolean;
    warning: string;
    /**
     * this constructor will assign the parameters value to a class variables
     * @param res : boolean
     * @param wrn : string
     */
    constructor(res: boolean, wrn: string);
}
/**
 * This class will define an ajf warning
 */
export declare class AjfWarning extends AjfCondition {
    warningMessage: string;
    /**
     * this static method will load an AjfWarning from json
     * @param obj  : any - object warning
     * @return AjfWarning
     */
    static fromJson(obj: any): AjfWarning;
    static getNotEmptyWarning(): AjfWarning;
    /**
     * this constructor will assign the obj value to a class variables and call
     * super()
     */
    constructor(obj?: any);
    /**
     * this public method will evaluate context or forceFormula
     * @param context      : any - context
     * @param forceFormula : string - formula
     * @return AjfWarningResult
     */
    evaluate(context?: any, forceFormula?: string): AjfWarningResult;
}
/**
 * This class will define an ajf warning group
 */
export declare class AjfWarningGroup extends AjfJsonSerializable {
    notEmpty: AjfWarning | null;
    conditions: AjfWarning[];
    /**
     * this static method will load an AjfWarningGroup from json
     * @param obj  : any - object warningGroup
     * @return AjfValidationGroup
     */
    static fromJson(obj: any): AjfWarningGroup;
    /**
     * this constructor will assign the obj value to a class variables
     * @param obj : any
     */
    constructor(obj?: any);
    /**
     * this protected method evaluate conditions
     * @param context : any
     * @return AjfWarningResult[]
     */
    protected _evaluateConditions(context: any): AjfWarningResult[];
    /**
     * this public method evaluate
     * @param value   : any
     * @param context : any
     * @return AjfWarningResult[]
     */
    evaluate(context?: any): AjfWarningResult[];
}
