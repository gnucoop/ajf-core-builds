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
import { Directive, Input, ViewChild, } from '@angular/core';
import { Subscription } from 'rxjs';
import { AjfFieldHost } from './field-host';
import * as i0 from "@angular/core";
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
        /**
         * if true mean that component need to be a readonly component
         *
         * @private
         */
        this._readonly = false;
        this._init = false;
        this._updatedSub = Subscription.EMPTY;
    }
    get instance() {
        return this._instance;
    }
    set instance(instance) {
        if (this._instance !== instance) {
            this._instance = instance;
            if (this._instance != null && this._instance.node && !this._instance.node.editable) {
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
        if (!this._readonly &&
            this._instance != null &&
            this._instance.node &&
            !this._instance.node.editable) {
            this._readonly = true;
        }
        if (this._init) {
            this._loadComponent();
        }
    }
    ngAfterViewInit() {
        this._loadComponent();
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
        const component = this._readonly && componentDef.readOnlyComponent
            ? componentDef.readOnlyComponent
            : componentDef.component;
        try {
            const componentFactory = this._cfr.resolveComponentFactory(component);
            const componentRef = vcr.createComponent(componentFactory);
            this._componentInstance = componentRef.instance;
            this._componentInstance.instance = this._instance;
            const componentInstance = this._componentInstance;
            if (componentDef.inputs) {
                Object.keys(componentDef.inputs).forEach(key => {
                    if (key in componentInstance) {
                        componentInstance[key] = componentDef.inputs[key];
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
AjfFormField.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfFormField, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ComponentFactoryResolver }], target: i0.ɵɵFactoryTarget.Directive });
AjfFormField.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.2.5", type: AjfFormField, inputs: { instance: "instance", readonly: "readonly" }, viewQueries: [{ propertyName: "fieldHost", first: true, predicate: AjfFieldHost, descendants: true }], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfFormField, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ComponentFactoryResolver }]; }, propDecorators: { fieldHost: [{
                type: ViewChild,
                args: [AjfFieldHost]
            }], instance: [{
                type: Input
            }], readonly: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL2Zvcm1zL3NyYy9maWVsZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUM1RCxPQUFPLEVBSUwsU0FBUyxFQUNULEtBQUssRUFHTCxTQUFTLEdBQ1YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUdsQyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sY0FBYyxDQUFDOztBQUkxQzs7Ozs7Ozs7R0FRRztBQUVILE1BQU0sT0FBZ0IsWUFBWTtJQW1EaEMsWUFBb0IsSUFBdUIsRUFBVSxJQUE4QjtRQUEvRCxTQUFJLEdBQUosSUFBSSxDQUFtQjtRQUFVLFNBQUksR0FBSixJQUFJLENBQTBCO1FBL0JuRjs7OztXQUlHO1FBQ0ssY0FBUyxHQUFZLEtBQUssQ0FBQztRQXFCM0IsVUFBSyxHQUFZLEtBQUssQ0FBQztRQUd2QixnQkFBVyxHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUM7SUFFNkMsQ0FBQztJQS9DdkYsSUFBSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3hCLENBQUM7SUFDRCxJQUNJLFFBQVEsQ0FBQyxRQUFzQztRQUNqRCxJQUFJLElBQUksQ0FBQyxTQUFTLEtBQUssUUFBUSxFQUFFO1lBQy9CLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO1lBQzFCLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQ2xGLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO2FBQ3ZCO1lBQ0QsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNkLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQzthQUN2QjtTQUNGO0lBQ0gsQ0FBQztJQVFELElBQUksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDO0lBQ0QsSUFDSSxRQUFRLENBQUMsUUFBaUI7UUFDNUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxxQkFBcUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNqRCxJQUNFLENBQUMsSUFBSSxDQUFDLFNBQVM7WUFDZixJQUFJLENBQUMsU0FBUyxJQUFJLElBQUk7WUFDdEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJO1lBQ25CLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUM3QjtZQUNBLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1NBQ3ZCO1FBQ0QsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ2QsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1NBQ3ZCO0lBQ0gsQ0FBQztJQVVELGVBQWU7UUFDYixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ2pDLENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDbEIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNLLGNBQWM7UUFDcEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUMvQixJQUFJLENBQUMsV0FBVyxHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUM7UUFDdEMsSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksRUFBRTtZQUNwRCxPQUFPO1NBQ1I7UUFFRCxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDO1FBQzVDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNaLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdkUsSUFBSSxZQUFZLElBQUksSUFBSSxFQUFFO1lBQ3hCLE9BQU87U0FDUjtRQUNELE1BQU0sU0FBUyxHQUNiLElBQUksQ0FBQyxTQUFTLElBQUksWUFBWSxDQUFDLGlCQUFpQjtZQUM5QyxDQUFDLENBQUMsWUFBWSxDQUFDLGlCQUFpQjtZQUNoQyxDQUFDLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQztRQUM3QixJQUFJO1lBQ0YsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3RFLE1BQU0sWUFBWSxHQUFHLEdBQUcsQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUMzRCxJQUFJLENBQUMsa0JBQWtCLEdBQUcsWUFBWSxDQUFDLFFBQVEsQ0FBQztZQUNoRCxJQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7WUFDbEQsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLENBQUMsa0JBQXlCLENBQUM7WUFFekQsSUFBSSxZQUFZLENBQUMsTUFBTSxFQUFFO2dCQUN2QixNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUU7b0JBQzdDLElBQUksR0FBRyxJQUFJLGlCQUFpQixFQUFFO3dCQUM1QixpQkFBaUIsQ0FBQyxHQUFHLENBQUMsR0FBRyxZQUFZLENBQUMsTUFBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3FCQUNwRDtnQkFDSCxDQUFDLENBQUMsQ0FBQzthQUNKO1lBQ0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQztTQUNyRTtRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNoQjtJQUNILENBQUM7O3lHQTNHbUIsWUFBWTs2RkFBWixZQUFZLDZIQUNyQixZQUFZOzJGQURILFlBQVk7a0JBRGpDLFNBQVM7K0lBRWlCLFNBQVM7c0JBQWpDLFNBQVM7dUJBQUMsWUFBWTtnQkFPbkIsUUFBUTtzQkFEWCxLQUFLO2dCQXVCRixRQUFRO3NCQURYLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7Y29lcmNlQm9vbGVhblByb3BlcnR5fSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgRGlyZWN0aXZlLFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIFZpZXdDaGlsZCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7QWpmQmFzZUZpZWxkQ29tcG9uZW50fSBmcm9tICcuL2Jhc2UtZmllbGQnO1xuaW1wb3J0IHtBamZGaWVsZEhvc3R9IGZyb20gJy4vZmllbGQtaG9zdCc7XG5pbXBvcnQge0FqZkZpZWxkSW5zdGFuY2V9IGZyb20gJy4vaW50ZXJmYWNlL2ZpZWxkcy1pbnN0YW5jZXMvZmllbGQtaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZGaWVsZENvbXBvbmVudHNNYXB9IGZyb20gJy4vaW50ZXJmYWNlL2ZpZWxkcy9maWVsZC1jb21wb25lbnRzLW1hcCc7XG5cbi8qKlxuICogSXQgaXMgYSBiYXNlIHdyYXBwZXIgb2YgZXZlcnkgYWpmRmllbGQuXG4gKiBJdCBtYW5hZ2VzIHdoYXQgdHlwZSBvZiBjb21wb25lbnQgdG8gbG9hZChlZGl0YWJsZSBjb21wb25lbnQgb3IgcmVhZG9ubHkgY29tcG9uZW50KVxuICogYnkgaW5wdXQgaW5zdGFuY2UuXG4gKlxuICogQGV4cG9ydFxuICogQGFic3RyYWN0XG4gKiBAY2xhc3MgQWpmRm9ybUZpZWxkXG4gKi9cbkBEaXJlY3RpdmUoKVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFqZkZvcm1GaWVsZCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSwgT25Jbml0IHtcbiAgQFZpZXdDaGlsZChBamZGaWVsZEhvc3QpIGZpZWxkSG9zdCE6IEFqZkZpZWxkSG9zdDtcblxuICBwcml2YXRlIF9pbnN0YW5jZTogQWpmRmllbGRJbnN0YW5jZSB8IHVuZGVmaW5lZDtcbiAgZ2V0IGluc3RhbmNlKCk6IEFqZkZpZWxkSW5zdGFuY2UgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgaW5zdGFuY2UoaW5zdGFuY2U6IEFqZkZpZWxkSW5zdGFuY2UgfCB1bmRlZmluZWQpIHtcbiAgICBpZiAodGhpcy5faW5zdGFuY2UgIT09IGluc3RhbmNlKSB7XG4gICAgICB0aGlzLl9pbnN0YW5jZSA9IGluc3RhbmNlO1xuICAgICAgaWYgKHRoaXMuX2luc3RhbmNlICE9IG51bGwgJiYgdGhpcy5faW5zdGFuY2Uubm9kZSAmJiAhdGhpcy5faW5zdGFuY2Uubm9kZS5lZGl0YWJsZSkge1xuICAgICAgICB0aGlzLl9yZWFkb25seSA9IHRydWU7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5faW5pdCkge1xuICAgICAgICB0aGlzLl9sb2FkQ29tcG9uZW50KCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIGlmIHRydWUgbWVhbiB0aGF0IGNvbXBvbmVudCBuZWVkIHRvIGJlIGEgcmVhZG9ubHkgY29tcG9uZW50XG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBwcml2YXRlIF9yZWFkb25seTogYm9vbGVhbiA9IGZhbHNlO1xuICBnZXQgcmVhZG9ubHkoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3JlYWRvbmx5O1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCByZWFkb25seShyZWFkb25seTogYm9vbGVhbikge1xuICAgIHRoaXMuX3JlYWRvbmx5ID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHJlYWRvbmx5KTtcbiAgICBpZiAoXG4gICAgICAhdGhpcy5fcmVhZG9ubHkgJiZcbiAgICAgIHRoaXMuX2luc3RhbmNlICE9IG51bGwgJiZcbiAgICAgIHRoaXMuX2luc3RhbmNlLm5vZGUgJiZcbiAgICAgICF0aGlzLl9pbnN0YW5jZS5ub2RlLmVkaXRhYmxlXG4gICAgKSB7XG4gICAgICB0aGlzLl9yZWFkb25seSA9IHRydWU7XG4gICAgfVxuICAgIGlmICh0aGlzLl9pbml0KSB7XG4gICAgICB0aGlzLl9sb2FkQ29tcG9uZW50KCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfY29tcG9uZW50SW5zdGFuY2U6IEFqZkJhc2VGaWVsZENvbXBvbmVudDxBamZGaWVsZEluc3RhbmNlPiB8IHVuZGVmaW5lZDtcbiAgcHJpdmF0ZSBfaW5pdDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIHByb3RlY3RlZCBhYnN0cmFjdCBjb21wb25lbnRzTWFwOiBBamZGaWVsZENvbXBvbmVudHNNYXA7XG4gIHByaXZhdGUgX3VwZGF0ZWRTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfY2RyOiBDaGFuZ2VEZXRlY3RvclJlZiwgcHJpdmF0ZSBfY2ZyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIpIHt9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHRoaXMuX2xvYWRDb21wb25lbnQoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuX3VwZGF0ZWRTdWIudW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuX2luaXQgPSB0cnVlO1xuICAgIHRoaXMuX2xvYWRDb21wb25lbnQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJdCBidWlsZHMgYSBuZXcgQWpmRmllbGQgY29tcG9uZW50IGJ5IGZpZWxkVHlwZSBhbmQgYmluZHMgaXQgdG8gdGhlIGZpZWxkSG9zdC5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICogQHJldHVybiB7Kn1cbiAgICovXG4gIHByaXZhdGUgX2xvYWRDb21wb25lbnQoKTogdm9pZCB7XG4gICAgdGhpcy5fdXBkYXRlZFN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX3VwZGF0ZWRTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gICAgaWYgKHRoaXMuX2luc3RhbmNlID09IG51bGwgfHwgdGhpcy5maWVsZEhvc3QgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHZjciA9IHRoaXMuZmllbGRIb3N0LnZpZXdDb250YWluZXJSZWY7XG4gICAgdmNyLmNsZWFyKCk7XG4gICAgY29uc3QgY29tcG9uZW50RGVmID0gdGhpcy5jb21wb25lbnRzTWFwW3RoaXMuX2luc3RhbmNlLm5vZGUuZmllbGRUeXBlXTtcbiAgICBpZiAoY29tcG9uZW50RGVmID09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgY29tcG9uZW50ID1cbiAgICAgIHRoaXMuX3JlYWRvbmx5ICYmIGNvbXBvbmVudERlZi5yZWFkT25seUNvbXBvbmVudFxuICAgICAgICA/IGNvbXBvbmVudERlZi5yZWFkT25seUNvbXBvbmVudFxuICAgICAgICA6IGNvbXBvbmVudERlZi5jb21wb25lbnQ7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGNvbXBvbmVudEZhY3RvcnkgPSB0aGlzLl9jZnIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoY29tcG9uZW50KTtcbiAgICAgIGNvbnN0IGNvbXBvbmVudFJlZiA9IHZjci5jcmVhdGVDb21wb25lbnQoY29tcG9uZW50RmFjdG9yeSk7XG4gICAgICB0aGlzLl9jb21wb25lbnRJbnN0YW5jZSA9IGNvbXBvbmVudFJlZi5pbnN0YW5jZTtcbiAgICAgIHRoaXMuX2NvbXBvbmVudEluc3RhbmNlLmluc3RhbmNlID0gdGhpcy5faW5zdGFuY2U7XG4gICAgICBjb25zdCBjb21wb25lbnRJbnN0YW5jZSA9IHRoaXMuX2NvbXBvbmVudEluc3RhbmNlIGFzIGFueTtcblxuICAgICAgaWYgKGNvbXBvbmVudERlZi5pbnB1dHMpIHtcbiAgICAgICAgT2JqZWN0LmtleXMoY29tcG9uZW50RGVmLmlucHV0cykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAgIGlmIChrZXkgaW4gY29tcG9uZW50SW5zdGFuY2UpIHtcbiAgICAgICAgICAgIGNvbXBvbmVudEluc3RhbmNlW2tleV0gPSBjb21wb25lbnREZWYuaW5wdXRzIVtrZXldO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICB0aGlzLl9pbnN0YW5jZS51cGRhdGVkRXZ0LnN1YnNjcmliZSgoKSA9PiB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCkpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgIH1cbiAgfVxufVxuIl19