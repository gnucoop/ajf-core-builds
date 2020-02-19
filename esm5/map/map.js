/**
 * @license
 * Copyright (C) 2018 Gnucoop soc. coop.
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
import { Subscription } from 'rxjs';
import * as L from 'leaflet';
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
        get: function () { return this._map; },
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
        var options = {
            zoomControl: false,
            attributionControl: false
        };
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
        leafletLib.tileLayer(this._tileLayer, {
            attribution: this._attribution
        }).addTo(this._map);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvbWFwL21hcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQ1UsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFDN0MsU0FBUyxFQUFFLGlCQUFpQixFQUN4QyxNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBRWxDLE9BQU8sS0FBSyxDQUFDLE1BQU0sU0FBUyxDQUFDO0FBQzdCLElBQU0sVUFBVSxHQUFJLENBQVMsQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDO0FBRTNDLE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBRW5FO0lBQUE7UUFzQ1Usd0JBQW1CLEdBQWlCLFlBQVksQ0FBQyxLQUFLLENBQUM7SUFxRWpFLENBQUM7SUFoR0Msc0JBQWEsdUNBQVU7YUFBdkIsVUFBd0IsVUFBb0I7WUFDMUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNyQixDQUFDOzs7T0FBQTtJQUdELHNCQUFhLHNDQUFTO2FBQXRCLFVBQXVCLFNBQWlCO1lBQ3RDLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO1lBQzVCLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBQzVCLENBQUM7OztPQUFBO0lBR0Qsc0JBQWEsd0NBQVc7YUFBeEIsVUFBeUIsV0FBbUI7WUFDMUMsSUFBSSxDQUFDLFlBQVksR0FBRyxXQUFXLENBQUM7WUFDaEMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFDNUIsQ0FBQzs7O09BQUE7SUFHRCxzQkFBYSxxQ0FBUTthQUFyQixVQUFz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Q0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQzlCLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ3BDLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ3BDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQzVCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQzdCLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7Z0JBQ2pCLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO2FBQ3pCO1NBQ0Y7SUFDSCxDQUFDOztnQkExR0YsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxTQUFTO29CQUNuQixzQ0FBdUI7b0JBRXZCLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTs7aUJBQ3RDOzs7K0JBRUUsU0FBUyxTQUFDLHdCQUF3QixFQUFFLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBQzs2QkFHbEQsS0FBSzs0QkFNTCxLQUFLOzhCQU1MLEtBQUs7MkJBTUwsS0FBSzs7SUE4RVIsc0JBQUM7Q0FBQSxBQTNHRCxJQTJHQztTQXBHWSxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSAyMDE4IEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0LFxuICBPbkRlc3Ryb3ksIFZpZXdDaGlsZCwgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7U3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcblxuaW1wb3J0ICogYXMgTCBmcm9tICdsZWFmbGV0JztcbmNvbnN0IGxlYWZsZXRMaWIgPSAoTCBhcyBhbnkpLmRlZmF1bHQgfHwgTDtcblxuaW1wb3J0IHtBamZNYXBDb250YWluZXJEaXJlY3RpdmV9IGZyb20gJy4vbWFwLWNvbnRhaW5lci1kaXJlY3RpdmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhamYtbWFwJyxcbiAgdGVtcGxhdGVVcmw6ICdtYXAuaHRtbCcsXG4gIHN0eWxlVXJsczogWydtYXAuY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIEFqZk1hcENvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG4gIEBWaWV3Q2hpbGQoQWpmTWFwQ29udGFpbmVyRGlyZWN0aXZlLCB7c3RhdGljOiB0cnVlfSkgbWFwQ29udGFpbmVyOiBBamZNYXBDb250YWluZXJEaXJlY3RpdmU7XG5cbiAgcHJpdmF0ZSBfY29vcmRpbmF0ZTogbnVtYmVyW107XG4gIEBJbnB1dCgpIHNldCBjb29yZGluYXRlKGNvb3JkaW5hdGU6IG51bWJlcltdKSB7XG4gICAgdGhpcy5fY29vcmRpbmF0ZSA9IGNvb3JkaW5hdGUuc2xpY2UoMCk7XG4gICAgdGhpcy5fc2V0TWFwVmlldygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfdGlsZUxheWVyOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHNldCB0aWxlTGF5ZXIodGlsZUxheWVyOiBzdHJpbmcpIHtcbiAgICB0aGlzLl90aWxlTGF5ZXIgPSB0aWxlTGF5ZXI7XG4gICAgdGhpcy5fYWRkVGlsZUxheWVyVG9NYXAoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2F0dHJpYnV0aW9uOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHNldCBhdHRyaWJ1dGlvbihhdHRyaWJ1dGlvbjogc3RyaW5nKSB7XG4gICAgdGhpcy5fYXR0cmlidXRpb24gPSBhdHRyaWJ1dGlvbjtcbiAgICB0aGlzLl9hZGRUaWxlTGF5ZXJUb01hcCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZGlzYWJsZWQ6IGJvb2xlYW47XG4gIEBJbnB1dCgpIHNldCBkaXNhYmxlZChkaXNhYmxlZDogYm9vbGVhbikge1xuICAgIHRoaXMuX2Rpc2FibGVkID0gZGlzYWJsZWQ7XG4gICAgdGhpcy5fZGlzYWJsZU1hcCgpO1xuICB9XG5cblxuICBwcml2YXRlIF9tYXA6IEwuTWFwO1xuICBnZXQgbWFwKCk6IEwuTWFwIHsgcmV0dXJuIHRoaXMuX21hcDsgfVxuXG4gIHByaXZhdGUgX2NvbHVtbldpZHRoQ2hhbmdlZDogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5tYXBDb250YWluZXIpIHtcbiAgICAgIHRoaXMuX2luaXRNYXAoKTtcbiAgICAgIHRoaXMuX3NldE1hcFZpZXcoKTtcbiAgICAgIHRoaXMuX2FkZFRpbGVMYXllclRvTWFwKCk7XG4gICAgICB0aGlzLl9kaXNhYmxlTWFwKCk7XG4gICAgfVxuICB9XG5cbiAgcmVkcmF3KCkge1xuICAgIGlmICh0aGlzLm1hcENvbnRhaW5lciAmJiB0aGlzLl9tYXApIHtcbiAgICAgIHRoaXMuX21hcC5pbnZhbGlkYXRlU2l6ZSgpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX2NvbHVtbldpZHRoQ2hhbmdlZC51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdE1hcCgpOiB2b2lkIHtcbiAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgem9vbUNvbnRyb2w6IGZhbHNlLFxuICAgICAgYXR0cmlidXRpb25Db250cm9sOiBmYWxzZVxuICAgIH07XG5cbiAgICB0aGlzLl9tYXAgPSBsZWFmbGV0TGliLm1hcCh0aGlzLm1hcENvbnRhaW5lci5odG1sRWxlbWVudCwgb3B0aW9ucyk7XG4gIH1cblxuICBwcml2YXRlIF9zZXRNYXBWaWV3KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9tYXAgPT0gbnVsbCkgeyByZXR1cm47IH1cblxuICAgIGxldCB4LCB5LCB6O1xuICAgIGlmICh0aGlzLl9jb29yZGluYXRlICE9IG51bGwgJiYgdGhpcy5fY29vcmRpbmF0ZS5sZW5ndGggPT09IDMpIHtcbiAgICAgIHggPSB0aGlzLl9jb29yZGluYXRlWzBdO1xuICAgICAgeSA9IHRoaXMuX2Nvb3JkaW5hdGVbMV07XG4gICAgICB6ID0gdGhpcy5fY29vcmRpbmF0ZVsyXTtcbiAgICB9IGVsc2Uge1xuICAgICAgeCA9IDA7XG4gICAgICB5ID0gMDtcbiAgICAgIHogPSAxNDtcbiAgICB9XG4gICAgdGhpcy5fbWFwLnNldFZpZXcoW3gsIHldLCB6KTtcbiAgfVxuXG4gIHByaXZhdGUgX2FkZFRpbGVMYXllclRvTWFwKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9tYXAgPT0gbnVsbCB8fCB0aGlzLl90aWxlTGF5ZXIgPT0gbnVsbCkgeyByZXR1cm47IH1cbiAgICB0aGlzLl9tYXAuZWFjaExheWVyKChsKSA9PiB0aGlzLl9tYXAucmVtb3ZlTGF5ZXIobCkpO1xuICAgIGxlYWZsZXRMaWIudGlsZUxheWVyKHRoaXMuX3RpbGVMYXllciwge1xuICAgICAgYXR0cmlidXRpb246IHRoaXMuX2F0dHJpYnV0aW9uXG4gICAgfSkuYWRkVG8odGhpcy5fbWFwKTtcbiAgfVxuXG4gIHByaXZhdGUgX2Rpc2FibGVNYXAoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX21hcCA9PSBudWxsKSB7IHJldHVybjsgfVxuXG4gICAgaWYgKHRoaXMuX2Rpc2FibGVkKSB7XG4gICAgICB0aGlzLl9tYXAuZHJhZ2dpbmcuZGlzYWJsZSgpO1xuICAgICAgdGhpcy5fbWFwLnRvdWNoWm9vbS5kaXNhYmxlKCk7XG4gICAgICB0aGlzLl9tYXAuZG91YmxlQ2xpY2tab29tLmRpc2FibGUoKTtcbiAgICAgIHRoaXMuX21hcC5zY3JvbGxXaGVlbFpvb20uZGlzYWJsZSgpO1xuICAgICAgdGhpcy5fbWFwLmJveFpvb20uZGlzYWJsZSgpO1xuICAgICAgdGhpcy5fbWFwLmtleWJvYXJkLmRpc2FibGUoKTtcbiAgICAgIGlmICh0aGlzLl9tYXAudGFwKSB7XG4gICAgICAgIHRoaXMuX21hcC50YXAuZGlzYWJsZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19