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
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, ViewEncapsulation, } from '@angular/core';
import { filter, map } from 'rxjs/operators';
import { AjfBaseFieldComponent } from './base-field';
import { AjfFormRendererService } from './form-renderer';
import { AjfFieldType } from './interface/fields/field-type';
import { AJF_WARNING_ALERT_SERVICE } from './warning-alert-service';
import * as i0 from "@angular/core";
import * as i1 from "./form-renderer";
import * as i2 from "@angular/common";
import * as i3 from "@ngneat/transloco";
/**
 * This component allows you to show the values of AjfFieldWithChoicesInstance
 * contained in the control of the form inherited from AjfBaseFieldComponent.
 *
 * @export
 * @class AjfReadOnlySelectFieldComponent
 */
export class AjfReadOnlySelectFieldComponent extends AjfBaseFieldComponent {
    constructor(cdr, service, was) {
        super(cdr, service, was);
        this.multiple = this.control.pipe(filter(control => control != null), map(() => this.instance.node.fieldType === AjfFieldType.MultipleChoice));
    }
}
AjfReadOnlySelectFieldComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfReadOnlySelectFieldComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i1.AjfFormRendererService }, { token: AJF_WARNING_ALERT_SERVICE }], target: i0.ɵɵFactoryTarget.Component });
AjfReadOnlySelectFieldComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.0-next.15", type: AjfReadOnlySelectFieldComponent, selector: "ng-component", usesInheritance: true, ngImport: i0, template: "<ng-container *ngIf=\"control|async as ctrl\">\n    <ng-container *ngFor=\"let choice of instance.filteredChoices; let idx = index\">\n        <ng-container *ngIf=\"multiple|async; else singleChoice\">\n            <span *ngIf=\"ctrl.value && ctrl.value?.indexOf(choice.value) > -1\">\n                {{choice.label|transloco}}{{ctrl.value[ctrl.value.length - 1] !== choice.value ? ', ': ''}}\n            </span>\n        </ng-container>\n        <ng-template #singleChoice>\n            <span *ngIf=\"ctrl.value === choice.value\">{{choice.label|transloco}}</span>\n        </ng-template>\n    </ng-container>\n</ng-container>\n", styles: ["\n"], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], pipes: { "async": i2.AsyncPipe, "transloco": i3.TranslocoPipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfReadOnlySelectFieldComponent, decorators: [{
            type: Component,
            args: [{ changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<ng-container *ngIf=\"control|async as ctrl\">\n    <ng-container *ngFor=\"let choice of instance.filteredChoices; let idx = index\">\n        <ng-container *ngIf=\"multiple|async; else singleChoice\">\n            <span *ngIf=\"ctrl.value && ctrl.value?.indexOf(choice.value) > -1\">\n                {{choice.label|transloco}}{{ctrl.value[ctrl.value.length - 1] !== choice.value ? ', ': ''}}\n            </span>\n        </ng-container>\n        <ng-template #singleChoice>\n            <span *ngIf=\"ctrl.value === choice.value\">{{choice.label|transloco}}</span>\n        </ng-template>\n    </ng-container>\n</ng-container>\n", styles: ["\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i1.AjfFormRendererService }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [AJF_WARNING_ALERT_SERVICE]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZC1vbmx5LXNlbGVjdC1maWVsZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2Zvcm1zL3JlYWQtb25seS1zZWxlY3QtZmllbGQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9mb3Jtcy9yZWFkLW9ubHktc2VsZWN0LWZpZWxkLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBQ0gsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULE1BQU0sRUFDTixpQkFBaUIsR0FDbEIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUUzQyxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFDbkQsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFFdkQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLCtCQUErQixDQUFDO0FBQzNELE9BQU8sRUFBQyx5QkFBeUIsRUFBeUIsTUFBTSx5QkFBeUIsQ0FBQzs7Ozs7QUFFMUY7Ozs7OztHQU1HO0FBT0gsTUFBTSxPQUFPLCtCQUFnQyxTQUFRLHFCQUVwRDtJQUdDLFlBQ0UsR0FBc0IsRUFDdEIsT0FBK0IsRUFDSSxHQUEyQjtRQUU5RCxLQUFLLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQztRQUV6QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUMvQixNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLEVBQ2xDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLEtBQUssWUFBWSxDQUFDLGNBQWMsQ0FBQyxDQUN4RSxDQUFDO0lBQ0osQ0FBQzs7b0lBaEJVLCtCQUErQix5RkFRaEMseUJBQXlCO3dIQVJ4QiwrQkFBK0IsMkVDbEQ1Qyx5bkJBWUE7bUdEc0NhLCtCQUErQjtrQkFOM0MsU0FBUztzQ0FHUyx1QkFBdUIsQ0FBQyxNQUFNLGlCQUNoQyxpQkFBaUIsQ0FBQyxJQUFJOzswQkFVbEMsTUFBTTsyQkFBQyx5QkFBeUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgSW5qZWN0LFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtmaWx0ZXIsIG1hcH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQge0FqZkJhc2VGaWVsZENvbXBvbmVudH0gZnJvbSAnLi9iYXNlLWZpZWxkJztcbmltcG9ydCB7QWpmRm9ybVJlbmRlcmVyU2VydmljZX0gZnJvbSAnLi9mb3JtLXJlbmRlcmVyJztcbmltcG9ydCB7QWpmRmllbGRXaXRoQ2hvaWNlc0luc3RhbmNlfSBmcm9tICcuL2ludGVyZmFjZS9maWVsZHMtaW5zdGFuY2VzL2ZpZWxkLXdpdGgtY2hvaWNlcy1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZkZpZWxkVHlwZX0gZnJvbSAnLi9pbnRlcmZhY2UvZmllbGRzL2ZpZWxkLXR5cGUnO1xuaW1wb3J0IHtBSkZfV0FSTklOR19BTEVSVF9TRVJWSUNFLCBBamZXYXJuaW5nQWxlcnRTZXJ2aWNlfSBmcm9tICcuL3dhcm5pbmctYWxlcnQtc2VydmljZSc7XG5cbi8qKlxuICogVGhpcyBjb21wb25lbnQgYWxsb3dzIHlvdSB0byBzaG93IHRoZSB2YWx1ZXMgb2YgQWpmRmllbGRXaXRoQ2hvaWNlc0luc3RhbmNlXG4gKiBjb250YWluZWQgaW4gdGhlIGNvbnRyb2wgb2YgdGhlIGZvcm0gaW5oZXJpdGVkIGZyb20gQWpmQmFzZUZpZWxkQ29tcG9uZW50LlxuICpcbiAqIEBleHBvcnRcbiAqIEBjbGFzcyBBamZSZWFkT25seVNlbGVjdEZpZWxkQ29tcG9uZW50XG4gKi9cbkBDb21wb25lbnQoe1xuICB0ZW1wbGF0ZVVybDogJ3JlYWQtb25seS1zZWxlY3QtZmllbGQuaHRtbCcsXG4gIHN0eWxlVXJsczogWydyZWFkLW9ubHktc2VsZWN0LWZpZWxkLmNzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbn0pXG5leHBvcnQgY2xhc3MgQWpmUmVhZE9ubHlTZWxlY3RGaWVsZENvbXBvbmVudCBleHRlbmRzIEFqZkJhc2VGaWVsZENvbXBvbmVudDxcbiAgQWpmRmllbGRXaXRoQ2hvaWNlc0luc3RhbmNlPFN0cmluZyB8IG51bWJlcj5cbj4ge1xuICByZWFkb25seSBtdWx0aXBsZTogT2JzZXJ2YWJsZTxib29sZWFuPjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBjZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHNlcnZpY2U6IEFqZkZvcm1SZW5kZXJlclNlcnZpY2UsXG4gICAgQEluamVjdChBSkZfV0FSTklOR19BTEVSVF9TRVJWSUNFKSB3YXM6IEFqZldhcm5pbmdBbGVydFNlcnZpY2UsXG4gICkge1xuICAgIHN1cGVyKGNkciwgc2VydmljZSwgd2FzKTtcblxuICAgIHRoaXMubXVsdGlwbGUgPSB0aGlzLmNvbnRyb2wucGlwZShcbiAgICAgIGZpbHRlcihjb250cm9sID0+IGNvbnRyb2wgIT0gbnVsbCksXG4gICAgICBtYXAoKCkgPT4gdGhpcy5pbnN0YW5jZS5ub2RlLmZpZWxkVHlwZSA9PT0gQWpmRmllbGRUeXBlLk11bHRpcGxlQ2hvaWNlKSxcbiAgICApO1xuICB9XG59XG4iLCI8bmctY29udGFpbmVyICpuZ0lmPVwiY29udHJvbHxhc3luYyBhcyBjdHJsXCI+XG4gICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgY2hvaWNlIG9mIGluc3RhbmNlLmZpbHRlcmVkQ2hvaWNlczsgbGV0IGlkeCA9IGluZGV4XCI+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJtdWx0aXBsZXxhc3luYzsgZWxzZSBzaW5nbGVDaG9pY2VcIj5cbiAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiY3RybC52YWx1ZSAmJiBjdHJsLnZhbHVlPy5pbmRleE9mKGNob2ljZS52YWx1ZSkgPiAtMVwiPlxuICAgICAgICAgICAgICAgIHt7Y2hvaWNlLmxhYmVsfHRyYW5zbG9jb319e3tjdHJsLnZhbHVlW2N0cmwudmFsdWUubGVuZ3RoIC0gMV0gIT09IGNob2ljZS52YWx1ZSA/ICcsICc6ICcnfX1cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDxuZy10ZW1wbGF0ZSAjc2luZ2xlQ2hvaWNlPlxuICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJjdHJsLnZhbHVlID09PSBjaG9pY2UudmFsdWVcIj57e2Nob2ljZS5sYWJlbHx0cmFuc2xvY299fTwvc3Bhbj5cbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8L25nLWNvbnRhaW5lcj5cbjwvbmctY29udGFpbmVyPlxuIl19