(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common'), require('@angular/core'), require('@ajf/core/common'), require('@angular/platform-browser')) :
    typeof define === 'function' && define.amd ? define('@ajf/core/table', ['exports', '@angular/common', '@angular/core', '@ajf/core/common', '@angular/platform-browser'], factory) :
    (global = global || self, factory((global.ajf = global.ajf || {}, global.ajf.core = global.ajf.core || {}, global.ajf.core.table = {}), global.ng.common, global.ng.core, global.ng.core.common, global.ng.platformBrowser));
}(this, (function (exports, common, core, common$1, platformBrowser) { 'use strict';

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
            get: function () { return this._data; },
            set: function (data) {
                this._data = this._fixData(data);
                this._cdr.markForCheck();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AjfTable.prototype, "cellpadding", {
            get: function () { return this._cellpadding; },
            set: function (cellpadding) {
                this._cellpadding = cellpadding;
                this._cdr.markForCheck();
            },
            enumerable: true,
            configurable: true
        });
        AjfTable.prototype._fixData = function (data) {
            var _this = this;
            (data || []).forEach(function (elem) {
                (elem || []).forEach(function (subElem) {
                    subElem.value = _this._domSanitizer.bypassSecurityTrustHtml(subElem.value);
                });
            });
            return data;
        };
        AjfTable.decorators = [
            { type: core.Component, args: [{
                        selector: 'ajf-table',
                        template: "<table *ngIf=\"data\">\n  <tr *ngFor=\"let row of data\">\n    <td *ngFor=\"let cell of row\"\n        [applyStyles]=\"cell.style\"\n        [ngStyle]=\"{'padding': cellpadding}\"\n        [attr.colspan]=\"cell.colspan\"\n        [attr.rowspan]=\"cell.rowspan\"\n        [innerHTML]=\"cell.value\">\n    </td>\n  </tr>\n</table>\n",
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                        styles: ["\n"]
                    }] }
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
                    },] }
        ];
        return AjfTableModule;
    }());

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

    exports.AjfTable = AjfTable;
    exports.AjfTableModule = AjfTableModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=core-table.umd.js.map
