import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { format } from 'date-fns';
import * as XLSX from 'xlsx';
import { AjfWidgetType } from '../reports/interface/widgets/widget-type';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
const xlsxMod = (XLSX.default || XLSX);
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
        sheets[sheetName] = xlsxMod.utils.aoa_to_sheet(this._buildXlsxData());
        const workBook = { Sheets: sheets, SheetNames: [sheetName] };
        xlsxMod.writeFile(workBook, `${sheetName}.${bookType}`, {
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
AjfWidgetExport.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfWidgetExport, deps: [], target: i0.ɵɵFactoryTarget.Component });
AjfWidgetExport.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.0-next.15", type: AjfWidgetExport, selector: "ajf-widget-export", inputs: { widgetType: "widgetType", data: "data", overlay: "overlay", enable: "enable" }, ngImport: i0, template: "<div class=\"ajf-widget-wrapper\">\n  <ng-content></ng-content>\n  <div *ngIf=\"enable\" class=\"ajf-export-menu\" [class.ajf-export-menu-overlay]=\"overlay\">\n      <button (click)=\"export('csv')\">CSV</button>\n      <button (click)=\"export('xlsx')\">XLSX</button>\n  </div>\n</div>\n", styles: ["ajf-widget-export{width:100%;height:inherit}ajf-widget-export .ajf-widget-wrapper{position:relative;height:inherit}ajf-widget-export .ajf-export-menu{position:absolute;right:0;top:0}ajf-widget-export .ajf-export-menu.ajf-export-menu-overlay{display:none}ajf-widget-export .ajf-export-menu button{margin:.5em;border:none;color:#fff;background-color:#4a403f;padding:7.5px 16px;text-align:center;text-decoration:none;display:inline-block;font-size:16px;cursor:pointer}ajf-widget-export .ajf-widget-wrapper:hover .ajf-export-menu-overlay{display:block}\n"], directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfWidgetExport, decorators: [{
            type: Component,
            args: [{ selector: 'ajf-widget-export', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"ajf-widget-wrapper\">\n  <ng-content></ng-content>\n  <div *ngIf=\"enable\" class=\"ajf-export-menu\" [class.ajf-export-menu-overlay]=\"overlay\">\n      <button (click)=\"export('csv')\">CSV</button>\n      <button (click)=\"export('xlsx')\">XLSX</button>\n  </div>\n</div>\n", styles: ["ajf-widget-export{width:100%;height:inherit}ajf-widget-export .ajf-widget-wrapper{position:relative;height:inherit}ajf-widget-export .ajf-export-menu{position:absolute;right:0;top:0}ajf-widget-export .ajf-export-menu.ajf-export-menu-overlay{display:none}ajf-widget-export .ajf-export-menu button{margin:.5em;border:none;color:#fff;background-color:#4a403f;padding:7.5px 16px;text-align:center;text-decoration:none;display:inline-block;font-size:16px;cursor:pointer}ajf-widget-export .ajf-widget-wrapper:hover .ajf-export-menu-overlay{display:block}\n"] }]
        }], ctorParameters: function () { return []; }, propDecorators: { widgetType: [{
                type: Input
            }], data: [{
                type: Input
            }], overlay: [{
                type: Input
            }], enable: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0LWV4cG9ydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL3JlcG9ydHMvd2lkZ2V0LWV4cG9ydC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL3JlcG9ydHMvd2lkZ2V0LWV4cG9ydC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXVCQSxPQUFPLEVBQUMsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUUzRixPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sVUFBVSxDQUFDO0FBQ2hDLE9BQU8sS0FBSyxJQUFJLE1BQU0sTUFBTSxDQUFDO0FBSTdCLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSwwQ0FBMEMsQ0FBQzs7O0FBRnZFLE1BQU0sT0FBTyxHQUFHLENBQUUsSUFBWSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQWdCLENBQUM7QUFXL0QsTUFBTSxPQUFPLGVBQWU7SUFNMUI7UUFIUyxZQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ2YsV0FBTSxHQUFHLEtBQUssQ0FBQztJQUVULENBQUM7SUFFaEI7Ozs7T0FJRztJQUNILFNBQVM7UUFDUCxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3JCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsVUFBVTtRQUNSLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdEIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsTUFBTSxDQUFDLFFBQXdCO1FBQzdCLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3BELE1BQU0sTUFBTSxHQUFzQyxFQUFFLENBQUM7UUFDckQsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxjQUFj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QUcsQ0FBQyxDQUFDO3FCQUNwQjtnQkFDSCxDQUFDLENBQUMsQ0FBQztnQkFDSCxNQUFNO1NBQ1Q7UUFFRCxPQUFPLFFBQVEsQ0FBQztJQUNsQixDQUFDO0lBRU8sV0FBVyxDQUFDLFVBQXlCO1FBQzNDLE9BQU8sR0FBRyxhQUFhLENBQUMsVUFBVSxDQUFDLElBQUksTUFBTSxDQUFDLElBQUksSUFBSSxFQUFFLEVBQUUsWUFBWSxDQUFDLEVBQUUsQ0FBQztJQUM1RSxDQUFDOztvSEF6RlUsZUFBZTt3R0FBZixlQUFlLG1KQ3ZDNUIsbVNBT0E7bUdEZ0NhLGVBQWU7a0JBUDNCLFNBQVM7K0JBQ0UsbUJBQW1CLGlCQUdkLGlCQUFpQixDQUFDLElBQUksbUJBQ3BCLHVCQUF1QixDQUFDLE1BQU07MEVBR3RDLFVBQVU7c0JBQWxCLEtBQUs7Z0JBQ0csSUFBSTtzQkFBWixLQUFLO2dCQUNHLE9BQU87c0JBQWYsS0FBSztnQkFDRyxNQUFNO3NCQUFkLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmVGFibGVDZWxsfSBmcm9tICdAYWpmL2NvcmUvdGFibGUnO1xuaW1wb3J0IHtDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dCwgVmlld0VuY2Fwc3VsYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDaGFydERhdGF9IGZyb20gJ2NoYXJ0LmpzJztcbmltcG9ydCB7Zm9ybWF0fSBmcm9tICdkYXRlLWZucyc7XG5pbXBvcnQgKiBhcyBYTFNYIGZyb20gJ3hsc3gnO1xuXG5jb25zdCB4bHN4TW9kID0gKChYTFNYIGFzIGFueSkuZGVmYXVsdCB8fCBYTFNYKSBhcyB0eXBlb2YgWExTWDtcblxuaW1wb3J0IHtBamZXaWRnZXRUeXBlfSBmcm9tICcuLi9yZXBvcnRzL2ludGVyZmFjZS93aWRnZXRzL3dpZGdldC10eXBlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWpmLXdpZGdldC1leHBvcnQnLFxuICB0ZW1wbGF0ZVVybDogJ3dpZGdldC1leHBvcnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWyd3aWRnZXQtZXhwb3J0LmNzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgQWpmV2lkZ2V0RXhwb3J0IHtcbiAgQElucHV0KCkgd2lkZ2V0VHlwZTogQWpmV2lkZ2V0VHlwZTtcbiAgQElucHV0KCkgZGF0YTogQ2hhcnREYXRhIHwgQWpmVGFibGVDZWxsW11bXTtcbiAgQElucHV0KCkgb3ZlcmxheSA9IHRydWU7XG4gIEBJbnB1dCgpIGVuYWJsZSA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICAvKipcbiAgICogRXhwb3J0IHdpZGdldCBkYXRhIGluIENTViBmb3JtYXRcbiAgICogQGRlcHJlY2F0ZWQgVXNlIGBBamZXaWRnZXRFeHBvcnQuZXhwb3J0YCB3aXRoICdjc3YnIHBhcmFtZXRlci5cbiAgICogQGJyZWFraW5nLWNoYW5nZSAxMy4wLjBcbiAgICovXG4gIGV4cG9ydENzdigpOiB2b2lkIHtcbiAgICB0aGlzLmV4cG9ydCgnY3N2Jyk7XG4gIH1cblxuICAvKipcbiAgICogRXhwb3J0IHdpZGdldCBkYXRhIGluIFhsc3ggZm9ybWF0XG4gICAqIEBkZXByZWNhdGVkIFVzZSBgQWpmV2lkZ2V0RXhwb3J0LmV4cG9ydGAgd2l0aCAneGxzeCcgcGFyYW1ldGVyLlxuICAgKiBAYnJlYWtpbmctY2hhbmdlIDEzLjAuMFxuICAgKi9cbiAgZXhwb3J0WGxzeCgpOiB2b2lkIHtcbiAgICB0aGlzLmV4cG9ydCgneGxzeCcpO1xuICB9XG5cbiAgLyoqXG4gICAqIEV4cG9ydCB3aWRnZXQgZGF0YSBpbiBDU1Ygb3IgWGxzeCBmb3JtYXRcbiAgICovXG4gIGV4cG9ydChib29rVHlwZTogJ2NzdicgfCAneGxzeCcpOiB2b2lkIHtcbiAgICBjb25zdCBzaGVldE5hbWUgPSB0aGlzLl9idWlsZFRpdGxlKHRoaXMud2lkZ2V0VHlwZSk7XG4gICAgY29uc3Qgc2hlZXRzOiB7W3NoZWV0OiBzdHJpbmddOiBYTFNYLldvcmtTaGVldH0gPSB7fTtcbiAgICBzaGVldHNbc2hlZXROYW1lXSA9IHhsc3hNb2QudXRpbHMuYW9hX3RvX3NoZWV0KHRoaXMuX2J1aWxkWGxzeERhdGEoKSk7XG4gICAgY29uc3Qgd29ya0Jvb2s6IFhMU1guV29ya0Jvb2sgPSB7U2hlZXRzOiBzaGVldHMsIFNoZWV0TmFtZXM6IFtzaGVldE5hbWVdfTtcbiAgICB4bHN4TW9kLndyaXRlRmlsZSh3b3JrQm9vaywgYCR7c2hlZXROYW1lfS4ke2Jvb2tUeXBlfWAsIHtcbiAgICAgIGJvb2tUeXBlLFxuICAgICAgdHlwZTogJ2FycmF5JyxcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2J1aWxkWGxzeERhdGEoKTogdW5rbm93bltdW10ge1xuICAgIGxldCB4bHN4RGF0YTogdW5rbm93bltdW10gPSBbXTtcbiAgICBsZXQgbGFiZWxzOiBzdHJpbmdbXSA9IFtdO1xuICAgIHN3aXRjaCAodGhpcy53aWRnZXRUeXBlKSB7XG4gICAgICBkZWZhdWx0OlxuICAgICAgY2FzZSBBamZXaWRnZXRUeXBlLkNoYXJ0OlxuICAgICAgICB0aGlzLmRhdGEgPSB0aGlzLmRhdGEgYXMgQ2hhcnREYXRhO1xuICAgICAgICBjb25zdCBkYXRhc2V0cyA9IHRoaXMuZGF0YS5kYXRhc2V0cyB8fCBbXTtcbiAgICAgICAgbGFiZWxzID0gWyduYW1lJ10uY29uY2F0KHRoaXMuZGF0YS5sYWJlbHMgYXMgc3RyaW5nW10pO1xuICAgICAgICB4bHN4RGF0YS5wdXNoKGxhYmVscyk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YXNldHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBjb25zdCByb3c6IHVua25vd25bXSA9IFtdO1xuICAgICAgICAgIGNvbnN0IGRhdGEgPSBkYXRhc2V0c1tpXS5kYXRhIHx8IFtdO1xuICAgICAgICAgIHJvdy5wdXNoKGRhdGFzZXRzW2ldLmxhYmVsKTtcbiAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGRhdGEubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIHJvdy5wdXNoKGRhdGFbal0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICB4bHN4RGF0YS5wdXNoKHJvdyk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEFqZldpZGdldFR5cGUuVGFibGU6XG4gICAgICAgIHRoaXMuZGF0YSA9IHRoaXMuZGF0YSBhcyBBamZUYWJsZUNlbGxbXVtdO1xuICAgICAgICB0aGlzLmRhdGEuZm9yRWFjaCgocm93OiBBamZUYWJsZUNlbGxbXSwgaWR4Um93OiBudW1iZXIpID0+IHtcbiAgICAgICAgICBjb25zdCByZXM6IHVua25vd25bXSA9IFtdO1xuICAgICAgICAgIGlmIChpZHhSb3cgPT09IDApIHtcbiAgICAgICAgICAgIHJvdy5mb3JFYWNoKChlbGVtOiBBamZUYWJsZUNlbGwpID0+IHtcbiAgICAgICAgICAgICAgbGFiZWxzLnB1c2goZWxlbS52YWx1ZS5jaGFuZ2luZ1RoaXNCcmVha3NBcHBsaWNhdGlvblNlY3VyaXR5KTtcbiAgICAgICAgICAgICAgaWYgKGVsZW0uY29sc3BhbiAmJiBlbGVtLmNvbHNwYW4gPiAxKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBlbGVtLmNvbHNwYW47IGkrKykge1xuICAgICAgICAgICAgICAgICAgbGFiZWxzLnB1c2goJyAnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgeGxzeERhdGEucHVzaChsYWJlbHMpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByb3cuZm9yRWFjaCgoZWxlbTogQWpmVGFibGVDZWxsKSA9PiB7XG4gICAgICAgICAgICAgIHJlcy5wdXNoKGVsZW0udmFsdWUuY2hhbmdpbmdUaGlzQnJlYWtzQXBwbGljYXRpb25TZWN1cml0eSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHhsc3hEYXRhLnB1c2gocmVzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICByZXR1cm4geGxzeERhdGE7XG4gIH1cblxuICBwcml2YXRlIF9idWlsZFRpdGxlKHdpZGdldFR5cGU6IEFqZldpZGdldFR5cGUpOiBzdHJpbmcge1xuICAgIHJldHVybiBgJHtBamZXaWRnZXRUeXBlW3dpZGdldFR5cGVdfSAke2Zvcm1hdChuZXcgRGF0ZSgpLCBgeXl5eS1NTS1kZGApfWA7XG4gIH1cbn1cbiIsIjxkaXYgY2xhc3M9XCJhamYtd2lkZ2V0LXdyYXBwZXJcIj5cbiAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICA8ZGl2ICpuZ0lmPVwiZW5hYmxlXCIgY2xhc3M9XCJhamYtZXhwb3J0LW1lbnVcIiBbY2xhc3MuYWpmLWV4cG9ydC1tZW51LW92ZXJsYXldPVwib3ZlcmxheVwiPlxuICAgICAgPGJ1dHRvbiAoY2xpY2spPVwiZXhwb3J0KCdjc3YnKVwiPkNTVjwvYnV0dG9uPlxuICAgICAgPGJ1dHRvbiAoY2xpY2spPVwiZXhwb3J0KCd4bHN4JylcIj5YTFNYPC9idXR0b24+XG4gIDwvZGl2PlxuPC9kaXY+XG4iXX0=