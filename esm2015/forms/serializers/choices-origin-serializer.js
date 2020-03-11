/**
 * @fileoverview added by tsickle
 * Generated from: src/core/forms/serializers/choices-origin-serializer.ts
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
import { createChoicesOrigin } from '../utils/choices/create-choices-origin';
export class AjfChoicesOriginSerializer {
    /**
     * @param {?} origin
     * @return {?}
     */
    static fromJson(origin) {
        return createChoicesOrigin((/** @type {?} */ (Object.assign(Object.assign({}, origin), { type: origin.type || 'fixed', name: origin.name || '' }))));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hvaWNlcy1vcmlnaW4tc2VyaWFsaXplci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2Zvcm1zL3NlcmlhbGl6ZXJzL2Nob2ljZXMtb3JpZ2luLXNlcmlhbGl6ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF1QkEsT0FBTyxFQUF5QixtQkFBbUIsRUFBQyxNQUFNLHdDQUF3QyxDQUFDO0FBRW5HLE1BQU0sT0FBTywwQkFBMEI7Ozs7O0lBQ3JDLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBc0M7UUFDcEQsT0FBTyxtQkFBbUIsQ0FBTSxtREFDM0IsTUFBTSxLQUNULElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxJQUFJLE9BQU8sRUFDNUIsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLElBQUksRUFBRSxLQUNPLENBQUMsQ0FBQztJQUNwQyxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmQ2hvaWNlc09yaWdpbn0gZnJvbSAnLi4vaW50ZXJmYWNlL2Nob2ljZXMvY2hvaWNlcy1vcmlnaW4nO1xuaW1wb3J0IHtBamZDaG9pY2VzT3JpZ2luQ3JlYXRlLCBjcmVhdGVDaG9pY2VzT3JpZ2lufSBmcm9tICcuLi91dGlscy9jaG9pY2VzL2NyZWF0ZS1jaG9pY2VzLW9yaWdpbic7XG5cbmV4cG9ydCBjbGFzcyBBamZDaG9pY2VzT3JpZ2luU2VyaWFsaXplciB7XG4gIHN0YXRpYyBmcm9tSnNvbihvcmlnaW46IFBhcnRpYWw8QWpmQ2hvaWNlc09yaWdpbjxhbnk+Pik6IEFqZkNob2ljZXNPcmlnaW48YW55PiB7XG4gICAgcmV0dXJuIGNyZWF0ZUNob2ljZXNPcmlnaW48YW55Pih7XG4gICAgICAuLi5vcmlnaW4sXG4gICAgICB0eXBlOiBvcmlnaW4udHlwZSB8fCAnZml4ZWQnLFxuICAgICAgbmFtZTogb3JpZ2luLm5hbWUgfHwgJycsXG4gICAgfSBhcyBBamZDaG9pY2VzT3JpZ2luQ3JlYXRlPGFueT4pO1xuICB9XG59XG4iXX0=