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
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AjfTable = /** @class */ (function () {
    /**
     * Creates an instance of TableComponent.
     *
     *
     * @memberOf TableComponent
     */
    function AjfTable(_cdr, _domSanitizer) {
        this._cdr = _cdr;
        this._domSanitizer = _domSanitizer;
    }
    Object.defineProperty(AjfTable.prototype, "data", {
        get: /**
         * @return {?}
         */
        function () { return this._data; },
        set: /**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            this._data = this._fixData(data);
            this._cdr.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfTable.prototype, "cellpadding", {
        get: /**
         * @return {?}
         */
        function () { return this._cellpadding; },
        set: /**
         * @param {?} cellpadding
         * @return {?}
         */
        function (cellpadding) {
            this._cellpadding = cellpadding;
            this._cdr.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     * @param {?} data
     * @return {?}
     */
    AjfTable.prototype._fixData = /**
     * @private
     * @param {?} data
     * @return {?}
     */
    function (data) {
        var _this = this;
        (data || []).forEach((/**
         * @param {?} elem
         * @return {?}
         */
        function (elem) {
            (elem || []).forEach((/**
             * @param {?} subElem
             * @return {?}
             */
            function (subElem) {
                subElem.value = _this._domSanitizer.bypassSecurityTrustHtml(subElem.value);
            }));
        }));
        return data;
    };
    AjfTable.decorators = [
        { type: Component, args: [{selector: 'ajf-table',
                    template: "<table *ngIf=\"data\"><tr *ngFor=\"let row of data\"><td *ngFor=\"let cell of row\" [applyStyles]=\"cell.style\" [ngStyle]=\"{'padding': cellpadding}\" [attr.colspan]=\"cell.colspan\" [attr.rowspan]=\"cell.rowspan\" [innerHTML]=\"cell.value\"></td></tr></table>",
                    styles: [""],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None
                },] },
    ];
    /** @nocollapse */
    AjfTable.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: DomSanitizer }
    ]; };
    AjfTable.propDecorators = {
        data: [{ type: Input }],
        cellpadding: [{ type: Input }]
    };
    return AjfTable;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AjfTableModule = /** @class */ (function () {
    function AjfTableModule() {
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
    return AjfTableModule;
}());

export { AjfTable, AjfTableModule };
//# sourceMappingURL=table.es5.js.map
