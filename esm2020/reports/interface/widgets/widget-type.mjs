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
export var AjfWidgetType;
(function (AjfWidgetType) {
    AjfWidgetType[AjfWidgetType["Layout"] = 0] = "Layout";
    AjfWidgetType[AjfWidgetType["PageBreak"] = 1] = "PageBreak";
    AjfWidgetType[AjfWidgetType["Image"] = 2] = "Image";
    AjfWidgetType[AjfWidgetType["Text"] = 3] = "Text";
    AjfWidgetType[AjfWidgetType["Chart"] = 4] = "Chart";
    AjfWidgetType[AjfWidgetType["Table"] = 5] = "Table";
    AjfWidgetType[AjfWidgetType["Map"] = 6] = "Map";
    AjfWidgetType[AjfWidgetType["Column"] = 7] = "Column";
    AjfWidgetType[AjfWidgetType["Formula"] = 8] = "Formula";
    AjfWidgetType[AjfWidgetType["ImageContainer"] = 9] = "ImageContainer";
    AjfWidgetType[AjfWidgetType["DynamicTable"] = 10] = "DynamicTable";
    AjfWidgetType[AjfWidgetType["Graph"] = 11] = "Graph";
    AjfWidgetType[AjfWidgetType["PaginatedList"] = 12] = "PaginatedList";
    AjfWidgetType[AjfWidgetType["Dialog"] = 13] = "Dialog";
    AjfWidgetType[AjfWidgetType["HeatMap"] = 14] = "HeatMap";
    AjfWidgetType[AjfWidgetType["LENGTH"] = 15] = "LENGTH";
})(AjfWidgetType || (AjfWidgetType = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0LXR5cGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL3JlcG9ydHMvc3JjL2ludGVyZmFjZS93aWRnZXRzL3dpZGdldC10eXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILDZDQUE2QztBQUM3QyxNQUFNLENBQU4sSUFBWSxhQWlCWDtBQWpCRCxXQUFZLGFBQWE7SUFDdkIscURBQU0sQ0FBQTtJQUNOLDJEQUFTLENBQUE7SUFDVCxtREFBSyxDQUFBO0lBQ0wsaURBQUksQ0FBQTtJQUNKLG1EQUFLLENBQUE7SUFDTCxtREFBSyxDQUFBO0lBQ0wsK0NBQUcsQ0FBQTtJQUNILHFEQUFNLENBQUE7SUFDTix1REFBTyxDQUFBO0lBQ1AscUVBQWMsQ0FBQTtJQUNkLGtFQUFZLENBQUE7SUFDWixvREFBSyxDQUFBO0lBQ0wsb0VBQWEsQ0FBQTtJQUNiLHNEQUFNLENBQUE7SUFDTix3REFBTyxDQUFBO0lBQ1Asc0RBQU0sQ0FBQTtBQUNSLENBQUMsRUFqQlcsYUFBYSxLQUFiLGFBQWEsUUFpQnhCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6cHJlZmVyLWNvbnN0LWVudW1cbmV4cG9ydCBlbnVtIEFqZldpZGdldFR5cGUge1xuICBMYXlvdXQsXG4gIFBhZ2VCcmVhayxcbiAgSW1hZ2UsXG4gIFRleHQsXG4gIENoYXJ0LFxuICBUYWJsZSxcbiAgTWFwLFxuICBDb2x1bW4sXG4gIEZvcm11bGEsXG4gIEltYWdlQ29udGFpbmVyLFxuICBEeW5hbWljVGFibGUsXG4gIEdyYXBoLFxuICBQYWdpbmF0ZWRMaXN0LFxuICBEaWFsb2csXG4gIEhlYXRNYXAsXG4gIExFTkdUSCxcbn1cbiJdfQ==