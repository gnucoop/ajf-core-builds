/**
 * @fileoverview added by tsickle
 * Generated from: src/core/common/apply-styles-directive.ts
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
import { Input, Directive, ElementRef, Renderer2 } from '@angular/core';
export class ApplyStylesDirective {
    /**
     * @param {?} _el
     * @param {?} _renderer
     */
    constructor(_el, _renderer) {
        this._el = _el;
        this._renderer = _renderer;
    }
    /**
     * @param {?} cssStyles
     * @return {?}
     */
    set applyStyles(cssStyles) {
        if (cssStyles != null && this._cssStyles !== cssStyles) {
            this._cssStyles = cssStyles;
            this._updateStyles();
        }
    }
    /**
     * @private
     * @return {?}
     */
    _updateStyles() {
        if (this._cssStyles == null) {
            return;
        }
        Object.keys(this._cssStyles).forEach((/**
         * @param {?} style
         * @return {?}
         */
        (style) => {
            try {
                this._renderer.setStyle(this._el.nativeElement, style, `${this._cssStyles[style]}`);
            }
            catch (e) { }
        }));
    }
}
ApplyStylesDirective.decorators = [
    { type: Directive, args: [{ selector: '[applyStyles]' },] }
];
/** @nocollapse */
ApplyStylesDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 }
];
ApplyStylesDirective.propDecorators = {
    applyStyles: [{ type: Input }]
};
if (false) {
    /**
     * @type {?}
     * @private
     */
    ApplyStylesDirective.prototype._cssStyles;
    /**
     * @type {?}
     * @private
     */
    ApplyStylesDirective.prototype._el;
    /**
     * @type {?}
     * @private
     */
    ApplyStylesDirective.prototype._renderer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbHktc3R5bGVzLWRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2NvbW1vbi9hcHBseS1zdHlsZXMtZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBLE9BQU8sRUFBQyxLQUFLLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFJdEUsTUFBTSxPQUFPLG9CQUFvQjs7Ozs7SUFVL0IsWUFBb0IsR0FBZSxFQUFVLFNBQW9CO1FBQTdDLFFBQUcsR0FBSCxHQUFHLENBQVk7UUFBVSxjQUFTLEdBQVQsU0FBUyxDQUFXO0lBQUksQ0FBQzs7Ozs7SUFSdEUsSUFDSSxXQUFXLENBQUMsU0FBeUM7UUFDdkQsSUFBSSxTQUFTLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssU0FBUyxFQUFFO1lBQ3RELElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO1lBQzVCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUN0QjtJQUNILENBQUM7Ozs7O0lBSU8sYUFBYTtRQUNuQixJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxFQUFFO1lBQzNCLE9BQU87U0FDUjtRQUVELE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE9BQU87Ozs7UUFBQyxDQUFDLEtBQWEsRUFBRSxFQUFFO1lBQ3JELElBQUk7Z0JBQ0YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQ3JCLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUN0QixLQUFLLEVBQ0wsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQzVCLENBQUM7YUFDSDtZQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUc7UUFDakIsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDOzs7WUEzQkYsU0FBUyxTQUFDLEVBQUUsUUFBUSxFQUFFLGVBQWUsRUFBRTs7OztZQUhkLFVBQVU7WUFBRSxTQUFTOzs7MEJBTTVDLEtBQUs7Ozs7Ozs7SUFETiwwQ0FBOEM7Ozs7O0lBU2xDLG1DQUF1Qjs7Ozs7SUFBRSx5Q0FBNEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7SW5wdXQsIERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgUmVuZGVyZXIyfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdbYXBwbHlTdHlsZXNdJyB9KVxuZXhwb3J0IGNsYXNzIEFwcGx5U3R5bGVzRGlyZWN0aXZlIHtcbiAgcHJpdmF0ZSBfY3NzU3R5bGVzOiB7IFtzdHlsZTogc3RyaW5nXTogYW55OyB9O1xuICBASW5wdXQoKVxuICBzZXQgYXBwbHlTdHlsZXMoY3NzU3R5bGVzOiB7IFtzdHlsZTogc3RyaW5nXTogYW55OyB9fG51bGwpIHtcbiAgICBpZiAoY3NzU3R5bGVzICE9IG51bGwgJiYgdGhpcy5fY3NzU3R5bGVzICE9PSBjc3NTdHlsZXMpIHtcbiAgICAgIHRoaXMuX2Nzc1N0eWxlcyA9IGNzc1N0eWxlcztcbiAgICAgIHRoaXMuX3VwZGF0ZVN0eWxlcygpO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2VsOiBFbGVtZW50UmVmLCBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyKSB7IH1cblxuICBwcml2YXRlIF91cGRhdGVTdHlsZXMoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2Nzc1N0eWxlcyA9PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgT2JqZWN0LmtleXModGhpcy5fY3NzU3R5bGVzKS5mb3JFYWNoKChzdHlsZTogc3RyaW5nKSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZShcbiAgICAgICAgICB0aGlzLl9lbC5uYXRpdmVFbGVtZW50LFxuICAgICAgICAgIHN0eWxlLFxuICAgICAgICAgIGAke3RoaXMuX2Nzc1N0eWxlc1tzdHlsZV19YFxuICAgICAgICApO1xuICAgICAgfSBjYXRjaCAoZSkgeyB9XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==