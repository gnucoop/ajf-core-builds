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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3gtZ3JvdXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9jaGVja2JveC1ncm91cC9jaGVja2JveC1ncm91cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCQSxPQUFPLEVBQWUscUJBQXFCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUMxRSxPQUFPLEVBRUwsU0FBUyxFQUNULFlBQVksRUFDWixVQUFVLEVBQ1YsS0FBSyxFQUVMLE1BQU0sRUFDUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQXVCLGlCQUFpQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDdkUsT0FBTyxFQUFDLGVBQWUsRUFBRSxhQUFhLEVBQUUsVUFBVSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQ2hFLE9BQU8sRUFBQyxHQUFHLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQzs7QUFHbkMsTUFBTSxPQUFPLGlDQUFpQyxHQUFRO0lBQ3BELE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVU7OztJQUFDLEdBQUcsRUFBRSxDQUFDLGdCQUFnQixFQUFDO0lBQy9DLEtBQUssRUFBRSxJQUFJO0NBQ1o7Ozs7QUFFRCxNQUFNLE9BQU8sMEJBQTBCO0NBR3RDOzs7SUFGQyw0Q0FBZ0M7O0lBQ2hDLDJDQUFXOzs7OztBQUdiLE1BQU0sT0FBTyxzQkFBc0I7Q0FHbEM7OztJQUZDLHdDQUE0Qjs7SUFDNUIsdUNBQVc7OztJQUdULGdCQUFnQixHQUFHLENBQUM7Ozs7QUFPeEIsTUFBTSxPQUFPLGdCQUFnQjtJQUo3QjtRQUtFLGVBQVUsR0FBOEIsRUFBRSxDQUFDOzs7O1FBR25DLFdBQU0sR0FBUSxFQUFFLENBQUM7Ozs7UUF5QmpCLGNBQVMsR0FBWSxLQUFLLENBQUM7Ozs7UUFVM0IsY0FBUyxHQUE4QixFQUFFLENBQUM7Ozs7UUFtQjFDLFlBQU8sR0FDWCxJQUFJ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SUFTdEYsb0NBQWtDOzs7Ozs7SUFHbEMsdUNBQ3NEOztJQUN0RCxzQ0FDeUYiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7Qm9vbGVhbklucHV0LCBjb2VyY2VCb29sZWFuUHJvcGVydHl9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge1xuICBBZnRlckNvbnRlbnRJbml0LFxuICBEaXJlY3RpdmUsXG4gIEV2ZW50RW1pdHRlcixcbiAgZm9yd2FyZFJlZixcbiAgSW5wdXQsXG4gIE9uSW5pdCxcbiAgT3V0cHV0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1J9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7QmVoYXZpb3JTdWJqZWN0LCBjb21iaW5lTGF0ZXN0LCBPYnNlcnZhYmxlfSBmcm9tICdyeGpzJztcbmltcG9ydCB7bWFwfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cblxuZXhwb3J0IGNvbnN0IEFKRl9DSEVDS0JPWF9HUk9VUF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gQWpmQ2hlY2tib3hHcm91cCksXG4gIG11bHRpOiB0cnVlXG59O1xuXG5leHBvcnQgY2xhc3MgQWpmQ2hlY2tib3hHcm91cEl0ZW1DaGFuZ2U8VD4ge1xuICBzb3VyY2U6IEFqZkNoZWNrYm94R3JvdXBJdGVtPFQ+O1xuICB2YWx1ZTogYW55O1xufVxuXG5leHBvcnQgY2xhc3MgQWpmQ2hlY2tib3hHcm91cENoYW5nZTxUPiB7XG4gIHNvdXJjZTogQWpmQ2hlY2tib3hHcm91cDxUPjtcbiAgdmFsdWU6IGFueTtcbn1cblxubGV0IF91bmlxdWVJZENvdW50ZXIgPSAwO1xuXG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ2FqZi1jaGVja2JveC1ncm91cCxbYWpmLWNoZWNrYm94LWdyb3VwXScsXG4gIHByb3ZpZGVyczogW0FKRl9DSEVDS0JPWF9HUk9VUF9WQUxVRV9BQ0NFU1NPUl1cbn0pXG5leHBvcnQgY2xhc3MgQWpmQ2hlY2tib3hHcm91cDxUPiBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgY2hlY2tib3hlczogQWpmQ2hlY2tib3hHcm91cEl0ZW08VD5bXSA9IFtdO1xuXG4gIC8qKiBUaGUgdmFsdWUgZm9yIHRoZSBidXR0b24gdG9nZ2xlIGdyb3VwLiBTaG91bGQgbWF0Y2ggY3VycmVudGx5IHNlbGVjdGVkIGJ1dHRvbiB0b2dnbGUuICovXG4gIHByaXZhdGUgX3ZhbHVlOiBUW10gPSBbXTtcbiAgZ2V0IHZhbHVlKCk6IFRbXSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCB2YWx1ZShuZXdWYWx1ZTogVFtdKSB7XG4gICAgaWYgKHRoaXMuX3ZhbHVlICE9PSBuZXdWYWx1ZSkge1xuICAgICAgdGhpcy5fdmFsdWUgPSBuZXdWYWx1ZTtcbiAgICAgIHRoaXMuX3VwZGF0ZVNlbGVjdGVkQ2hlY2tib3hlc0Zyb21WYWx1ZSgpO1xuICAgICAgdGhpcy5fZW1pdENoYW5nZUV2ZW50KCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIFRoZSBIVE1MIG5hbWUgYXR0cmlidXRlIGFwcGxpZWQgdG8gdG9nZ2xlcyBpbiB0aGlzIGdyb3VwLiAqL1xuICBwcml2YXRlIF9uYW1lOiBzdHJpbmc7XG4gIGdldCBuYW1lKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX25hbWU7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IG5hbWUodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuX25hbWUgPSB2YWx1ZTtcbiAgICB0aGlzLl91cGRhdGVDaGVja2JveGVzTmFtZXMoKTtcbiAgfVxuXG4gIC8qKiBEaXNhYmxlcyBhbGwgdG9nZ2xlcyBpbiB0aGUgZ3JvdXAuICovXG4gIHByaXZhdGUgX2Rpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG4gIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IGRpc2FibGVkKHZhbHVlKSB7XG4gICAgdGhpcy5fZGlzYWJsZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICB9XG5cbiAgLyoqIFRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgYnV0dG9uIHRvZ2dsZSwgc2hvdWxkIG1hdGNoIHRoZSB2YWx1ZS4gKi9cbiAgcHJpdmF0ZSBfc2VsZWN0ZWQ6IEFqZkNoZWNrYm94R3JvdXBJdGVtPFQ+W10gPSBbXTtcbiAgZ2V0IHNlbGVjdGVkKCkge1xuICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZDtcbiAgfVxuICBzZXQgc2VsZWN0ZWQoc2VsZWN0ZWQ6IEFqZkNoZWNrYm94R3JvdXBJdGVtPFQ+W10pIHtcbiAgICB0aGlzLl9zZWxlY3RlZCA9IHNlbGVjdGVkO1xuICAgIGxldCB2YWx1ZXM6IFRbXSA9IFtdO1xuICAgIGlmIChzZWxlY3RlZCkge1xuICAgICAgc2VsZWN0ZWQuZm9yRWFjaChjID0+IHtcbiAgICAgICAgdmFsdWVzLnB1c2goYy52YWx1ZSk7XG4gICAgICAgIGlmICghYy5jaGVja2VkKSB7XG4gICAgICAgICAgYy5jaGVja2VkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIHRoaXMuX3ZhbHVlID0gdmFsdWVzO1xuICB9XG5cbiAgLyoqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgZ3JvdXAncyB2YWx1ZSBjaGFuZ2VzLiAqL1xuICBwcml2YXRlIF9jaGFuZ2U6IEV2ZW50RW1pdHRlcjxBamZDaGVja2JveEdyb3VwQ2hhbmdlPFQ+PiA9XG4gICAgICBuZXcgRXZlbnRFbWl0dGVyPEFqZkNoZWNrYm94R3JvdXBDaGFuZ2U8VD4+KCk7XG4gIEBPdXRwdXQoKSByZWFkb25seSBjaGFuZ2U6IE9ic2VydmFibGU8QWpmQ2hlY2tib3hHcm91cENoYW5nZTxUPj4gPSB0aGlzLl9jaGFuZ2UuYXNPYnNlcnZhYmxlKCk7XG5cbiAgLyoqIG9uVG91Y2ggZnVuY3Rpb24gcmVnaXN0ZXJlZCB2aWEgcmVnaXN0ZXJPblRvdWNoIChDb250cm9sVmFsdWVBY2Nlc3NvcikuICovXG4gIG9uVG91Y2hlZDogKCkgPT4gYW55ID0gKCkgPT4ge307XG5cbiAgLyoqXG4gICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gICAqL1xuICB3cml0ZVZhbHVlKHZhbHVlOiBUW10pIHtcbiAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICAvKipcbiAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci5cbiAgICovXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46ICh2YWx1ZTogVFtdKSA9PiB2b2lkKSB7XG4gICAgdGhpcy5fY29udHJvbFZhbHVlQWNjZXNzb3JDaGFuZ2VGbiA9IGZuO1xuICB9XG5cbiAgLyoqXG4gICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gICAqL1xuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KSB7XG4gICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcbiAgfVxuXG4gIGFkZFZhbHVlKHZhbHVlOiBUKSB7XG4gICAgbGV0IGN1clZhbHVlID0gKHRoaXMuX3ZhbHVlIHx8IFtdKS5zbGljZSgwKTtcbiAgICBpZiAoY3VyVmFsdWUuaW5kZXhPZih2YWx1ZSkgPT09IC0xKSB7XG4gICAgICBjdXJWYWx1ZS5wdXNoKHZhbHVlKTtcbiAgICAgIHRoaXMudmFsdWUgPSBjdXJWYWx1ZTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVWYWx1ZSh2YWx1ZTogVCkge1xuICAgIGxldCBjdXJWYWx1ZSA9ICh0aGlzLl92YWx1ZSB8fCBbXSkuc2xpY2UoMCk7XG4gICAgbGV0IGlkeCA9IGN1clZhbHVlLmluZGV4T2YodmFsdWUpO1xuICAgIGlmIChpZHggPiAtMSkge1xuICAgICAgY3VyVmFsdWUuc3BsaWNlKGlkeCwgMSk7XG4gICAgICB0aGlzLnZhbHVlID0gY3VyVmFsdWU7XG4gICAgfVxuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xuICAgIHRoaXMuX3VwZGF0ZUNoZWNrYm94ZXNOYW1lcygpO1xuICAgIHRoaXMuX3VwZGF0ZVNlbGVjdGVkQ2hlY2tib3hlc0Zyb21WYWx1ZSgpO1xuICB9XG5cbiAgcmVnaXN0ZXJJdGVtKGl0ZW06IEFqZkNoZWNrYm94R3JvdXBJdGVtPFQ+KTogdm9pZCB7XG4gICAgdGhpcy5jaGVja2JveGVzLnB1c2goaXRlbSk7XG4gIH1cblxuICAvKiogVGhlIG1ldGhvZCB0byBiZSBjYWxsZWQgaW4gb3JkZXIgdG8gdXBkYXRlIG5nTW9kZWwuICovXG4gIHByaXZhdGUgX2NvbnRyb2xWYWx1ZUFjY2Vzc29yQ2hhbmdlRm46ICh2YWx1ZTogYW55KSA9PiB2b2lkID0gKF8pID0+IHt9O1xuXG4gIHByaXZhdGUgX3VwZGF0ZUNoZWNrYm94ZXNOYW1lcygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5jaGVja2JveGVzID09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5jaGVja2JveGVzLmZvckVhY2goKGNoZWNrYm94KSA9PiB7XG4gICAgICBpZiAoY2hlY2tib3ggPT0gbnVsbCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjaGVja2JveC5uYW1lID0gdGhpcy5fbmFtZTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX3VwZGF0ZVNlbGVjdGVkQ2hlY2tib3hlc0Zyb21WYWx1ZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5jaGVja2JveGVzID09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5jaGVja2JveGVzLmZvckVhY2goY2hlY2tib3ggPT4ge1xuICAgICAgaWYgKGNoZWNrYm94ID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKCh0aGlzLl92YWx1ZSB8fCBbXSkuaW5kZXhPZihjaGVja2JveC52YWx1ZSkgPiAtMSkge1xuICAgICAgICBjaGVja2JveC5jaGVja2VkID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNoZWNrYm94LmNoZWNrZWQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBEaXNwYXRjaCBjaGFuZ2UgZXZlbnQgd2l0aCBjdXJyZW50IHNlbGVjdGlvbiBhbmQgZ3JvdXAgdmFsdWUuICovXG4gIHByaXZhdGUgX2VtaXRDaGFuZ2VFdmVudCgpOiB2b2lkIHtcbiAgICBsZXQgZXZlbnQgPSBuZXcgQWpmQ2hlY2tib3hHcm91cENoYW5nZTxUPigpO1xuICAgIGV2ZW50LnNvdXJjZSA9IHRoaXM7XG4gICAgZXZlbnQudmFsdWUgPSB0aGlzLl92YWx1ZTtcbiAgICB0aGlzLl9jb250cm9sVmFsdWVBY2Nlc3NvckNoYW5nZUZuKGV2ZW50LnZhbHVlKTtcbiAgICB0aGlzLl9jaGFuZ2UuZW1pdChldmVudCk7XG4gIH1cblxuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfZGlzYWJsZWQ6IEJvb2xlYW5JbnB1dDtcbn1cblxuQERpcmVjdGl2ZSgpXG5leHBvcnQgY2xhc3MgQWpmQ2hlY2tib3hHcm91cEl0ZW08VD4gaW1wbGVtZW50cyBPbkluaXQge1xuICAvKiogVGhlIHVuaXF1ZSBJRCBmb3IgdGhpcyBidXR0b24gdG9nZ2xlLiAqL1xuICBwcml2YXRlIF9jaGVja2JveElkOiBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignJyk7XG4gIHJlYWRvbmx5IGNoZWNrYm94SWQ6IE9ic2VydmFibGU8c3RyaW5nPiA9IHRoaXMuX2NoZWNrYm94SWQuYXNPYnNlcnZhYmxlKCk7XG5cbiAgQElucHV0KClcbiAgc2V0IGlkKGlkOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9jaGVja2JveElkLm5leHQoaWQpO1xuICB9XG5cbiAgQElucHV0KCkgbmFtZTogc3RyaW5nO1xuXG4gIC8qKiBUaGUgcGFyZW50IGJ1dHRvbiB0b2dnbGUgZ3JvdXAgKGV4Y2x1c2l2ZSBzZWxlY3Rpb24pLiBPcHRpb25hbC4gKi9cbiAgcmVhZG9ubHkgY2hlY2tib3hHcm91cDogQWpmQ2hlY2tib3hHcm91cDxUPjtcblxuICAvKiogV2hldGhlciBvciBub3QgdGhpcyBidXR0b24gdG9nZ2xlIGlzIGNoZWNrZWQuICovXG4gIHByaXZhdGUgX2NoZWNrZWRTdGF0ZTogQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHJlYWRvbmx5IGNoZWNrZWRTdGF0ZTogT2JzZXJ2YWJsZTxib29sZWFuPiA9IHRoaXMuX2NoZWNrZWRTdGF0ZS5hc09ic2VydmFibGUoKTtcbiAgZ2V0IGNoZWNrZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2NoZWNrZWRTdGF0ZS5nZXRWYWx1ZSgpO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBjaGVja2VkKGNoZWNrZWQ6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9jaGVja2VkU3RhdGUubmV4dChjaGVja2VkKTtcbiAgfVxuXG4gIC8qKiBXaGV0aGVyIG9yIG5vdCB0aGlzIGJ1dHRvbiB0b2dnbGUgaXMgZGlzYWJsZWQuICovXG4gIHByaXZhdGUgX2Rpc2FibGVkU3RhdGU6IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICByZWFkb25seSBkaXNhYmxlZFN0YXRlOiBPYnNlcnZhYmxlPGJvb2xlYW4+ID0gdGhpcy5fZGlzYWJsZWRTdGF0ZS5hc09ic2VydmFibGUoKTtcbiAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGRpc2FibGVkID0gdGhpcy5fZGlzYWJsZWRTdGF0ZS5nZXRWYWx1ZSgpO1xuICAgIHJldHVybiBkaXNhYmxlZCB8fCAodGhpcy5jaGVja2JveEdyb3VwICE9IG51bGwgJiYgdGhpcy5jaGVja2JveEdyb3VwLmRpc2FibGVkKTtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgZGlzYWJsZWQoZGlzYWJsZWQ6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9kaXNhYmxlZFN0YXRlLm5leHQoZGlzYWJsZWQgIT0gbnVsbCAmJiBkaXNhYmxlZCAhPT0gZmFsc2UpO1xuICB9XG5cbiAgLyoqIFZhbHVlIGFzc2lnbmVkIHRvIHRoaXMgYnV0dG9uIHRvZ2dsZS4gKi9cbiAgcHJpdmF0ZSBfdmFsdWU6IFQ7XG4gIGdldCB2YWx1ZSgpOiBUIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IHZhbHVlKHZhbHVlOiBUKSB7XG4gICAgaWYgKHRoaXMuX3ZhbHVlICE9PSB2YWx1ZSkge1xuICAgICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9jaGVja2VkSWNvblZhbDogQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJycpO1xuICBnZXQgY2hlY2tlZEljb24oKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fY2hlY2tlZEljb25WYWwuZ2V0VmFsdWUoKTtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgY2hlY2tlZEljb24oaWNvbjogc3RyaW5nKSB7XG4gICAgdGhpcy5fY2hlY2tlZEljb25WYWwubmV4dChpY29uKTtcbiAgfVxuXG4gIHByaXZhdGUgX25vdENoZWNrZWRJY29uVmFsOiBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignJyk7XG4gIGdldCBub3RDaGVja2VkSWNvbigpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9ub3RDaGVja2VkSWNvblZhbC5nZXRWYWx1ZSgpO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBub3RDaGVja2VkSWNvbihpY29uOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9ub3RDaGVja2VkSWNvblZhbC5uZXh0KGljb24pO1xuICB9XG5cbiAgcmVhZG9ubHkgaWNvbjogT2JzZXJ2YWJsZTxzdHJpbmc+O1xuXG4gIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIGdyb3VwIHZhbHVlIGNoYW5nZXMuICovXG4gIHByaXZhdGUgX2NoYW5nZTogRXZlbnRFbWl0dGVyPEFqZkNoZWNrYm94R3JvdXBJdGVtQ2hhbmdlPFQ+PiA9XG4gICAgICBuZXcgRXZlbnRFbWl0dGVyPEFqZkNoZWNrYm94R3JvdXBJdGVtQ2hhbmdlPFQ+PigpO1xuICBAT3V0cHV0KClcbiAgcmVhZG9ubHkgY2hhbmdlOiBPYnNlcnZhYmxlPEFqZkNoZWNrYm94R3JvdXBJdGVtQ2hhbmdlPFQ+PiA9IHRoaXMuX2NoYW5nZS5hc09ic2VydmFibGUoKTtcblxuICBjb25zdHJ1Y3RvcihjaGVja2JveEdyb3VwPzogQWpmQ2hlY2tib3hHcm91cDxUPikge1xuICAgIHRoaXMuaWNvbiA9IGNvbWJpbmVMYXRlc3QodGhpcy5fY2hlY2tlZFN0YXRlLCB0aGlzLl9jaGVja2VkSWNvblZhbCwgdGhpcy5fbm90Q2hlY2tlZEljb25WYWwpXG4gICAgICAgICAgICAgICAgICAgIC5waXBlKG1hcChyID0+IHJbMF0gPyByWzFdIDogclsyXSkpO1xuXG4gICAgaWYgKGNoZWNrYm94R3JvdXApIHtcbiAgICAgIHRoaXMuY2hlY2tib3hHcm91cCA9IGNoZWNrYm94R3JvdXA7XG4gICAgICB0aGlzLmNoZWNrYm94R3JvdXAucmVnaXN0ZXJJdGVtKHRoaXMpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICh0aGlzLmlkID09IG51bGwpIHtcbiAgICAgIHRoaXMuaWQgPSBgYWpmLWNoZWNrYm94LWdyb3VwLWl0ZW0tJHtfdW5pcXVlSWRDb3VudGVyKyt9YDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5jaGVja2JveEdyb3VwICYmIHRoaXMuY2hlY2tib3hHcm91cC52YWx1ZSAmJlxuICAgICAgICB0aGlzLmNoZWNrYm94R3JvdXAudmFsdWUuaW5kZXhPZih0aGlzLl92YWx1ZSkgPiAtMSkge1xuICAgICAgdGhpcy5jaGVja2VkID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICAvKiogQ2hlY2tzIHRoZSBidXR0b24gdG9nZ2xlIGR1ZSB0byBhbiBpbnRlcmFjdGlvbiB3aXRoIHRoZSB1bmRlcmx5aW5nIG5hdGl2ZSBpbnB1dC4gKi9cbiAgb25JbnB1dENoYW5nZShldmVudDogRXZlbnQpIHtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgIHRoaXMuX3RvZ2dsZSgpO1xuICB9XG5cbiAgLyoqIFRvZ2dsZSB0aGUgc3RhdGUgb2YgdGhlIGN1cnJlbnQgYnV0dG9uIHRvZ2dsZS4gKi9cbiAgcHJpdmF0ZSBfdG9nZ2xlKCk6IHZvaWQge1xuICAgIHRoaXMuY2hlY2tlZCA9ICF0aGlzLmNoZWNrZWQ7XG5cbiAgICBpZiAodGhpcy5jaGVja2JveEdyb3VwICE9IG51bGwpIHtcbiAgICAgIGlmICh0aGlzLmNoZWNrZWQpIHtcbiAgICAgICAgdGhpcy5jaGVja2JveEdyb3VwLmFkZFZhbHVlKHRoaXMuX3ZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY2hlY2tib3hHcm91cC5yZW1vdmVWYWx1ZSh0aGlzLl92YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=