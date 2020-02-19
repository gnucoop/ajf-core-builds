/**
 * @fileoverview added by tsickle
 * Generated from: src/core/forms/utils/nodes/create-repeating-node.ts
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
 * @param {?} repeatingNode
 * @return {?}
 */
export function createRepeatingNode(repeatingNode) {
    /** @type {?} */
    const node = createNode(repeatingNode);
    return Object.assign(Object.assign(Object.assign({}, repeatingNode), node), { minReps: repeatingNode.minReps != null ? repeatingNode.minReps : 1, maxReps: repeatingNode.maxReps != null ? repeatingNode.maxReps : 0 });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLXJlcGVhdGluZy1ub2RlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvZm9ybXMvdXRpbHMvbm9kZXMvY3JlYXRlLXJlcGVhdGluZy1ub2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBdUJBLE9BQU8sRUFBZ0IsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDOzs7OztBQUl4RCxNQUFNLFVBQVUsbUJBQW1CLENBQUMsYUFBcUM7O1VBQ2pFLElBQUksR0FBRyxVQUFVLENBQUMsYUFBYSxDQUFDO0lBQ3RDLHFEQUNLLGFBQWEsR0FDYixJQUFJLEtBQ1AsT0FBTyxFQUFFLGFBQWEsQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQ2xFLE9BQU8sRUFBRSxhQUFhLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUNsRTtBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTggR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZSZXBlYXRpbmdOb2RlfSBmcm9tICcuLi8uLi9pbnRlcmZhY2Uvbm9kZXMvcmVwZWF0aW5nLW5vZGUnO1xuaW1wb3J0IHtBamZOb2RlQ3JlYXRlLCBjcmVhdGVOb2RlfSBmcm9tICcuL2NyZWF0ZS1ub2RlJztcblxuZXhwb3J0IHR5cGUgQWpmUmVwZWF0aW5nTm9kZUNyZWF0ZSA9IEFqZk5vZGVDcmVhdGUmUGFydGlhbDxBamZSZXBlYXRpbmdOb2RlPjtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVJlcGVhdGluZ05vZGUocmVwZWF0aW5nTm9kZTogQWpmUmVwZWF0aW5nTm9kZUNyZWF0ZSk6IEFqZlJlcGVhdGluZ05vZGUge1xuICBjb25zdCBub2RlID0gY3JlYXRlTm9kZShyZXBlYXRpbmdOb2RlKTtcbiAgcmV0dXJuIHtcbiAgICAuLi5yZXBlYXRpbmdOb2RlLFxuICAgIC4uLm5vZGUsXG4gICAgbWluUmVwczogcmVwZWF0aW5nTm9kZS5taW5SZXBzICE9IG51bGwgPyByZXBlYXRpbmdOb2RlLm1pblJlcHMgOiAxLFxuICAgIG1heFJlcHM6IHJlcGVhdGluZ05vZGUubWF4UmVwcyAhPSBudWxsID8gcmVwZWF0aW5nTm9kZS5tYXhSZXBzIDogMCxcbiAgfTtcbn1cbiJdfQ==