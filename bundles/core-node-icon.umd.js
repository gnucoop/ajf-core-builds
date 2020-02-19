(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@ajf/core/forms'), require('@angular/core')) :
    typeof define === 'function' && define.amd ? define('@ajf/core/node-icon', ['exports', '@ajf/core/forms', '@angular/core'], factory) :
    (global = global || self, factory((global.ajf = global.ajf || {}, global.ajf.core = global.ajf.core || {}, global.ajf.core.nodeIcon = {}), global.ng.core.forms, global.ng.core));
}(this, (function (exports, forms, core) { 'use strict';

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
    var AjfNodeIcon = /** @class */ (function () {
        function AjfNodeIcon() {
        }
        Object.defineProperty(AjfNodeIcon.prototype, "fontSet", {
            get: function () { return this._fontSet; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AjfNodeIcon.prototype, "fontIcon", {
            get: function () { return this._fontIcon; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AjfNodeIcon.prototype, "node", {
            get: function () { return this._node; },
            set: function (node) {
                this._node = node;
                this._fontSet = 'ajf-icon';
                this._fontIcon = this._getFontIcon(node);
            },
            enumerable: true,
            configurable: true
        });
        AjfNodeIcon.prototype._getFontIcon = function (node) {
            switch (node.nodeType) {
                case forms.AjfNodeType.AjfField:
                    var fieldType = forms.AjfFieldType[node.fieldType];
                    return fieldType != null ? "field-" + fieldType.toLowerCase() : '';
                default:
                    var nodeType = forms.AjfNodeType[node.nodeType];
                    return nodeType != null ? "node-" + nodeType.toLowerCase().replace('ajf', '') : '';
            }
        };
        AjfNodeIcon.decorators = [
            { type: core.Directive }
        ];
        AjfNodeIcon.propDecorators = {
            node: [{ type: core.Input }]
        };
        return AjfNodeIcon;
    }());

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

    /**
     * Generated bundle index. Do not edit.
     */

    exports.AjfNodeIcon = AjfNodeIcon;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=core-node-icon.umd.js.map
