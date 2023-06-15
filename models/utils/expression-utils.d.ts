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
import { AjfTableCell } from '@ajf/core/table';
import { AjfValidationFn } from '../interface/validation-function';
export interface Form {
    [key: string]: string | number | null;
}
export interface Instances {
    [instance: string]: Form[];
}
export interface MainForm {
    [key: string]: string | number | boolean | null | Instances | undefined | null;
    reps?: Instances;
}
export declare const getCodeIdentifiers: (source: string, includeDollarValue?: boolean) => string[];
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
    isBefore: typeof dateFns.isBefore;
};
export declare class AjfExpressionUtils {
    static UTIL_FUNCTIONS: string;
    /**
     * It is a key-value dictionary, that mapping all Ajf validation functions.
     */
    static utils: {
        [name: string]: AjfValidationFn;
    };
}
export declare function evaluateExpression(expression: string, context?: AjfContext): any;
declare type Func = (c?: AjfContext) => any;
export declare function createFunction(expression: string): Func;
/**
 * It returns the count of digit inside x.
 */
export declare function digitCount(x: number): number;
/**
 * It is count the count of decimal digit inside s.
 */
export declare function decimalCount(x: string | number): number;
/**
 * It is true if x is an integer.
 */
export declare function isInt(x: string | number): boolean;
/**
 * It is true if x is not empty.
 */
export declare function notEmpty(x: any): boolean;
/**
 * It is true if array contains x or array is equal to x.
 */
export declare function valueInChoice(array: any[], x: any): boolean;
/**
 * It applies callback for reps times and accumulate the result in acc.
 */
export declare function scanGroupField(reps: number, acc: any, callback: any): any;
/**
 * It returns the sum of the array values.
 */
export declare function sum(array: any[]): any;
/**
 * It applies add/remove(operation) v (day/month/year)period to dstring and return new format date.
 */
export declare function dateOperations(dString: string, period: string, operation: string, v: any): string;
/**
 * It rounds the num with the value of digits
 */
export declare function round(num: number | string, digits?: number): number;
/**
 * It extracts property from source.
 * for every element of source if property and property2 are defined return the sum
 * else if only property is defined return him.
 */
export declare function extractArray(source: any[], property: string, property2?: string): any[];
/**
 * It returns the sum of all defined properties of each element of source.
 */
export declare function extractSum(source: any[], properties: string[]): number;
/**
 * It returns a number array that contains the sum of properties value inside the source.
 * extractArraySum([{a: 5}, {b: 1}, {a: 5, b: 1}], ['a', 'b']); =&gt; [6,6]
 */
export declare function extractArraySum(source: any[], properties: string[]): any[];
/**
 * Draw a threshold line on chart related to the property.
 */
export declare function drawThreshold(source: any[], property: string, threshold: any[]): any[];
/**
 * Extract the dates of the source object with property != null
 */
export declare function extractDates(source: any[], property: string, fmt: string): string[];
/**
 * Extract the last property contains in source != null
 */
export declare function lastProperty(source: any, property: string): any;
/**
 * It sum the LAst properties of source.
 */
export declare function sumLastProperties(source: any[], properties: string[]): number;
/**
 * Compute the trend of the property contained on the source.
 */
export declare function calculateTrendProperty(source: any[], property: string): string;
/**
 * Compute the average value of the property contained on the source.
 */
export declare function calculateTrendByProperties(source: any[], properties: string[]): string;
/**
 *
 */
export declare function calculateAvgProperty(source: any[], property: string, range: number, coefficient: number): number;
export declare function calculateAvgPropertyArray(source: any[], properties: string[], range: number, coefficient: number): number[];
export declare function alert(source: any[], property: string, threshold: number): string;
export declare function formatNumber(num: number, fmt?: string): string;
export declare function formatDate(date: Date | string, fmt?: string): string;
export declare function isoMonth(date: Date, fmt?: string): string;
export declare function getCoordinate(source: any, zoom?: number): [number, number, number];
/**
 * Returns an array containing all the values that the specified field takes in the forms.
 * The values are converted to strings.
 */
export declare function ALL_VALUES_OF(forms: MainForm[], field: string, filter?: Func | string): string[];
export declare function plainArray(params: any[]): any[];
/**
 * Returns the number of forms for which filter evaluates to true,
 * for the form itself or for any of its repetitions.
 */
export declare function COUNT_FORMS(forms: MainForm[], filter?: Func | string): number;
/**
 * Counts the forms and all of their repetitions for which filter evaluates to true.
 */
export declare function COUNT_REPS(forms: MainForm[], filter?: Func | string): number;
/**
 * Deprecated. Use LEN(ALL_VALUES_OF)
 */
