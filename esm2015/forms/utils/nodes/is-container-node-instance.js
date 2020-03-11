/**
 * @fileoverview added by tsickle
 * Generated from: src/core/forms/utils/nodes/is-container-node-instance.ts
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
/**
 * @param {?} node
 * @return {?}
 */
export function isRepeatingContainerNode(node) {
    return node != null &&
        (node.nodeType === AjfNodeType.AjfNodeGroup ||
            node.nodeType === AjfNodeType.AjfRepeatingSlide);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXMtY29udGFpbmVyLW5vZGUtaW5zdGFuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9mb3Jtcy91dGlscy9ub2Rlcy9pcy1jb250YWluZXItbm9kZS1pbnN0YW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXVCQSxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0saUNBQWlDLENBQUM7Ozs7O0FBRTVELE1BQU0sVUFBVSx3QkFBd0IsQ0FBQyxJQUFhO0lBQ3BELE9BQU8sSUFBSSxJQUFJLElBQUk7UUFDZixDQUFDLElBQUksQ0FBQyxRQUFRLEtBQUssV0FBVyxDQUFDLFlBQVk7WUFDMUMsSUFBSSxDQUFDLFFBQVEsS0FBSyxXQUFXLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUN4RCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZk5vZGV9IGZyb20gJy4uLy4uL2ludGVyZmFjZS9ub2Rlcy9ub2RlJztcbmltcG9ydCB7QWpmTm9kZVR5cGV9IGZyb20gJy4uLy4uL2ludGVyZmFjZS9ub2Rlcy9ub2RlLXR5cGUnO1xuXG5leHBvcnQgZnVuY3Rpb24gaXNSZXBlYXRpbmdDb250YWluZXJOb2RlKG5vZGU6IEFqZk5vZGUpOiBib29sZWFuIHtcbiAgcmV0dXJuIG5vZGUgIT0gbnVsbCAmJlxuICAgICAgKG5vZGUubm9kZVR5cGUgPT09IEFqZk5vZGVUeXBlLkFqZk5vZGVHcm91cCB8fFxuICAgICAgIG5vZGUubm9kZVR5cGUgPT09IEFqZk5vZGVUeXBlLkFqZlJlcGVhdGluZ1NsaWRlKTtcbn1cbiJdfQ==