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
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common'), require('@angular/core'), require('@ajf/core/common'), require('@angular/platform-browser')) :
    typeof define === 'function' && define.amd ? define('@ajf/core/table', ['exports', '@angular/common', '@angular/core', '@ajf/core/common', '@angular/platform-browser'], factory) :
    (global = global || self, factory((global.ajf = global.ajf || {}, global.ajf.core = global.ajf.core || {}, global.ajf.core.table = {}), global.ng.common, global.ng.core, global.ajf.core.common, global.ng.platformBrowser));
}(this, function (exports, common, core, common$1, platformBrowser) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
            { type: core.Component, args: [{selector: 'ajf-table',
                        template: "<table *ngIf=\"data\"><tr *ngFor=\"let row of data\"><td *ngFor=\"let cell of row\" [applyStyles]=\"cell.style\" [ngStyle]=\"{'padding': cellpadding}\" [attr.colspan]=\"cell.colspan\" [attr.rowspan]=\"cell.rowspan\" [innerHTML]=\"cell.value\"></td></tr></table>",
                        styles: [""],
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None
                    },] },
        ];
        /** @nocollapse */
        AjfTable.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: platformBrowser.DomSanitizer }
        ]; };
        AjfTable.propDecorators = {
            data: [{ type: core.Input }],
            cellpadding: [{ type: core.Input }]
        };
        return AjfTable;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var AjfTableModule = /** @class */ (function () {
        function AjfTableModule() {
        }
        AjfTableModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common$1.AjfCommonModule,
                            common.CommonModule,
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

    exports.AjfTableModule = AjfTableModule;
    exports.AjfTable = AjfTable;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=core-table.umd.js.map
