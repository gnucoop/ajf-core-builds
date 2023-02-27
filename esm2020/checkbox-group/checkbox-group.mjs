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
import { Directive, EventEmitter, forwardRef, Input, Output, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import * as i0 from "@angular/core";
export const AJF_CHECKBOX_GROUP_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AjfCheckboxGroup),
    multi: true,
};
let _uniqueIdCounter = 0;
export class AjfCheckboxGroup {
    constructor() {
        this.checkboxes = [];
        /** The value for the button toggle group. Should match currently selected button toggle. */
        this._value = [];
        /** The HTML name attribute applied to toggles in this group. */
        this._name = '';
        /** Disables all toggles in the group. */
        this._disabled = false;
        /** The currently selected button toggle, should match the value. */
        this._selected = [];
        /** Event emitted when the group's value changes. */
        this._change = new EventEmitter();
        this.change = this._change;
        /** onTouch function registered via registerOnTouch (ControlValueAccessor). */
        this.onTouched = () => { };
        /** The method to be called in order to update ngModel. */
        this._controlValueAccessorChangeFn = _ => { };
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
                if (c.value) {
                    values.push(c.value);
                    if (!c.checked) {
                        c.checked = true;
                    }
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
        this.checkboxes.forEach(checkbox => {
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
            if (checkbox.value && (this._value || []).indexOf(checkbox.value) > -1) {
                checkbox.checked = true;
            }
            else {
                checkbox.checked = false;
            }
        });
    }
    /** Dispatch change event with current selection and group value. */
    _emitChangeEvent() {
        const event = {
            source: this,
            value: this._value,
        };
        this._controlValueAccessorChangeFn(event.value);
        this._change.emit(event);
    }
}
AjfCheckboxGroup.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfCheckboxGroup, deps: [], target: i0.ɵɵFactoryTarget.Directive });
AjfCheckboxGroup.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.4", type: AjfCheckboxGroup, selector: "ajf-checkbox-group,[ajf-checkbox-group]", inputs: { value: "value", name: "name", disabled: "disabled" }, outputs: { change: "change" }, providers: [AJF_CHECKBOX_GROUP_VALUE_ACCESSOR], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfCheckboxGroup, decorators: [{
            type: Directive,
            args: [{
                    // eslint-disable-next-line
                    selector: 'ajf-checkbox-group,[ajf-checkbox-group]',
                    providers: [AJF_CHECKBOX_GROUP_VALUE_ACCESSOR],
                }]
        }], propDecorators: { value: [{
                type: Input
            }], name: [{
                type: Input
            }], disabled: [{
                type: Input
            }], change: [{
                type: Output
            }] } });
