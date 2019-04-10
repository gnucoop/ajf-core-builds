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
import { Directive, ElementRef, Renderer2, Input, NgModule } from '@angular/core';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ApplyStylesDirective = /** @class */ (function () {
    function ApplyStylesDirective(_el, _renderer) {
        this._el = _el;
        this._renderer = _renderer;
    }
    Object.defineProperty(ApplyStylesDirective.prototype, "applyStyles", {
        set: /**
         * @param {?} cssStyles
         * @return {?}
         */
        function (cssStyles) {
            if (this._cssStyles !== cssStyles) {
                this._cssStyles = cssStyles;
                this._updateStyles();
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     * @return {?}
     */
    ApplyStylesDirective.prototype._updateStyles = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        if (this._cssStyles == null) {
            return;
        }
        Object.keys(this._cssStyles).forEach((/**
         * @param {?} style
         * @return {?}
         */
        function (style) {
            try {
                _this._renderer.setStyle(_this._el.nativeElement, style, "" + _this._cssStyles[style]);
            }
            catch (e) { }
        }));
    };
    ApplyStylesDirective.decorators = [
        { type: Directive, args: [{ selector: '[applyStyles]' },] },
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AutofocusDirective = /** @class */ (function () {
    function AutofocusDirective(_el) {
        this._el = _el;
    }
    /**
     * @return {?}
     */
    AutofocusDirective.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        this._el.nativeElement.focus();
    };
    AutofocusDirective.decorators = [
        { type: Directive, args: [{ selector: '[autoFocus]' },] },
    ];
    /** @nocollapse */
    AutofocusDirective.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    AutofocusDirective.propDecorators = {
        appAutoFocus: [{ type: Input }]
    };
    return AutofocusDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AjfCommonModule = /** @class */ (function () {
    function AjfCommonModule() {
    }
    AjfCommonModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        ApplyStylesDirective,
                        AutofocusDirective
                    ],
                    exports: [
                        ApplyStylesDirective,
                        AutofocusDirective
                    ]
                },] },
    ];
    return AjfCommonModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { AjfCommonModule, ApplyStylesDirective as ɵa, AutofocusDirective as ɵb };
//# sourceMappingURL=common.es5.js.map
