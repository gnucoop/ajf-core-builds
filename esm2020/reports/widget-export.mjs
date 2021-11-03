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
                            res.push(elem.value.changingThisBreaksApplicationSecurity);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0LWV4cG9ydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL3JlcG9ydHMvd2lkZ2V0LWV4cG9ydC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL3JlcG9ydHMvd2lkZ2V0LWV4cG9ydC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXVCQSxPQUFPLEVBQUMsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUUzRixPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sVUFBVSxDQUFDO0FBQ2hDLE9BQU8sS0FBSyxJQUFJLE1BQU0sTUFBTSxDQUFDO0FBSTdCLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSwwQ0FBMEMsQ0FBQzs7O0FBRnZFLE1BQU0sT0FBTyxHQUFHLENBQUUsSUFBWSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQWdCLENBQUM7QUFXL0QsTUFBTSxPQUFPLGVBQWU7SUFNMUI7UUFIUyxZQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ2YsV0FBTSxHQUFHLEtBQUssQ0FBQztJQUVULENBQUM7SUFFaEI7Ozs7T0FJRztJQUNILFNBQVM7UUFDUCxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3JCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsVUFBVTtRQUNSLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdEIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsTUFBTSxDQUFDLFFBQXdCO1FBQzdCLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3BELE1BQU0sTUFBTSxHQUFzQyxFQUFFLENBQUM7UUFDckQsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxjQUFj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LEdBQUcsRUFBRSxFQUFFO3dDQUMzQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dDQUNsQixRQUFRLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQztxQ0FDN0I7aUNBQ0Y7NkJBQ0Y7d0JBQ0gsQ0FBQyxDQUFDLENBQUM7d0JBQ0gsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztxQkFDcEI7aUJBQ0Y7Z0JBQ0QsTUFBTTtTQUNUO1FBRUQsT0FBTyxRQUFRLENBQUM7SUFDbEIsQ0FBQztJQUVPLFdBQVcsQ0FBQyxVQUF5QjtRQUMzQyxPQUFPLEdBQUcsYUFBYSxDQUFDLFVBQVUsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLElBQUksRUFBRSxFQUFFLFlBQVksQ0FBQyxFQUFFLENBQUM7SUFDNUUsQ0FBQzs7aUhBM0hVLGVBQWU7cUdBQWYsZUFBZSxtSkN2QzVCLG1TQU9BO2dHRGdDYSxlQUFlO2tCQVAzQixTQUFTOytCQUNFLG1CQUFtQixpQkFHZCxpQkFBaUIsQ0FBQyxJQUFJLG1CQUNwQix1QkFBdUIsQ0FBQyxNQUFNOzBFQUd0QyxVQUFVO3NCQUFsQixLQUFLO2dCQUNHLElBQUk7c0JBQVosS0FBSztnQkFDRyxPQUFPO3NCQUFmLEtBQUs7Z0JBQ0csTUFBTTtzQkFBZCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZlRhYmxlQ2VsbH0gZnJvbSAnQGFqZi9jb3JlL3RhYmxlJztcbmltcG9ydCB7Q2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQsIFZpZXdFbmNhcHN1bGF0aW9ufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q2hhcnREYXRhfSBmcm9tICdjaGFydC5qcyc7XG5pbXBvcnQge2Zvcm1hdH0gZnJvbSAnZGF0ZS1mbnMnO1xuaW1wb3J0ICogYXMgWExTWCBmcm9tICd4bHN4JztcblxuY29uc3QgeGxzeE1vZCA9ICgoWExTWCBhcyBhbnkpLmRlZmF1bHQgfHwgWExTWCkgYXMgdHlwZW9mIFhMU1g7XG5cbmltcG9ydCB7QWpmV2lkZ2V0VHlwZX0gZnJvbSAnLi4vcmVwb3J0cy9pbnRlcmZhY2Uvd2lkZ2V0cy93aWRnZXQtdHlwZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FqZi13aWRnZXQtZXhwb3J0JyxcbiAgdGVtcGxhdGVVcmw6ICd3aWRnZXQtZXhwb3J0Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnd2lkZ2V0LWV4cG9ydC5jc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIEFqZldpZGdldEV4cG9ydCB7XG4gIEBJbnB1dCgpIHdpZGdldFR5cGU6IEFqZldpZGdldFR5cGU7XG4gIEBJbnB1dCgpIGRhdGE6IENoYXJ0RGF0YSB8IEFqZlRhYmxlQ2VsbFtdW107XG4gIEBJbnB1dCgpIG92ZXJsYXkgPSB0cnVlO1xuICBASW5wdXQoKSBlbmFibGUgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgLyoqXG4gICAqIEV4cG9ydCB3aWRnZXQgZGF0YSBpbiBDU1YgZm9ybWF0XG4gICAqIEBkZXByZWNhdGVkIFVzZSBgQWpmV2lkZ2V0RXhwb3J0LmV4cG9ydGAgd2l0aCAnY3N2JyBwYXJhbWV0ZXIuXG4gICAqIEBicmVha2luZy1jaGFuZ2UgMTMuMC4wXG4gICAqL1xuICBleHBvcnRDc3YoKTogdm9pZCB7XG4gICAgdGhpcy5leHBvcnQoJ2NzdicpO1xuICB9XG5cbiAgLyoqXG4gICAqIEV4cG9ydCB3aWRnZXQgZGF0YSBpbiBYbHN4IGZvcm1hdFxuICAgKiBAZGVwcmVjYXRlZCBVc2UgYEFqZldpZGdldEV4cG9ydC5leHBvcnRgIHdpdGggJ3hsc3gnIHBhcmFtZXRlci5cbiAgICogQGJyZWFraW5nLWNoYW5nZSAxMy4wLjBcbiAgICovXG4gIGV4cG9ydFhsc3goKTogdm9pZCB7XG4gICAgdGhpcy5leHBvcnQoJ3hsc3gnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFeHBvcnQgd2lkZ2V0IGRhdGEgaW4gQ1NWIG9yIFhsc3ggZm9ybWF0XG4gICAqL1xuICBleHBvcnQoYm9va1R5cGU6ICdjc3YnIHwgJ3hsc3gnKTogdm9pZCB7XG4gICAgY29uc3Qgc2hlZXROYW1lID0gdGhpcy5fYnVpbGRUaXRsZSh0aGlzLndpZGdldFR5cGUpO1xuICAgIGNvbnN0IHNoZWV0czoge1tzaGVldDogc3RyaW5nXTogWExTWC5Xb3JrU2hlZXR9ID0ge307XG4gICAgc2hlZXRzW3NoZWV0TmFtZV0gPSB4bHN4TW9kLnV0aWxzLmFvYV90b19zaGVldCh0aGlzLl9idWlsZFhsc3hEYXRhKCkpO1xuICAgIGNvbnN0IHdvcmtCb29rOiBYTFNYLldvcmtCb29rID0ge1NoZWV0czogc2hlZXRzLCBTaGVldE5hbWVzOiBbc2hlZXROYW1lXX07XG4gICAgeGxzeE1vZC53cml0ZUZpbGUod29ya0Jvb2ssIGAke3NoZWV0TmFtZX0uJHtib29rVHlwZX1gLCB7XG4gICAgICBib29rVHlwZSxcbiAgICAgIHR5cGU6ICdhcnJheScsXG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9idWlsZFhsc3hEYXRhKCk6IHVua25vd25bXVtdIHtcbiAgICBsZXQgeGxzeERhdGE6IHVua25vd25bXVtdID0gW107XG4gICAgbGV0IGxhYmVsczogc3RyaW5nW10gPSBbXTtcbiAgICBzd2l0Y2ggKHRoaXMud2lkZ2V0VHlwZSkge1xuICAgICAgZGVmYXVsdDpcbiAgICAgIGNhc2UgQWpmV2lkZ2V0VHlwZS5DaGFydDpcbiAgICAgICAgdGhpcy5kYXRhID0gdGhpcy5kYXRhIGFzIENoYXJ0RGF0YTtcbiAgICAgICAgY29uc3QgZGF0YXNldHMgPSB0aGlzLmRhdGEuZGF0YXNldHMgfHwgW107XG4gICAgICAgIGxhYmVscyA9IFsnbmFtZSddLmNvbmNhdCh0aGlzLmRhdGEubGFiZWxzIGFzIHN0cmluZ1tdKTtcbiAgICAgICAgeGxzeERhdGEucHVzaChsYWJlbHMpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGFzZXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgY29uc3Qgcm93OiB1bmtub3duW10gPSBbXTtcbiAgICAgICAgICBjb25zdCBkYXRhID0gZGF0YXNldHNbaV0uZGF0YSB8fCBbXTtcbiAgICAgICAgICByb3cucHVzaChkYXRhc2V0c1tpXS5sYWJlbCk7XG4gICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBkYXRhLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICByb3cucHVzaChkYXRhW2pdKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgeGxzeERhdGEucHVzaChyb3cpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBBamZXaWRnZXRUeXBlLkR5bmFtaWNUYWJsZTpcbiAgICAgIGNhc2UgQWpmV2lkZ2V0VHlwZS5UYWJsZTpcbiAgICAgICAgY29uc3QgdGFibGVEYXRhID0gdGhpcy5kYXRhIGFzIEFqZlRhYmxlQ2VsbFtdW107XG4gICAgICAgIGlmICh0YWJsZURhdGEubGVuZ3RoID4gMSkge1xuICAgICAgICAgIHhsc3hEYXRhID0gW107XG4gICAgICAgICAgY29uc3QgbmV4dFJvd3M6IHVua25vd25bXVtdID0gW107XG4gICAgICAgICAgbGV0IG5leHRSb3c6IHVua25vd25bXSA9IFtdO1xuICAgICAgICAgIGxldCB0b3RSb3dTcGFuID0gMDtcbiAgICAgICAgICBsZXQgbmV4dFJvd3NwYW5OdW0gPSAwO1xuXG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0YWJsZURhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBpc05ld1Jvd0FmdGVyUm93c3BhbiA9IGZhbHNlO1xuICAgICAgICAgICAgbGV0IHJlczogdW5rbm93bltdID0gW107XG5cbiAgICAgICAgICAgIG5leHRSb3cgPSBbXTtcbiAgICAgICAgICAgIGlmICh0b3RSb3dTcGFuID4gMCkge1xuICAgICAgICAgICAgICByZXMgPSBbLi4ubmV4dFJvd3NbbmV4dFJvd3NwYW5OdW0gLSAxXV07XG4gICAgICAgICAgICAgIGlzTmV3Um93QWZ0ZXJSb3dzcGFuID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRhYmxlRGF0YVtpXS5mb3JFYWNoKChlbGVtOiBBamZUYWJsZUNlbGwsIGlkeEVsZW06IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgICByZXMucHVzaChlbGVtLnZhbHVlLmNoYW5naW5nVGhpc0JyZWFrc0FwcGxpY2F0aW9uU2VjdXJpdHkpO1xuXG4gICAgICAgICAgICAgIGlmIChlbGVtLmNvbHNwYW4gJiYgZWxlbS5jb2xzcGFuID4gMSkge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAxOyBqIDwgZWxlbS5jb2xzcGFuOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgIHJlcy5wdXNoKCcgJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmIChpc05ld1Jvd0FmdGVyUm93c3Bhbikge1xuICAgICAgICAgICAgICAgIGlmIChlbGVtLnJvd3NwYW4gJiYgZWxlbS5yb3dzcGFuID4gMSkge1xuICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaWR4ID0gMTsgaWR4IDwgZWxlbS5yb3dzcGFuOyBpZHgrKykge1xuICAgICAgICAgICAgICAgICAgICBuZXh0Um93LnB1c2goJyAnKTtcbiAgICAgICAgICAgICAgICAgICAgbmV4dFJvd3NbbmV4dFJvd3NwYW5OdW1dID0gbmV4dFJvd3NbbmV4dFJvd3NwYW5OdW1dLmNvbmNhdChuZXh0Um93KTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGlkeEVsZW0gPT09IHRhYmxlRGF0YVtpXS5sZW5ndGggLSAxICYmIG5leHRSb3dzcGFuTnVtID4gMCkge1xuICAgICAgICAgICAgICAgICAgbmV4dFJvd3NwYW5OdW0rKztcbiAgICAgICAgICAgICAgICAgIGlmIChuZXh0Um93c3Bhbk51bSA9PT0gdG90Um93U3Bhbikge1xuICAgICAgICAgICAgICAgICAgICB0b3RSb3dTcGFuID0gMDtcbiAgICAgICAgICAgICAgICAgICAgbmV4dFJvd3NwYW5OdW0gPSAwO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoZWxlbS5yb3dzcGFuICYmIGVsZW0ucm93c3BhbiA+IDEpIHtcbiAgICAgICAgICAgICAgICAgIHRvdFJvd1NwYW4gPSBlbGVtLnJvd3NwYW47XG4gICAgICAgICAgICAgICAgICBuZXh0Um93c3Bhbk51bSA9IDE7XG4gICAgICAgICAgICAgICAgICBmb3IgKGxldCBpZHggPSAxOyBpZHggPCBlbGVtLnJvd3NwYW47IGlkeCsrKSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHRSb3cucHVzaCgnICcpO1xuICAgICAgICAgICAgICAgICAgICBuZXh0Um93c1tpZHggLSAxXSA9IG5leHRSb3c7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHhsc3hEYXRhLnB1c2gocmVzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgcmV0dXJuIHhsc3hEYXRhO1xuICB9XG5cbiAgcHJpdmF0ZSBfYnVpbGRUaXRsZSh3aWRnZXRUeXBlOiBBamZXaWRnZXRUeXBlKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYCR7QWpmV2lkZ2V0VHlwZVt3aWRnZXRUeXBlXX0gJHtmb3JtYXQobmV3IERhdGUoKSwgYHl5eXktTU0tZGRgKX1gO1xuICB9XG59XG4iLCI8ZGl2IGNsYXNzPVwiYWpmLXdpZGdldC13cmFwcGVyXCI+XG4gIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgPGRpdiAqbmdJZj1cImVuYWJsZVwiIGNsYXNzPVwiYWpmLWV4cG9ydC1tZW51XCIgW2NsYXNzLmFqZi1leHBvcnQtbWVudS1vdmVybGF5XT1cIm92ZXJsYXlcIj5cbiAgICAgIDxidXR0b24gKGNsaWNrKT1cImV4cG9ydCgnY3N2JylcIj5DU1Y8L2J1dHRvbj5cbiAgICAgIDxidXR0b24gKGNsaWNrKT1cImV4cG9ydCgneGxzeCcpXCI+WExTWDwvYnV0dG9uPlxuICA8L2Rpdj5cbjwvZGl2PlxuIl19