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
import { AfterContentInit, OnInit } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { Observable } from 'rxjs';
export declare const AJF_CHECKBOX_GROUP_VALUE_ACCESSOR: any;
export declare class AjfCheckboxGroupItemChange<T> {
    source: AjfCheckboxGroupItem<T>;
    value: any;
}
export declare class AjfCheckboxGroupChange<T> {
    source: AjfCheckboxGroup<T>;
    value: any;
}
export declare class AjfCheckboxGroup<T> implements AfterContentInit, ControlValueAccessor {
    checkboxes: AjfCheckboxGroupItem<T>[];
    /** The value for the button toggle group. Should match currently selected button toggle. */
    private _value;
    value: T[];
    /** The HTML name attribute applied to toggles in this group. */
    private _name;
    name: string;
    /** Disables all toggles in the group. */
    private _disabled;
    disabled: boolean;
    /** The currently selected button toggle, should match the value. */
    private _selected;
    selected: AjfCheckboxGroupItem<T>[];
    /** Event emitted when the group's value changes. */
    private _change;
    readonly change: Observable<AjfCheckboxGroupChange<T>>;
    /** onTouch function registered via registerOnTouch (ControlValueAccessor). */
    onTouched: () => any;
    /**
     * Implemented as part of ControlValueAccessor.
     */
    writeValue(value: T[]): void;
    /**
     * Implemented as part of ControlValueAccessor.
     */
    registerOnChange(fn: (value: T[]) => void): void;
    /**
     * Implemented as part of ControlValueAccessor.
     */
    registerOnTouched(fn: any): void;
    addValue(value: T): void;
    removeValue(value: T): void;
    ngAfterContentInit(): void;
    registerItem(item: AjfCheckboxGroupItem<T>): void;
    /** The method to be called in order to update ngModel. */
    private _controlValueAccessorChangeFn;
    private _updateCheckboxesNames;
    private _updateSelectedCheckboxesFromValue;
    /** Dispatch change event with current selection and group value. */
    private _emitChangeEvent;
}
export declare class AjfCheckboxGroupItem<T> implements OnInit {
    /** The unique ID for this button toggle. */
    private _checkboxId;
    readonly checkboxId: Observable<string>;
    id: string;
    name: string;
    /** The parent button toggle group (exclusive selection). Optional. */
    readonly checkboxGroup: AjfCheckboxGroup<T>;
    /** Whether or not this button toggle is checked. */
    private _checkedState;
    readonly checkedState: Observable<boolean>;
    checked: boolean;
    /** Whether or not this button toggle is disabled. */
    private _disabledState;
    readonly disabledState: Observable<boolean>;
    disabled: boolean;
    /** Value assigned to this button toggle. */
    private _value;
    value: T;
    protected _readonly: boolean;
    readonly: boolean;
    private _checkedIconVal;
    checkedIcon: string;
    private _notCheckedIconVal;
    notCheckedIcon: string;
    readonly icon: Observable<string>;
    /** Event emitted when the group value changes. */
    private _change;
    readonly change: Observable<AjfCheckboxGroupItemChange<T>>;
    constructor(checkboxGroup?: AjfCheckboxGroup<T>);
    ngOnInit(): void;
    /** Checks the button toggle due to an interaction with the underlying native input. */
    onInputChange(event: Event): void;
    /** Toggle the state of the current button toggle. */
    private _toggle;
}
