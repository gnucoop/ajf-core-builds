/**
 * @fileoverview added by tsickle
 * Generated from: src/core/forms/base-field.ts
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
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { FormControl } from '@angular/forms';
import { defer, Subscription } from 'rxjs';
import { filter, map, withLatestFrom } from 'rxjs/operators';
/**
 * @abstract
 * @template T
 */
export class AjfBaseFieldComponent {
    /**
     * @param {?} _changeDetectorRef
     * @param {?} _service
     * @param {?} _warningAlertService
     */
    constructor(_changeDetectorRef, _service, _warningAlertService) {
        this._changeDetectorRef = _changeDetectorRef;
        this._service = _service;
        this._warningAlertService = _warningAlertService;
        this._warningTriggerSub = Subscription.EMPTY;
        this._instanceUpdateSub = Subscription.EMPTY;
        this._control = defer((/**
         * @return {?}
         */
        () => this._service.getControl(this.instance).pipe(map((/**
         * @param {?} ctrl
         * @return {?}
         */
        ctrl => (/** @type {?} */ (ctrl)) || new FormControl())))));
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
        if (instance !== this._instance) {
            this._instance = instance;
            this._setUpInstanceUpdate();
            this._onInstanceChange();
        }
    }
    /**
     * @return {?}
     */
    get readonly() { return this._readonly; }
    /**
     * @param {?} readonly
     * @return {?}
     */
    set readonly(readonly) {
        this._readonly = coerceBooleanProperty(readonly);
        this._changeDetectorRef.markForCheck();
    }
    /**
     * @return {?}
     */
    get control() { return this._control; }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._warningTriggerSub = this.instance.warningTrigger.pipe(withLatestFrom(this.control), filter((/**
         * @param {?} v
         * @return {?}
         */
        v => v[1] != null))).subscribe((/**
         * @param {?} v
         * @return {?}
         */
        (v) => {
            if (this.instance.warningResults == null) {
                return;
            }
            /** @type {?} */
            const control = v[1];
            /** @type {?} */
            const s = this._warningAlertService.showWarningAlertPrompt(this.instance.warningResults.filter((/**
             * @param {?} w
             * @return {?}
             */
            w => w.result)).map((/**
             * @param {?} w
             * @return {?}
             */
            w => w.warning))).subscribe((/**
             * @param {?} r
             * @return {?}
             */
            (r) => {
                if (r.result) {
                    (/** @type {?} */ (control)).setValue(null);
                }
            }), (/**
             * @param {?} _e
             * @return {?}
             */
            (_e) => { if (s) {
                s.unsubscribe();
            } }), (/**
             * @return {?}
             */
            () => { if (s) {
                s.unsubscribe();
            } }));
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._warningTriggerSub.unsubscribe();
        this._instanceUpdateSub.unsubscribe();
    }
    /**
     * @protected
     * @return {?}
     */
    _onInstanceChange() { }
    /**
     * @private
     * @return {?}
     */
    _setUpInstanceUpdate() {
        this._instanceUpdateSub.unsubscribe();
        if (this._instance != null) {
            this._instanceUpdateSub = this._instance.updatedEvt.subscribe((/**
             * @return {?}
             */
            () => {
                if (this._changeDetectorRef) {
                    try {
                        this._changeDetectorRef.detectChanges();
                    }
                    catch (e) { }
                }
            }));
        }
        else {
            this._instanceUpdateSub = Subscription.EMPTY;
        }
        this._changeDetectorRef.detectChanges();
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    AjfBaseFieldComponent.prototype._instance;
    /**
     * @type {?}
     * @protected
     */
    AjfBaseFieldComponent.prototype._readonly;
    /**
     * @type {?}
     * @private
     */
    AjfBaseFieldComponent.prototype._control;
    /**
     * @type {?}
     * @private
     */
    AjfBaseFieldComponent.prototype._warningTriggerSub;
    /**
     * @type {?}
     * @private
     */
    AjfBaseFieldComponent.prototype._instanceUpdateSub;
    /**
     * @type {?}
     * @protected
     */
    AjfBaseFieldComponent.prototype._changeDetectorRef;
    /**
     * @type {?}
     * @private
     */
    AjfBaseFieldComponent.prototype._service;
    /**
     * @type {?}
     * @private
     */
    AjfBaseFieldComponent.prototype._warningAlertService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS1maWVsZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2Zvcm1zL2Jhc2UtZmllbGQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzQkEsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFFNUQsT0FBTyxFQUFrQixXQUFXLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUM1RCxPQUFPLEVBQUMsS0FBSyxFQUFjLFlBQVksRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUNyRCxPQUFPLEVBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxjQUFjLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7QUFPM0QsTUFBTSxPQUFnQixxQkFBcUI7Ozs7OztJQXlCekMsWUFDWSxrQkFBcUMsRUFDdkMsUUFBZ0MsRUFDaEMsb0JBQTRDO1FBRjFDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBbUI7UUFDdkMsYUFBUSxHQUFSLFFBQVEsQ0FBd0I7UUFDaEMseUJBQW9CLEdBQXBCLG9CQUFvQixDQUF3QjtRQU45Qyx1QkFBa0IsR0FBaUIsWUFBWSxDQUFDLEtBQUssQ0FBQztRQUN0RCx1QkFBa0IsR0FBaUIsWUFBWSxDQUFDLEtBQUssQ0FBQztRQU81RCxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUs7OztRQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQ3RFLEdBQUc7Ozs7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLG1CQUFBLElBQUksRUFBZSxJQUFJLElBQUksV0FBVyxFQUFFLEVBQUMsQ0FDdEQsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7OztJQTlCRCxJQUFJLFFBQVEsS0FBUSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDOzs7OztJQUM1QyxJ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TCxJQUFJLENBQUMsa0JBQWtCLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQztTQUM5QztRQUNELElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUMxQyxDQUFDO0NBQ0Y7Ozs7OztJQTFFQywwQ0FBcUI7Ozs7O0lBVXJCLDBDQUE2Qjs7Ozs7SUFPN0IseUNBQWlEOzs7OztJQUdqRCxtREFBOEQ7Ozs7O0lBQzlELG1EQUE4RDs7Ozs7SUFHNUQsbURBQStDOzs7OztJQUMvQyx5Q0FBd0M7Ozs7O0lBQ3hDLHFEQUFvRCIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtjb2VyY2VCb29sZWFuUHJvcGVydHl9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge0NoYW5nZURldGVjdG9yUmVmLCBPbkRlc3Ryb3ksIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Fic3RyYWN0Q29udHJvbCwgRm9ybUNvbnRyb2x9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7ZGVmZXIsIE9ic2VydmFibGUsIFN1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge2ZpbHRlciwgbWFwLCB3aXRoTGF0ZXN0RnJvbX0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQge0FqZkZpZWxkV2FybmluZ0FsZXJ0UmVzdWx0fSBmcm9tICcuL2ZpZWxkLXdhcm5pbmctYWxlcnQtcmVzdWx0JztcbmltcG9ydCB7QWpmRm9ybVJlbmRlcmVyU2VydmljZX0gZnJvbSAnLi9mb3JtLXJlbmRlcmVyJztcbmltcG9ydCB7QWpmRmllbGRJbnN0YW5jZX0gZnJvbSAnLi9pbnRlcmZhY2UvZmllbGRzLWluc3RhbmNlcy9maWVsZC1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZldhcm5pbmdBbGVydFNlcnZpY2V9IGZyb20gJy4vd2FybmluZy1hbGVydC1zZXJ2aWNlJztcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFqZkJhc2VGaWVsZENvbXBvbmVudDxUIGV4dGVuZHMgQWpmRmllbGRJbnN0YW5jZSA9IEFqZkZpZWxkSW5zdGFuY2U+XG4gICAgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIE9uSW5pdCB7XG4gIHByaXZhdGUgX2luc3RhbmNlOiBUO1xuICBnZXQgaW5zdGFuY2UoKTogVCB7IHJldHVybiB0aGlzLl9pbnN0YW5jZTsgfVxuICBzZXQgaW5zdGFuY2UoaW5zdGFuY2U6IFQpIHtcbiAgICBpZiAoaW5zdGFuY2UgIT09IHRoaXMuX2luc3RhbmNlKSB7XG4gICAgICB0aGlzLl9pbnN0YW5jZSA9IGluc3RhbmNlO1xuICAgICAgdGhpcy5fc2V0VXBJbnN0YW5jZVVwZGF0ZSgpO1xuICAgICAgdGhpcy5fb25JbnN0YW5jZUNoYW5nZSgpO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBfcmVhZG9ubHk6IGJvb2xlYW47XG4gIGdldCByZWFkb25seSgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX3JlYWRvbmx5OyB9XG4gIHNldCByZWFkb25seShyZWFkb25seTogYm9vbGVhbikge1xuICAgIHRoaXMuX3JlYWRvbmx5ID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHJlYWRvbmx5KTtcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgX2NvbnRyb2w6IE9ic2VydmFibGU8Rm9ybUNvbnRyb2wgfCBudWxsPjtcbiAgZ2V0IGNvbnRyb2woKTogT2JzZXJ2YWJsZTxGb3JtQ29udHJvbCB8IG51bGw+IHsgcmV0dXJuIHRoaXMuX2NvbnRyb2w7IH1cblxuICBwcml2YXRlIF93YXJuaW5nVHJpZ2dlclN1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF9pbnN0YW5jZVVwZGF0ZVN1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBfY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByaXZhdGUgX3NlcnZpY2U6IEFqZkZvcm1SZW5kZXJlclNlcnZpY2UsXG4gICAgcHJpdmF0ZSBfd2FybmluZ0FsZXJ0U2VydmljZTogQWpmV2FybmluZ0FsZXJ0U2VydmljZSxcbiAgKSB7XG4gICAgdGhpcy5fY29udHJvbCA9IGRlZmVyKCgpID0+IHRoaXMuX3NlcnZpY2UuZ2V0Q29udHJvbCh0aGlzLmluc3RhbmNlKS5waXBlKFxuICAgICAgbWFwKGN0cmwgPT4gY3RybCBhcyBGb3JtQ29udHJvbCB8fCBuZXcgRm9ybUNvbnRyb2woKSksXG4gICAgKSk7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLl93YXJuaW5nVHJpZ2dlclN1YiA9IHRoaXMuaW5zdGFuY2Uud2FybmluZ1RyaWdnZXIucGlwZShcbiAgICAgIHdpdGhMYXRlc3RGcm9tKHRoaXMuY29udHJvbCksXG4gICAgICBmaWx0ZXIodiA9PiB2WzFdICE9IG51bGwpXG4gICAgKS5zdWJzY3JpYmUoKHY6IFt2b2lkLCBBYnN0cmFjdENvbnRyb2wgfCBudWxsXSkgPT4ge1xuICAgICAgaWYgKHRoaXMuaW5zdGFuY2Uud2FybmluZ1Jlc3VsdHMgPT0gbnVsbCkgeyByZXR1cm47IH1cbiAgICAgIGNvbnN0IGNvbnRyb2wgPSB2WzFdO1xuICAgICAgY29uc3QgcyA9IHRoaXMuX3dhcm5pbmdBbGVydFNlcnZpY2Uuc2hvd1dhcm5pbmdBbGVydFByb21wdChcbiAgICAgICAgdGhpcy5pbnN0YW5jZS53YXJuaW5nUmVzdWx0cy5maWx0ZXIodyA9PiB3LnJlc3VsdCkubWFwKHcgPT4gdy53YXJuaW5nKVxuICAgICAgKS5zdWJzY3JpYmUoXG4gICAgICAgIChyOiBBamZGaWVsZFdhcm5pbmdBbGVydFJlc3VsdCkgPT4ge1xuICAgICAgICAgIGlmIChyLnJlc3VsdCkgeyBjb250cm9sIS5zZXRWYWx1ZShudWxsKTsgfVxuICAgICAgICB9LFxuICAgICAgICAoX2U6IGFueSkgPT4geyBpZiAocykgeyBzLnVuc3Vic2NyaWJlKCk7IH19LFxuICAgICAgICAoKSA9PiB7IGlmIChzKSB7IHMudW5zdWJzY3JpYmUoKTsgfX1cbiAgICAgICk7XG4gICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl93YXJuaW5nVHJpZ2dlclN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2luc3RhbmNlVXBkYXRlU3ViLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgX29uSW5zdGFuY2VDaGFuZ2UoKTogdm9pZCB7IH1cblxuICBwcml2YXRlIF9zZXRVcEluc3RhbmNlVXBkYXRlKCk6IHZvaWQge1xuICAgIHRoaXMuX2luc3RhbmNlVXBkYXRlU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgaWYgKHRoaXMuX2luc3RhbmNlICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX2luc3RhbmNlVXBkYXRlU3ViID0gdGhpcy5faW5zdGFuY2UudXBkYXRlZEV2dC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICAgIH0gY2F0Y2ggKGUpIHsgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5faW5zdGFuY2VVcGRhdGVTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gICAgfVxuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgfVxufVxuIl19