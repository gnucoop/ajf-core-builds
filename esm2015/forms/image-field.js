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
export class AjfImageFieldComponent extends AjfBaseFieldComponent {
    constructor(cdr, service, was, domSanitizer) {
        super(cdr, service, was);
        const fileStream = this.control.pipe(filter(control => control != null), switchMap(control => {
            control = control;
            return control.valueChanges.pipe(startWith(control.value));
        }), filter(value => value != null), shareReplay(1));
        this.imageUrl = fileStream.pipe(map(file => domSanitizer.bypassSecurityTrustResourceUrl(file.content)));
    }
}
AjfImageFieldComponent.decorators = [
    { type: Component, args: [{
                selector: 'ajf-image-field',
                template: "<ajf-file-input *ngIf=\"control|async as ctrl\" accept=\"image/*\" [formControl]=\"ctrl!\">\n  <div ajfFilePreview class=\"ajf-image-preview\">\n    <img [src]=\"imageUrl|async\">\n  </div>\n</ajf-file-input>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                styles: ["ajf-image-field img{min-width:32px;min-height:32px}\n"]
            },] }
];
AjfImageFieldComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: AjfFormRendererService },
    { type: undefined, decorators: [{ type: Inject, args: [AJF_WARNING_ALERT_SERVICE,] }] },
    { type: DomSanitizer }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2UtZmllbGQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9mb3Jtcy9pbWFnZS1maWVsZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFHSCxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsTUFBTSxFQUNOLGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUMsWUFBWSxFQUFrQixNQUFNLDJCQUEyQixDQUFDO0FBRXhFLE9BQU8sRUFBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFOUUsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sY0FBYyxDQUFDO0FBQ25ELE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3ZELE9BQU8sRUFBQyx5QkFBeUIsRUFBeUIsTUFBTSx5QkFBeUIsQ0FBQztBQVMxRixNQUFNLE9BQU8sc0JBQXVCLFNBQVEscUJBQXFCO0lBRy9ELFlBQ0ksR0FBc0IsRUFBRSxPQUErQixFQUNwQixHQUEyQixFQUFFLFlBQTBCO1FBQzVGLEtBQUssQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3pCLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUNoQyxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLEVBQ2xDLFNBQVMsQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUNsQixPQUFPLEdBQUcsT0FBc0IsQ0FBQztZQUNqQyxPQUFPLE9BQU8sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUNyQixTQUFTLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUNBLENBQUM7UUFDdEMsQ0FBQyxDQUFDLEVBQ0YsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxFQUM5QixXQUFXLENBQUMsQ0FBQyxDQUFDLENBQ2pCLENBQUM7UUFDRixJQUFJLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQzNCLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyw4QkFBOEIsQ0FBRSxJQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQ3RGLENBQUM7SUFDSixDQUFDOzs7WUE1QkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxpQkFBaUI7Z0JBQzNCLDhOQUErQjtnQkFFL0IsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJOzthQUN0Qzs7O1lBcEJDLGlCQUFpQjtZQVdYLHNCQUFzQjs0Q0FldkIsTUFBTSxTQUFDLHlCQUF5QjtZQXBCL0IsWUFBWSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZGaWxlfSBmcm9tICdAYWpmL2NvcmUvZmlsZS1pbnB1dCc7XG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgSW5qZWN0LFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Rm9ybUNvbnRyb2x9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7RG9tU2FuaXRpemVyLCBTYWZlUmVzb3VyY2VVcmx9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tICdyeGpzJztcbmltcG9ydCB7ZmlsdGVyLCBtYXAsIHNoYXJlUmVwbGF5LCBzdGFydFdpdGgsIHN3aXRjaE1hcH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQge0FqZkJhc2VGaWVsZENvbXBvbmVudH0gZnJvbSAnLi9iYXNlLWZpZWxkJztcbmltcG9ydCB7QWpmRm9ybVJlbmRlcmVyU2VydmljZX0gZnJvbSAnLi9mb3JtLXJlbmRlcmVyJztcbmltcG9ydCB7QUpGX1dBUk5JTkdfQUxFUlRfU0VSVklDRSwgQWpmV2FybmluZ0FsZXJ0U2VydmljZX0gZnJvbSAnLi93YXJuaW5nLWFsZXJ0LXNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhamYtaW1hZ2UtZmllbGQnLFxuICB0ZW1wbGF0ZVVybDogJ2ltYWdlLWZpZWxkLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnaW1hZ2UtZmllbGQuY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxufSlcbmV4cG9ydCBjbGFzcyBBamZJbWFnZUZpZWxkQ29tcG9uZW50IGV4dGVuZHMgQWpmQmFzZUZpZWxkQ29tcG9uZW50IHtcbiAgcmVhZG9ubHkgaW1hZ2VVcmw6IE9ic2VydmFibGU8U2FmZVJlc291cmNlVXJsPjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsIHNlcnZpY2U6IEFqZkZvcm1SZW5kZXJlclNlcnZpY2UsXG4gICAgICBASW5qZWN0KEFKRl9XQVJOSU5HX0FMRVJUX1NFUlZJQ0UpIHdhczogQWpmV2FybmluZ0FsZXJ0U2VydmljZSwgZG9tU2FuaXRpemVyOiBEb21TYW5pdGl6ZXIpIHtcbiAgICBzdXBlcihjZHIsIHNlcnZpY2UsIHdhcyk7XG4gICAgY29uc3QgZmlsZVN0cmVhbSA9IHRoaXMuY29udHJvbC5waXBlKFxuICAgICAgICBmaWx0ZXIoY29udHJvbCA9PiBjb250cm9sICE9IG51bGwpLFxuICAgICAgICBzd2l0Y2hNYXAoY29udHJvbCA9PiB7XG4gICAgICAgICAgY29udHJvbCA9IGNvbnRyb2wgYXMgRm9ybUNvbnRyb2w7XG4gICAgICAgICAgcmV0dXJuIGNvbnRyb2wudmFsdWVDaGFuZ2VzLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgICBzdGFydFdpdGgoY29udHJvbC52YWx1ZSksXG4gICAgICAgICAgICAgICAgICAgICApIGFzIE9ic2VydmFibGU8QWpmRmlsZT47XG4gICAgICAgIH0pLFxuICAgICAgICBmaWx0ZXIodmFsdWUgPT4gdmFsdWUgIT0gbnVsbCksXG4gICAgICAgIHNoYXJlUmVwbGF5KDEpLFxuICAgICk7XG4gICAgdGhpcy5pbWFnZVVybCA9IGZpbGVTdHJlYW0ucGlwZShcbiAgICAgICAgbWFwKGZpbGUgPT4gZG9tU2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RSZXNvdXJjZVVybCgoZmlsZSBhcyBBamZGaWxlKS5jb250ZW50KSksXG4gICAgKTtcbiAgfVxufVxuIl19