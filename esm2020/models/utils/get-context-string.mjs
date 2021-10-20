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
import { AjfExpressionUtils } from './expression-utils';
export function getContextString(context) {
    let fstr = AjfExpressionUtils.UTIL_FUNCTIONS;
    if (context instanceof Array) {
        for (let i = 0; i < context.length; i++) {
            fstr = `${fstr}var ${context[i]} = true;`;
        }
    }
    else if (context != null) {
        Object.keys(context).forEach(x => {
            let val = context[x];
            if (val == null || isNaN(Number(val)) || val === '' || val instanceof Array) {
                if (val instanceof Array) {
                    for (let i = 0; i < val.length; i++) {
                        val[i] =
                            ((val == null || isNaN(Number(val[i])) || val[i] === '') && val[i]) || Number(val[i]);
                    }
                }
                val = JSON.stringify(val);
            }
            else {
                val = Number(val);
            }
            fstr = `${fstr}var ${x} = ${val}; `;
        });
    }
    return fstr;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LWNvbnRleHQtc3RyaW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvbW9kZWxzL3V0aWxzL2dldC1jb250ZXh0LXN0cmluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFJSCxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUV0RCxNQUFNLFVBQVUsZ0JBQWdCLENBQUMsT0FBb0I7SUFDbkQsSUFBSSxJQUFJLEdBQUcsa0JBQWtCLENBQUMsY0FBYyxDQUFDO0lBQzdDLElBQUksT0FBTyxZQUFZLEtBQUssRUFBRTtRQUM1QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN2QyxJQUFJLEdBQUcsR0FBRyxJQUFJLE9BQU8sT0FBTyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUM7U0FDM0M7S0FDRjtTQUFNLElBQUksT0FBTyxJQUFJLElBQUksRUFBRTtRQUMxQixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUMvQixJQUFJLEdBQUcsR0FBUSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUIsSUFBSSxHQUFHLElBQUksSUFBSSxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxHQUFHLEtBQUssRUFBRSxJQUFJLEdBQUcsWUFBWSxLQUFLLEVBQUU7Z0JBQzNFLElBQUksR0FBRyxZQUFZLEtBQUssRUFBRTtvQkFDeEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7d0JBQ25DLEdBQUcsQ0FBQyxDQUFDLENBQUM7NEJBQ0osQ0FBQyxDQUFDLEdBQUcsSUFBSSxJQUFJLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7cUJBQ3pGO2lCQUNGO2dCQUNELEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQzNCO2lCQUFNO2dCQUNMLEdBQUcsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDbkI7WUFDRCxJQUFJLEdBQUcsR0FBRyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ3RDLENBQUMsQ0FBQyxDQUFDO0tBQ0o7SUFDRCxPQUFPLElBQUksQ0FBQztBQUNkLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmQ29udGV4dH0gZnJvbSAnQGFqZi9jb3JlL2NvbW1vbic7XG5cbmltcG9ydCB7QWpmRXhwcmVzc2lvblV0aWxzfSBmcm9tICcuL2V4cHJlc3Npb24tdXRpbHMnO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29udGV4dFN0cmluZyhjb250ZXh0PzogQWpmQ29udGV4dCk6IHN0cmluZyB7XG4gIGxldCBmc3RyID0gQWpmRXhwcmVzc2lvblV0aWxzLlVUSUxfRlVOQ1RJT05TO1xuICBpZiAoY29udGV4dCBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb250ZXh0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBmc3RyID0gYCR7ZnN0cn12YXIgJHtjb250ZXh0W2ldfSA9IHRydWU7YDtcbiAgICB9XG4gIH0gZWxzZSBpZiAoY29udGV4dCAhPSBudWxsKSB7XG4gICAgT2JqZWN0LmtleXMoY29udGV4dCkuZm9yRWFjaCh4ID0+IHtcbiAgICAgIGxldCB2YWw6IGFueSA9IGNvbnRleHRbeF07XG4gICAgICBpZiAodmFsID09IG51bGwgfHwgaXNOYU4oTnVtYmVyKHZhbCkpIHx8IHZhbCA9PT0gJycgfHwgdmFsIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgaWYgKHZhbCBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB2YWwubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhbFtpXSA9XG4gICAgICAgICAgICAgICgodmFsID09IG51bGwgfHwgaXNOYU4oTnVtYmVyKHZhbFtpXSkpIHx8IHZhbFtpXSA9PT0gJycpICYmIHZhbFtpXSkgfHwgTnVtYmVyKHZhbFtpXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHZhbCA9IEpTT04uc3RyaW5naWZ5KHZhbCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWwgPSBOdW1iZXIodmFsKTtcbiAgICAgIH1cbiAgICAgIGZzdHIgPSBgJHtmc3RyfXZhciAke3h9ID0gJHt2YWx9OyBgO1xuICAgIH0pO1xuICB9XG4gIHJldHVybiBmc3RyO1xufVxuIl19