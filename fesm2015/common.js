import { Directive, ElementRef, Renderer2, Input, EventEmitter, Output, Pipe, NgModule } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/common/apply-styles-directive.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ApplyStylesDirective {
    /**
     * @param {?} _el
     * @param {?} _renderer
     */
    constructor(_el, _renderer) {
        this._el = _el;
        this._renderer = _renderer;
    }
    /**
     * @param {?} cssStyles
     * @return {?}
     */
    set applyStyles(cssStyles) {
        if (cssStyles != null && this._cssStyles !== cssStyles) {
            this._cssStyles = cssStyles;
            this._updateStyles();
        }
    }
    /**
     * @private
     * @return {?}
     */
    _updateStyles() {
        if (this._cssStyles == null) {
            return;
        }
        Object.keys(this._cssStyles).forEach((/**
         * @param {?} style
         * @return {?}
         */
        (style) => {
            try {
                this._renderer.setStyle(this._el.nativeElement, style, `${this._cssStyles[style]}`);
            }
            catch (e) {
            }
        }));
    }
}
ApplyStylesDirective.decorators = [
    { type: Directive, args: [{ selector: '[applyStyles]' },] }
];
/** @nocollapse */
ApplyStylesDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 }
];
ApplyStylesDirective.propDecorators = {
    applyStyles: [{ type: Input }]
};
if (false) {
    /**
     * @type {?}
     * @private
     */
    ApplyStylesDirective.prototype._cssStyles;
    /**
     * @type {?}
     * @private
     */
    ApplyStylesDirective.prototype._el;
    /**
     * @type {?}
     * @private
     */
    ApplyStylesDirective.prototype._renderer;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/common/auto-focus.directive.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AutofocusDirective {
    /**
     * @param {?} _el
     */
    constructor(_el) {
        this._el = _el;
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this._el.nativeElement.focus();
    }
}
AutofocusDirective.decorators = [
    { type: Directive, args: [{ selector: '[autoFocus]' },] }
];
/** @nocollapse */
AutofocusDirective.ctorParameters = () => [
    { type: ElementRef }
];
AutofocusDirective.propDecorators = {
    appAutoFocus: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    AutofocusDirective.prototype.appAutoFocus;
    /**
     * @type {?}
     * @private
     */
    AutofocusDirective.prototype._el;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/common/dnd.directive.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfDndDirective {
    constructor() {
        this.file = new EventEmitter();
        this.background = '#eee';
    }
    /**
     * @param {?} evt
     * @return {?}
     */
    onDragOver(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this.background = '#999';
    }
    /**
     * @param {?} evt
     * @return {?}
     */
    onDragLeave(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this.background = '#eee';
    }
    /**
     * @param {?} evt
     * @return {?}
     */
    onDrop(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        /** @type {?} */
        let files = evt.dataTransfer.files;
        if (files.length > 0) {
            this.background = '#eee';
            this.file.emit(files);
        }
    }
}
AjfDndDirective.decorators = [
    { type: Directive, args: [{
                selector: '[ajfDnd]',
                host: {
                    '[style.background]': 'background',
                    '(dragover)': 'onDragOver($event)',
                    '(dragleave)': 'onDragLeave($event)',
                    '(drop)': 'onDrop($event)',
                }
            },] }
];
AjfDndDirective.propDecorators = {
    file: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    AjfDndDirective.prototype.file;
    /** @type {?} */
    AjfDndDirective.prototype.background;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/common/format-if-number.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class FormatIfNumber extends DecimalPipe {
    /**
     * @param {?} value
     * @param {?=} digitsInfo
     * @param {?=} locale
     * @return {?}
     */
    transform(value, digitsInfo, locale) {
        if (typeof value === 'number') {
            return super.transform(value, digitsInfo, locale);
        }
        else {
            return value;
        }
    }
}
FormatIfNumber.decorators = [
    { type: Pipe, args: [{ name: 'ajfFormatIfNumber' },] }
];

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/common/translate-if-string.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class TranslateIfString extends TranslatePipe {
    /**
     * @param {?} query
     * @param {...?} args
     * @return {?}
     */
    transform(query, ...args) {
        if (typeof query === 'string') {
            return super.transform(query, ...args);
        }
        else {
            return query;
        }
    }
}
TranslateIfString.decorators = [
    { type: Pipe, args: [{ name: 'ajfTranslateIfString' },] }
];

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/common/video.directive.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfVideoDirective {
    /**
     * @param {?} _el
     * @param {?} _renderer
     */
    constructor(_el, _renderer) {
        this._el = _el;
        this._renderer = _renderer;
        this.isInit = new EventEmitter();
    }
    /**
     * @return {?}
     */
    get source() {
        return this._source;
    }
    /**
     * @param {?} source
     * @return {?}
     */
    set source(source) {
        this._source = source;
        this._initCam();
    }
    /**
     * @private
     * @return {?}
     */
    _initCam() {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia((/** @type {?} */ ({ video: true })))
                .then((/**
             * @param {?} stream
             * @return {?}
             */
            (stream) => {
                ((/** @type {?} */ (this._source))).srcObject = stream;
                ((/** @type {?} */ (this._source))).play();
            }))
                .catch((/**
             * @param {?} err
             * @return {?}
             */
            (err) => {
                console.log(err);
            }));
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this._renderer.appendChild(this._el.nativeElement, this._source);
        this.isInit.emit();
    }
}
AjfVideoDirective.decorators = [
    { type: Directive, args: [{ selector: '[ajfVideoDirective]' },] }
];
/** @nocollapse */
AjfVideoDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 }
];
AjfVideoDirective.propDecorators = {
    source: [{ type: Input }],
    isInit: [{ type: Output }]
};
if (false) {
    /**
     * @type {?}
     * @private
     */
    AjfVideoDirective.prototype._source;
    /** @type {?} */
    AjfVideoDirective.prototype.isInit;
    /**
     * @type {?}
     * @private
     */
    AjfVideoDirective.prototype._el;
    /**
     * @type {?}
     * @private
     */
    AjfVideoDirective.prototype._renderer;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/common/common-module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfCommonModule {
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
            },] }
];

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/common/public-api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * Generated bundle index. Do not edit.
 */

export { AjfCommonModule, AjfDndDirective, AjfVideoDirective, ApplyStylesDirective, AutofocusDirective, FormatIfNumber, TranslateIfString };
//# sourceMappingURL=common.js.map
