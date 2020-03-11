/**
 * @fileoverview added by tsickle
 * Generated from: src/core/forms/utils/fields-instances/update-next-slide-condition.ts
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
import { evaluateExpression } from '@ajf/core/models';
/**
 * @param {?} instance
 * @param {?} context
 * @return {?}
 */
export function updateNextSlideCondition(instance, context) {
    if (instance.nextSlideCondition != null) {
        return evaluateExpression(instance.nextSlideCondition.condition, context);
    }
    return false;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLW5leHQtc2xpZGUtY29uZGl0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvZm9ybXMvdXRpbHMvZmllbGRzLWluc3RhbmNlcy91cGRhdGUtbmV4dC1zbGlkZS1jb25kaXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzQkEsT0FBTyxFQUFhLGtCQUFrQixFQUFDLE1BQU0sa0JBQWtCLENBQUM7Ozs7OztBQUloRSxNQUFNLFVBQVUsd0JBQXdCLENBQUMsUUFBMEIsRUFBRSxPQUFtQjtJQUN0RixJQUFJLFFBQVEsQ0FBQyxrQkFBa0IsSUFBSSxJQUFJLEVBQUU7UUFDdkMsT0FBTyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsa0JBQWtCLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0tBQzNFO0lBQ0QsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkNvbnRleHQsIGV2YWx1YXRlRXhwcmVzc2lvbn0gZnJvbSAnQGFqZi9jb3JlL21vZGVscyc7XG5cbmltcG9ydCB7QWpmRmllbGRJbnN0YW5jZX0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL2ZpZWxkcy1pbnN0YW5jZXMvZmllbGQtaW5zdGFuY2UnO1xuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlTmV4dFNsaWRlQ29uZGl0aW9uKGluc3RhbmNlOiBBamZGaWVsZEluc3RhbmNlLCBjb250ZXh0OiBBamZDb250ZXh0KTogYm9vbGVhbiB7XG4gIGlmIChpbnN0YW5jZS5uZXh0U2xpZGVDb25kaXRpb24gIT0gbnVsbCkge1xuICAgIHJldHVybiBldmFsdWF0ZUV4cHJlc3Npb24oaW5zdGFuY2UubmV4dFNsaWRlQ29uZGl0aW9uLmNvbmRpdGlvbiwgY29udGV4dCk7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuIl19