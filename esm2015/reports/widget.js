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
import { __decorate, __metadata } from "tslib";
import { ComponentFactoryResolver, Directive, Input, Renderer2, ViewChild } from '@angular/core';
import { AjfWidgetHost } from './widget-host';
let AjfReportWidget = /** @class */ (() => {
    let AjfReportWidget = class AjfReportWidget {
        constructor(_cfr, _renderer) {
            this._cfr = _cfr;
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
            if (!this._init || this._instance == null || this.widgetHost == null ||
                !this.instance.visible) {
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
                const componentFactory = this._cfr.resolveComponentFactory(component);
                const componentRef = vcr.createComponent(componentFactory);
                const componentInstance = componentRef.instance;
                Object.keys(this._instance.widget.styles).forEach((style) => {
                    try {
                        this._renderer.setStyle(componentInstance.el.nativeElement, style, `${this._instance.widget.styles[style]}`);
                    }
                    catch (e) {
                    }
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
            catch (e) {
            }
        }
    };
    __decorate([
        ViewChild(AjfWidgetHost, { static: true }),
        __metadata("design:type", AjfWidgetHost)
    ], AjfReportWidget.prototype, "widgetHost", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], AjfReportWidget.prototype, "instance", null);
    AjfReportWidget = __decorate([
        Directive(),
        __metadata("design:paramtypes", [ComponentFactoryResolver, Renderer2])
    ], AjfReportWidget);
    return AjfReportWidget;
})();
export { AjfReportWidget };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvcmVwb3J0cy93aWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHOztBQUVILE9BQU8sRUFDTCx3QkFBd0IsRUFDeEIsU0FBUyxFQUNULEtBQUssRUFFTCxTQUFTLEVBQ1QsU0FBUyxFQUNWLE1BQU0sZUFBZSxDQUFDO0FBSXZCLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFHNUM7SUFBQSxJQUFzQixlQUFlLEdBQXJDLE1BQXNCLGVBQWU7UUFxQm5DLFlBQW9CLElBQThCLEVBQVUsU0FBb0I7WUFBNUQsU0FBSSxHQUFKLElBQUksQ0FBMEI7WUFBVSxjQUFTLEdBQVQsU0FBUyxDQUFXO1lBRnhFLFVBQUssR0FBRyxLQUFLLENBQUM7UUFFNkQsQ0FBQztRQWpCcEYsSUFBSSxRQUFRO1lBQ1YsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ3hCLENBQUM7UUFFRCxJQUFJLFFBQVEsQ0FBQyxRQUEyQjtZQUN0QyxJQUFJLElBQUksQ0FBQyxTQUFTLEtBQUssUUFBUSxFQUFFO2dCQUMvQixJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztnQkFDMUIsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO29CQUNkLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztpQkFDdkI7YUFDRjtRQUNILENBQUM7UUFRRCxRQUFRO1lBQ04sSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7WUFDbEIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3hCLENBQUM7UUFFTyxjQUFjO1lBQ3BCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSTtnQkFDaEUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRTtnQkFDMUIsT0FBTzthQUNSO1lBRUQsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQztZQUM3QyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDWixNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3ZFLElBQUksWUFBWSxJQUFJLElBQUksRUFBRTtnQkFDeEIsT0FBTzthQUNSO1lBQ0QsTUFBTSxTQUFTLEdBQUcsWUFBWSxDQUFDLFNBQVMsQ0FBQztZQUN6QyxJQUFJO2dCQUNGLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDdEUsTUFBTSxZQUFZLEdBQUcsR0FBRyxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO2dCQUMzRCxNQUFNLGlCQUFpQixHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUM7Z0JBRWhELE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBYSxFQUFFLEVBQUU7b0JBQ2xFLElBQUk7d0JBQ0YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQ25CLGlCQUFpQixDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsS0FBSyxFQUFFLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztxQkFDMUY7b0JBQUMsT0FBTyxDQUFDLEVBQUU7cUJBQ1g7Z0JBQ0gsQ0FBQyxDQUFDLENBQUM7Z0JBRUgsaUJBQWlCLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7Z0JBQzVDLElBQUksWUFBWSxDQUFDLE1BQU0sRUFBRTtvQkFDdkIsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFO3dCQUM3QyxJQUFJLEdBQUcsSUFBSSxpQkFBaUIsRUFBRTs0QkFDM0IsaUJBQXlCLENBQUMsR0FBRyxDQUFDLEdBQUcsWUFBWSxDQUFDLE1BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQzt5QkFDN0Q7b0JBQ0gsQ0FBQyxDQUFDLENBQUM7aUJBQ0o7YUFDRjtZQUFDLE9BQU8sQ0FBQyxFQUFFO2FBQ1g7UUFDSCxDQUFDO0tBQ0YsQ0FBQTtJQWhFMkM7UUFBekMsU0FBUyxDQUFDLGFBQWEsRUFBRSxFQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUMsQ0FBQztrQ0FBYSxhQUFhO3VEQUFDO0lBT3BFO1FBREMsS0FBSyxFQUFFOzs7bURBUVA7SUFmbUIsZUFBZTtRQURwQyxTQUFTLEVBQUU7eUNBc0JnQix3QkFBd0IsRUFBcUIsU0FBUztPQXJCNUQsZUFBZSxDQWlFcEM7SUFBRCxzQkFBQztLQUFBO1NBakVxQixlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge1xuICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gIERpcmVjdGl2ZSxcbiAgSW5wdXQsXG4gIE9uSW5pdCxcbiAgUmVuZGVyZXIyLFxuICBWaWV3Q2hpbGRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7QWpmV2lkZ2V0SW5zdGFuY2V9IGZyb20gJy4vaW50ZXJmYWNlL3dpZGdldHMtaW5zdGFuY2VzL3dpZGdldC1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZldpZGdldENvbXBvbmVudHNNYXB9IGZyb20gJy4vd2lkZ2V0LWNvbXBvbmVudHMtbWFwJztcbmltcG9ydCB7QWpmV2lkZ2V0SG9zdH0gZnJvbSAnLi93aWRnZXQtaG9zdCc7XG5cbkBEaXJlY3RpdmUoKVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFqZlJlcG9ydFdpZGdldCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBWaWV3Q2hpbGQoQWpmV2lkZ2V0SG9zdCwge3N0YXRpYzogdHJ1ZX0pIHdpZGdldEhvc3Q6IEFqZldpZGdldEhvc3Q7XG5cbiAgcHJpdmF0ZSBfaW5zdGFuY2U6IEFqZldpZGdldEluc3RhbmNlO1xuICBnZXQgaW5zdGFuY2UoKTogQWpmV2lkZ2V0SW5zdGFuY2Uge1xuICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgaW5zdGFuY2UoaW5zdGFuY2U6IEFqZldpZGdldEluc3RhbmNlKSB7XG4gICAgaWYgKHRoaXMuX2luc3RhbmNlICE9PSBpbnN0YW5jZSkge1xuICAgICAgdGhpcy5faW5zdGFuY2UgPSBpbnN0YW5jZTtcbiAgICAgIGlmICh0aGlzLl9pbml0KSB7XG4gICAgICAgIHRoaXMuX2xvYWRDb21wb25lbnQoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgYWJzdHJhY3Qgd2lkZ2V0c01hcDogQWpmV2lkZ2V0Q29tcG9uZW50c01hcDtcblxuICBwcml2YXRlIF9pbml0ID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfY2ZyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIpIHt9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5faW5pdCA9IHRydWU7XG4gICAgdGhpcy5fbG9hZENvbXBvbmVudCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfbG9hZENvbXBvbmVudCgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuX2luaXQgfHwgdGhpcy5faW5zdGFuY2UgPT0gbnVsbCB8fCB0aGlzLndpZGdldEhvc3QgPT0gbnVsbCB8fFxuICAgICAgICAhdGhpcy5pbnN0YW5jZS52aXNpYmxlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgdmNyID0gdGhpcy53aWRnZXRIb3N0LnZpZXdDb250YWluZXJSZWY7XG4gICAgdmNyLmNsZWFyKCk7XG4gICAgY29uc3QgY29tcG9uZW50RGVmID0gdGhpcy53aWRnZXRzTWFwW3RoaXMuX2luc3RhbmNlLndpZGdldC53aWRnZXRUeXBlXTtcbiAgICBpZiAoY29tcG9uZW50RGVmID09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgY29tcG9uZW50ID0gY29tcG9uZW50RGVmLmNvbXBvbmVudDtcbiAgICB0cnkge1xuICAgICAgY29uc3QgY29tcG9uZW50RmFjdG9yeSA9IHRoaXMuX2Nmci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShjb21wb25lbnQpO1xuICAgICAgY29uc3QgY29tcG9uZW50UmVmID0gdmNyLmNyZWF0ZUNvbXBvbmVudChjb21wb25lbnRGYWN0b3J5KTtcbiAgICAgIGNvbnN0IGNvbXBvbmVudEluc3RhbmNlID0gY29tcG9uZW50UmVmLmluc3RhbmNlO1xuXG4gICAgICBPYmplY3Qua2V5cyh0aGlzLl9pbnN0YW5jZS53aWRnZXQuc3R5bGVzKS5mb3JFYWNoKChzdHlsZTogc3RyaW5nKSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUoXG4gICAgICAgICAgICAgIGNvbXBvbmVudEluc3RhbmNlLmVsLm5hdGl2ZUVsZW1lbnQsIHN0eWxlLCBgJHt0aGlzLl9pbnN0YW5jZS53aWRnZXQuc3R5bGVzW3N0eWxlXX1gKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgY29tcG9uZW50SW5zdGFuY2UuaW5zdGFuY2UgPSB0aGlzLl9pbnN0YW5jZTtcbiAgICAgIGlmIChjb21wb25lbnREZWYuaW5wdXRzKSB7XG4gICAgICAgIE9iamVjdC5rZXlzKGNvbXBvbmVudERlZi5pbnB1dHMpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgICBpZiAoa2V5IGluIGNvbXBvbmVudEluc3RhbmNlKSB7XG4gICAgICAgICAgICAoY29tcG9uZW50SW5zdGFuY2UgYXMgYW55KVtrZXldID0gY29tcG9uZW50RGVmLmlucHV0cyFba2V5XTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICB9XG4gIH1cbn1cbiJdfQ==