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
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { filter, map, shareReplay, startWith, switchMap } from 'rxjs/operators';
import { AjfBaseFieldComponent } from './base-field';
import { AjfFormRendererService } from './form-renderer';
import { AJF_WARNING_ALERT_SERVICE } from './warning-alert-service';
/**
 * This component allows you to show the image related to url contained in the control of
 * the form inherited from AjfBaseFieldComponent.
 *
 * @export
 * @class AjfReadOnlyImageFieldComponent
 */
export class AjfReadOnlyImageFieldComponent extends AjfBaseFieldComponent {
    constructor(cdr, service, was, domSanitizer) {
        super(cdr, service, was);
        const fileStream = this.control.pipe(filter(control => control != null), switchMap(control => {
            control = control;
            return control.valueChanges.pipe(startWith(control.value));
        }), filter(value => value != null), shareReplay(1));
        this.imageUrl = fileStream.pipe(map(file => domSanitizer.bypassSecurityTrustResourceUrl(file.content)));
    }
}
AjfReadOnlyImageFieldComponent.decorators = [
    { type: Component, args: [{
                selector: 'ajf-read-only-image-field',
                template: "<img *ngIf=\"imageUrl|async as iu ; else noImage\" [src]=\"imageUrl|async\">\n<ng-template #noImage>\n  <div class=\"ajf-no-image-placeholder\"></div>\n</ng-template>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                styles: ["ajf-read-only-image-field .ajf-no-image-placeholder{width:100%;height:32px;background-color:#eee}\n"]
            },] }
];
AjfReadOnlyImageFieldComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: AjfFormRendererService },
    { type: undefined, decorators: [{ type: Inject, args: [AJF_WARNING_ALERT_SERVICE,] }] },
    { type: DomSanitizer }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZC1vbmx5LWltYWdlLWZpZWxkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvZm9ybXMvcmVhZC1vbmx5LWltYWdlLWZpZWxkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUdILE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxNQUFNLEVBQ04saUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBQyxZQUFZLEVBQWtCLE1BQU0sMkJBQTJCLENBQUM7QUFFeEUsT0FBTyxFQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUU5RSxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFDbkQsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDdkQsT0FBTyxFQUFDLHlCQUF5QixFQUF5QixNQUFNLHlCQUF5QixDQUFDO0FBRTFGOzs7Ozs7R0FNRztBQVFILE1BQU0sT0FBTyw4QkFBK0IsU0FBUSxxQkFBcUI7SUFHdkUsWUFDSSxHQUFzQixFQUFFLE9BQStCLEVBQ3BCLEdBQTJCLEVBQUUsWUFBMEI7UUFDNUYsS0FBSyxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDekIsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQ2hDLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsRUFDbEMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ2xCLE9BQU8sR0FBRyxPQUFzQixDQUFDO1lBQ2pDLE9BQU8sT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQ3JCLFNBQVMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQ0EsQ0FBQztRQUN0QyxDQUFDLENBQUMsRUFDRixNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEVBQzlCLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FDakIsQ0FBQztRQUNGLElBQUksQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FDM0IsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLDhCQUE4QixDQUFFLElBQWdCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FDdEYsQ0FBQztJQUNKLENBQUM7OztZQTVCRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLDJCQUEyQjtnQkFDckMsb0xBQXlDO2dCQUV6QyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7O2FBQ3RDOzs7WUEzQkMsaUJBQWlCO1lBV1gsc0JBQXNCOzRDQXNCdkIsTUFBTSxTQUFDLHlCQUF5QjtZQTNCL0IsWUFBWSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZGaWxlfSBmcm9tICdAYWpmL2NvcmUvZmlsZS1pbnB1dCc7XG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgSW5qZWN0LFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Rm9ybUNvbnRyb2x9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7RG9tU2FuaXRpemVyLCBTYWZlUmVzb3VyY2VVcmx9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tICdyeGpzJztcbmltcG9ydCB7ZmlsdGVyLCBtYXAsIHNoYXJlUmVwbGF5LCBzdGFydFdpdGgsIHN3aXRjaE1hcH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQge0FqZkJhc2VGaWVsZENvbXBvbmVudH0gZnJvbSAnLi9iYXNlLWZpZWxkJztcbmltcG9ydCB7QWpmRm9ybVJlbmRlcmVyU2VydmljZX0gZnJvbSAnLi9mb3JtLXJlbmRlcmVyJztcbmltcG9ydCB7QUpGX1dBUk5JTkdfQUxFUlRfU0VSVklDRSwgQWpmV2FybmluZ0FsZXJ0U2VydmljZX0gZnJvbSAnLi93YXJuaW5nLWFsZXJ0LXNlcnZpY2UnO1xuXG4vKipcbiAqIFRoaXMgY29tcG9uZW50IGFsbG93cyB5b3UgdG8gc2hvdyB0aGUgaW1hZ2UgcmVsYXRlZCB0byB1cmwgY29udGFpbmVkIGluIHRoZSBjb250cm9sIG9mXG4gKiB0aGUgZm9ybSBpbmhlcml0ZWQgZnJvbSBBamZCYXNlRmllbGRDb21wb25lbnQuXG4gKlxuICogQGV4cG9ydFxuICogQGNsYXNzIEFqZlJlYWRPbmx5SW1hZ2VGaWVsZENvbXBvbmVudFxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhamYtcmVhZC1vbmx5LWltYWdlLWZpZWxkJyxcbiAgdGVtcGxhdGVVcmw6ICdyZWFkLW9ubHktaW1hZ2UtZmllbGQuaHRtbCcsXG4gIHN0eWxlVXJsczogWydyZWFkLW9ubHktaW1hZ2UtZmllbGQuY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxufSlcbmV4cG9ydCBjbGFzcyBBamZSZWFkT25seUltYWdlRmllbGRDb21wb25lbnQgZXh0ZW5kcyBBamZCYXNlRmllbGRDb21wb25lbnQge1xuICByZWFkb25seSBpbWFnZVVybDogT2JzZXJ2YWJsZTxTYWZlUmVzb3VyY2VVcmw+O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZiwgc2VydmljZTogQWpmRm9ybVJlbmRlcmVyU2VydmljZSxcbiAgICAgIEBJbmplY3QoQUpGX1dBUk5JTkdfQUxFUlRfU0VSVklDRSkgd2FzOiBBamZXYXJuaW5nQWxlcnRTZXJ2aWNlLCBkb21TYW5pdGl6ZXI6IERvbVNhbml0aXplcikge1xuICAgIHN1cGVyKGNkciwgc2VydmljZSwgd2FzKTtcbiAgICBjb25zdCBmaWxlU3RyZWFtID0gdGhpcy5jb250cm9sLnBpcGUoXG4gICAgICAgIGZpbHRlcihjb250cm9sID0+IGNvbnRyb2wgIT0gbnVsbCksXG4gICAgICAgIHN3aXRjaE1hcChjb250cm9sID0+IHtcbiAgICAgICAgICBjb250cm9sID0gY29udHJvbCBhcyBGb3JtQ29udHJvbDtcbiAgICAgICAgICByZXR1cm4gY29udHJvbC52YWx1ZUNoYW5nZXMucGlwZShcbiAgICAgICAgICAgICAgICAgICAgIHN0YXJ0V2l0aChjb250cm9sLnZhbHVlKSxcbiAgICAgICAgICAgICAgICAgICAgICkgYXMgT2JzZXJ2YWJsZTxBamZGaWxlPjtcbiAgICAgICAgfSksXG4gICAgICAgIGZpbHRlcih2YWx1ZSA9PiB2YWx1ZSAhPSBudWxsKSxcbiAgICAgICAgc2hhcmVSZXBsYXkoMSksXG4gICAgKTtcbiAgICB0aGlzLmltYWdlVXJsID0gZmlsZVN0cmVhbS5waXBlKFxuICAgICAgICBtYXAoZmlsZSA9PiBkb21TYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdFJlc291cmNlVXJsKChmaWxlIGFzIEFqZkZpbGUpLmNvbnRlbnQpKSxcbiAgICApO1xuICB9XG59XG4iXX0=