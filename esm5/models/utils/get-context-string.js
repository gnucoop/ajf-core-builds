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
import { AjfExpressionUtils } from './expression-utils';
export function getContextString(context) {
    var fstr = AjfExpressionUtils.UTIL_FUNCTIONS;
    if (context instanceof Array) {
        for (var i = 0; i < context.length; i++) {
            fstr = fstr + "var " + context[i] + " = true;";
        }
    }
    else if (context != null) {
        Object.keys(context).forEach(function (x) {
            var val = context[x];
            if (val == null || isNaN(Number(val)) || val === '' || val instanceof Array) {
                if (val instanceof Array) {
                    for (var i = 0; i < val.length; i++) {
                        val[i] =
                            (val == null || isNaN(Number(val[i])) || val[i] === '') && val[i] || Number(val[i]);
                    }
                }
                val = JSON.stringify(val);
            }
            else {
                val = Number(val);
            }
            fstr = fstr + "var " + x + " = " + val + "; ";
        });
    }
    return fstr;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LWNvbnRleHQtc3RyaW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvbW9kZWxzL3V0aWxzL2dldC1jb250ZXh0LXN0cmluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFHSCxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUV0RCxNQUFNLFVBQVUsZ0JBQWdCLENBQUMsT0FBb0I7SUFDbkQsSUFBSSxJQUFJLEdBQUcsa0JBQWtCLENBQUMsY0FBYyxDQUFDO0lBQzdDLElBQUksT0FBTyxZQUFZLEtBQUssRUFBRTtRQUM1QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN2QyxJQUFJLEdBQU0sSUFBSSxZQUFPLE9BQU8sQ0FBQyxDQUFDLENBQUMsYUFBVSxDQUFDO1NBQzNDO0tBQ0Y7U0FBTSxJQUFJLE9BQU8sSUFBSSxJQUFJLEVBQUU7UUFDMUIsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQSxDQUFDO1lBQzVCLElBQUksR0FBRyxHQUFRLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMxQixJQUFJLEdBQUcsSUFBSSxJQUFJLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEdBQUcsS0FBSyxFQUFFLElBQUksR0FBRyxZQUFZLEtBQUssRUFBRTtnQkFDM0UsSUFBSSxHQUFHLFlBQVksS0FBSyxFQUFFO29CQUN4QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTt3QkFDbkMsR0FBRyxDQUFDLENBQUMsQ0FBQzs0QkFDRixDQUFDLEdBQUcsSUFBSSxJQUFJLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3FCQUN6RjtpQkFDRjtnQkFDRCxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUMzQjtpQkFBTTtnQkFDTCxHQUFHLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ25CO1lBQ0QsSUFBSSxHQUFNLElBQUksWUFBTyxDQUFDLFdBQU0sR0FBRyxPQUFJLENBQUM7UUFDdEMsQ0FBQyxDQUFDLENBQUM7S0FDSjtJQUNELE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgMjAxOCBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkNvbnRleHR9IGZyb20gJy4uL2ludGVyZmFjZS9jb250ZXh0JztcbmltcG9ydCB7QWpmRXhwcmVzc2lvblV0aWxzfSBmcm9tICcuL2V4cHJlc3Npb24tdXRpbHMnO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29udGV4dFN0cmluZyhjb250ZXh0PzogQWpmQ29udGV4dCk6IHN0cmluZyB7XG4gIGxldCBmc3RyID0gQWpmRXhwcmVzc2lvblV0aWxzLlVUSUxfRlVOQ1RJT05TO1xuICBpZiAoY29udGV4dCBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb250ZXh0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBmc3RyID0gYCR7ZnN0cn12YXIgJHtjb250ZXh0W2ldfSA9IHRydWU7YDtcbiAgICB9XG4gIH0gZWxzZSBpZiAoY29udGV4dCAhPSBudWxsKSB7XG4gICAgT2JqZWN0LmtleXMoY29udGV4dCkuZm9yRWFjaCh4ID0+IHtcbiAgICAgIGxldCB2YWw6IGFueSA9IGNvbnRleHRbeF07XG4gICAgICBpZiAodmFsID09IG51bGwgfHwgaXNOYU4oTnVtYmVyKHZhbCkpIHx8IHZhbCA9PT0gJycgfHwgdmFsIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgaWYgKHZhbCBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB2YWwubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhbFtpXSA9XG4gICAgICAgICAgICAgICAgKHZhbCA9PSBudWxsIHx8IGlzTmFOKE51bWJlcih2YWxbaV0pKSB8fCB2YWxbaV0gPT09ICcnKSAmJiB2YWxbaV0gfHwgTnVtYmVyKHZhbFtpXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHZhbCA9IEpTT04uc3RyaW5naWZ5KHZhbCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWwgPSBOdW1iZXIodmFsKTtcbiAgICAgIH1cbiAgICAgIGZzdHIgPSBgJHtmc3RyfXZhciAke3h9ID0gJHt2YWx9OyBgO1xuICAgIH0pO1xuICB9XG4gIHJldHVybiBmc3RyO1xufVxuIl19