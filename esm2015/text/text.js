/**
 * @fileoverview added by tsickle
 * Generated from: src/core/text/text.ts
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
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
/**
 * this component manages the report text
 *
 * @export
 */
export class AjfTextComponent {
    /**
     * @param {?} _cdr
     * @param {?} _domSanitizer
     * @param {?} _ts
     */
    constructor(_cdr, _domSanitizer, _ts) {
        this._cdr = _cdr;
        this._domSanitizer = _domSanitizer;
        this._ts = _ts;
    }
    /**
     * @param {?} htmlText
     * @return {?}
     */
    set htmlText(htmlText) {
        // type checking and length checking for instant method
        /** @type {?} */
        const htmlTextToBeTranslate = htmlText != null && typeof htmlText === 'string' && htmlText.trim().length > 0
            ? this._ts.instant(htmlText) : htmlText;
        this._htmlText = this._domSanitizer.bypassSecurityTrustHtml(htmlTextToBeTranslate);
        this._cdr.markForCheck();
    }
    /**
     * @return {?}
     */
    get innerHTML() { return this._htmlText; }
}
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
AjfTextComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: DomSanitizer },
    { type: TranslateService }
];
AjfTextComponent.propDecorators = {
    htmlText: [{ type: Input }]
};
if (false) {
    /**
     * \@memberOf TextComponent
     * @type {?}
     * @private
     */
    AjfTextComponent.prototype._htmlText;
    /**
     * @type {?}
     * @private
     */
    AjfTextComponent.prototype._cdr;
    /**
     * @type {?}
     * @private
     */
    AjfTextComponent.prototype._domSanitizer;
    /**
     * @type {?}
     * @private
     */
    AjfTextComponent.prototype._ts;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL3RleHQvdGV4dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCQSxPQUFPLEVBQ0wsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFDaEYsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLFlBQVksRUFBVyxNQUFNLDJCQUEyQixDQUFDO0FBRWpFLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHFCQUFxQixDQUFDOzs7Ozs7QUFjckQsTUFBTSxPQUFPLGdCQUFnQjs7Ozs7O0lBa0IzQixZQUNVLElBQXVCLEVBQ3ZCLGFBQTJCLEVBQzNCLEdBQXFCO1FBRnJCLFNBQUksR0FBSixJQUFJLENBQW1CO1FBQ3ZCLGtCQUFhLEdBQWIsYUFBYSxDQUFjO1FBQzNCLFFBQUcsR0FBSCxHQUFHLENBQWtCO0lBQzNCLENBQUM7Ozs7O0lBaEJMLElBQ0ksUUFBUSxDQUFDLFFBQWdCOzs7Y0FFckIscUJBQXFCLEdBQ3pCLFFBQVEsSUFBSSxJQUFJLElBQUksT0FBTyxRQUFRLEtBQUssUUFBUSxJQUFJLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxNQUFNLEdBQUcsQ0FBQztZQUM1RSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVE7UUFDM0MsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLHVCQUF1QixDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDbkYsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUMzQixDQUFDOzs7O0lBRUQsSUFBSSxTQUFTLEtBQWUsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzs7O1lBdkJyRCxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLFVBQVU7Z0JBQ3BCLG9HQUF3QjtnQkFFeEIsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNoRDs7OztZQWpCMEIsaUJBQWlCO1lBRXBDLFlBQVk7WUFFWixnQkFBZ0I7Ozt1QkFvQnJCLEtBQUs7Ozs7Ozs7O0lBRE4scUNBQTRCOzs7OztJQWMxQixnQ0FBK0I7Ozs7O0lBQy9CLHlDQUFtQzs7Ozs7SUFDbkMsK0JBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgSW5wdXQsIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtEb21TYW5pdGl6ZXIsIFNhZmVIdG1sfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcblxuaW1wb3J0IHtUcmFuc2xhdGVTZXJ2aWNlfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcblxuLyoqXG4gKiB0aGlzIGNvbXBvbmVudCBtYW5hZ2VzIHRoZSByZXBvcnQgdGV4dFxuICpcbiAqIEBleHBvcnRcbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWpmLXRleHQnLFxuICB0ZW1wbGF0ZVVybDogJ3RleHQuaHRtbCcsXG4gIHN0eWxlVXJsczogWyd0ZXh0LmNzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBBamZUZXh0Q29tcG9uZW50IHtcblxuICAvKipcbiAgICogQG1lbWJlck9mIFRleHRDb21wb25lbnRcbiAgICovXG4gIHByaXZhdGUgX2h0bWxUZXh0OiBTYWZlSHRtbDtcbiAgQElucHV0KClcbiAgc2V0IGh0bWxUZXh0KGh0bWxUZXh0OiBzdHJpbmcpIHtcbiAgICAvLyB0eXBlIGNoZWNraW5nIGFuZCBsZW5ndGggY2hlY2tpbmcgZm9yIGluc3RhbnQgbWV0aG9kXG4gICAgY29uc3QgaHRtbFRleHRUb0JlVHJhbnNsYXRlOiBzdHJpbmcgPVxuICAgICAgaHRtbFRleHQgIT0gbnVsbCAmJiB0eXBlb2YgaHRtbFRleHQgPT09ICdzdHJpbmcnICYmIGh0bWxUZXh0LnRyaW0oKS5sZW5ndGggPiAwXG4gICAgICAgID8gdGhpcy5fdHMuaW5zdGFudChodG1sVGV4dCkgOiBodG1sVGV4dDtcbiAgICB0aGlzLl9odG1sVGV4dCA9IHRoaXMuX2RvbVNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0SHRtbChodG1sVGV4dFRvQmVUcmFuc2xhdGUpO1xuICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIGdldCBpbm5lckhUTUwoKTogU2FmZUh0bWwgeyByZXR1cm4gdGhpcy5faHRtbFRleHQ7IH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIF9jZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByaXZhdGUgX2RvbVNhbml0aXplcjogRG9tU2FuaXRpemVyLFxuICAgIHByaXZhdGUgX3RzOiBUcmFuc2xhdGVTZXJ2aWNlXG4gICkgeyB9XG59XG4iXX0=