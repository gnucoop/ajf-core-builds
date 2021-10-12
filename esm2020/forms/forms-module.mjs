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
import { AjfCommonModule } from '@ajf/core/common';
import { AjfFileInputModule } from '@ajf/core/file-input';
import { AjfTranslocoModule } from '@ajf/core/transloco';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AjfAsFieldInstancePipe } from './as-field-instance';
import { AjfAsRepeatingSlideInstancePipe } from './as-repeating-slide-instance';
import { AjfBoolToIntPipe } from './bool-to-int';
import { AjfDateValuePipe } from './date-value';
import { AjfDateValueStringPipe } from './date-value-string';
import { AjfExpandFieldWithChoicesPipe } from './expand-input-with-choices';
import { AjfFieldHost } from './field-host';
import { AjfFieldIconPipe } from './field-icon';
import { AjfFieldIsValidPipe } from './field-is-valid';
import { AjfFileFieldComponent } from './file-field';
import { AjfFormRendererService } from './form-renderer';
import { AjfFormStringIdentifierPipe } from './form-string-identifier';
import { AjfGetTableCellControlPipe } from './get-table-cell-control';
import { AjfImageFieldComponent } from './image-field';
import { AjfIncrementPipe } from './increment';
import { AjfIsCellEditablePipe } from './is-cell-editable';
import { AjfIsReadonlyInputFieldPipe } from './is-readonly-input-field';
import { AjfIsRepeatingSlideInstancePipe } from './is-repeating-slide';
import { AjfNodeCompleteNamePipe } from './node-complete-name';
import { AjfRangePipe } from './range';
import { AjfReadOnlyFieldComponent } from './read-only-field';
import { AjfReadOnlyFileFieldComponent } from './read-only-file-field';
import { AjfReadOnlyImageFieldComponent } from './read-only-image-field';
import { AjfReadOnlySelectFieldComponent } from './read-only-select-field';
import { AjfReadOnlyTableFieldComponent } from './read-only-table-field';
import { AjfReadOnlyVideoUrlFieldComponent } from './read-only-video-url-field';
import { AjfTableRowClass } from './table-row-class';
import { AjfTableVisibleColumnsPipe } from './table-visible-columns';
import { AjfValidSlidePipe } from './valid-slide';
import { AjfValidationService } from './validation-service';
import * as i0 from "@angular/core";
export class AjfFormsModule {
}
AjfFormsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfFormsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AjfFormsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfFormsModule, declarations: [AjfAsFieldInstancePipe,
        AjfAsRepeatingSlideInstancePipe,
        AjfBoolToIntPipe,
        AjfDateValuePipe,
        AjfDateValueStringPipe,
        AjfExpandFieldWithChoicesPipe,
        AjfFieldHost,
        AjfFieldIconPipe,
        AjfFieldIsValidPipe,
        AjfFileFieldComponent,
        AjfFormStringIdentifierPipe,
        AjfGetTableCellControlPipe,
        AjfImageFieldComponent,
        AjfIncrementPipe,
        AjfIsCellEditablePipe,
        AjfIsReadonlyInputFieldPipe,
        AjfIsRepeatingSlideInstancePipe,
        AjfNodeCompleteNamePipe,
        AjfRangePipe,
        AjfReadOnlyFieldComponent,
        AjfReadOnlyFileFieldComponent,
        AjfReadOnlyImageFieldComponent,
        AjfReadOnlySelectFieldComponent,
        AjfReadOnlyTableFieldComponent,
        AjfReadOnlyVideoUrlFieldComponent,
        AjfTableRowClass,
        AjfTableVisibleColumnsPipe,
        AjfValidSlidePipe], imports: [AjfCommonModule,
        AjfFileInputModule,
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        AjfTranslocoModule], exports: [AjfAsFieldInstancePipe,
        AjfAsRepeatingSlideInstancePipe,
        AjfBoolToIntPipe,
        AjfDateValuePipe,
        AjfDateValueStringPipe,
        AjfExpandFieldWithChoicesPipe,
        AjfFieldHost,
        AjfFieldIconPipe,
        AjfFieldIsValidPipe,
        AjfFileFieldComponent,
        AjfFormStringIdentifierPipe,
        AjfGetTableCellControlPipe,
        AjfImageFieldComponent,
        AjfIncrementPipe,
        AjfIsCellEditablePipe,
        AjfIsReadonlyInputFieldPipe,
        AjfIsRepeatingSlideInstancePipe,
        AjfNodeCompleteNamePipe,
        AjfRangePipe,
        AjfReadOnlyFieldComponent,
        AjfReadOnlyFileFieldComponent,
        AjfReadOnlyImageFieldComponent,
        AjfReadOnlySelectFieldComponent,
        AjfReadOnlyTableFieldComponent,
        AjfReadOnlyVideoUrlFieldComponent,
        AjfTableRowClass,
        AjfTableVisibleColumnsPipe,
        AjfValidSlidePipe] });
AjfFormsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfFormsModule, providers: [
        AjfDateValueStringPipe,
        AjfFormRendererService,
        AjfValidationService,
    ], imports: [[
            AjfCommonModule,
            AjfFileInputModule,
            CommonModule,
            HttpClientModule,
            ReactiveFormsModule,
            AjfTranslocoModule,
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfFormsModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        AjfAsFieldInstancePipe,
                        AjfAsRepeatingSlideInstancePipe,
                        AjfBoolToIntPipe,
                        AjfDateValuePipe,
                        AjfDateValueStringPipe,
                        AjfExpandFieldWithChoicesPipe,
                        AjfFieldHost,
                        AjfFieldIconPipe,
                        AjfFieldIsValidPipe,
                        AjfFileFieldComponent,
                        AjfFormStringIdentifierPipe,
                        AjfGetTableCellControlPipe,
                        AjfImageFieldComponent,
                        AjfIncrementPipe,
                        AjfIsCellEditablePipe,
                        AjfIsReadonlyInputFieldPipe,
                        AjfIsRepeatingSlideInstancePipe,
                        AjfNodeCompleteNamePipe,
                        AjfRangePipe,
                        AjfReadOnlyFieldComponent,
                        AjfReadOnlyFileFieldComponent,
                        AjfReadOnlyImageFieldComponent,
                        AjfReadOnlySelectFieldComponent,
                        AjfReadOnlyTableFieldComponent,
                        AjfReadOnlyVideoUrlFieldComponent,
                        AjfTableRowClass,
                        AjfTableVisibleColumnsPipe,
                        AjfValidSlidePipe,
                    ],
                    imports: [
                        AjfCommonModule,
                        AjfFileInputModule,
                        CommonModule,
                        HttpClientModule,
                        ReactiveFormsModule,
                        AjfTranslocoModule,
                    ],
                    exports: [
                        AjfAsFieldInstancePipe,
                        AjfAsRepeatingSlideInstancePipe,
                        AjfBoolToIntPipe,
                        AjfDateValuePipe,
                        AjfDateValueStringPipe,
                        AjfExpandFieldWithChoicesPipe,
                        AjfFieldHost,
                        AjfFieldIconPipe,
                        AjfFieldIsValidPipe,
                        AjfFileFieldComponent,
                        AjfFormStringIdentifierPipe,
                        AjfGetTableCellControlPipe,
                        AjfImageFieldComponent,
                        AjfIncrementPipe,
                        AjfIsCellEditablePipe,
                        AjfIsReadonlyInputFieldPipe,
                        AjfIsRepeatingSlideInstancePipe,
                        AjfNodeCompleteNamePipe,
                        AjfRangePipe,
                        AjfReadOnlyFieldComponent,
                        AjfReadOnlyFileFieldComponent,
                        AjfReadOnlyImageFieldComponent,
                        AjfReadOnlySelectFieldComponent,
                        AjfReadOnlyTableFieldComponent,
                        AjfReadOnlyVideoUrlFieldComponent,
                        AjfTableRowClass,
                        AjfTableVisibleColumnsPipe,
                        AjfValidSlidePipe,
                    ],
                    entryComponents: [
                        AjfFileFieldComponent,
                        AjfImageFieldComponent,
                        AjfReadOnlyFieldComponent,
                        AjfReadOnlyFileFieldComponent,
                        AjfReadOnlyImageFieldComponent,
                        AjfReadOnlySelectFieldComponent,
                        AjfReadOnlyTableFieldComponent,
                        AjfReadOnlyVideoUrlFieldComponent,
                    ],
                    providers: [
                        AjfDateValueStringPipe,
                        AjfFormRendererService,
                        AjfValidationService,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybXMtbW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvZm9ybXMvZm9ybXMtbW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUNqRCxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUN4RCxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUN2RCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDdEQsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUVuRCxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUMzRCxPQUFPLEVBQUMsK0JBQStCLEVBQUMsTUFBTSwrQkFBK0IsQ0FBQztBQUM5RSxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDL0MsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sY0FBYyxDQUFDO0FBQzlDLE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQzNELE9BQU8sRUFBQyw2QkFBNkIsRUFBQyxNQUFNLDZCQUE2QixDQUFDO0FBQzFFLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFDMUMsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sY0FBYyxDQUFDO0FBQzlDLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQ3JELE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxN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QkFDWix5QkFBeUI7d0JBQ3pCLDZCQUE2Qjt3QkFDN0IsOEJBQThCO3dCQUM5QiwrQkFBK0I7d0JBQy9CLDhCQUE4Qjt3QkFDOUIsaUNBQWlDO3dCQUNqQyxnQkFBZ0I7d0JBQ2hCLDBCQUEwQjt3QkFDMUIsaUJBQWlCO3FCQUNsQjtvQkFDRCxlQUFlLEVBQUU7d0JBQ2YscUJBQXFCO3dCQUNyQixzQkFBc0I7d0JBQ3RCLHlCQUF5Qjt3QkFDekIsNkJBQTZCO3dCQUM3Qiw4QkFBOEI7d0JBQzlCLCtCQUErQjt3QkFDL0IsOEJBQThCO3dCQUM5QixpQ0FBaUM7cUJBQ2xDO29CQUNELFNBQVMsRUFBRTt3QkFDVCxzQkFBc0I7d0JBQ3RCLHNCQUFzQjt3QkFDdEIsb0JBQW9CO3FCQUNyQjtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZDb21tb25Nb2R1bGV9IGZyb20gJ0BhamYvY29yZS9jb21tb24nO1xuaW1wb3J0IHtBamZGaWxlSW5wdXRNb2R1bGV9IGZyb20gJ0BhamYvY29yZS9maWxlLWlucHV0JztcbmltcG9ydCB7QWpmVHJhbnNsb2NvTW9kdWxlfSBmcm9tICdAYWpmL2NvcmUvdHJhbnNsb2NvJztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtIdHRwQ2xpZW50TW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7UmVhY3RpdmVGb3Jtc01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQge0FqZkFzRmllbGRJbnN0YW5jZVBpcGV9IGZyb20gJy4vYXMtZmllbGQtaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZBc1JlcGVhdGluZ1NsaWRlSW5zdGFuY2VQaXBlfSBmcm9tICcuL2FzLXJlcGVhdGluZy1zbGlkZS1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZkJvb2xUb0ludFBpcGV9IGZyb20gJy4vYm9vbC10by1pbnQnO1xuaW1wb3J0IHtBamZEYXRlVmFsdWVQaXBlfSBmcm9tICcuL2RhdGUtdmFsdWUnO1xuaW1wb3J0IHtBamZEYXRlVmFsdWVTdHJpbmdQaXBlfSBmcm9tICcuL2RhdGUtdmFsdWUtc3RyaW5nJztcbmltcG9ydCB7QWpmRXhwYW5kRmllbGRXaXRoQ2hvaWNlc1BpcGV9IGZyb20gJy4vZXhwYW5kLWlucHV0LXdpdGgtY2hvaWNlcyc7XG5pbXBvcnQge0FqZkZpZWxkSG9zdH0gZnJvbSAnLi9maWVsZC1ob3N0JztcbmltcG9ydCB7QWpmRmllbGRJY29uUGlwZX0gZnJvbSAnLi9maWVsZC1pY29uJztcbmltcG9ydCB7QWpmRmllbGRJc1ZhbGlkUGlwZX0gZnJvbSAnLi9maWVsZC1pcy12YWxpZCc7XG5pbXBvcnQge0FqZkZpbGVGaWVsZENvbXBvbmVudH0gZnJvbSAnLi9maWxlLWZpZWxkJztcbmltcG9ydCB7QWpmRm9ybVJlbmRlcmVyU2VydmljZX0gZnJvbSAnLi9mb3JtLXJlbmRlcmVyJztcbmltcG9ydCB7QWpmRm9ybVN0cmluZ0lkZW50aWZpZXJQaXBlfSBmcm9tICcuL2Zvcm0tc3RyaW5nLWlkZW50aWZpZXInO1xuaW1wb3J0IHtBamZHZXRUYWJsZUNlbGxDb250cm9sUGlwZX0gZnJvbSAnLi9nZXQtdGFibGUtY2VsbC1jb250cm9sJztcbmltcG9ydCB7QWpmSW1hZ2VGaWVsZENvbXBvbmVudH0gZnJvbSAnLi9pbWFnZS1maWVsZCc7XG5pbXBvcnQge0FqZkluY3JlbWVudFBpcGV9IGZyb20gJy4vaW5jcmVtZW50JztcbmltcG9ydCB7QWpmSXNDZWxsRWRpdGFibGVQaXBlfSBmcm9tICcuL2lzLWNlbGwtZWRpdGFibGUnO1xuaW1wb3J0IHtBamZJc1JlYWRvbmx5SW5wdXRGaWVsZFBpcGV9IGZyb20gJy4vaXMtcmVhZG9ubHktaW5wdXQtZmllbGQnO1xuaW1wb3J0IHtBamZJc1JlcGVhdGluZ1NsaWRlSW5zdGFuY2VQaXBlfSBmcm9tICcuL2lzLXJlcGVhdGluZy1zbGlkZSc7XG5pbXBvcnQge0FqZk5vZGVDb21wbGV0ZU5hbWVQaXBlfSBmcm9tICcuL25vZGUtY29tcGxldGUtbmFtZSc7XG5pbXBvcnQge0FqZlJhbmdlUGlwZX0gZnJvbSAnLi9yYW5nZSc7XG5pbXBvcnQge0FqZlJlYWRPbmx5RmllbGRDb21wb25lbnR9IGZyb20gJy4vcmVhZC1vbmx5LWZpZWxkJztcbmltcG9ydCB7QWpmUmVhZE9ubHlGaWxlRmllbGRDb21wb25lbnR9IGZyb20gJy4vcmVhZC1vbmx5LWZpbGUtZmllbGQnO1xuaW1wb3J0IHtBamZSZWFkT25seUltYWdlRmllbGRDb21wb25lbnR9IGZyb20gJy4vcmVhZC1vbmx5LWltYWdlLWZpZWxkJztcbmltcG9ydCB7QWpmUmVhZE9ubHlTZWxlY3RGaWVsZENvbXBvbmVudH0gZnJvbSAnLi9yZWFkLW9ubHktc2VsZWN0LWZpZWxkJztcbmltcG9ydCB7QWpmUmVhZE9ubHlUYWJsZUZpZWxkQ29tcG9uZW50fSBmcm9tICcuL3JlYWQtb25seS10YWJsZS1maWVsZCc7XG5pbXBvcnQge0FqZlJlYWRPbmx5VmlkZW9VcmxGaWVsZENvbXBvbmVudH0gZnJvbSAnLi9yZWFkLW9ubHktdmlkZW8tdXJsLWZpZWxkJztcbmltcG9ydCB7QWpmVGFibGVSb3dDbGFzc30gZnJvbSAnLi90YWJsZS1yb3ctY2xhc3MnO1xuaW1wb3J0IHtBamZUYWJsZVZpc2libGVDb2x1bW5zUGlwZX0gZnJvbSAnLi90YWJsZS12aXNpYmxlLWNvbHVtbnMnO1xuaW1wb3J0IHtBamZWYWxpZFNsaWRlUGlwZX0gZnJvbSAnLi92YWxpZC1zbGlkZSc7XG5pbXBvcnQge0FqZlZhbGlkYXRpb25TZXJ2aWNlfSBmcm9tICcuL3ZhbGlkYXRpb24tc2VydmljZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1xuICAgIEFqZkFzRmllbGRJbnN0YW5jZVBpcGUsXG4gICAgQWpmQXNSZXBlYXRpbmdTbGlkZUluc3RhbmNlUGlwZSxcbiAgICBBamZCb29sVG9JbnRQaXBlLFxuICAgIEFqZkRhdGVWYWx1ZVBpcGUsXG4gICAgQWpmRGF0ZVZhbHVlU3RyaW5nUGlwZSxcbiAgICBBamZFeHBhbmRGaWVsZFdpdGhDaG9pY2VzUGlwZSxcbiAgICBBamZGaWVsZEhvc3QsXG4gICAgQWpmRmllbGRJY29uUGlwZSxcbiAgICBBamZGaWVsZElzVmFsaWRQaXBlLFxuICAgIEFqZkZpbGVGaWVsZENvbXBvbmVudCxcbiAgICBBamZGb3JtU3RyaW5nSWRlbnRpZmllclBpcGUsXG4gICAgQWpmR2V0VGFibGVDZWxsQ29udHJvbFBpcGUsXG4gICAgQWpmSW1hZ2VGaWVsZENvbXBvbmVudCxcbiAgICBBamZJbmNyZW1lbnRQaXBlLFxuICAgIEFqZklzQ2VsbEVkaXRhYmxlUGlwZSxcbiAgICBBamZJc1JlYWRvbmx5SW5wdXRGaWVsZFBpcGUsXG4gICAgQWpmSXNSZXBlYXRpbmdTbGlkZUluc3RhbmNlUGlwZSxcbiAgICBBamZOb2RlQ29tcGxldGVOYW1lUGlwZSxcbiAgICBBamZSYW5nZVBpcGUsXG4gICAgQWpmUmVhZE9ubHlGaWVsZENvbXBvbmVudCxcbiAgICBBamZSZWFkT25seUZpbGVGaWVsZENvbXBvbmVudCxcbiAgICBBamZSZWFkT25seUltYWdlRmllbGRDb21wb25lbnQsXG4gICAgQWpmUmVhZE9ubHlTZWxlY3RGaWVsZENvbXBvbmVudCxcbiAgICBBamZSZWFkT25seVRhYmxlRmllbGRDb21wb25lbnQsXG4gICAgQWpmUmVhZE9ubHlWaWRlb1VybEZpZWxkQ29tcG9uZW50LFxuICAgIEFqZlRhYmxlUm93Q2xhc3MsXG4gICAgQWpmVGFibGVWaXNpYmxlQ29sdW1uc1BpcGUsXG4gICAgQWpmVmFsaWRTbGlkZVBpcGUsXG4gIF0sXG4gIGltcG9ydHM6IFtcbiAgICBBamZDb21tb25Nb2R1bGUsXG4gICAgQWpmRmlsZUlucHV0TW9kdWxlLFxuICAgIENvbW1vbk1vZHVsZSxcbiAgICBIdHRwQ2xpZW50TW9kdWxlLFxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgQWpmVHJhbnNsb2NvTW9kdWxlLFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgQWpmQXNGaWVsZEluc3RhbmNlUGlwZSxcbiAgICBBamZBc1JlcGVhdGluZ1NsaWRlSW5zdGFuY2VQaXBlLFxuICAgIEFqZkJvb2xUb0ludFBpcGUsXG4gICAgQWpmRGF0ZVZhbHVlUGlwZSxcbiAgICBBamZEYXRlVmFsdWVTdHJpbmdQaXBlLFxuICAgIEFqZkV4cGFuZEZpZWxkV2l0aENob2ljZXNQaXBlLFxuICAgIEFqZkZpZWxkSG9zdCxcbiAgICBBamZGaWVsZEljb25QaXBlLFxuICAgIEFqZkZpZWxkSXNWYWxpZFBpcGUsXG4gICAgQWpmRmlsZUZpZWxkQ29tcG9uZW50LFxuICAgIEFqZkZvcm1TdHJpbmdJZGVudGlmaWVyUGlwZSxcbiAgICBBamZHZXRUYWJsZUNlbGxDb250cm9sUGlwZSxcbiAgICBBamZJbWFnZUZpZWxkQ29tcG9uZW50LFxuICAgIEFqZkluY3JlbWVudFBpcGUsXG4gICAgQWpmSXNDZWxsRWRpdGFibGVQaXBlLFxuICAgIEFqZklzUmVhZG9ubHlJbnB1dEZpZWxkUGlwZSxcbiAgICBBamZJc1JlcGVhdGluZ1NsaWRlSW5zdGFuY2VQaXBlLFxuICAgIEFqZk5vZGVDb21wbGV0ZU5hbWVQaXBlLFxuICAgIEFqZlJhbmdlUGlwZSxcbiAgICBBamZSZWFkT25seUZpZWxkQ29tcG9uZW50LFxuICAgIEFqZlJlYWRPbmx5RmlsZUZpZWxkQ29tcG9uZW50LFxuICAgIEFqZlJlYWRPbmx5SW1hZ2VGaWVsZENvbXBvbmVudCxcbiAgICBBamZSZWFkT25seVNlbGVjdEZpZWxkQ29tcG9uZW50LFxuICAgIEFqZlJlYWRPbmx5VGFibGVGaWVsZENvbXBvbmVudCxcbiAgICBBamZSZWFkT25seVZpZGVvVXJsRmllbGRDb21wb25lbnQsXG4gICAgQWpmVGFibGVSb3dDbGFzcyxcbiAgICBBamZUYWJsZVZpc2libGVDb2x1bW5zUGlwZSxcbiAgICBBamZWYWxpZFNsaWRlUGlwZSxcbiAgXSxcbiAgZW50cnlDb21wb25lbnRzOiBbXG4gICAgQWpmRmlsZUZpZWxkQ29tcG9uZW50LFxuICAgIEFqZkltYWdlRmllbGRDb21wb25lbnQsXG4gICAgQWpmUmVhZE9ubHlGaWVsZENvbXBvbmVudCxcbiAgICBBamZSZWFkT25seUZpbGVGaWVsZENvbXBvbmVudCxcbiAgICBBamZSZWFkT25seUltYWdlRmllbGRDb21wb25lbnQsXG4gICAgQWpmUmVhZE9ubHlTZWxlY3RGaWVsZENvbXBvbmVudCxcbiAgICBBamZSZWFkT25seVRhYmxlRmllbGRDb21wb25lbnQsXG4gICAgQWpmUmVhZE9ubHlWaWRlb1VybEZpZWxkQ29tcG9uZW50LFxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBBamZEYXRlVmFsdWVTdHJpbmdQaXBlLFxuICAgIEFqZkZvcm1SZW5kZXJlclNlcnZpY2UsXG4gICAgQWpmVmFsaWRhdGlvblNlcnZpY2UsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIEFqZkZvcm1zTW9kdWxlIHtcbn1cbiJdfQ==