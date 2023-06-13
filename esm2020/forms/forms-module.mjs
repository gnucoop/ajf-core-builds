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
import { AjfReadOnlyGeolocationFieldComponent } from './read-only-geolocation-field';
import { AjfReadOnlyImageFieldComponent } from './read-only-image-field';
import { AjfReadOnlySelectFieldComponent } from './read-only-select-field';
import { AjfReadOnlyTableFieldComponent } from './read-only-table-field';
import { AjfReadOnlyVideoUrlFieldComponent } from './read-only-video-url-field';
import { AjfTableRowClass } from './table-row-class';
import { AjfTableVisibleColumnsPipe } from './table-visible-columns';
import { AjfValidSlidePipe } from './valid-slide';
import { AjfValidationService } from './validation-service';
import { AjfAsFieldInstanceErrorsPipe } from './as-validation-errors-string';
import * as i0 from "@angular/core";
export class AjfFormsModule {
}
AjfFormsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfFormsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AjfFormsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.0.4", ngImport: i0, type: AjfFormsModule, declarations: [AjfAsFieldInstancePipe,
        AjfAsFieldInstanceErrorsPipe,
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
        AjfReadOnlyGeolocationFieldComponent,
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
        AjfAsFieldInstanceErrorsPipe,
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
        AjfReadOnlyGeolocationFieldComponent,
        AjfReadOnlyImageFieldComponent,
        AjfReadOnlySelectFieldComponent,
        AjfReadOnlyTableFieldComponent,
        AjfReadOnlyVideoUrlFieldComponent,
        AjfTableRowClass,
        AjfTableVisibleColumnsPipe,
        AjfValidSlidePipe] });
AjfFormsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfFormsModule, providers: [AjfDateValueStringPipe, AjfFormRendererService, AjfValidationService], imports: [AjfCommonModule,
        AjfFileInputModule,
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        AjfTranslocoModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfFormsModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        AjfAsFieldInstancePipe,
                        AjfAsFieldInstanceErrorsPipe,
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
                        AjfReadOnlyGeolocationFieldComponent,
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
                        AjfAsFieldInstanceErrorsPipe,
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
                        AjfReadOnlyGeolocationFieldComponent,
                        AjfReadOnlyImageFieldComponent,
                        AjfReadOnlySelectFieldComponent,
                        AjfReadOnlyTableFieldComponent,
                        AjfReadOnlyVideoUrlFieldComponent,
                        AjfTableRowClass,
                        AjfTableVisibleColumnsPipe,
                        AjfValidSlidePipe,
                    ],
                    providers: [AjfDateValueStringPipe, AjfFormRendererService, AjfValidationService],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybXMtbW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9mb3Jtcy9zcmMvZm9ybXMtbW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUNqRCxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUN4RCxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUN2RCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDdEQsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUVuRCxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUMzRCxPQUFPLEVBQUMsK0JBQStCLEVBQUMsTUFBTSwrQkFBK0IsQ0FBQztBQUM5RSxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDL0MsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sY0FBYyxDQUFDO0FBQzlDLE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQzNELE9BQU8sRUFBQyw2QkFBNkIsRUFBQyxNQUFNLDZCQUE2QixDQUFDO0FBQzFFLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFDMUMsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sY0FBYyxDQUFDO0FBQzlDLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQ3JELE9BQU8sRUFBQyxxQkFBcUIsRUFB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QixZQUFZO3dCQUNaLGdCQUFnQjt3QkFDaEIsbUJBQW1CO3dCQUNuQixxQkFBcUI7d0JBQ3JCLDJCQUEyQjt3QkFDM0IsMEJBQTBCO3dCQUMxQixzQkFBc0I7d0JBQ3RCLGdCQUFnQjt3QkFDaEIscUJBQXFCO3dCQUNyQiwyQkFBMkI7d0JBQzNCLCtCQUErQjt3QkFDL0IsdUJBQXVCO3dCQUN2QixZQUFZO3dCQUNaLHlCQUF5Qjt3QkFDekIsNkJBQTZCO3dCQUM3QixvQ0FBb0M7d0JBQ3BDLDhCQUE4Qjt3QkFDOUIsK0JBQStCO3dCQUMvQiw4QkFBOEI7d0JBQzlCLGlDQUFpQzt3QkFDakMsZ0JBQWdCO3dCQUNoQiwwQkFBMEI7d0JBQzFCLGlCQUFpQjtxQkFDbEI7b0JBQ0QsU0FBUyxFQUFFLENBQUMsc0JBQXNCLEVBQUUsc0JBQXNCLEVBQUUsb0JBQW9CLENBQUM7aUJBQ2xGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkNvbW1vbk1vZHVsZX0gZnJvbSAnQGFqZi9jb3JlL2NvbW1vbic7XG5pbXBvcnQge0FqZkZpbGVJbnB1dE1vZHVsZX0gZnJvbSAnQGFqZi9jb3JlL2ZpbGUtaW5wdXQnO1xuaW1wb3J0IHtBamZUcmFuc2xvY29Nb2R1bGV9IGZyb20gJ0BhamYvY29yZS90cmFuc2xvY28nO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0h0dHBDbGllbnRNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtSZWFjdGl2ZUZvcm1zTW9kdWxlfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7QWpmQXNGaWVsZEluc3RhbmNlUGlwZX0gZnJvbSAnLi9hcy1maWVsZC1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZkFzUmVwZWF0aW5nU2xpZGVJbnN0YW5jZVBpcGV9IGZyb20gJy4vYXMtcmVwZWF0aW5nLXNsaWRlLWluc3RhbmNlJztcbmltcG9ydCB7QWpmQm9vbFRvSW50UGlwZX0gZnJvbSAnLi9ib29sLXRvLWludCc7XG5pbXBvcnQge0FqZkRhdGVWYWx1ZVBpcGV9IGZyb20gJy4vZGF0ZS12YWx1ZSc7XG5pbXBvcnQge0FqZkRhdGVWYWx1ZVN0cmluZ1BpcGV9IGZyb20gJy4vZGF0ZS12YWx1ZS1zdHJpbmcnO1xuaW1wb3J0IHtBamZFeHBhbmRGaWVsZFdpdGhDaG9pY2VzUGlwZX0gZnJvbSAnLi9leHBhbmQtaW5wdXQtd2l0aC1jaG9pY2VzJztcbmltcG9ydCB7QWpmRmllbGRIb3N0fSBmcm9tICcuL2ZpZWxkLWhvc3QnO1xuaW1wb3J0IHtBamZGaWVsZEljb25QaXBlfSBmcm9tICcuL2ZpZWxkLWljb24nO1xuaW1wb3J0IHtBamZGaWVsZElzVmFsaWRQaXBlfSBmcm9tICcuL2ZpZWxkLWlzLXZhbGlkJztcbmltcG9ydCB7QWpmRmlsZUZpZWxkQ29tcG9uZW50fSBmcm9tICcuL2ZpbGUtZmllbGQnO1xuaW1wb3J0IHtBamZGb3JtUmVuZGVyZXJTZXJ2aWNlfSBmcm9tICcuL2Zvcm0tcmVuZGVyZXInO1xuaW1wb3J0IHtBamZGb3JtU3RyaW5nSWRlbnRpZmllclBpcGV9IGZyb20gJy4vZm9ybS1zdHJpbmctaWRlbnRpZmllcic7XG5pbXBvcnQge0FqZkdldFRhYmxlQ2VsbENvbnRyb2xQaXBlfSBmcm9tICcuL2dldC10YWJsZS1jZWxsLWNvbnRyb2wnO1xuaW1wb3J0IHtBamZJbWFnZUZpZWxkQ29tcG9uZW50fSBmcm9tICcuL2ltYWdlLWZpZWxkJztcbmltcG9ydCB7QWpmSW5jcmVtZW50UGlwZX0gZnJvbSAnLi9pbmNyZW1lbnQnO1xuaW1wb3J0IHtBamZJc0NlbGxFZGl0YWJsZVBpcGV9IGZyb20gJy4vaXMtY2VsbC1lZGl0YWJsZSc7XG5pbXBvcnQge0FqZklzUmVhZG9ubHlJbnB1dEZpZWxkUGlwZX0gZnJvbSAnLi9pcy1yZWFkb25seS1pbnB1dC1maWVsZCc7XG5pbXBvcnQge0FqZklzUmVwZWF0aW5nU2xpZGVJbnN0YW5jZVBpcGV9IGZyb20gJy4vaXMtcmVwZWF0aW5nLXNsaWRlJztcbmltcG9ydCB7QWpmTm9kZUNvbXBsZXRlTmFtZVBpcGV9IGZyb20gJy4vbm9kZS1jb21wbGV0ZS1uYW1lJztcbmltcG9ydCB7QWpmUmFuZ2VQaXBlfSBmcm9tICcuL3JhbmdlJztcbmltcG9ydCB7QWpmUmVhZE9ubHlGaWVsZENvbXBvbmVudH0gZnJvbSAnLi9yZWFkLW9ubHktZmllbGQnO1xuaW1wb3J0IHtBamZSZWFkT25seUZpbGVGaWVsZENvbXBvbmVudH0gZnJvbSAnLi9yZWFkLW9ubHktZmlsZS1maWVsZCc7XG5pbXBvcnQge0FqZlJlYWRPbmx5R2VvbG9jYXRpb25GaWVsZENvbXBvbmVudH0gZnJvbSAnLi9yZWFkLW9ubHktZ2VvbG9jYXRpb24tZmllbGQnO1xuaW1wb3J0IHtBamZSZWFkT25seUltYWdlRmllbGRDb21wb25lbnR9IGZyb20gJy4vcmVhZC1vbmx5LWltYWdlLWZpZWxkJztcbmltcG9ydCB7QWpmUmVhZE9ubHlTZWxlY3RGaWVsZENvbXBvbmVudH0gZnJvbSAnLi9yZWFkLW9ubHktc2VsZWN0LWZpZWxkJztcbmltcG9ydCB7QWpmUmVhZE9ubHlUYWJsZUZpZWxkQ29tcG9uZW50fSBmcm9tICcuL3JlYWQtb25seS10YWJsZS1maWVsZCc7XG5pbXBvcnQge0FqZlJlYWRPbmx5VmlkZW9VcmxGaWVsZENvbXBvbmVudH0gZnJvbSAnLi9yZWFkLW9ubHktdmlkZW8tdXJsLWZpZWxkJztcbmltcG9ydCB7QWpmVGFibGVSb3dDbGFzc30gZnJvbSAnLi90YWJsZS1yb3ctY2xhc3MnO1xuaW1wb3J0IHtBamZUYWJsZVZpc2libGVDb2x1bW5zUGlwZX0gZnJvbSAnLi90YWJsZS12aXNpYmxlLWNvbHVtbnMnO1xuaW1wb3J0IHtBamZWYWxpZFNsaWRlUGlwZX0gZnJvbSAnLi92YWxpZC1zbGlkZSc7XG5pbXBvcnQge0FqZlZhbGlkYXRpb25TZXJ2aWNlfSBmcm9tICcuL3ZhbGlkYXRpb24tc2VydmljZSc7XG5pbXBvcnQge0FqZkFzRmllbGRJbnN0YW5jZUVycm9yc1BpcGV9IGZyb20gJy4vYXMtdmFsaWRhdGlvbi1lcnJvcnMtc3RyaW5nJztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgQWpmQXNGaWVsZEluc3RhbmNlUGlwZSxcbiAgICBBamZBc0ZpZWxkSW5zdGFuY2VFcnJvcnNQaXBlLFxuICAgIEFqZkFzUmVwZWF0aW5nU2xpZGVJbnN0YW5jZVBpcGUsXG4gICAgQWpmQm9vbFRvSW50UGlwZSxcbiAgICBBamZEYXRlVmFsdWVQaXBlLFxuICAgIEFqZkRhdGVWYWx1ZVN0cmluZ1BpcGUsXG4gICAgQWpmRXhwYW5kRmllbGRXaXRoQ2hvaWNlc1BpcGUsXG4gICAgQWpmRmllbGRIb3N0LFxuICAgIEFqZkZpZWxkSWNvblBpcGUsXG4gICAgQWpmRmllbGRJc1ZhbGlkUGlwZSxcbiAgICBBamZGaWxlRmllbGRDb21wb25lbnQsXG4gICAgQWpmRm9ybVN0cmluZ0lkZW50aWZpZXJQaXBlLFxuICAgIEFqZkdldFRhYmxlQ2VsbENvbnRyb2xQaXBlLFxuICAgIEFqZkltYWdlRmllbGRDb21wb25lbnQsXG4gICAgQWpmSW5jcmVtZW50UGlwZSxcbiAgICBBamZJc0NlbGxFZGl0YWJsZVBpcGUsXG4gICAgQWpmSXNSZWFkb25seUlucHV0RmllbGRQaXBlLFxuICAgIEFqZklzUmVwZWF0aW5nU2xpZGVJbnN0YW5jZVBpcGUsXG4gICAgQWpmTm9kZUNvbXBsZXRlTmFtZVBpcGUsXG4gICAgQWpmUmFuZ2VQaXBlLFxuICAgIEFqZlJlYWRPbmx5RmllbGRDb21wb25lbnQsXG4gICAgQWpmUmVhZE9ubHlGaWxlRmllbGRDb21wb25lbnQsXG4gICAgQWpmUmVhZE9ubHlHZW9sb2NhdGlvbkZpZWxkQ29tcG9uZW50LFxuICAgIEFqZlJlYWRPbmx5SW1hZ2VGaWVsZENvbXBvbmVudCxcbiAgICBBamZSZWFkT25seVNlbGVjdEZpZWxkQ29tcG9uZW50LFxuICAgIEFqZlJlYWRPbmx5VGFibGVGaWVsZENvbXBvbmVudCxcbiAgICBBamZSZWFkT25seVZpZGVvVXJsRmllbGRDb21wb25lbnQsXG4gICAgQWpmVGFibGVSb3dDbGFzcyxcbiAgICBBamZUYWJsZVZpc2libGVDb2x1bW5zUGlwZSxcbiAgICBBamZWYWxpZFNsaWRlUGlwZSxcbiAgXSxcbiAgaW1wb3J0czogW1xuICAgIEFqZkNvbW1vbk1vZHVsZSxcbiAgICBBamZGaWxlSW5wdXRNb2R1bGUsXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEh0dHBDbGllbnRNb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICBBamZUcmFuc2xvY29Nb2R1bGUsXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBBamZBc0ZpZWxkSW5zdGFuY2VQaXBlLFxuICAgIEFqZkFzRmllbGRJbnN0YW5jZUVycm9yc1BpcGUsXG4gICAgQWpmQXNSZXBlYXRpbmdTbGlkZUluc3RhbmNlUGlwZSxcbiAgICBBamZCb29sVG9JbnRQaXBlLFxuICAgIEFqZkRhdGVWYWx1ZVBpcGUsXG4gICAgQWpmRGF0ZVZhbHVlU3RyaW5nUGlwZSxcbiAgICBBamZFeHBhbmRGaWVsZFdpdGhDaG9pY2VzUGlwZSxcbiAgICBBamZGaWVsZEhvc3QsXG4gICAgQWpmRmllbGRJY29uUGlwZSxcbiAgICBBamZGaWVsZElzVmFsaWRQaXBlLFxuICAgIEFqZkZpbGVGaWVsZENvbXBvbmVudCxcbiAgICBBamZGb3JtU3RyaW5nSWRlbnRpZmllclBpcGUsXG4gICAgQWpmR2V0VGFibGVDZWxsQ29udHJvbFBpcGUsXG4gICAgQWpmSW1hZ2VGaWVsZENvbXBvbmVudCxcbiAgICBBamZJbmNyZW1lbnRQaXBlLFxuICAgIEFqZklzQ2VsbEVkaXRhYmxlUGlwZSxcbiAgICBBamZJc1JlYWRvbmx5SW5wdXRGaWVsZFBpcGUsXG4gICAgQWpmSXNSZXBlYXRpbmdTbGlkZUluc3RhbmNlUGlwZSxcbiAgICBBamZOb2RlQ29tcGxldGVOYW1lUGlwZSxcbiAgICBBamZSYW5nZVBpcGUsXG4gICAgQWpmUmVhZE9ubHlGaWVsZENvbXBvbmVudCxcbiAgICBBamZSZWFkT25seUZpbGVGaWVsZENvbXBvbmVudCxcbiAgICBBamZSZWFkT25seUdlb2xvY2F0aW9uRmllbGRDb21wb25lbnQsXG4gICAgQWpmUmVhZE9ubHlJbWFnZUZpZWxkQ29tcG9uZW50LFxuICAgIEFqZlJlYWRPbmx5U2VsZWN0RmllbGRDb21wb25lbnQsXG4gICAgQWpmUmVhZE9ubHlUYWJsZUZpZWxkQ29tcG9uZW50LFxuICAgIEFqZlJlYWRPbmx5VmlkZW9VcmxGaWVsZENvbXBvbmVudCxcbiAgICBBamZUYWJsZVJvd0NsYXNzLFxuICAgIEFqZlRhYmxlVmlzaWJsZUNvbHVtbnNQaXBlLFxuICAgIEFqZlZhbGlkU2xpZGVQaXBlLFxuICBdLFxuICBwcm92aWRlcnM6IFtBamZEYXRlVmFsdWVTdHJpbmdQaXBlLCBBamZGb3JtUmVuZGVyZXJTZXJ2aWNlLCBBamZWYWxpZGF0aW9uU2VydmljZV0sXG59KVxuZXhwb3J0IGNsYXNzIEFqZkZvcm1zTW9kdWxlIHt9XG4iXX0=