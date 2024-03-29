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
import { isHeatMapWidget } from '../widgets/is-heat-map-widget';
export const isHeatMapWidgetInstance = (instance) => {
    return instance != null && isHeatMapWidget(instance.widget);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXMtaGVhdC1tYXAtd2lkZ2V0LWluc3RhbmNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9yZXBvcnRzL3NyYy91dGlscy93aWRnZXRzLWluc3RhbmNlcy9pcy1oZWF0LW1hcC13aWRnZXQtaW5zdGFuY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBSUgsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLCtCQUErQixDQUFDO0FBRTlELE1BQU0sQ0FBQyxNQUFNLHVCQUF1QixHQUFHLENBQ3JDLFFBQTJCLEVBQ1csRUFBRTtJQUN4QyxPQUFPLFFBQVEsSUFBSSxJQUFJLElBQUksZUFBZSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUM5RCxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmSGVhdE1hcFdpZGdldEluc3RhbmNlfSBmcm9tICcuLi8uLi9pbnRlcmZhY2Uvd2lkZ2V0cy1pbnN0YW5jZXMvaGVhdC1tYXAtd2lkZ2V0LWluc3RhbmNlJztcbmltcG9ydCB7QWpmV2lkZ2V0SW5zdGFuY2V9IGZyb20gJy4uLy4uL2ludGVyZmFjZS93aWRnZXRzLWluc3RhbmNlcy93aWRnZXQtaW5zdGFuY2UnO1xuaW1wb3J0IHtpc0hlYXRNYXBXaWRnZXR9IGZyb20gJy4uL3dpZGdldHMvaXMtaGVhdC1tYXAtd2lkZ2V0JztcblxuZXhwb3J0IGNvbnN0IGlzSGVhdE1hcFdpZGdldEluc3RhbmNlID0gKFxuICBpbnN0YW5jZTogQWpmV2lkZ2V0SW5zdGFuY2UsXG4pOiBpbnN0YW5jZSBpcyBBamZIZWF0TWFwV2lkZ2V0SW5zdGFuY2UgPT4ge1xuICByZXR1cm4gaW5zdGFuY2UgIT0gbnVsbCAmJiBpc0hlYXRNYXBXaWRnZXQoaW5zdGFuY2Uud2lkZ2V0KTtcbn07XG4iXX0=