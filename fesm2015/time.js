import { EventEmitter, Directive, Input } from '@angular/core';
import { Subscription } from 'rxjs';

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/time/time-model.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfTimeModel {
    constructor() {
        this._changed = new EventEmitter();
        this.changed = this._changed.asObservable();
        this._hours = 0;
        this._minutes = 0;
    }
    /**
     * @return {?}
     */
    get minutes() {
        return this._minutes;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set minutes(value) {
        if (value > -1 && value < 61) {
            this._minutes = value;
            this._changed.emit(this.toString());
        }
    }
    /**
     * @return {?}
     */
    get hours() {
        return this._hours;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set hours(value) {
        if (value > -1 && value < 24) {
            this._hours = value;
            this._changed.emit(this.toString());
        }
    }
    /**
     * @return {?}
     */
    toString() {
        /** @type {?} */
        let minutes = this.minutes.toString().length > 1 && this.minutes || `0${this.minutes}`;
        /** @type {?} */
        let hours = this.hours.toString().length > 1 && this.hours || `0${this.hours}`;
        return `${hours}:${minutes}`;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    fromString(value) {
        try {
            /** @type {?} */
            let splitted = value.split(':');
            if (splitted.length == 2) {
                this.hours = parseInt(splitted[0]);
                this.minutes = parseInt(splitted[1]);
            }
        }
        catch (e) {
        }
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    AjfTimeModel.prototype._changed;
    /** @type {?} */
    AjfTimeModel.prototype.changed;
    /**
     * @type {?}
     * @private
     */
    AjfTimeModel.prototype._hours;
    /**
     * @type {?}
     * @private
     */
    AjfTimeModel.prototype._minutes;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/time/time.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
class AjfTime {
    constructor() {
        this._value = new AjfTimeModel();
        this._onChangeCallback = (/**
         * @param {?} _
         * @return {?}
         */
        (_) => { });
        this._onTouchedCallback = (/**
         * @return {?}
         */
        () => { });
        this._valueChangeSub = Subscription.EMPTY;
        this._valueChangeSub = this._value.changed.subscribe((/**
         * @param {?} x
         * @return {?}
         */
        (x) => {
            this._onChangeCallback(x);
        }));
    }
    /**
     * @return {?}
     */
    get time() {
        return this._value;
    }
    /**
     * @return {?}
     */
    get value() {
        return this._value.toString();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set value(value) {
        if (value !== this._value.toString()) {
            this._value.fromString(value);
            this._onChangeCallback(value);
        }
    }
    /**
     * @return {?}
     */
    get hours() {
        return this._value.hours;
    }
    /**
     * @param {?} hours
     * @return {?}
     */
    set hours(hours) {
        this._value.hours = hours;
        this._onChangeCallback(this._value.toString());
    }
    /**
     * @return {?}
     */
    get minutes() {
        return this._value.minutes;
    }
    /**
     * @param {?} minutes
     * @return {?}
     */
    set minutes(minutes) {
        this._value.minutes = minutes;
        this._onChangeCallback(this._value.toString());
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._valueChangeSub.unsubscribe();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        this._value.fromString(value);
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this._onChangeCallback = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this._onTouchedCallback = fn;
    }
    /**
     * @return {?}
     */
    focusHandler() {
        this._onTouchedCallback();
    }
}
AjfTime.decorators = [
    { type: Directive }
];
/** @nocollapse */
AjfTime.ctorParameters = () => [];
AjfTime.propDecorators = {
    readonly: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    AjfTime.prototype.readonly;
    /**
     * @type {?}
     * @private
     */
    AjfTime.prototype._value;
    /**
     * @type {?}
     * @private
     */
    AjfTime.prototype._onChangeCallback;
    /**
     * @type {?}
     * @private
     */
    AjfTime.prototype._onTouchedCallback;
    /**
     * @type {?}
     * @private
     */
    AjfTime.prototype._valueChangeSub;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/time/public-api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * Generated bundle index. Do not edit.
 */

export { AjfTime, AjfTimeModel };
//# sourceMappingURL=time.js.map
