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
import { __assign } from "tslib";
import { AjfConditionSerializer, AjfFormulaSerializer, alwaysCondition } from '@ajf/core/models';
import { AjfWidgetType } from '../interface/widgets/widget-type';
import { createWidget } from '../utils/widgets/create-widget';
import { AjfDatasetSerializer } from './dataset-serializer';
var AjfWidgetSerializer = /** @class */ (function () {
    function AjfWidgetSerializer() {
    }
    AjfWidgetSerializer.fromJson = function (json) {
        if (json.widgetType == null) {
            throw new Error('Malformed widget');
        }
        json.visibility =
            json.visibility ? AjfConditionSerializer.fromJson(json.visibility) : alwaysCondition();
        json.styles = json.styles || {};
        var obj = json;
        if (obj.widgetType === AjfWidgetType.Layout || obj.widgetType === AjfWidgetType.Column) {
            return AjfWidgetSerializer._widgetWithContentFromJson(obj);
        }
        if (obj.widgetType === AjfWidgetType.Chart || obj.widgetType === AjfWidgetType.Table) {
            var w = AjfWidgetSerializer._dataWidgetFromJson(obj);
            if (obj.widgetType === AjfWidgetType.Chart) {
                var cw = w;
                if (cw.labels instanceof Array) {
                    cw.labels.map(function (l) { return AjfFormulaSerializer.fromJson(l); });
                }
                else if (cw.labels != null) {
                    cw.labels = AjfFormulaSerializer.fromJson(cw.labels);
                }
            }
            return w;
        }
        if (obj.widgetType === AjfWidgetType.Map) {
            var mw = obj;
            mw.coordinate = AjfFormulaSerializer.fromJson(mw.coordinate);
        }
        return obj;
    };
    AjfWidgetSerializer._dataWidgetFromJson = function (json) {
        var dataset = json.dataset ?
            (json.widgetType === AjfWidgetType.Table ?
                json.dataset
                    .map(function (row) { return row.map(function (cell) { return AjfDatasetSerializer.fromJson(cell); }); }) :
                json.dataset.map(function (d) { return AjfDatasetSerializer.fromJson(d); })) :
            [];
        return __assign(__assign({}, createWidget(json)), { dataset: dataset });
    };
    AjfWidgetSerializer._widgetWithContentFromJson = function (json) {
        var content = (json.content || []).map(function (c) { return AjfWidgetSerializer.fromJson(c); });
        return __assign(__assign({}, createWidget(json)), { content: content });
    };
    return AjfWidgetSerializer;
}());
export { AjfWidgetSerializer };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0LXNlcmlhbGl6ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9yZXBvcnRzL3NlcmlhbGl6ZXJzL3dpZGdldC1zZXJpYWxpemVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRzs7QUFFSCxPQUFPLEVBQUMsc0JBQXNCLEVBQUUsb0JBQW9CLEVBQUUsZUFBZSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFRL0YsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGtDQUFrQyxDQUFDO0FBRS9ELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQztBQUU1RCxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUUxRDtJQUFBO0lBOENBLENBQUM7SUE3Q1EsNEJBQVEsR0FBZixVQUFnQixJQUF3QjtRQUN0QyxJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxFQUFFO1lBQzNCLE1BQU0sSUFBSSxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQztTQUNyQztRQUNELElBQUksQ0FBQyxVQUFVO1lBQ1gsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsc0JBQXNCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDM0YsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQztRQUNoQyxJQUFNLEdBQUcsR0FBRyxJQUFpQixDQUFDO1FBQzlCLElBQUksR0FBRyxDQUFDLFVBQVUsS0FBSyxhQUFhLENBQUMsTUFBTSxJQUFJLEdBQUcsQ0FBQyxVQUFVLEtBQUssYUFBYSxDQUFDLE1BQU0sRUFBRTtZQUN0RixPQUFPLG1CQUFtQixDQUFDLDBCQUEwQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQzVEO1FBQ0QsSUFBSSxHQUFHLENBQUMsVUFBVSxLQUFLLGFBQWEsQ0FBQyxLQUFLLElBQUksR0FBRyxDQUFDLFVBQVUsS0FBSyxhQUFhLENBQUMsS0FBSyxFQUFFO1lBQ3BGLElBQU0sQ0FBQyxHQUFHLG1CQUFtQixDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZELElBQUksR0FBRyxDQUFDLFVBQVUsS0FBSyxhQUFhLENBQUMsS0FBSyxFQUFFO2dCQUMxQyxJQUFNLEVBQUUsR0FBRyxDQUFtQixDQUFDO2dCQUMvQixJQUFJLEVBQUUsQ0FBQyxNQUFNLFlBQVksS0FBSyxFQUFFO29CQUM5QixFQUFFLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBaEMsQ0FBZ0MsQ0FBQyxDQUFDO2lCQUN0RDtxQkFBTSxJQUFJLEVBQUUsQ0FBQyxNQUFNLElBQUksSUFBSSxFQUFFO29CQUM1QixFQUFFLENBQUMsTUFBTSxHQUFHLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7aUJBQ3REO2FBQ0Y7WUFDRCxPQUFPLENBQUMsQ0FBQztTQUNWO1FBQ0QsSUFBSSxHQUFHLENBQUMsVUFBVSxLQUFLLGFBQWEsQ0FBQyxHQUFHLEVBQUU7WUFDeEMsSUFBTSxFQUFFLEdBQUcsR0FBbUIsQ0FBQztZQUMvQixFQUFFLENBQUMsVUFBVSxHQUFHLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDOUQ7UUFDRCxPQUFPLEdBQUcsQ0FBQztJQUNiLENBQUM7SUFFYyx1Q0FBbUIsR0FBbEMsVUFBbUMsSUFBc0M7UUFDdkUsSUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzFCLENBQUMsSUFBSSxDQUFDLFVBQVUsS0FBSyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3BDLElBQUksQ0FBQyxPQUErQjtxQkFDaEMsR0FBRyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBbkMsQ0FBbUMsQ0FBQyxFQUFwRCxDQUFvRCxDQUFDLENBQUMsQ0FBQztnQkFDdEUsSUFBSSxDQUFDLE9BQTZCLENBQUMsR0FBRyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsb0JBQW9CLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFoQyxDQUFnQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RGLEVBQUUsQ0FBQztRQUNQLDZCQUFXLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBRSxPQUFPLFNBQUEsSUFBRTtJQUMxQyxDQUFDO0lBRWMsOENBQTBCLEdBQXpDLFVBQTBDLElBQzRCO1FBQ3BFLElBQU0sT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQS9CLENBQStCLENBQUMsQ0FBQztRQUMvRSw2QkFBVyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUUsT0FBTyxTQUFBLElBQUU7SUFDMUMsQ0FBQztJQUNILDBCQUFDO0FBQUQsQ0FBQyxBQTlDRCxJQThDQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgMjAxOCBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkNvbmRpdGlvblNlcmlhbGl6ZXIsIEFqZkZvcm11bGFTZXJpYWxpemVyLCBhbHdheXNDb25kaXRpb259IGZyb20gJ0BhamYvY29yZS9tb2RlbHMnO1xuXG5pbXBvcnQge0FqZkNoYXJ0RGF0YXNldH0gZnJvbSAnLi4vaW50ZXJmYWNlL2RhdGFzZXQvY2hhcnQtZGF0YXNldCc7XG5pbXBvcnQge0FqZlRhYmxlRGF0YXNldH0gZnJvbSAnLi4vaW50ZXJmYWNlL2RhdGFzZXQvdGFibGUtZGF0YXNldCc7XG5pbXBvcnQge0FqZkNoYXJ0V2lkZ2V0fSBmcm9tICcuLi9pbnRlcmZhY2Uvd2lkZ2V0cy9jaGFydC13aWRnZXQnO1xuaW1wb3J0IHtBamZEYXRhV2lkZ2V0fSBmcm9tICcuLi9pbnRlcmZhY2Uvd2lkZ2V0cy9kYXRhLXdpZGdldCc7XG5pbXBvcnQge0FqZk1hcFdpZGdldH0gZnJvbSAnLi4vaW50ZXJmYWNlL3dpZGdldHMvbWFwLXdpZGdldCc7XG5pbXBvcnQge0FqZldpZGdldH0gZnJvbSAnLi4vaW50ZXJmYWNlL3dpZGdldHMvd2lkZ2V0JztcbmltcG9ydCB7QWpmV2lkZ2V0VHlwZX0gZnJvbSAnLi4vaW50ZXJmYWNlL3dpZGdldHMvd2lkZ2V0LXR5cGUnO1xuaW1wb3J0IHtBamZXaWRnZXRXaXRoQ29udGVudH0gZnJvbSAnLi4vaW50ZXJmYWNlL3dpZGdldHMvd2lkZ2V0LXdpdGgtY29udGVudCc7XG5pbXBvcnQge2NyZWF0ZVdpZGdldH0gZnJvbSAnLi4vdXRpbHMvd2lkZ2V0cy9jcmVhdGUtd2lkZ2V0JztcblxuaW1wb3J0IHtBamZEYXRhc2V0U2VyaWFsaXplcn0gZnJvbSAnLi9kYXRhc2V0LXNlcmlhbGl6ZXInO1xuXG5leHBvcnQgY2xhc3MgQWpmV2lkZ2V0U2VyaWFsaXplciB7XG4gIHN0YXRpYyBmcm9tSnNvbihqc29uOiBQYXJ0aWFsPEFqZldpZGdldD4pOiBBamZXaWRnZXQge1xuICAgIGlmIChqc29uLndpZGdldFR5cGUgPT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdNYWxmb3JtZWQgd2lkZ2V0Jyk7XG4gICAgfVxuICAgIGpzb24udmlzaWJpbGl0eSA9XG4gICAgICAgIGpzb24udmlzaWJpbGl0eSA/IEFqZkNvbmRpdGlvblNlcmlhbGl6ZXIuZnJvbUpzb24oanNvbi52aXNpYmlsaXR5KSA6IGFsd2F5c0NvbmRpdGlvbigpO1xuICAgIGpzb24uc3R5bGVzID0ganNvbi5zdHlsZXMgfHwge307XG4gICAgY29uc3Qgb2JqID0ganNvbiBhcyBBamZXaWRnZXQ7XG4gICAgaWYgKG9iai53aWRnZXRUeXBlID09PSBBamZXaWRnZXRUeXBlLkxheW91dCB8fCBvYmoud2lkZ2V0VHlwZSA9PT0gQWpmV2lkZ2V0VHlwZS5Db2x1bW4pIHtcbiAgICAgIHJldHVybiBBamZXaWRnZXRTZXJpYWxpemVyLl93aWRnZXRXaXRoQ29udGVudEZyb21Kc29uKG9iaik7XG4gICAgfVxuICAgIGlmIChvYmoud2lkZ2V0VHlwZSA9PT0gQWpmV2lkZ2V0VHlwZS5DaGFydCB8fCBvYmoud2lkZ2V0VHlwZSA9PT0gQWpmV2lkZ2V0VHlwZS5UYWJsZSkge1xuICAgICAgY29uc3QgdyA9IEFqZldpZGdldFNlcmlhbGl6ZXIuX2RhdGFXaWRnZXRGcm9tSnNvbihvYmopO1xuICAgICAgaWYgKG9iai53aWRnZXRUeXBlID09PSBBamZXaWRnZXRUeXBlLkNoYXJ0KSB7XG4gICAgICAgIGNvbnN0IGN3ID0gdyBhcyBBamZDaGFydFdpZGdldDtcbiAgICAgICAgaWYgKGN3LmxhYmVscyBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgY3cubGFiZWxzLm1hcChsID0+IEFqZkZvcm11bGFTZXJpYWxpemVyLmZyb21Kc29uKGwpKTtcbiAgICAgICAgfSBlbHNlIGlmIChjdy5sYWJlbHMgIT0gbnVsbCkge1xuICAgICAgICAgIGN3LmxhYmVscyA9IEFqZkZvcm11bGFTZXJpYWxpemVyLmZyb21Kc29uKGN3LmxhYmVscyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB3O1xuICAgIH1cbiAgICBpZiAob2JqLndpZGdldFR5cGUgPT09IEFqZldpZGdldFR5cGUuTWFwKSB7XG4gICAgICBjb25zdCBtdyA9IG9iaiBhcyBBamZNYXBXaWRnZXQ7XG4gICAgICBtdy5jb29yZGluYXRlID0gQWpmRm9ybXVsYVNlcmlhbGl6ZXIuZnJvbUpzb24obXcuY29vcmRpbmF0ZSk7XG4gICAgfVxuICAgIHJldHVybiBvYmo7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBfZGF0YVdpZGdldEZyb21Kc29uKGpzb246IEFqZldpZGdldCZQYXJ0aWFsPEFqZkRhdGFXaWRnZXQ+KTogQWpmRGF0YVdpZGdldCB7XG4gICAgY29uc3QgZGF0YXNldCA9IGpzb24uZGF0YXNldCA/XG4gICAgICAgIChqc29uLndpZGdldFR5cGUgPT09IEFqZldpZGdldFR5cGUuVGFibGUgP1xuICAgICAgICAgICAgIChqc29uLmRhdGFzZXQgYXMgQWpmVGFibGVEYXRhc2V0W11bXSlcbiAgICAgICAgICAgICAgICAgLm1hcChyb3cgPT4gcm93Lm1hcChjZWxsID0+IEFqZkRhdGFzZXRTZXJpYWxpemVyLmZyb21Kc29uKGNlbGwpKSkgOlxuICAgICAgICAgICAgIChqc29uLmRhdGFzZXQgYXMgQWpmQ2hhcnREYXRhc2V0W10pLm1hcChkID0+IEFqZkRhdGFzZXRTZXJpYWxpemVyLmZyb21Kc29uKGQpKSkgOlxuICAgICAgICBbXTtcbiAgICByZXR1cm4gey4uLmNyZWF0ZVdpZGdldChqc29uKSwgZGF0YXNldH07XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBfd2lkZ2V0V2l0aENvbnRlbnRGcm9tSnNvbihqc29uOiBBamZXaWRnZXQmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUGFydGlhbDxBamZXaWRnZXRXaXRoQ29udGVudD4pOiBBamZXaWRnZXRXaXRoQ29udGVudCB7XG4gICAgY29uc3QgY29udGVudCA9IChqc29uLmNvbnRlbnQgfHwgW10pLm1hcChjID0+IEFqZldpZGdldFNlcmlhbGl6ZXIuZnJvbUpzb24oYykpO1xuICAgIHJldHVybiB7Li4uY3JlYXRlV2lkZ2V0KGpzb24pLCBjb250ZW50fTtcbiAgfVxufVxuIl19