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
let AjfMapContainerDirective = /** @class */ (() => {
    class AjfMapContainerDirective {
        constructor(_el) {
            this._el = _el;
        }
        get htmlElement() {
            return this._el.nativeElement;
        }
    }
    AjfMapContainerDirective.decorators = [
        { type: Directive, args: [{ selector: '[mapContainer]' },] }
    ];
    /** @nocollapse */
    AjfMapContainerDirective.ctorParameters = () => [
        { type: ElementRef }
    ];
    return AjfMapContainerDirective;
})();

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
const leafletLib = L__default || L;
let AjfMapComponent = /** @class */ (() => {
    class AjfMapComponent {
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
    }
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
})();

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
let AjfMapModule = /** @class */ (() => {
    class AjfMapModule {
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
})();

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
