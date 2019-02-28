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
import { addDays, addMonths, addYears, endOfISOWeek, format, getDay, parse, startOfMonth, startOfISOWeek } from 'date-fns';
export declare const dateUtils: {
    addDays: typeof addDays;
    addMonths: typeof addMonths;
    addYears: typeof addYears;
    endOfISOWeek: typeof endOfISOWeek;
    format: typeof format;
    getDay: typeof getDay;
    parse: typeof parse;
    startOfMonth: typeof startOfMonth;
    startOfISOWeek: typeof startOfISOWeek;
};
export declare function digitCount(x: number): number;
export declare function decimalCount(x: string | number): number;
export declare function isInt(x: string): boolean;
export declare function notEmpty(x: any): boolean;
export declare function valueInChoice(array: any[], x: any): boolean;
export declare function scanGroupField(reps: number, acc: any, callback: any): any;
export declare function sum(array: any[]): any;
export declare function dateOperations(dString: string, period: string, operation: string, v: any): string;
export declare function round(num: number | string, digits: number): number;
export declare function extractArray(source: any[], property: string, property2?: string): any[];
export declare function extractSum(source: any[], properties: string[]): number;
export declare function extractArraySum(source: any[], properties: string[]): any[];
export declare function drawThreshold(source: any[], property: string, treshold: any[]): any[];
export declare function extractDates(source: any[], property: string, fmt: string): string[];
export declare function lastProperty(source: any, property: string): any;
export declare function sumLastProperties(source: any[], properties: string[]): number;
export declare function calculateTrendProperty(source: any[], property: string): string;
export declare function calculateTrendByProperties(source: any[], properties: string[]): string;
export declare function calculateAvgProperty(source: any[], property: string, range: number, coefficient: number): number;
export declare function calculateAvgPropertyArray(source: any[], properties: string[], range: number, coefficient: number): number[];
export declare function alert(source: any[], property: string, treshold: number): string;
export declare function formatNumber(num: number, fmt?: string): string;
export declare function formatDate(date: Date, fmt?: string): string;
export declare function isoMonth(date: Date, fmt?: string): string;
export declare function getCoordinate(source: any, zoom?: number): [number, number, number];
