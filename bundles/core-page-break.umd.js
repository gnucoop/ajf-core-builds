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
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core')) :
    typeof define === 'function' && define.amd ? define('@ajf/core/page-break', ['exports', '@angular/core'], factory) :
    (global = global || self, factory((global.ajf = global.ajf || {}, global.ajf.core = global.ajf.core || {}, global.ajf.core.pageBreak = {}), global.ng.core));
}(this, function (exports, core) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * this component manages the page break
     *
     * @export
     */
    var AjfPageBreakComponent = /** @class */ (function () {
        function AjfPageBreakComponent() {
        }
        AjfPageBreakComponent.decorators = [
            { type: core.Component, args: [{selector: 'ajf-page-break',
                        template: "&nbsp;",
                        styles: ["@media print{ajf-page-break{display:block;page-break-after:always}}ajf-page-break{display:none}"],
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush
                    },] },
        ];
        return AjfPageBreakComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var AjfPageBreakModule = /** @class */ (function () {
        function AjfPageBreakModule() {
        }
        AjfPageBreakModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [
                            AjfPageBreakComponent,
                        ],
                        exports: [
                            AjfPageBreakComponent,
                        ]
                    },] },
        ];
        return AjfPageBreakModule;
    }());

    exports.AjfPageBreakComponent = AjfPageBreakComponent;
    exports.AjfPageBreakModule = AjfPageBreakModule;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=core-page-break.umd.js.map
