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
let AjfNodeIcon = /** @class */ (() => {
    class AjfNodeIcon {
        get fontSet() {
            return this._fontSet;
        }
        get fontIcon() {
            return this._fontIcon;
        }
        get node() {
            return this._node;
        }
        set node(node) {
            this._node = node;
            this._fontSet = 'ajf-icon';
            this._fontIcon = this._getFontIcon(node);
        }
        _getFontIcon(node) {
            switch (node.nodeType) {
                case AjfNodeType.AjfField:
                    const fieldType = AjfFieldType[node.fieldType];
                    return fieldType != null ? `field-${fieldType.toLowerCase()}` : '';
                default:
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
    return AjfNodeIcon;
})();
export { AjfNodeIcon };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS1pY29uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvbm9kZS1pY29uL25vZGUtaWNvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQVcsWUFBWSxFQUFXLFdBQVcsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdFLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRS9DO0lBQUEsTUFDc0IsV0FBVztRQUUvQixJQUFJLE9BQU87WUFDVCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDdkIsQ0FBQztRQUdELElBQUksUUFBUTtZQUNWLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUN4QixDQUFDO1FBR0QsSUFBSSxJQUFJO1lBQ04sT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3BCLENBQUM7UUFDRCxJQUNJLElBQUksQ0FBQyxJQUFhO1lBQ3BCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1lBQ2xCLElBQUksQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDO1lBQzNCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMzQyxDQUFDO1FBRU8sWUFBWSxDQUFDLElBQWE7WUFDaEMsUUFBUSxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNyQixLQUFLLFdBQVcsQ0FBQyxRQUFRO29CQUN2QixNQUFNLFNBQVMsR0FBRyxZQUFZLENBQVksSUFBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUMzRCxPQUFPLFNBQVMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQVMsU0FBUyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztnQkFDckU7b0JBQ0UsTUFBTSxRQUFRLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDNUMsT0FBTyxRQUFRLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQzthQUN0RjtRQUNILENBQUM7OztnQkFoQ0YsU0FBUzs7O3VCQWdCUCxLQUFLOztJQWlCUixrQkFBQztLQUFBO1NBaENxQixXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkZpZWxkLCBBamZGaWVsZFR5cGUsIEFqZk5vZGUsIEFqZk5vZGVUeXBlfSBmcm9tICdAYWpmL2NvcmUvZm9ybXMnO1xuaW1wb3J0IHtEaXJlY3RpdmUsIElucHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQERpcmVjdGl2ZSgpXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQWpmTm9kZUljb24ge1xuICBwcml2YXRlIF9mb250U2V0OiBzdHJpbmc7XG4gIGdldCBmb250U2V0KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2ZvbnRTZXQ7XG4gIH1cblxuICBwcml2YXRlIF9mb250SWNvbjogc3RyaW5nO1xuICBnZXQgZm9udEljb24oKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fZm9udEljb247XG4gIH1cblxuICBwcml2YXRlIF9ub2RlOiBBamZOb2RlO1xuICBnZXQgbm9kZSgpOiBBamZOb2RlIHtcbiAgICByZXR1cm4gdGhpcy5fbm9kZTtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgbm9kZShub2RlOiBBamZOb2RlKSB7XG4gICAgdGhpcy5fbm9kZSA9IG5vZGU7XG4gICAgdGhpcy5fZm9udFNldCA9ICdhamYtaWNvbic7XG4gICAgdGhpcy5fZm9udEljb24gPSB0aGlzLl9nZXRGb250SWNvbihub2RlKTtcbiAgfVxuXG4gIHByaXZhdGUgX2dldEZvbnRJY29uKG5vZGU6IEFqZk5vZGUpOiBzdHJpbmcge1xuICAgIHN3aXRjaCAobm9kZS5ub2RlVHlwZSkge1xuICAgICAgY2FzZSBBamZOb2RlVHlwZS5BamZGaWVsZDpcbiAgICAgICAgY29uc3QgZmllbGRUeXBlID0gQWpmRmllbGRUeXBlWyg8QWpmRmllbGQ+bm9kZSkuZmllbGRUeXBlXTtcbiAgICAgICAgcmV0dXJuIGZpZWxkVHlwZSAhPSBudWxsID8gYGZpZWxkLSR7ZmllbGRUeXBlLnRvTG93ZXJDYXNlKCl9YCA6ICcnO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgY29uc3Qgbm9kZVR5cGUgPSBBamZOb2RlVHlwZVtub2RlLm5vZGVUeXBlXTtcbiAgICAgICAgcmV0dXJuIG5vZGVUeXBlICE9IG51bGwgPyBgbm9kZS0ke25vZGVUeXBlLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgnYWpmJywgJycpfWAgOiAnJztcbiAgICB9XG4gIH1cbn1cbiJdfQ==