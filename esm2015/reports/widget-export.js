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
        sheets[sheetName] = XLSX.utils.aoa_to_sheet(this._buildXlsxData());
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
                labels = ['name'].concat(this.data.labels);
                xlsxData.push(labels);
                for (let i = 0; i < datasets.length; i++) {
                    const row = [];
                    const data = datasets[i].data || [];
                    row.push(datasets[i].label);
                    for (let j = 0; j < data.length; j++) {
                        row.push(data[j]);
                    }
                    xlsxData.push(row);
                }
                break;
            case AjfWidgetType.Table:
                this.data = this.data;
                this.data.forEach((row, idxRow) => {
                    const res = [];
                    if (idxRow === 0) {
                        row.forEach((elem) => {
                            labels.push(elem.value.changingThisBreaksApplicationSecurity);
                            if (elem.colspan && elem.colspan > 1) {
                                for (let i = 1; i < elem.colspan; i++) {
                                    labels.push(' ');
                                }
                            }
                        });
                        xlsxData.push(labels);
                    }
                    else {
                        row.forEach((elem) => {
                            res.push(elem.value.changingThisBreaksApplicationSecurity);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0LWV4cG9ydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL3JlcG9ydHMvd2lkZ2V0LWV4cG9ydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFHSCxPQUFPLEVBQUMsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUUzRixPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sVUFBVSxDQUFDO0FBQ2hDLE9BQU8sS0FBSyxJQUFJLE1BQU0sTUFBTSxDQUFDO0FBRTdCLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSwwQ0FBMEMsQ0FBQztBQVV2RSxNQUFNLE9BQU8sZUFBZTtJQU0xQjtRQUhTLFlBQU8sR0FBRyxJQUFJLENBQUM7UUFDZixXQUFNLEdBQUcsS0FBSyxDQUFDO0lBRVQsQ0FBQztJQUVoQjs7OztPQUlHO0lBQ0gsU0FBUztRQUNQLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDckIsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxVQUFVO1FBQ1IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN0QixDQUFDO0lBRUQ7O09BRUc7SUFDSCxNQUFNLENBQUMsUUFBc0I7UUFDM0IsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDcEQsTUFBTSxNQUFNLEdBQXNDLEVBQUUsQ0FBQztRQUNyRCxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUM7UUFDbkUsTUFBTSxRQUFRLEdBQWtCLEVBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsQ0FBQyxTQUFTLENBQUMsRUFB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TyxXQUFXLENBQUMsVUFBeUI7UUFDM0MsT0FBTyxHQUFHLGFBQWEsQ0FBQyxVQUFVLENBQUMsSUFBSSxNQUFNLENBQUMsSUFBSSxJQUFJLEVBQUUsRUFBRSxZQUFZLENBQUMsRUFBRSxDQUFDO0lBQzVFLENBQUM7OztZQWhHRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjtnQkFDN0IsNlNBQWlDO2dCQUVqQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2hEOzs7O3lCQUVFLEtBQUs7bUJBQ0wsS0FBSztzQkFDTCxLQUFLO3FCQUNMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmVGFibGVDZWxsfSBmcm9tICdAYWpmL2NvcmUvdGFibGUnO1xuaW1wb3J0IHtDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dCwgVmlld0VuY2Fwc3VsYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDaGFydERhdGF9IGZyb20gJ2NoYXJ0LmpzJztcbmltcG9ydCB7Zm9ybWF0fSBmcm9tICdkYXRlLWZucyc7XG5pbXBvcnQgKiBhcyBYTFNYIGZyb20gJ3hsc3gnO1xuXG5pbXBvcnQge0FqZldpZGdldFR5cGV9IGZyb20gJy4uL3JlcG9ydHMvaW50ZXJmYWNlL3dpZGdldHMvd2lkZ2V0LXR5cGUnO1xuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FqZi13aWRnZXQtZXhwb3J0JyxcbiAgdGVtcGxhdGVVcmw6ICd3aWRnZXQtZXhwb3J0Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnd2lkZ2V0LWV4cG9ydC5jc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIEFqZldpZGdldEV4cG9ydCB7XG4gIEBJbnB1dCgpIHdpZGdldFR5cGU6IEFqZldpZGdldFR5cGU7XG4gIEBJbnB1dCgpIGRhdGE6IENoYXJ0RGF0YXxBamZUYWJsZUNlbGxbXVtdO1xuICBASW5wdXQoKSBvdmVybGF5ID0gdHJ1ZTtcbiAgQElucHV0KCkgZW5hYmxlID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIC8qKlxuICAgKiBFeHBvcnQgd2lkZ2V0IGRhdGEgaW4gQ1NWIGZvcm1hdFxuICAgKiBAZGVwcmVjYXRlZCBVc2UgYEFqZldpZGdldEV4cG9ydC5leHBvcnRgIHdpdGggJ2NzdicgcGFyYW1ldGVyLlxuICAgKiBAYnJlYWtpbmctY2hhbmdlIDEzLjAuMFxuICAgKi9cbiAgZXhwb3J0Q3N2KCk6IHZvaWQge1xuICAgIHRoaXMuZXhwb3J0KCdjc3YnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFeHBvcnQgd2lkZ2V0IGRhdGEgaW4gWGxzeCBmb3JtYXRcbiAgICogQGRlcHJlY2F0ZWQgVXNlIGBBamZXaWRnZXRFeHBvcnQuZXhwb3J0YCB3aXRoICd4bHN4JyBwYXJhbWV0ZXIuXG4gICAqIEBicmVha2luZy1jaGFuZ2UgMTMuMC4wXG4gICAqL1xuICBleHBvcnRYbHN4KCk6IHZvaWQge1xuICAgIHRoaXMuZXhwb3J0KCd4bHN4Jyk7XG4gIH1cblxuICAvKipcbiAgICogRXhwb3J0IHdpZGdldCBkYXRhIGluIENTViBvciBYbHN4IGZvcm1hdFxuICAgKi9cbiAgZXhwb3J0KGJvb2tUeXBlOiAnY3N2J3wneGxzeCcpOiB2b2lkIHtcbiAgICBjb25zdCBzaGVldE5hbWUgPSB0aGlzLl9idWlsZFRpdGxlKHRoaXMud2lkZ2V0VHlwZSk7XG4gICAgY29uc3Qgc2hlZXRzOiB7W3NoZWV0OiBzdHJpbmddOiBYTFNYLldvcmtTaGVldH0gPSB7fTtcbiAgICBzaGVldHNbc2hlZXROYW1lXSA9IFhMU1gudXRpbHMuYW9hX3RvX3NoZWV0KHRoaXMuX2J1aWxkWGxzeERhdGEoKSk7XG4gICAgY29uc3Qgd29ya0Jvb2s6IFhMU1guV29ya0Jvb2sgPSB7U2hlZXRzOiBzaGVldHMsIFNoZWV0TmFtZXM6IFtzaGVldE5hbWVdfTtcbiAgICBYTFNYLndyaXRlRmlsZSh3b3JrQm9vaywgYCR7c2hlZXROYW1lfS4ke2Jvb2tUeXBlfWAsIHtcbiAgICAgIGJvb2tUeXBlLFxuICAgICAgdHlwZTogJ2FycmF5JyxcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2J1aWxkWGxzeERhdGEoKTogdW5rbm93bltdW10ge1xuICAgIGxldCB4bHN4RGF0YTogdW5rbm93bltdW10gPSBbXTtcbiAgICBsZXQgbGFiZWxzOiBzdHJpbmdbXSA9IFtdO1xuICAgIHN3aXRjaCAodGhpcy53aWRnZXRUeXBlKSB7XG4gICAgICBkZWZhdWx0OlxuICAgICAgY2FzZSBBamZXaWRnZXRUeXBlLkNoYXJ0OlxuICAgICAgICB0aGlzLmRhdGEgPSB0aGlzLmRhdGEgYXMgQ2hhcnREYXRhO1xuICAgICAgICBjb25zdCBkYXRhc2V0cyA9IHRoaXMuZGF0YS5kYXRhc2V0cyB8fCBbXTtcbiAgICAgICAgbGFiZWxzID0gWyduYW1lJ10uY29uY2F0KHRoaXMuZGF0YS5sYWJlbHMgYXMgc3RyaW5nW10pO1xuICAgICAgICB4bHN4RGF0YS5wdXNoKGxhYmVscyk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YXNldHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBjb25zdCByb3c6IHVua25vd25bXSA9IFtdO1xuICAgICAgICAgIGNvbnN0IGRhdGEgPSBkYXRhc2V0c1tpXS5kYXRhIHx8IFtdO1xuICAgICAgICAgIHJvdy5wdXNoKGRhdGFzZXRzW2ldLmxhYmVsKTtcbiAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGRhdGEubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIHJvdy5wdXNoKGRhdGFbal0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICB4bHN4RGF0YS5wdXNoKHJvdyk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEFqZldpZGdldFR5cGUuVGFibGU6XG4gICAgICAgIHRoaXMuZGF0YSA9IHRoaXMuZGF0YSBhcyBBamZUYWJsZUNlbGxbXVtdO1xuICAgICAgICB0aGlzLmRhdGEuZm9yRWFjaCgocm93OiBBamZUYWJsZUNlbGxbXSwgaWR4Um93OiBudW1iZXIpID0+IHtcbiAgICAgICAgICBjb25zdCByZXM6IHVua25vd25bXSA9IFtdO1xuICAgICAgICAgIGlmIChpZHhSb3cgPT09IDApIHtcbiAgICAgICAgICAgIHJvdy5mb3JFYWNoKChlbGVtOiBBamZUYWJsZUNlbGwpID0+IHtcbiAgICAgICAgICAgICAgbGFiZWxzLnB1c2goZWxlbS52YWx1ZS5jaGFuZ2luZ1RoaXNCcmVha3NBcHBsaWNhdGlvblNlY3VyaXR5KTtcbiAgICAgICAgICAgICAgaWYgKGVsZW0uY29sc3BhbiAmJiBlbGVtLmNvbHNwYW4gPiAxKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBlbGVtLmNvbHNwYW47IGkrKykge1xuICAgICAgICAgICAgICAgICAgbGFiZWxzLnB1c2goJyAnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgeGxzeERhdGEucHVzaChsYWJlbHMpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByb3cuZm9yRWFjaCgoZWxlbTogQWpmVGFibGVDZWxsKSA9PiB7XG4gICAgICAgICAgICAgIHJlcy5wdXNoKGVsZW0udmFsdWUuY2hhbmdpbmdUaGlzQnJlYWtzQXBwbGljYXRpb25TZWN1cml0eSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHhsc3hEYXRhLnB1c2gocmVzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICByZXR1cm4geGxzeERhdGE7XG4gIH1cblxuICBwcml2YXRlIF9idWlsZFRpdGxlKHdpZGdldFR5cGU6IEFqZldpZGdldFR5cGUpOiBzdHJpbmcge1xuICAgIHJldHVybiBgJHtBamZXaWRnZXRUeXBlW3dpZGdldFR5cGVdfSAke2Zvcm1hdChuZXcgRGF0ZSgpLCBgeXl5eS1NTS1kZGApfWA7XG4gIH1cbn1cbiJdfQ==