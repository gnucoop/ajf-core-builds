/**
 * @fileoverview added by tsickle
 * Generated from: src/core/image/image.ts
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
import { Directive, ElementRef, Input, Renderer2, RendererStyleFlags2 } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AjfImageType } from './image-type';
/**
 * @abstract
 */
export class AjfImage {
    /**
     * @param {?} _el
     * @param {?} _renderer
     * @param {?} _domSanitizer
     */
    constructor(_el, _renderer, _domSanitizer) {
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
        this._iconSub = this.iconObj.subscribe((/**
         * @return {?}
         */
        () => this._updateIconSize()));
    }
    /**
     * if 0 take image by url
     * if 1 take image by icon
     * if 2 take image by class
     *
     * @param {?} type
     * @return {?}
     */
    set type(type) {
        this._imageType.next(type);
    }
    /**
     * @param {?} imageUrl
     * @return {?}
     */
    set imageUrl(imageUrl) {
        imageUrl = typeof imageUrl === 'string' ? imageUrl : '';
        this._url.next(imageUrl.startsWith('data:image/svg+xml;base64,')
            ? this._domSanitizer.bypassSecurityTrustResourceUrl(imageUrl)
            : imageUrl);
    }
    /**
     * @param {?} icon
     * @return {?}
     */
    set icon(icon) {
        this._iconObj.next(icon);
    }
    /**
     * @param {?} flag
     * @return {?}
     */
    set flag(flag) {
        this._flagName.next(flag);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this._iconSub && !this._iconSub.closed) {
            this._iconSub.unsubscribe();
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._updateIconSize();
    }
    /**
     * @private
     * @return {?}
     */
    _updateIconSize() {
        /** @type {?} */
        const icon = this._iconObj.getValue();
        if (icon == null) {
            return;
        }
        /** @type {?} */
        const styles = this._el.nativeElement.style;
        if (this.iconComponent == null || styles == null || styles.fontSize == null) {
            return;
        }
        /** @type {?} */
        const fontSize = styles.fontSize;
        if (fontSize.match(/^[0-9]+px$/) != null) {
            /** @type {?} */
            const el = this.iconComponent.nativeElement;
            this._renderer.setStyle(el, 'width', fontSize, RendererStyleFlags2.Important);
            this._renderer.setStyle(el, 'height', fontSize, RendererStyleFlags2.Important);
        }
    }
}
AjfImage.decorators = [
    { type: Directive }
];
/** @nocollapse */
AjfImage.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: DomSanitizer }
];
AjfImage.propDecorators = {
    type: [{ type: Input }],
    imageUrl: [{ type: Input }],
    icon: [{ type: Input }],
    flag: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    AjfImage.prototype.iconComponent;
    /** @type {?} */
    AjfImage.prototype.imageTypes;
    /**
     * @type {?}
     * @private
     */
    AjfImage.prototype._imageType;
    /** @type {?} */
    AjfImage.prototype.imageType;
    /**
     * @type {?}
     * @private
     */
    AjfImage.prototype._url;
    /** @type {?} */
    AjfImage.prototype.url;
    /**
     * @type {?}
     * @private
     */
    AjfImage.prototype._iconObj;
    /** @type {?} */
    AjfImage.prototype.iconObj;
    /**
     * @type {?}
     * @private
     */
    AjfImage.prototype._flagName;
    /** @type {?} */
    AjfImage.prototype.flagName;
    /**
     * @type {?}
     * @private
     */
    AjfImage.prototype._iconSub;
    /**
     * @type {?}
     * @private
     */
    AjfImage.prototype._el;
    /**
     * @type {?}
     * @private
     */
    AjfImage.prototype._renderer;
    /**
     * @type {?}
     * @private
     */
    AjfImage.prototype._domSanitizer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9pbWFnZS9pbWFnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQXFCLFNBQVMsRUFDaEUsbUJBQW1CLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDNUMsT0FBTyxFQUFDLFlBQVksRUFBa0IsTUFBTSwyQkFBMkIsQ0FBQztBQUN4RSxPQUFPLEVBQWEsZUFBZSxFQUFFLFlBQVksRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUcvRCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sY0FBYyxDQUFDOzs7O0FBRzFDLE1BQU0sT0FBZ0IsUUFBUTs7Ozs7O0lBOEM1QixZQUNZLEdBQWUsRUFBVSxTQUFvQixFQUFVLGFBQTJCO1FBQWxGLFFBQUcsR0FBSCxHQUFHLENBQVk7UUFBVSxjQUFTLEdBQVQsU0FBUyxDQUFXO1FBQVUsa0JBQWEsR0FBYixhQUFhLENBQWM7UUFqQnJGLGVBQVUsR0FBRyxZQUFZLENBQUM7UUFFM0IsZUFBVSxHQUFHLElBQUksZUFBZSxDQUFzQixJQUFJLENBQUMsQ0FBQztRQUMzRCxjQUFTLEdBQW9DLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxFQUFFLENBQUM7UUFFN0UsU0FBSSxHQUFHLElBQUksZUFBZSxDQUFrQyxJQUFJLENBQUMsQ0FBQztRQUNqRSxRQUFHLEdBQWdELElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFFN0UsYUFBUSxHQUFHLElBQUksZUFBZSxDQUFzQixJQUFJLENBQUMsQ0FBQztRQUN6RCxZQUFPLEdBQW9DLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLENBQUM7UUFFekUsY0FBUyxHQUFHLElBQUksZUFBZSxDQUFnQixJQUFJLENBQUMsQ0FBQztRQUNwRCxhQUFR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QkFBc0M7Ozs7O0lBR2xDLHVCQUF1Qjs7Ozs7SUFBRSw2QkFBNEI7Ozs7O0lBQUUsaUNBQW1DIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0RpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0LCBSZW5kZXJlcjIsXG4gIFJlbmRlcmVyU3R5bGVGbGFnczJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtEb21TYW5pdGl6ZXIsIFNhZmVSZXNvdXJjZVVybH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQge09ic2VydmFibGUsIEJlaGF2aW9yU3ViamVjdCwgU3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHtBamZJbWFnZUljb259IGZyb20gJy4vaW1hZ2UtaWNvbic7XG5pbXBvcnQge0FqZkltYWdlVHlwZX0gZnJvbSAnLi9pbWFnZS10eXBlJztcblxuQERpcmVjdGl2ZSgpXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQWpmSW1hZ2UgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIE9uSW5pdCB7XG4gIGljb25Db21wb25lbnQ6IEVsZW1lbnRSZWY7XG5cbiAgLyoqXG4gICAqIGlmIDAgdGFrZSBpbWFnZSBieSB1cmxcbiAgICogaWYgMSB0YWtlIGltYWdlIGJ5IGljb25cbiAgICogaWYgMiB0YWtlIGltYWdlIGJ5IGNsYXNzXG4gICAqXG4gICAqL1xuICBASW5wdXQoKSBzZXQgdHlwZSh0eXBlOiBBamZJbWFnZVR5cGV8bnVsbCkge1xuICAgIHRoaXMuX2ltYWdlVHlwZS5uZXh0KHR5cGUpO1xuICB9XG5cbiAgQElucHV0KCkgc2V0IGltYWdlVXJsKGltYWdlVXJsOiBzdHJpbmd8bnVsbCkge1xuICAgIGltYWdlVXJsID0gdHlwZW9mIGltYWdlVXJsID09PSAnc3RyaW5nJyA/IGltYWdlVXJsIDogJyc7XG4gICAgdGhpcy5fdXJsLm5leHQoXG4gICAgICBpbWFnZVVybC5zdGFydHNXaXRoKCdkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LCcpXG4gICAgICA/IHRoaXMuX2RvbVNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0UmVzb3VyY2VVcmwoaW1hZ2VVcmwpXG4gICAgICA6IGltYWdlVXJsXG4gICAgKTtcbiAgfVxuXG4gIEBJbnB1dCgpIHNldCBpY29uKGljb246IEFqZkltYWdlSWNvbnxudWxsKSB7XG4gICAgdGhpcy5faWNvbk9iai5uZXh0KGljb24pO1xuICB9XG5cbiAgQElucHV0KCkgc2V0IGZsYWcoZmxhZzogc3RyaW5nfG51bGwpIHtcbiAgICB0aGlzLl9mbGFnTmFtZS5uZXh0KGZsYWcpO1xuICB9XG5cbiAgcmVhZG9ubHkgaW1hZ2VUeXBlcyA9IEFqZkltYWdlVHlwZTtcblxuICBwcml2YXRlIF9pbWFnZVR5cGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PEFqZkltYWdlVHlwZSB8IG51bGw+KG51bGwpO1xuICByZWFkb25seSBpbWFnZVR5cGU6IE9ic2VydmFibGU8QWpmSW1hZ2VUeXBlIHwgbnVsbD4gPSB0aGlzLl9pbWFnZVR5cGUuYXNPYnNlcnZhYmxlKCk7XG5cbiAgcHJpdmF0ZSBfdXJsID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmcgfCBTYWZlUmVzb3VyY2VVcmwgfCBudWxsPihudWxsKTtcbiAgcmVhZG9ubHkgdXJsOiBPYnNlcnZhYmxlPHN0cmluZyB8IFNhZmVSZXNvdXJjZVVybCB8IG51bGw+ID0gdGhpcy5fdXJsLmFzT2JzZXJ2YWJsZSgpO1xuXG4gIHByaXZhdGUgX2ljb25PYmogPSBuZXcgQmVoYXZpb3JTdWJqZWN0PEFqZkltYWdlSWNvbiB8IG51bGw+KG51bGwpO1xuICByZWFkb25seSBpY29uT2JqOiBPYnNlcnZhYmxlPEFqZkltYWdlSWNvbiB8IG51bGw+ID0gdGhpcy5faWNvbk9iai5hc09ic2VydmFibGUoKTtcblxuICBwcml2YXRlIF9mbGFnTmFtZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nIHwgbnVsbD4obnVsbCk7XG4gIHJlYWRvbmx5IGZsYWdOYW1lOiBPYnNlcnZhYmxlPHN0cmluZyB8IG51bGw+ID0gdGhpcy5fZmxhZ05hbWUuYXNPYnNlcnZhYmxlKCk7XG5cbiAgcHJpdmF0ZSBfaWNvblN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgX2VsOiBFbGVtZW50UmVmLCBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyLCBwcml2YXRlIF9kb21TYW5pdGl6ZXI6IERvbVNhbml0aXplcikge1xuICAgIHRoaXMuX2ljb25TdWIgPSB0aGlzLmljb25PYmouc3Vic2NyaWJlKCgpID0+IHRoaXMuX3VwZGF0ZUljb25TaXplKCkpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2ljb25TdWIgJiYgIXRoaXMuX2ljb25TdWIuY2xvc2VkKSB7XG4gICAgICB0aGlzLl9pY29uU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fdXBkYXRlSWNvblNpemUoKTtcbiAgfVxuXG4gIHByaXZhdGUgX3VwZGF0ZUljb25TaXplKCk6IHZvaWQge1xuICAgIGNvbnN0IGljb24gPSB0aGlzLl9pY29uT2JqLmdldFZhbHVlKCk7XG4gICAgaWYgKGljb24gPT0gbnVsbCkgeyByZXR1cm47IH1cbiAgICBjb25zdCBzdHlsZXMgPSB0aGlzLl9lbC5uYXRpdmVFbGVtZW50LnN0eWxlO1xuICAgIGlmICh0aGlzLmljb25Db21wb25lbnQgPT0gbnVsbCB8fCBzdHlsZXMgPT0gbnVsbCB8fCBzdHlsZXMuZm9udFNpemUgPT0gbnVsbCkgeyByZXR1cm47IH1cbiAgICBjb25zdCBmb250U2l6ZTogc3RyaW5nID0gc3R5bGVzLmZvbnRTaXplO1xuICAgIGlmIChmb250U2l6ZS5tYXRjaCgvXlswLTldK3B4JC8pICE9IG51bGwpIHtcbiAgICAgIGNvbnN0IGVsID0gdGhpcy5pY29uQ29tcG9uZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZShlbCwgJ3dpZHRoJywgZm9udFNpemUsIFJlbmRlcmVyU3R5bGVGbGFnczIuSW1wb3J0YW50KTtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKGVsLCAnaGVpZ2h0JywgZm9udFNpemUsIFJlbmRlcmVyU3R5bGVGbGFnczIuSW1wb3J0YW50KTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==