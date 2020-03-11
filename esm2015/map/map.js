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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvbWFwL21hcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCQSxPQUFPLEVBQ1UsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFDN0MsU0FBUyxFQUFFLGlCQUFpQixFQUN4QyxNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBRWxDLE9BQU8sS0FBSyxDQUFDLE1BQU0sU0FBUyxDQUFDOztNQUN2QixVQUFVLEdBQUcsQ0FBQyxtQkFBQSxDQUFDLEVBQU8sQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDO0FBRTFDLE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBU25FLE1BQU0sT0FBTyxlQUFlO0lBUDVCO1FBc0NVLHdCQUFtQixHQUFpQixZQUFZLENBQUMsS0FBSyxDQUFDO0lBcUVqRSxDQUFDOzs7OztJQWhHQyxJQUFhLFVBQVUsQ0FBQyxVQUFvQjtRQUMxQyxJQUFJLENBQUMsV0FBVyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3JCLENBQUM7Ozs7O0lBR0QsSUFBYSxTQUFTLENBQUMsU0FBaUI7UUFDdEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7UUFDNUIsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDNUIsQ0FBQzs7Ozs7SUFHRCxJQUFhLFdBQVcsQ0FBQyxXQUFtQjtRQUMxQyxJQUFJLENBQUMsWUFBWSxHQUFHLFdBQVcsQ0FBQztRQUNoQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztJQUM1QixDQUFDOzs7OztJQUdELElBQWEsUUFBUSxDQUFDLFFBQWlCO1FBQ3JDLElBQUksQ0FBQyxTQUFT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QyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNwQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUM1QixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUM3QixJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO2dCQUNqQixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQzthQUN6QjtTQUNGO0lBQ0gsQ0FBQzs7O1lBMUdGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsU0FBUztnQkFDbkIsc0NBQXVCO2dCQUV2QixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7O2FBQ3RDOzs7MkJBRUUsU0FBUyxTQUFDLHdCQUF3QixFQUFFLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBQzt5QkFHbEQsS0FBSzt3QkFNTCxLQUFLOzBCQU1MLEtBQUs7dUJBTUwsS0FBSzs7OztJQXJCTix1Q0FBNEY7Ozs7O0lBRTVGLHNDQUE4Qjs7Ozs7SUFNOUIscUNBQTJCOzs7OztJQU0zQix1Q0FBNkI7Ozs7O0lBTTdCLG9DQUEyQjs7Ozs7SUFPM0IsK0JBQW9COzs7OztJQUdwQiw4Q0FBK0QiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0LFxuICBPbkRlc3Ryb3ksIFZpZXdDaGlsZCwgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7U3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcblxuaW1wb3J0ICogYXMgTCBmcm9tICdsZWFmbGV0JztcbmNvbnN0IGxlYWZsZXRMaWIgPSAoTCBhcyBhbnkpLmRlZmF1bHQgfHwgTDtcblxuaW1wb3J0IHtBamZNYXBDb250YWluZXJEaXJlY3RpdmV9IGZyb20gJy4vbWFwLWNvbnRhaW5lci1kaXJlY3RpdmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhamYtbWFwJyxcbiAgdGVtcGxhdGVVcmw6ICdtYXAuaHRtbCcsXG4gIHN0eWxlVXJsczogWydtYXAuY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIEFqZk1hcENvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG4gIEBWaWV3Q2hpbGQoQWpmTWFwQ29udGFpbmVyRGlyZWN0aXZlLCB7c3RhdGljOiB0cnVlfSkgbWFwQ29udGFpbmVyOiBBamZNYXBDb250YWluZXJEaXJlY3RpdmU7XG5cbiAgcHJpdmF0ZSBfY29vcmRpbmF0ZTogbnVtYmVyW107XG4gIEBJbnB1dCgpIHNldCBjb29yZGluYXRlKGNvb3JkaW5hdGU6IG51bWJlcltdKSB7XG4gICAgdGhpcy5fY29vcmRpbmF0ZSA9IGNvb3JkaW5hdGUuc2xpY2UoMCk7XG4gICAgdGhpcy5fc2V0TWFwVmlldygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfdGlsZUxheWVyOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHNldCB0aWxlTGF5ZXIodGlsZUxheWVyOiBzdHJpbmcpIHtcbiAgICB0aGlzLl90aWxlTGF5ZXIgPSB0aWxlTGF5ZXI7XG4gICAgdGhpcy5fYWRkVGlsZUxheWVyVG9NYXAoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2F0dHJpYnV0aW9uOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHNldCBhdHRyaWJ1dGlvbihhdHRyaWJ1dGlvbjogc3RyaW5nKSB7XG4gICAgdGhpcy5fYXR0cmlidXRpb24gPSBhdHRyaWJ1dGlvbjtcbiAgICB0aGlzLl9hZGRUaWxlTGF5ZXJUb01hcCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZGlzYWJsZWQ6IGJvb2xlYW47XG4gIEBJbnB1dCgpIHNldCBkaXNhYmxlZChkaXNhYmxlZDogYm9vbGVhbikge1xuICAgIHRoaXMuX2Rpc2FibGVkID0gZGlzYWJsZWQ7XG4gICAgdGhpcy5fZGlzYWJsZU1hcCgpO1xuICB9XG5cblxuICBwcml2YXRlIF9tYXA6IEwuTWFwO1xuICBnZXQgbWFwKCk6IEwuTWFwIHsgcmV0dXJuIHRoaXMuX21hcDsgfVxuXG4gIHByaXZhdGUgX2NvbHVtbldpZHRoQ2hhbmdlZDogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5tYXBDb250YWluZXIpIHtcbiAgICAgIHRoaXMuX2luaXRNYXAoKTtcbiAgICAgIHRoaXMuX3NldE1hcFZpZXcoKTtcbiAgICAgIHRoaXMuX2FkZFRpbGVMYXllclRvTWFwKCk7XG4gICAgICB0aGlzLl9kaXNhYmxlTWFwKCk7XG4gICAgfVxuICB9XG5cbiAgcmVkcmF3KCkge1xuICAgIGlmICh0aGlzLm1hcENvbnRhaW5lciAmJiB0aGlzLl9tYXApIHtcbiAgICAgIHRoaXMuX21hcC5pbnZhbGlkYXRlU2l6ZSgpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX2NvbHVtbldpZHRoQ2hhbmdlZC51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdE1hcCgpOiB2b2lkIHtcbiAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgem9vbUNvbnRyb2w6IGZhbHNlLFxuICAgICAgYXR0cmlidXRpb25Db250cm9sOiBmYWxzZVxuICAgIH07XG5cbiAgICB0aGlzLl9tYXAgPSBsZWFmbGV0TGliLm1hcCh0aGlzLm1hcENvbnRhaW5lci5odG1sRWxlbWVudCwgb3B0aW9ucyk7XG4gIH1cblxuICBwcml2YXRlIF9zZXRNYXBWaWV3KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9tYXAgPT0gbnVsbCkgeyByZXR1cm47IH1cblxuICAgIGxldCB4LCB5LCB6O1xuICAgIGlmICh0aGlzLl9jb29yZGluYXRlICE9IG51bGwgJiYgdGhpcy5fY29vcmRpbmF0ZS5sZW5ndGggPT09IDMpIHtcbiAgICAgIHggPSB0aGlzLl9jb29yZGluYXRlWzBdO1xuICAgICAgeSA9IHRoaXMuX2Nvb3JkaW5hdGVbMV07XG4gICAgICB6ID0gdGhpcy5fY29vcmRpbmF0ZVsyXTtcbiAgICB9IGVsc2Uge1xuICAgICAgeCA9IDA7XG4gICAgICB5ID0gMDtcbiAgICAgIHogPSAxNDtcbiAgICB9XG4gICAgdGhpcy5fbWFwLnNldFZpZXcoW3gsIHldLCB6KTtcbiAgfVxuXG4gIHByaXZhdGUgX2FkZFRpbGVMYXllclRvTWFwKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9tYXAgPT0gbnVsbCB8fCB0aGlzLl90aWxlTGF5ZXIgPT0gbnVsbCkgeyByZXR1cm47IH1cbiAgICB0aGlzLl9tYXAuZWFjaExheWVyKChsKSA9PiB0aGlzLl9tYXAucmVtb3ZlTGF5ZXIobCkpO1xuICAgIGxlYWZsZXRMaWIudGlsZUxheWVyKHRoaXMuX3RpbGVMYXllciwge1xuICAgICAgYXR0cmlidXRpb246IHRoaXMuX2F0dHJpYnV0aW9uXG4gICAgfSkuYWRkVG8odGhpcy5fbWFwKTtcbiAgfVxuXG4gIHByaXZhdGUgX2Rpc2FibGVNYXAoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX21hcCA9PSBudWxsKSB7IHJldHVybjsgfVxuXG4gICAgaWYgKHRoaXMuX2Rpc2FibGVkKSB7XG4gICAgICB0aGlzLl9tYXAuZHJhZ2dpbmcuZGlzYWJsZSgpO1xuICAgICAgdGhpcy5fbWFwLnRvdWNoWm9vbS5kaXNhYmxlKCk7XG4gICAgICB0aGlzLl9tYXAuZG91YmxlQ2xpY2tab29tLmRpc2FibGUoKTtcbiAgICAgIHRoaXMuX21hcC5zY3JvbGxXaGVlbFpvb20uZGlzYWJsZSgpO1xuICAgICAgdGhpcy5fbWFwLmJveFpvb20uZGlzYWJsZSgpO1xuICAgICAgdGhpcy5fbWFwLmtleWJvYXJkLmRpc2FibGUoKTtcbiAgICAgIGlmICh0aGlzLl9tYXAudGFwKSB7XG4gICAgICAgIHRoaXMuX21hcC50YXAuZGlzYWJsZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19