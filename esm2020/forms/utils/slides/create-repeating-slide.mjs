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
import { AjfNodeType } from '../../interface/nodes/node-type';
import { createContainerNode } from '../nodes/create-container-node';
import { createRepeatingNode } from '../nodes/create-repeating-node';
/**
 * It creates a AjfRepeatingSlide as the composition of createContainerNode and
 * createRepeatingNode and set AjfRepeatingSlide as nodeType
 */
export function createRepeatingSlide(nodeGroup) {
    return {
        ...createContainerNode(nodeGroup),
        ...createRepeatingNode(nodeGroup),
        nodeType: AjfNodeType.AjfRepeatingSlide,
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLXJlcGVhdGluZy1zbGlkZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2Zvcm1zL3V0aWxzL3NsaWRlcy9jcmVhdGUtcmVwZWF0aW5nLXNsaWRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQztBQUU1RCxPQUFPLEVBQXlCLG1CQUFtQixFQUFDLE1BQU0sZ0NBQWdDLENBQUM7QUFDM0YsT0FBTyxFQUF5QixtQkFBbUIsRUFBQyxNQUFNLGdDQUFnQyxDQUFDO0FBRzNGOzs7R0FHRztBQUNILE1BQU0sVUFBVSxvQkFBb0IsQ0FBQyxTQUFrQztJQUNyRSxPQUFPO1FBQ0wsR0FBRyxtQkFBbUIsQ0FBQyxTQUFTLENBQUM7UUFDakMsR0FBRyxtQkFBbUIsQ0FBQyxTQUFTLENBQUM7UUFDakMsUUFBUSxFQUFFLFdBQVcsQ0FBQyxpQkFBaUI7S0FDeEMsQ0FBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmTm9kZVR5cGV9IGZyb20gJy4uLy4uL2ludGVyZmFjZS9ub2Rlcy9ub2RlLXR5cGUnO1xuaW1wb3J0IHtBamZSZXBlYXRpbmdTbGlkZX0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL3NsaWRlcy9yZXBlYXRpbmctc2xpZGUnO1xuaW1wb3J0IHtBamZDb250YWluZXJOb2RlQ3JlYXRlLCBjcmVhdGVDb250YWluZXJOb2RlfSBmcm9tICcuLi9ub2Rlcy9jcmVhdGUtY29udGFpbmVyLW5vZGUnO1xuaW1wb3J0IHtBamZSZXBlYXRpbmdOb2RlQ3JlYXRlLCBjcmVhdGVSZXBlYXRpbmdOb2RlfSBmcm9tICcuLi9ub2Rlcy9jcmVhdGUtcmVwZWF0aW5nLW5vZGUnO1xuXG5leHBvcnQgdHlwZSBBamZSZXBlYXRpbmdTbGlkZUNyZWF0ZSA9IEFqZkNvbnRhaW5lck5vZGVDcmVhdGUgJiBBamZSZXBlYXRpbmdOb2RlQ3JlYXRlO1xuLyoqXG4gKiBJdCBjcmVhdGVzIGEgQWpmUmVwZWF0aW5nU2xpZGUgYXMgdGhlIGNvbXBvc2l0aW9uIG9mIGNyZWF0ZUNvbnRhaW5lck5vZGUgYW5kXG4gKiBjcmVhdGVSZXBlYXRpbmdOb2RlIGFuZCBzZXQgQWpmUmVwZWF0aW5nU2xpZGUgYXMgbm9kZVR5cGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVJlcGVhdGluZ1NsaWRlKG5vZGVHcm91cDogQWpmUmVwZWF0aW5nU2xpZGVDcmVhdGUpOiBBamZSZXBlYXRpbmdTbGlkZSB7XG4gIHJldHVybiB7XG4gICAgLi4uY3JlYXRlQ29udGFpbmVyTm9kZShub2RlR3JvdXApLFxuICAgIC4uLmNyZWF0ZVJlcGVhdGluZ05vZGUobm9kZUdyb3VwKSxcbiAgICBub2RlVHlwZTogQWpmTm9kZVR5cGUuQWpmUmVwZWF0aW5nU2xpZGUsXG4gIH07XG59XG4iXX0=