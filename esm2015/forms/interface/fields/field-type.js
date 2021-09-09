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
// tslint:disable-next-line:prefer-const-enum
export var AjfFieldType;
(function (AjfFieldType) {
    AjfFieldType[AjfFieldType["String"] = 0] = "String";
    AjfFieldType[AjfFieldType["Text"] = 1] = "Text";
    AjfFieldType[AjfFieldType["Number"] = 2] = "Number";
    AjfFieldType[AjfFieldType["Boolean"] = 3] = "Boolean";
    AjfFieldType[AjfFieldType["SingleChoice"] = 4] = "SingleChoice";
    AjfFieldType[AjfFieldType["MultipleChoice"] = 5] = "MultipleChoice";
    AjfFieldType[AjfFieldType["Formula"] = 6] = "Formula";
    AjfFieldType[AjfFieldType["Empty"] = 7] = "Empty";
    AjfFieldType[AjfFieldType["Date"] = 8] = "Date";
    AjfFieldType[AjfFieldType["DateInput"] = 9] = "DateInput";
    AjfFieldType[AjfFieldType["Time"] = 10] = "Time";
    AjfFieldType[AjfFieldType["Table"] = 11] = "Table";
    AjfFieldType[AjfFieldType["Geolocation"] = 12] = "Geolocation";
    AjfFieldType[AjfFieldType["Barcode"] = 13] = "Barcode";
    AjfFieldType[AjfFieldType["File"] = 14] = "File";
    AjfFieldType[AjfFieldType["Image"] = 15] = "Image";
    AjfFieldType[AjfFieldType["VideoUrl"] = 16] = "VideoUrl";
    AjfFieldType[AjfFieldType["Range"] = 17] = "Range";
    AjfFieldType[AjfFieldType["LENGTH"] = 18] = "LENGTH";
})(AjfFieldType || (AjfFieldType = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGQtdHlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2Zvcm1zL2ludGVyZmFjZS9maWVsZHMvZmllbGQtdHlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCw2Q0FBNkM7QUFDN0MsTUFBTSxDQUFOLElBQVksWUFvQlg7QUFwQkQsV0FBWSxZQUFZO0lBQ3RCLG1EQUFNLENBQUE7SUFDTiwrQ0FBSSxDQUFBO0lBQ0osbURBQU0sQ0FBQTtJQUNOLHFEQUFPLENBQUE7SUFDUCwrREFBWSxDQUFBO0lBQ1osbUVBQWMsQ0FBQTtJQUNkLHFEQUFPLENBQUE7SUFDUCxpREFBSyxDQUFBO0lBQ0wsK0NBQUksQ0FBQTtJQUNKLHlEQUFTLENBQUE7SUFDVCxnREFBSSxDQUFBO0lBQ0osa0RBQUssQ0FBQTtJQUNMLDhEQUFXLENBQUE7SUFDWCxzREFBTyxDQUFBO0lBQ1AsZ0RBQUksQ0FBQTtJQUNKLGtEQUFLLENBQUE7SUFDTCx3REFBUSxDQUFBO0lBQ1Isa0RBQUssQ0FBQTtJQUNMLG9EQUFNLENBQUE7QUFDUixDQUFDLEVBcEJXLFlBQVksS0FBWixZQUFZLFFBb0J2QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnByZWZlci1jb25zdC1lbnVtXG5leHBvcnQgZW51bSBBamZGaWVsZFR5cGUge1xuICBTdHJpbmcsXG4gIFRleHQsXG4gIE51bWJlcixcbiAgQm9vbGVhbixcbiAgU2luZ2xlQ2hvaWNlLFxuICBNdWx0aXBsZUNob2ljZSxcbiAgRm9ybXVsYSxcbiAgRW1wdHksXG4gIERhdGUsXG4gIERhdGVJbnB1dCxcbiAgVGltZSxcbiAgVGFibGUsXG4gIEdlb2xvY2F0aW9uLFxuICBCYXJjb2RlLFxuICBGaWxlLFxuICBJbWFnZSxcbiAgVmlkZW9VcmwsXG4gIFJhbmdlLFxuICBMRU5HVEhcbn1cbiJdfQ==