/**
 * @fileoverview added by tsickle
 * Generated from: src/core/reports/interface/charts/chart-type.ts
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
const AjfChartType = {
    Line: 0,
    Bar: 1,
    HorizontalBar: 2,
    Radar: 3,
    Scatter: 4,
    Doughnut: 5,
    Pie: 6,
    PolarArea: 7,
    Bubble: 8,
    LENGTH: 9,
};
export { AjfChartType };
AjfChartType[AjfChartType.Line] = 'Line';
AjfChartType[AjfChartType.Bar] = 'Bar';
AjfChartType[AjfChartType.HorizontalBar] = 'HorizontalBar';
AjfChartType[AjfChartType.Radar] = 'Radar';
AjfChartType[AjfChartType.Scatter] = 'Scatter';
AjfChartType[AjfChartType.Doughnut] = 'Doughnut';
AjfChartType[AjfChartType.Pie] = 'Pie';
AjfChartType[AjfChartType.PolarArea] = 'PolarArea';
AjfChartType[AjfChartType.Bubble] = 'Bubble';
AjfChartType[AjfChartType.LENGTH] = 'LENGTH';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnQtdHlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL3JlcG9ydHMvaW50ZXJmYWNlL2NoYXJ0cy9jaGFydC10eXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCQSxNQUFZLFlBQVk7SUFDdEIsSUFBSSxHQUFBO0lBQ0osR0FBRyxHQUFBO0lBQ0gsYUFBYSxHQUFBO0lBQ2IsS0FBSyxHQUFBO0lBQ0wsT0FBTyxHQUFBO0lBQ1AsUUFBUSxHQUFBO0lBQ1IsR0FBRyxHQUFBO0lBQ0gsU0FBUyxHQUFBO0lBQ1QsTUFBTSxHQUFBO0lBQ04sTUFBTSxHQUFBO0VBQ1AiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTggR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuZXhwb3J0IGVudW0gQWpmQ2hhcnRUeXBlIHtcbiAgTGluZSxcbiAgQmFyLFxuICBIb3Jpem9udGFsQmFyLFxuICBSYWRhcixcbiAgU2NhdHRlcixcbiAgRG91Z2hudXQsXG4gIFBpZSxcbiAgUG9sYXJBcmVhLFxuICBCdWJibGUsXG4gIExFTkdUSFxufVxuIl19