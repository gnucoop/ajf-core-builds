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
import { TranslocoService } from '@ajf/core/transloco';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, ViewEncapsulation, } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as i0 from "@angular/core";
import * as i1 from "@angular/platform-browser";
import * as i2 from "@ajf/core/transloco";
import * as i3 from "@angular/common";
/**
 * this component manages the report text
 *
 * @export
 */
export class AjfTextComponent {
    constructor(_cdr, _domSanitizer, _ts) {
        this._cdr = _cdr;
        this._domSanitizer = _domSanitizer;
        this._ts = _ts;
    }
    set htmlText(htmlText) {
        // type checking and length checking for instant method
        const htmlTextToBeTranslate = htmlText != null && typeof htmlText === 'string' && htmlText.trim().length > 0
            ? this._ts.translate(htmlText)
            : htmlText;
        this._htmlText = this._domSanitizer.bypassSecurityTrustHtml(htmlTextToBeTranslate);
        this._cdr.markForCheck();
    }
    get innerHTML() {
        return this._htmlText;
    }
}
AjfTextComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfTextComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i1.DomSanitizer }, { token: i2.TranslocoService }], target: i0.ɵɵFactoryTarget.Component });
AjfTextComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.0-next.15", type: AjfTextComponent, selector: "ajf-text", inputs: { htmlText: "htmlText" }, ngImport: i0, template: "<div class=\"ajf-text-container\" *ngIf=\"innerHTML\" [innerHTML]=\"innerHTML\"></div>\n", styles: ["ajf-text .ajf-text-container{width:100%}ajf-text .ajf-text-container .ajf-ql-size-small{font-size:.75em}ajf-text .ajf-text-container .ajf-ql-size-large{font-size:1.5em}ajf-text .ajf-text-container .ajf-ql-size-huge{font-size:2.5em}ajf-text .ajf-text-container .ajf-ql-size-veryhuge{font-size:3.5em}ajf-text .ajf-text-container .ajf-ql-align-right{text-align:right}ajf-text .ajf-text-container .ajf-ql-align-center{text-align:center}ajf-text .ajf-text-container .ajf-ql-align-justify{text-align:justify}ajf-text .ajf-text-container h1,ajf-text .ajf-text-container h2,ajf-text .ajf-text-container h3,ajf-text .ajf-text-container h4,ajf-text .ajf-text-container h5,ajf-text .ajf-text-container h6{margin:0}\n"], directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfTextComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ajf-text', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"ajf-text-container\" *ngIf=\"innerHTML\" [innerHTML]=\"innerHTML\"></div>\n", styles: ["ajf-text .ajf-text-container{width:100%}ajf-text .ajf-text-container .ajf-ql-size-small{font-size:.75em}ajf-text .ajf-text-container .ajf-ql-size-large{font-size:1.5em}ajf-text .ajf-text-container .ajf-ql-size-huge{font-size:2.5em}ajf-text .ajf-text-container .ajf-ql-size-veryhuge{font-size:3.5em}ajf-text .ajf-text-container .ajf-ql-align-right{text-align:right}ajf-text .ajf-text-container .ajf-ql-align-center{text-align:center}ajf-text .ajf-text-container .ajf-ql-align-justify{text-align:justify}ajf-text .ajf-text-container h1,ajf-text .ajf-text-container h2,ajf-text .ajf-text-container h3,ajf-text .ajf-text-container h4,ajf-text .ajf-text-container h5,ajf-text .ajf-text-container h6{margin:0}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i1.DomSanitizer }, { type: i2.TranslocoService }]; }, propDecorators: { htmlText: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL3RleHQvdGV4dC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL3RleHQvdGV4dC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQ3JELE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxLQUFLLEVBQ0wsaUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxZQUFZLEVBQVcsTUFBTSwyQkFBMkIsQ0FBQzs7Ozs7QUFFakU7Ozs7R0FJRztBQVFILE1BQU0sT0FBTyxnQkFBZ0I7SUFvQjNCLFlBQ1UsSUFBdUIsRUFDdkIsYUFBMkIsRUFDM0IsR0FBcUI7UUFGckIsU0FBSSxHQUFKLElBQUksQ0FBbUI7UUFDdkIsa0JBQWEsR0FBYixhQUFhLENBQWM7UUFDM0IsUUFBRyxHQUFILEdBQUcsQ0FBa0I7SUFDNUIsQ0FBQztJQW5CSixJQUNJLFFBQVEsQ0FBQyxRQUFnQjtRQUMzQix1REFBdUQ7UUFDdkQsTUFBTSxxQkFBcUIsR0FDekIsUUFBUSxJQUFJLElBQUksSUFBSSxPQUFPLFFBQVEsS0FBSyxRQUFRLElBQUksUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDO1lBQzVFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUM7WUFDOUIsQ0FBQyxDQUFDLFFBQVEsQ0FBQztRQUNmLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyx1QkFBdUIsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQ25GLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVELElBQUksU0FBUztRQUNYLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDOztxSEFsQlUsZ0JBQWdCO3lHQUFoQixnQkFBZ0Isa0ZDNUM3QiwwRkFDQTttR0QyQ2EsZ0JBQWdCO2tCQVA1QixTQUFTOytCQUNFLFVBQVUsaUJBR0wsaUJBQWlCLENBQUMsSUFBSSxtQkFDcEIsdUJBQXVCLENBQUMsTUFBTTtrS0FRM0MsUUFBUTtzQkFEWCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge1RyYW5zbG9jb1NlcnZpY2V9IGZyb20gJ0BhamYvY29yZS90cmFuc2xvY28nO1xuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0RvbVNhbml0aXplciwgU2FmZUh0bWx9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG4vKipcbiAqIHRoaXMgY29tcG9uZW50IG1hbmFnZXMgdGhlIHJlcG9ydCB0ZXh0XG4gKlxuICogQGV4cG9ydFxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhamYtdGV4dCcsXG4gIHRlbXBsYXRlVXJsOiAndGV4dC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ3RleHQuY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBBamZUZXh0Q29tcG9uZW50IHtcbiAgLyoqXG4gICAqIEBtZW1iZXJPZiBUZXh0Q29tcG9uZW50XG4gICAqL1xuICBwcml2YXRlIF9odG1sVGV4dDogU2FmZUh0bWw7XG4gIEBJbnB1dCgpXG4gIHNldCBodG1sVGV4dChodG1sVGV4dDogc3RyaW5nKSB7XG4gICAgLy8gdHlwZSBjaGVja2luZyBhbmQgbGVuZ3RoIGNoZWNraW5nIGZvciBpbnN0YW50IG1ldGhvZFxuICAgIGNvbnN0IGh0bWxUZXh0VG9CZVRyYW5zbGF0ZTogc3RyaW5nID1cbiAgICAgIGh0bWxUZXh0ICE9IG51bGwgJiYgdHlwZW9mIGh0bWxUZXh0ID09PSAnc3RyaW5nJyAmJiBodG1sVGV4dC50cmltKCkubGVuZ3RoID4gMFxuICAgICAgICA/IHRoaXMuX3RzLnRyYW5zbGF0ZShodG1sVGV4dClcbiAgICAgICAgOiBodG1sVGV4dDtcbiAgICB0aGlzLl9odG1sVGV4dCA9IHRoaXMuX2RvbVNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0SHRtbChodG1sVGV4dFRvQmVUcmFuc2xhdGUpO1xuICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIGdldCBpbm5lckhUTUwoKTogU2FmZUh0bWwge1xuICAgIHJldHVybiB0aGlzLl9odG1sVGV4dDtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgX2NkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJpdmF0ZSBfZG9tU2FuaXRpemVyOiBEb21TYW5pdGl6ZXIsXG4gICAgcHJpdmF0ZSBfdHM6IFRyYW5zbG9jb1NlcnZpY2UsXG4gICkge31cbn1cbiIsIjxkaXYgY2xhc3M9XCJhamYtdGV4dC1jb250YWluZXJcIiAqbmdJZj1cImlubmVySFRNTFwiIFtpbm5lckhUTUxdPVwiaW5uZXJIVE1MXCI+PC9kaXY+XG4iXX0=