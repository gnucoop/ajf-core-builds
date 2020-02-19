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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS1pY29uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvbm9kZS1pY29uL25vZGUtaWNvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQVcsWUFBWSxFQUFXLFdBQVcsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdFLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRS9DO0lBQUE7SUEwQkEsQ0FBQztJQXZCQyxzQkFBSSxnQ0FBTzthQUFYLGNBQXdCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7OztPQUFBO0lBRy9DLHNCQUFJLGlDQUFRO2FBQVosY0FBeUIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFHakQsc0JBQUksNkJBQUk7YUFBUixjQUFzQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2FBQzFDLFVBQWtCLElBQWE7WUFDN0IsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7WUFDbEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUM7WUFDM0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzNDLENBQUM7OztPQUx5QztJQU9sQyxrQ0FBWSxHQUFwQixVQUFxQixJQUFhO1FBQ2hDLFFBQVEsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNyQixLQUFLLFdBQVcsQ0FBQyxRQUFRO2dCQUN6QixJQUFNLFNBQVMsR0FBRyxZQUFZLENBQVksSUFBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUMzRCxPQUFPLFNBQVMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLFdBQVMsU0FBUyxDQUFDLFdBQVcsRUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDbkU7Z0JBQ0EsSUFBTSxRQUFRLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDNUMsT0FBTyxRQUFRLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxVQUFRLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7U0FDcEY7SUFDSCxDQUFDOztnQkF6QkYsU0FBUzs7O3VCQVVQLEtBQUs7O0lBZ0JSLGtCQUFDO0NBQUEsQUExQkQsSUEwQkM7U0F6QnFCLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTggR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZGaWVsZCwgQWpmRmllbGRUeXBlLCBBamZOb2RlLCBBamZOb2RlVHlwZX0gZnJvbSAnQGFqZi9jb3JlL2Zvcm1zJztcbmltcG9ydCB7RGlyZWN0aXZlLCBJbnB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBEaXJlY3RpdmUoKVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFqZk5vZGVJY29uIHtcbiAgcHJpdmF0ZSBfZm9udFNldDogc3RyaW5nO1xuICBnZXQgZm9udFNldCgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5fZm9udFNldDsgfVxuXG4gIHByaXZhdGUgX2ZvbnRJY29uOiBzdHJpbmc7XG4gIGdldCBmb250SWNvbigpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5fZm9udEljb247IH1cblxuICBwcml2YXRlIF9ub2RlOiBBamZOb2RlO1xuICBnZXQgbm9kZSgpOiBBamZOb2RlIHsgcmV0dXJuIHRoaXMuX25vZGU7IH1cbiAgQElucHV0KCkgc2V0IG5vZGUobm9kZTogQWpmTm9kZSkge1xuICAgIHRoaXMuX25vZGUgPSBub2RlO1xuICAgIHRoaXMuX2ZvbnRTZXQgPSAnYWpmLWljb24nO1xuICAgIHRoaXMuX2ZvbnRJY29uID0gdGhpcy5fZ2V0Rm9udEljb24obm9kZSk7XG4gIH1cblxuICBwcml2YXRlIF9nZXRGb250SWNvbihub2RlOiBBamZOb2RlKTogc3RyaW5nIHtcbiAgICBzd2l0Y2ggKG5vZGUubm9kZVR5cGUpIHtcbiAgICAgIGNhc2UgQWpmTm9kZVR5cGUuQWpmRmllbGQ6XG4gICAgICBjb25zdCBmaWVsZFR5cGUgPSBBamZGaWVsZFR5cGVbKDxBamZGaWVsZD5ub2RlKS5maWVsZFR5cGVdO1xuICAgICAgcmV0dXJuIGZpZWxkVHlwZSAhPSBudWxsID8gYGZpZWxkLSR7ZmllbGRUeXBlLnRvTG93ZXJDYXNlKCl9YCA6ICcnO1xuICAgICAgZGVmYXVsdDpcbiAgICAgIGNvbnN0IG5vZGVUeXBlID0gQWpmTm9kZVR5cGVbbm9kZS5ub2RlVHlwZV07XG4gICAgICByZXR1cm4gbm9kZVR5cGUgIT0gbnVsbCA/IGBub2RlLSR7bm9kZVR5cGUudG9Mb3dlckNhc2UoKS5yZXBsYWNlKCdhamYnLCAnJyl9YCA6ICcnO1xuICAgIH1cbiAgfVxufVxuIl19