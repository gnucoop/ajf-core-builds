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
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs')) :
    typeof define === 'function' && define.amd ? define('@ajf/core/image', ['exports', '@angular/core', 'rxjs'], factory) :
    (global = global || self, factory((global.ajf = global.ajf || {}, global.ajf.core = global.ajf.core || {}, global.ajf.core.image = {}), global.ng.core, global.rxjs));
}(this, function (exports, core, rxjs) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /** @enum {number} */
    var AjfImageType = {
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
    var   /**
     * @abstract
     */
    AjfImage = /** @class */ (function () {
        function AjfImage(_el, _renderer, _domSanitizer) {
            var _this = this;
            this._el = _el;
            this._renderer = _renderer;
            this._domSanitizer = _domSanitizer;
            this.imageTypes = AjfImageType;
            this._imageType = new rxjs.BehaviorSubject(null);
            this.imageType = this._imageType.asObservable();
            this._url = new rxjs.BehaviorSubject(null);
            this.url = this._url.asObservable();
            this._iconObj = new rxjs.BehaviorSubject(null);
            this.iconObj = this._iconObj.asObservable();
            this._flagName = new rxjs.BehaviorSubject(null);
            this.flagName = this._flagName.asObservable();
            this._iconSub = rxjs.Subscription.EMPTY;
            this._iconSub = this.iconObj.subscribe((/**
             * @return {?}
             */
            function () { return _this._updateIconSize(); }));
        }
        Object.defineProperty(AjfImage.prototype, "type", {
            /**
             * if 0 take image by url
             * if 1 take image by icon
             * if 2 take image by class
             *
             */
            set: /**
             * if 0 take image by url
             * if 1 take image by icon
             * if 2 take image by class
             *
             * @param {?} type
             * @return {?}
             */
            function (type) {
                this._imageType.next(type);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AjfImage.prototype, "imageUrl", {
            set: /**
             * @param {?} imageUrl
             * @return {?}
             */
            function (imageUrl) {
                imageUrl = typeof imageUrl === 'string' ? imageUrl : '';
                this._url.next(imageUrl.startsWith('data:image/svg+xml;base64,')
                    ? this._domSanitizer.bypassSecurityTrustResourceUrl(imageUrl)
                    : imageUrl);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AjfImage.prototype, "icon", {
            set: /**
             * @param {?} icon
             * @return {?}
             */
            function (icon) {
                this._iconObj.next(icon);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AjfImage.prototype, "flag", {
            set: /**
             * @param {?} flag
             * @return {?}
             */
            function (flag) {
                this._flagName.next(flag);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        AjfImage.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            if (this._iconSub && !this._iconSub.closed) {
                this._iconSub.unsubscribe();
            }
        };
        /**
         * @return {?}
         */
        AjfImage.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            this._updateIconSize();
        };
        /**
         * @private
         * @return {?}
         */
        AjfImage.prototype._updateIconSize = /**
         * @private
         * @return {?}
         */
        function () {
            /** @type {?} */
            var icon = this._iconObj.getValue();
            if (icon == null) {
                return;
            }
            /** @type {?} */
            var styles = this._el.nativeElement.style;
            if (this.iconComponent == null || styles == null || styles.fontSize == null) {
                return;
            }
            /** @type {?} */
            var fontSize = styles.fontSize;
            if (fontSize.match(/^[0-9]+px$/) != null) {
                /** @type {?} */
                var el = this.iconComponent.nativeElement;
                this._renderer.setStyle(el, 'width', fontSize, core.RendererStyleFlags2.Important);
                this._renderer.setStyle(el, 'height', fontSize, core.RendererStyleFlags2.Important);
            }
        };
        return AjfImage;
    }());

    exports.AjfImage = AjfImage;
    exports.AjfImageType = AjfImageType;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=core-image.umd.js.map
