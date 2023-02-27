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
import * as i0 from "@angular/core";
export class AjfNodeIcon {
    constructor() {
        this._fontSet = '';
        this._fontIcon = '';
    }
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
        if (node == null) {
            return '';
        }
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
AjfNodeIcon.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfNodeIcon, deps: [], target: i0.ɵɵFactoryTarget.Directive });
AjfNodeIcon.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.4", type: AjfNodeIcon, inputs: { node: "node" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfNodeIcon, decorators: [{
            type: Directive
        }], propDecorators: { node: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS1pY29uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9ub2RlLWljb24vc3JjL25vZGUtaWNvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQVcsWUFBWSxFQUFXLFdBQVcsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdFLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFDLE1BQU0sZUFBZSxDQUFDOztBQUcvQyxNQUFNLE9BQWdCLFdBQVc7SUFEakM7UUFFVSxhQUFRLEdBQVcsRUFBRSxDQUFDO1FBS3RCLGNBQVMsR0FBVyxFQUFFLENBQUM7S0E2QmhDO0lBakNDLElBQUksT0FBTztRQUNULE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDO0lBR0QsSUFBSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3hCLENBQUM7SUFHRCxJQUFJLElBQUk7UUFDTixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDcEIsQ0FBQztJQUNELElBQ0ksSUFBSSxDQUFDLElBQXlCO1FBQ2hDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDO1FBQzNCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRU8sWUFBWSxDQUFDLElBQXlCO1FBQzVDLElBQUksSUFBSSxJQUFJLElBQUksRUFBRTtZQUNoQixPQUFPLEVBQUUsQ0FBQztTQUNYO1FBQ0QsUUFBUSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ3JCLEtBQUssV0FBVyxDQUFDLFFBQVE7Z0JBQ3ZCLE1BQU0sU0FBUyxHQUFHLFlBQVksQ0FBWSxJQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQzNELE9BQU8sU0FBUyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsU0FBUyxTQUFTLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQ3JFO2dCQUNFLE1BQU0sUUFBUSxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQzVDLE9BQU8sUUFBUSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7U0FDdEY7SUFDSCxDQUFDOzt3R0FsQ21CLFdBQVc7NEZBQVgsV0FBVzsyRkFBWCxXQUFXO2tCQURoQyxTQUFTOzhCQWlCSixJQUFJO3NCQURQLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmRmllbGQsIEFqZkZpZWxkVHlwZSwgQWpmTm9kZSwgQWpmTm9kZVR5cGV9IGZyb20gJ0BhamYvY29yZS9mb3Jtcyc7XG5pbXBvcnQge0RpcmVjdGl2ZSwgSW5wdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ARGlyZWN0aXZlKClcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBamZOb2RlSWNvbiB7XG4gIHByaXZhdGUgX2ZvbnRTZXQ6IHN0cmluZyA9ICcnO1xuICBnZXQgZm9udFNldCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9mb250U2V0O1xuICB9XG5cbiAgcHJpdmF0ZSBfZm9udEljb246IHN0cmluZyA9ICcnO1xuICBnZXQgZm9udEljb24oKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fZm9udEljb247XG4gIH1cblxuICBwcml2YXRlIF9ub2RlOiBBamZOb2RlIHwgdW5kZWZpbmVkO1xuICBnZXQgbm9kZSgpOiBBamZOb2RlIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5fbm9kZTtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgbm9kZShub2RlOiBBamZOb2RlIHwgdW5kZWZpbmVkKSB7XG4gICAgdGhpcy5fbm9kZSA9IG5vZGU7XG4gICAgdGhpcy5fZm9udFNldCA9ICdhamYtaWNvbic7XG4gICAgdGhpcy5fZm9udEljb24gPSB0aGlzLl9nZXRGb250SWNvbihub2RlKTtcbiAgfVxuXG4gIHByaXZhdGUgX2dldEZvbnRJY29uKG5vZGU6IEFqZk5vZGUgfCB1bmRlZmluZWQpOiBzdHJpbmcge1xuICAgIGlmIChub2RlID09IG51bGwpIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgc3dpdGNoIChub2RlLm5vZGVUeXBlKSB7XG4gICAgICBjYXNlIEFqZk5vZGVUeXBlLkFqZkZpZWxkOlxuICAgICAgICBjb25zdCBmaWVsZFR5cGUgPSBBamZGaWVsZFR5cGVbKDxBamZGaWVsZD5ub2RlKS5maWVsZFR5cGVdO1xuICAgICAgICByZXR1cm4gZmllbGRUeXBlICE9IG51bGwgPyBgZmllbGQtJHtmaWVsZFR5cGUudG9Mb3dlckNhc2UoKX1gIDogJyc7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBjb25zdCBub2RlVHlwZSA9IEFqZk5vZGVUeXBlW25vZGUubm9kZVR5cGVdO1xuICAgICAgICByZXR1cm4gbm9kZVR5cGUgIT0gbnVsbCA/IGBub2RlLSR7bm9kZVR5cGUudG9Mb3dlckNhc2UoKS5yZXBsYWNlKCdhamYnLCAnJyl9YCA6ICcnO1xuICAgIH1cbiAgfVxufVxuIl19