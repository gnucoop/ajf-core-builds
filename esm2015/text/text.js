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
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
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
        const htmlTextToBeTranslate = htmlText != null && typeof htmlText === 'string' && htmlText.trim().length > 0 ?
            this._ts.translate(htmlText) :
            htmlText;
        this._htmlText = this._domSanitizer.bypassSecurityTrustHtml(htmlTextToBeTranslate);
        this._cdr.markForCheck();
    }
    get innerHTML() {
        return this._htmlText;
    }
}
AjfTextComponent.decorators = [
    { type: Component, args: [{
                selector: 'ajf-text',
                template: "<div class=\"ajf-text-container\" *ngIf=\"innerHTML\" [innerHTML]=\"innerHTML\"></div>\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["ajf-text .ajf-text-container{width:100%}ajf-text .ajf-text-container .ajf-ql-size-small{font-size:.75em}ajf-text .ajf-text-container .ajf-ql-size-large{font-size:1.5em}ajf-text .ajf-text-container .ajf-ql-size-huge{font-size:2.5em}ajf-text .ajf-text-container .ajf-ql-size-veryhuge{font-size:3.5em}ajf-text .ajf-text-container .ajf-ql-align-right{text-align:right}ajf-text .ajf-text-container .ajf-ql-align-center{text-align:center}ajf-text .ajf-text-container .ajf-ql-align-justify{text-align:justify}ajf-text .ajf-text-container h1,ajf-text .ajf-text-container h2,ajf-text .ajf-text-container h3,ajf-text .ajf-text-container h4,ajf-text .ajf-text-container h5,ajf-text .ajf-text-container h6{margin:0}\n"]
            },] }
];
AjfTextComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: DomSanitizer },
    { type: TranslocoService }
];
AjfTextComponent.propDecorators = {
    htmlText: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL3RleHQvdGV4dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUNyRCxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsS0FBSyxFQUNMLGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsWUFBWSxFQUFXLE1BQU0sMkJBQTJCLENBQUM7QUFFakU7Ozs7R0FJRztBQVFILE1BQU0sT0FBTyxnQkFBZ0I7SUFvQjNCLFlBQ1ksSUFBdUIsRUFBVSxhQUEyQixFQUM1RCxHQUFxQjtRQURyQixTQUFJLEdBQUosSUFBSSxDQUFtQjtRQUFVLGtCQUFhLEdBQWIsYUFBYSxDQUFjO1FBQzVELFFBQUcsR0FBSCxHQUFHLENBQWtCO0lBQUcsQ0FBQztJQWpCckMsSUFDSSxRQUFRLENBQUMsUUFBZ0I7UUFDM0IsdURBQXVEO1FBQ3ZELE1BQU0scUJBQXFCLEdBQ3ZCLFFBQVEsSUFBSSxJQUFJLElBQUksT0FBTyxRQUFRLEtBQUssUUFBUSxJQUFJLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDaEYsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUM5QixRQUFRLENBQUM7UUFDYixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsdUJBQXVCLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUNuRixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRCxJQUFJLFNBQVM7UUFDWCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDeEIsQ0FBQzs7O1lBekJGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsVUFBVTtnQkFDcEIsb0dBQXdCO2dCQUV4QixhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2hEOzs7WUFsQkMsaUJBQWlCO1lBS1gsWUFBWTtZQVJaLGdCQUFnQjs7O3VCQTJCckIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtUcmFuc2xvY29TZXJ2aWNlfSBmcm9tICdAYWpmL2NvcmUvdHJhbnNsb2NvJztcbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0RvbVNhbml0aXplciwgU2FmZUh0bWx9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG4vKipcbiAqIHRoaXMgY29tcG9uZW50IG1hbmFnZXMgdGhlIHJlcG9ydCB0ZXh0XG4gKlxuICogQGV4cG9ydFxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhamYtdGV4dCcsXG4gIHRlbXBsYXRlVXJsOiAndGV4dC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ3RleHQuY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIEFqZlRleHRDb21wb25lbnQge1xuICAvKipcbiAgICogQG1lbWJlck9mIFRleHRDb21wb25lbnRcbiAgICovXG4gIHByaXZhdGUgX2h0bWxUZXh0OiBTYWZlSHRtbDtcbiAgQElucHV0KClcbiAgc2V0IGh0bWxUZXh0KGh0bWxUZXh0OiBzdHJpbmcpIHtcbiAgICAvLyB0eXBlIGNoZWNraW5nIGFuZCBsZW5ndGggY2hlY2tpbmcgZm9yIGluc3RhbnQgbWV0aG9kXG4gICAgY29uc3QgaHRtbFRleHRUb0JlVHJhbnNsYXRlOiBzdHJpbmcgPVxuICAgICAgICBodG1sVGV4dCAhPSBudWxsICYmIHR5cGVvZiBodG1sVGV4dCA9PT0gJ3N0cmluZycgJiYgaHRtbFRleHQudHJpbSgpLmxlbmd0aCA+IDAgP1xuICAgICAgICB0aGlzLl90cy50cmFuc2xhdGUoaHRtbFRleHQpIDpcbiAgICAgICAgaHRtbFRleHQ7XG4gICAgdGhpcy5faHRtbFRleHQgPSB0aGlzLl9kb21TYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdEh0bWwoaHRtbFRleHRUb0JlVHJhbnNsYXRlKTtcbiAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBnZXQgaW5uZXJIVE1MKCk6IFNhZmVIdG1sIHtcbiAgICByZXR1cm4gdGhpcy5faHRtbFRleHQ7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgX2NkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsIHByaXZhdGUgX2RvbVNhbml0aXplcjogRG9tU2FuaXRpemVyLFxuICAgICAgcHJpdmF0ZSBfdHM6IFRyYW5zbG9jb1NlcnZpY2UpIHt9XG59XG4iXX0=