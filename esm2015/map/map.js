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
import { __decorate, __metadata } from "tslib";
import { ChangeDetectionStrategy, Component, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import * as L from 'leaflet';
import { Subscription } from 'rxjs';
const leafletLib = L.default || L;
import { AjfMapContainerDirective } from './map-container-directive';
let AjfMapComponent = /** @class */ (() => {
    let AjfMapComponent = class AjfMapComponent {
        constructor() {
            this._columnWidthChanged = Subscription.EMPTY;
        }
        set coordinate(coordinate) {
            this._coordinate = coordinate.slice(0);
            this._setMapView();
        }
        set tileLayer(tileLayer) {
            this._tileLayer = tileLayer;
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
            this._map = leafletLib.map(this.mapContainer.htmlElement, options);
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
            this._map.eachLayer((l) => this._map.removeLayer(l));
            leafletLib.tileLayer(this._tileLayer, { attribution: this._attribution }).addTo(this._map);
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
    };
    __decorate([
        ViewChild(AjfMapContainerDirective, { static: true }),
        __metadata("design:type", AjfMapContainerDirective)
    ], AjfMapComponent.prototype, "mapContainer", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], AjfMapComponent.prototype, "coordinate", null);
    __decorate([
        Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], AjfMapComponent.prototype, "tileLayer", null);
    __decorate([
        Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], AjfMapComponent.prototype, "attribution", null);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], AjfMapComponent.prototype, "disabled", null);
    AjfMapComponent = __decorate([
        Component({
            selector: 'ajf-map',
            template: "<div mapContainer></div>\n",
            changeDetection: ChangeDetectionStrategy.OnPush,
            encapsulation: ViewEncapsulation.None,
            styles: ["ajf-map{display:block;position:relative;width:100%;min-height:200px}ajf-map [mapContainer]{position:absolute;min-width:100px;width:100%;height:100%}\n"]
        })
    ], AjfMapComponent);
    return AjfMapComponent;
})();
export { AjfMapComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvbWFwL21hcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7O0FBRUgsT0FBTyxFQUVMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsS0FBSyxFQUVMLFNBQVMsRUFDVCxpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxLQUFLLENBQUMsTUFBTSxTQUFTLENBQUM7QUFDN0IsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUVsQyxNQUFNLFVBQVUsR0FBSSxDQUFTLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQztBQUUzQyxPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQVNuRTtJQUFBLElBQWEsZUFBZSxHQUE1QixNQUFhLGVBQWU7UUFBNUI7WUFxQ1Usd0JBQW1CLEdBQWlCLFlBQVksQ0FBQyxLQUFLLENBQUM7UUFzRWpFLENBQUM7UUF0R0MsSUFBSSxVQUFVLENBQUMsVUFBb0I7WUFDakMsSUFBSSxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNyQixDQUFDO1FBSUQsSUFBSSxTQUFTLENBQUMsU0FBaUI7WUFDN0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7WUFDNUIsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFDNUIsQ0FBQztRQUlELElBQUksV0FBVyxDQUFDLFdBQW1CO1lBQ2pDLElBQUksQ0FBQyxZQUFZLEdBQUcsV0FBVyxDQUFDO1lBQ2hDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBQzVCLENBQUM7UUFJRCxJQUFJLFFBQVEsQ0FBQyxRQUFpQjtZQUM1QixJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztZQUMxQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDckIsQ0FBQztRQUlELElBQUksR0FBRztZQUNMLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztRQUNuQixDQUFDO1FBSUQsZUFBZTtZQUNiLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtnQkFDckIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUNoQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQ25CLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO2dCQUMxQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7YUFDcEI7UUFDSCxDQUFDO1FBRUQsTUFBTTtZQUNKLElBQUksSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO2dCQUNsQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO2FBQzVCO1FBQ0gsQ0FBQztRQUVELFdBQVc7WUFDVCxJQUFJLENBQUMsbUJBQW1CLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDekMsQ0FBQztRQUVPLFFBQVE7WUFDZCxNQUFNLE9BQU8sR0FBRyxFQUFDLFdBQVcsRUFBRSxLQUFLLEVBQUUsa0JBQWtCLEVBQUUsS0FBSyxFQUFDLENBQUM7WUFFaEUsSUFBSSxDQUFDLElBQUksR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3JFLENBQUM7UUFFTyxXQUFXO1lBQ2pCLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLEVBQUU7Z0JBQ3JCLE9BQU87YUFDUjtZQUVELElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDWixJQUFJLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtnQkFDN0QsQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hCLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN4QixDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUN6QjtpQkFBTTtnQkFDTCxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNOLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ04sQ0FBQyxHQUFHLEVBQUUsQ0FBQzthQUNSO1lBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDL0IsQ0FBQztRQUVPLGtCQUFrQjtZQUN4QixJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxFQUFFO2dCQUNoRCxPQUFPO2FBQ1I7WUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyRCxVQUFVLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsRUFBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMzRixDQUFDO1FBRU8sV0FBVztZQUNqQixJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxFQUFFO2dCQUNyQixPQUFPO2FBQ1I7WUFFRCxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7Z0JBQ2xCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUM3QixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDOUIsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQ3BDLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUNwQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDNUIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQzdCLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7b0JBQ2pCLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO2lCQUN6QjthQUNGO1FBQ0gsQ0FBQztLQUNGLENBQUE7SUExR3NEO1FBQXBELFNBQVMsQ0FBQyx3QkFBd0IsRUFBRSxFQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUMsQ0FBQztrQ0FBZSx3QkFBd0I7eURBQUM7SUFJNUY7UUFEQyxLQUFLLEVBQUU7OztxREFJUDtJQUlEO1FBREMsS0FBSyxFQUFFOzs7b0RBSVA7SUFJRDtRQURDLEtBQUssRUFBRTs7O3NEQUlQO0lBSUQ7UUFEQyxLQUFLLEVBQUU7OzttREFJUDtJQTdCVSxlQUFlO1FBUDNCLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxTQUFTO1lBQ25CLHNDQUF1QjtZQUV2QixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtZQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTs7U0FDdEMsQ0FBQztPQUNXLGVBQWUsQ0EyRzNCO0lBQUQsc0JBQUM7S0FBQTtTQTNHWSxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgTCBmcm9tICdsZWFmbGV0JztcbmltcG9ydCB7U3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcblxuY29uc3QgbGVhZmxldExpYiA9IChMIGFzIGFueSkuZGVmYXVsdCB8fCBMO1xuXG5pbXBvcnQge0FqZk1hcENvbnRhaW5lckRpcmVjdGl2ZX0gZnJvbSAnLi9tYXAtY29udGFpbmVyLWRpcmVjdGl2ZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FqZi1tYXAnLFxuICB0ZW1wbGF0ZVVybDogJ21hcC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ21hcC5jc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgQWpmTWFwQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcbiAgQFZpZXdDaGlsZChBamZNYXBDb250YWluZXJEaXJlY3RpdmUsIHtzdGF0aWM6IHRydWV9KSBtYXBDb250YWluZXI6IEFqZk1hcENvbnRhaW5lckRpcmVjdGl2ZTtcblxuICBwcml2YXRlIF9jb29yZGluYXRlOiBudW1iZXJbXTtcbiAgQElucHV0KClcbiAgc2V0IGNvb3JkaW5hdGUoY29vcmRpbmF0ZTogbnVtYmVyW10pIHtcbiAgICB0aGlzLl9jb29yZGluYXRlID0gY29vcmRpbmF0ZS5zbGljZSgwKTtcbiAgICB0aGlzLl9zZXRNYXBWaWV3KCk7XG4gIH1cblxuICBwcml2YXRlIF90aWxlTGF5ZXI6IHN0cmluZztcbiAgQElucHV0KClcbiAgc2V0IHRpbGVMYXllcih0aWxlTGF5ZXI6IHN0cmluZykge1xuICAgIHRoaXMuX3RpbGVMYXllciA9IHRpbGVMYXllcjtcbiAgICB0aGlzLl9hZGRUaWxlTGF5ZXJUb01hcCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfYXR0cmlidXRpb246IHN0cmluZztcbiAgQElucHV0KClcbiAgc2V0IGF0dHJpYnV0aW9uKGF0dHJpYnV0aW9uOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9hdHRyaWJ1dGlvbiA9IGF0dHJpYnV0aW9uO1xuICAgIHRoaXMuX2FkZFRpbGVMYXllclRvTWFwKCk7XG4gIH1cblxuICBwcml2YXRlIF9kaXNhYmxlZDogYm9vbGVhbjtcbiAgQElucHV0KClcbiAgc2V0IGRpc2FibGVkKGRpc2FibGVkOiBib29sZWFuKSB7XG4gICAgdGhpcy5fZGlzYWJsZWQgPSBkaXNhYmxlZDtcbiAgICB0aGlzLl9kaXNhYmxlTWFwKCk7XG4gIH1cblxuXG4gIHByaXZhdGUgX21hcDogTC5NYXA7XG4gIGdldCBtYXAoKTogTC5NYXAge1xuICAgIHJldHVybiB0aGlzLl9tYXA7XG4gIH1cblxuICBwcml2YXRlIF9jb2x1bW5XaWR0aENoYW5nZWQ6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubWFwQ29udGFpbmVyKSB7XG4gICAgICB0aGlzLl9pbml0TWFwKCk7XG4gICAgICB0aGlzLl9zZXRNYXBWaWV3KCk7XG4gICAgICB0aGlzLl9hZGRUaWxlTGF5ZXJUb01hcCgpO1xuICAgICAgdGhpcy5fZGlzYWJsZU1hcCgpO1xuICAgIH1cbiAgfVxuXG4gIHJlZHJhdygpIHtcbiAgICBpZiAodGhpcy5tYXBDb250YWluZXIgJiYgdGhpcy5fbWFwKSB7XG4gICAgICB0aGlzLl9tYXAuaW52YWxpZGF0ZVNpemUoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9jb2x1bW5XaWR0aENoYW5nZWQudW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRNYXAoKTogdm9pZCB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHt6b29tQ29udHJvbDogZmFsc2UsIGF0dHJpYnV0aW9uQ29udHJvbDogZmFsc2V9O1xuXG4gICAgdGhpcy5fbWFwID0gbGVhZmxldExpYi5tYXAodGhpcy5tYXBDb250YWluZXIuaHRtbEVsZW1lbnQsIG9wdGlvbnMpO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2V0TWFwVmlldygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fbWFwID09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgeCwgeSwgejtcbiAgICBpZiAodGhpcy5fY29vcmRpbmF0ZSAhPSBudWxsICYmIHRoaXMuX2Nvb3JkaW5hdGUubGVuZ3RoID09PSAzKSB7XG4gICAgICB4ID0gdGhpcy5fY29vcmRpbmF0ZVswXTtcbiAgICAgIHkgPSB0aGlzLl9jb29yZGluYXRlWzFdO1xuICAgICAgeiA9IHRoaXMuX2Nvb3JkaW5hdGVbMl07XG4gICAgfSBlbHNlIHtcbiAgICAgIHggPSAwO1xuICAgICAgeSA9IDA7XG4gICAgICB6ID0gMTQ7XG4gICAgfVxuICAgIHRoaXMuX21hcC5zZXRWaWV3KFt4LCB5XSwgeik7XG4gIH1cblxuICBwcml2YXRlIF9hZGRUaWxlTGF5ZXJUb01hcCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fbWFwID09IG51bGwgfHwgdGhpcy5fdGlsZUxheWVyID09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fbWFwLmVhY2hMYXllcigobCkgPT4gdGhpcy5fbWFwLnJlbW92ZUxheWVyKGwpKTtcbiAgICBsZWFmbGV0TGliLnRpbGVMYXllcih0aGlzLl90aWxlTGF5ZXIsIHthdHRyaWJ1dGlvbjogdGhpcy5fYXR0cmlidXRpb259KS5hZGRUbyh0aGlzLl9tYXApO1xuICB9XG5cbiAgcHJpdmF0ZSBfZGlzYWJsZU1hcCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fbWFwID09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fZGlzYWJsZWQpIHtcbiAgICAgIHRoaXMuX21hcC5kcmFnZ2luZy5kaXNhYmxlKCk7XG4gICAgICB0aGlzLl9tYXAudG91Y2hab29tLmRpc2FibGUoKTtcbiAgICAgIHRoaXMuX21hcC5kb3VibGVDbGlja1pvb20uZGlzYWJsZSgpO1xuICAgICAgdGhpcy5fbWFwLnNjcm9sbFdoZWVsWm9vbS5kaXNhYmxlKCk7XG4gICAgICB0aGlzLl9tYXAuYm94Wm9vbS5kaXNhYmxlKCk7XG4gICAgICB0aGlzLl9tYXAua2V5Ym9hcmQuZGlzYWJsZSgpO1xuICAgICAgaWYgKHRoaXMuX21hcC50YXApIHtcbiAgICAgICAgdGhpcy5fbWFwLnRhcC5kaXNhYmxlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=