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
    get instance() { return this._instance; }
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
    get readonly() { return this._readonly; }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9mb3Jtcy9maWVsZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCQSxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUM1RCxPQUFPLEVBQUMsaUJBQWlCLEVBQUUsd0JBQXdCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFDbkUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2xDLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFLbEMsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGNBQWMsQ0FBQzs7OztBQUcxQyxNQUFNLE9BQWdCLFlBQVk7Ozs7O0lBMkJoQyxZQUNVLElBQXVCLEVBQ3ZCLElBQThCO1FBRDlCLFNBQUksR0FBSixJQUFJLENBQW1CO1FBQ3ZCLFNBQUksR0FBSixJQUFJLENBQTBCO1FBSmhDLGdCQUFXLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQztJQUtyQyxDQUFDOzs7O0lBMUJMLElBQUksUUFBUSxLQUF1QixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDOzs7OztJQUMzRCxJQUFhLFFBQVEsQ0FBQyxRQUEwQjtRQUM5QyxJQUFJLElBQUksQ0FBQyxTQUFTLEtBQUssUUFBUSxFQUFFO1lBQy9CLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO1lBQzFCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztTQUN2QjtJQUNILENBQUM7Ozs7SUFHRCxJQUFJLFFBQVEsS0FBYyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDOzs7OztJQUNsRCxJQUFhLFFBQVEsQ0FBQyxRQUFpQjtRQUNyQyxJQUFJLENBQUMsU0FBUyxHQUFHLHFCQUFxQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2pELElBQUksSUFBSSxDQUFDLGtCQUFrQixJQUFJLElBQUksRUFBRTtZQUNuQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7U0FDbkQ7UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzNCLENBQUM7Ozs7SUFZRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNqQyxDQUFDOzs7O0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUN4QixDQUFDOzs7OztJQUVPLGNBQWM7UUFDcEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUMvQixJQUFJLENBQUMsV0FBVyxHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUM7UUFDdEMsSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksRUFBRTtZQUFFLE9BQU87U0FBRTs7Y0FFM0QsR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsZ0JBQWdCO1FBQzNDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQzs7Y0FDTixZQUFZLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDdEUsSUFBSSxZQUFZLElBQUksSUFBSSxFQUFFO1lBQUUsT0FBTztTQUFFOztjQUMvQixTQUFTLEdBQUcsWUFBWSxDQUFDLFNBQVM7UUFDeEMsSUFBSTs7a0JBQ0ksZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxTQUFTLENBQUM7O2tCQUMvRCxZQUFZLEdBQUcsR0FBRyxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQztZQUMxRCxJQUFJLENBQUMsa0JBQWtCLEdBQUcsWUFBWSxDQUFDLFFBQVEsQ0FBQztZQUNoRCxJQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7WUFDbEQsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBRWxELElBQUksWUFBWSxDQUFDLE1BQU0sRUFBRTtnQkFDdkIsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTzs7OztnQkFBQyxHQUFHLENBQUMsRUFBRTtvQkFDN0MsSUFBSSxHQUFHLElBQUssSUFBSSxDQUFDLGtCQUFrQixFQUFFO3dCQUNuQyxDQUFFLG1CQUFBLElBQUksQ0FBQyxrQkFBa0IsRUFBTyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsbUJBQUEsWUFBWSxDQUFDLE1BQU0sRUFBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3FCQUNwRTtnQkFDSCxDQUFDLEVBQUMsQ0FBQzthQUNKO1lBQ0QsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxTQUFTOzs7WUFBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxFQUFDLENBQUM7U0FDeEY7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDaEI7SUFDSCxDQUFDOzs7WUFyRUYsU0FBUzs7OztZQVRGLGlCQUFpQjtZQUFFLHdCQUF3Qjs7O3dCQVdoRCxTQUFTLFNBQUMsWUFBWSxFQUFFLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBQzt1QkFJdEMsS0FBSzt1QkFTTCxLQUFLOzs7O0lBYk4saUNBQWlFOzs7OztJQUVqRSxpQ0FBb0M7Ozs7O0lBU3BDLGlDQUEyQjs7Ozs7SUFVM0IsMENBQW9FOzs7OztJQUVwRSxxQ0FBd0Q7Ozs7O0lBQ3hELG1DQUF5Qzs7Ozs7SUFHdkMsNEJBQStCOzs7OztJQUMvQiw0QkFBc0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7Y29lcmNlQm9vbGVhblByb3BlcnR5fSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBEaXJlY3RpdmUsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCxcbiAgVmlld0NoaWxkfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7U3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHtBamZCYXNlRmllbGRDb21wb25lbnR9IGZyb20gJy4vYmFzZS1maWVsZCc7XG5pbXBvcnQge0FqZkZpZWxkQ29tcG9uZW50c01hcH0gZnJvbSAnLi9pbnRlcmZhY2UvZmllbGRzL2ZpZWxkLWNvbXBvbmVudHMtbWFwJztcbmltcG9ydCB7QWpmRmllbGRJbnN0YW5jZX0gZnJvbSAnLi9pbnRlcmZhY2UvZmllbGRzLWluc3RhbmNlcy9maWVsZC1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZkZpZWxkSG9zdH0gZnJvbSAnLi9maWVsZC1ob3N0JztcblxuQERpcmVjdGl2ZSgpXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQWpmRm9ybUZpZWxkIGltcGxlbWVudHMgT25EZXN0cm95LCBPbkluaXQge1xuICBAVmlld0NoaWxkKEFqZkZpZWxkSG9zdCwge3N0YXRpYzogdHJ1ZX0pIGZpZWxkSG9zdDogQWpmRmllbGRIb3N0O1xuXG4gIHByaXZhdGUgX2luc3RhbmNlOiBBamZGaWVsZEluc3RhbmNlO1xuICBnZXQgaW5zdGFuY2UoKTogQWpmRmllbGRJbnN0YW5jZSB7IHJldHVybiB0aGlzLl9pbnN0YW5jZTsgfVxuICBASW5wdXQoKSBzZXQgaW5zdGFuY2UoaW5zdGFuY2U6IEFqZkZpZWxkSW5zdGFuY2UpIHtcbiAgICBpZiAodGhpcy5faW5zdGFuY2UgIT09IGluc3RhbmNlKSB7XG4gICAgICB0aGlzLl9pbnN0YW5jZSA9IGluc3RhbmNlO1xuICAgICAgdGhpcy5fbG9hZENvbXBvbmVudCgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3JlYWRvbmx5OiBib29sZWFuO1xuICBnZXQgcmVhZG9ubHkoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9yZWFkb25seTsgfVxuICBASW5wdXQoKSBzZXQgcmVhZG9ubHkocmVhZG9ubHk6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9yZWFkb25seSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eShyZWFkb25seSk7XG4gICAgaWYgKHRoaXMuX2NvbXBvbmVudEluc3RhbmNlICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX2NvbXBvbmVudEluc3RhbmNlLnJlYWRvbmx5ID0gdGhpcy5fcmVhZG9ubHk7XG4gICAgfVxuICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgX2NvbXBvbmVudEluc3RhbmNlOiBBamZCYXNlRmllbGRDb21wb25lbnQ8QWpmRmllbGRJbnN0YW5jZT47XG5cbiAgcHJvdGVjdGVkIGFic3RyYWN0IGNvbXBvbmVudHNNYXA6IEFqZkZpZWxkQ29tcG9uZW50c01hcDtcbiAgcHJpdmF0ZSBfdXBkYXRlZFN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIF9jZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByaXZhdGUgX2NmcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyXG4gICkgeyB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5fdXBkYXRlZFN1Yi51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fbG9hZENvbXBvbmVudCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfbG9hZENvbXBvbmVudCgpOiB2b2lkIHtcbiAgICB0aGlzLl91cGRhdGVkU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fdXBkYXRlZFN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgICBpZiAodGhpcy5faW5zdGFuY2UgPT0gbnVsbCB8fCB0aGlzLmZpZWxkSG9zdCA9PSBudWxsKSB7IHJldHVybjsgfVxuXG4gICAgY29uc3QgdmNyID0gdGhpcy5maWVsZEhvc3Qudmlld0NvbnRhaW5lclJlZjtcbiAgICB2Y3IuY2xlYXIoKTtcbiAgICBjb25zdCBjb21wb25lbnREZWYgPSB0aGlzLmNvbXBvbmVudHNNYXBbdGhpcy5faW5zdGFuY2Uubm9kZS5maWVsZFR5cGVdO1xuICAgIGlmIChjb21wb25lbnREZWYgPT0gbnVsbCkgeyByZXR1cm47IH1cbiAgICBjb25zdCBjb21wb25lbnQgPSBjb21wb25lbnREZWYuY29tcG9uZW50O1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBjb21wb25lbnRGYWN0b3J5ID0gdGhpcy5fY2ZyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KGNvbXBvbmVudCk7XG4gICAgICBjb25zdCBjb21wb25lbnRSZWYgPSB2Y3IuY3JlYXRlQ29tcG9uZW50KGNvbXBvbmVudEZhY3RvcnkpO1xuICAgICAgdGhpcy5fY29tcG9uZW50SW5zdGFuY2UgPSBjb21wb25lbnRSZWYuaW5zdGFuY2U7XG4gICAgICB0aGlzLl9jb21wb25lbnRJbnN0YW5jZS5pbnN0YW5jZSA9IHRoaXMuX2luc3RhbmNlO1xuICAgICAgdGhpcy5fY29tcG9uZW50SW5zdGFuY2UucmVhZG9ubHkgPSB0aGlzLl9yZWFkb25seTtcblxuICAgICAgaWYgKGNvbXBvbmVudERlZi5pbnB1dHMpIHtcbiAgICAgICAgT2JqZWN0LmtleXMoY29tcG9uZW50RGVmLmlucHV0cykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAgIGlmIChrZXkgaW4gIHRoaXMuX2NvbXBvbmVudEluc3RhbmNlKSB7XG4gICAgICAgICAgICAoIHRoaXMuX2NvbXBvbmVudEluc3RhbmNlIGFzIGFueSlba2V5XSA9IGNvbXBvbmVudERlZi5pbnB1dHMhW2tleV07XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX3VwZGF0ZWRTdWIgPSB0aGlzLl9pbnN0YW5jZS51cGRhdGVkRXZ0LnN1YnNjcmliZSgoKSA9PiB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCkpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgIH1cbiAgfVxufVxuIl19