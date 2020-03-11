/**
 * @fileoverview added by tsickle
 * Generated from: src/core/forms/utils/nodes/create-node.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLW5vZGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9mb3Jtcy91dGlscy9ub2Rlcy9jcmVhdGUtbm9kZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCQSxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7Ozs7O0FBTWpELE1BQU0sVUFBVSxVQUFVLENBQUMsSUFBbUI7O1VBQ3RDLG1CQUFtQixHQUNyQixJQUFJLENBQUMsbUJBQW1CLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDekUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDMUIsQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUN2Qix1Q0FDSyxJQUFJLEtBQ1AsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQ3pELEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxJQUFJLEVBQUUsRUFDdkIsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLElBQUksZUFBZSxFQUFFLEVBQ2hELG1CQUFtQixJQUNuQjtBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7YWx3YXlzQ29uZGl0aW9ufSBmcm9tICdAYWpmL2NvcmUvbW9kZWxzJztcblxuaW1wb3J0IHtBamZOb2RlfSBmcm9tICcuLi8uLi9pbnRlcmZhY2Uvbm9kZXMvbm9kZSc7XG5cbmV4cG9ydCB0eXBlIEFqZk5vZGVDcmVhdGUgPSBQaWNrPEFqZk5vZGUsICdub2RlVHlwZSd8J2lkJ3wncGFyZW50J3wnbmFtZSc+JlBhcnRpYWw8QWpmTm9kZT47XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVOb2RlKG5vZGU6IEFqZk5vZGVDcmVhdGUpOiBBamZOb2RlIHtcbiAgY29uc3QgY29uZGl0aW9uYWxCcmFuY2hlcyA9XG4gICAgICBub2RlLmNvbmRpdGlvbmFsQnJhbmNoZXMgIT0gbnVsbCAmJiBub2RlLmNvbmRpdGlvbmFsQnJhbmNoZXMubGVuZ3RoID4gMCA/XG4gICAgICBub2RlLmNvbmRpdGlvbmFsQnJhbmNoZXMgOlxuICAgICAgW2Fsd2F5c0NvbmRpdGlvbigpXTtcbiAgcmV0dXJuIHtcbiAgICAuLi5ub2RlLFxuICAgIHBhcmVudE5vZGU6IG5vZGUucGFyZW50Tm9kZSAhPSBudWxsID8gbm9kZS5wYXJlbnROb2RlIDogMCxcbiAgICBsYWJlbDogbm9kZS5sYWJlbCB8fCAnJyxcbiAgICB2aXNpYmlsaXR5OiBub2RlLnZpc2liaWxpdHkgfHwgYWx3YXlzQ29uZGl0aW9uKCksXG4gICAgY29uZGl0aW9uYWxCcmFuY2hlcyxcbiAgfTtcbn1cbiJdfQ==