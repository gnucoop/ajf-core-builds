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
    AjfFieldType[AjfFieldType["LENGTH"] = 14] = "LENGTH";
})(AjfFieldType || (AjfFieldType = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGQtdHlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2Zvcm1zL2ludGVyZmFjZS9maWVsZHMvZmllbGQtdHlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxNQUFNLENBQU4sSUFBWSxZQWdCWDtBQWhCRCxXQUFZLFlBQVk7SUFDdEIsbURBQU0sQ0FBQTtJQUNOLCtDQUFJLENBQUE7SUFDSixtREFBTSxDQUFBO0lBQ04scURBQU8sQ0FBQTtJQUNQLCtEQUFZLENBQUE7SUFDWixtRUFBYyxDQUFBO0lBQ2QscURBQU8sQ0FBQTtJQUNQLGlEQUFLLENBQUE7SUFDTCwrQ0FBSSxDQUFBO0lBQ0oseURBQVMsQ0FBQTtJQUNULGdEQUFJLENBQUE7SUFDSixrREFBSyxDQUFBO0lBQ0wsOERBQVcsQ0FBQTtJQUNYLHNEQUFPLENBQUE7SUFDUCxvREFBTSxDQUFBO0FBQ1IsQ0FBQyxFQWhCVyxZQUFZLEtBQVosWUFBWSxRQWdCdkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmV4cG9ydCBlbnVtIEFqZkZpZWxkVHlwZSB7XG4gIFN0cmluZyxcbiAgVGV4dCxcbiAgTnVtYmVyLFxuICBCb29sZWFuLFxuICBTaW5nbGVDaG9pY2UsXG4gIE11bHRpcGxlQ2hvaWNlLFxuICBGb3JtdWxhLFxuICBFbXB0eSxcbiAgRGF0ZSxcbiAgRGF0ZUlucHV0LFxuICBUaW1lLFxuICBUYWJsZSxcbiAgR2VvbG9jYXRpb24sXG4gIEJhcmNvZGUsXG4gIExFTkdUSFxufVxuIl19