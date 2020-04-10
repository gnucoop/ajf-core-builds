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
var AjfDndDirective = /** @class */ (function () {
    function AjfDndDirective() {
        this.file = new EventEmitter();
        this.background = '#eee';
    }
    AjfDndDirective.prototype.onDragOver = function (evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this.background = '#999';
    };
    AjfDndDirective.prototype.onDragLeave = function (evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this.background = '#eee';
    };
    AjfDndDirective.prototype.onDrop = function (evt) {
        evt.preventDefault();
        evt.stopPropagation();
        var files = evt.dataTransfer.files;
        if (files.length > 0) {
            this.background = '#eee';
            this.file.emit(files);
        }
    };
    AjfDndDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[ajfDnd]',
                    host: {
                        '[style.background]': 'background',
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
}());
export { AjfDndDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG5kLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2NvbW1vbi9kbmQuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFBQyxTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUU5RDtJQUFBO1FBVVksU0FBSSxHQUFzQixJQUFJLFlBQVksRUFBTyxDQUFDO1FBRTVELGVBQVUsR0FBRyxNQUFNLENBQUM7SUF1QnRCLENBQUM7SUFyQkMsb0NBQVUsR0FBVixVQUFXLEdBQVU7UUFDbkIsR0FBRyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3JCLEdBQUcsQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQztJQUMzQixDQUFDO0lBRUQscUNBQVcsR0FBWCxVQUFZLEdBQVU7UUFDcEIsR0FBRyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3JCLEdBQUcsQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQztJQUMzQixDQUFDO0lBRUQsZ0NBQU0sR0FBTixVQUFPLEdBQVE7UUFDYixHQUFHLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDckIsR0FBRyxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3RCLElBQUksS0FBSyxHQUFhLEdBQUcsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDO1FBQzdDLElBQUksS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDcEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUM7WUFDekIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDdkI7SUFDSCxDQUFDOztnQkFsQ0YsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxVQUFVO29CQUNwQixJQUFJLEVBQUU7d0JBQ0osb0JBQW9CLEVBQUUsWUFBWTt3QkFDbEMsWUFBWSxFQUFFLG9CQUFvQjt3QkFDbEMsYUFBYSxFQUFFLHFCQUFxQjt3QkFDcEMsUUFBUSxFQUFFLGdCQUFnQjtxQkFDM0I7aUJBQ0Y7Ozt1QkFFRSxNQUFNOztJQXlCVCxzQkFBQztDQUFBLEFBbkNELElBbUNDO1NBMUJZLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7RGlyZWN0aXZlLCBFdmVudEVtaXR0ZXIsIE91dHB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1thamZEbmRdJyxcbiAgaG9zdDoge1xuICAgICdbc3R5bGUuYmFja2dyb3VuZF0nOiAnYmFja2dyb3VuZCcsXG4gICAgJyhkcmFnb3ZlciknOiAnb25EcmFnT3ZlcigkZXZlbnQpJyxcbiAgICAnKGRyYWdsZWF2ZSknOiAnb25EcmFnTGVhdmUoJGV2ZW50KScsXG4gICAgJyhkcm9wKSc6ICdvbkRyb3AoJGV2ZW50KScsXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgQWpmRG5kRGlyZWN0aXZlIHtcbiAgQE91dHB1dCgpIGZpbGU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgYmFja2dyb3VuZCA9ICcjZWVlJztcblxuICBvbkRyYWdPdmVyKGV2dDogRXZlbnQpIHtcbiAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgdGhpcy5iYWNrZ3JvdW5kID0gJyM5OTknO1xuICB9XG5cbiAgb25EcmFnTGVhdmUoZXZ0OiBFdmVudCkge1xuICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2dC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB0aGlzLmJhY2tncm91bmQgPSAnI2VlZSc7XG4gIH1cblxuICBvbkRyb3AoZXZ0OiBhbnkpIHtcbiAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgbGV0IGZpbGVzOiBGaWxlTGlzdCA9IGV2dC5kYXRhVHJhbnNmZXIuZmlsZXM7XG4gICAgaWYgKGZpbGVzLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuYmFja2dyb3VuZCA9ICcjZWVlJztcbiAgICAgIHRoaXMuZmlsZS5lbWl0KGZpbGVzKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==