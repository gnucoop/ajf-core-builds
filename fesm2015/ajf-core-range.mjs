import * as i1 from '@ajf/core/forms';
import { AjfBaseFieldComponent, AJF_WARNING_ALERT_SERVICE } from '@ajf/core/forms';
import * as i0 from '@angular/core';
import { Directive, Inject, Input } from '@angular/core';

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
class AjfRange extends AjfBaseFieldComponent {
    constructor(cdr, service, was) {
        super(cdr, service, was);
        this.cdr = cdr;
        this._end = 10;
        this._name = '';
        this._onChangeCallback = _ => { };
        this._onTouchedCallback = () => { };
        this._start = 1;
        this._step = 1;
        this._value = 1;
    }
    get end() {
        return this._end;
    }
    set end(newEnd) {
        if (newEnd != null && this._end != newEnd) {
            this._end = newEnd;
            this.cdr.detectChanges();
        }
    }
    get name() {
        return this._name;
    }
    set name(newName) {
        if (newName != null && this._name != newName) {
            this._name = newName;
            this.cdr.detectChanges();
        }
    }
    get start() {
        return this._start;
    }
    set start(newStart) {
        if (newStart != null && this._start != newStart) {
            this._start = newStart;
            this.cdr.detectChanges();
        }
    }
    get step() {
        return this._step;
    }
    set step(newStep) {
        if (newStep != null && this._step !== newStep) {
            this._step = newStep;
            this.cdr.detectChanges();
        }
    }
    get value() {
        return this._value;
    }
    set value(newValue) {
        if (this._value !== newValue) {
            this._value = newValue;
            this._onChangeCallback(newValue);
            this.cdr.detectChanges();
        }
    }
    ngOnInit() {
        super.ngOnInit();
        if (this.instance != null && this.instance.node != null) {
            const node = this.instance.node;
            if (node.end != null) {
                this.end = node.end;
            }
            if (node.start != null) {
                this.start = node.start;
            }
            if (node.step != null) {
                this.step = node.step;
            }
            if (node.name != null) {
                this.name = node.name;
            }
        }
    }
    registerOnChange(fn) {
        this._onChangeCallback = fn;
    }
    registerOnTouched(fn) {
        this._onTouchedCallback = fn;
    }
    reset() {
        this.value = 0;
        this._onTouchedCallback();
    }
    writeValue(value) {
        this.value = value;
    }
}
AjfRange.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfRange, deps: [{ token: i0.ChangeDetectorRef }, { token: i1.AjfFormRendererService }, { token: AJF_WARNING_ALERT_SERVICE }], target: i0.ɵɵFactoryTarget.Directive });
AjfRange.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.2.5", type: AjfRange, inputs: { end: "end", name: "name", start: "start", step: "step" }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfRange, decorators: [{
            type: Directive
        }], ctorParameters: function () {
        return [{ type: i0.ChangeDetectorRef }, { type: i1.AjfFormRendererService }, { type: undefined, decorators: [{
                        type: Inject,
                        args: [AJF_WARNING_ALERT_SERVICE]
                    }] }];
    }, propDecorators: { end: [{
                type: Input
            }], name: [{
                type: Input
            }], start: [{
                type: Input
            }], step: [{
                type: Input
            }] } });

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

export { AjfRange };
//# sourceMappingURL=ajf-core-range.mjs.map
