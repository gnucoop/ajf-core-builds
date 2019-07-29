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
import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, ViewEncapsulation, ChangeDetectorRef, Input, NgModule } from '@angular/core';
import { AjfCommonModule } from '@ajf/core/common';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfTable {
    /**
     * Creates an instance of TableComponent.
     *
     *
     * \@memberOf TableComponent
     * @param {?} _cdr
     * @param {?} _domSanitizer
     */
    constructor(_cdr, _domSanitizer) {
        this._cdr = _cdr;
        this._domSanitizer = _domSanitizer;
    }
    /**
     * @return {?}
     */
    get data() { return this._data; }
    /**
     * @param {?} data
     * @return {?}
     */
    set data(data) {
        this._data = this._fixData(data);
        this._cdr.markForCheck();
    }
    /**
     * @return {?}
     */
    get cellpadding() { return this._cellpadding; }
    /**
     * @param {?} cellpadding
     * @return {?}
     */
    set cellpadding(cellpadding) {
        this._cellpadding = cellpadding;
        this._cdr.markForCheck();
    }
    /**
     * @private
     * @param {?} data
     * @return {?}
     */
    _fixData(data) {
        (data || []).forEach((/**
         * @param {?} elem
         * @return {?}
         */
        (elem) => {
            (elem || []).forEach((/**
             * @param {?} subElem
             * @return {?}
             */
            (subElem) => {
                subElem.value = this._domSanitizer.bypassSecurityTrustHtml(subElem.value);
            }));
        }));
        return data;
    }
}
AjfTable.decorators = [
    { type: Component, args: [{selector: 'ajf-table',
                template: "<table *ngIf=\"data\"><tr *ngFor=\"let row of data\"><td *ngFor=\"let cell of row\" [applyStyles]=\"cell.style\" [ngStyle]=\"{'padding': cellpadding}\" [attr.colspan]=\"cell.colspan\" [attr.rowspan]=\"cell.rowspan\" [innerHTML]=\"cell.value\"></td></tr></table>",
                styles: [""],
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None
            },] },
];
/** @nocollapse */
AjfTable.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: DomSanitizer }
];
AjfTable.propDecorators = {
    data: [{ type: Input }],
    cellpadding: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfTableModule {
}
AjfTableModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    AjfCommonModule,
                    CommonModule,
                ],
                declarations: [
                    AjfTable,
                ],
                exports: [
                    AjfTable,
                ]
            },] },
];

export { AjfTable, AjfTableModule };
//# sourceMappingURL=table.js.map
