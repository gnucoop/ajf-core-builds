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
        get: function () {
            return this._value;
        },
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
        get: function () {
            return this._name;
        },
        set: function (value) {
            this._name = value;
            this._updateCheckboxesNames();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfCheckboxGroup.prototype, "disabled", {
        get: function () {
            return this._disabled;
        },
        set: function (value) {
            this._disabled = coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfCheckboxGroup.prototype, "selected", {
        get: function () {
            return this._selected;
        },
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
        this.icon = combineLatest(this._checkedState, this._checkedIconVal, this._notCheckedIconVal)
            .pipe(map(function (r) { return r[0] ? r[1] : r[2]; }));
        if (checkboxGroup) {
            this.checkboxGroup = checkboxGroup;
            this.checkboxGroup.registerItem(this);
        }
    }
    Object.defineProperty(AjfCheckboxGroupItem.prototype, "id", {
        set: function (id) {
            this._checkboxId.next(id);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfCheckboxGroupItem.prototype, "checked", {
        get: function () {
            return this._checkedState.getValue();
        },
        set: function (checked) {
            this._checkedState.next(checked);
        },
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
        get: function () {
            return this._value;
        },
        set: function (value) {
            if (this._value !== value) {
                this._value = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfCheckboxGroupItem.prototype, "readonly", {
        get: function () {
            return this._readonly;
        },
        set: function (readonly) {
            this._readonly = coerceBooleanProperty(readonly);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfCheckboxGroupItem.prototype, "checkedIcon", {
        get: function () {
            return this._checkedIconVal.getValue();
        },
        set: function (icon) {
            this._checkedIconVal.next(icon);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfCheckboxGroupItem.prototype, "notCheckedIcon", {
        get: function () {
            return this._notCheckedIconVal.getValue();
        },
        set: function (icon) {
            this._notCheckedIconVal.next(icon);
        },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3gtZ3JvdXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9jaGVja2JveC1ncm91cC9jaGVja2JveC1ncm91cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQWUscUJBQXFCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUMxRSxPQUFPLEVBRUwsU0FBUyxFQUNULFlBQVksRUFDWixVQUFVLEVBQ1YsS0FBSyxFQUVMLE1BQU0sRUFDUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQXVCLGlCQUFpQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDdkUsT0FBTyxFQUFDLGVBQWUsRUFBRSxhQUFhLEVBQUUsVUFBVSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQ2hFLE9BQU8sRUFBQyxHQUFHLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUduQyxNQUFNLENBQUMsSUFBTSxpQ0FBaUMsR0FBUTtJQUNwRCxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsY0FBTSxPQUFBLGdCQUFnQixFQUFoQixDQUFnQixDQUFDO0lBQy9DLEtBQUssRUFBRSxJQUFJO0NBQ1osQ0FBQztBQUVGO0lBQUE7SUFHQSxDQUFDO0lBQUQsaUNBQUM7QUFBRCxDQUFDLEFBSEQsSUFHQzs7QUFFRDtJQUFBO0lBR0EsQ0FBQztJQUFELDZCQUFDO0FBQUQsQ0FBQyxBQUhELElBR0M7O0FBRUQsSUFBSSxnQkFBZ0IsR0FBRyxDQUFDLENBQUM7QUFHekI7SUFBQTtRQUtFLGVBQVUsR0FBOEIsRUFBRSxDQUFDO1FBRTNDLDRGQUE0RjtRQUNwRixXQUFNLEdBQVEsRUFBRSxDQUFDO1FBd0J6Qix5Q0FBeUM7UUFDakMsY0FBUyxHQUFZLEtBQUssQ0FBQztRQVNuQyxvRUFBb0U7UUFDNUQsY0FBUyxHQUE4QixF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QVdMLEtBQUs7OEJBU0wsS0FBSztpQ0FTTCxLQUFLO3lCQVVMLE1BQU07O0lBMkNULDJCQUFDO0NBQUEsQUE5SEQsSUE4SEM7U0E3SFksb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0Jvb2xlYW5JbnB1dCwgY29lcmNlQm9vbGVhblByb3BlcnR5fSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgRGlyZWN0aXZlLFxuICBFdmVudEVtaXR0ZXIsXG4gIGZvcndhcmRSZWYsXG4gIElucHV0LFxuICBPbkluaXQsXG4gIE91dHB1dFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge0JlaGF2aW9yU3ViamVjdCwgY29tYmluZUxhdGVzdCwgT2JzZXJ2YWJsZX0gZnJvbSAncnhqcyc7XG5pbXBvcnQge21hcH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5cbmV4cG9ydCBjb25zdCBBSkZfQ0hFQ0tCT1hfR1JPVVBfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IEFqZkNoZWNrYm94R3JvdXApLFxuICBtdWx0aTogdHJ1ZVxufTtcblxuZXhwb3J0IGNsYXNzIEFqZkNoZWNrYm94R3JvdXBJdGVtQ2hhbmdlPFQ+IHtcbiAgc291cmNlOiBBamZDaGVja2JveEdyb3VwSXRlbTxUPjtcbiAgdmFsdWU6IGFueTtcbn1cblxuZXhwb3J0IGNsYXNzIEFqZkNoZWNrYm94R3JvdXBDaGFuZ2U8VD4ge1xuICBzb3VyY2U6IEFqZkNoZWNrYm94R3JvdXA8VD47XG4gIHZhbHVlOiBhbnk7XG59XG5cbmxldCBfdW5pcXVlSWRDb3VudGVyID0gMDtcblxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdhamYtY2hlY2tib3gtZ3JvdXAsW2FqZi1jaGVja2JveC1ncm91cF0nLFxuICBwcm92aWRlcnM6IFtBSkZfQ0hFQ0tCT1hfR1JPVVBfVkFMVUVfQUNDRVNTT1JdXG59KVxuZXhwb3J0IGNsYXNzIEFqZkNoZWNrYm94R3JvdXA8VD4gaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gIGNoZWNrYm94ZXM6IEFqZkNoZWNrYm94R3JvdXBJdGVtPFQ+W10gPSBbXTtcblxuICAvKiogVGhlIHZhbHVlIGZvciB0aGUgYnV0dG9uIHRvZ2dsZSBncm91cC4gU2hvdWxkIG1hdGNoIGN1cnJlbnRseSBzZWxlY3RlZCBidXR0b24gdG9nZ2xlLiAqL1xuICBwcml2YXRlIF92YWx1ZTogVFtdID0gW107XG4gIGdldCB2YWx1ZSgpOiBUW10ge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgdmFsdWUobmV3VmFsdWU6IFRbXSkge1xuICAgIGlmICh0aGlzLl92YWx1ZSAhPT0gbmV3VmFsdWUpIHtcbiAgICAgIHRoaXMuX3ZhbHVlID0gbmV3VmFsdWU7XG4gICAgICB0aGlzLl91cGRhdGVTZWxlY3RlZENoZWNrYm94ZXNGcm9tVmFsdWUoKTtcbiAgICAgIHRoaXMuX2VtaXRDaGFuZ2VFdmVudCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBUaGUgSFRNTCBuYW1lIGF0dHJpYnV0ZSBhcHBsaWVkIHRvIHRvZ2dsZXMgaW4gdGhpcyBncm91cC4gKi9cbiAgcHJpdmF0ZSBfbmFtZTogc3RyaW5nO1xuICBnZXQgbmFtZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9uYW1lO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBuYW1lKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9uYW1lID0gdmFsdWU7XG4gICAgdGhpcy5fdXBkYXRlQ2hlY2tib3hlc05hbWVzKCk7XG4gIH1cblxuICAvKiogRGlzYWJsZXMgYWxsIHRvZ2dsZXMgaW4gdGhlIGdyb3VwLiAqL1xuICBwcml2YXRlIF9kaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBkaXNhYmxlZCh2YWx1ZSkge1xuICAgIHRoaXMuX2Rpc2FibGVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuXG4gIC8qKiBUaGUgY3VycmVudGx5IHNlbGVjdGVkIGJ1dHRvbiB0b2dnbGUsIHNob3VsZCBtYXRjaCB0aGUgdmFsdWUuICovXG4gIHByaXZhdGUgX3NlbGVjdGVkOiBBamZDaGVja2JveEdyb3VwSXRlbTxUPltdID0gW107XG4gIGdldCBzZWxlY3RlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWQ7XG4gIH1cbiAgc2V0IHNlbGVjdGVkKHNlbGVjdGVkOiBBamZDaGVja2JveEdyb3VwSXRlbTxUPltdKSB7XG4gICAgdGhpcy5fc2VsZWN0ZWQgPSBzZWxlY3RlZDtcbiAgICBsZXQgdmFsdWVzOiBUW10gPSBbXTtcbiAgICBpZiAoc2VsZWN0ZWQpIHtcbiAgICAgIHNlbGVjdGVkLmZvckVhY2goYyA9PiB7XG4gICAgICAgIHZhbHVlcy5wdXNoKGMudmFsdWUpO1xuICAgICAgICBpZiAoIWMuY2hlY2tlZCkge1xuICAgICAgICAgIGMuY2hlY2tlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICB0aGlzLl92YWx1ZSA9IHZhbHVlcztcbiAgfVxuXG4gIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIGdyb3VwJ3MgdmFsdWUgY2hhbmdlcy4gKi9cbiAgcHJpdmF0ZSBfY2hhbmdlOiBFdmVudEVtaXR0ZXI8QWpmQ2hlY2tib3hHcm91cENoYW5nZTxUPj4gPVxuICAgICAgbmV3IEV2ZW50RW1pdHRlcjxBamZDaGVja2JveEdyb3VwQ2hhbmdlPFQ+PigpO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgY2hhbmdlOiBPYnNlcnZhYmxlPEFqZkNoZWNrYm94R3JvdXBDaGFuZ2U8VD4+ID0gdGhpcy5fY2hhbmdlLmFzT2JzZXJ2YWJsZSgpO1xuXG4gIC8qKiBvblRvdWNoIGZ1bmN0aW9uIHJlZ2lzdGVyZWQgdmlhIHJlZ2lzdGVyT25Ub3VjaCAoQ29udHJvbFZhbHVlQWNjZXNzb3IpLiAqL1xuICBvblRvdWNoZWQ6ICgpID0+IGFueSA9ICgpID0+IHt9O1xuXG4gIC8qKlxuICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIENvbnRyb2xWYWx1ZUFjY2Vzc29yLlxuICAgKi9cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogVFtdKSB7XG4gICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gICAqL1xuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAodmFsdWU6IFRbXSkgPT4gdm9pZCkge1xuICAgIHRoaXMuX2NvbnRyb2xWYWx1ZUFjY2Vzc29yQ2hhbmdlRm4gPSBmbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIENvbnRyb2xWYWx1ZUFjY2Vzc29yLlxuICAgKi9cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSkge1xuICAgIHRoaXMub25Ub3VjaGVkID0gZm47XG4gIH1cblxuICBhZGRWYWx1ZSh2YWx1ZTogVCkge1xuICAgIGxldCBjdXJWYWx1ZSA9ICh0aGlzLl92YWx1ZSB8fCBbXSkuc2xpY2UoMCk7XG4gICAgaWYgKGN1clZhbHVlLmluZGV4T2YodmFsdWUpID09PSAtMSkge1xuICAgICAgY3VyVmFsdWUucHVzaCh2YWx1ZSk7XG4gICAgICB0aGlzLnZhbHVlID0gY3VyVmFsdWU7XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlVmFsdWUodmFsdWU6IFQpIHtcbiAgICBsZXQgY3VyVmFsdWUgPSAodGhpcy5fdmFsdWUgfHwgW10pLnNsaWNlKDApO1xuICAgIGxldCBpZHggPSBjdXJWYWx1ZS5pbmRleE9mKHZhbHVlKTtcbiAgICBpZiAoaWR4ID4gLTEpIHtcbiAgICAgIGN1clZhbHVlLnNwbGljZShpZHgsIDEpO1xuICAgICAgdGhpcy52YWx1ZSA9IGN1clZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLl91cGRhdGVDaGVja2JveGVzTmFtZXMoKTtcbiAgICB0aGlzLl91cGRhdGVTZWxlY3RlZENoZWNrYm94ZXNGcm9tVmFsdWUoKTtcbiAgfVxuXG4gIHJlZ2lzdGVySXRlbShpdGVtOiBBamZDaGVja2JveEdyb3VwSXRlbTxUPik6IHZvaWQge1xuICAgIHRoaXMuY2hlY2tib3hlcy5wdXNoKGl0ZW0pO1xuICB9XG5cbiAgLyoqIFRoZSBtZXRob2QgdG8gYmUgY2FsbGVkIGluIG9yZGVyIHRvIHVwZGF0ZSBuZ01vZGVsLiAqL1xuICBwcml2YXRlIF9jb250cm9sVmFsdWVBY2Nlc3NvckNoYW5nZUZuOiAodmFsdWU6IGFueSkgPT4gdm9pZCA9IChfKSA9PiB7fTtcblxuICBwcml2YXRlIF91cGRhdGVDaGVja2JveGVzTmFtZXMoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY2hlY2tib3hlcyA9PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuY2hlY2tib3hlcy5mb3JFYWNoKChjaGVja2JveCkgPT4ge1xuICAgICAgaWYgKGNoZWNrYm94ID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY2hlY2tib3gubmFtZSA9IHRoaXMuX25hbWU7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVTZWxlY3RlZENoZWNrYm94ZXNGcm9tVmFsdWUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY2hlY2tib3hlcyA9PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuY2hlY2tib3hlcy5mb3JFYWNoKGNoZWNrYm94ID0+IHtcbiAgICAgIGlmIChjaGVja2JveCA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmICgodGhpcy5fdmFsdWUgfHwgW10pLmluZGV4T2YoY2hlY2tib3gudmFsdWUpID4gLTEpIHtcbiAgICAgICAgY2hlY2tib3guY2hlY2tlZCA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjaGVja2JveC5jaGVja2VkID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKiogRGlzcGF0Y2ggY2hhbmdlIGV2ZW50IHdpdGggY3VycmVudCBzZWxlY3Rpb24gYW5kIGdyb3VwIHZhbHVlLiAqL1xuICBwcml2YXRlIF9lbWl0Q2hhbmdlRXZlbnQoKTogdm9pZCB7XG4gICAgbGV0IGV2ZW50ID0gbmV3IEFqZkNoZWNrYm94R3JvdXBDaGFuZ2U8VD4oKTtcbiAgICBldmVudC5zb3VyY2UgPSB0aGlzO1xuICAgIGV2ZW50LnZhbHVlID0gdGhpcy5fdmFsdWU7XG4gICAgdGhpcy5fY29udHJvbFZhbHVlQWNjZXNzb3JDaGFuZ2VGbihldmVudC52YWx1ZSk7XG4gICAgdGhpcy5fY2hhbmdlLmVtaXQoZXZlbnQpO1xuICB9XG5cbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2Rpc2FibGVkOiBCb29sZWFuSW5wdXQ7XG59XG5cbkBEaXJlY3RpdmUoKVxuZXhwb3J0IGNsYXNzIEFqZkNoZWNrYm94R3JvdXBJdGVtPFQ+IGltcGxlbWVudHMgT25Jbml0IHtcbiAgLyoqIFRoZSB1bmlxdWUgSUQgZm9yIHRoaXMgYnV0dG9uIHRvZ2dsZS4gKi9cbiAgcHJpdmF0ZSBfY2hlY2tib3hJZDogQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJycpO1xuICByZWFkb25seSBjaGVja2JveElkOiBPYnNlcnZhYmxlPHN0cmluZz4gPSB0aGlzLl9jaGVja2JveElkLmFzT2JzZXJ2YWJsZSgpO1xuXG4gIEBJbnB1dCgpXG4gIHNldCBpZChpZDogc3RyaW5nKSB7XG4gICAgdGhpcy5fY2hlY2tib3hJZC5uZXh0KGlkKTtcbiAgfVxuXG4gIEBJbnB1dCgpIG5hbWU6IHN0cmluZztcblxuICAvKiogVGhlIHBhcmVudCBidXR0b24gdG9nZ2xlIGdyb3VwIChleGNsdXNpdmUgc2VsZWN0aW9uKS4gT3B0aW9uYWwuICovXG4gIHJlYWRvbmx5IGNoZWNrYm94R3JvdXA6IEFqZkNoZWNrYm94R3JvdXA8VD47XG5cbiAgLyoqIFdoZXRoZXIgb3Igbm90IHRoaXMgYnV0dG9uIHRvZ2dsZSBpcyBjaGVja2VkLiAqL1xuICBwcml2YXRlIF9jaGVja2VkU3RhdGU6IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICByZWFkb25seSBjaGVja2VkU3RhdGU6IE9ic2VydmFibGU8Ym9vbGVhbj4gPSB0aGlzLl9jaGVja2VkU3RhdGUuYXNPYnNlcnZhYmxlKCk7XG4gIGdldCBjaGVja2VkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9jaGVja2VkU3RhdGUuZ2V0VmFsdWUoKTtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgY2hlY2tlZChjaGVja2VkOiBib29sZWFuKSB7XG4gICAgdGhpcy5fY2hlY2tlZFN0YXRlLm5leHQoY2hlY2tlZCk7XG4gIH1cblxuICAvKiogV2hldGhlciBvciBub3QgdGhpcyBidXR0b24gdG9nZ2xlIGlzIGRpc2FibGVkLiAqL1xuICBwcml2YXRlIF9kaXNhYmxlZFN0YXRlOiBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgcmVhZG9ubHkgZGlzYWJsZWRTdGF0ZTogT2JzZXJ2YWJsZTxib29sZWFuPiA9IHRoaXMuX2Rpc2FibGVkU3RhdGUuYXNPYnNlcnZhYmxlKCk7XG4gIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICBjb25zdCBkaXNhYmxlZCA9IHRoaXMuX2Rpc2FibGVkU3RhdGUuZ2V0VmFsdWUoKTtcbiAgICByZXR1cm4gZGlzYWJsZWQgfHwgKHRoaXMuY2hlY2tib3hHcm91cCAhPSBudWxsICYmIHRoaXMuY2hlY2tib3hHcm91cC5kaXNhYmxlZCk7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IGRpc2FibGVkKGRpc2FibGVkOiBib29sZWFuKSB7XG4gICAgdGhpcy5fZGlzYWJsZWRTdGF0ZS5uZXh0KGRpc2FibGVkICE9IG51bGwgJiYgZGlzYWJsZWQgIT09IGZhbHNlKTtcbiAgfVxuXG4gIC8qKiBWYWx1ZSBhc3NpZ25lZCB0byB0aGlzIGJ1dHRvbiB0b2dnbGUuICovXG4gIHByaXZhdGUgX3ZhbHVlOiBUO1xuICBnZXQgdmFsdWUoKTogVCB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCB2YWx1ZSh2YWx1ZTogVCkge1xuICAgIGlmICh0aGlzLl92YWx1ZSAhPT0gdmFsdWUpIHtcbiAgICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIF9yZWFkb25seTogYm9vbGVhbjtcbiAgZ2V0IHJlYWRvbmx5KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9yZWFkb25seTtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgcmVhZG9ubHkocmVhZG9ubHk6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9yZWFkb25seSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eShyZWFkb25seSk7XG4gIH1cblxuICBwcml2YXRlIF9jaGVja2VkSWNvblZhbDogQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJycpO1xuICBnZXQgY2hlY2tlZEljb24oKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fY2hlY2tlZEljb25WYWwuZ2V0VmFsdWUoKTtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgY2hlY2tlZEljb24oaWNvbjogc3RyaW5nKSB7XG4gICAgdGhpcy5fY2hlY2tlZEljb25WYWwubmV4dChpY29uKTtcbiAgfVxuXG4gIHByaXZhdGUgX25vdENoZWNrZWRJY29uVmFsOiBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignJyk7XG4gIGdldCBub3RDaGVja2VkSWNvbigpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9ub3RDaGVja2VkSWNvblZhbC5nZXRWYWx1ZSgpO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBub3RDaGVja2VkSWNvbihpY29uOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9ub3RDaGVja2VkSWNvblZhbC5uZXh0KGljb24pO1xuICB9XG5cbiAgcmVhZG9ubHkgaWNvbjogT2JzZXJ2YWJsZTxzdHJpbmc+O1xuXG4gIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIGdyb3VwIHZhbHVlIGNoYW5nZXMuICovXG4gIHByaXZhdGUgX2NoYW5nZTogRXZlbnRFbWl0dGVyPEFqZkNoZWNrYm94R3JvdXBJdGVtQ2hhbmdlPFQ+PiA9XG4gICAgICBuZXcgRXZlbnRFbWl0dGVyPEFqZkNoZWNrYm94R3JvdXBJdGVtQ2hhbmdlPFQ+PigpO1xuICBAT3V0cHV0KClcbiAgcmVhZG9ubHkgY2hhbmdlOiBPYnNlcnZhYmxlPEFqZkNoZWNrYm94R3JvdXBJdGVtQ2hhbmdlPFQ+PiA9IHRoaXMuX2NoYW5nZS5hc09ic2VydmFibGUoKTtcblxuICBjb25zdHJ1Y3RvcihjaGVja2JveEdyb3VwPzogQWpmQ2hlY2tib3hHcm91cDxUPikge1xuICAgIHRoaXMuaWNvbiA9IGNvbWJpbmVMYXRlc3QodGhpcy5fY2hlY2tlZFN0YXRlLCB0aGlzLl9jaGVja2VkSWNvblZhbCwgdGhpcy5fbm90Q2hlY2tlZEljb25WYWwpXG4gICAgICAgICAgICAgICAgICAgIC5waXBlKG1hcChyID0+IHJbMF0gPyByWzFdIDogclsyXSkpO1xuXG4gICAgaWYgKGNoZWNrYm94R3JvdXApIHtcbiAgICAgIHRoaXMuY2hlY2tib3hHcm91cCA9IGNoZWNrYm94R3JvdXA7XG4gICAgICB0aGlzLmNoZWNrYm94R3JvdXAucmVnaXN0ZXJJdGVtKHRoaXMpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICh0aGlzLmlkID09IG51bGwpIHtcbiAgICAgIHRoaXMuaWQgPSBgYWpmLWNoZWNrYm94LWdyb3VwLWl0ZW0tJHtfdW5pcXVlSWRDb3VudGVyKyt9YDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5jaGVja2JveEdyb3VwICYmIHRoaXMuY2hlY2tib3hHcm91cC52YWx1ZSAmJlxuICAgICAgICB0aGlzLmNoZWNrYm94R3JvdXAudmFsdWUuaW5kZXhPZih0aGlzLl92YWx1ZSkgPiAtMSkge1xuICAgICAgdGhpcy5jaGVja2VkID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICAvKiogQ2hlY2tzIHRoZSBidXR0b24gdG9nZ2xlIGR1ZSB0byBhbiBpbnRlcmFjdGlvbiB3aXRoIHRoZSB1bmRlcmx5aW5nIG5hdGl2ZSBpbnB1dC4gKi9cbiAgb25JbnB1dENoYW5nZShldmVudDogRXZlbnQpIHtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgIHRoaXMuX3RvZ2dsZSgpO1xuICB9XG5cbiAgLyoqIFRvZ2dsZSB0aGUgc3RhdGUgb2YgdGhlIGN1cnJlbnQgYnV0dG9uIHRvZ2dsZS4gKi9cbiAgcHJpdmF0ZSBfdG9nZ2xlKCk6IHZvaWQge1xuICAgIHRoaXMuY2hlY2tlZCA9ICF0aGlzLmNoZWNrZWQ7XG5cbiAgICBpZiAodGhpcy5jaGVja2JveEdyb3VwICE9IG51bGwpIHtcbiAgICAgIGlmICh0aGlzLmNoZWNrZWQpIHtcbiAgICAgICAgdGhpcy5jaGVja2JveEdyb3VwLmFkZFZhbHVlKHRoaXMuX3ZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY2hlY2tib3hHcm91cC5yZW1vdmVWYWx1ZSh0aGlzLl92YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=