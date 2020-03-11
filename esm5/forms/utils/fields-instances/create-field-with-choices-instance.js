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
import { __assign, __read, __spread } from "tslib";
import { EventEmitter } from '@angular/core';
import { createFieldInstance } from './create-field-instance';
export function createFieldWithChoicesInstance(instance, context) {
    var fieldInstance = createFieldInstance(instance, context);
    return __assign(__assign({}, fieldInstance), { node: instance.node, filteredChoices: __spread(instance.node.choices), firstTriggerConditionDone: {}, selectionTrigger: new EventEmitter() });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLWZpZWxkLXdpdGgtY2hvaWNlcy1pbnN0YW5jZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2Zvcm1zL3V0aWxzL2ZpZWxkcy1pbnN0YW5jZXMvY3JlYXRlLWZpZWxkLXdpdGgtY2hvaWNlcy1pbnN0YW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7O0FBR0gsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGVBQWUsQ0FBQztBQU0zQyxPQUFPLEVBQXlCLG1CQUFtQixFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFLcEYsTUFBTSxVQUFVLDhCQUE4QixDQUMxQyxRQUE4QyxFQUM5QyxPQUFtQjtJQUNyQixJQUFNLGFBQWEsR0FBRyxtQkFBbUIsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDN0QsNkJBQ0ssYUFBYSxLQUNoQixJQUFJLEVBQUUsUUFBUSxDQUFDLElBQUksRUFDbkIsZUFBZSxXQUFNLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUMxQyx5QkFBeUIsRUFBRSxFQUFFLEVBQzdCLGdCQUFnQixFQUFFLElBQUksWUFBWSxFQUFRLElBQzFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZDb250ZXh0fSBmcm9tICdAYWpmL2NvcmUvbW9kZWxzJztcbmltcG9ydCB7RXZlbnRFbWl0dGVyfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtcbiAgQWpmRmllbGRXaXRoQ2hvaWNlc0luc3RhbmNlXG59IGZyb20gJy4uLy4uL2ludGVyZmFjZS9maWVsZHMtaW5zdGFuY2VzL2ZpZWxkLXdpdGgtY2hvaWNlcy1pbnN0YW5jZSc7XG5cbmltcG9ydCB7QWpmRmllbGRJbnN0YW5jZUNyZWF0ZSwgY3JlYXRlRmllbGRJbnN0YW5jZX0gZnJvbSAnLi9jcmVhdGUtZmllbGQtaW5zdGFuY2UnO1xuXG5leHBvcnQgdHlwZSBBamZGaWVsZFdpdGhDaG9pY2VzSW5zdGFuY2VDcmVhdGU8VD4gPVxuICAgIEFqZkZpZWxkSW5zdGFuY2VDcmVhdGUmUGFydGlhbDxBamZGaWVsZFdpdGhDaG9pY2VzSW5zdGFuY2U8VD4+O1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRmllbGRXaXRoQ2hvaWNlc0luc3RhbmNlPFQ+KFxuICAgIGluc3RhbmNlOiBBamZGaWVsZFdpdGhDaG9pY2VzSW5zdGFuY2VDcmVhdGU8VD4sXG4gICAgY29udGV4dDogQWpmQ29udGV4dCk6IEFqZkZpZWxkV2l0aENob2ljZXNJbnN0YW5jZTxUPiB7XG4gIGNvbnN0IGZpZWxkSW5zdGFuY2UgPSBjcmVhdGVGaWVsZEluc3RhbmNlKGluc3RhbmNlLCBjb250ZXh0KTtcbiAgcmV0dXJuIHtcbiAgICAuLi5maWVsZEluc3RhbmNlLFxuICAgIG5vZGU6IGluc3RhbmNlLm5vZGUsXG4gICAgZmlsdGVyZWRDaG9pY2VzOiBbLi4uaW5zdGFuY2Uubm9kZS5jaG9pY2VzXSxcbiAgICBmaXJzdFRyaWdnZXJDb25kaXRpb25Eb25lOiB7fSxcbiAgICBzZWxlY3Rpb25UcmlnZ2VyOiBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCksXG4gIH07XG59XG4iXX0=