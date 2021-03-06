(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('leaflet'), require('rxjs')) :
    typeof define === 'function' && define.amd ? define('@ajf/core/map', ['exports', '@angular/core', 'leaflet', 'rxjs'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.ajf = global.ajf || {}, global.ajf.core = global.ajf.core || {}, global.ajf.core.map = {}), global.ng.core, global.leaflet, global.rxjs));
}(this, (function (exports, core, leaflet, rxjs) { 'use strict';

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
            enumerable: false,
            configurable: true
        });
        return AjfMapContainerDirective;
    }());
    AjfMapContainerDirective.decorators = [
        { type: core.Directive, args: [{ selector: '[mapContainer]' },] }
    ];
    AjfMapContainerDirective.ctorParameters = function () { return [
        { type: core.ElementRef }
    ]; };

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
    var AjfMapComponent = /** @class */ (function () {
        function AjfMapComponent() {
            this._columnWidthChanged = rxjs.Subscription.EMPTY;
        }
        Object.defineProperty(AjfMapComponent.prototype, "coordinate", {
            set: function (coordinate) {
                this._coordinate = coordinate.slice(0);
                this._setMapView();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AjfMapComponent.prototype, "tileLayer", {
            set: function (tl) {
                this._tileLayer = tl;
                this._addTileLayerToMap();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AjfMapComponent.prototype, "attribution", {
            set: function (attribution) {
                this._attribution = attribution;
                this._addTileLayerToMap();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AjfMapComponent.prototype, "disabled", {
            set: function (disabled) {
                this._disabled = disabled;
                this._disableMap();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AjfMapComponent.prototype, "map", {
            get: function () {
                return this._map;
            },
            enumerable: false,
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
            this._map = leaflet.map(this.mapContainer.htmlElement, options);
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
            leaflet.tileLayer(this._tileLayer, { attribution: this._attribution }).addTo(this._map);
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
        return AjfMapComponent;
    }());
    AjfMapComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'ajf-map',
                    template: "<div mapContainer></div>\n",
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    encapsulation: core.ViewEncapsulation.None,
                    styles: ["ajf-map{display:block;position:relative;width:100%;min-height:200px}ajf-map [mapContainer]{position:absolute;min-width:100px;width:100%;height:100%}\n"]
                },] }
    ];
    AjfMapComponent.propDecorators = {
        mapContainer: [{ type: core.ViewChild, args: [AjfMapContainerDirective, { static: true },] }],
        coordinate: [{ type: core.Input }],
        tileLayer: [{ type: core.Input }],
        attribution: [{ type: core.Input }],
        disabled: [{ type: core.Input }]
    };

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
        return AjfMapModule;
    }());
    AjfMapModule.decorators = [
        { type: core.NgModule, args: [{
                    declarations: [
                        AjfMapComponent,
                        AjfMapContainerDirective,
                    ],
                    exports: [
                        AjfMapComponent,
                    ],
                },] }
    ];

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

    exports.AjfMapComponent = AjfMapComponent;
    exports.AjfMapModule = AjfMapModule;
    exports.ɵgc_ajf_src_core_map_map_a = AjfMapContainerDirective;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=core-map.umd.js.map
