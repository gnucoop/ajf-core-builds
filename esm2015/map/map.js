/**
 * @fileoverview added by tsickle
 * Generated from: src/core/map/map.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
    get map() {
        return this._map;
    }
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
        const options = { zoomControl: false, attributionControl: false };
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
        leafletLib.tileLayer(this._tileLayer, { attribution: this._attribution }).addTo(this._map);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvbWFwL21hcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCQSxPQUFPLEVBRUwsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxLQUFLLEVBRUwsU0FBUyxFQUNULGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEtBQUssQ0FBQyxNQUFNLFNBQVMsQ0FBQztBQUM3QixPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sTUFBTSxDQUFDOztNQUU1QixVQUFVLEdBQUcsQ0FBQyxtQkFBQSxDQUFDLEVBQU8sQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDO0FBRTFDLE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBU25FLE1BQU0sT0FBTyxlQUFlO0lBUDVCO1FBNENVLHdCQUFtQixHQUFpQixZQUFZLENBQUMsS0FBSyxDQUFDO0lBc0VqRSxDQUFDOzs7OztJQXZHQyxJQUNJLFVBQVUsQ0FBQyxVQUFvQjtRQUNqQyxJQUFJLENBQUMsV0FBVyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3JCLENBQUM7Ozs7O0lBR0QsSUFDSSxTQUFTLENBQUMsU0FBaUI7UUFDN0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7UUFDNUIsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDNUIsQ0FBQzs7Ozs7SUFHRCxJQUNJLFdBQVcsQ0FBQyxXQUFtQjtRQUNqQyxJQUFJLENBQUMsWUFBWSxHQUFHLFdBQVcsQ0FBQztRQUNoQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztJQUM1QixDQUFDOzs7OztJQUdELElBQ0ksUUFBUSxDQUFDLFFBQWlCO1FBQzVCLElBQUksQ0FBQyxTQUFT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QUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNwQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUM1QixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUM3QixJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO2dCQUNqQixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQzthQUN6QjtTQUNGO0lBQ0gsQ0FBQzs7O1lBakhGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsU0FBUztnQkFDbkIsc0NBQXVCO2dCQUV2QixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7O2FBQ3RDOzs7MkJBRUUsU0FBUyxTQUFDLHdCQUF3QixFQUFFLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBQzt5QkFHbEQsS0FBSzt3QkFPTCxLQUFLOzBCQU9MLEtBQUs7dUJBT0wsS0FBSzs7OztJQXhCTix1Q0FBNEY7Ozs7O0lBRTVGLHNDQUE4Qjs7Ozs7SUFPOUIscUNBQTJCOzs7OztJQU8zQix1Q0FBNkI7Ozs7O0lBTzdCLG9DQUEyQjs7Ozs7SUFRM0IsK0JBQW9COzs7OztJQUtwQiw4Q0FBK0QiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIFZpZXdDaGlsZCxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBMIGZyb20gJ2xlYWZsZXQnO1xuaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuXG5jb25zdCBsZWFmbGV0TGliID0gKEwgYXMgYW55KS5kZWZhdWx0IHx8IEw7XG5cbmltcG9ydCB7QWpmTWFwQ29udGFpbmVyRGlyZWN0aXZlfSBmcm9tICcuL21hcC1jb250YWluZXItZGlyZWN0aXZlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWpmLW1hcCcsXG4gIHRlbXBsYXRlVXJsOiAnbWFwLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnbWFwLmNzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBBamZNYXBDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuICBAVmlld0NoaWxkKEFqZk1hcENvbnRhaW5lckRpcmVjdGl2ZSwge3N0YXRpYzogdHJ1ZX0pIG1hcENvbnRhaW5lcjogQWpmTWFwQ29udGFpbmVyRGlyZWN0aXZlO1xuXG4gIHByaXZhdGUgX2Nvb3JkaW5hdGU6IG51bWJlcltdO1xuICBASW5wdXQoKVxuICBzZXQgY29vcmRpbmF0ZShjb29yZGluYXRlOiBudW1iZXJbXSkge1xuICAgIHRoaXMuX2Nvb3JkaW5hdGUgPSBjb29yZGluYXRlLnNsaWNlKDApO1xuICAgIHRoaXMuX3NldE1hcFZpZXcoKTtcbiAgfVxuXG4gIHByaXZhdGUgX3RpbGVMYXllcjogc3RyaW5nO1xuICBASW5wdXQoKVxuICBzZXQgdGlsZUxheWVyKHRpbGVMYXllcjogc3RyaW5nKSB7XG4gICAgdGhpcy5fdGlsZUxheWVyID0gdGlsZUxheWVyO1xuICAgIHRoaXMuX2FkZFRpbGVMYXllclRvTWFwKCk7XG4gIH1cblxuICBwcml2YXRlIF9hdHRyaWJ1dGlvbjogc3RyaW5nO1xuICBASW5wdXQoKVxuICBzZXQgYXR0cmlidXRpb24oYXR0cmlidXRpb246IHN0cmluZykge1xuICAgIHRoaXMuX2F0dHJpYnV0aW9uID0gYXR0cmlidXRpb247XG4gICAgdGhpcy5fYWRkVGlsZUxheWVyVG9NYXAoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2Rpc2FibGVkOiBib29sZWFuO1xuICBASW5wdXQoKVxuICBzZXQgZGlzYWJsZWQoZGlzYWJsZWQ6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9kaXNhYmxlZCA9IGRpc2FibGVkO1xuICAgIHRoaXMuX2Rpc2FibGVNYXAoKTtcbiAgfVxuXG5cbiAgcHJpdmF0ZSBfbWFwOiBMLk1hcDtcbiAgZ2V0IG1hcCgpOiBMLk1hcCB7XG4gICAgcmV0dXJuIHRoaXMuX21hcDtcbiAgfVxuXG4gIHByaXZhdGUgX2NvbHVtbldpZHRoQ2hhbmdlZDogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5tYXBDb250YWluZXIpIHtcbiAgICAgIHRoaXMuX2luaXRNYXAoKTtcbiAgICAgIHRoaXMuX3NldE1hcFZpZXcoKTtcbiAgICAgIHRoaXMuX2FkZFRpbGVMYXllclRvTWFwKCk7XG4gICAgICB0aGlzLl9kaXNhYmxlTWFwKCk7XG4gICAgfVxuICB9XG5cbiAgcmVkcmF3KCkge1xuICAgIGlmICh0aGlzLm1hcENvbnRhaW5lciAmJiB0aGlzLl9tYXApIHtcbiAgICAgIHRoaXMuX21hcC5pbnZhbGlkYXRlU2l6ZSgpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX2NvbHVtbldpZHRoQ2hhbmdlZC51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdE1hcCgpOiB2b2lkIHtcbiAgICBjb25zdCBvcHRpb25zID0ge3pvb21Db250cm9sOiBmYWxzZSwgYXR0cmlidXRpb25Db250cm9sOiBmYWxzZX07XG5cbiAgICB0aGlzLl9tYXAgPSBsZWFmbGV0TGliLm1hcCh0aGlzLm1hcENvbnRhaW5lci5odG1sRWxlbWVudCwgb3B0aW9ucyk7XG4gIH1cblxuICBwcml2YXRlIF9zZXRNYXBWaWV3KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9tYXAgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCB4LCB5LCB6O1xuICAgIGlmICh0aGlzLl9jb29yZGluYXRlICE9IG51bGwgJiYgdGhpcy5fY29vcmRpbmF0ZS5sZW5ndGggPT09IDMpIHtcbiAgICAgIHggPSB0aGlzLl9jb29yZGluYXRlWzBdO1xuICAgICAgeSA9IHRoaXMuX2Nvb3JkaW5hdGVbMV07XG4gICAgICB6ID0gdGhpcy5fY29vcmRpbmF0ZVsyXTtcbiAgICB9IGVsc2Uge1xuICAgICAgeCA9IDA7XG4gICAgICB5ID0gMDtcbiAgICAgIHogPSAxNDtcbiAgICB9XG4gICAgdGhpcy5fbWFwLnNldFZpZXcoW3gsIHldLCB6KTtcbiAgfVxuXG4gIHByaXZhdGUgX2FkZFRpbGVMYXllclRvTWFwKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9tYXAgPT0gbnVsbCB8fCB0aGlzLl90aWxlTGF5ZXIgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9tYXAuZWFjaExheWVyKChsKSA9PiB0aGlzLl9tYXAucmVtb3ZlTGF5ZXIobCkpO1xuICAgIGxlYWZsZXRMaWIudGlsZUxheWVyKHRoaXMuX3RpbGVMYXllciwge2F0dHJpYnV0aW9uOiB0aGlzLl9hdHRyaWJ1dGlvbn0pLmFkZFRvKHRoaXMuX21hcCk7XG4gIH1cblxuICBwcml2YXRlIF9kaXNhYmxlTWFwKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9tYXAgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9kaXNhYmxlZCkge1xuICAgICAgdGhpcy5fbWFwLmRyYWdnaW5nLmRpc2FibGUoKTtcbiAgICAgIHRoaXMuX21hcC50b3VjaFpvb20uZGlzYWJsZSgpO1xuICAgICAgdGhpcy5fbWFwLmRvdWJsZUNsaWNrWm9vbS5kaXNhYmxlKCk7XG4gICAgICB0aGlzLl9tYXAuc2Nyb2xsV2hlZWxab29tLmRpc2FibGUoKTtcbiAgICAgIHRoaXMuX21hcC5ib3hab29tLmRpc2FibGUoKTtcbiAgICAgIHRoaXMuX21hcC5rZXlib2FyZC5kaXNhYmxlKCk7XG4gICAgICBpZiAodGhpcy5fbWFwLnRhcCkge1xuICAgICAgICB0aGlzLl9tYXAudGFwLmRpc2FibGUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==