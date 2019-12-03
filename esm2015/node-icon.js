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
import { AjfNodeType, AjfFieldType } from '@ajf/core/forms';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
class AjfNodeIcon {
    /**
     * @return {?}
     */
    get fontSet() { return this._fontSet; }
    /**
     * @return {?}
     */
    get fontIcon() { return this._fontIcon; }
    /**
     * @return {?}
     */
    get node() { return this._node; }
    /**
     * @param {?} node
     * @return {?}
     */
    set node(node) {
        this._node = node;
        this._fontSet = 'ajf-icon';
        this._fontIcon = this._getFontIcon(node);
    }
    /**
     * @private
     * @param {?} node
     * @return {?}
     */
    _getFontIcon(node) {
        switch (node.nodeType) {
            case AjfNodeType.AjfField:
                /** @type {?} */
                const fieldType = AjfFieldType[((/** @type {?} */ (node))).fieldType];
                return fieldType != null ? `field-${fieldType.toLowerCase()}` : '';
            default:
                /** @type {?} */
                const nodeType = AjfNodeType[node.nodeType];
                return nodeType != null ? `node-${nodeType.toLowerCase().replace('ajf', '')}` : '';
        }
    }
}

export { AjfNodeIcon };
//# sourceMappingURL=node-icon.js.map
