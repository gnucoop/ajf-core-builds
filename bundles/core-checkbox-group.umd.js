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
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms'), require('rxjs'), require('rxjs/operators'), require('@ajf/core/utils')) :
    typeof define === 'function' && define.amd ? define('@ajf/core/checkbox-group', ['exports', '@angular/core', '@angular/forms', 'rxjs', 'rxjs/operators', '@ajf/core/utils'], factory) :
    (global = global || self, factory((global.ajf = global.ajf || {}, global.ajf.core = global.ajf.core || {}, global.ajf.core.checkboxGroup = {}), global.ng.core, global.ng.forms, global.rxjs, global.rxjs.operators, global.ajf.core.utils));
}(this, function (exports, core, forms, rxjs, operators, utils) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var AJF_CHECKBOX_GROUP_VALUE_ACCESSOR = {
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: core.forwardRef((/**
         * @return {?}
         */
        function () { return AjfCheckboxGroup; })),
        multi: true
    };
    /**
     * @template T
     */
    var   /**
     * @template T
     */
    AjfCheckboxGroupItemChange = /** @class */ (function () {
        function AjfCheckboxGroupItemChange() {
        }
        return AjfCheckboxGroupItemChange;
    }());
    /**
     * @template T
     */
    var   /**
     * @template T
     */
    AjfCheckboxGroupChange = /** @class */ (function () {
        function AjfCheckboxGroupChange() {
        }
        return AjfCheckboxGroupChange;
    }());
    /** @type {?} */
    var _uniqueIdCounter = 0;
    /**
     * @template T
     */
    var AjfCheckboxGroup = /** @class */ (function () {
        function AjfCheckboxGroup() {
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
            this._change = new core.EventEmitter();
            this.change = this._change.asObservable();
            /**
             * onTouch function registered via registerOnTouch (ControlValueAccessor).
             */
            this.onTouched = (/**
             * @return {?}
             */
            function () { });
            /**
             * The method to be called in order to update ngModel.
             */
            this._controlValueAccessorChangeFn = (/**
             * @param {?} _
             * @return {?}
             */
            function (_) { });
        }
        Object.defineProperty(AjfCheckboxGroup.prototype, "value", {
            get: /**
             * @return {?}
             */
            function () { return this._value; },
            set: /**
             * @param {?} newValue
             * @return {?}
             */
            function (newValue) {
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
            get: /**
             * @return {?}
             */
            function () { return this._name; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._name = value;
                this._updateCheckboxesNames();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AjfCheckboxGroup.prototype, "disabled", {
            get: /**
             * @return {?}
             */
            function () { return this._disabled; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._disabled = utils.coerceBooleanProperty(value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AjfCheckboxGroup.prototype, "selected", {
            get: /**
             * @return {?}
             */
            function () { return this._selected; },
            set: /**
             * @param {?} selected
             * @return {?}
             */
            function (selected) {
                this._selected = selected;
                /** @type {?} */
                var values = [];
                if (selected) {
                    selected.forEach((/**
                     * @param {?} c
                     * @return {?}
                     */
                    function (c) {
                        values.push(c.value);
                        if (!c.checked) {
                            c.checked = true;
                        }
                    }));
                }
                this._value = values;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Implemented as part of ControlValueAccessor.
         */
        /**
         * Implemented as part of ControlValueAccessor.
         * @param {?} value
         * @return {?}
         */
        AjfCheckboxGroup.prototype.writeValue = /**
         * Implemented as part of ControlValueAccessor.
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.value = value;
        };
        /**
         * Implemented as part of ControlValueAccessor.
         */
        /**
         * Implemented as part of ControlValueAccessor.
         * @param {?} fn
         * @return {?}
         */
        AjfCheckboxGroup.prototype.registerOnChange = /**
         * Implemented as part of ControlValueAccessor.
         * @param {?} fn
         * @return {?}
         */
        function (fn) {
            this._controlValueAccessorChangeFn = fn;
        };
        /**
         * Implemented as part of ControlValueAccessor.
         */
        /**
         * Implemented as part of ControlValueAccessor.
         * @param {?} fn
         * @return {?}
         */
        AjfCheckboxGroup.prototype.registerOnTouched = /**
         * Implemented as part of ControlValueAccessor.
         * @param {?} fn
         * @return {?}
         */
        function (fn) {
            this.onTouched = fn;
        };
        /**
         * @param {?} value
         * @return {?}
         */
        AjfCheckboxGroup.prototype.addValue = /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            /** @type {?} */
            var curValue = (this._value || []).slice(0);
            if (curValue.indexOf(value) === -1) {
                curValue.push(value);
                this.value = curValue;
            }
        };
        /**
         * @param {?} value
         * @return {?}
         */
        AjfCheckboxGroup.prototype.removeValue = /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            /** @type {?} */
            var curValue = (this._value || []).slice(0);
            /** @type {?} */
            var idx = curValue.indexOf(value);
            if (idx > -1) {
                curValue.splice(idx, 1);
                this.value = curValue;
            }
        };
        /**
         * @return {?}
         */
        AjfCheckboxGroup.prototype.ngAfterContentInit = /**
         * @return {?}
         */
        function () {
            this._updateCheckboxesNames();
            this._updateSelectedCheckboxesFromValue();
        };
        /**
         * @private
         * @return {?}
         */
        AjfCheckboxGroup.prototype._updateCheckboxesNames = /**
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            if (this.checkboxes == null) {
                return;
            }
            this.checkboxes.forEach((/**
             * @param {?} checkbox
             * @return {?}
             */
            function (checkbox) {
                checkbox.name = _this._name;
            }));
        };
        /**
         * @private
         * @return {?}
         */
        AjfCheckboxGroup.prototype._updateSelectedCheckboxesFromValue = /**
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            if (this.checkboxes == null) {
                return;
            }
            this.checkboxes.forEach((/**
             * @param {?} checkbox
             * @return {?}
             */
            function (checkbox) {
                if ((_this._value || []).indexOf(checkbox.value) > -1) {
                    checkbox.checked = true;
                }
                else {
                    checkbox.checked = false;
                }
            }));
        };
        /** Dispatch change event with current selection and group value. */
        /**
         * Dispatch change event with current selection and group value.
         * @private
         * @return {?}
         */
        AjfCheckboxGroup.prototype._emitChangeEvent = /**
         * Dispatch change event with current selection and group value.
         * @private
         * @return {?}
         */
        function () {
            /** @type {?} */
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
                    },] },
        ];
        AjfCheckboxGroup.propDecorators = {
            value: [{ type: core.Input }],
            name: [{ type: core.Input }],
            disabled: [{ type: core.Input }],
            change: [{ type: core.Output }]
        };
        return AjfCheckboxGroup;
    }());
    /**
     * @template T
     */
    var   /**
     * @template T
     */
    AjfCheckboxGroupItem = /** @class */ (function () {
        function AjfCheckboxGroupItem(checkboxGroup) {
            /**
             * The unique ID for this button toggle.
             */
            this._checkboxId = new rxjs.BehaviorSubject('');
            this.checkboxId = this._checkboxId.asObservable();
            /**
             * Whether or not this button toggle is checked.
             */
            this._checkedState = new rxjs.BehaviorSubject(false);
            this.checkedState = this._checkedState.asObservable();
            /**
             * Whether or not this button toggle is disabled.
             */
            this._disabledState = new rxjs.BehaviorSubject(false);
            this.disabledState = this._disabledState.asObservable();
            this._checkedIconVal = new rxjs.BehaviorSubject('');
            this._notCheckedIconVal = new rxjs.BehaviorSubject('');
            /**
             * Event emitted when the group value changes.
             */
            this._change = new core.EventEmitter();
            this.change = this._change.asObservable();
            this.icon = rxjs.combineLatest(this._checkedState, this._checkedIconVal, this._notCheckedIconVal).pipe(operators.map((/**
             * @param {?} r
             * @return {?}
             */
            function (r) { return r[0] ? r[1] : r[2]; })));
            if (checkboxGroup) {
                this.checkboxGroup = checkboxGroup;
            }
        }
        Object.defineProperty(AjfCheckboxGroupItem.prototype, "id", {
            set: /**
             * @param {?} id
             * @return {?}
             */
            function (id) { this._checkboxId.next(id); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AjfCheckboxGroupItem.prototype, "checked", {
            get: /**
             * @return {?}
             */
            function () { return this._checkedState.getValue(); },
            set: /**
             * @param {?} checked
             * @return {?}
             */
            function (checked) { this._checkedState.next(checked); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AjfCheckboxGroupItem.prototype, "disabled", {
            get: /**
             * @return {?}
             */
            function () {
                /** @type {?} */
                var disabled = this._disabledState.getValue();
                return disabled || (this.checkboxGroup != null && this.checkboxGroup.disabled);
            },
            set: /**
             * @param {?} disabled
             * @return {?}
             */
            function (disabled) {
                this._disabledState.next(disabled != null && disabled !== false);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AjfCheckboxGroupItem.prototype, "value", {
            get: /**
             * @return {?}
             */
            function () { return this._value; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                if (this._value !== value) {
                    this._value = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AjfCheckboxGroupItem.prototype, "checkedIcon", {
            get: /**
             * @return {?}
             */
            function () { return this._checkedIconVal.getValue(); },
            set: /**
             * @param {?} icon
             * @return {?}
             */
            function (icon) { this._checkedIconVal.next(icon); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AjfCheckboxGroupItem.prototype, "notCheckedIcon", {
            get: /**
             * @return {?}
             */
            function () { return this._notCheckedIconVal.getValue(); },
            set: /**
             * @param {?} icon
             * @return {?}
             */
            function (icon) { this._notCheckedIconVal.next(icon); },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        AjfCheckboxGroupItem.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            if (this.id == null) {
                this.id = "ajf-checkbox-group-item-" + _uniqueIdCounter++;
            }
            if (this.checkboxGroup && this.checkboxGroup.value &&
                this.checkboxGroup.value.indexOf(this._value) > -1) {
                this.checked = true;
            }
        };
        /** Checks the button toggle due to an interaction with the underlying native input. */
        /**
         * Checks the button toggle due to an interaction with the underlying native input.
         * @param {?} event
         * @return {?}
         */
        AjfCheckboxGroupItem.prototype.onInputChange = /**
         * Checks the button toggle due to an interaction with the underlying native input.
         * @param {?} event
         * @return {?}
         */
        function (event) {
            event.stopPropagation();
            this._toggle();
        };
        /** Toggle the state of the current button toggle. */
        /**
         * Toggle the state of the current button toggle.
         * @private
         * @return {?}
         */
        AjfCheckboxGroupItem.prototype._toggle = /**
         * Toggle the state of the current button toggle.
         * @private
         * @return {?}
         */
        function () {
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
        return AjfCheckboxGroupItem;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
                    },] },
        ];
        return AjfCheckboxGroupModule;
    }());

    exports.AJF_CHECKBOX_GROUP_VALUE_ACCESSOR = AJF_CHECKBOX_GROUP_VALUE_ACCESSOR;
    exports.AjfCheckboxGroupItemChange = AjfCheckboxGroupItemChange;
    exports.AjfCheckboxGroupChange = AjfCheckboxGroupChange;
    exports.AjfCheckboxGroup = AjfCheckboxGroup;
    exports.AjfCheckboxGroupItem = AjfCheckboxGroupItem;
    exports.AjfCheckboxGroupModule = AjfCheckboxGroupModule;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=core-checkbox-group.umd.js.map
