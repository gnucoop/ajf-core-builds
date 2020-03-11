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
export var AJF_CHECKBOX_GROUP_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return AjfCheckboxGroup; }),
    multi: true
};
var AjfCheckboxGroupItemChange = /** @class */ (function () {
    function AjfCheckboxGroupItemChange() {
    }
    return AjfCheckboxGroupItemChange;
}());
export { AjfCheckboxGroupItemChange };
var AjfCheckboxGroupChange = /** @class */ (function () {
    function AjfCheckboxGroupChange() {
    }
    return AjfCheckboxGroupChange;
}());
export { AjfCheckboxGroupChange };
var _uniqueIdCounter = 0;
var AjfCheckboxGroup = /** @class */ (function () {
    function AjfCheckboxGroup() {
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
        this.onTouched = function () { };
        /** The method to be called in order to update ngModel. */
        this._controlValueAccessorChangeFn = function (_) { };
    }
    Object.defineProperty(AjfCheckboxGroup.prototype, "value", {
        get: function () { return this._value; },
        set: function (newValue) {
            if (this._value !== newValue) {
                this._value = newValue;
                this._updateSelectedCheckboxesFromValue();
                this._emitChangeEvent();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfCheckboxGroup.prototype, "name", {
        get: function () { return this._name; },
        set: function (value) {
            this._name = value;
            this._updateCheckboxesNames();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfCheckboxGroup.prototype, "disabled", {
        get: function () { return this._disabled; },
        set: function (value) {
            this._disabled = coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfCheckboxGroup.prototype, "selected", {
        get: function () { return this._selected; },
        set: function (selected) {
            this._selected = selected;
            var values = [];
            if (selected) {
                selected.forEach(function (c) {
                    values.push(c.value);
                    if (!c.checked) {
                        c.checked = true;
                    }
                });
            }
            this._value = values;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Implemented as part of ControlValueAccessor.
     */
    AjfCheckboxGroup.prototype.writeValue = function (value) {
        this.value = value;
    };
    /**
     * Implemented as part of ControlValueAccessor.
     */
    AjfCheckboxGroup.prototype.registerOnChange = function (fn) {
        this._controlValueAccessorChangeFn = fn;
    };
    /**
     * Implemented as part of ControlValueAccessor.
     */
    AjfCheckboxGroup.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    AjfCheckboxGroup.prototype.addValue = function (value) {
        var curValue = (this._value || []).slice(0);
        if (curValue.indexOf(value) === -1) {
            curValue.push(value);
            this.value = curValue;
        }
    };
    AjfCheckboxGroup.prototype.removeValue = function (value) {
        var curValue = (this._value || []).slice(0);
        var idx = curValue.indexOf(value);
        if (idx > -1) {
            curValue.splice(idx, 1);
            this.value = curValue;
        }
    };
    AjfCheckboxGroup.prototype.ngAfterContentInit = function () {
        this._updateCheckboxesNames();
        this._updateSelectedCheckboxesFromValue();
    };
    AjfCheckboxGroup.prototype.registerItem = function (item) {
        this.checkboxes.push(item);
    };
    AjfCheckboxGroup.prototype._updateCheckboxesNames = function () {
        var _this = this;
        if (this.checkboxes == null) {
            return;
        }
        this.checkboxes.forEach(function (checkbox) {
            if (checkbox == null) {
                return;
            }
            checkbox.name = _this._name;
        });
    };
    AjfCheckboxGroup.prototype._updateSelectedCheckboxesFromValue = function () {
        var _this = this;
        if (this.checkboxes == null) {
            return;
        }
        this.checkboxes.forEach(function (checkbox) {
            if (checkbox == null) {
                return;
            }
            if ((_this._value || []).indexOf(checkbox.value) > -1) {
                checkbox.checked = true;
            }
            else {
                checkbox.checked = false;
            }
        });
    };
    /** Dispatch change event with current selection and group value. */
    AjfCheckboxGroup.prototype._emitChangeEvent = function () {
        var event = new AjfCheckboxGroupChange();
        event.source = this;
        event.value = this._value;
        this._controlValueAccessorChangeFn(event.value);
        this._change.emit(event);
    };
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
    return AjfCheckboxGroup;
}());
export { AjfCheckboxGroup };
var AjfCheckboxGroupItem = /** @class */ (function () {
    function AjfCheckboxGroupItem(checkboxGroup) {
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
        this.icon = combineLatest(this._checkedState, this._checkedIconVal, this._notCheckedIconVal).pipe(map(function (r) { return r[0] ? r[1] : r[2]; }));
        if (checkboxGroup) {
            this.checkboxGroup = checkboxGroup;
            this.checkboxGroup.registerItem(this);
        }
    }
    Object.defineProperty(AjfCheckboxGroupItem.prototype, "id", {
        set: function (id) { this._checkboxId.next(id); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfCheckboxGroupItem.prototype, "checked", {
        get: function () { return this._checkedState.getValue(); },
        set: function (checked) { this._checkedState.next(checked); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfCheckboxGroupItem.prototype, "disabled", {
        get: function () {
            var disabled = this._disabledState.getValue();
            return disabled || (this.checkboxGroup != null && this.checkboxGroup.disabled);
        },
        set: function (disabled) {
            this._disabledState.next(disabled != null && disabled !== false);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfCheckboxGroupItem.prototype, "value", {
        get: function () { return this._value; },
        set: function (value) {
            if (this._value !== value) {
                this._value = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfCheckboxGroupItem.prototype, "readonly", {
        get: function () { return this._readonly; },
        set: function (readonly) {
            this._readonly = coerceBooleanProperty(readonly);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfCheckboxGroupItem.prototype, "checkedIcon", {
        get: function () { return this._checkedIconVal.getValue(); },
        set: function (icon) { this._checkedIconVal.next(icon); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfCheckboxGroupItem.prototype, "notCheckedIcon", {
        get: function () { return this._notCheckedIconVal.getValue(); },
        set: function (icon) { this._notCheckedIconVal.next(icon); },
        enumerable: true,
        configurable: true
    });
    AjfCheckboxGroupItem.prototype.ngOnInit = function () {
        if (this.id == null) {
            this.id = "ajf-checkbox-group-item-" + _uniqueIdCounter++;
        }
        if (this.checkboxGroup && this.checkboxGroup.value &&
            this.checkboxGroup.value.indexOf(this._value) > -1) {
            this.checked = true;
        }
    };
    /** Checks the button toggle due to an interaction with the underlying native input. */
    AjfCheckboxGroupItem.prototype.onInputChange = function (event) {
        event.stopPropagation();
        this._toggle();
    };
    /** Toggle the state of the current button toggle. */
    AjfCheckboxGroupItem.prototype._toggle = function () {
        this.checked = !this.checked;
        if (this.checkboxGroup != null) {
            if (this.checked) {
                this.checkboxGroup.addValue(this._value);
            }
            else {
                this.checkboxGroup.removeValue(this._value);
            }
        }
    };
    AjfCheckboxGroupItem.decorators = [
        { type: Directive }
    ];
    /** @nocollapse */
    AjfCheckboxGroupItem.ctorParameters = function () { return [
        { type: AjfCheckboxGroup }
    ]; };
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
    return AjfCheckboxGroupItem;
}());
export { AjfCheckboxGroupItem };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3gtZ3JvdXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9jaGVja2JveC1ncm91cC9jaGVja2JveC1ncm91cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQWUscUJBQXFCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUMxRSxPQUFPLEVBQW1CLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFDbEUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQy9CLE9BQU8sRUFBdUIsaUJBQWlCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUN2RSxPQUFPLEVBQUMsYUFBYSxFQUFFLGVBQWUsRUFBRSxVQUFVLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDaEUsT0FBTyxFQUFDLEdBQUcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBR25DLE1BQU0sQ0FBQyxJQUFNLGlDQUFpQyxHQUFRO0lBQ3BELE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxjQUFNLE9BQUEsZ0JBQWdCLEVBQWhCLENBQWdCLENBQUM7SUFDL0MsS0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDO0FBRUY7SUFBQTtJQUdBLENBQUM7SUFBRCxpQ0FBQztBQUFELENBQUMsQUFIRCxJQUdDOztBQUVEO0lBQUE7SUFHQSxDQUFDO0lBQUQsNkJBQUM7QUFBRCxDQUFDLEFBSEQsSUFHQzs7QUFFRCxJQUFJLGdCQUFnQixHQUFHLENBQUMsQ0FBQztBQUd6QjtJQUFBO1FBS0UsZUFBVSxHQUE4QixFQUFFLENBQUM7UUFFM0MsNEZBQTRGO1FBQ3BGLFdBQU0sR0FBUSxFQUFFLENBQUM7UUFrQnpCLHlDQUF5QztRQUNqQyxjQUFTLEdBQWEsS0FBSyxDQUFDO1FBTXBDLG9FQUFvRTtRQUM1RCxjQUFTLEdBQThC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S0FBSzsyQkFTTCxLQUFLO3dCQU9MLEtBQUs7MkJBUUwsS0FBSzs4QkFNTCxLQUFLO2lDQUtMLEtBQUs7eUJBT0wsTUFBTTs7SUFnRFQsMkJBQUM7Q0FBQSxBQTNHRCxJQTJHQztTQTFHWSxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7Qm9vbGVhbklucHV0LCBjb2VyY2VCb29sZWFuUHJvcGVydHl9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge0FmdGVyQ29udGVudEluaXQsIERpcmVjdGl2ZSwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgZm9yd2FyZFJlZiwgT25Jbml0LFxuICBPdXRwdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1J9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7Y29tYmluZUxhdGVzdCwgQmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlfSBmcm9tICdyeGpzJztcbmltcG9ydCB7bWFwfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cblxuZXhwb3J0IGNvbnN0IEFKRl9DSEVDS0JPWF9HUk9VUF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gQWpmQ2hlY2tib3hHcm91cCksXG4gIG11bHRpOiB0cnVlXG59O1xuXG5leHBvcnQgY2xhc3MgQWpmQ2hlY2tib3hHcm91cEl0ZW1DaGFuZ2U8VD4ge1xuICBzb3VyY2U6IEFqZkNoZWNrYm94R3JvdXBJdGVtPFQ+O1xuICB2YWx1ZTogYW55O1xufVxuXG5leHBvcnQgY2xhc3MgQWpmQ2hlY2tib3hHcm91cENoYW5nZTxUPiB7XG4gIHNvdXJjZTogQWpmQ2hlY2tib3hHcm91cDxUPjtcbiAgdmFsdWU6IGFueTtcbn1cblxubGV0IF91bmlxdWVJZENvdW50ZXIgPSAwO1xuXG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ2FqZi1jaGVja2JveC1ncm91cCxbYWpmLWNoZWNrYm94LWdyb3VwXScsXG4gIHByb3ZpZGVyczogW0FKRl9DSEVDS0JPWF9HUk9VUF9WQUxVRV9BQ0NFU1NPUl1cbn0pXG5leHBvcnQgY2xhc3MgQWpmQ2hlY2tib3hHcm91cDxUPiBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgY2hlY2tib3hlczogQWpmQ2hlY2tib3hHcm91cEl0ZW08VD5bXSA9IFtdO1xuXG4gIC8qKiBUaGUgdmFsdWUgZm9yIHRoZSBidXR0b24gdG9nZ2xlIGdyb3VwLiBTaG91bGQgbWF0Y2ggY3VycmVudGx5IHNlbGVjdGVkIGJ1dHRvbiB0b2dnbGUuICovXG4gIHByaXZhdGUgX3ZhbHVlOiBUW10gPSBbXTtcbiAgZ2V0IHZhbHVlKCk6IFRbXSB7IHJldHVybiB0aGlzLl92YWx1ZTsgfVxuICBASW5wdXQoKSBzZXQgdmFsdWUobmV3VmFsdWU6IFRbXSkge1xuICAgIGlmICh0aGlzLl92YWx1ZSAhPT0gbmV3VmFsdWUpIHtcbiAgICAgIHRoaXMuX3ZhbHVlID0gbmV3VmFsdWU7XG4gICAgICB0aGlzLl91cGRhdGVTZWxlY3RlZENoZWNrYm94ZXNGcm9tVmFsdWUoKTtcbiAgICAgIHRoaXMuX2VtaXRDaGFuZ2VFdmVudCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBUaGUgSFRNTCBuYW1lIGF0dHJpYnV0ZSBhcHBsaWVkIHRvIHRvZ2dsZXMgaW4gdGhpcyBncm91cC4gKi9cbiAgcHJpdmF0ZSBfbmFtZTogc3RyaW5nO1xuICBnZXQgbmFtZSgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5fbmFtZTsgfVxuICBASW5wdXQoKSBzZXQgbmFtZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fbmFtZSA9IHZhbHVlO1xuICAgIHRoaXMuX3VwZGF0ZUNoZWNrYm94ZXNOYW1lcygpO1xuICB9XG5cbiAgLyoqIERpc2FibGVzIGFsbCB0b2dnbGVzIGluIHRoZSBncm91cC4gKi9cbiAgcHJpdmF0ZSBfZGlzYWJsZWQ6ICBib29sZWFuID0gZmFsc2U7XG4gIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2Rpc2FibGVkOyB9XG4gIEBJbnB1dCgpIHNldCBkaXNhYmxlZCh2YWx1ZSkge1xuICAgIHRoaXMuX2Rpc2FibGVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuXG4gIC8qKiBUaGUgY3VycmVudGx5IHNlbGVjdGVkIGJ1dHRvbiB0b2dnbGUsIHNob3VsZCBtYXRjaCB0aGUgdmFsdWUuICovXG4gIHByaXZhdGUgX3NlbGVjdGVkOiBBamZDaGVja2JveEdyb3VwSXRlbTxUPltdID0gW107XG4gIGdldCBzZWxlY3RlZCgpIHsgcmV0dXJuIHRoaXMuX3NlbGVjdGVkOyB9XG4gIHNldCBzZWxlY3RlZChzZWxlY3RlZDogQWpmQ2hlY2tib3hHcm91cEl0ZW08VD5bXSkge1xuICAgIHRoaXMuX3NlbGVjdGVkID0gc2VsZWN0ZWQ7XG4gICAgbGV0IHZhbHVlczogVFtdID0gW107XG4gICAgaWYgKHNlbGVjdGVkKSB7XG4gICAgICBzZWxlY3RlZC5mb3JFYWNoKGMgPT4ge1xuICAgICAgICB2YWx1ZXMucHVzaChjLnZhbHVlKTtcbiAgICAgICAgaWYgKCFjLmNoZWNrZWQpIHtcbiAgICAgICAgICBjLmNoZWNrZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZXM7XG4gIH1cblxuICAvKiogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBncm91cCdzIHZhbHVlIGNoYW5nZXMuICovXG4gIHByaXZhdGUgX2NoYW5nZTogRXZlbnRFbWl0dGVyPEFqZkNoZWNrYm94R3JvdXBDaGFuZ2U8VD4+ID1cbiAgICBuZXcgRXZlbnRFbWl0dGVyPEFqZkNoZWNrYm94R3JvdXBDaGFuZ2U8VD4+KCk7XG4gICAgQE91dHB1dCgpIHJlYWRvbmx5IGNoYW5nZTogT2JzZXJ2YWJsZTxBamZDaGVja2JveEdyb3VwQ2hhbmdlPFQ+PiA9IHRoaXMuX2NoYW5nZS5hc09ic2VydmFibGUoKTtcblxuICAvKiogb25Ub3VjaCBmdW5jdGlvbiByZWdpc3RlcmVkIHZpYSByZWdpc3Rlck9uVG91Y2ggKENvbnRyb2xWYWx1ZUFjY2Vzc29yKS4gKi9cbiAgb25Ub3VjaGVkOiAoKSA9PiBhbnkgPSAoKSA9PiB7fTtcblxuICAvKipcbiAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci5cbiAgICovXG4gIHdyaXRlVmFsdWUodmFsdWU6IFRbXSkge1xuICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIENvbnRyb2xWYWx1ZUFjY2Vzc29yLlxuICAgKi9cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKHZhbHVlOiBUW10pID0+IHZvaWQpIHtcbiAgICB0aGlzLl9jb250cm9sVmFsdWVBY2Nlc3NvckNoYW5nZUZuID0gZm47XG4gIH1cblxuICAvKipcbiAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci5cbiAgICovXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xuICB9XG5cbiAgYWRkVmFsdWUodmFsdWU6IFQpIHtcbiAgICBsZXQgY3VyVmFsdWUgPSAodGhpcy5fdmFsdWUgfHwgW10pLnNsaWNlKDApO1xuICAgIGlmIChjdXJWYWx1ZS5pbmRleE9mKHZhbHVlKSA9PT0gLTEpIHtcbiAgICAgIGN1clZhbHVlLnB1c2godmFsdWUpO1xuICAgICAgdGhpcy52YWx1ZSA9IGN1clZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZVZhbHVlKHZhbHVlOiBUKSB7XG4gICAgbGV0IGN1clZhbHVlID0gKHRoaXMuX3ZhbHVlIHx8IFtdKS5zbGljZSgwKTtcbiAgICBsZXQgaWR4ID0gY3VyVmFsdWUuaW5kZXhPZih2YWx1ZSk7XG4gICAgaWYgKGlkeCA+IC0xKSB7XG4gICAgICBjdXJWYWx1ZS5zcGxpY2UoaWR4LCAxKTtcbiAgICAgIHRoaXMudmFsdWUgPSBjdXJWYWx1ZTtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fdXBkYXRlQ2hlY2tib3hlc05hbWVzKCk7XG4gICAgdGhpcy5fdXBkYXRlU2VsZWN0ZWRDaGVja2JveGVzRnJvbVZhbHVlKCk7XG4gIH1cblxuICByZWdpc3Rlckl0ZW0oaXRlbTogQWpmQ2hlY2tib3hHcm91cEl0ZW08VD4pOiB2b2lkIHtcbiAgICB0aGlzLmNoZWNrYm94ZXMucHVzaChpdGVtKTtcbiAgfVxuXG4gIC8qKiBUaGUgbWV0aG9kIHRvIGJlIGNhbGxlZCBpbiBvcmRlciB0byB1cGRhdGUgbmdNb2RlbC4gKi9cbiAgcHJpdmF0ZSBfY29udHJvbFZhbHVlQWNjZXNzb3JDaGFuZ2VGbjogKHZhbHVlOiBhbnkpID0+IHZvaWQgPSAoXykgPT4ge307XG5cbiAgcHJpdmF0ZSBfdXBkYXRlQ2hlY2tib3hlc05hbWVzKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmNoZWNrYm94ZXMgPT0gbnVsbCkgeyByZXR1cm47IH1cbiAgICB0aGlzLmNoZWNrYm94ZXMuZm9yRWFjaCgoY2hlY2tib3gpID0+IHtcbiAgICAgIGlmIChjaGVja2JveCA9PSBudWxsKSB7IHJldHVybjsgfVxuICAgICAgY2hlY2tib3gubmFtZSA9IHRoaXMuX25hbWU7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVTZWxlY3RlZENoZWNrYm94ZXNGcm9tVmFsdWUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY2hlY2tib3hlcyA9PSBudWxsKSB7IHJldHVybjsgfVxuICAgIHRoaXMuY2hlY2tib3hlcy5mb3JFYWNoKGNoZWNrYm94ID0+IHtcbiAgICAgIGlmIChjaGVja2JveCA9PSBudWxsKSB7IHJldHVybjsgfVxuICAgICAgaWYgKCh0aGlzLl92YWx1ZSB8fCBbXSkuaW5kZXhPZihjaGVja2JveC52YWx1ZSkgPiAtMSkge1xuICAgICAgICBjaGVja2JveC5jaGVja2VkID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNoZWNrYm94LmNoZWNrZWQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBEaXNwYXRjaCBjaGFuZ2UgZXZlbnQgd2l0aCBjdXJyZW50IHNlbGVjdGlvbiBhbmQgZ3JvdXAgdmFsdWUuICovXG4gIHByaXZhdGUgX2VtaXRDaGFuZ2VFdmVudCgpOiB2b2lkIHtcbiAgICBsZXQgZXZlbnQgPSBuZXcgQWpmQ2hlY2tib3hHcm91cENoYW5nZTxUPigpO1xuICAgIGV2ZW50LnNvdXJjZSA9IHRoaXM7XG4gICAgZXZlbnQudmFsdWUgPSB0aGlzLl92YWx1ZTtcbiAgICB0aGlzLl9jb250cm9sVmFsdWVBY2Nlc3NvckNoYW5nZUZuKGV2ZW50LnZhbHVlKTtcbiAgICB0aGlzLl9jaGFuZ2UuZW1pdChldmVudCk7XG4gIH1cblxuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfZGlzYWJsZWQ6IEJvb2xlYW5JbnB1dDtcbn1cblxuQERpcmVjdGl2ZSgpXG5leHBvcnQgY2xhc3MgQWpmQ2hlY2tib3hHcm91cEl0ZW08VD4gaW1wbGVtZW50cyBPbkluaXQge1xuICAvKiogVGhlIHVuaXF1ZSBJRCBmb3IgdGhpcyBidXR0b24gdG9nZ2xlLiAqL1xuICBwcml2YXRlIF9jaGVja2JveElkOiBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignJyk7XG4gIHJlYWRvbmx5IGNoZWNrYm94SWQ6IE9ic2VydmFibGU8c3RyaW5nPiA9IHRoaXMuX2NoZWNrYm94SWQuYXNPYnNlcnZhYmxlKCk7XG5cbiAgQElucHV0KCkgc2V0IGlkKGlkOiBzdHJpbmcpIHsgdGhpcy5fY2hlY2tib3hJZC5uZXh0KGlkKTsgfVxuXG4gIEBJbnB1dCgpIG5hbWU6IHN0cmluZztcblxuICAvKiogVGhlIHBhcmVudCBidXR0b24gdG9nZ2xlIGdyb3VwIChleGNsdXNpdmUgc2VsZWN0aW9uKS4gT3B0aW9uYWwuICovXG4gIHJlYWRvbmx5IGNoZWNrYm94R3JvdXA6IEFqZkNoZWNrYm94R3JvdXA8VD47XG5cbiAgLyoqIFdoZXRoZXIgb3Igbm90IHRoaXMgYnV0dG9uIHRvZ2dsZSBpcyBjaGVja2VkLiAqL1xuICBwcml2YXRlIF9jaGVja2VkU3RhdGU6IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICByZWFkb25seSBjaGVja2VkU3RhdGU6IE9ic2VydmFibGU8Ym9vbGVhbj4gPSB0aGlzLl9jaGVja2VkU3RhdGUuYXNPYnNlcnZhYmxlKCk7XG4gIGdldCBjaGVja2VkKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fY2hlY2tlZFN0YXRlLmdldFZhbHVlKCk7IH1cbiAgQElucHV0KCkgc2V0IGNoZWNrZWQoY2hlY2tlZDogYm9vbGVhbikgeyB0aGlzLl9jaGVja2VkU3RhdGUubmV4dChjaGVja2VkKTsgfVxuXG4gIC8qKiBXaGV0aGVyIG9yIG5vdCB0aGlzIGJ1dHRvbiB0b2dnbGUgaXMgZGlzYWJsZWQuICovXG4gIHByaXZhdGUgX2Rpc2FibGVkU3RhdGU6IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICByZWFkb25seSBkaXNhYmxlZFN0YXRlOiBPYnNlcnZhYmxlPGJvb2xlYW4+ID0gdGhpcy5fZGlzYWJsZWRTdGF0ZS5hc09ic2VydmFibGUoKTtcbiAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGRpc2FibGVkID0gdGhpcy5fZGlzYWJsZWRTdGF0ZS5nZXRWYWx1ZSgpO1xuICAgIHJldHVybiBkaXNhYmxlZCB8fCAodGhpcy5jaGVja2JveEdyb3VwICE9IG51bGwgJiYgdGhpcy5jaGVja2JveEdyb3VwLmRpc2FibGVkKTtcbiAgfVxuICBASW5wdXQoKSBzZXQgZGlzYWJsZWQoZGlzYWJsZWQ6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9kaXNhYmxlZFN0YXRlLm5leHQoZGlzYWJsZWQgIT0gbnVsbCAmJiBkaXNhYmxlZCAhPT0gZmFsc2UpO1xuICB9XG5cbiAgLyoqIFZhbHVlIGFzc2lnbmVkIHRvIHRoaXMgYnV0dG9uIHRvZ2dsZS4gKi9cbiAgcHJpdmF0ZSBfdmFsdWU6IFQ7XG4gIGdldCB2YWx1ZSgpOiBUIHsgcmV0dXJuIHRoaXMuX3ZhbHVlOyB9XG4gIEBJbnB1dCgpIHNldCB2YWx1ZSh2YWx1ZTogVCkge1xuICAgIGlmICh0aGlzLl92YWx1ZSAhPT0gdmFsdWUpIHtcbiAgICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIF9yZWFkb25seTogYm9vbGVhbjtcbiAgZ2V0IHJlYWRvbmx5KCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fcmVhZG9ubHk7IH1cbiAgQElucHV0KCkgc2V0IHJlYWRvbmx5KHJlYWRvbmx5OiBib29sZWFuKSB7XG4gICAgdGhpcy5fcmVhZG9ubHkgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkocmVhZG9ubHkpO1xuICB9XG5cbiAgcHJpdmF0ZSBfY2hlY2tlZEljb25WYWw6IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCcnKTtcbiAgZ2V0IGNoZWNrZWRJY29uKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLl9jaGVja2VkSWNvblZhbC5nZXRWYWx1ZSgpOyB9XG4gIEBJbnB1dCgpIHNldCBjaGVja2VkSWNvbihpY29uOiBzdHJpbmcpIHsgdGhpcy5fY2hlY2tlZEljb25WYWwubmV4dChpY29uKTsgfVxuXG4gIHByaXZhdGUgX25vdENoZWNrZWRJY29uVmFsOiBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPiA9XG4gICAgICBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJycpO1xuICBnZXQgbm90Q2hlY2tlZEljb24oKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX25vdENoZWNrZWRJY29uVmFsLmdldFZhbHVlKCk7IH1cbiAgQElucHV0KCkgc2V0IG5vdENoZWNrZWRJY29uKGljb246IHN0cmluZykgeyB0aGlzLl9ub3RDaGVja2VkSWNvblZhbC5uZXh0KGljb24pOyB9XG5cbiAgcmVhZG9ubHkgaWNvbjogT2JzZXJ2YWJsZTxzdHJpbmc+O1xuXG4gIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIGdyb3VwIHZhbHVlIGNoYW5nZXMuICovXG4gIHByaXZhdGUgX2NoYW5nZTogRXZlbnRFbWl0dGVyPEFqZkNoZWNrYm94R3JvdXBJdGVtQ2hhbmdlPFQ+PlxuICAgID0gbmV3IEV2ZW50RW1pdHRlcjxBamZDaGVja2JveEdyb3VwSXRlbUNoYW5nZTxUPj4oKTtcbiAgQE91dHB1dCgpXG4gIHJlYWRvbmx5IGNoYW5nZTogT2JzZXJ2YWJsZTxBamZDaGVja2JveEdyb3VwSXRlbUNoYW5nZTxUPj4gPSB0aGlzLl9jaGFuZ2UuYXNPYnNlcnZhYmxlKCk7XG5cbiAgY29uc3RydWN0b3IoY2hlY2tib3hHcm91cD86IEFqZkNoZWNrYm94R3JvdXA8VD4pIHtcbiAgICB0aGlzLmljb24gPSBjb21iaW5lTGF0ZXN0KFxuICAgICAgdGhpcy5fY2hlY2tlZFN0YXRlLCB0aGlzLl9jaGVja2VkSWNvblZhbCwgdGhpcy5fbm90Q2hlY2tlZEljb25WYWxcbiAgICApLnBpcGUoXG4gICAgICBtYXAociA9PiByWzBdID8gclsxXSA6IHJbMl0pXG4gICAgKTtcblxuICAgIGlmIChjaGVja2JveEdyb3VwKSB7XG4gICAgICB0aGlzLmNoZWNrYm94R3JvdXAgPSBjaGVja2JveEdyb3VwO1xuICAgICAgdGhpcy5jaGVja2JveEdyb3VwLnJlZ2lzdGVySXRlbSh0aGlzKTtcbiAgICB9XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAodGhpcy5pZCA9PSBudWxsKSB7XG4gICAgICB0aGlzLmlkID0gYGFqZi1jaGVja2JveC1ncm91cC1pdGVtLSR7X3VuaXF1ZUlkQ291bnRlcisrfWA7XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgdGhpcy5jaGVja2JveEdyb3VwICYmIHRoaXMuY2hlY2tib3hHcm91cC52YWx1ZSAmJlxuICAgICAgdGhpcy5jaGVja2JveEdyb3VwLnZhbHVlLmluZGV4T2YodGhpcy5fdmFsdWUpID4gLTFcbiAgICApIHtcbiAgICAgIHRoaXMuY2hlY2tlZCA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgLyoqIENoZWNrcyB0aGUgYnV0dG9uIHRvZ2dsZSBkdWUgdG8gYW4gaW50ZXJhY3Rpb24gd2l0aCB0aGUgdW5kZXJseWluZyBuYXRpdmUgaW5wdXQuICovXG4gIG9uSW5wdXRDaGFuZ2UoZXZlbnQ6IEV2ZW50KSB7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICB0aGlzLl90b2dnbGUoKTtcbiAgfVxuXG4gIC8qKiBUb2dnbGUgdGhlIHN0YXRlIG9mIHRoZSBjdXJyZW50IGJ1dHRvbiB0b2dnbGUuICovXG4gIHByaXZhdGUgX3RvZ2dsZSgpOiB2b2lkIHtcbiAgICB0aGlzLmNoZWNrZWQgPSAhdGhpcy5jaGVja2VkO1xuXG4gICAgaWYgKHRoaXMuY2hlY2tib3hHcm91cCAhPSBudWxsKSB7XG4gICAgICBpZiAodGhpcy5jaGVja2VkKSB7XG4gICAgICAgIHRoaXMuY2hlY2tib3hHcm91cC5hZGRWYWx1ZSh0aGlzLl92YWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNoZWNrYm94R3JvdXAucmVtb3ZlVmFsdWUodGhpcy5fdmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19