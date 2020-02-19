/**
 * @fileoverview added by tsickle
 * Generated from: src/core/reports/interface/widgets/widget-type.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
/** @enum {number} */
const AjfWidgetType = {
    Layout: 0,
    PageBreak: 1,
    Image: 2,
    Text: 3,
    Chart: 4,
    Table: 5,
    Map: 6,
    Column: 7,
    Formula: 8,
    ImageContainer: 9,
    LENGTH: 10,
};
export { AjfWidgetType };
AjfWidgetType[AjfWidgetType.Layout] = 'Layout';
AjfWidgetType[AjfWidgetType.PageBreak] = 'PageBreak';
AjfWidgetType[AjfWidgetType.Image] = 'Image';
AjfWidgetType[AjfWidgetType.Text] = 'Text';
AjfWidgetType[AjfWidgetType.Chart] = 'Chart';
AjfWidgetType[AjfWidgetType.Table] = 'Table';
AjfWidgetType[AjfWidgetType.Map] = 'Map';
AjfWidgetType[AjfWidgetType.Column] = 'Column';
AjfWidgetType[AjfWidgetType.Formula] = 'Formula';
AjfWidgetType[AjfWidgetType.ImageContainer] = 'ImageContainer';
AjfWidgetType[AjfWidgetType.LENGTH] = 'LENGTH';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0LXR5cGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9yZXBvcnRzL2ludGVyZmFjZS93aWRnZXRzL3dpZGdldC10eXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCQSxNQUFZLGFBQWE7SUFDdkIsTUFBTSxHQUFBO0lBQ04sU0FBUyxHQUFBO0lBQ1QsS0FBSyxHQUFBO0lBQ0wsSUFBSSxHQUFBO0lBQ0osS0FBSyxHQUFBO0lBQ0wsS0FBSyxHQUFBO0lBQ0wsR0FBRyxHQUFBO0lBQ0gsTUFBTSxHQUFBO0lBQ04sT0FBTyxHQUFBO0lBQ1AsY0FBYyxHQUFBO0lBQ2QsTUFBTSxJQUFBO0VBQ1AiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTggR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuZXhwb3J0IGVudW0gQWpmV2lkZ2V0VHlwZSB7XG4gIExheW91dCxcbiAgUGFnZUJyZWFrLFxuICBJbWFnZSxcbiAgVGV4dCxcbiAgQ2hhcnQsXG4gIFRhYmxlLFxuICBNYXAsXG4gIENvbHVtbixcbiAgRm9ybXVsYSxcbiAgSW1hZ2VDb250YWluZXIsXG4gIExFTkdUSFxufVxuIl19