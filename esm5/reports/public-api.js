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
export * from './base-widget';
export * from './chart-utils';
export * from './get-column-content';
export * from './interface/aggregation/aggregation-type';
export * from './interface/charts/chart-type';
export * from './interface/widgets/widget-type';
export * from './report';
export * from './reports-module';
export * from './serializers/aggregation-serializer';
export * from './serializers/dataset-serializer';
export * from './serializers/report-container-serializer';
export * from './serializers/report-serializer';
export * from './serializers/widget-serializer';
export * from './widget';
export * from './widget-host';
export * from './utils/aggregation/create-aggregation';
export * from './utils/reports-instances/create-report-instance';
export * from './utils/widgets/create-widget';
export * from './utils/widgets-instances/create-widget-instance';
export * from './utils/widgets-instances/widget-to-widget-instance';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVibGljLWFwaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL3JlcG9ydHMvcHVibGljLWFwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxjQUFjLGVBQWUsQ0FBQztBQUM5QixjQUFjLGVBQWUsQ0FBQztBQUM5QixjQUFjLHNCQUFzQixDQUFDO0FBRXJDLGNBQWMsMENBQTBDLENBQUM7QUFDekQsY0FBYywrQkFBK0IsQ0FBQztBQXdCOUMsY0FBYyxpQ0FBaUMsQ0FBQztBQWVoRCxjQUFjLFVBQVUsQ0FBQztBQUN6QixjQUFjLGtCQUFrQixDQUFDO0FBQ2pDLGNBQWMsc0NBQXNDLENBQUM7QUFDckQsY0FBYyxrQ0FBa0MsQ0FBQztBQUNqRCxjQUFjLDJDQUEyQyxDQUFDO0FBQzFELGNBQWMsaUNBQWlDLENBQUM7QUFDaEQsY0FBYyxpQ0FBaUMsQ0FBQztBQUNoRCxjQUFjLFVBQVUsQ0FBQztBQUV6QixjQUFjLGVBQWUsQ0FBQztBQUU5QixjQUFjLHdDQUF3QyxDQUFDO0FBQ3ZELGNBQWMsa0RBQWtELENBQUM7QUFDakUsY0FBYywrQkFBK0IsQ0FBQztBQUM5QyxjQUFjLGtEQUFrRCxDQUFDO0FBQ2pFLGNBQWMscURBQXFELENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTggR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuZXhwb3J0ICogZnJvbSAnLi9iYXNlLXdpZGdldCc7XG5leHBvcnQgKiBmcm9tICcuL2NoYXJ0LXV0aWxzJztcbmV4cG9ydCAqIGZyb20gJy4vZ2V0LWNvbHVtbi1jb250ZW50JztcbmV4cG9ydCAqIGZyb20gJy4vaW50ZXJmYWNlL2FnZ3JlZ2F0aW9uL2FnZ3JlZ2F0aW9uJztcbmV4cG9ydCAqIGZyb20gJy4vaW50ZXJmYWNlL2FnZ3JlZ2F0aW9uL2FnZ3JlZ2F0aW9uLXR5cGUnO1xuZXhwb3J0ICogZnJvbSAnLi9pbnRlcmZhY2UvY2hhcnRzL2NoYXJ0LXR5cGUnO1xuZXhwb3J0ICogZnJvbSAnLi9pbnRlcmZhY2UvZGF0YXNldC9jaGFydC1kYXRhc2V0JztcbmV4cG9ydCAqIGZyb20gJy4vaW50ZXJmYWNlL2RhdGFzZXQvY2hhcnQtZGF0YXNldC1vcHRpb25zJztcbmV4cG9ydCAqIGZyb20gJy4vaW50ZXJmYWNlL2RhdGFzZXQvZGF0YXNldCc7XG5leHBvcnQgKiBmcm9tICcuL2ludGVyZmFjZS9kYXRhc2V0L3RhYmxlLWRhdGFzZXQnO1xuZXhwb3J0ICogZnJvbSAnLi9pbnRlcmZhY2UvcmVwb3J0cy9yZXBvcnQnO1xuZXhwb3J0ICogZnJvbSAnLi9pbnRlcmZhY2UvcmVwb3J0cy9yZXBvcnQtY29udGFpbmVyJztcbmV4cG9ydCAqIGZyb20gJy4vaW50ZXJmYWNlL3JlcG9ydHMvcmVwb3J0LXZhcmlhYmxlJztcbmV4cG9ydCAqIGZyb20gJy4vaW50ZXJmYWNlL3JlcG9ydHMtaW5zdGFuY2VzL3JlcG9ydC1jb250YWluZXItaW5zdGFuY2UnO1xuZXhwb3J0ICogZnJvbSAnLi9pbnRlcmZhY2UvcmVwb3J0cy1pbnN0YW5jZXMvcmVwb3J0LWluc3RhbmNlJztcbmV4cG9ydCAqIGZyb20gJy4vaW50ZXJmYWNlL3N0eWxlcyc7XG5leHBvcnQgKiBmcm9tICcuL2ludGVyZmFjZS93aWRnZXRzL2NoYXJ0LXdpZGdldCc7XG5leHBvcnQgKiBmcm9tICcuL2ludGVyZmFjZS93aWRnZXRzL2NvbHVtbi13aWRnZXQnO1xuZXhwb3J0ICogZnJvbSAnLi9pbnRlcmZhY2Uvd2lkZ2V0cy9jdXN0b20td2lkZ2V0JztcbmV4cG9ydCAqIGZyb20gJy4vaW50ZXJmYWNlL3dpZGdldHMvZGF0YS13aWRnZXQnO1xuZXhwb3J0ICogZnJvbSAnLi9pbnRlcmZhY2Uvd2lkZ2V0cy9mb3JtdWxhLXdpZGdldCc7XG5leHBvcnQgKiBmcm9tICcuL2ludGVyZmFjZS93aWRnZXRzL2ltYWdlLWNvbnRhaW5lci13aWRnZXQnO1xuZXhwb3J0ICogZnJvbSAnLi9pbnRlcmZhY2Uvd2lkZ2V0cy9pbWFnZS13aWRnZXQnO1xuZXhwb3J0ICogZnJvbSAnLi9pbnRlcmZhY2Uvd2lkZ2V0cy9sYXlvdXQtd2lkZ2V0JztcbmV4cG9ydCAqIGZyb20gJy4vaW50ZXJmYWNlL3dpZGdldHMvbWFwLXdpZGdldCc7XG5leHBvcnQgKiBmcm9tICcuL2ludGVyZmFjZS93aWRnZXRzL3BhZ2UtYnJlYWstd2lkZ2V0JztcbmV4cG9ydCAqIGZyb20gJy4vaW50ZXJmYWNlL3dpZGdldHMvdGFibGUtd2lkZ2V0JztcbmV4cG9ydCAqIGZyb20gJy4vaW50ZXJmYWNlL3dpZGdldHMvdGV4dC13aWRnZXQnO1xuZXhwb3J0ICogZnJvbSAnLi9pbnRlcmZhY2Uvd2lkZ2V0cy93aWRnZXQnO1xuZXhwb3J0ICogZnJvbSAnLi9pbnRlcmZhY2Uvd2lkZ2V0cy93aWRnZXQtdHlwZSc7XG5leHBvcnQgKiBmcm9tICcuL2ludGVyZmFjZS93aWRnZXRzL3dpZGdldC13aXRoLWNvbnRlbnQnO1xuZXhwb3J0ICogZnJvbSAnLi9pbnRlcmZhY2Uvd2lkZ2V0cy1pbnN0YW5jZXMvY2hhcnQtd2lkZ2V0LWluc3RhbmNlJztcbmV4cG9ydCAqIGZyb20gJy4vaW50ZXJmYWNlL3dpZGdldHMtaW5zdGFuY2VzL2NvbHVtbi13aWRnZXQtaW5zdGFuY2UnO1xuZXhwb3J0ICogZnJvbSAnLi9pbnRlcmZhY2Uvd2lkZ2V0cy1pbnN0YW5jZXMvZGF0YS13aWRnZXQtaW5zdGFuY2UnO1xuZXhwb3J0ICogZnJvbSAnLi9pbnRlcmZhY2Uvd2lkZ2V0cy1pbnN0YW5jZXMvZm9ybXVsYS13aWRnZXQtaW5zdGFuY2UnO1xuZXhwb3J0ICogZnJvbSAnLi9pbnRlcmZhY2Uvd2lkZ2V0cy1pbnN0YW5jZXMvaW1hZ2UtY29udGFpbmVyLXdpZGdldC1pbnN0YW5jZSc7XG5leHBvcnQgKiBmcm9tICcuL2ludGVyZmFjZS93aWRnZXRzLWluc3RhbmNlcy9pbWFnZS13aWRnZXQtaW5zdGFuY2UnO1xuZXhwb3J0ICogZnJvbSAnLi9pbnRlcmZhY2Uvd2lkZ2V0cy1pbnN0YW5jZXMvbGF5b3V0LXdpZGdldC1pbnN0YW5jZSc7XG5leHBvcnQgKiBmcm9tICcuL2ludGVyZmFjZS93aWRnZXRzLWluc3RhbmNlcy9tYXAtd2lkZ2V0LWluc3RhbmNlJztcbmV4cG9ydCAqIGZyb20gJy4vaW50ZXJmYWNlL3dpZGdldHMtaW5zdGFuY2VzL3BhZ2UtYnJlYWstd2lkZ2V0LWluc3RhbmNlJztcbmV4cG9ydCAqIGZyb20gJy4vaW50ZXJmYWNlL3dpZGdldHMtaW5zdGFuY2VzL3RhYmxlLXdpZGdldC1pbnN0YW5jZSc7XG5leHBvcnQgKiBmcm9tICcuL2ludGVyZmFjZS93aWRnZXRzLWluc3RhbmNlcy90ZXh0LXdpZGdldC1pbnN0YW5jZSc7XG5leHBvcnQgKiBmcm9tICcuL2ludGVyZmFjZS93aWRnZXRzLWluc3RhbmNlcy93aWRnZXQtaW5zdGFuY2UnO1xuZXhwb3J0ICogZnJvbSAnLi9pbnRlcmZhY2Uvd2lkZ2V0cy1pbnN0YW5jZXMvd2lkZ2V0LXdpdGgtY29udGVudC1pbnN0YW5jZSc7XG5leHBvcnQgKiBmcm9tICcuL3JlcG9ydCc7XG5leHBvcnQgKiBmcm9tICcuL3JlcG9ydHMtbW9kdWxlJztcbmV4cG9ydCAqIGZyb20gJy4vc2VyaWFsaXplcnMvYWdncmVnYXRpb24tc2VyaWFsaXplcic7XG5leHBvcnQgKiBmcm9tICcuL3NlcmlhbGl6ZXJzL2RhdGFzZXQtc2VyaWFsaXplcic7XG5leHBvcnQgKiBmcm9tICcuL3NlcmlhbGl6ZXJzL3JlcG9ydC1jb250YWluZXItc2VyaWFsaXplcic7XG5leHBvcnQgKiBmcm9tICcuL3NlcmlhbGl6ZXJzL3JlcG9ydC1zZXJpYWxpemVyJztcbmV4cG9ydCAqIGZyb20gJy4vc2VyaWFsaXplcnMvd2lkZ2V0LXNlcmlhbGl6ZXInO1xuZXhwb3J0ICogZnJvbSAnLi93aWRnZXQnO1xuZXhwb3J0ICogZnJvbSAnLi93aWRnZXQtY29tcG9uZW50cy1tYXAnO1xuZXhwb3J0ICogZnJvbSAnLi93aWRnZXQtaG9zdCc7XG5cbmV4cG9ydCAqIGZyb20gJy4vdXRpbHMvYWdncmVnYXRpb24vY3JlYXRlLWFnZ3JlZ2F0aW9uJztcbmV4cG9ydCAqIGZyb20gJy4vdXRpbHMvcmVwb3J0cy1pbnN0YW5jZXMvY3JlYXRlLXJlcG9ydC1pbnN0YW5jZSc7XG5leHBvcnQgKiBmcm9tICcuL3V0aWxzL3dpZGdldHMvY3JlYXRlLXdpZGdldCc7XG5leHBvcnQgKiBmcm9tICcuL3V0aWxzL3dpZGdldHMtaW5zdGFuY2VzL2NyZWF0ZS13aWRnZXQtaW5zdGFuY2UnO1xuZXhwb3J0ICogZnJvbSAnLi91dGlscy93aWRnZXRzLWluc3RhbmNlcy93aWRnZXQtdG8td2lkZ2V0LWluc3RhbmNlJztcbiJdfQ==