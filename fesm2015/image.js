import { __decorate, __metadata } from 'tslib';
import { RendererStyleFlags2, Input, Directive, ElementRef, Renderer2 } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BehaviorSubject, Subscription } from 'rxjs';

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
// tslint:disable-next-line:prefer-const-enum
var AjfImageType;
(function (AjfImageType) {
    AjfImageType[AjfImageType["Image"] = 0] = "Image";
    AjfImageType[AjfImageType["Flag"] = 1] = "Flag";
    AjfImageType[AjfImageType["Icon"] = 2] = "Icon";
    AjfImageType[AjfImageType["LENGTH"] = 3] = "LENGTH";
})(AjfImageType || (AjfImageType = {}));

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
let AjfImage = /** @class */ (() => {
    let AjfImage = class AjfImage {
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
            this._iconSub = this.iconObj.subscribe(() => this._updateIconSize());
        }
        /**
         * if 0 take image by url
         * if 1 take image by icon
         * if 2 take image by class
         *
         */
        set type(type) {
            this._imageType.next(type);
        }
        set imageUrl(imageUrl) {
            imageUrl = typeof imageUrl === 'string' ? imageUrl : '';
            this._url.next(imageUrl.startsWith('data:image/svg+xml;base64,') ?
                this._domSanitizer.bypassSecurityTrustResourceUrl(imageUrl) :
                imageUrl);
        }
        set icon(icon) {
            this._iconObj.next(icon);
        }
        set flag(flag) {
            this._flagName.next(flag);
        }
        ngOnDestroy() {
            if (this._iconSub && !this._iconSub.closed) {
                this._iconSub.unsubscribe();
            }
        }
        ngOnInit() {
            this._updateIconSize();
        }
        _updateIconSize() {
            const icon = this._iconObj.getValue();
            if (icon == null) {
                return;
            }
            const styles = this._el.nativeElement.style;
            if (this.iconComponent == null || styles == null || styles.fontSize == null) {
                return;
            }
            const fontSize = styles.fontSize;
            if (fontSize.match(/^[0-9]+px$/) != null) {
                const el = this.iconComponent.nativeElement;
                this._renderer.setStyle(el, 'width', fontSize, RendererStyleFlags2.Important);
                this._renderer.setStyle(el, 'height', fontSize, RendererStyleFlags2.Important);
            }
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], AjfImage.prototype, "type", null);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], AjfImage.prototype, "imageUrl", null);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], AjfImage.prototype, "icon", null);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], AjfImage.prototype, "flag", null);
    AjfImage = __decorate([
        Directive(),
        __metadata("design:paramtypes", [ElementRef, Renderer2, DomSanitizer])
    ], AjfImage);
    return AjfImage;
})();

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

export { AjfImage, AjfImageType };
//# sourceMappingURL=image.js.map
