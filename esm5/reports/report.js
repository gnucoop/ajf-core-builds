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
import { ChangeDetectorRef, Directive, Input } from '@angular/core';
var AjfReportRenderer = /** @class */ (function () {
    function AjfReportRenderer(_cdr) {
        this._cdr = _cdr;
    }
    Object.defineProperty(AjfReportRenderer.prototype, "instance", {
        get: function () { return this._instance; },
        set: function (instance) {
            this._instance = instance;
            this._report = instance != null ? instance.report : null;
            this._cdr.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfReportRenderer.prototype, "report", {
        get: function () {
            return this._report;
        },
        enumerable: true,
        configurable: true
    });
    AjfReportRenderer.decorators = [
        { type: Directive }
    ];
    /** @nocollapse */
    AjfReportRenderer.ctorParameters = function () { return [
        { type: ChangeDetectorRef }
    ]; };
    AjfReportRenderer.propDecorators = {
        instance: [{ type: Input }]
    };
    return AjfReportRenderer;
}());
export { AjfReportRenderer };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwb3J0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvcmVwb3J0cy9yZXBvcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUFDLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFLbEU7SUFlRSwyQkFBb0IsSUFBdUI7UUFBdkIsU0FBSSxHQUFKLElBQUksQ0FBbUI7SUFBSSxDQUFDO0lBWmhELHNCQUFJLHVDQUFRO2FBQVosY0FBb0MsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzthQUM1RCxVQUFzQixRQUEyQjtZQUMvQyxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztZQUMxQixJQUFJLENBQUMsT0FBTyxHQUFHLFFBQVEsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUN6RCxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQzNCLENBQUM7OztPQUwyRDtJQVE1RCxzQkFBSSxxQ0FBTTthQUFWO1lBQ0UsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ3RCLENBQUM7OztPQUFBOztnQkFiRixTQUFTOzs7O2dCQUxGLGlCQUFpQjs7OzJCQVN0QixLQUFLOztJQVlSLHdCQUFDO0NBQUEsQUFoQkQsSUFnQkM7U0FmcUIsaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0NoYW5nZURldGVjdG9yUmVmLCBEaXJlY3RpdmUsIElucHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtBamZSZXBvcnRJbnN0YW5jZX0gZnJvbSAnLi9pbnRlcmZhY2UvcmVwb3J0cy1pbnN0YW5jZXMvcmVwb3J0LWluc3RhbmNlJztcbmltcG9ydCB7QWpmUmVwb3J0fSBmcm9tICcuL2ludGVyZmFjZS9yZXBvcnRzL3JlcG9ydCc7XG5cbkBEaXJlY3RpdmUoKVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFqZlJlcG9ydFJlbmRlcmVyIHtcbiAgcHJpdmF0ZSBfaW5zdGFuY2U6IEFqZlJlcG9ydEluc3RhbmNlO1xuICBnZXQgaW5zdGFuY2UoKTogQWpmUmVwb3J0SW5zdGFuY2UgeyByZXR1cm4gdGhpcy5faW5zdGFuY2U7IH1cbiAgQElucHV0KCkgc2V0IGluc3RhbmNlKGluc3RhbmNlOiBBamZSZXBvcnRJbnN0YW5jZSkge1xuICAgIHRoaXMuX2luc3RhbmNlID0gaW5zdGFuY2U7XG4gICAgdGhpcy5fcmVwb3J0ID0gaW5zdGFuY2UgIT0gbnVsbCA/IGluc3RhbmNlLnJlcG9ydCA6IG51bGw7XG4gICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVwb3J0OiBBamZSZXBvcnQgfCBudWxsO1xuICBnZXQgcmVwb3J0KCk6IEFqZlJlcG9ydCB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLl9yZXBvcnQ7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9jZHI6IENoYW5nZURldGVjdG9yUmVmKSB7IH1cbn1cbiJdfQ==