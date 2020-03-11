/**
 * @fileoverview added by tsickle
 * Generated from: src/core/calendar/calendar-module.ts
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
import { NgModule } from '@angular/core';
import { AjfCalendarEntryLabelPipe } from './calendar-entry-label';
import { AjfCalendarService } from './calendar-service';
export class AjfCalendarModule {
}
AjfCalendarModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    AjfCalendarEntryLabelPipe,
                ],
                exports: [
                    AjfCalendarEntryLabelPipe,
                ],
            },] }
];
export class AjfGregorianCalendarModule {
}
AjfGregorianCalendarModule.decorators = [
    { type: NgModule, args: [{
                providers: [
                    AjfCalendarService,
                ],
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItbW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvY2FsZW5kYXIvY2FsZW5kYXItbW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFdkMsT0FBTyxFQUFDLHlCQUF5QixFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDakUsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFVdEQsTUFBTSxPQUFPLGlCQUFpQjs7O1lBUjdCLFFBQVEsU0FBQztnQkFDUixZQUFZLEVBQUU7b0JBQ1oseUJBQXlCO2lCQUMxQjtnQkFDRCxPQUFPLEVBQUU7b0JBQ1AseUJBQXlCO2lCQUMxQjthQUNGOztBQVFELE1BQU0sT0FBTywwQkFBMEI7OztZQUx0QyxRQUFRLFNBQUM7Z0JBQ1IsU0FBUyxFQUFFO29CQUNULGtCQUFrQjtpQkFDbkI7YUFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7QWpmQ2FsZW5kYXJFbnRyeUxhYmVsUGlwZX0gZnJvbSAnLi9jYWxlbmRhci1lbnRyeS1sYWJlbCc7XG5pbXBvcnQge0FqZkNhbGVuZGFyU2VydmljZX0gZnJvbSAnLi9jYWxlbmRhci1zZXJ2aWNlJztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgQWpmQ2FsZW5kYXJFbnRyeUxhYmVsUGlwZSxcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIEFqZkNhbGVuZGFyRW50cnlMYWJlbFBpcGUsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIEFqZkNhbGVuZGFyTW9kdWxlIHsgfVxuXG5ATmdNb2R1bGUoe1xuICBwcm92aWRlcnM6IFtcbiAgICBBamZDYWxlbmRhclNlcnZpY2UsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIEFqZkdyZWdvcmlhbkNhbGVuZGFyTW9kdWxlIHsgfVxuIl19