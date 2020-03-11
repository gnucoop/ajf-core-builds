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
var AjfFormField = /** @class */ (function () {
    function AjfFormField(_cdr, _cfr) {
        this._cdr = _cdr;
        this._cfr = _cfr;
        this._updatedSub = Subscription.EMPTY;
    }
    Object.defineProperty(AjfFormField.prototype, "instance", {
        get: function () { return this._instance; },
        set: function (instance) {
            if (this._instance !== instance) {
                this._instance = instance;
                this._loadComponent();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFormField.prototype, "readonly", {
        get: function () { return this._readonly; },
        set: function (readonly) {
            this._readonly = coerceBooleanProperty(readonly);
            if (this._componentInstance != null) {
                this._componentInstance.readonly = this._readonly;
            }
            this._cdr.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    AjfFormField.prototype.ngOnDestroy = function () {
        this._updatedSub.unsubscribe();
    };
    AjfFormField.prototype.ngOnInit = function () {
        this._loadComponent();
    };
    AjfFormField.prototype._loadComponent = function () {
        var _this = this;
        this._updatedSub.unsubscribe();
        this._updatedSub = Subscription.EMPTY;
        if (this._instance == null || this.fieldHost == null) {
            return;
        }
        var vcr = this.fieldHost.viewContainerRef;
        vcr.clear();
        var componentDef = this.componentsMap[this._instance.node.fieldType];
        if (componentDef == null) {
            return;
        }
        var component = componentDef.component;
        try {
            var componentFactory = this._cfr.resolveComponentFactory(component);
            var componentRef = vcr.createComponent(componentFactory);
            this._componentInstance = componentRef.instance;
            this._componentInstance.instance = this._instance;
            this._componentInstance.readonly = this._readonly;
            if (componentDef.inputs) {
                Object.keys(componentDef.inputs).forEach(function (key) {
                    if (key in _this._componentInstance) {
                        _this._componentInstance[key] = componentDef.inputs[key];
                    }
                });
            }
            this._updatedSub = this._instance.updatedEvt.subscribe(function () { return _this._cdr.markForCheck(); });
        }
        catch (e) {
            console.log(e);
        }
    };
    AjfFormField.decorators = [
        { type: Directive }
    ];
    /** @nocollapse */
    AjfFormField.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: ComponentFactoryResolver }
    ]; };
    AjfFormField.propDecorators = {
        fieldHost: [{ type: ViewChild, args: [AjfFieldHost, { static: true },] }],
        instance: [{ type: Input }],
        readonly: [{ type: Input }]
    };
    return AjfFormField;
}());
export { AjfFormField };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9mb3Jtcy9maWVsZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUM1RCxPQUFPLEVBQUMsaUJBQWlCLEVBQUUsd0JBQXdCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFDbkUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2xDLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFLbEMsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUUxQztJQTRCRSxzQkFDVSxJQUF1QixFQUN2QixJQUE4QjtRQUQ5QixTQUFJLEdBQUosSUFBSSxDQUFtQjtRQUN2QixTQUFJLEdBQUosSUFBSSxDQUEwQjtRQUpoQyxnQkFBVyxHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUM7SUFLckMsQ0FBQztJQTFCTCxzQkFBSSxrQ0FBUTthQUFaLGNBQW1DLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7YUFDM0QsVUFBc0IsUUFBMEI7WUFDOUMsSUFBSSxJQUFJLENBQUMsU0FBUyxLQUFLLFFBQVEsRUFBRTtnQkFDL0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7Z0JBQzFCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQzthQUN2QjtRQUNILENBQUM7OztPQU4wRDtJQVMzRCxzQkFBSSxrQ0FBUTthQUFaLGNBQTBCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7YUFDbEQsVUFBc0IsUUFBaUI7WUFDckMsSUFBSSxDQUFDLFNBQVMsR0FBRyxxQkFBcUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNqRCxJQUFJLElBQUksQ0FBQyxrQkFBa0IsSUFBSSxJQUFJLEVBQUU7Z0JBQ25DLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQzthQUNuRDtZQUNELElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDM0IsQ0FBQzs7O09BUGlEO0lBbUJsRCxrQ0FBVyxHQUFYO1FBQ0UsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNqQyxDQUFDO0lBRUQsK0JBQVEsR0FBUjtRQUNFLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRU8scUNBQWMsR0FBdEI7UUFBQSxpQkE0QkM7UUEzQkMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUMvQixJQUFJLENBQUMsV0FBVyxHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUM7UUFDdEMsSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksRUFBRTtZQUFFLE9BQU87U0FBRTtRQUVqRSxJQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDO1FBQzVDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNaLElBQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdkUsSUFBSSxZQUFZLElBQUksSUFBSSxFQUFFO1lBQUUsT0FBTztTQUFFO1FBQ3JDLElBQU0sU0FBUyxHQUFHLFlBQVksQ0FBQyxTQUFTLENBQUM7UUFDekMsSUFBSTtZQUNGLElBQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUN0RSxJQUFNLFlBQVksR0FBRyxHQUFHLENBQUMsZUFBZSxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDM0QsSUFBSSxDQUFDLGtCQUFrQixHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUM7WUFDaEQsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQ2xELElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUVsRCxJQUFJLFlBQVksQ0FBQyxNQUFNLEVBQUU7Z0JBQ3ZCLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFBLEdBQUc7b0JBQzFDLElBQUksR0FBRyxJQUFLLEtBQUksQ0FBQyxrQkFBa0IsRUFBRTt3QkFDakMsS0FBSSxDQUFDLGtCQUEwQixDQUFDLEdBQUcsQ0FBQyxHQUFHLFlBQVksQ0FBQyxNQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7cUJBQ3BFO2dCQUNILENBQUMsQ0FBQyxDQUFDO2FBQ0o7WUFDRCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsRUFBeEIsQ0FBd0IsQ0FBQyxDQUFDO1NBQ3hGO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDVixPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2hCO0lBQ0gsQ0FBQzs7Z0JBckVGLFNBQVM7Ozs7Z0JBVEYsaUJBQWlCO2dCQUFFLHdCQUF3Qjs7OzRCQVdoRCxTQUFTLFNBQUMsWUFBWSxFQUFFLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBQzsyQkFJdEMsS0FBSzsyQkFTTCxLQUFLOztJQXVEUixtQkFBQztDQUFBLEFBdEVELElBc0VDO1NBckVxQixZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge2NvZXJjZUJvb2xlYW5Qcm9wZXJ0eX0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7Q2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgRGlyZWN0aXZlLCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQsXG4gIFZpZXdDaGlsZH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7QWpmQmFzZUZpZWxkQ29tcG9uZW50fSBmcm9tICcuL2Jhc2UtZmllbGQnO1xuaW1wb3J0IHtBamZGaWVsZENvbXBvbmVudHNNYXB9IGZyb20gJy4vaW50ZXJmYWNlL2ZpZWxkcy9maWVsZC1jb21wb25lbnRzLW1hcCc7XG5pbXBvcnQge0FqZkZpZWxkSW5zdGFuY2V9IGZyb20gJy4vaW50ZXJmYWNlL2ZpZWxkcy1pbnN0YW5jZXMvZmllbGQtaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZGaWVsZEhvc3R9IGZyb20gJy4vZmllbGQtaG9zdCc7XG5cbkBEaXJlY3RpdmUoKVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFqZkZvcm1GaWVsZCBpbXBsZW1lbnRzIE9uRGVzdHJveSwgT25Jbml0IHtcbiAgQFZpZXdDaGlsZChBamZGaWVsZEhvc3QsIHtzdGF0aWM6IHRydWV9KSBmaWVsZEhvc3Q6IEFqZkZpZWxkSG9zdDtcblxuICBwcml2YXRlIF9pbnN0YW5jZTogQWpmRmllbGRJbnN0YW5jZTtcbiAgZ2V0IGluc3RhbmNlKCk6IEFqZkZpZWxkSW5zdGFuY2UgeyByZXR1cm4gdGhpcy5faW5zdGFuY2U7IH1cbiAgQElucHV0KCkgc2V0IGluc3RhbmNlKGluc3RhbmNlOiBBamZGaWVsZEluc3RhbmNlKSB7XG4gICAgaWYgKHRoaXMuX2luc3RhbmNlICE9PSBpbnN0YW5jZSkge1xuICAgICAgdGhpcy5faW5zdGFuY2UgPSBpbnN0YW5jZTtcbiAgICAgIHRoaXMuX2xvYWRDb21wb25lbnQoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9yZWFkb25seTogYm9vbGVhbjtcbiAgZ2V0IHJlYWRvbmx5KCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fcmVhZG9ubHk7IH1cbiAgQElucHV0KCkgc2V0IHJlYWRvbmx5KHJlYWRvbmx5OiBib29sZWFuKSB7XG4gICAgdGhpcy5fcmVhZG9ubHkgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkocmVhZG9ubHkpO1xuICAgIGlmICh0aGlzLl9jb21wb25lbnRJbnN0YW5jZSAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9jb21wb25lbnRJbnN0YW5jZS5yZWFkb25seSA9IHRoaXMuX3JlYWRvbmx5O1xuICAgIH1cbiAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIF9jb21wb25lbnRJbnN0YW5jZTogQWpmQmFzZUZpZWxkQ29tcG9uZW50PEFqZkZpZWxkSW5zdGFuY2U+O1xuXG4gIHByb3RlY3RlZCBhYnN0cmFjdCBjb21wb25lbnRzTWFwOiBBamZGaWVsZENvbXBvbmVudHNNYXA7XG4gIHByaXZhdGUgX3VwZGF0ZWRTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcml2YXRlIF9jZnI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlclxuICApIHsgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuX3VwZGF0ZWRTdWIudW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuX2xvYWRDb21wb25lbnQoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2xvYWRDb21wb25lbnQoKTogdm9pZCB7XG4gICAgdGhpcy5fdXBkYXRlZFN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX3VwZGF0ZWRTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gICAgaWYgKHRoaXMuX2luc3RhbmNlID09IG51bGwgfHwgdGhpcy5maWVsZEhvc3QgPT0gbnVsbCkgeyByZXR1cm47IH1cblxuICAgIGNvbnN0IHZjciA9IHRoaXMuZmllbGRIb3N0LnZpZXdDb250YWluZXJSZWY7XG4gICAgdmNyLmNsZWFyKCk7XG4gICAgY29uc3QgY29tcG9uZW50RGVmID0gdGhpcy5jb21wb25lbnRzTWFwW3RoaXMuX2luc3RhbmNlLm5vZGUuZmllbGRUeXBlXTtcbiAgICBpZiAoY29tcG9uZW50RGVmID09IG51bGwpIHsgcmV0dXJuOyB9XG4gICAgY29uc3QgY29tcG9uZW50ID0gY29tcG9uZW50RGVmLmNvbXBvbmVudDtcbiAgICB0cnkge1xuICAgICAgY29uc3QgY29tcG9uZW50RmFjdG9yeSA9IHRoaXMuX2Nmci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShjb21wb25lbnQpO1xuICAgICAgY29uc3QgY29tcG9uZW50UmVmID0gdmNyLmNyZWF0ZUNvbXBvbmVudChjb21wb25lbnRGYWN0b3J5KTtcbiAgICAgIHRoaXMuX2NvbXBvbmVudEluc3RhbmNlID0gY29tcG9uZW50UmVmLmluc3RhbmNlO1xuICAgICAgdGhpcy5fY29tcG9uZW50SW5zdGFuY2UuaW5zdGFuY2UgPSB0aGlzLl9pbnN0YW5jZTtcbiAgICAgIHRoaXMuX2NvbXBvbmVudEluc3RhbmNlLnJlYWRvbmx5ID0gdGhpcy5fcmVhZG9ubHk7XG5cbiAgICAgIGlmIChjb21wb25lbnREZWYuaW5wdXRzKSB7XG4gICAgICAgIE9iamVjdC5rZXlzKGNvbXBvbmVudERlZi5pbnB1dHMpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgICBpZiAoa2V5IGluICB0aGlzLl9jb21wb25lbnRJbnN0YW5jZSkge1xuICAgICAgICAgICAgKCB0aGlzLl9jb21wb25lbnRJbnN0YW5jZSBhcyBhbnkpW2tleV0gPSBjb21wb25lbnREZWYuaW5wdXRzIVtrZXldO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICB0aGlzLl91cGRhdGVkU3ViID0gdGhpcy5faW5zdGFuY2UudXBkYXRlZEV2dC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==