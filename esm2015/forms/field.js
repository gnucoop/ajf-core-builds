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
            this._updatedSub = this._instance.updatedEvt.subscribe(() => this._cdr.markForCheck());
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9mb3Jtcy9maWVsZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUM1RCxPQUFPLEVBQ0wsaUJBQWlCLEVBQ2pCLHdCQUF3QixFQUN4QixTQUFTLEVBQ1QsS0FBSyxFQUdMLFNBQVMsRUFDVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBR2xDLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFLMUMsTUFBTSxPQUFnQixZQUFZO0lBbUNoQyxZQUFvQixJQUF1QixFQUFVLElBQThCO1FBQS9ELFNBQUksR0FBSixJQUFJLENBQW1CO1FBQVUsU0FBSSxHQUFKLElBQUksQ0FBMEI7UUFMM0UsVUFBSyxHQUFZLEtBQUssQ0FBQztRQUd2QixnQkFBVyxHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUM7SUFFNkMsQ0FBQztJQS9CdkYsSUFBSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3hCLENBQUM7SUFDRCxJQUNJLFFBQVEsQ0FBQyxRQUEwQjtRQUNyQyxJQUFJLElBQUksQ0FBQyxTQUFTLEtBQUssUUFBUSxFQUFFO1lBQy9CLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO1lBQzFCLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDZCxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7YUFDdkI7U0FDRjtJQUNILENBQUM7SUFHRCxJQUFJLFFBQVE7UUFDVixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDeEIsQ0FBQztJQUNELElBQ0ksUUFBUSxDQUFDLFFBQWlCO1FBQzVCLElBQUksQ0FBQyxTQUFTLEdBQUcscUJBQXFCLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDakQsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ2QsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1NBQ3ZCO0lBQ0gsQ0FBQztJQVVELFdBQVc7UUFDVCxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ2pDLENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDbEIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFFTyxjQUFjO1FBQ3BCLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDL0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDO1FBQ3RDLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLEVBQUU7WUFDcEQsT0FBTztTQUNSO1FBRUQsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQztRQUM1QyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDWixNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3ZFLElBQUksWUFBWSxJQUFJLElBQUksRUFBRTtZQUN4QixPQUFPO1NBQ1I7UUFDRCxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxJQUFJLFlBQVksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1lBQ2hFLFlBQVksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1lBQ2hDLFlBQVksQ0FBQyxTQUFTLENBQUM7UUFDM0IsSUFBSTtZQUNGLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUN0RSxNQUFNLFlBQVksR0FBRyxHQUFHLENBQUMsZUFBZSxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDM0QsSUFBSSxDQUFDLGtCQUFrQixHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUM7WUFDaEQsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBRWxELElBQUksWUFBWSxDQUFDLE1BQU0sRUFBRTtnQkFDdkIsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFO29CQUM3QyxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsa0JBQWtCLEVBQUU7d0JBQ2pDLElBQUksQ0FBQyxrQkFBMEIsQ0FBQyxHQUFHLENBQUMsR0FBRyxZQUFZLENBQUMsTUFBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3FCQUNuRTtnQkFDSCxDQUFDLENBQUMsQ0FBQzthQUNKO1lBQ0QsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDO1NBQ3hGO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDVixPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2hCO0lBQ0gsQ0FBQzs7O1lBaEZGLFNBQVM7OztZQWZSLGlCQUFpQjtZQUNqQix3QkFBd0I7Ozt3QkFnQnZCLFNBQVMsU0FBQyxZQUFZLEVBQUUsRUFBQyxNQUFNLEVBQUUsSUFBSSxFQUFDO3VCQU10QyxLQUFLO3VCQWNMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7Y29lcmNlQm9vbGVhblByb3BlcnR5fSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgRGlyZWN0aXZlLFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIFZpZXdDaGlsZFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7U3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHtBamZCYXNlRmllbGRDb21wb25lbnR9IGZyb20gJy4vYmFzZS1maWVsZCc7XG5pbXBvcnQge0FqZkZpZWxkSG9zdH0gZnJvbSAnLi9maWVsZC1ob3N0JztcbmltcG9ydCB7QWpmRmllbGRJbnN0YW5jZX0gZnJvbSAnLi9pbnRlcmZhY2UvZmllbGRzLWluc3RhbmNlcy9maWVsZC1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZkZpZWxkQ29tcG9uZW50c01hcH0gZnJvbSAnLi9pbnRlcmZhY2UvZmllbGRzL2ZpZWxkLWNvbXBvbmVudHMtbWFwJztcblxuQERpcmVjdGl2ZSgpXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQWpmRm9ybUZpZWxkIGltcGxlbWVudHMgT25EZXN0cm95LCBPbkluaXQge1xuICBAVmlld0NoaWxkKEFqZkZpZWxkSG9zdCwge3N0YXRpYzogdHJ1ZX0pIGZpZWxkSG9zdDogQWpmRmllbGRIb3N0O1xuXG4gIHByaXZhdGUgX2luc3RhbmNlOiBBamZGaWVsZEluc3RhbmNlO1xuICBnZXQgaW5zdGFuY2UoKTogQWpmRmllbGRJbnN0YW5jZSB7XG4gICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBpbnN0YW5jZShpbnN0YW5jZTogQWpmRmllbGRJbnN0YW5jZSkge1xuICAgIGlmICh0aGlzLl9pbnN0YW5jZSAhPT0gaW5zdGFuY2UpIHtcbiAgICAgIHRoaXMuX2luc3RhbmNlID0gaW5zdGFuY2U7XG4gICAgICBpZiAodGhpcy5faW5pdCkge1xuICAgICAgICB0aGlzLl9sb2FkQ29tcG9uZW50KCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfcmVhZG9ubHk6IGJvb2xlYW47XG4gIGdldCByZWFkb25seSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fcmVhZG9ubHk7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IHJlYWRvbmx5KHJlYWRvbmx5OiBib29sZWFuKSB7XG4gICAgdGhpcy5fcmVhZG9ubHkgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkocmVhZG9ubHkpO1xuICAgIGlmICh0aGlzLl9pbml0KSB7XG4gICAgICB0aGlzLl9sb2FkQ29tcG9uZW50KCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfY29tcG9uZW50SW5zdGFuY2U6IEFqZkJhc2VGaWVsZENvbXBvbmVudDxBamZGaWVsZEluc3RhbmNlPjtcbiAgcHJpdmF0ZSBfaW5pdDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIHByb3RlY3RlZCBhYnN0cmFjdCBjb21wb25lbnRzTWFwOiBBamZGaWVsZENvbXBvbmVudHNNYXA7XG4gIHByaXZhdGUgX3VwZGF0ZWRTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfY2RyOiBDaGFuZ2VEZXRlY3RvclJlZiwgcHJpdmF0ZSBfY2ZyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIpIHt9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5fdXBkYXRlZFN1Yi51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5faW5pdCA9IHRydWU7XG4gICAgdGhpcy5fbG9hZENvbXBvbmVudCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfbG9hZENvbXBvbmVudCgpOiB2b2lkIHtcbiAgICB0aGlzLl91cGRhdGVkU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fdXBkYXRlZFN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgICBpZiAodGhpcy5faW5zdGFuY2UgPT0gbnVsbCB8fCB0aGlzLmZpZWxkSG9zdCA9PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgdmNyID0gdGhpcy5maWVsZEhvc3Qudmlld0NvbnRhaW5lclJlZjtcbiAgICB2Y3IuY2xlYXIoKTtcbiAgICBjb25zdCBjb21wb25lbnREZWYgPSB0aGlzLmNvbXBvbmVudHNNYXBbdGhpcy5faW5zdGFuY2Uubm9kZS5maWVsZFR5cGVdO1xuICAgIGlmIChjb21wb25lbnREZWYgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBjb21wb25lbnQgPSB0aGlzLl9yZWFkb25seSAmJiBjb21wb25lbnREZWYucmVhZE9ubHlDb21wb25lbnQgP1xuICAgICAgICBjb21wb25lbnREZWYucmVhZE9ubHlDb21wb25lbnQgOlxuICAgICAgICBjb21wb25lbnREZWYuY29tcG9uZW50O1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBjb21wb25lbnRGYWN0b3J5ID0gdGhpcy5fY2ZyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KGNvbXBvbmVudCk7XG4gICAgICBjb25zdCBjb21wb25lbnRSZWYgPSB2Y3IuY3JlYXRlQ29tcG9uZW50KGNvbXBvbmVudEZhY3RvcnkpO1xuICAgICAgdGhpcy5fY29tcG9uZW50SW5zdGFuY2UgPSBjb21wb25lbnRSZWYuaW5zdGFuY2U7XG4gICAgICB0aGlzLl9jb21wb25lbnRJbnN0YW5jZS5pbnN0YW5jZSA9IHRoaXMuX2luc3RhbmNlO1xuXG4gICAgICBpZiAoY29tcG9uZW50RGVmLmlucHV0cykge1xuICAgICAgICBPYmplY3Qua2V5cyhjb21wb25lbnREZWYuaW5wdXRzKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgaWYgKGtleSBpbiB0aGlzLl9jb21wb25lbnRJbnN0YW5jZSkge1xuICAgICAgICAgICAgKHRoaXMuX2NvbXBvbmVudEluc3RhbmNlIGFzIGFueSlba2V5XSA9IGNvbXBvbmVudERlZi5pbnB1dHMhW2tleV07XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX3VwZGF0ZWRTdWIgPSB0aGlzLl9pbnN0YW5jZS51cGRhdGVkRXZ0LnN1YnNjcmliZSgoKSA9PiB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCkpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgIH1cbiAgfVxufVxuIl19