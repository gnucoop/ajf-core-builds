/**
 * @fileoverview added by tsickle
 * Generated from: src/core/node-icon/node-icon.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
import { AjfFieldType, AjfNodeType } from '@ajf/core/forms';
import { Directive, Input } from '@angular/core';
/**
 * @abstract
 */
export class AjfNodeIcon {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS1pY29uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvbm9kZS1pY29uL25vZGUtaWNvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCQSxPQUFPLEVBQVcsWUFBWSxFQUFXLFdBQVcsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdFLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFDLE1BQU0sZUFBZSxDQUFDOzs7O0FBRy9DLE1BQU0sT0FBZ0IsV0FBVzs7OztJQUUvQixJQUFJLE9BQU8sS0FBYSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDOzs7O0lBRy9DLElBQUksUUFBUSxLQUFhLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7Ozs7SUFHakQsSUFBSSxJQUFJLEtBQWMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzs7Ozs7SUFDMUMsSUFBYSxJQUFJLENBQUMsSUFBYTtRQUM3QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUNsQixJQUFJLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQztRQUMzQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDM0MsQ0FBQzs7Ozs7O0lBRU8sWUFBWSxDQUFDLElBQWE7UUFDaEMsUUFBUSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ3JCLEtBQUssV0FBVyxDQUFDLFFBQVE7O3NCQUNuQixTQUFTLEdBQUcsWUFBWSxDQUFDLENBQUMsbUJBQVUsSUFBSSxFQUFBLENBQUMsQ0FBQyxTQUFTLENBQUM7Z0JBQzFELE9BQU8sU0FBUyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsU0FBUyxTQUFTLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQ25FOztzQkFDTSxRQUFRLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7Z0JBQzNDLE9BQU8sUUFBUSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7U0FDcEY7SUFDSCxDQUFDOzs7WUF6QkYsU0FBUzs7O21CQVVQLEtBQUs7Ozs7Ozs7SUFSTiwrQkFBeUI7Ozs7O0lBR3pCLGdDQUEwQjs7Ozs7SUFHMUIsNEJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkZpZWxkLCBBamZGaWVsZFR5cGUsIEFqZk5vZGUsIEFqZk5vZGVUeXBlfSBmcm9tICdAYWpmL2NvcmUvZm9ybXMnO1xuaW1wb3J0IHtEaXJlY3RpdmUsIElucHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQERpcmVjdGl2ZSgpXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQWpmTm9kZUljb24ge1xuICBwcml2YXRlIF9mb250U2V0OiBzdHJpbmc7XG4gIGdldCBmb250U2V0KCk6IHN0cmluZyB7IHJldHVybiB0aGlzLl9mb250U2V0OyB9XG5cbiAgcHJpdmF0ZSBfZm9udEljb246IHN0cmluZztcbiAgZ2V0IGZvbnRJY29uKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLl9mb250SWNvbjsgfVxuXG4gIHByaXZhdGUgX25vZGU6IEFqZk5vZGU7XG4gIGdldCBub2RlKCk6IEFqZk5vZGUgeyByZXR1cm4gdGhpcy5fbm9kZTsgfVxuICBASW5wdXQoKSBzZXQgbm9kZShub2RlOiBBamZOb2RlKSB7XG4gICAgdGhpcy5fbm9kZSA9IG5vZGU7XG4gICAgdGhpcy5fZm9udFNldCA9ICdhamYtaWNvbic7XG4gICAgdGhpcy5fZm9udEljb24gPSB0aGlzLl9nZXRGb250SWNvbihub2RlKTtcbiAgfVxuXG4gIHByaXZhdGUgX2dldEZvbnRJY29uKG5vZGU6IEFqZk5vZGUpOiBzdHJpbmcge1xuICAgIHN3aXRjaCAobm9kZS5ub2RlVHlwZSkge1xuICAgICAgY2FzZSBBamZOb2RlVHlwZS5BamZGaWVsZDpcbiAgICAgIGNvbnN0IGZpZWxkVHlwZSA9IEFqZkZpZWxkVHlwZVsoPEFqZkZpZWxkPm5vZGUpLmZpZWxkVHlwZV07XG4gICAgICByZXR1cm4gZmllbGRUeXBlICE9IG51bGwgPyBgZmllbGQtJHtmaWVsZFR5cGUudG9Mb3dlckNhc2UoKX1gIDogJyc7XG4gICAgICBkZWZhdWx0OlxuICAgICAgY29uc3Qgbm9kZVR5cGUgPSBBamZOb2RlVHlwZVtub2RlLm5vZGVUeXBlXTtcbiAgICAgIHJldHVybiBub2RlVHlwZSAhPSBudWxsID8gYG5vZGUtJHtub2RlVHlwZS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoJ2FqZicsICcnKX1gIDogJyc7XG4gICAgfVxuICB9XG59XG4iXX0=