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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS1maWVsZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2Zvcm1zL2Jhc2UtZmllbGQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF1QkEsT0FBTyxFQUFrQixXQUFXLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUM1RCxPQUFPLEVBQUMsS0FBSyxFQUFjLFlBQVksRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUNyRCxPQUFPLEVBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxjQUFjLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7QUFPM0QsTUFBTSxPQUFnQixxQkFBcUI7Ozs7OztJQXNCekMsWUFDYyxrQkFBcUMsRUFDdkMsUUFBZ0MsRUFDaEMsb0JBQTRDO1FBRjFDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBbUI7UUFDdkMsYUFBUSxHQUFSLFFBQVEsQ0FBd0I7UUFDaEMseUJBQW9CLEdBQXBCLG9CQUFvQixDQUF3QjtRQU5oRCx1QkFBa0IsR0FBaUIsWUFBWSxDQUFDLEtBQUssQ0FBQztRQUN0RCx1QkFBa0IsR0FBaUIsWUFBWSxDQUFDLEtBQUssQ0FBQztRQU81RCxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUs7OztRQUNqQixHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO2FBQ2xDLElBQUksQ0FDRCxHQUFHOzs7O1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxtQkFBQSxJQUFJLEVBQWUsSUFBSSxJQUFJLFdBQVcsRUFBRSxFQUFDLENBQ3BELEVBQUMsQ0FBQztJQUN2QixDQUFDOzs7O0lBN0JELElBQUksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDOzs7OztJQUNELElBQUksUUFBUSxDQUFDLFFBQVc7UUFDdEIsSUFBSSxRQUFRLEtBQUssSUFB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cURBQW9EIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0NoYW5nZURldGVjdG9yUmVmLCBPbkRlc3Ryb3ksIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Fic3RyYWN0Q29udHJvbCwgRm9ybUNvbnRyb2x9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7ZGVmZXIsIE9ic2VydmFibGUsIFN1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge2ZpbHRlciwgbWFwLCB3aXRoTGF0ZXN0RnJvbX0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQge0FqZkZpZWxkV2FybmluZ0FsZXJ0UmVzdWx0fSBmcm9tICcuL2ZpZWxkLXdhcm5pbmctYWxlcnQtcmVzdWx0JztcbmltcG9ydCB7QWpmRm9ybVJlbmRlcmVyU2VydmljZX0gZnJvbSAnLi9mb3JtLXJlbmRlcmVyJztcbmltcG9ydCB7QWpmRmllbGRJbnN0YW5jZX0gZnJvbSAnLi9pbnRlcmZhY2UvZmllbGRzLWluc3RhbmNlcy9maWVsZC1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZldhcm5pbmdBbGVydFNlcnZpY2V9IGZyb20gJy4vd2FybmluZy1hbGVydC1zZXJ2aWNlJztcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFqZkJhc2VGaWVsZENvbXBvbmVudDxUIGV4dGVuZHMgQWpmRmllbGRJbnN0YW5jZSA9IEFqZkZpZWxkSW5zdGFuY2U+XG4gICAgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIE9uSW5pdCB7XG4gIHByaXZhdGUgX2luc3RhbmNlOiBUO1xuICBnZXQgaW5zdGFuY2UoKTogVCB7XG4gICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xuICB9XG4gIHNldCBpbnN0YW5jZShpbnN0YW5jZTogVCkge1xuICAgIGlmIChpbnN0YW5jZSAhPT0gdGhpcy5faW5zdGFuY2UpIHtcbiAgICAgIHRoaXMuX2luc3RhbmNlID0gaW5zdGFuY2U7XG4gICAgICB0aGlzLl9zZXRVcEluc3RhbmNlVXBkYXRlKCk7XG4gICAgICB0aGlzLl9vbkluc3RhbmNlQ2hhbmdlKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfY29udHJvbDogT2JzZXJ2YWJsZTxGb3JtQ29udHJvbHxudWxsPjtcbiAgZ2V0IGNvbnRyb2woKTogT2JzZXJ2YWJsZTxGb3JtQ29udHJvbHxudWxsPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbnRyb2w7XG4gIH1cblxuICBwcml2YXRlIF93YXJuaW5nVHJpZ2dlclN1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF9pbnN0YW5jZVVwZGF0ZVN1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJvdGVjdGVkIF9jaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICBwcml2YXRlIF9zZXJ2aWNlOiBBamZGb3JtUmVuZGVyZXJTZXJ2aWNlLFxuICAgICAgcHJpdmF0ZSBfd2FybmluZ0FsZXJ0U2VydmljZTogQWpmV2FybmluZ0FsZXJ0U2VydmljZSxcbiAgKSB7XG4gICAgdGhpcy5fY29udHJvbCA9IGRlZmVyKFxuICAgICAgICAoKSA9PiB0aGlzLl9zZXJ2aWNlLmdldENvbnRyb2wodGhpcy5pbnN0YW5jZSlcbiAgICAgICAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgICAgICAgIG1hcChjdHJsID0+IGN0cmwgYXMgRm9ybUNvbnRyb2wgfHwgbmV3IEZvcm1Db250cm9sKCkpLFxuICAgICAgICAgICAgICAgICAgICAgICkpO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fd2FybmluZ1RyaWdnZXJTdWIgPVxuICAgICAgICB0aGlzLmluc3RhbmNlLndhcm5pbmdUcmlnZ2VyLnBpcGUod2l0aExhdGVzdEZyb20odGhpcy5jb250cm9sKSwgZmlsdGVyKHYgPT4gdlsxXSAhPSBudWxsKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHY6IFt2b2lkLCBBYnN0cmFjdENvbnRyb2x8bnVsbF0pID0+IHtcbiAgICAgICAgICAgICAgaWYgKHRoaXMuaW5zdGFuY2Uud2FybmluZ1Jlc3VsdHMgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBjb25zdCBjb250cm9sID0gdlsxXTtcbiAgICAgICAgICAgICAgY29uc3QgcyA9XG4gICAgICAgICAgICAgICAgICB0aGlzLl93YXJuaW5nQWxlcnRTZXJ2aWNlXG4gICAgICAgICAgICAgICAgICAgICAgLnNob3dXYXJuaW5nQWxlcnRQcm9tcHQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW5zdGFuY2Uud2FybmluZ1Jlc3VsdHMuZmlsdGVyKHcgPT4gdy5yZXN1bHQpLm1hcCh3ID0+IHcud2FybmluZykpXG4gICAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKHI6IEFqZkZpZWxkV2FybmluZ0FsZXJ0UmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHIucmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sIS5zZXRWYWx1ZShudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIChfZTogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHMudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcy51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuX3dhcm5pbmdUcmlnZ2VyU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5faW5zdGFuY2VVcGRhdGVTdWIudW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfb25JbnN0YW5jZUNoYW5nZSgpOiB2b2lkIHt9XG5cbiAgcHJpdmF0ZSBfc2V0VXBJbnN0YW5jZVVwZGF0ZSgpOiB2b2lkIHtcbiAgICB0aGlzLl9pbnN0YW5jZVVwZGF0ZVN1Yi51bnN1YnNjcmliZSgpO1xuICAgIGlmICh0aGlzLl9pbnN0YW5jZSAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9pbnN0YW5jZVVwZGF0ZVN1YiA9IHRoaXMuX2luc3RhbmNlLnVwZGF0ZWRFdnQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuX2NoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5faW5zdGFuY2VVcGRhdGVTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gICAgfVxuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgfVxufVxuIl19