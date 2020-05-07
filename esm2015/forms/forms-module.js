/**
 * @fileoverview added by tsickle
 * Generated from: src/core/forms/forms-module.ts
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
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybXMtbW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvZm9ybXMvZm9ybXMtbW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUNqRCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUV2QyxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUMzRCxPQUFPLEVBQUMsK0JBQStCLEVBQUMsTUFBTSwrQkFBK0IsQ0FBQztBQUM5RSxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDL0MsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sY0FBYyxDQUFDO0FBQzlDLE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQzNELE9BQU8sRUFBQyw2QkFBNkIsRUFBQyxNQUFNLDZCQUE2QixDQUFDO0FBQzFFLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFDMUMsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sY0FBYyxDQUFDO0FBQzlDLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQ3JELE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3ZELE9BQU8sRUFBQywwQkFBMEIsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQ3BFLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUM3QyxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUN6RCxPQUFPLEVBQUMsK0JBQStCLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUNyRSxPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUM3RCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sU0FBUyxDQUFDO0FBQ3JDLE9BQU8sRUFBQyx5QkFBeUIsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQzVELE9BQU8sRUFBQyw4QkFBOEIsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQ3ZFLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQ25ELE9BQU8sRUFBQywwQkFBMEIsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQ25FLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNoRCxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQXNEMUQsTUFBTSxPQUFPLGNBQWM7OztZQXBEMUIsUUFBUSxTQUFDO2dCQUNSLFlBQVksRUFBRTtvQkFDWixzQkFBc0I7b0JBQ3RCLCtCQUErQjtvQkFDL0IsZ0JBQWdCO29CQUNoQixnQkFBZ0I7b0JBQ2hCLHNCQUFzQjtvQkFDdEIsNkJBQTZCO29CQUM3QixZQUFZO29CQUNaLGdCQUFnQjtvQkFDaEIsbUJBQW1CO29CQUNuQiwwQkFBMEI7b0JBQzFCLGdCQUFnQjtvQkFDaEIscUJBQXFCO29CQUNyQiwrQkFBK0I7b0JBQy9CLHVCQUF1QjtvQkFDdkIsWUFBWTtvQkFDWix5QkFBeUI7b0JBQ3pCLDhCQUE4QjtvQkFDOUIsZ0JBQWdCO29CQUNoQiwwQkFBMEI7b0JBQzFCLGlCQUFpQjtpQkFDbEI7Z0JBQ0QsT0FBTyxFQUFFLENBQUMsZUFBZSxFQUFFLFlBQVksQ0FBQztnQkFDeEMsT0FBTyxFQUFFO29CQUNQLHNCQUFzQjtvQkFDdEIsK0JBQStCO29CQUMvQixnQkFBZ0I7b0JBQ2hCLGdCQUFnQjtvQkFDaEIsc0JBQXNCO29CQUN0Qiw2QkFBNkI7b0JBQzdCLFlBQVk7b0JBQ1osZ0JBQWdCO29CQUNoQixtQkFBbUI7b0JBQ25CLDBCQUEwQjtvQkFDMUIsZ0JBQWdCO29CQUNoQixxQkFBcUI7b0JBQ3JCLCtCQUErQjtvQkFDL0IsdUJBQXVCO29CQUN2QixZQUFZO29CQUNaLHlCQUF5QjtvQkFDekIsOEJBQThCO29CQUM5QixnQkFBZ0I7b0JBQ2hCLDBCQUEwQjtvQkFDMUIsaUJBQWlCO2lCQUNsQjtnQkFDRCxTQUFTLEVBQUU7b0JBQ1Qsc0JBQXNCO29CQUN0QixzQkFBc0I7b0JBQ3RCLG9CQUFvQjtpQkFDckI7YUFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZDb21tb25Nb2R1bGV9IGZyb20gJ0BhamYvY29yZS9jb21tb24nO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtBamZBc0ZpZWxkSW5zdGFuY2VQaXBlfSBmcm9tICcuL2FzLWZpZWxkLWluc3RhbmNlJztcbmltcG9ydCB7QWpmQXNSZXBlYXRpbmdTbGlkZUluc3RhbmNlUGlwZX0gZnJvbSAnLi9hcy1yZXBlYXRpbmctc2xpZGUtaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZCb29sVG9JbnRQaXBlfSBmcm9tICcuL2Jvb2wtdG8taW50JztcbmltcG9ydCB7QWpmRGF0ZVZhbHVlUGlwZX0gZnJvbSAnLi9kYXRlLXZhbHVlJztcbmltcG9ydCB7QWpmRGF0ZVZhbHVlU3RyaW5nUGlwZX0gZnJvbSAnLi9kYXRlLXZhbHVlLXN0cmluZyc7XG5pbXBvcnQge0FqZkV4cGFuZEZpZWxkV2l0aENob2ljZXNQaXBlfSBmcm9tICcuL2V4cGFuZC1pbnB1dC13aXRoLWNob2ljZXMnO1xuaW1wb3J0IHtBamZGaWVsZEhvc3R9IGZyb20gJy4vZmllbGQtaG9zdCc7XG5pbXBvcnQge0FqZkZpZWxkSWNvblBpcGV9IGZyb20gJy4vZmllbGQtaWNvbic7XG5pbXBvcnQge0FqZkZpZWxkSXNWYWxpZFBpcGV9IGZyb20gJy4vZmllbGQtaXMtdmFsaWQnO1xuaW1wb3J0IHtBamZGb3JtUmVuZGVyZXJTZXJ2aWNlfSBmcm9tICcuL2Zvcm0tcmVuZGVyZXInO1xuaW1wb3J0IHtBamZHZXRUYWJsZUNlbGxDb250cm9sUGlwZX0gZnJvbSAnLi9nZXQtdGFibGUtY2VsbC1jb250cm9sJztcbmltcG9ydCB7QWpmSW5jcmVtZW50UGlwZX0gZnJvbSAnLi9pbmNyZW1lbnQnO1xuaW1wb3J0IHtBamZJc0NlbGxFZGl0YWJsZVBpcGV9IGZyb20gJy4vaXMtY2VsbC1lZGl0YWJsZSc7XG5pbXBvcnQge0FqZklzUmVwZWF0aW5nU2xpZGVJbnN0YW5jZVBpcGV9IGZyb20gJy4vaXMtcmVwZWF0aW5nLXNsaWRlJztcbmltcG9ydCB7QWpmTm9kZUNvbXBsZXRlTmFtZVBpcGV9IGZyb20gJy4vbm9kZS1jb21wbGV0ZS1uYW1lJztcbmltcG9ydCB7QWpmUmFuZ2VQaXBlfSBmcm9tICcuL3JhbmdlJztcbmltcG9ydCB7QWpmUmVhZE9ubHlGaWVsZENvbXBvbmVudH0gZnJvbSAnLi9yZWFkLW9ubHktZmllbGQnO1xuaW1wb3J0IHtBamZSZWFkT25seVRhYmxlRmllbGRDb21wb25lbnR9IGZyb20gJy4vcmVhZC1vbmx5LXRhYmxlLWZpZWxkJztcbmltcG9ydCB7QWpmVGFibGVSb3dDbGFzc30gZnJvbSAnLi90YWJsZS1yb3ctY2xhc3MnO1xuaW1wb3J0IHtBamZUYWJsZVZpc2libGVDb2x1bW5zUGlwZX0gZnJvbSAnLi90YWJsZS12aXNpYmxlLWNvbHVtbnMnO1xuaW1wb3J0IHtBamZWYWxpZFNsaWRlUGlwZX0gZnJvbSAnLi92YWxpZC1zbGlkZSc7XG5pbXBvcnQge0FqZlZhbGlkYXRpb25TZXJ2aWNlfSBmcm9tICcuL3ZhbGlkYXRpb24tc2VydmljZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1xuICAgIEFqZkFzRmllbGRJbnN0YW5jZVBpcGUsXG4gICAgQWpmQXNSZXBlYXRpbmdTbGlkZUluc3RhbmNlUGlwZSxcbiAgICBBamZCb29sVG9JbnRQaXBlLFxuICAgIEFqZkRhdGVWYWx1ZVBpcGUsXG4gICAgQWpmRGF0ZVZhbHVlU3RyaW5nUGlwZSxcbiAgICBBamZFeHBhbmRGaWVsZFdpdGhDaG9pY2VzUGlwZSxcbiAgICBBamZGaWVsZEhvc3QsXG4gICAgQWpmRmllbGRJY29uUGlwZSxcbiAgICBBamZGaWVsZElzVmFsaWRQaXBlLFxuICAgIEFqZkdldFRhYmxlQ2VsbENvbnRyb2xQaXBlLFxuICAgIEFqZkluY3JlbWVudFBpcGUsXG4gICAgQWpmSXNDZWxsRWRpdGFibGVQaXBlLFxuICAgIEFqZklzUmVwZWF0aW5nU2xpZGVJbnN0YW5jZVBpcGUsXG4gICAgQWpmTm9kZUNvbXBsZXRlTmFtZVBpcGUsXG4gICAgQWpmUmFuZ2VQaXBlLFxuICAgIEFqZlJlYWRPbmx5RmllbGRDb21wb25lbnQsXG4gICAgQWpmUmVhZE9ubHlUYWJsZUZpZWxkQ29tcG9uZW50LFxuICAgIEFqZlRhYmxlUm93Q2xhc3MsXG4gICAgQWpmVGFibGVWaXNpYmxlQ29sdW1uc1BpcGUsXG4gICAgQWpmVmFsaWRTbGlkZVBpcGUsXG4gIF0sXG4gIGltcG9ydHM6IFtBamZDb21tb25Nb2R1bGUsIENvbW1vbk1vZHVsZV0sXG4gIGV4cG9ydHM6IFtcbiAgICBBamZBc0ZpZWxkSW5zdGFuY2VQaXBlLFxuICAgIEFqZkFzUmVwZWF0aW5nU2xpZGVJbnN0YW5jZVBpcGUsXG4gICAgQWpmQm9vbFRvSW50UGlwZSxcbiAgICBBamZEYXRlVmFsdWVQaXBlLFxuICAgIEFqZkRhdGVWYWx1ZVN0cmluZ1BpcGUsXG4gICAgQWpmRXhwYW5kRmllbGRXaXRoQ2hvaWNlc1BpcGUsXG4gICAgQWpmRmllbGRIb3N0LFxuICAgIEFqZkZpZWxkSWNvblBpcGUsXG4gICAgQWpmRmllbGRJc1ZhbGlkUGlwZSxcbiAgICBBamZHZXRUYWJsZUNlbGxDb250cm9sUGlwZSxcbiAgICBBamZJbmNyZW1lbnRQaXBlLFxuICAgIEFqZklzQ2VsbEVkaXRhYmxlUGlwZSxcbiAgICBBamZJc1JlcGVhdGluZ1NsaWRlSW5zdGFuY2VQaXBlLFxuICAgIEFqZk5vZGVDb21wbGV0ZU5hbWVQaXBlLFxuICAgIEFqZlJhbmdlUGlwZSxcbiAgICBBamZSZWFkT25seUZpZWxkQ29tcG9uZW50LFxuICAgIEFqZlJlYWRPbmx5VGFibGVGaWVsZENvbXBvbmVudCxcbiAgICBBamZUYWJsZVJvd0NsYXNzLFxuICAgIEFqZlRhYmxlVmlzaWJsZUNvbHVtbnNQaXBlLFxuICAgIEFqZlZhbGlkU2xpZGVQaXBlLFxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBBamZEYXRlVmFsdWVTdHJpbmdQaXBlLFxuICAgIEFqZkZvcm1SZW5kZXJlclNlcnZpY2UsXG4gICAgQWpmVmFsaWRhdGlvblNlcnZpY2UsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIEFqZkZvcm1zTW9kdWxlIHtcbn1cbiJdfQ==