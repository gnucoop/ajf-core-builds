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
import { __assign } from "tslib";
import { AjfWidgetSerializer } from './widget-serializer';
var AjfReportContainerSerializer = /** @class */ (function () {
    function AjfReportContainerSerializer() {
    }
    AjfReportContainerSerializer.fromJson = function (json) {
        json.content = (json.content || []).map(function (c) { return AjfWidgetSerializer.fromJson(c); });
        return __assign(__assign({}, json), { content: json.content, styles: json.styles || {} });
    };
    return AjfReportContainerSerializer;
}());
export { AjfReportContainerSerializer };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwb3J0LWNvbnRhaW5lci1zZXJpYWxpemVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvcmVwb3J0cy9zZXJpYWxpemVycy9yZXBvcnQtY29udGFpbmVyLXNlcmlhbGl6ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHOztBQUdILE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBRXhEO0lBQUE7SUFLQSxDQUFDO0lBSlEscUNBQVEsR0FBZixVQUFnQixJQUFpQztRQUMvQyxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQS9CLENBQStCLENBQUMsQ0FBQztRQUM5RSw2QkFBVyxJQUFJLEtBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFRLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLElBQUksRUFBRSxJQUFFO0lBQ3RFLENBQUM7SUFDSCxtQ0FBQztBQUFELENBQUMsQUFMRCxJQUtDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZlJlcG9ydENvbnRhaW5lcn0gZnJvbSAnLi4vaW50ZXJmYWNlL3JlcG9ydHMvcmVwb3J0LWNvbnRhaW5lcic7XG5pbXBvcnQge0FqZldpZGdldFNlcmlhbGl6ZXJ9IGZyb20gJy4vd2lkZ2V0LXNlcmlhbGl6ZXInO1xuXG5leHBvcnQgY2xhc3MgQWpmUmVwb3J0Q29udGFpbmVyU2VyaWFsaXplciB7XG4gIHN0YXRpYyBmcm9tSnNvbihqc29uOiBQYXJ0aWFsPEFqZlJlcG9ydENvbnRhaW5lcj4pOiBBamZSZXBvcnRDb250YWluZXIge1xuICAgIGpzb24uY29udGVudCA9IChqc29uLmNvbnRlbnQgfHwgW10pLm1hcChjID0+IEFqZldpZGdldFNlcmlhbGl6ZXIuZnJvbUpzb24oYykpO1xuICAgIHJldHVybiB7Li4uanNvbiwgY29udGVudDoganNvbi5jb250ZW50ISwgc3R5bGVzOiBqc29uLnN0eWxlcyB8fCB7fX07XG4gIH1cbn1cbiJdfQ==