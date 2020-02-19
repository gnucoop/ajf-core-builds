import { EventEmitter, Directive, Input } from '@angular/core';
import { Subscription } from 'rxjs';

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
var AjfTimeModel = /** @class */ (function () {
    function AjfTimeModel() {
        this._changed = new EventEmitter();
        this.changed = this._changed.asObservable();
        this._hours = 0;
        this._minutes = 0;
    }
    Object.defineProperty(AjfTimeModel.prototype, "minutes", {
        get: function () {
            return this._minutes;
        },
        set: function (value) {
            if (value > -1 && value < 61) {
                this._minutes = value;
                this._changed.emit(this.toString());
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfTimeModel.prototype, "hours", {
        get: function () {
            return this._hours;
        },
        set: function (value) {
            if (value > -1 && value < 24) {
                this._hours = value;
                this._changed.emit(this.toString());
            }
        },
        enumerable: true,
        configurable: true
    });
    AjfTimeModel.prototype.toString = function () {
        var minutes = this.minutes.toString().length > 1 && this.minutes || "0" + this.minutes;
        var hours = this.hours.toString().length > 1 && this.hours || "0" + this.hours;
        return hours + ":" + minutes;
    };
    AjfTimeModel.prototype.fromString = function (value) {
        try {
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
var AjfTime = /** @class */ (function () {
    function AjfTime() {
        var _this = this;
        this._value = new AjfTimeModel();
        this._onChangeCallback = function (_) { };
        this._onTouchedCallback = function () { };
        this._valueChangeSub = Subscription.EMPTY;
        this._valueChangeSub = this._value.changed
            .subscribe(function (x) {
            _this._onChangeCallback(x);
        });
    }
    Object.defineProperty(AjfTime.prototype, "time", {
        get: function () {
            return this._value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfTime.prototype, "value", {
        get: function () {
            return this._value.toString();
        },
        set: function (value) {
            if (value !== this._value.toString()) {
                this._value.fromString(value);
                this._onChangeCallback(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfTime.prototype, "hours", {
        get: function () { return this._value.hours; },
        set: function (hours) {
            this._value.hours = hours;
            this._onChangeCallback(this._value.toString());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfTime.prototype, "minutes", {
        get: function () { return this._value.minutes; },
        set: function (minutes) {
            this._value.minutes = minutes;
            this._onChangeCallback(this._value.toString());
        },
        enumerable: true,
        configurable: true
    });
    AjfTime.prototype.ngOnDestroy = function () {
        this._valueChangeSub.unsubscribe();
    };
    AjfTime.prototype.writeValue = function (value) {
        this._value.fromString(value);
    };
    AjfTime.prototype.registerOnChange = function (fn) {
        this._onChangeCallback = fn;
    };
    AjfTime.prototype.registerOnTouched = function (fn) {
        this._onTouchedCallback = fn;
    };
    AjfTime.prototype.focusHandler = function () {
        this._onTouchedCallback();
    };
    AjfTime.decorators = [
        { type: Directive }
    ];
    /** @nocollapse */
    AjfTime.ctorParameters = function () { return []; };
    AjfTime.propDecorators = {
        readonly: [{ type: Input }]
    };
    return AjfTime;
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

export { AjfTime, AjfTimeModel };
//# sourceMappingURL=time.js.map
