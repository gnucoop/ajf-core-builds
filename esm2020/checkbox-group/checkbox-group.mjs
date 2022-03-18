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
AjfCheckboxGroup.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfCheckboxGroup, deps: [], target: i0.ɵɵFactoryTarget.Directive });
AjfCheckboxGroup.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.2.5", type: AjfCheckboxGroup, selector: "ajf-checkbox-group,[ajf-checkbox-group]", inputs: { value: "value", name: "name", disabled: "disabled" }, outputs: { change: "change" }, providers: [AJF_CHECKBOX_GROUP_VALUE_ACCESSOR], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfCheckboxGroup, decorators: [{
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
        this.icon = combineLatest(this._checkedState, this._checkedIconVal, this._notCheckedIconVal).pipe(map(([checked, checkedIcon, notCheckedIcon]) => (checked ? checkedIcon : notCheckedIcon)));
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
AjfCheckboxGroupItem.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfCheckboxGroupItem, deps: [{ token: AjfCheckboxGroup }], target: i0.ɵɵFactoryTarget.Directive });
AjfCheckboxGroupItem.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.2.5", type: AjfCheckboxGroupItem, inputs: { id: "id", name: "name", checked: "checked", disabled: "disabled", value: "value", checkedIcon: "checkedIcon", notCheckedIcon: "notCheckedIcon" }, outputs: { change: "change" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfCheckboxGroupItem, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3gtZ3JvdXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL2NoZWNrYm94LWdyb3VwL3NyYy9jaGVja2JveC1ncm91cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQWUscUJBQXFCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUMxRSxPQUFPLEVBRUwsU0FBUyxFQUNULFlBQVksRUFDWixVQUFVLEVBQ1YsS0FBSyxFQUVMLE1BQU0sR0FDUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQXVCLGlCQUFpQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDdkUsT0FBTyxFQUFDLGVBQWUsRUFBRSxhQUFhLEVBQWEsTUFBTSxNQUFNLENBQUM7QUFDaEUsT0FBTyxFQUFDLEdBQUcsRUFBQyxNQUFNLGdCQUFnQixDQUFDOztBQUVuQyxNQUFNLENBQUMsTUFBTSxpQ0FBaUMsR0FBUTtJQUNwRCxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsZ0JBQWdCLENBQUM7SUFDL0MsS0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDO0FBWUYsSUFBSSxnQkFBZ0IsR0FBRyxDQUFDLENBQUM7QUFPekIsTUFBTSxPQUFPLGdCQUFnQjtJQUw3QjtRQU1FLGVBQVUsR0FBOEIsRUFBRSxDQUFDO1FBRTNDLDRGQUE0RjtRQUNwRixXQUFNLEdBQVEsRUFBRSxDQUFDO1FBYXpCLGdFQUFnRTtRQUN4RCxVQUFLLEdBQVcsRUFBRSxDQUFDO1FBVTNCLHlDQUF5QztRQUNqQyxjQUFTLEdBQVksS0FBSyxDQUFDO1FBU25DLG9FQUFvRTtRQUM1RCxjQUFTLEdBQThCLEVBQUUsQ0FBQztRQW9CbEQsb0RBQW9EO1FBQzVDLFlBQU8sR0FBNEMsSUFBSSxZQUFZLEVBRXhFLENBQUM7UUFFSyxXQUFNLEdB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SSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsRUFDbEQ7WUFDQSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztTQUNyQjtJQUNILENBQUM7SUFFRCx1RkFBdUY7SUFDdkYsYUFBYSxDQUFDLEtBQVk7UUFDeEIsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBRXhCLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBRUQscURBQXFEO0lBQzdDLE9BQU87UUFDYixJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUU3QixJQUFJLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDN0MsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO2dCQUNoQixJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDMUM7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQzdDO1NBQ0Y7SUFDSCxDQUFDOztpSEFsSVUsb0JBQW9CLGtCQStFSCxnQkFBZ0I7cUdBL0VqQyxvQkFBb0I7MkZBQXBCLG9CQUFvQjtrQkFEaEMsU0FBUzswREFnRm9CLGdCQUFnQiwwQkF6RXhDLEVBQUU7c0JBREwsS0FBSztnQkFLRyxJQUFJO3NCQUFaLEtBQUs7Z0JBWUYsT0FBTztzQkFEVixLQUFLO2dCQWFGLFFBQVE7c0JBRFgsS0FBSztnQkFXRixLQUFLO3NCQURSLEtBQUs7Z0JBWUYsV0FBVztzQkFEZCxLQUFLO2dCQVVGLGNBQWM7c0JBRGpCLEtBQUs7Z0JBWUcsTUFBTTtzQkFEZCxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0Jvb2xlYW5JbnB1dCwgY29lcmNlQm9vbGVhblByb3BlcnR5fSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgRGlyZWN0aXZlLFxuICBFdmVudEVtaXR0ZXIsXG4gIGZvcndhcmRSZWYsXG4gIElucHV0LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtCZWhhdmlvclN1YmplY3QsIGNvbWJpbmVMYXRlc3QsIE9ic2VydmFibGV9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHttYXB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuZXhwb3J0IGNvbnN0IEFKRl9DSEVDS0JPWF9HUk9VUF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gQWpmQ2hlY2tib3hHcm91cCksXG4gIG11bHRpOiB0cnVlLFxufTtcblxuZXhwb3J0IGludGVyZmFjZSBBamZDaGVja2JveEdyb3VwSXRlbUNoYW5nZTxUPiB7XG4gIHNvdXJjZTogQWpmQ2hlY2tib3hHcm91cEl0ZW08VD47XG4gIHZhbHVlOiBhbnk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQWpmQ2hlY2tib3hHcm91cENoYW5nZTxUPiB7XG4gIHNvdXJjZTogQWpmQ2hlY2tib3hHcm91cDxUPjtcbiAgdmFsdWU6IGFueTtcbn1cblxubGV0IF91bmlxdWVJZENvdW50ZXIgPSAwO1xuXG5ARGlyZWN0aXZlKHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG4gIHNlbGVjdG9yOiAnYWpmLWNoZWNrYm94LWdyb3VwLFthamYtY2hlY2tib3gtZ3JvdXBdJyxcbiAgcHJvdmlkZXJzOiBbQUpGX0NIRUNLQk9YX0dST1VQX1ZBTFVFX0FDQ0VTU09SXSxcbn0pXG5leHBvcnQgY2xhc3MgQWpmQ2hlY2tib3hHcm91cDxUPiBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgY2hlY2tib3hlczogQWpmQ2hlY2tib3hHcm91cEl0ZW08VD5bXSA9IFtdO1xuXG4gIC8qKiBUaGUgdmFsdWUgZm9yIHRoZSBidXR0b24gdG9nZ2xlIGdyb3VwLiBTaG91bGQgbWF0Y2ggY3VycmVudGx5IHNlbGVjdGVkIGJ1dHRvbiB0b2dnbGUuICovXG4gIHByaXZhdGUgX3ZhbHVlOiBUW10gPSBbXTtcbiAgZ2V0IHZhbHVlKCk6IFRbXSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCB2YWx1ZShuZXdWYWx1ZTogVFtdKSB7XG4gICAgaWYgKHRoaXMuX3ZhbHVlICE9PSBuZXdWYWx1ZSkge1xuICAgICAgdGhpcy5fdmFsdWUgPSBuZXdWYWx1ZTtcbiAgICAgIHRoaXMuX3VwZGF0ZVNlbGVjdGVkQ2hlY2tib3hlc0Zyb21WYWx1ZSgpO1xuICAgICAgdGhpcy5fZW1pdENoYW5nZUV2ZW50KCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIFRoZSBIVE1MIG5hbWUgYXR0cmlidXRlIGFwcGxpZWQgdG8gdG9nZ2xlcyBpbiB0aGlzIGdyb3VwLiAqL1xuICBwcml2YXRlIF9uYW1lOiBzdHJpbmcgPSAnJztcbiAgZ2V0IG5hbWUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fbmFtZTtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgbmFtZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fbmFtZSA9IHZhbHVlO1xuICAgIHRoaXMuX3VwZGF0ZUNoZWNrYm94ZXNOYW1lcygpO1xuICB9XG5cbiAgLyoqIERpc2FibGVzIGFsbCB0b2dnbGVzIGluIHRoZSBncm91cC4gKi9cbiAgcHJpdmF0ZSBfZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZDtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgZGlzYWJsZWQodmFsdWUpIHtcbiAgICB0aGlzLl9kaXNhYmxlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cblxuICAvKiogVGhlIGN1cnJlbnRseSBzZWxlY3RlZCBidXR0b24gdG9nZ2xlLCBzaG91bGQgbWF0Y2ggdGhlIHZhbHVlLiAqL1xuICBwcml2YXRlIF9zZWxlY3RlZDogQWpmQ2hlY2tib3hHcm91cEl0ZW08VD5bXSA9IFtdO1xuICBnZXQgc2VsZWN0ZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkO1xuICB9XG4gIHNldCBzZWxlY3RlZChzZWxlY3RlZDogQWpmQ2hlY2tib3hHcm91cEl0ZW08VD5bXSkge1xuICAgIHRoaXMuX3NlbGVjdGVkID0gc2VsZWN0ZWQ7XG4gICAgbGV0IHZhbHVlczogVFtdID0gW107XG4gICAgaWYgKHNlbGVjdGVkKSB7XG4gICAgICBzZWxlY3RlZC5mb3JFYWNoKGMgPT4ge1xuICAgICAgICBpZiAoYy52YWx1ZSkge1xuICAgICAgICAgIHZhbHVlcy5wdXNoKGMudmFsdWUpO1xuICAgICAgICAgIGlmICghYy5jaGVja2VkKSB7XG4gICAgICAgICAgICBjLmNoZWNrZWQgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIHRoaXMuX3ZhbHVlID0gdmFsdWVzO1xuICB9XG5cbiAgLyoqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgZ3JvdXAncyB2YWx1ZSBjaGFuZ2VzLiAqL1xuICBwcml2YXRlIF9jaGFuZ2U6IEV2ZW50RW1pdHRlcjxBamZDaGVja2JveEdyb3VwQ2hhbmdlPFQ+PiA9IG5ldyBFdmVudEVtaXR0ZXI8XG4gICAgQWpmQ2hlY2tib3hHcm91cENoYW5nZTxUPlxuICA+KCk7XG4gIEBPdXRwdXQoKVxuICByZWFkb25seSBjaGFuZ2U6IE9ic2VydmFibGU8QWpmQ2hlY2tib3hHcm91cENoYW5nZTxUPj4gPSB0aGlzLl9jaGFuZ2UgYXMgT2JzZXJ2YWJsZTxcbiAgICBBamZDaGVja2JveEdyb3VwQ2hhbmdlPFQ+XG4gID47XG5cbiAgLyoqIG9uVG91Y2ggZnVuY3Rpb24gcmVnaXN0ZXJlZCB2aWEgcmVnaXN0ZXJPblRvdWNoIChDb250cm9sVmFsdWVBY2Nlc3NvcikuICovXG4gIG9uVG91Y2hlZDogKCkgPT4gYW55ID0gKCkgPT4ge307XG5cbiAgLyoqXG4gICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gICAqL1xuICB3cml0ZVZhbHVlKHZhbHVlOiBUW10pIHtcbiAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICAvKipcbiAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci5cbiAgICovXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46ICh2YWx1ZTogVFtdKSA9PiB2b2lkKSB7XG4gICAgdGhpcy5fY29udHJvbFZhbHVlQWNjZXNzb3JDaGFuZ2VGbiA9IGZuO1xuICB9XG5cbiAgLyoqXG4gICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gICAqL1xuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KSB7XG4gICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcbiAgfVxuXG4gIGFkZFZhbHVlKHZhbHVlOiBUKSB7XG4gICAgbGV0IGN1clZhbHVlID0gKHRoaXMuX3ZhbHVlIHx8IFtdKS5zbGljZSgwKTtcbiAgICBpZiAoY3VyVmFsdWUuaW5kZXhPZih2YWx1ZSkgPT09IC0xKSB7XG4gICAgICBjdXJWYWx1ZS5wdXNoKHZhbHVlKTtcbiAgICAgIHRoaXMudmFsdWUgPSBjdXJWYWx1ZTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVWYWx1ZSh2YWx1ZTogVCkge1xuICAgIGxldCBjdXJWYWx1ZSA9ICh0aGlzLl92YWx1ZSB8fCBbXSkuc2xpY2UoMCk7XG4gICAgbGV0IGlkeCA9IGN1clZhbHVlLmluZGV4T2YodmFsdWUpO1xuICAgIGlmIChpZHggPiAtMSkge1xuICAgICAgY3VyVmFsdWUuc3BsaWNlKGlkeCwgMSk7XG4gICAgICB0aGlzLnZhbHVlID0gY3VyVmFsdWU7XG4gICAgfVxuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xuICAgIHRoaXMuX3VwZGF0ZUNoZWNrYm94ZXNOYW1lcygpO1xuICAgIHRoaXMuX3VwZGF0ZVNlbGVjdGVkQ2hlY2tib3hlc0Zyb21WYWx1ZSgpO1xuICB9XG5cbiAgcmVnaXN0ZXJJdGVtKGl0ZW06IEFqZkNoZWNrYm94R3JvdXBJdGVtPFQ+KTogdm9pZCB7XG4gICAgdGhpcy5jaGVja2JveGVzLnB1c2goaXRlbSk7XG4gIH1cblxuICAvKiogVGhlIG1ldGhvZCB0byBiZSBjYWxsZWQgaW4gb3JkZXIgdG8gdXBkYXRlIG5nTW9kZWwuICovXG4gIHByaXZhdGUgX2NvbnRyb2xWYWx1ZUFjY2Vzc29yQ2hhbmdlRm46ICh2YWx1ZTogYW55KSA9PiB2b2lkID0gXyA9PiB7fTtcblxuICBwcml2YXRlIF91cGRhdGVDaGVja2JveGVzTmFtZXMoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY2hlY2tib3hlcyA9PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuY2hlY2tib3hlcy5mb3JFYWNoKGNoZWNrYm94ID0+IHtcbiAgICAgIGlmIChjaGVja2JveCA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNoZWNrYm94Lm5hbWUgPSB0aGlzLl9uYW1lO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlU2VsZWN0ZWRDaGVja2JveGVzRnJvbVZhbHVlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmNoZWNrYm94ZXMgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmNoZWNrYm94ZXMuZm9yRWFjaChjaGVja2JveCA9PiB7XG4gICAgICBpZiAoY2hlY2tib3ggPT0gbnVsbCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoY2hlY2tib3gudmFsdWUgJiYgKHRoaXMuX3ZhbHVlIHx8IFtdKS5pbmRleE9mKGNoZWNrYm94LnZhbHVlKSA+IC0xKSB7XG4gICAgICAgIGNoZWNrYm94LmNoZWNrZWQgPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2hlY2tib3guY2hlY2tlZCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqIERpc3BhdGNoIGNoYW5nZSBldmVudCB3aXRoIGN1cnJlbnQgc2VsZWN0aW9uIGFuZCBncm91cCB2YWx1ZS4gKi9cbiAgcHJpdmF0ZSBfZW1pdENoYW5nZUV2ZW50KCk6IHZvaWQge1xuICAgIGNvbnN0IGV2ZW50ID0ge1xuICAgICAgc291cmNlOiB0aGlzLFxuICAgICAgdmFsdWU6IHRoaXMuX3ZhbHVlLFxuICAgIH07XG4gICAgdGhpcy5fY29udHJvbFZhbHVlQWNjZXNzb3JDaGFuZ2VGbihldmVudC52YWx1ZSk7XG4gICAgdGhpcy5fY2hhbmdlLmVtaXQoZXZlbnQpO1xuICB9XG5cbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2Rpc2FibGVkOiBCb29sZWFuSW5wdXQ7XG59XG5cbkBEaXJlY3RpdmUoKVxuZXhwb3J0IGNsYXNzIEFqZkNoZWNrYm94R3JvdXBJdGVtPFQ+IGltcGxlbWVudHMgT25Jbml0IHtcbiAgLyoqIFRoZSB1bmlxdWUgSUQgZm9yIHRoaXMgYnV0dG9uIHRvZ2dsZS4gKi9cbiAgcHJpdmF0ZSBfY2hlY2tib3hJZDogQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJycpO1xuICByZWFkb25seSBjaGVja2JveElkOiBPYnNlcnZhYmxlPHN0cmluZz4gPSB0aGlzLl9jaGVja2JveElkIGFzIE9ic2VydmFibGU8c3RyaW5nPjtcblxuICBASW5wdXQoKVxuICBzZXQgaWQoaWQ6IHN0cmluZykge1xuICAgIHRoaXMuX2NoZWNrYm94SWQubmV4dChpZCk7XG4gIH1cblxuICBASW5wdXQoKSBuYW1lOiBzdHJpbmcgPSAnJztcblxuICAvKiogVGhlIHBhcmVudCBidXR0b24gdG9nZ2xlIGdyb3VwIChleGNsdXNpdmUgc2VsZWN0aW9uKS4gT3B0aW9uYWwuICovXG4gIHJlYWRvbmx5IGNoZWNrYm94R3JvdXA6IEFqZkNoZWNrYm94R3JvdXA8VD4gfCB1bmRlZmluZWQ7XG5cbiAgLyoqIFdoZXRoZXIgb3Igbm90IHRoaXMgYnV0dG9uIHRvZ2dsZSBpcyBjaGVja2VkLiAqL1xuICBwcml2YXRlIF9jaGVja2VkU3RhdGU6IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICByZWFkb25seSBjaGVja2VkU3RhdGU6IE9ic2VydmFibGU8Ym9vbGVhbj4gPSB0aGlzLl9jaGVja2VkU3RhdGUgYXMgT2JzZXJ2YWJsZTxib29sZWFuPjtcbiAgZ2V0IGNoZWNrZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2NoZWNrZWRTdGF0ZS5nZXRWYWx1ZSgpO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBjaGVja2VkKGNoZWNrZWQ6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9jaGVja2VkU3RhdGUubmV4dChjaGVja2VkKTtcbiAgfVxuXG4gIC8qKiBXaGV0aGVyIG9yIG5vdCB0aGlzIGJ1dHRvbiB0b2dnbGUgaXMgZGlzYWJsZWQuICovXG4gIHByaXZhdGUgX2Rpc2FibGVkU3RhdGU6IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICByZWFkb25seSBkaXNhYmxlZFN0YXRlOiBPYnNlcnZhYmxlPGJvb2xlYW4+ID0gdGhpcy5fZGlzYWJsZWRTdGF0ZSBhcyBPYnNlcnZhYmxlPGJvb2xlYW4+O1xuICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgY29uc3QgZGlzYWJsZWQgPSB0aGlzLl9kaXNhYmxlZFN0YXRlLmdldFZhbHVlKCk7XG4gICAgcmV0dXJuIGRpc2FibGVkIHx8ICh0aGlzLmNoZWNrYm94R3JvdXAgIT0gbnVsbCAmJiB0aGlzLmNoZWNrYm94R3JvdXAuZGlzYWJsZWQpO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBkaXNhYmxlZChkaXNhYmxlZDogYm9vbGVhbikge1xuICAgIHRoaXMuX2Rpc2FibGVkU3RhdGUubmV4dChkaXNhYmxlZCAhPSBudWxsICYmIGRpc2FibGVkICE9PSBmYWxzZSk7XG4gIH1cblxuICAvKiogVmFsdWUgYXNzaWduZWQgdG8gdGhpcyBidXR0b24gdG9nZ2xlLiAqL1xuICBwcml2YXRlIF92YWx1ZTogVCB8IHVuZGVmaW5lZDtcbiAgZ2V0IHZhbHVlKCk6IFQgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgdmFsdWUodmFsdWU6IFQgfCB1bmRlZmluZWQpIHtcbiAgICBpZiAodGhpcy5fdmFsdWUgIT09IHZhbHVlKSB7XG4gICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2NoZWNrZWRJY29uVmFsOiBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignJyk7XG4gIGdldCBjaGVja2VkSWNvbigpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9jaGVja2VkSWNvblZhbC5nZXRWYWx1ZSgpO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBjaGVja2VkSWNvbihpY29uOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9jaGVja2VkSWNvblZhbC5uZXh0KGljb24pO1xuICB9XG5cbiAgcHJpdmF0ZSBfbm90Q2hlY2tlZEljb25WYWw6IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCcnKTtcbiAgZ2V0IG5vdENoZWNrZWRJY29uKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX25vdENoZWNrZWRJY29uVmFsLmdldFZhbHVlKCk7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IG5vdENoZWNrZWRJY29uKGljb246IHN0cmluZykge1xuICAgIHRoaXMuX25vdENoZWNrZWRJY29uVmFsLm5leHQoaWNvbik7XG4gIH1cblxuICByZWFkb25seSBpY29uOiBPYnNlcnZhYmxlPHN0cmluZz47XG5cbiAgLyoqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgZ3JvdXAgdmFsdWUgY2hhbmdlcy4gKi9cbiAgcHJpdmF0ZSBfY2hhbmdlOiBFdmVudEVtaXR0ZXI8QWpmQ2hlY2tib3hHcm91cEl0ZW1DaGFuZ2U8VD4+ID0gbmV3IEV2ZW50RW1pdHRlcjxcbiAgICBBamZDaGVja2JveEdyb3VwSXRlbUNoYW5nZTxUPlxuICA+KCk7XG4gIEBPdXRwdXQoKVxuICByZWFkb25seSBjaGFuZ2U6IE9ic2VydmFibGU8QWpmQ2hlY2tib3hHcm91cEl0ZW1DaGFuZ2U8VD4+ID0gdGhpcy5fY2hhbmdlIGFzIE9ic2VydmFibGU8XG4gICAgQWpmQ2hlY2tib3hHcm91cEl0ZW1DaGFuZ2U8VD5cbiAgPjtcblxuICBjb25zdHJ1Y3RvcihjaGVja2JveEdyb3VwPzogQWpmQ2hlY2tib3hHcm91cDxUPikge1xuICAgIHRoaXMuaWNvbiA9IGNvbWJpbmVMYXRlc3QoXG4gICAgICB0aGlzLl9jaGVja2VkU3RhdGUsXG4gICAgICB0aGlzLl9jaGVja2VkSWNvblZhbCxcbiAgICAgIHRoaXMuX25vdENoZWNrZWRJY29uVmFsLFxuICAgICkucGlwZShcbiAgICAgIG1hcChcbiAgICAgICAgKFtjaGVja2VkLCBjaGVja2VkSWNvbiwgbm90Q2hlY2tlZEljb25dKSA9PlxuICAgICAgICAgIChjaGVja2VkID8gY2hlY2tlZEljb24gOiBub3RDaGVja2VkSWNvbikgYXMgc3RyaW5nLFxuICAgICAgKSxcbiAgICApO1xuXG4gICAgaWYgKGNoZWNrYm94R3JvdXApIHtcbiAgICAgIHRoaXMuY2hlY2tib3hHcm91cCA9IGNoZWNrYm94R3JvdXA7XG4gICAgICB0aGlzLmNoZWNrYm94R3JvdXAucmVnaXN0ZXJJdGVtKHRoaXMpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICh0aGlzLmlkID09IG51bGwpIHtcbiAgICAgIHRoaXMuaWQgPSBgYWpmLWNoZWNrYm94LWdyb3VwLWl0ZW0tJHtfdW5pcXVlSWRDb3VudGVyKyt9YDtcbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICB0aGlzLmNoZWNrYm94R3JvdXAgJiZcbiAgICAgIHRoaXMuY2hlY2tib3hHcm91cC52YWx1ZSAmJlxuICAgICAgdGhpcy5fdmFsdWUgJiZcbiAgICAgIHRoaXMuY2hlY2tib3hHcm91cC52YWx1ZS5pbmRleE9mKHRoaXMuX3ZhbHVlKSA+IC0xXG4gICAgKSB7XG4gICAgICB0aGlzLmNoZWNrZWQgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBDaGVja3MgdGhlIGJ1dHRvbiB0b2dnbGUgZHVlIHRvIGFuIGludGVyYWN0aW9uIHdpdGggdGhlIHVuZGVybHlpbmcgbmF0aXZlIGlucHV0LiAqL1xuICBvbklucHV0Q2hhbmdlKGV2ZW50OiBFdmVudCkge1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgdGhpcy5fdG9nZ2xlKCk7XG4gIH1cblxuICAvKiogVG9nZ2xlIHRoZSBzdGF0ZSBvZiB0aGUgY3VycmVudCBidXR0b24gdG9nZ2xlLiAqL1xuICBwcml2YXRlIF90b2dnbGUoKTogdm9pZCB7XG4gICAgdGhpcy5jaGVja2VkID0gIXRoaXMuY2hlY2tlZDtcblxuICAgIGlmICh0aGlzLmNoZWNrYm94R3JvdXAgIT0gbnVsbCAmJiB0aGlzLl92YWx1ZSkge1xuICAgICAgaWYgKHRoaXMuY2hlY2tlZCkge1xuICAgICAgICB0aGlzLmNoZWNrYm94R3JvdXAuYWRkVmFsdWUodGhpcy5fdmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jaGVja2JveEdyb3VwLnJlbW92ZVZhbHVlKHRoaXMuX3ZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==