/**
 * @fileoverview added by tsickle
 * Generated from: src/core/reports/utils/widgets-instances/widget-instance-utils.ts
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
 * @param {?} f
 * @param {?} context
 * @param {?} ts
 * @return {?}
 */
export function trFormula(f, context, ts) {
    /** @type {?} */
    let formula = f.formula;
    if (formula.substr(0, 1) === '"') {
        /** @type {?} */
        const ft = formula.slice(1, -1);
        /** @type {?} */
        const transFt = ft != null && typeof ft === 'string' && ft.trim().length > 0 ? ts.instant(ft) : ft;
        if (ft.length > 0) {
            formula = `"${transFt}"`;
        }
    }
    else {
        formula = formula != null && typeof formula === 'string' && formula.trim().length > 0 ?
            ts.instant(formula) :
            formula;
    }
    return evaluateExpression(formula, context);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0LWluc3RhbmNlLXV0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvcmVwb3J0cy91dGlscy93aWRnZXRzLWluc3RhbmNlcy93aWRnZXQtaW5zdGFuY2UtdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzQkEsT0FBTyxFQUF5QixrQkFBa0IsRUFBQyxNQUFNLGtCQUFrQixDQUFDOzs7Ozs7O0FBRzVFLE1BQU0sVUFBVSxTQUFTLENBQUMsQ0FBYSxFQUFFLE9BQW1CLEVBQUUsRUFBb0I7O1FBQzVFLE9BQU8sR0FBRyxDQUFDLENBQUMsT0FBTztJQUN2QixJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFBRTs7Y0FDMUIsRUFBRSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDOztjQUN6QixPQUFPLEdBQ1QsRUFBRSxJQUFJLElBQUksSUFBSSxPQUFPLEVBQUUsS0FBSyxRQUFRLElBQUksRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7UUFDdEYsSUFBSSxFQUFFLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUNqQixPQUFPLEdBQUcsSUFBSSxPQUFPLEdBQUcsQ0FBQztTQUMxQjtLQUNGO1NBQU07UUFDTCxPQUFPLEdBQUcsT0FBTyxJQUFJLElBQUksSUFBSSxPQUFPLE9BQU8sS0FBSyxRQUFRLElBQUksT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNuRixFQUFFLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDckIsT0FBTyxDQUFDO0tBQ2I7SUFDRCxPQUFPLGtCQUFrQixDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztBQUM5QyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkNvbnRleHQsIEFqZkZvcm11bGEsIGV2YWx1YXRlRXhwcmVzc2lvbn0gZnJvbSAnQGFqZi9jb3JlL21vZGVscyc7XG5pbXBvcnQge1RyYW5zbGF0ZVNlcnZpY2V9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuXG5leHBvcnQgZnVuY3Rpb24gdHJGb3JtdWxhKGY6IEFqZkZvcm11bGEsIGNvbnRleHQ6IEFqZkNvbnRleHQsIHRzOiBUcmFuc2xhdGVTZXJ2aWNlKTogYW55IHtcbiAgbGV0IGZvcm11bGEgPSBmLmZvcm11bGE7XG4gIGlmIChmb3JtdWxhLnN1YnN0cigwLCAxKSA9PT0gJ1wiJykge1xuICAgIGNvbnN0IGZ0ID0gZm9ybXVsYS5zbGljZSgxLCAtMSk7XG4gICAgY29uc3QgdHJhbnNGdCA9XG4gICAgICAgIGZ0ICE9IG51bGwgJiYgdHlwZW9mIGZ0ID09PSAnc3RyaW5nJyAmJiBmdC50cmltKCkubGVuZ3RoID4gMCA/IHRzLmluc3RhbnQoZnQpIDogZnQ7XG4gICAgaWYgKGZ0Lmxlbmd0aCA+IDApIHtcbiAgICAgIGZvcm11bGEgPSBgXCIke3RyYW5zRnR9XCJgO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBmb3JtdWxhID0gZm9ybXVsYSAhPSBudWxsICYmIHR5cGVvZiBmb3JtdWxhID09PSAnc3RyaW5nJyAmJiBmb3JtdWxhLnRyaW0oKS5sZW5ndGggPiAwID9cbiAgICAgICAgdHMuaW5zdGFudChmb3JtdWxhKSA6XG4gICAgICAgIGZvcm11bGE7XG4gIH1cbiAgcmV0dXJuIGV2YWx1YXRlRXhwcmVzc2lvbihmb3JtdWxhLCBjb250ZXh0KTtcbn1cbiJdfQ==