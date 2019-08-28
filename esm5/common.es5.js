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
import { Directive, ElementRef, Renderer2, Input, Output, EventEmitter, Pipe, NgModule } from '@angular/core';
import { __extends } from 'tslib';
import { DecimalPipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

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
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AjfDndDirective = /** @class */ (function () {
    function AjfDndDirective() {
        this.file = new EventEmitter();
        this.background = '#eee';
    }
    /**
     * @param {?} evt
     * @return {?}
     */
    AjfDndDirective.prototype.onDragOver = /**
     * @param {?} evt
     * @return {?}
     */
    function (evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this.background = '#999';
    };
    /**
     * @param {?} evt
     * @return {?}
     */
    AjfDndDirective.prototype.onDragLeave = /**
     * @param {?} evt
     * @return {?}
     */
    function (evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this.background = '#eee';
    };
    /**
     * @param {?} evt
     * @return {?}
     */
    AjfDndDirective.prototype.onDrop = /**
     * @param {?} evt
     * @return {?}
     */
    function (evt) {
        evt.preventDefault();
        evt.stopPropagation();
        /** @type {?} */
        var files = evt.dataTransfer.files;
        if (files.length > 0) {
            this.background = '#eee';
            this.file.emit(files);
        }
    };
    AjfDndDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[ajfDnd]',
                    host: {
                        '[style.background]': 'background',
                        '(dragover)': 'onDragOver($event)',
                        '(dragleave)': 'onDragLeave($event)',
                        '(drop)': 'onDrop($event)',
                    }
                },] },
    ];
    AjfDndDirective.propDecorators = {
        file: [{ type: Output }]
    };
    return AjfDndDirective;
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
        { type: Pipe, args: [{ name: 'ajfFormatIfNumber' },] },
    ];
    return FormatIfNumber;
}(DecimalPipe));

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
        { type: Pipe, args: [{ name: 'ajfTranslateIfString' },] },
    ];
    return TranslateIfString;
}(TranslatePipe));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AjfVideoDirective = /** @class */ (function () {
    function AjfVideoDirective(_el, _renderer) {
        this._el = _el;
        this._renderer = _renderer;
        this.isInit = new EventEmitter();
    }
    Object.defineProperty(AjfVideoDirective.prototype, "source", {
        get: /**
         * @return {?}
         */
        function () { return this._source; },
        set: /**
         * @param {?} source
         * @return {?}
         */
        function (source) {
            this._source = source;
            this._initCam();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     * @return {?}
     */
    AjfVideoDirective.prototype._initCam = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia((/** @type {?} */ ({ video: true })))
                .then((/**
             * @param {?} stream
             * @return {?}
             */
            function (stream) {
                ((/** @type {?} */ (_this._source))).srcObject = stream;
                ((/** @type {?} */ (_this._source))).play();
            }))
                .catch((/**
             * @param {?} err
             * @return {?}
             */
            function (err) {
                console.log(err);
            }));
        }
    };
    /**
     * @return {?}
     */
    AjfVideoDirective.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this._renderer.appendChild(this._el.nativeElement, this._source);
        this.isInit.emit();
    };
    AjfVideoDirective.decorators = [
        { type: Directive, args: [{ selector: '[ajfVideoDirective]' },] },
    ];
    /** @nocollapse */
    AjfVideoDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    AjfVideoDirective.propDecorators = {
        source: [{ type: Input }],
        isInit: [{ type: Output }]
    };
    return AjfVideoDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AjfCommonModule = /** @class */ (function () {
    function AjfCommonModule() {
    }
    AjfCommonModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        AjfDndDirective,
                        AjfVideoDirective,
                        ApplyStylesDirective,
                        AutofocusDirective,
                        FormatIfNumber,
                        TranslateIfString,
                    ],
                    exports: [
                        AjfDndDirective,
                        AjfVideoDirective,
                        ApplyStylesDirective,
                        AutofocusDirective,
                        FormatIfNumber,
                        TranslateIfString,
                    ],
                },] },
    ];
    return AjfCommonModule;
}());

export { AjfCommonModule, AjfDndDirective, ApplyStylesDirective, AutofocusDirective, FormatIfNumber, TranslateIfString, AjfVideoDirective as ɵa };
//# sourceMappingURL=common.es5.js.map
