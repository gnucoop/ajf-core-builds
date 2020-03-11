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
var AjfRangePipe = /** @class */ (function () {
    function AjfRangePipe() {
    }
    AjfRangePipe.prototype.transform = function (size, start, step) {
        if (size === void 0) { size = 0; }
        if (start === void 0) { start = 1; }
        if (step === void 0) { step = 1; }
        var range = [];
        for (var length_1 = 0; length_1 < size; ++length_1) {
            range.push(start);
            start += step;
        }
        return range;
    };
    AjfRangePipe.decorators = [
        { type: Pipe, args: [{ name: 'ajfRange' },] }
    ];
    return AjfRangePipe;
}());
export { AjfRangePipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFuZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9mb3Jtcy9yYW5nZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQUMsSUFBSSxFQUFnQixNQUFNLGVBQWUsQ0FBQztBQUVsRDtJQUFBO0lBVUEsQ0FBQztJQVJDLGdDQUFTLEdBQVQsVUFBVSxJQUFnQixFQUFFLEtBQWlCLEVBQUUsSUFBZ0I7UUFBckQscUJBQUEsRUFBQSxRQUFnQjtRQUFFLHNCQUFBLEVBQUEsU0FBaUI7UUFBRSxxQkFBQSxFQUFBLFFBQWdCO1FBQzdELElBQU0sS0FBSyxHQUFhLEVBQUUsQ0FBQztRQUMzQixLQUFLLElBQUksUUFBTSxHQUFHLENBQUMsRUFBRSxRQUFNLEdBQUcsSUFBSSxFQUFFLEVBQUUsUUFBTSxFQUFFO1lBQzVDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbEIsS0FBSyxJQUFJLElBQUksQ0FBQztTQUNmO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDOztnQkFURixJQUFJLFNBQUMsRUFBQyxJQUFJLEVBQUUsVUFBVSxFQUFDOztJQVV4QixtQkFBQztDQUFBLEFBVkQsSUFVQztTQVRZLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7UGlwZSwgUGlwZVRyYW5zZm9ybX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBQaXBlKHtuYW1lOiAnYWpmUmFuZ2UnfSlcbmV4cG9ydCBjbGFzcyBBamZSYW5nZVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgdHJhbnNmb3JtKHNpemU6IG51bWJlciA9IDAsIHN0YXJ0OiBudW1iZXIgPSAxLCBzdGVwOiBudW1iZXIgPSAxKTogbnVtYmVyW10ge1xuICAgIGNvbnN0IHJhbmdlOiBudW1iZXJbXSA9IFtdO1xuICAgIGZvciAobGV0IGxlbmd0aCA9IDA7IGxlbmd0aCA8IHNpemU7ICsrbGVuZ3RoKSB7XG4gICAgICByYW5nZS5wdXNoKHN0YXJ0KTtcbiAgICAgIHN0YXJ0ICs9IHN0ZXA7XG4gICAgfVxuICAgIHJldHVybiByYW5nZTtcbiAgfVxufVxuIl19