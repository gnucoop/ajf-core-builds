/**
 * @fileoverview added by tsickle
 * Generated from: src/core/checkbox-group/checkbox-group.ts
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
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Directive, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
/** @type {?} */
export const AJF_CHECKBOX_GROUP_VALUE_ACCESSOR = {
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
export class AjfCheckboxGroupItemChange {
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
export class AjfCheckboxGroupChange {
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
export class AjfCheckboxGroup {
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
export class AjfCheckboxGroupItem {
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
    get readonly() {
        return this._readonly;
    }
    /**
     * @param {?} readonly
     * @return {?}
     */
    set readonly(readonly) {
        this._readonly = coerceBooleanProperty(readonly);
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
    readonly: [{ type: Input }],
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
     * @protected
     */
    AjfCheckboxGroupItem.prototype._readonly;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3gtZ3JvdXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9jaGVja2JveC1ncm91cC9jaGVja2JveC1ncm91cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCQSxPQUFPLEVBQWUscUJBQXFCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUMxRSxPQUFPLEVBRUwsU0FBUyxFQUNULFlBQVksRUFDWixVQUFVLEVBQ1YsS0FBSyxFQUVMLE1BQU0sRUFDUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQXVCLGlCQUFpQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDdkUsT0FBTyxFQUFDLGVBQWUsRUFBRSxhQUFhLEVBQUUsVUFBVSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQ2hFLE9BQU8sRUFBQyxHQUFHLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQzs7QUFHbkMsTUFBTSxPQUFPLGlDQUFpQyxHQUFRO0lBQ3BELE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVU7OztJQUFDLEdBQUcsRUFBRSxDQUFDLGdCQUFnQixFQUFDO0lBQy9DLEtBQUssRUFBRSxJQUFJO0NBQ1o7Ozs7QUFFRCxNQUFNLE9BQU8sMEJBQTBCO0NBR3RDOzs7SUFGQyw0Q0FBZ0M7O0lBQ2hDLDJDQUFXOzs7OztBQUdiLE1BQU0sT0FBTyxzQkFBc0I7Q0FHbEM7OztJQUZDLHdDQUE0Qjs7SUFDNUIsdUNBQVc7OztJQUdULGdCQUFnQixHQUFHLENBQUM7Ozs7QUFPeEIsTUFBTSxPQUFPLGdCQUFnQjtJQUo3QjtRQUtFLGVBQVUsR0FBOEIsRUFBRSxDQUFDOzs7O1FBR25DLFdBQU0sR0FBUSxFQUFFLENBQUM7Ozs7UUF5QmpCLGNBQVMsR0FBWSxLQUFLLENBQUM7Ozs7UUFVM0IsY0FBUyxHQUE4QixFQUFFLENBQUM7Ozs7UUFtQjFDLFlBQU8sR0FDWCxJQUFJ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RTs7SUFDL0UsMENBQTBFOztJQU8xRSxvQ0FBc0I7Ozs7O0lBR3RCLDZDQUE0Qzs7Ozs7O0lBRzVDLDZDQUFzRjs7SUFDdEYsNENBQStFOzs7Ozs7SUFVL0UsOENBQXVGOztJQUN2Riw2Q0FBaUY7Ozs7OztJQVdqRixzQ0FBa0I7Ozs7O0lBV2xCLHlDQUE2Qjs7Ozs7SUFTN0IsK0NBQW1GOzs7OztJQVNuRixrREFBc0Y7O0lBU3RGLG9DQUFrQzs7Ozs7O0lBR2xDLHVDQUNzRDs7SUFDdEQsc0NBQ3lGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0Jvb2xlYW5JbnB1dCwgY29lcmNlQm9vbGVhblByb3BlcnR5fSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgRGlyZWN0aXZlLFxuICBFdmVudEVtaXR0ZXIsXG4gIGZvcndhcmRSZWYsXG4gIElucHV0LFxuICBPbkluaXQsXG4gIE91dHB1dFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge0JlaGF2aW9yU3ViamVjdCwgY29tYmluZUxhdGVzdCwgT2JzZXJ2YWJsZX0gZnJvbSAncnhqcyc7XG5pbXBvcnQge21hcH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5cbmV4cG9ydCBjb25zdCBBSkZfQ0hFQ0tCT1hfR1JPVVBfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IEFqZkNoZWNrYm94R3JvdXApLFxuICBtdWx0aTogdHJ1ZVxufTtcblxuZXhwb3J0IGNsYXNzIEFqZkNoZWNrYm94R3JvdXBJdGVtQ2hhbmdlPFQ+IHtcbiAgc291cmNlOiBBamZDaGVja2JveEdyb3VwSXRlbTxUPjtcbiAgdmFsdWU6IGFueTtcbn1cblxuZXhwb3J0IGNsYXNzIEFqZkNoZWNrYm94R3JvdXBDaGFuZ2U8VD4ge1xuICBzb3VyY2U6IEFqZkNoZWNrYm94R3JvdXA8VD47XG4gIHZhbHVlOiBhbnk7XG59XG5cbmxldCBfdW5pcXVlSWRDb3VudGVyID0gMDtcblxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdhamYtY2hlY2tib3gtZ3JvdXAsW2FqZi1jaGVja2JveC1ncm91cF0nLFxuICBwcm92aWRlcnM6IFtBSkZfQ0hFQ0tCT1hfR1JPVVBfVkFMVUVfQUNDRVNTT1JdXG59KVxuZXhwb3J0IGNsYXNzIEFqZkNoZWNrYm94R3JvdXA8VD4gaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gIGNoZWNrYm94ZXM6IEFqZkNoZWNrYm94R3JvdXBJdGVtPFQ+W10gPSBbXTtcblxuICAvKiogVGhlIHZhbHVlIGZvciB0aGUgYnV0dG9uIHRvZ2dsZSBncm91cC4gU2hvdWxkIG1hdGNoIGN1cnJlbnRseSBzZWxlY3RlZCBidXR0b24gdG9nZ2xlLiAqL1xuICBwcml2YXRlIF92YWx1ZTogVFtdID0gW107XG4gIGdldCB2YWx1ZSgpOiBUW10ge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgdmFsdWUobmV3VmFsdWU6IFRbXSkge1xuICAgIGlmICh0aGlzLl92YWx1ZSAhPT0gbmV3VmFsdWUpIHtcbiAgICAgIHRoaXMuX3ZhbHVlID0gbmV3VmFsdWU7XG4gICAgICB0aGlzLl91cGRhdGVTZWxlY3RlZENoZWNrYm94ZXNGcm9tVmFsdWUoKTtcbiAgICAgIHRoaXMuX2VtaXRDaGFuZ2VFdmVudCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBUaGUgSFRNTCBuYW1lIGF0dHJpYnV0ZSBhcHBsaWVkIHRvIHRvZ2dsZXMgaW4gdGhpcyBncm91cC4gKi9cbiAgcHJpdmF0ZSBfbmFtZTogc3RyaW5nO1xuICBnZXQgbmFtZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9uYW1lO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBuYW1lKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9uYW1lID0gdmFsdWU7XG4gICAgdGhpcy5fdXBkYXRlQ2hlY2tib3hlc05hbWVzKCk7XG4gIH1cblxuICAvKiogRGlzYWJsZXMgYWxsIHRvZ2dsZXMgaW4gdGhlIGdyb3VwLiAqL1xuICBwcml2YXRlIF9kaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBkaXNhYmxlZCh2YWx1ZSkge1xuICAgIHRoaXMuX2Rpc2FibGVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuXG4gIC8qKiBUaGUgY3VycmVudGx5IHNlbGVjdGVkIGJ1dHRvbiB0b2dnbGUsIHNob3VsZCBtYXRjaCB0aGUgdmFsdWUuICovXG4gIHByaXZhdGUgX3NlbGVjdGVkOiBBamZDaGVja2JveEdyb3VwSXRlbTxUPltdID0gW107XG4gIGdldCBzZWxlY3RlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWQ7XG4gIH1cbiAgc2V0IHNlbGVjdGVkKHNlbGVjdGVkOiBBamZDaGVja2JveEdyb3VwSXRlbTxUPltdKSB7XG4gICAgdGhpcy5fc2VsZWN0ZWQgPSBzZWxlY3RlZDtcbiAgICBsZXQgdmFsdWVzOiBUW10gPSBbXTtcbiAgICBpZiAoc2VsZWN0ZWQpIHtcbiAgICAgIHNlbGVjdGVkLmZvckVhY2goYyA9PiB7XG4gICAgICAgIHZhbHVlcy5wdXNoKGMudmFsdWUpO1xuICAgICAgICBpZiAoIWMuY2hlY2tlZCkge1xuICAgICAgICAgIGMuY2hlY2tlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICB0aGlzLl92YWx1ZSA9IHZhbHVlcztcbiAgfVxuXG4gIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIGdyb3VwJ3MgdmFsdWUgY2hhbmdlcy4gKi9cbiAgcHJpdmF0ZSBfY2hhbmdlOiBFdmVudEVtaXR0ZXI8QWpmQ2hlY2tib3hHcm91cENoYW5nZTxUPj4gPVxuICAgICAgbmV3IEV2ZW50RW1pdHRlcjxBamZDaGVja2JveEdyb3VwQ2hhbmdlPFQ+PigpO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgY2hhbmdlOiBPYnNlcnZhYmxlPEFqZkNoZWNrYm94R3JvdXBDaGFuZ2U8VD4+ID0gdGhpcy5fY2hhbmdlLmFzT2JzZXJ2YWJsZSgpO1xuXG4gIC8qKiBvblRvdWNoIGZ1bmN0aW9uIHJlZ2lzdGVyZWQgdmlhIHJlZ2lzdGVyT25Ub3VjaCAoQ29udHJvbFZhbHVlQWNjZXNzb3IpLiAqL1xuICBvblRvdWNoZWQ6ICgpID0+IGFueSA9ICgpID0+IHt9O1xuXG4gIC8qKlxuICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIENvbnRyb2xWYWx1ZUFjY2Vzc29yLlxuICAgKi9cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogVFtdKSB7XG4gICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gICAqL1xuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAodmFsdWU6IFRbXSkgPT4gdm9pZCkge1xuICAgIHRoaXMuX2NvbnRyb2xWYWx1ZUFjY2Vzc29yQ2hhbmdlRm4gPSBmbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIENvbnRyb2xWYWx1ZUFjY2Vzc29yLlxuICAgKi9cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSkge1xuICAgIHRoaXMub25Ub3VjaGVkID0gZm47XG4gIH1cblxuICBhZGRWYWx1ZSh2YWx1ZTogVCkge1xuICAgIGxldCBjdXJWYWx1ZSA9ICh0aGlzLl92YWx1ZSB8fCBbXSkuc2xpY2UoMCk7XG4gICAgaWYgKGN1clZhbHVlLmluZGV4T2YodmFsdWUpID09PSAtMSkge1xuICAgICAgY3VyVmFsdWUucHVzaCh2YWx1ZSk7XG4gICAgICB0aGlzLnZhbHVlID0gY3VyVmFsdWU7XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlVmFsdWUodmFsdWU6IFQpIHtcbiAgICBsZXQgY3VyVmFsdWUgPSAodGhpcy5fdmFsdWUgfHwgW10pLnNsaWNlKDApO1xuICAgIGxldCBpZHggPSBjdXJWYWx1ZS5pbmRleE9mKHZhbHVlKTtcbiAgICBpZiAoaWR4ID4gLTEpIHtcbiAgICAgIGN1clZhbHVlLnNwbGljZShpZHgsIDEpO1xuICAgICAgdGhpcy52YWx1ZSA9IGN1clZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLl91cGRhdGVDaGVja2JveGVzTmFtZXMoKTtcbiAgICB0aGlzLl91cGRhdGVTZWxlY3RlZENoZWNrYm94ZXNGcm9tVmFsdWUoKTtcbiAgfVxuXG4gIHJlZ2lzdGVySXRlbShpdGVtOiBBamZDaGVja2JveEdyb3VwSXRlbTxUPik6IHZvaWQge1xuICAgIHRoaXMuY2hlY2tib3hlcy5wdXNoKGl0ZW0pO1xuICB9XG5cbiAgLyoqIFRoZSBtZXRob2QgdG8gYmUgY2FsbGVkIGluIG9yZGVyIHRvIHVwZGF0ZSBuZ01vZGVsLiAqL1xuICBwcml2YXRlIF9jb250cm9sVmFsdWVBY2Nlc3NvckNoYW5nZUZuOiAodmFsdWU6IGFueSkgPT4gdm9pZCA9IChfKSA9PiB7fTtcblxuICBwcml2YXRlIF91cGRhdGVDaGVja2JveGVzTmFtZXMoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY2hlY2tib3hlcyA9PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuY2hlY2tib3hlcy5mb3JFYWNoKChjaGVja2JveCkgPT4ge1xuICAgICAgaWYgKGNoZWNrYm94ID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY2hlY2tib3gubmFtZSA9IHRoaXMuX25hbWU7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVTZWxlY3RlZENoZWNrYm94ZXNGcm9tVmFsdWUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY2hlY2tib3hlcyA9PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuY2hlY2tib3hlcy5mb3JFYWNoKGNoZWNrYm94ID0+IHtcbiAgICAgIGlmIChjaGVja2JveCA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmICgodGhpcy5fdmFsdWUgfHwgW10pLmluZGV4T2YoY2hlY2tib3gudmFsdWUpID4gLTEpIHtcbiAgICAgICAgY2hlY2tib3guY2hlY2tlZCA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjaGVja2JveC5jaGVja2VkID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKiogRGlzcGF0Y2ggY2hhbmdlIGV2ZW50IHdpdGggY3VycmVudCBzZWxlY3Rpb24gYW5kIGdyb3VwIHZhbHVlLiAqL1xuICBwcml2YXRlIF9lbWl0Q2hhbmdlRXZlbnQoKTogdm9pZCB7XG4gICAgbGV0IGV2ZW50ID0gbmV3IEFqZkNoZWNrYm94R3JvdXBDaGFuZ2U8VD4oKTtcbiAgICBldmVudC5zb3VyY2UgPSB0aGlzO1xuICAgIGV2ZW50LnZhbHVlID0gdGhpcy5fdmFsdWU7XG4gICAgdGhpcy5fY29udHJvbFZhbHVlQWNjZXNzb3JDaGFuZ2VGbihldmVudC52YWx1ZSk7XG4gICAgdGhpcy5fY2hhbmdlLmVtaXQoZXZlbnQpO1xuICB9XG5cbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2Rpc2FibGVkOiBCb29sZWFuSW5wdXQ7XG59XG5cbkBEaXJlY3RpdmUoKVxuZXhwb3J0IGNsYXNzIEFqZkNoZWNrYm94R3JvdXBJdGVtPFQ+IGltcGxlbWVudHMgT25Jbml0IHtcbiAgLyoqIFRoZSB1bmlxdWUgSUQgZm9yIHRoaXMgYnV0dG9uIHRvZ2dsZS4gKi9cbiAgcHJpdmF0ZSBfY2hlY2tib3hJZDogQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJycpO1xuICByZWFkb25seSBjaGVja2JveElkOiBPYnNlcnZhYmxlPHN0cmluZz4gPSB0aGlzLl9jaGVja2JveElkLmFzT2JzZXJ2YWJsZSgpO1xuXG4gIEBJbnB1dCgpXG4gIHNldCBpZChpZDogc3RyaW5nKSB7XG4gICAgdGhpcy5fY2hlY2tib3hJZC5uZXh0KGlkKTtcbiAgfVxuXG4gIEBJbnB1dCgpIG5hbWU6IHN0cmluZztcblxuICAvKiogVGhlIHBhcmVudCBidXR0b24gdG9nZ2xlIGdyb3VwIChleGNsdXNpdmUgc2VsZWN0aW9uKS4gT3B0aW9uYWwuICovXG4gIHJlYWRvbmx5IGNoZWNrYm94R3JvdXA6IEFqZkNoZWNrYm94R3JvdXA8VD47XG5cbiAgLyoqIFdoZXRoZXIgb3Igbm90IHRoaXMgYnV0dG9uIHRvZ2dsZSBpcyBjaGVja2VkLiAqL1xuICBwcml2YXRlIF9jaGVja2VkU3RhdGU6IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICByZWFkb25seSBjaGVja2VkU3RhdGU6IE9ic2VydmFibGU8Ym9vbGVhbj4gPSB0aGlzLl9jaGVja2VkU3RhdGUuYXNPYnNlcnZhYmxlKCk7XG4gIGdldCBjaGVja2VkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9jaGVja2VkU3RhdGUuZ2V0VmFsdWUoKTtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgY2hlY2tlZChjaGVja2VkOiBib29sZWFuKSB7XG4gICAgdGhpcy5fY2hlY2tlZFN0YXRlLm5leHQoY2hlY2tlZCk7XG4gIH1cblxuICAvKiogV2hldGhlciBvciBub3QgdGhpcyBidXR0b24gdG9nZ2xlIGlzIGRpc2FibGVkLiAqL1xuICBwcml2YXRlIF9kaXNhYmxlZFN0YXRlOiBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgcmVhZG9ubHkgZGlzYWJsZWRTdGF0ZTogT2JzZXJ2YWJsZTxib29sZWFuPiA9IHRoaXMuX2Rpc2FibGVkU3RhdGUuYXNPYnNlcnZhYmxlKCk7XG4gIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICBjb25zdCBkaXNhYmxlZCA9IHRoaXMuX2Rpc2FibGVkU3RhdGUuZ2V0VmFsdWUoKTtcbiAgICByZXR1cm4gZGlzYWJsZWQgfHwgKHRoaXMuY2hlY2tib3hHcm91cCAhPSBudWxsICYmIHRoaXMuY2hlY2tib3hHcm91cC5kaXNhYmxlZCk7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IGRpc2FibGVkKGRpc2FibGVkOiBib29sZWFuKSB7XG4gICAgdGhpcy5fZGlzYWJsZWRTdGF0ZS5uZXh0KGRpc2FibGVkICE9IG51bGwgJiYgZGlzYWJsZWQgIT09IGZhbHNlKTtcbiAgfVxuXG4gIC8qKiBWYWx1ZSBhc3NpZ25lZCB0byB0aGlzIGJ1dHRvbiB0b2dnbGUuICovXG4gIHByaXZhdGUgX3ZhbHVlOiBUO1xuICBnZXQgdmFsdWUoKTogVCB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCB2YWx1ZSh2YWx1ZTogVCkge1xuICAgIGlmICh0aGlzLl92YWx1ZSAhPT0gdmFsdWUpIHtcbiAgICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIF9yZWFkb25seTogYm9vbGVhbjtcbiAgZ2V0IHJlYWRvbmx5KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9yZWFkb25seTtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgcmVhZG9ubHkocmVhZG9ubHk6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9yZWFkb25seSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eShyZWFkb25seSk7XG4gIH1cblxuICBwcml2YXRlIF9jaGVja2VkSWNvblZhbDogQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJycpO1xuICBnZXQgY2hlY2tlZEljb24oKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fY2hlY2tlZEljb25WYWwuZ2V0VmFsdWUoKTtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgY2hlY2tlZEljb24oaWNvbjogc3RyaW5nKSB7XG4gICAgdGhpcy5fY2hlY2tlZEljb25WYWwubmV4dChpY29uKTtcbiAgfVxuXG4gIHByaXZhdGUgX25vdENoZWNrZWRJY29uVmFsOiBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignJyk7XG4gIGdldCBub3RDaGVja2VkSWNvbigpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9ub3RDaGVja2VkSWNvblZhbC5nZXRWYWx1ZSgpO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBub3RDaGVja2VkSWNvbihpY29uOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9ub3RDaGVja2VkSWNvblZhbC5uZXh0KGljb24pO1xuICB9XG5cbiAgcmVhZG9ubHkgaWNvbjogT2JzZXJ2YWJsZTxzdHJpbmc+O1xuXG4gIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIGdyb3VwIHZhbHVlIGNoYW5nZXMuICovXG4gIHByaXZhdGUgX2NoYW5nZTogRXZlbnRFbWl0dGVyPEFqZkNoZWNrYm94R3JvdXBJdGVtQ2hhbmdlPFQ+PiA9XG4gICAgICBuZXcgRXZlbnRFbWl0dGVyPEFqZkNoZWNrYm94R3JvdXBJdGVtQ2hhbmdlPFQ+PigpO1xuICBAT3V0cHV0KClcbiAgcmVhZG9ubHkgY2hhbmdlOiBPYnNlcnZhYmxlPEFqZkNoZWNrYm94R3JvdXBJdGVtQ2hhbmdlPFQ+PiA9IHRoaXMuX2NoYW5nZS5hc09ic2VydmFibGUoKTtcblxuICBjb25zdHJ1Y3RvcihjaGVja2JveEdyb3VwPzogQWpmQ2hlY2tib3hHcm91cDxUPikge1xuICAgIHRoaXMuaWNvbiA9IGNvbWJpbmVMYXRlc3QodGhpcy5fY2hlY2tlZFN0YXRlLCB0aGlzLl9jaGVja2VkSWNvblZhbCwgdGhpcy5fbm90Q2hlY2tlZEljb25WYWwpXG4gICAgICAgICAgICAgICAgICAgIC5waXBlKG1hcChyID0+IHJbMF0gPyByWzFdIDogclsyXSkpO1xuXG4gICAgaWYgKGNoZWNrYm94R3JvdXApIHtcbiAgICAgIHRoaXMuY2hlY2tib3hHcm91cCA9IGNoZWNrYm94R3JvdXA7XG4gICAgICB0aGlzLmNoZWNrYm94R3JvdXAucmVnaXN0ZXJJdGVtKHRoaXMpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICh0aGlzLmlkID09IG51bGwpIHtcbiAgICAgIHRoaXMuaWQgPSBgYWpmLWNoZWNrYm94LWdyb3VwLWl0ZW0tJHtfdW5pcXVlSWRDb3VudGVyKyt9YDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5jaGVja2JveEdyb3VwICYmIHRoaXMuY2hlY2tib3hHcm91cC52YWx1ZSAmJlxuICAgICAgICB0aGlzLmNoZWNrYm94R3JvdXAudmFsdWUuaW5kZXhPZih0aGlzLl92YWx1ZSkgPiAtMSkge1xuICAgICAgdGhpcy5jaGVja2VkID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICAvKiogQ2hlY2tzIHRoZSBidXR0b24gdG9nZ2xlIGR1ZSB0byBhbiBpbnRlcmFjdGlvbiB3aXRoIHRoZSB1bmRlcmx5aW5nIG5hdGl2ZSBpbnB1dC4gKi9cbiAgb25JbnB1dENoYW5nZShldmVudDogRXZlbnQpIHtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgIHRoaXMuX3RvZ2dsZSgpO1xuICB9XG5cbiAgLyoqIFRvZ2dsZSB0aGUgc3RhdGUgb2YgdGhlIGN1cnJlbnQgYnV0dG9uIHRvZ2dsZS4gKi9cbiAgcHJpdmF0ZSBfdG9nZ2xlKCk6IHZvaWQge1xuICAgIHRoaXMuY2hlY2tlZCA9ICF0aGlzLmNoZWNrZWQ7XG5cbiAgICBpZiAodGhpcy5jaGVja2JveEdyb3VwICE9IG51bGwpIHtcbiAgICAgIGlmICh0aGlzLmNoZWNrZWQpIHtcbiAgICAgICAgdGhpcy5jaGVja2JveEdyb3VwLmFkZFZhbHVlKHRoaXMuX3ZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY2hlY2tib3hHcm91cC5yZW1vdmVWYWx1ZSh0aGlzLl92YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=