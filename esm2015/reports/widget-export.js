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
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { format } from 'date-fns';
import * as XLSX from 'xlsx';
import { AjfWidgetType } from '../reports/interface/widgets/widget-type';
export class AjfWidgetExport {
    constructor() {
        this.overlay = true;
        this.enable = false;
    }
    /**
     * Export widget data in CSV format
     * @deprecated Use `AjfWidgetExport.export` with 'csv' parameter.
     * @breaking-change 13.0.0
     */
    exportCsv() {
        this.export('csv');
    }
    /**
     * Export widget data in Xlsx format
     * @deprecated Use `AjfWidgetExport.export` with 'xlsx' parameter.
     * @breaking-change 13.0.0
     */
    exportXlsx() {
        this.export('xlsx');
    }
    /**
     * Export widget data in CSV or Xlsx format
     */
    export(bookType) {
        const sheetName = this._buildTitle(this.widgetType);
        const sheets = {};
        sheets[sheetName] = XLSX.utils.json_to_sheet(this._buildXlsxData());
        const workBook = { Sheets: sheets, SheetNames: [sheetName] };
        XLSX.writeFile(workBook, `${sheetName}.${bookType}`, {
            bookType,
            type: 'array',
        });
    }
    _buildXlsxData() {
        let xlsxData = [];
        let labels = [];
        switch (this.widgetType) {
            default:
            case AjfWidgetType.Chart:
                this.data = this.data;
                const datasets = this.data.datasets || [];
                labels = this.data.labels;
                for (let i = 0; i < datasets.length; i++) {
                    const row = {};
                    const data = datasets[i].data || [];
                    row['name'] = datasets[i].label;
                    for (let j = 0; j < data.length; j++) {
                        row[labels[j]] = data[j];
                    }
                    xlsxData.push(row);
                }
                break;
            case AjfWidgetType.Table:
                this.data = this.data;
                this.data.forEach((row, idxRow) => {
                    const res = {};
                    if (idxRow === 0) {
                        labels = row.map(r => r.value.changingThisBreaksApplicationSecurity);
                    }
                    else {
                        row.forEach((elem, idxElem) => {
                            res[labels[idxElem]] = elem.value.changingThisBreaksApplicationSecurity;
                        });
                        xlsxData.push(res);
                    }
                });
                break;
        }
        return xlsxData;
    }
    _buildTitle(widgetType) {
        return `${AjfWidgetType[widgetType]} ${format(new Date(), `yyyy-MM-dd`)}`;
    }
}
AjfWidgetExport.decorators = [
    { type: Component, args: [{
                selector: 'ajf-widget-export',
                template: "<div class=\"ajf-widget-wrapper\">\n  <ng-content></ng-content>\n  <div *ngIf=\"enable\" class=\"ajf-export-menu\" [class.ajf-export-menu-overlay]=\"overlay\">\n      <button (click)=\"export('csv')\">CSV</button>\n      <button (click)=\"export('xlsx')\">XLSX</button>\n  </div>\n</div>\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["ajf-widget-export{width:100%;height:inherit}ajf-widget-export .ajf-widget-wrapper{position:relative;height:inherit}ajf-widget-export .ajf-export-menu{position:absolute;right:0;top:0}ajf-widget-export .ajf-export-menu.ajf-export-menu-overlay{display:none}ajf-widget-export .ajf-export-menu button{margin:.5em;border:none;color:#fff;background-color:#4a403f;padding:7.5px 16px;text-align:center;text-decoration:none;display:inline-block;font-size:16px;cursor:pointer}ajf-widget-export .ajf-widget-wrapper:hover .ajf-export-menu-overlay{display:block}\n"]
            },] }
];
AjfWidgetExport.ctorParameters = () => [];
AjfWidgetExport.propDecorators = {
    widgetType: [{ type: Input }],
    data: [{ type: Input }],
    overlay: [{ type: Input }],
    enable: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0LWV4cG9ydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL3JlcG9ydHMvd2lkZ2V0LWV4cG9ydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFHSCxPQUFPLEVBQUMsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUUzRixPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sVUFBVSxDQUFDO0FBQ2hDLE9BQU8sS0FBSyxJQUFJLE1BQU0sTUFBTSxDQUFDO0FBRTdCLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSwwQ0FBMEMsQ0FBQztBQVV2RSxNQUFNLE9BQU8sZUFBZTtJQU0xQjtRQUhTLFlBQU8sR0FBRyxJQUFJLENBQUM7UUFDZixXQUFNLEdBQUcsS0FBSyxDQUFDO0lBRVQsQ0FBQztJQUVoQjs7OztPQUlHO0lBQ0gsU0FBUztRQUNQLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDckIsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxVQUFVO1FBQ1IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN0QixDQUFDO0lBRUQ7O09BRUc7SUFDSCxNQUFNLENBQUMsUUFBc0I7UUFDM0IsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDcEQsTUFBTSxNQUFNLEdBQXNDLEVBQUUsQ0FBQztRQUNyRCxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUM7UUFDcEUsTUFBTSxRQUFRLEdBQWtCLEVBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsQ0FBQyxTQUFTLENBQUMsRUFBQyxDQUFDO1FBQzFFLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLEdBQUcsU0FBUyxJQUFJLFFBQVEsRUFBRSxFQUFFO1lBQ25ELFFBQVE7WUFDUixJQUFJLEVBQUUsT0FBTztTQUNkLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTyxjQUFjO1FBQ3BCLElBQUksUUFBUSxHQUFxQyxFQUFFLENBQUM7UUFDcEQsSUFBSSxNQUFNLEdBQWEsRUFBRSxDQUFDO1FBQzFCLFFBQVEsSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUN2QixRQUFRO1lBQ1IsS0FBSyxhQUFhLENBQUMsS0FBSztnQkFDdEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBaUIsQ0FBQztnQkFDbkMsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDO2dCQUMxQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFrQixDQUFDO2dCQUN0QyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtvQkFDeEMsTUFBTSxHQUFHLEdBQXdCLEVBQUUsQ0FBQztvQkFDcEMsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUM7b0JBQ3BDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO29CQUNoQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTt3QkFDcEMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztxQkFDMUI7b0JBQ0QsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDcEI7Z0JBQ0QsTUFBTTtZQUNSLEtBQUssYUFBYSxDQUFDLEtBQUs7Z0JBQ3RCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQXdCLENBQUM7Z0JBQzFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBbUIsRUFBRSxNQUFjLEVBQUUsRUFBRTtvQkFDeEQsTUFBTSxHQUFHLEdBQXdCLEVBQUUsQ0FBQztvQkFDcEMsSUFBSSxNQUFNLEtBQUssQ0FBQyxFQUFFO3dCQUNoQixNQUFNLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMscUNBQXFDLENBQUMsQ0FBQztxQkFDdEU7eUJBQU07d0JBQ0wsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQWtCLEVBQUUsT0FBZSxFQUFFLEVBQUU7NEJBQ2xELEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLHFDQUFxQyxDQUFDO3dCQUMxRSxDQUFDLENBQUMsQ0FBQzt3QkFDSCxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3FCQUNwQjtnQkFDSCxDQUFDLENBQUMsQ0FBQztnQkFDSCxNQUFNO1NBQ1Q7UUFFRCxPQUFPLFFBQVEsQ0FBQztJQUNsQixDQUFDO0lBRU8sV0FBVyxDQUFDLFVBQXlCO1FBQzNDLE9BQU8sR0FBRyxhQUFhLENBQUMsVUFBVSxDQUFDLElBQUksTUFBTSxDQUFDLElBQUksSUFBSSxFQUFFLEVBQUUsWUFBWSxDQUFDLEVBQUUsQ0FBQztJQUM1RSxDQUFDOzs7WUF2RkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxtQkFBbUI7Z0JBQzdCLDZTQUFpQztnQkFFakMsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNoRDs7Ozt5QkFFRSxLQUFLO21CQUNMLEtBQUs7c0JBQ0wsS0FBSztxQkFDTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZlRhYmxlQ2VsbH0gZnJvbSAnQGFqZi9jb3JlL3RhYmxlJztcbmltcG9ydCB7Q2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQsIFZpZXdFbmNhcHN1bGF0aW9ufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q2hhcnREYXRhfSBmcm9tICdjaGFydC5qcyc7XG5pbXBvcnQge2Zvcm1hdH0gZnJvbSAnZGF0ZS1mbnMnO1xuaW1wb3J0ICogYXMgWExTWCBmcm9tICd4bHN4JztcblxuaW1wb3J0IHtBamZXaWRnZXRUeXBlfSBmcm9tICcuLi9yZXBvcnRzL2ludGVyZmFjZS93aWRnZXRzL3dpZGdldC10eXBlJztcblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhamYtd2lkZ2V0LWV4cG9ydCcsXG4gIHRlbXBsYXRlVXJsOiAnd2lkZ2V0LWV4cG9ydC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ3dpZGdldC1leHBvcnQuY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBBamZXaWRnZXRFeHBvcnQge1xuICBASW5wdXQoKSB3aWRnZXRUeXBlOiBBamZXaWRnZXRUeXBlO1xuICBASW5wdXQoKSBkYXRhOiBDaGFydERhdGF8QWpmVGFibGVDZWxsW11bXTtcbiAgQElucHV0KCkgb3ZlcmxheSA9IHRydWU7XG4gIEBJbnB1dCgpIGVuYWJsZSA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICAvKipcbiAgICogRXhwb3J0IHdpZGdldCBkYXRhIGluIENTViBmb3JtYXRcbiAgICogQGRlcHJlY2F0ZWQgVXNlIGBBamZXaWRnZXRFeHBvcnQuZXhwb3J0YCB3aXRoICdjc3YnIHBhcmFtZXRlci5cbiAgICogQGJyZWFraW5nLWNoYW5nZSAxMy4wLjBcbiAgICovXG4gIGV4cG9ydENzdigpOiB2b2lkIHtcbiAgICB0aGlzLmV4cG9ydCgnY3N2Jyk7XG4gIH1cblxuICAvKipcbiAgICogRXhwb3J0IHdpZGdldCBkYXRhIGluIFhsc3ggZm9ybWF0XG4gICAqIEBkZXByZWNhdGVkIFVzZSBgQWpmV2lkZ2V0RXhwb3J0LmV4cG9ydGAgd2l0aCAneGxzeCcgcGFyYW1ldGVyLlxuICAgKiBAYnJlYWtpbmctY2hhbmdlIDEzLjAuMFxuICAgKi9cbiAgZXhwb3J0WGxzeCgpOiB2b2lkIHtcbiAgICB0aGlzLmV4cG9ydCgneGxzeCcpO1xuICB9XG5cbiAgLyoqXG4gICAqIEV4cG9ydCB3aWRnZXQgZGF0YSBpbiBDU1Ygb3IgWGxzeCBmb3JtYXRcbiAgICovXG4gIGV4cG9ydChib29rVHlwZTogJ2Nzdid8J3hsc3gnKTogdm9pZCB7XG4gICAgY29uc3Qgc2hlZXROYW1lID0gdGhpcy5fYnVpbGRUaXRsZSh0aGlzLndpZGdldFR5cGUpO1xuICAgIGNvbnN0IHNoZWV0czoge1tzaGVldDogc3RyaW5nXTogWExTWC5Xb3JrU2hlZXR9ID0ge307XG4gICAgc2hlZXRzW3NoZWV0TmFtZV0gPSBYTFNYLnV0aWxzLmpzb25fdG9fc2hlZXQodGhpcy5fYnVpbGRYbHN4RGF0YSgpKTtcbiAgICBjb25zdCB3b3JrQm9vazogWExTWC5Xb3JrQm9vayA9IHtTaGVldHM6IHNoZWV0cywgU2hlZXROYW1lczogW3NoZWV0TmFtZV19O1xuICAgIFhMU1gud3JpdGVGaWxlKHdvcmtCb29rLCBgJHtzaGVldE5hbWV9LiR7Ym9va1R5cGV9YCwge1xuICAgICAgYm9va1R5cGUsXG4gICAgICB0eXBlOiAnYXJyYXknLFxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfYnVpbGRYbHN4RGF0YSgpOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfG51bWJlcn1bXSB7XG4gICAgbGV0IHhsc3hEYXRhOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfG51bWJlcn1bXSA9IFtdO1xuICAgIGxldCBsYWJlbHM6IHN0cmluZ1tdID0gW107XG4gICAgc3dpdGNoICh0aGlzLndpZGdldFR5cGUpIHtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICBjYXNlIEFqZldpZGdldFR5cGUuQ2hhcnQ6XG4gICAgICAgIHRoaXMuZGF0YSA9IHRoaXMuZGF0YSBhcyBDaGFydERhdGE7XG4gICAgICAgIGNvbnN0IGRhdGFzZXRzID0gdGhpcy5kYXRhLmRhdGFzZXRzIHx8IFtdO1xuICAgICAgICBsYWJlbHMgPSB0aGlzLmRhdGEubGFiZWxzIGFzIHN0cmluZ1tdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGFzZXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgY29uc3Qgcm93OiB7W2lkOiBzdHJpbmddOiBhbnl9ID0ge307XG4gICAgICAgICAgY29uc3QgZGF0YSA9IGRhdGFzZXRzW2ldLmRhdGEgfHwgW107XG4gICAgICAgICAgcm93WyduYW1lJ10gPSBkYXRhc2V0c1tpXS5sYWJlbDtcbiAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGRhdGEubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIHJvd1tsYWJlbHNbal1dID0gZGF0YVtqXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgeGxzeERhdGEucHVzaChyb3cpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBBamZXaWRnZXRUeXBlLlRhYmxlOlxuICAgICAgICB0aGlzLmRhdGEgPSB0aGlzLmRhdGEgYXMgQWpmVGFibGVDZWxsW11bXTtcbiAgICAgICAgdGhpcy5kYXRhLmZvckVhY2goKHJvdzogQWpmVGFibGVDZWxsW10sIGlkeFJvdzogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgY29uc3QgcmVzOiB7W2lkOiBzdHJpbmddOiBhbnl9ID0ge307XG4gICAgICAgICAgaWYgKGlkeFJvdyA9PT0gMCkge1xuICAgICAgICAgICAgbGFiZWxzID0gcm93Lm1hcChyID0+IHIudmFsdWUuY2hhbmdpbmdUaGlzQnJlYWtzQXBwbGljYXRpb25TZWN1cml0eSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJvdy5mb3JFYWNoKChlbGVtOiBBamZUYWJsZUNlbGwsIGlkeEVsZW06IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgICByZXNbbGFiZWxzW2lkeEVsZW1dXSA9IGVsZW0udmFsdWUuY2hhbmdpbmdUaGlzQnJlYWtzQXBwbGljYXRpb25TZWN1cml0eTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgeGxzeERhdGEucHVzaChyZXMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHJldHVybiB4bHN4RGF0YTtcbiAgfVxuXG4gIHByaXZhdGUgX2J1aWxkVGl0bGUod2lkZ2V0VHlwZTogQWpmV2lkZ2V0VHlwZSk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGAke0FqZldpZGdldFR5cGVbd2lkZ2V0VHlwZV19ICR7Zm9ybWF0KG5ldyBEYXRlKCksIGB5eXl5LU1NLWRkYCl9YDtcbiAgfVxufVxuIl19