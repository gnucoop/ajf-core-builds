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
import { __extends } from "tslib";
import { AjfBaseFieldComponent } from './base-field';
var AjfFieldWithChoicesComponent = /** @class */ (function (_super) {
    __extends(AjfFieldWithChoicesComponent, _super);
    function AjfFieldWithChoicesComponent(cdr, service, warningAlertService, searchThreshold) {
        var _this = _super.call(this, cdr, service, warningAlertService) || this;
        _this._searchThreshold = 6;
        if (searchThreshold != null) {
            _this._searchThreshold = searchThreshold;
        }
        return _this;
    }
    Object.defineProperty(AjfFieldWithChoicesComponent.prototype, "searchThreshold", {
        get: function () { return this._searchThreshold; },
        enumerable: true,
        configurable: true
    });
    return AjfFieldWithChoicesComponent;
}(AjfBaseFieldComponent));
export { AjfFieldWithChoicesComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGQtd2l0aC1jaG9pY2VzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvZm9ybXMvZmllbGQtd2l0aC1jaG9pY2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRzs7QUFPSCxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFJbkQ7SUFDWSxnREFBcUQ7SUFJL0Qsc0NBQ0UsR0FBc0IsRUFDdEIsT0FBK0IsRUFDL0IsbUJBQTJDLEVBQzNDLGVBQXVCO1FBSnpCLFlBTUUsa0JBQU0sR0FBRyxFQUFFLE9BQU8sRUFBRSxtQkFBbUIsQ0FBQyxTQUl6QztRQWJPLHNCQUFnQixHQUFXLENBQUMsQ0FBQztRQVVuQyxJQUFJLGVBQWUsSUFBSSxJQUFJLEVBQUU7WUFDM0IsS0FBSSxDQUFDLGdCQUFnQixHQUFHLGVBQWUsQ0FBQztTQUN6Qzs7SUFDSCxDQUFDO0lBWkQsc0JBQUkseURBQWU7YUFBbkIsY0FBZ0MsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQWFqRSxtQ0FBQztBQUFELENBQUMsQUFoQkQsQ0FDWSxxQkFBcUIsR0FlaEMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTggR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtDaGFuZ2VEZXRlY3RvclJlZn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7XG4gIEFqZkZpZWxkV2l0aENob2ljZXNJbnN0YW5jZVxufSBmcm9tICcuL2ludGVyZmFjZS9maWVsZHMtaW5zdGFuY2VzL2ZpZWxkLXdpdGgtY2hvaWNlcy1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZkJhc2VGaWVsZENvbXBvbmVudH0gZnJvbSAnLi9iYXNlLWZpZWxkJztcbmltcG9ydCB7QWpmRm9ybVJlbmRlcmVyU2VydmljZX0gZnJvbSAnLi9mb3JtLXJlbmRlcmVyJztcbmltcG9ydCB7QWpmV2FybmluZ0FsZXJ0U2VydmljZX0gZnJvbSAnLi93YXJuaW5nLWFsZXJ0LXNlcnZpY2UnO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQWpmRmllbGRXaXRoQ2hvaWNlc0NvbXBvbmVudDxUPlxuICAgIGV4dGVuZHMgQWpmQmFzZUZpZWxkQ29tcG9uZW50PEFqZkZpZWxkV2l0aENob2ljZXNJbnN0YW5jZTxUPj4ge1xuICBwcml2YXRlIF9zZWFyY2hUaHJlc2hvbGQ6IG51bWJlciA9IDY7XG4gIGdldCBzZWFyY2hUaHJlc2hvbGQoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX3NlYXJjaFRocmVzaG9sZDsgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgc2VydmljZTogQWpmRm9ybVJlbmRlcmVyU2VydmljZSxcbiAgICB3YXJuaW5nQWxlcnRTZXJ2aWNlOiBBamZXYXJuaW5nQWxlcnRTZXJ2aWNlLFxuICAgIHNlYXJjaFRocmVzaG9sZDogbnVtYmVyXG4gICkge1xuICAgIHN1cGVyKGNkciwgc2VydmljZSwgd2FybmluZ0FsZXJ0U2VydmljZSk7XG4gICAgaWYgKHNlYXJjaFRocmVzaG9sZCAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9zZWFyY2hUaHJlc2hvbGQgPSBzZWFyY2hUaHJlc2hvbGQ7XG4gICAgfVxuICB9XG59XG4iXX0=