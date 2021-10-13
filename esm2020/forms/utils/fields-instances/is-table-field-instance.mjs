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
import { isTableField } from '../fields/is-table-field';
import { isFieldInstance } from '../nodes-instances/is-field-instance';
/**
 * It is true if the nodeInstance is a fieldInstance and
 * if the node of instance is a Table field.
 */
export function isTableFieldInstance(nodeInstance) {
    return nodeInstance != null && isFieldInstance(nodeInstance) &&
        isTableField(nodeInstance.node);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXMtdGFibGUtZmllbGQtaW5zdGFuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9mb3Jtcy91dGlscy9maWVsZHMtaW5zdGFuY2VzL2lzLXRhYmxlLWZpZWxkLWluc3RhbmNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUlILE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUN0RCxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sc0NBQXNDLENBQUM7QUFHckU7OztHQUdHO0FBQ0gsTUFBTSxVQUFVLG9CQUFvQixDQUFDLFlBQTZCO0lBQ2hFLE9BQU8sWUFBWSxJQUFJLElBQUksSUFBSSxlQUFlLENBQUMsWUFBWSxDQUFDO1FBQ3hELFlBQVksQ0FBRSxZQUFpQyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzVELENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmRmllbGRJbnN0YW5jZX0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL2ZpZWxkcy1pbnN0YW5jZXMvZmllbGQtaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZOb2RlSW5zdGFuY2V9IGZyb20gJy4uLy4uL2ludGVyZmFjZS9ub2Rlcy1pbnN0YW5jZXMvbm9kZS1pbnN0YW5jZSc7XG5pbXBvcnQge2lzVGFibGVGaWVsZH0gZnJvbSAnLi4vZmllbGRzL2lzLXRhYmxlLWZpZWxkJztcbmltcG9ydCB7aXNGaWVsZEluc3RhbmNlfSBmcm9tICcuLi9ub2Rlcy1pbnN0YW5jZXMvaXMtZmllbGQtaW5zdGFuY2UnO1xuXG5cbi8qKlxuICogSXQgaXMgdHJ1ZSBpZiB0aGUgbm9kZUluc3RhbmNlIGlzIGEgZmllbGRJbnN0YW5jZSBhbmRcbiAqIGlmIHRoZSBub2RlIG9mIGluc3RhbmNlIGlzIGEgVGFibGUgZmllbGQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1RhYmxlRmllbGRJbnN0YW5jZShub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSk6IGJvb2xlYW4ge1xuICByZXR1cm4gbm9kZUluc3RhbmNlICE9IG51bGwgJiYgaXNGaWVsZEluc3RhbmNlKG5vZGVJbnN0YW5jZSkgJiZcbiAgICAgIGlzVGFibGVGaWVsZCgobm9kZUluc3RhbmNlIGFzIEFqZkZpZWxkSW5zdGFuY2UpLm5vZGUpO1xufVxuIl19