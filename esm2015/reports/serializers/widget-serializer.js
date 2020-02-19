/**
 * @fileoverview added by tsickle
 * Generated from: src/core/reports/serializers/widget-serializer.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
import { AjfConditionSerializer, AjfFormulaSerializer, alwaysCondition } from '@ajf/core/models';
import { AjfWidgetType } from '../interface/widgets/widget-type';
import { createWidget } from '../utils/widgets/create-widget';
import { AjfDatasetSerializer } from './dataset-serializer';
export class AjfWidgetSerializer {
    /**
     * @param {?} json
     * @return {?}
     */
    static fromJson(json) {
        if (json.widgetType == null) {
            throw new Error('Malformed widget');
        }
        json.visibility =
            json.visibility ? AjfConditionSerializer.fromJson(json.visibility) : alwaysCondition();
        json.styles = json.styles || {};
        /** @type {?} */
        const obj = (/** @type {?} */ (json));
        if (obj.widgetType === AjfWidgetType.Layout || obj.widgetType === AjfWidgetType.Column) {
            return AjfWidgetSerializer._widgetWithContentFromJson(obj);
        }
        if (obj.widgetType === AjfWidgetType.Chart || obj.widgetType === AjfWidgetType.Table) {
            /** @type {?} */
            const w = AjfWidgetSerializer._dataWidgetFromJson(obj);
            if (obj.widgetType === AjfWidgetType.Chart) {
                /** @type {?} */
                const cw = (/** @type {?} */ (w));
                if (cw.labels instanceof Array) {
                    cw.labels.map((/**
                     * @param {?} l
                     * @return {?}
                     */
                    l => AjfFormulaSerializer.fromJson(l)));
                }
                else if (cw.labels != null) {
                    cw.labels = AjfFormulaSerializer.fromJson(cw.labels);
                }
            }
            return w;
        }
        if (obj.widgetType === AjfWidgetType.Map) {
            /** @type {?} */
            const mw = (/** @type {?} */ (obj));
            mw.coordinate = AjfFormulaSerializer.fromJson(mw.coordinate);
        }
        return obj;
    }
    /**
     * @private
     * @param {?} json
     * @return {?}
     */
    static _dataWidgetFromJson(json) {
        /** @type {?} */
        const dataset = json.dataset ?
            (json.widgetType === AjfWidgetType.Table ?
                ((/** @type {?} */ (json.dataset)))
                    .map((/**
                 * @param {?} row
                 * @return {?}
                 */
                row => row.map((/**
                 * @param {?} cell
                 * @return {?}
                 */
                cell => AjfDatasetSerializer.fromJson(cell))))) :
                ((/** @type {?} */ (json.dataset))).map((/**
                 * @param {?} d
                 * @return {?}
                 */
                d => AjfDatasetSerializer.fromJson(d)))) :
            [];
        return Object.assign(Object.assign({}, createWidget(json)), { dataset });
    }
    /**
     * @private
     * @param {?} json
     * @return {?}
     */
    static _widgetWithContentFromJson(json) {
        /** @type {?} */
        const content = (json.content || []).map((/**
         * @param {?} c
         * @return {?}
         */
        c => AjfWidgetSerializer.fromJson(c)));
        return Object.assign(Object.assign({}, createWidget(json)), { content });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0LXNlcmlhbGl6ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9yZXBvcnRzL3NlcmlhbGl6ZXJzL3dpZGdldC1zZXJpYWxpemVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBLE9BQU8sRUFBQyxzQkFBc0IsRUFBRSxvQkFBb0IsRUFBRSxlQUFlLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQVEvRixPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sa0NBQWtDLENBQUM7QUFFL0QsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGdDQUFnQyxDQUFDO0FBRTVELE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBRTFELE1BQU0sT0FBTyxtQkFBbUI7Ozs7O0lBQzlCLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBd0I7UUFDdEMsSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksRUFBRTtZQUMzQixNQUFNLElBQUksS0FBSyxDQUFDLGtCQUFrQixDQUFDLENBQUM7U0FDckM7UUFDRCxJQUFJLENBQUMsVUFBVTtZQUNYLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLHNCQUFzQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQzNGLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUM7O2NBQzFCLEdBQUcsR0FBRyxtQkFBQSxJQUFJLEVBQWE7UUFDN0IsSUFBSSxHQUFHLENBQUMsVUFBVSxLQUFLLGFBQWEsQ0FBQyxNQUFNLElBQUksR0FBRyxDQUFDLFVBQVUsS0FBSyxhQUFhLENBQUMsTUFBTSxFQUFFO1lBQ3RGLE9BQU8sbUJBQW1CLENBQUMsMEJBQTBCLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDNUQ7UUFDRCxJQUFJLEdBQUcsQ0FBQyxVQUFVLEtBQUssYUFBYSxDQUFDLEtBQUssSUFBSSxHQUFHLENBQUMsVUFBVSxLQUFLLGFBQWEsQ0FBQyxLQUFLLEVBQUU7O2tCQUM5RSxDQUFDLEdBQUcsbUJBQW1CLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDO1lBQ3RELElBQUksR0FBRyxDQUFDLFVBQVUsS0FBSyxhQUFhLENBQUMsS0FBSyxFQUFFOztzQkFDcEMsRUFBRSxHQUFHLG1CQUFBLENBQUMsRUFBa0I7Z0JBQzlCLElBQUksRUFBRSxDQUFDLE1BQU0sWUFBWSxLQUFLLEVBQUU7b0JBQzlCLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRzs7OztvQkFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDO2lCQUN0RDtxQkFBTSxJQUFJLEVBQUUsQ0FBQyxNQUFNLElBQUksSUFBSSxFQUFFO29CQUM1QixFQUFFLENBQUMsTUFBTSxHQUFHLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7aUJBQ3REO2FBQ0Y7WUFDRCxPQUFPLENBQUMsQ0FBQztTQUNWO1FBQ0QsSUFBSSxHQUFHLENBQUMsVUFBVSxLQUFLLGFBQWEsQ0FBQyxHQUFHLEVBQUU7O2tCQUNsQyxFQUFFLEdBQUcsbUJBQUEsR0FBRyxFQUFnQjtZQUM5QixFQUFFLENBQUMsVUFBVSxHQUFHLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDOUQ7UUFDRCxPQUFPLEdBQUcsQ0FBQztJQUNiLENBQUM7Ozs7OztJQUVPLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxJQUFzQzs7Y0FDakUsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMxQixDQUFDLElBQUksQ0FBQyxVQUFVLEtBQUssYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNyQyxDQUFDLG1CQUFBLElBQUksQ0FBQyxPQUFPLEVBQXVCLENBQUM7cUJBQ2hDLEdBQUc7Ozs7Z0JBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRzs7OztnQkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBQyxFQUFDLENBQUMsQ0FBQztnQkFDdkUsQ0FBQyxtQkFBQSxJQUFJLENBQUMsT0FBTyxFQUFxQixDQUFDLENBQUMsR0FBRzs7OztnQkFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztZQUN0RixFQUFFO1FBQ04sdUNBQVcsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFFLE9BQU8sSUFBRTtJQUMxQyxDQUFDOzs7Ozs7SUFFTyxNQUFNLENBQUMsMEJBQTBCLENBQUMsSUFDNEI7O2NBQzlELE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDLENBQUMsR0FBRzs7OztRQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsbUJBQW1CLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFDO1FBQzlFLHVDQUFXLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBRSxPQUFPLElBQUU7SUFDMUMsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSAyMDE4IEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmQ29uZGl0aW9uU2VyaWFsaXplciwgQWpmRm9ybXVsYVNlcmlhbGl6ZXIsIGFsd2F5c0NvbmRpdGlvbn0gZnJvbSAnQGFqZi9jb3JlL21vZGVscyc7XG5cbmltcG9ydCB7QWpmQ2hhcnREYXRhc2V0fSBmcm9tICcuLi9pbnRlcmZhY2UvZGF0YXNldC9jaGFydC1kYXRhc2V0JztcbmltcG9ydCB7QWpmVGFibGVEYXRhc2V0fSBmcm9tICcuLi9pbnRlcmZhY2UvZGF0YXNldC90YWJsZS1kYXRhc2V0JztcbmltcG9ydCB7QWpmQ2hhcnRXaWRnZXR9IGZyb20gJy4uL2ludGVyZmFjZS93aWRnZXRzL2NoYXJ0LXdpZGdldCc7XG5pbXBvcnQge0FqZkRhdGFXaWRnZXR9IGZyb20gJy4uL2ludGVyZmFjZS93aWRnZXRzL2RhdGEtd2lkZ2V0JztcbmltcG9ydCB7QWpmTWFwV2lkZ2V0fSBmcm9tICcuLi9pbnRlcmZhY2Uvd2lkZ2V0cy9tYXAtd2lkZ2V0JztcbmltcG9ydCB7QWpmV2lkZ2V0fSBmcm9tICcuLi9pbnRlcmZhY2Uvd2lkZ2V0cy93aWRnZXQnO1xuaW1wb3J0IHtBamZXaWRnZXRUeXBlfSBmcm9tICcuLi9pbnRlcmZhY2Uvd2lkZ2V0cy93aWRnZXQtdHlwZSc7XG5pbXBvcnQge0FqZldpZGdldFdpdGhDb250ZW50fSBmcm9tICcuLi9pbnRlcmZhY2Uvd2lkZ2V0cy93aWRnZXQtd2l0aC1jb250ZW50JztcbmltcG9ydCB7Y3JlYXRlV2lkZ2V0fSBmcm9tICcuLi91dGlscy93aWRnZXRzL2NyZWF0ZS13aWRnZXQnO1xuXG5pbXBvcnQge0FqZkRhdGFzZXRTZXJpYWxpemVyfSBmcm9tICcuL2RhdGFzZXQtc2VyaWFsaXplcic7XG5cbmV4cG9ydCBjbGFzcyBBamZXaWRnZXRTZXJpYWxpemVyIHtcbiAgc3RhdGljIGZyb21Kc29uKGpzb246IFBhcnRpYWw8QWpmV2lkZ2V0Pik6IEFqZldpZGdldCB7XG4gICAgaWYgKGpzb24ud2lkZ2V0VHlwZSA9PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ01hbGZvcm1lZCB3aWRnZXQnKTtcbiAgICB9XG4gICAganNvbi52aXNpYmlsaXR5ID1cbiAgICAgICAganNvbi52aXNpYmlsaXR5ID8gQWpmQ29uZGl0aW9uU2VyaWFsaXplci5mcm9tSnNvbihqc29uLnZpc2liaWxpdHkpIDogYWx3YXlzQ29uZGl0aW9uKCk7XG4gICAganNvbi5zdHlsZXMgPSBqc29uLnN0eWxlcyB8fCB7fTtcbiAgICBjb25zdCBvYmogPSBqc29uIGFzIEFqZldpZGdldDtcbiAgICBpZiAob2JqLndpZGdldFR5cGUgPT09IEFqZldpZGdldFR5cGUuTGF5b3V0IHx8IG9iai53aWRnZXRUeXBlID09PSBBamZXaWRnZXRUeXBlLkNvbHVtbikge1xuICAgICAgcmV0dXJuIEFqZldpZGdldFNlcmlhbGl6ZXIuX3dpZGdldFdpdGhDb250ZW50RnJvbUpzb24ob2JqKTtcbiAgICB9XG4gICAgaWYgKG9iai53aWRnZXRUeXBlID09PSBBamZXaWRnZXRUeXBlLkNoYXJ0IHx8IG9iai53aWRnZXRUeXBlID09PSBBamZXaWRnZXRUeXBlLlRhYmxlKSB7XG4gICAgICBjb25zdCB3ID0gQWpmV2lkZ2V0U2VyaWFsaXplci5fZGF0YVdpZGdldEZyb21Kc29uKG9iaik7XG4gICAgICBpZiAob2JqLndpZGdldFR5cGUgPT09IEFqZldpZGdldFR5cGUuQ2hhcnQpIHtcbiAgICAgICAgY29uc3QgY3cgPSB3IGFzIEFqZkNoYXJ0V2lkZ2V0O1xuICAgICAgICBpZiAoY3cubGFiZWxzIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICBjdy5sYWJlbHMubWFwKGwgPT4gQWpmRm9ybXVsYVNlcmlhbGl6ZXIuZnJvbUpzb24obCkpO1xuICAgICAgICB9IGVsc2UgaWYgKGN3LmxhYmVscyAhPSBudWxsKSB7XG4gICAgICAgICAgY3cubGFiZWxzID0gQWpmRm9ybXVsYVNlcmlhbGl6ZXIuZnJvbUpzb24oY3cubGFiZWxzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHc7XG4gICAgfVxuICAgIGlmIChvYmoud2lkZ2V0VHlwZSA9PT0gQWpmV2lkZ2V0VHlwZS5NYXApIHtcbiAgICAgIGNvbnN0IG13ID0gb2JqIGFzIEFqZk1hcFdpZGdldDtcbiAgICAgIG13LmNvb3JkaW5hdGUgPSBBamZGb3JtdWxhU2VyaWFsaXplci5mcm9tSnNvbihtdy5jb29yZGluYXRlKTtcbiAgICB9XG4gICAgcmV0dXJuIG9iajtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIF9kYXRhV2lkZ2V0RnJvbUpzb24oanNvbjogQWpmV2lkZ2V0JlBhcnRpYWw8QWpmRGF0YVdpZGdldD4pOiBBamZEYXRhV2lkZ2V0IHtcbiAgICBjb25zdCBkYXRhc2V0ID0ganNvbi5kYXRhc2V0ID9cbiAgICAgICAgKGpzb24ud2lkZ2V0VHlwZSA9PT0gQWpmV2lkZ2V0VHlwZS5UYWJsZSA/XG4gICAgICAgICAgICAgKGpzb24uZGF0YXNldCBhcyBBamZUYWJsZURhdGFzZXRbXVtdKVxuICAgICAgICAgICAgICAgICAubWFwKHJvdyA9PiByb3cubWFwKGNlbGwgPT4gQWpmRGF0YXNldFNlcmlhbGl6ZXIuZnJvbUpzb24oY2VsbCkpKSA6XG4gICAgICAgICAgICAgKGpzb24uZGF0YXNldCBhcyBBamZDaGFydERhdGFzZXRbXSkubWFwKGQgPT4gQWpmRGF0YXNldFNlcmlhbGl6ZXIuZnJvbUpzb24oZCkpKSA6XG4gICAgICAgIFtdO1xuICAgIHJldHVybiB7Li4uY3JlYXRlV2lkZ2V0KGpzb24pLCBkYXRhc2V0fTtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIF93aWRnZXRXaXRoQ29udGVudEZyb21Kc29uKGpzb246IEFqZldpZGdldCZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBQYXJ0aWFsPEFqZldpZGdldFdpdGhDb250ZW50Pik6IEFqZldpZGdldFdpdGhDb250ZW50IHtcbiAgICBjb25zdCBjb250ZW50ID0gKGpzb24uY29udGVudCB8fCBbXSkubWFwKGMgPT4gQWpmV2lkZ2V0U2VyaWFsaXplci5mcm9tSnNvbihjKSk7XG4gICAgcmV0dXJuIHsuLi5jcmVhdGVXaWRnZXQoanNvbiksIGNvbnRlbnR9O1xuICB9XG59XG4iXX0=