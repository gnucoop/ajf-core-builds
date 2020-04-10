import { AjfNodeType, AjfFieldType } from '@ajf/core/forms';
import { Directive, Input } from '@angular/core';

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
var AjfNodeIcon = /** @class */ (function () {
    function AjfNodeIcon() {
    }
    Object.defineProperty(AjfNodeIcon.prototype, "fontSet", {
        get: function () {
            return this._fontSet;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfNodeIcon.prototype, "fontIcon", {
        get: function () {
            return this._fontIcon;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfNodeIcon.prototype, "node", {
        get: function () {
            return this._node;
        },
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
            case AjfNodeType.AjfField:
                var fieldType = AjfFieldType[node.fieldType];
                return fieldType != null ? "field-" + fieldType.toLowerCase() : '';
            default:
                var nodeType = AjfNodeType[node.nodeType];
                return nodeType != null ? "node-" + nodeType.toLowerCase().replace('ajf', '') : '';
        }
    };
    AjfNodeIcon.decorators = [
        { type: Directive }
    ];
    AjfNodeIcon.propDecorators = {
        node: [{ type: Input }]
    };
    return AjfNodeIcon;
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

export { AjfNodeIcon };
//# sourceMappingURL=node-icon.js.map
