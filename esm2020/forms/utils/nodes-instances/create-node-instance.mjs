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
import { EventEmitter } from '@angular/core';
/**
 * It creates an AjfNodeInstance.
 * If instance.prefix is defined copy it else assign empty array.
 * If instance.visible is not defined assign true.
 * Assign empty array to conditionalBranches.
 * Assign new eventEmitter to updatedEvt.
 */
export function createNodeInstance(instance) {
    return {
        node: instance.node,
        prefix: instance.prefix ? [...instance.prefix] : [],
        visible: instance.visible != null ? instance.visible : true,
        conditionalBranches: [],
        updatedEvt: new EventEmitter()
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLW5vZGUtaW5zdGFuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9mb3Jtcy91dGlscy9ub2Rlcy1pbnN0YW5jZXMvY3JlYXRlLW5vZGUtaW5zdGFuY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUszQzs7Ozs7O0dBTUc7QUFDSCxNQUFNLFVBQVUsa0JBQWtCLENBQUMsUUFBK0I7SUFDaEUsT0FBTztRQUNMLElBQUksRUFBRSxRQUFRLENBQUMsSUFBSTtRQUNuQixNQUFNLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtRQUNuRCxPQUFPLEVBQUUsUUFBUSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUk7UUFDM0QsbUJBQW1CLEVBQUUsRUFBRTtRQUN2QixVQUFVLEVBQUUsSUFBSSxZQUFZLEVBQVE7S0FDckMsQ0FBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7RXZlbnRFbWl0dGVyfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7QWpmTm9kZUluc3RhbmNlfSBmcm9tICcuLi8uLi9pbnRlcmZhY2Uvbm9kZXMtaW5zdGFuY2VzL25vZGUtaW5zdGFuY2UnO1xuXG5leHBvcnQgdHlwZSBBamZOb2RlSW5zdGFuY2VDcmVhdGUgPSBQaWNrPEFqZk5vZGVJbnN0YW5jZSwgJ25vZGUnPiZQYXJ0aWFsPEFqZk5vZGVJbnN0YW5jZT47XG5cbi8qKlxuICogSXQgY3JlYXRlcyBhbiBBamZOb2RlSW5zdGFuY2UuXG4gKiBJZiBpbnN0YW5jZS5wcmVmaXggaXMgZGVmaW5lZCBjb3B5IGl0IGVsc2UgYXNzaWduIGVtcHR5IGFycmF5LlxuICogSWYgaW5zdGFuY2UudmlzaWJsZSBpcyBub3QgZGVmaW5lZCBhc3NpZ24gdHJ1ZS5cbiAqIEFzc2lnbiBlbXB0eSBhcnJheSB0byBjb25kaXRpb25hbEJyYW5jaGVzLlxuICogQXNzaWduIG5ldyBldmVudEVtaXR0ZXIgdG8gdXBkYXRlZEV2dC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZU5vZGVJbnN0YW5jZShpbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlQ3JlYXRlKTogQWpmTm9kZUluc3RhbmNlIHtcbiAgcmV0dXJuIHtcbiAgICBub2RlOiBpbnN0YW5jZS5ub2RlLFxuICAgIHByZWZpeDogaW5zdGFuY2UucHJlZml4ID8gWy4uLmluc3RhbmNlLnByZWZpeF0gOiBbXSxcbiAgICB2aXNpYmxlOiBpbnN0YW5jZS52aXNpYmxlICE9IG51bGwgPyBpbnN0YW5jZS52aXNpYmxlIDogdHJ1ZSxcbiAgICBjb25kaXRpb25hbEJyYW5jaGVzOiBbXSxcbiAgICB1cGRhdGVkRXZ0OiBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KClcbiAgfTtcbn1cbiJdfQ==