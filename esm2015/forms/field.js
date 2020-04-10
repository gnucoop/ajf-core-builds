/**
 * @fileoverview added by tsickle
 * Generated from: src/core/forms/field.ts
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
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectorRef, ComponentFactoryResolver, Directive, Input, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { AjfFieldHost } from './field-host';
/**
 * @abstract
 */
export class AjfFormField {
    /**
     * @param {?} _cdr
     * @param {?} _cfr
     */
    constructor(_cdr, _cfr) {
        this._cdr = _cdr;
        this._cfr = _cfr;
        this._updatedSub = Subscription.EMPTY;
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
            this._loadComponent();
        }
    }
    /**
     * @return {?}
     */
    get readonly() {
        return this._readonly;
    }
    /**
     * @param {?} readonly
     * @return {?}
     */
    set readonly(readonly) {
        this._readonly = coerceBooleanProperty(readonly);
        if (this._componentInstance != null) {
            this._componentInstance.readonly = this._readonly;
        }
        this._cdr.markForCheck();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._updatedSub.unsubscribe();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._loadComponent();
    }
    /**
     * @private
     * @return {?}
     */
    _loadComponent() {
        this._updatedSub.unsubscribe();
        this._updatedSub = Subscription.EMPTY;
        if (this._instance == null || this.fieldHost == null) {
            return;
        }
        /** @type {?} */
        const vcr = this.fieldHost.viewContainerRef;
        vcr.clear();
        /** @type {?} */
        const componentDef = this.componentsMap[this._instance.node.fieldType];
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
            this._componentInstance = componentRef.instance;
            this._componentInstance.instance = this._instance;
            this._componentInstance.readonly = this._readonly;
            if (componentDef.inputs) {
                Object.keys(componentDef.inputs).forEach((/**
                 * @param {?} key
                 * @return {?}
                 */
                key => {
                    if (key in this._componentInstance) {
                        ((/** @type {?} */ (this._componentInstance)))[key] = (/** @type {?} */ (componentDef.inputs))[key];
                    }
                }));
            }
            this._updatedSub = this._instance.updatedEvt.subscribe((/**
             * @return {?}
             */
            () => this._cdr.markForCheck()));
        }
        catch (e) {
            console.log(e);
        }
    }
}
AjfFormField.decorators = [
    { type: Directive }
];
/** @nocollapse */
AjfFormField.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ComponentFactoryResolver }
];
AjfFormField.propDecorators = {
    fieldHost: [{ type: ViewChild, args: [AjfFieldHost, { static: true },] }],
    instance: [{ type: Input }],
    readonly: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    AjfFormField.prototype.fieldHost;
    /**
     * @type {?}
     * @private
     */
    AjfFormField.prototype._instance;
    /**
     * @type {?}
     * @private
     */
    AjfFormField.prototype._readonly;
    /**
     * @type {?}
     * @private
     */
    AjfFormField.prototype._componentInstance;
    /**
     * @type {?}
     * @protected
     */
    AjfFormField.prototype.componentsMap;
    /**
     * @type {?}
     * @private
     */
    AjfFormField.prototype._updatedSub;
    /**
     * @type {?}
     * @private
     */
    AjfFormField.prototype._cdr;
    /**
     * @type {?}
     * @private
     */
    AjfFormField.prototype._cfr;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9mb3Jtcy9maWVsZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCQSxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUM1RCxPQUFPLEVBQ0wsaUJBQWlCLEVBQ2pCLHdCQUF3QixFQUN4QixTQUFTLEVBQ1QsS0FBSyxFQUdMLFNBQVMsRUFDVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBR2xDLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxjQUFjLENBQUM7Ozs7QUFLMUMsTUFBTSxPQUFnQixZQUFZOzs7OztJQWlDaEMsWUFBb0IsSUFBdUIsRUFBVSxJQUE4QjtRQUEvRCxTQUFJLEdBQUosSUFBSSxDQUFtQjtRQUFVLFNBQUksR0FBSixJQUFJLENBQTBCO1FBRjNFLGdCQUFXLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQztJQUU2QyxDQUFDOzs7O0lBN0J2RixJQUFJLFFBQVE7UUFDVixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDeEIsQ0FBQzs7Ozs7SUFDRCxJQUNJLFFBQVEsQ0FBQyxRQUEwQjtRQUNyQyxJQUFJLElBQUksQ0FBQyxTQUFTLEtBQUssUUFBUSxFQUFFO1lBQy9CLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO1lBQzFCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztTQUN2QjtJQUNILENBQUM7Ozs7SUFHRCxJQUFJLFFBQVE7UUFDVixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDeEIsQ0FBQzs7Ozs7SUFDRCxJQUNJLFFBQVEsQ0FBQyxRQUFpQjtRQUM1QixJQUFJLENBQUMsU0FBUyxHQUFHLHFCQUFxQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2pELElBQUksSUFBSSxDQUFDLGtCQUFrQixJQUFJLElBQUksRUFBRTtZQUNuQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7U0FDbkQ7UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzNCLENBQUM7Ozs7SUFTRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNqQyxDQUFDOzs7O0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUN4QixDQUFDOzs7OztJQUVPLGNBQWM7UUFDcEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUMvQixJQUFJLENBQUMsV0FBVyxHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUM7UUFDdEMsSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksRUFBRTtZQUNwRCxPQUFPO1NBQ1I7O2NBRUssR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsZ0JBQWdCO1FBQzNDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQzs7Y0FDTixZQUFZLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDdEUsSUFBSSxZQUFZLElBQUksSUFBSSxFQUFFO1lBQ3hCLE9BQU87U0FDUjs7Y0FDSyxTQUFTLEdBQUcsWUFBWSxDQUFDLFNBQVM7UUFDeEMsSUFBSTs7a0JBQ0ksZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxTQUFTLENBQUM7O2tCQUMvRCxZQUFZLEdBQUcsR0FBRyxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQztZQUMxRCxJQUFJLENBQUMsa0JBQWtCLEdBQUcsWUFBWSxDQUFDLFFBQVEsQ0FBQztZQUNoRCxJQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7WUFDbEQsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBRWxELElBQUksWUFBWSxDQUFDLE1BQU0sRUFBRTtnQkFDdkIsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTzs7OztnQkFBQyxHQUFHLENBQUMsRUFBRTtvQkFDN0MsSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLGtCQUFrQixFQUFFO3dCQUNsQyxDQUFDLG1CQUFBLElBQUksQ0FBQyxrQkFBa0IsRUFBTyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsbUJBQUEsWUFBWSxDQUFDLE1BQU0sRUFBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3FCQUNuRTtnQkFDSCxDQUFDLEVBQUMsQ0FBQzthQUNKO1lBQ0QsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxTQUFTOzs7WUFBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxFQUFDLENBQUM7U0FDeEY7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDaEI7SUFDSCxDQUFDOzs7WUE1RUYsU0FBUzs7OztZQWZSLGlCQUFpQjtZQUNqQix3QkFBd0I7Ozt3QkFnQnZCLFNBQVMsU0FBQyxZQUFZLEVBQUUsRUFBQyxNQUFNLEVBQUUsSUFBSSxFQUFDO3VCQU10QyxLQUFLO3VCQVlMLEtBQUs7Ozs7SUFsQk4saUNBQWlFOzs7OztJQUVqRSxpQ0FBb0M7Ozs7O0lBWXBDLGlDQUEyQjs7Ozs7SUFhM0IsMENBQW9FOzs7OztJQUVwRSxxQ0FBd0Q7Ozs7O0lBQ3hELG1DQUF5Qzs7Ozs7SUFFN0IsNEJBQStCOzs7OztJQUFFLDRCQUFzQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtjb2VyY2VCb29sZWFuUHJvcGVydHl9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICBEaXJlY3RpdmUsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgVmlld0NoaWxkXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQge0FqZkJhc2VGaWVsZENvbXBvbmVudH0gZnJvbSAnLi9iYXNlLWZpZWxkJztcbmltcG9ydCB7QWpmRmllbGRIb3N0fSBmcm9tICcuL2ZpZWxkLWhvc3QnO1xuaW1wb3J0IHtBamZGaWVsZEluc3RhbmNlfSBmcm9tICcuL2ludGVyZmFjZS9maWVsZHMtaW5zdGFuY2VzL2ZpZWxkLWluc3RhbmNlJztcbmltcG9ydCB7QWpmRmllbGRDb21wb25lbnRzTWFwfSBmcm9tICcuL2ludGVyZmFjZS9maWVsZHMvZmllbGQtY29tcG9uZW50cy1tYXAnO1xuXG5ARGlyZWN0aXZlKClcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBamZGb3JtRmllbGQgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIE9uSW5pdCB7XG4gIEBWaWV3Q2hpbGQoQWpmRmllbGRIb3N0LCB7c3RhdGljOiB0cnVlfSkgZmllbGRIb3N0OiBBamZGaWVsZEhvc3Q7XG5cbiAgcHJpdmF0ZSBfaW5zdGFuY2U6IEFqZkZpZWxkSW5zdGFuY2U7XG4gIGdldCBpbnN0YW5jZSgpOiBBamZGaWVsZEluc3RhbmNlIHtcbiAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IGluc3RhbmNlKGluc3RhbmNlOiBBamZGaWVsZEluc3RhbmNlKSB7XG4gICAgaWYgKHRoaXMuX2luc3RhbmNlICE9PSBpbnN0YW5jZSkge1xuICAgICAgdGhpcy5faW5zdGFuY2UgPSBpbnN0YW5jZTtcbiAgICAgIHRoaXMuX2xvYWRDb21wb25lbnQoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9yZWFkb25seTogYm9vbGVhbjtcbiAgZ2V0IHJlYWRvbmx5KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9yZWFkb25seTtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgcmVhZG9ubHkocmVhZG9ubHk6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9yZWFkb25seSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eShyZWFkb25seSk7XG4gICAgaWYgKHRoaXMuX2NvbXBvbmVudEluc3RhbmNlICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX2NvbXBvbmVudEluc3RhbmNlLnJlYWRvbmx5ID0gdGhpcy5fcmVhZG9ubHk7XG4gICAgfVxuICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgX2NvbXBvbmVudEluc3RhbmNlOiBBamZCYXNlRmllbGRDb21wb25lbnQ8QWpmRmllbGRJbnN0YW5jZT47XG5cbiAgcHJvdGVjdGVkIGFic3RyYWN0IGNvbXBvbmVudHNNYXA6IEFqZkZpZWxkQ29tcG9uZW50c01hcDtcbiAgcHJpdmF0ZSBfdXBkYXRlZFN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9jZHI6IENoYW5nZURldGVjdG9yUmVmLCBwcml2YXRlIF9jZnI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcikge31cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl91cGRhdGVkU3ViLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9sb2FkQ29tcG9uZW50KCk7XG4gIH1cblxuICBwcml2YXRlIF9sb2FkQ29tcG9uZW50KCk6IHZvaWQge1xuICAgIHRoaXMuX3VwZGF0ZWRTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl91cGRhdGVkU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICAgIGlmICh0aGlzLl9pbnN0YW5jZSA9PSBudWxsIHx8IHRoaXMuZmllbGRIb3N0ID09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB2Y3IgPSB0aGlzLmZpZWxkSG9zdC52aWV3Q29udGFpbmVyUmVmO1xuICAgIHZjci5jbGVhcigpO1xuICAgIGNvbnN0IGNvbXBvbmVudERlZiA9IHRoaXMuY29tcG9uZW50c01hcFt0aGlzLl9pbnN0YW5jZS5ub2RlLmZpZWxkVHlwZV07XG4gICAgaWYgKGNvbXBvbmVudERlZiA9PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGNvbXBvbmVudCA9IGNvbXBvbmVudERlZi5jb21wb25lbnQ7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGNvbXBvbmVudEZhY3RvcnkgPSB0aGlzLl9jZnIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoY29tcG9uZW50KTtcbiAgICAgIGNvbnN0IGNvbXBvbmVudFJlZiA9IHZjci5jcmVhdGVDb21wb25lbnQoY29tcG9uZW50RmFjdG9yeSk7XG4gICAgICB0aGlzLl9jb21wb25lbnRJbnN0YW5jZSA9IGNvbXBvbmVudFJlZi5pbnN0YW5jZTtcbiAgICAgIHRoaXMuX2NvbXBvbmVudEluc3RhbmNlLmluc3RhbmNlID0gdGhpcy5faW5zdGFuY2U7XG4gICAgICB0aGlzLl9jb21wb25lbnRJbnN0YW5jZS5yZWFkb25seSA9IHRoaXMuX3JlYWRvbmx5O1xuXG4gICAgICBpZiAoY29tcG9uZW50RGVmLmlucHV0cykge1xuICAgICAgICBPYmplY3Qua2V5cyhjb21wb25lbnREZWYuaW5wdXRzKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgaWYgKGtleSBpbiB0aGlzLl9jb21wb25lbnRJbnN0YW5jZSkge1xuICAgICAgICAgICAgKHRoaXMuX2NvbXBvbmVudEluc3RhbmNlIGFzIGFueSlba2V5XSA9IGNvbXBvbmVudERlZi5pbnB1dHMhW2tleV07XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX3VwZGF0ZWRTdWIgPSB0aGlzLl9pbnN0YW5jZS51cGRhdGVkRXZ0LnN1YnNjcmliZSgoKSA9PiB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCkpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgIH1cbiAgfVxufVxuIl19