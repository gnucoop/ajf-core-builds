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
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { AjfWidgetType } from '../reports/interface/widgets/widget-type';
export class AjfWidgetExport {
    constructor() {
        this.overlay = true;
        this.enable = false;
    }
    exportCsv() {
        const sheetName = this._buildTitle(this.widgetType);
        const worksheet = XLSX.utils.json_to_sheet(this._buildXlsxData());
        const csv = XLSX.utils.sheet_to_csv(worksheet);
        saveAs(new Blob([csv], { type: 'text/csv;charset=utf-8' }), `${sheetName}${'.csv'}`);
    }
    exportXlsx() {
        const sheetName = this._buildTitle(this.widgetType);
        const sheets = {};
        sheets[sheetName] = XLSX.utils.json_to_sheet(this._buildXlsxData());
        const worksheet = { Sheets: sheets, SheetNames: [sheetName] };
        const excelBuffer = XLSX.write(worksheet, {
            bookType: 'xlsx',
            type: 'array',
        });
        saveAs(new Blob([excelBuffer]), `${sheetName}.xlsx`);
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
                styles: ["ajf-widget-export{width:100%;height:inherit}ajf-widget-export .ajf-export-menu{position:absolute;right:0;top:0}ajf-widget-export .ajf-export-menu button{margin:.5em;border:none;color:#fff;background-color:#4a403f;padding:7.5px 16px;text-align:center;text-decoration:none;display:inline-block;font-size:16px;cursor:pointer}ajf-widget-export .ajf-widget-wrapper{position:relative;height:inherit}ajf-widget-export .ajf-widget-wrapper:hover .ajf-export-menu{display:block !important}\n"]
            },] }
];
AjfWidgetExport.ctorParameters = () => [];
AjfWidgetExport.propDecorators = {
    widgetType: [{ type: Input }],
    data: [{ type: Input }],
    overlay: [{ type: Input }],
    enable: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0LWV4cG9ydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL3JlcG9ydHMvd2lkZ2V0LWV4cG9ydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFHSCxPQUFPLEVBQUMsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUUzRixPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sVUFBVSxDQUFDO0FBQ2hDLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxZQUFZLENBQUM7QUFDbEMsT0FBTyxLQUFLLElBQUksTUFBTSxNQUFNLENBQUM7QUFFN0IsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLDBDQUEwQyxDQUFDO0FBc0J2RSxNQUFNLE9BQU8sZUFBZTtJQUsxQjtRQUZTLFlBQU8sR0FBRyxJQUFJLENBQUM7UUFDZixXQUFNLEdBQUcsS0FBSyxDQUFDO0lBQ1QsQ0FBQztJQUVoQixTQUFTO1FBQ1AsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDcEQsTUFBTSxTQUFTLEdBQW1CLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDO1FBQ2xGLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRS9DLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUMsSUFBSSxFQUFFLHdCQUF3QixFQUFDLENBQUMsRUFBRSxHQUFHLFNBQVMsR0FBRyxNQUFNLEVBQUUsQ0FBQyxDQUFDO0lBQ3JGLENBQUM7SUFFRCxVQUFVO1FBQ1IsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFdBQVcs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QUMsVUFBeUI7UUFDM0MsT0FBTyxHQUFHLGFBQWEsQ0FBQyxVQUFVLENBQUMsSUFBSSxNQUFNLENBQUMsSUFBSSxJQUFJLEVBQUUsRUFBRSxZQUFZLENBQUMsRUFBRSxDQUFDO0lBQzVFLENBQUM7OztZQXZGRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjtnQkFDN0IsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7S0FZUDtnQkFFSCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2hEOzs7O3lCQUVFLEtBQUs7bUJBQ0wsS0FBSztzQkFDTCxLQUFLO3FCQUNMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmVGFibGVDZWxsfSBmcm9tICdAYWpmL2NvcmUvdGFibGUnO1xuaW1wb3J0IHtDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dCwgVmlld0VuY2Fwc3VsYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDaGFydERhdGF9IGZyb20gJ2NoYXJ0LmpzJztcbmltcG9ydCB7Zm9ybWF0fSBmcm9tICdkYXRlLWZucyc7XG5pbXBvcnQge3NhdmVBc30gZnJvbSAnZmlsZS1zYXZlcic7XG5pbXBvcnQgKiBhcyBYTFNYIGZyb20gJ3hsc3gnO1xuXG5pbXBvcnQge0FqZldpZGdldFR5cGV9IGZyb20gJy4uL3JlcG9ydHMvaW50ZXJmYWNlL3dpZGdldHMvd2lkZ2V0LXR5cGUnO1xuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FqZi13aWRnZXQtZXhwb3J0JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwiYWpmLXdpZGdldC13cmFwcGVyXCI+XG4gICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgPGRpdiAgKm5nSWY9XCJlbmFibGVcIiBjbGFzcz1cImFqZi1leHBvcnQtbWVudVwiIFtzdHlsZS5kaXNwbGF5XT1cIiFvdmVybGF5PydibG9jayc6J25vbmUnXCI+XG4gICAgICAgICAgICA8YnV0dG9uIChjbGljayk9XCJleHBvcnRDc3YoKVwiPlxuICAgICAgICAgICAgICAgIENTVlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIChjbGljayk9XCJleHBvcnRYbHN4KClcIiBtYXQtbWVudS1pdGVtPlxuICAgICAgICAgICAgICAgIFhMU1hcbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICBgLFxuICBzdHlsZVVybHM6IFsnd2lkZ2V0LWV4cG9ydC5jc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIEFqZldpZGdldEV4cG9ydCB7XG4gIEBJbnB1dCgpIHdpZGdldFR5cGU6IEFqZldpZGdldFR5cGU7XG4gIEBJbnB1dCgpIGRhdGE6IENoYXJ0RGF0YXxBamZUYWJsZUNlbGxbXVtdO1xuICBASW5wdXQoKSBvdmVybGF5ID0gdHJ1ZTtcbiAgQElucHV0KCkgZW5hYmxlID0gZmFsc2U7XG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBleHBvcnRDc3YoKTogdm9pZCB7XG4gICAgY29uc3Qgc2hlZXROYW1lID0gdGhpcy5fYnVpbGRUaXRsZSh0aGlzLndpZGdldFR5cGUpO1xuICAgIGNvbnN0IHdvcmtzaGVldDogWExTWC5Xb3JrU2hlZXQgPSBYTFNYLnV0aWxzLmpzb25fdG9fc2hlZXQodGhpcy5fYnVpbGRYbHN4RGF0YSgpKTtcbiAgICBjb25zdCBjc3YgPSBYTFNYLnV0aWxzLnNoZWV0X3RvX2Nzdih3b3Jrc2hlZXQpO1xuXG4gICAgc2F2ZUFzKG5ldyBCbG9iKFtjc3ZdLCB7dHlwZTogJ3RleHQvY3N2O2NoYXJzZXQ9dXRmLTgnfSksIGAke3NoZWV0TmFtZX0keycuY3N2J31gKTtcbiAgfVxuXG4gIGV4cG9ydFhsc3goKTogdm9pZCB7XG4gICAgY29uc3Qgc2hlZXROYW1lID0gdGhpcy5fYnVpbGRUaXRsZSh0aGlzLndpZGdldFR5cGUpO1xuICAgIGNvbnN0IHNoZWV0czoge1tzaGVldDogc3RyaW5nXTogWExTWC5Xb3JrU2hlZXR9ID0ge307XG4gICAgc2hlZXRzW3NoZWV0TmFtZV0gPSBYTFNYLnV0aWxzLmpzb25fdG9fc2hlZXQodGhpcy5fYnVpbGRYbHN4RGF0YSgpKTtcbiAgICBjb25zdCB3b3Jrc2hlZXQ6IFhMU1guV29ya0Jvb2sgPSB7U2hlZXRzOiBzaGVldHMsIFNoZWV0TmFtZXM6IFtzaGVldE5hbWVdfTtcbiAgICBjb25zdCBleGNlbEJ1ZmZlciA9IFhMU1gud3JpdGUod29ya3NoZWV0LCB7XG4gICAgICBib29rVHlwZTogJ3hsc3gnLFxuICAgICAgdHlwZTogJ2FycmF5JyxcbiAgICB9KTtcblxuICAgIHNhdmVBcyhuZXcgQmxvYihbZXhjZWxCdWZmZXJdKSwgYCR7c2hlZXROYW1lfS54bHN4YCk7XG4gIH1cblxuICBwcml2YXRlIF9idWlsZFhsc3hEYXRhKCk6IHtba2V5OiBzdHJpbmddOiBzdHJpbmd8bnVtYmVyfVtdIHtcbiAgICBsZXQgeGxzeERhdGE6IHtba2V5OiBzdHJpbmddOiBzdHJpbmd8bnVtYmVyfVtdID0gW107XG4gICAgbGV0IGxhYmVsczogc3RyaW5nW10gPSBbXTtcbiAgICBzd2l0Y2ggKHRoaXMud2lkZ2V0VHlwZSkge1xuICAgICAgZGVmYXVsdDpcbiAgICAgIGNhc2UgQWpmV2lkZ2V0VHlwZS5DaGFydDpcbiAgICAgICAgdGhpcy5kYXRhID0gdGhpcy5kYXRhIGFzIENoYXJ0RGF0YTtcbiAgICAgICAgY29uc3QgZGF0YXNldHMgPSB0aGlzLmRhdGEuZGF0YXNldHMgfHwgW107XG4gICAgICAgIGxhYmVscyA9IHRoaXMuZGF0YS5sYWJlbHMgYXMgc3RyaW5nW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YXNldHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBjb25zdCByb3c6IHtbaWQ6IHN0cmluZ106IGFueX0gPSB7fTtcbiAgICAgICAgICBjb25zdCBkYXRhID0gZGF0YXNldHNbaV0uZGF0YSB8fCBbXTtcbiAgICAgICAgICByb3dbJ25hbWUnXSA9IGRhdGFzZXRzW2ldLmxhYmVsO1xuICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgZGF0YS5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgcm93W2xhYmVsc1tqXV0gPSBkYXRhW2pdO1xuICAgICAgICAgIH1cbiAgICAgICAgICB4bHN4RGF0YS5wdXNoKHJvdyk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEFqZldpZGdldFR5cGUuVGFibGU6XG4gICAgICAgIHRoaXMuZGF0YSA9IHRoaXMuZGF0YSBhcyBBamZUYWJsZUNlbGxbXVtdO1xuICAgICAgICB0aGlzLmRhdGEuZm9yRWFjaCgocm93OiBBamZUYWJsZUNlbGxbXSwgaWR4Um93OiBudW1iZXIpID0+IHtcbiAgICAgICAgICBjb25zdCByZXM6IHtbaWQ6IHN0cmluZ106IGFueX0gPSB7fTtcbiAgICAgICAgICBpZiAoaWR4Um93ID09PSAwKSB7XG4gICAgICAgICAgICBsYWJlbHMgPSByb3cubWFwKHIgPT4gci52YWx1ZS5jaGFuZ2luZ1RoaXNCcmVha3NBcHBsaWNhdGlvblNlY3VyaXR5KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcm93LmZvckVhY2goKGVsZW06IEFqZlRhYmxlQ2VsbCwgaWR4RWxlbTogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICAgIHJlc1tsYWJlbHNbaWR4RWxlbV1dID0gZWxlbS52YWx1ZS5jaGFuZ2luZ1RoaXNCcmVha3NBcHBsaWNhdGlvblNlY3VyaXR5O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB4bHN4RGF0YS5wdXNoKHJlcyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgcmV0dXJuIHhsc3hEYXRhO1xuICB9XG5cbiAgcHJpdmF0ZSBfYnVpbGRUaXRsZSh3aWRnZXRUeXBlOiBBamZXaWRnZXRUeXBlKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYCR7QWpmV2lkZ2V0VHlwZVt3aWRnZXRUeXBlXX0gJHtmb3JtYXQobmV3IERhdGUoKSwgYHl5eXktTU0tZGRgKX1gO1xuICB9XG59XG4iXX0=