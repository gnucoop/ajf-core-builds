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
        get: function () {
            return this._searchThreshold;
        },
        enumerable: true,
        configurable: true
    });
    return AjfFieldWithChoicesComponent;
}(AjfBaseFieldComponent));
export { AjfFieldWithChoicesComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGQtd2l0aC1jaG9pY2VzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvZm9ybXMvZmllbGQtd2l0aC1jaG9pY2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRzs7QUFJSCxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFPbkQ7SUFDSSxnREFBcUQ7SUFNdkQsc0NBQ0ksR0FBc0IsRUFBRSxPQUErQixFQUN2RCxtQkFBMkMsRUFBRSxlQUF1QjtRQUZ4RSxZQUdFLGtCQUFNLEdBQUcsRUFBRSxPQUFPLEVBQUUsbUJBQW1CLENBQUMsU0FJekM7UUFaTyxzQkFBZ0IsR0FBVyxDQUFDLENBQUM7UUFTbkMsSUFBSSxlQUFlLElBQUksSUFBSSxFQUFFO1lBQzNCLEtBQUksQ0FBQyxnQkFBZ0IsR0FBRyxlQUFlLENBQUM7U0FDekM7O0lBQ0gsQ0FBQztJQVhELHNCQUFJLHlEQUFlO2FBQW5CO1lBQ0UsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7UUFDL0IsQ0FBQzs7O09BQUE7SUFVSCxtQ0FBQztBQUFELENBQUMsQUFmRCxDQUNJLHFCQUFxQixHQWN4QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtDaGFuZ2VEZXRlY3RvclJlZn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7QWpmQmFzZUZpZWxkQ29tcG9uZW50fSBmcm9tICcuL2Jhc2UtZmllbGQnO1xuaW1wb3J0IHtBamZGb3JtUmVuZGVyZXJTZXJ2aWNlfSBmcm9tICcuL2Zvcm0tcmVuZGVyZXInO1xuaW1wb3J0IHtcbiAgQWpmRmllbGRXaXRoQ2hvaWNlc0luc3RhbmNlXG59IGZyb20gJy4vaW50ZXJmYWNlL2ZpZWxkcy1pbnN0YW5jZXMvZmllbGQtd2l0aC1jaG9pY2VzLWluc3RhbmNlJztcbmltcG9ydCB7QWpmV2FybmluZ0FsZXJ0U2VydmljZX0gZnJvbSAnLi93YXJuaW5nLWFsZXJ0LXNlcnZpY2UnO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQWpmRmllbGRXaXRoQ2hvaWNlc0NvbXBvbmVudDxUPiBleHRlbmRzXG4gICAgQWpmQmFzZUZpZWxkQ29tcG9uZW50PEFqZkZpZWxkV2l0aENob2ljZXNJbnN0YW5jZTxUPj4ge1xuICBwcml2YXRlIF9zZWFyY2hUaHJlc2hvbGQ6IG51bWJlciA9IDY7XG4gIGdldCBzZWFyY2hUaHJlc2hvbGQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fc2VhcmNoVGhyZXNob2xkO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBjZHI6IENoYW5nZURldGVjdG9yUmVmLCBzZXJ2aWNlOiBBamZGb3JtUmVuZGVyZXJTZXJ2aWNlLFxuICAgICAgd2FybmluZ0FsZXJ0U2VydmljZTogQWpmV2FybmluZ0FsZXJ0U2VydmljZSwgc2VhcmNoVGhyZXNob2xkOiBudW1iZXIpIHtcbiAgICBzdXBlcihjZHIsIHNlcnZpY2UsIHdhcm5pbmdBbGVydFNlcnZpY2UpO1xuICAgIGlmIChzZWFyY2hUaHJlc2hvbGQgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fc2VhcmNoVGhyZXNob2xkID0gc2VhcmNoVGhyZXNob2xkO1xuICAgIH1cbiAgfVxufVxuIl19