import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation, } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@ajf/core/echarts";
let heatMapIdx = 0;
export class AjfHeatMap {
    constructor(_cdr) {
        this._cdr = _cdr;
        this._startColor = '#ffeb3b';
        this._endColor = '#f44336';
        this._highlightColor = '#009688';
        this._values = 'properties.value';
        this._idProp = 'id';
        this._showVisualMap = false;
        this.featureSelected = new EventEmitter();
        this._name = `ajf_heatmap_${heatMapIdx++}`;
    }
    set features(features) {
        this._features = features;
    }
    set startColor(startColor) {
        this._startColor = startColor;
    }
    set endColor(endColor) {
        this._endColor = endColor;
    }
    set highlightColor(highlightColor) {
        this._highlightColor = highlightColor;
    }
    set values(values) {
        this._values = values;
    }
    set idProp(idProp) {
        this._idProp = idProp;
    }
    set showVisualMap(showVisualMap) {
        this._showVisualMap = coerceBooleanProperty(showVisualMap);
    }
    get chartOptions() {
        return this._chartOptions;
    }
    ngOnChanges(_) {
        this._updateChartOptions();
    }
    ngOnDestroy() {
        this.featureSelected.complete();
    }
    onChartInit(event) {
        const { echarts, chart } = event;
        this._echarts = echarts;
        chart.on('selectchanged', params => {
            if (this._features == null) {
                return;
            }
            const { selected } = params;
            if (selected == null || selected.length !== 1) {
                return;
            }
            const { dataIndex, seriesIndex } = selected[0];
            if (seriesIndex !== 0 || dataIndex.length !== 1) {
                return;
            }
            const idx = dataIndex[0];
            if (idx < 0 || idx >= this._features.features.length) {
                return;
            }
            const feature = this._features.features[idx];
            this.featureSelected.emit({ feature });
        });
        this._updateChartOptions();
    }
    _updateChartOptions() {
        if (this._echarts == null) {
            return;
        }
        if (this._features == null) {
            this._chartOptions = undefined;
        }
        else {
            this._echarts.registerMap(this._name, this._features);
            this._chartOptions = {
                geo: {
                    map: this._name,
                    itemStyle: {
                        opacity: 0,
                    },
                    nameProperty: this._idProp,
                },
                visualMap: {
                    calculable: false,
                    realtime: false,
                    inRange: {
                        color: [this._startColor, this._endColor],
                    },
                    showLabel: false,
                    show: this._showVisualMap,
                },
                series: this._getChartSeries(),
            };
        }
        this._cdr.detectChanges();
    }
    _getChartSeries() {
        const data = this._getFeaturesData();
        if (data.length === 0) {
            return [];
        }
        return [
            {
                type: 'map',
                map: this._name,
                nameProperty: this._idProp,
                emphasis: {
                    itemStyle: {
                        areaColor: this._highlightColor,
                    },
                    label: {
                        show: false,
                    },
                },
                select: {
                    itemStyle: {
                        color: this._highlightColor,
                    },
                    label: {
                        show: false,
                    },
                },
                selectedMode: 'single',
                data,
            },
        ];
    }
    _getFeaturesData() {
        if (this._features == null) {
            return [];
        }
        const { features } = this._features;
        const values = this._values;
        if (typeof values === 'string') {
        }
        else if (values.length === features.length) {
            return features.map((feature, idx) => {
                const idProp = feature.properties[this._idProp];
                return {
                    name: idProp,
                    value: values[idx],
                };
            });
        }
        return [];
    }
}
AjfHeatMap.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfHeatMap, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
AjfHeatMap.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.5", type: AjfHeatMap, selector: "ajf-heat-map", inputs: { features: "features", startColor: "startColor", endColor: "endColor", highlightColor: "highlightColor", values: "values", idProp: "idProp", showVisualMap: "showVisualMap" }, outputs: { featureSelected: "featureSelected" }, usesOnChanges: true, ngImport: i0, template: "<div ajfEcharts (chartInit)=\"onChartInit($event)\" [options]=\"chartOptions\"></div>\n", styles: ["ajf-heat-map{display:block;position:relative}ajf-heat-map [ajfEcharts]{width:100%;height:100%}\n"], directives: [{ type: i1.AjfEchartsDirective, selector: "[ajfEcharts]", inputs: ["theme", "renderer", "options"], outputs: ["chartInit"], exportAs: ["ajfEcharts"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfHeatMap, decorators: [{
            type: Component,
            args: [{ selector: 'ajf-heat-map', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<div ajfEcharts (chartInit)=\"onChartInit($event)\" [options]=\"chartOptions\"></div>\n", styles: ["ajf-heat-map{display:block;position:relative}ajf-heat-map [ajfEcharts]{width:100%;height:100%}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }]; }, propDecorators: { features: [{
                type: Input
            }], startColor: [{
                type: Input
            }], endColor: [{
                type: Input
            }], highlightColor: [{
                type: Input
            }], values: [{
                type: Input
            }], idProp: [{
                type: Input
            }], showVisualMap: [{
                type: Input
            }], featureSelected: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhdC1tYXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL2hlYXQtbWFwL3NyYy9oZWF0LW1hcC50cyIsIi4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvaGVhdC1tYXAvc3JjL2hlYXQtbWFwLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBdUJBLE9BQU8sRUFBZSxxQkFBcUIsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQzFFLE9BQU8sRUFDTCx1QkFBdUIsRUFFdkIsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBR0wsTUFBTSxFQUVOLGlCQUFpQixHQUNsQixNQUFNLGVBQWUsQ0FBQzs7O0FBR3ZCLElBQUksVUFBVSxHQUFHLENBQUMsQ0FBQztBQXVCbkIsTUFBTSxPQUFPLFVBQVU7SUFxRHJCLFlBQW9CLElBQXVCO1FBQXZCLFNBQUksR0FBSixJQUFJLENBQW1CO1FBMUNuQyxnQkFBVyxHQUFHLFNBQVMsQ0FBQztRQU14QixjQUFTLEdBQUcsU0FBUyxDQUFDO1FBTXRCLG9CQUFlLEdBQUcsU0FBUyxDQUFDO1FBTTVCLFlBQU8sR0FBc0Isa0JBQWtCLENBQUM7UUFNaEQsWUFBTyxHQUFHLElBQUksQ0FBQztRQU1mLG1CQUFjLEdBQUcsS0FBSyxDQUFDO1FBR3RCLG9CQUFlLEdBQUcsSUFBSSxZQUFZLEVBQTZCLENBQUM7UUFNakUsVUFBSyxHQUFHLGVBQWUsVUFBVSxFQUFFLEVBQUUsQ0FBQztJQUdBLENBQUM7SUFwRC9DLElBQ0ksUUFBUSxDQUFDLFFBQWlEO1FBQzVELElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO0lBQzVCLENBQUM7SUFHRCxJQUNJLFVBQVUsQ0FBQyxVQUFrQjtRQUMvQixJQUFJLENBQUMsV0FBVyxHQUFHLFVBQVUsQ0FBQztJQUNoQyxDQUFDO0lBR0QsSUFDSSxRQUFRLENBQUMsUUFBZ0I7UUFDM0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7SUFD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QzVCLElBQUksT0FBTyxNQUFNLEtBQUssUUFBUSxFQUFFO1NBQy9CO2FBQU0sSUFBSSxNQUFNLENBQUMsTUFBTSxLQUFLLFFBQVEsQ0FBQyxNQUFNLEVBQUU7WUFDNUMsT0FBTyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRSxFQUFFO2dCQUNuQyxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQVcsQ0FBQztnQkFDMUQsT0FBTztvQkFDTCxJQUFJLEVBQUUsTUFBTTtvQkFDWixLQUFLLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQztpQkFDWixDQUFDO1lBQ1gsQ0FBQyxDQUFDLENBQUM7U0FDSjtRQUNELE9BQU8sRUFBRSxDQUFDO0lBQ1osQ0FBQzs7dUdBeEtVLFVBQVU7MkZBQVYsVUFBVSxrVEM3RHZCLHlGQUNBOzJGRDREYSxVQUFVO2tCQVB0QixTQUFTOytCQUNFLGNBQWMsbUJBR1AsdUJBQXVCLENBQUMsTUFBTSxpQkFDaEMsaUJBQWlCLENBQUMsSUFBSTt3R0FJakMsUUFBUTtzQkFEWCxLQUFLO2dCQU9GLFVBQVU7c0JBRGIsS0FBSztnQkFPRixRQUFRO3NCQURYLEtBQUs7Z0JBT0YsY0FBYztzQkFEakIsS0FBSztnQkFPRixNQUFNO3NCQURULEtBQUs7Z0JBT0YsTUFBTTtzQkFEVCxLQUFLO2dCQU9GLGFBQWE7c0JBRGhCLEtBQUs7Z0JBT0csZUFBZTtzQkFEdkIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZFY2hhcnRzSW5pdEV2ZW50LCBFY2hhcnRzTW9kdWxlfSBmcm9tICdAYWpmL2NvcmUvZWNoYXJ0cyc7XG5pbXBvcnQge0Jvb2xlYW5JbnB1dCwgY29lcmNlQm9vbGVhblByb3BlcnR5fSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPdXRwdXQsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RmVhdHVyZSwgRmVhdHVyZUNvbGxlY3Rpb24sIEdlb21ldHJ5fSBmcm9tICdnZW9qc29uJztcblxubGV0IGhlYXRNYXBJZHggPSAwO1xuXG5leHBvcnQgdHlwZSBBamZIZWF0TWFwRmVhdHVyZSA9IEZlYXR1cmU8R2VvbWV0cnksIHtbbmFtZTogc3RyaW5nXTogYW55fT47XG5leHBvcnQgdHlwZSBBamZIZWF0TWFwRmVhdHVyZUNvbGxlY3Rpb24gPSBGZWF0dXJlQ29sbGVjdGlvbjxHZW9tZXRyeSwge1tuYW1lOiBzdHJpbmddOiBhbnl9PjtcblxuZXhwb3J0IGludGVyZmFjZSBBamZIZWF0TWFwRmVhdHVyZVNlbGVjdGVkIHtcbiAgZmVhdHVyZTogQWpmSGVhdE1hcEZlYXR1cmU7XG59XG5cbmludGVyZmFjZSBTZWxlY3RDaGFuZ2VkIHtcbiAgc2VsZWN0ZWQ6IHtcbiAgICBkYXRhSW5kZXg6IG51bWJlcltdO1xuICAgIHNlcmllc0luZGV4OiBudW1iZXI7XG4gIH1bXTtcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWpmLWhlYXQtbWFwJyxcbiAgdGVtcGxhdGVVcmw6ICdoZWF0LW1hcC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ2hlYXQtbWFwLnNjc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG59KVxuZXhwb3J0IGNsYXNzIEFqZkhlYXRNYXAgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgpXG4gIHNldCBmZWF0dXJlcyhmZWF0dXJlczogQWpmSGVhdE1hcEZlYXR1cmVDb2xsZWN0aW9uIHwgdW5kZWZpbmVkKSB7XG4gICAgdGhpcy5fZmVhdHVyZXMgPSBmZWF0dXJlcztcbiAgfVxuICBwcml2YXRlIF9mZWF0dXJlcz86IEFqZkhlYXRNYXBGZWF0dXJlQ29sbGVjdGlvbjtcblxuICBASW5wdXQoKVxuICBzZXQgc3RhcnRDb2xvcihzdGFydENvbG9yOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9zdGFydENvbG9yID0gc3RhcnRDb2xvcjtcbiAgfVxuICBwcml2YXRlIF9zdGFydENvbG9yID0gJyNmZmViM2InO1xuXG4gIEBJbnB1dCgpXG4gIHNldCBlbmRDb2xvcihlbmRDb2xvcjogc3RyaW5nKSB7XG4gICAgdGhpcy5fZW5kQ29sb3IgPSBlbmRDb2xvcjtcbiAgfVxuICBwcml2YXRlIF9lbmRDb2xvciA9ICcjZjQ0MzM2JztcblxuICBASW5wdXQoKVxuICBzZXQgaGlnaGxpZ2h0Q29sb3IoaGlnaGxpZ2h0Q29sb3I6IHN0cmluZykge1xuICAgIHRoaXMuX2hpZ2hsaWdodENvbG9yID0gaGlnaGxpZ2h0Q29sb3I7XG4gIH1cbiAgcHJpdmF0ZSBfaGlnaGxpZ2h0Q29sb3IgPSAnIzAwOTY4OCc7XG5cbiAgQElucHV0KClcbiAgc2V0IHZhbHVlcyh2YWx1ZXM6IHN0cmluZyB8IG51bWJlcltdKSB7XG4gICAgdGhpcy5fdmFsdWVzID0gdmFsdWVzO1xuICB9XG4gIHByaXZhdGUgX3ZhbHVlczogc3RyaW5nIHwgbnVtYmVyW10gPSAncHJvcGVydGllcy52YWx1ZSc7XG5cbiAgQElucHV0KClcbiAgc2V0IGlkUHJvcChpZFByb3A6IHN0cmluZykge1xuICAgIHRoaXMuX2lkUHJvcCA9IGlkUHJvcDtcbiAgfVxuICBwcml2YXRlIF9pZFByb3AgPSAnaWQnO1xuXG4gIEBJbnB1dCgpXG4gIHNldCBzaG93VmlzdWFsTWFwKHNob3dWaXN1YWxNYXA6IEJvb2xlYW5JbnB1dCkge1xuICAgIHRoaXMuX3Nob3dWaXN1YWxNYXAgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkoc2hvd1Zpc3VhbE1hcCk7XG4gIH1cbiAgcHJpdmF0ZSBfc2hvd1Zpc3VhbE1hcCA9IGZhbHNlO1xuXG4gIEBPdXRwdXQoKVxuICByZWFkb25seSBmZWF0dXJlU2VsZWN0ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPEFqZkhlYXRNYXBGZWF0dXJlU2VsZWN0ZWQ+KCk7XG5cbiAgZ2V0IGNoYXJ0T3B0aW9ucygpOiBlY2hhcnRzLkVDaGFydHNPcHRpb24gfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLl9jaGFydE9wdGlvbnM7XG4gIH1cbiAgcHJpdmF0ZSBfY2hhcnRPcHRpb25zPzogZWNoYXJ0cy5FQ2hhcnRzT3B0aW9uO1xuICBwcml2YXRlIF9uYW1lID0gYGFqZl9oZWF0bWFwXyR7aGVhdE1hcElkeCsrfWA7XG4gIHByaXZhdGUgX2VjaGFydHM/OiBFY2hhcnRzTW9kdWxlO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2NkcjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHt9XG5cbiAgbmdPbkNoYW5nZXMoXzogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIHRoaXMuX3VwZGF0ZUNoYXJ0T3B0aW9ucygpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5mZWF0dXJlU2VsZWN0ZWQuY29tcGxldGUoKTtcbiAgfVxuXG4gIG9uQ2hhcnRJbml0KGV2ZW50OiBBamZFY2hhcnRzSW5pdEV2ZW50KTogdm9pZCB7XG4gICAgY29uc3Qge2VjaGFydHMsIGNoYXJ0fSA9IGV2ZW50O1xuICAgIHRoaXMuX2VjaGFydHMgPSBlY2hhcnRzO1xuICAgIGNoYXJ0Lm9uKCdzZWxlY3RjaGFuZ2VkJywgcGFyYW1zID0+IHtcbiAgICAgIGlmICh0aGlzLl9mZWF0dXJlcyA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHtzZWxlY3RlZH0gPSBwYXJhbXMgYXMgU2VsZWN0Q2hhbmdlZDtcbiAgICAgIGlmIChzZWxlY3RlZCA9PSBudWxsIHx8IHNlbGVjdGVkLmxlbmd0aCAhPT0gMSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCB7ZGF0YUluZGV4LCBzZXJpZXNJbmRleH0gPSBzZWxlY3RlZFswXTtcbiAgICAgIGlmIChzZXJpZXNJbmRleCAhPT0gMCB8fCBkYXRhSW5kZXgubGVuZ3RoICE9PSAxKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGlkeCA9IGRhdGFJbmRleFswXTtcbiAgICAgIGlmIChpZHggPCAwIHx8IGlkeCA+PSB0aGlzLl9mZWF0dXJlcy5mZWF0dXJlcy5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3QgZmVhdHVyZSA9IHRoaXMuX2ZlYXR1cmVzLmZlYXR1cmVzW2lkeF07XG4gICAgICB0aGlzLmZlYXR1cmVTZWxlY3RlZC5lbWl0KHtmZWF0dXJlfSk7XG4gICAgfSk7XG4gICAgdGhpcy5fdXBkYXRlQ2hhcnRPcHRpb25zKCk7XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVDaGFydE9wdGlvbnMoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2VjaGFydHMgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5fZmVhdHVyZXMgPT0gbnVsbCkge1xuICAgICAgdGhpcy5fY2hhcnRPcHRpb25zID0gdW5kZWZpbmVkO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9lY2hhcnRzLnJlZ2lzdGVyTWFwKHRoaXMuX25hbWUsIHRoaXMuX2ZlYXR1cmVzIGFzIGFueSk7XG4gICAgICB0aGlzLl9jaGFydE9wdGlvbnMgPSB7XG4gICAgICAgIGdlbzoge1xuICAgICAgICAgIG1hcDogdGhpcy5fbmFtZSxcbiAgICAgICAgICBpdGVtU3R5bGU6IHtcbiAgICAgICAgICAgIG9wYWNpdHk6IDAsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBuYW1lUHJvcGVydHk6IHRoaXMuX2lkUHJvcCxcbiAgICAgICAgfSxcbiAgICAgICAgdmlzdWFsTWFwOiB7XG4gICAgICAgICAgY2FsY3VsYWJsZTogZmFsc2UsXG4gICAgICAgICAgcmVhbHRpbWU6IGZhbHNlLFxuICAgICAgICAgIGluUmFuZ2U6IHtcbiAgICAgICAgICAgIGNvbG9yOiBbdGhpcy5fc3RhcnRDb2xvciwgdGhpcy5fZW5kQ29sb3JdLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgc2hvd0xhYmVsOiBmYWxzZSxcbiAgICAgICAgICBzaG93OiB0aGlzLl9zaG93VmlzdWFsTWFwLFxuICAgICAgICB9LFxuICAgICAgICBzZXJpZXM6IHRoaXMuX2dldENoYXJ0U2VyaWVzKCksXG4gICAgICB9O1xuICAgIH1cbiAgICB0aGlzLl9jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0Q2hhcnRTZXJpZXMoKTogZWNoYXJ0cy5NYXBTZXJpZXNPcHRpb25bXSB7XG4gICAgY29uc3QgZGF0YSA9IHRoaXMuX2dldEZlYXR1cmVzRGF0YSgpO1xuICAgIGlmIChkYXRhLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgICByZXR1cm4gW1xuICAgICAge1xuICAgICAgICB0eXBlOiAnbWFwJyxcbiAgICAgICAgbWFwOiB0aGlzLl9uYW1lLFxuICAgICAgICBuYW1lUHJvcGVydHk6IHRoaXMuX2lkUHJvcCxcbiAgICAgICAgZW1waGFzaXM6IHtcbiAgICAgICAgICBpdGVtU3R5bGU6IHtcbiAgICAgICAgICAgIGFyZWFDb2xvcjogdGhpcy5faGlnaGxpZ2h0Q29sb3IsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBsYWJlbDoge1xuICAgICAgICAgICAgc2hvdzogZmFsc2UsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgc2VsZWN0OiB7XG4gICAgICAgICAgaXRlbVN0eWxlOiB7XG4gICAgICAgICAgICBjb2xvcjogdGhpcy5faGlnaGxpZ2h0Q29sb3IsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBsYWJlbDoge1xuICAgICAgICAgICAgc2hvdzogZmFsc2UsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgc2VsZWN0ZWRNb2RlOiAnc2luZ2xlJyxcbiAgICAgICAgZGF0YSxcbiAgICAgIH0sXG4gICAgXTtcbiAgfVxuXG4gIHByaXZhdGUgX2dldEZlYXR1cmVzRGF0YSgpOiB7bmFtZTogc3RyaW5nOyB2YWx1ZTogbnVtYmVyfVtdIHtcbiAgICBpZiAodGhpcy5fZmVhdHVyZXMgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgICBjb25zdCB7ZmVhdHVyZXN9ID0gdGhpcy5fZmVhdHVyZXM7XG4gICAgY29uc3QgdmFsdWVzID0gdGhpcy5fdmFsdWVzO1xuICAgIGlmICh0eXBlb2YgdmFsdWVzID09PSAnc3RyaW5nJykge1xuICAgIH0gZWxzZSBpZiAodmFsdWVzLmxlbmd0aCA9PT0gZmVhdHVyZXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gZmVhdHVyZXMubWFwKChmZWF0dXJlLCBpZHgpID0+IHtcbiAgICAgICAgY29uc3QgaWRQcm9wID0gZmVhdHVyZS5wcm9wZXJ0aWVzW3RoaXMuX2lkUHJvcF0gYXMgc3RyaW5nO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIG5hbWU6IGlkUHJvcCxcbiAgICAgICAgICB2YWx1ZTogdmFsdWVzW2lkeF0sXG4gICAgICAgIH0gYXMgYW55O1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBbXTtcbiAgfVxufVxuIiwiPGRpdiBhamZFY2hhcnRzIChjaGFydEluaXQpPVwib25DaGFydEluaXQoJGV2ZW50KVwiIFtvcHRpb25zXT1cImNoYXJ0T3B0aW9uc1wiPjwvZGl2PlxuIl19