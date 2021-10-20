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
import { fieldIconName } from './field-utils';
import * as i0 from "@angular/core";
/**
 *
 *
 * @param Field.
 *
 * @return An icon class name relative to the AjfType.
 */
export class AjfFieldIconPipe {
    transform(field) {
        return fieldIconName(field.fieldType ? field.fieldType : field);
    }
}
AjfFieldIconPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfFieldIconPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
AjfFieldIconPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfFieldIconPipe, name: "ajfFieldIcon" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfFieldIconPipe, decorators: [{
            type: Pipe,
            args: [{ name: 'ajfFieldIcon' }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGQtaWNvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2Zvcm1zL2ZpZWxkLWljb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUFDLElBQUksRUFBZ0IsTUFBTSxlQUFlLENBQUM7QUFFbEQsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGVBQWUsQ0FBQzs7QUFJNUM7Ozs7OztHQU1HO0FBRUgsTUFBTSxPQUFPLGdCQUFnQjtJQUMzQixTQUFTLENBQUMsS0FBOEI7UUFDdEMsT0FBTyxhQUFhLENBQ2pCLEtBQWtCLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBRSxLQUFrQixDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUUsS0FBc0IsQ0FDeEYsQ0FBQztJQUNKLENBQUM7O3FIQUxVLGdCQUFnQjttSEFBaEIsZ0JBQWdCO21HQUFoQixnQkFBZ0I7a0JBRDVCLElBQUk7bUJBQUMsRUFBQyxJQUFJLEVBQUUsY0FBYyxFQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge1BpcGUsIFBpcGVUcmFuc2Zvcm19IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge2ZpZWxkSWNvbk5hbWV9IGZyb20gJy4vZmllbGQtdXRpbHMnO1xuaW1wb3J0IHtBamZGaWVsZH0gZnJvbSAnLi9pbnRlcmZhY2UvZmllbGRzL2ZpZWxkJztcbmltcG9ydCB7QWpmRmllbGRUeXBlfSBmcm9tICcuL2ludGVyZmFjZS9maWVsZHMvZmllbGQtdHlwZSc7XG5cbi8qKlxuICpcbiAqXG4gKiBAcGFyYW0gRmllbGQuXG4gKlxuICogQHJldHVybiBBbiBpY29uIGNsYXNzIG5hbWUgcmVsYXRpdmUgdG8gdGhlIEFqZlR5cGUuXG4gKi9cbkBQaXBlKHtuYW1lOiAnYWpmRmllbGRJY29uJ30pXG5leHBvcnQgY2xhc3MgQWpmRmllbGRJY29uUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICB0cmFuc2Zvcm0oZmllbGQ6IEFqZkZpZWxkIHwgQWpmRmllbGRUeXBlKTogc3RyaW5nIHtcbiAgICByZXR1cm4gZmllbGRJY29uTmFtZShcbiAgICAgIChmaWVsZCBhcyBBamZGaWVsZCkuZmllbGRUeXBlID8gKGZpZWxkIGFzIEFqZkZpZWxkKS5maWVsZFR5cGUgOiAoZmllbGQgYXMgQWpmRmllbGRUeXBlKSxcbiAgICApO1xuICB9XG59XG4iXX0=