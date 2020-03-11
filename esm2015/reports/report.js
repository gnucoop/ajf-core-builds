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
    get instance() { return this._instance; }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwb3J0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvcmVwb3J0cy9yZXBvcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzQkEsT0FBTyxFQUFDLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUMsTUFBTSxlQUFlLENBQUM7Ozs7QUFNbEUsTUFBTSxPQUFnQixpQkFBaUI7Ozs7SUFjckMsWUFBb0IsSUFBdUI7UUFBdkIsU0FBSSxHQUFKLElBQUksQ0FBbUI7SUFBSSxDQUFDOzs7O0lBWmhELElBQUksUUFBUSxLQUF3QixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDOzs7OztJQUM1RCxJQUFhLFFBQVEsQ0FBQyxRQUEyQjtRQUMvQyxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztRQUMxQixJQUFJLENBQUMsT0FBTyxHQUFHLFFBQVEsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUN6RCxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzNCLENBQUM7Ozs7SUFHRCxJQUFJLE1BQU07UUFDUixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDdEIsQ0FBQzs7O1lBYkYsU0FBUzs7OztZQUxGLGlCQUFpQjs7O3VCQVN0QixLQUFLOzs7Ozs7O0lBRk4sc0NBQXFDOzs7OztJQVFyQyxvQ0FBa0M7Ozs7O0lBS3RCLGlDQUErQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtDaGFuZ2VEZXRlY3RvclJlZiwgRGlyZWN0aXZlLCBJbnB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7QWpmUmVwb3J0SW5zdGFuY2V9IGZyb20gJy4vaW50ZXJmYWNlL3JlcG9ydHMtaW5zdGFuY2VzL3JlcG9ydC1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZlJlcG9ydH0gZnJvbSAnLi9pbnRlcmZhY2UvcmVwb3J0cy9yZXBvcnQnO1xuXG5ARGlyZWN0aXZlKClcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBamZSZXBvcnRSZW5kZXJlciB7XG4gIHByaXZhdGUgX2luc3RhbmNlOiBBamZSZXBvcnRJbnN0YW5jZTtcbiAgZ2V0IGluc3RhbmNlKCk6IEFqZlJlcG9ydEluc3RhbmNlIHsgcmV0dXJuIHRoaXMuX2luc3RhbmNlOyB9XG4gIEBJbnB1dCgpIHNldCBpbnN0YW5jZShpbnN0YW5jZTogQWpmUmVwb3J0SW5zdGFuY2UpIHtcbiAgICB0aGlzLl9pbnN0YW5jZSA9IGluc3RhbmNlO1xuICAgIHRoaXMuX3JlcG9ydCA9IGluc3RhbmNlICE9IG51bGwgPyBpbnN0YW5jZS5yZXBvcnQgOiBudWxsO1xuICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlcG9ydDogQWpmUmVwb3J0IHwgbnVsbDtcbiAgZ2V0IHJlcG9ydCgpOiBBamZSZXBvcnQgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5fcmVwb3J0O1xuICB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfY2RyOiBDaGFuZ2VEZXRlY3RvclJlZikgeyB9XG59XG4iXX0=