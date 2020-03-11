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
import { AjfGetColumnContentPipe } from './get-column-content';
import { AjfWidgetHost } from './widget-host';
var AjfReportsModule = /** @class */ (function () {
    function AjfReportsModule() {
    }
    AjfReportsModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        AjfGetColumnContentPipe,
                        AjfWidgetHost,
                    ],
                    exports: [
                        AjfGetColumnContentPipe,
                        AjfWidgetHost,
                    ],
                },] }
    ];
    return AjfReportsModule;
}());
export { AjfReportsModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwb3J0cy1tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9yZXBvcnRzL3JlcG9ydHMtbW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFdkMsT0FBTyxFQUFDLHVCQUF1QixFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDN0QsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUU1QztJQUFBO0lBV0EsQ0FBQzs7Z0JBWEEsUUFBUSxTQUFDO29CQUNSLFlBQVksRUFBRTt3QkFDWix1QkFBdUI7d0JBQ3ZCLGFBQWE7cUJBQ2Q7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLHVCQUF1Qjt3QkFDdkIsYUFBYTtxQkFDZDtpQkFDRjs7SUFFRCx1QkFBQztDQUFBLEFBWEQsSUFXQztTQURZLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7QWpmR2V0Q29sdW1uQ29udGVudFBpcGV9IGZyb20gJy4vZ2V0LWNvbHVtbi1jb250ZW50JztcbmltcG9ydCB7QWpmV2lkZ2V0SG9zdH0gZnJvbSAnLi93aWRnZXQtaG9zdCc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1xuICAgIEFqZkdldENvbHVtbkNvbnRlbnRQaXBlLFxuICAgIEFqZldpZGdldEhvc3QsXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBBamZHZXRDb2x1bW5Db250ZW50UGlwZSxcbiAgICBBamZXaWRnZXRIb3N0LFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBBamZSZXBvcnRzTW9kdWxlIHtcbn1cbiJdfQ==