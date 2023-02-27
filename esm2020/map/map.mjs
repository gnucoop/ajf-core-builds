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
import { ChangeDetectionStrategy, Component, Input, ViewChild, ViewEncapsulation, } from '@angular/core';
import * as leaflet from 'leaflet';
import { Subscription } from 'rxjs';
import { AjfMapContainerDirective } from './map-container-directive';
import * as i0 from "@angular/core";
import * as i1 from "./map-container-directive";
const { map, tileLayer } = (leaflet.default || leaflet);
export class AjfMapComponent {
    constructor() {
        this._coordinate = [];
        this._attribution = '';
        this._disabled = false;
        this._columnWidthChanged = Subscription.EMPTY;
    }
    set coordinate(coordinate) {
        this._coordinate = coordinate.slice(0);
        this._setMapView();
    }
    set tileLayer(tl) {
        this._tileLayer = tl;
        this._addTileLayerToMap();
    }
    set attribution(attribution) {
        this._attribution = attribution;
        this._addTileLayerToMap();
    }
    set disabled(disabled) {
        this._disabled = disabled;
        this._disableMap();
    }
    get map() {
        return this._map;
    }
    ngAfterViewInit() {
        if (this.mapContainer) {
            this._initMap();
            this._setMapView();
            this._addTileLayerToMap();
            this._disableMap();
        }
    }
    redraw() {
        if (this.mapContainer && this._map) {
            this._map.invalidateSize();
        }
    }
    ngOnDestroy() {
        this._columnWidthChanged.unsubscribe();
    }
    _initMap() {
        const options = { zoomControl: false, attributionControl: false };
        this._map = map(this.mapContainer.htmlElement, options);
    }
    _setMapView() {
        if (this._map == null) {
            return;
        }
        let x, y, z;
        if (this._coordinate != null && this._coordinate.length === 3) {
            x = this._coordinate[0];
            y = this._coordinate[1];
            z = this._coordinate[2];
        }
        else {
            x = 0;
            y = 0;
            z = 14;
        }
        this._map.setView([x, y], z);
    }
    _addTileLayerToMap() {
        if (this._map == null || this._tileLayer == null) {
            return;
        }
        const map = this._map;
        map.eachLayer(l => map.removeLayer(l));
        tileLayer(this._tileLayer, { attribution: this._attribution }).addTo(map);
    }
    _disableMap() {
        if (this._map == null) {
            return;
        }
        if (this._disabled) {
            this._map.dragging.disable();
            this._map.touchZoom.disable();
            this._map.doubleClickZoom.disable();
            this._map.scrollWheelZoom.disable();
            this._map.boxZoom.disable();
            this._map.keyboard.disable();
            if (this._map.tap) {
                this._map.tap.disable();
            }
        }
    }
}
AjfMapComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfMapComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
AjfMapComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.4", type: AjfMapComponent, selector: "ajf-map", inputs: { coordinate: "coordinate", tileLayer: "tileLayer", attribution: "attribution", disabled: "disabled" }, viewQueries: [{ propertyName: "mapContainer", first: true, predicate: AjfMapContainerDirective, descendants: true, static: true }], ngImport: i0, template: "<div mapContainer></div>\n", styles: ["ajf-map{display:block;position:relative;width:100%;min-height:200px}ajf-map [mapContainer]{position:absolute;min-width:100px;width:100%;height:100%}\n"], dependencies: [{ kind: "directive", type: i1.AjfMapContainerDirective, selector: "[mapContainer]" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfMapComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ajf-map', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<div mapContainer></div>\n", styles: ["ajf-map{display:block;position:relative;width:100%;min-height:200px}ajf-map [mapContainer]{position:absolute;min-width:100px;width:100%;height:100%}\n"] }]
        }], propDecorators: { mapContainer: [{
                type: ViewChild,
                args: [AjfMapContainerDirective, { static: true }]
            }], coordinate: [{
                type: Input
            }], tileLayer: [{
                type: Input
            }], attribution: [{
                type: Input
            }], disabled: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9tYXAvc3JjL21hcC50cyIsIi4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvbWFwL3NyYy9tYXAuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBRUwsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxLQUFLLEVBRUwsU0FBUyxFQUNULGlCQUFpQixHQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEtBQUssT0FBTyxNQUFNLFNBQVMsQ0FBQztBQUduQyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBRWxDLE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLDJCQUEyQixDQUFDOzs7QUFFbkUsTUFBTSxFQUFDLEdBQUcsRUFBRSxTQUFTLEVBQUMsR0FBRyxDQUFFLE9BQWUsQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFtQixDQUFDO0FBU2pGLE1BQU0sT0FBTyxlQUFlO0lBUDVCO1FBV1UsZ0JBQVcsR0FBYSxFQUFFLENBQUM7UUFjM0IsaUJBQVksR0FBVyxFQUFFLENBQUM7UUFPMUIsY0FBUyxHQUFZLEtBQUssQ0FBQztRQVkzQix3QkFBbUIsR0FBaUIsWUFBWSxDQUFDLEtBQUssQ0FBQztLQXVFaEU7SUF2R0MsSUFDSSxVQUFVLENBQUMsVUFBb0I7UUFDakMsSUFBSSxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBR0QsSUFDSSxTQUFTLENBQUMsRUFBc0I7UUFDbEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUdELElBQ0ksV0FBVyxDQUFDLFdB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QUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQzlCLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ3BDLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ3BDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQzVCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQzdCLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7Z0JBQ2pCLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO2FBQ3pCO1NBQ0Y7SUFDSCxDQUFDOzs0R0EzR1UsZUFBZTtnR0FBZixlQUFlLDZNQUNmLHdCQUF3Qiw4RENoRHJDLDRCQUNBOzJGRDhDYSxlQUFlO2tCQVAzQixTQUFTOytCQUNFLFNBQVMsbUJBR0YsdUJBQXVCLENBQUMsTUFBTSxpQkFDaEMsaUJBQWlCLENBQUMsSUFBSTs4QkFJckMsWUFBWTtzQkFEWCxTQUFTO3VCQUFDLHdCQUF3QixFQUFFLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBQztnQkFLL0MsVUFBVTtzQkFEYixLQUFLO2dCQVFGLFNBQVM7c0JBRFosS0FBSztnQkFRRixXQUFXO3NCQURkLEtBQUs7Z0JBUUYsUUFBUTtzQkFEWCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIGxlYWZsZXQgZnJvbSAnbGVhZmxldCc7XG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tZHVwbGljYXRlLWltcG9ydHNcbmltcG9ydCB7TWFwfSBmcm9tICdsZWFmbGV0JztcbmltcG9ydCB7U3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHtBamZNYXBDb250YWluZXJEaXJlY3RpdmV9IGZyb20gJy4vbWFwLWNvbnRhaW5lci1kaXJlY3RpdmUnO1xuXG5jb25zdCB7bWFwLCB0aWxlTGF5ZXJ9ID0gKChsZWFmbGV0IGFzIGFueSkuZGVmYXVsdCB8fCBsZWFmbGV0KSBhcyB0eXBlb2YgbGVhZmxldDtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWpmLW1hcCcsXG4gIHRlbXBsYXRlVXJsOiAnbWFwLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnbWFwLnNjc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG59KVxuZXhwb3J0IGNsYXNzIEFqZk1hcENvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG4gIEBWaWV3Q2hpbGQoQWpmTWFwQ29udGFpbmVyRGlyZWN0aXZlLCB7c3RhdGljOiB0cnVlfSlcbiAgbWFwQ29udGFpbmVyITogQWpmTWFwQ29udGFpbmVyRGlyZWN0aXZlO1xuXG4gIHByaXZhdGUgX2Nvb3JkaW5hdGU6IG51bWJlcltdID0gW107XG4gIEBJbnB1dCgpXG4gIHNldCBjb29yZGluYXRlKGNvb3JkaW5hdGU6IG51bWJlcltdKSB7XG4gICAgdGhpcy5fY29vcmRpbmF0ZSA9IGNvb3JkaW5hdGUuc2xpY2UoMCk7XG4gICAgdGhpcy5fc2V0TWFwVmlldygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfdGlsZUxheWVyOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gIEBJbnB1dCgpXG4gIHNldCB0aWxlTGF5ZXIodGw6IHN0cmluZyB8IHVuZGVmaW5lZCkge1xuICAgIHRoaXMuX3RpbGVMYXllciA9IHRsO1xuICAgIHRoaXMuX2FkZFRpbGVMYXllclRvTWFwKCk7XG4gIH1cblxuICBwcml2YXRlIF9hdHRyaWJ1dGlvbjogc3RyaW5nID0gJyc7XG4gIEBJbnB1dCgpXG4gIHNldCBhdHRyaWJ1dGlvbihhdHRyaWJ1dGlvbjogc3RyaW5nKSB7XG4gICAgdGhpcy5fYXR0cmlidXRpb24gPSBhdHRyaWJ1dGlvbjtcbiAgICB0aGlzLl9hZGRUaWxlTGF5ZXJUb01hcCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KClcbiAgc2V0IGRpc2FibGVkKGRpc2FibGVkOiBib29sZWFuKSB7XG4gICAgdGhpcy5fZGlzYWJsZWQgPSBkaXNhYmxlZDtcbiAgICB0aGlzLl9kaXNhYmxlTWFwKCk7XG4gIH1cblxuICBwcml2YXRlIF9tYXA6IE1hcCB8IHVuZGVmaW5lZDtcbiAgZ2V0IG1hcCgpOiBNYXAgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLl9tYXA7XG4gIH1cblxuICBwcml2YXRlIF9jb2x1bW5XaWR0aENoYW5nZWQ6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubWFwQ29udGFpbmVyKSB7XG4gICAgICB0aGlzLl9pbml0TWFwKCk7XG4gICAgICB0aGlzLl9zZXRNYXBWaWV3KCk7XG4gICAgICB0aGlzLl9hZGRUaWxlTGF5ZXJUb01hcCgpO1xuICAgICAgdGhpcy5fZGlzYWJsZU1hcCgpO1xuICAgIH1cbiAgfVxuXG4gIHJlZHJhdygpIHtcbiAgICBpZiAodGhpcy5tYXBDb250YWluZXIgJiYgdGhpcy5fbWFwKSB7XG4gICAgICB0aGlzLl9tYXAuaW52YWxpZGF0ZVNpemUoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9jb2x1bW5XaWR0aENoYW5nZWQudW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRNYXAoKTogdm9pZCB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHt6b29tQ29udHJvbDogZmFsc2UsIGF0dHJpYnV0aW9uQ29udHJvbDogZmFsc2V9O1xuXG4gICAgdGhpcy5fbWFwID0gbWFwKHRoaXMubWFwQ29udGFpbmVyLmh0bWxFbGVtZW50LCBvcHRpb25zKTtcbiAgfVxuXG4gIHByaXZhdGUgX3NldE1hcFZpZXcoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX21hcCA9PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IHgsIHksIHo7XG4gICAgaWYgKHRoaXMuX2Nvb3JkaW5hdGUgIT0gbnVsbCAmJiB0aGlzLl9jb29yZGluYXRlLmxlbmd0aCA9PT0gMykge1xuICAgICAgeCA9IHRoaXMuX2Nvb3JkaW5hdGVbMF07XG4gICAgICB5ID0gdGhpcy5fY29vcmRpbmF0ZVsxXTtcbiAgICAgIHogPSB0aGlzLl9jb29yZGluYXRlWzJdO1xuICAgIH0gZWxzZSB7XG4gICAgICB4ID0gMDtcbiAgICAgIHkgPSAwO1xuICAgICAgeiA9IDE0O1xuICAgIH1cbiAgICB0aGlzLl9tYXAuc2V0VmlldyhbeCwgeV0sIHopO1xuICB9XG5cbiAgcHJpdmF0ZSBfYWRkVGlsZUxheWVyVG9NYXAoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX21hcCA9PSBudWxsIHx8IHRoaXMuX3RpbGVMYXllciA9PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IG1hcCA9IHRoaXMuX21hcDtcbiAgICBtYXAuZWFjaExheWVyKGwgPT4gbWFwLnJlbW92ZUxheWVyKGwpKTtcbiAgICB0aWxlTGF5ZXIodGhpcy5fdGlsZUxheWVyLCB7YXR0cmlidXRpb246IHRoaXMuX2F0dHJpYnV0aW9ufSkuYWRkVG8obWFwKTtcbiAgfVxuXG4gIHByaXZhdGUgX2Rpc2FibGVNYXAoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX21hcCA9PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2Rpc2FibGVkKSB7XG4gICAgICB0aGlzLl9tYXAuZHJhZ2dpbmcuZGlzYWJsZSgpO1xuICAgICAgdGhpcy5fbWFwLnRvdWNoWm9vbS5kaXNhYmxlKCk7XG4gICAgICB0aGlzLl9tYXAuZG91YmxlQ2xpY2tab29tLmRpc2FibGUoKTtcbiAgICAgIHRoaXMuX21hcC5zY3JvbGxXaGVlbFpvb20uZGlzYWJsZSgpO1xuICAgICAgdGhpcy5fbWFwLmJveFpvb20uZGlzYWJsZSgpO1xuICAgICAgdGhpcy5fbWFwLmtleWJvYXJkLmRpc2FibGUoKTtcbiAgICAgIGlmICh0aGlzLl9tYXAudGFwKSB7XG4gICAgICAgIHRoaXMuX21hcC50YXAuZGlzYWJsZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiPGRpdiBtYXBDb250YWluZXI+PC9kaXY+XG4iXX0=