export class AjfCheckboxGroupItem {
    constructor(checkboxGroup) {
        /** The unique ID for this button toggle. */
        this._checkboxId = new BehaviorSubject('');
        this.checkboxId = this._checkboxId;
        this.name = '';
        /** Whether or not this button toggle is checked. */
        this._checkedState = new BehaviorSubject(false);
        this.checkedState = this._checkedState;
        /** Whether or not this button toggle is disabled. */
        this._disabledState = new BehaviorSubject(false);
        this.disabledState = this._disabledState;
        this._checkedIconVal = new BehaviorSubject('');
        this._notCheckedIconVal = new BehaviorSubject('');
        /** Event emitted when the group value changes. */
        this._change = new EventEmitter();
        this.change = this._change;
        this.icon = combineLatest([
            this._checkedState,
            this._checkedIconVal,
            this._notCheckedIconVal,
        ]).pipe(map(([checked, checkedIcon, notCheckedIcon]) => (checked ? checkedIcon : notCheckedIcon)));
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
        if (this.checkboxGroup &&
            this.checkboxGroup.value &&
            this._value &&
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
        if (this.checkboxGroup != null && this._value) {
            if (this.checked) {
                this.checkboxGroup.addValue(this._value);
            }
            else {
                this.checkboxGroup.removeValue(this._value);
            }
        }
    }
}
AjfCheckboxGroupItem.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfCheckboxGroupItem, deps: [{ token: AjfCheckboxGroup }], target: i0.ɵɵFactoryTarget.Directive });
AjfCheckboxGroupItem.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.4", type: AjfCheckboxGroupItem, inputs: { id: "id", name: "name", checked: "checked", disabled: "disabled", value: "value", checkedIcon: "checkedIcon", notCheckedIcon: "notCheckedIcon" }, outputs: { change: "change" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfCheckboxGroupItem, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: AjfCheckboxGroup }]; }, propDecorators: { id: [{
                type: Input
            }], name: [{
                type: Input
            }], checked: [{
                type: Input
            }], disabled: [{
                type: Input
            }], value: [{
                type: Input
            }], checkedIcon: [{
                type: Input
            }], notCheckedIcon: [{
                type: Input
            }], change: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3gtZ3JvdXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL2NoZWNrYm94LWdyb3VwL3NyYy9jaGVja2JveC1ncm91cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQWUscUJBQXFCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUMxRSxPQUFPLEVBRUwsU0FBUyxFQUNULFlBQVksRUFDWixVQUFVLEVBQ1YsS0FBSyxFQUVMLE1BQU0sR0FDUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQXVCLGlCQUFpQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDdkUsT0FBTyxFQUFDLGVBQWUsRUFBRSxhQUFhLEVBQWEsTUFBTSxNQUFNLENBQUM7QUFDaEUsT0FBTyxFQUFDLEdBQUcsRUFBQyxNQUFNLGdCQUFnQixDQUFDOztBQUVuQyxNQUFNLENBQUMsTUFBTSxpQ0FBaUMsR0FBUTtJQUNwRCxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsZ0JBQWdCLENBQUM7SUFDL0MsS0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDO0FBWUYsSUFBSSxnQkFBZ0IsR0FBRyxDQUFDLENBQUM7QUFPekIsTUFBTSxPQUFPLGdCQUFnQjtJQUw3QjtRQU1FLGVBQVUsR0FBOEIsRUFBRSxDQUFDO1FBRTNDLDRGQUE0RjtRQUNwRixXQUFNLEdBQVEsRUFBRSxDQUFDO1FBYXpCLGdFQUFnRTtRQUN4RCxVQUFLLEdBQVcsRUFBRSxDQUFDO1FBVTNCLHlDQUF5QztRQUNqQyxjQUFTLEdBQVksS0FBSyxDQUFDO1FBU25DLG9FQUFvRTtRQUM1RCxjQUFTLEdBQThCLEVBQUUsQ0FBQztRQW9CbEQsb0RBQW9EO1FBQzVDLFlBQU8sR0FBNEMsSUFBSSxZQUFZLEVBRXhFLENBQUM7UUFFSyxXQUFNLEdB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TTtZQUNYLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQ2xEO1lBQ0EsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7U0FDckI7SUFDSCxDQUFDO0lBRUQsdUZBQXVGO0lBQ3ZGLGFBQWEsQ0FBQyxLQUFZO1FBQ3hCLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUV4QixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQUVELHFEQUFxRDtJQUM3QyxPQUFPO1FBQ2IsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7UUFFN0IsSUFBSSxJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQzdDLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtnQkFDaEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQzFDO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUM3QztTQUNGO0lBQ0gsQ0FBQzs7aUhBbElVLG9CQUFvQjtxR0FBcEIsb0JBQW9COzJGQUFwQixvQkFBb0I7a0JBRGhDLFNBQVM7b0dBT0osRUFBRTtzQkFETCxLQUFLO2dCQUtHLElBQUk7c0JBQVosS0FBSztnQkFZRixPQUFPO3NCQURWLEtBQUs7Z0JBYUYsUUFBUTtzQkFEWCxLQUFLO2dCQVdGLEtBQUs7c0JBRFIsS0FBSztnQkFZRixXQUFXO3NCQURkLEtBQUs7Z0JBVUYsY0FBYztzQkFEakIsS0FBSztnQkFZRyxNQUFNO3NCQURkLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7Qm9vbGVhbklucHV0LCBjb2VyY2VCb29sZWFuUHJvcGVydHl9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge1xuICBBZnRlckNvbnRlbnRJbml0LFxuICBEaXJlY3RpdmUsXG4gIEV2ZW50RW1pdHRlcixcbiAgZm9yd2FyZFJlZixcbiAgSW5wdXQsXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge0JlaGF2aW9yU3ViamVjdCwgY29tYmluZUxhdGVzdCwgT2JzZXJ2YWJsZX0gZnJvbSAncnhqcyc7XG5pbXBvcnQge21hcH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5leHBvcnQgY29uc3QgQUpGX0NIRUNLQk9YX0dST1VQX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBBamZDaGVja2JveEdyb3VwKSxcbiAgbXVsdGk6IHRydWUsXG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIEFqZkNoZWNrYm94R3JvdXBJdGVtQ2hhbmdlPFQ+IHtcbiAgc291cmNlOiBBamZDaGVja2JveEdyb3VwSXRlbTxUPjtcbiAgdmFsdWU6IGFueTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBBamZDaGVja2JveEdyb3VwQ2hhbmdlPFQ+IHtcbiAgc291cmNlOiBBamZDaGVja2JveEdyb3VwPFQ+O1xuICB2YWx1ZTogYW55O1xufVxuXG5sZXQgX3VuaXF1ZUlkQ291bnRlciA9IDA7XG5cbkBEaXJlY3RpdmUoe1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbiAgc2VsZWN0b3I6ICdhamYtY2hlY2tib3gtZ3JvdXAsW2FqZi1jaGVja2JveC1ncm91cF0nLFxuICBwcm92aWRlcnM6IFtBSkZfQ0hFQ0tCT1hfR1JPVVBfVkFMVUVfQUNDRVNTT1JdLFxufSlcbmV4cG9ydCBjbGFzcyBBamZDaGVja2JveEdyb3VwPFQ+IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuICBjaGVja2JveGVzOiBBamZDaGVja2JveEdyb3VwSXRlbTxUPltdID0gW107XG5cbiAgLyoqIFRoZSB2YWx1ZSBmb3IgdGhlIGJ1dHRvbiB0b2dnbGUgZ3JvdXAuIFNob3VsZCBtYXRjaCBjdXJyZW50bHkgc2VsZWN0ZWQgYnV0dG9uIHRvZ2dsZS4gKi9cbiAgcHJpdmF0ZSBfdmFsdWU6IFRbXSA9IFtdO1xuICBnZXQgdmFsdWUoKTogVFtdIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IHZhbHVlKG5ld1ZhbHVlOiBUW10pIHtcbiAgICBpZiAodGhpcy5fdmFsdWUgIT09IG5ld1ZhbHVlKSB7XG4gICAgICB0aGlzLl92YWx1ZSA9IG5ld1ZhbHVlO1xuICAgICAgdGhpcy5fdXBkYXRlU2VsZWN0ZWRDaGVja2JveGVzRnJvbVZhbHVlKCk7XG4gICAgICB0aGlzLl9lbWl0Q2hhbmdlRXZlbnQoKTtcbiAgICB9XG4gIH1cblxuICAvKiogVGhlIEhUTUwgbmFtZSBhdHRyaWJ1dGUgYXBwbGllZCB0byB0b2dnbGVzIGluIHRoaXMgZ3JvdXAuICovXG4gIHByaXZhdGUgX25hbWU6IHN0cmluZyA9ICcnO1xuICBnZXQgbmFtZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9uYW1lO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBuYW1lKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9uYW1lID0gdmFsdWU7XG4gICAgdGhpcy5fdXBkYXRlQ2hlY2tib3hlc05hbWVzKCk7XG4gIH1cblxuICAvKiogRGlzYWJsZXMgYWxsIHRvZ2dsZXMgaW4gdGhlIGdyb3VwLiAqL1xuICBwcml2YXRlIF9kaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBkaXNhYmxlZCh2YWx1ZSkge1xuICAgIHRoaXMuX2Rpc2FibGVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuXG4gIC8qKiBUaGUgY3VycmVudGx5IHNlbGVjdGVkIGJ1dHRvbiB0b2dnbGUsIHNob3VsZCBtYXRjaCB0aGUgdmFsdWUuICovXG4gIHByaXZhdGUgX3NlbGVjdGVkOiBBamZDaGVja2JveEdyb3VwSXRlbTxUPltdID0gW107XG4gIGdldCBzZWxlY3RlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWQ7XG4gIH1cbiAgc2V0IHNlbGVjdGVkKHNlbGVjdGVkOiBBamZDaGVja2JveEdyb3VwSXRlbTxUPltdKSB7XG4gICAgdGhpcy5fc2VsZWN0ZWQgPSBzZWxlY3RlZDtcbiAgICBsZXQgdmFsdWVzOiBUW10gPSBbXTtcbiAgICBpZiAoc2VsZWN0ZWQpIHtcbiAgICAgIHNlbGVjdGVkLmZvckVhY2goYyA9PiB7XG4gICAgICAgIGlmIChjLnZhbHVlKSB7XG4gICAgICAgICAgdmFsdWVzLnB1c2goYy52YWx1ZSk7XG4gICAgICAgICAgaWYgKCFjLmNoZWNrZWQpIHtcbiAgICAgICAgICAgIGMuY2hlY2tlZCA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZXM7XG4gIH1cblxuICAvKiogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBncm91cCdzIHZhbHVlIGNoYW5nZXMuICovXG4gIHByaXZhdGUgX2NoYW5nZTogRXZlbnRFbWl0dGVyPEFqZkNoZWNrYm94R3JvdXBDaGFuZ2U8VD4+ID0gbmV3IEV2ZW50RW1pdHRlcjxcbiAgICBBamZDaGVja2JveEdyb3VwQ2hhbmdlPFQ+XG4gID4oKTtcbiAgQE91dHB1dCgpXG4gIHJlYWRvbmx5IGNoYW5nZTogT2JzZXJ2YWJsZTxBamZDaGVja2JveEdyb3VwQ2hhbmdlPFQ+PiA9IHRoaXMuX2NoYW5nZSBhcyBPYnNlcnZhYmxlPFxuICAgIEFqZkNoZWNrYm94R3JvdXBDaGFuZ2U8VD5cbiAgPjtcblxuICAvKiogb25Ub3VjaCBmdW5jdGlvbiByZWdpc3RlcmVkIHZpYSByZWdpc3Rlck9uVG91Y2ggKENvbnRyb2xWYWx1ZUFjY2Vzc29yKS4gKi9cbiAgb25Ub3VjaGVkOiAoKSA9PiBhbnkgPSAoKSA9PiB7fTtcblxuICAvKipcbiAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci5cbiAgICovXG4gIHdyaXRlVmFsdWUodmFsdWU6IFRbXSkge1xuICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIENvbnRyb2xWYWx1ZUFjY2Vzc29yLlxuICAgKi9cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKHZhbHVlOiBUW10pID0+IHZvaWQpIHtcbiAgICB0aGlzLl9jb250cm9sVmFsdWVBY2Nlc3NvckNoYW5nZUZuID0gZm47XG4gIH1cblxuICAvKipcbiAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci5cbiAgICovXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xuICB9XG5cbiAgYWRkVmFsdWUodmFsdWU6IFQpIHtcbiAgICBsZXQgY3VyVmFsdWUgPSAodGhpcy5fdmFsdWUgfHwgW10pLnNsaWNlKDApO1xuICAgIGlmIChjdXJWYWx1ZS5pbmRleE9mKHZhbHVlKSA9PT0gLTEpIHtcbiAgICAgIGN1clZhbHVlLnB1c2godmFsdWUpO1xuICAgICAgdGhpcy52YWx1ZSA9IGN1clZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZVZhbHVlKHZhbHVlOiBUKSB7XG4gICAgbGV0IGN1clZhbHVlID0gKHRoaXMuX3ZhbHVlIHx8IFtdKS5zbGljZSgwKTtcbiAgICBsZXQgaWR4ID0gY3VyVmFsdWUuaW5kZXhPZih2YWx1ZSk7XG4gICAgaWYgKGlkeCA+IC0xKSB7XG4gICAgICBjdXJWYWx1ZS5zcGxpY2UoaWR4LCAxKTtcbiAgICAgIHRoaXMudmFsdWUgPSBjdXJWYWx1ZTtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fdXBkYXRlQ2hlY2tib3hlc05hbWVzKCk7XG4gICAgdGhpcy5fdXBkYXRlU2VsZWN0ZWRDaGVja2JveGVzRnJvbVZhbHVlKCk7XG4gIH1cblxuICByZWdpc3Rlckl0ZW0oaXRlbTogQWpmQ2hlY2tib3hHcm91cEl0ZW08VD4pOiB2b2lkIHtcbiAgICB0aGlzLmNoZWNrYm94ZXMucHVzaChpdGVtKTtcbiAgfVxuXG4gIC8qKiBUaGUgbWV0aG9kIHRvIGJlIGNhbGxlZCBpbiBvcmRlciB0byB1cGRhdGUgbmdNb2RlbC4gKi9cbiAgcHJpdmF0ZSBfY29udHJvbFZhbHVlQWNjZXNzb3JDaGFuZ2VGbjogKHZhbHVlOiBhbnkpID0+IHZvaWQgPSBfID0+IHt9O1xuXG4gIHByaXZhdGUgX3VwZGF0ZUNoZWNrYm94ZXNOYW1lcygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5jaGVja2JveGVzID09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5jaGVja2JveGVzLmZvckVhY2goY2hlY2tib3ggPT4ge1xuICAgICAgaWYgKGNoZWNrYm94ID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY2hlY2tib3gubmFtZSA9IHRoaXMuX25hbWU7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVTZWxlY3RlZENoZWNrYm94ZXNGcm9tVmFsdWUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY2hlY2tib3hlcyA9PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuY2hlY2tib3hlcy5mb3JFYWNoKGNoZWNrYm94ID0+IHtcbiAgICAgIGlmIChjaGVja2JveCA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmIChjaGVja2JveC52YWx1ZSAmJiAodGhpcy5fdmFsdWUgfHwgW10pLmluZGV4T2YoY2hlY2tib3gudmFsdWUpID4gLTEpIHtcbiAgICAgICAgY2hlY2tib3guY2hlY2tlZCA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjaGVja2JveC5jaGVja2VkID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKiogRGlzcGF0Y2ggY2hhbmdlIGV2ZW50IHdpdGggY3VycmVudCBzZWxlY3Rpb24gYW5kIGdyb3VwIHZhbHVlLiAqL1xuICBwcml2YXRlIF9lbWl0Q2hhbmdlRXZlbnQoKTogdm9pZCB7XG4gICAgY29uc3QgZXZlbnQgPSB7XG4gICAgICBzb3VyY2U6IHRoaXMsXG4gICAgICB2YWx1ZTogdGhpcy5fdmFsdWUsXG4gICAgfTtcbiAgICB0aGlzLl9jb250cm9sVmFsdWVBY2Nlc3NvckNoYW5nZUZuKGV2ZW50LnZhbHVlKTtcbiAgICB0aGlzLl9jaGFuZ2UuZW1pdChldmVudCk7XG4gIH1cblxuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfZGlzYWJsZWQ6IEJvb2xlYW5JbnB1dDtcbn1cblxuQERpcmVjdGl2ZSgpXG5leHBvcnQgY2xhc3MgQWpmQ2hlY2tib3hHcm91cEl0ZW08VD4gaW1wbGVtZW50cyBPbkluaXQge1xuICAvKiogVGhlIHVuaXF1ZSBJRCBmb3IgdGhpcyBidXR0b24gdG9nZ2xlLiAqL1xuICBwcml2YXRlIF9jaGVja2JveElkOiBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignJyk7XG4gIHJlYWRvbmx5IGNoZWNrYm94SWQ6IE9ic2VydmFibGU8c3RyaW5nPiA9IHRoaXMuX2NoZWNrYm94SWQgYXMgT2JzZXJ2YWJsZTxzdHJpbmc+O1xuXG4gIEBJbnB1dCgpXG4gIHNldCBpZChpZDogc3RyaW5nKSB7XG4gICAgdGhpcy5fY2hlY2tib3hJZC5uZXh0KGlkKTtcbiAgfVxuXG4gIEBJbnB1dCgpIG5hbWU6IHN0cmluZyA9ICcnO1xuXG4gIC8qKiBUaGUgcGFyZW50IGJ1dHRvbiB0b2dnbGUgZ3JvdXAgKGV4Y2x1c2l2ZSBzZWxlY3Rpb24pLiBPcHRpb25hbC4gKi9cbiAgcmVhZG9ubHkgY2hlY2tib3hHcm91cDogQWpmQ2hlY2tib3hHcm91cDxUPiB8IHVuZGVmaW5lZDtcblxuICAvKiogV2hldGhlciBvciBub3QgdGhpcyBidXR0b24gdG9nZ2xlIGlzIGNoZWNrZWQuICovXG4gIHByaXZhdGUgX2NoZWNrZWRTdGF0ZTogQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHJlYWRvbmx5IGNoZWNrZWRTdGF0ZTogT2JzZXJ2YWJsZTxib29sZWFuPiA9IHRoaXMuX2NoZWNrZWRTdGF0ZSBhcyBPYnNlcnZhYmxlPGJvb2xlYW4+O1xuICBnZXQgY2hlY2tlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fY2hlY2tlZFN0YXRlLmdldFZhbHVlKCk7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IGNoZWNrZWQoY2hlY2tlZDogYm9vbGVhbikge1xuICAgIHRoaXMuX2NoZWNrZWRTdGF0ZS5uZXh0KGNoZWNrZWQpO1xuICB9XG5cbiAgLyoqIFdoZXRoZXIgb3Igbm90IHRoaXMgYnV0dG9uIHRvZ2dsZSBpcyBkaXNhYmxlZC4gKi9cbiAgcHJpdmF0ZSBfZGlzYWJsZWRTdGF0ZTogQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHJlYWRvbmx5IGRpc2FibGVkU3RhdGU6IE9ic2VydmFibGU8Ym9vbGVhbj4gPSB0aGlzLl9kaXNhYmxlZFN0YXRlIGFzIE9ic2VydmFibGU8Ym9vbGVhbj47XG4gIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICBjb25zdCBkaXNhYmxlZCA9IHRoaXMuX2Rpc2FibGVkU3RhdGUuZ2V0VmFsdWUoKTtcbiAgICByZXR1cm4gZGlzYWJsZWQgfHwgKHRoaXMuY2hlY2tib3hHcm91cCAhPSBudWxsICYmIHRoaXMuY2hlY2tib3hHcm91cC5kaXNhYmxlZCk7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IGRpc2FibGVkKGRpc2FibGVkOiBib29sZWFuKSB7XG4gICAgdGhpcy5fZGlzYWJsZWRTdGF0ZS5uZXh0KGRpc2FibGVkICE9IG51bGwgJiYgZGlzYWJsZWQgIT09IGZhbHNlKTtcbiAgfVxuXG4gIC8qKiBWYWx1ZSBhc3NpZ25lZCB0byB0aGlzIGJ1dHRvbiB0b2dnbGUuICovXG4gIHByaXZhdGUgX3ZhbHVlOiBUIHwgdW5kZWZpbmVkO1xuICBnZXQgdmFsdWUoKTogVCB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCB2YWx1ZSh2YWx1ZTogVCB8IHVuZGVmaW5lZCkge1xuICAgIGlmICh0aGlzLl92YWx1ZSAhPT0gdmFsdWUpIHtcbiAgICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfY2hlY2tlZEljb25WYWw6IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCcnKTtcbiAgZ2V0IGNoZWNrZWRJY29uKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2NoZWNrZWRJY29uVmFsLmdldFZhbHVlKCk7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IGNoZWNrZWRJY29uKGljb246IHN0cmluZykge1xuICAgIHRoaXMuX2NoZWNrZWRJY29uVmFsLm5leHQoaWNvbik7XG4gIH1cblxuICBwcml2YXRlIF9ub3RDaGVja2VkSWNvblZhbDogQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJycpO1xuICBnZXQgbm90Q2hlY2tlZEljb24oKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fbm90Q2hlY2tlZEljb25WYWwuZ2V0VmFsdWUoKTtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgbm90Q2hlY2tlZEljb24oaWNvbjogc3RyaW5nKSB7XG4gICAgdGhpcy5fbm90Q2hlY2tlZEljb25WYWwubmV4dChpY29uKTtcbiAgfVxuXG4gIHJlYWRvbmx5IGljb246IE9ic2VydmFibGU8c3RyaW5nPjtcblxuICAvKiogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBncm91cCB2YWx1ZSBjaGFuZ2VzLiAqL1xuICBwcml2YXRlIF9jaGFuZ2U6IEV2ZW50RW1pdHRlcjxBamZDaGVja2JveEdyb3VwSXRlbUNoYW5nZTxUPj4gPSBuZXcgRXZlbnRFbWl0dGVyPFxuICAgIEFqZkNoZWNrYm94R3JvdXBJdGVtQ2hhbmdlPFQ+XG4gID4oKTtcbiAgQE91dHB1dCgpXG4gIHJlYWRvbmx5IGNoYW5nZTogT2JzZXJ2YWJsZTxBamZDaGVja2JveEdyb3VwSXRlbUNoYW5nZTxUPj4gPSB0aGlzLl9jaGFuZ2UgYXMgT2JzZXJ2YWJsZTxcbiAgICBBamZDaGVja2JveEdyb3VwSXRlbUNoYW5nZTxUPlxuICA+O1xuXG4gIGNvbnN0cnVjdG9yKGNoZWNrYm94R3JvdXA/OiBBamZDaGVja2JveEdyb3VwPFQ+KSB7XG4gICAgdGhpcy5pY29uID0gY29tYmluZUxhdGVzdChbXG4gICAgICB0aGlzLl9jaGVja2VkU3RhdGUsXG4gICAgICB0aGlzLl9jaGVja2VkSWNvblZhbCxcbiAgICAgIHRoaXMuX25vdENoZWNrZWRJY29uVmFsLFxuICAgIF0pLnBpcGUoXG4gICAgICBtYXAoXG4gICAgICAgIChbY2hlY2tlZCwgY2hlY2tlZEljb24sIG5vdENoZWNrZWRJY29uXSkgPT5cbiAgICAgICAgICAoY2hlY2tlZCA/IGNoZWNrZWRJY29uIDogbm90Q2hlY2tlZEljb24pIGFzIHN0cmluZyxcbiAgICAgICksXG4gICAgKTtcblxuICAgIGlmIChjaGVja2JveEdyb3VwKSB7XG4gICAgICB0aGlzLmNoZWNrYm94R3JvdXAgPSBjaGVja2JveEdyb3VwO1xuICAgICAgdGhpcy5jaGVja2JveEdyb3VwLnJlZ2lzdGVySXRlbSh0aGlzKTtcbiAgICB9XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAodGhpcy5pZCA9PSBudWxsKSB7XG4gICAgICB0aGlzLmlkID0gYGFqZi1jaGVja2JveC1ncm91cC1pdGVtLSR7X3VuaXF1ZUlkQ291bnRlcisrfWA7XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgdGhpcy5jaGVja2JveEdyb3VwICYmXG4gICAgICB0aGlzLmNoZWNrYm94R3JvdXAudmFsdWUgJiZcbiAgICAgIHRoaXMuX3ZhbHVlICYmXG4gICAgICB0aGlzLmNoZWNrYm94R3JvdXAudmFsdWUuaW5kZXhPZih0aGlzLl92YWx1ZSkgPiAtMVxuICAgICkge1xuICAgICAgdGhpcy5jaGVja2VkID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICAvKiogQ2hlY2tzIHRoZSBidXR0b24gdG9nZ2xlIGR1ZSB0byBhbiBpbnRlcmFjdGlvbiB3aXRoIHRoZSB1bmRlcmx5aW5nIG5hdGl2ZSBpbnB1dC4gKi9cbiAgb25JbnB1dENoYW5nZShldmVudDogRXZlbnQpIHtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgIHRoaXMuX3RvZ2dsZSgpO1xuICB9XG5cbiAgLyoqIFRvZ2dsZSB0aGUgc3RhdGUgb2YgdGhlIGN1cnJlbnQgYnV0dG9uIHRvZ2dsZS4gKi9cbiAgcHJpdmF0ZSBfdG9nZ2xlKCk6IHZvaWQge1xuICAgIHRoaXMuY2hlY2tlZCA9ICF0aGlzLmNoZWNrZWQ7XG5cbiAgICBpZiAodGhpcy5jaGVja2JveEdyb3VwICE9IG51bGwgJiYgdGhpcy5fdmFsdWUpIHtcbiAgICAgIGlmICh0aGlzLmNoZWNrZWQpIHtcbiAgICAgICAgdGhpcy5jaGVja2JveEdyb3VwLmFkZFZhbHVlKHRoaXMuX3ZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY2hlY2tib3hHcm91cC5yZW1vdmVWYWx1ZSh0aGlzLl92YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=