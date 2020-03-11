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
export { AjfNodeIcon };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS1pY29uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvbm9kZS1pY29uL25vZGUtaWNvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQVcsWUFBWSxFQUFXLFdBQVcsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdFLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRS9DO0lBQUE7SUEwQkEsQ0FBQztJQXZCQyxzQkFBSSxnQ0FBTzthQUFYLGNBQXdCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7OztPQUFBO0lBRy9DLHNCQUFJLGlDQUFRO2FBQVosY0FBeUIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFHakQsc0JBQUksNkJBQUk7YUFBUixjQUFzQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2FBQzFDLFVBQWtCLElBQWE7WUFDN0IsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7WUFDbEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUM7WUFDM0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzNDLENBQUM7OztPQUx5QztJQU9sQyxrQ0FBWSxHQUFwQixVQUFxQixJQUFhO1FBQ2hDLFFBQVEsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNyQixLQUFLLFdBQVcsQ0FBQyxRQUFRO2dCQUN6QixJQUFNLFNBQVMsR0FBRyxZQUFZLENBQVksSUFBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUMzRCxPQUFPLFNBQVMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLFdBQVMsU0FBUyxDQUFDLFdBQVcsRUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDbkU7Z0JBQ0EsSUFBTSxRQUFRLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDNUMsT0FBTyxRQUFRLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxVQUFRLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7U0FDcEY7SUFDSCxDQUFDOztnQkF6QkYsU0FBUzs7O3VCQVVQLEtBQUs7O0lBZ0JSLGtCQUFDO0NBQUEsQUExQkQsSUEwQkM7U0F6QnFCLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmRmllbGQsIEFqZkZpZWxkVHlwZSwgQWpmTm9kZSwgQWpmTm9kZVR5cGV9IGZyb20gJ0BhamYvY29yZS9mb3Jtcyc7XG5pbXBvcnQge0RpcmVjdGl2ZSwgSW5wdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ARGlyZWN0aXZlKClcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBamZOb2RlSWNvbiB7XG4gIHByaXZhdGUgX2ZvbnRTZXQ6IHN0cmluZztcbiAgZ2V0IGZvbnRTZXQoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX2ZvbnRTZXQ7IH1cblxuICBwcml2YXRlIF9mb250SWNvbjogc3RyaW5nO1xuICBnZXQgZm9udEljb24oKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX2ZvbnRJY29uOyB9XG5cbiAgcHJpdmF0ZSBfbm9kZTogQWpmTm9kZTtcbiAgZ2V0IG5vZGUoKTogQWpmTm9kZSB7IHJldHVybiB0aGlzLl9ub2RlOyB9XG4gIEBJbnB1dCgpIHNldCBub2RlKG5vZGU6IEFqZk5vZGUpIHtcbiAgICB0aGlzLl9ub2RlID0gbm9kZTtcbiAgICB0aGlzLl9mb250U2V0ID0gJ2FqZi1pY29uJztcbiAgICB0aGlzLl9mb250SWNvbiA9IHRoaXMuX2dldEZvbnRJY29uKG5vZGUpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0Rm9udEljb24obm9kZTogQWpmTm9kZSk6IHN0cmluZyB7XG4gICAgc3dpdGNoIChub2RlLm5vZGVUeXBlKSB7XG4gICAgICBjYXNlIEFqZk5vZGVUeXBlLkFqZkZpZWxkOlxuICAgICAgY29uc3QgZmllbGRUeXBlID0gQWpmRmllbGRUeXBlWyg8QWpmRmllbGQ+bm9kZSkuZmllbGRUeXBlXTtcbiAgICAgIHJldHVybiBmaWVsZFR5cGUgIT0gbnVsbCA/IGBmaWVsZC0ke2ZpZWxkVHlwZS50b0xvd2VyQ2FzZSgpfWAgOiAnJztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICBjb25zdCBub2RlVHlwZSA9IEFqZk5vZGVUeXBlW25vZGUubm9kZVR5cGVdO1xuICAgICAgcmV0dXJuIG5vZGVUeXBlICE9IG51bGwgPyBgbm9kZS0ke25vZGVUeXBlLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgnYWpmJywgJycpfWAgOiAnJztcbiAgICB9XG4gIH1cbn1cbiJdfQ==