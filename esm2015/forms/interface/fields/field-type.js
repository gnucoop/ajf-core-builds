/**
 * @fileoverview added by tsickle
 * Generated from: src/core/forms/interface/fields/field-type.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGQtdHlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2Zvcm1zL2ludGVyZmFjZS9maWVsZHMvZmllbGQtdHlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF1QkEsTUFBWSxZQUFZO0lBQ3RCLE1BQU0sR0FBQTtJQUNOLElBQUksR0FBQTtJQUNKLE1BQU0sR0FBQTtJQUNOLE9BQU8sR0FBQTtJQUNQLFlBQVksR0FBQTtJQUNaLGNBQWMsR0FBQTtJQUNkLE9BQU8sR0FBQTtJQUNQLEtBQUssR0FBQTtJQUNMLElBQUksR0FBQTtJQUNKLFNBQVMsR0FBQTtJQUNULElBQUksSUFBQTtJQUNKLEtBQUssSUFBQTtJQUNMLFdBQVcsSUFBQTtJQUNYLE9BQU8sSUFBQTtJQUNQLE1BQU0sSUFBQTtFQUNQIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6cHJlZmVyLWNvbnN0LWVudW1cbmV4cG9ydCBlbnVtIEFqZkZpZWxkVHlwZSB7XG4gIFN0cmluZyxcbiAgVGV4dCxcbiAgTnVtYmVyLFxuICBCb29sZWFuLFxuICBTaW5nbGVDaG9pY2UsXG4gIE11bHRpcGxlQ2hvaWNlLFxuICBGb3JtdWxhLFxuICBFbXB0eSxcbiAgRGF0ZSxcbiAgRGF0ZUlucHV0LFxuICBUaW1lLFxuICBUYWJsZSxcbiAgR2VvbG9jYXRpb24sXG4gIEJhcmNvZGUsXG4gIExFTkdUSFxufVxuIl19