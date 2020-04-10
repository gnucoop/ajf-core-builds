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
    get instance() {
        return this._instance;
    }
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
        if (!this._init || this._instance == null || this.widgetHost == null ||
            !this.instance.visible) {
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
                catch (e) {
                }
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
        catch (e) {
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvcmVwb3J0cy93aWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzQkEsT0FBTyxFQUNMLHdCQUF3QixFQUN4QixTQUFTLEVBQ1QsS0FBSyxFQUVMLFNBQVMsRUFDVCxTQUFTLEVBQ1YsTUFBTSxlQUFlLENBQUM7QUFJdkIsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGVBQWUsQ0FBQzs7OztBQUc1QyxNQUFNLE9BQWdCLGVBQWU7Ozs7O0lBcUJuQyxZQUFvQixJQUE4QixFQUFVLFNBQW9CO1FBQTVELFNBQUksR0FBSixJQUFJLENBQTBCO1FBQVUsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUZ4RSxVQUFLLEdBQUcsS0FBSyxDQUFDO0lBRTZELENBQUM7Ozs7SUFqQnBGLElBQUksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDOzs7OztJQUNELElBQ0ksUUFBUSxDQUFDLFFBQTJCO1FBQ3RDLElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxRQUFRLEVBQUU7WUFDL0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7WUFDMUIsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNkLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQzthQUN2QjtTQUNGO0lBQ0gsQ0FBQzs7OztJQVFELFFBQVE7UUFDTixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUNsQixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDeEIsQ0FBQzs7Ozs7SUFFTyxjQUFjO1FBQ3BCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSTtZQUNoRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFO1lBQzFCLE9BQU87U0FDUjs7Y0FFSyxHQUFHLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0I7UUFDNUMsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDOztjQUNOLFlBQVksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQztRQUN0RSxJQUFJLFlBQVksSUFBSSxJQUFJLEVBQUU7WUFDeEIsT0FBTztTQUNSOztjQUNLLFNBQVMsR0FBRyxZQUFZLENBQUMsU0FBUztRQUN4QyxJQUFJOztrQkFDSSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLFNBQVMsQ0FBQzs7a0JBQy9ELFlBQVksR0FBRyxHQUFHLENBQUMsZUFBZSxDQUFDLGdCQUFnQixDQUFDOztrQkFDcEQsaUJBQWlCLEdBQUcsWUFBWSxDQUFDLFFBQVE7WUFFL0MsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPOzs7O1lBQUMsQ0FBQyxLQUFhLEVBQUUsRUFBRTtnQkFDbEUsSUFBSTtvQkFDRixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FDbkIsaUJBQWlCLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxLQUFLLEVBQUUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2lCQUMxRjtnQkFBQyxPQUFPLENBQUMsRUFBRTtpQkFDWDtZQUNILENBQUMsRUFBQyxDQUFDO1lBRUgsaUJBQWlCLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7WUFDNUMsSUFBSSxZQUFZLENBQUMsTUFBTSxFQUFFO2dCQUN2QixNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPOzs7O2dCQUFDLEdBQUcsQ0FBQyxFQUFFO29CQUM3QyxJQUFJLEdBQUcsSUFBSSxpQkFBaUIsRUFBRTt3QkFDNUIsQ0FBQyxtQkFBQSxpQkFBaUIsRUFBTyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsbUJBQUEsWUFBWSxDQUFDLE1BQU0sRUFBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3FCQUM3RDtnQkFDSCxDQUFDLEVBQUMsQ0FBQzthQUNKO1NBQ0Y7UUFBQyxPQUFPLENBQUMsRUFBRTtTQUNYO0lBQ0gsQ0FBQzs7O1lBakVGLFNBQVM7Ozs7WUFaUix3QkFBd0I7WUFJeEIsU0FBUzs7O3lCQVVSLFNBQVMsU0FBQyxhQUFhLEVBQUUsRUFBQyxNQUFNLEVBQUUsSUFBSSxFQUFDO3VCQU12QyxLQUFLOzs7O0lBTk4scUNBQW9FOzs7OztJQUVwRSxvQ0FBcUM7Ozs7O0lBY3JDLHFDQUFzRDs7Ozs7SUFFdEQsZ0NBQXNCOzs7OztJQUVWLCtCQUFzQzs7Ozs7SUFBRSxvQ0FBNEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7XG4gIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgRGlyZWN0aXZlLFxuICBJbnB1dCxcbiAgT25Jbml0LFxuICBSZW5kZXJlcjIsXG4gIFZpZXdDaGlsZFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtBamZXaWRnZXRJbnN0YW5jZX0gZnJvbSAnLi9pbnRlcmZhY2Uvd2lkZ2V0cy1pbnN0YW5jZXMvd2lkZ2V0LWluc3RhbmNlJztcbmltcG9ydCB7QWpmV2lkZ2V0Q29tcG9uZW50c01hcH0gZnJvbSAnLi93aWRnZXQtY29tcG9uZW50cy1tYXAnO1xuaW1wb3J0IHtBamZXaWRnZXRIb3N0fSBmcm9tICcuL3dpZGdldC1ob3N0JztcblxuQERpcmVjdGl2ZSgpXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQWpmUmVwb3J0V2lkZ2V0IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQFZpZXdDaGlsZChBamZXaWRnZXRIb3N0LCB7c3RhdGljOiB0cnVlfSkgd2lkZ2V0SG9zdDogQWpmV2lkZ2V0SG9zdDtcblxuICBwcml2YXRlIF9pbnN0YW5jZTogQWpmV2lkZ2V0SW5zdGFuY2U7XG4gIGdldCBpbnN0YW5jZSgpOiBBamZXaWRnZXRJbnN0YW5jZSB7XG4gICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBpbnN0YW5jZShpbnN0YW5jZTogQWpmV2lkZ2V0SW5zdGFuY2UpIHtcbiAgICBpZiAodGhpcy5faW5zdGFuY2UgIT09IGluc3RhbmNlKSB7XG4gICAgICB0aGlzLl9pbnN0YW5jZSA9IGluc3RhbmNlO1xuICAgICAgaWYgKHRoaXMuX2luaXQpIHtcbiAgICAgICAgdGhpcy5fbG9hZENvbXBvbmVudCgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBhYnN0cmFjdCB3aWRnZXRzTWFwOiBBamZXaWRnZXRDb21wb25lbnRzTWFwO1xuXG4gIHByaXZhdGUgX2luaXQgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9jZnI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMikge31cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9pbml0ID0gdHJ1ZTtcbiAgICB0aGlzLl9sb2FkQ29tcG9uZW50KCk7XG4gIH1cblxuICBwcml2YXRlIF9sb2FkQ29tcG9uZW50KCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5faW5pdCB8fCB0aGlzLl9pbnN0YW5jZSA9PSBudWxsIHx8IHRoaXMud2lkZ2V0SG9zdCA9PSBudWxsIHx8XG4gICAgICAgICF0aGlzLmluc3RhbmNlLnZpc2libGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB2Y3IgPSB0aGlzLndpZGdldEhvc3Qudmlld0NvbnRhaW5lclJlZjtcbiAgICB2Y3IuY2xlYXIoKTtcbiAgICBjb25zdCBjb21wb25lbnREZWYgPSB0aGlzLndpZGdldHNNYXBbdGhpcy5faW5zdGFuY2Uud2lkZ2V0LndpZGdldFR5cGVdO1xuICAgIGlmIChjb21wb25lbnREZWYgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBjb21wb25lbnQgPSBjb21wb25lbnREZWYuY29tcG9uZW50O1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBjb21wb25lbnRGYWN0b3J5ID0gdGhpcy5fY2ZyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KGNvbXBvbmVudCk7XG4gICAgICBjb25zdCBjb21wb25lbnRSZWYgPSB2Y3IuY3JlYXRlQ29tcG9uZW50KGNvbXBvbmVudEZhY3RvcnkpO1xuICAgICAgY29uc3QgY29tcG9uZW50SW5zdGFuY2UgPSBjb21wb25lbnRSZWYuaW5zdGFuY2U7XG5cbiAgICAgIE9iamVjdC5rZXlzKHRoaXMuX2luc3RhbmNlLndpZGdldC5zdHlsZXMpLmZvckVhY2goKHN0eWxlOiBzdHJpbmcpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZShcbiAgICAgICAgICAgICAgY29tcG9uZW50SW5zdGFuY2UuZWwubmF0aXZlRWxlbWVudCwgc3R5bGUsIGAke3RoaXMuX2luc3RhbmNlLndpZGdldC5zdHlsZXNbc3R5bGVdfWApO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBjb21wb25lbnRJbnN0YW5jZS5pbnN0YW5jZSA9IHRoaXMuX2luc3RhbmNlO1xuICAgICAgaWYgKGNvbXBvbmVudERlZi5pbnB1dHMpIHtcbiAgICAgICAgT2JqZWN0LmtleXMoY29tcG9uZW50RGVmLmlucHV0cykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAgIGlmIChrZXkgaW4gY29tcG9uZW50SW5zdGFuY2UpIHtcbiAgICAgICAgICAgIChjb21wb25lbnRJbnN0YW5jZSBhcyBhbnkpW2tleV0gPSBjb21wb25lbnREZWYuaW5wdXRzIVtrZXldO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgIH1cbiAgfVxufVxuIl19