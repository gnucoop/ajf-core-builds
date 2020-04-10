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
        () => this._service.getControl(this.instance)
            .pipe(map((/**
         * @param {?} ctrl
         * @return {?}
         */
        ctrl => (/** @type {?} */ (ctrl)) || new FormControl())))));
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
        if (instance !== this._instance) {
            this._instance = instance;
            this._setUpInstanceUpdate();
            this._onInstanceChange();
        }
    }
    /**
     * @return {?}
     */
    get readonly() {
        return this._readonly;
    }
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
    get control() {
        return this._control;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._warningTriggerSub =
            this.instance.warningTrigger.pipe(withLatestFrom(this.control), filter((/**
             * @param {?} v
             * @return {?}
             */
            v => v[1] != null)))
                .subscribe((/**
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
                const s = this._warningAlertService
                    .showWarningAlertPrompt(this.instance.warningResults.filter((/**
                 * @param {?} w
                 * @return {?}
                 */
                w => w.result)).map((/**
                 * @param {?} w
                 * @return {?}
                 */
                w => w.warning)))
                    .subscribe((/**
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
                (_e) => {
                    if (s) {
                        s.unsubscribe();
                    }
                }), (/**
                 * @return {?}
                 */
                () => {
                    if (s) {
                        s.unsubscribe();
                    }
                }));
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
                    catch (e) {
                    }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS1maWVsZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2Zvcm1zL2Jhc2UtZmllbGQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzQkEsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFFNUQsT0FBTyxFQUFrQixXQUFXLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUM1RCxPQUFPLEVBQUMsS0FBSyxFQUFjLFlBQVksRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUNyRCxPQUFPLEVBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxjQUFjLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7QUFPM0QsTUFBTSxPQUFnQixxQkFBcUI7Ozs7OztJQStCekMsWUFDYyxrQkFBcUMsRUFDdkMsUUFBZ0MsRUFDaEMsb0JBQTRDO1FBRjFDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBbUI7UUFDdkMsYUFBUSxHQUFSLFFBQVEsQ0FBd0I7UUFDaEMseUJBQW9CLEdBQXBCLG9CQUFvQixDQUF3QjtRQU5oRCx1QkFBa0IsR0FBaUIsWUFBWSxDQUFDLEtBQUssQ0FBQztRQUN0RCx1QkFBa0IsR0FBaUIsWUFBWSxDQUFDLEtBQUssQ0FBQztRQU81RCxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUs7OztRQUNqQixHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO2FBQ2xDLElBQUksQ0FDRCxHQUFHOzs7O1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxtQkFBQSxJQUFJLEVBQWUsSUFBSSxJQUFJLFdBQVcsRUFBRSxFQUFDLENBQ3BELEVBQUMsQ0FBQztJQUN2QixDQUFDOzs7O0lBdENELElBQUksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDOzs7OztJQUNE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QyxDQUFDO1NBQ0o7YUFBTTtZQUNMLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDO1NBQzlDO1FBQ0QsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzFDLENBQUM7Q0FDRjs7Ozs7O0lBL0ZDLDBDQUFxQjs7Ozs7SUFZckIsMENBQTZCOzs7OztJQVM3Qix5Q0FBK0M7Ozs7O0lBSy9DLG1EQUE4RDs7Ozs7SUFDOUQsbURBQThEOzs7OztJQUcxRCxtREFBK0M7Ozs7O0lBQy9DLHlDQUF3Qzs7Ozs7SUFDeEMscURBQW9EIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge2NvZXJjZUJvb2xlYW5Qcm9wZXJ0eX0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7Q2hhbmdlRGV0ZWN0b3JSZWYsIE9uRGVzdHJveSwgT25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7QWJzdHJhY3RDb250cm9sLCBGb3JtQ29udHJvbH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtkZWZlciwgT2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcbmltcG9ydCB7ZmlsdGVyLCBtYXAsIHdpdGhMYXRlc3RGcm9tfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7QWpmRmllbGRXYXJuaW5nQWxlcnRSZXN1bHR9IGZyb20gJy4vZmllbGQtd2FybmluZy1hbGVydC1yZXN1bHQnO1xuaW1wb3J0IHtBamZGb3JtUmVuZGVyZXJTZXJ2aWNlfSBmcm9tICcuL2Zvcm0tcmVuZGVyZXInO1xuaW1wb3J0IHtBamZGaWVsZEluc3RhbmNlfSBmcm9tICcuL2ludGVyZmFjZS9maWVsZHMtaW5zdGFuY2VzL2ZpZWxkLWluc3RhbmNlJztcbmltcG9ydCB7QWpmV2FybmluZ0FsZXJ0U2VydmljZX0gZnJvbSAnLi93YXJuaW5nLWFsZXJ0LXNlcnZpY2UnO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQWpmQmFzZUZpZWxkQ29tcG9uZW50PFQgZXh0ZW5kcyBBamZGaWVsZEluc3RhbmNlID0gQWpmRmllbGRJbnN0YW5jZT5cbiAgICBpbXBsZW1lbnRzIE9uRGVzdHJveSwgT25Jbml0IHtcbiAgcHJpdmF0ZSBfaW5zdGFuY2U6IFQ7XG4gIGdldCBpbnN0YW5jZSgpOiBUIHtcbiAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XG4gIH1cbiAgc2V0IGluc3RhbmNlKGluc3RhbmNlOiBUKSB7XG4gICAgaWYgKGluc3RhbmNlICE9PSB0aGlzLl9pbnN0YW5jZSkge1xuICAgICAgdGhpcy5faW5zdGFuY2UgPSBpbnN0YW5jZTtcbiAgICAgIHRoaXMuX3NldFVwSW5zdGFuY2VVcGRhdGUoKTtcbiAgICAgIHRoaXMuX29uSW5zdGFuY2VDaGFuZ2UoKTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgX3JlYWRvbmx5OiBib29sZWFuO1xuICBnZXQgcmVhZG9ubHkoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3JlYWRvbmx5O1xuICB9XG4gIHNldCByZWFkb25seShyZWFkb25seTogYm9vbGVhbikge1xuICAgIHRoaXMuX3JlYWRvbmx5ID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHJlYWRvbmx5KTtcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgX2NvbnRyb2w6IE9ic2VydmFibGU8Rm9ybUNvbnRyb2x8bnVsbD47XG4gIGdldCBjb250cm9sKCk6IE9ic2VydmFibGU8Rm9ybUNvbnRyb2x8bnVsbD4ge1xuICAgIHJldHVybiB0aGlzLl9jb250cm9sO1xuICB9XG5cbiAgcHJpdmF0ZSBfd2FybmluZ1RyaWdnZXJTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfaW5zdGFuY2VVcGRhdGVTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByb3RlY3RlZCBfY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgcHJpdmF0ZSBfc2VydmljZTogQWpmRm9ybVJlbmRlcmVyU2VydmljZSxcbiAgICAgIHByaXZhdGUgX3dhcm5pbmdBbGVydFNlcnZpY2U6IEFqZldhcm5pbmdBbGVydFNlcnZpY2UsXG4gICkge1xuICAgIHRoaXMuX2NvbnRyb2wgPSBkZWZlcihcbiAgICAgICAgKCkgPT4gdGhpcy5fc2VydmljZS5nZXRDb250cm9sKHRoaXMuaW5zdGFuY2UpXG4gICAgICAgICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICAgICAgICBtYXAoY3RybCA9PiBjdHJsIGFzIEZvcm1Db250cm9sIHx8IG5ldyBGb3JtQ29udHJvbCgpKSxcbiAgICAgICAgICAgICAgICAgICAgICApKTtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuX3dhcm5pbmdUcmlnZ2VyU3ViID1cbiAgICAgICAgdGhpcy5pbnN0YW5jZS53YXJuaW5nVHJpZ2dlci5waXBlKHdpdGhMYXRlc3RGcm9tKHRoaXMuY29udHJvbCksIGZpbHRlcih2ID0+IHZbMV0gIT0gbnVsbCkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCh2OiBbdm9pZCwgQWJzdHJhY3RDb250cm9sfG51bGxdKSA9PiB7XG4gICAgICAgICAgICAgIGlmICh0aGlzLmluc3RhbmNlLndhcm5pbmdSZXN1bHRzID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgY29uc3QgY29udHJvbCA9IHZbMV07XG4gICAgICAgICAgICAgIGNvbnN0IHMgPVxuICAgICAgICAgICAgICAgICAgdGhpcy5fd2FybmluZ0FsZXJ0U2VydmljZVxuICAgICAgICAgICAgICAgICAgICAgIC5zaG93V2FybmluZ0FsZXJ0UHJvbXB0KFxuICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmluc3RhbmNlLndhcm5pbmdSZXN1bHRzLmZpbHRlcih3ID0+IHcucmVzdWx0KS5tYXAodyA9PiB3Lndhcm5pbmcpKVxuICAgICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIChyOiBBamZGaWVsZFdhcm5pbmdBbGVydFJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyLnJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbCEuc2V0VmFsdWUobnVsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAoX2U6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHMudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl93YXJuaW5nVHJpZ2dlclN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2luc3RhbmNlVXBkYXRlU3ViLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgX29uSW5zdGFuY2VDaGFuZ2UoKTogdm9pZCB7fVxuXG4gIHByaXZhdGUgX3NldFVwSW5zdGFuY2VVcGRhdGUoKTogdm9pZCB7XG4gICAgdGhpcy5faW5zdGFuY2VVcGRhdGVTdWIudW5zdWJzY3JpYmUoKTtcbiAgICBpZiAodGhpcy5faW5zdGFuY2UgIT0gbnVsbCkge1xuICAgICAgdGhpcy5faW5zdGFuY2VVcGRhdGVTdWIgPSB0aGlzLl9pbnN0YW5jZS51cGRhdGVkRXZ0LnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZikge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2luc3RhbmNlVXBkYXRlU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICAgIH1cbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cbn1cbiJdfQ==