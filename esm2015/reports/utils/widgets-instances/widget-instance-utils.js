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
        const transFt = ft != null && typeof ft === 'string' && ft.trim().length > 0
            ? ts.instant(ft) : ft;
        if (ft.length > 0) {
            formula = `"${transFt}"`;
        }
    }
    else {
        formula = formula != null && typeof formula === 'string' && formula.trim().length > 0
            ? ts.instant(formula) : formula;
    }
    return evaluateExpression(formula, context);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0LWluc3RhbmNlLXV0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvcmVwb3J0cy91dGlscy93aWRnZXRzLWluc3RhbmNlcy93aWRnZXQtaW5zdGFuY2UtdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzQkEsT0FBTyxFQUF5QixrQkFBa0IsRUFBQyxNQUFNLGtCQUFrQixDQUFDOzs7Ozs7O0FBRzVFLE1BQU0sVUFBVSxTQUFTLENBQUMsQ0FBYSxFQUFFLE9BQW1CLEVBQUUsRUFBb0I7O1FBQzVFLE9BQU8sR0FBRyxDQUFDLENBQUMsT0FBTztJQUN2QixJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFBRTs7Y0FDMUIsRUFBRSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDOztjQUN6QixPQUFPLEdBQUcsRUFBRSxJQUFJLElBQUksSUFBSSxPQUFPLEVBQUUsS0FBSyxRQUFRLElBQUksRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDO1lBQzFFLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO1FBQ3ZCLElBQUksRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDakIsT0FBTyxHQUFHLElBQUksT0FBTyxHQUFHLENBQUM7U0FDMUI7S0FDRjtTQUFNO1FBQ0wsT0FBTyxHQUFHLE9BQU8sSUFBSSxJQUFJLElBQUksT0FBTyxPQUFPLEtBQUssUUFBUSxJQUFJLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxNQUFNLEdBQUcsQ0FBQztZQUNuRixDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO0tBQ25DO0lBQ0QsT0FBTyxrQkFBa0IsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDOUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZDb250ZXh0LCBBamZGb3JtdWxhLCBldmFsdWF0ZUV4cHJlc3Npb259IGZyb20gJ0BhamYvY29yZS9tb2RlbHMnO1xuaW1wb3J0IHtUcmFuc2xhdGVTZXJ2aWNlfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcblxuZXhwb3J0IGZ1bmN0aW9uIHRyRm9ybXVsYShmOiBBamZGb3JtdWxhLCBjb250ZXh0OiBBamZDb250ZXh0LCB0czogVHJhbnNsYXRlU2VydmljZSk6IGFueSB7XG4gIGxldCBmb3JtdWxhID0gZi5mb3JtdWxhO1xuICBpZiAoZm9ybXVsYS5zdWJzdHIoMCwgMSkgPT09ICdcIicpIHtcbiAgICBjb25zdCBmdCA9IGZvcm11bGEuc2xpY2UoMSwgLTEpO1xuICAgIGNvbnN0IHRyYW5zRnQgPSBmdCAhPSBudWxsICYmIHR5cGVvZiBmdCA9PT0gJ3N0cmluZycgJiYgZnQudHJpbSgpLmxlbmd0aCA+IDBcbiAgICAgID8gdHMuaW5zdGFudChmdCkgOiBmdDtcbiAgICBpZiAoZnQubGVuZ3RoID4gMCkge1xuICAgICAgZm9ybXVsYSA9IGBcIiR7dHJhbnNGdH1cImA7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGZvcm11bGEgPSBmb3JtdWxhICE9IG51bGwgJiYgdHlwZW9mIGZvcm11bGEgPT09ICdzdHJpbmcnICYmIGZvcm11bGEudHJpbSgpLmxlbmd0aCA+IDBcbiAgICAgID8gdHMuaW5zdGFudChmb3JtdWxhKSA6IGZvcm11bGE7XG4gIH1cbiAgcmV0dXJuIGV2YWx1YXRlRXhwcmVzc2lvbihmb3JtdWxhLCBjb250ZXh0KTtcbn1cbiJdfQ==