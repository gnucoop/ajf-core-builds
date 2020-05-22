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
import { AjfConditionSerializer, AjfFormulaSerializer, alwaysCondition } from '@ajf/core/models';
import { AjfWidgetType } from '../interface/widgets/widget-type';
import { createWidget } from '../utils/widgets/create-widget';
import { AjfDatasetSerializer } from './dataset-serializer';
export class AjfWidgetSerializer {
    static fromJson(json) {
        if (json.widgetType == null) {
            throw new Error('Malformed widget');
        }
        json.visibility =
            json.visibility ? AjfConditionSerializer.fromJson(json.visibility) : alwaysCondition();
        json.styles = json.styles || {};
        const obj = json;
        if (obj.widgetType === AjfWidgetType.Layout || obj.widgetType === AjfWidgetType.Column) {
            return AjfWidgetSerializer._widgetWithContentFromJson(obj);
        }
        if (obj.widgetType === AjfWidgetType.Chart || obj.widgetType === AjfWidgetType.Table) {
            const w = AjfWidgetSerializer._dataWidgetFromJson(obj);
            if (obj.widgetType === AjfWidgetType.Chart) {
                const cw = w;
                if (cw.labels instanceof Array) {
                    cw.labels.map(l => AjfFormulaSerializer.fromJson(l));
                }
                else if (cw.labels != null) {
                    cw.labels = AjfFormulaSerializer.fromJson(cw.labels);
                }
            }
            return w;
        }
        if (obj.widgetType === AjfWidgetType.Map) {
            const mw = obj;
            mw.coordinate = AjfFormulaSerializer.fromJson(mw.coordinate);
        }
        return obj;
    }
    static _dataWidgetFromJson(json) {
        let dataset;
        if (json.dataset == null) {
            dataset = [];
        }
        else {
            if (json.widgetType === AjfWidgetType.Table) {
                dataset = json.dataset
                    .map(row => row.map(cell => AjfDatasetSerializer.fromJson(cell)));
            }
            else {
                dataset = json.dataset.map(d => AjfDatasetSerializer.fromJson(d));
            }
        }
        return Object.assign(Object.assign({}, createWidget(json)), { dataset });
    }
    static _widgetWithContentFromJson(json) {
        const content = (json.content || []).map(c => AjfWidgetSerializer.fromJson(c));
        return Object.assign(Object.assign({}, createWidget(json)), { content });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0LXNlcmlhbGl6ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9yZXBvcnRzL3NlcmlhbGl6ZXJzL3dpZGdldC1zZXJpYWxpemVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFBQyxzQkFBc0IsRUFBRSxvQkFBb0IsRUFBRSxlQUFlLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQVMvRixPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sa0NBQWtDLENBQUM7QUFFL0QsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGdDQUFnQyxDQUFDO0FBRTVELE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBRTFELE1BQU0sT0FBTyxtQkFBbUI7SUFDOUIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUF3QjtRQUN0QyxJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxFQUFFO1lBQzNCLE1BQU0sSUFBSSxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQztTQUNyQztRQUNELElBQUksQ0FBQyxVQUFVO1lBQ1gsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsc0JBQXNCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDM0YsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQztRQUNoQyxNQUFNLEdBQUcsR0FBRyxJQUFpQixDQUFDO1FBQzlCLElBQUksR0FBRyxDQUFDLFVBQVUsS0FBSyxhQUFhLENBQUMsTUFBTSxJQUFJLEdBQUcsQ0FBQyxVQUFVLEtBQUssYUFBYSxDQUFDLE1BQU0sRUFBRTtZQUN0RixPQUFPLG1CQUFtQixDQUFDLDBCQUEwQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQzVEO1FBQ0QsSUFBSSxHQUFHLENBQUMsVUFBVSxLQUFLLGFBQWEsQ0FBQyxLQUFLLElBQUksR0FBRyxDQUFDLFVBQVUsS0FBSyxhQUFhLENBQUMsS0FBSyxFQUFFO1lBQ3BGLE1BQU0sQ0FBQyxHQUFHLG1CQUFtQixDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZELElBQUksR0FBRyxDQUFDLFVBQVUsS0FBSyxhQUFhLENBQUMsS0FBSyxFQUFFO2dCQUMxQyxNQUFNLEVBQUUsR0FBRyxDQUFtQixDQUFDO2dCQUMvQixJQUFJLEVBQUUsQ0FBQyxNQUFNLFlBQVksS0FBSyxFQUFFO29CQUM5QixFQUFFLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUN0RDtxQkFBTSxJQUFJLEVBQUUsQ0FBQyxNQUFNLElBQUksSUFBSSxFQUFFO29CQUM1QixFQUFFLENBQUMsTUFBTSxHQUFHLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7aUJBQ3REO2FBQ0Y7WUFDRCxPQUFPLENBQUMsQ0FBQztTQUNWO1FBQ0QsSUFBSSxHQUFHLENBQUMsVUFBVSxLQUFLLGFBQWEsQ0FBQyxHQUFHLEVBQUU7WUFDeEMsTUFBTSxFQUFFLEdBQUcsR0FBbUIsQ0FBQztZQUMvQixFQUFFLENBQUMsVUFBVSxHQUFHLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDOUQ7UUFDRCxPQUFPLEdBQUcsQ0FBQztJQUNiLENBQUM7SUFFTyxNQUFNLENBQUMsbUJBQW1CLENBQUMsSUFBc0M7UUFDdkUsSUFBSSxPQUFvQyxDQUFDO1FBQ3pDLElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLEVBQUU7WUFDeEIsT0FBTyxHQUFHLEVBQUUsQ0FBQztTQUNkO2FBQU07WUFDTCxJQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssYUFBYSxDQUFDLEtBQUssRUFBRTtnQkFDM0MsT0FBTyxHQUFJLElBQUksQ0FBQyxPQUErQjtxQkFDaEMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDakY7aUJBQU07Z0JBQ0wsT0FBTyxHQUFJLElBQUksQ0FBQyxPQUE2QixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQzFGO1NBQ0Y7UUFDRCx1Q0FBVyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUUsT0FBTyxJQUFFO0lBQzFDLENBQUM7SUFFTyxNQUFNLENBQUMsMEJBQTBCLENBQUMsSUFDNkI7UUFDckUsTUFBTSxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQy9FLHVDQUFXLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBRSxPQUFPLElBQUU7SUFDMUMsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkNvbmRpdGlvblNlcmlhbGl6ZXIsIEFqZkZvcm11bGFTZXJpYWxpemVyLCBhbHdheXNDb25kaXRpb259IGZyb20gJ0BhamYvY29yZS9tb2RlbHMnO1xuXG5pbXBvcnQge0FqZkNoYXJ0RGF0YXNldH0gZnJvbSAnLi4vaW50ZXJmYWNlL2RhdGFzZXQvY2hhcnQtZGF0YXNldCc7XG5pbXBvcnQge0FqZkRhdGFzZXR9IGZyb20gJy4uL2ludGVyZmFjZS9kYXRhc2V0L2RhdGFzZXQnO1xuaW1wb3J0IHtBamZUYWJsZURhdGFzZXR9IGZyb20gJy4uL2ludGVyZmFjZS9kYXRhc2V0L3RhYmxlLWRhdGFzZXQnO1xuaW1wb3J0IHtBamZDaGFydFdpZGdldH0gZnJvbSAnLi4vaW50ZXJmYWNlL3dpZGdldHMvY2hhcnQtd2lkZ2V0JztcbmltcG9ydCB7QWpmRGF0YVdpZGdldH0gZnJvbSAnLi4vaW50ZXJmYWNlL3dpZGdldHMvZGF0YS13aWRnZXQnO1xuaW1wb3J0IHtBamZNYXBXaWRnZXR9IGZyb20gJy4uL2ludGVyZmFjZS93aWRnZXRzL21hcC13aWRnZXQnO1xuaW1wb3J0IHtBamZXaWRnZXR9IGZyb20gJy4uL2ludGVyZmFjZS93aWRnZXRzL3dpZGdldCc7XG5pbXBvcnQge0FqZldpZGdldFR5cGV9IGZyb20gJy4uL2ludGVyZmFjZS93aWRnZXRzL3dpZGdldC10eXBlJztcbmltcG9ydCB7QWpmV2lkZ2V0V2l0aENvbnRlbnR9IGZyb20gJy4uL2ludGVyZmFjZS93aWRnZXRzL3dpZGdldC13aXRoLWNvbnRlbnQnO1xuaW1wb3J0IHtjcmVhdGVXaWRnZXR9IGZyb20gJy4uL3V0aWxzL3dpZGdldHMvY3JlYXRlLXdpZGdldCc7XG5cbmltcG9ydCB7QWpmRGF0YXNldFNlcmlhbGl6ZXJ9IGZyb20gJy4vZGF0YXNldC1zZXJpYWxpemVyJztcblxuZXhwb3J0IGNsYXNzIEFqZldpZGdldFNlcmlhbGl6ZXIge1xuICBzdGF0aWMgZnJvbUpzb24oanNvbjogUGFydGlhbDxBamZXaWRnZXQ+KTogQWpmV2lkZ2V0IHtcbiAgICBpZiAoanNvbi53aWRnZXRUeXBlID09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTWFsZm9ybWVkIHdpZGdldCcpO1xuICAgIH1cbiAgICBqc29uLnZpc2liaWxpdHkgPVxuICAgICAgICBqc29uLnZpc2liaWxpdHkgPyBBamZDb25kaXRpb25TZXJpYWxpemVyLmZyb21Kc29uKGpzb24udmlzaWJpbGl0eSkgOiBhbHdheXNDb25kaXRpb24oKTtcbiAgICBqc29uLnN0eWxlcyA9IGpzb24uc3R5bGVzIHx8IHt9O1xuICAgIGNvbnN0IG9iaiA9IGpzb24gYXMgQWpmV2lkZ2V0O1xuICAgIGlmIChvYmoud2lkZ2V0VHlwZSA9PT0gQWpmV2lkZ2V0VHlwZS5MYXlvdXQgfHwgb2JqLndpZGdldFR5cGUgPT09IEFqZldpZGdldFR5cGUuQ29sdW1uKSB7XG4gICAgICByZXR1cm4gQWpmV2lkZ2V0U2VyaWFsaXplci5fd2lkZ2V0V2l0aENvbnRlbnRGcm9tSnNvbihvYmopO1xuICAgIH1cbiAgICBpZiAob2JqLndpZGdldFR5cGUgPT09IEFqZldpZGdldFR5cGUuQ2hhcnQgfHwgb2JqLndpZGdldFR5cGUgPT09IEFqZldpZGdldFR5cGUuVGFibGUpIHtcbiAgICAgIGNvbnN0IHcgPSBBamZXaWRnZXRTZXJpYWxpemVyLl9kYXRhV2lkZ2V0RnJvbUpzb24ob2JqKTtcbiAgICAgIGlmIChvYmoud2lkZ2V0VHlwZSA9PT0gQWpmV2lkZ2V0VHlwZS5DaGFydCkge1xuICAgICAgICBjb25zdCBjdyA9IHcgYXMgQWpmQ2hhcnRXaWRnZXQ7XG4gICAgICAgIGlmIChjdy5sYWJlbHMgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgIGN3LmxhYmVscy5tYXAobCA9PiBBamZGb3JtdWxhU2VyaWFsaXplci5mcm9tSnNvbihsKSk7XG4gICAgICAgIH0gZWxzZSBpZiAoY3cubGFiZWxzICE9IG51bGwpIHtcbiAgICAgICAgICBjdy5sYWJlbHMgPSBBamZGb3JtdWxhU2VyaWFsaXplci5mcm9tSnNvbihjdy5sYWJlbHMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdztcbiAgICB9XG4gICAgaWYgKG9iai53aWRnZXRUeXBlID09PSBBamZXaWRnZXRUeXBlLk1hcCkge1xuICAgICAgY29uc3QgbXcgPSBvYmogYXMgQWpmTWFwV2lkZ2V0O1xuICAgICAgbXcuY29vcmRpbmF0ZSA9IEFqZkZvcm11bGFTZXJpYWxpemVyLmZyb21Kc29uKG13LmNvb3JkaW5hdGUpO1xuICAgIH1cbiAgICByZXR1cm4gb2JqO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgX2RhdGFXaWRnZXRGcm9tSnNvbihqc29uOiBBamZXaWRnZXQmUGFydGlhbDxBamZEYXRhV2lkZ2V0Pik6IEFqZkRhdGFXaWRnZXQge1xuICAgIGxldCBkYXRhc2V0OiBBamZEYXRhc2V0W118QWpmRGF0YXNldFtdW107XG4gICAgaWYgKGpzb24uZGF0YXNldCA9PSBudWxsKSB7XG4gICAgICBkYXRhc2V0ID0gW107XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChqc29uLndpZGdldFR5cGUgPT09IEFqZldpZGdldFR5cGUuVGFibGUpIHtcbiAgICAgICAgZGF0YXNldCA9IChqc29uLmRhdGFzZXQgYXMgQWpmVGFibGVEYXRhc2V0W11bXSlcbiAgICAgICAgICAgICAgICAgICAgICAubWFwKHJvdyA9PiByb3cubWFwKGNlbGwgPT4gQWpmRGF0YXNldFNlcmlhbGl6ZXIuZnJvbUpzb24oY2VsbCkpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRhdGFzZXQgPSAoanNvbi5kYXRhc2V0IGFzIEFqZkNoYXJ0RGF0YXNldFtdKS5tYXAoZCA9PiBBamZEYXRhc2V0U2VyaWFsaXplci5mcm9tSnNvbihkKSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7Li4uY3JlYXRlV2lkZ2V0KGpzb24pLCBkYXRhc2V0fTtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIF93aWRnZXRXaXRoQ29udGVudEZyb21Kc29uKGpzb246IEFqZldpZGdldCZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUGFydGlhbDxBamZXaWRnZXRXaXRoQ29udGVudD4pOiBBamZXaWRnZXRXaXRoQ29udGVudCB7XG4gICAgY29uc3QgY29udGVudCA9IChqc29uLmNvbnRlbnQgfHwgW10pLm1hcChjID0+IEFqZldpZGdldFNlcmlhbGl6ZXIuZnJvbUpzb24oYykpO1xuICAgIHJldHVybiB7Li4uY3JlYXRlV2lkZ2V0KGpzb24pLCBjb250ZW50fTtcbiAgfVxufVxuIl19