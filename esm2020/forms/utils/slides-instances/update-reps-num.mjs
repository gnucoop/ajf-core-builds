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
 * It upodates AjfRepeatingNodeInstance reps and it returns oldReps.
 */
export function updateRepsNum(instance, context) {
    const oldReps = instance.reps || 0;
    context = context || {};
    if (instance.node.formulaReps == null) {
        const ctxReps = context[nodeInstanceCompleteName(instance)];
        if (ctxReps != null) {
            instance.reps = ctxReps;
        }
        else if (oldReps == 0) {
            instance.reps = 1;
        }
    }
    else {
        let newReps = evaluateExpression(instance.node.formulaReps.formula, context);
        if (newReps !== oldReps) {
            instance.reps = newReps;
        }
    }
    instance.canAdd = instance.node.maxReps === 0 || instance.reps < instance.node.maxReps;
    instance.canRemove = instance.node.minReps === 0 || instance.reps > instance.node.minReps;
    return oldReps;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLXJlcHMtbnVtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9mb3Jtcy9zcmMvdXRpbHMvc2xpZGVzLWluc3RhbmNlcy91cGRhdGUtcmVwcy1udW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUFhLGtCQUFrQixFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFHaEUsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0sZ0RBQWdELENBQUM7QUFFeEY7O0dBRUc7QUFDSCxNQUFNLFVBQVUsYUFBYSxDQUFDLFFBQWtDLEVBQUUsT0FBb0I7SUFDcEYsTUFBTSxPQUFPLEdBQVcsUUFBUSxDQUFDLElBQUksSUFBSSxDQUFDLENBQUM7SUFDM0MsT0FBTyxHQUFHLE9BQU8sSUFBSSxFQUFFLENBQUM7SUFDeEIsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLEVBQUU7UUFDckMsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLHdCQUF3QixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDNUQsSUFBSSxPQUFPLElBQUksSUFBSSxFQUFFO1lBQ25CLFFBQVEsQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDO1NBQ3pCO2FBQU0sSUFBSSxPQUFPLElBQUksQ0FBQyxFQUFFO1lBQ3ZCLFFBQVEsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO1NBQ25CO0tBQ0Y7U0FBTTtRQUNMLElBQUksT0FBTyxHQUFHLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztRQUM3RSxJQUFJLE9BQU8sS0FBSyxPQUFPLEVBQUU7WUFDdkIsUUFBUSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUM7U0FDekI7S0FDRjtJQUNELFFBQVEsQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLEtBQUssQ0FBQyxJQUFJLFFBQVEsQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDdkYsUUFBUSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sS0FBSyxDQUFDLElBQUksUUFBUSxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUMxRixPQUFPLE9BQU8sQ0FBQztBQUNqQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkNvbnRleHQsIGV2YWx1YXRlRXhwcmVzc2lvbn0gZnJvbSAnQGFqZi9jb3JlL21vZGVscyc7XG5cbmltcG9ydCB7QWpmUmVwZWF0aW5nTm9kZUluc3RhbmNlfSBmcm9tICcuLi8uLi9pbnRlcmZhY2Uvbm9kZXMtaW5zdGFuY2VzL3JlcGVhdGluZy1ub2RlLWluc3RhbmNlJztcbmltcG9ydCB7bm9kZUluc3RhbmNlQ29tcGxldGVOYW1lfSBmcm9tICcuLi9ub2Rlcy1pbnN0YW5jZXMvbm9kZS1pbnN0YW5jZS1jb21wbGV0ZS1uYW1lJztcblxuLyoqXG4gKiBJdCB1cG9kYXRlcyBBamZSZXBlYXRpbmdOb2RlSW5zdGFuY2UgcmVwcyBhbmQgaXQgcmV0dXJucyBvbGRSZXBzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlUmVwc051bShpbnN0YW5jZTogQWpmUmVwZWF0aW5nTm9kZUluc3RhbmNlLCBjb250ZXh0PzogQWpmQ29udGV4dCk6IG51bWJlciB7XG4gIGNvbnN0IG9sZFJlcHM6IG51bWJlciA9IGluc3RhbmNlLnJlcHMgfHwgMDtcbiAgY29udGV4dCA9IGNvbnRleHQgfHwge307XG4gIGlmIChpbnN0YW5jZS5ub2RlLmZvcm11bGFSZXBzID09IG51bGwpIHtcbiAgICBjb25zdCBjdHhSZXBzID0gY29udGV4dFtub2RlSW5zdGFuY2VDb21wbGV0ZU5hbWUoaW5zdGFuY2UpXTtcbiAgICBpZiAoY3R4UmVwcyAhPSBudWxsKSB7XG4gICAgICBpbnN0YW5jZS5yZXBzID0gY3R4UmVwcztcbiAgICB9IGVsc2UgaWYgKG9sZFJlcHMgPT0gMCkge1xuICAgICAgaW5zdGFuY2UucmVwcyA9IDE7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGxldCBuZXdSZXBzID0gZXZhbHVhdGVFeHByZXNzaW9uKGluc3RhbmNlLm5vZGUuZm9ybXVsYVJlcHMuZm9ybXVsYSwgY29udGV4dCk7XG4gICAgaWYgKG5ld1JlcHMgIT09IG9sZFJlcHMpIHtcbiAgICAgIGluc3RhbmNlLnJlcHMgPSBuZXdSZXBzO1xuICAgIH1cbiAgfVxuICBpbnN0YW5jZS5jYW5BZGQgPSBpbnN0YW5jZS5ub2RlLm1heFJlcHMgPT09IDAgfHwgaW5zdGFuY2UucmVwcyA8IGluc3RhbmNlLm5vZGUubWF4UmVwcztcbiAgaW5zdGFuY2UuY2FuUmVtb3ZlID0gaW5zdGFuY2Uubm9kZS5taW5SZXBzID09PSAwIHx8IGluc3RhbmNlLnJlcHMgPiBpbnN0YW5jZS5ub2RlLm1pblJlcHM7XG4gIHJldHVybiBvbGRSZXBzO1xufVxuIl19