/**
 * @fileoverview added by tsickle
 * Generated from: src/core/node-icon/node-icon.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS1pY29uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvbm9kZS1pY29uL25vZGUtaWNvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCQSxPQUFPLEVBQVcsWUFBWSxFQUFXLFdBQVcsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdFLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFDLE1BQU0sZUFBZSxDQUFDOzs7O0FBRy9DLE1BQU0sT0FBZ0IsV0FBVzs7OztJQUUvQixJQUFJLE9BQU8sS0FBYSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDOzs7O0lBRy9DLElBQUksUUFBUSxLQUFhLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7Ozs7SUFHakQsSUFBSSxJQUFJLEtBQWMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzs7Ozs7SUFDMUMsSUFBYSxJQUFJLENBQUMsSUFBYTtRQUM3QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUNsQixJQUFJLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQztRQUMzQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDM0MsQ0FBQzs7Ozs7O0lBRU8sWUFBWSxDQUFDLElBQWE7UUFDaEMsUUFBUSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ3JCLEtBQUssV0FBVyxDQUFDLFFBQVE7O3NCQUNuQixTQUFTLEdBQUcsWUFBWSxDQUFDLENBQUMsbUJBQVUsSUFBSSxFQUFBLENBQUMsQ0FBQyxTQUFTLENBQUM7Z0JBQzFELE9BQU8sU0FBUyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsU0FBUyxTQUFTLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQ25FOztzQkFDTSxRQUFRLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7Z0JBQzNDLE9BQU8sUUFBUSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7U0FDcEY7SUFDSCxDQUFDOzs7WUF6QkYsU0FBUzs7O21CQVVQLEtBQUs7Ozs7Ozs7SUFSTiwrQkFBeUI7Ozs7O0lBR3pCLGdDQUEwQjs7Ozs7SUFHMUIsNEJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSAyMDE4IEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmRmllbGQsIEFqZkZpZWxkVHlwZSwgQWpmTm9kZSwgQWpmTm9kZVR5cGV9IGZyb20gJ0BhamYvY29yZS9mb3Jtcyc7XG5pbXBvcnQge0RpcmVjdGl2ZSwgSW5wdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ARGlyZWN0aXZlKClcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBamZOb2RlSWNvbiB7XG4gIHByaXZhdGUgX2ZvbnRTZXQ6IHN0cmluZztcbiAgZ2V0IGZvbnRTZXQoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX2ZvbnRTZXQ7IH1cblxuICBwcml2YXRlIF9mb250SWNvbjogc3RyaW5nO1xuICBnZXQgZm9udEljb24oKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX2ZvbnRJY29uOyB9XG5cbiAgcHJpdmF0ZSBfbm9kZTogQWpmTm9kZTtcbiAgZ2V0IG5vZGUoKTogQWpmTm9kZSB7IHJldHVybiB0aGlzLl9ub2RlOyB9XG4gIEBJbnB1dCgpIHNldCBub2RlKG5vZGU6IEFqZk5vZGUpIHtcbiAgICB0aGlzLl9ub2RlID0gbm9kZTtcbiAgICB0aGlzLl9mb250U2V0ID0gJ2FqZi1pY29uJztcbiAgICB0aGlzLl9mb250SWNvbiA9IHRoaXMuX2dldEZvbnRJY29uKG5vZGUpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0Rm9udEljb24obm9kZTogQWpmTm9kZSk6IHN0cmluZyB7XG4gICAgc3dpdGNoIChub2RlLm5vZGVUeXBlKSB7XG4gICAgICBjYXNlIEFqZk5vZGVUeXBlLkFqZkZpZWxkOlxuICAgICAgY29uc3QgZmllbGRUeXBlID0gQWpmRmllbGRUeXBlWyg8QWpmRmllbGQ+bm9kZSkuZmllbGRUeXBlXTtcbiAgICAgIHJldHVybiBmaWVsZFR5cGUgIT0gbnVsbCA/IGBmaWVsZC0ke2ZpZWxkVHlwZS50b0xvd2VyQ2FzZSgpfWAgOiAnJztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICBjb25zdCBub2RlVHlwZSA9IEFqZk5vZGVUeXBlW25vZGUubm9kZVR5cGVdO1xuICAgICAgcmV0dXJuIG5vZGVUeXBlICE9IG51bGwgPyBgbm9kZS0ke25vZGVUeXBlLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgnYWpmJywgJycpfWAgOiAnJztcbiAgICB9XG4gIH1cbn1cbiJdfQ==