/**
 * @fileoverview added by tsickle
 * Generated from: src/core/reports/serializers/widget-serializer.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
        let dataset;
        if (json.dataset == null) {
            dataset = [];
        }
        else {
            if (json.widgetType === AjfWidgetType.Table) {
                dataset = ((/** @type {?} */ (json.dataset)))
                    .map((/**
                 * @param {?} row
                 * @return {?}
                 */
                row => row.map((/**
                 * @param {?} cell
                 * @return {?}
                 */
                cell => AjfDatasetSerializer.fromJson(cell)))));
            }
            else {
                dataset = ((/** @type {?} */ (json.dataset))).map((/**
                 * @param {?} d
                 * @return {?}
                 */
                d => AjfDatasetSerializer.fromJson(d)));
            }
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0LXNlcmlhbGl6ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9yZXBvcnRzL3NlcmlhbGl6ZXJzL3dpZGdldC1zZXJpYWxpemVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBLE9BQU8sRUFBQyxzQkFBc0IsRUFBRSxvQkFBb0IsRUFBRSxlQUFlLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQVMvRixPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sa0NBQWtDLENBQUM7QUFFL0QsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGdDQUFnQyxDQUFDO0FBRTVELE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBRTFELE1BQU0sT0FBTyxtQkFBbUI7Ozs7O0lBQzlCLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBd0I7UUFDdEMsSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksRUFBRTtZQUMzQixNQUFNLElBQUksS0FBSyxDQUFDLGtCQUFrQixDQUFDLENBQUM7U0FDckM7UUFDRCxJQUFJLENBQUMsVUFBVTtZQUNYLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLHNCQUFzQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQzNGLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUM7O2NBQzFCLEdBQUcsR0FBRyxtQkFBQSxJQUFJLEVBQWE7UUFDN0IsSUFBSSxHQUFHLENBQUMsVUFBVSxLQUFLLGFBQWEsQ0FBQyxNQUFNLElBQUksR0FBRyxDQUFDLFVBQVUsS0FBSyxhQUFhLENBQUMsTUFBTSxFQUFFO1lBQ3RGLE9BQU8sbUJBQW1CLENBQUMsMEJBQTBCLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDNUQ7UUFDRCxJQUFJLEdBQUcsQ0FBQyxVQUFVLEtBQUssYUFBYSxDQUFDLEtBQUssSUFBSSxHQUFHLENBQUMsVUFBVSxLQUFLLGFBQWEsQ0FBQyxLQUFLLEVBQUU7O2tCQUM5RSxDQUFDLEdBQUcsbUJBQW1CLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDO1lBQ3RELElBQUksR0FBRyxDQUFDLFVBQVUsS0FBSyxhQUFhLENBQUMsS0FBSyxFQUFFOztzQkFDcEMsRUFBRSxHQUFHLG1CQUFBLENBQUMsRUFBa0I7Z0JBQzlCLElBQUksRUFBRSxDQUFDLE1BQU0sWUFBWSxLQUFLLEVBQUU7b0JBQzlCLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRzs7OztvQkFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDO2lCQUN0RDtxQkFBTSxJQUFJLEVBQUUsQ0FBQyxNQUFNLElBQUksSUFBSSxFQUFFO29CQUM1QixFQUFFLENBQUMsTUFBTSxHQUFHLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7aUJBQ3REO2FBQ0Y7WUFDRCxPQUFPLENBQUMsQ0FBQztTQUNWO1FBQ0QsSUFBSSxHQUFHLENBQUMsVUFBVSxLQUFLLGFBQWEsQ0FBQyxHQUFHLEVBQUU7O2tCQUNsQyxFQUFFLEdBQUcsbUJBQUEsR0FBRyxFQUFnQjtZQUM5QixFQUFFLENBQUMsVUFBVSxHQUFHLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDOUQ7UUFDRCxPQUFPLEdBQUcsQ0FBQztJQUNiLENBQUM7Ozs7OztJQUVPLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxJQUFzQzs7WUFDbkUsT0FBb0M7UUFDeEMsSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksRUFBRTtZQUN4QixPQUFPLEdBQUcsRUFBRSxDQUFDO1NBQ2Q7YUFBTTtZQUNMLElBQUksSUFBSSxDQUFDLFVBQVUsS0FBSyxhQUFhLENBQUMsS0FBSyxFQUFFO2dCQUMzQyxPQUFPLEdBQUcsQ0FBQyxtQkFBQSxJQUFJLENBQUMsT0FBTyxFQUF1QixDQUFDO3FCQUNoQyxHQUFHOzs7O2dCQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUc7Ozs7Z0JBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUMsRUFBQyxDQUFDO2FBQ2pGO2lCQUFNO2dCQUNMLE9BQU8sR0FBRyxDQUFDLG1CQUFBLElBQUksQ0FBQyxPQUFPLEVBQXFCLENBQUMsQ0FBQyxHQUFHOzs7O2dCQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsb0JBQW9CLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUM7YUFDMUY7U0FDRjtRQUNELHVDQUFXLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBRSxPQUFPLElBQUU7SUFDMUMsQ0FBQzs7Ozs7O0lBRU8sTUFBTSxDQUFDLDBCQUEwQixDQUFDLElBQzZCOztjQUMvRCxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEdBQUc7Ozs7UUFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBQztRQUM5RSx1Q0FBVyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUUsT0FBTyxJQUFFO0lBQzFDLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZDb25kaXRpb25TZXJpYWxpemVyLCBBamZGb3JtdWxhU2VyaWFsaXplciwgYWx3YXlzQ29uZGl0aW9ufSBmcm9tICdAYWpmL2NvcmUvbW9kZWxzJztcblxuaW1wb3J0IHtBamZDaGFydERhdGFzZXR9IGZyb20gJy4uL2ludGVyZmFjZS9kYXRhc2V0L2NoYXJ0LWRhdGFzZXQnO1xuaW1wb3J0IHtBamZEYXRhc2V0fSBmcm9tICcuLi9pbnRlcmZhY2UvZGF0YXNldC9kYXRhc2V0JztcbmltcG9ydCB7QWpmVGFibGVEYXRhc2V0fSBmcm9tICcuLi9pbnRlcmZhY2UvZGF0YXNldC90YWJsZS1kYXRhc2V0JztcbmltcG9ydCB7QWpmQ2hhcnRXaWRnZXR9IGZyb20gJy4uL2ludGVyZmFjZS93aWRnZXRzL2NoYXJ0LXdpZGdldCc7XG5pbXBvcnQge0FqZkRhdGFXaWRnZXR9IGZyb20gJy4uL2ludGVyZmFjZS93aWRnZXRzL2RhdGEtd2lkZ2V0JztcbmltcG9ydCB7QWpmTWFwV2lkZ2V0fSBmcm9tICcuLi9pbnRlcmZhY2Uvd2lkZ2V0cy9tYXAtd2lkZ2V0JztcbmltcG9ydCB7QWpmV2lkZ2V0fSBmcm9tICcuLi9pbnRlcmZhY2Uvd2lkZ2V0cy93aWRnZXQnO1xuaW1wb3J0IHtBamZXaWRnZXRUeXBlfSBmcm9tICcuLi9pbnRlcmZhY2Uvd2lkZ2V0cy93aWRnZXQtdHlwZSc7XG5pbXBvcnQge0FqZldpZGdldFdpdGhDb250ZW50fSBmcm9tICcuLi9pbnRlcmZhY2Uvd2lkZ2V0cy93aWRnZXQtd2l0aC1jb250ZW50JztcbmltcG9ydCB7Y3JlYXRlV2lkZ2V0fSBmcm9tICcuLi91dGlscy93aWRnZXRzL2NyZWF0ZS13aWRnZXQnO1xuXG5pbXBvcnQge0FqZkRhdGFzZXRTZXJpYWxpemVyfSBmcm9tICcuL2RhdGFzZXQtc2VyaWFsaXplcic7XG5cbmV4cG9ydCBjbGFzcyBBamZXaWRnZXRTZXJpYWxpemVyIHtcbiAgc3RhdGljIGZyb21Kc29uKGpzb246IFBhcnRpYWw8QWpmV2lkZ2V0Pik6IEFqZldpZGdldCB7XG4gICAgaWYgKGpzb24ud2lkZ2V0VHlwZSA9PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ01hbGZvcm1lZCB3aWRnZXQnKTtcbiAgICB9XG4gICAganNvbi52aXNpYmlsaXR5ID1cbiAgICAgICAganNvbi52aXNpYmlsaXR5ID8gQWpmQ29uZGl0aW9uU2VyaWFsaXplci5mcm9tSnNvbihqc29uLnZpc2liaWxpdHkpIDogYWx3YXlzQ29uZGl0aW9uKCk7XG4gICAganNvbi5zdHlsZXMgPSBqc29uLnN0eWxlcyB8fCB7fTtcbiAgICBjb25zdCBvYmogPSBqc29uIGFzIEFqZldpZGdldDtcbiAgICBpZiAob2JqLndpZGdldFR5cGUgPT09IEFqZldpZGdldFR5cGUuTGF5b3V0IHx8IG9iai53aWRnZXRUeXBlID09PSBBamZXaWRnZXRUeXBlLkNvbHVtbikge1xuICAgICAgcmV0dXJuIEFqZldpZGdldFNlcmlhbGl6ZXIuX3dpZGdldFdpdGhDb250ZW50RnJvbUpzb24ob2JqKTtcbiAgICB9XG4gICAgaWYgKG9iai53aWRnZXRUeXBlID09PSBBamZXaWRnZXRUeXBlLkNoYXJ0IHx8IG9iai53aWRnZXRUeXBlID09PSBBamZXaWRnZXRUeXBlLlRhYmxlKSB7XG4gICAgICBjb25zdCB3ID0gQWpmV2lkZ2V0U2VyaWFsaXplci5fZGF0YVdpZGdldEZyb21Kc29uKG9iaik7XG4gICAgICBpZiAob2JqLndpZGdldFR5cGUgPT09IEFqZldpZGdldFR5cGUuQ2hhcnQpIHtcbiAgICAgICAgY29uc3QgY3cgPSB3IGFzIEFqZkNoYXJ0V2lkZ2V0O1xuICAgICAgICBpZiAoY3cubGFiZWxzIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICBjdy5sYWJlbHMubWFwKGwgPT4gQWpmRm9ybXVsYVNlcmlhbGl6ZXIuZnJvbUpzb24obCkpO1xuICAgICAgICB9IGVsc2UgaWYgKGN3LmxhYmVscyAhPSBudWxsKSB7XG4gICAgICAgICAgY3cubGFiZWxzID0gQWpmRm9ybXVsYVNlcmlhbGl6ZXIuZnJvbUpzb24oY3cubGFiZWxzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHc7XG4gICAgfVxuICAgIGlmIChvYmoud2lkZ2V0VHlwZSA9PT0gQWpmV2lkZ2V0VHlwZS5NYXApIHtcbiAgICAgIGNvbnN0IG13ID0gb2JqIGFzIEFqZk1hcFdpZGdldDtcbiAgICAgIG13LmNvb3JkaW5hdGUgPSBBamZGb3JtdWxhU2VyaWFsaXplci5mcm9tSnNvbihtdy5jb29yZGluYXRlKTtcbiAgICB9XG4gICAgcmV0dXJuIG9iajtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIF9kYXRhV2lkZ2V0RnJvbUpzb24oanNvbjogQWpmV2lkZ2V0JlBhcnRpYWw8QWpmRGF0YVdpZGdldD4pOiBBamZEYXRhV2lkZ2V0IHtcbiAgICBsZXQgZGF0YXNldDogQWpmRGF0YXNldFtdfEFqZkRhdGFzZXRbXVtdO1xuICAgIGlmIChqc29uLmRhdGFzZXQgPT0gbnVsbCkge1xuICAgICAgZGF0YXNldCA9IFtdO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoanNvbi53aWRnZXRUeXBlID09PSBBamZXaWRnZXRUeXBlLlRhYmxlKSB7XG4gICAgICAgIGRhdGFzZXQgPSAoanNvbi5kYXRhc2V0IGFzIEFqZlRhYmxlRGF0YXNldFtdW10pXG4gICAgICAgICAgICAgICAgICAgICAgLm1hcChyb3cgPT4gcm93Lm1hcChjZWxsID0+IEFqZkRhdGFzZXRTZXJpYWxpemVyLmZyb21Kc29uKGNlbGwpKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkYXRhc2V0ID0gKGpzb24uZGF0YXNldCBhcyBBamZDaGFydERhdGFzZXRbXSkubWFwKGQgPT4gQWpmRGF0YXNldFNlcmlhbGl6ZXIuZnJvbUpzb24oZCkpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gey4uLmNyZWF0ZVdpZGdldChqc29uKSwgZGF0YXNldH07XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBfd2lkZ2V0V2l0aENvbnRlbnRGcm9tSnNvbihqc29uOiBBamZXaWRnZXQmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFBhcnRpYWw8QWpmV2lkZ2V0V2l0aENvbnRlbnQ+KTogQWpmV2lkZ2V0V2l0aENvbnRlbnQge1xuICAgIGNvbnN0IGNvbnRlbnQgPSAoanNvbi5jb250ZW50IHx8IFtdKS5tYXAoYyA9PiBBamZXaWRnZXRTZXJpYWxpemVyLmZyb21Kc29uKGMpKTtcbiAgICByZXR1cm4gey4uLmNyZWF0ZVdpZGdldChqc29uKSwgY29udGVudH07XG4gIH1cbn1cbiJdfQ==