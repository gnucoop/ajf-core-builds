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
        var dataset;
        if (json.dataset == null) {
            dataset = [];
        }
        else {
            if (json.widgetType === AjfWidgetType.Table) {
                dataset = json.dataset
                    .map(function (row) { return row.map(function (cell) { return AjfDatasetSerializer.fromJson(cell); }); });
            }
            else {
                dataset = json.dataset.map(function (d) { return AjfDatasetSerializer.fromJson(d); });
            }
        }
        return __assign(__assign({}, createWidget(json)), { dataset: dataset });
    };
    AjfWidgetSerializer._widgetWithContentFromJson = function (json) {
        var content = (json.content || []).map(function (c) { return AjfWidgetSerializer.fromJson(c); });
        return __assign(__assign({}, createWidget(json)), { content: content });
    };
    return AjfWidgetSerializer;
}());
export { AjfWidgetSerializer };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0LXNlcmlhbGl6ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9yZXBvcnRzL3NlcmlhbGl6ZXJzL3dpZGdldC1zZXJpYWxpemVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRzs7QUFFSCxPQUFPLEVBQUMsc0JBQXNCLEVBQUUsb0JBQW9CLEVBQUUsZUFBZSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFTL0YsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGtDQUFrQyxDQUFDO0FBRS9ELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQztBQUU1RCxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUUxRDtJQUFBO0lBbURBLENBQUM7SUFsRFEsNEJBQVEsR0FBZixVQUFnQixJQUF3QjtRQUN0QyxJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxFQUFFO1lBQzNCLE1BQU0sSUFBSSxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQztTQUNyQztRQUNELElBQUksQ0FBQyxVQUFVO1lBQ1gsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsc0JBQXNCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDM0YsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQztRQUNoQyxJQUFNLEdBQUcsR0FBRyxJQUFpQixDQUFDO1FBQzlCLElBQUksR0FBRyxDQUFDLFVBQVUsS0FBSyxhQUFhLENBQUMsTUFBTSxJQUFJLEdBQUcsQ0FBQyxVQUFVLEtBQUssYUFBYSxDQUFDLE1BQU0sRUFBRTtZQUN0RixPQUFPLG1CQUFtQixDQUFDLDBCQUEwQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQzVEO1FBQ0QsSUFBSSxHQUFHLENBQUMsVUFBVSxLQUFLLGFBQWEsQ0FBQyxLQUFLLElBQUksR0FBRyxDQUFDLFVBQVUsS0FBSyxhQUFhLENBQUMsS0FBSyxFQUFFO1lBQ3BGLElBQU0sQ0FBQyxHQUFHLG1CQUFtQixDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZELElBQUksR0FBRyxDQUFDLFVBQVUsS0FBSyxhQUFhLENBQUMsS0FBSyxFQUFFO2dCQUMxQyxJQUFNLEVBQUUsR0FBRyxDQUFtQixDQUFDO2dCQUMvQixJQUFJLEVBQUUsQ0FBQyxNQUFNLFlBQVksS0FBSyxFQUFFO29CQUM5QixFQUFFLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBaEMsQ0FBZ0MsQ0FBQyxDQUFDO2lCQUN0RDtxQkFBTSxJQUFJLEVBQUUsQ0FBQyxNQUFNLElBQUksSUFBSSxFQUFFO29CQUM1QixFQUFFLENBQUMsTUFBTSxHQUFHLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7aUJBQ3REO2FBQ0Y7WUFDRCxPQUFPLENBQUMsQ0FBQztTQUNWO1FBQ0QsSUFBSSxHQUFHLENBQUMsVUFBVSxLQUFLLGFBQWEsQ0FBQyxHQUFHLEVBQUU7WUFDeEMsSUFBTSxFQUFFLEdBQUcsR0FBbUIsQ0FBQztZQUMvQixFQUFFLENBQUMsVUFBVSxHQUFHLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDOUQ7UUFDRCxPQUFPLEdBQUcsQ0FBQztJQUNiLENBQUM7SUFFYyx1Q0FBbUIsR0FBbEMsVUFBbUMsSUFBc0M7UUFDdkUsSUFBSSxPQUFvQyxDQUFDO1FBQ3pDLElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLEVBQUU7WUFDeEIsT0FBTyxHQUFHLEVBQUUsQ0FBQztTQUNkO2FBQU07WUFDTCxJQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssYUFBYSxDQUFDLEtBQUssRUFBRTtnQkFDM0MsT0FBTyxHQUFJLElBQUksQ0FBQyxPQUErQjtxQkFDaEMsR0FBRyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBbkMsQ0FBbUMsQ0FBQyxFQUFwRCxDQUFvRCxDQUFDLENBQUM7YUFDakY7aUJBQU07Z0JBQ0wsT0FBTyxHQUFJLElBQUksQ0FBQyxPQUE2QixDQUFDLEdBQUcsQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBaEMsQ0FBZ0MsQ0FBQyxDQUFDO2FBQzFGO1NBQ0Y7UUFDRCw2QkFBVyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUUsT0FBTyxTQUFBLElBQUU7SUFDMUMsQ0FBQztJQUVjLDhDQUEwQixHQUF6QyxVQUEwQyxJQUM2QjtRQUNyRSxJQUFNLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsbUJBQW1CLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUEvQixDQUErQixDQUFDLENBQUM7UUFDL0UsNkJBQVcsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFFLE9BQU8sU0FBQSxJQUFFO0lBQzFDLENBQUM7SUFDSCwwQkFBQztBQUFELENBQUMsQUFuREQsSUFtREMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmQ29uZGl0aW9uU2VyaWFsaXplciwgQWpmRm9ybXVsYVNlcmlhbGl6ZXIsIGFsd2F5c0NvbmRpdGlvbn0gZnJvbSAnQGFqZi9jb3JlL21vZGVscyc7XG5cbmltcG9ydCB7QWpmQ2hhcnREYXRhc2V0fSBmcm9tICcuLi9pbnRlcmZhY2UvZGF0YXNldC9jaGFydC1kYXRhc2V0JztcbmltcG9ydCB7QWpmRGF0YXNldH0gZnJvbSAnLi4vaW50ZXJmYWNlL2RhdGFzZXQvZGF0YXNldCc7XG5pbXBvcnQge0FqZlRhYmxlRGF0YXNldH0gZnJvbSAnLi4vaW50ZXJmYWNlL2RhdGFzZXQvdGFibGUtZGF0YXNldCc7XG5pbXBvcnQge0FqZkNoYXJ0V2lkZ2V0fSBmcm9tICcuLi9pbnRlcmZhY2Uvd2lkZ2V0cy9jaGFydC13aWRnZXQnO1xuaW1wb3J0IHtBamZEYXRhV2lkZ2V0fSBmcm9tICcuLi9pbnRlcmZhY2Uvd2lkZ2V0cy9kYXRhLXdpZGdldCc7XG5pbXBvcnQge0FqZk1hcFdpZGdldH0gZnJvbSAnLi4vaW50ZXJmYWNlL3dpZGdldHMvbWFwLXdpZGdldCc7XG5pbXBvcnQge0FqZldpZGdldH0gZnJvbSAnLi4vaW50ZXJmYWNlL3dpZGdldHMvd2lkZ2V0JztcbmltcG9ydCB7QWpmV2lkZ2V0VHlwZX0gZnJvbSAnLi4vaW50ZXJmYWNlL3dpZGdldHMvd2lkZ2V0LXR5cGUnO1xuaW1wb3J0IHtBamZXaWRnZXRXaXRoQ29udGVudH0gZnJvbSAnLi4vaW50ZXJmYWNlL3dpZGdldHMvd2lkZ2V0LXdpdGgtY29udGVudCc7XG5pbXBvcnQge2NyZWF0ZVdpZGdldH0gZnJvbSAnLi4vdXRpbHMvd2lkZ2V0cy9jcmVhdGUtd2lkZ2V0JztcblxuaW1wb3J0IHtBamZEYXRhc2V0U2VyaWFsaXplcn0gZnJvbSAnLi9kYXRhc2V0LXNlcmlhbGl6ZXInO1xuXG5leHBvcnQgY2xhc3MgQWpmV2lkZ2V0U2VyaWFsaXplciB7XG4gIHN0YXRpYyBmcm9tSnNvbihqc29uOiBQYXJ0aWFsPEFqZldpZGdldD4pOiBBamZXaWRnZXQge1xuICAgIGlmIChqc29uLndpZGdldFR5cGUgPT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdNYWxmb3JtZWQgd2lkZ2V0Jyk7XG4gICAgfVxuICAgIGpzb24udmlzaWJpbGl0eSA9XG4gICAgICAgIGpzb24udmlzaWJpbGl0eSA/IEFqZkNvbmRpdGlvblNlcmlhbGl6ZXIuZnJvbUpzb24oanNvbi52aXNpYmlsaXR5KSA6IGFsd2F5c0NvbmRpdGlvbigpO1xuICAgIGpzb24uc3R5bGVzID0ganNvbi5zdHlsZXMgfHwge307XG4gICAgY29uc3Qgb2JqID0ganNvbiBhcyBBamZXaWRnZXQ7XG4gICAgaWYgKG9iai53aWRnZXRUeXBlID09PSBBamZXaWRnZXRUeXBlLkxheW91dCB8fCBvYmoud2lkZ2V0VHlwZSA9PT0gQWpmV2lkZ2V0VHlwZS5Db2x1bW4pIHtcbiAgICAgIHJldHVybiBBamZXaWRnZXRTZXJpYWxpemVyLl93aWRnZXRXaXRoQ29udGVudEZyb21Kc29uKG9iaik7XG4gICAgfVxuICAgIGlmIChvYmoud2lkZ2V0VHlwZSA9PT0gQWpmV2lkZ2V0VHlwZS5DaGFydCB8fCBvYmoud2lkZ2V0VHlwZSA9PT0gQWpmV2lkZ2V0VHlwZS5UYWJsZSkge1xuICAgICAgY29uc3QgdyA9IEFqZldpZGdldFNlcmlhbGl6ZXIuX2RhdGFXaWRnZXRGcm9tSnNvbihvYmopO1xuICAgICAgaWYgKG9iai53aWRnZXRUeXBlID09PSBBamZXaWRnZXRUeXBlLkNoYXJ0KSB7XG4gICAgICAgIGNvbnN0IGN3ID0gdyBhcyBBamZDaGFydFdpZGdldDtcbiAgICAgICAgaWYgKGN3LmxhYmVscyBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgY3cubGFiZWxzLm1hcChsID0+IEFqZkZvcm11bGFTZXJpYWxpemVyLmZyb21Kc29uKGwpKTtcbiAgICAgICAgfSBlbHNlIGlmIChjdy5sYWJlbHMgIT0gbnVsbCkge1xuICAgICAgICAgIGN3LmxhYmVscyA9IEFqZkZvcm11bGFTZXJpYWxpemVyLmZyb21Kc29uKGN3LmxhYmVscyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB3O1xuICAgIH1cbiAgICBpZiAob2JqLndpZGdldFR5cGUgPT09IEFqZldpZGdldFR5cGUuTWFwKSB7XG4gICAgICBjb25zdCBtdyA9IG9iaiBhcyBBamZNYXBXaWRnZXQ7XG4gICAgICBtdy5jb29yZGluYXRlID0gQWpmRm9ybXVsYVNlcmlhbGl6ZXIuZnJvbUpzb24obXcuY29vcmRpbmF0ZSk7XG4gICAgfVxuICAgIHJldHVybiBvYmo7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBfZGF0YVdpZGdldEZyb21Kc29uKGpzb246IEFqZldpZGdldCZQYXJ0aWFsPEFqZkRhdGFXaWRnZXQ+KTogQWpmRGF0YVdpZGdldCB7XG4gICAgbGV0IGRhdGFzZXQ6IEFqZkRhdGFzZXRbXXxBamZEYXRhc2V0W11bXTtcbiAgICBpZiAoanNvbi5kYXRhc2V0ID09IG51bGwpIHtcbiAgICAgIGRhdGFzZXQgPSBbXTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGpzb24ud2lkZ2V0VHlwZSA9PT0gQWpmV2lkZ2V0VHlwZS5UYWJsZSkge1xuICAgICAgICBkYXRhc2V0ID0gKGpzb24uZGF0YXNldCBhcyBBamZUYWJsZURhdGFzZXRbXVtdKVxuICAgICAgICAgICAgICAgICAgICAgIC5tYXAocm93ID0+IHJvdy5tYXAoY2VsbCA9PiBBamZEYXRhc2V0U2VyaWFsaXplci5mcm9tSnNvbihjZWxsKSkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGF0YXNldCA9IChqc29uLmRhdGFzZXQgYXMgQWpmQ2hhcnREYXRhc2V0W10pLm1hcChkID0+IEFqZkRhdGFzZXRTZXJpYWxpemVyLmZyb21Kc29uKGQpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHsuLi5jcmVhdGVXaWRnZXQoanNvbiksIGRhdGFzZXR9O1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgX3dpZGdldFdpdGhDb250ZW50RnJvbUpzb24oanNvbjogQWpmV2lkZ2V0JlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBQYXJ0aWFsPEFqZldpZGdldFdpdGhDb250ZW50Pik6IEFqZldpZGdldFdpdGhDb250ZW50IHtcbiAgICBjb25zdCBjb250ZW50ID0gKGpzb24uY29udGVudCB8fCBbXSkubWFwKGMgPT4gQWpmV2lkZ2V0U2VyaWFsaXplci5mcm9tSnNvbihjKSk7XG4gICAgcmV0dXJuIHsuLi5jcmVhdGVXaWRnZXQoanNvbiksIGNvbnRlbnR9O1xuICB9XG59XG4iXX0=