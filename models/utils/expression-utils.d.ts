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
import { AjfContext } from '@ajf/core/common';
import * as dateFns from 'date-fns';
import { AjfValidationFn } from '../interface/validation-function';
export interface Form {
    [key: string]: string | number | null;
}
export declare const dateUtils: {
    addDays: typeof dateFns.addDays;
    addMonths: typeof dateFns.addMonths;
    addYears: typeof dateFns.addYears;
    endOfISOWeek: typeof dateFns.endOfISOWeek;
    format: typeof dateFns.format;
    getDay: typeof dateFns.getDay;
    parse: typeof dateFns.parseISO;
    startOfMonth: typeof dateFns.startOfMonth;
    startOfISOWeek: typeof dateFns.startOfISOWeek;
};
export declare class AjfExpressionUtils {
    static UTIL_FUNCTIONS: string;
    static utils: {
        [name: string]: AjfValidationFn;
    };
}
export declare function evaluateExpression(expression: string, context?: AjfContext, forceFormula?: string): any;
export declare function digitCount(x: number): number;
export declare function decimalCount(x: string | number): number;
export declare function isInt(x: string | number): boolean;
export declare function notEmpty(x: any): boolean;
export declare function valueInChoice(array: any[], x: any): boolean;
export declare function scanGroupField(reps: number, acc: any, callback: any): any;
export declare function sum(array: any[]): any;
export declare function dateOperations(dString: string, period: string, operation: string, v: any): string;
export declare function round(num: number | string, digits: number): number;
export declare function extractArray(source: any[], property: string, property2?: string): any[];
export declare function extractSum(source: any[], properties: string[]): number;
export declare function extractArraySum(source: any[], properties: string[]): any[];
export declare function drawThreshold(source: any[], property: string, threshold: any[]): any[];
export declare function extractDates(source: any[], property: string, fmt: string): string[];
export declare function lastProperty(source: any, property: string): any;
export declare function sumLastProperties(source: any[], properties: string[]): number;
export declare function calculateTrendProperty(source: any[], property: string): string;
export declare function calculateTrendByProperties(source: any[], properties: string[]): string;
export declare function calculateAvgProperty(source: any[], property: string, range: number, coefficient: number): number;
export declare function calculateAvgPropertyArray(source: any[], properties: string[], range: number, coefficient: number): number[];
export declare function alert(source: any[], property: string, threshold: number): string;
export declare function formatNumber(num: number, fmt?: string): string;
export declare function formatDate(date: Date | string, fmt?: string): string;
export declare function isoMonth(date: Date, fmt?: string): string;
export declare function getCoordinate(source: any, zoom?: number): [number, number, number];
/**
 * Counts the collected forms. The form name must be specified. An optional condition can be added
 * to discriminate which forms to count in.
 */
export declare function COUNTFORMS(forms: Form[], expression?: string): number;
/**
 * Counts the amount of unique form values for a specific field. The form name must be specified. An
 * optional condition can be added to discriminate which forms to count in
 */
export declare function COUNTFORMS_UNIQUE(forms: Form[], fieldName: string, expression?: string): number;
/**
 * Aggregates and sums the values of one or more. An optional condition can be added to discriminate
 * which forms to take for the sum.
 */
export declare function SUM(forms: Form[], expression: string, condition?: string): number;
/**
 * Calculates the mean of a simple or derived value. An optional condition can be added to
 * discriminate which forms to take for the sum.
 */
export declare function MEAN(forms: Form[], expression: string): number;
/**
 * Calculates the % between two members.
 */
export declare function PERCENT(value1: number, value2: number): string;
/**
 * Calculates the expression in the last form by date.
 */
export declare function LAST(forms: Form[], expression: string, date?: string): number;
/**
 * Calculates the max value of the field.
 */
export declare function MAX(forms: Form[], fieldName: string): number;
/**
 * Calculates the median value of the field.
 */
export declare function MEDIAN(forms: Form[], fieldName: string): number;
/**
 * Calculates the mode value of the field.
 */
export declare function MODE(forms: Form[], fieldName: string): number[];
