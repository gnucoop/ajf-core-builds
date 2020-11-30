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
import * as fileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { AjfWidgetType } from '../reports/interface/widgets/widget-type';
export class AjfWidgetExport {
    constructor() {
        this.overlay = true;
        this.enable = false;
    }
    buildCsv() {
        let csvString = '';
        const DELIMITER = ',';
        const STOP = '\n';
        switch (this.widgetType) {
            default:
            case AjfWidgetType.Chart:
                this.data = this.data;
                if (this.data.datasets == null || this.data.labels == null) {
                    return csvString;
                }
                csvString = DELIMITER + this.data.labels.toString() + STOP;
                this.data.datasets.forEach((dataset) => {
                    const data = dataset.data || [];
                    csvString += dataset.label + DELIMITER + data.toString() + STOP;
                });
                break;
            case AjfWidgetType.Table:
                let prefix = '';
                let rowSpan = 0;
                this.data = this.data;
                for (let row of this.data) {
                    csvString += prefix;
                    for (let elem of row) {
                        if (elem.rowspan == null) {
                            if (parseInt(elem.value, 10) || elem.value === false) {
                                csvString += elem.value + ',';
                            }
                            else {
                                csvString += elem.value + ',';
                            }
                        }
                        else {
                            rowSpan = elem.rowspan;
                            csvString += elem.value + ',';
                            prefix = ',';
                        }
                    }
                    if (csvString[csvString.length - 1] === ',') {
                        csvString = csvString.substring(0, csvString.length - 1);
                    }
                    csvString += '\n';
                    rowSpan--;
                    if (rowSpan > 0) {
                        csvString += ',';
                    }
                    prefix = '';
                }
                break;
        }
        return csvString;
    }
    exportCsv() {
        if (this.widgetType == null || this.data == null) {
            return;
        }
        fileSaver
            .default(new Blob([this.buildCsv()], { type: 'text/csv;charset=utf-8' }), `${this._buildTitle(this.widgetType)}${'.csv'}`);
    }
    buildXlsx() {
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
    exportXlsx() {
        const ws = XLSX.default.utils.json_to_sheet(this.buildXlsx());
        const wb = XLSX.default.utils.book_new();
        const title = this._buildTitle(this.widgetType);
        XLSX.default.utils.book_append_sheet(wb, ws, title);
        XLSX.default.writeFile(wb, `${title}.xlsx`);
    }
    _buildTitle(widgetType) {
        return `${AjfWidgetType[widgetType]} ${format(new Date(), `yyyy-MM-dd`)}`;
    }
}
AjfWidgetExport.decorators = [
    { type: Component, args: [{
                selector: 'ajf-widget-export',
                template: `
    <div class="ajf-widget-wrapper">
        <ng-content></ng-content>
        <div  *ngIf="enable" class="ajf-export-menu" [style.display]="!overlay?'block':'none'">
            <button (click)="exportCsv()">
                CSV
            </button>
            <button (click)="exportXlsx()" mat-menu-item>
                XLSX
            </button>
        </div>
    </div>
    `,
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["ajf-widget-export{width:100%;height:inherit}ajf-widget-export .ajf-export-menu{position:absolute;right:0;top:0}ajf-widget-export .ajf-export-menu button{margin:.5em;border:none;color:#fff;background-color:#4a403f;padding:7.5px 16px;text-align:center;text-decoration:none;display:inline-block;font-size:16px;cursor:pointer}ajf-widget-export .ajf-widget-wrapper{position:relative}ajf-widget-export .ajf-widget-wrapper:hover .ajf-export-menu{display:block !important}\n"]
            },] }
];
AjfWidgetExport.ctorParameters = () => [];
AjfWidgetExport.propDecorators = {
    widgetType: [{ type: Input }],
    data: [{ type: Input }],
    overlay: [{ type: Input }],
    enable: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0LWV4cG9ydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL3JlcG9ydHMvd2lkZ2V0LWV4cG9ydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFHSCxPQUFPLEVBQUMsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUUzRixPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sVUFBVSxDQUFDO0FBQ2hDLE9BQU8sS0FBSyxTQUFTLE1BQU0sWUFBWSxDQUFDO0FBQ3hDLE9BQU8sS0FBSyxJQUFJLE1BQU0sTUFBTSxDQUFDO0FBRTdCLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSwwQ0FBMEMsQ0FBQztBQXNCdkUsTUFBTSxPQUFPLGVBQWU7SUFLMUI7UUFGUyxZQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ2YsV0FBTSxHQUFHLEtBQUssQ0FBQztJQUNULENBQUM7SUFDaEIsUUFBUTtRQUNOLElBQUksU0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNuQixNQUFNLFNBQVMsR0FBRyxHQUFHLENBQUM7UUFDdEIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLFFBQVEsSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUN2QixRQUFRO1lBQ1IsS0FBSyxhQUFhLENBQUMsS0FBSztnQkFDdEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBaUIsQ0FBQztnQkFDbkMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxFQUFFO29CQUMxRCxPQUFPLFNBQVMsQ0FBQztpQkFDbEI7Z0JBQ0QsU0FBUyxHQUFHLFNBQVMsR0FBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQW1CLENBQUMsUUFBUSxFQUFFLEdB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LyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZlRhYmxlQ2VsbH0gZnJvbSAnQGFqZi9jb3JlL3RhYmxlJztcbmltcG9ydCB7Q2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQsIFZpZXdFbmNhcHN1bGF0aW9ufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q2hhcnREYXRhfSBmcm9tICdjaGFydC5qcyc7XG5pbXBvcnQge2Zvcm1hdH0gZnJvbSAnZGF0ZS1mbnMnO1xuaW1wb3J0ICogYXMgZmlsZVNhdmVyIGZyb20gJ2ZpbGUtc2F2ZXInO1xuaW1wb3J0ICogYXMgWExTWCBmcm9tICd4bHN4JztcblxuaW1wb3J0IHtBamZXaWRnZXRUeXBlfSBmcm9tICcuLi9yZXBvcnRzL2ludGVyZmFjZS93aWRnZXRzL3dpZGdldC10eXBlJztcblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhamYtd2lkZ2V0LWV4cG9ydCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cImFqZi13aWRnZXQtd3JhcHBlclwiPlxuICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICAgIDxkaXYgICpuZ0lmPVwiZW5hYmxlXCIgY2xhc3M9XCJhamYtZXhwb3J0LW1lbnVcIiBbc3R5bGUuZGlzcGxheV09XCIhb3ZlcmxheT8nYmxvY2snOidub25lJ1wiPlxuICAgICAgICAgICAgPGJ1dHRvbiAoY2xpY2spPVwiZXhwb3J0Q3N2KClcIj5cbiAgICAgICAgICAgICAgICBDU1ZcbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvbiAoY2xpY2spPVwiZXhwb3J0WGxzeCgpXCIgbWF0LW1lbnUtaXRlbT5cbiAgICAgICAgICAgICAgICBYTFNYXG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgYCxcbiAgc3R5bGVVcmxzOiBbJ3dpZGdldC1leHBvcnQuY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBBamZXaWRnZXRFeHBvcnQge1xuICBASW5wdXQoKSB3aWRnZXRUeXBlOiBBamZXaWRnZXRUeXBlO1xuICBASW5wdXQoKSBkYXRhOiBDaGFydERhdGF8QWpmVGFibGVDZWxsW11bXTtcbiAgQElucHV0KCkgb3ZlcmxheSA9IHRydWU7XG4gIEBJbnB1dCgpIGVuYWJsZSA9IGZhbHNlO1xuICBjb25zdHJ1Y3RvcigpIHt9XG4gIGJ1aWxkQ3N2KCk6IHN0cmluZyB7XG4gICAgbGV0IGNzdlN0cmluZyA9ICcnO1xuICAgIGNvbnN0IERFTElNSVRFUiA9ICcsJztcbiAgICBjb25zdCBTVE9QID0gJ1xcbic7XG4gICAgc3dpdGNoICh0aGlzLndpZGdldFR5cGUpIHtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICBjYXNlIEFqZldpZGdldFR5cGUuQ2hhcnQ6XG4gICAgICAgIHRoaXMuZGF0YSA9IHRoaXMuZGF0YSBhcyBDaGFydERhdGE7XG4gICAgICAgIGlmICh0aGlzLmRhdGEuZGF0YXNldHMgPT0gbnVsbCB8fCB0aGlzLmRhdGEubGFiZWxzID09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gY3N2U3RyaW5nO1xuICAgICAgICB9XG4gICAgICAgIGNzdlN0cmluZyA9IERFTElNSVRFUiArICh0aGlzLmRhdGEubGFiZWxzIGFzIHN0cmluZ1tdKS50b1N0cmluZygpICsgU1RPUDtcbiAgICAgICAgdGhpcy5kYXRhLmRhdGFzZXRzLmZvckVhY2goKGRhdGFzZXQ6IENoYXJ0LkNoYXJ0RGF0YVNldHMpID0+IHtcbiAgICAgICAgICBjb25zdCBkYXRhID0gZGF0YXNldC5kYXRhIHx8IFtdO1xuICAgICAgICAgIGNzdlN0cmluZyArPSBkYXRhc2V0LmxhYmVsICsgREVMSU1JVEVSICsgZGF0YS50b1N0cmluZygpICsgU1RPUDtcbiAgICAgICAgfSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBBamZXaWRnZXRUeXBlLlRhYmxlOlxuICAgICAgICBsZXQgcHJlZml4ID0gJyc7XG4gICAgICAgIGxldCByb3dTcGFuID0gMDtcbiAgICAgICAgdGhpcy5kYXRhID0gdGhpcy5kYXRhIGFzIEFqZlRhYmxlQ2VsbFtdW107XG4gICAgICAgIGZvciAobGV0IHJvdyBvZiB0aGlzLmRhdGEpIHtcbiAgICAgICAgICBjc3ZTdHJpbmcgKz0gcHJlZml4O1xuICAgICAgICAgIGZvciAobGV0IGVsZW0gb2Ygcm93KSB7XG4gICAgICAgICAgICBpZiAoZWxlbS5yb3dzcGFuID09IG51bGwpIHtcbiAgICAgICAgICAgICAgaWYgKHBhcnNlSW50KGVsZW0udmFsdWUsIDEwKSB8fCBlbGVtLnZhbHVlID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIGNzdlN0cmluZyArPSBlbGVtLnZhbHVlICsgJywnO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNzdlN0cmluZyArPSBlbGVtLnZhbHVlICsgJywnO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByb3dTcGFuID0gZWxlbS5yb3dzcGFuIGFzIG51bWJlcjtcbiAgICAgICAgICAgICAgY3N2U3RyaW5nICs9IGVsZW0udmFsdWUgKyAnLCc7XG4gICAgICAgICAgICAgIHByZWZpeCA9ICcsJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGNzdlN0cmluZ1tjc3ZTdHJpbmcubGVuZ3RoIC0gMV0gPT09ICcsJykge1xuICAgICAgICAgICAgY3N2U3RyaW5nID0gY3N2U3RyaW5nLnN1YnN0cmluZygwLCBjc3ZTdHJpbmcubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNzdlN0cmluZyArPSAnXFxuJztcbiAgICAgICAgICByb3dTcGFuLS07XG4gICAgICAgICAgaWYgKHJvd1NwYW4gPiAwKSB7XG4gICAgICAgICAgICBjc3ZTdHJpbmcgKz0gJywnO1xuICAgICAgICAgIH1cbiAgICAgICAgICBwcmVmaXggPSAnJztcbiAgICAgICAgfVxuXG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHJldHVybiBjc3ZTdHJpbmc7XG4gIH1cbiAgZXhwb3J0Q3N2KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLndpZGdldFR5cGUgPT0gbnVsbCB8fCB0aGlzLmRhdGEgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAoZmlsZVNhdmVyIGFzIGFueSlcbiAgICAgICAgLmRlZmF1bHQoXG4gICAgICAgICAgICBuZXcgQmxvYihbdGhpcy5idWlsZENzdigpXSwge3R5cGU6ICd0ZXh0L2NzdjtjaGFyc2V0PXV0Zi04J30pLFxuICAgICAgICAgICAgYCR7dGhpcy5fYnVpbGRUaXRsZSh0aGlzLndpZGdldFR5cGUpfSR7Jy5jc3YnfWApO1xuICB9XG5cbiAgYnVpbGRYbHN4KCk6IHtba2V5OiBzdHJpbmddOiBzdHJpbmd8bnVtYmVyfVtdIHtcbiAgICBsZXQgeGxzeERhdGE6IHtba2V5OiBzdHJpbmddOiBzdHJpbmd8bnVtYmVyfVtdID0gW107XG4gICAgbGV0IGxhYmVsczogc3RyaW5nW10gPSBbXTtcbiAgICBzd2l0Y2ggKHRoaXMud2lkZ2V0VHlwZSkge1xuICAgICAgZGVmYXVsdDpcbiAgICAgIGNhc2UgQWpmV2lkZ2V0VHlwZS5DaGFydDpcbiAgICAgICAgdGhpcy5kYXRhID0gdGhpcy5kYXRhIGFzIENoYXJ0RGF0YTtcbiAgICAgICAgY29uc3QgZGF0YXNldHMgPSB0aGlzLmRhdGEuZGF0YXNldHMgfHwgW107XG4gICAgICAgIGxhYmVscyA9IHRoaXMuZGF0YS5sYWJlbHMgYXMgc3RyaW5nW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YXNldHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBjb25zdCByb3c6IHtbaWQ6IHN0cmluZ106IGFueX0gPSB7fTtcbiAgICAgICAgICBjb25zdCBkYXRhID0gZGF0YXNldHNbaV0uZGF0YSB8fCBbXTtcbiAgICAgICAgICByb3dbJ25hbWUnXSA9IGRhdGFzZXRzW2ldLmxhYmVsO1xuICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgZGF0YS5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgcm93W2xhYmVsc1tqXV0gPSBkYXRhW2pdO1xuICAgICAgICAgIH1cbiAgICAgICAgICB4bHN4RGF0YS5wdXNoKHJvdyk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEFqZldpZGdldFR5cGUuVGFibGU6XG4gICAgICAgIHRoaXMuZGF0YSA9IHRoaXMuZGF0YSBhcyBBamZUYWJsZUNlbGxbXVtdO1xuICAgICAgICB0aGlzLmRhdGEuZm9yRWFjaCgocm93OiBBamZUYWJsZUNlbGxbXSwgaWR4Um93OiBudW1iZXIpID0+IHtcbiAgICAgICAgICBjb25zdCByZXM6IHtbaWQ6IHN0cmluZ106IGFueX0gPSB7fTtcbiAgICAgICAgICBpZiAoaWR4Um93ID09PSAwKSB7XG4gICAgICAgICAgICBsYWJlbHMgPSByb3cubWFwKHIgPT4gci52YWx1ZS5jaGFuZ2luZ1RoaXNCcmVha3NBcHBsaWNhdGlvblNlY3VyaXR5KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcm93LmZvckVhY2goKGVsZW06IEFqZlRhYmxlQ2VsbCwgaWR4RWxlbTogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICAgIHJlc1tsYWJlbHNbaWR4RWxlbV1dID0gZWxlbS52YWx1ZS5jaGFuZ2luZ1RoaXNCcmVha3NBcHBsaWNhdGlvblNlY3VyaXR5O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB4bHN4RGF0YS5wdXNoKHJlcyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgcmV0dXJuIHhsc3hEYXRhO1xuICB9XG5cbiAgZXhwb3J0WGxzeCgpOiB2b2lkIHtcbiAgICBjb25zdCB3czogWExTWC5Xb3JrU2hlZXQgPSAoWExTWCBhcyBhbnkpLmRlZmF1bHQudXRpbHMuanNvbl90b19zaGVldCh0aGlzLmJ1aWxkWGxzeCgpKTtcbiAgICBjb25zdCB3YjogWExTWC5Xb3JrQm9vayA9IChYTFNYIGFzIGFueSkuZGVmYXVsdC51dGlscy5ib29rX25ldygpO1xuICAgIGNvbnN0IHRpdGxlID0gdGhpcy5fYnVpbGRUaXRsZSh0aGlzLndpZGdldFR5cGUpO1xuXG4gICAgKFhMU1ggYXMgYW55KS5kZWZhdWx0LnV0aWxzLmJvb2tfYXBwZW5kX3NoZWV0KHdiLCB3cywgdGl0bGUpO1xuICAgIChYTFNYIGFzIGFueSkuZGVmYXVsdC53cml0ZUZpbGUod2IsIGAke3RpdGxlfS54bHN4YCk7XG4gIH1cblxuICBwcml2YXRlIF9idWlsZFRpdGxlKHdpZGdldFR5cGU6IEFqZldpZGdldFR5cGUpOiBzdHJpbmcge1xuICAgIHJldHVybiBgJHtBamZXaWRnZXRUeXBlW3dpZGdldFR5cGVdfSAke2Zvcm1hdChuZXcgRGF0ZSgpLCBgeXl5eS1NTS1kZGApfWA7XG4gIH1cbn1cbiJdfQ==