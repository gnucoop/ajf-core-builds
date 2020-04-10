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
import * as L from 'leaflet';
import { Subscription } from 'rxjs';
var leafletLib = L.default || L;
import { AjfMapContainerDirective } from './map-container-directive';
var AjfMapComponent = /** @class */ (function () {
    function AjfMapComponent() {
        this._columnWidthChanged = Subscription.EMPTY;
    }
    Object.defineProperty(AjfMapComponent.prototype, "coordinate", {
        set: function (coordinate) {
            this._coordinate = coordinate.slice(0);
            this._setMapView();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfMapComponent.prototype, "tileLayer", {
        set: function (tileLayer) {
            this._tileLayer = tileLayer;
            this._addTileLayerToMap();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfMapComponent.prototype, "attribution", {
        set: function (attribution) {
            this._attribution = attribution;
            this._addTileLayerToMap();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfMapComponent.prototype, "disabled", {
        set: function (disabled) {
            this._disabled = disabled;
            this._disableMap();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfMapComponent.prototype, "map", {
        get: function () {
            return this._map;
        },
        enumerable: true,
        configurable: true
    });
    AjfMapComponent.prototype.ngAfterViewInit = function () {
        if (this.mapContainer) {
            this._initMap();
            this._setMapView();
            this._addTileLayerToMap();
            this._disableMap();
        }
    };
    AjfMapComponent.prototype.redraw = function () {
        if (this.mapContainer && this._map) {
            this._map.invalidateSize();
        }
    };
    AjfMapComponent.prototype.ngOnDestroy = function () {
        this._columnWidthChanged.unsubscribe();
    };
    AjfMapComponent.prototype._initMap = function () {
        var options = { zoomControl: false, attributionControl: false };
        this._map = leafletLib.map(this.mapContainer.htmlElement, options);
    };
    AjfMapComponent.prototype._setMapView = function () {
        if (this._map == null) {
            return;
        }
        var x, y, z;
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
    };
    AjfMapComponent.prototype._addTileLayerToMap = function () {
        var _this = this;
        if (this._map == null || this._tileLayer == null) {
            return;
        }
        this._map.eachLayer(function (l) { return _this._map.removeLayer(l); });
        leafletLib.tileLayer(this._tileLayer, { attribution: this._attribution }).addTo(this._map);
    };
    AjfMapComponent.prototype._disableMap = function () {
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
    };
    AjfMapComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ajf-map',
                    template: "<div mapContainer></div>\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    styles: ["ajf-map{display:block;position:relative;width:100%;min-height:200px}ajf-map [mapContainer]{position:absolute;min-width:100px;width:100%;height:100%}\n"]
                }] }
    ];
    AjfMapComponent.propDecorators = {
        mapContainer: [{ type: ViewChild, args: [AjfMapContainerDirective, { static: true },] }],
        coordinate: [{ type: Input }],
        tileLayer: [{ type: Input }],
        attribution: [{ type: Input }],
        disabled: [{ type: Input }]
    };
    return AjfMapComponent;
}());
export { AjfMapComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvbWFwL21hcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBRUwsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxLQUFLLEVBRUwsU0FBUyxFQUNULGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEtBQUssQ0FBQyxNQUFNLFNBQVMsQ0FBQztBQUM3QixPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBRWxDLElBQU0sVUFBVSxHQUFJLENBQVMsQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDO0FBRTNDLE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBRW5FO0lBQUE7UUE0Q1Usd0JBQW1CLEdBQWlCLFlBQVksQ0FBQyxLQUFLLENBQUM7SUFzRWpFLENBQUM7SUF2R0Msc0JBQ0ksdUNBQVU7YUFEZCxVQUNlLFVBQW9CO1lBQ2pDLElBQUksQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN2QyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDckIsQ0FBQzs7O09BQUE7SUFHRCxzQkFDSSxzQ0FBUzthQURiLFVBQ2MsU0FBaUI7WUFDN0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7WUFDNUIsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFDNUIsQ0FBQzs7O09BQUE7SUFHRCxzQkFDSSx3Q0FBVzthQURmLFVBQ2dCLFdBQW1CO1lBQ2pDLElBQUksQ0FBQyxZQUFZLEdBQUcsV0FBVyxDQUFDO1lBQ2hDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBQzVCLENBQUM7OztPQUFBO0lBR0Qsc0JBQ0kscUNBQVE7YUFEWixVQUNhLFFBQWlC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QUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUM5QixJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNwQyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNwQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUM1QixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUM3QixJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO2dCQUNqQixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQzthQUN6QjtTQUNGO0lBQ0gsQ0FBQzs7Z0JBakhGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsU0FBUztvQkFDbkIsc0NBQXVCO29CQUV2QixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7O2lCQUN0Qzs7OytCQUVFLFNBQVMsU0FBQyx3QkFBd0IsRUFBRSxFQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUM7NkJBR2xELEtBQUs7NEJBT0wsS0FBSzs4QkFPTCxLQUFLOzJCQU9MLEtBQUs7O0lBa0ZSLHNCQUFDO0NBQUEsQUFsSEQsSUFrSEM7U0EzR1ksZUFBZSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgVmlld0NoaWxkLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIEwgZnJvbSAnbGVhZmxldCc7XG5pbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5cbmNvbnN0IGxlYWZsZXRMaWIgPSAoTCBhcyBhbnkpLmRlZmF1bHQgfHwgTDtcblxuaW1wb3J0IHtBamZNYXBDb250YWluZXJEaXJlY3RpdmV9IGZyb20gJy4vbWFwLWNvbnRhaW5lci1kaXJlY3RpdmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhamYtbWFwJyxcbiAgdGVtcGxhdGVVcmw6ICdtYXAuaHRtbCcsXG4gIHN0eWxlVXJsczogWydtYXAuY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIEFqZk1hcENvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG4gIEBWaWV3Q2hpbGQoQWpmTWFwQ29udGFpbmVyRGlyZWN0aXZlLCB7c3RhdGljOiB0cnVlfSkgbWFwQ29udGFpbmVyOiBBamZNYXBDb250YWluZXJEaXJlY3RpdmU7XG5cbiAgcHJpdmF0ZSBfY29vcmRpbmF0ZTogbnVtYmVyW107XG4gIEBJbnB1dCgpXG4gIHNldCBjb29yZGluYXRlKGNvb3JkaW5hdGU6IG51bWJlcltdKSB7XG4gICAgdGhpcy5fY29vcmRpbmF0ZSA9IGNvb3JkaW5hdGUuc2xpY2UoMCk7XG4gICAgdGhpcy5fc2V0TWFwVmlldygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfdGlsZUxheWVyOiBzdHJpbmc7XG4gIEBJbnB1dCgpXG4gIHNldCB0aWxlTGF5ZXIodGlsZUxheWVyOiBzdHJpbmcpIHtcbiAgICB0aGlzLl90aWxlTGF5ZXIgPSB0aWxlTGF5ZXI7XG4gICAgdGhpcy5fYWRkVGlsZUxheWVyVG9NYXAoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2F0dHJpYnV0aW9uOiBzdHJpbmc7XG4gIEBJbnB1dCgpXG4gIHNldCBhdHRyaWJ1dGlvbihhdHRyaWJ1dGlvbjogc3RyaW5nKSB7XG4gICAgdGhpcy5fYXR0cmlidXRpb24gPSBhdHRyaWJ1dGlvbjtcbiAgICB0aGlzLl9hZGRUaWxlTGF5ZXJUb01hcCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZGlzYWJsZWQ6IGJvb2xlYW47XG4gIEBJbnB1dCgpXG4gIHNldCBkaXNhYmxlZChkaXNhYmxlZDogYm9vbGVhbikge1xuICAgIHRoaXMuX2Rpc2FibGVkID0gZGlzYWJsZWQ7XG4gICAgdGhpcy5fZGlzYWJsZU1hcCgpO1xuICB9XG5cblxuICBwcml2YXRlIF9tYXA6IEwuTWFwO1xuICBnZXQgbWFwKCk6IEwuTWFwIHtcbiAgICByZXR1cm4gdGhpcy5fbWFwO1xuICB9XG5cbiAgcHJpdmF0ZSBfY29sdW1uV2lkdGhDaGFuZ2VkOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm1hcENvbnRhaW5lcikge1xuICAgICAgdGhpcy5faW5pdE1hcCgpO1xuICAgICAgdGhpcy5fc2V0TWFwVmlldygpO1xuICAgICAgdGhpcy5fYWRkVGlsZUxheWVyVG9NYXAoKTtcbiAgICAgIHRoaXMuX2Rpc2FibGVNYXAoKTtcbiAgICB9XG4gIH1cblxuICByZWRyYXcoKSB7XG4gICAgaWYgKHRoaXMubWFwQ29udGFpbmVyICYmIHRoaXMuX21hcCkge1xuICAgICAgdGhpcy5fbWFwLmludmFsaWRhdGVTaXplKCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5fY29sdW1uV2lkdGhDaGFuZ2VkLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0TWFwKCk6IHZvaWQge1xuICAgIGNvbnN0IG9wdGlvbnMgPSB7em9vbUNvbnRyb2w6IGZhbHNlLCBhdHRyaWJ1dGlvbkNvbnRyb2w6IGZhbHNlfTtcblxuICAgIHRoaXMuX21hcCA9IGxlYWZsZXRMaWIubWFwKHRoaXMubWFwQ29udGFpbmVyLmh0bWxFbGVtZW50LCBvcHRpb25zKTtcbiAgfVxuXG4gIHByaXZhdGUgX3NldE1hcFZpZXcoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX21hcCA9PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IHgsIHksIHo7XG4gICAgaWYgKHRoaXMuX2Nvb3JkaW5hdGUgIT0gbnVsbCAmJiB0aGlzLl9jb29yZGluYXRlLmxlbmd0aCA9PT0gMykge1xuICAgICAgeCA9IHRoaXMuX2Nvb3JkaW5hdGVbMF07XG4gICAgICB5ID0gdGhpcy5fY29vcmRpbmF0ZVsxXTtcbiAgICAgIHogPSB0aGlzLl9jb29yZGluYXRlWzJdO1xuICAgIH0gZWxzZSB7XG4gICAgICB4ID0gMDtcbiAgICAgIHkgPSAwO1xuICAgICAgeiA9IDE0O1xuICAgIH1cbiAgICB0aGlzLl9tYXAuc2V0VmlldyhbeCwgeV0sIHopO1xuICB9XG5cbiAgcHJpdmF0ZSBfYWRkVGlsZUxheWVyVG9NYXAoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX21hcCA9PSBudWxsIHx8IHRoaXMuX3RpbGVMYXllciA9PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX21hcC5lYWNoTGF5ZXIoKGwpID0+IHRoaXMuX21hcC5yZW1vdmVMYXllcihsKSk7XG4gICAgbGVhZmxldExpYi50aWxlTGF5ZXIodGhpcy5fdGlsZUxheWVyLCB7YXR0cmlidXRpb246IHRoaXMuX2F0dHJpYnV0aW9ufSkuYWRkVG8odGhpcy5fbWFwKTtcbiAgfVxuXG4gIHByaXZhdGUgX2Rpc2FibGVNYXAoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX21hcCA9PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2Rpc2FibGVkKSB7XG4gICAgICB0aGlzLl9tYXAuZHJhZ2dpbmcuZGlzYWJsZSgpO1xuICAgICAgdGhpcy5fbWFwLnRvdWNoWm9vbS5kaXNhYmxlKCk7XG4gICAgICB0aGlzLl9tYXAuZG91YmxlQ2xpY2tab29tLmRpc2FibGUoKTtcbiAgICAgIHRoaXMuX21hcC5zY3JvbGxXaGVlbFpvb20uZGlzYWJsZSgpO1xuICAgICAgdGhpcy5fbWFwLmJveFpvb20uZGlzYWJsZSgpO1xuICAgICAgdGhpcy5fbWFwLmtleWJvYXJkLmRpc2FibGUoKTtcbiAgICAgIGlmICh0aGlzLl9tYXAudGFwKSB7XG4gICAgICAgIHRoaXMuX21hcC50YXAuZGlzYWJsZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19