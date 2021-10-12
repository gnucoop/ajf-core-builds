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
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AjfGetColumnContentPipe } from './get-column-content';
import { AjfReportStringIdentifierPipe } from './report-string-identifier';
import { AjfWidgetExport } from './widget-export';
import { AjfWidgetHost } from './widget-host';
import * as i0 from "@angular/core";
export class AjfReportsModule {
}
AjfReportsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfReportsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AjfReportsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfReportsModule, declarations: [AjfGetColumnContentPipe,
        AjfReportStringIdentifierPipe,
        AjfWidgetHost,
        AjfWidgetExport], imports: [CommonModule], exports: [AjfGetColumnContentPipe,
        AjfReportStringIdentifierPipe,
        AjfWidgetHost,
        AjfWidgetExport] });
AjfReportsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfReportsModule, imports: [[
            CommonModule,
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfReportsModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        AjfGetColumnContentPipe,
                        AjfReportStringIdentifierPipe,
                        AjfWidgetHost,
                        AjfWidgetExport,
                    ],
                    imports: [
                        CommonModule,
                    ],
                    exports: [
                        AjfGetColumnContentPipe,
                        AjfReportStringIdentifierPipe,
                        AjfWidgetHost,
                        AjfWidgetExport,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwb3J0cy1tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9yZXBvcnRzL3JlcG9ydHMtbW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRXZDLE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQzdELE9BQU8sRUFBQyw2QkFBNkIsRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBQ3pFLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUNoRCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sZUFBZSxDQUFDOztBQW1CNUMsTUFBTSxPQUFPLGdCQUFnQjs7cUhBQWhCLGdCQUFnQjtzSEFBaEIsZ0JBQWdCLGlCQWZ6Qix1QkFBdUI7UUFDdkIsNkJBQTZCO1FBQzdCLGFBQWE7UUFDYixlQUFlLGFBR2YsWUFBWSxhQUdaLHVCQUF1QjtRQUN2Qiw2QkFBNkI7UUFDN0IsYUFBYTtRQUNiLGVBQWU7c0hBR04sZ0JBQWdCLFlBVmxCO1lBQ1AsWUFBWTtTQUNiO21HQVFVLGdCQUFnQjtrQkFqQjVCLFFBQVE7bUJBQUM7b0JBQ1IsWUFBWSxFQUFFO3dCQUNaLHVCQUF1Qjt3QkFDdkIsNkJBQTZCO3dCQUM3QixhQUFhO3dCQUNiLGVBQWU7cUJBQ2hCO29CQUNELE9BQU8sRUFBRTt3QkFDUCxZQUFZO3FCQUNiO29CQUNELE9BQU8sRUFBRTt3QkFDUCx1QkFBdUI7d0JBQ3ZCLDZCQUE2Qjt3QkFDN0IsYUFBYTt3QkFDYixlQUFlO3FCQUNoQjtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtBamZHZXRDb2x1bW5Db250ZW50UGlwZX0gZnJvbSAnLi9nZXQtY29sdW1uLWNvbnRlbnQnO1xuaW1wb3J0IHtBamZSZXBvcnRTdHJpbmdJZGVudGlmaWVyUGlwZX0gZnJvbSAnLi9yZXBvcnQtc3RyaW5nLWlkZW50aWZpZXInO1xuaW1wb3J0IHtBamZXaWRnZXRFeHBvcnR9IGZyb20gJy4vd2lkZ2V0LWV4cG9ydCc7XG5pbXBvcnQge0FqZldpZGdldEhvc3R9IGZyb20gJy4vd2lkZ2V0LWhvc3QnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBBamZHZXRDb2x1bW5Db250ZW50UGlwZSxcbiAgICBBamZSZXBvcnRTdHJpbmdJZGVudGlmaWVyUGlwZSxcbiAgICBBamZXaWRnZXRIb3N0LFxuICAgIEFqZldpZGdldEV4cG9ydCxcbiAgXSxcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIEFqZkdldENvbHVtbkNvbnRlbnRQaXBlLFxuICAgIEFqZlJlcG9ydFN0cmluZ0lkZW50aWZpZXJQaXBlLFxuICAgIEFqZldpZGdldEhvc3QsXG4gICAgQWpmV2lkZ2V0RXhwb3J0LFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBBamZSZXBvcnRzTW9kdWxlIHtcbn1cbiJdfQ==