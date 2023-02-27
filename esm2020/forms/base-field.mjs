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
import { Directive } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { defer, Subscription } from 'rxjs';
import { filter, map, withLatestFrom } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "./form-renderer";
/**
 * It rappresents the base field component, the first overlay of ajfFieldInstance.
 * It keeps a reference to the relative control of the form.
 * It manages the component update in conjunction with the instance update.
 * It manages the warningTrigger of the instance by displaying a confirmation
 * popup when an alert event is triggered.
 * @export
 * @abstract
 * @class AjfBaseFieldComponent
 * @template T
 */
export class AjfBaseFieldComponent {
    constructor(_changeDetectorRef, _service, _warningAlertService) {
        this._changeDetectorRef = _changeDetectorRef;
        this._service = _service;
        this._warningAlertService = _warningAlertService;
        this._warningTriggerSub = Subscription.EMPTY;
        this._instanceUpdateSub = Subscription.EMPTY;
        this._control = defer(() => this._service
            .getControl(this.instance)
            .pipe(map(ctrl => (ctrl || new UntypedFormControl()))));
    }
    get instance() {
        return this._instance;
    }
    set instance(instance) {
        if (instance !== this._instance) {
            this._instance = instance;
            this._setUpInstanceUpdate();
            this._onInstanceChange();
        }
    }
    get control() {
        return this._control;
    }
    ngOnInit() {
        if (this.instance != null) {
            this._warningTriggerSub = this.instance.warningTrigger
                .pipe(withLatestFrom(this.control), filter(([_, ctrl]) => ctrl != null))
                .subscribe(([_, ctrl]) => {
                if (this.instance == null || this.instance.warningResults == null) {
                    return;
                }
                const control = ctrl;
                const s = this._warningAlertService
                    .showWarningAlertPrompt(this.instance.warningResults.filter(w => w.result).map(w => w.warning))
                    .subscribe({
                    next: (r) => {
                        if (r.result) {
                            control.setValue(null);
                        }
                    },
                    error: (_e) => {
                        if (s) {
                            s.unsubscribe();
                        }
                    },
                    complete: () => {
                        if (s) {
                            s.unsubscribe();
                        }
                    },
                });
            });
        }
    }
    ngOnDestroy() {
        this._warningTriggerSub.unsubscribe();
        this._instanceUpdateSub.unsubscribe();
    }
    // TODO: why?
    _onInstanceChange() { }
    _setUpInstanceUpdate() {
        this._instanceUpdateSub.unsubscribe();
        if (this._instance != null) {
            this._instanceUpdateSub = this._instance.updatedEvt.subscribe(() => {
                if (this._changeDetectorRef) {
                    try {
                        this._changeDetectorRef.detectChanges();
                    }
                    catch (e) { }
                }
            });
        }
        else {
            this._instanceUpdateSub = Subscription.EMPTY;
        }
        this._changeDetectorRef.detectChanges();
    }
}
AjfBaseFieldComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfBaseFieldComponent, deps: "invalid", target: i0.ɵɵFactoryTarget.Directive });
AjfBaseFieldComponent.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.4", type: AjfBaseFieldComponent, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfBaseFieldComponent, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i1.AjfFormRendererService }, { type: undefined }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS1maWVsZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvZm9ybXMvc3JjL2Jhc2UtZmllbGQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUFvQixTQUFTLEVBQW9CLE1BQU0sZUFBZSxDQUFDO0FBQzlFLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ2xELE9BQU8sRUFBQyxLQUFLLEVBQWMsWUFBWSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQ3JELE9BQU8sRUFBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLGNBQWMsRUFBQyxNQUFNLGdCQUFnQixDQUFDOzs7QUFPM0Q7Ozs7Ozs7Ozs7R0FVRztBQUVILE1BQU0sT0FBZ0IscUJBQXFCO0lBdUJ6QyxZQUNZLGtCQUFxQyxFQUN2QyxRQUFnQyxFQUNoQyxvQkFBNEM7UUFGMUMsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFtQjtRQUN2QyxhQUFRLEdBQVIsUUFBUSxDQUF3QjtRQUNoQyx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXdCO1FBTjlDLHVCQUFrQixHQUFpQixZQUFZLENBQUMsS0FBSyxDQUFDO1FBQ3RELHVCQUFrQixHQUFpQixZQUFZLENBQUMsS0FBSyxDQUFDO1FBTzVELElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUN6QixJQUFJLENBQUMsUUFBUTthQUNWLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO2FBQ3pCLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLGtCQUFrQixFQUFFLENBQXVCLENBQUMsQ0FBQyxDQUN0QyxDQUFDO0lBQzdDLENBQUM7SUE3QkQsSUFBSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3hCLENB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SSxDQUFDLGtCQUFrQixDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzFDLENBQUM7O2tIQTdGbUIscUJBQXFCO3NHQUFyQixxQkFBcUI7MkZBQXJCLHFCQUFxQjtrQkFEMUMsU0FBUyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtDaGFuZ2VEZXRlY3RvclJlZiwgRGlyZWN0aXZlLCBPbkRlc3Ryb3ksIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1VudHlwZWRGb3JtQ29udHJvbH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtkZWZlciwgT2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcbmltcG9ydCB7ZmlsdGVyLCBtYXAsIHdpdGhMYXRlc3RGcm9tfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7QWpmRmllbGRXYXJuaW5nQWxlcnRSZXN1bHR9IGZyb20gJy4vZmllbGQtd2FybmluZy1hbGVydC1yZXN1bHQnO1xuaW1wb3J0IHtBamZGb3JtUmVuZGVyZXJTZXJ2aWNlfSBmcm9tICcuL2Zvcm0tcmVuZGVyZXInO1xuaW1wb3J0IHtBamZGaWVsZEluc3RhbmNlfSBmcm9tICcuL2ludGVyZmFjZS9maWVsZHMtaW5zdGFuY2VzL2ZpZWxkLWluc3RhbmNlJztcbmltcG9ydCB7QWpmV2FybmluZ0FsZXJ0U2VydmljZX0gZnJvbSAnLi93YXJuaW5nLWFsZXJ0LXNlcnZpY2UnO1xuXG4vKipcbiAqIEl0IHJhcHByZXNlbnRzIHRoZSBiYXNlIGZpZWxkIGNvbXBvbmVudCwgdGhlIGZpcnN0IG92ZXJsYXkgb2YgYWpmRmllbGRJbnN0YW5jZS5cbiAqIEl0IGtlZXBzIGEgcmVmZXJlbmNlIHRvIHRoZSByZWxhdGl2ZSBjb250cm9sIG9mIHRoZSBmb3JtLlxuICogSXQgbWFuYWdlcyB0aGUgY29tcG9uZW50IHVwZGF0ZSBpbiBjb25qdW5jdGlvbiB3aXRoIHRoZSBpbnN0YW5jZSB1cGRhdGUuXG4gKiBJdCBtYW5hZ2VzIHRoZSB3YXJuaW5nVHJpZ2dlciBvZiB0aGUgaW5zdGFuY2UgYnkgZGlzcGxheWluZyBhIGNvbmZpcm1hdGlvblxuICogcG9wdXAgd2hlbiBhbiBhbGVydCBldmVudCBpcyB0cmlnZ2VyZWQuXG4gKiBAZXhwb3J0XG4gKiBAYWJzdHJhY3RcbiAqIEBjbGFzcyBBamZCYXNlRmllbGRDb21wb25lbnRcbiAqIEB0ZW1wbGF0ZSBUXG4gKi9cbkBEaXJlY3RpdmUoKVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFqZkJhc2VGaWVsZENvbXBvbmVudDxUIGV4dGVuZHMgQWpmRmllbGRJbnN0YW5jZSA9IEFqZkZpZWxkSW5zdGFuY2U+XG4gIGltcGxlbWVudHMgT25EZXN0cm95LCBPbkluaXRcbntcbiAgcHJpdmF0ZSBfaW5zdGFuY2U6IFQgfCB1bmRlZmluZWQ7XG4gIGdldCBpbnN0YW5jZSgpOiBUIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XG4gIH1cbiAgc2V0IGluc3RhbmNlKGluc3RhbmNlOiBUIHwgdW5kZWZpbmVkKSB7XG4gICAgaWYgKGluc3RhbmNlICE9PSB0aGlzLl9pbnN0YW5jZSkge1xuICAgICAgdGhpcy5faW5zdGFuY2UgPSBpbnN0YW5jZTtcbiAgICAgIHRoaXMuX3NldFVwSW5zdGFuY2VVcGRhdGUoKTtcbiAgICAgIHRoaXMuX29uSW5zdGFuY2VDaGFuZ2UoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9jb250cm9sOiBPYnNlcnZhYmxlPFVudHlwZWRGb3JtQ29udHJvbCB8IG51bGw+O1xuICBnZXQgY29udHJvbCgpOiBPYnNlcnZhYmxlPFVudHlwZWRGb3JtQ29udHJvbCB8IG51bGw+IHtcbiAgICByZXR1cm4gdGhpcy5fY29udHJvbDtcbiAgfVxuXG4gIHByaXZhdGUgX3dhcm5pbmdUcmlnZ2VyU3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX2luc3RhbmNlVXBkYXRlU3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIF9jaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJpdmF0ZSBfc2VydmljZTogQWpmRm9ybVJlbmRlcmVyU2VydmljZSxcbiAgICBwcml2YXRlIF93YXJuaW5nQWxlcnRTZXJ2aWNlOiBBamZXYXJuaW5nQWxlcnRTZXJ2aWNlLFxuICApIHtcbiAgICB0aGlzLl9jb250cm9sID0gZGVmZXIoKCkgPT5cbiAgICAgIHRoaXMuX3NlcnZpY2VcbiAgICAgICAgLmdldENvbnRyb2wodGhpcy5pbnN0YW5jZSlcbiAgICAgICAgLnBpcGUobWFwKGN0cmwgPT4gKGN0cmwgfHwgbmV3IFVudHlwZWRGb3JtQ29udHJvbCgpKSBhcyBVbnR5cGVkRm9ybUNvbnRyb2wpKSxcbiAgICApIGFzIE9ic2VydmFibGU8VW50eXBlZEZvcm1Db250cm9sIHwgbnVsbD47XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5pbnN0YW5jZSAhPSBudWxsKSB7XG4gICAgICB0aGlzLl93YXJuaW5nVHJpZ2dlclN1YiA9IHRoaXMuaW5zdGFuY2Uud2FybmluZ1RyaWdnZXJcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgd2l0aExhdGVzdEZyb20odGhpcy5jb250cm9sKSxcbiAgICAgICAgICBmaWx0ZXIoKFtfLCBjdHJsXSkgPT4gY3RybCAhPSBudWxsKSxcbiAgICAgICAgKVxuICAgICAgICAuc3Vic2NyaWJlKChbXywgY3RybF0pID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5pbnN0YW5jZSA9PSBudWxsIHx8IHRoaXMuaW5zdGFuY2Uud2FybmluZ1Jlc3VsdHMgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCBjb250cm9sID0gY3RybCBhcyBVbnR5cGVkRm9ybUNvbnRyb2w7XG4gICAgICAgICAgY29uc3QgcyA9IHRoaXMuX3dhcm5pbmdBbGVydFNlcnZpY2VcbiAgICAgICAgICAgIC5zaG93V2FybmluZ0FsZXJ0UHJvbXB0KFxuICAgICAgICAgICAgICB0aGlzLmluc3RhbmNlLndhcm5pbmdSZXN1bHRzLmZpbHRlcih3ID0+IHcucmVzdWx0KS5tYXAodyA9PiB3Lndhcm5pbmcpLFxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLnN1YnNjcmliZSh7XG4gICAgICAgICAgICAgIG5leHQ6IChyOiBBamZGaWVsZFdhcm5pbmdBbGVydFJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyLnJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgY29udHJvbCEuc2V0VmFsdWUobnVsbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBlcnJvcjogKF9lOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocykge1xuICAgICAgICAgICAgICAgICAgcy51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgY29tcGxldGU6ICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocykge1xuICAgICAgICAgICAgICAgICAgcy51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl93YXJuaW5nVHJpZ2dlclN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2luc3RhbmNlVXBkYXRlU3ViLnVuc3Vic2NyaWJlKCk7XG4gIH1cbiAgLy8gVE9ETzogd2h5P1xuICBwcm90ZWN0ZWQgX29uSW5zdGFuY2VDaGFuZ2UoKTogdm9pZCB7fVxuXG4gIHByaXZhdGUgX3NldFVwSW5zdGFuY2VVcGRhdGUoKTogdm9pZCB7XG4gICAgdGhpcy5faW5zdGFuY2VVcGRhdGVTdWIudW5zdWJzY3JpYmUoKTtcbiAgICBpZiAodGhpcy5faW5zdGFuY2UgIT0gbnVsbCkge1xuICAgICAgdGhpcy5faW5zdGFuY2VVcGRhdGVTdWIgPSB0aGlzLl9pbnN0YW5jZS51cGRhdGVkRXZ0LnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZikge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgICAgfSBjYXRjaCAoZSkge31cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2luc3RhbmNlVXBkYXRlU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICAgIH1cbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cbn1cbiJdfQ==