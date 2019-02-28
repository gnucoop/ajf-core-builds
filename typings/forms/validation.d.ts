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
export declare class AjfValidationResult {
    result: boolean;
    error: string;
    clientValidation: boolean;
    /**
     * this constructor will assign the parameters value to a class variables
     * @param res : boolean
     * @param err : string
     * @cVal : boolean
     */
    constructor(res: boolean, err: string, cVal: boolean);
}
/**
 * This class will define an ajf validation
 */
export declare class AjfValidation extends AjfCondition {
    clientValidation: boolean;
    errorMessage: string;
    /**
     * this static method will load an AjfValidation from json
     * @param obj  : any - object validation
     * @return AjfValidation
     */
    static fromJson(obj: any): AjfValidation;
    /**
     * this static method will get an ajfValidation with maxValue setted
     * @param maxValue : number - max value
     * @return AjfValidation
     */
    static getMaxCondition(maxValue: number): AjfValidation;
    /**
     * this static method will get an ajfValidation with minValue setted
     * @param minValue : number - min value
     * @return AjfValidation
     */
    static getMinCondition(minValue: number): AjfValidation;
    /**
     * this static method will get an ajfValidation with notEmpty setted
     * @return AjfValidation
     */
    static getNotEmptyCondition(): AjfValidation;
    /**
     * this static method will get an ajfValidation with maxDigit setted
     * @return AjfValidation
     */
    static getMaxDigitsCondition(maxValue: number): AjfValidation;
    /**
     * this static method will get an ajfValidation with minDigit setted
     * @return AjfValidation
     */
    static getMinDigitsCondition(minValue: number): AjfValidation;
    /**
     * this constructor will assign the obj value to a class variables and call
     * super()
     */
    constructor(obj?: any);
    /**
     * this public method will evaluate context or forceFormula
     * @param context      : any - context
     * @param forceFormula : string - formula
     * @return AjfValidationResult
     */
    evaluate(context?: any, forceFormula?: string): AjfValidationResult;
}
/**
 * This class will define an ajf validation group
 */
export declare class AjfValidationGroup extends AjfJsonSerializable {
    forceValue: AjfCondition;
    maxValue: AjfValidation | null;
    minValue: AjfValidation | null;
    notEmpty: AjfValidation | null;
    maxDigits: AjfValidation | null;
    minDigits: AjfValidation | null;
    conditions: AjfValidation[];
    /**
     * this static method will load an AjfValidationGroup from json
     * @param obj  : any - object validationGroup
     * @return AjfValidationGroup
     */
    static fromJson(obj: any): AjfValidationGroup;
    /**
     * this constructor will assign the obj value to a class variables
     * @param obj : any
     */
    constructor(obj?: any);
    toJson(): any;
    /**
     * this protected method evaluate max value
     * @param value : any
     * @return AjfValidationResult
     */
    protected _evaluateMaxValue(value: any): AjfValidationResult | null;
    /**
     * this protected method evaluate min value
     * @param value : any
     * @return AjfValidationResult
     */
    protected _evaluateMinvalue(value: any): AjfValidationResult | null;
    /**
     * this protected method evaluate not empty value
     * @param value : any
     * @return AjfValidationResult
     */
    protected _evaluateNotEmpty(value: any): AjfValidationResult | null;
    /**
     * this protected method evaluate conditions
     * @param context : any
     * @return AjfValidationResult[]
     */
    protected _evaluateConditions(context: any): AjfValidationResult[];
    /**
     * this public method evaluate
     * @param value   : any
     * @param context : any
     * @return AjfValidationResult[]
     */
    evaluate(value: any, context?: any): AjfValidationResult[];
    /**
     * this public method evaluate force value
     * @param context : any
     * @return string
     */
    evaluateForceValue(context: any): any;
}
