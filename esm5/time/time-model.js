/**
 * @license
 * Copyright (C) 2018 Gnucoop soc. coop.
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
var AjfTimeModel = /** @class */ (function () {
    function AjfTimeModel() {
        this._changed = new EventEmitter();
        this.changed = this._changed.asObservable();
        this._hours = 0;
        this._minutes = 0;
    }
    Object.defineProperty(AjfTimeModel.prototype, "minutes", {
        get: function () {
            return this._minutes;
        },
        set: function (value) {
            if (value > -1 && value < 61) {
                this._minutes = value;
                this._changed.emit(this.toString());
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfTimeModel.prototype, "hours", {
        get: function () {
            return this._hours;
        },
        set: function (value) {
            if (value > -1 && value < 24) {
                this._hours = value;
                this._changed.emit(this.toString());
            }
        },
        enumerable: true,
        configurable: true
    });
    AjfTimeModel.prototype.toString = function () {
        var minutes = this.minutes.toString().length > 1 && this.minutes || "0" + this.minutes;
        var hours = this.hours.toString().length > 1 && this.hours || "0" + this.hours;
        return hours + ":" + minutes;
    };
    AjfTimeModel.prototype.fromString = function (value) {
        try {
            var splitted = value.split(':');
            if (splitted.length == 2) {
                this.hours = parseInt(splitted[0]);
                this.minutes = parseInt(splitted[1]);
            }
        }
        catch (e) {
        }
    };
    return AjfTimeModel;
}());
export { AjfTimeModel };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL3RpbWUvdGltZS1tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRzNDO0lBQUE7UUFDVSxhQUFRLEdBQXlCLElBQUksWUFBWSxFQUFVLENBQUM7UUFDM0QsWUFBTyxHQUF1QixJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBRTVELFdBQU0sR0FBRyxDQUFDLENBQUM7UUFDWCxhQUFRLEdBQUcsQ0FBQyxDQUFDO0lBdUN2QixDQUFDO0lBckNDLHNCQUFJLGlDQUFPO2FBQVg7WUFDRSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDdkIsQ0FBQzthQUNELFVBQVksS0FBYTtZQUN2QixJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsSUFBSSxLQUFLLEdBQUcsRUFBRSxFQUFFO2dCQUM1QixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztnQkFDdEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7YUFDckM7UUFDSCxDQUFDOzs7T0FOQTtJQVFELHNCQUFJLCtCQUFLO2FBQVQ7WUFDRSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDckIsQ0FBQzthQUNELFVBQVUsS0FBYTtZQUNyQixJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsSUFBSSxLQUFLLEdBQUcsRUFBRSxFQUFFO2dCQUM1QixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztnQkFDcEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7YUFDckM7UUFDSCxDQUFDOzs7T0FOQTtJQVFELCtCQUFRLEdBQVI7UUFDRSxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxNQUFJLElBQUksQ0FBQyxPQUFTLENBQUM7UUFDdkYsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksTUFBSSxJQUFJLENBQUMsS0FBTyxDQUFDO1FBQy9FLE9BQVUsS0FBSyxTQUFJLE9BQVMsQ0FBQztJQUMvQixDQUFDO0lBRUQsaUNBQVUsR0FBVixVQUFXLEtBQWE7UUFDdEIsSUFBSTtZQUNGLElBQUksUUFBUSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDaEMsSUFBSSxRQUFRLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtnQkFDeEIsSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ25DLElBQUksQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3RDO1NBQ0Y7UUFBQyxPQUFPLENBQUMsRUFBRTtTQUVYO0lBQ0gsQ0FBQztJQUNILG1CQUFDO0FBQUQsQ0FBQyxBQTVDRCxJQTRDQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgMjAxOCBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0V2ZW50RW1pdHRlcn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gJ3J4anMnO1xuXG5leHBvcnQgY2xhc3MgQWpmVGltZU1vZGVsIHtcbiAgcHJpdmF0ZSBfY2hhbmdlZDogRXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcbiAgcmVhZG9ubHkgY2hhbmdlZDogT2JzZXJ2YWJsZTxzdHJpbmc+ID0gdGhpcy5fY2hhbmdlZC5hc09ic2VydmFibGUoKTtcblxuICBwcml2YXRlIF9ob3VycyA9IDA7XG4gIHByaXZhdGUgX21pbnV0ZXMgPSAwO1xuXG4gIGdldCBtaW51dGVzKCkge1xuICAgIHJldHVybiB0aGlzLl9taW51dGVzO1xuICB9XG4gIHNldCBtaW51dGVzKHZhbHVlOiBudW1iZXIpIHtcbiAgICBpZiAodmFsdWUgPiAtMSAmJiB2YWx1ZSA8IDYxKSB7XG4gICAgICB0aGlzLl9taW51dGVzID0gdmFsdWU7XG4gICAgICB0aGlzLl9jaGFuZ2VkLmVtaXQodGhpcy50b1N0cmluZygpKTtcbiAgICB9XG4gIH1cblxuICBnZXQgaG91cnMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2hvdXJzO1xuICB9XG4gIHNldCBob3Vycyh2YWx1ZTogbnVtYmVyKSB7XG4gICAgaWYgKHZhbHVlID4gLTEgJiYgdmFsdWUgPCAyNCkge1xuICAgICAgdGhpcy5faG91cnMgPSB2YWx1ZTtcbiAgICAgIHRoaXMuX2NoYW5nZWQuZW1pdCh0aGlzLnRvU3RyaW5nKCkpO1xuICAgIH1cbiAgfVxuXG4gIHRvU3RyaW5nKCkge1xuICAgIGxldCBtaW51dGVzID0gdGhpcy5taW51dGVzLnRvU3RyaW5nKCkubGVuZ3RoID4gMSAmJiB0aGlzLm1pbnV0ZXMgfHwgYDAke3RoaXMubWludXRlc31gO1xuICAgIGxldCBob3VycyA9IHRoaXMuaG91cnMudG9TdHJpbmcoKS5sZW5ndGggPiAxICYmIHRoaXMuaG91cnMgfHwgYDAke3RoaXMuaG91cnN9YDtcbiAgICByZXR1cm4gYCR7aG91cnN9OiR7bWludXRlc31gO1xuICB9XG5cbiAgZnJvbVN0cmluZyh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdHJ5IHtcbiAgICAgIGxldCBzcGxpdHRlZCA9IHZhbHVlLnNwbGl0KCc6Jyk7XG4gICAgICBpZiAoc3BsaXR0ZWQubGVuZ3RoID09IDIpIHtcbiAgICAgICAgdGhpcy5ob3VycyA9IHBhcnNlSW50KHNwbGl0dGVkWzBdKTtcbiAgICAgICAgdGhpcy5taW51dGVzID0gcGFyc2VJbnQoc3BsaXR0ZWRbMV0pO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcblxuICAgIH1cbiAgfVxufVxuIl19