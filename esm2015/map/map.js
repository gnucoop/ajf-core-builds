/**
 * @fileoverview added by tsickle
 * Generated from: src/core/map/map.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
/** @type {?} */
const leafletLib = ((/** @type {?} */ (L))).default || L;
import { AjfMapContainerDirective } from './map-container-directive';
export class AjfMapComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvbWFwL21hcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCQSxPQUFPLEVBQ1UsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFDN0MsU0FBUyxFQUFFLGlCQUFpQixFQUN4QyxNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBRWxDLE9BQU8sS0FBSyxDQUFDLE1BQU0sU0FBUyxDQUFDOztNQUN2QixVQUFVLEdBQUcsQ0FBQyxtQkFBQSxDQUFDLEVBQU8sQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDO0FBRTFDLE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBU25FLE1BQU0sT0FBTyxlQUFlO0lBUDVCO1FBc0NVLHdCQUFtQixHQUFpQixZQUFZLENBQUMsS0FBSyxDQUFDO0lBcUVqRSxDQUFDOzs7OztJQWhHQyxJQUFhLFVBQVUsQ0FBQyxVQUFvQjtRQUMxQyxJQUFJLENBQUMsV0FBVyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3JCLENBQUM7Ozs7O0lBR0QsSUFBYSxTQUFTLENBQUMsU0FBaUI7UUFDdEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7UUFDNUIsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDNUIsQ0FBQzs7Ozs7SUFHRCxJQUFhLFdBQVcsQ0FBQyxXQUFtQjtRQUMxQyxJQUFJLENBQUMsWUFBWSxHQUFHLFdBQVcsQ0FBQztRQUNoQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztJQUM1QixDQUFDOzs7OztJQUdELElBQWEsUUFBUSxDQUFDLFFBQWlCO1FBQ3JDLElBQUksQ0FBQyxTQUFT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QyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNwQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUM1QixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUM3QixJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO2dCQUNqQixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQzthQUN6QjtTQUNGO0lBQ0gsQ0FBQzs7O1lBMUdGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsU0FBUztnQkFDbkIsc0NBQXVCO2dCQUV2QixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7O2FBQ3RDOzs7MkJBRUUsU0FBUyxTQUFDLHdCQUF3QixFQUFFLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBQzt5QkFHbEQsS0FBSzt3QkFNTCxLQUFLOzBCQU1MLEtBQUs7dUJBTUwsS0FBSzs7OztJQXJCTix1Q0FBNEY7Ozs7O0lBRTVGLHNDQUE4Qjs7Ozs7SUFNOUIscUNBQTJCOzs7OztJQU0zQix1Q0FBNkI7Ozs7O0lBTTdCLG9DQUEyQjs7Ozs7SUFPM0IsK0JBQW9COzs7OztJQUdwQiw4Q0FBK0QiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTggR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQsXG4gIE9uRGVzdHJveSwgVmlld0NoaWxkLCBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgKiBhcyBMIGZyb20gJ2xlYWZsZXQnO1xuY29uc3QgbGVhZmxldExpYiA9IChMIGFzIGFueSkuZGVmYXVsdCB8fCBMO1xuXG5pbXBvcnQge0FqZk1hcENvbnRhaW5lckRpcmVjdGl2ZX0gZnJvbSAnLi9tYXAtY29udGFpbmVyLWRpcmVjdGl2ZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FqZi1tYXAnLFxuICB0ZW1wbGF0ZVVybDogJ21hcC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ21hcC5jc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgQWpmTWFwQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcbiAgQFZpZXdDaGlsZChBamZNYXBDb250YWluZXJEaXJlY3RpdmUsIHtzdGF0aWM6IHRydWV9KSBtYXBDb250YWluZXI6IEFqZk1hcENvbnRhaW5lckRpcmVjdGl2ZTtcblxuICBwcml2YXRlIF9jb29yZGluYXRlOiBudW1iZXJbXTtcbiAgQElucHV0KCkgc2V0IGNvb3JkaW5hdGUoY29vcmRpbmF0ZTogbnVtYmVyW10pIHtcbiAgICB0aGlzLl9jb29yZGluYXRlID0gY29vcmRpbmF0ZS5zbGljZSgwKTtcbiAgICB0aGlzLl9zZXRNYXBWaWV3KCk7XG4gIH1cblxuICBwcml2YXRlIF90aWxlTGF5ZXI6IHN0cmluZztcbiAgQElucHV0KCkgc2V0IHRpbGVMYXllcih0aWxlTGF5ZXI6IHN0cmluZykge1xuICAgIHRoaXMuX3RpbGVMYXllciA9IHRpbGVMYXllcjtcbiAgICB0aGlzLl9hZGRUaWxlTGF5ZXJUb01hcCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfYXR0cmlidXRpb246IHN0cmluZztcbiAgQElucHV0KCkgc2V0IGF0dHJpYnV0aW9uKGF0dHJpYnV0aW9uOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9hdHRyaWJ1dGlvbiA9IGF0dHJpYnV0aW9uO1xuICAgIHRoaXMuX2FkZFRpbGVMYXllclRvTWFwKCk7XG4gIH1cblxuICBwcml2YXRlIF9kaXNhYmxlZDogYm9vbGVhbjtcbiAgQElucHV0KCkgc2V0IGRpc2FibGVkKGRpc2FibGVkOiBib29sZWFuKSB7XG4gICAgdGhpcy5fZGlzYWJsZWQgPSBkaXNhYmxlZDtcbiAgICB0aGlzLl9kaXNhYmxlTWFwKCk7XG4gIH1cblxuXG4gIHByaXZhdGUgX21hcDogTC5NYXA7XG4gIGdldCBtYXAoKTogTC5NYXAgeyByZXR1cm4gdGhpcy5fbWFwOyB9XG5cbiAgcHJpdmF0ZSBfY29sdW1uV2lkdGhDaGFuZ2VkOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm1hcENvbnRhaW5lcikge1xuICAgICAgdGhpcy5faW5pdE1hcCgpO1xuICAgICAgdGhpcy5fc2V0TWFwVmlldygpO1xuICAgICAgdGhpcy5fYWRkVGlsZUxheWVyVG9NYXAoKTtcbiAgICAgIHRoaXMuX2Rpc2FibGVNYXAoKTtcbiAgICB9XG4gIH1cblxuICByZWRyYXcoKSB7XG4gICAgaWYgKHRoaXMubWFwQ29udGFpbmVyICYmIHRoaXMuX21hcCkge1xuICAgICAgdGhpcy5fbWFwLmludmFsaWRhdGVTaXplKCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5fY29sdW1uV2lkdGhDaGFuZ2VkLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0TWFwKCk6IHZvaWQge1xuICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICB6b29tQ29udHJvbDogZmFsc2UsXG4gICAgICBhdHRyaWJ1dGlvbkNvbnRyb2w6IGZhbHNlXG4gICAgfTtcblxuICAgIHRoaXMuX21hcCA9IGxlYWZsZXRMaWIubWFwKHRoaXMubWFwQ29udGFpbmVyLmh0bWxFbGVtZW50LCBvcHRpb25zKTtcbiAgfVxuXG4gIHByaXZhdGUgX3NldE1hcFZpZXcoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX21hcCA9PSBudWxsKSB7IHJldHVybjsgfVxuXG4gICAgbGV0IHgsIHksIHo7XG4gICAgaWYgKHRoaXMuX2Nvb3JkaW5hdGUgIT0gbnVsbCAmJiB0aGlzLl9jb29yZGluYXRlLmxlbmd0aCA9PT0gMykge1xuICAgICAgeCA9IHRoaXMuX2Nvb3JkaW5hdGVbMF07XG4gICAgICB5ID0gdGhpcy5fY29vcmRpbmF0ZVsxXTtcbiAgICAgIHogPSB0aGlzLl9jb29yZGluYXRlWzJdO1xuICAgIH0gZWxzZSB7XG4gICAgICB4ID0gMDtcbiAgICAgIHkgPSAwO1xuICAgICAgeiA9IDE0O1xuICAgIH1cbiAgICB0aGlzLl9tYXAuc2V0VmlldyhbeCwgeV0sIHopO1xuICB9XG5cbiAgcHJpdmF0ZSBfYWRkVGlsZUxheWVyVG9NYXAoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX21hcCA9PSBudWxsIHx8IHRoaXMuX3RpbGVMYXllciA9PSBudWxsKSB7IHJldHVybjsgfVxuICAgIHRoaXMuX21hcC5lYWNoTGF5ZXIoKGwpID0+IHRoaXMuX21hcC5yZW1vdmVMYXllcihsKSk7XG4gICAgbGVhZmxldExpYi50aWxlTGF5ZXIodGhpcy5fdGlsZUxheWVyLCB7XG4gICAgICBhdHRyaWJ1dGlvbjogdGhpcy5fYXR0cmlidXRpb25cbiAgICB9KS5hZGRUbyh0aGlzLl9tYXApO1xuICB9XG5cbiAgcHJpdmF0ZSBfZGlzYWJsZU1hcCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fbWFwID09IG51bGwpIHsgcmV0dXJuOyB9XG5cbiAgICBpZiAodGhpcy5fZGlzYWJsZWQpIHtcbiAgICAgIHRoaXMuX21hcC5kcmFnZ2luZy5kaXNhYmxlKCk7XG4gICAgICB0aGlzLl9tYXAudG91Y2hab29tLmRpc2FibGUoKTtcbiAgICAgIHRoaXMuX21hcC5kb3VibGVDbGlja1pvb20uZGlzYWJsZSgpO1xuICAgICAgdGhpcy5fbWFwLnNjcm9sbFdoZWVsWm9vbS5kaXNhYmxlKCk7XG4gICAgICB0aGlzLl9tYXAuYm94Wm9vbS5kaXNhYmxlKCk7XG4gICAgICB0aGlzLl9tYXAua2V5Ym9hcmQuZGlzYWJsZSgpO1xuICAgICAgaWYgKHRoaXMuX21hcC50YXApIHtcbiAgICAgICAgdGhpcy5fbWFwLnRhcC5kaXNhYmxlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=