/**
 * @fileoverview added by tsickle
 * Generated from: src/core/reports/interface/charts/chart-type.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnQtdHlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL3JlcG9ydHMvaW50ZXJmYWNlL2NoYXJ0cy9jaGFydC10eXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCQSxNQUFZLFlBQVk7SUFDdEIsSUFBSSxHQUFBO0lBQ0osR0FBRyxHQUFBO0lBQ0gsYUFBYSxHQUFBO0lBQ2IsS0FBSyxHQUFBO0lBQ0wsT0FBTyxHQUFBO0lBQ1AsUUFBUSxHQUFBO0lBQ1IsR0FBRyxHQUFBO0lBQ0gsU0FBUyxHQUFBO0lBQ1QsTUFBTSxHQUFBO0lBQ04sTUFBTSxHQUFBO0VBQ1AiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmV4cG9ydCBlbnVtIEFqZkNoYXJ0VHlwZSB7XG4gIExpbmUsXG4gIEJhcixcbiAgSG9yaXpvbnRhbEJhcixcbiAgUmFkYXIsXG4gIFNjYXR0ZXIsXG4gIERvdWdobnV0LFxuICBQaWUsXG4gIFBvbGFyQXJlYSxcbiAgQnViYmxlLFxuICBMRU5HVEhcbn1cbiJdfQ==