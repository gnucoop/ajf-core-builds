/**
 * @fileoverview added by tsickle
 * Generated from: src/core/reports/serializers/report-serializer.ts
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
import { createReport } from '../utils/reports/create-report';
import { AjfReportContainerSerializer } from './report-container-serializer';
export class AjfReportSerializer {
    /**
     * @param {?} json
     * @return {?}
     */
    static fromJson(json) {
        /** @type {?} */
        const containers = ['header', 'footer', 'content'];
        containers.forEach((/**
         * @param {?} c
         * @return {?}
         */
        c => {
            if (json[c]) {
                ((/** @type {?} */ (json[c]))) =
                    AjfReportContainerSerializer.fromJson((/** @type {?} */ (json[c])));
            }
        }));
        return createReport(json);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwb3J0LXNlcmlhbGl6ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9yZXBvcnRzL3NlcmlhbGl6ZXJzL3JlcG9ydC1zZXJpYWxpemVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBd0JBLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQztBQUM1RCxPQUFPLEVBQUMsNEJBQTRCLEVBQUMsTUFBTSwrQkFBK0IsQ0FBQztBQUUzRSxNQUFNLE9BQU8sbUJBQW1COzs7OztJQUM5QixNQUFNLENBQUMsUUFBUSxDQUFDLElBQXdCOztjQUNoQyxVQUFVLEdBQXdCLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxTQUFTLENBQUM7UUFDdkUsVUFBVSxDQUFDLE9BQU87Ozs7UUFBQyxDQUFDLENBQUMsRUFBRTtZQUNyQixJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDWCxDQUFDLG1CQUFBLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBc0IsQ0FBQztvQkFDM0IsNEJBQTRCLENBQUMsUUFBUSxDQUFDLG1CQUFBLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBK0IsQ0FBQyxDQUFDO2FBQ25GO1FBQ0gsQ0FBQyxFQUFDLENBQUM7UUFDSCxPQUFPLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1QixDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmUmVwb3J0fSBmcm9tICcuLi9pbnRlcmZhY2UvcmVwb3J0cy9yZXBvcnQnO1xuaW1wb3J0IHtBamZSZXBvcnRDb250YWluZXJ9IGZyb20gJy4uL2ludGVyZmFjZS9yZXBvcnRzL3JlcG9ydC1jb250YWluZXInO1xuaW1wb3J0IHtjcmVhdGVSZXBvcnR9IGZyb20gJy4uL3V0aWxzL3JlcG9ydHMvY3JlYXRlLXJlcG9ydCc7XG5pbXBvcnQge0FqZlJlcG9ydENvbnRhaW5lclNlcmlhbGl6ZXJ9IGZyb20gJy4vcmVwb3J0LWNvbnRhaW5lci1zZXJpYWxpemVyJztcblxuZXhwb3J0IGNsYXNzIEFqZlJlcG9ydFNlcmlhbGl6ZXIge1xuICBzdGF0aWMgZnJvbUpzb24oanNvbjogUGFydGlhbDxBamZSZXBvcnQ+KTogQWpmUmVwb3J0IHtcbiAgICBjb25zdCBjb250YWluZXJzOiAoa2V5b2YgQWpmUmVwb3J0KVtdID0gWydoZWFkZXInLCAnZm9vdGVyJywgJ2NvbnRlbnQnXTtcbiAgICBjb250YWluZXJzLmZvckVhY2goYyA9PiB7XG4gICAgICBpZiAoanNvbltjXSkge1xuICAgICAgICAoanNvbltjXSBhcyBBamZSZXBvcnRDb250YWluZXIpID1cbiAgICAgICAgICAgIEFqZlJlcG9ydENvbnRhaW5lclNlcmlhbGl6ZXIuZnJvbUpzb24oanNvbltjXSBhcyBQYXJ0aWFsPEFqZlJlcG9ydENvbnRhaW5lcj4pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBjcmVhdGVSZXBvcnQoanNvbik7XG4gIH1cbn1cbiJdfQ==