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
        this.changed = this._changed;
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
        let minutes = (this.minutes.toString().length > 1 && this.minutes) || `0${this.minutes}`;
        let hours = (this.hours.toString().length > 1 && this.hours) || `0${this.hours}`;
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
        catch (e) { }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvdGltZS9zcmMvdGltZS1tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRzNDLE1BQU0sT0FBTyxZQUFZO0lBQXpCO1FBQ1UsYUFBUSxHQUF5QixJQUFJLFlBQVksRUFBVSxDQUFDO1FBQzNELFlBQU8sR0FBdUIsSUFBSSxDQUFDLFFBQThCLENBQUM7UUFFbkUsV0FBTSxHQUFHLENBQUMsQ0FBQztRQUNYLGFBQVEsR0FBRyxDQUFDLENBQUM7SUFxQ3ZCLENBQUM7SUFuQ0MsSUFBSSxPQUFPO1FBQ1QsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7SUFDRCxJQUFJLE9BQU8sQ0FBQyxLQUFhO1FBQ3ZCLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxJQUFJLEtBQUssR0FBRyxFQUFFLEVBQUU7WUFDNUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7WUFDdEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7U0FDckM7SUFDSCxDQUFDO0lBRUQsSUFBSSxLQUFLO1FBQ1AsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7SUFDRCxJQUFJLEtBQUssQ0FBQyxLQUFhO1FBQ3JCLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxJQUFJLEtBQUssR0FBRyxFQUFFLEVBQUU7WUFDNUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDcEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7U0FDckM7SUFDSCxDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUN6RixJQUFJLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDakYsT0FBTyxHQUFHLEtBQUssSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUMvQixDQUFDO0lBRUQsVUFBVSxDQUFDLEtBQWE7UUFDdEIsSUFBSTtZQUNGLElBQUksUUFBUSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDaEMsSUFBSSxRQUFRLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtnQkFDeEIsSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ25DLElBQUksQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3RDO1NBQ0Y7UUFBQyxPQUFPLENBQUMsRUFBRSxHQUFFO0lBQ2hCLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtFdmVudEVtaXR0ZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tICdyeGpzJztcblxuZXhwb3J0IGNsYXNzIEFqZlRpbWVNb2RlbCB7XG4gIHByaXZhdGUgX2NoYW5nZWQ6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG4gIHJlYWRvbmx5IGNoYW5nZWQ6IE9ic2VydmFibGU8c3RyaW5nPiA9IHRoaXMuX2NoYW5nZWQgYXMgT2JzZXJ2YWJsZTxzdHJpbmc+O1xuXG4gIHByaXZhdGUgX2hvdXJzID0gMDtcbiAgcHJpdmF0ZSBfbWludXRlcyA9IDA7XG5cbiAgZ2V0IG1pbnV0ZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX21pbnV0ZXM7XG4gIH1cbiAgc2V0IG1pbnV0ZXModmFsdWU6IG51bWJlcikge1xuICAgIGlmICh2YWx1ZSA+IC0xICYmIHZhbHVlIDwgNjEpIHtcbiAgICAgIHRoaXMuX21pbnV0ZXMgPSB2YWx1ZTtcbiAgICAgIHRoaXMuX2NoYW5nZWQuZW1pdCh0aGlzLnRvU3RyaW5nKCkpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBob3VycygpIHtcbiAgICByZXR1cm4gdGhpcy5faG91cnM7XG4gIH1cbiAgc2V0IGhvdXJzKHZhbHVlOiBudW1iZXIpIHtcbiAgICBpZiAodmFsdWUgPiAtMSAmJiB2YWx1ZSA8IDI0KSB7XG4gICAgICB0aGlzLl9ob3VycyA9IHZhbHVlO1xuICAgICAgdGhpcy5fY2hhbmdlZC5lbWl0KHRoaXMudG9TdHJpbmcoKSk7XG4gICAgfVxuICB9XG5cbiAgdG9TdHJpbmcoKSB7XG4gICAgbGV0IG1pbnV0ZXMgPSAodGhpcy5taW51dGVzLnRvU3RyaW5nKCkubGVuZ3RoID4gMSAmJiB0aGlzLm1pbnV0ZXMpIHx8IGAwJHt0aGlzLm1pbnV0ZXN9YDtcbiAgICBsZXQgaG91cnMgPSAodGhpcy5ob3Vycy50b1N0cmluZygpLmxlbmd0aCA+IDEgJiYgdGhpcy5ob3VycykgfHwgYDAke3RoaXMuaG91cnN9YDtcbiAgICByZXR1cm4gYCR7aG91cnN9OiR7bWludXRlc31gO1xuICB9XG5cbiAgZnJvbVN0cmluZyh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdHJ5IHtcbiAgICAgIGxldCBzcGxpdHRlZCA9IHZhbHVlLnNwbGl0KCc6Jyk7XG4gICAgICBpZiAoc3BsaXR0ZWQubGVuZ3RoID09IDIpIHtcbiAgICAgICAgdGhpcy5ob3VycyA9IHBhcnNlSW50KHNwbGl0dGVkWzBdKTtcbiAgICAgICAgdGhpcy5taW51dGVzID0gcGFyc2VJbnQoc3BsaXR0ZWRbMV0pO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHt9XG4gIH1cbn1cbiJdfQ==