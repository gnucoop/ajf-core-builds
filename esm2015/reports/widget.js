/**
 * @fileoverview added by tsickle
 * Generated from: src/core/reports/widget.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
/**
 * @abstract
 */
export class AjfReportWidget {
    /**
     * @param {?} _cfr
     * @param {?} _renderer
     */
    constructor(_cfr, _renderer) {
        this._cfr = _cfr;
        this._renderer = _renderer;
        this._init = false;
    }
    /**
     * @return {?}
     */
    get instance() { return this._instance; }
    /**
     * @param {?} instance
     * @return {?}
     */
    set instance(instance) {
        if (this._instance !== instance) {
            this._instance = instance;
            if (this._init) {
                this._loadComponent();
            }
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._init = true;
        this._loadComponent();
    }
    /**
     * @private
     * @return {?}
     */
    _loadComponent() {
        if (!this._init || this._instance == null
            || this.widgetHost == null || !this.instance.visible) {
            return;
        }
        /** @type {?} */
        const vcr = this.widgetHost.viewContainerRef;
        vcr.clear();
        /** @type {?} */
        const componentDef = this.widgetsMap[this._instance.widget.widgetType];
        if (componentDef == null) {
            return;
        }
        /** @type {?} */
        const component = componentDef.component;
        try {
            /** @type {?} */
            const componentFactory = this._cfr.resolveComponentFactory(component);
            /** @type {?} */
            const componentRef = vcr.createComponent(componentFactory);
            /** @type {?} */
            const componentInstance = componentRef.instance;
            Object.keys(this._instance.widget.styles).forEach((/**
             * @param {?} style
             * @return {?}
             */
            (style) => {
                try {
                    this._renderer.setStyle(componentInstance.el.nativeElement, style, `${this._instance.widget.styles[style]}`);
                }
                catch (e) { }
            }));
            componentInstance.instance = this._instance;
            if (componentDef.inputs) {
                Object.keys(componentDef.inputs).forEach((/**
                 * @param {?} key
                 * @return {?}
                 */
                key => {
                    if (key in componentInstance) {
                        ((/** @type {?} */ (componentInstance)))[key] = (/** @type {?} */ (componentDef.inputs))[key];
                    }
                }));
            }
        }
        catch (e) { }
    }
}
AjfReportWidget.decorators = [
    { type: Directive }
];
/** @nocollapse */
AjfReportWidget.ctorParameters = () => [
    { type: ComponentFactoryResolver },
    { type: Renderer2 }
];
AjfReportWidget.propDecorators = {
    widgetHost: [{ type: ViewChild, args: [AjfWidgetHost, { static: true },] }],
    instance: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    AjfReportWidget.prototype.widgetHost;
    /**
     * @type {?}
     * @private
     */
    AjfReportWidget.prototype._instance;
    /**
     * @type {?}
     * @protected
     */
    AjfReportWidget.prototype.widgetsMap;
    /**
     * @type {?}
     * @private
     */
    AjfReportWidget.prototype._init;
    /**
     * @type {?}
     * @private
     */
    AjfReportWidget.prototype._cfr;
    /**
     * @type {?}
     * @private
     */
    AjfReportWidget.prototype._renderer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvcmVwb3J0cy93aWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzQkEsT0FBTyxFQUFDLHdCQUF3QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsU0FBUyxFQUNuRSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFJbEMsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGVBQWUsQ0FBQzs7OztBQUc1QyxNQUFNLE9BQWdCLGVBQWU7Ozs7O0lBa0JuQyxZQUFvQixJQUE4QixFQUFVLFNBQW9CO1FBQTVELFNBQUksR0FBSixJQUFJLENBQTBCO1FBQVUsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUZ4RSxVQUFLLEdBQUcsS0FBSyxDQUFDO0lBRThELENBQUM7Ozs7SUFkckYsSUFBSSxRQUFRLEtBQXdCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7Ozs7O0lBQzVELElBQWEsUUFBUSxDQUFDLFFBQTJCO1FBQy9DLElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxRQUFRLEVBQUU7WUFDL0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7WUFDMUIsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNkLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQzthQUN2QjtTQUNGO0lBQ0gsQ0FBQzs7OztJQVFELFFBQVE7UUFDTixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUNsQixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDeEIsQ0FBQzs7Ozs7SUFFTyxjQUFjO1FBQ3BCLElBQ0UsQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSTtlQUNsQyxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFO1lBQ3RELE9BQU87U0FDUjs7Y0FFSyxHQUFHLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0I7UUFDNUMsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDOztjQUNOLFlBQVksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQztRQUN0RSxJQUFJLFlBQVksSUFBSSxJQUFJLEVBQUU7WUFBRSxPQUFPO1NBQUU7O2NBQy9CLFNBQVMsR0FBRyxZQUFZLENBQUMsU0FBUztRQUN4QyxJQUFJOztrQkFDSSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLFNBQVMsQ0FBQzs7a0JBQy9ELFlBQVksR0FBRyxHQUFHLENBQUMsZUFBZSxDQUFDLGdCQUFnQixDQUFDOztrQkFDcEQsaUJBQWlCLEdBQUcsWUFBWSxDQUFDLFFBQVE7WUFFL0MsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPOzs7O1lBQUMsQ0FBQyxLQUFhLEVBQUUsRUFBRTtnQkFDbEUsSUFBSTtvQkFDRixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FDckIsaUJBQWlCLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFDbEMsS0FBSyxFQUNMLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQ3pDLENBQUM7aUJBQ0g7Z0JBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRztZQUNqQixDQUFDLEVBQUMsQ0FBQztZQUVILGlCQUFpQixDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQzVDLElBQUksWUFBWSxDQUFDLE1BQU0sRUFBRTtnQkFDdkIsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTzs7OztnQkFBQyxHQUFHLENBQUMsRUFBRTtvQkFDN0MsSUFBSSxHQUFHLElBQUksaUJBQWlCLEVBQUU7d0JBQzVCLENBQUMsbUJBQUEsaUJBQWlCLEVBQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLG1CQUFBLFlBQVksQ0FBQyxNQUFNLEVBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztxQkFDN0Q7Z0JBQ0gsQ0FBQyxFQUFDLENBQUM7YUFDSjtTQUNGO1FBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRztJQUNqQixDQUFDOzs7WUE5REYsU0FBUzs7OztZQVBGLHdCQUF3QjtZQUE0QixTQUFTOzs7eUJBU2xFLFNBQVMsU0FBQyxhQUFhLEVBQUUsRUFBQyxNQUFNLEVBQUUsSUFBSSxFQUFDO3VCQUl2QyxLQUFLOzs7O0lBSk4scUNBQW9FOzs7OztJQUVwRSxvQ0FBcUM7Ozs7O0lBV3JDLHFDQUFzRDs7Ozs7SUFFdEQsZ0NBQXNCOzs7OztJQUVWLCtCQUFzQzs7Ozs7SUFBRSxvQ0FBNEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7Q29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBEaXJlY3RpdmUsIElucHV0LCBPbkluaXQsIFJlbmRlcmVyMixcbiAgVmlld0NoaWxkfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtBamZXaWRnZXRJbnN0YW5jZX0gZnJvbSAnLi9pbnRlcmZhY2Uvd2lkZ2V0cy1pbnN0YW5jZXMvd2lkZ2V0LWluc3RhbmNlJztcbmltcG9ydCB7QWpmV2lkZ2V0Q29tcG9uZW50c01hcH0gZnJvbSAnLi93aWRnZXQtY29tcG9uZW50cy1tYXAnO1xuaW1wb3J0IHtBamZXaWRnZXRIb3N0fSBmcm9tICcuL3dpZGdldC1ob3N0JztcblxuQERpcmVjdGl2ZSgpXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQWpmUmVwb3J0V2lkZ2V0IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQFZpZXdDaGlsZChBamZXaWRnZXRIb3N0LCB7c3RhdGljOiB0cnVlfSkgd2lkZ2V0SG9zdDogQWpmV2lkZ2V0SG9zdDtcblxuICBwcml2YXRlIF9pbnN0YW5jZTogQWpmV2lkZ2V0SW5zdGFuY2U7XG4gIGdldCBpbnN0YW5jZSgpOiBBamZXaWRnZXRJbnN0YW5jZSB7IHJldHVybiB0aGlzLl9pbnN0YW5jZTsgfVxuICBASW5wdXQoKSBzZXQgaW5zdGFuY2UoaW5zdGFuY2U6IEFqZldpZGdldEluc3RhbmNlKSB7XG4gICAgaWYgKHRoaXMuX2luc3RhbmNlICE9PSBpbnN0YW5jZSkge1xuICAgICAgdGhpcy5faW5zdGFuY2UgPSBpbnN0YW5jZTtcbiAgICAgIGlmICh0aGlzLl9pbml0KSB7XG4gICAgICAgIHRoaXMuX2xvYWRDb21wb25lbnQoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgYWJzdHJhY3Qgd2lkZ2V0c01hcDogQWpmV2lkZ2V0Q29tcG9uZW50c01hcDtcblxuICBwcml2YXRlIF9pbml0ID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfY2ZyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIpIHsgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuX2luaXQgPSB0cnVlO1xuICAgIHRoaXMuX2xvYWRDb21wb25lbnQoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2xvYWRDb21wb25lbnQoKTogdm9pZCB7XG4gICAgaWYgKFxuICAgICAgIXRoaXMuX2luaXQgfHwgdGhpcy5faW5zdGFuY2UgPT0gbnVsbFxuICAgICAgfHwgdGhpcy53aWRnZXRIb3N0ID09IG51bGwgfHwgIXRoaXMuaW5zdGFuY2UudmlzaWJsZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHZjciA9IHRoaXMud2lkZ2V0SG9zdC52aWV3Q29udGFpbmVyUmVmO1xuICAgIHZjci5jbGVhcigpO1xuICAgIGNvbnN0IGNvbXBvbmVudERlZiA9IHRoaXMud2lkZ2V0c01hcFt0aGlzLl9pbnN0YW5jZS53aWRnZXQud2lkZ2V0VHlwZV07XG4gICAgaWYgKGNvbXBvbmVudERlZiA9PSBudWxsKSB7IHJldHVybjsgfVxuICAgIGNvbnN0IGNvbXBvbmVudCA9IGNvbXBvbmVudERlZi5jb21wb25lbnQ7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGNvbXBvbmVudEZhY3RvcnkgPSB0aGlzLl9jZnIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoY29tcG9uZW50KTtcbiAgICAgIGNvbnN0IGNvbXBvbmVudFJlZiA9IHZjci5jcmVhdGVDb21wb25lbnQoY29tcG9uZW50RmFjdG9yeSk7XG4gICAgICBjb25zdCBjb21wb25lbnRJbnN0YW5jZSA9IGNvbXBvbmVudFJlZi5pbnN0YW5jZTtcblxuICAgICAgT2JqZWN0LmtleXModGhpcy5faW5zdGFuY2Uud2lkZ2V0LnN0eWxlcykuZm9yRWFjaCgoc3R5bGU6IHN0cmluZykgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKFxuICAgICAgICAgICAgY29tcG9uZW50SW5zdGFuY2UuZWwubmF0aXZlRWxlbWVudCxcbiAgICAgICAgICAgIHN0eWxlLFxuICAgICAgICAgICAgYCR7dGhpcy5faW5zdGFuY2Uud2lkZ2V0LnN0eWxlc1tzdHlsZV19YFxuICAgICAgICAgICk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgfVxuICAgICAgfSk7XG5cbiAgICAgIGNvbXBvbmVudEluc3RhbmNlLmluc3RhbmNlID0gdGhpcy5faW5zdGFuY2U7XG4gICAgICBpZiAoY29tcG9uZW50RGVmLmlucHV0cykge1xuICAgICAgICBPYmplY3Qua2V5cyhjb21wb25lbnREZWYuaW5wdXRzKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgaWYgKGtleSBpbiBjb21wb25lbnRJbnN0YW5jZSkge1xuICAgICAgICAgICAgKGNvbXBvbmVudEluc3RhbmNlIGFzIGFueSlba2V5XSA9IGNvbXBvbmVudERlZi5pbnB1dHMhW2tleV07XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7IH1cbiAgfVxufVxuIl19