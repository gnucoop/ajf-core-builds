import { Directive, ElementRef, Component, ChangeDetectionStrategy, ViewEncapsulation, ViewChild, Input, NgModule } from '@angular/core';
import * as L from 'leaflet';
import L__default from 'leaflet';
import { Subscription } from 'rxjs';

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
var AjfMapContainerDirective = /** @class */ (function () {
    function AjfMapContainerDirective(_el) {
        this._el = _el;
    }
    Object.defineProperty(AjfMapContainerDirective.prototype, "htmlElement", {
        get: function () {
            return this._el.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
    AjfMapContainerDirective.decorators = [
        { type: Directive, args: [{ selector: '[mapContainer]' },] }
    ];
    /** @nocollapse */
    AjfMapContainerDirective.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    return AjfMapContainerDirective;
}());

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
var leafletLib = L__default || L;
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
var AjfMapModule = /** @class */ (function () {
    function AjfMapModule() {
    }
    AjfMapModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        AjfMapComponent,
                        AjfMapContainerDirective,
                    ],
                    exports: [
                        AjfMapComponent,
                    ],
                },] }
    ];
    return AjfMapModule;
}());

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

/**
 * Generated bundle index. Do not edit.
 */

export { AjfMapComponent, AjfMapModule, AjfMapContainerDirective as ɵgc_ajf_src_core_map_map_a };
//# sourceMappingURL=map.js.map
