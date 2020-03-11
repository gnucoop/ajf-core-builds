/**
 * @fileoverview added by tsickle
 * Generated from: src/core/forms/utils/fields/create-field-with-choices.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
import { createField } from './create-field';
/**
 * @template T
 * @param {?} field
 * @return {?}
 */
export function createFieldWithChoices(field) {
    /** @type {?} */
    const node = createField(Object.assign({}, field));
    return Object.assign(Object.assign(Object.assign({}, node), field), { choices: field.choices || [], forceExpanded: field.forceExpanded || false, forceNarrow: field.forceNarrow || false });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLWZpZWxkLXdpdGgtY2hvaWNlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2Zvcm1zL3V0aWxzL2ZpZWxkcy9jcmVhdGUtZmllbGQtd2l0aC1jaG9pY2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBdUJBLE9BQU8sRUFBaUIsV0FBVyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7Ozs7OztBQUszRCxNQUFNLFVBQVUsc0JBQXNCLENBQUksS0FBbUM7O1VBRXJFLElBQUksR0FBRyxXQUFXLG1CQUFLLEtBQUssRUFBRTtJQUNwQyxxREFDSyxJQUFJLEdBQ0osS0FBSyxLQUNSLE9BQU8sRUFBRSxLQUFLLENBQUMsT0FBTyxJQUFJLEVBQUUsRUFDNUIsYUFBYSxFQUFFLEtBQUssQ0FBQyxhQUFhLElBQUksS0FBSyxFQUMzQyxXQUFXLEVBQUUsS0FBSyxDQUFDLFdBQVcsSUFBSSxLQUFLLElBQ3ZDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZGaWVsZFdpdGhDaG9pY2VzfSBmcm9tICcuLi8uLi9pbnRlcmZhY2UvZmllbGRzL2ZpZWxkLXdpdGgtY2hvaWNlcyc7XG5pbXBvcnQge0FqZkZpZWxkQ3JlYXRlLCBjcmVhdGVGaWVsZH0gZnJvbSAnLi9jcmVhdGUtZmllbGQnO1xuXG5leHBvcnQgdHlwZSBBamZGaWVsZFdpdGhDaG9pY2VzQ3JlYXRlPFQ+ID0gQWpmRmllbGRDcmVhdGUmXG4gICAgUGljazxBamZGaWVsZFdpdGhDaG9pY2VzPFQ+LCAnZmllbGRUeXBlJ3wnY2hvaWNlc09yaWdpbic+JlBhcnRpYWw8QWpmRmllbGRXaXRoQ2hvaWNlczxUPj47XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVGaWVsZFdpdGhDaG9pY2VzPFQ+KGZpZWxkOiBBamZGaWVsZFdpdGhDaG9pY2VzQ3JlYXRlPFQ+KTpcbiAgICBBamZGaWVsZFdpdGhDaG9pY2VzPFQ+IHtcbiAgY29uc3Qgbm9kZSA9IGNyZWF0ZUZpZWxkKHsuLi5maWVsZH0pO1xuICByZXR1cm4ge1xuICAgIC4uLm5vZGUsXG4gICAgLi4uZmllbGQsXG4gICAgY2hvaWNlczogZmllbGQuY2hvaWNlcyB8fCBbXSxcbiAgICBmb3JjZUV4cGFuZGVkOiBmaWVsZC5mb3JjZUV4cGFuZGVkIHx8IGZhbHNlLFxuICAgIGZvcmNlTmFycm93OiBmaWVsZC5mb3JjZU5hcnJvdyB8fCBmYWxzZSxcbiAgfTtcbn1cbiJdfQ==