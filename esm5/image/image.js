/**
 * @license
 * Copyright (C) 2018 Gnucoop soc. coop.
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9pbWFnZS9pbWFnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQXFCLFNBQVMsRUFDaEUsbUJBQW1CLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDNUMsT0FBTyxFQUFDLFlBQVksRUFBa0IsTUFBTSwyQkFBMkIsQ0FBQztBQUN4RSxPQUFPLEVBQWEsZUFBZSxFQUFFLFlBQVksRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUcvRCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sY0FBYyxDQUFDO0FBRTFDO0lBK0NFLGtCQUNZLEdBQWUsRUFBVSxTQUFvQixFQUFVLGFBQTJCO1FBRDlGLGlCQUdDO1FBRlcsUUFBRyxHQUFILEdBQUcsQ0FBWTtRQUFVLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFBVSxrQkFBYSxHQUFiLGFBQWEsQ0FBYztRQWpCckYsZUFBVSxHQUFHLFlBQVksQ0FBQztRQUUzQixlQUFVLEdBQUcsSUFBSSxlQUFlLENBQXNCLElBQUksQ0FBQyxDQUFDO1FBQzNELGNBQVMsR0FBb0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUU3RSxTQUFJLEdBQUcsSUFBSSxlQUFlLENBQWtDLElBQUksQ0FBQyxDQUFDO1FBQ2pFLFFBQUcsR0FBZ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUU3RSxhQUFRLEdBQUcsSUFBSSxlQUFlLENBQXNCLElBQUksQ0FBQyxDQUFDO1FBQ3pELFlBQU8sR0FBb0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUV6RSxjQUFTLEdBQUcsSUFBSSxlQUFlLENBQWdCLElBQUksQ0FBQyxDQUFDO1FBQ3BELGFB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bnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSAyMDE4IEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7RGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQsIFJlbmRlcmVyMixcbiAgUmVuZGVyZXJTdHlsZUZsYWdzMn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0RvbVNhbml0aXplciwgU2FmZVJlc291cmNlVXJsfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7T2JzZXJ2YWJsZSwgQmVoYXZpb3JTdWJqZWN0LCBTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQge0FqZkltYWdlSWNvbn0gZnJvbSAnLi9pbWFnZS1pY29uJztcbmltcG9ydCB7QWpmSW1hZ2VUeXBlfSBmcm9tICcuL2ltYWdlLXR5cGUnO1xuXG5ARGlyZWN0aXZlKClcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBamZJbWFnZSBpbXBsZW1lbnRzIE9uRGVzdHJveSwgT25Jbml0IHtcbiAgaWNvbkNvbXBvbmVudDogRWxlbWVudFJlZjtcblxuICAvKipcbiAgICogaWYgMCB0YWtlIGltYWdlIGJ5IHVybFxuICAgKiBpZiAxIHRha2UgaW1hZ2UgYnkgaWNvblxuICAgKiBpZiAyIHRha2UgaW1hZ2UgYnkgY2xhc3NcbiAgICpcbiAgICovXG4gIEBJbnB1dCgpIHNldCB0eXBlKHR5cGU6IEFqZkltYWdlVHlwZXxudWxsKSB7XG4gICAgdGhpcy5faW1hZ2VUeXBlLm5leHQodHlwZSk7XG4gIH1cblxuICBASW5wdXQoKSBzZXQgaW1hZ2VVcmwoaW1hZ2VVcmw6IHN0cmluZ3xudWxsKSB7XG4gICAgaW1hZ2VVcmwgPSB0eXBlb2YgaW1hZ2VVcmwgPT09ICdzdHJpbmcnID8gaW1hZ2VVcmwgOiAnJztcbiAgICB0aGlzLl91cmwubmV4dChcbiAgICAgIGltYWdlVXJsLnN0YXJ0c1dpdGgoJ2RhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsJylcbiAgICAgID8gdGhpcy5fZG9tU2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RSZXNvdXJjZVVybChpbWFnZVVybClcbiAgICAgIDogaW1hZ2VVcmxcbiAgICApO1xuICB9XG5cbiAgQElucHV0KCkgc2V0IGljb24oaWNvbjogQWpmSW1hZ2VJY29ufG51bGwpIHtcbiAgICB0aGlzLl9pY29uT2JqLm5leHQoaWNvbik7XG4gIH1cblxuICBASW5wdXQoKSBzZXQgZmxhZyhmbGFnOiBzdHJpbmd8bnVsbCkge1xuICAgIHRoaXMuX2ZsYWdOYW1lLm5leHQoZmxhZyk7XG4gIH1cblxuICByZWFkb25seSBpbWFnZVR5cGVzID0gQWpmSW1hZ2VUeXBlO1xuXG4gIHByaXZhdGUgX2ltYWdlVHlwZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8QWpmSW1hZ2VUeXBlIHwgbnVsbD4obnVsbCk7XG4gIHJlYWRvbmx5IGltYWdlVHlwZTogT2JzZXJ2YWJsZTxBamZJbWFnZVR5cGUgfCBudWxsPiA9IHRoaXMuX2ltYWdlVHlwZS5hc09ic2VydmFibGUoKTtcblxuICBwcml2YXRlIF91cmwgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZyB8IFNhZmVSZXNvdXJjZVVybCB8IG51bGw+KG51bGwpO1xuICByZWFkb25seSB1cmw6IE9ic2VydmFibGU8c3RyaW5nIHwgU2FmZVJlc291cmNlVXJsIHwgbnVsbD4gPSB0aGlzLl91cmwuYXNPYnNlcnZhYmxlKCk7XG5cbiAgcHJpdmF0ZSBfaWNvbk9iaiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8QWpmSW1hZ2VJY29uIHwgbnVsbD4obnVsbCk7XG4gIHJlYWRvbmx5IGljb25PYmo6IE9ic2VydmFibGU8QWpmSW1hZ2VJY29uIHwgbnVsbD4gPSB0aGlzLl9pY29uT2JqLmFzT2JzZXJ2YWJsZSgpO1xuXG4gIHByaXZhdGUgX2ZsYWdOYW1lID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmcgfCBudWxsPihudWxsKTtcbiAgcmVhZG9ubHkgZmxhZ05hbWU6IE9ic2VydmFibGU8c3RyaW5nIHwgbnVsbD4gPSB0aGlzLl9mbGFnTmFtZS5hc09ic2VydmFibGUoKTtcblxuICBwcml2YXRlIF9pY29uU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSBfZWw6IEVsZW1lbnRSZWYsIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIsIHByaXZhdGUgX2RvbVNhbml0aXplcjogRG9tU2FuaXRpemVyKSB7XG4gICAgdGhpcy5faWNvblN1YiA9IHRoaXMuaWNvbk9iai5zdWJzY3JpYmUoKCkgPT4gdGhpcy5fdXBkYXRlSWNvblNpemUoKSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5faWNvblN1YiAmJiAhdGhpcy5faWNvblN1Yi5jbG9zZWQpIHtcbiAgICAgIHRoaXMuX2ljb25TdWIudW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLl91cGRhdGVJY29uU2l6ZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlSWNvblNpemUoKTogdm9pZCB7XG4gICAgY29uc3QgaWNvbiA9IHRoaXMuX2ljb25PYmouZ2V0VmFsdWUoKTtcbiAgICBpZiAoaWNvbiA9PSBudWxsKSB7IHJldHVybjsgfVxuICAgIGNvbnN0IHN0eWxlcyA9IHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQuc3R5bGU7XG4gICAgaWYgKHRoaXMuaWNvbkNvbXBvbmVudCA9PSBudWxsIHx8IHN0eWxlcyA9PSBudWxsIHx8IHN0eWxlcy5mb250U2l6ZSA9PSBudWxsKSB7IHJldHVybjsgfVxuICAgIGNvbnN0IGZvbnRTaXplOiBzdHJpbmcgPSBzdHlsZXMuZm9udFNpemU7XG4gICAgaWYgKGZvbnRTaXplLm1hdGNoKC9eWzAtOV0rcHgkLykgIT0gbnVsbCkge1xuICAgICAgY29uc3QgZWwgPSB0aGlzLmljb25Db21wb25lbnQubmF0aXZlRWxlbWVudDtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKGVsLCAnd2lkdGgnLCBmb250U2l6ZSwgUmVuZGVyZXJTdHlsZUZsYWdzMi5JbXBvcnRhbnQpO1xuICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUoZWwsICdoZWlnaHQnLCBmb250U2l6ZSwgUmVuZGVyZXJTdHlsZUZsYWdzMi5JbXBvcnRhbnQpO1xuICAgIH1cbiAgfVxufVxuIl19