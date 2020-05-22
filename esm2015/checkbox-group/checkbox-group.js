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
import { __decorate, __metadata } from "tslib";
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
export { AjfCheckboxGroup };
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
export { AjfCheckboxGroupItem };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3gtZ3JvdXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9jaGVja2JveC1ncm91cC9jaGVja2JveC1ncm91cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7O0FBRUgsT0FBTyxFQUFlLHFCQUFxQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDMUUsT0FBTyxFQUVMLFNBQVMsRUFDVCxZQUFZLEVBQ1osVUFBVSxFQUNWLEtBQUssRUFFTCxNQUFNLEVBQ1AsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUF1QixpQkFBaUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ3ZFLE9BQU8sRUFBQyxlQUFlLEVBQUUsYUFBYSxFQUFFLFVBQVUsRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUNoRSxPQUFPLEVBQUMsR0FBRyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFHbkMsTUFBTSxDQUFDLE1BQU0saUNBQWlDLEdBQVE7SUFDcEQsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLGdCQUFnQixDQUFDO0lBQy9DLEtBQUssRUFBRSxJQUFJO0NBQ1osQ0FBQztBQUVGLE1BQU0sT0FBTywwQkFBMEI7Q0FHdEM7QUFFRCxNQUFNLE9BQU8sc0JBQXNCO0NBR2xDO0FBRUQsSUFBSSxnQkFBZ0IsR0FBRyxDQUFDLENBQUM7QUFPekI7SUFBQSxJQUFhLGdCQUFnQixHQUE3QixNQUFhLGdCQUFnQjtRQUE3QjtZQUNFLGVBQVUsR0FBOEIsRUFBRSxDQUFDO1lBRTNDLDRGQUE0RjtZQUNwRixXQUFNLEdBQVEsRUFBRSxDQUFDO1lBd0J6Qix5Q0FBeUM7WUFDakMsY0FBUyxHQUFZLEtBQUssQ0FBQztZQVNuQyxvRUFBb0U7WUFDNUQsY0FBUyxHQUE4QixFQUFFLENBQUM7WUFrQmxELG9EQUFvRDtZQUM1QyxZ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RTtrQ0FDUSxVQUFVO3dEQUE4RDtJQTFFOUUsb0JBQW9CO1FBRGhDLFNBQVMsRUFBRTt5Q0E2RWtCLGdCQUFnQjtPQTVFakMsb0JBQW9CLENBb0hoQztJQUFELDJCQUFDO0tBQUE7U0FwSFksb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0Jvb2xlYW5JbnB1dCwgY29lcmNlQm9vbGVhblByb3BlcnR5fSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgRGlyZWN0aXZlLFxuICBFdmVudEVtaXR0ZXIsXG4gIGZvcndhcmRSZWYsXG4gIElucHV0LFxuICBPbkluaXQsXG4gIE91dHB1dFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge0JlaGF2aW9yU3ViamVjdCwgY29tYmluZUxhdGVzdCwgT2JzZXJ2YWJsZX0gZnJvbSAncnhqcyc7XG5pbXBvcnQge21hcH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5cbmV4cG9ydCBjb25zdCBBSkZfQ0hFQ0tCT1hfR1JPVVBfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IEFqZkNoZWNrYm94R3JvdXApLFxuICBtdWx0aTogdHJ1ZVxufTtcblxuZXhwb3J0IGNsYXNzIEFqZkNoZWNrYm94R3JvdXBJdGVtQ2hhbmdlPFQ+IHtcbiAgc291cmNlOiBBamZDaGVja2JveEdyb3VwSXRlbTxUPjtcbiAgdmFsdWU6IGFueTtcbn1cblxuZXhwb3J0IGNsYXNzIEFqZkNoZWNrYm94R3JvdXBDaGFuZ2U8VD4ge1xuICBzb3VyY2U6IEFqZkNoZWNrYm94R3JvdXA8VD47XG4gIHZhbHVlOiBhbnk7XG59XG5cbmxldCBfdW5pcXVlSWRDb3VudGVyID0gMDtcblxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdhamYtY2hlY2tib3gtZ3JvdXAsW2FqZi1jaGVja2JveC1ncm91cF0nLFxuICBwcm92aWRlcnM6IFtBSkZfQ0hFQ0tCT1hfR1JPVVBfVkFMVUVfQUNDRVNTT1JdXG59KVxuZXhwb3J0IGNsYXNzIEFqZkNoZWNrYm94R3JvdXA8VD4gaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gIGNoZWNrYm94ZXM6IEFqZkNoZWNrYm94R3JvdXBJdGVtPFQ+W10gPSBbXTtcblxuICAvKiogVGhlIHZhbHVlIGZvciB0aGUgYnV0dG9uIHRvZ2dsZSBncm91cC4gU2hvdWxkIG1hdGNoIGN1cnJlbnRseSBzZWxlY3RlZCBidXR0b24gdG9nZ2xlLiAqL1xuICBwcml2YXRlIF92YWx1ZTogVFtdID0gW107XG4gIGdldCB2YWx1ZSgpOiBUW10ge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgdmFsdWUobmV3VmFsdWU6IFRbXSkge1xuICAgIGlmICh0aGlzLl92YWx1ZSAhPT0gbmV3VmFsdWUpIHtcbiAgICAgIHRoaXMuX3ZhbHVlID0gbmV3VmFsdWU7XG4gICAgICB0aGlzLl91cGRhdGVTZWxlY3RlZENoZWNrYm94ZXNGcm9tVmFsdWUoKTtcbiAgICAgIHRoaXMuX2VtaXRDaGFuZ2VFdmVudCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBUaGUgSFRNTCBuYW1lIGF0dHJpYnV0ZSBhcHBsaWVkIHRvIHRvZ2dsZXMgaW4gdGhpcyBncm91cC4gKi9cbiAgcHJpdmF0ZSBfbmFtZTogc3RyaW5nO1xuICBnZXQgbmFtZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9uYW1lO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBuYW1lKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9uYW1lID0gdmFsdWU7XG4gICAgdGhpcy5fdXBkYXRlQ2hlY2tib3hlc05hbWVzKCk7XG4gIH1cblxuICAvKiogRGlzYWJsZXMgYWxsIHRvZ2dsZXMgaW4gdGhlIGdyb3VwLiAqL1xuICBwcml2YXRlIF9kaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBkaXNhYmxlZCh2YWx1ZSkge1xuICAgIHRoaXMuX2Rpc2FibGVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuXG4gIC8qKiBUaGUgY3VycmVudGx5IHNlbGVjdGVkIGJ1dHRvbiB0b2dnbGUsIHNob3VsZCBtYXRjaCB0aGUgdmFsdWUuICovXG4gIHByaXZhdGUgX3NlbGVjdGVkOiBBamZDaGVja2JveEdyb3VwSXRlbTxUPltdID0gW107XG4gIGdldCBzZWxlY3RlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWQ7XG4gIH1cbiAgc2V0IHNlbGVjdGVkKHNlbGVjdGVkOiBBamZDaGVja2JveEdyb3VwSXRlbTxUPltdKSB7XG4gICAgdGhpcy5fc2VsZWN0ZWQgPSBzZWxlY3RlZDtcbiAgICBsZXQgdmFsdWVzOiBUW10gPSBbXTtcbiAgICBpZiAoc2VsZWN0ZWQpIHtcbiAgICAgIHNlbGVjdGVkLmZvckVhY2goYyA9PiB7XG4gICAgICAgIHZhbHVlcy5wdXNoKGMudmFsdWUpO1xuICAgICAgICBpZiAoIWMuY2hlY2tlZCkge1xuICAgICAgICAgIGMuY2hlY2tlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICB0aGlzLl92YWx1ZSA9IHZhbHVlcztcbiAgfVxuXG4gIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIGdyb3VwJ3MgdmFsdWUgY2hhbmdlcy4gKi9cbiAgcHJpdmF0ZSBfY2hhbmdlOiBFdmVudEVtaXR0ZXI8QWpmQ2hlY2tib3hHcm91cENoYW5nZTxUPj4gPVxuICAgICAgbmV3IEV2ZW50RW1pdHRlcjxBamZDaGVja2JveEdyb3VwQ2hhbmdlPFQ+PigpO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgY2hhbmdlOiBPYnNlcnZhYmxlPEFqZkNoZWNrYm94R3JvdXBDaGFuZ2U8VD4+ID0gdGhpcy5fY2hhbmdlLmFzT2JzZXJ2YWJsZSgpO1xuXG4gIC8qKiBvblRvdWNoIGZ1bmN0aW9uIHJlZ2lzdGVyZWQgdmlhIHJlZ2lzdGVyT25Ub3VjaCAoQ29udHJvbFZhbHVlQWNjZXNzb3IpLiAqL1xuICBvblRvdWNoZWQ6ICgpID0+IGFueSA9ICgpID0+IHt9O1xuXG4gIC8qKlxuICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIENvbnRyb2xWYWx1ZUFjY2Vzc29yLlxuICAgKi9cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogVFtdKSB7XG4gICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gICAqL1xuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAodmFsdWU6IFRbXSkgPT4gdm9pZCkge1xuICAgIHRoaXMuX2NvbnRyb2xWYWx1ZUFjY2Vzc29yQ2hhbmdlRm4gPSBmbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIENvbnRyb2xWYWx1ZUFjY2Vzc29yLlxuICAgKi9cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSkge1xuICAgIHRoaXMub25Ub3VjaGVkID0gZm47XG4gIH1cblxuICBhZGRWYWx1ZSh2YWx1ZTogVCkge1xuICAgIGxldCBjdXJWYWx1ZSA9ICh0aGlzLl92YWx1ZSB8fCBbXSkuc2xpY2UoMCk7XG4gICAgaWYgKGN1clZhbHVlLmluZGV4T2YodmFsdWUpID09PSAtMSkge1xuICAgICAgY3VyVmFsdWUucHVzaCh2YWx1ZSk7XG4gICAgICB0aGlzLnZhbHVlID0gY3VyVmFsdWU7XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlVmFsdWUodmFsdWU6IFQpIHtcbiAgICBsZXQgY3VyVmFsdWUgPSAodGhpcy5fdmFsdWUgfHwgW10pLnNsaWNlKDApO1xuICAgIGxldCBpZHggPSBjdXJWYWx1ZS5pbmRleE9mKHZhbHVlKTtcbiAgICBpZiAoaWR4ID4gLTEpIHtcbiAgICAgIGN1clZhbHVlLnNwbGljZShpZHgsIDEpO1xuICAgICAgdGhpcy52YWx1ZSA9IGN1clZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLl91cGRhdGVDaGVja2JveGVzTmFtZXMoKTtcbiAgICB0aGlzLl91cGRhdGVTZWxlY3RlZENoZWNrYm94ZXNGcm9tVmFsdWUoKTtcbiAgfVxuXG4gIHJlZ2lzdGVySXRlbShpdGVtOiBBamZDaGVja2JveEdyb3VwSXRlbTxUPik6IHZvaWQge1xuICAgIHRoaXMuY2hlY2tib3hlcy5wdXNoKGl0ZW0pO1xuICB9XG5cbiAgLyoqIFRoZSBtZXRob2QgdG8gYmUgY2FsbGVkIGluIG9yZGVyIHRvIHVwZGF0ZSBuZ01vZGVsLiAqL1xuICBwcml2YXRlIF9jb250cm9sVmFsdWVBY2Nlc3NvckNoYW5nZUZuOiAodmFsdWU6IGFueSkgPT4gdm9pZCA9IChfKSA9PiB7fTtcblxuICBwcml2YXRlIF91cGRhdGVDaGVja2JveGVzTmFtZXMoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY2hlY2tib3hlcyA9PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuY2hlY2tib3hlcy5mb3JFYWNoKChjaGVja2JveCkgPT4ge1xuICAgICAgaWYgKGNoZWNrYm94ID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY2hlY2tib3gubmFtZSA9IHRoaXMuX25hbWU7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVTZWxlY3RlZENoZWNrYm94ZXNGcm9tVmFsdWUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY2hlY2tib3hlcyA9PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuY2hlY2tib3hlcy5mb3JFYWNoKGNoZWNrYm94ID0+IHtcbiAgICAgIGlmIChjaGVja2JveCA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmICgodGhpcy5fdmFsdWUgfHwgW10pLmluZGV4T2YoY2hlY2tib3gudmFsdWUpID4gLTEpIHtcbiAgICAgICAgY2hlY2tib3guY2hlY2tlZCA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjaGVja2JveC5jaGVja2VkID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKiogRGlzcGF0Y2ggY2hhbmdlIGV2ZW50IHdpdGggY3VycmVudCBzZWxlY3Rpb24gYW5kIGdyb3VwIHZhbHVlLiAqL1xuICBwcml2YXRlIF9lbWl0Q2hhbmdlRXZlbnQoKTogdm9pZCB7XG4gICAgbGV0IGV2ZW50ID0gbmV3IEFqZkNoZWNrYm94R3JvdXBDaGFuZ2U8VD4oKTtcbiAgICBldmVudC5zb3VyY2UgPSB0aGlzO1xuICAgIGV2ZW50LnZhbHVlID0gdGhpcy5fdmFsdWU7XG4gICAgdGhpcy5fY29udHJvbFZhbHVlQWNjZXNzb3JDaGFuZ2VGbihldmVudC52YWx1ZSk7XG4gICAgdGhpcy5fY2hhbmdlLmVtaXQoZXZlbnQpO1xuICB9XG5cbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2Rpc2FibGVkOiBCb29sZWFuSW5wdXQ7XG59XG5cbkBEaXJlY3RpdmUoKVxuZXhwb3J0IGNsYXNzIEFqZkNoZWNrYm94R3JvdXBJdGVtPFQ+IGltcGxlbWVudHMgT25Jbml0IHtcbiAgLyoqIFRoZSB1bmlxdWUgSUQgZm9yIHRoaXMgYnV0dG9uIHRvZ2dsZS4gKi9cbiAgcHJpdmF0ZSBfY2hlY2tib3hJZDogQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJycpO1xuICByZWFkb25seSBjaGVja2JveElkOiBPYnNlcnZhYmxlPHN0cmluZz4gPSB0aGlzLl9jaGVja2JveElkLmFzT2JzZXJ2YWJsZSgpO1xuXG4gIEBJbnB1dCgpXG4gIHNldCBpZChpZDogc3RyaW5nKSB7XG4gICAgdGhpcy5fY2hlY2tib3hJZC5uZXh0KGlkKTtcbiAgfVxuXG4gIEBJbnB1dCgpIG5hbWU6IHN0cmluZztcblxuICAvKiogVGhlIHBhcmVudCBidXR0b24gdG9nZ2xlIGdyb3VwIChleGNsdXNpdmUgc2VsZWN0aW9uKS4gT3B0aW9uYWwuICovXG4gIHJlYWRvbmx5IGNoZWNrYm94R3JvdXA6IEFqZkNoZWNrYm94R3JvdXA8VD47XG5cbiAgLyoqIFdoZXRoZXIgb3Igbm90IHRoaXMgYnV0dG9uIHRvZ2dsZSBpcyBjaGVja2VkLiAqL1xuICBwcml2YXRlIF9jaGVja2VkU3RhdGU6IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICByZWFkb25seSBjaGVja2VkU3RhdGU6IE9ic2VydmFibGU8Ym9vbGVhbj4gPSB0aGlzLl9jaGVja2VkU3RhdGUuYXNPYnNlcnZhYmxlKCk7XG4gIGdldCBjaGVja2VkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9jaGVja2VkU3RhdGUuZ2V0VmFsdWUoKTtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgY2hlY2tlZChjaGVja2VkOiBib29sZWFuKSB7XG4gICAgdGhpcy5fY2hlY2tlZFN0YXRlLm5leHQoY2hlY2tlZCk7XG4gIH1cblxuICAvKiogV2hldGhlciBvciBub3QgdGhpcyBidXR0b24gdG9nZ2xlIGlzIGRpc2FibGVkLiAqL1xuICBwcml2YXRlIF9kaXNhYmxlZFN0YXRlOiBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgcmVhZG9ubHkgZGlzYWJsZWRTdGF0ZTogT2JzZXJ2YWJsZTxib29sZWFuPiA9IHRoaXMuX2Rpc2FibGVkU3RhdGUuYXNPYnNlcnZhYmxlKCk7XG4gIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICBjb25zdCBkaXNhYmxlZCA9IHRoaXMuX2Rpc2FibGVkU3RhdGUuZ2V0VmFsdWUoKTtcbiAgICByZXR1cm4gZGlzYWJsZWQgfHwgKHRoaXMuY2hlY2tib3hHcm91cCAhPSBudWxsICYmIHRoaXMuY2hlY2tib3hHcm91cC5kaXNhYmxlZCk7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IGRpc2FibGVkKGRpc2FibGVkOiBib29sZWFuKSB7XG4gICAgdGhpcy5fZGlzYWJsZWRTdGF0ZS5uZXh0KGRpc2FibGVkICE9IG51bGwgJiYgZGlzYWJsZWQgIT09IGZhbHNlKTtcbiAgfVxuXG4gIC8qKiBWYWx1ZSBhc3NpZ25lZCB0byB0aGlzIGJ1dHRvbiB0b2dnbGUuICovXG4gIHByaXZhdGUgX3ZhbHVlOiBUO1xuICBnZXQgdmFsdWUoKTogVCB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCB2YWx1ZSh2YWx1ZTogVCkge1xuICAgIGlmICh0aGlzLl92YWx1ZSAhPT0gdmFsdWUpIHtcbiAgICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfY2hlY2tlZEljb25WYWw6IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCcnKTtcbiAgZ2V0IGNoZWNrZWRJY29uKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2NoZWNrZWRJY29uVmFsLmdldFZhbHVlKCk7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IGNoZWNrZWRJY29uKGljb246IHN0cmluZykge1xuICAgIHRoaXMuX2NoZWNrZWRJY29uVmFsLm5leHQoaWNvbik7XG4gIH1cblxuICBwcml2YXRlIF9ub3RDaGVja2VkSWNvblZhbDogQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJycpO1xuICBnZXQgbm90Q2hlY2tlZEljb24oKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fbm90Q2hlY2tlZEljb25WYWwuZ2V0VmFsdWUoKTtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgbm90Q2hlY2tlZEljb24oaWNvbjogc3RyaW5nKSB7XG4gICAgdGhpcy5fbm90Q2hlY2tlZEljb25WYWwubmV4dChpY29uKTtcbiAgfVxuXG4gIHJlYWRvbmx5IGljb246IE9ic2VydmFibGU8c3RyaW5nPjtcblxuICAvKiogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBncm91cCB2YWx1ZSBjaGFuZ2VzLiAqL1xuICBwcml2YXRlIF9jaGFuZ2U6IEV2ZW50RW1pdHRlcjxBamZDaGVja2JveEdyb3VwSXRlbUNoYW5nZTxUPj4gPVxuICAgICAgbmV3IEV2ZW50RW1pdHRlcjxBamZDaGVja2JveEdyb3VwSXRlbUNoYW5nZTxUPj4oKTtcbiAgQE91dHB1dCgpXG4gIHJlYWRvbmx5IGNoYW5nZTogT2JzZXJ2YWJsZTxBamZDaGVja2JveEdyb3VwSXRlbUNoYW5nZTxUPj4gPSB0aGlzLl9jaGFuZ2UuYXNPYnNlcnZhYmxlKCk7XG5cbiAgY29uc3RydWN0b3IoY2hlY2tib3hHcm91cD86IEFqZkNoZWNrYm94R3JvdXA8VD4pIHtcbiAgICB0aGlzLmljb24gPSBjb21iaW5lTGF0ZXN0KHRoaXMuX2NoZWNrZWRTdGF0ZSwgdGhpcy5fY2hlY2tlZEljb25WYWwsIHRoaXMuX25vdENoZWNrZWRJY29uVmFsKVxuICAgICAgICAgICAgICAgICAgICAucGlwZShtYXAociA9PiByWzBdID8gclsxXSA6IHJbMl0pKTtcblxuICAgIGlmIChjaGVja2JveEdyb3VwKSB7XG4gICAgICB0aGlzLmNoZWNrYm94R3JvdXAgPSBjaGVja2JveEdyb3VwO1xuICAgICAgdGhpcy5jaGVja2JveEdyb3VwLnJlZ2lzdGVySXRlbSh0aGlzKTtcbiAgICB9XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAodGhpcy5pZCA9PSBudWxsKSB7XG4gICAgICB0aGlzLmlkID0gYGFqZi1jaGVja2JveC1ncm91cC1pdGVtLSR7X3VuaXF1ZUlkQ291bnRlcisrfWA7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuY2hlY2tib3hHcm91cCAmJiB0aGlzLmNoZWNrYm94R3JvdXAudmFsdWUgJiZcbiAgICAgICAgdGhpcy5jaGVja2JveEdyb3VwLnZhbHVlLmluZGV4T2YodGhpcy5fdmFsdWUpID4gLTEpIHtcbiAgICAgIHRoaXMuY2hlY2tlZCA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgLyoqIENoZWNrcyB0aGUgYnV0dG9uIHRvZ2dsZSBkdWUgdG8gYW4gaW50ZXJhY3Rpb24gd2l0aCB0aGUgdW5kZXJseWluZyBuYXRpdmUgaW5wdXQuICovXG4gIG9uSW5wdXRDaGFuZ2UoZXZlbnQ6IEV2ZW50KSB7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICB0aGlzLl90b2dnbGUoKTtcbiAgfVxuXG4gIC8qKiBUb2dnbGUgdGhlIHN0YXRlIG9mIHRoZSBjdXJyZW50IGJ1dHRvbiB0b2dnbGUuICovXG4gIHByaXZhdGUgX3RvZ2dsZSgpOiB2b2lkIHtcbiAgICB0aGlzLmNoZWNrZWQgPSAhdGhpcy5jaGVja2VkO1xuXG4gICAgaWYgKHRoaXMuY2hlY2tib3hHcm91cCAhPSBudWxsKSB7XG4gICAgICBpZiAodGhpcy5jaGVja2VkKSB7XG4gICAgICAgIHRoaXMuY2hlY2tib3hHcm91cC5hZGRWYWx1ZSh0aGlzLl92YWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNoZWNrYm94R3JvdXAucmVtb3ZlVmFsdWUodGhpcy5fdmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19