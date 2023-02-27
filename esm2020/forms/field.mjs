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
    constructor(_cdr) {
        this._cdr = _cdr;
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
            const componentRef = vcr.createComponent(component);
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
AjfFormField.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfFormField, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Directive });
AjfFormField.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.4", type: AjfFormField, inputs: { instance: "instance", readonly: "readonly" }, viewQueries: [{ propertyName: "fieldHost", first: true, predicate: AjfFieldHost, descendants: true }], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfFormField, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }]; }, propDecorators: { fieldHost: [{
                type: ViewChild,
                args: [AjfFieldHost]
            }], instance: [{
                type: Input
            }], readonly: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL2Zvcm1zL3NyYy9maWVsZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUM1RCxPQUFPLEVBR0wsU0FBUyxFQUNULEtBQUssRUFHTCxTQUFTLEdBQ1YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUdsQyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sY0FBYyxDQUFDOztBQUkxQzs7Ozs7Ozs7R0FRRztBQUVILE1BQU0sT0FBZ0IsWUFBWTtJQW1EaEMsWUFBb0IsSUFBdUI7UUFBdkIsU0FBSSxHQUFKLElBQUksQ0FBbUI7UUEvQjNDOzs7O1dBSUc7UUFDSyxjQUFTLEdBQVksS0FBSyxDQUFDO1FBcUIzQixVQUFLLEdBQVksS0FBSyxDQUFDO1FBR3ZCLGdCQUFXLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQztJQUVLLENBQUM7SUEvQy9DLElBQUksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDO0lBQ0QsSUFDSSxRQUFRLENBQUMsUUFBc0M7UUFDakQsSUFBSSxJQUFJLENBQUMsU0FBUyxLQUFLLFFBQVEsRUFBRTtZQUMvQixJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztZQUMxQixJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNsRixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQzthQUN2QjtZQUNELElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFD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QUFDLENBQUM7U0FDaEI7SUFDSCxDQUFDOzt5R0ExR21CLFlBQVk7NkZBQVosWUFBWSw2SEFDckIsWUFBWTsyRkFESCxZQUFZO2tCQURqQyxTQUFTO3dHQUVpQixTQUFTO3NCQUFqQyxTQUFTO3VCQUFDLFlBQVk7Z0JBT25CLFFBQVE7c0JBRFgsS0FBSztnQkF1QkYsUUFBUTtzQkFEWCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge2NvZXJjZUJvb2xlYW5Qcm9wZXJ0eX0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBEaXJlY3RpdmUsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgVmlld0NoaWxkLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7U3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHtBamZCYXNlRmllbGRDb21wb25lbnR9IGZyb20gJy4vYmFzZS1maWVsZCc7XG5pbXBvcnQge0FqZkZpZWxkSG9zdH0gZnJvbSAnLi9maWVsZC1ob3N0JztcbmltcG9ydCB7QWpmRmllbGRJbnN0YW5jZX0gZnJvbSAnLi9pbnRlcmZhY2UvZmllbGRzLWluc3RhbmNlcy9maWVsZC1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZkZpZWxkQ29tcG9uZW50c01hcH0gZnJvbSAnLi9pbnRlcmZhY2UvZmllbGRzL2ZpZWxkLWNvbXBvbmVudHMtbWFwJztcblxuLyoqXG4gKiBJdCBpcyBhIGJhc2Ugd3JhcHBlciBvZiBldmVyeSBhamZGaWVsZC5cbiAqIEl0IG1hbmFnZXMgd2hhdCB0eXBlIG9mIGNvbXBvbmVudCB0byBsb2FkKGVkaXRhYmxlIGNvbXBvbmVudCBvciByZWFkb25seSBjb21wb25lbnQpXG4gKiBieSBpbnB1dCBpbnN0YW5jZS5cbiAqXG4gKiBAZXhwb3J0XG4gKiBAYWJzdHJhY3RcbiAqIEBjbGFzcyBBamZGb3JtRmllbGRcbiAqL1xuQERpcmVjdGl2ZSgpXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQWpmRm9ybUZpZWxkIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95LCBPbkluaXQge1xuICBAVmlld0NoaWxkKEFqZkZpZWxkSG9zdCkgZmllbGRIb3N0ITogQWpmRmllbGRIb3N0O1xuXG4gIHByaXZhdGUgX2luc3RhbmNlOiBBamZGaWVsZEluc3RhbmNlIHwgdW5kZWZpbmVkO1xuICBnZXQgaW5zdGFuY2UoKTogQWpmRmllbGRJbnN0YW5jZSB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBpbnN0YW5jZShpbnN0YW5jZTogQWpmRmllbGRJbnN0YW5jZSB8IHVuZGVmaW5lZCkge1xuICAgIGlmICh0aGlzLl9pbnN0YW5jZSAhPT0gaW5zdGFuY2UpIHtcbiAgICAgIHRoaXMuX2luc3RhbmNlID0gaW5zdGFuY2U7XG4gICAgICBpZiAodGhpcy5faW5zdGFuY2UgIT0gbnVsbCAmJiB0aGlzLl9pbnN0YW5jZS5ub2RlICYmICF0aGlzLl9pbnN0YW5jZS5ub2RlLmVkaXRhYmxlKSB7XG4gICAgICAgIHRoaXMuX3JlYWRvbmx5ID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLl9pbml0KSB7XG4gICAgICAgIHRoaXMuX2xvYWRDb21wb25lbnQoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogaWYgdHJ1ZSBtZWFuIHRoYXQgY29tcG9uZW50IG5lZWQgdG8gYmUgYSByZWFkb25seSBjb21wb25lbnRcbiAgICpcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHByaXZhdGUgX3JlYWRvbmx5OiBib29sZWFuID0gZmFsc2U7XG4gIGdldCByZWFkb25seSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fcmVhZG9ubHk7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IHJlYWRvbmx5KHJlYWRvbmx5OiBib29sZWFuKSB7XG4gICAgdGhpcy5fcmVhZG9ubHkgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkocmVhZG9ubHkpO1xuICAgIGlmIChcbiAgICAgICF0aGlzLl9yZWFkb25seSAmJlxuICAgICAgdGhpcy5faW5zdGFuY2UgIT0gbnVsbCAmJlxuICAgICAgdGhpcy5faW5zdGFuY2Uubm9kZSAmJlxuICAgICAgIXRoaXMuX2luc3RhbmNlLm5vZGUuZWRpdGFibGVcbiAgICApIHtcbiAgICAgIHRoaXMuX3JlYWRvbmx5ID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKHRoaXMuX2luaXQpIHtcbiAgICAgIHRoaXMuX2xvYWRDb21wb25lbnQoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9jb21wb25lbnRJbnN0YW5jZTogQWpmQmFzZUZpZWxkQ29tcG9uZW50PEFqZkZpZWxkSW5zdGFuY2U+IHwgdW5kZWZpbmVkO1xuICBwcml2YXRlIF9pbml0OiBib29sZWFuID0gZmFsc2U7XG5cbiAgcHJvdGVjdGVkIGFic3RyYWN0IGNvbXBvbmVudHNNYXA6IEFqZkZpZWxkQ29tcG9uZW50c01hcDtcbiAgcHJpdmF0ZSBfdXBkYXRlZFN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9jZHI6IENoYW5nZURldGVjdG9yUmVmKSB7fVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9sb2FkQ29tcG9uZW50KCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl91cGRhdGVkU3ViLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9pbml0ID0gdHJ1ZTtcbiAgICB0aGlzLl9sb2FkQ29tcG9uZW50KCk7XG4gIH1cblxuICAvKipcbiAgICogSXQgYnVpbGRzIGEgbmV3IEFqZkZpZWxkIGNvbXBvbmVudCBieSBmaWVsZFR5cGUgYW5kIGJpbmRzIGl0IHRvIHRoZSBmaWVsZEhvc3QuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEByZXR1cm4geyp9XG4gICAqL1xuICBwcml2YXRlIF9sb2FkQ29tcG9uZW50KCk6IHZvaWQge1xuICAgIHRoaXMuX3VwZGF0ZWRTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl91cGRhdGVkU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICAgIGlmICh0aGlzLl9pbnN0YW5jZSA9PSBudWxsIHx8IHRoaXMuZmllbGRIb3N0ID09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB2Y3IgPSB0aGlzLmZpZWxkSG9zdC52aWV3Q29udGFpbmVyUmVmO1xuICAgIHZjci5jbGVhcigpO1xuICAgIGNvbnN0IGNvbXBvbmVudERlZiA9IHRoaXMuY29tcG9uZW50c01hcFt0aGlzLl9pbnN0YW5jZS5ub2RlLmZpZWxkVHlwZV07XG4gICAgaWYgKGNvbXBvbmVudERlZiA9PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGNvbXBvbmVudCA9XG4gICAgICB0aGlzLl9yZWFkb25seSAmJiBjb21wb25lbnREZWYucmVhZE9ubHlDb21wb25lbnRcbiAgICAgICAgPyBjb21wb25lbnREZWYucmVhZE9ubHlDb21wb25lbnRcbiAgICAgICAgOiBjb21wb25lbnREZWYuY29tcG9uZW50O1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBjb21wb25lbnRSZWYgPSB2Y3IuY3JlYXRlQ29tcG9uZW50KGNvbXBvbmVudCk7XG4gICAgICB0aGlzLl9jb21wb25lbnRJbnN0YW5jZSA9IGNvbXBvbmVudFJlZi5pbnN0YW5jZTtcbiAgICAgIHRoaXMuX2NvbXBvbmVudEluc3RhbmNlLmluc3RhbmNlID0gdGhpcy5faW5zdGFuY2U7XG4gICAgICBjb25zdCBjb21wb25lbnRJbnN0YW5jZSA9IHRoaXMuX2NvbXBvbmVudEluc3RhbmNlIGFzIGFueTtcblxuICAgICAgaWYgKGNvbXBvbmVudERlZi5pbnB1dHMpIHtcbiAgICAgICAgT2JqZWN0LmtleXMoY29tcG9uZW50RGVmLmlucHV0cykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAgIGlmIChrZXkgaW4gY29tcG9uZW50SW5zdGFuY2UpIHtcbiAgICAgICAgICAgIGNvbXBvbmVudEluc3RhbmNlW2tleV0gPSBjb21wb25lbnREZWYuaW5wdXRzIVtrZXldO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICB0aGlzLl9pbnN0YW5jZS51cGRhdGVkRXZ0LnN1YnNjcmliZSgoKSA9PiB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCkpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgIH1cbiAgfVxufVxuIl19