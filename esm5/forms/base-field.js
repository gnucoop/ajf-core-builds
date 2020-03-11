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
var AjfBaseFieldComponent = /** @class */ (function () {
    function AjfBaseFieldComponent(_changeDetectorRef, _service, _warningAlertService) {
        var _this = this;
        this._changeDetectorRef = _changeDetectorRef;
        this._service = _service;
        this._warningAlertService = _warningAlertService;
        this._warningTriggerSub = Subscription.EMPTY;
        this._instanceUpdateSub = Subscription.EMPTY;
        this._control = defer(function () { return _this._service.getControl(_this.instance).pipe(map(function (ctrl) { return ctrl || new FormControl(); })); });
    }
    Object.defineProperty(AjfBaseFieldComponent.prototype, "instance", {
        get: function () { return this._instance; },
        set: function (instance) {
            if (instance !== this._instance) {
                this._instance = instance;
                this._setUpInstanceUpdate();
                this._onInstanceChange();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfBaseFieldComponent.prototype, "readonly", {
        get: function () { return this._readonly; },
        set: function (readonly) {
            this._readonly = coerceBooleanProperty(readonly);
            this._changeDetectorRef.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfBaseFieldComponent.prototype, "control", {
        get: function () { return this._control; },
        enumerable: true,
        configurable: true
    });
    AjfBaseFieldComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._warningTriggerSub = this.instance.warningTrigger.pipe(withLatestFrom(this.control), filter(function (v) { return v[1] != null; })).subscribe(function (v) {
            if (_this.instance.warningResults == null) {
                return;
            }
            var control = v[1];
            var s = _this._warningAlertService.showWarningAlertPrompt(_this.instance.warningResults.filter(function (w) { return w.result; }).map(function (w) { return w.warning; })).subscribe(function (r) {
                if (r.result) {
                    control.setValue(null);
                }
            }, function (_e) { if (s) {
                s.unsubscribe();
            } }, function () { if (s) {
                s.unsubscribe();
            } });
        });
    };
    AjfBaseFieldComponent.prototype.ngOnDestroy = function () {
        this._warningTriggerSub.unsubscribe();
        this._instanceUpdateSub.unsubscribe();
    };
    AjfBaseFieldComponent.prototype._onInstanceChange = function () { };
    AjfBaseFieldComponent.prototype._setUpInstanceUpdate = function () {
        var _this = this;
        this._instanceUpdateSub.unsubscribe();
        if (this._instance != null) {
            this._instanceUpdateSub = this._instance.updatedEvt.subscribe(function () {
                if (_this._changeDetectorRef) {
                    try {
                        _this._changeDetectorRef.detectChanges();
                    }
                    catch (e) { }
                }
            });
        }
        else {
            this._instanceUpdateSub = Subscription.EMPTY;
        }
        this._changeDetectorRef.detectChanges();
    };
    return AjfBaseFieldComponent;
}());
export { AjfBaseFieldComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS1maWVsZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2Zvcm1zL2Jhc2UtZmllbGQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFFNUQsT0FBTyxFQUFrQixXQUFXLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUM1RCxPQUFPLEVBQUMsS0FBSyxFQUFjLFlBQVksRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUNyRCxPQUFPLEVBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxjQUFjLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQU8zRDtJQXlCRSwrQkFDWSxrQkFBcUMsRUFDdkMsUUFBZ0MsRUFDaEMsb0JBQTRDO1FBSHRELGlCQVFDO1FBUFcsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFtQjtRQUN2QyxhQUFRLEdBQVIsUUFBUSxDQUF3QjtRQUNoQyx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXdCO1FBTjlDLHVCQUFrQixHQUFpQixZQUFZLENBQUMsS0FBSyxDQUFDO1FBQ3RELHVCQUFrQixHQUFpQixZQUFZLENBQUMsS0FBSyxDQUFDO1FBTzVELElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxLQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUN0RSxHQUFHLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxJQUFtQixJQUFJLElBQUksV0FBVyxFQUFFLEVBQXhDLENBQXdDLENBQUMsQ0FDdEQsRUFGMkIsQ0FFM0IsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQTlCRCxzQkFBSSwyQ0FBUTthQUFaLGNBQW9CLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7YUFD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QztTQUNKO2FBQU07WUFDTCxJQUFJLENBQUMsa0JBQWtCLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQztTQUM5QztRQUNELElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUMxQyxDQUFDO0lBQ0gsNEJBQUM7QUFBRCxDQUFDLEFBNUVELElBNEVDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge2NvZXJjZUJvb2xlYW5Qcm9wZXJ0eX0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7Q2hhbmdlRGV0ZWN0b3JSZWYsIE9uRGVzdHJveSwgT25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7QWJzdHJhY3RDb250cm9sLCBGb3JtQ29udHJvbH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtkZWZlciwgT2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcbmltcG9ydCB7ZmlsdGVyLCBtYXAsIHdpdGhMYXRlc3RGcm9tfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7QWpmRmllbGRXYXJuaW5nQWxlcnRSZXN1bHR9IGZyb20gJy4vZmllbGQtd2FybmluZy1hbGVydC1yZXN1bHQnO1xuaW1wb3J0IHtBamZGb3JtUmVuZGVyZXJTZXJ2aWNlfSBmcm9tICcuL2Zvcm0tcmVuZGVyZXInO1xuaW1wb3J0IHtBamZGaWVsZEluc3RhbmNlfSBmcm9tICcuL2ludGVyZmFjZS9maWVsZHMtaW5zdGFuY2VzL2ZpZWxkLWluc3RhbmNlJztcbmltcG9ydCB7QWpmV2FybmluZ0FsZXJ0U2VydmljZX0gZnJvbSAnLi93YXJuaW5nLWFsZXJ0LXNlcnZpY2UnO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQWpmQmFzZUZpZWxkQ29tcG9uZW50PFQgZXh0ZW5kcyBBamZGaWVsZEluc3RhbmNlID0gQWpmRmllbGRJbnN0YW5jZT5cbiAgICBpbXBsZW1lbnRzIE9uRGVzdHJveSwgT25Jbml0IHtcbiAgcHJpdmF0ZSBfaW5zdGFuY2U6IFQ7XG4gIGdldCBpbnN0YW5jZSgpOiBUIHsgcmV0dXJuIHRoaXMuX2luc3RhbmNlOyB9XG4gIHNldCBpbnN0YW5jZShpbnN0YW5jZTogVCkge1xuICAgIGlmIChpbnN0YW5jZSAhPT0gdGhpcy5faW5zdGFuY2UpIHtcbiAgICAgIHRoaXMuX2luc3RhbmNlID0gaW5zdGFuY2U7XG4gICAgICB0aGlzLl9zZXRVcEluc3RhbmNlVXBkYXRlKCk7XG4gICAgICB0aGlzLl9vbkluc3RhbmNlQ2hhbmdlKCk7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIF9yZWFkb25seTogYm9vbGVhbjtcbiAgZ2V0IHJlYWRvbmx5KCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fcmVhZG9ubHk7IH1cbiAgc2V0IHJlYWRvbmx5KHJlYWRvbmx5OiBib29sZWFuKSB7XG4gICAgdGhpcy5fcmVhZG9ubHkgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkocmVhZG9ubHkpO1xuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfY29udHJvbDogT2JzZXJ2YWJsZTxGb3JtQ29udHJvbCB8IG51bGw+O1xuICBnZXQgY29udHJvbCgpOiBPYnNlcnZhYmxlPEZvcm1Db250cm9sIHwgbnVsbD4geyByZXR1cm4gdGhpcy5fY29udHJvbDsgfVxuXG4gIHByaXZhdGUgX3dhcm5pbmdUcmlnZ2VyU3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX2luc3RhbmNlVXBkYXRlU3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIF9jaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJpdmF0ZSBfc2VydmljZTogQWpmRm9ybVJlbmRlcmVyU2VydmljZSxcbiAgICBwcml2YXRlIF93YXJuaW5nQWxlcnRTZXJ2aWNlOiBBamZXYXJuaW5nQWxlcnRTZXJ2aWNlLFxuICApIHtcbiAgICB0aGlzLl9jb250cm9sID0gZGVmZXIoKCkgPT4gdGhpcy5fc2VydmljZS5nZXRDb250cm9sKHRoaXMuaW5zdGFuY2UpLnBpcGUoXG4gICAgICBtYXAoY3RybCA9PiBjdHJsIGFzIEZvcm1Db250cm9sIHx8IG5ldyBGb3JtQ29udHJvbCgpKSxcbiAgICApKTtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuX3dhcm5pbmdUcmlnZ2VyU3ViID0gdGhpcy5pbnN0YW5jZS53YXJuaW5nVHJpZ2dlci5waXBlKFxuICAgICAgd2l0aExhdGVzdEZyb20odGhpcy5jb250cm9sKSxcbiAgICAgIGZpbHRlcih2ID0+IHZbMV0gIT0gbnVsbClcbiAgICApLnN1YnNjcmliZSgodjogW3ZvaWQsIEFic3RyYWN0Q29udHJvbCB8IG51bGxdKSA9PiB7XG4gICAgICBpZiAodGhpcy5pbnN0YW5jZS53YXJuaW5nUmVzdWx0cyA9PSBudWxsKSB7IHJldHVybjsgfVxuICAgICAgY29uc3QgY29udHJvbCA9IHZbMV07XG4gICAgICBjb25zdCBzID0gdGhpcy5fd2FybmluZ0FsZXJ0U2VydmljZS5zaG93V2FybmluZ0FsZXJ0UHJvbXB0KFxuICAgICAgICB0aGlzLmluc3RhbmNlLndhcm5pbmdSZXN1bHRzLmZpbHRlcih3ID0+IHcucmVzdWx0KS5tYXAodyA9PiB3Lndhcm5pbmcpXG4gICAgICApLnN1YnNjcmliZShcbiAgICAgICAgKHI6IEFqZkZpZWxkV2FybmluZ0FsZXJ0UmVzdWx0KSA9PiB7XG4gICAgICAgICAgaWYgKHIucmVzdWx0KSB7IGNvbnRyb2whLnNldFZhbHVlKG51bGwpOyB9XG4gICAgICAgIH0sXG4gICAgICAgIChfZTogYW55KSA9PiB7IGlmIChzKSB7IHMudW5zdWJzY3JpYmUoKTsgfX0sXG4gICAgICAgICgpID0+IHsgaWYgKHMpIHsgcy51bnN1YnNjcmliZSgpOyB9fVxuICAgICAgKTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuX3dhcm5pbmdUcmlnZ2VyU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5faW5zdGFuY2VVcGRhdGVTdWIudW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfb25JbnN0YW5jZUNoYW5nZSgpOiB2b2lkIHsgfVxuXG4gIHByaXZhdGUgX3NldFVwSW5zdGFuY2VVcGRhdGUoKTogdm9pZCB7XG4gICAgdGhpcy5faW5zdGFuY2VVcGRhdGVTdWIudW5zdWJzY3JpYmUoKTtcbiAgICBpZiAodGhpcy5faW5zdGFuY2UgIT0gbnVsbCkge1xuICAgICAgdGhpcy5faW5zdGFuY2VVcGRhdGVTdWIgPSB0aGlzLl9pbnN0YW5jZS51cGRhdGVkRXZ0LnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZikge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgICAgfSBjYXRjaCAoZSkgeyB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9pbnN0YW5jZVVwZGF0ZVN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgICB9XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG59XG4iXX0=