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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvbWFwL21hcC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL21hcC9tYXAuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBRUwsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxLQUFLLEVBRUwsU0FBUyxFQUNULGlCQUFpQixHQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEtBQUssT0FBTyxNQUFNLFNBQVMsQ0FBQztBQUduQyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBRWxDLE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLDJCQUEyQixDQUFDOzs7QUFFbkUsTUFBTSxFQUFDLEdBQUcsRUFBRSxTQUFTLEVBQUMsR0FBRyxDQUFFLE9BQWUsQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFtQixDQUFDO0FBU2pGLE1BQU0sT0FBTyxlQUFlO0lBUDVCO1FBMkNVLHdCQUFtQixHQUFpQixZQUFZLENBQUMsS0FBSyxDQUFDO0tBc0VoRTtJQXRHQyxJQUNJLFVBQVUsQ0FBQyxVQUFvQjtRQUNqQyxJQUFJLENBQUMsV0FBVyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFHRCxJQUNJLFNBQVMsQ0FBQyxFQUFVO1FBQ3RCLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFHRCxJQUNJLFdBQVcsQ0FBQyxXQUFtQjtRQUNqQyxJQUFJLENBQUMsWUFBWSxHQUFHLFdBQVcsQ0FBQztRQUNoQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lB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cEMsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDcEMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDNUIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDN0IsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtnQkFDakIsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUM7YUFDekI7U0FDRjtJQUNILENBQUM7O29IQXpHVSxlQUFlO3dHQUFmLGVBQWUsNk1BQ2Ysd0JBQXdCLDhEQ2hEckMsNEJBQ0E7bUdEOENhLGVBQWU7a0JBUDNCLFNBQVM7K0JBQ0UsU0FBUyxtQkFHRix1QkFBdUIsQ0FBQyxNQUFNLGlCQUNoQyxpQkFBaUIsQ0FBQyxJQUFJOzhCQUdnQixZQUFZO3NCQUFoRSxTQUFTO3VCQUFDLHdCQUF3QixFQUFFLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBQztnQkFJL0MsVUFBVTtzQkFEYixLQUFLO2dCQVFGLFNBQVM7c0JBRFosS0FBSztnQkFRRixXQUFXO3NCQURkLEtBQUs7Z0JBUUYsUUFBUTtzQkFEWCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIGxlYWZsZXQgZnJvbSAnbGVhZmxldCc7XG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tZHVwbGljYXRlLWltcG9ydHNcbmltcG9ydCB7TWFwfSBmcm9tICdsZWFmbGV0JztcbmltcG9ydCB7U3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHtBamZNYXBDb250YWluZXJEaXJlY3RpdmV9IGZyb20gJy4vbWFwLWNvbnRhaW5lci1kaXJlY3RpdmUnO1xuXG5jb25zdCB7bWFwLCB0aWxlTGF5ZXJ9ID0gKChsZWFmbGV0IGFzIGFueSkuZGVmYXVsdCB8fCBsZWFmbGV0KSBhcyB0eXBlb2YgbGVhZmxldDtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWpmLW1hcCcsXG4gIHRlbXBsYXRlVXJsOiAnbWFwLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnbWFwLmNzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbn0pXG5leHBvcnQgY2xhc3MgQWpmTWFwQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcbiAgQFZpZXdDaGlsZChBamZNYXBDb250YWluZXJEaXJlY3RpdmUsIHtzdGF0aWM6IHRydWV9KSBtYXBDb250YWluZXI6IEFqZk1hcENvbnRhaW5lckRpcmVjdGl2ZTtcblxuICBwcml2YXRlIF9jb29yZGluYXRlOiBudW1iZXJbXTtcbiAgQElucHV0KClcbiAgc2V0IGNvb3JkaW5hdGUoY29vcmRpbmF0ZTogbnVtYmVyW10pIHtcbiAgICB0aGlzLl9jb29yZGluYXRlID0gY29vcmRpbmF0ZS5zbGljZSgwKTtcbiAgICB0aGlzLl9zZXRNYXBWaWV3KCk7XG4gIH1cblxuICBwcml2YXRlIF90aWxlTGF5ZXI6IHN0cmluZztcbiAgQElucHV0KClcbiAgc2V0IHRpbGVMYXllcih0bDogc3RyaW5nKSB7XG4gICAgdGhpcy5fdGlsZUxheWVyID0gdGw7XG4gICAgdGhpcy5fYWRkVGlsZUxheWVyVG9NYXAoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2F0dHJpYnV0aW9uOiBzdHJpbmc7XG4gIEBJbnB1dCgpXG4gIHNldCBhdHRyaWJ1dGlvbihhdHRyaWJ1dGlvbjogc3RyaW5nKSB7XG4gICAgdGhpcy5fYXR0cmlidXRpb24gPSBhdHRyaWJ1dGlvbjtcbiAgICB0aGlzLl9hZGRUaWxlTGF5ZXJUb01hcCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZGlzYWJsZWQ6IGJvb2xlYW47XG4gIEBJbnB1dCgpXG4gIHNldCBkaXNhYmxlZChkaXNhYmxlZDogYm9vbGVhbikge1xuICAgIHRoaXMuX2Rpc2FibGVkID0gZGlzYWJsZWQ7XG4gICAgdGhpcy5fZGlzYWJsZU1hcCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfbWFwOiBNYXA7XG4gIGdldCBtYXAoKTogTWFwIHtcbiAgICByZXR1cm4gdGhpcy5fbWFwO1xuICB9XG5cbiAgcHJpdmF0ZSBfY29sdW1uV2lkdGhDaGFuZ2VkOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm1hcENvbnRhaW5lcikge1xuICAgICAgdGhpcy5faW5pdE1hcCgpO1xuICAgICAgdGhpcy5fc2V0TWFwVmlldygpO1xuICAgICAgdGhpcy5fYWRkVGlsZUxheWVyVG9NYXAoKTtcbiAgICAgIHRoaXMuX2Rpc2FibGVNYXAoKTtcbiAgICB9XG4gIH1cblxuICByZWRyYXcoKSB7XG4gICAgaWYgKHRoaXMubWFwQ29udGFpbmVyICYmIHRoaXMuX21hcCkge1xuICAgICAgdGhpcy5fbWFwLmludmFsaWRhdGVTaXplKCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5fY29sdW1uV2lkdGhDaGFuZ2VkLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0TWFwKCk6IHZvaWQge1xuICAgIGNvbnN0IG9wdGlvbnMgPSB7em9vbUNvbnRyb2w6IGZhbHNlLCBhdHRyaWJ1dGlvbkNvbnRyb2w6IGZhbHNlfTtcblxuICAgIHRoaXMuX21hcCA9IG1hcCh0aGlzLm1hcENvbnRhaW5lci5odG1sRWxlbWVudCwgb3B0aW9ucyk7XG4gIH1cblxuICBwcml2YXRlIF9zZXRNYXBWaWV3KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9tYXAgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCB4LCB5LCB6O1xuICAgIGlmICh0aGlzLl9jb29yZGluYXRlICE9IG51bGwgJiYgdGhpcy5fY29vcmRpbmF0ZS5sZW5ndGggPT09IDMpIHtcbiAgICAgIHggPSB0aGlzLl9jb29yZGluYXRlWzBdO1xuICAgICAgeSA9IHRoaXMuX2Nvb3JkaW5hdGVbMV07XG4gICAgICB6ID0gdGhpcy5fY29vcmRpbmF0ZVsyXTtcbiAgICB9IGVsc2Uge1xuICAgICAgeCA9IDA7XG4gICAgICB5ID0gMDtcbiAgICAgIHogPSAxNDtcbiAgICB9XG4gICAgdGhpcy5fbWFwLnNldFZpZXcoW3gsIHldLCB6KTtcbiAgfVxuXG4gIHByaXZhdGUgX2FkZFRpbGVMYXllclRvTWFwKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9tYXAgPT0gbnVsbCB8fCB0aGlzLl90aWxlTGF5ZXIgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9tYXAuZWFjaExheWVyKGwgPT4gdGhpcy5fbWFwLnJlbW92ZUxheWVyKGwpKTtcbiAgICB0aWxlTGF5ZXIodGhpcy5fdGlsZUxheWVyLCB7YXR0cmlidXRpb246IHRoaXMuX2F0dHJpYnV0aW9ufSkuYWRkVG8odGhpcy5fbWFwKTtcbiAgfVxuXG4gIHByaXZhdGUgX2Rpc2FibGVNYXAoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX21hcCA9PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2Rpc2FibGVkKSB7XG4gICAgICB0aGlzLl9tYXAuZHJhZ2dpbmcuZGlzYWJsZSgpO1xuICAgICAgdGhpcy5fbWFwLnRvdWNoWm9vbS5kaXNhYmxlKCk7XG4gICAgICB0aGlzLl9tYXAuZG91YmxlQ2xpY2tab29tLmRpc2FibGUoKTtcbiAgICAgIHRoaXMuX21hcC5zY3JvbGxXaGVlbFpvb20uZGlzYWJsZSgpO1xuICAgICAgdGhpcy5fbWFwLmJveFpvb20uZGlzYWJsZSgpO1xuICAgICAgdGhpcy5fbWFwLmtleWJvYXJkLmRpc2FibGUoKTtcbiAgICAgIGlmICh0aGlzLl9tYXAudGFwKSB7XG4gICAgICAgIHRoaXMuX21hcC50YXAuZGlzYWJsZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiPGRpdiBtYXBDb250YWluZXI+PC9kaXY+XG4iXX0=