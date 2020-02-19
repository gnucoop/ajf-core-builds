/**
 * @fileoverview added by tsickle
 * Generated from: src/core/image/image.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9pbWFnZS9pbWFnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQXFCLFNBQVMsRUFDaEUsbUJBQW1CLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDNUMsT0FBTyxFQUFDLFlBQVksRUFBa0IsTUFBTSwyQkFBMkIsQ0FBQztBQUN4RSxPQUFPLEVBQWEsZUFBZSxFQUFFLFlBQVksRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUcvRCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sY0FBYyxDQUFDOzs7O0FBRzFDLE1BQU0sT0FBZ0IsUUFBUTs7Ozs7O0lBOEM1QixZQUNZLEdBQWUsRUFBVSxTQUFvQixFQUFVLGFBQTJCO1FBQWxGLFFBQUcsR0FBSCxHQUFHLENBQVk7UUFBVSxjQUFTLEdBQVQsU0FBUyxDQUFXO1FBQVUsa0JBQWEsR0FBYixhQUFhLENBQWM7UUFqQnJGLGVBQVUsR0FBRyxZQUFZLENBQUM7UUFFM0IsZUFBVSxHQUFHLElBQUksZUFBZSxDQUFzQixJQUFJLENBQUMsQ0FBQztRQUMzRCxjQUFTLEdBQW9DLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxFQUFFLENBQUM7UUFFN0UsU0FBSSxHQUFHLElBQUksZUFBZSxDQUFrQyxJQUFJLENBQUMsQ0FBQztRQUNqRSxRQUFHLEdBQWdELElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFFN0UsYUFBUSxHQUFHLElBQUksZUFBZSxDQUFzQixJQUFJLENBQUMsQ0FBQztRQUN6RCxZQUFPLEdBQW9DLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLENBQUM7UUFFekUsY0FBUyxHQUFHLElBQUksZUFBZSxDQUFnQixJQUFJLENBQUMsQ0FBQztRQUNwRCxhQUFR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QkFBc0M7Ozs7O0lBR2xDLHVCQUF1Qjs7Ozs7SUFBRSw2QkFBNEI7Ozs7O0lBQUUsaUNBQW1DIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSAyMDE4IEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7RGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQsIFJlbmRlcmVyMixcbiAgUmVuZGVyZXJTdHlsZUZsYWdzMn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0RvbVNhbml0aXplciwgU2FmZVJlc291cmNlVXJsfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7T2JzZXJ2YWJsZSwgQmVoYXZpb3JTdWJqZWN0LCBTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQge0FqZkltYWdlSWNvbn0gZnJvbSAnLi9pbWFnZS1pY29uJztcbmltcG9ydCB7QWpmSW1hZ2VUeXBlfSBmcm9tICcuL2ltYWdlLXR5cGUnO1xuXG5ARGlyZWN0aXZlKClcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBamZJbWFnZSBpbXBsZW1lbnRzIE9uRGVzdHJveSwgT25Jbml0IHtcbiAgaWNvbkNvbXBvbmVudDogRWxlbWVudFJlZjtcblxuICAvKipcbiAgICogaWYgMCB0YWtlIGltYWdlIGJ5IHVybFxuICAgKiBpZiAxIHRha2UgaW1hZ2UgYnkgaWNvblxuICAgKiBpZiAyIHRha2UgaW1hZ2UgYnkgY2xhc3NcbiAgICpcbiAgICovXG4gIEBJbnB1dCgpIHNldCB0eXBlKHR5cGU6IEFqZkltYWdlVHlwZXxudWxsKSB7XG4gICAgdGhpcy5faW1hZ2VUeXBlLm5leHQodHlwZSk7XG4gIH1cblxuICBASW5wdXQoKSBzZXQgaW1hZ2VVcmwoaW1hZ2VVcmw6IHN0cmluZ3xudWxsKSB7XG4gICAgaW1hZ2VVcmwgPSB0eXBlb2YgaW1hZ2VVcmwgPT09ICdzdHJpbmcnID8gaW1hZ2VVcmwgOiAnJztcbiAgICB0aGlzLl91cmwubmV4dChcbiAgICAgIGltYWdlVXJsLnN0YXJ0c1dpdGgoJ2RhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsJylcbiAgICAgID8gdGhpcy5fZG9tU2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RSZXNvdXJjZVVybChpbWFnZVVybClcbiAgICAgIDogaW1hZ2VVcmxcbiAgICApO1xuICB9XG5cbiAgQElucHV0KCkgc2V0IGljb24oaWNvbjogQWpmSW1hZ2VJY29ufG51bGwpIHtcbiAgICB0aGlzLl9pY29uT2JqLm5leHQoaWNvbik7XG4gIH1cblxuICBASW5wdXQoKSBzZXQgZmxhZyhmbGFnOiBzdHJpbmd8bnVsbCkge1xuICAgIHRoaXMuX2ZsYWdOYW1lLm5leHQoZmxhZyk7XG4gIH1cblxuICByZWFkb25seSBpbWFnZVR5cGVzID0gQWpmSW1hZ2VUeXBlO1xuXG4gIHByaXZhdGUgX2ltYWdlVHlwZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8QWpmSW1hZ2VUeXBlIHwgbnVsbD4obnVsbCk7XG4gIHJlYWRvbmx5IGltYWdlVHlwZTogT2JzZXJ2YWJsZTxBamZJbWFnZVR5cGUgfCBudWxsPiA9IHRoaXMuX2ltYWdlVHlwZS5hc09ic2VydmFibGUoKTtcblxuICBwcml2YXRlIF91cmwgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZyB8IFNhZmVSZXNvdXJjZVVybCB8IG51bGw+KG51bGwpO1xuICByZWFkb25seSB1cmw6IE9ic2VydmFibGU8c3RyaW5nIHwgU2FmZVJlc291cmNlVXJsIHwgbnVsbD4gPSB0aGlzLl91cmwuYXNPYnNlcnZhYmxlKCk7XG5cbiAgcHJpdmF0ZSBfaWNvbk9iaiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8QWpmSW1hZ2VJY29uIHwgbnVsbD4obnVsbCk7XG4gIHJlYWRvbmx5IGljb25PYmo6IE9ic2VydmFibGU8QWpmSW1hZ2VJY29uIHwgbnVsbD4gPSB0aGlzLl9pY29uT2JqLmFzT2JzZXJ2YWJsZSgpO1xuXG4gIHByaXZhdGUgX2ZsYWdOYW1lID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmcgfCBudWxsPihudWxsKTtcbiAgcmVhZG9ubHkgZmxhZ05hbWU6IE9ic2VydmFibGU8c3RyaW5nIHwgbnVsbD4gPSB0aGlzLl9mbGFnTmFtZS5hc09ic2VydmFibGUoKTtcblxuICBwcml2YXRlIF9pY29uU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSBfZWw6IEVsZW1lbnRSZWYsIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIsIHByaXZhdGUgX2RvbVNhbml0aXplcjogRG9tU2FuaXRpemVyKSB7XG4gICAgdGhpcy5faWNvblN1YiA9IHRoaXMuaWNvbk9iai5zdWJzY3JpYmUoKCkgPT4gdGhpcy5fdXBkYXRlSWNvblNpemUoKSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5faWNvblN1YiAmJiAhdGhpcy5faWNvblN1Yi5jbG9zZWQpIHtcbiAgICAgIHRoaXMuX2ljb25TdWIudW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLl91cGRhdGVJY29uU2l6ZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlSWNvblNpemUoKTogdm9pZCB7XG4gICAgY29uc3QgaWNvbiA9IHRoaXMuX2ljb25PYmouZ2V0VmFsdWUoKTtcbiAgICBpZiAoaWNvbiA9PSBudWxsKSB7IHJldHVybjsgfVxuICAgIGNvbnN0IHN0eWxlcyA9IHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQuc3R5bGU7XG4gICAgaWYgKHRoaXMuaWNvbkNvbXBvbmVudCA9PSBudWxsIHx8IHN0eWxlcyA9PSBudWxsIHx8IHN0eWxlcy5mb250U2l6ZSA9PSBudWxsKSB7IHJldHVybjsgfVxuICAgIGNvbnN0IGZvbnRTaXplOiBzdHJpbmcgPSBzdHlsZXMuZm9udFNpemU7XG4gICAgaWYgKGZvbnRTaXplLm1hdGNoKC9eWzAtOV0rcHgkLykgIT0gbnVsbCkge1xuICAgICAgY29uc3QgZWwgPSB0aGlzLmljb25Db21wb25lbnQubmF0aXZlRWxlbWVudDtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKGVsLCAnd2lkdGgnLCBmb250U2l6ZSwgUmVuZGVyZXJTdHlsZUZsYWdzMi5JbXBvcnRhbnQpO1xuICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUoZWwsICdoZWlnaHQnLCBmb250U2l6ZSwgUmVuZGVyZXJTdHlsZUZsYWdzMi5JbXBvcnRhbnQpO1xuICAgIH1cbiAgfVxufVxuIl19