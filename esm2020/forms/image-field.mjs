import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { filter, map, shareReplay, startWith, switchMap } from 'rxjs/operators';
import { AjfBaseFieldComponent } from './base-field';
import { AjfFormRendererService } from './form-renderer';
import { AJF_WARNING_ALERT_SERVICE } from './warning-alert-service';
import * as i0 from "@angular/core";
import * as i1 from "./form-renderer";
import * as i2 from "@angular/platform-browser";
import * as i3 from "@ajf/core/file-input";
import * as i4 from "@angular/common";
import * as i5 from "@angular/forms";
/**
 * It allows the loading of image url inside an AjfForm.
 *
 * @export
 * @class AjfImageFieldComponent
 */
export class AjfImageFieldComponent extends AjfBaseFieldComponent {
    constructor(cdr, service, was, domSanitizer) {
        super(cdr, service, was);
        const fileStream = this.control.pipe(filter(control => control != null), switchMap(control => {
            control = control;
            return control.valueChanges.pipe(startWith(control.value));
        }), filter(value => value != null), shareReplay(1));
        this.imageUrl = fileStream.pipe(map(file => domSanitizer.bypassSecurityTrustResourceUrl(file.content)));
    }
}
AjfImageFieldComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfImageFieldComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i1.AjfFormRendererService }, { token: AJF_WARNING_ALERT_SERVICE }, { token: i2.DomSanitizer }], target: i0.ɵɵFactoryTarget.Component });
AjfImageFieldComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.0-next.15", type: AjfImageFieldComponent, selector: "ajf-image-field", usesInheritance: true, ngImport: i0, template: "<ajf-file-input *ngIf=\"control|async as ctrl\" accept=\"image/*\" [formControl]=\"ctrl!\">\n  <div ajfFilePreview class=\"ajf-image-preview\">\n    <img [src]=\"imageUrl|async\">\n  </div>\n</ajf-file-input>\n", styles: ["ajf-image-field img{min-width:32px;min-height:32px}\n"], components: [{ type: i3.AjfFileInput, selector: "ajf-file-input", inputs: ["accept", "value"], outputs: ["valueChange"] }], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i5.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i5.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { type: i3.AjfFilePreview, selector: "[ajfFilePreview]", exportAs: ["ajfFilePreview"] }], pipes: { "async": i4.AsyncPipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfImageFieldComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ajf-image-field', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<ajf-file-input *ngIf=\"control|async as ctrl\" accept=\"image/*\" [formControl]=\"ctrl!\">\n  <div ajfFilePreview class=\"ajf-image-preview\">\n    <img [src]=\"imageUrl|async\">\n  </div>\n</ajf-file-input>\n", styles: ["ajf-image-field img{min-width:32px;min-height:32px}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i1.AjfFormRendererService }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [AJF_WARNING_ALERT_SERVICE]
                }] }, { type: i2.DomSanitizer }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2UtZmllbGQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9mb3Jtcy9pbWFnZS1maWVsZC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2Zvcm1zL2ltYWdlLWZpZWxkLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBdUJBLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxNQUFNLEVBQ04saUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBQyxZQUFZLEVBQWtCLE1BQU0sMkJBQTJCLENBQUM7QUFFeEUsT0FBTyxFQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUU5RSxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFDbkQsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDdkQsT0FBTyxFQUFDLHlCQUF5QixFQUF5QixNQUFNLHlCQUF5QixDQUFDOzs7Ozs7O0FBRTFGOzs7OztHQUtHO0FBUUgsTUFBTSxPQUFPLHNCQUF1QixTQUFRLHFCQUFxQjtJQUcvRCxZQUNJLEdBQXNCLEVBQUUsT0FBK0IsRUFDcEIsR0FBMkIsRUFBRSxZQUEwQjtRQUM1RixLQUFLLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQztRQUN6QixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FDaEMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxFQUNsQyxTQUFTLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDbEIsT0FBTyxHQUFHLE9BQXNCLENBQUM7WUFDakMsT0FBTyxPQUFPLENBQUMsWUFBWSxDQUFDLElBQUksQ0FDckIsU0FBUyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FDQSxDQUFDO1FBQ3RDLENBQUMsQ0FBQyxFQUNGLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsRUFDOUIsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUNqQixDQUFDO1FBQ0YsSUFBSSxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUMzQixHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsOEJBQThCLENBQUUsSUFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUN0RixDQUFDO0lBQ0osQ0FBQzs7MkhBckJVLHNCQUFzQix5RkFLckIseUJBQXlCOytHQUwxQixzQkFBc0IsOEVDcERuQyxvTkFLQTttR0QrQ2Esc0JBQXNCO2tCQVBsQyxTQUFTOytCQUNFLGlCQUFpQixtQkFHVix1QkFBdUIsQ0FBQyxNQUFNLGlCQUNoQyxpQkFBaUIsQ0FBQyxJQUFJOzswQkFPaEMsTUFBTTsyQkFBQyx5QkFBeUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmRmlsZX0gZnJvbSAnQGFqZi9jb3JlL2ZpbGUtaW5wdXQnO1xuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEluamVjdCxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Zvcm1Db250cm9sfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge0RvbVNhbml0aXplciwgU2FmZVJlc291cmNlVXJsfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSAncnhqcyc7XG5pbXBvcnQge2ZpbHRlciwgbWFwLCBzaGFyZVJlcGxheSwgc3RhcnRXaXRoLCBzd2l0Y2hNYXB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHtBamZCYXNlRmllbGRDb21wb25lbnR9IGZyb20gJy4vYmFzZS1maWVsZCc7XG5pbXBvcnQge0FqZkZvcm1SZW5kZXJlclNlcnZpY2V9IGZyb20gJy4vZm9ybS1yZW5kZXJlcic7XG5pbXBvcnQge0FKRl9XQVJOSU5HX0FMRVJUX1NFUlZJQ0UsIEFqZldhcm5pbmdBbGVydFNlcnZpY2V9IGZyb20gJy4vd2FybmluZy1hbGVydC1zZXJ2aWNlJztcblxuLyoqXG4gKiBJdCBhbGxvd3MgdGhlIGxvYWRpbmcgb2YgaW1hZ2UgdXJsIGluc2lkZSBhbiBBamZGb3JtLlxuICpcbiAqIEBleHBvcnRcbiAqIEBjbGFzcyBBamZJbWFnZUZpZWxkQ29tcG9uZW50XG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FqZi1pbWFnZS1maWVsZCcsXG4gIHRlbXBsYXRlVXJsOiAnaW1hZ2UtZmllbGQuaHRtbCcsXG4gIHN0eWxlVXJsczogWydpbWFnZS1maWVsZC5jc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG59KVxuZXhwb3J0IGNsYXNzIEFqZkltYWdlRmllbGRDb21wb25lbnQgZXh0ZW5kcyBBamZCYXNlRmllbGRDb21wb25lbnQge1xuICByZWFkb25seSBpbWFnZVVybDogT2JzZXJ2YWJsZTxTYWZlUmVzb3VyY2VVcmw+O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZiwgc2VydmljZTogQWpmRm9ybVJlbmRlcmVyU2VydmljZSxcbiAgICAgIEBJbmplY3QoQUpGX1dBUk5JTkdfQUxFUlRfU0VSVklDRSkgd2FzOiBBamZXYXJuaW5nQWxlcnRTZXJ2aWNlLCBkb21TYW5pdGl6ZXI6IERvbVNhbml0aXplcikge1xuICAgIHN1cGVyKGNkciwgc2VydmljZSwgd2FzKTtcbiAgICBjb25zdCBmaWxlU3RyZWFtID0gdGhpcy5jb250cm9sLnBpcGUoXG4gICAgICAgIGZpbHRlcihjb250cm9sID0+IGNvbnRyb2wgIT0gbnVsbCksXG4gICAgICAgIHN3aXRjaE1hcChjb250cm9sID0+IHtcbiAgICAgICAgICBjb250cm9sID0gY29udHJvbCBhcyBGb3JtQ29udHJvbDtcbiAgICAgICAgICByZXR1cm4gY29udHJvbC52YWx1ZUNoYW5nZXMucGlwZShcbiAgICAgICAgICAgICAgICAgICAgIHN0YXJ0V2l0aChjb250cm9sLnZhbHVlKSxcbiAgICAgICAgICAgICAgICAgICAgICkgYXMgT2JzZXJ2YWJsZTxBamZGaWxlPjtcbiAgICAgICAgfSksXG4gICAgICAgIGZpbHRlcih2YWx1ZSA9PiB2YWx1ZSAhPSBudWxsKSxcbiAgICAgICAgc2hhcmVSZXBsYXkoMSksXG4gICAgKTtcbiAgICB0aGlzLmltYWdlVXJsID0gZmlsZVN0cmVhbS5waXBlKFxuICAgICAgICBtYXAoZmlsZSA9PiBkb21TYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdFJlc291cmNlVXJsKChmaWxlIGFzIEFqZkZpbGUpLmNvbnRlbnQpKSxcbiAgICApO1xuICB9XG59XG4iLCI8YWpmLWZpbGUtaW5wdXQgKm5nSWY9XCJjb250cm9sfGFzeW5jIGFzIGN0cmxcIiBhY2NlcHQ9XCJpbWFnZS8qXCIgW2Zvcm1Db250cm9sXT1cImN0cmwhXCI+XG4gIDxkaXYgYWpmRmlsZVByZXZpZXcgY2xhc3M9XCJhamYtaW1hZ2UtcHJldmlld1wiPlxuICAgIDxpbWcgW3NyY109XCJpbWFnZVVybHxhc3luY1wiPlxuICA8L2Rpdj5cbjwvYWpmLWZpbGUtaW5wdXQ+XG4iXX0=