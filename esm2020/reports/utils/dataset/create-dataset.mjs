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
import { AjfAggregationType } from '../../interface/aggregation/aggregation-type';
import { createAggregation } from '../aggregation/create-aggregation';
export function createDataset(dataset) {
    return {
        ...dataset,
        aggregation: dataset.aggregation || createAggregation({ aggregation: AjfAggregationType.None }),
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLWRhdGFzZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL3JlcG9ydHMvc3JjL3V0aWxzL2RhdGFzZXQvY3JlYXRlLWRhdGFzZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sOENBQThDLENBQUM7QUFFaEYsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sbUNBQW1DLENBQUM7QUFFcEUsTUFBTSxVQUFVLGFBQWEsQ0FBQyxPQUE0QjtJQUN4RCxPQUFPO1FBQ0wsR0FBRyxPQUFPO1FBQ1YsV0FBVyxFQUFFLE9BQU8sQ0FBQyxXQUFXLElBQUksaUJBQWlCLENBQUMsRUFBQyxXQUFXLEVBQUUsa0JBQWtCLENBQUMsSUFBSSxFQUFDLENBQUM7S0FDOUYsQ0FBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmQWdncmVnYXRpb25UeXBlfSBmcm9tICcuLi8uLi9pbnRlcmZhY2UvYWdncmVnYXRpb24vYWdncmVnYXRpb24tdHlwZSc7XG5pbXBvcnQge0FqZkRhdGFzZXR9IGZyb20gJy4uLy4uL2ludGVyZmFjZS9kYXRhc2V0L2RhdGFzZXQnO1xuaW1wb3J0IHtjcmVhdGVBZ2dyZWdhdGlvbn0gZnJvbSAnLi4vYWdncmVnYXRpb24vY3JlYXRlLWFnZ3JlZ2F0aW9uJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZURhdGFzZXQoZGF0YXNldDogUGFydGlhbDxBamZEYXRhc2V0Pik6IEFqZkRhdGFzZXQge1xuICByZXR1cm4ge1xuICAgIC4uLmRhdGFzZXQsXG4gICAgYWdncmVnYXRpb246IGRhdGFzZXQuYWdncmVnYXRpb24gfHwgY3JlYXRlQWdncmVnYXRpb24oe2FnZ3JlZ2F0aW9uOiBBamZBZ2dyZWdhdGlvblR5cGUuTm9uZX0pLFxuICB9O1xufVxuIl19