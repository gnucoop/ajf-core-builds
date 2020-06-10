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
let AjfBaseFieldComponent = /** @class */ (() => {
    class AjfBaseFieldComponent {
        constructor(_changeDetectorRef, _service, _warningAlertService) {
            this._changeDetectorRef = _changeDetectorRef;
            this._service = _service;
            this._warningAlertService = _warningAlertService;
            this._warningTriggerSub = Subscription.EMPTY;
            this._instanceUpdateSub = Subscription.EMPTY;
            this._control = defer(() => this._service.getControl(this.instance)
                .pipe(map(ctrl => ctrl || new FormControl())));
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
            this._warningTriggerSub =
                this.instance.warningTrigger.pipe(withLatestFrom(this.control), filter(v => v[1] != null))
                    .subscribe((v) => {
                    if (this.instance.warningResults == null) {
                        return;
                    }
                    const control = v[1];
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
        ngOnDestroy() {
            this._warningTriggerSub.unsubscribe();
            this._instanceUpdateSub.unsubscribe();
        }
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
    /** @nocollapse */
    AjfBaseFieldComponent.ctorParameters = () => [
        { type: ChangeDetectorRef },
        { type: AjfFormRendererService },
        { type: undefined }
    ];
    return AjfBaseFieldComponent;
})();
export { AjfBaseFieldComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS1maWVsZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2Zvcm1zL2Jhc2UtZmllbGQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUFDLGlCQUFpQixFQUFFLFNBQVMsRUFBb0IsTUFBTSxlQUFlLENBQUM7QUFDOUUsT0FBTyxFQUFrQixXQUFXLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUM1RCxPQUFPLEVBQUMsS0FBSyxFQUFjLFlBQVksRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUNyRCxPQUFPLEVBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxjQUFjLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUczRCxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUl2RDtJQUFBLE1BQ3NCLHFCQUFxQjtRQXNCekMsWUFDYyxrQkFBcUMsRUFDdkMsUUFBZ0MsRUFDaEMsb0JBQTRDO1lBRjFDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBbUI7WUFDdkMsYUFBUSxHQUFSLFFBQVEsQ0FBd0I7WUFDaEMseUJBQW9CLEdBQXBCLG9CQUFvQixDQUF3QjtZQU5oRCx1QkFBa0IsR0FBaUIsWUFBWSxDQUFDLEtBQUssQ0FBQztZQUN0RCx1QkFBa0IsR0FBaUIsWUFBWSxDQUFDLEtBQUssQ0FBQztZQU81RCxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FDakIsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztpQkFDbEMsSUFBSSxDQUNELEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQW1CLElBQUksSUFBSSxXQUFXLEVBQUUsQ0FBQyxDQUNwRCxDQUFDLENBQUM7UUFDdkIsQ0FBQztRQTdCRCxJQUFJLFFBQVE7WUFDVixPQUFPLElBQUksQ0FB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QUFxQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtDaGFuZ2VEZXRlY3RvclJlZiwgRGlyZWN0aXZlLCBPbkRlc3Ryb3ksIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Fic3RyYWN0Q29udHJvbCwgRm9ybUNvbnRyb2x9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7ZGVmZXIsIE9ic2VydmFibGUsIFN1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge2ZpbHRlciwgbWFwLCB3aXRoTGF0ZXN0RnJvbX0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQge0FqZkZpZWxkV2FybmluZ0FsZXJ0UmVzdWx0fSBmcm9tICcuL2ZpZWxkLXdhcm5pbmctYWxlcnQtcmVzdWx0JztcbmltcG9ydCB7QWpmRm9ybVJlbmRlcmVyU2VydmljZX0gZnJvbSAnLi9mb3JtLXJlbmRlcmVyJztcbmltcG9ydCB7QWpmRmllbGRJbnN0YW5jZX0gZnJvbSAnLi9pbnRlcmZhY2UvZmllbGRzLWluc3RhbmNlcy9maWVsZC1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZldhcm5pbmdBbGVydFNlcnZpY2V9IGZyb20gJy4vd2FybmluZy1hbGVydC1zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSgpXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQWpmQmFzZUZpZWxkQ29tcG9uZW50PFQgZXh0ZW5kcyBBamZGaWVsZEluc3RhbmNlID0gQWpmRmllbGRJbnN0YW5jZT5cbiAgICBpbXBsZW1lbnRzIE9uRGVzdHJveSwgT25Jbml0IHtcbiAgcHJpdmF0ZSBfaW5zdGFuY2U6IFQ7XG4gIGdldCBpbnN0YW5jZSgpOiBUIHtcbiAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XG4gIH1cbiAgc2V0IGluc3RhbmNlKGluc3RhbmNlOiBUKSB7XG4gICAgaWYgKGluc3RhbmNlICE9PSB0aGlzLl9pbnN0YW5jZSkge1xuICAgICAgdGhpcy5faW5zdGFuY2UgPSBpbnN0YW5jZTtcbiAgICAgIHRoaXMuX3NldFVwSW5zdGFuY2VVcGRhdGUoKTtcbiAgICAgIHRoaXMuX29uSW5zdGFuY2VDaGFuZ2UoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9jb250cm9sOiBPYnNlcnZhYmxlPEZvcm1Db250cm9sfG51bGw+O1xuICBnZXQgY29udHJvbCgpOiBPYnNlcnZhYmxlPEZvcm1Db250cm9sfG51bGw+IHtcbiAgICByZXR1cm4gdGhpcy5fY29udHJvbDtcbiAgfVxuXG4gIHByaXZhdGUgX3dhcm5pbmdUcmlnZ2VyU3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX2luc3RhbmNlVXBkYXRlU3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBwcm90ZWN0ZWQgX2NoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgIHByaXZhdGUgX3NlcnZpY2U6IEFqZkZvcm1SZW5kZXJlclNlcnZpY2UsXG4gICAgICBwcml2YXRlIF93YXJuaW5nQWxlcnRTZXJ2aWNlOiBBamZXYXJuaW5nQWxlcnRTZXJ2aWNlLFxuICApIHtcbiAgICB0aGlzLl9jb250cm9sID0gZGVmZXIoXG4gICAgICAgICgpID0+IHRoaXMuX3NlcnZpY2UuZ2V0Q29udHJvbCh0aGlzLmluc3RhbmNlKVxuICAgICAgICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgICAgbWFwKGN0cmwgPT4gY3RybCBhcyBGb3JtQ29udHJvbCB8fCBuZXcgRm9ybUNvbnRyb2woKSksXG4gICAgICAgICAgICAgICAgICAgICAgKSk7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLl93YXJuaW5nVHJpZ2dlclN1YiA9XG4gICAgICAgIHRoaXMuaW5zdGFuY2Uud2FybmluZ1RyaWdnZXIucGlwZSh3aXRoTGF0ZXN0RnJvbSh0aGlzLmNvbnRyb2wpLCBmaWx0ZXIodiA9PiB2WzFdICE9IG51bGwpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgodjogW3ZvaWQsIEFic3RyYWN0Q29udHJvbHxudWxsXSkgPT4ge1xuICAgICAgICAgICAgICBpZiAodGhpcy5pbnN0YW5jZS53YXJuaW5nUmVzdWx0cyA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGNvbnN0IGNvbnRyb2wgPSB2WzFdO1xuICAgICAgICAgICAgICBjb25zdCBzID1cbiAgICAgICAgICAgICAgICAgIHRoaXMuX3dhcm5pbmdBbGVydFNlcnZpY2VcbiAgICAgICAgICAgICAgICAgICAgICAuc2hvd1dhcm5pbmdBbGVydFByb21wdChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnN0YW5jZS53YXJuaW5nUmVzdWx0cy5maWx0ZXIodyA9PiB3LnJlc3VsdCkubWFwKHcgPT4gdy53YXJuaW5nKSlcbiAgICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAocjogQWpmRmllbGRXYXJuaW5nQWxlcnRSZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoci5yZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2whLnNldFZhbHVlKG51bGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKF9lOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcy51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5fd2FybmluZ1RyaWdnZXJTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9pbnN0YW5jZVVwZGF0ZVN1Yi51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9vbkluc3RhbmNlQ2hhbmdlKCk6IHZvaWQge31cblxuICBwcml2YXRlIF9zZXRVcEluc3RhbmNlVXBkYXRlKCk6IHZvaWQge1xuICAgIHRoaXMuX2luc3RhbmNlVXBkYXRlU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgaWYgKHRoaXMuX2luc3RhbmNlICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX2luc3RhbmNlVXBkYXRlU3ViID0gdGhpcy5faW5zdGFuY2UudXBkYXRlZEV2dC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9pbnN0YW5jZVVwZGF0ZVN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgICB9XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG59XG4iXX0=