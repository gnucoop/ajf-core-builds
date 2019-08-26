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
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@ngx-translate/core')) :
    typeof define === 'function' && define.amd ? define('@ajf/core/common', ['exports', '@angular/core', '@angular/common', '@ngx-translate/core'], factory) :
    (global = global || self, factory((global.ajf = global.ajf || {}, global.ajf.core = global.ajf.core || {}, global.ajf.core.common = {}), global.ng.core, global.ng.common, global.ngxt.core));
}(this, function (exports, core, common, core$1) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var FormatIfNumber = /** @class */ (function (_super) {
        __extends(FormatIfNumber, _super);
        function FormatIfNumber() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * @param {?} value
         * @param {?=} digitsInfo
         * @param {?=} locale
         * @return {?}
         */
        FormatIfNumber.prototype.transform = /**
         * @param {?} value
         * @param {?=} digitsInfo
         * @param {?=} locale
         * @return {?}
         */
        function (value, digitsInfo, locale) {
            if (typeof value === 'number') {
                return _super.prototype.transform.call(this, value, digitsInfo, locale);
            }
            else {
                return value;
            }
        };
        FormatIfNumber.decorators = [
            { type: core.Pipe, args: [{ name: 'ajfFormatIfNumber' },] },
        ];
        return FormatIfNumber;
    }(common.DecimalPipe));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var TranslateIfString = /** @class */ (function (_super) {
        __extends(TranslateIfString, _super);
        function TranslateIfString() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * @param {?} query
         * @param {...?} args
         * @return {?}
         */
        TranslateIfString.prototype.transform = /**
         * @param {?} query
         * @param {...?} args
         * @return {?}
         */
        function (query) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            if (typeof query === 'string') {
                return _super.prototype.transform.apply(this, [query].concat(args));
            }
            else {
                return query;
            }
        };
        TranslateIfString.decorators = [
            { type: core.Pipe, args: [{ name: 'ajfTranslateIfString' },] },
        ];
        return TranslateIfString;
    }(core$1.TranslatePipe));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var AjfCommonModule = /** @class */ (function () {
        function AjfCommonModule() {
        }
        AjfCommonModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [
                            ApplyStylesDirective,
                            AutofocusDirective,
                            FormatIfNumber,
                            TranslateIfString,
                        ],
                        exports: [
                            ApplyStylesDirective,
                            AutofocusDirective,
                            FormatIfNumber,
                            TranslateIfString,
                        ],
                    },] },
        ];
        return AjfCommonModule;
    }());

    exports.AjfCommonModule = AjfCommonModule;
    exports.ApplyStylesDirective = ApplyStylesDirective;
    exports.AutofocusDirective = AutofocusDirective;
    exports.FormatIfNumber = FormatIfNumber;
    exports.TranslateIfString = TranslateIfString;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=core-common.umd.js.map
