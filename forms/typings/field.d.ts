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
import { AfterViewInit, ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { AjfFieldType, AjfFieldWithChoices } from './nodes';
import { AjfDateFieldInstance, AjfEmptyFieldInstance, AjfFieldInstance, AjfFieldWithChoicesInstance, AjfTableFieldInstance } from './nodes-instances';
import { AjfFormRendererService } from './form-renderer';
export interface AjfFormFieldWarningAlertResult {
    result: boolean;
}
export declare class AjfFormFieldValueChanged {
    field: AjfFormField;
}
export declare abstract class AjfFormField implements AfterViewInit, OnDestroy, OnInit {
    protected _rendererService: AjfFormRendererService;
    protected _changeDetectionRef: ChangeDetectorRef;
    ajfFieldTypes: typeof AjfFieldType;
    control: Observable<AbstractControl | null>;
    private _fieldInstance;
    fieldInstance: AjfFieldInstance;
    readonly fwcInst: AjfFieldWithChoicesInstance;
    readonly fwc: AjfFieldWithChoices;
    readonly datefInst: AjfDateFieldInstance;
    readonly tablefInst: AjfTableFieldInstance;
    readonly emptyfInst: AjfEmptyFieldInstance;
    singleChoiceSelect: any;
    multipleChoiceSelect: any;
    private _valueChanged;
    readonly valueChanged: Observable<AjfFormFieldValueChanged>;
    private _triggerSelectionSubscription;
    private _triggerWarningSubscription;
    private _fieldUpdateSubscription;
    /**
     * this constructor will init _rendererService _changeDetectionRef _alertCtrl
     * and init the messagesWarning subscription
     */
    constructor(_rendererService: AjfFormRendererService, _changeDetectionRef: ChangeDetectorRef);
    abstract showWarningAlertPrompt(messagesWarning: string[]): Observable<AjfFormFieldWarningAlertResult>;
    /**
     * this method will init the control, the filtere choices and the change
     * detection reference
     */
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    private _triggerSelection;
}
