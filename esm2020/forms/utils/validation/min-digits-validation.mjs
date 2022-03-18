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
import { createValidation } from './create-validation';
/**
 * It checks if the length of digits is greater than or equal to minValue and returns
 * an AjfValidation.
 */
export function minDigitsValidation(minValue) {
    return createValidation({
        condition: `$value ? $value.toString().length >= ${minValue.toString()} : false`,
        errorMessage: 'Digits count must be >= ' + minValue.toString(),
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWluLWRpZ2l0cy12YWxpZGF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9mb3Jtcy9zcmMvdXRpbHMvdmFsaWRhdGlvbi9taW4tZGlnaXRzLXZhbGlkYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBR0gsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFFckQ7OztHQUdHO0FBQ0gsTUFBTSxVQUFVLG1CQUFtQixDQUFDLFFBQWdCO0lBQ2xELE9BQU8sZ0JBQWdCLENBQUM7UUFDdEIsU0FBUyxFQUFFLHdDQUF3QyxRQUFRLENBQUMsUUFBUSxFQUFFLFVBQVU7UUFDaEYsWUFBWSxFQUFFLDBCQUEwQixHQUFHLFFBQVEsQ0FBQyxRQUFRLEVBQUU7S0FDL0QsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZWYWxpZGF0aW9ufSBmcm9tICcuLi8uLi9pbnRlcmZhY2UvdmFsaWRhdGlvbi92YWxpZGF0aW9uJztcbmltcG9ydCB7Y3JlYXRlVmFsaWRhdGlvbn0gZnJvbSAnLi9jcmVhdGUtdmFsaWRhdGlvbic7XG5cbi8qKlxuICogSXQgY2hlY2tzIGlmIHRoZSBsZW5ndGggb2YgZGlnaXRzIGlzIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byBtaW5WYWx1ZSBhbmQgcmV0dXJuc1xuICogYW4gQWpmVmFsaWRhdGlvbi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1pbkRpZ2l0c1ZhbGlkYXRpb24obWluVmFsdWU6IG51bWJlcik6IEFqZlZhbGlkYXRpb24ge1xuICByZXR1cm4gY3JlYXRlVmFsaWRhdGlvbih7XG4gICAgY29uZGl0aW9uOiBgJHZhbHVlID8gJHZhbHVlLnRvU3RyaW5nKCkubGVuZ3RoID49ICR7bWluVmFsdWUudG9TdHJpbmcoKX0gOiBmYWxzZWAsXG4gICAgZXJyb3JNZXNzYWdlOiAnRGlnaXRzIGNvdW50IG11c3QgYmUgPj0gJyArIG1pblZhbHVlLnRvU3RyaW5nKCksXG4gIH0pO1xufVxuIl19