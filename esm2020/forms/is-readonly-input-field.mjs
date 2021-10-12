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
import { Pipe } from '@angular/core';
import { AjfFieldType } from './interface/fields/field-type';
import { isFieldInstance } from './utils/nodes-instances/is-field-instance';
import * as i0 from "@angular/core";
/**
 * It checks if the AjfNodeInstance parameter is an Formula AjfField.
 *
 * @export
 * @class AjfIsReadonlyInputFieldPipe
 */
export class AjfIsReadonlyInputFieldPipe {
    transform(instance) {
        return isFieldInstance(instance) &&
            instance.node.fieldType === AjfFieldType.Formula;
    }
}
AjfIsReadonlyInputFieldPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfIsReadonlyInputFieldPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
AjfIsReadonlyInputFieldPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfIsReadonlyInputFieldPipe, name: "ajfIsReadonlyInputField" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfIsReadonlyInputFieldPipe, decorators: [{
            type: Pipe,
            args: [{ name: 'ajfIsReadonlyInputField' }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXMtcmVhZG9ubHktaW5wdXQtZmllbGQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9mb3Jtcy9pcy1yZWFkb25seS1pbnB1dC1maWVsZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQUMsSUFBSSxFQUFnQixNQUFNLGVBQWUsQ0FBQztBQUdsRCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sK0JBQStCLENBQUM7QUFFM0QsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLDJDQUEyQyxDQUFDOztBQUcxRTs7Ozs7R0FLRztBQUVILE1BQU0sT0FBTywyQkFBMkI7SUFDdEMsU0FBUyxDQUFDLFFBQXlCO1FBQ2pDLE9BQU8sZUFBZSxDQUFDLFFBQVEsQ0FBQztZQUMzQixRQUE2QixDQUFDLElBQUksQ0FBQyxTQUFTLEtBQUssWUFBWSxDQUFDLE9BQU8sQ0FBQztJQUM3RSxDQUFDOztnSUFKVSwyQkFBMkI7OEhBQTNCLDJCQUEyQjttR0FBM0IsMkJBQTJCO2tCQUR2QyxJQUFJO21CQUFDLEVBQUMsSUFBSSxFQUFFLHlCQUF5QixFQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge1BpcGUsIFBpcGVUcmFuc2Zvcm19IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge0FqZkZpZWxkSW5zdGFuY2V9IGZyb20gJy4vaW50ZXJmYWNlL2ZpZWxkcy1pbnN0YW5jZXMvZmllbGQtaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZGaWVsZFR5cGV9IGZyb20gJy4vaW50ZXJmYWNlL2ZpZWxkcy9maWVsZC10eXBlJztcbmltcG9ydCB7QWpmTm9kZUluc3RhbmNlfSBmcm9tICcuL2ludGVyZmFjZS9ub2Rlcy1pbnN0YW5jZXMvbm9kZS1pbnN0YW5jZSc7XG5pbXBvcnQge2lzRmllbGRJbnN0YW5jZX0gZnJvbSAnLi91dGlscy9ub2Rlcy1pbnN0YW5jZXMvaXMtZmllbGQtaW5zdGFuY2UnO1xuXG5cbi8qKlxuICogSXQgY2hlY2tzIGlmIHRoZSBBamZOb2RlSW5zdGFuY2UgcGFyYW1ldGVyIGlzIGFuIEZvcm11bGEgQWpmRmllbGQuXG4gKlxuICogQGV4cG9ydFxuICogQGNsYXNzIEFqZklzUmVhZG9ubHlJbnB1dEZpZWxkUGlwZVxuICovXG5AUGlwZSh7bmFtZTogJ2FqZklzUmVhZG9ubHlJbnB1dEZpZWxkJ30pXG5leHBvcnQgY2xhc3MgQWpmSXNSZWFkb25seUlucHV0RmllbGRQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIHRyYW5zZm9ybShpbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGlzRmllbGRJbnN0YW5jZShpbnN0YW5jZSkgJiZcbiAgICAgICAgKGluc3RhbmNlIGFzIEFqZkZpZWxkSW5zdGFuY2UpLm5vZGUuZmllbGRUeXBlID09PSBBamZGaWVsZFR5cGUuRm9ybXVsYTtcbiAgfVxufVxuIl19