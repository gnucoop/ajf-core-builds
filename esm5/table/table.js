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
var AjfTable = /** @class */ (function () {
    /**
     * Creates an instance of TableComponent.
     *
     *
     * @memberOf TableComponent
     */
    function AjfTable(_cdr, _domSanitizer) {
        this._cdr = _cdr;
        this._domSanitizer = _domSanitizer;
    }
    Object.defineProperty(AjfTable.prototype, "data", {
        get: function () { return this._data; },
        set: function (data) {
            this._data = this._fixData(data);
            this._cdr.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfTable.prototype, "cellpadding", {
        get: function () { return this._cellpadding; },
        set: function (cellpadding) {
            this._cellpadding = cellpadding;
            this._cdr.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    AjfTable.prototype._fixData = function (data) {
        var _this = this;
        (data || []).forEach(function (elem) {
            (elem || []).forEach(function (subElem) {
                subElem.value = _this._domSanitizer.bypassSecurityTrustHtml(subElem.value);
            });
        });
        return data;
    };
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
    AjfTable.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: DomSanitizer }
    ]; };
    AjfTable.propDecorators = {
        data: [{ type: Input }],
        cellpadding: [{ type: Input }]
    };
    return AjfTable;
}());
export { AjfTable };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS90YWJsZS90YWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQ0wsU0FBUyxFQUFFLHVCQUF1QixFQUFFLGlCQUFpQixFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFDaEYsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBSXZEO0lBc0JFOzs7OztPQUtHO0lBQ0gsa0JBQW9CLElBQXVCLEVBQVUsYUFBMkI7UUFBNUQsU0FBSSxHQUFKLElBQUksQ0FBbUI7UUFBVSxrQkFBYSxHQUFiLGFBQWEsQ0FBYztJQUFJLENBQUM7SUFuQnJGLHNCQUFJLDBCQUFJO2FBQVIsY0FBK0IsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzthQUNuRCxVQUFrQixJQUFzQjtZQUN0QyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDakMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUMzQixDQUFDOzs7T0FKa0Q7SUFPbkQsc0JBQUksaUNBQVc7YUFBZixjQUE0QixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO2FBQ3ZELFVBQXlCLFdBQW1CO1lBQzFDLElBQUksQ0FBQyxZQUFZLEdBQUcsV0FBVyxDQUFDO1lBQ2hDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDM0IsQ0FBQzs7O09BSnNEO0lBYy9DLDJCQUFRLEdBQWhCLFVBQWlCLElBQXNCO1FBQXZDLGlCQU9DO1FBTkMsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUMsSUFBSTtZQUN4QixDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQyxPQUFPO2dCQUMzQixPQUFPLENBQUMsS0FBSyxHQUFHLEtBQUksQ0FBQyxhQUFhLENBQUMsdUJBQXVCLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzVFLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDSCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7O2dCQXJDRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLFdBQVc7b0JBQ3JCLHNWQUF5QjtvQkFFekIsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJOztpQkFDdEM7Ozs7Z0JBWnFDLGlCQUFpQjtnQkFFL0MsWUFBWTs7O3VCQWNqQixLQUFLOzhCQU9MLEtBQUs7O0lBcUJSLGVBQUM7Q0FBQSxBQXRDRCxJQXNDQztTQS9CWSxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge1xuICBDb21wb25lbnQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZiwgSW5wdXQsIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtEb21TYW5pdGl6ZXJ9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG5pbXBvcnQge0FqZlRhYmxlQ2VsbH0gZnJvbSAnLi90YWJsZS1jZWxsJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWpmLXRhYmxlJyxcbiAgdGVtcGxhdGVVcmw6ICd0YWJsZS5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ3RhYmxlLmNzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBBamZUYWJsZSB7XG4gIHByaXZhdGUgX2RhdGE6IEFqZlRhYmxlQ2VsbFtdW107XG4gIGdldCBkYXRhKCk6IEFqZlRhYmxlQ2VsbFtdW10geyByZXR1cm4gdGhpcy5fZGF0YTsgfVxuICBASW5wdXQoKSBzZXQgZGF0YShkYXRhOiBBamZUYWJsZUNlbGxbXVtdKSB7XG4gICAgdGhpcy5fZGF0YSA9IHRoaXMuX2ZpeERhdGEoZGF0YSk7XG4gICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfY2VsbHBhZGRpbmc6IHN0cmluZztcbiAgZ2V0IGNlbGxwYWRkaW5nKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLl9jZWxscGFkZGluZzsgfVxuICBASW5wdXQoKSBzZXQgY2VsbHBhZGRpbmcoY2VsbHBhZGRpbmc6IHN0cmluZykge1xuICAgIHRoaXMuX2NlbGxwYWRkaW5nID0gY2VsbHBhZGRpbmc7XG4gICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgVGFibGVDb21wb25lbnQuXG4gICAqXG4gICAqXG4gICAqIEBtZW1iZXJPZiBUYWJsZUNvbXBvbmVudFxuICAgKi9cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfY2RyOiBDaGFuZ2VEZXRlY3RvclJlZiwgcHJpdmF0ZSBfZG9tU2FuaXRpemVyOiBEb21TYW5pdGl6ZXIpIHsgfVxuXG4gIHByaXZhdGUgX2ZpeERhdGEoZGF0YTogQWpmVGFibGVDZWxsW11bXSk6IEFqZlRhYmxlQ2VsbFtdW10ge1xuICAgIChkYXRhIHx8IFtdKS5mb3JFYWNoKChlbGVtKSA9PiB7XG4gICAgICAoZWxlbSB8fCBbXSkuZm9yRWFjaCgoc3ViRWxlbSkgPT4ge1xuICAgICAgICBzdWJFbGVtLnZhbHVlID0gdGhpcy5fZG9tU2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RIdG1sKHN1YkVsZW0udmFsdWUpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cbn1cbiJdfQ==