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
        this._init = false;
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
            if (this._init) {
                this._loadComponent();
            }
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
        if (this._init) {
            this._loadComponent();
        }
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
        this._init = true;
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
        const component = this._readonly && componentDef.readOnlyComponent ?
            componentDef.readOnlyComponent :
            componentDef.component;
        try {
            /** @type {?} */
            const componentFactory = this._cfr.resolveComponentFactory(component);
            /** @type {?} */
            const componentRef = vcr.createComponent(componentFactory);
            this._componentInstance = componentRef.instance;
            this._componentInstance.instance = this._instance;
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
     * @private
     */
    AjfFormField.prototype._init;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9mb3Jtcy9maWVsZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCQSxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUM1RCxPQUFPLEVBQ0wsaUJBQWlCLEVBQ2pCLHdCQUF3QixFQUN4QixTQUFTLEVBQ1QsS0FBSyxFQUdMLFNBQVMsRUFDVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBR2xDLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxjQUFjLENBQUM7Ozs7QUFLMUMsTUFBTSxPQUFnQixZQUFZOzs7OztJQW1DaEMsWUFBb0IsSUFBdUIsRUFBVSxJQUE4QjtRQUEvRCxTQUFJLEdBQUosSUFBSSxDQUFtQjtRQUFVLFNBQUksR0FBSixJQUFJLENBQTBCO1FBTDNFLFVBQUssR0FBWSxLQUFLLENBQUM7UUFHdkIsZ0JBQVcsR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDO0lBRTZDLENBQUM7Ozs7SUEvQnZGLElBQUksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDOzs7OztJQUNELElBQ0ksUUFBUSxDQUFDLFFBQTBCO1FBQ3JDLElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxRQUFRLEVBQUU7WUFDL0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7WUFDMUIsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNkLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQzthQUN2QjtTQUNGO0lBQ0gsQ0FBQzs7OztJQUdELElBQUksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDOzs7OztJQUNELElBQ0ksUUFBUSxDQUFDLFFBQWlCO1FBQzVCLElB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LyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge2NvZXJjZUJvb2xlYW5Qcm9wZXJ0eX0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7XG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gIERpcmVjdGl2ZSxcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBWaWV3Q2hpbGRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7QWpmQmFzZUZpZWxkQ29tcG9uZW50fSBmcm9tICcuL2Jhc2UtZmllbGQnO1xuaW1wb3J0IHtBamZGaWVsZEhvc3R9IGZyb20gJy4vZmllbGQtaG9zdCc7XG5pbXBvcnQge0FqZkZpZWxkSW5zdGFuY2V9IGZyb20gJy4vaW50ZXJmYWNlL2ZpZWxkcy1pbnN0YW5jZXMvZmllbGQtaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZGaWVsZENvbXBvbmVudHNNYXB9IGZyb20gJy4vaW50ZXJmYWNlL2ZpZWxkcy9maWVsZC1jb21wb25lbnRzLW1hcCc7XG5cbkBEaXJlY3RpdmUoKVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFqZkZvcm1GaWVsZCBpbXBsZW1lbnRzIE9uRGVzdHJveSwgT25Jbml0IHtcbiAgQFZpZXdDaGlsZChBamZGaWVsZEhvc3QsIHtzdGF0aWM6IHRydWV9KSBmaWVsZEhvc3Q6IEFqZkZpZWxkSG9zdDtcblxuICBwcml2YXRlIF9pbnN0YW5jZTogQWpmRmllbGRJbnN0YW5jZTtcbiAgZ2V0IGluc3RhbmNlKCk6IEFqZkZpZWxkSW5zdGFuY2Uge1xuICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgaW5zdGFuY2UoaW5zdGFuY2U6IEFqZkZpZWxkSW5zdGFuY2UpIHtcbiAgICBpZiAodGhpcy5faW5zdGFuY2UgIT09IGluc3RhbmNlKSB7XG4gICAgICB0aGlzLl9pbnN0YW5jZSA9IGluc3RhbmNlO1xuICAgICAgaWYgKHRoaXMuX2luaXQpIHtcbiAgICAgICAgdGhpcy5fbG9hZENvbXBvbmVudCgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3JlYWRvbmx5OiBib29sZWFuO1xuICBnZXQgcmVhZG9ubHkoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3JlYWRvbmx5O1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCByZWFkb25seShyZWFkb25seTogYm9vbGVhbikge1xuICAgIHRoaXMuX3JlYWRvbmx5ID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHJlYWRvbmx5KTtcbiAgICBpZiAodGhpcy5faW5pdCkge1xuICAgICAgdGhpcy5fbG9hZENvbXBvbmVudCgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2NvbXBvbmVudEluc3RhbmNlOiBBamZCYXNlRmllbGRDb21wb25lbnQ8QWpmRmllbGRJbnN0YW5jZT47XG4gIHByaXZhdGUgX2luaXQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBwcm90ZWN0ZWQgYWJzdHJhY3QgY29tcG9uZW50c01hcDogQWpmRmllbGRDb21wb25lbnRzTWFwO1xuICBwcml2YXRlIF91cGRhdGVkU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2NkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsIHByaXZhdGUgX2NmcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyKSB7fVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuX3VwZGF0ZWRTdWIudW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuX2luaXQgPSB0cnVlO1xuICAgIHRoaXMuX2xvYWRDb21wb25lbnQoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2xvYWRDb21wb25lbnQoKTogdm9pZCB7XG4gICAgdGhpcy5fdXBkYXRlZFN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX3VwZGF0ZWRTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gICAgaWYgKHRoaXMuX2luc3RhbmNlID09IG51bGwgfHwgdGhpcy5maWVsZEhvc3QgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHZjciA9IHRoaXMuZmllbGRIb3N0LnZpZXdDb250YWluZXJSZWY7XG4gICAgdmNyLmNsZWFyKCk7XG4gICAgY29uc3QgY29tcG9uZW50RGVmID0gdGhpcy5jb21wb25lbnRzTWFwW3RoaXMuX2luc3RhbmNlLm5vZGUuZmllbGRUeXBlXTtcbiAgICBpZiAoY29tcG9uZW50RGVmID09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgY29tcG9uZW50ID0gdGhpcy5fcmVhZG9ubHkgJiYgY29tcG9uZW50RGVmLnJlYWRPbmx5Q29tcG9uZW50ID9cbiAgICAgICAgY29tcG9uZW50RGVmLnJlYWRPbmx5Q29tcG9uZW50IDpcbiAgICAgICAgY29tcG9uZW50RGVmLmNvbXBvbmVudDtcbiAgICB0cnkge1xuICAgICAgY29uc3QgY29tcG9uZW50RmFjdG9yeSA9IHRoaXMuX2Nmci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShjb21wb25lbnQpO1xuICAgICAgY29uc3QgY29tcG9uZW50UmVmID0gdmNyLmNyZWF0ZUNvbXBvbmVudChjb21wb25lbnRGYWN0b3J5KTtcbiAgICAgIHRoaXMuX2NvbXBvbmVudEluc3RhbmNlID0gY29tcG9uZW50UmVmLmluc3RhbmNlO1xuICAgICAgdGhpcy5fY29tcG9uZW50SW5zdGFuY2UuaW5zdGFuY2UgPSB0aGlzLl9pbnN0YW5jZTtcblxuICAgICAgaWYgKGNvbXBvbmVudERlZi5pbnB1dHMpIHtcbiAgICAgICAgT2JqZWN0LmtleXMoY29tcG9uZW50RGVmLmlucHV0cykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAgIGlmIChrZXkgaW4gdGhpcy5fY29tcG9uZW50SW5zdGFuY2UpIHtcbiAgICAgICAgICAgICh0aGlzLl9jb21wb25lbnRJbnN0YW5jZSBhcyBhbnkpW2tleV0gPSBjb21wb25lbnREZWYuaW5wdXRzIVtrZXldO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICB0aGlzLl91cGRhdGVkU3ViID0gdGhpcy5faW5zdGFuY2UudXBkYXRlZEV2dC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==