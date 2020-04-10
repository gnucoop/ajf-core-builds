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
import { Directive, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { AjfTimeModel } from './time-model';
var AjfTime = /** @class */ (function () {
    function AjfTime() {
        var _this = this;
        this._value = new AjfTimeModel();
        this._onChangeCallback = function (_) { };
        this._onTouchedCallback = function () { };
        this._valueChangeSub = Subscription.EMPTY;
        this._valueChangeSub = this._value.changed.subscribe(function (x) {
            _this._onChangeCallback(x);
        });
    }
    Object.defineProperty(AjfTime.prototype, "time", {
        get: function () {
            return this._value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfTime.prototype, "value", {
        get: function () {
            return this._value.toString();
        },
        set: function (value) {
            if (value !== this._value.toString()) {
                this._value.fromString(value);
                this._onChangeCallback(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfTime.prototype, "hours", {
        get: function () {
            return this._value.hours;
        },
        set: function (hours) {
            this._value.hours = hours;
            this._onChangeCallback(this._value.toString());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfTime.prototype, "minutes", {
        get: function () {
            return this._value.minutes;
        },
        set: function (minutes) {
            this._value.minutes = minutes;
            this._onChangeCallback(this._value.toString());
        },
        enumerable: true,
        configurable: true
    });
    AjfTime.prototype.ngOnDestroy = function () {
        this._valueChangeSub.unsubscribe();
    };
    AjfTime.prototype.writeValue = function (value) {
        this._value.fromString(value);
    };
    AjfTime.prototype.registerOnChange = function (fn) {
        this._onChangeCallback = fn;
    };
    AjfTime.prototype.registerOnTouched = function (fn) {
        this._onTouchedCallback = fn;
    };
    AjfTime.prototype.focusHandler = function () {
        this._onTouchedCallback();
    };
    AjfTime.decorators = [
        { type: Directive }
    ];
    /** @nocollapse */
    AjfTime.ctorParameters = function () { return []; };
    AjfTime.propDecorators = {
        readonly: [{ type: Input }]
    };
    return AjfTime;
}());
export { AjfTime };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL3RpbWUvdGltZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBWSxNQUFNLGVBQWUsQ0FBQztBQUUxRCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBRWxDLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFFMUM7SUF3Q0U7UUFBQSxpQkFJQztRQXBDTyxXQUFNLEdBQWlCLElBQUksWUFBWSxFQUFFLENBQUM7UUE0QjFDLHNCQUFpQixHQUFxQixVQUFDLENBQU0sSUFBTSxDQUFDLENBQUM7UUFDckQsdUJBQWtCLEdBQWUsY0FBTyxDQUFDLENBQUM7UUFDMUMsb0JBQWUsR0FBaUIsWUFBWSxDQUFDLEtBQUssQ0FBQztRQUd6RCxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxVQUFDLENBQVM7WUFDN0QsS0FBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzVCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQXhDRCxzQkFBSSx5QkFBSTthQUFSO1lBQ0UsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3JCLENBQUM7OztPQUFBO0lBR0Qsc0JBQUksMEJBQUs7YUFBVDtZQUNFLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNoQyxDQUFDO2FBRUQsVUFBVSxLQUFhO1lBQ3JCLElBQUksS0FBSyxLQUFLLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLEVBQUU7Z0JBQ3BDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUM5QixJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDL0I7UUFDSCxDQUFDOzs7T0FQQTtJQVNELHNCQUFJLDBCQUFLO2FBQVQ7WUFDRSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQzNCLENBQUM7YUFDRCxVQUFVLEtBQWE7WUFDckIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1lBQzFCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDakQsQ0FBQzs7O09BSkE7SUFNRCxzQkFBSSw0QkFBTzthQUFYO1lBQ0UsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQztRQUM3QixDQUFDO2FBQ0QsVUFBWSxPQUFlO1lBQ3pCLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztZQUM5QixJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQ2pELENBQUM7OztPQUpBO0lBZ0JELDZCQUFXLEdBQVg7UUFDRSxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3JDLENBQUM7SUFFRCw0QkFBVSxHQUFWLFVBQVcsS0FBYTtRQUN0QixJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBRUQsa0NBQWdCLEdBQWhCLFVBQWlCLEVBQXdCO1FBQ3ZDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUVELG1DQUFpQixHQUFqQixVQUFrQixFQUFPO1FBQ3ZCLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxFQUFFLENBQUM7SUFDL0IsQ0FBQztJQUVELDhCQUFZLEdBQVo7UUFDRSxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztJQUM1QixDQUFDOztnQkFoRUYsU0FBUzs7Ozs7MkJBRVAsS0FBSzs7SUErRFIsY0FBQztDQUFBLEFBakVELElBaUVDO1NBaEVxQixPQUFPIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0RpcmVjdGl2ZSwgSW5wdXQsIE9uRGVzdHJveX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbnRyb2xWYWx1ZUFjY2Vzc29yfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7QWpmVGltZU1vZGVsfSBmcm9tICcuL3RpbWUtbW9kZWwnO1xuXG5ARGlyZWN0aXZlKClcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBamZUaW1lIGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgpIHJlYWRvbmx5OiBib29sZWFuO1xuXG4gIGdldCB0aW1lKCk6IEFqZlRpbWVNb2RlbCB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICB9XG5cbiAgcHJpdmF0ZSBfdmFsdWU6IEFqZlRpbWVNb2RlbCA9IG5ldyBBamZUaW1lTW9kZWwoKTtcbiAgZ2V0IHZhbHVlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlLnRvU3RyaW5nKCk7XG4gIH1cblxuICBzZXQgdmFsdWUodmFsdWU6IHN0cmluZykge1xuICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5fdmFsdWUudG9TdHJpbmcoKSkge1xuICAgICAgdGhpcy5fdmFsdWUuZnJvbVN0cmluZyh2YWx1ZSk7XG4gICAgICB0aGlzLl9vbkNoYW5nZUNhbGxiYWNrKHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBnZXQgaG91cnMoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWUuaG91cnM7XG4gIH1cbiAgc2V0IGhvdXJzKGhvdXJzOiBudW1iZXIpIHtcbiAgICB0aGlzLl92YWx1ZS5ob3VycyA9IGhvdXJzO1xuICAgIHRoaXMuX29uQ2hhbmdlQ2FsbGJhY2sodGhpcy5fdmFsdWUudG9TdHJpbmcoKSk7XG4gIH1cblxuICBnZXQgbWludXRlcygpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZS5taW51dGVzO1xuICB9XG4gIHNldCBtaW51dGVzKG1pbnV0ZXM6IG51bWJlcikge1xuICAgIHRoaXMuX3ZhbHVlLm1pbnV0ZXMgPSBtaW51dGVzO1xuICAgIHRoaXMuX29uQ2hhbmdlQ2FsbGJhY2sodGhpcy5fdmFsdWUudG9TdHJpbmcoKSk7XG4gIH1cblxuICBwcml2YXRlIF9vbkNoYW5nZUNhbGxiYWNrOiAoXzogYW55KSA9PiB2b2lkID0gKF86IGFueSkgPT4ge307XG4gIHByaXZhdGUgX29uVG91Y2hlZENhbGxiYWNrOiAoKSA9PiB2b2lkID0gKCkgPT4ge307XG4gIHByaXZhdGUgX3ZhbHVlQ2hhbmdlU3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5fdmFsdWVDaGFuZ2VTdWIgPSB0aGlzLl92YWx1ZS5jaGFuZ2VkLnN1YnNjcmliZSgoeDogc3RyaW5nKSA9PiB7XG4gICAgICB0aGlzLl9vbkNoYW5nZUNhbGxiYWNrKHgpO1xuICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5fdmFsdWVDaGFuZ2VTdWIudW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIHdyaXRlVmFsdWUodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuX3ZhbHVlLmZyb21TdHJpbmcodmFsdWUpO1xuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKHZhbHVlOiBhbnkpID0+IHZvaWQpIHtcbiAgICB0aGlzLl9vbkNoYW5nZUNhbGxiYWNrID0gZm47XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KSB7XG4gICAgdGhpcy5fb25Ub3VjaGVkQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIGZvY3VzSGFuZGxlcigpOiB2b2lkIHtcbiAgICB0aGlzLl9vblRvdWNoZWRDYWxsYmFjaygpO1xuICB9XG59XG4iXX0=