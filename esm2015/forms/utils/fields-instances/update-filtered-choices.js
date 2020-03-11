/**
 * @fileoverview added by tsickle
 * Generated from: src/core/forms/utils/fields-instances/update-filtered-choices.ts
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
export function updateFilteredChoices(instance, context) {
    if (instance.choicesFilter != null) {
        instance.filteredChoices = instance.node.choicesOrigin.choices.filter((/**
         * @param {?} c
         * @return {?}
         */
        c => {
            context.$choice = c;
            context.$choiceValue = c.value;
            return evaluateExpression((/** @type {?} */ (instance.choicesFilter)).formula, context);
        }));
    }
    else {
        instance.filteredChoices = instance.node.choicesOrigin.choices;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLWZpbHRlcmVkLWNob2ljZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9mb3Jtcy91dGlscy9maWVsZHMtaW5zdGFuY2VzL3VwZGF0ZS1maWx0ZXJlZC1jaG9pY2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBLE9BQU8sRUFBYSxrQkFBa0IsRUFBQyxNQUFNLGtCQUFrQixDQUFDOzs7Ozs7QUFNaEUsTUFBTSxVQUFVLHFCQUFxQixDQUNqQyxRQUEwQyxFQUFFLE9BQW1CO0lBQ2pFLElBQUksUUFBUSxDQUFDLGFBQWEsSUFBSSxJQUFJLEVBQUU7UUFDbEMsUUFBUSxDQUFDLGVBQWUsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsTUFBTTs7OztRQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ3hFLE9BQU8sQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO1lBQ3BCLE9BQU8sQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQztZQUMvQixPQUFPLGtCQUFrQixDQUFDLG1CQUFBLFFBQVEsQ0FBQyxhQUFhLEVBQUMsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDdEUsQ0FBQyxFQUFDLENBQUM7S0FDSjtTQUFNO1FBQ0wsUUFBUSxDQUFDLGVBQWUsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUM7S0FDaEU7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkNvbnRleHQsIGV2YWx1YXRlRXhwcmVzc2lvbn0gZnJvbSAnQGFqZi9jb3JlL21vZGVscyc7XG5cbmltcG9ydCB7XG4gIEFqZkZpZWxkV2l0aENob2ljZXNJbnN0YW5jZVxufSBmcm9tICcuLi8uLi9pbnRlcmZhY2UvZmllbGRzLWluc3RhbmNlcy9maWVsZC13aXRoLWNob2ljZXMtaW5zdGFuY2UnO1xuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlRmlsdGVyZWRDaG9pY2VzKFxuICAgIGluc3RhbmNlOiBBamZGaWVsZFdpdGhDaG9pY2VzSW5zdGFuY2U8YW55PiwgY29udGV4dDogQWpmQ29udGV4dCk6IHZvaWQge1xuICBpZiAoaW5zdGFuY2UuY2hvaWNlc0ZpbHRlciAhPSBudWxsKSB7XG4gICAgaW5zdGFuY2UuZmlsdGVyZWRDaG9pY2VzID0gaW5zdGFuY2Uubm9kZS5jaG9pY2VzT3JpZ2luLmNob2ljZXMuZmlsdGVyKGMgPT4ge1xuICAgICAgY29udGV4dC4kY2hvaWNlID0gYztcbiAgICAgIGNvbnRleHQuJGNob2ljZVZhbHVlID0gYy52YWx1ZTtcbiAgICAgIHJldHVybiBldmFsdWF0ZUV4cHJlc3Npb24oaW5zdGFuY2UuY2hvaWNlc0ZpbHRlciEuZm9ybXVsYSwgY29udGV4dCk7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgaW5zdGFuY2UuZmlsdGVyZWRDaG9pY2VzID0gaW5zdGFuY2Uubm9kZS5jaG9pY2VzT3JpZ2luLmNob2ljZXM7XG4gIH1cbn1cbiJdfQ==