/**
 * @fileoverview added by tsickle
 * Generated from: src/core/reports/utils/reports-instances/create-report-instance.ts
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
import { evaluateExpression } from '@ajf/core/models';
import { createReportContainerInstance } from './create-report-container-instance';
/**
 * @param {?} report
 * @param {?} context
 * @param {?} ts
 * @return {?}
 */
export function createReportInstance(report, context, ts) {
    (report.variables || []).forEach((/**
     * @param {?} variable
     * @return {?}
     */
    variable => {
        context[variable.name] = evaluateExpression(variable.formula.formula, context);
    }));
    return {
        report,
        header: report.header ? createReportContainerInstance(report.header, context, ts) : undefined,
        content: report.content ? createReportContainerInstance(report.content, context, ts) :
            undefined,
        footer: report.footer ? createReportContainerInstance(report.footer, context, ts) : undefined,
        styles: report.styles || {},
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLXJlcG9ydC1pbnN0YW5jZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL3JlcG9ydHMvdXRpbHMvcmVwb3J0cy1pbnN0YW5jZXMvY3JlYXRlLXJlcG9ydC1pbnN0YW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCQSxPQUFPLEVBQWEsa0JBQWtCLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQU1oRSxPQUFPLEVBQUMsNkJBQTZCLEVBQUMsTUFBTSxvQ0FBb0MsQ0FBQzs7Ozs7OztBQUVqRixNQUFNLFVBQVUsb0JBQW9CLENBQ2hDLE1BQWlCLEVBQUUsT0FBbUIsRUFBRSxFQUFvQjtJQUM5RCxDQUFDLE1BQU0sQ0FBQyxTQUFTLElBQUksRUFBRSxDQUFDLENBQUMsT0FBTzs7OztJQUFDLFFBQVEsQ0FBQyxFQUFFO1FBQzFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsa0JBQWtCLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDakYsQ0FBQyxFQUFDLENBQUM7SUFDSCxPQUFPO1FBQ0wsTUFBTTtRQUNOLE1BQU0sRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyw2QkFBNkIsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUztRQUM3RixPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsNkJBQTZCLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUM1RCxTQUFTO1FBQ25DLE1BQU0sRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyw2QkFBNkIsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUztRQUM3RixNQUFNLEVBQUUsTUFBTSxDQUFDLE1BQU0sSUFBSSxFQUFFO0tBQzVCLENBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSAyMDE4IEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmQ29udGV4dCwgZXZhbHVhdGVFeHByZXNzaW9ufSBmcm9tICdAYWpmL2NvcmUvbW9kZWxzJztcbmltcG9ydCB7VHJhbnNsYXRlU2VydmljZX0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5cbmltcG9ydCB7QWpmUmVwb3J0SW5zdGFuY2V9IGZyb20gJy4uLy4uL2ludGVyZmFjZS9yZXBvcnRzLWluc3RhbmNlcy9yZXBvcnQtaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZSZXBvcnR9IGZyb20gJy4uLy4uL2ludGVyZmFjZS9yZXBvcnRzL3JlcG9ydCc7XG5cbmltcG9ydCB7Y3JlYXRlUmVwb3J0Q29udGFpbmVySW5zdGFuY2V9IGZyb20gJy4vY3JlYXRlLXJlcG9ydC1jb250YWluZXItaW5zdGFuY2UnO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUmVwb3J0SW5zdGFuY2UoXG4gICAgcmVwb3J0OiBBamZSZXBvcnQsIGNvbnRleHQ6IEFqZkNvbnRleHQsIHRzOiBUcmFuc2xhdGVTZXJ2aWNlKTogQWpmUmVwb3J0SW5zdGFuY2Uge1xuICAocmVwb3J0LnZhcmlhYmxlcyB8fCBbXSkuZm9yRWFjaCh2YXJpYWJsZSA9PiB7XG4gICAgY29udGV4dFt2YXJpYWJsZS5uYW1lXSA9IGV2YWx1YXRlRXhwcmVzc2lvbih2YXJpYWJsZS5mb3JtdWxhLmZvcm11bGEsIGNvbnRleHQpO1xuICB9KTtcbiAgcmV0dXJuIHtcbiAgICByZXBvcnQsXG4gICAgaGVhZGVyOiByZXBvcnQuaGVhZGVyID8gY3JlYXRlUmVwb3J0Q29udGFpbmVySW5zdGFuY2UocmVwb3J0LmhlYWRlciwgY29udGV4dCwgdHMpIDogdW5kZWZpbmVkLFxuICAgIGNvbnRlbnQ6IHJlcG9ydC5jb250ZW50ID8gY3JlYXRlUmVwb3J0Q29udGFpbmVySW5zdGFuY2UocmVwb3J0LmNvbnRlbnQsIGNvbnRleHQsIHRzKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1bmRlZmluZWQsXG4gICAgZm9vdGVyOiByZXBvcnQuZm9vdGVyID8gY3JlYXRlUmVwb3J0Q29udGFpbmVySW5zdGFuY2UocmVwb3J0LmZvb3RlciwgY29udGV4dCwgdHMpIDogdW5kZWZpbmVkLFxuICAgIHN0eWxlczogcmVwb3J0LnN0eWxlcyB8fCB7fSxcbiAgfTtcbn1cbiJdfQ==