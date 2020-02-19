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
import { __read, __spread } from "tslib";
import * as esprima from 'esprima';
var esprimaMod = esprima.default || esprima;
var tokenize = esprimaMod.tokenize;
import { dbg } from './debug';
import { AjfExpressionUtils } from './expression-utils';
var execContext = {};
export function evaluateExpression(expression, context, forceFormula) {
    var formula = forceFormula || expression || '';
    if (formula === '') {
        return '';
    }
    if (formula === 'true') {
        return true;
    }
    if (formula === 'false') {
        return false;
    }
    if (context != null && context[formula] !== undefined) {
        return context[formula];
    }
    if (/^"[^"]*"$/.test(formula)) {
        return formula.replace(/^"+|"+$/g, '');
    }
    var identifiers = tokenize(formula).filter(function (t) { return t.type === 'Identifier'; }).map(function (t) { return t.value; });
    var ctx = [];
    identifiers.forEach(function (key) {
        var val = null;
        if (context != null && context[key] !== undefined) {
            val = context[key];
        }
        else if (AjfExpressionUtils.utils[key] !== undefined) {
            var util = AjfExpressionUtils.utils[key];
            val = util.fn;
        }
        ctx.push(val);
    });
    identifiers.push('execContext');
    ctx.push(execContext);
    try {
        if (dbg.enabled) {
            dbg("evaluating formula %s using context %j", formula, ctx);
        }
        var f = new (Function.bind.apply(Function, __spread([void 0], identifiers, ["return " + formula])))();
        var res = f.apply(void 0, __spread(ctx));
        if (dbg.enabled) {
            dbg("formula %s evaluated: result %s", formula, res);
        }
        f = null;
        return res;
    }
    catch (e) {
        console.log(e);
        if (dbg.enabled) {
            dbg("formula %s not evaluated: error %j", formula, e.message);
        }
        return false;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZhbHVhdGUtZXhwcmVzc2lvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL21vZGVscy91dGlscy9ldmFsdWF0ZS1leHByZXNzaW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRzs7QUFFSCxPQUFPLEtBQUssT0FBTyxNQUFNLFNBQVMsQ0FBQztBQUNuQyxJQUFNLFVBQVUsR0FBUyxPQUFlLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQztBQUNyRCxJQUFBLDhCQUFRLENBQWU7QUFHOUIsT0FBTyxFQUFDLEdBQUcsRUFBQyxNQUFNLFNBQVMsQ0FBQztBQUM1QixPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUV0RCxJQUFJLFdBQVcsR0FBUSxFQUFFLENBQUM7QUFFMUIsTUFBTSxVQUFVLGtCQUFrQixDQUM5QixVQUFrQixFQUFFLE9BQW9CLEVBQUUsWUFBcUI7SUFDakUsSUFBSSxPQUFPLEdBQUcsWUFBWSxJQUFJLFVBQVUsSUFBSSxFQUFFLENBQUM7SUFDL0MsSUFBSSxPQUFPLEtBQUssRUFBRSxFQUFFO1FBQ2xCLE9BQU8sRUFBRSxDQUFDO0tBQ1g7SUFDRCxJQUFJLE9BQU8sS0FBSyxNQUFNLEVBQUU7UUFDdEIsT0FBTyxJQUFJLENBQUM7S0FDYjtJQUNELElBQUksT0FBTyxLQUFLLE9BQU8sRUFBRTtRQUN2QixPQUFPLEtBQUssQ0FBQztLQUNkO0lBQ0QsSUFBSSxPQUFPLElBQUksSUFBSSxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxTQUFTLEVBQUU7UUFDckQsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDekI7SUFDRCxJQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFDN0IsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQztLQUN4QztJQUNELElBQU0sV0FBVyxHQUNiLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBQyxDQUFNLElBQUssT0FBQSxDQUFDLENBQUMsSUFBSSxLQUFLLFlBQVksRUFBdkIsQ0FBdUIsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFDLENBQU0sSUFBSyxPQUFBLENBQUMsQ0FBQyxLQUFLLEVBQVAsQ0FBTyxDQUFDLENBQUM7SUFDM0YsSUFBTSxHQUFHLEdBQVUsRUFBRSxDQUFDO0lBQ3RCLFdBQVcsQ0FBQyxPQUFPLENBQUMsVUFBQyxHQUFXO1FBQzlCLElBQUksR0FBRyxHQUFRLElBQUksQ0FBQztRQUNwQixJQUFJLE9BQU8sSUFBSSxJQUFJLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLFNBQVMsRUFBRTtZQUNqRCxHQUFHLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3BCO2FBQU0sSUFBSSxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssU0FBUyxFQUFFO1lBQ3RELElBQU0sSUFBSSxHQUFHLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMzQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQztTQUNmO1FBQ0QsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNoQixDQUFDLENBQUMsQ0FBQztJQUNILFdBQVcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDaEMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUV0QixJQUFJO1FBQ0YsSUFBSSxHQUFHLENBQUMsT0FBTyxFQUFFO1lBQ2YsR0FBRyxDQUFDLHdDQUF3QyxFQUFFLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQztTQUM3RDtRQUNELElBQUksQ0FBQyxRQUFPLFFBQVEsWUFBUixRQUFRLHFCQUFJLFdBQVcsR0FBRSxZQUFVLE9BQVMsTUFBQyxDQUFDO1FBQzFELElBQU0sR0FBRyxHQUFHLENBQUMsd0JBQUksR0FBRyxFQUFDLENBQUM7UUFDdEIsSUFBSSxHQUFHLENBQUMsT0FBTyxFQUFFO1lBQ2YsR0FBRyxDQUFDLGlDQUFpQyxFQUFFLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQztTQUN0RDtRQUNELENBQUMsR0FBUSxJQUFJLENBQUM7UUFDZCxPQUFPLEdBQUcsQ0FBQztLQUNaO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDVixPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2YsSUFBSSxHQUFHLENBQUMsT0FBTyxFQUFFO1lBQ2YsR0FBRyxDQUFDLG9DQUFvQyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDL0Q7UUFDRCxPQUFPLEtBQUssQ0FBQztLQUNkO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgMjAxOCBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQgKiBhcyBlc3ByaW1hIGZyb20gJ2VzcHJpbWEnO1xuY29uc3QgZXNwcmltYU1vZDogYW55ID0gKGVzcHJpbWEgYXMgYW55KS5kZWZhdWx0IHx8IGVzcHJpbWE7XG5jb25zdCB7dG9rZW5pemV9ID0gZXNwcmltYU1vZDtcblxuaW1wb3J0IHtBamZDb250ZXh0fSBmcm9tICcuLi9pbnRlcmZhY2UvY29udGV4dCc7XG5pbXBvcnQge2RiZ30gZnJvbSAnLi9kZWJ1Zyc7XG5pbXBvcnQge0FqZkV4cHJlc3Npb25VdGlsc30gZnJvbSAnLi9leHByZXNzaW9uLXV0aWxzJztcblxubGV0IGV4ZWNDb250ZXh0OiBhbnkgPSB7fTtcblxuZXhwb3J0IGZ1bmN0aW9uIGV2YWx1YXRlRXhwcmVzc2lvbihcbiAgICBleHByZXNzaW9uOiBzdHJpbmcsIGNvbnRleHQ/OiBBamZDb250ZXh0LCBmb3JjZUZvcm11bGE/OiBzdHJpbmcpOiBhbnkge1xuICBsZXQgZm9ybXVsYSA9IGZvcmNlRm9ybXVsYSB8fCBleHByZXNzaW9uIHx8ICcnO1xuICBpZiAoZm9ybXVsYSA9PT0gJycpIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cbiAgaWYgKGZvcm11bGEgPT09ICd0cnVlJykge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGlmIChmb3JtdWxhID09PSAnZmFsc2UnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmIChjb250ZXh0ICE9IG51bGwgJiYgY29udGV4dFtmb3JtdWxhXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIGNvbnRleHRbZm9ybXVsYV07XG4gIH1cbiAgaWYgKC9eXCJbXlwiXSpcIiQvLnRlc3QoZm9ybXVsYSkpIHtcbiAgICByZXR1cm4gZm9ybXVsYS5yZXBsYWNlKC9eXCIrfFwiKyQvZywgJycpO1xuICB9XG4gIGNvbnN0IGlkZW50aWZpZXJzID1cbiAgICAgIHRva2VuaXplKGZvcm11bGEpLmZpbHRlcigodDogYW55KSA9PiB0LnR5cGUgPT09ICdJZGVudGlmaWVyJykubWFwKCh0OiBhbnkpID0+IHQudmFsdWUpO1xuICBjb25zdCBjdHg6IGFueVtdID0gW107XG4gIGlkZW50aWZpZXJzLmZvckVhY2goKGtleTogc3RyaW5nKSA9PiB7XG4gICAgbGV0IHZhbDogYW55ID0gbnVsbDtcbiAgICBpZiAoY29udGV4dCAhPSBudWxsICYmIGNvbnRleHRba2V5XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB2YWwgPSBjb250ZXh0W2tleV07XG4gICAgfSBlbHNlIGlmIChBamZFeHByZXNzaW9uVXRpbHMudXRpbHNba2V5XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb25zdCB1dGlsID0gQWpmRXhwcmVzc2lvblV0aWxzLnV0aWxzW2tleV07XG4gICAgICB2YWwgPSB1dGlsLmZuO1xuICAgIH1cbiAgICBjdHgucHVzaCh2YWwpO1xuICB9KTtcbiAgaWRlbnRpZmllcnMucHVzaCgnZXhlY0NvbnRleHQnKTtcbiAgY3R4LnB1c2goZXhlY0NvbnRleHQpO1xuXG4gIHRyeSB7XG4gICAgaWYgKGRiZy5lbmFibGVkKSB7XG4gICAgICBkYmcoYGV2YWx1YXRpbmcgZm9ybXVsYSAlcyB1c2luZyBjb250ZXh0ICVqYCwgZm9ybXVsYSwgY3R4KTtcbiAgICB9XG4gICAgbGV0IGYgPSBuZXcgRnVuY3Rpb24oLi4uaWRlbnRpZmllcnMsIGByZXR1cm4gJHtmb3JtdWxhfWApO1xuICAgIGNvbnN0IHJlcyA9IGYoLi4uY3R4KTtcbiAgICBpZiAoZGJnLmVuYWJsZWQpIHtcbiAgICAgIGRiZyhgZm9ybXVsYSAlcyBldmFsdWF0ZWQ6IHJlc3VsdCAlc2AsIGZvcm11bGEsIHJlcyk7XG4gICAgfVxuICAgIGYgPSA8YW55Pm51bGw7XG4gICAgcmV0dXJuIHJlcztcbiAgfSBjYXRjaCAoZSkge1xuICAgIGNvbnNvbGUubG9nKGUpO1xuICAgIGlmIChkYmcuZW5hYmxlZCkge1xuICAgICAgZGJnKGBmb3JtdWxhICVzIG5vdCBldmFsdWF0ZWQ6IGVycm9yICVqYCwgZm9ybXVsYSwgZS5tZXNzYWdlKTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG4iXX0=