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
import { __decorate, __metadata } from "tslib";
import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
let ApplyStylesDirective = /** @class */ (() => {
    let ApplyStylesDirective = class ApplyStylesDirective {
        constructor(_el, _renderer) {
            this._el = _el;
            this._renderer = _renderer;
        }
        set applyStyles(cssStyles) {
            if (cssStyles != null && this._cssStyles !== cssStyles) {
                this._cssStyles = cssStyles;
                this._updateStyles();
            }
        }
        _updateStyles() {
            if (this._cssStyles == null) {
                return;
            }
            Object.keys(this._cssStyles).forEach((style) => {
                try {
                    this._renderer.setStyle(this._el.nativeElement, style, `${this._cssStyles[style]}`);
                }
                catch (e) {
                }
            });
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], ApplyStylesDirective.prototype, "applyStyles", null);
    ApplyStylesDirective = __decorate([
        Directive({ selector: '[applyStyles]' }),
        __metadata("design:paramtypes", [ElementRef, Renderer2])
    ], ApplyStylesDirective);
    return ApplyStylesDirective;
})();
export { ApplyStylesDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbHktc3R5bGVzLWRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2NvbW1vbi9hcHBseS1zdHlsZXMtZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRzs7QUFFSCxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBSXRFO0lBQUEsSUFBYSxvQkFBb0IsR0FBakMsTUFBYSxvQkFBb0I7UUFVL0IsWUFBb0IsR0FBZSxFQUFVLFNBQW9CO1lBQTdDLFFBQUcsR0FBSCxHQUFHLENBQVk7WUFBVSxjQUFTLEdBQVQsU0FBUyxDQUFXO1FBQUcsQ0FBQztRQVByRSxJQUFJLFdBQVcsQ0FBQyxTQUFzQztZQUNwRCxJQUFJLFNBQVMsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLFVBQVUsS0FBSyxTQUFTLEVBQUU7Z0JBQ3RELElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO2dCQUM1QixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7YUFDdEI7UUFDSCxDQUFDO1FBSU8sYUFBYTtZQUNuQixJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxFQUFFO2dCQUMzQixPQUFPO2FBQ1I7WUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFhLEVBQUUsRUFBRTtnQkFDckQsSUFBSTtvQkFDRixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxLQUFLLEVBQUUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztpQkFDckY7Z0JBQUMsT0FBTyxDQUFDLEVBQUU7aUJBQ1g7WUFDSCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7S0FDRixDQUFBO0lBckJDO1FBREMsS0FBSyxFQUFFOzs7MkRBTVA7SUFSVSxvQkFBb0I7UUFEaEMsU0FBUyxDQUFDLEVBQUMsUUFBUSxFQUFFLGVBQWUsRUFBQyxDQUFDO3lDQVdaLFVBQVUsRUFBcUIsU0FBUztPQVZ0RCxvQkFBb0IsQ0F3QmhDO0lBQUQsMkJBQUM7S0FBQTtTQXhCWSxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7RGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbnB1dCwgUmVuZGVyZXIyfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuXG5ARGlyZWN0aXZlKHtzZWxlY3RvcjogJ1thcHBseVN0eWxlc10nfSlcbmV4cG9ydCBjbGFzcyBBcHBseVN0eWxlc0RpcmVjdGl2ZSB7XG4gIHByaXZhdGUgX2Nzc1N0eWxlczoge1tzdHlsZTogc3RyaW5nXTogYW55fTtcbiAgQElucHV0KClcbiAgc2V0IGFwcGx5U3R5bGVzKGNzc1N0eWxlczoge1tzdHlsZTogc3RyaW5nXTogYW55fXxudWxsKSB7XG4gICAgaWYgKGNzc1N0eWxlcyAhPSBudWxsICYmIHRoaXMuX2Nzc1N0eWxlcyAhPT0gY3NzU3R5bGVzKSB7XG4gICAgICB0aGlzLl9jc3NTdHlsZXMgPSBjc3NTdHlsZXM7XG4gICAgICB0aGlzLl91cGRhdGVTdHlsZXMoKTtcbiAgICB9XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9lbDogRWxlbWVudFJlZiwgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMikge31cblxuICBwcml2YXRlIF91cGRhdGVTdHlsZXMoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2Nzc1N0eWxlcyA9PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgT2JqZWN0LmtleXModGhpcy5fY3NzU3R5bGVzKS5mb3JFYWNoKChzdHlsZTogc3RyaW5nKSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9lbC5uYXRpdmVFbGVtZW50LCBzdHlsZSwgYCR7dGhpcy5fY3NzU3R5bGVzW3N0eWxlXX1gKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuIl19