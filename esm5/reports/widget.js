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
        get: function () {
            return this._instance;
        },
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
        if (!this._init || this._instance == null || this.widgetHost == null ||
            !this.instance.visible) {
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
                catch (e) {
                }
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
        catch (e) {
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvcmVwb3J0cy93aWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUNMLHdCQUF3QixFQUN4QixTQUFTLEVBQ1QsS0FBSyxFQUVMLFNBQVMsRUFDVCxTQUFTLEVBQ1YsTUFBTSxlQUFlLENBQUM7QUFJdkIsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUU1QztJQXNCRSx5QkFBb0IsSUFBOEIsRUFBVSxTQUFvQjtRQUE1RCxTQUFJLEdBQUosSUFBSSxDQUEwQjtRQUFVLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFGeEUsVUFBSyxHQUFHLEtBQUssQ0FBQztJQUU2RCxDQUFDO0lBakJwRixzQkFBSSxxQ0FBUTthQUFaO1lBQ0UsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ3hCLENBQUM7YUFDRCxVQUNhLFFBQTJCO1lBQ3RDLElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxRQUFRLEVBQUU7Z0JBQy9CLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO2dCQUMxQixJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQ2QsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO2lCQUN2QjthQUNGO1FBQ0gsQ0FBQzs7O09BVEE7SUFpQkQsa0NBQVEsR0FBUjtRQUNFLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRU8sd0NBQWMsR0FBdEI7UUFBQSxpQkFvQ0M7UUFuQ0MsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJO1lBQ2hFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUU7WUFDMUIsT0FBTztTQUNSO1FBRUQsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQztRQUM3QyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDWixJQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3ZFLElBQUksWUFBWSxJQUFJLElBQUksRUFBRTtZQUN4QixPQUFPO1NBQ1I7UUFDRCxJQUFNLFNBQVMsR0FBRyxZQUFZLENBQUMsU0FBUyxDQUFDO1FBQ3pDLElBQUk7WUFDRixJQUFNLGdCQUFnQixHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDdEUsSUFBTSxZQUFZLEdBQUcsR0FBRyxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQzNELElBQU0sbUJBQWlCLEdBQUcsWUFBWSxDQUFDLFFBQVEsQ0FBQztZQUVoRCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFDLEtBQWE7Z0JBQzlELElBQUk7b0JBQ0YsS0FBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQ25CLG1CQUFpQixDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsS0FBSyxFQUFFLEtBQUcsS0FBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBRyxDQUFDLENBQUM7aUJBQzFGO2dCQUFDLE9BQU8sQ0FBQyxFQUFFO2lCQUNYO1lBQ0gsQ0FBQyxDQUFDLENBQUM7WUFFSCxtQkFBaUIsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUM1QyxJQUFJLFlBQVksQ0FBQyxNQUFNLEVBQUU7Z0JBQ3ZCLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFBLEdBQUc7b0JBQzFDLElBQUksR0FBRyxJQUFJLG1CQUFpQixFQUFFO3dCQUMzQixtQkFBeUIsQ0FBQyxHQUFHLENBQUMsR0FBRyxZQUFZLENBQUMsTUFBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3FCQUM3RDtnQkFDSCxDQUFDLENBQUMsQ0FBQzthQUNKO1NBQ0Y7UUFBQyxPQUFPLENBQUMsRUFBRTtTQUNYO0lBQ0gsQ0FBQzs7Z0JBakVGLFNBQVM7Ozs7Z0JBWlIsd0JBQXdCO2dCQUl4QixTQUFTOzs7NkJBVVIsU0FBUyxTQUFDLGFBQWEsRUFBRSxFQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUM7MkJBTXZDLEtBQUs7O0lBMERSLHNCQUFDO0NBQUEsQUFsRUQsSUFrRUM7U0FqRXFCLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7XG4gIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgRGlyZWN0aXZlLFxuICBJbnB1dCxcbiAgT25Jbml0LFxuICBSZW5kZXJlcjIsXG4gIFZpZXdDaGlsZFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtBamZXaWRnZXRJbnN0YW5jZX0gZnJvbSAnLi9pbnRlcmZhY2Uvd2lkZ2V0cy1pbnN0YW5jZXMvd2lkZ2V0LWluc3RhbmNlJztcbmltcG9ydCB7QWpmV2lkZ2V0Q29tcG9uZW50c01hcH0gZnJvbSAnLi93aWRnZXQtY29tcG9uZW50cy1tYXAnO1xuaW1wb3J0IHtBamZXaWRnZXRIb3N0fSBmcm9tICcuL3dpZGdldC1ob3N0JztcblxuQERpcmVjdGl2ZSgpXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQWpmUmVwb3J0V2lkZ2V0IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQFZpZXdDaGlsZChBamZXaWRnZXRIb3N0LCB7c3RhdGljOiB0cnVlfSkgd2lkZ2V0SG9zdDogQWpmV2lkZ2V0SG9zdDtcblxuICBwcml2YXRlIF9pbnN0YW5jZTogQWpmV2lkZ2V0SW5zdGFuY2U7XG4gIGdldCBpbnN0YW5jZSgpOiBBamZXaWRnZXRJbnN0YW5jZSB7XG4gICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBpbnN0YW5jZShpbnN0YW5jZTogQWpmV2lkZ2V0SW5zdGFuY2UpIHtcbiAgICBpZiAodGhpcy5faW5zdGFuY2UgIT09IGluc3RhbmNlKSB7XG4gICAgICB0aGlzLl9pbnN0YW5jZSA9IGluc3RhbmNlO1xuICAgICAgaWYgKHRoaXMuX2luaXQpIHtcbiAgICAgICAgdGhpcy5fbG9hZENvbXBvbmVudCgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBhYnN0cmFjdCB3aWRnZXRzTWFwOiBBamZXaWRnZXRDb21wb25lbnRzTWFwO1xuXG4gIHByaXZhdGUgX2luaXQgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9jZnI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMikge31cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9pbml0ID0gdHJ1ZTtcbiAgICB0aGlzLl9sb2FkQ29tcG9uZW50KCk7XG4gIH1cblxuICBwcml2YXRlIF9sb2FkQ29tcG9uZW50KCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5faW5pdCB8fCB0aGlzLl9pbnN0YW5jZSA9PSBudWxsIHx8IHRoaXMud2lkZ2V0SG9zdCA9PSBudWxsIHx8XG4gICAgICAgICF0aGlzLmluc3RhbmNlLnZpc2libGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB2Y3IgPSB0aGlzLndpZGdldEhvc3Qudmlld0NvbnRhaW5lclJlZjtcbiAgICB2Y3IuY2xlYXIoKTtcbiAgICBjb25zdCBjb21wb25lbnREZWYgPSB0aGlzLndpZGdldHNNYXBbdGhpcy5faW5zdGFuY2Uud2lkZ2V0LndpZGdldFR5cGVdO1xuICAgIGlmIChjb21wb25lbnREZWYgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBjb21wb25lbnQgPSBjb21wb25lbnREZWYuY29tcG9uZW50O1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBjb21wb25lbnRGYWN0b3J5ID0gdGhpcy5fY2ZyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KGNvbXBvbmVudCk7XG4gICAgICBjb25zdCBjb21wb25lbnRSZWYgPSB2Y3IuY3JlYXRlQ29tcG9uZW50KGNvbXBvbmVudEZhY3RvcnkpO1xuICAgICAgY29uc3QgY29tcG9uZW50SW5zdGFuY2UgPSBjb21wb25lbnRSZWYuaW5zdGFuY2U7XG5cbiAgICAgIE9iamVjdC5rZXlzKHRoaXMuX2luc3RhbmNlLndpZGdldC5zdHlsZXMpLmZvckVhY2goKHN0eWxlOiBzdHJpbmcpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZShcbiAgICAgICAgICAgICAgY29tcG9uZW50SW5zdGFuY2UuZWwubmF0aXZlRWxlbWVudCwgc3R5bGUsIGAke3RoaXMuX2luc3RhbmNlLndpZGdldC5zdHlsZXNbc3R5bGVdfWApO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBjb21wb25lbnRJbnN0YW5jZS5pbnN0YW5jZSA9IHRoaXMuX2luc3RhbmNlO1xuICAgICAgaWYgKGNvbXBvbmVudERlZi5pbnB1dHMpIHtcbiAgICAgICAgT2JqZWN0LmtleXMoY29tcG9uZW50RGVmLmlucHV0cykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAgIGlmIChrZXkgaW4gY29tcG9uZW50SW5zdGFuY2UpIHtcbiAgICAgICAgICAgIChjb21wb25lbnRJbnN0YW5jZSBhcyBhbnkpW2tleV0gPSBjb21wb25lbnREZWYuaW5wdXRzIVtrZXldO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgIH1cbiAgfVxufVxuIl19