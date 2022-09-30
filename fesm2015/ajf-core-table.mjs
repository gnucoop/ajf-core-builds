import * as i5 from '@ajf/core/common';
import { AjfCommonModule } from '@ajf/core/common';
import * as i4 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i3 from '@angular/material/sort';
import { MatSortModule } from '@angular/material/sort';
import * as i0 from '@angular/core';
import { EventEmitter, SecurityContext, TemplateRef, Component, ChangeDetectionStrategy, ViewEncapsulation, Input, Output, ViewChild, NgModule } from '@angular/core';
import * as i1 from '@angular/platform-browser';
import * as i2 from '@angular/material/dialog';

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
class AjfTable {
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
class AjfTableModule {
}
AjfTableModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfTableModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AjfTableModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfTableModule, declarations: [AjfTable], imports: [AjfCommonModule, CommonModule, MatSortModule], exports: [AjfTable] });
AjfTableModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfTableModule, imports: [[AjfCommonModule, CommonModule, MatSortModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfTableModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [AjfCommonModule, CommonModule, MatSortModule],
                    declarations: [AjfTable],
                    exports: [AjfTable],
                }]
        }] });

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

/**
 * Generated bundle index. Do not edit.
 */

export { AjfTable, AjfTableModule };
//# sourceMappingURL=ajf-core-table.mjs.map
