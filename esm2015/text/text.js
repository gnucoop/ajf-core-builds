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
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
/**
 * this component manages the report text
 *
 * @export
 */
let AjfTextComponent = /** @class */ (() => {
    let AjfTextComponent = class AjfTextComponent {
        constructor(_cdr, _domSanitizer, _ts) {
            this._cdr = _cdr;
            this._domSanitizer = _domSanitizer;
            this._ts = _ts;
        }
        set htmlText(htmlText) {
            // type checking and length checking for instant method
            const htmlTextToBeTranslate = htmlText != null && typeof htmlText === 'string' && htmlText.trim().length > 0 ?
                this._ts.instant(htmlText) :
                htmlText;
            this._htmlText = this._domSanitizer.bypassSecurityTrustHtml(htmlTextToBeTranslate);
            this._cdr.markForCheck();
        }
        get innerHTML() {
            return this._htmlText;
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], AjfTextComponent.prototype, "htmlText", null);
    AjfTextComponent = __decorate([
        Component({
            selector: 'ajf-text',
            template: "<div class=\"ajf-text-container\" *ngIf=\"innerHTML\" [innerHTML]=\"innerHTML\"></div>\n",
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: ["ajf-text .ajf-text-container{width:100%}ajf-text .ajf-text-container .ajf-ql-size-small{font-size:.75em}ajf-text .ajf-text-container .ajf-ql-size-large{font-size:1.5em}ajf-text .ajf-text-container .ajf-ql-size-huge{font-size:2.5em}ajf-text .ajf-text-container .ajf-ql-size-veryhuge{font-size:3.5em}ajf-text .ajf-text-container .ajf-ql-align-right{text-align:right}ajf-text .ajf-text-container .ajf-ql-align-center{text-align:center}ajf-text .ajf-text-container .ajf-ql-align-justify{text-align:justify}ajf-text .ajf-text-container h1,ajf-text .ajf-text-container h2,ajf-text .ajf-text-container h3,ajf-text .ajf-text-container h4,ajf-text .ajf-text-container h5,ajf-text .ajf-text-container h6{margin:0}\n"]
        }),
        __metadata("design:paramtypes", [ChangeDetectorRef, DomSanitizer,
            TranslateService])
    ], AjfTextComponent);
    return AjfTextComponent;
})();
export { AjfTextComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL3RleHQvdGV4dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7O0FBRUgsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULEtBQUssRUFDTCxpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLFlBQVksRUFBVyxNQUFNLDJCQUEyQixDQUFDO0FBRWpFLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBRXJEOzs7O0dBSUc7QUFRSDtJQUFBLElBQWEsZ0JBQWdCLEdBQTdCLE1BQWEsZ0JBQWdCO1FBb0IzQixZQUNZLElBQXVCLEVBQVUsYUFBMkIsRUFDNUQsR0FBcUI7WUFEckIsU0FBSSxHQUFKLElBQUksQ0FBbUI7WUFBVSxrQkFBYSxHQUFiLGFBQWEsQ0FBYztZQUM1RCxRQUFHLEdBQUgsR0FBRyxDQUFrQjtRQUFHLENBQUM7UUFoQnJDLElBQUksUUFBUSxDQUFDLFFBQWdCO1lBQzNCLHVEQUF1RDtZQUN2RCxNQUFNLHFCQUFxQixHQUN2QixRQUFRLElBQUksSUFBSSxJQUFJLE9BQU8sUUFBUSxLQUFLLFFBQVEsSUFBSSxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNoRixJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUM1QixRQUFRLENBQUM7WUFDYixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsdUJBQXVCLENBQUMscUJBQXFCLENBQUMsQ0FBQztZQUNuRixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQzNCLENBQUM7UUFFRCxJQUFJLFNBQVM7WUFDWCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDeEIsQ0FBQztLQUtGLENBQUE7SUFqQkM7UUFEQyxLQUFLLEVBQUU7OztvREFTUDtJQWRVLGdCQUFnQjtRQVA1QixTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsVUFBVTtZQUNwQixvR0FBd0I7WUFFeEIsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7WUFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O1NBQ2hELENBQUM7eUNBc0JrQixpQkFBaUIsRUFBeUIsWUFBWTtZQUN2RCxnQkFBZ0I7T0F0QnRCLGdCQUFnQixDQXVCNUI7SUFBRCx1QkFBQztLQUFBO1NBdkJZLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RG9tU2FuaXRpemVyLCBTYWZlSHRtbH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5cbmltcG9ydCB7VHJhbnNsYXRlU2VydmljZX0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5cbi8qKlxuICogdGhpcyBjb21wb25lbnQgbWFuYWdlcyB0aGUgcmVwb3J0IHRleHRcbiAqXG4gKiBAZXhwb3J0XG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FqZi10ZXh0JyxcbiAgdGVtcGxhdGVVcmw6ICd0ZXh0Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsndGV4dC5jc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgQWpmVGV4dENvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBAbWVtYmVyT2YgVGV4dENvbXBvbmVudFxuICAgKi9cbiAgcHJpdmF0ZSBfaHRtbFRleHQ6IFNhZmVIdG1sO1xuICBASW5wdXQoKVxuICBzZXQgaHRtbFRleHQoaHRtbFRleHQ6IHN0cmluZykge1xuICAgIC8vIHR5cGUgY2hlY2tpbmcgYW5kIGxlbmd0aCBjaGVja2luZyBmb3IgaW5zdGFudCBtZXRob2RcbiAgICBjb25zdCBodG1sVGV4dFRvQmVUcmFuc2xhdGU6IHN0cmluZyA9XG4gICAgICAgIGh0bWxUZXh0ICE9IG51bGwgJiYgdHlwZW9mIGh0bWxUZXh0ID09PSAnc3RyaW5nJyAmJiBodG1sVGV4dC50cmltKCkubGVuZ3RoID4gMCA/XG4gICAgICAgIHRoaXMuX3RzLmluc3RhbnQoaHRtbFRleHQpIDpcbiAgICAgICAgaHRtbFRleHQ7XG4gICAgdGhpcy5faHRtbFRleHQgPSB0aGlzLl9kb21TYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdEh0bWwoaHRtbFRleHRUb0JlVHJhbnNsYXRlKTtcbiAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBnZXQgaW5uZXJIVE1MKCk6IFNhZmVIdG1sIHtcbiAgICByZXR1cm4gdGhpcy5faHRtbFRleHQ7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgX2NkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsIHByaXZhdGUgX2RvbVNhbml0aXplcjogRG9tU2FuaXRpemVyLFxuICAgICAgcHJpdmF0ZSBfdHM6IFRyYW5zbGF0ZVNlcnZpY2UpIHt9XG59XG4iXX0=