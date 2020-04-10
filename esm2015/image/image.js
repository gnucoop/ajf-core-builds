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
        this._url.next(imageUrl.startsWith('data:image/svg+xml;base64,') ?
            this._domSanitizer.bypassSecurityTrustResourceUrl(imageUrl) :
            imageUrl);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9pbWFnZS9pbWFnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCQSxPQUFPLEVBQ0wsU0FBUyxFQUNULFVBQVUsRUFDVixLQUFLLEVBR0wsU0FBUyxFQUNULG1CQUFtQixFQUNwQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsWUFBWSxFQUFrQixNQUFNLDJCQUEyQixDQUFDO0FBQ3hFLE9BQU8sRUFBQyxlQUFlLEVBQWMsWUFBWSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBRy9ELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxjQUFjLENBQUM7Ozs7QUFHMUMsTUFBTSxPQUFnQixRQUFROzs7Ozs7SUFpRDVCLFlBQ1ksR0FBZSxFQUFVLFNBQW9CLEVBQVUsYUFBMkI7UUFBbEYsUUFBRyxHQUFILEdBQUcsQ0FBWTtRQUFVLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFBVSxrQkFBYSxHQUFiLGFBQWEsQ0FBYztRQWpCckYsZUFBVSxHQUFHLFlBQVksQ0FBQztRQUUzQixlQUFVLEdBQUcsSUFBSSxlQUFlLENBQW9CLElBQUksQ0FBQyxDQUFDO1FBQ3pELGNBQVMsR0FBa0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUUzRSxTQUFJLEdBQUcsSUFBSSxlQUFlLENBQThCLElBQUksQ0FBQyxDQUFDO1FBQzdELFFBQUcsR0FBNEMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUV6RSxhQUFRLEdBQUcsSUFBSSxlQUFlLENBQW9CLElBQUksQ0FBQyxDQUFDO1FBQ3ZELFlBQU8sR0FBa0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUV2RSxjQUFTLEdBQUcsSUFBSSxlQUFlLENBQWMsSUFBSSxDQUFDLENBQUM7UUFDbEQsYUFBUSxH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c0M7Ozs7O0lBR2xDLHVCQUF1Qjs7Ozs7SUFBRSw2QkFBNEI7Ozs7O0lBQUUsaUNBQW1DIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge1xuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgUmVuZGVyZXIyLFxuICBSZW5kZXJlclN0eWxlRmxhZ3MyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtEb21TYW5pdGl6ZXIsIFNhZmVSZXNvdXJjZVVybH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQge0JlaGF2aW9yU3ViamVjdCwgT2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHtBamZJbWFnZUljb259IGZyb20gJy4vaW1hZ2UtaWNvbic7XG5pbXBvcnQge0FqZkltYWdlVHlwZX0gZnJvbSAnLi9pbWFnZS10eXBlJztcblxuQERpcmVjdGl2ZSgpXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQWpmSW1hZ2UgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIE9uSW5pdCB7XG4gIGljb25Db21wb25lbnQ6IEVsZW1lbnRSZWY7XG5cbiAgLyoqXG4gICAqIGlmIDAgdGFrZSBpbWFnZSBieSB1cmxcbiAgICogaWYgMSB0YWtlIGltYWdlIGJ5IGljb25cbiAgICogaWYgMiB0YWtlIGltYWdlIGJ5IGNsYXNzXG4gICAqXG4gICAqL1xuICBASW5wdXQoKVxuICBzZXQgdHlwZSh0eXBlOiBBamZJbWFnZVR5cGV8bnVsbCkge1xuICAgIHRoaXMuX2ltYWdlVHlwZS5uZXh0KHR5cGUpO1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IGltYWdlVXJsKGltYWdlVXJsOiBzdHJpbmd8bnVsbCkge1xuICAgIGltYWdlVXJsID0gdHlwZW9mIGltYWdlVXJsID09PSAnc3RyaW5nJyA/IGltYWdlVXJsIDogJyc7XG4gICAgdGhpcy5fdXJsLm5leHQoXG4gICAgICAgIGltYWdlVXJsLnN0YXJ0c1dpdGgoJ2RhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsJykgP1xuICAgICAgICAgICAgdGhpcy5fZG9tU2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RSZXNvdXJjZVVybChpbWFnZVVybCkgOlxuICAgICAgICAgICAgaW1hZ2VVcmwpO1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IGljb24oaWNvbjogQWpmSW1hZ2VJY29ufG51bGwpIHtcbiAgICB0aGlzLl9pY29uT2JqLm5leHQoaWNvbik7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgZmxhZyhmbGFnOiBzdHJpbmd8bnVsbCkge1xuICAgIHRoaXMuX2ZsYWdOYW1lLm5leHQoZmxhZyk7XG4gIH1cblxuICByZWFkb25seSBpbWFnZVR5cGVzID0gQWpmSW1hZ2VUeXBlO1xuXG4gIHByaXZhdGUgX2ltYWdlVHlwZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8QWpmSW1hZ2VUeXBlfG51bGw+KG51bGwpO1xuICByZWFkb25seSBpbWFnZVR5cGU6IE9ic2VydmFibGU8QWpmSW1hZ2VUeXBlfG51bGw+ID0gdGhpcy5faW1hZ2VUeXBlLmFzT2JzZXJ2YWJsZSgpO1xuXG4gIHByaXZhdGUgX3VybCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nfFNhZmVSZXNvdXJjZVVybHxudWxsPihudWxsKTtcbiAgcmVhZG9ubHkgdXJsOiBPYnNlcnZhYmxlPHN0cmluZ3xTYWZlUmVzb3VyY2VVcmx8bnVsbD4gPSB0aGlzLl91cmwuYXNPYnNlcnZhYmxlKCk7XG5cbiAgcHJpdmF0ZSBfaWNvbk9iaiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8QWpmSW1hZ2VJY29ufG51bGw+KG51bGwpO1xuICByZWFkb25seSBpY29uT2JqOiBPYnNlcnZhYmxlPEFqZkltYWdlSWNvbnxudWxsPiA9IHRoaXMuX2ljb25PYmouYXNPYnNlcnZhYmxlKCk7XG5cbiAgcHJpdmF0ZSBfZmxhZ05hbWUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZ3xudWxsPihudWxsKTtcbiAgcmVhZG9ubHkgZmxhZ05hbWU6IE9ic2VydmFibGU8c3RyaW5nfG51bGw+ID0gdGhpcy5fZmxhZ05hbWUuYXNPYnNlcnZhYmxlKCk7XG5cbiAgcHJpdmF0ZSBfaWNvblN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgX2VsOiBFbGVtZW50UmVmLCBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyLCBwcml2YXRlIF9kb21TYW5pdGl6ZXI6IERvbVNhbml0aXplcikge1xuICAgIHRoaXMuX2ljb25TdWIgPSB0aGlzLmljb25PYmouc3Vic2NyaWJlKCgpID0+IHRoaXMuX3VwZGF0ZUljb25TaXplKCkpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2ljb25TdWIgJiYgIXRoaXMuX2ljb25TdWIuY2xvc2VkKSB7XG4gICAgICB0aGlzLl9pY29uU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fdXBkYXRlSWNvblNpemUoKTtcbiAgfVxuXG4gIHByaXZhdGUgX3VwZGF0ZUljb25TaXplKCk6IHZvaWQge1xuICAgIGNvbnN0IGljb24gPSB0aGlzLl9pY29uT2JqLmdldFZhbHVlKCk7XG4gICAgaWYgKGljb24gPT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBzdHlsZXMgPSB0aGlzLl9lbC5uYXRpdmVFbGVtZW50LnN0eWxlO1xuICAgIGlmICh0aGlzLmljb25Db21wb25lbnQgPT0gbnVsbCB8fCBzdHlsZXMgPT0gbnVsbCB8fCBzdHlsZXMuZm9udFNpemUgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBmb250U2l6ZTogc3RyaW5nID0gc3R5bGVzLmZvbnRTaXplO1xuICAgIGlmIChmb250U2l6ZS5tYXRjaCgvXlswLTldK3B4JC8pICE9IG51bGwpIHtcbiAgICAgIGNvbnN0IGVsID0gdGhpcy5pY29uQ29tcG9uZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZShlbCwgJ3dpZHRoJywgZm9udFNpemUsIFJlbmRlcmVyU3R5bGVGbGFnczIuSW1wb3J0YW50KTtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKGVsLCAnaGVpZ2h0JywgZm9udFNpemUsIFJlbmRlcmVyU3R5bGVGbGFnczIuSW1wb3J0YW50KTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==