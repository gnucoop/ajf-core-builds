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
import { __extends } from "tslib";
var AjfError = /** @class */ (function (_super) {
    __extends(AjfError, _super);
    /**
     * this constructor will init the message error
     */
    function AjfError(message) {
        var _this = _super.call(this, message) || this;
        // Set the prototype explicitly. Workaround needed in TS >= 2.1 when extending built-ins
        // See: https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md
        Object.setPrototypeOf(_this, AjfError.prototype);
        _this._message = message || '';
        return _this;
    }
    Object.defineProperty(AjfError.prototype, "name", {
        get: function () { return 'AjfError'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfError.prototype, "message", {
        get: function () { return this._message; },
        enumerable: true,
        configurable: true
    });
    return AjfError;
}(Error));
export { AjfError };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9tb2RlbHMvZXJyb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHOztBQUVIO0lBQThCLDRCQUFLO0lBTWpDOztPQUVHO0lBQ0gsa0JBQVksT0FBZ0I7UUFBNUIsWUFDRSxrQkFBTSxPQUFPLENBQUMsU0FPZjtRQUxDLHdGQUF3RjtRQUN4RixvRkFBb0Y7UUFDcEYsTUFBTSxDQUFDLGNBQWMsQ0FBQyxLQUFJLEVBQUUsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRWhELEtBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxJQUFJLEVBQUUsQ0FBQzs7SUFDaEMsQ0FBQztJQWZELHNCQUFJLDBCQUFJO2FBQVIsY0FBcUIsT0FBTyxVQUFVLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQUN6QyxzQkFBSSw2QkFBTzthQUFYLGNBQXdCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7OztPQUFBO0lBZWpELGVBQUM7QUFBRCxDQUFDLEFBbEJELENBQThCLEtBQUssR0FrQmxDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5leHBvcnQgY2xhc3MgQWpmRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gIHN0YWNrOiBzdHJpbmc7XG4gIGdldCBuYW1lKCk6IHN0cmluZyB7IHJldHVybiAnQWpmRXJyb3InOyB9XG4gIGdldCBtZXNzYWdlKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLl9tZXNzYWdlOyB9XG4gIC8vIHRoaXMgcHJpdmF0ZSBzdHJpbmcgaXMgdGhlIGVycm9yIG1lc3NhZ2VcbiAgcHJpdmF0ZSBfbWVzc2FnZTogc3RyaW5nO1xuICAvKipcbiAgICogdGhpcyBjb25zdHJ1Y3RvciB3aWxsIGluaXQgdGhlIG1lc3NhZ2UgZXJyb3JcbiAgICovXG4gIGNvbnN0cnVjdG9yKG1lc3NhZ2U/OiBzdHJpbmcpIHtcbiAgICBzdXBlcihtZXNzYWdlKTtcblxuICAgIC8vIFNldCB0aGUgcHJvdG90eXBlIGV4cGxpY2l0bHkuIFdvcmthcm91bmQgbmVlZGVkIGluIFRTID49IDIuMSB3aGVuIGV4dGVuZGluZyBidWlsdC1pbnNcbiAgICAvLyBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9NaWNyb3NvZnQvVHlwZVNjcmlwdC13aWtpL2Jsb2IvbWFzdGVyL0JyZWFraW5nLUNoYW5nZXMubWRcbiAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YodGhpcywgQWpmRXJyb3IucHJvdG90eXBlKTtcblxuICAgIHRoaXMuX21lc3NhZ2UgPSBtZXNzYWdlIHx8ICcnO1xuICB9XG59XG4iXX0=