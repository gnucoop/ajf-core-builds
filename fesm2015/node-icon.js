import { AjfNodeType, AjfFieldType } from '@ajf/core/forms';
import { Directive, Input } from '@angular/core';

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/node-icon/node-icon.ts
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
AjfNodeIcon.decorators = [
    { type: Directive }
];
AjfNodeIcon.propDecorators = {
    node: [{ type: Input }]
};
if (false) {
    /**
     * @type {?}
     * @private
     */
    AjfNodeIcon.prototype._fontSet;
    /**
     * @type {?}
     * @private
     */
    AjfNodeIcon.prototype._fontIcon;
    /**
     * @type {?}
     * @private
     */
    AjfNodeIcon.prototype._node;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/node-icon/public-api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * Generated bundle index. Do not edit.
 */

export { AjfNodeIcon };
//# sourceMappingURL=node-icon.js.map
