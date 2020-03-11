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
import { ComponentFactoryResolver, Directive, Input, Renderer2, ViewChild } from '@angular/core';
import { AjfWidgetHost } from './widget-host';
var AjfReportWidget = /** @class */ (function () {
    function AjfReportWidget(_cfr, _renderer) {
        this._cfr = _cfr;
        this._renderer = _renderer;
        this._init = false;
    }
    Object.defineProperty(AjfReportWidget.prototype, "instance", {
        get: function () { return this._instance; },
        set: function (instance) {
            if (this._instance !== instance) {
                this._instance = instance;
                if (this._init) {
                    this._loadComponent();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    AjfReportWidget.prototype.ngOnInit = function () {
        this._init = true;
        this._loadComponent();
    };
    AjfReportWidget.prototype._loadComponent = function () {
        var _this = this;
        if (!this._init || this._instance == null
            || this.widgetHost == null || !this.instance.visible) {
            return;
        }
        var vcr = this.widgetHost.viewContainerRef;
        vcr.clear();
        var componentDef = this.widgetsMap[this._instance.widget.widgetType];
        if (componentDef == null) {
            return;
        }
        var component = componentDef.component;
        try {
            var componentFactory = this._cfr.resolveComponentFactory(component);
            var componentRef = vcr.createComponent(componentFactory);
            var componentInstance_1 = componentRef.instance;
            Object.keys(this._instance.widget.styles).forEach(function (style) {
                try {
                    _this._renderer.setStyle(componentInstance_1.el.nativeElement, style, "" + _this._instance.widget.styles[style]);
                }
                catch (e) { }
            });
            componentInstance_1.instance = this._instance;
            if (componentDef.inputs) {
                Object.keys(componentDef.inputs).forEach(function (key) {
                    if (key in componentInstance_1) {
                        componentInstance_1[key] = componentDef.inputs[key];
                    }
                });
            }
        }
        catch (e) { }
    };
    AjfReportWidget.decorators = [
        { type: Directive }
    ];
    /** @nocollapse */
    AjfReportWidget.ctorParameters = function () { return [
        { type: ComponentFactoryResolver },
        { type: Renderer2 }
    ]; };
    AjfReportWidget.propDecorators = {
        widgetHost: [{ type: ViewChild, args: [AjfWidgetHost, { static: true },] }],
        instance: [{ type: Input }]
    };
    return AjfReportWidget;
}());
export { AjfReportWidget };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvcmVwb3J0cy93aWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUFDLHdCQUF3QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsU0FBUyxFQUNuRSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFJbEMsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUU1QztJQW1CRSx5QkFBb0IsSUFBOEIsRUFBVSxTQUFvQjtRQUE1RCxTQUFJLEdBQUosSUFBSSxDQUEwQjtRQUFVLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFGeEUsVUFBSyxHQUFHLEtBQUssQ0FBQztJQUU4RCxDQUFDO0lBZHJGLHNCQUFJLHFDQUFRO2FBQVosY0FBb0MsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzthQUM1RCxVQUFzQixRQUEyQjtZQUMvQyxJQUFJLElBQUksQ0FBQyxTQUFTLEtBQUssUUFBUSxFQUFFO2dCQUMvQixJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztnQkFDMUIsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO29CQUNkLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztpQkFDdkI7YUFDRjtRQUNILENBQUM7OztPQVIyRDtJQWdCNUQsa0NBQVEsR0FBUjtRQUNFLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRU8sd0NBQWMsR0FBdEI7UUFBQSxpQkFvQ0M7UUFuQ0MsSUFDRSxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJO2VBQ2xDLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUU7WUFDdEQsT0FBTztTQUNSO1FBRUQsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQztRQUM3QyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDWixJQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3ZFLElBQUksWUFBWSxJQUFJLElBQUksRUFBRTtZQUFFLE9BQU87U0FBRTtRQUNyQyxJQUFNLFNBQVMsR0FBRyxZQUFZLENBQUMsU0FBUyxDQUFDO1FBQ3pDLElBQUk7WUFDRixJQUFNLGdCQUFnQixHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDdEUsSUFBTSxZQUFZLEdBQUcsR0FBRyxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQzNELElBQU0sbUJBQWlCLEdBQUcsWUFBWSxDQUFDLFFBQVEsQ0FBQztZQUVoRCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFDLEtBQWE7Z0JBQzlELElBQUk7b0JBQ0YsS0FBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQ3JCLG1CQUFpQixDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQ2xDLEtBQUssRUFDTCxLQUFHLEtBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUcsQ0FDekMsQ0FBQztpQkFDSDtnQkFBQyxPQUFPLENBQUMsRUFBRSxHQUFHO1lBQ2pCLENBQUMsQ0FBQyxDQUFDO1lBRUgsbUJBQWlCLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7WUFDNUMsSUFBSSxZQUFZLENBQUMsTUFBTSxFQUFFO2dCQUN2QixNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQSxHQUFHO29CQUMxQyxJQUFJLEdBQUcsSUFBSSxtQkFBaUIsRUFBRTt3QkFDM0IsbUJBQXlCLENBQUMsR0FBRyxDQUFDLEdBQUcsWUFBWSxDQUFDLE1BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztxQkFDN0Q7Z0JBQ0gsQ0FBQyxDQUFDLENBQUM7YUFDSjtTQUNGO1FBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRztJQUNqQixDQUFDOztnQkE5REYsU0FBUzs7OztnQkFQRix3QkFBd0I7Z0JBQTRCLFNBQVM7Ozs2QkFTbEUsU0FBUyxTQUFDLGFBQWEsRUFBRSxFQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUM7MkJBSXZDLEtBQUs7O0lBeURSLHNCQUFDO0NBQUEsQUEvREQsSUErREM7U0E5RHFCLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7Q29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBEaXJlY3RpdmUsIElucHV0LCBPbkluaXQsIFJlbmRlcmVyMixcbiAgVmlld0NoaWxkfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtBamZXaWRnZXRJbnN0YW5jZX0gZnJvbSAnLi9pbnRlcmZhY2Uvd2lkZ2V0cy1pbnN0YW5jZXMvd2lkZ2V0LWluc3RhbmNlJztcbmltcG9ydCB7QWpmV2lkZ2V0Q29tcG9uZW50c01hcH0gZnJvbSAnLi93aWRnZXQtY29tcG9uZW50cy1tYXAnO1xuaW1wb3J0IHtBamZXaWRnZXRIb3N0fSBmcm9tICcuL3dpZGdldC1ob3N0JztcblxuQERpcmVjdGl2ZSgpXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQWpmUmVwb3J0V2lkZ2V0IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQFZpZXdDaGlsZChBamZXaWRnZXRIb3N0LCB7c3RhdGljOiB0cnVlfSkgd2lkZ2V0SG9zdDogQWpmV2lkZ2V0SG9zdDtcblxuICBwcml2YXRlIF9pbnN0YW5jZTogQWpmV2lkZ2V0SW5zdGFuY2U7XG4gIGdldCBpbnN0YW5jZSgpOiBBamZXaWRnZXRJbnN0YW5jZSB7IHJldHVybiB0aGlzLl9pbnN0YW5jZTsgfVxuICBASW5wdXQoKSBzZXQgaW5zdGFuY2UoaW5zdGFuY2U6IEFqZldpZGdldEluc3RhbmNlKSB7XG4gICAgaWYgKHRoaXMuX2luc3RhbmNlICE9PSBpbnN0YW5jZSkge1xuICAgICAgdGhpcy5faW5zdGFuY2UgPSBpbnN0YW5jZTtcbiAgICAgIGlmICh0aGlzLl9pbml0KSB7XG4gICAgICAgIHRoaXMuX2xvYWRDb21wb25lbnQoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgYWJzdHJhY3Qgd2lkZ2V0c01hcDogQWpmV2lkZ2V0Q29tcG9uZW50c01hcDtcblxuICBwcml2YXRlIF9pbml0ID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfY2ZyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIpIHsgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuX2luaXQgPSB0cnVlO1xuICAgIHRoaXMuX2xvYWRDb21wb25lbnQoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2xvYWRDb21wb25lbnQoKTogdm9pZCB7XG4gICAgaWYgKFxuICAgICAgIXRoaXMuX2luaXQgfHwgdGhpcy5faW5zdGFuY2UgPT0gbnVsbFxuICAgICAgfHwgdGhpcy53aWRnZXRIb3N0ID09IG51bGwgfHwgIXRoaXMuaW5zdGFuY2UudmlzaWJsZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHZjciA9IHRoaXMud2lkZ2V0SG9zdC52aWV3Q29udGFpbmVyUmVmO1xuICAgIHZjci5jbGVhcigpO1xuICAgIGNvbnN0IGNvbXBvbmVudERlZiA9IHRoaXMud2lkZ2V0c01hcFt0aGlzLl9pbnN0YW5jZS53aWRnZXQud2lkZ2V0VHlwZV07XG4gICAgaWYgKGNvbXBvbmVudERlZiA9PSBudWxsKSB7IHJldHVybjsgfVxuICAgIGNvbnN0IGNvbXBvbmVudCA9IGNvbXBvbmVudERlZi5jb21wb25lbnQ7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGNvbXBvbmVudEZhY3RvcnkgPSB0aGlzLl9jZnIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoY29tcG9uZW50KTtcbiAgICAgIGNvbnN0IGNvbXBvbmVudFJlZiA9IHZjci5jcmVhdGVDb21wb25lbnQoY29tcG9uZW50RmFjdG9yeSk7XG4gICAgICBjb25zdCBjb21wb25lbnRJbnN0YW5jZSA9IGNvbXBvbmVudFJlZi5pbnN0YW5jZTtcblxuICAgICAgT2JqZWN0LmtleXModGhpcy5faW5zdGFuY2Uud2lkZ2V0LnN0eWxlcykuZm9yRWFjaCgoc3R5bGU6IHN0cmluZykgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKFxuICAgICAgICAgICAgY29tcG9uZW50SW5zdGFuY2UuZWwubmF0aXZlRWxlbWVudCxcbiAgICAgICAgICAgIHN0eWxlLFxuICAgICAgICAgICAgYCR7dGhpcy5faW5zdGFuY2Uud2lkZ2V0LnN0eWxlc1tzdHlsZV19YFxuICAgICAgICAgICk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgfVxuICAgICAgfSk7XG5cbiAgICAgIGNvbXBvbmVudEluc3RhbmNlLmluc3RhbmNlID0gdGhpcy5faW5zdGFuY2U7XG4gICAgICBpZiAoY29tcG9uZW50RGVmLmlucHV0cykge1xuICAgICAgICBPYmplY3Qua2V5cyhjb21wb25lbnREZWYuaW5wdXRzKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgaWYgKGtleSBpbiBjb21wb25lbnRJbnN0YW5jZSkge1xuICAgICAgICAgICAgKGNvbXBvbmVudEluc3RhbmNlIGFzIGFueSlba2V5XSA9IGNvbXBvbmVudERlZi5pbnB1dHMhW2tleV07XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7IH1cbiAgfVxufVxuIl19