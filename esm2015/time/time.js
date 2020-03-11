/**
 * @fileoverview added by tsickle
 * Generated from: src/core/time/time.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
/**
 * @abstract
 */
export class AjfTime {
    constructor() {
        this._value = new AjfTimeModel();
        this._onChangeCallback = (/**
         * @param {?} _
         * @return {?}
         */
        (_) => { });
        this._onTouchedCallback = (/**
         * @return {?}
         */
        () => { });
        this._valueChangeSub = Subscription.EMPTY;
        this._valueChangeSub = this._value.changed
            .subscribe((/**
         * @param {?} x
         * @return {?}
         */
        (x) => {
            this._onChangeCallback(x);
        }));
    }
    /**
     * @return {?}
     */
    get time() {
        return this._value;
    }
    /**
     * @return {?}
     */
    get value() {
        return this._value.toString();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set value(value) {
        if (value !== this._value.toString()) {
            this._value.fromString(value);
            this._onChangeCallback(value);
        }
    }
    /**
     * @return {?}
     */
    get hours() { return this._value.hours; }
    /**
     * @param {?} hours
     * @return {?}
     */
    set hours(hours) {
        this._value.hours = hours;
        this._onChangeCallback(this._value.toString());
    }
    /**
     * @return {?}
     */
    get minutes() { return this._value.minutes; }
    /**
     * @param {?} minutes
     * @return {?}
     */
    set minutes(minutes) {
        this._value.minutes = minutes;
        this._onChangeCallback(this._value.toString());
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._valueChangeSub.unsubscribe();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        this._value.fromString(value);
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this._onChangeCallback = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this._onTouchedCallback = fn;
    }
    /**
     * @return {?}
     */
    focusHandler() {
        this._onTouchedCallback();
    }
}
AjfTime.decorators = [
    { type: Directive }
];
/** @nocollapse */
AjfTime.ctorParameters = () => [];
AjfTime.propDecorators = {
    readonly: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    AjfTime.prototype.readonly;
    /**
     * @type {?}
     * @private
     */
    AjfTime.prototype._value;
    /**
     * @type {?}
     * @private
     */
    AjfTime.prototype._onChangeCallback;
    /**
     * @type {?}
     * @private
     */
    AjfTime.prototype._onTouchedCallback;
    /**
     * @type {?}
     * @private
     */
    AjfTime.prototype._valueChangeSub;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL3RpbWUvdGltZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBWSxNQUFNLGVBQWUsQ0FBQztBQUUxRCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBRWxDLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxjQUFjLENBQUM7Ozs7QUFHMUMsTUFBTSxPQUFnQixPQUFPO0lBbUMzQjtRQTVCUSxXQUFNLEdBQWlCLElBQUksWUFBWSxFQUFFLENBQUM7UUF3QjFDLHNCQUFpQjs7OztRQUFxQixDQUFDLENBQU0sRUFBRSxFQUFFLEdBQUUsQ0FBQyxFQUFDO1FBQ3JELHVCQUFrQjs7O1FBQWUsR0FBRyxFQUFFLEdBQUUsQ0FBQyxFQUFDO1FBQzFDLG9CQUFlLEdBQWlCLFlBQVksQ0FBQyxLQUFLLENBQUM7UUFHekQsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU87YUFDdkMsU0FBUzs7OztRQUFDLENBQUMsQ0FBUyxFQUFFLEVBQUU7WUFDdkIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzVCLENBQUMsRUFBQyxDQUFDO0lBQ1AsQ0FBQzs7OztJQXJDRCxJQUFJLElBQUk7UUFDTixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDckIsQ0FBQzs7OztJQUdELElBQUksS0FBSztRQUNQLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNoQyxDQUFDOzs7OztJQUVELElBQUksS0FBSyxDQUFDLEtBQWE7UUFDckIsSUFBSSxLQUFLLEtBQUssSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsRUFBRTtZQUNsQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM5QixJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDakM7SUFDSCxDQUFDOzs7O0lBRUQsSUFBSSxLQUFLLEtBQWEsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Ozs7O0lBQ2pELElBQUksS0FBSyxDQUFDLEtBQWE7UUFDckIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQzFCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7SUFDakQsQ0FBQzs7OztJQUVELElBQUksT0FBTyxLQUFhLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDOzs7OztJQUNyRCxJQUFJLE9BQU8sQ0FBQyxPQUFlO1FBQ3pCLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUM5QixJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0lBQ2pELENBQUM7Ozs7SUFhRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNyQyxDQUFDOzs7OztJQUVELFVBQVUsQ0FBQyxLQUFhO1FBQ3RCLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2hDLENBQUM7Ozs7O0lBRUQsZ0JBQWdCLENBQUMsRUFBd0I7UUFDdkMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEVBQUUsQ0FBQztJQUM5QixDQUFDOzs7OztJQUVELGlCQUFpQixDQUFDLEVBQU87UUFDdkIsSUFBSSxDQUFDLGtCQUFrQixHQUFHLEVBQUUsQ0FBQztJQUMvQixDQUFDOzs7O0lBRUQsWUFBWTtRQUNWLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQzVCLENBQUM7OztZQTdERixTQUFTOzs7Ozt1QkFFUCxLQUFLOzs7O0lBQU4sMkJBQTJCOzs7OztJQU0zQix5QkFBa0Q7Ozs7O0lBd0JsRCxvQ0FBNkQ7Ozs7O0lBQzdELHFDQUFrRDs7Ozs7SUFDbEQsa0NBQTJEIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0RpcmVjdGl2ZSwgSW5wdXQsIE9uRGVzdHJveX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbnRyb2xWYWx1ZUFjY2Vzc29yfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7QWpmVGltZU1vZGVsfSBmcm9tICcuL3RpbWUtbW9kZWwnO1xuXG5ARGlyZWN0aXZlKClcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBamZUaW1lIGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgpIHJlYWRvbmx5OiBib29sZWFuO1xuXG4gIGdldCB0aW1lKCk6IEFqZlRpbWVNb2RlbCB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICB9XG5cbiAgcHJpdmF0ZSBfdmFsdWU6IEFqZlRpbWVNb2RlbCA9IG5ldyBBamZUaW1lTW9kZWwoKTtcbiAgZ2V0IHZhbHVlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlLnRvU3RyaW5nKCk7XG4gIH1cblxuICBzZXQgdmFsdWUodmFsdWU6IHN0cmluZykge1xuICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5fdmFsdWUudG9TdHJpbmcoKSkge1xuICAgICAgICB0aGlzLl92YWx1ZS5mcm9tU3RyaW5nKHZhbHVlKTtcbiAgICAgICAgdGhpcy5fb25DaGFuZ2VDYWxsYmFjayh2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGhvdXJzKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl92YWx1ZS5ob3VyczsgfVxuICBzZXQgaG91cnMoaG91cnM6IG51bWJlcikge1xuICAgIHRoaXMuX3ZhbHVlLmhvdXJzID0gaG91cnM7XG4gICAgdGhpcy5fb25DaGFuZ2VDYWxsYmFjayh0aGlzLl92YWx1ZS50b1N0cmluZygpKTtcbiAgfVxuXG4gIGdldCBtaW51dGVzKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl92YWx1ZS5taW51dGVzOyB9XG4gIHNldCBtaW51dGVzKG1pbnV0ZXM6IG51bWJlcikge1xuICAgIHRoaXMuX3ZhbHVlLm1pbnV0ZXMgPSBtaW51dGVzO1xuICAgIHRoaXMuX29uQ2hhbmdlQ2FsbGJhY2sodGhpcy5fdmFsdWUudG9TdHJpbmcoKSk7XG4gIH1cblxuICBwcml2YXRlIF9vbkNoYW5nZUNhbGxiYWNrOiAoXzogYW55KSA9PiB2b2lkID0gKF86IGFueSkgPT4ge307XG4gIHByaXZhdGUgX29uVG91Y2hlZENhbGxiYWNrOiAoKSA9PiB2b2lkID0gKCkgPT4ge307XG4gIHByaXZhdGUgX3ZhbHVlQ2hhbmdlU3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5fdmFsdWVDaGFuZ2VTdWIgPSB0aGlzLl92YWx1ZS5jaGFuZ2VkXG4gICAgICAuc3Vic2NyaWJlKCh4OiBzdHJpbmcpID0+IHtcbiAgICAgICAgdGhpcy5fb25DaGFuZ2VDYWxsYmFjayh4KTtcbiAgICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5fdmFsdWVDaGFuZ2VTdWIudW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIHdyaXRlVmFsdWUodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuX3ZhbHVlLmZyb21TdHJpbmcodmFsdWUpO1xuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKHZhbHVlOiBhbnkpID0+IHZvaWQpIHtcbiAgICB0aGlzLl9vbkNoYW5nZUNhbGxiYWNrID0gZm47XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KSB7XG4gICAgdGhpcy5fb25Ub3VjaGVkQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIGZvY3VzSGFuZGxlcigpOiB2b2lkIHtcbiAgICB0aGlzLl9vblRvdWNoZWRDYWxsYmFjaygpO1xuICB9XG59XG4iXX0=