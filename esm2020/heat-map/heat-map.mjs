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
        this._action = '';
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
    /**
     * The codo to execute when an element is selected on heatmap.
     * It is inserted into a function, which receives the selected object as input
     */
    set action(action) {
        this._action = action;
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
            if (this._action && this._action.length) {
                try {
                    const actionFunction = new Function('v', this._action);
                    actionFunction({ feature });
                }
                catch (e) { }
            }
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
AjfHeatMap.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfHeatMap, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
AjfHeatMap.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.4", type: AjfHeatMap, selector: "ajf-heat-map", inputs: { features: "features", startColor: "startColor", endColor: "endColor", highlightColor: "highlightColor", values: "values", action: "action", idProp: "idProp", showVisualMap: "showVisualMap" }, outputs: { featureSelected: "featureSelected" }, usesOnChanges: true, ngImport: i0, template: "<div ajfEcharts (chartInit)=\"onChartInit($event)\" [options]=\"chartOptions\"></div>\n", styles: ["ajf-heat-map{display:block;position:relative}ajf-heat-map [ajfEcharts]{width:100%;height:100%}\n"], dependencies: [{ kind: "directive", type: i1.AjfEchartsDirective, selector: "[ajfEcharts]", inputs: ["theme", "renderer", "options"], outputs: ["chartInit"], exportAs: ["ajfEcharts"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfHeatMap, decorators: [{
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
            }], action: [{
                type: Input
            }], idProp: [{
                type: Input
            }], showVisualMap: [{
                type: Input
            }], featureSelected: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhdC1tYXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL2hlYXQtbWFwL3NyYy9oZWF0LW1hcC50cyIsIi4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvaGVhdC1tYXAvc3JjL2hlYXQtbWFwLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBdUJBLE9BQU8sRUFBZSxxQkFBcUIsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQzFFLE9BQU8sRUFDTCx1QkFBdUIsRUFFdkIsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBR0wsTUFBTSxFQUVOLGlCQUFpQixHQUNsQixNQUFNLGVBQWUsQ0FBQzs7O0FBR3ZCLElBQUksVUFBVSxHQUFHLENBQUMsQ0FBQztBQXVCbkIsTUFBTSxPQUFPLFVBQVU7SUErRHJCLFlBQW9CLElBQXVCO1FBQXZCLFNBQUksR0FBSixJQUFJLENBQW1CO1FBcERuQyxnQkFBVyxHQUFHLFNBQVMsQ0FBQztRQU14QixjQUFTLEdBQUcsU0FBUyxDQUFDO1FBTXRCLG9CQUFlLEdBQUcsU0FBUyxDQUFDO1FBTTVCLFlBQU8sR0FBc0Isa0JBQWtCLENBQUM7UUFVaEQsWUFBTyxHQUFXLEVBQUUsQ0FBQztRQU1yQixZQUFPLEdBQUcsSUFBSSxDQUFDO1FBTWYsbUJBQWMsR0FBRyxLQUFLLENBQUM7UUFHdEIsb0JBQWUsR0FBRyxJQUFJLFlBQVksRUFBNkIsQ0FBQztRQU1qRSxVQUFLLEdBQUcsZUFBZSxVQUFVLEVBQUUsRUFBRSxDQUFDO0lBR0EsQ0FBQztJQTlEL0MsSUFDSSxRQUFRLENBQUMsUUFBaUQ7UUFDNUQsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7SUFDNUIsQ0FBQztJQUdELElBQ0ksVUFBVSxDQUFDLFVBQWtCO1FBQy9CLElBQUksQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDO0lBQ2hDLENBQUM7SUFHRCxJQUNJLFFBQVEsQ0FBQyxRQUFnQjtRQUMzQixJQUFJLENB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RixNQUFNO3NCQURULEtBQUs7Z0JBV0YsTUFBTTtzQkFEVCxLQUFLO2dCQU9GLE1BQU07c0JBRFQsS0FBSztnQkFPRixhQUFhO3NCQURoQixLQUFLO2dCQU9HLGVBQWU7c0JBRHZCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmRWNoYXJ0c0luaXRFdmVudCwgRWNoYXJ0c01vZHVsZX0gZnJvbSAnQGFqZi9jb3JlL2VjaGFydHMnO1xuaW1wb3J0IHtCb29sZWFuSW5wdXQsIGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eX0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgT3V0cHV0LFxuICBTaW1wbGVDaGFuZ2VzLFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0ZlYXR1cmUsIEZlYXR1cmVDb2xsZWN0aW9uLCBHZW9tZXRyeX0gZnJvbSAnZ2VvanNvbic7XG5cbmxldCBoZWF0TWFwSWR4ID0gMDtcblxuZXhwb3J0IHR5cGUgQWpmSGVhdE1hcEZlYXR1cmUgPSBGZWF0dXJlPEdlb21ldHJ5LCB7W25hbWU6IHN0cmluZ106IGFueX0+O1xuZXhwb3J0IHR5cGUgQWpmSGVhdE1hcEZlYXR1cmVDb2xsZWN0aW9uID0gRmVhdHVyZUNvbGxlY3Rpb248R2VvbWV0cnksIHtbbmFtZTogc3RyaW5nXTogYW55fT47XG5cbmV4cG9ydCBpbnRlcmZhY2UgQWpmSGVhdE1hcEZlYXR1cmVTZWxlY3RlZCB7XG4gIGZlYXR1cmU6IEFqZkhlYXRNYXBGZWF0dXJlO1xufVxuXG5pbnRlcmZhY2UgU2VsZWN0Q2hhbmdlZCB7XG4gIHNlbGVjdGVkOiB7XG4gICAgZGF0YUluZGV4OiBudW1iZXJbXTtcbiAgICBzZXJpZXNJbmRleDogbnVtYmVyO1xuICB9W107XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FqZi1oZWF0LW1hcCcsXG4gIHRlbXBsYXRlVXJsOiAnaGVhdC1tYXAuaHRtbCcsXG4gIHN0eWxlVXJsczogWydoZWF0LW1hcC5zY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxufSlcbmV4cG9ydCBjbGFzcyBBamZIZWF0TWFwIGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuICBASW5wdXQoKVxuICBzZXQgZmVhdHVyZXMoZmVhdHVyZXM6IEFqZkhlYXRNYXBGZWF0dXJlQ29sbGVjdGlvbiB8IHVuZGVmaW5lZCkge1xuICAgIHRoaXMuX2ZlYXR1cmVzID0gZmVhdHVyZXM7XG4gIH1cbiAgcHJpdmF0ZSBfZmVhdHVyZXM/OiBBamZIZWF0TWFwRmVhdHVyZUNvbGxlY3Rpb247XG5cbiAgQElucHV0KClcbiAgc2V0IHN0YXJ0Q29sb3Ioc3RhcnRDb2xvcjogc3RyaW5nKSB7XG4gICAgdGhpcy5fc3RhcnRDb2xvciA9IHN0YXJ0Q29sb3I7XG4gIH1cbiAgcHJpdmF0ZSBfc3RhcnRDb2xvciA9ICcjZmZlYjNiJztcblxuICBASW5wdXQoKVxuICBzZXQgZW5kQ29sb3IoZW5kQ29sb3I6IHN0cmluZykge1xuICAgIHRoaXMuX2VuZENvbG9yID0gZW5kQ29sb3I7XG4gIH1cbiAgcHJpdmF0ZSBfZW5kQ29sb3IgPSAnI2Y0NDMzNic7XG5cbiAgQElucHV0KClcbiAgc2V0IGhpZ2hsaWdodENvbG9yKGhpZ2hsaWdodENvbG9yOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9oaWdobGlnaHRDb2xvciA9IGhpZ2hsaWdodENvbG9yO1xuICB9XG4gIHByaXZhdGUgX2hpZ2hsaWdodENvbG9yID0gJyMwMDk2ODgnO1xuXG4gIEBJbnB1dCgpXG4gIHNldCB2YWx1ZXModmFsdWVzOiBzdHJpbmcgfCBudW1iZXJbXSkge1xuICAgIHRoaXMuX3ZhbHVlcyA9IHZhbHVlcztcbiAgfVxuICBwcml2YXRlIF92YWx1ZXM6IHN0cmluZyB8IG51bWJlcltdID0gJ3Byb3BlcnRpZXMudmFsdWUnO1xuXG4gIC8qKlxuICAgKiBUaGUgY29kbyB0byBleGVjdXRlIHdoZW4gYW4gZWxlbWVudCBpcyBzZWxlY3RlZCBvbiBoZWF0bWFwLlxuICAgKiBJdCBpcyBpbnNlcnRlZCBpbnRvIGEgZnVuY3Rpb24sIHdoaWNoIHJlY2VpdmVzIHRoZSBzZWxlY3RlZCBvYmplY3QgYXMgaW5wdXRcbiAgICovXG4gIEBJbnB1dCgpXG4gIHNldCBhY3Rpb24oYWN0aW9uOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9hY3Rpb24gPSBhY3Rpb247XG4gIH1cbiAgcHJpdmF0ZSBfYWN0aW9uOiBzdHJpbmcgPSAnJztcblxuICBASW5wdXQoKVxuICBzZXQgaWRQcm9wKGlkUHJvcDogc3RyaW5nKSB7XG4gICAgdGhpcy5faWRQcm9wID0gaWRQcm9wO1xuICB9XG4gIHByaXZhdGUgX2lkUHJvcCA9ICdpZCc7XG5cbiAgQElucHV0KClcbiAgc2V0IHNob3dWaXN1YWxNYXAoc2hvd1Zpc3VhbE1hcDogQm9vbGVhbklucHV0KSB7XG4gICAgdGhpcy5fc2hvd1Zpc3VhbE1hcCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eShzaG93VmlzdWFsTWFwKTtcbiAgfVxuICBwcml2YXRlIF9zaG93VmlzdWFsTWFwID0gZmFsc2U7XG5cbiAgQE91dHB1dCgpXG4gIHJlYWRvbmx5IGZlYXR1cmVTZWxlY3RlZCA9IG5ldyBFdmVudEVtaXR0ZXI8QWpmSGVhdE1hcEZlYXR1cmVTZWxlY3RlZD4oKTtcblxuICBnZXQgY2hhcnRPcHRpb25zKCk6IGVjaGFydHMuRUNoYXJ0c09wdGlvbiB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuX2NoYXJ0T3B0aW9ucztcbiAgfVxuICBwcml2YXRlIF9jaGFydE9wdGlvbnM/OiBlY2hhcnRzLkVDaGFydHNPcHRpb247XG4gIHByaXZhdGUgX25hbWUgPSBgYWpmX2hlYXRtYXBfJHtoZWF0TWFwSWR4Kyt9YDtcbiAgcHJpdmF0ZSBfZWNoYXJ0cz86IEVjaGFydHNNb2R1bGU7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfY2RyOiBDaGFuZ2VEZXRlY3RvclJlZikge31cblxuICBuZ09uQ2hhbmdlcyhfOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgdGhpcy5fdXBkYXRlQ2hhcnRPcHRpb25zKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmZlYXR1cmVTZWxlY3RlZC5jb21wbGV0ZSgpO1xuICB9XG5cbiAgb25DaGFydEluaXQoZXZlbnQ6IEFqZkVjaGFydHNJbml0RXZlbnQpOiB2b2lkIHtcbiAgICBjb25zdCB7ZWNoYXJ0cywgY2hhcnR9ID0gZXZlbnQ7XG4gICAgdGhpcy5fZWNoYXJ0cyA9IGVjaGFydHM7XG4gICAgY2hhcnQub24oJ3NlbGVjdGNoYW5nZWQnLCBwYXJhbXMgPT4ge1xuICAgICAgaWYgKHRoaXMuX2ZlYXR1cmVzID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3Qge3NlbGVjdGVkfSA9IHBhcmFtcyBhcyBTZWxlY3RDaGFuZ2VkO1xuICAgICAgaWYgKHNlbGVjdGVkID09IG51bGwgfHwgc2VsZWN0ZWQubGVuZ3RoICE9PSAxKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHtkYXRhSW5kZXgsIHNlcmllc0luZGV4fSA9IHNlbGVjdGVkWzBdO1xuICAgICAgaWYgKHNlcmllc0luZGV4ICE9PSAwIHx8IGRhdGFJbmRleC5sZW5ndGggIT09IDEpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3QgaWR4ID0gZGF0YUluZGV4WzBdO1xuICAgICAgaWYgKGlkeCA8IDAgfHwgaWR4ID49IHRoaXMuX2ZlYXR1cmVzLmZlYXR1cmVzLmxlbmd0aCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCBmZWF0dXJlID0gdGhpcy5fZmVhdHVyZXMuZmVhdHVyZXNbaWR4XTtcbiAgICAgIHRoaXMuZmVhdHVyZVNlbGVjdGVkLmVtaXQoe2ZlYXR1cmV9KTtcbiAgICAgIGlmICh0aGlzLl9hY3Rpb24gJiYgdGhpcy5fYWN0aW9uLmxlbmd0aCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbnN0IGFjdGlvbkZ1bmN0aW9uID0gbmV3IEZ1bmN0aW9uKCd2JywgdGhpcy5fYWN0aW9uKTtcbiAgICAgICAgICBhY3Rpb25GdW5jdGlvbih7ZmVhdHVyZX0pO1xuICAgICAgICB9IGNhdGNoIChlKSB7fVxuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuX3VwZGF0ZUNoYXJ0T3B0aW9ucygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlQ2hhcnRPcHRpb25zKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9lY2hhcnRzID09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMuX2ZlYXR1cmVzID09IG51bGwpIHtcbiAgICAgIHRoaXMuX2NoYXJ0T3B0aW9ucyA9IHVuZGVmaW5lZDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fZWNoYXJ0cy5yZWdpc3Rlck1hcCh0aGlzLl9uYW1lLCB0aGlzLl9mZWF0dXJlcyBhcyBhbnkpO1xuICAgICAgdGhpcy5fY2hhcnRPcHRpb25zID0ge1xuICAgICAgICBnZW86IHtcbiAgICAgICAgICBtYXA6IHRoaXMuX25hbWUsXG4gICAgICAgICAgaXRlbVN0eWxlOiB7XG4gICAgICAgICAgICBvcGFjaXR5OiAwLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgbmFtZVByb3BlcnR5OiB0aGlzLl9pZFByb3AsXG4gICAgICAgIH0sXG4gICAgICAgIHZpc3VhbE1hcDoge1xuICAgICAgICAgIGNhbGN1bGFibGU6IGZhbHNlLFxuICAgICAgICAgIHJlYWx0aW1lOiBmYWxzZSxcbiAgICAgICAgICBpblJhbmdlOiB7XG4gICAgICAgICAgICBjb2xvcjogW3RoaXMuX3N0YXJ0Q29sb3IsIHRoaXMuX2VuZENvbG9yXSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHNob3dMYWJlbDogZmFsc2UsXG4gICAgICAgICAgc2hvdzogdGhpcy5fc2hvd1Zpc3VhbE1hcCxcbiAgICAgICAgfSxcbiAgICAgICAgc2VyaWVzOiB0aGlzLl9nZXRDaGFydFNlcmllcygpLFxuICAgICAgfTtcbiAgICB9XG4gICAgdGhpcy5fY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2dldENoYXJ0U2VyaWVzKCk6IGVjaGFydHMuTWFwU2VyaWVzT3B0aW9uW10ge1xuICAgIGNvbnN0IGRhdGEgPSB0aGlzLl9nZXRGZWF0dXJlc0RhdGEoKTtcbiAgICBpZiAoZGF0YS5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gICAgcmV0dXJuIFtcbiAgICAgIHtcbiAgICAgICAgdHlwZTogJ21hcCcsXG4gICAgICAgIG1hcDogdGhpcy5fbmFtZSxcbiAgICAgICAgbmFtZVByb3BlcnR5OiB0aGlzLl9pZFByb3AsXG4gICAgICAgIGVtcGhhc2lzOiB7XG4gICAgICAgICAgaXRlbVN0eWxlOiB7XG4gICAgICAgICAgICBhcmVhQ29sb3I6IHRoaXMuX2hpZ2hsaWdodENvbG9yLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgbGFiZWw6IHtcbiAgICAgICAgICAgIHNob3c6IGZhbHNlLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIHNlbGVjdDoge1xuICAgICAgICAgIGl0ZW1TdHlsZToge1xuICAgICAgICAgICAgY29sb3I6IHRoaXMuX2hpZ2hsaWdodENvbG9yLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgbGFiZWw6IHtcbiAgICAgICAgICAgIHNob3c6IGZhbHNlLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIHNlbGVjdGVkTW9kZTogJ3NpbmdsZScsXG4gICAgICAgIGRhdGEsXG4gICAgICB9LFxuICAgIF07XG4gIH1cblxuICBwcml2YXRlIF9nZXRGZWF0dXJlc0RhdGEoKToge25hbWU6IHN0cmluZzsgdmFsdWU6IG51bWJlcn1bXSB7XG4gICAgaWYgKHRoaXMuX2ZlYXR1cmVzID09IG51bGwpIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gICAgY29uc3Qge2ZlYXR1cmVzfSA9IHRoaXMuX2ZlYXR1cmVzO1xuICAgIGNvbnN0IHZhbHVlcyA9IHRoaXMuX3ZhbHVlcztcbiAgICBpZiAodHlwZW9mIHZhbHVlcyA9PT0gJ3N0cmluZycpIHtcbiAgICB9IGVsc2UgaWYgKHZhbHVlcy5sZW5ndGggPT09IGZlYXR1cmVzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIGZlYXR1cmVzLm1hcCgoZmVhdHVyZSwgaWR4KSA9PiB7XG4gICAgICAgIGNvbnN0IGlkUHJvcCA9IGZlYXR1cmUucHJvcGVydGllc1t0aGlzLl9pZFByb3BdIGFzIHN0cmluZztcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBuYW1lOiBpZFByb3AsXG4gICAgICAgICAgdmFsdWU6IHZhbHVlc1tpZHhdLFxuICAgICAgICB9IGFzIGFueTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gW107XG4gIH1cbn1cbiIsIjxkaXYgYWpmRWNoYXJ0cyAoY2hhcnRJbml0KT1cIm9uQ2hhcnRJbml0KCRldmVudClcIiBbb3B0aW9uc109XCJjaGFydE9wdGlvbnNcIj48L2Rpdj5cbiJdfQ==