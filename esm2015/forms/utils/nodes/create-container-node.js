/**
 * @fileoverview added by tsickle
 * Generated from: src/core/forms/utils/nodes/create-container-node.ts
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
 * @param {?} containerNode
 * @return {?}
 */
export function createContainerNode(containerNode) {
    /** @type {?} */
    const node = createNode(containerNode);
    return Object.assign(Object.assign({}, node), { nodes: containerNode.nodes || [] });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLWNvbnRhaW5lci1ub2RlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvZm9ybXMvdXRpbHMvbm9kZXMvY3JlYXRlLWNvbnRhaW5lci1ub2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBdUJBLE9BQU8sRUFBZ0IsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDOzs7OztBQUl4RCxNQUFNLFVBQVUsbUJBQW1CLENBQUMsYUFBcUM7O1VBQ2pFLElBQUksR0FBRyxVQUFVLENBQUMsYUFBYSxDQUFDO0lBQ3RDLHVDQUNLLElBQUksS0FDUCxLQUFLLEVBQUUsYUFBYSxDQUFDLEtBQUssSUFBSSxFQUFFLElBQ2hDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZDb250YWluZXJOb2RlfSBmcm9tICcuLi8uLi9pbnRlcmZhY2Uvbm9kZXMvY29udGFpbmVyLW5vZGUnO1xuaW1wb3J0IHtBamZOb2RlQ3JlYXRlLCBjcmVhdGVOb2RlfSBmcm9tICcuL2NyZWF0ZS1ub2RlJztcblxuZXhwb3J0IHR5cGUgQWpmQ29udGFpbmVyTm9kZUNyZWF0ZSA9IEFqZk5vZGVDcmVhdGUmUGFydGlhbDxBamZDb250YWluZXJOb2RlPjtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUNvbnRhaW5lck5vZGUoY29udGFpbmVyTm9kZTogQWpmQ29udGFpbmVyTm9kZUNyZWF0ZSk6IEFqZkNvbnRhaW5lck5vZGUge1xuICBjb25zdCBub2RlID0gY3JlYXRlTm9kZShjb250YWluZXJOb2RlKTtcbiAgcmV0dXJuIHtcbiAgICAuLi5ub2RlLFxuICAgIG5vZGVzOiBjb250YWluZXJOb2RlLm5vZGVzIHx8IFtdLFxuICB9O1xufVxuIl19