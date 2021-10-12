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
export function trFormula(f, context, ts) {
    let formula = f.formula;
    if (formula.substr(0, 1) === '"' || formula.substr(0, 1) === '\'') {
        const ft = formula.slice(1, -1);
        const transFt = ft != null && typeof ft === 'string' && ft.trim().length > 0 ? ts.translate(ft) : ft;
        if (ft.length > 0) {
            formula = `"${transFt}"`;
        }
    }
    else {
        formula = formula != null && typeof formula === 'string' && formula.trim().length > 0 ?
            ts.translate(formula) :
            formula;
    }
    return evaluateExpression(formula, context);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0LWluc3RhbmNlLXV0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvcmVwb3J0cy91dGlscy93aWRnZXRzLWluc3RhbmNlcy93aWRnZXQtaW5zdGFuY2UtdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUF5QixrQkFBa0IsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBRzVFLE1BQU0sVUFBVSxTQUFTLENBQUMsQ0FBYSxFQUFFLE9BQW1CLEVBQUUsRUFBb0I7SUFDaEYsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQztJQUN4QixJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLEVBQUU7UUFDakUsTUFBTSxFQUFFLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNoQyxNQUFNLE9BQU8sR0FDVCxFQUFFLElBQUksSUFBSSxJQUFJLE9BQU8sRUFBRSxLQUFLLFFBQVEsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQ3pGLElBQUksRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDakIsT0FBTyxHQUFHLElBQUksT0FBTyxHQUFHLENBQUM7U0FDMUI7S0FDRjtTQUFNO1FBQ0wsT0FBTyxHQUFHLE9BQU8sSUFBSSxJQUFJLElBQUksT0FBTyxPQUFPLEtBQUssUUFBUSxJQUFJLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDbkYsRUFBRSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLE9BQU8sQ0FBQztLQUNiO0lBQ0QsT0FBTyxrQkFBa0IsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDOUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZDb250ZXh0LCBBamZGb3JtdWxhLCBldmFsdWF0ZUV4cHJlc3Npb259IGZyb20gJ0BhamYvY29yZS9tb2RlbHMnO1xuaW1wb3J0IHtUcmFuc2xvY29TZXJ2aWNlfSBmcm9tICdAYWpmL2NvcmUvdHJhbnNsb2NvJztcblxuZXhwb3J0IGZ1bmN0aW9uIHRyRm9ybXVsYShmOiBBamZGb3JtdWxhLCBjb250ZXh0OiBBamZDb250ZXh0LCB0czogVHJhbnNsb2NvU2VydmljZSk6IGFueSB7XG4gIGxldCBmb3JtdWxhID0gZi5mb3JtdWxhO1xuICBpZiAoZm9ybXVsYS5zdWJzdHIoMCwgMSkgPT09ICdcIicgfHwgZm9ybXVsYS5zdWJzdHIoMCwgMSkgPT09ICdcXCcnKSB7XG4gICAgY29uc3QgZnQgPSBmb3JtdWxhLnNsaWNlKDEsIC0xKTtcbiAgICBjb25zdCB0cmFuc0Z0ID1cbiAgICAgICAgZnQgIT0gbnVsbCAmJiB0eXBlb2YgZnQgPT09ICdzdHJpbmcnICYmIGZ0LnRyaW0oKS5sZW5ndGggPiAwID8gdHMudHJhbnNsYXRlKGZ0KSA6IGZ0O1xuICAgIGlmIChmdC5sZW5ndGggPiAwKSB7XG4gICAgICBmb3JtdWxhID0gYFwiJHt0cmFuc0Z0fVwiYDtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgZm9ybXVsYSA9IGZvcm11bGEgIT0gbnVsbCAmJiB0eXBlb2YgZm9ybXVsYSA9PT0gJ3N0cmluZycgJiYgZm9ybXVsYS50cmltKCkubGVuZ3RoID4gMCA/XG4gICAgICAgIHRzLnRyYW5zbGF0ZShmb3JtdWxhKSA6XG4gICAgICAgIGZvcm11bGE7XG4gIH1cbiAgcmV0dXJuIGV2YWx1YXRlRXhwcmVzc2lvbihmb3JtdWxhLCBjb250ZXh0KTtcbn1cbiJdfQ==