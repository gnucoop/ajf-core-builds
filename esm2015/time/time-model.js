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
export class AjfTimeModel {
    constructor() {
        this._changed = new EventEmitter();
        this.changed = this._changed.asObservable();
        this._hours = 0;
        this._minutes = 0;
    }
    get minutes() {
        return this._minutes;
    }
    set minutes(value) {
        if (value > -1 && value < 61) {
            this._minutes = value;
            this._changed.emit(this.toString());
        }
    }
    get hours() {
        return this._hours;
    }
    set hours(value) {
        if (value > -1 && value < 24) {
            this._hours = value;
            this._changed.emit(this.toString());
        }
    }
    toString() {
        let minutes = this.minutes.toString().length > 1 && this.minutes || `0${this.minutes}`;
        let hours = this.hours.toString().length > 1 && this.hours || `0${this.hours}`;
        return `${hours}:${minutes}`;
    }
    fromString(value) {
        try {
            let splitted = value.split(':');
            if (splitted.length == 2) {
                this.hours = parseInt(splitted[0]);
                this.minutes = parseInt(splitted[1]);
            }
        }
        catch (e) {
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL3RpbWUvdGltZS1tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRzNDLE1BQU0sT0FBTyxZQUFZO0lBQXpCO1FBQ1UsYUFBUSxHQUF5QixJQUFJLFlBQVksRUFBVSxDQUFDO1FBQzNELFlBQU8sR0FBdUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUU1RCxXQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ1gsYUFBUSxHQUFHLENBQUMsQ0FBQztJQXNDdkIsQ0FBQztJQXBDQyxJQUFJLE9BQU87UUFDVCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUNELElBQUksT0FBTyxDQUFDLEtBQWE7UUFDdkIsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLElBQUksS0FBSyxHQUFHLEVBQUUsRUFBRTtZQUM1QixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztZQUN0QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztTQUNyQztJQUNILENBQUM7SUFFRCxJQUFJLEtBQUs7UUFDUCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDckIsQ0FBQztJQUNELElBQUksS0FBSyxDQUFDLEtBQWE7UUFDckIsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLElBQUksS0FBSyxHQUFHLEVBQUUsRUFBRTtZQUM1QixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUNwQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztTQUNyQztJQUNILENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDdkYsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDL0UsT0FBTyxHQUFHLEtBQUssSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUMvQixDQUFDO0lBRUQsVUFBVSxDQUFDLEtBQWE7UUFDdEIsSUFBSTtZQUNGLElBQUksUUFBUSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDaEMsSUFBSSxRQUFRLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtnQkFDeEIsSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ25DLElBQUksQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3RDO1NBQ0Y7UUFBQyxPQUFPLENBQUMsRUFBRTtTQUNYO0lBQ0gsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0V2ZW50RW1pdHRlcn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gJ3J4anMnO1xuXG5leHBvcnQgY2xhc3MgQWpmVGltZU1vZGVsIHtcbiAgcHJpdmF0ZSBfY2hhbmdlZDogRXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcbiAgcmVhZG9ubHkgY2hhbmdlZDogT2JzZXJ2YWJsZTxzdHJpbmc+ID0gdGhpcy5fY2hhbmdlZC5hc09ic2VydmFibGUoKTtcblxuICBwcml2YXRlIF9ob3VycyA9IDA7XG4gIHByaXZhdGUgX21pbnV0ZXMgPSAwO1xuXG4gIGdldCBtaW51dGVzKCkge1xuICAgIHJldHVybiB0aGlzLl9taW51dGVzO1xuICB9XG4gIHNldCBtaW51dGVzKHZhbHVlOiBudW1iZXIpIHtcbiAgICBpZiAodmFsdWUgPiAtMSAmJiB2YWx1ZSA8IDYxKSB7XG4gICAgICB0aGlzLl9taW51dGVzID0gdmFsdWU7XG4gICAgICB0aGlzLl9jaGFuZ2VkLmVtaXQodGhpcy50b1N0cmluZygpKTtcbiAgICB9XG4gIH1cblxuICBnZXQgaG91cnMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2hvdXJzO1xuICB9XG4gIHNldCBob3Vycyh2YWx1ZTogbnVtYmVyKSB7XG4gICAgaWYgKHZhbHVlID4gLTEgJiYgdmFsdWUgPCAyNCkge1xuICAgICAgdGhpcy5faG91cnMgPSB2YWx1ZTtcbiAgICAgIHRoaXMuX2NoYW5nZWQuZW1pdCh0aGlzLnRvU3RyaW5nKCkpO1xuICAgIH1cbiAgfVxuXG4gIHRvU3RyaW5nKCkge1xuICAgIGxldCBtaW51dGVzID0gdGhpcy5taW51dGVzLnRvU3RyaW5nKCkubGVuZ3RoID4gMSAmJiB0aGlzLm1pbnV0ZXMgfHwgYDAke3RoaXMubWludXRlc31gO1xuICAgIGxldCBob3VycyA9IHRoaXMuaG91cnMudG9TdHJpbmcoKS5sZW5ndGggPiAxICYmIHRoaXMuaG91cnMgfHwgYDAke3RoaXMuaG91cnN9YDtcbiAgICByZXR1cm4gYCR7aG91cnN9OiR7bWludXRlc31gO1xuICB9XG5cbiAgZnJvbVN0cmluZyh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdHJ5IHtcbiAgICAgIGxldCBzcGxpdHRlZCA9IHZhbHVlLnNwbGl0KCc6Jyk7XG4gICAgICBpZiAoc3BsaXR0ZWQubGVuZ3RoID09IDIpIHtcbiAgICAgICAgdGhpcy5ob3VycyA9IHBhcnNlSW50KHNwbGl0dGVkWzBdKTtcbiAgICAgICAgdGhpcy5taW51dGVzID0gcGFyc2VJbnQoc3BsaXR0ZWRbMV0pO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICB9XG4gIH1cbn1cbiJdfQ==