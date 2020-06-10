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
export const AJF_CHECKBOX_GROUP_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AjfCheckboxGroup),
    multi: true
};
export class AjfCheckboxGroupItemChange {
}
export class AjfCheckboxGroupChange {
}
let _uniqueIdCounter = 0;
let AjfCheckboxGroup = /** @class */ (() => {
    class AjfCheckboxGroup {
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
    return AjfCheckboxGroup;
})();
export { AjfCheckboxGroup };
let AjfCheckboxGroupItem = /** @class */ (() => {
    class AjfCheckboxGroupItem {
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
    return AjfCheckboxGroupItem;
})();
export { AjfCheckboxGroupItem };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3gtZ3JvdXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9jaGVja2JveC1ncm91cC9jaGVja2JveC1ncm91cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQWUscUJBQXFCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUMxRSxPQUFPLEVBRUwsU0FBUyxFQUNULFlBQVksRUFDWixVQUFVLEVBQ1YsS0FBSyxFQUVMLE1BQU0sRUFDUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQXVCLGlCQUFpQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDdkUsT0FBTyxFQUFDLGVBQWUsRUFBRSxhQUFhLEVBQUUsVUFBVSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQ2hFLE9BQU8sRUFBQyxHQUFHLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUduQyxNQUFNLENBQUMsTUFBTSxpQ0FBaUMsR0FBUTtJQUNwRCxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsZ0JBQWdCLENBQUM7SUFDL0MsS0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDO0FBRUYsTUFBTSxPQUFPLDBCQUEwQjtDQUd0QztBQUVELE1BQU0sT0FBTyxzQkFBc0I7Q0FHbEM7QUFFRCxJQUFJLGdCQUFnQixHQUFHLENBQUMsQ0FBQztBQUd6QjtJQUFBLE1BSWEsZ0JBQWdCO1FBSjdCO1lBS0UsZUFBVSxHQUE4QixFQUFFLENBQUM7WUFFM0MsNEZBQTRGO1lBQ3BGLFdBQU0sR0FBUSxFQUFFLENBQUM7WUF3QnpCLHlDQUF5QztZQUNqQyxjQUFTLEdBQVksS0FBSyxDQUFDO1lBU25DLG9FQUFvRTtZQUM1RCxjQUFTLEdBQThCLEVBQUUsQ0FBQztZQWtCbEQsb0RBQW9EO1lBQzVDLFlBQU8sR0FDWCxJQUFJLFlBQVks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SyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7Z0JBQ3RELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO2FBQ3JCO1FBQ0gsQ0FBQztRQUVELHVGQUF1RjtRQUN2RixhQUFhLENBQUMsS0FBWTtZQUN4QixLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7WUFFeEIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2pCLENBQUM7UUFFRCxxREFBcUQ7UUFDN0MsT0FBTztZQUNiLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBRTdCLElBQUksSUFBSSxDQUFDLGFBQWEsSUFBSSxJQUFJLEVBQUU7Z0JBQzlCLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtvQkFDaEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2lCQUMxQztxQkFBTTtvQkFDTCxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7aUJBQzdDO2FBQ0Y7UUFDSCxDQUFDOzs7Z0JBcEhGLFNBQVM7Ozs7Z0JBNkVvQixnQkFBZ0I7OztxQkF2RTNDLEtBQUs7dUJBS0wsS0FBSzswQkFXTCxLQUFLOzJCQVlMLEtBQUs7d0JBVUwsS0FBSzs4QkFXTCxLQUFLO2lDQVNMLEtBQUs7eUJBVUwsTUFBTTs7SUEyQ1QsMkJBQUM7S0FBQTtTQXBIWSxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7Qm9vbGVhbklucHV0LCBjb2VyY2VCb29sZWFuUHJvcGVydHl9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge1xuICBBZnRlckNvbnRlbnRJbml0LFxuICBEaXJlY3RpdmUsXG4gIEV2ZW50RW1pdHRlcixcbiAgZm9yd2FyZFJlZixcbiAgSW5wdXQsXG4gIE9uSW5pdCxcbiAgT3V0cHV0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1J9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7QmVoYXZpb3JTdWJqZWN0LCBjb21iaW5lTGF0ZXN0LCBPYnNlcnZhYmxlfSBmcm9tICdyeGpzJztcbmltcG9ydCB7bWFwfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cblxuZXhwb3J0IGNvbnN0IEFKRl9DSEVDS0JPWF9HUk9VUF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gQWpmQ2hlY2tib3hHcm91cCksXG4gIG11bHRpOiB0cnVlXG59O1xuXG5leHBvcnQgY2xhc3MgQWpmQ2hlY2tib3hHcm91cEl0ZW1DaGFuZ2U8VD4ge1xuICBzb3VyY2U6IEFqZkNoZWNrYm94R3JvdXBJdGVtPFQ+O1xuICB2YWx1ZTogYW55O1xufVxuXG5leHBvcnQgY2xhc3MgQWpmQ2hlY2tib3hHcm91cENoYW5nZTxUPiB7XG4gIHNvdXJjZTogQWpmQ2hlY2tib3hHcm91cDxUPjtcbiAgdmFsdWU6IGFueTtcbn1cblxubGV0IF91bmlxdWVJZENvdW50ZXIgPSAwO1xuXG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ2FqZi1jaGVja2JveC1ncm91cCxbYWpmLWNoZWNrYm94LWdyb3VwXScsXG4gIHByb3ZpZGVyczogW0FKRl9DSEVDS0JPWF9HUk9VUF9WQUxVRV9BQ0NFU1NPUl1cbn0pXG5leHBvcnQgY2xhc3MgQWpmQ2hlY2tib3hHcm91cDxUPiBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgY2hlY2tib3hlczogQWpmQ2hlY2tib3hHcm91cEl0ZW08VD5bXSA9IFtdO1xuXG4gIC8qKiBUaGUgdmFsdWUgZm9yIHRoZSBidXR0b24gdG9nZ2xlIGdyb3VwLiBTaG91bGQgbWF0Y2ggY3VycmVudGx5IHNlbGVjdGVkIGJ1dHRvbiB0b2dnbGUuICovXG4gIHByaXZhdGUgX3ZhbHVlOiBUW10gPSBbXTtcbiAgZ2V0IHZhbHVlKCk6IFRbXSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCB2YWx1ZShuZXdWYWx1ZTogVFtdKSB7XG4gICAgaWYgKHRoaXMuX3ZhbHVlICE9PSBuZXdWYWx1ZSkge1xuICAgICAgdGhpcy5fdmFsdWUgPSBuZXdWYWx1ZTtcbiAgICAgIHRoaXMuX3VwZGF0ZVNlbGVjdGVkQ2hlY2tib3hlc0Zyb21WYWx1ZSgpO1xuICAgICAgdGhpcy5fZW1pdENoYW5nZUV2ZW50KCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIFRoZSBIVE1MIG5hbWUgYXR0cmlidXRlIGFwcGxpZWQgdG8gdG9nZ2xlcyBpbiB0aGlzIGdyb3VwLiAqL1xuICBwcml2YXRlIF9uYW1lOiBzdHJpbmc7XG4gIGdldCBuYW1lKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX25hbWU7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IG5hbWUodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuX25hbWUgPSB2YWx1ZTtcbiAgICB0aGlzLl91cGRhdGVDaGVja2JveGVzTmFtZXMoKTtcbiAgfVxuXG4gIC8qKiBEaXNhYmxlcyBhbGwgdG9nZ2xlcyBpbiB0aGUgZ3JvdXAuICovXG4gIHByaXZhdGUgX2Rpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG4gIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IGRpc2FibGVkKHZhbHVlKSB7XG4gICAgdGhpcy5fZGlzYWJsZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICB9XG5cbiAgLyoqIFRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgYnV0dG9uIHRvZ2dsZSwgc2hvdWxkIG1hdGNoIHRoZSB2YWx1ZS4gKi9cbiAgcHJpdmF0ZSBfc2VsZWN0ZWQ6IEFqZkNoZWNrYm94R3JvdXBJdGVtPFQ+W10gPSBbXTtcbiAgZ2V0IHNlbGVjdGVkKCkge1xuICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZDtcbiAgfVxuICBzZXQgc2VsZWN0ZWQoc2VsZWN0ZWQ6IEFqZkNoZWNrYm94R3JvdXBJdGVtPFQ+W10pIHtcbiAgICB0aGlzLl9zZWxlY3RlZCA9IHNlbGVjdGVkO1xuICAgIGxldCB2YWx1ZXM6IFRbXSA9IFtdO1xuICAgIGlmIChzZWxlY3RlZCkge1xuICAgICAgc2VsZWN0ZWQuZm9yRWFjaChjID0+IHtcbiAgICAgICAgdmFsdWVzLnB1c2goYy52YWx1ZSk7XG4gICAgICAgIGlmICghYy5jaGVja2VkKSB7XG4gICAgICAgICAgYy5jaGVja2VkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIHRoaXMuX3ZhbHVlID0gdmFsdWVzO1xuICB9XG5cbiAgLyoqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgZ3JvdXAncyB2YWx1ZSBjaGFuZ2VzLiAqL1xuICBwcml2YXRlIF9jaGFuZ2U6IEV2ZW50RW1pdHRlcjxBamZDaGVja2JveEdyb3VwQ2hhbmdlPFQ+PiA9XG4gICAgICBuZXcgRXZlbnRFbWl0dGVyPEFqZkNoZWNrYm94R3JvdXBDaGFuZ2U8VD4+KCk7XG4gIEBPdXRwdXQoKSByZWFkb25seSBjaGFuZ2U6IE9ic2VydmFibGU8QWpmQ2hlY2tib3hHcm91cENoYW5nZTxUPj4gPSB0aGlzLl9jaGFuZ2UuYXNPYnNlcnZhYmxlKCk7XG5cbiAgLyoqIG9uVG91Y2ggZnVuY3Rpb24gcmVnaXN0ZXJlZCB2aWEgcmVnaXN0ZXJPblRvdWNoIChDb250cm9sVmFsdWVBY2Nlc3NvcikuICovXG4gIG9uVG91Y2hlZDogKCkgPT4gYW55ID0gKCkgPT4ge307XG5cbiAgLyoqXG4gICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gICAqL1xuICB3cml0ZVZhbHVlKHZhbHVlOiBUW10pIHtcbiAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICAvKipcbiAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci5cbiAgICovXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46ICh2YWx1ZTogVFtdKSA9PiB2b2lkKSB7XG4gICAgdGhpcy5fY29udHJvbFZhbHVlQWNjZXNzb3JDaGFuZ2VGbiA9IGZuO1xuICB9XG5cbiAgLyoqXG4gICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gICAqL1xuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KSB7XG4gICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcbiAgfVxuXG4gIGFkZFZhbHVlKHZhbHVlOiBUKSB7XG4gICAgbGV0IGN1clZhbHVlID0gKHRoaXMuX3ZhbHVlIHx8IFtdKS5zbGljZSgwKTtcbiAgICBpZiAoY3VyVmFsdWUuaW5kZXhPZih2YWx1ZSkgPT09IC0xKSB7XG4gICAgICBjdXJWYWx1ZS5wdXNoKHZhbHVlKTtcbiAgICAgIHRoaXMudmFsdWUgPSBjdXJWYWx1ZTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVWYWx1ZSh2YWx1ZTogVCkge1xuICAgIGxldCBjdXJWYWx1ZSA9ICh0aGlzLl92YWx1ZSB8fCBbXSkuc2xpY2UoMCk7XG4gICAgbGV0IGlkeCA9IGN1clZhbHVlLmluZGV4T2YodmFsdWUpO1xuICAgIGlmIChpZHggPiAtMSkge1xuICAgICAgY3VyVmFsdWUuc3BsaWNlKGlkeCwgMSk7XG4gICAgICB0aGlzLnZhbHVlID0gY3VyVmFsdWU7XG4gICAgfVxuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xuICAgIHRoaXMuX3VwZGF0ZUNoZWNrYm94ZXNOYW1lcygpO1xuICAgIHRoaXMuX3VwZGF0ZVNlbGVjdGVkQ2hlY2tib3hlc0Zyb21WYWx1ZSgpO1xuICB9XG5cbiAgcmVnaXN0ZXJJdGVtKGl0ZW06IEFqZkNoZWNrYm94R3JvdXBJdGVtPFQ+KTogdm9pZCB7XG4gICAgdGhpcy5jaGVja2JveGVzLnB1c2goaXRlbSk7XG4gIH1cblxuICAvKiogVGhlIG1ldGhvZCB0byBiZSBjYWxsZWQgaW4gb3JkZXIgdG8gdXBkYXRlIG5nTW9kZWwuICovXG4gIHByaXZhdGUgX2NvbnRyb2xWYWx1ZUFjY2Vzc29yQ2hhbmdlRm46ICh2YWx1ZTogYW55KSA9PiB2b2lkID0gKF8pID0+IHt9O1xuXG4gIHByaXZhdGUgX3VwZGF0ZUNoZWNrYm94ZXNOYW1lcygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5jaGVja2JveGVzID09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5jaGVja2JveGVzLmZvckVhY2goKGNoZWNrYm94KSA9PiB7XG4gICAgICBpZiAoY2hlY2tib3ggPT0gbnVsbCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjaGVja2JveC5uYW1lID0gdGhpcy5fbmFtZTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX3VwZGF0ZVNlbGVjdGVkQ2hlY2tib3hlc0Zyb21WYWx1ZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5jaGVja2JveGVzID09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5jaGVja2JveGVzLmZvckVhY2goY2hlY2tib3ggPT4ge1xuICAgICAgaWYgKGNoZWNrYm94ID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKCh0aGlzLl92YWx1ZSB8fCBbXSkuaW5kZXhPZihjaGVja2JveC52YWx1ZSkgPiAtMSkge1xuICAgICAgICBjaGVja2JveC5jaGVja2VkID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNoZWNrYm94LmNoZWNrZWQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBEaXNwYXRjaCBjaGFuZ2UgZXZlbnQgd2l0aCBjdXJyZW50IHNlbGVjdGlvbiBhbmQgZ3JvdXAgdmFsdWUuICovXG4gIHByaXZhdGUgX2VtaXRDaGFuZ2VFdmVudCgpOiB2b2lkIHtcbiAgICBsZXQgZXZlbnQgPSBuZXcgQWpmQ2hlY2tib3hHcm91cENoYW5nZTxUPigpO1xuICAgIGV2ZW50LnNvdXJjZSA9IHRoaXM7XG4gICAgZXZlbnQudmFsdWUgPSB0aGlzLl92YWx1ZTtcbiAgICB0aGlzLl9jb250cm9sVmFsdWVBY2Nlc3NvckNoYW5nZUZuKGV2ZW50LnZhbHVlKTtcbiAgICB0aGlzLl9jaGFuZ2UuZW1pdChldmVudCk7XG4gIH1cblxuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfZGlzYWJsZWQ6IEJvb2xlYW5JbnB1dDtcbn1cblxuQERpcmVjdGl2ZSgpXG5leHBvcnQgY2xhc3MgQWpmQ2hlY2tib3hHcm91cEl0ZW08VD4gaW1wbGVtZW50cyBPbkluaXQge1xuICAvKiogVGhlIHVuaXF1ZSBJRCBmb3IgdGhpcyBidXR0b24gdG9nZ2xlLiAqL1xuICBwcml2YXRlIF9jaGVja2JveElkOiBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignJyk7XG4gIHJlYWRvbmx5IGNoZWNrYm94SWQ6IE9ic2VydmFibGU8c3RyaW5nPiA9IHRoaXMuX2NoZWNrYm94SWQuYXNPYnNlcnZhYmxlKCk7XG5cbiAgQElucHV0KClcbiAgc2V0IGlkKGlkOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9jaGVja2JveElkLm5leHQoaWQpO1xuICB9XG5cbiAgQElucHV0KCkgbmFtZTogc3RyaW5nO1xuXG4gIC8qKiBUaGUgcGFyZW50IGJ1dHRvbiB0b2dnbGUgZ3JvdXAgKGV4Y2x1c2l2ZSBzZWxlY3Rpb24pLiBPcHRpb25hbC4gKi9cbiAgcmVhZG9ubHkgY2hlY2tib3hHcm91cDogQWpmQ2hlY2tib3hHcm91cDxUPjtcblxuICAvKiogV2hldGhlciBvciBub3QgdGhpcyBidXR0b24gdG9nZ2xlIGlzIGNoZWNrZWQuICovXG4gIHByaXZhdGUgX2NoZWNrZWRTdGF0ZTogQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHJlYWRvbmx5IGNoZWNrZWRTdGF0ZTogT2JzZXJ2YWJsZTxib29sZWFuPiA9IHRoaXMuX2NoZWNrZWRTdGF0ZS5hc09ic2VydmFibGUoKTtcbiAgZ2V0IGNoZWNrZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2NoZWNrZWRTdGF0ZS5nZXRWYWx1ZSgpO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBjaGVja2VkKGNoZWNrZWQ6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9jaGVja2VkU3RhdGUubmV4dChjaGVja2VkKTtcbiAgfVxuXG4gIC8qKiBXaGV0aGVyIG9yIG5vdCB0aGlzIGJ1dHRvbiB0b2dnbGUgaXMgZGlzYWJsZWQuICovXG4gIHByaXZhdGUgX2Rpc2FibGVkU3RhdGU6IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICByZWFkb25seSBkaXNhYmxlZFN0YXRlOiBPYnNlcnZhYmxlPGJvb2xlYW4+ID0gdGhpcy5fZGlzYWJsZWRTdGF0ZS5hc09ic2VydmFibGUoKTtcbiAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGRpc2FibGVkID0gdGhpcy5fZGlzYWJsZWRTdGF0ZS5nZXRWYWx1ZSgpO1xuICAgIHJldHVybiBkaXNhYmxlZCB8fCAodGhpcy5jaGVja2JveEdyb3VwICE9IG51bGwgJiYgdGhpcy5jaGVja2JveEdyb3VwLmRpc2FibGVkKTtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgZGlzYWJsZWQoZGlzYWJsZWQ6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9kaXNhYmxlZFN0YXRlLm5leHQoZGlzYWJsZWQgIT0gbnVsbCAmJiBkaXNhYmxlZCAhPT0gZmFsc2UpO1xuICB9XG5cbiAgLyoqIFZhbHVlIGFzc2lnbmVkIHRvIHRoaXMgYnV0dG9uIHRvZ2dsZS4gKi9cbiAgcHJpdmF0ZSBfdmFsdWU6IFQ7XG4gIGdldCB2YWx1ZSgpOiBUIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IHZhbHVlKHZhbHVlOiBUKSB7XG4gICAgaWYgKHRoaXMuX3ZhbHVlICE9PSB2YWx1ZSkge1xuICAgICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9jaGVja2VkSWNvblZhbDogQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJycpO1xuICBnZXQgY2hlY2tlZEljb24oKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fY2hlY2tlZEljb25WYWwuZ2V0VmFsdWUoKTtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgY2hlY2tlZEljb24oaWNvbjogc3RyaW5nKSB7XG4gICAgdGhpcy5fY2hlY2tlZEljb25WYWwubmV4dChpY29uKTtcbiAgfVxuXG4gIHByaXZhdGUgX25vdENoZWNrZWRJY29uVmFsOiBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignJyk7XG4gIGdldCBub3RDaGVja2VkSWNvbigpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9ub3RDaGVja2VkSWNvblZhbC5nZXRWYWx1ZSgpO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBub3RDaGVja2VkSWNvbihpY29uOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9ub3RDaGVja2VkSWNvblZhbC5uZXh0KGljb24pO1xuICB9XG5cbiAgcmVhZG9ubHkgaWNvbjogT2JzZXJ2YWJsZTxzdHJpbmc+O1xuXG4gIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIGdyb3VwIHZhbHVlIGNoYW5nZXMuICovXG4gIHByaXZhdGUgX2NoYW5nZTogRXZlbnRFbWl0dGVyPEFqZkNoZWNrYm94R3JvdXBJdGVtQ2hhbmdlPFQ+PiA9XG4gICAgICBuZXcgRXZlbnRFbWl0dGVyPEFqZkNoZWNrYm94R3JvdXBJdGVtQ2hhbmdlPFQ+PigpO1xuICBAT3V0cHV0KClcbiAgcmVhZG9ubHkgY2hhbmdlOiBPYnNlcnZhYmxlPEFqZkNoZWNrYm94R3JvdXBJdGVtQ2hhbmdlPFQ+PiA9IHRoaXMuX2NoYW5nZS5hc09ic2VydmFibGUoKTtcblxuICBjb25zdHJ1Y3RvcihjaGVja2JveEdyb3VwPzogQWpmQ2hlY2tib3hHcm91cDxUPikge1xuICAgIHRoaXMuaWNvbiA9IGNvbWJpbmVMYXRlc3QodGhpcy5fY2hlY2tlZFN0YXRlLCB0aGlzLl9jaGVja2VkSWNvblZhbCwgdGhpcy5fbm90Q2hlY2tlZEljb25WYWwpXG4gICAgICAgICAgICAgICAgICAgIC5waXBlKG1hcChyID0+IHJbMF0gPyByWzFdIDogclsyXSkpO1xuXG4gICAgaWYgKGNoZWNrYm94R3JvdXApIHtcbiAgICAgIHRoaXMuY2hlY2tib3hHcm91cCA9IGNoZWNrYm94R3JvdXA7XG4gICAgICB0aGlzLmNoZWNrYm94R3JvdXAucmVnaXN0ZXJJdGVtKHRoaXMpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICh0aGlzLmlkID09IG51bGwpIHtcbiAgICAgIHRoaXMuaWQgPSBgYWpmLWNoZWNrYm94LWdyb3VwLWl0ZW0tJHtfdW5pcXVlSWRDb3VudGVyKyt9YDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5jaGVja2JveEdyb3VwICYmIHRoaXMuY2hlY2tib3hHcm91cC52YWx1ZSAmJlxuICAgICAgICB0aGlzLmNoZWNrYm94R3JvdXAudmFsdWUuaW5kZXhPZih0aGlzLl92YWx1ZSkgPiAtMSkge1xuICAgICAgdGhpcy5jaGVja2VkID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICAvKiogQ2hlY2tzIHRoZSBidXR0b24gdG9nZ2xlIGR1ZSB0byBhbiBpbnRlcmFjdGlvbiB3aXRoIHRoZSB1bmRlcmx5aW5nIG5hdGl2ZSBpbnB1dC4gKi9cbiAgb25JbnB1dENoYW5nZShldmVudDogRXZlbnQpIHtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgIHRoaXMuX3RvZ2dsZSgpO1xuICB9XG5cbiAgLyoqIFRvZ2dsZSB0aGUgc3RhdGUgb2YgdGhlIGN1cnJlbnQgYnV0dG9uIHRvZ2dsZS4gKi9cbiAgcHJpdmF0ZSBfdG9nZ2xlKCk6IHZvaWQge1xuICAgIHRoaXMuY2hlY2tlZCA9ICF0aGlzLmNoZWNrZWQ7XG5cbiAgICBpZiAodGhpcy5jaGVja2JveEdyb3VwICE9IG51bGwpIHtcbiAgICAgIGlmICh0aGlzLmNoZWNrZWQpIHtcbiAgICAgICAgdGhpcy5jaGVja2JveEdyb3VwLmFkZFZhbHVlKHRoaXMuX3ZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY2hlY2tib3hHcm91cC5yZW1vdmVWYWx1ZSh0aGlzLl92YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=