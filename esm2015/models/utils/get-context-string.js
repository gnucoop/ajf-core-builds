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
                            (val == null || isNaN(Number(val[i])) || val[i] === '') && val[i] || Number(val[i]);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LWNvbnRleHQtc3RyaW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvbW9kZWxzL3V0aWxzL2dldC1jb250ZXh0LXN0cmluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFHSCxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUV0RCxNQUFNLFVBQVUsZ0JBQWdCLENBQUMsT0FBb0I7SUFDbkQsSUFBSSxJQUFJLEdBQUcsa0JBQWtCLENBQUMsY0FBYyxDQUFDO0lBQzdDLElBQUksT0FBTyxZQUFZLEtBQUssRUFBRTtRQUM1QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN2QyxJQUFJLEdBQUcsR0FBRyxJQUFJLE9BQU8sT0FBTyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUM7U0FDM0M7S0FDRjtTQUFNLElBQUksT0FBTyxJQUFJLElBQUksRUFBRTtRQUMxQixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUMvQixJQUFJLEdBQUcsR0FBUSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUIsSUFBSSxHQUFHLElBQUksSUFBSSxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxHQUFHLEtBQUssRUFBRSxJQUFJLEdBQUcsWUFBWSxLQUFLLEVBQUU7Z0JBQzNFLElBQUksR0FBRyxZQUFZLEtBQUssRUFBRTtvQkFDeEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7d0JBQ25DLEdBQUcsQ0FBQyxDQUFDLENBQUM7NEJBQ0YsQ0FBQyxHQUFHLElBQUksSUFBSSxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztxQkFDekY7aUJBQ0Y7Z0JBQ0QsR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDM0I7aUJBQU07Z0JBQ0wsR0FBRyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNuQjtZQUNELElBQUksR0FBRyxHQUFHLElBQUksT0FBTyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDdEMsQ0FBQyxDQUFDLENBQUM7S0FDSjtJQUNELE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZDb250ZXh0fSBmcm9tICcuLi9pbnRlcmZhY2UvY29udGV4dCc7XG5pbXBvcnQge0FqZkV4cHJlc3Npb25VdGlsc30gZnJvbSAnLi9leHByZXNzaW9uLXV0aWxzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGdldENvbnRleHRTdHJpbmcoY29udGV4dD86IEFqZkNvbnRleHQpOiBzdHJpbmcge1xuICBsZXQgZnN0ciA9IEFqZkV4cHJlc3Npb25VdGlscy5VVElMX0ZVTkNUSU9OUztcbiAgaWYgKGNvbnRleHQgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29udGV4dC5sZW5ndGg7IGkrKykge1xuICAgICAgZnN0ciA9IGAke2ZzdHJ9dmFyICR7Y29udGV4dFtpXX0gPSB0cnVlO2A7XG4gICAgfVxuICB9IGVsc2UgaWYgKGNvbnRleHQgIT0gbnVsbCkge1xuICAgIE9iamVjdC5rZXlzKGNvbnRleHQpLmZvckVhY2goeCA9PiB7XG4gICAgICBsZXQgdmFsOiBhbnkgPSBjb250ZXh0W3hdO1xuICAgICAgaWYgKHZhbCA9PSBudWxsIHx8IGlzTmFOKE51bWJlcih2YWwpKSB8fCB2YWwgPT09ICcnIHx8IHZhbCBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgIGlmICh2YWwgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdmFsLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YWxbaV0gPVxuICAgICAgICAgICAgICAgICh2YWwgPT0gbnVsbCB8fCBpc05hTihOdW1iZXIodmFsW2ldKSkgfHwgdmFsW2ldID09PSAnJykgJiYgdmFsW2ldIHx8IE51bWJlcih2YWxbaV0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YWwgPSBKU09OLnN0cmluZ2lmeSh2YWwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFsID0gTnVtYmVyKHZhbCk7XG4gICAgICB9XG4gICAgICBmc3RyID0gYCR7ZnN0cn12YXIgJHt4fSA9ICR7dmFsfTsgYDtcbiAgICB9KTtcbiAgfVxuICByZXR1cm4gZnN0cjtcbn1cbiJdfQ==