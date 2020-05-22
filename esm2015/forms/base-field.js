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
import { __decorate, __metadata } from "tslib";
import { ChangeDetectorRef, Directive } from '@angular/core';
import { FormControl } from '@angular/forms';
import { defer, Subscription } from 'rxjs';
import { filter, map, withLatestFrom } from 'rxjs/operators';
import { AjfFormRendererService } from './form-renderer';
let AjfBaseFieldComponent = /** @class */ (() => {
    let AjfBaseFieldComponent = class AjfBaseFieldComponent {
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
    };
    AjfBaseFieldComponent = __decorate([
        Directive(),
        __metadata("design:paramtypes", [ChangeDetectorRef,
            AjfFormRendererService, Object])
    ], AjfBaseFieldComponent);
    return AjfBaseFieldComponent;
})();
export { AjfBaseFieldComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS1maWVsZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2Zvcm1zL2Jhc2UtZmllbGQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHOztBQUVILE9BQU8sRUFBQyxpQkFBaUIsRUFBRSxTQUFTLEVBQW9CLE1BQU0sZUFBZSxDQUFDO0FBQzlFLE9BQU8sRUFBa0IsV0FBVyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDNUQsT0FBTyxFQUFDLEtBQUssRUFBYyxZQUFZLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDckQsT0FBTyxFQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsY0FBYyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFHM0QsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFLdkQ7SUFBQSxJQUFzQixxQkFBcUIsR0FBM0MsTUFBc0IscUJBQXFCO1FBc0J6QyxZQUNjLGtCQUFxQyxFQUN2QyxRQUFnQyxFQUNoQyxvQkFBNEM7WUFGMUMsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFtQjtZQUN2QyxhQUFRLEdBQVIsUUFBUSxDQUF3QjtZQUNoQyx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXdCO1lBTmhELHVCQUFrQixHQUFpQixZQUFZLENBQUMsS0FBSyxDQUFDO1lBQ3RELHVCQUFrQixHQUFpQixZQUFZLENBQUMsS0FBSyxDQUFDO1lBTzVELElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUNqQixHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO2lCQUNsQyxJQUFJLENBQ0QsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBbUIsSUFBSSxJQUFJLFdBQVcsRUFBRSxDQUFDLENBQ3BELENBQUMsQ0FBQztRQUN2QixDQUFDO1FBN0JELElBQUksUUFB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QjtZQUM3QixzQkFBc0I7T0F4QnhCLHFCQUFxQixDQXdGMUM7SUFBRCw0QkFBQztLQUFBO1NBeEZxQixxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7Q2hhbmdlRGV0ZWN0b3JSZWYsIERpcmVjdGl2ZSwgT25EZXN0cm95LCBPbkluaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtBYnN0cmFjdENvbnRyb2wsIEZvcm1Db250cm9sfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge2RlZmVyLCBPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtmaWx0ZXIsIG1hcCwgd2l0aExhdGVzdEZyb219IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHtBamZGaWVsZFdhcm5pbmdBbGVydFJlc3VsdH0gZnJvbSAnLi9maWVsZC13YXJuaW5nLWFsZXJ0LXJlc3VsdCc7XG5pbXBvcnQge0FqZkZvcm1SZW5kZXJlclNlcnZpY2V9IGZyb20gJy4vZm9ybS1yZW5kZXJlcic7XG5pbXBvcnQge0FqZkZpZWxkSW5zdGFuY2V9IGZyb20gJy4vaW50ZXJmYWNlL2ZpZWxkcy1pbnN0YW5jZXMvZmllbGQtaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZXYXJuaW5nQWxlcnRTZXJ2aWNlfSBmcm9tICcuL3dhcm5pbmctYWxlcnQtc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoKVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFqZkJhc2VGaWVsZENvbXBvbmVudDxUIGV4dGVuZHMgQWpmRmllbGRJbnN0YW5jZSA9IEFqZkZpZWxkSW5zdGFuY2U+XG4gICAgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIE9uSW5pdCB7XG4gIHByaXZhdGUgX2luc3RhbmNlOiBUO1xuICBnZXQgaW5zdGFuY2UoKTogVCB7XG4gICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xuICB9XG4gIHNldCBpbnN0YW5jZShpbnN0YW5jZTogVCkge1xuICAgIGlmIChpbnN0YW5jZSAhPT0gdGhpcy5faW5zdGFuY2UpIHtcbiAgICAgIHRoaXMuX2luc3RhbmNlID0gaW5zdGFuY2U7XG4gICAgICB0aGlzLl9zZXRVcEluc3RhbmNlVXBkYXRlKCk7XG4gICAgICB0aGlzLl9vbkluc3RhbmNlQ2hhbmdlKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfY29udHJvbDogT2JzZXJ2YWJsZTxGb3JtQ29udHJvbHxudWxsPjtcbiAgZ2V0IGNvbnRyb2woKTogT2JzZXJ2YWJsZTxGb3JtQ29udHJvbHxudWxsPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbnRyb2w7XG4gIH1cblxuICBwcml2YXRlIF93YXJuaW5nVHJpZ2dlclN1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF9pbnN0YW5jZVVwZGF0ZVN1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJvdGVjdGVkIF9jaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICBwcml2YXRlIF9zZXJ2aWNlOiBBamZGb3JtUmVuZGVyZXJTZXJ2aWNlLFxuICAgICAgcHJpdmF0ZSBfd2FybmluZ0FsZXJ0U2VydmljZTogQWpmV2FybmluZ0FsZXJ0U2VydmljZSxcbiAgKSB7XG4gICAgdGhpcy5fY29udHJvbCA9IGRlZmVyKFxuICAgICAgICAoKSA9PiB0aGlzLl9zZXJ2aWNlLmdldENvbnRyb2wodGhpcy5pbnN0YW5jZSlcbiAgICAgICAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgICAgICAgIG1hcChjdHJsID0+IGN0cmwgYXMgRm9ybUNvbnRyb2wgfHwgbmV3IEZvcm1Db250cm9sKCkpLFxuICAgICAgICAgICAgICAgICAgICAgICkpO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fd2FybmluZ1RyaWdnZXJTdWIgPVxuICAgICAgICB0aGlzLmluc3RhbmNlLndhcm5pbmdUcmlnZ2VyLnBpcGUod2l0aExhdGVzdEZyb20odGhpcy5jb250cm9sKSwgZmlsdGVyKHYgPT4gdlsxXSAhPSBudWxsKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHY6IFt2b2lkLCBBYnN0cmFjdENvbnRyb2x8bnVsbF0pID0+IHtcbiAgICAgICAgICAgICAgaWYgKHRoaXMuaW5zdGFuY2Uud2FybmluZ1Jlc3VsdHMgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBjb25zdCBjb250cm9sID0gdlsxXTtcbiAgICAgICAgICAgICAgY29uc3QgcyA9XG4gICAgICAgICAgICAgICAgICB0aGlzLl93YXJuaW5nQWxlcnRTZXJ2aWNlXG4gICAgICAgICAgICAgICAgICAgICAgLnNob3dXYXJuaW5nQWxlcnRQcm9tcHQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW5zdGFuY2Uud2FybmluZ1Jlc3VsdHMuZmlsdGVyKHcgPT4gdy5yZXN1bHQpLm1hcCh3ID0+IHcud2FybmluZykpXG4gICAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKHI6IEFqZkZpZWxkV2FybmluZ0FsZXJ0UmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHIucmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sIS5zZXRWYWx1ZShudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIChfZTogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHMudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcy51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuX3dhcm5pbmdUcmlnZ2VyU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5faW5zdGFuY2VVcGRhdGVTdWIudW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfb25JbnN0YW5jZUNoYW5nZSgpOiB2b2lkIHt9XG5cbiAgcHJpdmF0ZSBfc2V0VXBJbnN0YW5jZVVwZGF0ZSgpOiB2b2lkIHtcbiAgICB0aGlzLl9pbnN0YW5jZVVwZGF0ZVN1Yi51bnN1YnNjcmliZSgpO1xuICAgIGlmICh0aGlzLl9pbnN0YW5jZSAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9pbnN0YW5jZVVwZGF0ZVN1YiA9IHRoaXMuX2luc3RhbmNlLnVwZGF0ZWRFdnQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuX2NoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5faW5zdGFuY2VVcGRhdGVTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gICAgfVxuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgfVxufVxuIl19