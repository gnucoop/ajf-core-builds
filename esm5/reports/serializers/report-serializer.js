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
import { createReport } from '../utils/reports/create-report';
import { AjfReportContainerSerializer } from './report-container-serializer';
var AjfReportSerializer = /** @class */ (function () {
    function AjfReportSerializer() {
    }
    AjfReportSerializer.fromJson = function (json) {
        var containers = ['header', 'footer', 'content'];
        containers.forEach(function (c) {
            if (json[c]) {
                json[c] =
                    AjfReportContainerSerializer.fromJson(json[c]);
            }
        });
        return createReport(json);
    };
    return AjfReportSerializer;
}());
export { AjfReportSerializer };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwb3J0LXNlcmlhbGl6ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9yZXBvcnRzL3NlcmlhbGl6ZXJzL3JlcG9ydC1zZXJpYWxpemVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUlILE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQztBQUM1RCxPQUFPLEVBQUMsNEJBQTRCLEVBQUMsTUFBTSwrQkFBK0IsQ0FBQztBQUUzRTtJQUFBO0lBV0EsQ0FBQztJQVZRLDRCQUFRLEdBQWYsVUFBZ0IsSUFBd0I7UUFDdEMsSUFBTSxVQUFVLEdBQXdCLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUN4RSxVQUFVLENBQUMsT0FBTyxDQUFDLFVBQUEsQ0FBQztZQUNsQixJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDVixJQUFJLENBQUMsQ0FBQyxDQUF3QjtvQkFDM0IsNEJBQTRCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQWdDLENBQUMsQ0FBQzthQUNuRjtRQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUNILDBCQUFDO0FBQUQsQ0FBQyxBQVhELElBV0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTggR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZSZXBvcnR9IGZyb20gJy4uL2ludGVyZmFjZS9yZXBvcnRzL3JlcG9ydCc7XG5pbXBvcnQge0FqZlJlcG9ydENvbnRhaW5lcn0gZnJvbSAnLi4vaW50ZXJmYWNlL3JlcG9ydHMvcmVwb3J0LWNvbnRhaW5lcic7XG5pbXBvcnQge2NyZWF0ZVJlcG9ydH0gZnJvbSAnLi4vdXRpbHMvcmVwb3J0cy9jcmVhdGUtcmVwb3J0JztcbmltcG9ydCB7QWpmUmVwb3J0Q29udGFpbmVyU2VyaWFsaXplcn0gZnJvbSAnLi9yZXBvcnQtY29udGFpbmVyLXNlcmlhbGl6ZXInO1xuXG5leHBvcnQgY2xhc3MgQWpmUmVwb3J0U2VyaWFsaXplciB7XG4gIHN0YXRpYyBmcm9tSnNvbihqc29uOiBQYXJ0aWFsPEFqZlJlcG9ydD4pOiBBamZSZXBvcnQge1xuICAgIGNvbnN0IGNvbnRhaW5lcnM6IChrZXlvZiBBamZSZXBvcnQpW10gPSBbJ2hlYWRlcicsICdmb290ZXInLCAnY29udGVudCddO1xuICAgIGNvbnRhaW5lcnMuZm9yRWFjaChjID0+IHtcbiAgICAgIGlmIChqc29uW2NdKSB7XG4gICAgICAgIChqc29uW2NdIGFzIEFqZlJlcG9ydENvbnRhaW5lcikgPVxuICAgICAgICAgICAgQWpmUmVwb3J0Q29udGFpbmVyU2VyaWFsaXplci5mcm9tSnNvbihqc29uW2NdIGFzIFBhcnRpYWw8QWpmUmVwb3J0Q29udGFpbmVyPik7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGNyZWF0ZVJlcG9ydChqc29uKTtcbiAgfVxufVxuIl19