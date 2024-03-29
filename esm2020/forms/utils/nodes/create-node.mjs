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
 * It creates an AjfNode by schema.
 * If conditionalBranches is not defined assign {condition: 'true'}.
 * If parentNode is not defined assign 0.
 * If label is not defined assign ''.
 * If visibility is not defined assign {condition: 'true'}.
 */
export function createNode(node) {
    const conditionalBranches = node.conditionalBranches != null && node.conditionalBranches.length > 0
        ? node.conditionalBranches
        : [alwaysCondition()];
    return {
        ...node,
        parentNode: node.parentNode != null ? node.parentNode : 0,
        label: node.label || '',
        visibility: node.visibility || alwaysCondition(),
        conditionalBranches,
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLW5vZGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL2Zvcm1zL3NyYy91dGlscy9ub2Rlcy9jcmVhdGUtbm9kZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFLakQ7Ozs7OztHQU1HO0FBQ0gsTUFBTSxVQUFVLFVBQVUsQ0FBQyxJQUFtQjtJQUM1QyxNQUFNLG1CQUFtQixHQUN2QixJQUFJLENBQUMsbUJBQW1CLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLEdBQUcsQ0FBQztRQUNyRSxDQUFDLENBQUMsSUFBSSxDQUFDLG1CQUFtQjtRQUMxQixDQUFDLENBQUMsQ0FBQyxlQUFlLEVBQUUsQ0FBQyxDQUFDO0lBQzFCLE9BQU87UUFDTCxHQUFHLElBQUk7UUFDUCxVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekQsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLElBQUksRUFBRTtRQUN2QixVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsSUFBSSxlQUFlLEVBQUU7UUFDaEQsbUJBQW1CO0tBQ1QsQ0FBQztBQUNmLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7YWx3YXlzQ29uZGl0aW9ufSBmcm9tICdAYWpmL2NvcmUvbW9kZWxzJztcblxuaW1wb3J0IHtBamZOb2RlfSBmcm9tICcuLi8uLi9pbnRlcmZhY2Uvbm9kZXMvbm9kZSc7XG5cbmV4cG9ydCB0eXBlIEFqZk5vZGVDcmVhdGUgPSBQaWNrPEFqZk5vZGUsICdub2RlVHlwZScgfCAnaWQnIHwgJ3BhcmVudCcgfCAnbmFtZSc+ICYgUGFydGlhbDxBamZOb2RlPjtcbi8qKlxuICogSXQgY3JlYXRlcyBhbiBBamZOb2RlIGJ5IHNjaGVtYS5cbiAqIElmIGNvbmRpdGlvbmFsQnJhbmNoZXMgaXMgbm90IGRlZmluZWQgYXNzaWduIHtjb25kaXRpb246ICd0cnVlJ30uXG4gKiBJZiBwYXJlbnROb2RlIGlzIG5vdCBkZWZpbmVkIGFzc2lnbiAwLlxuICogSWYgbGFiZWwgaXMgbm90IGRlZmluZWQgYXNzaWduICcnLlxuICogSWYgdmlzaWJpbGl0eSBpcyBub3QgZGVmaW5lZCBhc3NpZ24ge2NvbmRpdGlvbjogJ3RydWUnfS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZU5vZGUobm9kZTogQWpmTm9kZUNyZWF0ZSk6IEFqZk5vZGUge1xuICBjb25zdCBjb25kaXRpb25hbEJyYW5jaGVzID1cbiAgICBub2RlLmNvbmRpdGlvbmFsQnJhbmNoZXMgIT0gbnVsbCAmJiBub2RlLmNvbmRpdGlvbmFsQnJhbmNoZXMubGVuZ3RoID4gMFxuICAgICAgPyBub2RlLmNvbmRpdGlvbmFsQnJhbmNoZXNcbiAgICAgIDogW2Fsd2F5c0NvbmRpdGlvbigpXTtcbiAgcmV0dXJuIHtcbiAgICAuLi5ub2RlLFxuICAgIHBhcmVudE5vZGU6IG5vZGUucGFyZW50Tm9kZSAhPSBudWxsID8gbm9kZS5wYXJlbnROb2RlIDogMCxcbiAgICBsYWJlbDogbm9kZS5sYWJlbCB8fCAnJyxcbiAgICB2aXNpYmlsaXR5OiBub2RlLnZpc2liaWxpdHkgfHwgYWx3YXlzQ29uZGl0aW9uKCksXG4gICAgY29uZGl0aW9uYWxCcmFuY2hlcyxcbiAgfSBhcyBBamZOb2RlO1xufVxuIl19