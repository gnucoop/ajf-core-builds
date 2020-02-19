/**
 * @fileoverview added by tsickle
 * Generated from: src/core/reports/utils/reports-instances/create-report-container-instance.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
import { widgetToWidgetInstance } from '../widgets-instances/widget-to-widget-instance';
/**
 * @param {?} container
 * @param {?} context
 * @param {?} ts
 * @return {?}
 */
export function createReportContainerInstance(container, context, ts) {
    /** @type {?} */
    const content = container.content.map((/**
     * @param {?} c
     * @return {?}
     */
    c => widgetToWidgetInstance(c, context, ts)));
    return {
        container,
        content,
        styles: container.styles,
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLXJlcG9ydC1jb250YWluZXItaW5zdGFuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9yZXBvcnRzL3V0aWxzL3JlcG9ydHMtaW5zdGFuY2VzL2NyZWF0ZS1yZXBvcnQtY29udGFpbmVyLWluc3RhbmNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBNkJBLE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLGdEQUFnRCxDQUFDOzs7Ozs7O0FBRXRGLE1BQU0sVUFBVSw2QkFBNkIsQ0FDekMsU0FBNkIsRUFBRSxPQUFtQixFQUNsRCxFQUFvQjs7VUFDaEIsT0FBTyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsR0FBRzs7OztJQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsRUFBQztJQUNsRixPQUFPO1FBQ0wsU0FBUztRQUNULE9BQU87UUFDUCxNQUFNLEVBQUUsU0FBUyxDQUFDLE1BQU07S0FDekIsQ0FBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTggR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZDb250ZXh0fSBmcm9tICdAYWpmL2NvcmUvbW9kZWxzJztcbmltcG9ydCB7VHJhbnNsYXRlU2VydmljZX0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5cbmltcG9ydCB7XG4gIEFqZlJlcG9ydENvbnRhaW5lckluc3RhbmNlXG59IGZyb20gJy4uLy4uL2ludGVyZmFjZS9yZXBvcnRzLWluc3RhbmNlcy9yZXBvcnQtY29udGFpbmVyLWluc3RhbmNlJztcbmltcG9ydCB7QWpmUmVwb3J0Q29udGFpbmVyfSBmcm9tICcuLi8uLi9pbnRlcmZhY2UvcmVwb3J0cy9yZXBvcnQtY29udGFpbmVyJztcbmltcG9ydCB7d2lkZ2V0VG9XaWRnZXRJbnN0YW5jZX0gZnJvbSAnLi4vd2lkZ2V0cy1pbnN0YW5jZXMvd2lkZ2V0LXRvLXdpZGdldC1pbnN0YW5jZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVSZXBvcnRDb250YWluZXJJbnN0YW5jZShcbiAgICBjb250YWluZXI6IEFqZlJlcG9ydENvbnRhaW5lciwgY29udGV4dDogQWpmQ29udGV4dCxcbiAgICB0czogVHJhbnNsYXRlU2VydmljZSk6IEFqZlJlcG9ydENvbnRhaW5lckluc3RhbmNlIHtcbiAgY29uc3QgY29udGVudCA9IGNvbnRhaW5lci5jb250ZW50Lm1hcChjID0+IHdpZGdldFRvV2lkZ2V0SW5zdGFuY2UoYywgY29udGV4dCwgdHMpKTtcbiAgcmV0dXJuIHtcbiAgICBjb250YWluZXIsXG4gICAgY29udGVudCxcbiAgICBzdHlsZXM6IGNvbnRhaW5lci5zdHlsZXMsXG4gIH07XG59XG4iXX0=