export declare function COUNT_FORMS_UNIQUE(forms: MainForm[], field: string, filter?: Func | string): number;
/**
 * Aggregates and sums the values of the specified field.
 * An optional expression can be added to filter which forms to take for the sum.
 */
export declare function SUM(forms: (MainForm | Form)[], field: string, filter?: Func | string): number;
/**
 * Computes the mean of the values of the specified field.
 * An optional expression can be added to filter which forms to take for the sum.
 */
export declare function MEAN(forms: (Form | MainForm)[], field: string, filter?: Func | string): number;
/**
 * Calculates the % between two members.
 */
export declare function PERCENT(value1: number, value2: number): string;
/**
 * Evaluates the expression in the first form by date.
 */
export declare function FIRST(forms: (Form | MainForm)[], expression: Func | string, date?: string): any;
/**
 * Evaluates the expression in the last form by date.
 */
export declare function LAST(forms: (Form | MainForm)[], expression: Func | string, date?: string): any;
/**
 * Computes the max value of the field.
 */
export declare function MAX(forms: (Form | MainForm)[], field: string, filter?: Func | string): number;
/**
 * Computes the median value of the field.
 */
export declare function MEDIAN(forms: (Form | MainForm)[], field: string, filter?: Func | string): number;
/**
 * Computes the mode value of the field.
 */
export declare function MODE(forms: (Form | MainForm)[], field: string, filter?: Func | string): number;
export declare function buildDataset(dataset: (string | number | string[] | number[])[], colspans: number[]): AjfTableCell[][];
/**
 * Build a dataset for ajf dynamic table
 * @param dataset the dataset for the table
 * @param colspans colspan for each value in the dataset
 * @param textAlign alignment for each value in the dataset
 * @returns An AjfTableCell list
 */
export declare function buildAlignedDataset(dataset: (string | number | string[] | number[])[], colspans: number[], textAlign: string[]): AjfTableCell[][];
/**
 * Build a dataset based on a list of Forms, for ajf dynamic table
 * @param dataset the dataset for the table
 * @param fields the list of fields name for each row
 * @param rowLink the http link for the row, with the form field name with the link value and the column position for the link.
 * ie: {'link': 'home_link', 'position': 0}
 * @param backgroundColorA the first backgroud color
 * @param backgroundColorB the second backgroud color
 * @returns An AjfTableCell list
 */
export declare function buildFormDataset(dataset: MainForm[], fields: string[], rowLink: {
    link: string;
    position: number;
} | null, _backgroundColorA?: string, _backgroundColorB?: string): AjfTableCell[][];
/**
 * Build a dataset based on a list of Forms, for ajf dynamic table
 * @param dataset the dataset for the table
 * @param fields the list of fields name for each row
 * @param colspans colspan for each value in the dataset
 * @param textAlign alignment for each value in the dataset
 * @param rowLink the http link for the row, with the form field name with the link value and the column position for the link.
 * ie: {'link': 'home_link', 'position': 0}
 * @returns An AjfTableCell list
 */
export declare function buildAlignedFormDataset(dataset: MainForm[], fields: string[], colspans: number[], textAlign: string[], rowLink: {
    link: string;
    position: number;
} | null, dialogFields: string[], dialogLabelFields: string[]): AjfTableCell[][];
/**
 * create a widget dataset into a content list, based on a list of Forms, for paginated widget
 *
 * @param dataset the dataset for the widgets
 * @param fields the list of fields name for each row
 * @param rowLink the http link for the row, with the form field name with the link value and the column position for the link.
 * ie: {'link': 'home_link', 'position': 0}
 * @param cellStyles css styles for cells
 * @param rowStyle css styles for rows
 * @param percWidth an array with the same length of fields param, with the width for the columns.
 * ie: ['10%', '30%', '10%', '25%', '15%', '10%']
 * @param backgroundColorA the first backgroud color
 * @param backgroundColorB the second backgroud color
 * @returns An AjfTableWidget list
 */
export declare function buildWidgetDataset(dataset: MainForm[], fields: string[], rowLink: {
    link: string;
    position: number;
} | null, cellStyles: {
    [key: string]: any;
} | null, rowStyle: {
    [key: string]: any;
} | null, percWidth: string[], backgroundColorA?: string, backgroundColorB?: string): any[];
/**
 * create a widget dataset into a content list, based on a list of Forms, for paginated widget.
 * Each row is a AjfDialogWidget and, on click, open a dialog.
 *
 * @param dataset the dataset for the widgets
 * @param fields the list of fields name for each row
 * @param dialogFields the list of fields name to show in the dialog
 * @param dialogLabelFields the list of labels for each dialogFields
 * @param rowLink the http link for the row, with the form field name with the link value and the column position for the link.
 * ie: {'link': 'home_link', 'position': 0}
 * @param cellStyles css styles for cells
 * @param rowStyle css styles for rows
 * @param percWidth an array with the same length of fields param, with the width for the columns.
 * ie: ['10%', '30%', '10%', '25%', '15%', '10%']
 * @param backgroundColorA the first backgroud color
 * @param backgroundColorB the second backgroud color
 * @returns An AjfDialogWidget list
 */
