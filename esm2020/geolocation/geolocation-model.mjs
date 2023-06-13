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
export class AjfGeolocationModel {
    constructor() {
        this._changed = new EventEmitter();
        this.changed = this._changed;
        this._latitude = '';
        this._longitude = '';
    }
    get longitude() {
        return this._longitude;
    }
    set longitude(value) {
        if (value) {
            this._longitude = value.toString().replace(',', '.');
            this._changed.emit(this.toString());
        }
    }
    get latitude() {
        return this._latitude;
    }
    set latitude(value) {
        if (value) {
            this._latitude = value.toString().replace(',', '.');
            this._changed.emit(this.toString());
        }
    }
    toString() {
        return `${this.latitude},${this.longitude}`;
    }
    fromString(value) {
        try {
            let splitted = value.toString().split(',');
            if (splitted.length == 2) {
                this.latitude = splitted[0];
                this.longitude = splitted[1];
            }
        }
        catch (e) { }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VvbG9jYXRpb24tbW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL2dlb2xvY2F0aW9uL3NyYy9nZW9sb2NhdGlvbi1tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRzNDLE1BQU0sT0FBTyxtQkFBbUI7SUFBaEM7UUFDVSxhQUFRLEdBQXlCLElBQUksWUFBWSxFQUFVLENBQUM7UUFDM0QsWUFBTyxHQUF1QixJQUFJLENBQUMsUUFBOEIsQ0FBQztRQUVuRSxjQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ2YsZUFBVSxHQUFHLEVBQUUsQ0FBQztJQW1DMUIsQ0FBQztJQWpDQyxJQUFJLFNBQVM7UUFDWCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDekIsQ0FBQztJQUNELElBQUksU0FBUyxDQUFDLEtBQWE7UUFDekIsSUFBSSxLQUFLLEVBQUU7WUFDVCxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ3JELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1NBQ3JDO0lBQ0gsQ0FBQztJQUVELElBQUksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDO0lBQ0QsSUFBSSxRQUFRLENBQUMsS0FBYTtRQUN4QixJQUFJLEtBQUssRUFBRTtZQUNULElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDcEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7U0FDckM7SUFDSCxDQUFDO0lBRUQsUUFBUTtRQUNOLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUM5QyxDQUFDO0lBRUQsVUFBVSxDQUFDLEtBQWE7UUFDdEIsSUFBSTtZQUNGLElBQUksUUFBUSxHQUFHLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDM0MsSUFBSSxRQUFRLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtnQkFDeEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzVCLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQzlCO1NBQ0Y7UUFBQyxPQUFPLENBQUMsRUFBRSxHQUFFO0lBQ2hCLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtFdmVudEVtaXR0ZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tICdyeGpzJztcblxuZXhwb3J0IGNsYXNzIEFqZkdlb2xvY2F0aW9uTW9kZWwge1xuICBwcml2YXRlIF9jaGFuZ2VkOiBFdmVudEVtaXR0ZXI8c3RyaW5nPiA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuICByZWFkb25seSBjaGFuZ2VkOiBPYnNlcnZhYmxlPHN0cmluZz4gPSB0aGlzLl9jaGFuZ2VkIGFzIE9ic2VydmFibGU8c3RyaW5nPjtcblxuICBwcml2YXRlIF9sYXRpdHVkZSA9ICcnO1xuICBwcml2YXRlIF9sb25naXR1ZGUgPSAnJztcblxuICBnZXQgbG9uZ2l0dWRlKCkge1xuICAgIHJldHVybiB0aGlzLl9sb25naXR1ZGU7XG4gIH1cbiAgc2V0IGxvbmdpdHVkZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICB0aGlzLl9sb25naXR1ZGUgPSB2YWx1ZS50b1N0cmluZygpLnJlcGxhY2UoJywnLCAnLicpO1xuICAgICAgdGhpcy5fY2hhbmdlZC5lbWl0KHRoaXMudG9TdHJpbmcoKSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGxhdGl0dWRlKCkge1xuICAgIHJldHVybiB0aGlzLl9sYXRpdHVkZTtcbiAgfVxuICBzZXQgbGF0aXR1ZGUodmFsdWU6IHN0cmluZykge1xuICAgIGlmICh2YWx1ZSkge1xuICAgICAgdGhpcy5fbGF0aXR1ZGUgPSB2YWx1ZS50b1N0cmluZygpLnJlcGxhY2UoJywnLCAnLicpO1xuICAgICAgdGhpcy5fY2hhbmdlZC5lbWl0KHRoaXMudG9TdHJpbmcoKSk7XG4gICAgfVxuICB9XG5cbiAgdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIGAke3RoaXMubGF0aXR1ZGV9LCR7dGhpcy5sb25naXR1ZGV9YDtcbiAgfVxuXG4gIGZyb21TdHJpbmcodmFsdWU6IHN0cmluZykge1xuICAgIHRyeSB7XG4gICAgICBsZXQgc3BsaXR0ZWQgPSB2YWx1ZS50b1N0cmluZygpLnNwbGl0KCcsJyk7XG4gICAgICBpZiAoc3BsaXR0ZWQubGVuZ3RoID09IDIpIHtcbiAgICAgICAgdGhpcy5sYXRpdHVkZSA9IHNwbGl0dGVkWzBdO1xuICAgICAgICB0aGlzLmxvbmdpdHVkZSA9IHNwbGl0dGVkWzFdO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHt9XG4gIH1cbn1cbiJdfQ==