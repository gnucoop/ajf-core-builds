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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0LXNlcmlhbGl6ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9yZXBvcnRzL3NlcmlhbGl6ZXJzL3dpZGdldC1zZXJpYWxpemVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRzs7QUFFSCxPQUFPLEVBQUMsc0JBQXNCLEVBQUUsb0JBQW9CLEVBQUUsZUFBZSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFRL0YsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGtDQUFrQyxDQUFDO0FBRS9ELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQztBQUU1RCxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUUxRDtJQUFBO0lBOENBLENBQUM7SUE3Q1EsNEJBQVEsR0FBZixVQUFnQixJQUF3QjtRQUN0QyxJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxFQUFFO1lBQzNCLE1BQU0sSUFBSSxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQztTQUNyQztRQUNELElBQUksQ0FBQyxVQUFVO1lBQ1gsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsc0JBQXNCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDM0YsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQztRQUNoQyxJQUFNLEdBQUcsR0FBRyxJQUFpQixDQUFDO1FBQzlCLElBQUksR0FBRyxDQUFDLFVBQVUsS0FBSyxhQUFhLENBQUMsTUFBTSxJQUFJLEdBQUcsQ0FBQyxVQUFVLEtBQUssYUFBYSxDQUFDLE1BQU0sRUFBRTtZQUN0RixPQUFPLG1CQUFtQixDQUFDLDBCQUEwQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQzVEO1FBQ0QsSUFBSSxHQUFHLENBQUMsVUFBVSxLQUFLLGFBQWEsQ0FBQyxLQUFLLElBQUksR0FBRyxDQUFDLFVBQVUsS0FBSyxhQUFhLENBQUMsS0FBSyxFQUFFO1lBQ3BGLElBQU0sQ0FBQyxHQUFHLG1CQUFtQixDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZELElBQUksR0FBRyxDQUFDLFVBQVUsS0FBSyxhQUFhLENBQUMsS0FBSyxFQUFFO2dCQUMxQyxJQUFNLEVBQUUsR0FBRyxDQUFtQixDQUFDO2dCQUMvQixJQUFJLEVBQUUsQ0FBQyxNQUFNLFlBQVksS0FBSyxFQUFFO29CQUM5QixFQUFFLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBaEMsQ0FBZ0MsQ0FBQyxDQUFDO2lCQUN0RDtxQkFBTSxJQUFJLEVBQUUsQ0FBQyxNQUFNLElBQUksSUFBSSxFQUFFO29CQUM1QixFQUFFLENBQUMsTUFBTSxHQUFHLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7aUJBQ3REO2FBQ0Y7WUFDRCxPQUFPLENBQUMsQ0FBQztTQUNWO1FBQ0QsSUFBSSxHQUFHLENBQUMsVUFBVSxLQUFLLGFBQWEsQ0FBQyxHQUFHLEVBQUU7WUFDeEMsSUFBTSxFQUFFLEdBQUcsR0FBbUIsQ0FBQztZQUMvQixFQUFFLENBQUMsVUFBVSxHQUFHLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDOUQ7UUFDRCxPQUFPLEdBQUcsQ0FBQztJQUNiLENBQUM7SUFFYyx1Q0FBbUIsR0FBbEMsVUFBbUMsSUFBc0M7UUFDdkUsSUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzFCLENBQUMsSUFBSSxDQUFDLFVBQVUsS0FBSyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3BDLElBQUksQ0FBQyxPQUErQjtxQkFDaEMsR0FBRyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBbkMsQ0FBbUMsQ0FBQyxFQUFwRCxDQUFvRCxDQUFDLENBQUMsQ0FBQztnQkFDdEUsSUFBSSxDQUFDLE9BQTZCLENBQUMsR0FBRyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsb0JBQW9CLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFoQyxDQUFnQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RGLEVBQUUsQ0FBQztRQUNQLDZCQUFXLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBRSxPQUFPLFNBQUEsSUFBRTtJQUMxQyxDQUFDO0lBRWMsOENBQTBCLEdBQXpDLFVBQTBDLElBQzRCO1FBQ3BFLElBQU0sT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQS9CLENBQStCLENBQUMsQ0FBQztRQUMvRSw2QkFBVyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUUsT0FBTyxTQUFBLElBQUU7SUFDMUMsQ0FBQztJQUNILDBCQUFDO0FBQUQsQ0FBQyxBQTlDRCxJQThDQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZDb25kaXRpb25TZXJpYWxpemVyLCBBamZGb3JtdWxhU2VyaWFsaXplciwgYWx3YXlzQ29uZGl0aW9ufSBmcm9tICdAYWpmL2NvcmUvbW9kZWxzJztcblxuaW1wb3J0IHtBamZDaGFydERhdGFzZXR9IGZyb20gJy4uL2ludGVyZmFjZS9kYXRhc2V0L2NoYXJ0LWRhdGFzZXQnO1xuaW1wb3J0IHtBamZUYWJsZURhdGFzZXR9IGZyb20gJy4uL2ludGVyZmFjZS9kYXRhc2V0L3RhYmxlLWRhdGFzZXQnO1xuaW1wb3J0IHtBamZDaGFydFdpZGdldH0gZnJvbSAnLi4vaW50ZXJmYWNlL3dpZGdldHMvY2hhcnQtd2lkZ2V0JztcbmltcG9ydCB7QWpmRGF0YVdpZGdldH0gZnJvbSAnLi4vaW50ZXJmYWNlL3dpZGdldHMvZGF0YS13aWRnZXQnO1xuaW1wb3J0IHtBamZNYXBXaWRnZXR9IGZyb20gJy4uL2ludGVyZmFjZS93aWRnZXRzL21hcC13aWRnZXQnO1xuaW1wb3J0IHtBamZXaWRnZXR9IGZyb20gJy4uL2ludGVyZmFjZS93aWRnZXRzL3dpZGdldCc7XG5pbXBvcnQge0FqZldpZGdldFR5cGV9IGZyb20gJy4uL2ludGVyZmFjZS93aWRnZXRzL3dpZGdldC10eXBlJztcbmltcG9ydCB7QWpmV2lkZ2V0V2l0aENvbnRlbnR9IGZyb20gJy4uL2ludGVyZmFjZS93aWRnZXRzL3dpZGdldC13aXRoLWNvbnRlbnQnO1xuaW1wb3J0IHtjcmVhdGVXaWRnZXR9IGZyb20gJy4uL3V0aWxzL3dpZGdldHMvY3JlYXRlLXdpZGdldCc7XG5cbmltcG9ydCB7QWpmRGF0YXNldFNlcmlhbGl6ZXJ9IGZyb20gJy4vZGF0YXNldC1zZXJpYWxpemVyJztcblxuZXhwb3J0IGNsYXNzIEFqZldpZGdldFNlcmlhbGl6ZXIge1xuICBzdGF0aWMgZnJvbUpzb24oanNvbjogUGFydGlhbDxBamZXaWRnZXQ+KTogQWpmV2lkZ2V0IHtcbiAgICBpZiAoanNvbi53aWRnZXRUeXBlID09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTWFsZm9ybWVkIHdpZGdldCcpO1xuICAgIH1cbiAgICBqc29uLnZpc2liaWxpdHkgPVxuICAgICAgICBqc29uLnZpc2liaWxpdHkgPyBBamZDb25kaXRpb25TZXJpYWxpemVyLmZyb21Kc29uKGpzb24udmlzaWJpbGl0eSkgOiBhbHdheXNDb25kaXRpb24oKTtcbiAgICBqc29uLnN0eWxlcyA9IGpzb24uc3R5bGVzIHx8IHt9O1xuICAgIGNvbnN0IG9iaiA9IGpzb24gYXMgQWpmV2lkZ2V0O1xuICAgIGlmIChvYmoud2lkZ2V0VHlwZSA9PT0gQWpmV2lkZ2V0VHlwZS5MYXlvdXQgfHwgb2JqLndpZGdldFR5cGUgPT09IEFqZldpZGdldFR5cGUuQ29sdW1uKSB7XG4gICAgICByZXR1cm4gQWpmV2lkZ2V0U2VyaWFsaXplci5fd2lkZ2V0V2l0aENvbnRlbnRGcm9tSnNvbihvYmopO1xuICAgIH1cbiAgICBpZiAob2JqLndpZGdldFR5cGUgPT09IEFqZldpZGdldFR5cGUuQ2hhcnQgfHwgb2JqLndpZGdldFR5cGUgPT09IEFqZldpZGdldFR5cGUuVGFibGUpIHtcbiAgICAgIGNvbnN0IHcgPSBBamZXaWRnZXRTZXJpYWxpemVyLl9kYXRhV2lkZ2V0RnJvbUpzb24ob2JqKTtcbiAgICAgIGlmIChvYmoud2lkZ2V0VHlwZSA9PT0gQWpmV2lkZ2V0VHlwZS5DaGFydCkge1xuICAgICAgICBjb25zdCBjdyA9IHcgYXMgQWpmQ2hhcnRXaWRnZXQ7XG4gICAgICAgIGlmIChjdy5sYWJlbHMgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgIGN3LmxhYmVscy5tYXAobCA9PiBBamZGb3JtdWxhU2VyaWFsaXplci5mcm9tSnNvbihsKSk7XG4gICAgICAgIH0gZWxzZSBpZiAoY3cubGFiZWxzICE9IG51bGwpIHtcbiAgICAgICAgICBjdy5sYWJlbHMgPSBBamZGb3JtdWxhU2VyaWFsaXplci5mcm9tSnNvbihjdy5sYWJlbHMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdztcbiAgICB9XG4gICAgaWYgKG9iai53aWRnZXRUeXBlID09PSBBamZXaWRnZXRUeXBlLk1hcCkge1xuICAgICAgY29uc3QgbXcgPSBvYmogYXMgQWpmTWFwV2lkZ2V0O1xuICAgICAgbXcuY29vcmRpbmF0ZSA9IEFqZkZvcm11bGFTZXJpYWxpemVyLmZyb21Kc29uKG13LmNvb3JkaW5hdGUpO1xuICAgIH1cbiAgICByZXR1cm4gb2JqO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgX2RhdGFXaWRnZXRGcm9tSnNvbihqc29uOiBBamZXaWRnZXQmUGFydGlhbDxBamZEYXRhV2lkZ2V0Pik6IEFqZkRhdGFXaWRnZXQge1xuICAgIGNvbnN0IGRhdGFzZXQgPSBqc29uLmRhdGFzZXQgP1xuICAgICAgICAoanNvbi53aWRnZXRUeXBlID09PSBBamZXaWRnZXRUeXBlLlRhYmxlID9cbiAgICAgICAgICAgICAoanNvbi5kYXRhc2V0IGFzIEFqZlRhYmxlRGF0YXNldFtdW10pXG4gICAgICAgICAgICAgICAgIC5tYXAocm93ID0+IHJvdy5tYXAoY2VsbCA9PiBBamZEYXRhc2V0U2VyaWFsaXplci5mcm9tSnNvbihjZWxsKSkpIDpcbiAgICAgICAgICAgICAoanNvbi5kYXRhc2V0IGFzIEFqZkNoYXJ0RGF0YXNldFtdKS5tYXAoZCA9PiBBamZEYXRhc2V0U2VyaWFsaXplci5mcm9tSnNvbihkKSkpIDpcbiAgICAgICAgW107XG4gICAgcmV0dXJuIHsuLi5jcmVhdGVXaWRnZXQoanNvbiksIGRhdGFzZXR9O1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgX3dpZGdldFdpdGhDb250ZW50RnJvbUpzb24oanNvbjogQWpmV2lkZ2V0JlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFBhcnRpYWw8QWpmV2lkZ2V0V2l0aENvbnRlbnQ+KTogQWpmV2lkZ2V0V2l0aENvbnRlbnQge1xuICAgIGNvbnN0IGNvbnRlbnQgPSAoanNvbi5jb250ZW50IHx8IFtdKS5tYXAoYyA9PiBBamZXaWRnZXRTZXJpYWxpemVyLmZyb21Kc29uKGMpKTtcbiAgICByZXR1cm4gey4uLmNyZWF0ZVdpZGdldChqc29uKSwgY29udGVudH07XG4gIH1cbn1cbiJdfQ==