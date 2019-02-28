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
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@ajf/core/forms')) :
    typeof define === 'function' && define.amd ? define('@ajf/core/node-icon', ['exports', '@ajf/core/forms'], factory) :
    (global = global || self, factory((global.ajf = global.ajf || {}, global.ajf.core = global.ajf.core || {}, global.ajf.core.nodeIcon = {}), global.ajf.core.forms));
}(this, function (exports, forms) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @abstract
     */
    var   /**
     * @abstract
     */
    AjfNodeIcon = /** @class */ (function () {
        function AjfNodeIcon() {
        }
        Object.defineProperty(AjfNodeIcon.prototype, "fontSet", {
            get: /**
             * @return {?}
             */
            function () { return this._fontSet; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AjfNodeIcon.prototype, "fontIcon", {
            get: /**
             * @return {?}
             */
            function () { return this._fontIcon; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AjfNodeIcon.prototype, "node", {
            get: /**
             * @return {?}
             */
            function () { return this._node; },
            set: /**
             * @param {?} node
             * @return {?}
             */
            function (node) {
                this._node = node;
                this._fontSet = 'ajf-icon';
                this._fontIcon = this._getFontIcon(node);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @private
         * @param {?} node
         * @return {?}
         */
        AjfNodeIcon.prototype._getFontIcon = /**
         * @private
         * @param {?} node
         * @return {?}
         */
        function (node) {
            switch (node.nodeType) {
                case forms.AjfNodeType.AjfField:
                    return "field-" + forms.AjfFieldType[((/** @type {?} */ (node))).fieldType].toLowerCase();
                default:
                    return "node-" + forms.AjfNodeType[node.nodeType].toLowerCase().replace('ajf', '');
            }
        };
        return AjfNodeIcon;
    }());

    exports.AjfNodeIcon = AjfNodeIcon;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=core-node-icon.umd.js.map
