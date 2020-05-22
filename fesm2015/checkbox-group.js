import { __decorate, __metadata } from 'tslib';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { forwardRef, EventEmitter, Input, Output, Directive, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

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
const AJF_CHECKBOX_GROUP_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AjfCheckboxGroup),
    multi: true
};
class AjfCheckboxGroupItemChange {
}
class AjfCheckboxGroupChange {
}
let _uniqueIdCounter = 0;
let AjfCheckboxGroup = /** @class */ (() => {
    let AjfCheckboxGroup = class AjfCheckboxGroup {
        constructor() {
            this.checkboxes = [];
            /** The value for the button toggle group. Should match currently selected button toggle. */
            this._value = [];
            /** Disables all toggles in the group. */
            this._disabled = false;
            /** The currently selected button toggle, should match the value. */
            this._selected = [];
            /** Event emitted when the group's value changes. */
            this._change = new EventEmitter();
            this.change = this._change.asObservable();
            /** onTouch function registered via registerOnTouch (ControlValueAccessor). */
            this.onTouched = () => { };
            /** The method to be called in order to update ngModel. */
            this._controlValueAccessorChangeFn = (_) => { };
        }
        get value() {
            return this._value;
        }
        set value(newValue) {
            if (this._value !== newValue) {
                this._value = newValue;
                this._updateSelectedCheckboxesFromValue();
                this._emitChangeEvent();
            }
        }
        get name() {
            return this._name;
        }
        set name(value) {
            this._name = value;
            this._updateCheckboxesNames();
        }
        get disabled() {
            return this._disabled;
        }
        set disabled(value) {
            this._disabled = coerceBooleanProperty(value);
        }
        get selected() {
            return this._selected;
        }
        set selected(selected) {
            this._selected = selected;
            let values = [];
            if (selected) {
                selected.forEach(c => {
                    values.push(c.value);
                    if (!c.checked) {
                        c.checked = true;
                    }
                });
            }
            this._value = values;
        }
        /**
         * Implemented as part of ControlValueAccessor.
         */
        writeValue(value) {
            this.value = value;
        }
        /**
         * Implemented as part of ControlValueAccessor.
         */
        registerOnChange(fn) {
            this._controlValueAccessorChangeFn = fn;
        }
        /**
         * Implemented as part of ControlValueAccessor.
         */
        registerOnTouched(fn) {
            this.onTouched = fn;
        }
        addValue(value) {
            let curValue = (this._value || []).slice(0);
            if (curValue.indexOf(value) === -1) {
                curValue.push(value);
                this.value = curValue;
            }
        }
        removeValue(value) {
            let curValue = (this._value || []).slice(0);
            let idx = curValue.indexOf(value);
            if (idx > -1) {
                curValue.splice(idx, 1);
                this.value = curValue;
            }
        }
        ngAfterContentInit() {
            this._updateCheckboxesNames();
            this._updateSelectedCheckboxesFromValue();
        }
        registerItem(item) {
            this.checkboxes.push(item);
        }
        _updateCheckboxesNames() {
            if (this.checkboxes == null) {
                return;
            }
            this.checkboxes.forEach((checkbox) => {
                if (checkbox == null) {
                    return;
                }
                checkbox.name = this._name;
            });
        }
        _updateSelectedCheckboxesFromValue() {
            if (this.checkboxes == null) {
                return;
            }
            this.checkboxes.forEach(checkbox => {
                if (checkbox == null) {
                    return;
                }
                if ((this._value || []).indexOf(checkbox.value) > -1) {
                    checkbox.checked = true;
                }
                else {
                    checkbox.checked = false;
                }
            });
        }
        /** Dispatch change event with current selection and group value. */
        _emitChangeEvent() {
            let event = new AjfCheckboxGroupChange();
            event.source = this;
            event.value = this._value;
            this._controlValueAccessorChangeFn(event.value);
            this._change.emit(event);
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], AjfCheckboxGroup.prototype, "value", null);
    __decorate([
        Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], AjfCheckboxGroup.prototype, "name", null);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Object])
    ], AjfCheckboxGroup.prototype, "disabled", null);
    __decorate([
        Output(),
        __metadata("design:type", Observable)
    ], AjfCheckboxGroup.prototype, "change", void 0);
    AjfCheckboxGroup = __decorate([
        Directive({
            selector: 'ajf-checkbox-group,[ajf-checkbox-group]',
            providers: [AJF_CHECKBOX_GROUP_VALUE_ACCESSOR]
        })
    ], AjfCheckboxGroup);
    return AjfCheckboxGroup;
})();
let AjfCheckboxGroupItem = /** @class */ (() => {
    let AjfCheckboxGroupItem = class AjfCheckboxGroupItem {
        constructor(checkboxGroup) {
            /** The unique ID for this button toggle. */
            this._checkboxId = new BehaviorSubject('');
            this.checkboxId = this._checkboxId.asObservable();
            /** Whether or not this button toggle is checked. */
            this._checkedState = new BehaviorSubject(false);
            this.checkedState = this._checkedState.asObservable();
            /** Whether or not this button toggle is disabled. */
            this._disabledState = new BehaviorSubject(false);
            this.disabledState = this._disabledState.asObservable();
            this._checkedIconVal = new BehaviorSubject('');
            this._notCheckedIconVal = new BehaviorSubject('');
            /** Event emitted when the group value changes. */
            this._change = new EventEmitter();
            this.change = this._change.asObservable();
            this.icon = combineLatest(this._checkedState, this._checkedIconVal, this._notCheckedIconVal)
                .pipe(map(r => r[0] ? r[1] : r[2]));
            if (checkboxGroup) {
                this.checkboxGroup = checkboxGroup;
                this.checkboxGroup.registerItem(this);
            }
        }
        set id(id) {
            this._checkboxId.next(id);
        }
        get checked() {
            return this._checkedState.getValue();
        }
        set checked(checked) {
            this._checkedState.next(checked);
        }
        get disabled() {
            const disabled = this._disabledState.getValue();
            return disabled || (this.checkboxGroup != null && this.checkboxGroup.disabled);
        }
        set disabled(disabled) {
            this._disabledState.next(disabled != null && disabled !== false);
        }
        get value() {
            return this._value;
        }
        set value(value) {
            if (this._value !== value) {
                this._value = value;
            }
        }
        get checkedIcon() {
            return this._checkedIconVal.getValue();
        }
        set checkedIcon(icon) {
            this._checkedIconVal.next(icon);
        }
        get notCheckedIcon() {
            return this._notCheckedIconVal.getValue();
        }
        set notCheckedIcon(icon) {
            this._notCheckedIconVal.next(icon);
        }
        ngOnInit() {
            if (this.id == null) {
                this.id = `ajf-checkbox-group-item-${_uniqueIdCounter++}`;
            }
            if (this.checkboxGroup && this.checkboxGroup.value &&
                this.checkboxGroup.value.indexOf(this._value) > -1) {
                this.checked = true;
            }
        }
        /** Checks the button toggle due to an interaction with the underlying native input. */
        onInputChange(event) {
            event.stopPropagation();
            this._toggle();
        }
        /** Toggle the state of the current button toggle. */
        _toggle() {
            this.checked = !this.checked;
            if (this.checkboxGroup != null) {
                if (this.checked) {
                    this.checkboxGroup.addValue(this._value);
                }
                else {
                    this.checkboxGroup.removeValue(this._value);
                }
            }
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], AjfCheckboxGroupItem.prototype, "id", null);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], AjfCheckboxGroupItem.prototype, "name", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], AjfCheckboxGroupItem.prototype, "checked", null);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], AjfCheckboxGroupItem.prototype, "disabled", null);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], AjfCheckboxGroupItem.prototype, "value", null);
    __decorate([
        Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], AjfCheckboxGroupItem.prototype, "checkedIcon", null);
    __decorate([
        Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], AjfCheckboxGroupItem.prototype, "notCheckedIcon", null);
    __decorate([
        Output(),
        __metadata("design:type", Observable)
    ], AjfCheckboxGroupItem.prototype, "change", void 0);
    AjfCheckboxGroupItem = __decorate([
        Directive(),
        __metadata("design:paramtypes", [AjfCheckboxGroup])
    ], AjfCheckboxGroupItem);
    return AjfCheckboxGroupItem;
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
let AjfCheckboxGroupModule = /** @class */ (() => {
    let AjfCheckboxGroupModule = class AjfCheckboxGroupModule {
    };
    AjfCheckboxGroupModule = __decorate([
        NgModule({
            imports: [
                FormsModule,
            ],
            declarations: [
                AjfCheckboxGroup,
            ],
            exports: [
                AjfCheckboxGroup,
            ]
        })
    ], AjfCheckboxGroupModule);
    return AjfCheckboxGroupModule;
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

export { AJF_CHECKBOX_GROUP_VALUE_ACCESSOR, AjfCheckboxGroup, AjfCheckboxGroupChange, AjfCheckboxGroupItem, AjfCheckboxGroupItemChange, AjfCheckboxGroupModule };
//# sourceMappingURL=checkbox-group.js.map
