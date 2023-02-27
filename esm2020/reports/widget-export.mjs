import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { format } from 'date-fns';
import { utils, writeFile } from 'xlsx';
import { AjfWidgetType } from './interface/widgets/widget-type';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class AjfWidgetExport {
    constructor() {
        this.overlay = true;
        this.enable = false;
        this.showOverlay = false;
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
        if (this.widgetType == null) {
            return;
        }
        const sheetName = this._buildTitle(this.widgetType);
        const sheets = {};
        sheets[sheetName] = utils.aoa_to_sheet(this._buildXlsxData());
        const workBook = { Sheets: sheets, SheetNames: [sheetName] };
        writeFile(workBook, `${sheetName}.${bookType}`, {
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
            case AjfWidgetType.PaginatedTable:
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
                            if (val === undefined) {
                                val = elem.value;
                            }
                            if (val != null && iconsMap[val]) {
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
AjfWidgetExport.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfWidgetExport, deps: [], target: i0.ɵɵFactoryTarget.Component });
AjfWidgetExport.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.4", type: AjfWidgetExport, selector: "ajf-widget-export", inputs: { widgetType: "widgetType", data: "data", overlay: "overlay", enable: "enable" }, ngImport: i0, template: "<div class=\"ajf-widget-wrapper\" (mouseenter)=\"showOverlay = true\" (mouseleave)=\"showOverlay = false\" [class.ajf-show-overlay]=\"showOverlay\">\n  <ng-content></ng-content>\n  <div *ngIf=\"enable\" class=\"ajf-export-menu\" [class.ajf-export-menu-overlay]=\"overlay\">\n      <button (click)=\"export('csv')\">CSV</button>\n      <button (click)=\"export('xlsx')\">XLSX</button>\n  </div>\n</div>\n", styles: ["ajf-widget-export{width:100%;height:inherit}ajf-widget-export .ajf-widget-wrapper{position:relative;height:inherit}ajf-widget-export .ajf-export-menu{position:absolute;right:0;top:20px}ajf-widget-export .ajf-export-menu.ajf-export-menu-overlay{display:none}ajf-widget-export .ajf-export-menu button{margin:.5em;border:none;color:#fff;background-color:#4a403f;padding:7.5px 16px;text-align:center;text-decoration:none;display:inline-block;font-size:16px;cursor:pointer}ajf-widget-export .ajf-widget-wrapper.ajf-show-overlay .ajf-export-menu-overlay{display:block}\n"], dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfWidgetExport, decorators: [{
            type: Component,
            args: [{ selector: 'ajf-widget-export', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"ajf-widget-wrapper\" (mouseenter)=\"showOverlay = true\" (mouseleave)=\"showOverlay = false\" [class.ajf-show-overlay]=\"showOverlay\">\n  <ng-content></ng-content>\n  <div *ngIf=\"enable\" class=\"ajf-export-menu\" [class.ajf-export-menu-overlay]=\"overlay\">\n      <button (click)=\"export('csv')\">CSV</button>\n      <button (click)=\"export('xlsx')\">XLSX</button>\n  </div>\n</div>\n", styles: ["ajf-widget-export{width:100%;height:inherit}ajf-widget-export .ajf-widget-wrapper{position:relative;height:inherit}ajf-widget-export .ajf-export-menu{position:absolute;right:0;top:20px}ajf-widget-export .ajf-export-menu.ajf-export-menu-overlay{display:none}ajf-widget-export .ajf-export-menu button{margin:.5em;border:none;color:#fff;background-color:#4a403f;padding:7.5px 16px;text-align:center;text-decoration:none;display:inline-block;font-size:16px;cursor:pointer}ajf-widget-export .ajf-widget-wrapper.ajf-show-overlay .ajf-export-menu-overlay{display:block}\n"] }]
        }], ctorParameters: function () { return []; }, propDecorators: { widgetType: [{
                type: Input
            }], data: [{
                type: Input
            }], overlay: [{
                type: Input
            }], enable: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0LWV4cG9ydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvcmVwb3J0cy9zcmMvd2lkZ2V0LWV4cG9ydC50cyIsIi4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvcmVwb3J0cy9zcmMvd2lkZ2V0LWV4cG9ydC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXVCQSxPQUFPLEVBQUMsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUUzRixPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sVUFBVSxDQUFDO0FBQ2hDLE9BQU8sRUFBQyxLQUFLLEVBQXVCLFNBQVMsRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUUzRCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0saUNBQWlDLENBQUM7OztBQVM5RCxNQUFNLE9BQU8sZUFBZTtJQWlCMUI7UUFkUyxZQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ2YsV0FBTSxHQUFHLEtBQUssQ0FBQztRQUV4QixnQkFBVyxHQUFHLEtBQUssQ0FBQztJQVdMLENBQUM7SUFQaEI7O09BRUc7SUFDSCxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQStCO1FBQzdDLGVBQWUsQ0FBQyxTQUFTLEdBQUcsRUFBQyxHQUFHLGVBQWUsQ0FBQyxTQUFTLEVBQUUsR0FBRyxLQUFLLEVBQUMsQ0FBQztJQUN2RSxDQUFDO0lBSUQ7Ozs7T0FJRztJQUNILFNBQVM7UUFDUCxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3JCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsVUFBVTtRQUNSLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdEIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsTUFBTSxDQUFDLFFBQXdCO1FBQzdCLElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLEVBQUU7WUFDM0IsT0FBTztTQUNS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QkFDRSxtQkFBbUIsaUJBR2QsaUJBQWlCLENBQUMsSUFBSSxtQkFDcEIsdUJBQXVCLENBQUMsTUFBTTswRUFHdEMsVUFBVTtzQkFBbEIsS0FBSztnQkFDRyxJQUFJO3NCQUFaLEtBQUs7Z0JBQ0csT0FBTztzQkFBZixLQUFLO2dCQUNHLE1BQU07c0JBQWQsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZUYWJsZUNlbGx9IGZyb20gJ0BhamYvY29yZS90YWJsZSc7XG5pbXBvcnQge0NoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0LCBWaWV3RW5jYXBzdWxhdGlvbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NoYXJ0RGF0YX0gZnJvbSAnY2hhcnQuanMnO1xuaW1wb3J0IHtmb3JtYXR9IGZyb20gJ2RhdGUtZm5zJztcbmltcG9ydCB7dXRpbHMsIFdvcmtCb29rLCBXb3JrU2hlZXQsIHdyaXRlRmlsZX0gZnJvbSAneGxzeCc7XG5cbmltcG9ydCB7QWpmV2lkZ2V0VHlwZX0gZnJvbSAnLi9pbnRlcmZhY2Uvd2lkZ2V0cy93aWRnZXQtdHlwZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FqZi13aWRnZXQtZXhwb3J0JyxcbiAgdGVtcGxhdGVVcmw6ICd3aWRnZXQtZXhwb3J0Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnd2lkZ2V0LWV4cG9ydC5zY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBBamZXaWRnZXRFeHBvcnQge1xuICBASW5wdXQoKSB3aWRnZXRUeXBlOiBBamZXaWRnZXRUeXBlIHwgdW5kZWZpbmVkO1xuICBASW5wdXQoKSBkYXRhOiBDaGFydERhdGEgfCBBamZUYWJsZUNlbGxbXVtdIHwgdW5kZWZpbmVkO1xuICBASW5wdXQoKSBvdmVybGF5ID0gdHJ1ZTtcbiAgQElucHV0KCkgZW5hYmxlID0gZmFsc2U7XG5cbiAgc2hvd092ZXJsYXkgPSBmYWxzZTtcblxuICBwcml2YXRlIHN0YXRpYyBfaWNvbnNNYXA6IHtbaHRtbDogc3RyaW5nXTogc3RyaW5nfSA9IHt9O1xuXG4gIC8qKlxuICAgKiBBbGxvd3MgcmVuZGVyaW5nIGh0bWwgaWNvbnMgYXMgdGV4dC5cbiAgICovXG4gIHN0YXRpYyBhZGRJY29ucyhpY29uczoge1todG1sOiBzdHJpbmddOiBzdHJpbmd9KSB7XG4gICAgQWpmV2lkZ2V0RXhwb3J0Ll9pY29uc01hcCA9IHsuLi5BamZXaWRnZXRFeHBvcnQuX2ljb25zTWFwLCAuLi5pY29uc307XG4gIH1cblxuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgLyoqXG4gICAqIEV4cG9ydCB3aWRnZXQgZGF0YSBpbiBDU1YgZm9ybWF0XG4gICAqIEBkZXByZWNhdGVkIFVzZSBgQWpmV2lkZ2V0RXhwb3J0LmV4cG9ydGAgd2l0aCAnY3N2JyBwYXJhbWV0ZXIuXG4gICAqIEBicmVha2luZy1jaGFuZ2UgMTMuMC4wXG4gICAqL1xuICBleHBvcnRDc3YoKTogdm9pZCB7XG4gICAgdGhpcy5leHBvcnQoJ2NzdicpO1xuICB9XG5cbiAgLyoqXG4gICAqIEV4cG9ydCB3aWRnZXQgZGF0YSBpbiBYbHN4IGZvcm1hdFxuICAgKiBAZGVwcmVjYXRlZCBVc2UgYEFqZldpZGdldEV4cG9ydC5leHBvcnRgIHdpdGggJ3hsc3gnIHBhcmFtZXRlci5cbiAgICogQGJyZWFraW5nLWNoYW5nZSAxMy4wLjBcbiAgICovXG4gIGV4cG9ydFhsc3goKTogdm9pZCB7XG4gICAgdGhpcy5leHBvcnQoJ3hsc3gnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFeHBvcnQgd2lkZ2V0IGRhdGEgaW4gQ1NWIG9yIFhsc3ggZm9ybWF0XG4gICAqL1xuICBleHBvcnQoYm9va1R5cGU6ICdjc3YnIHwgJ3hsc3gnKTogdm9pZCB7XG4gICAgaWYgKHRoaXMud2lkZ2V0VHlwZSA9PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHNoZWV0TmFtZSA9IHRoaXMuX2J1aWxkVGl0bGUodGhpcy53aWRnZXRUeXBlKTtcbiAgICBjb25zdCBzaGVldHM6IHtbc2hlZXQ6IHN0cmluZ106IFdvcmtTaGVldH0gPSB7fTtcbiAgICBzaGVldHNbc2hlZXROYW1lXSA9IHV0aWxzLmFvYV90b19zaGVldCh0aGlzLl9idWlsZFhsc3hEYXRhKCkpO1xuICAgIGNvbnN0IHdvcmtCb29rOiBXb3JrQm9vayA9IHtTaGVldHM6IHNoZWV0cywgU2hlZXROYW1lczogW3NoZWV0TmFtZV19O1xuICAgIHdyaXRlRmlsZSh3b3JrQm9vaywgYCR7c2hlZXROYW1lfS4ke2Jvb2tUeXBlfWAsIHtcbiAgICAgIGJvb2tUeXBlLFxuICAgICAgdHlwZTogJ2FycmF5JyxcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2J1aWxkWGxzeERhdGEoKTogdW5rbm93bltdW10ge1xuICAgIGNvbnN0IGljb25zTWFwID0gQWpmV2lkZ2V0RXhwb3J0Ll9pY29uc01hcDtcbiAgICBsZXQgeGxzeERhdGE6IHVua25vd25bXVtdID0gW107XG4gICAgbGV0IGxhYmVsczogc3RyaW5nW10gPSBbXTtcbiAgICBzd2l0Y2ggKHRoaXMud2lkZ2V0VHlwZSkge1xuICAgICAgZGVmYXVsdDpcbiAgICAgIGNhc2UgQWpmV2lkZ2V0VHlwZS5DaGFydDpcbiAgICAgICAgdGhpcy5kYXRhID0gdGhpcy5kYXRhIGFzIENoYXJ0RGF0YTtcbiAgICAgICAgY29uc3QgZGF0YXNldHMgPSB0aGlzLmRhdGEuZGF0YXNldHMgfHwgW107XG4gICAgICAgIGxhYmVscyA9IFsnbmFtZSddLmNvbmNhdCh0aGlzLmRhdGEubGFiZWxzIGFzIHN0cmluZ1tdKTtcbiAgICAgICAgeGxzeERhdGEucHVzaChsYWJlbHMpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGFzZXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgY29uc3Qgcm93OiB1bmtub3duW10gPSBbXTtcbiAgICAgICAgICBjb25zdCBkYXRhID0gZGF0YXNldHNbaV0uZGF0YSB8fCBbXTtcbiAgICAgICAgICByb3cucHVzaChkYXRhc2V0c1tpXS5sYWJlbCk7XG4gICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBkYXRhLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICByb3cucHVzaChkYXRhW2pdKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgeGxzeERhdGEucHVzaChyb3cpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBBamZXaWRnZXRUeXBlLkR5bmFtaWNUYWJsZTpcbiAgICAgIGNhc2UgQWpmV2lkZ2V0VHlwZS5UYWJsZTpcbiAgICAgIGNhc2UgQWpmV2lkZ2V0VHlwZS5QYWdpbmF0ZWRUYWJsZTpcbiAgICAgICAgY29uc3QgdGFibGVEYXRhID0gdGhpcy5kYXRhIGFzIEFqZlRhYmxlQ2VsbFtdW107XG4gICAgICAgIGlmICh0YWJsZURhdGEubGVuZ3RoID4gMSkge1xuICAgICAgICAgIHhsc3hEYXRhID0gW107XG4gICAgICAgICAgY29uc3QgbmV4dFJvd3M6IHVua25vd25bXVtdID0gW107XG4gICAgICAgICAgbGV0IG5leHRSb3c6IHVua25vd25bXSA9IFtdO1xuICAgICAgICAgIGxldCB0b3RSb3dTcGFuID0gMDtcbiAgICAgICAgICBsZXQgbmV4dFJvd3NwYW5OdW0gPSAwO1xuXG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0YWJsZURhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBpc05ld1Jvd0FmdGVyUm93c3BhbiA9IGZhbHNlO1xuICAgICAgICAgICAgbGV0IHJlczogdW5rbm93bltdID0gW107XG5cbiAgICAgICAgICAgIG5leHRSb3cgPSBbXTtcbiAgICAgICAgICAgIGlmICh0b3RSb3dTcGFuID4gMCkge1xuICAgICAgICAgICAgICByZXMgPSBbLi4ubmV4dFJvd3NbbmV4dFJvd3NwYW5OdW0gLSAxXV07XG4gICAgICAgICAgICAgIGlzTmV3Um93QWZ0ZXJSb3dzcGFuID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRhYmxlRGF0YVtpXS5mb3JFYWNoKChlbGVtOiBBamZUYWJsZUNlbGwsIGlkeEVsZW06IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgICBsZXQgdmFsID0gZWxlbS52YWx1ZS5jaGFuZ2luZ1RoaXNCcmVha3NBcHBsaWNhdGlvblNlY3VyaXR5O1xuICAgICAgICAgICAgICBpZiAodmFsID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB2YWwgPSBlbGVtLnZhbHVlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmICh2YWwgIT0gbnVsbCAmJiBpY29uc01hcFt2YWxdKSB7XG4gICAgICAgICAgICAgICAgdmFsID0gaWNvbnNNYXBbdmFsXTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXMucHVzaCh2YWwpO1xuXG4gICAgICAgICAgICAgIGlmIChlbGVtLmNvbHNwYW4gJiYgZWxlbS5jb2xzcGFuID4gMSkge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAxOyBqIDwgZWxlbS5jb2xzcGFuOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgIHJlcy5wdXNoKCcgJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmIChpc05ld1Jvd0FmdGVyUm93c3Bhbikge1xuICAgICAgICAgICAgICAgIGlmIChlbGVtLnJvd3NwYW4gJiYgZWxlbS5yb3dzcGFuID4gMSkge1xuICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaWR4ID0gMTsgaWR4IDwgZWxlbS5yb3dzcGFuOyBpZHgrKykge1xuICAgICAgICAgICAgICAgICAgICBuZXh0Um93LnB1c2goJyAnKTtcbiAgICAgICAgICAgICAgICAgICAgbmV4dFJvd3NbbmV4dFJvd3NwYW5OdW1dID0gbmV4dFJvd3NbbmV4dFJvd3NwYW5OdW1dLmNvbmNhdChuZXh0Um93KTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGlkeEVsZW0gPT09IHRhYmxlRGF0YVtpXS5sZW5ndGggLSAxICYmIG5leHRSb3dzcGFuTnVtID4gMCkge1xuICAgICAgICAgICAgICAgICAgbmV4dFJvd3NwYW5OdW0rKztcbiAgICAgICAgICAgICAgICAgIGlmIChuZXh0Um93c3Bhbk51bSA9PT0gdG90Um93U3Bhbikge1xuICAgICAgICAgICAgICAgICAgICB0b3RSb3dTcGFuID0gMDtcbiAgICAgICAgICAgICAgICAgICAgbmV4dFJvd3NwYW5OdW0gPSAwO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoZWxlbS5yb3dzcGFuICYmIGVsZW0ucm93c3BhbiA+IDEpIHtcbiAgICAgICAgICAgICAgICAgIHRvdFJvd1NwYW4gPSBlbGVtLnJvd3NwYW47XG4gICAgICAgICAgICAgICAgICBuZXh0Um93c3Bhbk51bSA9IDE7XG4gICAgICAgICAgICAgICAgICBmb3IgKGxldCBpZHggPSAxOyBpZHggPCBlbGVtLnJvd3NwYW47IGlkeCsrKSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHRSb3cucHVzaCgnICcpO1xuICAgICAgICAgICAgICAgICAgICBuZXh0Um93c1tpZHggLSAxXSA9IG5leHRSb3c7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHhsc3hEYXRhLnB1c2gocmVzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgcmV0dXJuIHhsc3hEYXRhO1xuICB9XG5cbiAgcHJpdmF0ZSBfYnVpbGRUaXRsZSh3aWRnZXRUeXBlOiBBamZXaWRnZXRUeXBlKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYCR7QWpmV2lkZ2V0VHlwZVt3aWRnZXRUeXBlXX0gJHtmb3JtYXQobmV3IERhdGUoKSwgYHl5eXktTU0tZGRgKX1gO1xuICB9XG59XG4iLCI8ZGl2IGNsYXNzPVwiYWpmLXdpZGdldC13cmFwcGVyXCIgKG1vdXNlZW50ZXIpPVwic2hvd092ZXJsYXkgPSB0cnVlXCIgKG1vdXNlbGVhdmUpPVwic2hvd092ZXJsYXkgPSBmYWxzZVwiIFtjbGFzcy5hamYtc2hvdy1vdmVybGF5XT1cInNob3dPdmVybGF5XCI+XG4gIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgPGRpdiAqbmdJZj1cImVuYWJsZVwiIGNsYXNzPVwiYWpmLWV4cG9ydC1tZW51XCIgW2NsYXNzLmFqZi1leHBvcnQtbWVudS1vdmVybGF5XT1cIm92ZXJsYXlcIj5cbiAgICAgIDxidXR0b24gKGNsaWNrKT1cImV4cG9ydCgnY3N2JylcIj5DU1Y8L2J1dHRvbj5cbiAgICAgIDxidXR0b24gKGNsaWNrKT1cImV4cG9ydCgneGxzeCcpXCI+WExTWDwvYnV0dG9uPlxuICA8L2Rpdj5cbjwvZGl2PlxuIl19