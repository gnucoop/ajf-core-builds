/**
 * @fileoverview added by tsickle
 * Generated from: src/core/reports/utils/aggregation/evaluate-aggregation.ts
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
import { AjfAggregationType } from '../../interface/aggregation/aggregation-type';
/**
 * @param {?} aggregation
 * @param {?} formulas
 * @param {?} context
 * @return {?}
 */
export function evaluateAggregation(aggregation, formulas, context) {
    /** @type {?} */
    const data = formulas.map((/**
     * @param {?} f
     * @return {?}
     */
    f => evaluateExpression(f.formula, context)));
    switch (aggregation.aggregation) {
        case AjfAggregationType.None:
            if (data.length !== 1) {
                throw new Error('Invalid aggregation');
            }
            return data[0];
        case AjfAggregationType.Sum:
            return data.map((/**
             * @param {?} r
             * @return {?}
             */
            (r) => r.reduce((/**
             * @param {?} s
             * @param {?} d
             * @return {?}
             */
            (s, d) => s + d), 0)));
        case AjfAggregationType.Average:
        case AjfAggregationType.WeightedAverage:
            return data.map((/**
             * @param {?} r
             * @return {?}
             */
            (r) => {
                /** @type {?} */
                const sum = r.reduce((/**
                 * @param {?} s
                 * @param {?} d
                 * @return {?}
                 */
                (s, d) => s + d), 0);
                return sum / data.length;
            }));
        default:
            return [];
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZhbHVhdGUtYWdncmVnYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9yZXBvcnRzL3V0aWxzL2FnZ3JlZ2F0aW9uL2V2YWx1YXRlLWFnZ3JlZ2F0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBLE9BQU8sRUFBeUIsa0JBQWtCLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUU1RSxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSw4Q0FBOEMsQ0FBQzs7Ozs7OztBQUVoRixNQUFNLFVBQVUsbUJBQW1CLENBQy9CLFdBQTJCLEVBQUUsUUFBc0IsRUFBRSxPQUFtQjs7VUFDcEUsSUFBSSxHQUFVLFFBQVEsQ0FBQyxHQUFHOzs7O0lBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxFQUFDO0lBQzdFLFFBQVEsV0FBVyxDQUFDLFdBQVcsRUFBRTtRQUMvQixLQUFLLGtCQUFrQixDQUFDLElBQUk7WUFDMUIsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtnQkFDckIsTUFBTSxJQUFJLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO2FBQ3hDO1lBQ0QsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakIsS0FBSyxrQkFBa0IsQ0FBQyxHQUFHO1lBQ3pCLE9BQU8sSUFBSSxDQUFDLEdBQUc7Ozs7WUFBQyxDQUFDLENBQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU07Ozs7O1lBQUMsQ0FBQyxDQUFNLEVBQUUsQ0FBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFFLENBQUMsQ0FBQyxFQUFDLENBQUM7UUFDdEUsS0FBSyxrQkFBa0IsQ0FBQyxPQUFPLENBQUM7UUFDaEMsS0FBSyxrQkFBa0IsQ0FBQyxlQUFlO1lBQ3JDLE9BQU8sSUFBSSxDQUFDLEdBQUc7Ozs7WUFBQyxDQUFDLENBQU0sRUFBRSxFQUFFOztzQkFDbkIsR0FBRyxHQUFHLENBQUMsQ0FBQyxNQUFNOzs7OztnQkFBQyxDQUFDLENBQU0sRUFBRSxDQUFNLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUUsQ0FBQyxDQUFDO2dCQUNsRCxPQUFPLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQzNCLENBQUMsRUFBQyxDQUFDO1FBQ0w7WUFDRSxPQUFPLEVBQUUsQ0FBQztLQUNiO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgMjAxOCBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkNvbnRleHQsIEFqZkZvcm11bGEsIGV2YWx1YXRlRXhwcmVzc2lvbn0gZnJvbSAnQGFqZi9jb3JlL21vZGVscyc7XG5pbXBvcnQge0FqZkFnZ3JlZ2F0aW9ufSBmcm9tICcuLi8uLi9pbnRlcmZhY2UvYWdncmVnYXRpb24vYWdncmVnYXRpb24nO1xuaW1wb3J0IHtBamZBZ2dyZWdhdGlvblR5cGV9IGZyb20gJy4uLy4uL2ludGVyZmFjZS9hZ2dyZWdhdGlvbi9hZ2dyZWdhdGlvbi10eXBlJztcblxuZXhwb3J0IGZ1bmN0aW9uIGV2YWx1YXRlQWdncmVnYXRpb24oXG4gICAgYWdncmVnYXRpb246IEFqZkFnZ3JlZ2F0aW9uLCBmb3JtdWxhczogQWpmRm9ybXVsYVtdLCBjb250ZXh0OiBBamZDb250ZXh0KTogbnVtYmVyW10ge1xuICBjb25zdCBkYXRhOiBhbnlbXSA9IGZvcm11bGFzLm1hcChmID0+IGV2YWx1YXRlRXhwcmVzc2lvbihmLmZvcm11bGEsIGNvbnRleHQpKTtcbiAgc3dpdGNoIChhZ2dyZWdhdGlvbi5hZ2dyZWdhdGlvbikge1xuICAgIGNhc2UgQWpmQWdncmVnYXRpb25UeXBlLk5vbmU6XG4gICAgICBpZiAoZGF0YS5sZW5ndGggIT09IDEpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGFnZ3JlZ2F0aW9uJyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZGF0YVswXTtcbiAgICBjYXNlIEFqZkFnZ3JlZ2F0aW9uVHlwZS5TdW06XG4gICAgICByZXR1cm4gZGF0YS5tYXAoKHI6IGFueSkgPT4gci5yZWR1Y2UoKHM6IGFueSwgZDogYW55KSA9PiBzICsgZCwgMCkpO1xuICAgIGNhc2UgQWpmQWdncmVnYXRpb25UeXBlLkF2ZXJhZ2U6XG4gICAgY2FzZSBBamZBZ2dyZWdhdGlvblR5cGUuV2VpZ2h0ZWRBdmVyYWdlOlxuICAgICAgcmV0dXJuIGRhdGEubWFwKChyOiBhbnkpID0+IHtcbiAgICAgICAgY29uc3Qgc3VtID0gci5yZWR1Y2UoKHM6IGFueSwgZDogYW55KSA9PiBzICsgZCwgMCk7XG4gICAgICAgIHJldHVybiBzdW0gLyBkYXRhLmxlbmd0aDtcbiAgICAgIH0pO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gW107XG4gIH1cbn1cbiJdfQ==