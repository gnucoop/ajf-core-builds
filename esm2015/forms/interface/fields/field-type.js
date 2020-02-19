/**
 * @fileoverview added by tsickle
 * Generated from: src/core/forms/interface/fields/field-type.ts
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
const AjfFieldType = {
    String: 0,
    Text: 1,
    Number: 2,
    Boolean: 3,
    SingleChoice: 4,
    MultipleChoice: 5,
    Formula: 6,
    Empty: 7,
    Date: 8,
    DateInput: 9,
    Time: 10,
    Table: 11,
    Geolocation: 12,
    Barcode: 13,
    LENGTH: 14,
};
export { AjfFieldType };
AjfFieldType[AjfFieldType.String] = 'String';
AjfFieldType[AjfFieldType.Text] = 'Text';
AjfFieldType[AjfFieldType.Number] = 'Number';
AjfFieldType[AjfFieldType.Boolean] = 'Boolean';
AjfFieldType[AjfFieldType.SingleChoice] = 'SingleChoice';
AjfFieldType[AjfFieldType.MultipleChoice] = 'MultipleChoice';
AjfFieldType[AjfFieldType.Formula] = 'Formula';
AjfFieldType[AjfFieldType.Empty] = 'Empty';
AjfFieldType[AjfFieldType.Date] = 'Date';
AjfFieldType[AjfFieldType.DateInput] = 'DateInput';
AjfFieldType[AjfFieldType.Time] = 'Time';
AjfFieldType[AjfFieldType.Table] = 'Table';
AjfFieldType[AjfFieldType.Geolocation] = 'Geolocation';
AjfFieldType[AjfFieldType.Barcode] = 'Barcode';
AjfFieldType[AjfFieldType.LENGTH] = 'LENGTH';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGQtdHlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2Zvcm1zL2ludGVyZmFjZS9maWVsZHMvZmllbGQtdHlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzQkEsTUFBWSxZQUFZO0lBQ3RCLE1BQU0sR0FBQTtJQUNOLElBQUksR0FBQTtJQUNKLE1BQU0sR0FBQTtJQUNOLE9BQU8sR0FBQTtJQUNQLFlBQVksR0FBQTtJQUNaLGNBQWMsR0FBQTtJQUNkLE9BQU8sR0FBQTtJQUNQLEtBQUssR0FBQTtJQUNMLElBQUksR0FBQTtJQUNKLFNBQVMsR0FBQTtJQUNULElBQUksSUFBQTtJQUNKLEtBQUssSUFBQTtJQUNMLFdBQVcsSUFBQTtJQUNYLE9BQU8sSUFBQTtJQUNQLE1BQU0sSUFBQTtFQUNQIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSAyMDE4IEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmV4cG9ydCBlbnVtIEFqZkZpZWxkVHlwZSB7XG4gIFN0cmluZyxcbiAgVGV4dCxcbiAgTnVtYmVyLFxuICBCb29sZWFuLFxuICBTaW5nbGVDaG9pY2UsXG4gIE11bHRpcGxlQ2hvaWNlLFxuICBGb3JtdWxhLFxuICBFbXB0eSxcbiAgRGF0ZSxcbiAgRGF0ZUlucHV0LFxuICBUaW1lLFxuICBUYWJsZSxcbiAgR2VvbG9jYXRpb24sXG4gIEJhcmNvZGUsXG4gIExFTkdUSFxufVxuIl19