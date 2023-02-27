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
import { Directive, Input, ViewChild } from '@angular/core';
import { AjfWidgetHost } from './widget-host';
import * as i0 from "@angular/core";
export class AjfReportWidget {
    constructor(_renderer) {
        this._renderer = _renderer;
        this._init = false;
    }
    get instance() {
        return this._instance;
    }
    set instance(instance) {
        if (this._instance !== instance) {
            this._instance = instance;
            if (this._init) {
                this._loadComponent();
            }
        }
    }
    ngOnInit() {
        this._init = true;
        this._loadComponent();
    }
    _loadComponent() {
        if (!this._init ||
            this._instance == null ||
            this.widgetHost == null ||
            this._instance == null ||
            !this._instance.visible) {
            return;
        }
        const vcr = this.widgetHost.viewContainerRef;
        vcr.clear();
        const componentDef = this.widgetsMap[this._instance.widget.widgetType];
        if (componentDef == null) {
            return;
        }
        const component = componentDef.component;
        try {
            const componentRef = vcr.createComponent(component);
            const componentInstance = componentRef.instance;
            Object.keys(this._instance.widget.styles).forEach((style) => {
                try {
                    this._renderer.setStyle(componentInstance.el.nativeElement, style, `${this._instance.widget.styles[style]}`);
                }
                catch (e) { }
            });
            componentInstance.instance = this._instance;
            if (componentDef.inputs) {
                Object.keys(componentDef.inputs).forEach(key => {
                    if (key in componentInstance) {
                        componentInstance[key] = componentDef.inputs[key];
                    }
                });
            }
        }
        catch (e) { }
    }
}
AjfReportWidget.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfReportWidget, deps: [{ token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive });
AjfReportWidget.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.4", type: AjfReportWidget, inputs: { instance: "instance" }, viewQueries: [{ propertyName: "widgetHost", first: true, predicate: AjfWidgetHost, descendants: true, static: true }], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfReportWidget, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: i0.Renderer2 }]; }, propDecorators: { widgetHost: [{
                type: ViewChild,
                args: [AjfWidgetHost, { static: true }]
            }], instance: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9yZXBvcnRzL3NyYy93aWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQXFCLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUk3RSxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sZUFBZSxDQUFDOztBQUc1QyxNQUFNLE9BQWdCLGVBQWU7SUFxQm5DLFlBQW9CLFNBQW9CO1FBQXBCLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFGaEMsVUFBSyxHQUFHLEtBQUssQ0FBQztJQUVxQixDQUFDO0lBakI1QyxJQUFJLFFBQVE7UUFDVixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDeEIsQ0FBQztJQUNELElBQ0ksUUFBUSxDQUFDLFFBQXVDO1FBQ2xELElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxRQUFRLEVBQUU7WUFDL0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7WUFDMUIsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNkLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQzthQUN2QjtTQUNGO0lBQ0gsQ0FBQztJQVFELFFBQVE7UUFDTixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUNsQixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVPLGNBQWM7UUFDcEIsSUFDRSxDQUFDLElBQUksQ0FBQyxLQUFLO1lBQ1gsSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJO1lBQ3RCLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSTtZQUN2QixJQUFJLENBQUMsU0FBUyxJQUFJLElBQUk7WUFDdEIsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFDdkI7WUFDQSxPQUFPO1NBQ1I7UUFFRCxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDO1FBQzdDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNaLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDdkUsSUFBSSxZQUFZLElBQUksSUFBSSxFQUFFO1lBQ3hCLE9BQU87U0FDUjtRQUNELE1BQU0sU0FBUyxHQUFHLFlBQVksQ0FBQyxTQUFTLENBQUM7UUFDekMsSUFBSTtZQUNGLE1BQU0sWUFBWSxHQUFHLEdBQUcsQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDcEQsTUFBTSxpQkFBaUIsR0FBRyxZQUFZLENBQUMsUUFBUSxDQUFDO1lBRWhELE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBYSxFQUFFLEVBQUU7Z0JBQ2xFLElBQUk7b0JBQ0YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQ3JCLGlCQUFpQixDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQ2xDLEtBQUssRUFDTCxHQUFHLElBQUksQ0FBQyxTQUFVLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUMxQyxDQUFDO2lCQUNIO2dCQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUU7WUFDaEIsQ0FBQyxDQUFDLENBQUM7WUFFSCxpQkFBaUIsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUM1QyxJQUFJLFlBQVksQ0FBQyxNQUFNLEVBQUU7Z0JBQ3ZCLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRTtvQkFDN0MsSUFBSSxHQUFHLElBQUksaUJBQWlCLEVBQUU7d0JBQzNCLGlCQUF5QixDQUFDLEdBQUcsQ0FBQyxHQUFHLFlBQVksQ0FBQyxNQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7cUJBQzdEO2dCQUNILENBQUMsQ0FBQyxDQUFDO2FBQ0o7U0FDRjtRQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUU7SUFDaEIsQ0FBQzs7NEdBckVtQixlQUFlO2dHQUFmLGVBQWUsd0dBQ3hCLGFBQWE7MkZBREosZUFBZTtrQkFEcEMsU0FBUztnR0FFa0MsVUFBVTtzQkFBbkQsU0FBUzt1QkFBQyxhQUFhLEVBQUUsRUFBQyxNQUFNLEVBQUUsSUFBSSxFQUFDO2dCQU9wQyxRQUFRO3NCQURYLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7RGlyZWN0aXZlLCBJbnB1dCwgT25Jbml0LCBSZW5kZXJlcjIsIFZpZXdDaGlsZH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7QWpmV2lkZ2V0SW5zdGFuY2V9IGZyb20gJy4vaW50ZXJmYWNlL3dpZGdldHMtaW5zdGFuY2VzL3dpZGdldC1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZldpZGdldENvbXBvbmVudHNNYXB9IGZyb20gJy4vaW50ZXJmYWNlL3dpZGdldHMvd2lkZ2V0LWNvbXBvbmVudHMtbWFwJztcbmltcG9ydCB7QWpmV2lkZ2V0SG9zdH0gZnJvbSAnLi93aWRnZXQtaG9zdCc7XG5cbkBEaXJlY3RpdmUoKVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFqZlJlcG9ydFdpZGdldCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBWaWV3Q2hpbGQoQWpmV2lkZ2V0SG9zdCwge3N0YXRpYzogdHJ1ZX0pIHdpZGdldEhvc3QhOiBBamZXaWRnZXRIb3N0O1xuXG4gIHByaXZhdGUgX2luc3RhbmNlOiBBamZXaWRnZXRJbnN0YW5jZSB8IHVuZGVmaW5lZDtcbiAgZ2V0IGluc3RhbmNlKCk6IEFqZldpZGdldEluc3RhbmNlIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IGluc3RhbmNlKGluc3RhbmNlOiBBamZXaWRnZXRJbnN0YW5jZSB8IHVuZGVmaW5lZCkge1xuICAgIGlmICh0aGlzLl9pbnN0YW5jZSAhPT0gaW5zdGFuY2UpIHtcbiAgICAgIHRoaXMuX2luc3RhbmNlID0gaW5zdGFuY2U7XG4gICAgICBpZiAodGhpcy5faW5pdCkge1xuICAgICAgICB0aGlzLl9sb2FkQ29tcG9uZW50KCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIGFic3RyYWN0IHdpZGdldHNNYXA6IEFqZldpZGdldENvbXBvbmVudHNNYXA7XG5cbiAgcHJpdmF0ZSBfaW5pdCA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIpIHt9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5faW5pdCA9IHRydWU7XG4gICAgdGhpcy5fbG9hZENvbXBvbmVudCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfbG9hZENvbXBvbmVudCgpOiB2b2lkIHtcbiAgICBpZiAoXG4gICAgICAhdGhpcy5faW5pdCB8fFxuICAgICAgdGhpcy5faW5zdGFuY2UgPT0gbnVsbCB8fFxuICAgICAgdGhpcy53aWRnZXRIb3N0ID09IG51bGwgfHxcbiAgICAgIHRoaXMuX2luc3RhbmNlID09IG51bGwgfHxcbiAgICAgICF0aGlzLl9pbnN0YW5jZS52aXNpYmxlXG4gICAgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgdmNyID0gdGhpcy53aWRnZXRIb3N0LnZpZXdDb250YWluZXJSZWY7XG4gICAgdmNyLmNsZWFyKCk7XG4gICAgY29uc3QgY29tcG9uZW50RGVmID0gdGhpcy53aWRnZXRzTWFwW3RoaXMuX2luc3RhbmNlLndpZGdldC53aWRnZXRUeXBlXTtcbiAgICBpZiAoY29tcG9uZW50RGVmID09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgY29tcG9uZW50ID0gY29tcG9uZW50RGVmLmNvbXBvbmVudDtcbiAgICB0cnkge1xuICAgICAgY29uc3QgY29tcG9uZW50UmVmID0gdmNyLmNyZWF0ZUNvbXBvbmVudChjb21wb25lbnQpO1xuICAgICAgY29uc3QgY29tcG9uZW50SW5zdGFuY2UgPSBjb21wb25lbnRSZWYuaW5zdGFuY2U7XG5cbiAgICAgIE9iamVjdC5rZXlzKHRoaXMuX2luc3RhbmNlLndpZGdldC5zdHlsZXMpLmZvckVhY2goKHN0eWxlOiBzdHJpbmcpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZShcbiAgICAgICAgICAgIGNvbXBvbmVudEluc3RhbmNlLmVsLm5hdGl2ZUVsZW1lbnQsXG4gICAgICAgICAgICBzdHlsZSxcbiAgICAgICAgICAgIGAke3RoaXMuX2luc3RhbmNlIS53aWRnZXQuc3R5bGVzW3N0eWxlXX1gLFxuICAgICAgICAgICk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgICB9KTtcblxuICAgICAgY29tcG9uZW50SW5zdGFuY2UuaW5zdGFuY2UgPSB0aGlzLl9pbnN0YW5jZTtcbiAgICAgIGlmIChjb21wb25lbnREZWYuaW5wdXRzKSB7XG4gICAgICAgIE9iamVjdC5rZXlzKGNvbXBvbmVudERlZi5pbnB1dHMpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgICBpZiAoa2V5IGluIGNvbXBvbmVudEluc3RhbmNlKSB7XG4gICAgICAgICAgICAoY29tcG9uZW50SW5zdGFuY2UgYXMgYW55KVtrZXldID0gY29tcG9uZW50RGVmLmlucHV0cyFba2V5XTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHt9XG4gIH1cbn1cbiJdfQ==