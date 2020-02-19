/**
 * @fileoverview added by tsickle
 * Generated from: src/core/forms/utils/slides-instances/update-reps-num.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLXJlcHMtbnVtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvZm9ybXMvdXRpbHMvc2xpZGVzLWluc3RhbmNlcy91cGRhdGUtcmVwcy1udW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzQkEsT0FBTyxFQUFhLGtCQUFrQixFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFHaEUsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0sZ0RBQWdELENBQUM7Ozs7OztBQUV4RixNQUFNLFVBQVUsYUFBYSxDQUFDLFFBQWtDLEVBQUUsT0FBb0I7O1VBQzlFLE9BQU8sR0FBVyxRQUFRLENBQUMsSUFBSSxJQUFJLENBQUM7SUFDMUMsT0FBTyxHQUFHLE9BQU8sSUFBSSxFQUFFLENBQUM7SUFDeEIsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLEVBQUU7O2NBQy9CLE9BQU8sR0FBRyxPQUFPLENBQUMsd0JBQXdCLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDM0QsSUFBSSxPQUFPLElBQUksSUFBSSxFQUFFO1lBQ25CLFFBQVEsQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDO1NBQ3pCO2FBQU0sSUFBSSxPQUFPLElBQUksQ0FBQyxFQUFFO1lBQ3ZCLFFBQVEsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO1NBQ25CO0tBQ0Y7U0FBTTs7WUFDRCxPQUFPLEdBQUcsa0JBQWtCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQztRQUM1RSxJQUFJLE9BQU8sS0FBSyxPQUFPLEVBQUU7WUFDdkIsUUFBUSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUM7U0FDekI7S0FDRjtJQUNELFFBQVEsQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLEtBQUssQ0FBQyxJQUFJLFFBQVEsQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDdkYsUUFBUSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sS0FBSyxDQUFDLElBQUksUUFBUSxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUMxRixPQUFPLE9BQU8sQ0FBQztBQUNqQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSAyMDE4IEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmQ29udGV4dCwgZXZhbHVhdGVFeHByZXNzaW9ufSBmcm9tICdAYWpmL2NvcmUvbW9kZWxzJztcblxuaW1wb3J0IHtBamZSZXBlYXRpbmdOb2RlSW5zdGFuY2V9IGZyb20gJy4uLy4uL2ludGVyZmFjZS9ub2Rlcy1pbnN0YW5jZXMvcmVwZWF0aW5nLW5vZGUtaW5zdGFuY2UnO1xuaW1wb3J0IHtub2RlSW5zdGFuY2VDb21wbGV0ZU5hbWV9IGZyb20gJy4uL25vZGVzLWluc3RhbmNlcy9ub2RlLWluc3RhbmNlLWNvbXBsZXRlLW5hbWUnO1xuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlUmVwc051bShpbnN0YW5jZTogQWpmUmVwZWF0aW5nTm9kZUluc3RhbmNlLCBjb250ZXh0PzogQWpmQ29udGV4dCk6IG51bWJlciB7XG4gIGNvbnN0IG9sZFJlcHM6IG51bWJlciA9IGluc3RhbmNlLnJlcHMgfHwgMDtcbiAgY29udGV4dCA9IGNvbnRleHQgfHwge307XG4gIGlmIChpbnN0YW5jZS5ub2RlLmZvcm11bGFSZXBzID09IG51bGwpIHtcbiAgICBjb25zdCBjdHhSZXBzID0gY29udGV4dFtub2RlSW5zdGFuY2VDb21wbGV0ZU5hbWUoaW5zdGFuY2UpXTtcbiAgICBpZiAoY3R4UmVwcyAhPSBudWxsKSB7XG4gICAgICBpbnN0YW5jZS5yZXBzID0gY3R4UmVwcztcbiAgICB9IGVsc2UgaWYgKG9sZFJlcHMgPT0gMCkge1xuICAgICAgaW5zdGFuY2UucmVwcyA9IDE7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGxldCBuZXdSZXBzID0gZXZhbHVhdGVFeHByZXNzaW9uKGluc3RhbmNlLm5vZGUuZm9ybXVsYVJlcHMuZm9ybXVsYSwgY29udGV4dCk7XG4gICAgaWYgKG5ld1JlcHMgIT09IG9sZFJlcHMpIHtcbiAgICAgIGluc3RhbmNlLnJlcHMgPSBuZXdSZXBzO1xuICAgIH1cbiAgfVxuICBpbnN0YW5jZS5jYW5BZGQgPSBpbnN0YW5jZS5ub2RlLm1heFJlcHMgPT09IDAgfHwgaW5zdGFuY2UucmVwcyA8IGluc3RhbmNlLm5vZGUubWF4UmVwcztcbiAgaW5zdGFuY2UuY2FuUmVtb3ZlID0gaW5zdGFuY2Uubm9kZS5taW5SZXBzID09PSAwIHx8IGluc3RhbmNlLnJlcHMgPiBpbnN0YW5jZS5ub2RlLm1pblJlcHM7XG4gIHJldHVybiBvbGRSZXBzO1xufVxuIl19