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
    if (formula.substr(0, 1) === '"' || formula.substr(0, 1) === "'") {
        const ft = formula.slice(1, -1);
        const transFt = ft != null && typeof ft === 'string' && ft.trim().length > 0 ? ts.translate(ft) : ft;
        if (ft.length > 0) {
            formula = `"${transFt}"`;
        }
    }
    else {
        formula =
            formula != null && typeof formula === 'string' && formula.trim().length > 0
                ? ts.translate(formula)
                : formula;
    }
    return evaluateExpression(formula, context);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0LWluc3RhbmNlLXV0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvcmVwb3J0cy91dGlscy93aWRnZXRzLWluc3RhbmNlcy93aWRnZXQtaW5zdGFuY2UtdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUF5QixrQkFBa0IsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBRzVFLE1BQU0sVUFBVSxTQUFTLENBQUMsQ0FBYSxFQUFFLE9BQW1CLEVBQUUsRUFBb0I7SUFDaEYsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQztJQUN4QixJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUU7UUFDaEUsTUFBTSxFQUFFLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNoQyxNQUFNLE9BQU8sR0FDWCxFQUFFLElBQUksSUFBSSxJQUFJLE9BQU8sRUFBRSxLQUFLLFFBQVEsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQ3ZGLElBQUksRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDakIsT0FBTyxHQUFHLElBQUksT0FBTyxHQUFHLENBQUM7U0FDMUI7S0FDRjtTQUFNO1FBQ0wsT0FBTztZQUNMLE9BQU8sSUFBSSxJQUFJLElBQUksT0FBTyxPQUFPLEtBQUssUUFBUSxJQUFJLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxNQUFNLEdBQUcsQ0FBQztnQkFDekUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDO2dCQUN2QixDQUFDLENBQUMsT0FBTyxDQUFDO0tBQ2Y7SUFDRCxPQUFPLGtCQUFrQixDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztBQUM5QyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkNvbnRleHQsIEFqZkZvcm11bGEsIGV2YWx1YXRlRXhwcmVzc2lvbn0gZnJvbSAnQGFqZi9jb3JlL21vZGVscyc7XG5pbXBvcnQge1RyYW5zbG9jb1NlcnZpY2V9IGZyb20gJ0BhamYvY29yZS90cmFuc2xvY28nO1xuXG5leHBvcnQgZnVuY3Rpb24gdHJGb3JtdWxhKGY6IEFqZkZvcm11bGEsIGNvbnRleHQ6IEFqZkNvbnRleHQsIHRzOiBUcmFuc2xvY29TZXJ2aWNlKTogYW55IHtcbiAgbGV0IGZvcm11bGEgPSBmLmZvcm11bGE7XG4gIGlmIChmb3JtdWxhLnN1YnN0cigwLCAxKSA9PT0gJ1wiJyB8fCBmb3JtdWxhLnN1YnN0cigwLCAxKSA9PT0gXCInXCIpIHtcbiAgICBjb25zdCBmdCA9IGZvcm11bGEuc2xpY2UoMSwgLTEpO1xuICAgIGNvbnN0IHRyYW5zRnQgPVxuICAgICAgZnQgIT0gbnVsbCAmJiB0eXBlb2YgZnQgPT09ICdzdHJpbmcnICYmIGZ0LnRyaW0oKS5sZW5ndGggPiAwID8gdHMudHJhbnNsYXRlKGZ0KSA6IGZ0O1xuICAgIGlmIChmdC5sZW5ndGggPiAwKSB7XG4gICAgICBmb3JtdWxhID0gYFwiJHt0cmFuc0Z0fVwiYDtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgZm9ybXVsYSA9XG4gICAgICBmb3JtdWxhICE9IG51bGwgJiYgdHlwZW9mIGZvcm11bGEgPT09ICdzdHJpbmcnICYmIGZvcm11bGEudHJpbSgpLmxlbmd0aCA+IDBcbiAgICAgICAgPyB0cy50cmFuc2xhdGUoZm9ybXVsYSlcbiAgICAgICAgOiBmb3JtdWxhO1xuICB9XG4gIHJldHVybiBldmFsdWF0ZUV4cHJlc3Npb24oZm9ybXVsYSwgY29udGV4dCk7XG59XG4iXX0=