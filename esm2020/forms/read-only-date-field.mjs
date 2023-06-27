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
import { ChangeDetectionStrategy, Component, Inject, ViewEncapsulation, } from '@angular/core';
import { parse, toDate } from 'date-fns';
import { filter, map } from 'rxjs/operators';
import { AjfInputFieldComponent as CoreComponent } from './input-field';
import { AJF_WARNING_ALERT_SERVICE } from './warning-alert-service';
import { DatePipe } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "./form-renderer";
import * as i2 from "@ajf/core/transloco";
import * as i3 from "@angular/common";
/**
 * this component show the control value inherited from AjfBaseFieldComponent.
 *
 * @export
 * @class AjfReadOnlyDateFieldComponent
 */
export class AjfReadOnlyDateFieldComponent extends CoreComponent {
    constructor(cdr, service, _ts, was) {
        super(cdr, service, was);
        this._ts = _ts;
        this.date = this.control.pipe(filter(control => control != null), map(ctrl => {
            if (ctrl) {
                const val = ctrl.value;
                if (val == null) {
                    return '';
                }
                let dt = null;
                if (typeof val === 'string') {
                    dt = parse(val, 'yyyy-MM-dd', new Date());
                }
                else {
                    dt = toDate(val);
                }
                if (!isNaN(dt.valueOf())) {
                    const datePipe = new DatePipe(this._getCurrentLocale());
                    return datePipe.transform(dt, 'shortDate');
                }
                return '';
            }
            return '';
        }));
    }
    _getCurrentLocale() {
        const lang = this._ts.getActiveLang();
        switch (lang) {
            case 'ESP':
                return 'es';
            case 'FRA':
                return 'fr';
            case 'ITA':
                return 'it';
            case 'PRT':
                return 'pt';
            default:
                return 'en';
        }
    }
}
AjfReadOnlyDateFieldComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfReadOnlyDateFieldComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i1.AjfFormRendererService }, { token: i2.TranslocoService }, { token: AJF_WARNING_ALERT_SERVICE }], target: i0.ɵɵFactoryTarget.Component });
AjfReadOnlyDateFieldComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.4", type: AjfReadOnlyDateFieldComponent, selector: "ajf-read-date-only-field", usesInheritance: true, ngImport: i0, template: "<span *ngIf=\"date|async as dateVal\">{{dateVal}}</span>\n", styles: ["ajf-read-only-field span{min-height:1em;display:block}\n"], dependencies: [{ kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "pipe", type: i3.AsyncPipe, name: "async" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfReadOnlyDateFieldComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ajf-read-date-only-field', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<span *ngIf=\"date|async as dateVal\">{{dateVal}}</span>\n", styles: ["ajf-read-only-field span{min-height:1em;display:block}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i1.AjfFormRendererService }, { type: i2.TranslocoService }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [AJF_WARNING_ALERT_SERVICE]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZC1vbmx5LWRhdGUtZmllbGQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL2Zvcm1zL3NyYy9yZWFkLW9ubHktZGF0ZS1maWVsZC50cyIsIi4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvZm9ybXMvc3JjL3JlYWQtb25seS1kYXRlLWZpZWxkLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUNMLHVCQUF1QixFQUV2QixTQUFTLEVBQ1QsTUFBTSxFQUNOLGlCQUFpQixHQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsS0FBSyxFQUFFLE1BQU0sRUFBQyxNQUFNLFVBQVUsQ0FBQztBQUV2QyxPQUFPLEVBQUMsTUFBTSxFQUFFLEdBQUcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBQyxzQkFBc0IsSUFBSSxhQUFhLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFHdEUsT0FBTyxFQUFDLHlCQUF5QixFQUF5QixNQUFNLHlCQUF5QixDQUFDO0FBRTFGLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQzs7Ozs7QUFFekM7Ozs7O0dBS0c7QUFRSCxNQUFNLE9BQU8sNkJBQThCLFNBQVEsYUFBYTtJQUc5RCxZQUNFLEdBQXNCLEVBQ3RCLE9BQStCLEVBQ3ZCLEdBQXFCLEVBQ00sR0FBMkI7UUFFOUQsS0FBSyxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFIakIsUUFBRyxHQUFILEdBQUcsQ0FBa0I7UUFLN0IsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FDM0IsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxFQUNsQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDVCxJQUFJLElBQUksRUFBRTtnQkFDUixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO2dCQUN2QixJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUU7b0JBQ2YsT0FBTyxFQUFFLENBQUM7aUJBQ1g7Z0JBRUQsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDO2dCQUNkLElBQUksT0FBTyxHQUFHLEtBQUssUUFBUSxFQUFFO29CQUMzQixFQUFFLEdBQUcsS0FBSyxDQUFDLEdBQUcsRUFBRSxZQUFZLEVBQUUsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDO2lCQUMzQztxQkFBTTtvQkFDTCxFQUFFLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUNsQjtnQkFDRCxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFO29CQUN4QixNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDO29CQUN4RCxPQUFPLFFBQVEsQ0FBQyxTQUFTLENBQUMsRUFBRSxFQUFFLFdBQVcsQ0FBVyxDQUFDO2lCQUN0RDtnQkFDRCxPQUFPLEVBQUUsQ0FBQzthQUNYO1lBQ0QsT0FBTyxFQUFFLENBQUM7UUFDWixDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQztJQUVPLGlCQUFpQjtRQUN2QixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3RDLFFBQVEsSUFBSSxFQUFFO1lBQ1osS0FBSyxLQUFLO2dCQUNSLE9BQU8sSUFBSSxDQUFDO1lBQ2QsS0FBSyxLQUFLO2dCQUNSLE9BQU8sSUFBSSxDQUFDO1lBQ2QsS0FBSyxLQUFLO2dCQUNSLE9BQU8sSUFBSSxDQUFDO1lBQ2QsS0FBSyxLQUFLO2dCQUNSLE9BQU8sSUFBSSxDQUFDO1lBQ2Q7Z0JBQ0UsT0FBTyxJQUFJLENBQUM7U0FDZjtJQUNILENBQUM7OzBIQW5EVSw2QkFBNkIseUhBTzlCLHlCQUF5Qjs4R0FQeEIsNkJBQTZCLHVGQ3BEMUMsNERBQ0E7MkZEbURhLDZCQUE2QjtrQkFQekMsU0FBUzsrQkFDRSwwQkFBMEIsbUJBR25CLHVCQUF1QixDQUFDLE1BQU0saUJBQ2hDLGlCQUFpQixDQUFDLElBQUk7OzBCQVNsQyxNQUFNOzJCQUFDLHlCQUF5QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEluamVjdCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtwYXJzZSwgdG9EYXRlfSBmcm9tICdkYXRlLWZucyc7XG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtmaWx0ZXIsIG1hcH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHtBamZJbnB1dEZpZWxkQ29tcG9uZW50IGFzIENvcmVDb21wb25lbnR9IGZyb20gJy4vaW5wdXQtZmllbGQnO1xuXG5pbXBvcnQge0FqZkZvcm1SZW5kZXJlclNlcnZpY2V9IGZyb20gJy4vZm9ybS1yZW5kZXJlcic7XG5pbXBvcnQge0FKRl9XQVJOSU5HX0FMRVJUX1NFUlZJQ0UsIEFqZldhcm5pbmdBbGVydFNlcnZpY2V9IGZyb20gJy4vd2FybmluZy1hbGVydC1zZXJ2aWNlJztcbmltcG9ydCB7VHJhbnNsb2NvU2VydmljZX0gZnJvbSAnQGFqZi9jb3JlL3RyYW5zbG9jbyc7XG5pbXBvcnQge0RhdGVQaXBlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG4vKipcbiAqIHRoaXMgY29tcG9uZW50IHNob3cgdGhlIGNvbnRyb2wgdmFsdWUgaW5oZXJpdGVkIGZyb20gQWpmQmFzZUZpZWxkQ29tcG9uZW50LlxuICpcbiAqIEBleHBvcnRcbiAqIEBjbGFzcyBBamZSZWFkT25seURhdGVGaWVsZENvbXBvbmVudFxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhamYtcmVhZC1kYXRlLW9ubHktZmllbGQnLFxuICB0ZW1wbGF0ZVVybDogJ3JlYWQtb25seS1kYXRlLWZpZWxkLmh0bWwnLFxuICBzdHlsZVVybHM6IFsncmVhZC1vbmx5LWRhdGUtZmllbGQuc2NzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbn0pXG5leHBvcnQgY2xhc3MgQWpmUmVhZE9ubHlEYXRlRmllbGRDb21wb25lbnQgZXh0ZW5kcyBDb3JlQ29tcG9uZW50IHtcbiAgcmVhZG9ubHkgZGF0ZTogT2JzZXJ2YWJsZTxzdHJpbmc+O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgc2VydmljZTogQWpmRm9ybVJlbmRlcmVyU2VydmljZSxcbiAgICBwcml2YXRlIF90czogVHJhbnNsb2NvU2VydmljZSxcbiAgICBASW5qZWN0KEFKRl9XQVJOSU5HX0FMRVJUX1NFUlZJQ0UpIHdhczogQWpmV2FybmluZ0FsZXJ0U2VydmljZSxcbiAgKSB7XG4gICAgc3VwZXIoY2RyLCBzZXJ2aWNlLCB3YXMpO1xuXG4gICAgdGhpcy5kYXRlID0gdGhpcy5jb250cm9sLnBpcGUoXG4gICAgICBmaWx0ZXIoY29udHJvbCA9PiBjb250cm9sICE9IG51bGwpLFxuICAgICAgbWFwKGN0cmwgPT4ge1xuICAgICAgICBpZiAoY3RybCkge1xuICAgICAgICAgIGNvbnN0IHZhbCA9IGN0cmwudmFsdWU7XG4gICAgICAgICAgaWYgKHZhbCA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbGV0IGR0ID0gbnVsbDtcbiAgICAgICAgICBpZiAodHlwZW9mIHZhbCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGR0ID0gcGFyc2UodmFsLCAneXl5eS1NTS1kZCcsIG5ldyBEYXRlKCkpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkdCA9IHRvRGF0ZSh2YWwpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIWlzTmFOKGR0LnZhbHVlT2YoKSkpIHtcbiAgICAgICAgICAgIGNvbnN0IGRhdGVQaXBlID0gbmV3IERhdGVQaXBlKHRoaXMuX2dldEN1cnJlbnRMb2NhbGUoKSk7XG4gICAgICAgICAgICByZXR1cm4gZGF0ZVBpcGUudHJhbnNmb3JtKGR0LCAnc2hvcnREYXRlJykgYXMgc3RyaW5nO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICcnO1xuICAgICAgfSksXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgX2dldEN1cnJlbnRMb2NhbGUoKTogc3RyaW5nIHtcbiAgICBjb25zdCBsYW5nID0gdGhpcy5fdHMuZ2V0QWN0aXZlTGFuZygpO1xuICAgIHN3aXRjaCAobGFuZykge1xuICAgICAgY2FzZSAnRVNQJzpcbiAgICAgICAgcmV0dXJuICdlcyc7XG4gICAgICBjYXNlICdGUkEnOlxuICAgICAgICByZXR1cm4gJ2ZyJztcbiAgICAgIGNhc2UgJ0lUQSc6XG4gICAgICAgIHJldHVybiAnaXQnO1xuICAgICAgY2FzZSAnUFJUJzpcbiAgICAgICAgcmV0dXJuICdwdCc7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gJ2VuJztcbiAgICB9XG4gIH1cbn1cbiIsIjxzcGFuICpuZ0lmPVwiZGF0ZXxhc3luYyBhcyBkYXRlVmFsXCI+e3tkYXRlVmFsfX08L3NwYW4+XG4iXX0=