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
import { Component, ViewEncapsulation, ChangeDetectionStrategy, NgModule } from '@angular/core';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        { type: Component, args: [{selector: 'ajf-page-break',
                    template: "&nbsp;",
                    styles: ["@media print{ajf-page-break{display:block;page-break-after:always}}ajf-page-break{display:none}"],
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush
                },] },
    ];
    return AjfPageBreakComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AjfPageBreakModule = /** @class */ (function () {
    function AjfPageBreakModule() {
    }
    AjfPageBreakModule.decorators = [
        { type: NgModule, args: [{
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { AjfPageBreakModule, AjfPageBreakComponent };
//# sourceMappingURL=page-break.es5.js.map
