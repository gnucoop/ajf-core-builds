/**
 * @fileoverview added by tsickle
 * Generated from: src/core/forms/utils/nodes/create-node.ts
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
import { alwaysCondition } from '@ajf/core/models';
/**
 * @param {?} node
 * @return {?}
 */
export function createNode(node) {
    /** @type {?} */
    const conditionalBranches = node.conditionalBranches != null && node.conditionalBranches.length > 0 ?
        node.conditionalBranches :
        [alwaysCondition()];
    return Object.assign(Object.assign({}, node), { parentNode: node.parentNode != null ? node.parentNode : 0, label: node.label || '', visibility: node.visibility || alwaysCondition(), conditionalBranches });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLW5vZGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9mb3Jtcy91dGlscy9ub2Rlcy9jcmVhdGUtbm9kZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCQSxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7Ozs7O0FBTWpELE1BQU0sVUFBVSxVQUFVLENBQUMsSUFBbUI7O1VBQ3RDLG1CQUFtQixHQUNyQixJQUFJLENBQUMsbUJBQW1CLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDekUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDMUIsQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUN2Qix1Q0FDSyxJQUFJLEtBQ1AsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQ3pELEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxJQUFJLEVBQUUsRUFDdkIsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLElBQUksZUFBZSxFQUFFLEVBQ2hELG1CQUFtQixJQUNuQjtBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTggR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHthbHdheXNDb25kaXRpb259IGZyb20gJ0BhamYvY29yZS9tb2RlbHMnO1xuXG5pbXBvcnQge0FqZk5vZGV9IGZyb20gJy4uLy4uL2ludGVyZmFjZS9ub2Rlcy9ub2RlJztcblxuZXhwb3J0IHR5cGUgQWpmTm9kZUNyZWF0ZSA9IFBpY2s8QWpmTm9kZSwgJ25vZGVUeXBlJ3wnaWQnfCdwYXJlbnQnfCduYW1lJz4mUGFydGlhbDxBamZOb2RlPjtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZU5vZGUobm9kZTogQWpmTm9kZUNyZWF0ZSk6IEFqZk5vZGUge1xuICBjb25zdCBjb25kaXRpb25hbEJyYW5jaGVzID1cbiAgICAgIG5vZGUuY29uZGl0aW9uYWxCcmFuY2hlcyAhPSBudWxsICYmIG5vZGUuY29uZGl0aW9uYWxCcmFuY2hlcy5sZW5ndGggPiAwID9cbiAgICAgIG5vZGUuY29uZGl0aW9uYWxCcmFuY2hlcyA6XG4gICAgICBbYWx3YXlzQ29uZGl0aW9uKCldO1xuICByZXR1cm4ge1xuICAgIC4uLm5vZGUsXG4gICAgcGFyZW50Tm9kZTogbm9kZS5wYXJlbnROb2RlICE9IG51bGwgPyBub2RlLnBhcmVudE5vZGUgOiAwLFxuICAgIGxhYmVsOiBub2RlLmxhYmVsIHx8ICcnLFxuICAgIHZpc2liaWxpdHk6IG5vZGUudmlzaWJpbGl0eSB8fCBhbHdheXNDb25kaXRpb24oKSxcbiAgICBjb25kaXRpb25hbEJyYW5jaGVzLFxuICB9O1xufVxuIl19