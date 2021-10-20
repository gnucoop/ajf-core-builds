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
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, ViewEncapsulation, } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
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
                subElem.value = this._domSanitizer.bypassSecurityTrustHtml(subElem.value);
            });
        });
        return data;
    }
}
AjfTable.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfTable, deps: [{ token: i0.ChangeDetectorRef }, { token: i1.DomSanitizer }], target: i0.ɵɵFactoryTarget.Component });
AjfTable.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.0-next.15", type: AjfTable, selector: "ajf-table", inputs: { data: "data", cellpadding: "cellpadding" }, ngImport: i0, template: "<table *ngIf=\"data\">\n  <tr *ngFor=\"let row of data\">\n    <td *ngFor=\"let cell of row\"\n        [applyStyles]=\"cell.style\"\n        [ngStyle]=\"{'padding': cellpadding}\"\n        [attr.colspan]=\"cell.colspan\"\n        [attr.rowspan]=\"cell.rowspan\"\n        [innerHTML]=\"cell.value\">\n    </td>\n  </tr>\n</table>\n", styles: ["\n"], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i3.ApplyStylesDirective, selector: "[applyStyles]", inputs: ["applyStyles"] }, { type: i2.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfTable, decorators: [{
            type: Component,
            args: [{ selector: 'ajf-table', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<table *ngIf=\"data\">\n  <tr *ngFor=\"let row of data\">\n    <td *ngFor=\"let cell of row\"\n        [applyStyles]=\"cell.style\"\n        [ngStyle]=\"{'padding': cellpadding}\"\n        [attr.colspan]=\"cell.colspan\"\n        [attr.rowspan]=\"cell.rowspan\"\n        [innerHTML]=\"cell.value\">\n    </td>\n  </tr>\n</table>\n", styles: ["\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i1.DomSanitizer }]; }, propDecorators: { data: [{
                type: Input
            }], cellpadding: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS90YWJsZS90YWJsZS50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL3RhYmxlL3RhYmxlLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULEtBQUssRUFDTCxpQkFBaUIsR0FDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLDJCQUEyQixDQUFDOzs7OztBQVd2RCxNQUFNLE9BQU8sUUFBUTtJQXFCbkI7Ozs7O09BS0c7SUFDSCxZQUFvQixJQUF1QixFQUFVLGFBQTJCO1FBQTVELFNBQUksR0FBSixJQUFJLENBQW1CO1FBQVUsa0JBQWEsR0FBYixhQUFhLENBQWM7SUFBRyxDQUFDO0lBekJwRixJQUFJLElBQUk7UUFDTixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDcEIsQ0FBQztJQUNELElBQ0ksSUFBSSxDQUFDLElBQXNCO1FBQzdCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFHRCxJQUFJLFdBQVc7UUFDYixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDM0IsQ0FBQztJQUNELElBQ0ksV0FBVyxDQUFDLFdBQW1CO1FBQ2pDLElBQUksQ0FBQyxZQUFZLEdBQUcsV0FBVyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQVVPLFFBQVEsQ0FBQyxJQUFzQjtRQUNyQyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDMUIsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUM3QixPQUFPLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsdUJBQXVCLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzVFLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDSCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7OzZHQXBDVSxRQUFRO2lHQUFSLFFBQVEsdUdDeENyQiw0VUFXQTttR0Q2QmEsUUFBUTtrQkFQcEIsU0FBUzsrQkFDRSxXQUFXLG1CQUdKLHVCQUF1QixDQUFDLE1BQU0saUJBQ2hDLGlCQUFpQixDQUFDLElBQUk7bUlBUWpDLElBQUk7c0JBRFAsS0FBSztnQkFXRixXQUFXO3NCQURkLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtEb21TYW5pdGl6ZXJ9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG5pbXBvcnQge0FqZlRhYmxlQ2VsbH0gZnJvbSAnLi90YWJsZS1jZWxsJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWpmLXRhYmxlJyxcbiAgdGVtcGxhdGVVcmw6ICd0YWJsZS5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ3RhYmxlLmNzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbn0pXG5leHBvcnQgY2xhc3MgQWpmVGFibGUge1xuICBwcml2YXRlIF9kYXRhOiBBamZUYWJsZUNlbGxbXVtdO1xuICBnZXQgZGF0YSgpOiBBamZUYWJsZUNlbGxbXVtdIHtcbiAgICByZXR1cm4gdGhpcy5fZGF0YTtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgZGF0YShkYXRhOiBBamZUYWJsZUNlbGxbXVtdKSB7XG4gICAgdGhpcy5fZGF0YSA9IHRoaXMuX2ZpeERhdGEoZGF0YSk7XG4gICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfY2VsbHBhZGRpbmc6IHN0cmluZztcbiAgZ2V0IGNlbGxwYWRkaW5nKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2NlbGxwYWRkaW5nO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBjZWxscGFkZGluZyhjZWxscGFkZGluZzogc3RyaW5nKSB7XG4gICAgdGhpcy5fY2VsbHBhZGRpbmcgPSBjZWxscGFkZGluZztcbiAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBUYWJsZUNvbXBvbmVudC5cbiAgICpcbiAgICpcbiAgICogQG1lbWJlck9mIFRhYmxlQ29tcG9uZW50XG4gICAqL1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9jZHI6IENoYW5nZURldGVjdG9yUmVmLCBwcml2YXRlIF9kb21TYW5pdGl6ZXI6IERvbVNhbml0aXplcikge31cblxuICBwcml2YXRlIF9maXhEYXRhKGRhdGE6IEFqZlRhYmxlQ2VsbFtdW10pOiBBamZUYWJsZUNlbGxbXVtdIHtcbiAgICAoZGF0YSB8fCBbXSkuZm9yRWFjaChlbGVtID0+IHtcbiAgICAgIChlbGVtIHx8IFtdKS5mb3JFYWNoKHN1YkVsZW0gPT4ge1xuICAgICAgICBzdWJFbGVtLnZhbHVlID0gdGhpcy5fZG9tU2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RIdG1sKHN1YkVsZW0udmFsdWUpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cbn1cbiIsIjx0YWJsZSAqbmdJZj1cImRhdGFcIj5cbiAgPHRyICpuZ0Zvcj1cImxldCByb3cgb2YgZGF0YVwiPlxuICAgIDx0ZCAqbmdGb3I9XCJsZXQgY2VsbCBvZiByb3dcIlxuICAgICAgICBbYXBwbHlTdHlsZXNdPVwiY2VsbC5zdHlsZVwiXG4gICAgICAgIFtuZ1N0eWxlXT1cInsncGFkZGluZyc6IGNlbGxwYWRkaW5nfVwiXG4gICAgICAgIFthdHRyLmNvbHNwYW5dPVwiY2VsbC5jb2xzcGFuXCJcbiAgICAgICAgW2F0dHIucm93c3Bhbl09XCJjZWxsLnJvd3NwYW5cIlxuICAgICAgICBbaW5uZXJIVE1MXT1cImNlbGwudmFsdWVcIj5cbiAgICA8L3RkPlxuICA8L3RyPlxuPC90YWJsZT5cbiJdfQ==