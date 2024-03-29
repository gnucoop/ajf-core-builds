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
import { deepCopy } from '@ajf/core/utils';
import { createFieldInstance } from './create-field-instance';
/**
 * to mantain retrocompatibility with old string type convert string to AjfTableCell
 * check  node.rows: (string|AjfTableCell)[][];
 * if elem of map is string convert in to AjfTableCell object
 */
function normalizeRows(node) {
    node.rows.forEach((row, rowIdx) => {
        row.forEach((elem, elemIdx) => {
            if (typeof elem === 'string') {
                node.rows[rowIdx][elemIdx] = { formula: elem, editable: node.editable };
            }
        });
    });
}
/**
 * Create an Table Fieldinstance.
 * Extends simple field instance with context,hideEmptyRows and controls.
 * If hideEmptyRows is not defined in instance set with false.
 * Assign empty array to controls
 */
export function createTableFieldInstance(instance, context) {
    instance = deepCopy(instance);
    normalizeRows(instance.node);
    const fieldInstance = createFieldInstance(instance, context);
    return {
        ...fieldInstance,
        node: instance.node,
        context,
        hideEmptyRows: instance.hideEmptyRows || false,
        controls: [],
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLXRhYmxlLWZpZWxkLWluc3RhbmNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9mb3Jtcy9zcmMvdXRpbHMvZmllbGRzLWluc3RhbmNlcy9jcmVhdGUtdGFibGUtZmllbGQtaW5zdGFuY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBR0gsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBS3pDLE9BQU8sRUFBeUIsbUJBQW1CLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUdwRjs7OztHQUlHO0FBQ0gsU0FBUyxhQUFhLENBQUMsSUFBbUI7SUFDeEMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDaEMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRTtZQUM1QixJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsRUFBRTtnQkFDNUIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUMsQ0FBQzthQUN2RTtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBRUQ7Ozs7O0dBS0c7QUFDSCxNQUFNLFVBQVUsd0JBQXdCLENBQ3RDLFFBQXFDLEVBQ3JDLE9BQW1CO0lBRW5CLFFBQVEsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDOUIsYUFBYSxDQUFDLFFBQVEsQ0FBQyxJQUFxQixDQUFDLENBQUM7SUFDOUMsTUFBTSxhQUFhLEdBQUcsbUJBQW1CLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzdELE9BQU87UUFDTCxHQUFHLGFBQWE7UUFDaEIsSUFBSSxFQUFFLFFBQVEsQ0FBQyxJQUFJO1FBQ25CLE9BQU87UUFDUCxhQUFhLEVBQUUsUUFBUSxDQUFDLGFBQWEsSUFBSSxLQUFLO1FBQzlDLFFBQVEsRUFBRSxFQUFFO0tBQ2IsQ0FBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmQ29udGV4dH0gZnJvbSAnQGFqZi9jb3JlL21vZGVscyc7XG5pbXBvcnQge2RlZXBDb3B5fSBmcm9tICdAYWpmL2NvcmUvdXRpbHMnO1xuXG5pbXBvcnQge0FqZlRhYmxlRmllbGRJbnN0YW5jZX0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL2ZpZWxkcy1pbnN0YW5jZXMvdGFibGUtZmllbGQtaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZUYWJsZUZpZWxkfSBmcm9tICcuLi8uLi9pbnRlcmZhY2UvZmllbGRzL3RhYmxlLWZpZWxkJztcblxuaW1wb3J0IHtBamZGaWVsZEluc3RhbmNlQ3JlYXRlLCBjcmVhdGVGaWVsZEluc3RhbmNlfSBmcm9tICcuL2NyZWF0ZS1maWVsZC1pbnN0YW5jZSc7XG5cbmV4cG9ydCB0eXBlIEFqZlRhYmxlRmllbGRJbnN0YW5jZUNyZWF0ZSA9IEFqZkZpZWxkSW5zdGFuY2VDcmVhdGUgJiBQYXJ0aWFsPEFqZlRhYmxlRmllbGRJbnN0YW5jZT47XG4vKipcbiAqIHRvIG1hbnRhaW4gcmV0cm9jb21wYXRpYmlsaXR5IHdpdGggb2xkIHN0cmluZyB0eXBlIGNvbnZlcnQgc3RyaW5nIHRvIEFqZlRhYmxlQ2VsbFxuICogY2hlY2sgIG5vZGUucm93czogKHN0cmluZ3xBamZUYWJsZUNlbGwpW11bXTtcbiAqIGlmIGVsZW0gb2YgbWFwIGlzIHN0cmluZyBjb252ZXJ0IGluIHRvIEFqZlRhYmxlQ2VsbCBvYmplY3RcbiAqL1xuZnVuY3Rpb24gbm9ybWFsaXplUm93cyhub2RlOiBBamZUYWJsZUZpZWxkKTogdm9pZCB7XG4gIG5vZGUucm93cy5mb3JFYWNoKChyb3csIHJvd0lkeCkgPT4ge1xuICAgIHJvdy5mb3JFYWNoKChlbGVtLCBlbGVtSWR4KSA9PiB7XG4gICAgICBpZiAodHlwZW9mIGVsZW0gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIG5vZGUucm93c1tyb3dJZHhdW2VsZW1JZHhdID0ge2Zvcm11bGE6IGVsZW0sIGVkaXRhYmxlOiBub2RlLmVkaXRhYmxlfTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59XG5cbi8qKlxuICogQ3JlYXRlIGFuIFRhYmxlIEZpZWxkaW5zdGFuY2UuXG4gKiBFeHRlbmRzIHNpbXBsZSBmaWVsZCBpbnN0YW5jZSB3aXRoIGNvbnRleHQsaGlkZUVtcHR5Um93cyBhbmQgY29udHJvbHMuXG4gKiBJZiBoaWRlRW1wdHlSb3dzIGlzIG5vdCBkZWZpbmVkIGluIGluc3RhbmNlIHNldCB3aXRoIGZhbHNlLlxuICogQXNzaWduIGVtcHR5IGFycmF5IHRvIGNvbnRyb2xzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVUYWJsZUZpZWxkSW5zdGFuY2UoXG4gIGluc3RhbmNlOiBBamZUYWJsZUZpZWxkSW5zdGFuY2VDcmVhdGUsXG4gIGNvbnRleHQ6IEFqZkNvbnRleHQsXG4pOiBBamZUYWJsZUZpZWxkSW5zdGFuY2Uge1xuICBpbnN0YW5jZSA9IGRlZXBDb3B5KGluc3RhbmNlKTtcbiAgbm9ybWFsaXplUm93cyhpbnN0YW5jZS5ub2RlIGFzIEFqZlRhYmxlRmllbGQpO1xuICBjb25zdCBmaWVsZEluc3RhbmNlID0gY3JlYXRlRmllbGRJbnN0YW5jZShpbnN0YW5jZSwgY29udGV4dCk7XG4gIHJldHVybiB7XG4gICAgLi4uZmllbGRJbnN0YW5jZSxcbiAgICBub2RlOiBpbnN0YW5jZS5ub2RlLFxuICAgIGNvbnRleHQsXG4gICAgaGlkZUVtcHR5Um93czogaW5zdGFuY2UuaGlkZUVtcHR5Um93cyB8fCBmYWxzZSxcbiAgICBjb250cm9sczogW10sXG4gIH07XG59XG4iXX0=