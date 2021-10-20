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
import { map, tileLayer } from 'leaflet';
import { Subscription } from 'rxjs';
import { AjfMapContainerDirective } from './map-container-directive';
import * as i0 from "@angular/core";
import * as i1 from "./map-container-directive";
export class AjfMapComponent {
    constructor() {
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
        this._map.eachLayer(l => this._map.removeLayer(l));
        tileLayer(this._tileLayer, { attribution: this._attribution }).addTo(this._map);
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
AjfMapComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfMapComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
AjfMapComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.0-next.15", type: AjfMapComponent, selector: "ajf-map", inputs: { coordinate: "coordinate", tileLayer: "tileLayer", attribution: "attribution", disabled: "disabled" }, viewQueries: [{ propertyName: "mapContainer", first: true, predicate: AjfMapContainerDirective, descendants: true, static: true }], ngImport: i0, template: "<div mapContainer></div>\n", styles: ["ajf-map{display:block;position:relative;width:100%;min-height:200px}ajf-map [mapContainer]{position:absolute;min-width:100px;width:100%;height:100%}\n"], directives: [{ type: i1.AjfMapContainerDirective, selector: "[mapContainer]" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfMapComponent, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvbWFwL21hcC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL21hcC9tYXAuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBRUwsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxLQUFLLEVBRUwsU0FBUyxFQUNULGlCQUFpQixHQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsR0FBRyxFQUFPLFNBQVMsRUFBQyxNQUFNLFNBQVMsQ0FBQztBQUM1QyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBRWxDLE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLDJCQUEyQixDQUFDOzs7QUFTbkUsTUFBTSxPQUFPLGVBQWU7SUFQNUI7UUEyQ1Usd0JBQW1CLEdBQWlCLFlBQVksQ0FBQyxLQUFLLENBQUM7S0FzRWhFO0lBdEdDLElBQ0ksVUFBVSxDQUFDLFVBQW9CO1FBQ2pDLElBQUksQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2QyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUdELElBQ0ksU0FBUyxDQUFDLEVBQVU7UUFDdEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUdELElBQ0ksV0FBVyxDQUFDLFdBQW1CO1FBQ2pDLElBQUksQ0FBQyxZQUFZLEdBQUcsV0FBVyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFHRCxJQUNJLFFBQVEsQ0FBQyxRQUFpQjtRQUM1QixJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztRQUMxQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUdELElBQUksR0FBRztRQUNMLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztJQUNuQixDQUFDO0lBSUQsZUFBZTtRQUNiLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNyQixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDaEIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ25CLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1lBQzFCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUNwQjtJQUNILENBQUM7SUFFRCxNQUFNO1FBQ0osSUFBSSxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDbEMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztTQUM1QjtJQUNILENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3pDLENBQUM7SUFFTyxRQUFRO1FBQ2QsTUFBTSxPQUFPLEdBQUcsRUFBQyxXQUFXLEVBQUUsS0FBSyxFQUFFLGtCQUFrQixFQUFFLEtBQUssRUFBQyxDQUFDO1FBRWhFLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFFTyxXQUFXO1FBQ2pCLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLEVBQUU7WUFDckIsT0FBTztTQUNSO1FBRUQsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNaLElBQUksSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQzdELENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3pCO2FBQU07WUFDTCxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ04sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNOLENBQUMsR0FBRyxFQUFFLENBQUM7U0FDUjtRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFTyxrQkFBa0I7UUFDeEIsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksRUFBRTtZQUNoRCxPQUFPO1NBQ1I7UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbkQsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsRUFBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNoRixDQUFDO0lBRU8sV0FBVztRQUNqQixJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxFQUFFO1lBQ3JCLE9BQU87U0FDUjtRQUVELElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNsQixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUM3QixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUM5QixJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNwQyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNwQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUM1QixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUM3QixJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO2dCQUNqQixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQzthQUN6QjtTQUNGO0lBQ0gsQ0FBQzs7b0hBekdVLGVBQWU7d0dBQWYsZUFBZSw2TUFDZix3QkFBd0IsOERDNUNyQyw0QkFDQTttR0QwQ2EsZUFBZTtrQkFQM0IsU0FBUzsrQkFDRSxTQUFTLG1CQUdGLHVCQUF1QixDQUFDLE1BQU0saUJBQ2hDLGlCQUFpQixDQUFDLElBQUk7OEJBR2dCLFlBQVk7c0JBQWhFLFNBQVM7dUJBQUMsd0JBQXdCLEVBQUUsRUFBQyxNQUFNLEVBQUUsSUFBSSxFQUFDO2dCQUkvQyxVQUFVO3NCQURiLEtBQUs7Z0JBUUYsU0FBUztzQkFEWixLQUFLO2dCQVFGLFdBQVc7c0JBRGQsS0FBSztnQkFRRixRQUFRO3NCQURYLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIFZpZXdDaGlsZCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHttYXAsIE1hcCwgdGlsZUxheWVyfSBmcm9tICdsZWFmbGV0JztcbmltcG9ydCB7U3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHtBamZNYXBDb250YWluZXJEaXJlY3RpdmV9IGZyb20gJy4vbWFwLWNvbnRhaW5lci1kaXJlY3RpdmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhamYtbWFwJyxcbiAgdGVtcGxhdGVVcmw6ICdtYXAuaHRtbCcsXG4gIHN0eWxlVXJsczogWydtYXAuY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxufSlcbmV4cG9ydCBjbGFzcyBBamZNYXBDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuICBAVmlld0NoaWxkKEFqZk1hcENvbnRhaW5lckRpcmVjdGl2ZSwge3N0YXRpYzogdHJ1ZX0pIG1hcENvbnRhaW5lcjogQWpmTWFwQ29udGFpbmVyRGlyZWN0aXZlO1xuXG4gIHByaXZhdGUgX2Nvb3JkaW5hdGU6IG51bWJlcltdO1xuICBASW5wdXQoKVxuICBzZXQgY29vcmRpbmF0ZShjb29yZGluYXRlOiBudW1iZXJbXSkge1xuICAgIHRoaXMuX2Nvb3JkaW5hdGUgPSBjb29yZGluYXRlLnNsaWNlKDApO1xuICAgIHRoaXMuX3NldE1hcFZpZXcoKTtcbiAgfVxuXG4gIHByaXZhdGUgX3RpbGVMYXllcjogc3RyaW5nO1xuICBASW5wdXQoKVxuICBzZXQgdGlsZUxheWVyKHRsOiBzdHJpbmcpIHtcbiAgICB0aGlzLl90aWxlTGF5ZXIgPSB0bDtcbiAgICB0aGlzLl9hZGRUaWxlTGF5ZXJUb01hcCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfYXR0cmlidXRpb246IHN0cmluZztcbiAgQElucHV0KClcbiAgc2V0IGF0dHJpYnV0aW9uKGF0dHJpYnV0aW9uOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9hdHRyaWJ1dGlvbiA9IGF0dHJpYnV0aW9uO1xuICAgIHRoaXMuX2FkZFRpbGVMYXllclRvTWFwKCk7XG4gIH1cblxuICBwcml2YXRlIF9kaXNhYmxlZDogYm9vbGVhbjtcbiAgQElucHV0KClcbiAgc2V0IGRpc2FibGVkKGRpc2FibGVkOiBib29sZWFuKSB7XG4gICAgdGhpcy5fZGlzYWJsZWQgPSBkaXNhYmxlZDtcbiAgICB0aGlzLl9kaXNhYmxlTWFwKCk7XG4gIH1cblxuICBwcml2YXRlIF9tYXA6IE1hcDtcbiAgZ2V0IG1hcCgpOiBNYXAge1xuICAgIHJldHVybiB0aGlzLl9tYXA7XG4gIH1cblxuICBwcml2YXRlIF9jb2x1bW5XaWR0aENoYW5nZWQ6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubWFwQ29udGFpbmVyKSB7XG4gICAgICB0aGlzLl9pbml0TWFwKCk7XG4gICAgICB0aGlzLl9zZXRNYXBWaWV3KCk7XG4gICAgICB0aGlzLl9hZGRUaWxlTGF5ZXJUb01hcCgpO1xuICAgICAgdGhpcy5fZGlzYWJsZU1hcCgpO1xuICAgIH1cbiAgfVxuXG4gIHJlZHJhdygpIHtcbiAgICBpZiAodGhpcy5tYXBDb250YWluZXIgJiYgdGhpcy5fbWFwKSB7XG4gICAgICB0aGlzLl9tYXAuaW52YWxpZGF0ZVNpemUoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9jb2x1bW5XaWR0aENoYW5nZWQudW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRNYXAoKTogdm9pZCB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHt6b29tQ29udHJvbDogZmFsc2UsIGF0dHJpYnV0aW9uQ29udHJvbDogZmFsc2V9O1xuXG4gICAgdGhpcy5fbWFwID0gbWFwKHRoaXMubWFwQ29udGFpbmVyLmh0bWxFbGVtZW50LCBvcHRpb25zKTtcbiAgfVxuXG4gIHByaXZhdGUgX3NldE1hcFZpZXcoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX21hcCA9PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IHgsIHksIHo7XG4gICAgaWYgKHRoaXMuX2Nvb3JkaW5hdGUgIT0gbnVsbCAmJiB0aGlzLl9jb29yZGluYXRlLmxlbmd0aCA9PT0gMykge1xuICAgICAgeCA9IHRoaXMuX2Nvb3JkaW5hdGVbMF07XG4gICAgICB5ID0gdGhpcy5fY29vcmRpbmF0ZVsxXTtcbiAgICAgIHogPSB0aGlzLl9jb29yZGluYXRlWzJdO1xuICAgIH0gZWxzZSB7XG4gICAgICB4ID0gMDtcbiAgICAgIHkgPSAwO1xuICAgICAgeiA9IDE0O1xuICAgIH1cbiAgICB0aGlzLl9tYXAuc2V0VmlldyhbeCwgeV0sIHopO1xuICB9XG5cbiAgcHJpdmF0ZSBfYWRkVGlsZUxheWVyVG9NYXAoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX21hcCA9PSBudWxsIHx8IHRoaXMuX3RpbGVMYXllciA9PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX21hcC5lYWNoTGF5ZXIobCA9PiB0aGlzLl9tYXAucmVtb3ZlTGF5ZXIobCkpO1xuICAgIHRpbGVMYXllcih0aGlzLl90aWxlTGF5ZXIsIHthdHRyaWJ1dGlvbjogdGhpcy5fYXR0cmlidXRpb259KS5hZGRUbyh0aGlzLl9tYXApO1xuICB9XG5cbiAgcHJpdmF0ZSBfZGlzYWJsZU1hcCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fbWFwID09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fZGlzYWJsZWQpIHtcbiAgICAgIHRoaXMuX21hcC5kcmFnZ2luZy5kaXNhYmxlKCk7XG4gICAgICB0aGlzLl9tYXAudG91Y2hab29tLmRpc2FibGUoKTtcbiAgICAgIHRoaXMuX21hcC5kb3VibGVDbGlja1pvb20uZGlzYWJsZSgpO1xuICAgICAgdGhpcy5fbWFwLnNjcm9sbFdoZWVsWm9vbS5kaXNhYmxlKCk7XG4gICAgICB0aGlzLl9tYXAuYm94Wm9vbS5kaXNhYmxlKCk7XG4gICAgICB0aGlzLl9tYXAua2V5Ym9hcmQuZGlzYWJsZSgpO1xuICAgICAgaWYgKHRoaXMuX21hcC50YXApIHtcbiAgICAgICAgdGhpcy5fbWFwLnRhcC5kaXNhYmxlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCI8ZGl2IG1hcENvbnRhaW5lcj48L2Rpdj5cbiJdfQ==