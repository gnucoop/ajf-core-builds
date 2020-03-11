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
import { Input, Directive, ElementRef, Renderer2 } from '@angular/core';
var ApplyStylesDirective = /** @class */ (function () {
    function ApplyStylesDirective(_el, _renderer) {
        this._el = _el;
        this._renderer = _renderer;
    }
    Object.defineProperty(ApplyStylesDirective.prototype, "applyStyles", {
        set: function (cssStyles) {
            if (cssStyles != null && this._cssStyles !== cssStyles) {
                this._cssStyles = cssStyles;
                this._updateStyles();
            }
        },
        enumerable: true,
        configurable: true
    });
    ApplyStylesDirective.prototype._updateStyles = function () {
        var _this = this;
        if (this._cssStyles == null) {
            return;
        }
        Object.keys(this._cssStyles).forEach(function (style) {
            try {
                _this._renderer.setStyle(_this._el.nativeElement, style, "" + _this._cssStyles[style]);
            }
            catch (e) { }
        });
    };
    ApplyStylesDirective.decorators = [
        { type: Directive, args: [{ selector: '[applyStyles]' },] }
    ];
    /** @nocollapse */
    ApplyStylesDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    ApplyStylesDirective.propDecorators = {
        applyStyles: [{ type: Input }]
    };
    return ApplyStylesDirective;
}());
export { ApplyStylesDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbHktc3R5bGVzLWRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2NvbW1vbi9hcHBseS1zdHlsZXMtZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFBQyxLQUFLLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFHdEU7SUFXRSw4QkFBb0IsR0FBZSxFQUFVLFNBQW9CO1FBQTdDLFFBQUcsR0FBSCxHQUFHLENBQVk7UUFBVSxjQUFTLEdBQVQsU0FBUyxDQUFXO0lBQUksQ0FBQztJQVJ0RSxzQkFDSSw2Q0FBVzthQURmLFVBQ2dCLFNBQXlDO1lBQ3ZELElBQUksU0FBUyxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsVUFBVSxLQUFLLFNBQVMsRUFBRTtnQkFDdEQsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7Z0JBQzVCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQzthQUN0QjtRQUNILENBQUM7OztPQUFBO0lBSU8sNENBQWEsR0FBckI7UUFBQSxpQkFjQztRQWJDLElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLEVBQUU7WUFDM0IsT0FBTztTQUNSO1FBRUQsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUMsS0FBYTtZQUNqRCxJQUFJO2dCQUNGLEtBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUNyQixLQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFDdEIsS0FBSyxFQUNMLEtBQUcsS0FBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUcsQ0FDNUIsQ0FBQzthQUNIO1lBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRztRQUNqQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7O2dCQTNCRixTQUFTLFNBQUMsRUFBRSxRQUFRLEVBQUUsZUFBZSxFQUFFOzs7O2dCQUhkLFVBQVU7Z0JBQUUsU0FBUzs7OzhCQU01QyxLQUFLOztJQXlCUiwyQkFBQztDQUFBLEFBNUJELElBNEJDO1NBM0JZLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtJbnB1dCwgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBSZW5kZXJlcjJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1thcHBseVN0eWxlc10nIH0pXG5leHBvcnQgY2xhc3MgQXBwbHlTdHlsZXNEaXJlY3RpdmUge1xuICBwcml2YXRlIF9jc3NTdHlsZXM6IHsgW3N0eWxlOiBzdHJpbmddOiBhbnk7IH07XG4gIEBJbnB1dCgpXG4gIHNldCBhcHBseVN0eWxlcyhjc3NTdHlsZXM6IHsgW3N0eWxlOiBzdHJpbmddOiBhbnk7IH18bnVsbCkge1xuICAgIGlmIChjc3NTdHlsZXMgIT0gbnVsbCAmJiB0aGlzLl9jc3NTdHlsZXMgIT09IGNzc1N0eWxlcykge1xuICAgICAgdGhpcy5fY3NzU3R5bGVzID0gY3NzU3R5bGVzO1xuICAgICAgdGhpcy5fdXBkYXRlU3R5bGVzKCk7XG4gICAgfVxuICB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfZWw6IEVsZW1lbnRSZWYsIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIpIHsgfVxuXG4gIHByaXZhdGUgX3VwZGF0ZVN0eWxlcygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fY3NzU3R5bGVzID09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBPYmplY3Qua2V5cyh0aGlzLl9jc3NTdHlsZXMpLmZvckVhY2goKHN0eWxlOiBzdHJpbmcpID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKFxuICAgICAgICAgIHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQsXG4gICAgICAgICAgc3R5bGUsXG4gICAgICAgICAgYCR7dGhpcy5fY3NzU3R5bGVzW3N0eWxlXX1gXG4gICAgICAgICk7XG4gICAgICB9IGNhdGNoIChlKSB7IH1cbiAgICB9KTtcbiAgfVxufVxuIl19