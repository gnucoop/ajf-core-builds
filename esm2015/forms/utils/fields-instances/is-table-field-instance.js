/**
 * @fileoverview added by tsickle
 * Generated from: src/core/forms/utils/fields-instances/is-table-field-instance.ts
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
import { isTableField } from '../fields/is-table-field';
import { isFieldInstance } from '../nodes-instances/is-field-instance';
/**
 * @param {?} nodeInstance
 * @return {?}
 */
export function isTableFieldInstance(nodeInstance) {
    return nodeInstance != null && isFieldInstance(nodeInstance) &&
        isTableField(((/** @type {?} */ (nodeInstance))).node);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXMtdGFibGUtZmllbGQtaW5zdGFuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9mb3Jtcy91dGlscy9maWVsZHMtaW5zdGFuY2VzL2lzLXRhYmxlLWZpZWxkLWluc3RhbmNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBd0JBLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUN0RCxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sc0NBQXNDLENBQUM7Ozs7O0FBRXJFLE1BQU0sVUFBVSxvQkFBb0IsQ0FBQyxZQUE2QjtJQUNoRSxPQUFPLFlBQVksSUFBSSxJQUFJLElBQUksZUFBZSxDQUFDLFlBQVksQ0FBQztRQUN4RCxZQUFZLENBQUMsQ0FBQyxtQkFBQSxZQUFZLEVBQW9CLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUM1RCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkZpZWxkSW5zdGFuY2V9IGZyb20gJy4uLy4uL2ludGVyZmFjZS9maWVsZHMtaW5zdGFuY2VzL2ZpZWxkLWluc3RhbmNlJztcbmltcG9ydCB7QWpmTm9kZUluc3RhbmNlfSBmcm9tICcuLi8uLi9pbnRlcmZhY2Uvbm9kZXMtaW5zdGFuY2VzL25vZGUtaW5zdGFuY2UnO1xuaW1wb3J0IHtpc1RhYmxlRmllbGR9IGZyb20gJy4uL2ZpZWxkcy9pcy10YWJsZS1maWVsZCc7XG5pbXBvcnQge2lzRmllbGRJbnN0YW5jZX0gZnJvbSAnLi4vbm9kZXMtaW5zdGFuY2VzL2lzLWZpZWxkLWluc3RhbmNlJztcblxuZXhwb3J0IGZ1bmN0aW9uIGlzVGFibGVGaWVsZEluc3RhbmNlKG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlKTogYm9vbGVhbiB7XG4gIHJldHVybiBub2RlSW5zdGFuY2UgIT0gbnVsbCAmJiBpc0ZpZWxkSW5zdGFuY2Uobm9kZUluc3RhbmNlKSAmJlxuICAgICAgaXNUYWJsZUZpZWxkKChub2RlSW5zdGFuY2UgYXMgQWpmRmllbGRJbnN0YW5jZSkubm9kZSk7XG59XG4iXX0=