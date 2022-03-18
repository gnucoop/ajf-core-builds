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
import { AjfWidgetSerializer } from './widget-serializer';
export class AjfReportContainerSerializer {
    static fromJson(json) {
        json.content = (json.content || []).map(c => AjfWidgetSerializer.fromJson(c));
        return { ...json, content: json.content, styles: json.styles || {} };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwb3J0LWNvbnRhaW5lci1zZXJpYWxpemVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9yZXBvcnRzL3NyYy9zZXJpYWxpemVycy9yZXBvcnQtY29udGFpbmVyLXNlcmlhbGl6ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBR0gsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFFeEQsTUFBTSxPQUFPLDRCQUE0QjtJQUN2QyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQWlDO1FBQy9DLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzlFLE9BQU8sRUFBQyxHQUFHLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQVEsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sSUFBSSxFQUFFLEVBQUMsQ0FBQztJQUN0RSxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmUmVwb3J0Q29udGFpbmVyfSBmcm9tICcuLi9pbnRlcmZhY2UvcmVwb3J0cy9yZXBvcnQtY29udGFpbmVyJztcbmltcG9ydCB7QWpmV2lkZ2V0U2VyaWFsaXplcn0gZnJvbSAnLi93aWRnZXQtc2VyaWFsaXplcic7XG5cbmV4cG9ydCBjbGFzcyBBamZSZXBvcnRDb250YWluZXJTZXJpYWxpemVyIHtcbiAgc3RhdGljIGZyb21Kc29uKGpzb246IFBhcnRpYWw8QWpmUmVwb3J0Q29udGFpbmVyPik6IEFqZlJlcG9ydENvbnRhaW5lciB7XG4gICAganNvbi5jb250ZW50ID0gKGpzb24uY29udGVudCB8fCBbXSkubWFwKGMgPT4gQWpmV2lkZ2V0U2VyaWFsaXplci5mcm9tSnNvbihjKSk7XG4gICAgcmV0dXJuIHsuLi5qc29uLCBjb250ZW50OiBqc29uLmNvbnRlbnQhLCBzdHlsZXM6IGpzb24uc3R5bGVzIHx8IHt9fTtcbiAgfVxufVxuIl19