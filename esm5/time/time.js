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
        this._valueChangeSub = this._value.changed
            .subscribe(function (x) {
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
        get: function () { return this._value.hours; },
        set: function (hours) {
            this._value.hours = hours;
            this._onChangeCallback(this._value.toString());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfTime.prototype, "minutes", {
        get: function () { return this._value.minutes; },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL3RpbWUvdGltZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBWSxNQUFNLGVBQWUsQ0FBQztBQUUxRCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBRWxDLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFFMUM7SUFvQ0U7UUFBQSxpQkFLQztRQWpDTyxXQUFNLEdBQWlCLElBQUksWUFBWSxFQUFFLENBQUM7UUF3QjFDLHNCQUFpQixHQUFxQixVQUFDLENBQU0sSUFBTSxDQUFDLENBQUM7UUFDckQsdUJBQWtCLEdBQWUsY0FBTyxDQUFDLENBQUM7UUFDMUMsb0JBQWUsR0FBaUIsWUFBWSxDQUFDLEtBQUssQ0FBQztRQUd6RCxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTzthQUN2QyxTQUFTLENBQUMsVUFBQyxDQUFTO1lBQ25CLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM1QixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFyQ0Qsc0JBQUkseUJBQUk7YUFBUjtZQUNFLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUNyQixDQUFDOzs7T0FBQTtJQUdELHNCQUFJLDBCQUFLO2FBQVQ7WUFDRSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDaEMsQ0FBQzthQUVELFVBQVUsS0FBYTtZQUNyQixJQUFJLEtBQUssS0FBSyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxFQUFFO2dCQUNsQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDOUIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ2pDO1FBQ0gsQ0FBQzs7O09BUEE7SUFTRCxzQkFBSSwwQkFBSzthQUFULGNBQXNCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2FBQ2pELFVBQVUsS0FBYTtZQUNyQixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDMUIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUNqRCxDQUFDOzs7T0FKZ0Q7SUFNakQsc0JBQUksNEJBQU87YUFBWCxjQUF3QixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzthQUNyRCxVQUFZLE9BQWU7WUFDekIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1lBQzlCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDakQsQ0FBQzs7O09BSm9EO0lBaUJyRCw2QkFBVyxHQUFYO1FBQ0UsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNyQyxDQUFDO0lBRUQsNEJBQVUsR0FBVixVQUFXLEtBQWE7UUFDdEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVELGtDQUFnQixHQUFoQixVQUFpQixFQUF3QjtRQUN2QyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFFRCxtQ0FBaUIsR0FBakIsVUFBa0IsRUFBTztRQUN2QixJQUFJLENBQUMsa0JBQWtCLEdBQUcsRUFBRSxDQUFDO0lBQy9CLENBQUM7SUFFRCw4QkFBWSxHQUFaO1FBQ0UsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDNUIsQ0FBQzs7Z0JBN0RGLFNBQVM7Ozs7OzJCQUVQLEtBQUs7O0lBNERSLGNBQUM7Q0FBQSxBQTlERCxJQThEQztTQTdEcUIsT0FBTyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtEaXJlY3RpdmUsIElucHV0LCBPbkRlc3Ryb3l9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb250cm9sVmFsdWVBY2Nlc3Nvcn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQge0FqZlRpbWVNb2RlbH0gZnJvbSAnLi90aW1lLW1vZGVsJztcblxuQERpcmVjdGl2ZSgpXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQWpmVGltZSBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBPbkRlc3Ryb3kge1xuICBASW5wdXQoKSByZWFkb25seTogYm9vbGVhbjtcblxuICBnZXQgdGltZSgpOiBBamZUaW1lTW9kZWwge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgfVxuXG4gIHByaXZhdGUgX3ZhbHVlOiBBamZUaW1lTW9kZWwgPSBuZXcgQWpmVGltZU1vZGVsKCk7XG4gIGdldCB2YWx1ZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZS50b1N0cmluZygpO1xuICB9XG5cbiAgc2V0IHZhbHVlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICBpZiAodmFsdWUgIT09IHRoaXMuX3ZhbHVlLnRvU3RyaW5nKCkpIHtcbiAgICAgICAgdGhpcy5fdmFsdWUuZnJvbVN0cmluZyh2YWx1ZSk7XG4gICAgICAgIHRoaXMuX29uQ2hhbmdlQ2FsbGJhY2sodmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBob3VycygpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fdmFsdWUuaG91cnM7IH1cbiAgc2V0IGhvdXJzKGhvdXJzOiBudW1iZXIpIHtcbiAgICB0aGlzLl92YWx1ZS5ob3VycyA9IGhvdXJzO1xuICAgIHRoaXMuX29uQ2hhbmdlQ2FsbGJhY2sodGhpcy5fdmFsdWUudG9TdHJpbmcoKSk7XG4gIH1cblxuICBnZXQgbWludXRlcygpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fdmFsdWUubWludXRlczsgfVxuICBzZXQgbWludXRlcyhtaW51dGVzOiBudW1iZXIpIHtcbiAgICB0aGlzLl92YWx1ZS5taW51dGVzID0gbWludXRlcztcbiAgICB0aGlzLl9vbkNoYW5nZUNhbGxiYWNrKHRoaXMuX3ZhbHVlLnRvU3RyaW5nKCkpO1xuICB9XG5cbiAgcHJpdmF0ZSBfb25DaGFuZ2VDYWxsYmFjazogKF86IGFueSkgPT4gdm9pZCA9IChfOiBhbnkpID0+IHt9O1xuICBwcml2YXRlIF9vblRvdWNoZWRDYWxsYmFjazogKCkgPT4gdm9pZCA9ICgpID0+IHt9O1xuICBwcml2YXRlIF92YWx1ZUNoYW5nZVN1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuX3ZhbHVlQ2hhbmdlU3ViID0gdGhpcy5fdmFsdWUuY2hhbmdlZFxuICAgICAgLnN1YnNjcmliZSgoeDogc3RyaW5nKSA9PiB7XG4gICAgICAgIHRoaXMuX29uQ2hhbmdlQ2FsbGJhY2soeCk7XG4gICAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuX3ZhbHVlQ2hhbmdlU3ViLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICB3cml0ZVZhbHVlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl92YWx1ZS5mcm9tU3RyaW5nKHZhbHVlKTtcbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46ICh2YWx1ZTogYW55KSA9PiB2b2lkKSB7XG4gICAgdGhpcy5fb25DaGFuZ2VDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSkge1xuICAgIHRoaXMuX29uVG91Y2hlZENhbGxiYWNrID0gZm47XG4gIH1cblxuICBmb2N1c0hhbmRsZXIoKTogdm9pZCB7XG4gICAgdGhpcy5fb25Ub3VjaGVkQ2FsbGJhY2soKTtcbiAgfVxufVxuIl19