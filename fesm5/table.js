import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, ViewEncapsulation, ChangeDetectorRef, Input, NgModule } from '@angular/core';
import { AjfCommonModule } from '@ajf/core/common';
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
        { type: Component, args: [{
                    selector: 'ajf-table',
                    template: "<table *ngIf=\"data\">\n  <tr *ngFor=\"let row of data\">\n    <td *ngFor=\"let cell of row\"\n        [applyStyles]=\"cell.style\"\n        [ngStyle]=\"{'padding': cellpadding}\"\n        [attr.colspan]=\"cell.colspan\"\n        [attr.rowspan]=\"cell.rowspan\"\n        [innerHTML]=\"cell.value\">\n    </td>\n  </tr>\n</table>\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    styles: ["\n"]
                }] }
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

export { AjfTable, AjfTableModule };
//# sourceMappingURL=table.js.map
