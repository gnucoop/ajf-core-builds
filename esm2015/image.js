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
import { RendererStyleFlags2 } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/** @enum {number} */
const AjfImageType = {
    Image: 0,
    Flag: 1,
    Icon: 2,
    LENGTH: 3,
};
AjfImageType[AjfImageType.Image] = 'Image';
AjfImageType[AjfImageType.Flag] = 'Flag';
AjfImageType[AjfImageType.Icon] = 'Icon';
AjfImageType[AjfImageType.LENGTH] = 'LENGTH';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
class AjfImage {
    /**
     * @param {?} _el
     * @param {?} _renderer
     */
    constructor(_el, _renderer) {
        this._el = _el;
        this._renderer = _renderer;
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
        this._url.next(imageUrl);
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

export { AjfImage, AjfImageType };
//# sourceMappingURL=image.js.map
