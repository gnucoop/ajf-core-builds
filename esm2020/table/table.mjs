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
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, SecurityContext, TemplateRef, ViewChild, ViewEncapsulation, } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/platform-browser";
import * as i2 from "@angular/material/dialog";
import * as i3 from "@angular/material/sort";
import * as i4 from "@angular/common";
import * as i5 from "@ajf/core/common";
export class AjfTable {
    /**
     * Creates an instance of TableComponent.
     *
     *
     * @memberOf TableComponent
     */
    constructor(_cdr, _domSanitizer, _dialog) {
        this._cdr = _cdr;
        this._domSanitizer = _domSanitizer;
        this._dialog = _dialog;
        /**
         * data to be shown in the table
         */
        this._data = [];
        /**
         * sorted data to be shown in the table
         */
        this._sortedData = [];
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
        this._sortedData = [...this._data];
        this._cdr.markForCheck();
    }
    get sortedData() {
        return this._sortedData;
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
            this._sortedData = [...this._data];
        }
        else {
            const columnIdx = parseInt(sort.active.slice(-1)) || 0;
            const sortedData = this._data.slice(1).sort((a, b) => {
                const isAsc = sort.direction === 'asc';
                return this._compare(a[columnIdx], b[columnIdx], isAsc);
            });
            this._sortedData = [this._data[0], ...sortedData];
        }
        this.sortSelected.emit(sort);
    }
    _compare(a, b, isAsc) {
        return (a.value < b.value ? -1 : 1) * (isAsc ? 1 : -1);
    }
    /**
     * open a dialog when click on cell, if dialogHtmlContent is valid
     * @param dialogHtmlContent the html to show in the dialog
     */
    openDialog(dialogHtmlContent) {
        if (dialogHtmlContent) {
            const dialogConfig = {
                data: {
                    content: dialogHtmlContent,
                },
            };
            this._dialog.open(this.dialogContent, dialogConfig);
        }
    }
    ngOnDestroy() {
        this.sortSelected.complete();
    }
}
AjfTable.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfTable, deps: [{ token: i0.ChangeDetectorRef }, { token: i1.DomSanitizer }, { token: i2.MatDialog }], target: i0.ɵɵFactoryTarget.Component });
AjfTable.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.5", type: AjfTable, selector: "ajf-table", inputs: { data: "data", cellpadding: "cellpadding" }, outputs: { sortSelected: "sortSelected" }, viewQueries: [{ propertyName: "dialogContent", first: true, predicate: ["dialogContent"], descendants: true, read: TemplateRef }], ngImport: i0, template: "<table *ngIf=\"sortedData\" matSort (matSortChange)=\"sortData($event)\">\n  <tr *ngIf=\"sortedData.length > 0\">\n    <th\n      *ngFor=\"let headerCell of sortedData[0]; let idx = index\"\n      [applyStyles]=\"headerCell.style\"\n      [ngStyle]=\"{'padding': cellpadding}\"\n      [attr.colspan]=\"headerCell.colspan\"\n      [attr.rowspan]=\"headerCell.rowspan\"\n      [mat-sort-header]=\"'column' + idx\"\n    >\n      {{headerCell.value}}\n    </th>\n  </tr>\n  <ng-container *ngIf=\"sortedData.length > 1\">\n    <tr *ngFor=\"let row of sortedData.slice(1)\">\n      <td\n        *ngFor=\"let cell of row\"\n        [applyStyles]=\"cell.style\"\n        [ngStyle]=\"{'padding': cellpadding}\"\n        [attr.colspan]=\"cell.colspan\"\n        [attr.rowspan]=\"cell.rowspan\"\n        [innerHTML]=\"cell.value\"\n        (click)=\"openDialog(cell.dialogHtml)\"\n      ></td>\n    </tr>\n  </ng-container>\n</table>\n\n<ng-template #dialogContent let-data>\n  <div [innerHTML]=\"data.content\"></div>\n</ng-template>\n", styles: [""], components: [{ type: i3.MatSortHeader, selector: "[mat-sort-header]", inputs: ["disabled", "mat-sort-header", "arrowPosition", "start", "sortActionDescription", "disableClear"], exportAs: ["matSortHeader"] }], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3.MatSort, selector: "[matSort]", inputs: ["matSortDisabled", "matSortActive", "matSortStart", "matSortDirection", "matSortDisableClear"], outputs: ["matSortChange"], exportAs: ["matSort"] }, { type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i5.ApplyStylesDirective, selector: "[applyStyles]", inputs: ["applyStyles"] }, { type: i4.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfTable, decorators: [{
            type: Component,
            args: [{ selector: 'ajf-table', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<table *ngIf=\"sortedData\" matSort (matSortChange)=\"sortData($event)\">\n  <tr *ngIf=\"sortedData.length > 0\">\n    <th\n      *ngFor=\"let headerCell of sortedData[0]; let idx = index\"\n      [applyStyles]=\"headerCell.style\"\n      [ngStyle]=\"{'padding': cellpadding}\"\n      [attr.colspan]=\"headerCell.colspan\"\n      [attr.rowspan]=\"headerCell.rowspan\"\n      [mat-sort-header]=\"'column' + idx\"\n    >\n      {{headerCell.value}}\n    </th>\n  </tr>\n  <ng-container *ngIf=\"sortedData.length > 1\">\n    <tr *ngFor=\"let row of sortedData.slice(1)\">\n      <td\n        *ngFor=\"let cell of row\"\n        [applyStyles]=\"cell.style\"\n        [ngStyle]=\"{'padding': cellpadding}\"\n        [attr.colspan]=\"cell.colspan\"\n        [attr.rowspan]=\"cell.rowspan\"\n        [innerHTML]=\"cell.value\"\n        (click)=\"openDialog(cell.dialogHtml)\"\n      ></td>\n    </tr>\n  </ng-container>\n</table>\n\n<ng-template #dialogContent let-data>\n  <div [innerHTML]=\"data.content\"></div>\n</ng-template>\n", styles: [""] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i1.DomSanitizer }, { type: i2.MatDialog }]; }, propDecorators: { data: [{
                type: Input
            }], cellpadding: [{
                type: Input
            }], sortSelected: [{
                type: Output
            }], dialogContent: [{
                type: ViewChild,
                args: ['dialogContent', { read: TemplateRef }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL3RhYmxlL3NyYy90YWJsZS50cyIsIi4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvdGFibGUvc3JjL3RhYmxlLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUNMLHVCQUF1QixFQUV2QixTQUFTLEVBQ1QsWUFBWSxFQUNaLEtBQUssRUFFTCxNQUFNLEVBQ04sZUFBZSxFQUNmLFdBQVcsRUFDWCxTQUFTLEVBQ1QsaUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDOzs7Ozs7O0FBYXZCLE1BQU0sT0FBTyxRQUFRO0lBNENuQjs7Ozs7T0FLRztJQUNILFlBQ1UsSUFBdUIsRUFDdkIsYUFBMkIsRUFDM0IsT0FBa0I7UUFGbEIsU0FBSSxHQUFKLElBQUksQ0FBbUI7UUFDdkIsa0JBQWEsR0FBYixhQUFhLENBQWM7UUFDM0IsWUFBTyxHQUFQLE9BQU8sQ0FBVztRQXBENUI7O1dBRUc7UUFDSyxVQUFLLEdBQXFCLEVBQUUsQ0FBQztRQVdyQzs7V0FFRztRQUNLLGdCQUFXLEdBQXFCLEVBQUUsQ0FBQztRQUszQzs7V0FFRztRQUNLLGlCQUFZLEdBQVcsRUFBRSxDQUFDO1FBVWxDOztXQUVHO1FBRU0saUJBQVksR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO0lBYzlDLENBQUM7SUFqREosSUFBSSxJQUFJO1FBQ04sT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3BCLENBQUM7SUFDRCxJQUNJLElBQUksQ0FBQyxJQUFzQjtRQUM3QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ25DLElBQUksQ0FBQyxJQUFJLENB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SUFDL0IsQ0FBQzs7cUdBNUdVLFFBQVE7eUZBQVIsUUFBUSw2T0EwQ2dCLFdBQVcsNkJDekZoRCxtZ0NBK0JBOzJGRGdCYSxRQUFRO2tCQVBwQixTQUFTOytCQUNFLFdBQVcsbUJBR0osdUJBQXVCLENBQUMsTUFBTSxpQkFDaEMsaUJBQWlCLENBQUMsSUFBSTsySkFXakMsSUFBSTtzQkFEUCxLQUFLO2dCQXVCRixXQUFXO3NCQURkLEtBQUs7Z0JBVUcsWUFBWTtzQkFEcEIsTUFBTTtnQkFHMEMsYUFBYTtzQkFBN0QsU0FBUzt1QkFBQyxlQUFlLEVBQUUsRUFBQyxJQUFJLEVBQUUsV0FBVyxFQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPdXRwdXQsXG4gIFNlY3VyaXR5Q29udGV4dCxcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtNYXREaWFsb2csIE1hdERpYWxvZ0NvbmZpZ30gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcbmltcG9ydCB7U29ydH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc29ydCc7XG5pbXBvcnQge0RvbVNhbml0aXplcn0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQge0FqZlRhYmxlQ2VsbH0gZnJvbSAnLi90YWJsZS1jZWxsJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWpmLXRhYmxlJyxcbiAgdGVtcGxhdGVVcmw6ICd0YWJsZS5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ3RhYmxlLnNjc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG59KVxuZXhwb3J0IGNsYXNzIEFqZlRhYmxlIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgLyoqXG4gICAqIGRhdGEgdG8gYmUgc2hvd24gaW4gdGhlIHRhYmxlXG4gICAqL1xuICBwcml2YXRlIF9kYXRhOiBBamZUYWJsZUNlbGxbXVtdID0gW107XG4gIGdldCBkYXRhKCk6IEFqZlRhYmxlQ2VsbFtdW10ge1xuICAgIHJldHVybiB0aGlzLl9kYXRhO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBkYXRhKGRhdGE6IEFqZlRhYmxlQ2VsbFtdW10pIHtcbiAgICB0aGlzLl9kYXRhID0gdGhpcy5fZml4RGF0YShkYXRhKTtcbiAgICB0aGlzLl9zb3J0ZWREYXRhID0gWy4uLnRoaXMuX2RhdGFdO1xuICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBzb3J0ZWQgZGF0YSB0byBiZSBzaG93biBpbiB0aGUgdGFibGVcbiAgICovXG4gIHByaXZhdGUgX3NvcnRlZERhdGE6IEFqZlRhYmxlQ2VsbFtdW10gPSBbXTtcbiAgZ2V0IHNvcnRlZERhdGEoKTogQWpmVGFibGVDZWxsW11bXSB7XG4gICAgcmV0dXJuIHRoaXMuX3NvcnRlZERhdGE7XG4gIH1cblxuICAvKipcbiAgICogY2VsbHBhZGRpbmcgZm9yIGFsbCByb3dzLCBpbmNsdWRlIGhlYWRlclxuICAgKi9cbiAgcHJpdmF0ZSBfY2VsbHBhZGRpbmc6IHN0cmluZyA9ICcnO1xuICBnZXQgY2VsbHBhZGRpbmcoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fY2VsbHBhZGRpbmc7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IGNlbGxwYWRkaW5nKGNlbGxwYWRkaW5nOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9jZWxscGFkZGluZyA9IGNlbGxwYWRkaW5nO1xuICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFbWl0IGFuIGV2ZW50IHdoZW4gc29ydCBhcnJvd3MgYXJlIHNlbGVjdGVkXG4gICAqL1xuICBAT3V0cHV0KClcbiAgcmVhZG9ubHkgc29ydFNlbGVjdGVkID0gbmV3IEV2ZW50RW1pdHRlcjxTb3J0PigpO1xuXG4gIEBWaWV3Q2hpbGQoJ2RpYWxvZ0NvbnRlbnQnLCB7cmVhZDogVGVtcGxhdGVSZWZ9KSBkaWFsb2dDb250ZW50ITogVGVtcGxhdGVSZWY8SFRNTEVsZW1lbnQ+O1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIFRhYmxlQ29tcG9uZW50LlxuICAgKlxuICAgKlxuICAgKiBAbWVtYmVyT2YgVGFibGVDb21wb25lbnRcbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgX2NkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJpdmF0ZSBfZG9tU2FuaXRpemVyOiBEb21TYW5pdGl6ZXIsXG4gICAgcHJpdmF0ZSBfZGlhbG9nOiBNYXREaWFsb2csXG4gICkge31cblxuICBwcml2YXRlIF9maXhEYXRhKGRhdGE6IEFqZlRhYmxlQ2VsbFtdW10pOiBBamZUYWJsZUNlbGxbXVtdIHtcbiAgICAoZGF0YSB8fCBbXSkuZm9yRWFjaChlbGVtID0+IHtcbiAgICAgIChlbGVtIHx8IFtdKS5mb3JFYWNoKHN1YkVsZW0gPT4ge1xuICAgICAgICBzdWJFbGVtLnZhbHVlID0gdGhpcy5fZG9tU2FuaXRpemVyLnNhbml0aXplKFxuICAgICAgICAgIFNlY3VyaXR5Q29udGV4dC5IVE1MLFxuICAgICAgICAgIHRoaXMuX2RvbVNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0SHRtbChzdWJFbGVtLnZhbHVlKSxcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHJldHVybiBkYXRhO1xuICB9XG5cbiAgLyoqXG4gICAqIFNvcnQgdmlzaWJsZSBkYXRhIGFuZCBlbWl0IGFuIGV2ZW50IHRvIHVzZSBmb3IgcGFnaW5hdGVkIHRhYmxlXG4gICAqIEBwYXJhbSBzb3J0XG4gICAqIEByZXR1cm5zXG4gICAqL1xuICBzb3J0RGF0YShzb3J0OiBTb3J0KTogdm9pZCB7XG4gICAgaWYgKCFzb3J0LmFjdGl2ZSB8fCBzb3J0LmRpcmVjdGlvbiA9PT0gJycpIHtcbiAgICAgIHRoaXMuX3NvcnRlZERhdGEgPSBbLi4udGhpcy5fZGF0YV07XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGNvbHVtbklkeCA9IHBhcnNlSW50KHNvcnQuYWN0aXZlLnNsaWNlKC0xKSkgfHwgMDtcbiAgICAgIGNvbnN0IHNvcnRlZERhdGEgPSB0aGlzLl9kYXRhLnNsaWNlKDEpLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgY29uc3QgaXNBc2MgPSBzb3J0LmRpcmVjdGlvbiA9PT0gJ2FzYyc7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb21wYXJlKGFbY29sdW1uSWR4XSwgYltjb2x1bW5JZHhdLCBpc0FzYyk7XG4gICAgICB9KTtcbiAgICAgIHRoaXMuX3NvcnRlZERhdGEgPSBbdGhpcy5fZGF0YVswXSwgLi4uc29ydGVkRGF0YV07XG4gICAgfVxuICAgIHRoaXMuc29ydFNlbGVjdGVkLmVtaXQoc29ydCk7XG4gIH1cblxuICBwcml2YXRlIF9jb21wYXJlKGE6IEFqZlRhYmxlQ2VsbCwgYjogQWpmVGFibGVDZWxsLCBpc0FzYzogYm9vbGVhbikge1xuICAgIHJldHVybiAoYS52YWx1ZSA8IGIudmFsdWUgPyAtMSA6IDEpICogKGlzQXNjID8gMSA6IC0xKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBvcGVuIGEgZGlhbG9nIHdoZW4gY2xpY2sgb24gY2VsbCwgaWYgZGlhbG9nSHRtbENvbnRlbnQgaXMgdmFsaWRcbiAgICogQHBhcmFtIGRpYWxvZ0h0bWxDb250ZW50IHRoZSBodG1sIHRvIHNob3cgaW4gdGhlIGRpYWxvZ1xuICAgKi9cbiAgb3BlbkRpYWxvZyhkaWFsb2dIdG1sQ29udGVudDogc3RyaW5nIHwgdW5kZWZpbmVkKTogdm9pZCB7XG4gICAgaWYgKGRpYWxvZ0h0bWxDb250ZW50KSB7XG4gICAgICBjb25zdCBkaWFsb2dDb25maWcgPSB7XG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICBjb250ZW50OiBkaWFsb2dIdG1sQ29udGVudCxcbiAgICAgICAgfSxcbiAgICAgIH0gYXMgTWF0RGlhbG9nQ29uZmlnO1xuICAgICAgdGhpcy5fZGlhbG9nLm9wZW4odGhpcy5kaWFsb2dDb250ZW50LCBkaWFsb2dDb25maWcpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuc29ydFNlbGVjdGVkLmNvbXBsZXRlKCk7XG4gIH1cbn1cbiIsIjx0YWJsZSAqbmdJZj1cInNvcnRlZERhdGFcIiBtYXRTb3J0IChtYXRTb3J0Q2hhbmdlKT1cInNvcnREYXRhKCRldmVudClcIj5cbiAgPHRyICpuZ0lmPVwic29ydGVkRGF0YS5sZW5ndGggPiAwXCI+XG4gICAgPHRoXG4gICAgICAqbmdGb3I9XCJsZXQgaGVhZGVyQ2VsbCBvZiBzb3J0ZWREYXRhWzBdOyBsZXQgaWR4ID0gaW5kZXhcIlxuICAgICAgW2FwcGx5U3R5bGVzXT1cImhlYWRlckNlbGwuc3R5bGVcIlxuICAgICAgW25nU3R5bGVdPVwieydwYWRkaW5nJzogY2VsbHBhZGRpbmd9XCJcbiAgICAgIFthdHRyLmNvbHNwYW5dPVwiaGVhZGVyQ2VsbC5jb2xzcGFuXCJcbiAgICAgIFthdHRyLnJvd3NwYW5dPVwiaGVhZGVyQ2VsbC5yb3dzcGFuXCJcbiAgICAgIFttYXQtc29ydC1oZWFkZXJdPVwiJ2NvbHVtbicgKyBpZHhcIlxuICAgID5cbiAgICAgIHt7aGVhZGVyQ2VsbC52YWx1ZX19XG4gICAgPC90aD5cbiAgPC90cj5cbiAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInNvcnRlZERhdGEubGVuZ3RoID4gMVwiPlxuICAgIDx0ciAqbmdGb3I9XCJsZXQgcm93IG9mIHNvcnRlZERhdGEuc2xpY2UoMSlcIj5cbiAgICAgIDx0ZFxuICAgICAgICAqbmdGb3I9XCJsZXQgY2VsbCBvZiByb3dcIlxuICAgICAgICBbYXBwbHlTdHlsZXNdPVwiY2VsbC5zdHlsZVwiXG4gICAgICAgIFtuZ1N0eWxlXT1cInsncGFkZGluZyc6IGNlbGxwYWRkaW5nfVwiXG4gICAgICAgIFthdHRyLmNvbHNwYW5dPVwiY2VsbC5jb2xzcGFuXCJcbiAgICAgICAgW2F0dHIucm93c3Bhbl09XCJjZWxsLnJvd3NwYW5cIlxuICAgICAgICBbaW5uZXJIVE1MXT1cImNlbGwudmFsdWVcIlxuICAgICAgICAoY2xpY2spPVwib3BlbkRpYWxvZyhjZWxsLmRpYWxvZ0h0bWwpXCJcbiAgICAgID48L3RkPlxuICAgIDwvdHI+XG4gIDwvbmctY29udGFpbmVyPlxuPC90YWJsZT5cblxuPG5nLXRlbXBsYXRlICNkaWFsb2dDb250ZW50IGxldC1kYXRhPlxuICA8ZGl2IFtpbm5lckhUTUxdPVwiZGF0YS5jb250ZW50XCI+PC9kaXY+XG48L25nLXRlbXBsYXRlPlxuIl19