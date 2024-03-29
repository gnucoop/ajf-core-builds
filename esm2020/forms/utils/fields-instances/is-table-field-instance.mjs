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
 * It is true if the instance is a fieldInstance and
 * if the node of instance is a Table field.
 */
export function isTableFieldInstance(instance) {
    return instance != null && isFieldInstance(instance) && isTableField(instance.node);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXMtdGFibGUtZmllbGQtaW5zdGFuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL2Zvcm1zL3NyYy91dGlscy9maWVsZHMtaW5zdGFuY2VzL2lzLXRhYmxlLWZpZWxkLWluc3RhbmNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUlILE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUN0RCxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sc0NBQXNDLENBQUM7QUFFckU7OztHQUdHO0FBQ0gsTUFBTSxVQUFVLG9CQUFvQixDQUFDLFFBQXlCO0lBQzVELE9BQU8sUUFBUSxJQUFJLElBQUksSUFBSSxlQUFlLENBQUMsUUFBUSxDQUFDLElBQUksWUFBWSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN0RixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZlRhYmxlRmllbGRJbnN0YW5jZX0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL2ZpZWxkcy1pbnN0YW5jZXMvdGFibGUtZmllbGQtaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZOb2RlSW5zdGFuY2V9IGZyb20gJy4uLy4uL2ludGVyZmFjZS9ub2Rlcy1pbnN0YW5jZXMvbm9kZS1pbnN0YW5jZSc7XG5pbXBvcnQge2lzVGFibGVGaWVsZH0gZnJvbSAnLi4vZmllbGRzL2lzLXRhYmxlLWZpZWxkJztcbmltcG9ydCB7aXNGaWVsZEluc3RhbmNlfSBmcm9tICcuLi9ub2Rlcy1pbnN0YW5jZXMvaXMtZmllbGQtaW5zdGFuY2UnO1xuXG4vKipcbiAqIEl0IGlzIHRydWUgaWYgdGhlIGluc3RhbmNlIGlzIGEgZmllbGRJbnN0YW5jZSBhbmRcbiAqIGlmIHRoZSBub2RlIG9mIGluc3RhbmNlIGlzIGEgVGFibGUgZmllbGQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1RhYmxlRmllbGRJbnN0YW5jZShpbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlKTogaW5zdGFuY2UgaXMgQWpmVGFibGVGaWVsZEluc3RhbmNlIHtcbiAgcmV0dXJuIGluc3RhbmNlICE9IG51bGwgJiYgaXNGaWVsZEluc3RhbmNlKGluc3RhbmNlKSAmJiBpc1RhYmxlRmllbGQoaW5zdGFuY2Uubm9kZSk7XG59XG4iXX0=