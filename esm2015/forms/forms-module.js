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
import { __decorate } from "tslib";
import { AjfCommonModule } from '@ajf/core/common';
import { AjfFileInputModule } from '@ajf/core/file-input';
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
import { AjfGetTableCellControlPipe } from './get-table-cell-control';
import { AjfImageFieldComponent } from './image-field';
import { AjfIncrementPipe } from './increment';
import { AjfIsCellEditablePipe } from './is-cell-editable';
import { AjfIsRepeatingSlideInstancePipe } from './is-repeating-slide';
import { AjfNodeCompleteNamePipe } from './node-complete-name';
import { AjfRangePipe } from './range';
import { AjfReadOnlyFieldComponent } from './read-only-field';
import { AjfReadOnlyFileFieldComponent } from './read-only-file-field';
import { AjfReadOnlyImageFieldComponent } from './read-only-image-field';
import { AjfReadOnlyTableFieldComponent } from './read-only-table-field';
import { AjfReadOnlyVideoUrlFieldComponent } from './read-only-video-url-field';
import { AjfTableRowClass } from './table-row-class';
import { AjfTableVisibleColumnsPipe } from './table-visible-columns';
import { AjfValidSlidePipe } from './valid-slide';
import { AjfValidationService } from './validation-service';
let AjfFormsModule = /** @class */ (() => {
    let AjfFormsModule = class AjfFormsModule {
    };
    AjfFormsModule = __decorate([
        NgModule({
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
                AjfGetTableCellControlPipe,
                AjfImageFieldComponent,
                AjfIncrementPipe,
                AjfIsCellEditablePipe,
                AjfIsRepeatingSlideInstancePipe,
                AjfNodeCompleteNamePipe,
                AjfRangePipe,
                AjfReadOnlyFieldComponent,
                AjfReadOnlyFileFieldComponent,
                AjfReadOnlyImageFieldComponent,
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
                AjfGetTableCellControlPipe,
                AjfImageFieldComponent,
                AjfIncrementPipe,
                AjfIsCellEditablePipe,
                AjfIsRepeatingSlideInstancePipe,
                AjfNodeCompleteNamePipe,
                AjfRangePipe,
                AjfReadOnlyFieldComponent,
                AjfReadOnlyFileFieldComponent,
                AjfReadOnlyImageFieldComponent,
                AjfReadOnlyTableFieldComponent,
                AjfReadOnlyVideoUrlFieldComponent,
                AjfTableRowClass,
                AjfTableVisibleColumnsPipe,
                AjfValidSlidePipe,
            ],
            providers: [
                AjfDateValueStringPipe,
                AjfFormRendererService,
                AjfValidationService,
            ],
        })
    ], AjfFormsModule);
    return AjfFormsModule;
})();
export { AjfFormsModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybXMtbW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvZm9ybXMvZm9ybXMtbW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRzs7QUFFSCxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDeEQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ3RELE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFbkQsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDM0QsT0FBTyxFQUFDLCtCQUErQixFQUFDLE1BQU0sK0JBQStCLENBQUM7QUFDOUUsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQy9DLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUM5QyxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUMzRCxPQUFPLEVBQUMsNkJBQTZCLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQztBQUMxRSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sY0FBYyxDQUFDO0FBQzFDLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUM5QyxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUNyRCxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFDbkQsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1B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XG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZDb21tb25Nb2R1bGV9IGZyb20gJ0BhamYvY29yZS9jb21tb24nO1xuaW1wb3J0IHtBamZGaWxlSW5wdXRNb2R1bGV9IGZyb20gJ0BhamYvY29yZS9maWxlLWlucHV0JztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtIdHRwQ2xpZW50TW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7UmVhY3RpdmVGb3Jtc01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQge0FqZkFzRmllbGRJbnN0YW5jZVBpcGV9IGZyb20gJy4vYXMtZmllbGQtaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZBc1JlcGVhdGluZ1NsaWRlSW5zdGFuY2VQaXBlfSBmcm9tICcuL2FzLXJlcGVhdGluZy1zbGlkZS1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZkJvb2xUb0ludFBpcGV9IGZyb20gJy4vYm9vbC10by1pbnQnO1xuaW1wb3J0IHtBamZEYXRlVmFsdWVQaXBlfSBmcm9tICcuL2RhdGUtdmFsdWUnO1xuaW1wb3J0IHtBamZEYXRlVmFsdWVTdHJpbmdQaXBlfSBmcm9tICcuL2RhdGUtdmFsdWUtc3RyaW5nJztcbmltcG9ydCB7QWpmRXhwYW5kRmllbGRXaXRoQ2hvaWNlc1BpcGV9IGZyb20gJy4vZXhwYW5kLWlucHV0LXdpdGgtY2hvaWNlcyc7XG5pbXBvcnQge0FqZkZpZWxkSG9zdH0gZnJvbSAnLi9maWVsZC1ob3N0JztcbmltcG9ydCB7QWpmRmllbGRJY29uUGlwZX0gZnJvbSAnLi9maWVsZC1pY29uJztcbmltcG9ydCB7QWpmRmllbGRJc1ZhbGlkUGlwZX0gZnJvbSAnLi9maWVsZC1pcy12YWxpZCc7XG5pbXBvcnQge0FqZkZpbGVGaWVsZENvbXBvbmVudH0gZnJvbSAnLi9maWxlLWZpZWxkJztcbmltcG9ydCB7QWpmRm9ybVJlbmRlcmVyU2VydmljZX0gZnJvbSAnLi9mb3JtLXJlbmRlcmVyJztcbmltcG9ydCB7QWpmR2V0VGFibGVDZWxsQ29udHJvbFBpcGV9IGZyb20gJy4vZ2V0LXRhYmxlLWNlbGwtY29udHJvbCc7XG5pbXBvcnQge0FqZkltYWdlRmllbGRDb21wb25lbnR9IGZyb20gJy4vaW1hZ2UtZmllbGQnO1xuaW1wb3J0IHtBamZJbmNyZW1lbnRQaXBlfSBmcm9tICcuL2luY3JlbWVudCc7XG5pbXBvcnQge0FqZklzQ2VsbEVkaXRhYmxlUGlwZX0gZnJvbSAnLi9pcy1jZWxsLWVkaXRhYmxlJztcbmltcG9ydCB7QWpmSXNSZXBlYXRpbmdTbGlkZUluc3RhbmNlUGlwZX0gZnJvbSAnLi9pcy1yZXBlYXRpbmctc2xpZGUnO1xuaW1wb3J0IHtBamZOb2RlQ29tcGxldGVOYW1lUGlwZX0gZnJvbSAnLi9ub2RlLWNvbXBsZXRlLW5hbWUnO1xuaW1wb3J0IHtBamZSYW5nZVBpcGV9IGZyb20gJy4vcmFuZ2UnO1xuaW1wb3J0IHtBamZSZWFkT25seUZpZWxkQ29tcG9uZW50fSBmcm9tICcuL3JlYWQtb25seS1maWVsZCc7XG5pbXBvcnQge0FqZlJlYWRPbmx5RmlsZUZpZWxkQ29tcG9uZW50fSBmcm9tICcuL3JlYWQtb25seS1maWxlLWZpZWxkJztcbmltcG9ydCB7QWpmUmVhZE9ubHlJbWFnZUZpZWxkQ29tcG9uZW50fSBmcm9tICcuL3JlYWQtb25seS1pbWFnZS1maWVsZCc7XG5pbXBvcnQge0FqZlJlYWRPbmx5VGFibGVGaWVsZENvbXBvbmVudH0gZnJvbSAnLi9yZWFkLW9ubHktdGFibGUtZmllbGQnO1xuaW1wb3J0IHtBamZSZWFkT25seVZpZGVvVXJsRmllbGRDb21wb25lbnR9IGZyb20gJy4vcmVhZC1vbmx5LXZpZGVvLXVybC1maWVsZCc7XG5pbXBvcnQge0FqZlRhYmxlUm93Q2xhc3N9IGZyb20gJy4vdGFibGUtcm93LWNsYXNzJztcbmltcG9ydCB7QWpmVGFibGVWaXNpYmxlQ29sdW1uc1BpcGV9IGZyb20gJy4vdGFibGUtdmlzaWJsZS1jb2x1bW5zJztcbmltcG9ydCB7QWpmVmFsaWRTbGlkZVBpcGV9IGZyb20gJy4vdmFsaWQtc2xpZGUnO1xuaW1wb3J0IHtBamZWYWxpZGF0aW9uU2VydmljZX0gZnJvbSAnLi92YWxpZGF0aW9uLXNlcnZpY2UnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBBamZBc0ZpZWxkSW5zdGFuY2VQaXBlLFxuICAgIEFqZkFzUmVwZWF0aW5nU2xpZGVJbnN0YW5jZVBpcGUsXG4gICAgQWpmQm9vbFRvSW50UGlwZSxcbiAgICBBamZEYXRlVmFsdWVQaXBlLFxuICAgIEFqZkRhdGVWYWx1ZVN0cmluZ1BpcGUsXG4gICAgQWpmRXhwYW5kRmllbGRXaXRoQ2hvaWNlc1BpcGUsXG4gICAgQWpmRmllbGRIb3N0LFxuICAgIEFqZkZpZWxkSWNvblBpcGUsXG4gICAgQWpmRmllbGRJc1ZhbGlkUGlwZSxcbiAgICBBamZGaWxlRmllbGRDb21wb25lbnQsXG4gICAgQWpmR2V0VGFibGVDZWxsQ29udHJvbFBpcGUsXG4gICAgQWpmSW1hZ2VGaWVsZENvbXBvbmVudCxcbiAgICBBamZJbmNyZW1lbnRQaXBlLFxuICAgIEFqZklzQ2VsbEVkaXRhYmxlUGlwZSxcbiAgICBBamZJc1JlcGVhdGluZ1NsaWRlSW5zdGFuY2VQaXBlLFxuICAgIEFqZk5vZGVDb21wbGV0ZU5hbWVQaXBlLFxuICAgIEFqZlJhbmdlUGlwZSxcbiAgICBBamZSZWFkT25seUZpZWxkQ29tcG9uZW50LFxuICAgIEFqZlJlYWRPbmx5RmlsZUZpZWxkQ29tcG9uZW50LFxuICAgIEFqZlJlYWRPbmx5SW1hZ2VGaWVsZENvbXBvbmVudCxcbiAgICBBamZSZWFkT25seVRhYmxlRmllbGRDb21wb25lbnQsXG4gICAgQWpmUmVhZE9ubHlWaWRlb1VybEZpZWxkQ29tcG9uZW50LFxuICAgIEFqZlRhYmxlUm93Q2xhc3MsXG4gICAgQWpmVGFibGVWaXNpYmxlQ29sdW1uc1BpcGUsXG4gICAgQWpmVmFsaWRTbGlkZVBpcGUsXG4gIF0sXG4gIGltcG9ydHM6IFtcbiAgICBBamZDb21tb25Nb2R1bGUsXG4gICAgQWpmRmlsZUlucHV0TW9kdWxlLFxuICAgIENvbW1vbk1vZHVsZSxcbiAgICBIdHRwQ2xpZW50TW9kdWxlLFxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBBamZBc0ZpZWxkSW5zdGFuY2VQaXBlLFxuICAgIEFqZkFzUmVwZWF0aW5nU2xpZGVJbnN0YW5jZVBpcGUsXG4gICAgQWpmQm9vbFRvSW50UGlwZSxcbiAgICBBamZEYXRlVmFsdWVQaXBlLFxuICAgIEFqZkRhdGVWYWx1ZVN0cmluZ1BpcGUsXG4gICAgQWpmRXhwYW5kRmllbGRXaXRoQ2hvaWNlc1BpcGUsXG4gICAgQWpmRmllbGRIb3N0LFxuICAgIEFqZkZpZWxkSWNvblBpcGUsXG4gICAgQWpmRmllbGRJc1ZhbGlkUGlwZSxcbiAgICBBamZGaWxlRmllbGRDb21wb25lbnQsXG4gICAgQWpmR2V0VGFibGVDZWxsQ29udHJvbFBpcGUsXG4gICAgQWpmSW1hZ2VGaWVsZENvbXBvbmVudCxcbiAgICBBamZJbmNyZW1lbnRQaXBlLFxuICAgIEFqZklzQ2VsbEVkaXRhYmxlUGlwZSxcbiAgICBBamZJc1JlcGVhdGluZ1NsaWRlSW5zdGFuY2VQaXBlLFxuICAgIEFqZk5vZGVDb21wbGV0ZU5hbWVQaXBlLFxuICAgIEFqZlJhbmdlUGlwZSxcbiAgICBBamZSZWFkT25seUZpZWxkQ29tcG9uZW50LFxuICAgIEFqZlJlYWRPbmx5RmlsZUZpZWxkQ29tcG9uZW50LFxuICAgIEFqZlJlYWRPbmx5SW1hZ2VGaWVsZENvbXBvbmVudCxcbiAgICBBamZSZWFkT25seVRhYmxlRmllbGRDb21wb25lbnQsXG4gICAgQWpmUmVhZE9ubHlWaWRlb1VybEZpZWxkQ29tcG9uZW50LFxuICAgIEFqZlRhYmxlUm93Q2xhc3MsXG4gICAgQWpmVGFibGVWaXNpYmxlQ29sdW1uc1BpcGUsXG4gICAgQWpmVmFsaWRTbGlkZVBpcGUsXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIEFqZkRhdGVWYWx1ZVN0cmluZ1BpcGUsXG4gICAgQWpmRm9ybVJlbmRlcmVyU2VydmljZSxcbiAgICBBamZWYWxpZGF0aW9uU2VydmljZSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQWpmRm9ybXNNb2R1bGUge1xufVxuIl19