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
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, SecurityContext, ViewEncapsulation, } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/platform-browser";
import * as i2 from "@angular/material/sort";
import * as i3 from "@angular/common";
import * as i4 from "@ajf/core/common";
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
        /**
         * data to be shown in the table
         */
        this._data = [];
        /**
         * cellpadding for all rows, include header
         */
        this._cellpadding = '';
        /**
         * Emit an event when sort arrows are selected
         */
        this.sortSelected = new EventEmitter();
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
    /**
     * Sort visible data and emit an event to use for paginated table
     * @param sort
     * @returns
     */
    sortData(sort) {
        if (!sort.active || sort.direction === '') {
            return;
        }
        const sortedData = this._data.slice(1).sort((a, b) => {
            const isAsc = sort.direction === 'asc';
            return this._compare(a[0], b[0], isAsc);
        });
        this._data = [this._data[0], ...sortedData];
        this.sortSelected.emit(sort);
    }
    _compare(a, b, isAsc) {
        return (a.value < b.value ? -1 : 1) * (isAsc ? 1 : -1);
    }
    ngOnDestroy() {
        this.sortSelected.complete();
    }
}
AjfTable.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfTable, deps: [{ token: i0.ChangeDetectorRef }, { token: i1.DomSanitizer }], target: i0.ɵɵFactoryTarget.Component });
AjfTable.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.5", type: AjfTable, selector: "ajf-table", inputs: { data: "data", cellpadding: "cellpadding" }, outputs: { sortSelected: "sortSelected" }, ngImport: i0, template: "<table *ngIf=\"data\" matSort (matSortChange)=\"sortData($event)\">\n  <tr *ngIf=\"data.length > 0\">\n    <th\n      *ngFor=\"let headerCell of data[0]; let idx = index\"\n      [applyStyles]=\"headerCell.style\"\n      [ngStyle]=\"{'padding': cellpadding}\"\n      [attr.colspan]=\"headerCell.colspan\"\n      [attr.rowspan]=\"headerCell.rowspan\"\n      [mat-sort-header]=\"'column' + idx\"\n    >\n      {{headerCell.value}}\n    </th>\n  </tr>\n  <ng-container *ngIf=\"data.length > 1\">\n    <tr *ngFor=\"let row of data.slice(1)\">\n      <td\n        *ngFor=\"let cell of row\"\n        [applyStyles]=\"cell.style\"\n        [ngStyle]=\"{'padding': cellpadding}\"\n        [attr.colspan]=\"cell.colspan\"\n        [attr.rowspan]=\"cell.rowspan\"\n        [innerHTML]=\"cell.value\"\n      ></td>\n    </tr>\n  </ng-container>\n</table>\n", styles: [""], components: [{ type: i2.MatSortHeader, selector: "[mat-sort-header]", inputs: ["disabled", "mat-sort-header", "arrowPosition", "start", "sortActionDescription", "disableClear"], exportAs: ["matSortHeader"] }], directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.MatSort, selector: "[matSort]", inputs: ["matSortDisabled", "matSortActive", "matSortStart", "matSortDirection", "matSortDisableClear"], outputs: ["matSortChange"], exportAs: ["matSort"] }, { type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i4.ApplyStylesDirective, selector: "[applyStyles]", inputs: ["applyStyles"] }, { type: i3.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfTable, decorators: [{
            type: Component,
            args: [{ selector: 'ajf-table', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<table *ngIf=\"data\" matSort (matSortChange)=\"sortData($event)\">\n  <tr *ngIf=\"data.length > 0\">\n    <th\n      *ngFor=\"let headerCell of data[0]; let idx = index\"\n      [applyStyles]=\"headerCell.style\"\n      [ngStyle]=\"{'padding': cellpadding}\"\n      [attr.colspan]=\"headerCell.colspan\"\n      [attr.rowspan]=\"headerCell.rowspan\"\n      [mat-sort-header]=\"'column' + idx\"\n    >\n      {{headerCell.value}}\n    </th>\n  </tr>\n  <ng-container *ngIf=\"data.length > 1\">\n    <tr *ngFor=\"let row of data.slice(1)\">\n      <td\n        *ngFor=\"let cell of row\"\n        [applyStyles]=\"cell.style\"\n        [ngStyle]=\"{'padding': cellpadding}\"\n        [attr.colspan]=\"cell.colspan\"\n        [attr.rowspan]=\"cell.rowspan\"\n        [innerHTML]=\"cell.value\"\n      ></td>\n    </tr>\n  </ng-container>\n</table>\n", styles: [""] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i1.DomSanitizer }]; }, propDecorators: { data: [{
                type: Input
            }], cellpadding: [{
                type: Input
            }], sortSelected: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL3RhYmxlL3NyYy90YWJsZS50cyIsIi4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvdGFibGUvc3JjL3RhYmxlLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUNMLHVCQUF1QixFQUV2QixTQUFTLEVBQ1QsWUFBWSxFQUNaLEtBQUssRUFFTCxNQUFNLEVBQ04sZUFBZSxFQUNmLGlCQUFpQixHQUNsQixNQUFNLGVBQWUsQ0FBQzs7Ozs7O0FBWXZCLE1BQU0sT0FBTyxRQUFRO0lBaUNuQjs7Ozs7T0FLRztJQUNILFlBQW9CLElBQXVCLEVBQVUsYUFBMkI7UUFBNUQsU0FBSSxHQUFKLElBQUksQ0FBbUI7UUFBVSxrQkFBYSxHQUFiLGFBQWEsQ0FBYztRQXRDaEY7O1dBRUc7UUFDSyxVQUFLLEdBQXFCLEVBQUUsQ0FBQztRQVVyQzs7V0FFRztRQUNLLGlCQUFZLEdBQVcsRUFBRSxDQUFDO1FBVWxDOztXQUVHO1FBRU0saUJBQVksR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO0lBUWtDLENBQUM7SUFsQ3BGLElBQUksSUFBSTtRQUNOLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztJQUNwQixDQUFDO0lBQ0QsSUFDSSxJQUFJLENBQUMsSUFBc0I7UUFDN0IsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQU1ELElBQUksV0FBVztRQUNiLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztJQUMzQixDQUFDO0lBQ0QsSUFDSSxXQUFXLENBQUMsV0FBbUI7UUFDakMsSUFBSSxDQUFDLFlBQVksR0FBRyxXQUFXLENBQUM7UUFDaEMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBZ0JPLFFBQVEsQ0FBQyxJQUFzQjtRQUNyQyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDMUIsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUM3QixPQUFPLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUN6QyxlQUFlLENBQUMsSUFBSSxFQUNwQixJQUFJLENBQUMsYUFBYSxDQUFDLHVCQUF1QixDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FDMUQsQ0FBQztZQUNKLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDSCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsUUFBUSxDQUFDLElBQVU7UUFDakIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxFQUFFLEVBQUU7WUFDekMsT0FBTztTQUNSO1FBQ0QsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ25ELE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLEtBQUssS0FBSyxDQUFDO1lBQ3ZDLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzFDLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxVQUFVLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRU8sUUFBUSxDQUFDLENBQWUsRUFBRSxDQUFlLEVBQUUsS0FBYztRQUMvRCxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDL0IsQ0FBQzs7cUdBNUVVLFFBQVE7eUZBQVIsUUFBUSxrSkM1Q3JCLCswQkEwQkE7MkZEa0JhLFFBQVE7a0JBUHBCLFNBQVM7K0JBQ0UsV0FBVyxtQkFHSix1QkFBdUIsQ0FBQyxNQUFNLGlCQUNoQyxpQkFBaUIsQ0FBQyxJQUFJO21JQVdqQyxJQUFJO3NCQURQLEtBQUs7Z0JBY0YsV0FBVztzQkFEZCxLQUFLO2dCQVVHLFlBQVk7c0JBRHBCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE91dHB1dCxcbiAgU2VjdXJpdHlDb250ZXh0LFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1NvcnR9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3NvcnQnO1xuaW1wb3J0IHtEb21TYW5pdGl6ZXJ9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHtBamZUYWJsZUNlbGx9IGZyb20gJy4vdGFibGUtY2VsbCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FqZi10YWJsZScsXG4gIHRlbXBsYXRlVXJsOiAndGFibGUuaHRtbCcsXG4gIHN0eWxlVXJsczogWyd0YWJsZS5zY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxufSlcbmV4cG9ydCBjbGFzcyBBamZUYWJsZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIC8qKlxuICAgKiBkYXRhIHRvIGJlIHNob3duIGluIHRoZSB0YWJsZVxuICAgKi9cbiAgcHJpdmF0ZSBfZGF0YTogQWpmVGFibGVDZWxsW11bXSA9IFtdO1xuICBnZXQgZGF0YSgpOiBBamZUYWJsZUNlbGxbXVtdIHtcbiAgICByZXR1cm4gdGhpcy5fZGF0YTtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgZGF0YShkYXRhOiBBamZUYWJsZUNlbGxbXVtdKSB7XG4gICAgdGhpcy5fZGF0YSA9IHRoaXMuX2ZpeERhdGEoZGF0YSk7XG4gICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgLyoqXG4gICAqIGNlbGxwYWRkaW5nIGZvciBhbGwgcm93cywgaW5jbHVkZSBoZWFkZXJcbiAgICovXG4gIHByaXZhdGUgX2NlbGxwYWRkaW5nOiBzdHJpbmcgPSAnJztcbiAgZ2V0IGNlbGxwYWRkaW5nKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2NlbGxwYWRkaW5nO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBjZWxscGFkZGluZyhjZWxscGFkZGluZzogc3RyaW5nKSB7XG4gICAgdGhpcy5fY2VsbHBhZGRpbmcgPSBjZWxscGFkZGluZztcbiAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICAvKipcbiAgICogRW1pdCBhbiBldmVudCB3aGVuIHNvcnQgYXJyb3dzIGFyZSBzZWxlY3RlZFxuICAgKi9cbiAgQE91dHB1dCgpXG4gIHJlYWRvbmx5IHNvcnRTZWxlY3RlZCA9IG5ldyBFdmVudEVtaXR0ZXI8U29ydD4oKTtcblxuICAvKipcbiAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBUYWJsZUNvbXBvbmVudC5cbiAgICpcbiAgICpcbiAgICogQG1lbWJlck9mIFRhYmxlQ29tcG9uZW50XG4gICAqL1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9jZHI6IENoYW5nZURldGVjdG9yUmVmLCBwcml2YXRlIF9kb21TYW5pdGl6ZXI6IERvbVNhbml0aXplcikge31cblxuICBwcml2YXRlIF9maXhEYXRhKGRhdGE6IEFqZlRhYmxlQ2VsbFtdW10pOiBBamZUYWJsZUNlbGxbXVtdIHtcbiAgICAoZGF0YSB8fCBbXSkuZm9yRWFjaChlbGVtID0+IHtcbiAgICAgIChlbGVtIHx8IFtdKS5mb3JFYWNoKHN1YkVsZW0gPT4ge1xuICAgICAgICBzdWJFbGVtLnZhbHVlID0gdGhpcy5fZG9tU2FuaXRpemVyLnNhbml0aXplKFxuICAgICAgICAgIFNlY3VyaXR5Q29udGV4dC5IVE1MLFxuICAgICAgICAgIHRoaXMuX2RvbVNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0SHRtbChzdWJFbGVtLnZhbHVlKSxcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHJldHVybiBkYXRhO1xuICB9XG5cbiAgLyoqXG4gICAqIFNvcnQgdmlzaWJsZSBkYXRhIGFuZCBlbWl0IGFuIGV2ZW50IHRvIHVzZSBmb3IgcGFnaW5hdGVkIHRhYmxlXG4gICAqIEBwYXJhbSBzb3J0XG4gICAqIEByZXR1cm5zXG4gICAqL1xuICBzb3J0RGF0YShzb3J0OiBTb3J0KTogdm9pZCB7XG4gICAgaWYgKCFzb3J0LmFjdGl2ZSB8fCBzb3J0LmRpcmVjdGlvbiA9PT0gJycpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3Qgc29ydGVkRGF0YSA9IHRoaXMuX2RhdGEuc2xpY2UoMSkuc29ydCgoYSwgYikgPT4ge1xuICAgICAgY29uc3QgaXNBc2MgPSBzb3J0LmRpcmVjdGlvbiA9PT0gJ2FzYyc7XG4gICAgICByZXR1cm4gdGhpcy5fY29tcGFyZShhWzBdLCBiWzBdLCBpc0FzYyk7XG4gICAgfSk7XG4gICAgdGhpcy5fZGF0YSA9IFt0aGlzLl9kYXRhWzBdLCAuLi5zb3J0ZWREYXRhXTtcbiAgICB0aGlzLnNvcnRTZWxlY3RlZC5lbWl0KHNvcnQpO1xuICB9XG5cbiAgcHJpdmF0ZSBfY29tcGFyZShhOiBBamZUYWJsZUNlbGwsIGI6IEFqZlRhYmxlQ2VsbCwgaXNBc2M6IGJvb2xlYW4pIHtcbiAgICByZXR1cm4gKGEudmFsdWUgPCBiLnZhbHVlID8gLTEgOiAxKSAqIChpc0FzYyA/IDEgOiAtMSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnNvcnRTZWxlY3RlZC5jb21wbGV0ZSgpO1xuICB9XG59XG4iLCI8dGFibGUgKm5nSWY9XCJkYXRhXCIgbWF0U29ydCAobWF0U29ydENoYW5nZSk9XCJzb3J0RGF0YSgkZXZlbnQpXCI+XG4gIDx0ciAqbmdJZj1cImRhdGEubGVuZ3RoID4gMFwiPlxuICAgIDx0aFxuICAgICAgKm5nRm9yPVwibGV0IGhlYWRlckNlbGwgb2YgZGF0YVswXTsgbGV0IGlkeCA9IGluZGV4XCJcbiAgICAgIFthcHBseVN0eWxlc109XCJoZWFkZXJDZWxsLnN0eWxlXCJcbiAgICAgIFtuZ1N0eWxlXT1cInsncGFkZGluZyc6IGNlbGxwYWRkaW5nfVwiXG4gICAgICBbYXR0ci5jb2xzcGFuXT1cImhlYWRlckNlbGwuY29sc3BhblwiXG4gICAgICBbYXR0ci5yb3dzcGFuXT1cImhlYWRlckNlbGwucm93c3BhblwiXG4gICAgICBbbWF0LXNvcnQtaGVhZGVyXT1cIidjb2x1bW4nICsgaWR4XCJcbiAgICA+XG4gICAgICB7e2hlYWRlckNlbGwudmFsdWV9fVxuICAgIDwvdGg+XG4gIDwvdHI+XG4gIDxuZy1jb250YWluZXIgKm5nSWY9XCJkYXRhLmxlbmd0aCA+IDFcIj5cbiAgICA8dHIgKm5nRm9yPVwibGV0IHJvdyBvZiBkYXRhLnNsaWNlKDEpXCI+XG4gICAgICA8dGRcbiAgICAgICAgKm5nRm9yPVwibGV0IGNlbGwgb2Ygcm93XCJcbiAgICAgICAgW2FwcGx5U3R5bGVzXT1cImNlbGwuc3R5bGVcIlxuICAgICAgICBbbmdTdHlsZV09XCJ7J3BhZGRpbmcnOiBjZWxscGFkZGluZ31cIlxuICAgICAgICBbYXR0ci5jb2xzcGFuXT1cImNlbGwuY29sc3BhblwiXG4gICAgICAgIFthdHRyLnJvd3NwYW5dPVwiY2VsbC5yb3dzcGFuXCJcbiAgICAgICAgW2lubmVySFRNTF09XCJjZWxsLnZhbHVlXCJcbiAgICAgID48L3RkPlxuICAgIDwvdHI+XG4gIDwvbmctY29udGFpbmVyPlxuPC90YWJsZT5cbiJdfQ==