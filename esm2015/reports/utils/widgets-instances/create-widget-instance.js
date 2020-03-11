/**
 * @fileoverview added by tsickle
 * Generated from: src/core/reports/utils/widgets-instances/create-widget-instance.ts
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
import { evaluateExpression } from '@ajf/core/models';
/**
 * @param {?} widget
 * @param {?} context
 * @param {?} _ts
 * @return {?}
 */
export function createWidgetInstance(widget, context, _ts) {
    return {
        widget,
        widgetType: widget.widgetType,
        visible: evaluateExpression(widget.visibility.condition, context),
        styles: widget.styles || {},
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLXdpZGdldC1pbnN0YW5jZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL3JlcG9ydHMvdXRpbHMvd2lkZ2V0cy1pbnN0YW5jZXMvY3JlYXRlLXdpZGdldC1pbnN0YW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCQSxPQUFPLEVBQWEsa0JBQWtCLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQzs7Ozs7OztBQU1oRSxNQUFNLFVBQVUsb0JBQW9CLENBQ2hDLE1BQWlCLEVBQUUsT0FBbUIsRUFBRSxHQUFxQjtJQUMvRCxPQUFPO1FBQ0wsTUFBTTtRQUNOLFVBQVUsRUFBRSxNQUFNLENBQUMsVUFBVTtRQUM3QixPQUFPLEVBQUUsa0JBQWtCLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDO1FBQ2pFLE1BQU0sRUFBRSxNQUFNLENBQUMsTUFBTSxJQUFJLEVBQUU7S0FDNUIsQ0FBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmQ29udGV4dCwgZXZhbHVhdGVFeHByZXNzaW9ufSBmcm9tICdAYWpmL2NvcmUvbW9kZWxzJztcbmltcG9ydCB7VHJhbnNsYXRlU2VydmljZX0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5cbmltcG9ydCB7QWpmV2lkZ2V0SW5zdGFuY2V9IGZyb20gJy4uLy4uL2ludGVyZmFjZS93aWRnZXRzLWluc3RhbmNlcy93aWRnZXQtaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZXaWRnZXR9IGZyb20gJy4uLy4uL2ludGVyZmFjZS93aWRnZXRzL3dpZGdldCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVXaWRnZXRJbnN0YW5jZShcbiAgICB3aWRnZXQ6IEFqZldpZGdldCwgY29udGV4dDogQWpmQ29udGV4dCwgX3RzOiBUcmFuc2xhdGVTZXJ2aWNlKTogQWpmV2lkZ2V0SW5zdGFuY2Uge1xuICByZXR1cm4ge1xuICAgIHdpZGdldCxcbiAgICB3aWRnZXRUeXBlOiB3aWRnZXQud2lkZ2V0VHlwZSxcbiAgICB2aXNpYmxlOiBldmFsdWF0ZUV4cHJlc3Npb24od2lkZ2V0LnZpc2liaWxpdHkuY29uZGl0aW9uLCBjb250ZXh0KSxcbiAgICBzdHlsZXM6IHdpZGdldC5zdHlsZXMgfHwge30sXG4gIH07XG59XG4iXX0=