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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0LXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL3JlcG9ydHMvc3JjL3dpZGdldC1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQU1ILE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQztBQUUxRCxNQUFNLE9BQWdCLGdCQUFnQjtJQUdwQyxZQUFZLGNBQXNDO1FBRnpDLGtCQUFhLEdBQTJCLGFBQWEsQ0FBQztRQUc3RCxJQUFJLGNBQWMsSUFBSSxJQUFJLEVBQUU7WUFDMUIsS0FBSyxNQUFNLEdBQUcsSUFBSSxjQUFjLEVBQUU7Z0JBQ2hDLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBQy9CLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEdBQUcsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ2hEO1NBQ0Y7SUFDSCxDQUFDO0lBRUQsb0JBQW9CLENBQUMsTUFJcEI7UUFDQyxNQUFNLEVBQUMsVUFBVSxFQUFFLFNBQVMsRUFBQyxHQUFHLE1BQU0sQ0FBQztRQUN2QyxJQUFJLFVBQVUsR0FBRyxHQUFHLEVBQUU7WUFDcEIsTUFBTSxJQUFJLEtBQUssQ0FBQyx5REFBeUQsQ0FBQyxDQUFDO1NBQzVFO1FBQ0QsSUFBSSxTQUFTLElBQUksSUFBSSxFQUFFO1lBQ3JCLE1BQU0sSUFBSSxLQUFLLENBQUMsaUNBQWlDLENBQUMsQ0FBQztTQUNwRDtRQUNELElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLEdBQUcsTUFBTSxDQUFDO0lBQzFDLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtUeXBlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtBamZCYXNlV2lkZ2V0Q29tcG9uZW50fSBmcm9tICcuL2Jhc2Utd2lkZ2V0JztcbmltcG9ydCB7QWpmV2lkZ2V0Q29tcG9uZW50c01hcH0gZnJvbSAnLi9pbnRlcmZhY2Uvd2lkZ2V0cy93aWRnZXQtY29tcG9uZW50cy1tYXAnO1xuaW1wb3J0IHtjb21wb25lbnRzTWFwfSBmcm9tICcuL3V0aWxzL3dpZGdldHMvd2lkZ2V0cy1tYXAnO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQWpmV2lkZ2V0U2VydmljZSB7XG4gIHJlYWRvbmx5IGNvbXBvbmVudHNNYXA6IEFqZldpZGdldENvbXBvbmVudHNNYXAgPSBjb21wb25lbnRzTWFwO1xuXG4gIGNvbnN0cnVjdG9yKGRlZmF1bHRXaWRnZXRzOiBBamZXaWRnZXRDb21wb25lbnRzTWFwKSB7XG4gICAgaWYgKGRlZmF1bHRXaWRnZXRzICE9IG51bGwpIHtcbiAgICAgIGZvciAoY29uc3Qga2V5IGluIGRlZmF1bHRXaWRnZXRzKSB7XG4gICAgICAgIGNvbnN0IG5LZXkgPSBwYXJzZUludChrZXksIDEwKTtcbiAgICAgICAgdGhpcy5jb21wb25lbnRzTWFwW25LZXldID0gZGVmYXVsdFdpZGdldHNba2V5XTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZWdpc3RlckN1c3RvbVdpZGdldCh3aWRnZXQ6IHtcbiAgICB3aWRnZXRUeXBlOiBudW1iZXI7XG4gICAgY29tcG9uZW50OiBUeXBlPEFqZkJhc2VXaWRnZXRDb21wb25lbnQ+O1xuICAgIGlucHV0cz86IHtba2V5OiBzdHJpbmddOiBhbnl9O1xuICB9KTogdm9pZCB7XG4gICAgY29uc3Qge3dpZGdldFR5cGUsIGNvbXBvbmVudH0gPSB3aWRnZXQ7XG4gICAgaWYgKHdpZGdldFR5cGUgPCAxMDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBjdXN0b20gd2lkZ2V0IHR5cGUsIGl0IG11c3QgYmUgZ3JlYXRlciB0aGFuIDEwMCcpO1xuICAgIH1cbiAgICBpZiAoY29tcG9uZW50ID09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBjdXN0b20gd2lkZ2V0IGNvbXBvbmVudCcpO1xuICAgIH1cbiAgICB0aGlzLmNvbXBvbmVudHNNYXBbd2lkZ2V0VHlwZV0gPSB3aWRnZXQ7XG4gIH1cbn1cbiJdfQ==