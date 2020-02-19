/**
 * @fileoverview added by tsickle
 * Generated from: src/core/forms/interface/nodes/node.ts
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
/**
 * @record
 */
export function AjfNode() { }
if (false) {
    /** @type {?} */
    AjfNode.prototype.nodeType;
    /** @type {?} */
    AjfNode.prototype.id;
    /** @type {?} */
    AjfNode.prototype.parent;
    /** @type {?} */
    AjfNode.prototype.parentNode;
    /** @type {?} */
    AjfNode.prototype.conditionalBranches;
    /** @type {?} */
    AjfNode.prototype.name;
    /** @type {?} */
    AjfNode.prototype.label;
    /** @type {?|undefined} */
    AjfNode.prototype.visibility;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2Zvcm1zL2ludGVyZmFjZS9ub2Rlcy9ub2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBeUJBLDZCQXVCQzs7O0lBdEJDLDJCQUFzQjs7SUFHdEIscUJBQVc7O0lBR1gseUJBQWU7O0lBR2YsNkJBQW1COztJQUduQixzQ0FBb0M7O0lBR3BDLHVCQUFhOztJQUdiLHdCQUFjOztJQUdkLDZCQUEwQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgMjAxOCBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkNvbmRpdGlvbn0gZnJvbSAnQGFqZi9jb3JlL21vZGVscyc7XG5pbXBvcnQge0FqZk5vZGVUeXBlfSBmcm9tICcuL25vZGUtdHlwZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQWpmTm9kZSB7XG4gIG5vZGVUeXBlOiBBamZOb2RlVHlwZTtcblxuICAvLyBub2RlIGlkZW50aWZpY2F0aW9uIG51bWJlclxuICBpZDogbnVtYmVyO1xuXG4gIC8vIGlkIG9mIHByZWRlY2Vzc29yIG5vZGVcbiAgcGFyZW50OiBudW1iZXI7XG5cbiAgLy8gaXMgYSBpZCBvZiBwYXJlbnQgbm9kZSwgIGlmIHRoaXMgbm9kZSBpcyBwYXJ0IG9mIGFuIEFqZk5vZGVHcm91cFxuICBwYXJlbnROb2RlOiBudW1iZXI7XG5cbiAgLy8gYW4gQWpmQ29uZGl0aW9uIGFycmF5XG4gIGNvbmRpdGlvbmFsQnJhbmNoZXM6IEFqZkNvbmRpdGlvbltdO1xuXG4gIC8vIHRoZSBuYW1lIG9mIHRoZSBmaWVsZFxuICBuYW1lOiBzdHJpbmc7XG5cbiAgLy8gaHRlIGxhYmVsIG9mIHRoZSBmaWVsZFxuICBsYWJlbDogc3RyaW5nO1xuXG4gIC8vIEFqZkNvbmRpdGlvbiBmb3IgaGFuZGxpbmcgdmlzaWJpbGl0eVxuICB2aXNpYmlsaXR5PzogQWpmQ29uZGl0aW9uO1xufVxuIl19