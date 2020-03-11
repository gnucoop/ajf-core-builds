/**
 * @fileoverview added by tsickle
 * Generated from: src/core/time/time-model.ts
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
import { EventEmitter } from '@angular/core';
export class AjfTimeModel {
    constructor() {
        this._changed = new EventEmitter();
        this.changed = this._changed.asObservable();
        this._hours = 0;
        this._minutes = 0;
    }
    /**
     * @return {?}
     */
    get minutes() {
        return this._minutes;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set minutes(value) {
        if (value > -1 && value < 61) {
            this._minutes = value;
            this._changed.emit(this.toString());
        }
    }
    /**
     * @return {?}
     */
    get hours() {
        return this._hours;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set hours(value) {
        if (value > -1 && value < 24) {
            this._hours = value;
            this._changed.emit(this.toString());
        }
    }
    /**
     * @return {?}
     */
    toString() {
        /** @type {?} */
        let minutes = this.minutes.toString().length > 1 && this.minutes || `0${this.minutes}`;
        /** @type {?} */
        let hours = this.hours.toString().length > 1 && this.hours || `0${this.hours}`;
        return `${hours}:${minutes}`;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    fromString(value) {
        try {
            /** @type {?} */
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
if (false) {
    /**
     * @type {?}
     * @private
     */
    AjfTimeModel.prototype._changed;
    /** @type {?} */
    AjfTimeModel.prototype.changed;
    /**
     * @type {?}
     * @private
     */
    AjfTimeModel.prototype._hours;
    /**
     * @type {?}
     * @private
     */
    AjfTimeModel.prototype._minutes;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL3RpbWUvdGltZS1tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCQSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRzNDLE1BQU0sT0FBTyxZQUFZO0lBQXpCO1FBQ1UsYUFBUSxHQUF5QixJQUFJLFlBQVksRUFBVSxDQUFDO1FBQzNELFlBQU8sR0FBdUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUU1RCxXQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ1gsYUFBUSxHQUFHLENBQUMsQ0FBQztJQXVDdkIsQ0FBQzs7OztJQXJDQyxJQUFJLE9BQU87UUFDVCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQzs7Ozs7SUFDRCxJQUFJLE9BQU8sQ0FBQyxLQUFhO1FBQ3ZCLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxJQUFJLEtBQUssR0FBRyxFQUFFLEVBQUU7WUFDNUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7WUFDdEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7U0FDckM7SUFDSCxDQUFDOzs7O0lBRUQsSUFBSSxLQUFLO1FBQ1AsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7Ozs7O0lBQ0QsSUFBSSxLQUFLLENBQUMsS0FBYTtRQUNyQixJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsSUFBSSxLQUFLLEdBQUcsRUFBRSxFQUFFO1lBQzVCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1NBQ3JDO0lBQ0gsQ0FBQzs7OztJQUVELFFBQVE7O1lBQ0YsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTs7WUFDbEYsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtRQUM5RSxPQUFPLEdBQUcsS0FBSyxJQUFJLE9BQU8sRUFBRSxDQUFDO0lBQy9CLENBQUM7Ozs7O0lBRUQsVUFBVSxDQUFDLEtBQWE7UUFDdEIsSUFBSTs7Z0JBQ0UsUUFBUSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO1lBQy9CLElBQUksUUFBUSxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7Z0JBQ3hCLElBQUksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNuQyxJQUFJLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUN0QztTQUNGO1FBQUMsT0FBTyxDQUFDLEVBQUU7U0FFWDtJQUNILENBQUM7Q0FDRjs7Ozs7O0lBM0NDLGdDQUFvRTs7SUFDcEUsK0JBQW9FOzs7OztJQUVwRSw4QkFBbUI7Ozs7O0lBQ25CLGdDQUFxQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtFdmVudEVtaXR0ZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tICdyeGpzJztcblxuZXhwb3J0IGNsYXNzIEFqZlRpbWVNb2RlbCB7XG4gIHByaXZhdGUgX2NoYW5nZWQ6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG4gIHJlYWRvbmx5IGNoYW5nZWQ6IE9ic2VydmFibGU8c3RyaW5nPiA9IHRoaXMuX2NoYW5nZWQuYXNPYnNlcnZhYmxlKCk7XG5cbiAgcHJpdmF0ZSBfaG91cnMgPSAwO1xuICBwcml2YXRlIF9taW51dGVzID0gMDtcblxuICBnZXQgbWludXRlcygpIHtcbiAgICByZXR1cm4gdGhpcy5fbWludXRlcztcbiAgfVxuICBzZXQgbWludXRlcyh2YWx1ZTogbnVtYmVyKSB7XG4gICAgaWYgKHZhbHVlID4gLTEgJiYgdmFsdWUgPCA2MSkge1xuICAgICAgdGhpcy5fbWludXRlcyA9IHZhbHVlO1xuICAgICAgdGhpcy5fY2hhbmdlZC5lbWl0KHRoaXMudG9TdHJpbmcoKSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGhvdXJzKCkge1xuICAgIHJldHVybiB0aGlzLl9ob3VycztcbiAgfVxuICBzZXQgaG91cnModmFsdWU6IG51bWJlcikge1xuICAgIGlmICh2YWx1ZSA+IC0xICYmIHZhbHVlIDwgMjQpIHtcbiAgICAgIHRoaXMuX2hvdXJzID0gdmFsdWU7XG4gICAgICB0aGlzLl9jaGFuZ2VkLmVtaXQodGhpcy50b1N0cmluZygpKTtcbiAgICB9XG4gIH1cblxuICB0b1N0cmluZygpIHtcbiAgICBsZXQgbWludXRlcyA9IHRoaXMubWludXRlcy50b1N0cmluZygpLmxlbmd0aCA+IDEgJiYgdGhpcy5taW51dGVzIHx8IGAwJHt0aGlzLm1pbnV0ZXN9YDtcbiAgICBsZXQgaG91cnMgPSB0aGlzLmhvdXJzLnRvU3RyaW5nKCkubGVuZ3RoID4gMSAmJiB0aGlzLmhvdXJzIHx8IGAwJHt0aGlzLmhvdXJzfWA7XG4gICAgcmV0dXJuIGAke2hvdXJzfToke21pbnV0ZXN9YDtcbiAgfVxuXG4gIGZyb21TdHJpbmcodmFsdWU6IHN0cmluZykge1xuICAgIHRyeSB7XG4gICAgICBsZXQgc3BsaXR0ZWQgPSB2YWx1ZS5zcGxpdCgnOicpO1xuICAgICAgaWYgKHNwbGl0dGVkLmxlbmd0aCA9PSAyKSB7XG4gICAgICAgIHRoaXMuaG91cnMgPSBwYXJzZUludChzcGxpdHRlZFswXSk7XG4gICAgICAgIHRoaXMubWludXRlcyA9IHBhcnNlSW50KHNwbGl0dGVkWzFdKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG5cbiAgICB9XG4gIH1cbn1cbiJdfQ==