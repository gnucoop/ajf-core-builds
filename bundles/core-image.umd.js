(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/platform-browser'), require('rxjs')) :
    typeof define === 'function' && define.amd ? define('@ajf/core/image', ['exports', '@angular/core', '@angular/platform-browser', 'rxjs'], factory) :
    (global = global || self, factory((global.ajf = global.ajf || {}, global.ajf.core = global.ajf.core || {}, global.ajf.core.image = {}), global.ng.core, global.ng.platformBrowser, global.rxjs));
}(this, (function (exports, core, platformBrowser, rxjs) { 'use strict';

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
    (function (AjfImageType) {
        AjfImageType[AjfImageType["Image"] = 0] = "Image";
        AjfImageType[AjfImageType["Flag"] = 1] = "Flag";
        AjfImageType[AjfImageType["Icon"] = 2] = "Icon";
        AjfImageType[AjfImageType["LENGTH"] = 3] = "LENGTH";
    })(exports.AjfImageType || (exports.AjfImageType = {}));

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
    var AjfImage = /** @class */ (function () {
        function AjfImage(_el, _renderer, _domSanitizer) {
            var _this = this;
            this._el = _el;
            this._renderer = _renderer;
            this._domSanitizer = _domSanitizer;
            this.imageTypes = exports.AjfImageType;
            this._imageType = new rxjs.BehaviorSubject(null);
            this.imageType = this._imageType.asObservable();
            this._url = new rxjs.BehaviorSubject(null);
            this.url = this._url.asObservable();
            this._iconObj = new rxjs.BehaviorSubject(null);
            this.iconObj = this._iconObj.asObservable();
            this._flagName = new rxjs.BehaviorSubject(null);
            this.flagName = this._flagName.asObservable();
            this._iconSub = rxjs.Subscription.EMPTY;
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
                this._url.next(imageUrl.startsWith('data:image/svg+xml;base64,') ?
                    this._domSanitizer.bypassSecurityTrustResourceUrl(imageUrl) :
                    imageUrl);
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
                this._renderer.setStyle(el, 'width', fontSize, core.RendererStyleFlags2.Important);
                this._renderer.setStyle(el, 'height', fontSize, core.RendererStyleFlags2.Important);
            }
        };
        AjfImage.decorators = [
            { type: core.Directive }
        ];
        /** @nocollapse */
        AjfImage.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: core.Renderer2 },
            { type: platformBrowser.DomSanitizer }
        ]; };
        AjfImage.propDecorators = {
            type: [{ type: core.Input }],
            imageUrl: [{ type: core.Input }],
            icon: [{ type: core.Input }],
            flag: [{ type: core.Input }]
        };
        return AjfImage;
    }());

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

    /**
     * Generated bundle index. Do not edit.
     */

    exports.AjfImage = AjfImage;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=core-image.umd.js.map
