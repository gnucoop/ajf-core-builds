/**
 * @fileoverview added by tsickle
 * Generated from: src/core/reports/interface/widgets/widget-type.ts
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
    DynamicTable: 10,
    LENGTH: 11,
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
AjfWidgetType[AjfWidgetType.DynamicTable] = 'DynamicTable';
AjfWidgetType[AjfWidgetType.LENGTH] = 'LENGTH';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0LXR5cGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9yZXBvcnRzL2ludGVyZmFjZS93aWRnZXRzL3dpZGdldC10eXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXVCQSxNQUFZLGFBQWE7SUFDdkIsTUFBTSxHQUFBO0lBQ04sU0FBUyxHQUFBO0lBQ1QsS0FBSyxHQUFBO0lBQ0wsSUFBSSxHQUFBO0lBQ0osS0FBSyxHQUFBO0lBQ0wsS0FBSyxHQUFBO0lBQ0wsR0FBRyxHQUFBO0lBQ0gsTUFBTSxHQUFBO0lBQ04sT0FBTyxHQUFBO0lBQ1AsY0FBYyxHQUFBO0lBQ2QsWUFBWSxJQUFBO0lBQ1osTUFBTSxJQUFBO0VBQ1AiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpwcmVmZXItY29uc3QtZW51bVxuZXhwb3J0IGVudW0gQWpmV2lkZ2V0VHlwZSB7XG4gIExheW91dCxcbiAgUGFnZUJyZWFrLFxuICBJbWFnZSxcbiAgVGV4dCxcbiAgQ2hhcnQsXG4gIFRhYmxlLFxuICBNYXAsXG4gIENvbHVtbixcbiAgRm9ybXVsYSxcbiAgSW1hZ2VDb250YWluZXIsXG4gIER5bmFtaWNUYWJsZSxcbiAgTEVOR1RIXG59XG4iXX0=