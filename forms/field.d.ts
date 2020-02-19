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
import { ChangeDetectorRef, ComponentFactoryResolver, OnDestroy, OnInit } from '@angular/core';
import { AjfFieldComponentsMap } from './interface/fields/field-components-map';
import { AjfFieldInstance } from './interface/fields-instances/field-instance';
import { AjfFieldHost } from './field-host';
export declare abstract class AjfFormField implements OnDestroy, OnInit {
    private _cdr;
    private _cfr;
    fieldHost: AjfFieldHost;
    private _instance;
    get instance(): AjfFieldInstance;
    set instance(instance: AjfFieldInstance);
    private _readonly;
    get readonly(): boolean;
    set readonly(readonly: boolean);
    private _componentInstance;
    protected abstract componentsMap: AjfFieldComponentsMap;
    private _updatedSub;
    constructor(_cdr: ChangeDetectorRef, _cfr: ComponentFactoryResolver);
    ngOnDestroy(): void;
    ngOnInit(): void;
    private _loadComponent;
}
