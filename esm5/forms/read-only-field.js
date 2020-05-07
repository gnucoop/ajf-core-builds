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
import { __extends } from "tslib";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, ViewEncapsulation } from '@angular/core';
import { AjfFormRendererService } from './form-renderer';
import { AjfInputFieldComponent as CoreComponent } from './input-field';
import { AJF_WARNING_ALERT_SERVICE } from './warning-alert-service';
var AjfReadOnlyFieldComponent = /** @class */ (function (_super) {
    __extends(AjfReadOnlyFieldComponent, _super);
    function AjfReadOnlyFieldComponent(cdr, service, was) {
        return _super.call(this, cdr, service, was) || this;
    }
    AjfReadOnlyFieldComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ajf-read-only-field',
                    template: "<span *ngIf=\"control|async as ctrl\">{{ctrl.value}}</span>\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    styles: ["ajf-read-only-field span{min-height:1em;display:block}\n"]
                }] }
    ];
    /** @nocollapse */
    AjfReadOnlyFieldComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: AjfFormRendererService },
        { type: undefined, decorators: [{ type: Inject, args: [AJF_WARNING_ALERT_SERVICE,] }] }
    ]; };
    return AjfReadOnlyFieldComponent;
}(CoreComponent));
export { AjfReadOnlyFieldComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZC1vbmx5LWZpZWxkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvZm9ybXMvcmVhZC1vbmx5LWZpZWxkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRzs7QUFFSCxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsTUFBTSxFQUNOLGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN2RCxPQUFPLEVBQUMsc0JBQXNCLElBQUksYUFBYSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3RFLE9BQU8sRUFBQyx5QkFBeUIsRUFBeUIsTUFBTSx5QkFBeUIsQ0FBQztBQUUxRjtJQU8rQyw2Q0FBYTtJQUMxRCxtQ0FDSSxHQUFzQixFQUFFLE9BQStCLEVBQ3BCLEdBQTJCO2VBQ2hFLGtCQUFNLEdBQUcsRUFBRSxPQUFPLEVBQUUsR0FBRyxDQUFDO0lBQzFCLENBQUM7O2dCQVpGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUscUJBQXFCO29CQUMvQix5RUFBbUM7b0JBRW5DLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTs7aUJBQ3RDOzs7O2dCQWhCQyxpQkFBaUI7Z0JBTVgsc0JBQXNCO2dEQWN2QixNQUFNLFNBQUMseUJBQXlCOztJQUd2QyxnQ0FBQztDQUFBLEFBYkQsQ0FPK0MsYUFBYSxHQU0zRDtTQU5ZLHlCQUF5QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEluamVjdCxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7QWpmRm9ybVJlbmRlcmVyU2VydmljZX0gZnJvbSAnLi9mb3JtLXJlbmRlcmVyJztcbmltcG9ydCB7QWpmSW5wdXRGaWVsZENvbXBvbmVudCBhcyBDb3JlQ29tcG9uZW50fSBmcm9tICcuL2lucHV0LWZpZWxkJztcbmltcG9ydCB7QUpGX1dBUk5JTkdfQUxFUlRfU0VSVklDRSwgQWpmV2FybmluZ0FsZXJ0U2VydmljZX0gZnJvbSAnLi93YXJuaW5nLWFsZXJ0LXNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhamYtcmVhZC1vbmx5LWZpZWxkJyxcbiAgdGVtcGxhdGVVcmw6ICdyZWFkLW9ubHktZmllbGQuaHRtbCcsXG4gIHN0eWxlVXJsczogWydyZWFkLW9ubHktZmllbGQuY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxufSlcbmV4cG9ydCBjbGFzcyBBamZSZWFkT25seUZpZWxkQ29tcG9uZW50IGV4dGVuZHMgQ29yZUNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZiwgc2VydmljZTogQWpmRm9ybVJlbmRlcmVyU2VydmljZSxcbiAgICAgIEBJbmplY3QoQUpGX1dBUk5JTkdfQUxFUlRfU0VSVklDRSkgd2FzOiBBamZXYXJuaW5nQWxlcnRTZXJ2aWNlKSB7XG4gICAgc3VwZXIoY2RyLCBzZXJ2aWNlLCB3YXMpO1xuICB9XG59XG4iXX0=