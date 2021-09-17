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
    return Object.assign(Object.assign(Object.assign({}, createContainerNode(nodeGroup)), createRepeatingNode(nodeGroup)), { nodeType: AjfNodeType.AjfRepeatingSlide });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLXJlcGVhdGluZy1zbGlkZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2Zvcm1zL3V0aWxzL3NsaWRlcy9jcmVhdGUtcmVwZWF0aW5nLXNsaWRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQztBQUU1RCxPQUFPLEVBQXlCLG1CQUFtQixFQUFDLE1BQU0sZ0NBQWdDLENBQUM7QUFDM0YsT0FBTyxFQUF5QixtQkFBbUIsRUFBQyxNQUFNLGdDQUFnQyxDQUFDO0FBRzNGOzs7R0FHRztBQUNILE1BQU0sVUFBVSxvQkFBb0IsQ0FBQyxTQUFrQztJQUNyRSxxREFDSyxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsR0FDOUIsbUJBQW1CLENBQUMsU0FBUyxDQUFDLEtBQ2pDLFFBQVEsRUFBRSxXQUFXLENBQUMsaUJBQWlCLElBQ3ZDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZOb2RlVHlwZX0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL25vZGVzL25vZGUtdHlwZSc7XG5pbXBvcnQge0FqZlJlcGVhdGluZ1NsaWRlfSBmcm9tICcuLi8uLi9pbnRlcmZhY2Uvc2xpZGVzL3JlcGVhdGluZy1zbGlkZSc7XG5pbXBvcnQge0FqZkNvbnRhaW5lck5vZGVDcmVhdGUsIGNyZWF0ZUNvbnRhaW5lck5vZGV9IGZyb20gJy4uL25vZGVzL2NyZWF0ZS1jb250YWluZXItbm9kZSc7XG5pbXBvcnQge0FqZlJlcGVhdGluZ05vZGVDcmVhdGUsIGNyZWF0ZVJlcGVhdGluZ05vZGV9IGZyb20gJy4uL25vZGVzL2NyZWF0ZS1yZXBlYXRpbmctbm9kZSc7XG5cbmV4cG9ydCB0eXBlIEFqZlJlcGVhdGluZ1NsaWRlQ3JlYXRlID0gQWpmQ29udGFpbmVyTm9kZUNyZWF0ZSZBamZSZXBlYXRpbmdOb2RlQ3JlYXRlO1xuLyoqXG4gKiBJdCBjcmVhdGVzIGEgQWpmUmVwZWF0aW5nU2xpZGUgYXMgdGhlIGNvbXBvc2l0aW9uIG9mIGNyZWF0ZUNvbnRhaW5lck5vZGUgYW5kXG4gKiBjcmVhdGVSZXBlYXRpbmdOb2RlIGFuZCBzZXQgQWpmUmVwZWF0aW5nU2xpZGUgYXMgbm9kZVR5cGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVJlcGVhdGluZ1NsaWRlKG5vZGVHcm91cDogQWpmUmVwZWF0aW5nU2xpZGVDcmVhdGUpOiBBamZSZXBlYXRpbmdTbGlkZSB7XG4gIHJldHVybiB7XG4gICAgLi4uY3JlYXRlQ29udGFpbmVyTm9kZShub2RlR3JvdXApLFxuICAgIC4uLmNyZWF0ZVJlcGVhdGluZ05vZGUobm9kZUdyb3VwKSxcbiAgICBub2RlVHlwZTogQWpmTm9kZVR5cGUuQWpmUmVwZWF0aW5nU2xpZGUsXG4gIH07XG59XG4iXX0=