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
import { AjfJsonSerializable } from './json';
export declare type AjfValidationFn = {
    fn: any;
};
/**
 * This abstract class will define an ajf validated property
 */
export declare abstract class AjfValidatedProperty extends AjfJsonSerializable {
    static UTIL_FUNCTIONS: string;
    private static _execContext;
    private static _cachedContext;
    private static _cachedContextString;
    /**
     * this method will load an AjfNode from json
     * @param obj                : any - object node
     * @param choicesOrigins     : any[] - array of choicesOrigins
     * @param attachmentsOrigins : any[] - array of attachmentsOrigins
     * @return AjfNode
     */
    static validate(str: string, context?: any): boolean;
    /**
     * this public static method will get context string
     * @param context : any - context
     * @return string
     */
    static getContextString(context?: any): string;
    abstract getValidationFormula(): string;
    /**
     * this public method will evaluate context or forceFormula
     * @param context      : any - context
     * @param forceFormula : string - formula
     * @return string
     */
    evaluate(context?: any, forceFormula?: string): any;
    static utils: {
        [name: string]: AjfValidationFn;
    };
    static nextCounterValue(counterName: string, firstValue: number): any;
}