export declare function buildWidgetDatasetWithDialog(dataset: MainForm[], fields: string[], dialogFields: string[], dialogLabelFields: string[], cellStyles: {
    [key: string]: any;
} | null, rowStyle: {
    [key: string]: any;
} | null, percWidth: string[], backgroundColorA?: string, backgroundColorB?: string): any[];
/**
 * Deprecated. Use MAP
 */
export declare function REPEAT(forms: MainForm[], array: string[], fn: any, arg1: string, arg2?: string): any[];
/**
 * Maps func to the elements of array.
 */
export declare function MAP(array: any[], func: (a: any) => any): any[];
/**
 * For each form in forms, the specified field is set with the value given by expression.
 * The form's fields can be used inside expression.
 */
export declare function APPLY(forms: MainForm[], field: string, expression: Func | string): MainForm[];
/**
 * Rounds num to the specified number of digits after the point (or zero).
 */
export declare function ROUND(num: number | string, digits?: number): number;
/**
 * Deprecated. Use IF
 */
export declare function EVALUATE(condition: string, branch1: any, branch2: any): any;
/**
 * Tells if arr includes elem
 */
export declare function INCLUDES(arr: (any[]) | string, elem: any): boolean;
/**
 * This function builds a data structure that allows the use of the hindikit formulas
 * for every forms with repeating slides.
 * In particular, it builds a main data form with all the data relating to the slides and
 * a dictionary with the name reps thus made instance slideName forms.
 * Where a form is associated with each instance of the repeating slide.
 * example:
 * simple form:
 *  {
 *    $value: "AGO"
 *    cittadinanza__0: "AGO"
 *    codice_fiscale__0: "jdfljglòkòkò"
 *    country__0: "AGO"
 *    date_end: "2021-01-10"
 *    date_start: "2021-01-10"
 *    dob__0: "2021-03-11"
 *    first_name__0: "pippo"
 *    gender__0: "f"
 *    id_family: "3bef3a3f-d95d-4a09-8df4-e812c55c61c6"
 *    istruzione__0: null
 *    last_name__0: "pippo"
 *    permesso_soggiorno__0: "no"
 *    relazione__0: "genitore"
 *    solidando: "solidando1"
 *    stato_civile__0: null
 *  }
 * after BUILD_DATASET
 * MainForm:
 * {
 *    $value: "AGO"
 *    ajf_form_id: 0 ** added atribute that rappresent the index position insides input form list.
 *    ajf_family_component_count: 1** added atribute that rappresent the instance number of famili_component repeating slides.
 *    date_end: "2021-01-10"
 *    date_start: "2021-01-10"
 *    id_family: "3bef3a3f-d95d-4a09-8df4-e812c55c61c6"
 *    reps: {
 *      family_component: [
 *        {
 *          ajf_family_component_rep: 0 ** added atribute that rappresent the order instance of family_component repeating slide.
 *          cittadinanza: "AGO"
 *          codice_fiscale: "jdfljglòkòkò"
 *          country: "AGO"
 *          dob: "2021-03-11"
 *          first_name: "pippo"
 *          gender: "f"
 *          istruzione: null
 *          last_name: "pippo"
 *          permesso_soggiorno: "no"
 *          relazione: "genitore"
 *          stato_civile: null
 *        }
 *      ]
 *    }
 * }
 *
 * @param {Form[]} forms
 * @param {*} [schema] if schema is provided the instances inside the reps match with effective
 * slide name. Otherwise all repeating slides are associates to generic slide name "rep".
 * @return {*}  {MainForm[]}
 */
export declare function BUILD_DATASET(forms: Form[], schema?: any): MainForm[];
/**
 * Returns a clone of forms, where the specified fields are replaced by the corresponding labels,
 * as defined by the choice origins in schema.
 *
 * @param {MainForm[]} formList
 * @param {*} schema the ajf schema
 * @param {string[]} fieldNames
 * @return {*}  {MainForm[]}
 */
export declare function APPLY_LABELS(formList: MainForm[], schema: any, fieldNames: string[]): MainForm[];
/**
 * Deprecated. Use FILTER_BY
 */
