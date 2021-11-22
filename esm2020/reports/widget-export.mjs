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
     * Allows rendering html icons as text.
     */
    static addIcons(icons) {
        AjfWidgetExport._iconsMap = { ...AjfWidgetExport._iconsMap, ...icons };
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
        const iconsMap = AjfWidgetExport._iconsMap;
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
            case AjfWidgetType.DynamicTable:
            case AjfWidgetType.Table:
                const tableData = this.data;
                if (tableData.length > 1) {
                    xlsxData = [];
                    const nextRows = [];
                    let nextRow = [];
                    let totRowSpan = 0;
                    let nextRowspanNum = 0;
                    for (let i = 0; i < tableData.length; i++) {
                        let isNewRowAfterRowspan = false;
                        let res = [];
                        nextRow = [];
                        if (totRowSpan > 0) {
                            res = [...nextRows[nextRowspanNum - 1]];
                            isNewRowAfterRowspan = true;
                        }
                        tableData[i].forEach((elem, idxElem) => {
                            let val = elem.value.changingThisBreaksApplicationSecurity;
                            if (iconsMap[val]) {
                                val = iconsMap[val];
                            }
                            res.push(val);
                            if (elem.colspan && elem.colspan > 1) {
                                for (let j = 1; j < elem.colspan; j++) {
                                    res.push(' ');
                                }
                            }
                            if (isNewRowAfterRowspan) {
                                if (elem.rowspan && elem.rowspan > 1) {
                                    for (let idx = 1; idx < elem.rowspan; idx++) {
                                        nextRow.push(' ');
                                        nextRows[nextRowspanNum] = nextRows[nextRowspanNum].concat(nextRow);
                                    }
                                }
                                if (idxElem === tableData[i].length - 1 && nextRowspanNum > 0) {
                                    nextRowspanNum++;
                                    if (nextRowspanNum === totRowSpan) {
                                        totRowSpan = 0;
                                        nextRowspanNum = 0;
                                    }
                                }
                            }
                            else {
                                if (elem.rowspan && elem.rowspan > 1) {
                                    totRowSpan = elem.rowspan;
                                    nextRowspanNum = 1;
                                    for (let idx = 1; idx < elem.rowspan; idx++) {
                                        nextRow.push(' ');
                                        nextRows[idx - 1] = nextRow;
                                    }
                                }
                            }
                        });
                        xlsxData.push(res);
                    }
                }
                break;
        }
        return xlsxData;
    }
    _buildTitle(widgetType) {
        return `${AjfWidgetType[widgetType]} ${format(new Date(), `yyyy-MM-dd`)}`;
    }
}
AjfWidgetExport._iconsMap = {};
AjfWidgetExport.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-rc.3", ngImport: i0, type: AjfWidgetExport, deps: [], target: i0.ɵɵFactoryTarget.Component });
AjfWidgetExport.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.0-rc.3", type: AjfWidgetExport, selector: "ajf-widget-export", inputs: { widgetType: "widgetType", data: "data", overlay: "overlay", enable: "enable" }, ngImport: i0, template: "<div class=\"ajf-widget-wrapper\">\n  <ng-content></ng-content>\n  <div *ngIf=\"enable\" class=\"ajf-export-menu\" [class.ajf-export-menu-overlay]=\"overlay\">\n      <button (click)=\"export('csv')\">CSV</button>\n      <button (click)=\"export('xlsx')\">XLSX</button>\n  </div>\n</div>\n", styles: ["ajf-widget-export{width:100%;height:inherit}ajf-widget-export .ajf-widget-wrapper{position:relative;height:inherit}ajf-widget-export .ajf-export-menu{position:absolute;right:0;top:0}ajf-widget-export .ajf-export-menu.ajf-export-menu-overlay{display:none}ajf-widget-export .ajf-export-menu button{margin:.5em;border:none;color:#fff;background-color:#4a403f;padding:7.5px 16px;text-align:center;text-decoration:none;display:inline-block;font-size:16px;cursor:pointer}ajf-widget-export .ajf-widget-wrapper:hover .ajf-export-menu-overlay{display:block}\n"], directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-rc.3", ngImport: i0, type: AjfWidgetExport, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0LWV4cG9ydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL3JlcG9ydHMvd2lkZ2V0LWV4cG9ydC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL3JlcG9ydHMvd2lkZ2V0LWV4cG9ydC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXVCQSxPQUFPLEVBQUMsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUUzRixPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sVUFBVSxDQUFDO0FBQ2hDLE9BQU8sS0FBSyxJQUFJLE1BQU0sTUFBTSxDQUFDO0FBSTdCLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSwwQ0FBMEMsQ0FBQzs7O0FBRnZFLE1BQU0sT0FBTyxHQUFHLENBQUUsSUFBWSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQWdCLENBQUM7QUFXL0QsTUFBTSxPQUFPLGVBQWU7SUFlMUI7UUFaUyxZQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ2YsV0FBTSxHQUFHLEtBQUssQ0FBQztJQVdULENBQUM7SUFQaEI7O09BRUc7SUFDSCxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQStCO1FBQzdDLGVBQWUsQ0FBQyxTQUFTLEdBQUcsRUFBQyxHQUFHLGVBQWUsQ0FBQyxTQUFTLEVBQUUsR0FBRyxLQUFLLEVBQUMsQ0FBQztJQUN2RSxDQUFDO0lBSUQ7Ozs7T0FJRztJQUNILFNBQVM7UUFDUCxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3JCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsVUFBVTtRQUNSLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdEIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsTUFBTSxDQUFDLFFBQXdCO1FBQzdCLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFB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LCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmVGFibGVDZWxsfSBmcm9tICdAYWpmL2NvcmUvdGFibGUnO1xuaW1wb3J0IHtDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dCwgVmlld0VuY2Fwc3VsYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDaGFydERhdGF9IGZyb20gJ2NoYXJ0LmpzJztcbmltcG9ydCB7Zm9ybWF0fSBmcm9tICdkYXRlLWZucyc7XG5pbXBvcnQgKiBhcyBYTFNYIGZyb20gJ3hsc3gnO1xuXG5jb25zdCB4bHN4TW9kID0gKChYTFNYIGFzIGFueSkuZGVmYXVsdCB8fCBYTFNYKSBhcyB0eXBlb2YgWExTWDtcblxuaW1wb3J0IHtBamZXaWRnZXRUeXBlfSBmcm9tICcuLi9yZXBvcnRzL2ludGVyZmFjZS93aWRnZXRzL3dpZGdldC10eXBlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWpmLXdpZGdldC1leHBvcnQnLFxuICB0ZW1wbGF0ZVVybDogJ3dpZGdldC1leHBvcnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWyd3aWRnZXQtZXhwb3J0LmNzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgQWpmV2lkZ2V0RXhwb3J0IHtcbiAgQElucHV0KCkgd2lkZ2V0VHlwZTogQWpmV2lkZ2V0VHlwZTtcbiAgQElucHV0KCkgZGF0YTogQ2hhcnREYXRhIHwgQWpmVGFibGVDZWxsW11bXTtcbiAgQElucHV0KCkgb3ZlcmxheSA9IHRydWU7XG4gIEBJbnB1dCgpIGVuYWJsZSA9IGZhbHNlO1xuXG4gIHByaXZhdGUgc3RhdGljIF9pY29uc01hcDoge1todG1sOiBzdHJpbmddOiBzdHJpbmd9ID0ge307XG5cbiAgLyoqXG4gICAqIEFsbG93cyByZW5kZXJpbmcgaHRtbCBpY29ucyBhcyB0ZXh0LlxuICAgKi9cbiAgc3RhdGljIGFkZEljb25zKGljb25zOiB7W2h0bWw6IHN0cmluZ106IHN0cmluZ30pIHtcbiAgICBBamZXaWRnZXRFeHBvcnQuX2ljb25zTWFwID0gey4uLkFqZldpZGdldEV4cG9ydC5faWNvbnNNYXAsIC4uLmljb25zfTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICAvKipcbiAgICogRXhwb3J0IHdpZGdldCBkYXRhIGluIENTViBmb3JtYXRcbiAgICogQGRlcHJlY2F0ZWQgVXNlIGBBamZXaWRnZXRFeHBvcnQuZXhwb3J0YCB3aXRoICdjc3YnIHBhcmFtZXRlci5cbiAgICogQGJyZWFraW5nLWNoYW5nZSAxMy4wLjBcbiAgICovXG4gIGV4cG9ydENzdigpOiB2b2lkIHtcbiAgICB0aGlzLmV4cG9ydCgnY3N2Jyk7XG4gIH1cblxuICAvKipcbiAgICogRXhwb3J0IHdpZGdldCBkYXRhIGluIFhsc3ggZm9ybWF0XG4gICAqIEBkZXByZWNhdGVkIFVzZSBgQWpmV2lkZ2V0RXhwb3J0LmV4cG9ydGAgd2l0aCAneGxzeCcgcGFyYW1ldGVyLlxuICAgKiBAYnJlYWtpbmctY2hhbmdlIDEzLjAuMFxuICAgKi9cbiAgZXhwb3J0WGxzeCgpOiB2b2lkIHtcbiAgICB0aGlzLmV4cG9ydCgneGxzeCcpO1xuICB9XG5cbiAgLyoqXG4gICAqIEV4cG9ydCB3aWRnZXQgZGF0YSBpbiBDU1Ygb3IgWGxzeCBmb3JtYXRcbiAgICovXG4gIGV4cG9ydChib29rVHlwZTogJ2NzdicgfCAneGxzeCcpOiB2b2lkIHtcbiAgICBjb25zdCBzaGVldE5hbWUgPSB0aGlzLl9idWlsZFRpdGxlKHRoaXMud2lkZ2V0VHlwZSk7XG4gICAgY29uc3Qgc2hlZXRzOiB7W3NoZWV0OiBzdHJpbmddOiBYTFNYLldvcmtTaGVldH0gPSB7fTtcbiAgICBzaGVldHNbc2hlZXROYW1lXSA9IHhsc3hNb2QudXRpbHMuYW9hX3RvX3NoZWV0KHRoaXMuX2J1aWxkWGxzeERhdGEoKSk7XG4gICAgY29uc3Qgd29ya0Jvb2s6IFhMU1guV29ya0Jvb2sgPSB7U2hlZXRzOiBzaGVldHMsIFNoZWV0TmFtZXM6IFtzaGVldE5hbWVdfTtcbiAgICB4bHN4TW9kLndyaXRlRmlsZSh3b3JrQm9vaywgYCR7c2hlZXROYW1lfS4ke2Jvb2tUeXBlfWAsIHtcbiAgICAgIGJvb2tUeXBlLFxuICAgICAgdHlwZTogJ2FycmF5JyxcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2J1aWxkWGxzeERhdGEoKTogdW5rbm93bltdW10ge1xuICAgIGNvbnN0IGljb25zTWFwID0gQWpmV2lkZ2V0RXhwb3J0Ll9pY29uc01hcDtcbiAgICBsZXQgeGxzeERhdGE6IHVua25vd25bXVtdID0gW107XG4gICAgbGV0IGxhYmVsczogc3RyaW5nW10gPSBbXTtcbiAgICBzd2l0Y2ggKHRoaXMud2lkZ2V0VHlwZSkge1xuICAgICAgZGVmYXVsdDpcbiAgICAgIGNhc2UgQWpmV2lkZ2V0VHlwZS5DaGFydDpcbiAgICAgICAgdGhpcy5kYXRhID0gdGhpcy5kYXRhIGFzIENoYXJ0RGF0YTtcbiAgICAgICAgY29uc3QgZGF0YXNldHMgPSB0aGlzLmRhdGEuZGF0YXNldHMgfHwgW107XG4gICAgICAgIGxhYmVscyA9IFsnbmFtZSddLmNvbmNhdCh0aGlzLmRhdGEubGFiZWxzIGFzIHN0cmluZ1tdKTtcbiAgICAgICAgeGxzeERhdGEucHVzaChsYWJlbHMpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGFzZXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgY29uc3Qgcm93OiB1bmtub3duW10gPSBbXTtcbiAgICAgICAgICBjb25zdCBkYXRhID0gZGF0YXNldHNbaV0uZGF0YSB8fCBbXTtcbiAgICAgICAgICByb3cucHVzaChkYXRhc2V0c1tpXS5sYWJlbCk7XG4gICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBkYXRhLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICByb3cucHVzaChkYXRhW2pdKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgeGxzeERhdGEucHVzaChyb3cpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBBamZXaWRnZXRUeXBlLkR5bmFtaWNUYWJsZTpcbiAgICAgIGNhc2UgQWpmV2lkZ2V0VHlwZS5UYWJsZTpcbiAgICAgICAgY29uc3QgdGFibGVEYXRhID0gdGhpcy5kYXRhIGFzIEFqZlRhYmxlQ2VsbFtdW107XG4gICAgICAgIGlmICh0YWJsZURhdGEubGVuZ3RoID4gMSkge1xuICAgICAgICAgIHhsc3hEYXRhID0gW107XG4gICAgICAgICAgY29uc3QgbmV4dFJvd3M6IHVua25vd25bXVtdID0gW107XG4gICAgICAgICAgbGV0IG5leHRSb3c6IHVua25vd25bXSA9IFtdO1xuICAgICAgICAgIGxldCB0b3RSb3dTcGFuID0gMDtcbiAgICAgICAgICBsZXQgbmV4dFJvd3NwYW5OdW0gPSAwO1xuXG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0YWJsZURhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBpc05ld1Jvd0FmdGVyUm93c3BhbiA9IGZhbHNlO1xuICAgICAgICAgICAgbGV0IHJlczogdW5rbm93bltdID0gW107XG5cbiAgICAgICAgICAgIG5leHRSb3cgPSBbXTtcbiAgICAgICAgICAgIGlmICh0b3RSb3dTcGFuID4gMCkge1xuICAgICAgICAgICAgICByZXMgPSBbLi4ubmV4dFJvd3NbbmV4dFJvd3NwYW5OdW0gLSAxXV07XG4gICAgICAgICAgICAgIGlzTmV3Um93QWZ0ZXJSb3dzcGFuID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRhYmxlRGF0YVtpXS5mb3JFYWNoKChlbGVtOiBBamZUYWJsZUNlbGwsIGlkeEVsZW06IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgICBsZXQgdmFsID0gZWxlbS52YWx1ZS5jaGFuZ2luZ1RoaXNCcmVha3NBcHBsaWNhdGlvblNlY3VyaXR5O1xuICAgICAgICAgICAgICBpZiAoaWNvbnNNYXBbdmFsXSkge1xuICAgICAgICAgICAgICAgIHZhbCA9IGljb25zTWFwW3ZhbF07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmVzLnB1c2godmFsKTtcblxuICAgICAgICAgICAgICBpZiAoZWxlbS5jb2xzcGFuICYmIGVsZW0uY29sc3BhbiA+IDEpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMTsgaiA8IGVsZW0uY29sc3BhbjsgaisrKSB7XG4gICAgICAgICAgICAgICAgICByZXMucHVzaCgnICcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAoaXNOZXdSb3dBZnRlclJvd3NwYW4pIHtcbiAgICAgICAgICAgICAgICBpZiAoZWxlbS5yb3dzcGFuICYmIGVsZW0ucm93c3BhbiA+IDEpIHtcbiAgICAgICAgICAgICAgICAgIGZvciAobGV0IGlkeCA9IDE7IGlkeCA8IGVsZW0ucm93c3BhbjsgaWR4KyspIHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dFJvdy5wdXNoKCcgJyk7XG4gICAgICAgICAgICAgICAgICAgIG5leHRSb3dzW25leHRSb3dzcGFuTnVtXSA9IG5leHRSb3dzW25leHRSb3dzcGFuTnVtXS5jb25jYXQobmV4dFJvdyk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChpZHhFbGVtID09PSB0YWJsZURhdGFbaV0ubGVuZ3RoIC0gMSAmJiBuZXh0Um93c3Bhbk51bSA+IDApIHtcbiAgICAgICAgICAgICAgICAgIG5leHRSb3dzcGFuTnVtKys7XG4gICAgICAgICAgICAgICAgICBpZiAobmV4dFJvd3NwYW5OdW0gPT09IHRvdFJvd1NwYW4pIHtcbiAgICAgICAgICAgICAgICAgICAgdG90Um93U3BhbiA9IDA7XG4gICAgICAgICAgICAgICAgICAgIG5leHRSb3dzcGFuTnVtID0gMDtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKGVsZW0ucm93c3BhbiAmJiBlbGVtLnJvd3NwYW4gPiAxKSB7XG4gICAgICAgICAgICAgICAgICB0b3RSb3dTcGFuID0gZWxlbS5yb3dzcGFuO1xuICAgICAgICAgICAgICAgICAgbmV4dFJvd3NwYW5OdW0gPSAxO1xuICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaWR4ID0gMTsgaWR4IDwgZWxlbS5yb3dzcGFuOyBpZHgrKykge1xuICAgICAgICAgICAgICAgICAgICBuZXh0Um93LnB1c2goJyAnKTtcbiAgICAgICAgICAgICAgICAgICAgbmV4dFJvd3NbaWR4IC0gMV0gPSBuZXh0Um93O1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB4bHN4RGF0YS5wdXNoKHJlcyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHJldHVybiB4bHN4RGF0YTtcbiAgfVxuXG4gIHByaXZhdGUgX2J1aWxkVGl0bGUod2lkZ2V0VHlwZTogQWpmV2lkZ2V0VHlwZSk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGAke0FqZldpZGdldFR5cGVbd2lkZ2V0VHlwZV19ICR7Zm9ybWF0KG5ldyBEYXRlKCksIGB5eXl5LU1NLWRkYCl9YDtcbiAgfVxufVxuIiwiPGRpdiBjbGFzcz1cImFqZi13aWRnZXQtd3JhcHBlclwiPlxuICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gIDxkaXYgKm5nSWY9XCJlbmFibGVcIiBjbGFzcz1cImFqZi1leHBvcnQtbWVudVwiIFtjbGFzcy5hamYtZXhwb3J0LW1lbnUtb3ZlcmxheV09XCJvdmVybGF5XCI+XG4gICAgICA8YnV0dG9uIChjbGljayk9XCJleHBvcnQoJ2NzdicpXCI+Q1NWPC9idXR0b24+XG4gICAgICA8YnV0dG9uIChjbGljayk9XCJleHBvcnQoJ3hsc3gnKVwiPlhMU1g8L2J1dHRvbj5cbiAgPC9kaXY+XG48L2Rpdj5cbiJdfQ==