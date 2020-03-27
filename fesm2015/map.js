import { Directive, ElementRef, Component, ChangeDetectionStrategy, ViewEncapsulation, ViewChild, Input, NgModule } from '@angular/core';
import { Subscription } from 'rxjs';
import * as L from 'leaflet';
import L__default from 'leaflet';

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/map/map-container-directive.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfMapContainerDirective {
    /**
     * @param {?} _el
     */
    constructor(_el) {
        this._el = _el;
    }
    /**
     * @return {?}
     */
    get htmlElement() { return this._el.nativeElement; }
}
AjfMapContainerDirective.decorators = [
    { type: Directive, args: [{
                selector: '[mapContainer]'
            },] }
];
/** @nocollapse */
AjfMapContainerDirective.ctorParameters = () => [
    { type: ElementRef }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    AjfMapContainerDirective.prototype._el;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/map/map.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const leafletLib = L__default || L;
class AjfMapComponent {
    constructor() {
        this._columnWidthChanged = Subscription.EMPTY;
    }
    /**
     * @param {?} coordinate
     * @return {?}
     */
    set coordinate(coordinate) {
        this._coordinate = coordinate.slice(0);
        this._setMapView();
    }
    /**
     * @param {?} tileLayer
     * @return {?}
     */
    set tileLayer(tileLayer) {
        this._tileLayer = tileLayer;
        this._addTileLayerToMap();
    }
    /**
     * @param {?} attribution
     * @return {?}
     */
    set attribution(attribution) {
        this._attribution = attribution;
        this._addTileLayerToMap();
    }
    /**
     * @param {?} disabled
     * @return {?}
     */
    set disabled(disabled) {
        this._disabled = disabled;
        this._disableMap();
    }
    /**
     * @return {?}
     */
    get map() { return this._map; }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        if (this.mapContainer) {
            this._initMap();
            this._setMapView();
            this._addTileLayerToMap();
            this._disableMap();
        }
    }
    /**
     * @return {?}
     */
    redraw() {
        if (this.mapContainer && this._map) {
            this._map.invalidateSize();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._columnWidthChanged.unsubscribe();
    }
    /**
     * @private
     * @return {?}
     */
    _initMap() {
        /** @type {?} */
        const options = {
            zoomControl: false,
            attributionControl: false
        };
        this._map = leafletLib.map(this.mapContainer.htmlElement, options);
    }
    /**
     * @private
     * @return {?}
     */
    _setMapView() {
        if (this._map == null) {
            return;
        }
        /** @type {?} */
        let x;
        /** @type {?} */
        let y;
        /** @type {?} */
        let z;
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
    /**
     * @private
     * @return {?}
     */
    _addTileLayerToMap() {
        if (this._map == null || this._tileLayer == null) {
            return;
        }
        this._map.eachLayer((/**
         * @param {?} l
         * @return {?}
         */
        (l) => this._map.removeLayer(l)));
        leafletLib.tileLayer(this._tileLayer, {
            attribution: this._attribution
        }).addTo(this._map);
    }
    /**
     * @private
     * @return {?}
     */
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
if (false) {
    /** @type {?} */
    AjfMapComponent.prototype.mapContainer;
    /**
     * @type {?}
     * @private
     */
    AjfMapComponent.prototype._coordinate;
    /**
     * @type {?}
     * @private
     */
    AjfMapComponent.prototype._tileLayer;
    /**
     * @type {?}
     * @private
     */
    AjfMapComponent.prototype._attribution;
    /**
     * @type {?}
     * @private
     */
    AjfMapComponent.prototype._disabled;
    /**
     * @type {?}
     * @private
     */
    AjfMapComponent.prototype._map;
    /**
     * @type {?}
     * @private
     */
    AjfMapComponent.prototype._columnWidthChanged;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/map/map-module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfMapModule {
}
AjfMapModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    AjfMapComponent,
                    AjfMapContainerDirective
                ],
                exports: [
                    AjfMapComponent
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/map/public-api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * Generated bundle index. Do not edit.
 */

export { AjfMapComponent, AjfMapModule, AjfMapContainerDirective as ɵgc_ajf_src_core_map_map_a };
//# sourceMappingURL=map.js.map
