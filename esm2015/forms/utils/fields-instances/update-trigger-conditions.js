/**
 * @fileoverview added by tsickle
 * Generated from: src/core/forms/utils/fields-instances/update-trigger-conditions.ts
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
 * @param {?} context
 * @return {?}
 */
export function updateTriggerConditions(instance, context) {
    if (instance.triggerConditions == null) {
        return false;
    }
    /** @type {?} */
    const completeName = nodeInstanceCompleteName(instance);
    if (instance.firstTriggerConditionDone[completeName]) {
        return false;
    }
    /** @type {?} */
    let found = false;
    /** @type {?} */
    const conditionsNum = instance.triggerConditions.length;
    for (let i = 0; i < conditionsNum; i++) {
        if (evaluateExpression(instance.triggerConditions[i].condition, context)) {
            found = true;
            break;
        }
    }
    instance.firstTriggerConditionDone[completeName] = found;
    return found;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLXRyaWdnZXItY29uZGl0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2Zvcm1zL3V0aWxzL2ZpZWxkcy1pbnN0YW5jZXMvdXBkYXRlLXRyaWdnZXItY29uZGl0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCQSxPQUFPLEVBQWEsa0JBQWtCLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUtoRSxPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSxnREFBZ0QsQ0FBQzs7Ozs7O0FBRXhGLE1BQU0sVUFBVSx1QkFBdUIsQ0FDbkMsUUFBMEMsRUFBRSxPQUFtQjtJQUNqRSxJQUFJLFFBQVEsQ0FBQyxpQkFBaUIsSUFBSSxJQUFJLEVBQUU7UUFDdEMsT0FBTyxLQUFLLENBQUM7S0FDZDs7VUFDSyxZQUFZLEdBQUcsd0JBQXdCLENBQUMsUUFBUSxDQUFDO0lBQ3ZELElBQUksUUFBUSxDQUFDLHlCQUF5QixDQUFDLFlBQVksQ0FBQyxFQUFFO1FBQ3BELE9BQU8sS0FBSyxDQUFDO0tBQ2Q7O1FBQ0csS0FBSyxHQUFHLEtBQUs7O1VBQ1gsYUFBYSxHQUFHLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNO0lBQ3ZELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxhQUFhLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDdEMsSUFBSSxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxFQUFFO1lBQ3hFLEtBQUssR0FBRyxJQUFJLENBQUM7WUFDYixNQUFNO1NBQ1A7S0FDRjtJQUNELFFBQVEsQ0FBQyx5QkFBeUIsQ0FBQyxZQUFZLENBQUMsR0FBRyxLQUFLLENBQUM7SUFDekQsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkNvbnRleHQsIGV2YWx1YXRlRXhwcmVzc2lvbn0gZnJvbSAnQGFqZi9jb3JlL21vZGVscyc7XG5cbmltcG9ydCB7XG4gIEFqZkZpZWxkV2l0aENob2ljZXNJbnN0YW5jZVxufSBmcm9tICcuLi8uLi9pbnRlcmZhY2UvZmllbGRzLWluc3RhbmNlcy9maWVsZC13aXRoLWNob2ljZXMtaW5zdGFuY2UnO1xuaW1wb3J0IHtub2RlSW5zdGFuY2VDb21wbGV0ZU5hbWV9IGZyb20gJy4uL25vZGVzLWluc3RhbmNlcy9ub2RlLWluc3RhbmNlLWNvbXBsZXRlLW5hbWUnO1xuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlVHJpZ2dlckNvbmRpdGlvbnMoXG4gICAgaW5zdGFuY2U6IEFqZkZpZWxkV2l0aENob2ljZXNJbnN0YW5jZTxhbnk+LCBjb250ZXh0OiBBamZDb250ZXh0KTogYm9vbGVhbiB7XG4gIGlmIChpbnN0YW5jZS50cmlnZ2VyQ29uZGl0aW9ucyA9PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGNvbnN0IGNvbXBsZXRlTmFtZSA9IG5vZGVJbnN0YW5jZUNvbXBsZXRlTmFtZShpbnN0YW5jZSk7XG4gIGlmIChpbnN0YW5jZS5maXJzdFRyaWdnZXJDb25kaXRpb25Eb25lW2NvbXBsZXRlTmFtZV0pIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgbGV0IGZvdW5kID0gZmFsc2U7XG4gIGNvbnN0IGNvbmRpdGlvbnNOdW0gPSBpbnN0YW5jZS50cmlnZ2VyQ29uZGl0aW9ucy5sZW5ndGg7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgY29uZGl0aW9uc051bTsgaSsrKSB7XG4gICAgaWYgKGV2YWx1YXRlRXhwcmVzc2lvbihpbnN0YW5jZS50cmlnZ2VyQ29uZGl0aW9uc1tpXS5jb25kaXRpb24sIGNvbnRleHQpKSB7XG4gICAgICBmb3VuZCA9IHRydWU7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgaW5zdGFuY2UuZmlyc3RUcmlnZ2VyQ29uZGl0aW9uRG9uZVtjb21wbGV0ZU5hbWVdID0gZm91bmQ7XG4gIHJldHVybiBmb3VuZDtcbn1cbiJdfQ==