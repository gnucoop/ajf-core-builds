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
import { Inject, Injectable, Optional } from '@angular/core';
import { AJF_DEFAULT_WIDGETS } from './default-widgets';
import { componentsMap } from './utils/widgets/widgets-map';
export class AjfWidgetService {
    constructor(defaultWidgets) {
        this.componentsMap = componentsMap;
        if (defaultWidgets != null) {
            for (const key in defaultWidgets) {
                const nKey = parseInt(key, 10);
                this.componentsMap[nKey] = defaultWidgets[key];
            }
        }
    }
    registerCustomWidget(widget) {
        const { widgetType, component } = widget;
        if (widgetType < 100) {
            throw new Error('Invalid custom widget type, it must be greater than 100');
        }
        if (component == null) {
            throw new Error('Invalid custom widget component');
        }
        this.componentsMap[widgetType] = widget;
    }
}
AjfWidgetService.decorators = [
    { type: Injectable }
];
AjfWidgetService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [AJF_DEFAULT_WIDGETS,] }] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0LXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9yZXBvcnRzL3dpZGdldC1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBTyxNQUFNLGVBQWUsQ0FBQztBQUdqRSxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUV0RCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sNkJBQTZCLENBQUM7QUFHMUQsTUFBTSxPQUFnQixnQkFBZ0I7SUFHcEMsWUFBcUQsY0FBc0M7UUFGbEYsa0JBQWEsR0FBMkIsYUFBYSxDQUFDO1FBRzdELElBQUksY0FBYyxJQUFJLElBQUksRUFBRTtZQUMxQixLQUFLLE1BQU0sR0FBRyxJQUFJLGNBQWMsRUFBRTtnQkFDaEMsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFDL0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDaEQ7U0FDRjtJQUNILENBQUM7SUFFRCxvQkFBb0IsQ0FBQyxNQUlwQjtRQUNDLE1BQU0sRUFBQyxVQUFVLEVBQUUsU0FBUyxFQUFDLEdBQUcsTUFBTSxDQUFDO1FBQ3ZDLElBQUksVUFBVSxHQUFHLEdBQUcsRUFBRTtZQUNwQixNQUFNLElBQUksS0FBSyxDQUFDLHlEQUF5RCxDQUFDLENBQUM7U0FDNUU7UUFDRCxJQUFJLFNBQVMsSUFBSSxJQUFJLEVBQUU7WUFDckIsTUFBTSxJQUFJLEtBQUssQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO1NBQ3BEO1FBQ0QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsR0FBRyxNQUFNLENBQUM7SUFDMUMsQ0FBQzs7O1lBMUJGLFVBQVU7Ozs0Q0FJSSxRQUFRLFlBQUksTUFBTSxTQUFDLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtJbmplY3QsIEluamVjdGFibGUsIE9wdGlvbmFsLCBUeXBlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtBamZCYXNlV2lkZ2V0Q29tcG9uZW50fSBmcm9tICcuL2Jhc2Utd2lkZ2V0JztcbmltcG9ydCB7QUpGX0RFRkFVTFRfV0lER0VUU30gZnJvbSAnLi9kZWZhdWx0LXdpZGdldHMnO1xuaW1wb3J0IHtBamZXaWRnZXRDb21wb25lbnRzTWFwfSBmcm9tICcuL2ludGVyZmFjZS93aWRnZXRzL3dpZGdldC1jb21wb25lbnRzLW1hcCc7XG5pbXBvcnQge2NvbXBvbmVudHNNYXB9IGZyb20gJy4vdXRpbHMvd2lkZ2V0cy93aWRnZXRzLW1hcCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBamZXaWRnZXRTZXJ2aWNlIHtcbiAgcmVhZG9ubHkgY29tcG9uZW50c01hcDogQWpmV2lkZ2V0Q29tcG9uZW50c01hcCA9IGNvbXBvbmVudHNNYXA7XG5cbiAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgQEluamVjdChBSkZfREVGQVVMVF9XSURHRVRTKSBkZWZhdWx0V2lkZ2V0czogQWpmV2lkZ2V0Q29tcG9uZW50c01hcCkge1xuICAgIGlmIChkZWZhdWx0V2lkZ2V0cyAhPSBudWxsKSB7XG4gICAgICBmb3IgKGNvbnN0IGtleSBpbiBkZWZhdWx0V2lkZ2V0cykge1xuICAgICAgICBjb25zdCBuS2V5ID0gcGFyc2VJbnQoa2V5LCAxMCk7XG4gICAgICAgIHRoaXMuY29tcG9uZW50c01hcFtuS2V5XSA9IGRlZmF1bHRXaWRnZXRzW2tleV07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmVnaXN0ZXJDdXN0b21XaWRnZXQod2lkZ2V0OiB7XG4gICAgd2lkZ2V0VHlwZTogbnVtYmVyLFxuICAgIGNvbXBvbmVudDogVHlwZTxBamZCYXNlV2lkZ2V0Q29tcG9uZW50PixcbiAgICBpbnB1dHM/OiB7W2tleTogc3RyaW5nXTogYW55fSxcbiAgfSk6IHZvaWQge1xuICAgIGNvbnN0IHt3aWRnZXRUeXBlLCBjb21wb25lbnR9ID0gd2lkZ2V0O1xuICAgIGlmICh3aWRnZXRUeXBlIDwgMTAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgY3VzdG9tIHdpZGdldCB0eXBlLCBpdCBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAxMDAnKTtcbiAgICB9XG4gICAgaWYgKGNvbXBvbmVudCA9PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgY3VzdG9tIHdpZGdldCBjb21wb25lbnQnKTtcbiAgICB9XG4gICAgdGhpcy5jb21wb25lbnRzTWFwW3dpZGdldFR5cGVdID0gd2lkZ2V0O1xuICB9XG59XG4iXX0=