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
export declare function evaluateExpression(expression: string, context?: AjfContext, forceFormula?: string): any;
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
 * Calculates all the possible results that a field has taken
 */
export declare function ALL_VALUES_OF(mainforms: MainForm[], fieldName: string): string[];
export declare function plainArray(params: any[]): any[];
/**
 * Counts the collected forms. The form name must be specified. An optional condition can be added
 * to discriminate which forms to count in.
 * the expression is first evaluated in mainForm if false the evaluation of expression is calculated
 * in any reps. If expression is true in reps the form is counted
 */
export declare function COUNT_FORMS(formList: MainForm[], expression?: string): number;
/**
 * Counts the reps of the form.
 * the expression is first evaluated in mainForm  if true return all reps counting else the evaluation of expression is calculated
 * in any reps and return the count of all reps that satisfied the expression.
 */
export declare function COUNT_REPS(formList: MainForm[], expression?: string): number;
/**
 * Counts the amount of unique form values for a specific field. The form name must be specified. An
 * optional condition can be added to discriminate which forms to count in
 */
export declare function COUNT_FORMS_UNIQUE(formList: MainForm[], fieldName: string, expression?: string): number;
/**
 * Aggregates and sums the values of one field. An optional condition can be added to discriminate
 * which forms to take for the sum.
 */
export declare function SUM(mainForms: (MainForm | Form)[], field: string, condition?: string): number;
/**
 * Calculates the mean of a simple or derived value. An optional condition can be added to
 * discriminate which forms to take for the sum.
 */
export declare function MEAN(forms: (Form | MainForm)[], fieldName: string): string;
/**
 * Calculates the % between two members.
 */
export declare function PERCENT(value1: number, value2: number): string;
/**
 * Calculates the expression in the last form by date.
 */
export declare function LAST(forms: (Form | MainForm)[], expression: string, date?: string): string;
/**
 * Calculates the max value of the field.
 */
export declare function MAX(forms: (Form | MainForm)[], fieldName: string): number;
/**
 * Calculates the median value of the field.
 */
export declare function MEDIAN(forms: (Form | MainForm)[], fieldName: string): string;
/**
 * Calculates the mode value of the field.
 */
export declare function MODE(forms: (Form | MainForm)[], fieldName: string): number[];
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
 *
 * @param forms the form data
 * @param iterations all values of iteration
 * @param fn the fuction of expression-utils to apply at iteration
 * @param param1 first param of fn
 * @param param2 second param of fn
 * @returns the result of fn applied to all values param conditions
 * &current is an anchor key, The params with &current will be modified with the iteration values.
 */
export declare function REPEAT(forms: MainForm[], iterations: string[], fn: AjfValidationFn, param1: string, param2?: string): any[];
/**
 * this function allow to define a new attribute of mainform.
 * the attribute field will be added on every form and it takes the result of expression calculated
 * for every mainform
 *
 * @export
 * @param {MainForm[]} formList
 * @param {string} field
 * @param {string} expression
 * @return {*}  {MainForm[]}
 */
export declare function APPLY(formList: MainForm[], field: string, expression: string): MainForm[];
/**
 * this function round a number,
 * if you need can be define de digits of round
 *
 * @export
 * @param {(number | string)} num
 * @param {number} [digits]
 * @return {*}  {number}
 */
export declare function ROUND(num: number | string, digits?: number): number;
/**
 * this function evalueate a condition if true return branch1 else branch2
 *
 * @export
 * @param {string} condition
 * @param {*} branch1
 * @param {*} branch2
 * @return {*}  {*}
 */
export declare function EVALUATE(condition: string, branch1: any, branch2: any): any;
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
 * This function take a list of forms, an ajf schema and a list of field names as input and builds
 * a data structure that replace a list of label matched inside a schema choiche origins.
 *
 * @param {MainForm[]} formList
 * @param {*} schema the ajf schema
 * @param {string[]} fieldNames
 * @return {*}  {MainForm[]}
 */
export declare function APPLY_LABELS(formList: MainForm[], schema: any, fieldNames: string[]): MainForm[];
/**
 *
 * @param {MainForm[]} formList a set of main forms
 * @param {string} expression to be evaluated, also with report variables values.
 * @return {*}  {MainForm[]}
 */
