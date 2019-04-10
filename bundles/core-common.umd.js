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
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core')) :
    typeof define === 'function' && define.amd ? define('@ajf/core/common', ['exports', '@angular/core'], factory) :
    (global = global || self, factory((global.ajf = global.ajf || {}, global.ajf.core = global.ajf.core || {}, global.ajf.core.common = {}), global.ng.core));
}(this, function (exports, core) { 'use strict';

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
            { type: core.Directive, args: [{ selector: '[applyStyles]' },] },
        ];
        /** @nocollapse */
        ApplyStylesDirective.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: core.Renderer2 }
        ]; };
        ApplyStylesDirective.propDecorators = {
            applyStyles: [{ type: core.Input }]
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
            { type: core.Directive, args: [{ selector: '[autoFocus]' },] },
        ];
        /** @nocollapse */
        AutofocusDirective.ctorParameters = function () { return [
            { type: core.ElementRef }
        ]; };
        AutofocusDirective.propDecorators = {
            appAutoFocus: [{ type: core.Input }]
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
            { type: core.NgModule, args: [{
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

    exports.AjfCommonModule = AjfCommonModule;
    exports.ɵa = ApplyStylesDirective;
    exports.ɵb = AutofocusDirective;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=core-common.umd.js.map
