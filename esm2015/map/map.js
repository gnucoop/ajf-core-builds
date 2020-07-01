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
import { ChangeDetectionStrategy, Component, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { map, tileLayer } from 'leaflet';
import { Subscription } from 'rxjs';
import { AjfMapContainerDirective } from './map-container-directive';
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
        this._map.eachLayer((l) => this._map.removeLayer(l));
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
AjfMapComponent.decorators = [
    { type: Component, args: [{
                selector: 'ajf-map',
                template: "<div mapContainer></div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                styles: ["ajf-map{display:block;position:relative;width:100%;min-height:200px}ajf-map [mapContainer]{position:absolute;min-width:100px;width:100%;height:100%}\n"]
            },] }
];
AjfMapComponent.propDecorators = {
    mapContainer: [{ type: ViewChild, args: [AjfMapContainerDirective, { static: true },] }],
    coordinate: [{ type: Input }],
    tileLayer: [{ type: Input }],
    attribution: [{ type: Input }],
    disabled: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvbWFwL21hcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBRUwsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxLQUFLLEVBRUwsU0FBUyxFQUNULGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsR0FBRyxFQUFPLFNBQVMsRUFBQyxNQUFNLFNBQVMsQ0FBQztBQUM1QyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBRWxDLE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBU25FLE1BQU0sT0FBTyxlQUFlO0lBUDVCO1FBMkNVLHdCQUFtQixHQUFpQixZQUFZLENBQUMsS0FBSyxDQUFDO0lBc0VqRSxDQUFDO0lBdEdDLElBQ0ksVUFBVSxDQUFDLFVBQW9CO1FBQ2pDLElBQUksQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2QyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUdELElBQ0ksU0FBUyxDQUFDLEVBQVU7UUFDdEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUdELElBQ0ksV0FBVyxDQUFDLFdBQW1CO1FBQ2pDLElBQUksQ0FBQyxZQUFZLEdBQUcsV0FBVyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFHRCxJQUNJLFFBQVEsQ0FBQyxRQUFpQjtRQUM1QixJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztRQUMxQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUdE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QzVCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQzdCLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7Z0JBQ2pCLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO2FBQ3pCO1NBQ0Y7SUFDSCxDQUFDOzs7WUFoSEYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxTQUFTO2dCQUNuQixzQ0FBdUI7Z0JBRXZCLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTs7YUFDdEM7OzsyQkFFRSxTQUFTLFNBQUMsd0JBQXdCLEVBQUUsRUFBQyxNQUFNLEVBQUUsSUFBSSxFQUFDO3lCQUdsRCxLQUFLO3dCQU9MLEtBQUs7MEJBT0wsS0FBSzt1QkFPTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHttYXAsIE1hcCwgdGlsZUxheWVyfSBmcm9tICdsZWFmbGV0JztcbmltcG9ydCB7U3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHtBamZNYXBDb250YWluZXJEaXJlY3RpdmV9IGZyb20gJy4vbWFwLWNvbnRhaW5lci1kaXJlY3RpdmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhamYtbWFwJyxcbiAgdGVtcGxhdGVVcmw6ICdtYXAuaHRtbCcsXG4gIHN0eWxlVXJsczogWydtYXAuY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIEFqZk1hcENvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG4gIEBWaWV3Q2hpbGQoQWpmTWFwQ29udGFpbmVyRGlyZWN0aXZlLCB7c3RhdGljOiB0cnVlfSkgbWFwQ29udGFpbmVyOiBBamZNYXBDb250YWluZXJEaXJlY3RpdmU7XG5cbiAgcHJpdmF0ZSBfY29vcmRpbmF0ZTogbnVtYmVyW107XG4gIEBJbnB1dCgpXG4gIHNldCBjb29yZGluYXRlKGNvb3JkaW5hdGU6IG51bWJlcltdKSB7XG4gICAgdGhpcy5fY29vcmRpbmF0ZSA9IGNvb3JkaW5hdGUuc2xpY2UoMCk7XG4gICAgdGhpcy5fc2V0TWFwVmlldygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfdGlsZUxheWVyOiBzdHJpbmc7XG4gIEBJbnB1dCgpXG4gIHNldCB0aWxlTGF5ZXIodGw6IHN0cmluZykge1xuICAgIHRoaXMuX3RpbGVMYXllciA9IHRsO1xuICAgIHRoaXMuX2FkZFRpbGVMYXllclRvTWFwKCk7XG4gIH1cblxuICBwcml2YXRlIF9hdHRyaWJ1dGlvbjogc3RyaW5nO1xuICBASW5wdXQoKVxuICBzZXQgYXR0cmlidXRpb24oYXR0cmlidXRpb246IHN0cmluZykge1xuICAgIHRoaXMuX2F0dHJpYnV0aW9uID0gYXR0cmlidXRpb247XG4gICAgdGhpcy5fYWRkVGlsZUxheWVyVG9NYXAoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2Rpc2FibGVkOiBib29sZWFuO1xuICBASW5wdXQoKVxuICBzZXQgZGlzYWJsZWQoZGlzYWJsZWQ6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9kaXNhYmxlZCA9IGRpc2FibGVkO1xuICAgIHRoaXMuX2Rpc2FibGVNYXAoKTtcbiAgfVxuXG4gIHByaXZhdGUgX21hcDogTWFwO1xuICBnZXQgbWFwKCk6IE1hcCB7XG4gICAgcmV0dXJuIHRoaXMuX21hcDtcbiAgfVxuXG4gIHByaXZhdGUgX2NvbHVtbldpZHRoQ2hhbmdlZDogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5tYXBDb250YWluZXIpIHtcbiAgICAgIHRoaXMuX2luaXRNYXAoKTtcbiAgICAgIHRoaXMuX3NldE1hcFZpZXcoKTtcbiAgICAgIHRoaXMuX2FkZFRpbGVMYXllclRvTWFwKCk7XG4gICAgICB0aGlzLl9kaXNhYmxlTWFwKCk7XG4gICAgfVxuICB9XG5cbiAgcmVkcmF3KCkge1xuICAgIGlmICh0aGlzLm1hcENvbnRhaW5lciAmJiB0aGlzLl9tYXApIHtcbiAgICAgIHRoaXMuX21hcC5pbnZhbGlkYXRlU2l6ZSgpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX2NvbHVtbldpZHRoQ2hhbmdlZC51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdE1hcCgpOiB2b2lkIHtcbiAgICBjb25zdCBvcHRpb25zID0ge3pvb21Db250cm9sOiBmYWxzZSwgYXR0cmlidXRpb25Db250cm9sOiBmYWxzZX07XG5cbiAgICB0aGlzLl9tYXAgPSBtYXAodGhpcy5tYXBDb250YWluZXIuaHRtbEVsZW1lbnQsIG9wdGlvbnMpO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2V0TWFwVmlldygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fbWFwID09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgeCwgeSwgejtcbiAgICBpZiAodGhpcy5fY29vcmRpbmF0ZSAhPSBudWxsICYmIHRoaXMuX2Nvb3JkaW5hdGUubGVuZ3RoID09PSAzKSB7XG4gICAgICB4ID0gdGhpcy5fY29vcmRpbmF0ZVswXTtcbiAgICAgIHkgPSB0aGlzLl9jb29yZGluYXRlWzFdO1xuICAgICAgeiA9IHRoaXMuX2Nvb3JkaW5hdGVbMl07XG4gICAgfSBlbHNlIHtcbiAgICAgIHggPSAwO1xuICAgICAgeSA9IDA7XG4gICAgICB6ID0gMTQ7XG4gICAgfVxuICAgIHRoaXMuX21hcC5zZXRWaWV3KFt4LCB5XSwgeik7XG4gIH1cblxuICBwcml2YXRlIF9hZGRUaWxlTGF5ZXJUb01hcCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fbWFwID09IG51bGwgfHwgdGhpcy5fdGlsZUxheWVyID09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fbWFwLmVhY2hMYXllcigobCkgPT4gdGhpcy5fbWFwLnJlbW92ZUxheWVyKGwpKTtcbiAgICB0aWxlTGF5ZXIodGhpcy5fdGlsZUxheWVyLCB7YXR0cmlidXRpb246IHRoaXMuX2F0dHJpYnV0aW9ufSkuYWRkVG8odGhpcy5fbWFwKTtcbiAgfVxuXG4gIHByaXZhdGUgX2Rpc2FibGVNYXAoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX21hcCA9PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2Rpc2FibGVkKSB7XG4gICAgICB0aGlzLl9tYXAuZHJhZ2dpbmcuZGlzYWJsZSgpO1xuICAgICAgdGhpcy5fbWFwLnRvdWNoWm9vbS5kaXNhYmxlKCk7XG4gICAgICB0aGlzLl9tYXAuZG91YmxlQ2xpY2tab29tLmRpc2FibGUoKTtcbiAgICAgIHRoaXMuX21hcC5zY3JvbGxXaGVlbFpvb20uZGlzYWJsZSgpO1xuICAgICAgdGhpcy5fbWFwLmJveFpvb20uZGlzYWJsZSgpO1xuICAgICAgdGhpcy5fbWFwLmtleWJvYXJkLmRpc2FibGUoKTtcbiAgICAgIGlmICh0aGlzLl9tYXAudGFwKSB7XG4gICAgICAgIHRoaXMuX21hcC50YXAuZGlzYWJsZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19