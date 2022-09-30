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
AjfTable.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.5", type: AjfTable, selector: "ajf-table", inputs: { data: "data", cellpadding: "cellpadding" }, outputs: { sortSelected: "sortSelected" }, viewQueries: [{ propertyName: "dialogContent", first: true, predicate: ["dialogContent"], descendants: true, read: TemplateRef }], ngImport: i0, template: "<table *ngIf=\"data\" matSort (matSortChange)=\"sortData($event)\">\n  <tr *ngIf=\"data.length > 0\">\n    <th\n      *ngFor=\"let headerCell of data[0]; let idx = index\"\n      [applyStyles]=\"headerCell.style\"\n      [ngStyle]=\"{'padding': cellpadding}\"\n      [attr.colspan]=\"headerCell.colspan\"\n      [attr.rowspan]=\"headerCell.rowspan\"\n      [mat-sort-header]=\"'column' + idx\"\n    >\n      {{headerCell.value}}\n    </th>\n  </tr>\n  <ng-container *ngIf=\"data.length > 1\">\n    <tr *ngFor=\"let row of data.slice(1)\">\n      <td\n        *ngFor=\"let cell of row\"\n        [applyStyles]=\"cell.style\"\n        [ngStyle]=\"{'padding': cellpadding}\"\n        [attr.colspan]=\"cell.colspan\"\n        [attr.rowspan]=\"cell.rowspan\"\n        [innerHTML]=\"cell.value\"\n        (click)=\"openDialog(cell.dialogHtml)\"\n      ></td>\n    </tr>\n  </ng-container>\n</table>\n\n<ng-template #dialogContent let-data>\n  <div [innerHTML]=\"data.content\"></div>\n</ng-template>\n", styles: [""], components: [{ type: i3.MatSortHeader, selector: "[mat-sort-header]", inputs: ["disabled", "mat-sort-header", "arrowPosition", "start", "sortActionDescription", "disableClear"], exportAs: ["matSortHeader"] }], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3.MatSort, selector: "[matSort]", inputs: ["matSortDisabled", "matSortActive", "matSortStart", "matSortDirection", "matSortDisableClear"], outputs: ["matSortChange"], exportAs: ["matSort"] }, { type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i5.ApplyStylesDirective, selector: "[applyStyles]", inputs: ["applyStyles"] }, { type: i4.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfTable, decorators: [{
            type: Component,
            args: [{ selector: 'ajf-table', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<table *ngIf=\"data\" matSort (matSortChange)=\"sortData($event)\">\n  <tr *ngIf=\"data.length > 0\">\n    <th\n      *ngFor=\"let headerCell of data[0]; let idx = index\"\n      [applyStyles]=\"headerCell.style\"\n      [ngStyle]=\"{'padding': cellpadding}\"\n      [attr.colspan]=\"headerCell.colspan\"\n      [attr.rowspan]=\"headerCell.rowspan\"\n      [mat-sort-header]=\"'column' + idx\"\n    >\n      {{headerCell.value}}\n    </th>\n  </tr>\n  <ng-container *ngIf=\"data.length > 1\">\n    <tr *ngFor=\"let row of data.slice(1)\">\n      <td\n        *ngFor=\"let cell of row\"\n        [applyStyles]=\"cell.style\"\n        [ngStyle]=\"{'padding': cellpadding}\"\n        [attr.colspan]=\"cell.colspan\"\n        [attr.rowspan]=\"cell.rowspan\"\n        [innerHTML]=\"cell.value\"\n        (click)=\"openDialog(cell.dialogHtml)\"\n      ></td>\n    </tr>\n  </ng-container>\n</table>\n\n<ng-template #dialogContent let-data>\n  <div [innerHTML]=\"data.content\"></div>\n</ng-template>\n", styles: [""] }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL3RhYmxlL3NyYy90YWJsZS50cyIsIi4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvdGFibGUvc3JjL3RhYmxlLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUNMLHVCQUF1QixFQUV2QixTQUFTLEVBQ1QsWUFBWSxFQUNaLEtBQUssRUFFTCxNQUFNLEVBQ04sZUFBZSxFQUNmLFdBQVcsRUFDWCxTQUFTLEVBQ1QsaUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDOzs7Ozs7O0FBYXZCLE1BQU0sT0FBTyxRQUFRO0lBbUNuQjs7Ozs7T0FLRztJQUNILFlBQ1UsSUFBdUIsRUFDdkIsYUFBMkIsRUFDM0IsT0FBa0I7UUFGbEIsU0FBSSxHQUFKLElBQUksQ0FBbUI7UUFDdkIsa0JBQWEsR0FBYixhQUFhLENBQWM7UUFDM0IsWUFBTyxHQUFQLE9BQU8sQ0FBVztRQTNDNUI7O1dBRUc7UUFDSyxVQUFLLEdBQXFCLEVBQUUsQ0FBQztRQVVyQzs7V0FFRztRQUNLLGlCQUFZLEdBQVcsRUFBRSxDQUFDO1FBVWxDOztXQUVHO1FBRU0saUJBQVksR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO0lBYzlDLENBQUM7SUF4Q0osSUFBSSxJQUFJO1FBQ04sT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3BCLENBQUM7SUFDRCxJQUNJLElBQUksQ0FBQyxJQUFzQjtRQUM3QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBTUQsSUFBSSxXQUFXO1FBQ2IsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzNCLENBQUM7SUFDRCxJQUNJLFdBQVcs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XG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE91dHB1dCxcbiAgU2VjdXJpdHlDb250ZXh0LFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0NoaWxkLFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01hdERpYWxvZywgTWF0RGlhbG9nQ29uZmlnfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xuaW1wb3J0IHtTb3J0fSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9zb3J0JztcbmltcG9ydCB7RG9tU2FuaXRpemVyfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7QWpmVGFibGVDZWxsfSBmcm9tICcuL3RhYmxlLWNlbGwnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhamYtdGFibGUnLFxuICB0ZW1wbGF0ZVVybDogJ3RhYmxlLmh0bWwnLFxuICBzdHlsZVVybHM6IFsndGFibGUuc2NzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbn0pXG5leHBvcnQgY2xhc3MgQWpmVGFibGUgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICAvKipcbiAgICogZGF0YSB0byBiZSBzaG93biBpbiB0aGUgdGFibGVcbiAgICovXG4gIHByaXZhdGUgX2RhdGE6IEFqZlRhYmxlQ2VsbFtdW10gPSBbXTtcbiAgZ2V0IGRhdGEoKTogQWpmVGFibGVDZWxsW11bXSB7XG4gICAgcmV0dXJuIHRoaXMuX2RhdGE7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IGRhdGEoZGF0YTogQWpmVGFibGVDZWxsW11bXSkge1xuICAgIHRoaXMuX2RhdGEgPSB0aGlzLl9maXhEYXRhKGRhdGEpO1xuICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBjZWxscGFkZGluZyBmb3IgYWxsIHJvd3MsIGluY2x1ZGUgaGVhZGVyXG4gICAqL1xuICBwcml2YXRlIF9jZWxscGFkZGluZzogc3RyaW5nID0gJyc7XG4gIGdldCBjZWxscGFkZGluZygpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9jZWxscGFkZGluZztcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgY2VsbHBhZGRpbmcoY2VsbHBhZGRpbmc6IHN0cmluZykge1xuICAgIHRoaXMuX2NlbGxwYWRkaW5nID0gY2VsbHBhZGRpbmc7XG4gICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEVtaXQgYW4gZXZlbnQgd2hlbiBzb3J0IGFycm93cyBhcmUgc2VsZWN0ZWRcbiAgICovXG4gIEBPdXRwdXQoKVxuICByZWFkb25seSBzb3J0U2VsZWN0ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPFNvcnQ+KCk7XG5cbiAgQFZpZXdDaGlsZCgnZGlhbG9nQ29udGVudCcsIHtyZWFkOiBUZW1wbGF0ZVJlZn0pIGRpYWxvZ0NvbnRlbnQhOiBUZW1wbGF0ZVJlZjxIVE1MRWxlbWVudD47XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgVGFibGVDb21wb25lbnQuXG4gICAqXG4gICAqXG4gICAqIEBtZW1iZXJPZiBUYWJsZUNvbXBvbmVudFxuICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcml2YXRlIF9kb21TYW5pdGl6ZXI6IERvbVNhbml0aXplcixcbiAgICBwcml2YXRlIF9kaWFsb2c6IE1hdERpYWxvZyxcbiAgKSB7fVxuXG4gIHByaXZhdGUgX2ZpeERhdGEoZGF0YTogQWpmVGFibGVDZWxsW11bXSk6IEFqZlRhYmxlQ2VsbFtdW10ge1xuICAgIChkYXRhIHx8IFtdKS5mb3JFYWNoKGVsZW0gPT4ge1xuICAgICAgKGVsZW0gfHwgW10pLmZvckVhY2goc3ViRWxlbSA9PiB7XG4gICAgICAgIHN1YkVsZW0udmFsdWUgPSB0aGlzLl9kb21TYW5pdGl6ZXIuc2FuaXRpemUoXG4gICAgICAgICAgU2VjdXJpdHlDb250ZXh0LkhUTUwsXG4gICAgICAgICAgdGhpcy5fZG9tU2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RIdG1sKHN1YkVsZW0udmFsdWUpLFxuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxuICAvKipcbiAgICogU29ydCB2aXNpYmxlIGRhdGEgYW5kIGVtaXQgYW4gZXZlbnQgdG8gdXNlIGZvciBwYWdpbmF0ZWQgdGFibGVcbiAgICogQHBhcmFtIHNvcnRcbiAgICogQHJldHVybnNcbiAgICovXG4gIHNvcnREYXRhKHNvcnQ6IFNvcnQpOiB2b2lkIHtcbiAgICBpZiAoIXNvcnQuYWN0aXZlIHx8IHNvcnQuZGlyZWN0aW9uID09PSAnJykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBzb3J0ZWREYXRhID0gdGhpcy5fZGF0YS5zbGljZSgxKS5zb3J0KChhLCBiKSA9PiB7XG4gICAgICBjb25zdCBpc0FzYyA9IHNvcnQuZGlyZWN0aW9uID09PSAnYXNjJztcbiAgICAgIHJldHVybiB0aGlzLl9jb21wYXJlKGFbMF0sIGJbMF0sIGlzQXNjKTtcbiAgICB9KTtcbiAgICB0aGlzLl9kYXRhID0gW3RoaXMuX2RhdGFbMF0sIC4uLnNvcnRlZERhdGFdO1xuICAgIHRoaXMuc29ydFNlbGVjdGVkLmVtaXQoc29ydCk7XG4gIH1cblxuICBwcml2YXRlIF9jb21wYXJlKGE6IEFqZlRhYmxlQ2VsbCwgYjogQWpmVGFibGVDZWxsLCBpc0FzYzogYm9vbGVhbikge1xuICAgIHJldHVybiAoYS52YWx1ZSA8IGIudmFsdWUgPyAtMSA6IDEpICogKGlzQXNjID8gMSA6IC0xKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBvcGVuIGEgZGlhbG9nIHdoZW4gY2xpY2sgb24gY2VsbCwgaWYgZGlhbG9nSHRtbENvbnRlbnQgaXMgdmFsaWRcbiAgICogQHBhcmFtIGRpYWxvZ0h0bWxDb250ZW50IHRoZSBodG1sIHRvIHNob3cgaW4gdGhlIGRpYWxvZ1xuICAgKi9cbiAgb3BlbkRpYWxvZyhkaWFsb2dIdG1sQ29udGVudDogc3RyaW5nIHwgdW5kZWZpbmVkKTogdm9pZCB7XG4gICAgaWYgKGRpYWxvZ0h0bWxDb250ZW50KSB7XG4gICAgICBjb25zdCBkaWFsb2dDb25maWcgPSB7XG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICBjb250ZW50OiBkaWFsb2dIdG1sQ29udGVudCxcbiAgICAgICAgfSxcbiAgICAgIH0gYXMgTWF0RGlhbG9nQ29uZmlnO1xuICAgICAgdGhpcy5fZGlhbG9nLm9wZW4odGhpcy5kaWFsb2dDb250ZW50LCBkaWFsb2dDb25maWcpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuc29ydFNlbGVjdGVkLmNvbXBsZXRlKCk7XG4gIH1cbn1cbiIsIjx0YWJsZSAqbmdJZj1cImRhdGFcIiBtYXRTb3J0IChtYXRTb3J0Q2hhbmdlKT1cInNvcnREYXRhKCRldmVudClcIj5cbiAgPHRyICpuZ0lmPVwiZGF0YS5sZW5ndGggPiAwXCI+XG4gICAgPHRoXG4gICAgICAqbmdGb3I9XCJsZXQgaGVhZGVyQ2VsbCBvZiBkYXRhWzBdOyBsZXQgaWR4ID0gaW5kZXhcIlxuICAgICAgW2FwcGx5U3R5bGVzXT1cImhlYWRlckNlbGwuc3R5bGVcIlxuICAgICAgW25nU3R5bGVdPVwieydwYWRkaW5nJzogY2VsbHBhZGRpbmd9XCJcbiAgICAgIFthdHRyLmNvbHNwYW5dPVwiaGVhZGVyQ2VsbC5jb2xzcGFuXCJcbiAgICAgIFthdHRyLnJvd3NwYW5dPVwiaGVhZGVyQ2VsbC5yb3dzcGFuXCJcbiAgICAgIFttYXQtc29ydC1oZWFkZXJdPVwiJ2NvbHVtbicgKyBpZHhcIlxuICAgID5cbiAgICAgIHt7aGVhZGVyQ2VsbC52YWx1ZX19XG4gICAgPC90aD5cbiAgPC90cj5cbiAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImRhdGEubGVuZ3RoID4gMVwiPlxuICAgIDx0ciAqbmdGb3I9XCJsZXQgcm93IG9mIGRhdGEuc2xpY2UoMSlcIj5cbiAgICAgIDx0ZFxuICAgICAgICAqbmdGb3I9XCJsZXQgY2VsbCBvZiByb3dcIlxuICAgICAgICBbYXBwbHlTdHlsZXNdPVwiY2VsbC5zdHlsZVwiXG4gICAgICAgIFtuZ1N0eWxlXT1cInsncGFkZGluZyc6IGNlbGxwYWRkaW5nfVwiXG4gICAgICAgIFthdHRyLmNvbHNwYW5dPVwiY2VsbC5jb2xzcGFuXCJcbiAgICAgICAgW2F0dHIucm93c3Bhbl09XCJjZWxsLnJvd3NwYW5cIlxuICAgICAgICBbaW5uZXJIVE1MXT1cImNlbGwudmFsdWVcIlxuICAgICAgICAoY2xpY2spPVwib3BlbkRpYWxvZyhjZWxsLmRpYWxvZ0h0bWwpXCJcbiAgICAgID48L3RkPlxuICAgIDwvdHI+XG4gIDwvbmctY29udGFpbmVyPlxuPC90YWJsZT5cblxuPG5nLXRlbXBsYXRlICNkaWFsb2dDb250ZW50IGxldC1kYXRhPlxuICA8ZGl2IFtpbm5lckhUTUxdPVwiZGF0YS5jb250ZW50XCI+PC9kaXY+XG48L25nLXRlbXBsYXRlPlxuIl19