(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/cdk/coercion'), require('@angular/core'), require('@angular/forms'), require('rxjs'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define('@ajf/core/checkbox-group', ['exports', '@angular/cdk/coercion', '@angular/core', '@angular/forms', 'rxjs', 'rxjs/operators'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.ajf = global.ajf || {}, global.ajf.core = global.ajf.core || {}, global.ajf.core.checkboxGroup = {}), global.ng.cdk.coercion, global.ng.core, global.ng.forms, global.rxjs, global.rxjs.operators));
}(this, (function (exports, coercion, core, forms, rxjs, operators) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (Object.prototype.hasOwnProperty.call(b, p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, o) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
                __createBinding(o, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    /** @deprecated */
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    /** @deprecated */
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    function __spreadArray(to, from) {
        for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
            to[j] = from[i];
        return to;
    }
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, state, kind, f) {
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    }
    function __classPrivateFieldSet(receiver, state, value, kind, f) {
        if (kind === "m")
            throw new TypeError("Private method is not writable");
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
    }

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
            this.change = this._change;
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
            enumerable: false,
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
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AjfCheckboxGroup.prototype, "disabled", {
            get: function () {
                return this._disabled;
            },
            set: function (value) {
                this._disabled = coercion.coerceBooleanProperty(value);
            },
            enumerable: false,
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
            enumerable: false,
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
        return AjfCheckboxGroup;
    }());
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
    var AjfCheckboxGroupItem = /** @class */ (function () {
        function AjfCheckboxGroupItem(checkboxGroup) {
            /** The unique ID for this button toggle. */
            this._checkboxId = new rxjs.BehaviorSubject('');
            this.checkboxId = this._checkboxId;
            /** Whether or not this button toggle is checked. */
            this._checkedState = new rxjs.BehaviorSubject(false);
            this.checkedState = this._checkedState;
            /** Whether or not this button toggle is disabled. */
            this._disabledState = new rxjs.BehaviorSubject(false);
            this.disabledState = this._disabledState;
            this._checkedIconVal = new rxjs.BehaviorSubject('');
            this._notCheckedIconVal = new rxjs.BehaviorSubject('');
            /** Event emitted when the group value changes. */
            this._change = new core.EventEmitter();
            this.change = this._change;
            this.icon = rxjs.combineLatest(this._checkedState, this._checkedIconVal, this._notCheckedIconVal)
                .pipe(operators.map(function (_a) {
                var _b = __read(_a, 3), checked = _b[0], checkedIcon = _b[1], notCheckedIcon = _b[2];
                return (checked ? checkedIcon : notCheckedIcon);
            }));
            if (checkboxGroup) {
                this.checkboxGroup = checkboxGroup;
                this.checkboxGroup.registerItem(this);
            }
        }
        Object.defineProperty(AjfCheckboxGroupItem.prototype, "id", {
            set: function (id) {
                this._checkboxId.next(id);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AjfCheckboxGroupItem.prototype, "checked", {
            get: function () {
                return this._checkedState.getValue();
            },
            set: function (checked) {
                this._checkedState.next(checked);
            },
            enumerable: false,
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
            enumerable: false,
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
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AjfCheckboxGroupItem.prototype, "checkedIcon", {
            get: function () {
                return this._checkedIconVal.getValue();
            },
            set: function (icon) {
                this._checkedIconVal.next(icon);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AjfCheckboxGroupItem.prototype, "notCheckedIcon", {
            get: function () {
                return this._notCheckedIconVal.getValue();
            },
            set: function (icon) {
                this._notCheckedIconVal.next(icon);
            },
            enumerable: false,
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
        return AjfCheckboxGroupItem;
    }());
    AjfCheckboxGroupItem.decorators = [
        { type: core.Directive }
    ];
    AjfCheckboxGroupItem.ctorParameters = function () { return [
        { type: AjfCheckboxGroup }
    ]; };
    AjfCheckboxGroupItem.propDecorators = {
        id: [{ type: core.Input }],
        name: [{ type: core.Input }],
        checked: [{ type: core.Input }],
        disabled: [{ type: core.Input }],
        value: [{ type: core.Input }],
        checkedIcon: [{ type: core.Input }],
        notCheckedIcon: [{ type: core.Input }],
        change: [{ type: core.Output }]
    };

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
    var AjfCheckboxGroupModule = /** @class */ (function () {
        function AjfCheckboxGroupModule() {
        }
        return AjfCheckboxGroupModule;
    }());
    AjfCheckboxGroupModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [
                        forms.FormsModule,
                    ],
                    declarations: [
                        AjfCheckboxGroup,
                    ],
                    exports: [
                        AjfCheckboxGroup,
                    ]
                },] }
    ];

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
