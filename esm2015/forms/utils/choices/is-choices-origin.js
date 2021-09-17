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
 * isChoicesOrigin check if co parameter is defined and if correctly implements choicheOrigin
 * interface
 */
export function isChoicesOrigin(co) {
    return co != null && typeof co === 'object' && co.name != null && typeof co.name === 'string' &&
        co.label != null && typeof co.label === 'string' &&
        ['fixed', 'promise', 'observable', 'observableArray', 'function'].indexOf(co.type) > -1 &&
        co.choices instanceof Array;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXMtY2hvaWNlcy1vcmlnaW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9mb3Jtcy91dGlscy9jaG9pY2VzL2lzLWNob2ljZXMtb3JpZ2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVIOzs7R0FHRztBQUNILE1BQU0sVUFBVSxlQUFlLENBQUMsRUFBTztJQUNyQyxPQUFPLEVBQUUsSUFBSSxJQUFJLElBQUksT0FBTyxFQUFFLEtBQUssUUFBUSxJQUFJLEVBQUUsQ0FBQyxJQUFJLElBQUksSUFBSSxJQUFJLE9BQU8sRUFBRSxDQUFDLElBQUksS0FBSyxRQUFRO1FBQ3pGLEVBQUUsQ0FBQyxLQUFLLElBQUksSUFBSSxJQUFJLE9BQU8sRUFBRSxDQUFDLEtBQUssS0FBSyxRQUFRO1FBQ2hELENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsaUJBQWlCLEVBQUUsVUFBVSxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDdkYsRUFBRSxDQUFDLE9BQU8sWUFBWSxLQUFLLENBQUM7QUFDbEMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuLyoqXG4gKiBpc0Nob2ljZXNPcmlnaW4gY2hlY2sgaWYgY28gcGFyYW1ldGVyIGlzIGRlZmluZWQgYW5kIGlmIGNvcnJlY3RseSBpbXBsZW1lbnRzIGNob2ljaGVPcmlnaW5cbiAqIGludGVyZmFjZVxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNDaG9pY2VzT3JpZ2luKGNvOiBhbnkpOiBib29sZWFuIHtcbiAgcmV0dXJuIGNvICE9IG51bGwgJiYgdHlwZW9mIGNvID09PSAnb2JqZWN0JyAmJiBjby5uYW1lICE9IG51bGwgJiYgdHlwZW9mIGNvLm5hbWUgPT09ICdzdHJpbmcnICYmXG4gICAgICBjby5sYWJlbCAhPSBudWxsICYmIHR5cGVvZiBjby5sYWJlbCA9PT0gJ3N0cmluZycgJiZcbiAgICAgIFsnZml4ZWQnLCAncHJvbWlzZScsICdvYnNlcnZhYmxlJywgJ29ic2VydmFibGVBcnJheScsICdmdW5jdGlvbiddLmluZGV4T2YoY28udHlwZSkgPiAtMSAmJlxuICAgICAgY28uY2hvaWNlcyBpbnN0YW5jZW9mIEFycmF5O1xufVxuIl19