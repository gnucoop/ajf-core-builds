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
import { neverCondition } from '@ajf/core/models';
import { AjfNodeType } from '../../interface/nodes/node-type';
import { createContainerNode } from '../nodes/create-container-node';
/**
 * It creates AjfSlide.
 */
export function createSlide(nodeGroup) {
    return {
        ...createContainerNode(nodeGroup),
        nodeType: AjfNodeType.AjfSlide,
        readonly: nodeGroup.readonly || neverCondition(),
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLXNsaWRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvZm9ybXMvdXRpbHMvc2xpZGVzL2NyZWF0ZS1zbGlkZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDaEQsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGlDQUFpQyxDQUFDO0FBRTVELE9BQU8sRUFBeUIsbUJBQW1CLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQztBQUkzRjs7R0FFRztBQUNILE1BQU0sVUFBVSxXQUFXLENBQUMsU0FBeUI7SUFDbkQsT0FBTztRQUNMLEdBQUcsbUJBQW1CLENBQUMsU0FBUyxDQUFDO1FBQ2pDLFFBQVEsRUFBRSxXQUFXLENBQUMsUUFBUTtRQUM5QixRQUFRLEVBQUUsU0FBUyxDQUFDLFFBQVEsSUFBSSxjQUFjLEVBQUU7S0FDakQsQ0FBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7bmV2ZXJDb25kaXRpb259IGZyb20gJ0BhamYvY29yZS9tb2RlbHMnO1xuaW1wb3J0IHtBamZOb2RlVHlwZX0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL25vZGVzL25vZGUtdHlwZSc7XG5pbXBvcnQge0FqZlNsaWRlfSBmcm9tICcuLi8uLi9pbnRlcmZhY2Uvc2xpZGVzL3NsaWRlJztcbmltcG9ydCB7QWpmQ29udGFpbmVyTm9kZUNyZWF0ZSwgY3JlYXRlQ29udGFpbmVyTm9kZX0gZnJvbSAnLi4vbm9kZXMvY3JlYXRlLWNvbnRhaW5lci1ub2RlJztcblxuZXhwb3J0IHR5cGUgQWpmU2xpZGVDcmVhdGUgPSBBamZDb250YWluZXJOb2RlQ3JlYXRlO1xuXG4vKipcbiAqIEl0IGNyZWF0ZXMgQWpmU2xpZGUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTbGlkZShub2RlR3JvdXA6IEFqZlNsaWRlQ3JlYXRlKTogQWpmU2xpZGUge1xuICByZXR1cm4ge1xuICAgIC4uLmNyZWF0ZUNvbnRhaW5lck5vZGUobm9kZUdyb3VwKSxcbiAgICBub2RlVHlwZTogQWpmTm9kZVR5cGUuQWpmU2xpZGUsXG4gICAgcmVhZG9ubHk6IG5vZGVHcm91cC5yZWFkb25seSB8fCBuZXZlckNvbmRpdGlvbigpLFxuICB9O1xufVxuIl19