/**
 * @fileoverview added by tsickle
 * Generated from: src/core/table/table.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
import { Component, ChangeDetectionStrategy, ChangeDetectorRef, Input, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
export class AjfTable {
    /**
     * Creates an instance of TableComponent.
     *
     *
     * \@memberOf TableComponent
     * @param {?} _cdr
     * @param {?} _domSanitizer
     */
    constructor(_cdr, _domSanitizer) {
        this._cdr = _cdr;
        this._domSanitizer = _domSanitizer;
    }
    /**
     * @return {?}
     */
    get data() { return this._data; }
    /**
     * @param {?} data
     * @return {?}
     */
    set data(data) {
        this._data = this._fixData(data);
        this._cdr.markForCheck();
    }
    /**
     * @return {?}
     */
    get cellpadding() { return this._cellpadding; }
    /**
     * @param {?} cellpadding
     * @return {?}
     */
    set cellpadding(cellpadding) {
        this._cellpadding = cellpadding;
        this._cdr.markForCheck();
    }
    /**
     * @private
     * @param {?} data
     * @return {?}
     */
    _fixData(data) {
        (data || []).forEach((/**
         * @param {?} elem
         * @return {?}
         */
        (elem) => {
            (elem || []).forEach((/**
             * @param {?} subElem
             * @return {?}
             */
            (subElem) => {
                subElem.value = this._domSanitizer.bypassSecurityTrustHtml(subElem.value);
            }));
        }));
        return data;
    }
}
AjfTable.decorators = [
    { type: Component, args: [{
                selector: 'ajf-table',
                template: "<table *ngIf=\"data\">\n  <tr *ngFor=\"let row of data\">\n    <td *ngFor=\"let cell of row\"\n        [applyStyles]=\"cell.style\"\n        [ngStyle]=\"{'padding': cellpadding}\"\n        [attr.colspan]=\"cell.colspan\"\n        [attr.rowspan]=\"cell.rowspan\"\n        [innerHTML]=\"cell.value\">\n    </td>\n  </tr>\n</table>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                styles: ["\n"]
            }] }
];
/** @nocollapse */
AjfTable.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: DomSanitizer }
];
AjfTable.propDecorators = {
    data: [{ type: Input }],
    cellpadding: [{ type: Input }]
};
if (false) {
    /**
     * @type {?}
     * @private
     */
    AjfTable.prototype._data;
    /**
     * @type {?}
     * @private
     */
    AjfTable.prototype._cellpadding;
    /**
     * @type {?}
     * @private
     */
    AjfTable.prototype._cdr;
    /**
     * @type {?}
     * @private
     */
    AjfTable.prototype._domSanitizer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS90YWJsZS90YWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCQSxPQUFPLEVBQ0wsU0FBUyxFQUFFLHVCQUF1QixFQUFFLGlCQUFpQixFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFDaEYsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBV3ZELE1BQU0sT0FBTyxRQUFROzs7Ozs7Ozs7SUFxQm5CLFlBQW9CLElBQXVCLEVBQVUsYUFBMkI7UUFBNUQsU0FBSSxHQUFKLElBQUksQ0FBbUI7UUFBVSxrQkFBYSxHQUFiLGFBQWEsQ0FBYztJQUFJLENBQUM7Ozs7SUFuQnJGLElBQUksSUFBSSxLQUF1QixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDOzs7OztJQUNuRCxJQUFhLElBQUksQ0FBQyxJQUFzQjtRQUN0QyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUMzQixDQUFDOzs7O0lBR0QsSUFBSSxXQUFXLEtBQWEsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQzs7Ozs7SUFDdkQsSUFBYSxXQUFXLENBQUMsV0FBbUI7UUFDMUMsSUFBSSxDQUFDLFlBQVksR0FBRyxXQUFXLENBQUM7UUFDaEMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUMzQixDQUFDOzs7Ozs7SUFVTyxRQUFRLENBQUMsSUFBc0I7UUFDckMsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUMsT0FBTzs7OztRQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDNUIsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUMsT0FBTzs7OztZQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7Z0JBQy9CLE9BQU8sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyx1QkFBdUIsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDNUUsQ0FBQyxFQUFDLENBQUM7UUFDTCxDQUFDLEVBQUMsQ0FBQztRQUNILE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQzs7O1lBckNGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsV0FBVztnQkFDckIsc1ZBQXlCO2dCQUV6QixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7O2FBQ3RDOzs7O1lBWnFDLGlCQUFpQjtZQUUvQyxZQUFZOzs7bUJBY2pCLEtBQUs7MEJBT0wsS0FBSzs7Ozs7OztJQVROLHlCQUFnQzs7Ozs7SUFPaEMsZ0NBQTZCOzs7OztJQWFqQix3QkFBK0I7Ozs7O0lBQUUsaUNBQW1DIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge1xuICBDb21wb25lbnQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZiwgSW5wdXQsIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtEb21TYW5pdGl6ZXJ9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG5pbXBvcnQge0FqZlRhYmxlQ2VsbH0gZnJvbSAnLi90YWJsZS1jZWxsJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWpmLXRhYmxlJyxcbiAgdGVtcGxhdGVVcmw6ICd0YWJsZS5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ3RhYmxlLmNzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBBamZUYWJsZSB7XG4gIHByaXZhdGUgX2RhdGE6IEFqZlRhYmxlQ2VsbFtdW107XG4gIGdldCBkYXRhKCk6IEFqZlRhYmxlQ2VsbFtdW10geyByZXR1cm4gdGhpcy5fZGF0YTsgfVxuICBASW5wdXQoKSBzZXQgZGF0YShkYXRhOiBBamZUYWJsZUNlbGxbXVtdKSB7XG4gICAgdGhpcy5fZGF0YSA9IHRoaXMuX2ZpeERhdGEoZGF0YSk7XG4gICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfY2VsbHBhZGRpbmc6IHN0cmluZztcbiAgZ2V0IGNlbGxwYWRkaW5nKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLl9jZWxscGFkZGluZzsgfVxuICBASW5wdXQoKSBzZXQgY2VsbHBhZGRpbmcoY2VsbHBhZGRpbmc6IHN0cmluZykge1xuICAgIHRoaXMuX2NlbGxwYWRkaW5nID0gY2VsbHBhZGRpbmc7XG4gICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgVGFibGVDb21wb25lbnQuXG4gICAqXG4gICAqXG4gICAqIEBtZW1iZXJPZiBUYWJsZUNvbXBvbmVudFxuICAgKi9cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfY2RyOiBDaGFuZ2VEZXRlY3RvclJlZiwgcHJpdmF0ZSBfZG9tU2FuaXRpemVyOiBEb21TYW5pdGl6ZXIpIHsgfVxuXG4gIHByaXZhdGUgX2ZpeERhdGEoZGF0YTogQWpmVGFibGVDZWxsW11bXSk6IEFqZlRhYmxlQ2VsbFtdW10ge1xuICAgIChkYXRhIHx8IFtdKS5mb3JFYWNoKChlbGVtKSA9PiB7XG4gICAgICAoZWxlbSB8fCBbXSkuZm9yRWFjaCgoc3ViRWxlbSkgPT4ge1xuICAgICAgICBzdWJFbGVtLnZhbHVlID0gdGhpcy5fZG9tU2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RIdG1sKHN1YkVsZW0udmFsdWUpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cbn1cbiJdfQ==