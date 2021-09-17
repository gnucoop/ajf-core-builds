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
import { ChangeDetectorRef, Directive } from '@angular/core';
import { FormControl } from '@angular/forms';
import { defer, Subscription } from 'rxjs';
import { filter, map, withLatestFrom } from 'rxjs/operators';
import { AjfFormRendererService } from './form-renderer';
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
        this._control = defer(() => this._service.getControl(this.instance)
            .pipe(map(ctrl => (ctrl || new FormControl()))));
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
            this._warningTriggerSub =
                this.instance.warningTrigger
                    .pipe(withLatestFrom(this.control), filter(([_, ctrl]) => ctrl != null))
                    .subscribe(([_, ctrl]) => {
                    if (this.instance.warningResults == null) {
                        return;
                    }
                    const control = ctrl;
                    const s = this._warningAlertService
                        .showWarningAlertPrompt(this.instance.warningResults.filter(w => w.result).map(w => w.warning))
                        .subscribe((r) => {
                        if (r.result) {
                            control.setValue(null);
                        }
                    }, (_e) => {
                        if (s) {
                            s.unsubscribe();
                        }
                    }, () => {
                        if (s) {
                            s.unsubscribe();
                        }
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
                    catch (e) {
                    }
                }
            });
        }
        else {
            this._instanceUpdateSub = Subscription.EMPTY;
        }
        this._changeDetectorRef.detectChanges();
    }
}
AjfBaseFieldComponent.decorators = [
    { type: Directive }
];
AjfBaseFieldComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: AjfFormRendererService },
    { type: undefined }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS1maWVsZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2Zvcm1zL2Jhc2UtZmllbGQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUFDLGlCQUFpQixFQUFFLFNBQVMsRUFBb0IsTUFBTSxlQUFlLENBQUM7QUFDOUUsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBQyxLQUFLLEVBQWMsWUFBWSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQ3JELE9BQU8sRUFBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLGNBQWMsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRzNELE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBS3ZEOzs7Ozs7Ozs7O0dBVUc7QUFFSCxNQUFNLE9BQWdCLHFCQUFxQjtJQXNCekMsWUFDYyxrQkFBcUMsRUFDdkMsUUFBZ0MsRUFDaEMsb0JBQTRDO1FBRjFDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBbUI7UUFDdkMsYUFBUSxHQUFSLFFBQVEsQ0FBd0I7UUFDaEMseUJBQW9CLEdBQXBCLG9CQUFvQixDQUF3QjtRQU5oRCx1QkFBa0IsR0FBaUIsWUFBWSxDQUFDLEtBQUssQ0FBQztRQUN0RCx1QkFBa0IsR0FBaUIsWUFBWSxDQUFDLEtBQUssQ0FBQztRQU81RCxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FDRCxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO2FBQ2xDLElBQUksQ0FDRCxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLFdBQVcsRUFBRSxDQUFnQixDQUFDLENBQ3RELENBQWlDLENBQUM7SUFDdkUsQ0FBQztJQTdCRCxJ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RUFBRSxDQUFDO0lBQzFDLENBQUM7OztZQTlGRixTQUFTOzs7WUF0QkYsaUJBQWlCO1lBTWpCLHNCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtDaGFuZ2VEZXRlY3RvclJlZiwgRGlyZWN0aXZlLCBPbkRlc3Ryb3ksIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Zvcm1Db250cm9sfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge2RlZmVyLCBPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtmaWx0ZXIsIG1hcCwgd2l0aExhdGVzdEZyb219IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHtBamZGaWVsZFdhcm5pbmdBbGVydFJlc3VsdH0gZnJvbSAnLi9maWVsZC13YXJuaW5nLWFsZXJ0LXJlc3VsdCc7XG5pbXBvcnQge0FqZkZvcm1SZW5kZXJlclNlcnZpY2V9IGZyb20gJy4vZm9ybS1yZW5kZXJlcic7XG5pbXBvcnQge0FqZkZpZWxkSW5zdGFuY2V9IGZyb20gJy4vaW50ZXJmYWNlL2ZpZWxkcy1pbnN0YW5jZXMvZmllbGQtaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZXYXJuaW5nQWxlcnRTZXJ2aWNlfSBmcm9tICcuL3dhcm5pbmctYWxlcnQtc2VydmljZSc7XG5cblxuLyoqXG4gKiBJdCByYXBwcmVzZW50cyB0aGUgYmFzZSBmaWVsZCBjb21wb25lbnQsIHRoZSBmaXJzdCBvdmVybGF5IG9mIGFqZkZpZWxkSW5zdGFuY2UuXG4gKiBJdCBrZWVwcyBhIHJlZmVyZW5jZSB0byB0aGUgcmVsYXRpdmUgY29udHJvbCBvZiB0aGUgZm9ybS5cbiAqIEl0IG1hbmFnZXMgdGhlIGNvbXBvbmVudCB1cGRhdGUgaW4gY29uanVuY3Rpb24gd2l0aCB0aGUgaW5zdGFuY2UgdXBkYXRlLlxuICogSXQgbWFuYWdlcyB0aGUgd2FybmluZ1RyaWdnZXIgb2YgdGhlIGluc3RhbmNlIGJ5IGRpc3BsYXlpbmcgYSBjb25maXJtYXRpb25cbiAqIHBvcHVwIHdoZW4gYW4gYWxlcnQgZXZlbnQgaXMgdHJpZ2dlcmVkLlxuICogQGV4cG9ydFxuICogQGFic3RyYWN0XG4gKiBAY2xhc3MgQWpmQmFzZUZpZWxkQ29tcG9uZW50XG4gKiBAdGVtcGxhdGUgVFxuICovXG5ARGlyZWN0aXZlKClcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBamZCYXNlRmllbGRDb21wb25lbnQ8VCBleHRlbmRzIEFqZkZpZWxkSW5zdGFuY2UgPSBBamZGaWVsZEluc3RhbmNlPlxuICAgIGltcGxlbWVudHMgT25EZXN0cm95LCBPbkluaXQge1xuICBwcml2YXRlIF9pbnN0YW5jZTogVDtcbiAgZ2V0IGluc3RhbmNlKCk6IFQge1xuICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcbiAgfVxuICBzZXQgaW5zdGFuY2UoaW5zdGFuY2U6IFQpIHtcbiAgICBpZiAoaW5zdGFuY2UgIT09IHRoaXMuX2luc3RhbmNlKSB7XG4gICAgICB0aGlzLl9pbnN0YW5jZSA9IGluc3RhbmNlO1xuICAgICAgdGhpcy5fc2V0VXBJbnN0YW5jZVVwZGF0ZSgpO1xuICAgICAgdGhpcy5fb25JbnN0YW5jZUNoYW5nZSgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2NvbnRyb2w6IE9ic2VydmFibGU8Rm9ybUNvbnRyb2x8bnVsbD47XG4gIGdldCBjb250cm9sKCk6IE9ic2VydmFibGU8Rm9ybUNvbnRyb2x8bnVsbD4ge1xuICAgIHJldHVybiB0aGlzLl9jb250cm9sO1xuICB9XG5cbiAgcHJpdmF0ZSBfd2FybmluZ1RyaWdnZXJTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfaW5zdGFuY2VVcGRhdGVTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByb3RlY3RlZCBfY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgcHJpdmF0ZSBfc2VydmljZTogQWpmRm9ybVJlbmRlcmVyU2VydmljZSxcbiAgICAgIHByaXZhdGUgX3dhcm5pbmdBbGVydFNlcnZpY2U6IEFqZldhcm5pbmdBbGVydFNlcnZpY2UsXG4gICkge1xuICAgIHRoaXMuX2NvbnRyb2wgPSBkZWZlcihcbiAgICAgICAgICAgICAgICAgICAgICAgICgpID0+IHRoaXMuX3NlcnZpY2UuZ2V0Q29udHJvbCh0aGlzLmluc3RhbmNlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXAoY3RybCA9PiAoY3RybCB8fCBuZXcgRm9ybUNvbnRyb2woKSkgYXMgRm9ybUNvbnRyb2wpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApKSBhcyBPYnNlcnZhYmxlPEZvcm1Db250cm9sfG51bGw+O1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaW5zdGFuY2UgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fd2FybmluZ1RyaWdnZXJTdWIgPVxuICAgICAgICAgIHRoaXMuaW5zdGFuY2Uud2FybmluZ1RyaWdnZXJcbiAgICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgICB3aXRoTGF0ZXN0RnJvbSh0aGlzLmNvbnRyb2wpLFxuICAgICAgICAgICAgICAgICAgZmlsdGVyKChbXywgY3RybF0pID0+IGN0cmwgIT0gbnVsbCksXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIC5zdWJzY3JpYmUoKFtfLCBjdHJsXSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmluc3RhbmNlLndhcm5pbmdSZXN1bHRzID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgY29udHJvbCA9IGN0cmwgYXMgRm9ybUNvbnRyb2w7XG4gICAgICAgICAgICAgICAgY29uc3QgcyA9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3dhcm5pbmdBbGVydFNlcnZpY2VcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zaG93V2FybmluZ0FsZXJ0UHJvbXB0KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW5zdGFuY2Uud2FybmluZ1Jlc3VsdHMuZmlsdGVyKHcgPT4gdy5yZXN1bHQpLm1hcCh3ID0+IHcud2FybmluZykpXG4gICAgICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChyOiBBamZGaWVsZFdhcm5pbmdBbGVydFJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHIucmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2whLnNldFZhbHVlKG51bGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKF9lOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHMudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHMudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5fd2FybmluZ1RyaWdnZXJTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9pbnN0YW5jZVVwZGF0ZVN1Yi51bnN1YnNjcmliZSgpO1xuICB9XG4gIC8vIFRPRE86IHdoeT9cbiAgcHJvdGVjdGVkIF9vbkluc3RhbmNlQ2hhbmdlKCk6IHZvaWQge31cblxuICBwcml2YXRlIF9zZXRVcEluc3RhbmNlVXBkYXRlKCk6IHZvaWQge1xuICAgIHRoaXMuX2luc3RhbmNlVXBkYXRlU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgaWYgKHRoaXMuX2luc3RhbmNlICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX2luc3RhbmNlVXBkYXRlU3ViID0gdGhpcy5faW5zdGFuY2UudXBkYXRlZEV2dC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9pbnN0YW5jZVVwZGF0ZVN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgICB9XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG59XG4iXX0=