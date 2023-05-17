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
import * as i3 from "@ajf/core/common";
import * as i4 from "@angular/common";
import * as i5 from "@angular/material/sort";
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
AjfTable.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfTable, deps: [{ token: i0.ChangeDetectorRef }, { token: i1.DomSanitizer }, { token: i2.MatDialog }], target: i0.ɵɵFactoryTarget.Component });
AjfTable.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.4", type: AjfTable, selector: "ajf-table", inputs: { data: "data", cellpadding: "cellpadding" }, outputs: { sortSelected: "sortSelected" }, viewQueries: [{ propertyName: "dialogContent", first: true, predicate: ["dialogContent"], descendants: true, read: TemplateRef }], ngImport: i0, template: "<table *ngIf=\"sortedData\" matSort (matSortChange)=\"sortData($event)\">\n  <tr *ngIf=\"sortedData.length > 0\">\n    <ng-container *ngFor=\"let headerCell of sortedData[0]; let idx = index\">\n      <ng-container *ngIf=\"headerCell.sorted; else noSortedHeader\">\n        <th\n          [applyStyles]=\"headerCell.style\"\n          [ngStyle]=\"{'padding': cellpadding}\"\n          [attr.colspan]=\"headerCell.colspan\"\n          [attr.rowspan]=\"headerCell.rowspan\"\n          [mat-sort-header]=\"'column' + idx\"\n        >\n          {{headerCell.value}}\n        </th>\n      </ng-container>\n      <ng-template #noSortedHeader>\n        <th\n          [applyStyles]=\"headerCell.style\"\n          [ngStyle]=\"{'padding': cellpadding}\"\n          [attr.colspan]=\"headerCell.colspan\"\n          [attr.rowspan]=\"headerCell.rowspan\"\n        >\n          {{headerCell.value}}\n        </th>\n      </ng-template>\n    </ng-container>\n  </tr>\n  <ng-container *ngIf=\"sortedData.length > 1\">\n    <tr *ngFor=\"let row of sortedData.slice(1)\">\n      <td\n        *ngFor=\"let cell of row\"\n        [applyStyles]=\"cell.style\"\n        [ngStyle]=\"{'padding': cellpadding}\"\n        [attr.colspan]=\"cell.colspan\"\n        [attr.rowspan]=\"cell.rowspan\"\n        [innerHTML]=\"cell.value\"\n        (click)=\"openDialog(cell.dialogHtml)\"\n      ></td>\n    </tr>\n  </ng-container>\n</table>\n\n<ng-template #dialogContent let-data>\n  <div [innerHTML]=\"data.content\"></div>\n</ng-template>\n", styles: ["ajf-table{display:block;width:100%;overflow-x:auto}ajf-table table{min-width:100%}\n"], dependencies: [{ kind: "directive", type: i3.ApplyStylesDirective, selector: "[applyStyles]", inputs: ["applyStyles"] }, { kind: "directive", type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i4.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i5.MatSort, selector: "[matSort]", inputs: ["matSortDisabled", "matSortActive", "matSortStart", "matSortDirection", "matSortDisableClear"], outputs: ["matSortChange"], exportAs: ["matSort"] }, { kind: "component", type: i5.MatSortHeader, selector: "[mat-sort-header]", inputs: ["disabled", "mat-sort-header", "arrowPosition", "start", "sortActionDescription", "disableClear"], exportAs: ["matSortHeader"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfTable, decorators: [{
            type: Component,
            args: [{ selector: 'ajf-table', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<table *ngIf=\"sortedData\" matSort (matSortChange)=\"sortData($event)\">\n  <tr *ngIf=\"sortedData.length > 0\">\n    <ng-container *ngFor=\"let headerCell of sortedData[0]; let idx = index\">\n      <ng-container *ngIf=\"headerCell.sorted; else noSortedHeader\">\n        <th\n          [applyStyles]=\"headerCell.style\"\n          [ngStyle]=\"{'padding': cellpadding}\"\n          [attr.colspan]=\"headerCell.colspan\"\n          [attr.rowspan]=\"headerCell.rowspan\"\n          [mat-sort-header]=\"'column' + idx\"\n        >\n          {{headerCell.value}}\n        </th>\n      </ng-container>\n      <ng-template #noSortedHeader>\n        <th\n          [applyStyles]=\"headerCell.style\"\n          [ngStyle]=\"{'padding': cellpadding}\"\n          [attr.colspan]=\"headerCell.colspan\"\n          [attr.rowspan]=\"headerCell.rowspan\"\n        >\n          {{headerCell.value}}\n        </th>\n      </ng-template>\n    </ng-container>\n  </tr>\n  <ng-container *ngIf=\"sortedData.length > 1\">\n    <tr *ngFor=\"let row of sortedData.slice(1)\">\n      <td\n        *ngFor=\"let cell of row\"\n        [applyStyles]=\"cell.style\"\n        [ngStyle]=\"{'padding': cellpadding}\"\n        [attr.colspan]=\"cell.colspan\"\n        [attr.rowspan]=\"cell.rowspan\"\n        [innerHTML]=\"cell.value\"\n        (click)=\"openDialog(cell.dialogHtml)\"\n      ></td>\n    </tr>\n  </ng-container>\n</table>\n\n<ng-template #dialogContent let-data>\n  <div [innerHTML]=\"data.content\"></div>\n</ng-template>\n", styles: ["ajf-table{display:block;width:100%;overflow-x:auto}ajf-table table{min-width:100%}\n"] }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL3RhYmxlL3NyYy90YWJsZS50cyIsIi4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvdGFibGUvc3JjL3RhYmxlLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUNMLHVCQUF1QixFQUV2QixTQUFTLEVBQ1QsWUFBWSxFQUNaLEtBQUssRUFFTCxNQUFNLEVBQ04sZUFBZSxFQUNmLFdBQVcsRUFDWCxTQUFTLEVBQ1QsaUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDOzs7Ozs7O0FBYXZCLE1BQU0sT0FBTyxRQUFRO0lBNENuQjs7Ozs7T0FLRztJQUNILFlBQ1UsSUFBdUIsRUFDdkIsYUFBMkIsRUFDM0IsT0FBa0I7UUFGbEIsU0FBSSxHQUFKLElBQUksQ0FBbUI7UUFDdkIsa0JBQWEsR0FBYixhQUFhLENBQWM7UUFDM0IsWUFBTyxHQUFQLE9BQU8sQ0FBVztRQXBENUI7O1dBRUc7UUFDSyxVQUFLLEdBQXFCLEVBQUUsQ0FBQztRQVdyQzs7V0FFRztRQUNLLGdCQUFXLEdBQXFCLEVBQUUsQ0FBQztRQUszQzs7V0FFRztRQUNLLGlCQUFZLEdBQVcsRUFBRSxDQUFDO1FBVWxDOztXQUVHO1FBRU0saUJBQVksR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO0lBYzlDLENBQUM7SUFqREosSUFBSSxJQUFJO1FBQ04sT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3BCLENBQUM7SUFDRCxJQUNJLElBQUksQ0FBQyxJQUFzQjtRQUM3QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ25DLElBQUksQ0FBQyxJQUFJLENB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SUFDL0IsQ0FBQzs7cUdBNUdVLFFBQVE7eUZBQVIsUUFBUSw2T0EwQ2dCLFdBQVcsNkJDekZoRCwyK0NBNENBOzJGREdhLFFBQVE7a0JBUHBCLFNBQVM7K0JBQ0UsV0FBVyxtQkFHSix1QkFBdUIsQ0FBQyxNQUFNLGlCQUNoQyxpQkFBaUIsQ0FBQyxJQUFJOzJKQVdqQyxJQUFJO3NCQURQLEtBQUs7Z0JBdUJGLFdBQVc7c0JBRGQsS0FBSztnQkFVRyxZQUFZO3NCQURwQixNQUFNO2dCQUcwQyxhQUFhO3NCQUE3RCxTQUFTO3VCQUFDLGVBQWUsRUFBRSxFQUFDLElBQUksRUFBRSxXQUFXLEVBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE91dHB1dCxcbiAgU2VjdXJpdHlDb250ZXh0LFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0NoaWxkLFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01hdERpYWxvZywgTWF0RGlhbG9nQ29uZmlnfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xuaW1wb3J0IHtTb3J0fSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9zb3J0JztcbmltcG9ydCB7RG9tU2FuaXRpemVyfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7QWpmVGFibGVDZWxsfSBmcm9tICcuL3RhYmxlLWNlbGwnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhamYtdGFibGUnLFxuICB0ZW1wbGF0ZVVybDogJ3RhYmxlLmh0bWwnLFxuICBzdHlsZVVybHM6IFsndGFibGUuc2NzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbn0pXG5leHBvcnQgY2xhc3MgQWpmVGFibGUgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICAvKipcbiAgICogZGF0YSB0byBiZSBzaG93biBpbiB0aGUgdGFibGVcbiAgICovXG4gIHByaXZhdGUgX2RhdGE6IEFqZlRhYmxlQ2VsbFtdW10gPSBbXTtcbiAgZ2V0IGRhdGEoKTogQWpmVGFibGVDZWxsW11bXSB7XG4gICAgcmV0dXJuIHRoaXMuX2RhdGE7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IGRhdGEoZGF0YTogQWpmVGFibGVDZWxsW11bXSkge1xuICAgIHRoaXMuX2RhdGEgPSB0aGlzLl9maXhEYXRhKGRhdGEpO1xuICAgIHRoaXMuX3NvcnRlZERhdGEgPSBbLi4udGhpcy5fZGF0YV07XG4gICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgLyoqXG4gICAqIHNvcnRlZCBkYXRhIHRvIGJlIHNob3duIGluIHRoZSB0YWJsZVxuICAgKi9cbiAgcHJpdmF0ZSBfc29ydGVkRGF0YTogQWpmVGFibGVDZWxsW11bXSA9IFtdO1xuICBnZXQgc29ydGVkRGF0YSgpOiBBamZUYWJsZUNlbGxbXVtdIHtcbiAgICByZXR1cm4gdGhpcy5fc29ydGVkRGF0YTtcbiAgfVxuXG4gIC8qKlxuICAgKiBjZWxscGFkZGluZyBmb3IgYWxsIHJvd3MsIGluY2x1ZGUgaGVhZGVyXG4gICAqL1xuICBwcml2YXRlIF9jZWxscGFkZGluZzogc3RyaW5nID0gJyc7XG4gIGdldCBjZWxscGFkZGluZygpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9jZWxscGFkZGluZztcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgY2VsbHBhZGRpbmcoY2VsbHBhZGRpbmc6IHN0cmluZykge1xuICAgIHRoaXMuX2NlbGxwYWRkaW5nID0gY2VsbHBhZGRpbmc7XG4gICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEVtaXQgYW4gZXZlbnQgd2hlbiBzb3J0IGFycm93cyBhcmUgc2VsZWN0ZWRcbiAgICovXG4gIEBPdXRwdXQoKVxuICByZWFkb25seSBzb3J0U2VsZWN0ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPFNvcnQ+KCk7XG5cbiAgQFZpZXdDaGlsZCgnZGlhbG9nQ29udGVudCcsIHtyZWFkOiBUZW1wbGF0ZVJlZn0pIGRpYWxvZ0NvbnRlbnQhOiBUZW1wbGF0ZVJlZjxIVE1MRWxlbWVudD47XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgVGFibGVDb21wb25lbnQuXG4gICAqXG4gICAqXG4gICAqIEBtZW1iZXJPZiBUYWJsZUNvbXBvbmVudFxuICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcml2YXRlIF9kb21TYW5pdGl6ZXI6IERvbVNhbml0aXplcixcbiAgICBwcml2YXRlIF9kaWFsb2c6IE1hdERpYWxvZyxcbiAgKSB7fVxuXG4gIHByaXZhdGUgX2ZpeERhdGEoZGF0YTogQWpmVGFibGVDZWxsW11bXSk6IEFqZlRhYmxlQ2VsbFtdW10ge1xuICAgIChkYXRhIHx8IFtdKS5mb3JFYWNoKGVsZW0gPT4ge1xuICAgICAgKGVsZW0gfHwgW10pLmZvckVhY2goc3ViRWxlbSA9PiB7XG4gICAgICAgIHN1YkVsZW0udmFsdWUgPSB0aGlzLl9kb21TYW5pdGl6ZXIuc2FuaXRpemUoXG4gICAgICAgICAgU2VjdXJpdHlDb250ZXh0LkhUTUwsXG4gICAgICAgICAgdGhpcy5fZG9tU2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RIdG1sKHN1YkVsZW0udmFsdWUpLFxuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxuICAvKipcbiAgICogU29ydCB2aXNpYmxlIGRhdGEgYW5kIGVtaXQgYW4gZXZlbnQgdG8gdXNlIGZvciBwYWdpbmF0ZWQgdGFibGVcbiAgICogQHBhcmFtIHNvcnRcbiAgICogQHJldHVybnNcbiAgICovXG4gIHNvcnREYXRhKHNvcnQ6IFNvcnQpOiB2b2lkIHtcbiAgICBpZiAoIXNvcnQuYWN0aXZlIHx8IHNvcnQuZGlyZWN0aW9uID09PSAnJykge1xuICAgICAgdGhpcy5fc29ydGVkRGF0YSA9IFsuLi50aGlzLl9kYXRhXTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgY29sdW1uSWR4ID0gcGFyc2VJbnQoc29ydC5hY3RpdmUuc2xpY2UoLTEpKSB8fCAwO1xuICAgICAgY29uc3Qgc29ydGVkRGF0YSA9IHRoaXMuX2RhdGEuc2xpY2UoMSkuc29ydCgoYSwgYikgPT4ge1xuICAgICAgICBjb25zdCBpc0FzYyA9IHNvcnQuZGlyZWN0aW9uID09PSAnYXNjJztcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbXBhcmUoYVtjb2x1bW5JZHhdLCBiW2NvbHVtbklkeF0sIGlzQXNjKTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5fc29ydGVkRGF0YSA9IFt0aGlzLl9kYXRhWzBdLCAuLi5zb3J0ZWREYXRhXTtcbiAgICB9XG4gICAgdGhpcy5zb3J0U2VsZWN0ZWQuZW1pdChzb3J0KTtcbiAgfVxuXG4gIHByaXZhdGUgX2NvbXBhcmUoYTogQWpmVGFibGVDZWxsLCBiOiBBamZUYWJsZUNlbGwsIGlzQXNjOiBib29sZWFuKSB7XG4gICAgcmV0dXJuIChhLnZhbHVlIDwgYi52YWx1ZSA/IC0xIDogMSkgKiAoaXNBc2MgPyAxIDogLTEpO1xuICB9XG5cbiAgLyoqXG4gICAqIG9wZW4gYSBkaWFsb2cgd2hlbiBjbGljayBvbiBjZWxsLCBpZiBkaWFsb2dIdG1sQ29udGVudCBpcyB2YWxpZFxuICAgKiBAcGFyYW0gZGlhbG9nSHRtbENvbnRlbnQgdGhlIGh0bWwgdG8gc2hvdyBpbiB0aGUgZGlhbG9nXG4gICAqL1xuICBvcGVuRGlhbG9nKGRpYWxvZ0h0bWxDb250ZW50OiBzdHJpbmcgfCB1bmRlZmluZWQpOiB2b2lkIHtcbiAgICBpZiAoZGlhbG9nSHRtbENvbnRlbnQpIHtcbiAgICAgIGNvbnN0IGRpYWxvZ0NvbmZpZyA9IHtcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIGNvbnRlbnQ6IGRpYWxvZ0h0bWxDb250ZW50LFxuICAgICAgICB9LFxuICAgICAgfSBhcyBNYXREaWFsb2dDb25maWc7XG4gICAgICB0aGlzLl9kaWFsb2cub3Blbih0aGlzLmRpYWxvZ0NvbnRlbnQsIGRpYWxvZ0NvbmZpZyk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5zb3J0U2VsZWN0ZWQuY29tcGxldGUoKTtcbiAgfVxufVxuIiwiPHRhYmxlICpuZ0lmPVwic29ydGVkRGF0YVwiIG1hdFNvcnQgKG1hdFNvcnRDaGFuZ2UpPVwic29ydERhdGEoJGV2ZW50KVwiPlxuICA8dHIgKm5nSWY9XCJzb3J0ZWREYXRhLmxlbmd0aCA+IDBcIj5cbiAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBoZWFkZXJDZWxsIG9mIHNvcnRlZERhdGFbMF07IGxldCBpZHggPSBpbmRleFwiPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImhlYWRlckNlbGwuc29ydGVkOyBlbHNlIG5vU29ydGVkSGVhZGVyXCI+XG4gICAgICAgIDx0aFxuICAgICAgICAgIFthcHBseVN0eWxlc109XCJoZWFkZXJDZWxsLnN0eWxlXCJcbiAgICAgICAgICBbbmdTdHlsZV09XCJ7J3BhZGRpbmcnOiBjZWxscGFkZGluZ31cIlxuICAgICAgICAgIFthdHRyLmNvbHNwYW5dPVwiaGVhZGVyQ2VsbC5jb2xzcGFuXCJcbiAgICAgICAgICBbYXR0ci5yb3dzcGFuXT1cImhlYWRlckNlbGwucm93c3BhblwiXG4gICAgICAgICAgW21hdC1zb3J0LWhlYWRlcl09XCInY29sdW1uJyArIGlkeFwiXG4gICAgICAgID5cbiAgICAgICAgICB7e2hlYWRlckNlbGwudmFsdWV9fVxuICAgICAgICA8L3RoPlxuICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICA8bmctdGVtcGxhdGUgI25vU29ydGVkSGVhZGVyPlxuICAgICAgICA8dGhcbiAgICAgICAgICBbYXBwbHlTdHlsZXNdPVwiaGVhZGVyQ2VsbC5zdHlsZVwiXG4gICAgICAgICAgW25nU3R5bGVdPVwieydwYWRkaW5nJzogY2VsbHBhZGRpbmd9XCJcbiAgICAgICAgICBbYXR0ci5jb2xzcGFuXT1cImhlYWRlckNlbGwuY29sc3BhblwiXG4gICAgICAgICAgW2F0dHIucm93c3Bhbl09XCJoZWFkZXJDZWxsLnJvd3NwYW5cIlxuICAgICAgICA+XG4gICAgICAgICAge3toZWFkZXJDZWxsLnZhbHVlfX1cbiAgICAgICAgPC90aD5cbiAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPC9uZy1jb250YWluZXI+XG4gIDwvdHI+XG4gIDxuZy1jb250YWluZXIgKm5nSWY9XCJzb3J0ZWREYXRhLmxlbmd0aCA+IDFcIj5cbiAgICA8dHIgKm5nRm9yPVwibGV0IHJvdyBvZiBzb3J0ZWREYXRhLnNsaWNlKDEpXCI+XG4gICAgICA8dGRcbiAgICAgICAgKm5nRm9yPVwibGV0IGNlbGwgb2Ygcm93XCJcbiAgICAgICAgW2FwcGx5U3R5bGVzXT1cImNlbGwuc3R5bGVcIlxuICAgICAgICBbbmdTdHlsZV09XCJ7J3BhZGRpbmcnOiBjZWxscGFkZGluZ31cIlxuICAgICAgICBbYXR0ci5jb2xzcGFuXT1cImNlbGwuY29sc3BhblwiXG4gICAgICAgIFthdHRyLnJvd3NwYW5dPVwiY2VsbC5yb3dzcGFuXCJcbiAgICAgICAgW2lubmVySFRNTF09XCJjZWxsLnZhbHVlXCJcbiAgICAgICAgKGNsaWNrKT1cIm9wZW5EaWFsb2coY2VsbC5kaWFsb2dIdG1sKVwiXG4gICAgICA+PC90ZD5cbiAgICA8L3RyPlxuICA8L25nLWNvbnRhaW5lcj5cbjwvdGFibGU+XG5cbjxuZy10ZW1wbGF0ZSAjZGlhbG9nQ29udGVudCBsZXQtZGF0YT5cbiAgPGRpdiBbaW5uZXJIVE1MXT1cImRhdGEuY29udGVudFwiPjwvZGl2PlxuPC9uZy10ZW1wbGF0ZT5cbiJdfQ==