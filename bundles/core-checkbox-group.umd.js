(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/cdk/coercion'), require('@angular/core'), require('@angular/forms'), require('rxjs'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define('@ajf/core/checkbox-group', ['exports', '@angular/cdk/coercion', '@angular/core', '@angular/forms', 'rxjs', 'rxjs/operators'], factory) :
    (global = global || self, factory((global.ajf = global.ajf || {}, global.ajf.core = global.ajf.core || {}, global.ajf.core.checkboxGroup = {}), global.ng.cdk.coercion, global.ng.core, global.ng.forms, global.rxjs, global.rxjs.operators));
}(this, (function (exports, coercion, core, forms, rxjs, operators) { 'use strict';

    /**
     * @license
     * Copyright (C) 2018 Gnucoop soc. coop.
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
    var AJF_CHECKBOX_GROUP_VALUE_ACCESSOR = {
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: core.forwardRef(function () { return AjfCheckboxGroup; }),
        multi: true
    };
    var AjfCheckboxGroupItemChange = /** @class */ (function () {
        function AjfCheckboxGroupItemChange() {
        }
        return AjfCheckboxGroupItemChange;
    }());
    var AjfCheckboxGroupChange = /** @class */ (function () {
        function AjfCheckboxGroupChange() {
        }
        return AjfCheckboxGroupChange;
    }());
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
            this._change = new core.EventEmitter();
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
                this._disabled = coercion.coerceBooleanProperty(value);
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
            { type: core.Directive, args: [{
                        selector: 'ajf-checkbox-group,[ajf-checkbox-group]',
                        providers: [AJF_CHECKBOX_GROUP_VALUE_ACCESSOR]
                    },] }
        ];
        AjfCheckboxGroup.propDecorators = {
            value: [{ type: core.Input }],
            name: [{ type: core.Input }],
            disabled: [{ type: core.Input }],
            change: [{ type: core.Output }]
        };
        return AjfCheckboxGroup;
    }());
    var AjfCheckboxGroupItem = /** @class */ (function () {
        function AjfCheckboxGroupItem(checkboxGroup) {
            /** The unique ID for this button toggle. */
            this._checkboxId = new rxjs.BehaviorSubject('');
            this.checkboxId = this._checkboxId.asObservable();
            /** Whether or not this button toggle is checked. */
            this._checkedState = new rxjs.BehaviorSubject(false);
            this.checkedState = this._checkedState.asObservable();
            /** Whether or not this button toggle is disabled. */
            this._disabledState = new rxjs.BehaviorSubject(false);
            this.disabledState = this._disabledState.asObservable();
            this._checkedIconVal = new rxjs.BehaviorSubject('');
            this._notCheckedIconVal = new rxjs.BehaviorSubject('');
            /** Event emitted when the group value changes. */
            this._change = new core.EventEmitter();
            this.change = this._change.asObservable();
            this.icon = rxjs.combineLatest(this._checkedState, this._checkedIconVal, this._notCheckedIconVal).pipe(operators.map(function (r) { return r[0] ? r[1] : r[2]; }));
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
                this._readonly = coercion.coerceBooleanProperty(readonly);
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
            { type: core.Directive }
        ];
        /** @nocollapse */
        AjfCheckboxGroupItem.ctorParameters = function () { return [
            { type: AjfCheckboxGroup }
        ]; };
        AjfCheckboxGroupItem.propDecorators = {
            id: [{ type: core.Input }],
            name: [{ type: core.Input }],
            checked: [{ type: core.Input }],
            disabled: [{ type: core.Input }],
            value: [{ type: core.Input }],
            readonly: [{ type: core.Input }],
            checkedIcon: [{ type: core.Input }],
            notCheckedIcon: [{ type: core.Input }],
            change: [{ type: core.Output }]
        };
        return AjfCheckboxGroupItem;
    }());

    /**
     * @license
     * Copyright (C) 2018 Gnucoop soc. coop.
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
    var AjfCheckboxGroupModule = /** @class */ (function () {
        function AjfCheckboxGroupModule() {
        }
        AjfCheckboxGroupModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            forms.FormsModule
                        ],
                        declarations: [
                            AjfCheckboxGroup
                        ],
                        exports: [
                            AjfCheckboxGroup
                        ]
                    },] }
        ];
        return AjfCheckboxGroupModule;
    }());

    /**
     * @license
     * Copyright (C) 2018 Gnucoop soc. coop.
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

    /**
     * Generated bundle index. Do not edit.
     */

    exports.AJF_CHECKBOX_GROUP_VALUE_ACCESSOR = AJF_CHECKBOX_GROUP_VALUE_ACCESSOR;
    exports.AjfCheckboxGroup = AjfCheckboxGroup;
    exports.AjfCheckboxGroupChange = AjfCheckboxGroupChange;
    exports.AjfCheckboxGroupItem = AjfCheckboxGroupItem;
    exports.AjfCheckboxGroupItemChange = AjfCheckboxGroupItemChange;
    exports.AjfCheckboxGroupModule = AjfCheckboxGroupModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=core-checkbox-group.umd.js.map
