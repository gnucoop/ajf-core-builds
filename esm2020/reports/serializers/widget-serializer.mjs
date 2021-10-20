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
        json.visibility = json.visibility
            ? AjfConditionSerializer.fromJson(json.visibility)
            : alwaysCondition();
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
                dataset = json.dataset.map(row => row.map(cell => AjfDatasetSerializer.fromJson(cell)));
            }
            else {
                dataset = json.dataset.map(d => AjfDatasetSerializer.fromJson(d));
            }
        }
        return { ...createWidget(json), dataset };
    }
    static _widgetWithContentFromJson(json) {
        const content = (json.content || []).map(c => AjfWidgetSerializer.fromJson(c));
        return { ...createWidget(json), content };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0LXNlcmlhbGl6ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9yZXBvcnRzL3NlcmlhbGl6ZXJzL3dpZGdldC1zZXJpYWxpemVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFBQyxzQkFBc0IsRUFBRSxvQkFBb0IsRUFBRSxlQUFlLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQVMvRixPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sa0NBQWtDLENBQUM7QUFFL0QsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGdDQUFnQyxDQUFDO0FBRTVELE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBRTFELE1BQU0sT0FBTyxtQkFBbUI7SUFDOUIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUF3QjtRQUN0QyxJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxFQUFFO1lBQzNCLE1BQU0sSUFBSSxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQztTQUNyQztRQUNELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVU7WUFDL0IsQ0FBQyxDQUFDLHNCQUFzQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO1lBQ2xELENBQUMsQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFDO1FBQ2hDLE1BQU0sR0FBRyxHQUFHLElBQWlCLENBQUM7UUFDOUIsSUFBSSxHQUFHLENBQUMsVUFBVSxLQUFLLGFBQWEsQ0FBQyxNQUFNLElBQUksR0FBRyxDQUFDLFVBQVUsS0FBSyxhQUFhLENBQUMsTUFBTSxFQUFFO1lBQ3RGLE9BQU8sbUJBQW1CLENBQUMsMEJBQTBCLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDNUQ7UUFDRCxJQUFJLEdBQUcsQ0FBQyxVQUFVLEtBQUssYUFBYSxDQUFDLEtBQUssSUFBSSxHQUFHLENBQUMsVUFBVSxLQUFLLGFBQWEsQ0FBQyxLQUFLLEVBQUU7WUFDcEYsTUFBTSxDQUFDLEdBQUcsbUJBQW1CLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDdkQsSUFBSSxHQUFHLENBQUMsVUFBVSxLQUFLLGFBQWEsQ0FBQyxLQUFLLEVBQUU7Z0JBQzFDLE1BQU0sRUFBRSxHQUFHLENBQW1CLENBQUM7Z0JBQy9CLElBQUksRUFBRSxDQUFDLE1BQU0sWUFBWSxLQUFLLEVBQUU7b0JBQzlCLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsb0JBQW9CLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ3REO3FCQUFNLElBQUksRUFBRSxDQUFDLE1BQU0sSUFBSSxJQUFJLEVBQUU7b0JBQzVCLEVBQUUsQ0FBQyxNQUFNLEdBQUcsb0JBQW9CLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztpQkFDdEQ7YUFDRjtZQUNELE9BQU8sQ0FBQyxDQUFDO1NBQ1Y7UUFDRCxJQUFJLEdBQUcsQ0FBQyxVQUFVLEtBQUssYUFBYSxDQUFDLEdBQUcsRUFBRTtZQUN4QyxNQUFNLEVBQUUsR0FBRyxHQUFtQixDQUFDO1lBQy9CLEVBQUUsQ0FBQyxVQUFVLEdBQUcsb0JBQW9CLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUM5RDtRQUNELE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQztJQUVPLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxJQUF3QztRQUN6RSxJQUFJLE9BQXNDLENBQUM7UUFDM0MsSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksRUFBRTtZQUN4QixPQUFPLEdBQUcsRUFBRSxDQUFDO1NBQ2Q7YUFBTTtZQUNMLElBQUksSUFBSSxDQUFDLFVBQVUsS0FBSyxhQUFhLENBQUMsS0FBSyxFQUFFO2dCQUMzQyxPQUFPLEdBQUksSUFBSSxDQUFDLE9BQStCLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQ3hELEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FDckQsQ0FBQzthQUNIO2lCQUFNO2dCQUNMLE9BQU8sR0FBSSxJQUFJLENBQUMsT0FBNkIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUMxRjtTQUNGO1FBQ0QsT0FBTyxFQUFDLEdBQUcsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBQyxDQUFDO0lBQzFDLENBQUM7SUFFTyxNQUFNLENBQUMsMEJBQTBCLENBQ3ZDLElBQStDO1FBRS9DLE1BQU0sT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMvRSxPQUFPLEVBQUMsR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFDLENBQUM7SUFDMUMsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkNvbmRpdGlvblNlcmlhbGl6ZXIsIEFqZkZvcm11bGFTZXJpYWxpemVyLCBhbHdheXNDb25kaXRpb259IGZyb20gJ0BhamYvY29yZS9tb2RlbHMnO1xuXG5pbXBvcnQge0FqZkNoYXJ0RGF0YXNldH0gZnJvbSAnLi4vaW50ZXJmYWNlL2RhdGFzZXQvY2hhcnQtZGF0YXNldCc7XG5pbXBvcnQge0FqZkRhdGFzZXR9IGZyb20gJy4uL2ludGVyZmFjZS9kYXRhc2V0L2RhdGFzZXQnO1xuaW1wb3J0IHtBamZUYWJsZURhdGFzZXR9IGZyb20gJy4uL2ludGVyZmFjZS9kYXRhc2V0L3RhYmxlLWRhdGFzZXQnO1xuaW1wb3J0IHtBamZDaGFydFdpZGdldH0gZnJvbSAnLi4vaW50ZXJmYWNlL3dpZGdldHMvY2hhcnQtd2lkZ2V0JztcbmltcG9ydCB7QWpmRGF0YVdpZGdldH0gZnJvbSAnLi4vaW50ZXJmYWNlL3dpZGdldHMvZGF0YS13aWRnZXQnO1xuaW1wb3J0IHtBamZNYXBXaWRnZXR9IGZyb20gJy4uL2ludGVyZmFjZS93aWRnZXRzL21hcC13aWRnZXQnO1xuaW1wb3J0IHtBamZXaWRnZXR9IGZyb20gJy4uL2ludGVyZmFjZS93aWRnZXRzL3dpZGdldCc7XG5pbXBvcnQge0FqZldpZGdldFR5cGV9IGZyb20gJy4uL2ludGVyZmFjZS93aWRnZXRzL3dpZGdldC10eXBlJztcbmltcG9ydCB7QWpmV2lkZ2V0V2l0aENvbnRlbnR9IGZyb20gJy4uL2ludGVyZmFjZS93aWRnZXRzL3dpZGdldC13aXRoLWNvbnRlbnQnO1xuaW1wb3J0IHtjcmVhdGVXaWRnZXR9IGZyb20gJy4uL3V0aWxzL3dpZGdldHMvY3JlYXRlLXdpZGdldCc7XG5cbmltcG9ydCB7QWpmRGF0YXNldFNlcmlhbGl6ZXJ9IGZyb20gJy4vZGF0YXNldC1zZXJpYWxpemVyJztcblxuZXhwb3J0IGNsYXNzIEFqZldpZGdldFNlcmlhbGl6ZXIge1xuICBzdGF0aWMgZnJvbUpzb24oanNvbjogUGFydGlhbDxBamZXaWRnZXQ+KTogQWpmV2lkZ2V0IHtcbiAgICBpZiAoanNvbi53aWRnZXRUeXBlID09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTWFsZm9ybWVkIHdpZGdldCcpO1xuICAgIH1cbiAgICBqc29uLnZpc2liaWxpdHkgPSBqc29uLnZpc2liaWxpdHlcbiAgICAgID8gQWpmQ29uZGl0aW9uU2VyaWFsaXplci5mcm9tSnNvbihqc29uLnZpc2liaWxpdHkpXG4gICAgICA6IGFsd2F5c0NvbmRpdGlvbigpO1xuICAgIGpzb24uc3R5bGVzID0ganNvbi5zdHlsZXMgfHwge307XG4gICAgY29uc3Qgb2JqID0ganNvbiBhcyBBamZXaWRnZXQ7XG4gICAgaWYgKG9iai53aWRnZXRUeXBlID09PSBBamZXaWRnZXRUeXBlLkxheW91dCB8fCBvYmoud2lkZ2V0VHlwZSA9PT0gQWpmV2lkZ2V0VHlwZS5Db2x1bW4pIHtcbiAgICAgIHJldHVybiBBamZXaWRnZXRTZXJpYWxpemVyLl93aWRnZXRXaXRoQ29udGVudEZyb21Kc29uKG9iaik7XG4gICAgfVxuICAgIGlmIChvYmoud2lkZ2V0VHlwZSA9PT0gQWpmV2lkZ2V0VHlwZS5DaGFydCB8fCBvYmoud2lkZ2V0VHlwZSA9PT0gQWpmV2lkZ2V0VHlwZS5UYWJsZSkge1xuICAgICAgY29uc3QgdyA9IEFqZldpZGdldFNlcmlhbGl6ZXIuX2RhdGFXaWRnZXRGcm9tSnNvbihvYmopO1xuICAgICAgaWYgKG9iai53aWRnZXRUeXBlID09PSBBamZXaWRnZXRUeXBlLkNoYXJ0KSB7XG4gICAgICAgIGNvbnN0IGN3ID0gdyBhcyBBamZDaGFydFdpZGdldDtcbiAgICAgICAgaWYgKGN3LmxhYmVscyBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgY3cubGFiZWxzLm1hcChsID0+IEFqZkZvcm11bGFTZXJpYWxpemVyLmZyb21Kc29uKGwpKTtcbiAgICAgICAgfSBlbHNlIGlmIChjdy5sYWJlbHMgIT0gbnVsbCkge1xuICAgICAgICAgIGN3LmxhYmVscyA9IEFqZkZvcm11bGFTZXJpYWxpemVyLmZyb21Kc29uKGN3LmxhYmVscyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB3O1xuICAgIH1cbiAgICBpZiAob2JqLndpZGdldFR5cGUgPT09IEFqZldpZGdldFR5cGUuTWFwKSB7XG4gICAgICBjb25zdCBtdyA9IG9iaiBhcyBBamZNYXBXaWRnZXQ7XG4gICAgICBtdy5jb29yZGluYXRlID0gQWpmRm9ybXVsYVNlcmlhbGl6ZXIuZnJvbUpzb24obXcuY29vcmRpbmF0ZSk7XG4gICAgfVxuICAgIHJldHVybiBvYmo7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBfZGF0YVdpZGdldEZyb21Kc29uKGpzb246IEFqZldpZGdldCAmIFBhcnRpYWw8QWpmRGF0YVdpZGdldD4pOiBBamZEYXRhV2lkZ2V0IHtcbiAgICBsZXQgZGF0YXNldDogQWpmRGF0YXNldFtdIHwgQWpmRGF0YXNldFtdW107XG4gICAgaWYgKGpzb24uZGF0YXNldCA9PSBudWxsKSB7XG4gICAgICBkYXRhc2V0ID0gW107XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChqc29uLndpZGdldFR5cGUgPT09IEFqZldpZGdldFR5cGUuVGFibGUpIHtcbiAgICAgICAgZGF0YXNldCA9IChqc29uLmRhdGFzZXQgYXMgQWpmVGFibGVEYXRhc2V0W11bXSkubWFwKHJvdyA9PlxuICAgICAgICAgIHJvdy5tYXAoY2VsbCA9PiBBamZEYXRhc2V0U2VyaWFsaXplci5mcm9tSnNvbihjZWxsKSksXG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkYXRhc2V0ID0gKGpzb24uZGF0YXNldCBhcyBBamZDaGFydERhdGFzZXRbXSkubWFwKGQgPT4gQWpmRGF0YXNldFNlcmlhbGl6ZXIuZnJvbUpzb24oZCkpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gey4uLmNyZWF0ZVdpZGdldChqc29uKSwgZGF0YXNldH07XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBfd2lkZ2V0V2l0aENvbnRlbnRGcm9tSnNvbihcbiAgICBqc29uOiBBamZXaWRnZXQgJiBQYXJ0aWFsPEFqZldpZGdldFdpdGhDb250ZW50PixcbiAgKTogQWpmV2lkZ2V0V2l0aENvbnRlbnQge1xuICAgIGNvbnN0IGNvbnRlbnQgPSAoanNvbi5jb250ZW50IHx8IFtdKS5tYXAoYyA9PiBBamZXaWRnZXRTZXJpYWxpemVyLmZyb21Kc29uKGMpKTtcbiAgICByZXR1cm4gey4uLmNyZWF0ZVdpZGdldChqc29uKSwgY29udGVudH07XG4gIH1cbn1cbiJdfQ==