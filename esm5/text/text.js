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
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
/**
 * this component manages the report text
 *
 * @export
 */
var AjfTextComponent = /** @class */ (function () {
    function AjfTextComponent(_cdr, _domSanitizer, _ts) {
        this._cdr = _cdr;
        this._domSanitizer = _domSanitizer;
        this._ts = _ts;
    }
    Object.defineProperty(AjfTextComponent.prototype, "htmlText", {
        set: function (htmlText) {
            // type checking and length checking for instant method
            var htmlTextToBeTranslate = htmlText != null && typeof htmlText === 'string' && htmlText.trim().length > 0
                ? this._ts.instant(htmlText) : htmlText;
            this._htmlText = this._domSanitizer.bypassSecurityTrustHtml(htmlTextToBeTranslate);
            this._cdr.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfTextComponent.prototype, "innerHTML", {
        get: function () { return this._htmlText; },
        enumerable: true,
        configurable: true
    });
    AjfTextComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ajf-text',
                    template: "<div class=\"ajf-text-container\" *ngIf=\"innerHTML\" [innerHTML]=\"innerHTML\"></div>\n",
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: ["ajf-text .ajf-text-container{width:100%}ajf-text .ajf-text-container .ajf-ql-size-small{font-size:.75em}ajf-text .ajf-text-container .ajf-ql-size-large{font-size:1.5em}ajf-text .ajf-text-container .ajf-ql-size-huge{font-size:2.5em}ajf-text .ajf-text-container .ajf-ql-size-veryhuge{font-size:3.5em}ajf-text .ajf-text-container .ajf-ql-align-right{text-align:right}ajf-text .ajf-text-container .ajf-ql-align-center{text-align:center}ajf-text .ajf-text-container .ajf-ql-align-justify{text-align:justify}ajf-text .ajf-text-container h1,ajf-text .ajf-text-container h2,ajf-text .ajf-text-container h3,ajf-text .ajf-text-container h4,ajf-text .ajf-text-container h5,ajf-text .ajf-text-container h6{margin:0}\n"]
                }] }
    ];
    /** @nocollapse */
    AjfTextComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: DomSanitizer },
        { type: TranslateService }
    ]; };
    AjfTextComponent.propDecorators = {
        htmlText: [{ type: Input }]
    };
    return AjfTextComponent;
}());
export { AjfTextComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL3RleHQvdGV4dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQ0wsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFDaEYsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLFlBQVksRUFBVyxNQUFNLDJCQUEyQixDQUFDO0FBRWpFLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBRXJEOzs7O0dBSUc7QUFDSDtJQXlCRSwwQkFDVSxJQUF1QixFQUN2QixhQUEyQixFQUMzQixHQUFxQjtRQUZyQixTQUFJLEdBQUosSUFBSSxDQUFtQjtRQUN2QixrQkFBYSxHQUFiLGFBQWEsQ0FBYztRQUMzQixRQUFHLEdBQUgsR0FBRyxDQUFrQjtJQUMzQixDQUFDO0lBaEJMLHNCQUNJLHNDQUFRO2FBRFosVUFDYSxRQUFnQjtZQUMzQix1REFBdUQ7WUFDdkQsSUFBTSxxQkFBcUIsR0FDekIsUUFBUSxJQUFJLElBQUksSUFBSSxPQUFPLFFBQVEsS0FBSyxRQUFRLElBQUksUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDO2dCQUM1RSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztZQUM1QyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsdUJBQXVCLENBQUMscUJBQXFCLENBQUMsQ0FBQztZQUNuRixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQzNCLENBQUM7OztPQUFBO0lBRUQsc0JBQUksdUNBQVM7YUFBYixjQUE0QixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTs7Z0JBdkJyRCxTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLFVBQVU7b0JBQ3BCLG9HQUF3QjtvQkFFeEIsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOztpQkFDaEQ7Ozs7Z0JBakIwQixpQkFBaUI7Z0JBRXBDLFlBQVk7Z0JBRVosZ0JBQWdCOzs7MkJBb0JyQixLQUFLOztJQWlCUix1QkFBQztDQUFBLEFBOUJELElBOEJDO1NBdkJZLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIElucHV0LCBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RG9tU2FuaXRpemVyLCBTYWZlSHRtbH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5cbmltcG9ydCB7VHJhbnNsYXRlU2VydmljZX0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5cbi8qKlxuICogdGhpcyBjb21wb25lbnQgbWFuYWdlcyB0aGUgcmVwb3J0IHRleHRcbiAqXG4gKiBAZXhwb3J0XG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FqZi10ZXh0JyxcbiAgdGVtcGxhdGVVcmw6ICd0ZXh0Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsndGV4dC5jc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgQWpmVGV4dENvbXBvbmVudCB7XG5cbiAgLyoqXG4gICAqIEBtZW1iZXJPZiBUZXh0Q29tcG9uZW50XG4gICAqL1xuICBwcml2YXRlIF9odG1sVGV4dDogU2FmZUh0bWw7XG4gIEBJbnB1dCgpXG4gIHNldCBodG1sVGV4dChodG1sVGV4dDogc3RyaW5nKSB7XG4gICAgLy8gdHlwZSBjaGVja2luZyBhbmQgbGVuZ3RoIGNoZWNraW5nIGZvciBpbnN0YW50IG1ldGhvZFxuICAgIGNvbnN0IGh0bWxUZXh0VG9CZVRyYW5zbGF0ZTogc3RyaW5nID1cbiAgICAgIGh0bWxUZXh0ICE9IG51bGwgJiYgdHlwZW9mIGh0bWxUZXh0ID09PSAnc3RyaW5nJyAmJiBodG1sVGV4dC50cmltKCkubGVuZ3RoID4gMFxuICAgICAgICA/IHRoaXMuX3RzLmluc3RhbnQoaHRtbFRleHQpIDogaHRtbFRleHQ7XG4gICAgdGhpcy5faHRtbFRleHQgPSB0aGlzLl9kb21TYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdEh0bWwoaHRtbFRleHRUb0JlVHJhbnNsYXRlKTtcbiAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBnZXQgaW5uZXJIVE1MKCk6IFNhZmVIdG1sIHsgcmV0dXJuIHRoaXMuX2h0bWxUZXh0OyB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcml2YXRlIF9kb21TYW5pdGl6ZXI6IERvbVNhbml0aXplcixcbiAgICBwcml2YXRlIF90czogVHJhbnNsYXRlU2VydmljZVxuICApIHsgfVxufVxuIl19