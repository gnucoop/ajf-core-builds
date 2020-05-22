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
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AjfAsFieldInstancePipe } from './as-field-instance';
import { AjfAsRepeatingSlideInstancePipe } from './as-repeating-slide-instance';
import { AjfBoolToIntPipe } from './bool-to-int';
import { AjfDateValuePipe } from './date-value';
import { AjfDateValueStringPipe } from './date-value-string';
import { AjfExpandFieldWithChoicesPipe } from './expand-input-with-choices';
import { AjfFieldHost } from './field-host';
import { AjfFieldIconPipe } from './field-icon';
import { AjfFieldIsValidPipe } from './field-is-valid';
import { AjfFormRendererService } from './form-renderer';
import { AjfGetTableCellControlPipe } from './get-table-cell-control';
import { AjfIncrementPipe } from './increment';
import { AjfIsCellEditablePipe } from './is-cell-editable';
import { AjfIsRepeatingSlideInstancePipe } from './is-repeating-slide';
import { AjfNodeCompleteNamePipe } from './node-complete-name';
import { AjfRangePipe } from './range';
import { AjfReadOnlyFieldComponent } from './read-only-field';
import { AjfReadOnlyTableFieldComponent } from './read-only-table-field';
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
                AjfGetTableCellControlPipe,
                AjfIncrementPipe,
                AjfIsCellEditablePipe,
                AjfIsRepeatingSlideInstancePipe,
                AjfNodeCompleteNamePipe,
                AjfRangePipe,
                AjfReadOnlyFieldComponent,
                AjfReadOnlyTableFieldComponent,
                AjfTableRowClass,
                AjfTableVisibleColumnsPipe,
                AjfValidSlidePipe,
            ],
            imports: [AjfCommonModule, CommonModule],
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
                AjfGetTableCellControlPipe,
                AjfIncrementPipe,
                AjfIsCellEditablePipe,
                AjfIsRepeatingSlideInstancePipe,
                AjfNodeCompleteNamePipe,
                AjfRangePipe,
                AjfReadOnlyFieldComponent,
                AjfReadOnlyTableFieldComponent,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybXMtbW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvZm9ybXMvZm9ybXMtbW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRzs7QUFFSCxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFdkMsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDM0QsT0FBTyxFQUFDLCtCQUErQixFQUFDLE1BQU0sK0JBQStCLENBQUM7QUFDOUUsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQy9DLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUM5QyxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUMzRCxPQUFPLEVBQUMsNkJBQTZCLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQztBQUMxRSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sY0FBYyxDQUFDO0FBQzFDLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUM5QyxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUNyRCxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN2RCxPQUFPLEVBQUMsMEJBQTBCLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUNwRSxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFDN0MsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDekQsT0FBTyxFQUFDLCtCQUErQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDckUsT0FBTyxFQUFDLHVCQUF1QixFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDN0QsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLFNBQVMsQ0FBQztBQUNyQyxPQUFPLEVBQUMseUJBQXlCLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUM1RCxPQUFPLEVBQUMsOEJBQThCLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUN2RSxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUMsMEJBQTBCLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUNuRSxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDaEQsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFzRDFEO0lBQUEsSUFBYSxjQUFjLEdBQTNCLE1BQWEsY0FBYztLQUMxQixDQUFBO0lBRFksY0FBYztRQXBEMUIsUUFBUSxDQUFDO1lBQ1IsWUFBWSxFQUFFO2dCQUNaLHNCQUFzQjtnQkFDdEIsK0JBQStCO2dCQUMvQixnQkFBZ0I7Z0JBQ2hCLGdCQUFnQjtnQkFDaEIsc0JBQXNCO2dCQUN0Qiw2QkFBNkI7Z0JBQzdCLFlBQVk7Z0JBQ1osZ0JBQWdCO2dCQUNoQixtQkFBbUI7Z0JBQ25CLDBCQUEwQjtnQkFDMUIsZ0JBQWdCO2dCQUNoQixxQkFBcUI7Z0JBQ3JCLCtCQUErQjtnQkFDL0IsdUJBQXVCO2dCQUN2QixZQUFZO2dCQUNaLHlCQUF5QjtnQkFDekIsOEJBQThCO2dCQUM5QixnQkFBZ0I7Z0JBQ2hCLDBCQUEwQjtnQkFDMUIsaUJBQWlCO2FBQ2xCO1lBQ0QsT0FBTyxFQUFFLENBQUMsZUFBZSxFQUFFLFlBQVksQ0FBQztZQUN4QyxPQUFPLEVBQUU7Z0JBQ1Asc0JBQXNCO2dCQUN0QiwrQkFBK0I7Z0JBQy9CLGdCQUFnQjtnQkFDaEIsZ0JBQWdCO2dCQUNoQixzQkFBc0I7Z0JBQ3RCLDZCQUE2QjtnQkFDN0IsWUFBWTtnQkFDWixnQkFBZ0I7Z0JBQ2hCLG1CQUFtQjtnQkFDbkIsMEJBQTBCO2dCQUMxQixnQkFBZ0I7Z0JBQ2hCLHFCQUFxQjtnQkFDckIsK0JBQStCO2dCQUMvQix1QkFBdUI7Z0JBQ3ZCLFlBQVk7Z0JBQ1oseUJBQXlCO2dCQUN6Qiw4QkFBOEI7Z0JBQzlCLGdCQUFnQjtnQkFDaEIsMEJBQTBCO2dCQUMxQixpQkFBaUI7YUFDbEI7WUFDRCxTQUFTLEVBQUU7Z0JBQ1Qsc0JBQXNCO2dCQUN0QixzQkFBc0I7Z0JBQ3RCLG9CQUFvQjthQUNyQjtTQUNGLENBQUM7T0FDVyxjQUFjLENBQzFCO0lBQUQscUJBQUM7S0FBQTtTQURZLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmQ29tbW9uTW9kdWxlfSBmcm9tICdAYWpmL2NvcmUvY29tbW9uJztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7QWpmQXNGaWVsZEluc3RhbmNlUGlwZX0gZnJvbSAnLi9hcy1maWVsZC1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZkFzUmVwZWF0aW5nU2xpZGVJbnN0YW5jZVBpcGV9IGZyb20gJy4vYXMtcmVwZWF0aW5nLXNsaWRlLWluc3RhbmNlJztcbmltcG9ydCB7QWpmQm9vbFRvSW50UGlwZX0gZnJvbSAnLi9ib29sLXRvLWludCc7XG5pbXBvcnQge0FqZkRhdGVWYWx1ZVBpcGV9IGZyb20gJy4vZGF0ZS12YWx1ZSc7XG5pbXBvcnQge0FqZkRhdGVWYWx1ZVN0cmluZ1BpcGV9IGZyb20gJy4vZGF0ZS12YWx1ZS1zdHJpbmcnO1xuaW1wb3J0IHtBamZFeHBhbmRGaWVsZFdpdGhDaG9pY2VzUGlwZX0gZnJvbSAnLi9leHBhbmQtaW5wdXQtd2l0aC1jaG9pY2VzJztcbmltcG9ydCB7QWpmRmllbGRIb3N0fSBmcm9tICcuL2ZpZWxkLWhvc3QnO1xuaW1wb3J0IHtBamZGaWVsZEljb25QaXBlfSBmcm9tICcuL2ZpZWxkLWljb24nO1xuaW1wb3J0IHtBamZGaWVsZElzVmFsaWRQaXBlfSBmcm9tICcuL2ZpZWxkLWlzLXZhbGlkJztcbmltcG9ydCB7QWpmRm9ybVJlbmRlcmVyU2VydmljZX0gZnJvbSAnLi9mb3JtLXJlbmRlcmVyJztcbmltcG9ydCB7QWpmR2V0VGFibGVDZWxsQ29udHJvbFBpcGV9IGZyb20gJy4vZ2V0LXRhYmxlLWNlbGwtY29udHJvbCc7XG5pbXBvcnQge0FqZkluY3JlbWVudFBpcGV9IGZyb20gJy4vaW5jcmVtZW50JztcbmltcG9ydCB7QWpmSXNDZWxsRWRpdGFibGVQaXBlfSBmcm9tICcuL2lzLWNlbGwtZWRpdGFibGUnO1xuaW1wb3J0IHtBamZJc1JlcGVhdGluZ1NsaWRlSW5zdGFuY2VQaXBlfSBmcm9tICcuL2lzLXJlcGVhdGluZy1zbGlkZSc7XG5pbXBvcnQge0FqZk5vZGVDb21wbGV0ZU5hbWVQaXBlfSBmcm9tICcuL25vZGUtY29tcGxldGUtbmFtZSc7XG5pbXBvcnQge0FqZlJhbmdlUGlwZX0gZnJvbSAnLi9yYW5nZSc7XG5pbXBvcnQge0FqZlJlYWRPbmx5RmllbGRDb21wb25lbnR9IGZyb20gJy4vcmVhZC1vbmx5LWZpZWxkJztcbmltcG9ydCB7QWpmUmVhZE9ubHlUYWJsZUZpZWxkQ29tcG9uZW50fSBmcm9tICcuL3JlYWQtb25seS10YWJsZS1maWVsZCc7XG5pbXBvcnQge0FqZlRhYmxlUm93Q2xhc3N9IGZyb20gJy4vdGFibGUtcm93LWNsYXNzJztcbmltcG9ydCB7QWpmVGFibGVWaXNpYmxlQ29sdW1uc1BpcGV9IGZyb20gJy4vdGFibGUtdmlzaWJsZS1jb2x1bW5zJztcbmltcG9ydCB7QWpmVmFsaWRTbGlkZVBpcGV9IGZyb20gJy4vdmFsaWQtc2xpZGUnO1xuaW1wb3J0IHtBamZWYWxpZGF0aW9uU2VydmljZX0gZnJvbSAnLi92YWxpZGF0aW9uLXNlcnZpY2UnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBBamZBc0ZpZWxkSW5zdGFuY2VQaXBlLFxuICAgIEFqZkFzUmVwZWF0aW5nU2xpZGVJbnN0YW5jZVBpcGUsXG4gICAgQWpmQm9vbFRvSW50UGlwZSxcbiAgICBBamZEYXRlVmFsdWVQaXBlLFxuICAgIEFqZkRhdGVWYWx1ZVN0cmluZ1BpcGUsXG4gICAgQWpmRXhwYW5kRmllbGRXaXRoQ2hvaWNlc1BpcGUsXG4gICAgQWpmRmllbGRIb3N0LFxuICAgIEFqZkZpZWxkSWNvblBpcGUsXG4gICAgQWpmRmllbGRJc1ZhbGlkUGlwZSxcbiAgICBBamZHZXRUYWJsZUNlbGxDb250cm9sUGlwZSxcbiAgICBBamZJbmNyZW1lbnRQaXBlLFxuICAgIEFqZklzQ2VsbEVkaXRhYmxlUGlwZSxcbiAgICBBamZJc1JlcGVhdGluZ1NsaWRlSW5zdGFuY2VQaXBlLFxuICAgIEFqZk5vZGVDb21wbGV0ZU5hbWVQaXBlLFxuICAgIEFqZlJhbmdlUGlwZSxcbiAgICBBamZSZWFkT25seUZpZWxkQ29tcG9uZW50LFxuICAgIEFqZlJlYWRPbmx5VGFibGVGaWVsZENvbXBvbmVudCxcbiAgICBBamZUYWJsZVJvd0NsYXNzLFxuICAgIEFqZlRhYmxlVmlzaWJsZUNvbHVtbnNQaXBlLFxuICAgIEFqZlZhbGlkU2xpZGVQaXBlLFxuICBdLFxuICBpbXBvcnRzOiBbQWpmQ29tbW9uTW9kdWxlLCBDb21tb25Nb2R1bGVdLFxuICBleHBvcnRzOiBbXG4gICAgQWpmQXNGaWVsZEluc3RhbmNlUGlwZSxcbiAgICBBamZBc1JlcGVhdGluZ1NsaWRlSW5zdGFuY2VQaXBlLFxuICAgIEFqZkJvb2xUb0ludFBpcGUsXG4gICAgQWpmRGF0ZVZhbHVlUGlwZSxcbiAgICBBamZEYXRlVmFsdWVTdHJpbmdQaXBlLFxuICAgIEFqZkV4cGFuZEZpZWxkV2l0aENob2ljZXNQaXBlLFxuICAgIEFqZkZpZWxkSG9zdCxcbiAgICBBamZGaWVsZEljb25QaXBlLFxuICAgIEFqZkZpZWxkSXNWYWxpZFBpcGUsXG4gICAgQWpmR2V0VGFibGVDZWxsQ29udHJvbFBpcGUsXG4gICAgQWpmSW5jcmVtZW50UGlwZSxcbiAgICBBamZJc0NlbGxFZGl0YWJsZVBpcGUsXG4gICAgQWpmSXNSZXBlYXRpbmdTbGlkZUluc3RhbmNlUGlwZSxcbiAgICBBamZOb2RlQ29tcGxldGVOYW1lUGlwZSxcbiAgICBBamZSYW5nZVBpcGUsXG4gICAgQWpmUmVhZE9ubHlGaWVsZENvbXBvbmVudCxcbiAgICBBamZSZWFkT25seVRhYmxlRmllbGRDb21wb25lbnQsXG4gICAgQWpmVGFibGVSb3dDbGFzcyxcbiAgICBBamZUYWJsZVZpc2libGVDb2x1bW5zUGlwZSxcbiAgICBBamZWYWxpZFNsaWRlUGlwZSxcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgQWpmRGF0ZVZhbHVlU3RyaW5nUGlwZSxcbiAgICBBamZGb3JtUmVuZGVyZXJTZXJ2aWNlLFxuICAgIEFqZlZhbGlkYXRpb25TZXJ2aWNlLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBBamZGb3Jtc01vZHVsZSB7XG59XG4iXX0=