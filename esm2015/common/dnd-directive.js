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
import { Directive, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
export class AjfDndDirective {
    constructor() {
        this._file = new EventEmitter();
        this.file = this._file.asObservable();
        this._over = false;
    }
    get over() {
        return this._over;
    }
    onDragOver(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this._over = true;
    }
    onDragLeave(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this._over = false;
    }
    onDrop(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        if (evt.dataTransfer == null || evt.dataTransfer.files.length === 0) {
            return;
        }
        let files = evt.dataTransfer.files;
        if (files.length > 0) {
            this._over = false;
            this._file.emit(files);
        }
    }
}
AjfDndDirective.decorators = [
    { type: Directive, args: [{
                selector: '[ajfDnd]',
                host: {
                    '[class.ajf-dnd-over]': 'over',
                    '(dragover)': 'onDragOver($event)',
                    '(dragleave)': 'onDragLeave($event)',
                    '(drop)': 'onDrop($event)',
                }
            },] }
];
AjfDndDirective.propDecorators = {
    file: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG5kLWRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2NvbW1vbi9kbmQtZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFBQyxTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBV2hDLE1BQU0sT0FBTyxlQUFlO0lBVDVCO1FBVVUsVUFBSyxHQUEyQixJQUFJLFlBQVksRUFBWSxDQUFDO1FBQzNELFNBQUksR0FBeUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUV6RCxVQUFLLEdBQVksS0FBSyxDQUFDO0lBNkJqQyxDQUFDO0lBNUJDLElBQUksSUFBSTtRQUNOLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztJQUNwQixDQUFDO0lBRUQsVUFBVSxDQUFDLEdBQWM7UUFDdkIsR0FBRyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3JCLEdBQUcsQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztJQUNwQixDQUFDO0lBRUQsV0FBVyxDQUFDLEdBQWM7UUFDeEIsR0FBRyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3JCLEdBQUcsQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUNyQixDQUFDO0lBRUQsTUFBTSxDQUFDLEdBQWM7UUFDbkIsR0FBRyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3JCLEdBQUcsQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN0QixJQUFJLEdBQUcsQ0FBQyxZQUFZLElBQUksSUFBSSxJQUFJLEdBQUcsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDbkUsT0FBTztTQUNSO1FBQ0QsSUFBSSxLQUFLLEdBQWEsR0FBRyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUM7UUFDN0MsSUFBSSxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUNwQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUNuQixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUN4QjtJQUNILENBQUM7OztZQXpDRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLFVBQVU7Z0JBQ3BCLElBQUksRUFBRTtvQkFDSixzQkFBc0IsRUFBRSxNQUFNO29CQUM5QixZQUFZLEVBQUUsb0JBQW9CO29CQUNsQyxhQUFhLEVBQUUscUJBQXFCO29CQUNwQyxRQUFRLEVBQUUsZ0JBQWdCO2lCQUMzQjthQUNGOzs7bUJBR0UsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtEaXJlY3RpdmUsIEV2ZW50RW1pdHRlciwgT3V0cHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSAncnhqcyc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1thamZEbmRdJyxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MuYWpmLWRuZC1vdmVyXSc6ICdvdmVyJyxcbiAgICAnKGRyYWdvdmVyKSc6ICdvbkRyYWdPdmVyKCRldmVudCknLFxuICAgICcoZHJhZ2xlYXZlKSc6ICdvbkRyYWdMZWF2ZSgkZXZlbnQpJyxcbiAgICAnKGRyb3ApJzogJ29uRHJvcCgkZXZlbnQpJyxcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBBamZEbmREaXJlY3RpdmUge1xuICBwcml2YXRlIF9maWxlOiBFdmVudEVtaXR0ZXI8RmlsZUxpc3Q+ID0gbmV3IEV2ZW50RW1pdHRlcjxGaWxlTGlzdD4oKTtcbiAgQE91dHB1dCgpIGZpbGU6IE9ic2VydmFibGU8RmlsZUxpc3Q+ID0gdGhpcy5fZmlsZS5hc09ic2VydmFibGUoKTtcblxuICBwcml2YXRlIF9vdmVyOiBib29sZWFuID0gZmFsc2U7XG4gIGdldCBvdmVyKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9vdmVyO1xuICB9XG5cbiAgb25EcmFnT3ZlcihldnQ6IERyYWdFdmVudCk6IHZvaWQge1xuICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2dC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB0aGlzLl9vdmVyID0gdHJ1ZTtcbiAgfVxuXG4gIG9uRHJhZ0xlYXZlKGV2dDogRHJhZ0V2ZW50KTogdm9pZCB7XG4gICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIHRoaXMuX292ZXIgPSBmYWxzZTtcbiAgfVxuXG4gIG9uRHJvcChldnQ6IERyYWdFdmVudCk6IHZvaWQge1xuICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2dC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBpZiAoZXZ0LmRhdGFUcmFuc2ZlciA9PSBudWxsIHx8IGV2dC5kYXRhVHJhbnNmZXIuZmlsZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGxldCBmaWxlczogRmlsZUxpc3QgPSBldnQuZGF0YVRyYW5zZmVyLmZpbGVzO1xuICAgIGlmIChmaWxlcy5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLl9vdmVyID0gZmFsc2U7XG4gICAgICB0aGlzLl9maWxlLmVtaXQoZmlsZXMpO1xuICAgIH1cbiAgfVxufVxuIl19