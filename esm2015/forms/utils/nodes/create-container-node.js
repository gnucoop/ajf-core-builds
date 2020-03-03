/**
 * @fileoverview added by tsickle
 * Generated from: src/core/forms/utils/nodes/create-container-node.ts
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
import { createNode } from './create-node';
/**
 * @param {?} containerNode
 * @return {?}
 */
export function createContainerNode(containerNode) {
    /** @type {?} */
    const node = createNode(containerNode);
    return Object.assign(Object.assign({}, node), { nodes: containerNode.nodes || [] });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLWNvbnRhaW5lci1ub2RlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvZm9ybXMvdXRpbHMvbm9kZXMvY3JlYXRlLWNvbnRhaW5lci1ub2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBdUJBLE9BQU8sRUFBZ0IsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDOzs7OztBQUl4RCxNQUFNLFVBQVUsbUJBQW1CLENBQUMsYUFBcUM7O1VBQ2pFLElBQUksR0FBRyxVQUFVLENBQUMsYUFBYSxDQUFDO0lBQ3RDLHVDQUNLLElBQUksS0FDUCxLQUFLLEVBQUUsYUFBYSxDQUFDLEtBQUssSUFBSSxFQUFFLElBQ2hDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgMjAxOCBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkNvbnRhaW5lck5vZGV9IGZyb20gJy4uLy4uL2ludGVyZmFjZS9ub2Rlcy9jb250YWluZXItbm9kZSc7XG5pbXBvcnQge0FqZk5vZGVDcmVhdGUsIGNyZWF0ZU5vZGV9IGZyb20gJy4vY3JlYXRlLW5vZGUnO1xuXG5leHBvcnQgdHlwZSBBamZDb250YWluZXJOb2RlQ3JlYXRlID0gQWpmTm9kZUNyZWF0ZSZQYXJ0aWFsPEFqZkNvbnRhaW5lck5vZGU+O1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQ29udGFpbmVyTm9kZShjb250YWluZXJOb2RlOiBBamZDb250YWluZXJOb2RlQ3JlYXRlKTogQWpmQ29udGFpbmVyTm9kZSB7XG4gIGNvbnN0IG5vZGUgPSBjcmVhdGVOb2RlKGNvbnRhaW5lck5vZGUpO1xuICByZXR1cm4ge1xuICAgIC4uLm5vZGUsXG4gICAgbm9kZXM6IGNvbnRhaW5lck5vZGUubm9kZXMgfHwgW10sXG4gIH07XG59XG4iXX0=