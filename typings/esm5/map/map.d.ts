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
import { AfterViewInit, OnDestroy } from '@angular/core';
import * as L from 'leaflet';
import { AjfMapContainerDirective } from './map-container-directive';
export declare class AjfMapComponent implements AfterViewInit, OnDestroy {
    mapContainer: AjfMapContainerDirective;
    private _coordinate;
    coordinate: number[];
    private _tileLayer;
    tileLayer: string;
    private _attribution;
    attribution: string;
    private _disabled;
    disabled: boolean;
    private _map;
    readonly map: L.Map;
    private _columnWidthChanged;
    ngAfterViewInit(): void;
    redraw(): void;
    ngOnDestroy(): void;
    private _initMap;
    private _setMapView;
    private _addTileLayerToMap;
    private _disableMap;
}
