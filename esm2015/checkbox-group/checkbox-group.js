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
import { Directive, EventEmitter, Input, forwardRef, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { combineLatest, BehaviorSubject, Observable } from 'rxjs';
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
    get value() { return this._value; }
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
    get name() { return this._name; }
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
    get disabled() { return this._disabled; }
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
    get selected() { return this._selected; }
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
        this.icon = combineLatest(this._checkedState, this._checkedIconVal, this._notCheckedIconVal).pipe(map((/**
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
    set id(id) { this._checkboxId.next(id); }
    /**
     * @return {?}
     */
    get checked() { return this._checkedState.getValue(); }
    /**
     * @param {?} checked
     * @return {?}
     */
    set checked(checked) { this._checkedState.next(checked); }
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
    get value() { return this._value; }
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
    get readonly() { return this._readonly; }
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
    get checkedIcon() { return this._checkedIconVal.getValue(); }
    /**
     * @param {?} icon
     * @return {?}
     */
    set checkedIcon(icon) { this._checkedIconVal.next(icon); }
    /**
     * @return {?}
     */
    get notCheckedIcon() { return this._notCheckedIconVal.getValue(); }
    /**
     * @param {?} icon
     * @return {?}
     */
    set notCheckedIcon(icon) { this._notCheckedIconVal.next(icon); }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3gtZ3JvdXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9jaGVja2JveC1ncm91cC9jaGVja2JveC1ncm91cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCQSxPQUFPLEVBQWUscUJBQXFCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUMxRSxPQUFPLEVBQW1CLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFDbEUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQy9CLE9BQU8sRUFBdUIsaUJBQWlCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUN2RSxPQUFPLEVBQUMsYUFBYSxFQUFFLGVBQWUsRUFBRSxVQUFVLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDaEUsT0FBTyxFQUFDLEdBQUcsRUFBQyxNQUFNLGdCQUFnQixDQUFDOztBQUduQyxNQUFNLE9BQU8saUNBQWlDLEdBQVE7SUFDcEQsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVTs7O0lBQUMsR0FBRyxFQUFFLENBQUMsZ0JBQWdCLEVBQUM7SUFDL0MsS0FBSyxFQUFFLElBQUk7Q0FDWjs7OztBQUVELE1BQU0sT0FBTywwQkFBMEI7Q0FHdEM7OztJQUZDLDRDQUFnQzs7SUFDaEMsMkNBQVc7Ozs7O0FBR2IsTUFBTSxPQUFPLHNCQUFzQjtDQUdsQzs7O0lBRkMsd0NBQTRCOztJQUM1Qix1Q0FBVzs7O0lBR1QsZ0JBQWdCLEdBQUcsQ0FBQzs7OztBQU94QixNQUFNLE9BQU8sZ0JBQWdCO0lBSjdCO1FBS0UsZUFBVSxHQUE4QixFQUFFLENBQUM7Ozs7UUFHbkMsV0FBTSxHQUFRLEVBQUUsQ0FBQzs7OztRQW1CakIsY0FBUyxHQUFhLEtBQUssQ0FBQzs7OztRQU81QixjQUFTLEdBQThCLEVBQUUsQ0FBQzs7OztRQWlCMUMsWUFBTyxHQUNiLElB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OztJQUMvRSwwQ0FBMEU7O0lBSTFFLG9DQUFzQjs7Ozs7SUFHdEIsNkNBQTRDOzs7Ozs7SUFHNUMsNkNBQXNGOztJQUN0Riw0Q0FBK0U7Ozs7OztJQUsvRSw4Q0FBdUY7O0lBQ3ZGLDZDQUFpRjs7Ozs7O0lBVWpGLHNDQUFrQjs7Ozs7SUFRbEIseUNBQTZCOzs7OztJQU03QiwrQ0FBbUY7Ozs7O0lBSW5GLGtEQUNvQzs7SUFJcEMsb0NBQWtDOzs7Ozs7SUFHbEMsdUNBQ3NEOztJQUN0RCxzQ0FDeUYiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7Qm9vbGVhbklucHV0LCBjb2VyY2VCb29sZWFuUHJvcGVydHl9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge0FmdGVyQ29udGVudEluaXQsIERpcmVjdGl2ZSwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgZm9yd2FyZFJlZiwgT25Jbml0LFxuICBPdXRwdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1J9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7Y29tYmluZUxhdGVzdCwgQmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlfSBmcm9tICdyeGpzJztcbmltcG9ydCB7bWFwfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cblxuZXhwb3J0IGNvbnN0IEFKRl9DSEVDS0JPWF9HUk9VUF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gQWpmQ2hlY2tib3hHcm91cCksXG4gIG11bHRpOiB0cnVlXG59O1xuXG5leHBvcnQgY2xhc3MgQWpmQ2hlY2tib3hHcm91cEl0ZW1DaGFuZ2U8VD4ge1xuICBzb3VyY2U6IEFqZkNoZWNrYm94R3JvdXBJdGVtPFQ+O1xuICB2YWx1ZTogYW55O1xufVxuXG5leHBvcnQgY2xhc3MgQWpmQ2hlY2tib3hHcm91cENoYW5nZTxUPiB7XG4gIHNvdXJjZTogQWpmQ2hlY2tib3hHcm91cDxUPjtcbiAgdmFsdWU6IGFueTtcbn1cblxubGV0IF91bmlxdWVJZENvdW50ZXIgPSAwO1xuXG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ2FqZi1jaGVja2JveC1ncm91cCxbYWpmLWNoZWNrYm94LWdyb3VwXScsXG4gIHByb3ZpZGVyczogW0FKRl9DSEVDS0JPWF9HUk9VUF9WQUxVRV9BQ0NFU1NPUl1cbn0pXG5leHBvcnQgY2xhc3MgQWpmQ2hlY2tib3hHcm91cDxUPiBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgY2hlY2tib3hlczogQWpmQ2hlY2tib3hHcm91cEl0ZW08VD5bXSA9IFtdO1xuXG4gIC8qKiBUaGUgdmFsdWUgZm9yIHRoZSBidXR0b24gdG9nZ2xlIGdyb3VwLiBTaG91bGQgbWF0Y2ggY3VycmVudGx5IHNlbGVjdGVkIGJ1dHRvbiB0b2dnbGUuICovXG4gIHByaXZhdGUgX3ZhbHVlOiBUW10gPSBbXTtcbiAgZ2V0IHZhbHVlKCk6IFRbXSB7IHJldHVybiB0aGlzLl92YWx1ZTsgfVxuICBASW5wdXQoKSBzZXQgdmFsdWUobmV3VmFsdWU6IFRbXSkge1xuICAgIGlmICh0aGlzLl92YWx1ZSAhPT0gbmV3VmFsdWUpIHtcbiAgICAgIHRoaXMuX3ZhbHVlID0gbmV3VmFsdWU7XG4gICAgICB0aGlzLl91cGRhdGVTZWxlY3RlZENoZWNrYm94ZXNGcm9tVmFsdWUoKTtcbiAgICAgIHRoaXMuX2VtaXRDaGFuZ2VFdmVudCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBUaGUgSFRNTCBuYW1lIGF0dHJpYnV0ZSBhcHBsaWVkIHRvIHRvZ2dsZXMgaW4gdGhpcyBncm91cC4gKi9cbiAgcHJpdmF0ZSBfbmFtZTogc3RyaW5nO1xuICBnZXQgbmFtZSgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5fbmFtZTsgfVxuICBASW5wdXQoKSBzZXQgbmFtZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fbmFtZSA9IHZhbHVlO1xuICAgIHRoaXMuX3VwZGF0ZUNoZWNrYm94ZXNOYW1lcygpO1xuICB9XG5cbiAgLyoqIERpc2FibGVzIGFsbCB0b2dnbGVzIGluIHRoZSBncm91cC4gKi9cbiAgcHJpdmF0ZSBfZGlzYWJsZWQ6ICBib29sZWFuID0gZmFsc2U7XG4gIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2Rpc2FibGVkOyB9XG4gIEBJbnB1dCgpIHNldCBkaXNhYmxlZCh2YWx1ZSkge1xuICAgIHRoaXMuX2Rpc2FibGVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuXG4gIC8qKiBUaGUgY3VycmVudGx5IHNlbGVjdGVkIGJ1dHRvbiB0b2dnbGUsIHNob3VsZCBtYXRjaCB0aGUgdmFsdWUuICovXG4gIHByaXZhdGUgX3NlbGVjdGVkOiBBamZDaGVja2JveEdyb3VwSXRlbTxUPltdID0gW107XG4gIGdldCBzZWxlY3RlZCgpIHsgcmV0dXJuIHRoaXMuX3NlbGVjdGVkOyB9XG4gIHNldCBzZWxlY3RlZChzZWxlY3RlZDogQWpmQ2hlY2tib3hHcm91cEl0ZW08VD5bXSkge1xuICAgIHRoaXMuX3NlbGVjdGVkID0gc2VsZWN0ZWQ7XG4gICAgbGV0IHZhbHVlczogVFtdID0gW107XG4gICAgaWYgKHNlbGVjdGVkKSB7XG4gICAgICBzZWxlY3RlZC5mb3JFYWNoKGMgPT4ge1xuICAgICAgICB2YWx1ZXMucHVzaChjLnZhbHVlKTtcbiAgICAgICAgaWYgKCFjLmNoZWNrZWQpIHtcbiAgICAgICAgICBjLmNoZWNrZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZXM7XG4gIH1cblxuICAvKiogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBncm91cCdzIHZhbHVlIGNoYW5nZXMuICovXG4gIHByaXZhdGUgX2NoYW5nZTogRXZlbnRFbWl0dGVyPEFqZkNoZWNrYm94R3JvdXBDaGFuZ2U8VD4+ID1cbiAgICBuZXcgRXZlbnRFbWl0dGVyPEFqZkNoZWNrYm94R3JvdXBDaGFuZ2U8VD4+KCk7XG4gICAgQE91dHB1dCgpIHJlYWRvbmx5IGNoYW5nZTogT2JzZXJ2YWJsZTxBamZDaGVja2JveEdyb3VwQ2hhbmdlPFQ+PiA9IHRoaXMuX2NoYW5nZS5hc09ic2VydmFibGUoKTtcblxuICAvKiogb25Ub3VjaCBmdW5jdGlvbiByZWdpc3RlcmVkIHZpYSByZWdpc3Rlck9uVG91Y2ggKENvbnRyb2xWYWx1ZUFjY2Vzc29yKS4gKi9cbiAgb25Ub3VjaGVkOiAoKSA9PiBhbnkgPSAoKSA9PiB7fTtcblxuICAvKipcbiAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci5cbiAgICovXG4gIHdyaXRlVmFsdWUodmFsdWU6IFRbXSkge1xuICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIENvbnRyb2xWYWx1ZUFjY2Vzc29yLlxuICAgKi9cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKHZhbHVlOiBUW10pID0+IHZvaWQpIHtcbiAgICB0aGlzLl9jb250cm9sVmFsdWVBY2Nlc3NvckNoYW5nZUZuID0gZm47XG4gIH1cblxuICAvKipcbiAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci5cbiAgICovXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xuICB9XG5cbiAgYWRkVmFsdWUodmFsdWU6IFQpIHtcbiAgICBsZXQgY3VyVmFsdWUgPSAodGhpcy5fdmFsdWUgfHwgW10pLnNsaWNlKDApO1xuICAgIGlmIChjdXJWYWx1ZS5pbmRleE9mKHZhbHVlKSA9PT0gLTEpIHtcbiAgICAgIGN1clZhbHVlLnB1c2godmFsdWUpO1xuICAgICAgdGhpcy52YWx1ZSA9IGN1clZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZVZhbHVlKHZhbHVlOiBUKSB7XG4gICAgbGV0IGN1clZhbHVlID0gKHRoaXMuX3ZhbHVlIHx8IFtdKS5zbGljZSgwKTtcbiAgICBsZXQgaWR4ID0gY3VyVmFsdWUuaW5kZXhPZih2YWx1ZSk7XG4gICAgaWYgKGlkeCA+IC0xKSB7XG4gICAgICBjdXJWYWx1ZS5zcGxpY2UoaWR4LCAxKTtcbiAgICAgIHRoaXMudmFsdWUgPSBjdXJWYWx1ZTtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fdXBkYXRlQ2hlY2tib3hlc05hbWVzKCk7XG4gICAgdGhpcy5fdXBkYXRlU2VsZWN0ZWRDaGVja2JveGVzRnJvbVZhbHVlKCk7XG4gIH1cblxuICByZWdpc3Rlckl0ZW0oaXRlbTogQWpmQ2hlY2tib3hHcm91cEl0ZW08VD4pOiB2b2lkIHtcbiAgICB0aGlzLmNoZWNrYm94ZXMucHVzaChpdGVtKTtcbiAgfVxuXG4gIC8qKiBUaGUgbWV0aG9kIHRvIGJlIGNhbGxlZCBpbiBvcmRlciB0byB1cGRhdGUgbmdNb2RlbC4gKi9cbiAgcHJpdmF0ZSBfY29udHJvbFZhbHVlQWNjZXNzb3JDaGFuZ2VGbjogKHZhbHVlOiBhbnkpID0+IHZvaWQgPSAoXykgPT4ge307XG5cbiAgcHJpdmF0ZSBfdXBkYXRlQ2hlY2tib3hlc05hbWVzKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmNoZWNrYm94ZXMgPT0gbnVsbCkgeyByZXR1cm47IH1cbiAgICB0aGlzLmNoZWNrYm94ZXMuZm9yRWFjaCgoY2hlY2tib3gpID0+IHtcbiAgICAgIGlmIChjaGVja2JveCA9PSBudWxsKSB7IHJldHVybjsgfVxuICAgICAgY2hlY2tib3gubmFtZSA9IHRoaXMuX25hbWU7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVTZWxlY3RlZENoZWNrYm94ZXNGcm9tVmFsdWUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY2hlY2tib3hlcyA9PSBudWxsKSB7IHJldHVybjsgfVxuICAgIHRoaXMuY2hlY2tib3hlcy5mb3JFYWNoKGNoZWNrYm94ID0+IHtcbiAgICAgIGlmIChjaGVja2JveCA9PSBudWxsKSB7IHJldHVybjsgfVxuICAgICAgaWYgKCh0aGlzLl92YWx1ZSB8fCBbXSkuaW5kZXhPZihjaGVja2JveC52YWx1ZSkgPiAtMSkge1xuICAgICAgICBjaGVja2JveC5jaGVja2VkID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNoZWNrYm94LmNoZWNrZWQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBEaXNwYXRjaCBjaGFuZ2UgZXZlbnQgd2l0aCBjdXJyZW50IHNlbGVjdGlvbiBhbmQgZ3JvdXAgdmFsdWUuICovXG4gIHByaXZhdGUgX2VtaXRDaGFuZ2VFdmVudCgpOiB2b2lkIHtcbiAgICBsZXQgZXZlbnQgPSBuZXcgQWpmQ2hlY2tib3hHcm91cENoYW5nZTxUPigpO1xuICAgIGV2ZW50LnNvdXJjZSA9IHRoaXM7XG4gICAgZXZlbnQudmFsdWUgPSB0aGlzLl92YWx1ZTtcbiAgICB0aGlzLl9jb250cm9sVmFsdWVBY2Nlc3NvckNoYW5nZUZuKGV2ZW50LnZhbHVlKTtcbiAgICB0aGlzLl9jaGFuZ2UuZW1pdChldmVudCk7XG4gIH1cblxuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfZGlzYWJsZWQ6IEJvb2xlYW5JbnB1dDtcbn1cblxuQERpcmVjdGl2ZSgpXG5leHBvcnQgY2xhc3MgQWpmQ2hlY2tib3hHcm91cEl0ZW08VD4gaW1wbGVtZW50cyBPbkluaXQge1xuICAvKiogVGhlIHVuaXF1ZSBJRCBmb3IgdGhpcyBidXR0b24gdG9nZ2xlLiAqL1xuICBwcml2YXRlIF9jaGVja2JveElkOiBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignJyk7XG4gIHJlYWRvbmx5IGNoZWNrYm94SWQ6IE9ic2VydmFibGU8c3RyaW5nPiA9IHRoaXMuX2NoZWNrYm94SWQuYXNPYnNlcnZhYmxlKCk7XG5cbiAgQElucHV0KCkgc2V0IGlkKGlkOiBzdHJpbmcpIHsgdGhpcy5fY2hlY2tib3hJZC5uZXh0KGlkKTsgfVxuXG4gIEBJbnB1dCgpIG5hbWU6IHN0cmluZztcblxuICAvKiogVGhlIHBhcmVudCBidXR0b24gdG9nZ2xlIGdyb3VwIChleGNsdXNpdmUgc2VsZWN0aW9uKS4gT3B0aW9uYWwuICovXG4gIHJlYWRvbmx5IGNoZWNrYm94R3JvdXA6IEFqZkNoZWNrYm94R3JvdXA8VD47XG5cbiAgLyoqIFdoZXRoZXIgb3Igbm90IHRoaXMgYnV0dG9uIHRvZ2dsZSBpcyBjaGVja2VkLiAqL1xuICBwcml2YXRlIF9jaGVja2VkU3RhdGU6IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICByZWFkb25seSBjaGVja2VkU3RhdGU6IE9ic2VydmFibGU8Ym9vbGVhbj4gPSB0aGlzLl9jaGVja2VkU3RhdGUuYXNPYnNlcnZhYmxlKCk7XG4gIGdldCBjaGVja2VkKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fY2hlY2tlZFN0YXRlLmdldFZhbHVlKCk7IH1cbiAgQElucHV0KCkgc2V0IGNoZWNrZWQoY2hlY2tlZDogYm9vbGVhbikgeyB0aGlzLl9jaGVja2VkU3RhdGUubmV4dChjaGVja2VkKTsgfVxuXG4gIC8qKiBXaGV0aGVyIG9yIG5vdCB0aGlzIGJ1dHRvbiB0b2dnbGUgaXMgZGlzYWJsZWQuICovXG4gIHByaXZhdGUgX2Rpc2FibGVkU3RhdGU6IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICByZWFkb25seSBkaXNhYmxlZFN0YXRlOiBPYnNlcnZhYmxlPGJvb2xlYW4+ID0gdGhpcy5fZGlzYWJsZWRTdGF0ZS5hc09ic2VydmFibGUoKTtcbiAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGRpc2FibGVkID0gdGhpcy5fZGlzYWJsZWRTdGF0ZS5nZXRWYWx1ZSgpO1xuICAgIHJldHVybiBkaXNhYmxlZCB8fCAodGhpcy5jaGVja2JveEdyb3VwICE9IG51bGwgJiYgdGhpcy5jaGVja2JveEdyb3VwLmRpc2FibGVkKTtcbiAgfVxuICBASW5wdXQoKSBzZXQgZGlzYWJsZWQoZGlzYWJsZWQ6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9kaXNhYmxlZFN0YXRlLm5leHQoZGlzYWJsZWQgIT0gbnVsbCAmJiBkaXNhYmxlZCAhPT0gZmFsc2UpO1xuICB9XG5cbiAgLyoqIFZhbHVlIGFzc2lnbmVkIHRvIHRoaXMgYnV0dG9uIHRvZ2dsZS4gKi9cbiAgcHJpdmF0ZSBfdmFsdWU6IFQ7XG4gIGdldCB2YWx1ZSgpOiBUIHsgcmV0dXJuIHRoaXMuX3ZhbHVlOyB9XG4gIEBJbnB1dCgpIHNldCB2YWx1ZSh2YWx1ZTogVCkge1xuICAgIGlmICh0aGlzLl92YWx1ZSAhPT0gdmFsdWUpIHtcbiAgICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIF9yZWFkb25seTogYm9vbGVhbjtcbiAgZ2V0IHJlYWRvbmx5KCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fcmVhZG9ubHk7IH1cbiAgQElucHV0KCkgc2V0IHJlYWRvbmx5KHJlYWRvbmx5OiBib29sZWFuKSB7XG4gICAgdGhpcy5fcmVhZG9ubHkgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkocmVhZG9ubHkpO1xuICB9XG5cbiAgcHJpdmF0ZSBfY2hlY2tlZEljb25WYWw6IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCcnKTtcbiAgZ2V0IGNoZWNrZWRJY29uKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLl9jaGVja2VkSWNvblZhbC5nZXRWYWx1ZSgpOyB9XG4gIEBJbnB1dCgpIHNldCBjaGVja2VkSWNvbihpY29uOiBzdHJpbmcpIHsgdGhpcy5fY2hlY2tlZEljb25WYWwubmV4dChpY29uKTsgfVxuXG4gIHByaXZhdGUgX25vdENoZWNrZWRJY29uVmFsOiBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPiA9XG4gICAgICBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJycpO1xuICBnZXQgbm90Q2hlY2tlZEljb24oKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX25vdENoZWNrZWRJY29uVmFsLmdldFZhbHVlKCk7IH1cbiAgQElucHV0KCkgc2V0IG5vdENoZWNrZWRJY29uKGljb246IHN0cmluZykgeyB0aGlzLl9ub3RDaGVja2VkSWNvblZhbC5uZXh0KGljb24pOyB9XG5cbiAgcmVhZG9ubHkgaWNvbjogT2JzZXJ2YWJsZTxzdHJpbmc+O1xuXG4gIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIGdyb3VwIHZhbHVlIGNoYW5nZXMuICovXG4gIHByaXZhdGUgX2NoYW5nZTogRXZlbnRFbWl0dGVyPEFqZkNoZWNrYm94R3JvdXBJdGVtQ2hhbmdlPFQ+PlxuICAgID0gbmV3IEV2ZW50RW1pdHRlcjxBamZDaGVja2JveEdyb3VwSXRlbUNoYW5nZTxUPj4oKTtcbiAgQE91dHB1dCgpXG4gIHJlYWRvbmx5IGNoYW5nZTogT2JzZXJ2YWJsZTxBamZDaGVja2JveEdyb3VwSXRlbUNoYW5nZTxUPj4gPSB0aGlzLl9jaGFuZ2UuYXNPYnNlcnZhYmxlKCk7XG5cbiAgY29uc3RydWN0b3IoY2hlY2tib3hHcm91cD86IEFqZkNoZWNrYm94R3JvdXA8VD4pIHtcbiAgICB0aGlzLmljb24gPSBjb21iaW5lTGF0ZXN0KFxuICAgICAgdGhpcy5fY2hlY2tlZFN0YXRlLCB0aGlzLl9jaGVja2VkSWNvblZhbCwgdGhpcy5fbm90Q2hlY2tlZEljb25WYWxcbiAgICApLnBpcGUoXG4gICAgICBtYXAociA9PiByWzBdID8gclsxXSA6IHJbMl0pXG4gICAgKTtcblxuICAgIGlmIChjaGVja2JveEdyb3VwKSB7XG4gICAgICB0aGlzLmNoZWNrYm94R3JvdXAgPSBjaGVja2JveEdyb3VwO1xuICAgICAgdGhpcy5jaGVja2JveEdyb3VwLnJlZ2lzdGVySXRlbSh0aGlzKTtcbiAgICB9XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAodGhpcy5pZCA9PSBudWxsKSB7XG4gICAgICB0aGlzLmlkID0gYGFqZi1jaGVja2JveC1ncm91cC1pdGVtLSR7X3VuaXF1ZUlkQ291bnRlcisrfWA7XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgdGhpcy5jaGVja2JveEdyb3VwICYmIHRoaXMuY2hlY2tib3hHcm91cC52YWx1ZSAmJlxuICAgICAgdGhpcy5jaGVja2JveEdyb3VwLnZhbHVlLmluZGV4T2YodGhpcy5fdmFsdWUpID4gLTFcbiAgICApIHtcbiAgICAgIHRoaXMuY2hlY2tlZCA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgLyoqIENoZWNrcyB0aGUgYnV0dG9uIHRvZ2dsZSBkdWUgdG8gYW4gaW50ZXJhY3Rpb24gd2l0aCB0aGUgdW5kZXJseWluZyBuYXRpdmUgaW5wdXQuICovXG4gIG9uSW5wdXRDaGFuZ2UoZXZlbnQ6IEV2ZW50KSB7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICB0aGlzLl90b2dnbGUoKTtcbiAgfVxuXG4gIC8qKiBUb2dnbGUgdGhlIHN0YXRlIG9mIHRoZSBjdXJyZW50IGJ1dHRvbiB0b2dnbGUuICovXG4gIHByaXZhdGUgX3RvZ2dsZSgpOiB2b2lkIHtcbiAgICB0aGlzLmNoZWNrZWQgPSAhdGhpcy5jaGVja2VkO1xuXG4gICAgaWYgKHRoaXMuY2hlY2tib3hHcm91cCAhPSBudWxsKSB7XG4gICAgICBpZiAodGhpcy5jaGVja2VkKSB7XG4gICAgICAgIHRoaXMuY2hlY2tib3hHcm91cC5hZGRWYWx1ZSh0aGlzLl92YWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNoZWNrYm94R3JvdXAucmVtb3ZlVmFsdWUodGhpcy5fdmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19