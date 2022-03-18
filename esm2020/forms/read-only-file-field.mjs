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
import { fileIcon } from '@ajf/core/file-input';
import { ChangeDetectionStrategy, Component, Inject, ViewEncapsulation, } from '@angular/core';
import { filter, map, shareReplay, startWith, switchMap } from 'rxjs/operators';
import { AjfBaseFieldComponent } from './base-field';
import { AJF_WARNING_ALERT_SERVICE } from './warning-alert-service';
import * as i0 from "@angular/core";
import * as i1 from "./form-renderer";
import * as i2 from "@angular/platform-browser";
import * as i3 from "@angular/common";
/**
 * This component allows you to download the file contained in the control of
 * the form inherited from AjfBaseFieldComponent.
 *
 * @export
 * @class AjfReadOnlyFileFieldComponent
 */
export class AjfReadOnlyFileFieldComponent extends AjfBaseFieldComponent {
    constructor(cdr, service, was, domSanitizer) {
        super(cdr, service, was);
        this.fileIcon = domSanitizer.bypassSecurityTrustResourceUrl(fileIcon);
        const fileStream = this.control.pipe(filter(control => control != null), switchMap(control => {
            control = control;
            return control.valueChanges.pipe(startWith(control.value));
        }), filter(value => value != null), shareReplay(1));
        this.fileUrl = fileStream.pipe(map(file => domSanitizer.bypassSecurityTrustResourceUrl(file.content)));
        this.fileName = fileStream.pipe(map(file => file.name));
    }
}
AjfReadOnlyFileFieldComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfReadOnlyFileFieldComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i1.AjfFormRendererService }, { token: AJF_WARNING_ALERT_SERVICE }, { token: i2.DomSanitizer }], target: i0.ɵɵFactoryTarget.Component });
AjfReadOnlyFileFieldComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.5", type: AjfReadOnlyFileFieldComponent, selector: "ajf-read-only-file-field", usesInheritance: true, ngImport: i0, template: "<a *ngIf=\"fileUrl|async as fu ; else noFile\" [href]=\"fu\" [download]=\"fileName|async\">\n  <img [src]=\"fileIcon\"> {{ fileName|async }}\n</a>\n<ng-template #noFile>\n  <div class=\"ajf-no-file-placeholder\"></div>\n</ng-template>\n", styles: ["ajf-read-only-file-field img{width:32px;height:32px;margin-right:8px;vertical-align:middle}ajf-read-only-file-field .ajf-no-file-placeholder{width:100%;height:32px;background-color:#eee}\n"], directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "async": i3.AsyncPipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfReadOnlyFileFieldComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ajf-read-only-file-field', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<a *ngIf=\"fileUrl|async as fu ; else noFile\" [href]=\"fu\" [download]=\"fileName|async\">\n  <img [src]=\"fileIcon\"> {{ fileName|async }}\n</a>\n<ng-template #noFile>\n  <div class=\"ajf-no-file-placeholder\"></div>\n</ng-template>\n", styles: ["ajf-read-only-file-field img{width:32px;height:32px;margin-right:8px;vertical-align:middle}ajf-read-only-file-field .ajf-no-file-placeholder{width:100%;height:32px;background-color:#eee}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i1.AjfFormRendererService }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [AJF_WARNING_ALERT_SERVICE]
                }] }, { type: i2.DomSanitizer }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZC1vbmx5LWZpbGUtZmllbGQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL2Zvcm1zL3NyYy9yZWFkLW9ubHktZmlsZS1maWVsZC50cyIsIi4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvZm9ybXMvc3JjL3JlYWQtb25seS1maWxlLWZpZWxkLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUFVLFFBQVEsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ3ZELE9BQU8sRUFDTCx1QkFBdUIsRUFFdkIsU0FBUyxFQUNULE1BQU0sRUFDTixpQkFBaUIsR0FDbEIsTUFBTSxlQUFlLENBQUM7QUFJdkIsT0FBTyxFQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUU5RSxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFFbkQsT0FBTyxFQUFDLHlCQUF5QixFQUF5QixNQUFNLHlCQUF5QixDQUFDOzs7OztBQUUxRjs7Ozs7O0dBTUc7QUFRSCxNQUFNLE9BQU8sNkJBQThCLFNBQVEscUJBQXFCO0lBS3RFLFlBQ0UsR0FBc0IsRUFDdEIsT0FBK0IsRUFDSSxHQUEyQixFQUM5RCxZQUEwQjtRQUUxQixLQUFLLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQztRQUN6QixJQUFJLENBQUMsUUFBUSxHQUFHLFlBQVksQ0FBQyw4QkFBOEIsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN0RSxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FDbEMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxFQUNsQyxTQUFTLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDbEIsT0FBTyxHQUFHLE9BQXNCLENBQUM7WUFDakMsT0FBTyxPQUFPLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUF3QixDQUFDO1FBQ3BGLENBQUMsQ0FBQyxFQUNGLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsRUFDOUIsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUNmLENBQUM7UUFDRixJQUFJLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQzVCLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyw4QkFBOEIsQ0FBRSxJQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQ3BGLENBQUM7UUFDRixJQUFJLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUUsSUFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7OzBIQTFCVSw2QkFBNkIseUZBUTlCLHlCQUF5Qjs4R0FSeEIsNkJBQTZCLHVGQ3JEMUMsOE9BTUE7MkZEK0NhLDZCQUE2QjtrQkFQekMsU0FBUzsrQkFDRSwwQkFBMEIsbUJBR25CLHVCQUF1QixDQUFDLE1BQU0saUJBQ2hDLGlCQUFpQixDQUFDLElBQUk7OzBCQVVsQyxNQUFNOzJCQUFDLHlCQUF5QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZGaWxlLCBmaWxlSWNvbn0gZnJvbSAnQGFqZi9jb3JlL2ZpbGUtaW5wdXQnO1xuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEluamVjdCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtGb3JtQ29udHJvbH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtEb21TYW5pdGl6ZXIsIFNhZmVSZXNvdXJjZVVybH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtmaWx0ZXIsIG1hcCwgc2hhcmVSZXBsYXksIHN0YXJ0V2l0aCwgc3dpdGNoTWFwfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7QWpmQmFzZUZpZWxkQ29tcG9uZW50fSBmcm9tICcuL2Jhc2UtZmllbGQnO1xuaW1wb3J0IHtBamZGb3JtUmVuZGVyZXJTZXJ2aWNlfSBmcm9tICcuL2Zvcm0tcmVuZGVyZXInO1xuaW1wb3J0IHtBSkZfV0FSTklOR19BTEVSVF9TRVJWSUNFLCBBamZXYXJuaW5nQWxlcnRTZXJ2aWNlfSBmcm9tICcuL3dhcm5pbmctYWxlcnQtc2VydmljZSc7XG5cbi8qKlxuICogVGhpcyBjb21wb25lbnQgYWxsb3dzIHlvdSB0byBkb3dubG9hZCB0aGUgZmlsZSBjb250YWluZWQgaW4gdGhlIGNvbnRyb2wgb2ZcbiAqIHRoZSBmb3JtIGluaGVyaXRlZCBmcm9tIEFqZkJhc2VGaWVsZENvbXBvbmVudC5cbiAqXG4gKiBAZXhwb3J0XG4gKiBAY2xhc3MgQWpmUmVhZE9ubHlGaWxlRmllbGRDb21wb25lbnRcbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWpmLXJlYWQtb25seS1maWxlLWZpZWxkJyxcbiAgdGVtcGxhdGVVcmw6ICdyZWFkLW9ubHktZmlsZS1maWVsZC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ3JlYWQtb25seS1maWxlLWZpZWxkLnNjc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG59KVxuZXhwb3J0IGNsYXNzIEFqZlJlYWRPbmx5RmlsZUZpZWxkQ29tcG9uZW50IGV4dGVuZHMgQWpmQmFzZUZpZWxkQ29tcG9uZW50IHtcbiAgcmVhZG9ubHkgZmlsZUljb246IFNhZmVSZXNvdXJjZVVybDtcbiAgcmVhZG9ubHkgZmlsZVVybDogT2JzZXJ2YWJsZTxTYWZlUmVzb3VyY2VVcmw+O1xuICByZWFkb25seSBmaWxlTmFtZTogT2JzZXJ2YWJsZTxzdHJpbmc+O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgc2VydmljZTogQWpmRm9ybVJlbmRlcmVyU2VydmljZSxcbiAgICBASW5qZWN0KEFKRl9XQVJOSU5HX0FMRVJUX1NFUlZJQ0UpIHdhczogQWpmV2FybmluZ0FsZXJ0U2VydmljZSxcbiAgICBkb21TYW5pdGl6ZXI6IERvbVNhbml0aXplcixcbiAgKSB7XG4gICAgc3VwZXIoY2RyLCBzZXJ2aWNlLCB3YXMpO1xuICAgIHRoaXMuZmlsZUljb24gPSBkb21TYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdFJlc291cmNlVXJsKGZpbGVJY29uKTtcbiAgICBjb25zdCBmaWxlU3RyZWFtID0gdGhpcy5jb250cm9sLnBpcGUoXG4gICAgICBmaWx0ZXIoY29udHJvbCA9PiBjb250cm9sICE9IG51bGwpLFxuICAgICAgc3dpdGNoTWFwKGNvbnRyb2wgPT4ge1xuICAgICAgICBjb250cm9sID0gY29udHJvbCBhcyBGb3JtQ29udHJvbDtcbiAgICAgICAgcmV0dXJuIGNvbnRyb2wudmFsdWVDaGFuZ2VzLnBpcGUoc3RhcnRXaXRoKGNvbnRyb2wudmFsdWUpKSBhcyBPYnNlcnZhYmxlPEFqZkZpbGU+O1xuICAgICAgfSksXG4gICAgICBmaWx0ZXIodmFsdWUgPT4gdmFsdWUgIT0gbnVsbCksXG4gICAgICBzaGFyZVJlcGxheSgxKSxcbiAgICApO1xuICAgIHRoaXMuZmlsZVVybCA9IGZpbGVTdHJlYW0ucGlwZShcbiAgICAgIG1hcChmaWxlID0+IGRvbVNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0UmVzb3VyY2VVcmwoKGZpbGUgYXMgQWpmRmlsZSkuY29udGVudCkpLFxuICAgICk7XG4gICAgdGhpcy5maWxlTmFtZSA9IGZpbGVTdHJlYW0ucGlwZShtYXAoZmlsZSA9PiAoZmlsZSBhcyBBamZGaWxlKS5uYW1lKSk7XG4gIH1cbn1cbiIsIjxhICpuZ0lmPVwiZmlsZVVybHxhc3luYyBhcyBmdSA7IGVsc2Ugbm9GaWxlXCIgW2hyZWZdPVwiZnVcIiBbZG93bmxvYWRdPVwiZmlsZU5hbWV8YXN5bmNcIj5cbiAgPGltZyBbc3JjXT1cImZpbGVJY29uXCI+IHt7IGZpbGVOYW1lfGFzeW5jIH19XG48L2E+XG48bmctdGVtcGxhdGUgI25vRmlsZT5cbiAgPGRpdiBjbGFzcz1cImFqZi1uby1maWxlLXBsYWNlaG9sZGVyXCI+PC9kaXY+XG48L25nLXRlbXBsYXRlPlxuIl19