export declare function FILTER_BY_VARS(formList: MainForm[], expression: string): MainForm[];
/**
 * Returns a copy of forms and its repetitions, keeping only the ones for which expression evaluates to true.
 */
export declare function FILTER_BY(forms: MainForm[], expression: Func | string): MainForm[];
/**
 * Returns today's date.
 *
 * @export
 * @return {*}  {string}
 */
export declare function TODAY(): string;
/**
 * Logs val to the console.
 *
 * @export
 * @param {*} val
 */
export declare function CONSOLE_LOG(val: any): any;
/**
 * Computes the current age in years, given the date of birth.
 *
 * @export
 * @param {(string | null)} dob
 * @param {(string | undefined)} when
 * @return {*}  {number}
 */
export declare function GET_AGE(dob: string | null, when?: string): number;
/**
 * If data is a form with repetitions, returns the number of repetitions;
 * If data is an array, returns its length;
 * Otherwise returns 0.
 *
 * @export
 * @param {(MainForm | any[])} dataset
 * @return {*}  {number}
 */
export declare function LEN(dataset: MainForm | any[]): number;
/**
 * Array concatenation.
 *
 * @export
 * @param {any[]} a
 * @param {any[]} b
 * @return {*}  {any[]}
 */
export declare function CONCAT(a: any[], b: any[]): any[];
/**
 * Removes duplicate elements from an array.
 *
 * @export
 * @param {any[]} arr
 * @return {*}  {any[]}
 */
export declare function REMOVE_DUPLICATES(arr: any[]): any[];
export declare function ADD_DAYS(date: string, days: number): string;
export declare function DAYS_DIFF(a: string, b: string): number;
/**
 * Returns true if date is before dateToCompare.
 *
 * @export
 * @param {string} date
 * @param {string} dateToCompare
 * @return {*}  {boolean}
 */
export declare function IS_BEFORE(date: string, dateToCompare: string): boolean;
/**
 * Returns true if date is after dateToCompare.
 *
 * @export
 * @param {string} date
 * @param {string} dateToCompare
 * @return {*}  {boolean}
 */
export declare function IS_AFTER(date: string, dateToCompare: string): boolean;
/**
 * Returns true if date is between dateStart and dateEnd.
 *
 * @export
 * @param {string} date
 * @param {string} dateStart
 * @param {string} dateEnd
 * @return {*}  {boolean}
 */
export declare function IS_WITHIN_INTERVAL(date: string, dateStart: string, dateEnd: string): boolean;
/**
 * Compares date with an interval.
 * Returns '-1' (or the first element of labels) if date is before dateStart,
 * '0' (or the second element) if date is between dateStart and dateEnd,
 * '1' (or the third element) if date is after dateEnd.
 *
 * @export
 * @param {string} date
 * @param {string} dateStart
 * @param {string} dateEnd
 * @param {string[]} labels an optional array of string for the output values
 * @return {*}  {string}
 */
export declare function COMPARE_DATE(date: string, dateStart: string, dateEnd: string, labels?: string[]): string;
/**
 * Performs a left join of formsA and formsB.
 */
export declare function JOIN_FORMS(formsA: (MainForm | Form)[], formsB: (MainForm | Form)[], keyA: string, keyB?: string): (MainForm | Form)[];
/**
 * Performs a left join of formsA and formsB, like JOIN_FORMS.
 * In addition, for each matching pair of formA and formB, their repeating slides are also joined.
 */
export declare function JOIN_REPEATING_SLIDES(formsA: MainForm[], formsB: MainForm[], keyA: string, keyB: string, subkeyA: string, subkeyB?: string): MainForm[];
/**
 * Returns the array obtained by evaluating expression for every repetition of form.
 *
 * @export
 * @param {MainForm} form
 * @param {string} expression
 * @return {*}  {any[]}
 */
export declare function FROM_REPS(form: MainForm, expression: Func | string): any[];
/**
 * Deprecated. Use INCLUDES
 */
export declare function ISIN(dataset: any[], value: any): boolean;
/**
 * Applies the operator to every pair of elements (arrayA[i], arrayB[i]),
 * returning the array of results.
 */
export declare function OP(arrayA: any[], arrayB: any[], operator: ((a: any, b: any) => any) | string): any[];
/**
 * Given an array of values, returns the corresponding array of labels,
 * as specified by the choices origin in schema.
 *
 * @export
 * @param {*} schema
 * @param {string[]} values
 * @return {*}  {string[]}
 */
export declare function GET_LABELS(schema: any, values: string[]): string[];
export {};
