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
import { Injectable, Pipe } from '@angular/core';
import { format } from 'date-fns';
var AjfDateValueStringPipe = /** @class */ (function () {
    function AjfDateValueStringPipe() {
    }
    AjfDateValueStringPipe.prototype.transform = function (date) {
        if (date == null) {
            return undefined;
        }
        var dateObj = date === 'today' ? new Date() : date;
        return format(dateObj, 'yyyy-MM-dd');
    };
    AjfDateValueStringPipe.decorators = [
        { type: Injectable },
        { type: Pipe, args: [{ name: 'ajfDateValueString' },] }
    ];
    return AjfDateValueStringPipe;
}());
export { AjfDateValueStringPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS12YWx1ZS1zdHJpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9mb3Jtcy9kYXRlLXZhbHVlLXN0cmluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQUMsVUFBVSxFQUFFLElBQUksRUFBZ0IsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLFVBQVUsQ0FBQztBQUVoQztJQUFBO0lBUUEsQ0FBQztJQUxDLDBDQUFTLEdBQVQsVUFBVSxJQUE0QjtRQUNwQyxJQUFJLElBQUksSUFBSSxJQUFJLEVBQUU7WUFBRSxPQUFPLFNBQVMsQ0FBQztTQUFFO1FBQ3ZDLElBQU0sT0FBTyxHQUFHLElBQUksS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUNyRCxPQUFPLE1BQU0sQ0FBQyxPQUFPLEVBQUUsWUFBWSxDQUFDLENBQUM7SUFDdkMsQ0FBQzs7Z0JBUEYsVUFBVTtnQkFDVixJQUFJLFNBQUMsRUFBQyxJQUFJLEVBQUUsb0JBQW9CLEVBQUM7O0lBT2xDLDZCQUFDO0NBQUEsQUFSRCxJQVFDO1NBTlksc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0luamVjdGFibGUsIFBpcGUsIFBpcGVUcmFuc2Zvcm19IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtmb3JtYXR9IGZyb20gJ2RhdGUtZm5zJztcblxuQEluamVjdGFibGUoKVxuQFBpcGUoe25hbWU6ICdhamZEYXRlVmFsdWVTdHJpbmcnfSlcbmV4cG9ydCBjbGFzcyBBamZEYXRlVmFsdWVTdHJpbmdQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIHRyYW5zZm9ybShkYXRlOiBEYXRlfCd0b2RheSd8dW5kZWZpbmVkKTogc3RyaW5nfHVuZGVmaW5lZCB7XG4gICAgaWYgKGRhdGUgPT0gbnVsbCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9XG4gICAgY29uc3QgZGF0ZU9iaiA9IGRhdGUgPT09ICd0b2RheScgPyBuZXcgRGF0ZSgpIDogZGF0ZTtcbiAgICByZXR1cm4gZm9ybWF0KGRhdGVPYmosICd5eXl5LU1NLWRkJyk7XG4gIH1cbn1cbiJdfQ==