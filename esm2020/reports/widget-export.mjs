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
AjfWidgetExport.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfWidgetExport, deps: [], target: i0.ɵɵFactoryTarget.Component });
AjfWidgetExport.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.5", type: AjfWidgetExport, selector: "ajf-widget-export", inputs: { widgetType: "widgetType", data: "data", overlay: "overlay", enable: "enable" }, ngImport: i0, template: "<div class=\"ajf-widget-wrapper\" (mouseenter)=\"showOverlay = true\" (mouseleave)=\"showOverlay = false\" [class.ajf-show-overlay]=\"showOverlay\">\n  <ng-content></ng-content>\n  <div *ngIf=\"enable\" class=\"ajf-export-menu\" [class.ajf-export-menu-overlay]=\"overlay\">\n      <button (click)=\"export('csv')\">CSV</button>\n      <button (click)=\"export('xlsx')\">XLSX</button>\n  </div>\n</div>\n", styles: ["ajf-widget-export{width:100%;height:inherit}ajf-widget-export .ajf-widget-wrapper{position:relative;height:inherit}ajf-widget-export .ajf-export-menu{position:absolute;right:0;top:0}ajf-widget-export .ajf-export-menu.ajf-export-menu-overlay{display:none}ajf-widget-export .ajf-export-menu button{margin:.5em;border:none;color:#fff;background-color:#4a403f;padding:7.5px 16px;text-align:center;text-decoration:none;display:inline-block;font-size:16px;cursor:pointer}ajf-widget-export .ajf-widget-wrapper.ajf-show-overlay .ajf-export-menu-overlay{display:block}\n"], directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfWidgetExport, decorators: [{
            type: Component,
            args: [{ selector: 'ajf-widget-export', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"ajf-widget-wrapper\" (mouseenter)=\"showOverlay = true\" (mouseleave)=\"showOverlay = false\" [class.ajf-show-overlay]=\"showOverlay\">\n  <ng-content></ng-content>\n  <div *ngIf=\"enable\" class=\"ajf-export-menu\" [class.ajf-export-menu-overlay]=\"overlay\">\n      <button (click)=\"export('csv')\">CSV</button>\n      <button (click)=\"export('xlsx')\">XLSX</button>\n  </div>\n</div>\n", styles: ["ajf-widget-export{width:100%;height:inherit}ajf-widget-export .ajf-widget-wrapper{position:relative;height:inherit}ajf-widget-export .ajf-export-menu{position:absolute;right:0;top:0}ajf-widget-export .ajf-export-menu.ajf-export-menu-overlay{display:none}ajf-widget-export .ajf-export-menu button{margin:.5em;border:none;color:#fff;background-color:#4a403f;padding:7.5px 16px;text-align:center;text-decoration:none;display:inline-block;font-size:16px;cursor:pointer}ajf-widget-export .ajf-widget-wrapper.ajf-show-overlay .ajf-export-menu-overlay{display:block}\n"] }]
        }], ctorParameters: function () { return []; }, propDecorators: { widgetType: [{
                type: Input
            }], data: [{
                type: Input
            }], overlay: [{
                type: Input
            }], enable: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0LWV4cG9ydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvcmVwb3J0cy9zcmMvd2lkZ2V0LWV4cG9ydC50cyIsIi4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvcmVwb3J0cy9zcmMvd2lkZ2V0LWV4cG9ydC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXVCQSxPQUFPLEVBQUMsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUUzRixPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sVUFBVSxDQUFDO0FBQ2hDLE9BQU8sRUFBQyxLQUFLLEVBQXVCLFNBQVMsRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUUzRCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0saUNBQWlDLENBQUM7OztBQVM5RCxNQUFNLE9BQU8sZUFBZTtJQWlCMUI7UUFkUyxZQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ2YsV0FBTSxHQUFHLEtBQUssQ0FBQztRQUV4QixnQkFBVyxHQUFHLEtBQUssQ0FBQztJQVdMLENBQUM7SUFQaEI7O09BRUc7SUFDSCxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQStCO1FBQzdDLGVBQWUsQ0FBQyxTQUFTLEdBQUcsRUFBQyxHQUFHLGVBQWUsQ0FBQyxTQUFTLEVBQUUsR0FBRyxLQUFLLEVBQUMsQ0FBQztJQUN2RSxDQUFDO0lBSUQ7Ozs7T0FJRztJQUNILFNBQVM7UUFDUCxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3JCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsVUFBVTtRQUNSLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdEIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsTUFBTSxDQUFDLFFBQXdCO1FBQzdCLElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLEVBQUU7WUFDM0IsT0FBTztTQUNS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QUFJLG1CQUNwQix1QkFBdUIsQ0FBQyxNQUFNOzBFQUd0QyxVQUFVO3NCQUFsQixLQUFLO2dCQUNHLElBQUk7c0JBQVosS0FBSztnQkFDRyxPQUFPO3NCQUFmLEtBQUs7Z0JBQ0csTUFBTTtzQkFBZCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZlRhYmxlQ2VsbH0gZnJvbSAnQGFqZi9jb3JlL3RhYmxlJztcbmltcG9ydCB7Q2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQsIFZpZXdFbmNhcHN1bGF0aW9ufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q2hhcnREYXRhfSBmcm9tICdjaGFydC5qcyc7XG5pbXBvcnQge2Zvcm1hdH0gZnJvbSAnZGF0ZS1mbnMnO1xuaW1wb3J0IHt1dGlscywgV29ya0Jvb2ssIFdvcmtTaGVldCwgd3JpdGVGaWxlfSBmcm9tICd4bHN4JztcblxuaW1wb3J0IHtBamZXaWRnZXRUeXBlfSBmcm9tICcuL2ludGVyZmFjZS93aWRnZXRzL3dpZGdldC10eXBlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWpmLXdpZGdldC1leHBvcnQnLFxuICB0ZW1wbGF0ZVVybDogJ3dpZGdldC1leHBvcnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWyd3aWRnZXQtZXhwb3J0LnNjc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIEFqZldpZGdldEV4cG9ydCB7XG4gIEBJbnB1dCgpIHdpZGdldFR5cGU6IEFqZldpZGdldFR5cGUgfCB1bmRlZmluZWQ7XG4gIEBJbnB1dCgpIGRhdGE6IENoYXJ0RGF0YSB8IEFqZlRhYmxlQ2VsbFtdW10gfCB1bmRlZmluZWQ7XG4gIEBJbnB1dCgpIG92ZXJsYXkgPSB0cnVlO1xuICBASW5wdXQoKSBlbmFibGUgPSBmYWxzZTtcblxuICBzaG93T3ZlcmxheSA9IGZhbHNlO1xuXG4gIHByaXZhdGUgc3RhdGljIF9pY29uc01hcDoge1todG1sOiBzdHJpbmddOiBzdHJpbmd9ID0ge307XG5cbiAgLyoqXG4gICAqIEFsbG93cyByZW5kZXJpbmcgaHRtbCBpY29ucyBhcyB0ZXh0LlxuICAgKi9cbiAgc3RhdGljIGFkZEljb25zKGljb25zOiB7W2h0bWw6IHN0cmluZ106IHN0cmluZ30pIHtcbiAgICBBamZXaWRnZXRFeHBvcnQuX2ljb25zTWFwID0gey4uLkFqZldpZGdldEV4cG9ydC5faWNvbnNNYXAsIC4uLmljb25zfTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICAvKipcbiAgICogRXhwb3J0IHdpZGdldCBkYXRhIGluIENTViBmb3JtYXRcbiAgICogQGRlcHJlY2F0ZWQgVXNlIGBBamZXaWRnZXRFeHBvcnQuZXhwb3J0YCB3aXRoICdjc3YnIHBhcmFtZXRlci5cbiAgICogQGJyZWFraW5nLWNoYW5nZSAxMy4wLjBcbiAgICovXG4gIGV4cG9ydENzdigpOiB2b2lkIHtcbiAgICB0aGlzLmV4cG9ydCgnY3N2Jyk7XG4gIH1cblxuICAvKipcbiAgICogRXhwb3J0IHdpZGdldCBkYXRhIGluIFhsc3ggZm9ybWF0XG4gICAqIEBkZXByZWNhdGVkIFVzZSBgQWpmV2lkZ2V0RXhwb3J0LmV4cG9ydGAgd2l0aCAneGxzeCcgcGFyYW1ldGVyLlxuICAgKiBAYnJlYWtpbmctY2hhbmdlIDEzLjAuMFxuICAgKi9cbiAgZXhwb3J0WGxzeCgpOiB2b2lkIHtcbiAgICB0aGlzLmV4cG9ydCgneGxzeCcpO1xuICB9XG5cbiAgLyoqXG4gICAqIEV4cG9ydCB3aWRnZXQgZGF0YSBpbiBDU1Ygb3IgWGxzeCBmb3JtYXRcbiAgICovXG4gIGV4cG9ydChib29rVHlwZTogJ2NzdicgfCAneGxzeCcpOiB2b2lkIHtcbiAgICBpZiAodGhpcy53aWRnZXRUeXBlID09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3Qgc2hlZXROYW1lID0gdGhpcy5fYnVpbGRUaXRsZSh0aGlzLndpZGdldFR5cGUpO1xuICAgIGNvbnN0IHNoZWV0czoge1tzaGVldDogc3RyaW5nXTogV29ya1NoZWV0fSA9IHt9O1xuICAgIHNoZWV0c1tzaGVldE5hbWVdID0gdXRpbHMuYW9hX3RvX3NoZWV0KHRoaXMuX2J1aWxkWGxzeERhdGEoKSk7XG4gICAgY29uc3Qgd29ya0Jvb2s6IFdvcmtCb29rID0ge1NoZWV0czogc2hlZXRzLCBTaGVldE5hbWVzOiBbc2hlZXROYW1lXX07XG4gICAgd3JpdGVGaWxlKHdvcmtCb29rLCBgJHtzaGVldE5hbWV9LiR7Ym9va1R5cGV9YCwge1xuICAgICAgYm9va1R5cGUsXG4gICAgICB0eXBlOiAnYXJyYXknLFxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfYnVpbGRYbHN4RGF0YSgpOiB1bmtub3duW11bXSB7XG4gICAgY29uc3QgaWNvbnNNYXAgPSBBamZXaWRnZXRFeHBvcnQuX2ljb25zTWFwO1xuICAgIGxldCB4bHN4RGF0YTogdW5rbm93bltdW10gPSBbXTtcbiAgICBsZXQgbGFiZWxzOiBzdHJpbmdbXSA9IFtdO1xuICAgIHN3aXRjaCAodGhpcy53aWRnZXRUeXBlKSB7XG4gICAgICBkZWZhdWx0OlxuICAgICAgY2FzZSBBamZXaWRnZXRUeXBlLkNoYXJ0OlxuICAgICAgICB0aGlzLmRhdGEgPSB0aGlzLmRhdGEgYXMgQ2hhcnREYXRhO1xuICAgICAgICBjb25zdCBkYXRhc2V0cyA9IHRoaXMuZGF0YS5kYXRhc2V0cyB8fCBbXTtcbiAgICAgICAgbGFiZWxzID0gWyduYW1lJ10uY29uY2F0KHRoaXMuZGF0YS5sYWJlbHMgYXMgc3RyaW5nW10pO1xuICAgICAgICB4bHN4RGF0YS5wdXNoKGxhYmVscyk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YXNldHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBjb25zdCByb3c6IHVua25vd25bXSA9IFtdO1xuICAgICAgICAgIGNvbnN0IGRhdGEgPSBkYXRhc2V0c1tpXS5kYXRhIHx8IFtdO1xuICAgICAgICAgIHJvdy5wdXNoKGRhdGFzZXRzW2ldLmxhYmVsKTtcbiAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGRhdGEubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIHJvdy5wdXNoKGRhdGFbal0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICB4bHN4RGF0YS5wdXNoKHJvdyk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEFqZldpZGdldFR5cGUuRHluYW1pY1RhYmxlOlxuICAgICAgY2FzZSBBamZXaWRnZXRUeXBlLlRhYmxlOlxuICAgICAgICBjb25zdCB0YWJsZURhdGEgPSB0aGlzLmRhdGEgYXMgQWpmVGFibGVDZWxsW11bXTtcbiAgICAgICAgaWYgKHRhYmxlRGF0YS5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgeGxzeERhdGEgPSBbXTtcbiAgICAgICAgICBjb25zdCBuZXh0Um93czogdW5rbm93bltdW10gPSBbXTtcbiAgICAgICAgICBsZXQgbmV4dFJvdzogdW5rbm93bltdID0gW107XG4gICAgICAgICAgbGV0IHRvdFJvd1NwYW4gPSAwO1xuICAgICAgICAgIGxldCBuZXh0Um93c3Bhbk51bSA9IDA7XG5cbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRhYmxlRGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGlzTmV3Um93QWZ0ZXJSb3dzcGFuID0gZmFsc2U7XG4gICAgICAgICAgICBsZXQgcmVzOiB1bmtub3duW10gPSBbXTtcblxuICAgICAgICAgICAgbmV4dFJvdyA9IFtdO1xuICAgICAgICAgICAgaWYgKHRvdFJvd1NwYW4gPiAwKSB7XG4gICAgICAgICAgICAgIHJlcyA9IFsuLi5uZXh0Um93c1tuZXh0Um93c3Bhbk51bSAtIDFdXTtcbiAgICAgICAgICAgICAgaXNOZXdSb3dBZnRlclJvd3NwYW4gPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGFibGVEYXRhW2ldLmZvckVhY2goKGVsZW06IEFqZlRhYmxlQ2VsbCwgaWR4RWxlbTogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICAgIGxldCB2YWwgPSBlbGVtLnZhbHVlLmNoYW5naW5nVGhpc0JyZWFrc0FwcGxpY2F0aW9uU2VjdXJpdHk7XG4gICAgICAgICAgICAgIGlmICh2YWwgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHZhbCA9IGVsZW0udmFsdWU7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKHZhbCAhPSBudWxsICYmIGljb25zTWFwW3ZhbF0pIHtcbiAgICAgICAgICAgICAgICB2YWwgPSBpY29uc01hcFt2YWxdO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJlcy5wdXNoKHZhbCk7XG5cbiAgICAgICAgICAgICAgaWYgKGVsZW0uY29sc3BhbiAmJiBlbGVtLmNvbHNwYW4gPiAxKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDE7IGogPCBlbGVtLmNvbHNwYW47IGorKykge1xuICAgICAgICAgICAgICAgICAgcmVzLnB1c2goJyAnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKGlzTmV3Um93QWZ0ZXJSb3dzcGFuKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVsZW0ucm93c3BhbiAmJiBlbGVtLnJvd3NwYW4gPiAxKSB7XG4gICAgICAgICAgICAgICAgICBmb3IgKGxldCBpZHggPSAxOyBpZHggPCBlbGVtLnJvd3NwYW47IGlkeCsrKSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHRSb3cucHVzaCgnICcpO1xuICAgICAgICAgICAgICAgICAgICBuZXh0Um93c1tuZXh0Um93c3Bhbk51bV0gPSBuZXh0Um93c1tuZXh0Um93c3Bhbk51bV0uY29uY2F0KG5leHRSb3cpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoaWR4RWxlbSA9PT0gdGFibGVEYXRhW2ldLmxlbmd0aCAtIDEgJiYgbmV4dFJvd3NwYW5OdW0gPiAwKSB7XG4gICAgICAgICAgICAgICAgICBuZXh0Um93c3Bhbk51bSsrO1xuICAgICAgICAgICAgICAgICAgaWYgKG5leHRSb3dzcGFuTnVtID09PSB0b3RSb3dTcGFuKSB7XG4gICAgICAgICAgICAgICAgICAgIHRvdFJvd1NwYW4gPSAwO1xuICAgICAgICAgICAgICAgICAgICBuZXh0Um93c3Bhbk51bSA9IDA7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChlbGVtLnJvd3NwYW4gJiYgZWxlbS5yb3dzcGFuID4gMSkge1xuICAgICAgICAgICAgICAgICAgdG90Um93U3BhbiA9IGVsZW0ucm93c3BhbjtcbiAgICAgICAgICAgICAgICAgIG5leHRSb3dzcGFuTnVtID0gMTtcbiAgICAgICAgICAgICAgICAgIGZvciAobGV0IGlkeCA9IDE7IGlkeCA8IGVsZW0ucm93c3BhbjsgaWR4KyspIHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dFJvdy5wdXNoKCcgJyk7XG4gICAgICAgICAgICAgICAgICAgIG5leHRSb3dzW2lkeCAtIDFdID0gbmV4dFJvdztcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgeGxzeERhdGEucHVzaChyZXMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICByZXR1cm4geGxzeERhdGE7XG4gIH1cblxuICBwcml2YXRlIF9idWlsZFRpdGxlKHdpZGdldFR5cGU6IEFqZldpZGdldFR5cGUpOiBzdHJpbmcge1xuICAgIHJldHVybiBgJHtBamZXaWRnZXRUeXBlW3dpZGdldFR5cGVdfSAke2Zvcm1hdChuZXcgRGF0ZSgpLCBgeXl5eS1NTS1kZGApfWA7XG4gIH1cbn1cbiIsIjxkaXYgY2xhc3M9XCJhamYtd2lkZ2V0LXdyYXBwZXJcIiAobW91c2VlbnRlcik9XCJzaG93T3ZlcmxheSA9IHRydWVcIiAobW91c2VsZWF2ZSk9XCJzaG93T3ZlcmxheSA9IGZhbHNlXCIgW2NsYXNzLmFqZi1zaG93LW92ZXJsYXldPVwic2hvd092ZXJsYXlcIj5cbiAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICA8ZGl2ICpuZ0lmPVwiZW5hYmxlXCIgY2xhc3M9XCJhamYtZXhwb3J0LW1lbnVcIiBbY2xhc3MuYWpmLWV4cG9ydC1tZW51LW92ZXJsYXldPVwib3ZlcmxheVwiPlxuICAgICAgPGJ1dHRvbiAoY2xpY2spPVwiZXhwb3J0KCdjc3YnKVwiPkNTVjwvYnV0dG9uPlxuICAgICAgPGJ1dHRvbiAoY2xpY2spPVwiZXhwb3J0KCd4bHN4JylcIj5YTFNYPC9idXR0b24+XG4gIDwvZGl2PlxuPC9kaXY+XG4iXX0=