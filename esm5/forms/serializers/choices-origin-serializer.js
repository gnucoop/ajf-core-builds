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
import { __assign } from "tslib";
import { createChoicesOrigin } from '../utils/choices/create-choices-origin';
var AjfChoicesOriginSerializer = /** @class */ (function () {
    function AjfChoicesOriginSerializer() {
    }
    AjfChoicesOriginSerializer.fromJson = function (origin) {
        return createChoicesOrigin(__assign(__assign({}, origin), { type: origin.type || 'fixed', name: origin.name || '' }));
    };
    return AjfChoicesOriginSerializer;
}());
export { AjfChoicesOriginSerializer };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hvaWNlcy1vcmlnaW4tc2VyaWFsaXplci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2Zvcm1zL3NlcmlhbGl6ZXJzL2Nob2ljZXMtb3JpZ2luLXNlcmlhbGl6ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHOztBQUdILE9BQU8sRUFBeUIsbUJBQW1CLEVBQUMsTUFBTSx3Q0FBd0MsQ0FBQztBQUVuRztJQUFBO0lBUUEsQ0FBQztJQVBRLG1DQUFRLEdBQWYsVUFBZ0IsTUFBc0M7UUFDcEQsT0FBTyxtQkFBbUIsQ0FBTSxzQkFDM0IsTUFBTSxLQUNULElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxJQUFJLE9BQU8sRUFDNUIsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLElBQUksRUFBRSxHQUNPLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBQ0gsaUNBQUM7QUFBRCxDQUFDLEFBUkQsSUFRQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZDaG9pY2VzT3JpZ2lufSBmcm9tICcuLi9pbnRlcmZhY2UvY2hvaWNlcy9jaG9pY2VzLW9yaWdpbic7XG5pbXBvcnQge0FqZkNob2ljZXNPcmlnaW5DcmVhdGUsIGNyZWF0ZUNob2ljZXNPcmlnaW59IGZyb20gJy4uL3V0aWxzL2Nob2ljZXMvY3JlYXRlLWNob2ljZXMtb3JpZ2luJztcblxuZXhwb3J0IGNsYXNzIEFqZkNob2ljZXNPcmlnaW5TZXJpYWxpemVyIHtcbiAgc3RhdGljIGZyb21Kc29uKG9yaWdpbjogUGFydGlhbDxBamZDaG9pY2VzT3JpZ2luPGFueT4+KTogQWpmQ2hvaWNlc09yaWdpbjxhbnk+IHtcbiAgICByZXR1cm4gY3JlYXRlQ2hvaWNlc09yaWdpbjxhbnk+KHtcbiAgICAgIC4uLm9yaWdpbixcbiAgICAgIHR5cGU6IG9yaWdpbi50eXBlIHx8ICdmaXhlZCcsXG4gICAgICBuYW1lOiBvcmlnaW4ubmFtZSB8fCAnJyxcbiAgICB9IGFzIEFqZkNob2ljZXNPcmlnaW5DcmVhdGU8YW55Pik7XG4gIH1cbn1cbiJdfQ==