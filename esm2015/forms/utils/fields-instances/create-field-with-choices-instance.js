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
import { EventEmitter } from '@angular/core';
import { createFieldInstance } from './create-field-instance';
export function createFieldWithChoicesInstance(instance, context) {
    const fieldInstance = createFieldInstance(instance, context);
    return Object.assign(Object.assign({}, fieldInstance), { node: instance.node, filteredChoices: [...instance.node.choices], firstTriggerConditionDone: {}, selectionTrigger: new EventEmitter() });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLWZpZWxkLXdpdGgtY2hvaWNlcy1pbnN0YW5jZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2Zvcm1zL3V0aWxzL2ZpZWxkcy1pbnN0YW5jZXMvY3JlYXRlLWZpZWxkLXdpdGgtY2hvaWNlcy1pbnN0YW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFHSCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBSzNDLE9BQU8sRUFBeUIsbUJBQW1CLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUtwRixNQUFNLFVBQVUsOEJBQThCLENBQzFDLFFBQThDLEVBQzlDLE9BQW1CO0lBQ3JCLE1BQU0sYUFBYSxHQUFHLG1CQUFtQixDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUM3RCx1Q0FDSyxhQUFhLEtBQ2hCLElBQUksRUFBRSxRQUFRLENBQUMsSUFBSSxFQUNuQixlQUFlLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQzNDLHlCQUF5QixFQUFFLEVBQUUsRUFDN0IsZ0JBQWdCLEVBQUUsSUFBSSxZQUFZLEVBQVEsSUFDMUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkNvbnRleHR9IGZyb20gJ0BhamYvY29yZS9tb2RlbHMnO1xuaW1wb3J0IHtFdmVudEVtaXR0ZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge1xuICBBamZGaWVsZFdpdGhDaG9pY2VzSW5zdGFuY2Vcbn0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL2ZpZWxkcy1pbnN0YW5jZXMvZmllbGQtd2l0aC1jaG9pY2VzLWluc3RhbmNlJztcbmltcG9ydCB7QWpmRmllbGRJbnN0YW5jZUNyZWF0ZSwgY3JlYXRlRmllbGRJbnN0YW5jZX0gZnJvbSAnLi9jcmVhdGUtZmllbGQtaW5zdGFuY2UnO1xuXG5leHBvcnQgdHlwZSBBamZGaWVsZFdpdGhDaG9pY2VzSW5zdGFuY2VDcmVhdGU8VD4gPVxuICAgIEFqZkZpZWxkSW5zdGFuY2VDcmVhdGUmUGFydGlhbDxBamZGaWVsZFdpdGhDaG9pY2VzSW5zdGFuY2U8VD4+O1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRmllbGRXaXRoQ2hvaWNlc0luc3RhbmNlPFQ+KFxuICAgIGluc3RhbmNlOiBBamZGaWVsZFdpdGhDaG9pY2VzSW5zdGFuY2VDcmVhdGU8VD4sXG4gICAgY29udGV4dDogQWpmQ29udGV4dCk6IEFqZkZpZWxkV2l0aENob2ljZXNJbnN0YW5jZTxUPiB7XG4gIGNvbnN0IGZpZWxkSW5zdGFuY2UgPSBjcmVhdGVGaWVsZEluc3RhbmNlKGluc3RhbmNlLCBjb250ZXh0KTtcbiAgcmV0dXJuIHtcbiAgICAuLi5maWVsZEluc3RhbmNlLFxuICAgIG5vZGU6IGluc3RhbmNlLm5vZGUsXG4gICAgZmlsdGVyZWRDaG9pY2VzOiBbLi4uaW5zdGFuY2Uubm9kZS5jaG9pY2VzXSxcbiAgICBmaXJzdFRyaWdnZXJDb25kaXRpb25Eb25lOiB7fSxcbiAgICBzZWxlY3Rpb25UcmlnZ2VyOiBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCksXG4gIH07XG59XG4iXX0=