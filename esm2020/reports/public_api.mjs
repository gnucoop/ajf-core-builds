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
export * from './base-widget';
export * from './chart-utils';
export * from './get-column-content';
export * from './interface/aggregation/aggregation';
export * from './interface/aggregation/aggregation-type';
export * from './interface/charts/chart-type';
export * from './interface/dataset/chart-dataset';
export * from './interface/dataset/chart-dataset-options';
export * from './interface/dataset/dataset';
export * from './interface/dataset/table-dataset';
export * from './interface/reports/report';
export * from './interface/reports/report-container';
export * from './interface/reports/report-string-identifier';
export * from './interface/reports/report-variable';
export * from './interface/reports-instances/report-container-instance';
export * from './interface/reports-instances/report-instance';
export * from './interface/styles';
export * from './interface/widgets/base-widget';
export * from './interface/widgets/chart-widget';
export * from './interface/widgets/column-widget';
export * from './interface/widgets/custom-widget';
export * from './interface/widgets/data-widget';
export * from './interface/widgets/filter';
export * from './interface/widgets/formula-widget';
export * from './interface/widgets/image-container-widget';
export * from './interface/widgets/image-widget';
export * from './interface/widgets/layout-widget';
export * from './interface/widgets/map-widget';
export * from './interface/widgets/page-break-widget';
export * from './interface/widgets/table-widget';
export * from './interface/widgets/text-widget';
export * from './interface/widgets/widget';
export * from './interface/widgets/widget-components-map';
export * from './interface/widgets/widget-type';
export * from './interface/widgets/widget-with-content';
export * from './interface/widgets-instances/base-widget-instance';
export * from './interface/widgets-instances/chart-widget-instance';
export * from './interface/widgets-instances/column-widget-instance';
export * from './interface/widgets-instances/data-widget-instance';
export * from './interface/widgets-instances/filter-instance';
export * from './interface/widgets-instances/formula-widget-instance';
export * from './interface/widgets-instances/image-container-widget-instance';
export * from './interface/widgets-instances/image-widget-instance';
export * from './interface/widgets-instances/layout-widget-instance';
export * from './interface/widgets-instances/map-widget-instance';
export * from './interface/widgets-instances/page-break-widget-instance';
export * from './interface/widgets-instances/table-widget-instance';
export * from './interface/widgets-instances/text-widget-instance';
export * from './interface/widgets-instances/widget-instance';
export * from './interface/widgets-instances/widget-with-content-instance';
export * from './report';
export * from './report-string-identifier';
export * from './reports-module';
export * from './serializers/aggregation-serializer';
export * from './serializers/dataset-serializer';
export * from './serializers/report-container-serializer';
export * from './serializers/report-serializer';
export * from './serializers/widget-serializer';
export * from './widget';
export * from './widget-export';
export * from './widget-host';
export * from './widget-service';
export * from './utils/aggregation/create-aggregation';
export * from './utils/reports-instances/create-report-instance';
export * from './utils/widgets/create-widget';
export * from './utils/widgets-instances/create-widget-instance';
export * from './utils/widgets-instances/widget-to-widget-instance';
export * from './automatic-report/automatic-report';
export * from './xls-report/xls-report';
export * from './report-to-pdf/report-to-pdf';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVibGljX2FwaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvcmVwb3J0cy9zcmMvcHVibGljX2FwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxjQUFjLGVBQWUsQ0FBQztBQUM5QixjQUFjLGVBQWUsQ0FBQztBQUM5QixjQUFjLHNCQUFzQixDQUFDO0FBQ3JDLGNBQWMscUNBQXFDLENBQUM7QUFDcEQsY0FBYywwQ0FBMEMsQ0FBQztBQUN6RCxjQUFjLCtCQUErQixDQUFDO0FBQzlDLGNBQWMsbUNBQW1DLENBQUM7QUFDbEQsY0FBYywyQ0FBMkMsQ0FBQztBQUMxRCxjQUFjLDZCQUE2QixDQUFDO0FBQzVDLGNBQWMsbUNBQW1DLENBQUM7QUFDbEQsY0FBYyw0QkFBNEIsQ0FBQztBQUMzQyxjQUFjLHNDQUFzQyxDQUFDO0FBQ3JELGNBQWMsOENBQThDLENBQUM7QUFDN0QsY0FBYyxxQ0FBcUMsQ0FBQztBQUNwRCxjQUFjLHlEQUF5RCxDQUFDO0FBQ3hFLGNBQWMsK0NBQStDLENBQUM7QUFDOUQsY0FBYyxvQkFBb0IsQ0FBQztBQUNuQyxjQUFjLGlDQUFpQyxDQUFDO0FBQ2hELGNBQWMsa0NBQWtDLENBQUM7QUFDakQsY0FBYyxtQ0FBbUMsQ0FBQztBQUNsRCxjQUFjLG1DQUFtQyxDQUFDO0FBQ2xELGNBQWMsaUNBQWlDLENBQUM7QUFDaEQsY0FBYyw0QkFBNEIsQ0FBQztBQUMzQyxjQUFjLG9DQUFvQyxDQUFDO0FBQ25ELGNBQWMsNENBQTRDLENBQUM7QUFDM0QsY0FBYyxrQ0FBa0MsQ0FBQztBQUNqRCxjQUFjLG1DQUFtQyxDQUFDO0FBQ2xELGNBQWMsZ0NBQWdDLENBQUM7QUFDL0MsY0FBYyx1Q0FBdUMsQ0FBQztBQUN0RCxjQUFjLGtDQUFrQyxDQUFDO0FBQ2pELGNBQWMsaUNBQWlDLENBQUM7QUFDaEQsY0FBYyw0QkFBNEIsQ0FBQztBQUMzQyxjQUFjLDJDQUEyQyxDQUFDO0FBQzFELGNBQWMsaUNBQWlDLENBQUM7QUFDaEQsY0FBYyx5Q0FBeUMsQ0FBQztBQUN4RCxjQUFjLG9EQUFvRCxDQUFDO0FBQ25FLGNBQWMscURBQXFELENBQUM7QUFDcEUsY0FBYyxzREFBc0QsQ0FBQztBQUNyRSxjQUFjLG9EQUFvRCxDQUFDO0FBQ25FLGNBQWMsK0NBQStDLENBQUM7QUFDOUQsY0FBYyx1REFBdUQsQ0FBQztBQUN0RSxjQUFjLCtEQUErRCxDQUFDO0FBQzlFLGNBQWMscURBQXFELENBQUM7QUFDcEUsY0FBYyxzREFBc0QsQ0FBQztBQUNyRSxjQUFjLG1EQUFtRCxDQUFDO0FBQ2xFLGNBQWMsMERBQTBELENBQUM7QUFDekUsY0FBYyxxREFBcUQsQ0FBQztBQUNwRSxjQUFjLG9EQUFvRCxDQUFDO0FBQ25FLGNBQWMsK0NBQStDLENBQUM7QUFDOUQsY0FBYyw0REFBNEQsQ0FBQztBQUMzRSxjQUFjLFVBQVUsQ0FBQztBQUN6QixjQUFjLDRCQUE0QixDQUFDO0FBQzNDLGNBQWMsa0JBQWtCLENBQUM7QUFDakMsY0FBYyxzQ0FBc0MsQ0FBQztBQUNyRCxjQUFjLGtDQUFrQyxDQUFDO0FBQ2pELGNBQWMsMkNBQTJDLENBQUM7QUFDMUQsY0FBYyxpQ0FBaUMsQ0FBQztBQUNoRCxjQUFjLGlDQUFpQyxDQUFDO0FBQ2hELGNBQWMsVUFBVSxDQUFDO0FBQ3pCLGNBQWMsaUJBQWlCLENBQUM7QUFDaEMsY0FBYyxlQUFlLENBQUM7QUFDOUIsY0FBYyxrQkFBa0IsQ0FBQztBQUVqQyxjQUFjLHdDQUF3QyxDQUFDO0FBQ3ZELGNBQWMsa0RBQWtELENBQUM7QUFDakUsY0FBYywrQkFBK0IsQ0FBQztBQUM5QyxjQUFjLGtEQUFrRCxDQUFDO0FBQ2pFLGNBQWMscURBQXFELENBQUM7QUFFcEUsY0FBYyxxQ0FBcUMsQ0FBQztBQUNwRCxjQUFjLHlCQUF5QixDQUFDO0FBQ3hDLGNBQWMsK0JBQStCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmV4cG9ydCAqIGZyb20gJy4vYmFzZS13aWRnZXQnO1xuZXhwb3J0ICogZnJvbSAnLi9jaGFydC11dGlscyc7XG5leHBvcnQgKiBmcm9tICcuL2dldC1jb2x1bW4tY29udGVudCc7XG5leHBvcnQgKiBmcm9tICcuL2ludGVyZmFjZS9hZ2dyZWdhdGlvbi9hZ2dyZWdhdGlvbic7XG5leHBvcnQgKiBmcm9tICcuL2ludGVyZmFjZS9hZ2dyZWdhdGlvbi9hZ2dyZWdhdGlvbi10eXBlJztcbmV4cG9ydCAqIGZyb20gJy4vaW50ZXJmYWNlL2NoYXJ0cy9jaGFydC10eXBlJztcbmV4cG9ydCAqIGZyb20gJy4vaW50ZXJmYWNlL2RhdGFzZXQvY2hhcnQtZGF0YXNldCc7XG5leHBvcnQgKiBmcm9tICcuL2ludGVyZmFjZS9kYXRhc2V0L2NoYXJ0LWRhdGFzZXQtb3B0aW9ucyc7XG5leHBvcnQgKiBmcm9tICcuL2ludGVyZmFjZS9kYXRhc2V0L2RhdGFzZXQnO1xuZXhwb3J0ICogZnJvbSAnLi9pbnRlcmZhY2UvZGF0YXNldC90YWJsZS1kYXRhc2V0JztcbmV4cG9ydCAqIGZyb20gJy4vaW50ZXJmYWNlL3JlcG9ydHMvcmVwb3J0JztcbmV4cG9ydCAqIGZyb20gJy4vaW50ZXJmYWNlL3JlcG9ydHMvcmVwb3J0LWNvbnRhaW5lcic7XG5leHBvcnQgKiBmcm9tICcuL2ludGVyZmFjZS9yZXBvcnRzL3JlcG9ydC1zdHJpbmctaWRlbnRpZmllcic7XG5leHBvcnQgKiBmcm9tICcuL2ludGVyZmFjZS9yZXBvcnRzL3JlcG9ydC12YXJpYWJsZSc7XG5leHBvcnQgKiBmcm9tICcuL2ludGVyZmFjZS9yZXBvcnRzLWluc3RhbmNlcy9yZXBvcnQtY29udGFpbmVyLWluc3RhbmNlJztcbmV4cG9ydCAqIGZyb20gJy4vaW50ZXJmYWNlL3JlcG9ydHMtaW5zdGFuY2VzL3JlcG9ydC1pbnN0YW5jZSc7XG5leHBvcnQgKiBmcm9tICcuL2ludGVyZmFjZS9zdHlsZXMnO1xuZXhwb3J0ICogZnJvbSAnLi9pbnRlcmZhY2Uvd2lkZ2V0cy9iYXNlLXdpZGdldCc7XG5leHBvcnQgKiBmcm9tICcuL2ludGVyZmFjZS93aWRnZXRzL2NoYXJ0LXdpZGdldCc7XG5leHBvcnQgKiBmcm9tICcuL2ludGVyZmFjZS93aWRnZXRzL2NvbHVtbi13aWRnZXQnO1xuZXhwb3J0ICogZnJvbSAnLi9pbnRlcmZhY2Uvd2lkZ2V0cy9jdXN0b20td2lkZ2V0JztcbmV4cG9ydCAqIGZyb20gJy4vaW50ZXJmYWNlL3dpZGdldHMvZGF0YS13aWRnZXQnO1xuZXhwb3J0ICogZnJvbSAnLi9pbnRlcmZhY2Uvd2lkZ2V0cy9maWx0ZXInO1xuZXhwb3J0ICogZnJvbSAnLi9pbnRlcmZhY2Uvd2lkZ2V0cy9mb3JtdWxhLXdpZGdldCc7XG5leHBvcnQgKiBmcm9tICcuL2ludGVyZmFjZS93aWRnZXRzL2ltYWdlLWNvbnRhaW5lci13aWRnZXQnO1xuZXhwb3J0ICogZnJvbSAnLi9pbnRlcmZhY2Uvd2lkZ2V0cy9pbWFnZS13aWRnZXQnO1xuZXhwb3J0ICogZnJvbSAnLi9pbnRlcmZhY2Uvd2lkZ2V0cy9sYXlvdXQtd2lkZ2V0JztcbmV4cG9ydCAqIGZyb20gJy4vaW50ZXJmYWNlL3dpZGdldHMvbWFwLXdpZGdldCc7XG5leHBvcnQgKiBmcm9tICcuL2ludGVyZmFjZS93aWRnZXRzL3BhZ2UtYnJlYWstd2lkZ2V0JztcbmV4cG9ydCAqIGZyb20gJy4vaW50ZXJmYWNlL3dpZGdldHMvdGFibGUtd2lkZ2V0JztcbmV4cG9ydCAqIGZyb20gJy4vaW50ZXJmYWNlL3dpZGdldHMvdGV4dC13aWRnZXQnO1xuZXhwb3J0ICogZnJvbSAnLi9pbnRlcmZhY2Uvd2lkZ2V0cy93aWRnZXQnO1xuZXhwb3J0ICogZnJvbSAnLi9pbnRlcmZhY2Uvd2lkZ2V0cy93aWRnZXQtY29tcG9uZW50cy1tYXAnO1xuZXhwb3J0ICogZnJvbSAnLi9pbnRlcmZhY2Uvd2lkZ2V0cy93aWRnZXQtdHlwZSc7XG5leHBvcnQgKiBmcm9tICcuL2ludGVyZmFjZS93aWRnZXRzL3dpZGdldC13aXRoLWNvbnRlbnQnO1xuZXhwb3J0ICogZnJvbSAnLi9pbnRlcmZhY2Uvd2lkZ2V0cy1pbnN0YW5jZXMvYmFzZS13aWRnZXQtaW5zdGFuY2UnO1xuZXhwb3J0ICogZnJvbSAnLi9pbnRlcmZhY2Uvd2lkZ2V0cy1pbnN0YW5jZXMvY2hhcnQtd2lkZ2V0LWluc3RhbmNlJztcbmV4cG9ydCAqIGZyb20gJy4vaW50ZXJmYWNlL3dpZGdldHMtaW5zdGFuY2VzL2NvbHVtbi13aWRnZXQtaW5zdGFuY2UnO1xuZXhwb3J0ICogZnJvbSAnLi9pbnRlcmZhY2Uvd2lkZ2V0cy1pbnN0YW5jZXMvZGF0YS13aWRnZXQtaW5zdGFuY2UnO1xuZXhwb3J0ICogZnJvbSAnLi9pbnRlcmZhY2Uvd2lkZ2V0cy1pbnN0YW5jZXMvZmlsdGVyLWluc3RhbmNlJztcbmV4cG9ydCAqIGZyb20gJy4vaW50ZXJmYWNlL3dpZGdldHMtaW5zdGFuY2VzL2Zvcm11bGEtd2lkZ2V0LWluc3RhbmNlJztcbmV4cG9ydCAqIGZyb20gJy4vaW50ZXJmYWNlL3dpZGdldHMtaW5zdGFuY2VzL2ltYWdlLWNvbnRhaW5lci13aWRnZXQtaW5zdGFuY2UnO1xuZXhwb3J0ICogZnJvbSAnLi9pbnRlcmZhY2Uvd2lkZ2V0cy1pbnN0YW5jZXMvaW1hZ2Utd2lkZ2V0LWluc3RhbmNlJztcbmV4cG9ydCAqIGZyb20gJy4vaW50ZXJmYWNlL3dpZGdldHMtaW5zdGFuY2VzL2xheW91dC13aWRnZXQtaW5zdGFuY2UnO1xuZXhwb3J0ICogZnJvbSAnLi9pbnRlcmZhY2Uvd2lkZ2V0cy1pbnN0YW5jZXMvbWFwLXdpZGdldC1pbnN0YW5jZSc7XG5leHBvcnQgKiBmcm9tICcuL2ludGVyZmFjZS93aWRnZXRzLWluc3RhbmNlcy9wYWdlLWJyZWFrLXdpZGdldC1pbnN0YW5jZSc7XG5leHBvcnQgKiBmcm9tICcuL2ludGVyZmFjZS93aWRnZXRzLWluc3RhbmNlcy90YWJsZS13aWRnZXQtaW5zdGFuY2UnO1xuZXhwb3J0ICogZnJvbSAnLi9pbnRlcmZhY2Uvd2lkZ2V0cy1pbnN0YW5jZXMvdGV4dC13aWRnZXQtaW5zdGFuY2UnO1xuZXhwb3J0ICogZnJvbSAnLi9pbnRlcmZhY2Uvd2lkZ2V0cy1pbnN0YW5jZXMvd2lkZ2V0LWluc3RhbmNlJztcbmV4cG9ydCAqIGZyb20gJy4vaW50ZXJmYWNlL3dpZGdldHMtaW5zdGFuY2VzL3dpZGdldC13aXRoLWNvbnRlbnQtaW5zdGFuY2UnO1xuZXhwb3J0ICogZnJvbSAnLi9yZXBvcnQnO1xuZXhwb3J0ICogZnJvbSAnLi9yZXBvcnQtc3RyaW5nLWlkZW50aWZpZXInO1xuZXhwb3J0ICogZnJvbSAnLi9yZXBvcnRzLW1vZHVsZSc7XG5leHBvcnQgKiBmcm9tICcuL3NlcmlhbGl6ZXJzL2FnZ3JlZ2F0aW9uLXNlcmlhbGl6ZXInO1xuZXhwb3J0ICogZnJvbSAnLi9zZXJpYWxpemVycy9kYXRhc2V0LXNlcmlhbGl6ZXInO1xuZXhwb3J0ICogZnJvbSAnLi9zZXJpYWxpemVycy9yZXBvcnQtY29udGFpbmVyLXNlcmlhbGl6ZXInO1xuZXhwb3J0ICogZnJvbSAnLi9zZXJpYWxpemVycy9yZXBvcnQtc2VyaWFsaXplcic7XG5leHBvcnQgKiBmcm9tICcuL3NlcmlhbGl6ZXJzL3dpZGdldC1zZXJpYWxpemVyJztcbmV4cG9ydCAqIGZyb20gJy4vd2lkZ2V0JztcbmV4cG9ydCAqIGZyb20gJy4vd2lkZ2V0LWV4cG9ydCc7XG5leHBvcnQgKiBmcm9tICcuL3dpZGdldC1ob3N0JztcbmV4cG9ydCAqIGZyb20gJy4vd2lkZ2V0LXNlcnZpY2UnO1xuXG5leHBvcnQgKiBmcm9tICcuL3V0aWxzL2FnZ3JlZ2F0aW9uL2NyZWF0ZS1hZ2dyZWdhdGlvbic7XG5leHBvcnQgKiBmcm9tICcuL3V0aWxzL3JlcG9ydHMtaW5zdGFuY2VzL2NyZWF0ZS1yZXBvcnQtaW5zdGFuY2UnO1xuZXhwb3J0ICogZnJvbSAnLi91dGlscy93aWRnZXRzL2NyZWF0ZS13aWRnZXQnO1xuZXhwb3J0ICogZnJvbSAnLi91dGlscy93aWRnZXRzLWluc3RhbmNlcy9jcmVhdGUtd2lkZ2V0LWluc3RhbmNlJztcbmV4cG9ydCAqIGZyb20gJy4vdXRpbHMvd2lkZ2V0cy1pbnN0YW5jZXMvd2lkZ2V0LXRvLXdpZGdldC1pbnN0YW5jZSc7XG5cbmV4cG9ydCAqIGZyb20gJy4vYXV0b21hdGljLXJlcG9ydC9hdXRvbWF0aWMtcmVwb3J0JztcbmV4cG9ydCAqIGZyb20gJy4veGxzLXJlcG9ydC94bHMtcmVwb3J0JztcbmV4cG9ydCAqIGZyb20gJy4vcmVwb3J0LXRvLXBkZi9yZXBvcnQtdG8tcGRmJztcbiJdfQ==