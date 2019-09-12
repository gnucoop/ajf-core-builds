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
import { EventEmitter, forwardRef, Component, ViewEncapsulation, ChangeDetectionStrategy, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AjfTimeModel = /** @class */ (function () {
    function AjfTimeModel() {
        this._hours = 0;
        this._minutes = 0;
        this.changed = new EventEmitter();
    }
    Object.defineProperty(AjfTimeModel.prototype, "minutes", {
        get: /**
         * @return {?}
         */
        function () {
            return this._minutes;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value > -1 && value < 61) {
                this._minutes = value;
                this.changed.emit(this.toString());
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfTimeModel.prototype, "hours", {
        get: /**
         * @return {?}
         */
        function () {
            return this._hours;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value > -1 && value < 24) {
                this._hours = value;
                this.changed.emit(this.toString());
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    AjfTimeModel.prototype.toString = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var minutes = this.minutes.toString().length > 1 && this.minutes || "0" + this.minutes;
        /** @type {?} */
        var hours = this.hours.toString().length > 1 && this.hours || "0" + this.hours;
        return hours + ":" + minutes;
    };
    /**
     * @param {?} value
     * @return {?}
     */
    AjfTimeModel.prototype.fromString = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        try {
            /** @type {?} */
            var splitted = value.split(':');
            if (splitted.length == 2) {
                this.hours = parseInt(splitted[0]);
                this.minutes = parseInt(splitted[1]);
            }
        }
        catch (e) {
        }
    };
    return AjfTimeModel;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var AJF_TIME_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef((/**
     * @return {?}
     */
    function () { return AjfTime; })),
    multi: true
};
var AjfTime = /** @class */ (function () {
    function AjfTime() {
        var _this = this;
        this._value = new AjfTimeModel();
        this._onChangeCallback = (/**
         * @param {?} _
         * @return {?}
         */
        function (_) { });
        this._onTouchedCallback = (/**
         * @return {?}
         */
        function () { });
        this._value.changed
            .subscribe((/**
         * @param {?} x
         * @return {?}
         */
        function (x) {
            _this._onChangeCallback(x);
        }));
    }
    Object.defineProperty(AjfTime.prototype, "time", {
        get: /**
         * @return {?}
         */
        function () {
            return this._value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfTime.prototype, "value", {
        get: /**
         * @return {?}
         */
        function () {
            return this._value.toString();
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value !== this._value.toString()) {
                this._value.fromString(value);
                this._onChangeCallback(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfTime.prototype, "hours", {
        get: /**
         * @return {?}
         */
        function () { return this._value.hours; },
        set: /**
         * @param {?} hours
         * @return {?}
         */
        function (hours) {
            this._value.hours = hours;
            this._onChangeCallback(this._value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfTime.prototype, "minutes", {
        get: /**
         * @return {?}
         */
        function () { return this._value.minutes; },
        set: /**
         * @param {?} minutes
         * @return {?}
         */
        function (minutes) {
            this._value.minutes = minutes;
            this._onChangeCallback(this._value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} value
     * @return {?}
     */
    AjfTime.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this._value.fromString(value);
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    AjfTime.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this._onChangeCallback = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    AjfTime.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this._onTouchedCallback = fn;
    };
    /**
     * @return {?}
     */
    AjfTime.prototype.focusHandler = /**
     * @return {?}
     */
    function () {
        this._onTouchedCallback();
    };
    AjfTime.decorators = [
        { type: Component, args: [{selector: 'ajf-time',
                    template: "<div><input min=\"0\" max=\"24\" (focus)=\"focusHandler()\" [(ngModel)]=\"hours\" type=\"number\" (ngModelChange)=\"hours = $event\"> <input min=\"0\" max=\"60\" (focus)=\"focusHandler()\" [(ngModel)]=\"minutes\" type=\"number\" (ngModelChange)=\"minutes = $event\"></div>",
                    styles: [""],
                    providers: [AJF_TIME_CONTROL_VALUE_ACCESSOR],
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    AjfTime.ctorParameters = function () { return []; };
    return AjfTime;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AjfTimeModule = /** @class */ (function () {
    function AjfTimeModule() {
    }
    AjfTimeModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        FormsModule,
                    ],
                    declarations: [
                        AjfTime,
                    ],
                    exports: [
                        AjfTime,
                    ]
                },] },
    ];
    return AjfTimeModule;
}());

export { AJF_TIME_CONTROL_VALUE_ACCESSOR, AjfTime, AjfTimeModel, AjfTimeModule };
//# sourceMappingURL=time.es5.js.map