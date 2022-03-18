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
import { AJF_WARNING_ALERT_SERVICE, AjfBaseFieldComponent, } from '@ajf/core/forms';
import { Directive, Inject, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@ajf/core/forms";
export class AjfRange extends AjfBaseFieldComponent {
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
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i1.AjfFormRendererService }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [AJF_WARNING_ALERT_SERVICE]
                }] }]; }, propDecorators: { end: [{
                type: Input
            }], name: [{
                type: Input
            }], start: [{
                type: Input
            }], step: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFuZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL3JhbmdlL3NyYy9yYW5nZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQ0wseUJBQXlCLEVBQ3pCLHFCQUFxQixHQUl0QixNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBb0IsU0FBUyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQVMsTUFBTSxlQUFlLENBQUM7OztBQUlsRixNQUFNLE9BQWdCLFFBQ3BCLFNBQVEscUJBQTRDO0lBYXBELFlBQ1MsR0FBc0IsRUFDN0IsT0FBK0IsRUFDSSxHQUEyQjtRQUU5RCxLQUFLLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQztRQUpsQixRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQVh2QixTQUFJLEdBQVcsRUFBRSxDQUFDO1FBQ2xCLFVBQUssR0FBVyxFQUFFLENBQUM7UUFDbkIsc0JBQWlCLEdBQXlCLENBQUMsQ0FBQyxFQUFFLEdBQUUsQ0FBQyxDQUFDO1FBRWxELHVCQUFrQixHQUFlLEdBQUcsRUFBRSxHQUFFLENBQUMsQ0FBQztRQUUxQyxXQUFNLEdBQVcsQ0FBQyxDQUFDO1FBQ25CLFVBQUssR0FBVyxDQUFDLENBQUM7UUFDbEIsV0FBTSxHQUFXLENBQUMsQ0FBQztJQVEzQixDQUFDO0lBRUQsSUFBSSxHQUFHO1FBQ0wsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ25CLENBQUM7SUFDRCxJQUNJLEdBQUcsQ0FBQyxNQUEwQjtRQUNoQyxJQUFJLE1BQU0sSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxNQUFNLEVBQUU7WUFDekMsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFnQixDQUFDO1lBQzdCLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDMUI7SUFDSCxD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QUssR0FBRyxLQUFLLENBQUM7SUFDckIsQ0FBQzs7cUdBaEhtQixRQUFRLHlGQWlCbEIseUJBQXlCO3lGQWpCZixRQUFROzJGQUFSLFFBQVE7a0JBRDdCLFNBQVM7OzBCQWtCTCxNQUFNOzJCQUFDLHlCQUF5Qjs0Q0FTL0IsR0FBRztzQkFETixLQUFLO2dCQVlGLElBQUk7c0JBRFAsS0FBSztnQkFZRixLQUFLO3NCQURSLEtBQUs7Z0JBWUYsSUFBSTtzQkFEUCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge1xuICBBSkZfV0FSTklOR19BTEVSVF9TRVJWSUNFLFxuICBBamZCYXNlRmllbGRDb21wb25lbnQsXG4gIEFqZkZvcm1SZW5kZXJlclNlcnZpY2UsXG4gIEFqZlJhbmdlRmllbGRJbnN0YW5jZSxcbiAgQWpmV2FybmluZ0FsZXJ0U2VydmljZSxcbn0gZnJvbSAnQGFqZi9jb3JlL2Zvcm1zJztcbmltcG9ydCB7Q2hhbmdlRGV0ZWN0b3JSZWYsIERpcmVjdGl2ZSwgSW5qZWN0LCBJbnB1dCwgT25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29udHJvbFZhbHVlQWNjZXNzb3J9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuQERpcmVjdGl2ZSgpXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQWpmUmFuZ2VcbiAgZXh0ZW5kcyBBamZCYXNlRmllbGRDb21wb25lbnQ8QWpmUmFuZ2VGaWVsZEluc3RhbmNlPlxuICBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBPbkluaXRcbntcbiAgcHJpdmF0ZSBfZW5kOiBudW1iZXIgPSAxMDtcbiAgcHJpdmF0ZSBfbmFtZTogc3RyaW5nID0gJyc7XG4gIHByaXZhdGUgX29uQ2hhbmdlQ2FsbGJhY2s6ICh2YWx1ZTogYW55KSA9PiB2b2lkID0gXyA9PiB7fTtcblxuICBwcml2YXRlIF9vblRvdWNoZWRDYWxsYmFjazogKCkgPT4gdm9pZCA9ICgpID0+IHt9O1xuXG4gIHByaXZhdGUgX3N0YXJ0OiBudW1iZXIgPSAxO1xuICBwcml2YXRlIF9zdGVwOiBudW1iZXIgPSAxO1xuICBwcml2YXRlIF92YWx1ZTogbnVtYmVyID0gMTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBzZXJ2aWNlOiBBamZGb3JtUmVuZGVyZXJTZXJ2aWNlLFxuICAgIEBJbmplY3QoQUpGX1dBUk5JTkdfQUxFUlRfU0VSVklDRSkgd2FzOiBBamZXYXJuaW5nQWxlcnRTZXJ2aWNlLFxuICApIHtcbiAgICBzdXBlcihjZHIsIHNlcnZpY2UsIHdhcyk7XG4gIH1cblxuICBnZXQgZW5kKCk6IG51bWJlciB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuX2VuZDtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgZW5kKG5ld0VuZDogbnVtYmVyIHwgdW5kZWZpbmVkKSB7XG4gICAgaWYgKG5ld0VuZCAhPSBudWxsICYmIHRoaXMuX2VuZCAhPSBuZXdFbmQpIHtcbiAgICAgIHRoaXMuX2VuZCA9IG5ld0VuZCBhcyBudW1iZXI7XG4gICAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IG5hbWUoKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5fbmFtZTtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgbmFtZShuZXdOYW1lOiBzdHJpbmcgfCB1bmRlZmluZWQpIHtcbiAgICBpZiAobmV3TmFtZSAhPSBudWxsICYmIHRoaXMuX25hbWUgIT0gbmV3TmFtZSkge1xuICAgICAgdGhpcy5fbmFtZSA9IG5ld05hbWU7XG4gICAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IHN0YXJ0KCk6IG51bWJlciB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuX3N0YXJ0O1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBzdGFydChuZXdTdGFydDogbnVtYmVyIHwgdW5kZWZpbmVkKSB7XG4gICAgaWYgKG5ld1N0YXJ0ICE9IG51bGwgJiYgdGhpcy5fc3RhcnQgIT0gbmV3U3RhcnQpIHtcbiAgICAgIHRoaXMuX3N0YXJ0ID0gbmV3U3RhcnQ7XG4gICAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IHN0ZXAoKTogbnVtYmVyIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5fc3RlcDtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgc3RlcChuZXdTdGVwOiBudW1iZXIgfCB1bmRlZmluZWQpIHtcbiAgICBpZiAobmV3U3RlcCAhPSBudWxsICYmIHRoaXMuX3N0ZXAgIT09IG5ld1N0ZXApIHtcbiAgICAgIHRoaXMuX3N0ZXAgPSBuZXdTdGVwO1xuICAgICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH1cbiAgfVxuXG4gIGdldCB2YWx1ZSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgfVxuXG4gIHNldCB2YWx1ZShuZXdWYWx1ZTogbnVtYmVyKSB7XG4gICAgaWYgKHRoaXMuX3ZhbHVlICE9PSBuZXdWYWx1ZSkge1xuICAgICAgdGhpcy5fdmFsdWUgPSBuZXdWYWx1ZTtcbiAgICAgIHRoaXMuX29uQ2hhbmdlQ2FsbGJhY2sobmV3VmFsdWUpO1xuICAgICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH1cbiAgfVxuXG4gIG92ZXJyaWRlIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHN1cGVyLm5nT25Jbml0KCk7XG4gICAgaWYgKHRoaXMuaW5zdGFuY2UgIT0gbnVsbCAmJiB0aGlzLmluc3RhbmNlLm5vZGUgIT0gbnVsbCkge1xuICAgICAgY29uc3Qgbm9kZSA9IHRoaXMuaW5zdGFuY2Uubm9kZTtcbiAgICAgIGlmIChub2RlLmVuZCAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMuZW5kID0gbm9kZS5lbmQ7XG4gICAgICB9XG4gICAgICBpZiAobm9kZS5zdGFydCAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMuc3RhcnQgPSBub2RlLnN0YXJ0O1xuICAgICAgfVxuICAgICAgaWYgKG5vZGUuc3RlcCAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMuc3RlcCA9IG5vZGUuc3RlcDtcbiAgICAgIH1cbiAgICAgIGlmIChub2RlLm5hbWUgIT0gbnVsbCkge1xuICAgICAgICB0aGlzLm5hbWUgPSBub2RlLm5hbWU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKHZhbHVlOiBhbnkpID0+IHZvaWQpOiB2b2lkIHtcbiAgICB0aGlzLl9vbkNoYW5nZUNhbGxiYWNrID0gZm47XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4gdm9pZCk6IHZvaWQge1xuICAgIHRoaXMuX29uVG91Y2hlZENhbGxiYWNrID0gZm47XG4gIH1cblxuICByZXNldCgpOiB2b2lkIHtcbiAgICB0aGlzLnZhbHVlID0gMDtcbiAgICB0aGlzLl9vblRvdWNoZWRDYWxsYmFjaygpO1xuICB9XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICB9XG59XG4iXX0=