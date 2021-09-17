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
 * It is a base wrapper of every ajfField.
 * It manages what type of component to load(editable component or readonly component)
 * by input instance.
 *
 * @export
 * @abstract
 * @class AjfFormField
 */
export class AjfFormField {
    constructor(_cdr, _cfr) {
        this._cdr = _cdr;
        this._cfr = _cfr;
        this._init = false;
        this._updatedSub = Subscription.EMPTY;
    }
    get instance() {
        return this._instance;
    }
    set instance(instance) {
        if (this._instance !== instance) {
            this._instance = instance;
            if (this._instance.node && !this._instance.node.editable) {
                this._readonly = true;
            }
            if (this._init) {
                this._loadComponent();
            }
        }
    }
    get readonly() {
        return this._readonly;
    }
    set readonly(readonly) {
        this._readonly = coerceBooleanProperty(readonly);
        if (!this._readonly && this._instance.node && !this._instance.node.editable) {
            this._readonly = true;
        }
        if (this._init) {
            this._loadComponent();
        }
    }
    ngOnDestroy() {
        this._updatedSub.unsubscribe();
    }
    ngOnInit() {
        this._init = true;
        this._loadComponent();
    }
    /**
     * It builds a new AjfField component by fieldType and binds it to the fieldHost.
     *
     * @private
     * @return {*}
     */
    _loadComponent() {
        this._updatedSub.unsubscribe();
        this._updatedSub = Subscription.EMPTY;
        if (this._instance == null || this.fieldHost == null) {
            return;
        }
        const vcr = this.fieldHost.viewContainerRef;
        vcr.clear();
        const componentDef = this.componentsMap[this._instance.node.fieldType];
        if (componentDef == null) {
            return;
        }
        const component = this._readonly && componentDef.readOnlyComponent ?
            componentDef.readOnlyComponent :
            componentDef.component;
        try {
            const componentFactory = this._cfr.resolveComponentFactory(component);
            const componentRef = vcr.createComponent(componentFactory);
            this._componentInstance = componentRef.instance;
            this._componentInstance.instance = this._instance;
            if (componentDef.inputs) {
                Object.keys(componentDef.inputs).forEach(key => {
                    if (key in this._componentInstance) {
                        this._componentInstance[key] = componentDef.inputs[key];
                    }
                });
            }
            this._instance.updatedEvt.subscribe(() => this._cdr.markForCheck());
        }
        catch (e) {
            console.log(e);
        }
    }
}
AjfFormField.decorators = [
    { type: Directive }
];
AjfFormField.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ComponentFactoryResolver }
];
AjfFormField.propDecorators = {
    fieldHost: [{ type: ViewChild, args: [AjfFieldHost, { static: true },] }],
    instance: [{ type: Input }],
    readonly: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9mb3Jtcy9maWVsZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUM1RCxPQUFPLEVBQ0wsaUJBQWlCLEVBQ2pCLHdCQUF3QixFQUN4QixTQUFTLEVBQ1QsS0FBSyxFQUdMLFNBQVMsRUFDVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBR2xDLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFJMUM7Ozs7Ozs7O0dBUUc7QUFFSCxNQUFNLE9BQWdCLFlBQVk7SUE4Q2hDLFlBQW9CLElBQXVCLEVBQVUsSUFBOEI7UUFBL0QsU0FBSSxHQUFKLElBQUksQ0FBbUI7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUEwQjtRQUwzRSxVQUFLLEdBQVksS0FBSyxDQUFDO1FBR3ZCLGdCQUFXLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQztJQUU2QyxDQUFDO0lBMUN2RixJQUFJLFFBQVE7UUFDVixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDeEIsQ0FBQztJQUNELElBQ0ksUUFBUSxDQUFDLFFBQTBCO1FBQ3JDLElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxRQUFRLEVBQUU7WUFDL0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7WUFDMUIsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDeEQsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7YUFDdkI7WUFDRCxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ2QsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO2FBQ3ZCO1NBQ0Y7SUFDSCxDQUFDO0lBUUQsSUFBSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3hCLENBQUM7SUFDRCxJQUNJLFFBQVEsQ0FBQyxRQUFpQjtRQUM1QixJQUFJLENBQUMsU0FBUyxHQUFHLHFCQUFxQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQzNFLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1NBQ3ZCO1FBQ0QsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ2QsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1NBQ3ZCO0lBQ0gsQ0FBQztJQVVELFdBQVc7UUFDVCxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ2pDLENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDbEIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNLLGNBQWM7UUFDcEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUMvQixJQUFJLENBQUMsV0FBVyxHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUM7UUFDdEMsSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksRUFBRTtZQUNwRCxPQUFPO1NBQ1I7UUFFRCxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDO1FBQzVDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNaLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdkUsSUFBSSxZQUFZLElBQUksSUFBSSxFQUFFO1lBQ3hCLE9BQU87U0FDUjtRQUNELE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLElBQUksWUFBWSxDQUFDLGlCQUFpQixDQUFDLENBQUM7WUFDaEUsWUFBWSxDQUFDLGlCQUFpQixDQUFDLENBQUM7WUFDaEMsWUFBWSxDQUFDLFNBQVMsQ0FBQztRQUMzQixJQUFJO1lBQ0YsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3RFLE1BQU0sWUFBWSxHQUFHLEdBQUcsQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUMzRCxJQUFJLENBQUMsa0JBQWtCLEdBQUcsWUFBWSxDQUFDLFFBQVEsQ0FBQztZQUNoRCxJQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7WUFFbEQsSUFBSSxZQUFZLENBQUMsTUFBTSxFQUFFO2dCQUN2QixNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUU7b0JBQzdDLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxrQkFBa0IsRUFBRTt3QkFDakMsSUFBSSxDQUFDLGtCQUEwQixDQUFDLEdBQUcsQ0FBQyxHQUFHLFlBQVksQ0FBQyxNQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7cUJBQ25FO2dCQUNILENBQUMsQ0FBQyxDQUFDO2FBQ0o7WUFDRCxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDO1NBQ3JFO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDVixPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2hCO0lBQ0gsQ0FBQzs7O1lBakdGLFNBQVM7OztZQXhCUixpQkFBaUI7WUFDakIsd0JBQXdCOzs7d0JBeUJ2QixTQUFTLFNBQUMsWUFBWSxFQUFFLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBQzt1QkFNdEMsS0FBSzt1QkFzQkwsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtjb2VyY2VCb29sZWFuUHJvcGVydHl9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICBEaXJlY3RpdmUsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgVmlld0NoaWxkXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQge0FqZkJhc2VGaWVsZENvbXBvbmVudH0gZnJvbSAnLi9iYXNlLWZpZWxkJztcbmltcG9ydCB7QWpmRmllbGRIb3N0fSBmcm9tICcuL2ZpZWxkLWhvc3QnO1xuaW1wb3J0IHtBamZGaWVsZEluc3RhbmNlfSBmcm9tICcuL2ludGVyZmFjZS9maWVsZHMtaW5zdGFuY2VzL2ZpZWxkLWluc3RhbmNlJztcbmltcG9ydCB7QWpmRmllbGRDb21wb25lbnRzTWFwfSBmcm9tICcuL2ludGVyZmFjZS9maWVsZHMvZmllbGQtY29tcG9uZW50cy1tYXAnO1xuXG4vKipcbiAqIEl0IGlzIGEgYmFzZSB3cmFwcGVyIG9mIGV2ZXJ5IGFqZkZpZWxkLlxuICogSXQgbWFuYWdlcyB3aGF0IHR5cGUgb2YgY29tcG9uZW50IHRvIGxvYWQoZWRpdGFibGUgY29tcG9uZW50IG9yIHJlYWRvbmx5IGNvbXBvbmVudClcbiAqIGJ5IGlucHV0IGluc3RhbmNlLlxuICpcbiAqIEBleHBvcnRcbiAqIEBhYnN0cmFjdFxuICogQGNsYXNzIEFqZkZvcm1GaWVsZFxuICovXG5ARGlyZWN0aXZlKClcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBamZGb3JtRmllbGQgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIE9uSW5pdCB7XG4gIEBWaWV3Q2hpbGQoQWpmRmllbGRIb3N0LCB7c3RhdGljOiB0cnVlfSkgZmllbGRIb3N0OiBBamZGaWVsZEhvc3Q7XG5cbiAgcHJpdmF0ZSBfaW5zdGFuY2U6IEFqZkZpZWxkSW5zdGFuY2U7XG4gIGdldCBpbnN0YW5jZSgpOiBBamZGaWVsZEluc3RhbmNlIHtcbiAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IGluc3RhbmNlKGluc3RhbmNlOiBBamZGaWVsZEluc3RhbmNlKSB7XG4gICAgaWYgKHRoaXMuX2luc3RhbmNlICE9PSBpbnN0YW5jZSkge1xuICAgICAgdGhpcy5faW5zdGFuY2UgPSBpbnN0YW5jZTtcbiAgICAgIGlmICh0aGlzLl9pbnN0YW5jZS5ub2RlICYmICF0aGlzLl9pbnN0YW5jZS5ub2RlLmVkaXRhYmxlKSB7XG4gICAgICAgIHRoaXMuX3JlYWRvbmx5ID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLl9pbml0KSB7XG4gICAgICAgIHRoaXMuX2xvYWRDb21wb25lbnQoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogaWYgdHJ1ZSBtZWFuIHRoYXQgY29tcG9uZW50IG5lZWQgdG8gYmUgYSByZWFkb25seSBjb21wb25lbnRcbiAgICpcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHByaXZhdGUgX3JlYWRvbmx5OiBib29sZWFuO1xuICBnZXQgcmVhZG9ubHkoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3JlYWRvbmx5O1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCByZWFkb25seShyZWFkb25seTogYm9vbGVhbikge1xuICAgIHRoaXMuX3JlYWRvbmx5ID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHJlYWRvbmx5KTtcbiAgICBpZiAoIXRoaXMuX3JlYWRvbmx5ICYmIHRoaXMuX2luc3RhbmNlLm5vZGUgJiYgIXRoaXMuX2luc3RhbmNlLm5vZGUuZWRpdGFibGUpIHtcbiAgICAgIHRoaXMuX3JlYWRvbmx5ID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKHRoaXMuX2luaXQpIHtcbiAgICAgIHRoaXMuX2xvYWRDb21wb25lbnQoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9jb21wb25lbnRJbnN0YW5jZTogQWpmQmFzZUZpZWxkQ29tcG9uZW50PEFqZkZpZWxkSW5zdGFuY2U+O1xuICBwcml2YXRlIF9pbml0OiBib29sZWFuID0gZmFsc2U7XG5cbiAgcHJvdGVjdGVkIGFic3RyYWN0IGNvbXBvbmVudHNNYXA6IEFqZkZpZWxkQ29tcG9uZW50c01hcDtcbiAgcHJpdmF0ZSBfdXBkYXRlZFN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9jZHI6IENoYW5nZURldGVjdG9yUmVmLCBwcml2YXRlIF9jZnI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcikge31cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl91cGRhdGVkU3ViLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9pbml0ID0gdHJ1ZTtcbiAgICB0aGlzLl9sb2FkQ29tcG9uZW50KCk7XG4gIH1cblxuICAvKipcbiAgICogSXQgYnVpbGRzIGEgbmV3IEFqZkZpZWxkIGNvbXBvbmVudCBieSBmaWVsZFR5cGUgYW5kIGJpbmRzIGl0IHRvIHRoZSBmaWVsZEhvc3QuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEByZXR1cm4geyp9XG4gICAqL1xuICBwcml2YXRlIF9sb2FkQ29tcG9uZW50KCk6IHZvaWQge1xuICAgIHRoaXMuX3VwZGF0ZWRTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl91cGRhdGVkU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICAgIGlmICh0aGlzLl9pbnN0YW5jZSA9PSBudWxsIHx8IHRoaXMuZmllbGRIb3N0ID09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB2Y3IgPSB0aGlzLmZpZWxkSG9zdC52aWV3Q29udGFpbmVyUmVmO1xuICAgIHZjci5jbGVhcigpO1xuICAgIGNvbnN0IGNvbXBvbmVudERlZiA9IHRoaXMuY29tcG9uZW50c01hcFt0aGlzLl9pbnN0YW5jZS5ub2RlLmZpZWxkVHlwZV07XG4gICAgaWYgKGNvbXBvbmVudERlZiA9PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGNvbXBvbmVudCA9IHRoaXMuX3JlYWRvbmx5ICYmIGNvbXBvbmVudERlZi5yZWFkT25seUNvbXBvbmVudCA/XG4gICAgICAgIGNvbXBvbmVudERlZi5yZWFkT25seUNvbXBvbmVudCA6XG4gICAgICAgIGNvbXBvbmVudERlZi5jb21wb25lbnQ7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGNvbXBvbmVudEZhY3RvcnkgPSB0aGlzLl9jZnIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoY29tcG9uZW50KTtcbiAgICAgIGNvbnN0IGNvbXBvbmVudFJlZiA9IHZjci5jcmVhdGVDb21wb25lbnQoY29tcG9uZW50RmFjdG9yeSk7XG4gICAgICB0aGlzLl9jb21wb25lbnRJbnN0YW5jZSA9IGNvbXBvbmVudFJlZi5pbnN0YW5jZTtcbiAgICAgIHRoaXMuX2NvbXBvbmVudEluc3RhbmNlLmluc3RhbmNlID0gdGhpcy5faW5zdGFuY2U7XG5cbiAgICAgIGlmIChjb21wb25lbnREZWYuaW5wdXRzKSB7XG4gICAgICAgIE9iamVjdC5rZXlzKGNvbXBvbmVudERlZi5pbnB1dHMpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgICBpZiAoa2V5IGluIHRoaXMuX2NvbXBvbmVudEluc3RhbmNlKSB7XG4gICAgICAgICAgICAodGhpcy5fY29tcG9uZW50SW5zdGFuY2UgYXMgYW55KVtrZXldID0gY29tcG9uZW50RGVmLmlucHV0cyFba2V5XTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgdGhpcy5faW5zdGFuY2UudXBkYXRlZEV2dC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==