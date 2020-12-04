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
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
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
export class AjfFormsModule {
}
AjfFormsModule.decorators = [
    { type: NgModule, args: [{
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
                    AjfCommonModule, AjfFileInputModule, CommonModule, HttpClientModule, ReactiveFormsModule,
                    TranslateModule
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
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybXMtbW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvZm9ybXMvZm9ybXMtbW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUNqRCxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUN4RCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDdEQsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNuRCxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFFcEQsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDM0QsT0FBTyxFQUFDLCtCQUErQixFQUFDLE1BQU0sK0JBQStCLENBQUM7QUFDOUUsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQy9DLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUM5QyxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUMzRCxPQUFPLEVBQUMsNkJBQTZCLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQztBQUMxRSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sY0FBYyxDQUFDO0FBQzFDLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUM5QyxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUNyRCxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFB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QztvQkFDakMsZ0JBQWdCO29CQUNoQiwwQkFBMEI7b0JBQzFCLGlCQUFpQjtpQkFDbEI7Z0JBQ0QsZUFBZSxFQUFFO29CQUNmLHFCQUFxQjtvQkFDckIsc0JBQXNCO29CQUN0Qix5QkFBeUI7b0JBQ3pCLDZCQUE2QjtvQkFDN0IsOEJBQThCO29CQUM5QiwrQkFBK0I7b0JBQy9CLDhCQUE4QjtvQkFDOUIsaUNBQWlDO2lCQUNsQztnQkFDRCxTQUFTLEVBQUU7b0JBQ1Qsc0JBQXNCO29CQUN0QixzQkFBc0I7b0JBQ3RCLG9CQUFvQjtpQkFDckI7YUFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZDb21tb25Nb2R1bGV9IGZyb20gJ0BhamYvY29yZS9jb21tb24nO1xuaW1wb3J0IHtBamZGaWxlSW5wdXRNb2R1bGV9IGZyb20gJ0BhamYvY29yZS9maWxlLWlucHV0JztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtIdHRwQ2xpZW50TW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7UmVhY3RpdmVGb3Jtc01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtUcmFuc2xhdGVNb2R1bGV9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuXG5pbXBvcnQge0FqZkFzRmllbGRJbnN0YW5jZVBpcGV9IGZyb20gJy4vYXMtZmllbGQtaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZBc1JlcGVhdGluZ1NsaWRlSW5zdGFuY2VQaXBlfSBmcm9tICcuL2FzLXJlcGVhdGluZy1zbGlkZS1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZkJvb2xUb0ludFBpcGV9IGZyb20gJy4vYm9vbC10by1pbnQnO1xuaW1wb3J0IHtBamZEYXRlVmFsdWVQaXBlfSBmcm9tICcuL2RhdGUtdmFsdWUnO1xuaW1wb3J0IHtBamZEYXRlVmFsdWVTdHJpbmdQaXBlfSBmcm9tICcuL2RhdGUtdmFsdWUtc3RyaW5nJztcbmltcG9ydCB7QWpmRXhwYW5kRmllbGRXaXRoQ2hvaWNlc1BpcGV9IGZyb20gJy4vZXhwYW5kLWlucHV0LXdpdGgtY2hvaWNlcyc7XG5pbXBvcnQge0FqZkZpZWxkSG9zdH0gZnJvbSAnLi9maWVsZC1ob3N0JztcbmltcG9ydCB7QWpmRmllbGRJY29uUGlwZX0gZnJvbSAnLi9maWVsZC1pY29uJztcbmltcG9ydCB7QWpmRmllbGRJc1ZhbGlkUGlwZX0gZnJvbSAnLi9maWVsZC1pcy12YWxpZCc7XG5pbXBvcnQge0FqZkZpbGVGaWVsZENvbXBvbmVudH0gZnJvbSAnLi9maWxlLWZpZWxkJztcbmltcG9ydCB7QWpmRm9ybVJlbmRlcmVyU2VydmljZX0gZnJvbSAnLi9mb3JtLXJlbmRlcmVyJztcbmltcG9ydCB7QWpmRm9ybVN0cmluZ0lkZW50aWZpZXJQaXBlfSBmcm9tICcuL2Zvcm0tc3RyaW5nLWlkZW50aWZpZXInO1xuaW1wb3J0IHtBamZHZXRUYWJsZUNlbGxDb250cm9sUGlwZX0gZnJvbSAnLi9nZXQtdGFibGUtY2VsbC1jb250cm9sJztcbmltcG9ydCB7QWpmSW1hZ2VGaWVsZENvbXBvbmVudH0gZnJvbSAnLi9pbWFnZS1maWVsZCc7XG5pbXBvcnQge0FqZkluY3JlbWVudFBpcGV9IGZyb20gJy4vaW5jcmVtZW50JztcbmltcG9ydCB7QWpmSXNDZWxsRWRpdGFibGVQaXBlfSBmcm9tICcuL2lzLWNlbGwtZWRpdGFibGUnO1xuaW1wb3J0IHtBamZJc1JlYWRvbmx5SW5wdXRGaWVsZFBpcGV9IGZyb20gJy4vaXMtcmVhZG9ubHktaW5wdXQtZmllbGQnO1xuaW1wb3J0IHtBamZJc1JlcGVhdGluZ1NsaWRlSW5zdGFuY2VQaXBlfSBmcm9tICcuL2lzLXJlcGVhdGluZy1zbGlkZSc7XG5pbXBvcnQge0FqZk5vZGVDb21wbGV0ZU5hbWVQaXBlfSBmcm9tICcuL25vZGUtY29tcGxldGUtbmFtZSc7XG5pbXBvcnQge0FqZlJhbmdlUGlwZX0gZnJvbSAnLi9yYW5nZSc7XG5pbXBvcnQge0FqZlJlYWRPbmx5RmllbGRDb21wb25lbnR9IGZyb20gJy4vcmVhZC1vbmx5LWZpZWxkJztcbmltcG9ydCB7QWpmUmVhZE9ubHlGaWxlRmllbGRDb21wb25lbnR9IGZyb20gJy4vcmVhZC1vbmx5LWZpbGUtZmllbGQnO1xuaW1wb3J0IHtBamZSZWFkT25seUltYWdlRmllbGRDb21wb25lbnR9IGZyb20gJy4vcmVhZC1vbmx5LWltYWdlLWZpZWxkJztcbmltcG9ydCB7QWpmUmVhZE9ubHlTZWxlY3RGaWVsZENvbXBvbmVudH0gZnJvbSAnLi9yZWFkLW9ubHktc2VsZWN0LWZpZWxkJztcbmltcG9ydCB7QWpmUmVhZE9ubHlUYWJsZUZpZWxkQ29tcG9uZW50fSBmcm9tICcuL3JlYWQtb25seS10YWJsZS1maWVsZCc7XG5pbXBvcnQge0FqZlJlYWRPbmx5VmlkZW9VcmxGaWVsZENvbXBvbmVudH0gZnJvbSAnLi9yZWFkLW9ubHktdmlkZW8tdXJsLWZpZWxkJztcbmltcG9ydCB7QWpmVGFibGVSb3dDbGFzc30gZnJvbSAnLi90YWJsZS1yb3ctY2xhc3MnO1xuaW1wb3J0IHtBamZUYWJsZVZpc2libGVDb2x1bW5zUGlwZX0gZnJvbSAnLi90YWJsZS12aXNpYmxlLWNvbHVtbnMnO1xuaW1wb3J0IHtBamZWYWxpZFNsaWRlUGlwZX0gZnJvbSAnLi92YWxpZC1zbGlkZSc7XG5pbXBvcnQge0FqZlZhbGlkYXRpb25TZXJ2aWNlfSBmcm9tICcuL3ZhbGlkYXRpb24tc2VydmljZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1xuICAgIEFqZkFzRmllbGRJbnN0YW5jZVBpcGUsXG4gICAgQWpmQXNSZXBlYXRpbmdTbGlkZUluc3RhbmNlUGlwZSxcbiAgICBBamZCb29sVG9JbnRQaXBlLFxuICAgIEFqZkRhdGVWYWx1ZVBpcGUsXG4gICAgQWpmRGF0ZVZhbHVlU3RyaW5nUGlwZSxcbiAgICBBamZFeHBhbmRGaWVsZFdpdGhDaG9pY2VzUGlwZSxcbiAgICBBamZGaWVsZEhvc3QsXG4gICAgQWpmRmllbGRJY29uUGlwZSxcbiAgICBBamZGaWVsZElzVmFsaWRQaXBlLFxuICAgIEFqZkZpbGVGaWVsZENvbXBvbmVudCxcbiAgICBBamZGb3JtU3RyaW5nSWRlbnRpZmllclBpcGUsXG4gICAgQWpmR2V0VGFibGVDZWxsQ29udHJvbFBpcGUsXG4gICAgQWpmSW1hZ2VGaWVsZENvbXBvbmVudCxcbiAgICBBamZJbmNyZW1lbnRQaXBlLFxuICAgIEFqZklzQ2VsbEVkaXRhYmxlUGlwZSxcbiAgICBBamZJc1JlYWRvbmx5SW5wdXRGaWVsZFBpcGUsXG4gICAgQWpmSXNSZXBlYXRpbmdTbGlkZUluc3RhbmNlUGlwZSxcbiAgICBBamZOb2RlQ29tcGxldGVOYW1lUGlwZSxcbiAgICBBamZSYW5nZVBpcGUsXG4gICAgQWpmUmVhZE9ubHlGaWVsZENvbXBvbmVudCxcbiAgICBBamZSZWFkT25seUZpbGVGaWVsZENvbXBvbmVudCxcbiAgICBBamZSZWFkT25seUltYWdlRmllbGRDb21wb25lbnQsXG4gICAgQWpmUmVhZE9ubHlTZWxlY3RGaWVsZENvbXBvbmVudCxcbiAgICBBamZSZWFkT25seVRhYmxlRmllbGRDb21wb25lbnQsXG4gICAgQWpmUmVhZE9ubHlWaWRlb1VybEZpZWxkQ29tcG9uZW50LFxuICAgIEFqZlRhYmxlUm93Q2xhc3MsXG4gICAgQWpmVGFibGVWaXNpYmxlQ29sdW1uc1BpcGUsXG4gICAgQWpmVmFsaWRTbGlkZVBpcGUsXG4gIF0sXG4gIGltcG9ydHM6IFtcbiAgICBBamZDb21tb25Nb2R1bGUsIEFqZkZpbGVJbnB1dE1vZHVsZSwgQ29tbW9uTW9kdWxlLCBIdHRwQ2xpZW50TW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgIFRyYW5zbGF0ZU1vZHVsZVxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgQWpmQXNGaWVsZEluc3RhbmNlUGlwZSxcbiAgICBBamZBc1JlcGVhdGluZ1NsaWRlSW5zdGFuY2VQaXBlLFxuICAgIEFqZkJvb2xUb0ludFBpcGUsXG4gICAgQWpmRGF0ZVZhbHVlUGlwZSxcbiAgICBBamZEYXRlVmFsdWVTdHJpbmdQaXBlLFxuICAgIEFqZkV4cGFuZEZpZWxkV2l0aENob2ljZXNQaXBlLFxuICAgIEFqZkZpZWxkSG9zdCxcbiAgICBBamZGaWVsZEljb25QaXBlLFxuICAgIEFqZkZpZWxkSXNWYWxpZFBpcGUsXG4gICAgQWpmRmlsZUZpZWxkQ29tcG9uZW50LFxuICAgIEFqZkZvcm1TdHJpbmdJZGVudGlmaWVyUGlwZSxcbiAgICBBamZHZXRUYWJsZUNlbGxDb250cm9sUGlwZSxcbiAgICBBamZJbWFnZUZpZWxkQ29tcG9uZW50LFxuICAgIEFqZkluY3JlbWVudFBpcGUsXG4gICAgQWpmSXNDZWxsRWRpdGFibGVQaXBlLFxuICAgIEFqZklzUmVhZG9ubHlJbnB1dEZpZWxkUGlwZSxcbiAgICBBamZJc1JlcGVhdGluZ1NsaWRlSW5zdGFuY2VQaXBlLFxuICAgIEFqZk5vZGVDb21wbGV0ZU5hbWVQaXBlLFxuICAgIEFqZlJhbmdlUGlwZSxcbiAgICBBamZSZWFkT25seUZpZWxkQ29tcG9uZW50LFxuICAgIEFqZlJlYWRPbmx5RmlsZUZpZWxkQ29tcG9uZW50LFxuICAgIEFqZlJlYWRPbmx5SW1hZ2VGaWVsZENvbXBvbmVudCxcbiAgICBBamZSZWFkT25seVNlbGVjdEZpZWxkQ29tcG9uZW50LFxuICAgIEFqZlJlYWRPbmx5VGFibGVGaWVsZENvbXBvbmVudCxcbiAgICBBamZSZWFkT25seVZpZGVvVXJsRmllbGRDb21wb25lbnQsXG4gICAgQWpmVGFibGVSb3dDbGFzcyxcbiAgICBBamZUYWJsZVZpc2libGVDb2x1bW5zUGlwZSxcbiAgICBBamZWYWxpZFNsaWRlUGlwZSxcbiAgXSxcbiAgZW50cnlDb21wb25lbnRzOiBbXG4gICAgQWpmRmlsZUZpZWxkQ29tcG9uZW50LFxuICAgIEFqZkltYWdlRmllbGRDb21wb25lbnQsXG4gICAgQWpmUmVhZE9ubHlGaWVsZENvbXBvbmVudCxcbiAgICBBamZSZWFkT25seUZpbGVGaWVsZENvbXBvbmVudCxcbiAgICBBamZSZWFkT25seUltYWdlRmllbGRDb21wb25lbnQsXG4gICAgQWpmUmVhZE9ubHlTZWxlY3RGaWVsZENvbXBvbmVudCxcbiAgICBBamZSZWFkT25seVRhYmxlRmllbGRDb21wb25lbnQsXG4gICAgQWpmUmVhZE9ubHlWaWRlb1VybEZpZWxkQ29tcG9uZW50LFxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBBamZEYXRlVmFsdWVTdHJpbmdQaXBlLFxuICAgIEFqZkZvcm1SZW5kZXJlclNlcnZpY2UsXG4gICAgQWpmVmFsaWRhdGlvblNlcnZpY2UsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIEFqZkZvcm1zTW9kdWxlIHtcbn1cbiJdfQ==