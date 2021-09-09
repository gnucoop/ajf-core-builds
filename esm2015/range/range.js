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
import { AJF_WARNING_ALERT_SERVICE, AjfBaseFieldComponent, AjfFormRendererService } from '@ajf/core/forms';
import { ChangeDetectorRef, Directive, Inject, Input } from '@angular/core';
export class AjfRange extends AjfBaseFieldComponent {
    constructor(cdr, service, was) {
        super(cdr, service, was);
        this.cdr = cdr;
        this._end = 10;
        this._name = '';
        this._onChangeCallback = (_) => { };
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
AjfRange.decorators = [
    { type: Directive }
];
AjfRange.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: AjfFormRendererService },
    { type: undefined, decorators: [{ type: Inject, args: [AJF_WARNING_ALERT_SERVICE,] }] }
];
AjfRange.propDecorators = {
    end: [{ type: Input }],
    name: [{ type: Input }],
    start: [{ type: Input }],
    step: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFuZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9yYW5nZS9yYW5nZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQ0wseUJBQXlCLEVBQ3pCLHFCQUFxQixFQUNyQixzQkFBc0IsRUFHdkIsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQUMsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQVMsTUFBTSxlQUFlLENBQUM7QUFJbEYsTUFBTSxPQUFnQixRQUFTLFNBQVEscUJBQTRDO0lBWWpGLFlBQ1csR0FBc0IsRUFBRSxPQUErQixFQUMzQixHQUEyQjtRQUNoRSxLQUFLLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQztRQUZoQixRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQVh6QixTQUFJLEdBQVcsRUFBRSxDQUFDO1FBQ2xCLFVBQUssR0FBVyxFQUFFLENBQUM7UUFDbkIsc0JBQWlCLEdBQXlCLENBQUMsQ0FBQyxFQUFFLEVBQUUsR0FBRSxDQUFDLENBQUM7UUFFcEQsdUJBQWtCLEdBQWUsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFDO1FBRTFDLFdBQU0sR0FBVyxDQUFDLENBQUM7UUFDbkIsVUFBSyxHQUFXLENBQUMsQ0FBQztRQUNsQixXQUFNLEdBQVcsQ0FBQyxDQUFDO0lBTTNCLENBQUM7SUFFRCxJQUFJLEdBQUc7UUFDTCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDbkIsQ0FBQztJQUNELElBQ0ksR0FBRyxDQUFDLE1BQXdCO1FBQzlCLElBQUksTUFBTSxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLE1BQU0sRUFBRTtZQUN6QyxJQUFJLENBQUMsSUFBSSxHQUFHLE1BQWdCLENBQUM7WUFDN0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFh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S0FBSyxDQUFDO0lBQ3JCLENBQUM7OztZQTVHRixTQUFTOzs7WUFIRixpQkFBaUI7WUFKdkIsc0JBQXNCOzRDQXNCakIsTUFBTSxTQUFDLHlCQUF5Qjs7O2tCQU9wQyxLQUFLO21CQVdMLEtBQUs7b0JBV0wsS0FBSzttQkFXTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge1xuICBBSkZfV0FSTklOR19BTEVSVF9TRVJWSUNFLFxuICBBamZCYXNlRmllbGRDb21wb25lbnQsXG4gIEFqZkZvcm1SZW5kZXJlclNlcnZpY2UsXG4gIEFqZlJhbmdlRmllbGRJbnN0YW5jZSxcbiAgQWpmV2FybmluZ0FsZXJ0U2VydmljZVxufSBmcm9tICdAYWpmL2NvcmUvZm9ybXMnO1xuaW1wb3J0IHtDaGFuZ2VEZXRlY3RvclJlZiwgRGlyZWN0aXZlLCBJbmplY3QsIElucHV0LCBPbkluaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb250cm9sVmFsdWVBY2Nlc3Nvcn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5ARGlyZWN0aXZlKClcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBamZSYW5nZSBleHRlbmRzIEFqZkJhc2VGaWVsZENvbXBvbmVudDxBamZSYW5nZUZpZWxkSW5zdGFuY2U+IGltcGxlbWVudHNcbiAgICBDb250cm9sVmFsdWVBY2Nlc3NvciwgT25Jbml0IHtcbiAgcHJpdmF0ZSBfZW5kOiBudW1iZXIgPSAxMDtcbiAgcHJpdmF0ZSBfbmFtZTogc3RyaW5nID0gJyc7XG4gIHByaXZhdGUgX29uQ2hhbmdlQ2FsbGJhY2s6ICh2YWx1ZTogYW55KSA9PiB2b2lkID0gKF8pID0+IHt9O1xuXG4gIHByaXZhdGUgX29uVG91Y2hlZENhbGxiYWNrOiAoKSA9PiB2b2lkID0gKCkgPT4ge307XG5cbiAgcHJpdmF0ZSBfc3RhcnQ6IG51bWJlciA9IDE7XG4gIHByaXZhdGUgX3N0ZXA6IG51bWJlciA9IDE7XG4gIHByaXZhdGUgX3ZhbHVlOiBudW1iZXIgPSAxO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHVibGljIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsIHNlcnZpY2U6IEFqZkZvcm1SZW5kZXJlclNlcnZpY2UsXG4gICAgICBASW5qZWN0KEFKRl9XQVJOSU5HX0FMRVJUX1NFUlZJQ0UpIHdhczogQWpmV2FybmluZ0FsZXJ0U2VydmljZSkge1xuICAgIHN1cGVyKGNkciwgc2VydmljZSwgd2FzKTtcbiAgfVxuXG4gIGdldCBlbmQoKTogbnVtYmVyfHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuX2VuZDtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgZW5kKG5ld0VuZDogbnVtYmVyfHVuZGVmaW5lZCkge1xuICAgIGlmIChuZXdFbmQgIT0gbnVsbCAmJiB0aGlzLl9lbmQgIT0gbmV3RW5kKSB7XG4gICAgICB0aGlzLl9lbmQgPSBuZXdFbmQgYXMgbnVtYmVyO1xuICAgICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBuYW1lKCk6IHN0cmluZ3x1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLl9uYW1lO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBuYW1lKG5ld05hbWU6IHN0cmluZ3x1bmRlZmluZWQpIHtcbiAgICBpZiAobmV3TmFtZSAhPSBudWxsICYmIHRoaXMuX25hbWUgIT0gbmV3TmFtZSkge1xuICAgICAgdGhpcy5fbmFtZSA9IG5ld05hbWU7XG4gICAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IHN0YXJ0KCk6IG51bWJlcnx1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLl9zdGFydDtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgc3RhcnQobmV3U3RhcnQ6IG51bWJlcnx1bmRlZmluZWQpIHtcbiAgICBpZiAobmV3U3RhcnQgIT0gbnVsbCAmJiB0aGlzLl9zdGFydCAhPSBuZXdTdGFydCkge1xuICAgICAgdGhpcy5fc3RhcnQgPSBuZXdTdGFydDtcbiAgICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG4gIH1cblxuICBnZXQgc3RlcCgpOiBudW1iZXJ8dW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5fc3RlcDtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgc3RlcChuZXdTdGVwOiBudW1iZXJ8dW5kZWZpbmVkKSB7XG4gICAgaWYgKG5ld1N0ZXAgIT0gbnVsbCAmJiB0aGlzLl9zdGVwICE9PSBuZXdTdGVwKSB7XG4gICAgICB0aGlzLl9zdGVwID0gbmV3U3RlcDtcbiAgICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG4gIH1cblxuICBnZXQgdmFsdWUoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gIH1cblxuICBzZXQgdmFsdWUobmV3VmFsdWU6IG51bWJlcikge1xuICAgIGlmICh0aGlzLl92YWx1ZSAhPT0gbmV3VmFsdWUpIHtcbiAgICAgIHRoaXMuX3ZhbHVlID0gbmV3VmFsdWU7XG4gICAgICB0aGlzLl9vbkNoYW5nZUNhbGxiYWNrKG5ld1ZhbHVlKTtcbiAgICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5pbnN0YW5jZSAhPSBudWxsICYmIHRoaXMuaW5zdGFuY2Uubm9kZSAhPSBudWxsKSB7XG4gICAgICBjb25zdCBub2RlID0gdGhpcy5pbnN0YW5jZS5ub2RlO1xuICAgICAgaWYgKG5vZGUuZW5kICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5lbmQgPSBub2RlLmVuZDtcbiAgICAgIH1cbiAgICAgIGlmIChub2RlLnN0YXJ0ICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5zdGFydCA9IG5vZGUuc3RhcnQ7XG4gICAgICB9XG4gICAgICBpZiAobm9kZS5zdGVwICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5zdGVwID0gbm9kZS5zdGVwO1xuICAgICAgfVxuICAgICAgaWYgKG5vZGUubmFtZSAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5vZGUubmFtZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAodmFsdWU6IGFueSkgPT4gdm9pZCk6IHZvaWQge1xuICAgIHRoaXMuX29uQ2hhbmdlQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiAoKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgdGhpcy5fb25Ub3VjaGVkQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIHJlc2V0KCk6IHZvaWQge1xuICAgIHRoaXMudmFsdWUgPSAwO1xuICAgIHRoaXMuX29uVG91Y2hlZENhbGxiYWNrKCk7XG4gIH1cblxuICB3cml0ZVZhbHVlKHZhbHVlOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gIH1cbn1cbiJdfQ==