/**
 * @fileoverview added by tsickle
 * Generated from: src/core/forms/serializers/form-serializer.ts
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
import { deepCopy } from '@ajf/core/utils';
import { AjfAttachmentsOriginSerializer } from './attachments-origin-serializer';
import { AjfChoicesOriginSerializer } from './choices-origin-serializer';
import { AjfNodeSerializer } from './node-serializer';
export class AjfFormSerializer {
    /**
     * @param {?} form
     * @param {?=} context
     * @return {?}
     */
    static fromJson(form, context) {
        /** @type {?} */
        const choicesOrigins = (form.choicesOrigins || []).map((/**
         * @param {?} c
         * @return {?}
         */
        c => AjfChoicesOriginSerializer.fromJson(c)));
        /** @type {?} */
        const attachmentsOrigins = (form.attachmentsOrigins || []).map((/**
         * @param {?} a
         * @return {?}
         */
        a => AjfAttachmentsOriginSerializer.fromJson(a)));
        /** @type {?} */
        const nodes = (/** @type {?} */ ((form.nodes || [])
            .map((/**
         * @param {?} n
         * @return {?}
         */
        n => AjfNodeSerializer.fromJson(n, choicesOrigins, attachmentsOrigins)))));
        return Object.assign(Object.assign({}, form), { choicesOrigins,
            attachmentsOrigins,
            nodes, stringIdentifier: form.stringIdentifier || [], initContext: deepCopy(context || {}) });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1zZXJpYWxpemVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvZm9ybXMvc2VyaWFsaXplcnMvZm9ybS1zZXJpYWxpemVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBdUJBLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUl6QyxPQUFPLEVBQUMsOEJBQThCLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQztBQUMvRSxPQUFPLEVBQUMsMEJBQTBCLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQztBQUN2RSxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUVwRCxNQUFNLE9BQU8saUJBQWlCOzs7Ozs7SUFDNUIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFzQixFQUFFLE9BQW9COztjQUNwRCxjQUFjLEdBQ2hCLENBQUMsSUFBSSxDQUFDLGNBQWMsSUFBSSxFQUFFLENBQUMsQ0FBQyxHQUFHOzs7O1FBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQywwQkFBMEIsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUM7O2NBQzFFLGtCQUFrQixHQUNwQixDQUFDLElBQUksQ0FBQyxrQkFBa0IsSUFBSSxFQUFFLENBQUMsQ0FBQyxHQUFHOzs7O1FBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyw4QkFBOEIsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUM7O2NBQ2xGLEtBQUssR0FDUCxtQkFBQSxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDO2FBQ2IsR0FBRzs7OztRQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxjQUFjLEVBQUUsa0JBQWtCLENBQUMsRUFBQyxFQUM3QztRQUN2Qyx1Q0FDSyxJQUFJLEtBQ1AsY0FBYztZQUNkLGtCQUFrQjtZQUNsQixLQUFLLEVBQ0wsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixJQUFJLEVBQUUsRUFDN0MsV0FBVyxFQUFFLFFBQVEsQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDLElBQ3BDO0lBQ0osQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSAyMDE4IEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmQ29udGV4dH0gZnJvbSAnQGFqZi9jb3JlL21vZGVscyc7XG5pbXBvcnQge2RlZXBDb3B5fSBmcm9tICdAYWpmL2NvcmUvdXRpbHMnO1xuaW1wb3J0IHtBamZGb3JtfSBmcm9tICcuLi9pbnRlcmZhY2UvZm9ybXMvZm9ybSc7XG5pbXBvcnQge0FqZlJlcGVhdGluZ1NsaWRlfSBmcm9tICcuLi9pbnRlcmZhY2Uvc2xpZGVzL3JlcGVhdGluZy1zbGlkZSc7XG5pbXBvcnQge0FqZlNsaWRlfSBmcm9tICcuLi9pbnRlcmZhY2Uvc2xpZGVzL3NsaWRlJztcbmltcG9ydCB7QWpmQXR0YWNobWVudHNPcmlnaW5TZXJpYWxpemVyfSBmcm9tICcuL2F0dGFjaG1lbnRzLW9yaWdpbi1zZXJpYWxpemVyJztcbmltcG9ydCB7QWpmQ2hvaWNlc09yaWdpblNlcmlhbGl6ZXJ9IGZyb20gJy4vY2hvaWNlcy1vcmlnaW4tc2VyaWFsaXplcic7XG5pbXBvcnQge0FqZk5vZGVTZXJpYWxpemVyfSBmcm9tICcuL25vZGUtc2VyaWFsaXplcic7XG5cbmV4cG9ydCBjbGFzcyBBamZGb3JtU2VyaWFsaXplciB7XG4gIHN0YXRpYyBmcm9tSnNvbihmb3JtOiBQYXJ0aWFsPEFqZkZvcm0+LCBjb250ZXh0PzogQWpmQ29udGV4dCk6IEFqZkZvcm0ge1xuICAgIGNvbnN0IGNob2ljZXNPcmlnaW5zID1cbiAgICAgICAgKGZvcm0uY2hvaWNlc09yaWdpbnMgfHwgW10pLm1hcChjID0+IEFqZkNob2ljZXNPcmlnaW5TZXJpYWxpemVyLmZyb21Kc29uKGMpKTtcbiAgICBjb25zdCBhdHRhY2htZW50c09yaWdpbnMgPVxuICAgICAgICAoZm9ybS5hdHRhY2htZW50c09yaWdpbnMgfHwgW10pLm1hcChhID0+IEFqZkF0dGFjaG1lbnRzT3JpZ2luU2VyaWFsaXplci5mcm9tSnNvbihhKSk7XG4gICAgY29uc3Qgbm9kZXMgPVxuICAgICAgICAoZm9ybS5ub2RlcyB8fCBbXSlcbiAgICAgICAgICAgIC5tYXAobiA9PiBBamZOb2RlU2VyaWFsaXplci5mcm9tSnNvbihuLCBjaG9pY2VzT3JpZ2lucywgYXR0YWNobWVudHNPcmlnaW5zKSkgYXMgKFxuICAgICAgICAgICAgQWpmUmVwZWF0aW5nU2xpZGUgfCBBamZTbGlkZSlbXTtcbiAgICByZXR1cm4ge1xuICAgICAgLi4uZm9ybSxcbiAgICAgIGNob2ljZXNPcmlnaW5zLFxuICAgICAgYXR0YWNobWVudHNPcmlnaW5zLFxuICAgICAgbm9kZXMsXG4gICAgICBzdHJpbmdJZGVudGlmaWVyOiBmb3JtLnN0cmluZ0lkZW50aWZpZXIgfHwgW10sXG4gICAgICBpbml0Q29udGV4dDogZGVlcENvcHkoY29udGV4dCB8fCB7fSksXG4gICAgfTtcbiAgfVxufVxuIl19