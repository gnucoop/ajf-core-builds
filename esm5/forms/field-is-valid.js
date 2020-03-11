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
import { Pipe } from '@angular/core';
var AjfFieldIsValidPipe = /** @class */ (function () {
    function AjfFieldIsValidPipe() {
    }
    AjfFieldIsValidPipe.prototype.transform = function (validationResults) {
        return validationResults != null
            && validationResults.filter(function (f) { return !f.result; }).length === 0;
    };
    AjfFieldIsValidPipe.decorators = [
        { type: Pipe, args: [{ name: 'ajfFieldIsValid' },] }
    ];
    return AjfFieldIsValidPipe;
}());
export { AjfFieldIsValidPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGQtaXMtdmFsaWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9mb3Jtcy9maWVsZC1pcy12YWxpZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQUMsSUFBSSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBSW5DO0lBQUE7SUFNQSxDQUFDO0lBSkcsdUNBQVMsR0FBVCxVQUFVLGlCQUF5QztRQUMvQyxPQUFPLGlCQUFpQixJQUFJLElBQUk7ZUFDekIsaUJBQWlCLENBQUMsTUFBTSxDQUFDLFVBQUMsQ0FBQyxJQUFLLE9BQUEsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFULENBQVMsQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUM7SUFDbkUsQ0FBQzs7Z0JBTEosSUFBSSxTQUFDLEVBQUMsSUFBSSxFQUFFLGlCQUFpQixFQUFDOztJQU0vQiwwQkFBQztDQUFBLEFBTkQsSUFNQztTQUxZLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtQaXBlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtBamZWYWxpZGF0aW9uUmVzdWx0fSBmcm9tICcuL2ludGVyZmFjZS92YWxpZGF0aW9uL3ZhbGlkYXRpb24tcmVzdWx0cyc7XG5cbkBQaXBlKHtuYW1lOiAnYWpmRmllbGRJc1ZhbGlkJ30pXG5leHBvcnQgY2xhc3MgQWpmRmllbGRJc1ZhbGlkUGlwZSB7XG4gICAgdHJhbnNmb3JtKHZhbGlkYXRpb25SZXN1bHRzPzogQWpmVmFsaWRhdGlvblJlc3VsdFtdKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB2YWxpZGF0aW9uUmVzdWx0cyAhPSBudWxsXG4gICAgICAgICAgICAmJiB2YWxpZGF0aW9uUmVzdWx0cy5maWx0ZXIoKGYpID0+ICFmLnJlc3VsdCkubGVuZ3RoID09PSAwO1xuICAgIH1cbn1cbiJdfQ==