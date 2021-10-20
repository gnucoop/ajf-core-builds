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
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, ViewEncapsulation, } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AjfFormRendererService } from './form-renderer';
import { AjfVideoUrlFieldComponent } from './video-url-field';
import { AJF_WARNING_ALERT_SERVICE } from './warning-alert-service';
import * as i0 from "@angular/core";
import * as i1 from "./form-renderer";
import * as i2 from "@angular/platform-browser";
import * as i3 from "@angular/common/http";
import * as i4 from "@angular/common";
/**
 * This component allows you to show the video related to url contained in the control of
 * the form inherited from AjfBaseFieldComponent.
 *
 * @export
 * @class AjfReadOnlyVideoUrlFieldComponent
 */
export class AjfReadOnlyVideoUrlFieldComponent extends AjfVideoUrlFieldComponent {
    constructor(cdr, service, was, domSanitizer, httpClient) {
        super(cdr, service, was, domSanitizer, httpClient);
    }
}
AjfReadOnlyVideoUrlFieldComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfReadOnlyVideoUrlFieldComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i1.AjfFormRendererService }, { token: AJF_WARNING_ALERT_SERVICE }, { token: i2.DomSanitizer }, { token: i3.HttpClient }], target: i0.ɵɵFactoryTarget.Component });
AjfReadOnlyVideoUrlFieldComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.0-next.15", type: AjfReadOnlyVideoUrlFieldComponent, selector: "ajf-read-only-video-url-field", usesInheritance: true, ngImport: i0, template: "<div *ngIf=\"control|async as ctrl\" class=\"ajf-video-thumbnail\">\n  <ng-container *ngIf=\"validUrl|async\">\n    <a target=\"_blank\" [href]=\"ctrl.value\">\n      <img *ngIf=\"videoThumbnail|async as thumb\" [src]=\"thumb\" class=\"\" alt=\"\">\n    </a>\n  </ng-container>\n</div>\n", styles: ["\n"], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "async": i4.AsyncPipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfReadOnlyVideoUrlFieldComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ajf-read-only-video-url-field', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<div *ngIf=\"control|async as ctrl\" class=\"ajf-video-thumbnail\">\n  <ng-container *ngIf=\"validUrl|async\">\n    <a target=\"_blank\" [href]=\"ctrl.value\">\n      <img *ngIf=\"videoThumbnail|async as thumb\" [src]=\"thumb\" class=\"\" alt=\"\">\n    </a>\n  </ng-container>\n</div>\n", styles: ["\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i1.AjfFormRendererService }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [AJF_WARNING_ALERT_SERVICE]
                }] }, { type: i2.DomSanitizer }, { type: i3.HttpClient }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZC1vbmx5LXZpZGVvLXVybC1maWVsZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2Zvcm1zL3JlYWQtb25seS12aWRlby11cmwtZmllbGQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9mb3Jtcy9yZWFkLW9ubHktdmlkZW8tdXJsLWZpZWxkLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ2hELE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxNQUFNLEVBQ04saUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUV2RCxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN2RCxPQUFPLEVBQUMseUJBQXlCLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUM1RCxPQUFPLEVBQUMseUJBQXlCLEVBQXlCLE1BQU0seUJBQXlCLENBQUM7Ozs7OztBQUUxRjs7Ozs7O0dBTUc7QUFRSCxNQUFNLE9BQU8saUNBQWtDLFNBQVEseUJBQXlCO0lBQzlFLFlBQ0UsR0FBc0IsRUFDdEIsT0FBK0IsRUFDSSxHQUEyQixFQUM5RCxZQUEwQixFQUMxQixVQUFzQjtRQUV0QixLQUFLLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsWUFBWSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQ3JELENBQUM7O3NJQVRVLGlDQUFpQyx5RkFJbEMseUJBQXlCOzBIQUp4QixpQ0FBaUMsNEZDbEQ5QyxpU0FPQTttR0QyQ2EsaUNBQWlDO2tCQVA3QyxTQUFTOytCQUNFLCtCQUErQixtQkFHeEIsdUJBQXVCLENBQUMsTUFBTSxpQkFDaEMsaUJBQWlCLENBQUMsSUFBSTs7MEJBTWxDLE1BQU07MkJBQUMseUJBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0h0dHBDbGllbnR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBJbmplY3QsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RG9tU2FuaXRpemVyfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcblxuaW1wb3J0IHtBamZGb3JtUmVuZGVyZXJTZXJ2aWNlfSBmcm9tICcuL2Zvcm0tcmVuZGVyZXInO1xuaW1wb3J0IHtBamZWaWRlb1VybEZpZWxkQ29tcG9uZW50fSBmcm9tICcuL3ZpZGVvLXVybC1maWVsZCc7XG5pbXBvcnQge0FKRl9XQVJOSU5HX0FMRVJUX1NFUlZJQ0UsIEFqZldhcm5pbmdBbGVydFNlcnZpY2V9IGZyb20gJy4vd2FybmluZy1hbGVydC1zZXJ2aWNlJztcblxuLyoqXG4gKiBUaGlzIGNvbXBvbmVudCBhbGxvd3MgeW91IHRvIHNob3cgdGhlIHZpZGVvIHJlbGF0ZWQgdG8gdXJsIGNvbnRhaW5lZCBpbiB0aGUgY29udHJvbCBvZlxuICogdGhlIGZvcm0gaW5oZXJpdGVkIGZyb20gQWpmQmFzZUZpZWxkQ29tcG9uZW50LlxuICpcbiAqIEBleHBvcnRcbiAqIEBjbGFzcyBBamZSZWFkT25seVZpZGVvVXJsRmllbGRDb21wb25lbnRcbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWpmLXJlYWQtb25seS12aWRlby11cmwtZmllbGQnLFxuICB0ZW1wbGF0ZVVybDogJ3JlYWQtb25seS12aWRlby11cmwtZmllbGQuaHRtbCcsXG4gIHN0eWxlVXJsczogWydyZWFkLW9ubHktdmlkZW8tdXJsLWZpZWxkLmNzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbn0pXG5leHBvcnQgY2xhc3MgQWpmUmVhZE9ubHlWaWRlb1VybEZpZWxkQ29tcG9uZW50IGV4dGVuZHMgQWpmVmlkZW9VcmxGaWVsZENvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgc2VydmljZTogQWpmRm9ybVJlbmRlcmVyU2VydmljZSxcbiAgICBASW5qZWN0KEFKRl9XQVJOSU5HX0FMRVJUX1NFUlZJQ0UpIHdhczogQWpmV2FybmluZ0FsZXJ0U2VydmljZSxcbiAgICBkb21TYW5pdGl6ZXI6IERvbVNhbml0aXplcixcbiAgICBodHRwQ2xpZW50OiBIdHRwQ2xpZW50LFxuICApIHtcbiAgICBzdXBlcihjZHIsIHNlcnZpY2UsIHdhcywgZG9tU2FuaXRpemVyLCBodHRwQ2xpZW50KTtcbiAgfVxufVxuIiwiPGRpdiAqbmdJZj1cImNvbnRyb2x8YXN5bmMgYXMgY3RybFwiIGNsYXNzPVwiYWpmLXZpZGVvLXRodW1ibmFpbFwiPlxuICA8bmctY29udGFpbmVyICpuZ0lmPVwidmFsaWRVcmx8YXN5bmNcIj5cbiAgICA8YSB0YXJnZXQ9XCJfYmxhbmtcIiBbaHJlZl09XCJjdHJsLnZhbHVlXCI+XG4gICAgICA8aW1nICpuZ0lmPVwidmlkZW9UaHVtYm5haWx8YXN5bmMgYXMgdGh1bWJcIiBbc3JjXT1cInRodW1iXCIgY2xhc3M9XCJcIiBhbHQ9XCJcIj5cbiAgICA8L2E+XG4gIDwvbmctY29udGFpbmVyPlxuPC9kaXY+XG4iXX0=