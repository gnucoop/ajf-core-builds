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
let AjfDndDirective = /** @class */ (() => {
    class AjfDndDirective {
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
    return AjfDndDirective;
})();
export { AjfDndDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG5kLWRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2NvbW1vbi9kbmQtZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFBQyxTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBRWhDO0lBQUEsTUFTYSxlQUFlO1FBVDVCO1lBVVUsVUFBSyxHQUEyQixJQUFJLFlBQVksRUFBWSxDQUFDO1lBQzNELFNBQUksR0FBeUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUV6RCxVQUFLLEdBQVksS0FBSyxDQUFDO1FBNkJqQyxDQUFDO1FBNUJDLElBQUksSUFBSTtZQUNOLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztRQUNwQixDQUFDO1FBRUQsVUFBVSxDQUFDLEdBQWM7WUFDdkIsR0FBRyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3JCLEdBQUcsQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUN0QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUNwQixDQUFDO1FBRUQsV0FBVyxDQUFDLEdBQWM7WUFDeEIsR0FBRyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3JCLEdBQUcsQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUN0QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNyQixDQUFDO1FBRUQsTUFBTSxDQUFDLEdBQWM7WUFDbkIsR0FBRyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3JCLEdBQUcsQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUN0QixJQUFJLEdBQUcsQ0FBQyxZQUFZLElBQUksSUFBSSxJQUFJLEdBQUcsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7Z0JBQ25FLE9BQU87YUFDUjtZQUNELElBQUksS0FBSyxHQUFhLEdBQUcsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDO1lBQzdDLElBQUksS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQ3BCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO2dCQUNuQixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUN4QjtRQUNILENBQUM7OztnQkF6Q0YsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxVQUFVO29CQUNwQixJQUFJLEVBQUU7d0JBQ0osc0JBQXNCLEVBQUUsTUFBTTt3QkFDOUIsWUFBWSxFQUFFLG9CQUFvQjt3QkFDbEMsYUFBYSxFQUFFLHFCQUFxQjt3QkFDcEMsUUFBUSxFQUFFLGdCQUFnQjtxQkFDM0I7aUJBQ0Y7Ozt1QkFHRSxNQUFNOztJQStCVCxzQkFBQztLQUFBO1NBakNZLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7RGlyZWN0aXZlLCBFdmVudEVtaXR0ZXIsIE91dHB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gJ3J4anMnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbYWpmRG5kXScsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmFqZi1kbmQtb3Zlcl0nOiAnb3ZlcicsXG4gICAgJyhkcmFnb3ZlciknOiAnb25EcmFnT3ZlcigkZXZlbnQpJyxcbiAgICAnKGRyYWdsZWF2ZSknOiAnb25EcmFnTGVhdmUoJGV2ZW50KScsXG4gICAgJyhkcm9wKSc6ICdvbkRyb3AoJGV2ZW50KScsXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgQWpmRG5kRGlyZWN0aXZlIHtcbiAgcHJpdmF0ZSBfZmlsZTogRXZlbnRFbWl0dGVyPEZpbGVMaXN0PiA9IG5ldyBFdmVudEVtaXR0ZXI8RmlsZUxpc3Q+KCk7XG4gIEBPdXRwdXQoKSBmaWxlOiBPYnNlcnZhYmxlPEZpbGVMaXN0PiA9IHRoaXMuX2ZpbGUuYXNPYnNlcnZhYmxlKCk7XG5cbiAgcHJpdmF0ZSBfb3ZlcjogYm9vbGVhbiA9IGZhbHNlO1xuICBnZXQgb3ZlcigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fb3ZlcjtcbiAgfVxuXG4gIG9uRHJhZ092ZXIoZXZ0OiBEcmFnRXZlbnQpOiB2b2lkIHtcbiAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgdGhpcy5fb3ZlciA9IHRydWU7XG4gIH1cblxuICBvbkRyYWdMZWF2ZShldnQ6IERyYWdFdmVudCk6IHZvaWQge1xuICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2dC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB0aGlzLl9vdmVyID0gZmFsc2U7XG4gIH1cblxuICBvbkRyb3AoZXZ0OiBEcmFnRXZlbnQpOiB2b2lkIHtcbiAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgaWYgKGV2dC5kYXRhVHJhbnNmZXIgPT0gbnVsbCB8fCBldnQuZGF0YVRyYW5zZmVyLmZpbGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsZXQgZmlsZXM6IEZpbGVMaXN0ID0gZXZ0LmRhdGFUcmFuc2Zlci5maWxlcztcbiAgICBpZiAoZmlsZXMubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5fb3ZlciA9IGZhbHNlO1xuICAgICAgdGhpcy5fZmlsZS5lbWl0KGZpbGVzKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==