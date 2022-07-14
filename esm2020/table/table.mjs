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
import { ChangeDetectionStrategy, Component, Input, SecurityContext, ViewEncapsulation, } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/platform-browser";
import * as i2 from "@angular/common";
import * as i3 from "@ajf/core/common";
export class AjfTable {
    /**
     * Creates an instance of TableComponent.
     *
     *
     * @memberOf TableComponent
     */
    constructor(_cdr, _domSanitizer) {
        this._cdr = _cdr;
        this._domSanitizer = _domSanitizer;
        this._data = [];
        this._cellpadding = '';
    }
    get data() {
        return this._data;
    }
    set data(data) {
        this._data = this._fixData(data);
        this._cdr.markForCheck();
    }
    get cellpadding() {
        return this._cellpadding;
    }
    set cellpadding(cellpadding) {
        this._cellpadding = cellpadding;
        this._cdr.markForCheck();
    }
    _fixData(data) {
        (data || []).forEach(elem => {
            (elem || []).forEach(subElem => {
                subElem.value = this._domSanitizer.sanitize(SecurityContext.HTML, this._domSanitizer.bypassSecurityTrustHtml(subElem.value));
            });
        });
        return data;
    }
}
AjfTable.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfTable, deps: [{ token: i0.ChangeDetectorRef }, { token: i1.DomSanitizer }], target: i0.ɵɵFactoryTarget.Component });
AjfTable.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.5", type: AjfTable, selector: "ajf-table", inputs: { data: "data", cellpadding: "cellpadding" }, ngImport: i0, template: "<table *ngIf=\"data\">\n  <tr *ngFor=\"let row of data\">\n    <td *ngFor=\"let cell of row\"\n        [applyStyles]=\"cell.style\"\n        [ngStyle]=\"{'padding': cellpadding}\"\n        [attr.colspan]=\"cell.colspan\"\n        [attr.rowspan]=\"cell.rowspan\"\n        [innerHTML]=\"cell.value\">\n    </td>\n  </tr>\n</table>\n", styles: [""], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i3.ApplyStylesDirective, selector: "[applyStyles]", inputs: ["applyStyles"] }, { type: i2.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfTable, decorators: [{
            type: Component,
            args: [{ selector: 'ajf-table', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<table *ngIf=\"data\">\n  <tr *ngFor=\"let row of data\">\n    <td *ngFor=\"let cell of row\"\n        [applyStyles]=\"cell.style\"\n        [ngStyle]=\"{'padding': cellpadding}\"\n        [attr.colspan]=\"cell.colspan\"\n        [attr.rowspan]=\"cell.rowspan\"\n        [innerHTML]=\"cell.value\">\n    </td>\n  </tr>\n</table>\n", styles: [""] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i1.DomSanitizer }]; }, propDecorators: { data: [{
                type: Input
            }], cellpadding: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL3RhYmxlL3NyYy90YWJsZS50cyIsIi4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvdGFibGUvc3JjL3RhYmxlLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUNMLHVCQUF1QixFQUV2QixTQUFTLEVBQ1QsS0FBSyxFQUNMLGVBQWUsRUFDZixpQkFBaUIsR0FDbEIsTUFBTSxlQUFlLENBQUM7Ozs7O0FBWXZCLE1BQU0sT0FBTyxRQUFRO0lBcUJuQjs7Ozs7T0FLRztJQUNILFlBQW9CLElBQXVCLEVBQVUsYUFBMkI7UUFBNUQsU0FBSSxHQUFKLElBQUksQ0FBbUI7UUFBVSxrQkFBYSxHQUFiLGFBQWEsQ0FBYztRQTFCeEUsVUFBSyxHQUFxQixFQUFFLENBQUM7UUFVN0IsaUJBQVksR0FBVyxFQUFFLENBQUM7SUFnQmlELENBQUM7SUF6QnBGLElBQUksSUFBSTtRQUNOLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztJQUNwQixDQUFDO0lBQ0QsSUFDSSxJQUFJLENBQUMsSUFBc0I7UUFDN0IsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUdELElBQUksV0FBVztRQUNiLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztJQUMzQixDQUFDO0lBQ0QsSUFDSSxXQUFXLENBQUMsV0FBbUI7UUFDakMsSUFBSSxDQUFDLFlBQVksR0FBRyxXQUFXLENBQUM7UUFDaEMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBVU8sUUFBUSxDQUFDLElBQXNCO1FBQ3JDLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUMxQixDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQzdCLE9BQU8sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQ3pDLGVBQWUsQ0FBQyxJQUFJLEVBQ3BCLElBQUksQ0FBQyxhQUFhLENBQUMsdUJBQXVCLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUMxRCxDQUFDO1lBQ0osQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQzs7cUdBdkNVLFFBQVE7eUZBQVIsUUFBUSx1R0N6Q3JCLDRVQVdBOzJGRDhCYSxRQUFRO2tCQVBwQixTQUFTOytCQUNFLFdBQVcsbUJBR0osdUJBQXVCLENBQUMsTUFBTSxpQkFDaEMsaUJBQWlCLENBQUMsSUFBSTttSUFRakMsSUFBSTtzQkFEUCxLQUFLO2dCQVdGLFdBQVc7c0JBRGQsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBTZWN1cml0eUNvbnRleHQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RG9tU2FuaXRpemVyfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcblxuaW1wb3J0IHtBamZUYWJsZUNlbGx9IGZyb20gJy4vdGFibGUtY2VsbCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FqZi10YWJsZScsXG4gIHRlbXBsYXRlVXJsOiAndGFibGUuaHRtbCcsXG4gIHN0eWxlVXJsczogWyd0YWJsZS5zY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxufSlcbmV4cG9ydCBjbGFzcyBBamZUYWJsZSB7XG4gIHByaXZhdGUgX2RhdGE6IEFqZlRhYmxlQ2VsbFtdW10gPSBbXTtcbiAgZ2V0IGRhdGEoKTogQWpmVGFibGVDZWxsW11bXSB7XG4gICAgcmV0dXJuIHRoaXMuX2RhdGE7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IGRhdGEoZGF0YTogQWpmVGFibGVDZWxsW11bXSkge1xuICAgIHRoaXMuX2RhdGEgPSB0aGlzLl9maXhEYXRhKGRhdGEpO1xuICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgX2NlbGxwYWRkaW5nOiBzdHJpbmcgPSAnJztcbiAgZ2V0IGNlbGxwYWRkaW5nKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2NlbGxwYWRkaW5nO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBjZWxscGFkZGluZyhjZWxscGFkZGluZzogc3RyaW5nKSB7XG4gICAgdGhpcy5fY2VsbHBhZGRpbmcgPSBjZWxscGFkZGluZztcbiAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBUYWJsZUNvbXBvbmVudC5cbiAgICpcbiAgICpcbiAgICogQG1lbWJlck9mIFRhYmxlQ29tcG9uZW50XG4gICAqL1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9jZHI6IENoYW5nZURldGVjdG9yUmVmLCBwcml2YXRlIF9kb21TYW5pdGl6ZXI6IERvbVNhbml0aXplcikge31cblxuICBwcml2YXRlIF9maXhEYXRhKGRhdGE6IEFqZlRhYmxlQ2VsbFtdW10pOiBBamZUYWJsZUNlbGxbXVtdIHtcbiAgICAoZGF0YSB8fCBbXSkuZm9yRWFjaChlbGVtID0+IHtcbiAgICAgIChlbGVtIHx8IFtdKS5mb3JFYWNoKHN1YkVsZW0gPT4ge1xuICAgICAgICBzdWJFbGVtLnZhbHVlID0gdGhpcy5fZG9tU2FuaXRpemVyLnNhbml0aXplKFxuICAgICAgICAgIFNlY3VyaXR5Q29udGV4dC5IVE1MLFxuICAgICAgICAgIHRoaXMuX2RvbVNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0SHRtbChzdWJFbGVtLnZhbHVlKSxcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHJldHVybiBkYXRhO1xuICB9XG59XG4iLCI8dGFibGUgKm5nSWY9XCJkYXRhXCI+XG4gIDx0ciAqbmdGb3I9XCJsZXQgcm93IG9mIGRhdGFcIj5cbiAgICA8dGQgKm5nRm9yPVwibGV0IGNlbGwgb2Ygcm93XCJcbiAgICAgICAgW2FwcGx5U3R5bGVzXT1cImNlbGwuc3R5bGVcIlxuICAgICAgICBbbmdTdHlsZV09XCJ7J3BhZGRpbmcnOiBjZWxscGFkZGluZ31cIlxuICAgICAgICBbYXR0ci5jb2xzcGFuXT1cImNlbGwuY29sc3BhblwiXG4gICAgICAgIFthdHRyLnJvd3NwYW5dPVwiY2VsbC5yb3dzcGFuXCJcbiAgICAgICAgW2lubmVySFRNTF09XCJjZWxsLnZhbHVlXCI+XG4gICAgPC90ZD5cbiAgPC90cj5cbjwvdGFibGU+XG4iXX0=