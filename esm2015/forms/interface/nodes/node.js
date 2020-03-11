/**
 * @fileoverview added by tsickle
 * Generated from: src/core/forms/interface/nodes/node.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2Zvcm1zL2ludGVyZmFjZS9ub2Rlcy9ub2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBeUJBLDZCQXVCQzs7O0lBdEJDLDJCQUFzQjs7SUFHdEIscUJBQVc7O0lBR1gseUJBQWU7O0lBR2YsNkJBQW1COztJQUduQixzQ0FBb0M7O0lBR3BDLHVCQUFhOztJQUdiLHdCQUFjOztJQUdkLDZCQUEwQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZDb25kaXRpb259IGZyb20gJ0BhamYvY29yZS9tb2RlbHMnO1xuaW1wb3J0IHtBamZOb2RlVHlwZX0gZnJvbSAnLi9ub2RlLXR5cGUnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEFqZk5vZGUge1xuICBub2RlVHlwZTogQWpmTm9kZVR5cGU7XG5cbiAgLy8gbm9kZSBpZGVudGlmaWNhdGlvbiBudW1iZXJcbiAgaWQ6IG51bWJlcjtcblxuICAvLyBpZCBvZiBwcmVkZWNlc3NvciBub2RlXG4gIHBhcmVudDogbnVtYmVyO1xuXG4gIC8vIGlzIGEgaWQgb2YgcGFyZW50IG5vZGUsICBpZiB0aGlzIG5vZGUgaXMgcGFydCBvZiBhbiBBamZOb2RlR3JvdXBcbiAgcGFyZW50Tm9kZTogbnVtYmVyO1xuXG4gIC8vIGFuIEFqZkNvbmRpdGlvbiBhcnJheVxuICBjb25kaXRpb25hbEJyYW5jaGVzOiBBamZDb25kaXRpb25bXTtcblxuICAvLyB0aGUgbmFtZSBvZiB0aGUgZmllbGRcbiAgbmFtZTogc3RyaW5nO1xuXG4gIC8vIGh0ZSBsYWJlbCBvZiB0aGUgZmllbGRcbiAgbGFiZWw6IHN0cmluZztcblxuICAvLyBBamZDb25kaXRpb24gZm9yIGhhbmRsaW5nIHZpc2liaWxpdHlcbiAgdmlzaWJpbGl0eT86IEFqZkNvbmRpdGlvbjtcbn1cbiJdfQ==