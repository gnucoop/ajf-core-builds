import { AjfCommonModule } from '@ajf/core/common';
import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, ViewEncapsulation, ChangeDetectorRef, Input, NgModule } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/table/table-cell.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
/**
 * @record
 */
function AjfTableCell() { }
if (false) {
    /** @type {?} */
    AjfTableCell.prototype.value;
    /** @type {?} */
    AjfTableCell.prototype.style;
    /** @type {?|undefined} */
    AjfTableCell.prototype.colspan;
    /** @type {?|undefined} */
    AjfTableCell.prototype.rowspan;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/table/table.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
    get data() {
        return this._data;
    }
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
    get cellpadding() {
        return this._cellpadding;
    }
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
    { type: Component, args: [{
                selector: 'ajf-table',
                template: "<table *ngIf=\"data\">\n  <tr *ngFor=\"let row of data\">\n    <td *ngFor=\"let cell of row\"\n        [applyStyles]=\"cell.style\"\n        [ngStyle]=\"{'padding': cellpadding}\"\n        [attr.colspan]=\"cell.colspan\"\n        [attr.rowspan]=\"cell.rowspan\"\n        [innerHTML]=\"cell.value\">\n    </td>\n  </tr>\n</table>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                styles: ["\n"]
            }] }
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
if (false) {
    /**
     * @type {?}
     * @private
     */
    AjfTable.prototype._data;
    /**
     * @type {?}
     * @private
     */
    AjfTable.prototype._cellpadding;
    /**
     * @type {?}
     * @private
     */
    AjfTable.prototype._cdr;
    /**
     * @type {?}
     * @private
     */
    AjfTable.prototype._domSanitizer;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/table/table-module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
            },] }
];

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/table/public-api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * Generated bundle index. Do not edit.
 */

export { AjfTable, AjfTableModule };
//# sourceMappingURL=table.js.map
