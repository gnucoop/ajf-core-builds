/**
 * @fileoverview added by tsickle
 * Generated from: src/core/reports/utils/reports-instances/create-report-container-instance.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLXJlcG9ydC1jb250YWluZXItaW5zdGFuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9yZXBvcnRzL3V0aWxzL3JlcG9ydHMtaW5zdGFuY2VzL2NyZWF0ZS1yZXBvcnQtY29udGFpbmVyLWluc3RhbmNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBNkJBLE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLGdEQUFnRCxDQUFDOzs7Ozs7O0FBRXRGLE1BQU0sVUFBVSw2QkFBNkIsQ0FDekMsU0FBNkIsRUFBRSxPQUFtQixFQUNsRCxFQUFvQjs7VUFDaEIsT0FBTyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsR0FBRzs7OztJQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsRUFBQztJQUNsRixPQUFPO1FBQ0wsU0FBUztRQUNULE9BQU87UUFDUCxNQUFNLEVBQUUsU0FBUyxDQUFDLE1BQU07S0FDekIsQ0FBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmQ29udGV4dH0gZnJvbSAnQGFqZi9jb3JlL21vZGVscyc7XG5pbXBvcnQge1RyYW5zbGF0ZVNlcnZpY2V9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuXG5pbXBvcnQge1xuICBBamZSZXBvcnRDb250YWluZXJJbnN0YW5jZVxufSBmcm9tICcuLi8uLi9pbnRlcmZhY2UvcmVwb3J0cy1pbnN0YW5jZXMvcmVwb3J0LWNvbnRhaW5lci1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZlJlcG9ydENvbnRhaW5lcn0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL3JlcG9ydHMvcmVwb3J0LWNvbnRhaW5lcic7XG5pbXBvcnQge3dpZGdldFRvV2lkZ2V0SW5zdGFuY2V9IGZyb20gJy4uL3dpZGdldHMtaW5zdGFuY2VzL3dpZGdldC10by13aWRnZXQtaW5zdGFuY2UnO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUmVwb3J0Q29udGFpbmVySW5zdGFuY2UoXG4gICAgY29udGFpbmVyOiBBamZSZXBvcnRDb250YWluZXIsIGNvbnRleHQ6IEFqZkNvbnRleHQsXG4gICAgdHM6IFRyYW5zbGF0ZVNlcnZpY2UpOiBBamZSZXBvcnRDb250YWluZXJJbnN0YW5jZSB7XG4gIGNvbnN0IGNvbnRlbnQgPSBjb250YWluZXIuY29udGVudC5tYXAoYyA9PiB3aWRnZXRUb1dpZGdldEluc3RhbmNlKGMsIGNvbnRleHQsIHRzKSk7XG4gIHJldHVybiB7XG4gICAgY29udGFpbmVyLFxuICAgIGNvbnRlbnQsXG4gICAgc3R5bGVzOiBjb250YWluZXIuc3R5bGVzLFxuICB9O1xufVxuIl19