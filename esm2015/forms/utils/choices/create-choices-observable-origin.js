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
export function createChoicesObservableOrigin(origin) {
    return Object.assign(Object.assign({}, origin), { type: 'observable', label: origin.label || '', choices: origin.choices || [] });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLWNob2ljZXMtb2JzZXJ2YWJsZS1vcmlnaW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9mb3Jtcy91dGlscy9jaG9pY2VzL2NyZWF0ZS1jaG9pY2VzLW9ic2VydmFibGUtb3JpZ2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQVFILE1BQU0sVUFBVSw2QkFBNkIsQ0FBSSxNQUEyQztJQUUxRix1Q0FDSyxNQUFNLEtBQ1QsSUFBSSxFQUFFLFlBQVksRUFDbEIsS0FBSyxFQUFFLE1BQU0sQ0FBQyxLQUFLLElBQUksRUFBRSxFQUN6QixPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU8sSUFBSSxFQUFFLElBQzdCO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZDaG9pY2VzT2JzZXJ2YWJsZU9yaWdpbn0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL2Nob2ljZXMvY2hvaWNlcy1vYnNlcnZhYmxlLW9yaWdpbic7XG5pbXBvcnQge0FqZkNob2ljZXNPcmlnaW5DcmVhdGV9IGZyb20gJy4vY3JlYXRlLWNob2ljZXMtb3JpZ2luJztcblxuZXhwb3J0IHR5cGUgQWpmQ2hvaWNlc09ic2VydmFibGVPcmlnaW5DcmVhdGU8VD4gPSBPbWl0PEFqZkNob2ljZXNPcmlnaW5DcmVhdGU8VD4sICd0eXBlJz4mXG4gICAgUGljazxBamZDaG9pY2VzT2JzZXJ2YWJsZU9yaWdpbjxUPiwgJ2dlbmVyYXRvcic+JlBhcnRpYWw8QWpmQ2hvaWNlc09ic2VydmFibGVPcmlnaW48VD4+O1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQ2hvaWNlc09ic2VydmFibGVPcmlnaW48VD4ob3JpZ2luOiBBamZDaG9pY2VzT2JzZXJ2YWJsZU9yaWdpbkNyZWF0ZTxUPik6XG4gICAgQWpmQ2hvaWNlc09ic2VydmFibGVPcmlnaW48VD4ge1xuICByZXR1cm4ge1xuICAgIC4uLm9yaWdpbixcbiAgICB0eXBlOiAnb2JzZXJ2YWJsZScsXG4gICAgbGFiZWw6IG9yaWdpbi5sYWJlbCB8fCAnJyxcbiAgICBjaG9pY2VzOiBvcmlnaW4uY2hvaWNlcyB8fCBbXSxcbiAgfTtcbn1cbiJdfQ==