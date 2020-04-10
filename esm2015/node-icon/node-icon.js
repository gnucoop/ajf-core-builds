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
    get fontSet() {
        return this._fontSet;
    }
    /**
     * @return {?}
     */
    get fontIcon() {
        return this._fontIcon;
    }
    /**
     * @return {?}
     */
    get node() {
        return this._node;
    }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS1pY29uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvbm9kZS1pY29uL25vZGUtaWNvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCQSxPQUFPLEVBQVcsWUFBWSxFQUFXLFdBQVcsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdFLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFDLE1BQU0sZUFBZSxDQUFDOzs7O0FBRy9DLE1BQU0sT0FBZ0IsV0FBVzs7OztJQUUvQixJQUFJLE9BQU87UUFDVCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQzs7OztJQUdELElBQUksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDOzs7O0lBR0QsSUFBSSxJQUFJO1FBQ04sT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3BCLENBQUM7Ozs7O0lBQ0QsSUFDSSxJQUFJLENBQUMsSUFBYTtRQUNwQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUNsQixJQUFJLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQztRQUMzQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDM0MsQ0FBQzs7Ozs7O0lBRU8sWUFBWSxDQUFDLElBQWE7UUFDaEMsUUFBUSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ3JCLEtBQUssV0FBVyxDQUFDLFFBQVE7O3NCQUNqQixTQUFTLEdBQUcsWUFBWSxDQUFDLENBQUMsbUJBQVUsSUFBSSxFQUFBLENBQUMsQ0FBQyxTQUFTLENBQUM7Z0JBQzFELE9BQU8sU0FBUyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsU0FBUyxTQUFTLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQ3JFOztzQkFDUSxRQUFRLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7Z0JBQzNDLE9BQU8sUUFBUSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7U0FDdEY7SUFDSCxDQUFDOzs7WUFoQ0YsU0FBUzs7O21CQWdCUCxLQUFLOzs7Ozs7O0lBZE4sK0JBQXlCOzs7OztJQUt6QixnQ0FBMEI7Ozs7O0lBSzFCLDRCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZGaWVsZCwgQWpmRmllbGRUeXBlLCBBamZOb2RlLCBBamZOb2RlVHlwZX0gZnJvbSAnQGFqZi9jb3JlL2Zvcm1zJztcbmltcG9ydCB7RGlyZWN0aXZlLCBJbnB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBEaXJlY3RpdmUoKVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFqZk5vZGVJY29uIHtcbiAgcHJpdmF0ZSBfZm9udFNldDogc3RyaW5nO1xuICBnZXQgZm9udFNldCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9mb250U2V0O1xuICB9XG5cbiAgcHJpdmF0ZSBfZm9udEljb246IHN0cmluZztcbiAgZ2V0IGZvbnRJY29uKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2ZvbnRJY29uO1xuICB9XG5cbiAgcHJpdmF0ZSBfbm9kZTogQWpmTm9kZTtcbiAgZ2V0IG5vZGUoKTogQWpmTm9kZSB7XG4gICAgcmV0dXJuIHRoaXMuX25vZGU7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IG5vZGUobm9kZTogQWpmTm9kZSkge1xuICAgIHRoaXMuX25vZGUgPSBub2RlO1xuICAgIHRoaXMuX2ZvbnRTZXQgPSAnYWpmLWljb24nO1xuICAgIHRoaXMuX2ZvbnRJY29uID0gdGhpcy5fZ2V0Rm9udEljb24obm9kZSk7XG4gIH1cblxuICBwcml2YXRlIF9nZXRGb250SWNvbihub2RlOiBBamZOb2RlKTogc3RyaW5nIHtcbiAgICBzd2l0Y2ggKG5vZGUubm9kZVR5cGUpIHtcbiAgICAgIGNhc2UgQWpmTm9kZVR5cGUuQWpmRmllbGQ6XG4gICAgICAgIGNvbnN0IGZpZWxkVHlwZSA9IEFqZkZpZWxkVHlwZVsoPEFqZkZpZWxkPm5vZGUpLmZpZWxkVHlwZV07XG4gICAgICAgIHJldHVybiBmaWVsZFR5cGUgIT0gbnVsbCA/IGBmaWVsZC0ke2ZpZWxkVHlwZS50b0xvd2VyQ2FzZSgpfWAgOiAnJztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGNvbnN0IG5vZGVUeXBlID0gQWpmTm9kZVR5cGVbbm9kZS5ub2RlVHlwZV07XG4gICAgICAgIHJldHVybiBub2RlVHlwZSAhPSBudWxsID8gYG5vZGUtJHtub2RlVHlwZS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoJ2FqZicsICcnKX1gIDogJyc7XG4gICAgfVxuICB9XG59XG4iXX0=