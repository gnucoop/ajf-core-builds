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
import { Directive, ElementRef, Input, Renderer2, RendererStyleFlags2 } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AjfImageType } from './image-type';
var AjfImage = /** @class */ (function () {
    function AjfImage(_el, _renderer, _domSanitizer) {
        var _this = this;
        this._el = _el;
        this._renderer = _renderer;
        this._domSanitizer = _domSanitizer;
        this.imageTypes = AjfImageType;
        this._imageType = new BehaviorSubject(null);
        this.imageType = this._imageType.asObservable();
        this._url = new BehaviorSubject(null);
        this.url = this._url.asObservable();
        this._iconObj = new BehaviorSubject(null);
        this.iconObj = this._iconObj.asObservable();
        this._flagName = new BehaviorSubject(null);
        this.flagName = this._flagName.asObservable();
        this._iconSub = Subscription.EMPTY;
        this._iconSub = this.iconObj.subscribe(function () { return _this._updateIconSize(); });
    }
    Object.defineProperty(AjfImage.prototype, "type", {
        /**
         * if 0 take image by url
         * if 1 take image by icon
         * if 2 take image by class
         *
         */
        set: function (type) {
            this._imageType.next(type);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfImage.prototype, "imageUrl", {
        set: function (imageUrl) {
            imageUrl = typeof imageUrl === 'string' ? imageUrl : '';
            this._url.next(imageUrl.startsWith('data:image/svg+xml;base64,')
                ? this._domSanitizer.bypassSecurityTrustResourceUrl(imageUrl)
                : imageUrl);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfImage.prototype, "icon", {
        set: function (icon) {
            this._iconObj.next(icon);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfImage.prototype, "flag", {
        set: function (flag) {
            this._flagName.next(flag);
        },
        enumerable: true,
        configurable: true
    });
    AjfImage.prototype.ngOnDestroy = function () {
        if (this._iconSub && !this._iconSub.closed) {
            this._iconSub.unsubscribe();
        }
    };
    AjfImage.prototype.ngOnInit = function () {
        this._updateIconSize();
    };
    AjfImage.prototype._updateIconSize = function () {
        var icon = this._iconObj.getValue();
        if (icon == null) {
            return;
        }
        var styles = this._el.nativeElement.style;
        if (this.iconComponent == null || styles == null || styles.fontSize == null) {
            return;
        }
        var fontSize = styles.fontSize;
        if (fontSize.match(/^[0-9]+px$/) != null) {
            var el = this.iconComponent.nativeElement;
            this._renderer.setStyle(el, 'width', fontSize, RendererStyleFlags2.Important);
            this._renderer.setStyle(el, 'height', fontSize, RendererStyleFlags2.Important);
        }
    };
    AjfImage.decorators = [
        { type: Directive }
    ];
    /** @nocollapse */
    AjfImage.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: DomSanitizer }
    ]; };
    AjfImage.propDecorators = {
        type: [{ type: Input }],
        imageUrl: [{ type: Input }],
        icon: [{ type: Input }],
        flag: [{ type: Input }]
    };
    return AjfImage;
}());
export { AjfImage };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9pbWFnZS9pbWFnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQXFCLFNBQVMsRUFDaEUsbUJBQW1CLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDNUMsT0FBTyxFQUFDLFlBQVksRUFBa0IsTUFBTSwyQkFBMkIsQ0FBQztBQUN4RSxPQUFPLEVBQWEsZUFBZSxFQUFFLFlBQVksRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUcvRCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sY0FBYyxDQUFDO0FBRTFDO0lBK0NFLGtCQUNZLEdBQWUsRUFBVSxTQUFvQixFQUFVLGFBQTJCO1FBRDlGLGlCQUdDO1FBRlcsUUFBRyxHQUFILEdBQUcsQ0FBWTtRQUFVLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFBVSxrQkFBYSxHQUFiLGFBQWEsQ0FBYztRQWpCckYsZUFBVSxHQUFHLFlBQVksQ0FBQztRQUUzQixlQUFVLEdBQUcsSUFBSSxlQUFlLENBQXNCLElBQUksQ0FBQyxDQUFDO1FBQzNELGNBQVMsR0FBb0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUU3RSxTQUFJLEdBQUcsSUFBSSxlQUFlLENBQWtDLElBQUksQ0FBQyxDQUFDO1FBQ2pFLFFBQUcsR0FBZ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUU3RSxhQUFRLEdBQUcsSUFBSSxlQUFlLENBQXNCLElBQUksQ0FBQyxDQUFDO1FBQ3pELFlBQU8sR0FBb0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUV6RSxjQUFTLEdBQUcsSUFBSSxlQUFlLENBQWdCLElBQUksQ0FBQyxDQUFDO1FBQ3BELGFB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bnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0RpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0LCBSZW5kZXJlcjIsXG4gIFJlbmRlcmVyU3R5bGVGbGFnczJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtEb21TYW5pdGl6ZXIsIFNhZmVSZXNvdXJjZVVybH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQge09ic2VydmFibGUsIEJlaGF2aW9yU3ViamVjdCwgU3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHtBamZJbWFnZUljb259IGZyb20gJy4vaW1hZ2UtaWNvbic7XG5pbXBvcnQge0FqZkltYWdlVHlwZX0gZnJvbSAnLi9pbWFnZS10eXBlJztcblxuQERpcmVjdGl2ZSgpXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQWpmSW1hZ2UgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIE9uSW5pdCB7XG4gIGljb25Db21wb25lbnQ6IEVsZW1lbnRSZWY7XG5cbiAgLyoqXG4gICAqIGlmIDAgdGFrZSBpbWFnZSBieSB1cmxcbiAgICogaWYgMSB0YWtlIGltYWdlIGJ5IGljb25cbiAgICogaWYgMiB0YWtlIGltYWdlIGJ5IGNsYXNzXG4gICAqXG4gICAqL1xuICBASW5wdXQoKSBzZXQgdHlwZSh0eXBlOiBBamZJbWFnZVR5cGV8bnVsbCkge1xuICAgIHRoaXMuX2ltYWdlVHlwZS5uZXh0KHR5cGUpO1xuICB9XG5cbiAgQElucHV0KCkgc2V0IGltYWdlVXJsKGltYWdlVXJsOiBzdHJpbmd8bnVsbCkge1xuICAgIGltYWdlVXJsID0gdHlwZW9mIGltYWdlVXJsID09PSAnc3RyaW5nJyA/IGltYWdlVXJsIDogJyc7XG4gICAgdGhpcy5fdXJsLm5leHQoXG4gICAgICBpbWFnZVVybC5zdGFydHNXaXRoKCdkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LCcpXG4gICAgICA/IHRoaXMuX2RvbVNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0UmVzb3VyY2VVcmwoaW1hZ2VVcmwpXG4gICAgICA6IGltYWdlVXJsXG4gICAgKTtcbiAgfVxuXG4gIEBJbnB1dCgpIHNldCBpY29uKGljb246IEFqZkltYWdlSWNvbnxudWxsKSB7XG4gICAgdGhpcy5faWNvbk9iai5uZXh0KGljb24pO1xuICB9XG5cbiAgQElucHV0KCkgc2V0IGZsYWcoZmxhZzogc3RyaW5nfG51bGwpIHtcbiAgICB0aGlzLl9mbGFnTmFtZS5uZXh0KGZsYWcpO1xuICB9XG5cbiAgcmVhZG9ubHkgaW1hZ2VUeXBlcyA9IEFqZkltYWdlVHlwZTtcblxuICBwcml2YXRlIF9pbWFnZVR5cGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PEFqZkltYWdlVHlwZSB8IG51bGw+KG51bGwpO1xuICByZWFkb25seSBpbWFnZVR5cGU6IE9ic2VydmFibGU8QWpmSW1hZ2VUeXBlIHwgbnVsbD4gPSB0aGlzLl9pbWFnZVR5cGUuYXNPYnNlcnZhYmxlKCk7XG5cbiAgcHJpdmF0ZSBfdXJsID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmcgfCBTYWZlUmVzb3VyY2VVcmwgfCBudWxsPihudWxsKTtcbiAgcmVhZG9ubHkgdXJsOiBPYnNlcnZhYmxlPHN0cmluZyB8IFNhZmVSZXNvdXJjZVVybCB8IG51bGw+ID0gdGhpcy5fdXJsLmFzT2JzZXJ2YWJsZSgpO1xuXG4gIHByaXZhdGUgX2ljb25PYmogPSBuZXcgQmVoYXZpb3JTdWJqZWN0PEFqZkltYWdlSWNvbiB8IG51bGw+KG51bGwpO1xuICByZWFkb25seSBpY29uT2JqOiBPYnNlcnZhYmxlPEFqZkltYWdlSWNvbiB8IG51bGw+ID0gdGhpcy5faWNvbk9iai5hc09ic2VydmFibGUoKTtcblxuICBwcml2YXRlIF9mbGFnTmFtZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nIHwgbnVsbD4obnVsbCk7XG4gIHJlYWRvbmx5IGZsYWdOYW1lOiBPYnNlcnZhYmxlPHN0cmluZyB8IG51bGw+ID0gdGhpcy5fZmxhZ05hbWUuYXNPYnNlcnZhYmxlKCk7XG5cbiAgcHJpdmF0ZSBfaWNvblN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgX2VsOiBFbGVtZW50UmVmLCBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyLCBwcml2YXRlIF9kb21TYW5pdGl6ZXI6IERvbVNhbml0aXplcikge1xuICAgIHRoaXMuX2ljb25TdWIgPSB0aGlzLmljb25PYmouc3Vic2NyaWJlKCgpID0+IHRoaXMuX3VwZGF0ZUljb25TaXplKCkpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2ljb25TdWIgJiYgIXRoaXMuX2ljb25TdWIuY2xvc2VkKSB7XG4gICAgICB0aGlzLl9pY29uU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fdXBkYXRlSWNvblNpemUoKTtcbiAgfVxuXG4gIHByaXZhdGUgX3VwZGF0ZUljb25TaXplKCk6IHZvaWQge1xuICAgIGNvbnN0IGljb24gPSB0aGlzLl9pY29uT2JqLmdldFZhbHVlKCk7XG4gICAgaWYgKGljb24gPT0gbnVsbCkgeyByZXR1cm47IH1cbiAgICBjb25zdCBzdHlsZXMgPSB0aGlzLl9lbC5uYXRpdmVFbGVtZW50LnN0eWxlO1xuICAgIGlmICh0aGlzLmljb25Db21wb25lbnQgPT0gbnVsbCB8fCBzdHlsZXMgPT0gbnVsbCB8fCBzdHlsZXMuZm9udFNpemUgPT0gbnVsbCkgeyByZXR1cm47IH1cbiAgICBjb25zdCBmb250U2l6ZTogc3RyaW5nID0gc3R5bGVzLmZvbnRTaXplO1xuICAgIGlmIChmb250U2l6ZS5tYXRjaCgvXlswLTldK3B4JC8pICE9IG51bGwpIHtcbiAgICAgIGNvbnN0IGVsID0gdGhpcy5pY29uQ29tcG9uZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZShlbCwgJ3dpZHRoJywgZm9udFNpemUsIFJlbmRlcmVyU3R5bGVGbGFnczIuSW1wb3J0YW50KTtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKGVsLCAnaGVpZ2h0JywgZm9udFNpemUsIFJlbmRlcmVyU3R5bGVGbGFnczIuSW1wb3J0YW50KTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==