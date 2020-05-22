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
import { Directive, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { AjfTimeModel } from './time-model';
let AjfTime = /** @class */ (() => {
    let AjfTime = class AjfTime {
        constructor() {
            this._value = new AjfTimeModel();
            this._onChangeCallback = (_) => { };
            this._onTouchedCallback = () => { };
            this._valueChangeSub = Subscription.EMPTY;
            this._valueChangeSub = this._value.changed.subscribe((x) => {
                this._onChangeCallback(x);
            });
        }
        get time() {
            return this._value;
        }
        get value() {
            return this._value.toString();
        }
        set value(value) {
            if (value !== this._value.toString()) {
                this._value.fromString(value);
                this._onChangeCallback(value);
            }
        }
        get hours() {
            return this._value.hours;
        }
        set hours(hours) {
            this._value.hours = hours;
            this._onChangeCallback(this._value.toString());
        }
        get minutes() {
            return this._value.minutes;
        }
        set minutes(minutes) {
            this._value.minutes = minutes;
            this._onChangeCallback(this._value.toString());
        }
        ngOnDestroy() {
            this._valueChangeSub.unsubscribe();
        }
        writeValue(value) {
            this._value.fromString(value);
        }
        registerOnChange(fn) {
            this._onChangeCallback = fn;
        }
        registerOnTouched(fn) {
            this._onTouchedCallback = fn;
        }
        focusHandler() {
            this._onTouchedCallback();
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], AjfTime.prototype, "readonly", void 0);
    AjfTime = __decorate([
        Directive(),
        __metadata("design:paramtypes", [])
    ], AjfTime);
    return AjfTime;
})();
export { AjfTime };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL3RpbWUvdGltZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7O0FBRUgsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQVksTUFBTSxlQUFlLENBQUM7QUFFMUQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUVsQyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sY0FBYyxDQUFDO0FBRzFDO0lBQUEsSUFBc0IsT0FBTyxHQUE3QixNQUFzQixPQUFPO1FBdUMzQjtZQWhDUSxXQUFNLEdBQWlCLElBQUksWUFBWSxFQUFFLENBQUM7WUE0QjFDLHNCQUFpQixHQUFxQixDQUFDLENBQU0sRUFBRSxFQUFFLEdBQUUsQ0FBQyxDQUFDO1lBQ3JELHVCQUFrQixHQUFlLEdBQUcsRUFBRSxHQUFFLENBQUMsQ0FBQztZQUMxQyxvQkFBZSxHQUFpQixZQUFZLENBQUMsS0FBSyxDQUFDO1lBR3pELElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBUyxFQUFFLEVBQUU7Z0JBQ2pFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM1QixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7UUF4Q0QsSUFBSSxJQUFJO1lBQ04sT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3JCLENBQUM7UUFHRCxJQUFJLEtBQUs7WUFDUCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDaEMsQ0FBQztRQUVELElBQUksS0FBSyxDQUFDLEtBQWE7WUFDckIsSUFBSSxLQUFLLEtBQUssSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsRUFBRTtnQkFDcEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQzlCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUMvQjtRQUNILENBQUM7UUFFRCxJQUFJLEtBQUs7WUFDUCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQzNCLENBQUM7UUFDRCxJQUFJLEtBQUssQ0FBQyxLQUFhO1lBQ3JCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUMxQixJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQ2pELENBQUM7UUFFRCxJQUFJLE9BQU87WUFDVCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDO1FBQzdCLENBQUM7UUFDRCxJQUFJLE9BQU8sQ0FBQyxPQUFlO1lBQ3pCLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztZQUM5QixJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQ2pELENBQUM7UUFZRCxXQUFXO1lBQ1QsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNyQyxDQUFDO1FBRUQsVUFBVSxDQUFDLEtBQWE7WUFDdEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDaEMsQ0FBQztRQUVELGdCQUFnQixDQUFDLEVBQXdCO1lBQ3ZDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxFQUFFLENBQUM7UUFDOUIsQ0FBQztRQUVELGlCQUFpQixDQUFDLEVBQU87WUFDdkIsSUFBSSxDQUFDLGtCQUFrQixHQUFHLEVBQUUsQ0FBQztRQUMvQixDQUFDO1FBRUQsWUFBWTtZQUNWLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBQzVCLENBQUM7S0FDRixDQUFBO0lBL0RVO1FBQVIsS0FBSyxFQUFFOzs2Q0FBbUI7SUFEUCxPQUFPO1FBRDVCLFNBQVMsRUFBRTs7T0FDVSxPQUFPLENBZ0U1QjtJQUFELGNBQUM7S0FBQTtTQWhFcUIsT0FBTyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtEaXJlY3RpdmUsIElucHV0LCBPbkRlc3Ryb3l9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb250cm9sVmFsdWVBY2Nlc3Nvcn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQge0FqZlRpbWVNb2RlbH0gZnJvbSAnLi90aW1lLW1vZGVsJztcblxuQERpcmVjdGl2ZSgpXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQWpmVGltZSBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBPbkRlc3Ryb3kge1xuICBASW5wdXQoKSByZWFkb25seTogYm9vbGVhbjtcblxuICBnZXQgdGltZSgpOiBBamZUaW1lTW9kZWwge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgfVxuXG4gIHByaXZhdGUgX3ZhbHVlOiBBamZUaW1lTW9kZWwgPSBuZXcgQWpmVGltZU1vZGVsKCk7XG4gIGdldCB2YWx1ZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZS50b1N0cmluZygpO1xuICB9XG5cbiAgc2V0IHZhbHVlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICBpZiAodmFsdWUgIT09IHRoaXMuX3ZhbHVlLnRvU3RyaW5nKCkpIHtcbiAgICAgIHRoaXMuX3ZhbHVlLmZyb21TdHJpbmcodmFsdWUpO1xuICAgICAgdGhpcy5fb25DaGFuZ2VDYWxsYmFjayh2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGhvdXJzKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlLmhvdXJzO1xuICB9XG4gIHNldCBob3Vycyhob3VyczogbnVtYmVyKSB7XG4gICAgdGhpcy5fdmFsdWUuaG91cnMgPSBob3VycztcbiAgICB0aGlzLl9vbkNoYW5nZUNhbGxiYWNrKHRoaXMuX3ZhbHVlLnRvU3RyaW5nKCkpO1xuICB9XG5cbiAgZ2V0IG1pbnV0ZXMoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWUubWludXRlcztcbiAgfVxuICBzZXQgbWludXRlcyhtaW51dGVzOiBudW1iZXIpIHtcbiAgICB0aGlzLl92YWx1ZS5taW51dGVzID0gbWludXRlcztcbiAgICB0aGlzLl9vbkNoYW5nZUNhbGxiYWNrKHRoaXMuX3ZhbHVlLnRvU3RyaW5nKCkpO1xuICB9XG5cbiAgcHJpdmF0ZSBfb25DaGFuZ2VDYWxsYmFjazogKF86IGFueSkgPT4gdm9pZCA9IChfOiBhbnkpID0+IHt9O1xuICBwcml2YXRlIF9vblRvdWNoZWRDYWxsYmFjazogKCkgPT4gdm9pZCA9ICgpID0+IHt9O1xuICBwcml2YXRlIF92YWx1ZUNoYW5nZVN1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuX3ZhbHVlQ2hhbmdlU3ViID0gdGhpcy5fdmFsdWUuY2hhbmdlZC5zdWJzY3JpYmUoKHg6IHN0cmluZykgPT4ge1xuICAgICAgdGhpcy5fb25DaGFuZ2VDYWxsYmFjayh4KTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuX3ZhbHVlQ2hhbmdlU3ViLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICB3cml0ZVZhbHVlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl92YWx1ZS5mcm9tU3RyaW5nKHZhbHVlKTtcbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46ICh2YWx1ZTogYW55KSA9PiB2b2lkKSB7XG4gICAgdGhpcy5fb25DaGFuZ2VDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSkge1xuICAgIHRoaXMuX29uVG91Y2hlZENhbGxiYWNrID0gZm47XG4gIH1cblxuICBmb2N1c0hhbmRsZXIoKTogdm9pZCB7XG4gICAgdGhpcy5fb25Ub3VjaGVkQ2FsbGJhY2soKTtcbiAgfVxufVxuIl19