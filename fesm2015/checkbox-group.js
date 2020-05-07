import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { forwardRef, EventEmitter, Directive, Input, Output, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/checkbox-group/checkbox-group.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const AJF_CHECKBOX_GROUP_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef((/**
     * @return {?}
     */
    () => AjfCheckboxGroup)),
    multi: true
};
/**
 * @template T
 */
class AjfCheckboxGroupItemChange {
}
if (false) {
    /** @type {?} */
    AjfCheckboxGroupItemChange.prototype.source;
    /** @type {?} */
    AjfCheckboxGroupItemChange.prototype.value;
}
/**
 * @template T
 */
class AjfCheckboxGroupChange {
}
if (false) {
    /** @type {?} */
    AjfCheckboxGroupChange.prototype.source;
    /** @type {?} */
    AjfCheckboxGroupChange.prototype.value;
}
/** @type {?} */
let _uniqueIdCounter = 0;
/**
 * @template T
 */
class AjfCheckboxGroup {
    constructor() {
        this.checkboxes = [];
        /**
         * The value for the button toggle group. Should match currently selected button toggle.
         */
        this._value = [];
        /**
         * Disables all toggles in the group.
         */
        this._disabled = false;
        /**
         * The currently selected button toggle, should match the value.
         */
        this._selected = [];
        /**
         * Event emitted when the group's value changes.
         */
        this._change = new EventEmitter();
        this.change = this._change.asObservable();
        /**
         * onTouch function registered via registerOnTouch (ControlValueAccessor).
         */
        this.onTouched = (/**
         * @return {?}
         */
        () => { });
        /**
         * The method to be called in order to update ngModel.
         */
        this._controlValueAccessorChangeFn = (/**
         * @param {?} _
         * @return {?}
         */
        (_) => { });
    }
    /**
     * @return {?}
     */
    get value() {
        return this._value;
    }
    /**
     * @param {?} newValue
     * @return {?}
     */
    set value(newValue) {
        if (this._value !== newValue) {
            this._value = newValue;
            this._updateSelectedCheckboxesFromValue();
            this._emitChangeEvent();
        }
    }
    /**
     * @return {?}
     */
    get name() {
        return this._name;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set name(value) {
        this._name = value;
        this._updateCheckboxesNames();
    }
    /**
     * @return {?}
     */
    get disabled() {
        return this._disabled;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
    }
    /**
     * @return {?}
     */
    get selected() {
        return this._selected;
    }
    /**
     * @param {?} selected
     * @return {?}
     */
    set selected(selected) {
        this._selected = selected;
        /** @type {?} */
        let values = [];
        if (selected) {
            selected.forEach((/**
             * @param {?} c
             * @return {?}
             */
            c => {
                values.push(c.value);
                if (!c.checked) {
                    c.checked = true;
                }
            }));
        }
        this._value = values;
    }
    /**
     * Implemented as part of ControlValueAccessor.
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        this.value = value;
    }
    /**
     * Implemented as part of ControlValueAccessor.
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this._controlValueAccessorChangeFn = fn;
    }
    /**
     * Implemented as part of ControlValueAccessor.
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    addValue(value) {
        /** @type {?} */
        let curValue = (this._value || []).slice(0);
        if (curValue.indexOf(value) === -1) {
            curValue.push(value);
            this.value = curValue;
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    removeValue(value) {
        /** @type {?} */
        let curValue = (this._value || []).slice(0);
        /** @type {?} */
        let idx = curValue.indexOf(value);
        if (idx > -1) {
            curValue.splice(idx, 1);
            this.value = curValue;
        }
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this._updateCheckboxesNames();
        this._updateSelectedCheckboxesFromValue();
    }
    /**
     * @param {?} item
     * @return {?}
     */
    registerItem(item) {
        this.checkboxes.push(item);
    }
    /**
     * @private
     * @return {?}
     */
    _updateCheckboxesNames() {
        if (this.checkboxes == null) {
            return;
        }
        this.checkboxes.forEach((/**
         * @param {?} checkbox
         * @return {?}
         */
        (checkbox) => {
            if (checkbox == null) {
                return;
            }
            checkbox.name = this._name;
        }));
    }
    /**
     * @private
     * @return {?}
     */
    _updateSelectedCheckboxesFromValue() {
        if (this.checkboxes == null) {
            return;
        }
        this.checkboxes.forEach((/**
         * @param {?} checkbox
         * @return {?}
         */
        checkbox => {
            if (checkbox == null) {
                return;
            }
            if ((this._value || []).indexOf(checkbox.value) > -1) {
                checkbox.checked = true;
            }
            else {
                checkbox.checked = false;
            }
        }));
    }
    /**
     * Dispatch change event with current selection and group value.
     * @private
     * @return {?}
     */
    _emitChangeEvent() {
        /** @type {?} */
        let event = new AjfCheckboxGroupChange();
        event.source = this;
        event.value = this._value;
        this._controlValueAccessorChangeFn(event.value);
        this._change.emit(event);
    }
}
AjfCheckboxGroup.decorators = [
    { type: Directive, args: [{
                selector: 'ajf-checkbox-group,[ajf-checkbox-group]',
                providers: [AJF_CHECKBOX_GROUP_VALUE_ACCESSOR]
            },] }
];
AjfCheckboxGroup.propDecorators = {
    value: [{ type: Input }],
    name: [{ type: Input }],
    disabled: [{ type: Input }],
    change: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    AjfCheckboxGroup.ngAcceptInputType_disabled;
    /** @type {?} */
    AjfCheckboxGroup.prototype.checkboxes;
    /**
     * The value for the button toggle group. Should match currently selected button toggle.
     * @type {?}
     * @private
     */
    AjfCheckboxGroup.prototype._value;
    /**
     * The HTML name attribute applied to toggles in this group.
     * @type {?}
     * @private
     */
    AjfCheckboxGroup.prototype._name;
    /**
     * Disables all toggles in the group.
     * @type {?}
     * @private
     */
    AjfCheckboxGroup.prototype._disabled;
    /**
     * The currently selected button toggle, should match the value.
     * @type {?}
     * @private
     */
    AjfCheckboxGroup.prototype._selected;
    /**
     * Event emitted when the group's value changes.
     * @type {?}
     * @private
     */
    AjfCheckboxGroup.prototype._change;
    /** @type {?} */
    AjfCheckboxGroup.prototype.change;
    /**
     * onTouch function registered via registerOnTouch (ControlValueAccessor).
     * @type {?}
     */
    AjfCheckboxGroup.prototype.onTouched;
    /**
     * The method to be called in order to update ngModel.
     * @type {?}
     * @private
     */
    AjfCheckboxGroup.prototype._controlValueAccessorChangeFn;
}
/**
 * @template T
 */
class AjfCheckboxGroupItem {
    /**
     * @param {?=} checkboxGroup
     */
    constructor(checkboxGroup) {
        /**
         * The unique ID for this button toggle.
         */
        this._checkboxId = new BehaviorSubject('');
        this.checkboxId = this._checkboxId.asObservable();
        /**
         * Whether or not this button toggle is checked.
         */
        this._checkedState = new BehaviorSubject(false);
        this.checkedState = this._checkedState.asObservable();
        /**
         * Whether or not this button toggle is disabled.
         */
        this._disabledState = new BehaviorSubject(false);
        this.disabledState = this._disabledState.asObservable();
        this._checkedIconVal = new BehaviorSubject('');
        this._notCheckedIconVal = new BehaviorSubject('');
        /**
         * Event emitted when the group value changes.
         */
        this._change = new EventEmitter();
        this.change = this._change.asObservable();
        this.icon = combineLatest(this._checkedState, this._checkedIconVal, this._notCheckedIconVal)
            .pipe(map((/**
         * @param {?} r
         * @return {?}
         */
        r => r[0] ? r[1] : r[2])));
        if (checkboxGroup) {
            this.checkboxGroup = checkboxGroup;
            this.checkboxGroup.registerItem(this);
        }
    }
    /**
     * @param {?} id
     * @return {?}
     */
    set id(id) {
        this._checkboxId.next(id);
    }
    /**
     * @return {?}
     */
    get checked() {
        return this._checkedState.getValue();
    }
    /**
     * @param {?} checked
     * @return {?}
     */
    set checked(checked) {
        this._checkedState.next(checked);
    }
    /**
     * @return {?}
     */
    get disabled() {
        /** @type {?} */
        const disabled = this._disabledState.getValue();
        return disabled || (this.checkboxGroup != null && this.checkboxGroup.disabled);
    }
    /**
     * @param {?} disabled
     * @return {?}
     */
    set disabled(disabled) {
        this._disabledState.next(disabled != null && disabled !== false);
    }
    /**
     * @return {?}
     */
    get value() {
        return this._value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set value(value) {
        if (this._value !== value) {
            this._value = value;
        }
    }
    /**
     * @return {?}
     */
    get checkedIcon() {
        return this._checkedIconVal.getValue();
    }
    /**
     * @param {?} icon
     * @return {?}
     */
    set checkedIcon(icon) {
        this._checkedIconVal.next(icon);
    }
    /**
     * @return {?}
     */
    get notCheckedIcon() {
        return this._notCheckedIconVal.getValue();
    }
    /**
     * @param {?} icon
     * @return {?}
     */
    set notCheckedIcon(icon) {
        this._notCheckedIconVal.next(icon);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.id == null) {
            this.id = `ajf-checkbox-group-item-${_uniqueIdCounter++}`;
        }
        if (this.checkboxGroup && this.checkboxGroup.value &&
            this.checkboxGroup.value.indexOf(this._value) > -1) {
            this.checked = true;
        }
    }
    /**
     * Checks the button toggle due to an interaction with the underlying native input.
     * @param {?} event
     * @return {?}
     */
    onInputChange(event) {
        event.stopPropagation();
        this._toggle();
    }
    /**
     * Toggle the state of the current button toggle.
     * @private
     * @return {?}
     */
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
}
AjfCheckboxGroupItem.decorators = [
    { type: Directive }
];
/** @nocollapse */
AjfCheckboxGroupItem.ctorParameters = () => [
    { type: AjfCheckboxGroup }
];
AjfCheckboxGroupItem.propDecorators = {
    id: [{ type: Input }],
    name: [{ type: Input }],
    checked: [{ type: Input }],
    disabled: [{ type: Input }],
    value: [{ type: Input }],
    checkedIcon: [{ type: Input }],
    notCheckedIcon: [{ type: Input }],
    change: [{ type: Output }]
};
if (false) {
    /**
     * The unique ID for this button toggle.
     * @type {?}
     * @private
     */
    AjfCheckboxGroupItem.prototype._checkboxId;
    /** @type {?} */
    AjfCheckboxGroupItem.prototype.checkboxId;
    /** @type {?} */
    AjfCheckboxGroupItem.prototype.name;
    /**
     * The parent button toggle group (exclusive selection). Optional.
     * @type {?}
     */
    AjfCheckboxGroupItem.prototype.checkboxGroup;
    /**
     * Whether or not this button toggle is checked.
     * @type {?}
     * @private
     */
    AjfCheckboxGroupItem.prototype._checkedState;
    /** @type {?} */
    AjfCheckboxGroupItem.prototype.checkedState;
    /**
     * Whether or not this button toggle is disabled.
     * @type {?}
     * @private
     */
    AjfCheckboxGroupItem.prototype._disabledState;
    /** @type {?} */
    AjfCheckboxGroupItem.prototype.disabledState;
    /**
     * Value assigned to this button toggle.
     * @type {?}
     * @private
     */
    AjfCheckboxGroupItem.prototype._value;
    /**
     * @type {?}
     * @private
     */
    AjfCheckboxGroupItem.prototype._checkedIconVal;
    /**
     * @type {?}
     * @private
     */
    AjfCheckboxGroupItem.prototype._notCheckedIconVal;
    /** @type {?} */
    AjfCheckboxGroupItem.prototype.icon;
    /**
     * Event emitted when the group value changes.
     * @type {?}
     * @private
     */
    AjfCheckboxGroupItem.prototype._change;
    /** @type {?} */
    AjfCheckboxGroupItem.prototype.change;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/checkbox-group/checkbox-group-module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfCheckboxGroupModule {
}
AjfCheckboxGroupModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    FormsModule,
                ],
                declarations: [
                    AjfCheckboxGroup,
                ],
                exports: [
                    AjfCheckboxGroup,
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/checkbox-group/public-api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * Generated bundle index. Do not edit.
 */

export { AJF_CHECKBOX_GROUP_VALUE_ACCESSOR, AjfCheckboxGroup, AjfCheckboxGroupChange, AjfCheckboxGroupItem, AjfCheckboxGroupItemChange, AjfCheckboxGroupModule };
//# sourceMappingURL=checkbox-group.js.map
