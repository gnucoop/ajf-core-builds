/**
 * @fileoverview added by tsickle
 * Generated from: src/core/forms/utils/slides/create-slide.ts
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
import { AjfNodeType } from '../../interface/nodes/node-type';
import { createContainerNode } from '../nodes/create-container-node';
/**
 * @param {?} nodeGroup
 * @return {?}
 */
export function createSlide(nodeGroup) {
    return Object.assign(Object.assign({}, createContainerNode(nodeGroup)), { nodeType: AjfNodeType.AjfSlide });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLXNsaWRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvZm9ybXMvdXRpbHMvc2xpZGVzL2NyZWF0ZS1zbGlkZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCQSxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0saUNBQWlDLENBQUM7QUFFNUQsT0FBTyxFQUF5QixtQkFBbUIsRUFBQyxNQUFNLGdDQUFnQyxDQUFDOzs7OztBQUkzRixNQUFNLFVBQVUsV0FBVyxDQUFDLFNBQXlCO0lBQ25ELHVDQUNLLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxLQUNqQyxRQUFRLEVBQUUsV0FBVyxDQUFDLFFBQVEsSUFDOUI7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZk5vZGVUeXBlfSBmcm9tICcuLi8uLi9pbnRlcmZhY2Uvbm9kZXMvbm9kZS10eXBlJztcbmltcG9ydCB7QWpmU2xpZGV9IGZyb20gJy4uLy4uL2ludGVyZmFjZS9zbGlkZXMvc2xpZGUnO1xuaW1wb3J0IHtBamZDb250YWluZXJOb2RlQ3JlYXRlLCBjcmVhdGVDb250YWluZXJOb2RlfSBmcm9tICcuLi9ub2Rlcy9jcmVhdGUtY29udGFpbmVyLW5vZGUnO1xuXG5leHBvcnQgdHlwZSBBamZTbGlkZUNyZWF0ZSA9IEFqZkNvbnRhaW5lck5vZGVDcmVhdGU7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTbGlkZShub2RlR3JvdXA6IEFqZlNsaWRlQ3JlYXRlKTogQWpmU2xpZGUge1xuICByZXR1cm4ge1xuICAgIC4uLmNyZWF0ZUNvbnRhaW5lck5vZGUobm9kZUdyb3VwKSxcbiAgICBub2RlVHlwZTogQWpmTm9kZVR5cGUuQWpmU2xpZGUsXG4gIH07XG59XG4iXX0=