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
import { ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { AjfFormRendererService } from './form-renderer';
import { AjfFieldInstance } from './interface/fields-instances/field-instance';
import { AjfWarningAlertService } from './warning-alert-service';
export declare abstract class AjfBaseFieldComponent<T extends AjfFieldInstance = AjfFieldInstance> implements OnDestroy, OnInit {
    protected _changeDetectorRef: ChangeDetectorRef;
    private _service;
    private _warningAlertService;
    private _instance;
    instance: T;
    private _control;
    readonly control: Observable<AbstractControl | null>;
    private _warningTriggerSub;
    private _instanceUpdateSub;
    constructor(_changeDetectorRef: ChangeDetectorRef, _service: AjfFormRendererService, _warningAlertService: AjfWarningAlertService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    protected _onInstanceChange(): void;
    private _setUpInstanceUpdate;
}
