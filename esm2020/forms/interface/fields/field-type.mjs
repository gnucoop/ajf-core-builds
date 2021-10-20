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
/**
 * The available ajf field types.
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGQtdHlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2Zvcm1zL2ludGVyZmFjZS9maWVsZHMvZmllbGQtdHlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSDs7R0FFRztBQUNILDZDQUE2QztBQUM3QyxNQUFNLENBQU4sSUFBWSxZQW9CWDtBQXBCRCxXQUFZLFlBQVk7SUFDdEIsbURBQU0sQ0FBQTtJQUNOLCtDQUFJLENBQUE7SUFDSixtREFBTSxDQUFBO0lBQ04scURBQU8sQ0FBQTtJQUNQLCtEQUFZLENBQUE7SUFDWixtRUFBYyxDQUFBO0lBQ2QscURBQU8sQ0FBQTtJQUNQLGlEQUFLLENBQUE7SUFDTCwrQ0FBSSxDQUFBO0lBQ0oseURBQVMsQ0FBQTtJQUNULGdEQUFJLENBQUE7SUFDSixrREFBSyxDQUFBO0lBQ0wsOERBQVcsQ0FBQTtJQUNYLHNEQUFPLENBQUE7SUFDUCxnREFBSSxDQUFBO0lBQ0osa0RBQUssQ0FBQTtJQUNMLHdEQUFRLENBQUE7SUFDUixrREFBSyxDQUFBO0lBQ0wsb0RBQU0sQ0FBQTtBQUNSLENBQUMsRUFwQlcsWUFBWSxLQUFaLFlBQVksUUFvQnZCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG4vKipcbiAqIFRoZSBhdmFpbGFibGUgYWpmIGZpZWxkIHR5cGVzLlxuICovXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6cHJlZmVyLWNvbnN0LWVudW1cbmV4cG9ydCBlbnVtIEFqZkZpZWxkVHlwZSB7XG4gIFN0cmluZyxcbiAgVGV4dCxcbiAgTnVtYmVyLFxuICBCb29sZWFuLFxuICBTaW5nbGVDaG9pY2UsXG4gIE11bHRpcGxlQ2hvaWNlLFxuICBGb3JtdWxhLFxuICBFbXB0eSxcbiAgRGF0ZSxcbiAgRGF0ZUlucHV0LFxuICBUaW1lLFxuICBUYWJsZSxcbiAgR2VvbG9jYXRpb24sXG4gIEJhcmNvZGUsXG4gIEZpbGUsXG4gIEltYWdlLFxuICBWaWRlb1VybCxcbiAgUmFuZ2UsXG4gIExFTkdUSCxcbn1cbiJdfQ==