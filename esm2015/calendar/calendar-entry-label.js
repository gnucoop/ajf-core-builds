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
import { __decorate, __metadata } from "tslib";
import { Injectable, Pipe } from '@angular/core';
import { AjfCalendarService } from './calendar-service';
let AjfCalendarEntryLabelPipe = /** @class */ (() => {
    let AjfCalendarEntryLabelPipe = class AjfCalendarEntryLabelPipe {
        constructor(_service) {
            this._service = _service;
        }
        transform(entry) {
            return this._service.entryLabel(entry);
        }
    };
    AjfCalendarEntryLabelPipe = __decorate([
        Injectable(),
        Pipe({ name: 'ajfCalendarEntryLabel' }),
        __metadata("design:paramtypes", [AjfCalendarService])
    ], AjfCalendarEntryLabelPipe);
    return AjfCalendarEntryLabelPipe;
})();
export { AjfCalendarEntryLabelPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItZW50cnktbGFiZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9jYWxlbmRhci9jYWxlbmRhci1lbnRyeS1sYWJlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7O0FBRUgsT0FBTyxFQUFDLFVBQVUsRUFBRSxJQUFJLEVBQWdCLE1BQU0sZUFBZSxDQUFDO0FBRzlELE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBSXREO0lBQUEsSUFBYSx5QkFBeUIsR0FBdEMsTUFBYSx5QkFBeUI7UUFDcEMsWUFBb0IsUUFBNEI7WUFBNUIsYUFBUSxHQUFSLFFBQVEsQ0FBb0I7UUFBRyxDQUFDO1FBRXBELFNBQVMsQ0FBQyxLQUF1QjtZQUMvQixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3pDLENBQUM7S0FDRixDQUFBO0lBTlkseUJBQXlCO1FBRnJDLFVBQVUsRUFBRTtRQUNaLElBQUksQ0FBQyxFQUFDLElBQUksRUFBRSx1QkFBdUIsRUFBQyxDQUFDO3lDQUVOLGtCQUFrQjtPQURyQyx5QkFBeUIsQ0FNckM7SUFBRCxnQ0FBQztLQUFBO1NBTlkseUJBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0luamVjdGFibGUsIFBpcGUsIFBpcGVUcmFuc2Zvcm19IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge0FqZkNhbGVuZGFyRW50cnl9IGZyb20gJy4vY2FsZW5kYXItZW50cnknO1xuaW1wb3J0IHtBamZDYWxlbmRhclNlcnZpY2V9IGZyb20gJy4vY2FsZW5kYXItc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKClcbkBQaXBlKHtuYW1lOiAnYWpmQ2FsZW5kYXJFbnRyeUxhYmVsJ30pXG5leHBvcnQgY2xhc3MgQWpmQ2FsZW5kYXJFbnRyeUxhYmVsUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9zZXJ2aWNlOiBBamZDYWxlbmRhclNlcnZpY2UpIHt9XG5cbiAgdHJhbnNmb3JtKGVudHJ5OiBBamZDYWxlbmRhckVudHJ5KTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fc2VydmljZS5lbnRyeUxhYmVsKGVudHJ5KTtcbiAgfVxufVxuIl19