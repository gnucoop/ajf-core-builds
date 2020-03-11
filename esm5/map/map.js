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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvbWFwL21hcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQ1UsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFDN0MsU0FBUyxFQUFFLGlCQUFpQixFQUN4QyxNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBRWxDLE9BQU8sS0FBSyxDQUFDLE1BQU0sU0FBUyxDQUFDO0FBQzdCLElBQU0sVUFBVSxHQUFJLENBQVMsQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDO0FBRTNDLE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBRW5FO0lBQUE7UUFzQ1Usd0JBQW1CLEdBQWlCLFlBQVksQ0FBQyxLQUFLLENBQUM7SUFxRWpFLENBQUM7SUFoR0Msc0JBQWEsdUNBQVU7YUFBdkIsVUFBd0IsVUFBb0I7WUFDMUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNyQixDQUFDOzs7T0FBQTtJQUdELHNCQUFhLHNDQUFTO2FBQXRCLFVBQXVCLFNBQWlCO1lBQ3RDLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO1lBQzVCLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBQzVCLENBQUM7OztPQUFBO0lBR0Qsc0JBQWEsd0NBQVc7YUFBeEIsVUFBeUIsV0FBbUI7WUFDMUMsSUFBSSxDQUFDLFlBQVksR0FBRyxXQUFXLENBQUM7WUFDaEMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFDNUIsQ0FBQzs7O09BQUE7SUFHRCxzQkFBYSxxQ0FBUTthQUFyQixVQUFz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Q0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQzlCLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ3BDLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ3BDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQzVCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQzdCLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7Z0JBQ2pCLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO2FBQ3pCO1NBQ0Y7SUFDSCxDQUFDOztnQkExR0YsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxTQUFTO29CQUNuQixzQ0FBdUI7b0JBRXZCLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTs7aUJBQ3RDOzs7K0JBRUUsU0FBUyxTQUFDLHdCQUF3QixFQUFFLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBQzs2QkFHbEQsS0FBSzs0QkFNTCxLQUFLOzhCQU1MLEtBQUs7MkJBTUwsS0FBSzs7SUE4RVIsc0JBQUM7Q0FBQSxBQTNHRCxJQTJHQztTQXBHWSxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge1xuICBBZnRlclZpZXdJbml0LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dCxcbiAgT25EZXN0cm95LCBWaWV3Q2hpbGQsIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCAqIGFzIEwgZnJvbSAnbGVhZmxldCc7XG5jb25zdCBsZWFmbGV0TGliID0gKEwgYXMgYW55KS5kZWZhdWx0IHx8IEw7XG5cbmltcG9ydCB7QWpmTWFwQ29udGFpbmVyRGlyZWN0aXZlfSBmcm9tICcuL21hcC1jb250YWluZXItZGlyZWN0aXZlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWpmLW1hcCcsXG4gIHRlbXBsYXRlVXJsOiAnbWFwLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnbWFwLmNzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBBamZNYXBDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuICBAVmlld0NoaWxkKEFqZk1hcENvbnRhaW5lckRpcmVjdGl2ZSwge3N0YXRpYzogdHJ1ZX0pIG1hcENvbnRhaW5lcjogQWpmTWFwQ29udGFpbmVyRGlyZWN0aXZlO1xuXG4gIHByaXZhdGUgX2Nvb3JkaW5hdGU6IG51bWJlcltdO1xuICBASW5wdXQoKSBzZXQgY29vcmRpbmF0ZShjb29yZGluYXRlOiBudW1iZXJbXSkge1xuICAgIHRoaXMuX2Nvb3JkaW5hdGUgPSBjb29yZGluYXRlLnNsaWNlKDApO1xuICAgIHRoaXMuX3NldE1hcFZpZXcoKTtcbiAgfVxuXG4gIHByaXZhdGUgX3RpbGVMYXllcjogc3RyaW5nO1xuICBASW5wdXQoKSBzZXQgdGlsZUxheWVyKHRpbGVMYXllcjogc3RyaW5nKSB7XG4gICAgdGhpcy5fdGlsZUxheWVyID0gdGlsZUxheWVyO1xuICAgIHRoaXMuX2FkZFRpbGVMYXllclRvTWFwKCk7XG4gIH1cblxuICBwcml2YXRlIF9hdHRyaWJ1dGlvbjogc3RyaW5nO1xuICBASW5wdXQoKSBzZXQgYXR0cmlidXRpb24oYXR0cmlidXRpb246IHN0cmluZykge1xuICAgIHRoaXMuX2F0dHJpYnV0aW9uID0gYXR0cmlidXRpb247XG4gICAgdGhpcy5fYWRkVGlsZUxheWVyVG9NYXAoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2Rpc2FibGVkOiBib29sZWFuO1xuICBASW5wdXQoKSBzZXQgZGlzYWJsZWQoZGlzYWJsZWQ6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9kaXNhYmxlZCA9IGRpc2FibGVkO1xuICAgIHRoaXMuX2Rpc2FibGVNYXAoKTtcbiAgfVxuXG5cbiAgcHJpdmF0ZSBfbWFwOiBMLk1hcDtcbiAgZ2V0IG1hcCgpOiBMLk1hcCB7IHJldHVybiB0aGlzLl9tYXA7IH1cblxuICBwcml2YXRlIF9jb2x1bW5XaWR0aENoYW5nZWQ6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubWFwQ29udGFpbmVyKSB7XG4gICAgICB0aGlzLl9pbml0TWFwKCk7XG4gICAgICB0aGlzLl9zZXRNYXBWaWV3KCk7XG4gICAgICB0aGlzLl9hZGRUaWxlTGF5ZXJUb01hcCgpO1xuICAgICAgdGhpcy5fZGlzYWJsZU1hcCgpO1xuICAgIH1cbiAgfVxuXG4gIHJlZHJhdygpIHtcbiAgICBpZiAodGhpcy5tYXBDb250YWluZXIgJiYgdGhpcy5fbWFwKSB7XG4gICAgICB0aGlzLl9tYXAuaW52YWxpZGF0ZVNpemUoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9jb2x1bW5XaWR0aENoYW5nZWQudW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRNYXAoKTogdm9pZCB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgIHpvb21Db250cm9sOiBmYWxzZSxcbiAgICAgIGF0dHJpYnV0aW9uQ29udHJvbDogZmFsc2VcbiAgICB9O1xuXG4gICAgdGhpcy5fbWFwID0gbGVhZmxldExpYi5tYXAodGhpcy5tYXBDb250YWluZXIuaHRtbEVsZW1lbnQsIG9wdGlvbnMpO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2V0TWFwVmlldygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fbWFwID09IG51bGwpIHsgcmV0dXJuOyB9XG5cbiAgICBsZXQgeCwgeSwgejtcbiAgICBpZiAodGhpcy5fY29vcmRpbmF0ZSAhPSBudWxsICYmIHRoaXMuX2Nvb3JkaW5hdGUubGVuZ3RoID09PSAzKSB7XG4gICAgICB4ID0gdGhpcy5fY29vcmRpbmF0ZVswXTtcbiAgICAgIHkgPSB0aGlzLl9jb29yZGluYXRlWzFdO1xuICAgICAgeiA9IHRoaXMuX2Nvb3JkaW5hdGVbMl07XG4gICAgfSBlbHNlIHtcbiAgICAgIHggPSAwO1xuICAgICAgeSA9IDA7XG4gICAgICB6ID0gMTQ7XG4gICAgfVxuICAgIHRoaXMuX21hcC5zZXRWaWV3KFt4LCB5XSwgeik7XG4gIH1cblxuICBwcml2YXRlIF9hZGRUaWxlTGF5ZXJUb01hcCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fbWFwID09IG51bGwgfHwgdGhpcy5fdGlsZUxheWVyID09IG51bGwpIHsgcmV0dXJuOyB9XG4gICAgdGhpcy5fbWFwLmVhY2hMYXllcigobCkgPT4gdGhpcy5fbWFwLnJlbW92ZUxheWVyKGwpKTtcbiAgICBsZWFmbGV0TGliLnRpbGVMYXllcih0aGlzLl90aWxlTGF5ZXIsIHtcbiAgICAgIGF0dHJpYnV0aW9uOiB0aGlzLl9hdHRyaWJ1dGlvblxuICAgIH0pLmFkZFRvKHRoaXMuX21hcCk7XG4gIH1cblxuICBwcml2YXRlIF9kaXNhYmxlTWFwKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9tYXAgPT0gbnVsbCkgeyByZXR1cm47IH1cblxuICAgIGlmICh0aGlzLl9kaXNhYmxlZCkge1xuICAgICAgdGhpcy5fbWFwLmRyYWdnaW5nLmRpc2FibGUoKTtcbiAgICAgIHRoaXMuX21hcC50b3VjaFpvb20uZGlzYWJsZSgpO1xuICAgICAgdGhpcy5fbWFwLmRvdWJsZUNsaWNrWm9vbS5kaXNhYmxlKCk7XG4gICAgICB0aGlzLl9tYXAuc2Nyb2xsV2hlZWxab29tLmRpc2FibGUoKTtcbiAgICAgIHRoaXMuX21hcC5ib3hab29tLmRpc2FibGUoKTtcbiAgICAgIHRoaXMuX21hcC5rZXlib2FyZC5kaXNhYmxlKCk7XG4gICAgICBpZiAodGhpcy5fbWFwLnRhcCkge1xuICAgICAgICB0aGlzLl9tYXAudGFwLmRpc2FibGUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==