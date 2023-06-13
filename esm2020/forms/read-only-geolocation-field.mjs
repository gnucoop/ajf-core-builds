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
import { filter, map } from 'rxjs/operators';
import { AjfBaseFieldComponent } from './base-field';
import { AJF_WARNING_ALERT_SERVICE } from './warning-alert-service';
import * as i0 from "@angular/core";
import * as i1 from "./form-renderer";
import * as i2 from "@angular/common";
import * as i3 from "@ngneat/transloco";
/**
 * This component allows you to show the geolocation info: latitude and longitude
 * the form inherited from AjfBaseFieldComponent.
 *
 * @export
 * @class AjfReadOnlyGeolocationFieldComponent
 */
export class AjfReadOnlyGeolocationFieldComponent extends AjfBaseFieldComponent {
    constructor(cdr, service, was) {
        super(cdr, service, was);
        const coordinates = this.control.pipe(filter(control => control != null), map(ctrl => {
            let coords = [];
            if (ctrl) {
                const values = ctrl.value;
                if (values && values.length) {
                    coords = values.split(',');
                }
            }
            return coords;
        }));
        this.latitude = coordinates.pipe(map(coords => (coords && coords.length > 0 ? coords[0] : '')));
        this.longitude = coordinates.pipe(map(coords => (coords && coords.length > 1 ? coords[1] : '')));
    }
}
AjfReadOnlyGeolocationFieldComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfReadOnlyGeolocationFieldComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i1.AjfFormRendererService }, { token: AJF_WARNING_ALERT_SERVICE }], target: i0.ɵɵFactoryTarget.Component });
AjfReadOnlyGeolocationFieldComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.4", type: AjfReadOnlyGeolocationFieldComponent, selector: "ajf-read-only-geolocation-field", usesInheritance: true, ngImport: i0, template: "<ng-container *ngIf=\"control|async as ctrl\">\n  <div class=\"flex-container\">\n    <div class=\"flex-child\">\n      {{'Latitude'|transloco}}: {{latitude|async}}\n    </div>\n    <div class=\"flex-child\">\n      {{'Longitude'|transloco}}: {{longitude|async}}\n    </div>\n  </div>\n</ng-container>", styles: ["ajf-read-only-geolocation-field .flex-container{display:flex;flex-wrap:wrap}ajf-read-only-geolocation-field .flex-child:first-child{margin-right:15px}\n"], dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "pipe", type: i2.AsyncPipe, name: "async" }, { kind: "pipe", type: i3.TranslocoPipe, name: "transloco" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfReadOnlyGeolocationFieldComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ajf-read-only-geolocation-field', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<ng-container *ngIf=\"control|async as ctrl\">\n  <div class=\"flex-container\">\n    <div class=\"flex-child\">\n      {{'Latitude'|transloco}}: {{latitude|async}}\n    </div>\n    <div class=\"flex-child\">\n      {{'Longitude'|transloco}}: {{longitude|async}}\n    </div>\n  </div>\n</ng-container>", styles: ["ajf-read-only-geolocation-field .flex-container{display:flex;flex-wrap:wrap}ajf-read-only-geolocation-field .flex-child:first-child{margin-right:15px}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i1.AjfFormRendererService }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [AJF_WARNING_ALERT_SERVICE]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZC1vbmx5LWdlb2xvY2F0aW9uLWZpZWxkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9mb3Jtcy9zcmMvcmVhZC1vbmx5LWdlb2xvY2F0aW9uLWZpZWxkLnRzIiwiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9mb3Jtcy9zcmMvcmVhZC1vbmx5LWdlb2xvY2F0aW9uLWZpZWxkLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUNMLHVCQUF1QixFQUV2QixTQUFTLEVBQ1QsTUFBTSxFQUNOLGlCQUFpQixHQUNsQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUMsTUFBTSxFQUFFLEdBQUcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRTNDLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUVuRCxPQUFPLEVBQUMseUJBQXlCLEVBQXlCLE1BQU0seUJBQXlCLENBQUM7Ozs7O0FBRTFGOzs7Ozs7R0FNRztBQVFILE1BQU0sT0FBTyxvQ0FBcUMsU0FBUSxxQkFBcUI7SUFJN0UsWUFDRSxHQUFzQixFQUN0QixPQUErQixFQUNJLEdBQTJCO1FBRTlELEtBQUssQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBRXpCLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUNuQyxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLEVBQ2xDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNULElBQUksTUFBTSxHQUFhLEVBQUUsQ0FBQztZQUMxQixJQUFJLElBQUksRUFBRTtnQkFDUixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBZSxDQUFDO2dCQUNwQyxJQUFJLE1BQU0sSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFO29CQUMzQixNQUFNLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDNUI7YUFDRjtZQUNELE9BQU8sTUFBTSxDQUFDO1FBQ2hCLENBQUMsQ0FBQyxDQUNILENBQUM7UUFFRixJQUFJLENBQUMsUUFBUSxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRWhHLElBQUksQ0FBQyxTQUFTLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FDL0IsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FDOUQsQ0FBQztJQUNKLENBQUM7O2lJQTlCVSxvQ0FBb0MseUZBT3JDLHlCQUF5QjtxSEFQeEIsb0NBQW9DLDhGQ2xEakQsK1NBU2U7MkZEeUNGLG9DQUFvQztrQkFQaEQsU0FBUzsrQkFDRSxpQ0FBaUMsbUJBRzFCLHVCQUF1QixDQUFDLE1BQU0saUJBQ2hDLGlCQUFpQixDQUFDLElBQUk7OzBCQVNsQyxNQUFNOzJCQUFDLHlCQUF5QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEluamVjdCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tICdyeGpzJztcbmltcG9ydCB7ZmlsdGVyLCBtYXB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHtBamZCYXNlRmllbGRDb21wb25lbnR9IGZyb20gJy4vYmFzZS1maWVsZCc7XG5pbXBvcnQge0FqZkZvcm1SZW5kZXJlclNlcnZpY2V9IGZyb20gJy4vZm9ybS1yZW5kZXJlcic7XG5pbXBvcnQge0FKRl9XQVJOSU5HX0FMRVJUX1NFUlZJQ0UsIEFqZldhcm5pbmdBbGVydFNlcnZpY2V9IGZyb20gJy4vd2FybmluZy1hbGVydC1zZXJ2aWNlJztcblxuLyoqXG4gKiBUaGlzIGNvbXBvbmVudCBhbGxvd3MgeW91IHRvIHNob3cgdGhlIGdlb2xvY2F0aW9uIGluZm86IGxhdGl0dWRlIGFuZCBsb25naXR1ZGVcbiAqIHRoZSBmb3JtIGluaGVyaXRlZCBmcm9tIEFqZkJhc2VGaWVsZENvbXBvbmVudC5cbiAqXG4gKiBAZXhwb3J0XG4gKiBAY2xhc3MgQWpmUmVhZE9ubHlHZW9sb2NhdGlvbkZpZWxkQ29tcG9uZW50XG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FqZi1yZWFkLW9ubHktZ2VvbG9jYXRpb24tZmllbGQnLFxuICB0ZW1wbGF0ZVVybDogJ3JlYWQtb25seS1nZW9sb2NhdGlvbi1maWVsZC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ3JlYWQtb25seS1nZW9sb2NhdGlvbi1maWVsZC5zY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxufSlcbmV4cG9ydCBjbGFzcyBBamZSZWFkT25seUdlb2xvY2F0aW9uRmllbGRDb21wb25lbnQgZXh0ZW5kcyBBamZCYXNlRmllbGRDb21wb25lbnQge1xuICByZWFkb25seSBsYXRpdHVkZTogT2JzZXJ2YWJsZTxzdHJpbmc+O1xuICByZWFkb25seSBsb25naXR1ZGU6IE9ic2VydmFibGU8c3RyaW5nPjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBjZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHNlcnZpY2U6IEFqZkZvcm1SZW5kZXJlclNlcnZpY2UsXG4gICAgQEluamVjdChBSkZfV0FSTklOR19BTEVSVF9TRVJWSUNFKSB3YXM6IEFqZldhcm5pbmdBbGVydFNlcnZpY2UsXG4gICkge1xuICAgIHN1cGVyKGNkciwgc2VydmljZSwgd2FzKTtcblxuICAgIGNvbnN0IGNvb3JkaW5hdGVzID0gdGhpcy5jb250cm9sLnBpcGUoXG4gICAgICBmaWx0ZXIoY29udHJvbCA9PiBjb250cm9sICE9IG51bGwpLFxuICAgICAgbWFwKGN0cmwgPT4ge1xuICAgICAgICBsZXQgY29vcmRzOiBzdHJpbmdbXSA9IFtdO1xuICAgICAgICBpZiAoY3RybCkge1xuICAgICAgICAgIGNvbnN0IHZhbHVlcyA9IGN0cmwudmFsdWUgYXMgc3RyaW5nO1xuICAgICAgICAgIGlmICh2YWx1ZXMgJiYgdmFsdWVzLmxlbmd0aCkge1xuICAgICAgICAgICAgY29vcmRzID0gdmFsdWVzLnNwbGl0KCcsJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb29yZHM7XG4gICAgICB9KSxcbiAgICApO1xuXG4gICAgdGhpcy5sYXRpdHVkZSA9IGNvb3JkaW5hdGVzLnBpcGUobWFwKGNvb3JkcyA9PiAoY29vcmRzICYmIGNvb3Jkcy5sZW5ndGggPiAwID8gY29vcmRzWzBdIDogJycpKSk7XG5cbiAgICB0aGlzLmxvbmdpdHVkZSA9IGNvb3JkaW5hdGVzLnBpcGUoXG4gICAgICBtYXAoY29vcmRzID0+IChjb29yZHMgJiYgY29vcmRzLmxlbmd0aCA+IDEgPyBjb29yZHNbMV0gOiAnJykpLFxuICAgICk7XG4gIH1cbn1cbiIsIjxuZy1jb250YWluZXIgKm5nSWY9XCJjb250cm9sfGFzeW5jIGFzIGN0cmxcIj5cbiAgPGRpdiBjbGFzcz1cImZsZXgtY29udGFpbmVyXCI+XG4gICAgPGRpdiBjbGFzcz1cImZsZXgtY2hpbGRcIj5cbiAgICAgIHt7J0xhdGl0dWRlJ3x0cmFuc2xvY299fToge3tsYXRpdHVkZXxhc3luY319XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImZsZXgtY2hpbGRcIj5cbiAgICAgIHt7J0xvbmdpdHVkZSd8dHJhbnNsb2NvfX06IHt7bG9uZ2l0dWRlfGFzeW5jfX1cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L25nLWNvbnRhaW5lcj4iXX0=