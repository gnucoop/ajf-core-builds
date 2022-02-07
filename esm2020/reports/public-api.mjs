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
export * from './interface/widgets/chart-widget';
export * from './interface/widgets/column-widget';
export * from './interface/widgets/custom-widget';
export * from './interface/widgets/data-widget';
export * from './interface/widgets/formula-widget';
export * from './interface/widgets/image-container-widget';
export * from './interface/widgets/image-widget';
export * from './interface/widgets/layout-widget';
export * from './interface/widgets/map-widget';
export * from './interface/widgets/page-break-widget';
export * from './interface/widgets/table-widget';
export * from './interface/widgets/text-widget';
export * from './interface/widgets/widget';
export * from './interface/widgets/widget-type';
export * from './interface/widgets/widget-with-content';
export * from './interface/widgets-instances/chart-widget-instance';
export * from './interface/widgets-instances/column-widget-instance';
export * from './interface/widgets-instances/data-widget-instance';
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
export * from './interface/widgets/widget-components-map';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVibGljLWFwaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL3JlcG9ydHMvcHVibGljLWFwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxjQUFjLGVBQWUsQ0FBQztBQUM5QixjQUFjLGVBQWUsQ0FBQztBQUM5QixjQUFjLHNCQUFzQixDQUFDO0FBQ3JDLGNBQWMscUNBQXFDLENBQUM7QUFDcEQsY0FBYywwQ0FBMEMsQ0FBQztBQUN6RCxjQUFjLCtCQUErQixDQUFDO0FBQzlDLGNBQWMsbUNBQW1DLENBQUM7QUFDbEQsY0FBYywyQ0FBMkMsQ0FBQztBQUMxRCxjQUFjLDZCQUE2QixDQUFDO0FBQzVDLGNBQWMsbUNBQW1DLENBQUM7QUFDbEQsY0FBYyw0QkFBNEIsQ0FBQztBQUMzQyxjQUFjLHNDQUFzQyxDQUFDO0FBQ3JELGNBQWMsOENBQThDLENBQUM7QUFDN0QsY0FBYyxxQ0FBcUMsQ0FBQztBQUNwRCxjQUFjLHlEQUF5RCxDQUFDO0FBQ3hFLGNBQWMsK0NBQStDLENBQUM7QUFDOUQsY0FBYyxvQkFBb0IsQ0FBQztBQUNuQyxjQUFjLGtDQUFrQyxDQUFDO0FBQ2pELGNBQWMsbUNBQW1DLENBQUM7QUFDbEQsY0FBYyxtQ0FBbUMsQ0FBQztBQUNsRCxjQUFjLGlDQUFpQyxDQUFDO0FBQ2hELGNBQWMsb0NBQW9DLENBQUM7QUFDbkQsY0FBYyw0Q0FBNEMsQ0FBQztBQUMzRCxjQUFjLGtDQUFrQyxDQUFDO0FBQ2pELGNBQWMsbUNBQW1DLENBQUM7QUFDbEQsY0FBYyxnQ0FBZ0MsQ0FBQztBQUMvQyxjQUFjLHVDQUF1QyxDQUFDO0FBQ3RELGNBQWMsa0NBQWtDLENBQUM7QUFDakQsY0FBYyxpQ0FBaUMsQ0FBQztBQUNoRCxjQUFjLDRCQUE0QixDQUFDO0FBQzNDLGNBQWMsaUNBQWlDLENBQUM7QUFDaEQsY0FBYyx5Q0FBeUMsQ0FBQztBQUN4RCxjQUFjLHFEQUFxRCxDQUFDO0FBQ3BFLGNBQWMsc0RBQXNELENBQUM7QUFDckUsY0FBYyxvREFBb0QsQ0FBQztBQUNuRSxjQUFjLHVEQUF1RCxDQUFDO0FBQ3RFLGNBQWMsK0RBQStELENBQUM7QUFDOUUsY0FBYyxxREFBcUQsQ0FBQztBQUNwRSxjQUFjLHNEQUFzRCxDQUFDO0FBQ3JFLGNBQWMsbURBQW1ELENBQUM7QUFDbEUsY0FBYywwREFBMEQsQ0FBQztBQUN6RSxjQUFjLHFEQUFxRCxDQUFDO0FBQ3BFLGNBQWMsb0RBQW9ELENBQUM7QUFDbkUsY0FBYywrQ0FBK0MsQ0FBQztBQUM5RCxjQUFjLDREQUE0RCxDQUFDO0FBQzNFLGNBQWMsVUFBVSxDQUFDO0FBQ3pCLGNBQWMsNEJBQTRCLENBQUM7QUFDM0MsY0FBYyxrQkFBa0IsQ0FBQztBQUNqQyxjQUFjLHNDQUFzQyxDQUFDO0FBQ3JELGNBQWMsa0NBQWtDLENBQUM7QUFDakQsY0FBYywyQ0FBMkMsQ0FBQztBQUMxRCxjQUFjLGlDQUFpQyxDQUFDO0FBQ2hELGNBQWMsaUNBQWlDLENBQUM7QUFDaEQsY0FBYyxVQUFVLENBQUM7QUFDekIsY0FBYywyQ0FBMkMsQ0FBQztBQUMxRCxjQUFjLGlCQUFpQixDQUFDO0FBQ2hDLGNBQWMsZUFBZSxDQUFDO0FBQzlCLGNBQWMsa0JBQWtCLENBQUM7QUFFakMsY0FBYyx3Q0FBd0MsQ0FBQztBQUN2RCxjQUFjLGtEQUFrRCxDQUFDO0FBQ2pFLGNBQWMsK0JBQStCLENBQUM7QUFDOUMsY0FBYyxrREFBa0QsQ0FBQztBQUNqRSxjQUFjLHFEQUFxRCxDQUFDO0FBRXBFLGNBQWMscUNBQXFDLENBQUM7QUFDcEQsY0FBYyx5QkFBeUIsQ0FBQztBQUN4QyxjQUFjLCtCQUErQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5leHBvcnQgKiBmcm9tICcuL2Jhc2Utd2lkZ2V0JztcbmV4cG9ydCAqIGZyb20gJy4vY2hhcnQtdXRpbHMnO1xuZXhwb3J0ICogZnJvbSAnLi9nZXQtY29sdW1uLWNvbnRlbnQnO1xuZXhwb3J0ICogZnJvbSAnLi9pbnRlcmZhY2UvYWdncmVnYXRpb24vYWdncmVnYXRpb24nO1xuZXhwb3J0ICogZnJvbSAnLi9pbnRlcmZhY2UvYWdncmVnYXRpb24vYWdncmVnYXRpb24tdHlwZSc7XG5leHBvcnQgKiBmcm9tICcuL2ludGVyZmFjZS9jaGFydHMvY2hhcnQtdHlwZSc7XG5leHBvcnQgKiBmcm9tICcuL2ludGVyZmFjZS9kYXRhc2V0L2NoYXJ0LWRhdGFzZXQnO1xuZXhwb3J0ICogZnJvbSAnLi9pbnRlcmZhY2UvZGF0YXNldC9jaGFydC1kYXRhc2V0LW9wdGlvbnMnO1xuZXhwb3J0ICogZnJvbSAnLi9pbnRlcmZhY2UvZGF0YXNldC9kYXRhc2V0JztcbmV4cG9ydCAqIGZyb20gJy4vaW50ZXJmYWNlL2RhdGFzZXQvdGFibGUtZGF0YXNldCc7XG5leHBvcnQgKiBmcm9tICcuL2ludGVyZmFjZS9yZXBvcnRzL3JlcG9ydCc7XG5leHBvcnQgKiBmcm9tICcuL2ludGVyZmFjZS9yZXBvcnRzL3JlcG9ydC1jb250YWluZXInO1xuZXhwb3J0ICogZnJvbSAnLi9pbnRlcmZhY2UvcmVwb3J0cy9yZXBvcnQtc3RyaW5nLWlkZW50aWZpZXInO1xuZXhwb3J0ICogZnJvbSAnLi9pbnRlcmZhY2UvcmVwb3J0cy9yZXBvcnQtdmFyaWFibGUnO1xuZXhwb3J0ICogZnJvbSAnLi9pbnRlcmZhY2UvcmVwb3J0cy1pbnN0YW5jZXMvcmVwb3J0LWNvbnRhaW5lci1pbnN0YW5jZSc7XG5leHBvcnQgKiBmcm9tICcuL2ludGVyZmFjZS9yZXBvcnRzLWluc3RhbmNlcy9yZXBvcnQtaW5zdGFuY2UnO1xuZXhwb3J0ICogZnJvbSAnLi9pbnRlcmZhY2Uvc3R5bGVzJztcbmV4cG9ydCAqIGZyb20gJy4vaW50ZXJmYWNlL3dpZGdldHMvY2hhcnQtd2lkZ2V0JztcbmV4cG9ydCAqIGZyb20gJy4vaW50ZXJmYWNlL3dpZGdldHMvY29sdW1uLXdpZGdldCc7XG5leHBvcnQgKiBmcm9tICcuL2ludGVyZmFjZS93aWRnZXRzL2N1c3RvbS13aWRnZXQnO1xuZXhwb3J0ICogZnJvbSAnLi9pbnRlcmZhY2Uvd2lkZ2V0cy9kYXRhLXdpZGdldCc7XG5leHBvcnQgKiBmcm9tICcuL2ludGVyZmFjZS93aWRnZXRzL2Zvcm11bGEtd2lkZ2V0JztcbmV4cG9ydCAqIGZyb20gJy4vaW50ZXJmYWNlL3dpZGdldHMvaW1hZ2UtY29udGFpbmVyLXdpZGdldCc7XG5leHBvcnQgKiBmcm9tICcuL2ludGVyZmFjZS93aWRnZXRzL2ltYWdlLXdpZGdldCc7XG5leHBvcnQgKiBmcm9tICcuL2ludGVyZmFjZS93aWRnZXRzL2xheW91dC13aWRnZXQnO1xuZXhwb3J0ICogZnJvbSAnLi9pbnRlcmZhY2Uvd2lkZ2V0cy9tYXAtd2lkZ2V0JztcbmV4cG9ydCAqIGZyb20gJy4vaW50ZXJmYWNlL3dpZGdldHMvcGFnZS1icmVhay13aWRnZXQnO1xuZXhwb3J0ICogZnJvbSAnLi9pbnRlcmZhY2Uvd2lkZ2V0cy90YWJsZS13aWRnZXQnO1xuZXhwb3J0ICogZnJvbSAnLi9pbnRlcmZhY2Uvd2lkZ2V0cy90ZXh0LXdpZGdldCc7XG5leHBvcnQgKiBmcm9tICcuL2ludGVyZmFjZS93aWRnZXRzL3dpZGdldCc7XG5leHBvcnQgKiBmcm9tICcuL2ludGVyZmFjZS93aWRnZXRzL3dpZGdldC10eXBlJztcbmV4cG9ydCAqIGZyb20gJy4vaW50ZXJmYWNlL3dpZGdldHMvd2lkZ2V0LXdpdGgtY29udGVudCc7XG5leHBvcnQgKiBmcm9tICcuL2ludGVyZmFjZS93aWRnZXRzLWluc3RhbmNlcy9jaGFydC13aWRnZXQtaW5zdGFuY2UnO1xuZXhwb3J0ICogZnJvbSAnLi9pbnRlcmZhY2Uvd2lkZ2V0cy1pbnN0YW5jZXMvY29sdW1uLXdpZGdldC1pbnN0YW5jZSc7XG5leHBvcnQgKiBmcm9tICcuL2ludGVyZmFjZS93aWRnZXRzLWluc3RhbmNlcy9kYXRhLXdpZGdldC1pbnN0YW5jZSc7XG5leHBvcnQgKiBmcm9tICcuL2ludGVyZmFjZS93aWRnZXRzLWluc3RhbmNlcy9mb3JtdWxhLXdpZGdldC1pbnN0YW5jZSc7XG5leHBvcnQgKiBmcm9tICcuL2ludGVyZmFjZS93aWRnZXRzLWluc3RhbmNlcy9pbWFnZS1jb250YWluZXItd2lkZ2V0LWluc3RhbmNlJztcbmV4cG9ydCAqIGZyb20gJy4vaW50ZXJmYWNlL3dpZGdldHMtaW5zdGFuY2VzL2ltYWdlLXdpZGdldC1pbnN0YW5jZSc7XG5leHBvcnQgKiBmcm9tICcuL2ludGVyZmFjZS93aWRnZXRzLWluc3RhbmNlcy9sYXlvdXQtd2lkZ2V0LWluc3RhbmNlJztcbmV4cG9ydCAqIGZyb20gJy4vaW50ZXJmYWNlL3dpZGdldHMtaW5zdGFuY2VzL21hcC13aWRnZXQtaW5zdGFuY2UnO1xuZXhwb3J0ICogZnJvbSAnLi9pbnRlcmZhY2Uvd2lkZ2V0cy1pbnN0YW5jZXMvcGFnZS1icmVhay13aWRnZXQtaW5zdGFuY2UnO1xuZXhwb3J0ICogZnJvbSAnLi9pbnRlcmZhY2Uvd2lkZ2V0cy1pbnN0YW5jZXMvdGFibGUtd2lkZ2V0LWluc3RhbmNlJztcbmV4cG9ydCAqIGZyb20gJy4vaW50ZXJmYWNlL3dpZGdldHMtaW5zdGFuY2VzL3RleHQtd2lkZ2V0LWluc3RhbmNlJztcbmV4cG9ydCAqIGZyb20gJy4vaW50ZXJmYWNlL3dpZGdldHMtaW5zdGFuY2VzL3dpZGdldC1pbnN0YW5jZSc7XG5leHBvcnQgKiBmcm9tICcuL2ludGVyZmFjZS93aWRnZXRzLWluc3RhbmNlcy93aWRnZXQtd2l0aC1jb250ZW50LWluc3RhbmNlJztcbmV4cG9ydCAqIGZyb20gJy4vcmVwb3J0JztcbmV4cG9ydCAqIGZyb20gJy4vcmVwb3J0LXN0cmluZy1pZGVudGlmaWVyJztcbmV4cG9ydCAqIGZyb20gJy4vcmVwb3J0cy1tb2R1bGUnO1xuZXhwb3J0ICogZnJvbSAnLi9zZXJpYWxpemVycy9hZ2dyZWdhdGlvbi1zZXJpYWxpemVyJztcbmV4cG9ydCAqIGZyb20gJy4vc2VyaWFsaXplcnMvZGF0YXNldC1zZXJpYWxpemVyJztcbmV4cG9ydCAqIGZyb20gJy4vc2VyaWFsaXplcnMvcmVwb3J0LWNvbnRhaW5lci1zZXJpYWxpemVyJztcbmV4cG9ydCAqIGZyb20gJy4vc2VyaWFsaXplcnMvcmVwb3J0LXNlcmlhbGl6ZXInO1xuZXhwb3J0ICogZnJvbSAnLi9zZXJpYWxpemVycy93aWRnZXQtc2VyaWFsaXplcic7XG5leHBvcnQgKiBmcm9tICcuL3dpZGdldCc7XG5leHBvcnQgKiBmcm9tICcuL2ludGVyZmFjZS93aWRnZXRzL3dpZGdldC1jb21wb25lbnRzLW1hcCc7XG5leHBvcnQgKiBmcm9tICcuL3dpZGdldC1leHBvcnQnO1xuZXhwb3J0ICogZnJvbSAnLi93aWRnZXQtaG9zdCc7XG5leHBvcnQgKiBmcm9tICcuL3dpZGdldC1zZXJ2aWNlJztcblxuZXhwb3J0ICogZnJvbSAnLi91dGlscy9hZ2dyZWdhdGlvbi9jcmVhdGUtYWdncmVnYXRpb24nO1xuZXhwb3J0ICogZnJvbSAnLi91dGlscy9yZXBvcnRzLWluc3RhbmNlcy9jcmVhdGUtcmVwb3J0LWluc3RhbmNlJztcbmV4cG9ydCAqIGZyb20gJy4vdXRpbHMvd2lkZ2V0cy9jcmVhdGUtd2lkZ2V0JztcbmV4cG9ydCAqIGZyb20gJy4vdXRpbHMvd2lkZ2V0cy1pbnN0YW5jZXMvY3JlYXRlLXdpZGdldC1pbnN0YW5jZSc7XG5leHBvcnQgKiBmcm9tICcuL3V0aWxzL3dpZGdldHMtaW5zdGFuY2VzL3dpZGdldC10by13aWRnZXQtaW5zdGFuY2UnO1xuXG5leHBvcnQgKiBmcm9tICcuL2F1dG9tYXRpYy1yZXBvcnQvYXV0b21hdGljLXJlcG9ydCc7XG5leHBvcnQgKiBmcm9tICcuL3hscy1yZXBvcnQveGxzLXJlcG9ydCc7XG5leHBvcnQgKiBmcm9tICcuL3JlcG9ydC10by1wZGYvcmVwb3J0LXRvLXBkZic7XG4iXX0=