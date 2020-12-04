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
import { buildStringIdentifier, } from '@ajf/core/common';
export const buildReportStringIdentifier = (report, context, opts) => {
    if (report == null) {
        return '';
    }
    const stringIdentifier = report.stringIdentifier || [];
    if (stringIdentifier.length === 0) {
        return '';
    }
    return buildStringIdentifier(stringIdentifier, context, opts);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGQtcmVwb3J0LXN0cmluZy1pZGVudGlmaWVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvcmVwb3J0cy91dGlscy9yZXBvcnRzL2J1aWxkLXJlcG9ydC1zdHJpbmctaWRlbnRpZmllci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBRUwscUJBQXFCLEdBRXRCLE1BQU0sa0JBQWtCLENBQUM7QUFJMUIsTUFBTSxDQUFDLE1BQU0sMkJBQTJCLEdBQ3BDLENBQUMsTUFBaUIsRUFBRSxPQUFtQixFQUFFLElBQWdDLEVBQVUsRUFBRTtJQUNuRixJQUFJLE1BQU0sSUFBSSxJQUFJLEVBQUU7UUFDbEIsT0FBTyxFQUFFLENBQUM7S0FDWDtJQUNELE1BQU0sZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLGdCQUFnQixJQUFJLEVBQUUsQ0FBQztJQUN2RCxJQUFJLGdCQUFnQixDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7UUFDakMsT0FBTyxFQUFFLENBQUM7S0FDWDtJQUNELE9BQU8scUJBQXFCLENBQUMsZ0JBQWdCLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ2hFLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtcbiAgQWpmQ29udGV4dCxcbiAgYnVpbGRTdHJpbmdJZGVudGlmaWVyLFxuICBCdWlsZFN0cmluZ0lkZW50aWZpZXJPcHRzLFxufSBmcm9tICdAYWpmL2NvcmUvY29tbW9uJztcblxuaW1wb3J0IHtBamZSZXBvcnR9IGZyb20gJy4uLy4uL2ludGVyZmFjZS9yZXBvcnRzL3JlcG9ydCc7XG5cbmV4cG9ydCBjb25zdCBidWlsZFJlcG9ydFN0cmluZ0lkZW50aWZpZXIgPVxuICAgIChyZXBvcnQ6IEFqZlJlcG9ydCwgY29udGV4dDogQWpmQ29udGV4dCwgb3B0cz86IEJ1aWxkU3RyaW5nSWRlbnRpZmllck9wdHMpOiBzdHJpbmcgPT4ge1xuICAgICAgaWYgKHJlcG9ydCA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICAgIH1cbiAgICAgIGNvbnN0IHN0cmluZ0lkZW50aWZpZXIgPSByZXBvcnQuc3RyaW5nSWRlbnRpZmllciB8fCBbXTtcbiAgICAgIGlmIChzdHJpbmdJZGVudGlmaWVyLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgICB9XG4gICAgICByZXR1cm4gYnVpbGRTdHJpbmdJZGVudGlmaWVyKHN0cmluZ0lkZW50aWZpZXIsIGNvbnRleHQsIG9wdHMpO1xuICAgIH07XG4iXX0=