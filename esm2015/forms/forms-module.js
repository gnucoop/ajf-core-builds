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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybXMtbW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvZm9ybXMvZm9ybXMtbW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUNqRCxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUN4RCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDdEQsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNuRCxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFFcEQsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDM0QsT0FBTyxFQUFDLCtCQUErQixFQUFDLE1BQU0sK0JBQStCLENBQUM7QUFDOUUsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQy9DLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUM5QyxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUMzRCxPQUFPLEVBQUMsNkJBQTZCLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQztBQUMxRSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sY0FBYyxDQUFDO0FBQzFDLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUM5QyxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUNyRCxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFB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QStCO29CQUMvQiw4QkFBOEI7b0JBQzlCLGlDQUFpQztpQkFDbEM7Z0JBQ0QsU0FBUyxFQUFFO29CQUNULHNCQUFzQjtvQkFDdEIsc0JBQXNCO29CQUN0QixvQkFBb0I7aUJBQ3JCO2FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmQ29tbW9uTW9kdWxlfSBmcm9tICdAYWpmL2NvcmUvY29tbW9uJztcbmltcG9ydCB7QWpmRmlsZUlucHV0TW9kdWxlfSBmcm9tICdAYWpmL2NvcmUvZmlsZS1pbnB1dCc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7SHR0cENsaWVudE1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1JlYWN0aXZlRm9ybXNNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7VHJhbnNsYXRlTW9kdWxlfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcblxuaW1wb3J0IHtBamZBc0ZpZWxkSW5zdGFuY2VQaXBlfSBmcm9tICcuL2FzLWZpZWxkLWluc3RhbmNlJztcbmltcG9ydCB7QWpmQXNSZXBlYXRpbmdTbGlkZUluc3RhbmNlUGlwZX0gZnJvbSAnLi9hcy1yZXBlYXRpbmctc2xpZGUtaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZCb29sVG9JbnRQaXBlfSBmcm9tICcuL2Jvb2wtdG8taW50JztcbmltcG9ydCB7QWpmRGF0ZVZhbHVlUGlwZX0gZnJvbSAnLi9kYXRlLXZhbHVlJztcbmltcG9ydCB7QWpmRGF0ZVZhbHVlU3RyaW5nUGlwZX0gZnJvbSAnLi9kYXRlLXZhbHVlLXN0cmluZyc7XG5pbXBvcnQge0FqZkV4cGFuZEZpZWxkV2l0aENob2ljZXNQaXBlfSBmcm9tICcuL2V4cGFuZC1pbnB1dC13aXRoLWNob2ljZXMnO1xuaW1wb3J0IHtBamZGaWVsZEhvc3R9IGZyb20gJy4vZmllbGQtaG9zdCc7XG5pbXBvcnQge0FqZkZpZWxkSWNvblBpcGV9IGZyb20gJy4vZmllbGQtaWNvbic7XG5pbXBvcnQge0FqZkZpZWxkSXNWYWxpZFBpcGV9IGZyb20gJy4vZmllbGQtaXMtdmFsaWQnO1xuaW1wb3J0IHtBamZGaWxlRmllbGRDb21wb25lbnR9IGZyb20gJy4vZmlsZS1maWVsZCc7XG5pbXBvcnQge0FqZkZvcm1SZW5kZXJlclNlcnZpY2V9IGZyb20gJy4vZm9ybS1yZW5kZXJlcic7XG5pbXBvcnQge0FqZkdldFRhYmxlQ2VsbENvbnRyb2xQaXBlfSBmcm9tICcuL2dldC10YWJsZS1jZWxsLWNvbnRyb2wnO1xuaW1wb3J0IHtBamZJbWFnZUZpZWxkQ29tcG9uZW50fSBmcm9tICcuL2ltYWdlLWZpZWxkJztcbmltcG9ydCB7QWpmSW5jcmVtZW50UGlwZX0gZnJvbSAnLi9pbmNyZW1lbnQnO1xuaW1wb3J0IHtBamZJc0NlbGxFZGl0YWJsZVBpcGV9IGZyb20gJy4vaXMtY2VsbC1lZGl0YWJsZSc7XG5pbXBvcnQge0FqZklzUmVwZWF0aW5nU2xpZGVJbnN0YW5jZVBpcGV9IGZyb20gJy4vaXMtcmVwZWF0aW5nLXNsaWRlJztcbmltcG9ydCB7QWpmTm9kZUNvbXBsZXRlTmFtZVBpcGV9IGZyb20gJy4vbm9kZS1jb21wbGV0ZS1uYW1lJztcbmltcG9ydCB7QWpmUmFuZ2VQaXBlfSBmcm9tICcuL3JhbmdlJztcbmltcG9ydCB7QWpmUmVhZE9ubHlGaWVsZENvbXBvbmVudH0gZnJvbSAnLi9yZWFkLW9ubHktZmllbGQnO1xuaW1wb3J0IHtBamZSZWFkT25seUZpbGVGaWVsZENvbXBvbmVudH0gZnJvbSAnLi9yZWFkLW9ubHktZmlsZS1maWVsZCc7XG5pbXBvcnQge0FqZlJlYWRPbmx5SW1hZ2VGaWVsZENvbXBvbmVudH0gZnJvbSAnLi9yZWFkLW9ubHktaW1hZ2UtZmllbGQnO1xuaW1wb3J0IHtBamZSZWFkT25seVNlbGVjdEZpZWxkQ29tcG9uZW50fSBmcm9tICcuL3JlYWQtb25seS1zZWxlY3QtZmllbGQnO1xuaW1wb3J0IHtBamZSZWFkT25seVRhYmxlRmllbGRDb21wb25lbnR9IGZyb20gJy4vcmVhZC1vbmx5LXRhYmxlLWZpZWxkJztcbmltcG9ydCB7QWpmUmVhZE9ubHlWaWRlb1VybEZpZWxkQ29tcG9uZW50fSBmcm9tICcuL3JlYWQtb25seS12aWRlby11cmwtZmllbGQnO1xuaW1wb3J0IHtBamZUYWJsZVJvd0NsYXNzfSBmcm9tICcuL3RhYmxlLXJvdy1jbGFzcyc7XG5pbXBvcnQge0FqZlRhYmxlVmlzaWJsZUNvbHVtbnNQaXBlfSBmcm9tICcuL3RhYmxlLXZpc2libGUtY29sdW1ucyc7XG5pbXBvcnQge0FqZlZhbGlkU2xpZGVQaXBlfSBmcm9tICcuL3ZhbGlkLXNsaWRlJztcbmltcG9ydCB7QWpmVmFsaWRhdGlvblNlcnZpY2V9IGZyb20gJy4vdmFsaWRhdGlvbi1zZXJ2aWNlJztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgQWpmQXNGaWVsZEluc3RhbmNlUGlwZSxcbiAgICBBamZBc1JlcGVhdGluZ1NsaWRlSW5zdGFuY2VQaXBlLFxuICAgIEFqZkJvb2xUb0ludFBpcGUsXG4gICAgQWpmRGF0ZVZhbHVlUGlwZSxcbiAgICBBamZEYXRlVmFsdWVTdHJpbmdQaXBlLFxuICAgIEFqZkV4cGFuZEZpZWxkV2l0aENob2ljZXNQaXBlLFxuICAgIEFqZkZpZWxkSG9zdCxcbiAgICBBamZGaWVsZEljb25QaXBlLFxuICAgIEFqZkZpZWxkSXNWYWxpZFBpcGUsXG4gICAgQWpmRmlsZUZpZWxkQ29tcG9uZW50LFxuICAgIEFqZkdldFRhYmxlQ2VsbENvbnRyb2xQaXBlLFxuICAgIEFqZkltYWdlRmllbGRDb21wb25lbnQsXG4gICAgQWpmSW5jcmVtZW50UGlwZSxcbiAgICBBamZJc0NlbGxFZGl0YWJsZVBpcGUsXG4gICAgQWpmSXNSZXBlYXRpbmdTbGlkZUluc3RhbmNlUGlwZSxcbiAgICBBamZOb2RlQ29tcGxldGVOYW1lUGlwZSxcbiAgICBBamZSYW5nZVBpcGUsXG4gICAgQWpmUmVhZE9ubHlGaWVsZENvbXBvbmVudCxcbiAgICBBamZSZWFkT25seUZpbGVGaWVsZENvbXBvbmVudCxcbiAgICBBamZSZWFkT25seUltYWdlRmllbGRDb21wb25lbnQsXG4gICAgQWpmUmVhZE9ubHlTZWxlY3RGaWVsZENvbXBvbmVudCxcbiAgICBBamZSZWFkT25seVRhYmxlRmllbGRDb21wb25lbnQsXG4gICAgQWpmUmVhZE9ubHlWaWRlb1VybEZpZWxkQ29tcG9uZW50LFxuICAgIEFqZlRhYmxlUm93Q2xhc3MsXG4gICAgQWpmVGFibGVWaXNpYmxlQ29sdW1uc1BpcGUsXG4gICAgQWpmVmFsaWRTbGlkZVBpcGUsXG4gIF0sXG4gIGltcG9ydHM6IFtcbiAgICBBamZDb21tb25Nb2R1bGUsIEFqZkZpbGVJbnB1dE1vZHVsZSwgQ29tbW9uTW9kdWxlLCBIdHRwQ2xpZW50TW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgIFRyYW5zbGF0ZU1vZHVsZVxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgQWpmQXNGaWVsZEluc3RhbmNlUGlwZSxcbiAgICBBamZBc1JlcGVhdGluZ1NsaWRlSW5zdGFuY2VQaXBlLFxuICAgIEFqZkJvb2xUb0ludFBpcGUsXG4gICAgQWpmRGF0ZVZhbHVlUGlwZSxcbiAgICBBamZEYXRlVmFsdWVTdHJpbmdQaXBlLFxuICAgIEFqZkV4cGFuZEZpZWxkV2l0aENob2ljZXNQaXBlLFxuICAgIEFqZkZpZWxkSG9zdCxcbiAgICBBamZGaWVsZEljb25QaXBlLFxuICAgIEFqZkZpZWxkSXNWYWxpZFBpcGUsXG4gICAgQWpmRmlsZUZpZWxkQ29tcG9uZW50LFxuICAgIEFqZkdldFRhYmxlQ2VsbENvbnRyb2xQaXBlLFxuICAgIEFqZkltYWdlRmllbGRDb21wb25lbnQsXG4gICAgQWpmSW5jcmVtZW50UGlwZSxcbiAgICBBamZJc0NlbGxFZGl0YWJsZVBpcGUsXG4gICAgQWpmSXNSZXBlYXRpbmdTbGlkZUluc3RhbmNlUGlwZSxcbiAgICBBamZOb2RlQ29tcGxldGVOYW1lUGlwZSxcbiAgICBBamZSYW5nZVBpcGUsXG4gICAgQWpmUmVhZE9ubHlGaWVsZENvbXBvbmVudCxcbiAgICBBamZSZWFkT25seUZpbGVGaWVsZENvbXBvbmVudCxcbiAgICBBamZSZWFkT25seUltYWdlRmllbGRDb21wb25lbnQsXG4gICAgQWpmUmVhZE9ubHlTZWxlY3RGaWVsZENvbXBvbmVudCxcbiAgICBBamZSZWFkT25seVRhYmxlRmllbGRDb21wb25lbnQsXG4gICAgQWpmUmVhZE9ubHlWaWRlb1VybEZpZWxkQ29tcG9uZW50LFxuICAgIEFqZlRhYmxlUm93Q2xhc3MsXG4gICAgQWpmVGFibGVWaXNpYmxlQ29sdW1uc1BpcGUsXG4gICAgQWpmVmFsaWRTbGlkZVBpcGUsXG4gIF0sXG4gIGVudHJ5Q29tcG9uZW50czogW1xuICAgIEFqZkZpbGVGaWVsZENvbXBvbmVudCxcbiAgICBBamZJbWFnZUZpZWxkQ29tcG9uZW50LFxuICAgIEFqZlJlYWRPbmx5RmllbGRDb21wb25lbnQsXG4gICAgQWpmUmVhZE9ubHlGaWxlRmllbGRDb21wb25lbnQsXG4gICAgQWpmUmVhZE9ubHlJbWFnZUZpZWxkQ29tcG9uZW50LFxuICAgIEFqZlJlYWRPbmx5U2VsZWN0RmllbGRDb21wb25lbnQsXG4gICAgQWpmUmVhZE9ubHlUYWJsZUZpZWxkQ29tcG9uZW50LFxuICAgIEFqZlJlYWRPbmx5VmlkZW9VcmxGaWVsZENvbXBvbmVudCxcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgQWpmRGF0ZVZhbHVlU3RyaW5nUGlwZSxcbiAgICBBamZGb3JtUmVuZGVyZXJTZXJ2aWNlLFxuICAgIEFqZlZhbGlkYXRpb25TZXJ2aWNlLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBBamZGb3Jtc01vZHVsZSB7XG59XG4iXX0=