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
        AjfWidgetExport], imports: [CommonModule], exports: [AjfGetColumnContentPipe, AjfReportStringIdentifierPipe, AjfWidgetHost, AjfWidgetExport] });
AjfReportsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfReportsModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfReportsModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        AjfGetColumnContentPipe,
                        AjfReportStringIdentifierPipe,
                        AjfWidgetHost,
                        AjfWidgetExport,
                    ],
                    imports: [CommonModule],
                    exports: [AjfGetColumnContentPipe, AjfReportStringIdentifierPipe, AjfWidgetHost, AjfWidgetExport],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwb3J0cy1tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9yZXBvcnRzL3JlcG9ydHMtbW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRXZDLE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQzdELE9BQU8sRUFBQyw2QkFBNkIsRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBQ3pFLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUNoRCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sZUFBZSxDQUFDOztBQVk1QyxNQUFNLE9BQU8sZ0JBQWdCOztxSEFBaEIsZ0JBQWdCO3NIQUFoQixnQkFBZ0IsaUJBUnpCLHVCQUF1QjtRQUN2Qiw2QkFBNkI7UUFDN0IsYUFBYTtRQUNiLGVBQWUsYUFFUCxZQUFZLGFBQ1osdUJBQXVCLEVBQUUsNkJBQTZCLEVBQUUsYUFBYSxFQUFFLGVBQWU7c0hBRXJGLGdCQUFnQixZQUhsQixDQUFDLFlBQVksQ0FBQzttR0FHWixnQkFBZ0I7a0JBVjVCLFFBQVE7bUJBQUM7b0JBQ1IsWUFBWSxFQUFFO3dCQUNaLHVCQUF1Qjt3QkFDdkIsNkJBQTZCO3dCQUM3QixhQUFhO3dCQUNiLGVBQWU7cUJBQ2hCO29CQUNELE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztvQkFDdkIsT0FBTyxFQUFFLENBQUMsdUJBQXVCLEVBQUUsNkJBQTZCLEVBQUUsYUFBYSxFQUFFLGVBQWUsQ0FBQztpQkFDbEciLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7QWpmR2V0Q29sdW1uQ29udGVudFBpcGV9IGZyb20gJy4vZ2V0LWNvbHVtbi1jb250ZW50JztcbmltcG9ydCB7QWpmUmVwb3J0U3RyaW5nSWRlbnRpZmllclBpcGV9IGZyb20gJy4vcmVwb3J0LXN0cmluZy1pZGVudGlmaWVyJztcbmltcG9ydCB7QWpmV2lkZ2V0RXhwb3J0fSBmcm9tICcuL3dpZGdldC1leHBvcnQnO1xuaW1wb3J0IHtBamZXaWRnZXRIb3N0fSBmcm9tICcuL3dpZGdldC1ob3N0JztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgQWpmR2V0Q29sdW1uQ29udGVudFBpcGUsXG4gICAgQWpmUmVwb3J0U3RyaW5nSWRlbnRpZmllclBpcGUsXG4gICAgQWpmV2lkZ2V0SG9zdCxcbiAgICBBamZXaWRnZXRFeHBvcnQsXG4gIF0sXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICBleHBvcnRzOiBbQWpmR2V0Q29sdW1uQ29udGVudFBpcGUsIEFqZlJlcG9ydFN0cmluZ0lkZW50aWZpZXJQaXBlLCBBamZXaWRnZXRIb3N0LCBBamZXaWRnZXRFeHBvcnRdLFxufSlcbmV4cG9ydCBjbGFzcyBBamZSZXBvcnRzTW9kdWxlIHt9XG4iXX0=