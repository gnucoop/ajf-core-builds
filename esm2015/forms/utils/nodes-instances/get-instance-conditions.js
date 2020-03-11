/**
 * @fileoverview added by tsickle
 * Generated from: src/core/forms/utils/nodes-instances/get-instance-conditions.ts
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
import { getInstanceCondition } from './get-instance-condition';
/**
 * @param {?} conditions
 * @param {?} ancestorsNames
 * @param {?} prefix
 * @return {?}
 */
export function getInstanceConditions(conditions, ancestorsNames, prefix) {
    /** @type {?} */
    let changed = false;
    /** @type {?} */
    const newConditions = conditions.map((/**
     * @param {?} condition
     * @return {?}
     */
    (condition) => {
        /** @type {?} */
        const newCondition = getInstanceCondition(condition, ancestorsNames, prefix);
        if (newCondition !== condition) {
            changed = true;
        }
        return newCondition;
    }));
    return changed ? newConditions : conditions;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LWluc3RhbmNlLWNvbmRpdGlvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9mb3Jtcy91dGlscy9ub2Rlcy1pbnN0YW5jZXMvZ2V0LWluc3RhbmNlLWNvbmRpdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF3QkEsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sMEJBQTBCLENBQUM7Ozs7Ozs7QUFFOUQsTUFBTSxVQUFVLHFCQUFxQixDQUNqQyxVQUEwQixFQUFFLGNBQXdDLEVBQ3BFLE1BQWdCOztRQUNkLE9BQU8sR0FBRyxLQUFLOztVQUNiLGFBQWEsR0FBRyxVQUFVLENBQUMsR0FBRzs7OztJQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7O2NBQzNDLFlBQVksR0FBRyxvQkFBb0IsQ0FBQyxTQUFTLEVBQUUsY0FBYyxFQUFFLE1BQU0sQ0FBQztRQUM1RSxJQUFJLFlBQVksS0FBSyxTQUFTLEVBQUU7WUFDOUIsT0FBTyxHQUFHLElBQUksQ0FBQztTQUNoQjtRQUNELE9BQU8sWUFBWSxDQUFDO0lBQ3RCLENBQUMsRUFBQztJQUNGLE9BQU8sT0FBTyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQztBQUM5QyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkNvbmRpdGlvbn0gZnJvbSAnQGFqZi9jb3JlL21vZGVscyc7XG5cbmltcG9ydCB7Z2V0SW5zdGFuY2VDb25kaXRpb259IGZyb20gJy4vZ2V0LWluc3RhbmNlLWNvbmRpdGlvbic7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRJbnN0YW5jZUNvbmRpdGlvbnMoXG4gICAgY29uZGl0aW9uczogQWpmQ29uZGl0aW9uW10sIGFuY2VzdG9yc05hbWVzOiB7W3Byb3A6IHN0cmluZ106IG51bWJlcn0sXG4gICAgcHJlZml4OiBudW1iZXJbXSk6IEFqZkNvbmRpdGlvbltdIHtcbiAgbGV0IGNoYW5nZWQgPSBmYWxzZTtcbiAgY29uc3QgbmV3Q29uZGl0aW9ucyA9IGNvbmRpdGlvbnMubWFwKChjb25kaXRpb24pID0+IHtcbiAgICBjb25zdCBuZXdDb25kaXRpb24gPSBnZXRJbnN0YW5jZUNvbmRpdGlvbihjb25kaXRpb24sIGFuY2VzdG9yc05hbWVzLCBwcmVmaXgpO1xuICAgIGlmIChuZXdDb25kaXRpb24gIT09IGNvbmRpdGlvbikge1xuICAgICAgY2hhbmdlZCA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiBuZXdDb25kaXRpb247XG4gIH0pO1xuICByZXR1cm4gY2hhbmdlZCA/IG5ld0NvbmRpdGlvbnMgOiBjb25kaXRpb25zO1xufVxuIl19