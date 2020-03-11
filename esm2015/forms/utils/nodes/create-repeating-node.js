/**
 * @fileoverview added by tsickle
 * Generated from: src/core/forms/utils/nodes/create-repeating-node.ts
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
import { createNode } from './create-node';
/**
 * @param {?} repeatingNode
 * @return {?}
 */
export function createRepeatingNode(repeatingNode) {
    /** @type {?} */
    const node = createNode(repeatingNode);
    return Object.assign(Object.assign(Object.assign({}, repeatingNode), node), { minReps: repeatingNode.minReps != null ? repeatingNode.minReps : 1, maxReps: repeatingNode.maxReps != null ? repeatingNode.maxReps : 0 });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLXJlcGVhdGluZy1ub2RlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvZm9ybXMvdXRpbHMvbm9kZXMvY3JlYXRlLXJlcGVhdGluZy1ub2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBdUJBLE9BQU8sRUFBZ0IsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDOzs7OztBQUl4RCxNQUFNLFVBQVUsbUJBQW1CLENBQUMsYUFBcUM7O1VBQ2pFLElBQUksR0FBRyxVQUFVLENBQUMsYUFBYSxDQUFDO0lBQ3RDLHFEQUNLLGFBQWEsR0FDYixJQUFJLEtBQ1AsT0FBTyxFQUFFLGFBQWEsQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQ2xFLE9BQU8sRUFBRSxhQUFhLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUNsRTtBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmUmVwZWF0aW5nTm9kZX0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL25vZGVzL3JlcGVhdGluZy1ub2RlJztcbmltcG9ydCB7QWpmTm9kZUNyZWF0ZSwgY3JlYXRlTm9kZX0gZnJvbSAnLi9jcmVhdGUtbm9kZSc7XG5cbmV4cG9ydCB0eXBlIEFqZlJlcGVhdGluZ05vZGVDcmVhdGUgPSBBamZOb2RlQ3JlYXRlJlBhcnRpYWw8QWpmUmVwZWF0aW5nTm9kZT47XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVSZXBlYXRpbmdOb2RlKHJlcGVhdGluZ05vZGU6IEFqZlJlcGVhdGluZ05vZGVDcmVhdGUpOiBBamZSZXBlYXRpbmdOb2RlIHtcbiAgY29uc3Qgbm9kZSA9IGNyZWF0ZU5vZGUocmVwZWF0aW5nTm9kZSk7XG4gIHJldHVybiB7XG4gICAgLi4ucmVwZWF0aW5nTm9kZSxcbiAgICAuLi5ub2RlLFxuICAgIG1pblJlcHM6IHJlcGVhdGluZ05vZGUubWluUmVwcyAhPSBudWxsID8gcmVwZWF0aW5nTm9kZS5taW5SZXBzIDogMSxcbiAgICBtYXhSZXBzOiByZXBlYXRpbmdOb2RlLm1heFJlcHMgIT0gbnVsbCA/IHJlcGVhdGluZ05vZGUubWF4UmVwcyA6IDAsXG4gIH07XG59XG4iXX0=