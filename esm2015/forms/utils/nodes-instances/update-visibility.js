/**
 * @fileoverview added by tsickle
 * Generated from: src/core/forms/utils/nodes-instances/update-visibility.ts
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
import { evaluateExpression } from '@ajf/core/models';
/**
 * @param {?} instance
 * @param {?} context
 * @param {?=} branchVisibility
 * @return {?}
 */
export function updateVisibility(instance, context, branchVisibility = true) {
    if (instance.visibility == null) {
        instance.visible = false;
        return false;
    }
    /** @type {?} */
    const visibility = instance.visibility;
    /** @type {?} */
    const oldVisibility = instance.visible;
    /** @type {?} */
    let newVisibility = branchVisibility && evaluateExpression(visibility.condition, context);
    if (newVisibility !== instance.visible) {
        instance.visible = newVisibility;
    }
    return oldVisibility !== newVisibility;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLXZpc2liaWxpdHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9mb3Jtcy91dGlscy9ub2Rlcy1pbnN0YW5jZXMvdXBkYXRlLXZpc2liaWxpdHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzQkEsT0FBTyxFQUEyQixrQkFBa0IsRUFBQyxNQUFNLGtCQUFrQixDQUFDOzs7Ozs7O0FBSTlFLE1BQU0sVUFBVSxnQkFBZ0IsQ0FDNUIsUUFBeUIsRUFBRSxPQUFtQixFQUFFLGdCQUFnQixHQUFHLElBQUk7SUFDekUsSUFBSSxRQUFRLENBQUMsVUFBVSxJQUFJLElBQUksRUFBRTtRQUMvQixRQUFRLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUN6QixPQUFPLEtBQUssQ0FBQztLQUNkOztVQUNLLFVBQVUsR0FBaUIsUUFBUSxDQUFDLFVBQVU7O1VBRTlDLGFBQWEsR0FBWSxRQUFRLENBQUMsT0FBTzs7UUFDM0MsYUFBYSxHQUNiLGdCQUFnQixJQUFJLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDO0lBQ3pFLElBQUksYUFBYSxLQUFLLFFBQVEsQ0FBQyxPQUFPLEVBQUU7UUFDdEMsUUFBUSxDQUFDLE9BQU8sR0FBRyxhQUFhLENBQUM7S0FDbEM7SUFFRCxPQUFPLGFBQWEsS0FBSyxhQUFhLENBQUM7QUFDekMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgMjAxOCBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkNvbmRpdGlvbiwgQWpmQ29udGV4dCwgZXZhbHVhdGVFeHByZXNzaW9ufSBmcm9tICdAYWpmL2NvcmUvbW9kZWxzJztcblxuaW1wb3J0IHtBamZOb2RlSW5zdGFuY2V9IGZyb20gJy4uLy4uL2ludGVyZmFjZS9ub2Rlcy1pbnN0YW5jZXMvbm9kZS1pbnN0YW5jZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVWaXNpYmlsaXR5KFxuICAgIGluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UsIGNvbnRleHQ6IEFqZkNvbnRleHQsIGJyYW5jaFZpc2liaWxpdHkgPSB0cnVlKTogYm9vbGVhbiB7XG4gIGlmIChpbnN0YW5jZS52aXNpYmlsaXR5ID09IG51bGwpIHtcbiAgICBpbnN0YW5jZS52aXNpYmxlID0gZmFsc2U7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGNvbnN0IHZpc2liaWxpdHk6IEFqZkNvbmRpdGlvbiA9IGluc3RhbmNlLnZpc2liaWxpdHk7XG5cbiAgY29uc3Qgb2xkVmlzaWJpbGl0eTogYm9vbGVhbiA9IGluc3RhbmNlLnZpc2libGU7XG4gIGxldCBuZXdWaXNpYmlsaXR5OiBib29sZWFuID1cbiAgICAgIGJyYW5jaFZpc2liaWxpdHkgJiYgZXZhbHVhdGVFeHByZXNzaW9uKHZpc2liaWxpdHkuY29uZGl0aW9uLCBjb250ZXh0KTtcbiAgaWYgKG5ld1Zpc2liaWxpdHkgIT09IGluc3RhbmNlLnZpc2libGUpIHtcbiAgICBpbnN0YW5jZS52aXNpYmxlID0gbmV3VmlzaWJpbGl0eTtcbiAgfVxuXG4gIHJldHVybiBvbGRWaXNpYmlsaXR5ICE9PSBuZXdWaXNpYmlsaXR5O1xufVxuIl19