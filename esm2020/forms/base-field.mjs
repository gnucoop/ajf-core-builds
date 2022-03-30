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
import { FormControl } from '@angular/forms';
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
AjfBaseFieldComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfBaseFieldComponent, deps: "invalid", target: i0.ɵɵFactoryTarget.Directive });
AjfBaseFieldComponent.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.2.5", type: AjfBaseFieldComponent, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfBaseFieldComponent, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i1.AjfFormRendererService }, { type: undefined }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS1maWVsZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvZm9ybXMvc3JjL2Jhc2UtZmllbGQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUFvQixTQUFTLEVBQW9CLE1BQU0sZUFBZSxDQUFDO0FBQzlFLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUMsS0FBSyxFQUFjLFlBQVksRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUNyRCxPQUFPLEVBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxjQUFjLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQzs7O0FBTzNEOzs7Ozs7Ozs7O0dBVUc7QUFFSCxNQUFNLE9BQWdCLHFCQUFxQjtJQXVCekMsWUFDWSxrQkFBcUMsRUFDdkMsUUFBZ0MsRUFDaEMsb0JBQTRDO1FBRjFDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBbUI7UUFDdkMsYUFBUSxHQUFSLFFBQVEsQ0FBd0I7UUFDaEMseUJBQW9CLEdBQXBCLG9CQUFvQixDQUF3QjtRQU45Qyx1QkFBa0IsR0FBaUIsWUFBWSxDQUFDLEtBQUssQ0FBQztRQUN0RCx1QkFBa0IsR0FBaUIsWUFBWSxDQUFDLEtBQUssQ0FBQztRQU81RCxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FDekIsSUFBSSxDQUFDLFFBQVE7YUFDVixVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQzthQUN6QixJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLElBQUksSUFBSSxXQUFXLEVBQUUsQ0FBZ0IsQ0FBQyxDQUFDLENBQy9CLENBQUM7SUFDdEMsQ0FBQztJQTdCRCxJQUFJLFFBQVE7UUFDVixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDeEIsQ0FBQztJ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QUMsa0JBQWtCLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDMUMsQ0FBQzs7a0hBN0ZtQixxQkFBcUI7c0dBQXJCLHFCQUFxQjsyRkFBckIscUJBQXFCO2tCQUQxQyxTQUFTIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0NoYW5nZURldGVjdG9yUmVmLCBEaXJlY3RpdmUsIE9uRGVzdHJveSwgT25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Rm9ybUNvbnRyb2x9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7ZGVmZXIsIE9ic2VydmFibGUsIFN1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge2ZpbHRlciwgbWFwLCB3aXRoTGF0ZXN0RnJvbX0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQge0FqZkZpZWxkV2FybmluZ0FsZXJ0UmVzdWx0fSBmcm9tICcuL2ZpZWxkLXdhcm5pbmctYWxlcnQtcmVzdWx0JztcbmltcG9ydCB7QWpmRm9ybVJlbmRlcmVyU2VydmljZX0gZnJvbSAnLi9mb3JtLXJlbmRlcmVyJztcbmltcG9ydCB7QWpmRmllbGRJbnN0YW5jZX0gZnJvbSAnLi9pbnRlcmZhY2UvZmllbGRzLWluc3RhbmNlcy9maWVsZC1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZldhcm5pbmdBbGVydFNlcnZpY2V9IGZyb20gJy4vd2FybmluZy1hbGVydC1zZXJ2aWNlJztcblxuLyoqXG4gKiBJdCByYXBwcmVzZW50cyB0aGUgYmFzZSBmaWVsZCBjb21wb25lbnQsIHRoZSBmaXJzdCBvdmVybGF5IG9mIGFqZkZpZWxkSW5zdGFuY2UuXG4gKiBJdCBrZWVwcyBhIHJlZmVyZW5jZSB0byB0aGUgcmVsYXRpdmUgY29udHJvbCBvZiB0aGUgZm9ybS5cbiAqIEl0IG1hbmFnZXMgdGhlIGNvbXBvbmVudCB1cGRhdGUgaW4gY29uanVuY3Rpb24gd2l0aCB0aGUgaW5zdGFuY2UgdXBkYXRlLlxuICogSXQgbWFuYWdlcyB0aGUgd2FybmluZ1RyaWdnZXIgb2YgdGhlIGluc3RhbmNlIGJ5IGRpc3BsYXlpbmcgYSBjb25maXJtYXRpb25cbiAqIHBvcHVwIHdoZW4gYW4gYWxlcnQgZXZlbnQgaXMgdHJpZ2dlcmVkLlxuICogQGV4cG9ydFxuICogQGFic3RyYWN0XG4gKiBAY2xhc3MgQWpmQmFzZUZpZWxkQ29tcG9uZW50XG4gKiBAdGVtcGxhdGUgVFxuICovXG5ARGlyZWN0aXZlKClcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBamZCYXNlRmllbGRDb21wb25lbnQ8VCBleHRlbmRzIEFqZkZpZWxkSW5zdGFuY2UgPSBBamZGaWVsZEluc3RhbmNlPlxuICBpbXBsZW1lbnRzIE9uRGVzdHJveSwgT25Jbml0XG57XG4gIHByaXZhdGUgX2luc3RhbmNlOiBUIHwgdW5kZWZpbmVkO1xuICBnZXQgaW5zdGFuY2UoKTogVCB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xuICB9XG4gIHNldCBpbnN0YW5jZShpbnN0YW5jZTogVCB8IHVuZGVmaW5lZCkge1xuICAgIGlmIChpbnN0YW5jZSAhPT0gdGhpcy5faW5zdGFuY2UpIHtcbiAgICAgIHRoaXMuX2luc3RhbmNlID0gaW5zdGFuY2U7XG4gICAgICB0aGlzLl9zZXRVcEluc3RhbmNlVXBkYXRlKCk7XG4gICAgICB0aGlzLl9vbkluc3RhbmNlQ2hhbmdlKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfY29udHJvbDogT2JzZXJ2YWJsZTxGb3JtQ29udHJvbCB8IG51bGw+O1xuICBnZXQgY29udHJvbCgpOiBPYnNlcnZhYmxlPEZvcm1Db250cm9sIHwgbnVsbD4ge1xuICAgIHJldHVybiB0aGlzLl9jb250cm9sO1xuICB9XG5cbiAgcHJpdmF0ZSBfd2FybmluZ1RyaWdnZXJTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfaW5zdGFuY2VVcGRhdGVTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgX2NoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcml2YXRlIF9zZXJ2aWNlOiBBamZGb3JtUmVuZGVyZXJTZXJ2aWNlLFxuICAgIHByaXZhdGUgX3dhcm5pbmdBbGVydFNlcnZpY2U6IEFqZldhcm5pbmdBbGVydFNlcnZpY2UsXG4gICkge1xuICAgIHRoaXMuX2NvbnRyb2wgPSBkZWZlcigoKSA9PlxuICAgICAgdGhpcy5fc2VydmljZVxuICAgICAgICAuZ2V0Q29udHJvbCh0aGlzLmluc3RhbmNlKVxuICAgICAgICAucGlwZShtYXAoY3RybCA9PiAoY3RybCB8fCBuZXcgRm9ybUNvbnRyb2woKSkgYXMgRm9ybUNvbnRyb2wpKSxcbiAgICApIGFzIE9ic2VydmFibGU8Rm9ybUNvbnRyb2wgfCBudWxsPjtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmluc3RhbmNlICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX3dhcm5pbmdUcmlnZ2VyU3ViID0gdGhpcy5pbnN0YW5jZS53YXJuaW5nVHJpZ2dlclxuICAgICAgICAucGlwZShcbiAgICAgICAgICB3aXRoTGF0ZXN0RnJvbSh0aGlzLmNvbnRyb2wpLFxuICAgICAgICAgIGZpbHRlcigoW18sIGN0cmxdKSA9PiBjdHJsICE9IG51bGwpLFxuICAgICAgICApXG4gICAgICAgIC5zdWJzY3JpYmUoKFtfLCBjdHJsXSkgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLmluc3RhbmNlID09IG51bGwgfHwgdGhpcy5pbnN0YW5jZS53YXJuaW5nUmVzdWx0cyA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IGNvbnRyb2wgPSBjdHJsIGFzIEZvcm1Db250cm9sO1xuICAgICAgICAgIGNvbnN0IHMgPSB0aGlzLl93YXJuaW5nQWxlcnRTZXJ2aWNlXG4gICAgICAgICAgICAuc2hvd1dhcm5pbmdBbGVydFByb21wdChcbiAgICAgICAgICAgICAgdGhpcy5pbnN0YW5jZS53YXJuaW5nUmVzdWx0cy5maWx0ZXIodyA9PiB3LnJlc3VsdCkubWFwKHcgPT4gdy53YXJuaW5nKSxcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoe1xuICAgICAgICAgICAgICBuZXh0OiAocjogQWpmRmllbGRXYXJuaW5nQWxlcnRSZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoci5yZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgIGNvbnRyb2whLnNldFZhbHVlKG51bGwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgZXJyb3I6IChfZTogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHMpIHtcbiAgICAgICAgICAgICAgICAgIHMudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIGNvbXBsZXRlOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHMpIHtcbiAgICAgICAgICAgICAgICAgIHMudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5fd2FybmluZ1RyaWdnZXJTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9pbnN0YW5jZVVwZGF0ZVN1Yi51bnN1YnNjcmliZSgpO1xuICB9XG4gIC8vIFRPRE86IHdoeT9cbiAgcHJvdGVjdGVkIF9vbkluc3RhbmNlQ2hhbmdlKCk6IHZvaWQge31cblxuICBwcml2YXRlIF9zZXRVcEluc3RhbmNlVXBkYXRlKCk6IHZvaWQge1xuICAgIHRoaXMuX2luc3RhbmNlVXBkYXRlU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgaWYgKHRoaXMuX2luc3RhbmNlICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX2luc3RhbmNlVXBkYXRlU3ViID0gdGhpcy5faW5zdGFuY2UudXBkYXRlZEV2dC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9pbnN0YW5jZVVwZGF0ZVN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgICB9XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG59XG4iXX0=