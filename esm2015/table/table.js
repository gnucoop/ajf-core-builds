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
import { __decorate, __metadata } from "tslib";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
let AjfTable = /** @class */ (() => {
    let AjfTable = class AjfTable {
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
            (data || []).forEach((elem) => {
                (elem || []).forEach((subElem) => {
                    subElem.value = this._domSanitizer.bypassSecurityTrustHtml(subElem.value);
                });
            });
            return data;
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], AjfTable.prototype, "data", null);
    __decorate([
        Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], AjfTable.prototype, "cellpadding", null);
    AjfTable = __decorate([
        Component({
            selector: 'ajf-table',
            template: "<table *ngIf=\"data\">\n  <tr *ngFor=\"let row of data\">\n    <td *ngFor=\"let cell of row\"\n        [applyStyles]=\"cell.style\"\n        [ngStyle]=\"{'padding': cellpadding}\"\n        [attr.colspan]=\"cell.colspan\"\n        [attr.rowspan]=\"cell.rowspan\"\n        [innerHTML]=\"cell.value\">\n    </td>\n  </tr>\n</table>\n",
            changeDetection: ChangeDetectionStrategy.OnPush,
            encapsulation: ViewEncapsulation.None,
            styles: ["\n"]
        }),
        __metadata("design:paramtypes", [ChangeDetectorRef, DomSanitizer])
    ], AjfTable);
    return AjfTable;
})();
export { AjfTable };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS90YWJsZS90YWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7O0FBRUgsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULEtBQUssRUFDTCxpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBV3ZEO0lBQUEsSUFBYSxRQUFRLEdBQXJCLE1BQWEsUUFBUTtRQXFCbkI7Ozs7O1dBS0c7UUFDSCxZQUFvQixJQUF1QixFQUFVLGFBQTJCO1lBQTVELFNBQUksR0FBSixJQUFJLENBQW1CO1lBQVUsa0JBQWEsR0FBYixhQUFhLENBQWM7UUFBRyxDQUFDO1FBekJwRixJQUFJLElBQUk7WUFDTixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDcEIsQ0FBQztRQUVELElBQUksSUFBSSxDQUFDLElBQXNCO1lBQzdCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNqQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQzNCLENBQUM7UUFHRCxJQUFJLFdBQVc7WUFDYixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7UUFDM0IsQ0FBQztRQUVELElBQUksV0FBVyxDQUFDLFdBQW1CO1lBQ2pDLElBQUksQ0FBQyxZQUFZLEdBQUcsV0FBVyxDQUFDO1lBQ2hDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDM0IsQ0FBQztRQVVPLFFBQVEsQ0FBQyxJQUFzQjtZQUNyQyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtnQkFDNUIsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7b0JBQy9CLE9BQU8sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyx1QkFBdUIsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQzVFLENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7WUFDSCxPQUFPLElBQUksQ0FBQztRQUNkLENBQUM7S0FDRixDQUFBO0lBL0JDO1FBREMsS0FBSyxFQUFFOzs7d0NBSVA7SUFPRDtRQURDLEtBQUssRUFBRTs7OytDQUlQO0lBbkJVLFFBQVE7UUFQcEIsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLFdBQVc7WUFDckIsc1ZBQXlCO1lBRXpCLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO1lBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJOztTQUN0QyxDQUFDO3lDQTRCMEIsaUJBQWlCLEVBQXlCLFlBQVk7T0EzQnJFLFFBQVEsQ0FxQ3BCO0lBQUQsZUFBQztLQUFBO1NBckNZLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0RvbVNhbml0aXplcn0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5cbmltcG9ydCB7QWpmVGFibGVDZWxsfSBmcm9tICcuL3RhYmxlLWNlbGwnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhamYtdGFibGUnLFxuICB0ZW1wbGF0ZVVybDogJ3RhYmxlLmh0bWwnLFxuICBzdHlsZVVybHM6IFsndGFibGUuY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIEFqZlRhYmxlIHtcbiAgcHJpdmF0ZSBfZGF0YTogQWpmVGFibGVDZWxsW11bXTtcbiAgZ2V0IGRhdGEoKTogQWpmVGFibGVDZWxsW11bXSB7XG4gICAgcmV0dXJuIHRoaXMuX2RhdGE7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IGRhdGEoZGF0YTogQWpmVGFibGVDZWxsW11bXSkge1xuICAgIHRoaXMuX2RhdGEgPSB0aGlzLl9maXhEYXRhKGRhdGEpO1xuICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgX2NlbGxwYWRkaW5nOiBzdHJpbmc7XG4gIGdldCBjZWxscGFkZGluZygpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9jZWxscGFkZGluZztcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgY2VsbHBhZGRpbmcoY2VsbHBhZGRpbmc6IHN0cmluZykge1xuICAgIHRoaXMuX2NlbGxwYWRkaW5nID0gY2VsbHBhZGRpbmc7XG4gICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgVGFibGVDb21wb25lbnQuXG4gICAqXG4gICAqXG4gICAqIEBtZW1iZXJPZiBUYWJsZUNvbXBvbmVudFxuICAgKi9cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfY2RyOiBDaGFuZ2VEZXRlY3RvclJlZiwgcHJpdmF0ZSBfZG9tU2FuaXRpemVyOiBEb21TYW5pdGl6ZXIpIHt9XG5cbiAgcHJpdmF0ZSBfZml4RGF0YShkYXRhOiBBamZUYWJsZUNlbGxbXVtdKTogQWpmVGFibGVDZWxsW11bXSB7XG4gICAgKGRhdGEgfHwgW10pLmZvckVhY2goKGVsZW0pID0+IHtcbiAgICAgIChlbGVtIHx8IFtdKS5mb3JFYWNoKChzdWJFbGVtKSA9PiB7XG4gICAgICAgIHN1YkVsZW0udmFsdWUgPSB0aGlzLl9kb21TYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdEh0bWwoc3ViRWxlbS52YWx1ZSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICByZXR1cm4gZGF0YTtcbiAgfVxufVxuIl19