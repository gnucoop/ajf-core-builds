/**
 * @fileoverview added by tsickle
 * Generated from: src/core/reports/report.ts
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
import { ChangeDetectorRef, Directive, Input } from '@angular/core';
/**
 * @abstract
 */
export class AjfReportRenderer {
    /**
     * @param {?} _cdr
     */
    constructor(_cdr) {
        this._cdr = _cdr;
    }
    /**
     * @return {?}
     */
    get instance() {
        return this._instance;
    }
    /**
     * @param {?} instance
     * @return {?}
     */
    set instance(instance) {
        this._instance = instance;
        this._report = instance != null ? instance.report : null;
        this._cdr.markForCheck();
    }
    /**
     * @return {?}
     */
    get report() {
        return this._report;
    }
}
AjfReportRenderer.decorators = [
    { type: Directive }
];
/** @nocollapse */
AjfReportRenderer.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
AjfReportRenderer.propDecorators = {
    instance: [{ type: Input }]
};
if (false) {
    /**
     * @type {?}
     * @private
     */
    AjfReportRenderer.prototype._instance;
    /**
     * @type {?}
     * @private
     */
    AjfReportRenderer.prototype._report;
    /**
     * @type {?}
     * @private
     */
    AjfReportRenderer.prototype._cdr;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwb3J0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvcmVwb3J0cy9yZXBvcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzQkEsT0FBTyxFQUFDLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUMsTUFBTSxlQUFlLENBQUM7Ozs7QUFNbEUsTUFBTSxPQUFnQixpQkFBaUI7Ozs7SUFpQnJDLFlBQW9CLElBQXVCO1FBQXZCLFNBQUksR0FBSixJQUFJLENBQW1CO0lBQUcsQ0FBQzs7OztJQWYvQyxJQUFJLFFBQVE7UUFDVixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDeEIsQ0FBQzs7Ozs7SUFDRCxJQUNJLFFBQVEsQ0FBQyxRQUEyQjtRQUN0QyxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztRQUMxQixJQUFJLENBQUMsT0FBTyxHQUFHLFFBQVEsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUN6RCxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzNCLENBQUM7Ozs7SUFHRCxJQUFJLE1BQU07UUFDUixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDdEIsQ0FBQzs7O1lBaEJGLFNBQVM7Ozs7WUFMRixpQkFBaUI7Ozt1QkFXdEIsS0FBSzs7Ozs7OztJQUpOLHNDQUFxQzs7Ozs7SUFXckMsb0NBQWdDOzs7OztJQUtwQixpQ0FBK0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7Q2hhbmdlRGV0ZWN0b3JSZWYsIERpcmVjdGl2ZSwgSW5wdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge0FqZlJlcG9ydEluc3RhbmNlfSBmcm9tICcuL2ludGVyZmFjZS9yZXBvcnRzLWluc3RhbmNlcy9yZXBvcnQtaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZSZXBvcnR9IGZyb20gJy4vaW50ZXJmYWNlL3JlcG9ydHMvcmVwb3J0JztcblxuQERpcmVjdGl2ZSgpXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQWpmUmVwb3J0UmVuZGVyZXIge1xuICBwcml2YXRlIF9pbnN0YW5jZTogQWpmUmVwb3J0SW5zdGFuY2U7XG4gIGdldCBpbnN0YW5jZSgpOiBBamZSZXBvcnRJbnN0YW5jZSB7XG4gICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBpbnN0YW5jZShpbnN0YW5jZTogQWpmUmVwb3J0SW5zdGFuY2UpIHtcbiAgICB0aGlzLl9pbnN0YW5jZSA9IGluc3RhbmNlO1xuICAgIHRoaXMuX3JlcG9ydCA9IGluc3RhbmNlICE9IG51bGwgPyBpbnN0YW5jZS5yZXBvcnQgOiBudWxsO1xuICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlcG9ydDogQWpmUmVwb3J0fG51bGw7XG4gIGdldCByZXBvcnQoKTogQWpmUmVwb3J0fG51bGwge1xuICAgIHJldHVybiB0aGlzLl9yZXBvcnQ7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9jZHI6IENoYW5nZURldGVjdG9yUmVmKSB7fVxufVxuIl19