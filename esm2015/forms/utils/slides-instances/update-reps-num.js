/**
 * @fileoverview added by tsickle
 * Generated from: src/core/forms/utils/slides-instances/update-reps-num.ts
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
import { nodeInstanceCompleteName } from '../nodes-instances/node-instance-complete-name';
/**
 * @param {?} instance
 * @param {?=} context
 * @return {?}
 */
export function updateRepsNum(instance, context) {
    /** @type {?} */
    const oldReps = instance.reps || 0;
    context = context || {};
    if (instance.node.formulaReps == null) {
        /** @type {?} */
        const ctxReps = context[nodeInstanceCompleteName(instance)];
        if (ctxReps != null) {
            instance.reps = ctxReps;
        }
        else if (oldReps == 0) {
            instance.reps = 1;
        }
    }
    else {
        /** @type {?} */
        let newReps = evaluateExpression(instance.node.formulaReps.formula, context);
        if (newReps !== oldReps) {
            instance.reps = newReps;
        }
    }
    instance.canAdd = instance.node.maxReps === 0 || instance.reps < instance.node.maxReps;
    instance.canRemove = instance.node.minReps === 0 || instance.reps > instance.node.minReps;
    return oldReps;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLXJlcHMtbnVtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvZm9ybXMvdXRpbHMvc2xpZGVzLWluc3RhbmNlcy91cGRhdGUtcmVwcy1udW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzQkEsT0FBTyxFQUFhLGtCQUFrQixFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFHaEUsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0sZ0RBQWdELENBQUM7Ozs7OztBQUV4RixNQUFNLFVBQVUsYUFBYSxDQUFDLFFBQWtDLEVBQUUsT0FBb0I7O1VBQzlFLE9BQU8sR0FBVyxRQUFRLENBQUMsSUFBSSxJQUFJLENBQUM7SUFDMUMsT0FBTyxHQUFHLE9BQU8sSUFBSSxFQUFFLENBQUM7SUFDeEIsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLEVBQUU7O2NBQy9CLE9BQU8sR0FBRyxPQUFPLENBQUMsd0JBQXdCLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDM0QsSUFBSSxPQUFPLElBQUksSUFBSSxFQUFFO1lBQ25CLFFBQVEsQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDO1NBQ3pCO2FBQU0sSUFBSSxPQUFPLElBQUksQ0FBQyxFQUFFO1lBQ3ZCLFFBQVEsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO1NBQ25CO0tBQ0Y7U0FBTTs7WUFDRCxPQUFPLEdBQUcsa0JBQWtCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQztRQUM1RSxJQUFJLE9BQU8sS0FBSyxPQUFPLEVBQUU7WUFDdkIsUUFBUSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUM7U0FDekI7S0FDRjtJQUNELFFBQVEsQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLEtBQUssQ0FBQyxJQUFJLFFBQVEsQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDdkYsUUFBUSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sS0FBSyxDQUFDLElBQUksUUFBUSxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUMxRixPQUFPLE9BQU8sQ0FBQztBQUNqQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkNvbnRleHQsIGV2YWx1YXRlRXhwcmVzc2lvbn0gZnJvbSAnQGFqZi9jb3JlL21vZGVscyc7XG5cbmltcG9ydCB7QWpmUmVwZWF0aW5nTm9kZUluc3RhbmNlfSBmcm9tICcuLi8uLi9pbnRlcmZhY2Uvbm9kZXMtaW5zdGFuY2VzL3JlcGVhdGluZy1ub2RlLWluc3RhbmNlJztcbmltcG9ydCB7bm9kZUluc3RhbmNlQ29tcGxldGVOYW1lfSBmcm9tICcuLi9ub2Rlcy1pbnN0YW5jZXMvbm9kZS1pbnN0YW5jZS1jb21wbGV0ZS1uYW1lJztcblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZVJlcHNOdW0oaW5zdGFuY2U6IEFqZlJlcGVhdGluZ05vZGVJbnN0YW5jZSwgY29udGV4dD86IEFqZkNvbnRleHQpOiBudW1iZXIge1xuICBjb25zdCBvbGRSZXBzOiBudW1iZXIgPSBpbnN0YW5jZS5yZXBzIHx8IDA7XG4gIGNvbnRleHQgPSBjb250ZXh0IHx8IHt9O1xuICBpZiAoaW5zdGFuY2Uubm9kZS5mb3JtdWxhUmVwcyA9PSBudWxsKSB7XG4gICAgY29uc3QgY3R4UmVwcyA9IGNvbnRleHRbbm9kZUluc3RhbmNlQ29tcGxldGVOYW1lKGluc3RhbmNlKV07XG4gICAgaWYgKGN0eFJlcHMgIT0gbnVsbCkge1xuICAgICAgaW5zdGFuY2UucmVwcyA9IGN0eFJlcHM7XG4gICAgfSBlbHNlIGlmIChvbGRSZXBzID09IDApIHtcbiAgICAgIGluc3RhbmNlLnJlcHMgPSAxO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBsZXQgbmV3UmVwcyA9IGV2YWx1YXRlRXhwcmVzc2lvbihpbnN0YW5jZS5ub2RlLmZvcm11bGFSZXBzLmZvcm11bGEsIGNvbnRleHQpO1xuICAgIGlmIChuZXdSZXBzICE9PSBvbGRSZXBzKSB7XG4gICAgICBpbnN0YW5jZS5yZXBzID0gbmV3UmVwcztcbiAgICB9XG4gIH1cbiAgaW5zdGFuY2UuY2FuQWRkID0gaW5zdGFuY2Uubm9kZS5tYXhSZXBzID09PSAwIHx8IGluc3RhbmNlLnJlcHMgPCBpbnN0YW5jZS5ub2RlLm1heFJlcHM7XG4gIGluc3RhbmNlLmNhblJlbW92ZSA9IGluc3RhbmNlLm5vZGUubWluUmVwcyA9PT0gMCB8fCBpbnN0YW5jZS5yZXBzID4gaW5zdGFuY2Uubm9kZS5taW5SZXBzO1xuICByZXR1cm4gb2xkUmVwcztcbn1cbiJdfQ==