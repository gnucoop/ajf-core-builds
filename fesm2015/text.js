import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef, Input, NgModule } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/text/text.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * this component manages the report text
 *
 * @export
 */
class AjfTextComponent {
    /**
     * @param {?} _cdr
     * @param {?} _domSanitizer
     * @param {?} _ts
     */
    constructor(_cdr, _domSanitizer, _ts) {
        this._cdr = _cdr;
        this._domSanitizer = _domSanitizer;
        this._ts = _ts;
    }
    /**
     * @param {?} htmlText
     * @return {?}
     */
    set htmlText(htmlText) {
        // type checking and length checking for instant method
        /** @type {?} */
        const htmlTextToBeTranslate = htmlText != null && typeof htmlText === 'string' && htmlText.trim().length > 0 ?
            this._ts.instant(htmlText) :
            htmlText;
        this._htmlText = this._domSanitizer.bypassSecurityTrustHtml(htmlTextToBeTranslate);
        this._cdr.markForCheck();
    }
    /**
     * @return {?}
     */
    get innerHTML() {
        return this._htmlText;
    }
}
AjfTextComponent.decorators = [
    { type: Component, args: [{
                selector: 'ajf-text',
                template: "<div class=\"ajf-text-container\" *ngIf=\"innerHTML\" [innerHTML]=\"innerHTML\"></div>\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["ajf-text .ajf-text-container{width:100%}ajf-text .ajf-text-container .ajf-ql-size-small{font-size:.75em}ajf-text .ajf-text-container .ajf-ql-size-large{font-size:1.5em}ajf-text .ajf-text-container .ajf-ql-size-huge{font-size:2.5em}ajf-text .ajf-text-container .ajf-ql-size-veryhuge{font-size:3.5em}ajf-text .ajf-text-container .ajf-ql-align-right{text-align:right}ajf-text .ajf-text-container .ajf-ql-align-center{text-align:center}ajf-text .ajf-text-container .ajf-ql-align-justify{text-align:justify}ajf-text .ajf-text-container h1,ajf-text .ajf-text-container h2,ajf-text .ajf-text-container h3,ajf-text .ajf-text-container h4,ajf-text .ajf-text-container h5,ajf-text .ajf-text-container h6{margin:0}\n"]
            }] }
];
/** @nocollapse */
AjfTextComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: DomSanitizer },
    { type: TranslateService }
];
AjfTextComponent.propDecorators = {
    htmlText: [{ type: Input }]
};
if (false) {
    /**
     * \@memberOf TextComponent
     * @type {?}
     * @private
     */
    AjfTextComponent.prototype._htmlText;
    /**
     * @type {?}
     * @private
     */
    AjfTextComponent.prototype._cdr;
    /**
     * @type {?}
     * @private
     */
    AjfTextComponent.prototype._domSanitizer;
    /**
     * @type {?}
     * @private
     */
    AjfTextComponent.prototype._ts;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/text/text-module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfTextModule {
}
AjfTextModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    TranslateModule,
                ],
                declarations: [
                    AjfTextComponent,
                ],
                exports: [
                    AjfTextComponent,
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/text/public-api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * Generated bundle index. Do not edit.
 */

export { AjfTextComponent, AjfTextModule };
//# sourceMappingURL=text.js.map
