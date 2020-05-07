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
var AjfBaseFieldComponent = /** @class */ (function () {
    function AjfBaseFieldComponent(_changeDetectorRef, _service, _warningAlertService) {
        var _this = this;
        this._changeDetectorRef = _changeDetectorRef;
        this._service = _service;
        this._warningAlertService = _warningAlertService;
        this._warningTriggerSub = Subscription.EMPTY;
        this._instanceUpdateSub = Subscription.EMPTY;
        this._control = defer(function () { return _this._service.getControl(_this.instance)
            .pipe(map(function (ctrl) { return ctrl || new FormControl(); })); });
    }
    Object.defineProperty(AjfBaseFieldComponent.prototype, "instance", {
        get: function () {
            return this._instance;
        },
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
    Object.defineProperty(AjfBaseFieldComponent.prototype, "control", {
        get: function () {
            return this._control;
        },
        enumerable: true,
        configurable: true
    });
    AjfBaseFieldComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._warningTriggerSub =
            this.instance.warningTrigger.pipe(withLatestFrom(this.control), filter(function (v) { return v[1] != null; }))
                .subscribe(function (v) {
                if (_this.instance.warningResults == null) {
                    return;
                }
                var control = v[1];
                var s = _this._warningAlertService
                    .showWarningAlertPrompt(_this.instance.warningResults.filter(function (w) { return w.result; }).map(function (w) { return w.warning; }))
                    .subscribe(function (r) {
                    if (r.result) {
                        control.setValue(null);
                    }
                }, function (_e) {
                    if (s) {
                        s.unsubscribe();
                    }
                }, function () {
                    if (s) {
                        s.unsubscribe();
                    }
                });
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
                    catch (e) {
                    }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS1maWVsZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2Zvcm1zL2Jhc2UtZmllbGQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBR0gsT0FBTyxFQUFrQixXQUFXLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUM1RCxPQUFPLEVBQUMsS0FBSyxFQUFjLFlBQVksRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUNyRCxPQUFPLEVBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxjQUFjLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQU8zRDtJQXNCRSwrQkFDYyxrQkFBcUMsRUFDdkMsUUFBZ0MsRUFDaEMsb0JBQTRDO1FBSHhELGlCQVVDO1FBVGEsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFtQjtRQUN2QyxhQUFRLEdBQVIsUUFBUSxDQUF3QjtRQUNoQyx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXdCO1FBTmhELHVCQUFrQixHQUFpQixZQUFZLENBQUMsS0FBSyxDQUFDO1FBQ3RELHVCQUFrQixHQUFpQixZQUFZLENBQUMsS0FBSyxDQUFDO1FBTzVELElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUNqQixjQUFNLE9BQUEsS0FBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsS0FBSSxDQUFDLFFBQVEsQ0FBQzthQUNsQyxJQUFJLENBQ0QsR0FBRyxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsSUFBbUIsSUFBSSxJQUFJLFdBQVcsRUFBRSxFQUF4QyxDQUF3QyxDQUFDLENBQ3BELEVBSFQsQ0FHUyxDQUFDLENBQUM7SUFDdkIsQ0FBQztJQTdCRCxzQkFBSSwyQ0FBUTthQUFaO1lBQ0UsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ3hCLENBQUM7YUFDRCxVQUFhLFFBQVc7WUFDdEIsSUFBSSxRQUFRLEtBQUssSUFBSSxDQUFDLFNBQVMsRUFBRTtnQkFDL0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7Z0JBQzFCLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO2dCQUM1QixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQzthQUMxQjtRQUNILENBQUM7OztPQVBBO0lBVUQsc0JBQUksMENBQU87YUFBWDtZQUNFLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUN2QixDQUFDOzs7T0FBQTtJQWlCRCx3Q0FBUSxHQUFSO1FBQUEsaUJBNkJDO1FBNUJDLElBQUksQ0FBQyxrQkFBa0I7WUFDbkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsTUFBTSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksRUFBWixDQUFZLENBQUMsQ0FBQztpQkFDckYsU0FBUyxDQUFDLFVBQUMsQ0FBK0I7Z0JBQ3pDLElBQUksS0FBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLElBQUksSUFBSSxFQUFFO29CQUN4QyxPQUFPO2lCQUNSO2dCQUNELElBQU0sT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDckIsSUFBTSxDQUFDLEdBQ0gsS0FBSSxDQUFDLG9CQUFvQjtxQkFDcEIsc0JBQXNCLENBQ25CLEtBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxNQUFNLEVBQVIsQ0FBUSxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLE9BQU8sRUFBVCxDQUFTLENBQUMsQ0FBQztxQkFDMUUsU0FBUyxDQUNOLFVBQUMsQ0FBNkI7b0JBQzVCLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRTt3QkFDWixPQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO3FCQUN6QjtnQkFDSCxDQUFDLEVBQ0QsVUFBQyxFQUFPO29CQUNOLElBQUksQ0FBQyxFQUFFO3dCQUNMLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztxQkFDakI7Z0JBQ0gsQ0FBQyxFQUNEO29CQUNFLElBQUksQ0FBQyxFQUFFO3dCQUNMLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztxQkFDakI7Z0JBQ0gsQ0FBQyxDQUFDLENBQUM7WUFDakIsQ0FBQyxDQUFDLENBQUM7SUFDYixDQUFDO0lBRUQsMkNBQVcsR0FBWDtRQUNFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN0QyxJQUFJLENBQUMsa0JBQWtCLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDeEMsQ0FBQztJQUVTLGlEQUFpQixHQUEzQixjQUFxQyxDQUFDO0lBRTlCLG9EQUFvQixHQUE1QjtRQUFBLGlCQWVDO1FBZEMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3RDLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLEVBQUU7WUFDMUIsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQztnQkFDNUQsSUFBSSxLQUFJLENBQUMsa0JBQWtCLEVBQUU7b0JBQzNCLElBQUk7d0JBQ0YsS0FBSSxDQUFDLGtCQUFrQixDQUFDLGFBQWEsRUFBRSxDQUFDO3FCQUN6QztvQkFBQyxPQUFPLENBQUMsRUFBRTtxQkFDWDtpQkFDRjtZQUNILENBQUMsQ0FBQyxDQUFDO1NBQ0o7YUFBTTtZQUNMLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDO1NBQzlDO1FBQ0QsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzFDLENBQUM7SUFDSCw0QkFBQztBQUFELENBQUMsQUF4RkQsSUF3RkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7Q2hhbmdlRGV0ZWN0b3JSZWYsIE9uRGVzdHJveSwgT25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7QWJzdHJhY3RDb250cm9sLCBGb3JtQ29udHJvbH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtkZWZlciwgT2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcbmltcG9ydCB7ZmlsdGVyLCBtYXAsIHdpdGhMYXRlc3RGcm9tfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7QWpmRmllbGRXYXJuaW5nQWxlcnRSZXN1bHR9IGZyb20gJy4vZmllbGQtd2FybmluZy1hbGVydC1yZXN1bHQnO1xuaW1wb3J0IHtBamZGb3JtUmVuZGVyZXJTZXJ2aWNlfSBmcm9tICcuL2Zvcm0tcmVuZGVyZXInO1xuaW1wb3J0IHtBamZGaWVsZEluc3RhbmNlfSBmcm9tICcuL2ludGVyZmFjZS9maWVsZHMtaW5zdGFuY2VzL2ZpZWxkLWluc3RhbmNlJztcbmltcG9ydCB7QWpmV2FybmluZ0FsZXJ0U2VydmljZX0gZnJvbSAnLi93YXJuaW5nLWFsZXJ0LXNlcnZpY2UnO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQWpmQmFzZUZpZWxkQ29tcG9uZW50PFQgZXh0ZW5kcyBBamZGaWVsZEluc3RhbmNlID0gQWpmRmllbGRJbnN0YW5jZT5cbiAgICBpbXBsZW1lbnRzIE9uRGVzdHJveSwgT25Jbml0IHtcbiAgcHJpdmF0ZSBfaW5zdGFuY2U6IFQ7XG4gIGdldCBpbnN0YW5jZSgpOiBUIHtcbiAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XG4gIH1cbiAgc2V0IGluc3RhbmNlKGluc3RhbmNlOiBUKSB7XG4gICAgaWYgKGluc3RhbmNlICE9PSB0aGlzLl9pbnN0YW5jZSkge1xuICAgICAgdGhpcy5faW5zdGFuY2UgPSBpbnN0YW5jZTtcbiAgICAgIHRoaXMuX3NldFVwSW5zdGFuY2VVcGRhdGUoKTtcbiAgICAgIHRoaXMuX29uSW5zdGFuY2VDaGFuZ2UoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9jb250cm9sOiBPYnNlcnZhYmxlPEZvcm1Db250cm9sfG51bGw+O1xuICBnZXQgY29udHJvbCgpOiBPYnNlcnZhYmxlPEZvcm1Db250cm9sfG51bGw+IHtcbiAgICByZXR1cm4gdGhpcy5fY29udHJvbDtcbiAgfVxuXG4gIHByaXZhdGUgX3dhcm5pbmdUcmlnZ2VyU3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX2luc3RhbmNlVXBkYXRlU3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBwcm90ZWN0ZWQgX2NoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgIHByaXZhdGUgX3NlcnZpY2U6IEFqZkZvcm1SZW5kZXJlclNlcnZpY2UsXG4gICAgICBwcml2YXRlIF93YXJuaW5nQWxlcnRTZXJ2aWNlOiBBamZXYXJuaW5nQWxlcnRTZXJ2aWNlLFxuICApIHtcbiAgICB0aGlzLl9jb250cm9sID0gZGVmZXIoXG4gICAgICAgICgpID0+IHRoaXMuX3NlcnZpY2UuZ2V0Q29udHJvbCh0aGlzLmluc3RhbmNlKVxuICAgICAgICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgICAgbWFwKGN0cmwgPT4gY3RybCBhcyBGb3JtQ29udHJvbCB8fCBuZXcgRm9ybUNvbnRyb2woKSksXG4gICAgICAgICAgICAgICAgICAgICAgKSk7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLl93YXJuaW5nVHJpZ2dlclN1YiA9XG4gICAgICAgIHRoaXMuaW5zdGFuY2Uud2FybmluZ1RyaWdnZXIucGlwZSh3aXRoTGF0ZXN0RnJvbSh0aGlzLmNvbnRyb2wpLCBmaWx0ZXIodiA9PiB2WzFdICE9IG51bGwpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgodjogW3ZvaWQsIEFic3RyYWN0Q29udHJvbHxudWxsXSkgPT4ge1xuICAgICAgICAgICAgICBpZiAodGhpcy5pbnN0YW5jZS53YXJuaW5nUmVzdWx0cyA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGNvbnN0IGNvbnRyb2wgPSB2WzFdO1xuICAgICAgICAgICAgICBjb25zdCBzID1cbiAgICAgICAgICAgICAgICAgIHRoaXMuX3dhcm5pbmdBbGVydFNlcnZpY2VcbiAgICAgICAgICAgICAgICAgICAgICAuc2hvd1dhcm5pbmdBbGVydFByb21wdChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnN0YW5jZS53YXJuaW5nUmVzdWx0cy5maWx0ZXIodyA9PiB3LnJlc3VsdCkubWFwKHcgPT4gdy53YXJuaW5nKSlcbiAgICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAocjogQWpmRmllbGRXYXJuaW5nQWxlcnRSZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoci5yZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2whLnNldFZhbHVlKG51bGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKF9lOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcy51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5fd2FybmluZ1RyaWdnZXJTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9pbnN0YW5jZVVwZGF0ZVN1Yi51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9vbkluc3RhbmNlQ2hhbmdlKCk6IHZvaWQge31cblxuICBwcml2YXRlIF9zZXRVcEluc3RhbmNlVXBkYXRlKCk6IHZvaWQge1xuICAgIHRoaXMuX2luc3RhbmNlVXBkYXRlU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgaWYgKHRoaXMuX2luc3RhbmNlICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX2luc3RhbmNlVXBkYXRlU3ViID0gdGhpcy5faW5zdGFuY2UudXBkYXRlZEV2dC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9pbnN0YW5jZVVwZGF0ZVN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgICB9XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG59XG4iXX0=