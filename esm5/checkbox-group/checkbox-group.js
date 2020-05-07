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
        checkedIcon: [{ type: Input }],
        notCheckedIcon: [{ type: Input }],
        change: [{ type: Output }]
    };
    return AjfCheckboxGroupItem;
}());
export { AjfCheckboxGroupItem };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3gtZ3JvdXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9jaGVja2JveC1ncm91cC9jaGVja2JveC1ncm91cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQWUscUJBQXFCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUMxRSxPQUFPLEVBRUwsU0FBUyxFQUNULFlBQVksRUFDWixVQUFVLEVBQ1YsS0FBSyxFQUVMLE1BQU0sRUFDUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQXVCLGlCQUFpQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDdkUsT0FBTyxFQUFDLGVBQWUsRUFBRSxhQUFhLEVBQUUsVUFBVSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQ2hFLE9BQU8sRUFBQyxHQUFHLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUduQyxNQUFNLENBQUMsSUFBTSxpQ0FBaUMsR0FBUTtJQUNwRCxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsY0FBTSxPQUFBLGdCQUFnQixFQUFoQixDQUFnQixDQUFDO0lBQy9DLEtBQUssRUFBRSxJQUFJO0NBQ1osQ0FBQztBQUVGO0lBQUE7SUFHQSxDQUFDO0lBQUQsaUNBQUM7QUFBRCxDQUFDLEFBSEQsSUFHQzs7QUFFRDtJQUFBO0lBR0EsQ0FBQztJQUFELDZCQUFDO0FBQUQsQ0FBQyxBQUhELElBR0M7O0FBRUQsSUFBSSxnQkFBZ0IsR0FBRyxDQUFDLENBQUM7QUFHekI7SUFBQTtRQUtFLGVBQVUsR0FBOEIsRUFBRSxDQUFDO1FBRTNDLDRGQUE0RjtRQUNwRixXQUFNLEdBQVEsRUFBRSxDQUFDO1FBd0J6Qix5Q0FBeUM7UUFDakMsY0FBUyxHQUFZLEtBQUssQ0FBQztRQVNuQyxvRUFBb0U7UUFDNUQsY0FBUyxHQUE4QixF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LENBQUMsRUFBRSxHQUFHLDZCQUEyQixnQkFBZ0IsRUFBSSxDQUFDO1NBQzNEO1FBRUQsSUFBSSxJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSztZQUM5QyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO1lBQ3RELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1NBQ3JCO0lBQ0gsQ0FBQztJQUVELHVGQUF1RjtJQUN2Riw0Q0FBYSxHQUFiLFVBQWMsS0FBWTtRQUN4QixLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7UUFFeEIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFFRCxxREFBcUQ7SUFDN0Msc0NBQU8sR0FBZjtRQUNFLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBRTdCLElBQUksSUFBSSxDQUFDLGFBQWEsSUFBSSxJQUFJLEVBQUU7WUFDOUIsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO2dCQUNoQixJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDMUM7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQzdDO1NBQ0Y7SUFDSCxDQUFDOztnQkFwSEYsU0FBUzs7OztnQkE2RW9CLGdCQUFnQjs7O3FCQXZFM0MsS0FBSzt1QkFLTCxLQUFLOzBCQVdMLEtBQUs7MkJBWUwsS0FBSzt3QkFVTCxLQUFLOzhCQVdMLEtBQUs7aUNBU0wsS0FBSzt5QkFVTCxNQUFNOztJQTJDVCwyQkFBQztDQUFBLEFBckhELElBcUhDO1NBcEhZLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtCb29sZWFuSW5wdXQsIGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eX0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7XG4gIEFmdGVyQ29udGVudEluaXQsXG4gIERpcmVjdGl2ZSxcbiAgRXZlbnRFbWl0dGVyLFxuICBmb3J3YXJkUmVmLFxuICBJbnB1dCxcbiAgT25Jbml0LFxuICBPdXRwdXRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtCZWhhdmlvclN1YmplY3QsIGNvbWJpbmVMYXRlc3QsIE9ic2VydmFibGV9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHttYXB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuXG5leHBvcnQgY29uc3QgQUpGX0NIRUNLQk9YX0dST1VQX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBBamZDaGVja2JveEdyb3VwKSxcbiAgbXVsdGk6IHRydWVcbn07XG5cbmV4cG9ydCBjbGFzcyBBamZDaGVja2JveEdyb3VwSXRlbUNoYW5nZTxUPiB7XG4gIHNvdXJjZTogQWpmQ2hlY2tib3hHcm91cEl0ZW08VD47XG4gIHZhbHVlOiBhbnk7XG59XG5cbmV4cG9ydCBjbGFzcyBBamZDaGVja2JveEdyb3VwQ2hhbmdlPFQ+IHtcbiAgc291cmNlOiBBamZDaGVja2JveEdyb3VwPFQ+O1xuICB2YWx1ZTogYW55O1xufVxuXG5sZXQgX3VuaXF1ZUlkQ291bnRlciA9IDA7XG5cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnYWpmLWNoZWNrYm94LWdyb3VwLFthamYtY2hlY2tib3gtZ3JvdXBdJyxcbiAgcHJvdmlkZXJzOiBbQUpGX0NIRUNLQk9YX0dST1VQX1ZBTFVFX0FDQ0VTU09SXVxufSlcbmV4cG9ydCBjbGFzcyBBamZDaGVja2JveEdyb3VwPFQ+IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuICBjaGVja2JveGVzOiBBamZDaGVja2JveEdyb3VwSXRlbTxUPltdID0gW107XG5cbiAgLyoqIFRoZSB2YWx1ZSBmb3IgdGhlIGJ1dHRvbiB0b2dnbGUgZ3JvdXAuIFNob3VsZCBtYXRjaCBjdXJyZW50bHkgc2VsZWN0ZWQgYnV0dG9uIHRvZ2dsZS4gKi9cbiAgcHJpdmF0ZSBfdmFsdWU6IFRbXSA9IFtdO1xuICBnZXQgdmFsdWUoKTogVFtdIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IHZhbHVlKG5ld1ZhbHVlOiBUW10pIHtcbiAgICBpZiAodGhpcy5fdmFsdWUgIT09IG5ld1ZhbHVlKSB7XG4gICAgICB0aGlzLl92YWx1ZSA9IG5ld1ZhbHVlO1xuICAgICAgdGhpcy5fdXBkYXRlU2VsZWN0ZWRDaGVja2JveGVzRnJvbVZhbHVlKCk7XG4gICAgICB0aGlzLl9lbWl0Q2hhbmdlRXZlbnQoKTtcbiAgICB9XG4gIH1cblxuICAvKiogVGhlIEhUTUwgbmFtZSBhdHRyaWJ1dGUgYXBwbGllZCB0byB0b2dnbGVzIGluIHRoaXMgZ3JvdXAuICovXG4gIHByaXZhdGUgX25hbWU6IHN0cmluZztcbiAgZ2V0IG5hbWUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fbmFtZTtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgbmFtZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fbmFtZSA9IHZhbHVlO1xuICAgIHRoaXMuX3VwZGF0ZUNoZWNrYm94ZXNOYW1lcygpO1xuICB9XG5cbiAgLyoqIERpc2FibGVzIGFsbCB0b2dnbGVzIGluIHRoZSBncm91cC4gKi9cbiAgcHJpdmF0ZSBfZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZDtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgZGlzYWJsZWQodmFsdWUpIHtcbiAgICB0aGlzLl9kaXNhYmxlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cblxuICAvKiogVGhlIGN1cnJlbnRseSBzZWxlY3RlZCBidXR0b24gdG9nZ2xlLCBzaG91bGQgbWF0Y2ggdGhlIHZhbHVlLiAqL1xuICBwcml2YXRlIF9zZWxlY3RlZDogQWpmQ2hlY2tib3hHcm91cEl0ZW08VD5bXSA9IFtdO1xuICBnZXQgc2VsZWN0ZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkO1xuICB9XG4gIHNldCBzZWxlY3RlZChzZWxlY3RlZDogQWpmQ2hlY2tib3hHcm91cEl0ZW08VD5bXSkge1xuICAgIHRoaXMuX3NlbGVjdGVkID0gc2VsZWN0ZWQ7XG4gICAgbGV0IHZhbHVlczogVFtdID0gW107XG4gICAgaWYgKHNlbGVjdGVkKSB7XG4gICAgICBzZWxlY3RlZC5mb3JFYWNoKGMgPT4ge1xuICAgICAgICB2YWx1ZXMucHVzaChjLnZhbHVlKTtcbiAgICAgICAgaWYgKCFjLmNoZWNrZWQpIHtcbiAgICAgICAgICBjLmNoZWNrZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZXM7XG4gIH1cblxuICAvKiogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBncm91cCdzIHZhbHVlIGNoYW5nZXMuICovXG4gIHByaXZhdGUgX2NoYW5nZTogRXZlbnRFbWl0dGVyPEFqZkNoZWNrYm94R3JvdXBDaGFuZ2U8VD4+ID1cbiAgICAgIG5ldyBFdmVudEVtaXR0ZXI8QWpmQ2hlY2tib3hHcm91cENoYW5nZTxUPj4oKTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IGNoYW5nZTogT2JzZXJ2YWJsZTxBamZDaGVja2JveEdyb3VwQ2hhbmdlPFQ+PiA9IHRoaXMuX2NoYW5nZS5hc09ic2VydmFibGUoKTtcblxuICAvKiogb25Ub3VjaCBmdW5jdGlvbiByZWdpc3RlcmVkIHZpYSByZWdpc3Rlck9uVG91Y2ggKENvbnRyb2xWYWx1ZUFjY2Vzc29yKS4gKi9cbiAgb25Ub3VjaGVkOiAoKSA9PiBhbnkgPSAoKSA9PiB7fTtcblxuICAvKipcbiAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci5cbiAgICovXG4gIHdyaXRlVmFsdWUodmFsdWU6IFRbXSkge1xuICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIENvbnRyb2xWYWx1ZUFjY2Vzc29yLlxuICAgKi9cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKHZhbHVlOiBUW10pID0+IHZvaWQpIHtcbiAgICB0aGlzLl9jb250cm9sVmFsdWVBY2Nlc3NvckNoYW5nZUZuID0gZm47XG4gIH1cblxuICAvKipcbiAgICogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci5cbiAgICovXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xuICB9XG5cbiAgYWRkVmFsdWUodmFsdWU6IFQpIHtcbiAgICBsZXQgY3VyVmFsdWUgPSAodGhpcy5fdmFsdWUgfHwgW10pLnNsaWNlKDApO1xuICAgIGlmIChjdXJWYWx1ZS5pbmRleE9mKHZhbHVlKSA9PT0gLTEpIHtcbiAgICAgIGN1clZhbHVlLnB1c2godmFsdWUpO1xuICAgICAgdGhpcy52YWx1ZSA9IGN1clZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZVZhbHVlKHZhbHVlOiBUKSB7XG4gICAgbGV0IGN1clZhbHVlID0gKHRoaXMuX3ZhbHVlIHx8IFtdKS5zbGljZSgwKTtcbiAgICBsZXQgaWR4ID0gY3VyVmFsdWUuaW5kZXhPZih2YWx1ZSk7XG4gICAgaWYgKGlkeCA+IC0xKSB7XG4gICAgICBjdXJWYWx1ZS5zcGxpY2UoaWR4LCAxKTtcbiAgICAgIHRoaXMudmFsdWUgPSBjdXJWYWx1ZTtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fdXBkYXRlQ2hlY2tib3hlc05hbWVzKCk7XG4gICAgdGhpcy5fdXBkYXRlU2VsZWN0ZWRDaGVja2JveGVzRnJvbVZhbHVlKCk7XG4gIH1cblxuICByZWdpc3Rlckl0ZW0oaXRlbTogQWpmQ2hlY2tib3hHcm91cEl0ZW08VD4pOiB2b2lkIHtcbiAgICB0aGlzLmNoZWNrYm94ZXMucHVzaChpdGVtKTtcbiAgfVxuXG4gIC8qKiBUaGUgbWV0aG9kIHRvIGJlIGNhbGxlZCBpbiBvcmRlciB0byB1cGRhdGUgbmdNb2RlbC4gKi9cbiAgcHJpdmF0ZSBfY29udHJvbFZhbHVlQWNjZXNzb3JDaGFuZ2VGbjogKHZhbHVlOiBhbnkpID0+IHZvaWQgPSAoXykgPT4ge307XG5cbiAgcHJpdmF0ZSBfdXBkYXRlQ2hlY2tib3hlc05hbWVzKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmNoZWNrYm94ZXMgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmNoZWNrYm94ZXMuZm9yRWFjaCgoY2hlY2tib3gpID0+IHtcbiAgICAgIGlmIChjaGVja2JveCA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNoZWNrYm94Lm5hbWUgPSB0aGlzLl9uYW1lO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlU2VsZWN0ZWRDaGVja2JveGVzRnJvbVZhbHVlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmNoZWNrYm94ZXMgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmNoZWNrYm94ZXMuZm9yRWFjaChjaGVja2JveCA9PiB7XG4gICAgICBpZiAoY2hlY2tib3ggPT0gbnVsbCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoKHRoaXMuX3ZhbHVlIHx8IFtdKS5pbmRleE9mKGNoZWNrYm94LnZhbHVlKSA+IC0xKSB7XG4gICAgICAgIGNoZWNrYm94LmNoZWNrZWQgPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2hlY2tib3guY2hlY2tlZCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqIERpc3BhdGNoIGNoYW5nZSBldmVudCB3aXRoIGN1cnJlbnQgc2VsZWN0aW9uIGFuZCBncm91cCB2YWx1ZS4gKi9cbiAgcHJpdmF0ZSBfZW1pdENoYW5nZUV2ZW50KCk6IHZvaWQge1xuICAgIGxldCBldmVudCA9IG5ldyBBamZDaGVja2JveEdyb3VwQ2hhbmdlPFQ+KCk7XG4gICAgZXZlbnQuc291cmNlID0gdGhpcztcbiAgICBldmVudC52YWx1ZSA9IHRoaXMuX3ZhbHVlO1xuICAgIHRoaXMuX2NvbnRyb2xWYWx1ZUFjY2Vzc29yQ2hhbmdlRm4oZXZlbnQudmFsdWUpO1xuICAgIHRoaXMuX2NoYW5nZS5lbWl0KGV2ZW50KTtcbiAgfVxuXG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9kaXNhYmxlZDogQm9vbGVhbklucHV0O1xufVxuXG5ARGlyZWN0aXZlKClcbmV4cG9ydCBjbGFzcyBBamZDaGVja2JveEdyb3VwSXRlbTxUPiBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIC8qKiBUaGUgdW5pcXVlIElEIGZvciB0aGlzIGJ1dHRvbiB0b2dnbGUuICovXG4gIHByaXZhdGUgX2NoZWNrYm94SWQ6IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCcnKTtcbiAgcmVhZG9ubHkgY2hlY2tib3hJZDogT2JzZXJ2YWJsZTxzdHJpbmc+ID0gdGhpcy5fY2hlY2tib3hJZC5hc09ic2VydmFibGUoKTtcblxuICBASW5wdXQoKVxuICBzZXQgaWQoaWQ6IHN0cmluZykge1xuICAgIHRoaXMuX2NoZWNrYm94SWQubmV4dChpZCk7XG4gIH1cblxuICBASW5wdXQoKSBuYW1lOiBzdHJpbmc7XG5cbiAgLyoqIFRoZSBwYXJlbnQgYnV0dG9uIHRvZ2dsZSBncm91cCAoZXhjbHVzaXZlIHNlbGVjdGlvbikuIE9wdGlvbmFsLiAqL1xuICByZWFkb25seSBjaGVja2JveEdyb3VwOiBBamZDaGVja2JveEdyb3VwPFQ+O1xuXG4gIC8qKiBXaGV0aGVyIG9yIG5vdCB0aGlzIGJ1dHRvbiB0b2dnbGUgaXMgY2hlY2tlZC4gKi9cbiAgcHJpdmF0ZSBfY2hlY2tlZFN0YXRlOiBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgcmVhZG9ubHkgY2hlY2tlZFN0YXRlOiBPYnNlcnZhYmxlPGJvb2xlYW4+ID0gdGhpcy5fY2hlY2tlZFN0YXRlLmFzT2JzZXJ2YWJsZSgpO1xuICBnZXQgY2hlY2tlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fY2hlY2tlZFN0YXRlLmdldFZhbHVlKCk7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IGNoZWNrZWQoY2hlY2tlZDogYm9vbGVhbikge1xuICAgIHRoaXMuX2NoZWNrZWRTdGF0ZS5uZXh0KGNoZWNrZWQpO1xuICB9XG5cbiAgLyoqIFdoZXRoZXIgb3Igbm90IHRoaXMgYnV0dG9uIHRvZ2dsZSBpcyBkaXNhYmxlZC4gKi9cbiAgcHJpdmF0ZSBfZGlzYWJsZWRTdGF0ZTogQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHJlYWRvbmx5IGRpc2FibGVkU3RhdGU6IE9ic2VydmFibGU8Ym9vbGVhbj4gPSB0aGlzLl9kaXNhYmxlZFN0YXRlLmFzT2JzZXJ2YWJsZSgpO1xuICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgY29uc3QgZGlzYWJsZWQgPSB0aGlzLl9kaXNhYmxlZFN0YXRlLmdldFZhbHVlKCk7XG4gICAgcmV0dXJuIGRpc2FibGVkIHx8ICh0aGlzLmNoZWNrYm94R3JvdXAgIT0gbnVsbCAmJiB0aGlzLmNoZWNrYm94R3JvdXAuZGlzYWJsZWQpO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBkaXNhYmxlZChkaXNhYmxlZDogYm9vbGVhbikge1xuICAgIHRoaXMuX2Rpc2FibGVkU3RhdGUubmV4dChkaXNhYmxlZCAhPSBudWxsICYmIGRpc2FibGVkICE9PSBmYWxzZSk7XG4gIH1cblxuICAvKiogVmFsdWUgYXNzaWduZWQgdG8gdGhpcyBidXR0b24gdG9nZ2xlLiAqL1xuICBwcml2YXRlIF92YWx1ZTogVDtcbiAgZ2V0IHZhbHVlKCk6IFQge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgdmFsdWUodmFsdWU6IFQpIHtcbiAgICBpZiAodGhpcy5fdmFsdWUgIT09IHZhbHVlKSB7XG4gICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2NoZWNrZWRJY29uVmFsOiBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignJyk7XG4gIGdldCBjaGVja2VkSWNvbigpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9jaGVja2VkSWNvblZhbC5nZXRWYWx1ZSgpO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBjaGVja2VkSWNvbihpY29uOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9jaGVja2VkSWNvblZhbC5uZXh0KGljb24pO1xuICB9XG5cbiAgcHJpdmF0ZSBfbm90Q2hlY2tlZEljb25WYWw6IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCcnKTtcbiAgZ2V0IG5vdENoZWNrZWRJY29uKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX25vdENoZWNrZWRJY29uVmFsLmdldFZhbHVlKCk7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IG5vdENoZWNrZWRJY29uKGljb246IHN0cmluZykge1xuICAgIHRoaXMuX25vdENoZWNrZWRJY29uVmFsLm5leHQoaWNvbik7XG4gIH1cblxuICByZWFkb25seSBpY29uOiBPYnNlcnZhYmxlPHN0cmluZz47XG5cbiAgLyoqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgZ3JvdXAgdmFsdWUgY2hhbmdlcy4gKi9cbiAgcHJpdmF0ZSBfY2hhbmdlOiBFdmVudEVtaXR0ZXI8QWpmQ2hlY2tib3hHcm91cEl0ZW1DaGFuZ2U8VD4+ID1cbiAgICAgIG5ldyBFdmVudEVtaXR0ZXI8QWpmQ2hlY2tib3hHcm91cEl0ZW1DaGFuZ2U8VD4+KCk7XG4gIEBPdXRwdXQoKVxuICByZWFkb25seSBjaGFuZ2U6IE9ic2VydmFibGU8QWpmQ2hlY2tib3hHcm91cEl0ZW1DaGFuZ2U8VD4+ID0gdGhpcy5fY2hhbmdlLmFzT2JzZXJ2YWJsZSgpO1xuXG4gIGNvbnN0cnVjdG9yKGNoZWNrYm94R3JvdXA/OiBBamZDaGVja2JveEdyb3VwPFQ+KSB7XG4gICAgdGhpcy5pY29uID0gY29tYmluZUxhdGVzdCh0aGlzLl9jaGVja2VkU3RhdGUsIHRoaXMuX2NoZWNrZWRJY29uVmFsLCB0aGlzLl9ub3RDaGVja2VkSWNvblZhbClcbiAgICAgICAgICAgICAgICAgICAgLnBpcGUobWFwKHIgPT4gclswXSA/IHJbMV0gOiByWzJdKSk7XG5cbiAgICBpZiAoY2hlY2tib3hHcm91cCkge1xuICAgICAgdGhpcy5jaGVja2JveEdyb3VwID0gY2hlY2tib3hHcm91cDtcbiAgICAgIHRoaXMuY2hlY2tib3hHcm91cC5yZWdpc3Rlckl0ZW0odGhpcyk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKHRoaXMuaWQgPT0gbnVsbCkge1xuICAgICAgdGhpcy5pZCA9IGBhamYtY2hlY2tib3gtZ3JvdXAtaXRlbS0ke191bmlxdWVJZENvdW50ZXIrK31gO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmNoZWNrYm94R3JvdXAgJiYgdGhpcy5jaGVja2JveEdyb3VwLnZhbHVlICYmXG4gICAgICAgIHRoaXMuY2hlY2tib3hHcm91cC52YWx1ZS5pbmRleE9mKHRoaXMuX3ZhbHVlKSA+IC0xKSB7XG4gICAgICB0aGlzLmNoZWNrZWQgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBDaGVja3MgdGhlIGJ1dHRvbiB0b2dnbGUgZHVlIHRvIGFuIGludGVyYWN0aW9uIHdpdGggdGhlIHVuZGVybHlpbmcgbmF0aXZlIGlucHV0LiAqL1xuICBvbklucHV0Q2hhbmdlKGV2ZW50OiBFdmVudCkge1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgdGhpcy5fdG9nZ2xlKCk7XG4gIH1cblxuICAvKiogVG9nZ2xlIHRoZSBzdGF0ZSBvZiB0aGUgY3VycmVudCBidXR0b24gdG9nZ2xlLiAqL1xuICBwcml2YXRlIF90b2dnbGUoKTogdm9pZCB7XG4gICAgdGhpcy5jaGVja2VkID0gIXRoaXMuY2hlY2tlZDtcblxuICAgIGlmICh0aGlzLmNoZWNrYm94R3JvdXAgIT0gbnVsbCkge1xuICAgICAgaWYgKHRoaXMuY2hlY2tlZCkge1xuICAgICAgICB0aGlzLmNoZWNrYm94R3JvdXAuYWRkVmFsdWUodGhpcy5fdmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jaGVja2JveEdyb3VwLnJlbW92ZVZhbHVlKHRoaXMuX3ZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==