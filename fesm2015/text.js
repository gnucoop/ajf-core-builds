import { TranslocoService, AjfTranslocoModule } from '@ajf/core/transloco';
import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef, Input, NgModule } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

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
 * this component manages the report text
 *
 * @export
 */
class AjfTextComponent {
    constructor(_cdr, _domSanitizer, _ts) {
        this._cdr = _cdr;
        this._domSanitizer = _domSanitizer;
        this._ts = _ts;
    }
    set htmlText(htmlText) {
        // type checking and length checking for instant method
        const htmlTextToBeTranslate = htmlText != null && typeof htmlText === 'string' && htmlText.trim().length > 0 ?
            this._ts.translate(htmlText) :
            htmlText;
        this._htmlText = this._domSanitizer.bypassSecurityTrustHtml(htmlTextToBeTranslate);
        this._cdr.markForCheck();
    }
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
            },] }
];
AjfTextComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: DomSanitizer },
    { type: TranslocoService }
];
AjfTextComponent.propDecorators = {
    htmlText: [{ type: Input }]
};

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
class AjfTextModule {
}
AjfTextModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    AjfTranslocoModule,
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

export { AjfTextComponent, AjfTextModule };
//# sourceMappingURL=text.js.map