export declare function FILTER_BY_VARS(formList: MainForm[], expression: string): MainForm[];
/**
 * This function build a partition of formList by execution of expression.
 * For every mainForm the expression match mainform field and replace it.
 * If the evaluation of expression is true the mainForm was added to partition
 * (that becouse the expression don't has repeating slide fields) else if
 * there are reps for every rep the expression is updated with replacing of
 * repeating slide instance fields and evaluated, if true was added to partition.
 * All ajf attributes wad updated. /TODO
 *
 *
 * @param {MainForm[]} formList a set of main forms
 * @param {string} expression to be evaluated. that can be able to contains another
 * hindikit functions or mainForm fields or reps fields.
 * @return {*}  {MainForm[]}
 */
export declare function FILTER_BY(formList: MainForm[], expression: string): MainForm[];
/**
 * return the today date
 *
 * @export
 * @param {string} [format='yyyy-MM-dd']
 * @return {*}  {string}
 */
export declare function TODAY(format?: string): string;
/**
 * UTILITY FUNCTION
 *  this function allow the console log of excel variables.
 * @export
 * @param {*} val
 * @param {string} [text='log: ']
 */
export declare function CONSOLE_LOG(val: any, text?: string): void;
/**
 * this function take a string date and return the difference in year from dob to today.
 *
 * @export
 * @param {(string | null)} dob
 * @return {*}  {number}
 */
export declare function GET_AGE(dob: string | null): number;
/**
 * this function returns reps length if reps in defined or the length of dataset if dataset is array-
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
/**
 * return true if date is before then dateToCompare
 *
 * @export
 * @param {string} date
 * @param {string} dateToCompare
 * @return {*}  {boolean}
 */
export declare function IS_BEFORE(date: string, dateToCompare: string): boolean;
/**
 * return true if date is after then dateToCompare
 *
 * @export
 * @param {string} date
 * @param {string} dateToCompare
 * @return {*}  {boolean}
 */
export declare function IS_AFTER(date: string, dateToCompare: string): boolean;
/**
 * return true if date is whithin interval from dateStart to dateEnd
 *
 * @export
 * @param {string} date
 * @param {string} dateStart
 * @param {string} dateEnd
 * @return {*}  {boolean}
 */
export declare function IS_WITHIN_INTERVAL(date: string, dateStart: string, dateEnd: string): boolean;
/**
 * compare a date with two dates interval. Return '-1' (or the first element of labels array) if date
 * is before the dateStart, '1' (or the second element) if date is after the dateEnd
 * or '0' (or the last element) if date is within inteval.
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
 * this function extend formsA dataset.
 * search all match of keyA in formsB, if found if merge formA and formB.
 *
 * @export
 * @param {string} keyA
 * @param {string} [keyB]
 * @return {*}
 */
export declare function JOIN_FORMS(formsA: (MainForm | Form)[], formsB: (MainForm | Form)[], keyA: string, keyB?: string): (MainForm | Form)[];
/**
 * like JOIN_FORMS but extends the behaviour on the reps.
 * search all match of subKeyA in formB
 *
 * @export
 * @param {MainForm[]} formsA
 * @param {MainForm[]} formsB
 * @param {string} keyA
 * @param {string} keyB
 * @param {string} subKeyA
 * @param {string} [subKeyB]
 * @return {*}  {MainForm[]}
 */
export declare function JOIN_REPEATING_SLIDES(formsA: MainForm[], formsB: MainForm[], keyA: string, keyB: string, subKeyA: string, subKeyB?: string): MainForm[];
/**
 * this function extract an array of evaluated expression from main form reps.
 *
 * @export
 * @param {MainForm} mainForm
 * @param {string} expression
 * @return {*}  {any[]}
 */
export declare function FROM_REPS(mainForm: MainForm, expression: string): any[];
/**
 * this function return true if value is inside of dataset
 *
 * @export
 * @param {any[]} dataset
 * @param {*} value
 * @return {*}  {boolean}
 */
export declare function ISIN(dataset: any[], value: any): boolean;
/**
 * the lengths of the datasets are assumed to be the same.
 * this function return an array list of calculated values.
 * each element of the array is calculated by replacing elemA with the current element of a
 * and elemB with the current element of b inside the expression.
 *
 * @export
 * @param {number[]} datasetA
 * @param {number[]} datasetB
 * @param {string} expression
 * @return {*}  {number[]}
 */
export declare function OP(datasetA: number[], datasetB: number[], expression: string): number[];
/**
 * this function take a ajf schema and a list of values as input and
 * returns a list of label matched inside a schema choiche origins.
 *
 * @export
 * @param {*} schema
 * @param {string[]} values
 * @return {*}  {string[]}
 */
export declare function GET_LABELS(schema: any, values: string[]): string[];
